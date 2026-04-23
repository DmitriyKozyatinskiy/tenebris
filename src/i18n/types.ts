export const locales = ['en', 'uk'] as const;
export type Locale = (typeof locales)[number];

export interface LegalEntity {
  legalName: string;
  tradingName: string;
  registrationNumber: string;
  country: string;
  city: string;
  addressLine?: string;
}
