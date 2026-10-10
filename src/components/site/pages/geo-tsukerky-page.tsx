import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { InnerShell } from "@/components/site/inner-shell";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { ProductCard } from "@/components/site/product-card";
import { switchPairFor } from "@/lib/pages";
import { catalogFor } from "@/lib/products";
import { getDict } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { breadcrumbLd } from "@/lib/inner-meta";

const SETS_IDS = ["set-sixteen", "set-combo", "set-six", "set-four", "envelope-gift", "set-hobby"];

/** Гео-лендинг №2: «Цукерки ручної роботи в Харкові» */
export function GeoTsukerkyPage({ locale, path }: { locale: Locale; path: string }) {
  const uk = locale === "uk";
  const all = catalogFor(locale);
  const products = all.filter((p) => SETS_IDS.includes(p.id) || p.category === "sets").slice(0, 6);
  const t = getDict(locale);

  const seo = uk
    ? {
        kicker: "Цукерки · Харків",
        h1: "Цукерки ручної роботи в Харкові — купити набори з Callebaut від 130 ₴",
        p1: "Шоколадні цукерки ручної роботи — це не про «солодке», це про те, що ви скажете без слів. У нашій харківській майстерні кожна цукерка проходить шлях руками майстра: бельгійський Callebaut темперуємо до 45°C і кришталевого глянцю, начінюємо фруктовими ганашами й карамеллю, розписуємо какао-маслом. Ніяких конвеєрів, ні «кондитерської глазурі».",
        p2: "У каталозі — подарункові набори від 130 ₴: для коханих, мам, колег і «просто так». Кожен їде у святковій коробці зі стрічкою та листівкою з вашим посланням — безкоштовно. Кур'єрська доставка всіма районами Харкова в день замовлення, Україною — Новою поштою за 1–2 дні.",
        p3: "Не знаєте, який смак вибрати? Додайте набір у корзину — а всі деталі (смаки ганашів, напис на листівці, дата) узгодимо в Viber або Telegram перед відправкою. І так, перед відправкою надішлемо фото вашої коробки — щоб сюрприз був і для нас.",
        h2: "Набори цукерок, які беруть у Харкові",
        guaranteeH: "Чому цукерки доїдуть ідеальними",
        guarantee: "Кожне замовлення пакуємо в термосумку з охолодженням: у спеку до +30°C цукерки зберігають форму, глянець і малюнок. Якщо щось піде не так — замінимо за наш рахунок. Це не акція, це стандарт майстерні для кожної коробки.",
      }
    : {
        kicker: "Конфеты · Харьков",
        h1: "Конфеты ручной работы в Харькове — купить наборы из Callebaut от 130 ₴",
        p1: "Шоколадные конфеты ручной работы — это не про «сладкое», это про то, что вы скажете без слов. В нашей харьковской мастерской каждая конфета проходит путь руками мастера: бельгийский Callebaut темперируем до 45°C и кристального глянца, начиняем фруктовыми ганашами и карамелью, расписываем какао-маслом. Никаких конвейеров и никакой «кондитерской глазури».",
        p2: "В каталоге — подарочные наборы от 130 ₴: для любимых, мам, коллег и «просто так». Каждый едет в праздничной коробке с лентой и открыткой с вашим посланием — бесплатно. Курьерская доставка всеми районами Харькова в день заказа, Украиной — Новой почтой за 1–2 дня.",
        p3: "Не знаете, какой вкус выбрать? Добавьте набор в корзину — а все детали (вкусы ганашей, надпись на открытке, дата) согласуем в Viber или Telegram перед отправкой. И да, перед отправкой пришлём фото вашей коробки — чтобы сюрприз был и для нас.",
        h2: "Наборы конфет, которые берут в Харькове",
        guaranteeH: "Почему конфеты доедут идеальными",
        guarantee: "Каждый заказ пакуем в термосумку с охлаждением: в жару до +30°C конфеты сохраняют форму, глянец и рисунок. Если что-то пойдёт не так — заменим за наш счёт. Это не акция, это стандарт мастерской для каждой коробки.",
      };

  return (
    <InnerShell locale={locale} switchPair={switchPairFor(path)}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbLd([{ name: uk ? "Головна" : "Главная", path: uk ? "/" : "/ru" }, { name: uk ? "Цукерки ручної роботи Харків" : "Конфеты ручной работы Харьков", path }]),
          ).replace(/</g, "\\u003c"),
        }}
      />
      <section className="bg-choco-950 pb-14 pt-32 text-cream sm:pt-36">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p className="text-[13px] font-semibold uppercase tracking-[0.3em] text-gold-400">{seo.kicker}</p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl">{seo.h1}</h1>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="space-y-4 text-[16.5px] leading-relaxed text-choco-700">
          <p>{seo.p1}</p>
          <p>{seo.p2}</p>
          <p>{seo.p3}</p>
        </div>
      </section>

      <section className="bg-cream-100/60 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-3xl font-bold text-choco-900">{seo.h2}</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <ProductCard key={p.id} product={p as never} locale={locale} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href={uk ? "/katalog" : "/ru/katalog"} className="inline-flex h-13 items-center rounded-full bg-choco-900 px-9 py-3.5 font-bold text-cream transition-colors hover:bg-gold-600">
              {uk ? "Дивитися весь каталог" : "Смотреть весь каталог"}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <div className="rounded-2xl bg-choco-950 p-7 text-cream">
          <h2 className="flex items-center gap-3 font-display text-2xl font-bold">
            <ShieldCheck className="h-6 w-6 text-gold-400" aria-hidden="true" />
            {seo.guaranteeH}
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-cream/85">{seo.guarantee}</p>
          <p className="mt-4 text-sm font-semibold text-gold-300">
            {site.phoneShort} · {site.hours}
          </p>
        </div>
      </section>
    </InnerShell>
  );
}
