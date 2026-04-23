# PLAN.md — Personal Blog

> Source of truth for what we're building. Claude Code should read this at the start of every session (referenced from CLAUDE.md).

## 1. Purpose

A personal blog where I write about tech — primarily AI engineering, distributed systems, backend/systems work, and developer tooling. Built so I can add non-tech categories later (finance, music, parenting notes) without re-architecting anything.

The blog is also a portfolio artifact: it should look and feel like it was made by someone who cares about their craft. "Good enough" is not good enough.

## 2. Non-goals (for v1)

Explicitly NOT building these yet. Do not add them even if they seem useful:

- Comments (use social replies instead)
- Newsletter signup / email capture
- Third-party analytics beyond Vercel's built-in
- Authentication or any user accounts
- A CMS / admin UI (posts are MDX files in git — that's the feature, not a limitation)
- Multi-author support
- Internationalization / translations

If I change my mind on any of these, we update PLAN.md first, then build.

## 3. Stack

| Concern           | Choice                          | Why                                                  |
| ----------------- | ------------------------------- | ---------------------------------------------------- |
| Framework         | Astro 6.x                       | Near-zero JS by default; Content Layer API; current stable release |
| Content format    | MDX                             | Markdown + React components for interactive explainers |
| Styling           | Tailwind CSS 4.x via `@tailwindcss/vite` | `@astrojs/tailwind` deprecated in Astro 6; Tailwind 4 uses CSS-native config (`@theme`, `@plugin`) |
| Syntax highlight  | Shiki (not Prism)               | VS Code-quality highlighting, dual-theme support     |
| Icons             | Lucide (astro-icon)             | Clean, consistent, tree-shakeable                    |
| Deploy            | Vercel                          | Preview deploys per push, free tier is enough        |
| Package manager   | pnpm                            | Faster, disk-efficient, strict by default            |
| Node              | 22 LTS                          | Required by Astro 6 (Node 20 EOL April 2026)         |
| TypeScript        | strict mode on                  | Catch errors early                                   |

Do not add new dependencies without asking me first.

## 4. Information architecture

```
/                       → homepage: hero + recent posts + categories
/posts                  → all posts, reverse chronological
/posts/[slug]           → individual post
/categories             → list of all categories with counts
/categories/[slug]      → posts filtered by category
/tags/[slug]            → posts filtered by tag
/about                  → who I am, what I do
/now                    → what I'm currently working on (nownownow.com style)
/rss.xml                → RSS feed
/sitemap.xml            → auto-generated
/og/[slug].png          → dynamic OG image per post
```

Categories are broad buckets (e.g. "ai-engineering", "systems", "notes"). Tags are granular topics (e.g. "llm", "distributed-systems", "cline"). A post has ONE category and MANY tags.

## 5. Content model

Posts live in `/content/posts/*.mdx`. Frontmatter schema (enforced via Astro content collections + zod):

```yaml
---
title: "Post title, sentence case, no trailing period"
description: "One-sentence summary for SEO and post cards. 120-160 chars."
publishedAt: 2026-04-22
updatedAt: 2026-04-25     # optional, only if edited meaningfully
category: "ai-engineering" # required, one of the defined categories
tags: ["llm", "cline"]     # optional, lowercase, kebab-case
draft: false               # drafts are excluded from prod builds but visible in dev
featured: false            # optional, surfaces on homepage
coverImage: "./cover.png"  # optional, relative to the post folder
---
```

Categories are defined in a single config file (`src/content/config.ts` or similar) so adding a new one is a single-line change. Initial categories:

- `ai-engineering` — LLMs, agents, tooling, AI product work
- `systems` — distributed systems, backend, performance, infra
- `notes` — short-form: book notes, paper notes, TIL
- `meta` — posts about the blog itself, my learning journey

Room to add `finance`, `music`, `parenting`, etc. later without touching code.

## 6. Must-have features (v1)

Ordered roughly by build sequence:

1. **MDX rendering** with GitHub-flavored markdown, footnotes, tables, task lists
2. **Syntax highlighting** via Shiki with dual themes (light + dark), copy-code button
3. **Reading time** auto-computed from word count
4. **Dark mode** — system preference by default, manual toggle, persists via localStorage; no flash on load
5. **Typography** — serif for body, sans for UI, monospace for code. Readable line length (~65ch). Proper vertical rhythm.
6. **Homepage** with intro block, recent 5 posts, category cards
7. **Post index** with filtering by category and tag
8. **Individual post page** with: title, date, reading time, category, tags, body, prev/next links
9. **RSS feed** at `/rss.xml`, includes full post content
10. **Sitemap** auto-generated
11. **OG images** — dynamically generated per post, include title + category + my name
12. **SEO** — meta tags, JSON-LD structured data (Article schema), canonical URLs
13. **Search** — client-side, over titles + descriptions + tags (Pagefind preferred — no build step per-post)
14. **404 page** that isn't embarrassing
15. **About + Now pages**

## 7. Nice-to-have (v1.1, skip for first ship)

- View transitions between pages (Astro supports natively)
- Mermaid diagrams in MDX
- KaTeX for math
- Table of contents for long posts, sticky on desktop
- "Last updated" banner on edited posts
- Webmentions

## 8. Design direction

Aesthetic target: **editorial-minimal** — think Maggie Appleton or Lee Robinson, not shadcn-dashboard-generic. Specifically:

- Generous whitespace, text-forward
- One accent color, used sparingly
- Typographic hierarchy carries the design, not drop shadows or gradients
- No cards with borders everywhere
- No emoji in UI chrome
- Subtle animations only (fade-in on scroll is fine, bounce is not)

Typography (locked at Slice 3):
- **Body:** Source Serif 4 Variable (`@fontsource-variable/source-serif-4`) — open license, self-hosted via fontsource
- **UI/nav:** Inter Variable (`@fontsource-variable/inter`)
- **Code:** JetBrains Mono Variable (`@fontsource-variable/jetbrains-mono`)

Color: neutral grayscale base + one accent (leaning warm — terracotta, ochre, or a deep blue). Finalize when the first post is rendering.

Reference screenshots live in `/REFERENCES/`.

## 9. Performance + quality targets

Non-negotiable before shipping v1:

- Lighthouse: **95+** on Performance, Accessibility, Best Practices, SEO (desktop AND mobile)
- Total JS on a post page: **< 30 KB** gzipped
- LCP on a post page: **< 1.5s** on Fast 3G
- All images: responsive, lazy-loaded below the fold, served in AVIF/WebP with fallback
- All interactive elements keyboard-reachable with visible focus rings
- Color contrast AA minimum, AAA for body text

## 10. Build sequence (vertical slices)

Each slice ends with a git commit and a working localhost. Do not start a new slice until the previous one is green.

- **Slice 1** — Scaffold Astro + MDX + Tailwind + Shiki. One hardcoded post at `/posts/hello` renders with good typography and syntax-highlighted code. Nothing else.
- **Slice 2** — Astro content collection for posts. Homepage lists posts from `/content/posts`. Post pages use the collection. Frontmatter schema validated.
- **Slice 3** — Global layout, nav, footer. Dark mode toggle, no-flash. Lock in typography + color palette.
- **Slice 4** — Category pages and tag pages. Category config file.
- **Slice 5** — RSS feed + sitemap. Validate both.
- **Slice 6** — Dynamic OG images per post. SEO meta tags, JSON-LD.
- **Slice 7** — Client-side search (Pagefind).
- **Slice 8** — About page, Now page, 404 page.
- **Slice 9** — Write one real post end-to-end. Fix whatever it exposes.
- **Slice 10** — Deploy to Vercel. Set up custom domain later.
- **Slice 11** — Audit pass: Lighthouse, a11y, RSS validity, meta tags. Fix findings.

Ship. Write post #2 about the build process.

## 11. Post-launch backlog

Things I'll want eventually, not now:

- Custom domain + email forwarding
- Add `/bookshelf` or `/reading` page
- Add `/projects` page linking X Bookmark Brain, BillClear, etc.
- Set up redirects file for any URL changes
- Add CI: lint + build check on every PR (even solo)
- Write-up script that stubs out a new MDX post with frontmatter pre-filled

## 12. File layout (proposed, Claude Code can refine in Plan Mode)

```
.
├── CLAUDE.md
├── PLAN.md
├── REFERENCES/              # design inspiration screenshots
├── astro.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── public/
│   ├── favicon.svg
│   └── fonts/
├── content/
│   └── posts/
│       └── hello-world.mdx
└── src/
    ├── components/
    │   ├── Nav.astro
    │   ├── Footer.astro
    │   ├── PostCard.astro
    │   ├── ThemeToggle.astro
    │   └── CodeBlock.astro
    ├── layouts/
    │   ├── BaseLayout.astro
    │   └── PostLayout.astro
    ├── pages/
    │   ├── index.astro
    │   ├── about.astro
    │   ├── now.astro
    │   ├── 404.astro
    │   ├── rss.xml.ts
    │   ├── posts/
    │   │   ├── index.astro
    │   │   └── [slug].astro
    │   ├── categories/
    │   │   ├── index.astro
    │   │   └── [slug].astro
    │   ├── tags/
    │   │   └── [slug].astro
    │   └── og/
    │       └── [slug].png.ts
    ├── content/
    │   └── config.ts        # collection schema + category definitions
    ├── styles/
    │   └── global.css
    └── lib/
        └── reading-time.ts
```

## 13. Working agreement with Claude Code

- Always read `PLAN.md` and `CLAUDE.md` at the start of a task.
- Work one slice at a time. If a slice is taking more than ~45 min, stop and break it down.
- Before adding any dependency: ask.
- Before changing the information architecture or content schema: ask and update PLAN.md.
- Run `pnpm lint && pnpm build` before claiming a slice is done.
- After finishing a slice, summarize what changed in 3 bullets so I can write the commit message.
- If I paste a screenshot, treat it as the ground truth for how the UI currently looks.
