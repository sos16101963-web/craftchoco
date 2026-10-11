"use client";

import { useState } from "react";
import { Calculator, Send, MessageCircle, Gift, Sparkles, Truck } from "lucide-react";
import type { Locale } from "@/lib/i18n";

interface CorporateFormatOption {
  id: string;
  nameUk: string;
  nameRu: string;
  basePrice: number;
  sizeUk: string;
  sizeRu: string;
}

const FORMAT_OPTIONS: CorporateFormatOption[] = [
  {
    id: "set-four",
    nameUk: "Міні-комплімент: 4 цукерки («Чотири настрої»)",
    nameRu: "Мини-комплимент: 4 конфеты («Четыре настроения»)",
    basePrice: 150,
    sizeUk: "4 цукерки · 35 г",
    sizeRu: "4 конфеты · 35 г",
  },
  {
    id: "mediants",
    nameUk: "Дитячі медіанти «Маленькі друзі» (4 шт)",
    nameRu: "Детские медианты «Маленькие друзья» (4 шт)",
    basePrice: 150,
    sizeUk: "4 шт по 20 г зі звірятами",
    sizeRu: "4 шт по 20 г со зверятами",
  },
  {
    id: "set-six",
    nameUk: "Класичний набір: 6 цукерок («Перше побачення»)",
    nameRu: "Классический набор: 6 конфет («Первое свидание»)",
    basePrice: 200,
    sizeUk: "6 цукерок · 50 г",
    sizeRu: "6 конфет · 50 г",
  },
  {
    id: "mediants-six",
    nameUk: "Подарункові медіанти «Маленькі друзі» (6 шт)",
    nameRu: "Подарочные медианты «Маленькие друзья» (6 шт)",
    basePrice: 220,
    sizeUk: "6 шт по 20 г зі звірятами та ягодами",
    sizeRu: "6 шт по 20 г со зверятами и ягодами",
  },
  {
    id: "set-combo",
    nameUk: "Комбо-набір: 9 цукерок + плитка («Подвійна насолода»)",
    nameRu: "Комбо-набор: 9 конфет + плитка («Двойное удовольствие»)",
    basePrice: 320,
    sizeUk: "9 цукерок + шоколадна плитка · 180 г",
    sizeRu: "9 конфет + шоколадная плитка · 180 г",
  },
  {
    id: "set-twelve",
    nameUk: "Бізнес-набір: 12 цукерок («Мелодія кохання»)",
    nameRu: "Бизнес-набор: 12 конфет («Мелодия любви»)",
    basePrice: 350,
    sizeUk: "12 цукерок з трояндами та серцями · 100 г",
    sizeRu: "12 конфет с розами и сердцами · 100 г",
  },
  {
    id: "set-sixteen",
    nameUk: "VIP-набір: 16 цукерок («Свято без приводу»)",
    nameRu: "VIP-набор: 16 конфет («Праздник без повода»)",
    basePrice: 450,
    sizeUk: "16 цукерок ручного розпису · 130 г",
    sizeRu: "16 конфет ручной росписи · 130 г",
  },
];

export function CorporateEstimateCalculator({ locale }: { locale: Locale }) {
  const uk = locale === "uk";
  const [selectedFormatId, setSelectedFormatId] = useState<string>("set-twelve");
  const [qty, setQty] = useState<number>(30);

  const selectedFormat =
    FORMAT_OPTIONS.find((f) => f.id === selectedFormatId) || FORMAT_OPTIONS[5];

  // Скидки: до 30 шт - 5%, від 30 шт - 10%
  const discountPercent = qty >= 30 ? 10 : 5;
  const unitPrice = Math.round(selectedFormat.basePrice * (1 - discountPercent / 100));
  const totalPrice = unitPrice * qty;
  const originalTotalPrice = selectedFormat.basePrice * qty;
  const savedAmount = originalTotalPrice - totalPrice;

  // Бонуси: кожен 15-й набір безкоштовно (15+1)
  const bonusSets = Math.floor(qty / 15);
  // Особистий подарунок організатору від 30 наборів
  const hasOrganizerGift = qty >= 30;
  // Безкоштовна доставка від 50 наборів
  const hasFreeShipping = qty >= 50;

  // Складання тексту для месенджера
  const formatName = uk ? selectedFormat.nameUk : selectedFormat.nameRu;
  const messageText = uk
    ? `Доброго дня! Мене цікавить корпоративне замовлення в CraftChoco:\n` +
      `• Формат: ${formatName}\n` +
      `• Кількість: ${qty} шт\n` +
      `• Знижка: -${discountPercent}% (ціна за набір: ${unitPrice} ₴)\n` +
      `• Орієнтовний кошторис: ${totalPrice.toLocaleString("uk-UA")} ₴\n` +
      (bonusSets > 0 ? `• Подарункові набори: +${bonusSets} шт безкоштовно (акція 15+1)\n` : "") +
      (hasOrganizerGift ? `• Презент організатору: так\n` : "") +
      (hasFreeShipping ? `• Доставка: безкоштовно (від 50 шт)\n` : "") +
      `\nБудь ласка, надішліть офіційний рахунок / пропозицію для узгодження.`
    : `Здравствуйте! Интересует корпоративный заказ в CraftChoco:\n` +
      `• Формат: ${formatName}\n` +
      `• Количество: ${qty} шт\n` +
      `• Скидка: -${discountPercent}% (цена за набор: ${unitPrice} ₴)\n` +
      `• Ориентировочная смета: ${totalPrice.toLocaleString("ru-RU")} ₴\n` +
      (bonusSets > 0 ? `• Подарочные наборы: +${bonusSets} шт бесплатно (акция 15+1)\n` : "") +
      (hasOrganizerGift ? `• Презент организатору: да\n` : "") +
      (hasFreeShipping ? `• Доставка: бесплатно (от 50 шт)\n` : "") +
      `\nПожалуйста, отправьте официальный счёт / предложение для согласования.`;

  const tgUrl = `https://t.me/craftchococomua?text=${encodeURIComponent(messageText)}`;
  const viberUrl = `viber://chat?number=%2B380633190460`;

  return (
    <div className="rounded-3xl border border-gold-500/40 bg-gradient-to-br from-white via-cream-50 to-gold-500/5 p-6 shadow-xl sm:p-10">
      <div className="flex flex-col items-start justify-between gap-4 border-b border-border/80 pb-6 sm:flex-row sm:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-gold-500/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gold-900">
            <Calculator className="h-4 w-4 text-gold-700" />
            {uk ? "Миттєвий розрахунок кошторису" : "Мгновенный расчёт сметы"}
          </div>
          <h3 className="mt-2 font-display text-2xl font-bold text-choco-950 sm:text-3xl">
            {uk ? "Калькулятор корпоративного замовлення" : "Калькулятор корпоративного заказа"}
          </h3>
          <p className="mt-1 text-sm text-choco-600">
            {uk
              ? "Оберіть формат і кількість — система автоматично нарахує знижки та бонуси"
              : "Выберите формат и количество — система автоматически начислит скидки и бонусы"}
          </p>
        </div>
        <div className="rounded-2xl border border-gold-400/40 bg-white px-4 py-2 text-right shadow-sm">
          <span className="text-xs uppercase tracking-wider text-choco-400">
            {uk ? "Ваша знижка" : "Ваша скидка"}
          </span>
          <p className="font-display text-2xl font-black text-gold-700">-{discountPercent}%</p>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        {/* Левая колонка: параметры */}
        <div className="space-y-6 lg:col-span-7">
          {/* Выбор формата */}
          <div>
            <label className="block text-sm font-bold text-choco-900">
              {uk ? "1. Оберіть формат подарунка:" : "1. Выберите формат подарка:"}
            </label>
            <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {FORMAT_OPTIONS.map((f) => {
                const isSelected = f.id === selectedFormatId;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setSelectedFormatId(f.id)}
                    className={`flex flex-col items-start justify-between rounded-xl border p-3.5 text-left transition-all ${
                      isSelected
                        ? "border-gold-600 bg-gold-500/10 shadow-sm ring-1 ring-gold-600"
                        : "border-border bg-white hover:border-gold-400/60 hover:bg-cream-50"
                    }`}
                  >
                    <span className="font-display text-sm font-bold text-choco-950">
                      {uk ? f.nameUk : f.nameRu}
                    </span>
                    <div className="mt-2 flex w-full items-center justify-between text-xs">
                      <span className="text-choco-500">{uk ? f.sizeUk : f.sizeRu}</span>
                      <span className="font-bold text-gold-800">{f.basePrice} ₴</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Количество наборов */}
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="corp-qty" className="text-sm font-bold text-choco-900">
                {uk ? "2. Кількість наборів:" : "2. Количество наборов:"}
              </label>
              <div className="flex items-center gap-2">
                <span className="font-display text-3xl font-extrabold text-gold-700">{qty}</span>
                <span className="text-sm font-medium text-choco-500">{uk ? "шт" : "шт"}</span>
              </div>
            </div>

            <input
              id="corp-qty"
              type="range"
              min={10}
              max={250}
              step={5}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="mt-4 w-full accent-gold-600"
            />

            <div className="mt-2 flex justify-between text-xs font-semibold text-choco-500">
              <span>10 шт (-5%)</span>
              <span className="text-gold-700">30 шт (-10% + подарунок організатору)</span>
              <span>100+ шт</span>
            </div>

            {/* Быстрые кнопки */}
            <div className="mt-3 flex flex-wrap gap-2">
              {[15, 30, 50, 75, 100].map((quickQty) => (
                <button
                  key={quickQty}
                  type="button"
                  onClick={() => setQty(quickQty)}
                  className={`rounded-lg px-3 py-1 text-xs font-bold transition ${
                    qty === quickQty
                      ? "bg-choco-900 text-cream"
                      : "bg-white border border-border text-choco-700 hover:border-gold-500"
                  }`}
                >
                  {quickQty} {uk ? "шт" : "шт"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Правая колонка: Итог и Бонусы */}
        <div className="flex flex-col justify-between rounded-2xl border border-gold-500/30 bg-white p-6 shadow-md lg:col-span-5">
          <div>
            <h4 className="font-display text-lg font-bold text-choco-950">
              {uk ? "Попередній розрахунок" : "Предварительный расчёт"}
            </h4>

            {/* Цифры */}
            <div className="mt-4 space-y-2.5 border-b border-border pb-4 text-sm">
              <div className="flex justify-between text-choco-600">
                <span>{uk ? "Базова вартість:" : "Базовая стоимость:"}</span>
                <span className="line-through">{originalTotalPrice.toLocaleString()} ₴</span>
              </div>
              <div className="flex justify-between text-choco-600">
                <span>{uk ? "Ціна за набір зі знижкою:" : "Цена за набор со скидкой:"}</span>
                <span className="font-bold text-choco-900">{unitPrice} ₴</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>{uk ? "Ваша економія:" : "Ваша экономия:"}</span>
                <span>-{savedAmount.toLocaleString()} ₴</span>
              </div>
            </div>

            <div className="mt-4 flex items-baseline justify-between">
              <span className="text-sm font-bold uppercase tracking-wider text-choco-700">
                {uk ? "Загальний кошторис:" : "Общая смета:"}
              </span>
              <span className="font-display text-3xl font-black text-gold-700">
                {totalPrice.toLocaleString()} ₴
              </span>
            </div>

            {/* Включенные бонусы */}
            <div className="mt-6 space-y-2 rounded-xl bg-gold-500/10 p-3.5 text-xs text-choco-900">
              <p className="font-bold uppercase tracking-wider text-gold-900">
                {uk ? "Включено у ваше замовлення:" : "Включено в ваш заказ:"}
              </p>
              {bonusSets > 0 && (
                <div className="flex items-center gap-2 text-choco-800">
                  <Gift className="h-4 w-4 shrink-0 text-gold-700" />
                  <span>
                    <strong>+{bonusSets} {uk ? "наборів у подарунок" : "наборов в подарок"}</strong>{" "}
                    ({uk ? "акція 15+1" : "акция 15+1"})
                  </span>
                </div>
              )}
              {hasOrganizerGift && (
                <div className="flex items-center gap-2 text-choco-800">
                  <Sparkles className="h-4 w-4 shrink-0 text-gold-700" />
                  <span>
                    <strong>{uk ? "Персональний презент замовнику" : "Персональный презент заказчику"}</strong>{" "}
                    ({uk ? "від 30 шт" : "от 30 шт"})
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2 text-choco-800">
                <Truck className="h-4 w-4 shrink-0 text-gold-700" />
                <span>
                  {hasFreeShipping ? (
                    <strong className="text-emerald-700">
                      {uk ? "Безкоштовна доставка Новою Поштою" : "Бесплатная доставка Новой Почтой"}
                    </strong>
                  ) : (
                    <span>
                      {uk ? "Доставка від 50 наборів — безкоштовно" : "Доставка от 50 наборов — бесплатно"}
                    </span>
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Кнопки вызова сметы */}
          <div className="mt-6 space-y-3">
            <a
              href={tgUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2.5 rounded-full bg-gold-500 px-6 py-3.5 font-display text-base font-bold text-choco-950 shadow-md transition-all hover:bg-gold-400 hover:shadow-lg active:scale-[0.99]"
            >
              <Send className="h-5 w-5" />
              {uk ? "Отримати офіційний кошторис у Telegram" : "Получить официальную смету в Telegram"}
            </a>
            <a
              href={viberUrl}
              className="flex w-full items-center justify-center gap-2.5 rounded-full border border-gold-500/50 bg-white px-6 py-3 font-display text-sm font-bold text-choco-900 transition-colors hover:bg-gold-50"
            >
              <MessageCircle className="h-4 w-4 text-purple-700" />
              {uk ? "Надіслати запит у Viber" : "Отправить запрос в Viber"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}