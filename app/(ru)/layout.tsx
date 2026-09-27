import { makeMetadata, RootLayoutBase } from "@/components/site/layout-base";

export const metadata = makeMetadata("ru");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootLayoutBase locale="ru">{children}</RootLayoutBase>;
}
