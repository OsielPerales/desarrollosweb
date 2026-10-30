# Web UI Kit

Generic editorial marketing/blog site built from the design tokens. No product was specified, so this is a **representative** surface — an essayist publication — that exercises every component class in the system.

## Components
- `Button.jsx` — primary / secondary / ghost
- `Chip.jsx` — mint / lavender / neutral / solid / accent
- `Nav.jsx` — sticky white nav with wordmark + links + CTA
- `Hero.jsx` — editorial hero with soft blurred mint/lavender shapes
- `ArticleCard.jsx` — image block + tag + title + excerpt + meta
- `ArticleGrid.jsx` — 3-column grid with section heading and archive link
- `Quote.jsx` — pull quote, serif bold, guillemet opener, mono attribution
- `Newsletter.jsx` — warm-bg form with focus ring + submitted state
- `Footer.jsx` — cobalt footer with three link columns

## Interactive click-through
Open `index.html`. Click any article card → reads a full article view with back. Submit newsletter → confirmation state.

## Notes
`index.html` inlines all components for reliable single-file preview. The `.jsx` files are the **source of truth**; modify them and mirror the change into `index.html` (or convert `index.html` to per-script imports).
