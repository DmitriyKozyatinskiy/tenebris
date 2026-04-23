/**
 * IndexNow Astro integration.
 *
 * After a successful build, reads dist/sitemap-index.xml → dist/sitemap-*.xml,
 * collects every <loc> URL, and POSTs the batch to api.indexnow.org.
 *
 * Submitting to the shared endpoint fans out to Bing, Yandex, Seznam, Naver,
 * Amazon/Alexa, and Yep. See https://www.indexnow.org/faq.
 *
 * The key lives here and must match the key file served at
 * https://tenebris.com.ua/<KEY>.txt — see public/<KEY>.txt.
 */

import { readFileSync, existsSync } from 'node:fs';
import { basename, join } from 'node:path';

const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
const INDEXNOW_KEY = '9fa4bc4d38b1401b82dd2e0d2b087da6';
const SITE_HOST = 'tenebris.com.ua';
const KEY_LOCATION = `https://${SITE_HOST}/${INDEXNOW_KEY}.txt`;
const FETCH_TIMEOUT_MS = 10_000;

function extractLocs(xml) {
  const urls = [];
  const locRegex = /<loc>(.*?)<\/loc>/g;
  let match;
  while ((match = locRegex.exec(xml)) !== null) urls.push(match[1]);
  return urls;
}

async function submit(urls) {
  if (urls.length === 0) {
    console.log('[indexnow] no URLs, skipping');
    return;
  }
  const payload = {
    host: SITE_HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };
  try {
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (res.ok) {
      console.log(`[indexnow] submitted ${urls.length} URLs (status ${res.status})`);
    } else {
      const body = await res.text();
      console.warn(`[indexnow] status ${res.status}: ${body}`);
    }
  } catch (err) {
    console.error('[indexnow] request failed:', err?.message ?? err);
  }
}

export default function indexnow() {
  return {
    name: 'astro-indexnow',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const distPath = dir.pathname;
        const sitemapIndexPath = join(distPath, 'sitemap-index.xml');
        if (!existsSync(sitemapIndexPath)) {
          console.warn('[indexnow] no sitemap-index.xml found; skipping');
          return;
        }

        const indexXml = readFileSync(sitemapIndexPath, 'utf-8');
        const urls = [];
        for (const ref of extractLocs(indexXml)) {
          const localPath = join(distPath, basename(new URL(ref).pathname));
          if (!existsSync(localPath)) continue;
          urls.push(...extractLocs(readFileSync(localPath, 'utf-8')));
        }

        const unique = [...new Set(urls)];
        console.log(`[indexnow] submitting ${unique.length} unique URLs`);
        await submit(unique);
      },
    },
  };
}
