import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Container } from '@/components/shared/Container';
import { Section } from '@/components/shared/Section';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { ContactForm } from '@/components/shared/ContactForm';
import { getContactPageData } from '@/lib/data/contact-page';
import { Schema } from '@/components/shared/Schema';
import { generateMetadata as generatePageMetadata } from '@/lib/site-config';
import { Mail, MessageCircle, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

export function generateMetadata(): Metadata {
    return generatePageMetadata({
        title: "Contact Us",
        description: "Get in touch with the TryIPTV team. Whether you have questions about device setup, channels, or subscriptions, our support desk is ready to help.",
        canonical: "/contact-us",
    });
}

export default async function ContactPage() {
    const { breadcrumbSchema } = await getContactPageData();

    return (
        <>
            <Schema id="breadcrumb" schema={breadcrumbSchema} />

            <Section className="relative overflow-hidden border-b border-white/[0.07] pt-12 pb-14 sm:pt-16 sm:pb-20">
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
                <Container className="relative text-center">
                    <Breadcrumb items={[{ label: "Contact Us" }]} align="center" />
                    <SectionHeader
                        as="h1"
                        eyebrow="Support When You Need It"
                        title="Contact TryIPTV Support"
                        subtitle="Tell us what you need help with and our support team will get back to you promptly."
                    />
                </Container>
            </Section>

            <Section>
                <Container>
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.3fr] lg:gap-12">
                        {/* Direct Channels Column */}
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <p className="eyebrow mb-1">Direct support</p>
                                    <CardTitle as="h2" className="font-headline text-2xl font-extrabold">Customer Support</CardTitle>
                                    <CardDescription>Contact our support team for setup, billing, or technical help.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <a
                                        href="https://wa.me/15205648298"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-start gap-4 rounded-lg border border-white/[0.08] bg-[#101512] p-4 transition-all duration-200 motion-safe:hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/[0.05]"
                                    >
                                        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-primary/20 bg-primary/[0.06] text-primary">
                                            <MessageCircle className="h-5 w-5" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-center justify-between gap-x-2">
                                                <p className="text-base sm:text-sm font-extrabold text-foreground group-hover:text-primary">WhatsApp Live Chat</p>
                                                <span className="flex items-center gap-1.5 text-[10px] font-bold text-primary">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Online
                                                </span>
                                            </div>
                                            <p className="mt-1 text-xs text-muted-foreground">Contact us with your account, setup, or service question.</p>
                                        </div>
                                    </a>

                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: `<!--email_off--><a href="mailto:support@tryiptv.com" class="group flex items-start gap-4 rounded-lg border border-white/[0.08] bg-[#101512] p-4 transition-all duration-200 motion-safe:hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/[0.05]"><div class="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-primary/20 bg-primary/[0.06] text-primary"><svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg></div><div class="flex-1"><p class="text-sm font-extrabold text-foreground group-hover:text-primary">Email Support</p><p class="mt-1 text-xs text-muted-foreground">support@tryiptv.com • Contact us with your question.</p></div></a><!--/email_off-->`,
                                        }}
                                    />
                                </CardContent>
                            </Card>

                            <div className="rounded-lg border border-white/[0.09] bg-[#070a08] p-6 space-y-4">
                                <div className="flex items-center gap-3 text-xs font-semibold text-muted-foreground">
                                    <Clock className="h-4 w-4 text-primary" />
                                    <span>Support for account, setup, and service questions</span>
                                </div>
                                <div className="flex items-center gap-3 text-xs font-semibold text-muted-foreground">
                                    <ShieldCheck className="h-4 w-4 text-primary" />
                                    <span>Encrypted &amp; Confidential Communication</span>
                                </div>
                                <div className="pt-2 border-t border-white/[0.08]">
                                    <Link
                                        href="/iptv-free-trial"
                                        className="tap-target inline-flex items-center gap-2 text-xs font-extrabold text-primary hover:underline"
                                    >
                                        Looking for a trial? Request 24h access <ArrowRight className="h-3 w-3" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form Column */}
                        <div>
                            <Card>
                                <CardHeader>
                                    <p className="eyebrow mb-1">Send a message</p>
                                    <CardTitle as="h2" className="font-headline text-2xl font-extrabold">Send Us a Message</CardTitle>
                                    <CardDescription className="text-base sm:text-sm">
                                        Have a question or need support? Fill out the form below and we&apos;ll get back to you shortly.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ContactForm />
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </Container>
            </Section>
        </>
    );
}
