import { unstable_cache as cache } from 'next/cache';
import { plans } from "@/lib/site-data/pricing";
import { pricingPageFaqs } from "@/lib/site-data/pricing-page-faq";
import { generateProductSchema, generateBreadcrumbSchema, organizationId } from "@/lib/schema";
import type { Product, BreadcrumbList } from 'schema-dts';
import { siteConfig } from '../site-config';

// This function fetches and processes all data required for the pricing page in a single, cached operation.
export const getPricingPageData = cache(
  async () => {
    const baseUrl = siteConfig.url;

    const productSchema: Product = generateProductSchema({
      name: "TryIPTV Subscription",
      description: "Prepaid IPTV subscription featuring 25,000+ live channels, 120,000+ movies and TV shows, 4K Ultra HD streaming where available, and 2 simultaneous connections across compatible devices.",
      image: `${siteConfig.url}/api/og`,
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
            "name": `IPTV Subscription - ${plan.name}`,
            "price": plan.price.toFixed(2),
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "url": plan.checkoutUrl,
            "itemCondition": "https://schema.org/NewCondition",
            "seller": {
              "@id": organizationId
            }
        }))
      }
    });

    const breadcrumbSchema: BreadcrumbList = generateBreadcrumbSchema([
        { name: "Home", item: `${baseUrl}/` },
        { name: "Pricing", item: `${baseUrl}/pricing` }
    ]);
    
    return { 
      productSchema,
      breadcrumbSchema,
      pricingPageFaqs,
    };
  },
  // Bump the version when the static data above changes: the data cache outlives rebuilds.
  ['pricing-page-data-v4'], // Unique cache key
  {
    revalidate: 3600, // Revalidate every hour
    tags: ['pages', 'pricing-page'], // Tag for on-demand revalidation
  }
);
