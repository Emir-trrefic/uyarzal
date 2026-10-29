# Quovra — Strateji, Rekabet ve Eylem Planı

*Ekim 2026 · Pazar araştırmasına dayanır. Kaynaklar en altta.*

> **Özet:** Yapay zekâ görünürlüğü (GEO) gerçek ve hızla büyüyen bir pazar. Ama **kalabalık**: küresel bir "unicorn" (Profound), onlarca izleme aracı ve Türkiye'de en az beş yerli oyuncu var. Bu yüzden "ilk biz" diye satamayız. Quovra'nın yerini üç farka dayandırıyoruz: **(1) doğru ölçüm** (tekrar + güven aralığı), **(2) sadece izleme değil düzeltme**, **(3) yerel pazar ve geleceğe hazırlık** (Türkçe, TL fiyat, yerel e-ticaret entegrasyonları, ajan hazırlığı).

---

## 1. Pazar: nereye gidiyor?

| Trend | Ne oluyor | Quovra için anlamı |
|---|---|---|
| **AI ile yerel arama** | Tüketicilerin %45'i yerel öneri için AI kullanıyor (bir yıl önce %6). ChatGPT yerel işletmelerin sadece ~%1,2'sini öneriyor. | Klinik, restoran ve otel gibi KOBİ'ler için **büyük ve boş bir alan** |
| **Ajanla alışveriş** | OpenAI+Stripe (ACP), Google+Shopify (UCP), Google AP2 protokolleri. Keşif canlı, ajanın kendisinin ödeme yapması sınırlı. ChatGPT, Mart 2026'da uygulama içi ödemeyi bıraktı. | Ürün verisinin ajanlara hazır olması kritik. **Ajan hazırlığı skoru** |
| **ChatGPT reklamları** | Şubat 2026'da ABD'de başladı, cevabın altında "sponsorlu" etiketiyle | Organik öneriyi reklamdan **ayrı ölçme** ihtiyacı doğuyor |
| **AI botları analitikte görünmüyor** | Google Analytics AI botlarını göremiyor; ölçüm sunucu loglarından yapılıyor | **AI bot trafik analitiği** ayrı bir ürün kalemi |
| **Ajan standartları** | MCP hızla büyüyor; NLWeb (Microsoft) ve WebMCP (Google) erken aşamada | Şimdilik izle; standart netleşince "ajan uç noktası" üretici |
| **Yatırım ilgisi** | Profound, Eylül 2026'da 1,8 milyar $ değerlemeyle 180 milyon $ topladı; sektöre toplam ~472 milyon $ yatırım | Kategori kanıtlandı. Alıcılar bu harcamayı bütçelemeye başladı |

## 2. Rakipler

### Küresel
| Oyuncu | Konum | Başlangıç fiyatı (yaklaşık) |
|---|---|---|
| Profound | Kurumsal lider, 1,8 milyar $ değerleme | 99–399 $+/ay, çoğunlukla kurumsal |
| Peec AI | Orta segment, Avrupa | ~89–95 €/$ (25–50 soru) |
| Otterly.AI | Ucuz giriş | 29 $ (15 soru) → 489 $ |
| AthenaHQ | Kredi bazlı, çok motorlu | ~295 $/ay |
| Scrunch | Orta-üst | ~250–300 $/ay |
| Semrush, Ahrefs, SE Ranking | SEO paketine eklenti | Mevcut aboneliğe ek |
| Shopify GEO uygulamaları (onlarca) | Mağaza içi, dar kapsam | 19–79 $/ay |

### Türkiye
| Oyuncu | Ne yapıyor |
|---|---|
| **Visby AI** (Magnetic Teknoloji) | LLM görünürlük ölçümü; otomotiv sektörü görünürlük endeksi yayınladı |
| **AIWATCH** | "Kanıt odaklı": gerçek cevaplar, GEO endeksi, rakip ve halüsinasyon kanıtı; ücretsiz site taraması |
| **Magna Dijital** | AI Analyzer + GEO Auditor |
| **Sheltron** | Ücretsiz araçlar + ücretli GEO Builder |
| **Geoptie**, ajanslar (DPE Dijital vb.) | Araç ve hizmet |

**Sonuç: Tek oyuncu olmayacağız.** Hem küresel hem yerel rekabet var. Fiyatları tam doğrulanamadı (çoğu "bize ulaşın" modelinde).

## 3. Rakiplerin zayıf noktaları (sektör eleştirileri)

1. **Gürültülü ölçüm:** Aynı soruya verilen cevaplar sadece rastlantıyla %10–34 değişiyor; ChatGPT'de aynı soru 3 kez sorulduğunda atıfların sadece %2,2'si sabit kalıyor. Ama araçların çoğu **tek ölçüm** raporluyor, **güven aralığı vermiyor**. Haftalık "artış" çoğu zaman gürültü.
2. **Soru seti yanlılığı:** Varsayılan sorular markanın kendi anahtar kelimelerinden üretiliyor ve skoru şişiriyor.
3. **Sadece izleme:** Araçların çoğu ölçüyor ama düzeltmiyor.
4. **Kara kutu puan:** Puanın neden o çıktığı açıklanmıyor.
5. **Yerel pazar:** Küresel araçlarda Türkçe arayüz, TL fiyat ve yerel platform entegrasyonu yok.

## 4. Quovra nasıl sıyrılır?

| # | Fark | Somut karşılığı | Durum |
|---|---|---|---|
| 1 | **Doğru ölçüm** | Her soru 3+ kez sorulur, %95 Wilson güven aralığı gösterilir | ✅ Yapıldı |
| 2 | **Ölç + düzelt** | 22 kontrol, hazır llms.txt / JSON-LD / robots.txt | ✅ Yapıldı |
| 3 | **Şeffaflık** | Açık kaynak motor; /yontem sayfası tüm ağırlıkları koddan otomatik listeler | ✅ Yapıldı |
| 4 | **Ajan hazırlığı** | Ürün verisi (fiyat, stok, marka, puan) ve Markdown erişimi kontrolü | ✅ Yapıldı |
| 5 | **Türkiye'ye özel** | Türkçe arayüz ve rapor, TL fiyat, Türkçe karakter eşleştirme | ✅ Yapıldı (entegrasyonlar yolda) |
| 6 | **Tek tık düzeltme** | WordPress eklentisi + Shopify, **ikas, Ticimax, IdeaSoft** uygulamaları | 🔜 Faz 3 |
| 7 | **Sektör endeksleri** | "Türkiye Diş Klinikleri AI Görünürlük Endeksi" gibi yayınlar (PR ve müşteri kazanımı) | 🔜 Faz 2 |
| 8 | **Yerel işletme modu** | Konum bazlı sorular, yorum ve profil sinyalleri | 🔜 Faz 3 |

**Konumlandırma cümlesi:** *"Yapay zekâ görünürlüğünü doğru ölçen ve düzelten tek Türk aracı: ölç, düzelt, kanıtla."*

## 5. Paketler ve kapasiteler (karar)

| | Ücretsiz | Başlangıç | **Büyüme** | Ajans | Kurumsal |
|---|---|---|---|---|---|
| Aylık (TR) | ₺0 | ₺790 | **₺1.990** | ₺5.990 | Özel |
| Yıllık (aylık karşılığı) | – | ₺660 | ₺1.660 | ₺4.990 | Özel |
| Global (aylık / yıllık) | $0 | $24 / $20 | $59 / $49 | $179 / $149 | Özel |
| Takip edilen site | – | 1 | 3 | 20 | ∞ |
| Haftalık takip edilen sayfa | – | 50 | 300 | 2.000 | ∞ |
| Müşteri sorusu | 3 (demo) | 30 | 100 | 500 | ∞ |
| Yapay zekâ motoru | 1 | 2 | 4 | 6 | 6 |
| Tekrar + güven aralığı | – | 3× | 3× | 3× | 5× |
| Rakip takibi | – | 3 | 10 | site başına 25 | ∞ |
| AI bot analitiği | – | – | ✓ | ✓ | ✓ |
| Entegrasyonlar | – | – | ✓ | ✓ | ✓ |
| Beyaz etiket + müşteri paneli | – | – | – | ✓ | ✓ |
| API | – | – | – | ✓ | ✓ |
| Kullanıcı | 1 | 1 | 3 | 10 | ∞ |

**Ek hizmet:** Anahtar teslim kurulum ₺4.900'den başlayan fiyatla ($149+), tek seferlik.

### Neden bu fiyatlar?
- **Başlangıç ₺790 ($24):** Otterly'nin 29 $'lık girişinin (15 soru) altında, 2 kat soru (30) ile. Türkiye'de KOBİ'nin "deneyebileceği" eşik.
- **Büyüme ₺1.990 ($59):** Peec AI'ın giriş planına (~95 $, 50 soru) karşı 2 kat soru ve 4 motor, daha düşük fiyat. Hedef ana gelir paketi.
- **Ajans ₺5.990 ($179):** Ajans 10+ müşteriye 1.000–3.000 ₺'ye GEO raporu satarak paketi kolayca amorti eder.
- **Yıllık plan = 2 ay bedava:** Nakit akışı ve müşteriyi elde tutma.

### Birim maliyet (tahmin; canlı kullanımda ölçülmeli)
Aylık cevap sayısı = soru × motor × tekrar × 4,3 hafta.

| Paket | Aylık cevap | Ucuz/orta modellerle cevap başına ~$0,003 | Gelir | Brüt marj |
|---|---|---|---|---|
| Başlangıç | 30×2×3×4,3 ≈ 774 | ~$2,3 | $24 | ~%90 |
| Büyüme | 100×4×3×4,3 ≈ 5.160 | ~$15 | $59 | ~%75 |
| Ajans | 500×6×3×4,3 ≈ 38.700 | ~$116 | $179 | ~%35 ⚠️ |

⚠️ **Ajans paketinde marj düşük.** Önlemler: ajans için motor başına soru kotası, en pahalı modelleri sadece seçili sorularda kullanmak, ya da fiyatı ₺7.990 / $229'a çekmek. İlk 10 ajans müşterisinden sonra gerçek maliyetle yeniden karar verilmeli.

## 6. Eylem planı

### ✅ Faz 0: Temel (bu oturumda yapıldı)
- Pazar ve rakip araştırması, konumlandırma, paket kararları
- Profesyonel yeni site: hero + örnek rapor, karşılaştırma tablosu, kullanım senaryoları, geleceğe hazır bölümü, aylık/yıllık fiyat, paket karşılaştırma tablosu, kurulum hizmeti, SSS, Yöntem sayfası (TR/EN)
- Motor: "Ajan hazırlığı" kategorisi (ürün verisi, Markdown erişimi), 22 kontrol
- Probe: tekrarlı ölçüm + %95 Wilson güven aralığı + en çok önerilen rakipler
- Bekleme listesi formları (paket bazlı)

### Faz 1: Yayına çık ve talebi ölç (0–4 hafta)
| İş | Sorumlu | Gerekli |
|---|---|---|
| Vercel'e deploy + alan adı (quovra.com / .app / .com.tr) | Siz | Alan adı ücreti |
| `LEAD_WEBHOOK_URL` ile bekleme listesini Google Sheets'e bağla | Siz + ben | Zapier/Make veya Apps Script |
| TÜRKPATENT marka ön araştırması | Siz | – |
| 30 ajans / KOBİ'ye ücretsiz rapor gönder, fiyatı test et | Siz | Bekleme listesi |
| Product Hunt + LinkedIn lansmanı | Siz | – |
| **Hedef:** 100 denetim/gün, 50 bekleme listesi kaydı | | |

### Faz 2: Ödeme alan ürün (1–3 ay)
| İş | Gerekli servis |
|---|---|
| Kullanıcı hesapları + veritabanı (site, soru, ölçüm geçmişi) | Supabase |
| Ödeme: **iyzico** (TR kartları) + **Paddle/Lemon Squeezy** (yurt dışı). Stripe Türkiye'deki şirketlere doğrudan açık değil; güncel durumu kontrol edin. | iyzico, Paddle |
| Haftalık otomatik ölçüm, puan geçmişi grafiği | Vercel Cron |
| ChatGPT (OpenAI) ve Gemini motorları (ProbeEngine arayüzü hazır) | OpenAI, Google AI API anahtarları |
| E-posta raporu ve uyarılar | Resend |
| İlk sektör endeksi: "Türkiye Diş Klinikleri AI Görünürlük Endeksi" | – |
| **Hedef:** 20 ödeme yapan müşteri, ~₺40.000 MRR | |

### Faz 3: Farkı derinleştir (3–6 ay)
- WordPress eklentisi; Shopify, **ikas, Ticimax** uygulamaları (tek tık llms.txt, JSON-LD, SSS)
- AI bot trafik analitiği (log yükleme + Cloudflare/Vercel log entegrasyonu)
- Ajans: beyaz etiket PDF, müşteri paneli, API anahtarları
- Yerel işletme modu (konumlu sorular, yorum/profil sinyalleri)
- Perplexity, Copilot, AI Overviews motorları
- **Hedef:** 100 müşteri, ~₺200.000 MRR

### Faz 4: Gelecek (6–12 ay)
- Ajanla alışveriş: ürün feed doğrulayıcı (ChatGPT merchant feed, Google Merchant Center)
- ChatGPT reklamlarının organik önerilerden ayrı izlenmesi
- MCP / NLWeb / WebMCP standartları netleşince "ajan uç noktası" üretici
- Avrupa ve Körfez pazarına İngilizce + Arapça açılış
- Yatırım: sektör endeksleri + MRR ile tohum turu

## 7. Riskler

| Risk | Önlem |
|---|---|
| Büyük SEO araçları (Semrush, Ahrefs) bu özelliği bedavaya ekler | Yerel pazar, düzeltme ve entegrasyonlarla farklılaş; ajans kanalına yaslan |
| API cevapları tüketici uygulamasından farklı | Yöntem sayfasında açıkça belirt; web aramalı modları kullan; ileride panel ölçümleri |
| AI maliyeti artar | Motor başına kota, ucuz modellerle ön eleme, fiyat güncelleme maddesi |
| Yerli rakip hızlanır | Açık kaynak + topluluk + ajans ortaklıkları; ilk 6 ayda 3 platform entegrasyonu |

---

## Kaynaklar

- [Otterly — GEO tool pricing 2026](https://otterly.ai/alternatives/pricing/)
- [Surmado — Best AI visibility tools 2026](https://www.surmado.com/blog/best-ai-visibility-tools-2026)
- [Loamly — AI search visibility tools buyer's guide](https://www.loamly.ai/blog/comparison-ai-search-visibility-tools-2026-buyers-guide)
- [Canlah — AI visibility tool pricing 2026](https://canlah.ai/blog/ai-visibility-tool-pricing-2026/)
- [AI Search Tools — Platform pricing compared](https://ai-search-tools.com/guides/ai-visibility-platform-pricing-compared-in-2026-promptwatch-vs-peec-ai-vs-profound-vs-otterly-ai-vs-athenahq-vs-scrunch-what-you-actually-get-per-dollar)
- [Dealroom — GEO startups](https://dealroom.co/charts/generative-engine-optimization-startups)
- [36Kr — Profound Series D](https://eu.36kr.com/en/p/3991669077441285)
- [Mind — Profound Series C](https://www.mind.eu.com/retail/en/article/profound-raises-us96-million-in-series-c-funding-becoming-a-first-geo-unicorn/)
- [Webrazzi — Visby AI](https://webrazzi.com/2026/02/16/yerli-yapay-zeka-gorunurluk-platformu-visby-ai/)
- [AIWATCH](https://aiwatch.com.tr/) · [Magna Dijital](https://www.magnadijital.com.tr/ai-gorunurluk-araclari) · [Sheltron](https://sheltron.com.tr/araclar/) · [Geoptie](https://geoptie.com/)
- [Growth Memo — Prompt tracking variance](https://www.growth-memo.com/p/how-to-make-prompt-tracking-much)
- [Arcalea — Why AI visibility reports are wrong](https://arcalea.com/blog/why-your-ai-visibility-reports-are-probably-wrong-how-to-fix-them)
- [Contently — Best LLM visibility tools 2026](https://contently.com/2026/03/18/best-llm-visibility-tools-2026/)
- [Local Falcon — 83% of restaurants don't exist in ChatGPT](https://www.localfalcon.com/research/the-ai-visibility-crisis-why-83-percent-of-restaurants-dont-exist-in-chatgpt)
- [LocalIQ — AI search visibility](https://localiq.co.uk/blog/ai-search-visibility-chatgpt-gemini-perplexity)
- [Insites — AI whitepaper](https://www.insites.com/ai-whitepaper)
- [Opascope — Agentic commerce protocols](https://opascope.com/insights/ai-shopping-assistant-guide-2026-agentic-commerce-protocols/)
- [Rye — Agentic commerce landscape](https://rye.com/blog/agentic-commerce-startups)
- [Alhena — ChatGPT shopping product feed](https://alhena.ai/blog/chatgpt-shopping-product-feed-guide/)
- [Segwise — ChatGPT Ads 2026](https://segwise.ai/blog/chatgpt-ads-2026-guide.md)
- [Jasper — AI crawler traffic audit](https://jasper.ai/blog/how-to-audit-and-analyze-ai-crawler-traffic)
- [Search Engine Journal — MCP, A2A, NLWeb](https://searchenginejournal.com/mcp-a2a-nlweb-and-agents-md-the-standards-powering-the-agentic-web/570092/)

> Not: Rakamların çoğu tedarikçi blogları ve ikincil kaynaklardan geliyor; yön göstergesi olarak okuyun. Rakip fiyatlarını karar vermeden önce kendi sayfalarından doğrulayın.
