# seo-audit-skill

A source-first, multi-phase SEO audit skill for coding agents.

This project adapts the *workflow ideas* of Cloudflare's public `security-audit-skill`—reconnaissance, coverage-led investigation, independent verification, machine-readable findings, and report generation—to SEO. The SEO content and schemas in this repository are newly written for search auditing.

## What it does

The skill runs a structured SEO audit in six phases:

1. **Reconnaissance** — map routes, rendering, metadata, canonicals, sitemaps, robots rules, content families, conversion pages, analytics/search data, and deployment constraints.
2. **Coverage-led auditing** — assign focused auditors to deterministic audit units and maintain `coverage-ledger.json`.
3. **Candidate validation** — a fresh verifier attempts to disprove every material SEO finding.
4. **Structured output** — write `confirmed`, `needs_validation`, and `rejected` records to `findings.json`.
5. **Independent record verification** — re-check the evidence behind final findings.
6. **Reporting** — derive an actionable `REPORT.md`, implementation queue, and validation plan.

## SEO philosophy

- One topic + one intent = one indexable URL.
- Before creating a URL, answer: **What is the one thing this page will solve better than any URL that already exists?**
- Do not invent traffic, rankings, crawl behavior, or Google behavior.
- Prefer source evidence, rendered output, logs, Search Console data, official documentation, and reproducible checks.
- Do not recommend site-wide changes when a smaller fix solves the verified problem.
- A checklist failure is not automatically an SEO problem. Confirm the mechanism and likely impact.
- Separate **confirmed**, **needs validation**, and **rejected** findings.
- Prioritize by expected search/business impact, confidence, effort, and blast radius.
- Preserve user value, accessibility, conversion, and brand truth while optimizing search.

## Files

| File | Purpose |
|---|---|
| `SKILL.md` | Core operating modes, rules, workflow, outputs |
| `RECONNAISSANCE.md` | Architecture + SEO surface mapping |
| `AUDITING.md` | Orchestration and coverage-led review |
| `SEO-CLASSES.md` | Audit-class router |
| `CRAWL-INDEX-CANONICAL.md` | crawlability, indexability, canonicals, redirects, robots |
| `TECHNICAL-SEO.md` | technical HTML/rendering/status/metadata issues |
| `NEXTJS-SEO.md` | App Router/Pages Router/SSR/SSG/ISR/metadata specifics |
| `CONTENT-AND-INTENT.md` | intent, helpful content, uniqueness, cannibalization |
| `INTERNAL-LINKING-AND-ARCHITECTURE.md` | taxonomy, hubs, orphaning, anchors |
| `STRUCTURED-DATA.md` | schema eligibility and correctness |
| `PERFORMANCE-AND-CWV.md` | CWV and performance with SEO relevance |
| `AI-SEARCH-AND-GEO.md` | AI Overviews / answer-engine readiness without gimmicks |
| `E-E-A-T-AND-TRUST.md` | evidence, authorship, claims, trust |
| `INTERNATIONAL-SEO.md` | hreflang, localization, geo targeting |
| `SEARCH-CONSOLE-AND-MEASUREMENT.md` | GSC, analytics, query/page evidence |
| `CHANGE-RISK-AND-DEPLOYMENT.md` | rollout safety, regression prevention |
| `VALIDATION-AND-REPORTING.md` | validation and final reporting |
| `report-schema.json` | findings schema |
| `coverage-schema.json` | coverage ledger schema |
| `validate-findings.cjs` | zero-dependency JSON validator |
| `validate-coverage-ledger.cjs` | coverage validator |

## Installation

If your coding agent supports the Skills CLI layout:

```bash
npx skills add /path/to/seo-audit-skill --skill seo-audit
```

Or point the agent directly at `skills/seo-audit/SKILL.md`.

## Example usage

```text
Run a full SEO audit of this repository.
Do not edit the site.
Use source + rendered evidence.
Output machine-readable findings and a prioritized implementation plan.
```

```text
Audit only indexability, canonicals, sitemap coverage, internal linking, and cannibalization.
```

```text
Review this Next.js site for SEO regressions before deployment.
```

## Attribution

Workflow inspiration: Cloudflare `security-audit-skill` (MIT). This repository is an SEO-focused reimplementation, not a verbatim copy of the security prompts.
