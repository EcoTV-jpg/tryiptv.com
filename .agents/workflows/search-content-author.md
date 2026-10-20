---
description: Comprehensive Search & AI Content Authoring workflow for high-intent, evidence-backed page improvements adhering to TryIPTV content quality gates.
---

# Search Content Author Workflow

This workflow guides the research, authoring, enhancement, and technical verification of search-first content across TryIPTV's indexable routes. It is powered by the [`search-content-author` skill](file:///Users/mac/Desktop/project%20(4)/.agents/skills/search-content-author/SKILL.md) and strictly enforces the internal [Content Quality System](file:///Users/mac/Desktop/project%20(4)/docs/content-quality-system.md) and [Search & AI Visibility Standard](file:///Users/mac/Desktop/project%20(4)/.agents/skills/search-ai-visibility/SKILL.md).

---

## 1. Non-Negotiable Editorial & Factual Constraints

Every content revision must comply with these foundational invariants:

1. **Strict Product Truths:**
   - **Simultaneous Connections:** Strictly 2 simultaneous connections across all plans.
   - **Prepaid Subscription Plans:**
     - 1 Month: $16.00 ($16.00/mo)
     - 3 Months: $39.00 ($13.00/mo)
     - 6 Months: $60.00 ($10.00/mo)
     - 12 Months: $90.00 ($7.50/mo)
   - **Billing Model:** 100% prepaid, non-recurring, no auto-renewal.
   - **Accepted Payment Methods:** Cryptocurrency, PayPal, Stripe.
   - **Free Trial:** 24 Hours, $0 cost, zero credit card requirement.
   - **Credentials Format:** Xtream Codes API (Server URL, Username, Password) + M3U Playlist URL.
   - **Delivery Timeframe:** 5–15 minutes typical delivery window.
   - Sourced from [`src/lib/site-config.ts`](file:///Users/mac/Desktop/project%20(4)/src/lib/site-config.ts) and [`src/lib/site-data/pricing.ts`](file:///Users/mac/Desktop/project%20(4)/src/lib/site-data/pricing.ts).

2. **Zero Fabricated Evidence:**
   - **No fake reviews or testimonials.**
   - **No fake author profiles or invented credentials.**
   - **No fabricated performance benchmarks or synthetic speed test claims.**
   - **No misleading date manipulation** (meaningful updates must represent substantive content changes).

3. **One Topic + One Intent = One Indexable URL:**
   - Mandatory evaluation question before creating or splitting pages:
     > *“What is the one thing this page will solve better than any URL that already exists?”*
   - Reject arbitrary doorway pages, keyword permutators, or thin category variations.

---

## 2. Permitted Improvement Actions

Each page enhancement in the queue must execute strictly one of the 9 authorized actions:

- `add evidence`: Provide verifiable hardware parameters, empirical bandwidth tables, or test procedures.
- `improve diagnostic flow`: Structure troubleshooting into decision trees or step-by-step triage sequences.
- `update volatile facts`: Re-anchor changing figures (pricing, catalog categories, active protocol features).
- `improve answer clarity`: Deliver immediate answer-first summaries for the dominant user query.
- `improve comparison methodology`: Replace subjective claims with standardized, multi-attribute technical matrices.
- `add useful visual evidence`: Add UI callouts, configuration diagrams, or interface instructions.
- `add primary-source citation`: Reference authoritative technical specifications (e.g., RFC 8216 for HLS M3U, XMLTV for EPG).
- `reduce repetition`: Remove generic filler copy and commodity boilerplate.
- `leave unchanged`: Keep pages that already meet quality standards untouched.

---

## 3. Step-by-Step Execution Lifecycle

### Step 1: Select Target URL from Queue
Consult [`REVISED-PAGE-IMPROVEMENT-PRIORITIES.md`](file:///Users/mac/Desktop/project%20(4)/.audit/seo-run-1/REVISED-PAGE-IMPROVEMENT-PRIORITIES.md) and [`CONTENT-IMPROVEMENT-QUEUE.md`](file:///Users/mac/Desktop/project%20(4)/.audit/seo-run-1/CONTENT-IMPROVEMENT-QUEUE.md). Select the highest-priority page that remains unaddressed.

### Step 2: Audit Intent & Scope
1. Open the page source code (under `src/app/` or `src/lib/site-data/`).
2. Identify:
   - Primary user task (e.g., troubleshooting buffering, calculating broadband requirements).
   - Dominant search queries and intent stage (transactional, informational, troubleshooting, onboarding).
   - Existing gaps in evidence, structure, or clarity.

### Step 3: Author Content & Structured Artifacts
1. **Answer-First Summary:** Place an immediate, definitive answer in an `<ArticleSummary>` or top callout box.
2. **Structured Tables / Matrices:** Present complex data (bandwidth concurrency, codec comparisons, player features) in accessible, responsive tables.
3. **Step-by-Step Triage / Workflows:** For troubleshooting or guides, organize steps logically with clear resolution branches.
4. **Preserve Conversions & Tone:** Maintain informative, objective, and transparent technical tone.

### Step 4: Reinforce Internal Links
Check Section 2 of [`CONTENT-IMPROVEMENT-QUEUE.md`](file:///Users/mac/Desktop/project%20(4)/.audit/seo-run-1/CONTENT-IMPROVEMENT-QUEUE.md) for approved contextual anchors.
- Embed descriptive anchor text pointing to relevant child guides, hubs, or commercial gateways.
- Avoid vague anchor text (never use "click here" or "learn more").

### Step 5: Verify Structured Data (Schema.org)
Ensure JSON-LD schemas in the page match rendered content:
- `FAQPage` schema must strictly match the questions and answers displayed in the visible FAQ section.
- `Article` schema must reflect accurate publication and modification dates.
- `BreadcrumbList` schema must follow the proper site hierarchy.

### Step 6: Run Verification & Quality Gates
Execute the automated test and audit suite to verify zero regressions:

```bash
# 1. Typecheck TypeScript invariants
npm run typecheck

# 2. Build production assets to render HTML
npm run build

# 3. Execute internal Content Quality & Link Audit
npm run content:audit
```

Verify that the CLI output confirms:
- `Product truth data conflicts: NONE FOUND`
- `Broken internal targets: NONE FOUND`
- `Duplicate canonical targets: NONE FOUND`
- `Expected one H1: PASS`

---

## 4. Current Execution Queue Reference

1. **Rank 4 (Score: 400 | `add evidence`)** — [`/guides/iptv-internet-speed`](file:///Users/mac/Desktop/project%20(4)/src/app/guides/iptv-internet-speed/page.tsx)
   - Scope: Tabular single vs. 2 simultaneous stream bandwidth matrix + jitter ($<15\text{ms}$) & latency thresholds.
2. **Rank 5 (Score: 400 | `add useful visual evidence`)** — [`/devices/firestick-iptv`](file:///Users/mac/Desktop/project%20(4)/src/lib/site-data/how-to.json)
   - Scope: Fire OS 7 & 8 Developer Options unlock procedure (clicking "About" 7 times).
3. **Rank 6 (Score: 240 | `improve comparison methodology`)** — [`/guides/m3u-vs-xtream-codes`](file:///Users/mac/Desktop/project%20(4)/src/app/guides/m3u-vs-xtream-codes/page.tsx)
   - Scope: Technical comparison matrix for Xtream Codes API vs M3U playlists.
4. **Rank 7 (Score: 192 | `add useful visual evidence`)** — [`/players/tivimate`](file:///Users/mac/Desktop/project%20(4)/src/app/players/tivimate/page.tsx)
   - Scope: Detailed UI setup guide for TiviMate (Xtream Codes login, custom EPG, buffer sizing).
