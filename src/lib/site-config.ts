
export const SITE_URL = "https://www.tryiptv.com";

export const PRODUCT_TRUTHS = {
  brand: "TryIPTV",
  domain: SITE_URL,
  channels: "25,000+",
  vod: "120,000+",
  connections: 2,
  trialDuration: "24 Hours",
  trialCost: "$0 (Free, no credit card required)",
  activationTime: "5–15 minutes",
  billing: "Prepaid plans, no automatic renewal",
  paymentMethods: [
    "Cryptocurrency",
    "PayPal",
    "Stripe",
  ] as const,
  plans: [
    { duration: "1 Month", price: 16.00, monthlyEquivalent: 16.00 },
    { duration: "3 Months", price: 39.00, monthlyEquivalent: 13.00 },
    { duration: "6 Months", price: 60.00, monthlyEquivalent: 10.00 },
    { duration: "12 Months", price: 90.00, monthlyEquivalent: 7.50 },
  ],
} as const;

export const siteConfig = {
  name: "TryIPTV",
  url: SITE_URL,
  ogImage: "/api/og",
  description: "TryIPTV is a premier prepaid IPTV service featuring 25,000+ live channels worldwide, sports, and 120,000+ movies and TV shows in 4K Ultra HD across compatible devices and supported player apps. Plans start at $16 with a 24-hour free trial available.",
  links: {
    email: "support@tryiptv.com",
    whatsapp: "+15205648298",
  },
} as const;

export type SiteConfig = typeof siteConfig;

// Helper for generating page-specific metadata
export function generateMetadata({
  title,
  description,
  image,
  noIndex = false,
  canonical,
}: {
  title: string;
  description: string;
  image?: string;
  noIndex?: boolean;
  canonical?: string;
}) {
  const ogImageUrl = image || `${siteConfig.url}${siteConfig.ogImage}?title=${encodeURIComponent(title)}`;
  const canonicalUrl = canonical ? `${siteConfig.url}${canonical}` : undefined;
  
  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    // Page-level openGraph replaces the layout's object rather than merging
    // with it, so repeat the type and locale here or they are dropped.
    openGraph: {
      type: 'website' as const,
      locale: 'en_US',
      title,
      description,
      url: canonicalUrl || siteConfig.url,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
    robots: noIndex
      ? { index: false, follow: true }
      : { index: true, follow: true },
  };
}
