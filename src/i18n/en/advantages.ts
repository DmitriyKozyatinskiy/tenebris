import type { AdvantageId } from '../../data/advantages';

export interface AdvantageStrings {
  title: string;
  description: string;
}

export const advantageStrings: Record<AdvantageId, AdvantageStrings> = {
  sealedBoxes: {
    title: 'Sealed launch boxes',
    description:
      'Weatherproof, hermetically sealed containers hold the drone ready for deployment. The network can be positioned along expected threat corridors months before use.',
  },
  remoteActivation: {
    title: 'Remote in-flight activation',
    description:
      'Operators activate the drone from distance. No one is co-located with the launch site at engagement time.',
  },
  multiPlatformLaunch: {
    title: 'Multi-platform launch',
    description:
      'Launches from ground networks, vehicles, or airborne platforms. Single training set covers every launch mode.',
  },
  remoteControl: {
    title: 'Remote flight control',
    description:
      'Pilot-operators command the interceptor from a secured command post outside the engagement zone.',
  },
  autoGuidance: {
    title: 'Automatic takeoff and terminal guidance',
    description:
      'Takeoff and terminal engagement run without operator intervention. Humans stay in the loop for authorization, not flight stabilization.',
  },
  altaAres: {
    title: 'Alta Ares optical guidance',
    description:
      'Integrated Alta Ares optical seeker from France handles terminal lock and engagement under low-light and countermeasure conditions.',
  },
};
