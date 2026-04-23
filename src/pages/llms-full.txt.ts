import type { APIRoute } from 'astro';
import {
  advantageTranslations,
  careerDetailTranslations,
  homeTranslations,
  roleTranslations,
  systemTranslations,
} from '../i18n/translations';
import { getLegalEntity } from '../i18n/entities';
import { localizeUrl } from '../i18n/utils';
import type { Locale } from '../i18n/types';
import type { AdvantageId } from '../data/advantages';
import { contactPeople, publicInboxEmail } from '../data/contacts';
import { roles } from '../data/roles';
import { systemSpecKeys } from '../data/systems';

const SITE = 'https://tenebris.com.ua';

const section = (title: string, lines: readonly string[]) =>
  `\n## ${title}\n\n${lines.join('\n\n')}\n`;

function renderLocale(locale: Locale, heading: string): string {
  const home = homeTranslations[locale];
  const advantages = advantageTranslations[locale];
  const roleStrings = roleTranslations[locale];
  const systems = systemTranslations[locale];
  const detail = careerDetailTranslations[locale];

  const advIds = Object.keys(advantages) as AdvantageId[];

  const contactLines = contactPeople.map((p) => {
    const role = home.contact.peopleRoleLabel[p.purpose];
    const name = home.contact.peopleNames[p.nameKey];
    return `- ${role}: ${name}, ${p.phone}`;
  });

  return [
    `# ${heading}`,
    home.meta.description,
    section(home.hero.eyebrow, [home.hero.h1, home.hero.sub]),
    section(home.systems.heading, [
      home.systems.intro,
      ...systemSpecKeys.map((k) => `- **${systems.specLabels[k]}**: ${systems.specValues[k]}`),
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
      ...roles.map((role) => {
        const r = roleStrings[role.slug];
        return [
          `### ${r.title} · ${r.teamLabel}`,
          r.mission,
          `**${detail.responsibilitiesHeading}**`,
          ...r.responsibilities.map((x) => `- ${x}`),
          `**${detail.requirementsHeading}**`,
          ...r.requirements.map((x) => `- ${x}`),
        ].join('\n');
      }),
    ]),
    section(home.contact.heading, [
      home.contact.intro,
      ...contactLines,
      `- ${home.contact.mailLabel}: ${publicInboxEmail}`,
      `- ${home.contact.cityLine}`,
    ]),
  ].join('\n');
}

function footer(): string {
  const en = getLegalEntity('en');
  const uk = getLegalEntity('uk');
  return [
    `Legal entity: ${en.legalName} (${uk.legalName}), ${en.country}, registration ${en.registrationNumber}.`,
    `Website: ${SITE}${localizeUrl('/', 'en')}`,
    `Українська версія: ${SITE}${localizeUrl('/', 'uk')}`,
    `Careers: ${SITE}${localizeUrl('/careers/', 'en')}`,
  ].join('\n');
}

const body = [
  renderLocale('en', 'Tenebris: Ukrainian interceptor drone systems (English)'),
  '\n---\n',
  renderLocale('uk', 'Tenebris: Українські системи дронів-перехоплювачів'),
  '\n---\n',
  footer(),
].join('\n');

export const GET: APIRoute = () =>
  new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
