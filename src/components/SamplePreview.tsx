import type { Lang } from "@/lib/i18n";
import { LANDING } from "@/lib/i18n/landing";

/**
 * A clearly-labelled example of what Quovra measures, set like a quoted
 * excerpt: the AI answer with footnoted brands and the visitor's brand
 * highlighted, followed by the mention counts and the confidence interval.
 */
export function SamplePreview({ lang }: { lang: Lang }) {
  const t = LANDING[lang].preview;
  const last = t.rows.length;
  return (
    <figure className="excerpt" aria-label={t.badge}>
      <figcaption className="excerpt-head">
        <span>{t.badge}</span>
        <span>{t.source}</span>
      </figcaption>
      <p className="excerpt-q">{t.question}</p>
      <blockquote className="excerpt-a">
        {t.answer.map((part, i) =>
          typeof part === "string" ? (
            <span key={i}>{part}</span>
          ) : (
            <span key={i} className={part[1] === last ? "mark" : "named"}>
              {part[0]}<sup>{part[1]}</sup>
            </span>
          ),
        )}
      </blockquote>
      <ol className="excerpt-notes">
        {t.rows.map(([name, share], i) => (
          <li key={name} className={i === last - 1 ? "you" : ""}>
            <span className="fn">{i + 1}</span>
            <span className="fn-name">{name}{i === last - 1 && <em> ← {t.you}</em>}</span>
            <span className="fn-dots" aria-hidden />
            <span className="fn-val">{share}</span>
          </li>
        ))}
      </ol>
      <div className="excerpt-foot">
        <strong>{t.sov}</strong>
        <span>{t.ci}</span>
      </div>
      <ul className="excerpt-checks">
        <li className="excerpt-audit">{t.auditLine} <strong>58/100 · C</strong></li>
        {t.checks.map(([status, text]) => (
          <li key={text}><span className={`sq ${status}`} aria-hidden />{text}</li>
        ))}
      </ul>
    </figure>
  );
}
