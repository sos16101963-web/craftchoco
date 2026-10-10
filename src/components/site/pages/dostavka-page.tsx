import { InnerShell } from "@/components/site/inner-shell";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Delivery } from "@/components/site/delivery";
import { switchPairFor } from "@/lib/pages";
import { getDict } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { breadcrumbLd } from "@/lib/inner-meta";

const DISTRICTS_UK = [
  "Шевченківський район",
  "Київський район",
  "Салтівський район",
  "Слобідський район",
  "Немишлянський район",
  "Індустріальний район",
  "Основ'янський район",
  "Холодногірський район",
  "Новобаварський район",
];
const DISTRICTS_RU = [
  "Шевченковский район",
  "Киевский район",
  "Салтовский район",
  "Слободской район",
  "Немышлянский район",
  "Индустриальный район",
  "Основянский район",
  "Холодногорский район",
  "Новобаварский район",
];

const CITIES_INFO_UK = [
  { city: "Київ", time: "1 день (24 год)", desc: "Відділення, поштомати або адресна доставка кур'єром до дверей" },
  { city: "Полтава", time: "1 день (24 год)", desc: "Швидка доставка до відділення або особисто в руки кур'єром" },
  { city: "Дніпро", time: "1 день (24 год)", desc: "Відділення, поштомати або кур'єрська доставка додому чи в офіс" },
  { city: "Одеса", time: "1–2 дні", desc: "Термобокс з охолодженням, кур'єр до дверей або найближче відділення" },
  { city: "Запоріжжя", time: "1 день (24 год)", desc: "Кур'єр Нової Пошти на адресу або відділення" },
  { city: "Кривий Ріг", time: "1–2 дні", desc: "Адресне вручення кур'єром або доставка у відділення" },
  { city: "Житомир", time: "1–2 дні", desc: "Кур'єром на адресу або у поштове відділення" },
  { city: "Усі міста України", time: "1–2 дні", desc: "Відправка в день замовлення Новою Поштою до будь-якої точки країни" },
];

const CITIES_INFO_RU = [
  { city: "Киев", time: "1 день (24 ч)", desc: "Отделения, почтоматы или адресная доставка курьером до дверей" },
  { city: "Полтава", time: "1 день (24 ч)", desc: "Быстрая доставка в отделение или лично в руки курьером" },
  { city: "Днепр", time: "1 день (24 ч)", desc: "Отделения, почтоматы или курьерская доставка на дом и в офис" },
  { city: "Одесса", time: "1–2 дня", desc: "Термобокс с охлаждением, курьер до дверей или ближайшее отделение" },
  { city: "Запорожье", time: "1 день (24 ч)", desc: "Курьер Новой Почты на адрес или в отделение" },
  { city: "Кривой Рог", time: "1–2 дня", desc: "Адресное вручение курьером или доставка в отделение" },
  { city: "Житомир", time: "1–2 дня", desc: "Курьером на адрес или в почтовое отделение" },
  { city: "Все города Украины", time: "1–2 дня", desc: "Отправка в день заказа Новой Почтой в любую точку страны" },
];

export function DostavkaPage({ locale, path }: { locale: Locale; path: string }) {
  const uk = locale === "uk";
  const t = getDict(locale);
  const districts = uk ? DISTRICTS_UK : DISTRICTS_RU;
  const cities = uk ? CITIES_INFO_UK : CITIES_INFO_RU;

  const seo = uk
    ? {
        kicker: "Доставка та оплата",
        h1: "Доставка шоколаду та цукерок по Україні та Харкову",
        sub: "Новою Поштою — 1–2 дні до Києва, Дніпра, Одеси, Полтави та по всій Україні: у відділення або кур'єром адресно до дверей. По Харкову — кур'єром у день замовлення. Безпечне пакування: у спеку пакуємо в термобокс з охолодженням, за необхідності використовуємо пухирчасту плівку — шоколад завжди доїжджає в ідеальному стані.",
        h2Cities: "Доставка Новою Поштою до міст України",
        subCities: "Відправляємо щодня по всій Україні. Коли спекотно — упаковуємо в термобокс із холодоелементом, за потреби додаємо надійну пухирчасту плівку. Доставка у відділення, поштомат або особисто кур'єром до дверей.",
        h2Surprise: "Подарунок-сюрприз на відстані (Адресна доставка в руки)",
        surpriseText: "Хочете привітати маму, кохану, дитину чи колегу в іншому місті України? Ми візьмемо всі турботи на себе:",
        surpriseSteps: [
          "Ви обираєте набір на сайті та вказуєте номер телефону й адресу отримувача в Україні;",
          "Ми безкоштовно підписуємо листівку вашими теплими словами від руки;",
          "Дбайливо пакуємо (у спеку — термобокс з охолодженням, за потреби — захисна пухирчаста плівка);",
          "Надсилаємо вам фото та відео готової коробки у Viber або Telegram перед відправкою;",
          "Кур'єр Нової Пошти вручає солодкий сюрприз особисто в руки адресату біля дверей!",
        ],
        h2Districts: "Кур'єрська доставка по Харкову в день замовлення",
        h2Pay: "Як оплатити замовлення",
        pay: [
          "Оплата онлайн банківською карткою при оформленні",
          "Післяплата у відділенні Нової Пошти при отриманні",
          "Переказом на картку (IBAN) за реквізитами",
          "Готівкою кур'єру при отриманні (Харків)",
          "Безготівковий розрахунок для юридичних осіб та корпоративних подарунків",
        ],
        h2Timing: "Терміни, про які ми домовились чесно",
        timing: [
          "Відправка Новою Поштою: щодня при замовленні до 15:00",
          "Кур'єр по Харкову: у день замовлення (при оформленні до 14:00, вартість 100 ₴)",
          `Від ${site.freeShippingFrom.toLocaleString("uk-UA")} ₴ — доставка безкоштовна (і Харковом, і Новою Поштою)`,
          "Дату доставки та деталі узгоджуємо у Viber або Telegram перед відправкою",
        ],
      }
    : {
        kicker: "Доставка и оплата",
        h1: "Доставка шоколада и конфет по Украине и Харькову",
        sub: "Новой Почтой — 1–2 дня в Киев, Днепр, Одессу, Полтаву и по всей Украине: в отделение или курьером адресно до дверей. По Харькову — курьером в день заказа. Надежная упаковка: в жару упаковываем в термобокс с охлаждением, по необходимости используем пузырчатую пленку — шоколад всегда доезжает в идеальном виде.",
        h2Cities: "Доставка Новой Почтой в города Украины",
        subCities: "Отправляем ежедневно по всей Украине. Когда жарко — используем термобокс с хладоэлементом, по необходимости добавляем надежную пузырчатую пленку. Доставка в отделение, почтомат или лично курьером до дверей.",
        h2Surprise: "Подарок-сюрприз на расстоянии (Адресная доставка в руки)",
        surpriseText: "Хотите поздравить маму, любимую, ребенка или коллегу в другом городе Украины? Мы возьмем все заботы на себя:",
        surpriseSteps: [
          "Вы выбираете набор на сайте и указываете номер телефона и адрес получателя в Украине;",
          "Мы бесплатно подписываем открытку вашими теплыми словами от руки;",
          "Бережно упаковываем (в жару — термобокс с охлаждением, по необходимости — защитная пузырчатая пленка);",
          "Присылаем вам фото и видео готовой коробки в Viber или Telegram перед отправкой;",
          "Курьер Новой Почты вручает сладкий сюрприз лично в руки адресату у дверей!",
        ],
        h2Districts: "Курьерская доставка по Харькову в день заказа",
        h2Pay: "Как оплатить заказ",
        pay: [
          "Оплата онлайн банковской картой при оформлении",
          "Наложенный платеж в отделении Новой Почты при получении",
          "Переводом на карту (IBAN) по реквизитам",
          "Наличными курьеру при получении (Харьков)",
          "Безналичный расчет для юридических лиц и корпоративных заказов",
        ],
        h2Timing: "Сроки, о которых договорились честно",
        timing: [
          "Отправка Новой Почтой: ежедневно при заказе до 15:00",
          "Курьер по Харькову: в день заказа (при оформлении до 14:00, стоимость 100 ₴)",
          `От ${site.freeShippingFrom.toLocaleString("ru-RU")} ₴ — доставка бесплатно (и по Харькову, и Новой Почтой)`,
          "Дату доставки и детали согласовываем в Viber или Telegram перед отправкой",
        ],
      };

  return (
    <InnerShell locale={locale} switchPair={switchPairFor(path)}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbLd([{ name: uk ? "Головна" : "Главная", path: uk ? "/" : "/ru" }, { name: uk ? "Доставка" : "Доставка", path }]),
          ).replace(/</g, "\\u003c"),
        }}
      />
      <section className="bg-choco-950 pb-14 pt-32 text-cream sm:pt-36">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p className="text-[13px] font-semibold uppercase tracking-[0.3em] text-gold-400">{seo.kicker}</p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl">{seo.h1}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-cream/85">{seo.sub}</p>
        </div>
      </section>

      {/* Города Украины */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold text-choco-900">{seo.h2Cities}</h2>
          <p className="mt-3 text-sm leading-relaxed text-choco-600">{seo.subCities}</p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cities.map((c) => (
            <div key={c.city} className="rounded-2xl border border-border bg-white p-5 shadow-sm transition hover:shadow-md">
              <div className="flex items-center justify-between">
                <span className="font-display text-lg font-bold text-choco-900">{c.city}</span>
                <span className="rounded-full bg-gold-500/15 px-2.5 py-0.5 text-xs font-bold text-gold-800">{c.time}</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-choco-600">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Подарок-сюрприз на расстоянии (Адресная доставка Новой Почты) */}
      <section className="bg-gold-500/10 py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="rounded-3xl border border-gold-500/30 bg-white p-8 sm:p-10 shadow-sm">
            <span className="inline-block rounded-full bg-gold-500 px-3 py-1 text-xs font-bold text-choco-950 uppercase tracking-wider">
              {uk ? "Спеціальний сервіс" : "Специальный сервис"}
            </span>
            <h2 className="mt-4 font-display text-2xl font-bold text-choco-950 sm:text-3xl">{seo.h2Surprise}</h2>
            <p className="mt-3 text-sm leading-relaxed text-choco-700">{seo.surpriseText}</p>
            <ol className="mt-6 space-y-3">
              {seo.surpriseSteps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 rounded-xl bg-cream/60 p-3.5 text-sm font-medium text-choco-900">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-choco-900 text-xs font-bold text-gold-400">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Районы Харькова */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="text-center font-display text-3xl font-bold text-choco-900">{seo.h2Districts}</h2>
        <ul className="mx-auto mt-8 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {districts.map((d) => (
            <li key={d} className="flex items-center gap-2.5 rounded-xl border border-border bg-white px-4 py-3 text-sm font-medium text-choco-800">
              <span className="h-2 w-2 shrink-0 rounded-full bg-gold-500" aria-hidden="true" />
              {d}
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-5 max-w-2xl text-center text-sm leading-relaxed text-choco-600">
          {uk
            ? "Немає вашого району в списку? Ми все одно приїдемо — Харків невеликий, а свіжий шоколад чекати не любить. Напишіть адресу в Viber/Telegram, узгодимо час."
            : "Нет вашего района в списке? Мы всё равно приедем — Харьков небольшой, а свежий шоколад ждать не любит. Напишите адрес в Viber/Telegram, согласуем время."}
        </p>
      </section>

      <Delivery locale={locale} />

      <section className="mx-auto max-w-4xl px-4 pb-14 sm:px-6">
        <h2 className="font-display text-3xl font-bold text-choco-900">{seo.h2Pay}</h2>
        <ul className="mt-6 space-y-3">
          {seo.pay.map((line) => (
            <li key={line} className="flex items-start gap-3 rounded-xl border border-border bg-white px-5 py-3.5 text-[15px] leading-relaxed text-choco-800">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold-500" aria-hidden="true" />
              {line}
            </li>
          ))}
        </ul>

        <h2 className="mt-12 font-display text-3xl font-bold text-choco-900">{seo.h2Timing}</h2>
        <ul className="mt-6 space-y-3">
          {seo.timing.map((line) => (
            <li key={line} className="flex items-start gap-3 rounded-xl border border-gold-500/30 bg-gold-500/5 px-5 py-3.5 text-[15px] leading-relaxed text-choco-800">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold-600" aria-hidden="true" />
              {line}
            </li>
          ))}
        </ul>

        <div className="mt-10 rounded-2xl bg-choco-950 p-7 text-cream">
          <p className="font-display text-xl font-bold">{t.thermo.title}</p>
          <p className="mt-2 text-sm leading-relaxed text-cream/85">{t.thermo.text}. {uk ? "Гарантія діє на кожне замовлення, без «якщо»." : "Гарантия действует на каждый заказ, без «если»."}</p>
        </div>
      </section>
    </InnerShell>
  );
}

