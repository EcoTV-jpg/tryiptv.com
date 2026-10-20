import type { Metadata } from "next";
import HowToPage, { generateMetadata as generateHowToMetadata } from "../[device]/page";

/**
 * Chromecast — substantive technical setup guide.
 * Canonical: https://www.tryiptv.com/devices/chromecast-iptv
 */
export async function generateMetadata(): Promise<Metadata> {
  return generateHowToMetadata({
    params: Promise.resolve({ device: "chromecast-iptv" }),
  });
}

export default async function ChromecastPage() {
  return HowToPage({
    params: Promise.resolve({ device: "chromecast-iptv" }),
  });
}

