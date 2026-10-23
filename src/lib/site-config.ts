
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
  /** How the two catalogue counts above were produced (owner-confirmed 2026-10-21). Recount and update together. */
  catalogueBasis: "counted from our channel and on-demand lists, October 2026",
  connections: 2,
  trialDuration: "24 Hours",
  trialCost: "$0 (Free, no credit card required)",
  /** The trial includes the same connections as a paid plan (owner-confirmed 2026-10-21). */
  trialConnections: "2 simultaneous connections, same as paid plans",
  activationTime: "5–15 minutes",
  billing: "Prepaid plans, no automatic renewal",
  /** Mirrors /refund-policy (owner-supplied 2026-10-20). Not an unconditional money-back guarantee. */
  refund: {
    /** No fixed refund window: refunds only when a working subscription can't be provided. */
    windowDays: null as number | null,
    summary:
      "Once your subscription is activated and your account details are delivered, all sales are final. A refund is only issued if TryIPTV cannot provide a working subscription, for example if your account is not delivered or the service does not start at all.",
    exclusions: "Refunds are not given for internet issues, device or player incompatibility, or channel changes.",
  },
  support: {
    email: "support@tryiptv.com",
    whatsapp: "https://wa.me/tryiptvcom",
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
  // Canonical two-sentence brand description (reused by BRAND in site-data/brand.ts, schema, manifest, llms.txt).
  description: `TryIPTV is a prepaid IPTV service with ${PRODUCT_TRUTHS.channels} live channels and ${PRODUCT_TRUTHS.vod} movies and TV shows, watched on your own devices through compatible IPTV player apps. Plans start at $${PRODUCT_TRUTHS.plans[0].price.toFixed(0)} with ${PRODUCT_TRUTHS.connections} connections, no automatic renewal and a 24-hour free trial.`,
  links: {
    email: "support@tryiptv.com",
    whatsapp: "https://wa.me/tryiptvcom",
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
