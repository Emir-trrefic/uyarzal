import { ImageResponse } from "next/og";
import type { Lang } from "./i18n";
import { LANDING } from "./i18n/landing";

export const OG_SIZE = { width: 1200, height: 630 };

/** Share image in the Softmain family: icy background, navy orb with a blue rim, blue dot wordmark. */
export function ogImage(lang: Lang) {
  const t = LANDING[lang].hero;
  const ink = "#04101c";
  const blue = "#3bbefc";
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "64px 72px", background: "#eef4fa", color: ink, position: "relative" }}>
        <div style={{ position: "absolute", width: 560, height: 560, right: -170, top: -260, borderRadius: 9999, background: "#03080f", boxShadow: `inset -14px 24px 50px ${blue}, 0 0 90px rgba(59,190,252,0.35)` }} />
        <div style={{ display: "flex", alignItems: "flex-start", fontSize: 58, fontWeight: 900, letterSpacing: -3 }}>
          quovra
          <div style={{ width: 14, height: 14, borderRadius: 9999, background: blue, marginLeft: 4, marginTop: 8 }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: 76, fontSize: 82, lineHeight: 1.02, letterSpacing: -4, fontWeight: 900 }}>
          <span>{t.titleA}</span>
          <span style={{ color: "#0b84e3" }}>{t.titleB}</span>
        </div>
        <div style={{ display: "flex", marginTop: "auto", fontSize: 20, letterSpacing: 6, color: "#687a8d", fontWeight: 700 }}>
          {"CHATGPT · GEMINI · CLAUDE · PERPLEXITY  —  BY SOFTMAIN"}
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
