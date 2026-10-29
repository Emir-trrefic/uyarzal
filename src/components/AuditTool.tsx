"use client";

import { useEffect, useState } from "react";
import type { AuditReport } from "@/lib/audit/types";
import { Report } from "./Report";

const STEPS = [
  "Fetching your page like an AI crawler",
  "Reading robots.txt, llms.txt and sitemap",
  "Checking 14 AI user agents",
  "Scoring structure, content and trust",
  "Writing your fixes",
];

export function AuditTool() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<AuditReport | null>(null);

  useEffect(() => {
    if (!loading) return;
    const t = setInterval(() => setStep((s) => Math.min(s + 1, STEPS.length - 1)), 900);
    return () => clearInterval(t);
  }, [loading]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStep(0);
    setError(null);
    setReport(null);
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error ?? "Something went wrong.");
      else setReport(data);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form className="audit-form" onSubmit={submit}>
        <input
          aria-label="Website URL" placeholder="yourcompany.com" value={url} required
          onChange={(e) => setUrl(e.target.value)} inputMode="url" autoComplete="url"
        />
        <button className="btn" disabled={loading}>{loading ? "Auditing…" : "Run free audit"}</button>
      </form>
      <p className="hint">Free · No sign-up · 20 checks in about 10 seconds</p>
      {loading && (
        <ul className="progress">
          {STEPS.map((s, i) => <li key={s} className={i <= step ? "done" : ""}>{s}</li>)}
        </ul>
      )}
      {error && <p className="error">{error}</p>}
      {report && <Report report={report} />}
    </div>
  );
}
