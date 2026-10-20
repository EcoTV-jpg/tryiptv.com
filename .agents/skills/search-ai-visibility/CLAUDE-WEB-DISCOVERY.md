# Claude / Anthropic Web Discovery

Anthropic documents separate bot purposes.

## Bot intent separation
Audit current Anthropic documentation before changing controls.

Documented categories include:
- a training-oriented crawler (`ClaudeBot`)
- user-directed retrieval bot(s), such as `Claude-User`
- web-search related behavior depending on current product implementation

## Robots
Anthropic documents respecting robots.txt directives.

Do not block a training crawler and assume that this necessarily means the same behavior for user-directed search/retrieval.

## Search visibility
Anthropic also documents that `noindex` can affect whether search partners index content that may be returned to Claude web-search experiences.

## Optimization
There is no defensible public “Claude SEO ranking factor” list.
Use:
- crawl/index availability
- public accessibility
- factual clarity
- source quality
- differentiated content
- precise entities
- useful structure

Label any additional tactic as a heuristic unless Anthropic officially documents it.
