import { site } from "./site";
import type { Locale } from "./i18n";

export interface VideoMeta {
  id: string;
  uploadDate: string;
  duration: string;
  views: string;
  title: { uk: string; ru: string };
  description: { uk: string; ru: string };
}

/** 4 топові YouTube Shorts з каналу @craft.choco.kharkiv для головної сторінки */
export const FEATURED_VIDEOS: ReadonlyArray<VideoMeta> = [
  {
    id: "DszvA1jpjS8",
    uploadDate: "2026-11-02T16:30:38+00:00",
    duration: "PT21S",
    views: "2.8K",
    title: {
      uk: "Справжній смак бельгійського шоколаду без пальмової олії",
      ru: "Шоколадные конфеты ручной работы — настоящий вкус без пальмового масла",
    },
    description: {
      uk: "100% натуральне какао-масло Callebaut без пальмового жиру та консервантів. Ручна робота майстерні CraftChoco у Харкові.",
      ru: "100% натуральное какао-масло Callebaut без пальмового жира и консервантов. Ручная работа мастерской CraftChoco в Харькове.",
    },
  },
  {
    id: "q3I9Ps_Vz9U",
    uploadDate: "2026-11-04T15:45:09+00:00",
    duration: "PT20S",
    views: "1.8K",
    title: {
      uk: "Як ми створюємо цукерки та плитки ручної роботи у Харкові",
      ru: "Шоколад ручной работы — как мы создаем конфеты и плитки в Харькове",
    },
    description: {
      uk: "Закулісся шоколадної майстерні CraftChoco: темперування, ручний розпис какао-маслом та пакування свіжих наборів.",
      ru: "Закулисье шоколадной мастерской CraftChoco: темперирование, ручная роспись какао-маслом и упаковка свежих наборов.",
    },
  },
  {
    id: "TGedkqcYpbI",
    uploadDate: "2026-11-19T15:45:34+00:00",
    duration: "PT22S",
    views: "1.4K",
    title: {
      uk: "Сміливі смаки: сир брі з журавлиною та кава з малиною",
      ru: "Конфеты ручной работы — смелые вкусы: сыр бри с клюквой и кофе с малиной",
    },
    description: {
      uk: "Авторські дуети начинок у наборі «Палітра смаків» із бельгійського шоколаду Callebaut.",
      ru: "Авторские дуэты начинок в наборе «Палитра вкусов» из бельгийского шоколада Callebaut.",
    },
  },
  {
    id: "iTnWq2RHsZg",
    uploadDate: "2026-11-20T15:45:22+00:00",
    duration: "PT20S",
    views: "1.2K",
    title: {
      uk: "Індивідуальний підхід: ти не просто чек №4589, а улюблений клієнт",
      ru: "Шоколадные конфеты ручной работы: ты не просто чек №4589, а любимый клиент",
    },
    description: {
      uk: "Особисте виготовлення під замовлення, свіжі партії без складського пилу та підписана листівка в кожному наборі.",
      ru: "Личное изготовление под заказ, свежие партии без складской пыли и подписанная открытка в каждом наборе.",
    },
  },
];

const EXTRA_VIDEOS: Record<string, VideoMeta> = {
  giftSets: {
    id: "4_xdpTR375Q",
    uploadDate: "2026-11-13T15:45:31+00:00",
    duration: "PT20S",
    views: "1.1K",
    title: {
      uk: "Шоколадні цукерки ручної роботи: подарунок, в якому живе душа",
      ru: "Шоколадные конфеты ручной работы: подарок, в котором живет душа",
    },
    description: {
      uk: "Святкові набори авторських корпусних цукерок у преміальній коробці від CraftChoco.",
      ru: "Праздничные наборы авторских корпусных конфет в премиальной коробке от CraftChoco.",
    },
  },
  flowers: {
    id: "bjh9QhaTXfQ",
    uploadDate: "2026-11-06T15:45:27+00:00",
    duration: "PT20S",
    views: "1.2K",
    title: {
      uk: "Шоколадні квіти та букети ручної роботи — подарунок, що не зів'яне",
      ru: "Шоколад ручной работы — подарок девушке, который не окажется в мусорке через 3 дня",
    },
    description: {
      uk: "Їстівні шоколадні троянди та сфери з фруктовим ганашем на 100% шоколаді Callebaut.",
      ru: "Съедобные шоколадные розы и сферы с фруктовым ганашем на 100% шоколаде Callebaut.",
    },
  },
  bars: {
    id: "wuZc--bf32M",
    uploadDate: "2026-11-09T15:45:30+00:00",
    duration: "PT20S",
    views: "1.0K",
    title: {
      uk: "Крафтові шоколадні плитки та бруски Callebaut для поціновувачів",
      ru: "Шоколад ручной работы: почему статусные мужчины больше не покупают конфеты в супермаркете",
    },
    description: {
      uk: "Товсті ремісничі плитки та шоколадні бруски темного, молочного і карамельного шоколаду.",
      ru: "Толстые ремесленные плитки и шоколадные бруски темного, молочного и карамельного шоколада.",
    },
  },
  mediants: {
    id: "hGCmDabjs_8",
    uploadDate: "2026-11-05T15:45:38+00:00",
    duration: "PT20S",
    views: "0.7K",
    title: {
      uk: "Домашній шоколад із сублімованими ягодами та горіхами",
      ru: "Домашний шоколад: как выглядит настоящий крафт с ягодами и орехами",
    },
    description: {
      uk: "Бельгійські медіанти та шоколад із цільним фундуком, кеш'ю, ягодами годжі й манго.",
      ru: "Бельгийские медианты и шоколад с цельным фундуком, кешью, ягодами годжи и манго.",
    },
  },
};

const PRODUCT_VIDEO_MAP: Record<string, VideoMeta> = {
  "cheese-gran": EXTRA_VIDEOS.giftSets,
  "set-sixteen": EXTRA_VIDEOS.giftSets,
  "set-twelve": EXTRA_VIDEOS.giftSets,
  "set-nine": FEATURED_VIDEOS[2],
  "set-combo": EXTRA_VIDEOS.giftSets,
  "set-six": EXTRA_VIDEOS.giftSets,
  "set-four": EXTRA_VIDEOS.giftSets,
  "envelope-gift": EXTRA_VIDEOS.giftSets,
  "flowers-six": EXTRA_VIDEOS.flowers,
  "flowers-garden": EXTRA_VIDEOS.flowers,
  "flowers-four": EXTRA_VIDEOS.flowers,
  "flowers-trio": EXTRA_VIDEOS.flowers,
  "roses-marble": EXTRA_VIDEOS.flowers,
  "spheres-marble": EXTRA_VIDEOS.flowers,
  "art-bars": EXTRA_VIDEOS.bars,
  "wishes-bars": EXTRA_VIDEOS.bars,
  "mini-tiles": EXTRA_VIDEOS.bars,
  "bars-fruit": EXTRA_VIDEOS.bars,
  "micro-tiles": EXTRA_VIDEOS.bars,
  "mediants-friends": EXTRA_VIDEOS.mediants,
  "mediants-four": EXTRA_VIDEOS.mediants,
};

/** Повертає релевантне YouTube-відео для картки товару */
export function productVideoFor(productId: string): VideoMeta {
  return PRODUCT_VIDEO_MAP[productId] ?? FEATURED_VIDEOS[0];
}

/** Генерує валідну мікророзмітку Schema.org VideoObject */
export function buildVideoObjectLd(video: VideoMeta, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title[locale],
    description: video.description[locale],
    thumbnailUrl: [`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`],
    uploadDate: video.uploadDate,
    duration: video.duration,
    contentUrl: `https://www.youtube.com/shorts/${video.id}`,
    embedUrl: `https://www.youtube.com/embed/${video.id}`,
    inLanguage: locale === "uk" ? "uk-UA" : "ru-UA",
    publisher: { "@id": `${site.url}/#organization` },
  };
}
