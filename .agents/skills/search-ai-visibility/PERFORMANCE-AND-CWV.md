# Performance and Core Web Vitals

## Evidence hierarchy
Prefer:
1. real-user field data (CrUX/GSC)
2. repeatable lab measurements
3. source-level performance risks

Do not treat one Lighthouse run as universal field performance.

## Evaluate
- LCP
- INP
- CLS
- TTFB
- render-blocking resources
- oversized hero media
- font strategy
- JS execution
- third-party scripts
- hydration cost
- image dimensions/priority
- caching/CDN

## SEO relevance
A performance issue becomes an SEO finding when:
- important templates consistently fail field thresholds, or
- a source problem clearly risks usability/discovery at scale.

Separate:
- ranking/page-experience concern
- conversion concern
- engineering performance concern

## Next.js
Inspect:
- `next/image`
- image `sizes`
- priority/preload
- server/client component boundaries
- dynamic imports
- font loading
- route-level JS
