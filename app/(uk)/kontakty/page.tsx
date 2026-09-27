import type { Metadata } from "next";
import { ContactsPage } from "@/components/site/pages/contacts-page";
import { innerMeta } from "@/lib/inner-meta";

export const metadata: Metadata = innerMeta("uk", {
  path: "/kontakty",
  altPath: "/ru/kontakty",
  title: "Контакти CraftChocoKharkiv — замовити шоколад у Харкові: 096 253 56 10",
  description:
    "Контакти шоколадної майстерні CraftChocoKharkiv: 096 253 56 10 (Viber, WhatsApp, Telegram), щодня 9:00–20:00, доставка Харковом і Україною, YouTube-канал про шоколад.",
});

export default function Page() {
  return <ContactsPage locale="uk" path="/kontakty" />;
}
