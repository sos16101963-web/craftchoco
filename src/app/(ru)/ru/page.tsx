import { SiteShell } from "@/components/site/site-shell";

export const dynamic = "force-static";
export const revalidate = 3600;

export default function HomeRu() {
  return <SiteShell locale="ru" />;
}
