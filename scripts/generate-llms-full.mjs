// Builds /public/llms-full.txt at build time from i18n sources.
// Intended for consumption by AI answer engines (GPTBot, ClaudeBot, PerplexityBot, etc.).
//
// Requires Node ≥ 22.6 with --experimental-strip-types, or Node ≥ 23 where
// type-stripping is on by default. Under older Node, dynamic `.ts` imports
// will fail and this script exits non-zero so CI surfaces the regression
// instead of silently shipping a stub.

import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const ROOT = resolve(dirname(__filename), '..');

mkdirSync(resolve(ROOT, 'public'), { recursive: true });

async function loadLocale(locale) {
  const urls = {
    home: pathToFileURL(resolve(ROOT, `src/i18n/${locale}/pages/home.ts`)).href,
    advantages: pathToFileURL(resolve(ROOT, `src/i18n/${locale}/advantages.ts`)).href,
    roles: pathToFileURL(resolve(ROOT, `src/i18n/${locale}/roles.ts`)).href,
    systems: pathToFileURL(resolve(ROOT, `src/i18n/${locale}/systems.ts`)).href,
  };
  const home = (await import(urls.home)).home;
  const advantages = (await import(urls.advantages)).advantageStrings;
  const roles = (await import(urls.roles)).roleStrings;
  const systems = (await import(urls.systems)).systemStrings;
  return { home, advantages, roles, systems };
}

const en = await loadLocale('en');
const uk = await loadLocale('uk');

const section = (title, lines) => `\n## ${title}\n\n${lines.filter(Boolean).join('\n\n')}\n`;

const renderLocale = (data, heading) => {
  const { home, advantages, roles, systems } = data;
  const advIds = Object.keys(advantages);
  const roleSlugs = Object.keys(roles);

  return [
    `# ${heading}`,
    home.meta.description,
    section(home.hero.eyebrow, [home.hero.h1, home.hero.sub]),
    section(home.systems.heading, [
      home.systems.intro,
      ...Object.keys(systems.specLabels).map(
        (k) => `- **${systems.specLabels[k]}**: ${systems.specValues[k]}`,
      ),
    ]),
    section(
      home.advantages.heading,
      advIds.map((id) => {
        const a = advantages[id];
        return `### ${a.title}\n${a.description}`;
      }),
    ),
    section(home.training.heading, [
      home.training.paragraph1,
      home.training.paragraph2,
      ...home.training.bullets.map((b) => `- ${b}`),
    ]),
    section(home.careers.heading, [
      home.careers.intro,
      ...roleSlugs.map((slug) => {
        const r = roles[slug];
        return [
          `### ${r.title} · ${r.teamLabel}`,
          r.mission,
          '**Responsibilities**',
          ...r.responsibilities.map((x) => `- ${x}`),
          '**Requirements**',
          ...r.requirements.map((x) => `- ${x}`),
        ].join('\n');
      }),
    ]),
    section(home.contact.heading, [
      home.contact.intro,
      '- Cooperation: +380 66 555 14 88 (Bohdan), +380 63 850 75 77 (Serhii)',
      '- Employment: +380 95 910 58 58 (Kateryna)',
      '- Email: info@tenebris.com.ua',
      '- City: ' + home.contact.cityLine,
    ]),
  ].join('\n');
};

const content = [
  renderLocale(en, 'Tenebris — Ukrainian interceptor drone systems (English)'),
  '\n---\n',
  renderLocale(uk, 'Tenebris — Українські системи дронів-перехоплювачів'),
  '\n---\n',
  'Legal entity: Tenebris LLC (ТОВ «Тенебріс»), Ukraine, registration 45226064.',
  'Website: https://tenebris.com.ua/',
  'Українська версія: https://tenebris.com.ua/uk/',
  'Careers: https://tenebris.com.ua/careers/',
].join('\n');

writeFileSync(resolve(ROOT, 'public/llms-full.txt'), content);
console.log('llms-full.txt generated (' + content.length + ' chars).');
