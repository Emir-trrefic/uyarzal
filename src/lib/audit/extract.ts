import * as cheerio from "cheerio";

export type Doc = cheerio.CheerioAPI;

export function load(html: string): Doc {
  return cheerio.load(html);
}

/** Parses every JSON-LD block, flattening @graph arrays. Invalid blocks are skipped. */
export function jsonLdNodes($: Doc): Record<string, unknown>[] {
  const nodes: Record<string, unknown>[] = [];
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const data = JSON.parse($(el).text());
      const queue = Array.isArray(data) ? [...data] : [data];
      while (queue.length) {
        const n = queue.shift();
        if (!n || typeof n !== "object") continue;
        nodes.push(n as Record<string, unknown>);
        const graph = (n as Record<string, unknown>)["@graph"];
        if (Array.isArray(graph)) queue.push(...graph);
      }
    } catch {
      /* ignore malformed JSON-LD */
    }
  });
  return nodes;
}

export function schemaTypes(nodes: Record<string, unknown>[]): string[] {
  const types = new Set<string>();
  for (const n of nodes) {
    const t = n["@type"];
    for (const v of Array.isArray(t) ? t : [t]) if (typeof v === "string") types.add(v);
  }
  return [...types];
}

/** Visible text as a crawler without JavaScript would see it. */
export function visibleText($: Doc): string {
  const body = $("body").clone();
  body.find("script, style, noscript, template, svg, iframe").remove();
  return body.text().replace(/\s+/g, " ").trim();
}

export function wordCount(text: string): number {
  return text ? text.split(" ").filter((w) => /[\p{L}\p{N}]/u.test(w)).length : 0;
}

export function meta($: Doc, name: string): string | null {
  const v =
    $(`meta[name="${name}"]`).attr("content") ?? $(`meta[property="${name}"]`).attr("content");
  return v?.trim() || null;
}
