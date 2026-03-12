# Neobrutalist Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rework the portfolio UI into a neobrutalist visual system while preserving all existing navigation, theme, and slider behavior.

**Architecture:** Keep the current single-route, section-based Svelte structure intact and concentrate the redesign in global design tokens plus section-local presentation styles. Shared primitives live in `src/routes/layout.css`, while each section component maps those tokens into a distinct brutalist layout without altering its existing interactions.

**Tech Stack:** SvelteKit 2, Svelte 5 runes, TypeScript, Tailwind CSS v4, component-scoped CSS

---

## Chunk 1: Foundations

### Task 1: Create the neobrutalist global system

**Files:**

- Modify: `src/routes/+page.svelte`
- Review: `src/routes/+layout.svelte`
- Modify: `src/routes/layout.css`
- Review: `src/lib/theme.svelte.ts`
- Reference: `docs/superpowers/specs/2026-03-12-neobrutalist-redesign-design.md`

- [ ] Step 1: Update the font import in `src/routes/+page.svelte` to load `Lexend Mega` and `Public Sans`.
- [ ] Step 2: Replace the global token system in `src/routes/layout.css` with neobrutalist colors, borders, shadows, type, section spacing, buttons, labels, and accessibility-safe defaults while preserving theme hooks.
- [ ] Step 3: Add reduced-motion-safe shared transitions and focus treatments in `src/routes/layout.css`.
- [ ] Step 4: Confirm `src/routes/+layout.svelte` and `src/lib/theme.svelte.ts` still preserve existing theme behavior without logic changes.
- [ ] Step 5: Run `npm run check`.
- [ ] Step 6: If `npm run check` passes, continue. If not, fix the CSS or markup issue before moving on.

### Task 2: Restyle top-level navigation and hero

**Files:**

- Modify: `src/lib/components/Navigation.svelte`
- Modify: `src/lib/components/Hero.svelte`
- Reference: `src/routes/+page.svelte`

- [ ] Step 1: Restyle `src/lib/components/Navigation.svelte` into a bordered floating bar with brutalist active states and a boxed mobile menu without changing click or toggle behavior.
- [ ] Step 2: Restyle `src/lib/components/Hero.svelte` into a poster-like hero with bold headline treatment, framed CTAs, and a preserved scroll button.
- [ ] Step 3: Re-check hero and nav markup for accessibility labels and touch target sizing.
- [ ] Step 4: Run `npm run check`.

## Chunk 2: Section redesign

### Task 3: Restyle the informational sections

**Files:**

- Modify: `src/lib/components/About.svelte`
- Modify: `src/lib/components/Experience.svelte`
- Modify: `src/lib/components/Skills.svelte`
- Modify: `src/lib/components/Contact.svelte`

- [ ] Step 1: Convert `src/lib/components/About.svelte` into a framed profile and info-card layout while keeping the same content.
- [ ] Step 2: Convert `src/lib/components/Experience.svelte` into boxed timeline entries with stronger markers and readable hierarchy.
- [ ] Step 3: Convert `src/lib/components/Skills.svelte` and `src/lib/components/Contact.svelte` into bordered card layouts with consistent brutalist tags, links, and CTA treatment.
- [ ] Step 4: Run `npm run check`.

### Task 4: Restyle the projects showcase without changing slider behavior

**Files:**

- Modify: `src/lib/components/Projects.svelte`
- Reference: `src/lib/components/projects-slider.js`

- [ ] Step 1: Replace the glass and overlay-driven project card styling with a bordered showcase treatment that keeps drag, keyboard, and pagination behavior intact.
- [ ] Step 2: Keep the existing project actions functional while making their placement and hierarchy fit the new design.
- [ ] Step 3: Verify card dimensions do not break slider centering or responsive behavior.
- [ ] Step 4: Run `npm run check`.

## Chunk 3: Verification

### Task 5: Final verification and polish

**Files:**

- Review: `src/routes/layout.css`
- Review: `src/lib/components/Navigation.svelte`
- Review: `src/lib/components/Hero.svelte`
- Review: `src/lib/components/About.svelte`
- Review: `src/lib/components/Experience.svelte`
- Review: `src/lib/components/Projects.svelte`
- Review: `src/lib/components/Skills.svelte`
- Review: `src/lib/components/Contact.svelte`

- [ ] Step 1: Review all updated files for visual consistency, contrast, focus states, and mobile layout safety.
- [ ] Step 2: Run `npm run check`.
- [ ] Step 3: Run `npm run build`.
- [ ] Step 4: Manually verify desktop wheel snap, active-section highlighting, mobile natural scroll, reduced-motion behavior, and theme-driven project ordering.
- [ ] Step 5: Manually verify keyboard focus visibility for nav, CTA buttons, slider controls, and social links.
- [ ] Step 6: Summarize the updated visual system and note any follow-up polish opportunities.
