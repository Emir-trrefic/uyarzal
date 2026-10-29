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

function internalLinks($: Doc, base: URL, limit = 12): { title: string; href: string }[] {
  const seen = new Set<string>();
  const out: { title: string; href: string }[] = [];
  $("nav a[href], header a[href], footer a[href], main a[href]").each((_, el) => {
    if (out.length >= limit) return;
    const text = $(el).text().replace(/\s+/g, " ").trim();
    try {
      const u = new URL($(el).attr("href")!, base);
      u.hash = "";
      if (u.hostname !== base.hostname || !text || text.length > 60) return;
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

export function generateLlmsTxt($: Doc, url: URL): string {
  const name = siteName($, url);
  const desc = meta($, "description") ?? meta($, "og:description") ?? `What ${name} offers, in one sentence.`;
  const links = internalLinks($, url);
  const lines = [
    `# ${name}`,
    "",
    `> ${desc}`,
    "",
    `${name} is ... (two or three sentences: who you serve, what makes you different, where you operate).`,
    "",
    "## Key pages",
    "",
    ...(links.length ? links.map((l) => `- [${l.title}](${l.href})`) : [`- [Home](${url.origin}/)`]),
    "",
    "## Optional",
    "",
    `- [Sitemap](${url.origin}/sitemap.xml)`,
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
