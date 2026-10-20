# Reconnaissance

## Goal
Build a factual map before judging SEO quality.

## Agent 1 — Product, audience, and conversion model
Return:
1. What the site offers.
2. Primary audiences/markets/languages.
3. Money pages vs informational/support pages.
4. Primary conversions and trust-sensitive claims.
5. Page families and likely search intents.

Do not infer unproven business facts.

## Agent 2 — Framework, rendering, and deployment
Inspect:
- framework/version
- App Router vs Pages Router
- SSR/SSG/ISR/client-only rendering
- middleware/rewrites/redirects
- metadata generation
- route manifests
- deployment platform
- cache behavior
- image/font strategy
- environment-dependent output

## Agent 3 — Crawl and index surface
Map:
- all routable URLs discoverable from source
- robots.txt
- meta robots / X-Robots-Tag
- XML sitemaps and sitemap indexes
- canonicals
- redirects/rewrites
- trailing slash/case/query policy
- pagination/filter/faceted URLs
- 404/soft-404 patterns
- duplicate/legacy URLs

## Agent 4 — Content and intent inventory
For each indexable page:
- URL
- page family
- primary job-to-be-done
- target intent
- unique value
- likely overlapping URLs
- title/H1
- evidence/experience elements
- CTA
- freshness dependency

Apply:
**one topic + one intent = one indexable URL.**

## Agent 5 — Internal architecture
Map:
- global nav
- footer
- breadcrumbs
- hubs
- contextual links
- orphan risks
- depth
- anchor semantics
- circular or repetitive blocks
- money-page support paths

## Agent 6 — Structured data and trust
Inventory JSON-LD/microdata/RDFa and compare to:
- visible content
- entity identity
- page type
- Google-supported eligibility
- duplicate/conflicting graphs

Also map:
- About/contact/business identity
- policies
- authorship/review process
- claim substantiation

## Agent 7 — Measurement
Determine availability of:
- Google Search Console
- analytics
- server logs
- CWV/CrUX
- rank tracking
- backlink sources
- crawl exports

Never treat absent data as zero performance.

## Synthesis: `site-architecture.md`

Include:
- technical stack
- rendering model
- routing model
- page-family table
- indexable URL model
- canonical/redirect policy
- sitemap/robots policy
- content clusters
- internal-link architecture
- measurement availability
- constraints and unknowns

## Create `coverage-ledger.json`

Every material route family and audit class must have a deterministic entry. Do not declare the audit complete if high-value units remain `not_checked`.
