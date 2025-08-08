import 'server-only';
import fetch from 'cross-fetch';

const STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN!;
const STOREFRONT_API_TOKEN = process.env.SHOPIFY_STOREFRONT_API_TOKEN!;
const API_VERSION = process.env.SHOPIFY_API_VERSION || '2024-10';

async function shopifyFetch(query: string, variables: Record<string, any> = {}) {
  const res = await fetch(`https://${STORE_DOMAIN}/api/${API_VERSION}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_API_TOKEN
    },
    body: JSON.stringify({ query, variables })
  });
  if (!res.ok) {
    throw new Error(`Shopify error ${res.status}`);
  }
  const data = await res.json();
  return data.data;
}

export async function fetchDropBySlug(slug: string) {
  // Example: read metaobject by handle (type: drop, handle: slug)
  const query = `#graphql
    query DropByHandle($handle: String!) {
      metaobjectByHandle(handle: {type: "drop", handle: $handle}) {
        id
        fields { key value }
      }
    }
  `;
  const data = await shopifyFetch(query, { handle: slug });
  const mo = data?.metaobjectByHandle;
  if (!mo) return null;
  const map: Record<string, string> = {};
  for (const f of mo.fields) map[f.key] = f.value;
  // You would fetch products by metafield referencing this metaobject in production.
  return {
    id: mo.id,
    title: map.title || slug,
    story: map.story || '',
    products: []
  };
}
