import type { Metadata } from "next";
import { ContactsPage } from "@/components/site/pages/contacts-page";
import { innerMeta } from "@/lib/inner-meta";

export const metadata: Metadata = innerMeta("ru", {
  path: "/ru/kontakty",
  altPath: "/kontakty",
  title: "Контакты мастерской шоколада в Харькове — ул. Лебединская, 1 | CraftChoco",
  description:
    "Мастерская крафтового шоколада CraftChoco в Харькове: ул. Лебединская, 1 (район стадиона «Металлист» / метро Спортивная). Самовывоз и курьер по городу: 096 253 56 10 (Viber/Telegram).",
});

export default function Page() {
  return <ContactsPage locale="ru" path="/ru/kontakty" />;
}
