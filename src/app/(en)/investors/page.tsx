import type { Metadata } from "next";
import { Investors } from "@/components/Investors";

export const metadata: Metadata = {
  title: "Investors — Quovra",
  description: "Quovra is building the visibility layer for the AI era: measure, fix and prove how brands appear in AI answers.",
  alternates: { canonical: "/investors", languages: { en: "/investors", tr: "/tr/yatirimci" } },
};

export default function Page() {
  return <Investors lang="en" />;
}
