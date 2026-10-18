import type { Metadata } from "next";
import { SommelierPage } from "@/components/site/pages/sommelier-page";
import { innerMeta } from "@/lib/inner-meta";

export const metadata: Metadata = innerMeta("ru", {
  path: "/ru/sommelier",
  altPath: "/sommelier",
  title: "Шоколадный сомелье: онлайн подбор подарка по психотипу и вкусу | CraftChoco",
  description:
    "Интерактивный Шоколадный сомелье: подбор подарка из бельгийского шоколада Callebaut за 20 секунд. Расчёт по характеру, эмоции и бюджету. Скидка 10% по промокоду SOMELIER10.",
});

export default function Page() {
  return <SommelierPage locale="ru" path="/ru/sommelier" />;
}
