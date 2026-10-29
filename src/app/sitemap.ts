import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { en: `${SITE_URL}/`, tr: `${SITE_URL}/tr` };
  return [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1, alternates: { languages } },
    { url: `${SITE_URL}/tr`, changeFrequency: "weekly", priority: 0.9, alternates: { languages } },
    {
      url: `${SITE_URL}/methodology`, changeFrequency: "monthly", priority: 0.6,
      alternates: { languages: { en: `${SITE_URL}/methodology`, tr: `${SITE_URL}/tr/yontem` } },
    },
    {
      url: `${SITE_URL}/tr/yontem`, changeFrequency: "monthly", priority: 0.6,
      alternates: { languages: { en: `${SITE_URL}/methodology`, tr: `${SITE_URL}/tr/yontem` } },
    },
    {
      url: `${SITE_URL}/guide`, changeFrequency: "monthly", priority: 0.7,
      alternates: { languages: { en: `${SITE_URL}/guide`, tr: `${SITE_URL}/tr/rehber` } },
    },
    {
      url: `${SITE_URL}/tr/rehber`, changeFrequency: "monthly", priority: 0.7,
      alternates: { languages: { en: `${SITE_URL}/guide`, tr: `${SITE_URL}/tr/rehber` } },
    },
  ];
}
