import 'dotenv/config';
import { google } from 'googleapis';

export const GSC_SITE_URL = process.env.GSC_SITE_URL || 'https://www.tryiptv.com/';
const READONLY_SCOPE = 'https://www.googleapis.com/auth/webmasters.readonly';

function required(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

export function createSearchConsoleClient() {
  const email = process.env.GOOGLE_INDEXING_CLIENT_EMAIL || required('GSC_SERVICE_ACCOUNT_EMAIL');
  const privateKey = process.env.GOOGLE_INDEXING_PRIVATE_KEY || required('GSC_SERVICE_ACCOUNT_PRIVATE_KEY');
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: email,
      private_key: privateKey.replace(/\\n/g, '\n'),
    },
    scopes: [READONLY_SCOPE],
  });

  return { auth, searchconsole: google.searchconsole({ version: 'v1', auth }) };
}

export function getCredentialIdentity() {
  return process.env.GOOGLE_INDEXING_CLIENT_EMAIL || process.env.GSC_SERVICE_ACCOUNT_EMAIL || 'configured service account';
}

export function getDateRange(days = 28, end = new Date()) {
  const finish = new Date(end);
  finish.setUTCDate(finish.getUTCDate() - 2);
  const start = new Date(finish);
  start.setUTCDate(start.getUTCDate() - (days - 1));
  return {
    startDate: start.toISOString().slice(0, 10),
    endDate: finish.toISOString().slice(0, 10),
  };
}

export function parseFlag(name, fallback) {
  const index = process.argv.indexOf(name);
  return index >= 0 && process.argv[index + 1] ? process.argv[index + 1] : fallback;
}
