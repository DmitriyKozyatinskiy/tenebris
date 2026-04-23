export type AdvantageId =
  | 'sealedBoxes'
  | 'remoteActivation'
  | 'multiPlatformLaunch'
  | 'remoteControl'
  | 'autoGuidance'
  | 'altaAres';

export interface Advantage {
  n: string;
  iconName: string;
  id: AdvantageId;
}

export const advantages: readonly Advantage[] = [
  { n: '01', iconName: 'lucide:package', id: 'sealedBoxes' },
  { n: '02', iconName: 'lucide:radio', id: 'remoteActivation' },
  { n: '03', iconName: 'lucide:plane', id: 'multiPlatformLaunch' },
  { n: '04', iconName: 'lucide:radar', id: 'remoteControl' },
  { n: '05', iconName: 'lucide:target', id: 'autoGuidance' },
  { n: '06', iconName: 'lucide:globe', id: 'altaAres' },
];
