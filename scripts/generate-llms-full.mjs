// Stub — will be replaced in Phase 10 once i18n files exist.
// Creating an empty-but-valid file keeps `npm run build` from failing pre-Phase-10.
import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
mkdirSync(resolve(ROOT, 'public'), { recursive: true });

const out = resolve(ROOT, 'public/llms-full.txt');
if (!existsSync(out)) {
  writeFileSync(out, '# Tenebris\nUkrainian interceptor drone systems.\n');
}
console.log('llms-full.txt ready.');
