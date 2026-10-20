import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { Schema } from "@/components/shared/Schema";
import { ConfirmedStatements } from "@/components/shared/ConfirmedStatements";
import { generateBreadcrumbSchema } from "@/lib/schema";
import { siteConfig, generateMetadata as generatePageMetadata } from "@/lib/site-config";
import { TESTING, TESTING_CONFIRMED, SHOW_CONFIRM_MARKERS } from "@/lib/site-data/company";

const title = "How We Test: TryIPTV Guide & Service Methodology";
const description = "How TryIPTV checks its setup guides and service: the devices and player versions used, how speed and uptime are measured, and how often guides are reviewed.";
const canonical = "/how-we-test";
const link = "font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary";

export function generateMetadata(): Metadata {
  return {
    ...generatePageMetadata({ title, description, canonical }),
    title: { absolute: title },
    // Stays out of search until the owner has confirmed at least one statement.
    ...(TESTING_CONFIRMED ? {} : { robots: { index: false, follow: true } }),
  };
}

export default function Page() {
  // Production shows this page only once something on it is confirmed (see company.ts).
  if (!TESTING_CONFIRMED && !SHOW_CONFIRM_MARKERS) notFound();
  const baseUrl = siteConfig.url;
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", item: `${baseUrl}/` },
    { name: "How We Test", item: `${baseUrl}${canonical}` },
  ]);

  return (
    <>
      <Schema id="breadcrumb" schema={breadcrumbSchema} />
      <Section className="relative overflow-hidden border-b border-white/[0.07] pt-12 pb-14 sm:pt-16 sm:pb-20">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
        <Container className="relative text-center">
          <Breadcrumb items={[{ label: "How We Test" }]} align="center" />
          <SectionHeader as="h1" eyebrow="Methodology" title="How We Test" subtitle="The devices, app versions and measurements behind our setup guides and service information." />
        </Container>
      </Section>
      <Section className="py-12 sm:py-16">
        <Container className="max-w-3xl">
          <div className="space-y-8 text-base leading-7 text-muted-foreground">
            <p>
              This page explains how we check the setup guides, player recommendations and service
              performance described on this site: which devices and app versions we use, how speed and
              availability are measured, and how often guides are re-checked. Only methods we actually use
              are listed.
            </p>
            <ConfirmedStatements items={TESTING} />
            <p>
              Spotted something out of date in a guide? Tell us through the{" "}
              <Link href="/contact-us" className={link}>contact page</Link> and we will re-check it.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
