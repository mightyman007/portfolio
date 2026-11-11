/**
 * Curated projects — YOU decide what appears on the site.
 *
 * To add a project, copy an entry and fill it in. Nothing shows up
 * unless it's listed here (manual curation, per your choice).
 *
 * Fields:
 *  - repo:     "owner/name" on GitHub. If the repo is public, stars/language/
 *              last-push are fetched live at build time and merged into the card.
 *  - featured: true → also shows in the home page featured section.
 *  - demoUrl:  optional live demo / deployed link.
 *  - note:     optional short footnote (e.g. "learning project").
 */

// Owner: Netlify assigns the site URL on first deploy. If the auto-generated
// URL differs from this one after connecting the repo, update it here.
const COURSE_URL = "https://subagents-course.netlify.app";

export type Project = {
  title: string;
  slug: string;
  repo: string;
  description: string;
  tech: string[];
  year: string;
  featured?: boolean;
  demoUrl?: string;
  note?: string;
};

export const projects: Project[] = [
  {
    title: "portfolio",
    slug: "portfolio",
    repo: "mightyman007/portfolio",
    description:
      "This website — a full-stack Next.js app with statically generated pages, an MDX blog, and a rate-limited contact API, architected to run entirely on free tiers.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "MDX", "Upstash", "Resend"],
    year: "2026",
    featured: true,
    demoUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mightyman007.vercel.app",
    note: "the site you're looking at",
  },
  {
    title: "Subagents Mastery",
    slug: "subagents-mastery",
    repo: "mightyman007/subagents-course",
    description:
      "Interactive course I built on using AI subagents for programming — quizzes, exam, flashcards, agent templates.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "MDX", "Vitest"],
    year: "2026",
    demoUrl: COURSE_URL,
  },
  {
    title: "codewars",
    slug: "codewars",
    repo: "mightyman007/codewars",
    description:
      "Kata solutions from Codewars — sharpening JavaScript fundamentals, one puzzle at a time.",
    tech: ["JavaScript"],
    year: "2022",
    featured: true,
    note: "practice",
  },
  {
    title: "myappsample",
    slug: "myappsample",
    repo: "mightyman007/myappsample",
    description: "A sample web app built while working through a tutorial.",
    tech: ["HTML"],
    year: "2022",
    note: "learning project",
  },
];
