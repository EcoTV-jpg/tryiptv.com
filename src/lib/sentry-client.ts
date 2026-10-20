// Narrow re-export for the lazily loaded browser SDK: importing the "@sentry/nextjs" namespace
// kept every export (Replay, Feedback, rrweb, ...) in the dynamic chunk; named exports let the
// bundler drop what this site never configures.
export { init, captureException } from "@sentry/nextjs";
