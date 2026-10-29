import { ImageResponse } from "next/og";
import type { Lang } from "./i18n";
import { LANDING } from "./i18n/landing";

export const OG_SIZE = { width: 1200, height: 630 };

/** Share image in the brand palette: deep teal, lime highlighter, cool paper. */
export function ogImage(lang: Lang) {
  const t = LANDING[lang].hero;
  const ink = "#0d1b18";
  const teal = "#0b6b5d";
  const lime = "#d4f25a";
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "60px 72px", background: "#f5f7f6", color: ink }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 60, height: 52, borderRadius: 14, background: teal, color: lime, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 54, fontWeight: 700, lineHeight: 1, paddingTop: 22 }}>”</div>
          <div style={{ display: "flex", fontSize: 50, fontWeight: 700, letterSpacing: -2 }}>quovra</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: 70, fontSize: 80, lineHeight: 1.04, letterSpacing: -3.5, fontWeight: 700 }}>
          <span>{t.titleA}</span>
          <span style={{ display: "flex" }}><span style={{ background: lime, padding: "0 10px" }}>{t.titleB}</span></span>
        </div>
        <div style={{ display: "flex", marginTop: "auto", fontSize: 26, color: teal, fontWeight: 600 }}>
          {"ChatGPT · Gemini · Claude · Perplexity · AI Overviews"}
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
