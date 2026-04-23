import sharp from 'sharp';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');

const svg = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#0a0a0a"/>
  <path d="M594 100 L606 100 L628 490 L572 490 Z" fill="#f5f5f4"/>
  <text x="600" y="545" fill="#f5f5f4" font-family="Helvetica, Arial, sans-serif" font-weight="600" font-size="56" text-anchor="middle" letter-spacing="6">TENEBRIS</text>
  <text x="600" y="590" fill="#7f7f78" font-family="Helvetica, Arial, sans-serif" font-weight="400" font-size="18" text-anchor="middle" letter-spacing="3">INTERCEPTOR DRONE SYSTEMS  ·  UA</text>
  <g stroke="#2a2a2a" stroke-width="1" fill="none">
    <path d="M48 48 L96 48 M48 48 L48 96"/>
    <path d="M1152 48 L1104 48 M1152 48 L1152 96"/>
    <path d="M48 582 L96 582 M48 582 L48 534"/>
    <path d="M1152 582 L1104 582 M1152 582 L1152 534"/>
  </g>
</svg>`);

await sharp(svg).png().toFile(resolve(ROOT, 'public/og-default.png'));
console.log('OG image written: public/og-default.png');
