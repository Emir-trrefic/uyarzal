const BANDS = [
  { grade: "F", from: 0 },
  { grade: "D", from: 40 },
  { grade: "C", from: 55 },
  { grade: "B", from: 70 },
  { grade: "A", from: 85 },
];

/** Large numeral, a stamped grade and a 0–100 scale marked with the grade bands. */
export function ScoreMeter({ score, grade, gradeLabel, ariaLabel }: { score: number; grade: string; gradeLabel: string; ariaLabel: string }) {
  const tone = score >= 70 ? "pass" : score >= 45 ? "warn" : "fail";
  return (
    <div className="meter" role="img" aria-label={ariaLabel}>
      <div className="meter-top">
        <span className="meter-score">{score}</span>
        <span className="meter-max">/100</span>
        <span className={`meter-grade ${tone}`} title={`${gradeLabel} ${grade}`}>{grade}</span>
      </div>
      <div className="meter-scale">
        {BANDS.map((b, i) => {
          const to = BANDS[i + 1]?.from ?? 100;
          return (
            <span key={b.grade} className={`band${b.grade === grade ? " on" : ""}`} style={{ width: `${to - b.from}%` }}>
              <em>{b.grade}</em>
            </span>
          );
        })}
        <span className="meter-pin" style={{ left: `${score}%` }} />
      </div>
    </div>
  );
}
