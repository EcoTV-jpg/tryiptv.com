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
    title: "Privacy Policy",
    description: "Learn how TryIPTV protects your personal information, communication privacy, and transactional data.",
    canonical: "/privacy-policy",
  });
}

export default function PrivacyPolicyPage() {
  const baseUrl = siteConfig.url;

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", item: `${baseUrl}/` },
    { name: "Privacy Policy", item: `${baseUrl}/privacy-policy` },
  ]);

  return (
    <>
      <Schema id="breadcrumb" schema={breadcrumbSchema} />

      <Section className="relative overflow-hidden border-b border-white/[0.07] pt-12 pb-14 sm:pt-16 sm:pb-20">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
        <Container className="relative text-center">
          <Breadcrumb items={[{ label: "Privacy Policy" }]} align="center" />
          <SectionHeader
            as="h1"
            eyebrow="Data Protection & Privacy"
            title="TryIPTV Privacy Policy"
            subtitle="How we collect, handle, and safeguard your details when using our website and services."
          />
        </Container>
      </Section>

      <Section className="py-12 sm:py-16">
        <Container className="max-w-4xl">
          <div className="space-y-8 text-sm sm:text-base leading-relaxed text-muted-foreground">
            <div>
              <p className="text-xs font-semibold text-primary">Last Updated: {formatLegalDate(PAGE_LAST_MODIFIED["/privacy-policy"])}</p>
              <p className="mt-2">
                At TryIPTV ({siteConfig.url}), we value your privacy and are committed to protecting the personal information you share with us. This Privacy Policy outlines what details we collect, how they are utilized, and how we protect your security.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="font-headline text-xl sm:text-2xl font-bold text-foreground">1. Information We Collect</h2>
              <p>We collect minimal information necessary to deliver and support our streaming service:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong className="text-foreground">Contact Information:</strong> When you contact support or submit a form, we may collect your email address or messaging handle (such as WhatsApp).</li>
                <li><strong className="text-foreground">Order & Activation Data:</strong> Subscription tier chosen, activation timestamps, and device type information provided to assist with troubleshooting.</li>
                <li><strong className="text-foreground">Payment Details:</strong> Checkout and payment processing are handled externally by payment providers. TryIPTV does not host payment processing forms or store payment card or bank account details on this website.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="font-headline text-xl sm:text-2xl font-bold text-foreground">2. How Information Is Used</h2>
              <p>The information collected is used exclusively for:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Provisioning and activating your M3U playlist and Xtream Codes credentials.</li>
                <li>Delivering direct customer service, technical assistance, and setup guidance.</li>
                <li>Preventing service abuse, server overload, and unauthorized credential redistribution.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="font-headline text-xl sm:text-2xl font-bold text-foreground">3. Third-Party Sharing</h2>
              <p>
                We do not sell, rent, monetize, or trade your personal information to third parties or advertising brokers. Data is only handled by technical infrastructure providers required to operate communication and website availability.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="font-headline text-xl sm:text-2xl font-bold text-foreground">4. Data Security</h2>
              <p>
                We implement industry-standard encryption protocols (HTTPS/SSL) to protect data transmissions between your browser and our servers. Access to internal support systems is restricted to authorized technicians.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="font-headline text-xl sm:text-2xl font-bold text-foreground">5. Cookies and Analytics</h2>
              <p>
                Our website may utilize essential cookies or privacy-respecting analytics to measure aggregate page traffic and improve website performance. We do not deploy cross-site advertising tracking cookies.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="font-headline text-xl sm:text-2xl font-bold text-foreground">6. Contacting Us About Privacy</h2>
              <p>
                If you have questions regarding this Privacy Policy or wish to request deletion of your contact records, reach out to our team at{" "}
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
