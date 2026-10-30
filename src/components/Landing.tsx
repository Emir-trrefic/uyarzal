import type { Lang } from "@/lib/i18n";
import { LANDING } from "@/lib/i18n/landing";
import { PRICES } from "@/lib/pricing";
import { AuditTool } from "./AuditTool";
import { Pricing } from "./Pricing";
import { SamplePreview } from "./SamplePreview";
import { SiteFooter } from "./SiteFooter";
import { SiteNav } from "./SiteNav";
import { UseCases } from "./UseCases";

function Mark({ value }: { value: boolean | string }) {
  if (value === true) return <span className="yes" aria-label="✓">●</span>;
  if (value === false) return <span className="no" aria-label="✕">○</span>;
  return <span>{value}</span>;
}

/** Section header: a § number on a rule, then the kicker and title. */
function Head({ n, kicker, title, lead }: { n: number; kicker: string; title: string; lead?: string }) {
  return (
    <header className="sec-head">
      <div className="sec-rule"><span>§ {String(n).padStart(2, "0")}</span><span>{kicker}</span></div>
      <h2 className="section-title">{title}</h2>
      {lead && <p className="section-lead">{lead}</p>}
    </header>
  );
}

export function Landing({ lang }: { lang: Lang }) {
  const t = LANDING[lang];
  return (
    <>
      <SiteNav lang={lang} />

      <main>
        <section className="hero" id="top">
          <div className="container hero-grid">
            <div className="hero-text">
              <p className="eyebrow">{t.hero.eyebrow}</p>
              <h1>{t.hero.titleA}<em>{t.hero.titleB}</em></h1>
              <p className="lead">{t.hero.lead}</p>
            </div>
            <AuditTool
              lang={lang}
              preview={<SamplePreview lang={lang} />}
              footer={<ul className="trust-row">{t.hero.trust.map((x) => <li key={x}>{x}</li>)}</ul>}
            />
          </div>
        </section>

        <section className="engines" aria-label={t.engines.label}>
          <div className="container engines-row">
            <p>{t.engines.label}</p>
            <ul>{t.engines.list.map((e) => <li key={e}>{e}</li>)}</ul>
          </div>
        </section>

        <section className="section" id="geo">
          <div className="container">
            <Head n={1} kicker={t.explain.kicker} title={t.explain.title} />
            <ol className="flow">
              {t.explain.flow.map((f) => (
                <li key={f.n}>
                  <span className="flow-n">{f.n}</span>
                  <h3>{f.title}</h3>
                  <p>{f.body}</p>
                </li>
              ))}
            </ol>
            <div className="vs">
              <h3>{t.explain.vsTitle}</h3>
              <div className="table-wrap">
                <table>
                  <thead><tr><th /><th>SEO</th><th className="us">GEO</th></tr></thead>
                  <tbody>
                    {t.explain.vs.map(([label, seo, geo]) => (
                      <tr key={label}><th scope="row">{label}</th><td>{seo}</td><td className="us">{geo}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <a className="text-link" href={t.nav.guideHref}>{t.explain.more} →</a>
            </div>
          </div>
        </section>

        <section className="section" id="how">
          <div className="container">
            <Head n={2} kicker={t.steps.kicker} title={t.steps.title} />
            <ol className="steps">
              {t.steps.items.map((s) => (
                <li className="step" key={s.n}>
                  <span className="step-n">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section" id="market">
          <div className="container">
            <Head n={3} kicker={t.market.kicker} title={t.market.title} />
            <ul className="market">
              {t.market.items.map((m) => (
                <li key={m.title}>
                  <span className="market-fact">{m.fact}</span>
                  <h3>{m.title}</h3>
                  <p>{m.body}</p>
                  <a href={m.href} target="_blank" rel="noopener noreferrer" className="market-src">{m.source} ↗</a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section" id="why">
          <div className="container">
            <Head n={4} kicker={t.compare.kicker} title={t.compare.title} />
            <div className="table-wrap compare">
              <table>
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

        <section className="section">
          <div className="container">
            <Head n={5} kicker={t.useCases.kicker} title={t.useCases.title} />
            <UseCases lang={lang} />
          </div>
        </section>

        <section className="section">
          <div className="container">
            <Head n={6} kicker={t.future.kicker} title={t.future.title} />
            <ul className="future-list">
              {t.future.items.map((f) => (
                <li key={f.title}>
                  <span className={`status-tag ${f.tag === "Live" || f.tag === "Yayında" ? "live" : ""}`}>{f.tag}</span>
                  <h3>{f.title}</h3>
                  <p>{f.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section" id="pricing">
          <div className="container">
            <Head n={7} kicker={t.pricing.kicker} title={t.pricing.title} lead={t.pricing.lead} />
            <Pricing lang={lang} />
          </div>
        </section>

        <section className="section" id="faq">
          <div className="container">
            <Head n={8} kicker="FAQ" title={t.faq.title} />
            <div className="faq-list">
              {t.faq.items.map((f, i) => (
                <details className="faq" key={f.q}>
                  <summary><span className="faq-n">{String(i + 1).padStart(2, "0")}</span>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="final-cta">
          <div className="container">
            <div className="final-inner">
              <h2>{t.cta.title}</h2>
              <div>
                <p>{t.cta.body}</p>
                <a className="btn accent big" href="#top">{t.cta.button}</a>
              </div>
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
                offers: t.pricing.plans.flatMap((p) => (["USD", "EUR", "GBP", "TRY"] as const).map((cur) => ({
                  "@type": "Offer", name: p.name, price: PRICES[p.id][cur].monthly, priceCurrency: cur,
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
