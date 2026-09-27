// Типы блога (общие для uk/ru).

export interface BlogTable {
  headers: string[];
  rows: string[][];
  caption?: string;
}

export interface BlogBlock {
  p?: string;
  list?: string[];
  table?: BlogTable;
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
  /** Краткий вывод за 30 секунд (Answer-First / GEO выжимка для ИИ-поисковиков) */
  tldr?: string[];
  date: string;
  readMin: number;
  lead: string[];
  sections: BlogSection[];
  productIds: string[];
}
