# Fonts

Currently loaded via Google Fonts CSS `@import` in `../colors_and_type.css`:

- **Libre Baskerville** — Bold 700 (display/headlines)
- **Inter** — 400, 500, 600, 700 (UI + body)
- **JetBrains Mono** — 400, 500 (code / technical data)

## ⚠ Substitution flag

All three are loaded from Google Fonts rather than self-hosted `.ttf` files. If you need:
- Offline rendering
- Self-hosted WOFF2 (for privacy/performance)
- Licensed variants

…please provide the font files and we'll drop them in this folder and swap `@import` for `@font-face` declarations.
