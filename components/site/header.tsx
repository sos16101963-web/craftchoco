"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { ShoppingBag, Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/store/cart";
import { site } from "@/lib/site";
import { getDict } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

export function Logo({ light = false, locale = "uk" }: { light?: boolean; locale?: Locale }) {
  return (
    <Link
      href={locale === "uk" ? "/" : "/ru"}
      className="flex items-center gap-2.5 group"
      aria-label={getDict(locale).header.logoAria}
    >
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
          light ? "border-gold-400/40 bg-choco-900" : "border-gold-500/50 bg-choco-900"
        }`}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <ellipse cx="12" cy="12" rx="7" ry="10" stroke="#d6b169" strokeWidth="1.6" transform="rotate(28 12 12)" />
          <path d="M8.5 3.8c3 3.4 4 12.6 1.4 16.6" stroke="#d6b169" strokeWidth="1.3" strokeLinecap="round" transform="rotate(28 12 12)" />
        </svg>
      </span>
      <span className={`font-display text-lg leading-none tracking-wide ${light ? "text-cream" : "text-choco-900"}`}>
        CRAFTCHOCO
        <span className="block text-[10px] font-sans font-semibold tracking-[0.32em] text-gold-500">KHARKIV</span>
      </span>
    </Link>
  );
}

const emptySubscribe = () => () => {};

function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

function useScrolled(threshold = 24) {
  const subscribe = useCallback((cb: () => void) => {
    window.addEventListener("scroll", cb, { passive: true });
    return () => window.removeEventListener("scroll", cb);
  }, []);
  const getSnapshot = useCallback(() => window.scrollY > threshold, [threshold]);
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

/** Переключатель языка: UKR ⇄ RU (hreflang-парные пути).
 *  switchPair — явная пара (uk-href, ru-href) текущей страницы;
 *  без неё — обратно совместимый дом/ru. */
function LangSwitch({
  locale,
  scrolled,
  switchPair,
}: {
  locale: Locale;
  scrolled: boolean;
  switchPair?: { uk: string; ru: string };
}) {
  const ukHref = switchPair?.uk ?? "/";
  const ruHref = switchPair?.ru ?? "/ru";
  return (
    <nav aria-label="Мова сайту / Язык сайта" className="flex items-center overflow-hidden rounded-full border text-xs font-bold">
      <a
        href={ukHref}
        hrefLang="uk"
        aria-current={locale === "uk" ? "page" : undefined}
        className={`px-2.5 py-1.5 transition-colors ${
          locale === "uk"
            ? "bg-gold-500 text-choco-950"
            : scrolled
              ? "text-choco-600 hover:text-choco-900"
              : "text-cream/70 hover:text-gold-300"
        }`}
      >
        UKR
      </a>
      <a
        href={ruHref}
        hrefLang="ru"
        aria-current={locale === "ru" ? "page" : undefined}
        className={`px-2.5 py-1.5 transition-colors ${
          locale === "ru"
            ? "bg-gold-500 text-choco-950"
            : scrolled
              ? "text-choco-600 hover:text-choco-900"
              : "text-cream/70 hover:text-gold-300"
        }`}
      >
        RU
      </a>
    </nav>
  );
}

export function Header({
  locale,
  switchPair,
}: {
  locale: Locale;
  switchPair?: { uk: string; ru: string };
}) {
  const t = getDict(locale).header;
  const items = useCart((s) => s.items);
  const openCart = useCart((s) => s.open);
  const mounted = useMounted();
  const scrolled = useScrolled();
  const [mobileOpen, setMobileOpen] = useState(false);

  const totalQty = mounted ? items.reduce((acc, i) => acc + i.qty, 0) : 0;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-cream/95 shadow-[0_8px_30px_-12px_rgba(42,26,14,0.25)] backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className={scrolled ? "" : "text-cream"}>
          <Logo light={!scrolled} locale={locale} />
        </div>

        <nav className="hidden items-center gap-1 lg:flex" aria-label={locale === "uk" ? "Основна навігація" : "Основная навигация"}>
          {t.nav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                scrolled ? "text-choco-800 hover:bg-cream-200" : "text-cream/90 hover:bg-white/10 hover:text-cream"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LangSwitch locale={locale} scrolled={scrolled} switchPair={switchPair} />

          <a
            href={site.phoneHref}
            className={`hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-colors xl:flex ${
              scrolled ? "text-choco-800 hover:text-choco-600" : "text-cream/90 hover:text-gold-300"
            }`}
            aria-label={t.call(site.phone)}
          >
            <Phone className="h-4 w-4" />
            {site.phone}
          </a>

          <Button
            onClick={openCart}
            variant="outline"
            size="icon"
            aria-label={t.openCart(totalQty)}
            className={`relative rounded-full h-11 w-11 border ${
              scrolled
                ? "border-choco-700/20 bg-white/70 text-choco-900 hover:bg-white"
                : "border-white/25 bg-white/10 text-cream backdrop-blur hover:bg-white/20"
            }`}
          >
            <ShoppingBag className="h-5 w-5" />
            {mounted && totalQty > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold-500 px-1 text-[11px] font-bold text-choco-950">
                {totalQty}
              </span>
            )}
          </Button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                aria-label={t.openMenu}
                className={`h-11 w-11 rounded-full border lg:hidden ${
                  scrolled
                    ? "border-choco-700/20 bg-white/70 text-choco-900 hover:bg-white"
                    : "border-white/25 bg-white/10 text-cream backdrop-blur hover:bg-white/20"
                }`}
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-choco-950 border-choco-800 text-cream">
              <SheetHeader>
                <SheetTitle className="text-left font-display text-xl text-cream">{t.menu}</SheetTitle>
              </SheetHeader>
              <nav className="mt-2 flex flex-col gap-1 px-4" aria-label={locale === "uk" ? "Мобільна навігація" : "Мобильная навигация"}>
                {t.nav.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-4 py-3 text-base font-medium text-cream/85 transition-colors hover:bg-choco-800 hover:text-gold-300"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="mt-2 flex items-center gap-2 px-4">
                  <span className="text-xs text-cream/50">UKR</span>
                  <a href="/" hrefLang="uk" className={`text-sm font-bold ${locale === "uk" ? "text-gold-300" : "text-cream/70"}`}>Ukrainian</a>
                  <span className="text-xs text-cream/50">·</span>
                  <a href="/ru" hrefLang="ru" className={`text-sm font-bold ${locale === "ru" ? "text-gold-300" : "text-cream/70"}`}>Русский</a>
                </div>
                <a
                  href={site.phoneHref}
                  className="mt-4 flex items-center gap-2 rounded-xl bg-choco-800 px-4 py-3 text-base font-semibold text-gold-300"
                >
                  <Phone className="h-4 w-4" /> {site.phone}
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
