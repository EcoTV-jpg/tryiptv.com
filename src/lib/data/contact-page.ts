import { unstable_cache as cache } from 'next/cache';
import { generateBreadcrumbSchema } from '@/lib/schema';
import type { BreadcrumbList } from 'schema-dts';
import { siteConfig } from '@/lib/site-config';

// This function fetches and processes all data required for the contact page in a single, cached operation.
export const getContactPageData = cache(
  async () => {
    const baseUrl = siteConfig.url;

    const breadcrumbSchema: BreadcrumbList = generateBreadcrumbSchema([
        { name: "Home", item: `${baseUrl}/` },
        { name: "Contact Us", item: `${baseUrl}/contact-us` }
    ]);

    return { 
      breadcrumbSchema,
    };
  },
  ['contact-page-data'], // Unique cache key
  {
    revalidate: 3600, // Revalidate every hour
    tags: ['pages', 'contact-page'], // Tag for on-demand revalidation
  }
);
