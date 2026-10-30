import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { runAudit } from "@/lib/audit";
import { toMarkdown } from "@/lib/audit/markdown";
import { parseSitemap, pickPages } from "@/lib/audit/sitemap";
import { badgeSvg } from "@/lib/badge";
import { TtlCache } from "@/lib/cache";
import { pickLang } from "@/lib/i18n";
import { opts } from "./helpers";

const words = Array.from({ length: 400 }, (_, i) => `word${i}`).join(" ");
const GOOD = readFileSync(new URL("./fixtures/good.html", import.meta.url), "utf8").replace("REPLACE_TEXT", words);
const THIN = `<!doctype html><html><head><title>Thin</title></head><body><p>Hello</p></body></html>`;

const SITEMAP = `<?xml version="1.0"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url><loc>https://acme.test/</loc></url>
<url><loc>https://acme.test/pricing</loc></url>
<url><loc>https://acme.test/blog/2026/a-very-deep/post</loc></url>
<url><loc>https://acme.test/brochure.pdf</loc></url>
<url><loc>https://other.test/page</loc></url>
</urlset>`;

describe("sitemap", () => {
  it("parses urlsets and sitemap indexes", () => {
    expect(parseSitemap(SITEMAP).urls).toHaveLength(5);
    const index = parseSitemap("<sitemapindex><sitemap><loc>https://a.test/s1.xml</loc></sitemap></sitemapindex>");
    expect(index.sitemaps).toEqual(["https://a.test/s1.xml"]);
  });

  it("keeps same-origin HTML pages, shallow first, without the start page", () => {
    const urls = parseSitemap(SITEMAP).urls;
    expect(pickPages(urls, "https://acme.test", ["https://acme.test/"], 10)).toEqual([
      "https://acme.test/pricing",
      "https://acme.test/blog/2026/a-very-deep/post",
    ]);
    expect(pickPages(urls, "https://acme.test", [], 1)).toHaveLength(1);
  });
});

describe("multi-page audit", () => {
  it("scans sitemap pages and reports a site average", async () => {
    const report = await runAudit("https://acme.test", {
      ...opts({
        "/": { body: GOOD },
        "/sitemap.xml": { body: SITEMAP, type: "application/xml" },
        "/pricing": { body: THIN },
      }),
      maxPages: 5,
    });
    expect(report.pages?.map((p) => p.url)).toEqual([
      "https://acme.test/pricing",
      "https://acme.test/blog/2026/a-very-deep/post",
    ]);
    const pricing = report.pages![0];
    expect(pricing.score).toBeLessThan(report.score);
    expect(pricing.issues.length).toBeGreaterThan(0);
    expect(report.siteScore).toBeLessThan(report.score);
    expect(report.checks.find((c) => c.id === "sitemap")?.status).toBe("pass");
  });

  it("does not crawl extra pages by default", async () => {
    const log: string[] = [];
    const report = await runAudit("https://acme.test", opts({ "/": { body: GOOD }, "/sitemap.xml": { body: SITEMAP, type: "application/xml" } }, log));
    expect(report.pages).toBeUndefined();
    expect(log).not.toContain("/pricing");
  });
});

describe("turkish reports", () => {
  it("localises check titles, details and fixes", async () => {
    const report = await runAudit("https://acme.test", { ...opts({ "/": { body: THIN } }), lang: "tr" });
    const llms = report.checks.find((c) => c.id === "llms-txt")!;
    expect(report.lang).toBe("tr");
    expect(llms.title).toBe("Yapay zekâ ajanları için llms.txt rehberi");
    expect(llms.detail).toBe("/llms.txt bulunamadı.");
    expect(llms.fix).toContain("yayınlayın");
    expect(toMarkdown(report)).toContain("Yapay zekâ görünürlük raporu");
  });

  it("detects Turkish browsers", () => {
    expect(pickLang("tr-TR,tr;q=0.9,en;q=0.8")).toBe("tr");
    expect(pickLang("en-US,en;q=0.9")).toBe("en");
    expect(pickLang(null)).toBe("en");
  });
});

describe("markdown report", () => {
  it("includes score, issues, bots and generated files", async () => {
    const report = await runAudit("https://acme.test", opts({ "/": { body: THIN } }));
    const md = toMarkdown(report);
    expect(md).toContain(`**Score: ${report.score}/100**`);
    expect(md).toContain("## Issues to fix");
    expect(md).toContain("| `GPTBot` | OpenAI | allowed |");
    expect(md).toContain("### llms.txt");
  });
});

describe("badge", () => {
  it("renders score and escapes text", () => {
    const svg = badgeSvg(76, "B");
    expect(svg).toContain("76 · B");
    expect(svg).toContain("#0b7a52");
    expect(badgeSvg(null, null, "<x>")).toContain("&lt;x&gt;");
  });
});

describe("TtlCache", () => {
  it("evicts the oldest entry when full", () => {
    const c = new TtlCache<number>(60_000, 2);
    c.set("a", 1);
    c.set("b", 2);
    c.set("c", 3);
    expect(c.get("a")).toBeUndefined();
    expect(c.get("c")).toBe(3);
  });

  it("expires entries", () => {
    const c = new TtlCache<number>(-1);
    c.set("a", 1);
    expect(c.get("a")).toBeUndefined();
  });
});

describe("llms.txt generator", () => {
  const NAV = `<!doctype html><html><head><title>Acme</title></head><body><nav>
    <a href="/features/actions"><span>Actions</span><span>CI/CD and automation</span></a>
    <a href="/pricing" aria-label="Pricing plans">$</a>
    <a href="/login">Sign in</a>
    <a href="/sepet">Sepet</a>
  </nav></body></html>`;

  it("uses the first text of nested link labels and skips account links", async () => {
    const report = await runAudit("https://acme.test", opts({ "/": { body: NAV } }));
    const txt = report.generated.llmsTxt;
    expect(txt).toContain("- [Actions](https://acme.test/features/actions)");
    expect(txt).toContain("- [Pricing plans](https://acme.test/pricing)");
    expect(txt).not.toContain("Sign in");
    expect(txt).not.toContain("Sepet");
  });

  it("writes the template in Turkish for Turkish reports", async () => {
    const report = await runAudit("https://acme.test", { ...opts({ "/": { body: NAV } }), lang: "tr" });
    expect(report.generated.llmsTxt).toContain("## Önemli sayfalar");
    expect(report.generated.llmsTxt).toContain("kime hizmet veriyorsunuz");
  });
});

describe("agent readiness", () => {
  const product = (ld: object) => `<!doctype html><html><head><title>Shoe</title>
    <script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", ...ld })}</script></head><body><h1>Shoe</h1></body></html>`;
  const check = async (html: string, id: string, extra = {}) =>
    (await runAudit("https://shop.test/p", opts({ "/p": { body: html }, ...extra }))).checks.find((c) => c.id === id)!;

  it("skips product data on non-product pages", async () => {
    const c = await check("<html><body><h1>About</h1></body></html>", "product-data");
    expect(c.status).toBe("pass");
    expect(c.detail).toContain("Not a product page");
  });

  it("lists missing product fields", async () => {
    const c = await check(product({ "@type": "Product", name: "Shoe", offers: { "@type": "Offer", price: "49.90" } }), "product-data");
    expect(c.status).toBe("fail");
    expect(c.detail).toContain("price + currency");
    expect(c.detail).toContain("availability");
  });

  it("passes complete product data", async () => {
    const c = await check(product({
      "@type": "Product", name: "Shoe", image: "/s.jpg", brand: { "@type": "Brand", name: "Acme" },
      aggregateRating: { "@type": "AggregateRating", ratingValue: 4.6, reviewCount: 120 },
      offers: { "@type": "Offer", price: "49.90", priceCurrency: "TRY", availability: "https://schema.org/InStock" },
    }), "product-data");
    expect(c.status).toBe("pass");
  });

  it("detects llms-full.txt", async () => {
    const c = await check("<html><body></body></html>", "markdown-access", {
      "/llms-full.txt": { body: `# Shop\n\n${"Detailed content. ".repeat(30)}`, type: "text/plain" },
    });
    expect(c.status).toBe("pass");
  });
});

describe("regional pricing", () => {
  it("guesses a sensible currency", async () => {
    const { guessCurrency } = await import("@/lib/pricing");
    expect(guessCurrency(["tr-TR"])).toBe("TRY");
    expect(guessCurrency(["en-GB"])).toBe("GBP");
    expect(guessCurrency(["de-DE"])).toBe("EUR");
    expect(guessCurrency(["en-US"], "Europe/Paris")).toBe("EUR");
    expect(guessCurrency(["en-US"], "America/New_York")).toBe("USD");
  });

  it("formats money per currency and keeps every plan priced in every currency", async () => {
    const { formatMoney, PRICES, CURRENCIES } = await import("@/lib/pricing");
    expect(formatMoney(1990, "TRY")).toBe("₺1.990");
    expect(formatMoney(55, "EUR")).toBe("55 €");
    expect(formatMoney(49, "GBP")).toBe("£49");
    for (const plan of Object.values(PRICES)) {
      for (const { code } of CURRENCIES) {
        expect(plan[code].yearly).toBeLessThanOrEqual(plan[code].monthly);
      }
    }
  });
});
