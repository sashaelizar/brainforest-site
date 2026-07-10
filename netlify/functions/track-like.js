// Live like counter, per article. Same pattern as track-view.js (Netlify Blobs, no extra
// service). Only runs once deployed to Netlify — locally the button still fills in via
// localStorage, it just won't persist the count across visitors until deployed.
import { getStore } from '@netlify/blobs';

export default async (req) => {
  const url = new URL(req.url);
  const slug = url.searchParams.get('slug');
  if (!slug) {
    return new Response(JSON.stringify({ error: 'missing slug' }), { status: 400 });
  }

  const store = getStore('article-likes');
  const current = (await store.get(slug, { type: 'json' })) ?? 0;
  const next = current + 1;
  await store.setJSON(slug, next);

  return new Response(JSON.stringify({ slug, newSiteLikes: next }), {
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  });
};

export const config = { path: '/api/track-like' };
