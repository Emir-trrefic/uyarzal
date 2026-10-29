import type { Lang } from "../i18n";
import { PAGE_CHECKS, runChecks } from "./checks";
import { type Doc, jsonLdNodes, load, meta, schemaTypes, visibleText, wordCount } from "./extract";
import { type FetchOptions, fetchPage, fetchText } from "./fetcher";
import { generateJsonLd, generateLlmsTxt, generateRobotsTxt } from "./generators";
import { analyzeBots, sitemapsFromRobots } from "./robots";
import { parseSitemap, pickPages } from "./sitemap";
import { normalizeUrl } from "./ssrf";
import type { AuditReport, BotAccess, Category, CheckResult, Grade, PageResult, SiteFiles } from "./types";

export * from "./types";
export { UnsafeUrlError, localizedUrlError, normalizeUrl } from "./ssrf";

export const MAX_PAGES = 10;
const CATEGORIES: Category[] = ["access", "structure", "content", "trust", "technical"];

export interface AuditOptions extends FetchOptions {
  lang?: Lang;
  /** Total pages to scan, including the start page (1 = single-page audit). */
  maxPages?: number;
}

export function gradeFor(score: number): Grade {
  return score >= 85 ? "A" : score >= 70 ? "B" : score >= 55 ? "C" : score >= 40 ? "D" : "F";
}

export function summarize(checks: CheckResult[]) {
  const total = checks.reduce((s, c) => s + c.weight, 0);
  const earned = checks.reduce((s, c) => s + c.score, 0);
  const score = Math.round((earned / total) * 100);
  const categories = Object.fromEntries(
    CATEGORIES.map((cat) => {
      const cs = checks.filter((c) => c.category === cat);
      return [cat, {
        score: Math.round(cs.reduce((s, c) => s + c.score, 0) * 10) / 10,
        max: cs.reduce((s, c) => s + c.weight, 0),
      }];
    }),
  ) as AuditReport["categories"];
  return { score, grade: gradeFor(score), categories };
}

async function sitemapUrls(origin: URL, robotsTxt: string | null, opts: FetchOptions): Promise<{ found: boolean; urls: string[] }> {
  const candidates = sitemapsFromRobots(robotsTxt);
  if (candidates.length === 0) candidates.push(new URL("/sitemap.xml", origin).toString());

  let found = false;
  const urls: string[] = [];
  // Follow at most one level of sitemap index, and only a few files, to bound crawl cost.
  const queue = candidates.slice(0, 3);
  for (let i = 0; i < queue.length && i < 5; i++) {
    let target: URL;
    try {
      target = new URL(queue[i], origin);
    } catch {
      continue;
    }
    const xml = await fetchText(target, opts);
    if (!xml) continue;
    found = true;
    const parsed = parseSitemap(xml);
    urls.push(...parsed.urls);
    if (i < candidates.length) queue.push(...parsed.sitemaps.slice(0, 2));
    if (urls.length >= 200) break;
  }
  return { found, urls };
}

async function scanPage(url: string, files: SiteFiles, bots: BotAccess[], opts: AuditOptions): Promise<PageResult> {
  try {
    const page = await fetchPage(new URL(url), opts);
    const checks = runChecks({ $: load(page.html), page, files, bots, lang: opts.lang }, PAGE_CHECKS);
    const { score, grade } = summarize(checks);
    const issues = checks
      .filter((c) => c.status === "fail")
      .sort((a, b) => b.weight - b.score - (a.weight - a.score))
      .map((c) => c.title);
    return { url: page.finalUrl, status: page.status, score, grade, issues };
  } catch {
    return { url, status: 0, score: 0, grade: "F", issues: [] };
  }
}

function internalLinks($: Doc, base: URL): string[] {
  return $("a[href]").map((_, el) => {
    try {
      return new URL($(el).attr("href")!, base).toString();
    } catch {
      return "";
    }
  }).get().filter(Boolean);
}

/** Runs a GEO audit of one URL, optionally followed by more pages from the sitemap. */
export async function runAudit(input: string, opts: AuditOptions = {}): Promise<AuditReport> {
  const lang = opts.lang ?? "en";
  const target = normalizeUrl(input);
  const page = await fetchPage(target, opts);
  const final = new URL(page.finalUrl);
  const origin = new URL(final.origin);

  const [robotsTxt, llmsTxt] = await Promise.all([
    fetchText(new URL("/robots.txt", origin), opts),
    fetchText(new URL("/llms.txt", origin), opts),
  ]);
  const sitemap = await sitemapUrls(origin, robotsTxt, opts);
  const files: SiteFiles = { robotsTxt, llmsTxt, sitemapFound: sitemap.found };

  const $ = load(page.html);
  const bots = analyzeBots(robotsTxt);
  const checks = runChecks({ $, page, files, bots, lang });
  const summary = summarize(checks);

  const report: AuditReport = {
    lang,
    url: target.toString(),
    finalUrl: page.finalUrl,
    fetchedAt: new Date().toISOString(),
    ...summary,
    checks,
    bots,
    page: {
      title: $("title").first().text().trim() || null,
      description: meta($, "description"),
      lang: $("html").attr("lang") ?? null,
      wordCount: wordCount(visibleText($)),
      schemaTypes: schemaTypes(jsonLdNodes($)),
    },
    generated: {
      llmsTxt: generateLlmsTxt($, final, lang),
      jsonLd: generateJsonLd($, final),
      robotsTxt: generateRobotsTxt(final),
    },
  };

  const extra = Math.min(MAX_PAGES, Math.max(1, opts.maxPages ?? 1)) - 1;
  if (extra > 0) {
    const pool = sitemap.urls.length ? sitemap.urls : internalLinks($, final);
    const urls = pickPages(pool, final.origin, [target.toString(), page.finalUrl], extra);
    const pages: PageResult[] = [];
    for (let i = 0; i < urls.length; i += 3) {
      pages.push(...(await Promise.all(urls.slice(i, i + 3).map((u) => scanPage(u, files, bots, { ...opts, lang })))));
    }
    report.pages = pages;
    const scores = [summary.score, ...pages.filter((p) => p.status > 0).map((p) => p.score)];
    report.siteScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  }
  return report;
}
