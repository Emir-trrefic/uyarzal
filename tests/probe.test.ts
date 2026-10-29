import { describe, expect, it } from "vitest";
import { aggregate, analyzeAnswer, runProbe, type ProbeEngine } from "@/lib/probe";
import { wilson } from "@/lib/probe/stats";

describe("probe answer analysis", () => {
  it("finds brand position and competitors", () => {
    const text = "Here are good options...\nRECOMMENDED: FreshBooks | Acme Invoicing | Wave";
    const a = analyzeAnswer("best invoicing", text, "Acme");
    expect(a).toMatchObject({ mentioned: true, position: 2, competitors: ["FreshBooks", "Wave"] });
  });

  it("matches by domain and ignores accents/case", () => {
    const a = analyzeAnswer("q", "Try ACME.io.\nRECOMMENDED: none", "Açme Ltd", "www.acme.io");
    expect(a.mentioned).toBe(true);
    expect(a.position).toBeNull();
  });

  it("matches Turkish dotless i", () => {
    expect(analyzeAnswer("q", "RECOMMENDED: Işık Klinik", "isik klinik").mentioned).toBe(true);
  });

  it("reports absence", () => {
    const a = analyzeAnswer("q", "RECOMMENDED: Wave | Zoho", "Acme");
    expect(a.mentioned).toBe(false);
    expect(a.competitors).toEqual(["Wave", "Zoho"]);
  });
});

describe("statistics", () => {
  it("computes a Wilson interval that stays within 0–1", () => {
    const [lo, hi] = wilson(0, 10);
    expect(lo).toBe(0);
    expect(hi).toBeGreaterThan(0.2);
    const [lo2, hi2] = wilson(6, 15);
    expect(lo2).toBeLessThan(0.4);
    expect(hi2).toBeGreaterThan(0.4);
  });

  it("aggregates repeated runs per question", () => {
    const a = (prompt: string, mentioned: boolean, position: number | null, competitors: string[]) =>
      ({ prompt, mentioned, position, competitors, excerpt: "" });
    const report = aggregate("Acme", "test", [
      [a("q1", true, 1, ["Wave"]), a("q1", true, 3, ["Wave", "Zoho"]), a("q1", false, null, ["wave"])],
      [a("q2", false, null, ["Zoho"]), a("q2", false, null, ["Zoho"]), a("q2", false, null, [])],
    ]);
    expect(report.totalAnswers).toBe(6);
    expect(report.shareOfVoice).toBe(33);
    expect(report.confidence[0]).toBeLessThan(33);
    expect(report.confidence[1]).toBeGreaterThan(33);
    expect(report.results[0]).toMatchObject({ mentions: 2, runs: 3, avgPosition: 2 });
    expect(report.topCompetitors[0]).toEqual({ name: "Wave", count: 3 });
  });
});

describe("runProbe", () => {
  it("asks every question the requested number of times", async () => {
    let calls = 0;
    const engine: ProbeEngine = {
      id: "fake", label: "Fake",
      ask: async () => (++calls % 2 ? "RECOMMENDED: Acme | Wave" : "RECOMMENDED: Wave"),
    };
    const report = await runProbe({ brand: "Acme", prompts: ["a", "b", ""], runs: 4 }, engine);
    expect(calls).toBe(8);
    expect(report.runsPerPrompt).toBe(4);
    expect(report.shareOfVoice).toBe(50);
  });
});
