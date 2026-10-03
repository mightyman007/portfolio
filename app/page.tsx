import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { TerminalHero } from "@/components/terminal-hero";
import { ProjectCard } from "@/components/project-card";
import { fetchRepoMeta } from "@/lib/github";
import { projects } from "@/lib/projects";
import { site, skills } from "@/lib/site";
import { LinkedinIcon } from "@/components/icons";

export const revalidate = 86_400; // refresh GitHub metadata at most daily

export default async function HomePage() {
  const featured = projects.filter((p) => p.featured);
  const meta = await fetchRepoMeta(featured.map((p) => p.repo));

  return (
    <div>
      {/* hero */}
      <section className="relative overflow-hidden border-b border-border">
        {/* forest photo, served responsive-optimized; original untouched */}
        <Image
          src="/images/hero-bg.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[38%_center]"
        />
        {/* dark gradient keeps text readable over the bright sky */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background"
        />
        <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="mb-4 font-mono text-sm text-muted">
            <span className="text-accent">~/</span> {site.name} · {site.role}
          </p>
          <h1 className="mb-8 text-4xl font-bold tracking-tight sm:text-6xl">
            Hi, I&apos;m John.
            <br />
            <span className="text-muted">I build things for the web.</span>
          </h1>
          <TerminalHero />
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 font-mono text-sm font-semibold text-background transition-colors hover:bg-accent-strong"
            >
              view projects <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-2.5 font-mono text-sm transition-colors hover:border-accent/50"
            >
              read the blog
            </Link>
            <span className="ml-auto hidden items-center gap-1.5 font-mono text-xs text-muted sm:flex">
              <MapPin className="size-3.5" /> {site.location}
            </span>
          </div>
        </div>
      </section>

      {/* featured projects */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Featured projects</h2>
            <p className="mt-1 text-sm text-muted">Hand-picked — see all of them on the projects page.</p>
          </div>
          <Link
            href="/projects"
            className="hidden items-center gap-1 font-mono text-sm text-accent transition-colors hover:text-accent-strong sm:inline-flex"
          >
            all projects <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} meta={meta[p.repo]} />
          ))}
        </div>
      </section>

      {/* toolbox */}
      <section className="border-y border-border bg-surface/50">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <h2 className="mb-2 text-2xl font-bold tracking-tight">Toolbox</h2>
          <p className="mb-6 text-sm text-muted">Things I reach for when building.</p>
          <div className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <span
                key={s}
                className="rounded-lg border border-border bg-surface px-3.5 py-1.5 font-mono text-sm text-foreground/90 transition-colors hover:border-accent/50 hover:text-accent"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* contact CTA */}
      <section className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Let&apos;s build something.
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted">
          Looking for opportunities and always up for a good project or conversation.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/about#contact"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 font-mono text-sm font-semibold text-background transition-colors hover:bg-accent-strong"
          >
            <Mail className="size-4" /> get in touch
          </Link>
          <a
            href={site.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-2.5 font-mono text-sm transition-colors hover:border-accent/50"
          >
            <LinkedinIcon className="size-4" /> connect on LinkedIn
          </a>
        </div>
      </section>
    </div>
  );
}
