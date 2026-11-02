import type { Metadata } from "next";
import { ContactsPage } from "@/components/site/pages/contacts-page";
import { innerMeta } from "@/lib/inner-meta";

export const metadata: Metadata = innerMeta("uk", {
  path: "/kontakty",
  altPath: "/ru/kontakty",
  title: "Контакти майстерні шоколаду у Харкові — вул. Лебединська, 1 | CraftChoco",
  description:
    "Майстерня крафтового шоколаду CraftChoco у Харкові: вул. Лебединська, 1 (біля стадіону «Металіст» / м. Спортивна). Самовивіз та кур'єр по місту: 096 253 56 10 (Viber/Telegram).",
});

export default function Page() {
  return <ContactsPage locale="uk" path="/kontakty" />;
}
