import type { Metadata } from "next";
import { Guide } from "@/components/Guide";

export const metadata: Metadata = {
  title: "GEO guide — Quovra",
  description: "GEO in five short lessons: AI crawlers and robots.txt, llms.txt, structured data and content AI assistants can quote.",
  alternates: { canonical: "/guide", languages: { en: "/guide", tr: "/tr/rehber" } },
};

export default function Page() {
  return <Guide lang="en" />;
}
