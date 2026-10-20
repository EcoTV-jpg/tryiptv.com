import type { Metadata } from "next";
import type React from "react";
import Link from "next/link";
import { ArrowRight, Check, ChevronDown, CirclePlay, Gauge, HeadphonesIcon, MonitorSmartphone, Receipt, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { Schema } from "@/components/shared/Schema";
import { generateMetadata as generatePageMetadata } from "@/lib/site-config";
import { getPricingPageData } from "@/lib/data/pricing-page";
import { plans } from "@/lib/site-data/pricing";
import { PRODUCT_TRUTHS, FACT_TEXT } from "@/lib/site-config";
import { COMPANY } from "@/lib/site-data/company";

const link = "font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary";
const T = PRODUCT_TRUTHS;

export function generateMetadata(): Metadata {
  const title = "IPTV Subscription Plans & Pricing From $16 | TryIPTV";
  const description =
    "Compare TryIPTV prepaid plans from $16 to $90 for 1, 3, 6, or 12 months, with 2 connections and no auto-renewal. Start with a 24-hour free trial today.";

  return {
    ...generatePageMetadata({ title, description, canonical: "/pricing" }),
    title: { absolute: title },
  };
}

const quickFacts = [
  "Plans from $16",
  "1 / 3 / 6 / 12 Months",
  "2 Simultaneous Connections",
  "Prepaid Billing",
  "No Automatic Renewal",
  "24-Hour Free Trial Available",
] as const;

const planDescriptions: Record<string, string> = {
  "1-month": "Lowest commitment for short-term testing or flexible viewing.",
  "3-months": "Short-term savings without committing to a six- or twelve-month term.",
  "6-months": "Balanced prepaid term between upfront cost and duration.",
  "12-months": "Lowest effective monthly cost for ongoing viewing.",
};

const planSavingsExact: Record<string, string | null> = {
  "1-month": null,
  "3-months": "Save $9 vs three 1\u2011month purchases",
  "6-months": "Save $36 vs six 1\u2011month purchases",
  "12-months": "Save $102 vs twelve 1\u2011month purchases",
};

// Whole-dollar amounts without decimals ($16), others with cents ($7.50).
const formatUsd = (amount: number) => `$${amount % 1 === 0 ? amount.toFixed(0) : amount.toFixed(2)}`;

const planBestFor: Record<string, string> = {
  "1-month": "Lowest commitment",
  "3-months": "Short-term savings",
  "6-months": "Balanced prepaid term",
  "12-months": "Lowest monthly equivalent",
};

// Same list as the homepage plan cards.
const planCardFeatures = [
  "HD and 4K Streams Where Available",
  "25,000+ Live Channels Worldwide",
  "120,000+ Movies & TV Shows",
  "PPV Events Included",
  "VOD Access",
  "Smart EPG & Catch-Up TV",
  "Customer Support",
  "Multi-Device Compatibility",
] as const;

const orderSteps = [
  {
    step: "1",
    title: "Pick your plan",
    desc: `Choose 1, 3, 6 or 12 months. Every plan includes ${T.connections} simultaneous connections, and plans start at ${FACT_TEXT.fromPrice} for one month.`,
  },
  {
    step: "2",
    title: "Pay on WhatsApp",
    desc: COMPANY.paymentMethods
      ? `Tap the plan's button to open WhatsApp; support sends payment instructions. Pay by ${COMPANY.paymentMethods}, once, with no automatic renewal.`
      : "Tap the plan's button to open WhatsApp; support sends payment instructions. You pay once, with no automatic renewal.",
  },
  {
    step: "3",
    title: "Start streaming",
    desc: `Your login arrives on WhatsApp within ${T.activationTime} after payment is confirmed. Works on Firestick, Android TV, smart TVs, Apple TV, MAG, phones and computers.`,
  },
] as const;

const highlights = [
  COMPANY.paymentMethods ? `${COMPANY.paymentMethods.replace(/^c/, "C")} accepted` : "Prepaid, one-time payment",
  "Quick activation after payment is confirmed",
  "Support on WhatsApp and email",
  "Transparent, flat prepaid pricing",
];

const whatYouGet: React.ReactNode[] = [
  `${T.channels} live TV channels and major sports events`,
  `${T.vod} movies and series on demand (VOD)`,
  "EPG (TV guide) in your IPTV player",
  <>
    HD/4K where available (about 25 Mbps for HD and 50 Mbps for 4K;{" "}
    <Link href="/guides/iptv-internet-speed" className={link}>speed guide</Link>)
  </>,
  <>
    Works on Firestick, Android TV, smart TVs, Apple TV, MAG and more (
    <Link href="/devices" className={link}>supported devices</Link>)
  </>,
  `${T.connections} simultaneous connections on every plan`,
];

const streamFeatures = [
  {
    icon: MonitorSmartphone,
    title: "Play anywhere, anytime",
    desc: "Firestick, Android TV, smart TVs, Apple TV, MAG, phones and computers: enter your login in a compatible IPTV player and start watching.",
  },
  {
    icon: Gauge,
    title: "Smooth streaming",
    desc: "A stable 25 Mbps connection handles one HD stream and 50 Mbps handles 4K comfortably. Ethernet is steadier than Wi-Fi.",
  },
  {
    icon: Sparkles,
    title: "High quality video",
    desc: "HD, Full HD and 4K where available, depending on the source stream and your connection.",
  },
  {
    icon: ShieldCheck,
    title: "No auto-renewal",
    desc: "Every plan is paid once upfront. Nothing renews and nothing is charged again unless you choose to buy another term.",
  },
  {
    icon: Receipt,
    title: "Transparent pricing",
    desc: `One flat prepaid price per plan, ${FACT_TEXT.fromPrice} to $90, shown here before you order.`,
  },
  {
    icon: HeadphonesIcon,
    title: "Real support",
    desc: "Help with setup and orders on WhatsApp and email, before and after you buy.",
  },
] as const;

export default async function IPTVSubscription() {
  const { productSchema, breadcrumbSchema, pricingPageFaqs } = await getPricingPageData();

  return (
    <>
      <Schema id="product" schema={productSchema} />
      <Schema id="breadcrumb" schema={breadcrumbSchema} />

      {/* Hero + plans */}
      <Section className="relative overflow-hidden border-b border-white/[0.07] pt-8 pb-10 sm:pt-12 sm:pb-14">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
        <Container className="relative">
          <Breadcrumb items={[{ label: "Pricing" }]} align="center" />
          <SectionHeader
            as="h1"
            eyebrow="Most Popular IPTV Subscription Plans"
            title={`Choose Your IPTV Plan, From ${FACT_TEXT.fromPrice}/Month`}
            subtitle={`TryIPTV prepaid plans cost ${FACT_TEXT.priceList}. Every plan includes ${T.connections} simultaneous connections and does not renew automatically. Longer terms lower the monthly equivalent, from ${FACT_TEXT.fromPrice} down to ${FACT_TEXT.lowestMonthly} a month on the 12-month plan.`}
          />
          <div className="mt-5 flex flex-wrap justify-center gap-2 text-xs font-semibold sm:mt-6 sm:text-sm">
            {quickFacts.map((fact) => (
              <div
                key={fact}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.09] bg-card px-3 py-1 text-muted-foreground"
              >
                <Check className="h-3.5 w-3.5 text-primary" /> {fact}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="pricing-plans" className="scroll-mt-2 bg-[#050706] py-10 sm:py-14">
        <Container>
          <h2 className="sr-only">Compare TryIPTV Plans</h2>
          <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {plans.map((plan, index) => {
              const savingsText = planSavingsExact[plan.id];
              const isLowestMonthly = plan.id === "12-months";

              return (
                <article
                  key={plan.id}
                  className={`relative flex h-full flex-col overflow-hidden rounded-[18px] border bg-[#07080a] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] sm:p-7 ${
                    isLowestMonthly
                      ? "border-primary/40 bg-[linear-gradient(180deg,rgba(0,240,120,0.05),rgba(7,8,10,0)_42%),#07080a]"
                      : "border-white/[0.08]"
                  }`}
                >
                  <div className="flex-1">
                    {/* The badge takes the plan-number slot so it can't overlap it or push the heading down. */}
                    {isLowestMonthly ? (
                      <p className="w-fit whitespace-nowrap rounded-md border border-primary/25 bg-primary/[0.08] px-2 text-[10px] font-mono font-bold uppercase leading-[14.5px] tracking-wider text-primary">
                        Lowest Monthly Equivalent
                      </p>
                    ) : (
                      <p className="text-[11px] font-mono font-semibold uppercase tracking-[0.08em] text-muted-foreground/80">
                        {String(index + 1).padStart(2, "0")} / Plan
                      </p>
                    )}
                    <h3 className="pt-2 font-headline text-xl font-bold tracking-tight text-foreground">
                      {plan.name}
                    </h3>

                    <div className="pt-4">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-headline text-[40px] font-bold leading-none tracking-tight text-foreground sm:text-[44px]">
                          {formatUsd(plan.price)}
                        </span>
                        <span className="text-xs font-medium text-muted-foreground">prepaid</span>
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground">
                        <span className="font-medium text-foreground/90">
                          {formatUsd(plan.price_monthly)}/month equivalent
                        </span>
                      </p>
                      {savingsText && (
                        <p className="mt-2 inline-block rounded bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
                          {savingsText}
                        </p>
                      )}
                      <p className="mt-3 min-h-10 text-base sm:text-xs leading-5 text-muted-foreground">
                        {planDescriptions[plan.id]}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6">
                    <Button
                      asChild
                      className="h-12 min-h-[48px] w-full rounded-xl text-[15px] font-semibold"
                      variant={isLowestMonthly ? "default" : "outline"}
                    >
                      <a href={plan.checkoutUrl} target="_blank" rel="noopener noreferrer">
                        Choose {plan.name}
                        <span className="sr-only"> plan (opens WhatsApp in a new tab)</span>
                      </a>
                    </Button>
                  </div>

                  <ul className="mt-6 space-y-2.5 border-t border-white/[0.07] pt-6 text-base sm:text-sm text-muted-foreground">
                    {planCardFeatures.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>

          <p className="mx-auto mt-6 max-w-3xl text-center text-base sm:text-sm leading-6 text-muted-foreground">
            Choosing a plan opens WhatsApp, where support sends payment instructions. Credentials typically arrive within <span className="whitespace-nowrap">5–15 minutes</span> after payment confirmation.
          </p>

          <p className="mx-auto mt-6 max-w-3xl text-center text-base sm:text-sm leading-6 text-muted-foreground">
            Choosing a plan opens WhatsApp, where support sends payment instructions. Credentials typically arrive within <span className="whitespace-nowrap">{T.activationTime}</span> after payment confirmation.
          </p>
        </Container>
      </Section>

      {/* How it works */}
      <Section variant="alt" className="border-t border-white/[0.06] bg-[#070a08] py-10 sm:py-14">
        <Container>
          <SectionHeader
            eyebrow="Order Process"
            title="How Does TryIPTV Work?"
            subtitle={`Order a plan on WhatsApp, pay once, and start watching. Most customers receive their login within ${T.activationTime} of payment confirmation, then enter it in a compatible IPTV player.`}
          />

          <ol className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {orderSteps.map((s) => (
              <li key={s.step} className="rounded-xl border border-white/[0.08] bg-card p-5">
                <span className="font-mono text-sm font-bold text-primary">{s.step}</span>
                <h3 className="mt-2 font-headline text-lg font-extrabold text-foreground">{s.title}</h3>
                <p className="mt-2 text-base sm:text-sm leading-6 text-muted-foreground">{s.desc}</p>
              </li>
            ))}
          </ol>

          <p className="mt-6 text-center text-base sm:text-sm text-muted-foreground">
            Need installation help? Read the{" "}
            <Link href="/setup" className={link}>
              Universal IPTV Setup Guide
            </Link>
            .
          </p>
        </Container>
      </Section>

      {/* Stream smarter */}
      <Section className="border-t border-white/[0.06] py-10 sm:py-14">
        <Container>
          <SectionHeader
            eyebrow="Plans Compared"
            title="Stream Smarter With TryIPTV"
            subtitle={`TryIPTV plans start at ${FACT_TEXT.fromPrice} for one month and drop to ${FACT_TEXT.lowestMonthly} a month on the annual term. Every plan includes ${T.channels} live channels, ${T.vod} movies and series, the TV guide, ${T.connections} simultaneous connections and support on WhatsApp and email.`}
          />

          <ul className="mx-auto mb-10 flex max-w-4xl flex-wrap justify-center gap-2 text-sm font-semibold">
            {highlights.map((h) => (
              <li key={h} className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.09] bg-card px-3 py-1 text-muted-foreground">
                <Check className="h-3.5 w-3.5 text-primary" aria-hidden /> {h}
              </li>
            ))}
          </ul>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            <div className="rounded-xl border border-white/[0.08] bg-card p-6">
              <h3 className="font-headline text-lg font-extrabold text-foreground">What you get</h3>
              <ul className="mt-4 space-y-2.5 text-base sm:text-sm leading-6 text-muted-foreground">
                {whatYouGet.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-primary/25 bg-[#0b100d] p-6">
              <h3 className="font-headline text-lg font-extrabold text-foreground">Risk-free to try</h3>
              <p className="mt-3 text-base sm:text-sm leading-6 text-muted-foreground">
                Test TryIPTV first with a free {FACT_TEXT.trialHours}-hour trial before you buy a plan: $0, no credit card, no auto-renew.
                After you buy, a refund is only possible if we can&apos;t provide a working subscription.
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <Button asChild>
                  <Link href="/iptv-free-trial">
                    <CirclePlay className="mr-2 h-4 w-4" aria-hidden /> Start Free Trial
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/refund-policy">See refund policy</Link>
                </Button>
              </div>
            </div>

            <div className="rounded-xl border border-white/[0.08] bg-card p-6">
              <h3 className="font-headline text-lg font-extrabold text-foreground">Paying by cryptocurrency?</h3>
              <p className="mt-3 text-base sm:text-sm leading-6 text-muted-foreground">
                Follow the payment instructions support sends on WhatsApp exactly, and use the network and wallet address given for your
                order: a payment sent on the wrong network can be delayed or lost. If anything is unclear, ask in the same chat before you
                pay.
              </p>
            </div>
          </div>

          {/* Plan Comparison Table */}
          <div className="mt-10 rounded-xl border border-white/[0.08] bg-card">
            <div className="border-b border-white/[0.07] px-5 py-4 sm:px-6">
              <h3 className="font-headline text-lg font-extrabold text-foreground">Plan Duration &amp; Price Breakdown</h3>
              <p className="mt-1 text-base sm:text-sm leading-6 text-muted-foreground">
                Every plan includes the same 2 simultaneous connections and features. Only the prepaid term, upfront total, and monthly equivalent change.
              </p>
            </div>
            <div tabIndex={0} role="region" aria-label="Plan prices table" className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <caption className="sr-only">TryIPTV prepaid plan prices, durations, and best use cases</caption>
                <thead className="border-b border-white/[0.07] text-xs uppercase tracking-wide text-muted-foreground">
                  <tr>
                    <th className="px-5 py-3 font-semibold sm:px-6">Plan</th>
                    <th className="px-5 py-3 font-semibold">Total Price</th>
                    <th className="px-5 py-3 font-semibold">Monthly Equivalent</th>
                    <th className="px-5 py-3 font-semibold">Savings vs 1-Month</th>
                    <th className="px-5 py-3 font-semibold">Connections</th>
                    <th className="px-5 py-3 font-semibold">Best For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06] text-muted-foreground">
                  {plans.map((plan) => (
                    <tr key={`comparison-${plan.id}`} className="transition-colors hover:bg-white/[0.02]">
                      <th scope="row" className="whitespace-nowrap px-5 py-3.5 font-semibold text-foreground sm:px-6">
                        {plan.name}
                      </th>
                      <td className="whitespace-nowrap px-5 py-3.5 text-foreground font-medium">
                        {formatUsd(plan.price)}
                      </td>
                      <td className="whitespace-nowrap px-5 py-3.5">
                        {formatUsd(plan.price_monthly)}/month
                      </td>
                      <td className="whitespace-nowrap px-5 py-3.5 text-primary font-medium">
                        {planSavingsExact[plan.id]?.split(" vs ")[0] ?? "—"}
                      </td>
                      <td className="whitespace-nowrap px-5 py-3.5">2 simultaneous</td>
                      <td className="px-5 py-3.5">{planBestFor[plan.id]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="border-t border-white/[0.07] px-5 py-4 text-base sm:text-xs leading-5 text-muted-foreground sm:px-6">
              <strong className="text-foreground">What does 2 connections mean?</strong> Up to two devices can stream at the same time in your household. You can configure your credentials on multiple devices, but playback is limited to two simultaneous streams.
            </p>
          </div>
        </Container>
      </Section>

      {/* Pricing FAQ */}
      <Section id="faq" className="scroll-mt-2 border-t border-white/[0.06] bg-[#070a08] py-10 sm:py-14">
        <Container>
          <SectionHeader
            eyebrow="Pricing &amp; Billing Questions"
            title="Frequently Asked Questions"
            subtitle="Straight answers about plan prices, renewals, connections, delivery times and refunds."
          />

          <div className="mx-auto max-w-[880px] overflow-hidden rounded-[18px] border border-white/[0.08] bg-[#07080a]">
            {pricingPageFaqs.map((faq, index) => (
              <details
                key={index}
                className="group border-b border-white/[0.07] px-6 last:border-b-0 sm:px-8"
              >
                <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-[16px] font-semibold leading-snug text-foreground/90 [&::-webkit-details-marker]:hidden">
                  <span>{faq.question}</span>
                  <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <div className="pb-5 pr-4 text-base sm:text-[15px] leading-relaxed text-muted-foreground sm:pr-8">
                  <p>
                    {faq.answer}
                    {faq.link && (
                      <>
                        {" "}
                        <Link href={faq.link.href} className="font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                          {faq.link.label}
                        </Link>
                        .
                      </>
                    )}
                  </p>
                </div>
              </details>
            ))}
          </div>

          <p className="mt-8 text-center text-base sm:text-sm text-muted-foreground">
            Questions?{" "}
            <Link href="/contact-us" className={link}>
              Contact us
            </Link>
            , or see{" "}
            <Link href="/faq" className={link}>
              all IPTV FAQs
            </Link>{" "}
            and the{" "}
            <Link href="/terms-conditions" className={link}>
              Terms &amp; Conditions
            </Link>
            .
          </p>
        </Container>
      </Section>

      {/* Everything you need */}
      <Section className="border-t border-white/[0.06] py-10 sm:py-14">
        <Container>
          <SectionHeader
            eyebrow="Why TryIPTV"
            title="Everything You Need to Stream"
            subtitle="Built for everyday viewing: simple setup on the devices you already own, clear picture where your connection allows it, and a flat prepaid price."
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {streamFeatures.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-xl border border-white/[0.08] bg-card p-5">
                <Icon className="h-5 w-5 text-primary" aria-hidden />
                <h3 className="mt-3 font-headline text-base font-extrabold text-foreground">{title}</h3>
                <p className="mt-1 text-base sm:text-sm leading-6 text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="#pricing-plans">
                Compare Plans <ArrowRight aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/iptv-free-trial">
                <CirclePlay aria-hidden /> Start Free Trial
              </Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
