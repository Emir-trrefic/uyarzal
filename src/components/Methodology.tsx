import { runChecks } from "@/lib/audit/checks";
import { load } from "@/lib/audit/extract";
import { analyzeBots, AI_BOTS } from "@/lib/audit/robots";
import type { Category } from "@/lib/audit/types";
import type { Lang } from "@/lib/i18n";
import { UI } from "@/lib/i18n/ui";
import { SiteFooter } from "./SiteFooter";
import { SiteNav } from "./SiteNav";

const COPY = {
  en: {
    kicker: "Methodology",
    title: "How Quovra measures AI visibility",
    lead: "Every score Quovra shows can be traced back to a check in our open-source code. This page lists what we check, how much each check weighs, and how we measure AI answers without fooling ourselves.",
    auditTitle: "1. The site audit",
    auditBody: "We fetch your page the way AI crawlers do: as plain HTML, without running JavaScript, with a short timeout. We also read robots.txt, llms.txt, llms-full.txt and your sitemap. The checks below add up to 100 points.",
    points: "points",
    grades: "Grades: A ≥ 85, B ≥ 70, C ≥ 55, D ≥ 40, F below 40. In a multi-page scan, site-level checks (robots.txt, llms.txt, sitemap) are scored once and page-level checks are scored for every page.",
    botsTitle: "2. AI crawler access",
    botsBody: (n: number) => `We evaluate robots.txt for ${n} AI user agents following RFC 9309: the most specific user-agent group applies, then the longest matching rule, with Allow winning ties. Search and user-fetch agents (which put you into live answers) weigh 15 points; training crawlers weigh 2, because blocking them can be a legitimate licensing choice.`,
    probeTitle: "3. Measuring AI answers",
    probeBody: [
      "AI answers are not deterministic. Industry research in 2026 found 10–34% variance between identical prompts from sampling alone, and most citations change between runs. A single answer is an anecdote, not a measurement.",
      "So Quovra asks every buyer question several times (3 by default) and reports share of voice as mentions ÷ answers, together with a 95% Wilson confidence interval. The Wilson interval stays accurate for small samples and for rates close to 0% or 100%, which is exactly where brand mentions live.",
      "We count a mention when your brand name or domain appears in the answer (ignoring case, accents and Turkish dotless ı). Each answer also lists the names it recommended, best first, which gives us your rank and the competitors named instead.",
    ],
    limitsTitle: "4. Limitations we are upfront about",
    limits: [
      "We query engines through their official APIs. API answers can differ from the consumer apps (personalisation, location, logged-in context).",
      "A confidence interval is only as good as the questions. Choose questions your buyers really ask, not ones you already win.",
      "Checks measure signals that make citation more likely; no tool can guarantee that an AI will recommend you.",
    ],
    privacyTitle: "5. Privacy",
    privacy: "Free audits are processed in memory and are not stored. We only fetch public pages, identify ourselves as QuovraBot, and refuse private-network addresses.",
  },
  tr: {
    kicker: "Yöntem",
    title: "Quovra yapay zekâ görünürlüğünü nasıl ölçer?",
    lead: "Quovra'nın gösterdiği her puan, açık kaynak kodumuzdaki bir kontrole kadar izlenebilir. Bu sayfada neyi kontrol ettiğimizi, her kontrolün ağırlığını ve yapay zekâ cevaplarını kendimizi kandırmadan nasıl ölçtüğümüzü anlatıyoruz.",
    auditTitle: "1. Site denetimi",
    auditBody: "Sayfanızı yapay zekâ botlarının okuduğu gibi okuyoruz: düz HTML olarak, JavaScript çalıştırmadan, kısa bir zaman aşımıyla. robots.txt, llms.txt, llms-full.txt ve site haritanızı da okuyoruz. Aşağıdaki kontrollerin toplamı 100 puandır.",
    points: "puan",
    grades: "Notlar: A ≥ 85, B ≥ 70, C ≥ 55, D ≥ 40, F 40'ın altı. Çok sayfalı taramada site düzeyindeki kontroller (robots.txt, llms.txt, site haritası) bir kez, sayfa düzeyindeki kontroller her sayfa için ayrı puanlanır.",
    botsTitle: "2. Yapay zekâ botu erişimi",
    botsBody: (n: number) => `robots.txt dosyasını ${n} yapay zekâ botu için RFC 9309 standardına göre değerlendiriyoruz: en spesifik bot grubu geçerlidir, sonra en uzun eşleşen kural; eşitlikte Allow kazanır. Sizi canlı cevaplara sokan arama ve kullanıcı botları 15 puan, eğitim botları 2 puan ağırlığındadır; çünkü eğitim botlarını engellemek meşru bir lisans tercihi olabilir.`,
    probeTitle: "3. Yapay zekâ cevaplarını ölçmek",
    probeBody: [
      "Yapay zekâ cevapları her seferinde aynı değildir. 2026'daki sektör araştırmaları, aynı soruya verilen cevaplar arasında sadece rastlantıdan kaynaklanan %10–34 fark buldu; atıfların çoğu tekrarlar arasında değişiyor. Tek bir cevap ölçüm değil, anekdottur.",
      "Bu yüzden Quovra her müşteri sorusunu birkaç kez (varsayılan 3) sorar ve görünürlük payını anılma ÷ cevap olarak, %95 Wilson güven aralığıyla birlikte raporlar. Wilson aralığı küçük örneklemlerde ve %0 ya da %100'e yakın oranlarda da doğru kalır; marka anılmaları tam da bu aralıktadır.",
      "Marka adınız ya da alan adınız cevapta geçtiğinde anılma sayıyoruz (büyük/küçük harf, aksan ve Türkçe ı farkı gözetilmez). Her cevap önerdiği isimleri en iyiden başlayarak da listeler; böylece sıranızı ve yerinize anılan rakipleri buluruz.",
    ],
    limitsTitle: "4. Açıkça belirttiğimiz sınırlar",
    limits: [
      "Motorları resmi API'leri üzerinden sorguluyoruz. API cevapları tüketici uygulamalarından farklı olabilir (kişiselleştirme, konum, oturum bağlamı).",
      "Güven aralığı ancak sorular kadar iyidir. Zaten kazandığınız soruları değil, müşterilerinizin gerçekten sorduğu soruları seçin.",
      "Kontroller alıntılanma olasılığını artıran sinyalleri ölçer; hiçbir araç bir yapay zekânın sizi önereceğini garanti edemez.",
    ],
    privacyTitle: "5. Gizlilik",
    privacy: "Ücretsiz denetimler bellekte işlenir ve saklanmaz. Sadece herkese açık sayfaları okuruz, kendimizi QuovraBot olarak tanıtırız ve özel ağ adreslerini reddederiz.",
  },
};

/** Lists every check with its weight by running the checks against an empty page. */
function checkCatalog(lang: Lang) {
  const page = { url: "https://example.com/", finalUrl: "https://example.com/", status: 200, html: "", headers: {}, responseMs: 0 };
  return runChecks({ $: load("<html><body></body></html>"), page, files: { robotsTxt: null, llmsTxt: null, sitemapFound: false }, bots: analyzeBots(null), lang });
}

export function Methodology({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  const cats = UI[lang].report.categories;
  const checks = checkCatalog(lang);
  return (
    <>
      <SiteNav lang={lang} home={false} />
      <main className="container narrow doc">
        <p className="kicker">{t.kicker}</p>
        <h1>{t.title}</h1>
        <p>{t.lead}</p>

        <h2>{t.auditTitle}</h2>
        <p>{t.auditBody}</p>
        {(Object.keys(cats) as Category[]).map((cat) => {
          const list = checks.filter((c) => c.category === cat);
          return (
            <div className="card list weight-cat" key={cat}>
              <table>
                <thead>
                  <tr><th>{cats[cat]}</th><th style={{ textAlign: "right" }}>{list.reduce((s, c) => s + c.weight, 0)} {t.points}</th></tr>
                </thead>
                <tbody>
                  {list.map((c) => (
                    <tr key={c.id}><td>{c.title}</td><td className="pts" style={{ textAlign: "right" }}>{c.weight}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })}
        <p style={{ marginTop: 16 }}>{t.grades}</p>

        <h2>{t.botsTitle}</h2>
        <p>{t.botsBody(AI_BOTS.length)}</p>

        <h2>{t.probeTitle}</h2>
        {t.probeBody.map((p) => <p key={p}>{p}</p>)}
        <div className="card"><code>share = k / n · CI₉₅ = Wilson(k, n, z = 1.96)</code></div>

        <h2>{t.limitsTitle}</h2>
        <ul>{t.limits.map((l) => <li key={l}>{l}</li>)}</ul>

        <h2>{t.privacyTitle}</h2>
        <p>{t.privacy}</p>
      </main>
      <SiteFooter lang={lang} />
    </>
  );
}
