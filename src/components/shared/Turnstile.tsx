'use client';

import { useEffect, useRef } from 'react';

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
 * The api.js script (loaded in the root layout) only auto-renders `.cf-turnstile`
 * elements present when it first loads, so forms mounted later (the contact sheet,
 * or /contact-us after client-side navigation) never got a widget or a token.
 * Rendering explicitly on mount fixes that. Tokens are single-use, so the widget
 * is reset whenever `resetSignal` changes (pass the form's action state).
 */
export function Turnstile({ resetSignal }: { resetSignal?: unknown }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!SITE_KEY) return;

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
        // The normal widget is 300px wide and overflows the narrow mobile contact sheet.
        size: containerRef.current.clientWidth < 300 ? 'compact' : 'normal',
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
  }, []);

  const initialSignalRef = useRef(resetSignal);
  useEffect(() => {
    if (resetSignal === initialSignalRef.current) return;
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
    }
  }, [resetSignal]);

  if (!SITE_KEY) return null;
  return <div ref={containerRef} className="min-h-[65px]" />;
}
