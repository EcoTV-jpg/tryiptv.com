/**
 * Company, trust and licensing facts. Every value here is either confirmed by the owner or `null`.
 *
 * Rules (Google QRG §4.5.3 rates invented addresses, authors or testing claims "Lowest"; Google's
 * helpful-content guide calls fabricated creator profiles "a form of deception"):
 * - Never fill a field with a guess. Leave it `null` until the owner confirms it.
 * - Each `null` carries its question in CONFIRM_QUESTIONS. In production an unconfirmed fact is simply
 *   not rendered; on Preview/dev builds it shows as a visible [CONFIRM] marker (see <Confirm>).
 * - Pages that would consist only of unconfirmed claims (licensing, how we test, author profiles)
 *   return 404 in production and stay out of the sitemap until confirmed.
 */

/** True on Vercel Preview and local dev: unconfirmed facts render as [CONFIRM] markers. */
export const SHOW_CONFIRM_MARKERS = process.env.VERCEL_ENV !== "production";

export const COMPANY = {
  /** Brand name, as used everywhere (Bing §16: one consistent entity name). */
  brand: "TryIPTV",
  /** Confirmed by the owner 2026-10-21. */
  legalName: "Simo Alaoui LLC" as string | null,
  /** Confirmed 2026-10-21. Shown on /about and /press; the registry is not yet confirmed (`registry`). */
  registrationNumber: "8683949" as string | null,
  /** Confirmed 2026-10-21. (Its Albany address is the registry's own office, not TryIPTV's: never use it as `address`.) */
  registry: "New York Department of State" as string | null,
  vatOrTaxId: null as string | null,
  /** Only if the owner wants a postal/registered address published. Never a virtual or invented one. */
  address: null as { street: string; locality: string; postalCode: string; country: string } | null,
  /** Country/city to state in prose, e.g. "Toronto, Canada". */
  location: "New York, United States" as string | null,
  /** Region-level location for schema PostalAddress (no street address is published). */
  area: { region: "New York", country: "US" } as { region: string; country: string } | null,
  /** ISO year the service started, e.g. "2021". */
  /** Confirmed 2026-10-21. */
  foundingYear: "2021" as string | null,
  /** 2–4 sentence company story in the owner's words. */
  /** Owner-approved 2026-10-21. */
  story:
    "TryIPTV started with a simple goal: make IPTV easier to set up and easier to understand, for people tired of confusing instructions and service they couldn't rely on. We built it around simple prepaid plans, wide device compatibility, step-by-step setup guides and support you can actually reach. We keep refining the experience, so that getting started, and managing a subscription afterwards, takes as little effort as possible." as string | null,
  /** Owner-approved short "About TryIPTV" (homepage FAQ, footer). Keep in sync with PRODUCT_TRUTHS. */
  summary:
    "TryIPTV is an IPTV subscription service operated by Simo Alaoui LLC, based in New York, United States. You watch on your own devices through a compatible IPTV player app." as string | null,
  /** People who may be named publicly. Only real people who agreed to be listed. */
  team: [
    {
      name: "Simo Alaoui",
      role: "Founder / Operations",
      bio: "Simo Alaoui oversees TryIPTV's operations, customer experience and service development.",
    },
  ] as { name: string; role: string; bio?: string }[],
  support: {
    email: "support@tryiptv.com",
    whatsappDisplay: "+1 (520) 564-8298",
    whatsappUrl: "https://wa.me/15205648298",
    /** Owner-supplied 2026-10-20 (DMCA page text); confirm the inbox exists (eeat-confirm Q13). */
    dmcaEmail: "care@tryiptv.com",
    /** Confirmed 2026-10-21: same hours for WhatsApp and email. */
    hours: "9:00 AM–10:00 PM ET, every day" as string | null,
    /** Confirmed 2026-10-21. Stated once next to the hours, not repeated in every mention. */
    coverage: "Support is open every day, including weekends and public holidays." as string | null,
    /** Machine-readable form of `hours` for schema ContactPoint.hoursAvailable. */
    hoursSpec: { opens: "09:00", closes: "22:00", timeZone: "America/New_York" } as { opens: string; closes: string; timeZone: string } | null,
    /** e.g. "Most WhatsApp messages are answered within 1 hour; email within 24 hours." */
    /** Confirmed 2026-10-21 (15 minutes). How out-of-hours messages are handled is still open (eeat-confirm Q69). */
    responseTime: "Typically within 15 minutes on WhatsApp and email, during support hours" as string | null,
    /** Confirmed 2026-10-21. */
    outOfHours: "Messages received outside support hours are queued and answered when support reopens." as string | null,
    languages: null as string | null,
    /** Media contact for /press, e.g. "press@tryiptv.com" — must be a real, monitored inbox. */
    pressEmail: null as string | null,
  },
  /** Confirmed: "User business specification: Cryptocurrency, PayPal, Stripe (2026-10-09)" (content-quality registry). */
  paymentMethods: "cryptocurrency, PayPal and Stripe" as string | null,
  /** Governing law for the Terms, e.g. "the laws of Ontario, Canada". */
  /** Owner-supplied 2026-10-21 (exact wording, shown in Terms §17). */
  governingLaw:
    "These Terms are governed by the laws of the State of New York, United States, without regard to conflict-of-law principles. Any dispute arising out of or relating to these Terms or the use of TryIPTV will be subject to the exclusive jurisdiction of the state and federal courts located in New York, United States." as string | null,
  /** Name and postal address of the DMCA designated agent, and whether it is registered with the US Copyright Office. */
  dmcaAgent: null as { name: string; address: string; registeredWithUSCO: boolean } | null,
  /** Confirmed by the owner on 2026-10-20 (exact wording). Shown on /dmca-report. */
  dmcaTakedownTarget: "Our target takedown time after receiving and validating a valid copyright notice is within 5 minutes." as string | null,
} as const;

/**
 * Content-rights statement. Each line is shown only once `confirmed` is true for it.
 * The wording is a neutral draft; the owner must confirm or correct every line before it goes live.
 */
export const LICENSING: { id: string; draft: string; confirmed: boolean; question: string }[] = [
  {
    id: "no-licence-alternative",
    draft: "If no licences can be documented, this page is replaced by an accurate statement of what TryIPTV does and does not provide, plus the DMCA process; no licensing claim is made.",
    confirmed: false,
    question: "If you cannot document licences for the content, tell us. An unprovable licensing claim is worse than none (it is a deception signal for Google raters and AI engines); we will publish an accurate service description and the DMCA process instead.",
  },
  {
    id: "rights-basis",
    draft: "TryIPTV distributes channels under agreements with the rights holders or their authorised distributors.",
    confirmed: false,
    question: "Do you hold distribution agreements or licences for the channels and films you stream? If yes, with whom (rights holders, aggregators, distributors) and for which territories?",
  },
  {
    id: "licensors",
    draft: "Licensors or distribution partners: [names].",
    confirmed: false,
    question: "Which licensors or distribution partners can be named publicly?",
  },
  {
    id: "territories",
    draft: "The service is licensed for viewers in: [countries].",
    confirmed: false,
    question: "In which countries is the service licensed to be offered?",
  },
  {
    id: "catalogue-basis",
    draft: "The 25,000+ channel and 120,000+ title figures count the live and on-demand entries available to subscribers on [date].",
    confirmed: false,
    question: "How are the 25,000+ channels and 120,000+ titles counted, and on what date? Can you publish the method or a category breakdown?",
  },
];

export const LICENSING_CONFIRMED = LICENSING.some((l) => l.confirmed);

