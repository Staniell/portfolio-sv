# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

| Task | Command |
|------|---------|
| Dev server | `npm run dev` |
| Build | `npm run build` |
| Preview build | `npm run preview` |
| Type check | `npm run check` |
| Type check (watch) | `npm run check:watch` |
| Format code | `npm run format` |
| Lint (check formatting) | `npm run lint` |

There is no test framework configured.

## Architecture

Single-page portfolio site built with **SvelteKit 2 + Svelte 5** (runes), **Tailwind CSS v4**, and **TypeScript**. Deployed to **Cloudflare Pages**.

### Single Route, Scroll-Snap Sections

The entire site is one route (`src/routes/+page.svelte`) composed of 7 full-screen section components rendered sequentially. Navigation is scroll-based, not route-based:
- Desktop: custom `wheel` handler snaps between sections; CSS `scroll-snap-type: y mandatory` on `<html>`
- Mobile (≤768px): scroll-snap disabled, natural scrolling
- `IntersectionObserver` tracks the current visible section for nav highlighting

Section order: Hero → About → Experience → Projects → Skills → Contact

### Theme System

`src/lib/theme.svelte.ts` — A day-of-week-driven dual theme (`'red'` | `'purple'`) using a Svelte 5 rune class. The layout applies `data-theme` on `<body>`, and all accent colors resolve through CSS custom properties in `src/routes/layout.css`. Projects order also changes based on active theme.

### Styling

Tailwind v4 uses **CSS-first configuration** — no `tailwind.config.*` file. Plugins (`@tailwindcss/forms`, `@tailwindcss/typography`) are loaded via `@plugin` directives in `layout.css`. Global design tokens (colors, transitions, typography, animations, glass effect) are defined as CSS custom properties in `layout.css`. Reusable classes: `.section`, `.glass`, `.gradient-text`, `.btn-primary`, `.heading-xl/lg/md`, `.text-body`, `.text-small`.

### Data

All content (experience entries, projects, skills, contact links) is hardcoded inline within each component — no external data files. Project images are hosted on an external CDN (`b.catgirlsare.sexy`); the `scripts/upload-to-cdn.mjs` utility handles uploads.

### Key Conventions

- **Svelte 5 runes throughout** — `$props()`, `$state()`, `$derived.by()`, `$effect()`. No legacy `export let` or stores.
- Components are in `src/lib/components/` and barrel-exported from `src/lib/index.ts`.
- Each section component accepts an `id` prop for scroll targeting.
- `lucide-svelte` is used for all icons.
- Adapter selection is conditional: `@sveltejs/adapter-cloudflare` when `CF_PAGES` env is set, `@sveltejs/adapter-auto` otherwise.
- `lucide-svelte` is set as `noExternal` in Vite SSR config for bundling compatibility.
