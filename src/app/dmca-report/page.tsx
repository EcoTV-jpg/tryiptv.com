import type { Metadata } from "next";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { Schema } from "@/components/shared/Schema";
import { generateBreadcrumbSchema } from "@/lib/schema";
import { siteConfig, generateMetadata as generatePageMetadata } from "@/lib/site-config";
import { PAGE_LAST_MODIFIED, formatLegalDate } from "@/lib/site-data/page-modifications";
import { COMPANY } from "@/lib/site-data/company";
import { Confirm } from "@/components/shared/Confirm";

export function generateMetadata(): Metadata {
  return {
    ...generatePageMetadata({
      title: "DMCA Notice & Copyright Policy: Report Infringement",
      description: "Read the TryIPTV DMCA and copyright policy: what a valid infringement notice must include, how takedown requests are handled, and where to send yours.",
      canonical: "/dmca-report",
    }),
    title: { absolute: "DMCA Notice & Copyright Policy: Report Infringement" },
  };
}

export default function DmcaReportPage() {
  const baseUrl = siteConfig.url;

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", item: `${baseUrl}/` },
    { name: "DMCA Report", item: `${baseUrl}/dmca-report` },
  ]);

  return (
    <>
      <Schema id="breadcrumb" schema={breadcrumbSchema} />

      <Section className="relative overflow-hidden border-b border-white/[0.07] pt-12 pb-14 sm:pt-16 sm:pb-20">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
        <Container className="relative text-center">
          <Breadcrumb items={[{ label: "DMCA Report" }]} align="center" />
          <SectionHeader
            as="h1"
            eyebrow="Copyright Compliance"
            title="DMCA Notice & Copyright Policy"
            subtitle="Procedures for submitting copyright infringement notices and takedown requests."
          />
        </Container>
      </Section>

      <Section className="py-12 sm:py-16">
        <Container className="max-w-4xl">
          <div className="space-y-8 text-base leading-relaxed text-muted-foreground">
            <div>
              <p className="text-xs font-semibold text-primary">Last Updated: {formatLegalDate(PAGE_LAST_MODIFIED["/dmca-report"])}</p>
              <p className="mt-2">
                TryIPTV ({siteConfig.url}) respects the intellectual property rights of content owners and complies with the Digital Millennium Copyright Act (17 U.S.C. § 512) and applicable international copyright standards.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="font-headline text-xl sm:text-2xl font-bold text-foreground">1. Copyright Notification Requirements</h2>
              <p>
                If you believe in good faith that copyrighted material belonging to you or an entity you represent has been linked, indexed, or made accessible through our service without authorization, please submit a formal written notice containing:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>A physical or electronic signature of a person authorized to act on behalf of the copyright owner.</li>
                <li>Clear identification of the copyrighted work claimed to have been infringed (including title, registration number if applicable, or original URL).</li>
                <li>Identification of the material that is claimed to be infringing, including the specific stream URL, channel identifier, or page link.</li>
                <li>Contact information sufficient to reach the complaining party, including legal name, physical address, telephone number, and active email address.</li>
                <li>A statement that the complaining party has a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.</li>
                <li>A statement that the information in the notification is accurate, and under penalty of perjury, that the complaining party is authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="font-headline text-xl sm:text-2xl font-bold text-foreground">2. Where to Send Notices</h2>
              <p>Please send all infringement notifications to:</p>
                <div
                  dangerouslySetInnerHTML={{
                    __html: `<!--email_off--><p>Email: <a href="mailto:dmca@tryiptv.com" class="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">dmca@tryiptv.com</a></p><p>Secondary: <a href="mailto:${siteConfig.links.email}" class="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">${siteConfig.links.email}</a></p><!--/email_off-->`,
                  }}
                />
                {COMPANY.dmcaAgent && (
                  <p>
                    Designated agent: {COMPANY.dmcaAgent.name}, {COMPANY.dmcaAgent.address}
                    {COMPANY.dmcaAgent.registeredWithUSCO ? " (registered with the U.S. Copyright Office)" : ""}.
                  </p>
                )}
                <Confirm value={COMPANY.dmcaAgent} question="Name and postal address of your DMCA designated agent, and is the agent registered with the U.S. Copyright Office? (Safe-harbour protection under 17 U.S.C. 512 requires registration.)" />
            </div>

            <div className="space-y-3">
              <h2 className="font-headline text-xl sm:text-2xl font-bold text-foreground">3. Response Timeline & Takedown Procedure</h2>
              <p>
                Upon receipt of a valid and complete notification fulfilling all statutory requirements, TryIPTV will investigate the claim and take the necessary action, which may include disabling access to the specified stream feed or playlist entry.
              </p>
              {COMPANY.dmcaTakedownTarget && <p>{COMPANY.dmcaTakedownTarget}</p>}
              <Confirm value={COMPANY.dmcaTakedownTarget} question="How quickly do you act on a valid notice?" />
            </div>

            <div className="space-y-3">
              <h2 className="font-headline text-xl sm:text-2xl font-bold text-foreground">4. Counter-Notification</h2>
              <p>
                If you believe your content was disabled or removed by mistake or misidentification, you may submit a written counter-notification pursuant to sections 512(g)(2) and (3) of the DMCA to our designated copyright agent.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
