import { NextResponse, type NextRequest } from "next/server";

const CANONICAL_HOST = "www.tryiptv.com";
const PRODUCTION_HOSTS = new Set(["tryiptv.com", CANONICAL_HOST]);

function firstForwardedValue(value: string | null): string | null {
  return value?.split(",", 1)[0]?.trim().toLowerCase() || null;
}

function normalizeHost(value: string | null): string | null {
  return value?.replace(/:\d+$/, "") || null;
}

export function proxy(request: NextRequest) {
  const host = normalizeHost(
    firstForwardedValue(request.headers.get("x-forwarded-host"))
      ?? request.headers.get("host")?.trim().toLowerCase()
      ?? request.nextUrl.host.toLowerCase(),
  );
  const protocol = firstForwardedValue(request.headers.get("x-forwarded-proto"))
    ?? request.nextUrl.protocol.replace(":", "").toLowerCase();

  if (host && PRODUCTION_HOSTS.has(host) && (host !== CANONICAL_HOST || protocol !== "https")) {
    const canonicalUrl = request.nextUrl.clone();
    canonicalUrl.protocol = "https:";
    canonicalUrl.hostname = CANONICAL_HOST;
    canonicalUrl.port = "";

    return NextResponse.redirect(canonicalUrl, 308);
  }

  return NextResponse.next();
}
