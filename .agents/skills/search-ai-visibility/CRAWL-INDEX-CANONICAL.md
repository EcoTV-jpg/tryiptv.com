# Crawl, Indexing, Canonicals, Robots, Sitemaps

## Crawlability
Inspect:
- robots.txt groups and precedence
- disallow/allow patterns
- important CSS/JS blocking where relevant
- auth/cookie walls
- status codes
- crawl traps from parameters/calendars/search/facets
- infinite URL spaces

## Indexability
Inspect:
- meta robots
- X-Robots-Tag
- rendered directives
- canonical interaction
- status code
- content availability
- sitemap inclusion

Do not equate “crawlable” with “indexable.”

## Canonicals
Verify:
- self-canonical for intended primary URLs
- absolute, normalized URL
- protocol/host consistency
- correct handling of tracking params
- no canonical to redirect/404/noindex
- pagination/locale/product variants are deliberate
- source canonical matches rendered canonical

Do not use canonical as the primary fix for pages that actually represent different intents.

## Redirects
Check:
- 301/308 for durable moves
- chains/loops
- redirected sitemap URLs
- legacy equivalents
- internal links to redirected URLs
- hostname/protocol normalization

## Sitemaps
For every URL:
- intended indexability
- 200 status
- canonical target agreement
- correct lastmod semantics where used
- no staging/utility/noindex/redirect/404 URLs

## Verdict examples
Confirmed:
- sitemap emits old `/pricing` while permanent redirect targets `/iptv-pricing`, and all internal links use new URL.

Needs validation:
- suspected Google-selected canonical mismatch but GSC URL Inspection is unavailable.

Rejected:
- duplicate URL variant exists in source but middleware deterministically redirects before content response.
