"use client";

import dynamic from "next/dynamic";

/* Sonner выносится из стартового бандла: чанк грузится после гидратации,
   тосты нужны только после действий пользователя (корзина/лид-магнит).
   Меньше JS в главном потоке → короче long tasks → ниже TBT. */
const Toaster = dynamic(() => import("@/components/ui/sonner").then((m) => m.Toaster), {
  ssr: false,
});

export function LazyToaster() {
  return <Toaster />;
}
