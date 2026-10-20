# SEO Change Risk and Deployment

## High-risk changes
Require explicit validation for:
- URL changes
- redirects
- canonical changes
- robots/noindex
- sitemap generation
- route deletion
- hreflang
- mass metadata generation
- layout changes affecting internal links
- JS/rendering architecture changes

## Before edit
1. Inspect source.
2. Search all shared usages.
3. Identify affected routes.
4. Define expected behavior.
5. Protect unrelated SEO/business/design.
6. Choose minimal diff.

## After edit
- typecheck
- lint
- build
- route/render verification
- inspect generated HTML
- verify status/canonical/robots
- verify sitemap
- review git diff
- revert unrelated changes

## Migration checklist
Create old→new mapping.
Verify:
- one-hop redirects
- no chains
- internal links updated
- canonicals updated
- sitemaps updated
- important backlinks considered
- analytics/GSC annotations
- monitoring after deploy

## Rollback
Document a reversible path for site-wide SEO controls.
