import type { Metadata } from "next";
import { FaqPage } from "@/components/site/pages/faq-page";
import { innerMeta } from "@/lib/inner-meta";

export const metadata: Metadata = innerMeta("ru", {
  path: "/ru/faq",
  altPath: "/faq",
  title: "Вопросы и ответы о шоколаде ручной работы в Харькове | CraftChocoKharkiv",
  description:
    "Ответы мастера на частые вопросы: сколько хранятся конфеты, как заказать, как оплатить, доедут ли в жару, корпоративные тиражи с логотипом. Харьков, CraftChocoKharkiv.",
});

export default function Page() {
  return <FaqPage locale="ru" path="/ru/faq" />;
}
