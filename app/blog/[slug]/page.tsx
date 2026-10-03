import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { ArrowLeft } from "lucide-react";
import { formatDate, getAllPostSlugs, getPostBySlug } from "@/lib/posts";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.meta.title,
    description: post.meta.description,
  };
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { content } = await compileMDX({
    source: post.content,
    options: {
      mdxOptions: {
        rehypePlugins: [
          [rehypePrettyCode, { theme: "github-dark-default" }],
        ],
      },
    },
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center gap-1.5 font-mono text-sm text-muted transition-colors hover:text-accent"
      >
        <ArrowLeft className="size-4" /> cd ../blog
      </Link>

      <article className="prose prose-invert max-w-none prose-headings:font-mono prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-code:font-mono prose-pre:border prose-pre:border-border">
        <header className="mb-10 not-prose">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {post.meta.title}
          </h1>
          <p className="mt-2 text-sm text-muted">{post.meta.description}</p>
          <div className="mt-4 flex flex-wrap items-center gap-2 font-mono text-[11px] text-muted">
            <time dateTime={post.meta.date}>{formatDate(post.meta.date)}</time>
            {post.meta.tags.map((tag) => (
              <span key={tag} className="rounded border border-border px-1.5 py-0.5">
                #{tag}
              </span>
            ))}
          </div>
        </header>
        {content}
      </article>
    </div>
  );
}
