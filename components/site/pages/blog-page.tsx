import Link from "next/link";
import Image from "next/image";
import { CalendarDays, Clock } from "lucide-react";
import { InnerShell } from "@/components/site/inner-shell";
import { switchPairFor } from "@/lib/pages";
import type { BlogArticle } from "@/lib/blog-types";
import type { Locale } from "@/lib/i18n";
import { breadcrumbLd } from "@/lib/inner-meta";

const COVERS: Record<string, string> = {
  "yak-zberihaty-shokolad": "/images/dark-85.webp",
  "chomu-callebaut": "/images/cut-bar.jpg",
  "temperuvannia-shokoladu": "/images/caramel-bar.webp",
  "iakyi-shokoladnyi-podarunok-obraty": "/images/set-sixteen.webp",
  "shokoladni-bukety": "/images/roses-marble.webp",
  "handmade-proty-fabryky": "/images/craft.webp",
  "kak-khranit-shokolad": "/images/dark-85.webp",
  "pochemu-callebaut": "/images/cut-bar.jpg",
  "temperirovanie-shokolada": "/images/caramel-bar.webp",
  "kakoy-shokoladnyy-podarok-vybrat": "/images/set-sixteen.webp",
  "shokoladnye-bukety": "/images/roses-marble.webp",
  "handmade-protiv-fabriki": "/images/craft.webp",
};

export function blogCover(slug: string): string {
  return COVERS[slug] ?? "/images/hero.jpg";
}

function formatDate(iso: string, locale: Locale) {
  return new Date(iso + "T12:00:00").toLocaleDateString(locale === "uk" ? "uk-UA" : "ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function BlogPage({ locale, path, articles }: { locale: Locale; path: string; articles: BlogArticle[] }) {
  const uk = locale === "uk";
  const [hero, ...rest] = articles;
  const seo = uk
    ? {
        kicker: "Блог про шоколад",
        h1: "Блог про шоколад ручної роботи",
        sub: "База знань майстерні CraftChocoKharkiv: як зберігати шоколад, чому Callebaut, що таке темперування і як вибрати подарунок. Пишемо просто про складне — без «води».",
      }
    : {
        kicker: "Блог о шоколаде",
        h1: "Блог о шоколаде ручной работы",
        sub: "База знаний мастерской CraftChocoKharkiv: как хранить шоколад, почему Callebaut, что такое темперирование и как выбрать подарок. Пишем просто о сложном — без «воды».",
      };

  return (
    <InnerShell locale={locale} switchPair={switchPairFor(path)}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbLd([{ name: uk ? "Головна" : "Главная", path: uk ? "/" : "/ru" }, { name: uk ? "Блог" : "Блог", path }]),
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
        {hero && (
          <Link
            href={blogArticlePath(hero.slug, locale)}
            className="group grid gap-0 overflow-hidden rounded-3xl border border-border bg-white shadow-sm transition-shadow hover:shadow-lg lg:grid-cols-2"
          >
            <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[320px]">
              <Image src={blogCover(hero.slug)} alt={hero.h1} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
            </div>
            <div className="flex flex-col justify-center p-7 lg:p-10">
              <div className="flex items-center gap-4 text-xs text-choco-500">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" /> {formatDate(hero.date, locale)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" /> {hero.readMin} {uk ? "хв читання" : "мин чтения"}
                </span>
              </div>
              <h2 className="mt-3 font-display text-2xl font-bold leading-snug text-choco-900 transition-colors group-hover:text-gold-700 sm:text-3xl">
                {hero.h1}
              </h2>
              <p className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-choco-600">{hero.lead[0]}</p>
              <span className="mt-5 font-semibold text-gold-700">{uk ? "Читати статтю →" : "Читать статью →"}</span>
            </div>
          </Link>
        )}

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((a) => (
            <Link
              key={a.slug}
              href={blogArticlePath(a.slug, locale)}
              className="card-lift group flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm"
            >
              <div className="relative aspect-[16/10]">
                <Image src={blogCover(a.slug)} alt={a.h1} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-3 text-[11px] text-choco-500">
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays className="h-3 w-3" aria-hidden="true" /> {formatDate(a.date, locale)}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" aria-hidden="true" /> {a.readMin} {uk ? "хв" : "мин"}
                  </span>
                </div>
                <h3 className="mt-2 font-display text-lg font-bold leading-snug text-choco-900 transition-colors group-hover:text-gold-700">{a.h1}</h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-choco-600">{a.lead[0]}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </InnerShell>
  );
}

export function blogArticlePath(slug: string, locale: Locale): string {
  return locale === "uk" ? `/blog/${slug}` : `/ru/blog/${slug}`;
}
