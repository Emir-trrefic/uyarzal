import type { Lang } from "../i18n";

type Msg<P = void> = P extends void ? () => string : (p: P) => string;

export interface CheckMessages {
  aiSearch: { title: string; ok: Msg<{ n: number }>; blocked: Msg<{ bots: string }>; fix: string };
  aiTraining: { title: string; ok: string; blocked: Msg<{ bots: string }>; fix: string };
  llms: { title: string; missing: string; found: Msg<{ noTitle: boolean; noLinks: boolean }>; fix: string };
  sitemap: { title: string; ok: string; missing: string; fix: string };
  indexable: { title: string; status: Msg<{ status: number }>; noindex: string; ok: Msg<{ status: number }>; fix: string };
  structured: { title: string; none: string; found: Msg<{ types: string }>; fix: string };
  questions: { title: string; detail: Msg<{ n: number; faq: boolean }>; fix: string };
  headings: { title: string; detail: Msg<{ h1: number; h2: number }>; fix: string };
  meta: { title: string; detail: Msg<{ title: number | null; desc: number | null }>; fix: string };
  og: { title: string; detail: Msg<{ n: number }>; fix: string };
  canonical: { title: string; detail: Msg<{ canonical: boolean; lang: string | null }>; fix: string };
  rendered: { title: string; detail: Msg<{ words: number }>; fix: string };
  formatting: { title: string; detail: Msg<{ lists: number; tables: number }>; fix: string };
  freshness: { title: string; found: Msg<{ date: string }>; none: string; fix: string };
  evidence: { title: string; detail: Msg<{ stats: number; links: number }>; fix: string };
  authorship: { title: string; detail: Msg<{ n: number }>; fix: string };
  aboutContact: { title: string; detail: Msg<{ about: boolean; contact: boolean }>; fix: string };
  https: { title: string; ok: string; bad: string; fix: string };
  speed: { title: string; detail: Msg<{ ms: number }>; fix: string };
  alt: { title: string; none: string; detail: Msg<{ withAlt: number; total: number }>; fix: string };
  productData: {
    title: string; notApplicable: string; missing: string; complete: string;
    partial: Msg<{ missing: string }>; fields: Record<"name" | "image" | "price" | "availability" | "brand" | "rating", string>; fix: string;
  };
  markdownAccess: { title: string; detail: Msg<{ full: boolean; alternate: boolean }>; fix: string };
}

const en: CheckMessages = {
  aiSearch: {
    title: "AI search & assistant crawlers can reach you",
    ok: ({ n }) => `All ${n} AI search and user-fetch agents are allowed by robots.txt.`,
    blocked: ({ bots }) => `Blocked: ${bots}. These agents fetch pages to answer users in real time.`,
    fix: "Remove the Disallow rules for these user agents in robots.txt. Blocking them makes you invisible in their answers.",
  },
  aiTraining: {
    title: "AI training crawlers",
    ok: "Training crawlers are allowed, so models can learn about your brand.",
    blocked: ({ bots }) => `Blocked: ${bots}. This is a valid business choice, but future models will know less about you.`,
    fix: "If brand awareness matters more than content licensing, allow these crawlers.",
  },
  llms: {
    title: "llms.txt guide for AI agents",
    missing: "No /llms.txt found.",
    found: ({ noTitle, noLinks }) => `Found /llms.txt${noTitle ? " without an H1 title" : ""}${noLinks ? " without links to key pages" : ""}.`,
    fix: "Publish /llms.txt: a Markdown summary of who you are with links to your most important pages. Quovra generates one for you.",
  },
  sitemap: {
    title: "XML sitemap",
    ok: "A sitemap was found.",
    missing: "No sitemap at /sitemap.xml or in robots.txt.",
    fix: "Publish /sitemap.xml and reference it in robots.txt with a Sitemap: line.",
  },
  indexable: {
    title: "Page is indexable",
    status: ({ status }) => `The page returned HTTP ${status}.`,
    noindex: "The page is marked noindex.",
    ok: ({ status }) => `HTTP ${status}, no noindex directive.`,
    fix: "Serve the page with HTTP 200 and remove noindex from the robots meta tag / X-Robots-Tag header.",
  },
  structured: {
    title: "Structured data (Schema.org JSON-LD)",
    none: "No JSON-LD found.",
    found: ({ types }) => `Found types: ${types}.`,
    fix: "Add JSON-LD for Organization (with sameAs links) plus the page type (Article, Product, FAQPage…). AI systems use it to resolve who you are.",
  },
  questions: {
    title: "Answers real questions (FAQ)",
    detail: ({ n, faq }) => `${n} question-style heading(s)${faq ? " and FAQPage markup" : ", no FAQPage markup"}.`,
    fix: "Add a short FAQ that answers the exact questions buyers ask assistants, and mark it up with FAQPage.",
  },
  headings: {
    title: "Clear heading hierarchy",
    detail: ({ h1, h2 }) => `${h1} H1, ${h2} H2 heading(s).`,
    fix: "Use exactly one H1 stating the topic and H2 sections that each answer one sub-question. LLMs chunk pages by headings.",
  },
  meta: {
    title: "Title & meta description",
    detail: ({ title, desc }) => `Title: ${title === null ? "missing" : `${title} chars`}. Description: ${desc === null ? "missing" : `${desc} chars`}.`,
    fix: "Write a 15–65 character title and a 50–170 character description that states plainly what you offer and for whom.",
  },
  og: {
    title: "Open Graph tags",
    detail: ({ n }) => `${n}/3 core Open Graph tags present.`,
    fix: "Add og:title, og:description and og:image so link previews in chat assistants look right.",
  },
  canonical: {
    title: "Canonical URL & language",
    detail: ({ canonical, lang }) => `Canonical: ${canonical ? "yes" : "missing"}. lang attribute: ${lang ?? "missing"}.`,
    fix: 'Add <link rel="canonical"> and <html lang="…"> so engines attribute and localise your content correctly.',
  },
  rendered: {
    title: "Content visible without JavaScript",
    detail: ({ words }) => `${words} words in the raw HTML.`,
    fix: "Most AI crawlers do not execute JavaScript. Server-render or pre-render your main content (SSR/SSG).",
  },
  formatting: {
    title: "Extractable formatting (lists, tables)",
    detail: ({ lists, tables }) => `${lists} list item(s), ${tables} table(s).`,
    fix: "Present key facts, comparisons and steps as lists and tables. They are the easiest units for an LLM to quote.",
  },
  freshness: {
    title: "Freshness signals",
    found: ({ date }) => `Latest date found: ${date}.`,
    none: "No machine-readable publish/modified date.",
    fix: "Expose dateModified in JSON-LD (or article:modified_time) and keep key pages updated. Assistants prefer recent sources.",
  },
  evidence: {
    title: "Statistics & cited sources",
    detail: ({ stats, links }) => `${stats} statistic(s), ${links} outbound link(s).`,
    fix: "Back claims with concrete numbers and link to sources. GEO research found statistics and citations raise AI visibility by up to ~40%.",
  },
  authorship: {
    title: "Author & organization identity",
    detail: ({ n }) => `${n} identity signal(s) (author meta, Person, Organization).`,
    fix: "Name the author or organization on the page and in JSON-LD. E-E-A-T signals decide which sources get cited.",
  },
  aboutContact: {
    title: "About & contact pages linked",
    detail: ({ about, contact }) => `About page: ${about ? "linked" : "not found"}. Contact page: ${contact ? "linked" : "not found"}.`,
    fix: "Link to About and Contact pages from every page so engines can verify you are a real business.",
  },
  https: { title: "HTTPS", ok: "Served over HTTPS.", bad: "Served over plain HTTP.", fix: "Serve every page over HTTPS." },
  speed: {
    title: "Server response time",
    detail: ({ ms }) => `HTML delivered in ${ms} ms.`,
    fix: "AI fetchers use short timeouts. Cache HTML at the edge and aim for under one second.",
  },
  alt: {
    title: "Image alt text",
    none: "No images on the page.",
    detail: ({ withAlt, total }) => `${withAlt}/${total} images have alt text.`,
    fix: "Describe images with alt text. Multimodal assistants and text-only crawlers both rely on it.",
  },
  productData: {
    title: "Product data for AI shopping agents",
    notApplicable: "Not a product page, so no product data is needed.",
    missing: "This looks like a product page, but it has no Product JSON-LD.",
    complete: "Product JSON-LD includes name, image, price, availability, brand and ratings.",
    partial: ({ missing }) => `Product JSON-LD is missing: ${missing}.`,
    fields: { name: "name", image: "image", price: "price + currency", availability: "availability", brand: "brand", rating: "ratings/reviews" },
    fix: "Give every product page complete Product JSON-LD (offers with price, currency and availability, brand, ratings). ChatGPT, Google AI Mode and shopping agents compare products from this data.",
  },
  markdownAccess: {
    title: "Markdown version for AI agents",
    detail: ({ full, alternate }) => full || alternate
      ? `Found ${[full && "/llms-full.txt", alternate && "a Markdown alternate link"].filter(Boolean).join(" and ")}.`
      : "No /llms-full.txt and no Markdown alternate versions of pages.",
    fix: "Publish /llms-full.txt with your key content as Markdown, or link Markdown versions of pages with <link rel=\"alternate\" type=\"text/markdown\">. Agents read Markdown faster and more cheaply than HTML.",
  },
};

const tr: CheckMessages = {
  aiSearch: {
    title: "Yapay zekâ arama ve asistan botları sitenize erişebiliyor",
    ok: ({ n }) => `${n} yapay zekâ arama ve kullanıcı botunun tamamına robots.txt izin veriyor.`,
    blocked: ({ bots }) => `Engellenenler: ${bots}. Bu botlar kullanıcılara anlık cevap vermek için sayfaları okur.`,
    fix: "robots.txt dosyasında bu botlar için yazılmış Disallow kurallarını kaldırın. Engellerseniz bu asistanların cevaplarında hiç görünmezsiniz.",
  },
  aiTraining: {
    title: "Yapay zekâ eğitim botları",
    ok: "Eğitim botlarına izin var, yani modeller markanızı öğrenebilir.",
    blocked: ({ bots }) => `Engellenenler: ${bots}. Bu geçerli bir ticari tercih olabilir, ama gelecekteki modeller sizi daha az tanır.`,
    fix: "Marka bilinirliği içerik lisansından daha önemliyse bu botlara izin verin.",
  },
  llms: {
    title: "Yapay zekâ ajanları için llms.txt rehberi",
    missing: "/llms.txt bulunamadı.",
    found: ({ noTitle, noLinks }) => `/llms.txt bulundu${noTitle ? ", ama H1 başlığı yok" : ""}${noLinks ? ", önemli sayfalara link yok" : ""}.`,
    fix: "/llms.txt yayınlayın: kim olduğunuzu anlatan ve en önemli sayfalarınıza link veren kısa bir Markdown özeti. Quovra sizin için hazırlıyor.",
  },
  sitemap: {
    title: "XML site haritası",
    ok: "Site haritası bulundu.",
    missing: "/sitemap.xml adresinde ya da robots.txt içinde site haritası yok.",
    fix: "/sitemap.xml yayınlayın ve robots.txt içine bir Sitemap: satırı ekleyin.",
  },
  indexable: {
    title: "Sayfa dizinlenebilir",
    status: ({ status }) => `Sayfa HTTP ${status} döndürdü.`,
    noindex: "Sayfa noindex olarak işaretlenmiş.",
    ok: ({ status }) => `HTTP ${status}, noindex yok.`,
    fix: "Sayfayı HTTP 200 ile sunun ve robots meta etiketinden / X-Robots-Tag başlığından noindex'i kaldırın.",
  },
  structured: {
    title: "Yapısal veri (Schema.org JSON-LD)",
    none: "JSON-LD bulunamadı.",
    found: ({ types }) => `Bulunan türler: ${types}.`,
    fix: "Organization (sameAs linkleriyle) ve sayfa türü (Article, Product, FAQPage…) için JSON-LD ekleyin. Yapay zekâ kim olduğunuzu bununla anlar.",
  },
  questions: {
    title: "Gerçek soruları cevaplıyor (SSS)",
    detail: ({ n, faq }) => `${n} soru biçiminde başlık${faq ? " ve FAQPage işaretlemesi var" : ", FAQPage işaretlemesi yok"}.`,
    fix: "Müşterilerin asistanlara sorduğu soruları cevaplayan kısa bir SSS bölümü ekleyin ve FAQPage ile işaretleyin.",
  },
  headings: {
    title: "Düzgün başlık hiyerarşisi",
    detail: ({ h1, h2 }) => `${h1} H1, ${h2} H2 başlık.`,
    fix: "Konuyu söyleyen tek bir H1 ve her biri bir alt soruyu cevaplayan H2 bölümleri kullanın. Dil modelleri sayfaları başlıklara göre böler.",
  },
  meta: {
    title: "Başlık ve meta açıklama",
    detail: ({ title, desc }) => `Başlık: ${title === null ? "yok" : `${title} karakter`}. Açıklama: ${desc === null ? "yok" : `${desc} karakter`}.`,
    fix: "15–65 karakterlik bir başlık ve ne sunduğunuzu, kime sunduğunuzu açıkça söyleyen 50–170 karakterlik bir açıklama yazın.",
  },
  og: {
    title: "Open Graph etiketleri",
    detail: ({ n }) => `3 temel Open Graph etiketinden ${n} tanesi var.`,
    fix: "Sohbet asistanlarındaki link önizlemeleri düzgün görünsün diye og:title, og:description ve og:image ekleyin.",
  },
  canonical: {
    title: "Canonical URL ve dil",
    detail: ({ canonical, lang }) => `Canonical: ${canonical ? "var" : "yok"}. lang özniteliği: ${lang ?? "yok"}.`,
    fix: '<link rel="canonical"> ve <html lang="…"> ekleyin ki motorlar içeriğinizi doğru kaynağa ve dile bağlasın.',
  },
  rendered: {
    title: "İçerik JavaScript olmadan görünüyor",
    detail: ({ words }) => `Ham HTML'de ${words} kelime var.`,
    fix: "Yapay zekâ botlarının çoğu JavaScript çalıştırmaz. Ana içeriği sunucu tarafında oluşturun (SSR/SSG).",
  },
  formatting: {
    title: "Alıntılanabilir biçim (liste, tablo)",
    detail: ({ lists, tables }) => `${lists} liste öğesi, ${tables} tablo.`,
    fix: "Önemli bilgileri, karşılaştırmaları ve adımları liste ve tablo olarak verin. Dil modellerinin en kolay alıntıladığı birimler bunlar.",
  },
  freshness: {
    title: "Güncellik sinyalleri",
    found: ({ date }) => `Bulunan en yeni tarih: ${date}.`,
    none: "Makinenin okuyabileceği bir yayın/güncelleme tarihi yok.",
    fix: "JSON-LD'de dateModified (ya da article:modified_time) verin ve önemli sayfaları güncel tutun. Asistanlar yeni kaynakları tercih eder.",
  },
  evidence: {
    title: "İstatistik ve kaynak gösterme",
    detail: ({ stats, links }) => `${stats} istatistik, ${links} dış link.`,
    fix: "İddialarınızı somut rakamlarla destekleyin ve kaynağa link verin. GEO araştırmasına göre istatistik ve kaynak eklemek görünürlüğü %40'a kadar artırıyor.",
  },
  authorship: {
    title: "Yazar ve kurum kimliği",
    detail: ({ n }) => `${n} kimlik sinyali (author meta, Person, Organization).`,
    fix: "Sayfada ve JSON-LD'de yazarı ya da kurumu belirtin. Hangi kaynağın alıntılanacağına E-E-A-T sinyalleri karar verir.",
  },
  aboutContact: {
    title: "Hakkımızda ve iletişim sayfaları bağlantılı",
    detail: ({ about, contact }) => `Hakkımızda: ${about ? "var" : "bulunamadı"}. İletişim: ${contact ? "var" : "bulunamadı"}.`,
    fix: "Her sayfadan Hakkımızda ve İletişim sayfalarına link verin ki motorlar gerçek bir işletme olduğunuzu doğrulayabilsin.",
  },
  https: { title: "HTTPS", ok: "HTTPS ile sunuluyor.", bad: "Şifresiz HTTP ile sunuluyor.", fix: "Tüm sayfaları HTTPS ile sunun." },
  speed: {
    title: "Sunucu yanıt süresi",
    detail: ({ ms }) => `HTML ${ms} ms'de geldi.`,
    fix: "Yapay zekâ botları kısa zaman aşımları kullanır. HTML'i CDN'de önbelleğe alın, bir saniyenin altını hedefleyin.",
  },
  alt: {
    title: "Görsel alt metinleri",
    none: "Sayfada görsel yok.",
    detail: ({ withAlt, total }) => `${total} görselden ${withAlt} tanesinde alt metin var.`,
    fix: "Görselleri alt metinle tarif edin. Hem çok modlu asistanlar hem metin tabanlı botlar buna dayanır.",
  },
  productData: {
    title: "Yapay zekâ alışveriş ajanları için ürün verisi",
    notApplicable: "Ürün sayfası değil, ürün verisi gerekmiyor.",
    missing: "Bu bir ürün sayfasına benziyor ama Product JSON-LD yok.",
    complete: "Product JSON-LD'de ad, görsel, fiyat, stok durumu, marka ve puanlar var.",
    partial: ({ missing }) => `Product JSON-LD'de eksik olanlar: ${missing}.`,
    fields: { name: "ad", image: "görsel", price: "fiyat + para birimi", availability: "stok durumu", brand: "marka", rating: "puan/yorum" },
    fix: "Her ürün sayfasına eksiksiz Product JSON-LD ekleyin (fiyat, para birimi ve stok durumu içeren offers, marka, puanlar). ChatGPT, Google AI Mode ve alışveriş ajanları ürünleri bu veriyle karşılaştırır.",
  },
  markdownAccess: {
    title: "Yapay zekâ ajanları için Markdown sürümü",
    detail: ({ full, alternate }) => full || alternate
      ? `Bulundu: ${[full && "/llms-full.txt", alternate && "Markdown alternatif linki"].filter(Boolean).join(" ve ")}.`
      : "/llms-full.txt yok, sayfaların Markdown sürümü de yok.",
    fix: "Önemli içeriğinizi Markdown olarak /llms-full.txt adresinde yayınlayın ya da sayfaların Markdown sürümlerine <link rel=\"alternate\" type=\"text/markdown\"> ile link verin. Ajanlar Markdown'ı HTML'den çok daha hızlı ve ucuz okur.",
  },
};

export const CHECK_MESSAGES: Record<Lang, CheckMessages> = { en, tr };
