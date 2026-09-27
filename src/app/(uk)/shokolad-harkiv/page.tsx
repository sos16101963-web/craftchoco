import type { Metadata } from "next";
import { GeoShokoladPage } from "@/components/site/pages/geo-shokolad-page";
import { innerMeta } from "@/lib/inner-meta";

export const metadata: Metadata = innerMeta("uk", {
  path: "/shokolad-harkiv",
  altPath: "/ru/shokolad-harkov",
  title: "Шоколад ручної роботи в Харкові з Callebaut",
  description:
    "Шоколад ручної роботи в Харкові: авторські цукерки, плитки та букети з бельгійського Callebaut. Доставка у день замовлення по всіх районах міста.",
});

export default function Page() {
  return <GeoShokoladPage locale="uk" path="/shokolad-harkiv" />;
}
