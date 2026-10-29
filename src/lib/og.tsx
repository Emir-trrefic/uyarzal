import { ImageResponse } from "next/og";
import type { Lang } from "./i18n";
import { LANDING } from "./i18n/landing";

export const OG_SIZE = { width: 1200, height: 630 };

/** Share image in the site's editorial style: paper, ink rules and a red accent. */
export function ogImage(lang: Lang) {
  const t = LANDING[lang].hero;
  const ink = "#141311";
  const red = "#d63a1f";
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "56px 72px", background: "#f3efe6", color: ink }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", paddingBottom: 18, borderBottom: `3px solid ${ink}` }}>
          <div style={{ display: "flex", fontSize: 54, fontWeight: 700, letterSpacing: -2 }}>
            <span>Quovra</span>
            <span style={{ color: red }}>”</span>
          </div>
          <div style={{ display: "flex", fontSize: 22, color: red, letterSpacing: 3 }}>{t.eyebrow.toUpperCase()}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: 64, fontSize: 82, lineHeight: 1.02, letterSpacing: -3, fontWeight: 600 }}>
          <span>{t.titleA}</span>
          <span style={{ color: red, fontStyle: "italic" }}>{t.titleB}</span>
        </div>
        <div style={{ display: "flex", marginTop: "auto", paddingTop: 18, borderTop: `1.5px solid ${ink}`, fontSize: 24, color: "#3b3934" }}>
          {"ChatGPT · Gemini · Claude · Perplexity · AI Overviews"}
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
