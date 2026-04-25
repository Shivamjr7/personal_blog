import rss from '@astrojs/rss';
import { getCollection, render } from 'astro:content';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { loadRenderers } from 'astro:container';
import { getContainerRenderer as getMdxRenderer } from '@astrojs/mdx';
import type { APIContext } from 'astro';

const SITE_TITLE = 'Shivam Jari';
const SITE_DESCRIPTION = 'Writing about AI engineering, distributed systems, and developer tooling.';

export async function GET(context: APIContext) {
  const posts = (await getCollection('posts', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime(),
  );

  const renderers = await loadRenderers([getMdxRenderer()]);
  const container = await AstroContainer.create({ renderers });

  const items = await Promise.all(
    posts.map(async post => {
      const { Content } = await render(post);
      const content = await container.renderToString(Content);
      const slug = post.id.replace(/\.mdx?$/, '');

      return {
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.publishedAt,
        link: `/blogs/${slug}/`,
        categories: [post.data.category, ...post.data.tags],
        content,
      };
    }),
  );

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site!,
    items,
  });
}
