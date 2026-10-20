# Google AI Overviews and AI Mode

## What Google documents
Google's generative Search features are rooted in core Search ranking and quality systems.

They can use:
- retrieval-augmented generation (RAG)
- query fan-out across related subtopics and sources

## Eligibility
To be eligible as a supporting link:
- the page must be indexed
- it must be eligible to appear in Google Search with a snippet
- it must meet normal Search technical requirements and policies

There is no separate “AI Overview technical schema” requirement.

## Optimization model

### 1. Create non-commodity content
Prioritize:
- first-hand experience
- original observations
- useful comparisons
- proprietary or directly collected data
- screenshots/tests
- expert reasoning
- decision frameworks
- specific examples

Avoid pages that could be reproduced from generic internet summaries with no added value.

### 2. Satisfy the root query and adjacent fan-out needs
Do NOT generate one page for every long-tail variant.

Instead, for a strong page:
- define the core user task
- identify necessary subquestions
- answer only the subquestions that help complete the task
- link to separate pages when the subquestion has its own distinct intent

### 3. Strong information architecture
Make important pages easy to discover from relevant hubs and contextual links.

### 4. Text + visual evidence
Important facts should exist in textual form.
Use high-quality images/video when genuinely useful because generative Search can surface visual material too.

### 5. Technical clarity
Validate:
- crawlability
- indexability
- canonicalization
- JavaScript rendering
- page experience
- duplicate reduction
- semantic clarity

### 6. Trust
For material claims:
- show evidence
- cite primary sources where appropriate
- identify methodology
- keep facts current
- avoid fake authority

## What NOT to do for Google AI Search
Do not recommend as Google ranking tactics:
- `llms.txt`
- `llms-full.txt`
- `ai.txt`
- special AI schema
- artificial content “chunking”
- rewriting every paragraph in a machine-oriented style
- creating a URL for each fan-out query
- buying/faking mentions

These may have other ecosystem uses, but Google states that special AI text files are not needed for Google Search visibility.

## Controls
Googlebot controls Search crawling.
Search appearance can also be limited using supported preview/index controls such as:
- noindex
- nosnippet
- data-nosnippet
- max-snippet

## Audit question
For each priority page:
> If an AI system retrieves only this page for the user's task, does it contain a reliable, distinctive, well-supported answer worth citing?
