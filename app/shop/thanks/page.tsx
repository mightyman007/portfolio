import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Order confirmed",
  description: "Your sticker order went through.",
  robots: { index: false },
};

export default function ThanksPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        <span className="font-mono text-accent">$</span> order confirmed
      </h1>

      <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
        Payment went through — Stripe just emailed you a receipt. Your sticker
        ships from the Bay Area in a stamped envelope within{" "}
        <span className="text-foreground">2–3 days</span>.
      </p>

      <p className="mt-3 max-w-xl font-mono text-xs text-muted">
        never trained a creature before? same. questions?{" "}
        <a
          href={`mailto:${site.email}`}
          className="text-accent transition-colors hover:text-accent-strong"
        >
          {site.email}
        </a>
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/shop"
          className="rounded-md bg-accent px-4 py-2 font-mono text-xs font-bold text-background transition-colors hover:bg-accent-strong"
        >
          back to the shop
        </Link>
        <Link
          href="/"
          className="rounded-md border border-border bg-surface px-4 py-2 font-mono text-xs text-muted transition-colors hover:border-accent/40 hover:text-foreground"
        >
          <Mail className="mr-1 inline size-3.5" />
          home
        </Link>
      </div>
    </div>
  );
}
