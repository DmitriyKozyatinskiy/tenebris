export interface CommonTranslations {
  nav: {
    systems: string;
    advantages: string;
    training: string;
    press: string;
    careers: string;
    contact: string;
  };
  footer: {
    rights: string;
    registrationLabel: string;
  };
  a11y: {
    skipToContent: string;
    openMenu: string;
    closeMenu: string;
  };
  form: {
    required: string;
    sending: string;
    success: string;
    error: string;
  };
  breadcrumbs: {
    home: string;
    careers: string;
  };
  consent: {
    eyebrow: string;
    body: string;
    accept: string;
    decline: string;
  };
}

export const common: CommonTranslations = {
  nav: {
    systems: 'Systems',
    advantages: 'Capabilities',
    training: 'Training',
    press: 'Press',
    careers: 'Careers',
    contact: 'Contact',
  },
  footer: {
    rights: 'All rights reserved.',
    registrationLabel: 'Registration',
  },
  a11y: {
    skipToContent: 'Skip to content',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },
  form: {
    required: '(required)',
    sending: 'Sending…',
    success: 'Received. We will respond shortly.',
    error: 'Submission failed. Try again or call the numbers listed.',
  },
  breadcrumbs: {
    home: 'Home',
    careers: 'Careers',
  },
  consent: {
    eyebrow: '[ COOKIES · ANALYTICS ]',
    body: 'We use cookies for basic analytics (Google Analytics 4) to understand how this site is used. No ad targeting, no personal data.',
    accept: 'Accept',
    decline: 'Decline',
  },
};
