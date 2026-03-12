# AGENTS.md

This file gives coding agents the current working conventions for this repository.

## Project Snapshot

- Single-page portfolio built with **SvelteKit 2**, **Svelte 5 runes**, **TypeScript**, and **Tailwind CSS v4**.
- Deployed to **Cloudflare Pages**.
- The site is one route: `src/routes/+page.svelte`.
- Section order is: `Hero -> About -> Experience -> Projects -> Skills -> Contact`.

## Commands

| Task                | Command                                        |
| ------------------- | ---------------------------------------------- |
| Dev server          | `npm run dev`                                  |
| Build               | `npm run build`                                |
| Preview build       | `npm run preview`                              |
| Type check          | `npm run check`                                |
| Type check (watch)  | `npm run check:watch`                          |
| Format              | `npm run format`                               |
| Lint formatting     | `npm run lint`                                 |
| Desktop scroll test | `node --test tests/desktop-scroll.test.js`     |
| Fit helper tests    | `node --test tests/fit-section.test.js`        |
| Section nav tests   | `node --test tests/section-navigation.test.js` |

There is still no full app test framework or e2e setup. For UI/UX changes, manual verification with `npm run preview` is expected.

## Core Architecture

### Routing and Scroll Behavior

- All content lives on `src/routes/+page.svelte`.
- Desktop uses a custom `wheel` handler to snap to the next or previous section.
- Wheel intent and lock behavior are normalized through `src/lib/desktop-scroll.js`; repeated wheel events during an active transition must still be canceled, but they must not keep extending the lock.
- Mobile (`<= 768px`) disables snap behavior and allows natural scrolling.
- Active nav state is derived from viewport position using `src/lib/section-navigation.js`.
- Do not convert this app into route-per-page navigation unless explicitly asked.

### Section Fitting

- Desktop sections remain viewport-sized via `.section` in `src/routes/layout.css`.
- Oversized section content is scaled to fit using the `fitSection` action in `src/lib/fit-section.js`.
- The fit wrappers are:
  - `.section-fit-shell`
  - `.section-fit-viewport`
  - `.section-fit-content`
- Components using this pattern mark the inner measurable content with `data-fit-content`.
- Fit shells can reserve visual overflow with `data-fit-bleed-x`, `data-fit-bleed-y`, `data-fit-bleed-top`, `data-fit-bleed-bottom`, `data-fit-bleed-left`, and `data-fit-bleed-right`.
- Fit shells can also reserve fixed-overlay clearance with `data-fit-inset-top` / `data-fit-inset-bottom`; use this when a section must stay clear of the floating desktop navbar.
- Prefer tuning bleed/inset values instead of adding desktop scrollbars or ad hoc spacing inside section content.
- Keep desktop snap behavior intact; avoid reintroducing internal desktop scroll regions unless explicitly requested.

### Theme System

- Theme logic lives in `src/lib/theme.svelte.ts`.
- Theme is day-driven and switches between `'red'` and `'purple'`.
- The active theme is exposed via `data-theme` on the body and consumed through CSS custom properties in `src/routes/layout.css`.
- Project ordering also changes based on the current theme, so preserve theme-driven ordering logic.

## UI / Design Direction

- The current visual system is **neobrutalist**.
- Key traits to preserve unless the user asks otherwise:
  - warm paper-like backgrounds
  - thick black borders
  - hard-edged cards and controls
  - offset shadows instead of blur/glow
  - `Lexend Mega` for display emphasis
  - `Public Sans` for body/UI text
- Avoid drifting back toward glassmorphism, soft gradients, or glossy blur-heavy UI.
- Favicon lives at `src/lib/assets/favicon.svg` and should stay visually aligned with the neobrutalist system.

## Styling Conventions

- Tailwind v4 uses CSS-first configuration; there is **no** `tailwind.config.*` file.
- Global tokens and shared utility classes live in `src/routes/layout.css`.
- Shared reusable classes include:
  - `.section`
  - `.glass`
  - `.gradient-text`
  - `.btn-primary`
  - `.heading-xl`, `.heading-lg`, `.heading-md`
  - `.text-body`, `.text-small`
  - fit-section helpers mentioned above
- `lucide-svelte` is the icon system used throughout.

## Content and Data

- Portfolio content is hardcoded inline in section components.
- There is no external CMS or shared data file for experience, projects, skills, or contact content.
- Project images are hosted remotely; existing image URLs point to the external CDN.

## Svelte Conventions

- Use **Svelte 5 runes** patterns already in the repo.
- Prefer `$props()`, `$state()`, `$derived.by()`, and `$effect()` where appropriate.
- Do not introduce legacy `export let` patterns into new code.
- Components live in `src/lib/components/` and are exported from `src/lib/index.ts`.

## Important Files

- `src/routes/+page.svelte` - single-page composition, wheel snapping, active-section tracking
- `src/routes/+layout.svelte` - app shell and favicon usage
- `src/routes/layout.css` - global tokens, neobrutalist system, section sizing, fit wrappers
- `src/lib/desktop-scroll.js` - desktop wheel-lock decision helper for one-section snap behavior
- `src/lib/theme.svelte.ts` - day-based theme selection
- `src/lib/fit-section.js` - scale-to-fit logic for oversized desktop sections, including bleed and inset reservation
- `src/lib/section-navigation.js` - viewport-center-based active section calculation
- `src/lib/components/Projects.svelte` - slider behavior and one of the most layout-sensitive sections
- `src/lib/components/Experience.svelte` - another layout-sensitive section with fit bleed/inset tuning

## Working Rules for Agents

- Preserve current functionality first; most requests in this repo are UI-forward but should not break scroll UX.
- When editing `Experience` or `Projects`, verify both visual fit and desktop snap behavior afterward.
- If adjusting section sizing, test both:
  - shorter desktop heights
  - mobile natural scrolling
- Before claiming scroll or sizing work is fixed, run:
  - `node --test tests/desktop-scroll.test.js`
  - `node --test tests/fit-section.test.js`
  - `node --test tests/section-navigation.test.js`
  - `npm run check`
  - `npm run build`

## Manual Verification Checklist

After UI or scroll-related changes, manually verify:

- desktop wheel snap moves one section at a time
- scrolling up and down feels symmetric
- repeated desktop scrolls still work after the first section change
- `Experience` and `Projects` are fully visible on shorter laptop heights and stay clear of the fixed navbar
- no desktop scrollbar appears inside sections unless explicitly intended
- mobile still uses natural scrolling
- nav highlighting matches the visible section
- red/purple theme variants still work
