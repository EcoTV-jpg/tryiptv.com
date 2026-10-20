# Validation and Reporting

## Phase 3 — Validate candidates

For each candidate launch a fresh verifier.

Prompt:

> You are an independent SEO verifier. Try to disprove this candidate. Re-open the source/rendered evidence. Check whether the affected URL is actually intended to index/rank. Look for alternate controls (redirect, canonical, noindex, generated metadata, middleware). Distinguish Google requirement/recommendation from heuristic. Return confirmed, needs_validation, or rejected with evidence.

### Confirmed
Requires:
- exact scope
- exact mechanism
- evidence
- plausible impact
- minimal remediation
- confidence

### Needs validation
Use when a decisive fact is unavailable.
No false certainty.
State blockers and validation plan.

### Rejected
Keep the record so repeated runs do not rediscover the same false positive.

## Phase 4 — Structured output
Write `findings.json`.

## Phase 5 — Record verification
Fresh verifier checks:
- file/URL references
- evidence
- affected scope
- current source
- remediation compatibility
- priority rationale

## Phase 6 — REPORT.md

Recommended structure:

# SEO Audit Report

## Executive summary
- audited ref/date
- coverage
- critical/high findings
- biggest opportunity
- biggest deployment risk

## Search-impact map
| Area | Status | Impact | Confidence |
|---|---|---:|---:|

## Priority findings
For each:
- title
- URLs/templates
- why it matters
- evidence
- root cause
- smallest fix
- validation
- rollback/risk

## Page-family matrix
Summarize commercial, informational, device, player, support, blog, locale families.

## Cannibalization map
List only evidence-backed overlaps.

## Implementation queue
Order by:
1. indexability/crawl blockers
2. canonical/redirect architecture
3. broken templates/rendering
4. intent/cannibalization
5. internal architecture
6. structured data correctness
7. snippets/CTR
8. performance
9. enhancements/experiments

## Intentionally unchanged
Record things reviewed and deliberately left alone.

## Needs validation
Exact missing evidence and next check.

## Regression tests
Tests/checks to prevent recurrence.
