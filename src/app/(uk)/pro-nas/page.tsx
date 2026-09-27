import type { Metadata } from "next";
import { AboutPage } from "@/components/site/pages/about-page";
import { innerMeta } from "@/lib/inner-meta";

export const metadata: Metadata = innerMeta("uk", {
  path: "/pro-nas",
  altPath: "/ru/o-nas",
  title: "Про майстерню шоколаду в Харкові",
  description:
    "Історія та принципи майстерні CraftChoco: цукерки ручної роботи з бельгійського Callebaut, темперування за стандартом, 2000+ щасливих родин.",
});

export default function Page() {
  return <AboutPage locale="uk" path="/pro-nas" />;
}
