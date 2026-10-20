
export const SITE_URL = "https://www.tryiptv.com";

/**
 * Single source of truth for every product fact the site states (prices, catalogue size,
 * connections, trial, delivery, refunds, support). Pages, structured data and the facts
 * check (`npm run check:facts`, which also covers public/llms*.txt and ai.txt) read from here;
 * change a fact here first, then fix anything the check reports.
 */
export const PRODUCT_TRUTHS = {
  brand: "TryIPTV",
  domain: SITE_URL,
  channels: "25,000+",
  vod: "120,000+",
  connections: 2,
  trialDuration: "24 Hours",
  trialCost: "$0 (Free, no credit card required)",
  /** The trial page states the trial's connection limit is confirmed when credentials are issued. */
  trialConnections: "Confirmed when trial credentials are issued",
  activationTime: "5–15 minutes",
  billing: "Prepaid plans, no automatic renewal",
  /** Mirrors /refund-policy §2–4. Not an unconditional money-back guarantee. */
  refund: {
    windowDays: 7,
    summary:
      "If support cannot resolve a critical technical defect within 7 days of purchase, you may be eligible for a full or partial refund or service credit.",
  },
  support: {
    email: "support@tryiptv.com",
    whatsapp: "+15205648298",
  },
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

const usd = (n: number) => `$${Number.isInteger(n) ? n : n.toFixed(2)}`;

/** Ready-made phrases built from PRODUCT_TRUTHS, for copy that states prices or limits. */
export const FACT_TEXT = {
  /** "$16 for 1 month, $39 for 3 months, $60 for 6 months, or $90 for 12 months" */
  priceList: PRODUCT_TRUTHS.plans
    .map((p, i, all) => `${i === all.length - 1 ? "or " : ""}${usd(p.price)} for ${p.duration.toLowerCase()}`)
    .join(", "),
  fromPrice: usd(Math.min(...PRODUCT_TRUTHS.plans.map((p) => p.price))),
  lowestMonthly: usd(Math.min(...PRODUCT_TRUTHS.plans.map((p) => p.monthlyEquivalent))),
  trialHours: parseInt(PRODUCT_TRUTHS.trialDuration, 10),
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
