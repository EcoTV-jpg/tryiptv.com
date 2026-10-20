import Script from 'next/script';

const GA_ID = 'G-76FDX71VDQ';

/**
 * Google Analytics 4 without blocking the main thread during load.
 *
 * The inline snippet creates the dataLayer queue right away, so the `config` page_view
 * (and any events pushed before gtag.js arrives) is queued, not lost. The ~180 KB gtag.js
 * library itself loads with `lazyOnload` (browser idle after the load event) instead of
 * `afterInteractive`, which kept ~500 ms of script evaluation inside the mobile TBT window.
 * GA4 enhanced measurement still records client-side route changes via the History API.
 */
export function Analytics() {
  return (
    <>
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
      <Script id="ga-lib" src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="lazyOnload" />
    </>
  );
}
