import { site } from "@/lib/site";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/icons";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-muted sm:flex-row sm:px-6">
        <p className="font-mono">
          © {new Date().getFullYear()} {site.name} · built with Next.js · deployed free on Vercel
        </p>
        <div className="flex items-center gap-4">
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
            href={site.links.twitter}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
            className="transition-colors hover:text-foreground"
          >
            <XIcon className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
