import Image from "next/image";
import { Candy, Flame, Hand, Gift } from "lucide-react";
import { getDict } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { YouTubeIcon, TikTokIcon } from "@/components/site/icons";

const icons = [Candy, Flame, Hand, Gift];

export function Craft({ locale }: { locale: Locale }) {
  const t = getDict(locale).craft;
  return (
    <section id="craft" className="relative scroll-mt-20 overflow-hidden bg-choco-950 py-20 text-cream lg:py-28" aria-label={t.aria}>
      <div className="texture-cocoa absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="divider-gold text-[13px] font-semibold uppercase tracking-[0.3em] text-gold-400">
            {t.kicker}
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">{t.h2}</h2>
          <p className="mt-4 text-lg leading-relaxed text-cream/75">
            {t.sub}
          </p>
        </div>

        <div className="relative mt-14">
          <div className="img-zoom relative aspect-[16/7] overflow-hidden rounded-3xl shadow-2xl">
            <Image
              src="/images/craft.jpg"
              alt={t.quote}
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-choco-950/80 via-transparent to-transparent" />
            <blockquote className="absolute bottom-5 left-5 right-5 sm:bottom-8 sm:left-8 sm:max-w-md">
              <p className="font-display text-lg italic leading-snug text-cream/95 sm:text-xl">
                {t.quote}
              </p>
              <footer className="mt-2 text-sm text-gold-300">{t.quoteBy}</footer>
            </blockquote>
          </div>

          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.steps.map((s: { title: string; text: string }, i: number) => {
              const Icon = icons[i];
              return (
                <li
                  key={s.title}
                  className="group rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition-colors hover:border-gold-500/40 hover:bg-white/[0.07]"
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gold-500/15 text-gold-400 transition-colors group-hover:bg-gold-500 group-hover:text-choco-950">
                      <Icon className="h-5.5 w-5.5" aria-hidden="true" />
                    </span>
                    <span className="font-display text-2xl font-bold text-white/15 transition-colors group-hover:text-gold-500/40">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold text-gold-200">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/70">{s.text}</p>
                </li>
              );
            })}
          </ol>

          {/* Живые видео создания: YouTube Shorts & TikTok */}
          <div className="mt-14 overflow-hidden rounded-3xl border border-gold-500/30 bg-gradient-to-br from-choco-900/90 via-choco-950/90 to-choco-900/90 p-8 sm:p-10 shadow-2xl backdrop-blur">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-3.5 py-1 text-xs font-semibold text-gold-300">
                  <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                  {locale === "uk" ? "Щоденні відео створення" : "Ежедневные видео создания"}
                </span>
                <h3 className="mt-3 font-display text-2xl font-bold text-cream sm:text-3xl">
                  {locale === "uk"
                    ? "Дивіться наживо, як ми створюємо кожен набір"
                    : "Смотрите вживую, как мы создаем каждый набор"}
                </h3>
                <p className="mt-2 text-sm sm:text-base leading-relaxed text-cream/75">
                  {locale === "uk"
                    ? "Темперування бельгійського Callebaut, заливка корпусних цукерок, декор шоколадних троянд та пакування замовлень. Щодня публікуємо нові відео з майстерні у Харкові."
                    : "Темперирование бельгийского Callebaut, заливка корпусных конфет, декор шоколадных роз и упаковка заказов. Каждый день публикуем новые видео из мастерской в Харькове."}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3.5 shrink-0">
                <a
                  href={site.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-red-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-transform hover:bg-red-500 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <YouTubeIcon className="h-5 w-5" />
                  <span>YouTube <span className="font-normal opacity-85">@craft.choco.kharkiv</span></span>
                </a>
                <a
                  href={site.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 rounded-2xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-bold text-cream backdrop-blur transition-all hover:bg-white/20 hover:border-gold-400/50 hover:text-gold-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <TikTokIcon className="h-5 w-5 text-[#25f4ee]" />
                  <span>TikTok <span className="font-normal opacity-85">@craft.choco.kharkiv</span></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
