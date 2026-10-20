import { defineConfig, devices } from '@playwright/test';

// Responsive / cross-browser suite. Runs against the production build:
//   npm run build && npm run test:responsive
// Set BASE_URL to test an already running server (e.g. staging) instead.
const PORT = 9010;
const baseURL = process.env.BASE_URL ?? `http://localhost:${PORT}`;

export default defineConfig({
  testDir: './tests',
  // Short default so a stuck test fails (and the run still prints its summary) instead of hanging;
  // the full-sitemap sweeps raise their own limit with test.setTimeout.
  timeout: 90_000,
  globalTimeout: 75 * 60_000,
  fullyParallel: true,
  workers: process.env.CI ? 2 : 4,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: { baseURL },
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: `npm run start -- -p ${PORT}`,
        url: baseURL,
        reuseExistingServer: true,
        timeout: 120_000,
      },
  projects: [
    // Desktop engines: every page at every width (viewport set inside the test).
    // Tagged tests are filtered per project so they are never scheduled where they don't apply.
    { name: 'chromium', use: { ...devices['Desktop Chrome'] }, grepInvert: /@touch/ },
    { name: 'webkit', use: { ...devices['Desktop Safari'] }, grepInvert: /@touch/ },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] }, grepInvert: /@touch/ },
    // Touch devices: tap targets, form zoom, menus, portrait + landscape.
    { name: 'mobile-safari', use: { ...devices['iPhone 13'] }, grepInvert: /@desktop/ },
    { name: 'mobile-chrome', use: { ...devices['Pixel 7'] }, grepInvert: /@desktop/ },
    { name: 'tablet-safari', use: { ...devices['iPad (gen 7)'] }, grepInvert: /@desktop|@phone/ },
  ],
});
