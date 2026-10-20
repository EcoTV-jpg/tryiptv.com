# Technical SEO

Inspect source and rendered output for:

## HTTP and HTML
- meaningful status codes
- `<title>`
- meta description
- canonical
- robots
- viewport
- language declaration
- headings
- primary content in HTML/rendered DOM
- internal anchors with crawlable hrefs
- image alt where semantically needed

## Duplication and templates
Detect:
- site-wide default titles/descriptions leaking into routes
- duplicated H1 caused by shared components
- boilerplate overwhelming unique content
- accidental copy/paste sections
- template content mismatching URL intent

## JavaScript
Flag only when evidence shows:
- primary content unavailable without execution and not reliably rendered
- links are non-anchor click handlers
- metadata changes only client-side
- hydration errors remove content/links
- lazy loading prevents meaningful content discovery

## Error semantics
Inspect:
- custom 404 returning 200
- deleted content returning 200
- invalid slugs producing thin 200 templates
- redirect-to-home for all missing URLs
- 500/503 behavior

## URL normalization
Check:
- lowercase policy
- duplicate slash
- trailing slash
- percent encoding
- query parameter policy
- hostname variants
