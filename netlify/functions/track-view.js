// Live view counter, per article. Runs only on Netlify (once the site is deployed there) —
// it uses Netlify Blobs, Netlify's built-in key/value storage, so no extra service/account is
// needed beyond Netlify itself. Counts only the views since this counter went live; the site
// adds the historical Wix number (src/data/legacy-stats.json) on top when displaying the total.
import { getStore } from '@netlify/blobs';

export default async (req) => {
  const url = new URL(req.url);
  const slug = url.searchParams.get('slug');
  if (!slug) {
    return new Response(JSON.stringify({ error: 'missing slug' }), { status: 400 });
  }

  const store = getStore('article-views');
  const current = (await store.get(slug, { type: 'json' })) ?? 0;
  const next = current + 1;
  await store.setJSON(slug, next);

  return new Response(JSON.stringify({ slug, newSiteViews: next }), {
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  });
};

export const config = { path: '/api/track-view' };
