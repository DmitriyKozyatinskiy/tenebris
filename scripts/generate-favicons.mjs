import sharp from 'sharp';
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const SVG = readFileSync(resolve(ROOT, 'src/assets/brand/logo-mark.svg'));

mkdirSync(resolve(ROOT, 'public/icons'), { recursive: true });

// Copy the source SVG as the primary favicon.
writeFileSync(resolve(ROOT, 'public/favicon.svg'), SVG);

// Monochrome safari-pinned-tab (transparent bg, black mark).
const mono = SVG.toString()
  .replace('fill="#0a0a0a"', 'fill="transparent"')
  .replace('fill="#f5f5f4"', 'fill="black"');
writeFileSync(resolve(ROOT, 'public/safari-pinned-tab.svg'), mono);

const rasterTargets = [
  { out: 'public/apple-touch-icon.png', size: 180 },
  { out: 'public/icons/icon-192.png', size: 192 },
  { out: 'public/icons/icon-512.png', size: 512 },
  { out: 'public/icons/icon-512-maskable.png', size: 512, padRatio: 0.2 },
  { out: 'public/favicon-32.png', size: 32 },
  { out: 'public/favicon-48.png', size: 48 },
];

for (const t of rasterTargets) {
  const pad = t.padRatio ? Math.round(t.size * t.padRatio) : 0;
  const inner = t.size - pad * 2;
  await sharp(SVG, { density: 600 })
    .resize(inner, inner)
    .extend({
      top: pad,
      bottom: pad,
      left: pad,
      right: pad,
      background: '#0a0a0a',
    })
    .png()
    .toFile(resolve(ROOT, t.out));
}

// Simple favicon.ico (single-size PNG renamed; modern browsers accept this,
// legacy clients get a fallback via the SVG).
await sharp(SVG, { density: 600 }).resize(32, 32).png().toFile(resolve(ROOT, 'public/favicon.ico'));

console.log('Favicons generated.');
