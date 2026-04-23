export interface ContactPerson {
  purpose: 'cooperation' | 'employment';
  nameKey: 'bohdan' | 'serhii' | 'kateryna';
  phone: string;
  phoneTel: string;
}

export const contactPeople: readonly ContactPerson[] = [
  {
    purpose: 'cooperation',
    nameKey: 'bohdan',
    phone: '+380 66 555 14 88',
    phoneTel: '+380665551488',
  },
  {
    purpose: 'cooperation',
    nameKey: 'serhii',
    phone: '+380 63 850 75 77',
    phoneTel: '+380638507577',
  },
  {
    purpose: 'employment',
    nameKey: 'kateryna',
    phone: '+380 95 910 58 58',
    phoneTel: '+380959105858',
  },
];

export const formRecipientEmail = 's.bohdanovskyi@tenebristech.tech';
export const publicInboxEmail = 'info@tenebris.com.ua';
