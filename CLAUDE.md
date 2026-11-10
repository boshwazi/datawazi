# CLAUDE.md — Datawazi working project

Context for every session in this repo. Read this first.

## The business

**Datawazi** is a Data & AI solutions consultancy based in **Malaysia**.

- **Who we serve:** ANY business, company or organisation — SMEs, corporates, public sector / GLCs, non-profits, education, healthcare, startups.
- **Never** position Datawazi as a marketing, social-media or "digital agency" business. We are a data and AI systems consultancy.
- **Positioning line:** *We design, build and run the data and AI systems that help organisations work smarter.*

### Principles (use these in messaging; they are also how we work)
1. **Business first** — decisions before technology. Start from the problem and the decision it serves.
2. **Practical, not hype** — working systems, honest scoping, no AI theatre.
3. **Built to hand over** — every project ships with documentation and training.
4. **Vendor-neutral** — we recommend what fits the client, not what we resell.
5. **PDPA-aware** — Malaysia's Personal Data Protection Act is designed in from kickoff.

## Services

**What we build**
1. Data platforms — a single source of truth, sized to budget
2. Data pipelines & integrations — ERP, CRM, finance/HR, spreadsheets, APIs & files
3. Dashboards & analytics
4. Workflow automation — reports, approvals, hand-offs
5. Custom tools & internal platforms
6. AI integration — knowledge assistants, chatbots, AI features

**Before and after the build**
- Data & AI readiness audit — paid, 1–2 weeks, ends in a roadmap
- AI adoption & training — workshops, playbooks, AI usage policy
- Managed support retainer

## Client workflow (11 steps)
1. **Client intake** — `delivery/intake/Client_Intake_Quick.xlsx` (20 questions in 6 groups: The problem, People, What they want, Data, Tech & team, Budget & timing; plus an internal "Our first read" section scoring complexity, data readiness, budget fit, fit with what we do, next step). **The first-read section must be removed before sharing with a client.**
2. **First read & fit check** — go / no-go; refer out if not a fit
3. **Discovery & audit** — paid; small, clear requests can skip straight to proposal
4. **Proposal & contract** — scope, SOW, 50% deposit
5. **Kickoff & access** — accounts, PDPA, success metrics taken from intake Q3
6. **Solution design** — architecture, wireframes
7. **Build in sprints with weekly demos** — tracks: data platform, pipelines, integrations, dashboards, custom tools, AI features
8. **Test & UAT** — reconcile numbers against source systems, sign-off
9. **Launch & handover** — docs, training, go-live
10. **Hypercare** — 2–4 weeks
11. **Run & grow** — retainer, case study; next phase loops back to discovery (step 3)

## ⚠️ Pricing is INTERNAL ONLY
Draft pricing lives in `internal/pricing/PRICING.md`.
**Never put prices, ranges, rates or payment terms into any client-facing material** — website, deck, proposals, SOW templates, emails, social posts — until the owner explicitly says pricing is approved for publication. Use "pricing on request" / "scoped after discovery" instead. Anything under `internal/` is never published or shared.

## Brand (full guide: `brand/BRAND.md`, tokens: `brand/tokens.css`)
- **Feel:** tech, modern, clean and bold.
- **Colours:** near-black `#0A0C0F` · off-white `#EEF0EA` · electric lime accent `#C8FF2E` · cobalt `#4D6BFF` (**charts/data viz only**).
- **Font:** **Obel Mono** 1.003 (SIL OFL 1.1) in `brand/fonts/obel-mono/`: `ttf/` to install, `ObelMono-VF.woff2` for web. Used for everything **except the logo**: website, Word/PDF templates, spreadsheets, slides. **The `datawazi_` wordmark and `d_` mark are set in JetBrains Mono ExtraBold** (owner's choice; `brand/fonts/jetbrains-mono/`). CSS: `font-family: "Obel Mono", ui-monospace, monospace;`. Not in the font: `Δ ↺ ⇄`, so avoid them. Send clients **PDFs** (`exports/pdf/`, font embedded), since they won't have the font for .docx.
- **Style cues:** monospace headings; terminal-style section labels like `[03] // what we build`; wordmark `datawazi_` with a lime underscore; subtle grid backgrounds.
- **Messaging source of truth:** the current pitch deck (PDF/PPTX) — expected in `source/` / `sales/deck/`. *Not yet in the repo* — ask the owner for it before writing new messaging that should match it.

## Repo layout
```
source/      Original files from planning (read-only reference)
brand/       BRAND.md, tokens.css, fonts/, logo/ (outlined SVG + PNG), templates/reference.docx
sales/       deck/, proposals/proposal-template.md, emails/email-templates.md
delivery/    README.md = the playbook: one folder per workflow step
             intake/ fit-check/ discovery/ sow/ kickoff/ design/ build/ uat/ handover/ run/
website/     site/ = the live Astro site (copy in site/src/data/content.ts), mockup/ (static HTML mockups), research/ (curated references)
internal/    pricing/, contracts/ (NDA, MSA, DPA drafts, need legal review) — NEVER client-facing
tools/       make_workbooks.py, make_logos.py, make_reference_docx.py, build-docs.sh
exports/     Generated branded .docx of client-facing templates (rebuild, don't hand-edit)
```

## Templates: how they work
- **`delivery/README.md` maps every workflow step to its templates.** Start there.
- Markdown is the source of truth; `tools/build-docs.sh` renders client-facing ones to branded Word in `exports/` and PDF in `exports/pdf/` (strips `> 🛈` internal notes).
- Placeholders are `{{UPPER_SNAKE}}`. Fees/payment terms are only ever `{{FEES_TABLE}}` / `{{PAYMENT_TERMS}}` / `{{THIRD_PARTY_COSTS_NOTE}}`, filled per client.
- Send clients `delivery/intake/Client_Intake_Client.xlsx` (no internal scoring), never `Client_Intake_Quick.xlsx`.
- Spreadsheets are generated by `tools/make_workbooks.py`; logos by `tools/make_logos.py` (JetBrains Mono ExtraBold, outlined; includes 1080×1080 squares in `brand/logo/square/`).
- Contract drafts are not legal advice; a Malaysian lawyer must review before first use.

## Working rules
- Ask before deleting or overwriting existing files.
- Language: British/Malaysian English spelling (organisation, optimise, colour). Currency: `RM`.
- Keep client-facing copy plain and practical; avoid buzzwords ("revolutionise", "unlock", "synergy").
- Malaysian context: PDPA 2010 (and 2024 amendments), data residency questions, public sector/GLC procurement norms.
