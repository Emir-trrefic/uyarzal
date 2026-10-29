import type { Metadata } from "next";
import { Methodology } from "@/components/Methodology";

export const metadata: Metadata = {
  title: "Methodology — Quovra",
  description: "How Quovra scores AI visibility: every check and weight, robots.txt evaluation for 14 AI agents, and repeated AI measurements with Wilson confidence intervals.",
  alternates: { canonical: "/methodology", languages: { en: "/methodology", tr: "/tr/yontem" } },
};

export default function Page() {
  return <Methodology lang="en" />;
}
