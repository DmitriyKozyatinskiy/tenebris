export type StatId = 'intercepts' | 'rolesOpen' | 'inService';

export interface Stat {
  value: string;
  id: StatId;
}

export const stats: readonly Stat[] = [
  { value: '100+', id: 'intercepts' },
  { value: '5', id: 'rolesOpen' },
  { value: '2024', id: 'inService' },
];
