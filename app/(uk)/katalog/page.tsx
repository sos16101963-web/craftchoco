import type { Metadata } from "next";
import { CatalogPage } from "@/components/site/pages/catalog-page";
import { innerMeta } from "@/lib/inner-meta";

export const metadata: Metadata = innerMeta("uk", {
  path: "/katalog",
  altPath: "/ru/katalog",
  title: "Каталог шоколадних цукерок ручної роботи в Харкові — 14 наборів | CraftChocoKharkiv",
  description:
    "Каталог наборів з цукерок, плиток і шоколадних букетів ручної роботи з бельгійського Callebaut. Ціни від 150 ₴, подарункова упаковка безкоштовно, доставка Харковом у день замовлення.",
});

export default function Page() {
  return <CatalogPage locale="uk" path="/katalog" />;
}
