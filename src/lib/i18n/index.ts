export type Lang = "en" | "tr";
export const LANGS: Lang[] = ["en", "tr"];

export function isLang(v: unknown): v is Lang {
  return v === "en" || v === "tr";
}

/** Picks a supported language from an Accept-Language header. */
export function pickLang(acceptLanguage: string | null | undefined): Lang {
  return /^\s*tr\b/i.test(acceptLanguage ?? "") ? "tr" : "en";
}
