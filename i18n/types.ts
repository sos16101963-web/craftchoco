export type Locale = "uk" | "ru";

export const locales: Locale[] = ["uk", "ru"];
/** Українська — державна мова та мова за замовчуванням ("/"), російська — "/ru" */
export const defaultLocale: Locale = "uk";

export const localePath = (locale: Locale): string => (locale === defaultLocale ? "/" : `/${locale}`);
