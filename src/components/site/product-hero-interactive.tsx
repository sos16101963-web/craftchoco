"use client";

import { useEffect, useState } from "react";
import { Check, Send, Snowflake } from "lucide-react";
import { ImageSwap } from "@/components/site/image-swap";
import { AddToCartButton } from "@/components/site/add-to-cart-button";
import { QuickOrderButtons } from "@/components/site/quick-order-buttons";
import { formatProductPrice } from "@/lib/products";
import { site } from "@/lib/site";
import { trackIntent } from "@/lib/analytics";
import { getDict } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import type { LandingProduct } from "./product-landing";

/** Інтерактивна героїчна секція товару з перемикачем розмірів/варіантів коробки */
export function ProductHeroInteractive({
  locale,
  product,
}: {
  locale: Locale;
  product: LandingProduct;
}) {
  const t = getDict(locale);
  const uk = locale === "uk";
  const variants = product.variants ?? [];
  const defaultVariant = variants.length > 0 ? variants[variants.length - 1] : undefined;

  const [selectedVariantId, setSelectedVariantId] = useState<string | undefined>(defaultVariant?.id);
  const [externalImage, setExternalImage] = useState<{ src: string; alt?: string; seq: number } | undefined>(
    undefined,
  );
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeVariant = variants.find((v) => v.id === selectedVariantId) ?? defaultVariant;
  const activePrice = activeVariant?.price ?? product.price;
  const activeWeight = activeVariant?.weight ?? product.weight;
  const activePriceFrom = activeVariant ? false : product.priceFrom;
  const activeCartId = activeVariant ? `${product.id}::${activeVariant.id}` : product.id;
  const activeName = activeVariant ? `${product.name} (${activeVariant.label})` : product.name;

  return (
    <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
      <ImageSwap
        image={product.image}
        cutImage={product.cutImage}
        gallery={product.gallery}
        alt={product.alt}
        locale={locale}
        priority
        externalImage={externalImage}
      />

      <div>
        <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-gold-700">
          {product.categoryLabel} · {uk ? "майстерня CraftChoco (ChocoCraft), Харків" : "мастерская CraftChoco (ChocoCraft), Харьков"}
        </p>
        <h1 className="mt-2.5 font-display text-3xl font-bold leading-[1.12] text-choco-900 sm:text-4xl lg:text-5xl">
          <span className="mb-1 block text-xl font-semibold text-gold-700 sm:text-2xl">
            {uk ? "Шоколад ручної роботи" : "Шоколад ручной работы"}
          </span>
          {product.name}
        </h1>
        <p className="mt-3 text-lg italic leading-snug text-choco-600">{product.character}</p>

        <div className="mt-4 flex items-center gap-2 text-sm text-choco-600">
          <span className="inline-flex items-center rounded-full bg-gold-500/15 px-3 py-1 font-bold text-gold-700">
            ★ {product.rating}
          </span>
          <span>
            {product.reviews} {t.common.reviewsWord}
          </span>
          <span aria-hidden="true">·</span>
          <span>{activeWeight}</span>
        </div>

        <div className="mt-6 flex flex-wrap items-baseline gap-3">
          <span className="font-display text-4xl font-bold text-choco-900">
            {formatProductPrice({ price: activePrice, priceFrom: activePriceFrom } as never, locale)}
          </span>
          <span className="text-sm text-choco-500">{activeWeight}</span>
        </div>
        {activePriceFrom && (
          <p className="mt-2 max-w-md text-xs leading-relaxed text-choco-500">{t.common.priceFromNote}</p>
        )}

        {variants.length > 0 && (
          <div className="mt-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold-700">
              {uk ? "Оберіть розмір коробки:" : "Выберите размер коробки:"}
            </p>
            <div className="mt-2.5 grid grid-cols-3 gap-2.5">
              {variants.map((v) => {
                const isSelected = activeVariant?.id === v.id;
                return (
                  <button
                    key={v.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => {
                      setSelectedVariantId(v.id);
                      if (v.image) {
                        setExternalImage((prev) => ({
                          src: v.image!,
                          alt: v.boxLabel ? `${product.name} — ${v.label} (${v.boxLabel})` : product.alt,
                          seq: (prev?.seq ?? 0) + 1,
                        }));
                      }
                    }}
                    className={`flex flex-col items-center rounded-2xl border px-3 py-2.5 text-center transition-all ${
                      isSelected
                        ? "border-gold-600 bg-choco-950 text-gold-300 shadow-md ring-2 ring-gold-500/40"
                        : "border-gold-500/30 bg-white text-choco-900 hover:border-gold-500 hover:bg-gold-500/5"
                    }`}
                  >
                    <span className="font-display text-sm font-bold">{v.label}</span>
                    <span className={`mt-0.5 text-base font-extrabold ${isSelected ? "text-cream" : "text-gold-700"}`}>
                      {v.price} ₴
                    </span>
                    {v.boxLabel && (
                      <span className={`mt-0.5 text-[10px] leading-tight ${isSelected ? "text-gold-300/80" : "text-choco-500"}`}>
                        {v.boxLabel}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="glass-surface mt-6 rounded-2xl border border-gold-500/30 p-5 shadow-sm">
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

        <div className="mt-7 space-y-3">
          <AddToCartButton
            productId={activeCartId}
            productName={activeName}
            price={activePrice}
            priceFrom={activePriceFrom}
            locale={locale}
            className="btn-gold-luxe h-14 w-full rounded-full text-base font-bold"
          />

          <QuickOrderButtons
            productName={activeName}
            price={activePrice}
            locale={locale}
          />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-choco-700">
          <span className="flex items-center gap-1.5 rounded-lg bg-white/80 p-2 font-medium shadow-sm">
            ⚡ {uk ? "Свіжа партія цього тижня" : "Свежая партия этой недели"}
          </span>
          <span className="flex items-center gap-1.5 rounded-lg bg-white/80 p-2 font-medium shadow-sm">
            💌 {uk ? "Листівка в подарунок" : "Открытка в подарок"}
          </span>
        </div>

        <p className="mt-3 flex items-center gap-2 rounded-xl bg-gold-500/10 px-4 py-2.5 text-[13px] font-semibold text-choco-800">
          <Snowflake className="h-4 w-4 shrink-0 text-gold-700" aria-hidden="true" />
          {t.thermo.title}. {t.thermo.text}
        </p>
      </div>

      {/* Плавающая нижняя панель покупки для мобильных устройств */}
      {showSticky && (
        <div
          className="fixed inset-x-0 bottom-0 z-40 border-t border-gold-500/30 bg-cream/95 px-4 py-3 shadow-[0_-12px_32px_-12px_rgba(28,16,9,0.25)] backdrop-blur-md md:hidden"
          role="region"
          aria-label={uk ? "Швидке замовлення" : "Быстрый заказ"}
        >
          <div className="mx-auto flex max-w-lg items-center justify-between gap-2.5">
            <div className="min-w-0">
              <p className="truncate text-xs font-bold text-choco-900">{activeName}</p>
              <p className="font-display text-lg font-bold leading-tight text-gold-700">
                {formatProductPrice({ price: activePrice, priceFrom: activePriceFrom } as never, locale)}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <a
                href={site.messengers[2].href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackIntent("telegram", activeName, activePrice)}
                aria-label="Telegram"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#229ed9]/40 bg-[#229ed9]/15 text-[#0088cc]"
              >
                <Send className="h-4 w-4" />
              </a>
              <AddToCartButton
                productId={activeCartId}
                productName={activeName}
                price={activePrice}
                priceFrom={activePriceFrom}
                locale={locale}
                className="btn-gold-luxe h-11 rounded-full px-5 text-sm font-bold"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
