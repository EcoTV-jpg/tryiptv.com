# AI Crawler Matrix

This file is a control/audit matrix, not a ranking-factor list.

| Ecosystem | Discovery/search control | Training control | Notes |
|---|---|---|---|
| Google Search / AI features | Googlebot + Search index controls | Google-Extended applies to some non-Search AI uses | AI Overviews/AI Mode are part of Search; no special AI file needed |
| ChatGPT Search | OAI-SearchBot | GPTBot | Keep search and training preferences separate |
| Anthropic/Claude | Check current Claude user/search bot documentation | ClaudeBot | Re-check official bot names before production changes |
| Bing/Copilot | Bing crawl/index controls; sitemaps; IndexNow | varies by Microsoft service | Measure AI citations in Bing Webmaster Tools |

## Required audit
For every bot/control change:
1. Check current first-party documentation.
2. Record intended product effect.
3. Verify robots syntax.
4. Verify CDN/WAF behavior.
5. Re-test after deployment.

Never copy a stale “allow all AI bots” list from an SEO blog.
