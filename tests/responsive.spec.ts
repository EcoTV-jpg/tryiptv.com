import { test, expect, type Page, type APIRequestContext } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Responsive / cross-browser checks for every page in the sitemap.
 *
 * Desktop engines (chromium, webkit, firefox): every width in WIDTHS, asserting no horizontal
 * overflow and saving a viewport screenshot to test-results/screens/<project>/.
 * Touch projects (mobile-*, tablet-*): portrait + landscape, asserting no overflow, 44x44 tap
 * targets, >=16px body copy and form fields, plus menu/sheet behaviour by touch and keyboard.
 */

const WIDTHS = [320, 360, 375, 390, 414, 768, 1024, 1280, 1440, 1920, 2560];
const CHUNKS = 6; // split the sitemap so each project can run pages in parallel
const SCREENSHOTS = process.env.NO_SCREENSHOTS !== '1';

let routesCache: string[] | null = null;
async function getRoutes(request: APIRequestContext): Promise<string[]> {
  if (routesCache) return routesCache;
  const xml = await (await request.get('/sitemap.xml')).text();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  routesCache = [...new Set(locs)].sort();
  expect(routesCache.length).toBeGreaterThan(10);
  return routesCache;
}

const chunkOf = (routes: string[], i: number) => routes.filter((_, n) => n % CHUNKS === i);

async function gotoStable(page: Page, route: string) {
  await page.goto(route, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts?.ready);
}

async function overflow(page: Page) {
  return page.evaluate(() => {
    const vw = window.innerWidth;
    const sw = document.documentElement.scrollWidth;
    const culprits: string[] = [];
    if (sw > vw) {
      for (const el of document.body.querySelectorAll('*')) {
        const r = el.getBoundingClientRect();
        if (!r.width || r.right <= vw + 0.5) continue;
        let p = el.parentElement;
        let clipped = false;
        while (p && p !== document.body) {
          if (getComputedStyle(p).overflowX !== 'visible') { clipped = true; break; }
          p = p.parentElement;
        }
        if (!clipped) culprits.push(`<${el.tagName.toLowerCase()} class="${String(el.getAttribute('class')).slice(0, 80)}"> right=${Math.round(r.right)}`);
        if (culprits.length >= 3) break;
      }
    }
    return { vw, sw, culprits };
  });
}

/** Interactive elements smaller than 44x44 (inline links inside running text are exempt, per WCAG 2.5.5). */
async function smallTapTargets(page: Page) {
  return page.evaluate(() => {
    const MIN = 44;
    const out: string[] = [];
    const sel = 'a[href], button, [role="button"], input:not([type="hidden"]), select, textarea, summary';
    for (const el of document.querySelectorAll<HTMLElement>(sel)) {
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) continue;
      if (r.bottom < 0 || r.right < 0 || r.left > window.innerWidth) continue; // off-screen honeypots etc.
      if (el.closest('[aria-hidden="true"], .sr-only, [inert]')) continue;
      const cs = getComputedStyle(el);
      if (cs.visibility === 'hidden' || cs.opacity === '0') continue;
      // Inline link within a sentence: exempt.
      if (cs.display === 'inline') {
        const block = el.parentElement;
        const text = (block?.textContent ?? '').trim();
        if (text.length > (el.textContent ?? '').trim().length + 1) continue;
      }
      if (r.width + 0.5 < MIN || r.height + 0.5 < MIN) {
        const label = (el.getAttribute('aria-label') || el.textContent || el.tagName).trim().slice(0, 40);
        out.push(`${el.tagName.toLowerCase()} "${label}" ${Math.round(r.width)}x${Math.round(r.height)}`);
      }
    }
    return [...new Set(out)];
  });
}

/** Paragraph-length body copy (>=80 chars of own text) rendered below 16px. */
async function smallBodyText(page: Page) {
  return page.evaluate(() => {
    const out: string[] = [];
    for (const el of document.querySelectorAll<HTMLElement>('main p, main li, main dd')) {
      const own = [...el.childNodes].filter((n) => n.nodeType === Node.TEXT_NODE).map((n) => n.textContent).join('').trim();
      if (own.length < 80) continue;
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) continue;
      const cs = getComputedStyle(el);
      // Labels, captions and footnotes marked as small print are intentionally compact.
      if (cs.textTransform === 'uppercase' || el.closest('table, figcaption, small, [data-small-print], [aria-hidden="true"]')) continue;
      if (parseFloat(cs.fontSize) < 15.5) out.push(`${cs.fontSize} "${own.slice(0, 50)}…"`);
    }
    return out;
  });
}

const isTouchProject = (name: string) => name.startsWith('mobile') || name.startsWith('tablet');

test.describe('every page', () => {
  for (let chunk = 0; chunk < CHUNKS; chunk++) {
    test(`pages chunk ${chunk + 1}/${CHUNKS}`, async ({ page, request }, info) => {
      const routes = chunkOf(await getRoutes(request), chunk);
      const touch = isTouchProject(info.project.name);
      const base = page.viewportSize()!;
      // Desktop engines sweep every width; touch devices check portrait + landscape.
      const sizes = touch
        ? [base, { width: base.height, height: base.width }]
        : WIDTHS.map((w) => ({ width: w, height: w < 768 ? 800 : 900 }));

      for (const route of routes) {
        await page.setViewportSize(sizes[0]);
        await gotoStable(page, route);

        const meta = await page.getAttribute('meta[name="viewport"]', 'content');
        expect.soft(meta, `${route} viewport meta`).toMatch(/width=device-width/);
        expect.soft(meta, `${route} viewport meta`).toMatch(/initial-scale=1/);
        expect.soft(meta, `${route} viewport meta`).not.toMatch(/user-scalable=(no|0)|maximum-scale=1(\D|$)/);

        for (const size of sizes) {
          await page.setViewportSize(size);
          await page.waitForTimeout(100);
          const o = await overflow(page);
          expect.soft(o.sw, `${route} @${size.width}x${size.height} horizontal overflow ${o.culprits.join(' | ')}`).toBeLessThanOrEqual(o.vw);

          if (touch) {
            expect.soft(await smallTapTargets(page), `${route} @${size.width}x${size.height} tap targets < 44px`).toEqual([]);
            if (size.width < 640) {
              expect.soft(await smallBodyText(page), `${route} @${size.width} body text < 16px`).toEqual([]);
            }
          } else if (SCREENSHOTS) {
            const dir = path.join('test-results', 'screens', info.project.name, route === '/' ? 'home' : route.slice(1).replace(/\//g, '__'));
            fs.mkdirSync(dir, { recursive: true });
            await page.screenshot({ path: path.join(dir, `${size.width}.jpg`), type: 'jpeg', quality: 60 });
          }
        }
      }
    });
  }
});

test.describe('touch interactions', () => {
  test.beforeEach(({}, info) => test.skip(!isTouchProject(info.project.name), 'touch devices only'));

  test('mobile menu opens by tap, links and close button are reachable', async ({ page }, info) => {
    test.skip(info.project.name.startsWith('tablet'), 'tablet shows desktop nav at >=1024 landscape; covered by mobile');
    await gotoStable(page, '/');
    await page.getByRole('button', { name: 'Open navigation' }).tap();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('link', { name: 'Pricing' })).toBeVisible();
    const close = dialog.getByRole('button', { name: 'Close' });
    const box = (await close.boundingBox())!;
    expect(box.width).toBeGreaterThanOrEqual(44);
    expect(box.height).toBeGreaterThanOrEqual(44);
    await close.tap();
    await expect(dialog).toBeHidden();
  });

  test('contact sheet scrolls to submit in landscape and fields do not trigger iOS zoom', async ({ page }) => {
    const v = page.viewportSize()!;
    await page.setViewportSize({ width: Math.max(v.width, v.height), height: Math.min(v.width, v.height) });
    await gotoStable(page, '/');
    await page.getByRole('button', { name: 'Open contact form' }).tap();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    const submit = dialog.getByRole('button', { name: 'Send Message' });
    await submit.scrollIntoViewIfNeeded();
    await expect(submit).toBeInViewport();
    for (const field of await dialog.locator('input:not([tabindex="-1"]), textarea').all()) {
      const size = await field.evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
      expect(size, 'form field font-size (iOS zooms below 16px)').toBeGreaterThanOrEqual(16);
    }
  });

  test('floating contact button stays inside the viewport', async ({ page }) => {
    await gotoStable(page, '/');
    const box = (await page.getByRole('button', { name: 'Open contact form' }).boundingBox())!;
    const v = page.viewportSize()!;
    expect(box.x + box.width).toBeLessThanOrEqual(v.width);
    expect(box.y + box.height).toBeLessThanOrEqual(v.height);
  });
});

test.describe('keyboard', () => {
  test.beforeEach(({}, info) => test.skip(isTouchProject(info.project.name), 'desktop engines only'));

  test('mobile menu and contact sheet work by keyboard', async ({ page, browserName }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await gotoStable(page, '/');
    const trigger = page.getByRole('button', { name: 'Open navigation' });
    await trigger.focus();
    await page.keyboard.press('Enter');
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    // Focus moves into the sheet and Escape returns it to the trigger.
    expect(await dialog.evaluate((d) => d.contains(document.activeElement))).toBe(true);
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();

    const fab = page.getByRole('button', { name: 'Open contact form' });
    await fab.focus();
    await page.keyboard.press(browserName === 'webkit' ? 'Space' : 'Enter');
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toBeHidden();
  });

  test('focus is visible on interactive elements', async ({ page }) => {
    await gotoStable(page, '/');
    // Tab past the skip link into the page and confirm each stop draws an outline or ring.
    for (let i = 0; i < 6; i++) {
      await page.keyboard.press('Tab');
      const visible = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement | null;
        if (!el || el === document.body) return true;
        const cs = getComputedStyle(el);
        return (cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0) || cs.boxShadow !== 'none';
      });
      expect(visible, `tab stop ${i + 1} has a visible focus indicator`).toBe(true);
    }
  });
});
