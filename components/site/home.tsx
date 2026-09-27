import { Header } from "@/components/site/header";
import { ChocolateJourney } from "@/components/site/chocolate-journey";
import { PhotoMarquee } from "@/components/site/photo-marquee";
import { Features } from "@/components/site/features";
import { Catalog } from "@/components/site/catalog";
import { About } from "@/components/site/about";
import { Craft } from "@/components/site/craft";
import { Reviews } from "@/components/site/reviews";
import { Delivery } from "@/components/site/delivery";
import { Faq } from "@/components/site/faq";
import { ContactCta } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
import { CartSheetLazy } from "@/components/site/cart-sheet-lazy";
import { JsonLd } from "@/components/site/json-ld";
import { SpriteProvider } from "@/components/site/icons";
import type { Locale } from "@/i18n";

/**
 * Общая страница сайта для обеих локалей:
 * "/" (uk, язык по умолчанию) и "/ru".
 * Локаль тянется пропсами во все секции — без контекста и middleware,
 * обе версии остаются полностью статическими (SSG).
 */
export function Home({ locale }: { locale: Locale }) {
  return (
    <SpriteProvider>
      <JsonLd locale={locale} />
      <Header locale={locale} />
      <main className="flex-1">
        {/* Шоколадное погружение: 3D-маршрут в стиле igloo.inc (fallback — обычный Hero) */}
        <ChocolateJourney locale={locale} />
        <PhotoMarquee locale={locale} />

        <Catalog locale={locale} />
        <Features locale={locale} />
        <About locale={locale} />
        <Craft locale={locale} />
        <Reviews locale={locale} />
        <Delivery locale={locale} />
        <Faq locale={locale} />
        <ContactCta locale={locale} />
      </main>
      <Footer locale={locale} />
      <CartSheetLazy locale={locale} />
    </SpriteProvider>
  );
}
