import type { Metadata, Viewport } from "next";
import ReactDOM from "react-dom";
import "../../app/globals.css";
import { LazyToaster } from "@/components/site/lazy-toaster";
import { Analytics } from "@/components/site/analytics";
import { SiteShell } from "@/components/site/site-shell";
import { dictionaries } from "@/lib/i18n";
import { site } from "@/lib/site";
import type { Locale } from "@/lib/i18n";

/* LCP-шрифты (логотип + H1 в первом экране): fetch стартует из HTML,
   до разбора render-blocking CSS. ReactDOM.preload дедуплицируется React'ом. */
function FontPreloads() {
  ReactDOM.preload("/fonts/playfair-latin.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  ReactDOM.preload("/fonts/playfair-cyrillic.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  return null;
}

export function makeMetadata(locale: Locale): Metadata {
  const d = dictionaries[locale];
  const canonicalPath = locale === "uk" ? "/" : "/ru";
  return {
    metadataBase: new URL(site.url),
    title: { default: d.meta.title, template: `%s | CraftChoco (ChocoCraft)` },
    description: d.meta.description,
    keywords: [
      locale === "uk" ? "шоколадні медіанти купити" : "шоколадные медианты купить",
      locale === "uk" ? "дитячий шоколад ручної роботи" : "детский шоколад ручной работы",
      locale === "uk" ? "корисні солодощі для дітей" : "полезные сладости для детей",
      locale === "uk" ? "шоколадні фігурки для дітей" : "шоколадные фигурки для детей",
      locale === "uk" ? "цукерки ручної роботи" : "конфеты ручной работы",
      locale === "uk" ? "купити цукерки ручної роботи" : "купить конфеты ручной работы",
      locale === "uk" ? "шоколадні цукерки ручної роботи" : "шоколадные конфеты ручной работы",
      "шоколад ручной работы",
      "шоколад ручної роботи",
      locale === "uk" ? "купити шоколад ручної роботи" : "купить шоколад ручной работы",
      "chococraft",
      "choco craft",
      "craftchoco",
      "craft choco",
      "chococraft kharkiv",
      "craft choco kharkiv",
      locale === "uk" ? "шоколад харків" : "шоколад харьков",
      "шоколад ручної роботи харків",
      "шоколад ручной работы харьков",
      locale === "uk" ? "цукерки ручної роботи харків" : "конфеты ручной работы харьков",
      locale === "uk" ? "купити цукерки харків" : "купить конфеты харьков",
      "craftchocokharkiv",
      "шоколад callebaut",
      locale === "uk" ? "бельгійський шоколад купити" : "бельгийский шоколад купить",
      locale === "uk" ? "шоколадні цукерки харків" : "шоколадные конфеты харьков",
      locale === "uk" ? "подарункові набори харків" : "подарочные наборы харьков",
      locale === "uk" ? "цукерки в подарунок харків" : "конфеты в подарок харьков",
      locale === "uk" ? "шоколадні троянди купити" : "шоколадные розы купить",
      locale === "uk" ? "крафтовий шоколад україна" : "крафтовый шоколад украина",
      locale === "uk" ? "шоколад на замовлення харків" : "шоколад на заказ харьков",
      "corporate gifts ukraine",
      locale === "uk" ? "корпоративні подарунки харків" : "корпоративные подарки харьков",
    ],
    alternates: {
      canonical: canonicalPath,
      languages: {
        "uk-UA": "/",
        "ru-UA": "/ru",
        "x-default": "/",
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "uk" ? "uk_UA" : "ru_UA",
      alternateLocale: locale === "uk" ? "ru_UA" : "uk_UA",
      url: canonicalPath,
      siteName: site.name,
      title: d.meta.title,
      description: d.meta.description,
      images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: d.meta.title,
      description: d.meta.description,
      images: ["/images/og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    other: locale === "uk" ? {} : { "og:locale:alternate": "uk_UA" },
  };
}

export const viewport: Viewport = {
  themeColor: "#1c1009",
  width: "device-width",
  initialScale: 1,
};

export function RootLayoutBase({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return (
    <html lang={locale}>
      <body className="flex min-h-screen flex-col bg-cream font-body text-choco-900 antialiased">
        {/* React 19 поднимает эти <link rel=preload> в <head> при SSR и гидратации */}
        <FontPreloads />
        {children}
        <LazyToaster />
        <Analytics />
      </body>
    </html>
  );
}

export { SiteShell };
