import type { Metadata } from "next";
import { FaqPage } from "@/components/site/pages/faq-page";
import { innerMeta } from "@/lib/inner-meta";

export const metadata: Metadata = innerMeta("uk", {
  path: "/faq",
  altPath: "/ru/faq",
  title: "Часті питання про крафтовий шоколад та замовлення | CraftChoco FAQ",
  description:
    "Відповіді шоколатьє: як замовити цукерки у Харкові, терміни придатності Callebaut, доставка в термобоксах, корпоративні знижки до -10% та оплата на рахунок.",
});

export default function Page() {
  return <FaqPage locale="uk" path="/faq" />;
}
