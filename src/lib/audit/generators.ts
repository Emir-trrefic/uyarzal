import type { AnyNode, Element } from "domhandler";
import type { Lang } from "../i18n";
import { type Doc, meta } from "./extract";
import { AI_BOTS } from "./robots";

const SOCIAL = /(linkedin|twitter|x|facebook|instagram|youtube|github|tiktok|crunchbase|wikipedia)\.(com|org)/i;

function siteName($: Doc, url: URL): string {
  return (
    meta($, "og:site_name") ??
    $("title").first().text().split(/[|\-–—:]/)[0].trim() ??
    url.hostname.replace(/^www\./, "")
  ) || url.hostname.replace(/^www\./, "");
}

const SKIP_PATH = /\/(log-?in|sign-?in|sign-?up|register|join|cart|basket|checkout|account|my-?account|password|logout|giris|uye-?ol|sepet|hesabim)(\/|$)/i;

/**
 * A link's label. Navigation links often nest a title and a description
 * ("<a><span>Actions</span><span>CI/CD and automation</span></a>"); joining
 * their text runs words together, so use the first text node instead.
 */
function linkLabel($: Doc, el: Element): string {
  const aria = $(el).attr("aria-label")?.trim();
  if (aria) return aria;
  const texts: string[] = [];
  const walk = (node: AnyNode) => {
    if (node.type === "text") {
      const t = node.data.replace(/\s+/g, " ").trim();
      if (t) texts.push(t);
    } else if (node.type === "tag") {
      for (const child of node.children) walk(child);
    }
  };
  walk(el);
  return texts[0] ?? "";
}

function internalLinks($: Doc, base: URL, limit = 12): { title: string; href: string }[] {
  const seen = new Set<string>();
  const out: { title: string; href: string }[] = [];
  $("nav a[href], header a[href], footer a[href], main a[href]").each((_, el) => {
    if (out.length >= limit) return;
    const text = linkLabel($, el);
    try {
      const u = new URL($(el).attr("href")!, base);
      u.hash = "";
      if (u.hostname !== base.hostname || !text || text.length > 60 || SKIP_PATH.test(u.pathname)) return;
      const key = u.pathname.replace(/\/$/, "") || "/";
      if (key === "/" || seen.has(key)) return;
      seen.add(key);
      out.push({ title: text, href: u.toString() });
    } catch {
      /* skip invalid href */
    }
  });
  return out;
}

const LLMS_TEXT = {
  en: {
    oneLine: (name: string) => `What ${name} offers, in one sentence.`,
    about: (name: string) => `${name} is ... (two or three sentences: who you serve, what makes you different, where you operate).`,
    keyPages: "Key pages", home: "Home", optional: "Optional", sitemap: "Sitemap",
  },
  tr: {
    oneLine: (name: string) => `${name} ne sunuyor, tek cümleyle.`,
    about: (name: string) => `${name} ... (iki üç cümle: kime hizmet veriyorsunuz, sizi farklı kılan ne, nerede faaliyet gösteriyorsunuz).`,
    keyPages: "Önemli sayfalar", home: "Ana sayfa", optional: "Ek kaynaklar", sitemap: "Site haritası",
  },
};

export function generateLlmsTxt($: Doc, url: URL, lang: Lang = "en"): string {
  const t = LLMS_TEXT[lang];
  const name = siteName($, url);
  const desc = meta($, "description") ?? meta($, "og:description") ?? t.oneLine(name);
  const links = internalLinks($, url);
  const lines = [
    `# ${name}`,
    "",
    `> ${desc}`,
    "",
    t.about(name),
    "",
    `## ${t.keyPages}`,
    "",
    ...(links.length ? links.map((l) => `- [${l.title}](${l.href})`) : [`- [${t.home}](${url.origin}/)`]),
    "",
    `## ${t.optional}`,
    "",
    `- [${t.sitemap}](${url.origin}/sitemap.xml)`,
  ];
  return lines.join("\n") + "\n";
}

export function generateJsonLd($: Doc, url: URL): string {
  const name = siteName($, url);
  const sameAs = [
    ...new Set(
      $("a[href]").map((_, el) => $(el).attr("href")!).get().filter((h) => /^https?:\/\//.test(h) && SOCIAL.test(h)),
    ),
  ].slice(0, 8);
  const graph = [
    {
      "@type": "Organization",
      "@id": `${url.origin}/#organization`,
      name,
      url: `${url.origin}/`,
      ...(meta($, "og:image") ? { logo: new URL(meta($, "og:image")!, url).toString() } : {}),
      ...(meta($, "description") ? { description: meta($, "description") } : {}),
      ...(sameAs.length ? { sameAs } : {}),
    },
    {
      "@type": "WebSite",
      "@id": `${url.origin}/#website`,
      url: `${url.origin}/`,
      name,
      publisher: { "@id": `${url.origin}/#organization` },
      ...($("html").attr("lang") ? { inLanguage: $("html").attr("lang") } : {}),
    },
  ];
  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }, null, 2);
  return `<script type="application/ld+json">\n${json}\n</script>`;
}

export function generateRobotsTxt(url: URL): string {
  const agents = AI_BOTS.filter((b) => b.purpose !== "training").map((b) => `User-agent: ${b.bot}`);
  return [
    "# Let AI search engines and assistants read your site",
    ...agents,
    "Allow: /",
    "",
    `Sitemap: ${url.origin}/sitemap.xml`,
    "",
  ].join("\n");
}
