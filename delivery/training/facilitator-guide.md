# AI at work workshop: facilitator guide (internal)

> 🛈 Internal: for whoever runs the workshop. Not sent to clients. Pricing for workshops lives only in `internal/pricing/PRICING.md`.

## The kit
| File | Who sees it | Purpose |
|---|---|---|
| `Datawazi_AI_Workshop.pptx` / `.pdf` (build: `cd tools && npm run workshop`) | client | Half-day deck, 23 slides, speaker notes on most slides |
| `participant-workbook.md` | client | Exercises, traffic light, 5-part brief, 6-point check, commitments |
| `prompt-playbook.md` | client | Ready-to-use prompts by function. Add the client's best prompts after the session |
| `ai-usage-policy-template.md` | client | Policy to tailor and hand over |
| this guide | us only | Run sheet, prep, survey, feedback |
| `../../sales/one-pagers/Datawazi_08_AI_Adoption_and_Training.pdf` | prospect | Service one-pager |

Export the Markdown files to branded Word and PDF with `tools/build-docs.sh`. Send clients PDFs.

## Formats
| Format | Length | Group | Notes |
|---|---|---|---|
| **Half-day workshop** | 3.5 hours | up to 20 | The deck as built |
| **Full-day workshop** | 6.5 hours | up to 20 | Half day + the three modules below |
| **Leadership AI briefing** | 2–3 hours | executives | Slides 1–9, then use-case shortlist (slide 20) and policy (21); add a 30-min discussion on risks, governance and where to invest |
| **Follow-up clinic** | 60–90 min | anyone | 2–4 weeks later: questions, prompt sharing, update the playbook |

**Full-day modules (afternoon):** (1) AI with spreadsheets and data: explaining formulas, cleaning lists, describing a pivot table (safe, made-up data) · (2) build the team's prompt library together · (3) use-case scoring workshop in depth, ending in 3 quick wins with owners.

## Two weeks before
☐ Confirm the date, venue or link, group size and roles in the room
☐ Confirm **which AI tools are approved** and that every participant has a working (preferably work) account. If none: agree one tool and green-only material for the day
☐ Ask whether the client has an AI or data protection policy. If yes, use their rules on slides 8 and 21
☐ Send email 15 (joining instructions + survey) from `sales/emails/email-templates.md`
☐ Create the pre-survey (Google Forms or Microsoft Forms, questions below)
☐ No client data on our laptops or in our AI accounts (security policy: no client data in AI tools without written approval)

## Three days before
☐ Read the survey answers. Tailor exercise 2 (slide 16) to the roles in the room, and pick 2–3 examples from their answers
☐ Fill the cover, policy slide and workbook placeholders. Search for `{{`
☐ Prepare **safe, made-up sample material** for each exercise (an angry customer email, a long public report, rough meeting notes, a dense paragraph, a summary budget table). Never real client data
☐ Print workbooks (or share the PDF) and feedback forms
☐ Test the venue screen and Wi-Fi, and the AI tool on the venue network

## Run sheet (half day)
| Time | Slides | Block | Facilitator notes |
|---|---|---|---|
| 09:00 | 1–3 | Welcome & goals | Ask who used AI this week, for what. Write answers up |
| 09:15 | 4–6 | Good at · bad at | Live demo: ask for something it can't know (e.g. their own last board decision). Show the confident wrong answer |
| 09:40 | 7–9 | Safe use | Traffic light quiz with 5 examples. Stress: unsure = red |
| 10:00 | 10–13 | The 5-part brief | Live demo of weak → strong on the same task |
| 10:30 | | Break | |
| 10:45 | 14–15 | Exercise 1 | Pairs. Walk the room; collect good prompts |
| 11:20 | 16 | Exercise 2 | By role. Debrief 2–3 people |
| 11:55 | 17–18 | Checking | Show one output with a planted error; who finds it? |
| 12:10 | 19–21 | Use cases & policy | Exercise 3 in groups, collect the quick wins |
| 12:25 | 22–23 | Commitments & close | Everyone writes one task. Hand out feedback forms |

## Pre-survey (5 minutes)
1. Your team and role
2. How often do you use AI tools for work today? (never · tried it · weekly · daily)
3. Which tools? (list the approved ones + "other")
4. Three tasks that take up too much of your week
5. What worries you about using AI at work?
6. What would make today worth your time?

## Feedback form (2 minutes, at the end)
1. Overall, how useful was the session? (1–5)
2. How confident are you using AI for your work now? Before: (1–5) After: (1–5)
3. Do you know what information you must not put into AI tools? (yes · not sure)
4. The most useful thing today
5. One thing we should change
6. Would you recommend this session to a colleague? (0–10)
7. May we quote your answer to 4 (no name)? (yes · no)

## After the session (within 3 working days)
☐ Send the deck PDF, workbook, prompt playbook (with their best prompts added) and the tailored AI usage policy
☐ Send a one-page summary to the sponsor: attendance, confidence before → after, top quick wins, policy status, recommended next step (clinic, policy adoption, or a use case to scope: link back to step 3 of the workflow)
☐ Log the feedback scores in the sales pipeline notes; ask for a testimonial if scores are high (email 16 works for training too)
☐ Invoice per `internal/finance/BILLING.md` (workshops are 100% upfront, so this should already be paid)
