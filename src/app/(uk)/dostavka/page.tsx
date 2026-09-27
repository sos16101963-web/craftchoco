import type { Metadata } from "next";
import { DostavkaPage } from "@/components/site/pages/dostavka-page";
import { innerMeta } from "@/lib/inner-meta";

export const metadata: Metadata = innerMeta("uk", {
  path: "/dostavka",
  altPath: "/ru/dostavka",
  title: "Доставка шоколадних цукерок Харковом у день замовлення + Україна | CraftChocoKharkiv",
  description:
    "Доставка шоколаду ручної роботи всіма районами Харкова — кур'єром у день замовлення (100 ₴, від 3000 ₴ безкоштовно). Україна — Новою поштою 1–2 дні. Термобокс з охолодженням у спеку.",
});

export default function Page() {
  return <DostavkaPage locale="uk" path="/dostavka" />;
}
