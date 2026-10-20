# SEO Audit Classes

Route each audit unit to one or more modules.

1. `CRAWL-INDEX-CANONICAL.md`
2. `TECHNICAL-SEO.md`
3. `NEXTJS-SEO.md`
4. `CONTENT-AND-INTENT.md`
5. `INTERNAL-LINKING-AND-ARCHITECTURE.md`
6. `STRUCTURED-DATA.md`
7. `PERFORMANCE-AND-CWV.md`
8. `AI-SEARCH-AND-GEO.md`
9. `E-E-A-T-AND-TRUST.md`
10. `INTERNATIONAL-SEO.md`
11. `SEARCH-CONSOLE-AND-MEASUREMENT.md`
12. `CHANGE-RISK-AND-DEPLOYMENT.md`

## Wildcard pass
Always include one wildcard auditor:
> Find consequential SEO risks not represented by the predefined classes. Prefer root causes affecting important templates or discovery paths. Do not create findings from stylistic preference alone.

## Obvious-things pass
Check basic failures explicitly:
- accidental `noindex`
- blocked important routes
- wrong canonical host/path
- redirect loops/chains
- 200 soft-404s
- indexable staging/test routes
- sitemap URLs that redirect/error/noindex
- missing indexable pages from sitemap
- duplicated titles from template bugs
- empty or client-only primary content
- broken internal navigation
- structured data copied to wrong page types
