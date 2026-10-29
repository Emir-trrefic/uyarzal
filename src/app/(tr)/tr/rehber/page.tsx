import type { Metadata } from "next";
import { Guide } from "@/components/Guide";

export const metadata: Metadata = {
  title: "GEO rehberi — Quovra",
  description: "Beş kısa derste GEO: yapay zekâ botları ve robots.txt, llms.txt, yapısal veri ve yapay zekânın alıntılayacağı içerik.",
  alternates: { canonical: "/tr/rehber", languages: { en: "/guide", tr: "/tr/rehber" } },
};

export default function Page() {
  return <Guide lang="tr" />;
}
