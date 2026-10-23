import type { Metadata } from "next";
import { CorporatePage } from "@/components/site/pages/corporate-page";
import { innerMeta } from "@/lib/inner-meta";

export const metadata: Metadata = innerMeta("uk", {
  path: "/korporatyvni-podary",
  altPath: "/ru/korporativnye-podary",
  title: "Їстівні корпоративні подарунки з шоколаду: набори для колег і партнерів | CraftChoco",
  description:
    "Їстівні корпоративні подарунки з бельгійського шоколаду Callebaut ручної роботи. Набори від 130 ₴ до Нового року 2026: фірмові листівки з логотипом, знижки до -10%, дегустаційний сет для офісу, безготівковий розрахунок.",
});

export default function Page() {
  return <CorporatePage locale="uk" path="/korporatyvni-podary" />;
}
