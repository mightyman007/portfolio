import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { site, skills } from "@/lib/site";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name} — ${site.role} in the ${site.location}. Background, skills, and how to reach me.`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        <span className="font-mono text-accent">$</span> whois john-pham
      </h1>

      <div className="prose prose-invert mt-8 max-w-none">
        <p>
          I&apos;m John — a full-stack developer based in the{" "}
          <span className="inline-flex items-center gap-1">
            <MapPin className="size-4 text-accent" /> {site.location}
          </span>
          , training through the{" "}
          <a href="https://100devs.org" target="_blank" rel="noopener noreferrer">
            100 Devs
          </a>{" "}
          program: a free, community-driven software engineering bootcamp with a
          simple philosophy — build real things, push real code, repeat.
        </p>
        <p>
          I got my start with HTML and JavaScript, spent plenty of hours grinding
          katas on Codewars, and these days I&apos;m focused on the modern React
          ecosystem — Next.js, TypeScript, and shipping complete products rather
          than isolated widgets. This site is a good example: statically generated
          pages, an MDX blog, and a rate-limited contact API, designed to run
          entirely on free hosting tiers.
        </p>
        <p>
          When I&apos;m not coding, I&apos;m probably watching anime, curating a
          Plex library, or getting the better end of a Steam sale.
        </p>

        <h2>Toolbox</h2>
        <div className="not-prose flex flex-wrap gap-2">
          {skills.map((s) => (
            <span
              key={s}
              className="rounded-lg border border-border bg-surface px-3 py-1 font-mono text-xs text-foreground/90"
            >
              {s}
            </span>
          ))}
        </div>

        <h2>Elsewhere</h2>
        <ul className="not-prose space-y-2 font-mono text-sm">
          <li>
            <span className="mr-2 text-muted">github/</span>
            <a href={site.links.github} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
              {site.links.github.replace("https://", "")}
            </a>
          </li>
          <li>
            <span className="mr-2 text-muted">linkedin/</span>
            <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
              john-p-2b029b55
            </a>
          </li>
          <li>
            <span className="mr-2 text-muted">x/</span>
            <a href={site.links.twitter} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
              @John_P_Coding
            </a>
          </li>
        </ul>
      </div>

      {/* contact */}
      <section id="contact" className="mt-16 scroll-mt-20 border-t border-border pt-10">
        <h2 className="text-2xl font-bold tracking-tight">
          <span className="font-mono text-accent">$</span> ping john
        </h2>
        <p className="mt-2 mb-8 text-sm text-muted">
          Drop a message — it lands straight in my inbox (
          <a href={`mailto:${site.email}`} className="text-accent hover:underline">
            {site.email}
          </a>
          ), or reach me on any of the{" "}
          <span className="inline-flex items-center gap-2 align-middle">
            <a href={site.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted hover:text-accent">
              <GithubIcon className="size-4" />
            </a>
            <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted hover:text-accent">
              <LinkedinIcon className="size-4" />
            </a>
            <a href={site.links.twitter} target="_blank" rel="noopener noreferrer" aria-label="X" className="text-muted hover:text-accent">
              <XIcon className="size-4" />
            </a>
          </span>{" "}
          profiles above.
        </p>
        <ContactForm />
      </section>
    </div>
  );
}
