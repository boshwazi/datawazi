# datawazi brand guide (v0.1)

**Feel:** tech, modern, clean, bold. A terminal that a CFO would trust.
**One line:** We design, build and run the data and AI systems that help organisations work smarter.

---

## 0. Name

- **Always lowercase: datawazi**, in every sentence, including at the start ("datawazi helps…"). Never *Datawazi*, *DataWazi* or *DATAWAZI*.
- Logo form: **datawazi_** (logo files only). Legal documents: the registered name exactly as on the SSM certificate.
- **Name story (confirmed): both meanings.** *wazi* is Swahili for "clear, open", so the name reads as "data made clear". To Malaysian ears it also echoes *wazir* (minister, trusted adviser), a "data adviser". datawazi makes data clear and acts as the trusted adviser who helps organisations decide with it.

## 1. Wordmark

```
datawazi_
```
- Lowercase, set in **JetBrains Mono ExtraBold (800)**, the logo font. Don't retype it in Obel Mono; use the logo files.
- The trailing underscore is **lime `#C8FF2E`** on dark backgrounds; the letters are off-white on dark, near-black on light.
- The underscore may blink (cursor) in digital contexts — 1s step animation, respect `prefers-reduced-motion`.
- Clear space: the width of one character on every side. Minimum size 14px / 6mm.
- Don't: capitalise it, change the underscore colour, add a tagline lock-up inside the clear space, put it on cobalt.
- **Exception, light backgrounds:** on off-white or white the underscore is ink, because lime fails contrast there. On a lime tile everything is ink.

**Files (`brand/logo/`, outlined, so they need no font):**

| File | Use |
|---|---|
| `datawazi-wordmark-on-dark.svg` / `.png` | Dark backgrounds (transparent) |
| `datawazi-wordmark-on-light.svg` / `.png` | Light backgrounds, documents (transparent) |
| `datawazi-wordmark-ink-tile.svg` / `.png` | Social banners, slide covers, email signature |
| `datawazi-wordmark-lime-tile.svg` | Bold accent placements (use rarely) |
| `datawazi-monogram.svg`, `-512.png`, `-32.png` | Favicon, app icon (`d_`) |
| `square/datawazi-square-full-{ink,lime,paper}.svg/.png` | 1080×1080 full wordmark: social posts, marketing tiles, profile images where the name should show |
| `square/datawazi-square-short-{ink,lime,paper}.svg/.png` | 1080×1080 `d_` mark: social profile pictures (fits the circle crop) |

Default for profiles: **short, ink**. Use lime sparingly (campaigns, launch posts); paper for light layouts and print.

Generated from JetBrains Mono ExtraBold with `python3 tools/make_logos.py` (outlined, so no font needed).

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

- **Brand face: [Obel Mono](https://typographic.systems/obel-mono)** 1.003, SIL OFL 1.1 (free for commercial use). Files in `brand/fonts/obel-mono/`.
- **Install on your computer:** `brand/fonts/obel-mono/ttf/` (double-click → Install) to use it in Word, Excel, PowerPoint, Keynote, Canva, Figma.
- **Web:** `ObelMono-VF.woff2` (variable, weights 100–900). CSS stack: `"Obel Mono", ui-monospace, monospace`.
- **Logo exception:** the wordmark uses JetBrains Mono ExtraBold (see §1). Obel Mono is for everything else.
- **Weights:** ExtraBold 800 for headlines · Bold 700 for subheads · Regular 400 for body.
- Headings: tight tracking (−0.02 to −0.04em), lowercase or sentence case. Body: 400 at 15–17px, line-height 1.6.
- **Client documents:** send the PDF (font embedded). People without the font installed see a fallback in .docx/.xlsx.
- **Missing characters:** `Δ ↺ ⇄` aren't in the font. Use `diff`, `↻`, `←/→` instead.

### Slides
**Every slide uses Obel Mono, without exception:** titles, body text, tables, charts, bullets and speaker notes. Start new decks from `sales/deck/Datawazi_Slide_Template.pptx`, and install Obel Mono before editing. If your computer lacks the font, PowerPoint or Keynote will substitute another. Send decks as PDF so the font travels with them. The `datawazi_` logo on slides is an image (JetBrains Mono, the logo exception).

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
font    Obel Mono (ExtraBold 800 / Bold 700 / Regular 400) · logo: JetBrains Mono ExtraBold
label   [NN] // section name
mark    datawazi_
```
