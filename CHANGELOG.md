# Changelog

## 0.4.0

### Changed
- **Own visual identity.** The warm beige, serif and terracotta palette read too much like other AI products. Quovra now has its own look: a cool light background, deep teal as the brand colour and a lime "highlighter" that marks your brand in AI answers.
- Typography: Bricolage Grotesque for headings, Instrument Sans for text, JetBrains Mono for data. There is no serif anywhere.
- A speech-bubble logo with a quotation mark (Quovra = being quoted), and lowercase "quovra" in the wordmark.
- Emphasis uses a highlighter stroke instead of italics; a teal call-to-action panel carries a lime button.
- Dark mode has its own mint/lime tokens, with contrast fixes for highlights and the logo.

## 0.3.2

### Added
- **"What is GEO?" section**: a three-step visual (the customer asks, the AI reads, it names 2–3 brands) and an SEO vs. GEO table.
- **"From the market" section**: six sourced market facts (ChatGPT ads, products in ChatGPT, reviews and local AI answers, local AI usage, answer volatility, category investment).
- **GEO guide** (`/guide`, `/tr/rehber`): five one-minute lessons, each with a "what to do" list and a code example.

### Changed
- All landing copy is shorter: one or two sentences per item, and fewer FAQ and comparison rows.
- Softer design: rounded corners, hairline rules, a terracotta accent, soft-tinted panels instead of black blocks, and alternating section backgrounds.

## 0.3.1

### Changed
- **New visual identity.** An editorial "citation" design replaces the generic startup look: paper and ink colours with one correction-red accent and a highlighter for the visitor's brand; Newsreader with IBM Plex Sans/Mono; ruled lines instead of rounded cards, gradients and shadows; § numbered sections; footnoted statistics.
- The hero is now asymmetric, with the sample AI answer set as a footnoted excerpt with the brand highlighted.
- The score ring gives way to a score meter: a large numeral, a stamped grade and an F–A scale.
- A wordmark logo, an index-style use-case list, a ruled pricing table, and restyled Open Graph image and badge.

## 0.3.0

### Added
- **Redesigned website**: sticky navigation, hero with a sample report, engines strip, sourced market statistics, "Measure. Fix. Prove." steps, a comparison table, use-case tabs, a future-proof section, monthly/yearly pricing with four plans and a full capacity table, a done-for-you setup offer, FAQ and a final CTA.
- **Methodology pages** (`/methodology`, `/tr/yontem`) that list every check and weight straight from the code.
- **Agent readiness** category: Product JSON-LD completeness for AI shopping agents, and Markdown access (`llms-full.txt` or Markdown alternates). There are now 22 checks.
- **Statistically sound probe**: every question is asked several times (`QUOVRA_PROBE_RUNS`, default 3), and share of voice comes with a 95% Wilson confidence interval, average rank and the most-recommended competitors. Engines plug in through a `ProbeEngine` interface.
- Strategy document with market research, competitors, differentiation, plan capacities, unit economics and a phased action plan (`docs/STRATEJI.md`).

### Changed
- Weights rebalanced to make room for agent readiness. They still sum to 100.
- Lead capture now records the plan (starter, growth, agency, setup, monitoring).
- Turkish name matching in the probe treats the dotless ı as i.

## 0.2.0

### Added
- **Turkish localisation.** The full UI at `/tr`, Turkish check texts, fixes, Markdown reports and error messages. The API picks the language from `lang` or `Accept-Language`.
- **Multi-page scan.** Audits up to 10 pages from the sitemap (following one level of sitemap index) or homepage links, with per-page scores and a site average.
- **Sharing and export.** `/?url=` links re-run an audit, plus Markdown download, print-ready PDF layout and `format: "markdown"` in the API.
- **Score badge.** `GET /api/badge?url=` returns an embeddable SVG.
- **Lead capture.** Waitlist forms on pricing and in reports post to `/api/lead`, which forwards to `LEAD_WEBHOOK_URL`.
- SEO for Quovra itself: hreflang alternates, `SoftwareApplication` and `FAQPage` JSON-LD, generated sitemap, robots and Open Graph images.
- CLI flags `--lang`, `--pages` and `--markdown`.

### Fixed
- Pricing buttons pointed to an email address on a domain we do not own; they now open a sign-up form.
- `ftp://…` and other non-HTTP URLs were rejected with a misleading "use a public domain" message.
- Future dates in page metadata no longer count as "fresh".
- The rate limiter's memory now gets pruned, and repeated audits of the same URL are cached for 10 minutes.

## 0.1.0

- First release: 20-check GEO audit, generated fixes, AI Mention Probe, web app, CLI, tests and CI.
