import type { Lang } from "../i18n";
import { type Doc, jsonLdNodes, meta, schemaTypes, visibleText, wordCount } from "./extract";
import { CHECK_MESSAGES, type CheckMessages } from "./messages";
import type { BotAccess, Category, CheckResult, PageSnapshot, SiteFiles, Status } from "./types";

export interface CheckContext {
  $: Doc;
  page: PageSnapshot;
  files: SiteFiles;
  bots: BotAccess[];
  lang?: Lang;
  now?: Date;
}

type Check = (ctx: CheckContext, m: CheckMessages) => CheckResult;

const RICH_TYPES = [
  "Organization", "LocalBusiness", "Corporation", "WebSite", "Article", "BlogPosting",
  "NewsArticle", "Product", "SoftwareApplication", "FAQPage", "HowTo", "Person", "Service",
];

function result(
  id: string, category: Category, title: string, weight: number,
  ratio: number, detail: string, fix: string,
): CheckResult {
  const r = Math.max(0, Math.min(1, ratio));
  const status: Status = r >= 0.85 ? "pass" : r >= 0.4 ? "warn" : "fail";
  return {
    id, category, title, weight, detail,
    score: Math.round(r * weight * 10) / 10,
    status,
    fix: status === "pass" ? undefined : fix,
  };
}

// ---------- Site-level checks (robots.txt, llms.txt, sitemap) ----------

const aiSearchBots: Check = ({ bots }, { aiSearch: m }) => {
  const relevant = bots.filter((b) => b.purpose !== "training");
  const blocked = relevant.filter((b) => !b.allowed);
  return result(
    "ai-search-bots", "access", m.title, 15, 1 - blocked.length / relevant.length,
    blocked.length === 0 ? m.ok({ n: relevant.length }) : m.blocked({ bots: blocked.map((b) => b.bot).join(", ") }),
    m.fix,
  );
};

const aiTrainingBots: Check = ({ bots }, { aiTraining: m }) => {
  const relevant = bots.filter((b) => b.purpose === "training");
  const blocked = relevant.filter((b) => !b.allowed);
  return result(
    "ai-training-bots", "access", m.title, 3, 1 - blocked.length / relevant.length,
    blocked.length === 0 ? m.ok : m.blocked({ bots: blocked.map((b) => b.bot).join(", ") }),
    m.fix,
  );
};

const llmsTxt: Check = ({ files }, { llms: m }) => {
  const txt = files.llmsTxt;
  const hasTitle = !!txt && /^#\s+\S/m.test(txt);
  const hasLinks = !!txt && /\[[^\]]+\]\([^)]+\)/.test(txt);
  return result(
    "llms-txt", "access", m.title, 6,
    !txt ? 0 : (hasTitle ? 0.5 : 0.2) + (hasLinks ? 0.5 : 0),
    !txt ? m.missing : m.found({ noTitle: !hasTitle, noLinks: !hasLinks }),
    m.fix,
  );
};

const sitemap: Check = ({ files }, { sitemap: m }) =>
  result("sitemap", "access", m.title, 3, files.sitemapFound ? 1 : 0, files.sitemapFound ? m.ok : m.missing, m.fix);

// ---------- Page-level checks ----------

const indexable: Check = ({ $, page }, { indexable: m }) => {
  const robotsMeta = `${meta($, "robots") ?? ""} ${page.headers["x-robots-tag"] ?? ""}`.toLowerCase();
  const noindex = /noindex|none/.test(robotsMeta);
  const ok = page.status >= 200 && page.status < 300;
  return result(
    "indexable", "access", m.title, 5, ok && !noindex ? 1 : 0,
    !ok ? m.status({ status: page.status }) : noindex ? m.noindex : m.ok({ status: page.status }),
    m.fix,
  );
};

const structuredData: Check = ({ $ }, { structured: m }) => {
  const types = schemaTypes(jsonLdNodes($));
  const rich = types.filter((t) => RICH_TYPES.includes(t));
  return result(
    "structured-data", "structure", m.title, 10,
    types.length === 0 ? 0 : 0.4 + Math.min(rich.length, 3) * 0.2,
    types.length === 0 ? m.none : m.found({ types: types.join(", ") }),
    m.fix,
  );
};

const questionContent: Check = ({ $ }, { questions: m }) => {
  const faq = schemaTypes(jsonLdNodes($)).includes("FAQPage");
  const n = $("h2, h3, h4, summary, dt").filter((_, el) => $(el).text().trim().endsWith("?")).length;
  return result("question-content", "structure", m.title, 4, (faq ? 0.5 : 0) + Math.min(n, 3) / 6, m.detail({ n, faq }), m.fix);
};

const headings: Check = ({ $ }, { headings: m }) => {
  const h1 = $("h1").length;
  const h2 = $("h2").length;
  const ratio = (h1 === 1 ? 0.6 : h1 > 1 ? 0.3 : 0) + (h2 >= 2 ? 0.4 : h2 === 1 ? 0.2 : 0);
  return result("headings", "structure", m.title, 5, ratio, m.detail({ h1, h2 }), m.fix);
};

const titleAndDescription: Check = ({ $ }, { meta: m }) => {
  const title = $("title").first().text().trim();
  const desc = meta($, "description") ?? "";
  let ratio = 0;
  if (title) ratio += title.length >= 15 && title.length <= 65 ? 0.5 : 0.3;
  if (desc) ratio += desc.length >= 50 && desc.length <= 170 ? 0.5 : 0.3;
  return result(
    "meta", "structure", m.title, 6, ratio,
    m.detail({ title: title ? title.length : null, desc: desc ? desc.length : null }),
    m.fix,
  );
};

const openGraph: Check = ({ $ }, { og: m }) => {
  const n = ["og:title", "og:description", "og:image"].filter((p) => meta($, p)).length;
  return result("open-graph", "structure", m.title, 3, n / 3, m.detail({ n }), m.fix);
};

const canonicalLang: Check = ({ $ }, { canonical: m }) => {
  const canonical = !!$('link[rel="canonical"]').attr("href");
  const lang = $("html").attr("lang") ?? null;
  return result("canonical-lang", "structure", m.title, 3, (canonical ? 0.5 : 0) + (lang ? 0.5 : 0), m.detail({ canonical, lang }), m.fix);
};

const serverRendered: Check = ({ $ }, { rendered: m }) => {
  const words = wordCount(visibleText($));
  return result(
    "server-rendered", "content", m.title, 10,
    words >= 300 ? 1 : words >= 120 ? 0.6 : words >= 40 ? 0.3 : 0,
    m.detail({ words }), m.fix,
  );
};

const answerFormatting: Check = ({ $ }, { formatting: m }) => {
  const lists = $("ul li, ol li").length;
  const tables = $("table").length;
  return result(
    "answer-formatting", "content", m.title, 5,
    (lists >= 3 ? 0.6 : lists > 0 ? 0.3 : 0) + (tables > 0 ? 0.4 : 0),
    m.detail({ lists, tables }), m.fix,
  );
};

const freshness: Check = ({ $, now = new Date() }, { freshness: m }) => {
  const candidates = [
    ...jsonLdNodes($).flatMap((n) => [n.dateModified, n.datePublished]),
    meta($, "article:modified_time"),
    meta($, "article:published_time"),
    $("time[datetime]").first().attr("datetime"),
  ].filter((v): v is string => typeof v === "string");
  const latest = candidates
    .map((d) => new Date(d))
    .filter((d) => !Number.isNaN(d.getTime()) && d.getTime() <= now.getTime() + 86_400_000)
    .sort((a, b) => b.getTime() - a.getTime())[0];
  const ageDays = latest ? (now.getTime() - latest.getTime()) / 86_400_000 : Infinity;
  return result(
    "freshness", "content", m.title, 4, !latest ? 0 : ageDays <= 365 ? 1 : 0.5,
    latest ? m.found({ date: latest.toISOString().slice(0, 10) }) : m.none,
    m.fix,
  );
};

const evidence: Check = ({ $, page }, { evidence: m }) => {
  const text = visibleText($);
  const stats = (text.match(/\b\d+(?:[.,]\d+)?\s?(?:%|percent|x\b|million|billion|milyon|milyar|k\b)/gi) ?? []).length
    + (text.match(/%\s?\d+/g) ?? []).length;
  const host = new URL(page.finalUrl).hostname.replace(/^www\./, "");
  const links = $("a[href^='http']").filter((_, el) => {
    try {
      return !new URL($(el).attr("href")!).hostname.endsWith(host);
    } catch {
      return false;
    }
  }).length;
  return result(
    "evidence", "content", m.title, 3, Math.min(stats, 3) / 6 + (links > 0 ? 0.5 : 0),
    m.detail({ stats, links }), m.fix,
  );
};

const authorship: Check = ({ $ }, { authorship: m }) => {
  const types = schemaTypes(jsonLdNodes($));
  const n = [
    !!meta($, "author") || $('[rel="author"]').length > 0,
    types.includes("Person"),
    types.some((t) => ["Organization", "LocalBusiness", "Corporation"].includes(t)),
  ].filter(Boolean).length;
  return result("authorship", "trust", m.title, 4, n / 2, m.detail({ n }), m.fix);
};

const aboutContact: Check = ({ $ }, { aboutContact: m }) => {
  const hrefs = $("a[href]").map((_, el) => `${$(el).attr("href")} ${$(el).text()}`.toLowerCase()).get();
  const about = hrefs.some((h) => /about|hakkimizda|hakkında|kurumsal|uber-uns|a-propos|quienes/.test(h));
  const contact = hrefs.some((h) => /contact|iletisim|iletişim|kontakt|contacto/.test(h));
  return result("about-contact", "trust", m.title, 3, (about ? 0.5 : 0) + (contact ? 0.5 : 0), m.detail({ about, contact }), m.fix);
};

const https: Check = ({ page }, { https: m }) => {
  const secure = page.finalUrl.startsWith("https://");
  return result("https", "technical", m.title, 3, secure ? 1 : 0, secure ? m.ok : m.bad, m.fix);
};

const speed: Check = ({ page }, { speed: m }) => {
  const ms = page.responseMs;
  return result("speed", "technical", m.title, 3, ms <= 1000 ? 1 : ms <= 2500 ? 0.5 : 0.1, m.detail({ ms }), m.fix);
};

const imageAlt: Check = ({ $ }, { alt: m }) => {
  const imgs = $("img");
  const withAlt = imgs.filter((_, el) => !!$(el).attr("alt")?.trim()).length;
  return result(
    "image-alt", "technical", m.title, 2, imgs.length === 0 ? 1 : withAlt / imgs.length,
    imgs.length === 0 ? m.none : m.detail({ withAlt, total: imgs.length }),
    m.fix,
  );
};

/** Checks that depend on site-wide files rather than the individual page. */
export const SITE_CHECKS: Check[] = [aiSearchBots, aiTrainingBots, llmsTxt, sitemap];

export const PAGE_CHECKS: Check[] = [
  indexable,
  structuredData, questionContent, headings, titleAndDescription, openGraph, canonicalLang,
  serverRendered, answerFormatting, freshness, evidence,
  authorship, aboutContact,
  https, speed, imageAlt,
];

export function runChecks(ctx: CheckContext, checks: Check[] = [...SITE_CHECKS, ...PAGE_CHECKS]): CheckResult[] {
  const m = CHECK_MESSAGES[ctx.lang ?? "en"];
  return checks.map((check) => check(ctx, m));
}
