import type {
  Product,
  WebSite,
  Organization,
  FAQPage,
  BreadcrumbList,
  Article,
  HowTo,
  Service,
  Brand,
  Offer,
  AggregateOffer,
  WithContext,
} from 'schema-dts';
import { siteConfig } from '@/lib/site-config';
import { publicBrandSocialLinks } from '@/lib/site-data/socials';

export const organizationId = `${siteConfig.url}/#organization`;
const websiteId = `${siteConfig.url}/#website`;
const organizationReference = {
  '@id': organizationId,
} as const;

// Reusable parts of schemas
const defaultPublisher = organizationReference;

export function generateWebSiteSchema(): WithContext<WebSite> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': websiteId,
    'url': `${siteConfig.url}/`,
    'name': siteConfig.name,
    'alternateName': 'Try IPTV',
    'publisher': organizationReference,
  };
}

export function generateOrganizationSchema(): WithContext<Organization> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': organizationId,
    'name': siteConfig.name,
    'alternateName': 'Try IPTV',
    'url': `${siteConfig.url}/`,
    'logo': {
      '@type': 'ImageObject',
      'url': `${siteConfig.url}/logo.png`,
      'contentUrl': `${siteConfig.url}/logo.png`,
      'width': 1024 as any,
      'height': 1024 as any,
    },
    'sameAs': [...publicBrandSocialLinks],
  };
}

interface ProductSchemaProps {
  name: string;
  description: string;
  image: string;
  price?: string;
  offers?: Offer | AggregateOffer;
  sku?: string;
  mpn?: string;
  brand?: Brand | typeof organizationReference;
}

export function generateProductSchema(props: ProductSchemaProps): WithContext<Product> {
    const { name, description, image, price, offers, sku, mpn, brand } = props;
    
    const offerDetails = offers || (price ? {
        '@type': 'Offer' as const,
        price: price,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock' as const,
        url: `${siteConfig.url}/pricing`,
    } : undefined);

    const schema: WithContext<Product> = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name,
        description,
        image,
        sku,
        mpn,
        brand,
        offers: offerDetails,
    };

    return schema;
}

export function generateFAQPageSchema(mainEntity: { question: string; answer: string }[]): WithContext<FAQPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: mainEntity.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  };
}

export function generateBreadcrumbSchema(itemListElement: { name: string; item: string }[]): WithContext<BreadcrumbList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: itemListElement.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
}

interface ArticleSchemaProps {
    headline: string;
    description: string;
    image?: string;
    dateModified: string;
    authorName?: string;
    publisherName?: string;
    url: string;
}

export function generateArticleSchema(props: ArticleSchemaProps): WithContext<Article> {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: props.headline,
        description: props.description,
        // Recommended Article property. Without a page-specific image, use the site's own OG image
        // endpoint (1200x630 PNG, crawlable via robots.txt) rendered with this article's headline.
        // datePublished is intentionally omitted: no verified publication dates exist.
        image: props.image ?? `${siteConfig.url}${siteConfig.ogImage}?title=${encodeURIComponent(props.headline)}`,
        dateModified: props.dateModified,
        author: organizationReference,
        publisher: defaultPublisher,
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': props.url,
        },
    };
}

interface HowToSchemaProps {
    name: string;
    description: string;
    image?: { url: string; width?: number; height?: number; };
    steps: { name: string; text: string; url: string; }[];
    totalTime?: string;
}

function stripHtml(html: string): string {
    return html
        .replace(/<[^>]+>/g, '')
        .replace(/&amp;/g, '&')
        .replace(/&apos;/g, "'")
        .replace(/&#x27;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .trim();
}

export function generateHowToSchema(props: HowToSchemaProps): WithContext<HowTo> {
    const { name, description, image, steps, totalTime } = props;
    return {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name,
        description,
        image: image ? {
            '@type': 'ImageObject',
            url: image.url,
            width: image.width ? `${image.width}px` : undefined,
            height: image.height ? `${image.height}px` : undefined,
        } : undefined,
        step: steps.map((step, index) => ({
            '@type': 'HowToStep',
            name: step.name,
            text: stripHtml(step.text),
            url: step.url,
            position: index + 1,
        })),
        totalTime: totalTime,
    };
}

interface ServiceSchemaProps {
    serviceType: string;
    providerName: string;
    areaServed?: string;
    name: string;
    description: string;
    offers?: Offer | AggregateOffer;
}

export function generateServiceSchema(props: ServiceSchemaProps): WithContext<Service> {
    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: props.serviceType,
        provider: organizationReference,
        ...(props.areaServed ? { areaServed: props.areaServed } : {}),
        name: props.name,
        description: props.description,
        offers: props.offers
    }
}
