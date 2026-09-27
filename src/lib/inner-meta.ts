// Метадані внутрішніх сторінок: canonical, hreflang-пара, OG, robots.
import type { Metadata } from "next";
import { site } from "./site";
import type { Locale } from "./i18n";

export interface InnerMetaInput {
  /** канонічний шлях цієї сторінки в даній локалі, напр. «/katalog» або «/ru/katalog» */
  path: string;
  /** шлях сторінки в протилежній локалі (для hreflang) */
  altPath: string;
  title: string;
  description: string;
  /** og:image за замовчуванням */
  image?: string;
}

export function innerMeta(locale: Locale, input: InnerMetaInput): Metadata {
  const altLocale: Locale = locale === "uk" ? "ru" : "uk";
  const cleanTitle = input.title
    .replace(/\s*[|—–-]\s*CraftChocoKharkiv\b/gi, "")
    .replace(/\s*[|—–-]\s*CraftChoco\b/gi, "")
    .trim();
  const fullTitle = `${cleanTitle} | ${site.name}`;
  return {
    metadataBase: new URL(site.url),
    title: cleanTitle,
    description: input.description,
    alternates: {
      canonical: input.path,
      languages: {
        "uk-UA": locale === "uk" ? input.path : input.altPath,
        "ru-UA": locale === "ru" ? input.path : input.altPath,
        "x-default": locale === "uk" ? input.path : input.altPath,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "uk" ? "uk_UA" : "ru_UA",
      alternateLocale: locale === "uk" ? "ru_UA" : "uk_UA",
      url: input.path,
      siteName: site.name,
      title: fullTitle,
      description: input.description,
      images: [{ url: input.image ?? "/images/og-image.jpg", width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: input.description,
      images: [input.image ?? "/images/og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    other: locale === "uk" ? {} : { "og:locale:alternate": "uk_UA" },
  };
}

/** JSON-LD «Хлебные крошки» */
export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${site.url}${it.path}`,
    })),
  };
}
