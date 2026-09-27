import type { Metadata } from "next";
import { ContactsPage } from "@/components/site/pages/contacts-page";
import { innerMeta } from "@/lib/inner-meta";

export const metadata: Metadata = innerMeta("uk", {
  path: "/kontakty",
  altPath: "/ru/kontakty",
  title: "Контакти та замовлення: 096 253 56 10",
  description:
    "Контакти шоколадної майстерні: 096 253 56 10 (Viber, WhatsApp, Telegram). Щодня 9:00–20:00, швидка доставка по Харкову та Україні.",
});

export default function Page() {
  return <ContactsPage locale="uk" path="/kontakty" />;
}
