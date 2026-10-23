import { SiteShell } from "@/components/site/site-shell";

export const dynamic = "force-static";
export const revalidate = 3600;

export default function Home() {
  return <SiteShell locale="uk" />;
}
