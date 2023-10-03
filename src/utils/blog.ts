import { join } from "path";
import matter from "gray-matter";
import { z } from "zod";
import fs from "fs";
import path from "path";
import { Feed } from "feed";

export async function generateRssFeed() {
  const allPosts = getAllPosts();

  const site_url = "https://www.walterkjenkins.com/blog/";

  const feedOptions = {
    title: "Blog posts | RSS Feed",
    description: "Welcome to this blog posts!",
    id: site_url,
    link: site_url,
    image: `${site_url}/logo.png`,
    favicon: `${site_url}/favicon.png`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Ibas`,
    generator: "Feed for Node.js",
    feedLinks: {
      rss2: `${site_url}/rss.xml`,
      // other feed formats
      json: `${site_url}/rss.json`,
      atom: `${site_url}/atom.xml`,
    },
  };

  const feed = new Feed(feedOptions);

  allPosts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `${site_url}/blog/${post.slug}`,
      link: `${site_url}/blog/${post.slug}`,
      description: post.excerpt,
      date: new Date(post.date),
    });
  });

  fs.writeFileSync("./public/rss.xml", feed.rss2());

  // write other feed formats to public folder
  fs.writeFileSync("./public/rss.json", feed.json1());
  fs.writeFileSync("./public/atom.xml", feed.atom1());
}

export const POSTS_PATH = path.join(process.cwd(), "_posts");

// postFilePaths is the list of all mdx files inside the POSTS_PATH directory
export const postFilePaths = fs
  .readdirSync(POSTS_PATH)
  // Only include md(x) files
  .filter((path) => /\.mdx?$/.test(path));

export const zBlogMeta = z.object({
  title: z.string(),
  slug: z.string(),
  date: z.string(),
  author: z.object({ name: z.string(), picture: z.string() }),
  coverImage: z.string(),
  excerpt: z.string(),
  tags: z.array(z.string()),
  ogImage: z.string(),
});

export type BlogMetaType = z.infer<typeof zBlogMeta>;

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory).filter((val) => val.endsWith(".mdx"));
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.mdx`);
  const source = fs.readFileSync(fullPath);

  const { data } = matter(source);

  return zBlogMeta.parse({ ...data, slug: realSlug });
}

export function getAllPosts() {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date! > post2.date! ? -1 : 1));
  return posts;
}
