import type { Lang } from "./index";

export type Cell = boolean | string;

export interface Plan {
  id: "free" | "starter" | "growth" | "agency";
  name: string;
  tagline: string;
  monthly: number;
  /** Per-month price when billed yearly. */
  yearly: number;
  featured?: boolean;
  cta: string;
  highlights: string[];
}

const en = {
  meta: {
    title: "Quovra — Get recommended by ChatGPT, Gemini, Claude & Perplexity",
    description: "Measure, fix and prove your visibility in AI answers. Free GEO audit with ready-to-paste fixes, repeated AI measurements with confidence intervals, and agent-readiness checks.",
    ogTitle: "Quovra — AI search visibility, measured properly",
    ogDescription: "Is ChatGPT recommending you, or your competitor? Find out in 10 seconds.",
  },
  nav: { product: "Product", why: "Why Quovra", pricing: "Pricing", method: "Methodology", methodHref: "/methodology", cta: "Free audit", switchLabel: "TR", switchHref: "/tr" },
  hero: {
    eyebrow: "Generative Engine Optimization",
    titleA: "Is ChatGPT recommending you, or ",
    titleB: "your competitor?",
    lead: "Quovra shows how AI assistants see your business, fixes what keeps them from recommending you, and proves the result with statistically sound measurements.",
    trust: ["No sign-up", "Nothing stored", "Open-source engine"],
  },
  engines: { label: "Built for the engines your customers ask", list: ["ChatGPT", "Google AI Overviews", "Gemini", "Claude", "Perplexity", "Copilot"] },
  preview: {
    badge: "Sample report",
    site: "smile-dental.example",
    question: "“Best implant clinic in Istanbul?”",
    answerLabel: "AI answer (5 runs)",
    rows: [["Competitor A", "5/5"], ["Competitor B", "4/5"], ["Smile Dental", "1/5"]],
    sov: "Share of voice 20%",
    ci: "95% CI 4–62%",
    checks: [["fail", "ChatGPT search bot blocked in robots.txt"], ["warn", "No FAQ answering buyer questions"], ["pass", "Content visible without JavaScript"]],
  },
  problem: {
    kicker: "The shift",
    title: "Your next customer asks an AI, not a search box",
    lead: "AI assistants answer with two or three names. If yours is not one of them, you never see the lost customer.",
    stats: [
      { value: "45%", body: "of consumers now use AI tools like ChatGPT for local recommendations, up from 6% a year earlier.", source: "BrightLocal 2026, via Local Falcon" },
      { value: "1.2%", body: "of local business locations get recommended by ChatGPT, even ones that rank well on Google.", source: "SOCi Local Visibility Index 2026" },
      { value: "10–34%", body: "variance between identical AI questions from sampling alone. One-off checks are mostly noise.", source: "Growth Memo, 2026" },
    ],
  },
  steps: {
    kicker: "How it works",
    title: "Measure. Fix. Prove.",
    items: [
      { n: "01", title: "Measure", body: "22 weighted checks read your site the way AI crawlers do: bot access for 14 agents, JavaScript-free content, structured data, trust signals and agent readiness." },
      { n: "02", title: "Fix", body: "Every issue comes with a concrete fix, plus generated llms.txt, Organization JSON-LD and robots.txt rules you can paste today." },
      { n: "03", title: "Prove", body: "Ask AI engines your buyers’ real questions, several times each, and track share of voice with a 95% confidence interval instead of one lucky screenshot." },
    ],
  },
  compare: {
    kicker: "Why Quovra",
    title: "Most tools only watch. Quovra measures properly and fixes.",
    cols: ["Quovra", "Typical AI-visibility trackers", "Asking ChatGPT yourself"],
    rows: [
      ["Technical audit of how AI crawlers see your site", true, "Partial", false],
      ["Ready-to-paste fixes (llms.txt, JSON-LD, robots.txt)", true, "Rarely", "Generic advice"],
      ["Repeated runs with confidence intervals", true, "Usually single runs", false],
      ["Agent-readiness and product data checks", true, "Rarely", false],
      ["Transparent, open-source scoring", true, false, "—"],
      ["Starting price", "$0 · paid from $24/mo", "$29–$500+/mo", "Free, but hours of manual work"],
    ] as [string, Cell, Cell, Cell][],
    note: "Based on public pricing pages and 2026 industry reviews of AI-visibility tools.",
  },
  useCases: {
    kicker: "Who it is for",
    title: "Built for the businesses AI answers decide on",
    items: [
      { id: "ecom", label: "E-commerce", title: "Get your products into AI shopping answers", body: "ChatGPT, Google AI Mode and shopping agents compare products from structured data. Quovra checks every product page for price, availability, brand and ratings, and shows which products are invisible.", q: "“Best running shoes under $100?”" },
      { id: "local", label: "Clinics, restaurants & hotels", title: "Be the name AI suggests nearby", body: "Local recommendations are shifting to AI. Quovra tests the exact questions patients and guests ask and tells you what to fix on your site to be included.", q: "“Which dental clinic in Kadıköy is good for implants?”" },
      { id: "agency", label: "Agencies", title: "Add GEO to every client retainer", body: "Run audits in seconds, send branded reports, and prove month-over-month progress with numbers that hold up to client scrutiny.", q: "“Which agency is best for B2B SEO in Europe?”" },
      { id: "saas", label: "SaaS & B2B", title: "Win the shortlist before the demo", body: "Buyers ask AI for alternatives and comparisons. Track whether you make the shortlist and which competitors are named instead.", q: "“Alternatives to HubSpot for a 20-person team?”" },
    ],
  },
  future: {
    kicker: "Future-proof",
    title: "Ready for what AI search becomes next",
    items: [
      { tag: "Live", title: "Agentic commerce", body: "Shopping agents now discover products through protocols like OpenAI’s ACP and Google’s UCP. Quovra checks whether your product data is agent-ready." },
      { tag: "Live", title: "Markdown for agents", body: "Agents read Markdown far more cheaply than HTML. We check for llms.txt, llms-full.txt and Markdown alternates." },
      { tag: "Coming soon", title: "AI bot analytics", body: "Google Analytics cannot see AI crawlers. See which AI agents read which pages, straight from your server logs." },
      { tag: "Coming soon", title: "Organic vs. sponsored", body: "ChatGPT started showing ads in 2026. Track your organic recommendations separately from paid placements." },
    ],
  },
  pricing: {
    kicker: "Pricing",
    title: "Start free. Upgrade when you want proof over time.",
    lead: "Paid plans are in early access. Join now and keep the launch price for life.",
    monthly: "Monthly",
    yearly: "Yearly",
    save: "2 months free",
    perMonth: "/mo",
    billedYearly: "billed yearly",
    currency: "$",
    plans: [
      { id: "free", name: "Free", tagline: "Audit any site, any time", monthly: 0, yearly: 0, cta: "Run a free audit",
        highlights: ["Unlimited single-page audits", "10-page site scans", "Ready-to-paste fixes", "Markdown & PDF reports, badge"] },
      { id: "starter", name: "Starter", tagline: "For one business", monthly: 24, yearly: 20, cta: "Join early access",
        highlights: ["1 site · 50 pages monitored", "30 buyer questions", "ChatGPT + Gemini", "Weekly tracking with confidence intervals"] },
      { id: "growth", name: "Growth", tagline: "For growing brands", monthly: 59, yearly: 49, featured: true, cta: "Join early access",
        highlights: ["3 sites · 300 pages", "100 buyer questions", "4 AI engines", "Competitor tracking & AI bot analytics"] },
      { id: "agency", name: "Agency", tagline: "For agencies & teams", monthly: 179, yearly: 149, cta: "Join early access",
        highlights: ["20 client sites · 2,000 pages", "500 buyer questions", "White-label reports & client portal", "API access · 10 seats"] },
    ] as Plan[],
    popular: "Most popular",
    tableTitle: "Compare plans",
    soon: "soon",
    table: [
      ["Site audits & 10-page scans", "Unlimited", "Unlimited", "Unlimited", "Unlimited"],
      ["Sites monitored", "—", "1", "3", "20"],
      ["Pages monitored weekly", "—", "50", "300", "2,000"],
      ["Buyer questions tracked", "3 (one-off demo)", "30", "100", "500"],
      ["AI engines", "1", "2", "4", "All (6)"],
      ["Repeated runs + 95% confidence interval", false, true, true, true],
      ["Competitors tracked", "—", "3", "10", "25 per site"],
      ["Score-drop & competitor alerts", false, true, true, true],
      ["Agent-readiness report", true, true, true, true],
      ["AI bot traffic analytics", false, false, "soon", "soon"],
      ["Integrations (WordPress, Shopify, ikas, Ticimax)", false, false, "soon", "soon"],
      ["White-label reports & client portal", false, false, false, "soon"],
      ["API access", false, false, false, true],
      ["Seats", "1", "1", "3", "10"],
      ["Support", "Community", "Email", "Priority email", "Priority + monthly strategy call"],
    ] as [string, Cell, Cell, Cell, Cell][],
    service: { title: "Rather have us fix it?", body: "Our done-for-you setup implements every fix from your audit: llms.txt, structured data, robots.txt and FAQ content.", price: "from $149 one-time", cta: "Request setup" },
  },
  faq: {
    title: "Questions",
    items: [
      { q: "What is GEO (Generative Engine Optimization)?", a: "GEO is making your business easy for AI systems such as ChatGPT, Gemini, Claude, Perplexity and Google AI Overviews to find, understand and recommend. SEO wins clicks on a results page; GEO wins the mention inside the AI’s answer." },
      { q: "Why can’t I just ask ChatGPT myself?", a: "You can, once. But answers change between runs, so one answer tells you little. Quovra asks each question several times across engines, reports a confidence interval, tracks the trend weekly, and runs a technical audit an assistant cannot do reliably: robots.txt rules for 14 agents, JavaScript-free rendering and structured data." },
      { q: "How is Quovra different from other AI-visibility tools?", a: "Three things: we fix, not just monitor (generated code, and integrations on the way); we measure with repeated runs and confidence intervals; and our scoring is open source, so you can see exactly why you got your score." },
      { q: "Do you query the real ChatGPT app?", a: "We query the engines through their official APIs. API answers can differ from the consumer apps, which is why we show the method and confidence for every number instead of presenting a single answer as the truth." },
      { q: "Does blocking GPTBot hurt me?", a: "GPTBot collects training data, and blocking it is a valid licensing choice. Blocking search and user-fetch agents such as OAI-SearchBot or ChatGPT-User removes you from live answers. Quovra scores them separately." },
      { q: "Is my data stored?", a: "Free audits are processed in memory and not saved. Paid plans store your sites, questions and results so we can show trends; you can delete them at any time." },
    ],
  },
  cta: { title: "See what AI says about you, in 10 seconds", body: "Free audit, no sign-up. Fixes included.", button: "Run a free audit" },
  footer: {
    tagline: "AI search visibility, measured properly.",
    cols: [
      { title: "Product", links: [["Free audit", "#top"], ["Pricing", "#pricing"], ["Methodology", "/methodology"]] },
      { title: "Resources", links: [["GitHub", "REPO"], ["llms.txt", "/llms.txt"], ["Türkçe", "/tr"]] },
    ],
    legal: "Open-source GEO toolkit · AGPL-3.0",
  },
};

export type LandingDict = typeof en;

const tr: LandingDict = {
  meta: {
    title: "Quovra — ChatGPT, Gemini, Claude ve Perplexity sizi önersin",
    description: "Yapay zekâ cevaplarındaki görünürlüğünüzü ölçün, düzeltin ve kanıtlayın. Hazır düzeltmeli ücretsiz GEO denetimi, güven aralıklı tekrarlı ölçüm ve ajan hazırlığı kontrolleri.",
    ogTitle: "Quovra — Yapay zekâ arama görünürlüğü, doğru ölçülmüş",
    ogDescription: "ChatGPT sizi mi öneriyor, rakibinizi mi? 10 saniyede öğrenin.",
  },
  nav: { product: "Ürün", why: "Neden Quovra", pricing: "Fiyatlar", method: "Yöntem", methodHref: "/tr/yontem", cta: "Ücretsiz denetle", switchLabel: "EN", switchHref: "/" },
  hero: {
    eyebrow: "Üretken Motor Optimizasyonu (GEO)",
    titleA: "ChatGPT sizi mi öneriyor, yoksa ",
    titleB: "rakibinizi mi?",
    lead: "Quovra, yapay zekâ asistanlarının işletmenizi nasıl gördüğünü gösterir, sizi önermelerini engelleyen sorunları düzeltir ve sonucu istatistiksel olarak sağlam ölçümlerle kanıtlar.",
    trust: ["Üyelik yok", "Veri saklanmaz", "Açık kaynak motor"],
  },
  engines: { label: "Müşterilerinizin soru sorduğu motorlar için", list: ["ChatGPT", "Google AI Overviews", "Gemini", "Claude", "Perplexity", "Copilot"] },
  preview: {
    badge: "Örnek rapor",
    site: "gulus-dis.example",
    question: "“İstanbul'da en iyi implant kliniği hangisi?”",
    answerLabel: "Yapay zekâ cevabı (5 tekrar)",
    rows: [["Rakip A", "5/5"], ["Rakip B", "4/5"], ["Gülüş Diş", "1/5"]],
    sov: "Görünürlük payı %20",
    ci: "%95 güven aralığı %4–62",
    checks: [["fail", "ChatGPT arama botu robots.txt'de engelli"], ["warn", "Müşteri sorularını cevaplayan SSS yok"], ["pass", "İçerik JavaScript olmadan görünüyor"]],
  },
  problem: {
    kicker: "Değişim",
    title: "Bir sonraki müşteriniz arama kutusuna değil, yapay zekâya soruyor",
    lead: "Yapay zekâ asistanları iki üç isimle cevap veriyor. Sizin adınız aralarında değilse kaybettiğiniz müşteriyi hiç görmüyorsunuz.",
    stats: [
      { value: "%45", body: "tüketici artık yerel öneriler için ChatGPT gibi yapay zekâ araçlarını kullanıyor. Bir yıl önce bu oran %6'ydı.", source: "BrightLocal 2026, Local Falcon aracılığıyla" },
      { value: "%1,2", body: "yerel işletme ChatGPT tarafından öneriliyor; Google'da üst sıralarda olanlar dahil.", source: "SOCi Yerel Görünürlük Endeksi 2026" },
      { value: "%10–34", body: "aynı soruya verilen yapay zekâ cevapları arasındaki fark, sadece rastlantıdan. Tek seferlik kontrol çoğunlukla gürültüdür.", source: "Growth Memo, 2026" },
    ],
  },
  steps: {
    kicker: "Nasıl çalışır",
    title: "Ölç. Düzelt. Kanıtla.",
    items: [
      { n: "01", title: "Ölç", body: "22 ağırlıklı kontrol sitenizi yapay zekâ botları gibi okur: 14 botun erişimi, JavaScript'siz içerik, yapısal veri, güven sinyalleri ve ajan hazırlığı." },
      { n: "02", title: "Düzelt", body: "Her sorunun yanında somut bir çözüm var. Ayrıca bugün yapıştırabileceğiniz llms.txt, Organization JSON-LD ve robots.txt kuralları hazır gelir." },
      { n: "03", title: "Kanıtla", body: "Müşterilerinizin gerçek sorularını yapay zekâ motorlarına birkaç kez sorun; tek bir şanslı ekran görüntüsü yerine %95 güven aralıklı görünürlük payınızı takip edin." },
    ],
  },
  compare: {
    kicker: "Neden Quovra",
    title: "Çoğu araç sadece izler. Quovra doğru ölçer ve düzeltir.",
    cols: ["Quovra", "Tipik AI görünürlük araçları", "ChatGPT'ye kendiniz sormak"],
    rows: [
      ["Sitenizin AI botlarınca nasıl görüldüğünün teknik denetimi", true, "Kısmen", false],
      ["Hazır düzeltme kodu (llms.txt, JSON-LD, robots.txt)", true, "Nadiren", "Genel tavsiye"],
      ["Tekrarlı ölçüm ve güven aralığı", true, "Genelde tek ölçüm", false],
      ["Ajan hazırlığı ve ürün verisi kontrolü", true, "Nadiren", false],
      ["Şeffaf, açık kaynak puanlama", true, false, "—"],
      ["Türkçe arayüz ve TL fiyat", true, "Çoğunlukla yok", "—"],
      ["Başlangıç fiyatı", "₺0 · ücretli ₺790/ay'dan", "$29–$500+/ay", "Ücretsiz ama saatlerce elle iş"],
    ] as [string, Cell, Cell, Cell][],
    note: "Herkese açık fiyat sayfaları ve 2026 AI görünürlük aracı incelemelerine dayanır.",
  },
  useCases: {
    kicker: "Kimler için",
    title: "Yapay zekânın karar verdiği işletmeler için",
    items: [
      { id: "ecom", label: "E-ticaret", title: "Ürünlerinizi yapay zekâ alışveriş cevaplarına sokun", body: "ChatGPT, Google AI Mode ve alışveriş ajanları ürünleri yapısal veriyle karşılaştırır. Quovra her ürün sayfasında fiyat, stok, marka ve puan verisini kontrol eder, görünmeyen ürünleri gösterir.", q: "“1.000 TL altı en iyi koşu ayakkabısı?”" },
      { id: "local", label: "Klinik, restoran ve otel", title: "Yakındaki önerilen isim siz olun", body: "Yerel öneriler yapay zekâya kayıyor. Quovra hastalarınızın ve misafirlerinizin sorduğu soruları tam olarak test eder, önerilmek için sitenizde neyi düzeltmeniz gerektiğini söyler.", q: "“Kadıköy'de implant için iyi bir diş kliniği?”" },
      { id: "agency", label: "Ajanslar", title: "Her müşteri sözleşmesine GEO ekleyin", body: "Saniyeler içinde denetim yapın, kendi markanızla rapor gönderin, aylık ilerlemeyi müşterinin sorgulayabileceği sağlam rakamlarla kanıtlayın.", q: "“İstanbul'da B2B SEO için en iyi ajans?”" },
      { id: "saas", label: "SaaS ve B2B", title: "Demodan önce kısa listeye girin", body: "Alıcılar yapay zekâya alternatifleri ve karşılaştırmaları soruyor. Kısa listede olup olmadığınızı ve yerinize hangi rakiplerin anıldığını takip edin.", q: "“20 kişilik ekip için Paraşüt alternatifleri?”" },
    ],
  },
  future: {
    kicker: "Geleceğe hazır",
    title: "Yapay zekâ aramasının bir sonraki adımına hazır",
    items: [
      { tag: "Yayında", title: "Ajanla alışveriş", body: "Alışveriş ajanları ürünleri artık OpenAI'nin ACP ve Google'ın UCP gibi protokolleriyle keşfediyor. Quovra ürün verinizin ajanlara hazır olup olmadığını kontrol eder." },
      { tag: "Yayında", title: "Ajanlar için Markdown", body: "Ajanlar Markdown'ı HTML'den çok daha ucuza okur. llms.txt, llms-full.txt ve Markdown alternatiflerini kontrol ediyoruz." },
      { tag: "Yakında", title: "AI bot analitiği", body: "Google Analytics yapay zekâ botlarını göremez. Hangi AI ajanının hangi sayfanızı okuduğunu doğrudan sunucu loglarından görün." },
      { tag: "Yakında", title: "Organik ve sponsorlu", body: "ChatGPT 2026'da reklam göstermeye başladı. Organik önerilerinizi ücretli yerleşimlerden ayrı takip edin." },
    ],
  },
  pricing: {
    kicker: "Fiyatlar",
    title: "Ücretsiz başlayın. Zaman içinde kanıt istediğinizde yükseltin.",
    lead: "Ücretli planlar erken erişimde. Şimdi katılın, lansman fiyatı ömür boyu sizin kalsın.",
    monthly: "Aylık",
    yearly: "Yıllık",
    save: "2 ay bedava",
    perMonth: "/ay",
    billedYearly: "yıllık faturalanır",
    currency: "₺",
    plans: [
      { id: "free", name: "Ücretsiz", tagline: "Her siteyi, her zaman denetleyin", monthly: 0, yearly: 0, cta: "Ücretsiz denetle",
        highlights: ["Sınırsız tek sayfa denetimi", "10 sayfalık site taraması", "Hazır düzeltmeler", "Markdown ve PDF rapor, rozet"] },
      { id: "starter", name: "Başlangıç", tagline: "Tek işletme için", monthly: 790, yearly: 660, cta: "Erken erişime katıl",
        highlights: ["1 site · 50 sayfa takibi", "30 müşteri sorusu", "ChatGPT + Gemini", "Güven aralıklı haftalık takip"] },
      { id: "growth", name: "Büyüme", tagline: "Büyüyen markalar için", monthly: 1990, yearly: 1660, featured: true, cta: "Erken erişime katıl",
        highlights: ["3 site · 300 sayfa", "100 müşteri sorusu", "4 yapay zekâ motoru", "Rakip takibi ve AI bot analitiği"] },
      { id: "agency", name: "Ajans", tagline: "Ajanslar ve ekipler için", monthly: 5990, yearly: 4990, cta: "Erken erişime katıl",
        highlights: ["20 müşteri sitesi · 2.000 sayfa", "500 müşteri sorusu", "Kendi markanızla rapor ve müşteri paneli", "API erişimi · 10 kullanıcı"] },
    ] as Plan[],
    popular: "En popüler",
    tableTitle: "Paketleri karşılaştırın",
    soon: "yakında",
    table: [
      ["Site denetimi ve 10 sayfa tarama", "Sınırsız", "Sınırsız", "Sınırsız", "Sınırsız"],
      ["Takip edilen site", "—", "1", "3", "20"],
      ["Haftalık takip edilen sayfa", "—", "50", "300", "2.000"],
      ["Takip edilen müşteri sorusu", "3 (tek seferlik demo)", "30", "100", "500"],
      ["Yapay zekâ motoru", "1", "2", "4", "Tümü (6)"],
      ["Tekrarlı ölçüm + %95 güven aralığı", false, true, true, true],
      ["Takip edilen rakip", "—", "3", "10", "Site başına 25"],
      ["Puan düşüşü ve rakip uyarıları", false, true, true, true],
      ["Ajan hazırlığı raporu", true, true, true, true],
      ["AI bot trafik analitiği", false, false, "soon", "soon"],
      ["Entegrasyonlar (WordPress, Shopify, ikas, Ticimax)", false, false, "soon", "soon"],
      ["Kendi markanızla rapor ve müşteri paneli", false, false, false, "soon"],
      ["API erişimi", false, false, false, true],
      ["Kullanıcı", "1", "1", "3", "10"],
      ["Destek", "Topluluk", "E-posta", "Öncelikli e-posta", "Öncelikli + aylık strateji görüşmesi"],
    ] as [string, Cell, Cell, Cell, Cell][],
    service: { title: "Düzeltmeleri biz mi yapalım?", body: "Anahtar teslim kurulum hizmetimiz denetiminizdeki tüm düzeltmeleri uygular: llms.txt, yapısal veri, robots.txt ve SSS içeriği.", price: "₺4.900'den başlayan tek seferlik", cta: "Kurulum talep et" },
  },
  faq: {
    title: "Sık sorulan sorular",
    items: [
      { q: "GEO (Üretken Motor Optimizasyonu) nedir?", a: "GEO, işletmenizin ChatGPT, Gemini, Claude, Perplexity ve Google AI Overviews gibi yapay zekâ sistemleri tarafından kolayca bulunmasını, anlaşılmasını ve önerilmesini sağlama işidir. SEO arama sonuçlarında tıklama kazandırır; GEO yapay zekânın cevabının içinde adınızın geçmesini sağlar." },
      { q: "Neden ChatGPT'ye kendim sormuyorum?", a: "Sorabilirsiniz, bir kere. Ama cevaplar her seferinde değişir, tek bir cevap size pek bir şey söylemez. Quovra her soruyu farklı motorlarda birkaç kez sorar, güven aralığı verir, trendi haftalık takip eder ve bir asistanın güvenilir şekilde yapamayacağı teknik denetimi yapar: 14 botun robots.txt kuralları, JavaScript'siz görünüm ve yapısal veri." },
      { q: "Quovra diğer AI görünürlük araçlarından nasıl farklı?", a: "Üç şeyle: sadece izlemiyoruz, düzeltiyoruz (hazır kod, yolda entegrasyonlar); tekrarlı ölçüm ve güven aralığıyla ölçüyoruz; puanlamamız açık kaynak, yani puanınızı neden aldığınızı tam olarak görebilirsiniz. Ayrıca Türkçe ve TL fiyatlıyız." },
      { q: "Gerçek ChatGPT uygulamasını mı sorguluyorsunuz?", a: "Motorları resmi API'leri üzerinden sorguluyoruz. API cevapları tüketici uygulamalarından farklı olabilir; bu yüzden tek bir cevabı gerçek gibi sunmak yerine her rakamın yöntemini ve güven aralığını gösteriyoruz." },
      { q: "GPTBot'u engellemek bana zarar verir mi?", a: "GPTBot eğitim verisi toplar; engellemek geçerli bir lisans tercihidir. OAI-SearchBot veya ChatGPT-User gibi arama ve kullanıcı botlarını engellemek ise sizi canlı cevaplardan çıkarır. Quovra bunları ayrı puanlar." },
      { q: "Verilerim saklanıyor mu?", a: "Ücretsiz denetimler bellekte işlenir ve kaydedilmez. Ücretli planlarda trendleri gösterebilmek için siteleriniz, sorularınız ve sonuçlarınız saklanır; istediğiniz zaman silebilirsiniz." },
    ],
  },
  cta: { title: "Yapay zekânın sizin hakkınızda ne dediğini 10 saniyede görün", body: "Ücretsiz denetim, üyelik yok. Düzeltmeler dahil.", button: "Ücretsiz denetle" },
  footer: {
    tagline: "Yapay zekâ arama görünürlüğü, doğru ölçülmüş.",
    cols: [
      { title: "Ürün", links: [["Ücretsiz denetim", "#top"], ["Fiyatlar", "#pricing"], ["Yöntem", "/tr/yontem"]] },
      { title: "Kaynaklar", links: [["GitHub", "REPO"], ["llms.txt", "/llms.txt"], ["English", "/"]] },
    ],
    legal: "Açık kaynak GEO aracı · AGPL-3.0",
  },
};

export const LANDING: Record<Lang, LandingDict> = { en, tr };
