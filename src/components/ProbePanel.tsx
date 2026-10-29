"use client";

import { useEffect, useState } from "react";
import type { Lang } from "@/lib/i18n";
import { UI } from "@/lib/i18n/ui";
import type { ProbeReport } from "@/lib/probe";

export function ProbePanel({ lang, defaultBrand, domain }: { lang: Lang; defaultBrand: string; domain: string }) {
  const t = UI[lang].probe;
  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [brand, setBrand] = useState(defaultBrand);
  const [prompts, setPrompts] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<ProbeReport | null>(null);

  useEffect(() => {
    fetch("/api/probe").then((r) => r.json()).then((d) => setEnabled(d.enabled)).catch(() => setEnabled(false));
  }, []);

  if (enabled === false) {
    return (
      <div className="card">
        <h3>{t.lockedTitle}</h3>
        <p>{t.lockedBody}</p>
        <p style={{ marginTop: 14 }}><a className="btn" href="#pricing">{t.seePlans}</a></p>
      </div>
    );
  }

  async function run(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setReport(null);
    try {
      const res = await fetch("/api/probe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ brand, domain, prompts: prompts.split("\n") }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error);
      else setReport(data);
    } catch {
      setError(UI[lang].audit.network);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <form onSubmit={run}>
        <h3>{t.title}</h3>
        <p>{t.lead}</p>
        <label htmlFor="brand">{t.brand}</label>
        <input id="brand" className="field" value={brand} onChange={(e) => setBrand(e.target.value)} required />
        <label htmlFor="prompts">{t.questions}</label>
        <textarea id="prompts" rows={5} required value={prompts} onChange={(e) => setPrompts(e.target.value)} placeholder={t.placeholder} />
        <p style={{ marginTop: 12 }}>
          <button className="btn" disabled={loading || enabled === null}>{loading ? t.running : t.run}</button>
        </p>
      </form>
      {error && <p className="error">{error}</p>}
      {report && (
        <div style={{ marginTop: 20 }}>
          <div className="stat">{report.shareOfVoice}%</div>
          <p>{t.sov(report.answers.length)}</p>
          {report.answers.map((a) => (
            <div className="check" key={a.prompt} style={{ paddingLeft: 0, paddingRight: 0 }}>
              <span className={`pill ${a.mentioned ? "pass" : "fail"}`}>{a.mentioned ? (a.position ? `#${a.position}` : t.named) : t.absent}</span>
              <div>
                <h4>{a.prompt}</h4>
                {a.competitors.length > 0 && <p>{t.instead} {a.competitors.join(", ")}</p>}
              </div>
              <span />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
