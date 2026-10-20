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
    title: "Legal Disclaimer: Trademarks & Service Limits",
    description: "Read the TryIPTV legal disclaimer on third-party trademarks, player apps, device compatibility, and service limits before you install or use the service.",
    canonical: "/disclaimer",
  });
}

export default function DisclaimerPage() {
  const baseUrl = siteConfig.url;

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", item: `${baseUrl}/` },
    { name: "Disclaimer", item: `${baseUrl}/disclaimer` },
  ]);

  return (
    <>
      <Schema id="breadcrumb" schema={breadcrumbSchema} />

      <Section className="relative overflow-hidden border-b border-white/[0.07] pt-12 pb-14 sm:pt-16 sm:pb-20">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
        <Container className="relative text-center">
          <Breadcrumb items={[{ label: "Disclaimer" }]} align="center" />
          <SectionHeader
            as="h1"
            eyebrow="Legal & Notice"
            title="TryIPTV Legal Disclaimer"
            subtitle="Important disclosures regarding trademarks, third-party software, and service limitations."
          />
        </Container>
      </Section>

      <Section className="py-12 sm:py-16">
        <Container className="max-w-4xl">
          <div className="space-y-8 text-base leading-relaxed text-muted-foreground">
            <div>
              <p className="text-xs font-semibold text-primary">Last Updated: {formatLegalDate(PAGE_LAST_MODIFIED["/disclaimer"])}</p>
              <p className="mt-2">
                The information, installation guides, and streaming access provided by TryIPTV ({siteConfig.url}) are provided under the following operational disclaimers.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="font-headline text-xl sm:text-2xl font-bold text-foreground">1. Nominative Trademark Fair Use</h2>
              <p>
                All product names, logos, brands, and trademarks referenced on this website (including but not limited to Amazon, Fire TV, Fire Stick, Android, Google, Google Play, Apple, Apple TV, iOS, iPadOS, macOS, Microsoft, Windows, Samsung, Tizen, LG, webOS, Roku, and Infomir MAG) are property of their respective trademark holders.
              </p>
              <p>
                Reference to these trademarks is made strictly for descriptive purposes to illustrate device compatibility and guide configuration. TryIPTV is not endorsed by, sponsored by, or affiliated with any of these companies.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="font-headline text-xl sm:text-2xl font-bold text-foreground">2. Third-Party Applications & Software</h2>
              <p>
                Our guides recommend independent media player applications (such as IPTV Smarters Pro, TiviMate, XCIPTV, and VLC Media Player). TryIPTV does not develop, control, or distribute these third-party applications. Users are responsible for reviewing and adhering to the respective terms and privacy policies of third-party software developers.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="font-headline text-xl sm:text-2xl font-bold text-foreground">3. Stream Availability & Broadcast Feeds</h2>
              <p>
                Channel lineups, electronic program guides (EPG), and on-demand titles are subject to ongoing network availability and server updates. Temporary maintenance windows or upstream broadcast alterations may occur without prior notice.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="font-headline text-xl sm:text-2xl font-bold text-foreground">4. Compliance with Local Laws</h2>
              <p>
                Users are solely responsible for ensuring that their use of streaming services complies with all applicable local, regional, and national laws in their respective jurisdictions.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="font-headline text-xl sm:text-2xl font-bold text-foreground">5. Contact Information</h2>
              <p>
                For questions regarding this disclaimer, contact us at{" "}
                <a href={`mailto:${siteConfig.links.email}`} className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
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
