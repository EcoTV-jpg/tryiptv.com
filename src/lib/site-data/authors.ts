/**
 * Guide authors and reviewers. ONLY real people who agreed to be named, with true details (Google's helpful-content
 * guide: fabricated creator profiles are "a form of deception"; QRG §4.5.3 rates them Lowest).
 * Until an author is added here, guides are credited to the TryIPTV team (an organisation byline),
 * and no /authors/* page exists in production.
 */
export interface Author {
  slug: string;
  name: string;
  role: string;
  /** 2–4 sentences: real experience with IPTV, devices or support. */
  bio: string;
  expertise: string[];
  /** Real photo path under /public, or omit (never a stock or AI image). */
  image?: string;
  /** Public profiles that identify the person (LinkedIn, X, YouTube…). */
  sameAs?: string[];
  /** Year they started writing/reviewing for TryIPTV. */
  since?: string;
  updated: string;
}

export const AUTHORS: Author[] = [
  {
    // Owner-confirmed 2026-10-21. No expertise, credentials, photo or profile links were supplied, so none are listed.
    slug: "simo-alaoui",
    name: "Simo Alaoui",
    role: "Founder / Operations",
    bio: "Simo Alaoui oversees TryIPTV's operations, customer experience and service development.",
    expertise: [],
    updated: "2026-10-21",
  },
];

/** Who WROTE each guide, by path, e.g. { "/devices/firestick-iptv": "jane-doe" }. Shown as "By …". */
export const GUIDE_AUTHORS: Record<string, string> = {};

/** Who REVIEWED each guide (did not necessarily write it). Shown as "Reviewed by …"; schema `reviewedBy`. */
export const GUIDE_REVIEWERS: Record<string, string> = {
  // Owner-confirmed 2026-10-21: Simo Alaoui reviewed this guide.
  "/devices/firestick-iptv": "simo-alaoui",
};

/** Stable schema.org @id for a person, so Article, Organization and ProfilePage point to one entity. */
export const personId = (baseUrl: string, slug: string) => `${baseUrl}/authors/${slug}#person`;

export function getAuthorForPath(path: string): Author | undefined {
  const slug = GUIDE_AUTHORS[path];
  return slug ? AUTHORS.find((a) => a.slug === slug) : undefined;
}

export function getReviewerForPath(path: string): Author | undefined {
  const slug = GUIDE_REVIEWERS[path];
  return slug ? AUTHORS.find((a) => a.slug === slug) : undefined;
}
