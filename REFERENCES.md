# REFERENCES.md — Design inspiration

> Live URLs Claude Code should fetch when working on visual slices (3, 6, and any UI iteration). No screenshots — fetch the live sites and inspect the actual rendered HTML/CSS.

## How to use this file

When working on a visual slice, fetch the Tier 1 URLs and look at:
- The homepage
- One post/article page (especially one with code blocks)
- The about page

Pay attention to: typography (font families, sizes, line-height, line-length), spacing scale, color palette, code block treatment, dark mode behavior, navigation patterns.

The aesthetic target is **editorial-minimal** — closer to Lee Robinson and Maggie Appleton than to a shadcn dashboard. When in doubt, lean toward less ink, more whitespace, better typography.

## Tier 1 — primary inspiration

Fetch these first. The blog should feel like it belongs in this neighborhood.


- **Maggie Appleton** — https://maggieappleton.com — editorial, personal, garden-style. Reference for warmth and personality without losing minimalism.
- **Arpit Bhayani** - https://arpitbhayani.me/
- **Suyash Singh** - https://suyashsingh.in/
- **Julia Evans** — https://jvns.ca — long-running personal blog with strong IA and a distinctive voice. Reference for how a multi-year archive should feel.
- **Kent C. Dodds** — https://kentcdodds.com — denser content site; useful if we ever need to surface a lot of IA at once.

## Tier 2 — supporting references

Fetch when working on specific concerns.

- **Lee Robinson** — https://leerob.com — the cleanest "developer who writes" reference. Study post page typography, code block design, and post list density.
- **Brian Lovin** — https://brianlovin.com — nav patterns, `/now` page, polished personal site structure.
- **Anthony Fu** — https://antfu.me — minimalism done right; subtle craft details, fast page loads.
- **Robin Rendle** — https://robinrendle.com — typography reference. Treat as the gold standard for prose-heavy pages.
- **Cassidy Williams** — https://cassidoo.co — personality-forward, no-nonsense layout. Useful counterweight if our design
- **Josh Comeau** — https://www.joshwcomeau.com — best-in-class interactive MDX components and post pacing. Reference for how MDX can be used well, even if our default aesthetic is quieter.
- **Dan Abramov** — https://overreacted.io — the "absolute minimum" reference. If we're tempted to over-design, look here first. starts feeling too austere.



## Tier 3 — code block + dark mode references

Specifically for Slices 1 and 3.

- **Vercel blog** — https://vercel.com/blog — widely-copied code block treatment.
- **Linear blog** — https://linear.app/blog — dark mode reference; strong typographic hierarchy.
- **Stripe Press** — https://press.stripe.com — not a blog, but the typography bar to aim for.

## Anti-references

What we're explicitly NOT going for:

- Generic shadcn dashboard look (cards everywhere, lots of borders, bg-muted backgrounds)
- Marketing-page aesthetics (gradients, hero illustrations, "Get Started" CTAs)
- Medium-style stock photo headers on every post
- Substack-style newsletter signup overlays
- Tutorial-site density (sidebars full of nav, breadcrumbs, "On this page" panels everywhere)

## Working agreement

When Claude Code proposes a visual choice, the implicit question is: "would this fit on Lee Robinson's site?" If no, push back.
