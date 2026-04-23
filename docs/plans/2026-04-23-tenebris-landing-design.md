# Tenebris Landing — Design Document

**Date**: 2026-04-23
**Domain**: `https://tenebris.com.ua`
**Status**: approved, ready for implementation

> **Historical snapshot.** This document captures the design as validated on 2026-04-23. For current state and any decisions that have drifted since, see `CLAUDE.md` and `README.md`.
>
> Notable drift since 2026-04-23:
> - The open-source fallback used alongside Söhne was originally Geist; it was swapped for **Onest** (same role, better Cyrillic coverage, not tied to a vendor brand). All references to "Geist" in this document should be read as "Onest."

This document captures the validated design and architecture for the Tenebris marketing landing site. It exists so that any engineer — or any future Claude Code session — can pick up the build without needing to rediscover decisions.

See also: `CLAUDE.md` (project brief, design principles, hard rules).

---

## 1. Goals

1. Communicate the gravity and competence of a combat-proven defense contractor.
2. Convert 5 defined audiences into action: MoD procurement, foreign military integrators, press, engineers/pilots seeking work, remote pilot-operator trainees.
3. Rank organically for Ukrainian + English queries around *interceptor drones, dron-perekhopliuvach, anti-Shahed*.
4. Surface cleanly in AI answer engines (ChatGPT search, Perplexity, Google AI Overviews).
5. Launch fast — static, single-developer maintainable, no backend.

## 2. Non-Goals

- E-commerce, checkout, subscriptions.
- CMS or admin panel. All content lives in typed TS files under `src/data/` and `src/i18n/`.
- User accounts, logins, dashboards.
- Privacy / Terms pages (explicitly deferred by product owner).
- A blog (for now).

## 3. Brand & Aesthetic

See `CLAUDE.md > Design Context` for the full codification. Summary:

| Lever | Decision |
|---|---|
| Aesthetic | Operational Black |
| Background | `#0A0A0A` |
| Foreground | `#F5F5F4` |
| Accent | `#C9A46A` (muted amber, sparse) |
| Display type | Söhne (with Geist fallback in dev) |
| Mono type | JetBrains Mono |
| Motif | Vertical light-beam, hairline grid, telemetry readouts |
| Motion | Restrained — hero video loop, one fade-up on section headers |
| Mode | Dark only |

## 4. Information Architecture

**Option B — hybrid** (landing + focused subpages). Selected over pure single-page because each role deserves its own `JobPosting` schema + URL for Google Jobs ingestion.

### Routes

```
/                              Landing (EN)
/careers/                      Roles index (EN)
/careers/r-n-d-engineer/       Per-role detail × 5 (EN)
/careers/design-engineer/
/careers/combat-uav-pilot/
/careers/electronics-engineer/
/careers/service-engineer/

/uk/                           Landing (UK)
/uk/careers/
/uk/careers/<slug>/            Per-role detail × 5 (UK)

/404/                          Bilingual 404
/og-default.png                1200×630 share image
/sitemap-index.xml
/robots.txt
/llms.txt
/llms-full.txt
/manifest.webmanifest
/favicon.ico + full favicon set
```

### Landing — section order & IDs

| # | Section | Anchor | Function |
|---|---|---|---|
| 01 | Hero | `#` (top) | Video loop, one-sentence positioning, primary CTA |
| 02 | Proof (stats) | `#proof` | 100+ confirmed kills, deployed systems, etc. |
| 03 | Systems | `#systems` | Bahnet interceptor + Alta Ares guidance |
| 04 | Advantages | `#advantages` | 6 capability bullets |
| 05 | Training | `#training` | Remote pilot-operator training program |
| 06 | Press | `#press` | Hand-curated outlet mentions |
| 07 | Careers | `#careers` | 5-role list with links to detail pages |
| 08 | Contact | `#contact` | Form + 3 phone contacts + HQ location |

*Note: the PDF lists 7 blocks but "Systems" and "Advantages" read more naturally as two sections than as one big block. I promote "Systems" as section 03 because the Bahnet + Alta Ares story is the headline product and deserves standalone treatment.*

## 5. Section-by-Section Specification

Each section below lists: purpose, content, layout, data source, copy language, telemetry/instrumentation details.

### 01 · Hero

- **Purpose**: Establish gravity and position in <5 seconds.
- **Content**:
  - Eyebrow: `[ TNB · 2024–2026 · KYIV ]` (monospace, amber, above headline)
  - H1 (EN): "Automated interceptors for the aerial threat."
  - H1 (UK): "Автоматизовані перехоплювачі повітряних загроз."
  - Sub: the official one-liner from the brief
  - Primary CTA: "Request cooperation" → anchors `#contact`
  - Secondary CTA: "View systems" → anchors `#systems`
- **Layout**:
  - Full-viewport height (`min-h-[92vh]`).
  - Video positioned right, portrait aspect (the source is 720×1280). On desktop, video occupies right 40% with black bars composited; copy lives on the left 60%. On mobile, video becomes full-width backdrop, copy overlays at bottom-left.
  - 1px hairline grid overlay (`opacity: 0.15`) on the full section.
  - Corner brackets (`[ ]`) around the CTA button on hover.
- **Data**: `src/i18n/{en,uk}/pages/home.ts > hero`, video at `src/assets/video/hero-loop.{mp4,webm}`.
- **Fallback**: if `prefers-reduced-motion` → replace `<video>` with poster AVIF; if `no-js` → same.

### 02 · Proof (stats)

- **Purpose**: Single-screen credibility check.
- **Content** (three cells):
  - `100+` — enemy targets intercepted
  - `5` — engineering roles open (dynamic; reads from `src/data/roles.ts`)
  - `2025` — year first Bahnet system delivered *(user to confirm number; placeholder shown as `—` if unknown)*
- **Layout**: three-column monospace grid, numbers in JetBrains Mono 96px, labels in Söhne Mono-size caption below. Hairline dividers between cells. A date-of-record stamp footnote in small grey monospace.
- **Behavior**: static. No count-up animation (per design principle 1).
- **Data**: `src/data/stats.ts`, with per-locale label strings in i18n.

### 03 · Systems — Bahnet + Alta Ares

- **Purpose**: Named-product authority. Top SEO/AEO target for "anti-Shahed drone" queries.
- **Content**:
  - Heading: "The Bahnet system"
  - Intro paragraph (3 sentences, written fresh with `/copywriting` + `/humanizer`).
  - Two-column spec list in monospace:
    - `CLASS` · *interceptor UAV*
    - `ROLE` · *destruction of Shahed-class and equivalent aerial targets*
    - `GUIDANCE` · *Alta Ares (France) · optical seeker*
    - `AUTOMATION` · *automatic takeoff and terminal guidance*
    - `LAUNCH` · *sealed-box deployment, remote trigger*
    - `STATUS` · *in active service, 100+ confirmed intercepts*
  - Large product photo (best photo from `/tenebris photos/`) to the right.
- **Layout**: left column = copy, right column = photo with thin amber corner-brackets.
- **Data**: `src/data/systems.ts`; photos optimized to AVIF+WebP.

### 04 · Advantages

- **Purpose**: Itemize the brief's 6 capabilities.
- **Content**: six items, each `[ 0n ]` prefix + short title + one-sentence description:
  1. Network of sealed deployment boxes.
  2. Remote in-flight activation.
  3. Remote launch from ground / vehicle / airborne platforms.
  4. Remote flight control.
  5. Automatic takeoff and terminal guidance.
  6. Alta Ares guidance integration (France).
- **Layout**: 3×2 grid on desktop (3 columns, 2 rows); 1×6 on mobile. No cards, no backgrounds — just vertical hairline dividers between items.
- **Data**: `src/data/advantages.ts`.

### 05 · Training

- **Purpose**: Announce and qualify the remote pilot-operator training program.
- **Content**: headline + 2 short paragraphs + a qualifying list (who the program is for, commitment level, format) + CTA button → `#contact` with a `?subject=training` query.
- **Layout**: full-width black section with the gallery's operator photo on the right; a single amber vertical beam separates the copy from the photo.
- **Data**: `src/i18n/*/pages/home.ts > training`.

### 06 · Press

- **Purpose**: Third-party validation.
- **Content**: two initial articles hand-curated:
  1. `dev.ua` — Bahnet interceptor for fighting Shaheds (2025-08) — pullquote + outlet name + date + external link.
  2. `thedefender.media` — Alta Ares presentation (2025-11) — same structure.
- **Layout**: two-column cards, black bg, 1px border `#1F1F1F`, monospace meta line, `.webp` thumbnail. Corner brackets on hover.
- **Data**: `src/data/press.ts`. Outlet logos pulled from simple text-as-logo treatment (no fetched assets — outlets own those).

### 07 · Careers

- **Purpose**: Inbound recruiting. 5 roles.
- **Content** on landing: heading + one-line mission statement + list of 5 roles as links (each shows title, location, brief one-liner). CTA: "See all roles" → `/careers/`.
- **Layout**: monospace-row list. Each row: `[ 0n ]` + role title + amber arrow on hover.
- **Data**: `src/data/roles.ts` — single source of truth for roles. i18n in `src/i18n/*/roles.ts`.

### 08 · Contact

- **Purpose**: Primary conversion point.
- **Content**:
  - Form (Web3Forms backed, sends to `s.bohdanovskyi@tenebristech.tech`):
    - `name` (required)
    - `email` (required)
    - `organization` (optional)
    - `purpose` (radio: *cooperation* / *employment* / *press* / *other*)
    - `message` (required, textarea)
    - Honeypot
    - Hidden `access_key` + `subject` (localized) + `redirect`
  - Direct contacts panel:
    - **Cooperation** · Bohdan · `+380 66 555 14 88` · tel:
    - **Cooperation** · Serhii · `+380 63 850 75 77` · tel:
    - **Employment** · Kateryna · `+380 95 910 58 58` · tel:
  - Mail: `info@tenebris.com.ua` *(form recipient is separate: `s.bohdanovskyi@tenebristech.tech` — only visible as the behind-the-scenes form destination)*
  - HQ city line (no street until confirmed): "Kyiv, Ukraine"
- **Layout**: two-column on desktop — form left, contacts right. Single column on mobile, contacts first (so phone numbers are reachable without scrolling past the form).
- **Behavior**: submit disables button + inline success/error `role="alert"` message on redirect. Honeypot blocks bots.

### Career detail page `/careers/<slug>/`

Each role gets its own page with:
- H1 = role title.
- Breadcrumb: Home › Careers › Role.
- Mission paragraph, responsibilities list, requirements list, nice-to-haves, location + employment type, compensation line ("competitive" unless user provides band), apply CTA → `#contact?subject=<role-slug>`.
- `JobPosting` schema (full required + recommended fields).
- Translated UK equivalent at `/uk/careers/<slug>/`.

## 6. Data Model

Single source of truth lives in `src/data/`. i18n strings live in `src/i18n/{locale}/…`. Nothing static is fetched at runtime.

```ts
// src/data/roles.ts
export interface Role {
  slug: string;                 // kebab-case; used in URL
  icon: string;                 // 'lucide:cpu' etc.
  team: 'R&D' | 'Design' | 'Flight' | 'Electronics' | 'Service';
  employmentType: 'FULL_TIME' | 'CONTRACT' | 'TEMPORARY';
  baseLocation: string;         // 'Kyiv, Ukraine' | 'Remote'
  postedISO: string;            // YYYY-MM-DD — used in JobPosting.datePosted
  validThroughISO: string;      // YYYY-MM-DD — JobPosting.validThrough
  iconAccent?: 'default' | 'amber';
}

// src/data/press.ts
export interface PressItem {
  outlet: string;               // 'dev.ua'
  url: string;
  dateISO: string;
  thumbnail: string;            // relative path to /public/press/
  pullquoteKey: string;         // lookup in i18n press.ts
  publisherCountry: string;     // 'UA'
}

// src/data/advantages.ts
export interface Advantage {
  n: string;                    // '01', '02', …
  titleKey: string;             // lookup in i18n
  descriptionKey: string;
}

// src/data/stats.ts
export interface Stat {
  value: string;                // '100+', '5', etc.
  labelKey: string;             // i18n lookup
  footnoteKey?: string;         // small date-of-record line
}
```

Translatable text for each of these lives in `src/i18n/{locale}/{file}.ts`.

## 7. SEO / GEO / AEO

### Structured data (JSON-LD)

Every page emits a base of:
1. `WebSite` with `@id = https://tenebris.com.ua/#website`
2. `Organization` with `@id = https://tenebris.com.ua/#organization`, subtype `Manufacturer`, with:
   - `legalName` = "ТОВ «Тенебріс»" / "Tenebris LLC"
   - `taxID` = "45226064"
   - `foundingLocation` = Ukraine
   - `contactPoint` array of 3 `ContactPoint`s (cooperation/cooperation/employment) with phone + localized area served + `contactType`.
   - `sameAs` — placeholder, to be populated with socials when they exist.
3. `BreadcrumbList` for non-root pages.

Section-specific:
- `ItemList` on landing `#press` referencing each `NewsArticle` with its publisher (`NewsMediaOrganization`).
- `JobPosting` on each career detail page with full fields (`title`, `description`, `datePosted`, `validThrough`, `employmentType`, `hiringOrganization` → `@id=#organization`, `jobLocation` as `Place`, `applicantLocationRequirements` where remote, `baseSalary` omitted until provided).
- Systems section omits `Product` schema — we're not selling online and `Product` without `offers` looks empty. Using plain `Thing` with `subjectOf: Article` is more honest.

### Meta

- Canonical always self-referencing, absolute URL, no trailing variations.
- `og:image` = `/og-default.png` site-wide, per-page overrides possible.
- Twitter card = `summary_large_image`.
- `lang` and `dir="ltr"` on `<html>`, correct per locale.
- `viewport` standard.
- No `author` meta at the page level (adds no ranking).

### Hreflang

```html
<link rel="alternate" hreflang="en" href="https://tenebris.com.ua/<path>/" />
<link rel="alternate" hreflang="uk" href="https://tenebris.com.ua/uk/<path>/" />
<link rel="alternate" hreflang="x-default" href="https://tenebris.com.ua/<path>/" />
```

Generated by `src/i18n/utils.ts > getHreflangAlternates(pathname, locale)`.

### Sitemap

`@astrojs/sitemap` with `i18n: { defaultLocale: 'en', locales: { en, uk } }`. Custom pages array includes each career detail URL per locale.

### `robots.txt`

Explicit `Allow: /` plus per-bot allowances for AI crawlers:

```
User-agent: *
Allow: /
Disallow: /_astro/

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: CCBot
Allow: /

Sitemap: https://tenebris.com.ua/sitemap-index.xml
```

### `llms.txt` / `llms-full.txt`

- `llms.txt` (short): company description, mission, key facts, links to careers + press.
- `llms-full.txt` (expanded): full landing copy + all career descriptions, regenerated at build time from i18n + data files via `scripts/generate-llms-full.mjs`.

### Favicon set

Generated from a single SVG master:
- `/favicon.ico` (16+32+48 multi-res)
- `/favicon.svg`
- `/icons/icon-192.png`, `icon-512.png`, `icon-512-maskable.png`
- `/apple-touch-icon.png` (180×180)
- `/safari-pinned-tab.svg` (monochrome)
- `/manifest.webmanifest`

## 8. Contact Form — Web3Forms Integration

- `<form method="POST" action="https://api.web3forms.com/submit">`.
- Hidden inputs:
  - `access_key` (new key created for Tenebris — user responsibility before launch)
  - `email` = `s.bohdanovskyi@tenebristech.tech`
  - `subject` = localized subject prefix + purpose (dynamic via JS: "[Tenebris] Cooperation inquiry — {name}")
  - `redirect` = same-page + `?success=true`
- Client-side: JS flips subject when radio changes, reveals success message when URL has `?success=true` and removes the query string via `history.replaceState`.
- Honeypot: hidden `botcheck` checkbox.
- No rate limiting beyond Web3Forms defaults (free tier is 250/month; sufficient).

## 9. Analytics / GTM

- Container ID = `GTM-XXXXXXX` — placeholder, user swaps before launch.
- Loader lives in `src/scripts/gtm-init.ts`, invoked by `src/components/astro/DeferredGTM.astro`.
- Trigger: first user interaction (`pointerdown`, `keydown`, `touchstart`, `scroll`) **or** `requestIdleCallback` with 5s timeout, whichever fires first.
- CSP accounts for GTM origin: `script-src https://www.googletagmanager.com`.
- No tracking before user interaction or idle fire. No cookie banner this iteration (can be added later if the legal entity requires it).

## 10. Accessibility

- WCAG 2.2 AA target.
- Keyboard: all interactive elements reachable, skip-to-content link at top of `<body>`.
- Focus: amber `outline` with 2px offset. Never remove focus rings.
- Video: muted autoplay, poster frame for reduced-motion, no audio content that communicates info.
- Form: visible labels, `aria-required`, inline errors with `role="alert"`, server-side validation doubles as client fallback.
- Heading order: exactly one `<h1>` per page; no skipping levels.
- Color contrast: foreground on background ≥ 15:1; muted text ≥ 4.5:1.

## 11. Performance Budget

| Metric | Target |
|---|---|
| HTML (gzipped) | ≤ 20 KB per page |
| Critical CSS (inlined) | ≤ 20 KB per page |
| Hero video (initial byte) | ≤ 250 KB metadata, rest streamed |
| Hero poster (AVIF) | ≤ 40 KB |
| Total JS on `/` at first interaction | ≤ 10 KB (pre-GTM) |
| LCP | ≤ 2.0s on 4G |
| CLS | 0 |
| INP | ≤ 200ms |

## 12. Error & Edge Cases

- **Video fails to load** → poster renders, copy remains readable.
- **Form POST fails** → user sees inline retry message; `tel:` and `mailto:` remain visible.
- **Missing translation key** → TypeScript compile error (strict i18n types); can't ship with a missing string.
- **Role with no description** → build fails (data validation).
- **404**: custom page at `/404/` bilingual, echoing hero aesthetic, with links home + careers.

## 13. Testing & Verification

Before declaring "done" each iteration:

1. `npm run build` — must pass.
2. `astro check` — no TS or content errors.
3. Lighthouse (mobile + desktop) — Performance ≥ 95, SEO = 100, A11y ≥ 95, Best Practices ≥ 95.
4. Visual QA on 320px, 768px, 1280px, 1920px in both EN and UK.
5. Validate JSON-LD with Google Rich Results Test + Schema.org validator.
6. Check `robots.txt`, `sitemap-index.xml`, `llms.txt` render correctly in production build.
7. Run `curl` against form endpoint with honeypot populated — must 200 without sending email.
8. Hreflang round-trip: EN page ↔ UK alternate ↔ back to EN with no loops.

## 14. Deployment

- Target: **Cloudflare Pages** connected to the `main` branch.
- Build command: `npm run build`.
- Output directory: `dist/`.
- Node version: 20 LTS.
- Environment variables needed at build time: `PUBLIC_GTM_ID`, `PUBLIC_WEB3FORMS_KEY`.
- Custom domain: `tenebris.com.ua` (apex, DNS via Cloudflare).
- Preview environments: every branch gets a `*.pages.dev` preview URL.

## 15. Open Items (non-blocking, deferred)

- [ ] Social media handles (LI, IG, X/Twitter, Telegram) — when available, drop into `src/data/social.ts`; `sameAs` auto-includes them.
- [ ] Söhne commercial license + web font files → replace Geist dev fallback.
- [ ] Privacy policy + Terms — when legal is ready, add under `/legal/`.
- [ ] Real GTM container ID.
- [ ] Real Web3Forms access key for tenebris.com.ua.
- [ ] Production OG image — design the final 1200×630 composition.
- [ ] Additional press articles as they publish → append to `src/data/press.ts`.
- [ ] If stats become sensitive to date-of-record, consider a monthly rebuild cron.

---

**End of design document. Ready for implementation plan.**
