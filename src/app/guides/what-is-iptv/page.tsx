import type { Metadata } from "next";
import { GuideByline } from "@/components/shared/GuideByline";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { Container } from "@/components/shared/Container";
import { Schema } from "@/components/shared/Schema";
import { Section } from "@/components/shared/Section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaqList } from "@/components/sections/FAQ";
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

const legalityRows = [
  { label: "IPTV technology and apps", us: "Legal", uk: "Legal" },
  { label: "Watching a licensed IPTV service", us: "Legal", uk: "Legal" },
  {
    label: "Watching unlicensed streams",
    us: "Copyright infringement; viewers can face civil claims",
    uk: "Unlawful (GOV.UK 2018; EU Court of Justice C-527/15)",
  },
  {
    label: "Selling or running an unlicensed service",
    us: "Federal crime under 18 U.S.C. § 2319C",
    uk: "Criminal offence under copyright and fraud law",
  },
];

const faqs = [
  {
    question: "What does IPTV stand for?",
    answer:
      "IPTV stands for Internet Protocol Television. It means TV channels and on-demand video are delivered as data over an internet connection, instead of through a cable line, satellite dish, or antenna, and played in an app on a TV, streaming stick, phone, or computer.",
  },
  {
    question: "Do you have to pay for IPTV?",
    answer:
      "Usually, yes. Licensed IPTV services charge a subscription because they pay for the rights to their channels. IPTV player apps are often free or cheap, but they contain no channels. A free trial, such as the 24-hour TryIPTV trial, lets you test before paying.",
  },
  {
    question: "Can I watch IPTV for free?",
    answer:
      "Some broadcasters offer free, legal streams of their own channels, but free lists of premium channels are almost always unlicensed and can be unsafe or illegal to use. A free trial from a paid service is the safer way to test IPTV on your own device before you subscribe.",
  },
  {
    question: "Is IPTV the same as Netflix or YouTube TV?",
    answer:
      "Not exactly. Netflix is an on-demand streaming service, and YouTube TV is a live TV streaming service with its own app. IPTV usually means a service that supplies live channels as a playlist or Xtream Codes login that you open in a separate IPTV player app.",
  },
  {
    question: "How does IPTV connect to a TV?",
    answer:
      "IPTV reaches a TV through an app. Install an IPTV player on a smart TV, or on a Firestick, Android TV box, Apple TV, or MAG box plugged into the TV, then enter the login details from your service. Phones can also send IPTV to a TV with AirPlay or casting.",
  },
  {
    question: "Do I need a VPN for IPTV?",
    answer:
      "No, a VPN is not required to use IPTV. A VPN can help you test whether your internet provider slows video traffic, but it adds overhead and can reduce speed. If streams buffer, check your connection and player settings first using the IPTV buffering guide.",
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
              IPTV (Internet Protocol Television) is television delivered over an internet connection
              instead of a cable line, satellite dish, or antenna. A service supplies live channels and
              on-demand video as streams, and you watch them in an IPTV player app on a TV, streaming
              stick, phone, or computer.
            </p>
            <GuideByline path="/guides/what-is-iptv" />
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

            {/* A real <table> (so answer engines read rows and headers) laid out with the same grid as before. */}
            <table className="my-8 block w-full overflow-hidden rounded-lg border border-white/[0.09]">
              <caption className="sr-only">IPTV compared with cable or satellite TV</caption>
              {/* Column header only fits once rows go 3-up; stacked rows carry their own labels below. */}
              <thead className="hidden sm:block">
                <tr className="grid grid-cols-3 bg-card px-4 py-3 text-left text-sm font-bold text-foreground">
                  <th scope="col" className="text-left font-bold">Topic</th>
                  <th scope="col" className="text-left font-bold">IPTV</th>
                  <th scope="col" className="text-left font-bold">Cable or satellite</th>
                </tr>
              </thead>
              <tbody className="block">
                {comparisonRows.map((row) => (
                  <tr
                    key={row.label}
                    className="grid grid-cols-1 gap-2 border-t border-white/[0.09] px-4 py-4 text-base sm:text-sm leading-6 sm:grid-cols-3"
                  >
                    <th scope="row" className="text-left font-semibold text-foreground">{row.label}</th>
                    {/* Stacked (mobile) rows repeat the hidden column header via CSS-generated content,
                        so no extra text is added to the HTML; sm+ shows the real header instead. */}
                    <td data-label="IPTV: " className={stackedLabel}>{row.iptv}</td>
                    <td data-label="Cable or satellite: " className={stackedLabel}>{row.traditional}</td>
                  </tr>
                ))}
              </tbody>
            </table>

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
              <p>
                To use IPTV you need four things: an IPTV service that supplies the channels, a device
                such as a Firestick, smart TV, phone, or computer, an IPTV player app installed on that
                device, and a stable internet connection of about 25 Mbps for Full HD. The service gives
                you login details that you enter in the player.
              </p>
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

              <h2 id="is-iptv-legal">Is IPTV legal?</h2>
              <p>
                IPTV technology is legal: it is simply a way of delivering television over the internet,
                and major licensed services use it. Whether a particular IPTV service is legal depends on
                whether it has the rights to the channels and films it streams. Watching or selling
                unlicensed streams can break copyright law.
              </p>
              <h3>Is IPTV legal in the US?</h3>
              <p>
                Yes, IPTV itself is legal in the US. Running an unlicensed streaming service for profit is
                a federal crime under the Protecting Lawful Streaming Act of 2020{" "}
                (<a href="https://www.law.cornell.edu/uscode/text/18/2319C" target="_blank" rel="noopener noreferrer">18 U.S.C. § 2319C</a>),
                which targets the people who operate such services. Viewers of unlicensed streams can
                still be liable for copyright infringement.
              </p>
              <h3>Is IPTV legal in the UK?</h3>
              <p>
                Yes, IPTV and streaming devices are legal in the UK. The UK government states that
                streaming boxes become illegal to use once apps or add-ons give access to paid-for
                content for free{" "}
                (<a href="https://www.gov.uk/government/news/pressure-grows-on-producers-of-illegal-streaming-devices-and-thieves-of-paid-for-content" target="_blank" rel="noopener noreferrer">GOV.UK, October 2018</a>),
                and the EU Court of Justice ruled in 2017 that streaming unlicensed content is not
                lawful (<a href="https://curia.europa.eu/juris/liste.jsf?num=C-527/15" target="_blank" rel="noopener noreferrer">case C-527/15</a>).
              </p>
            </div>

            <table className="my-8 block w-full overflow-hidden rounded-lg border border-white/[0.09]">
              <caption className="sr-only">IPTV legality at a glance</caption>
              <thead className="hidden sm:block">
                <tr className="grid grid-cols-3 bg-card px-4 py-3 text-left text-sm font-bold text-foreground">
                  <th scope="col" className="text-left font-bold">Situation</th>
                  <th scope="col" className="text-left font-bold">United States</th>
                  <th scope="col" className="text-left font-bold">United Kingdom</th>
                </tr>
              </thead>
              <tbody className="block">
                {legalityRows.map((row) => (
                  <tr
                    key={row.label}
                    className="grid grid-cols-1 gap-2 border-t border-white/[0.09] px-4 py-4 text-base sm:text-sm leading-6 sm:grid-cols-3"
                  >
                    <th scope="row" className="text-left font-semibold text-foreground">{row.label}</th>
                    <td data-label="United States: " className={stackedLabel}>{row.us}</td>
                    <td data-label="United Kingdom: " className={stackedLabel}>{row.uk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-sm leading-6 text-muted-foreground">
              This is general information, not legal advice. Laws differ by country and change over time.
            </p>

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

      <Section className="border-t border-white/[0.07] bg-black/20 pt-12 pb-16 sm:pt-14 sm:pb-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 text-center sm:text-left">
              <p className="eyebrow mb-2">Frequently Asked Questions</p>
              <h2 className="font-headline text-2xl font-bold text-foreground sm:text-3xl">
                Common Questions About IPTV
              </h2>
            </div>
            <FaqList items={faqs} />
          </div>
        </Container>
      </Section>
    </>
  );
}
