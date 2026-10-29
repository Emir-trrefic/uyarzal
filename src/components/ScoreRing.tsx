export function ScoreRing({ score, grade }: { score: number; grade: string }) {
  const r = 72;
  const c = 2 * Math.PI * r;
  const color = score >= 70 ? "var(--pass)" : score >= 45 ? "var(--warn)" : "var(--fail)";
  return (
    <div className="ring" role="img" aria-label={`AI visibility score ${score} out of 100, grade ${grade}`}>
      <svg width="168" height="168" viewBox="0 0 168 168">
        <circle cx="84" cy="84" r={r} fill="none" stroke="var(--surface-2)" strokeWidth="14" />
        <circle
          cx="84" cy="84" r={r} fill="none" stroke={color} strokeWidth="14" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c * (1 - score / 100)}
          style={{ transition: "stroke-dashoffset 900ms ease" }}
        />
      </svg>
      <div className="ring-label">
        <div>
          <div className="ring-score">{score}</div>
          <div className="ring-grade">Grade {grade}</div>
        </div>
      </div>
    </div>
  );
}
