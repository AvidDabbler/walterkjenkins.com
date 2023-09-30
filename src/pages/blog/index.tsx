import React from "react";
import { Header } from "~/components";
import { getAllPosts } from "~/utils/blog";
import { Post } from "~/types";
import Link from "next/link";
import { paths } from "~/config";

type Props = {
  allPosts: Post[]
}

function Blog({ allPosts }: Props) {
  return (
    <div>
      <Header />
      <div className="bg-blue topo flex h-full min-h-screen w-full flex-col ">
        <div className="my-auto h-full">
          <div className="bg-blue topo mp-14 flex h-full min-h-screen w-full flex-col items-center pt-14 text-white">
            <div className="my-14 w-3/4 max-w-[800px]">
              <h1 className="text-3xl">Blog</h1>
              {allPosts.map((article) => {
                return (
                  <div className="p-2 pt-4 mr-6 lessons">
                    <div className="w-full justify-between flex flex-row">
                      <h3 className="text-xl">
                        <Link className="link" href={`${paths.blog}/${article.slug.replaceAll("-", "")}`}>
                          {article.title}
                        </Link>
                      </h3>
                      <p>{article.date}</p>
                    </div>
                    <div className="">
                      <div className="flex  flex-wrap"></div>
                      <div className="flex flex-wrap my-2">
                        {article.tags.map((tag) => (
                          <p className="flex flex-wrap bg-orange text-white px-2 mx-1 rounded-2xl">
                            {tag}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
    'tags'
  ])

  return {
    props: { allPosts },
  }
}

export default Blog;
