import { common as en, type CommonTranslations } from './en/common';
import { common as uk } from './uk/common';
import type { Locale } from './types';

export const commonTranslations: Record<Locale, CommonTranslations> = { en, uk };
export type { CommonTranslations };
