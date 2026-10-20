/**
 * Guide authors. ONLY real people who agreed to be named, with true details (Google's helpful-content
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

export const AUTHORS: Author[] = [];

/** Which author wrote or reviewed each guide, by path, e.g. { "/devices/firestick-iptv": "jane-doe" }. */
export const GUIDE_AUTHORS: Record<string, string> = {};

export function getAuthorForPath(path: string): Author | undefined {
  const slug = GUIDE_AUTHORS[path];
  return slug ? AUTHORS.find((a) => a.slug === slug) : undefined;
}
