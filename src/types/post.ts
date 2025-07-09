export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  lastModified?: string;
  coverImage?: string;
  ogImage?: string;
  content: string;
  series?: string;
  seriesOrder?: number;
};

export type PostList = Omit<Post, 'content'>[];

export type PostSeriesInfo = Pick<Post, 'title' | 'slug'>;

export type TableOfContents = {
  content: string;
  slug: string;
  children: TableOfContents[];
};
