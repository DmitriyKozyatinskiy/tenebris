export interface HomeTranslations {
  meta: { title: string; description: string };
  hero: {
    eyebrow: string;
    h1: string;
    sub: string;
    primaryCta: string;
    secondaryCta: string;
  };
  proof: {
    eyebrow: string;
    heading: string;
  };
  systems: {
    eyebrow: string;
    heading: string;
    intro: string;
    imgAlt: string;
  };
  advantages: {
    eyebrow: string;
    heading: string;
  };
  training: {
    eyebrow: string;
    heading: string;
    paragraph1: string;
    paragraph2: string;
    bullets: string[];
    cta: string;
    imgAlt: string;
  };
  press: {
    eyebrow: string;
    heading: string;
    readMore: string;
  };
  careers: {
    eyebrow: string;
    heading: string;
    intro: string;
    seeAll: string;
  };
  contact: {
    eyebrow: string;
    heading: string;
    intro: string;
    form: {
      name: string;
      email: string;
      organization: string;
      organizationOptional: string;
      purpose: string;
      purposeOptions: Record<'cooperation' | 'employment' | 'press' | 'other', string>;
      message: string;
      submit: string;
      subjectByPurpose: Record<'cooperation' | 'employment' | 'press' | 'other', string>;
    };
    directHeading: string;
    peopleRoleLabel: Record<'cooperation' | 'employment', string>;
    peopleNames: Record<'bohdan' | 'serhii' | 'kateryna', string>;
    cityLine: string;
    mailLabel: string;
  };
}

export const home: HomeTranslations = {
  meta: {
    title: 'Tenebris · Interceptor drone systems',
    description:
      'Ukrainian interceptor drones. Maximum automation, minimum operator training. Combat-proven with over 100 confirmed aerial intercepts.',
  },
  hero: {
    eyebrow: 'TNB · 2024 – 2026 · KYIV',
    h1: 'Automated interceptors for the aerial threat.',
    sub: 'Tenebris builds systems for the destruction of enemy aerial targets with the highest level of automation and the lowest operator entry threshold.',
    primaryCta: 'Request cooperation',
    secondaryCta: 'View systems',
  },
  proof: {
    eyebrow: '01 · IN SERVICE',
    heading: 'Deployed and hunting.',
  },
  systems: {
    eyebrow: '02 · SYSTEMS',
    heading: 'The Bahnet interceptor.',
    intro:
      'Bahnet is a sealed-box, remotely activated interceptor drone. Operators launch it from fixed networks or mobile platforms. Takeoff and terminal engagement run automatically; the pilot authorizes, the drone flies.',
    imgAlt: 'Bahnet interceptor drone on display at a defense exhibition.',
  },
  advantages: {
    eyebrow: '03 · CAPABILITIES',
    heading: 'What the system does.',
  },
  training: {
    eyebrow: '04 · TRAINING',
    heading: 'Remote pilot-operator training.',
    paragraph1:
      'We train interceptor pilots end-to-end, remotely, from anywhere in the world. The program covers sealed-box operation, target acquisition, terminal engagement, and post-mission analysis.',
    paragraph2:
      'Operators graduate ready to deploy on the Bahnet platform without on-site overhead.',
    bullets: [
      'Remote, structured, cohort-based.',
      'No prior UAV combat experience required.',
      'Certification on completion.',
    ],
    cta: 'Apply to train',
    imgAlt: 'Bahnet interceptor drone close-up at a defense industry exhibition.',
  },
  press: {
    eyebrow: '05 · PRESS',
    heading: 'Coverage.',
    readMore: 'Read the article',
  },
  careers: {
    eyebrow: '06 · CAREERS',
    heading: 'Join the team.',
    intro:
      'We build systems that intercept real aerial threats over Ukraine. If you want your work to matter this year and not in 2030, look below.',
    seeAll: 'All open roles',
  },
  contact: {
    eyebrow: '07 · CONTACT',
    heading: 'Contact.',
    intro: 'Cooperation, procurement, press, and employment below.',
    form: {
      name: 'Name',
      email: 'Email',
      organization: 'Organization',
      organizationOptional: 'optional',
      purpose: 'Purpose',
      purposeOptions: {
        cooperation: 'Cooperation',
        employment: 'Employment',
        press: 'Press',
        other: 'Other',
      },
      message: 'Message',
      submit: 'Send message',
      subjectByPurpose: {
        cooperation: '[Tenebris] Cooperation inquiry',
        employment: '[Tenebris] Employment inquiry',
        press: '[Tenebris] Press inquiry',
        other: '[Tenebris] Inquiry',
      },
    },
    directHeading: 'Direct contact',
    peopleRoleLabel: {
      cooperation: 'Cooperation',
      employment: 'Employment',
    },
    peopleNames: {
      bohdan: 'Bohdan',
      serhii: 'Serhii',
      kateryna: 'Kateryna',
    },
    cityLine: 'Kyiv, Ukraine',
    mailLabel: 'Email',
  },
};
