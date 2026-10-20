// npm run gsc:access — verify credentials, property access and each read-only API capability.
// Prints a status table; never prints secrets. Exit code 1 when anything required is missing.
import { createClient, describeCredentialSource, SITE_URL, safeError, shiftDate, queryAllRows } from './lib.mjs';

const results = [];
const record = (check, ok, detail) => results.push({ check, status: ok ? 'OK' : 'MISSING', detail });

const source = describeCredentialSource();
record('Credentials configured', Boolean(source), source ? source.method : 'Set GSC_OAUTH_CREDENTIALS (recommended) or a service account (GSC_SERVICE_ACCOUNT_EMAIL + GSC_SERVICE_ACCOUNT_PRIVATE_KEY)');

let client = null;
if (source) {
  try {
    client = createClient();
  } catch (error) {
    record('Credentials valid', false, safeError(error).message);
  }
}

if (client) {
  const domainProperty = `sc-domain:${new URL(SITE_URL).hostname.replace(/^www\./, '')}`;
  let property = null;

  try {
    const sites = (await client.sites.list()).data.siteEntry || [];
    property = sites.find((site) => site.siteUrl === SITE_URL) || null;
    const domain = sites.find((site) => site.siteUrl === domainProperty) || null;
    record('Property visible (URL-prefix)', Boolean(property), property ? `${SITE_URL} — permission: ${property.permissionLevel}` : `${SITE_URL} not shared with ${source.identity || 'this identity'}`);
    record('Domain property', true, domain ? `${domainProperty} also visible — permission: ${domain.permissionLevel}` : `${domainProperty} not visible (optional)`);
    if (property?.permissionLevel === 'siteUnverifiedUser') record('Permission sufficient', false, 'siteUnverifiedUser cannot read data; grant Full or Restricted user');
  } catch (error) {
    record('List properties', false, safeError(error).message);
  }

  if (property) {
    const end = shiftDate(new Date().toISOString().slice(0, 10), -3);
    try {
      const rows = await queryAllRows(client, { startDate: shiftDate(end, -6), endDate: end, dimensions: ['query'] }, { maxRows: 25000 });
      record('Search Analytics', true, `${rows.length} query rows for ${shiftDate(end, -6)} → ${end}`);
    } catch (error) {
      record('Search Analytics', false, safeError(error).message);
    }
    try {
      const inspection = await client.urlInspection.index.inspect({ requestBody: { inspectionUrl: SITE_URL, siteUrl: SITE_URL } });
      const status = inspection.data.inspectionResult?.indexStatusResult;
      record('URL Inspection', true, `${SITE_URL}: verdict ${status?.verdict ?? 'n/a'}, coverage "${status?.coverageState ?? 'n/a'}"`);
    } catch (error) {
      record('URL Inspection', false, safeError(error).message);
    }
    try {
      const sitemaps = (await client.sitemaps.list({ siteUrl: SITE_URL })).data.sitemap || [];
      record('Sitemaps (read)', true, sitemaps.length ? sitemaps.map((s) => s.path).join(', ') : 'no sitemaps submitted');
    } catch (error) {
      record('Sitemaps (read)', false, safeError(error).message);
    }
  }
}

console.table(results);
if (results.some((r) => r.status === 'MISSING' && r.check !== 'Domain property')) process.exitCode = 1;
