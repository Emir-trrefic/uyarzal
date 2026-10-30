import type { Lang } from "./index";

export type Cell = boolean | string;

export interface Plan {
  id: "free" | "starter" | "growth" | "agency";
  name: string;
  tagline: string;
  featured?: boolean;
  cta: string;
  highlights: string[];
}

export interface MarketItem {
  fact: string;
  title: string;
  body: string;
  source: string;
  href: string;
}

const en = {
  meta: {
    title: "Quovra — Get recommended by ChatGPT, Gemini, Claude & Perplexity",
    description: "Free GEO audit: see how AI assistants see your business, fix what blocks them, and track your share of AI answers with confidence intervals.",
    ogTitle: "Quovra — AI search visibility, measured properly",
    ogDescription: "Is ChatGPT recommending you, or your competitor? Find out in 10 seconds.",
  },
  nav: { product: "How it works", why: "Why Quovra", pricing: "Pricing", guide: "Guide", guideHref: "/guide", method: "Methodology", methodHref: "/methodology", cta: "Free audit", switchLabel: "TR", switchHref: "/tr" },
  hero: {
    eyebrow: "Generative Engine Optimization",
    titleA: "Is ChatGPT recommending you, or ",
    titleB: "your competitor?",
    lead: "See how AI assistants see your business, fix what holds you back, and measure the result.",
    trust: ["No sign-up", "Nothing stored", "Open source"],
  },
  engines: { label: "Works for", list: ["ChatGPT", "Google AI Overviews", "Gemini", "Claude", "Perplexity", "Copilot"] },
  preview: {
    badge: "Sample report",
    site: "smile-dental.example",
    question: "“Best implant clinic in Istanbul?”",
    answerLabel: "AI answer (5 runs)",
    source: "AI answer · 5 runs",
    answer: ["For implants in Istanbul, the clinics named most often are ", ["Competitor A", 1], " and ", ["Competitor B", 2], ". ", ["Smile Dental", 3], " appears too, but only in one of five answers."] as (string | [string, number])[],
    you: "you",
    auditLine: "Site audit",
    rows: [["Competitor A", "5/5"], ["Competitor B", "4/5"], ["Smile Dental", "1/5"]],
    sov: "Share of voice 20%",
    ci: "95% CI 4–62%",
    checks: [["fail", "ChatGPT search bot blocked"], ["warn", "No FAQ for buyer questions"], ["pass", "Content visible without JavaScript"]],
  },
  vision: {
    kicker: "Our vision",
    title: "Search is becoming a conversation. We make sure your brand is part of it.",
    body: "For twenty years, businesses competed for the top of a results page. Now customers ask an AI and get one answer with two or three names. Quovra builds the infrastructure that gets brands found, understood and recommended in that new world, and proves it with numbers.",
    mission: "Our mission: every brand that deserves to be recommended should be in the answer.",
    pillars: [
      { title: "Transparent", body: "Every score traces back to open-source code. No black boxes." },
      { title: "Evidence-based", body: "Repeated measurements with confidence intervals, not lucky screenshots." },
      { title: "For everyone", body: "From a single clinic to a global agency, in any language and currency." },
    ],
  },
  climb: {
    kicker: "With Quovra",
    title: "From the bottom of the list to the top.",
    lead: "As fixes go live, your position in AI answers climbs week by week.",
    question: "“Best implant clinic in Istanbul?”",
    you: "Your brand",
    others: ["Competitor A", "Competitor B", "Competitor C", "Competitor D"],
    week: "Week",
    score: "Visibility score",
    share: "Share of voice",
    rank: "Rank",
    caption: "Illustrative scenario. Results vary by sector, competition and how fixes are applied.",
  },
  code: {
    kicker: "Under the hood",
    title: "Not just a report. Working code.",
    lead: "Every finding ships with the exact fix, and everything is available through an API and a CLI.",
    tabs: { robots: "robots.txt", llms: "llms.txt", jsonld: "JSON-LD", api: "API", cli: "CLI" },
    comments: {
      robots: "# Before: AI search bots blocked. After: welcomed.",
      llms: "# Generated from your own site, ready to publish at /llms.txt",
      jsonld: "<!-- Tells AI exactly who you are -->",
      api: "# One request, a full GEO audit back as JSON",
      cli: "# Fail your deploy if AI visibility drops",
    },
  },
  explain: {
    kicker: "What is GEO?",
    title: "SEO gets you clicks. GEO gets you named in the answer.",
    flow: [
      { n: "1", title: "A customer asks", body: "“Which clinic is best for implants?”" },
      { n: "2", title: "The AI reads the web", body: "Its crawlers fetch sites they can access and understand." },
      { n: "3", title: "It names 2–3 brands", body: "Everyone else is invisible, without ever knowing it." },
    ],
    vsTitle: "SEO vs. GEO",
    vs: [
      ["Goal", "Rank on a results page", "Be named inside the answer"],
      ["Reader", "A person scanning links", "An AI choosing sources"],
      ["Wins with", "Keywords and backlinks", "Access, clear facts, structured data, trust"],
    ] as [string, string, string][],
    more: "Read the guide",
  },
  steps: {
    kicker: "How it works",
    title: "Measure. Fix. Prove.",
    items: [
      { n: "01", title: "Measure", body: "22 checks read your site the way AI crawlers do." },
      { n: "02", title: "Fix", body: "Every issue comes with a fix and ready-to-paste code." },
      { n: "03", title: "Prove", body: "Repeated AI questions with a 95% confidence interval." },
    ],
  },
  market: {
    kicker: "From the market",
    title: "What is already happening",
    items: [
      { fact: "Feb 2026", title: "Ads arrived in ChatGPT", body: "Sponsored suggestions now sit under answers in the US. Organic mentions get harder to win.", source: "Segwise, 2026", href: "https://segwise.ai/blog/chatgpt-ads-2026-guide.md" },
      { fact: "Shopify · Etsy", title: "Products show up in ChatGPT", body: "These catalogs are included automatically; other stores need crawlable pages or a feed.", source: "Alhena, 2026", href: "https://alhena.ai/blog/chatgpt-shopping-product-feed-guide/" },
      { fact: "133 vs 11", title: "Reviews decide local answers", body: "AI-visible local businesses averaged 133 Google reviews; invisible ones averaged 11.", source: "Insites, 10,000 US businesses", href: "https://www.insites.com/ai-whitepaper" },
      { fact: "45%", title: "Locals ask AI first", body: "Share of consumers using AI for local recommendations, up from 6% a year earlier.", source: "BrightLocal via Local Falcon", href: "https://www.localfalcon.com/blog/the-ai-visibility-crisis-why-83-percent-of-restaurants-dont-exist-in-chatgpt" },
      { fact: "2.2%", title: "Answers keep changing", body: "Share of ChatGPT citations that stayed the same across three identical runs.", source: "Growth Memo × AirOps", href: "https://www.growth-memo.com/p/how-to-make-prompt-tracking-much" },
      { fact: "$1.8B", title: "Investors are betting on it", body: "Valuation of Profound, the category leader, after its September 2026 round.", source: "Dealroom", href: "https://dealroom.co/charts/generative-engine-optimization-startups" },
    ] as MarketItem[],
  },
  compare: {
    kicker: "Why Quovra",
    title: "Most tools only watch. Quovra measures properly and fixes.",
    cols: ["Quovra", "Typical trackers", "Asking ChatGPT yourself"],
    rows: [
      ["Technical site audit", true, "Partial", false],
      ["Ready-to-paste fixes", true, "Rarely", "Generic advice"],
      ["Repeated runs + confidence interval", true, "Single runs", false],
      ["Agent-readiness checks", true, "Rarely", false],
      ["Works for any site, in any language", true, "Mostly English", true],
      ["Starting price", "Free · paid from $24 / €22 / £19", "$29–$500+", "Free, but slow"],
    ] as [string, Cell, Cell, Cell][],
    note: "Based on public pricing pages and 2026 tool reviews.",
  },
  useCases: {
    kicker: "Who it is for",
    title: "Built for businesses AI answers decide on",
    items: [
      { id: "ecom", label: "E-commerce", title: "Get products into AI shopping answers", body: "We check every product page for the price, stock, brand and rating data agents compare.", q: "“Best running shoes under $100?”" },
      { id: "local", label: "Clinics, restaurants, hotels", title: "Be the name AI suggests nearby", body: "We test the questions your patients and guests ask, and tell you what to fix.", q: "“Best implant clinic near me?”" },
      { id: "agency", label: "Agencies", title: "Add GEO to every retainer", body: "Audit in seconds, send branded reports, prove progress with solid numbers.", q: "“Best B2B SEO agency in Europe?”" },
      { id: "saas", label: "SaaS & B2B", title: "Make the shortlist", body: "Track whether AI names you when buyers ask for alternatives.", q: "“Alternatives to HubSpot for a small team?”" },
    ],
  },
  future: {
    kicker: "Coming next",
    title: "Ready for what AI search becomes",
    items: [
      { tag: "Live", title: "Agentic shopping", body: "Product data checks for AI shopping agents." },
      { tag: "Live", title: "Markdown for agents", body: "llms.txt and llms-full.txt checks." },
      { tag: "Soon", title: "AI bot analytics", body: "See which AI agents read which pages." },
      { tag: "Soon", title: "Organic vs. sponsored", body: "Track mentions separately from ChatGPT ads." },
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
    currencyLabel: "Currency",
    billedYearly: "billed yearly",
    plans: [
      { id: "free", name: "Free", tagline: "Audit any site, any time", cta: "Run a free audit",
        highlights: ["Unlimited single-page audits", "10-page site scans", "Ready-to-paste fixes", "Markdown & PDF reports, badge"] },
      { id: "starter", name: "Starter", tagline: "For one business", cta: "Join early access",
        highlights: ["1 site · 50 pages monitored", "30 buyer questions", "ChatGPT + Gemini", "Weekly tracking with confidence intervals"] },
      { id: "growth", name: "Growth", tagline: "For growing brands", featured: true, cta: "Join early access",
        highlights: ["3 sites · 300 pages", "100 buyer questions", "4 AI engines", "Competitor tracking & AI bot analytics"] },
      { id: "agency", name: "Agency", tagline: "For agencies & teams", cta: "Join early access",
        highlights: ["20 client sites · 2,000 pages", "300 buyer questions", "4 AI engines, white-label reports", "API access · 10 seats"] },
    ] as Plan[],
    popular: "Most popular",
    tableTitle: "Compare plans",
    soon: "soon",
    table: [
      ["Site audits & 10-page scans", "Unlimited", "Unlimited", "Unlimited", "Unlimited"],
      ["Sites monitored", "—", "1", "3", "20"],
      ["Pages monitored weekly", "—", "50", "300", "2,000"],
      ["Buyer questions tracked", "3 (one-off demo)", "30", "100", "300"],
      ["AI engines", "1", "2", "4", "4 (+ more on Enterprise)"],
      ["Measurement", "One-off", "Weekly", "Weekly", "Weekly + on demand"],
      ["Repeated runs + 95% confidence interval", false, true, true, true],
      ["Competitors tracked", "—", "3", "10", "25 per site"],
      ["Score-drop & competitor alerts", false, true, true, true],
      ["Agent-readiness report", true, true, true, true],
      ["AI bot traffic analytics", false, false, "soon", "soon"],
      ["Integrations (WordPress, Shopify, ikas, Ticimax)", false, false, "soon", "soon"],
      ["Prices in USD, EUR, GBP or TRY", true, true, true, true],
      ["White-label reports & client portal", false, false, false, "soon"],
      ["API access", false, false, false, true],
      ["Seats", "1", "1", "3", "10"],
      ["Support", "Community", "Email", "Priority email", "Priority + monthly strategy call"],
    ] as [string, Cell, Cell, Cell, Cell][],
    service: { title: "Rather have us fix it?", body: "Our done-for-you setup implements every fix from your audit: llms.txt, structured data, robots.txt and FAQ content.", priceFrom: "One-time, from {price}", cta: "Request setup" },
  },
  faq: {
    title: "Questions",
    items: [
      { q: "What is GEO?", a: "Making your business easy for AI assistants to find, understand and recommend. SEO wins clicks; GEO wins the mention inside the answer." },
      { q: "Why not just ask ChatGPT myself?", a: "Answers change from run to run, so one answer tells you little. Quovra repeats questions, reports a confidence interval and also audits your site technically." },
      { q: "Do you query the real ChatGPT app?", a: "We use the engines’ official APIs. Results can differ from the apps, so we always show method and confidence." },
      { q: "Does blocking GPTBot hurt me?", a: "GPTBot is for training; blocking it is a fair choice. Blocking search bots like OAI-SearchBot removes you from live answers." },
      { q: "Does it work outside Türkiye?", a: "Yes. Quovra audits any public website in any language, the interface is in English and Turkish, and you can pay in USD, EUR, GBP or TRY." },
      { q: "Is my data stored?", a: "Free audits are not stored. Paid plans keep your results to show trends; you can delete them any time." },
    ],
  },
  cta: { title: "See what AI says about you", body: "Free, no sign-up, about 10 seconds.", button: "Run a free audit" },
  footer: {
    tagline: "AI search visibility, measured properly.",
    cols: [
      { title: "Product", links: [["Free audit", "#top"], ["Pricing", "#pricing"], ["Methodology", "/methodology"]] },
      { title: "Company", links: [["GEO guide", "/guide"], ["Investors", "/investors"], ["GitHub", "REPO"], ["Türkçe", "/tr"]] },
    ],
    legal: "Open-source GEO toolkit · AGPL-3.0",
    madeBy: "A product by",
  },
};

export type LandingDict = typeof en;

const tr: LandingDict = {
  meta: {
    title: "Quovra — ChatGPT, Gemini, Claude ve Perplexity sizi önersin",
    description: "Ücretsiz GEO denetimi: yapay zekâ asistanlarının işletmenizi nasıl gördüğünü görün, engelleri düzeltin, cevaplardaki payınızı güven aralığıyla takip edin.",
    ogTitle: "Quovra — Yapay zekâ arama görünürlüğü, doğru ölçülmüş",
    ogDescription: "ChatGPT sizi mi öneriyor, rakibinizi mi? 10 saniyede öğrenin.",
  },
  nav: { product: "Nasıl çalışır", why: "Neden Quovra", pricing: "Fiyatlar", guide: "Rehber", guideHref: "/tr/rehber", method: "Yöntem", methodHref: "/tr/yontem", cta: "Ücretsiz denetle", switchLabel: "EN", switchHref: "/" },
  hero: {
    eyebrow: "Üretken Motor Optimizasyonu (GEO)",
    titleA: "ChatGPT sizi mi öneriyor, yoksa ",
    titleB: "rakibinizi mi?",
    lead: "Yapay zekâ asistanlarının işletmenizi nasıl gördüğünü görün, sizi geride tutan sorunları düzeltin, sonucu ölçün.",
    trust: ["Üyelik yok", "Veri saklanmaz", "Açık kaynak"],
  },
  engines: { label: "Desteklenenler", list: ["ChatGPT", "Google AI Overviews", "Gemini", "Claude", "Perplexity", "Copilot"] },
  preview: {
    badge: "Örnek rapor",
    site: "gulus-dis.example",
    question: "“İstanbul'da en iyi implant kliniği hangisi?”",
    answerLabel: "Yapay zekâ cevabı (5 tekrar)",
    source: "Yapay zekâ cevabı · 5 tekrar",
    answer: ["İstanbul'da implant için en çok anılan klinikler ", ["Rakip A", 1], " ve ", ["Rakip B", 2], ". ", ["Gülüş Diş", 3], " de geçiyor, ama beş cevaptan yalnızca birinde."] as (string | [string, number])[],
    you: "siz",
    auditLine: "Site denetimi",
    rows: [["Rakip A", "5/5"], ["Rakip B", "4/5"], ["Gülüş Diş", "1/5"]],
    sov: "Görünürlük payı %20",
    ci: "%95 güven aralığı %4–62",
    checks: [["fail", "ChatGPT arama botu engelli"], ["warn", "Müşteri soruları için SSS yok"], ["pass", "İçerik JavaScript'siz görünüyor"]],
  },
  vision: {
    kicker: "Vizyonumuz",
    title: "Arama bir sohbete dönüşüyor. Markanızın o sohbette yer almasını sağlıyoruz.",
    body: "Yirmi yıl boyunca işletmeler arama sonuçlarında üst sıraya çıkmak için yarıştı. Şimdi müşteriler soruyu yapay zekâya soruyor ve içinde iki üç isim geçen tek bir cevap alıyor. Quovra, bu yeni dünyada markaların bulunmasını, anlaşılmasını ve önerilmesini sağlayan altyapıyı kuruyor ve sonucu rakamlarla kanıtlıyor.",
    mission: "Misyonumuz: Önerilmeyi hak eden her marka, cevabın içinde olmalı.",
    pillars: [
      { title: "Şeffaf", body: "Her puan açık kaynak koda dayanır. Kara kutu yok." },
      { title: "Kanıta dayalı", body: "Şanslı bir ekran görüntüsü değil, güven aralıklı tekrarlı ölçüm." },
      { title: "Herkes için", body: "Tek bir klinikten küresel bir ajansa, her dilde ve her para biriminde." },
    ],
  },
  climb: {
    kicker: "Quovra ile",
    title: "Listenin sonundan zirveye.",
    lead: "Düzeltmeler yayına girdikçe yapay zekâ cevaplarındaki sıranız haftadan haftaya yükselir.",
    question: "“İstanbul'da en iyi implant kliniği hangisi?”",
    you: "Sizin markanız",
    others: ["Rakip A", "Rakip B", "Rakip C", "Rakip D"],
    week: "Hafta",
    score: "Görünürlük puanı",
    share: "Görünürlük payı",
    rank: "Sıra",
    caption: "Temsili senaryodur. Sonuçlar sektöre, rekabete ve düzeltmelerin uygulanmasına göre değişir.",
  },
  code: {
    kicker: "Kaputun altı",
    title: "Sadece rapor değil, çalışan kod.",
    lead: "Her bulgu, uygulanacak düzeltmenin kendisiyle gelir. Hepsi API ve komut satırı aracıyla da kullanılabilir.",
    tabs: { robots: "robots.txt", llms: "llms.txt", jsonld: "JSON-LD", api: "API", cli: "CLI" },
    comments: {
      robots: "# Önce: yapay zekâ arama botları engelli. Sonra: hoş geldiniz.",
      llms: "# Sitenizden üretildi, /llms.txt adresinde yayınlamaya hazır",
      jsonld: "<!-- Yapay zekâya kim olduğunuzu tam olarak söyler -->",
      api: "# Tek istek, JSON olarak tam bir GEO denetimi",
      cli: "# Yapay zekâ görünürlüğü düşerse yayını durdur",
    },
  },
  explain: {
    kicker: "GEO nedir?",
    title: "SEO tıklama getirir. GEO, cevabın içinde adınızı geçirir.",
    flow: [
      { n: "1", title: "Müşteri sorar", body: "“İmplant için en iyi klinik hangisi?”" },
      { n: "2", title: "Yapay zekâ web'i okur", body: "Botları erişebildiği ve anlayabildiği siteleri okur." },
      { n: "3", title: "2–3 marka önerir", body: "Gerisi görünmez kalır, hem de haberi olmadan." },
    ],
    vsTitle: "SEO ve GEO farkı",
    vs: [
      ["Hedef", "Sonuç sayfasında üst sıra", "Cevabın içinde anılmak"],
      ["Okuyan", "Linklere bakan insan", "Kaynak seçen yapay zekâ"],
      ["Kazandıran", "Anahtar kelime ve backlink", "Erişim, net bilgi, yapısal veri, güven"],
    ] as [string, string, string][],
    more: "Rehberi oku",
  },
  steps: {
    kicker: "Nasıl çalışır",
    title: "Ölç. Düzelt. Kanıtla.",
    items: [
      { n: "01", title: "Ölç", body: "22 kontrol sitenizi yapay zekâ botları gibi okur." },
      { n: "02", title: "Düzelt", body: "Her sorun için çözüm ve yapıştırmaya hazır kod." },
      { n: "03", title: "Kanıtla", body: "Tekrarlı sorularla %95 güven aralıklı ölçüm." },
    ],
  },
  market: {
    kicker: "Piyasadan örnekler",
    title: "Şu an neler oluyor?",
    items: [
      { fact: "Şubat 2026", title: "ChatGPT'ye reklam geldi", body: "ABD'de cevapların altında sponsorlu öneriler başladı. Organik olarak anılmak zorlaşıyor.", source: "Segwise, 2026", href: "https://segwise.ai/blog/chatgpt-ads-2026-guide.md" },
      { fact: "Shopify · Etsy", title: "Ürünler ChatGPT'de listeleniyor", body: "Bu platformların katalogları otomatik dahil; diğer mağazaların taranabilir sayfa ya da feed'e ihtiyacı var.", source: "Alhena, 2026", href: "https://alhena.ai/blog/chatgpt-shopping-product-feed-guide/" },
      { fact: "133'e 11", title: "Yerel cevapları yorumlar belirliyor", body: "Yapay zekâda görünen yerel işletmelerin ortalama 133, görünmeyenlerin 11 Google yorumu var.", source: "Insites, ABD'de 10.000 işletme", href: "https://www.insites.com/ai-whitepaper" },
      { fact: "%45", title: "Yerel aramada önce yapay zekâ", body: "Yerel öneri için yapay zekâ kullanan tüketici oranı. Bir yıl önce %6'ydı.", source: "BrightLocal, Local Falcon aracılığıyla", href: "https://www.localfalcon.com/blog/the-ai-visibility-crisis-why-83-percent-of-restaurants-dont-exist-in-chatgpt" },
      { fact: "%2,2", title: "Cevaplar sürekli değişiyor", body: "Aynı soru üç kez sorulduğunda değişmeden kalan ChatGPT atıflarının oranı.", source: "Growth Memo × AirOps", href: "https://www.growth-memo.com/p/how-to-make-prompt-tracking-much" },
      { fact: "1,8 milyar $", title: "Yatırımcılar bu alana inanıyor", body: "Sektör lideri Profound'un Eylül 2026 turundaki değerlemesi.", source: "Dealroom", href: "https://dealroom.co/charts/generative-engine-optimization-startups" },
    ] as MarketItem[],
  },
  compare: {
    kicker: "Neden Quovra",
    title: "Çoğu araç sadece izler. Quovra doğru ölçer ve düzeltir.",
    cols: ["Quovra", "Tipik izleme araçları", "ChatGPT'ye kendiniz sormak"],
    rows: [
      ["Teknik site denetimi", true, "Kısmen", false],
      ["Yapıştırmaya hazır düzeltmeler", true, "Nadiren", "Genel tavsiye"],
      ["Tekrarlı ölçüm + güven aralığı", true, "Tek ölçüm", false],
      ["Türkçe ve İngilizce, 4 para birimi", true, "Çoğunlukla sadece İngilizce", "—"],
      ["Başlangıç fiyatı", "Ücretsiz · ücretli ₺790 ya da $24", "$29–$500+", "Ücretsiz ama yavaş"],
    ] as [string, Cell, Cell, Cell][],
    note: "Herkese açık fiyat sayfaları ve 2026 araç incelemelerine dayanır.",
  },
  useCases: {
    kicker: "Kimler için",
    title: "Yapay zekânın karar verdiği işletmeler için",
    items: [
      { id: "ecom", label: "E-ticaret", title: "Ürünlerinizi AI alışveriş cevaplarına sokun", body: "Her ürün sayfasında ajanların karşılaştırdığı fiyat, stok, marka ve puan verisini kontrol ederiz.", q: "“1.000 TL altı en iyi koşu ayakkabısı?”" },
      { id: "local", label: "Klinik, restoran, otel", title: "Yakındaki önerilen isim siz olun", body: "Hasta ve misafirlerinizin sorduğu soruları test eder, neyi düzeltmeniz gerektiğini söyleriz.", q: "“Kadıköy'de iyi bir implant kliniği?”" },
      { id: "agency", label: "Ajanslar", title: "Her müşteriye GEO ekleyin", body: "Saniyeler içinde denetleyin, kendi markanızla rapor gönderin, ilerlemeyi rakamlarla gösterin.", q: "“İstanbul'da en iyi B2B SEO ajansı?”" },
      { id: "saas", label: "SaaS ve B2B", title: "Kısa listeye girin", body: "Alıcılar alternatif sorduğunda yapay zekânın sizi anıp anmadığını takip edin.", q: "“Küçük ekip için Paraşüt alternatifleri?”" },
    ],
  },
  future: {
    kicker: "Sırada ne var",
    title: "Yapay zekâ aramasının geleceğine hazır",
    items: [
      { tag: "Yayında", title: "Ajanla alışveriş", body: "AI alışveriş ajanları için ürün verisi kontrolü." },
      { tag: "Yayında", title: "Ajanlar için Markdown", body: "llms.txt ve llms-full.txt kontrolleri." },
      { tag: "Yakında", title: "AI bot analitiği", body: "Hangi AI ajanının hangi sayfayı okuduğunu görün." },
      { tag: "Yakında", title: "Organik ve sponsorlu", body: "Anılmalarınızı ChatGPT reklamlarından ayrı izleyin." },
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
    currencyLabel: "Para birimi",
    billedYearly: "yıllık faturalanır",
    plans: [
      { id: "free", name: "Ücretsiz", tagline: "Her siteyi, her zaman denetleyin", cta: "Ücretsiz denetle",
        highlights: ["Sınırsız tek sayfa denetimi", "10 sayfalık site taraması", "Hazır düzeltmeler", "Markdown ve PDF rapor, rozet"] },
      { id: "starter", name: "Başlangıç", tagline: "Tek işletme için", cta: "Erken erişime katıl",
        highlights: ["1 site · 50 sayfa takibi", "30 müşteri sorusu", "ChatGPT + Gemini", "Güven aralıklı haftalık takip"] },
      { id: "growth", name: "Büyüme", tagline: "Büyüyen markalar için", featured: true, cta: "Erken erişime katıl",
        highlights: ["3 site · 300 sayfa", "100 müşteri sorusu", "4 yapay zekâ motoru", "Rakip takibi ve AI bot analitiği"] },
      { id: "agency", name: "Ajans", tagline: "Ajanslar ve ekipler için", cta: "Erken erişime katıl",
        highlights: ["20 müşteri sitesi · 2.000 sayfa", "300 müşteri sorusu", "4 motor, kendi markanızla rapor", "API erişimi · 10 kullanıcı"] },
    ] as Plan[],
    popular: "En popüler",
    tableTitle: "Paketleri karşılaştırın",
    soon: "yakında",
    table: [
      ["Site denetimi ve 10 sayfa tarama", "Sınırsız", "Sınırsız", "Sınırsız", "Sınırsız"],
      ["Takip edilen site", "—", "1", "3", "20"],
      ["Haftalık takip edilen sayfa", "—", "50", "300", "2.000"],
      ["Takip edilen müşteri sorusu", "3 (tek seferlik demo)", "30", "100", "300"],
      ["Yapay zekâ motoru", "1", "2", "4", "4 (Kurumsal'da daha fazla)"],
      ["Ölçüm sıklığı", "Tek sefer", "Haftalık", "Haftalık", "Haftalık + istek üzerine"],
      ["Tekrarlı ölçüm + %95 güven aralığı", false, true, true, true],
      ["Takip edilen rakip", "—", "3", "10", "Site başına 25"],
      ["Puan düşüşü ve rakip uyarıları", false, true, true, true],
      ["Ajan hazırlığı raporu", true, true, true, true],
      ["AI bot trafik analitiği", false, false, "soon", "soon"],
      ["Entegrasyonlar (WordPress, Shopify, ikas, Ticimax)", false, false, "soon", "soon"],
      ["USD, EUR, GBP veya TRY ile ödeme", true, true, true, true],
      ["Kendi markanızla rapor ve müşteri paneli", false, false, false, "soon"],
      ["API erişimi", false, false, false, true],
      ["Kullanıcı", "1", "1", "3", "10"],
      ["Destek", "Topluluk", "E-posta", "Öncelikli e-posta", "Öncelikli + aylık strateji görüşmesi"],
    ] as [string, Cell, Cell, Cell, Cell][],
    service: { title: "Düzeltmeleri biz mi yapalım?", body: "Anahtar teslim kurulum hizmetimiz denetiminizdeki tüm düzeltmeleri uygular: llms.txt, yapısal veri, robots.txt ve SSS içeriği.", priceFrom: "Tek seferlik, başlangıç fiyatı {price}", cta: "Kurulum talep et" },
  },
  faq: {
    title: "Sık sorulan sorular",
    items: [
      { q: "GEO nedir?", a: "İşletmenizin yapay zekâ asistanlarınca kolayca bulunmasını, anlaşılmasını ve önerilmesini sağlamak. SEO tıklama, GEO cevabın içinde anılma kazandırır." },
      { q: "Neden ChatGPT'ye kendim sormuyorum?", a: "Cevaplar her seferinde değişir; tek cevap pek bir şey söylemez. Quovra soruları tekrarlar, güven aralığı verir ve sitenizi teknik olarak da denetler." },
      { q: "Gerçek ChatGPT uygulamasını mı sorguluyorsunuz?", a: "Motorların resmi API'lerini kullanıyoruz. Sonuçlar uygulamadan farklı olabilir; bu yüzden yöntemi ve güven aralığını hep gösteriyoruz." },
      { q: "GPTBot'u engellemek zarar verir mi?", a: "GPTBot eğitim içindir, engellemek makul bir tercih. OAI-SearchBot gibi arama botlarını engellemek ise sizi canlı cevaplardan çıkarır." },
      { q: "Yurt dışındaki siteler için de çalışır mı?", a: "Evet. Quovra her dildeki herkese açık siteyi denetler; arayüz Türkçe ve İngilizce, ödeme USD, EUR, GBP veya TRY ile yapılabilir." },
      { q: "Verilerim saklanıyor mu?", a: "Ücretsiz denetimler saklanmaz. Ücretli planlarda trend göstermek için sonuçlar tutulur, istediğiniz zaman silebilirsiniz." },
    ],
  },
  cta: { title: "Yapay zekâ sizin hakkınızda ne diyor?", body: "Ücretsiz, üyeliksiz, yaklaşık 10 saniye.", button: "Ücretsiz denetle" },
  footer: {
    tagline: "Yapay zekâ arama görünürlüğü, doğru ölçülmüş.",
    cols: [
      { title: "Ürün", links: [["Ücretsiz denetim", "#top"], ["Fiyatlar", "#pricing"], ["Yöntem", "/tr/yontem"]] },
      { title: "Şirket", links: [["GEO rehberi", "/tr/rehber"], ["Yatırımcılar", "/tr/yatirimci"], ["GitHub", "REPO"], ["English", "/"]] },
    ],
    legal: "Açık kaynak GEO aracı · AGPL-3.0",
    madeBy: "Bir ürünüdür",
  },
};

export const LANDING: Record<Lang, LandingDict> = { en, tr };
