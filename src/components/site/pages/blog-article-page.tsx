import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock, MessageCircle } from "lucide-react";
import { InnerShell } from "@/components/site/inner-shell";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { ProductCard } from "@/components/site/product-card";
import { blogCover, blogArticlePath } from "@/components/site/pages/blog-page";
import { switchPairFor } from "@/lib/pages";
import { catalogFor } from "@/lib/products";
import { getDict } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { breadcrumbLd } from "@/lib/inner-meta";
import type { BlogArticle } from "@/lib/blog-types";

/** Страница статьи блога + Article JSON-LD + CTA-товары */
export function BlogArticlePage({
  locale,
  path,
  article,
  others,
}: {
  locale: Locale;
  path: string;
  article: BlogArticle;
  others: BlogArticle[];
}) {
  const uk = locale === "uk";
  const t = getDict(locale);
  const products = catalogFor(locale).filter((p) => article.productIds.includes(p.id)).slice(0, 3);
  const cover = blogCover(article.slug);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.h1,
    description: article.description,
    image: `${site.url}${cover}`,
    datePublished: article.date,
    dateModified: article.date,
    inLanguage: uk ? "uk-UA" : "ru-UA",
    author: {
      "@type": "Person",
      name: uk ? "Шоколатьє майстерні CraftChoco" : "Шоколатье мастерской CraftChoco",
      jobTitle: uk ? "Головний шоколатьє" : "Главный шоколатье",
      url: `${site.url}${uk ? "/pro-nas" : "/ru/o-nas"}`,
    },
    publisher: { "@id": `${site.url}/#organization` },
    mainEntityOfPage: `${site.url}${path}`,
  };

  const dateFmt = new Date(article.date + "T12:00:00").toLocaleDateString(uk ? "uk-UA" : "ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <InnerShell locale={locale} switchPair={switchPairFor(path)}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd).replace(/</g, "\\u003c") }} />
      <div className="bg-cream-100/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: uk ? "Блог" : "Блог", path: uk ? "/blog" : "/ru/blog" },
              { name: article.h1, path },
            ]}
            locale={locale}
          />
        </div>
      </div>

      <article className="bg-cream-100/60 pb-4">
        <header className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="flex items-center gap-4 text-sm text-choco-500">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" aria-hidden="true" /> {dateFmt}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" aria-hidden="true" /> {article.readMin} {uk ? "хв читання" : "мин чтения"}
            </span>
          </div>
          <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-choco-900 sm:text-4xl">{article.h1}</h1>
        </header>
        <div className="relative mx-auto mt-8 aspect-[16/9] max-w-4xl overflow-hidden rounded-[1.5rem] shadow-lg sm:px-0">
          <Image src={cover} alt={article.h1} fill priority sizes="(max-width: 1024px) 100vw, 896px" className="object-cover" />
        </div>

        <div className="mx-auto mt-10 max-w-3xl px-4 sm:px-6">
          {article.tldr && article.tldr.length > 0 && (
            <aside className="mb-8 rounded-2xl border-2 border-gold-500/30 bg-gold-500/10 p-5 sm:p-6" aria-label={uk ? "Короткий висновок" : "Краткий вывод"}>
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gold-500/20 text-gold-700">📌</span>
                <h2 className="font-display text-lg font-bold text-choco-900">
                  {uk ? "Короткий висновок за 30 секунд (TL;DR)" : "Краткий вывод за 30 секунд (TL;DR)"}
                </h2>
              </div>
              <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-choco-800">
                {article.tldr.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-600" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </aside>
          )}

          <div className="space-y-4 text-[17px] leading-relaxed text-choco-800">
            {article.lead.map((p, i) => (
              <p key={i} className={i === 0 ? "text-lg font-medium text-choco-900" : undefined}>
                {p}
              </p>
            ))}
          </div>

          {article.sections.map((s) => (
            <section key={s.h2} className="mt-10">
              <h2 className="font-display text-2xl font-bold text-choco-900 sm:text-[27px]">{s.h2}</h2>
              <div className="mt-4 space-y-4 text-[16px] leading-relaxed text-choco-700">
                {s.blocks.map((b, i) => (
                  <div key={i}>
                    {b.p && <p>{b.p}</p>}
                    {b.list && (
                      <ul className="mt-2 space-y-2">
                        {b.list.map((li) => (
                          <li key={li} className="flex items-start gap-2.5">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" aria-hidden="true" />
                            <span className="leading-relaxed">{li}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {b.table && (
                      <div className="mt-4 overflow-x-auto rounded-2xl border border-gold-500/20 bg-white shadow-sm">
                        <table className="w-full min-w-[500px] text-left text-sm text-choco-800">
                          {b.table.caption && (
                            <caption className="bg-gold-500/10 p-3 text-left font-display text-sm font-semibold text-choco-900">
                              {b.table.caption}
                            </caption>
                          )}
                          <thead className="bg-choco-900 text-xs uppercase tracking-wider text-cream">
                            <tr>
                              {b.table.headers.map((h, hIdx) => (
                                <th key={hIdx} className="px-4 py-3 font-semibold">
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border">
                            {b.table.rows.map((row, rIdx) => (
                              <tr key={rIdx} className={rIdx % 2 === 0 ? "bg-white" : "bg-cream-100/40"}>
                                {row.map((cell, cIdx) => (
                                  <td key={cIdx} className={`px-4 py-3 ${cIdx === 0 ? "font-medium text-choco-900" : ""}`}>
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}

          <div className="mt-10 rounded-2xl bg-choco-950 p-7 text-cream">
            <p className="font-display text-xl font-bold">
              {uk ? "Смачних відкриттів!" : "Вкусных открытий!"}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-cream/85">
              {uk
                ? `Питання про шоколад? Пишіть у Viber або Telegram (${site.phoneShort}) — майстер відповідає особисто, щодня з 9:00 до 20:00.`
                : `Вопросы о шоколаде? Пишите в Viber или Telegram (${site.phoneShort}) — мастер отвечает лично, ежедневно с 9:00 до 20:00.`}
            </p>
            <a
              href={site.messengers[2].href}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-2.5 text-sm font-bold text-choco-950 transition-colors hover:bg-gold-400"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              {uk ? "Запитати майстра" : "Спросить мастера"}
            </a>
          </div>
        </div>
      </article>

      {products.length > 0 && (
        <section className="bg-cream-100/60 py-14" aria-label={uk ? "Набори зі статті" : "Наборы из статьи"}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center font-display text-2xl font-bold text-choco-900 sm:text-3xl">
              {uk ? "Набори, про які йдеться в статті" : "Наборы, о которых идёт речь в статье"}
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p) => (
                <ProductCard key={p.id} product={p as never} locale={locale} />
              ))}
            </div>
          </div>
        </section>
      )}

      {others.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-choco-900 sm:text-3xl">{uk ? "Читати ще" : "Читать ещё"}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((a) => (
              <Link
                key={a.slug}
                href={blogArticlePath(a.slug, locale)}
                className="group rounded-2xl border border-border bg-white p-5 transition-colors hover:border-gold-500/50"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-700">{uk ? "Стаття" : "Статья"}</p>
                <h3 className="mt-2 font-display text-lg font-bold leading-snug text-choco-900 transition-colors group-hover:text-gold-700">
                  {a.h1}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-choco-600">{a.lead[0]}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </InnerShell>
  );
}
