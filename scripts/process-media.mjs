import { execSync } from 'node:child_process';
import { mkdirSync, readdirSync } from 'node:fs';
import { basename, extname, resolve } from 'node:path';
import sharp from 'sharp';

const ROOT = resolve(import.meta.dirname, '..');
const SRC_VIDEO = '/Users/dkoziatynskyi/Downloads/IMG_1952.MP4';
const PHOTO_SRC = '/Users/dkoziatynskyi/Downloads/tenebris photos';

mkdirSync(resolve(ROOT, 'public/video'), { recursive: true });
mkdirSync(resolve(ROOT, 'public/photos'), { recursive: true });

/* ---------- Video ----------
 * Source has an Instagram watermark in the top-right corner. We remove it
 * with ffmpeg's `delogo` filter, which interpolates surrounding pixels over
 * the rectangle — cleaner than a hard black box overlay. */
const mp4 = resolve(ROOT, 'public/video/hero-loop.mp4');
const webm = resolve(ROOT, 'public/video/hero-loop.webm');
const poster = resolve(ROOT, 'public/video/hero-poster.avif');

// Watermark bounding box at native 720x1280: top-right vertical strip.
const DELOGO = 'delogo=x=610:y=10:w=100:h=400';
const VF = `${DELOGO},scale=-2:1280`;

console.log('Transcoding MP4…');
execSync(
  `ffmpeg -y -i "${SRC_VIDEO}" -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -an -vf "${VF}" -movflags +faststart "${mp4}"`,
  { stdio: 'inherit' },
);

console.log('Transcoding WebM…');
execSync(
  `ffmpeg -y -i "${SRC_VIDEO}" -c:v libvpx-vp9 -crf 34 -b:v 0 -row-mt 1 -an -vf "${VF}" "${webm}"`,
  { stdio: 'inherit' },
);

console.log('Extracting AVIF poster…');
execSync(
  `ffmpeg -y -ss 2 -i "${SRC_VIDEO}" -frames:v 1 -vf "${VF}" "${poster}.png"`,
  { stdio: 'inherit' },
);
await sharp(`${poster}.png`).avif({ quality: 60 }).toFile(poster);
execSync(`rm -f "${poster}.png"`);

/* ---------- Photos ---------- */
console.log('Optimizing gallery photos…');
for (const file of readdirSync(PHOTO_SRC)) {
  if (!/\.(webp|png|jpe?g)$/i.test(file)) continue;
  const name = basename(file, extname(file));
  const src = `${PHOTO_SRC}/${file}`;

  await sharp(src)
    .resize({ width: 1600, withoutEnlargement: true })
    .avif({ quality: 55 })
    .toFile(resolve(ROOT, `public/photos/${name}-1600.avif`));
  await sharp(src)
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 70 })
    .toFile(resolve(ROOT, `public/photos/${name}-1600.webp`));
  await sharp(src)
    .resize({ width: 800, withoutEnlargement: true })
    .avif({ quality: 55 })
    .toFile(resolve(ROOT, `public/photos/${name}-800.avif`));
  await sharp(src)
    .resize({ width: 800, withoutEnlargement: true })
    .webp({ quality: 70 })
    .toFile(resolve(ROOT, `public/photos/${name}-800.webp`));
  console.log(`  ${name}`);
}

console.log('Media done.');
