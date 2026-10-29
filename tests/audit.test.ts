import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { runAudit } from "@/lib/audit";

const words = Array.from({ length: 400 }, (_, i) => `word${i}`).join(" ");
const GOOD = readFileSync(new URL("./fixtures/good.html", import.meta.url), "utf8").replace("REPLACE_TEXT", words);
const SPA = `<!doctype html><html><head><title>App</title></head><body><div id="root"></div><script src="/app.js"></script></body></html>`;

function fakeFetch(routes: Record<string, { body: string; type?: string; status?: number }>): typeof fetch {
  return (async (input: string | URL | Request) => {
    const url = new URL(input instanceof Request ? input.url : input.toString());
    const route = routes[url.pathname];
    if (!route) return new Response("<html>not found</html>", { status: 404, headers: { "content-type": "text/html" } });
    return new Response(route.body, { status: route.status ?? 200, headers: { "content-type": route.type ?? "text/html" } });
  }) as typeof fetch;
}

const opts = (routes: Parameters<typeof fakeFetch>[0]) => ({ fetchImpl: fakeFetch(routes), skipHostCheck: true });

describe("runAudit", () => {
  it("scores a well-optimised page highly", async () => {
    const report = await runAudit("https://acme.test/", opts({
      "/": { body: GOOD },
      "/robots.txt": { body: "User-agent: *\nAllow: /\nSitemap: https://acme.test/sitemap.xml", type: "text/plain" },
      "/llms.txt": { body: "# Acme\n\n> Invoicing\n\n- [Pricing](https://acme.test/pricing)", type: "text/plain" },
    }));
    expect(report.score).toBeGreaterThanOrEqual(85);
    expect(report.grade).toBe("A");
    expect(report.page.schemaTypes).toContain("FAQPage");
    expect(report.generated.llmsTxt).toContain("# Acme");
    expect(report.generated.llmsTxt).toContain("https://acme.test/pricing");
    expect(report.generated.jsonLd).toContain("linkedin.com/company/acme");
  });

  it("flags JavaScript-only pages and blocked AI search bots", async () => {
    const report = await runAudit("acme.test", opts({
      "/": { body: SPA },
      "/robots.txt": { body: "User-agent: OAI-SearchBot\nDisallow: /\nUser-agent: PerplexityBot\nDisallow: /", type: "text/plain" },
    }));
    const byId = Object.fromEntries(report.checks.map((c) => [c.id, c]));
    expect(byId["server-rendered"].status).toBe("fail");
    expect(byId["ai-search-bots"].status).toBe("warn");
    expect(byId["ai-search-bots"].detail).toContain("OAI-SearchBot");
    expect(byId["llms-txt"].status).toBe("fail");
    expect(report.score).toBeLessThan(40);
  });

  it("treats an HTML soft-404 as a missing llms.txt", async () => {
    const report = await runAudit("https://acme.test", opts({ "/": { body: GOOD }, "/llms.txt": { body: "<!doctype html><html></html>" } }));
    expect(report.checks.find((c) => c.id === "llms-txt")?.status).toBe("fail");
  });

  it("weights sum to 100", async () => {
    const report = await runAudit("https://acme.test", opts({ "/": { body: GOOD } }));
    expect(report.checks.reduce((s, c) => s + c.weight, 0)).toBe(100);
  });
});
