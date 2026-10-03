import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 font-mono sm:px-6">
      <p className="text-sm text-muted">
        <span className="text-accent">$</span> cd ./who-knows-where
      </p>
      <p className="mt-3 text-lg text-muted">
        cd: ./who-knows-where: No such file or directory
      </p>
      <p className="mt-6 text-5xl font-bold tracking-tight text-foreground">404</p>
      <p className="mt-3 text-sm text-muted">This page doesn&apos;t exist (yet?).</p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-accent-strong"
      >
        $ cd ~
      </Link>
    </div>
  );
}
