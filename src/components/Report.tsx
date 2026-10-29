"use client";

import { useState } from "react";
import type { AuditReport, Category } from "@/lib/audit/types";
import { CopyBlock } from "./CopyBlock";
import { ProbePanel } from "./ProbePanel";
import { ScoreRing } from "./ScoreRing";

const CATEGORY_LABEL: Record<Category, string> = {
  access: "AI access",
  structure: "Structure",
  content: "Content",
  trust: "Trust",
  technical: "Technical",
};

const ORDER = { fail: 0, warn: 1, pass: 2 } as const;

type Tab = "fixes" | "bots" | "files" | "probe";

export function Report({ report }: { report: AuditReport }) {
  const [tab, setTab] = useState<Tab>("fixes");
  const checks = [...report.checks].sort(
    (a, b) => ORDER[a.status] - ORDER[b.status] || b.weight - b.score - (a.weight - a.score),
  );
  const issues = checks.filter((c) => c.status !== "pass").length;
  const host = new URL(report.finalUrl).hostname;

  return (
    <div className="report">
      <div className="card report-head">
        <ScoreRing score={report.score} grade={report.grade} />
        <div>
          <h2 style={{ margin: "0 0 4px", fontSize: "1.3rem" }}>{host}</h2>
          <p className="muted" style={{ margin: "0 0 18px" }}>
            {issues === 0 ? "No issues found. You are ready for AI search." : `${issues} issue(s) are holding back your AI visibility.`}
          </p>
          <div className="bars">
            {(Object.keys(CATEGORY_LABEL) as Category[]).map((cat) => {
              const { score, max } = report.categories[cat];
              return (
                <div className="bar-row" key={cat}>
                  <span>{CATEGORY_LABEL[cat]}</span>
                  <div className="bar"><span style={{ width: `${(score / max) * 100}%` }} /></div>
                  <span className="pts">{score}/{max}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="tabs" role="tablist">
        {([
          ["fixes", `Checks & fixes (${report.checks.length})`],
          ["bots", "AI crawler access"],
          ["files", "Generated fixes"],
          ["probe", "AI mention probe"],
        ] as [Tab, string][]).map(([id, label]) => (
          <button key={id} role="tab" className="tab" aria-selected={tab === id} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {tab === "fixes" && (
        <div className="card list">
          {checks.map((c) => (
            <div className="check" key={c.id}>
              <span className={`pill ${c.status}`}>{c.status}</span>
              <div>
                <h4>{c.title}</h4>
                <p>{c.detail}</p>
                {c.fix && <p className="fix">{c.fix}</p>}
              </div>
              <span className="pts">{c.score}/{c.weight}</span>
            </div>
          ))}
        </div>
      )}

      {tab === "bots" && (
        <div className="card list table-wrap">
          <table>
            <thead>
              <tr><th>User agent</th><th>Used by</th><th>Purpose</th><th>Access</th></tr>
            </thead>
            <tbody>
              {report.bots.map((b) => (
                <tr key={b.bot}>
                  <td><code>{b.bot}</code></td>
                  <td>{b.vendor}</td>
                  <td className="muted">{b.purpose}</td>
                  <td><span className={`pill ${b.allowed ? "pass" : b.purpose === "training" ? "warn" : "fail"}`}>{b.allowed ? "allowed" : "blocked"}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "files" && (
        <div className="grid">
          <CopyBlock title="llms.txt" hint={`Save as ${new URL(report.finalUrl).origin}/llms.txt and fill in the summary line.`} code={report.generated.llmsTxt} />
          <CopyBlock title="Organization JSON-LD" hint="Paste into the <head> of every page." code={report.generated.jsonLd} />
          <CopyBlock title="robots.txt rules" hint="Merge into your robots.txt to welcome AI search crawlers." code={report.generated.robotsTxt} />
        </div>
      )}

      {tab === "probe" && <ProbePanel defaultBrand={report.page.title?.split(/[|\-–—:]/)[0].trim() ?? host} domain={host} />}
    </div>
  );
}
