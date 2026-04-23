import type { RoleSlug } from '../../data/roles';

export interface RoleStrings {
  title: string;
  teamLabel: string;
  shortLine: string;
  mission: string;
  responsibilities: string[];
  requirements: string[];
  niceToHaves: string[];
  locationLabel: string;
  employmentLabel: string;
}

export const roleStrings: Record<RoleSlug, RoleStrings> = {
  'r-and-d-engineer': {
    title: 'R&D Engineer',
    teamLabel: 'Research & Development',
    shortLine: 'Explore new airframe, guidance, and launch concepts.',
    mission:
      'Drive the next generation of the Bahnet platform. Prototype new airframes, test guidance-module integrations, and run controlled field trials against realistic threats.',
    responsibilities: [
      'Design and iterate prototype airframes and payload configurations.',
      'Characterize flight envelope, range, and terminal engagement performance.',
      'Run controlled field tests against emulated threat targets.',
      'Document findings so production engineering can ship improvements.',
    ],
    requirements: [
      'Engineering degree or equivalent hands-on UAV experience.',
      'Practical experience with composite airframes, propulsion, or guidance.',
      'Willingness to work in a wartime production tempo.',
    ],
    niceToHaves: [
      'Prior work on interceptor or loitering munition platforms.',
      'Experience with optical guidance or image-based seekers.',
    ],
    locationLabel: 'Location',
    employmentLabel: 'Employment',
  },
  'design-engineer': {
    title: 'Design Engineer',
    teamLabel: 'Mechanical Design',
    shortLine: 'Turn R&D prototypes into manufacturable systems.',
    mission:
      'Translate validated prototypes into production-ready designs. Own mechanical documentation, tolerancing, and supplier coordination.',
    responsibilities: [
      'Produce manufacturing-grade CAD, drawings, and BOMs.',
      'Work directly with machine shops and assemblers on first articles.',
      'Design for field-serviceability and rapid repair.',
      'Maintain the single source of truth for every component version.',
    ],
    requirements: [
      'Solid mechanical engineering background.',
      'Fluent in a parametric CAD toolchain.',
      'Bias for action. You choose the simplest part that works.',
    ],
    niceToHaves: [
      'Experience shipping hardware in a regulated environment.',
      'Familiarity with additive manufacturing and small-batch production.',
    ],
    locationLabel: 'Location',
    employmentLabel: 'Employment',
  },
  'combat-uav-pilot': {
    title: 'Combat UAV pilot',
    teamLabel: 'Flight Operations',
    shortLine: 'Experienced combat UAV operator, ready to fly interceptors.',
    mission:
      'Fly interceptor missions on the Bahnet platform. Train new operators on our workflow. Feed operational signal back into R&D.',
    responsibilities: [
      'Plan and execute intercept missions against live aerial threats.',
      'Own post-mission analysis with the R&D and electronics teams.',
      'Train and certify new pilot-operators.',
    ],
    requirements: [
      'Documented combat UAV flight experience in Ukraine or comparable theater.',
      'Clean record with current Ukrainian AF or approved integrator.',
      'Calm in high-tempo engagement environments.',
    ],
    niceToHaves: [
      'Experience with optically guided platforms.',
      'Instructor or training-cell background.',
    ],
    locationLabel: 'Location',
    employmentLabel: 'Employment',
  },
  'electronics-engineer': {
    title: 'Electronics Engineer',
    teamLabel: 'Avionics',
    shortLine: 'Own the flight computer, radios, and integration with Alta Ares.',
    mission:
      'Design, build, and integrate the avionics stack. Keep the radio link resilient. Support the Alta Ares seeker integration at the hardware boundary.',
    responsibilities: [
      'Board design, layout, and bring-up for flight-control and datalink electronics.',
      'Integrate third-party modules (incl. Alta Ares seeker) at the hardware level.',
      'Debug in the field and turn the fix into a firmware or hardware revision.',
    ],
    requirements: [
      'Strong electronics engineering foundation (schematic + PCB).',
      'Comfortable with RF fundamentals, especially at UAV datalink frequencies.',
      'Experienced with embedded firmware debugging.',
    ],
    niceToHaves: [
      'Prior work on combat UAV avionics.',
      'Experience with radio-jamming countermeasures.',
    ],
    locationLabel: 'Location',
    employmentLabel: 'Employment',
  },
  'service-engineer': {
    title: 'Service Engineer',
    teamLabel: 'Field Service',
    shortLine: 'Deploy, maintain, and repair systems at operator sites.',
    mission:
      'Own the relationship with deployed units. Get systems into service quickly. Keep them flying. Feed every failure mode back into the design team within days.',
    responsibilities: [
      'Install and commission launch networks at operator sites across Ukraine.',
      'Run scheduled maintenance and field repairs.',
      'Train unit technicians on daily checks and first-line fixes.',
    ],
    requirements: [
      'Hands-on mechanical + electrical diagnostic skills.',
      'Willing to travel extensively within Ukraine.',
      'Calm, structured, good communicator under stress.',
    ],
    niceToHaves: ['Prior field service in a defense context.', 'Driver licence category B or C.'],
    locationLabel: 'Location',
    employmentLabel: 'Employment',
  },
};
