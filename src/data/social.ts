export interface SocialLinks {
  linkedin: string | null;
  instagram: string | null;
  x: string | null;
  telegram: string | null;
  youtube: string | null;
}

// Placeholder until real handles are available.
export const socialLinks: SocialLinks = {
  linkedin: null,
  instagram: null,
  x: null,
  telegram: null,
  youtube: null,
};

export function getSameAs(): string[] {
  return Object.values(socialLinks).filter((v): v is string => typeof v === 'string');
}
