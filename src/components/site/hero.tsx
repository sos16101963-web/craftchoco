import Image from "next/image";
import { Star, Truck, Award, Leaf, Gift, Play } from "lucide-react";
import { rating, site } from "@/lib/site";
import { getDict } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

export function Hero({
  locale,
  onEnable3d,
}: {
  locale: Locale;
  /** Мобильный opt-in: кнопка «включить 3D-погружение» (на десктопе 3D и так включён) */
  onEnable3d?: () => void;
}) {
  const t = getDict(locale);
  const usps = t.hero.usps;
  const numFmt = locale === "uk" ? "uk-UA" : "ru-RU";

  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-choco-950 text-cream" aria-label={t.hero.aria}>
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero.jpg"
          alt={
            locale === "uk"
              ? "Фірмові шоколадні бруски ручної роботи CraftChocoKharkiv з бельгійського Callebaut на темному тлі з золотим логотипом"
              : "Фирменные шоколадные бруски ручной работы CraftChocoKharkiv из бельгийского Callebaut на тёмном фоне с золотым логотипом"
          }
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-choco-950 via-choco-950/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-choco-950 via-transparent to-choco-950/50" />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-4 pb-40 pt-36 sm:px-6 sm:pb-28 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10 lg:px-8">
        {/* Text column */}
        <div className="max-w-xl">
          <p className="animate-fade-up divider-gold text-[13px] font-semibold uppercase tracking-[0.3em] text-gold-400" style={{ animationDelay: "0.1s" }}>
            {t.hero.kicker}
          </p>

          {/* H1 с ключевыми словами одинаков в SSR и после гидратации — фикс аудита */}
          <h1
            className="animate-fade-up mt-6 font-display text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl"
            style={{ animationDelay: "0.25s" }}
          >
            {t.hero.h1a}{" "}
            <span className="gold-text">{t.hero.h1b}</span>
          </h1>

          <p className="animate-fade-up mt-6 max-w-xl text-lg leading-relaxed text-cream/80" style={{ animationDelay: "0.4s" }}>
            {t.hero.sub}
          </p>

          <div className="animate-fade-up mt-9 flex flex-wrap items-center gap-4" style={{ animationDelay: "0.55s" }}>
            <a
              href="#catalog"
              className="inline-flex h-14 items-center justify-center rounded-full bg-gold-500 px-9 text-base font-bold text-choco-950 shadow-[0_16px_40px_-12px_rgba(196,154,74,0.55)] transition-all hover:-translate-y-0.5 hover:bg-gold-400"
            >
              {t.hero.ctaPrimary}
            </a>
            <a
              href="#craft"
              className="inline-flex h-14 items-center justify-center rounded-full border border-cream/25 px-9 text-base font-semibold text-cream backdrop-blur transition-all hover:border-gold-400/60 hover:text-gold-300"
            >
              {t.hero.ctaSecondary}
            </a>
          </div>

          {onEnable3d && (
            <button
              onClick={onEnable3d}
              className="animate-fade-up mt-4 inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-gold-500/10 px-6 py-2.5 text-sm font-medium text-gold-300 transition-colors hover:bg-gold-500/20"
              style={{ animationDelay: "0.65s" }}
            >
              <Play className="h-4 w-4" aria-hidden="true" />
              {t.journey.overlays.enable3d}
            </button>
          )}

          <dl className="animate-fade-up mt-14 grid max-w-lg grid-cols-3 gap-6" style={{ animationDelay: "0.7s" }}>
            <div>
              <dt className="flex items-center gap-1.5 text-sm text-cream/60">
                <Star className="h-4 w-4 fill-gold-400 text-gold-400" aria-hidden="true" /> {t.hero.statRating}
              </dt>
              <dd className="mt-1 font-display text-2xl font-bold text-gold-300">
                {rating.value}
                <span className="ml-1 text-sm font-normal text-cream/60">/ 5</span>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-cream/60">{t.hero.statBoxes}</dt>
              <dd className="mt-1 font-display text-2xl font-bold text-gold-300">
                30<span className="ml-0.5 text-sm font-normal text-cream/60">+</span>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-cream/60">{t.hero.statGifts}</dt>
              <dd className="mt-1 font-display text-2xl font-bold text-gold-300">
                {rating.count.toLocaleString(numFmt)}
                <span className="ml-1 text-sm font-normal text-cream/60">+</span>
              </dd>
            </div>
          </dl>
        </div>

        {/* Photo collage */}
        <div className="relative mx-auto mt-2 w-full max-w-[560px]">
          {/* Main photo */}
          <div className="animate-float-slow relative z-10 -rotate-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] ring-1 ring-gold-400/40 shadow-[0_40px_80px_-24px_rgba(0,0,0,0.8)]">
              <Image
                src="/images/set-sixteen.webp"
                alt={
                  locale === "uk"
                    ? "Фірмовий набір із 16 цукерок CraftChocoKharkiv — ручна робота, бельгійський шоколад Callebaut з фруктовими ганашами"
                    : "Фирменный набор из 16 конфет CraftChocoKharkiv — ручная работа, бельгийский шоколад Callebaut с фруктовыми ганашами"
                }
                fill
                priority
                sizes="(min-width: 1024px) 480px, 90vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-choco-950/45 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 hidden rounded-full bg-choco-950/75 px-4 py-1.5 text-sm font-semibold text-gold-300 backdrop-blur sm:block">
                {t.hero.setBadge}
              </div>
            </div>
          </div>

          {/* Second photo — top left overlap */}
          <div className="absolute -left-4 -top-8 z-20 w-[38%] rotate-[-7deg] sm:-left-8">
            <div className="relative aspect-square overflow-hidden rounded-2xl border-4 border-choco-900 shadow-[0_24px_50px_-16px_rgba(0,0,0,0.75)] ring-1 ring-gold-400/30">
              <Image
                src="/images/roses-marble.webp"
                alt={
                  locale === "uk"
                    ? "Шоколадні троянди з мармуровим візерунком CraftChocoKharkiv — букет, який не зів'яне"
                    : "Шоколадные розы с мраморным узором CraftChocoKharkiv — букет, который не завянет"
                }
                fill
                sizes="200px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Third photo — bottom right overlap */}
          <div className="absolute -bottom-10 -right-3 z-20 w-[42%] rotate-[4deg] sm:-right-7">
            <div className="relative aspect-[5/4] overflow-hidden rounded-2xl border-4 border-choco-900 shadow-[0_24px_50px_-16px_rgba(0,0,0,0.75)] ring-1 ring-gold-400/30">
              <Image
                src="/images/art-bars.webp"
                alt={
                  locale === "uk"
                    ? "Авторські шоколадні плитки з малюнком CraftChocoKharkiv — бельгійський Callebaut"
                    : "Авторские шоколадные плитки с рисунком CraftChocoKharkiv — бельгийский Callebaut"
                }
                fill
                sizes="220px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Master's seal — rotating stamp */}
          <div className="absolute -right-2 -top-10 z-30 sm:-right-5">
            <svg viewBox="0 0 120 120" className="h-24 w-24 animate-[spin_22s_linear_infinite] drop-shadow-[0_10px_24px_rgba(0,0,0,0.6)] sm:h-28 sm:w-28" role="img" aria-label={locale === "uk" ? "Друк майстра CraftChocoKharkiv" : "Пломба мастера CraftChocoKharkiv"}>
              <defs>
                <path id="seal-circle" d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0" fill="none" />
              </defs>
              <circle cx="60" cy="60" r="58" fill="rgba(28,16,9,0.88)" stroke="rgba(212,175,55,0.65)" strokeWidth="1.5" />
              <circle cx="60" cy="60" r="33" fill="none" stroke="rgba(212,175,55,0.4)" strokeWidth="1" />
              <text fill="#e9c46a" fontSize="10" letterSpacing="2.5" fontWeight="600">
                <textPath href="#seal-circle">{locale === "uk" ? "ПІД КОНТРОЛЕМ МАЙСТРА • ХАРКІВ •" : "ПОД КОНТРОЛЕМ МАСТЕРА • ХАРЬКОВ •"}</textPath>
              </text>
              <text x="60" y="58" textAnchor="middle" fill="#e9c46a" fontSize="15" fontWeight="700" fontFamily="var(--font-display)">100%</text>
              <text x="60" y="74" textAnchor="middle" fill="rgba(247,240,225,0.85)" fontSize="8.5" letterSpacing="1">{locale === "uk" ? "РУЧНА" : "РУЧНАЯ"}</text>
            </svg>
          </div>

          {/* Free delivery chip */}
          <div className="absolute -bottom-5 -left-2 z-30 rotate-[-3deg] sm:-left-6">
            <div className="flex items-center gap-2 rounded-full bg-gold-500 px-4 py-2 text-sm font-bold text-choco-950 shadow-[0_16px_36px_-10px_rgba(196,154,74,0.65)]">
              <Gift className="h-4 w-4" aria-hidden="true" />
              {locale === "uk" ? "Від 3 000 ₴ — доставка безкоштовно" : "От 3 000 ₴ — доставка бесплатно"}
            </div>
          </div>
        </div>
      </div>

      {/* USP strip */}
      <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-choco-950/70 backdrop-blur-md">
        <ul className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-2 px-4 py-4 sm:px-6 lg:justify-between lg:px-8">
          {usps.map((u: string) => (
            <li key={u} className="flex items-center gap-2.5 text-sm font-medium text-cream/85">
              {u.startsWith("100%") ? (
                <Leaf className="h-5 w-5 text-gold-400" aria-hidden="true" />
              ) : u.includes("Ручна") || u.includes("Ручная") ? (
                <Award className="h-5 w-5 text-gold-400" aria-hidden="true" />
              ) : u.includes("оставка") || u.includes("оставимо") ? (
                <Truck className="h-5 w-5 text-gold-400" aria-hidden="true" />
              ) : (
                <Gift className="h-5 w-5 text-gold-400" aria-hidden="true" />
              )}
              {u}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
