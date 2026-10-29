"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { AuditReport } from "@/lib/audit/types";
import type { Lang } from "@/lib/i18n";
import { UI } from "@/lib/i18n/ui";
import { Report } from "./Report";

/** The audit form and its report. `preview` is shown until the visitor runs their own audit. */
export function AuditTool({ lang, preview }: { lang: Lang; preview?: React.ReactNode }) {
  const t = UI[lang].audit;
  const [url, setUrl] = useState("");
  const [multi, setMulti] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<AuditReport | null>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!loading) return;
    const timer = setInterval(() => setStep((s) => Math.min(s + 1, t.steps.length - 1)), multi ? 2500 : 900);
    return () => clearInterval(timer);
  }, [loading, multi, t.steps.length]);

  const run = useCallback(async (target: string, pages: boolean) => {
    setLoading(true);
    setStep(0);
    setError(null);
    setReport(null);
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url: target, lang, pages: pages ? 10 : 1 }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? t.generic);
        return;
      }
      setReport(data);
      // Make the result shareable: /?url=example.com re-runs the same audit.
      const params = new URLSearchParams({ url: target });
      if (pages) params.set("pages", "10");
      history.replaceState(null, "", `${location.pathname}?${params}`);
    } catch {
      setError(t.network);
    } finally {
      setLoading(false);
    }
  }, [lang, t.generic, t.network]);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const params = new URLSearchParams(location.search);
    const shared = params.get("url");
    if (shared) {
      const pages = params.get("pages") === "10";
      setUrl(shared);
      setMulti(pages);
      void run(shared, pages);
    }
  }, [run]);

  return (
    <div>
      <form className="audit-form" onSubmit={(e) => { e.preventDefault(); void run(url, multi); }}>
        <input
          aria-label={t.inputLabel} placeholder={t.placeholder} value={url} required
          onChange={(e) => setUrl(e.target.value)} inputMode="url" autoComplete="url"
        />
        <button className="btn" disabled={loading}>{loading ? t.running : t.submit}</button>
      </form>
      <label className="check-option">
        <input type="checkbox" checked={multi} onChange={(e) => setMulti(e.target.checked)} disabled={loading} />
        {t.multi}
      </label>
      <p className="hint">{t.hint}</p>
      {loading && (
        <ul className="progress">
          {t.steps.map((s, i) => <li key={s} className={i <= step ? "done" : ""}>{s}</li>)}
        </ul>
      )}
      {error && <p className="error">{error}</p>}
      {report && <Report report={report} lang={lang} />}
      {!report && !loading && !error && preview}
    </div>
  );
}
