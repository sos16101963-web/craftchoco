"use client";

import { useState } from "react";
import { ProductCard } from "./product-card";
import { categories, catalogFor } from "@/lib/products";
import { getDict } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function Catalog({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const cat = t.catalog.categories;
  const [active, setActive] = useState<(typeof cat)[number]["id"]>("all");
  const all = catalogFor(locale);
  const visible = active === "all" ? all : all.filter((p: { category: string }) => p.category === active);

  return (
    <section id="catalog" className="scroll-mt-20 stage-glow relative py-20 lg:py-28 overflow-hidden" aria-label={locale === "uk" ? "Каталог шоколаду" : "Каталог шоколада"}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="divider-gold text-[13px] font-semibold uppercase tracking-[0.3em] text-gold-700">{t.catalog.kicker}</p>
          <h2 className="mt-4 font-display text-4xl font-bold text-choco-900 sm:text-5xl">{t.catalog.h2}</h2>
          <p className="mt-4 text-lg leading-relaxed text-choco-600">{t.catalog.sub}</p>
        </div>

        <nav className="mt-10 flex flex-wrap justify-center gap-2.5" aria-label={t.catalog.filterAria}>
          {cat.map((c) => {
            const count = c.id === "all" ? all.length : all.filter((p: { category: string }) => p.category === c.id).length;
            return (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                aria-pressed={active === c.id}
                className={cn(
                  "rounded-full px-5 py-2.5 text-sm font-semibold transition-all",
                  active === c.id
                    ? "btn-choco-luxe !text-gold-300 shadow-md"
                    : "glass-surface text-choco-700 hover:border-gold-500/50 hover:bg-white"
                )}
              >
                {c.label}
                <span className={cn("ml-2 text-xs", active === c.id ? "text-gold-400" : "text-choco-400")}>
                  {count}
                </span>
              </button>
            );
          })}
        </nav>

        <div
          className="glass-surface mx-auto mt-8 max-w-3xl rounded-2xl border-gold-500/50 p-6 shadow-md"
          aria-label={locale === "uk" ? "Рекомендація майстра" : "Рекомендация мастера"}
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold-700">
            {t.catalog.adviceTitle}
          </p>
          <p className="mt-2 text-[15px] leading-relaxed text-choco-700">{t.catalog.advice1}</p>
          <p className="mt-2.5 text-[15px] leading-relaxed text-choco-700">{t.catalog.advice2}</p>
        </div>

        {/* Страх потери: слоты на день ограничены — заказывайте сегодня */}
        <p className="glass-surface mx-auto mt-5 max-w-3xl rounded-xl border-gold-500/40 bg-gold-500/15 px-5 py-3 text-center text-sm font-bold text-choco-900 shadow-sm">
          {t.catalog.lossAversion}
        </p>

        {/* Быстрый переход к Шоколадному сомелье */}
        <div className="glass-surface mx-auto mt-4 max-w-3xl flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl border-gold-500/50 p-4 text-sm shadow-md">
          <div className="flex items-center gap-2.5 text-center sm:text-left">
            <span className="text-xl">✨</span>
            <span className="text-xs sm:text-sm font-medium text-choco-900">
              {locale === "uk"
                ? "Важко визначитися зі смаком або приводом? Скористайтеся інтерактивним помічником:"
                : "Трудно определиться со вкусом или поводом? Воспользуйтесь интерактивным помощником:"}
            </span>
          </div>
          <a
            href="#sommelier"
            className="btn-choco-luxe inline-flex shrink-0 items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold shadow-sm"
          >
            {locale === "uk" ? "Шоколадний сомельє ⬇" : "Шоколадный сомелье ⬇"}
          </a>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
          {visible.map((p: (typeof all)[number]) => (
            <ProductCard key={p.id} product={p} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
