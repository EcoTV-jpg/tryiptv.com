import { INDEXABLE_ROUTES } from '../src/lib/site-routes.ts';
import { SITE_URL } from '../src/lib/site-config.ts';
import { createIndexingClient, getUrlMetadata, publishUrls, validateIndexingUrls } from './google-indexing-client.mjs';

/**
 * Notify Google about changed canonical URLs through the Indexing API v3.
 *
 * Google officially supports the Indexing API only for pages with JobPosting or BroadcastEvent
 * (in a VideoObject) markup; for other pages it may accept the request and still ignore it.
 * Default quota: 200 publish requests per day. Scopes match scripts/indexnow.mjs:
 *
 *   npm run google-indexing -- --since 2026-10-19      URLs whose lastModified (site-routes.ts) is on/after the date
 *   npm run google-indexing -- --paths /pricing,/faq   specific canonical paths
 *   npm run google-indexing -- --all                   every indexable URL
 *
 *   --status     read the last notification Google has for each URL (no publish)
 *   --delete     send URL_DELETED instead of URL_UPDATED
 *   --dry-run    print the list without calling Google
 */
const args = process.argv.slice(2);
const valueOf = (flag) => {
  const i = args.indexOf(flag);
  return i >= 0 ? args[i + 1] : undefined;
};
const toUrl = (path) => (path === '/' ? SITE_URL : `${SITE_URL}${path}`);

const since = valueOf('--since');
const pathsArg = valueOf('--paths');
let routes;
if (since) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(since)) throw new Error('--since expects YYYY-MM-DD');
  routes = INDEXABLE_ROUTES.filter((route) => route.lastModified && route.lastModified >= since);
} else if (pathsArg) {
  const wanted = new Set(pathsArg.split(',').map((p) => p.trim()).filter(Boolean));
  routes = INDEXABLE_ROUTES.filter((route) => wanted.has(route.path));
  const unknown = [...wanted].filter((p) => !routes.some((route) => route.path === p));
  if (unknown.length) throw new Error(`Not approved indexable paths: ${unknown.join(', ')}`);
} else if (args.includes('--all')) {
  routes = INDEXABLE_ROUTES;
} else {
  console.error('Choose a scope: --since YYYY-MM-DD, --paths /a,/b or --all (see the header of scripts/google-indexing.mjs).');
  process.exit(2);
}

if (routes.length === 0) {
  console.log('No URLs in scope; nothing to do.');
  process.exit(0);
}

const urls = validateIndexingUrls(routes.map(({ path }) => toUrl(path)));
const type = args.includes('--delete') ? 'URL_DELETED' : 'URL_UPDATED';
const mode = args.includes('--status') ? 'status' : type;
console.log(`${mode} for ${urls.length} URL(s):\n  ${urls.join('\n  ')}`);

if (args.includes('--dry-run')) {
  console.log('Dry run: no Indexing API request sent.');
  process.exit(0);
}

try {
  const { indexing } = createIndexingClient();
  const results = mode === 'status' ? await getUrlMetadata(indexing, urls) : await publishUrls(indexing, urls, type);
  for (const r of results) {
    if (!r.ok) console.log(`  FAIL ${r.url}  HTTP ${r.status}: ${r.message}`);
    else if (mode === 'status') console.log(`  ${r.url}  updated: ${r.updated ?? '-'}  removed: ${r.removed ?? '-'}`);
    else console.log(`  OK   ${r.url}  ${r.notifyTime ?? `accepted (HTTP ${r.status})`}`);
  }
  const failed = results.filter((r) => !r.ok).length;
  const skipped = urls.length - results.length;
  console.log(`Done: ${results.length - failed} ok, ${failed} failed${skipped ? `, ${skipped} skipped after quota error` : ''}.`);
  if (failed || skipped) process.exitCode = 1;
} catch (error) {
  console.error(`Indexing API request failed: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
}
