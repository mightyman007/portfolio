import type { Metadata } from "next";
import { ProductCard } from "@/components/product-card";
import { products, SHIPPING_NOTE } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Trading-card-style vinyl stickers cut to CR80 — the exact size of the card in your wallet. Original artwork, Stripe checkout, shipped with a stamp.",
};

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        <span className="font-mono text-accent">$</span> ls ./shop
      </h1>
      <p className="mt-3 max-w-xl text-sm text-muted">
        Original monster designs printed on matte vinyl, die-cut to CR80
        (85.6 × 54 mm) — the exact size of the card in your wallet. Slap one
        on the back and your debit card enters its villain era. Checkout runs
        through Stripe (cards, Apple Pay, Google Pay); a receipt lands in your
        email the moment you order.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>

      {products.length === 0 && (
        <p className="mt-10 font-mono text-sm text-muted">
          nothing here yet — add designs in lib/products.ts
        </p>
      )}

      <div className="mt-10 rounded-xl border border-border bg-surface p-5 font-mono text-xs leading-relaxed text-muted">
        <p>
          <span className="text-accent">»</span> fit — CR80 (85.6 × 54 mm),
          rounded corners, made for the <span className="text-foreground">back</span>{" "}
          of your card. Chip and tap-to-pay keep working.
        </p>
        <p className="mt-2">
          <span className="text-accent">»</span> shipping — {SHIPPING_NOTE}.
          International rates coming once someone orders from far away.
        </p>
        <p className="mt-2">
          <span className="text-accent">»</span> stock — small batches. Sold-out
          designs gray out here and come back with the next print run.
        </p>
      </div>
    </div>
  );
}
