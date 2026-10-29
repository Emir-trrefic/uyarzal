import { NextResponse } from "next/server";
import { MAX_PAGES, UnsafeUrlError, localizedUrlError } from "@/lib/audit";
import { cachedAudit } from "@/lib/audit/cached";
import { toMarkdown } from "@/lib/audit/markdown";
import { isLang, pickLang } from "@/lib/i18n";
import { clientKey, rateLimit } from "@/lib/ratelimit";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { url?: unknown; lang?: unknown; pages?: unknown; format?: unknown };
  const lang = isLang(body.lang) ? body.lang : pickLang(req.headers.get("accept-language"));
  const tr = lang === "tr";

  // Multi-page audits crawl up to 10 URLs, so they cost more of the hourly budget.
  const maxPages = body.pages === undefined ? 1 : Math.min(MAX_PAGES, Math.max(1, Number(body.pages) || 1));
  const limit = rateLimit(`audit:${clientKey(req)}`);
  if (!limit.ok || (maxPages > 1 && !rateLimit(`multi:${clientKey(req)}`, 5).ok)) {
    return NextResponse.json(
      { error: tr ? "Saatlik denetim sınırına ulaştınız. Sınırsız denetim için Pro'ya geçin." : "Hourly audit limit reached. Upgrade to Pro for unlimited audits." },
      { status: 429 },
    );
  }
  if (typeof body.url !== "string") {
    return NextResponse.json({ error: tr ? 'Şöyle bir JSON gönderin: {"url": "ornek.com"}' : 'Send a JSON body like {"url": "example.com"}.' }, { status: 400 });
  }
  try {
    const report = await cachedAudit(body.url, { lang, maxPages });
    if (body.format === "markdown") {
      return new NextResponse(toMarkdown(report), { headers: { "content-type": "text/markdown; charset=utf-8" } });
    }
    return NextResponse.json(report);
  } catch (err) {
    if (err instanceof UnsafeUrlError) return NextResponse.json({ error: localizedUrlError(err, lang) }, { status: 400 });
    const timeout = err instanceof Error && err.name === "TimeoutError";
    const message = timeout
      ? (tr ? "Site çok geç yanıt verdi." : "The site took too long to respond.")
      : (tr ? "Siteye ulaşılamadı." : "Could not fetch that site.");
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
