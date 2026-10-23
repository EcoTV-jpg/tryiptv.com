import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site-config';
import { INDEXABLE_ROUTES } from '@/lib/site-routes';
import { PAGE_IMAGES } from '@/lib/site-data/page-images';

const baseUrl = SITE_URL;

/**
 * Canonical sitemap for https://www.tryiptv.com
 *
 * Only includes:
 * - Approved canonical URLs
 * - Pages that return HTTP 200
 * - Pages with real indexable content (indexable: true in site-routes.ts)
 *
 * Excluded:
 * - noindex pages (indexable: false)
 * - redirects
 * - 404 / 410 pages
 * - API endpoints
 * - /thank-you (noindex technical page)
 *
 * Conforms to modern SEO best practices:
 * - Emits clean <loc> and truthful <lastmod>
 * - Omits deprecated/ignored priority and changefreq tags
 *
 * Source of truth: src/lib/site-routes.ts
 * Do NOT add URLs here manually — update site-routes.ts instead.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return INDEXABLE_ROUTES.map((route) => ({
    url: route.path === '/' ? baseUrl : `${baseUrl}${route.path}`,
    // Date-only (YYYY-MM-DD) as stored: no invented time of day.
    lastModified: route.lastModified,
    // Image sitemap entries (Google Images) for pages with real content images.
    ...(PAGE_IMAGES[route.path] ? { images: PAGE_IMAGES[route.path].map((src) => `${baseUrl}${src}`) } : {}),
  }));
}
