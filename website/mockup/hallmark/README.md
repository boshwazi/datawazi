# Home page mockups (Hallmark redesign)

Two full redesigns of the home page, made with the [Hallmark](https://github.com/nutlope/hallmark) design skill. They keep the content, links and brand (ink, paper, lime, Obel Mono, the `datawazi_` logo). **The live site is unchanged.**

Open `a-console.html` or `b-ledger.html` in a browser from this folder; the previews are in `previews/`.

| | **A: Console** | **B: Ledger** |
|---|---|---|
| Feel | Dark, technical, close to today | Light, editorial, calmer |
| Hero | Headline left, the example terminal run as a large object on the right | The example run as a reconciliation table, the headline resting under it |
| Signature | The terminal run, with "diff RM0.00" highlighted | The ledger, with "diff RM0.00" in lime |
| Services | Six visual tiles (bento) + four advisory rows | One index of all ten services, build and advise together |
| Sector ticker | Kept, with a visible pause button | Dropped; sectors move into the FAQ |
| Sections | 9 (was 11) | 8 (was 11) |

## Audit of the current page (Hallmark linter, 1440 and 375 renders)
Main findings, by severity:
- **Access:** no visible keyboard focus ring; buttons 17 to 27px tall (44 to 48px recommended).
- **Template tells:** arrows glued to button labels ("book a fit check →"), middle-dot meta strings, decorative status dots, a drawn window with three dots on the terminal, and a `[nn] //` label over every heading.
- **Scale:** section headings render at 24px under a 32px hero heading on some sections; 11 sections and 617 words (target 6 to 9 sections, about 450 words).
- **Layout:** at 1920px the hero text starts 8px from the edge (no capped container).

Both mockups pass the linter with 0 failures.

## What changed in the words (for your approval)
| Before | After |
|---|---|
| datawazi designs, builds and runs the systems that help organisations work smarter. | We advise, build and run data and AI systems for Malaysian organisations. |
| book a 30-min fit check → / book a fit check → | Book a 30-min fit check / Book a fit check (no arrows) |
| what we build | See what we build |
| Where do we start? "A 2-day health check, or a 1–2 week readiness audit…" | Same, with "1 to 2" instead of a dash |
| `[01] // sound familiar?` and every other `[nn] //` label | Removed (see the decision below) |
| Who we work with section + "Not sure? ask →" | A: the ticker plus an FAQ "Is my organisation a fit?". B: the same FAQ, listing the sectors |
| Five rules cards | A: one statement line. B: a numbered list |

Dropped: the "all pipelines nominal" footer status, the big animated footer wordmark (A keeps a large static one), the window dots on the terminal. All links, the booking URL, email, LinkedIn, Instagram and both privacy pages are kept.

## Decisions for you
1. **A or B** (or A's hero with B's service index).
2. **The `[03] // label` style.** Hallmark treats a small label over every heading as a generated-looking tell, so both mockups drop it. Our brand guide lists it as a style cue. Options: drop it (as mocked up), or keep it in one place only (the nav or the footer).
3. **The hero line.** The new one adds "advise" and "Malaysian" and fits Hallmark's 12-word limit. CLAUDE.md's positioning line stays as it is unless you want it changed too.

Once you choose, the Astro site (`website/site/`) gets rebuilt to match, with the same content file.
