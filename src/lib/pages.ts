// Реєстр внутрішніх сторінок багатосторінкового сайту.
// Кожна сторінка має пару uk/ru для hreflang-перемикача, sitemap і хлібних крихт.
import type { Locale } from "./i18n";
import { PRODUCT_SLUGS, productIdBySlug } from "./slugs";

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
  sommelier: { uk: "/sommelier", ru: "/ru/sommelier" },
};

/** Мовні пари слагов статей блогу (1-to-1 відповідність, без колізій за датою) */
export const BLOG_SLUG_PAIRS: ReadonlyArray<{ uk: string; ru: string }> = [
  { uk: "yak-zberihaty-shokolad", ru: "kak-khranit-shokolad" },
  { uk: "chomu-callebaut", ru: "pochemu-callebaut" },
  { uk: "temperuvannia-shokoladu", ru: "temperirovanie-shokolada" },
  { uk: "iakyi-shokoladnyi-podarunok-obraty", ru: "kakoy-shokoladnyy-podarok-vybrat" },
  { uk: "shokoladni-bukety", ru: "shokoladnye-bukety" },
  { uk: "handmade-proty-fabryky", ru: "handmade-protiv-fabriki" },
  { uk: "podarunok-u-znak-vdyachnosti-kharkiv", ru: "podarok-v-znak-blagodarnosti-kharkov" },
  { uk: "podarunok-mami-ta-kokhaniy-bez-pryvodu", ru: "podarok-mame-i-lyubimoy-bez-povoda" },
  { uk: "korysni-solodoshchi-dityam-medianty", ru: "poleznye-sladosti-detyam-medianty" },
  { uk: "yistivni-korporatyvni-podarunky-novyi-rik", ru: "sedobnye-korporativnye-podarki-novyy-god" },
  { uk: "podarunky-na-sviatoho-mykolaia-shokolad", ru: "podarki-na-den-svyatogo-nikolaya-shokolad" },
  { uk: "podarunok-choloviku-u-yakoho-vse-ye-shokolad", ru: "podarok-muzhchine-u-kotorogo-vse-est-shokolad" },
];

export const BLOG_UPDATED_DATE = "2026-11-04";

const UPDATED_UK_BLOG_SLUGS = new Set([
  "podarunok-choloviku-u-yakoho-vse-ye-shokolad",
  "podarunky-na-sviatoho-mykolaia-shokolad",
  "shokoladni-bukety",
  "yistivni-korporatyvni-podarunky-novyi-rik",
  "podarunok-mami-ta-kokhaniy-bez-pryvodu",
]);

/** Повертає дату останнього оновлення статті (синхронізовано між sitemap.xml та Article JSON-LD) */
export function blogArticleModifiedDate(slug: string, publishedDate: string): string {
  const pair = BLOG_SLUG_PAIRS.find((p) => p.uk === slug || p.ru === slug);
  if (pair && UPDATED_UK_BLOG_SLUGS.has(pair.uk)) {
    return BLOG_UPDATED_DATE;
  }
  return publishedDate;
}

/** Знайти слаг статті блогу в альтернативній локалі */
export function blogAltSlug(slug: string, fromLocale: Locale): string | undefined {
  const pair = BLOG_SLUG_PAIRS.find((p) => p[fromLocale] === slug);
  if (!pair) return undefined;
  return fromLocale === "uk" ? pair.ru : pair.uk;
}

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

  // 3. Сторінки товарів
  if (cleanPath.startsWith("/podarunky/")) {
    const slug = cleanPath.slice("/podarunky/".length);
    const id = productIdBySlug(slug, "uk");
    if (id) {
      return {
        uk: `/podarunky/${PRODUCT_SLUGS.uk[id]}`,
        ru: `/ru/podarunky/${PRODUCT_SLUGS.ru[id]}`,
      };
    }
  } else if (cleanPath.startsWith("/ru/podarunky/")) {
    const slug = cleanPath.slice("/ru/podarunky/".length);
    const id = productIdBySlug(slug, "ru");
    if (id) {
      return {
        uk: `/podarunky/${PRODUCT_SLUGS.uk[id]}`,
        ru: `/ru/podarunky/${PRODUCT_SLUGS.ru[id]}`,
      };
    }
  }

  // 4. Статті блогу
  if (cleanPath.startsWith("/blog/")) {
    const slug = cleanPath.slice("/blog/".length);
    const pair = BLOG_SLUG_PAIRS.find((p) => p.uk === slug);
    if (pair) {
      return { uk: `/blog/${pair.uk}`, ru: `/ru/blog/${pair.ru}` };
    }
  } else if (cleanPath.startsWith("/ru/blog/")) {
    const slug = cleanPath.slice("/ru/blog/".length);
    const pair = BLOG_SLUG_PAIRS.find((p) => p.ru === slug);
    if (pair) {
      return { uk: `/blog/${pair.uk}`, ru: `/ru/blog/${pair.ru}` };
    }
  }

  // 5. Fallback
  if (cleanPath.startsWith("/ru")) {
    const rest = cleanPath.slice(3) || "/";
    return { uk: rest, ru: cleanPath };
  }
  return { uk: cleanPath, ru: `/ru${cleanPath}` };
}
