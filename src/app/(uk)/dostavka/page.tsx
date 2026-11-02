import type { Metadata } from "next";
import { DostavkaPage } from "@/components/site/pages/dostavka-page";
import { innerMeta } from "@/lib/inner-meta";

export const metadata: Metadata = innerMeta("uk", {
  path: "/dostavka",
  altPath: "/ru/dostavka",
  title: "Доставка шоколаду ручної роботи по Харкову день у день | Від 130 ₴",
  description:
    "Швидка доставка шоколадних цукерок ручної роботи по Харкову кур'єром день у день: Центр, Салтівка, Олексіївка, Холодна Гора. По Україні — Новою Поштою у термобоксі за 24 год!",
});

export default function Page() {
  return <DostavkaPage locale="uk" path="/dostavka" />;
}
