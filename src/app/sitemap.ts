import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { INNER_PAGES } from "@/lib/pages";
import { PRODUCT_SLUGS } from "@/lib/slugs";
import { products } from "@/lib/products";
import { blogUk } from "@/lib/blog-uk";
import { blogRu } from "@/lib/blog-ru";

/**
 * Останній реліз контенту та технічного SEO для комерційних сторінок сайту.
 * Фіксована дата запобігає знеціненню тега <lastmod> пошуковими роботами Google.
 */
const CONTENT_UPDATE_DATE = new Date("2026-10-08T21:00:00.000Z");

interface PagePairOptions {
  ukPath: string;
  ruPath: string;
  priority: number;
  changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"];
  lastModified?: Date;
  images?: string[];
}

/**
 * Генерує пару взаємопов'язаних сторінок (uk/ru) за стандартами Google Multilingual SEO 2026:
 * містить прямі hreflang посилання uk-UA, ru-UA та обов'язковий x-default (ukPath).
 */
function createLocalizedPair({
  ukPath,
  ruPath,
  priority,
  changeFrequency = "weekly",
  lastModified = CONTENT_UPDATE_DATE,
  images,
}: PagePairOptions): MetadataRoute.Sitemap {
  const alternates = {
    languages: {
      "uk-UA": `${site.url}${ukPath}`,
      "ru-UA": `${site.url}${ruPath}`,
      "x-default": `${site.url}${ukPath}`,
    },
  };

  return [
    {
      url: `${site.url}${ukPath}`,
      lastModified,
      changeFrequency,
      priority,
      alternates,
      images,
    },
    {
      url: `${site.url}${ruPath}`,
      lastModified,
      changeFrequency,
      priority: Math.max(0.1, Number((priority - 0.05).toFixed(2))),
      alternates,
      images,
    },
  ];
}

/**
 * Повна XML-карта сайту за стандартами Google Search Central 2026:
 * - 64 канонічні сторінки (Головна, Хаби, 28 Посадкових сторінок товарів, Блог).
 * - Повна перехресна розмітка hreflang + x-default.
 * - Прив'язка зображень високої роздільної здатності для Google Зображень.
 * - Валідні дати останньої модифікації (lastmod) для коректного Crawl Budget.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const ogImage = [`${site.url}/images/og-image.jpg`];

  // 1. Головна сторінка
  const homePages = createLocalizedPair({
    ukPath: "/",
    ruPath: "/ru",
    priority: 1.0,
    changeFrequency: "daily",
    images: ogImage,
  });

  // 2. Внутрішні хаби та гео-посадкові сторінки
  const innerPages = Object.entries(INNER_PAGES).flatMap(([key, p]) => {
    const isCatalog = key === "katalog";
    return createLocalizedPair({
      ukPath: p.uk,
      ruPath: p.ru,
      priority: isCatalog ? 0.9 : 0.8,
      changeFrequency: isCatalog ? "daily" : "weekly",
      images: ogImage,
    });
  });

  // 3. Сторінки товарів (14 наборів * 2 мови = 28 URL з медіа)
  const productPages = Object.keys(PRODUCT_SLUGS.uk).flatMap((id) => {
    const ukSlug = PRODUCT_SLUGS.uk[id];
    const ruSlug = PRODUCT_SLUGS.ru[id];
    const product = products.find((p) => p.id === id);
    const productImages = product?.image
      ? [
          `${site.url}${product.image}`,
          ...(product.gallery?.map((img) => `${site.url}${img.src}`) || []),
        ]
      : ogImage;

    return createLocalizedPair({
      ukPath: `/podarunky/${ukSlug}`,
      ruPath: `/ru/podarunky/${ruSlug}`,
      priority: 0.9,
      changeFrequency: "weekly",
      images: productImages,
    });
  });

  // 4. Експертні статті блогу (E-E-A-T)
  const blogPages = blogUk.flatMap((article) => {
    const ruSlug = blogRu.find((r) => r.date === article.date)?.slug;
    if (!ruSlug) return [];

    const articleDate = new Date(`${article.date}T10:00:00.000Z`);

    return createLocalizedPair({
      ukPath: `/blog/${article.slug}`,
      ruPath: `/ru/blog/${ruSlug}`,
      priority: 0.7,
      changeFrequency: "monthly",
      lastModified: isNaN(articleDate.getTime()) ? CONTENT_UPDATE_DATE : articleDate,
      images: ogImage,
    });
  });

  return [
    ...homePages,
    ...innerPages,
    ...productPages,
    ...blogPages,
  ];
}

