"use client";

import { useEffect, useState } from "react";
import type { Lang } from "@/lib/i18n";
import { type Cell, LANDING } from "@/lib/i18n/landing";
import { CURRENCIES, type Currency, formatMoney, guessCurrency, PRICES, SETUP_FROM } from "@/lib/pricing";
import { LeadForm, type LeadPlan } from "./LeadForm";

function CellView({ value, soon }: { value: Cell; soon: string }) {
  if (value === true) return <span className="yes" aria-label="✓">✓</span>;
  if (value === false) return <span className="no" aria-label="—">—</span>;
  if (value === "soon") return <span className="soon-tag">{soon}</span>;
  return <>{value}</>;
}

export function Pricing({ lang }: { lang: Lang }) {
  const t = LANDING[lang].pricing;
  const [yearly, setYearly] = useState(true);
  const [currency, setCurrency] = useState<Currency>(lang === "tr" ? "TRY" : "USD");
  const [open, setOpen] = useState<string | null>(null);

  // Show the visitor's likely currency; they can still switch manually.
  useEffect(() => {
    if (lang === "tr") return;
    setCurrency(guessCurrency(navigator.languages ?? [navigator.language], Intl.DateTimeFormat().resolvedOptions().timeZone));
  }, [lang]);

  return (
    <>
      <div className="pricing-controls">
        <div className="billing-toggle" role="radiogroup" aria-label={`${t.monthly} / ${t.yearly}`}>
          <button role="radio" aria-checked={!yearly} className={!yearly ? "on" : ""} onClick={() => setYearly(false)}>{t.monthly}</button>
          <button role="radio" aria-checked={yearly} className={yearly ? "on" : ""} onClick={() => setYearly(true)}>
            {t.yearly} <span className="save">{t.save}</span>
          </button>
        </div>
        <div className="billing-toggle currency-toggle" role="radiogroup" aria-label={t.currencyLabel}>
          {CURRENCIES.map((c) => (
            <button key={c.code} role="radio" aria-checked={currency === c.code} className={currency === c.code ? "on" : ""} onClick={() => setCurrency(c.code)}>
              {c.code}
            </button>
          ))}
        </div>
      </div>

      <div className="plans">
        {t.plans.map((p) => {
          const price = PRICES[p.id][currency];
          const amount = yearly ? price.yearly : price.monthly;
          return (
            <div className={`plan${p.featured ? " featured" : ""}`} key={p.id}>
              {p.featured && <span className="plan-badge">{t.popular}</span>}
              <div>
                <h3>{p.name}</h3>
                <p className="muted small">{p.tagline}</p>
              </div>
              <div className="price">
                {formatMoney(amount, currency)}
                {price.monthly > 0 && <small>{t.perMonth}</small>}
              </div>
              <p className="muted small price-note">{price.monthly > 0 && yearly ? t.billedYearly : " "}</p>
              <ul>{p.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
              {p.id === "free" ? (
                <a className="btn ghost" href="#top">{p.cta}</a>
              ) : open === p.id ? (
                <LeadForm lang={lang} plan={p.id as LeadPlan} />
              ) : (
                <button className={`btn${p.featured ? "" : " ghost"}`} onClick={() => setOpen(p.id)}>{p.cta}</button>
              )}
            </div>
          );
        })}
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

      <div className="service">
        <div>
          <h3>{t.service.title}</h3>
          <p>{t.service.body}</p>
          <p className="service-price">{t.service.priceFrom.replace("{price}", formatMoney(SETUP_FROM[currency], currency))}</p>
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
