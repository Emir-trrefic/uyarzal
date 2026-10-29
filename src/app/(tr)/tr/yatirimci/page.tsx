import type { Metadata } from "next";
import { Investors } from "@/components/Investors";

export const metadata: Metadata = {
  title: "Yatırımcılar — Quovra",
  description: "Quovra, yapay zekâ çağının görünürlük katmanını kuruyor: markaların yapay zekâ cevaplarında nasıl göründüğünü ölçüyor, düzeltiyor ve kanıtlıyor.",
  alternates: { canonical: "/tr/yatirimci", languages: { en: "/investors", tr: "/tr/yatirimci" } },
};

export default function Page() {
  return <Investors lang="tr" />;
}
