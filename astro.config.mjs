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
          'arrow-right',
          'arrow-up-right',
          'chevron-right',
          'chevron-down',
          'mail',
          'phone',
          'menu',
          'x',
          'check',
          'external-link',
          'target',
          'radio',
          'radar',
          'plane',
          'map-pin',
          'globe',
          'package',
          'cpu',
          'zap',
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
    // tailwindcss v4 plugin uses rolldown-flavored types; safe to pass through.
    plugins: [/** @type {any} */ (tailwindcss())],
    server: { host: true },
  },
  server: { host: true },
});
