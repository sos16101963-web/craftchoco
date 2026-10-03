"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ShoppingBag, MessageCircle, Send, Phone } from "lucide-react";
import { productPath } from "@/lib/slugs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useCart } from "@/store/cart";
import { formatProductPrice, formatPrice } from "@/lib/products";
import { getDict } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { toast } from "sonner";
import { trackIntent } from "@/lib/analytics";
import { Stars } from "./stars";

interface CardProduct {
  id: string;
  name: string;
  categoryLabel: string;
  price: number;
  priceFrom?: boolean;
  weight: string;
  cocoa?: number;
  rating: number;
  reviews: number;
  badges: ("hit" | "new")[];
  character: string;
  contents: string[];
  description: string;
  ingredients: string;
  storage: string;
  image: string;
  cutImage?: string;
  alt: string;
}

export function ProductCard({ product, locale }: { product: CardProduct; locale: Locale }) {
  const t = getDict(locale);
  const [open, setOpen] = useState(false);
  const add = useCart((s) => s.add);

  const handleAdd = () => {
    add(product.id);
    toast.success(t.common.added, {
      description: `«${product.name}» — ${formatProductPrice(product as never, locale)}`,
    });
  };

  const isFreeItem = (item: string) => item.includes(t.common.freeBadge);

  return (
    <article className="card-lift group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="img-zoom relative aspect-square">
        {/* Основное фото */}
        <Image
          src={product.image}
          alt={product.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-opacity duration-500 group-hover:opacity-0"
        />
        {/* Разрез начинки — эффект «слюноотделения» при наведении */}
        {product.cutImage && (
          <Image
            src={product.cutImage}
            alt={t.catalog.cutAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.badges.includes("hit") && (
            <Badge className="w-fit rounded-full bg-gold-500 px-3 py-1 text-xs font-bold text-choco-950 hover:bg-gold-500">
              {t.catalog.hit}
            </Badge>
          )}
          {product.badges.includes("new") && (
            <Badge className="w-fit rounded-full bg-choco-900 px-3 py-1 text-xs font-bold text-gold-300 hover:bg-choco-900">
              {t.catalog.isNew}
            </Badge>
          )}
        </div>
        {product.cutImage && (
          <span className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-choco-950/70 px-3 py-1 text-[11px] font-semibold text-gold-300 opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
            {t.catalog.cutHover}
          </span>
        )}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant="secondary"
              size="sm"
              className="absolute bottom-3 right-3 translate-y-2 rounded-full bg-white/90 px-4 font-semibold text-choco-900 opacity-0 shadow-lg backdrop-blur transition-all duration-300 hover:bg-white group-hover:translate-y-0 group-hover:opacity-100"
            >
              {t.common.details}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[92vh] overflow-y-auto bg-cream sm:max-w-3xl scrollbar-thin">
            <DialogHeader>
              <DialogTitle className="sr-only">{product.name}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="relative aspect-square overflow-hidden rounded-2xl">
                <Image src={product.image} alt={product.alt} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" />
              </div>
              <div className="flex flex-col">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-700">{product.categoryLabel}</p>
                <h3 className="mt-1.5 font-display text-2xl font-bold text-choco-900">{product.name}</h3>
                <p className="mt-1 text-sm italic leading-snug text-choco-500">{product.character}</p>
                <div className="mt-2 flex items-center gap-2 text-sm text-choco-600">
                  <Stars rating={product.rating} locale={locale} />
                  <span className="font-semibold text-choco-800">{product.rating}</span>
                  <span aria-hidden="true">·</span>
                  <span>{product.reviews} {t.common.reviewsWord}</span>
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-choco-700">{product.description}</p>

                <div className="mt-4 rounded-2xl bg-cream-100 p-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold-700">{t.common.inSet}</p>
                  <ul className="mt-2.5 space-y-1.5 text-sm">
                    {product.contents.map((item) => {
                      const isFree = isFreeItem(item);
                      return (
                        <li key={item} className="flex items-start gap-2">
                          <Check
                            className={`mt-0.5 h-4 w-4 shrink-0 ${isFree ? "text-gold-700" : "text-choco-400"}`}
                            aria-hidden="true"
                          />
                          {isFree ? (
                            <span className="font-semibold leading-snug text-choco-900">
                              {item.replace(` — ${t.common.freeBadge}`, "")}{" "}
                              <span className="ml-0.5 inline-block rounded-full bg-gold-500/20 px-2 py-px text-[10px] font-bold uppercase tracking-wide text-gold-700">
                                {t.common.freeBadge}
                              </span>
                            </span>
                          ) : (
                            <span className="leading-snug text-choco-800">{item}</span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <dl className="mt-4 grid grid-cols-2 gap-3 rounded-2xl bg-cream-100 p-4 text-sm">
                  {product.cocoa && (
                    <div>
                      <dt className="text-choco-500">{t.common.cocoa}</dt>
                      <dd className="font-bold text-choco-900">{product.cocoa}%</dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-choco-500">{t.common.weight}</dt>
                    <dd className="font-bold text-choco-900">{product.weight}</dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="text-choco-500">{t.common.composition}</dt>
                    <dd className="font-medium leading-snug text-choco-800">{product.ingredients}</dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="text-choco-500">{t.common.storage}</dt>
                    <dd className="font-medium text-choco-800">{product.storage}</dd>
                  </div>
                </dl>

                <div className="mt-auto pt-5">
                  <div className="mb-3 flex items-baseline gap-3">
                    <span className="font-display text-3xl font-bold text-choco-900">{formatProductPrice(product as never, locale)}</span>
                  </div>
                  {product.priceFrom && (
                    <p className="mb-3 text-xs leading-relaxed text-choco-500">{t.common.priceFromNote}</p>
                  )}
                  {/* Термобокс — снятие риска прямо в карточке */}
                  <p className="mb-3 rounded-xl bg-gold-500/10 px-3 py-2 text-xs font-semibold text-choco-800">
                    ❄ {t.thermo.title}. {t.thermo.text}
                  </p>
                  <Button
                    onClick={() => {
                      handleAdd();
                      setOpen(false);
                    }}
                    className="h-12 w-full rounded-full bg-choco-900 text-base font-bold text-cream hover:bg-gold-600"
                  >
                    <ShoppingBag className="mr-2 h-5 w-5" /> {t.common.inCart}
                  </Button>

                  {/* Швидке замовлення в 1 клік без корзини */}
                  <div className="mt-3.5 border-t border-choco-100 pt-3">
                    <p className="mb-2 text-center text-[11px] font-semibold uppercase tracking-wider text-choco-600">
                      {locale === "uk" ? "Швидке замовлення в 1 клік:" : "Быстрый заказ в 1 клик:"}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={site.messengers[0].href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackIntent("viber", product.name, product.price)}
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#7360f2]/30 bg-[#7360f2]/10 py-2.5 text-xs font-bold text-[#5c49d6] transition-colors hover:bg-[#7360f2] hover:text-white"
                      >
                        <MessageCircle className="h-4 w-4" /> Viber
                      </a>
                      <a
                        href={site.messengers[2].href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackIntent("telegram", product.name, product.price)}
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#229ed9]/30 bg-[#229ed9]/10 py-2.5 text-xs font-bold text-[#0088cc] transition-colors hover:bg-[#229ed9] hover:text-white"
                      >
                        <Send className="h-4 w-4" /> Telegram
                      </a>
                    </div>
                    <a
                      href={site.phoneHref}
                      onClick={() => trackIntent("phone", product.name, product.price)}
                      className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-xl border border-choco-200 bg-white/90 py-2 text-xs font-bold text-choco-900 transition-colors hover:bg-gold-500 hover:text-choco-950"
                    >
                      <Phone className="h-3.5 w-3.5 text-gold-600" />
                      {locale === "uk" ? "Або подзвонити: 096 253 56 10" : "Или позвонить: 096 253 56 10"}
                    </a>
                  </div>

                  <p className="mt-2.5 text-center text-xs text-choco-500">
                    {t.common.freeDeliveryLine(site.freeShippingFrom.toLocaleString(locale === "uk" ? "uk-UA" : "ru-RU"))}
                  </p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-700">{product.categoryLabel}</p>
        <h3 className="mt-1 font-display text-xl font-bold leading-snug text-choco-900">
          <Link
            href={productPath(product.id, locale)}
            aria-label={t.common.aboutProduct(product.name)}
            className="text-left transition-colors hover:text-choco-600"
          >
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm italic leading-relaxed text-choco-600">{product.character}</p>

        <div className="mt-2.5 flex items-center gap-2 text-xs text-choco-500">
          <Stars rating={product.rating} locale={locale} />
          <span className="font-semibold text-choco-800">{product.rating}</span>
          <span aria-hidden="true">·</span>
          <span>
            {product.weight}
            {product.cocoa ? ` · ${t.common.cocoa.toLowerCase()} ${product.cocoa}%` : ""}
          </span>
        </div>

        <div className="mt-4 flex items-end justify-between gap-3 pt-1">
          <div>
            <span className="font-display text-2xl font-bold text-choco-900">{formatProductPrice(product as never, locale)}</span>
          </div>
          <Button
            onClick={handleAdd}
            size="sm"
            aria-label={t.common.addToCart(product.name)}
            className="h-10 rounded-full bg-choco-900 px-4 font-bold text-cream hover:bg-gold-600"
          >
            <ShoppingBag className="mr-1.5 h-4 w-4" /> {t.common.inCart}
          </Button>
        </div>

        {/* Быстрый заказ с витрины каталога */}
        <div className="mt-3 flex items-center justify-between border-t border-border/70 pt-2.5 text-xs">
          <span className="text-[11px] font-medium text-choco-500">
            {locale === "uk" ? "Швидке замовлення:" : "Быстрый заказ:"}
          </span>
          <div className="flex items-center gap-1.5">
            <a
              href={site.messengers[0].href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackIntent("viber", product.name, product.price)}
              aria-label={locale === "uk" ? `Замовити «${product.name}» у Viber` : `Заказать «${product.name}» в Viber`}
              title="Viber"
              className="rounded-lg bg-[#7360f2]/10 px-2.5 py-1 text-[11px] font-bold text-[#5c49d6] transition-colors hover:bg-[#7360f2] hover:text-white"
            >
              Viber
            </a>
            <a
              href={site.messengers[2].href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackIntent("telegram", product.name, product.price)}
              aria-label={locale === "uk" ? `Замовити «${product.name}» в Telegram` : `Заказать «${product.name}» в Telegram`}
              title="Telegram"
              className="rounded-lg bg-[#229ed9]/10 px-2.5 py-1 text-[11px] font-bold text-[#0088cc] transition-colors hover:bg-[#229ed9] hover:text-white"
            >
              Telegram
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
