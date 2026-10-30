import type { Lang } from "@/lib/i18n";
import { LANDING } from "@/lib/i18n/landing";
import { REPO_URL } from "@/lib/site";
import { Logo } from "./Logo";

export function SiteFooter({ lang }: { lang: Lang }) {
  const t = LANDING[lang];
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo href={lang === "tr" ? "/tr" : "/"} />
          <p>{t.footer.tagline}</p>
          <a className="made-by" href="https://softmain.com.tr" target="_blank" rel="noopener">
            {lang === "tr" ? <><strong>softmain</strong> {t.footer.madeBy}</> : <>{t.footer.madeBy} <strong>softmain</strong></>}
          </a>
        </div>
        {t.pro.footerCols.map((col) => (
          <div key={col.title}>
            <h4>{col.title}</h4>
            <ul>
              {col.links.map(([label, href]) => (
                <li key={label}><a href={href === "REPO" ? REPO_URL : href}>{label}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Quovra</span>
        <span>{t.footer.legal}</span>
      </div>
    </footer>
  );
}
