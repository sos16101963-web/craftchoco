import type { Metadata } from "next";
import { DostavkaPage } from "@/components/site/pages/dostavka-page";
import { innerMeta } from "@/lib/inner-meta";

export const metadata: Metadata = innerMeta("ru", {
  path: "/ru/dostavka",
  altPath: "/dostavka",
  title: "Доставка шоколада ручной работы по Харькову день в день | От 130 ₴",
  description:
    "Быстрая доставка конфет ручной работы по Харькову курьером день в день: Центр, Салтовка, Алексеевка, Холодная Гора. По Украине — Новой Почтой в термобоксе за 24 ч!",
});

export default function Page() {
  return <DostavkaPage locale="ru" path="/ru/dostavka" />;
}
