import type { LegalEntity, Locale } from './types';

const ukEntity: LegalEntity = {
  legalName: 'Товариство з обмеженою відповідальністю «Тенебріс»',
  tradingName: 'Tenebris',
  registrationNumber: '45226064',
  country: 'Україна',
  city: 'Київ',
};

const enEntity: LegalEntity = {
  legalName: 'Tenebris LLC',
  tradingName: 'Tenebris',
  registrationNumber: '45226064',
  country: 'Ukraine',
  city: 'Kyiv',
};

export function getLegalEntity(locale: Locale): LegalEntity {
  return locale === 'uk' ? ukEntity : enEntity;
}
