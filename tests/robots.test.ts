import { describe, expect, it } from "vitest";
import { analyzeBots, isAllowed, parseRobots, sitemapsFromRobots } from "@/lib/audit/robots";

describe("robots.txt evaluation", () => {
  const txt = `
User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
User-agent: CCBot
Disallow: /private
Allow: /private/public

User-agent: *
Disallow: /admin
Sitemap: https://x.test/sitemap.xml
`;
  const groups = parseRobots(txt);

  it("blocks agents with Disallow: /", () => {
    expect(isAllowed(groups, "GPTBot")).toBe(false);
  });

  it("supports multiple user-agents per group and longest-match rules", () => {
    expect(isAllowed(groups, "ClaudeBot", "/")).toBe(true);
    expect(isAllowed(groups, "CCBot", "/private/x")).toBe(false);
    expect(isAllowed(groups, "CCBot", "/private/public/x")).toBe(true);
  });

  it("falls back to the * group", () => {
    expect(isAllowed(groups, "PerplexityBot", "/")).toBe(true);
    expect(isAllowed(groups, "PerplexityBot", "/admin")).toBe(false);
  });

  it("treats a missing robots.txt as allow-all", () => {
    expect(analyzeBots(null).every((b) => b.allowed)).toBe(true);
  });

  it("supports wildcards and end anchors", () => {
    const g = parseRobots("User-agent: *\nDisallow: /*.pdf$");
    expect(isAllowed(g, "x", "/a/file.pdf")).toBe(false);
    expect(isAllowed(g, "x", "/a/file.pdf?x")).toBe(true);
  });

  it("extracts sitemaps", () => {
    expect(sitemapsFromRobots(txt)).toEqual(["https://x.test/sitemap.xml"]);
  });
});
