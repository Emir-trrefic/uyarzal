import type { Lang } from "@/lib/i18n";
import { LANDING } from "@/lib/i18n/landing";

// Weekly share of voice for the example: the brand rises while the top competitor flattens.
const YOU = [20, 24, 31, 38, 45, 51, 57, 62];
const RIVAL = [48, 49, 47, 46, 44, 43, 42, 41];
const W = 520;
const H = 150;

function path(values: number[]) {
  const step = W / (values.length - 1);
  return values.map((v, i) => `${i === 0 ? "M" : "L"}${(i * step).toFixed(1)},${(H - (v / 70) * H).toFixed(1)}`).join(" ");
}

/** A static, clearly-labelled product illustration for the hero. */
export function HeroDashboard({ lang }: { lang: Lang }) {
  const t = LANDING[lang].pro.dash;
  return (
    <div className="dash" aria-label={t.label}>
      <div className="dash-bar">
        <span className="dots" aria-hidden><i /><i /><i /></span>
        <span className="dash-url">quovra.app/{t.site}</span>
        <span className="dash-tag">{t.label}</span>
      </div>
      <div className="dash-body">
        <div className="dash-kpis">
          {t.kpis.map(([label, value, delta]) => (
            <div key={label} className="dash-kpi">
              <span>{label}</span>
              <strong>{value}</strong>
              <em>{delta}</em>
            </div>
          ))}
        </div>
        <div className="dash-row">
          <div className="dash-chart">
            <div className="dash-chart-head">
              <span>{t.chartTitle}</span>
              <span className="dash-legend"><i className="you" />{t.you}<i className="rival" />{t.rival}</span>
            </div>
            <svg viewBox={`0 -6 ${W} ${H + 12}`} preserveAspectRatio="none" role="img" aria-hidden>
              {[0, 1, 2, 3].map((i) => <line key={i} x1="0" x2={W} y1={(H / 3) * i} y2={(H / 3) * i} className="grid" />)}
              <path d={`${path(YOU)} L${W},${H} L0,${H} Z`} className="area" />
              <path d={path(RIVAL)} className="rival" />
              <path d={path(YOU)} className="you" />
            </svg>
          </div>
          <div className="dash-engines">
            <span className="dash-sub">{t.enginesTitle}</span>
            {t.engines.map(([name, v]) => (
              <div key={name} className="dash-engine">
                <span>{name}</span>
                <div className="dash-meter"><i style={{ width: `${v}%` }} /></div>
                <b>{lang === "tr" ? `%${v}` : `${v}%`}</b>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
