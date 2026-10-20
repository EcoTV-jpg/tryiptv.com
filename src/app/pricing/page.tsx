import type { Metadata } from "next";
import type React from "react";
import Link from "next/link";
import { ArrowRight, Check, ChevronDown, CirclePlay, HelpCircle, MessageCircle, ShieldCheck, Tv } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { Schema } from "@/components/shared/Schema";
import { generateMetadata as generatePageMetadata } from "@/lib/site-config";
import { getPricingPageData } from "@/lib/data/pricing-page";
import { plans } from "@/lib/site-data/pricing";

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
  "4K Ultra HD Streaming Quality",
  "25,000+ Live Channels Worldwide",
  "120,000+ Movies & TV Shows",
  "PPV Events Included",
  "VOD Access",
  "Smart EPG & Catch-Up TV",
  "Customer Support",
  "Multi-Device Compatibility",
] as const;

const sharedFeatures: { title: string; desc: React.ReactNode }[] = [
  {
    title: "2 Simultaneous Connections",
    desc: (
      <>
        Stream on up to two devices at the same time in your household. See{" "}
        <Link href="/devices" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">supported devices</Link>.
      </>
    ),
  },
  {
    title: "Xtream Codes API",
    desc: (
      <>
        Server URL, username, and password login supported by most modern{" "}
        <Link href="/players" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">IPTV players</Link>.
      </>
    ),
  },
  {
    title: "M3U Playlist URL",
    desc: "Standard playlist URL format for compatible media players and applications.",
  },
  {
    title: "Smart EPG Support",
    desc: "Programme schedule information and channel timelines where available.",
  },
  {
    title: "25,000+ Live Channels",
    desc: "Live sports, news, and entertainment channels where available.",
  },
  {
    title: "120,000+ Movies & Series",
    desc: "On-demand video catalog with regular updates where available.",
  },
  {
    title: "HD, Full HD & 4K Streams",
    desc: (
      <>
        High-definition video playback where supported by the source stream. Check{" "}
        <Link href="/guides/iptv-internet-speed" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">how much internet speed IPTV needs</Link>.
      </>
    ),
  },
  {
    title: "Prepaid Billing — No Auto-Renewal",
    desc: "Flat upfront pricing with zero recurring billing or automatic charges.",
  },
];

const orderSteps = [
  {
    step: "01",
    title: "Choose Your Plan",
    desc: "Select a 1, 3, 6, or 12-month prepaid duration based on your viewing plans.",
  },
  {
    step: "02",
    title: "Request Payment Instructions",
    desc: "Click your chosen plan to connect with support and receive the current payment instructions for your order.",
  },
  {
    step: "03",
    title: "Complete One-Time Payment",
    desc: "Complete the one-time prepaid payment. There is no recurring subscription or automatic renewal.",
  },
  {
    step: "04",
    title: "Receive Account Credentials",
    desc: "Credentials and setup details are typically delivered within 5–15 minutes after payment confirmation.",
  },
] as const;

export default async function IPTVSubscription() {
  const { productSchema, breadcrumbSchema, pricingPageFaqs } = await getPricingPageData();

  return (
    <>
      <Schema id="product" schema={productSchema} />
      <Schema id="breadcrumb" schema={breadcrumbSchema} />

      {/* Hero Section */}
      <Section className="relative overflow-hidden border-b border-white/[0.07] pt-8 pb-10 sm:pt-12 sm:pb-14">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
        <Container className="relative">
          <Breadcrumb items={[{ label: "Pricing" }]} align="center" />
          <SectionHeader
            as="h1"
            eyebrow="Prepaid Subscription Pricing"
            title="TryIPTV Pricing & Subscription Plans"
            subtitle="TryIPTV prepaid plans cost $16 for 1 month, $39 for 3 months, $60 for 6 months, or $90 for 12 months. All paid plans include two simultaneous connections and do not renew automatically. Longer prepaid terms reduce the equivalent monthly cost, from $16 for one month down to $7.50 per month on the 12-month plan."
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
          {/* Above-the-fold CTAs (same buttons as the homepage hero): the plan cards start below the fold. */}
          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:justify-center">
            <Button asChild>
              <Link href="#pricing-plans">
                Compare Plans <ArrowRight aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/iptv-free-trial">
                <CirclePlay aria-hidden /> Start Free Trial
              </Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* Section 1: Compare TryIPTV Plans */}
      <Section id="pricing-plans" className="scroll-mt-2 bg-[#050706] py-10 sm:py-14">
        <Container>
          <SectionHeader
            eyebrow="Prepaid IPTV Plans"
            title="Compare TryIPTV Plans"
            subtitle="Choose the prepaid duration that best matches your viewing needs. Each plan is paid upfront and does not renew automatically."
          />

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

      {/* Section 2: How to Buy a Plan */}
      <Section variant="alt" className="border-t border-white/[0.06] bg-[#070a08] py-10 sm:py-14">
        <Container>
          <SectionHeader
            eyebrow="Order Process"
            title="How to Buy a Plan"
            subtitle="Four straightforward steps take you from plan selection to streaming."
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {orderSteps.map((s) => (
              <div key={s.step} className="rounded-xl border border-white/[0.08] bg-card p-5">
                <span className="font-mono text-xs font-bold text-primary">{s.step}</span>
                <h3 className="mt-2 font-headline text-base font-extrabold text-foreground">{s.title}</h3>
                <p className="mt-2 text-base sm:text-xs leading-5 text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-center text-base sm:text-sm text-muted-foreground">
            Looking for installation help? Read our{" "}
            <Link href="/setup" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
              Universal IPTV Setup Guide
            </Link>
            .
          </p>
        </Container>
      </Section>

      {/* Section 3: What Is Included With Every Paid Plan? */}
      <Section className="border-t border-white/[0.06] py-10 sm:py-14">
        <Container>
          <SectionHeader
            eyebrow="Included Features"
            title="What Is Included With Every Paid Plan?"
            subtitle="Every prepaid subscription includes the same core service, format access, and connection allowance."
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sharedFeatures.map((feat) => (
              <div key={feat.title} className="rounded-xl border border-white/[0.08] bg-card p-5">
                <Check className="h-5 w-5 text-primary" />
                <h3 className="mt-3 font-headline text-base font-extrabold text-foreground">{feat.title}</h3>
                <p className="mt-1 text-base sm:text-xs leading-5 text-muted-foreground">{feat.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Section 4: How TryIPTV Pricing Works */}
      <Section className="border-t border-white/[0.06] py-10 sm:py-14">
        <Container>
          <SectionHeader
            eyebrow="Pricing Model"
            title="How TryIPTV Pricing Works"
            subtitle="Straightforward upfront billing with transparent math and zero recurring surprises."
          />

          <p className="mx-auto max-w-3xl text-base leading-7 text-muted-foreground">
            Every plan is a single prepaid payment for 1, 3, 6, or 12 months and does not renew automatically. The monthly equivalent is the plan price divided by its months; savings compare each plan with buying the $16 1-month plan repeatedly (for example, $192 for twelve months versus $90 for the 12-month plan).
          </p>
        </Container>
      </Section>

      {/* Section 5: Test Before Choosing a Plan */}
      <Section className="border-t border-white/[0.06] py-10 sm:py-14">
        <Container>
          <div className="relative overflow-hidden rounded-xl border border-primary/25 bg-[#0b100d] p-7 sm:p-8 md:p-10 lg:flex lg:items-center lg:justify-between lg:text-left">
            <div className="absolute inset-y-0 left-0 w-1 bg-primary" />
            <div className="max-w-2xl">
              <p className="eyebrow mb-3 flex items-center justify-center gap-2 lg:justify-start">
                <ShieldCheck className="h-4 w-4 text-primary" /> Evaluate First
              </p>
              <h2 className="font-headline text-3xl font-extrabold leading-[1.12] text-foreground sm:text-4xl">
                Test Before Choosing a Plan
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-muted-foreground lg:mx-0">
                Not ready to choose a prepaid term? Use the 24-hour free trial to test TryIPTV on your own compatible setup before purchasing. The trial costs $0, requires no credit card, and does not automatically renew. Technical issues support can&apos;t resolve within 7 days of purchase may qualify under the{" "}
                <Link href="/refund-policy" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">refund policy</Link>.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:ml-10 lg:mt-0 lg:shrink-0">
              <Button asChild size="lg">
                <Link href="/iptv-free-trial">
                  <CirclePlay className="mr-2 h-4 w-4" /> Start Free Trial
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact-us">
                  <MessageCircle className="mr-2 h-4 w-4" /> Contact Support
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Section 6: Pricing FAQ */}
      <Section id="faq" className="scroll-mt-2 border-t border-white/[0.06] bg-[#070a08] py-10 sm:py-14">
        <Container>
          <SectionHeader
            eyebrow="Pricing &amp; Billing Questions"
            title="Frequently Asked Questions About IPTV Pricing"
            subtitle="Straightforward answers about plan durations, payment instructions, renewal policies, and connections."
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
            Questions about ordering?{" "}
            <Link href="/contact-us" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
              Contact our support team
            </Link>{" "}
            or see{" "}
            <Link href="/faq" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
              all IPTV FAQs
            </Link>
            .
          </p>
        </Container>
      </Section>

      {/* Section 7: About TryIPTV Pricing */}
      <Section className="border-t border-white/[0.06] py-10 sm:py-14">
        <Container>
          <div className="mx-auto max-w-4xl">
            <SectionHeader eyebrow="Commercial Transparency" title="About TryIPTV Pricing" />

            <div className="space-y-4 text-base leading-6 text-muted-foreground sm:leading-7">
              <p>
                TryIPTV sells prepaid IPTV plans with no recurring billing; current payment instructions are provided when ordering.
              </p>

              {/* Touch: 44px link rows with no vertical gap so wrapped rows never overlap. */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-sm font-semibold pointer-coarse:gap-y-0 [&>a]:inline-flex [&>a]:min-h-11 [&>a]:items-center pointer-fine:[&>a]:min-h-0">
                <Link href="/iptv-free-trial" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                  24-Hour Free Trial
                </Link>
                <Link href="/setup" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                  Universal IPTV Setup Guide
                </Link>
                <Link href="/refund-policy" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                  Refund Policy
                </Link>
                <Link href="/terms-conditions" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                  Terms &amp; Conditions
                </Link>
                <Link href="/contact-us" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
