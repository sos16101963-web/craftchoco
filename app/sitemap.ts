import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { INNER_PAGES } from "@/lib/pages";
import { PRODUCT_SLUGS } from "@/lib/slugs";
import { blogUk } from "@/lib/blog-uk";
import { blogRu } from "@/lib/blog-ru";

/**
 * Полная карта многостраничника: обе локали как отдельные <url>
 * с взаимными hreflang-альтернативами. Хабы, 28 посадочных товаров, блог.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pair = (ukPath: string, ruPath: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "weekly"): MetadataRoute.Sitemap[] => [
    {
      url: `${site.url}${ukPath}`,
      lastModified: now,
      changeFrequency,
      priority,
      alternates: { languages: { "uk-UA": `${site.url}${ukPath}`, "ru-UA": `${site.url}${ruPath}` } },
    },
    {
      url: `${site.url}${ruPath}`,
      lastModified: now,
      changeFrequency,
      priority: priority - 0.1,
      alternates: { languages: { "uk-UA": `${site.url}${ukPath}`, "ru-UA": `${site.url}${ruPath}` } },
    },
  ];

  return [
    ...pair("/", "/ru", 1),
    ...Object.values(INNER_PAGES).flatMap((p) => pair(p.uk, p.ru, 0.8)),
    ...Object.keys(PRODUCT_SLUGS.uk).flatMap((id) => pair(`/podarunky/${PRODUCT_SLUGS.uk[id]}`, `/ru/podarunky/${PRODUCT_SLUGS.ru[id]}`, 0.9)),
    ...blogUk.flatMap((a) => {
      const ruSlug = blogRu.find((r) => r.date === a.date)?.slug;
      return ruSlug ? pair(`/blog/${a.slug}`, `/ru/blog/${ruSlug}`, 0.6) : [];
    }),
  ];
}
