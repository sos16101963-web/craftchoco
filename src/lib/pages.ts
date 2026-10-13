// Реєстр внутрішніх сторінок багатосторінкового сайту.
// Кожна сторінка має пару uk/ru для hreflang-перемикача, sitemap і хлібних крихт.
import type { Locale } from "./i18n";

export interface PagePair {
  /** шлях в uk-локалі */
  uk: string;
  /** шлях в ru-локалі (з префіксом /ru) */
  ru: string;
}

export const INNER_PAGES: Record<string, PagePair> = {
  katalog: { uk: "/katalog", ru: "/ru/katalog" },
  korporatyvni: { uk: "/korporatyvni-podary", ru: "/ru/korporativnye-podary" },
  proNas: { uk: "/pro-nas", ru: "/ru/o-nas" },
  tsiny: { uk: "/tsiny", ru: "/ru/tseny" },
  vidhuky: { uk: "/vidhuky", ru: "/ru/otzyvy" },
  dostavka: { uk: "/dostavka", ru: "/ru/dostavka" },
  faq: { uk: "/faq", ru: "/ru/faq" },
  kontakty: { uk: "/kontakty", ru: "/ru/kontakty" },
  blog: { uk: "/blog", ru: "/ru/blog" },
  geoShokolad: { uk: "/shokolad-harkiv", ru: "/ru/shokolad-harkov" },
  geoTsukerky: { uk: "/tsukerky-ruchnoi-roboty-harkiv", ru: "/ru/konfety-ruchnoy-raboty-harkov" },
};

/** Шлях сторінки в даній локалі */
export function pagePath(key: keyof typeof INNER_PAGES | string, locale: Locale): string {
  const pair = INNER_PAGES[key];
  return pair ? pair[locale] : "/";
}

/** Пара (uk-href, ru-href) для перемикача мов у шапці */
export function switchPairFor(path: string): { uk: string; ru: string } {
  const cleanPath = path || "/";

  // 1. Пошук у реєстрі INNER_PAGES
  for (const pair of Object.values(INNER_PAGES)) {
    if (cleanPath === pair.uk || cleanPath === pair.ru) {
      return { uk: pair.uk, ru: pair.ru };
    }
  }

  // 2. Головна сторінка
  if (cleanPath === "/" || cleanPath === "/ru") {
    return { uk: "/", ru: "/ru" };
  }

  // 3. Fallback
  if (cleanPath.startsWith("/ru")) {
    const rest = cleanPath.slice(3) || "/";
    return { uk: rest, ru: cleanPath };
  }
  return { uk: cleanPath, ru: `/ru${cleanPath}` };
}
