import type { Lang } from "@/lib/i18n";
import { LANDING } from "@/lib/i18n/landing";
import { REPO_URL } from "@/lib/site";
import { Logo } from "./Logo";

export function SiteFooter({ lang }: { lang: Lang }) {
  const t = LANDING[lang].footer;
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Logo href={lang === "tr" ? "/tr" : "/"} />
          <p className="muted">{t.tagline}</p>
          <a className="made-by" href="https://softmain.com.tr" target="_blank" rel="noopener">
            {lang === "tr" ? <><strong>softmain</strong> {t.madeBy}</> : <>{t.madeBy} <strong>softmain</strong></>}
          </a>
        </div>
        {t.cols.map((col) => (
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
        <span>{t.legal}</span>
      </div>
    </footer>
  );
}
