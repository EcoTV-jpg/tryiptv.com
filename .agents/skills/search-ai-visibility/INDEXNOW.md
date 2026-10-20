# IndexNow

## Purpose
Notify participating search engines when a URL is:
- added
- updated
- deleted

## Important limitation
IndexNow is not Google URL submission.
Do not describe it as a way to push URLs into Google.

## Implementation review
Check:
- key file ownership verification
- correct host
- only changed URLs submitted
- canonical URLs submitted
- deleted URLs included when appropriate
- automation after publish/update/delete
- retry/backoff for errors
- no duplicate flood

## Batch
IndexNow supports batch URL submission according to its protocol limits.

## Verification
A 200/202 response means receipt/acceptance state, not guaranteed crawl/index/rank.

## Deployment strategy
Trigger submission only after the production URL is live and returns the intended result.
