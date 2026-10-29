import { load } from "./extract";

/** Extracts <loc> URLs from a sitemap or sitemap index. */
export function parseSitemap(xml: string): { urls: string[]; sitemaps: string[] } {
  const $ = load(xml);
  const locs = (sel: string) => $(sel).map((_, el) => $(el).text().trim()).get().filter(Boolean);
  return { urls: locs("url > loc"), sitemaps: locs("sitemap > loc") };
}

/**
 * Chooses up to `limit` distinct same-origin page URLs, preferring short paths
 * (top-level pages usually matter most for AI visibility) and skipping assets.
 */
export function pickPages(candidates: string[], origin: string, exclude: string[], limit: number): string[] {
  const seen = new Set(exclude.map((u) => u.replace(/\/$/, "")));
  const out: URL[] = [];
  for (const raw of candidates) {
    try {
      const u = new URL(raw, origin);
      u.hash = "";
      const key = u.toString().replace(/\/$/, "");
      if (u.origin !== origin || seen.has(key)) continue;
      if (/\.(pdf|jpe?g|png|gif|webp|svg|zip|xml|mp4|css|js)$/i.test(u.pathname)) continue;
      seen.add(key);
      out.push(u);
    } catch {
      /* skip invalid URL */
    }
  }
  const depth = (u: URL) => u.pathname.split("/").filter(Boolean).length;
  return out
    .sort((a, b) => depth(a) - depth(b) || a.pathname.length - b.pathname.length)
    .slice(0, limit)
    .map((u) => u.toString());
}
