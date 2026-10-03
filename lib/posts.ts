import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO string
  tags: string[];
};

export type Post = {
  meta: PostMeta;
  content: string; // raw MDX body
};

function parsePostFile(fileName: string): Post | null {
  const slug = fileName.replace(/\.(mdx|md)$/, "");
  if (!/^[a-z0-9-]+$/.test(slug)) return null;

  const raw = fs.readFileSync(path.join(POSTS_DIR, fileName), "utf8");
  const { data, content } = matter(raw);

  if (!data.title || !data.date) return null;

  if (data.draft) return null; // frontmatter `draft: true` hides a post

  const meta: PostMeta = {
    slug,
    title: String(data.title),
    description: String(data.description ?? ""),
    date: new Date(data.date).toISOString(),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
  };
  return { meta, content };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map(parsePostFile)
    .filter((p): p is Post => p !== null)
    .sort((a, b) => b.meta.date.localeCompare(a.meta.date));
}

export function getAllPostSlugs(): string[] {
  return getAllPosts().map((p) => p.meta.slug);
}

/** Safe lookup — never reads arbitrary paths, only known post slugs. */
export function getPostBySlug(slug: string): Post | null {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  const fileName = fs
    .readdirSync(POSTS_DIR)
    .find((f) => f.replace(/\.(mdx|md)$/, "") === slug);
  if (!fileName) return null;
  return parsePostFile(fileName);
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export function formatDate(iso: string): string {
  return dateFormatter.format(new Date(iso));
}
