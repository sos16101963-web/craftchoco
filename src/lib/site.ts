// Официальный рабочий домен сайта: https://crafo.com.ua
export const site = {
  name: "CraftChoco",
  alternateName: "ChocoCraft",
  brandAliases: ["CraftChoco", "ChocoCraft", "CraftChocoKharkiv", "ChocoCraftKharkiv"],
  legalName: "Шоколадная мастерская CraftChoco (ChocoCraft)",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://crafo.com.ua",
  slogan: "Шоколад ручной работы CraftChoco (ChocoCraft) из бельгийского Callebaut",
  description:
    "Шоколадная мастерская CraftChoco (ChocoCraft) в Харькове: шоколад ручной работы, конфеты с фруктовыми ганашами, шоколадные розы и цветы из бельгийского Callebaut. Подарочные наборы от 150 ₴ с доставкой по Харькову и всей Украине. Бесплатно от 3 000 ₴.",
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
  youtubeHandle: "@craft.choco.kharkiv",
  tiktok: "https://www.tiktok.com/@aleksandr_mag_",
  tiktokHandle: "@aleksandr_mag_",
  messengers: [
    { name: "Viber", href: "viber://chat?number=%2B380962535610", hint: "096 253 56 10" },
    { name: "WhatsApp", href: "https://wa.me/380962535610", hint: "096 253 56 10" },
    { name: "Telegram", href: "https://t.me/feelings_ua", hint: "@feelings_ua" },
  ],
  social: [
    { name: "Viber", href: "viber://chat?number=%2B380962535610" },
    { name: "WhatsApp", href: "https://wa.me/380962535610" },
    { name: "Telegram", href: "https://t.me/feelings_ua" },
    { name: "YouTube", href: "https://www.youtube.com/@craft.choco.kharkiv" },
    { name: "TikTok", href: "https://www.tiktok.com/@aleksandr_mag_" },
  ],
} as const;

export const rating = {
  value: "4.9",
  count: 500,
} as const;

export const CITIES_SERVED_UK = [
  "Харків",
  "Київ",
  "Дніпро",
  "Одеса",
  "Запоріжжя",
  "Полтава",
  "Кривий Ріг",
  "Житомир",
  "Україна",
] as const;

export const CITIES_SERVED_RU = [
  "Харьков",
  "Киев",
  "Днепр",
  "Одесса",
  "Запорожье",
  "Полтава",
  "Кривой Рог",
  "Житомир",
  "Украина",
] as const;
