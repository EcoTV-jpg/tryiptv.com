# Full SEO Audit Prompt

Audit this website/codebase using the `seo-audit` skill.

Requirements:
- Full audit mode.
- Read source before conclusions.
- Do not modify production code.
- Build a deterministic route/page-family inventory.
- Verify rendered behavior where tooling allows.
- Maintain `coverage-ledger.json`.
- Use independent verification for every material finding.
- Separate `confirmed`, `needs_validation`, and `rejected`.
- Do not invent GSC, SERP, traffic, backlink, or Google canonical data.
- Enforce: one topic + one intent = one indexable URL.
- Before suggesting any new URL, answer: “What is the one thing this page will solve better than any URL that already exists?”
- Audit Next.js rendering/metadata/routes if applicable.
- Audit crawl/index/canonical/robots/sitemaps.
- Audit intent/cannibalization.
- Audit internal linking and architecture.
- Audit structured data.
- Audit Core Web Vitals/performance evidence.
- Audit trust/claims.
- Audit AI-search/GEO readiness without treating llms.txt/ai.txt as ranking factors.
- If GSC is available, use query↔page evidence.
- Prioritize by impact × confidence × scope × business value × change risk.
- Recommend the smallest effective fix.
- For implementation recommendations, specify exact files/templates/URLs.
- Include regression checks.
- Review final evidence a second time before reporting.

Outputs:
- run-metadata.json
- site-architecture.md
- coverage-ledger.json
- findings.json
- REPORT.md
- IMPLEMENTATION-QUEUE.md
- NEEDS-VALIDATION.md
