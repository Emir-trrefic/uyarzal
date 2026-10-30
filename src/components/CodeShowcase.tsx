"use client";

import { useEffect, useRef, useState } from "react";
import type { Lang } from "@/lib/i18n";
import { LANDING } from "@/lib/i18n/landing";

type Tab = "robots" | "llms" | "jsonld" | "api" | "cli";
type Kind = "diff" | "md" | "json" | "shell";

const FILES: Record<Tab, { file: string; kind: Kind; code: (c: string) => string }> = {
  robots: {
    file: "robots.txt", kind: "diff",
    code: (c) => `${c}
  User-agent: *
  Allow: /

- User-agent: OAI-SearchBot
- User-agent: PerplexityBot
- Disallow: /
+ User-agent: OAI-SearchBot
+ User-agent: Claude-SearchBot
+ User-agent: PerplexityBot
+ Allow: /

  Sitemap: https://example.com/sitemap.xml`,
  },
  llms: {
    file: "llms.txt", kind: "md",
    code: (c) => `${c}
# Smile Dental

> Implant and cosmetic dentistry clinic in Istanbul.

## Key pages
- [Implants](https://example.com/implants)
- [Prices](https://example.com/prices)
- [Our doctors](https://example.com/doctors)`,
  },
  jsonld: {
    file: "index.html", kind: "json",
    code: (c) => `${c}
{
  "@context": "https://schema.org",
  "@type": "Dentist",
  "name": "Smile Dental",
  "address": "Kadıköy, Istanbul",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": 4.8,
    "reviewCount": 212
  },
  "sameAs": ["https://instagram.com/smiledental"]
}`,
  },
  api: {
    file: "terminal", kind: "shell",
    code: (c) => `${c}
$ curl -X POST https://quovra.app/api/audit \\
    -d '{"url":"example.com","pages":10}'

{
  "score": 91,
  "grade": "A",
  "siteScore": 87,
  "checks": [ ...22 checks with detail and fix ],
  "generated": { "llmsTxt": "...", "jsonLd": "...", "robotsTxt": "..." }
}`,
  },
  cli: {
    file: "terminal", kind: "shell",
    code: (c) => `${c}
$ npm run audit -- example.com --min-score=80

  Quovra GEO audit  https://example.com/
  Score 91/100  Grade A

  PASS AI search & assistant crawlers can reach you (15/15)
  PASS Content visible without JavaScript (10/10)
  PASS Structured data (Schema.org JSON-LD) (10/10)
  WARN Freshness signals (2/4)
  PASS Product data for AI shopping agents (4/4)

# exit code 0: score ≥ 80, the deploy continues`,
  },
};

/** A deliberately small highlighter: enough colour to read well, no dependency. */
function highlight(line: string, kind: Kind): React.ReactNode {
  if (/^\s*(#|<!--)/.test(line) && kind !== "md") return <span className="tk-com">{line}</span>;
  if (kind === "diff") {
    if (line.startsWith("+")) return <span className="tk-add">{line}</span>;
    if (line.startsWith("-")) return <span className="tk-del">{line}</span>;
    return <span className="tk-dim">{line}</span>;
  }
  if (kind === "md") {
    if (line.startsWith("#")) return <span className="tk-key">{line}</span>;
    if (line.startsWith(">")) return <span className="tk-str">{line}</span>;
    const m = line.match(/^(- \[)([^\]]+)(\]\()([^)]+)(\))$/);
    if (m) return <>{m[1]}<span className="tk-key">{m[2]}</span>{m[3]}<span className="tk-url">{m[4]}</span>{m[5]}</>;
    return line;
  }
  if (kind === "shell") {
    if (line.startsWith("$")) return <><span className="tk-prompt">$</span>{tokens(line.slice(1))}</>;
    if (/^\s+PASS/.test(line)) return <><span className="tk-add-fg">{line.slice(0, 6)}</span>{tokens(line.slice(6))}</>;
    if (/^\s+WARN/.test(line)) return <><span className="tk-warn">{line.slice(0, 6)}</span>{tokens(line.slice(6))}</>;
  }
  return tokens(line);
}

function tokens(line: string): React.ReactNode {
  const parts = line.split(/("(?:[^"\\]|\\.)*"(?=\s*:)|"(?:[^"\\]|\\.)*"|\b\d+(?:\.\d+)?\b|--?[a-z-]+)/g);
  return parts.map((p, i) => {
    if (!p) return null;
    if (/^".*"$/.test(p)) return <span key={i} className={line.slice(line.indexOf(p) + p.length).trimStart().startsWith(":") ? "tk-key" : "tk-str"}>{p}</span>;
    if (/^\d/.test(p)) return <span key={i} className="tk-num">{p}</span>;
    if (/^--?[a-z]/.test(p)) return <span key={i} className="tk-flag">{p}</span>;
    return p;
  });
}

export function CodeShowcase({ lang }: { lang: Lang }) {
  const t = LANDING[lang].code;
  const [tab, setTab] = useState<Tab>("robots");
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Lines "type in" the first time the editor scrolls into view, and again on every tab change.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const f = FILES[tab];
  const lines = f.code(t.comments[tab]).split("\n");

  return (
    <div className="editor" ref={ref}>
      <div className="editor-bar">
        <span className="dots" aria-hidden><i /><i /><i /></span>
        <div className="editor-tabs" role="tablist">
          {(Object.keys(FILES) as Tab[]).map((id) => (
            <button key={id} role="tab" aria-selected={tab === id} onClick={() => setTab(id)}>{t.tabs[id]}</button>
          ))}
        </div>
        <span className="editor-file">{f.file}</span>
      </div>
      <pre className={`editor-body${visible ? " typing" : ""}`} key={tab} aria-label={t.tabs[tab]}>
        {lines.map((line, i) => (
          <span className="ln" key={i} style={{ animationDelay: `${i * 55}ms` }}>
            <span className="ln-no" aria-hidden>{i + 1}</span>
            <code>{highlight(line, f.kind) || " "}</code>
          </span>
        ))}
      </pre>
    </div>
  );
}
