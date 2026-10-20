// node --test scripts/gsc — checks the analysis logic on a small SYNTHETIC snapshot.
// These numbers are invented test fixtures, not TryIPTV data.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { buildWindows, dimsKey } from './lib.mjs';
import { change, classify, loadSnapshot, queryTable, pageTable, ctrCurve, opportunities, cannibalization, intentMismatches } from './analyze.mjs';

const SITE = 'https://www.tryiptv.com';
const row = (keys, clicks, impressions, position) => ({ keys, clicks, impressions, ctr: impressions ? clicks / impressions : 0, position });

function fixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'gsc-fixture-'));
  const dir = path.join(root, 'data/gsc/snapshots/2026-10-15');
  fs.mkdirSync(path.join(dir, 'sa'), { recursive: true });
  const write = (window, dims, rows) => fs.writeFileSync(path.join(dir, 'sa', `${window}__${dimsKey(dims)}.json`), JSON.stringify(rows));
  const qp28 = [
    row(['iptv free trial', `${SITE}/iptv-free-trial`], 2, 400, 7.2),
    row(['iptv free trial', `${SITE}/`], 1, 300, 9.8),
    row(['tivimate setup', `${SITE}/players/tivimate`], 30, 300, 2.1),
    row(['iptv buffering fix', `${SITE}/devices/firestick-iptv`], 0, 250, 14.0),
    row(['tryiptv', `${SITE}/`], 40, 60, 1.0),
  ];
  write('last28', ['query', 'page'], qp28);
  write('prev28', ['query', 'page'], [row(['iptv free trial', `${SITE}/`], 1, 200, 11)]);
  const q28 = [row(['iptv free trial'], 3, 700, 8.3), row(['tivimate setup'], 30, 300, 2.1), row(['iptv buffering fix'], 0, 250, 14.0), row(['tryiptv'], 40, 60, 1.0)];
  write('last28', ['query'], q28);
  write('last90', ['query'], [...q28, row(['iptv service'], 20, 400, 7.5), row(['m3u'], 5, 300, 15)]);
  write('last7', ['query'], [row(['iptv free trial'], 2, 300, 8)]);
  write('prev7', ['query'], [row(['iptv free trial'], 1, 100, 9)]);
  write('last28', ['page'], [row([`${SITE}/iptv-free-trial`], 2, 400, 7.2), row([`${SITE}/devices/firestick-iptv`], 0, 250, 14), row([`${SITE}/`], 41, 360, 2.4)]);
  write('prev28', ['page'], [row([`${SITE}/`], 30, 300, 3)]);
  write('last28', [], [row([], 73, 1500, 6.1)]);
  write('prev28', [], [row([], 31, 300, 3)]);
  fs.writeFileSync(path.join(dir, 'manifest.json'), JSON.stringify({ property: `${SITE}/`, latestFinalDate: '2026-10-15', extractedAt: 'fixture', windows: buildWindows('2026-10-15'), searchAnalytics: [], errors: [] }));
  fs.writeFileSync(path.join(dir, 'inspection.json'), JSON.stringify([{ url: `${SITE}/pricing`, result: { indexStatusResult: { verdict: 'PASS', coverageState: 'Submitted and indexed', googleCanonical: `${SITE}/pricing`, userCanonical: `${SITE}/pricing`, sitemap: [`${SITE}/sitemap.xml`] } } }]));
  fs.writeFileSync(path.join(root, 'data/gsc/latest.json'), JSON.stringify({ snapshot: 'snapshots/2026-10-15', latestFinalDate: '2026-10-15' }));
  return { root, dir };
}

test('change() avoids misleading percentages on tiny bases', () => {
  assert.equal(change(5, 0).label, 'new');
  assert.equal(change(6, 3).percent, null);
  assert.equal(change(150, 100).label, '+50.0%');
});

test('classify() labels only what the wording supports', () => {
  assert.ok(classify('iptv free trial').includes('free-trial'));
  assert.ok(classify('tivimate firestick setup').includes('player-specific'));
  assert.ok(classify('iptv buffering fix').includes('troubleshooting'));
  assert.deepEqual(classify('watch tv online'), []);
});

test('windows: previous periods sit directly before current ones', () => {
  const w = buildWindows('2026-10-15');
  assert.equal(w.last28.startDate, '2026-09-18');
  assert.equal(w.prev28.endDate, '2026-09-17');
  assert.equal(w.last7.days, 7);
});

test('opportunities, cannibalization and intent mismatch on the fixture', () => {
  const { dir } = fixture();
  const snap = loadSnapshot(dir);
  const queries = queryTable(snap);
  const curve = ctrCurve(snap.rows('last90', ['query']), 100);
  const opp = opportunities(queries, curve, 50);
  assert.ok(opp.D.some((q) => q.query === 'iptv buffering fix'), 'zero-click query detected');
  assert.ok(opp.C.some((q) => q.query === 'iptv buffering fix'), 'position 11-20 with strong impressions');
  const cannibal = cannibalization(snap, 50);
  const trial = cannibal.find((c) => c.query === 'iptv free trial');
  assert.equal(trial.pages.length, 2);
  assert.equal(trial.previousTop, '/');
  const mismatch = intentMismatches(pageTable(snap), 50);
  assert.ok(mismatch.some((m) => m.page === '/devices/firestick-iptv' && m.offIntent === 'troubleshooting'));
});

test('report renders end to end from a stored snapshot', () => {
  const { root } = fixture();
  execFileSync(process.execPath, [path.resolve('scripts/gsc/report.mjs')], { cwd: root });
  const report = fs.readFileSync(path.join(root, 'reports/gsc/baseline-2026-10-15.md'), 'utf8');
  for (const section of ['A. Connection status', 'L. Query cannibalization', 'R. Top 10 candidate actions']) assert.ok(report.includes(section));
  assert.ok(report.includes('iptv free trial'));
});
