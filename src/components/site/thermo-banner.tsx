import { Snowflake } from "lucide-react";
import { getDict } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

/**
 * Яркий бейдж «снятие риска» сразу под первым экраном:
 * термобокс с охлаждением + гарантия замены. Главный страх клиента
 * (шоколад приедет растаявшим) закрывается до скролла к каталогу.
 */
export function ThermoBanner({ locale }: { locale: Locale }) {
  const t = getDict(locale).thermo;
  return (
    <section aria-label={t.title} className="relative z-10 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 py-4 shadow-[0_18px_40px_-18px_rgba(196,154,74,0.65)]">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-4 gap-y-1 px-4 text-center sm:px-6 lg:px-8">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-choco-950 text-gold-300">
          <Snowflake className="h-5 w-5" aria-hidden="true" />
        </span>
        <p className="text-base font-bold leading-snug text-choco-950 sm:text-lg">
          {t.title}.{" "}
          <span className="font-semibold text-choco-900/85">{t.text}</span>
        </p>
      </div>
    </section>
  );
}
