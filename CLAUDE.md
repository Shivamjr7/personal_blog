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