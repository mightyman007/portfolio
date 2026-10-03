/**
 * Central site config — the single place to update your identity, links, and skills.
 */
export const site = {
  name: "John Pham",
  role: "Full-Stack Developer",
  location: "Bay Area, CA",
  email: "phamjohn123@gmail.com",
  tagline: "Building for the web, one commit at a time.",
  description:
    "Portfolio of John Pham — full-stack developer in the Bay Area. Projects, writing, and a contact form, built with Next.js and deployed free on Vercel.",
  // Canonical URL — update after first deploy if Vercel assigns a different subdomain.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mightyman007.vercel.app",
  links: {
    github: "https://github.com/mightyman007",
    linkedin: "https://www.linkedin.com/in/john-p-2b029b55/",
    twitter: "https://x.com/John_P_Coding",
  },
} as const;

/** Skills shown in the "Toolbox" section — edit freely. */
export const skills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Tailwind CSS",
  "HTML",
  "CSS",
  "Git",
  "MongoDB",
] as const;
