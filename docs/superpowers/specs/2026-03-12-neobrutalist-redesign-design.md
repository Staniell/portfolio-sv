# Neobrutalist Portfolio Redesign

**Goal:** Restyle the single-page portfolio into a neobrutalist interface while preserving the current scroll-snap flow, navigation behavior, theme switching, and project slider mechanics.

## Direction

- Replace the current dark glassmorphism treatment with a high-contrast neobrutalist system built around paper-toned surfaces, strong black borders, offset shadows, and flat accent blocks.
- Keep the existing dual-theme behavior driven by `src/lib/theme.svelte.ts`, but reinterpret both `red` and `purple` as brutalist accent systems instead of glow-based palettes.
- Use expressive typography with `Lexend Mega` for major headlines and `Public Sans` for supporting copy and UI text.

## Visual System

- **Base palette:** warm off-white backgrounds, slightly darker section panels, near-black text, and black structural borders.
- **Theme accents:** keep `red` and `purple` variants for CTAs, active states, badges, chips, and emphasis.
- **Shapes:** mostly squared corners with occasional small radii only where it helps touch ergonomics.
- **Depth:** use offset box shadows instead of blur or glow.
- **Texture:** use subtle grid and block treatments to avoid flat empty backgrounds.

## Layout Principles

- Preserve the current full-screen section rhythm on desktop and natural scrolling on mobile.
- Keep every section recognizable as its current content block: hero, about, experience, projects, skills, and contact.
- Shift presentation toward framed panels, posters, and stacked content blocks without introducing new flows or removing existing actions.

## Interaction Rules

- Preserve existing click targets, anchors, keyboard navigation, and project slider interactions.
- Keep motion short and purposeful with simple translate/box-shadow transitions.
- Respect reduced-motion preferences.

## Component Notes

- **Navigation:** floating framed bar, bold active tabs, boxed mobile menu, square section indicators.
- **Hero:** poster-like headline, sticker badge, bold CTA buttons, simpler scroll indicator.
- **About:** portrait frame plus info and stat cards.
- **Experience:** stacked cards with a harder timeline marker treatment.
- **Projects:** keep slider math and drag behavior, but turn cards into bordered showcase panels with visible actions.
- **Skills:** boxed categories with chunky skill tags.
- **Contact:** bold CTA panel with framed social links and preserved mail action.

## Constraints

- No UX or functionality regressions.
- No route or section order changes.
- No changes to theme selection logic or project ordering logic.
- No changes to project slider behavior beyond presentation.

## Verification

- Run `npm run check`.
- Run `npm run build`.
- Manually verify desktop wheel snapping and active navigation highlighting.
- Manually verify mobile natural scrolling still disables snap behavior.
- Manually verify reduced-motion-safe transitions and theme-driven project ordering.
