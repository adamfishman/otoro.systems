# CLAUDE.md

Guidance for Claude when working in this repository.

## What this is

The public website for **Otoro Systems LLC**, a single-member embedded software engineering consulting firm, served at `www.otoro.systems`.

Stack: **Astro** (fully static output) + **Keystatic** (editing UI for Markdown content), hosted on **Cloudflare Workers static assets**. Cloudflare already manages DNS for the domain.

## Status

- **Content is placeholder.** Services (`src/data/services.ts`), About, Contact copy, and the files in `src/content/` are marked "Placeholder". Replace or delete them before launch. Don't invent real-sounding clients, projects, results or credentials. Ask the owner for facts.
- **Hosting migration in progress.** Production is still GitHub Pages (`.github/workflows/gh-pages.yml` deploys `master`). Cloudflare config (`wrangler.jsonc`) is ready but not yet connected. Cutover steps are below.
- The owner intends to make this repo **private**. On GitHub Free that breaks GitHub Pages, so do it only after the Cloudflare cutover.

## Commands

```bash
npm install          # Node >= 22.23.4 (see .nvmrc)
npm run dev          # http://localhost:4321, editor at /keystatic
npm run check        # astro check (types + content schema)
npm run build        # static site -> dist/
npx wrangler dev     # serve dist/ the way Cloudflare will (run build first)
npm run deploy       # build + wrangler deploy (needs Cloudflare login)
```

Always run `npm run check` and `npm run build` before committing. CI runs both on PRs and branches.

## Layout

| Path | What it is |
| --- | --- |
| `src/pages/` | Routes: `/`, `/work/`, `/work/[slug]/`, `/writing/`, `/writing/[slug]/`, `/about/`, `/contact/`, 404. |
| `src/layouts/Base.astro` | Site shell: `<head>`, header nav, footer with policy links. |
| `src/styles/global.css` | Design tokens (CSS variables), grid background, `.prose` styles for long-form content. |
| `src/components/` | `CaseStudyCard`, `PostList`. |
| `src/content.config.ts` | Schemas for the `posts` and `caseStudies` collections. Must stay in sync with `keystatic.config.ts`. |
| `src/content/posts/`, `src/content/case-studies/` | Markdown entries. Filename = URL slug. |
| `src/data/services.ts` | Services listed on the homepage. |
| `src/lib.ts` | Collection helpers. Drafts (`draft: true`) show in dev only. |
| `keystatic.config.ts` | Editor config. Field names/types must match `src/content.config.ts`. |
| `public/privacy.html`, `security.html`, `subprocessors.html` | Compliance pages, served as-is (standalone HTML). |
| `public/CNAME`, `public/.assetsignore` | CNAME is for GitHub Pages only. `.assetsignore` keeps it off Cloudflare. |
| `wrangler.jsonc` | Cloudflare Worker (static assets only, no Worker script). |

## Design

Direction "B / technical": dark background (`#0e1113`) with a faint 48px grid, panels `#151a1d`, single green accent `#7ee0a1`. **Everything is set in JetBrains Mono** (self-hosted via `@fontsource-variable/jetbrains-mono`, no third-party font requests). Use the CSS variables in `global.css` rather than hard-coded colours. Keep it fully monospace and keep one accent colour.

## Content rules

- The compliance pages (privacy, security, subprocessors) are statements the business relies on with clients. Don't change what they say unless asked. When you edit one, update its "Last updated" date.
- They must stay reachable at `/privacy.html`, `/security.html`, `/subprocessors.html`. On Cloudflare those 307-redirect to `/privacy` etc. (`html_handling: auto-trailing-slash`). Site links use the clean form.
- Contact email: `adam@otoro.systems`.
- The site collects nothing from visitors (see the privacy page). Don't add analytics, third-party scripts, fonts or embeds without asking. That could make the privacy page untrue.

## Keystatic

- Runs in `local` storage mode and only in `astro dev`. `astro.config.mjs` adds the React and Keystatic integrations only when the command is `dev`, so production stays fully static.
- Edits made in the editor write Markdown into `src/content/` and must be committed like any other change.
- Editing on the live site (GitHub storage mode) would need a server-rendered `/keystatic` route via `@astrojs/cloudflare` plus a GitHub App. That's not set up. Propose it before doing it.

## Cloudflare cutover (not done yet)

1. Cloudflare dashboard → Workers & Pages → Create → Import a repository → this repo. Build command `npm run build`, deploy command `npx wrangler deploy`. Branch previews come for free.
2. Check the `*.workers.dev` URL, then add custom domains `www.otoro.systems` (and apex `otoro.systems`, redirecting to www) on the Worker.
3. Once traffic is on Cloudflare: delete `.github/workflows/gh-pages.yml`, `public/CNAME` and `public/.assetsignore`, and disable Pages in the GitHub repo settings. Then the repo can go private.

## Working conventions

- Default branch is `master`. Pushing to it deploys to production. Work on a feature branch.
- Other apps (e.g. the former `cuydem` app) live in their own repositories. Don't add them here.
- Don't commit `node_modules/`, `dist/`, `.astro/`, `.wrangler/`, `.DS_Store`.
