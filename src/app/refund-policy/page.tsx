import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { Schema } from "@/components/shared/Schema";
import { generateBreadcrumbSchema } from "@/lib/schema";
import { siteConfig, generateMetadata as generatePageMetadata } from "@/lib/site-config";
import { PAGE_LAST_MODIFIED, formatLegalDate } from "@/lib/site-data/page-modifications";
import { Button } from "@/components/ui/button";

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: "Refund Policy",
    description: "Read TryIPTV's refund and cancellation policy, technical assistance guidelines, and 24-hour free trial terms.",
    canonical: "/refund-policy",
  });
}

export default function RefundPolicyPage() {
  const baseUrl = siteConfig.url;

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", item: `${baseUrl}/` },
    { name: "Refund Policy", item: `${baseUrl}/refund-policy` },
  ]);

  return (
    <>
      <Schema id="breadcrumb" schema={breadcrumbSchema} />

      <Section className="relative overflow-hidden border-b border-white/[0.07] pt-12 pb-14 sm:pt-16 sm:pb-20">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
        <Container className="relative text-center">
          <Breadcrumb items={[{ label: "Refund Policy" }]} align="center" />
          <SectionHeader
            as="h1"
            eyebrow="Customer Satisfaction"
            title="TryIPTV Refund Policy"
            subtitle="Transparent policies on test trials, technical support, and refund eligibility."
          />
        </Container>
      </Section>

      <Section className="py-12 sm:py-16">
        <Container className="max-w-4xl">
          <div className="space-y-8 text-sm sm:text-base leading-relaxed text-muted-foreground">
            <div>
              <p className="text-xs font-semibold text-primary">Last Updated: {formatLegalDate(PAGE_LAST_MODIFIED["/refund-policy"])}</p>
              <p className="mt-2">
                At TryIPTV, we prioritize delivering an exceptional streaming experience. Because digital service credentials are typically delivered within 5–15 minutes after payment confirmation, we urge all prospective users to test our service via the 24-hour free trial prior to purchasing a long-term plan.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="font-headline text-xl sm:text-2xl font-bold text-foreground">1. Test First: 24-Hour Free Trial</h2>
              <p>
                We provide a completely free 24-hour trial with no credit card required. This allows you to test server speeds, channel availability, and device compatibility in your own home environment before committing to any paid plan.
              </p>
              <div className="pt-2">
                <Button asChild size="sm" variant="outline">
                  <Link href="/iptv-free-trial">Request a 24-Hour Free Trial</Link>
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="font-headline text-xl sm:text-2xl font-bold text-foreground">2. 7-Day Technical Resolution Window</h2>
              <p>
                If you purchase a subscription and encounter critical technical defects (such as failure of credentials to authenticate on supported apps or complete server outage) that our technical support desk cannot resolve within seven (7) days of purchase, you may be eligible for a full or partial refund.
              </p>
              <p>
                To request assistance, submit your order details and error logs to our support desk. Our technicians will diagnose player settings, DNS configuration, and server routing.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="font-headline text-xl sm:text-2xl font-bold text-foreground">3. Non-Refundable Circumstances</h2>
              <p>Refunds cannot be granted under the following circumstances:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Change of mind after credentials have been issued and actively utilized.</li>
                <li>Issues caused by local network deficiencies, slow household Wi-Fi, or ISP throttling where a VPN or speed test confirms server functionality.</li>
                <li>Incompatible or uncertified third-party devices not listed in our compatibility documentation.</li>
                <li>Accounts suspended or terminated due to violation of our Terms and Conditions (such as simultaneous stream limit violations or credential sharing).</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="font-headline text-xl sm:text-2xl font-bold text-foreground">4. Refund Processing</h2>
              <p>
                Approved refunds are processed following technical confirmation by our support desk or applied as service credit. For cryptocurrency transactions, approved refunds exclude network miner fees.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="font-headline text-xl sm:text-2xl font-bold text-foreground">5. How to Initiate a Request</h2>
              <p>
                Contact our support team directly via email at{" "}
                <a href={`mailto:${siteConfig.links.email}`} className="text-primary underline">
                  {siteConfig.links.email}
                </a>{" "}
                or on WhatsApp. Please include your order identifier, MAC/M3U username, device model, and a brief description of the technical issue.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
