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

export function DostavkaPage({ locale, path }: { locale: Locale; path: string }) {
  const uk = locale === "uk";
  const t = getDict(locale);
  const districts = uk ? DISTRICTS_UK : DISTRICTS_RU;

  const seo = uk
    ? {
        kicker: "Доставка та оплата",
        h1: "Доставка шоколадних цукерок Харковом та по Україні",
        sub: "Кур'єром по Харкову — у день замовлення. Новою поштою — 1–2 дні до будь-якого відділення України. Кожна коробка їде в термобоксі з охолодженням: навіть у +30°C цукерки прибувають ідеальними — або замінимо за наш рахунок.",
        h2Districts: "Доставляємо всіма районами Харкова",
        h2Pay: "Як оплатити замовлення",
        pay: [
          "Готівкою кур'єру (Харків) або в відділенні Нової пошти",
          "Банківською карткою — посилання на безпечну оплату у Viber/Telegram",
          "Переказом на картку — для постійних клієнтів",
          "Рахунок з ПДВ — для юридичних осіб і корпоративних замовлень",
        ],
        h2Timing: "Терміни, про які ми домовились чесно",
        timing: [
          "Замовлення до 14:00 — доставка Харковом того ж дня (кур'єр 100 ₴)",
          `Від ${site.freeShippingFrom.toLocaleString("uk-UA")} ₴ — доставка безкоштовна (Харків і Нова пошта)`,
          "Нова пошта: відправляємо в день замовлення, у дорозі 1–2 дні",
          "Дату та часовий проміжок підтверджуємо в Viber/Telegram перед виїздом кур'єра",
        ],
      }
    : {
        kicker: "Доставка и оплата",
        h1: "Доставка шоколадных конфет по Харькову и Украине",
        sub: "Курьером по Харькову — в день заказа. Новой почтой — 1–2 дня в любое отделение Украины. Каждая коробка едет в термобоксе с охлаждением: даже в +30°C конфеты прибывают идеальными — или заменим за наш счёт.",
        h2Districts: "Доставляем всеми районами Харькова",
        h2Pay: "Как оплатить заказ",
        pay: [
          "Наличными курьеру (Харьков) или в отделении Новой почты",
          "Банковской картой — ссылка на безопасную оплату в Viber/Telegram",
          "Переводом на карту — для постоянных клиентов",
          "Счёт с НДС — для юридических лиц и корпоративных заказов",
        ],
        h2Timing: "Сроки, о которых договорились честно",
        timing: [
          "Заказ до 14:00 — доставка по Харькову в тот же день (курьер 100 ₴)",
          `От ${site.freeShippingFrom.toLocaleString("ru-RU")} ₴ — доставка бесплатно (Харьков и Новая почта)`,
          "Новая почта: отправляем в день заказа, в пути 1–2 дня",
          "Дату и временной интервал подтверждаем в Viber/Telegram перед выездом курьера",
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
