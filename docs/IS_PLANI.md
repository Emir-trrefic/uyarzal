# Quovra — İş Planı ve Pazar Araştırması

> **Güncel strateji, rakip analizi, paketler ve eylem planı için: [STRATEJI.md](STRATEJI.md).** Bu belge ilk araştırmayı içerir; fiyatlar STRATEJI.md'de güncellendi.

*Hazırlanma: Ekim 2026*

## 1. Neden bu proje?

İnsanlar ürün ve hizmet ararken giderek Google'daki 10 mavi link yerine **ChatGPT, Claude, Perplexity ve Google AI Overviews** gibi yapay zekâ asistanlarına soruyor. Asistan tek bir cevap veriyor ve içinde 2-3 marka öneriyor. O cevapta adı geçmeyen işletme müşteriyi hiç görmeden kaybediyor.

Bu yeni disipline **GEO (Generative Engine Optimization)** deniyor. SEO'nun 2000'lerde olduğu yerde duruyor: talep hızla büyüyor, araçlar ise henüz olgunlaşmadı.

### Araştırmadan çıkan veriler

| Gösterge | Değer | Kaynak |
|---|---|---|
| GEO pazar büyüklüğü (2026) | ~1–2,7 milyar $ (tanıma göre değişiyor) | superlines.io, GIIKOREA raporu |
| Yıllık büyüme (CAGR) | Tahminler %35–48 aralığında toplanıyor | MarketsandMarkets, Intel Market Research |
| 2034 projeksiyonu | 17–22 milyar $ | superlines.io, Intel Market Research |
| Yapay zekâ kaynaklı trafik artışı | 2025 ilk yarısında yıllık +%527 | MarketsandMarkets |
| AI Overviews görünen Google aramaları | %25–40 | MarketsandMarkets |
| AI'da alıntılanıp alıntılanmadığını takip eden pazarlamacı | ~%14 | quickseo.ai derlemesi |
| İstatistik ve kaynak eklemenin görünürlüğe etkisi | %40'a varan artış | Princeton GEO makalesi (KDD 2024) |

> Not: Pazar rakamlarının çoğu tedarikçi ve araştırma şirketi tahminleridir. Kesin değerler değil, **yön göstergesi** olarak okunmalı. Ortak nokta şu: hepsi yıllık %35'in üzerinde büyüme öngörüyor.

Ayrıca incelenen diğer trendler: KOBİ'ler için yapay zekâ ajanları (2026'da ~10,9 milyar $ pazar, %46 CAGR) ve AB Yapay Zekâ Yasası uyum araçları. GEO şu üç nedenle seçildi:

1. **Ölçüm boşluğu çok büyük.** Pazarlamacıların küçük bir kısmı ölçüm yapıyor. İlk değeri bedava denetim veriyor.
2. **Tek kişiyle kurulabilir.** Pahalı veri ya da sözleşme gerekmiyor. Denetim motoru tamamen bizim kodumuz.
3. **Küresel.** Her web sitesi potansiyel müşteri. Türkiye'den dolar bazlı gelir elde edilebilir.

## 2. Ürün

| Katman | İçerik | Durum |
|---|---|---|
| **Ücretsiz denetim** | 20 kontrol, puan, hazır düzeltme dosyaları, CLI | ✅ Hazır |
| **AI Mention Probe** | Alıcı sorularını yapay zekâya sorup markanın önerilip önerilmediğini ölçer | ✅ Hazır (API anahtarıyla) |
| **Pro izleme** | Haftalık takip, puan düşünce e-posta, share-of-voice trendi | 🔜 Yol haritası |
| **Ajans** | 10 site, beyaz etiketli PDF rapor, API | 🔜 Yol haritası |

## 3. Gelir modeli (Freemium SaaS)

| Plan | Fiyat | Hedef kitle |
|---|---|---|
| Free | 0 $ | Herkes. Kullanıcı kazanma (lead) aracı |
| Pro | 29 $/ay | KOBİ, SaaS, e-ticaret |
| Agency | 99 $/ay | SEO/dijital ajanslar |

**Örnek gelir senaryosu (muhafazakâr):**

| Ay | Ücretsiz denetim | Ücretliye dönüşüm | Pro | Agency | Aylık gelir (MRR) |
|---|---|---|---|---|---|
| 3 | 3.000 | %1 | 25 | 5 | ~1.220 $ |
| 6 | 10.000 | %1,5 | 120 | 30 | ~6.450 $ |
| 12 | 30.000 | %2 | 480 | 120 | ~25.800 $ |

Probe maliyeti: soru başına birkaç sent. Pro planda 25 soru/hafta ile kullanıcı başına aylık maliyet birkaç dolar seviyesinde kalır, brüt marj %80'in üzerinde hedeflenir. (Kesin maliyeti seçilen modele göre ölçün; daha ucuz model `QUOVRA_PROBE_MODEL` ile ayarlanabilir.)

**Ek gelir kanalları:**
- Danışmanlık ve "biz düzeltelim" hizmeti (tek seferlik 300–1.500 $)
- Ticari lisans (AGPL dışında kullanmak isteyen şirketler)
- WordPress ve Shopify eklentileri (marketplace satışı)

## 4. Pazara giriş (Go-to-market)

1. **Ürün içi büyüme:** Ücretsiz denetim viral kanca görevi görür. "Siteniz AI'da görünür mü?" sorusu merak uyandırır.
2. **Açık kaynak:** GitHub yıldızları, Hacker News "Show HN", Product Hunt lansmanı.
3. **İçerik:** "X sektöründe AI görünürlük raporu" serisi (ör. Türkiye'nin en büyük 100 e-ticaret sitesini tarayıp yayınlamak). Basın ilgisi çeker.
4. **Ajans ortaklığı:** SEO ajanslarına beyaz etiket. Her ajans 10+ müşteri getirir.
5. **CI entegrasyonu:** `--min-score` ile deploy hattında kontrol, geliştiricilere ulaşmanın yolu.

## 5. Rekabet

Profound, Otterly.ai, Peec AI, Semrush AI Toolkit gibi oyuncular var. Bunlar çoğunlukla **pahalı (aylık 99–500 $+) ve sadece izleme odaklı**. Quovra'nın farkı:

- **Ücretsiz ve açık kaynak denetim:** şeffaf puanlama, kara kutu yok
- **Sadece ölçmüyor, düzeltiyor:** hazır kod üretiyor
- **KOBİ fiyatı:** 29 $

## 6. Sonraki adımlar (öncelik sırasıyla)

1. Vercel'e deploy et ve bir alan adı al (ör. quovra.app, quovra.io)
2. Stripe ödeme ve kullanıcı hesapları (Supabase/Clerk)
3. Haftalık izleme için cron ve e-posta (Resend)
4. Product Hunt ve Show HN lansmanı
5. Türkiye'nin ilk 100 e-ticaret sitesi için "AI Görünürlük Raporu" yayınla

## Kaynaklar

- [MarketsandMarkets — GEO Market](https://www.marketsandmarkets.com/Market-Reports/generative-engine-optimization-geo-market-265868816.html)
- [Superlines — GEO market size statistics](https://www.superlines.io/articles/geo-market-size-statistics)
- [GIIKOREA — GEO platform market](https://www.giikorea.co.kr/report/coh2126752-generative-engine-optimization-platform-market-by.html)
- [QuickSEO — GEO statistics 2026](https://quickseo.ai/blog/geo-statistics-2026-60-data-points-generative-engine-optimization-market)
- [Superframeworks — Top AI SaaS niches 2026](https://superframeworks.com/articles/top-ai-saas-niches-2026)
- [ACT — AI Omnibus and SMEs](https://actonline.org/2026/08/06/what-european-startups-and-smes-should-know-as-the-ai-omnibus-enters-into-force/)
- Aggarwal et al., "GEO: Generative Engine Optimization", KDD 2024
