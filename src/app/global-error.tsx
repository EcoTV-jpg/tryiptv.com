"use client";

import NextError from "next/error";
import { useEffect } from "react";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    // Imported on demand so the Sentry SDK stays out of the initial client bundle. Sentry starts on
    // first interaction or 10 s after load (instrumentation-client.ts); before that there is no
    // client, so the error goes to the early-error buffer, which is replayed once Sentry starts.
    import("@/lib/sentry-client").then((Sentry) => {
      if (Sentry.getClient()) Sentry.captureException(error);
      else window.dispatchEvent(new ErrorEvent("error", { error, message: error.message }));
    });
  }, [error]);

  return (
    <html lang="en">
      <body>
        {/* `NextError` is the default Next.js error page component. Its type
        definition requires a `statusCode` prop. However, since the App Router
        does not expose status codes for errors, we simply pass 0 to render a
        generic error message. */}
        <NextError statusCode={0} />
      </body>
    </html>
  );
}
