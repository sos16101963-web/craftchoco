import Image from "next/image";
import Link from "next/link";
import { Sparkles, Gift, Building2, BookOpen } from "lucide-react";
import type { Locale } from "@/lib/i18n";

export function HolidayBanner({ locale }: { locale: Locale }) {
  const uk = locale === "uk";

  const t = uk
    ? {
        kicker: "❄ Зимовий святковий сезон 2026–2027 · День Святого Миколая 6 грудня",
        h2: "Солодкі подарунки на Миколая та Новий Рік",
        sub: "Справжній бельгійський шоколад Callebaut під подушку малечі, теплий сюрприз коханим та брендовані корпоративні набори для компаній зі знижкою до -10%. Без пальмової олії та штучних барвників.",
        hits: [
          {
            badge: "Хіт під подушку дітям",
            name: "«Маленькі друзі» (4–6 шт.)",
            price: "від 150 ₴",
            desc: "Фігурки симпатичних звірят з бельгійського шоколаду з горішками та сублімованими ягодами.",
            image: "/images/medianty-malenki-druzi-6-sht.webp",
            alt: "Солодкі дитячі медіанти Маленькі друзі на Миколая",
            href: "#catalog",
          },
          {
            badge: "Компактний комплімент",
            name: "«Чотири настрої» (4 шт.)",
            price: "130 ₴",
            desc: "Витончена прозора коробка з 4 авторськими сферами ручного розпису. Ідеально під подушку.",
            image: "/images/set-four.webp",
            alt: "Набір 4 цукерок Чотири настрої під подушку на Миколая",
            href: "/podarunky/chotyry-nastroi",
          },
          {
            badge: "Новинка сезону",
            name: "«Палітра смаків» (9 шт.)",
            price: "270 ₴",
            desc: "3 гастрономічні дуети: сир-журавлина, м'ята-смородина та кава-малина. Біла коробка з вікном.",
            image: "/images/shokolad-ruchnoy-raboty-harkov-master-aleksandr-nabor-9-konfet.webp",
            alt: "Шоколадний набір Палітра смаків 9 цукерок подарунок на свята",
            href: "/podarunky/palitra-smakiv",
          },
        ],
        btnCatalog: "Обрати подарунок у каталозі",
        btnCorp: "Для компаній та офісів (-10%)",
        guideLink: "Читати гід: ТОП-5 ідей під подушку на Миколая →",
        guideHref: "/blog/podarunky-na-sviatoho-mykolaia-shokolad",
        corpHref: "/korporatyvni-podary",
        deliveryBadge: "🚀 Швидка відправка Новою Поштою по всій Україні (1–2 дні) у захисній упаковці",
      }
    : {
        kicker: "❄ Зимний праздничный сезон 2026–2027 · День Святого Николая 6 декабря",
        h2: "Сладкие подарки на Николая и Новый Год",
        sub: "Настоящий бельгийский шоколад Callebaut под подушку детям, душевный сюрприз близким и брендированные корпоративные наборы для компаний со скидкой до 10%. Без пальмового масла и химии.",
        hits: [
          {
            badge: "Хит под подушку детям",
            name: "«Маленькие друзья» (4–6 шт.)",
            price: "от 150 ₴",
            desc: "Фигурки милых зверят из бельгийского шоколада с отборными орехами и ягодами малины.",
            image: "/images/medianty-malenki-druzi-6-sht.webp",
            alt: "Сладкие детские медианты Маленькие друзья на Николая",
            href: "#catalog",
          },
          {
            badge: "Компактный комплимент",
            name: "«Четыре настроения» (4 шт.)",
            price: "130 ₴",
            desc: "Изящная прозрачная коробочка с 4 авторскими сферами ручной росписи. Идеально под подушку.",
            image: "/images/set-four.webp",
            alt: "Набор из 4 конфет Четыре настроения под подушку на Николая",
            href: "/ru/podarunky/chetyre-nastroeniya",
          },
          {
            badge: "Новинка сезона",
            name: "«Палитра вкусов» (9 шт.)",
            price: "270 ₴",
            desc: "3 гастрономических дуэта: сыр-клюква, мята-смородина и кофе-малина в белой коробке с окном.",
            image: "/images/shokolad-ruchnoy-raboty-harkov-master-aleksandr-nabor-9-konfet.webp",
            alt: "Шоколадный набор Палитра вкусов 9 конфет в подарок на праздники",
            href: "/ru/podarunky/palitra-vkusov",
          },
        ],
        btnCatalog: "Выбрать подарок в каталоге",
        btnCorp: "Для компаний и офисов (-10%)",
        guideLink: "Читать гид: ТОП-5 идей под подушку на Николая →",
        guideHref: "/ru/blog/podarki-na-den-svyatogo-nikolaya-shokolad",
        corpHref: "/ru/korporativnye-podary",
        deliveryBadge: "🚀 Быстрая отправка Новой Почтой по всей Украине (1–2 дня) в защитной упаковке",
      };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-choco-950 via-[#1f1208] to-choco-950 py-16 text-cream sm:py-20">
      {/* Световые праздничные софиты */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-96 w-[700px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(214,177,105,0.22)_0%,transparent_70%)] blur-2xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-gold-500/15 px-4 py-1.5 text-xs font-bold tracking-wider text-gold-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.25)]">
            <Sparkles className="h-3.5 w-3.5 text-gold-400" />
            {t.kicker}
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            {t.h2}
          </h2>
          <p className="mt-3.5 text-base leading-relaxed text-cream/80 sm:text-lg">
            {t.sub}
          </p>
        </div>

        {/* 3 карточки сезонных хитов */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.hits.map((hit) => (
            <div
              key={hit.name}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-gold-500/35 bg-white/[0.04] p-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18),0_12px_32px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-400/70 hover:bg-white/[0.07]"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-choco-900/60">
                <Image
                  src={hit.image}
                  alt={hit.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-choco-950/85 px-3 py-1 text-[11px] font-bold text-gold-300 shadow-sm backdrop-blur">
                  {hit.badge}
                </span>
              </div>

              <div className="mt-4 flex flex-1 flex-col justify-between">
                <div>
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-display text-lg font-bold text-cream">
                      {hit.name}
                    </h3>
                    <span className="font-display text-lg font-bold text-gold-300">
                      {hit.price}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-cream/70">
                    {hit.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10">
                  <Link
                    href={hit.href}
                    className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-gold-400/40 bg-gold-500/15 py-2 text-xs font-bold text-gold-200 transition-colors hover:bg-gold-500 hover:text-choco-950"
                  >
                    <Gift className="h-3.5 w-3.5" />
                    {uk ? "Замовити цей набір" : "Заказать этот набор"}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Главные кнопки и переход к корпоративным подаркам */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#catalog"
            className="btn-gold-luxe inline-flex h-12 items-center justify-center gap-2 rounded-full px-8 text-sm font-bold shadow-lg"
          >
            <Gift className="h-4 w-4" />
            {t.btnCatalog}
          </a>
          <Link
            href={t.corpHref}
            className="btn-choco-luxe inline-flex h-12 items-center justify-center gap-2 rounded-full px-8 text-sm font-bold shadow-lg"
          >
            <Building2 className="h-4 w-4 text-gold-400" />
            {t.btnCorp}
          </Link>
        </div>

        {/* Ссылка на статью блога и бейдж доставки */}
        <div className="mt-6 flex flex-col items-center justify-center gap-2.5 text-center">
          <Link
            href={t.guideHref}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-300 underline underline-offset-4 transition-colors hover:text-gold-200"
          >
            <BookOpen className="h-4 w-4" />
            {t.guideLink}
          </Link>
          <p className="text-xs text-cream/60">
            {t.deliveryBadge}
          </p>
        </div>
      </div>
    </section>
  );
}
