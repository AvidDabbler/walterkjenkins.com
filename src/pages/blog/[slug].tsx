import { Favicon } from "~/components/Favicon";
import fs from "fs";
import matter from "gray-matter";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Head from "next/head";
import path from "path";
import { Footer } from "~/components/Footer";
import { Header } from "~/components";
import Image from "next/image";
import {
  POSTS_PATH,
  postFilePaths,
  zBlogMeta,
  BlogMetaType,
} from "~/utils/blog";

type Props = {
  meta: BlogMetaType;
  source: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, unknown>
  >;
};

function BlogPost({ meta, source }: Props) {
  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.excerpt} />
        <meta property="og:image" content={meta.ogImage} />
        <meta property="twitter:image" content={meta.ogImage} />
        <Favicon />
      </Head>
      <div className="mt-auto h-full w-full">
        <Header />
        <div className="bg-orange h-px"></div>
        <div className="bg-blue topo flex min-h-screen w-full flex-col items-center gap-6 pb-12 pt-32 text-white">
          <div className="md:mx-full w-[90%] max-w-[1000px] bg-blue-400/20 px-8">
            <div className="flex w-full flex-col gap-3 break-words pt-14 text-center">
              <h1 className="px-12 text-3xl font-extrabold capitalize md:text-5xl">
                {meta.title}
              </h1>
              <div className="mx-auto grid max-w-[800px] gap-3">
                <p className="text-xl">{meta.date}</p>
                <div className="mx-auto flex flex-wrap">
                  {meta.tags.map((tag) => (
                    <p className="mx-1 flex flex-wrap rounded-2xl bg-orange-400 px-2 capitalize text-white">
                      {tag}
                    </p>
                  ))}
                </div>
                <p className="max-w-[800px] text-center text-xl">
                  {meta.excerpt}
                </p>
              </div>
            </div>
            <div className="mx-auto w-full max-w-[900px] gap-10 md:w-2/3">
              <article className="mb-32">
                <div className="blog-post">
                  <MDXRemote {...source} />
                </div>
              </article>
            </div>
          </div>
          <h2 className="pt-12 text-3xl font-bold">Like what you read?</h2>
          <a
            href="https://sendfox.com/walter.k.jenkins"
            className="rounded-md bg-orange-400 px-3 py-2 text-2xl font-bold hover:bg-orange-500"
          >
            Sign-up for Updates
          </a>
        </div>
        <Footer />
      </div>
    </>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export const getStaticProps = async ({ params }: Params) => {
  const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`);
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  });

  return {
    props: {
      source: mdxSource,
      meta: zBlogMeta.parse({ ...data, slug: params.slug }),
    },
  };
};

export const getStaticPaths = async () => {
  const paths = postFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ""))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

export default BlogPost;
