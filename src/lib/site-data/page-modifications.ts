/**
 * @file page-modifications.ts
 * @description Legacy helper — retained only for formatLegalDate() used by legal pages.
 *
 * IMPORTANT: The canonical route registry has moved to src/lib/site-routes.ts.
 * Do NOT add new routes here. STATIC_ROUTES and PAGE_LAST_MODIFIED are kept
 * only for backward compatibility with legal page rendering logic.
 *
 * TRUTHFUL LASTMOD ARCHITECTURE RULES:
 * 1. A route's lastModified date MUST represent the date when meaningful, indexable
 *    content on that specific URL was actually updated.
 * 2. DO NOT update dates for technical/infrastructure refactors.
 * 3. NEVER use dynamic timestamps (new Date(), Date.now(), or CI/CD build times).
 *
 * All sitemap and SEO route data now lives in src/lib/site-routes.ts.
 */

/** @deprecated Use SITE_ROUTES from src/lib/site-routes.ts instead. */
export const STATIC_ROUTES = [
  '/',
  '/pricing',
  '/iptv-free-trial',
  '/devices',
  '/faq',
  '/contact-us',
  '/privacy-policy',
  '/terms-conditions',
  '/refund-policy',
  '/disclaimer',
  '/dmca-report',
] as const;

export type StaticRoute = (typeof STATIC_ROUTES)[number];

/**
 * Verified last modification dates for legal pages.
 * Legal pages read this to render their "Last Updated" notice.
 * Format: YYYY-MM-DD
 */
export const PAGE_LAST_MODIFIED: Record<string, string> = {
  '/': '2026-09-30',
  '/pricing': '2026-09-30',
  '/iptv-free-trial': '2026-09-30',
  '/devices': '2026-09-30',
  '/faq': '2026-09-29',
  '/contact-us': '2026-09-29',
  '/privacy-policy': '2026-03-01',
  '/terms-conditions': '2026-03-01',
  '/refund-policy': '2026-03-01',
  '/disclaimer': '2026-03-01',
  '/dmca-report': '2026-03-01',
};

/**
 * Formats a YYYY-MM-DD date string into a human-readable "Month YYYY" string
 * using UTC to prevent timezone boundary discrepancies.
 *
 * Example: "2026-03-01" -> "March 2026"
 */
export function formatLegalDate(dateString: string): string {
  const date = new Date(`${dateString}T00:00:00Z`);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
