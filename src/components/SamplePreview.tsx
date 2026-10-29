import type { Lang } from "@/lib/i18n";
import { LANDING } from "@/lib/i18n/landing";
import { UI } from "@/lib/i18n/ui";
import { ScoreRing } from "./ScoreRing";

/** Static, clearly-labelled example of a report, shown before the visitor runs their own audit. */
export function SamplePreview({ lang }: { lang: Lang }) {
  const t = LANDING[lang].preview;
  const r = UI[lang].report;
  return (
    <div className="preview" aria-label={t.badge}>
      <span className="preview-badge">{t.badge}</span>
      <div className="preview-grid">
        <div className="card preview-score">
          <ScoreRing score={58} grade="C" gradeLabel={r.grade} ariaLabel={r.scoreLabel(58, "C")} />
          <p className="preview-site">{t.site}</p>
          <ul className="preview-checks">
            {t.checks.map(([status, text]) => (
              <li key={text}><span className={`dot ${status}`} />{text}</li>
            ))}
          </ul>
        </div>
        <div className="card preview-answer">
          <p className="muted small">{t.answerLabel}</p>
          <p className="preview-q">{t.question}</p>
          <ul className="preview-rows">
            {t.rows.map(([name, share], i) => (
              <li key={name} className={i === t.rows.length - 1 ? "you" : ""}>
                <span>{name}</span>
                <span className="bar"><span style={{ width: `${(Number(share[0]) / 5) * 100}%` }} /></span>
                <span className="pts">{share}</span>
              </li>
            ))}
          </ul>
          <div className="preview-sov">
            <strong>{t.sov}</strong>
            <span className="muted small">{t.ci}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
