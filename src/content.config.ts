import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { CATEGORY_SLUGS } from './content/categories';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    category: z.enum(CATEGORY_SLUGS),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    coverImage: z.string().optional(),
  }),
});

const books = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/books' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      author: z.string(),
      readAt: z.coerce.date(),
      rating: z.number().int().min(1).max(5).optional(),
      notes: z.string().optional(),
      coverImage: image().optional(),
      url: z.string().url().optional(),
      category: z.enum(['tech', 'fiction', 'non-fiction', 'business', 'other']),
      featured: z.boolean().default(false),
    }),
});

export const collections = { posts, books };
