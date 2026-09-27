import type { Metadata } from "next";
import { CatalogPage } from "@/components/site/pages/catalog-page";
import { innerMeta } from "@/lib/inner-meta";

export const metadata: Metadata = innerMeta("uk", {
  path: "/katalog",
  altPath: "/ru/katalog",
  title: "Каталог шоколадних цукерок ручної роботи",
  description:
    "Каталог цукерок, плиток та шоколадних букетів з бельгійського Callebaut. Ціни від 150 ₴, подарункова упаковка, доставка по Харкову в день замовлення.",
});

export default function Page() {
  return <CatalogPage locale="uk" path="/katalog" />;
}
