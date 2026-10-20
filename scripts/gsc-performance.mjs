import { createSearchConsoleClient, GSC_SITE_URL, getDateRange, parseFlag } from './gsc-client.mjs';

const dimensions = parseFlag('--dimensions', 'query').split(',').filter(Boolean);
const startDate = parseFlag('--start', getDateRange(28).startDate);
const endDate = parseFlag('--end', getDateRange(28).endDate);

try {
  const { searchconsole } = createSearchConsoleClient();
  const result = await searchconsole.searchanalytics.query({
    siteUrl: GSC_SITE_URL,
    requestBody: { startDate, endDate, dimensions, rowLimit: 1000 },
  });
  const rows = result.data.rows || [];
  const totals = rows.reduce(
    (summary, row) => ({
      clicks: summary.clicks + (row.clicks || 0),
      impressions: summary.impressions + (row.impressions || 0),
    }),
    { clicks: 0, impressions: 0 },
  );
  console.log(JSON.stringify({ property: GSC_SITE_URL, startDate, endDate, dimensions, totals, rows }, null, 2));
} catch (error) {
  console.error(`GSC performance request failed: ${error instanceof Error ? error.message : 'unknown error'}`);
  process.exitCode = 1;
}
