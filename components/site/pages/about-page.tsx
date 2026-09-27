import { InnerShell } from "@/components/site/inner-shell";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { About } from "@/components/site/about";
import { Craft } from "@/components/site/craft";
import { switchPairFor } from "@/lib/pages";
import type { Locale } from "@/lib/i18n";
import { breadcrumbLd } from "@/lib/inner-meta";

export function AboutPage({ locale, path }: { locale: Locale; path: string }) {
  const uk = locale === "uk";
  const seo = uk
    ? {
        kicker: "Про майстерню",
        h1: "Про шоколадну майстерню CraftChocoKharkiv (Харків)",
        sub: "Маленька команда шоколатьє, яка робить цукерки ручної роботи з бельгійського Callebaut у Харкові. Наша віра: шоколад — це мова, якою говорять про любов, вдячність і турботу.",
        extraH2: "Наші принципи — коротко і без маркетингового туману",
        extra: [
          "Тільки Callebaut: темний 70%, молочний 33%, білий 28%. Жодних замін, навіть «на трохи дешевше».",
          "Малі партії: те, що ви отримаєте, зроблено за кілька днів до відправки, без консервантів.",
          "Ручна робота на кожному етапі: темперування, відливання, ганаши, розпис какао-маслом, упаковка.",
          "Чесні терміни: якщо не встигаємо до вашої дати — скажемо одразу, а не «затримаємо на день».",
        ],
      }
    : {
        kicker: "О мастерской",
        h1: "О шоколадной мастерской CraftChocoKharkiv (Харьков)",
        sub: "Маленькая команда шоколатье, которая делает конфеты ручной работы из бельгийского Callebaut в Харькове. Наша вера: шоколад — это язык, на котором говорят о любви, благодарности и заботе.",
        extraH2: "Наши принципы — коротко и без маркетингового тумана",
        extra: [
          "Только Callebaut: тёмный 70%, молочный 33%, белый 28%. Никаких замен, даже «на чуть дешевле».",
          "Малые партии: то, что вы получите, сделано за несколько дней до отправки, без консервантов.",
          "Ручная работа на каждом этапе: темперирование, отливка, ганаши, роспись какао-маслом, упаковка.",
          "Честные сроки: если не успеваем к вашей дате — скажем сразу, а не «задержим на день».",
        ],
      };

  return (
    <InnerShell locale={locale} switchPair={switchPairFor(path)}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbLd([{ name: uk ? "Головна" : "Главная", path: uk ? "/" : "/ru" }, { name: uk ? "Про майстерню" : "О мастерской", path }]),
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
        <h2 className="font-display text-3xl font-bold text-choco-900">{seo.extraH2}</h2>
        <ul className="mt-6 space-y-3">
          {seo.extra.map((line) => (
            <li key={line} className="flex items-start gap-3 rounded-xl border border-border bg-white px-5 py-4 text-[15px] leading-relaxed text-choco-800">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold-500" aria-hidden="true" />
              {line}
            </li>
          ))}
        </ul>
      </section>

      <About locale={locale} />
      <Craft locale={locale} />
    </InnerShell>
  );
}
