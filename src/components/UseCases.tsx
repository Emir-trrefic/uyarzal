"use client";

import { useState } from "react";
import type { Lang } from "@/lib/i18n";
import { LANDING } from "@/lib/i18n/landing";

/** An index-style list on the left, the selected case on the right. */
export function UseCases({ lang }: { lang: Lang }) {
  const t = LANDING[lang].useCases;
  const [active, setActive] = useState(t.items[0].id);
  const item = t.items.find((i) => i.id === active)!;
  return (
    <div className="usecases">
      <ol className="uc-index" role="tablist" aria-orientation="vertical">
        {t.items.map((i, n) => (
          <li key={i.id}>
            <button role="tab" aria-selected={i.id === active} aria-controls="uc-panel" onClick={() => setActive(i.id)}>
              <span className="uc-n">{String(n + 1).padStart(2, "0")}</span>
              {i.label}
            </button>
          </li>
        ))}
      </ol>
      <div className="uc-panel" id="uc-panel" role="tabpanel">
        <h3>{item.title}</h3>
        <p>{item.body}</p>
        <p className="uc-q"><span>Q</span>{item.q}</p>
      </div>
    </div>
  );
}
