"use client";

import { useState } from "react";
import type { Lang } from "@/lib/i18n";
import { UI } from "@/lib/i18n/ui";

export type LeadPlan = "starter" | "growth" | "agency" | "setup" | "monitoring";

export function LeadForm({ lang, plan, site }: { lang: Lang; plan: LeadPlan; site?: string }) {
  const t = UI[lang].lead;
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error" | "invalid">("idle");

  if (state === "done") return <p className="lead-done">{t.thanks}</p>;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, plan, site, lang }),
      });
      setState(res.ok ? "done" : res.status === 400 ? "invalid" : "error");
    } catch {
      setState("error");
    }
  }

  return (
    <form className="lead-form" onSubmit={submit}>
      <input
        className="field" type="email" required placeholder={t.email} aria-label={t.email}
        value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email"
      />
      <button className="btn" disabled={state === "sending"}>{state === "sending" ? t.sending : t.submit}</button>
      {state === "invalid" && <p className="form-error">{t.invalid}</p>}
      {state === "error" && <p className="form-error">{t.error}</p>}
    </form>
  );
}
