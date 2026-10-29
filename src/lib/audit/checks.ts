import type { BotAccess, Category, CheckResult, PageSnapshot, SiteFiles, Status } from "./types";
import { type Doc, jsonLdNodes, meta, schemaTypes, visibleText, wordCount } from "./extract";

export interface CheckContext {
  $: Doc;
  page: PageSnapshot;
  files: SiteFiles;
  bots: BotAccess[];
  now?: Date;
}

const RICH_TYPES = [
  "Organization", "LocalBusiness", "Corporation", "WebSite", "Article", "BlogPosting",
  "NewsArticle", "Product", "SoftwareApplication", "FAQPage", "HowTo", "Person", "Service",
];

function result(
  id: string, category: Category, title: string, weight: number,
  ratio: number, detail: string, fix?: string,
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

function aiSearchBots({ bots }: CheckContext): CheckResult {
  const relevant = bots.filter((b) => b.purpose !== "training");
  const blocked = relevant.filter((b) => !b.allowed);
  return result(
    "ai-search-bots", "access", "AI search & assistant crawlers can reach you", 15,
    1 - blocked.length / relevant.length,
    blocked.length === 0
      ? `All ${relevant.length} AI search and user-fetch agents are allowed by robots.txt.`
      : `Blocked: ${blocked.map((b) => b.bot).join(", ")}. These agents fetch pages to answer users in real time.`,
    "Remove the Disallow rules for these user agents in robots.txt. Blocking them makes you invisible in their answers.",
  );
}

function aiTrainingBots({ bots }: CheckContext): CheckResult {
  const relevant = bots.filter((b) => b.purpose === "training");
  const blocked = relevant.filter((b) => !b.allowed);
  return result(
    "ai-training-bots", "access", "AI training crawlers", 3,
    1 - blocked.length / relevant.length,
    blocked.length === 0
      ? "Training crawlers are allowed, so models can learn about your brand."
      : `Blocked: ${blocked.map((b) => b.bot).join(", ")}. This is a valid business choice, but future models will know less about you.`,
    "If brand awareness matters more than content licensing, allow these crawlers.",
  );
}

function llmsTxt({ files }: CheckContext): CheckResult {
  const txt = files.llmsTxt;
  const hasTitle = !!txt && /^#\s+\S/m.test(txt);
  const hasLinks = !!txt && /\[[^\]]+\]\([^)]+\)/.test(txt);
  return result(
    "llms-txt", "access", "llms.txt guide for AI agents", 6,
    !txt ? 0 : (hasTitle ? 0.5 : 0.2) + (hasLinks ? 0.5 : 0),
    !txt
      ? "No /llms.txt found."
      : `Found /llms.txt${hasTitle ? "" : " without an H1 title"}${hasLinks ? "" : " without links to key pages"}.`,
    "Publish /llms.txt: a Markdown summary of who you are with links to your most important pages. Citeable generates one for you below.",
  );
}

function sitemap({ files }: CheckContext): CheckResult {
  return result(
    "sitemap", "access", "XML sitemap", 3, files.sitemapFound ? 1 : 0,
    files.sitemapFound ? "A sitemap was found." : "No sitemap at /sitemap.xml or in robots.txt.",
    "Publish /sitemap.xml and reference it in robots.txt with a Sitemap: line.",
  );
}

function indexable({ $, page }: CheckContext): CheckResult {
  const robotsMeta = `${meta($, "robots") ?? ""} ${page.headers["x-robots-tag"] ?? ""}`.toLowerCase();
  const noindex = /noindex|none/.test(robotsMeta);
  const ok = page.status >= 200 && page.status < 300;
  return result(
    "indexable", "access", "Page is indexable", 5, ok && !noindex ? 1 : 0,
    !ok ? `The page returned HTTP ${page.status}.` : noindex ? "The page is marked noindex." : `HTTP ${page.status}, no noindex directive.`,
    "Serve the page with HTTP 200 and remove noindex from the robots meta tag / X-Robots-Tag header.",
  );
}

function structuredData({ $ }: CheckContext): CheckResult {
  const types = schemaTypes(jsonLdNodes($));
  const rich = types.filter((t) => RICH_TYPES.includes(t));
  return result(
    "structured-data", "structure", "Structured data (Schema.org JSON-LD)", 10,
    types.length === 0 ? 0 : 0.4 + Math.min(rich.length, 3) * 0.2,
    types.length === 0 ? "No JSON-LD found." : `Found types: ${types.join(", ")}.`,
    "Add JSON-LD for Organization (with sameAs links) plus the page type (Article, Product, FAQPage…). AI systems use it to resolve who you are.",
  );
}

function questionContent({ $ }: CheckContext): CheckResult {
  const types = schemaTypes(jsonLdNodes($));
  const questions = $("h2, h3, h4, summary, dt").filter((_, el) => $(el).text().trim().endsWith("?")).length;
  const hasFaq = types.includes("FAQPage");
  return result(
    "question-content", "structure", "Answers real questions (FAQ)", 4,
    (hasFaq ? 0.5 : 0) + Math.min(questions, 3) / 6,
    `${questions} question-style heading(s)${hasFaq ? " and FAQPage markup" : ", no FAQPage markup"}.`,
    "Add a short FAQ that answers the exact questions buyers ask assistants, and mark it up with FAQPage.",
  );
}

function headings({ $ }: CheckContext): CheckResult {
  const h1 = $("h1").length;
  const h2 = $("h2").length;
  const ratio = (h1 === 1 ? 0.6 : h1 > 1 ? 0.3 : 0) + (h2 >= 2 ? 0.4 : h2 === 1 ? 0.2 : 0);
  return result(
    "headings", "structure", "Clear heading hierarchy", 5, ratio,
    `${h1} H1, ${h2} H2 heading(s).`,
    "Use exactly one H1 stating the topic and H2 sections that each answer one sub-question. LLMs chunk pages by headings.",
  );
}

function titleAndDescription({ $ }: CheckContext): CheckResult {
  const title = $("title").first().text().trim();
  const desc = meta($, "description") ?? "";
  let ratio = 0;
  if (title) ratio += title.length >= 15 && title.length <= 65 ? 0.5 : 0.3;
  if (desc) ratio += desc.length >= 50 && desc.length <= 170 ? 0.5 : 0.3;
  return result(
    "meta", "structure", "Title & meta description", 6, ratio,
    `Title: ${title ? `${title.length} chars` : "missing"}. Description: ${desc ? `${desc.length} chars` : "missing"}.`,
    "Write a 15–65 character title and a 50–170 character description that states plainly what you offer and for whom.",
  );
}

function openGraph({ $ }: CheckContext): CheckResult {
  const found = ["og:title", "og:description", "og:image"].filter((p) => meta($, p));
  return result(
    "open-graph", "structure", "Open Graph tags", 3, found.length / 3,
    `${found.length}/3 core Open Graph tags present.`,
    "Add og:title, og:description and og:image so link previews in chat assistants look right.",
  );
}

function canonicalLang({ $ }: CheckContext): CheckResult {
  const canonical = $('link[rel="canonical"]').attr("href");
  const lang = $("html").attr("lang");
  return result(
    "canonical-lang", "structure", "Canonical URL & language", 3, (canonical ? 0.5 : 0) + (lang ? 0.5 : 0),
    `Canonical: ${canonical ? "yes" : "missing"}. lang attribute: ${lang ?? "missing"}.`,
    'Add <link rel="canonical"> and <html lang="…"> so engines attribute and localise your content correctly.',
  );
}

function serverRendered({ $ }: CheckContext): CheckResult {
  const words = wordCount(visibleText($));
  return result(
    "server-rendered", "content", "Content visible without JavaScript", 10,
    words >= 300 ? 1 : words >= 120 ? 0.6 : words >= 40 ? 0.3 : 0,
    `${words} words in the raw HTML.`,
    "Most AI crawlers do not execute JavaScript. Server-render or pre-render your main content (SSR/SSG).",
  );
}

function answerFormatting({ $ }: CheckContext): CheckResult {
  const lists = $("ul li, ol li").length;
  const tables = $("table").length;
  return result(
    "answer-formatting", "content", "Extractable formatting (lists, tables)", 5,
    (lists >= 3 ? 0.6 : lists > 0 ? 0.3 : 0) + (tables > 0 ? 0.4 : 0),
    `${lists} list item(s), ${tables} table(s).`,
    "Present key facts, comparisons and steps as lists and tables. They are the easiest units for an LLM to quote.",
  );
}

function freshness({ $, now = new Date() }: CheckContext): CheckResult {
  const nodes = jsonLdNodes($);
  const candidates = [
    ...nodes.flatMap((n) => [n.dateModified, n.datePublished]),
    meta($, "article:modified_time"),
    meta($, "article:published_time"),
    $("time[datetime]").first().attr("datetime"),
  ].filter((v): v is string => typeof v === "string");
  const dates = candidates.map((d) => new Date(d)).filter((d) => !Number.isNaN(d.getTime()));
  const latest = dates.sort((a, b) => b.getTime() - a.getTime())[0];
  const ageDays = latest ? (now.getTime() - latest.getTime()) / 86_400_000 : Infinity;
  return result(
    "freshness", "content", "Freshness signals", 4,
    !latest ? 0 : ageDays <= 365 ? 1 : 0.5,
    latest ? `Latest date found: ${latest.toISOString().slice(0, 10)}.` : "No machine-readable publish/modified date.",
    "Expose dateModified in JSON-LD (or article:modified_time) and keep key pages updated. Assistants prefer recent sources.",
  );
}

function evidence({ $, page }: CheckContext): CheckResult {
  const text = visibleText($);
  const stats = (text.match(/\b\d+(?:[.,]\d+)?\s?(?:%|percent|x\b|million|billion|k\b)/gi) ?? []).length;
  const host = new URL(page.finalUrl).hostname.replace(/^www\./, "");
  const outbound = $("a[href^='http']").filter((_, el) => {
    try {
      return !new URL($(el).attr("href")!).hostname.endsWith(host);
    } catch {
      return false;
    }
  }).length;
  return result(
    "evidence", "content", "Statistics & cited sources", 3,
    Math.min(stats, 3) / 6 + (outbound > 0 ? 0.5 : 0),
    `${stats} statistic(s), ${outbound} outbound link(s).`,
    "Back claims with concrete numbers and link to sources. GEO research found statistics and citations raise AI visibility by up to ~40%.",
  );
}

function authorship({ $ }: CheckContext): CheckResult {
  const types = schemaTypes(jsonLdNodes($));
  const signals = [
    !!meta($, "author") || $('[rel="author"]').length > 0,
    types.includes("Person"),
    types.some((t) => ["Organization", "LocalBusiness", "Corporation"].includes(t)),
  ].filter(Boolean).length;
  return result(
    "authorship", "trust", "Author & organization identity", 4, signals / 2,
    `${signals} identity signal(s) (author meta, Person, Organization).`,
    "Name the author or organization on the page and in JSON-LD. E-E-A-T signals decide which sources get cited.",
  );
}

function aboutContact({ $ }: CheckContext): CheckResult {
  const hrefs = $("a[href]").map((_, el) => `${$(el).attr("href")} ${$(el).text()}`.toLowerCase()).get();
  const about = hrefs.some((h) => /about|hakkimizda|hakkında|uber-uns|a-propos|quienes/.test(h));
  const contact = hrefs.some((h) => /contact|iletisim|iletişim|kontakt|contacto/.test(h));
  return result(
    "about-contact", "trust", "About & contact pages linked", 3, (about ? 0.5 : 0) + (contact ? 0.5 : 0),
    `About page: ${about ? "linked" : "not found"}. Contact page: ${contact ? "linked" : "not found"}.`,
    "Link to About and Contact pages from every page so engines can verify you are a real business.",
  );
}

function https({ page }: CheckContext): CheckResult {
  const secure = page.finalUrl.startsWith("https://");
  return result(
    "https", "technical", "HTTPS", 3, secure ? 1 : 0,
    secure ? "Served over HTTPS." : "Served over plain HTTP.",
    "Serve every page over HTTPS.",
  );
}

function speed({ page }: CheckContext): CheckResult {
  const ms = page.responseMs;
  return result(
    "speed", "technical", "Server response time", 3, ms <= 1000 ? 1 : ms <= 2500 ? 0.5 : 0.1,
    `HTML delivered in ${ms} ms.`,
    "AI fetchers use short timeouts. Cache HTML at the edge and aim for under one second.",
  );
}

function imageAlt({ $ }: CheckContext): CheckResult {
  const imgs = $("img");
  const withAlt = imgs.filter((_, el) => !!$(el).attr("alt")?.trim()).length;
  const ratio = imgs.length === 0 ? 1 : withAlt / imgs.length;
  return result(
    "image-alt", "technical", "Image alt text", 2, ratio,
    imgs.length === 0 ? "No images on the page." : `${withAlt}/${imgs.length} images have alt text.`,
    "Describe images with alt text. Multimodal assistants and text-only crawlers both rely on it.",
  );
}

export const CHECKS = [
  aiSearchBots, aiTrainingBots, llmsTxt, sitemap, indexable,
  structuredData, questionContent, headings, titleAndDescription, openGraph, canonicalLang,
  serverRendered, answerFormatting, freshness, evidence,
  authorship, aboutContact,
  https, speed, imageAlt,
];

export function runChecks(ctx: CheckContext): CheckResult[] {
  return CHECKS.map((check) => check(ctx));
}
