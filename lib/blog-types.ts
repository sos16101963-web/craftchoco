// Типы блога (общие для uk/ru).
export interface BlogBlock {
  p?: string;
  list?: string[];
}
export interface BlogSection {
  h2: string;
  blocks: BlogBlock[];
}
export interface BlogArticle {
  slug: string;
  title: string;
  h1: string;
  description: string;
  date: string;
  readMin: number;
  lead: string[];
  sections: BlogSection[];
  productIds: string[];
}
