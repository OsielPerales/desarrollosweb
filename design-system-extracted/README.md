# Editorial Humanist Design System

A brand system rooted in **humanismo tecnológico** — technology with a human conscience, "Skin in the Game" as a core value. Light-mode, editorial, calm, confident.

> No codebase, Figma, or slide deck was attached. This system is built from the brand specification provided. All UI kit components are **generic editorial** interpretations of the tokens; once the real product surfaces are shared, they should replace the placeholders here.

## Sources given
- Brand specification pasted in the kickoff message (colors, type, design rules, voice).
- No Figma link provided.
- No codebase provided.
- No slide deck provided.

## Status

Items open for user input before this system is "done":
1. Real logo & wordmark (currently a CSS placeholder)
2. Self-hosted font files OR explicit OK to keep Google Fonts `@import`
3. Real product surfaces (app? docs? marketing-only?) so the UI kit list can be expanded beyond the generic `web` kit
4. Real illustration library (flat editorial SVGs) and any photography direction

## Index
- `README.md` — this file (brand context, content, visual foundations, iconography)
- `colors_and_type.css` — design tokens: colors + typography (base + semantic)
- `fonts/` — Libre Baskerville, Inter, JetBrains Mono (via Google Fonts CSS import — see Caveats)
- `assets/` — logos, illustrations, icon references
- `preview/` — Design System tab cards (colors, type, spacing, components)
- `ui_kits/web/` — generic editorial web UI kit (hero, article, CTA, cards, forms)
- `SKILL.md` — portable skill definition

## CONTENT FUNDAMENTALS

**Voice:** *humanismo tecnológico* — warm, confident, thoughtful. Technology in service of people, never the other way around.

**"Skin in the Game":** copy always signals commitment. The author/brand is accountable for claims. Prefer declarative, first-person-plural statements over hedged corporate language.

- ✅ "Construimos esto porque lo usamos cada día."
- ❌ "Our platform enables users to leverage..."

**Person:** *nosotros* for the brand, *tú* for the reader. Conversational but not casual. No jargon, no exclamation points, no hype.

**Casing:** Sentence case everywhere — headers, buttons, nav. Title Case only for proper nouns and brand names.

**Numbers & data:** Spelled out under ten in prose; numerals in UI. Always include units. Monospace for any technical value.

**Punctuation:** Em-dashes for pauses, Spanish guillemets «» for quotes when writing in Spanish, curly quotes "" in English. No emoji in product copy. Occasional em-dash or ellipsis for breath.

**Rhythm:** Short sentence. Then a longer one that earns its length by carrying an idea through to its end. Vary cadence.

**Examples of on-voice copy:**
- Hero: *"Herramientas que respetan tu tiempo."*
- Subhead: *"Diseñamos cada decisión pensando en quien la va a usar mañana — y en diez años."*
- CTA: *"Empezar"* · *"Leer el manifiesto"* · *"Ver cómo funciona"*
- Error: *"Algo no salió bien. Vamos a intentarlo de nuevo."*
- Empty state: *"Aquí no hay nada todavía. Es un buen lugar para empezar."*

## VISUAL FOUNDATIONS

**Color vibe.** Warm neutrals (off-white `#F9F9F7`, carbón `#333333`) anchor the page. Burnt Orange `#E07A5F` is the only interactive accent — used sparingly, never for decoration. Cobalt Blue `#2A4B7C` is reserved for titulares and moments that need gravity. Mint and Lavender are chip-only; they never become backgrounds for large surfaces.

**Type.** Libre Baskerville Bold for display and headlines — it carries the editorial, essayistic tone. Inter for everything else on screen. JetBrains Mono for code, prices, timestamps, any "technical" value. Generous line-height (1.5 body, 1.2 display). Tracking stays near zero; we don't letter-space.

**Spacing.** 4px base unit. Default gutter is 24px, section padding 64–96px on desktop. **Generous** is the rule — when in doubt, add more space, not less.

**Backgrounds.** Solid white or warm white. No gradients. No photographic hero washes. Occasional soft shape (a blurred circle of mint or lavender at ~30% opacity) for accent — never busy, never repeating patterns.

**Illustration.** Flat editorial — geometric, limited palette (brand colors only), no gradients, no shadows on illustrations themselves, no photorealistic people. Abstract shapes, objects, hands/gestures rather than faces. If people appear, they are silhouettes or simple geometric figures.

**Imagery (photo).** When real photography is used: warm cast, natural light, matte finish, no saturation pumping. Slight grain acceptable. Never blue-hour tech stock.

**Animation.** Subtle. 200–300ms ease-out for UI state changes, 400ms for enter/exit. No bounces, no springs. Fades and small translations (8–12px) only. Scroll animations off by default.

**Hover.** Text links: color shifts from carbón to Burnt Orange. Buttons: background darkens by ~8% (orange → `#C96647`). Cards: shadow depth increases one step, no translate. Cursor pointer only on interactive elements — never on text.

**Press.** Button scales to 0.98, background darkens another ~4%. No ripples.

**Borders.** 1px `#E8E6E1` for dividers and card borders when used. Never thicker than 1px in UI.

**Shadows.** Soft, diffuse, warm. Two-step system:
- `sm` — `0 2px 8px rgba(51,51,51,0.06)` for resting cards.
- `md` — `0 8px 24px rgba(51,51,51,0.08)` for hover/raised.
No hard shadows, no colored shadows, no dark-mode inner shadows.

**Radii.** 12px for cards and surfaces, 8px for buttons and inputs, 100px (pill) for chips and badges. Everything else respects this scale.

**Cards.** White on warm-white background, 12px radius, 24–32px interior padding, `sm` shadow at rest. Optional 1px border for low-elevation contexts. Never both strong shadow *and* border.

**Transparency & blur.** Used rarely. A modal backdrop is `rgba(51,51,51,0.4)`. No glassmorphism, no frosted nav bars.

**Layout rules.** Max content width 1200px. Reading measure 60–72ch. Asymmetric editorial grids preferred over rigid 12-col repetitions for marketing pages; product UI uses standard 8pt grid.

**Fixed elements.** Navigation is sticky but simple — white background, 1px bottom border on scroll, no blur. No sticky CTAs, no cookie banners designed as UI.

## ICONOGRAPHY

No custom icon set was provided. We use **Lucide** (CDN) as the substitute — stroke-based, 1.75px default weight, rounded line caps, 24px grid. Lucide matches the editorial, calm tone better than filled/glyph systems.

**Rules:**
- Stroke weight: 1.75px (Lucide default is 2; we reduce one notch for a more refined feel).
- Size: 16, 20, 24, 32px — snap to these.
- Color: inherits `currentColor`. Usually `--fg-2` (carbón suave lightened).
- Never fill. Never duotone. Never mix icon families.

**Emoji:** No. Not in UI, not in marketing copy. Allowed in user-generated content only.

**Unicode symbols:** Rare. `—` (em-dash), `·` (middle dot), `«»` (guillemets), `↗` (external link indicator) are all fine. `→` for CTAs on editorial pages is encouraged.

**Logos & illustration:** Stored in `assets/`. Flag: we have no real brand logo yet — a wordmark placeholder using Libre Baskerville Bold is included until the real mark is provided.

## Caveats

1. **No real brand assets.** No logo, product screenshots, or Figma were shared. The UI kit is a generic editorial interpretation of the tokens, not a recreation of an existing product.
2. **Fonts via Google Fonts CSS.** Libre Baskerville, Inter, and JetBrains Mono are all loaded via Google Fonts `@import` rather than self-hosted `.ttf` files. If you need offline/self-hosted, request the font files and we'll swap them in.
3. **Icon substitution.** Lucide is used as the icon system — swap once a real set is provided.
4. **Product surfaces unknown.** No list of products was given. A single `web` UI kit is included; more can be added as products are defined.
