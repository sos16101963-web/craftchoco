"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Calculator as CalcIcon, Calculator } from "lucide-react";
import { catalogFor, formatPrice } from "@/lib/products";
import { productPath } from "@/lib/slugs";
import type { Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

/** Калькулятор бюджета: слайдер — наборы, что влезают в бюджет + корпоративный расчёт */
export function PriceCalculator({ locale }: { locale: Locale }) {
  const uk = locale === "uk";
  const [budget, setBudget] = useState(450);
  const [qty, setQty] = useState(30);
  const products = useMemo(() => catalogFor(locale), [locale]);

  const fits = useMemo(() => products.filter((p) => p.price <= budget).sort((a, b) => b.price - a.price).slice(0, 4), [products, budget]);
  const discountPercent = qty >= 100 ? 10 : qty >= 50 ? 5 : 0;
  const basePrice = 450;
  const corporatePer = Math.round(basePrice * (1 - discountPercent / 100));
  const corporateTotal = qty * corporatePer;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Бюджет */}
      <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
        <h3 className="flex items-center gap-2.5 font-display text-xl font-bold text-choco-900">
          <CalcIcon className="h-5 w-5 text-gold-700" aria-hidden="true" />
          {uk ? "Калькулятор подарунка за бюджетом" : "Калькулятор подарка по бюджету"}
        </h3>
        <label htmlFor="budget" className="mt-5 block text-sm font-medium text-choco-700">
          {uk ? "Ваш бюджет:" : "Ваш бюджет:"}{" "}
          <span className="font-display text-2xl font-bold text-gold-700">{formatPrice(budget, locale)}</span>
        </label>
        <input
          id="budget"
          type="range"
          min={150}
          max={3000}
          step={50}
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          className="mt-3 w-full accent-gold-600"
        />
        <div className="mt-1 flex justify-between text-xs text-choco-400">
          <span>150 ₴</span>
          <span>3 000 ₴</span>
        </div>

        <p className="mt-5 text-sm font-semibold text-choco-800">
          {uk ? "Ваша сума" : "Ваша сумма"}:
        </p>
        {fits.length > 0 ? (
          <ul className="mt-3 space-y-2">
            {fits.map((p) => (
              <li key={p.id}>
                <Link
                  href={productPath(p.id, locale)}
                  className="flex items-center justify-between gap-3 rounded-xl bg-cream-100 px-4 py-2.5 text-sm text-choco-800 transition-colors hover:bg-gold-500/10"
                >
                  <span className="truncate font-medium">{p.name}</span>
                  <span className="shrink-0 font-bold text-gold-700">{formatPrice(p.price, locale)}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 rounded-xl bg-cream-100 px-4 py-3 text-sm text-choco-600">
            {uk
              ? "На цю суму наборів немає, але ми збираємо індивідуальні — напишіть у Viber або Telegram, підберемо."
              : "На эту сумму наборов нет, но мы собираем индивидуальные — напишите в Viber или Telegram, подберём."}
          </p>
        )}
        <p className="mt-4 text-xs leading-relaxed text-choco-500">
          {uk
            ? `До ${site.freeShippingFrom.toLocaleString("uk-UA")} ₴ доставка по Харкову — ${site.courierPrice} ₴; від ${site.freeShippingFrom.toLocaleString("uk-UA")} ₴ — безкоштовно.`
            : `До ${site.freeShippingFrom.toLocaleString("ru-RU")} ₴ доставка по Харькову — ${site.courierPrice} ₴; от ${site.freeShippingFrom.toLocaleString("ru-RU")} ₴ — бесплатно.`}
        </p>
      </div>

      {/* Корпоративний */}
      <div className="rounded-2xl border border-gold-500/30 bg-gold-500/5 p-6 shadow-sm">
        <h3 className="flex items-center gap-2.5 font-display text-xl font-bold text-choco-900">
          <Calculator className="h-5 w-5 text-gold-700" aria-hidden="true" />
          {uk ? "Корпоративний тираж (орієнтир)" : "Корпоративный тираж (ориентир)"}
        </h3>
        <label htmlFor="qty" className="mt-5 block text-sm font-medium text-choco-700">
          {uk ? "Кількість наборів:" : "Количество наборов:"}{" "}
          <span className="font-display text-2xl font-bold text-gold-700">{qty}</span>
        </label>
        <input
          id="qty"
          type="range"
          min={10}
          max={500}
          step={5}
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
          className="mt-3 w-full accent-gold-600"
        />
        <div className="mt-4 grid grid-cols-2 gap-3 text-center">
          <div className="rounded-xl bg-white px-3 py-3">
            <p className="text-xs text-choco-500">{uk ? "Орієнтовна сума" : "Ориентировочная сумма"}</p>
            <p className="font-display text-xl font-bold text-choco-900">{corporateTotal.toLocaleString(uk ? "uk-UA" : "ru-RU")} ₴</p>
          </div>
          <div className="rounded-xl bg-white px-3 py-3">
            <p className="text-xs text-choco-500">{uk ? "Ціна за набір" : "Цена за набор"}</p>
            <p className="font-display text-xl font-bold text-choco-900">{corporatePer} ₴</p>
          </div>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-choco-600">
          {uk
            ? "Базовий набір 16 цукерок (450 ₴). Від 50 наборів — знижка 5%, від 100 наборів — знижка 10%. Брендування стрічки або коробки узгодимо в Viber або Telegram."
            : "Базовый набор 16 конфет (450 ₴). От 50 наборов — скидка 5%, от 100 наборов — скидка 10%. Брендирование ленты или коробки согласуем в Viber или Telegram."}
        </p>
        <a
          href={site.messengers[2].href}
          className="mt-4 inline-flex h-11 items-center justify-center rounded-full bg-choco-900 px-6 text-sm font-bold text-cream transition-colors hover:bg-gold-600"
        >
          {uk ? "Запросити прорахунок" : "Запросить расчёт"}
        </a>
      </div>
    </div>
  );
}
