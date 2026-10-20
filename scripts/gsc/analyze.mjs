// Pure analysis over a stored snapshot. No network access; safe to unit test.
import fs from 'node:fs';
import path from 'node:path';
import { toPath, dimsKey } from './lib.mjs';

// ---------- loading ----------

export function loadSnapshot(dir) {
  const manifest = JSON.parse(fs.readFileSync(path.join(dir, 'manifest.json'), 'utf8'));
  const read = (file) => {
    const full = path.join(dir, file);
    return fs.existsSync(full) ? JSON.parse(fs.readFileSync(full, 'utf8')) : null;
  };
  /** Rows for a window/dimension set as objects: { query, page, clicks, impressions, ctr, position }. */
  const rows = (window, dims) => {
    const raw = read(`sa/${window}__${dimsKey(dims)}.json`);
    if (!raw) return null;
    return raw.map((row) => {
      const out = { clicks: row.clicks || 0, impressions: row.impressions || 0, ctr: row.ctr || 0, position: row.position ?? null };
      dims.forEach((dim, i) => { out[dim] = dim === 'page' ? toPath(row.keys[i]) : row.keys[i]; });
      return out;
    });
  };
  return { manifest, rows, read };
}

// ---------- metrics ----------

export function aggregate(rows = []) {
  const clicks = rows.reduce((s, r) => s + r.clicks, 0);
  const impressions = rows.reduce((s, r) => s + r.impressions, 0);
  const position = impressions ? rows.reduce((s, r) => s + (r.position ?? 0) * r.impressions, 0) / impressions : null;
  return { clicks, impressions, ctr: impressions ? clicks / impressions : 0, position };
}

/** Change between periods. Percent is null when the base is too small to be meaningful. */
export function change(current, previous, minBase = 10) {
  const absolute = current - previous;
  if (previous === 0 && current > 0) return { absolute, percent: null, label: 'new' };
  if (previous < minBase) return { absolute, percent: null, label: 'n/a (small base)' };
  return { absolute, percent: absolute / previous, label: `${absolute >= 0 ? '+' : ''}${((absolute / previous) * 100).toFixed(1)}%` };
}

export function compareMetrics(cur, prev) {
  return {
    clicks: change(cur.clicks, prev.clicks),
    impressions: change(cur.impressions, prev.impressions, 50),
    ctrPoints: (cur.ctr - prev.ctr) * 100,
    // Positive = improved (moved up the page).
    positionGain: cur.position != null && prev.position != null ? prev.position - cur.position : null,
  };
}

export const percentile = (values, p) => {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.min(sorted.length - 1, Math.floor(p * (sorted.length - 1)))];
};

// ---------- intent ----------

const BRAND = /\btry\s?iptv\b/i;
const INTENT_RULES = [
  ['navigational', BRAND],
  ['troubleshooting', /not working|buffer|freez|error|fix|problem|no information|not loading|login (failed|issue)|stutter/i],
  ['player-specific', /smarters|tivimate|xciptv|televizo|perfect player|ott navigator|iptv extreme|vlc|kodi|ibo player/i],
  ['device-specific', /fire ?stick|fire tv|android tv|google tv|samsung|\blg\b|webos|tizen|roku|apple tv|chromecast|\bmag\b|windows|\bpc\b|\bmac\b|macos|smart tv|iphone|ipad/i],
  ['free-trial', /\btrial\b|free (iptv|test)|test (iptv|before)/i],
  ['pricing', /price|pricing|cost|cheap|plan|\$|per month|subscription (price|cost)/i],
  ['setup', /set ?up|install|configure|how to (use|watch|add|get)|m3u (url|link)|add playlist/i],
  ['comparison', /\bvs\b|versus|compare|alternative|\bbest\b|\btop\b|review/i],
  ['IPTV provider', /iptv provider|iptv providers|iptv seller|iptv reseller/i],
  ['IPTV service', /iptv service|iptv services|iptv subscription|iptv streaming service/i],
  ['informational', /what is|what are|how does|meaning|explained|\bm3u\b|xtream|\bepg\b|internet speed|bandwidth|legal/i],
];

/** Labels supported by the query wording; empty array when ambiguous (never forced). */
export function classify(query) {
  const labels = INTENT_RULES.filter(([, re]) => re.test(query)).map(([label]) => label);
  if (labels.some((l) => ['pricing', 'free-trial', 'IPTV service', 'IPTV provider'].includes(l))) labels.push('transactional/commercial');
  return [...new Set(labels)];
}
export const isBrand = (query) => BRAND.test(query);

/** What each section of the existing architecture is meant to rank for. */
export function expectedIntents(page) {
  if (page === '/') return ['navigational', 'IPTV service', 'IPTV provider', 'comparison', 'transactional/commercial'];
  if (page.startsWith('/pricing')) return ['pricing', 'IPTV service', 'transactional/commercial'];
  if (page.startsWith('/iptv-free-trial')) return ['free-trial', 'transactional/commercial'];
  if (page.startsWith('/setup')) return ['setup', 'device-specific', 'player-specific'];
  if (page.startsWith('/devices')) return ['device-specific', 'setup'];
  if (page.startsWith('/players')) return ['player-specific', 'setup', 'comparison'];
  if (page.startsWith('/help')) return ['troubleshooting'];
  if (page.startsWith('/guides')) return ['informational', 'comparison'];
  if (page.startsWith('/faq')) return ['informational', 'IPTV service', 'navigational'];
  return null;
}

// ---------- CTR model from the site's own data ----------

export const positionBucket = (p) => (p == null ? null : p <= 10 ? String(Math.max(1, Math.round(p))) : p <= 20 ? '11-20' : p <= 50 ? '21-50' : '50+');

/** Weighted CTR per position bucket from non-brand query rows; buckets with too little data are dropped. */
export function ctrCurve(queryRows, minImpressions = 200) {
  const buckets = new Map();
  for (const row of queryRows.filter((r) => !isBrand(r.query))) {
    const key = positionBucket(row.position);
    const b = buckets.get(key) || { clicks: 0, impressions: 0 };
    b.clicks += row.clicks; b.impressions += row.impressions;
    buckets.set(key, b);
  }
  const curve = {};
  for (const [key, b] of buckets) if (b.impressions >= minImpressions) curve[key] = { ctr: b.clicks / b.impressions, impressions: b.impressions };
  return curve;
}
export const expectedCtr = (curve, position) => curve[positionBucket(position)]?.ctr ?? null;

// ---------- page & query intelligence ----------

function byKey(rows, key) {
  const map = new Map();
  for (const row of rows || []) {
    const list = map.get(row[key]) || [];
    list.push(row);
    map.set(row[key], list);
  }
  return map;
}

export function pageTable(snap) {
  const cur = snap.rows('last28', ['page']) || [];
  const prev = new Map((snap.rows('prev28', ['page']) || []).map((r) => [r.page, r]));
  const qp = byKey(snap.rows('last28', ['query', 'page']), 'page');
  const pc = byKey(snap.rows('last28', ['page', 'country']), 'page');
  const pd = byKey(snap.rows('last28', ['page', 'device']), 'page');
  return cur.map((row) => {
    const queries = (qp.get(row.page) || []).sort((a, b) => b.impressions - a.impressions);
    const before = prev.get(row.page) || { clicks: 0, impressions: 0, ctr: 0, position: null };
    const intentImpr = {};
    for (const q of queries) for (const l of classify(q.query)) intentImpr[l] = (intentImpr[l] || 0) + q.impressions;
    return {
      ...row,
      prev: before,
      delta: compareMetrics(row, before),
      queryCount: queries.length,
      topQueries: queries.slice(0, 5).map((q) => q.query),
      countries: (pc.get(row.page) || []).sort((a, b) => b.impressions - a.impressions).slice(0, 3).map((c) => c.country),
      devices: Object.fromEntries((pd.get(row.page) || []).map((d) => [d.device, d.impressions])),
      intentImpressions: intentImpr,
      queriesImpressions: queries.reduce((s, q) => s + q.impressions, 0),
    };
  }).sort((a, b) => b.impressions - a.impressions);
}

export function queryTable(snap) {
  const cur = snap.rows('last28', ['query']) || [];
  const last7 = new Map((snap.rows('last7', ['query']) || []).map((r) => [r.query, r]));
  const prev7 = new Map((snap.rows('prev7', ['query']) || []).map((r) => [r.query, r]));
  const qp = byKey(snap.rows('last28', ['query', 'page']), 'query');
  const qc = byKey(snap.rows('last28', ['query', 'country']), 'query');
  const qd = byKey(snap.rows('last28', ['query', 'device']), 'query');
  return cur.map((row) => {
    const pages = (qp.get(row.query) || []).sort((a, b) => b.impressions - a.impressions);
    const a = last7.get(row.query) || { clicks: 0, impressions: 0 };
    const b = prev7.get(row.query) || { clicks: 0, impressions: 0 };
    return {
      ...row,
      intents: classify(row.query),
      brand: isBrand(row.query),
      rankingUrl: pages[0]?.page ?? null,
      otherUrls: pages.slice(1).map((p) => ({ page: p.page, impressions: p.impressions, position: p.position })),
      countries: (qc.get(row.query) || []).sort((x, y) => y.impressions - x.impressions).slice(0, 3).map((c) => `${c.country}:${c.impressions}`),
      devices: Object.fromEntries((qd.get(row.query) || []).map((d) => [d.device, d.impressions])),
      trend7: { impressions: change(a.impressions, b.impressions, 20), clicks: change(a.clicks, b.clicks, 5) },
    };
  }).sort((x, y) => y.impressions - x.impressions);
}

// ---------- opportunity detection ----------

export function opportunities(queries, curve, threshold) {
  const meaningful = queries.filter((q) => q.impressions >= threshold && q.position != null);
  const withGap = (q) => {
    const expected = expectedCtr(curve, q.position);
    return { ...q, expectedCtr: expected, ctrGap: expected != null ? expected - q.ctr : null };
  };
  const rows = meaningful.map(withGap);
  const growing = queries.filter((q) => {
    const t = q.trend7.impressions;
    return q.impressions >= threshold / 2 && (t.label === 'new' || (t.percent != null && t.percent >= 0.5 && t.absolute >= threshold / 2));
  });
  return {
    A: rows.filter((q) => q.position >= 4 && q.position <= 10 && q.ctrGap != null && q.ctr < q.expectedCtr * 0.6),
    B: rows.filter((q) => q.position > 8 && q.position <= 20),
    C: rows.filter((q) => q.position > 10 && q.position <= 20 && q.impressions >= threshold * 2),
    D: rows.filter((q) => q.clicks === 0),
    E: rows.filter((q) => q.position < 4 && q.ctrGap != null && q.ctr < q.expectedCtr * 0.5),
    F: growing.map(withGap),
  };
}

/** Queries where 2+ URLs each hold a meaningful share, or where the top URL changed between periods. */
export function cannibalization(snap, threshold, minShare = 0.15) {
  const cur = byKey(snap.rows('last28', ['query', 'page']), 'query');
  const prev = byKey(snap.rows('prev28', ['query', 'page']), 'query');
  const out = [];
  for (const [query, pages] of cur) {
    const total = pages.reduce((s, p) => s + p.impressions, 0);
    if (total < threshold) continue;
    const sorted = pages.sort((a, b) => b.impressions - a.impressions);
    const competing = sorted.filter((p) => p.impressions / total >= minShare);
    const prevTop = (prev.get(query) || []).sort((a, b) => b.impressions - a.impressions)[0]?.page;
    const flipped = prevTop && prevTop !== sorted[0].page;
    if (competing.length >= 2 || flipped) {
      out.push({ query, impressions: total, intents: classify(query), pages: competing.map((p) => ({ page: p.page, share: p.impressions / total, position: p.position, clicks: p.clicks })), previousTop: flipped ? prevTop : null });
    }
  }
  return out.sort((a, b) => b.impressions - a.impressions);
}

/** Pages whose query impressions mostly carry intents the page isn't meant for. */
export function intentMismatches(pages, threshold, minShare = 0.4) {
  return pages.flatMap((p) => {
    const expected = expectedIntents(p.page);
    if (!expected || p.queriesImpressions < threshold) return [];
    const offIntent = Object.entries(p.intentImpressions)
      .filter(([label]) => !expected.includes(label) && !['navigational', 'transactional/commercial'].includes(label));
    const top = offIntent.sort((a, b) => b[1] - a[1])[0];
    if (!top || top[1] / p.queriesImpressions < minShare) return [];
    return [{ page: p.page, impressions: p.impressions, offIntent: top[0], share: top[1] / p.queriesImpressions, expected, topQueries: p.topQueries }];
  });
}

// ---------- indexation & sitemaps ----------

export function inspectionSummary(inspection = []) {
  const rows = inspection.map(({ url, result, error }) => {
    const s = result?.indexStatusResult || {};
    return {
      page: toPath(url), error: error?.message ?? null, verdict: s.verdict ?? null, coverage: s.coverageState ?? null,
      googleCanonical: s.googleCanonical ? toPath(s.googleCanonical) : null, userCanonical: s.userCanonical ? toPath(s.userCanonical) : null,
      lastCrawl: s.lastCrawlTime ?? null, robots: s.robotsTxtState ?? null, indexing: s.indexingState ?? null, fetch: s.pageFetchState ?? null,
      sitemaps: s.sitemap ?? [], referring: s.referringUrls ?? [], richResults: result?.richResultsResult?.verdict ?? null,
    };
  });
  return {
    rows,
    notIndexed: rows.filter((r) => r.verdict && r.verdict !== 'PASS'),
    canonicalMismatch: rows.filter((r) => r.googleCanonical && r.userCanonical && r.googleCanonical !== r.userCanonical),
    blocked: rows.filter((r) => (r.robots && r.robots !== 'ALLOWED') || (r.indexing && r.indexing !== 'INDEXING_ALLOWED')),
    notInSitemap: rows.filter((r) => r.verdict && !r.sitemaps.length),
    errors: rows.filter((r) => r.error),
  };
}

export function sitemapFindings(submitted = [], liveUrls = [], pageRows = []) {
  const live = new Set(liveUrls.map(toPath));
  const withImpressions = new Set(pageRows.filter((p) => p.impressions > 0).map((p) => p.page));
  return {
    submitted: submitted.map((s) => ({ path: s.path, lastDownloaded: s.lastDownloaded, isPending: s.isPending, errors: Number(s.errors || 0), warnings: Number(s.warnings || 0), contents: s.contents })),
    liveCount: live.size,
    rankingNotInSitemap: [...withImpressions].filter((p) => !live.has(p)),
    sitemapWithoutImpressions: [...live].filter((p) => !withImpressions.has(p)),
  };
}
