import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { Container } from "@/components/shared/Container";
import { Schema } from "@/components/shared/Schema";
import { Section } from "@/components/shared/Section";
import { generateArticleSchema, generateBreadcrumbSchema } from "@/lib/schema";
import { SITE_URL, generateMetadata as generatePageMetadata } from "@/lib/site-config";

const title = "IPTV Smarters Pro & Lite: App Setup Guide";
const description =
  "Learn how to set up IPTV Smarters Pro and Smarters Player Lite with Xtream Codes or M3U across Apple, Android, Fire TV, Windows, and supported TVs.";
const canonical = "/players/iptv-smarters";

export function generateMetadata(): Metadata {
  return {
    ...generatePageMetadata({ title, description, canonical }),
    title: { absolute: title },
  };
}

const articleSchema = generateArticleSchema({
  headline: title,
  description,
  dateModified: "2026-10-11",
  url: `${SITE_URL}${canonical}`,
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", item: `${SITE_URL}/` },
  { name: "Players", item: `${SITE_URL}/players` },
  { name: "IPTV Smarters", item: `${SITE_URL}${canonical}` },
]);

const headingClass = "font-headline text-2xl font-bold tracking-tight text-foreground sm:text-3xl";
const textClass = "mt-4 text-base leading-relaxed text-muted-foreground";
const listClass = "mt-4 list-decimal space-y-2 pl-6 text-base leading-relaxed text-muted-foreground";
const linkClass = "text-primary underline decoration-primary/40 underline-offset-4 hover:text-foreground";

export default function IptvSmartersPage() {
  return (
    <>
      <Schema id="article" schema={articleSchema} />
      <Schema id="breadcrumb" schema={breadcrumbSchema} />

      <Section className="border-b border-white/[0.07] py-12 sm:py-16">
        <Container>
          <Breadcrumb items={[{ label: "Players", href: "/players" }, { label: "IPTV Smarters" }]} />
          <div className="mt-8 max-w-3xl">
            <h1 className="font-headline text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              IPTV Smarters Pro Setup Guide: Xtream Codes, M3U &amp; Devices
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              IPTV Smarters is a media player, not an IPTV provider; it includes no channels or subscriptions. Users can connect compatible sources using supported API credentials or M3U playlists supplied by their provider. After login, the app can load the provider&apos;s live channels, movies, series, and EPG data where those are available.
            </p>
            <div className="mt-8 rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 text-base leading-relaxed text-muted-foreground">
              <p className="font-semibold text-foreground">Official App Name &amp; Platform Availability</p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>
                  <strong className="text-foreground">Apple (iPhone, iPad, Apple TV):</strong> On iPhone, iPad, and Apple TV, WHMCS SMARTERS currently distributes the app through Apple&apos;s App Store as <a href="https://apps.apple.com/us/app/smarters-player-lite/id1628995509" target="_blank" rel="noopener noreferrer" className={linkClass}>“Smarters Player Lite”</a>.
                </li>
                <li>
                  <strong className="text-foreground">Android &amp; Android TV:</strong> For Android and Android TV, IPTV Smarters Pro is available from the <a href="https://getiptvsmarters.com/download" target="_blank" rel="noopener noreferrer" className={linkClass}>developer&apos;s official download portal</a>. Google Play results may include similarly named third-party apps, so verify the publisher before installing.
                </li>
                <li>
                  <strong className="text-foreground">Windows &amp; macOS:</strong> The developer&apos;s download portal currently provides Windows and macOS desktop installers.
                </li>
                <li>
                  <strong className="text-foreground">Fire TV:</strong> Fire TV availability in the Amazon Appstore can vary; if unavailable, the developer provides compatible Android downloads.
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-12 sm:py-16">
        <Container>
          <article className="max-w-3xl space-y-12">
            <section>
              <h2 className={headingClass}>IPTV Smarters Pro, Smarters Player Lite, and Similar Names</h2>
              <p className={textClass}>
                The developer&apos;s download page calls its main app IPTV Smarters Pro and links Apple users to “Smarters Player Lite” by WHMCS SMARTERS. Smarters Player Lite is the Apple App Store listing published by WHMCS SMARTERS for iPhone, iPad, and Apple TV. Those names do not mean that every similarly named store listing is the same app. Check the developer and follow the <a href="https://getiptvsmarters.com/download" target="_blank" rel="noopener noreferrer" className={linkClass}>developer&apos;s current download page</a> for the version offered on your device.
              </p>
            </section>

            <section>
              <h2 className={headingClass}>How to Install IPTV Smarters on Android TV / Google TV</h2>
              <p className={textClass}>
                The developer lists Android TV as a supported download platform. For Android and Android TV, IPTV Smarters Pro is available from the <a href="https://getiptvsmarters.com/download" target="_blank" rel="noopener noreferrer" className={linkClass}>developer&apos;s official download portal</a>. Google Play results may include similarly named third-party apps, so verify the publisher before installing. If no matching verified listing is available in your TV&apos;s app store, use the Android TV download from the developer&apos;s site and follow your device&apos;s installation instructions. Use the remote to move between login fields and double-check long URLs before submitting them.
              </p>
              <ol className={listClass}>
                <li>Check your TV app store and verify the app publisher before installing.</li>
                <li>If a verified listing is unavailable, get the Android TV version from the <a href="https://getiptvsmarters.com/download" target="_blank" rel="noopener noreferrer" className={linkClass}>developer&apos;s official download portal</a>.</li>
                <li>Open the app and choose the login method your IPTV provider supplied.</li>
              </ol>
              <p className={textClass}>See the <Link href="/devices/android-tv-iptv" className={linkClass}>Android TV setup guide</Link> for device preparation.</p>
            </section>

            <section>
              <h2 className={headingClass}>How to Install IPTV Smarters on Firestick / Fire TV</h2>
              <p className={textClass}>
                Fire TV availability in the Amazon Appstore can vary, so check its current listing first. If the app is unavailable there, use the official Android or Android TV download linked from the Smarters developer site. Fire TV devices that permit outside-app installation may require you to allow the Downloader app under their installation settings; the menus vary by model and Fire OS version.
              </p>
              <ol className={listClass}>
                <li>Search the Amazon Appstore and check the publisher if a Smarters listing appears.</li>
                <li>If needed, install Downloader from the Appstore and enable its app-installation permission in Fire TV settings.</li>
                <li>Open the developer&apos;s download page in Downloader, select the appropriate official Android download, and follow the device prompts.</li>
              </ol>
              <p className={textClass}>The <Link href="/devices/firestick-iptv" className={linkClass}>Firestick setup guide</Link> covers Fire TV preparation. Avoid APK mirrors and copied Downloader codes.</p>
            </section>

            <section>
              <h2 className={headingClass}>IPTV Smarters on Samsung and LG Smart TVs</h2>
              <p className={textClass}>
                The developer directs LG TV users to search the LG Content Store for “IPTV Smarters Player” and Samsung TV users to search their TV app store for IPTV Smarters. Store results can differ by model and region. The developer also notes that an updated Samsung app is under review and provides separate official USB installation instructions; consult its current download page if no matching store listing appears.
              </p>
              <p className={textClass}>Use the <Link href="/devices/samsung-tv-iptv" className={linkClass}>Samsung TV setup guide</Link> or <Link href="/devices/lg-tv-iptv" className={linkClass}>LG TV setup guide</Link> for device-specific navigation.</p>
            </section>

            <section>
              <h2 className={headingClass}>IPTV Smarters on iPhone, iPad and Apple TV</h2>
              <p className={textClass}>
                On iPhone, iPad, and Apple TV, WHMCS SMARTERS currently distributes the app through Apple&apos;s App Store as <a href="https://apps.apple.com/us/app/smarters-player-lite/id1628995509" target="_blank" rel="noopener noreferrer" className={linkClass}>Smarters Player Lite</a>. Smarters Player Lite is the Apple App Store listing published by WHMCS SMARTERS for iPhone, iPad, and Apple TV. Install it through the App Store on your device, then use the playlist or login option that appears in that app version. Its interface and navigation may differ from Android releases, so do not assume every screen or setting is identical.
              </p>
              <p className={textClass}>The <Link href="/devices/apple-tv-iptv" className={linkClass}>Apple TV IPTV guide</Link> covers remote-based setup.</p>
            </section>

            <section>
              <h2 className={headingClass}>IPTV Smarters on Windows and macOS</h2>
              <p className={textClass}>
                The developer&apos;s download portal currently provides Windows and macOS desktop installers. Choose the installer for your operating system from that page, install it, and add the credentials or playlist supplied by your IPTV provider. On Apple silicon Macs, Apple&apos;s App Store lists Smarters Player Lite as “Designed for iPad” and “Not verified for macOS”; that iPad compatibility mode is a separate path from the developer&apos;s standalone macOS desktop installer.
              </p>
              <p className={textClass}>See the <Link href="/devices/windows-iptv" className={linkClass}>Windows IPTV guide</Link> or <Link href="/devices/mac-iptv" className={linkClass}>macOS IPTV guide</Link> for device context.</p>
            </section>

            <section>
              <h2 className={headingClass}>How to Set Up IPTV Smarters with Xtream Codes</h2>
              <p className={textClass}>
                To log in with Xtream Codes, choose the app&apos;s Xtream Codes option and enter the server or portal URL, username, and password supplied by your IPTV provider. The “Any Name” or profile-name field is a label you choose for this entry. If login fails, check the URL protocol and port, credentials, and account status before reinstalling the app.
              </p>
              <ol className={listClass}>
                <li>Select the Xtream Codes login option in your app version.</li>
                <li>Enter a recognizable profile name; it is not the provider-issued username.</li>
                <li>Enter the exact username and password from the provider.</li>
                <li>Enter the complete server URL, including <code className="text-foreground">http://</code> or <code className="text-foreground">https://</code> and the port if supplied, then submit the login.</li>
              </ol>
              <p className={textClass}>Do not paste the full M3U playlist URL into the server URL field. Check for spaces copied around the address or credentials. For the meaning of these fields, see <Link href="/guides/what-are-xtream-codes" className={linkClass}>Xtream Codes login details</Link>.</p>
            </section>

            <section>
              <h2 className={headingClass}>How to Add an M3U Playlist to IPTV Smarters</h2>
              <p className={textClass}>
                If your provider supplies one direct M3U playlist URL rather than separate Xtream Codes fields, choose the playlist or file/URL option in your Smarters version. Give the playlist a name and paste the complete URL. Some versions also offer local files, but use that option only when your provider actually supplied a compatible playlist file.
              </p>
              <ol className={listClass}>
                <li>Choose the playlist or file/URL option rather than Xtream Codes.</li>
                <li>Enter a profile name and the direct M3U URL from your provider.</li>
                <li>Save the entry and wait for categories and channels to load.</li>
              </ol>
              <p className={textClass}>Xtream Codes fits a server URL plus username and password; M3U fits a direct playlist URL. Neither method guarantees better playback. Read <Link href="/guides/what-is-m3u" className={linkClass}>what an M3U playlist contains</Link> if you need to identify the correct link.</p>
            </section>

            <section>
              <h2 className={headingClass}>What Happens After You Log In?</h2>
              <p className={textClass}>
                A successful login only establishes access to the provider&apos;s source. The app must then load categories and channel entries, followed by live streams and any movies, series, or EPG data the provider supplies. These stages can fail independently: a working login does not prove that every channel or guide entry exists, and working channels do not guarantee an EPG.
              </p>
              <div className="mt-5 rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 text-base sm:text-sm leading-relaxed text-muted-foreground">
                <p><strong className="text-foreground">Immediate login rejection:</strong> check account details and server access.</p>
                <p className="mt-2"><strong className="text-foreground">Login succeeds, empty categories:</strong> check provider playlist data or account permissions.</p>
                <p className="mt-2"><strong className="text-foreground">Channels appear, guide empty:</strong> check the separate EPG source or channel mapping.</p>
                <p className="mt-2"><strong className="text-foreground">Only live TV or only VOD fails:</strong> test that section&apos;s provider source instead of reinstalling immediately.</p>
              </div>
            </section>

            <section>
              <h2 className={headingClass}>Player, Provider, or Network: Where Is the Failure?</h2>
              <p className={textClass}>
                The symptom narrows the next check, but it does not prove a single cause. Compare another channel, another network activity, or another compatible player when possible. If the same credentials fail in every player, contact the provider; if they work elsewhere, compare Smarters&apos; login format and app version.
              </p>
              <div className="mt-5 overflow-x-auto rounded-xl border border-white/[0.08]">
                <table className="w-full min-w-[32rem] text-left text-sm text-muted-foreground">
                  <thead className="bg-white/[0.03] text-foreground"><tr><th className="p-3 font-semibold">Symptom</th><th className="p-3 font-semibold">Check first</th></tr></thead>
                  <tbody className="divide-y divide-white/[0.06]">
                    <tr><td className="p-3">App will not open</td><td className="p-3">App version, device resources</td></tr>
                    <tr><td className="p-3">Login rejected</td><td className="p-3">Credentials, server, account status</td></tr>
                    <tr><td className="p-3">Login works, no content</td><td className="p-3">Playlist sync, provider permissions</td></tr>
                    <tr><td className="p-3">Channels work, EPG missing</td><td className="p-3">EPG source and mapping</td></tr>
                    <tr><td className="p-3">Some channels fail</td><td className="p-3">Affected provider streams</td></tr>
                    <tr><td className="p-3">Everything buffers on Wi-Fi</td><td className="p-3">Network, device, then provider</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className={headingClass}>IPTV Smarters Troubleshooting</h2>
              <p className={textClass}>
                Start with the first point where setup fails. Save the exact error message, device and app version, playlist type, and a few affected channel names before asking for help. Reinstalling is rarely the first useful test when the app opens and accepts a login; a provider account, source, or network issue may be responsible.
              </p>
              <div className="mt-6 space-y-7">
                <div>
                  <h3 className="font-headline text-lg font-semibold text-foreground">Login Failed or Invalid Credentials</h3>
                  <p className={textClass}>Recheck the server URL&apos;s protocol and port, the exact username and password, accidental spaces, and the account&apos;s active status. Confirm the provider endpoint is online. See <Link href="/help/iptv-login-not-working" className={linkClass}>IPTV login troubleshooting</Link>.</p>
                </div>
                <div>
                  <h3 className="font-headline text-lg font-semibold text-foreground">Login Works but No Channels Appear</h3>
                  <p className={textClass}>Refresh the playlist and check whether the provider assigned live categories to your account. If categories stay empty across compatible players, report the missing data to the provider. See <Link href="/help/m3u-not-loading" className={linkClass}>playlist loading checks</Link>.</p>
                </div>
                <div>
                  <h3 className="font-headline text-lg font-semibold text-foreground">Channels Load but Do Not Play</h3>
                  <p className={textClass}>Test several channels and check whether another device is using the account beyond its allowed connections. Compare network activity and another compatible player; failures can come from the source, network, device decoding, or account limits. See <Link href="/help/iptv-not-working" className={linkClass}>IPTV service troubleshooting</Link>.</p>
                </div>
                <div>
                  <h3 className="font-headline text-lg font-semibold text-foreground">Movies Work but Live TV Does Not</h3>
                  <p className={textClass}>VOD and live streams can be delivered as separate provider sections. Try several live channels and ask whether live TV is enabled for the account. Working movies show that the app can reach some provider content; they do not prove the live source is healthy.</p>
                </div>
                <div>
                  <h3 className="font-headline text-lg font-semibold text-foreground">EPG Is Missing</h3>
                  <p className={textClass}>Successful channel playback does not guarantee guide data. Refresh the EPG if your app offers that control, then ask the provider whether an EPG source is supplied and mapped to those channels. See the <Link href="/help/epg-not-working" className={linkClass}>EPG troubleshooting guide</Link>.</p>
                </div>
                <div>
                  <h3 className="font-headline text-lg font-semibold text-foreground">Buffering or Stuttering</h3>
                  <p className={textClass}>Compare several streams, test the Wi-Fi connection, and restart the device. Limited device resources, a weak network, or the provider&apos;s stream can each affect playback. Change player settings only after isolating the cause. See <Link href="/help/iptv-buffering" className={linkClass}>IPTV buffering checks</Link>.</p>
                </div>
                <div>
                  <h3 className="font-headline text-lg font-semibold text-foreground">App Opens but Crashes or Freezes</h3>
                  <p className={textClass}>Restart the device, check free storage, and install an update from the same verified source you used originally. If the problem started after an update, note the app version and device model for the developer. Reinstall only after preserving any playlist details you will need to enter again.</p>
                </div>
              </div>
              <div className="mt-8 rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 text-base sm:text-sm text-muted-foreground">
                Need IPTV credentials for Smarters? <Link href="/iptv-free-trial" className={linkClass}>Start with a 24-hour IPTV trial</Link>. TryIPTV is an independent provider and does not operate IPTV Smarters.
              </div>
            </section>
          </article>
        </Container>
      </Section>
    </>
  );
}
