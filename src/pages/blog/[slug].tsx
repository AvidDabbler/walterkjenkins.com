import React from "react";
import { Header } from "~/components";
import { Footer } from "~/components/Footer";
import { useRouter } from "next/router";
import { getAllPosts, getPostBySlug } from "~/utils/blog";
import { Post } from "~/types";
import { remark } from 'remark'
import html from 'remark-html'
import markdownStyles from '~/styles/markdown-styles.module.css'
import Head from "next/head";
import { Favicon } from "~/components/Favicon";

const PostBody = ({ content }: {
  content: string
}) => {
  return (
    <div
      className={markdownStyles['markdown']}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
export async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown)
  return result.toString()
}

type Props = {
  post: Post
}


function BlogPost({ post }: Props) {

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content="Created by Walter" />
        <Favicon />
      </Head>
      <div>
        <div className="mt-auto h-full">
          <Header />
          <div className="bg-orange h-px"></div>
          <div className="bg-blue topo mp-14 flex h-full min-h-screen w-full flex-col items-center pt-14 text-white">
            <div className="max-w-[800px] mx-auto my-14 w-full p-14 md:w-2/3">
              <h1 className="text-4xl bold">
                {post.title}
              </h1>
              <article className="mb-32">
                <PostBody content={post.content} />
              </article>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
type Params = {
  params: {
    slug: string
  }
}

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
  ])
  const content = await markdownToHtml(post.content || '')

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug'])

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}

export default BlogPost;
