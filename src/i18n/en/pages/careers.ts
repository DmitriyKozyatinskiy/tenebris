export interface CareersIndexTranslations {
  meta: { title: string; description: string };
  hero: {
    eyebrow: string;
    h1: string;
    intro: string;
  };
}

export interface CareerDetailTranslations {
  missionHeading: string;
  responsibilitiesHeading: string;
  requirementsHeading: string;
  niceToHavesHeading: string;
  applyHeading: string;
  applyParagraph: string;
  applyCta: string;
  meta: (role: string) => { title: string; description: string };
}

export const careersIndex: CareersIndexTranslations = {
  meta: {
    title: 'Careers · Tenebris',
    description:
      'Engineering and flight-operations roles at Tenebris, a Ukrainian defense-technology company building automated interceptor drones.',
  },
  hero: {
    eyebrow: 'CAREERS',
    h1: 'Open roles.',
    intro:
      'Five roles across R&D, design, avionics, field service, and flight operations. You will work on systems flying real missions over Ukraine within weeks of joining.',
  },
};

export const careerDetail: CareerDetailTranslations = {
  missionHeading: 'Mission',
  responsibilitiesHeading: 'Responsibilities',
  requirementsHeading: 'Requirements',
  niceToHavesHeading: 'Nice to have',
  applyHeading: 'Apply',
  applyParagraph:
    'Write directly to Kateryna with your CV and a short note about why this role. You will get a human reply within two working days.',
  applyCta: 'Send application',
  meta: (role: string) => ({
    title: `${role} · Careers · Tenebris`,
    description: `Open role: ${role} at Tenebris, a Ukrainian defense-technology company. Engineering and flight-operations positions.`,
  }),
};
