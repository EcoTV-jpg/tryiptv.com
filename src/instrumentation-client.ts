// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
//
// Performance: the SDK is ~400 KB and was evaluated before hydration on every page, costing
// ~1.3 s of main-thread time on mid-range phones. It is now imported dynamically on the first
// interaction or 10 s after load. Errors raised before that are buffered below and replayed
// into Sentry after init, so early crashes are still reported.

type EarlyError = { error: unknown };
const earlyErrors: EarlyError[] = [];
const onError = (e: ErrorEvent) => earlyErrors.push({ error: e.error ?? e.message });
const onRejection = (e: PromiseRejectionEvent) => earlyErrors.push({ error: e.reason });
window.addEventListener("error", onError);
window.addEventListener("unhandledrejection", onRejection);

function initSentry() {
  import("@/lib/sentry-client").then((Sentry) => {
    Sentry.init({
      dsn: "https://2c6b3d1af5286155f96e3cc65959938f@o4512229364072448.ingest.us.sentry.io/4512229368266752",

      // Turns off collection of data that could identify users. Adjust per category:
      // https://docs.sentry.io/platforms/javascript/configuration/options/#dataCollection
      dataCollection: {
        userInfo: false,
        graphQL: { document: false, variables: false },
        genAI: { inputs: false, outputs: false },
        databaseQueryData: false,
        queues: false,
        httpBodies: [],
        httpHeaders: { deny: ["forwarded", "-ip", "remote-", "via", "-user"] },
        cookies: { deny: ["forwarded", "-ip", "remote-", "via", "-user"] },
        urlQueryParams: { deny: ["forwarded", "-ip", "remote-", "via", "-user"] },
      },
    });

    // Sentry's own global handlers take over from here.
    window.removeEventListener("error", onError);
    window.removeEventListener("unhandledrejection", onRejection);
    for (const { error } of earlyErrors.splice(0)) Sentry.captureException(error);
  });
}

// Start on the first user interaction, or 10 s after the load event, whichever comes first, so
// the SDK download/evaluation stays out of the page's initial interactivity window.
const INTERACTIONS = ["pointerdown", "keydown", "scroll", "touchstart"] as const;
let started = false;
function start() {
  if (started) return;
  started = true;
  for (const type of INTERACTIONS) window.removeEventListener(type, start);
  initSentry();
}
for (const type of INTERACTIONS) window.addEventListener(type, start, { once: true, passive: true });
const afterLoad = () => setTimeout(start, 10000);
if (document.readyState === "complete") afterLoad();
else window.addEventListener("load", afterLoad, { once: true });
