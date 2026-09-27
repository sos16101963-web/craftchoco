import type { Metadata } from "next";
import { DostavkaPage } from "@/components/site/pages/dostavka-page";
import { innerMeta } from "@/lib/inner-meta";

export const metadata: Metadata = innerMeta("ru", {
  path: "/ru/dostavka",
  altPath: "/dostavka",
  title: "Доставка шоколадных конфет по Харькову в день заказа",
  description:
    "Доставка шоколада ручной работы по Харькову курьером в день заказа (от 3000 ₴ бесплатно). По Украине — Новой почтой 1–2 дня в термобоксе.",
});

export default function Page() {
  return <DostavkaPage locale="ru" path="/ru/dostavka" />;
}
