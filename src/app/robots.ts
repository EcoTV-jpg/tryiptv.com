import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site-config';

/**
 * Robots.txt configuration for https://www.tryiptv.com
 *
 * Allow rules: content pages, brand assets, OG image endpoint.
 * Disallow rules: API routes, admin, staging.
 *
 * NOTE: Noindex pages (players/*, guides/*, help/*, etc.) are NOT disallowed here.
 * Robots.txt controls crawlability; the <meta robots> tag and x-robots-tag
 * control indexability. We allow crawling of all content paths so bots can
 * discover internal links, even for pages that are temporarily noindex.
 */
const standardAllow = [
  '/',
  '/api/og',
  '/devices/',
  '/players/',
  '/guides/',
  '/help/',
];
const brandAssetAllow = [
  '/favicon.ico',
  '/favicon-16x16.png',
  '/favicon-32x32.png',
  '/favicon-48x48.png',
  '/apple-touch-icon.png',
  '/icon-192.png',
  '/icon-512.png',
  '/logo.png',
  '/brand-logo-square.png',
  '/site.webmanifest',
  '/manifest.json',
];
const aiDiscoveryAllow = [
  '/llms.txt',
  '/llms-full.txt',
  '/ai.txt',
];
const publicAllow = [...standardAllow, ...brandAssetAllow, ...aiDiscoveryAllow];
const standardDisallow = ['/api/', '/admin/', '/staging/'];
 
export default function robots(): MetadataRoute.Robots {
  const siteUrl = SITE_URL;
  
  return {
    rules: [
      // One group with every crawler named, so the policy stays explicit without repeating the rules.
      // Perplexity-User generally ignores robots.txt; Applebot powers Siri/Spotlight search.
      {
        userAgent: [
          '*',
          'Googlebot',
          'Googlebot-Image',
          'Bingbot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'Google-Extended',
          'ClaudeBot',
          'Claude-User',
          'Claude-SearchBot',
          'PerplexityBot',
          'Perplexity-User',
          'Applebot',
        ],
        allow: publicAllow,
        disallow: standardDisallow,
      },
      // Model training: only the AI discovery files.
      {
        userAgent: 'GPTBot',
        allow: aiDiscoveryAllow,
        disallow: ['/'],
      },
    ],
    // No `host`: the Host directive is Yandex-only; Google and Bing ignore it.
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
