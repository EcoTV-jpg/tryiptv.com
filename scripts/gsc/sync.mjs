// npm run gsc:sync — pull a full read-only Search Console snapshot into data/gsc/ (git-ignored).
// Flags: --windows last28,prev28  --skip-inspection  --inspect-limit 60  --fresh (adds dataState=all for last7)
import fs from 'node:fs/promises';
import path from 'node:path';
import {
  createClient, SITE_URL, safeError, withRetry, queryAllRows, findLatestFinalDate,
  buildWindows, PLAN, dimsKey, describeCredentialSource,
} from './lib.mjs';

const arg = (name, fallback) => {
  const i = process.argv.indexOf(name);
  return i >= 0 ? process.argv[i + 1] : fallback;
};
const has = (name) => process.argv.includes(name);

const ROOT = path.join(process.cwd(), 'data/gsc');
const INSPECT_PACE_MS = 1100; // URL Inspection allows 600 requests/minute and 2,000/day per property

async function writeJson(file, data) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(data, null, 1));
}

async function liveSitemapUrls() {
  const response = await fetch(new URL('/sitemap.xml', SITE_URL));
  if (!response.ok) throw new Error(`sitemap.xml returned HTTP ${response.status}`);
  return [...(await response.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

const client = createClient();
const latest = await findLatestFinalDate(client);
const windows = buildWindows(latest);
const selected = (arg('--windows', '') || Object.keys(PLAN).join(',')).split(',').filter((w) => PLAN[w]);
const dir = path.join(ROOT, 'snapshots', latest);
const manifest = {
  property: SITE_URL,
  credential: describeCredentialSource()?.method,
  extractedAt: new Date().toISOString(),
  latestFinalDate: latest,
  windows,
  searchAnalytics: [],
  errors: [],
};

for (const name of selected) {
  for (const dims of PLAN[name]) {
    const { startDate, endDate } = windows[name];
    const file = `sa/${name}__${dimsKey(dims)}.json`;
    try {
      const rows = await queryAllRows(client, { startDate, endDate, dimensions: dims, dataState: 'final' });
      await writeJson(path.join(dir, file), rows);
      manifest.searchAnalytics.push({ window: name, dimensions: dims, file, rows: rows.length, possiblyTruncated: rows.length > 0 && rows.length % 25000 === 0 });
      console.log(`${name.padEnd(7)} ${dimsKey(dims).padEnd(18)} ${rows.length} rows`);
    } catch (error) {
      manifest.errors.push({ step: file, ...safeError(error) });
      console.error(`${name} ${dimsKey(dims)} failed: ${safeError(error).message}`);
    }
  }
}

if (has('--fresh')) {
  // Last 7 days including not-yet-finalized data, for early trend signals only.
  const start = windows.last7.startDate;
  const end = new Date().toISOString().slice(0, 10);
  for (const dims of [['date'], ['page'], ['query']]) {
    const file = `sa/fresh7__${dimsKey(dims)}.json`;
    const rows = await queryAllRows(client, { startDate: start, endDate: end, dimensions: dims, dataState: 'all' });
    await writeJson(path.join(dir, file), rows);
    manifest.searchAnalytics.push({ window: 'fresh7', dimensions: dims, file, rows: rows.length, dataState: 'all' });
  }
}

try {
  const list = (await withRetry(() => client.sitemaps.list({ siteUrl: SITE_URL }))).data.sitemap || [];
  await writeJson(path.join(dir, 'sitemaps.json'), list);
  manifest.sitemaps = list.length;
} catch (error) {
  manifest.errors.push({ step: 'sitemaps', ...safeError(error) });
}

let urls = [];
try {
  urls = await liveSitemapUrls();
  await writeJson(path.join(dir, 'live-sitemap.json'), urls);
} catch (error) {
  manifest.errors.push({ step: 'live sitemap', ...safeError(error) });
}

if (!has('--skip-inspection') && urls.length) {
  const limit = Number(arg('--inspect-limit', '60'));
  const results = [];
  for (const url of urls.slice(0, limit)) {
    try {
      const response = await withRetry(() => client.urlInspection.index.inspect({ requestBody: { inspectionUrl: url, siteUrl: SITE_URL } }));
      results.push({ url, result: response.data.inspectionResult });
    } catch (error) {
      results.push({ url, error: safeError(error) });
    }
    await new Promise((resolve) => setTimeout(resolve, INSPECT_PACE_MS));
  }
  await writeJson(path.join(dir, 'inspection.json'), results);
  manifest.inspected = results.length;
}

await writeJson(path.join(dir, 'manifest.json'), manifest);
await writeJson(path.join(ROOT, 'latest.json'), { snapshot: path.relative(ROOT, dir), latestFinalDate: latest });
console.log(`Snapshot saved: ${path.relative(process.cwd(), dir)} (${manifest.errors.length} errors)`);
if (manifest.errors.length) process.exitCode = 1;
