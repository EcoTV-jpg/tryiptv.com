import { generateProductSchema, organizationId } from '@/lib/schema';
import type { Product } from 'schema-dts';
import { siteConfig } from '@/lib/site-config';
import { plans } from '@/lib/site-data/pricing';

export function getHomePageData() {
  const productSchema: Product = generateProductSchema({
    name: `${siteConfig.name} IPTV Subscription`,
    description: "Prepaid IPTV subscription featuring 25,000+ live channels worldwide, 120,000+ movies and TV shows, HD and 4K streams where available, and 2 simultaneous connections across compatible devices.",
    image: `${siteConfig.url}/api/og`,
    sku: "tryiptv-subscription",
    mpn: "tryiptv-subscription",
    brand: {
      "@id": organizationId,
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: Math.min(...plans.map(p => p.price)).toFixed(2),
      highPrice: Math.max(...plans.map(p => p.price)).toFixed(2),
      offerCount: plans.length,
      offers: plans.map(plan => ({
        "@type": "Offer",
        name: `TryIPTV - ${plan.name} Prepaid Subscription`,
        price: plan.price.toFixed(2),
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: plan.checkoutUrl,
        description: `${plan.name} prepaid IPTV subscription including 2 simultaneous device connections, 25,000+ live channels worldwide, and HD and 4K streams where available.`,
      }))
    }
  });

  return { 
    productSchema
  };
}
