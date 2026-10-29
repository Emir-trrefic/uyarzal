import type { Lang } from "@/lib/i18n";
import { SiteFooter } from "./SiteFooter";
import { SiteNav } from "./SiteNav";

interface Topic {
  id: string;
  title: string;
  what: string;
  todo: string[];
  code?: string;
}

const COPY: Record<Lang, { kicker: string; title: string; lead: string; whatLabel: string; todoLabel: string; cta: string; topics: Topic[] }> = {
  en: {
    kicker: "Guide",
    title: "GEO in five short lessons",
    lead: "What AI assistants need from your website, and what to do about it. Each lesson takes about a minute.",
    whatLabel: "What it is",
    todoLabel: "What to do",
    cta: "Check your site for free",
    topics: [
      {
        id: "geo", title: "What GEO is",
        what: "Generative Engine Optimization is making your business easy for AI assistants to find, understand and recommend. They answer with two or three names; GEO is about being one of them.",
        todo: ["Write down the 10 questions your customers ask before buying.", "Ask an AI those questions and note who gets named.", "Fix the basics below, then measure again."],
      },
      {
        id: "bots", title: "AI crawlers and robots.txt",
        what: "AI companies send crawlers to read your site. Search bots (OAI-SearchBot, Claude-SearchBot, PerplexityBot) put you into live answers; training bots (GPTBot, ClaudeBot) feed future models.",
        todo: ["Never block search bots if you want to be recommended.", "Blocking training bots is your choice.", "Re-check after every CDN or firewall change."],
        code: "User-agent: OAI-SearchBot\nUser-agent: Claude-SearchBot\nUser-agent: PerplexityBot\nAllow: /",
      },
      {
        id: "llms", title: "llms.txt",
        what: "A short Markdown file at /llms.txt that tells AI agents who you are and which pages matter. It is a proposed standard: cheap to add, and agents increasingly look for it.",
        todo: ["Add a one-sentence summary.", "Link your 5–10 most important pages.", "Keep it updated when pages change."],
        code: "# Smile Dental\n\n> Implant and cosmetic dentistry clinic in Kadıköy, Istanbul.\n\n## Key pages\n- [Implants](https://example.com/implants)\n- [Prices](https://example.com/prices)",
      },
      {
        id: "schema", title: "Structured data (JSON-LD)",
        what: "Machine-readable facts about your business: name, address, products, prices, reviews. AI systems use it to be sure who you are and what you offer.",
        todo: ["Add Organization or LocalBusiness on every page.", "Add Product with price and stock on product pages.", "Add FAQPage where you answer customer questions."],
        code: '{\n  "@context": "https://schema.org",\n  "@type": "Dentist",\n  "name": "Smile Dental",\n  "address": "Kadıköy, Istanbul",\n  "aggregateRating": { "@type": "AggregateRating", "ratingValue": 4.8, "reviewCount": 212 }\n}',
      },
      {
        id: "content", title: "Content AI can quote",
        what: "AI crawlers usually do not run JavaScript and prefer clear, factual text. Pages that state facts plainly, with numbers and sources, get quoted more often.",
        todo: ["Make sure your main text is in the HTML, not loaded later.", "Answer one question per heading.", "Use lists and tables for prices, steps and comparisons."],
      },
    ],
  },
  tr: {
    kicker: "Rehber",
    title: "Beş kısa derste GEO",
    lead: "Yapay zekâ asistanlarının sitenizden ne beklediği ve bunun için ne yapmanız gerektiği. Her ders yaklaşık bir dakika.",
    whatLabel: "Nedir",
    todoLabel: "Ne yapmalı",
    cta: "Sitenizi ücretsiz kontrol edin",
    topics: [
      {
        id: "geo", title: "GEO nedir",
        what: "Üretken Motor Optimizasyonu, işletmenizin yapay zekâ asistanlarınca kolayca bulunmasını, anlaşılmasını ve önerilmesini sağlamaktır. Asistanlar iki üç isimle cevap verir; GEO o isimlerden biri olmakla ilgilidir.",
        todo: ["Müşterilerinizin satın almadan önce sorduğu 10 soruyu yazın.", "Bu soruları bir yapay zekâya sorun, kimlerin anıldığını not edin.", "Aşağıdaki temel adımları düzeltin, sonra tekrar ölçün."],
      },
      {
        id: "bots", title: "Yapay zekâ botları ve robots.txt",
        what: "Yapay zekâ şirketleri sitenizi okumak için bot gönderir. Arama botları (OAI-SearchBot, Claude-SearchBot, PerplexityBot) sizi canlı cevaplara sokar; eğitim botları (GPTBot, ClaudeBot) gelecekteki modelleri besler.",
        todo: ["Önerilmek istiyorsanız arama botlarını asla engellemeyin.", "Eğitim botlarını engellemek sizin tercihiniz.", "CDN veya güvenlik duvarı değişikliklerinden sonra tekrar kontrol edin."],
        code: "User-agent: OAI-SearchBot\nUser-agent: Claude-SearchBot\nUser-agent: PerplexityBot\nAllow: /",
      },
      {
        id: "llms", title: "llms.txt",
        what: "/llms.txt adresinde, yapay zekâ ajanlarına kim olduğunuzu ve hangi sayfaların önemli olduğunu anlatan kısa bir Markdown dosyası. Önerilen bir standart: eklemesi kolay, ajanlar giderek daha çok arıyor.",
        todo: ["Tek cümlelik bir özet yazın.", "En önemli 5–10 sayfanıza link verin.", "Sayfalar değiştikçe güncel tutun."],
        code: "# Gülüş Diş\n\n> Kadıköy, İstanbul'da implant ve estetik diş kliniği.\n\n## Önemli sayfalar\n- [İmplant](https://ornek.com/implant)\n- [Fiyatlar](https://ornek.com/fiyatlar)",
      },
      {
        id: "schema", title: "Yapısal veri (JSON-LD)",
        what: "İşletmeniz hakkında makinenin okuyabileceği bilgiler: ad, adres, ürünler, fiyatlar, yorumlar. Yapay zekâ kim olduğunuzdan ve ne sunduğunuzdan bununla emin olur.",
        todo: ["Her sayfaya Organization veya LocalBusiness ekleyin.", "Ürün sayfalarına fiyat ve stok içeren Product ekleyin.", "Müşteri sorularını cevapladığınız yere FAQPage ekleyin."],
        code: '{\n  "@context": "https://schema.org",\n  "@type": "Dentist",\n  "name": "Gülüş Diş",\n  "address": "Kadıköy, İstanbul",\n  "aggregateRating": { "@type": "AggregateRating", "ratingValue": 4.8, "reviewCount": 212 }\n}',
      },
      {
        id: "content", title: "Yapay zekânın alıntılayacağı içerik",
        what: "Yapay zekâ botları genelde JavaScript çalıştırmaz ve net, olgusal metni tercih eder. Bilgiyi açıkça, rakam ve kaynakla veren sayfalar daha sık alıntılanır.",
        todo: ["Ana metnin HTML'de olduğundan, sonradan yüklenmediğinden emin olun.", "Her başlıkta tek bir soruyu cevaplayın.", "Fiyat, adım ve karşılaştırmalar için liste ve tablo kullanın."],
      },
    ],
  },
};

export function Guide({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  const home = lang === "tr" ? "/tr" : "/";
  return (
    <>
      <SiteNav lang={lang} home={false} />
      <main className="container guide">
        <header className="guide-head">
          <p className="kicker">{t.kicker}</p>
          <h1>{t.title}</h1>
          <p className="section-lead">{t.lead}</p>
        </header>
        <div className="guide-body">
          <nav className="guide-toc" aria-label={t.kicker}>
            <ol>{t.topics.map((tp) => <li key={tp.id}><a href={`#${tp.id}`}>{tp.title}</a></li>)}</ol>
          </nav>
          <div className="guide-topics">
            {t.topics.map((tp, i) => (
              <article id={tp.id} key={tp.id} className="lesson">
                <span className="lesson-n">{String(i + 1).padStart(2, "0")}</span>
                <h2>{tp.title}</h2>
                <h3>{t.whatLabel}</h3>
                <p>{tp.what}</p>
                <h3>{t.todoLabel}</h3>
                <ul>{tp.todo.map((x) => <li key={x}>{x}</li>)}</ul>
                {tp.code && <pre className="code">{tp.code}</pre>}
              </article>
            ))}
            <a className="btn" href={`${home}#top`}>{t.cta}</a>
          </div>
        </div>
      </main>
      <SiteFooter lang={lang} />
    </>
  );
}
