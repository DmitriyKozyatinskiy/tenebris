import type { SpecKey } from '../../data/systems';

export interface SystemStrings {
  specLabels: Record<SpecKey, string>;
  specValues: Record<SpecKey, string>;
}

export const systemStrings: SystemStrings = {
  specLabels: {
    class: 'CLASS',
    role: 'ROLE',
    guidance: 'GUIDANCE',
    automation: 'AUTOMATION',
    launch: 'LAUNCH',
    status: 'STATUS',
  },
  specValues: {
    class: 'Interceptor UAV',
    role: 'Destruction of Shahed-class aerial targets',
    guidance: 'Alta Ares optical seeker (France)',
    automation: 'Automatic takeoff and terminal guidance',
    launch: 'Sealed-box network; remote trigger',
    status: 'In active service',
  },
};
