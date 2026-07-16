import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    author: z.string().optional().default(''),
    date: z.string().optional().default(''),
    updated: z.string().optional().default(''),
    description: z.string().optional().default(''),
    source_url: z.string().optional().default(''),
    readTime: z.string().optional().default(''),
    hero: z.string().optional().default(''),
    heroCaption: z.string().optional().default(''),
    categories: z.array(z.string()).optional().default([]),
    // true only for posts written as real markdown via the Decap CMS rich-text editor; the 42
    // legacy posts exported from Wix are raw HTML and must always keep this false (or absent).
    markdown: z.boolean().optional().default(false),
  }),
});

export const collections = { posts };
