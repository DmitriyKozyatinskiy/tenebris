import type { APIRoute } from 'astro';
import {
  homeTranslations,
  advantageTranslations,
  roleTranslations,
  systemTranslations,
} from '../i18n/translations';
import type { Locale } from '../i18n/types';

const section = (title: string, lines: Array<string | false>) =>
  `\n## ${title}\n\n${lines.filter(Boolean).join('\n\n')}\n`;

function renderLocale(locale: Locale, heading: string): string {
  const home = homeTranslations[locale];
  const advantages = advantageTranslations[locale];
  const roles = roleTranslations[locale];
  const systems = systemTranslations[locale];

  const advIds = Object.keys(advantages) as Array<keyof typeof advantages>;
  const roleSlugs = Object.keys(roles) as Array<keyof typeof roles>;
  const specKeys = Object.keys(systems.specLabels) as Array<keyof typeof systems.specLabels>;

  return [
    `# ${heading}`,
    home.meta.description,
    section(home.hero.eyebrow, [home.hero.h1, home.hero.sub]),
    section(home.systems.heading, [
      home.systems.intro,
      ...specKeys.map((k) => `- **${systems.specLabels[k]}**: ${systems.specValues[k]}`),
    ]),
    section(
      home.advantages.heading,
      advIds.map((id) => `### ${advantages[id].title}\n${advantages[id].description}`),
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
}

const body = [
  renderLocale('en', 'Tenebris — Ukrainian interceptor drone systems (English)'),
  '\n---\n',
  renderLocale('uk', 'Tenebris — Українські системи дронів-перехоплювачів'),
  '\n---\n',
  'Legal entity: Tenebris LLC (ТОВ «Тенебріс»), Ukraine, registration 45226064.',
  'Website: https://tenebris.com.ua/',
  'Українська версія: https://tenebris.com.ua/uk/',
  'Careers: https://tenebris.com.ua/careers/',
].join('\n');

export const GET: APIRoute = () =>
  new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
