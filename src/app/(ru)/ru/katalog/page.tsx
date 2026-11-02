import type { Metadata } from "next";
import { CatalogPage } from "@/components/site/pages/catalog-page";
import { innerMeta } from "@/lib/inner-meta";

export const metadata: Metadata = innerMeta("ru", {
  path: "/ru/katalog",
  altPath: "/katalog",
  title: "Купить конфеты ручной работы в Харькове — Каталог крафтового шоколада от 130 ₴ | CraftChoco",
  description:
    "Каталог конфет ручной работы в Харькове: авторские наборы с фруктовыми ганашами, шоколадные букеты роз, детские медианты и плитки Callebaut от 130 ₴. Доставка день в день!",
});

export default function Page() {
  return <CatalogPage locale="ru" path="/ru/katalog" />;
}
