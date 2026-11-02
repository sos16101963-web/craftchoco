import type { Metadata } from "next";
import { FaqPage } from "@/components/site/pages/faq-page";
import { innerMeta } from "@/lib/inner-meta";

export const metadata: Metadata = innerMeta("ru", {
  path: "/ru/faq",
  altPath: "/faq",
  title: "Частые вопросы о крафтовом шоколаде и заказе | CraftChoco FAQ",
  description:
    "Ответы шоколатье: как заказать конфеты в Харькове, сроки хранения Callebaut, доставка в термобоксах, корпоративные скидки до 10% и оплата по безналу.",
});

export default function Page() {
  return <FaqPage locale="ru" path="/ru/faq" />;
}
