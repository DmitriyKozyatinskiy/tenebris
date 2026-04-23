# Tenebris Landing

Marketing + hiring site for **Tenebris** — a Ukrainian defense-technology company building
automated interceptor drone systems. Production URL: `https://tenebris.com.ua`.

See [`CLAUDE.md`](./CLAUDE.md) for the full design system, brand rules, and copy guidelines.

## Commands

```bash
npm install           # install deps (first time)
npm run dev           # dev server at localhost:4321
npm run build         # production build → dist/ (runs generate-llms-full first)
npm run preview       # preview the built site
npm run check         # astro check (TypeScript diagnostics)
npm run format        # prettier --write .
npm run media         # re-encode hero video + gallery photos (requires ffmpeg)
npm run favicons      # regenerate favicon set from src/assets/brand/logo-mark.svg
npm run og            # regenerate default OG image (/og-default.png)
```

## Environment variables

Set these in the hosting environment (Cloudflare Pages `Settings → Environment variables`).
They are `PUBLIC_*` because they ship to the client.

| Variable | Purpose |
|---|---|
| `PUBLIC_GTM_ID` | Google Tag Manager container ID, e.g. `GTM-XXXXXXX`. Omit to disable GTM entirely. |
| `PUBLIC_WEB3FORMS_KEY` | Web3Forms access key for the contact form. Sign up at [web3forms.com](https://web3forms.com). |
| `PUBLIC_SITE_URL` | Override the canonical origin (optional; defaults to `https://tenebris.com.ua`). |

If these are missing, the build still succeeds; GTM and form submission just will not work.

## Adding a new locale

1. Add the code to `src/i18n/types.ts > locales` and `localeHtmlLang` / `localeLabels` / `localeHreflang` in `config.ts`.
2. Add a legal entity in `src/i18n/entities.ts`.
3. Duplicate `src/i18n/en/` → `src/i18n/<code>/` and translate every leaf string (types keep you honest).
4. Duplicate `src/pages/uk/` → `src/pages/<code>/` (thin wrappers only).
5. Update `astro.config.mjs` → `i18n.locales` and `sitemap.i18n.locales`.

## Adding a new role

1. Add a new `RoleSlug` in `src/data/roles.ts`.
2. Add the role's metadata to the `roles` array.
3. Add its full copy in both `src/i18n/en/roles.ts` and `src/i18n/uk/roles.ts`.
4. That's it. The landing and `/careers/` list + a per-role page + JobPosting schema all regenerate from this single source.

## Adding a press article

Append an entry to `src/data/press.ts` and the matching pullquote to both
`src/i18n/en/press.ts` and `src/i18n/uk/press.ts`. Place the thumbnail in
`public/photos/` (AVIF + WebP, 800w + 1600w variants).

## Replacing the Söhne dev fallback

Geist is used as a dev fallback for Söhne. When the Söhne license is purchased:

1. Drop `soehne-*.woff2` files into `public/fonts/`.
2. Add `@font-face` declarations for them in `src/styles/global.css` alongside the Geist ones.
3. Delete the Geist files + Geist `@font-face` blocks.
4. Reorder the stack in `--font-display` / `--font-sans` in `tokens.css` so `'Söhne'` comes first.

## Deployment — Cloudflare Pages

1. Cloudflare dashboard → Pages → **Create** → **Connect to Git** → select repo.
2. Build command: `npm run build`. Output directory: `dist`. Node: `20`.
3. Add the environment variables listed above.
4. Custom domain: `tenebris.com.ua` (apex); add `www.tenebris.com.ua` with a 301 redirect to apex.
5. Recommended caching rules:
   - `*.html` → `Cache-Control: public, max-age=300, stale-while-revalidate=86400`
   - `/_astro/*`, `/fonts/*`, `/photos/*`, `/video/*`, `/icons/*`, `/favicon.*` → `max-age=31536000, immutable`

## Source of truth

- Landing content → `src/i18n/{locale}/pages/home.ts`
- Role content → `src/i18n/{locale}/roles.ts`
- Press → `src/data/press.ts` + `src/i18n/{locale}/press.ts`
- Advantages → `src/data/advantages.ts` + `src/i18n/{locale}/advantages.ts`
- Stats → `src/data/stats.ts` + `src/i18n/{locale}/stats.ts`
- Systems specs → `src/data/systems.ts` + `src/i18n/{locale}/systems.ts`
- Contact recipients → `src/data/contacts.ts`
- Legal entity → `src/i18n/entities.ts`
- Social links → `src/data/social.ts`

## Docs

- Design document: `docs/plans/2026-04-23-tenebris-landing-design.md`
- Implementation plan: `docs/plans/2026-04-23-tenebris-landing-implementation-plan.md`
- Brand + copy rules: `CLAUDE.md`
