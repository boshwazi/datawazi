# Website research — curated references for datawazi_

**Status (2026-11-10):** None of the reference sites could be opened live from the cloud session — the network policy blocks them (`navbar.gallery`, `footer.design`, `cta.gallery`, `supahero.io`, `bentogrids.com`, … all fail DNS). This curation is based on what each gallery is known for and the recurring patterns in them, filtered hard for **our** brief: a dark, monospace, technical, trustworthy B2B consultancy that sells to SMEs *and* GLCs.
➡️ To do a live pass (screenshots + specific example sites), allow those hosts in the environment's network settings and ask again.

Legend: ✅ use in v1 mockup · 🔜 later · ❌ deliberately avoid

---

## 1. UI component galleries

### navbar.gallery — navigation
| Pattern | Verdict | Why / how |
|---|---|---|
| Thin sticky bar, transparent → solid ink + backdrop blur on scroll | ✅ | Stays out of the way of the hero; blur keeps grid visible |
| Wordmark left, 4–5 links centre, one primary CTA right | ✅ | `datawazi_` · services · how we work · principles · faq · **[book a fit check]** |
| Section links styled as indexed mono labels (`01 services`) | ✅ | Ties nav to `[NN] //` section labels |
| Status pill in nav ("● taking new projects") | ✅ | Terminal flavour + soft urgency, no pricing |
| Mega-menu | ❌ | Only 9 offers — a menu is overkill on a one-pager |
| Floating pill nav centered | 🔜 | Nice on scroll-heavy sites; revisit for multi-page site |
| Mobile: full-screen overlay menu with big mono links | ✅ | Easy thumb targets |

### supahero.io — hero sections
| Pattern | Verdict | Why / how |
|---|---|---|
| Big left-aligned statement headline + supporting line + 2 CTAs | ✅ | Positioning line is strong enough to be the hero |
| Product-proof visual on the right (terminal / UI snippet) | ✅ | We don't have a product, so show a **pipeline run** in a terminal: sources → reconcile → dashboard live. Proves "we build systems" |
| Subtle grid / dot background with radial fade | ✅ | Brand style cue |
| Logo cloud under hero | 🔜 | No client logos yet → replace with a **sector ticker** (SMEs · GLCs · healthcare …) which also kills the "marketing agency" read |
| Full-bleed 3D / gradient blob | ❌ | Reads as hype, clashes with "practical not hype" |
| `100vh` hero | ❌ | Size to content so services peek above the fold |

### bentogrids.com — bento layouts
| Pattern | Verdict | Why / how |
|---|---|---|
| Asymmetric bento for capabilities: 1 large cell + mixed small cells | ✅ | 6 "what we build" services; Data platform = hero cell |
| Each cell carries a tiny *live-looking* artefact, not an icon | ✅ | mini architecture diagram, cobalt bar chart, chat exchange, approval flow, integration list |
| Stat cells ("5 days → 1 day") | ✅ | Use outcome examples from intake Q3 language, clearly framed as examples |
| Hover: border turns lime, artefact animates | ✅ | Small reward, no layout shift |
| Bento used for *everything* | ❌ | Use once (services). Process = timeline, principles = list |

### cta.gallery — call-to-action sections
| Pattern | Verdict | Why / how |
|---|---|---|
| Full-width closing band with one huge line + one button | ✅ | "What's the one thing that would make the biggest difference?" (intake Q8) |
| CTA framed as a low-risk first step | ✅ | "30-min fit check · no cost · no slides" |
| Inline mini-form (email + one question) | 🔜 | Becomes the web intake form later |
| Fake scarcity / countdowns | ❌ | Off-brand for public sector buyers |

### footer.design — footers
| Pattern | Verdict | Why / how |
|---|---|---|
| Oversized wordmark bleeding off the bottom | ✅ | `datawazi_` at ~18vw with the lime underscore — memorable sign-off |
| 3–4 short link columns + location line | ✅ | Services / Company / Contact; "Kuala Lumpur, Malaysia · PDPA-aware" |
| "System status" line | ✅ | `● all pipelines nominal` — playful, on-theme |
| Newsletter sign-up | 🔜 | Only once there is content to send |

### 404s.design — not-found pages
| Pattern | Verdict | Why / how |
|---|---|---|
| On-theme joke + clear route home | ✅ | Mock query returning 0 rows: `SELECT * FROM pages WHERE path = '/…' → 0 rows`. See `website/mockup/404.html` |
| Interactive mini-game | ❌ | Fun, but costs more than it's worth now |

---

## 2. Full app & website references

- **mobbin.com** [BOTH] — Best used later for the **web intake form** and client portal flows: multi-step forms, progress steppers, file upload, review-and-submit screens. 🔜
- **recent.design** [BOTH] — Browse for current dark B2B / dev-tool landing pages to sanity-check our hero and bento against what's live now. 🔜 (live pass)
- **styles.refero.design** [WEB] — Publishes site styles as `DESIGN.md` files for AI tools. ✅ *Adopted the idea:* our `brand/BRAND.md` + `brand/tokens.css` play the same role — feed them to any AI builder (v0, Lovable, Framer AI) so output stays on-brand.

## 3. Motion & interaction

Rule: **one orchestrated moment + small rewards.** Everything respects `prefers-reduced-motion`.

| Source | Take | Verdict |
|---|---|---|
| designspells.com | Blinking `_` cursor on the wordmark | ✅ |
| designspells.com | Copy-email button that flips to `copied ✓` | ✅ |
| designspells.com | Bento hover: lime border + artefact animates | ✅ |
| 60fps.design (mostly iOS) | Hero terminal lines "type in" once on load (the one orchestrated moment) | ✅ |
| 60fps.design | Spring-y counters on stats | ❌ — ours aren't real metrics yet |
| prompt-motion.com | Short looping hero video from a prompt (data flowing through a grid) | 🔜 — for socials / deck, not the site v1 |

## 4. Brand & presentation

- **brandguidelines.net** — Structure our guide like the good ones: logo → colour → type → graphic language → voice → do/don't. ✅ Applied in `brand/BRAND.md` v0.1. Next: add a do/don't visual sheet.
- **deck.gallery** — For the deck refresh: one idea per slide, big numbers, consistent section labels. Our `[NN] // label` system should carry from deck → site → proposals. 🔜

## 5. AI prompts, templates & skills

| Source | Use for us |
|---|---|
| getlayers.ai [WEB] | Prompted 3D scenes / backgrounds — 🔜 maybe an animated grid/particle background; keep it subtle |
| jiro.build [WEB] | Section prompts for AI site builders — useful once we pick a builder (Framer / Webflow / v0) |
| v0.app/templates [WEB] | Next.js + Tailwind starters — ✅ **recommended build path**: port this mockup to a v0/Next.js template, deploy on Vercel |
| skillry.dev (web-design skills) | Agent skills for building sites — evaluate when we move from mockup to production |
| thepromptmania.com [OTHER] | Image prompts for social/OG images; keep to brand rules (no robots, no glowing brains) |

---

## Decisions carried into the mockup (`website/mockup/index.html`)
1. Sticky blur nav with status pill + one CTA.
2. Left-aligned statement hero + animated pipeline terminal + sector ticker (instead of logos).
3. Bento for the 6 builds; plain cards for the 3 before/after services.
4. 11-step workflow as a phased timeline (Fit → Discover → Build → Launch → Run, looping back).
5. Principles as a numbered list (they are a real ordered set from the brief).
6. FAQ answers "how much?" **without prices** (internal-only rule).
7. Closing CTA using intake Q8 language; oversized wordmark footer with status line.
8. Single theme: dark (brand-defined).

## Open questions for the owner
- Domain + contact email (placeholder `hello@datawazi.my` used).
- Real client examples / anonymised case studies for the stats.
- The pitch deck — still missing; copy should be re-checked against it.
