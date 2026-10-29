import type { Lang } from "@/lib/i18n";
import { LeadForm } from "./LeadForm";
import { SiteFooter } from "./SiteFooter";
import { SiteNav } from "./SiteNav";

interface Metric { value: string; label: string; source: string }
interface Layer { name: string; body: string; live: boolean }

const COPY: Record<Lang, {
  kicker: string; title: string; lead: string;
  metrics: Metric[];
  problemTitle: string; problem: string; solution: string;
  layersTitle: string; layers: Layer[]; live: string; next: string;
  moatTitle: string; moat: [string, string][];
  modelTitle: string; model: [string, string][];
  askKicker: string; askTitle: string; askLead: string;
  funds: [string, number][];
  milestonesTitle: string; milestones: [string, string][];
  contactTitle: string; contactBody: string;
  disclaimer: string;
}> = {
  tr: {
    kicker: "Yatırımcılar",
    title: "Yapay zekâ çağının görünürlük katmanı.",
    lead: "Arama, yapay zekâ cevaplarına dönüşüyor. Markalar orada görünüp görünmediğini ölçemiyor. Quovra bunu ölçen, düzelten ve kanıtlayan platform.",
    metrics: [
      { value: "%35–48", label: "GEO pazarı için tahmin edilen yıllık büyüme", source: "MarketsandMarkets, Intel Market Research" },
      { value: "634 bin", label: "Türkiye'de e-ticaret yapan işletme (2025)", source: "T.C. Ticaret Bakanlığı" },
      { value: "471 M$", label: "Semrush ARR; Adobe satın alma kararı açıkladı", source: "Semrush FY2025, Kasım 2025" },
      { value: "1,8 Mr$", label: "Kategori lideri Profound'un değerlemesi", source: "Dealroom, Eylül 2026" },
    ],
    problemTitle: "Sorun ve çözüm",
    problem: "Müşteriler artık ChatGPT, Gemini ve Perplexity'ye soruyor; cevapta 2–3 marka geçiyor. İşletmeler bu cevaplarda neden yer almadığını bilmiyor; mevcut araçlar ise tek ölçüme dayanan, gürültülü ve pahalı izleme sunuyor.",
    solution: "Quovra sitenin yapay zekâya hazır olup olmadığını denetler, düzeltmeleri hazır kod olarak verir ve görünürlüğü tekrarlı ölçüm ve güven aralığıyla kanıtlar. Ücretsiz denetim, ürünün kendisini pazarlayan giriş kapısıdır.",
    layersTitle: "Ürün: tek araçtan platforma",
    live: "Canlı",
    next: "Yol haritası",
    layers: [
      { name: "Denetim", body: "22 kontrol, 14 AI botu, ajan hazırlığı. Ücretsiz, ürün içi büyüme kanalı.", live: true },
      { name: "Düzeltme", body: "llms.txt, JSON-LD, robots.txt üretimi. Sorunu söylemekle kalmaz, çözümü verir.", live: true },
      { name: "Kanıt", body: "Tekrarlı ölçüm ve %95 güven aralığı. Sektörün ana eleştirisine cevap.", live: true },
      { name: "Otomatik uygulama", body: "ikas, Ticimax, Shopify, WordPress entegrasyonlarıyla tek tıkla düzeltme.", live: false },
      { name: "Gelire atıf", body: "Yapay zekâdan gelen ziyaretleri ve satışları ölçerek yatırım getirisini gösterme.", live: false },
      { name: "Quovra Endeksi", body: "Binlerce denetimden sektör kıyaslaması: PR motoru ve satılabilir veri ürünü.", live: false },
    ],
    moatTitle: "Neden kalıcı bir avantaj",
    moat: [
      ["Veri ağı etkisi", "Her denetim ve ölçüm kıyaslama verisini büyütür; endeks ve öneriler zamanla rakiplerin kopyalayamayacağı kadar isabetli olur."],
      ["Yerel kama", "Türkçe ve bölgesel dillerde ürün, TL fiyat ve yerel e-ticaret platformu entegrasyonları; küresel oyuncuların öncelik vermediği pazar."],
      ["Düşük edinme maliyeti", "Ücretsiz denetim, paylaşılabilir rapor ve rozet ile ürün kendi kendini dağıtır; ajanslar ise çarpan kanal."],
      ["Güven", "Açık kaynak puanlama ve yayımlanmış yöntem; kara kutu araçlara karşı şeffaflık."],
    ],
    modelTitle: "İş modeli",
    model: [
      ["Abonelik (SaaS)", "Başlangıç ₺790 · Büyüme ₺1.990 · Ajans ₺5.990 / ay"],
      ["Kurulum hizmeti", "Tek seferlik ₺4.900'den başlayan anahtar teslim düzeltme"],
      ["Veri ve API", "Sektör endeksleri ve kıyaslama verisi (yol haritası)"],
      ["Hedef birim ekonomisi", "Brüt marj %75+, edinme maliyetinin 6 ayda geri dönmesi"],
    ],
    askKicker: "Yatırım",
    askTitle: "500.000 $ pre-seed, 18 ay.",
    askLead: "Ürünü ödeme alan platforma dönüştürmek, Türkiye'de ilk 300 ücretli müşteriye ulaşmak ve bir bölgesel pazara açılmak için.",
    funds: [["Ürün ve mühendislik", 45], ["Büyüme ve satış", 30], ["Yapay zekâ altyapısı ve veri", 15], ["Operasyon ve hukuk", 10]],
    milestonesTitle: "Kilometre taşları",
    milestones: [
      ["0–3 ay", "Hesaplar, ödeme (iyzico + Paddle), haftalık takip, ChatGPT ve Gemini motorları"],
      ["3–6 ay", "ikas, Ticimax ve WordPress entegrasyonları; ilk sektör endeksi; 100 ücretli müşteri"],
      ["6–12 ay", "Gelire atıf, ajans paneli, API; 300 ücretli müşteri"],
      ["12–18 ay", "Bölgesel açılış (Körfez veya Orta-Doğu Avrupa); seed turuna hazır metrikler"],
    ],
    contactTitle: "Yatırımcı sunumunu isteyin",
    contactBody: "Detaylı sunum, finansal model ve ürün demosu için e-posta adresinizi bırakın.",
    disclaimer: "Pazar rakamları üçüncü taraf tahminleridir. Hedefler ve projeksiyonlar ileriye dönüktür, garanti değildir.",
  },
  en: {
    kicker: "Investors",
    title: "The visibility layer for the AI era.",
    lead: "Search is turning into AI answers, and brands cannot measure whether they appear there. Quovra is the platform that measures, fixes and proves it.",
    metrics: [
      { value: "35–48%", label: "Estimated annual growth of the GEO market", source: "MarketsandMarkets, Intel Market Research" },
      { value: "634K", label: "Businesses selling online in Türkiye (2025)", source: "Turkish Ministry of Trade" },
      { value: "$471M", label: "Semrush ARR, which Adobe agreed to acquire", source: "Semrush FY2025, Nov 2025" },
      { value: "$1.8B", label: "Valuation of category leader Profound", source: "Dealroom, Sep 2026" },
    ],
    problemTitle: "Problem and solution",
    problem: "Customers now ask ChatGPT, Gemini and Perplexity, and answers name two or three brands. Businesses do not know why they are missing; existing tools offer noisy, single-run and expensive monitoring.",
    solution: "Quovra audits whether a site is ready for AI, hands over fixes as ready code, and proves visibility with repeated runs and confidence intervals. The free audit is the product-led front door.",
    layersTitle: "Product: from tool to platform",
    live: "Live",
    next: "Roadmap",
    layers: [
      { name: "Audit", body: "22 checks, 14 AI crawlers, agent readiness. Free and product-led.", live: true },
      { name: "Fix", body: "Generates llms.txt, JSON-LD and robots.txt. It ships the fix, not only the finding.", live: true },
      { name: "Prove", body: "Repeated runs with 95% confidence intervals, answering the category's main criticism.", live: true },
      { name: "Auto-apply", body: "One-click fixes through ikas, Ticimax, Shopify and WordPress integrations.", live: false },
      { name: "Revenue attribution", body: "Measures visits and sales coming from AI assistants to prove ROI.", live: false },
      { name: "Quovra Index", body: "Sector benchmarks from thousands of audits: a PR engine and a sellable data product.", live: false },
    ],
    moatTitle: "Why it compounds",
    moat: [
      ["Data network effect", "Every audit and measurement grows the benchmark; the index and recommendations get sharper than competitors can copy."],
      ["Local wedge", "Turkish and regional languages, local pricing and local e-commerce platform integrations: a market global players deprioritise."],
      ["Low acquisition cost", "Free audits, shareable reports and badges distribute the product; agencies multiply reach."],
      ["Trust", "Open-source scoring and a published method, against black-box competitors."],
    ],
    modelTitle: "Business model",
    model: [
      ["Subscription (SaaS)", "Starter $24 · Growth $59 · Agency $179 per month"],
      ["Done-for-you setup", "One-time implementation from $149"],
      ["Data and API", "Sector indexes and benchmark data (roadmap)"],
      ["Target unit economics", "75%+ gross margin, CAC payback under 6 months"],
    ],
    askKicker: "The round",
    askTitle: "$500K pre-seed for 18 months.",
    askLead: "To turn the product into a paid platform, reach the first 300 paying customers in Türkiye, and open one regional market.",
    funds: [["Product and engineering", 45], ["Growth and sales", 30], ["AI infrastructure and data", 15], ["Operations and legal", 10]],
    milestonesTitle: "Milestones",
    milestones: [
      ["Months 0–3", "Accounts, billing, weekly tracking, ChatGPT and Gemini engines"],
      ["Months 3–6", "ikas, Ticimax and WordPress integrations; first sector index; 100 paying customers"],
      ["Months 6–12", "Revenue attribution, agency workspace, API; 300 paying customers"],
      ["Months 12–18", "Regional launch (Gulf or CEE); seed-ready metrics"],
    ],
    contactTitle: "Request the investor deck",
    contactBody: "Leave your email for the full deck, financial model and a product demo.",
    disclaimer: "Market figures are third-party estimates. Targets and projections are forward-looking, not guarantees.",
  },
};

export function Investors({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  return (
    <>
      <SiteNav lang={lang} home={false} />
      <main className="inv">
        <section className="inv-hero">
          <div className="container">
            <p className="kicker">{t.kicker}</p>
            <h1>{t.title}</h1>
            <p className="inv-lead">{t.lead}</p>
          </div>
        </section>

        <section className="section inv-metrics-wrap">
          <div className="container">
            <ul className="inv-metrics">
              {t.metrics.map((m) => (
                <li key={m.value}>
                  <strong>{m.value}</strong>
                  <span>{m.label}</span>
                  <em>{m.source}</em>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section">
          <div className="container narrow inv-ps">
            <h2 className="section-title">{t.problemTitle}</h2>
            <p>{t.problem}</p>
            <p>{t.solution}</p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <header className="sec-head"><h2 className="section-title">{t.layersTitle}</h2></header>
            <ol className="inv-layers">
              {t.layers.map((l, i) => (
                <li key={l.name} className={l.live ? "live" : ""}>
                  <span className="inv-step">{String(i + 1).padStart(2, "0")} · {l.live ? t.live : t.next}</span>
                  <h3>{l.name}</h3>
                  <p>{l.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <header className="sec-head"><h2 className="section-title">{t.moatTitle}</h2></header>
            <div className="inv-grid">
              {t.moat.map(([h, b]) => (
                <div className="inv-tile" key={h}><h3>{h}</h3><p>{b}</p></div>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container narrow">
            <header className="sec-head"><h2 className="section-title">{t.modelTitle}</h2></header>
            <dl className="inv-model">
              {t.model.map(([k, v]) => (
                <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
              ))}
            </dl>
          </div>
        </section>

        <section className="section inv-ask">
          <div className="container">
            <header className="sec-head">
              <p className="sec-rule">{t.askKicker}</p>
              <h2 className="section-title">{t.askTitle}</h2>
              <p className="section-lead">{t.askLead}</p>
            </header>
            <div className="inv-funds">
              {t.funds.map(([k, v]) => (
                <div key={k} className="inv-fund">
                  <div className="inv-fund-top"><span>{k}</span><strong>{lang === "tr" ? `%${v}` : `${v}%`}</strong></div>
                  <div className="inv-bar"><span style={{ width: `${v * 2}%` }} /></div>
                </div>
              ))}
            </div>
            <h3 className="inv-sub">{t.milestonesTitle}</h3>
            <ol className="inv-timeline">
              {t.milestones.map(([when, what]) => (
                <li key={when}><span>{when}</span><p>{what}</p></li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section">
          <div className="container narrow inv-contact">
            <h2 className="section-title">{t.contactTitle}</h2>
            <p className="section-lead">{t.contactBody}</p>
            <LeadForm lang={lang} plan="investor" />
            <p className="note">{t.disclaimer}</p>
          </div>
        </section>
      </main>
      <SiteFooter lang={lang} />
    </>
  );
}
