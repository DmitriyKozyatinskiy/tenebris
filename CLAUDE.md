# Tenebris Landing — Claude Code Guide

## Project Brief

**Tenebris** (Latin: *darkness*) is a Ukrainian defense-tech company building automated interceptor drone systems for destruction of enemy aerial targets (Shaheds, cruise missiles, reconnaissance UAVs). Combat-proven with 100+ confirmed kills. The company's flagship product is the **Bahnet** interceptor drone, guided by the French **Alta Ares** optical guidance module.

**This repository** is the marketing and hiring landing site at `https://tenebris.com.ua`. It is not the control software for the interceptor itself.

**Business goals served by this site:**
1. Credibility with Ukrainian AF procurement, MoD, and international defense buyers
2. Credibility with press (news outlets linking here)
3. Active recruiting for 5 engineering + pilot roles
4. International recruiting for remote pilot-operator training programs
5. Inbound contact for cooperation (partnerships, subcontracting, distributors)

**Legal entity**: ТОВ «Тенебріс» / Tenebris LLC — Ukraine — registration code `45226064`.

---

## Design Context

### Users

Three distinct audiences, in priority order:

1. **Defense procurement** (Ukrainian MoD, foreign militaries, integrators). Older, technically literate, skeptical of marketing gloss. Reads press coverage, looks for combat data, checks company registration. Wants to confirm this is a serious contractor, not a startup pitch. Viewed mostly on desktop, often on air-gapped or slow networks.
2. **Engineers & pilots looking for work**. Reads the careers page top-to-bottom. Compares roles. Expects specificity on the tech stack and combat environment. Cares about impact more than perks.
3. **Press & researchers**. Skims for facts, quotes, verified counts, leadership names. Copies from the site into articles.

Shared context: every visitor arrives with *gravity*. This is a wartime product. The interface should never trivialize that.

### Brand Personality

**Three words**: *operational · disciplined · lethal*.

- **Voice**: direct, technical, unadorned. Short sentences. Active verbs. Zero hype language ("revolutionary", "game-changer", "empower", "leverage", "unlock", "cutting-edge"). No em dashes. No rhetorical questions.
- **Tone by section**: Hero is declarative. Stats are numeric and sourced. Advantages are bullet-tight. Careers are honest about mission and difficulty. Contact is clean, fast, human.
- **Emotion evoked**: *competence.* Not fear, not patriotism, not excitement. The visitor should leave thinking *"these people know what they're doing."*

### Aesthetic Direction

**Operational Black** — a dark, restrained, technical aesthetic that reads like the interface of a real weapons system rather than a marketing site.

**Visual system:**

- **Color** (strictly three):
  - `--bg` = `#0A0A0A` (near-black, not pure black — pure black renders differently per display)
  - `--fg` = `#F5F5F4` (off-white, warm paper)
  - `--accent` = `#C9A46A` (muted amber — targeting reticle, stats, single hero highlight; used sparingly, never as a background, never in gradients)
  - Supporting grayscale: `--border` `#1F1F1F`, `--border-strong` `#2A2A2A`, `--fg-muted` `#7F7F78`, `--fg-dim` `#4F4F49`.
- **Typography**:
  - `--font-display` = Söhne Buch / Söhne Kräftig (headings, hero). Falls back to `Onest, ui-sans-serif` in development until commercial license is loaded.
  - `--font-sans` = Söhne (body text).
  - `--font-mono` = JetBrains Mono (data readouts, specs, section numbers, timestamps, coordinates).
- **Motifs**:
  - *Vertical light-beam* (echoes the logo) — used as a hairline accent where sections rise, as the hero's video composition, as an Ocasional divider.
  - *Fine hairline grids* (1px, `#1F1F1F`) overlayed on hero and stats — evokes targeting UI without being literal.
  - *Crosshair / reticle marks* — small corner brackets `[`  `]` around accented numbers and buttons.
  - *Telemetry readouts* — tiny monospace captions above headings (e.g. `[ 01 · SYSTEMS ]`, `[ ALT-000042M · AZ-173 ]`).
  - *Grain* — a very subtle film-grain overlay on the hero video only.
- **Layout**:
  - Asymmetric. Generous negative space. Content aligned to a 12-col desktop grid with strong left-alignment.
  - Max container `max-w-6xl`, hero stretches full-width.
  - Content density matches gravity: headlines large, body text compact, data numeric and monospace.
- **Motion**: restrained and purposeful.
  - Hero: looped interceptor takeoff video (muted, autoplay, `playsinline`). One animated ascending light-beam trail on the logo.
  - Scroll reveal: section headers fade-up once on viewport entry. Nothing else animates on scroll.
  - Hover: amber accent appears on primary actions only.
  - `prefers-reduced-motion`: disables the video loop (replace with poster) and all fades.
  - Numbers never count up. Cards never tilt on hover.
- **Iconography**: Lucide via `astro-icon`, hairline stroke, amber only when the icon represents status/action (never decorative).
- **Imagery**: real product photography only. No stock photos ever. No illustrations of drones. No renders. If we don't have a real photo, we use typography instead.
- **Dark mode**: dark is the only mode. There is no light mode toggle.

**Reference benchmarks** (go look at these when in doubt):
- [Anduril Industries](https://anduril.com) — operational language, product-first
- [SpaceX mission pages](https://www.spacex.com/launches/) — pure black, typographic authority
- [Palantir](https://www.palantir.com) — data-dense, institutional
- [Loro Piana](https://www.loropiana.com) — restraint and quality signals in dark mode

**Anti-references** (what this site must NEVER resemble):
- Generic SaaS landing pages (gradient heroes, cartoon illustrations, feature icon grids)
- Anime/gamer "tacticool" aesthetic (neon, glitch effects, skulls, angular 3D)
- Startup template designs (floating cards with purple gradient shadows, Inter/Space Grotesk, "Get started in seconds")
- Patriotic clichés (Ukraine blue/yellow everywhere, trident iconography as decoration)
- AI-generated photo aesthetic (blurred uncanny drones on orange skies, etc.)

### Design Principles

Five principles that override any aesthetic opinion when they conflict. Use them to resolve design arguments.

1. **Gravity over delight.** Every pixel should read like a tool. If a treatment makes the page feel fun, charming, or exciting, it is wrong. This is a weapons-system vendor. Delight lives in legibility, precision, and the absence of friction — never in decoration.
2. **Real evidence over claim.** Stats must be paired with a source or a date. Photography must be real product or real operator. Press mentions go with outlet logos. We show, we don't tell. An empty section is better than a filler section.
3. **Monochrome with one accent.** The amber `#C9A46A` is used *sparingly* — the rule of thumb is "one amber element per viewport at most." If you feel the need to reach for a second color, the design is wrong.
4. **Mono for data, sans for language.** Every numeric quantity, unit, designation, coordinate, code, and timestamp is monospaced (JetBrains Mono). Everything the user reads as prose is in Söhne. This is non-negotiable — it is the site's signature.
5. **Ukrainian and English are equal citizens.** Never design in English first and translate after. Cyrillic glyph widths differ from Latin; the grid must accommodate both. Review every layout in both locales before declaring it done.

**Hard bans (AI-slop prevention, enforced in linter):**
- No em dashes (—) in copy. Use periods or restructure.
- No `Inter`, `Roboto`, `Space Grotesk`, `Poppins`, `DM Sans` — even as fallback beyond `ui-sans-serif`.
- No purple. No gradients. No glassmorphism. No "mesh" backgrounds.
- No emojis in copy or file content.
- No phrases: *revolutionary, cutting-edge, game-changer, seamless, empower, leverage, unlock, elevate, unleash, that's why we built, we're excited to announce, thrilled to share, next-generation, industry-leading, state-of-the-art, world-class*.

### Accessibility

- Target **WCAG 2.2 AA**. Text on `#0A0A0A` must be ≥ 4.5:1 — `#F5F5F4` easily passes; `#7F7F78` is reserved for non-essential secondary text only and is kept above 4.5:1 against `#0A0A0A`.
- Full keyboard navigation with visible focus rings (`outline: 2px solid #C9A46A; outline-offset: 2px`).
- Language switcher exposes `lang` attribute and `hreflang`.
- Video hero respects `prefers-reduced-motion` (falls back to poster frame).
- Form labels are always visible, never placeholder-only.
- Semantic landmarks: `<header>`, `<main>`, `<nav>`, `<footer>`, one `<h1>` per page.
- No text baked into images. Logo is SVG with `<title>`.

---

## Tech Stack

Astro 6 + Tailwind CSS v4 + TypeScript. **Zero client-side React.** Interactive pieces use native HTML (`<details>`, `<dialog>`, `[popover]`) plus small vanilla `<script>` blocks. No `client:*` directives anywhere.

**Core plugins** (mirrors `/Users/dkoziatynskyi/Projects/landing` patterns):
- `@astrojs/sitemap` — sitemap + hreflang
- `astro-seo` — canonical + OG + Twitter meta
- `astro-capo` — head-ordering optimization
- `astro-compressor` — gzip + brotli output
- `astro-icon` + `@iconify-json/lucide` — SSR-inlined icons (explicit allowlist)
- `astro-robots-txt` — `robots.txt` generation
- `astro-tunnel` — dev-only public URL
- Custom `indexnow` integration (prod + CI only)
- `sharp` — image optimization
- Web3Forms for contact form (no server required)

**Localization**: EN (default, root `/`) + UK (`/uk/`). Thin wrappers in `src/pages/uk/` reuse `src/page-content/` components that accept a `locale` prop. Pattern identical to the landing project.

**Hosting**: Cloudflare Pages.

---

## Commands

*(Will be live once scaffolding is in place.)*

```bash
npm run dev       # Astro dev server with hot reload
npm run build     # Production build (generates llms-full.txt, then astro build)
npm run preview   # Preview the production build locally
npm run format    # Prettier write
```

---

## Directory Structure

```
src/
  assets/
    brand/          # logo.svg, logo-mark.svg, wordmark.svg
    photos/         # gallery webp/avif outputs
    video/          # hero-loop.mp4 + hero-loop.webm + poster.avif
  components/
    astro/          # All UI components (SSR + vanilla inline scripts)
    layout/         # Header, Footer, Nav
  content/          # (if/when needed for roles, press)
  data/
    roles.ts        # 5 career roles (slug, title, team, location, etc.)
    press.ts        # Press articles (url, outlet, date, pullquote, thumb)
    advantages.ts   # 6 advantage items
    legal.ts        # Legal entity per locale
    social.ts       # Company social placeholders
  i18n/
    types.ts, config.ts, utils.ts, entities.ts
    en/, uk/        # Per-locale translations
  layouts/
    Layout.astro            # Marketing layout
  page-content/
    LandingPage.astro       # 7-block landing
    CareersIndex.astro
    CareerDetail.astro
  pages/
    index.astro → uses LandingPage.astro
    careers/index.astro → CareersIndex
    careers/[slug].astro → CareerDetail
    uk/...               (mirror)
    api/contact.ts       (optional — Web3Forms is client-side)
  scripts/
    posthog-init.ts or gtm-init.ts
    scroll-reveal.ts
    analytics.ts
  styles/
    global.css              # CSS vars, @font-face, base
    tokens.css              # Design tokens only
  utils/
    seo-constants.ts
    schema.ts               # Organization, JobPosting, etc. builders
```

---

## Performance Guardrails

Follow these deliberately from day one.

- `build.inlineStylesheets: 'always'` in `astro.config.mjs` — no render-blocking CSS request.
- No `client:*` directives. Ever. Use native HTML + inline `<script>` for anything interactive.
- Self-host Söhne + JetBrains Mono + Onest (dev fallback) in `public/fonts/`. No Google Fonts.
- Third-party JS (GTM, analytics) defers to first user interaction or `requestIdleCallback` timeout. Never an unconditional `<script src>` in a layout.
- The hero video is served as MP4 (H.264 baseline for compatibility) + WebM (VP9 or AV1) with a poster frame `.avif`. The video is `<video muted autoplay loop playsinline preload="metadata">` and is lazy-unpaused when in viewport.
- Images are AVIF primary, WebP fallback, JPEG last — served with `<picture>` when the layout warrants it.

---

## SEO / GEO / AEO

See `docs/plans/2026-04-23-tenebris-landing-design.md` for the full plan. High-level:

- **Schemas** (JSON-LD): `Organization` (subtype `Manufacturer`, with `foundingLocation` + `legalName` + `taxID`), `WebSite`, `BreadcrumbList` on every page, `JobPosting` × 5 (one per career detail page), `ContactPoint` × 3, `ItemList` of press mentions.
- **Hreflang**: every page self-refs plus the alternate locale plus `x-default → en`.
- **Sitemap**: auto + hreflang annotations + custom entries for career detail pages.
- **AEO**: `llms.txt` + `llms-full.txt` at root. `robots.txt` explicitly allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, CCBot.
- **OG image**: custom 1200×630 hero still (black with vertical beam + "Tenebris" wordmark) exported from the design, inlined as the default for the entire site.
- **Favicons**: full set (16, 32, 48, 192, 512 PNG + apple-touch + safari pinned `.svg` + maskable `.png` + `manifest.webmanifest`).

---

## Code Formatting

Prettier with Astro + Tailwind plugins. Same config as the landing project: single quotes, trailing commas (all), semicolons, 100-char print width, 2-space tabs.

---

## Copy Rules (Anti-AI-Slop)

These are hard rules. Enforced in a post-edit linter.

- Never use em dashes (—). Replace with period, comma, colon, or restructure the sentence.
- Never use the banned phrases from the Design Principles section above.
- Paragraphs are 2-3 sentences max. No walls of text.
- Every numeric claim must have a source or date next to it.
- Copy is written in the user's voice per locale. Ukrainian is not translated English — a native Ukrainian speaker reviews.

---
