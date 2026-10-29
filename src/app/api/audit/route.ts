import { NextResponse } from "next/server";
import { runAudit, UnsafeUrlError } from "@/lib/audit";
import { clientKey, rateLimit } from "@/lib/ratelimit";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: Request) {
  const limit = rateLimit(`audit:${clientKey(req)}`);
  if (!limit.ok) {
    return NextResponse.json({ error: "Hourly audit limit reached. Upgrade to Pro for unlimited audits." }, { status: 429 });
  }
  const body = (await req.json().catch(() => ({}))) as { url?: unknown };
  if (typeof body.url !== "string") {
    return NextResponse.json({ error: "Send a JSON body like {\"url\": \"example.com\"}." }, { status: 400 });
  }
  try {
    return NextResponse.json(await runAudit(body.url));
  } catch (err) {
    if (err instanceof UnsafeUrlError) return NextResponse.json({ error: err.message }, { status: 400 });
    const message = err instanceof Error && err.name === "TimeoutError" ? "The site took too long to respond." : "Could not fetch that site.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
