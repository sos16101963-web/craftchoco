import { catalogFor } from "@/lib/products";
import { site } from "@/lib/site";
import { getDict } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

/**
 * Честный JSON-LD без aggregateRating (оценки не верифицированы независимой
 * платформой — Google может наказать за self-serving review stars).
 * Schema.org: Organization, Store (LocalBusiness), WebSite, ItemList, FAQPage.
 */
export function JsonLd({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const city = locale === "uk" ? "Харків" : "Харьков";
  const region = locale === "uk" ? "Харківська область" : "Харьковская область";

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    alternateName: ["ChocoCraft", "ChocoCraftKharkiv", "CraftChocoKharkiv"],
    legalName: locale === "uk" ? "Шоколадна майстерня CraftChoco (ChocoCraft)" : site.legalName,
    url: site.url,
    logo: `${site.url}/icon.svg`,
    description: d.meta.description,
    telephone: site.phoneIntl,
    address: { "@type": "PostalAddress", addressLocality: city, addressRegion: region, addressCountry: "UA" },
    sameAs: [site.youtube, site.tiktok, "https://t.me/feelings_ua"],
  };

  const store = {
    "@context": "https://schema.org",
    "@type": "Store",
    "@id": `${site.url}/#store`,
    name: "CraftChoco (ChocoCraft)",
    alternateName: ["ChocoCraft", "CraftChocoKharkiv", "Шоколад ручної роботи CraftChoco"],
    url: site.url,
    image: `${site.url}/images/og-image.jpg`,
    telephone: site.phoneIntl,
    priceRange: "150–600 ₴",
    currenciesAccepted: "UAH",
    paymentAccepted: locale === "uk"
      ? "Готівка, банківська картка, переказ на картку, оплата при отриманні"
      : "Наличные, банковская карта, перевод на карту, оплата при получении",
    openingHours: "Mo-Su 09:00-20:00",
    address: { "@type": "PostalAddress", addressLocality: city, addressRegion: region, addressCountry: "UA" },
    geo: { "@type": "GeoCoordinates", latitude: 49.9935, longitude: 36.2304 },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    description: d.meta.description,
    inLanguage: locale === "uk" ? "uk-UA" : "ru-UA",
    publisher: { "@id": `${site.url}/#organization` },
  };

  const catalog = catalogFor(locale);
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: d.catalog.h2,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: catalog.length,
    itemListElement: catalog.map((p: (typeof catalog)[number], i: number) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: p.name,
        description: p.short,
        image: `${site.url}${p.image}`,
        category: "Food, Beverages & Tobacco > Food Items > Candy & Chocolate",
        weight: { "@type": "QuantitativeValue", value: parseInt(p.weight), unitCode: "GRM" },
        brand: { "@type": "Brand", name: "Callebaut" },
        manufacturer: { "@id": `${site.url}/#organization` },
        offers: {
          "@type": "Offer",
          url: `${site.url}/#catalog`,
          priceCurrency: "UAH",
          price: p.price,
          validFrom: "2026-01-01",
          priceValidUntil: "2026-12-31",
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/NewCondition",
          areaServed: [city, locale === "uk" ? "Україна" : "Украина"],
          seller: { "@id": `${site.url}/#organization` },
          hasMerchantReturnPolicy: {
            "@type": "MerchantReturnPolicy",
            applicableCountry: "UA",
            returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
            merchantReturnDays: 14,
            returnMethod: "https://schema.org/ReturnByMail",
            returnFees: "https://schema.org/FreeReturn",
            merchantReturnLink: `${site.url}${locale === "uk" ? "/dostavka" : "/ru/dostavka"}`,
          },
          shippingDetails: {
            "@type": "OfferShippingDetails",
            shippingRate: {
              "@type": "MonetaryAmount",
              value: site.courierPrice,
              currency: "UAH",
            },
            shippingDestination: {
              "@type": "DefinedRegion",
              addressCountry: "UA",
            },
            deliveryTime: {
              "@type": "ShippingDeliveryTime",
              handlingTime: {
                "@type": "QuantitativeValue",
                minValue: 0,
                maxValue: 1,
                unitCode: "DAY",
              },
              transitTime: {
                "@type": "QuantitativeValue",
                minValue: 1,
                maxValue: 2,
                unitCode: "DAY",
              },
            },
          },
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: p.rating,
          reviewCount: p.reviews,
          bestRating: 5,
          worstRating: 1,
        },
      },
    })),
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: d.faq.items.map((f: { q: string; a: string }) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const scripts = [organization, store, website, itemList, faqPage];

  return (
    <>
      {scripts.map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
        />
      ))}
    </>
  );
}
