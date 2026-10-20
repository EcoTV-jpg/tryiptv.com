// Shared Search Console API plumbing: auth, retries, pagination, date windows.
// Read-only by design: the only scope requested is webmasters.readonly.
import 'dotenv/config';
import { google } from 'googleapis';

export const SITE_URL = process.env.GSC_SITE_URL || 'https://www.tryiptv.com/';
export const READONLY_SCOPE = 'https://www.googleapis.com/auth/webmasters.readonly';

/**
 * Credentials, in order of preference (none are ever logged):
 *  0. GSC_OAUTH_CREDENTIALS — OAuth user credentials for a Google account with property access
 *  1. GSC_SERVICE_ACCOUNT_EMAIL + GSC_SERVICE_ACCOUNT_PRIVATE_KEY (or the legacy GOOGLE_INDEXING_* pair)
 *  2. GOOGLE_APPLICATION_CREDENTIALS pointing at a service-account JSON key file outside the repo
 */
export function describeCredentialSource() {
  if (process.env.GSC_OAUTH_CREDENTIALS) {
    return { method: 'OAuth user account (GSC_OAUTH_CREDENTIALS)', identity: null };
  }
  if ((process.env.GSC_SERVICE_ACCOUNT_EMAIL || process.env.GOOGLE_INDEXING_CLIENT_EMAIL) &&
      (process.env.GSC_SERVICE_ACCOUNT_PRIVATE_KEY || process.env.GOOGLE_INDEXING_PRIVATE_KEY)) {
    return { method: 'service account (environment variables)', identity: process.env.GSC_SERVICE_ACCOUNT_EMAIL || process.env.GOOGLE_INDEXING_CLIENT_EMAIL };
  }
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    return { method: 'service account (key file via GOOGLE_APPLICATION_CREDENTIALS)', identity: null };
  }
  return null;
}

export function createClient() {
  const source = describeCredentialSource();
  if (!source) {
    throw new Error(
      'No Search Console credentials found. Set GSC_OAUTH_CREDENTIALS (OAuth, recommended), or GSC_SERVICE_ACCOUNT_EMAIL and GSC_SERVICE_ACCOUNT_PRIVATE_KEY, ' +
      'or GOOGLE_APPLICATION_CREDENTIALS (path to a service-account key file kept outside the repository).',
    );
  }
  if (process.env.GSC_OAUTH_CREDENTIALS) {
    return google.searchconsole({ version: 'v1', auth: new google.auth.GoogleAuth({ credentials: parseOAuthCredentials(), scopes: [READONLY_SCOPE] }) });
  }
  const email = process.env.GSC_SERVICE_ACCOUNT_EMAIL || process.env.GOOGLE_INDEXING_CLIENT_EMAIL;
  const key = process.env.GSC_SERVICE_ACCOUNT_PRIVATE_KEY || process.env.GOOGLE_INDEXING_PRIVATE_KEY;
  const auth = email && key
    ? new google.auth.GoogleAuth({ credentials: { client_email: email, private_key: key.replace(/\\n/g, '\n') }, scopes: [READONLY_SCOPE] })
    : new google.auth.GoogleAuth({ keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS, scopes: [READONLY_SCOPE] });
  return google.searchconsole({ version: 'v1', auth });
}

/**
 * GSC_OAUTH_CREDENTIALS holds the "authorized_user" JSON written by
 * `gcloud auth application-default login` (raw JSON or base64). It contains a refresh token for a
 * personal Google account, scoped by that login to webmasters.readonly — no private key.
 */
function parseOAuthCredentials() {
  const raw = process.env.GSC_OAUTH_CREDENTIALS.trim();
  let json;
  try {
    json = JSON.parse(raw.startsWith('{') ? raw : Buffer.from(raw, 'base64').toString('utf8'));
  } catch {
    throw new Error('GSC_OAUTH_CREDENTIALS is not valid JSON (or base64-encoded JSON).');
  }
  if (json.type !== 'authorized_user' || !json.refresh_token) {
    throw new Error('GSC_OAUTH_CREDENTIALS must be the authorized_user JSON from `gcloud auth application-default login`.');
  }
  return json;
}

/** Strip anything that could carry credentials before an error reaches the console or a report. */
export function safeError(error) {
  const status = error?.code || error?.response?.status;
  const message = error?.response?.data?.error?.message || error?.message || 'unknown error';
  return { status: status ?? null, message: String(message).replace(/-----BEGIN[\s\S]*?-----END[^-]*-----/g, '[redacted key]').slice(0, 300) };
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** Retry quota and transient errors with exponential backoff; permission errors fail immediately. */
export async function withRetry(fn, { attempts = 5, baseMs = 1000 } = {}) {
  for (let attempt = 1; ; attempt++) {
    try {
      return await fn();
    } catch (error) {
      const { status } = safeError(error);
      const retryable = status === 429 || (status >= 500 && status < 600);
      if (!retryable || attempt >= attempts) throw error;
      await sleep(baseMs * 2 ** (attempt - 1) + Math.random() * 250);
    }
  }
}

export const ROW_LIMIT = 25000; // API maximum per request

/**
 * Fetch every row the API will return for one Search Analytics request by paging with startRow.
 * The API still caps how many rows exist per property/day (see LIMITATIONS in the report), so
 * "every row" means every row Google exposes, not every query that happened.
 */
export async function queryAllRows(client, requestBody, { maxRows = 500000 } = {}) {
  const rows = [];
  for (let startRow = 0; startRow < maxRows; startRow += ROW_LIMIT) {
    const response = await withRetry(() => client.searchanalytics.query({
      siteUrl: SITE_URL,
      requestBody: { ...requestBody, rowLimit: ROW_LIMIT, startRow },
    }));
    const page = response.data.rows || [];
    rows.push(...page);
    if (page.length < ROW_LIMIT) break;
  }
  return rows;
}

const iso = (date) => date.toISOString().slice(0, 10);
export const shiftDate = (value, days) => {
  const date = new Date(`${value}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return iso(date);
};
const daysBetween = (a, b) => Math.round((Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`)) / 86400000) + 1;

/** Latest date with finalized data, found by asking the API instead of assuming a fixed lag. */
export async function findLatestFinalDate(client, today = iso(new Date())) {
  const rows = await queryAllRows(client, {
    startDate: shiftDate(today, -14), endDate: today, dimensions: ['date'], dataState: 'final',
  });
  const dates = rows.map((row) => row.keys[0]).sort();
  return dates.at(-1) || shiftDate(today, -3);
}

/**
 * Analysis windows ending on the latest finalized date. "Previous" windows are the same length,
 * immediately before. Search Console keeps about 16 months of history.
 */
export function buildWindows(latest) {
  const span = (days, offsetDays = 0) => {
    const endDate = shiftDate(latest, -offsetDays);
    return { startDate: shiftDate(endDate, -(days - 1)), endDate, days };
  };
  const months = (count) => {
    const end = new Date(`${latest}T00:00:00Z`);
    const start = new Date(end);
    start.setUTCMonth(start.getUTCMonth() - count);
    start.setUTCDate(start.getUTCDate() + 1);
    return { startDate: iso(start), endDate: latest, days: daysBetween(iso(start), latest) };
  };
  return {
    last7: span(7), prev7: span(7, 7),
    last28: span(28), prev28: span(28, 28),
    last90: span(90), prev90: span(90, 90),
    last3m: months(3), last6m: months(6),
    max: months(16),
  };
}

export const COMPARISONS = [['last7', 'prev7'], ['last28', 'prev28'], ['last90', 'prev90']];

/** Which dimension sets to pull for each window: full detail where we compare, lighter for long history. */
export const PLAN = {
  last28: [[], ['date'], ['page'], ['query'], ['country'], ['device'], ['searchAppearance'],
    ['query', 'page'], ['query', 'country'], ['query', 'device'], ['page', 'country'], ['page', 'device'], ['date', 'page'], ['date', 'query']],
  prev28: [[], ['page'], ['query'], ['country'], ['device'], ['query', 'page'], ['page', 'device'], ['page', 'country']],
  last7: [[], ['page'], ['query'], ['query', 'page']],
  prev7: [[], ['page'], ['query'], ['query', 'page']],
  last90: [[], ['date'], ['page'], ['query'], ['country'], ['device'], ['query', 'page']],
  prev90: [[], ['page'], ['query'], ['query', 'page']],
  last3m: [[], ['page'], ['query']],
  last6m: [[], ['date'], ['page'], ['query']],
  max: [[], ['date'], ['page']],
};

export const dimsKey = (dims) => (dims.length ? dims.join('x') : 'totals');

/** Turn https://www.tryiptv.com/pricing into /pricing for readable reports. */
export function toPath(url) {
  try { return new URL(url).pathname || '/'; } catch { return url; }
}
