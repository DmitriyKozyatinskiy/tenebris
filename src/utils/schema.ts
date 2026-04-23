import { getLegalEntity } from '../i18n/entities';
import type { Locale } from '../i18n/types';
import { localeHtmlLang } from '../i18n/config';
import { contactPeople, publicInboxEmail } from '../data/contacts';
import { getSameAs } from '../data/social';
import { type Role } from '../data/roles';
import { roleTranslations } from '../i18n/translations';
import { press } from '../data/press';

const SITE = 'https://tenebris.com.ua';
const ORG_ID = `${SITE}/#organization`;
const SITE_ID = `${SITE}/#website`;

export function buildOrganization(locale: Locale) {
  const entity = getLegalEntity(locale);
  const contactPoints = contactPeople.map((p) => ({
    '@type': 'ContactPoint',
    telephone: p.phone,
    contactType: p.purpose === 'employment' ? 'HR' : 'sales',
    availableLanguage: ['English', 'Ukrainian'],
    areaServed: ['UA', 'EU', 'Worldwide'],
  }));

  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'Manufacturer'],
    '@id': ORG_ID,
    name: entity.tradingName,
    legalName: entity.legalName,
    taxID: entity.registrationNumber,
    url: SITE,
    logo: `${SITE}/favicon.svg`,
    image: `${SITE}/og-default.png`,
    foundingLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'UA',
        addressLocality: entity.city,
      },
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'UA',
      addressLocality: entity.city,
    },
    email: publicInboxEmail,
    contactPoint: contactPoints,
    sameAs: getSameAs(),
    description:
      locale === 'uk'
        ? 'Українська оборонно-технологічна компанія, що розробляє автоматизовані дрони-перехоплювачі.'
        : 'Ukrainian defense-technology company building automated interceptor drone systems.',
  };
}

export function buildWebsite(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: SITE,
    name: 'Tenebris',
    inLanguage: localeHtmlLang[locale],
    publisher: { '@id': ORG_ID },
  };
}

export function buildBreadcrumb(items: Array<{ name: string; path: string }>, _locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE}${it.path}`,
    })),
  };
}

export function buildJobPosting(role: Role, locale: Locale) {
  const strings = roleTranslations[locale][role.slug];
  const description = [
    `<p>${strings.mission}</p>`,
    `<p><b>${strings.teamLabel}</b></p>`,
    `<ul>${strings.responsibilities.map((r) => `<li>${r}</li>`).join('')}</ul>`,
    `<p><b>Requirements</b></p>`,
    `<ul>${strings.requirements.map((r) => `<li>${r}</li>`).join('')}</ul>`,
  ].join('');

  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: strings.title,
    description,
    datePosted: role.postedISO,
    validThrough: role.validThroughISO,
    employmentType: role.employmentType,
    hiringOrganization: { '@id': ORG_ID },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'UA',
        addressLocality: role.baseLocation.includes(',')
          ? role.baseLocation.split(',')[0].trim()
          : role.baseLocation,
      },
    },
    directApply: false,
    applicantLocationRequirements: {
      '@type': 'Country',
      name: 'Ukraine',
    },
  };
}

export function buildPressItemList(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListOrder: 'Descending',
    name: locale === 'uk' ? 'Преса про Tenebris' : 'Press about Tenebris',
    itemListElement: press.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'NewsArticle',
        url: p.url,
        datePublished: p.dateISO,
        publisher: {
          '@type': 'NewsMediaOrganization',
          name: p.outlet,
          address: {
            '@type': 'PostalAddress',
            addressCountry: p.publisherCountry,
          },
        },
      },
    })),
  };
}

export function buildBaseSchemas(locale: Locale): object[] {
  return [buildOrganization(locale), buildWebsite(locale)];
}
