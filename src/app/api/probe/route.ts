import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { probeEnabled, runProbe } from "@/lib/probe";
import { clientKey, rateLimit } from "@/lib/ratelimit";

export const runtime = "nodejs";
export const maxDuration = 120;

export async function GET() {
  return NextResponse.json({ enabled: probeEnabled() });
}

export async function POST(req: Request) {
  if (!probeEnabled()) {
    return NextResponse.json({ error: "The AI Mention Probe is not configured on this server." }, { status: 503 });
  }
  if (!rateLimit(`probe:${clientKey(req)}`, 5).ok) {
    return NextResponse.json({ error: "Hourly probe limit reached." }, { status: 429 });
  }
  const body = (await req.json().catch(() => ({}))) as { brand?: unknown; domain?: unknown; prompts?: unknown };
  if (typeof body.brand !== "string" || !Array.isArray(body.prompts)) {
    return NextResponse.json({ error: "Expected { brand, domain?, prompts[] }." }, { status: 400 });
  }
  try {
    const report = await runProbe({
      brand: body.brand.slice(0, 80),
      domain: typeof body.domain === "string" ? body.domain.slice(0, 120) : undefined,
      prompts: body.prompts.filter((p): p is string => typeof p === "string").map((p) => p.slice(0, 300)),
    });
    return NextResponse.json(report);
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) {
      return NextResponse.json({ error: "AI provider is busy, try again shortly." }, { status: 503 });
    } else if (err instanceof Anthropic.APIError) {
      return NextResponse.json({ error: `AI provider error (${err.status}).` }, { status: 502 });
    }
    return NextResponse.json({ error: err instanceof Error ? err.message : "Probe failed." }, { status: 400 });
  }
}
