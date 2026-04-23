import type { StatId } from '../../data/stats';
import type { StatStrings } from '../en/stats';

export const statStrings: Record<StatId, StatStrings> = {
  intercepts: { label: 'підтверджених перехоплень', footnote: 'станом на 2026-04' },
  rolesOpen: { label: 'відкриті вакансії' },
  inService: { label: 'перша поставка' },
};
