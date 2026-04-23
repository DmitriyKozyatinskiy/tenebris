export interface PressItem {
  id: string;
  outlet: string;
  url: string;
  dateISO: string;
  lang: 'uk' | 'en';
  thumbnail: string;
  publisherCountry: string;
}

export const press: readonly PressItem[] = [
  {
    id: 'devua-bahnet-2025',
    outlet: 'dev.ua',
    url: 'https://dev.ua/news/v-ukraini-stvoryly-dron-perekhopliuvach-bahnet-dlia-borotby-z-shakhedamy-1754572796',
    dateISO: '2025-08-07',
    lang: 'uk',
    thumbnail: '/photos/Znimok-ekrana-2025-08-06-184351-900x458-1600.webp',
    publisherCountry: 'UA',
  },
  {
    id: 'thedefender-alta-ares-2025',
    outlet: 'The Defender',
    url: 'https://thedefender.media/uk/2025/11/alta-ares-drone-presented/',
    dateISO: '2025-11-15',
    lang: 'uk',
    thumbnail: '/photos/420479_13_new_960x500_0-1600.webp',
    publisherCountry: 'UA',
  },
];
