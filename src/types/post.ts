export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  coverImage: string;
  ogImage: string;
  content: string;
};

export type TableOfContents = {
  content: string;
  slug: string;
  children: TableOfContents[];
};
