import { ui, defaultLang, languages } from './ui';

export type Lang = keyof typeof ui;

/** Reads the current locale from an Astro URL, falling back to the default. */
export function getLangFromUrl(url: URL): Lang {
  const [, maybeLang] = url.pathname.split('/');
  if (maybeLang && maybeLang in ui) return maybeLang as Lang;
  return defaultLang;
}

/** Returns a t() translator bound to a given language. */
export function useTranslations(lang: Lang) {
  return function t(
    key: keyof (typeof ui)[typeof defaultLang],
    vars?: Record<string, string>,
  ): string {
    let str: string = ui[lang][key] ?? ui[defaultLang][key] ?? String(key);
    if (vars) {
      for (const [k, v] of Object.entries(vars)) {
        str = str.replaceAll(`{${k}}`, v);
      }
    }
    return str;
  };
}

/** Strips a leading /pt (or /en) from a pathname, returning the "bare" path. */
function stripLangFromPath(pathname: string): string {
  const parts = pathname.split('/').filter(Boolean);
  if (parts[0] && parts[0] in ui) parts.shift();
  return '/' + parts.join('/');
}

/** Builds a same-page link for a target language, given the current URL. */
export function getLocalizedPath(url: URL, targetLang: Lang): string {
  const bare = stripLangFromPath(url.pathname);
  const cleanBare = bare === '/' ? '' : bare;
  if (targetLang === defaultLang) return cleanBare || '/';
  return `/${targetLang}${cleanBare}`;
}

/** Prefixes an internal path (e.g. "/filming") with the current language. */
export function localizePath(path: string, lang: Lang): string {
  if (lang === defaultLang) return path;
  return `/${lang}${path === '/' ? '' : path}`;
}

export { languages };
