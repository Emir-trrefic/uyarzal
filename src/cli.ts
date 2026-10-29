#!/usr/bin/env -S npx tsx
import { runAudit } from "./lib/audit/index.ts";

const COLORS = { pass: "\x1b[32m", warn: "\x1b[33m", fail: "\x1b[31m", dim: "\x1b[2m", bold: "\x1b[1m", reset: "\x1b[0m" };

async function main() {
  const args = process.argv.slice(2);
  const json = args.includes("--json");
  const url = args.find((a) => !a.startsWith("--"));
  if (!url) {
    console.error("Usage: citeable <url> [--json] [--min-score=70]");
    process.exit(2);
  }
  const minScore = Number(args.find((a) => a.startsWith("--min-score="))?.split("=")[1] ?? 0);

  const report = await runAudit(url);
  if (json) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    const c = COLORS;
    console.log(`\n${c.bold}Citeable GEO audit${c.reset}  ${report.finalUrl}`);
    console.log(`${c.bold}Score ${report.score}/100  Grade ${report.grade}${c.reset}\n`);
    for (const check of [...report.checks].sort((a, b) => a.status.localeCompare(b.status))) {
      console.log(`${c[check.status]}${check.status.toUpperCase().padEnd(4)}${c.reset} ${check.title} ${c.dim}(${check.score}/${check.weight})${c.reset}`);
      if (check.status !== "pass") {
        console.log(`     ${c.dim}${check.detail}${c.reset}`);
        if (check.fix) console.log(`     → ${check.fix}`);
      }
    }
    const blocked = report.bots.filter((b) => !b.allowed).map((b) => b.bot);
    console.log(`\nBlocked AI agents: ${blocked.length ? blocked.join(", ") : "none"}\n`);
  }
  // Lets CI pipelines fail a deploy that regresses AI visibility.
  if (report.score < minScore) process.exit(1);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(2);
});
