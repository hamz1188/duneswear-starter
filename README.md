# Duneswear Starter (Next.js Storefront + Embedded Admin)

This monorepo gives you a **Next.js storefront (PWA)** and a minimal **Embedded Shopify Admin app**.

## Apps
- `apps/storefront` → Customer site (Next.js App Router, Storefront GraphQL API, PWA)
- `apps/admin` → Embedded Admin app (Next.js Pages Router, Polaris, App Bridge)

## Quick Start (Local)
1) Install PNPM: `npm i -g pnpm`
2) Copy `.env.example` to `.env` and fill tokens.
3) Install deps: `pnpm i`
4) Run storefront: `pnpm dev:storefront` → http://localhost:3000
5) Run admin app: `pnpm dev:admin` → http://localhost:3001

## Deploy Targets
- Storefront → Vercel at **beta.duneswear.com** (keep `duneswear.com` on Shopify)
- Admin App → Vercel at **admin.duneswear.com** (embedded inside Shopify Admin)

## DNS (Vercel)
Create CNAME records at your domain host:
- `admin` CNAME → `cname.vercel-dns.com.`
- `beta`  CNAME → `cname.vercel-dns.com.`

(Leave `www` and root `duneswear.com` pointing to Shopify for now.)

## Shopify App Setup (Admin app)
1) Create a **Custom app** in Shopify (Partners or store admin).
2) App URL: `https://admin.duneswear.com/api/auth/callback`
3) Redirect URLs (add both):
   - `https://admin.duneswear.com/api/auth/callback`
   - `https://admin.duneswear.com/api/auth`
4) Scopes (minimum):
   `read_products,write_products,read_metaobjects,write_metaobjects,read_product_listings,read_customers,read_orders`
5) Fill `.env` with `SHOPIFY_APP_API_KEY`, `SHOPIFY_APP_API_SECRET`, `SHOPIFY_ADMIN_API_ACCESS_TOKEN`.

## GraphQL Helpers
- `scripts/create-drop-definition.graphql`
- `scripts/set-product-metafields.graphql`

## Notes
- Storefront PWA includes install prompt + offline shell.
- Drop data lives in Shopify **Metaobjects** (`drop`) and product metafields.
- You can later switch from beta subdomain to root after QA.
