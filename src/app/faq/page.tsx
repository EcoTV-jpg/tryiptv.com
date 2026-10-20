import { FaqList } from "@/components/sections/FAQ";
import type { Metadata } from "next";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { CTA } from "@/components/sections/CTA";
import { getFaqPageData } from "@/lib/data/faq-page";
import { faqs } from "@/lib/site-data/faq";
import { Schema } from "@/components/shared/Schema";
import { generateMetadata as generatePageMetadata } from "@/lib/site-config";

export function generateMetadata(): Metadata {
    return generatePageMetadata({
        title: "Frequently Asked Questions",
        description: "Have questions about TryIPTV? Find answers to common questions about free trials, device compatibility, buffering, activation, and our refund policy.",
        canonical: "/faq",
    });
}

export default async function FaqPage() {
  const { 
    faqSchema, 
    breadcrumbSchema 
  } = await getFaqPageData();

  return (
    <>
      <Schema id="faq" schema={faqSchema} />
      <Schema id="breadcrumb" schema={breadcrumbSchema} />
      
      <Section className="relative overflow-hidden border-b border-white/[0.07] pt-12 pb-14 sm:pt-16 sm:pb-20">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
        <Container className="relative text-center">
          <Breadcrumb items={[{ label: "FAQ" }]} align="center" />
          <SectionHeader
            as="h1"
            eyebrow="TryIPTV Help Center"
            title="Frequently Asked Questions About TryIPTV"
            subtitle="Clear answers on IPTV setup, channel playlists, device compatibility, activation, and customer support."
          />
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className="sr-only">Frequently Asked Questions</h2>
          <FaqList items={faqs} />
        </Container>
      </Section>

      <CTA
        title="Still Have Questions?"
        subtitle="Customer support is available via WhatsApp or direct request for account, setup, and service questions."
        eyebrow="Customer Support"
        buttonText="Contact Support"
        buttonHref="/contact-us"
      />
    </>
  );
}
