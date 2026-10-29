"use client";

import { useState } from "react";

export function CopyBlock({ title, hint, code, labels, children }: {
  title: string;
  hint: string;
  code: string;
  labels: { copy: string; copied: string };
  children?: React.ReactNode;
}) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="card">
      <div className="file-head">
        <div>
          <h3>{title}</h3>
          <p>{hint}</p>
        </div>
        <button
          className="btn ghost small no-print"
          onClick={async () => {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
        >
          {copied ? labels.copied : labels.copy}
        </button>
      </div>
      {children}
      <pre className="code">{code}</pre>
    </div>
  );
}
