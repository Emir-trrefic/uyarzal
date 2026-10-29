import { ImageResponse } from "next/og";
import type { Lang } from "./i18n";
import { UI } from "./i18n/ui";

export const OG_SIZE = { width: 1200, height: 630 };

export function ogImage(lang: Lang) {
  const t = UI[lang].hero;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#0e0d12", color: "#f1f0f5" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 36, fontWeight: 700 }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: "#8f84ff", color: "#0e0d12", display: "flex", alignItems: "center", justifyContent: "center" }}>Q</div>
          Quovra
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 68, lineHeight: 1.08, fontWeight: 700, letterSpacing: -2 }}>
          <span>{t.titleA}</span>
          <span style={{ color: "#8f84ff" }}>{t.titleB}</span>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#a3a0ae" }}>{`${t.eyebrow} · ChatGPT · Claude · Perplexity · AI Overviews`}</div>
      </div>
    ),
    OG_SIZE,
  );
}
