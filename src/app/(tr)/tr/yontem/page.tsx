import type { Metadata } from "next";
import { Methodology } from "@/components/Methodology";

export const metadata: Metadata = {
  title: "Yöntem — Quovra",
  description: "Quovra yapay zekâ görünürlüğünü nasıl puanlar: tüm kontroller ve ağırlıkları, 14 yapay zekâ botu için robots.txt değerlendirmesi, Wilson güven aralıklı tekrarlı ölçüm.",
  alternates: { canonical: "/tr/yontem", languages: { en: "/methodology", tr: "/tr/yontem" } },
};

export default function Page() {
  return <Methodology lang="tr" />;
}
