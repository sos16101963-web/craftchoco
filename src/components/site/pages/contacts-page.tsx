import { Clock, MapPin, Phone, Youtube } from "lucide-react";
import { InnerShell } from "@/components/site/inner-shell";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { ContactCta } from "@/components/site/contact";
import { switchPairFor } from "@/lib/pages";
import type { Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { breadcrumbLd } from "@/lib/inner-meta";
import { TikTokIcon } from "@/components/site/icons";

export function ContactsPage({ locale, path }: { locale: Locale; path: string }) {
  const uk = locale === "uk";
  const seo = uk
    ? {
        kicker: "Контакти",
        h1: "Контакти шоколадної майстерні CraftChocoKharkiv",
        sub: "Телефонуйте або пишіть у Viber, WhatsApp, Telegram — відповідаємо щодня з 9:00 до 20:00. Підберемо набір, узгодимо склад і дату доставки по Харкову або Новій пошті.",
      }
    : {
        kicker: "Контакты",
        h1: "Контакты шоколадной мастерской CraftChocoKharkiv",
        sub: "Звоните или пишите в Viber, WhatsApp, Telegram — отвечаем ежедневно с 9:00 до 20:00. Подберём набор, согласуем состав и дату доставки по Харькову или Новой почтой.",
      };

  return (
    <InnerShell locale={locale} switchPair={switchPairFor(path)}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbLd([{ name: uk ? "Головна" : "Главная", path: uk ? "/" : "/ru" }, { name: uk ? "Контакти" : "Контакты", path }]),
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

      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <a href={site.phoneHref} className="flex items-start gap-4 rounded-2xl border border-border bg-white p-6 transition-colors hover:border-gold-500/50">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-choco-900 text-gold-400">
              <Phone className="h-5 w-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block font-display text-xl font-bold text-choco-900">{site.phoneShort}</span>
              <span className="mt-1 block text-sm text-choco-600">Viber · WhatsApp · Telegram</span>
            </span>
          </a>
          <div className="flex items-start gap-4 rounded-2xl border border-border bg-white p-6">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-choco-900 text-gold-400">
              <Clock className="h-5 w-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block font-display text-xl font-bold text-choco-900">{uk ? "Щодня 9:00–20:00" : "Ежедневно 9:00–20:00"}</span>
              <span className="mt-1 block text-sm text-choco-600">{uk ? "приймаємо замовлення без вихідних" : "принимаем заказы без выходных"}</span>
            </span>
          </div>
          <div className="flex items-start gap-4 rounded-2xl border border-border bg-white p-6">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-choco-900 text-gold-400">
              <MapPin className="h-5 w-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block font-display text-xl font-bold text-choco-900">{uk ? "Харків" : "Харьков"}</span>
              <span className="mt-1 block text-sm text-choco-600">
                {uk ? "робимо в місті, доставляємо по всій Україні (Нова пошта)" : "делаем в городе, доставляем по всей Украине (Новая почта)"}
              </span>
            </span>
          </div>
          <a
            href={site.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 rounded-2xl border border-border bg-white p-6 transition-colors hover:border-gold-500/50"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-choco-900 text-red-500">
              <Youtube className="h-5 w-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block font-display text-xl font-bold text-choco-900">@craft.choco.kharkiv</span>
              <span className="mt-1 block text-sm text-choco-600">{uk ? "YouTube: процес, розрізи, нові набори" : "YouTube: процесс, разрезы, новые наборы"}</span>
            </span>
          </a>
          <a
            href={site.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 rounded-2xl border border-border bg-white p-6 transition-colors hover:border-gold-500/50"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-choco-900 text-[#25f4ee]">
              <TikTokIcon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block font-display text-xl font-bold text-choco-900">@craft.choco.kharkiv</span>
              <span className="mt-1 block text-sm text-choco-600">{uk ? "TikTok: щоденні відео створення з майстерні" : "TikTok: ежедневные видео создания из мастерской"}</span>
            </span>
          </a>
        </div>
      </section>

      <ContactCta locale={locale} />
    </InnerShell>
  );
}
