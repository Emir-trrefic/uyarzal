"use client";

import { useEffect, useState } from "react";
import { toMarkdown } from "@/lib/audit/markdown";
import type { AuditReport, Category } from "@/lib/audit/types";
import type { Lang } from "@/lib/i18n";
import { UI } from "@/lib/i18n/ui";
import { CopyBlock } from "./CopyBlock";
import { LeadForm } from "./LeadForm";
import { ProbePanel } from "./ProbePanel";
import { ScoreRing } from "./ScoreRing";

const ORDER = { fail: 0, warn: 1, pass: 2 } as const;
type Tab = "fixes" | "pages" | "bots" | "files" | "probe";

export function Report({ report, lang }: { report: AuditReport; lang: Lang }) {
  const t = UI[lang].report;
  const [tab, setTab] = useState<Tab>("fixes");
  const [printing, setPrinting] = useState(false);
  const [shared, setShared] = useState(false);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(location.origin);
    const done = () => setPrinting(false);
    addEventListener("afterprint", done);
    return () => removeEventListener("afterprint", done);
  }, []);

  useEffect(() => {
    if (printing) print();
  }, [printing]);

  const checks = [...report.checks].sort(
    (a, b) => ORDER[a.status] - ORDER[b.status] || b.weight - b.score - (a.weight - a.score),
  );
  const issues = checks.filter((c) => c.status !== "pass").length;
  const host = new URL(report.finalUrl).hostname;
  const siteOrigin = new URL(report.finalUrl).origin;
  const badgeUrl = `${origin}/api/badge?url=${encodeURIComponent(host)}`;
  const reportUrl = `${origin}${lang === "tr" ? "/tr" : "/"}?url=${encodeURIComponent(host)}`;
  const show = (id: Tab) => printing || tab === id;

  function downloadMarkdown() {
    const blob = new Blob([toMarkdown(report)], { type: "text/markdown" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `quovra-${host}.md`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  const tabs: [Tab, string][] = [
    ["fixes", `${t.tabs.fixes} (${report.checks.length})`],
    ...(report.pages?.length ? [["pages", `${t.tabs.pages} (${report.pages.length + 1})`] as [Tab, string]] : []),
    ["bots", t.tabs.bots],
    ["files", t.tabs.files],
    ["probe", t.tabs.probe],
  ];

  return (
    <div className="report">
      <div className="card report-head">
        <ScoreRing score={report.score} grade={report.grade} gradeLabel={t.grade} ariaLabel={t.scoreLabel(report.score, report.grade)} />
        <div>
          <h2 style={{ margin: "0 0 4px", fontSize: "1.3rem" }}>{host}</h2>
          <p className="muted" style={{ margin: "0 0 4px" }}>{issues === 0 ? t.noIssues : t.issues(issues)}</p>
          {report.siteScore !== undefined && (
            <p className="muted" style={{ margin: "0 0 4px" }}>{t.siteAvg(report.siteScore, (report.pages?.length ?? 0) + 1)}</p>
          )}
          <div className="bars" style={{ marginTop: 14 }}>
            {(Object.keys(t.categories) as Category[]).map((cat) => {
              const { score, max } = report.categories[cat];
              return (
                <div className="bar-row" key={cat}>
                  <span>{t.categories[cat]}</span>
                  <div className="bar"><span style={{ width: `${(score / max) * 100}%` }} /></div>
                  <span className="pts">{score}/{max}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="actions no-print">
        <button className="btn ghost small" onClick={async () => {
          await navigator.clipboard.writeText(reportUrl);
          setShared(true);
          setTimeout(() => setShared(false), 1500);
        }}>{shared ? t.shared : t.share}</button>
        <button className="btn ghost small" onClick={downloadMarkdown}>{t.markdown}</button>
        <button className="btn ghost small" onClick={() => setPrinting(true)}>{t.pdf}</button>
      </div>

      <div className="tabs no-print" role="tablist">
        {tabs.map(([id, label]) => (
          <button key={id} role="tab" className="tab" aria-selected={tab === id} onClick={() => setTab(id)}>{label}</button>
        ))}
      </div>

      {show("fixes") && (
        <div className="card list">
          {checks.map((c) => (
            <div className="check" key={c.id}>
              <span className={`pill ${c.status}`}>{t.status[c.status]}</span>
              <div>
                <h4>{c.title}</h4>
                <p>{c.detail}</p>
                {c.fix && <p className="fix"><strong>{t.fix} →</strong> {c.fix}</p>}
              </div>
              <span className="pts">{c.score}/{c.weight}</span>
            </div>
          ))}
        </div>
      )}

      {show("pages") && report.pages?.length ? (
        <div className="card list table-wrap print-gap">
          <table>
            <thead><tr><th>{t.pages.page}</th><th>{t.pages.score}</th><th>{t.pages.issues}</th></tr></thead>
            <tbody>
              <tr>
                <td className="url-cell">{report.finalUrl}</td>
                <td><span className={`pill ${gradeClass(report.score)}`}>{report.score} · {report.grade}</span></td>
                <td className="muted">{checks.filter((c) => c.status === "fail").slice(0, 3).map((c) => c.title).join(" · ") || t.pages.none}</td>
              </tr>
              {[...report.pages].sort((a, b) => a.score - b.score).map((p) => (
                <tr key={p.url}>
                  <td className="url-cell">{p.url}</td>
                  <td>{p.status ? <span className={`pill ${gradeClass(p.score)}`}>{p.score} · {p.grade}</span> : <span className="pill fail">{t.pages.unreachable}</span>}</td>
                  <td className="muted">{p.issues.slice(0, 3).join(" · ") || t.pages.none}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      {show("bots") && (
        <div className="card list table-wrap print-gap">
          <table>
            <thead>
              <tr><th>{t.bots.agent}</th><th>{t.bots.vendor}</th><th>{t.bots.purpose}</th><th>{t.bots.access}</th></tr>
            </thead>
            <tbody>
              {report.bots.map((b) => (
                <tr key={b.bot}>
                  <td><code>{b.bot}</code></td>
                  <td>{b.vendor}</td>
                  <td className="muted">{t.bots.purposes[b.purpose]}</td>
                  <td><span className={`pill ${b.allowed ? "pass" : b.purpose === "training" ? "warn" : "fail"}`}>{b.allowed ? t.bots.allowed : t.bots.blocked}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {show("files") && (
        <div className="grid print-gap">
          <CopyBlock title="llms.txt" hint={t.files.llms(siteOrigin)} code={report.generated.llmsTxt} labels={t} />
          <CopyBlock title="Organization JSON-LD" hint={t.files.jsonld} code={report.generated.jsonLd} labels={t} />
          <CopyBlock title="robots.txt" hint={t.files.robots} code={report.generated.robotsTxt} labels={t} />
          {origin && (
            <CopyBlock
              title={t.files.badgeTitle} hint={t.files.badge} labels={t}
              code={`<a href="${reportUrl}"><img src="${badgeUrl}" alt="AI visibility score"></a>\n\n[![AI visibility](${badgeUrl})](${reportUrl})`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={badgeUrl} alt="" style={{ marginTop: 12 }} />
            </CopyBlock>
          )}
        </div>
      )}

      {tab === "probe" && !printing && (
        <ProbePanel lang={lang} defaultBrand={report.page.title?.split(/[|\-–—:]/)[0].trim() || host} domain={host} />
      )}

      <div className="card upsell no-print">
        <div>
          <h3>{t.upsellTitle}</h3>
          <p>{t.upsellBody}</p>
        </div>
        <LeadForm lang={lang} plan="monitoring" site={host} />
      </div>
    </div>
  );
}

function gradeClass(score: number) {
  return score >= 70 ? "pass" : score >= 45 ? "warn" : "fail";
}
