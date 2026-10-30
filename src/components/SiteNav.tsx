import type { Lang } from "@/lib/i18n";
import { LANDING } from "@/lib/i18n/landing";
import { Logo } from "./Logo";

export function SiteNav({ lang, home = true }: { lang: Lang; home?: boolean }) {
  const t = LANDING[lang].nav;
  const base = lang === "tr" ? "/tr" : "/";
  const anchor = (id: string) => (home ? `#${id}` : `${base}#${id}`);
  const links: [string, string][] = [
    [t.product, anchor("features")],
    [t.solutions, anchor("solutions")],
    [t.pricing, anchor("pricing")],
    [t.resources, t.resourcesHref],
    [t.company, t.companyHref],
  ];
  return (
    <header className="site-nav">
      <div className="container nav">
        <Logo href={base} />
        <nav className="nav-center" aria-label="Main">
          {links.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
        </nav>
        <div className="nav-right">
          <a href={t.switchHref} hrefLang={lang === "tr" ? "en" : "tr"} className="lang-switch" aria-label={lang === "tr" ? "English" : "Türkçe"}>{t.switchLabel}</a>
          <a href={anchor("top")} className="btn btn-sm">{t.cta}</a>
          <details className="nav-mobile">
            <summary aria-label="Menu"><span /><span /></summary>
            <div className="nav-mobile-panel">
              {links.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
