import { Header } from "@/components/site/header";
import { ChocolateJourney } from "@/components/site/chocolate-journey";
import { ThermoBanner } from "@/components/site/thermo-banner";
import { PhotoMarquee } from "@/components/site/photo-marquee";
import { Catalog } from "@/components/site/catalog";
import { Features } from "@/components/site/features";
import { About } from "@/components/site/about";
import { Craft } from "@/components/site/craft";
import { Corporate } from "@/components/site/corporate";
import { Reviews } from "@/components/site/reviews";
import { Delivery } from "@/components/site/delivery";
import { Faq } from "@/components/site/faq";
import { ContactCta } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
import { CartSheet } from "@/components/site/cart-sheet";
import { LeadMagnet } from "@/components/site/lead-magnet";
import { JsonLd } from "@/components/site/json-ld";
import { StarSprite } from "@/components/site/stars";
import type { Locale } from "@/lib/i18n";

/**
 * Оболочка сайта — одна на обе локали.
 * uk: путь «/» (root-группа (uk)), ru: путь «/ru» (root-группа (ru)).
 */
export function SiteShell({ locale }: { locale: Locale }) {
  return (
    <>
      <JsonLd locale={locale} />
      <StarSprite />
      <Header locale={locale} />
      <main className="flex-1">
        {/* Шоколадное погружение: 3D-маршрут (fallback — обычный Hero с H1) */}
        <ChocolateJourney locale={locale} />
        <ThermoBanner locale={locale} />
        <PhotoMarquee locale={locale} />

        <Catalog locale={locale} />
        <Features locale={locale} />
        <About locale={locale} />
        <Craft locale={locale} />
        <Reviews locale={locale} />
        <Delivery locale={locale} />
        <Faq locale={locale} />
        <Corporate locale={locale} />
        <ContactCta locale={locale} />
      </main>
      <Footer locale={locale} />
      <CartSheet locale={locale} />
      <LeadMagnet locale={locale} />
    </>
  );
}
