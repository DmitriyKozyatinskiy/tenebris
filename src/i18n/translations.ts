import type { Locale } from './types';

import { home as homeEn } from './en/pages/home';
import { home as homeUk } from './uk/pages/home';
import { careersIndex as careersIndexEn, careerDetail as careerDetailEn } from './en/pages/careers';
import { careersIndex as careersIndexUk, careerDetail as careerDetailUk } from './uk/pages/careers';
import { advantageStrings as advEn } from './en/advantages';
import { advantageStrings as advUk } from './uk/advantages';
import { roleStrings as rolesEn } from './en/roles';
import { roleStrings as rolesUk } from './uk/roles';
import { systemStrings as sysEn } from './en/systems';
import { systemStrings as sysUk } from './uk/systems';
import { statStrings as statsEn } from './en/stats';
import { statStrings as statsUk } from './uk/stats';
import { pressStrings as pressEn } from './en/press';
import { pressStrings as pressUk } from './uk/press';

export const homeTranslations = { en: homeEn, uk: homeUk } satisfies Record<Locale, typeof homeEn>;
export const careersIndexTranslations = {
  en: careersIndexEn,
  uk: careersIndexUk,
} satisfies Record<Locale, typeof careersIndexEn>;
export const careerDetailTranslations = {
  en: careerDetailEn,
  uk: careerDetailUk,
} satisfies Record<Locale, typeof careerDetailEn>;
export const advantageTranslations = { en: advEn, uk: advUk } satisfies Record<
  Locale,
  typeof advEn
>;
export const roleTranslations = { en: rolesEn, uk: rolesUk } satisfies Record<
  Locale,
  typeof rolesEn
>;
export const systemTranslations = { en: sysEn, uk: sysUk } satisfies Record<Locale, typeof sysEn>;
export const statTranslations = { en: statsEn, uk: statsUk } satisfies Record<
  Locale,
  typeof statsEn
>;
export const pressTranslations = { en: pressEn, uk: pressUk } satisfies Record<
  Locale,
  typeof pressEn
>;
