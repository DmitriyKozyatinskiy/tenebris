export type RoleSlug =
  | 'r-and-d-engineer'
  | 'design-engineer'
  | 'combat-uav-pilot'
  | 'electronics-engineer'
  | 'service-engineer';

export interface Role {
  slug: RoleSlug;
  icon: string;
  employmentType: 'FULL_TIME' | 'CONTRACT';
  baseLocation: string;
  remote: boolean;
  postedISO: string;
  validThroughISO: string;
}

export const roles: readonly Role[] = [
  {
    slug: 'r-and-d-engineer',
    icon: 'lucide:cpu',
    employmentType: 'FULL_TIME',
    baseLocation: 'Kyiv, Ukraine',
    remote: false,
    postedISO: '2026-04-23',
    validThroughISO: '2027-04-23',
  },
  {
    slug: 'design-engineer',
    icon: 'lucide:target',
    employmentType: 'FULL_TIME',
    baseLocation: 'Kyiv, Ukraine',
    remote: false,
    postedISO: '2026-04-23',
    validThroughISO: '2027-04-23',
  },
  {
    slug: 'combat-uav-pilot',
    icon: 'lucide:plane',
    employmentType: 'FULL_TIME',
    baseLocation: 'Kyiv, Ukraine',
    remote: false,
    postedISO: '2026-04-23',
    validThroughISO: '2027-04-23',
  },
  {
    slug: 'electronics-engineer',
    icon: 'lucide:radio',
    employmentType: 'FULL_TIME',
    baseLocation: 'Kyiv, Ukraine',
    remote: false,
    postedISO: '2026-04-23',
    validThroughISO: '2027-04-23',
  },
  {
    slug: 'service-engineer',
    icon: 'lucide:map-pin',
    employmentType: 'FULL_TIME',
    baseLocation: 'Ukraine',
    remote: false,
    postedISO: '2026-04-23',
    validThroughISO: '2027-04-23',
  },
];

export function getRole(slug: string): Role | undefined {
  return roles.find((r) => r.slug === slug);
}
