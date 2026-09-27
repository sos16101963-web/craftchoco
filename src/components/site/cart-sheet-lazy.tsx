"use client";

import dynamic from "next/dynamic";
import type { Locale } from "@/i18n";

// корзина не участвует в первом рендере — выносим Radix Sheet/zustand-UI из начального бандла
const CartSheet = dynamic(() => import("./cart-sheet").then((m) => m.CartSheet), {
  ssr: false,
});

export function CartSheetLazy({ locale }: { locale: Locale }) {
  return <CartSheet locale={locale} />;
}
