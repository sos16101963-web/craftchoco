import Image from "next/image";
import type { Locale } from "@/lib/i18n";

/** Верхний банер внутренней страницы: фон + H1 + подзаголовок */
export function InnerHero({
  locale,
  kicker,
  title,
  sub,
  image = "/images/hero.jpg",
}: {
  locale: Locale;
  kicker: string;
  title: string;
  sub?: string;
  image?: string;
}) {
  const alt = locale === "uk" ? "Шоколадні цукерки ручної роботи CraftChocoKharkiv, Харків" : "Шоколадные конфеты ручной работы CraftChocoKharkiv, Харьков";
  return (
    <section className="relative overflow-hidden bg-choco-950 text-cream">
      <div className="absolute inset-0">
        <Image src={image} alt={alt} fill priority sizes="100vw" className="object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-choco-950/80 via-choco-950/60 to-choco-950" />
      </div>
      <div className="relative mx-auto max-w-4xl px-4 pb-14 pt-36 text-center sm:px-6 sm:pt-40">
        <p className="text-[13px] font-semibold uppercase tracking-[0.3em] text-gold-400">{kicker}</p>
        <h1 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl">{title}</h1>
        {sub && <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-cream/85 sm:text-lg">{sub}</p>}
      </div>
    </section>
  );
}
