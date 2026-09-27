import Link from "next/link";
import { InnerShell } from "@/components/site/inner-shell";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Catalog } from "@/components/site/catalog";
import { ThermoBanner } from "@/components/site/thermo-banner";
import { switchPairFor } from "@/lib/pages";
import { catalogFor } from "@/lib/products";
import { productPath } from "@/lib/slugs";
import { getDict } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { breadcrumbLd } from "@/lib/inner-meta";

export function CatalogPage({ locale, path }: { locale: Locale; path: string }) {
  const uk = locale === "uk";
  const products = catalogFor(locale);
  const t = getDict(locale);

  const seo = uk
    ? {
        h1: "Каталог шоколадних цукерок ручної роботи в Харкові",
        intro:
          "Чотирнадцять наборів, плиток і шоколадних букетів, які ми робимо руками в харківському цеху — з бельгійського шоколаду Callebaut. Обирайте емоцію: фруктові ганаши для «Свята без приводу», троянди, що не зів'януть, авторські плитки з горіхами й карамеллю. Кожен набір їде у святковій коробці — безкоштовно.",
        h2: "Що обрати: швидка навігація по каталогу",
      }
    : {
        h1: "Каталог конфет ручной работы в Харькове",
        intro:
          "Четырнадцать наборов, плиток и шоколадных букетов, которые мы делаем руками в харьковском цехе — из бельгийского шоколада Callebaut. Выбирайте эмоцию: фруктовые ганаши для «Праздника без повода», розы, которые не завянут, авторские плитки с орехами и карамелью. Каждый набор едет в праздничной коробке — бесплатно.",
        h2: "Что выбрать: быстрая навигация по каталогу",
      };

  return (
    <InnerShell locale={locale} switchPair={switchPairFor(path)}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbLd([{ name: uk ? "Головна" : "Главная", path: uk ? "/" : "/ru" }, { name: uk ? "Каталог" : "Каталог", path }]),
          ).replace(/</g, "\\u003c"),
        }}
      />
      <section className="bg-choco-950 pb-10 pt-32 text-cream sm:pt-36">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p className="text-[13px] font-semibold uppercase tracking-[0.3em] text-gold-400">{t.catalog.kicker}</p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl">{seo.h1}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-cream/85">{seo.intro}</p>
        </div>
      </section>

      <ThermoBanner locale={locale} />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-bold text-choco-900 sm:text-3xl">{seo.h2}</h2>
        <ul className="mt-5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <li key={p.id}>
              <Link
                href={productPath(p.id, locale)}
                className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-white px-4 py-3 text-sm font-medium text-choco-800 transition-colors hover:border-gold-500/50 hover:text-gold-700"
              >
                <span className="truncate">{p.name}</span>
                <span className="shrink-0 font-bold text-gold-700">{p.price} ₴</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <Catalog locale={locale} />

      <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
        <h2 className="font-display text-2xl font-bold text-choco-900">{uk ? "Як обрати набір — коротко" : "Как выбрать набор — коротко"}</h2>
        <div className="mt-4 space-y-4 text-[16px] leading-relaxed text-choco-700">
          <p>{t.catalog.advice1}</p>
          <p>{t.catalog.advice2}</p>
        </div>
      </section>
    </InnerShell>
  );
}
