import Link from "next/link";
import { Mail } from "lucide-react";
import { site } from "@/lib/site";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/icons";

const nav = [
  { href: "/", label: "home" },
  { href: "/projects", label: "projects" },
  { href: "/blog", label: "blog" },
  { href: "/about", label: "about" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="font-mono text-sm text-muted transition-colors hover:text-accent"
        >
          <span className="text-accent">~</span>/{site.name.toLowerCase().replace(/\s+/g, "-")}
        </Link>

        <nav className="flex items-center gap-4 overflow-x-auto font-mono text-sm sm:gap-6">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-muted transition-colors hover:text-foreground"
            >
              <span className="text-accent/70">./</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 text-muted sm:flex">
          <a
            href={site.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="transition-colors hover:text-foreground"
          >
            <GithubIcon className="size-4" />
          </a>
          <a
            href={site.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="transition-colors hover:text-foreground"
          >
            <LinkedinIcon className="size-4" />
          </a>
          <a
            href={`mailto:${site.email}`}
            aria-label="Email"
            className="transition-colors hover:text-foreground"
          >
            <Mail className="size-4" />
          </a>
        </div>
      </div>
    </header>
  );
}
