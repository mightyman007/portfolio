/**
 * Sticker shop catalog — YOU decide what appears in the shop.
 *
 * To add a design:
 *  1. Drop the artwork into `public/shop/` — landscape, CR80 ratio
 *     (credit card: 85.6 × 54 mm, i.e. 1.586:1, rounded corners).
 *  2. Create a Stripe Payment Link (dashboard → Payment links → + New):
 *       - set the price, enable "adjust quantity" (max ~5 per order)
 *       - enable "collect shipping address" — it's a physical product
 *       - add a flat shipping rate (e.g. $1 — a stamp fits one sticker)
 *       - set the after-payment redirect to:
 *         https://mightyman007.vercel.app/shop/thanks?session_id={CHECKOUT_SESSION_ID}
 *  3. Paste the link into `paymentLinkUrl` below.
 *
 * `paymentLinkUrl: null` renders the design as SOLD OUT — use it when a
 * print run runs dry (and deactivate the link in Stripe too).
 * Until a link is connected, the card shows as sold out. No env vars needed:
 * checkout is fully hosted by Stripe, so no secrets live in this repo.
 */
export type Product = {
  name: string;
  slug: string;
  /** Set number printed on the card, e.g. "007" → "No. 007". */
  number: string;
  /** Energy flavor — drives the colored chip on the shop card. */
  element: "fire" | "volt" | "tide";
  description: string;
  priceUsd: number;
  /** Path under `public/` — landscape CR80 (1.586:1) artwork. */
  image: string;
  /** Stripe Payment Link URL, or null when sold out / not connected yet. */
  paymentLinkUrl: string | null;
};

export const SHIPPING_NOTE = "+ $1 US shipping (stamp + envelope)";

export const products: Product[] = [
  {
    name: "Emberwing",
    slug: "emberwing",
    number: "007",
    element: "fire",
    description:
      "Small drake, oversized opinions. Perches on debit cards and judges your spending.",
    priceUsd: 5,
    image: "/shop/emberwing.svg",
    paymentLinkUrl: null,
  },
  {
    name: "Voltkit",
    slug: "voltkit",
    number: "013",
    element: "volt",
    description:
      "Static in fox form. Do not pet. Do respect the zoomies.",
    priceUsd: 5,
    image: "/shop/voltkit.svg",
    paymentLinkUrl: null,
  },
  {
    name: "Tidewarden",
    slug: "tidewarden",
    number: "042",
    element: "tide",
    description:
      "Ninety HP of patient turtle. Has blocked ten thousand attacks and one dying battery.",
    priceUsd: 6,
    image: "/shop/tidewarden.svg",
    paymentLinkUrl: null,
  },
];
