# Master Search + AI Visibility Audit Prompt

Perform a full Search + AI Visibility audit.

## Source hierarchy
Use current official documentation first:
1. Google Search Central/Search Console
2. Bing Webmaster/IndexNow
3. OpenAI publisher/crawler docs
4. Anthropic crawler/web-search docs
5. first-party site data
6. controlled experiments
7. industry heuristics only when clearly labeled

Re-check time-sensitive platform guidance before making production changes.

## Google
Audit:
- Search Essentials
- crawl/index/canonical
- sitemaps
- robots
- rendering/JavaScript
- titles/snippets
- internal linking
- page experience/CWV
- structured data eligibility/correctness
- image/video SEO
- people-first content
- generative AI content quality
- AI Overviews
- AI Mode
- RAG/query fan-out implications
- multimodal search
- Search Console measurement

Do not create special AI markup for Google.
Do not claim llms.txt helps Google.

## Bing/Copilot
Audit:
- crawl/index
- sitemap
- canonicals
- duplicate content
- IndexNow
- AI citation visibility
- grounding queries
- intents/topics
- citation share where data is available

## ChatGPT
Audit:
- OAI-SearchBot access
- separate GPTBot training preference
- robots/CDN/WAF
- public accessibility
- referral measurement

## Claude
Audit current official bot/search controls and robots behavior.
Do not invent a ranking formula.

## Content
Enforce:
- one topic + one intent = one indexable URL
- every page has a unique job
- no commodity mass content
- original evidence where it materially improves the answer
- no fake E-E-A-T
- no fake freshness
- no unsupported claims

Before creating a URL answer:
“What is the one thing this page will solve better than any URL that already exists?”

## AI citation readiness
For important pages assess:
- direct answer quality
- unique value
- evidence
- sourceability
- entity clarity
- factual consistency
- headings/structure
- useful tables
- relevant visuals
- fresh volatile facts
- crawl/index eligibility

## Output
Produce:
- platform-source ledger
- route/intent inventory
- coverage ledger
- confirmed findings
- needs-validation findings
- rejected false positives
- cannibalization map
- AI citation readiness matrix
- crawler-control matrix
- Google/Bing/Search/AI implementation queue
- measurement plan
- regression tests
