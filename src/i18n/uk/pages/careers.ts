import type { CareersIndexTranslations, CareerDetailTranslations } from '../../en/pages/careers';

export const careersIndex: CareersIndexTranslations = {
  meta: {
    title: 'Кар’єра · Tenebris',
    description:
      'Інженерні та льотні вакансії в Tenebris — українській оборонно-технологічній компанії, що розробляє автоматизовані дрони-перехоплювачі.',
  },
  hero: {
    eyebrow: 'КАР’ЄРА',
    h1: 'Відкриті вакансії.',
    intro:
      'П’ять позицій у R&D, проєктуванні, авіоніці, польовому сервісі та льотній експлуатації. Ти працюватимеш над системами, що виконують реальні місії над Україною вже через кілька тижнів після старту.',
  },
  list: {
    detailsLabel: 'Деталі позиції',
    applyLabel: 'Відгукнутись',
  },
};

export const careerDetail: CareerDetailTranslations = {
  missionHeading: 'Місія',
  responsibilitiesHeading: 'Обов’язки',
  requirementsHeading: 'Вимоги',
  niceToHavesHeading: 'Буде плюсом',
  applyHeading: 'Відгукнутись',
  applyParagraph:
    'Напиши напряму Катерині — надішли CV та коротке пояснення, чому саме ця позиція. Відповідь від людини протягом двох робочих днів.',
  applyCta: 'Надіслати заявку',
  meta: (role: string) => ({
    title: `${role} · Кар’єра · Tenebris`,
    description: `Відкрита позиція: ${role} у Tenebris — українській оборонно-технологічній компанії. Інженерні та льотні вакансії.`,
  }),
};
