---
name: seo-audit
description: Source-first SEO audit for websites and web applications. Use for technical SEO, indexability, content/intent, internal linking, structured data, Core Web Vitals, Next.js SEO, AI-search readiness, Search Console analysis, migrations, and pre-deployment SEO reviews.
---

# SEO Audit

Find SEO problems that can plausibly affect crawling, indexing, canonical selection, relevance, discoverability, click-through, page experience, or organic conversion. Ground every material finding in evidence and distinguish verified problems from hypotheses.

## Operating modes

### Guidance mode
Use for focused questions, a single URL/page family, one technical problem, or methodology. Load only relevant modules. Do not create a full audit directory unless requested.

### Full audit mode
Use when the user asks for a full/comprehensive/end-to-end SEO audit, asks to audit a repository/site, or asks for report artifacts.

## Non-negotiable principles

1. **Source first.** Inspect code/config/content before proposing edits.
2. **Rendered truth matters.** Where possible, verify what search engines receive: response code, headers, HTML, canonical, robots directives, structured data, links, hydration/rendering.
3. **No invented evidence.** Never fabricate rankings, GSC data, crawl frequency, traffic, SERP features, backlinks, or Google-selected canonicals.
4. **One topic + one intent = one indexable URL.**
5. Before recommending a new page, answer: **What is the one thing this page will solve better than any URL that already exists?**
6. A failed checklist item is not automatically a finding. Explain the mechanism.
7. A fresh verifier must attempt to disprove material findings.
8. Minimize blast radius. Prefer the smallest fix that solves the verified problem.
9. Preserve conversions and user satisfaction. SEO is not keyword insertion.
10. Never recommend fake reviews, fake authors, fake dates, fake first-hand experience, fabricated statistics, or deceptive schema.
11. Do not add structured data that is not supported by visible page content and Google eligibility.
12. Do not change URLs, canonicals, redirects, robots rules, or sitemap membership casually.
13. Distinguish **Google requirement**, **Google recommendation**, **industry heuristic**, and **experiment/hypothesis**.
14. Keep brand/business claims internally consistent across pages.

## Full-audit outputs

Create outside the target repository unless the user explicitly chooses an ignored audit directory:

- `run-metadata.json`
- `site-architecture.md`
- `coverage-ledger.json`
- `findings.json`
- `REPORT.md`
- `IMPLEMENTATION-QUEUE.md`
- `NEEDS-VALIDATION.md`

## Six phases

### Phase 1 — Reconnaissance
Use `RECONNAISSANCE.md`.

Map:
- framework/rendering/deployment
- indexable route inventory
- redirects/status behavior
- robots/sitemap/canonicals
- metadata generation
- content clusters and page families
- internal navigation/linking
- structured data
- images/media
- performance setup
- international/local targeting
- analytics/GSC availability
- existing SEO tests/validators
- known migrations or legacy URLs

### Phase 2 — Coverage-led auditing
Use `AUDITING.md` and module files selected from `SEO-CLASSES.md`.

Every deterministic unit receives:
- `unit_id`
- `class`
- `scope`
- `status`
- `checks`
- `evidence`
- `notes`

### Phase 3 — Candidate validation
A fresh verifier receives each candidate without being told it is correct. Ask it to:
- reproduce the evidence;
- identify alternate explanations;
- determine whether search impact is plausible;
- check whether another control already neutralizes the issue;
- downgrade or reject weak claims.

### Phase 4 — Structured findings
Write findings to `findings.json` and validate them.

Verdicts:
- `confirmed`
- `needs_validation`
- `rejected`

### Phase 5 — Independent record verification
Fresh review of source paths/URLs/evidence for final confirmed findings. If a material field changes, verify again.

### Phase 6 — Reporting
Generate:
- executive summary
- search-impact map
- critical/high priority queue
- page-family matrix
- implementation order
- regression tests
- items intentionally left unchanged
- needs-validation section

## Priority model

Priority is not “number of checklist failures.”

Evaluate:
- search impact: `critical | high | medium | low | informational`
- confidence: `high | medium | low`
- scope: one URL / template / site-wide
- business importance
- fix effort
- change risk
- reversibility

A high-impact, high-confidence indexability issue outranks 50 cosmetic metadata suggestions.

## Audit anti-patterns

Reject these:
- “Add more keywords” with no intent/relevance evidence.
- “Longer content ranks better.”
- “Every page needs FAQ schema.”
- “More schema = better rankings.”
- “AI.txt guarantees AI visibility.”
- “llms.txt is a Google ranking factor.”
- “Submit IndexNow to Google.”
- “A 100 Lighthouse SEO score means SEO is complete.”
- “Noindex pages must never appear in sitemap” without checking intended lifecycle.
- mass URL creation from keyword permutations.
- changing canonicals to hide cannibalization instead of fixing intent architecture.
- treating correlation from one SERP as a universal ranking factor.
- recommendations based only on a crawler export with no source/rendered verification.

## Stop conditions

Stop and mark `needs_validation` when decisive evidence requires unavailable:
- GSC property data
- production response
- server logs
- JS rendering/browser execution
- external backlink index
- real-user CWV field data
- historical traffic/ranking data

State exactly what evidence is missing and how to obtain it.


## 2026 Search + AI modules

For current modern-search audits, also load:
- `SOURCE-POLICY.md`
- `GOOGLE-SEARCH-2026.md`
- `GOOGLE-AI-OVERVIEWS-AI-MODE.md`
- `QUERY-FANOUT-AND-TOPICAL-COVERAGE.md`
- `BING-COPILOT-AI-SEARCH.md`
- `INDEXNOW.md`
- `CHATGPT-SEARCH.md`
- `CLAUDE-WEB-DISCOVERY.md`
- `AI-CRAWLER-MATRIX.md`
- `AI-VISIBILITY-MEASUREMENT.md`
- `VISUAL-AND-MULTIMODAL-SEO.md`
- `CONTENT-EVIDENCE-SYSTEM.md`
- `SEO-EXPERIMENTS.md`
- `MASTER-SEARCH-AI-AUDIT-PROMPT.md`

### Mandatory platform rule
Before making a production change based on a Google/Bing/OpenAI/Anthropic behavior claim, verify current first-party documentation when the claim is time-sensitive.

### Modern visibility objective
Optimize for:
1. crawl eligibility
2. index eligibility
3. canonical clarity
4. task relevance
5. original/non-commodity value
6. retrieval/citation-worthiness
7. trust/evidence
8. multimodal usefulness
9. measurable engagement/conversion

Never promise a guaranteed AI citation or rank.
