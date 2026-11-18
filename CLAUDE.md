# CLAUDE.md

Guidance for Claude when working in this repository.

## What this is

The public website for **Otoro Systems LLC**, a single-member embedded software engineering consulting firm. It's served at `www.otoro.systems` (see `CNAME`).

**Status: a redesign is planned.** The current site is a mostly unchanged GitHub Pages / Jekyll starter. The owner plans to rebuild it on a more modern stack and may move hosting from GitHub Pages to Cloudflare or another host. Until that's decided:
- Don't invest in Jekyll-specific tooling or theme customization.
- Bring stack or hosting changes to the user as a proposal before doing them.

## Current layout

| Path | What it is |
| --- | --- |
| `index.md` | Home page. Still the **placeholder** slate-theme demo content. It doesn't describe the business yet. |
| `privacy.html`, `security.html`, `subprocessors.html` | Real legal/compliance pages. Standalone HTML with inline styles, no Jekyll front matter, so they're copied through as-is. |
| `_includes/header.html` | Empty include. |
| `_config.yml` | `theme: jekyll-theme-slate` and nothing else. |
| `CNAME` | Custom domain. Must keep working through any hosting migration. |
| `README.md` | GitHub Pages boilerplate, not project docs. |

## Build & deploy (current)

- `.github/workflows/jekyll-gh-pages.yml` builds with `actions/jekyll-build-pages` and deploys to GitHub Pages on every push to `master`. Merging to `master` publishes to production.
- There's no Gemfile and no local build setup. To preview locally you'd need the `github-pages` gem. Ask before adding one, since the stack may change.

## Content rules

- The compliance pages (privacy, security, subprocessors) are statements the business relies on with clients. Don't change what they say unless asked. When you edit one, update its "Last updated" date.
- Keep them reachable at their current URLs (`/privacy.html`, `/security.html`, `/subprocessors.html`) through any redesign or migration. Other parties may link to them.
- Contact email on the site: `adam@otoro.systems`.

## Working conventions

- Default branch is `master`. Work on a feature branch and don't push directly to `master`.
- Don't commit `.DS_Store` or build output (`_site/`, `dist/`, etc.).
- This repo holds only the company website. Other apps (e.g. the former `cuydem` app) live in their own repositories. Don't add them back here.
