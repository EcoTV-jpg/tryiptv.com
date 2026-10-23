import Link from "next/link";
import type React from "react";
import { BadgeCheck, Building2, CirclePlay, Headphones, Receipt, Users } from "lucide-react";
import { Container } from "../shared/Container";
import { SectionHeader } from "../shared/SectionHeader";
import { Section } from "../shared/Section";
import { PRODUCT_TRUTHS, FACT_TEXT } from "@/lib/site-config";
import { COMPANY } from "@/lib/site-data/company";

const T = PRODUCT_TRUTHS;
const link = "font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary";

interface Criterion {
  icon: typeof Users;
  title: string;
  why: string;
  /** What TryIPTV offers on this point: owner-confirmed facts only (PRODUCT_TRUTHS / COMPANY). */
  here: React.ReactNode;
}

// The criteria a "best IPTV service" search is really asking about, each answered with confirmed facts.
// No rankings, ratings or reviews: the reader judges, and the trial lets them test the rest.
const criteria: Criterion[] = [
  {
    icon: CirclePlay,
    title: "A real free trial, with no card",
    why: "You can only judge a service on your own TV and internet connection.",
    here: (
      <>
        A <Link href="/iptv-free-trial" className={link}>{FACT_TEXT.trialHours}-hour free trial</Link> for $0, with no credit
        card and the same {T.connections} connections as a paid plan.
      </>
    ),
  },
  {
    icon: Receipt,
    title: "Prepaid, with no automatic renewal",
    why: "A cheap first month means little if the renewal price is higher or hard to cancel.",
    here: (
      <>
        <Link href="/pricing" className={link}>Prepaid plans</Link> from {FACT_TEXT.fromPrice} to $88.23. Nothing renews, so
        there is nothing to cancel.
      </>
    ),
  },
  {
    icon: Users,
    title: "Connections stated up front",
    why: "One connection leaves the second TV dark.",
    here: <>{T.connections} simultaneous connections on every plan and on the trial.</>,
  },
  {
    icon: Building2,
    title: "Who runs TryIPTV",
    why: "You should know who you are paying and how to reach them.",
    here: (
      <>
        Run by {COMPANY.legalName} ({COMPANY.location}
        {COMPANY.registrationNumber ? `, registration ${COMPANY.registrationNumber}` : ""}), operating since{" "}
        {COMPANY.foundingYear}. {COMPANY.businessModel} <Link href="/about" className={link}>About TryIPTV</Link>.
      </>
    ),
  },
  {
    icon: Headphones,
    title: "Support you can reach",
    why: "Setup questions come up, and an answer in minutes matters more than a long FAQ.",
    here: (
      <>
        WhatsApp and email, {COMPANY.support.hours}.
        {COMPANY.support.responseTime
          ? ` Replies arrive ${COMPANY.support.responseTime.charAt(0).toLowerCase()}${COMPANY.support.responseTime.slice(1)}.`
          : ""}
      </>
    ),
  },
  {
    icon: BadgeCheck,
    title: "A refund rule in writing",
    why: "Know before you pay what happens if the service does not work.",
    here: (
      <>
        Refunds when TryIPTV cannot provide a working subscription, as set out in the{" "}
        <Link href="/refund-policy" className={link}>refund policy</Link>.
      </>
    ),
  },
];

export function ChooseIPTVService() {
  return (
    <Section id="choose-iptv-service">
      <Container>
        <SectionHeader
          align="left"
          eyebrow="Before You Buy"
          title="How Do You Choose a Good IPTV Service?"
          subtitle="A good IPTV service lets you test it free, charges once without automatic renewal, states how many devices can stream at once, says who operates it, answers support messages and puts its refund rule in writing. Each check below sits next to what TryIPTV offers."
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {criteria.map((c) => (
            <div key={c.title} className="rounded-2xl border border-white/[0.07] bg-card p-6">
              <span className="grid size-10 place-items-center rounded-xl border border-white/[0.07] bg-white/[0.03] text-primary">
                <c.icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-4 font-headline text-lg font-bold text-foreground">{c.title}</h3>
              <p className="mt-2 text-base leading-6 text-muted-foreground sm:text-sm">{c.why}</p>
              <p className="mt-3 border-t border-white/[0.06] pt-3 text-base leading-6 text-foreground/90 sm:text-sm">
                <span className="font-semibold text-primary">At TryIPTV: </span>
                {c.here}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-base leading-7 text-muted-foreground sm:text-sm">
          The rest, such as your channels, peak-time streams and your devices, is what the{" "}
          <Link href="/iptv-free-trial" className={link}>free trial</Link> is for.
        </p>
      </Container>
    </Section>
  );
}
