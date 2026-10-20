import type { Metadata } from "next";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { Schema } from "@/components/shared/Schema";
import { generateBreadcrumbSchema } from "@/lib/schema";
import { siteConfig, generateMetadata as generatePageMetadata } from "@/lib/site-config";
import { PAGE_LAST_MODIFIED, formatLegalDate } from "@/lib/site-data/page-modifications";

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: "Terms & Conditions",
    description: "Read the service terms and acceptable use guidelines governing your TryIPTV subscription and service usage.",
    canonical: "/terms-conditions",
  });
}

export default function TermsConditionsPage() {
  const baseUrl = siteConfig.url;

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", item: `${baseUrl}/` },
    { name: "Terms & Conditions", item: `${baseUrl}/terms-conditions` },
  ]);

  return (
    <>
      <Schema id="breadcrumb" schema={breadcrumbSchema} />

      <Section className="relative overflow-hidden border-b border-white/[0.07] pt-12 pb-14 sm:pt-16 sm:pb-20">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
        <Container className="relative text-center">
          <Breadcrumb items={[{ label: "Terms & Conditions" }]} align="center" />
          <SectionHeader
            as="h1"
            eyebrow="Service Agreement"
            title="TryIPTV Terms & Conditions"
            subtitle="The terms governing subscriptions, device connections, payments, and acceptable use."
          />
        </Container>
      </Section>

      <Section className="py-12 sm:py-16">
        <Container className="max-w-4xl">
          <div className="space-y-8 text-sm sm:text-base leading-relaxed text-muted-foreground">
            <div>
              <p className="text-xs font-semibold text-primary">Last Updated: {formatLegalDate(PAGE_LAST_MODIFIED["/terms-conditions"])}</p>
              <p className="mt-2">
                By purchasing, activating, or testing a subscription with TryIPTV ({siteConfig.url}), you agree to comply with and be bound by the following Terms and Conditions. Please review them thoroughly before initiating an order.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="font-headline text-xl sm:text-2xl font-bold text-foreground">1. Nature of the Service</h2>
              <p>
                TryIPTV provides digital IPTV streaming playlist access and technical support for compatible third-party media players (such as IPTV Smarters Pro, TiviMate, XCIPTV, and VLC). We do not manufacture hardware or host physical broadcast transmission equipment.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="font-headline text-xl sm:text-2xl font-bold text-foreground">2. Subscription Plans & Billing</h2>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong className="text-foreground">Prepaid Terms:</strong> All subscriptions (1, 3, 6, or 12 months) are one-time prepaid purchases. There are no recurring auto-debits or automated renewals.</li>
                <li><strong className="text-foreground">Payment Methods:</strong> Available payment methods include cryptocurrency, PayPal, and Stripe. For cryptocurrency payments, you are responsible for ensuring transaction network details and wallet addresses are accurately submitted.</li>
                <li><strong className="text-foreground">Activation:</strong> Account credentials are confirmed and delivered typically within 5–15 minutes following receipt and confirmation of payment.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="font-headline text-xl sm:text-2xl font-bold text-foreground">3. Connection Limits & Acceptable Use</h2>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong className="text-foreground">2 Simultaneous Connections:</strong> Standard plans include two (2) simultaneous active streams. Exceeding this limit concurrently may result in automated temporary stream buffering or account lockout.</li>
                <li><strong className="text-foreground">Personal Use:</strong> Subscriptions are intended for personal household usage. Reselling, restreaming, public broadcasting, or redistributing account credentials without written authorization is strictly prohibited.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="font-headline text-xl sm:text-2xl font-bold text-foreground">4. Free Trial Terms</h2>
              <p>
                We provide a 24-hour evaluation trial ($0, no credit card required) to allow prospective customers to verify stream compatibility and network performance prior to purchasing a plan. Trials are limited to one per household/user.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="font-headline text-xl sm:text-2xl font-bold text-foreground">5. Service Availability & Quality</h2>
              <p>
                While we strive for high uptime and smooth stream delivery, streaming quality depends significantly on your local internet connection, ISP routing, device processing power, and third-party media app settings. We recommend a minimum stable speed of 25 Mbps for HD and 50 Mbps for 4K streams.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="font-headline text-xl sm:text-2xl font-bold text-foreground">6. Modifications and Contact</h2>
              <p>
                TryIPTV reserves the right to modify these terms as needed to reflect operational or regulatory changes. Continued use of the service constitutes agreement to updated terms. For questions, contact{" "}
                <a href={`mailto:${siteConfig.links.email}`} className="text-primary underline">
                  {siteConfig.links.email}
                </a>.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
