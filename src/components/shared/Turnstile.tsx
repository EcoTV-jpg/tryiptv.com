'use client';

import Script from 'next/script';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: { sitekey: string; theme?: 'auto' | 'light' | 'dark'; size?: 'normal' | 'compact' },
  ) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

/**
 * Explicitly rendered Cloudflare Turnstile widget.
 *
 * The api.js script is loaded here (not in the root layout) so pages without a form don't pay
 * for it; next/script dedupes it when both the sheet and the page form are mounted.
 * api.js only auto-renders `.cf-turnstile`
 * elements present when it first loads, so forms mounted later (the contact sheet,
 * or /contact-us after client-side navigation) never got a widget or a token.
 * Rendering explicitly on mount fixes that. Tokens are single-use, so the widget
 * is reset whenever `resetSignal` changes (pass the form's action state).
 */
// The normal widget is 300px wide and overflows the narrow mobile contact sheet.
const COMPACT_BELOW = 300;

export function Turnstile({ resetSignal }: { resetSignal?: unknown }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [size, setSize] = useState<'normal' | 'compact' | null>(null);

  // Measure before paint so the reserved height matches the widget (no layout shift), and
  // re-pick the size when rotation/resizing crosses the threshold so it never overflows.
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const pick = () => setSize(el.clientWidth < COMPACT_BELOW ? 'compact' : 'normal');
    pick();
    if (typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(pick);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!SITE_KEY || !size) return;

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const tryRender = () => {
      if (cancelled || !containerRef.current) return;
      if (!window.turnstile) {
        timer = setTimeout(tryRender, 250);
        return;
      }
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: SITE_KEY,
        theme: 'auto',
        size,
      });
    };
    tryRender();

    return () => {
      cancelled = true;
      clearTimeout(timer);
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
      widgetIdRef.current = null;
    };
  }, [size]);

  const initialSignalRef = useRef(resetSignal);
  useEffect(() => {
    if (resetSignal === initialSignalRef.current) return;
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
    }
  }, [resetSignal]);

  if (!SITE_KEY) return null;
  // Reserve the widget's rendered height: compact is 140px tall, normal is 65px.
  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" />
      <div ref={containerRef} className={size === 'compact' ? 'min-h-[140px]' : 'min-h-[65px]'} />
    </>
  );
}
