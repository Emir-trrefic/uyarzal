import { runChecks } from "./checks";
import { jsonLdNodes, load, meta, schemaTypes, visibleText, wordCount } from "./extract";
import { type FetchOptions, fetchPage, fetchText } from "./fetcher";
import { generateJsonLd, generateLlmsTxt, generateRobotsTxt } from "./generators";
import { analyzeBots, sitemapsFromRobots } from "./robots";
import { normalizeUrl } from "./ssrf";
import type { AuditReport, Category, CheckResult } from "./types";

export * from "./types";
export { UnsafeUrlError, normalizeUrl } from "./ssrf";

const CATEGORIES: Category[] = ["access", "structure", "content", "trust", "technical"];

export function gradeFor(score: number): AuditReport["grade"] {
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

/** Runs a full GEO audit of one URL. */
export async function runAudit(input: string, opts: FetchOptions = {}): Promise<AuditReport> {
  const target = normalizeUrl(input);
  const page = await fetchPage(target, opts);
  const final = new URL(page.finalUrl);
  const origin = new URL(final.origin);

  const [robotsTxt, llmsTxt] = await Promise.all([
    fetchText(new URL("/robots.txt", origin), opts),
    fetchText(new URL("/llms.txt", origin), opts),
  ]);
  const sitemapCandidates = sitemapsFromRobots(robotsTxt);
  const sitemapFound =
    sitemapCandidates.length > 0 || (await fetchText(new URL("/sitemap.xml", origin), opts)) !== null;

  const $ = load(page.html);
  const bots = analyzeBots(robotsTxt);
  const checks = runChecks({ $, page, files: { robotsTxt, llmsTxt, sitemapFound }, bots });

  return {
    url: target.toString(),
    finalUrl: page.finalUrl,
    fetchedAt: new Date().toISOString(),
    ...summarize(checks),
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
      llmsTxt: generateLlmsTxt($, final),
      jsonLd: generateJsonLd($, final),
      robotsTxt: generateRobotsTxt(final),
    },
  };
}
