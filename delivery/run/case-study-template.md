# Case study: {{SHORT_TITLE}}

> 🛈 **When:** ask at the end of hypercare (step 10), when the results are fresh. Use email 16 in `sales/emails/email-templates.md`. Interview the sponsor for 20 minutes, draft, and send it back for **written** approval of the final text. Nothing is published before that.
> 🛈 **Rules:** no prices, fees or day counts that let someone work out the price. No personal data. No screenshots with real figures unless the client approves them. If the client prefers, anonymise it as "a Malaysian {{SECTOR}} organisation with {{SIZE}} staff".
> 🛈 **Outputs (one interview gives you all five):** (1) this document, (2) a PDF one-pager: add the case study to `CASE_STUDIES` in `tools/make_one_pagers.js` and run `node tools/make_one_pagers.js`; the PDF lands in `delivery/run/case-studies/` (see the template PDF there), (3) one deck slide, (4) a web snippet, (5) a LinkedIn post.

**Client:** {{CLIENT_NAME / anonymised description}}  ·  **Sector:** {{SECTOR}}  ·  **Built:** {{e.g. data platform + dashboards}}  ·  **Timeline:** {{N}} weeks

## The problem
{{2–3 sentences in business terms: what wasn't working and what it cost (time, errors, risk, missed decisions).}}

## What we built
{{2–3 sentences in plain language. Name the type of solution, not the stack, unless the stack matters to the reader.}}

## How we worked
| When | What happened |
|---|---|
| {{Week 1}} | {{Discovery: systems and reports reviewed, success measures agreed}} |
| {{Weeks 2–3}} | {{Design: what was agreed and with whom}} |
| {{Weeks 4–7}} | {{Build: weekly demos, what changed along the way}} |
| {{Week 8}} | {{UAT, training, go-live}} |

## The result
| Measure | Before | After |
|---|---|---|
| {{e.g. Days to close month-end reporting}} | {{5}} | {{1}} |
| {{e.g. Revenue figures that match the ledger}} | {{3 versions}} | {{1, reconciled}} |
| {{e.g. People using it each week}} | {{0}} | {{24}} |

- {{Qualitative result, e.g. "one agreed revenue figure across departments"}}

## In their words
> "{{Quote}}". {{Name, role}} *(approved {{DATE}})*

## Web snippet (≤ 40 words)
{{Sector}} · {{Built}} · **{{Result}}**

## Deck slide
Title: {{Result in one line, line break after the comma.}} · three numbers from the table above · the quote · client name or anonymised description.

## LinkedIn post (≤ 120 words)
{{Hook: the problem in one line.}}

{{What we built, in two sentences.}}

{{The result, as 2–3 short lines with the numbers.}}

{{Thanks to the client team, tagged only with their permission.}}

Have a similar problem? Book a fit check: cal.com/datawazi/fit-check

---

## Interview guide (20 minutes, with the sponsor)
1. Before we started, what was the problem costing you? (time, money, risk, frustration)
2. What had you already tried?
3. Why did you choose to work with datawazi?
4. What surprised you during the project, good or bad?
5. What is different now, day to day? Can you put a number on it?
6. Who uses it, and how often?
7. What would you tell a peer considering the same project?
8. May we use your name and organisation, or would you prefer we anonymise it?

## Approval
**Approved for publication by:** {{Client name, role}} · **Date:** {{DATE}} · **How:** {{email / signature}}
**Approved uses:** ☐ website ☐ deck ☐ PDF one-pager ☐ LinkedIn ☐ named ☐ anonymised
