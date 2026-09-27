import type { Metadata } from "next";
import { ContactsPage } from "@/components/site/pages/contacts-page";
import { innerMeta } from "@/lib/inner-meta";

export const metadata: Metadata = innerMeta("ru", {
  path: "/ru/kontakty",
  altPath: "/kontakty",
  title: "Контакты и заказ шоколада в Харькове: 096 253 56 10",
  description:
    "Контакты шоколадной мастерской: 096 253 56 10 (Viber, WhatsApp, Telegram). Ежедневно 9:00–20:00, быстрая доставка по Харькову и Украине.",
});

export default function Page() {
  return <ContactsPage locale="ru" path="/ru/kontakty" />;
}
