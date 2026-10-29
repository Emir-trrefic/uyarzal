"use client";

import { useEffect, useState } from "react";
import type { ProbeReport } from "@/lib/probe";

export function ProbePanel({ defaultBrand, domain }: { defaultBrand: string; domain: string }) {
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
        <h3>See what AI actually says about you</h3>
        <p>
          The mention probe asks an AI assistant the questions your buyers ask, then measures your share of voice and
          lists the competitors it recommends instead. It is part of Citeable Pro.
        </p>
        <p style={{ marginTop: 14 }}><a className="btn" href="#pricing">See plans</a></p>
      </div>
    );
  }

  async function run(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setReport(null);
    const res = await fetch("/api/probe", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ brand, domain, prompts: prompts.split("\n") }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) setError(data.error);
    else setReport(data);
  }

  return (
    <div className="card">
      <form onSubmit={run}>
        <h3>AI mention probe</h3>
        <p>Ask the questions your customers ask. One per line, up to five.</p>
        <label htmlFor="brand">Brand name</label>
        <input id="brand" className="field" value={brand} onChange={(e) => setBrand(e.target.value)} required />
        <label htmlFor="prompts">Buyer questions</label>
        <textarea
          id="prompts" rows={5} required value={prompts} onChange={(e) => setPrompts(e.target.value)}
          placeholder={"best accounting software for small agencies\nalternatives to QuickBooks for freelancers"}
        />
        <p style={{ marginTop: 12 }}>
          <button className="btn" disabled={loading || enabled === null}>{loading ? "Asking AI…" : "Run probe"}</button>
        </p>
      </form>
      {error && <p className="error">{error}</p>}
      {report && (
        <div style={{ marginTop: 20 }}>
          <div className="stat">{report.shareOfVoice}%</div>
          <p>share of voice across {report.answers.length} question(s)</p>
          {report.answers.map((a) => (
            <div className="check" key={a.prompt} style={{ paddingLeft: 0, paddingRight: 0 }}>
              <span className={`pill ${a.mentioned ? "pass" : "fail"}`}>{a.mentioned ? (a.position ? `#${a.position}` : "named") : "absent"}</span>
              <div>
                <h4>{a.prompt}</h4>
                {a.competitors.length > 0 && <p>Recommended instead: {a.competitors.join(", ")}</p>}
              </div>
              <span />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
