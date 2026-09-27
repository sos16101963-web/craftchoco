import { InnerShell } from "@/components/site/inner-shell";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { PriceCalculator } from "@/components/site/pages/price-calculator";
import { switchPairFor } from "@/lib/pages";
import { catalogFor } from "@/lib/products";
import { productPath } from "@/lib/slugs";
import { getDict } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { breadcrumbLd } from "@/lib/inner-meta";

export function PricesPage({ locale, path }: { locale: Locale; path: string }) {
  const uk = locale === "uk";
  const products = [...catalogFor(locale)].sort((a, b) => a.price - b.price);
  const t = getDict(locale);

  const seo = uk
    ? {
        kicker: "Ціни",
        h1: "Ціни на шоколадні цукерки ручної роботи в Харкові",
        sub: "Прозорий прайс майстерні CraftChocoKharkiv: набори цукерок від 150 ₴, шоколадні букети та авторські плитки. Святкова упаковка — завжди безкоштовно. Без прихованих доплат: ціна на сайті = ціна в замовленні.",
        h2Table: "Повний прайс (актуальний на 2026 рік)",
        h2Calc: "Калькулятор: скільки коштуватиме ваш подарунок",
        h2Terms: "Що входить у ціну кожного набору",
        inclusions: [
          "Бельгійський шоколад Callebaut — без замін і «кондитерської глазурі»",
          "Святкова коробка — 0 ₴",
          "Термобокс з охолодженням у спеку — 0 ₴ (замінимо, якщо щось не так)",
          "Фото набору перед відправкою в Viber/Telegram — 0 ₴",
        ],
      }
    : {
        kicker: "Цены",
        h1: "Цены на шоколадные конфеты ручной работы в Харькове",
        sub: "Прозрачный прайс мастерской CraftChocoKharkiv: наборы конфет от 150 ₴, шоколадные букеты и авторские плитки. Праздничная упаковка — всегда бесплатно. Без скрытых доплат: цена на сайте = цена в заказе.",
        h2Table: "Полный прайс (актуальный на 2026 год)",
        h2Calc: "Калькулятор: сколько будет стоить ваш подарок",
        h2Terms: "Что входит в цену каждого набора",
        inclusions: [
          "Бельгийский шоколад Callebaut — без замен и «кондитерской глазури»",
          "Праздничная коробка — 0 ₴",
          "Термобокс с охлаждением в жару — 0 ₴ (заменим, если что-то не так)",
          "Фото набора перед отправкой в Viber/Telegram — 0 ₴",
        ],
      };

  return (
    <InnerShell locale={locale} switchPair={switchPairFor(path)}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbLd([{ name: uk ? "Головна" : "Главная", path: uk ? "/" : "/ru" }, { name: uk ? "Ціни" : "Цены", path }]),
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

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <h2 className="font-display text-3xl font-bold text-choco-900">{seo.h2Table}</h2>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-white shadow-sm">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-cream-100 text-xs uppercase tracking-wider text-choco-600">
                <th className="px-5 py-3.5 font-semibold">{uk ? "Набір" : "Набор"}</th>
                <th className="px-5 py-3.5 font-semibold">{t.common.weight}</th>
                <th className="px-5 py-3.5 font-semibold">{uk ? "Ціна" : "Цена"}</th>
                <th className="px-5 py-3.5 font-semibold" aria-label={uk ? "Сторінка набору" : "Страница набора"} />
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-border/60 last:border-0 hover:bg-gold-500/5">
                  <td className="px-5 py-3.5 font-semibold text-choco-900">{p.name}</td>
                  <td className="px-5 py-3.5 text-choco-600">{p.weight}</td>
                  <td className="whitespace-nowrap px-5 py-3.5 font-bold text-gold-700">
                    {p.priceFrom ? `${uk ? "від" : "от"} ` : ""}
                    {p.price} ₴
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <a href={productPath(p.id, locale)} className="font-semibold text-choco-700 underline decoration-gold-500/50 underline-offset-4 hover:text-gold-700">
                      {t.common.details}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-choco-500">
          {uk
            ? `Замовлення від ${site.freeShippingFrom.toLocaleString("uk-UA")} ₴ доставимо безкоштовно по Харкову та Новою поштою.`
            : `Заказы от ${site.freeShippingFrom.toLocaleString("ru-RU")} ₴ доставим бесплатно по Харькову и Новой почтой.`}
        </p>
      </section>

      <section className="bg-cream-100/60 py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-bold text-choco-900">{seo.h2Calc}</h2>
          <div className="mt-8">
            <PriceCalculator locale={locale} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <h2 className="font-display text-3xl font-bold text-choco-900">{seo.h2Terms}</h2>
        <ul className="mt-6 space-y-3">
          {seo.inclusions.map((line) => (
            <li key={line} className="flex items-start gap-3 rounded-xl border border-border bg-white px-5 py-3.5 text-[15px] leading-relaxed text-choco-800">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold-500" aria-hidden="true" />
              {line}
            </li>
          ))}
        </ul>
      </section>
    </InnerShell>
  );
}
