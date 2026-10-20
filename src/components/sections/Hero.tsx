import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CirclePlay } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/Container";

const HERO_FACTS = [
  { value: "25,000+", label: "Live Channels" },
  { value: "120,000+", label: "Movies & TV Shows" },
  { value: "2", label: "Simultaneous Connections" },
  { value: "From $16", label: "Starting Price" },
] as const;

export function Hero() {
  return (
    <section className="relative -mt-20 overflow-hidden pt-24 pb-8 sm:pt-28 sm:pb-10 lg:pt-32 lg:pb-12">
      {/* Ambient background wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-full bg-gradient-to-l from-primary/10 via-primary/[0.02] to-transparent lg:w-2/3 blur-3xl"
      />

      <Container className="relative">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/[0.06] px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-primary">
              <span aria-hidden className="size-1.5 rounded-full bg-primary" />
              Best IPTV Streaming
            </p>

            <h1 className="mt-5 font-headline text-[length:clamp(2rem,1.586rem+1.768vw,3rem)] font-bold leading-[1.1] tracking-tight text-foreground">
              TryIPTV — <span className="text-primary">Best IPTV Service</span> in USA, UK &amp; Worldwide
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-[17px]">
              TryIPTV is an IPTV service and provider for viewers in the USA, UK, and supported regions. It provides live TV, sports, movies, and TV shows through compatible devices and IPTV player apps—not a player app itself. Choose a prepaid plan or use the free trial to see whether the service fits your setup.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild>
                <Link href="/iptv-free-trial">
                  <CirclePlay aria-hidden /> Start Free Trial
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/pricing">
                  View IPTV Plans <ArrowRight aria-hidden />
                </Link>
              </Button>
            </div>

            <p className="mt-4 text-[12.5px] font-medium text-muted-foreground">
              Plans from $16 • Prepaid • No auto-renewal
            </p>
          </div>

          {/* Right Column: Hero Image (best-iptv-service.png) */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-card">
                <Image
                  src="/images/best-iptv-service.png"
                  alt="Couple watching TV with TryIPTV streaming service"
                  width={1024}
                  height={682}
                  preload
                  className="h-auto w-full object-cover"
                  sizes="(min-width: 1024px) 460px, (min-width: 640px) 512px, 100vw"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Supporting facts: quieter than the headline, evenly gridded at every width. */}
        <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-4">
          {HERO_FACTS.map((fact) => (
            <div key={fact.label} className="flex flex-col bg-card px-4 py-4 sm:px-6">
              <dt className="order-2 mt-1 text-[13px] text-muted-foreground">{fact.label}</dt>
              <dd className="order-1 font-headline text-xl font-bold tracking-tight text-foreground sm:text-[22px]">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
