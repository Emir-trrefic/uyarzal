# Citeable

**Get recommended by ChatGPT, Claude, Perplexity and Google AI Overviews.**

Citeable is an open-source **GEO (Generative Engine Optimization)** toolkit. It audits how AI assistants see your website, scores it across 20 weighted checks, and generates the exact fixes: `llms.txt`, Organization JSON-LD and `robots.txt` rules. The optional **AI Mention Probe** asks an AI model the questions your buyers ask and measures your share of voice.

![Citeable report](docs/screenshot-report.png)

## Why

Search is moving from ten blue links to one synthesized answer. If an assistant cannot crawl, parse or trust your site, it recommends someone else, and you never see the lost click. SEO tools measure rankings; Citeable measures whether **AI can cite you**.

## Features

| Area | What Citeable checks |
| --- | --- |
| **AI access** | robots.txt against 14 AI agents (OAI-SearchBot, ChatGPT-User, GPTBot, Claude-SearchBot, Claude-User, ClaudeBot, PerplexityBot, Perplexity-User, Googlebot, Google-Extended, Bingbot, Applebot-Extended, meta-externalagent, CCBot). Search and training bots are scored separately. Also `llms.txt`, sitemap and noindex. |
| **Structure** | Schema.org JSON-LD types, FAQ content, heading hierarchy, title/description, Open Graph, canonical and `lang`. |
| **Content** | Text visible **without JavaScript**, lists and tables an LLM can quote, freshness dates, statistics and outbound citations. |
| **Trust** | Author and organization identity, About and Contact pages. |
| **Technical** | HTTPS, response time, image alt text. |
| **Fix generator** | Drafts `llms.txt` from your navigation, Organization + WebSite JSON-LD with `sameAs` links, and robots.txt rules for AI search crawlers. |
| **AI Mention Probe** | Runs up to 5 buyer questions through Claude, then reports whether you are mentioned, your rank, and the competitors recommended instead. |

## Quick start

```bash
npm install
npm run dev            # http://localhost:3000
```

Command line, which also works as a CI gate:

```bash
npm run audit -- example.com
npm run audit -- example.com --json
npm run audit -- example.com --min-score=70   # exits 1 below the threshold
```

HTTP API:

```bash
curl -X POST localhost:3000/api/audit -H 'content-type: application/json' -d '{"url":"example.com"}'
```

### AI Mention Probe (optional)

Copy `.env.example` to `.env.local` and set `ANTHROPIC_API_KEY`. The probe uses `claude-opus-5-5` at low effort by default; override with `CITEABLE_PROBE_MODEL`.

## Architecture

```
src/
  lib/audit/      audit engine (framework independent)
    ssrf.ts         URL normalisation + private-network blocking on every redirect hop
    fetcher.ts      capped, timed fetch with a crawler user agent
    robots.ts       RFC 9309 robots.txt evaluation for 14 AI agents
    checks.ts       20 weighted checks, each returning status, points, detail and fix
    generators.ts   llms.txt / JSON-LD / robots.txt generators
  lib/probe/      AI Mention Probe (Anthropic SDK)
  app/            Next.js App Router: landing page + /api/audit + /api/probe
  components/     report UI
  cli.ts          terminal client
tests/            vitest suite with a fake fetch, no network needed
```

Scoring: every check has a weight, and the weights sum to 100. Grade A ≥ 85, B ≥ 70, C ≥ 55, D ≥ 40.

## Deploy

- **Vercel:** import the repo and set `ANTHROPIC_API_KEY` if you want the probe.
- **Docker:** `docker build -t citeable . && docker run -p 3000:3000 citeable`

## Roadmap

- [ ] Accounts, saved sites and weekly monitoring (Pro)
- [ ] Stripe billing
- [ ] Multi-page crawl from the sitemap
- [ ] Probe across several AI providers, with share-of-voice trends
- [ ] White-label PDF reports and a public API (Agency)
- [ ] WordPress / Shopify plugin that applies fixes in one click

## License

[AGPL-3.0](LICENSE). You can self-host and modify Citeable freely. If you offer a modified version as a network service, you must publish your changes. Commercial licenses are available.

---

## 🇹🇷 Türkçe özet

**Citeable**, web sitelerinin yapay zekâ asistanlarında (ChatGPT, Claude, Perplexity, Google AI Overviews) **bulunabilir, anlaşılabilir ve önerilebilir** olup olmadığını ölçen açık kaynak bir GEO (Üretken Motor Optimizasyonu) aracıdır. 20 kontrol yapar, 100 üzerinden puan verir ve düzeltmeleri (llms.txt, JSON-LD, robots.txt) hazır kod olarak üretir. İş modeli ve pazar araştırması için: [docs/IS_PLANI.md](docs/IS_PLANI.md).
