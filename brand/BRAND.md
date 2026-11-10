# Datawazi brand guide (v0.1)

**Feel:** tech, modern, clean, bold. A terminal that a CFO would trust.
**One line:** We design, build and run the data and AI systems that help organisations work smarter.

---

## 1. Wordmark

```
datawazi_
```
- Lowercase, set in the brand mono, bold (700–800).
- The trailing underscore is **always lime `#C8FF2E`**; the letters are off-white on dark or near-black on light.
- The underscore may blink (cursor) in digital contexts — 1s step animation, respect `prefers-reduced-motion`.
- Clear space: the width of one character on every side. Minimum size 14px / 6mm.
- Don't: capitalise it, change the underscore colour, add a tagline lock-up inside the clear space, put it on cobalt.

## 2. Colour

| Token | Hex | Use |
|---|---|---|
| Ink | `#0A0C0F` | Primary background; text on light |
| Paper | `#EEF0EA` | Text on dark; light-mode background, documents |
| Lime | `#C8FF2E` | Accent: CTAs, wordmark underscore, key numbers, active states |
| Cobalt | `#4D6BFF` | **Charts and data viz only** — never for UI chrome or text |

- Ratio guide: ~80% ink, ~17% paper, ≤3% lime. Lime loses its punch if overused.
- Lime text only on ink (contrast ≈ 16:1). **Never lime text on paper** — fails contrast. On paper, use ink text with a lime highlight/underline block.
- Charts: series 1 cobalt, series 2 lime, then tints of paper. Gridlines `rgba(238,240,234,.1)`.

## 3. Typography

- **Brand face:** [Obel Mono](https://typographic.systems/obel-mono) — free, SIL OFL. Place files in `brand/fonts/obel-mono/`.
- **Stand-in (in repo now):** JetBrains Mono 400/500/700/800 in `brand/fonts/jetbrains-mono/` (OFL).
- CSS stack: `"Obel Mono", "JetBrains Mono", ui-monospace, monospace`.
- Headings: mono, 700–800, tight tracking (−0.02 to −0.04em), lowercase or sentence case.
- Body: mono 400 at 15–17px, line-height 1.6. For long documents (proposals, SOWs) a clean sans (e.g. Inter) for body text is acceptable; headings stay mono.

## 4. Graphic language

- **Terminal labels** introduce every section: `[03] // what we build` — index in brackets, `//`, lowercase title, muted colour with lime index.
- **Grid backgrounds:** 48px hairline grid at ~6–10% opacity, fading out with a radial mask. Subtle, never busy.
- **Prompts & cursors:** `>` `$` `_` used as bullets or interaction hints.
- **Hairlines over boxes:** 1px lines `rgba(238,240,234,.1)`, radius 4px max. No soft drop shadows, no gradients except the grid fade and a faint lime glow behind hero CTAs.
- **Icons:** simple line or ASCII-style. No 3D blobs, no stock robots, no glowing brains.
- **Photography:** if used — real people at real work, desaturated, never "hands on a hologram".

## 5. Voice

- Plain, confident, specific. Say what will change: *"month-end report in 1 day instead of 5."*
- Business first, then tech. Lead with the decision, not the stack.
- Avoid: revolutionise, unlock, leverage, synergy, cutting-edge, AI-powered everything.
- We serve every kind of organisation — never sound like a marketing/social-media agency.
- Spelling: British/Malaysian English. Currency: RM. **No prices in public material** (see `CLAUDE.md`).

## 6. Quick reference

```
bg      #0A0C0F    text   #EEF0EA    accent #C8FF2E    charts #4D6BFF
font    Obel Mono → JetBrains Mono → monospace
label   [NN] // section name
mark    datawazi_
```
