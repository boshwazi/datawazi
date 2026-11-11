# Decks

| File | What it is |
|---|---|
| `Datawazi_Slide_Template.pptx` | **Branded slide template** in Obel Mono: 8 layouts + a 12-slide example proposal. Use for proposals, SOW walkthroughs, audit readouts and fit-check decks |
| `Datawazi_Slide_Template.pdf` | Preview of the template |
| `Datawazi_Capabilities_Deck.pptx` / `.pdf` | **Client-facing capabilities deck** (12 slides): problem, what we build, services, how we work, principles, sectors, why datawazi, ways to start, the name, booking. Show at or send after a fit check. No prices. Rebuild: `cd tools && npm run deck` |
| *(pitch deck)* | The current pitch deck is the messaging source of truth. It still needs to be added here |

## Using the template
1. **Install Obel Mono** first (`brand/fonts/obel-mono/ttf/`, double-click each file → Install). Without it, PowerPoint and Keynote substitute another font.
2. Open the template and **File → Save As** a new file per client: `YYYY-MM-DD_client_proposal_v1.pptx`.
3. Replace every `{{PLACEHOLDER}}` (search for `{{`). Delete example slides you don't need.
4. New slides: **Home → New Slide** and pick a **DW** layout:
   - **DW Title (dark):** cover
   - **DW Section (dark):** section divider
   - **DW Content (light / dark):** title + text
   - **DW Title only (light / dark):** title + your own content (cards, tables, charts)
   - **DW Two columns (light)**
   - **DW Close (lime):** final slide
5. Change the kicker label for the deck type: `[00] // proposal`, `// statement of work`, `// readiness readout`, `// fit check`.
6. **Send clients a PDF** (File → Export → PDF): the font is embedded, so it looks right everywhere.

## Brand rules in slides
- Headlines: line break after each comma or full stop.
- Lime text only on dark slides; on light slides lime is a background (chips, highlights).
- Charts: cobalt `#4D6BFF` only. The chart on slide 8 is sample data.
- **No prices in the template.** Fill `{{FEES_TABLE}}` / `{{PAYMENT_TERMS}}` per client from `internal/pricing/PRICING.md`.

Rebuild after design changes: `cd tools && npm install && npm run slides`.
