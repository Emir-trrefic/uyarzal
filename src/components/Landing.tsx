import type { Lang } from "@/lib/i18n";
import { UI } from "@/lib/i18n/ui";
import { REPO_URL } from "@/lib/site";
import { AuditTool } from "./AuditTool";
import { Pricing } from "./Pricing";

export function Landing({ lang }: { lang: Lang }) {
  const t = UI[lang];
  return (
    <>
      <div className="container" id="top">
        <nav className="nav">
          <a className="logo" href={lang === "tr" ? "/tr" : "/"}><span className="logo-mark">Q</span>Quovra</a>
          <div className="nav-links">
            <a href="#how" className="hide-sm">{t.nav.how}</a>
            <a href="#pricing">{t.nav.pricing}</a>
            <a href={REPO_URL} className="hide-sm">GitHub</a>
            <a href={t.nav.switchHref} hrefLang={lang === "tr" ? "en" : "tr"} className="lang-switch">{t.nav.switchLabel}</a>
          </div>
        </nav>

        <header className="hero">
          <span className="eyebrow">{t.hero.eyebrow}</span>
          <h1>{t.hero.titleA}<em>{t.hero.titleB}</em></h1>
          <p className="lead">{t.hero.lead}</p>
          <AuditTool lang={lang} />
        </header>
      </div>

      <section>
        <div className="container grid grid-3">
          {t.stats.map((s) => (
            <div className="card" key={s.value}><div className="stat">{s.value}</div><p>{s.body}</p></div>
          ))}
        </div>
      </section>

      <section id="how">
        <div className="container">
          <h2 className="section-title">{t.features.title}</h2>
          <p className="section-lead">{t.features.lead}</p>
          <div className="grid grid-3">
            {t.features.items.map((f) => (
              <div className="card" key={f.title}><h3>{f.title}</h3><p>{f.body}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing">
        <div className="container">
          <h2 className="section-title">{t.pricing.title}</h2>
          <p className="section-lead">{t.pricing.lead}</p>
          <Pricing lang={lang} />
        </div>
      </section>

      <section id="faq">
        <div className="container" style={{ maxWidth: 760 }}>
          <h2 className="section-title">{t.faq.title}</h2>
          {t.faq.items.map((f) => (
            <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
          ))}
        </div>
      </section>

      <footer>
        <div className="container">
          <span>© {new Date().getFullYear()} {t.footer.left}</span>
          <span>{t.footer.right}</span>
        </div>
      </footer>

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
                offers: t.pricing.plans.map((p) => ({ "@type": "Offer", name: p.name, price: p.price.replace("$", ""), priceCurrency: "USD" })),
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
