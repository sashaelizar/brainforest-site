import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// First-draft preview of Sasha's site, rebuilt from the Wix export.
// Static output -> deploys free to Netlify as-is.
export default defineConfig({
  site: 'https://brainforest.org',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: { theme: 'github-light' },
  },
});
