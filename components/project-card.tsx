import { ArrowUpRight, Star } from "lucide-react";
import type { Project } from "@/lib/projects";
import type { RepoMeta } from "@/lib/github";
import { GithubIcon } from "@/components/icons";

const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  HTML: "#e34c26",
  CSS: "#663399",
  Python: "#3572a5",
  Go: "#00add8",
  Rust: "#dea584",
  Shell: "#89e051",
};

export function ProjectCard({
  project,
  meta,
}: {
  project: Project;
  meta?: RepoMeta | null;
}) {
  const language = meta?.language ?? null;
  const stars = meta?.stars ?? 0;
  const repoUrl = meta?.url ?? `https://github.com/${project.repo}`;

  return (
    <div className="group flex flex-col rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent/40">
      <div className="mb-2 flex items-start justify-between gap-3">
        <h3 className="font-mono text-base font-semibold text-foreground">
          <span className="text-accent">$</span> {project.title}
        </h3>
        <div className="flex items-center gap-1 font-mono text-xs text-muted">
          <Star className="size-3.5" />
          {stars}
        </div>
      </div>

      <p className="mb-4 flex-1 text-sm leading-relaxed text-muted">
        {project.description}
      </p>

      <div className="mb-4 flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <span
            key={t}
            className="rounded-md border border-border bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-muted"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-border pt-3 text-xs text-muted">
        <span className="flex items-center gap-3">
          {language && (
            <span className="flex items-center gap-1.5">
              <span
                className="size-2.5 rounded-full"
                style={{ backgroundColor: LANGUAGE_COLORS[language] ?? "#8b8b8b" }}
              />
              {language}
            </span>
          )}
          <span className="font-mono">{project.year}</span>
          {project.note && <span className="italic opacity-70">· {project.note}</span>}
        </span>

        <span className="flex items-center gap-3">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 transition-colors hover:text-accent"
            >
              live <ArrowUpRight className="size-3.5" />
            </a>
          )}
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} on GitHub`}
            className="transition-colors hover:text-accent"
          >
            <GithubIcon className="size-4" />
          </a>
        </span>
      </div>
    </div>
  );
}
