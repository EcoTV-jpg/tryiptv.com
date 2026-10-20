# DESIGN_LOCK — tryiptv.com (Next.js 16 + Tailwind v4)

Extracted from the **original, unmodified** source snapshot (not the in-progress working copy).
Citations are `path:line` relative to the repo root. Counts = occurrences across `src/**/*.{ts,tsx,css}`,
excluding the dead code listed in §0. Counts include `src/components/ui/*` (shadcn library files), several of
which are not imported by live code (see §0). "rare" = exactly one occurrence.

## 0. Scope / not part of the live design

| Excluded (dead / unused) | Why |
|---|---|
| `src/components/velora/*` (blur-fade, border-beam, globe, grid-pattern, marquee, number-ticker, spotlight-card, text-highlighter, text-hover-effect, tweet-card) | Unused |
| `shared/ClientCarousel.tsx`, `shared/ContentCarousel.tsx`, `sections/SportEvents.tsx`, `sections/WeeklyBuzz.tsx`, `sections/Brands.tsx`, `shared/ThemeToggle.tsx` | Unused |
| `shared/Reveal.tsx` | Defined, no `<Reveal` usage found (0 importers) |
| `ui/*` with no live importer: alert-dialog, alert, animated-underline-text-one, avatar, **badge**, calendar, carousel, chart, checkbox, collapsible, dialog, dropdown-menu, form, glowing-effect, menubar, popover, progress, radio-group, scroll-area, select, separator, sidebar, skeleton, slider, switch, table, tabs, tooltip | Library files present but not imported outside `ui/` |
| `.surface-panel`, `.premium-surface` (globals.css:88, :254) | Defined but **0 usages** in TSX |
| `--sidebar-*` colors (tailwind.config.ts:66-75) | Referenced in config, **never defined** in globals.css |
| `@keyframes scroll` / `animate-scroll` (globals.css:262, tailwind.config.ts:99) | No live usage |
| `src/app/api/og/route.tsx` colors (#00FF7F, #00BFFF, #A0A0A0, #000) | OG image generator, not page UI |

## 1. Colors

Theme is **dark-only**: `<html className="dark …">` (layout.tsx:129), `forcedTheme="dark"` (layout.tsx:157).

### 1a. CSS custom properties (globals.css:5-30)

| Var | HSL | Hex (computed) | Utility usage (count, cite) |
|---|---|---|---|
| --background | 150 20% 2% | #040605 | bg-background 14 (globals.css:42) |
| --foreground | 150 11% 96% | #f4f6f5 | text-foreground 487 (not-found.tsx:25) |
| --card | 150 13% 4% | #090c0a | bg-card 26 (globals.css:89) |
| --card-foreground | 150 11% 96% | #f4f6f5 | text-card-foreground 2 (ui/card.tsx:12) |
| --popover | 150 12% 6% | #0d110f | bg-popover 7 (ui/popover.tsx:22) |
| --primary | 150 100% 47% | #00f078 | text-primary 298 (not-found.tsx:22); bg-primary 11 (setup/page.tsx:857) |
| --primary-foreground | 0 0% 0% | #000000 | text-primary-foreground 2 (ui/calendar.tsx:46) |
| --secondary | 150 10% 7% | #101412 | bg-secondary 3 (ui/slider.tsx:20) |
| --muted | 150 8% 8% | #131614 | bg-muted 6 (ui/tabs.tsx:17) |
| --muted-foreground | 150 3% 68% | #abb0ad | text-muted-foreground 388 (not-found.tsx:28) |
| --accent | 150 100% 56% | #1fff8f | prose a:hover (globals.css:231); focus:bg-accent 10 (ui/menubar.tsx:61) |
| --accent-foreground | 150 20% 2% | #040605 | focus:text-accent-foreground 9 |
| --destructive | 0 62.8% 30.6% | #7f1d1d | text-destructive 10 (ui/alert.tsx:13); bg-destructive 3 |
| --destructive-foreground | 0 0% 98% | #fafafa | 3 (ui/badge.tsx:16) |
| --border / --input | 150 8% 18% | #2a322e | `* { @apply border-border }` (globals.css:39) |
| --ring | 150 100% 47% | #00f078 | focus-visible:ring-ring 6 |
| --chart-1…5 | 12 76% 61% / 173 58% 39% / 197 37% 24% / 43 74% 66% / 27 87% 67% | #e76e50 / #2a9d90 / #274754 / #e8c468 / #f4a462 | only ui/chart.tsx (unused) |
| --radius | 0.375rem | — | see §4 |

### 1b. Brand / primary (literal + opacity variants)

| Token | Count | Cite |
|---|---|---|
| `#00f078` (focus outline) | 1 rare | globals.css:56 |
| `rgb(0 240 120 / 0.055)` body radial wash | 1 rare | globals.css:45 |
| `rgb(0 240 120 / 0.25)` ::selection | 1 rare | globals.css:52 |
| hover:bg-[#00d66c] (primary button hover) | 1 rare | ui/button.tsx:13 |
| border-primary/20 | 27 | thank-you/page.tsx:111 |
| border-primary/25 | 21 | thank-you/page.tsx:59 |
| border-primary/30 | 10 | setup/page.tsx:566 |
| border-primary/40 · hover:border-primary/40 | 3 · 16 | pricing/page.tsx:195 · players/page.tsx:294 |
| hover:border-primary/60 · border-primary/15 | 2 · 2 | sections/Pricing.tsx:46 · devices/[device]/page.tsx:731 |
| bg-primary/[0.08] | 20 | thank-you/page.tsx:59 |
| bg-primary/[0.06] · bg-primary/10 | 10 · 9 | thank-you/page.tsx:111 · players/page.tsx:43 |
| bg-primary/[0.04] · bg-primary/[0.03] | 5 · 3 | setup/page.tsx:345 · players/page.tsx:438 |
| bg-primary/[0.07], [0.045], [0.05], [0.02], [0.015], hover:bg-primary/[0.14], group-hover:bg-primary/[0.12] | 1 each rare | Logo.tsx:7, Comparison.tsx:23, devices/[device]:722, GuideComparisonTable.tsx:56/81, Navbar.tsx:40, Logo.tsx:7 |
| text-primary/90 · text-primary/80 | 7 · 1 rare | guides/iptv-vs-cable:279 · GuideQuickInfo.tsx:35 |
| hover:text-primary · group-hover:text-primary | 19 · 13 | players/page.tsx:252 · setup/page.tsx:791 |
| bg-gradient-to-l from-primary/10 via-primary/[0.02] to-transparent | 1 rare | sections/Hero.tsx:21 |
| bg-[linear-gradient(135deg,rgba(0,240,120,0.06),transparent_60%)] | 1 rare | sections/CTA.tsx:39 |
| bg-[linear-gradient(180deg,rgba(0,240,120,0.05),rgba(7,8,10,0)_42%),#07080a] | 2 | pricing/page.tsx:195 |

### 1c. Surfaces / backgrounds

| Token | Count | Cite |
|---|---|---|
| body `#040506` (+ radial wash) | 1 | globals.css:46 |
| bg-[#07080a] (primary surface) | 86 | globals.css:255 |
| hover:bg-[#07080a] | 3 | guides/page.tsx:167 |
| bg-[#070908] | 13 | setup/page.tsx:436 |
| bg-[#0c100d] | 10 | setup/page.tsx:320 |
| bg-[#070a08] | 9 | thank-you/page.tsx:152 |
| bg-[#0b100d] | 8 | setup/page.tsx:856 |
| bg-[#101512] (input bg) | 5 | thank-you/page.tsx:142; ui/input.tsx:11 |
| hover:bg-[#090b0d] | 3 | sections/DeviceIcon.tsx:50 |
| bg-[#050706] · bg-[#101411] | 2 · 2 | pricing/page.tsx:177 · setup/page.tsx:579 |
| bg-[#040506] footer | 1 rare | shared/Footer.tsx:91 |
| bg-[#050606]/80 navbar | 1 rare | shared/Navbar.tsx:26 |
| bg-[#07080a]/70, bg-[#050706]/80 | 1 each rare | Comparison.tsx:23, :56 |
| bg-[#0b0e0c], bg-[#0a0d0b] | 1 each rare | setup/page.tsx:516, CustomerFeedback.tsx:67 |
| bg-card/60 · bg-card/80 · hover:bg-card/80 | 11 · 1 · 2 | setup/page.tsx:358, :566, :461 |
| bg-white/[0.02] · [0.03] · [0.05] · [0.04] · [0.08] · [0.01] | 38 · 17 · 3 · 2 · 2 · 3 | players/page.tsx:234, :237; perfect-player:92; devices/[device]:930; GuideStepList:55; players:333 |
| bg-white/[0.025], [0.035], [0.07] | 1 each rare | FAQ.tsx:165, DeviceIcon.tsx:56, Hero.tsx:78 |
| hover:bg-white/[0.02] · [0.03] · [0.04] · [0.08] | 8 · 7 · 2 · 3 | players/page.tsx:248, :389, :294; m3u-vs-xtream:372 |
| bg-black/20 · /40 · /80 · hover:bg-black/60 | 9 · 5 · 3 · 3 | m3u-vs-xtream:387 · setup:785 · ui/alert-dialog:21 · setup:785 |
| grid backdrop bg-[linear-gradient(rgba(255,255,255,0.025)_1px,…)] + bg-[size:48px_48px] | 15 | not-found.tsx:19 |
| viewport themeColor dark `#0a0a0a`, light `#ffffff` | 1 each | layout.tsx:21, :20 |

### 1d. Borders

| Token | Count | Cite |
|---|---|---|
| border-white/[0.08] | 194 | globals.css:89 |
| border-white/[0.07] | 76 | dmca-report/page.tsx:31 |
| border-white/[0.06] | 53 | players/page.tsx:315 |
| border-white/[0.09] | 22 | thank-you/page.tsx:101 |
| border-white/[0.14] · hover:border-white/[0.14] | 4 · 29 | m3u-vs-xtream:372 · what-is-epg:224 |
| border-white/[0.12] · [0.1] · [0.05] | 2 · 4 · 2 | ui/textarea.tsx:10 · devices/[device]:930 · Comparison.tsx:78 |
| hover:border-white/[0.16] · [0.15] · [0.12] · hover:border-white/25 | 2 · 2 · 1 · 1 | DeviceIcon.tsx:50 · setup:664 · GuideRequirements:66 · ui/button.tsx:17 |
| divide-white/[0.06] · [0.08] · [0.07] · md:divide-white/[0.09] | 18 · 3 · 1 · 1 | players/page.tsx:246 · perfect-player:92 · Comparison.tsx:70 · thank-you:101 |
| prose inline code / hr `rgba(255,255,255,0.08)` | 2 | globals.css:186, :247 |
| text-white/20 (breadcrumb separator) | 1 rare | shared/Breadcrumb.tsx:33 |

### 1e. Text

| Token | Count | Cite |
|---|---|---|
| text-foreground | 487 | not-found.tsx:25 |
| text-muted-foreground | 388 | not-found.tsx:28 |
| text-primary | 298 | not-found.tsx:22 |
| text-foreground/90 · /80 · /85 · /95 · /50 | 23 · 4 · 1 · 1 · 1 | setup:423 · Footer.tsx:122 · Comparison.tsx:63 · :32 · ui/toast.tsx:80 |
| text-muted-foreground/80 · /90 · /60 · /70 · /85 · /45 · /75 · /95 | 4 · 4 · 3 · 2 · 2 · 1 · 1 · 1 | pricing:206 · Comparison.tsx:32 · :30 · GuideComparisonTable:89 · Comparison.tsx:91 · :26 · GuideRequirements:76 · FAQ.tsx:216 |
| text-black (primary button) | 1 rare | ui/button.tsx:13 |
| ::selection color `#f5f7f6` | 1 rare | globals.css:53 |

### 1f. Status / semantic accents (Tailwind palette, used in help/players/guide callouts)

| Hue | Tokens (count) | Cite |
|---|---|---|
| amber | text-amber-400 18; border-amber-400/20 4; bg-amber-400/10 3; text-amber-400/90 2; bg-amber-500/[0.04] 2; border-amber-500/30 2; bg-amber-400/[0.08], border-amber-500/25, bg-amber-500/[0.08] 1 each | players/page.tsx:91; GuideCallout.tsx:36 |
| emerald | text-emerald-400 8; border/bg-emerald-400/20,/10 3 each; border-emerald-500/30 2; bg-emerald-500/[0.04],[0.08] 1 each | players/page.tsx:79; GuideCallout.tsx:44 |
| rose | text-rose-400 6; border-rose-400/20 2; bg-rose-400/10 2; hover:border-rose-400/40 1 | players/xciptv:105; help/page.tsx:60 |
| blue / sky | text-blue-400 5; border-blue-400/20 3; bg-blue-400/10 3; text-sky-400 4; border-sky-400/20 2; bg-sky-400/10, bg-sky-400/[0.08] 1 each | players/page.tsx:55; help/m3u-not-loading:182 |
| red | border-red-500/25, bg-red-500/[0.04], text-red-400 — 1 each rare | help/iptv-not-working:533-535 |
| zinc | text-zinc-400, border-zinc-400/20, bg-zinc-400/10 — 1 each rare | players/page.tsx:115 |
| destructive | border-destructive/20, bg-destructive/10 (ContactForm error) | shared/ContactForm.tsx:55 |
| purple | text-purple-400 4; border-purple-400/20 2; bg-purple-400/10 2 (added in audit P-13; present in the original) | players/page.tsx:67; help/iptv-buffering:233 |
| cyan | text-cyan-400 2; border-cyan-400/20 2; bg-cyan-400/10 2 (added in audit P-13; present in the original) | players/page.tsx:103; help/m3u-not-loading:193 |

### 1g. Shadows / glows (colors) — see §5.

## 2. Typography

| Item | Value | Cite / count |
|---|---|---|
| Families (config) | `body` & `headline`: Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif; `code`: monospace | tailwind.config.ts:20-24 |
| Loading | **No webfont is loaded** (no next/font, @font-face, or Google Fonts link in src). Inter renders only if installed locally; otherwise system stack. CSP `font-src 'self' data:` | next.config.js:78 |
| Applied | `font-body antialiased` on `<html>` (1, layout.tsx:129); `font-headline` 224 (not-found.tsx:22); `font-mono` 68 (players/page.tsx:184) |
| Body rendering | letter-spacing 0, kern+liga, optimizeLegibility; h1-h4 `text-wrap: balance`; p `text-wrap: pretty` | globals.css:47-65 |

**Font sizes in use** (count, first cite):

| Named | Count | Arbitrary | Count |
|---|---|---|---|
| text-xs | 232 | text-[10px] | 22 (how-does-iptv-work:238) |
| text-sm | 237 | text-[11px] | 34 (globals.css:93) |
| text-base | 91 | text-[12.5px] | 1 rare (Hero.tsx:54) |
| text-lg | 81 | text-[13px] · sm:text-[13px] | 2 · 4 |
| text-xl | 49 | text-[13.5px] · sm:text-[14px] · text-[14px] | 5 · 1 · 1 |
| text-2xl | 52 | text-[15px] · sm:text-[15px] | 7 · 4 |
| text-3xl | 25 | text-[15.5px] · sm:text-[16.5px] | 4 · 3 |
| text-4xl | 2 (+sm: 24) | text-[16px] · sm:text-[16px] · sm:text-[17px] | 2 · 1 · 2 |
| lg:text-5xl | 21 (+sm: 2) | text-[18px] · sm:text-[19px] | 1 · 1 (FeatureCard.tsx:38) |
| lg:text-6xl | 1 rare (iptv-free-trial:189) | sm:text-[22px] · text-[26px] | 1 · 1 |
| text-7xl / sm:text-8xl | 1 each (not-found.tsx:22) | text-[28px] · sm:text-[34px] · lg:text-[34px] · lg:text-[36px] · xl:text-[38px] | 2 · 2 · 1 · 2 · 1 |
| sm: variants: sm:text-sm 86, sm:text-base 53, sm:text-3xl 48, sm:text-2xl 39, sm:text-lg 28, sm:text-xl 11 | | text-[32px] · text-[40px] · sm:text-[42px] · sm:text-[44px] · text-[44px] · lg:text-[46px] · xl:text-[48px] · lg:text-[52px] | 1 · 2 · 1 · 2 · 1 · 2 · 2 · 1 |
| `text-[0.8rem]` | 1 (ui/calendar, unused) | **clamp()** | **none found** |

Prose (articles): 1rem / 1.0625rem ≥640px, lh 1.75; h2 1.375→1.625rem, 700, lh 1.28, -0.015em; h3 1.125→1.25rem, 700, lh 1.35, -0.01em (globals.css:99-155).

| Weights | Count | Leading | Count | Tracking | Count |
|---|---|---|---|---|---|
| font-semibold | 304 | leading-relaxed | 144 | tracking-tight | 41 |
| font-bold | 189 | leading-6 | 55 | tracking-wider | 36 |
| font-extrabold | 104 | leading-7 (+sm: 2) | 27 | tracking-[0.08em] | 9 |
| font-medium | 48 | leading-[1.15] | 13 | tracking-wide | 2 |
| font-normal | 4 | leading-snug · leading-5 · leading-none | 9 · 8 · 8 | tracking-widest | 2 (ui/menubar) |
| | | leading-8 (+sm: 1) · [1.08] · [1.14] · [1.1] | 3 · 2 · 2 · 2 | | |
| | | leading-4 · [1.12] · [14.5px] · [18px] · tight | 1 each rare | | |

**Heading patterns**
- SectionHeader h2: `font-headline font-bold tracking-tight text-[28px] sm:text-[34px] lg:text-[36px] xl:text-[38px] leading-[1.14]`; h1: `text-4xl sm:text-5xl lg:text-[52px] leading-[1.08]` (SectionHeader.tsx:39-42). Subtitle `text-[15.5px] sm:text-[16.5px] leading-relaxed text-muted-foreground` (:50).
- Page h1 (most common, 12): `font-headline text-3xl font-extrabold leading-[1.15] text-foreground sm:text-4xl lg:text-5xl` (guides/m3u-vs-xtream-codes/page.tsx:158).
- Home hero h1: `text-[32px] font-bold leading-[1.1] tracking-tight sm:text-[42px] lg:text-[46px] xl:text-[48px]` (Hero.tsx:33).
- Page h2 (most common, 27): `font-headline text-xl sm:text-2xl font-bold text-foreground` (dmca-report/page.tsx:55).

**Eyebrow / label pattern** (uppercase 51 total)
| Variant | Count | Cite |
|---|---|---|
| `.eyebrow` = `text-[11px] font-semibold uppercase tracking-[0.08em] text-primary` | 59 `className="eyebrow…` | globals.css:92-94; thank-you/page.tsx:100 |
| SectionHeader eyebrow `text-xs font-mono font-bold uppercase tracking-[0.08em] text-primary mb-3` | 39 `<SectionHeader` | SectionHeader.tsx:33 |
| `font-mono text-[10px] font-bold uppercase tracking-wider` | 7 | devices/[device]/page.tsx:910 |
| `font-mono text-[11px] font-semibold uppercase tracking-wider text-foreground/80` (footer h3) | 4 | Footer.tsx:122 |
| Hero pill `rounded-full border border-primary/25 bg-primary/[0.06] px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-primary` + `size-1.5 rounded-full bg-primary` dot | 1 | Hero.tsx:28-29 |
| CTA eyebrow `font-mono text-xs font-bold uppercase tracking-wider text-primary` | 1 | CTA.tsx:42 |

## 3. Spacing

| Item | Value | Cite |
|---|---|---|
| `<Section>` default | `py-14 sm:py-16 md:py-20 lg:py-24`; `variant="alt"` adds `border-y border-white/[0.05] bg-[#07080a]` | shared/Section.tsx:12-13 (119 `<Section` uses) |
| Common Section overrides | `py-12 sm:py-16` (18); hero `relative overflow-hidden border-b border-white/[0.07] pt-12 pb-14 sm:pt-16 sm:pb-20` (15); `border-b border-white/[0.07] pt-10 pb-14 sm:pt-14 sm:pb-20` (13); `pt-10 pb-12 sm:pt-14 sm:pb-16 lg:pb-16` (12); `py-10 sm:py-14` variants | dmca-report:44, :31; m3u-vs-xtream:147, :171 |
| Comparison | `py-12 sm:py-15 lg:py-17` (rare, Tailwind v4 dynamic steps) | Comparison.tsx:42 |
| `<Container>` | `mx-auto w-full max-w-[1240px] px-5 sm:px-6 lg:px-8` (122 uses) | shared/Container.tsx:12 |
| Tailwind `container` config | center, padding 2rem, 2xl 1280px (not used as class in live code) | tailwind.config.ts:12-18 |
| SectionHeader block | `mb-10 sm:mb-12 lg:mb-14 max-w-3xl` | SectionHeader.tsx:26 |
| Footer | `pt-14 pb-8 sm:pt-16` | Footer.tsx:91 |
| Content max-widths | max-w-3xl 60, max-w-4xl 34, max-w-2xl 20, max-w-xl 10, max-w-[880px] 2, max-w-[740px]/[820px] 1 each | thank-you:58, dmca-report:45, GuideStepList:60, devices/[device]:721 |

| gap | Count | space-y | Count |
|---|---|---|---|
| gap-2 | 91 | space-y-3 | 48 |
| gap-3 | 52 | space-y-2 | 47 |
| gap-1.5 | 43 | space-y-4 | 26 |
| gap-4 | 43 | space-y-1.5 | 17 |
| gap-6 | 11 | space-y-12 | 10 |
| gap-2.5 | 9 | space-y-1 | 8 |
| gap-1 / gap-3.5 / gap-y-2 | 7 each | space-y-2.5 / -6 / -8 | 6 each |
| gap-5 / gap-8 | 6 each | space-y-7 | 5 |
| lg:gap-5 / lg:gap-8 / gap-x-4 / gap-x-6 / gap-y-1 | 3 each | space-y-0.5 | 3 |
| gap-10, gap-x-8, lg:gap-6 | 2 each | | |
| gap-12, lg:gap-10, lg:gap-12, xl:gap-14, sm:gap-5, sm:gap-6, gap-x-1.5/2/5 | 1 each | | |

Card padding: `p-6` (HomePricing.tsx:95, HowItWorks.tsx:56), `p-5 sm:p-6` (WhyChooseTryIPTV.tsx:57), `p-7 sm:p-8` (FeatureCard.tsx:23), CTA `p-6 sm:p-10` (CTA.tsx:39).

## 4. Radius

Config: `lg = var(--radius)` = 0.375rem (6px), `md` = 4px, `sm` = 2px (tailwind.config.ts:77-81; globals.css:30). `xl`/`2xl`/`full` are Tailwind defaults.

| Utility | Count | Cite | Typical role |
|---|---|---|---|
| rounded-xl | 104 | players/page.tsx:234 | buttons (button.tsx:8), icon tiles, navbar shell |
| rounded-lg | 75 | thank-you/page.tsx:142 | sm button, logo tile (Logo.tsx:7) |
| rounded-2xl (+sm: 5) | 51 | globals.css:89 | section cards, hero image, CTA panel |
| rounded-md | 36 | thank-you/page.tsx:111 | input (ui/input.tsx:11), small badges |
| rounded-full | 32 | thank-you/page.tsx:59 | pills, dots, floating contact button |
| rounded | 15 | pricing/page.tsx:227 | inline savings tags |
| rounded-sm | 14 | ui/tabs.tsx:32 | ui lib |
| rounded-[18px] | 6 | pricing/page.tsx:193; ui/card.tsx:12 | Card, FeatureCard, FaqList |
| rounded-[14px] | 1 rare | DeviceIcon.tsx:50 | device tile |
| rounded-[inherit] 4, rounded-[2px] 2, rounded-l/r-md | — | ui lib only |

## 5. Shadows

| Token | Count | Cite |
|---|---|---|
| shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] | 27 | m3u-vs-xtream:213; ui/card.tsx:12 |
| shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] | 7 | GuideToc.tsx:101; ui/button.tsx:17 |
| shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] | 3 | globals.css:89; GuideScreenshot.tsx:36 |
| shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_16px_48px_rgba(0,0,0,0.26)] | 1 rare | Navbar.tsx:26 |
| shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] | 1 rare | DeviceIcon.tsx:50 |
| shadow-[inset_0_1px_0_rgba(0,240,120,0.06)] | 1 rare | ArticleSummary.tsx:25 |
| shadow-[0_0_20px_rgba(0,240,120,0.2)] → hover:shadow-[0_0_28px_rgba(0,240,120,0.32)] | 1 each | ui/button.tsx:13 |
| shadow-[0_0_42px_rgba(0,240,120,0.12)] | 1 rare | thank-you/page.tsx:59 |
| shadow-[0_0_10px_rgba(0,240,120,0.06)] | 1 rare | GuideStepList.tsx:49 |
| shadow-sm | 31 | guides/page.tsx:167 |
| shadow-lg | 8 | help/page.tsx:123; ContactSheet.tsx:59 |
| shadow-md | 5 | ui/popover.tsx:22 (ui lib) |
| shadow-xl / shadow-none / sidebar hsl shadows | 1 each | ui/chart.tsx, ui/sidebar.tsx (unused) |
| backdrop-blur-xl | 1 | Navbar.tsx:26 |
| blur-3xl (hero wash) | 1 | Hero.tsx:21 |

## 6. Buttons (ui/button.tsx, verbatim)

Base (button.tsx:8): `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 motion-safe:hover:-translate-y-0.5 active:scale-[0.98] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0`

| Variant | Classes |
|---|---|
| default | `bg-primary text-black font-semibold shadow-[0_0_20px_rgba(0,240,120,0.2)] hover:bg-[#00d66c] hover:shadow-[0_0_28px_rgba(0,240,120,0.32)]` |
| destructive | `bg-destructive text-destructive-foreground hover:bg-destructive/90` |
| outline | `border border-white/[0.14] bg-[#07080a] text-foreground font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] hover:border-white/25 hover:bg-white/[0.06]` |
| secondary | `bg-white/[0.08] text-secondary-foreground hover:bg-white/[0.12]` |
| ghost | `text-muted-foreground hover:bg-white/[0.05] hover:text-foreground` |
| link | `text-primary underline-offset-4 hover:underline` |

| Size | Classes |
|---|---|
| default | `h-12 min-h-[48px] px-6 py-3 text-[15px]` |
| sm | `h-9 rounded-lg px-3.5 text-xs` |
| lg | `h-[50px] min-h-[48px] px-7 py-3 text-base rounded-xl` |
| icon | `h-10 w-10 rounded-xl` |

Defaults: variant `default`, size `default`. `<Button` used 86 times (not-found.tsx:32).

Notable custom combos:
- Navbar trial CTA: `size="sm" variant="outline"` + `border-primary/30 bg-primary/[0.08] text-foreground hover:border-primary/50 hover:bg-primary/[0.14]` (Navbar.tsx:40).
- Hero pair: default + `variant="outline"`, `flex flex-col gap-3 sm:flex-row` (Hero.tsx:41-51). Icons lucide (`CirclePlay`, `ArrowRight`, `ArrowUpRight`).
- Plan cards: `variant={featured ? "default" : "outline"} className="w-full"` (HomePricing.tsx:139); Pricing `w-full h-12 min-h-[48px] rounded-xl text-[15px] font-semibold` (Pricing.tsx:83).
- Floating contact: `fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg` (ContactSheet.tsx:59).
- Mobile menu trigger: `variant="ghost" size="icon" className="size-11 lg:hidden"` (Navbar.tsx:14; MobileNav.tsx:17).
- Text links: `font-semibold text-primary hover:underline` (FAQ.tsx:149, HowItWorks.tsx:18); secondary `inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground hover:underline` (Devices.tsx:65).

Input (ui/input.tsx:11): `h-10 rounded-md border border-white/[0.12] bg-[#101512] px-3 py-2 text-sm … focus-visible:border-primary/60 focus-visible:ring-2 focus-visible:ring-primary/30`.
Badge (ui/badge.tsx:7, unused live): `rounded-full border px-2.5 py-0.5 text-xs font-semibold`; variants default/secondary/destructive/outline.

## 7. Cards / surfaces

| Pattern | Classes | Cite |
|---|---|---|
| `<Card>` (24 uses) | `rounded-[18px] border border-white/[0.08] bg-[#07080a] text-card-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] transition-all duration-200`; Header `p-6 space-y-1.5`, Title `text-2xl font-semibold leading-none tracking-tight`, Content/Footer `p-6 pt-0` | ui/card.tsx:12-80 |
| Section card (home) | `rounded-2xl border border-white/[0.07] bg-card p-6` | HowItWorks.tsx:56; WhyChooseTryIPTV.tsx:57 |
| Icon tile | `grid size-10 place-items-center rounded-xl border border-white/[0.07] bg-white/[0.03] text-primary` | HowItWorks.tsx:58 |
| Home plan card | `flex flex-col rounded-2xl border bg-card p-6 transition-colors duration-200` + featured `border-primary/40 hover:border-primary/60` / else `border-white/[0.07] hover:border-white/[0.14]` | HomePricing.tsx:95-98 |
| Pricing page card | Card + `hover:border-white/[0.16] hover:bg-[#090b0d] motion-safe:hover:-translate-y-0.5`; popular = primary gradient + `border-primary/40` | sections/Pricing.tsx:45-46 |
| FeatureCard | `rounded-[18px] border-white/[0.08] bg-[#07080a] p-7 sm:p-8 … hover:border-white/[0.14] hover:bg-[#090b0d]`; icon `h-12 w-12 rounded-xl` | FeatureCard.tsx:23-31 |
| DeviceIcon tile | `min-h-[124px] rounded-[14px] border-white/[0.08] bg-[#07080a] p-4 … hover:-translate-y-0.5 motion-reduce:transform-none` | DeviceIcon.tsx:50 |
| Device list row | `flex min-h-14 items-center gap-3 rounded-xl border border-white/[0.07] bg-card px-4 py-3 hover:border-primary/40` | Devices.tsx:50 |
| CTA panel | `rounded-2xl border border-primary/30 bg-[linear-gradient(135deg,rgba(0,240,120,0.06),transparent_60%)] p-6 sm:p-10` | CTA.tsx:39 |
| Stat strip | `grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-4`, cells `bg-card px-4 py-4 sm:px-6` | Hero.tsx:78-80 |
| FaqList | `mx-auto max-w-[880px] overflow-hidden rounded-[18px] border-white/[0.08] bg-[#07080a] shadow-[inset…0.03]` | FAQ.tsx:98 |
| Screenshot figure | `rounded-xl border-white/[0.08] bg-[#07080a] p-2 sm:p-2.5 shadow-[inset…0.05]`, inner `rounded-lg bg-black/40` | GuideScreenshot.tsx:36-38 |
| `.surface-panel` / `.premium-surface` | defined (globals.css:88-90, 254-256) — **unused** | — |

## 8. Logo (shared/Logo.tsx)

`<Link href="/" className="group flex items-center gap-3" aria-label="TryIPTV homepage">` → tile `grid h-9 w-9 place-items-center overflow-hidden rounded-lg border border-primary/25 bg-primary/[0.07] transition-colors group-hover:bg-primary/[0.12]` containing `next/image` `/brand-logo-square.png` 28×28, `h-7 w-7 object-contain`, `alt=""` → wordmark `<strong className="font-headline text-lg font-semibold">Try<span className="text-primary">IPTV</span></strong>` (Logo.tsx:6-12). Used in Navbar, MobileNav, Footer. `/public/logo.png` also exists.

## 9. Imagery

| Item | Value | Cite |
|---|---|---|
| Component | `next/image` only (no `<img>`); 4 files: Logo, Hero, CustomerFeedback, GuideScreenshot | — |
| Formats served | `formats: ['image/avif','image/webp']`, deviceSizes 360…1536, imageSizes 32…320 | next.config.js:10-13 |
| /public files | png 10, jpg 6, jpeg 5, webp 1 (images/: best-iptv-service.png, feedback/*.jpg, firestick/*.jpeg, tivimate/*) | — |
| Hero | 1024×682 (~3:2), `preload`, `rounded-2xl border border-white/[0.07] bg-card` wrapper, `sizes="(min-width: 1024px) 460px, (min-width: 640px) 512px, 100vw"` | Hero.tsx:63-70 |
| Feedback screenshots | 525×1024, `aspect-[525/1024]`, `object-cover`, `sizes="260px"`, lazy; cards `w-[240px] sm:w-[260px] rounded-2xl` in horizontal snap scroller | CustomerFeedback.tsx:61-74 |
| Guide screenshots | caller width/height, `object-contain rounded-md`, `sizes="(max-width: 768px) 100vw, (max-width: 1200px) 760px, 820px"` | GuideScreenshot.tsx:39-46 |
| Aspect utilities | aspect-[525/1024] 1; aspect-square 4 & aspect-video 1 (ui lib only) | — |
| Icons | lucide-react (`[&_svg]:size-4` in buttons; `size-4/5`, `h-6 w-6`) | button.tsx:8 |

## 10. Layout patterns

| Pattern | Cite / count |
|---|---|
| Breakpoints: Tailwind defaults only; prefix counts sm: 756, lg: 133, md: 45, xl: 4; no 2xl:/max-* found | — |
| 12-col split: `grid gap-12 lg:grid-cols-12` + `lg:col-span-8` / `lg:col-span-4` (sidebar) | players/page.tsx:335-437 |
| 7/5 split: Hero `grid items-center gap-8 lg:grid-cols-12` + `lg:col-span-7`/`5`; FAQ `lg:col-span-5`(sticky)/`7` | Hero.tsx:25-60; FAQ.tsx:137-190 |
| grid-cols counts: grid-cols-1 41, sm:grid-cols-2 23, md:grid-cols-2 11, lg:grid-cols-3 7, lg:grid-cols-4 7, lg:grid-cols-12 6, sm:grid-cols-3 6, md:grid-cols-3 5, sm:grid-cols-12 4 | — |
| Card grids: `grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5` | WhyChooseTryIPTV.tsx:53; HomePricing.tsx:90 |
| Footer: `grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12`, brand `lg:col-span-4`, 4 cols `lg:col-span-2` | Footer.tsx:94-178 |
| Sticky header: `<header className="sticky top-0 z-50 w-full py-3">`, inner floating bar `h-14 rounded-xl border-white/[0.08] bg-[#050606]/80 backdrop-blur-xl`, nav centered `absolute left-1/2 -translate-x-1/2 hidden lg:flex space-x-6` | Navbar.tsx:24-28 |
| Hero offsets under header: `-mt-20 pt-24 sm:pt-28 lg:pt-32` | Hero.tsx:17 |
| Sticky side column: `lg:sticky lg:top-24` | FAQ.tsx:140 |
| Floating contact button bottom-right `fixed bottom-6 right-6 z-50` opens right Sheet | ContactSheet.tsx:59 |
| Skip link `sr-only focus:not-sr-only … focus:bg-primary` | layout.tsx:162-166 |
| Body `min-width: 320px` | globals.css:43 |
| Touch targets: `min-h-11`, `min-h-[48px]`, `size-11` | Devices.tsx:62; button.tsx:24 |

## 11. Motion

| Item | Value | Cite / count |
|---|---|---|
| Transition utilities | transition-colors 76, transition-all 48, transition-transform 15, transition 9, transition-opacity 5 | players/page.tsx:248 |
| Durations | duration-200 34, duration-150 4; duration-300/500 & ease-in-out sheet only | ui/sheet.tsx:34 |
| Hover lift | `motion-safe:hover:-translate-y-0.5` 3 (button, Pricing, FeatureCard); `hover:-translate-y-1` 6 (players/page.tsx:294); `hover:-translate-y-0.5` 3 | button.tsx:8 |
| Arrow nudge | `group-hover:translate-x-0.5` 5 (+ -translate-y-0.5 diagonals in Footer/FAQ) | guides/page.tsx:193 |
| Press | `active:scale-[0.98]` 1 | button.tsx:8 |
| Radix animations | `data-[state=open]:animate-in` / `closed:animate-out` 13 (tailwindcss-animate); accordion-down/up 0.2s ease-out | tailwind.config.ts:105-107 |
| Prose link | `transition: color 150ms ease` | globals.css:227 |
| Reduced motion | `motion-safe:` (3), `motion-reduce:transform-none` (DeviceIcon.tsx:50), `motion-reduce:transition-none` (FAQ.tsx:178); Reveal's `useReducedMotion` is in unused component; no `prefers-reduced-motion` CSS | — |
| Theme | `disableTransitionOnChange` | layout.tsx:159 |
| framer-motion | only in unused Reveal / ui lib | — |

## 12. Rules for changes

**Allowed**
- Reuse any token, class combo, or component listed above (Section, Container, SectionHeader, Card, Button variants/sizes, eyebrow patterns).
- Responsive adjustments using existing breakpoints (sm/md/lg/xl) and values already on the scales above (font sizes, gaps, paddings, radii, max-widths).
- Moving an existing value to another breakpoint (e.g. `text-[28px] sm:text-[34px]`) when both values already exist here.
- Using the primary-opacity and white-alpha border/background steps already recorded in §1.

**Forbidden**
- Any new color (hex, rgb, HSL var, Tailwind palette hue or new opacity step) not listed in §1.
- New font families, webfont loading, or weights/tracking values not in §2.
- New radii (e.g. rounded-3xl, rounded-[20px]) or shadows/glows not in §4–§5.
- New layout patterns (new grid systems, container widths, header/footer structures) not in §10.
- Light theme or theme toggling (site is forced dark).
- Reviving dead code in §0 (velora, carousels, Reveal, unused ui/*) as a design source.
- Size tweaks must snap to an existing scale value; no new arbitrary `text-[Npx]`, `py-N`, `gap-N`, `max-w-[N]` values.

## 13. Owner-approved additions (after the original snapshot)

These were approved by the owner during the design QA (see AUDIT_REPORT.md) and are part of the lock from now on.

| Addition | Rule | Where |
|---|---|---|
| Mobile body text | Running body copy is `text-base` (16px) below 640px and returns to its original size from `sm:` up. Labels, eyebrows, badges, captions (marked `data-small-print`) and table cells keep their original sizes. | ~60 page/component files |
| Inline links | Option A: `text-primary underline decoration-primary/40 underline-offset-4`, full-primary underline on hover. Class-less CMS links get the same treatment in globals.css. | guides, help, players, about, globals.css |
| Touch targets | On `pointer: coarse`, interactive elements are at least 44×44px: isolated text links use the `tap-target` utility (invisible hit area); stacked/wrapping links become 44px rows with no gap; mouse/trackpad layouts are unchanged. | button.tsx, Footer, Breadcrumb, InternalLinks, players, pricing, free-trial |
| Form fields | `text-base` (16px) on touch to prevent iOS zoom, `text-sm` with a fine pointer; 44px min height on touch. | ui/input.tsx, ui/textarea.tsx |
| Error text | `text-red-400` for form error text (the `--destructive` token stays for backgrounds/borders). | ContactForm, ContactSheetForm |
| Stacked table labels | Mobile stacked rows repeat the column header via `data-label` + `::before` (no HTML text); header row from `sm:` up. | guides/what-is-iptv, guides/m3u-vs-xtream-codes, help/iptv-not-working |
| Browser theme color | `theme-color` is `#040506` (body background) for both OS color schemes. | layout.tsx viewport |
| Viewport | `viewport-fit=cover`; Container side padding is `max(original padding, env(safe-area-inset-*))`. | layout.tsx, Container.tsx |

## Identity summary
1. Forced-dark, near-black green-tinted canvas (#040506 body, #07080a / bg-card #090c0a surfaces) with a faint top radial green wash.
2. Single neon-green brand accent #00f078 (`--primary`) used for text, thin borders, low-alpha fills and soft glows; buttons are black-on-green.
3. Hairline white-alpha borders (`white/[0.06–0.09]`) plus a 1px inset top highlight give a quiet, "premium panel" depth instead of drop shadows.
4. Inter/system sans for everything (no webfont loaded), bold tight headlines, monospace uppercase 10–12px eyebrows with 0.08em tracking.
5. Rounded-xl/2xl/[18px] geometry inside a 1240px Container, Section rhythm py-14→py-24, restrained 150–200ms color/lift motion with motion-safe guards.
