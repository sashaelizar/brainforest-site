// Central config recreated from the live brainforest.org / Infinite Emergence site.
export const SITE = {
  name: 'Infinite Emergence',
  tagline: 'Root cause bioenergetic medicine',
  author: 'Sasha Elizar, M.S.',
  domain: 'brainforest.org',
};

export const NAV = [
  { label: 'Home', href: '/' },
  { label: 'Articles', href: '/posts' },
  { label: 'Podcast', href: '/podcast' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const SOCIAL = [
  { label: 'Instagram', href: 'https://www.instagram.com/brainnutritioncoach/' },
  { label: 'YouTube', href: 'https://www.youtube.com/@InfiniteEmergence' },
  { label: 'Facebook', href: 'https://www.facebook.com/infiniteemergence/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/infinite-emergence/' },
];

export const PODCAST = {
  name: 'Mind the Roots: Infinite Emergence',
  spotify: 'https://open.spotify.com/show/12b7ArWyc76Uzpjc5UmKzV',
  apple: 'https://podcasts.apple.com/us/podcast/mind-the-roots-infinite-emergence/id1514455221',
  youtube: 'https://www.youtube.com/@InfiniteEmergence',
};

// Category display name -> URL slug (mirrors the original brainforest.org slugs for SEO parity).
export const CATEGORY_SLUGS: Record<string, string> = {
  'Aging and Lifespan': 'aging',
  'Detoxification': 'detoxification',
  'Environment': 'environment',
  'Functional Nutrition': 'nutrition',
  'Gut Microbiome': 'gut-microbiome',
  'Hormones': 'hormones',
  'Immunity': 'immunity',
  'Mental Health': 'mental-health',
  'Neuroscience': 'neuroscience',
};

export function catSlug(name: string): string {
  return CATEGORY_SLUGS[name] ?? name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// Ordered category nav (by how the original site groups them)
export const CATEGORY_ORDER = [
  'Neuroscience', 'Gut Microbiome', 'Functional Nutrition', 'Mental Health',
  'Aging and Lifespan', 'Hormones', 'Immunity', 'Detoxification', 'Environment',
];

// Format an ISO date string -> "Feb 7, 2026"
export function fmtDate(iso: string): string {
  if (!iso) return '';
  // Date-only strings ("2026-06-09") parse as UTC midnight; appending a local time avoids the
  // date shifting back a day in timezones behind UTC.
  const d = new Date(/^\d{4}-\d{2}-\d{2}$/.test(iso) ? `${iso}T00:00:00` : iso);
  if (isNaN(+d)) return '';
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}
