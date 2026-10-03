import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatDate, getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing by John Pham — building in public, notes from 100 Devs, and web dev.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        <span className="font-mono text-accent">$</span> cat ./blog/*.mdx
      </h1>
      <p className="mt-3 text-sm text-muted">
        Notes from building in public — projects, lessons, and the occasional detour.
      </p>

      <div className="mt-10 space-y-4">
        {posts.map((post) => (
          <Link
            key={post.meta.slug}
            href={`/blog/${post.meta.slug}`}
            className="group block rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent/40"
          >
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-mono font-semibold text-foreground transition-colors group-hover:text-accent">
                {post.meta.title}
              </h2>
              <ArrowUpRight className="size-4 shrink-0 text-muted transition-colors group-hover:text-accent" />
            </div>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">
              {post.meta.description}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2 font-mono text-[11px] text-muted">
              <time dateTime={post.meta.date}>{formatDate(post.meta.date)}</time>
              {post.meta.tags.map((tag) => (
                <span key={tag} className="rounded border border-border px-1.5 py-0.5">
                  #{tag}
                </span>
              ))}
            </div>
          </Link>
        ))}

        {posts.length === 0 && (
          <p className="font-mono text-sm text-muted">
            no posts yet — add .mdx files to content/blog/
          </p>
        )}
      </div>
    </div>
  );
}
