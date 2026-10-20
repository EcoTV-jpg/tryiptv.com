# Coverage-led Auditing

## Objective
Audit systematically without turning the process into a generic checklist.

## Unit formation
Prefer deterministic units:
- route/template family
- indexability control
- canonical rule
- sitemap generator
- metadata function
- content cluster
- internal-link component
- structured-data component
- locale/hreflang group
- performance-critical template
- migration/legacy rule set

## Auditor contract
Each auditor must return:
1. Unit reviewed.
2. Exact checks performed.
3. Source/rendered evidence.
4. Candidate findings.
5. Checks that passed.
6. Unknowns/blockers.
7. Suggested next coverage units.

## Candidate bar
A candidate needs:
- concrete affected URL(s) or template;
- a mechanism;
- evidence;
- plausible search/user impact;
- a minimal remediation direction.

Weak:
> “Meta description is 165 characters.”

Stronger:
> “All 420 product pages inherit the same description from the layout, producing non-distinct snippets and removing page-specific value communication. Source path X generates the duplicate. This is a snippet/CTR opportunity, not an indexability blocker.”

## Coverage critic
After each auditing wave, assign a critic to inspect the ledger for:
- unreviewed high-value route families
- controls shared across many pages
- hidden generated routes
- contradictions between code and sitemap
- legacy URLs
- query/facet behavior
- page families with no intent review
- recommendations lacking evidence

## Duplicate finding control
Merge findings that share:
- same root cause
- same fix
- same affected template/control

Keep distinct when one mechanism has materially different remediation or search impact.

## Scope discipline
Do not edit during audit unless explicitly requested.
Do not refactor unrelated code.
Do not “optimize everything.”
