import Link from "next/link";
import type React from "react";
import { KeyRound, Zap, Smartphone, CalendarCheck } from "lucide-react";
import { Container } from "../shared/Container";
import { Section } from "../shared/Section";
import { SectionHeader } from "../shared/SectionHeader";
import { PRODUCT_TRUTHS, FACT_TEXT } from "@/lib/site-config";

const benefits: { icon: typeof Zap; title: string; description: React.ReactNode }[] = [
  {
    icon: Smartphone,
    title: "2 Simultaneous Connections",
    description:
      "Use the service across supported devices with up to two concurrent streams.",
  },
  {
    icon: KeyRound,
    title: "Xtream Codes & M3U Access",
    description: (
      <>
        Use your login with the{" "}
        <Link href="/players" className="font-semibold text-primary hover:underline">
          compatible IPTV players
        </Link>{" "}
        you prefer: Xtream Codes (server, username, password) or an M3U playlist URL.
      </>
    ),
  },
  {
    icon: Zap,
    title: "Activation in 5–15 Minutes",
    description:
      "Login details are typically delivered within 5–15 minutes after confirmation, for paid plans and the free trial.",
  },
  {
    icon: CalendarCheck,
    title: "Prepaid Without Auto-Renewal",
    description:
      "Choose a fixed-duration plan and renew manually only when you want to continue.",
  },
];

export function WhyChooseTryIPTV() {
  return (
    <Section id="why-tryiptv">
      <Container>
        <SectionHeader
          align="left"
          eyebrow="Why TryIPTV"
          title="What Do You Get With TryIPTV?"
          subtitle={`TryIPTV is a prepaid IPTV service with ${PRODUCT_TRUTHS.channels} live channels and ${PRODUCT_TRUTHS.vod} movies and TV shows, delivered as Xtream Codes or M3U login details for the IPTV player you already use. Every plan includes ${PRODUCT_TRUTHS.connections} simultaneous connections, login details usually arrive within ${PRODUCT_TRUTHS.activationTime}, and no plan renews automatically.`}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div key={benefit.title} className="flex gap-4 rounded-2xl border border-white/[0.07] bg-card p-5 sm:block sm:p-6">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/[0.07] bg-white/[0.03] text-primary">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div>
                  <h3 className="font-headline text-lg font-bold tracking-tight text-foreground sm:mt-5">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-base sm:text-sm leading-6 text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
