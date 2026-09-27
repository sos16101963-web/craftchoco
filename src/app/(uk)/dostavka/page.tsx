import type { Metadata } from "next";
import { DostavkaPage } from "@/components/site/pages/dostavka-page";
import { innerMeta } from "@/lib/inner-meta";

export const metadata: Metadata = innerMeta("uk", {
  path: "/dostavka",
  altPath: "/ru/dostavka",
  title: "Доставка шоколадних цукерок по Харкову",
  description:
    "Доставка шоколаду ручної роботи по Харкову кур'єром у день замовлення (від 3000 ₴ безкоштовно). По Україні — Новою поштою 1–2 дні у термобоксі.",
});

export default function Page() {
  return <DostavkaPage locale="uk" path="/dostavka" />;
}
