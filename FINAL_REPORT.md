# FINAL_REPORT: tryiptv.com design QA

Branch `design-audit` (HEAD `a9792b0`, plus this report). Baseline is `f916246`, the untouched original from the zip. `main` was never pushed or changed.

The rules for this work were:
- DESIGN_LOCK.md is non-negotiable.
- Only owner-approved text, meta, URL, schema or SEO changes.
- One commit per batch.
- Regressions get fixed first, preferring a revert.

The diff from the original covers 119 files (+2,056 / −615), counting docs, tests and audit evidence.

## 1. Results at a glance

| Check | Result |
|---|---|
| Lighthouse mobile performance (13 pages, median of 3, GA blocked in both builds) | **77.2 → 93.5** mean. Every page improved. |
| LCP / TBT | LCP 3.4–4.4 s → 2.9–3.2 s. TBT 358–629 ms → 91–165 ms. |
| CLS | 0 → 0 on every page |
| Accessibility / Best Practices / SEO | 96–100 / 96 / 100 → **100 / 100 / 100** on all 13 pages |
| Playwright responsive suite | **50 passed, 0 failed** (6 projects; see §4) |
| Pixel diff vs original | 1,518 screenshot pairs. 172 identical. **0 differences without a cause from an approved change.** |
| Computed-style diff (375 / 768 / 1280) | **0 unexplained style changes**. Every change maps to a finding or decision ID. |
| Content integrity | Titles, canonicals, JSON-LD, hrefs, headings and DOM text are identical to the original. Meta differs only in the approved `viewport-fit=cover` and `theme-color #040506`. |
| Vercel | Preview only: https://try-iptv-git-design-audit-anouarai.vercel.app. Nothing was promoted, and no project settings or domains were touched. |

## 2. Before/after scores

All runs were Lighthouse mobile on the quiet machine.
- Original build: `:9004`. Current build: `:9003`.
- Google Analytics was blocked in **both** builds so first-party code is compared like for like. In earlier runs GA often failed to load in the current build, which flattered it.
- Each figure is the median of 3 runs. Raw JSON is in the session scratchpad (`lhf/`).
- The current build measured is `technical-seo` HEAD `fc07c0b`. That is this branch plus an IndexNow script and an Article `image` field, neither of which affects page weight.

| Page | Perf | LCP (s) | TBT (ms) | CLS | A11y | BP | SEO |
|---|---|---|---|---|---|---|---|
| / | 65 → 93 | 4.4 → 3.2 | 593 → 109 | 0 → 0 | 100 → 100 | 96 → 100 | 100 → 100 |
| /pricing | 81 → 94 | 3.5 → 3.0 | 406 → 93 | 0 → 0 | 100 → 100 | 96 → 100 | 100 → 100 |
| /iptv-free-trial | 80 → 94 | 3.5 → 3.0 | 448 → 91 | 0 → 0 | 100 → 100 | 96 → 100 | 100 → 100 |
| /contact-us | 82 → 94 | 3.5 → 2.9 | 358 → 125 | 0 → 0 | 100 → 100 | 96 → 100 | 100 → 100 |
| /faq | 77 → 93 | 3.7 → 3.0 | 489 → 122 | 0 → 0 | 100 → 100 | 96 → 100 | 100 → 100 |
| /setup | 78 → 93 | 3.6 → 2.9 | 478 → 165 | 0 → 0 | 100 → 100 | 96 → 100 | 100 → 100 |
| /players | 78 → 94 | 3.7 → 3.0 | 458 → 104 | 0 → 0 | 100 → 100 | 96 → 100 | 100 → 100 |
| /guides | 81 → 93 | 3.4 → 3.1 | 407 → 119 | 0 → 0 | 100 → 100 | 96 → 100 | 100 → 100 |
| /guides/what-is-m3u | 72 → 93 | 3.8 → 3.0 | 629 → 152 | 0 → 0 | 100 → 100 | 96 → 100 | 100 → 100 |
| /help/m3u-not-loading | 75 → 94 | 3.7 → 2.9 | 561 → 133 | 0 → 0 | 96 → 100 | 96 → 100 | 100 → 100 |
| /devices | 81 → 94 | 3.4 → 2.9 | 417 → 107 | 0 → 0 | 100 → 100 | 96 → 100 | 100 → 100 |
| /devices/android-tv-iptv | 78 → 92 | 3.7 → 3.0 | 440 → 151 | 0 → 0 | 100 → 100 | 96 → 100 | 100 → 100 |
| /about | 75 → 94 | 4.0 → 3.0 | 469 → 113 | 0 → 0 | 100 → 100 | 96 → 100 | 100 → 100 |
| **Mean perf** | **77.2 → 93.5** | | | | | | |

**What moved the numbers**
- **Sentry** used to be evaluated before hydration on every page, about 1.3 s of main-thread work on a mid-range phone.
  - It now loads through a named re-export module (P-02), which cut the chunk from 546 KB to 231 KB raw.
  - It starts on first interaction, on scroll after load, or 10 s after load (`7f75036`).
  - Errors raised before it starts are buffered and replayed.
- **Contact sheet, form and Toaster** are code-split, so they load only when used (P-08).
- **The hero image** is the largest element and now loads first (P-07).

**With GA running**, gtag.js is the largest remaining TBT item. Deferring GA further is an open decision for you (§6).

## 3. Every change (file → reason)

**IDs used below**
- R- = regression from my earlier pass, fixed first.
- P- = pre-existing finding from AUDIT_REPORT.md.
- V- = issue found by the 5 agents in verify mode.
- Pass 1 = the pre-audit edits (`a905c28`). They went through the same audit; whatever survived was approved or corrected through R-items.
- Owner decisions:
  - 16px mobile body text: approved.
  - Link style option A: approved.
  - `data-label` tables: approved.
  - `viewportFit` cover: approved.
  - CSP removal: approved.
  - P-14: approved.
  - P-25: theme-color set to the page background.
  - Footer two-column layout: approved.

| File | Change and reason |
|---|---|
| `src/app/globals.css` | <ul><li>Pass 1: overflow guards, `.tap-target` (44px touch hit area with a cancelling margin), `.min-h-viewport`.</li><li>R-02/R-08: touch padding is dropped on focus.</li><li>R-11/V1-003: option A link style (40% underline), including `.prose`.</li><li>P-04: `scroll-padding-top: 5.5rem`, plus a zero-specificity `scroll-margin` so `#anchor` jumps land on the original pixel.</li><li>P-20/V3-002: reduced motion for `[data-state]` animations.</li><li>V4-003: new-tab announcement via visually hidden generated content.</li><li>P-14: `data-label` cell labels.</li></ul> |
| `src/app/layout.tsx` | <ul><li>`viewport-fit=cover` (approved).</li><li>P-25: `theme-color #040506`.</li><li>P-08: `LazyToaster`.</li><li>Analytics loading order (approved: Sentry/GA loading changes).</li></ul> |
| `src/instrumentation-client.ts`, `src/lib/sentry-client.ts`, `src/app/global-error.tsx` | <ul><li>P-02: a named re-export keeps the lazy chunk small.</li><li>`7f75036`: starts on interaction or 10 s after load.</li><li>V3-004: scroll counts only after load.</li><li>V5-001: errors before init are buffered, not dropped.</li><li>R-12: Safari fallback timing and a comment fix.</li></ul> |
| `src/components/shared/Analytics.tsx`, `Turnstile.tsx` | Pass 1, approved: GA init `afterInteractive` and gtag `lazyOnload`. Turnstile loads only on form pages. |
| `next.config.js` | <ul><li>Pass 1: CSP header removed (approved; it was Report-Only with nowhere to report).</li><li>P-37: 480 added to `deviceSizes`.</li></ul> |
| `src/components/sections/Hero.tsx` | <ul><li>P-07: hero image `loading="eager"` + `fetchPriority="high"`, following the Next 16 docs.</li><li>R-01: headings back on the locked size steps.</li></ul> |
| `src/components/shared/ContactForm.tsx`, `ContactSheet.tsx`, `ContactSheetForm.tsx` (new), `src/components/ui/lazy-toaster.tsx` (new), `src/components/ui/toast.tsx` | <ul><li>P-01: error text `red-400` (~6.9:1, was 2.0:1).</li><li>P-06: success and error messages are live regions.</li><li>P-08: the sheet form body is code-split.</li><li>P-23: honeypot renamed `hp_ref` so autofill never fills it. **The server action reads `hp_ref` (`src/app/actions.ts:13`).**</li><li>P-28: `aria-required`.</li><li>P-30: toast close button visible on touch.</li></ul> |
| `src/app/actions.ts` | P-23: reads the renamed honeypot field. No other logic changed. |
| `src/components/shared/Footer.tsx` | <ul><li>R-09: link size back to 13.5px.</li><li>`924c4d4`: two link columns on touch phones below 640px, approved. Touch footer is 1,329px vs 1,344px in the original (it was 1,856px after pass 1).</li><li>`d2e345b`: social icons 44px on touch only.</li><li>P-31: new-tab announcement.</li></ul> |
| `src/components/shared/Logo.tsx` | <ul><li>P-34: eager load.</li><li>`d2e345b`: 44px min height on touch only, so the desktop footer is pixel-identical.</li></ul> |
| `src/components/shared/Navbar.tsx`, `MobileNav.tsx` | <ul><li>`c52c268`: nav links reach 44px on touch tablets with the same visual gap.</li><li>P-03: menu dialog title and labelled `<nav>`.</li></ul> |
| `src/components/shared/Breadcrumb.tsx` | <ul><li>R-05/V1-002: invisible touch hit area. Wrapped trails sit on the original pixels.</li><li>P-29: separators `aria-hidden`.</li></ul> |
| `src/components/shared/Container.tsx`, `Section.tsx`, `SectionHeader.tsx` | <ul><li>R-03: safe-area padding moved from `body` to `Container` so backgrounds stay full-bleed.</li><li>R-01: stepped heading sizes.</li><li>R-07: 16px subtitles.</li></ul> |
| `src/components/shared/InternalLinks.tsx`, `src/components/guide/GuideToc.tsx` | <ul><li>R-04 family / P-19: titles wrap instead of being cut off.</li><li>V2-002: clamp at 3 lines.</li></ul> |
| `src/components/ui/button.tsx` | P-32: the focus outline no longer animates. Explicit transition list. |
| `src/components/ui/sheet.tsx`, `accordion.tsx` | <ul><li>R-10: close icon position and radius restored.</li><li>P-20/V3-002: reduced motion.</li></ul> |
| `src/components/ui/input.tsx`, `textarea.tsx` | Pass 1: 16px on mobile so iOS doesn't zoom on focus. |
| `src/components/guide/*` (ArticleCodeBlock, ArticleSummary, ArticleTermCard, GuideBufferingChecklist, GuideCallout, GuideCta, GuideQuickInfo, GuideRequirements, GuideScreenshot, GuideStepList, GuideTroubleshooting) | <ul><li>Pass 1 / R-06 / R-07: 16px body on mobile; card titles never smaller than their body.</li><li>P-05/V4-001: scrollable code blocks are focusable regions.</li><li>P-26: CTA may wrap below 360px.</li><li>P-15: screenshot `sizes`.</li><li>`fa29133`: original desktop title line-height.</li><li>V2-001: quick-info cells `justify-start`.</li><li>P-10/V1-001: one h2 weight.</li></ul> |
| `src/components/sections/*` (CTA, Comparison, FAQ, HomePricing, HowItWorks, Pricing, WhyChooseTryIPTV), `src/components/players/PlayerQuickAnswer.tsx`, `src/components/shared/FeatureCard.tsx` | <ul><li>Pass 1 / R-07: 16px mobile body.</li><li>R-01: Comparison/Pricing (unused) restored to the original.</li><li>`c52c268`: homepage pricing link target.</li><li>V4-002: FAQ answer links get option A from the container. Data and schema untouched.</li><li>`/faq` answers at 16px.</li></ul> |
| `src/app/**/page.tsx` (about, contact-us, devices, `devices/[device]`, disclaimer, dmca-report, guides/*, help/*, iptv-free-trial, players/*, pricing, privacy-policy, refund-policy, setup, terms-conditions, thank-you) | <ul><li>Pass 1 / R-07 / V1-004: 16px body on mobile.</li><li>R-02: 44px touch rows for stacked links, with mouse layouts identical to the original.</li><li>R-04: `/devices` descriptions unclamped below 640px.</li><li>P-05: focusable scroll tables.</li><li>P-10/V1-001: h2 weight.</li><li>P-11: `tracking-wider`.</li><li>P-12: hub card radius.</li><li>P-14 and the what-is-iptv `data-label` tables: mobile labels via CSS only, so the HTML text is unchanged.</li><li>P-31: new-tab links.</li><li>V1-003: link underline consistency.</li><li>V3-001 (`a9792b0`): free-trial cards are exactly 75px on mouse and touch.</li></ul> **No visible text, titles, meta, URLs or schema changed.** |
| `tests/responsive.spec.ts`, `playwright.config.ts`, `package.json`, `package-lock.json`, `.claude/launch.json`, `.gitignore` | Responsive suite (§4).<ul><li>`31a5434`: per-project tags and bounded timeouts, which fixed the hanging tablet run.</li><li>`58fe5c3`: the in-text link exemption checks the nearest block.</li><li>`@playwright/test` and `browserslist` added.</li></ul> |
| `DESIGN_LOCK.md` | <ul><li>Created from the original source (`4da9899`).</li><li>§13 "Owner-approved additions" lists each addition with the decision or finding that approved it (`e65e0a9`, V1-005).</li><li>P-13: purple/cyan recorded.</li></ul> |
| `AUDIT_REPORT.md`, `audit/evidence/*` | The 5-agent audit, with screenshots, including `footer-375-touch-{orig,cur,proposal}.png` and `R01-*`. |

## 4. Test matrix (page × browser × width)

**Playwright** (`npm run test:responsive`) takes every URL in the sitemap: all 46 indexable pages, including `/`.

| Project | Engine / device | Widths | What is asserted |
|---|---|---|---|
| chromium | Desktop Chrome | 320, 360, 375, 390, 414, 768, 1024, 1280, 1440, 1920, 2560 | <ul><li>no horizontal overflow (culprit reported)</li><li>viewport meta</li><li>body text ≥ 16px on mobile (small print exempt)</li><li>touch targets ≥ 44px or a WCAG 2.5.8 exemption</li><li>keyboard: menu and contact sheet</li><li>visible focus</li></ul> |
| webkit | Desktop Safari | same 11 widths | same |
| firefox | Desktop Firefox | same 11 widths | same |
| mobile-safari | iPhone 13 (touch) | 390×844 portrait + landscape | <ul><li>overflow, 16px text, 44px targets</li><li>mobile menu by tap</li><li>contact sheet scrolls to submit in landscape with no iOS zoom</li><li>floating button stays inside the viewport</li></ul> |
| mobile-chrome | Pixel 7 (touch) | 412×915 portrait + landscape | same as mobile-safari |
| tablet-safari | iPad gen 7 (touch) | 810×1080 portrait + landscape | touch tests except `@phone` |

**Result: 50 passed, 0 failed.**

**Visual and content checks**

| Check | Pages | Browsers | Widths | Result |
|---|---|---|---|---|
| Before/after screenshots + pixel diff | 46 (incl. `/`) | chromium, webkit, firefox | 320, 360, 375, 390, 414, 768, 1024, 1280, 1440, 1920, 2560 (= 1,518 pairs) | 1,518 pairs, 172 identical. Every non-identical pair is attributed to an approved change (`attribution.json`: `pixelDiffsWithoutVisibleCause: []`). |
| Computed-style diff | 46 | chromium | 375, 768, 1280 | `unexplainedStyleChanges: []` |
| Touch-only layouts (footer, logo, breadcrumb, cards) | affected pages | chromium with pointer-coarse emulation | 320, 375 | Clipped screenshots: footer original / current / proposal in `audit/evidence/footer-375-touch-*`. |
| Content integrity (titles, meta, canonicals, JSON-LD, hrefs, headings, DOM text) | 46 | chromium | 375, 1280 | Identical, except approved meta (`viewport-fit`, `theme-color`) and approved CSS-only labels |
| Lighthouse mobile | 13 | Chrome (headless) | Moto G-class emulation | §2 |

**Verify mode.** The 5 agents (A1 design system, A2 responsive, A3 cross-browser, A4 accessibility, A5 performance) re-ran against the fixed build and found V1-001…V5-001. All of them were fixed in `f795f55`, `76e5e78`, `daef639`, `5ff0573` and `a9792b0`, and re-checked with the diffs and suite above. The agents were not launched a third time after those fixes.

## 5. Not fixed (honest list)

| ID | Item | Why not |
|---|---|---|
| P-09 | Browser autofill may turn the dark inputs light | **UNVERIFIED.** Playwright can't trigger autofill. Check on a real phone. |
| P-24 | Turnstile `theme:'auto'` may show a white widget on a light-mode OS | **UNVERIFIED.** No site key locally. Check on the preview. |
| P-36 | Turnstile timing after moving to `afterInteractive` | UNVERIFIED, same reason |
| P-22 | CSP Report-Only had no reporting endpoint | **Deferred** by you. The header was removed (approved). |
| P-16 | TiviMate screenshots slightly under-resolved in phone landscape | Report only. Raising the `deviceSizes` cap costs bandwidth. |
| P-17 | Floating contact button covers a chevron on some pages at 360–414 | Report only. Moving it changes a site-wide pattern. |
| P-18 | Orphan item in the last grid row below 640px | Report only; a layout pattern |
| P-21 | Contact sheet close animation never plays (`{isOpen && …}`) | Report only. Fixing it changes how the sheet mounts and keeps state. |
| P-33 | 404 page heading jumps h1 → h3 (footer h3s) | Report only. Changing footer headings affects every page. |
| P-27 | At 280px, `/` is 297px wide | Info. Below the target range; the original forced 320px. |
| P-35 | gtag still runs in Lighthouse's interactivity window | **Open decision:** defer GA further (for example, on first interaction). |
| — | Real iOS/iPadOS Safari, Samsung Internet, screen readers | Not available here. Emulation only. |
| — | Real contact-form submission on the preview | You sent a test message. The Vercel runtime logs are not readable from here (403), so I **can't confirm** delivery. The honeypot rename is handled server-side (`actions.ts:13`). Please confirm whether the email arrived. |
| — | Lighthouse with GA running | Not comparable run to run (GA load is unreliable on the original build). §2 is the fair comparison. |

## 6. Recommended follow-up (not fixed)

**Focus moves to `<body>` after the contact form is submitted.** This is pre-existing and present in the original.

- **What happens:** after a successful submit, the form re-renders and the focused submit button is removed, so keyboard and screen-reader focus falls back to `<body>`. The success message is announced (P-06 made it a live region), but the user loses their place.
- **In the sheet:** the sheet also closes, and focus should return to the floating trigger button.
- **Suggested fix:**
  - Move focus to the success message (`tabIndex={-1}` + `ref.focus()`) on `/contact-us`.
  - For the sheet, rely on Radix returning focus to the trigger, and check that the trigger still exists after close.
- **Not done,** per your instruction.

**Other open decisions**
- GA deferral (P-35).
- CSP reporting endpoint, if you want CSP back (P-22).

## 7. Push `design-audit` for a Vercel Preview (main stays untouched)

`design-audit` is already on GitHub, and Vercel builds a Preview for every push to it. Do not merge it, and do not push `main`.

To publish this report (or any later commit) to the same Preview:

```bash
cd /Users/anouar/Downloads/try-iptv-claude-tender-lovelace-3aobpk
```

```bash
git checkout design-audit
```

```bash
git push -u origin design-audit
```

Then open the branch Preview: https://try-iptv-git-design-audit-anouarai.vercel.app (Vercel → project try-iptv → Deployments, filtered to branch `design-audit`).

Optional manual Preview with the CLI. **Never add `--prod`, and never promote:**

```bash
vercel deploy
```

Before testing on your phone, check you're on the Preview: the URL contains `-git-design-audit-`, not `tryiptv.com`. Turnstile only works on the hostname you added in Cloudflare.
