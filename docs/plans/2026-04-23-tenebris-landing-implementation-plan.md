# Tenebris Landing Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build the production launch of `https://tenebris.com.ua` — a bilingual (EN default, UK) marketing + hiring site for a Ukrainian defense-tech company, deployed to Cloudflare Pages.

**Architecture:** Astro 6 static-site generator with islands-free vanilla JS, Tailwind CSS v4 for styling, i18n via Starlight-style per-locale route wrappers that reuse shared `page-content/` components. All content lives in typed TS data files and i18n modules; the site rebuilds from source with zero runtime data fetches. Web3Forms handles the contact form, and Google Tag Manager is deferred to first user interaction to protect the critical path.

**Tech Stack:** Astro 6, Tailwind v4 (`@tailwindcss/vite`), TypeScript strict, `astro-icon` + `@iconify-json/lucide`, `astro-seo`, `astro-capo`, `astro-compressor`, `@astrojs/sitemap`, `astro-robots-txt`, `sharp` (build-time image), `astro-tunnel` (dev), Web3Forms (contact), Cloudflare Pages (host).

**Reference repo:** `/Users/dkoziatynskyi/Projects/landing` — same tech stack, proven patterns. Copy structure, not content.

**Design authority:** `/Users/dkoziatynskyi/Projects/tenebris/CLAUDE.md` + `/Users/dkoziatynskyi/Projects/tenebris/docs/plans/2026-04-23-tenebris-landing-design.md`. These two files override any aesthetic disagreement.

**Hard rules (enforced):**
- No `client:*` hydration directives anywhere.
- No Google Fonts / external fonts. All fonts self-hosted in `public/fonts/`.
- No em dashes in copy. No generic fonts (Inter, Roboto, Space Grotesk). No purple. No gradients.
- Every numeric claim is monospace (JetBrains Mono). Every piece of prose is Söhne.
- EN + UK must ship together — never just one.

---

## Phase 0 — Project Scaffold

### Task 0.1: Initialize the project

**Files:**
- Create: `package.json`, `tsconfig.json`, `.gitignore` (extend existing), `.prettierrc`, `.prettierignore`, `astro.config.mjs`, `src/env.d.ts`

**Step 1: Run `npm init` and confirm `package.json` skeleton**

```bash
cd /Users/dkoziatynskyi/Projects/tenebris
npm init -y
```

**Step 2: Overwrite `package.json` with the pinned dependency set**

```json
{
  "name": "tenebris-landing",
  "type": "module",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "node scripts/generate-llms-full.mjs && astro build",
    "preview": "astro preview",
    "astro": "astro",
    "check": "astro check",
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  },
  "dependencies": {
    "@astrojs/sitemap": "^3.5.0",
    "@iconify-json/lucide": "^1.2.102",
    "@tailwindcss/vite": "^4.1.11",
    "astro": "^6.1.8",
    "astro-capo": "^0.0.1",
    "astro-compressor": "^1.2.0",
    "astro-icon": "^1.1.5",
    "astro-robots-txt": "^1.0.0",
    "astro-seo": "^1.1.0",
    "astro-tunnel": "^0.1.8",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.3.1",
    "tailwindcss": "^4.1.11"
  },
  "devDependencies": {
    "prettier": "^3.8.1",
    "prettier-plugin-astro": "^0.14.1",
    "prettier-plugin-tailwindcss": "^0.7.2",
    "sharp": "^0.34.5",
    "typescript": "^5.7.3"
  }
}
```

**Step 3: Install**

```bash
npm install
```

Expected: `node_modules/` populated, no peer warnings beyond deprecation notices for subdependencies.

**Step 4: Create `tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": ["src/**/*", "scripts/**/*", "astro.config.mjs"],
  "exclude": ["dist"],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] }
  }
}
```

**Step 5: Create `.prettierrc` and `.prettierignore`** (mirror landing project)

```json
{
  "singleQuote": true,
  "trailingComma": "all",
  "semi": true,
  "printWidth": 100,
  "tabWidth": 2,
  "plugins": ["prettier-plugin-astro", "prettier-plugin-tailwindcss"]
}
```

`.prettierignore`:
```
dist
node_modules
public/fonts
public/llms-full.txt
*.md
```

**Step 6: Extend `.gitignore`**

Append to existing:
```
# Build
dist/
.astro/

# Dependencies
node_modules/

# Local env
.env
.env.local
.dev.vars

# OS
.DS_Store
Thumbs.db

# Editor
.vscode/
.idea/

# Temp
*.log
```

**Step 7: Commit**

```bash
git add package.json package-lock.json tsconfig.json .prettierrc .prettierignore .gitignore
git commit -m "chore: initialize Astro project scaffold"
```

---

### Task 0.2: Write minimal `astro.config.mjs`

**Files:**
- Create: `astro.config.mjs`
- Create: `src/env.d.ts`

**Step 1: Write `astro.config.mjs`**

```js
// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';
import compressor from 'astro-compressor';
import tunnel from 'astro-tunnel';

const isDev = process.env.NODE_ENV !== 'production';

export default defineConfig({
  site: 'https://tenebris.com.ua',
  trailingSlash: 'always',
  prefetch: { defaultStrategy: 'viewport', prefetchAll: false },
  build: {
    concurrency: 2,
    inlineStylesheets: 'always',
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'uk'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    icon({
      include: {
        lucide: [
          'arrow-right', 'arrow-up-right', 'chevron-right', 'chevron-down',
          'mail', 'phone', 'menu', 'x', 'check', 'external-link',
          'target', 'radio', 'radar', 'plane', 'map-pin', 'globe',
        ],
      },
    }),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', uk: 'uk' },
      },
      filter: (page) => !/\/404\/?$/.test(page),
    }),
    robotsTxt({
      sitemap: ['https://tenebris.com.ua/sitemap-index.xml'],
      policy: [
        { userAgent: '*', allow: ['/'], disallow: ['/_astro/'] },
        { userAgent: 'GPTBot', allow: ['/'] },
        { userAgent: 'ClaudeBot', allow: ['/'] },
        { userAgent: 'PerplexityBot', allow: ['/'] },
        { userAgent: 'Google-Extended', allow: ['/'] },
        { userAgent: 'Applebot-Extended', allow: ['/'] },
        { userAgent: 'CCBot', allow: ['/'] },
      ],
    }),
    compressor({ gzip: true, brotli: true }),
    ...(isDev ? [tunnel()] : []),
  ],
  vite: {
    plugins: [tailwindcss()],
    server: { host: true },
  },
  server: { host: true },
});
```

**Step 2: Write `src/env.d.ts`**

```ts
/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly PUBLIC_GTM_ID?: string;
  readonly PUBLIC_WEB3FORMS_KEY?: string;
  readonly PUBLIC_SITE_URL?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

**Step 3: Create an empty `src/pages/index.astro` stub so `astro check` succeeds**

```astro
---
---
<html lang="en"><body><p>scaffold</p></body></html>
```

**Step 4: Verify**

```bash
npm run check
```

Expected: 0 errors, 0 warnings (may report hints about missing translations — ignore until i18n is wired).

**Step 5: Commit**

```bash
git add astro.config.mjs src/env.d.ts src/pages/index.astro
git commit -m "chore: scaffold astro config, i18n, env types"
```

---

## Phase 1 — Design Tokens & Fonts

### Task 1.1: Ship the typographic foundation

**Files:**
- Create: `public/fonts/` with 6 `.woff2` files
- Create: `src/styles/global.css`
- Create: `src/styles/tokens.css`

**Step 1: Fetch JetBrains Mono + Geist (dev fallback) `.woff2`**

```bash
mkdir -p /Users/dkoziatynskyi/Projects/tenebris/public/fonts
cd /Users/dkoziatynskyi/Projects/tenebris/public/fonts

# JetBrains Mono: Regular + Medium
curl -L -o jetbrains-mono-regular.woff2 'https://github.com/JetBrains/JetBrainsMono/raw/master/fonts/webfonts/JetBrainsMono-Regular.woff2'
curl -L -o jetbrains-mono-medium.woff2 'https://github.com/JetBrains/JetBrainsMono/raw/master/fonts/webfonts/JetBrainsMono-Medium.woff2'

# Geist Sans: Regular + Medium + SemiBold + Bold
curl -L -o geist-regular.woff2 'https://github.com/vercel/geist-font/raw/main/packages/next/src/fonts/geist-sans/Geist-Regular.woff2'
curl -L -o geist-medium.woff2 'https://github.com/vercel/geist-font/raw/main/packages/next/src/fonts/geist-sans/Geist-Medium.woff2'
curl -L -o geist-semibold.woff2 'https://github.com/vercel/geist-font/raw/main/packages/next/src/fonts/geist-sans/Geist-SemiBold.woff2'
curl -L -o geist-bold.woff2 'https://github.com/vercel/geist-font/raw/main/packages/next/src/fonts/geist-sans/Geist-Bold.woff2'

ls -la
```

Expected: six `.woff2` files, each ≥ 20 KB and ≤ 150 KB.

**Step 2: Create `src/styles/tokens.css`**

```css
@layer base {
  :root {
    /* Color — three explicit roles */
    --color-bg: #0a0a0a;
    --color-bg-raised: #121212;
    --color-border: #1f1f1f;
    --color-border-strong: #2a2a2a;
    --color-fg: #f5f5f4;
    --color-fg-muted: #7f7f78;
    --color-fg-dim: #4f4f49;
    --color-accent: #c9a46a;
    --color-accent-hover: #d9b47a;
    --color-accent-dim: #8f7448;

    /* Typography */
    --font-display: 'Söhne', 'Geist', ui-sans-serif, system-ui, sans-serif;
    --font-sans: 'Söhne', 'Geist', ui-sans-serif, system-ui, sans-serif;
    --font-mono: 'JetBrains Mono', ui-monospace, 'SFMono-Regular', 'Menlo', monospace;

    /* Spacing + radii */
    --radius-card: 4px;
    --radius-field: 2px;

    /* Motion */
    --ease-standard: cubic-bezier(0.2, 0, 0, 1);
    --ease-emphasis: cubic-bezier(0.3, 0, 0, 1);

    color-scheme: dark;
  }

  @media (prefers-reduced-motion: reduce) {
    :root {
      --ease-standard: steps(1, end);
      --ease-emphasis: steps(1, end);
    }
  }
}
```

**Step 3: Create `src/styles/global.css`**

```css
@import 'tailwindcss';
@import './tokens.css';

@theme {
  --font-display: 'Söhne', 'Geist', ui-sans-serif, system-ui, sans-serif;
  --font-sans: 'Söhne', 'Geist', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;

  --color-bg: #0a0a0a;
  --color-bg-raised: #121212;
  --color-border: #1f1f1f;
  --color-border-strong: #2a2a2a;
  --color-fg: #f5f5f4;
  --color-fg-muted: #7f7f78;
  --color-fg-dim: #4f4f49;
  --color-accent: #c9a46a;
  --color-accent-hover: #d9b47a;
  --color-accent-dim: #8f7448;
}

/* Self-hosted fonts */
@font-face {
  font-family: 'JetBrains Mono';
  src: url('/fonts/jetbrains-mono-regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
  unicode-range: U+0000-00FF, U+0100-024F, U+0400-04FF, U+2000-206F, U+2070-209F, U+20A0-20CF, U+2100-214F, U+2190-21FF;
}
@font-face {
  font-family: 'JetBrains Mono';
  src: url('/fonts/jetbrains-mono-medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
  unicode-range: U+0000-00FF, U+0100-024F, U+0400-04FF, U+2000-206F, U+2070-209F, U+20A0-20CF, U+2100-214F, U+2190-21FF;
}

@font-face {
  font-family: 'Geist';
  src: url('/fonts/geist-regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
  unicode-range: U+0000-00FF, U+0100-024F, U+0400-04FF, U+2000-206F, U+2070-209F, U+20A0-20CF;
}
@font-face {
  font-family: 'Geist';
  src: url('/fonts/geist-medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
  unicode-range: U+0000-00FF, U+0100-024F, U+0400-04FF, U+2000-206F, U+2070-209F, U+20A0-20CF;
}
@font-face {
  font-family: 'Geist';
  src: url('/fonts/geist-semibold.woff2') format('woff2');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
  unicode-range: U+0000-00FF, U+0100-024F, U+0400-04FF, U+2000-206F, U+2070-209F, U+20A0-20CF;
}
@font-face {
  font-family: 'Geist';
  src: url('/fonts/geist-bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
  unicode-range: U+0000-00FF, U+0100-024F, U+0400-04FF, U+2000-206F, U+2070-209F, U+20A0-20CF;
}

/* Base resets */
* {
  box-sizing: border-box;
}
html, body {
  margin: 0;
  padding: 0;
}
html {
  background: var(--color-bg);
  color: var(--color-fg);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  font-feature-settings: 'ss01', 'cv11';
}
body {
  min-height: 100dvh;
  font-size: 16px;
  line-height: 1.5;
}
::selection {
  background: var(--color-accent);
  color: var(--color-bg);
}

/* Focus */
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
*:focus:not(:focus-visible) {
  outline: none;
}

/* Util: hairline grid */
.bg-grid {
  background-image:
    linear-gradient(to right, var(--color-border) 1px, transparent 1px),
    linear-gradient(to bottom, var(--color-border) 1px, transparent 1px);
  background-size: 64px 64px;
}
```

**Step 4: Commit**

```bash
git add public/fonts src/styles
git commit -m "feat: ship fonts and design tokens"
```

---

### Task 1.2: Vectorize the logo

**Files:**
- Create: `src/assets/brand/logo-mark.svg`
- Create: `src/assets/brand/wordmark.svg`
- Create: `src/assets/brand/logo-full.svg`

**Step 1: Hand-draft the SVG from the raster reference at `/tmp/tenebris_logo/word/media/image1.png`**

The source is a 262×262 black square with a white trapezoidal beam rising from the bottom and the word "Tenebris" inside the bottom band. Recreate cleanly:

```svg
<!-- src/assets/brand/logo-mark.svg -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="Tenebris mark">
  <rect width="64" height="64" rx="0" fill="#0a0a0a" />
  <!-- ascending beam: trapezoid from base to apex, slightly short of top -->
  <path d="M28.8 10 L35.2 10 L46 54 L18 54 Z" fill="#f5f5f4" />
</svg>
```

```svg
<!-- src/assets/brand/wordmark.svg -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 24" role="img" aria-label="Tenebris">
  <text x="0" y="18" font-family="Geist, ui-sans-serif" font-weight="600" font-size="20" letter-spacing="1" fill="#f5f5f4">Tenebris</text>
</svg>
```

```svg
<!-- src/assets/brand/logo-full.svg -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 80" role="img" aria-label="Tenebris">
  <rect width="64" height="64" rx="0" fill="#0a0a0a" />
  <path d="M28.8 10 L35.2 10 L46 50 L18 50 Z" fill="#f5f5f4" />
  <text x="32" y="75" font-family="Geist, ui-sans-serif" font-weight="600" font-size="10" letter-spacing="1" fill="#f5f5f4" text-anchor="middle">Tenebris</text>
</svg>
```

**Step 2: Spot-check visually in the browser** — open each SVG directly; it must read cleanly at 24, 64, 256 px and match the raster's silhouette (beam should taper upward, not downward).

**Step 3: Commit**

```bash
git add src/assets/brand
git commit -m "feat: add vector logo marks"
```

---

### Task 1.3: Generate the favicon set

**Files:**
- Create: `public/favicon.ico`, `public/favicon.svg`, `public/apple-touch-icon.png`, `public/icons/icon-192.png`, `public/icons/icon-512.png`, `public/icons/icon-512-maskable.png`, `public/safari-pinned-tab.svg`, `public/manifest.webmanifest`
- Create: `scripts/generate-favicons.mjs`

**Step 1: Write `scripts/generate-favicons.mjs` using sharp**

```js
import sharp from 'sharp';
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const SVG = readFileSync(resolve('src/assets/brand/logo-mark.svg'));

mkdirSync(resolve('public/icons'), { recursive: true });

const sizes = [
  { out: 'public/favicon.svg', copy: true },
  { out: 'public/safari-pinned-tab.svg', copy: true, monochrome: true },
  { out: 'public/apple-touch-icon.png', size: 180 },
  { out: 'public/icons/icon-192.png', size: 192 },
  { out: 'public/icons/icon-512.png', size: 512 },
  { out: 'public/icons/icon-512-maskable.png', size: 512, padding: 0.2 },
];

for (const s of sizes) {
  if (s.copy && s.monochrome) {
    writeFileSync(resolve(s.out), SVG.toString().replace('#0a0a0a', 'transparent').replace('#f5f5f4', 'black'));
    continue;
  }
  if (s.copy) {
    writeFileSync(resolve(s.out), SVG);
    continue;
  }
  const pad = s.padding ? Math.round(s.size * s.padding) : 0;
  await sharp(SVG, { density: 600 })
    .resize(s.size - pad * 2, s.size - pad * 2)
    .extend({ top: pad, bottom: pad, left: pad, right: pad, background: '#0a0a0a' })
    .png()
    .toFile(resolve(s.out));
}

// ICO multi-size
await sharp(SVG, { density: 600 })
  .resize(48, 48)
  .toFormat('png')
  .toFile(resolve('public/favicon-48.png'));
// ico is just a png renamed when modern browsers use the svg; but some clients want real ico:
// astro serves /favicon.ico from public/; write a 32px PNG and rename — modern browsers accept.
await sharp(SVG, { density: 600 })
  .resize(32, 32)
  .png()
  .toFile(resolve('public/favicon.ico'));

console.log('favicons generated');
```

**Step 2: Add the script to `package.json > scripts`**

Insert between `"build"` and `"preview"`:

```json
"favicons": "node scripts/generate-favicons.mjs",
```

**Step 3: Run it once**

```bash
npm run favicons
ls -la public/ public/icons/
```

Expected: all files listed, PNGs between 1 KB and 20 KB.

**Step 4: Write `public/manifest.webmanifest`**

```json
{
  "name": "Tenebris",
  "short_name": "Tenebris",
  "description": "Ukrainian interceptor drone systems.",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0a0a0a",
  "theme_color": "#0a0a0a",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "/icons/icon-512-maskable.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
}
```

**Step 5: Commit**

```bash
git add public scripts/generate-favicons.mjs package.json
git commit -m "feat: generate favicons + PWA manifest"
```

---

## Phase 2 — Media Processing

### Task 2.1: Transcode hero video

**Files:**
- Create: `public/video/hero-loop.mp4`, `public/video/hero-loop.webm`, `public/video/hero-poster.avif`
- Create: `scripts/process-media.mjs`

**Step 1: Verify ffmpeg is installed**

```bash
which ffmpeg
```

Expected: `/opt/homebrew/bin/ffmpeg` or similar.

**Step 2: Write `scripts/process-media.mjs`**

```js
import { execSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const SRC_VIDEO = '/Users/dkoziatynskyi/Downloads/IMG_1952.MP4';
mkdirSync(resolve('public/video'), { recursive: true });

const mp4 = resolve('public/video/hero-loop.mp4');
const webm = resolve('public/video/hero-loop.webm');
const poster = resolve('public/video/hero-poster.avif');

// Strip audio, downscale to max 720p, cap bitrate for web
const common = '-an -vf "scale=-2:1280" -movflags +faststart';

execSync(`ffmpeg -y -i "${SRC_VIDEO}" -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p ${common} "${mp4}"`, { stdio: 'inherit' });
execSync(`ffmpeg -y -i "${SRC_VIDEO}" -c:v libvpx-vp9 -crf 34 -b:v 0 -row-mt 1 ${common} "${webm}"`, { stdio: 'inherit' });
// Poster frame at 1 second in
execSync(`ffmpeg -y -ss 1 -i "${SRC_VIDEO}" -frames:v 1 -vf "scale=-2:1280" -c:v libaom-av1 -crf 35 "${poster}"`, { stdio: 'inherit' });

console.log('Hero media generated.');
```

**Step 3: Add `"media": "node scripts/process-media.mjs"` to `package.json > scripts`. Run once**

```bash
npm run media
ls -lah public/video/
```

Expected: `.mp4` ≤ 3 MB, `.webm` ≤ 2 MB, `.avif` ≤ 80 KB. If larger, bump CRF values.

**Step 4: Commit**

```bash
git add public/video scripts/process-media.mjs package.json
git commit -m "feat: transcode hero video + AVIF poster"
```

---

### Task 2.2: Optimize gallery photos

**Files:**
- Create: `public/photos/*.avif`, `public/photos/*.webp`
- Extend: `scripts/process-media.mjs`

**Step 1: Extend `scripts/process-media.mjs` with an image loop**

Append:

```js
import sharp from 'sharp';
import { readdirSync } from 'node:fs';
import { basename, extname } from 'node:path';

const PHOTO_SRC = '/Users/dkoziatynskyi/Downloads/tenebris photos';
mkdirSync(resolve('public/photos'), { recursive: true });

for (const file of readdirSync(PHOTO_SRC)) {
  if (!/\.(webp|png|jpe?g)$/i.test(file)) continue;
  const name = basename(file, extname(file));
  const src = `${PHOTO_SRC}/${file}`;

  // 1600px max, AVIF + WebP
  await sharp(src).resize({ width: 1600, withoutEnlargement: true }).avif({ quality: 55 }).toFile(resolve(`public/photos/${name}-1600.avif`));
  await sharp(src).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 70 }).toFile(resolve(`public/photos/${name}-1600.webp`));

  // 800px variants for mobile
  await sharp(src).resize({ width: 800, withoutEnlargement: true }).avif({ quality: 55 }).toFile(resolve(`public/photos/${name}-800.avif`));
  await sharp(src).resize({ width: 800, withoutEnlargement: true }).webp({ quality: 70 }).toFile(resolve(`public/photos/${name}-800.webp`));
}

console.log('Photos optimized.');
```

**Step 2: Re-run**

```bash
npm run media
ls -lah public/photos/ | head
```

Expected: each AVIF ≤ 120 KB, each WebP ≤ 180 KB.

**Step 3: Commit**

```bash
git add public/photos scripts/process-media.mjs
git commit -m "feat: optimize gallery photos to avif+webp"
```

---

### Task 2.3: Draft the default OG image

**Files:**
- Create: `public/og-default.png`
- Create: `scripts/generate-og-default.mjs`

**Step 1: Write generator**

```js
import sharp from 'sharp';
import { resolve } from 'node:path';

const svg = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#0a0a0a"/>
  <path d="M594 120 L606 120 L624 510 L576 510 Z" fill="#f5f5f4"/>
  <text x="600" y="560" fill="#f5f5f4" font-family="Geist, sans-serif" font-weight="600" font-size="44" text-anchor="middle" letter-spacing="4">TENEBRIS</text>
  <text x="600" y="595" fill="#7f7f78" font-family="Geist, sans-serif" font-weight="400" font-size="18" text-anchor="middle" letter-spacing="2">INTERCEPTOR DRONE SYSTEMS · UA</text>
  <!-- subtle hairline grid corners -->
  <g stroke="#1f1f1f" stroke-width="1" fill="none">
    <path d="M40 40 L100 40 M40 40 L40 100"/>
    <path d="M1160 40 L1100 40 M1160 40 L1160 100"/>
    <path d="M40 590 L100 590 M40 590 L40 530"/>
    <path d="M1160 590 L1100 590 M1160 590 L1160 530"/>
  </g>
</svg>`);

await sharp(svg).png().toFile(resolve('public/og-default.png'));
console.log('OG image written.');
```

**Step 2: Add `"og": "node scripts/generate-og-default.mjs"` + run**

```bash
npm run og
```

**Step 3: Preview** — open `public/og-default.png`; must read cleanly at Twitter's 600×314 scaled preview.

**Step 4: Commit**

```bash
git add public/og-default.png scripts/generate-og-default.mjs package.json
git commit -m "feat: add default OG image"
```

---

## Phase 3 — i18n Core

### Task 3.1: i18n types, config, utils

**Files:**
- Create: `src/i18n/types.ts`
- Create: `src/i18n/config.ts`
- Create: `src/i18n/utils.ts`
- Create: `src/i18n/entities.ts`

**Step 1: `src/i18n/types.ts`**

```ts
export const locales = ['en', 'uk'] as const;
export type Locale = (typeof locales)[number];

export interface LegalEntity {
  legalName: string;
  tradingName: string;
  registrationNumber: string;
  country: string;
  city: string;
  addressLine?: string;
}
```

**Step 2: `src/i18n/config.ts`**

```ts
import type { Locale } from './types';

export const defaultLocale: Locale = 'en';
export const localeLabels: Record<Locale, string> = { en: 'English', uk: 'Українська' };
export const localeHtmlLang: Record<Locale, string> = { en: 'en', uk: 'uk' };
export const localeHreflang: Record<Locale, string> = { en: 'en', uk: 'uk' };
```

**Step 3: `src/i18n/utils.ts`**

```ts
import { defaultLocale, localeHreflang } from './config';
import { locales, type Locale } from './types';

export function toLocale(x: string | undefined): Locale {
  return (locales as readonly string[]).includes(x ?? '') ? (x as Locale) : defaultLocale;
}

export function localizeUrl(path: string, locale: Locale): string {
  const [pathOnly, hash] = path.split('#');
  const [cleanPath, query] = pathOnly.split('?');
  const prefix = locale === defaultLocale ? '' : `/${locale}`;
  const finalPath = cleanPath === '/' ? `${prefix}/` : `${prefix}${cleanPath}`;
  return `${finalPath}${query ? '?' + query : ''}${hash ? '#' + hash : ''}`;
}

export function getHreflangAlternates(pathname: string, siteUrl = 'https://tenebris.com.ua') {
  // pathname must be locale-independent (strip /uk/ prefix first)
  const stripped = pathname.replace(/^\/uk(\/|$)/, '/');
  const out: Array<{ hreflang: string; href: string }> = [];
  for (const l of locales) {
    out.push({
      hreflang: localeHreflang[l],
      href: `${siteUrl}${localizeUrl(stripped, l)}`,
    });
  }
  out.push({ hreflang: 'x-default', href: `${siteUrl}${stripped}` });
  return out;
}

export function getPathnameLocaleStripped(pathname: string): string {
  return pathname.replace(/^\/uk(\/|$)/, '/');
}
```

**Step 4: `src/i18n/entities.ts`**

```ts
import type { LegalEntity, Locale } from './types';

const ukEntity: LegalEntity = {
  legalName: 'Товариство з обмеженою відповідальністю «Тенебріс»',
  tradingName: 'Tenebris',
  registrationNumber: '45226064',
  country: 'Ukraine',
  city: 'Kyiv',
};

const enEntity: LegalEntity = {
  legalName: 'Tenebris LLC',
  tradingName: 'Tenebris',
  registrationNumber: '45226064',
  country: 'Ukraine',
  city: 'Kyiv',
};

export function getLegalEntity(locale: Locale): LegalEntity {
  return locale === 'uk' ? ukEntity : enEntity;
}
```

**Step 5: Commit**

```bash
git add src/i18n
git commit -m "feat: add i18n types, config, utils, entities"
```

---

### Task 3.2: Shared common translations

**Files:**
- Create: `src/i18n/en/common.ts`
- Create: `src/i18n/uk/common.ts`
- Create: `src/i18n/common.ts`

**Step 1: `src/i18n/en/common.ts`**

```ts
export const common = {
  nav: {
    systems: 'Systems',
    advantages: 'Capabilities',
    training: 'Training',
    press: 'Press',
    careers: 'Careers',
    contact: 'Contact',
  },
  cta: {
    requestCooperation: 'Request cooperation',
    viewSystems: 'View systems',
    applyRole: 'Apply',
    seeAllRoles: 'See all roles',
    contactUs: 'Contact',
    sendMessage: 'Send message',
  },
  footer: {
    rights: 'All rights reserved.',
    registrationLabel: 'Registration',
  },
  a11y: {
    skipToContent: 'Skip to content',
    switchLanguage: 'Switch language',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },
  form: {
    required: '(required)',
    sending: 'Sending…',
    success: 'Received. We will respond shortly.',
    error: 'Submission failed. Try again or reach us by phone.',
  },
} as const;
```

**Step 2: `src/i18n/uk/common.ts`** (same shape, Ukrainian)

```ts
export const common = {
  nav: {
    systems: 'Системи',
    advantages: 'Можливості',
    training: 'Навчання',
    press: 'Преса',
    careers: 'Кар’єра',
    contact: 'Контакти',
  },
  cta: {
    requestCooperation: 'Запит на співпрацю',
    viewSystems: 'Детальніше',
    applyRole: 'Відгукнутись',
    seeAllRoles: 'Усі вакансії',
    contactUs: 'Контакти',
    sendMessage: 'Надіслати',
  },
  footer: {
    rights: 'Усі права захищено.',
    registrationLabel: 'ЄДРПОУ',
  },
  a11y: {
    skipToContent: 'Перейти до контенту',
    switchLanguage: 'Змінити мову',
    openMenu: 'Відкрити меню',
    closeMenu: 'Закрити меню',
  },
  form: {
    required: '(обов’язково)',
    sending: 'Надсилаю…',
    success: 'Отримано. Невдовзі відповімо.',
    error: 'Не вдалося надіслати. Спробуйте ще або зателефонуйте.',
  },
} as const;
```

**Step 3: `src/i18n/common.ts`**

```ts
import { common as en } from './en/common';
import { common as uk } from './uk/common';
import type { Locale } from './types';

export const commonTranslations: Record<Locale, typeof en> = { en, uk };
```

**Step 4: Commit**

```bash
git add src/i18n
git commit -m "feat: add common translations EN/UK"
```

---

## Phase 4 — Data Layer

### Task 4.1: Roles, press, advantages, stats, systems

**Files:**
- Create: `src/data/roles.ts`, `src/data/press.ts`, `src/data/advantages.ts`, `src/data/stats.ts`, `src/data/systems.ts`, `src/data/contacts.ts`, `src/data/social.ts`

**Step 1: `src/data/roles.ts`**

```ts
export type RoleSlug =
  | 'r-and-d-engineer'
  | 'design-engineer'
  | 'combat-uav-pilot'
  | 'electronics-engineer'
  | 'service-engineer';

export interface Role {
  slug: RoleSlug;
  icon: string;
  employmentType: 'FULL_TIME' | 'CONTRACT';
  baseLocation: string;
  remote: boolean;
  postedISO: string;
  validThroughISO: string;
}

export const roles: Role[] = [
  { slug: 'r-and-d-engineer',      icon: 'lucide:radar',   employmentType: 'FULL_TIME', baseLocation: 'Kyiv, Ukraine', remote: false, postedISO: '2026-04-23', validThroughISO: '2027-04-23' },
  { slug: 'design-engineer',       icon: 'lucide:target',  employmentType: 'FULL_TIME', baseLocation: 'Kyiv, Ukraine', remote: false, postedISO: '2026-04-23', validThroughISO: '2027-04-23' },
  { slug: 'combat-uav-pilot',      icon: 'lucide:plane',   employmentType: 'FULL_TIME', baseLocation: 'Kyiv, Ukraine', remote: false, postedISO: '2026-04-23', validThroughISO: '2027-04-23' },
  { slug: 'electronics-engineer',  icon: 'lucide:radio',   employmentType: 'FULL_TIME', baseLocation: 'Kyiv, Ukraine', remote: false, postedISO: '2026-04-23', validThroughISO: '2027-04-23' },
  { slug: 'service-engineer',      icon: 'lucide:map-pin', employmentType: 'FULL_TIME', baseLocation: 'Ukraine',       remote: false, postedISO: '2026-04-23', validThroughISO: '2027-04-23' },
];
```

**Step 2: `src/data/press.ts`**

```ts
export interface PressItem {
  id: string;
  outlet: string;
  url: string;
  dateISO: string;
  lang: 'uk' | 'en';
  thumbnail: string;
  publisherCountry: string;
}

export const press: PressItem[] = [
  {
    id: 'devua-bahnet-2025',
    outlet: 'dev.ua',
    url: 'https://dev.ua/news/v-ukraini-stvoryly-dron-perekhopliuvach-bahnet-dlia-borotby-z-shakhedamy-1754572796',
    dateISO: '2025-08-07',
    lang: 'uk',
    thumbnail: '/photos/Znimok-ekrana-2025-08-06-184351-900x458-1600.webp',
    publisherCountry: 'UA',
  },
  {
    id: 'thedefender-alta-ares-2025',
    outlet: 'The Defender',
    url: 'https://thedefender.media/uk/2025/11/alta-ares-drone-presented/',
    dateISO: '2025-11-15',
    lang: 'uk',
    thumbnail: '/photos/420479_13_new_960x500_0-1600.webp',
    publisherCountry: 'UA',
  },
];
```

**Step 3: `src/data/advantages.ts`**

```ts
export interface Advantage {
  n: string; // '01'..'06'
  iconName: string;
  id: 'sealedBoxes' | 'remoteActivation' | 'multiPlatformLaunch' | 'remoteControl' | 'autoGuidance' | 'altaAres';
}

export const advantages: Advantage[] = [
  { n: '01', iconName: 'lucide:package',    id: 'sealedBoxes' },
  { n: '02', iconName: 'lucide:radio',      id: 'remoteActivation' },
  { n: '03', iconName: 'lucide:plane',      id: 'multiPlatformLaunch' },
  { n: '04', iconName: 'lucide:radar',      id: 'remoteControl' },
  { n: '05', iconName: 'lucide:target',     id: 'autoGuidance' },
  { n: '06', iconName: 'lucide:globe',      id: 'altaAres' },
];
```

**Step 4: `src/data/stats.ts`**

```ts
export interface Stat {
  value: string;
  id: 'intercepts' | 'rolesOpen' | 'inService';
}
export const stats: Stat[] = [
  { value: '100+', id: 'intercepts' },
  { value: '5',    id: 'rolesOpen'  },
  { value: '2024', id: 'inService'  },
];
```

**Step 5: `src/data/systems.ts`**

```ts
export interface SpecRow {
  key: 'class' | 'role' | 'guidance' | 'automation' | 'launch' | 'status';
}
export const systemSpecs: SpecRow[] = [
  { key: 'class' }, { key: 'role' }, { key: 'guidance' },
  { key: 'automation' }, { key: 'launch' }, { key: 'status' },
];
```

**Step 6: `src/data/contacts.ts`**

```ts
export interface ContactPerson {
  purpose: 'cooperation' | 'employment';
  nameKey: string;
  phone: string;
  phoneTel: string;
}
export const contactPeople: ContactPerson[] = [
  { purpose: 'cooperation', nameKey: 'bohdan',   phone: '+380 66 555 14 88', phoneTel: '+380665551488' },
  { purpose: 'cooperation', nameKey: 'serhii',   phone: '+380 63 850 75 77', phoneTel: '+380638507577' },
  { purpose: 'employment',  nameKey: 'kateryna', phone: '+380 95 910 58 58', phoneTel: '+380959105858' },
];
export const formRecipientEmail = 's.bohdanovskyi@tenebristech.tech';
export const publicInboxEmail = 'info@tenebris.com.ua';
```

**Step 7: `src/data/social.ts`**

```ts
export const socialLinks = {
  // Placeholders — populate when real handles exist.
  linkedin: null as string | null,
  instagram: null as string | null,
  x: null as string | null,
  telegram: null as string | null,
  youtube: null as string | null,
};
```

**Step 8: Commit**

```bash
git add src/data
git commit -m "feat: add typed data layer (roles, press, advantages, stats, systems, contacts)"
```

---

### Task 4.2: Locale-specific translations for roles + advantages + press + home

**Files:**
- Create: `src/i18n/en/roles.ts`, `src/i18n/uk/roles.ts`
- Create: `src/i18n/en/advantages.ts`, `src/i18n/uk/advantages.ts`
- Create: `src/i18n/en/systems.ts`, `src/i18n/uk/systems.ts`
- Create: `src/i18n/en/pages/home.ts`, `src/i18n/uk/pages/home.ts`
- Create: `src/i18n/en/pages/careers.ts`, `src/i18n/uk/pages/careers.ts`

Each file exports a constant keyed by slug/id with `title`, `summary`, `description`, etc.

**Step 1: Write all EN + UK files per the structure in the design doc, using the copywriting skill for the copy pass.**

Before writing final copy, invoke `/copywriting` to draft the landing copy in EN + UK. Then run each string through `/humanizer` to strip AI slop. Em dashes, superlatives, and banned phrases (CLAUDE.md > Copy Rules) are automatic rejects.

File skeleton example (`src/i18n/en/pages/home.ts`):

```ts
export const home = {
  meta: {
    title: 'Tenebris · Interceptor drone systems',
    description: 'Ukrainian interceptor drones. Maximum automation, minimum operator training. Combat-proven, 100+ aerial targets intercepted.',
  },
  hero: {
    eyebrow: 'TNB · 2024–2026 · KYIV',
    h1: 'Automated interceptors for the aerial threat.',
    sub: 'Tenebris builds aerial-target interception systems with the highest level of automation and the lowest operator training threshold.',
  },
  proof: {
    heading: 'In service',
    intercepts: { label: 'confirmed intercepts', footnote: 'as of 2026-04' },
    rolesOpen: { label: 'open roles' },
    inService: { label: 'first delivery' },
  },
  systems: {
    eyebrow: '02 · SYSTEMS',
    heading: 'The Bahnet interceptor.',
    intro: 'Bahnet is a sealed-box, remotely activated interceptor drone. Operators launch from fixed networks or mobile platforms. Terminal guidance is optical.',
    specLabels: {
      class: 'CLASS', role: 'ROLE', guidance: 'GUIDANCE',
      automation: 'AUTOMATION', launch: 'LAUNCH', status: 'STATUS',
    },
    specValues: {
      class: 'Interceptor UAV',
      role: 'Destruction of Shahed-class aerial targets',
      guidance: 'Alta Ares optical seeker (France)',
      automation: 'Automatic takeoff and terminal guidance',
      launch: 'Sealed-box; remote trigger',
      status: 'In active service',
    },
  },
  advantages: {
    eyebrow: '03 · CAPABILITIES',
    heading: 'What the system does.',
  },
  training: {
    eyebrow: '04 · TRAINING',
    heading: 'Remote pilot-operator training.',
    paragraph1: 'We train interceptor pilots end-to-end, remotely, from anywhere in the world. The program covers sealed-box operation, target acquisition, terminal engagement, and post-mission analysis.',
    paragraph2: 'Operators graduate ready to deploy on the Bahnet platform without on-site deployment overhead.',
    bullets: [
      'Remote, structured, cohort-based.',
      'No prior UAV combat experience required.',
      'Certification upon completion.',
    ],
    cta: 'Apply to train',
  },
  press: {
    eyebrow: '05 · PRESS',
    heading: 'Coverage.',
    readMore: 'Read the article',
    pullquotes: {
      'devua-bahnet-2025': 'Ukrainian-built interceptor for hunting Shaheds.',
      'thedefender-alta-ares-2025': 'Alta Ares: the French optical guidance system integrated into Tenebris interceptors.',
    },
  },
  careers: {
    eyebrow: '06 · CAREERS',
    heading: 'Join the team.',
    intro: 'We build systems that intercept real aerial threats over Ukraine. If you want your work to matter this year, not in 2030, look below.',
    seeAll: 'See all roles',
  },
  contact: {
    eyebrow: '07 · CONTACT',
    heading: 'Contact.',
    intro: 'Cooperation, procurement, press, and employment below.',
    form: {
      name: 'Name',
      email: 'Email',
      organization: 'Organization',
      purpose: 'Purpose',
      purposes: { cooperation: 'Cooperation', employment: 'Employment', press: 'Press', other: 'Other' },
      message: 'Message',
      submit: 'Send message',
      subjects: {
        cooperation: '[Tenebris] Cooperation inquiry',
        employment: '[Tenebris] Employment inquiry',
        press: '[Tenebris] Press inquiry',
        other: '[Tenebris] Inquiry',
      },
    },
    directHeading: 'Direct contact',
    people: {
      bohdan:   { label: 'Cooperation',  name: 'Bohdan' },
      serhii:   { label: 'Cooperation',  name: 'Serhii' },
      kateryna: { label: 'Employment',   name: 'Kateryna' },
    },
    cityLine: 'Kyiv, Ukraine',
  },
} as const;

export type HomeTranslations = typeof home;
```

**Step 2: Write UK equivalents carefully — no AI-translated strings. Each run through `/humanizer` in UK mode.**

**Step 3: Verify every value in EN has a counterpart in UK and vice versa**

```bash
node -e "
const en = require('./src/i18n/en/pages/home.ts');
const uk = require('./src/i18n/uk/pages/home.ts');
// walk both, fail on mismatch
"
```

Or use TypeScript: `HomeTranslations` from EN becomes the shared type; UK must satisfy it:

```ts
// src/i18n/uk/pages/home.ts
import type { HomeTranslations } from '../../en/pages/home';
export const home: HomeTranslations = { /* ... */ };
```

**Step 4: Commit per locale**

```bash
git add src/i18n/en
git commit -m "feat: EN translations for landing + roles + advantages"

git add src/i18n/uk
git commit -m "feat: UK translations for landing + roles + advantages"
```

---

## Phase 5 — Layout & Primitives

### Task 5.1: Layout component

**Files:**
- Create: `src/layouts/Layout.astro`
- Create: `src/components/astro/SEO.astro`
- Create: `src/components/astro/Schema.astro`

**Step 1: `src/components/astro/SEO.astro`** — wraps `astro-seo` + hreflang + canonical.

```astro
---
import { SEO as AstroSEO } from 'astro-seo';
import { getHreflangAlternates, getPathnameLocaleStripped } from '../../i18n/utils';
import { localeHtmlLang } from '../../i18n/config';
import type { Locale } from '../../i18n/types';

interface Props {
  title: string;
  description: string;
  locale: Locale;
  pathname: string; // Astro.url.pathname
  ogImage?: string;
}
const { title, description, locale, pathname, ogImage = '/og-default.png' } = Astro.props;

const site = 'https://tenebris.com.ua';
const stripped = getPathnameLocaleStripped(pathname);
const canonical = `${site}${locale === 'en' ? stripped : `/uk${stripped === '/' ? '/' : stripped}`}`.replace(/\/\//g, '/');
const hreflangs = getHreflangAlternates(pathname);
---

<AstroSEO
  title={title}
  description={description}
  canonical={canonical}
  openGraph={{
    basic: { title, type: 'website', image: `${site}${ogImage}`, url: canonical },
    optional: { description, siteName: 'Tenebris', locale: localeHtmlLang[locale] },
  }}
  twitter={{ card: 'summary_large_image', title, description, image: `${site}${ogImage}` }}
  extend={{
    link: hreflangs.map(h => ({ rel: 'alternate', hreflang: h.hreflang, href: h.href })),
    meta: [
      { name: 'theme-color', content: '#0a0a0a' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
  }}
/>
```

**Step 2: `src/components/astro/Schema.astro`** — renders a JSON-LD array.

```astro
---
interface Props { schemas: object[] }
const { schemas } = Astro.props;
---
{schemas.map((s) => (
  <script type="application/ld+json" set:html={JSON.stringify(s)} />
))}
```

**Step 3: `src/layouts/Layout.astro`**

```astro
---
import '../styles/global.css';
import SEO from '../components/astro/SEO.astro';
import Schema from '../components/astro/Schema.astro';
import Header from '../components/astro/Header.astro';
import Footer from '../components/astro/Footer.astro';
import DeferredGTM from '../components/astro/DeferredGTM.astro';
import { buildBaseSchemas } from '../utils/schema';
import { toLocale } from '../i18n/utils';
import { localeHtmlLang } from '../i18n/config';

interface Props {
  title: string;
  description: string;
  locale?: string;
  schemas?: object[];
  ogImage?: string;
}
const { title, description, locale: rawLocale, schemas: extra = [], ogImage } = Astro.props;
const locale = toLocale(rawLocale);
const schemas = [...buildBaseSchemas(locale, Astro.url.pathname), ...extra];
---
<!doctype html>
<html lang={localeHtmlLang[locale]} dir="ltr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#0a0a0a" />
    <link rel="manifest" href="/manifest.webmanifest" />
    <SEO title={title} description={description} locale={locale} pathname={Astro.url.pathname} ogImage={ogImage} />
    <Schema schemas={schemas} />
    <DeferredGTM />
  </head>
  <body class="bg-bg text-fg">
    <a href="#main" class="sr-only focus:not-sr-only fixed left-3 top-3 z-50 rounded bg-[--color-accent] px-3 py-2 text-black">Skip to content</a>
    <Header locale={locale} />
    <main id="main">
      <slot />
    </main>
    <Footer locale={locale} />
  </body>
</html>
```

**Step 4: Commit**

```bash
git add src/layouts src/components/astro/SEO.astro src/components/astro/Schema.astro
git commit -m "feat: Layout, SEO, Schema primitives"
```

---

### Task 5.2: Header, Footer, DeferredGTM

**Files:**
- Create: `src/components/astro/Header.astro`, `Footer.astro`, `DeferredGTM.astro`, `LanguageSwitch.astro`, `MobileMenu.astro`
- Create: `src/scripts/gtm-init.ts`

**Step 1: `src/scripts/gtm-init.ts`**

```ts
export function initGTM(id: string) {
  if (!id || typeof window === 'undefined') return;
  if ((window as any).__gtmLoaded) return;
  (window as any).__gtmLoaded = true;
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtm.js?id=${id}`;
  document.head.appendChild(s);
}
```

**Step 2: `src/components/astro/DeferredGTM.astro`**

```astro
---
const id = import.meta.env.PUBLIC_GTM_ID ?? '';
---
{id && (
  <script is:inline define:vars={{ id }}>
    (function () {
      var loaded = false;
      function load() {
        if (loaded) return;
        loaded = true;
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
        var s = document.createElement('script');
        s.async = true;
        s.src = 'https://www.googletagmanager.com/gtm.js?id=' + id;
        document.head.appendChild(s);
      }
      ['pointerdown', 'keydown', 'touchstart', 'scroll'].forEach(function (e) {
        window.addEventListener(e, load, { once: true, passive: true });
      });
      if ('requestIdleCallback' in window) {
        requestIdleCallback(load, { timeout: 5000 });
      } else {
        setTimeout(load, 5000);
      }
    })();
  </script>
)}
```

**Step 3: `src/components/astro/LanguageSwitch.astro`**

```astro
---
import { locales, type Locale } from '../../i18n/types';
import { localizeUrl } from '../../i18n/utils';
import { localeLabels } from '../../i18n/config';
import { getPathnameLocaleStripped } from '../../i18n/utils';

interface Props { locale: Locale }
const { locale } = Astro.props;
const stripped = getPathnameLocaleStripped(Astro.url.pathname);
---
<div class="flex items-center gap-1 font-mono text-xs uppercase tracking-[0.2em] text-[--color-fg-muted]">
  {locales.map((l, i) => (
    <>
      {i > 0 && <span class="text-[--color-fg-dim]">·</span>}
      {l === locale ? (
        <span class="text-[--color-fg]">{l}</span>
      ) : (
        <a href={localizeUrl(stripped, l)} hreflang={l} class="hover:text-[--color-accent] transition-colors">{l}</a>
      )}
    </>
  ))}
</div>
```

**Step 4: `src/components/astro/Header.astro`**

Header uses the language switcher, the logo mark as a link to home, and nav links to the 7 anchors on the landing plus the Careers page.

```astro
---
import { Icon } from 'astro-icon/components';
import LanguageSwitch from './LanguageSwitch.astro';
import { commonTranslations } from '../../i18n/common';
import { localizeUrl } from '../../i18n/utils';
import type { Locale } from '../../i18n/types';

interface Props { locale: Locale }
const { locale } = Astro.props;
const t = commonTranslations[locale];
const links = [
  { href: localizeUrl('/#systems',    locale), label: t.nav.systems },
  { href: localizeUrl('/#advantages', locale), label: t.nav.advantages },
  { href: localizeUrl('/#training',   locale), label: t.nav.training },
  { href: localizeUrl('/#press',      locale), label: t.nav.press },
  { href: localizeUrl('/careers/',    locale), label: t.nav.careers },
  { href: localizeUrl('/#contact',    locale), label: t.nav.contact },
];
---
<header class="sticky top-0 z-40 border-b border-[--color-border] bg-[--color-bg]/80 backdrop-blur-sm">
  <div class="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
    <a href={localizeUrl('/', locale)} class="flex items-center gap-2" aria-label="Tenebris home">
      <img src="/favicon.svg" alt="" width="24" height="24" />
      <span class="font-display text-sm font-semibold tracking-widest">TENEBRIS</span>
    </a>
    <nav aria-label="Primary" class="hidden items-center gap-6 md:flex">
      {links.map(link => (
        <a href={link.href} class="font-mono text-xs uppercase tracking-[0.2em] text-[--color-fg-muted] transition-colors hover:text-[--color-fg]">{link.label}</a>
      ))}
    </nav>
    <div class="flex items-center gap-4">
      <LanguageSwitch locale={locale} />
      <button id="menu-btn" class="md:hidden" aria-label={t.a11y.openMenu} popovertarget="mobile-menu">
        <Icon name="lucide:menu" class="h-5 w-5" />
      </button>
    </div>
  </div>
  <div id="mobile-menu" popover class="m-0 ml-auto h-dvh w-full bg-[--color-bg] p-6 text-[--color-fg] md:hidden">
    <div class="flex items-center justify-between">
      <span class="font-display text-sm font-semibold tracking-widest">TENEBRIS</span>
      <button popovertarget="mobile-menu" popovertargetaction="hide" aria-label={t.a11y.closeMenu}>
        <Icon name="lucide:x" class="h-5 w-5" />
      </button>
    </div>
    <nav class="mt-8 flex flex-col gap-4">
      {links.map(link => (
        <a href={link.href} class="font-display text-2xl">{link.label}</a>
      ))}
    </nav>
  </div>
</header>
```

**Step 5: `src/components/astro/Footer.astro`**

```astro
---
import { commonTranslations } from '../../i18n/common';
import { getLegalEntity } from '../../i18n/entities';
import type { Locale } from '../../i18n/types';

interface Props { locale: Locale }
const { locale } = Astro.props;
const t = commonTranslations[locale];
const entity = getLegalEntity(locale);
const year = new Date().getFullYear();
---
<footer class="border-t border-[--color-border] bg-[--color-bg] py-10">
  <div class="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-start md:justify-between">
    <div class="flex items-start gap-3">
      <img src="/favicon.svg" alt="" width="32" height="32" />
      <div class="space-y-1 font-mono text-xs uppercase tracking-[0.2em] text-[--color-fg-muted]">
        <div class="text-[--color-fg]">{entity.tradingName}</div>
        <div>{entity.legalName}</div>
        <div>{t.footer.registrationLabel}: {entity.registrationNumber}</div>
        <div>{entity.city}, {entity.country}</div>
      </div>
    </div>
    <div class="font-mono text-xs uppercase tracking-[0.2em] text-[--color-fg-muted]">
      © {year} {entity.tradingName}. {t.footer.rights}
    </div>
  </div>
</footer>
```

**Step 6: Commit**

```bash
git add src/components/astro src/scripts
git commit -m "feat: Header, Footer, DeferredGTM, LanguageSwitch"
```

---

### Task 5.3: Section primitives

**Files:**
- Create: `src/components/astro/Eyebrow.astro`, `Section.astro`, `SectionHeader.astro`, `Bracketed.astro`, `Spec.astro`, `MonoStat.astro`, `Divider.astro`

Small, reusable components. Each is 15–40 lines. See landing project for patterns.

Commit at end:

```bash
git add src/components/astro
git commit -m "feat: section primitives"
```

---

## Phase 6 — Page: Landing (EN)

### Task 6.1: Hero section

**Files:**
- Create: `src/page-content/sections/Hero.astro`

**Step 1: Build component (80 lines). Uses `<video>` with MP4+WebM sources, AVIF poster, `prefers-reduced-motion` media query hides video.**

**Step 2: Register it inside a temporary `src/pages/index.astro` and run `npm run dev`. Verify at `http://localhost:4321/`.**

**Step 3: Check 320/768/1280/1920 breakpoints. Verify Cyrillic version too (manually flip locale via URL once that's wired).**

**Step 4: Commit**

```bash
git add src/page-content/sections/Hero.astro src/pages/index.astro
git commit -m "feat: hero section"
```

---

### Tasks 6.2–6.8: remaining landing sections

Repeat the shape of Task 6.1 for:
- `Proof.astro` (stats row)
- `Systems.astro` (Bahnet + spec table + photo)
- `Advantages.astro` (6-item grid)
- `Training.astro` (copy + photo)
- `Press.astro` (article cards)
- `Careers.astro` (5-row list + link)
- `Contact.astro` (form + contacts)

Each task:
1. Build the section.
2. Wire into `src/page-content/LandingPage.astro`.
3. Verify locally at `http://localhost:4321/` + `http://localhost:4321/uk/`.
4. Commit independently.

**Task 6.8 (Contact) specifics — Web3Forms wiring**

Use the same `form action="https://api.web3forms.com/submit"` pattern as the landing project. Hidden `access_key`, `email` (recipient), `subject` (set dynamically based on purpose radio), `redirect` (to `?success=true`), honeypot. JS on the page toggles subject and shows success message.

```html
<input type="hidden" name="access_key" value={import.meta.env.PUBLIC_WEB3FORMS_KEY} />
<input type="hidden" name="email" value="s.bohdanovskyi@tenebristech.tech" />
<input type="hidden" name="subject" id="subject-input" value="[Tenebris] Inquiry" />
<input type="hidden" name="redirect" id="redirect-input" value="" />
```

---

## Phase 7 — Page: Landing assembly + UK route

### Task 7.1: Assemble `LandingPage.astro` + i18n wrappers

**Files:**
- Create: `src/page-content/LandingPage.astro`
- Rewrite: `src/pages/index.astro`
- Create: `src/pages/uk/index.astro`

Every section receives a `locale` prop. `LandingPage.astro` accepts `locale` and renders all sections in order. Both `src/pages/index.astro` and `src/pages/uk/index.astro` are thin wrappers.

Commit:

```bash
git add src/page-content src/pages
git commit -m "feat: assemble landing in EN + UK"
```

---

## Phase 8 — Careers pages

### Task 8.1: `/careers/` index

**Files:**
- Create: `src/page-content/CareersIndex.astro`
- Create: `src/pages/careers/index.astro`, `src/pages/uk/careers/index.astro`

Full roles list, breadcrumb, BreadcrumbList schema, ItemList schema of JobPosting `@id`s.

Commit:

```bash
git add src/page-content/CareersIndex.astro src/pages/careers src/pages/uk/careers
git commit -m "feat: careers index"
```

### Task 8.2: `/careers/[slug]/` detail

**Files:**
- Create: `src/page-content/CareerDetail.astro`
- Create: `src/pages/careers/[slug].astro`, `src/pages/uk/careers/[slug].astro`

Each page emits a full `JobPosting` schema. `getStaticPaths()` iterates `roles`. Slug lookup returns 404 if not found.

Commit.

---

## Phase 9 — Schemas

### Task 9.1: Schema builder utilities

**Files:**
- Create: `src/utils/schema.ts`

Functions:
- `buildOrganization(locale)` → full Organization with contactPoints, legal fields, taxID, sameAs.
- `buildWebsite(locale)` → WebSite with `@id = #website`, `inLanguage`.
- `buildBreadcrumb(items, locale)` → BreadcrumbList.
- `buildJobPosting(role, locale)` → JobPosting with full required fields.
- `buildBaseSchemas(locale, pathname)` → returns array `[Organization, WebSite]`.
- `buildPressItemList(locale)` → ItemList of NewsArticle references.

Every function is strictly typed and returns a plain object. No JSON.parse. All dates in ISO 8601.

Commit.

---

### Task 9.2: Wire schemas into each page

**Files:**
- Modify: `src/page-content/LandingPage.astro`, `CareersIndex.astro`, `CareerDetail.astro`

Each page passes its specific schemas via `schemas={[...]}` to `Layout.astro`. Breadcrumbs emit on every non-root page.

Verify with Google Rich Results Test after `npm run build && npx serve dist`:
- Landing emits Organization + WebSite + ItemList(press).
- Careers index emits Organization + WebSite + BreadcrumbList + ItemList(JobPosting).
- Each role page emits Organization + WebSite + BreadcrumbList + JobPosting.

Commit.

---

## Phase 10 — AEO and Search Files

### Task 10.1: `scripts/generate-llms-full.mjs`

**Files:**
- Create: `scripts/generate-llms-full.mjs`
- Create: `public/llms.txt`

`llms.txt` (short): written by hand.

`llms-full.txt` (generated at build): concatenates landing copy + all role descriptions from both locales into a single markdown file `/public/llms-full.txt` for AI crawler ingestion.

Example generator skeleton:

```js
import { writeFileSync } from 'node:fs';
import { home as homeEn } from '../src/i18n/en/pages/home.ts';
import { home as homeUk } from '../src/i18n/uk/pages/home.ts';

const content = `# Tenebris
Ukrainian interceptor drone systems.

## English
${homeEn.hero.h1}
${homeEn.hero.sub}
...

## Українська
${homeUk.hero.h1}
${homeUk.hero.sub}
...
`;

writeFileSync('public/llms-full.txt', content);
```

Commit.

---

## Phase 11 — 404 page

### Task 11.1: Custom 404

**Files:**
- Create: `src/pages/404.astro`

Minimal — monospace `[ 404 · NOT FOUND ]` + one line + link back to `/`. Uses Layout, same aesthetic.

Commit.

---

## Phase 12 — Build & Verify

### Task 12.1: Production build

**Step 1:**

```bash
npm run build
```

Expected: exits 0. `dist/` populated with `index.html`, `uk/index.html`, `careers/index.html`, `careers/*/index.html`, `uk/careers/...`, `sitemap-*.xml`, `robots.txt`, `llms.txt`, `llms-full.txt`, compressed assets.

**Step 2: Serve locally**

```bash
npx serve dist -p 4321
```

Visit `http://localhost:4321/` — Lighthouse tab, run audit (Mobile, Performance + SEO + A11y + Best Practices).

Targets:
- Performance ≥ 95
- SEO = 100
- Accessibility ≥ 95
- Best Practices ≥ 95

If any score falls short, open a follow-up task. Do not ship otherwise.

**Step 3: Validate structured data**

Upload the rendered `http://localhost:4321/` HTML to [Google Rich Results Test](https://search.google.com/test/rich-results) (use the "paste HTML" option) — verify 0 errors on Organization, WebSite, ItemList. Repeat for one role detail page (JobPosting eligibility required).

Commit any fixes from this pass.

---

### Task 12.2: Cross-locale visual QA

Use the @impeccable:critique skill or manual inspection against the design doc at 320/768/1280/1920 viewports, in EN + UK.

Checklist:
- Hero video respects `prefers-reduced-motion` (use Safari devtools → rendering panel).
- Focus rings visible on all interactive elements.
- Cyrillic text doesn't break layouts (look for orphan words, rows, overlap).
- Stats numbers align across three columns.
- Mobile menu opens/closes with keyboard.
- Language switch preserves the section anchor.
- All external press links open with `rel="noopener noreferrer" target="_blank"`.

---

### Task 12.3: SEO audit

Invoke the `/seo-audit` skill against the production build URL once deployed to a preview. Expect: no broken links, sitemap valid, robots valid, hreflang loops absent, per-page unique titles+descriptions.

---

## Phase 13 — Deployment

### Task 13.1: Cloudflare Pages setup

Manual steps for the user (not Claude):

1. Log into Cloudflare, Pages → Create → Connect to Git.
2. Repo: `tenebris`, branch: `main`.
3. Build: `npm run build`, Output: `dist`, Node: 20.
4. Env vars:
   - `PUBLIC_GTM_ID` = real GTM container ID
   - `PUBLIC_WEB3FORMS_KEY` = Tenebris Web3Forms key
5. Custom domain: `tenebris.com.ua` (apex) + `www.tenebris.com.ua` → Permanent redirect to apex.
6. SSL: Full (strict).
7. Caching: HTML → `max-age=300, stale-while-revalidate=86400`; immutable assets → `max-age=31536000, immutable`.

Document this in `/docs/deploy.md`.

Commit.

---

### Task 13.2: IndexNow ping on deploy

Copy the landing project's `src/integrations/indexnow.mjs` pattern. Runs only in CI + production. Commit.

---

## Phase 14 — Documentation Wrap-up

### Task 14.1: README + final CLAUDE.md review

**Files:**
- Create: `README.md` (short, for humans)
- Update: `CLAUDE.md` (verify everything still true)

README contents: one-paragraph about, commands, deploy instructions, the design authority disclaimer.

Commit.

---

## Open Questions (revisit before launch)

- Confirm exact year of first Bahnet delivery for Stat `inService`.
- Confirm Tenebris city/street address (currently "Kyiv, Ukraine").
- Confirm Söhne license purchase → swap Geist fallback for real Söhne woff2 files.
- Confirm real GTM container ID + Web3Forms access key.
- Confirm additional press articles as they publish.
- Confirm social media handles → populate `src/data/social.ts` → auto-feeds `sameAs`.

---

## Plan complete and saved to `docs/plans/2026-04-23-tenebris-landing-implementation-plan.md`. Two execution options:

**1. Subagent-Driven (this session)** — I dispatch a fresh subagent per task, review between tasks, fast iteration.

**2. Parallel Session (separate)** — Open a new session in the project directory with `superpowers:executing-plans`, batch execution with checkpoints.

**Which approach?**
