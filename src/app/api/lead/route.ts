import { NextResponse } from "next/server";
import { clientKey, rateLimit } from "@/lib/ratelimit";

export const runtime = "nodejs";

const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,190}\.[a-z]{2,}$/i;
const PLANS = ["pro", "agency", "monitoring"];

/**
 * Collects upgrade / waitlist sign-ups. Leads are forwarded as JSON to
 * LEAD_WEBHOOK_URL (Zapier, Make, n8n, Google Apps Script…) and logged.
 */
export async function POST(req: Request) {
  if (!rateLimit(`lead:${clientKey(req)}`, 10).ok) return NextResponse.json({ error: "Too many requests." }, { status: 429 });

  const body = (await req.json().catch(() => ({}))) as { email?: unknown; plan?: unknown; site?: unknown; lang?: unknown };
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!EMAIL.test(email)) return NextResponse.json({ error: "invalid_email" }, { status: 400 });

  const lead = {
    email,
    plan: typeof body.plan === "string" && PLANS.includes(body.plan) ? body.plan : "pro",
    site: typeof body.site === "string" ? body.site.slice(0, 200) : null,
    lang: body.lang === "tr" ? "tr" : "en",
    createdAt: new Date().toISOString(),
  };

  console.log("[lead]", JSON.stringify(lead));
  const hook = process.env.LEAD_WEBHOOK_URL;
  if (hook?.startsWith("https://")) {
    try {
      await fetch(hook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(lead),
        signal: AbortSignal.timeout(5000),
      });
    } catch (err) {
      console.error("[lead] webhook failed", err);
    }
  }
  return NextResponse.json({ ok: true });
}
