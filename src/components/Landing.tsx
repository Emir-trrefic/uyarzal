import type { Lang } from "@/lib/i18n";
import { LANDING } from "@/lib/i18n/landing";
import { AuditTool } from "./AuditTool";
import { Pricing } from "./Pricing";
import { SamplePreview } from "./SamplePreview";
import { SiteFooter } from "./SiteFooter";
import { SiteNav } from "./SiteNav";
import { UseCases } from "./UseCases";

function Mark({ value }: { value: boolean | string }) {
  if (value === true) return <span className="yes">✓</span>;
  if (value === false) return <span className="no">✕</span>;
  return <span className="muted">{value}</span>;
}

export function Landing({ lang }: { lang: Lang }) {
  const t = LANDING[lang];
  return (
    <>
      <SiteNav lang={lang} />

      <main>
        <section className="hero" id="top">
          <div className="hero-glow" aria-hidden />
          <div className="container hero-inner">
            <span className="eyebrow">{t.hero.eyebrow}</span>
            <h1>{t.hero.titleA}<em>{t.hero.titleB}</em></h1>
            <p className="lead">{t.hero.lead}</p>
            <AuditTool lang={lang} preview={<SamplePreview lang={lang} />} />
            <ul className="trust-row">{t.hero.trust.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
        </section>

        <section className="engines" aria-label={t.engines.label}>
          <div className="container">
            <p className="muted small">{t.engines.label}</p>
            <ul>{t.engines.list.map((e) => <li key={e}>{e}</li>)}</ul>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <p className="kicker">{t.problem.kicker}</p>
            <h2 className="section-title">{t.problem.title}</h2>
            <p className="section-lead">{t.problem.lead}</p>
            <div className="grid grid-3">
              {t.problem.stats.map((s) => (
                <figure className="card stat-card" key={s.value}>
                  <div className="stat">{s.value}</div>
                  <p>{s.body}</p>
                  <figcaption className="muted small">{s.source}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="section alt" id="how">
          <div className="container">
            <p className="kicker">{t.steps.kicker}</p>
            <h2 className="section-title">{t.steps.title}</h2>
            <ol className="steps">
              {t.steps.items.map((s) => (
                <li className="card step" key={s.n}>
                  <span className="step-n">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section" id="why">
          <div className="container">
            <p className="kicker">{t.compare.kicker}</p>
            <h2 className="section-title">{t.compare.title}</h2>
            <div className="card list table-wrap compare">
              <table>
                <thead>
                  <tr><th />{t.compare.cols.map((c, i) => <th key={c} className={i === 0 ? "us" : ""}>{c}</th>)}</tr>
                </thead>
                <tbody>
                  {t.compare.rows.map(([label, ...cells]) => (
                    <tr key={label}>
                      <td>{label}</td>
                      {cells.map((c, i) => <td key={i} className={i === 0 ? "us" : ""}><Mark value={c} /></td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="muted small note">{t.compare.note}</p>
          </div>
        </section>

        <section className="section alt">
          <div className="container">
            <p className="kicker">{t.useCases.kicker}</p>
            <h2 className="section-title">{t.useCases.title}</h2>
            <UseCases lang={lang} />
          </div>
        </section>

        <section className="section">
          <div className="container">
            <p className="kicker">{t.future.kicker}</p>
            <h2 className="section-title">{t.future.title}</h2>
            <div className="grid grid-4">
              {t.future.items.map((f) => (
                <div className="card future" key={f.title}>
                  <span className={`tag ${f.tag === "Live" || f.tag === "Yayında" ? "live" : ""}`}>{f.tag}</span>
                  <h3>{f.title}</h3>
                  <p>{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section alt" id="pricing">
          <div className="container">
            <p className="kicker">{t.pricing.kicker}</p>
            <h2 className="section-title">{t.pricing.title}</h2>
            <p className="section-lead">{t.pricing.lead}</p>
            <Pricing lang={lang} />
          </div>
        </section>

        <section className="section" id="faq">
          <div className="container narrow">
            <h2 className="section-title">{t.faq.title}</h2>
            {t.faq.items.map((f) => (
              <details className="faq" key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="final-cta">
              <h2>{t.cta.title}</h2>
              <p>{t.cta.body}</p>
              <a className="btn big" href="#top">{t.cta.button}</a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter lang={lang} />

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
                offers: t.pricing.plans.map((p) => ({
                  "@type": "Offer", name: p.name, price: p.monthly, priceCurrency: lang === "tr" ? "TRY" : "USD",
                })),
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
