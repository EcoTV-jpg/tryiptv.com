// npm run gsc:report — build the baseline report from the latest snapshot in data/gsc/.
// Output: reports/gsc/baseline-<latestFinalDate>.md (git-ignored). Reads stored data only.
import fs from 'node:fs';
import path from 'node:path';
import { COMPARISONS } from './lib.mjs';
import {
  loadSnapshot, aggregate, compareMetrics, percentile, pageTable, queryTable, ctrCurve, expectedCtr,
  opportunities, cannibalization, intentMismatches, inspectionSummary, sitemapFindings, positionBucket,
} from './analyze.mjs';

const ROOT = path.join(process.cwd(), 'data/gsc');
const pointer = JSON.parse(fs.readFileSync(path.join(ROOT, 'latest.json'), 'utf8'));
const snap = loadSnapshot(path.join(ROOT, pointer.snapshot));
const { manifest } = snap;
const N = 25;
const CORE = ['/', '/pricing', '/iptv-free-trial', '/setup'];

const pct = (v) => (v == null ? '—' : `${(v * 100).toFixed(2)}%`);
const pos = (v) => (v == null ? '—' : v.toFixed(1));
const num = (v) => (v == null ? '—' : v.toLocaleString('en-US'));
const table = (headers, rows) => rows.length
  ? [`| ${headers.join(' | ')} |`, `|${headers.map(() => '---').join('|')}|`, ...rows.map((r) => `| ${r.join(' | ')} |`)].join('\n')
  : '_No rows met the criteria in the available data._';
const totalsOf = (window) => {
  const rows = snap.rows(window, []);
  return rows?.length ? rows[0] : aggregate(snap.rows(window, ['page']) || []);
};

const pages = pageTable(snap);
const queries = queryTable(snap);
const queryRows90 = snap.rows('last90', ['query']) || snap.rows('last28', ['query']) || [];
const curve = ctrCurve(queryRows90);
const threshold = Math.max(20, Math.round(percentile(queries.map((q) => q.impressions), 0.75)));
const opp = opportunities(queries, curve, threshold);
const cannibal = cannibalization(snap, threshold);
const mismatches = intentMismatches(pages, threshold);
const inspection = inspectionSummary(snap.read('inspection.json') || []);
const sitemaps = sitemapFindings(snap.read('sitemaps.json') || [], snap.read('live-sitemap.json') || [], pages);

// Anonymized share: query-level impressions vs property totals for the same window.
const total28 = totalsOf('last28');
const queryImpr28 = queries.reduce((s, q) => s + q.impressions, 0);
const anonymizedShare = total28.impressions ? 1 - queryImpr28 / total28.impressions : null;

const L = [];
const h = (title) => L.push('', `## ${title}`, '');

L.push(`# TryIPTV — Search Console Baseline (${manifest.latestFinalDate})`, '',
  `Property \`${manifest.property}\` · data through ${manifest.latestFinalDate} (finalized) · extracted ${manifest.extractedAt}`, '',
  '> Every number below comes from the Search Console API snapshot. Nothing is estimated or filled in.');

h('A. Connection status');
L.push(table(['Item', 'Value'], [
  ['APIs used', 'Search Analytics, URL Inspection, Sitemaps (all read-only, scope `webmasters.readonly`)'],
  ['Property', manifest.property],
  ['Authentication', manifest.credential || '—'],
  ['Search Analytics files', String(manifest.searchAnalytics.length)],
  ['URLs inspected', String(manifest.inspected ?? 0)],
  ['Errors during sync', manifest.errors.length ? manifest.errors.map((e) => `${e.step}: ${e.message}`).join('; ') : 'none'],
]));
L.push('', '**Limitations that affect conclusions**', '',
  `- Anonymized/rare queries: ~${pct(anonymizedShare)} of last-28-day impressions are not attributable to any query row, so query tables never sum to site totals.`,
  '- The API exposes a capped number of rows per day and property; long-tail rows can be missing even with full pagination.',
  `- Possibly truncated datasets: ${manifest.searchAnalytics.filter((f) => f.possiblyTruncated).map((f) => `${f.window}/${f.dimensions.join('x')}`).join(', ') || 'none detected'}.`,
  '- Average position is impression-weighted and blends every SERP feature; small samples swing widely.',
  '- Totals by page use page-level aggregation and differ slightly from property-level totals (UI shows the same difference).',
  '- Only finalized data is used for comparisons; the most recent 2–3 days are excluded.',
  `- "Meaningful" in this report = at least ${threshold} impressions in 28 days (75th percentile of this site's queries, minimum 20).`);

h('B. Site search performance');
const rowsB = [];
for (const [a, b] of COMPARISONS) {
  const cur = totalsOf(a); const prev = totalsOf(b);
  if (!snap.rows(a, []) && !snap.rows(a, ['page'])) continue;
  const d = compareMetrics(cur, prev);
  rowsB.push([`${a} vs ${b}`, num(cur.clicks), d.clicks.label, num(cur.impressions), d.impressions.label, pct(cur.ctr), `${d.ctrPoints >= 0 ? '+' : ''}${d.ctrPoints.toFixed(2)} pts`, pos(cur.position), d.positionGain == null ? '—' : `${d.positionGain >= 0 ? '+' : ''}${d.positionGain.toFixed(1)}`]);
}
for (const w of ['last3m', 'last6m', 'max']) {
  const t = snap.rows(w, []);
  if (t?.length) rowsB.push([`${w} (${manifest.windows[w].startDate} → ${manifest.windows[w].endDate})`, num(t[0].clicks), '', num(t[0].impressions), '', pct(t[0].ctr), '', pos(t[0].position), '']);
}
L.push(table(['Window', 'Clicks', 'Δ', 'Impressions', 'Δ', 'CTR', 'Δ', 'Position', 'Gain'], rowsB));

h('C. Top pages (last 28 days)');
L.push(table(['Page', 'Clicks', 'Impr.', 'CTR', 'Pos.', 'Queries', 'Top queries', 'Δ impr.'],
  pages.slice(0, N).map((p) => [p.page, num(p.clicks), num(p.impressions), pct(p.ctr), pos(p.position), num(p.queryCount), p.topQueries.slice(0, 3).join('; '), p.delta.impressions.label])));

h('D. Top queries (last 28 days)');
L.push(table(['Query', 'Intent', 'Clicks', 'Impr.', 'CTR', 'Pos.', 'Ranking URL', 'Other URLs'],
  queries.slice(0, N).map((q) => [q.query, q.intents.join(', ') || 'unclassified', num(q.clicks), num(q.impressions), pct(q.ctr), pos(q.position), q.rankingUrl ?? '—', q.otherUrls.length])));

const movers = (list, dir) => list.filter((q) => q.trend7.impressions.percent != null || q.trend7.impressions.label === 'new')
  .sort((a, b) => dir * (b.trend7.impressions.absolute - a.trend7.impressions.absolute)).slice(0, 15);
h('E. Fastest-growing queries (last 7 vs previous 7 days)');
L.push(table(['Query', 'Δ impressions', 'Δ clicks', 'Pos.', 'URL'], movers(queries, 1).filter((q) => q.trend7.impressions.absolute > 0).map((q) => [q.query, `${q.trend7.impressions.absolute} (${q.trend7.impressions.label})`, q.trend7.clicks.label, pos(q.position), q.rankingUrl ?? '—'])));
h('F. Fastest-declining queries');
L.push(table(['Query', 'Δ impressions', 'Δ clicks', 'Pos.', 'URL'], movers(queries, -1).filter((q) => q.trend7.impressions.absolute < 0).map((q) => [q.query, `${q.trend7.impressions.absolute} (${q.trend7.impressions.label})`, q.trend7.clicks.label, pos(q.position), q.rankingUrl ?? '—'])));

const pageMovers = (dir) => pages.filter((p) => p.delta.impressions.absolute * dir > 0).sort((a, b) => dir * (b.delta.impressions.absolute - a.delta.impressions.absolute)).slice(0, 15)
  .map((p) => [p.page, `${p.delta.impressions.absolute} (${p.delta.impressions.label})`, p.delta.clicks.label, p.delta.positionGain == null ? '—' : p.delta.positionGain.toFixed(1)]);
h('G. Fastest-growing pages (last 28 vs previous 28 days)');
L.push(table(['Page', 'Δ impressions', 'Δ clicks', 'Position gain'], pageMovers(1)));
h('H. Declining pages');
L.push(table(['Page', 'Δ impressions', 'Δ clicks', 'Position gain'], pageMovers(-1)));

const oppRow = (q) => [q.query, q.rankingUrl ?? '—', num(q.clicks), num(q.impressions), pct(q.ctr), pct(q.expectedCtr), pos(q.position), q.trend7.impressions.label];
const oppHead = ['Query', 'URL', 'Clicks', 'Impr.', 'CTR', 'Site CTR @pos', 'Pos.', '7d trend'];
h('I. Striking-distance opportunities');
L.push('**Group A — position 4–10, CTR under 60% of this site\'s CTR at that position**', '', table(oppHead, opp.A.slice(0, N).map(oppRow)));
L.push('', '**Group B — position 8–20, meaningful impressions**', '', table(oppHead, opp.B.slice(0, N).map(oppRow)));
L.push('', '**Group C — position 11–20, strong impressions**', '', table(oppHead, opp.C.slice(0, N).map(oppRow)));
L.push('', '**Group F — growing queries**', '', table(oppHead, opp.F.slice(0, N).map(oppRow)));

h('J. High-impression / zero-click queries (Group D)');
L.push(table(oppHead, opp.D.slice(0, N).map(oppRow)));

h('K. CTR opportunities (Group E: top-3 position, CTR under half of site CTR there)');
L.push('Site CTR curve (non-brand, last 90 days): ' + (Object.entries(curve).map(([b, v]) => `${b}: ${pct(v.ctr)}`).join(' · ') || 'not enough data'), '');
L.push(table(oppHead, opp.E.slice(0, N).map(oppRow)));
const brand = queries.filter((q) => q.brand); const nonBrand = queries.filter((q) => !q.brand);
L.push('', `Brand vs non-brand (28d): brand ${pct(aggregate(brand).ctr)} CTR on ${num(aggregate(brand).impressions)} impr. · non-brand ${pct(aggregate(nonBrand).ctr)} on ${num(aggregate(nonBrand).impressions)} impr.`);

h('L. Query cannibalization');
L.push('Only queries where 2+ URLs each take ≥15% of impressions, or where the top URL changed versus the previous 28 days.', '');
L.push(table(['Query', 'Impr.', 'Intent', 'Competing URLs (share · pos.)', 'Previous top URL'],
  cannibal.slice(0, N).map((c) => [c.query, num(c.impressions), c.intents.join(', ') || '—', c.pages.map((p) => `${p.page} (${pct(p.share)} · ${pos(p.position)})`).join('<br>'), c.previousTop ?? '—'])));

h('M. Intent mismatches');
L.push(table(['Page', 'Impr.', 'Off-intent share', 'Off-intent label', 'Expected', 'Top queries'],
  mismatches.map((m) => [m.page, num(m.impressions), pct(m.share), m.offIntent, m.expected.join(', '), m.topQueries.slice(0, 3).join('; ')])));

h('N. Countries (last 28 vs previous 28 days)');
const c28 = snap.rows('last28', ['country']) || []; const p28 = new Map((snap.rows('prev28', ['country']) || []).map((r) => [r.country, r]));
const siteCtr = total28.ctr;
L.push(table(['Country', 'Clicks', 'Impr.', 'CTR', 'Pos.', 'Δ impr.', 'Position gain', 'Flag'],
  c28.sort((a, b) => b.impressions - a.impressions).slice(0, 15).map((c) => {
    const d = compareMetrics(c, p28.get(c.country) || { clicks: 0, impressions: 0, ctr: 0, position: null });
    const flag = c.impressions >= threshold * 5 && c.ctr < siteCtr * 0.5 ? 'strong impressions, weak CTR' : c.ctr > siteCtr * 2 && c.impressions >= threshold ? 'unusually high CTR' : (d.positionGain ?? 0) >= 2 ? 'rankings improving' : '';
    return [c.country.toUpperCase(), num(c.clicks), num(c.impressions), pct(c.ctr), pos(c.position), d.impressions.label, d.positionGain == null ? '—' : d.positionGain.toFixed(1), flag];
  })));

h('O. Devices (last 28 days)');
const dev = snap.rows('last28', ['device']) || [];
L.push(table(['Device', 'Clicks', 'Impr.', 'CTR', 'Pos.'], dev.map((d) => [d.device, num(d.clicks), num(d.impressions), pct(d.ctr), pos(d.position)])));
const qd = snap.rows('last28', ['query', 'device']) || [];
const gaps = [];
for (const q of queries.filter((x) => x.impressions >= threshold)) {
  const m = qd.find((r) => r.query === q.query && r.device === 'MOBILE'); const d = qd.find((r) => r.query === q.query && r.device === 'DESKTOP');
  if (m && d && m.impressions >= threshold / 2 && d.impressions >= threshold / 2 && Math.abs(m.position - d.position) >= 5) gaps.push([q.query, pos(m.position), pos(d.position), pct(m.ctr), pct(d.ctr)]);
}
L.push('', 'Queries with a ≥5-position mobile/desktop gap:', '', table(['Query', 'Mobile pos.', 'Desktop pos.', 'Mobile CTR', 'Desktop CTR'], gaps.slice(0, 15)));

h('P. Indexation / URL Inspection');
L.push(table(['Check', 'Count', 'Pages'], [
  ['Inspected', inspection.rows.length, ''],
  ['Verdict not PASS', inspection.notIndexed.length, inspection.notIndexed.map((r) => `${r.page} (${r.coverage})`).join('<br>')],
  ['Google canonical ≠ declared canonical', inspection.canonicalMismatch.length, inspection.canonicalMismatch.map((r) => `${r.page} → ${r.googleCanonical}`).join('<br>')],
  ['Blocked by robots / noindex', inspection.blocked.length, inspection.blocked.map((r) => r.page).join('<br>')],
  ['Not referenced by a known sitemap', inspection.notInSitemap.length, inspection.notInSitemap.map((r) => r.page).join('<br>')],
  ['Inspection errors', inspection.errors.length, inspection.errors.map((r) => `${r.page}: ${r.error}`).join('<br>')],
]));
const oldest = inspection.rows.filter((r) => r.lastCrawl).sort((a, b) => a.lastCrawl.localeCompare(b.lastCrawl)).slice(0, 5);
L.push('', `Oldest last-crawl dates: ${oldest.map((r) => `${r.page} (${r.lastCrawl.slice(0, 10)})`).join(', ') || '—'}`);

h('Q. Sitemaps');
L.push(table(['Submitted sitemap', 'Last downloaded', 'Pending', 'Errors', 'Warnings'], sitemaps.submitted.map((s) => [s.path, s.lastDownloaded ?? '—', String(s.isPending), s.errors, s.warnings])));
L.push('', `Live sitemap URLs: ${sitemaps.liveCount}.`,
  `Pages with impressions but not in the live sitemap: ${sitemaps.rankingNotInSitemap.join(', ') || 'none'}.`,
  `Sitemap URLs with no impressions in the last 28 days: ${sitemaps.sitemapWithoutImpressions.join(', ') || 'none'}.`);

// ---------- R. candidate actions ----------
const target5 = curve['5']?.ctr ?? curve['4']?.ctr ?? null;
const candidates = [];
for (const r of inspection.notIndexed.concat(inspection.canonicalMismatch, inspection.blocked)) {
  if (CORE.includes(r.page)) candidates.push({ priority: 'P0', url: r.page, query: '—', evidence: `URL Inspection: ${r.verdict} / ${r.coverage} / canonical ${r.googleCanonical ?? '—'}`, change: 'Resolve indexing/canonical issue before any content work', measure: 'Re-inspect; page returns to PASS with matching canonical', potential: Infinity });
}
const add = (group, q, change, potential) => candidates.push({ group, url: q.rankingUrl ?? '—', query: q.query,
  evidence: `${num(q.impressions)} impr., ${num(q.clicks)} clicks, CTR ${pct(q.ctr)} vs site ${pct(q.expectedCtr)} @ pos ${pos(q.position)} (bucket ${positionBucket(q.position)}), 7d ${q.trend7.impressions.label}`,
  change, measure: `CTR and clicks for "${q.query}" on ${q.rankingUrl} over the next 28 days vs this baseline`, potential });
for (const q of opp.A) add('A', q, 'Title/meta snippet review against the query intent (page already ranks on page one)', q.impressions * Math.max(0, q.ctrGap));
for (const q of opp.E) add('E', q, 'Snippet review: check title, description and SERP features competing for the click', q.impressions * Math.max(0, q.ctrGap));
for (const q of opp.C) if (target5 != null) add('C', q, 'Intent alignment + internal links/anchor text from related pages; direct-answer section if missing', q.impressions * Math.max(0, target5 - q.ctr));
for (const q of opp.D.filter((x) => !opp.A.includes(x) && !opp.C.includes(x))) add('D', q, 'Check whether the ranking URL matches the query intent before changing anything', q.impressions * (expectedCtr(curve, q.position) ?? 0));
const seen = new Set();
const ranked = candidates.sort((a, b) => b.potential - a.potential).filter((c) => !seen.has(`${c.url}|${c.query}`) && seen.add(`${c.url}|${c.query}`)).slice(0, 10)
  .map((c, i) => ({ ...c, priority: c.priority || (i < 3 && c.potential >= 5 ? 'P1' : c.potential >= 2 ? 'P2' : 'P3') }));
h('R. Top 10 candidate actions');
L.push('Ranked by estimated additional clicks (impressions × CTR gap to this site\'s own curve). Exact copy is written only after reviewing the page and SERP; candidates with tiny potential stay P3/observe.', '');
L.push(table(['#', 'Priority', 'URL', 'Query', 'Evidence', 'Change type', 'Est. extra clicks/28d', 'Measure'],
  ranked.map((c, i) => [i + 1, c.priority, c.url, c.query, c.evidence, c.change, Number.isFinite(c.potential) ? c.potential.toFixed(1) : '—', c.measure])));

const outDir = path.join(process.cwd(), 'reports/gsc');
fs.mkdirSync(outDir, { recursive: true });
const out = path.join(outDir, `baseline-${manifest.latestFinalDate}.md`);
fs.writeFileSync(out, L.join('\n') + '\n');
console.log(`Report written: ${path.relative(process.cwd(), out)}`);
