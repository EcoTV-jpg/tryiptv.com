import type { Metadata } from "next";
import { generateMetadata as generatePageMetadata } from "@/lib/site-config";

/**
 * Blog — noindex until substantive content is published.
 * Canonical: https://www.tryiptv.com/blog
 * Source of truth: src/lib/site-routes.ts (indexable: false)
 */
export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: "TryIPTV Blog — IPTV News, Guides & Tips",
    description: "The TryIPTV blog covering IPTV news, setup guides, player reviews, streaming tips, and industry updates.",
    canonical: "/blog",
    noIndex: true,
  });
}

export default function BlogPage() {
  return (
    <main>
      <p style={{ display: "none" }}>Content coming soon.</p>
    </main>
  );
}
