# Next.js SEO

## Detect architecture
Identify:
- Next.js version
- App Router or Pages Router
- static vs dynamic rendering
- `generateMetadata`
- `metadata`
- `generateStaticParams`
- `robots.ts`
- `sitemap.ts`
- middleware
- redirects/rewrites in config
- route handlers
- `notFound()`
- caching/revalidation

## Metadata checks
Verify:
- route-specific metadata does not silently inherit wrong defaults
- canonical resolves to public production URL
- metadataBase is correct
- alternates/hreflang are intentional
- OpenGraph/Twitter does not substitute for search metadata
- dynamic slugs generate stable titles/canonicals
- no client component is responsible for critical metadata

## Rendering
Inspect whether important pages are:
- prerendered
- dynamically rendered
- client-only

Client components are not automatically an SEO problem. Confirm actual HTML/rendered content.

## Redirects and middleware
Check:
- locale redirects
- hostname redirects
- `/` redirects
- legacy redirects
- matcher scope
- redirect chains caused by config + middleware duplication

## Sitemaps
If generated:
- route set equals intended indexable inventory
- draft/noindex routes excluded
- canonical URLs used
- correct host
- stable lastmod source

## Error handling
Confirm invalid dynamic routes use `notFound()`/404 semantics rather than thin 200 pages.

## Deployment
Check Vercel/runtime differences:
- preview/staging indexing controls
- environment-derived metadataBase
- cached stale metadata
- edge middleware behavior
