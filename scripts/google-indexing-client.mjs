import 'dotenv/config';
import { google } from 'googleapis';
import { validateIndexNowUrls } from './indexnow-client.mjs';

const SCOPE = 'https://www.googleapis.com/auth/indexing';
export const DEFAULT_KEY_FILE = 'credentials/google-indexing-service-account.json';

/**
 * Google Indexing API v3 client, authenticated with a service account key file.
 * The key path comes from GOOGLE_INDEXING_KEY_FILE (default: credentials/, which is git-ignored).
 * The service account's client_email must be an Owner of the property in Search Console.
 */
export function createIndexingClient(keyFile = process.env.GOOGLE_INDEXING_KEY_FILE || DEFAULT_KEY_FILE) {
  const auth = new google.auth.GoogleAuth({ keyFile, scopes: [SCOPE] });
  return { auth, indexing: google.indexing({ version: 'v3', auth }) };
}

// Same rule as IndexNow: only approved canonical www.tryiptv.com URLs.
export const validateIndexingUrls = validateIndexNowUrls;

const errorText = (error) => error?.response?.data?.error?.message || (error instanceof Error ? error.message : String(error));
const errorStatus = (error) => error?.response?.status ?? error?.code;

/** type: 'URL_UPDATED' or 'URL_DELETED'. Sends one request per URL and returns a result per URL. */
export async function publishUrls(indexing, urls, type = 'URL_UPDATED') {
  const results = [];
  for (const url of validateIndexingUrls(urls)) {
    try {
      const { data, status } = await indexing.urlNotifications.publish({ requestBody: { url, type } });
      results.push({ url, ok: true, status, notifyTime: data.urlNotificationMetadata?.latestUpdate?.notifyTime });
    } catch (error) {
      results.push({ url, ok: false, status: errorStatus(error), message: errorText(error) });
      // 429 means the daily quota (200 publish requests by default) is spent; stop instead of failing the rest one by one.
      if (errorStatus(error) === 429) break;
    }
  }
  return results;
}

/** Last notification Google received for each URL (404 = never notified). */
export async function getUrlMetadata(indexing, urls) {
  const results = [];
  for (const url of validateIndexingUrls(urls)) {
    try {
      const { data } = await indexing.urlNotifications.getMetadata({ url });
      results.push({ url, ok: true, updated: data.latestUpdate?.notifyTime, removed: data.latestRemove?.notifyTime });
    } catch (error) {
      if (errorStatus(error) === 404) results.push({ url, ok: true, updated: 'never notified' });
      else results.push({ url, ok: false, status: errorStatus(error), message: errorText(error) });
    }
  }
  return results;
}
