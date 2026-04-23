export type RoleSlug =
  | 'r-and-d-engineer'
  | 'design-engineer'
  | 'combat-uav-pilot'
  | 'electronics-engineer'
  | 'service-engineer';

export interface Role {
  slug: RoleSlug;
  employmentType: 'FULL_TIME' | 'CONTRACT';
  baseLocation: string;
  postedISO: string;
  validThroughISO: string;
}

export const roles: readonly Role[] = [
  {
    slug: 'r-and-d-engineer',
    employmentType: 'FULL_TIME',
    baseLocation: 'Kyiv, Ukraine',
    postedISO: '2026-04-23',
    validThroughISO: '2027-04-23',
  },
  {
    slug: 'design-engineer',
    employmentType: 'FULL_TIME',
    baseLocation: 'Kyiv, Ukraine',
    postedISO: '2026-04-23',
    validThroughISO: '2027-04-23',
  },
  {
    slug: 'combat-uav-pilot',
    employmentType: 'FULL_TIME',
    baseLocation: 'Kyiv, Ukraine',
    postedISO: '2026-04-23',
    validThroughISO: '2027-04-23',
  },
  {
    slug: 'electronics-engineer',
    employmentType: 'FULL_TIME',
    baseLocation: 'Kyiv, Ukraine',
    postedISO: '2026-04-23',
    validThroughISO: '2027-04-23',
  },
  {
    slug: 'service-engineer',
    employmentType: 'FULL_TIME',
    baseLocation: 'Ukraine',
    postedISO: '2026-04-23',
    validThroughISO: '2027-04-23',
  },
];

export function getRole(slug: string): Role | undefined {
  return roles.find((r) => r.slug === slug);
}
