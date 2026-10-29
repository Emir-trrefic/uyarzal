import { describe, expect, it } from "vitest";
import { analyzeAnswer } from "@/lib/probe";

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

  it("reports absence", () => {
    const a = analyzeAnswer("q", "RECOMMENDED: Wave | Zoho", "Acme");
    expect(a.mentioned).toBe(false);
    expect(a.competitors).toEqual(["Wave", "Zoho"]);
  });
});
