import type { Metadata } from "next";
import { ContactsPage } from "@/components/site/pages/contacts-page";
import { innerMeta } from "@/lib/inner-meta";

export const metadata: Metadata = innerMeta("ru", {
  path: "/ru/kontakty",
  altPath: "/kontakty",
  title: "Контакты CraftChocoKharkiv — заказать шоколад в Харькове: 096 253 56 10",
  description:
    "Контакты шоколадной мастерской CraftChocoKharkiv: 096 253 56 10 (Viber, WhatsApp, Telegram), ежедневно 9:00–20:00, доставка по Харькову и Украине, YouTube-канал о шоколаде.",
});

export default function Page() {
  return <ContactsPage locale="ru" path="/ru/kontakty" />;
}
