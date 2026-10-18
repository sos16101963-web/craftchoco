import type { Metadata } from "next";
import { SommelierPage } from "@/components/site/pages/sommelier-page";
import { innerMeta } from "@/lib/inner-meta";

export const metadata: Metadata = innerMeta("uk", {
  path: "/sommelier",
  altPath: "/ru/sommelier",
  title: "Шоколадний сомельє: онлайн підбір подарунка за психотипом та смаком | CraftChoco",
  description:
    "Інтерактивний Шоколадний сомельє: підбір подарунка з бельгійського шоколаду Callebaut за 20 секунд. Розрахунок за характером, емоцією та бюджетом. Знижка 10% за промокодом SOMELIER10.",
});

export default function Page() {
  return <SommelierPage locale="uk" path="/sommelier" />;
}
