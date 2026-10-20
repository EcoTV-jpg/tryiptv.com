import { createSearchConsoleClient, GSC_SITE_URL, getCredentialIdentity } from './gsc-client.mjs';

try {
  const { searchconsole } = createSearchConsoleClient();
  const sites = await searchconsole.sites.list();
  const property = sites.data.siteEntry?.find((entry) => entry.siteUrl === GSC_SITE_URL);

  if (!property) {
    console.error(`Search Console access is missing for ${GSC_SITE_URL}.`);
    console.error(`Authenticated identity: ${getCredentialIdentity()}`);
    console.error('Add the configured service-account email as a property user, then run this test again.');
    process.exitCode = 1;
  } else {
    const result = await searchconsole.searchanalytics.query({
      siteUrl: GSC_SITE_URL,
      requestBody: {
        startDate: new Date(Date.now() - 8 * 86400000).toISOString().slice(0, 10),
        endDate: new Date(Date.now() - 2 * 86400000).toISOString().slice(0, 10),
        dimensions: ['query'],
        rowLimit: 10,
      },
    });
    console.log('GSC connection: OK');
    console.log(`Property: ${GSC_SITE_URL}`);
    console.log(`Rows returned: ${result.data.rows?.length || 0}`);
  }
} catch (error) {
  console.error(`GSC connection failed: ${error instanceof Error ? error.message : 'unknown error'}`);
  process.exitCode = 1;
}
