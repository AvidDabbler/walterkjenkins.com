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
        <div className="bg-blue topo mp-14 flex min-h-screen w-full flex-col items-center pt-14 text-white">
          <h1 className="max-w-[1000px] text-5xl font-extrabold mt-14 pb-10 text-center">
            {meta.title}
          </h1>
          <div className="max-w-[900px] mx-auto mb-14 w-full p-14 md:w-2/3 gap-10">
            <Image src={meta.ogImage} alt={meta.title} width={0}
              loading="lazy"
              height={0}
              style={{ width: "100%", height: 'auto' }} />
            <article className="mb-32">
              <div className="blog-post">
                <MDXRemote {...source} />
              </div>
            </article>
          </div>
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
