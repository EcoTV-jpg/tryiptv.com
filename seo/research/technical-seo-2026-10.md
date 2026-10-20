# Technical SEO research — October 2026

Compiled 2026-10-20 from five parallel research passes (Google, Bing, Google AI Overviews/AI Mode, AI answer engines, competitors/industry news). Refresh quarterly.

## What changed recently

**Google**
- Core updates in 2026: March (Mar 27, ~12 days) and May (May 21, ~12 days). No core update since May.
- Spam updates: March, June, August, and September (Sep 24 → ~Oct 8, unusually long at ~13.5 days).
- FAQ rich results stopped showing on 2026-05-07; documentation removed 2026-06-15. Unused FAQPage markup does no harm.
- New spam policy: back-button hijacking (published Apr 13, enforced from Jun 15). Site owners are responsible even for third-party scripts.
- Site reputation abuse: since Aug 30, no manual actions for searches in the EEA (DMA); unchanged elsewhere.
- Googlebot reads the first 2 MB of HTML (uncompressed) per file (documented Feb 2026).
- Core Web Vitals thresholds unchanged: LCP ≤ 2.5 s, INP < 200 ms, CLS < 0.1.
- Sitemaps: `priority`/`changefreq` ignored; `lastmod` used only when believable.
- Sources: status.search.google.com, developers.google.com/search/updates, developers.google.com/search/blog/2026/04/back-button-hijacking

**Google AI Overviews / AI Mode**
- No extra technical requirements beyond normal indexing + snippet eligibility. No special schema needed.
- Google's AI optimization guide (May 2026): llms.txt, content "chunking" and AI-specific markup do nothing for Google Search. Making many pages for query fan-out variants = scaled content abuse.
- `nosnippet` / `max-snippet` also limit use in AI Overviews and AI Mode.
- New Search Console "Search generative AI" control (Include/Exclude/Inherit), worldwide by 2026-08-31. Must be on Include.
- Google-Extended affects Gemini training and Gemini-app grounding, not Search or AI Overviews.
- Sources: developers.google.com/search/docs/appearance/ai-features, developers.google.com/search/docs/fundamentals/ai-optimization-guide, support.google.com/webmasters/answer/16908024

**Bing / Copilot**
- Bing Webmaster Tools: AI Performance report (Feb 2026), Intents/Topics/Citation Share (Jun 2026), Topics Portfolio beta with "Opportunity Queries" (Oct 13, 2026).
- Bing guidelines rewrite (Feb 2026) names GEO: state facts directly, one topic per URL, key info near the top. `NOARCHIVE` removes content from Copilot answers; `NOCACHE` limits it to URL/title/snippet. New `data-snippet` attribute.
- `lastmod` is a key recrawl signal (full timestamps preferred); IndexNow remains the main freshness channel.
- Sources: blogs.bing.com/webmaster (Feb, Jun, Oct 2026 posts)

**AI answer engines**
- GPTBot, ClaudeBot and PerplexityBot do not execute JavaScript (Vercel study; no vendor documents JS rendering). Content that only appears after client-side rendering is invisible to them.
- Search/citation crawlers: OAI-SearchBot, Claude-SearchBot, PerplexityBot, Bingbot, Applebot, Meta-WebIndexer, Amzn-SearchBot. Training-only: GPTBot, ClaudeBot, Applebot-Extended, Meta-ExternalAgent, Amazonbot.
- llms.txt: no major engine officially confirms using it. Low cost, low expected impact.
- Cloudflare (Jul–Sep 2026) splits AI bots into Training / Agent / Search; new domains block Training and Agent bots on ad pages by default.

**Competitors (unconfirmed, directional)**
- IPTV results are dominated by parasite pages (Indie Hackers posts, Shopify blogs on unrelated brands, `.it.com` sites). Direct IPTV sellers rarely rank. The cleanest legitimate format seen: named authors, last-updated dates, disclosures, comparison tables.
- Google has removed IPTV domains from UK results after court injunctions (Lumen database).

## Audit of tryiptv.com (2026-10-20)

Local production build crawled: 48 pages.

| Check | Result |
|---|---|
| HTTP status, soft 404s | All 46 sitemap URLs 200; unknown URLs return a real 404 |
| Legacy redirects | 308 to new routes (e.g. /devices/fire-tv, /contact, /checkout) |
| Canonicals | Self-referencing on every indexable page |
| robots meta | index on all sitemap pages; noindex only /blog and /thank-you (correct) |
| Sitemap | Only indexable canonical URLs, real lastmod, no priority/changefreq |
| Titles / H1 | All unique; exactly one H1 per page |
| JSON-LD | Valid on all pages; FAQPage/HowTo intentionally suppressed (rich results retired) |
| Orphan pages | None |
| HTML size | Max ~284 KB (limit 2 MB) |
| Back-button hijacking | No history manipulation in code |
| Hero image | `fetchPriority="high"`, preloaded, sized |
| Third-party scripts | GA lazyOnload, Ahrefs analytics deferred |
| **FAQ answers** | **Missing from server HTML on 24 pages — fixed** |

## What we applied

- [x] FAQ answers now server-rendered on all 24 pages using the shared FAQ list (FAQ, setup, 10 device pages, 7 guides, 5 help pages); still collapsed until clicked.

## Needs the owner (outside the code)

- [ ] Search Console → Settings: confirm "Search generative AI" control is **Include**.
- [ ] Search Console: check Manual actions and Security issues; compare traffic around Sep 24–Oct 8 (spam update) and May 21–Jun 2 (core update).
- [ ] Search the Lumen database for "tryiptv" (legal removals).
- [ ] Bing Webmaster Tools: open AI Performance and Topics Portfolio; note Opportunity Queries for content work.
- [ ] Cloudflare/Vercel firewall: make sure Search and Agent AI bots (OAI-SearchBot, ChatGPT-User, Claude-SearchBot, PerplexityBot) are allowed and not challenged.
- [ ] Decide on GPTBot: currently blocked (training only). This does not affect ChatGPT search citations, which use OAI-SearchBot (allowed).
