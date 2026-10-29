import { AuditTool } from "@/components/AuditTool";

const FEATURES = [
  { title: "AI crawler access", body: "Checks robots.txt against 14 AI user agents: GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended and more." },
  { title: "Machine readability", body: "Is your content visible without JavaScript? Is it chunked by headings, lists and tables that LLMs can quote?" },
  { title: "Entity & trust signals", body: "Schema.org JSON-LD, authorship, About/Contact pages and freshness: how engines decide who is a credible source." },
  { title: "Fixes, not just scores", body: "Copy-paste llms.txt, Organization JSON-LD and robots.txt rules generated from your own site." },
  { title: "AI mention probe", body: "Ask an AI the questions your buyers ask and see your share of voice, rank and the competitors recommended instead." },
  { title: "Open-source engine", body: "Every check is transparent and runs from the CLI too: npx citeable yoursite.com. No black-box scores." },
];

const PLANS = [
  { name: "Free", price: "$0", per: "", featured: false, cta: "Run an audit", href: "#top",
    items: ["Unlimited single-page audits", "20 GEO checks", "Generated llms.txt, JSON-LD, robots.txt", "CLI & open-source engine"] },
  { name: "Pro", price: "$29", per: "/mo", featured: true, cta: "Start 14-day trial", href: "mailto:hello@citeable.app?subject=Citeable%20Pro",
    items: ["Everything in Free", "Weekly monitoring of 50 pages", "AI mention probe: 25 buyer questions", "Share-of-voice trend & competitor list", "Email alerts when a score drops"] },
  { name: "Agency", price: "$99", per: "/mo", featured: false, cta: "Talk to us", href: "mailto:hello@citeable.app?subject=Citeable%20Agency",
    items: ["Everything in Pro", "10 client sites", "White-label PDF reports", "API access", "Priority support"] },
];

const FAQ = [
  { q: "What is GEO (Generative Engine Optimization)?", a: "GEO is the practice of making your content easy for AI systems such as ChatGPT, Claude, Perplexity and Google AI Overviews to find, understand and cite. Where SEO wins clicks on a results page, GEO wins the mention inside the AI's answer." },
  { q: "Why does this matter now?", a: "A growing share of product research starts in an AI assistant, and AI Overviews already sit above organic results for a large share of Google queries. If an assistant cannot read your site, it recommends someone else." },
  { q: "Does blocking GPTBot hurt me?", a: "GPTBot collects training data. Blocking it is a valid licensing choice. Blocking search and user-fetch agents such as OAI-SearchBot or ChatGPT-User, however, removes you from live answers. Citeable shows the two separately." },
  { q: "What is llms.txt?", a: "A proposed standard: a Markdown file at /llms.txt that tells AI agents who you are and which pages matter. Citeable drafts one from your own navigation." },
  { q: "Is my data stored?", a: "No. The free audit fetches public pages, scores them in memory and returns the result. Nothing is saved." },
];

export default function Home() {
  return (
    <>
      <div className="container" id="top">
        <nav className="nav">
          <a className="logo" href="/"><span className="logo-mark">C</span>Citeable</a>
          <div className="nav-links">
            <a href="#how" className="hide-sm">How it works</a>
            <a href="#pricing">Pricing</a>
            <a href="https://github.com/Emir-trrefic/uyarzal">GitHub</a>
          </div>
        </nav>

        <header className="hero">
          <span className="eyebrow">Generative Engine Optimization</span>
          <h1>Is ChatGPT recommending you, or <em>your competitor?</em></h1>
          <p className="lead">
            Citeable audits how AI assistants see your website, then hands you the exact fixes to get found,
            understood and cited by ChatGPT, Claude, Perplexity and Google AI Overviews.
          </p>
          <AuditTool />
        </header>
      </div>

      <section>
        <div className="container grid grid-3">
          <div className="card"><div className="stat">~40%</div><p>visibility lift from adding statistics, quotes and citations, measured in the original GEO research (Princeton, KDD 2024).</p></div>
          <div className="card"><div className="stat">14</div><p>AI crawlers checked against your robots.txt, from OpenAI, Anthropic, Perplexity, Google, Microsoft, Apple and Meta.</p></div>
          <div className="card"><div className="stat">0 JS</div><p>is what most AI crawlers execute. If your content needs JavaScript, they see an empty page.</p></div>
        </div>
      </section>

      <section id="how">
        <div className="container">
          <h2 className="section-title">Everything an AI checks before it cites you</h2>
          <p className="section-lead">Twenty weighted checks across access, structure, content, trust and technical health, each with a concrete fix.</p>
          <div className="grid grid-3">
            {FEATURES.map((f) => (
              <div className="card" key={f.title}><h3>{f.title}</h3><p>{f.body}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing">
        <div className="container">
          <h2 className="section-title">Simple pricing</h2>
          <p className="section-lead">Audit for free, forever. Upgrade when you want to track your AI share of voice over time.</p>
          <div className="grid grid-3">
            {PLANS.map((p) => (
              <div className={`card plan${p.featured ? " featured" : ""}`} key={p.name}>
                <h3>{p.name}</h3>
                <div className="price">{p.price}<small>{p.per}</small></div>
                <ul>{p.items.map((i) => <li key={i}>{i}</li>)}</ul>
                <a className={`btn${p.featured ? "" : " ghost"}`} href={p.href}>{p.cta}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq">
        <div className="container" style={{ maxWidth: 760 }}>
          <h2 className="section-title">Questions</h2>
          {FAQ.map((f) => (
            <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
          ))}
        </div>
      </section>

      <footer>
        <div className="container">
          <span>© {new Date().getFullYear()} Citeable · Open-source GEO toolkit</span>
          <span>Built for the age of AI search.</span>
        </div>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          }),
        }}
      />
    </>
  );
}
