import { Favicon } from "~/components/Favicon";
import fs from 'fs'
import matter from 'gray-matter'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import Head from 'next/head'
import path from 'path'
import { Footer } from "~/components/Footer";
import { Header } from "~/components";
import Image from 'next/image'
import { POSTS_PATH, postFilePaths, zBlogMeta, BlogMetaType } from "~/utils/blog";
import { Button } from "~/components/designer/Button";

type Props = {
  meta: BlogMetaType,
  source: MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>>
}

function BlogPost({ meta, source }: Props) {
  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.excerpt} />
        <meta
          property="og:image"
          content={meta.ogImage}
        />
        <meta
          property="twitter:image"
          content={meta.ogImage}
        />
        <Favicon />
      </Head>
      <div className="mt-auto h-full w-full">
        <Header />
        <div className="bg-orange h-px"></div>
        <div className="bg-blue topo mp-14 flex min-h-screen w-full flex-col items-center pt-32 pb-12 text-white gap-6">
          <div className="max-w-[1000px] bg-blue-400/20">
            <div className="max-w-[1000px] text-center pt-14 grid gap-3">
              <h1 className=" text-5xl font-extrabold px-12 capitalize">
                {meta.title}
              </h1>
              <div className="max-w-[800px] mx-auto gap-3 grid">
                <p className="text-xl">{meta.date}</p>
                <div className="flex flex-wrap mx-auto">
                  {meta.tags.map((tag) => (
                    <p className="flex flex-wrap bg-orange-400 capitalize text-white px-2 mx-1 rounded-2xl">
                      {tag}
                    </p>
                  ))}
                </div>
                <p className="text-xl max-w-[800px] text-center">{meta.excerpt}</p>
              </div>
            </div>
            <div className="max-w-[900px] mx-auto w-full md:w-2/3 gap-10">
              <article className="mb-32">
                <div className="blog-post">
                  <MDXRemote {...source} />
                </div>
              </article>
            </div>
          </div>
          <h2 className="text-3xl font-bold pt-12">Like what you read?</h2>
          <a href="https://sendfox.com/walter.k.jenkins" className="bg-orange-400 hover:bg-orange-500 rounded-md px-3 py-2 font-bold text-2xl">Sign-up for Updates</a>
        </div>
        <Footer />
      </div>
    </>
  );
}

type Params = {
  params: {
    slug: string
  }
}

export const getStaticProps = async ({ params }: Params) => {
  const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`)
  const source = fs.readFileSync(postFilePath)

  const { content, data } = matter(source)

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  })

  return {
    props: {
      source: mdxSource,
      meta: zBlogMeta.parse({ ...data, slug: params.slug }),
    },
  }
}

export const getStaticPaths = async () => {
  const paths = postFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }))

  return {
    paths,
    fallback: false,
  }
}

export default BlogPost;
