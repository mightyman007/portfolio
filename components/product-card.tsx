import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/lib/products";
import { SHIPPING_NOTE } from "@/lib/products";

const ELEMENT_COLORS: Record<Product["element"], string> = {
  fire: "#f97316",
  volt: "#facc15",
  tide: "#2dd4bf",
};

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group flex flex-col rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent/40">
      {/* card art — landscape CR80, matches the physical sticker ratio */}
      <div className="relative mb-4 overflow-hidden rounded-lg border border-border bg-surface-2">
        <Image
          src={product.image}
          alt={`${product.name} — trading-card-style credit card sticker`}
          width={856}
          height={540}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="h-auto w-full transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>

      <div className="mb-2 flex items-start justify-between gap-3">
        <h3 className="font-mono text-base font-semibold text-foreground">
          <span className="text-accent">$</span> {product.name}
        </h3>
        <span className="font-mono text-xs text-muted">No. {product.number}</span>
      </div>

      <div className="mb-3 flex items-center gap-1.5 font-mono text-xs text-muted">
        <span
          className="size-2.5 rounded-full"
          style={{ backgroundColor: ELEMENT_COLORS[product.element] }}
        />
        {product.element}
      </div>

      <p className="mb-4 flex-1 text-sm leading-relaxed text-muted">
        {product.description}
      </p>

      <div className="flex items-center justify-between border-t border-border pt-3">
        <span>
          <span className="font-mono text-sm font-semibold text-foreground">
            ${product.priceUsd}
          </span>{" "}
          <span className="text-xs text-muted">{SHIPPING_NOTE}</span>
        </span>

        {product.paymentLinkUrl ? (
          <a
            href={product.paymentLinkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 rounded-md bg-accent px-3.5 py-1.5 font-mono text-xs font-bold text-background transition-colors hover:bg-accent-strong"
          >
            buy <ArrowUpRight className="size-3.5" />
          </a>
        ) : (
          <span className="rounded-md border border-border bg-surface-2 px-3.5 py-1.5 font-mono text-xs text-muted">
            sold out
          </span>
        )}
      </div>
    </div>
  );
}
