export type Post = {
  slug: string;
  data: {
    [key: string]: string;
  };
  content: string;
};
