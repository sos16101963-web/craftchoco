// SEO-слаги сторінок товарів: окремі для uk і ru (транслітерація назв наборів).
// uk живе на /podarunky/<uk-slug>, ru — на /ru/podarunky/<ru-slug>.
import type { Locale } from "./i18n";

export const PRODUCT_SLUGS: Record<Locale, Record<string, string>> = {
  uk: {
    "set-sixteen": "sviato-bez-povodu",
    "set-combo": "podviyna-nasoloda",
    "set-six": "pershe-pobachennya",
    "set-four": "shepit-na-vuho",
    "envelope-gift": "diakuiu-shcho-ty-ie",
    "art-bars": "mystetstvo-u-ploti",
    "wishes-bars": "vse-shcho-tobi-pobazhaiu",
    "mini-tiles": "rozmova-po-dushakh",
    "bars-fruit": "vidpochinok-pislia-roboty",
    "micro-tiles": "zakhoplennia-nedobrozhylyvtsiv",
    "flowers-six": "buket-iakyi-ne-ziviane",
    "flowers-four": "kompliment-vid-sertsia",
    "roses-marble": "obiimy-kokhanoho",
    "spheres-marble": "halaktyka-bazhan",
  },
  ru: {
    "set-sixteen": "prazdnik-bez-povoda",
    "set-combo": "dvoynoe-udovolstvie",
    "set-six": "pervoe-svidanie",
    "set-four": "shepot-na-uho",
    "envelope-gift": "spasibo-chto-ty-est",
    "art-bars": "iskusstvo-vo-ploti",
    "wishes-bars": "vsyo-chto-tebe-pozhelayu",
    "mini-tiles": "razgovor-po-dusham",
    "bars-fruit": "otdyh-posle-raboty",
    "micro-tiles": "voschishchenie-nedobrozhelateley",
    "flowers-six": "buket-kotoryy-ne-zavyanet",
    "flowers-four": "kompliment-ot-serdtsa",
    "roses-marble": "obyatiya-lyubimogo",
    "spheres-marble": "galaktika-zhelaniy",
  },
};

/** Шлях сторінки товару в даній локалі */
export function productPath(productId: string, locale: Locale): string {
  const slug = PRODUCT_SLUGS[locale][productId];
  return locale === "uk" ? `/podarunky/${slug}` : `/ru/podarunky/${slug}`;
}

/** Знайти id товару за слагом */
export function productIdBySlug(slug: string, locale: Locale): string | undefined {
  return Object.entries(PRODUCT_SLUGS[locale]).find(([, s]) => s === slug)?.[0];
}
