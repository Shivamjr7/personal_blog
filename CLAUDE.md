# CLAUDE.md

## Always read these at the start of a task
- PLAN.md — full spec, content model, build sequence
- REFERENCES.md — design inspiration URLs (fetch them for visual work)

## Project rules
- Stack: Astro 5 + MDX + Tailwind + Shiki (locked, do not change)
- Package manager: pnpm only — never npm or yarn
- Always run `pnpm lint && pnpm build` before claiming a task is done
- Posts live in /content/posts/ as .mdx files
- Do not add new dependencies without asking first
- Do not change the information architecture or content schema without updating PLAN.md first
- After finishing a slice, summarize changes in 3 bullets so I can write the commit

## Working style
- Work one vertical slice at a time (slices defined in PLAN.md section 10)
- If a slice is taking more than ~45 min, stop and propose a smaller breakdown
- For visual slices, fetch URLs from REFERENCES.md before proposing styles
- I'll paste my own screenshots when iterating — those are ground truth for current state



Decisions:

Astro: first verify whether 6 is stable and the ecosystem (MDX, Tailwind via Vite, Shiki) fully supports it via docs.astro.build. Use 6 if yes, 5 if not. Update PLAN.md section 3 accordingly.
Fonts: Charter (body), Inter (UI), JetBrains Mono (code). Self-host all three under /public/fonts/ with font-display: swap.
Accent: terracotta, starting around #B8543A. Generate a full 50–950 Tailwind scale from it. Use sparingly — links, active nav, occasional accents. Not buttons-by-default, not backgrounds.

Once you've confirmed the Astro version, update PLAN.md section 3, then proceed with Slice 1.

Execute Slice 1 : scaffold the Astro project with TypeScript strict mode, install MDX + Tailwind + Shiki + the dependencies from your plan, and make a single hardcoded post at /posts/hello render with proper typography and syntax-highlighted code blocks (include a JavaScript example to verify Shiki works). Use Shiki dual-theme so it works in both light and dark. Stop after that — no homepage, no global layout yet. Run pnpm dev and tell me what to look at in the browser.


