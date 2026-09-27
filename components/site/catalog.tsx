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
    <section id="catalog" className="scroll-mt-20 bg-cream-100 py-20 lg:py-28" aria-label={locale === "uk" ? "Каталог шоколаду" : "Каталог шоколада"}>
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
                  "rounded-full border px-5 py-2.5 text-sm font-semibold transition-all",
                  active === c.id
                    ? "border-choco-900 bg-choco-900 text-gold-300 shadow-md"
                    : "border-border bg-white/70 text-choco-700 hover:border-choco-700/40 hover:bg-white"
                )}
              >
                {c.label}
                <span className={cn("ml-2 text-xs", active === c.id ? "text-gold-400/80" : "text-choco-400")}>
                  {count}
                </span>
              </button>
            );
          })}
        </nav>

        <div
          className="mx-auto mt-8 max-w-3xl rounded-2xl border border-gold-500/40 bg-white/80 p-5 shadow-sm"
          aria-label={locale === "uk" ? "Рекомендація майстра" : "Рекомендация мастера"}
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold-700">
            {t.catalog.adviceTitle}
          </p>
          <p className="mt-2 text-[15px] leading-relaxed text-choco-700">{t.catalog.advice1}</p>
          <p className="mt-2.5 text-[15px] leading-relaxed text-choco-700">{t.catalog.advice2}</p>
        </div>

        {/* Страх потери: слоты на день ограничены — заказывайте сегодня */}
        <p className="mx-auto mt-5 max-w-3xl rounded-xl border border-gold-500/30 bg-gold-500/10 px-5 py-3 text-center text-sm font-semibold text-choco-800">
          {t.catalog.lossAversion}
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
          {visible.map((p: (typeof all)[number]) => (
            <ProductCard key={p.id} product={p} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
