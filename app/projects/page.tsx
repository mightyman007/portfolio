import type { Metadata } from "next";
import { ProjectCard } from "@/components/project-card";
import { fetchRepoMeta } from "@/lib/github";
import { projects } from "@/lib/projects";

export const revalidate = 86_400; // refresh GitHub metadata at most daily

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Curated projects by John Pham — live metadata (stars, language, activity) pulled from GitHub.",
};

export default async function ProjectsPage() {
  const meta = await fetchRepoMeta(projects.map((p) => p.repo));

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        <span className="font-mono text-accent">$</span> ls ./projects
      </h1>
      <p className="mt-3 max-w-xl text-sm text-muted">
        A curated list — every project here is one I chose to show. Stats (stars,
        language, latest push) are pulled live from the GitHub API.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} meta={meta[p.repo]} />
        ))}
      </div>

      {projects.length === 0 && (
        <p className="mt-10 font-mono text-sm text-muted">
          nothing here yet — add projects in lib/projects.ts
        </p>
      )}
    </div>
  );
}
