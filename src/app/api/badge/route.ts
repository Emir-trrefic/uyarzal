import { cachedAudit } from "@/lib/audit/cached";
import { badgeSvg } from "@/lib/badge";
import { clientKey, rateLimit } from "@/lib/ratelimit";

export const runtime = "nodejs";
export const maxDuration = 30;

/** GET /api/badge?url=example.com → embeddable SVG with the site's current score. */
export async function GET(req: Request) {
  const url = new URL(req.url).searchParams.get("url");
  let score: number | null = null;
  let grade: string | null = null;
  if (url && rateLimit(`badge:${clientKey(req)}`, 60).ok) {
    try {
      const report = await cachedAudit(url);
      score = report.score;
      grade = report.grade;
    } catch {
      /* render the n/a badge */
    }
  }
  return new Response(badgeSvg(score, grade), {
    headers: {
      "content-type": "image/svg+xml; charset=utf-8",
      // Let CDNs serve the badge for a day; scores rarely change faster than that.
      "cache-control": score === null ? "no-store" : "public, max-age=3600, s-maxage=86400",
    },
  });
}
