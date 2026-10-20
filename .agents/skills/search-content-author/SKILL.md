---
name: search-content-author
description: Author, enhance, and verify high-intent, evidence-backed search content for TryIPTV. Directly synthesizes the internal Content Quality System (docs/content-quality-system.md) with 2026 Search & AI Visibility standards (.agents/skills/search-ai-visibility/SKILL.md).
---

# Search Content Author

Author, refine, and verify search-first content and evidence across TryIPTV's indexable routes. This skill is the authoring counterpart to `seo-audit`, transforming audit findings and priority queues into publication-grade code and copy.

It synthesizes:
1. **The Internal Content Quality System** ([`docs/content-quality-system.md`](file:///Users/mac/Desktop/project%20(4)/docs/content-quality-system.md)): Strict factual gates, evidence logs, split accuracy, commercial utility vs. originality decoupling, and materiality governance.
2. **The Search & AI Visibility Standards** ([`.agents/skills/search-ai-visibility/SKILL.md`](file:///Users/mac/Desktop/project%20(4)/.agents/skills/search-ai-visibility/SKILL.md)): 2026 Google AI Overviews/AI Mode, Bing Copilot, ChatGPT Search, Claude Web Discovery, query fan-out satisfaction, and retrieval/citation readiness.

---

## 1. Non-Negotiable Foundational Rules

1. **Source First & Product Truths:**
   - All commercial and technical statements must strictly match [`PRODUCT_TRUTHS`](file:///Users/mac/Desktop/project%20(4)/src/lib/site-config.ts) and [`pricing.ts`](file:///Users/mac/Desktop/project%20(4)/src/lib/site-data/pricing.ts):
     - **Streams:** Strictly 2 simultaneous connections included on all plans.
     - **Prepaid Pricing:** 1 Mo ($16.00 / $16.00 mo), 3 Mo ($39.00 / $13.00 mo), 6 Mo ($60.00 / $10.00 mo), 12 Mo ($90.00 / $7.50 mo).
     - **Billing:** 100% prepaid, non-recurring, no automatic renewal.
     - **Payment:** Cryptocurrency, PayPal, Stripe.
     - **Free Trial:** 24 Hours, $0 cost, no credit card required.
     - **Formats:** Xtream Codes API (Server, User, Pass) + M3U Playlist URLs.
     - **Delivery:** 5–15 minutes typical delivery window.
2. **Zero Fabricated Evidence:**
   - Never generate fake reviews, fake customer testimonials, artificial dates, fake author personas, or synthetic speed-test captures.
   - If an operational metric lacks empirical telemetry, frame it as a qualified operational expectation or keep it unverified.
3. **One Topic + One Intent = One Indexable URL:**
   - Mandatory check before proposing or modifying any URL:
     > **What is the one thing this page will solve better than any URL that already exists?**
   - Never create programmatic doorway pages or keyword variations.
4. **Decoupling of Quality Assessment from Owner Release Decisions:**
   - Evidence status reflects empirical verification. An owner preference does not convert a failed claim into evidence.
   - `acceptedRisks` never turn `FAIL` into `PASS`. The underlying gate remains `FAIL` and quality status remains `NOT FULLY VERIFIED`.
   - `PUBLISH READY ≠ FULLY VERIFIED`. A page may be publish-ready under materiality rules while non-material operational estimates remain `WARNING` or unverified.

---

## 2. Core Architectural & Quality Frameworks

### A. Originality vs. Commercial Utility Decoupling
- **Originality:** Measures genuine editorial/empirical contributions: first-hand hardware/stream tests, annotated troubleshooting UI screenshots, customer support patterns, or distinctive comparison methodologies. If a page lacks original research, its Originality gate remains `NOT VERIFIED`.
- **Commercial Utility:** Measures complete, transparent first-party commercial information enabling informed buying decisions: plan pricing, connection allowances, accepted payments, non-recurring prepaid terms, and direct checkout endpoints.
- **Rule:** A pricing or transactional page does not need synthetic "journalistic research" to publish; it qualifies through verified Commercial Utility (`Commercial Utility = PASS`). Informational and guide articles, however, must pass both `Effort` and `Originality`.

### B. Split Accuracy & The Materiality Rule
Never evaluate accuracy as a monolithic boolean. Accuracy is partitioned into three distinct sub-gates:
1. **Commercial Fact Accuracy:** Prices, durations, monthly equivalents, 2 connections, payment methods, non-recurring terms. Must be `PASS` to publish.
2. **Configuration Fact Accuracy:** Xtream Codes format, M3U playlist format, device/player/troubleshooting routing targets. Must be `PASS` to publish.
3. **Operational Claim Accuracy:** Delivery timing, peak-hour stability, fulfillment logs, hardware runtime behavior.
   - **Material Blockers:** SLA guarantees, guaranteed delivery windows, cross-IP streaming promises. If unevidenced, publication is blocked.
   - **Qualified Operational Estimates:** Copy clearly framed as non-contractual estimates (e.g. "typically 5–15 minutes") backed by `PRODUCT_TRUTHS` surfaces as `Operational Accuracy = WARNING`, which does NOT block publication of commercial pages.

### C. Functional Hubs vs. Editorial Guides
- **Editorial Guides** (e.g., `/guides/what-is-iptv`, `/guides/iptv-internet-speed`): Primary task is conceptual explanation or technical problem solving. Evaluated on editorial depth, evidence, and original insights.
- **Functional Hubs** (e.g., `/setup`, `/devices`, `/players`): Primary task is operational onboarding and user routing. Evaluated on task completion and **Routing Integrity**:
  - Device handoffs (Firestick, Android TV, Samsung, LG, Apple TV, etc.)
  - Player handoffs (TiviMate, IPTV Smarters, XCIPTV, Televizo, etc.)
  - Troubleshooting handoffs (Buffering, login failure, playlist error, EPG issues)
  - Protocol handoffs (Xtream Codes vs. M3U)
  - `Routing Integrity = PASS` is mandatory for functional hubs. `Originality` and `Experience` are conditional and do not block publication unless specifically claimed.

---

## 3. 2026 AI Search & Citation Readiness

To make pages citation-worthy for **Google AI Overviews / AI Mode**, **Bing Copilot**, **ChatGPT Search**, and **Claude Web Discovery**:

1. **Answer-First Inversion:** Place the direct, objective answer in the first viewport (via `<ArticleSummary>` or an executive callout box).
2. **Information Density & Structured Elements:**
   - Multi-dimensional comparison tables (e.g., bandwidth concurrency, protocol trade-offs).
   - Step-by-step diagnostic triage flows with clear decision branches.
   - Explicit technical thresholds (e.g., Jitter $<15\text{ms}$, Latency $<50\text{ms}$, Packet Loss $0\%$).
3. **Entity Clarity & Semantic Headings:** Use clean, logical heading hierarchies (`H1` -> `H2` -> `H3`). Never use multiple `H1` tags.
4. **Structured Data Alignment:**
   - `FAQPage` schema must strictly match visible on-page FAQ items.
   - `Article` schema must provide verified dates and author/publisher entities.
   - `BreadcrumbList` schema must follow the true site hierarchy.
5. **Anti-Patterns Rejected:**
   - No `llms.txt` or `ai.txt` ranking myths.
   - No synthetic "AI-optimized" schema markup.
   - No mass doorway pages or keyword-stuffed long-tail permutations.

---

## 4. The 9 Authorized Improvement Actions

Every revision must execute strictly one of the 9 authorized actions:
1. `add evidence`: Hardware benchmarks, empirical bandwidth tables, or test procedures.
2. `improve diagnostic flow`: Decision trees, symptom triage, or isolation steps.
3. `update volatile facts`: Pricing, catalog categories, active protocol features.
4. `improve answer clarity`: Clear, immediate answer-first summaries for the core intent.
5. `improve comparison methodology`: Multi-attribute technical matrices replacing subjective superlatives.
6. `add useful visual evidence`: Step UI screenshots, configuration diagrams, or hardware callouts.
7. `add primary-source citation`: RFC specifications (RFC 8216 for HLS M3U), XMLTV schemas, official player docs.
8. `reduce repetition`: Prune generic filler and boilerplate.
9. `leave unchanged`: Preserve pages that already satisfy all quality gates.

---

## 5. Execution Workflow & QA Verification

When authoring or enhancing a page:
1. **Select Target:** Choose the highest-scoring candidate from [`REVISED-PAGE-IMPROVEMENT-PRIORITIES.md`](file:///Users/mac/Desktop/project%20(4)/.audit/seo-run-1/REVISED-PAGE-IMPROVEMENT-PRIORITIES.md).
2. **Audit Gaps:** Inspect existing page copy against `PRODUCT_TRUTHS` and the assigned improvement action.
3. **Implement Changes:** Update page components (`src/app/` or `src/lib/site-data/`).
4. **Contextual Linking:** Insert approved anchor text from Section 2 of [`CONTENT-IMPROVEMENT-QUEUE.md`](file:///Users/mac/Desktop/project%20(4)/.audit/seo-run-1/CONTENT-IMPROVEMENT-QUEUE.md).
5. **Automated Verification Suite:**
   ```bash
   # Typecheck
   npm run typecheck

   # Production Build (generates HTML for rendered audit)
   npm run build

   # Content Quality & Technical Audit
   npm run content:audit
   ```
6. **Pass Criteria:**
   - `Product truth data conflicts: NONE FOUND`
   - `Broken internal targets: NONE FOUND`
   - `Duplicate canonical targets: NONE FOUND`
   - `H1 count: 1`
   - `Technical SEO: PASS`
