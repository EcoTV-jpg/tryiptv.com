import Image from "next/image";
import { Container } from "../shared/Container";
import { SectionHeader } from "../shared/SectionHeader";
import { Section } from "../shared/Section";
import { MessageSquareCheck } from "lucide-react";

export const customerFeedbackItems = [
  {
    id: "feedback-1",
    src: "/images/feedback/customer-feedback-1.jpg",
    alt: "TryIPTV customer WhatsApp chat showing Xtream Codes API setup assistance on IPTV Smarters Pro",
    title: "IPTV Smarters Pro Setup",
    highlight: "Xtream Codes API • Setup Completed",
  },
  {
    id: "feedback-2",
    src: "/images/feedback/customer-feedback-2.jpg",
    alt: "TryIPTV customer support conversation on WhatsApp assisting with Smart TV OTT player playlist activation",
    title: "Smart TV OTT Player",
    highlight: "Live TV Setup • Support Assisted",
  },
  {
    id: "feedback-3",
    src: "/images/feedback/customer-feedback-3.jpg",
    alt: "TryIPTV subscriber WhatsApp conversation showing M3U playlist and Xtream Codes delivery",
    title: "M3U & Xtream Delivery",
    highlight: "M3U & Xtream Delivery",
  },
  {
    id: "feedback-4",
    src: "/images/feedback/customer-feedback-4.jpg",
    alt: "TryIPTV 12-month prepaid subscription feedback on WhatsApp confirming Smart IPTV app MAC address activation",
    title: "12-Month Smart IPTV Activation",
    highlight: "Annual Subscription • MAC Address Loaded",
  },
  {
    id: "feedback-5",
    src: "/images/feedback/customer-feedback-5.jpg",
    alt: "TryIPTV customer WhatsApp conversation about streaming setup and playback",
    title: "Streaming Setup Feedback",
    highlight: "Stream Setup Feedback",
  },
];

export function CustomerFeedback() {
  return (
    <Section id="customer-feedback">
      <Container>
        <SectionHeader
          align="left"
          title="Customer Support Conversations"
          subtitle="WhatsApp conversations with TryIPTV customers showing account setup, credential delivery, and player assistance. Personal details are blurred."
          eyebrow="Customer Support"
        />

        {/* Visitor-controlled row instead of an auto-scrolling marquee: each screenshot appears once and can be read at the visitor's pace. */}
        <div
          role="region"
          aria-label="Customer WhatsApp conversation screenshots"
          tabIndex={0}
          className="-mx-5 snap-x snap-mandatory overflow-x-auto scroll-px-5 pb-4 sm:-mx-6 sm:scroll-px-6 lg:-mx-8 lg:scroll-px-8"
        >
          <ul className="flex w-max items-stretch gap-4 px-5 sm:px-6 lg:px-8">
            {customerFeedbackItems.map((item) => (
              <li key={item.id} className="flex snap-start">
                <figure className="flex w-[240px] flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-card sm:w-[260px]">
                  <div className="relative aspect-[525/1024] w-full bg-[#0a0d0b]">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={525}
                      height={1024}
                      className="h-full w-full object-cover"
                      sizes="260px"
                      loading="lazy"
                    />
                  </div>
                  <figcaption className="flex-1 border-t border-white/[0.07] px-4 py-3">
                    <span className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                      <MessageSquareCheck className="size-4 shrink-0 text-primary" aria-hidden="true" />
                      {item.title}
                    </span>
                    <span className="mt-1 block text-xs text-muted-foreground">{item.highlight}</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
