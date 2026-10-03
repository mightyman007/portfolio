/**
 * Fetches live metadata for the *curated* repos only (a handful of requests
 * per revalidation, not per visitor). Falls back gracefully to the values
 * in lib/projects.ts if GitHub is unreachable or rate-limits the build.
 */
export type RepoMeta = {
  stars: number;
  language: string | null;
  description: string | null;
  pushedAt: string | null;
  url: string;
  topics: string[];
};

const GITHUB_API = "https://api.github.com/repos";

export async function fetchRepoMeta(
  repos: string[],
): Promise<Record<string, RepoMeta | null>> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const results = await Promise.allSettled(
    repos.map(async (repo) => {
      const res = await fetch(`${GITHUB_API}/${repo}`, {
        headers,
        next: { revalidate: 86_400 }, // refresh metadata at most once a day
      });
      if (!res.ok) return null;
      const json = (await res.json()) as {
        stargazers_count?: number;
        language?: string | null;
        description?: string | null;
        pushed_at?: string | null;
        html_url?: string;
        topics?: string[];
      };
      const meta: RepoMeta = {
        stars: json.stargazers_count ?? 0,
        language: json.language ?? null,
        description: json.description ?? null,
        pushedAt: json.pushed_at ?? null,
        url: json.html_url ?? `https://github.com/${repo}`,
        topics: json.topics ?? [],
      };
      return meta;
    }),
  );

  const map: Record<string, RepoMeta | null> = {};
  repos.forEach((repo, i) => {
    const r = results[i];
    map[repo] = r.status === "fulfilled" ? r.value : null;
  });
  return map;
}
