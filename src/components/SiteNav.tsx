import type { Lang } from "@/lib/i18n";
import { LANDING } from "@/lib/i18n/landing";
import { Logo } from "./Logo";

export function SiteNav({ lang, home = true }: { lang: Lang; home?: boolean }) {
  const t = LANDING[lang].nav;
  const base = lang === "tr" ? "/tr" : "/";
  const anchor = (id: string) => (home ? `#${id}` : `${base}#${id}`);
  return (
    <header className="site-nav">
      <div className="container nav">
        <Logo href={base} />
        <nav className="nav-links" aria-label="Main">
          <a href={anchor("how")} className="hide-md">{t.product}</a>
          <a href={anchor("why")} className="hide-md">{t.why}</a>
          <a href={anchor("pricing")} className="hide-sm">{t.pricing}</a>
          <a href={t.methodHref} className="hide-md">{t.method}</a>
          <a href={t.switchHref} hrefLang={lang === "tr" ? "en" : "tr"} className="lang-switch" aria-label={lang === "tr" ? "English" : "Türkçe"}>{t.switchLabel}</a>
          <a href={anchor("top")} className="btn small">{t.cta}</a>
        </nav>
      </div>
    </header>
  );
}
