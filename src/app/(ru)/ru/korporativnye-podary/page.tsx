import type { Metadata } from "next";
import { CorporatePage } from "@/components/site/pages/corporate-page";
import { innerMeta } from "@/lib/inner-meta";

export const metadata: Metadata = innerMeta("ru", {
  path: "/ru/korporativnye-podary",
  altPath: "/korporatyvni-podary",
  title: "Корпоративные подарки из шоколада ручной работы от мастерской | CraftChoco",
  description:
    "Шоколадные корпоративные подарки: наборы на 4, 6, 9, 16 конфет, детские медианты. Скидки до 10%, каждый 15-й набор в подарок, презент заказчику, доставка от 50 шт.",
});

export default function Page() {
  return <CorporatePage locale="ru" path="/ru/korporativnye-podary" />;
}
