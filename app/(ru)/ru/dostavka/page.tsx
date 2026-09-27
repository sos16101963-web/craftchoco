import type { Metadata } from "next";
import { DostavkaPage } from "@/components/site/pages/dostavka-page";
import { innerMeta } from "@/lib/inner-meta";

export const metadata: Metadata = innerMeta("ru", {
  path: "/ru/dostavka",
  altPath: "/dostavka",
  title: "Доставка шоколадных конфет по Харькову в день заказа + Украина | CraftChocoKharkiv",
  description:
    "Доставка шоколада ручной работы по всем районам Харькова — курьером в день заказа (100 ₴, от 3000 ₴ бесплатно). Украина — Новой почтой 1–2 дня. Термобокс с охлаждением в жару.",
});

export default function Page() {
  return <DostavkaPage locale="ru" path="/ru/dostavka" />;
}
