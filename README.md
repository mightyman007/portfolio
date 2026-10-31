# John Pham — Portfolio

Personal portfolio built with **Next.js 16 (App Router) + TypeScript + Tailwind CSS 4**, designed to run entirely on **free hosting tiers** — and to be structurally incapable of generating a bill.

## Quick start

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

> This machine has `node` but no `npm` — `pnpm` is installed at `~/.local/bin/pnpm`.

## What's inside

| Route | What it is |
|---|---|
| `/` | Terminal-style hero, featured projects, toolbox |
| `/projects` | Curated project grid with live GitHub stats |
| `/blog`, `/blog/[slug]` | MDX blog with syntax highlighting |
| `/shop` | Sticker shop — CR80 trading-card stickers, checkout via Stripe Payment Links |
| `/shop/thanks` | Post-checkout confirmation page |
| `/about` | Bio, skills, links, contact form |
| `/api/contact` | Rate-limited contact endpoint → Resend email |

## Editing your content

- **Projects** — `lib/projects.ts`. Nothing appears unless you list it (manual curation). Public repos listed there get live stars/language/last-push at build time (refreshed daily via ISR).
- **Blog posts** — add `.mdx` files to `content/blog/` with frontmatter (`title`, `description`, `date`, `tags`, optional `draft: true`).
- **Identity/skills/links** — `lib/site.ts`.
- **Colors/theme** — `app/globals.css` (`:root` variables).

## Free-tier guardrails

| Service | Free limit | Protection in place |
|---|---|---|
| Vercel Hobby | 100 GB bandwidth, 1M function invocations / mo | Hobby **cannot charge you** — resources pause instead. Static-first architecture means only the contact form touches functions. |
| Resend | 3,000 emails / mo (100/day) | 5 submissions/hour per IP + honeypot field |
| Upstash Redis | 500K commands / mo | Rate-limit check = 2 commands per form submit |
| GitHub API | 60 req/hr unauthenticated | Build-time fetch, daily revalidation, ~3 requests per refresh |
| Stripe | No monthly fee — ~2.9% + 30¢ deducted per sale | Fees come out of sales only; there is no plan, tier, or bill. Stop selling → cost drops to $0 instantly. The shop is fully static (no API routes, no env vars, no secrets). |

Also enable usage alert emails: Vercel dashboard → Settings → Usage.

## The sticker shop

Sells CR80 (credit-card-sized, 85.6 × 54 mm) vinyl stickers with original monster artwork — original designs only, no borrowed characters. Fully static: no API routes, no env vars, no secrets. Products live in `lib/products.ts`; artwork in `public/shop/`.

**Add or change a design:**

1. Artwork → `public/shop/` (landscape, CR80 ratio, rounded corners).
2. Stripe dashboard → **Payment links** → **+ New**: set the price, enable **adjust quantity** (max ~5), enable **collect shipping address**, add a flat shipping rate (e.g. $1), and set the after-payment redirect to `https://mightyman007.vercel.app/shop/thanks?session_id={CHECKOUT_SESSION_ID}`.
3. Paste the link into `paymentLinkUrl` in `lib/products.ts`. Do this in **test mode** first and buy from yourself with card `4242 4242 4242 4242` to see the whole flow.
4. Go live: flip Stripe to live mode, create the same links, paste those URLs in, push to `main`.

**Fulfilling an order:** Stripe emails you on each sale; the buyer's shipping address is on the payment in the dashboard. Sticker → envelope → stamp → mailbox. When a design sells out, set `paymentLinkUrl: null` in `lib/products.ts` and deactivate the link in Stripe — the card grays out on the site.

> Note: Vercel Hobby's terms are technically non-commercial. A few stickers a month on a personal site is the kind of thing nobody blinks at, but if the shop ever gets serious, Vercel Pro is the upgrade.

## Deploying to Vercel (free)

1. Push this repo to GitHub (`mightyman007`).
2. [vercel.com](https://vercel.com) → **Add New Project** → import the repo (framework auto-detected).
3. Add environment variables (see `.env.example`): `RESEND_API_KEY`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, `NEXT_PUBLIC_SITE_URL`. (The shop adds none — checkout is hosted by Stripe.)
4. Deploy → `https://mightyman007.vercel.app`.

Every `git push` to `main` auto-deploys. Pull requests get preview URLs.

### Contact form in production

Resend's free tier sends from `onboarding@resend.dev` **to your own verified email** — perfect for a personal contact form (submissions land at `phamjohn123@gmail.com`). If you later add a custom domain, you can verify it in Resend to send from `hello@yourdomain.com`.
