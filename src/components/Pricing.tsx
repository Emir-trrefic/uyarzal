"use client";

import { useState } from "react";
import type { Lang } from "@/lib/i18n";
import { UI } from "@/lib/i18n/ui";
import { LeadForm } from "./LeadForm";

export function Pricing({ lang }: { lang: Lang }) {
  const t = UI[lang].pricing;
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="grid grid-3">
      {t.plans.map((p) => (
        <div className={`card plan${p.featured ? " featured" : ""}`} key={p.id}>
          <h3>{p.name}</h3>
          <div className="price">{p.price}{p.id !== "free" && <small>{t.perMonth}</small>}</div>
          <ul>{p.items.map((i) => <li key={i}>{i}</li>)}</ul>
          {p.id === "free" ? (
            <a className="btn ghost" href="#top">{p.cta}</a>
          ) : open === p.id ? (
            <LeadForm lang={lang} plan={p.id as "pro" | "agency"} />
          ) : (
            <button className={`btn${p.featured ? "" : " ghost"}`} onClick={() => setOpen(p.id)}>{p.cta}</button>
          )}
        </div>
      ))}
    </div>
  );
}
