"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { CheckCircle2, Minus, Plus, ShoppingBag, Trash2, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/store/cart";
import { trackEvent, trackFb } from "@/lib/analytics";
import { formatPrice, formatProductPrice, catalogFor } from "@/lib/products";
import { site } from "@/lib/site";
import { toast } from "sonner";
import { getDict } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

export function CartSheet({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const catalog = catalogFor(locale);
  const isOpen = useCart((s) => s.isOpen);
  const close = useCart((s) => s.close);
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const clear = useCart((s) => s.clear);
  const add = useCart((s) => s.add);

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [orderDone, setOrderDone] = useState(false);
  const [sending, setSending] = useState(false);

  const lines = useMemo(
    () =>
      items
        .map((i) => ({ ...i, product: catalog.find((p) => p.id === i.id)! }))
        .filter((l) => Boolean(l.product)),
    [items]
  );

  const total = lines.reduce((acc, l) => acc + l.product.price * l.qty, 0);
  const freeFrom = site.freeShippingFrom;
  const progress = Math.min(100, Math.round((total / freeFrom) * 100));
  const remaining = Math.max(0, freeFrom - total);

  // Подсказки «добрать до бесплатной доставки»: сначала то, что влезает в остаток (крупное первым),
  // иначе — самый доступный набор, чтобы приблизиться к порогу.
  const suggestions = useMemo(() => {
    const inCart = new Set(lines.map((l) => l.id));
    const fits = catalog.filter((p) => !inCart.has(p.id) && p.price <= remaining).sort((a, b) => b.price - a.price);
    if (fits.length > 0) return fits.slice(0, 2);
    return catalog.filter((p) => !inCart.has(p.id)).sort((a, b) => a.price - b.price).slice(0, 2);
  }, [lines, remaining]);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return void toast.error(d.cart.errName);
    if (!/^[+0-9\s()\-]{10,18}$/.test(phone.trim())) return void toast.error(d.cart.errPhone);
    setSending(true);
    trackEvent("begin_checkout", { currency: "UAH", value: total, num_items: lines.length });
    trackFb("InitiateCheckout", { currency: "UAH", value: total, num_items: lines.length });

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          items: lines.map((l) => ({
            id: l.product.id,
            name: l.product.name,
            qty: l.qty,
            price: l.product.price,
          })),
          total,
          locale,
        }),
      });

      if (!res.ok) {
        throw new Error("Checkout request failed");
      }

      setSending(false);
      setOrderDone(true);
      clear();
      trackEvent("purchase", {
        currency: "UAH",
        value: total,
        num_items: lines.length,
        transaction_id: `web-${Date.now()}`,
      });
      trackFb("Purchase", { currency: "UAH", value: total, num_items: lines.length });
      toast.success(d.cart.accepted, { description: d.cart.acceptedText });
    } catch (err) {
      console.error("Order submission error:", err);
      setSending(false);
      toast.error(
        locale === "ru"
          ? "Помилка зв'язку. Спробуйте ще раз або зателефонуйте нам."
          : "Помилка зв'язку. Спробуйте ще раз або зателефонуйте нам."
      );
    }
  };

  const handleClose = (open: boolean) => {
    if (!open && orderDone) setOrderDone(false);
    close();
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent side="right" className="flex w-full flex-col bg-cream p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border bg-choco-950 px-6 py-5 text-left">
          <SheetTitle className="flex items-center gap-2.5 font-display text-xl text-cream">
            <ShoppingBag className="h-5 w-5 text-gold-400" aria-hidden="true" />
            {d.cart.title}
            {mounted && lines.length > 0 && (
              <span className="rounded-full bg-gold-500 px-2.5 py-0.5 text-xs font-bold text-choco-950">
                {lines.reduce((a, l) => a + l.qty, 0)}
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {!mounted ? (
          <div className="flex flex-1 items-center justify-center text-choco-500">{d.cart.loading}</div>
        ) : orderDone ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <CheckCircle2 className="h-16 w-16 text-gold-500" aria-hidden="true" />
            <h3 className="font-display text-2xl font-bold text-choco-900">{d.cart.accepted}</h3>
            <p className="leading-relaxed text-choco-600">
              {d.cart.acceptedText}
            </p>
            <Button
              onClick={() => {
                setOrderDone(false);
                close();
              }}
              className="mt-2 rounded-full bg-choco-900 px-8 font-bold text-cream hover:bg-choco-800"
            >
              {d.cart.keepShopping}
            </Button>
          </div>
        ) : lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <ShoppingBag className="h-16 w-16 text-choco-400/40" aria-hidden="true" />
            <h3 className="font-display text-2xl font-bold text-choco-900">{d.cart.empty}</h3>
            <p className="text-choco-600">{d.cart.emptyText}</p>
            <a href="#catalog" onClick={close}>
              <Button className="mt-2 rounded-full bg-choco-900 px-8 font-bold text-cream hover:bg-choco-800">
                {d.cart.toCatalog}
              </Button>
            </a>
          </div>
        ) : (
          <>
            <div className="border-b border-border px-6 py-4">
              {total >= freeFrom ? (
                <p className="flex items-center gap-2 text-sm font-semibold text-green-800">
                  <Truck className="h-4.5 w-4.5" aria-hidden="true" />
                  {d.cart.freeShippingReached}
                </p>
              ) : (
                <>
                  <p className="text-sm font-semibold text-choco-800">
                    {d.cart.freeShippingLeft(formatPrice(remaining, locale))}{" "}
                    <span className="whitespace-nowrap font-normal text-choco-500">
                      {d.cart.freeShippingGain(formatPrice(site.courierPrice, locale))}
                    </span>
                  </p>
                  <Progress value={progress} className="mt-2 h-2 bg-cream-200 [&>div]:bg-gold-500" aria-label="Прогресс до бесплатной доставки" />
                  {suggestions.length > 0 && (
                    <div className="mt-2.5">
                      <p className="text-xs font-semibold text-choco-500">{d.cart.suggest}</p>
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {suggestions.map((p) => (
                          <button
                            key={p.id}
                            onClick={() => {
                              add(p.id);
                              toast.success(d.cart.addedToast(p.name), {
                                description: d.cart.suggestToast(formatPrice(Math.max(0, freeFrom - (total + p.price)), locale)),
                              });
                            }}
                            className="rounded-full border border-gold-500/40 bg-gold-500/10 px-3 py-1.5 text-xs font-semibold text-choco-800 transition-colors hover:border-gold-500 hover:bg-gold-500/20"
                          >
                            + {p.name} · {formatProductPrice(p)}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            <ul className="flex-1 space-y-4 overflow-y-auto px-6 py-5 scrollbar-thin" aria-label="Товары в корзине">
              {lines.map((l) => (
                <li key={l.id} className="flex gap-3.5 rounded-2xl border border-border bg-white/80 p-3.5">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                    <Image src={l.product.image} alt={l.product.alt} fill sizes="80px" className="object-cover" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-bold leading-snug text-choco-900">{l.product.name}</p>
                      <button
                        onClick={() => remove(l.id)}
                        aria-label={d.cart.remove(l.product.name)}
                        className="text-choco-400 transition-colors hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="mt-0.5 text-xs text-choco-500">
                      {l.product.weight}
                      {l.product.cocoa ? d.cart.cocoa(l.product.cocoa) : ""}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center gap-1.5" role="group" aria-label={d.cart.qtyGroup(l.product.name)}>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7.5 w-7.5 rounded-full"
                          onClick={() => setQty(l.id, l.qty - 1)}
                          aria-label={d.cart.qtyDec}
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </Button>
                        <span className="w-7 text-center text-sm font-bold text-choco-900">{l.qty}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7.5 w-7.5 rounded-full"
                          onClick={() => setQty(l.id, l.qty + 1)}
                          aria-label={d.cart.qtyInc}
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                      <p className="font-display text-lg font-bold text-choco-900">
                        {formatPrice(l.product.price * l.qty)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-border bg-white/60 px-6 py-5">
              <div className="flex items-baseline justify-between">
                <span className="text-choco-600">{d.cart.total}</span>
                <span className="font-display text-2xl font-bold text-choco-900">{formatPrice(total)}</span>
              </div>
              <Separator className="my-4" />
              <form onSubmit={handleCheckout} className="space-y-3" aria-label="Оформление заказа">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="cart-name" className="sr-only">
                      {d.cart.name}
                    </Label>
                    <Input
                      id="cart-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={d.cart.namePlaceholder}
                      maxLength={50}
                      className="h-11 rounded-xl bg-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="cart-phone" className="sr-only">
                      {d.cart.phone}
                    </Label>
                    <Input
                      id="cart-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+380 (__) ___-__-__"
                      maxLength={18}
                      className="h-11 rounded-xl bg-white"
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={sending}
                  className="h-12 w-full rounded-full bg-gold-500 text-base font-bold text-choco-950 hover:bg-gold-400 disabled:opacity-60"
                >
                  {sending ? d.cart.checking : d.cart.checkout(formatPrice(total, locale))}
                </Button>
                <p className="text-center text-xs text-choco-500">
                  {d.cart.checkoutNote}
                </p>
              </form>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
