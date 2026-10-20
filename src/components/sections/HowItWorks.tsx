import Link from "next/link";
import type React from "react";
import { CheckCircle, Package, Tv } from "lucide-react";
import { Container } from "../shared/Container";
import { SectionHeader } from "../shared/SectionHeader";
import { Section } from "../shared/Section";

interface Step {
  icon: typeof Package;
  title: string;
  description: React.ReactNode;
}

const steps: Step[] = [
    {
        icon: Package,
        title: "Choose a Plan or Start a Trial",
        description: <>Choose a prepaid plan or start the <Link href="/iptv-free-trial" className="font-semibold text-primary hover:underline">24-hour free trial</Link>.</>
    },
    {
        icon: CheckCircle,
        title: "Receive Your Login",
        description: "Credentials are typically delivered within 5–15 minutes after confirmation, including M3U or Xtream Codes details."
    },
    {
        icon: Tv,
        title: "Set Up Your Device",
        description: (
          <>
            Install a{" "}
            <Link href="/players" className="font-semibold text-primary hover:underline">
              compatible IPTV player
            </Link>
            , enter your Xtream Codes or M3U details, then follow the{" "}
            <Link href="/setup" className="font-semibold text-primary hover:underline">
              universal IPTV setup guide
            </Link>
            .
          </>
        )
    }
];

export function HowItWorks() {
  return (
    <Section id="how-it-works" variant="alt" className="border-b-0">
      <Container>
        <SectionHeader
          align="left"
          title="How Do I Start With TryIPTV?"
          subtitle="Use your TryIPTV access details with a compatible IPTV player, then follow the setup guide for your device."
          eyebrow="Setup Process"
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-5">
          {steps.map((step, i) => (
            <div key={i} className="rounded-2xl border border-white/[0.07] bg-card p-6">
              <div className="flex items-center justify-between">
                <span className="grid size-10 place-items-center rounded-xl border border-white/[0.07] bg-white/[0.03] text-primary">
                  <step.icon className="size-5" aria-hidden />
                </span>
                <span aria-hidden className="font-mono text-xs font-semibold tracking-[0.08em] text-muted-foreground">
                  STEP 0{i + 1}
                </span>
              </div>
              <h3 className="mt-5 font-headline text-lg font-bold tracking-tight text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
