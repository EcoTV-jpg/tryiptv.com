import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { WhyChooseTryIPTV } from "@/components/sections/WhyChooseTryIPTV";
import { ChooseIPTVService } from "@/components/sections/ChooseIPTVService";
import { HomePricing } from "@/components/sections/HomePricing";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Devices } from "@/components/sections/Devices";
import { CustomerFeedback } from "@/components/sections/CustomerFeedback";
import { CTA } from "@/components/sections/CTA";

const FAQ = dynamic(() => import("@/components/sections/FAQ").then((mod) => mod.FAQ));
import { PageSchema } from "@/components/shared/Schema";
import { generateMetadata as generatePageMetadata } from "@/lib/site-config";

const title = "TryIPTV — Best IPTV Service for the USA, UK & More";
const description =
  "Best IPTV service with 25,000+ live channels, sports, and 120,000+ movies and TV shows. 2 connections included. Plans from $15.82 and a free 24h trial.";

export function generateMetadata(): Metadata {
  const baseMetadata = generatePageMetadata({
    title,
    description,
    canonical: "/",
    image: "https://www.tryiptv.com/images/best-iptv-service.png",
  });

  return {
    ...baseMetadata,
    openGraph: {
      ...baseMetadata.openGraph,
      images: [
        {
          url: "https://www.tryiptv.com/images/best-iptv-service.png",
          width: 1024,
          height: 682,
          alt: "Couple watching TV with TryIPTV streaming service",
        },
      ],
    },
    twitter: {
      ...baseMetadata.twitter,
      images: ["https://www.tryiptv.com/images/best-iptv-service.png"],
    },
  };
}

export default function Home() {
  return (
    <>
      <PageSchema path="/" name={title} description={description} nodes={[]} />
      <Hero />
      <HomePricing />
      <WhyChooseTryIPTV />
      <ChooseIPTVService />
      <HowItWorks />
      <Devices />
      <CustomerFeedback />
      {/* Follows a section on the same background, so skip the duplicated top padding. */}
      <CTA className="pt-0 sm:pt-0 md:pt-0 lg:pt-0" />
      <FAQ />
    </>
  );
}
