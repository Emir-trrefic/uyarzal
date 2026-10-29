import Anthropic from "@anthropic-ai/sdk";

/**
 * AI Mention Probe: asks Claude the questions real buyers ask an assistant and
 * measures whether the brand is recommended, and in which position.
 */

export interface ProbeInput {
  brand: string;
  domain?: string;
  /** Buyer-style questions, e.g. "best invoicing tool for freelancers in Turkey". */
  prompts: string[];
}

export interface ProbeAnswer {
  prompt: string;
  mentioned: boolean;
  /** 1-based rank among recommended names, when it could be determined. */
  position: number | null;
  competitors: string[];
  excerpt: string;
}

export interface ProbeReport {
  brand: string;
  model: string;
  shareOfVoice: number;
  answers: ProbeAnswer[];
}

export const MAX_PROMPTS = 5;
const MODEL = process.env.QUOVRA_PROBE_MODEL ?? "claude-opus-5-5";

const SYSTEM = `You are a knowledgeable assistant helping someone choose a product, service or provider.
Answer the way you normally would for a real user. When recommendations are appropriate, recommend
specific named options. End your answer with a line of the form
RECOMMENDED: name 1 | name 2 | name 3
listing the options you recommended, best first (use "RECOMMENDED: none" if you named none).`;

export function probeEnabled(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_AUTH_TOKEN);
}

function normalize(s: string): string {
  return s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, " ").trim();
}

/** Pure analysis step, separated from the API call so it can be unit tested. */
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

async function ask(client: Anthropic, prompt: string): Promise<string> {
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
}

export async function runProbe(input: ProbeInput, client = new Anthropic()): Promise<ProbeReport> {
  const prompts = input.prompts.map((p) => p.trim()).filter(Boolean).slice(0, MAX_PROMPTS);
  if (!input.brand.trim() || prompts.length === 0) throw new Error("Brand and at least one prompt are required.");

  const answers = await Promise.all(
    prompts.map(async (p) => analyzeAnswer(p, await ask(client, p), input.brand, input.domain)),
  );
  const shareOfVoice = Math.round((answers.filter((a) => a.mentioned).length / answers.length) * 100);
  return { brand: input.brand, model: MODEL, shareOfVoice, answers };
}
