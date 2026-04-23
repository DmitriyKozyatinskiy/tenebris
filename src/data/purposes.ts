export const PURPOSES = ['cooperation', 'employment', 'press', 'other'] as const;
export type Purpose = (typeof PURPOSES)[number];
