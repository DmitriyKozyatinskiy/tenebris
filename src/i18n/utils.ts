import { defaultLocale, localeHreflang } from './config';
import { locales, type Locale } from './types';

export function toLocale(x: string | undefined): Locale {
  return (locales as readonly string[]).includes(x ?? '') ? (x as Locale) : defaultLocale;
}

export function localizeUrl(path: string, locale: Locale): string {
  // Split off #hash and ?query so they survive prefixing.
  const [pathAndQuery, hash] = path.split('#');
  const [cleanPath, query] = pathAndQuery.split('?');
  const prefix = locale === defaultLocale ? '' : `/${locale}`;
  const finalPath = cleanPath === '/' || cleanPath === '' ? `${prefix}/` : `${prefix}${cleanPath}`;
  return `${finalPath}${query ? '?' + query : ''}${hash ? '#' + hash : ''}`;
}

export function getPathnameLocaleStripped(pathname: string): string {
  const stripped = pathname.replace(/^\/uk(\/|$)/, '/');
  return stripped || '/';
}

export function getHreflangAlternates(pathname: string, siteUrl = 'https://tenebris.com.ua') {
  const stripped = getPathnameLocaleStripped(pathname);
  const out: Array<{ hreflang: string; href: string }> = [];
  for (const l of locales) {
    out.push({
      hreflang: localeHreflang[l],
      href: `${siteUrl}${localizeUrl(stripped, l)}`,
    });
  }
  out.push({ hreflang: 'x-default', href: `${siteUrl}${stripped}` });
  return out;
}
