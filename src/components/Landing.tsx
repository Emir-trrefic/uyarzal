import type { Lang } from "@/lib/i18n";
import { LANDING } from "@/lib/i18n/landing";
import { PRICES } from "@/lib/pricing";
import { AuditCard } from "./AuditCard";
import { AuditTool } from "./AuditTool";
import { CodeShowcase } from "./CodeShowcase";
import { HeroDashboard } from "./HeroDashboard";
import { Pricing } from "./Pricing";
import { RankClimb } from "./RankClimb";
import { ScrollReveal } from "./ScrollReveal";
import { SiteFooter } from "./SiteFooter";
import { SiteNav } from "./SiteNav";
import { UseCases } from "./UseCases";

function Mark({ value }: { value: boolean | string }) {
  if (value === true) return <span className="yes" aria-label="✓">✓</span>;
  if (value === false) return <span className="no" aria-label="—">—</span>;
  return <span>{value}</span>;
}

function SectionHead({ kicker, title, lead, align = "center" }: { kicker?: string; title: string; lead?: string; align?: "center" | "left" }) {
  return (
    <header className={`sec-head reveal ${align}`}>
      {kicker && <p className="kicker">{kicker}</p>}
      <h2 className="section-title">{title}</h2>
      {lead && <p className="section-lead">{lead}</p>}
    </header>
  );
}

export function Landing({ lang }: { lang: Lang }) {
  const t = LANDING[lang];
  const p = t.pro;
  const visuals = {
    audit: <AuditCard lang={lang} />,
    fix: <CodeShowcase lang={lang} />,
    prove: <RankClimb lang={lang} />,
  } as const;

  return (
    <>
      <SiteNav lang={lang} />

      <main>
        {/* Hero: message and audit form on the left, product illustration on the right */}
        <section className="hero" id="top">
          <div className="container hero-grid">
            <div className="hero-text">
              <p className="hero-badge"><span className="dot" />{p.badge}</p>
              <h1>{p.title}</h1>
              <p className="lead">{p.lead}</p>
            </div>
            <AuditTool
              lang={lang}
              preview={<HeroDashboard lang={lang} />}
              footer={
                <div className="hero-foot">
                  <ul className="trust-row">{t.hero.trust.map((x) => <li key={x}>{x}</li>)}</ul>
                  <a className="text-link light" href="#features">{p.secondary}</a>
                </div>
              }
            />
          </div>
        </section>

        <section className="logos" aria-label={t.engines.label}>
          <div className="container logos-row">
            <span>{t.engines.label}</span>
            <ul>{t.engines.list.map((e) => <li key={e}>{e}</li>)}</ul>
          </div>
        </section>

        {/* Product: three alternating feature rows */}
        <section className="section" id="features">
          <div className="container">
            <SectionHead kicker={t.steps.kicker} title={t.steps.title} lead={t.explain.title} />
            <div className="features">
              {p.features.map((f, i) => (
                <article key={f.id} className={`feature reveal${i % 2 ? " flip" : ""}`} id={f.id}>
                  <div className="feature-copy">
                    <p className="kicker">{String(i + 1).padStart(2, "0")} · {f.kicker}</p>
                    <h3>{f.title}</h3>
                    <p>{f.body}</p>
                    <ul className="checks">{f.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
                  </div>
                  <div className="feature-visual">{visuals[f.id as keyof typeof visuals]}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Market metrics */}
        <section className="section alt" id="market">
          <div className="container">
            <SectionHead kicker={t.market.kicker} title={p.metricsTitle} />
            <ul className="metrics reveal">
              {t.market.items.slice(0, 4).map((m) => (
                <li key={m.title}>
                  <strong>{m.fact}</strong>
                  <span>{m.title}</span>
                  <a href={m.href} target="_blank" rel="noopener noreferrer">{m.source}</a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Solutions by segment */}
        <section className="section" id="solutions">
          <div className="container">
            <SectionHead kicker={t.useCases.kicker} title={p.solutionsTitle} />
            <div className="reveal"><UseCases lang={lang} /></div>
          </div>
        </section>

        {/* Comparison */}
        <section className="section alt" id="why">
          <div className="container narrow-lg">
            <SectionHead kicker={t.compare.kicker} title={t.compare.title} />
            <div className="table-card reveal">
              <table className="compare">
                <thead>
                  <tr><th />{t.compare.cols.map((c, i) => <th key={c} className={i === 0 ? "us" : ""}>{c}</th>)}</tr>
                </thead>
                <tbody>
                  {t.compare.rows.map(([label, ...cells]) => (
                    <tr key={label}>
                      <th scope="row">{label}</th>
                      {cells.map((c, i) => <td key={i} className={i === 0 ? "us" : ""}><Mark value={c} /></td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="note">{t.compare.note}</p>
          </div>
        </section>

        {/* Pricing */}
        <section className="section" id="pricing">
          <div className="container">
            <SectionHead kicker={t.pricing.kicker} title={t.pricing.title} lead={t.pricing.lead} />
            <Pricing lang={lang} />
          </div>
        </section>

        {/* FAQ: heading left, questions right */}
        <section className="section alt" id="faq">
          <div className="container faq-grid">
            <SectionHead kicker="FAQ" title={t.faq.title} align="left" />
            <div className="faq-list reveal">
              {t.faq.items.map((f) => (
                <details className="faq" key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Closing call to action */}
        <section className="cta-band">
          <div className="container cta-inner">
            <div>
              <h2>{t.cta.title}</h2>
              <p>{t.cta.body}</p>
            </div>
            <a className="btn btn-lg" href="#top">{t.cta.button}</a>
          </div>
        </section>
      </main>

      <SiteFooter lang={lang} />
      <ScrollReveal />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "SoftwareApplication",
                name: "Quovra",
                applicationCategory: "BusinessApplication",
                operatingSystem: "Web",
                inLanguage: lang,
                description: t.meta.description,
                offers: t.pricing.plans.flatMap((plan) => (["USD", "EUR", "GBP", "TRY"] as const).map((cur) => ({
                  "@type": "Offer", name: plan.name, price: PRICES[plan.id][cur].monthly, priceCurrency: cur,
                }))),
              },
              {
                "@type": "FAQPage",
                mainEntity: t.faq.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
              },
            ],
          }).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
