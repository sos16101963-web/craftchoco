"use client";

import { useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/store/cart";
import { formatProductPrice } from "@/lib/products";
import { getDict } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { toast } from "sonner";

/** Кнопка «В корзину» для посадочных страниц товара */
export function AddToCartButton({
  productId,
  productName,
  price,
  priceFrom,
  locale,
  className,
}: {
  productId: string;
  productName: string;
  price: number;
  priceFrom?: boolean;
  locale: Locale;
  className?: string;
}) {
  const t = getDict(locale);
  const add = useCart((s) => s.add);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    add(productId);
    toast.success(t.common.added, {
      description: `«${productName}» — ${formatProductPrice({ price, priceFrom } as never, locale)}`,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Button
      onClick={handleAdd}
      aria-label={t.common.addToCart(productName)}
      className={
        className ??
        "h-14 w-full rounded-full bg-gold-500 text-base font-bold text-choco-950 shadow-[0_16px_40px_-12px_rgba(196,154,74,0.55)] transition-all hover:-translate-y-0.5 hover:bg-gold-400 sm:w-auto sm:px-10"
      }
    >
      {added ? <Check className="mr-2 h-5 w-5" aria-hidden="true" /> : <ShoppingBag className="mr-2 h-5 w-5" aria-hidden="true" />}
      {added ? t.common.added : t.common.inCart}
    </Button>
  );
}
