// Адрес сайта: на Vercel по умолчанию используется https://craft-choco.vercel.app.
// Если проект в Vercel назван иначе или подключён свой домен — задайте переменную
// NEXT_PUBLIC_SITE_URL (например, https://craft-choco.vercel.app или https://ваш-домен).
export const site = {
  name: "CraftChoco",
  alternateName: "CraftChocoKharkiv",
  legalName: "Шоколадная мастерская CraftChocoKharkiv",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://crafo.com.ua",
  slogan: "Шоколад ручной работы из бельгийского шоколада Callebaut",
  description:
    "Шоколадная мастерская CraftChocoKharkiv в Харькове: конфеты с фруктовыми ганашами, шоколадные розы и цветы, плитки и бруски с орехами и сухофруктами — ручная работа из бельгийского шоколада Callebaut. Эмоциональные подарочные наборы с доставкой по Харькову и всей Украине. Заказы от 3 000 ₴ доставим бесплатно.",
  phone: "+380 96 253 56 10",
  phoneShort: "096 253 56 10",
  phoneHref: "tel:+380962535610",
  phoneIntl: "+380962535610",
  city: "Харьков",
  address: "г. Харьков, работаем по всему городу",
  hours: "Принимаем заказы ежедневно с 9:00 до 20:00",
  freeShippingFrom: 3000,
  courierPrice: 100,
  youtube: "https://www.youtube.com/@craft.choco.kharkiv",
  messengers: [
    { name: "Viber", href: "viber://chat?number=%2B380962535610", hint: "096 253 56 10" },
    { name: "WhatsApp", href: "https://wa.me/380962535610", hint: "096 253 56 10" },
    { name: "Telegram", href: "https://t.me/+380962535610", hint: "096 253 56 10" },
  ],
  social: [
    { name: "Viber", href: "viber://chat?number=%2B380962535610" },
    { name: "WhatsApp", href: "https://wa.me/380962535610" },
    { name: "Telegram", href: "https://t.me/+380962535610" },
    { name: "YouTube", href: "https://www.youtube.com/@craft.choco.kharkiv" },
  ],
} as const;

export const rating = {
  value: "4.9",
  count: 2847,
} as const;
