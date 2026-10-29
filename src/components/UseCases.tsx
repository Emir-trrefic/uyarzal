"use client";

import { useState } from "react";
import type { Lang } from "@/lib/i18n";
import { LANDING } from "@/lib/i18n/landing";

export function UseCases({ lang }: { lang: Lang }) {
  const t = LANDING[lang].useCases;
  const [active, setActive] = useState(t.items[0].id);
  const item = t.items.find((i) => i.id === active)!;
  return (
    <div className="usecases">
      <div className="tabs" role="tablist">
        {t.items.map((i) => (
          <button key={i.id} role="tab" className="tab" aria-selected={i.id === active} aria-controls={`uc-${i.id}`} onClick={() => setActive(i.id)}>
            {i.label}
          </button>
        ))}
      </div>
      <div className="card usecase" id={`uc-${item.id}`} role="tabpanel">
        <div>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
        </div>
        <div className="usecase-q">
          <span className="chat-bubble">{item.q}</span>
        </div>
      </div>
    </div>
  );
}
