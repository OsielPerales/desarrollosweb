---
name: editorial-humanist-design
description: Use this skill to generate well-branded interfaces and assets for the Editorial Humanist design system — a light-mode, serif-forward editorial brand rooted in "humanismo tecnológico" and "Skin in the Game". For production code or throwaway prototypes, mocks, slides, or marketing assets.
user-invocable: true
---

Read the `README.md` file within this skill first — it contains the full brand context, content fundamentals, visual foundations, and iconography rules. Then explore the other available files:

- `colors_and_type.css` — design tokens (colors, type scale, spacing, radii, shadows, motion)
- `fonts/` — font substitution notes
- `assets/` — logos, illustration refs, icon refs
- `preview/` — 16 individual cards demonstrating every token group
- `ui_kits/web/` — generic editorial web UI kit (Nav, Hero, ArticleCard, Quote, Newsletter, Footer)

If creating visual artifacts (slides, mocks, throwaway prototypes, marketing pages), copy assets out of this folder and create static HTML files for the user to view. Link `colors_and_type.css` directly; use the components in `ui_kits/web/` as reference for component patterns.

If working on production code, read the rules in `README.md` (VISUAL FOUNDATIONS, CONTENT FUNDAMENTALS, ICONOGRAPHY) to become an expert in designing with this brand. Follow: light mode only, generous spacing, soft diffuse shadows, 12/8/100 radii, Libre Baskerville for display, Inter for UI, JetBrains Mono for data.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions (surface type, audience, copy tone, degree of brand coverage), and act as an expert designer who outputs HTML artifacts *or* production code, depending on the need.
