import { PRODUCT_TRUTHS } from "@/lib/site-config";

export const pricingPageFaqs: { question: string; answer: string; link?: { href: string; label: string } }[] = [
  {
    question: "How much does TryIPTV cost?",
    answer:
      "TryIPTV prepaid plans cost $16 for 1 month, $39 for 3 months, $60 for 6 months, and $90 for 12 months. All plans are one-time prepaid purchases with no recurring billing, and longer terms reduce the effective monthly cost down to $7.50 per month.",
  },
  {
    question: "Which plan has the lowest monthly equivalent?",
    answer:
      "The 12-month plan has the lowest equivalent monthly cost at $7.50 per month ($90 total upfront), compared to $16.00 per month on the 1-month plan.",
  },
  {
    question: "Are plans prepaid?",
    answer:
      "Yes. All TryIPTV plans are paid upfront for the chosen duration (1, 3, 6, or 12 months). There are no recurring fees or ongoing monthly invoices.",
  },
  {
    question: "Do subscriptions automatically renew?",
    answer:
      "No. TryIPTV subscriptions do not automatically renew. When your prepaid period ends, access simply expires unless you manually choose to purchase another term.",
  },
  {
    question: "How many simultaneous connections are included?",
    answer:
      "Every paid plan includes 2 simultaneous connections. You can set up the service on multiple compatible devices, but streaming is limited to two screens at the same time.",
  },
  {
    question: "How are plan savings calculated?",
    answer:
      "Savings are calculated by comparing the total prepaid price against purchasing the 1-month plan ($16) repeatedly. For example, twelve 1-month purchases cost $192, while the 12-month plan costs $90—a savings of $102.",
  },
  {
    question: "What payment methods are available?",
    answer:
      "Current payment instructions are provided when ordering at checkout. All orders are one-time prepaid purchases with no automatic renewals or recurring charges.",
  },
  {
    question: "How quickly is an order activated?",
    answer:
      "Credentials and setup instructions are typically delivered within 5–15 minutes after payment confirmation.",
  },
  {
    question: "Can I test TryIPTV before buying?",
    answer:
      "Yes. You can request a 24-hour free trial with no credit card required to evaluate channels, playback, and device compatibility before choosing a paid plan.",
  },
  {
    question: "What happens when my prepaid term expires?",
    answer:
      "When your prepaid term ends, streaming access stops automatically. You are not billed again. To continue using the service, you can purchase a new prepaid term at any time.",
  },
  {
    question: "Is there a refund policy?",
    answer:
      `Only in limited cases. ${PRODUCT_TRUTHS.refund.summary} ${PRODUCT_TRUTHS.refund.exclusions} The refund policy page explains how to make a request.`,
  },
  {
    question: "Why does the TV guide show \"No Information\"?",
    answer:
      "That usually means the player has not loaded the EPG yet or the guide source needs refreshing.",
    link: { href: "/help/epg-not-working", label: "Follow the EPG troubleshooting guide" },
  },
];
