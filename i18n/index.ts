import type { Locale } from "./types";
import { uk, type Dict } from "./uk";
import { ru } from "./ru";
import { productsUk } from "./products-uk";
import type { Product } from "@/lib/products";

export type { Locale };
export { defaultLocale, locales, localePath } from "./types";

const dicts: Record<Locale, Dict> = { uk, ru };

export const getDict = (locale: Locale): Dict => dicts[locale];

/** Числа: 3 000 в uk-UA и ru-RU группируются одинаково, но разделители формата разные исторически */
export const fmtInt = (value: number, locale: Locale): string =>
  value.toLocaleString(locale === "uk" ? "uk-UA" : "ru-RU");

export const formatPrice = (value: number, locale: Locale = "uk"): string =>
  `${fmtInt(value, locale)} ₴`;

export const formatProductPrice = (p: Product, locale: Locale = "uk"): string =>
  p.priceFrom ? `${locale === "uk" ? "від" : "от"} ${formatPrice(p.price, locale)}` : formatPrice(p.price, locale);

/** Простые шаблоны: "{sum} ₴" -> подстановка значений */
export const tpl = (template: string, vars: Record<string, string | number>): string =>
  Object.entries(vars).reduce(
    (acc, [key, value]) => acc.replaceAll(`{${key}}`, String(value)),
    template,
  );

/** Слово «відгук/відгуки/відгуків» и «отзыв/отзыва/отзывов» с правильными плюралами */
export const reviewWord = (n: number, locale: Locale): string => {
  if (locale === "uk") {
    const mod100 = n % 100;
    const mod10 = n % 10;
    if (mod10 === 1 && mod100 !== 11) return "відгук";
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "відгуки";
    return "відгуків";
  }
  const mod100 = n % 100;
  const mod10 = n % 10;
  if (mod10 === 1 && mod100 !== 11) return "отзыв";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "отзыва";
  return "отзывов";
};

/** Продукт с текстами на нужной локали */
export type LocalizedProduct = Product;

/** Продукт с текстами на нужной локали (uk-тексты живут в products-uk.ts, ru — в products.ts) */
export const localizeProduct = (p: Product, locale: Locale): LocalizedProduct => {
  if (locale === "ru") return p;
  const t = productsUk[p.id];
  if (!t) return p;
  return { ...p, ...t };
};

export { uk, ru };
export type { Dict };
