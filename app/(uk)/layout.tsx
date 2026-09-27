import { makeMetadata, RootLayoutBase } from "@/components/site/layout-base";

export const metadata = makeMetadata("uk");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootLayoutBase locale="uk">{children}</RootLayoutBase>;
}
