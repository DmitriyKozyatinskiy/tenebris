import type { StatId } from '../../data/stats';

export interface StatStrings {
  label: string;
  footnote?: string;
}

export const statStrings: Record<StatId, StatStrings> = {
  intercepts: { label: 'confirmed intercepts', footnote: 'as of 2026-04' },
  rolesOpen: { label: 'open roles' },
  inService: { label: 'first delivery' },
};
