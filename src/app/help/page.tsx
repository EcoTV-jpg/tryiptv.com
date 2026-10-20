import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  FileText,
  HelpCircle,
  KeyRound,
  Layers,
  Lock,
  PlaySquare,
  RefreshCw,
  Search,
  Server,
  ShieldAlert,
  Smartphone,
  Tv,
  Wifi,
} from "lucide-react";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { Container } from "@/components/shared/Container";
import { Schema } from "@/components/shared/Schema";
import { Section } from "@/components/shared/Section";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateBreadcrumbSchema } from "@/lib/schema";
import { SITE_URL, generateMetadata as generatePageMetadata } from "@/lib/site-config";

const title = "IPTV Help & Troubleshooting Directory — TryIPTV Support";
const description =
  "Systematic troubleshooting guides for IPTV problems: fix buffering, resolve login failures, diagnose playlists that will not load, and correct TV guide errors.";
const canonical = "/help";

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

const specialistGuides = [
  {
    title: "Playback Freezes or Buffers",
    href: "/help/iptv-buffering",
    symptom: "Channels stutter, audio falls out of sync, or spinning wheels interrupt live streams.",
    description:
      "A systematic 8-step guide to distinguish local Wi-Fi packet delay variation and decoder bottlenecks from ISP routing and upstream media server congestion.",
    badge: "Stream Diagnostics",
    icon: PlaySquare,
    badgeColor: "text-rose-400 border-rose-400/20 bg-rose-400/10",
  },
  {
    title: "Login Rejected or Authentication Fails",
    href: "/help/iptv-login-not-working",
    symptom: "Player displays 'Invalid Details', 'Authentication Failed', or HTTP 401/403 status codes.",
    description:
      "Step-by-step diagnostic workflow to catch trailing whitespace, remote control typos, server URL port syntax, and active multi-device connection limits.",
    badge: "Authentication",
    icon: Lock,
    badgeColor: "text-amber-400 border-amber-400/20 bg-amber-400/10",
  },
  {
    title: "Playlist Won't Load (0 Channels)",
    href: "/help/m3u-not-loading",
    symptom: "App shows 'Download Error', 'Failed to Load Playlist', or crashes during large playlist parsing.",
    description:
      "Diagnose URL encoding errors, TLS/SSL certificate verification failures, network timeout issues, and memory constraints on compact streaming sticks.",
    badge: "Playlist Ingestion",
    icon: FileText,
    badgeColor: "text-blue-400 border-blue-400/20 bg-blue-400/10",
  },
  {
    title: "TV Guide (EPG) Missing or Wrong Time",
    href: "/help/epg-not-working",
    symptom: "Guide grid shows 'No Information', listings end prematurely, or showtimes are shifted by hours.",
    description:
      "Troubleshoot complete guide blackouts, resolve channel mapping gaps (tvg-id), clear corrupt cache databases, and synchronize device system clocks.",
    badge: "EPG Metadata",
    icon: Calendar,
    badgeColor: "text-emerald-400 border-emerald-400/20 bg-emerald-400/10",
  },
];

export default function HelpPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", item: `${SITE_URL}/` },
    { name: "Help", item: `${SITE_URL}/help` },
  ]);

  return (
    <>
      <Schema id="breadcrumb" schema={breadcrumbSchema} />

      {/* Hero Header */}
      <Section className="relative overflow-hidden border-b border-white/[0.07] pt-12 pb-14 sm:pt-16 sm:pb-20">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
        <Container className="relative text-center">
          <Breadcrumb items={[{ label: "Help" }]} align="center" />
          <SectionHeader
            as="h1"
            eyebrow="Diagnostic Directory"
            title="IPTV Help &amp; Troubleshooting"
            subtitle="Systematic, symptom-oriented troubleshooting workflows to isolate and resolve IPTV playback, authentication, playlist, and electronic programme guide errors."
          />
        </Container>
      </Section>

      {/* Main Troubleshooting Content */}
      <Section className="py-12 sm:py-16">
        <Container>
          {/* Master Triage Hero Card */}
          <div className="mb-14">
            <Card className="relative overflow-hidden rounded-2xl border-primary/30 bg-primary/[0.04] p-6 shadow-lg sm:p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs font-bold text-primary">
                      <Search className="h-3.5 w-3.5" />
                      MASTER DIAGNOSTIC ROUTER
                    </span>
                    <span className="text-xs text-muted-foreground">Start Here</span>
                  </div>
                  <h2 className="font-headline text-2xl font-extrabold text-foreground sm:text-3xl">
                    Not Sure What Is Wrong? Start With Master Triage
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    Saying &quot;my IPTV is not working&quot; can describe problems at five completely different layers. Use our 2-minute master checklist to identify whether the issue is local to your device, network, player application, or upstream server, and jump directly to the right fix.
                  </p>
                </div>
                <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
                  <Button asChild size="lg" className="w-full justify-center">
                    <Link href="/help/iptv-not-working">
                      Open Master Triage Checklist
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Specialist Problem Categories */}
          <div className="mb-8">
            <p className="eyebrow mb-2">Specialist Problem Solutions</p>
            <h2 className="font-headline text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Troubleshoot by Specific Symptom
            </h2>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Already know which part of your setup is failing? Select your symptom below to follow targeted diagnostic steps.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {specialistGuides.map((guide) => {
              const Icon = guide.icon;
              return (
                <Card
                  key={guide.href}
                  className="group flex flex-col justify-between rounded-2xl border-white/[0.08] bg-[#07080a] transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:bg-[#07080a] shadow-sm"
                >
                  <CardHeader className="pb-3">
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${guide.badgeColor}`}>
                        <Icon className="h-3 w-3" />
                        {guide.badge}
                      </span>
                    </div>
                    <CardTitle as="h3" className="font-headline text-lg font-bold leading-snug sm:text-xl">
                      <Link href={guide.href} className="text-foreground transition-colors group-hover:text-primary">
                        {guide.title}
                      </Link>
                    </CardTitle>
                    <p className="mt-1 text-xs font-medium text-amber-400/90 sm:text-sm">
                      Symptom: {guide.symptom}
                    </p>
                  </CardHeader>
                  <CardContent className="pt-0 flex flex-1 flex-col justify-between">
                    <p className="mb-6 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                      {guide.description}
                    </p>
                    <div className="flex items-center justify-between border-t border-white/[0.06] pt-3">
                      <span className="text-xs text-muted-foreground">Step-by-Step Diagnostic</span>
                      <Link
                        href={guide.href}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-primary transition-colors hover:underline"
                      >
                        Troubleshoot Issue <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Cross-Directory Navigation Banner */}
          <div className="mt-16 rounded-2xl border border-white/[0.08] bg-[#07080a] p-6 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="eyebrow mb-1">Looking for Explanations &amp; Specs?</p>
                <h3 className="font-headline text-lg font-bold text-foreground sm:text-xl">
                  Understand IPTV Formats and Architecture
                </h3>
                <p className="mt-1.5 max-w-xl text-xs text-muted-foreground sm:text-sm">
                  Want to learn how M3U playlists, Xtream Codes APIs, and XMLTV guides operate under the hood? Explore our comprehensive educational guides.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-3">
                <Button asChild size="sm" variant="outline">
                  <Link href="/guides">
                    <BookOpen className="mr-1.5 h-4 w-4 text-primary" />
                    Browse IPTV Guides
                  </Link>
                </Button>
                <Button asChild size="sm" variant="ghost">
                  <Link href="/faq">
                    <HelpCircle className="mr-1.5 h-4 w-4" />
                    General FAQ
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
