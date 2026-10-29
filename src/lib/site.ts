import type { Metadata } from "next";
import type { Lang } from "./i18n";
import { UI } from "./i18n/ui";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://citeable.app";
export const REPO_URL = "https://github.com/Emir-trrefic/uyarzal";

export function buildMetadata(lang: Lang): Metadata {
  const t = UI[lang].meta;
  return {
    metadataBase: new URL(SITE_URL),
    title: t.title,
    description: t.description,
    alternates: {
      canonical: lang === "tr" ? "/tr" : "/",
      languages: { en: "/", tr: "/tr", "x-default": "/" },
    },
    openGraph: {
      title: t.ogTitle,
      description: t.ogDescription,
      type: "website",
      locale: lang === "tr" ? "tr_TR" : "en_US",
    },
    twitter: { card: "summary_large_image", title: t.ogTitle, description: t.ogDescription },
  };
}
