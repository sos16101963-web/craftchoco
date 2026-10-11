import type { Metadata } from "next";
import { CorporatePage } from "@/components/site/pages/corporate-page";
import { innerMeta } from "@/lib/inner-meta";

export const metadata: Metadata = innerMeta("uk", {
  path: "/korporatyvni-podary",
  altPath: "/ru/korporativnye-podary",
  title: "Корпоративні подарунки з шоколаду ручної роботи від майстерні | CraftChoco",
  description:
    "Шоколадні корпоративні подарунки: набори на 4, 6, 9, 16 цукерок, дитячі медіанти. Знижки до -10%, кожен 15-й набір у подарунок, презент замовнику, доставка від 50 шт.",
});

export default function Page() {
  return <CorporatePage locale="uk" path="/korporatyvni-podary" />;
}
