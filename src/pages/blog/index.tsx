import React, { useState } from "react";
import { BlogProvider } from "../../context/blog";
import { Header } from "~/components";
import { Articles } from "~/components/Articles";

function Blog() {
  const [articles, setArticles] = useState<any>([]);

  return (
    <BlogProvider value={{ articles, setArticles }}>
      <div>
        <Header />
        <div className="bg-blue topo flex h-full min-h-screen w-full flex-col ">
          <Articles />
        </div>
      </div>
    </BlogProvider>
  );
}

export default Blog;
