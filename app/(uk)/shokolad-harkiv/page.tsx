import type { Metadata } from "next";
import { GeoShokoladPage } from "@/components/site/pages/geo-shokolad-page";
import { innerMeta } from "@/lib/inner-meta";

export const metadata: Metadata = innerMeta("uk", {
  path: "/shokolad-harkiv",
  altPath: "/ru/shokolad-harkov",
  title: "Шоколад ручної роботи в Харкові — на замовлення з Callebaut | CraftChocoKharkiv",
  description:
    "Шоколад ручної роботи в Харкові від майстерні CraftChocoKharkiv: цукерки, плитки та букети з бельгійського Callebaut. Кур'єр у день замовлення всіма районами, термобокс у спеку.",
});

export default function Page() {
  return <GeoShokoladPage locale="uk" path="/shokolad-harkiv" />;
}
