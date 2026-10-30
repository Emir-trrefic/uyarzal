"use client";

import { useEffect, useRef, useState } from "react";
import type { Lang } from "@/lib/i18n";
import { LANDING } from "@/lib/i18n/landing";

/** Each step is a week: the brand's position (0 = top) and the metrics at that point. */
const STEPS = [
  { week: 0, pos: 4, score: 58, share: 20 },
  { week: 2, pos: 3, score: 67, share: 35 },
  { week: 4, pos: 2, score: 76, share: 50 },
  { week: 6, pos: 1, score: 84, share: 65 },
  { week: 8, pos: 0, score: 91, share: 80 },
];
const ROW = 64;
const STEP_MS = 1900;

/** Number that eases from its previous value to the new one. */
function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [shown, setShown] = useState(value);
  const from = useRef(value);
  useEffect(() => {
    const start = performance.now();
    const a = from.current;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 700);
      const eased = 1 - Math.pow(1 - t, 3);
      setShown(Math.round(a + (value - a) * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
      else from.current = value;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <>{shown}{suffix}</>;
}

export function RankClimb({ lang }: { lang: Lang }) {
  const t = LANDING[lang].climb;
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Start when the demo scrolls into view; pause when it leaves.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setRunning(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStep(STEPS.length - 1);
      return;
    }
    const id = setInterval(() => setStep((s) => (s + 1) % (STEPS.length + 1)), STEP_MS);
    return () => clearInterval(id);
  }, [running]);

  // One extra tick holds the final state before the loop restarts.
  const current = STEPS[Math.min(step, STEPS.length - 1)];
  const names = [...t.others];
  // Rows: competitors keep their relative order; the brand is inserted at its current position.
  const order: { id: string; name: string; you: boolean }[] = names.map((n, i) => ({ id: `c${i}`, name: n, you: false }));
  order.splice(current.pos, 0, { id: "you", name: t.you, you: true });

  return (
    <div className="climb" ref={ref}>
      <div className="climb-board">
        <div className="climb-head">
          <span className="climb-q">{t.question}</span>
          <span className="climb-week">{t.week} {current.week}</span>
        </div>
        <ol className="climb-list" style={{ height: ROW * order.length }}>
          {order.map((row, i) => (
            <li
              key={row.id}
              className={row.you ? "you" : ""}
              style={{ transform: `translateY(${i * ROW}px)` }}
            >
              <span className="climb-rank">{i + 1}</span>
              <span className="climb-name">{row.name}</span>
              {row.you && <span className="climb-up" aria-hidden>↑</span>}
            </li>
          ))}
        </ol>
        <div className="climb-progress"><span style={{ width: `${(current.week / 8) * 100}%` }} /></div>
      </div>
      <div className="climb-side">
        <dl className="climb-stats">
          <div><dt>{t.rank}</dt><dd>#<CountUp value={current.pos + 1} /></dd></div>
          <div><dt>{t.score}</dt><dd><CountUp value={current.score} /><small>/100</small></dd></div>
          <div><dt>{t.share}</dt><dd>{lang === "tr" ? <>%<CountUp value={current.share} /></> : <CountUp value={current.share} suffix="%" />}</dd></div>
        </dl>
        <p className="climb-caption">{t.caption}</p>
      </div>
    </div>
  );
}
