"use client";

import { useState } from "react";
import type { Lang } from "@/lib/i18n";
import { type Cell, LANDING, type Plan } from "@/lib/i18n/landing";
import { LeadForm, type LeadPlan } from "./LeadForm";

function formatPrice(n: number, lang: Lang) {
  return new Intl.NumberFormat(lang === "tr" ? "tr-TR" : "en-US").format(n);
}

function CellView({ value, soon }: { value: Cell; soon: string }) {
  if (value === true) return <span className="yes" aria-label="✓">✓</span>;
  if (value === false) return <span className="no" aria-label="—">—</span>;
  if (value === "soon") return <span className="soon-tag">{soon}</span>;
  return <>{value}</>;
}

export function Pricing({ lang }: { lang: Lang }) {
  const t = LANDING[lang].pricing;
  const [yearly, setYearly] = useState(true);
  const [open, setOpen] = useState<string | null>(null);

  const price = (p: Plan) => (yearly ? p.yearly : p.monthly);
  const amount = (p: Plan) => (lang === "tr" ? `${t.currency}${formatPrice(price(p), lang)}` : `${t.currency}${price(p)}`);

  return (
    <>
      <div className="billing-toggle" role="radiogroup" aria-label={`${t.monthly} / ${t.yearly}`}>
        <button role="radio" aria-checked={!yearly} className={!yearly ? "on" : ""} onClick={() => setYearly(false)}>{t.monthly}</button>
        <button role="radio" aria-checked={yearly} className={yearly ? "on" : ""} onClick={() => setYearly(true)}>
          {t.yearly} <span className="save">{t.save}</span>
        </button>
      </div>

      <div className="plans">
        {t.plans.map((p) => (
          <div className={`card plan${p.featured ? " featured" : ""}`} key={p.id}>
            {p.featured && <span className="plan-badge">{t.popular}</span>}
            <div>
              <h3>{p.name}</h3>
              <p className="muted small">{p.tagline}</p>
            </div>
            <div className="price">
              {amount(p)}
              {p.monthly > 0 && <small>{t.perMonth}</small>}
            </div>
            <p className="muted small price-note">{p.monthly > 0 && yearly ? t.billedYearly : " "}</p>
            <ul>{p.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
            {p.id === "free" ? (
              <a className="btn ghost" href="#top">{p.cta}</a>
            ) : open === p.id ? (
              <LeadForm lang={lang} plan={p.id as LeadPlan} />
            ) : (
              <button className={`btn${p.featured ? "" : " ghost"}`} onClick={() => setOpen(p.id)}>{p.cta}</button>
            )}
          </div>
        ))}
      </div>

      <details className="compare-plans">
        <summary>{t.tableTitle}</summary>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th />{t.plans.map((p) => <th key={p.id}>{p.name}</th>)}</tr>
            </thead>
            <tbody>
              {t.table.map(([label, ...cells]) => (
                <tr key={label}>
                  <td>{label}</td>
                  {cells.map((c, i) => <td key={i}><CellView value={c} soon={t.soon} /></td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>

      <div className="card service">
        <div>
          <h3>{t.service.title}</h3>
          <p>{t.service.body}</p>
          <p className="service-price">{t.service.price}</p>
        </div>
        {open === "setup" ? (
          <LeadForm lang={lang} plan="setup" />
        ) : (
          <button className="btn ghost" onClick={() => setOpen("setup")}>{t.service.cta}</button>
        )}
      </div>
    </>
  );
}
