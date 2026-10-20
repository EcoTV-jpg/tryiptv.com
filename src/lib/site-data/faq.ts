import { PRODUCT_TRUTHS } from "@/lib/site-config";


export const faqs = [
    {
        question: "What is TryIPTV?",
        answer: "TryIPTV is a prepaid IPTV subscription service available at tryiptv.com. The service provides live TV, sports, and on-demand streaming across compatible IPTV devices and apps, with fixed-term prepaid plans, 2 simultaneous connections, a 24-hour trial ($0), and no automatic renewal."
    },
    {
        question: "Does TryIPTV offer a free trial?",
        answer: "Yes. TryIPTV offers a 24-hour free trial at $0 so you can test the channel lineup, picture quality, and device compatibility before purchasing. You can request trial access through our <a href=\"/iptv-free-trial\" class=\"text-primary hover:underline\">free trial page</a> or support team to get started."
    },
    {
        question: "How much does TryIPTV cost?",
        answer: "TryIPTV <a href=\"/pricing\" class=\"text-primary hover:underline\">subscription plans</a> cost $16 for 1 month, $39 for 3 months, $60 for 6 months, and $90 for 12 months. All plans are one-time prepaid purchases with no hidden fees, and the 12-month plan offers the lowest equivalent cost at $7.50 per month."
    },
    {
        question: "How many devices can I use with one TryIPTV subscription?",
        answer: "Every standard TryIPTV subscription includes 2 simultaneous device connections. This allows you to stream on two separate screens at the same time in your household, and custom multi-connection plans are available upon request through support."
    },
    {
        question: "Which devices and apps does TryIPTV support?",
        answer: "TryIPTV supports Amazon Fire TV, Android TV and mobile, Apple TV, iPhone, iPad, Windows, macOS, Samsung and LG Smart TVs, Roku, and MAG boxes (detailed in our <a href=\"/devices\" class=\"text-primary hover:underline\">device setup guides</a>). It works with popular <a href=\"/players\" class=\"text-primary hover:underline\">IPTV player applications</a> including TiviMate, IPTV Smarters Pro, and GSE Smart IPTV using standard <a href=\"/guides/what-is-m3u\" class=\"text-primary hover:underline\">M3U playlist URLs</a> or <a href=\"/guides/what-are-xtream-codes\" class=\"text-primary hover:underline\">Xtream Codes API</a> credentials."
    },
    {
        question: "How does TryIPTV work?",
        answer: "TryIPTV delivers live television broadcasts and video-on-demand content over the internet using Internet Protocol (IP) instead of cable lines or satellite signals (learn more in our guide on <a href=\"/guides/what-is-iptv\" class=\"text-primary hover:underline\">what IPTV is</a>). After subscribing, you enter your provided playlist URL or login credentials into a compatible IPTV player application on your device to stream."
    },
    {
        question: "How do I set up TryIPTV?",
        answer: "To set up TryIPTV, install a compatible IPTV player application on your device and enter the account details or M3U playlist URL provided after order confirmation. Follow our universal <a href=\"/setup\" class=\"text-primary hover:underline\">IPTV setup guide</a> for step-by-step instructions across Fire TV, Android, Apple, Windows, and Smart TVs. Customer support is available to help with account, setup, and service questions."
    },
    {
        question: "How do I get customer support for TryIPTV?",
        answer: "TryIPTV provides customer support via email at support@tryiptv.com and direct WhatsApp messaging. Customer support is available to help with app setup, playlist loading, playlist troubleshooting, and general account questions."
    },
    {
        question: "What is the TryIPTV refund policy?",
        answer: `${PRODUCT_TRUTHS.refund.summary} Change of mind after credentials are used, home network problems, and unsupported devices are not refundable. Test first with the free 24-hour trial; the <a href="/refund-policy" class="text-primary hover:underline">refund policy</a> has the full conditions.`
    },
    {
        question: "Does TryIPTV automatically renew?",
        answer: "No, TryIPTV plans do not automatically renew or charge your payment method on a recurring basis. All subscriptions are strictly prepaid for the duration you select (1, 3, 6, or 12 months), and you decide whether to renew when your subscription term ends."
    }
];
