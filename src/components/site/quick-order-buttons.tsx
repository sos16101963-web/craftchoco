"use client";

import { MessageCircle, Phone, Send } from "lucide-react";
import { site } from "@/lib/site";
import { trackIntent } from "@/lib/analytics";
import type { Locale } from "@/lib/i18n";

export function QuickOrderButtons({
  productName,
  price,
  locale,
}: {
  productName: string;
  price: number;
  locale: Locale;
}) {
  const uk = locale === "uk";

  return (
    <div className="rounded-2xl border border-gold-500/30 bg-gold-500/10 p-4">
      <p className="text-center text-xs font-bold uppercase tracking-wider text-choco-800">
        ⚡ {uk ? "Швидкий заказ в 1 клік (без корзини):" : "Быстрый заказ в 1 клик (без корзины):"}
      </p>
      <div className="mt-2.5 grid grid-cols-2 gap-2.5">
        <a
          href={site.messengers[0].href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackIntent("viber", productName, price)}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[#7360f2]/40 bg-[#7360f2]/15 px-4 text-sm font-bold text-[#5c49d6] transition-all hover:bg-[#7360f2] hover:text-white"
        >
          <MessageCircle className="h-4.5 w-4.5" aria-hidden="true" />
          Viber
        </a>
        <a
          href={site.messengers[2].href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackIntent("telegram", productName, price)}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[#229ed9]/40 bg-[#229ed9]/15 px-4 text-sm font-bold text-[#0088cc] transition-all hover:bg-[#229ed9] hover:text-white"
        >
          <Send className="h-4.5 w-4.5" aria-hidden="true" />
          Telegram
        </a>
      </div>

      <a
        href={site.phoneHref}
        onClick={() => trackIntent("phone", productName, price)}
        className="mt-2.5 flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-gold-500/30 bg-white/90 px-3 text-xs font-bold text-choco-900 shadow-sm transition-all hover:bg-gold-500 hover:text-choco-950"
      >
        <Phone className="h-3.5 w-3.5 text-gold-600" aria-hidden="true" />
        {uk ? "Або подзвонити: 096 253 56 10" : "Или позвонить: 096 253 56 10"}
      </a>

      <p className="mt-2 text-center text-[11px] text-choco-600">
        {uk
          ? "Натисніть Viber/Telegram для зв'язку в чаті або зателефонуйте майстру"
          : "Нажмите Viber/Telegram для связи в чате или позвоните мастеру"}
      </p>
    </div>
  );
}
