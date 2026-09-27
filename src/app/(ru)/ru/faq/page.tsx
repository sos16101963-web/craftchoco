import type { Metadata } from "next";
import { FaqPage } from "@/components/site/pages/faq-page";
import { innerMeta } from "@/lib/inner-meta";

export const metadata: Metadata = innerMeta("ru", {
  path: "/ru/faq",
  altPath: "/faq",
  title: "Вопросы и ответы о крафтовом шоколаде",
  description:
    "Ответы на вопросы: как заказать шоколад в Харькове, сроки хранения, оплата, доставка в жару в термобоксе и корпоративные заказы.",
});

export default function Page() {
  return <FaqPage locale="ru" path="/ru/faq" />;
}
