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
      {
        userAgent: '*',
        allow: publicAllow,
        disallow: standardDisallow,
      },
      {
        userAgent: 'Googlebot',
        allow: publicAllow,
        disallow: standardDisallow,
      },
      {
        userAgent: 'Googlebot-Image',
        allow: publicAllow,
        disallow: standardDisallow,
      },
      {
        userAgent: 'Bingbot',
        allow: publicAllow,
        disallow: standardDisallow,
      },
      {
        userAgent: 'OAI-SearchBot',
        allow: publicAllow,
        disallow: standardDisallow,
      },
      {
        userAgent: 'GPTBot',
        allow: aiDiscoveryAllow,
        disallow: ['/'],
      },
      {
        userAgent: 'ChatGPT-User',
        allow: publicAllow,
        disallow: standardDisallow,
      },
      {
        userAgent: 'Google-Extended',
        allow: publicAllow,
        disallow: standardDisallow,
      },
      {
        userAgent: 'ClaudeBot',
        allow: publicAllow,
        disallow: standardDisallow,
      },
      {
        userAgent: 'Claude-User',
        allow: publicAllow,
        disallow: standardDisallow,
      },
      {
        userAgent: 'Claude-SearchBot',
        allow: publicAllow,
        disallow: standardDisallow,
      },
      {
        userAgent: 'PerplexityBot',
        allow: publicAllow,
        disallow: standardDisallow,
      },
      // Search/citation bots also covered by '*', listed so the policy is explicit.
      // Perplexity-User generally ignores robots.txt; Applebot powers Siri/Spotlight search.
      {
        userAgent: 'Perplexity-User',
        allow: publicAllow,
        disallow: standardDisallow,
      },
      {
        userAgent: 'Applebot',
        allow: publicAllow,
        disallow: standardDisallow,
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: new URL(siteUrl).host,
  };
}
