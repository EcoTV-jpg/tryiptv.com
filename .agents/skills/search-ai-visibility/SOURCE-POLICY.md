# Source Policy and Evidence Grades

This skill must separate official guidance, observed evidence, and hypotheses.

## Evidence grades

### Grade A — Official platform documentation
Examples:
- Google Search Central / Search Console documentation
- Bing Webmaster / IndexNow documentation
- OpenAI publisher/crawler documentation
- Anthropic crawler/web-search documentation

Use for platform capabilities, eligibility, directives, supported controls, and documented reporting.

### Grade B — First-party measurements from the audited site
Examples:
- Google Search Console
- Bing Webmaster Tools
- server logs
- analytics
- CrUX
- crawl/render tests
- production HTML and headers

Use for site-specific diagnosis.

### Grade C — Reproducible experiments
Controlled tests with a documented setup, date, sample, and limitations.

### Grade D — Industry heuristic
Useful idea with no direct official confirmation. Never present as a ranking factor.

### Grade E — Speculation
Do not make implementation decisions from this alone.

## Mandatory labeling

Every recommendation in a full audit must state one of:
- `official_requirement`
- `official_recommendation`
- `site_evidence`
- `experiment`
- `heuristic`

Never say “Google ranking factor” unless official documentation clearly supports that claim.

## Freshness

For platform-specific claims:
1. Prefer the newest official documentation.
2. Record `source_date_checked`.
3. If the guidance could have changed, re-check before a material implementation.
4. Do not preserve outdated myths because they were common SEO practice.

## Anti-myth rules

Never claim:
- keyword density targets
- fixed ideal word count
- exact title/meta length as a ranking rule
- llms.txt helps Google rankings
- schema markup directly increases rankings
- FAQ schema is required for AI Overviews
- IndexNow submits URLs to Google
- E-E-A-T is one direct ranking factor
- AI-written content is automatically penalized
- passing Lighthouse guarantees ranking
