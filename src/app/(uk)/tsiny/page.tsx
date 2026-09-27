import type { Metadata } from "next";
import { PricesPage } from "@/components/site/pages/prices-page";
import { innerMeta } from "@/lib/inner-meta";

export const metadata: Metadata = innerMeta("uk", {
  path: "/tsiny",
  altPath: "/ru/tseny",
  title: "Ціни на шоколадні цукерки ручної роботи у Харкові",
  description:
    "Прайс майстерні CraftChoco: набори цукерок від 150 ₴, букети та плитки з Callebaut. Безкоштовна упаковка, доставка по Харкову в день замовлення.",
});

export default function Page() {
  return <PricesPage locale="uk" path="/tsiny" />;
}
