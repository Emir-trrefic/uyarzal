import type { Lang } from "@/lib/i18n";
import { UI } from "@/lib/i18n/ui";
import { ScoreMeter } from "./ScoreMeter";

const ROWS = {
  tr: [["fail", "ChatGPT arama botu engelli", "0/15"], ["warn", "SSS içeriği eksik", "2/4"], ["pass", "İçerik JavaScript'siz görünüyor", "10/10"], ["pass", "Yapısal veri mevcut", "10/10"]],
  en: [["fail", "ChatGPT search bot blocked", "0/15"], ["warn", "FAQ content missing", "2/4"], ["pass", "Content visible without JavaScript", "10/10"], ["pass", "Structured data present", "10/10"]],
} as const;

/** Compact, static example of an audit result used as a feature illustration. */
export function AuditCard({ lang }: { lang: Lang }) {
  const r = UI[lang].report;
  return (
    <div className="audit-card">
      <ScoreMeter score={58} grade="C" gradeLabel={r.grade} ariaLabel={r.scoreLabel(58, "C")} />
      <ul>
        {ROWS[lang].map(([status, text, pts]) => (
          <li key={text}>
            <span className={`pill ${status}`}>{r.status[status]}</span>
            <span className="audit-card-text">{text}</span>
            <span className="pts">{pts}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
