import React from "react";
import { ArticleType } from "~/types";

export const blogContext = React.createContext<null | {
  articles: { [k: string]: ArticleType[] };
  setArticles: React.Dispatch<React.SetStateAction<ArticleType[]>>;
}>(null);
export const BlogProvider = blogContext.Provider;
export const BlogConsumer = blogContext.Consumer;

export const useBlog = () => {
  const context = React.useContext(blogContext);
  if (!context) {
    throw new Error("useBlog should be used in <Blog> child components");
  }
  return context;
};
