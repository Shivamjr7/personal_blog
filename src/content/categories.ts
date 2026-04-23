export const CATEGORIES = [
  {
    slug: 'ai-engineering',
    name: 'AI Engineering',
    description: 'LLMs, agents, tooling, and AI product work.',
  },
  {
    slug: 'systems',
    name: 'Systems',
    description: 'Distributed systems, backend, performance, and infra.',
  },
  {
    slug: 'notes',
    name: 'Notes',
    description: 'Short-form: book notes, paper notes, TIL.',
  },
  {
    slug: 'meta',
    name: 'Meta',
    description: 'Posts about the blog itself and my learning journey.',
  },
] as const;

export type Category = (typeof CATEGORIES)[number];
export type CategorySlug = Category['slug'];

// Non-empty tuple cast for z.enum — safe because array is statically non-empty.
export const CATEGORY_SLUGS = CATEGORIES.map(c => c.slug) as unknown as [CategorySlug, ...CategorySlug[]];
