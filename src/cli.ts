#!/usr/bin/env -S npx tsx
import { runAudit } from "./lib/audit/index.ts";
import { toMarkdown } from "./lib/audit/markdown.ts";

const COLORS = { pass: "\x1b[32m", warn: "\x1b[33m", fail: "\x1b[31m", dim: "\x1b[2m", bold: "\x1b[1m", reset: "\x1b[0m" };
const USAGE = `Usage: quovra <url> [options]

  --json            print the full report as JSON
  --markdown        print a shareable Markdown report
  --lang=tr         report language: en (default) or tr
  --pages=10        also scan pages from the sitemap (max 10)
  --min-score=70    exit with code 1 if the score is below this value`;

function flag(args: string[], name: string): string | undefined {
  return args.find((a) => a.startsWith(`--${name}=`))?.split("=")[1];
}

async function main() {
  const args = process.argv.slice(2);
  const url = args.find((a) => !a.startsWith("--"));
  if (!url || args.includes("--help")) {
    console.error(USAGE);
    process.exit(url ? 0 : 2);
  }
  const lang = flag(args, "lang") === "tr" ? "tr" : "en";
  const maxPages = Number(flag(args, "pages") ?? 1);
  const minScore = Number(flag(args, "min-score") ?? 0);

  const report = await runAudit(url, { lang, maxPages });
  if (args.includes("--json")) {
    console.log(JSON.stringify(report, null, 2));
  } else if (args.includes("--markdown")) {
    console.log(toMarkdown(report));
  } else {
    const c = COLORS;
    console.log(`\n${c.bold}Quovra GEO audit${c.reset}  ${report.finalUrl}`);
    console.log(`${c.bold}Score ${report.score}/100  Grade ${report.grade}${c.reset}${report.siteScore !== undefined ? `  (site average ${report.siteScore})` : ""}\n`);
    for (const check of [...report.checks].sort((a, b) => a.status.localeCompare(b.status))) {
      console.log(`${c[check.status]}${check.status.toUpperCase().padEnd(4)}${c.reset} ${check.title} ${c.dim}(${check.score}/${check.weight})${c.reset}`);
      if (check.status !== "pass") {
        console.log(`     ${c.dim}${check.detail}${c.reset}`);
        if (check.fix) console.log(`     → ${check.fix}`);
      }
    }
    const blocked = report.bots.filter((b) => !b.allowed).map((b) => b.bot);
    console.log(`\nBlocked AI agents: ${blocked.length ? blocked.join(", ") : "none"}`);
    for (const p of report.pages ?? []) {
      console.log(`  ${String(p.score).padStart(3)} ${p.grade}  ${p.url}`);
    }
    console.log();
  }
  // Lets CI pipelines fail a deploy that regresses AI visibility.
  if (report.score < minScore) process.exit(1);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(2);
});
