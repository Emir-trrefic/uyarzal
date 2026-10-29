"use client";

import { useState } from "react";

export function CopyBlock({ title, hint, code }: { title: string; hint: string; code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="card">
      <div className="file-head">
        <div>
          <h3>{title}</h3>
          <p>{hint}</p>
        </div>
        <button
          className="btn ghost small"
          onClick={async () => {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="code">{code}</pre>
    </div>
  );
}
