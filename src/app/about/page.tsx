import type { Metadata } from "next";
import Link from "next/link";
import type React from "react";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { Schema } from "@/components/shared/Schema";
import { siteConfig, generateMetadata as generatePageMetadata } from "@/lib/site-config";
import { formatLegalDate } from "@/lib/site-data/page-modifications";
import { plans } from "@/lib/site-data/pricing";
import { publicBrandSocialLinks } from "@/lib/site-data/socials";
import { COMPANY, LICENSING_CONFIRMED, SHOW_CONFIRM_MARKERS } from "@/lib/site-data/company";
import { Confirm } from "@/components/shared/Confirm";
import { BRAND } from "@/lib/site-data/brand";

const LAST_UPDATED = "2026-10-20";

// Company facts live in src/lib/site-data/company.ts. An unconfirmed fact is not rendered in
// production; Preview/dev builds show a [CONFIRM] marker in its place (see <Confirm>).
const OPERATOR = { name: COMPANY.legalName, location: COMPANY.location, since: COMPANY.foundingYear };
const PAYMENT_METHODS = COMPANY.paymentMethods;
const SUPPORT_HOURS = COMPANY.support.hours;
const LANGUAGES = COMPANY.support.languages;

const title = "About Us: Prepaid IPTV Service, Trial & Support | TryIPTV";
const description =
  "Learn who runs TryIPTV, how the prepaid IPTV service works, what plans and the 24-hour free trial include, and how to reach support or request a refund.";
const canonical = "/about";
const whatsappUrl = `https://wa.me/${siteConfig.links.whatsapp.replace(/\D/g, "")}`;

export function generateMetadata(): Metadata {
  return { ...generatePageMetadata({ title, description, canonical }), title: { absolute: title } };
}

const link = "font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:text-primary/80";
const h2 = "font-headline text-xl font-bold text-foreground sm:text-2xl";

const runBy = [
  OPERATOR.name && `operated by ${OPERATOR.name}`,
  OPERATOR.location && `based in ${OPERATOR.location}`,
  OPERATOR.since && `running since ${OPERATOR.since}`,
].filter(Boolean);

// FAQ answers are rendered visibly and reused verbatim (as plain text) in the FAQPage schema.
const faqs: { question: string; answer: React.ReactNode; text: string }[] = [
  ...(OPERATOR.name
    ? [{
        question: "Who runs TryIPTV?",
        answer: <>TryIPTV is {runBy.join(", ")}. You can reach us at {siteConfig.links.email}.</>,
        text: `TryIPTV is ${runBy.join(", ")}. You can reach us at ${siteConfig.links.email}.`,
      }]
    : []),
  {
    question: "How do I pay?",
    answer: <>Choose a plan and you&apos;ll be taken to WhatsApp, where support sends payment instructions.{PAYMENT_METHODS ? ` Accepted payment methods: ${PAYMENT_METHODS}.` : ""} All plans are one-time prepaid payments.</>,
    text: `Choose a plan and you'll be taken to WhatsApp, where support sends payment instructions.${PAYMENT_METHODS ? ` Accepted payment methods: ${PAYMENT_METHODS}.` : ""} All plans are one-time prepaid payments.`,
  },
  {
    question: "Do plans renew automatically?",
    answer: "No. Every plan is prepaid for a fixed term and does not renew automatically. When it ends, access stops unless you buy another term.",
    text: "No. Every plan is prepaid for a fixed term and does not renew automatically. When it ends, access stops unless you buy another term.",
  },
  {
    question: "Can I get a refund?",
    answer: <>Technical problems that support cannot resolve within 7 days of purchase may qualify for a refund. See our <Link href="/refund-policy" className={link}>refund policy</Link> for the full conditions.</>,
    text: "Technical problems that support cannot resolve within 7 days of purchase may qualify for a refund. See our refund policy for the full conditions.",
  },
  {
    question: "How do I contact support?",
    answer: <>Email {siteConfig.links.email} or use the <Link href="/contact-us" className={link}>contact page</Link>.{SUPPORT_HOURS ? ` WhatsApp support hours: ${SUPPORT_HOURS}.` : ""}</>,
    text: `Email ${siteConfig.links.email} or use the contact page.${SUPPORT_HOURS ? ` WhatsApp support hours: ${SUPPORT_HOURS}.` : ""}`,
  },
];

const base = siteConfig.url;
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": `${base}/about#webpage`,
      url: `${base}/about`,
      name: title,
      description,
      isPartOf: { "@id": `${base}/#website` },
      about: { "@id": `${base}/#organization` },
      breadcrumb: { "@id": `${base}/about#breadcrumb` },
    },
    {
      "@type": "OnlineBusiness",
      "@id": `${base}/#organization`,
      name: siteConfig.name,
      url: `${base}/`,
      logo: `${base}${BRAND.logos.primary}`,
      alternateName: [...BRAND.alternateNames],
      description: BRAND.description,
      slogan: BRAND.tagline,
      email: siteConfig.links.email,
      contactPoint: { "@type": "ContactPoint", contactType: "customer support", email: siteConfig.links.email, url: COMPANY.support.whatsappUrl },
      sameAs: [...publicBrandSocialLinks],
      // Only confirmed facts are added (Google: Organization properties must be true; QRG §4.5.3).
      ...(COMPANY.legalName ? { legalName: COMPANY.legalName } : {}),
      ...(COMPANY.foundingYear ? { foundingDate: COMPANY.foundingYear } : {}),
      ...(COMPANY.vatOrTaxId ? { vatID: COMPANY.vatOrTaxId } : {}),
      ...(COMPANY.address
        ? { address: { "@type": "PostalAddress", streetAddress: COMPANY.address.street, addressLocality: COMPANY.address.locality, postalCode: COMPANY.address.postalCode, addressCountry: COMPANY.address.country } }
        : {}),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${base}/about#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
        { "@type": "ListItem", position: 2, name: "About TryIPTV", item: `${base}/about` },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${base}/about#faq`,
      mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.text } })),
    },
  ],
};

export default function AboutPage() {
  return (
    <>
      <Schema id="about" schema={schema} />

      <Section className="relative overflow-hidden border-b border-white/[0.07] pt-12 pb-14 sm:pt-16 sm:pb-20">
        <Container className="relative text-center">
          <Breadcrumb items={[{ label: "About TryIPTV" }]} align="center" />
          <SectionHeader
            as="h1"
            eyebrow="Company"
            title="About TryIPTV"
            subtitle="Who we are, how the service works, and how to reach us."
            className="mb-0 sm:mb-0 lg:mb-0"
          />
        </Container>
      </Section>

      <Section className="py-12 sm:py-16">
        <Container className="max-w-3xl">
          <div className="space-y-10 text-base leading-7 text-muted-foreground">
            <p className="text-xs font-semibold text-primary">Last updated: {formatLegalDate(LAST_UPDATED)}</p>

            <section className="space-y-3">
              <h2 className={h2}>Who we are</h2>
              <p>TryIPTV is an IPTV service provider. We supply streaming access to live TV and on-demand content that you watch on your own devices through a compatible IPTV player app.</p>
              <p>TryIPTV is not a player app. We don&apos;t make or sell the software you watch with. You bring a device and a player; we provide the service and the login details that player needs.</p>
              <Confirm value={COMPANY.story} question="Company story: how and why TryIPTV started, in 2–4 sentences.">
                <p>{COMPANY.story}</p>
              </Confirm>
            </section>

            <section className="space-y-3">
              <h2 className={h2}>Who runs TryIPTV</h2>
              {runBy.length > 0 && <p>TryIPTV is {runBy.join(", ")}.</p>}
              <div className="space-y-1">
                <div><Confirm value={COMPANY.legalName} question="Legal name of the company or person that operates TryIPTV." /></div>
                <div><Confirm value={COMPANY.location} question="Where is TryIPTV based (country, city), if you want it published?" /></div>
                <div><Confirm value={COMPANY.foundingYear} question="Year TryIPTV started operating." /></div>
                <div><Confirm value={COMPANY.registrationNumber} question="Company registration number and registry, if registered." /></div>
              </div>
              <Confirm value={COMPANY.team} question="Team members who agree to be named publicly (name, role, short bio).">
                <ul className="list-disc space-y-1 pl-6">
                  {COMPANY.team.map((m) => (
                    <li key={m.name}><strong className="text-foreground">{m.name}</strong>, {m.role}{m.bio ? `: ${m.bio}` : ""}</li>
                  ))}
                </ul>
              </Confirm>
              <p>The quickest ways to reach us:</p>
              <ul className="list-disc space-y-1 pl-6">
                <li>Email: <a href={`mailto:${siteConfig.links.email}`} className={link}>{siteConfig.links.email}</a></li>
                <li>WhatsApp: <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={link}>message support</a>{SUPPORT_HOURS ? ` (${SUPPORT_HOURS})` : ""}</li>
                {LANGUAGES && <li>Languages: {LANGUAGES}</li>}
                {COMPANY.support.responseTime && <li>Response time: {COMPANY.support.responseTime}</li>}
              </ul>
              <Confirm value={SUPPORT_HOURS} question="Support hours (with time zone) for WhatsApp and email." />
            </section>

            <section className="space-y-3">
              <h2 className={h2}>What you get</h2>
              <p>Every paid plan includes the same service:</p>
              <ul className="list-disc space-y-1 pl-6">
                <li>Live TV channels and an on-demand (VOD) library of movies and series</li>
                <li>Access through Xtream Codes (server URL, username and password) or an M3U playlist URL</li>
                <li>TV guide (EPG) data where it is available for a channel</li>
                <li>2 simultaneous connections, so two devices can stream at the same time</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className={h2}>How it works</h2>
              <ol className="list-decimal space-y-2 pl-6">
                <li><strong className="text-foreground">Choose a plan or start the free trial.</strong> Pick a prepaid plan on our <Link href="/pricing" className={link}>pricing page</Link> or request the <Link href="/iptv-free-trial" className={link}>24-hour free trial</Link>.</li>
                <li><strong className="text-foreground">Receive your credentials.</strong> For paid plans, login details usually arrive about 5–15 minutes after payment is confirmed.</li>
                <li><strong className="text-foreground">Install a compatible player.</strong> Add an IPTV player app to your device and enter your Xtream Codes or M3U details. Our <Link href="/setup" className={link}>IPTV setup guide</Link> walks you through it.</li>
                <li><strong className="text-foreground">Start watching.</strong> Your channels, on-demand library and TV guide load in the player.</li>
              </ol>
            </section>

            <section className="space-y-3">
              <h2 className={h2}>Plans, pricing and payment</h2>
              <p>All plans are prepaid and do not renew automatically:</p>
              <div className="overflow-hidden rounded-xl border border-white/[0.07] bg-card">
                <table className="w-full text-left text-sm">
                  <caption className="sr-only">TryIPTV prepaid plans and prices</caption>
                  <thead className="border-b border-white/[0.07] text-xs uppercase tracking-wide">
                    <tr><th className="px-5 py-3 font-semibold">Plan</th><th className="px-5 py-3 font-semibold">Price</th></tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06]">
                    {plans.map((plan) => (
                      <tr key={plan.id}>
                        <th scope="row" className="px-5 py-3 font-semibold text-foreground">{plan.name}</th>
                        <td className="px-5 py-3">${plan.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>
                When you choose a plan, you&apos;re taken to WhatsApp, where support sends payment instructions.
                {PAYMENT_METHODS ? ` Accepted payment methods: ${PAYMENT_METHODS}.` : ""} When a plan ends, access simply stops; there is no recurring charge, and you buy a new term only if you want to continue. See the full comparison on our{" "}
                <Link href="/pricing" className={link}>plans and pricing page</Link>.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className={h2}>Free trial</h2>
              <p>The free trial gives you 24 hours of access for $0, with no credit card required. It lets you check channels, picture quality, the TV guide and player compatibility on your own device and internet connection before paying.</p>
              <p>The trial ends automatically after 24 hours and does not turn into a paid plan. Details and the request button are on the <Link href="/iptv-free-trial" className={link}>free trial page</Link>.</p>
            </section>

            <section className="space-y-3">
              <h2 className={h2}>Supported devices and apps</h2>
              <p>TryIPTV works on Amazon Fire TV, Android TV and Google TV, Samsung and LG smart TVs, Apple TV, Windows and Mac computers, Chromecast and MAG boxes. Roku works through AirPlay or screen mirroring from another device.</p>
              <p>Compatible player apps include TiviMate, IPTV Smarters, XCIPTV, Televizo, OTT Navigator and IPTV Extreme.</p>
              <p>
                For step-by-step instructions, see our <Link href="/devices" className={link}>device setup guides</Link>,{" "}
                <Link href="/players" className={link}>IPTV player guides</Link> and the <Link href="/setup" className={link}>universal setup guide</Link>.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className={h2}>Support</h2>
              <p>
                Contact us by email at <a href={`mailto:${siteConfig.links.email}`} className={link}>{siteConfig.links.email}</a> or through our{" "}
                <Link href="/contact-us" className={link}>contact page</Link>.{SUPPORT_HOURS ? ` WhatsApp support hours: ${SUPPORT_HOURS}.` : ""}
              </p>
              <p>Many common problems, such as buffering, login errors or a missing TV guide, have step-by-step fixes in our <Link href="/help" className={link}>IPTV troubleshooting guides</Link>.</p>
            </section>

            <section className="space-y-3">
              <h2 className={h2}>Refunds and policies</h2>
              <p>Technical problems that support cannot resolve within 7 days of purchase may qualify for a refund. The exact conditions are in our <Link href="/refund-policy" className={link}>refund policy</Link>.</p>
              <p>
                Please also read our <Link href="/terms-conditions" className={link}>terms and conditions</Link>,{" "}
                <Link href="/privacy-policy" className={link}>privacy policy</Link> and <Link href="/disclaimer" className={link}>disclaimer</Link>.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className={h2}>Content and copyright</h2>
              {/* Content-source / licensing statement: only owner-confirmed wording, from company.ts. */}
              {(LICENSING_CONFIRMED || SHOW_CONFIRM_MARKERS) && (
                <p>
                  How TryIPTV is licensed to distribute its channels is explained on our{" "}
                  <Link href="/content-licensing" className={link}>content licensing page</Link>.
                </p>
              )}
              <p>
                If you believe content accessible through TryIPTV infringes your copyright, email{" "}
                <a href="mailto:dmca@tryiptv.com" className={link}>dmca@tryiptv.com</a> or use our{" "}
                <Link href="/dmca-report" className={link}>copyright (DMCA) report page</Link>.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className={h2}>Honest expectations</h2>
              <p>Streaming quality depends on more than the service. Your internet connection, your device and the player app you use all affect how smoothly channels load and play.</p>
              <p>A 24-hour trial is a good way to test your own setup, but it can&apos;t guarantee how any internet-delivered service will perform over the following months. If you&apos;re unsure, start with a shorter plan before choosing a longer one.</p>
            </section>

            <section className="space-y-5">
              <h2 className={h2}>Frequently asked questions</h2>
              {faqs.map((faq) => (
                <div key={faq.question} className="space-y-2">
                  <h3 className="font-headline text-lg font-bold text-foreground">{faq.question}</h3>
                  <p>{faq.answer}</p>
                </div>
              ))}
            </section>
          </div>
        </Container>
      </Section>
    </>
  );
}
