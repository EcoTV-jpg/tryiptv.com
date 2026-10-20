import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  HelpCircle,
  Laptop,
  Monitor,
  Phone,
  PlaySquare,
  ShieldCheck,
  Smartphone,
  Tv,
  Wifi,
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { Schema } from "@/components/shared/Schema";
import { getIptvFreeTrialPageData } from "@/lib/data/iptv-free-trial-page";
import { generateMetadata as generatePageMetadata } from "@/lib/site-config";

const freeTrialWhatsAppUrl =
  "https://wa.me/15205648298?text=Hello%20TryIPTV%2C%20I%20would%20like%20to%20start%20my%20free%20IPTV%20trial.";

export function generateMetadata(): Metadata {
  const title = "24-Hour IPTV Free Trial — Test TryIPTV Before You Pay";
  const description =
    "Test TryIPTV on your own device, IPTV player, and internet connection before choosing a paid plan. 24-hour access, $0, and no credit card required.";

  return {
    ...generatePageMetadata({ title, description, canonical: "/iptv-free-trial" }),
    title: { absolute: title },
  };
}

const quickFacts = [
  ["Cost", "$0"],
  ["Trial duration", "24 consecutive hours from activation"],
  ["Payment details required", "None (no credit card or billing information requested)"],
  ["Typical activation time", "5–15 minutes after request confirmation"],
  ["Access formats", "Xtream Codes (Server URL, Username, Password) and M3U playlist URL"],
  [
    "Supported devices",
    <>
      Firestick, Android TV, Chromecast with Google TV, Smart TVs (Samsung, LG), Apple TV, Windows, Mac, MAG, and Roku{" "}
      <Link href="/devices/roku-iptv" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
        via AirPlay or screen mirroring
      </Link>
    </>,
  ],
  ["Simultaneous connections", "Confirmed when trial credentials are issued (Paid plans include two simultaneous connections)"],
  ["After the trial", "Access expires automatically. The trial does not automatically renew or convert into a paid subscription."],
  [
    "Trials per household",
    <>
      One trial per household or user (
      <Link href="/terms-conditions" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
        Terms &amp; Conditions
      </Link>
      )
    </>,
  ],
] as const;

const testingChecklist = [
  ["Important channels", "Confirm that your preferred local, national, and international channels are available and load and play as expected."],
  ["Live sports and events", "Observe stream stability and video smoothness during live broadcasts."],
  ["Picture quality", "Check resolution and visual clarity across available SD, HD, and 4K streams on your primary screen."],
  ["Channel switching", "Observe channel startup time and transition stability when changing channels."],
  ["On-demand content (VOD)", "Test playback controls, including play, pause, seeking, and audio track selection where supported."],
  ["TV guide (EPG)", "Verify that programme schedule data loads correctly in your IPTV player."],
  ["Player compatibility", "Confirm that your chosen IPTV player works correctly with your trial."],
  ["Home network performance", "Compare playback over Wi-Fi versus an Ethernet cable if you encounter buffering."],
] as const;

const steps = [
  {
    step: "01",
    title: "Request the Trial",
    desc: "Send a message via WhatsApp indicating the device and IPTV player app you plan to use. No payment or billing details are required.",
  },
  {
    step: "02",
    title: "Receive Login Details",
    desc: "Credentials typically arrive within 5–15 minutes. Depending on your player, support will provide an Xtream Codes login (Server URL, Username, Password) or an M3U playlist URL.",
  },
  {
    step: "03",
    title: "Configure Your Player",
    desc: "Open your IPTV app, enter the issued credentials, and allow the playlist and guide data to load.",
  },
  {
    step: "04",
    title: "Evaluate Playback",
    desc: "Test your preferred channels, features, and EPG during your normal viewing hours before the 24-hour period ends.",
  },
] as const;

const coreRequirements = [
  {
    title: "Compatible Streaming Device",
    description:
      "You need a supported streaming device, smart TV, or computer connected to your home network. Supported systems include Amazon Fire TV devices, Android TV, Google TV, Samsung Smart TVs, LG Smart TVs, Apple TV, Windows, and Mac, plus Roku via AirPlay or screen mirroring.",
  },
  {
    title: "IPTV Player Application",
    description:
      "TryIPTV provides the IPTV service. You use a compatible IPTV player app to load and watch the service. Popular choices include TiviMate, IPTV Smarters, and Televizo.",
  },
  {
    title: "Xtream Codes Credentials",
    description:
      "Xtream Codes is a connection format consisting of three fields: Server URL, Username, and Password. Most modern IPTV players support this format.",
    linkText: "Read our Xtream Codes Guide",
    linkHref: "/guides/what-are-xtream-codes",
  },
  {
    title: "M3U Playlist URL",
    description:
      "An M3U playlist is a web link containing channel stream addresses and category metadata. Some media players use this format instead of Xtream Codes.",
    linkText: "Read our M3U Playlist Guide",
    linkHref: "/guides/what-is-m3u",
  },
  {
    title: "Electronic Programme Guide (EPG)",
    description:
      "The EPG provides schedule listings and show descriptions inside your player's channel guide where available.",
    linkText: "Learn how guide data functions in our EPG Guide",
    linkHref: "/guides/what-is-epg",
  },
] as const;

const deviceGuides = [
  { name: "Amazon Firestick & Fire TV", href: "/devices/firestick-iptv", note: "Setup guide for Amazon Fire TV Stick and Fire TV devices." },
  { name: "Android TV & Google TV", href: "/devices/android-tv-iptv", note: "Setup guide for Android TV and Google TV streaming devices and smart TVs." },
  { name: "Samsung Smart TV", href: "/devices/samsung-tv-iptv", note: "Configuration instructions for compatible players on Samsung smart TVs." },
  { name: "LG Smart TV", href: "/devices/lg-tv-iptv", note: "Setup guide for supported IPTV players on LG smart TVs." },
  { name: "Apple TV", href: "/devices/apple-tv-iptv", note: "Setup steps for compatible media players on Apple TV (tvOS)." },
  { name: "Windows PC", href: "/devices/windows-iptv", note: "Setup guide for IPTV player software on Windows computers." },
  { name: "Apple Mac", href: "/devices/mac-iptv", note: "Configuration instructions for compatible players on macOS." },
  { name: "Google Chromecast", href: "/devices/chromecast-iptv", note: "Player apps on Chromecast with Google TV, or casting to older Chromecast models." },
  { name: "Roku", href: "/devices/roku-iptv", note: "Streaming to Roku through AirPlay 2 or screen mirroring from another device." },
  { name: "MAG Box", href: "/devices/mag-box-iptv", note: "Portal URL and MAC address setup for Infomir MAG set-top boxes." },
] as const;

const playerGuides = [
  { name: "TiviMate Setup Guide", href: "/players/tivimate", note: "Guide for configuring playlists and EPG in TiviMate for Android TV and Firestick." },
  { name: "IPTV Smarters Pro Setup Guide", href: "/players/iptv-smarters", note: "Setup walkthrough for Xtream Codes on IPTV Smarters across supported platforms." },
  { name: "View All Player Guides", href: "/players", note: "Compare and configure all supported third-party IPTV players." },
] as const;

const troubleshootingLinks = [
  { issue: "Buffering or stuttering", label: "IPTV Buffering Guide", href: "/help/iptv-buffering" },
  { issue: "Login details not working", label: "IPTV Login Troubleshooting Guide", href: "/help/iptv-login-not-working" },
  { issue: "M3U playlist not loading", label: "M3U Troubleshooting Guide", href: "/help/m3u-not-loading" },
  { issue: "EPG programme guide missing", label: "EPG Troubleshooting Guide", href: "/help/epg-not-working" },
  { issue: "Streams not playing", label: "IPTV Not Working Guide", href: "/help/iptv-not-working" },
] as const;

const planComparisonRows = [
  ["Cost", "$0", "From $16 (1 Month) to $90 (12 Months)"],
  ["Duration", "24 consecutive hours", "1, 3, 6, or 12 months prepaid"],
  ["Payment", "None", "Prepaid; payment instructions provided when ordering"],
  ["Simultaneous connections", "Confirmed at issue", "2 simultaneous connections included on all plans"],
  ["Automatic renewal", "No", "No (prepaid plans do not auto-renew)"],
  ["Access format", "Xtream Codes / M3U", "Xtream Codes / M3U"],
  ["When access ends", "Service stops automatically", "Access expires at the end of the prepaid period"],
] as const;

export default async function IptvFreeTrialPage() {
  const { breadcrumbSchema, serviceSchema, trialFaqs } = await getIptvFreeTrialPageData();

  return (
    <>
      <Schema id="breadcrumb" schema={breadcrumbSchema} />
      <Schema id="service" schema={serviceSchema} />

      {/* Hero Section */}
      <Section className="relative overflow-hidden border-b border-white/[0.07] pt-12 pb-14 sm:pt-16 sm:pb-20">
        <Container className="relative">
          <div className="mx-auto max-w-4xl text-center">
            <Breadcrumb items={[{ label: "IPTV Free Trial" }]} align="center" />
            <p className="eyebrow mb-3">Try Before You Buy</p>
            <h1 className="font-headline text-3xl font-extrabold leading-[1.08] text-foreground sm:text-5xl lg:text-6xl">
              24-Hour IPTV Free Trial — Test TryIPTV Before You Pay
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              Test TryIPTV on your own device, IPTV player, and internet connection before choosing a paid plan. The trial lasts 24 hours, costs $0, requires no credit card, and does not automatically convert into a paid subscription.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <a href={freeTrialWhatsAppUrl} target="_blank" rel="noopener noreferrer">
                  <SiWhatsapp aria-hidden="true" className="mr-2 h-4 w-4" /> Start Free Trial
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/setup">View Setup Guide</Link>
              </Button>
            </div>
            <p className="mt-4 text-base sm:text-sm text-muted-foreground">Opens WhatsApp — no payment details needed.</p>
            <div className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-semibold text-muted-foreground">
              <span>24-Hour Access</span>
              <span>$0 Cost</span>
              <span>No Credit Card</span>
              <span>No Auto-Renewal</span>
            </div>
          </div>
        </Container>
      </Section>

      {/* Section 1: Quick Overview */}
      <Section className="border-b border-white/[0.06] bg-[#070a08] py-10 sm:py-14">
        <Container>
          <div className="mx-auto max-w-4xl">
            <SectionHeader
              eyebrow="Quick Overview"
              title="How the TryIPTV Free Trial Works"
              subtitle="The trial gives you 24 hours of free access, issued over WhatsApp in about 5–15 minutes, to test TryIPTV on your own device and IPTV player."
            />
            <p className="text-base leading-7 text-muted-foreground sm:text-lg">
              The TryIPTV free trial provides temporary 24-hour access so you can evaluate stream playback, device compatibility, and available channels on your home network before spending money. Testing on your own device and home connection gives you the most realistic view of how the service works in your setup.
            </p>

            <div className="mt-6 overflow-hidden rounded-lg border border-white/[0.09] bg-card">
              <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Free trial details table">
                <table className="w-full text-left text-sm">
                  <caption className="sr-only">TryIPTV free trial details and specifications</caption>
                  <tbody className="divide-y divide-white/[0.06]">
                    {quickFacts.map(([label, value]) => (
                      <tr key={label} className="transition-colors hover:bg-white/[0.02]">
                        <th scope="row" className="w-1/3 px-5 py-3.5 font-semibold text-foreground">
                          {label}
                        </th>
                        <td className="px-5 py-3.5 text-muted-foreground">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Section 2: What to Test During Your 24-Hour Trial */}
      <Section className="border-b border-white/[0.06] py-10 sm:py-14">
        <Container>
          <div className="mx-auto max-w-4xl">
            <SectionHeader
              eyebrow="Evaluation Checklist"
              title="What to Test During Your 24-Hour Trial"
              subtitle="Use the 24-hour testing period to evaluate the specific channels, categories, and features you plan to watch regularly."
            />

            <div className="overflow-hidden rounded-lg border border-white/[0.09] bg-card">
              <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Trial testing checklist table">
                <table className="w-full min-w-[32rem] text-left text-sm">
                  <caption className="sr-only">Trial testing priorities and checklist</caption>
                  <thead className="border-b border-white/[0.09] bg-white/[0.02] text-xs font-extrabold uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th scope="col" className="w-1/3 px-5 py-3 text-primary">What to Test</th>
                      <th scope="col" className="px-5 py-3">What to Check</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06]">
                    {testingChecklist.map(([item, check]) => (
                      <tr key={item} className="transition-colors hover:bg-white/[0.02]">
                        <th scope="row" className="px-5 py-3.5 font-semibold text-foreground align-top">
                          {item}
                        </th>
                        <td className="px-5 py-3.5 text-muted-foreground">{check}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Section 3: How to Request and Start Your Free Trial */}
      <Section variant="alt" className="border-b border-white/[0.06] bg-[#070a08] py-10 sm:py-14">
        <Container>
          <div className="mx-auto max-w-4xl">
            <SectionHeader
              eyebrow="Simple Steps"
              title="How to Request and Start Your Free Trial"
              subtitle="Four straightforward steps from request to evaluation."
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {steps.map((s) => (
                <div key={s.step} className="rounded-lg border border-white/[0.09] bg-card p-5">
                  <span className="font-mono text-xs font-bold text-primary">{s.step}</span>
                  <h3 className="mt-2 font-headline text-lg font-extrabold text-foreground">{s.title}</h3>
                  <p className="mt-2 text-base sm:text-sm leading-6 text-muted-foreground">
                    {s.desc}
                    {s.step === "03" && (
                      <>
                        {" "}
                        Follow the{" "}
                        <Link href="/setup" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                          Universal IPTV Setup Guide
                        </Link>{" "}
                        if you need step-by-step assistance.
                      </>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Section 4: What You Need Before You Begin */}
      <Section className="border-b border-white/[0.06] py-10 sm:py-14">
        <Container>
          <div className="mx-auto max-w-4xl">
            <SectionHeader
              eyebrow="Core Requirements"
              title="What You Need Before You Begin"
              subtitle="Three components are required to stream: a device, a player app, and account credentials."
            />

            <div className="space-y-4">
              {coreRequirements.map((req) => (
                <div key={req.title} className="rounded-lg border border-white/[0.09] bg-card p-5">
                  <h3 className="font-headline text-lg font-extrabold text-foreground">{req.title}</h3>
                  <p className="mt-2 text-base sm:text-sm leading-6 text-muted-foreground">
                    {req.description}
                    {"linkText" in req && req.linkText && req.linkHref && (
                      <>
                        {" "}
                        <Link href={req.linkHref} className="font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                          {req.linkText}
                        </Link>
                        .
                      </>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Section 5: Device and Player Setup Guides */}
      <Section variant="alt" className="border-b border-white/[0.06] bg-[#070a08] py-10 sm:py-14">
        <Container>
          <div className="mx-auto max-w-4xl">
            <SectionHeader
              eyebrow="Setup Guides"
              title="Device and Player Setup Guides"
              subtitle="Follow the setup guide for your specific device or media player."
            />

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* Devices */}
              <div>
                <h3 className="mb-4 font-headline text-lg font-extrabold text-foreground">Device Setup Guides</h3>
                <div className="space-y-3">
                  {deviceGuides.map((d) => (
                    <Link
                      key={d.name}
                      href={d.href}
                      className="group block rounded-lg border border-white/[0.09] bg-card p-4 transition-colors hover:border-primary/40"
                    >
                      <p className="font-headline text-base sm:text-sm font-bold text-foreground group-hover:text-primary">
                        {d.name} <ArrowRight className="ml-1 inline h-3.5 w-3.5" />
                      </p>
                      <p className="mt-1 text-base sm:text-xs leading-5 text-muted-foreground">{d.note}</p>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Players */}
              <div>
                <h3 className="mb-4 font-headline text-lg font-extrabold text-foreground">Player Setup Guides</h3>
                <div className="space-y-3">
                  {playerGuides.map((p) => (
                    <Link
                      key={p.name}
                      href={p.href}
                      className="group block rounded-lg border border-white/[0.09] bg-card p-4 transition-colors hover:border-primary/40"
                    >
                      <p className="font-headline text-base sm:text-sm font-bold text-foreground group-hover:text-primary">
                        {p.name} <ArrowRight className="ml-1 inline h-3.5 w-3.5" />
                      </p>
                      <p className="mt-1 text-base sm:text-xs leading-5 text-muted-foreground">{p.note}</p>
                    </Link>
                  ))}
                </div>

                <div className="mt-6 rounded-lg border border-white/[0.08] bg-card/60 p-4 text-base sm:text-xs leading-5 text-muted-foreground">
                  Looking for general instructions? Follow the{" "}
                  <Link href="/setup" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                    Universal IPTV Setup Guide
                  </Link>
                  .
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Section 6: Is an IPTV Free Trial Worth It? */}
      <Section className="border-b border-white/[0.06] py-10 sm:py-14">
        <Container>
          <div className="mx-auto max-w-3xl">
            <SectionHeader
              eyebrow="Decision Guide"
              title="Is an IPTV Free Trial Worth It?"
            />

            <div className="space-y-4 text-base leading-7 text-muted-foreground sm:text-lg">
              <p>
                A free trial helps you evaluate whether your device, player, and home connection work well with the service before paying.
              </p>
              <p>
                Testing on your own equipment during your normal viewing hours lets you check channel startup time, stream smoothness, and guide loading firsthand.
              </p>
              <p className="rounded-lg border border-white/[0.09] bg-card p-4 text-base leading-6">
                <strong className="text-foreground">Service Evaluation Note:</strong> A 24-hour test is useful for evaluating current compatibility and playback, but it cannot guarantee how any internet-delivered service will perform over several months. To minimize risk after evaluating the trial, consider starting with a shorter prepaid term (such as a 1-month plan) before selecting a longer subscription.
              </p>
            </div>

            <div className="mt-8">
              <h3 className="font-headline text-xl font-extrabold text-foreground">Who Should Use the Free Trial</h3>
              <ul className="mt-4 space-y-2.5 text-base sm:text-sm leading-6 text-muted-foreground">
                <li className="flex items-start gap-2.5">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-primary" />
                  <span>New viewers testing TryIPTV for the first time.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-primary" />
                  <span>Viewers confirming that their specific TV or streaming player works with the service.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-primary" />
                  <span>Viewers wanting to check specific sports, news, or regional channels before purchasing.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-primary" />
                  <span>Users who want to evaluate EPG data loading and VOD playback on their home connection.</span>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* Section 7: Free Trial vs. Paid Subscription */}
      <Section variant="alt" className="border-b border-white/[0.06] bg-[#070a08] py-10 sm:py-14">
        <Container>
          <div className="mx-auto max-w-4xl">
            <SectionHeader
              eyebrow="Plan Comparison"
              title="Free Trial vs. Paid Subscription"
              subtitle="Review how the 24-hour evaluation compares to standard prepaid subscriptions."
            />

            <div className="overflow-hidden rounded-lg border border-white/[0.09] bg-card">
              <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Free trial vs paid plan table">
                <table className="w-full text-left text-sm">
                  <caption className="sr-only">Comparison between free trial and paid subscription plans</caption>
                  <thead className="border-b border-white/[0.09] bg-white/[0.02] text-xs font-extrabold uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th scope="col" className="px-5 py-3">Feature</th>
                      <th scope="col" className="px-5 py-3 text-primary">24-Hour Free Trial</th>
                      <th scope="col" className="px-5 py-3">Paid Subscription Plans</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06]">
                    {planComparisonRows.map(([feature, trial, paid]) => (
                      <tr key={feature} className="transition-colors hover:bg-white/[0.02]">
                        <th scope="row" className="px-5 py-3.5 font-semibold text-foreground">
                          {feature}
                        </th>
                        <td className="px-5 py-3.5 text-muted-foreground">{trial}</td>
                        <td className="px-5 py-3.5 text-muted-foreground">{paid}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-8 rounded-lg border border-white/[0.09] bg-card p-6">
              <h3 className="font-headline text-lg font-extrabold text-foreground">What Happens When Your Trial Ends</h3>
              <p className="mt-2 text-base sm:text-sm leading-6 text-muted-foreground">
                When your 24 hours conclude, trial access expires and streams will stop loading. The trial does not automatically renew or convert into a paid subscription, and no cancellation request is required.
              </p>
              <p className="mt-2 text-base sm:text-sm leading-6 text-muted-foreground">
                If you want to continue watching,{" "}
                <Link href="/pricing" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                  compare prepaid plans
                </Link>
                . All subscriptions are prepaid upfront with no recurring billing.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Section 8: Troubleshooting During Your Trial */}
      <Section className="border-b border-white/[0.06] py-10 sm:py-14">
        <Container>
          <div className="mx-auto max-w-4xl">
            <SectionHeader
              eyebrow="Troubleshooting"
              title="Troubleshooting During Your Trial"
              subtitle="If you experience issues during your 24-hour test window, use these direct guides to resolve them:"
            />

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {troubleshootingLinks.map((t) => (
                <div key={t.issue} className="rounded-lg border border-white/[0.09] bg-card p-4">
                  <p className="text-xs font-semibold text-muted-foreground">{t.issue}</p>
                  <Link
                    href={t.href}
                    className="tap-target mt-1 inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline"
                  >
                    {t.label} <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Section 9: Frequently Asked Questions */}
      <Section variant="alt" className="border-b border-white/[0.06] bg-[#070a08] py-10 sm:py-14">
        <Container>
          <div className="mx-auto max-w-4xl">
            <SectionHeader
              eyebrow="FAQ"
              title="Frequently Asked Questions About the Free Trial"
              subtitle="Direct answers to common questions about testing TryIPTV."
            />

            <div className="overflow-hidden rounded-lg border border-white/[0.08] bg-[#07080a]">
              {trialFaqs.map((faq) => (
                <details key={faq.question} className="group border-b border-white/[0.07] px-5 last:border-b-0 sm:px-7">
                  <summary className="flex min-h-[60px] cursor-pointer list-none items-center justify-between gap-4 py-4 text-left text-base font-semibold text-foreground [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <span aria-hidden="true" className="text-primary transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="pb-5 pr-6 text-base sm:text-sm leading-6 text-muted-foreground">{faq.answer}</p>
                </details>
              ))}
            </div>

            <p className="mt-6 text-center text-base sm:text-sm text-muted-foreground">
              Need help with a specific issue?{" "}
              <Link href="/contact-us" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                Contact support
              </Link>
              .
            </p>
          </div>
        </Container>
      </Section>

      {/* Section 10: About TryIPTV & Final CTA */}
      <Section className="py-10 sm:py-14">
        <Container>
          <div className="mx-auto max-w-4xl">
            <SectionHeader eyebrow="About TryIPTV" title="About TryIPTV" />

            <div className="space-y-4 text-base leading-6 text-muted-foreground sm:leading-7">
              <p>
                TryIPTV is an IPTV service provider, not a player app: you watch through a compatible IPTV player on your own device. After the trial, paid plans are prepaid for 1, 3, 6, or 12 months with no automatic renewal.
              </p>

              {/* Touch: 44px link rows with no vertical gap so wrapped rows never overlap. */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-sm font-semibold pointer-coarse:gap-y-0 [&>a]:inline-flex [&>a]:min-h-11 [&>a]:items-center pointer-fine:[&>a]:min-h-0">
                <Link href="/pricing" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                  Compare prepaid plans
                </Link>
                <Link href="/contact-us" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                  Contact support
                </Link>
                <Link href="/terms-conditions" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                  Terms &amp; Conditions
                </Link>
                <Link href="/refund-policy" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                  Refund Policy
                </Link>
              </div>
            </div>

            {/* Closing Call to Action */}
            <div className="mt-10 overflow-hidden rounded-lg border border-primary/25 bg-[#0b100d] p-7 text-center sm:p-9">
              <p className="eyebrow mb-2">Test Before You Pay</p>
              <h2 className="font-headline text-2xl font-extrabold text-foreground sm:text-3xl">
                Test TryIPTV Before You Pay
              </h2>
              <p className="mx-auto mt-2 max-w-xl text-base leading-6 text-muted-foreground">
                Request a 24-hour trial to evaluate channels, playback, and player compatibility on your own setup.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <a href={freeTrialWhatsAppUrl} target="_blank" rel="noopener noreferrer">
                    <SiWhatsapp aria-hidden="true" className="mr-2 h-4 w-4" /> Start Free Trial
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/setup">View Setup Guide</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
