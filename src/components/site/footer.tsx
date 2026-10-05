import { site } from "@/lib/site";
import { categories } from "@/lib/products";
import { getDict } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { YouTubeIcon, TikTokIcon } from "@/components/site/icons";

export function Footer({ locale }: { locale: Locale }) {
  const t = getDict(locale).footer;
  return (
    <footer className="mt-auto bg-choco-950 text-cream/75" aria-label={locale === "uk" ? "Підвал сайту" : "Подвал сайта"}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-2xl font-bold text-cream">
              CRAFTCHOCO<span className="text-gold-400">KHARKIV</span>
            </p>
            <p className="mt-4 text-sm leading-relaxed">{t.about}</p>
            <ul className="mt-5 flex flex-wrap gap-2.5" aria-label={t.socialAria}>
              {site.social.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-cream/80 transition-colors hover:border-gold-500/60 hover:text-gold-300"
                  >
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label={t.catalogAria}>
            <h3 className="font-display text-lg font-bold text-gold-300">{t.catalogNav}</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href={locale === "uk" ? "/katalog" : "/ru/katalog"} className="font-semibold text-gold-400/90 transition-colors hover:text-gold-300">
                  {t.allSweets}
                </a>
              </li>
              {(locale === "uk"
                ? [
                    { id: "sets", label: "Подарункові набори" },
                    { id: "tiles", label: "Плитки та бруски" },
                    { id: "flowers", label: "Квіти та фігури" },
                  ]
                : [
                    { id: "sets", label: "Подарочные наборы" },
                    { id: "tiles", label: "Плитки и бруски" },
                    { id: "flowers", label: "Цветы и фигуры" },
                  ]
              ).map((c) => (
                <li key={c.id}>
                  <a href={locale === "uk" ? "/katalog" : "/ru/katalog"} className="transition-colors hover:text-gold-300">
                    {c.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={locale === "uk" ? "/tsiny" : "/ru/tseny"} className="transition-colors hover:text-gold-300">
                  {locale === "uk" ? "Ціни на всі набори" : "Цены на все наборы"}
                </a>
              </li>
            </ul>
          </nav>

          <nav aria-label={t.infoAria}>
            <h3 className="font-display text-lg font-bold text-gold-300">{t.infoNav}</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {t.infoLinks.map((l: { href: string; label: string }) => (
                <li key={l.href}>
                  <a href={l.href} className="transition-colors hover:text-gold-300">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-display text-lg font-bold text-gold-300">{t.contactsNav}</h3>
            <address className="mt-4 space-y-2.5 text-sm not-italic">
              <p>
                <a href={site.phoneHref} className="font-bold text-cream transition-colors hover:text-gold-300">
                  {site.phoneShort}
                </a>
              </p>
              <p>{t.messengers} — {site.phoneShort}</p>
              <p>
                {t.cityText[0]}
                <br />
                {t.cityText[1]}
              </p>
              <p>{locale === "uk" ? "Приймаємо замовлення щодня з 09:00 до 20:00" : "Принимаем заказы ежедневно с 09:00 до 20:00"}</p>
              <div className="flex flex-col gap-1.5 pt-1">
                <a
                  href={site.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-semibold text-gold-400/90 transition-colors hover:text-gold-300"
                >
                  <YouTubeIcon className="h-4 w-4 text-red-500 shrink-0" />
                  YouTube: @craft.choco.kharkiv
                </a>
                <a
                  href={site.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-semibold text-gold-400/90 transition-colors hover:text-gold-300"
                >
                  <TikTokIcon className="h-4 w-4 text-[#25f4ee] shrink-0" />
                  TikTok: @aleksandr_mag_
                </a>
              </div>
            </address>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-cream/50 sm:flex-row sm:px-6 lg:px-8">
          <p>{t.rights(locale === "uk" ? "Шоколадна майстерня CraftChoco (ChocoCraft)" : site.legalName)}</p>
          <p className="flex items-center gap-4">
            <span>{locale === "uk" ? "Харків" : "Харьков"}</span>
            <span aria-hidden="true">·</span>
            <span>{t.madeIn}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
