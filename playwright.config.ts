import { defineConfig, devices } from '@playwright/test';

// Responsive / cross-browser suite. Runs against the production build:
//   npm run build && npm run test:responsive
// Set BASE_URL to test an already running server (e.g. staging) instead.
const PORT = 9010;
const baseURL = process.env.BASE_URL ?? `http://localhost:${PORT}`;

export default defineConfig({
  testDir: './tests',
  timeout: 10 * 60_000,
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
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    // Touch devices: tap targets, form zoom, menus, portrait + landscape.
    { name: 'mobile-safari', use: { ...devices['iPhone 13'] } },
    { name: 'mobile-chrome', use: { ...devices['Pixel 7'] } },
    { name: 'tablet-safari', use: { ...devices['iPad (gen 7)'] } },
  ],
});
