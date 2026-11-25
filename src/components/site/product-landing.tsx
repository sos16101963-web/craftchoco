import Link from "next/link";
import { Check, Clock, ShieldCheck, Truck } from "lucide-react";
import { InnerShell } from "@/components/site/inner-shell";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { ProductCard } from "@/components/site/product-card";
import { ProductHeroInteractive } from "@/components/site/product-hero-interactive";
import type { ProductGalleryItem, ProductVariant } from "@/lib/products";
import { switchPairFor } from "@/lib/pages";
import { getDict } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { site, CITIES_SERVED_UK, CITIES_SERVED_RU } from "@/lib/site";
import { productVideoFor, buildVideoObjectLd } from "@/lib/videos";
import { LiteYouTubeShort } from "@/components/site/lite-youtube-short";

export interface LandingProduct {
  id: string;
  name: string;
  categoryLabel: string;
  price: number;
  priceFrom?: boolean;
  weight: string;
  rating: number;
  reviews: number;
  short: string;
  character: string;
  contents: string[];
  description: string;
  ingredients: string;
  storage: string;
  image: string;
  cutImage?: string;
  gallery?: ProductGalleryItem[];
  variants?: ProductVariant[];
  alt: string;
  flavorNotes?: string[];
  perfectFor?: string;
  dietary?: string[];
}

/**
 * Посадочная страница товара (многостраничник): полный SEO-контент,
 * корзина, мессенджеры, термобокс-гарантия, споріднені набори.
 */
export function ProductLanding({
  locale,
  product,
  related,
  canonicalPath,
}: {
  locale: Locale;
  product: LandingProduct;
  related: LandingProduct[];
  canonicalPath: string;
}) {
  const t = getDict(locale);
  const uk = locale === "uk";
  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${uk ? "Шоколад ручної роботи" : "Шоколад ручной работы"} ${product.name}`,
    alternateName: `${product.name} — CraftChoco (ChocoCraft)`,
    description: `${uk ? "Шоколад ручної роботи" : "Шоколад ручной работы"} ${product.name} від майстерні CraftChoco (ChocoCraft). ${product.short}`,
    image: [
      `${site.url}${product.image}`,
      ...(product.cutImage ? [`${site.url}${product.cutImage}`] : []),
      ...((product.gallery ?? []).map((g) => `${site.url}${g.src}`)),
    ],
    sku: product.id,
    category: "Food, Beverages & Tobacco > Food Items > Candy & Chocolate",
    weight: { "@type": "QuantitativeValue", value: parseInt(product.weight), unitCode: "GRM" },
    brand: {
      "@type": "Brand",
      name: "CraftChoco",
      alternateName: ["ChocoCraft", "Callebaut"],
    },
    manufacturer: { "@id": `${site.url}/#organization` },
    offers: {
      "@type": "Offer",
      url: `${site.url}${canonicalPath}`,
      priceCurrency: "UAH",
      price: product.price,
      priceValidUntil: "2027-12-31",
      validFrom: "2024-01-01",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      areaServed: uk ? [...CITIES_SERVED_UK] : [...CITIES_SERVED_RU],
      seller: { "@id": `${site.url}/#organization` },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "UA",
        returnPolicyCategory: "https://schema.org/MerchantReturnNotPermitted",
        merchantReturnLink: `${site.url}${uk ? "/dostavka" : "/ru/dostavka"}`,
      },
      shippingDetails: [
        {
          "@type": "OfferShippingDetails",
          shippingRate: {
            "@type": "MonetaryAmount",
            value: site.courierPrice,
            currency: "UAH",
          },
          shippingDestination: {
            "@type": "DefinedRegion",
            addressRegion: uk ? "Харківська область" : "Харьковская область",
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
              minValue: 0,
              maxValue: 1,
              unitCode: "DAY",
            },
          },
        },
        {
          "@type": "OfferShippingDetails",
          shippingRate: {
            "@type": "MonetaryAmount",
            value: 80,
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
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviews,
      bestRating: 5,
      worstRating: 1,
    },
  };

  const crumbs = [
    { name: uk ? "Каталог шоколаду Callebaut" : "Каталог шоколада Callebaut", path: uk ? "/katalog" : "/ru/katalog" },
    { name: `${product.categoryLabel}: ${product.name}`, path: canonicalPath },
  ];

  const faq = [
    {
      q: uk ? `Скільки зберігається ${product.name}?` : `Сколько хранится ${product.name}?`,
      a: uk
        ? `${product.storage}. Без консервантів — тільки справжній шоколад і вершки, тому ми робимо маленькі партії і відправляємо свіжими.`
        : `${product.storage}. Без консервантов — только настоящий шоколад и сливки, поэтому мы делаем маленькие партии и отправляем свежими.`,
    },
    {
      q: uk ? `Як замовити ${product.name} у Харкові?` : `Как заказать ${product.name} в Харькове?`,
      a: uk
        ? `Додайте набір у корзину або напишіть нам у Viber/Telegram (${site.phoneShort}) — підтвердимо склад, смаки та дату доставки. По Харкову возимо в день замовлення.`
        : `Добавьте набор в корзину или напишите нам в Viber/Telegram (${site.phoneShort}) — подтвердим состав, вкусы и дату доставки. По Харькову возим в день заказа.`,
    },
    {
      q: uk ? `Чи доїде ${product.name} у спеку?` : `Доедет ли ${product.name} в жару?`,
      a: uk
        ? `Так. Кожне замовлення їде у термосумці з охолодженням: навіть за +30°C форма й малюнок залишаться ідеальними. Якщо щось піде не так — замінимо за наш рахунок.`
        : `Да. Каждый заказ едет в термосумке с охлаждением: даже при +30°C форма и рисунок останутся идеальными. Если что-то пойдёт не так — заменим за наш счёт.`,
    },
  ];

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  const productVideo = productVideoFor(product.id);
  const videoLd = buildVideoObjectLd(productVideo, locale);

  return (
    <InnerShell locale={locale} switchPair={switchPairFor(canonicalPath)}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoLd).replace(/</g, "\\u003c") }} />
      <div className="bg-cream-100/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={crumbs} locale={locale} />
        </div>
      </div>

      {/* ——— Герой товару ——— */}
      <section className="bg-cream-100/60 pb-14" aria-label={product.name}>
        <ProductHeroInteractive locale={locale} product={product} />
      </section>

      {/* ——— Опис ——— */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <h2 className="font-display text-3xl font-bold text-choco-900">
              {uk ? `Про ${product.name}` : `О наборе ${product.name}`}
            </h2>
            <div className="mt-5 space-y-4 text-[17px] leading-relaxed text-choco-700">
              {product.description.split("\n\n").map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
            <blockquote className="mt-6 border-l-4 border-gold-500/60 pl-5 font-display text-lg italic leading-relaxed text-choco-800">
              «{product.character}»
              <footer className="mt-2 text-sm not-italic text-choco-500">— {uk ? "ідея набору" : "идея набора"}, CraftChocoKharkiv</footer>
            </blockquote>

            {product.flavorNotes && product.flavorNotes.length > 0 && (
              <div className="mt-8 rounded-2xl border border-gold-500/25 bg-gold-500/5 p-6">
                <h3 className="flex items-center gap-2 font-display text-lg font-bold text-choco-900">
                  <span className="text-xl">🍓</span> {uk ? "Смакова палітра" : "Вкусовая палитра"}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {product.flavorNotes.map((note, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-choco-800">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-600" aria-hidden="true" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.perfectFor && (
              <div className="mt-6 rounded-2xl border border-border bg-white p-6 shadow-sm">
                <h3 className="flex items-center gap-2 font-display text-lg font-bold text-choco-900">
                  <span className="text-xl">🎁</span> {uk ? "Кому ідеально дарувати" : "Кому идеально подарить"}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-choco-700">{product.perfectFor}</p>
              </div>
            )}

            {product.dietary && product.dietary.length > 0 && (
              <div className="mt-6">
                <p className="text-xs font-bold uppercase tracking-wider text-choco-500">
                  {uk ? "Безпека та склад" : "Безопасность и состав"}
                </p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {product.dietary.map((tag, idx) => (
                    <span key={idx} className="inline-flex items-center rounded-full border border-gold-500/30 bg-white px-3.5 py-1 text-xs font-medium text-choco-800 shadow-sm">
                      ✓ {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-border bg-white p-5">
              <h3 className="flex items-center gap-2 font-display text-lg font-bold text-choco-900">
                <Check className="h-5 w-5 text-gold-700" aria-hidden="true" /> {t.common.composition}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-choco-700">{product.ingredients}</p>
            </div>
            <div className="rounded-2xl border border-border bg-white p-5">
              <h3 className="flex items-center gap-2 font-display text-lg font-bold text-choco-900">
                <Clock className="h-5 w-5 text-gold-700" aria-hidden="true" /> {t.common.storage}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-choco-700">{product.storage}</p>
            </div>
            <div className="rounded-2xl border border-border bg-white p-5">
              <h3 className="flex items-center gap-2 font-display text-lg font-bold text-choco-900">
                <Truck className="h-5 w-5 text-gold-700" aria-hidden="true" /> {uk ? "Доставка" : "Доставка"}
              </h3>
              <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-choco-700">
                <li>{uk ? "Харків — кур'єром у день замовлення (100 ₴)" : "Харьков — курьером в день заказа (100 ₴)"}</li>
                <li>{uk ? `Від ${site.freeShippingFrom.toLocaleString("uk-UA")} ₴ — безкоштовно` : `От ${site.freeShippingFrom.toLocaleString("ru-RU")} ₴ — бесплатно`}</li>
                <li>{uk ? "Україна — Нова пошта, 1–2 дні" : "Украина — Новая почта, 1–2 дня"}</li>
                <li className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-gold-700" aria-hidden="true" />
                  {uk ? "у спеку — термобокс з охолодженням, пухирчаста плівка за потреби" : "в жару — термобокс с охлаждением, пузырчатая пленка по необходимости"}
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-white p-5">
              <h3 className="font-display text-lg font-bold text-choco-900">
                {uk ? "Відеоогляд з майстерні" : "Видеообзор из мастерской"}
              </h3>
              <div className="mx-auto mt-4 max-w-[240px]">
                <LiteYouTubeShort
                  videoId={productVideo.id}
                  title={productVideo.title[locale]}
                  views={productVideo.views}
                  locale={locale}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ——— Міні-FAQ ——— */}
      <section className="bg-cream-100/60 py-14" aria-label={uk ? "Питання про набір" : "Вопросы о наборе"}>
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-bold text-choco-900">{uk ? "Питання про набір" : "Вопросы о наборе"}</h2>
          <div className="mt-6 space-y-4">
            {faq.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-border bg-white p-5 open:shadow-md">
                <summary className="cursor-pointer list-none font-semibold text-choco-900 marker:hidden">
                  {f.q}
                </summary>
                <p className="mt-3 text-[15px] leading-relaxed text-choco-700">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Споріднені набори ——— */}
      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8" aria-label={uk ? "Схожі набори" : "Похожие наборы"}>
          <h2 className="font-display text-3xl font-bold text-choco-900">{uk ? "Схожі емоції" : "Похожие эмоции"}</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p as never} locale={locale} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href={uk ? "/katalog" : "/ru/katalog"}
              className="inline-flex h-12 items-center rounded-full border border-choco-900/20 px-8 font-semibold text-choco-900 transition-colors hover:border-gold-500/60 hover:text-gold-700"
            >
              {uk ? "Увесь каталог" : "Весь каталог"}
            </Link>
          </div>
        </section>
      )}
    </InnerShell>
  );
}
