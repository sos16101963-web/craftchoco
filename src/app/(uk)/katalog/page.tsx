import type { Metadata } from "next";
import { CatalogPage } from "@/components/site/pages/catalog-page";
import { innerMeta } from "@/lib/inner-meta";

export const metadata: Metadata = innerMeta("uk", {
  path: "/katalog",
  altPath: "/ru/katalog",
  title: "Купити крафтові шоколадні цукерки ручної роботи у Харкові — Каталог від 130 ₴ | CraftChoco",
  description:
    "Каталог шоколаду ручної роботи у Харкові: авторські набори цукерок з ганашами, шоколадні букети з троянд, дитячі медіанти та плитки Callebaut від 130 ₴. Доставка день у день!",
});

export default function Page() {
  return <CatalogPage locale="uk" path="/katalog" />;
}
