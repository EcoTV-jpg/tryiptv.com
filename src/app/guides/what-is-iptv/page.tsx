import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { Container } from "@/components/shared/Container";
import { Schema } from "@/components/shared/Schema";
import { Section } from "@/components/shared/Section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateArticleSchema, generateBreadcrumbSchema } from "@/lib/schema";
import { PRODUCT_TRUTHS, SITE_URL, generateMetadata as generatePageMetadata } from "@/lib/site-config";

const title = "What Is IPTV? A Clear Beginner's Guide to Internet TV";
const description =
  "Learn what IPTV means, how internet-based TV differs from cable or satellite, and how playlists, players, EPG data, and devices fit together.";
const canonical = "/guides/what-is-iptv";
const modifiedDate = "2026-10-06";

export function generateMetadata(): Metadata {
  return {
    ...generatePageMetadata({
      title,
      description,
      canonical,
    }),
    title: {
      absolute: title,
    },
  };
}

const articleSchema = generateArticleSchema({
  headline: title,
  description,
  dateModified: modifiedDate,
  url: `${SITE_URL}${canonical}`,
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", item: `${SITE_URL}/` },
  { name: "Guides", item: `${SITE_URL}/guides` },
  { name: "What Is IPTV?", item: `${SITE_URL}${canonical}` },
]);

const comparisonRows = [
  {
    label: "Delivery",
    iptv: "Streams video over an internet connection.",
    traditional: "Uses cable, satellite, or broadcast infrastructure.",
  },
  {
    label: "Equipment",
    iptv: "Usually needs a compatible device and IPTV player app.",
    traditional: "Often needs provider-issued boxes or fixed wiring.",
  },
  {
    label: "Access",
    iptv: "Can work through M3U playlists or Xtream Codes credentials.",
    traditional: "Typically tied to the provider's own receiver and account system.",
  },
  {
    label: "Reliability factors",
    iptv: "Depends heavily on internet speed, Wi-Fi quality, device performance, and stream source.",
    traditional: "Depends more on the provider's physical signal and installed hardware.",
  },
];

const essentials = [
  {
    title: "An IPTV service",
    text: "The service supplies access details such as an M3U playlist URL or Xtream Codes login. TryIPTV supports both methods.",
  },
  {
    title: "A compatible device",
    text: "Fire TV, Android TV, smart TVs, Apple TV, computers, phones, and set-top boxes can all work, but setup differs by platform.",
  },
  {
    title: "A player app",
    text: "The player is the software that reads your playlist or login details and presents channels, movies, series, and TV guide data.",
  },
  {
    title: "A stable connection",
    text: "IPTV does not need a cable line, but it does need steady internet. Ethernet or strong Wi-Fi usually matters more than peak speed alone.",
  },
];

const concepts = [
  {
    title: "M3U playlist",
    href: "/guides/what-is-m3u",
    text: "An M3U playlist is a URL or file that tells a compatible player where streams are located.",
  },
  {
    title: "Xtream Codes",
    href: "/guides/what-are-xtream-codes",
    text: "Xtream Codes credentials usually include a server URL, username, and password for supported apps.",
  },
  {
    title: "EPG",
    href: "/guides/what-is-epg",
    text: "An electronic programme guide adds channel schedules, show titles, and timing data where supported.",
  },
];

const stackedLabel =
  "text-muted-foreground before:font-semibold before:text-foreground/80 before:content-[attr(data-label)] sm:before:content-none";

export default function WhatIsIptvPage() {
  return (
    <>
      <Schema id="article" schema={articleSchema} />
      <Schema id="breadcrumb" schema={breadcrumbSchema} />

      <Section className="border-b border-white/[0.07] pt-10 pb-14 sm:pt-14 sm:pb-20">
        <Container>
          <Breadcrumb
            items={[
              { label: "Guides", href: "/guides" },
              { label: "What Is IPTV?" },
            ]}
            align="center"
          />
          <div className="mx-auto max-w-4xl text-center">
            <p className="eyebrow mb-3">IPTV Basics</p>
            <h1 className="font-headline text-3xl font-extrabold leading-[1.1] text-foreground sm:text-4xl lg:text-5xl">
              What Is IPTV?
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
              IPTV means Internet Protocol Television. Instead of receiving TV through a cable line,
              satellite dish, or antenna broadcast, IPTV delivers live TV and on-demand video through
              an internet connection to a compatible app or device.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild>
                <Link href="/guides/how-does-iptv-work">
                  Learn how IPTV works <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/setup">See the setup path</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <article className="mx-auto max-w-4xl">
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p className="lead text-xl leading-8 text-foreground">
                In practical terms, IPTV is a way to watch television using internet data. A service
                provides access details, a player app reads those details, and your device plays the
                live channels, movies, series, and guide information that the service makes available.
              </p>

              <h2>How IPTV differs from cable or satellite</h2>
              <p>
                Traditional TV systems are built around dedicated delivery networks. Cable TV arrives
                through coaxial or fiber infrastructure, satellite TV arrives from a dish, and
                broadcast TV arrives over the air. IPTV uses the same general internet connection you
                use for websites, apps, and video calls. For an in-depth side-by-side breakdown of costs,
                equipment, contracts, and reliability tradeoffs, see our complete guide on{" "}
                <Link href="/guides/iptv-vs-cable" className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                  IPTV vs. cable TV
                </Link>
                .
              </p>
            </div>

            <div className="my-8 overflow-hidden rounded-lg border border-white/[0.09]">
              {/* Column header only fits once rows go 3-up; stacked rows carry their own labels below. */}
              <div className="hidden bg-card px-4 py-3 text-sm font-bold text-foreground sm:grid sm:grid-cols-3">
                <span>Topic</span>
                <span>IPTV</span>
                <span>Cable or satellite</span>
              </div>
              {comparisonRows.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-1 gap-2 border-t border-white/[0.09] px-4 py-4 text-base sm:text-sm leading-6 sm:grid-cols-3"
                >
                  <span className="font-semibold text-foreground">{row.label}</span>
                  {/* Stacked (mobile) rows repeat the hidden column header via CSS-generated content,
                      so no extra text is added to the HTML; sm+ shows the real header instead. */}
                  <span data-label="IPTV: " className={stackedLabel}>{row.iptv}</span>
                  <span data-label="Cable or satellite: " className={stackedLabel}>{row.traditional}</span>
                </div>
              ))}
            </div>

            <div className="prose prose-lg max-w-none dark:prose-invert">
              <h2>What you can watch with IPTV</h2>
              <p>
                IPTV can include live channels, sports channels, movies, series, catch-up features,
                and programme guide data. The exact library depends on the service, plan, region,
                device, and player support. TryIPTV&apos;s current product configuration lists{" "}
                {PRODUCT_TRUTHS.channels} live channels and {PRODUCT_TRUTHS.vod} movies and series,
                with {PRODUCT_TRUTHS.connections} simultaneous connections on prepaid plans.
              </p>

              <h2>What you need to use IPTV</h2>
            </div>

            <div className="my-8 grid gap-4 sm:grid-cols-2">
              {essentials.map((item) => (
                <Card key={item.title}>
                  <CardHeader className="pb-3">
                    <CardTitle as="h3" className="flex items-center gap-2 text-lg font-extrabold">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base sm:text-sm leading-6 text-muted-foreground">{item.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="prose prose-lg max-w-none dark:prose-invert">
              <h2>M3U, Xtream Codes, and EPG in plain English</h2>
              <p>
                IPTV setup terms can sound more complicated than they are. Most users only need to
                know which login method their player supports and where to enter the details.
              </p>
            </div>

            <div className="my-8 grid gap-4 md:grid-cols-3">
              {concepts.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg border border-white/[0.09] bg-card p-5 transition-colors hover:border-primary/40"
                >
                  <h3 className="font-headline text-lg font-extrabold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-base sm:text-sm leading-6 text-muted-foreground">{item.text}</p>
                  <span className="mt-4 inline-flex items-center text-sm font-semibold text-primary">
                    Read guide <ArrowRight className="ml-1.5 h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>

            <div className="prose prose-lg max-w-none dark:prose-invert">
              <h2>Where devices and player apps fit in</h2>
              <p>
                TryIPTV is the IPTV service. Third-party IPTV players are separate apps used to open
                compatible M3U or Xtream Codes access details. Some devices can install IPTV players
                directly from an app store, while others have restrictions or require a different
                setup method.
              </p>
              <p>
                Start with the <Link href="/devices">device guides</Link> if you already know what
                you want to watch on, or use the <Link href="/players">player guides</Link> if you
                are comparing apps such as IPTV Smarters, TiviMate, or XCIPTV.
              </p>

              <h2>Internet speed and buffering basics</h2>
              <p>
                IPTV quality depends on a stable connection, not just the number printed on a speed
                test. Wi-Fi congestion, distance from the router, old devices, app cache, stream
                quality, and local network traffic can all affect playback. For recommended bandwidth
                targets and multi-device planning, read our <Link href="/guides/iptv-internet-speed">IPTV internet speed guide</Link>,
                or consult our <Link href="/help/iptv-buffering">IPTV buffering troubleshooting checklist</Link> to resolve active freezing.
              </p>

              <h2>Is IPTV right for you?</h2>
              <p>
                IPTV is useful when you want internet-based TV access across flexible devices, but
                it works best when you are comfortable installing an app and entering service
                credentials. It is not identical to a cable box experience, and the best setup
                depends on your device, player, and internet connection.
              </p>
            </div>

            <div className="mt-10 rounded-lg border border-primary/25 bg-[#0b100d] p-6 sm:p-8">
              <p className="eyebrow mb-3">Next steps</p>
              <h2 className="font-headline text-2xl font-extrabold text-foreground">
                Learn the setup path before choosing a plan
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-6 text-muted-foreground">
                TryIPTV offers a {PRODUCT_TRUTHS.trialDuration.toLowerCase()} free trial with no card
                required. If you want to test compatibility first, start with the trial, then follow
                the setup guide for your device and player.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button asChild>
                  <Link href="/iptv-free-trial">Start the free trial</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/pricing">Compare pricing</Link>
                </Button>
              </div>
            </div>
          </article>
        </Container>
      </Section>
    </>
  );
}
