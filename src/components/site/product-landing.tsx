import Link from "next/link";
import { Check, Clock, MessageCircle, ShieldCheck, Snowflake, Truck } from "lucide-react";
import { InnerShell } from "@/components/site/inner-shell";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { ImageSwap } from "@/components/site/image-swap";
import { AddToCartButton } from "@/components/site/add-to-cart-button";
import { ProductCard } from "@/components/site/product-card";
import { catalogFor, formatProductPrice } from "@/lib/products";
import { switchPairFor } from "@/lib/pages";
import { getDict } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { breadcrumbLd } from "@/lib/inner-meta";

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
    name: product.name,
    description: product.short,
    image: [`${site.url}${product.image}`, ...(product.cutImage ? [`${site.url}${product.cutImage}`] : [])],
    sku: product.id,
    category: product.categoryLabel,
    brand: { "@type": "Brand", name: "Callebaut" },
    manufacturer: { "@id": `${site.url}/#organization` },
    offers: {
      "@type": "Offer",
      url: `${site.url}${canonicalPath}`,
      priceCurrency: "UAH",
      price: product.price,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      areaServed: [uk ? "Харків" : "Харьков", uk ? "Україна" : "Украина"],
      seller: { "@id": `${site.url}/#organization` },
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
    { name: uk ? "Каталог" : "Каталог", path: uk ? "/katalog" : "/ru/katalog" },
    { name: product.name, path: canonicalPath },
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

  return (
    <InnerShell locale={locale} switchPair={switchPairFor(canonicalPath)}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd).replace(/</g, "\\u003c") }} />
      <div className="bg-cream-100/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={crumbs} locale={locale} />
        </div>
      </div>

      {/* ——— Герой товару ——— */}
      <section className="bg-cream-100/60 pb-14" aria-label={product.name}>
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
          <ImageSwap image={product.image} cutImage={product.cutImage} alt={product.alt} locale={locale} priority />

          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.25em] text-gold-700">
              {product.categoryLabel} · {uk ? "ручна робота, Харків" : "ручная работа, Харьков"}
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold leading-[1.08] text-choco-900 sm:text-5xl">{product.name}</h1>
            <p className="mt-3 text-lg italic leading-snug text-choco-600">{product.character}</p>

            <div className="mt-4 flex items-center gap-2 text-sm text-choco-600">
              <span className="inline-flex items-center rounded-full bg-gold-500/15 px-3 py-1 font-bold text-gold-700">
                ★ {product.rating}
              </span>
              <span>
                {product.reviews} {t.common.reviewsWord}
              </span>
              <span aria-hidden="true">·</span>
              <span>{product.weight}</span>
            </div>

            <div className="mt-6 flex flex-wrap items-baseline gap-3">
              <span className="font-display text-4xl font-bold text-choco-900">{formatProductPrice(product as never, locale)}</span>
              <span className="text-sm text-choco-500">{product.weight}</span>
            </div>
            {product.priceFrom && <p className="mt-2 max-w-md text-xs leading-relaxed text-choco-500">{t.common.priceFromNote}</p>}

            <div className="mt-6 rounded-2xl border border-gold-500/25 bg-white/70 p-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold-700">{t.common.inSet}</p>
              <ul className="mt-3 space-y-2 text-[15px]">
                {product.contents.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-700" aria-hidden="true" />
                    <span className="leading-snug text-choco-800">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <AddToCartButton
                productId={product.id}
                productName={product.name}
                price={product.price}
                priceFrom={product.priceFrom}
                locale={locale}
              />
              <a
                href={site.messengers[2].href}
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-choco-900/20 px-7 text-base font-semibold text-choco-900 transition-colors hover:border-gold-500/60 hover:text-gold-700"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                {uk ? "Замовити в Telegram" : "Заказать в Telegram"}
              </a>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-choco-700 sm:grid-cols-3">
              <span className="flex items-center gap-1.5 rounded-lg bg-white/80 p-2 font-medium shadow-sm">
                ⚡ {uk ? "Свіжа партія цього тижня" : "Свежая партия этой недели"}
              </span>
              <span className="flex items-center gap-1.5 rounded-lg bg-white/80 p-2 font-medium shadow-sm">
                💌 {uk ? "Листівка в подарунок" : "Открытка в подарок"}
              </span>
              <span className="col-span-2 flex items-center gap-1.5 rounded-lg bg-white/80 p-2 font-medium shadow-sm sm:col-span-1">
                💳 {uk ? "Оплата при отриманні" : "Оплата при получении"}
              </span>
            </div>

            <p className="mt-3 flex items-center gap-2 rounded-xl bg-gold-500/10 px-4 py-2.5 text-[13px] font-semibold text-choco-800">
              <Snowflake className="h-4 w-4 shrink-0 text-gold-700" aria-hidden="true" />
              {t.thermo.title}. {t.thermo.text}
            </p>
          </div>
        </div>
      </section>

      {/* ——— Опис ——— */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <h2 className="font-display text-3xl font-bold text-choco-900">
              {uk ? `Про ${product.name}` : `О наборе ${product.name}`}
            </h2>
            <p className="mt-5 text-[17px] leading-relaxed text-choco-700">{product.description}</p>
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
                  {uk ? "термобокс з охолодженням у кожному замовленні" : "термобокс с охлаждением в каждом заказе"}
                </li>
              </ul>
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
