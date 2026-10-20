# ChatGPT Search Visibility

Use official OpenAI publisher guidance for crawler controls.

## Discoverability
For a public site to be eligible for content inclusion in ChatGPT search summaries/snippets, do not block `OAI-SearchBot` if you want that access.

## Search vs training
Treat these as separate controls:
- `OAI-SearchBot` — search discovery/surfacing
- `GPTBot` — model-training related crawler control

Do not block/search-optimize one assuming it controls the other.

## Robots review
Audit `robots.txt` for:
- accidental `OAI-SearchBot` block
- broad wildcard rules affecting it
- CDN/WAF blocks
- intended training preference separately

## Index controls
If the site owner does not want a page surfaced through search, use supported indexing controls appropriately. Remember crawlers generally need access to read page-level meta controls.

## Referral measurement
Track ChatGPT referrals in analytics where available.

## Content readiness
No official “ChatGPT ranking formula” should be invented.
Use defensible principles:
- public access
- crawlability
- strong relevance
- distinctive factual content
- clear entities
- citations/evidence
- accessible HTML
- stable canonical URLs

## Agent/browser compatibility
For interactive sites, accessibility semantics can also improve machine interaction:
- ARIA labels
- correct roles/states
- descriptive controls
- usable forms
