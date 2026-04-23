import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { CATEGORIES } from '../../content/categories';
import { renderOgImage } from '../../lib/og-image';

interface OgProps {
  title: string;
  category?: string;
}

export async function getStaticPaths() {
  const posts = await getCollection('posts', ({ data }) => !data.draft);

  const postPaths = posts.map(post => {
    const slug = post.id.replace(/\.mdx?$/, '');
    const categoryName = CATEGORIES.find(c => c.slug === post.data.category)?.name;
    return {
      params: { slug },
      props: { title: post.data.title, category: categoryName } satisfies OgProps,
    };
  });

  return [
    ...postPaths,
    {
      params: { slug: 'default' },
      props: { title: 'Writing on AI engineering, distributed systems, and developer tooling.' } satisfies OgProps,
    },
  ];
}

export async function GET({ props }: APIContext<OgProps>) {
  const png = await renderOgImage(props);
  return new Response(png.buffer as ArrayBuffer, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
