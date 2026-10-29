import type { BotAccess } from "./types";

export const AI_BOTS: Omit<BotAccess, "allowed">[] = [
  { bot: "OAI-SearchBot", vendor: "OpenAI", purpose: "search" },
  { bot: "ChatGPT-User", vendor: "OpenAI", purpose: "user-fetch" },
  { bot: "GPTBot", vendor: "OpenAI", purpose: "training" },
  { bot: "Claude-SearchBot", vendor: "Anthropic", purpose: "search" },
  { bot: "Claude-User", vendor: "Anthropic", purpose: "user-fetch" },
  { bot: "ClaudeBot", vendor: "Anthropic", purpose: "training" },
  { bot: "PerplexityBot", vendor: "Perplexity", purpose: "search" },
  { bot: "Perplexity-User", vendor: "Perplexity", purpose: "user-fetch" },
  { bot: "Googlebot", vendor: "Google (AI Overviews)", purpose: "search" },
  { bot: "Google-Extended", vendor: "Google (Gemini)", purpose: "training" },
  { bot: "Bingbot", vendor: "Microsoft (Copilot)", purpose: "search" },
  { bot: "Applebot-Extended", vendor: "Apple Intelligence", purpose: "training" },
  { bot: "meta-externalagent", vendor: "Meta AI", purpose: "training" },
  { bot: "CCBot", vendor: "Common Crawl", purpose: "training" },
];

interface Group {
  agents: string[];
  rules: { allow: boolean; path: string }[];
}

export function parseRobots(txt: string): Group[] {
  const groups: Group[] = [];
  let current: Group | null = null;
  let lastWasAgent = false;

  for (const raw of txt.split(/\r?\n/)) {
    const line = raw.replace(/#.*$/, "").trim();
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim().toLowerCase();
    const value = line.slice(idx + 1).trim();

    if (key === "user-agent") {
      if (!current || !lastWasAgent) {
        current = { agents: [], rules: [] };
        groups.push(current);
      }
      current.agents.push(value.toLowerCase());
      lastWasAgent = true;
    } else if ((key === "allow" || key === "disallow") && current) {
      // An empty Disallow means "allow everything" and adds no rule.
      if (value) current.rules.push({ allow: key === "allow", path: value });
      lastWasAgent = false;
    } else {
      lastWasAgent = false;
    }
  }
  return groups;
}

function ruleMatches(rulePath: string, path: string): boolean {
  const anchored = rulePath.endsWith("$");
  const pattern = rulePath
    .replace(/\$$/, "")
    .replace(/[.+?^{}()|[\]\\]/g, "\\$&")
    .replace(/\*/g, ".*");
  return new RegExp(`^${pattern}${anchored ? "$" : ""}`).test(path);
}

/** RFC 9309 evaluation: most specific group, then longest matching rule (allow wins ties). */
export function isAllowed(groups: Group[], userAgent: string, path = "/"): boolean {
  const ua = userAgent.toLowerCase();
  let matched = groups.filter((g) => g.agents.includes(ua));
  if (matched.length === 0) matched = groups.filter((g) => g.agents.includes("*"));
  if (matched.length === 0) return true;

  const rules = matched.flatMap((g) => g.rules).filter((r) => ruleMatches(r.path, path));
  if (rules.length === 0) return true;
  rules.sort((a, b) => b.path.length - a.path.length || Number(b.allow) - Number(a.allow));
  return rules[0].allow;
}

export function analyzeBots(robotsTxt: string | null): BotAccess[] {
  const groups = robotsTxt ? parseRobots(robotsTxt) : [];
  return AI_BOTS.map((b) => ({ ...b, allowed: isAllowed(groups, b.bot) }));
}

export function sitemapsFromRobots(robotsTxt: string | null): string[] {
  if (!robotsTxt) return [];
  return [...robotsTxt.matchAll(/^\s*sitemap:\s*(\S+)/gim)].map((m) => m[1]);
}
