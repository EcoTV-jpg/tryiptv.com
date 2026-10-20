import 'dotenv/config';
import fs from 'node:fs/promises';
import path from 'node:path';
import { createSearchConsoleClient, GSC_SITE_URL } from './gsc-client.mjs';

const ROOT = process.cwd();
const DATA_DIR = path.join(ROOT, 'data/gsc-monitoring');
const REPORT_DIR = path.join(ROOT, 'reports/gsc');
const LOW_DATA = 20;
const MONITOR_DATA = 50;
const STRONG_DATA = 100;
const WATCH_PAGES = ['/players/iptv-extreme', '/players/tivimate', '/devices/apple-tv-iptv'];
const COMMERCIAL_TERMS = ['best iptv', 'iptv service', 'iptv services', 'iptv subscription', 'iptv provider', 'iptv pricing', 'iptv free trial', 'best iptv free trial', 'no credit card', 'iptv streaming'];
const INFORMATIONAL_TERMS = ['what is iptv', 'how does iptv work', 'm3u', 'xtream', 'epg', 'internet speed', 'iptv vs cable', 'firestick iptv', 'android tv iptv', 'samsung tv iptv', 'smarters', 'tivimate', 'iptv extreme', 'buffering', 'not working'];

const iso = (date) => date.toISOString().slice(0, 10);
const dateShift = (value, days) => { const date = new Date(`${value}T00:00:00Z`); date.setUTCDate(date.getUTCDate() + days); return iso(date); };
const percent = (value) => `${(value * 100).toFixed(2)}%`;
const pagePath = (url) => url.startsWith(GSC_SITE_URL) ? url.slice(GSC_SITE_URL.length - 1) || '/' : url;
const reportDate = iso(new Date());

function aggregate(rows = []) {
  const clicks = rows.reduce((sum, row) => sum + (row.clicks || 0), 0);
  const impressions = rows.reduce((sum, row) => sum + (row.impressions || 0), 0);
  const position = impressions ? rows.reduce((sum, row) => sum + (row.position || 0) * (row.impressions || 0), 0) / impressions : null;
  return { clicks, impressions, ctr: impressions ? clicks / impressions : 0, position };
}

function change(current, previous) {
  const delta = current - previous;
  return { absolute: delta, percent: previous ? delta / previous : null };
}

function period(latest, length, offset = 0) {
  const end = dateShift(latest, -offset);
  return { startDate: dateShift(end, -(length - 1)), endDate: end };
}

async function queryReport(searchconsole, window, dimensions, filterPage) {
  const requestBody = { ...window, dimensions, rowLimit: 25000, orderBy: [{ field: 'impressions', direction: 'descending' }] };
  if (filterPage) requestBody.dimensionFilterGroups = [{ filters: [{ dimension: 'page', operator: 'equals', expression: filterPage }] }];
  const result = await searchconsole.searchanalytics.query({ siteUrl: GSC_SITE_URL, requestBody });
  return result.data.rows || [];
}

function top(rows, limit = 10) {
  return rows.slice().sort((a, b) => (b.impressions || 0) - (a.impressions || 0)).slice(0, limit);
}

function meaningful(rows) {
  return rows.filter((row) => (row.impressions || 0) >= LOW_DATA);
}

function formatMetric(row) {
  return `${row.clicks} clicks, ${row.impressions} impressions, ${percent(row.ctr)}, position ${row.position == null ? '—' : row.position.toFixed(2)}`;
}

function buildMarkdown(snapshot) {
  const { latestDataDate, windows, reports, findings } = snapshot;
  const summary = (name) => aggregate(reports[name]);
  const lines = [
    `# TryIPTV GSC Weekly Monitoring — ${reportDate}`, '',
    '## A. DATA AVAILABILITY', '',
    `- Property: ${GSC_SITE_URL}`, `- Latest complete GSC data date: ${latestDataDate}`, `- Extracted: ${snapshot.extractedAt}`, '',
    '## B. SITE SUMMARY', '',
    `- 7-day current (${windows.current7.startDate} → ${windows.current7.endDate}): ${formatMetric(summary('current7_page'))}`,
    `- 7-day previous (${windows.previous7.startDate} → ${windows.previous7.endDate}): ${formatMetric(summary('previous7_page'))}`,
    `- 28-day current (${windows.current28.startDate} → ${windows.current28.endDate}): ${formatMetric(summary('current28_page'))}`,
    `- 28-day previous (${windows.previous28.startDate} → ${windows.previous28.endDate}): ${formatMetric(summary('previous28_page'))}`, '',
    '## C. 7-DAY CHANGE', '', `- Clicks: ${JSON.stringify(change(summary('current7_page').clicks, summary('previous7_page').clicks))}`, `- Impressions: ${JSON.stringify(change(summary('current7_page').impressions, summary('previous7_page').impressions))}`, '',
    '## D. 28-DAY CHANGE', '', `- Clicks: ${JSON.stringify(change(summary('current28_page').clicks, summary('previous28_page').clicks))}`, `- Impressions: ${JSON.stringify(change(summary('current28_page').impressions, summary('previous28_page').impressions))}`, '',
    '## E. WINNERS', '', findings.winners.length ? findings.winners.map((item) => `- **PROTECT — DO NOT EDIT:** ${item}`).join('\n') : '- None confirmed from the available comparison windows.', '',
    '## F. LOSERS', '', findings.losses.length ? findings.losses.map((item) => `- ${item}`).join('\n') : '- None confirmed from the available comparison windows.', '',
    '## G. PROTECT — DO NOT EDIT', '', '- Pages with clear improvement or insufficient evidence remain protected; the monitor never edits them.', '',
    '## H. STRIKING-DISTANCE QUERIES', '', findings.striking.length ? findings.striking.map((item) => `- ${item}`).join('\n') : '- None above the configured threshold.', '',
    '## I. CTR WATCHLIST', '', findings.ctr.length ? findings.ctr.map((item) => `- ${item}`).join('\n') : '- None above the configured threshold.', '',
    '## J. QUERY → URL OWNERSHIP', '', findings.ownership.length ? findings.ownership.map((item) => `- ${item}`).join('\n') : '- No meaningful ownership changes detected.', '',
    '## K. CANNIBALIZATION WATCH', '', '- Only meaningful multi-URL query overlap with unstable ownership is reported. No automatic action is taken.', '',
    '## L. COMMERCIAL QUERIES', '', findings.commercial.length ? findings.commercial.map((item) => `- ${item}`).join('\n') : '- No meaningful commercial query rows.', '',
    '## M. INFORMATIONAL QUERIES', '', findings.informational.length ? findings.informational.map((item) => `- ${item}`).join('\n') : '- No meaningful informational query rows.', '',
    '## N. COUNTRY CHANGES', '', top(reports.current28_country, 10).filter((r) => r.impressions >= LOW_DATA).map((r) => `- ${r.keys[0]}: ${formatMetric(r)}`).join('\n') || '- None.', '',
    '## O. DEVICE CHANGES', '', top(reports.current28_device, 10).map((r) => `- ${r.keys[0]}: ${formatMetric(r)}`).join('\n') || '- None.', '',
    '## P. WATCHLIST STATUS', '', ...WATCH_PAGES.map((page) => `- ${page}: ${findings.watchlist[page]}`), '',
    '## Q. DATA-BACKED ACTIONS', '', findings.actions.length ? findings.actions.map((item) => `- ${item}`).join('\n') : '- None. Monitoring only.', '',
    '## R. NO-ACTION ITEMS', '', '- No metadata, content, internal-link, schema, canonical, sitemap, robots, or redirect changes are automated.', '',
    '## S. FINAL DECISION', '', `**${findings.finalDecision}**`, '',
  ];
  return lines.join('\n');
}

try {
  const { searchconsole } = createSearchConsoleClient();
  const availabilityWindow = { startDate: dateShift(reportDate, -60), endDate: dateShift(reportDate, -2) };
  const availability = await queryReport(searchconsole, availabilityWindow, ['date']);
  const latestDataDate = availability.filter((row) => (row.impressions || 0) > 0 || (row.clicks || 0) > 0).map((row) => row.keys[0]).sort().at(-1);
  if (!latestDataDate) throw new Error('No Search Console data is available in the last 60 days.');

  const windows = {
    current7: period(latestDataDate, 7), previous7: period(latestDataDate, 7, 7),
    current28: period(latestDataDate, 28), previous28: period(latestDataDate, 28, 28),
  };
  const reports = { availability };
  for (const [name, window] of Object.entries(windows)) {
    for (const dimension of ['date', 'query', 'page', 'country', 'device']) reports[`${name}_${dimension}`] = await queryReport(searchconsole, window, [dimension]);
    reports[`${name}_query_page`] = await queryReport(searchconsole, window, ['query', 'page']);
  }

  const current = reports.current28_page;
  const previous = reports.previous28_page;
  const previousMap = new Map(previous.map((row) => [row.keys[0], row]));
  const winners = [];
  const losses = [];
  for (const row of meaningful(current)) {
    const old = previousMap.get(row.keys[0]);
    if (!old) continue;
    if ((row.clicks > old.clicks && row.impressions >= old.impressions) || row.position < old.position - 3) winners.push(`${pagePath(row.keys[0])}: ${formatMetric(row)} vs previous ${formatMetric(old)}`);
    if ((row.clicks < old.clicks * 0.6 && old.impressions >= MONITOR_DATA) || row.position > old.position + 3) losses.push(`${pagePath(row.keys[0])}: ${formatMetric(row)} vs previous ${formatMetric(old)}`);
  }
  const striking = meaningful(reports.current28_query).filter((row) => row.position >= 4 && row.position <= 15).slice(0, 12).map((row) => `${row.keys[0]}: ${row.impressions} impressions, ${percent(row.ctr)}, position ${row.position.toFixed(2)} — MONITOR`);
  const ctr = reports.current28_query.filter((row) => row.impressions >= MONITOR_DATA && row.position <= 15 && row.ctr <= 0.01).slice(0, 10).map((row) => `${row.keys[0]}: ${row.impressions} impressions, ${percent(row.ctr)}, position ${row.position.toFixed(2)} — CTR WATCH`);
  const ownership = meaningful(reports.current28_query_page).filter((row) => row.keys[1] !== GSC_SITE_URL).slice(0, 12).map((row) => `${row.keys[0]} → ${pagePath(row.keys[1])}: ${row.impressions} impressions, position ${row.position.toFixed(2)}`);
  const matchTerms = (terms) => reports.current28_query.filter((row) => row.impressions >= LOW_DATA && terms.some((term) => row.keys[0].toLowerCase().includes(term))).slice(0, 12).map((row) => `${row.keys[0]}: ${row.impressions} impressions, ${percent(row.ctr)}, position ${row.position.toFixed(2)}`);
  const watchlist = {};
  for (const page of WATCH_PAGES) {
    const rows = reports.current28_query_page.filter((row) => row.keys[1] === `${GSC_SITE_URL.slice(0, -1)}${page}`);
    const extreme = page === '/players/iptv-extreme' ? rows.find((row) => row.keys[0].toLowerCase() === 'iptv extreme') : null;
    watchlist[page] = extreme && extreme.impressions >= STRONG_DATA && extreme.position <= 10 && extreme.ctr <= 0.01 ? 'CONTROLLED TITLE/SNIPPET TEST MAY BE JUSTIFIED' : 'MONITOR — NO CHANGE';
  }
  const findings = { winners, losses, striking, ctr, ownership, commercial: matchTerms(COMMERCIAL_TERMS), informational: matchTerms(INFORMATIONAL_TERMS), watchlist, actions: Object.values(watchlist).some((value) => value.includes('MAY BE')) ? ['Review the flagged watch item manually; do not automate a metadata change.'] : [], finalDecision: Object.values(watchlist).some((value) => value.includes('MAY BE')) ? 'ENOUGH EVIDENCE FOR A CONTROLLED TEST' : 'KEEP MONITORING — NO CHANGE' };
  const snapshot = { extractedAt: new Date().toISOString(), latestDataDate, windows, thresholds: { LOW_DATA, MONITOR_DATA, STRONG_DATA }, reports, findings };
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.mkdir(REPORT_DIR, { recursive: true });
  await fs.writeFile(path.join(DATA_DIR, `gsc-summary-${reportDate}.json`), JSON.stringify(snapshot, null, 2));
  await fs.writeFile(path.join(REPORT_DIR, `gsc-weekly-${reportDate}.md`), buildMarkdown(snapshot));
  console.log(`GSC monitor complete: ${GSC_SITE_URL}`);
  console.log(`Latest complete data date: ${latestDataDate}`);
  console.log(`7-day window: ${windows.current7.startDate} → ${windows.current7.endDate}`);
  console.log(`28-day window: ${windows.current28.startDate} → ${windows.current28.endDate}`);
  console.log(`Report: reports/gsc/gsc-weekly-${reportDate}.md`);
  console.log(`Snapshot: data/gsc-monitoring/gsc-summary-${reportDate}.json`);
  console.log(`Final decision: ${findings.finalDecision}`);
} catch (error) {
  console.error(`GSC monitor failed: ${error instanceof Error ? error.message : 'unknown error'}`);
  process.exitCode = 1;
}
