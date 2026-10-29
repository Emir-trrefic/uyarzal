import Anthropic from "@anthropic-ai/sdk";
import { pct, wilson } from "./stats";

/**
 * AI Mention Probe: asks an AI engine the questions real buyers ask and
 * measures whether the brand is recommended, and in which position.
 *
 * AI answers vary from run to run, so every question is asked several times and
 * the share of voice is reported with a 95% confidence interval instead of a
 * single-run snapshot.
 */

export interface ProbeInput {
  brand: string;
  domain?: string;
  /** Buyer-style questions, e.g. "best invoicing tool for freelancers in Turkey". */
  prompts: string[];
  /** Times each question is asked (1–5). */
  runs?: number;
}

/** One answer from one run. */
export interface ProbeAnswer {
  prompt: string;
  mentioned: boolean;
  /** 1-based rank among recommended names, when it could be determined. */
  position: number | null;
  competitors: string[];
  excerpt: string;
}

export interface PromptResult {
  prompt: string;
  runs: number;
  mentions: number;
  /** Average rank across the runs that ranked the brand. */
  avgPosition: number | null;
  competitors: string[];
  excerpt: string;
}

export interface ProbeReport {
  brand: string;
  engine: string;
  runsPerPrompt: number;
  totalAnswers: number;
  /** Percentage of answers that mention the brand. */
  shareOfVoice: number;
  /** 95% Wilson confidence interval for shareOfVoice, in percent. */
  confidence: [number, number];
  results: PromptResult[];
  topCompetitors: { name: string; count: number }[];
}

/** An AI engine the probe can ask. Each provider (Claude, ChatGPT, Gemini…) implements this. */
export interface ProbeEngine {
  id: string;
  label: string;
  ask(prompt: string): Promise<string>;
}

export const MAX_PROMPTS = 5;
export const MAX_RUNS = 5;
const DEFAULT_RUNS = Number(process.env.QUOVRA_PROBE_RUNS ?? 3);
const MODEL = process.env.QUOVRA_PROBE_MODEL ?? "claude-opus-5-5";

const SYSTEM = `You are a knowledgeable assistant helping someone choose a product, service or provider.
Answer the way you normally would for a real user. When recommendations are appropriate, recommend
specific named options. End your answer with a line of the form
RECOMMENDED: name 1 | name 2 | name 3
listing the options you recommended, best first (use "RECOMMENDED: none" if you named none).`;

export function probeEnabled(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_AUTH_TOKEN);
}

export function claudeEngine(client = new Anthropic()): ProbeEngine {
  return {
    id: "claude",
    label: `Claude (${MODEL})`,
    async ask(prompt) {
      const response = await client.beta.messages.create({
        model: MODEL,
        max_tokens: 4000,
        betas: ["server-side-fallback-2026-07-01"],
        fallbacks: "default",
        output_config: { effort: "low" },
        system: SYSTEM,
        messages: [{ role: "user", content: prompt }],
      });
      if (response.stop_reason === "refusal") return "RECOMMENDED: none";
      return response.content.map((b) => (b.type === "text" ? b.text : "")).join("");
    },
  };
}

function normalize(s: string): string {
  return s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/ı/g, "i").replace(/[^a-z0-9]+/g, " ").trim();
}

/** Pure analysis of one answer, separated from the API call so it can be unit tested. */
export function analyzeAnswer(prompt: string, text: string, brand: string, domain?: string): ProbeAnswer {
  const match = text.match(/RECOMMENDED:\s*(.+)\s*$/im);
  const recommended =
    match && !/^none$/i.test(match[1].trim())
      ? match[1].split("|").map((s) => s.trim()).filter(Boolean)
      : [];
  const needles = [normalize(brand), domain ? normalize(domain.replace(/^www\./, "")) : ""].filter(Boolean);
  const hit = (s: string) => needles.some((n) => normalize(s).includes(n));

  const index = recommended.findIndex(hit);
  const body = match ? text.slice(0, match.index).trim() : text.trim();
  return {
    prompt,
    mentioned: index !== -1 || hit(body),
    position: index === -1 ? null : index + 1,
    competitors: recommended.filter((r) => !hit(r)).slice(0, 8),
    excerpt: body.length > 600 ? `${body.slice(0, 600)}…` : body,
  };
}

/** Folds repeated answers into per-question results, competitor counts and an interval. */
export function aggregate(brand: string, engine: string, answers: ProbeAnswer[][]): ProbeReport {
  const results: PromptResult[] = answers.map((runs) => {
    const positions = runs.map((a) => a.position).filter((p): p is number => p !== null);
    const competitorCounts = new Map<string, number>();
    for (const a of runs) for (const c of new Set(a.competitors)) competitorCounts.set(c, (competitorCounts.get(c) ?? 0) + 1);
    return {
      prompt: runs[0].prompt,
      runs: runs.length,
      mentions: runs.filter((a) => a.mentioned).length,
      avgPosition: positions.length ? Math.round((positions.reduce((s, p) => s + p, 0) / positions.length) * 10) / 10 : null,
      competitors: [...competitorCounts.entries()].sort((a, b) => b[1] - a[1]).map(([name]) => name).slice(0, 6),
      excerpt: runs[0].excerpt,
    };
  });

  const total = results.reduce((s, r) => s + r.runs, 0);
  const mentions = results.reduce((s, r) => s + r.mentions, 0);
  const [lo, hi] = wilson(mentions, total);

  // Competitors are merged case-insensitively across all answers.
  const counts = new Map<string, { name: string; count: number }>();
  for (const a of answers.flat()) {
    for (const c of new Set(a.competitors)) {
      const key = normalize(c);
      const entry = counts.get(key) ?? { name: c, count: 0 };
      entry.count++;
      counts.set(key, entry);
    }
  }

  return {
    brand,
    engine,
    runsPerPrompt: answers[0]?.length ?? 0,
    totalAnswers: total,
    shareOfVoice: total ? pct(mentions / total) : 0,
    confidence: [pct(lo), pct(hi)],
    results,
    topCompetitors: [...counts.values()].sort((a, b) => b.count - a.count).slice(0, 8),
  };
}

export async function runProbe(input: ProbeInput, engine: ProbeEngine = claudeEngine()): Promise<ProbeReport> {
  const prompts = input.prompts.map((p) => p.trim()).filter(Boolean).slice(0, MAX_PROMPTS);
  if (!input.brand.trim() || prompts.length === 0) throw new Error("Brand and at least one prompt are required.");
  const runs = Math.min(MAX_RUNS, Math.max(1, input.runs ?? DEFAULT_RUNS));

  const answers = await Promise.all(
    prompts.map((p) =>
      Promise.all(Array.from({ length: runs }, async () => analyzeAnswer(p, await engine.ask(p), input.brand, input.domain))),
    ),
  );
  return aggregate(input.brand, engine.label, answers);
}
