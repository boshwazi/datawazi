# Prompt playbook

**{{CLIENT_NAME}}** · version {{VERSION}} · {{DATE}} · prepared by datawazi

> 🛈 Start from this generic version. After the workshop, replace or add the best prompts participants wrote (exercise 2 in the workbook), so the playbook speaks the client's language. Export with `tools/build-docs.sh`.

Ready-to-use prompts for everyday work. Copy one, fill in the `[brackets]`, and check the result before you use it.

## The rules (read first)
1. **Use only approved tools:** {{APPROVED_AI_TOOLS}}, with your work account.
2. **Traffic light:** GREEN (public or harmless) → any approved tool · AMBER (internal, not sensitive) → company-approved tools only · RED (personal or confidential) → **never**, unless a system is approved for it. Remove names, IC numbers, phone numbers and emails first.
3. **You own the output.** Run the 6-point check: facts, numbers, names, tone, data, "would I sign it?".
4. **Mistakes or questions:** tell {{AI_POLICY_OWNER}}. Reporting is never blamed.

## The 5-part brief
**Goal** (what, for whom) · **Context** (situation, what matters) · **Material** (what to work from) · **Format** (length, tone, structure, language) · **Check** (ask questions or flag gaps first).

Ending most prompts with *"Before you start, ask me any questions you need answered."* improves the answer more than anything else.

---

## Everyone

**Reply to an email**
> Write a reply to the email below. I am [role] and the reader is [who they are, relationship]. I want to [goal: decline politely / confirm / push back on the deadline]. Keep it under [100] words, [warm / formal / firm but friendly]. Email: [paste, with names removed]

**Summarise a document**
> Summarise the document below for [audience] who has [2 minutes]. Give 5 bullets: the main point, the decisions needed, the risks, the numbers that matter, and what happens next. Quote the document where it matters. Say if anything important is unclear. Document: [paste or attach]

**Meeting notes to minutes**
> Turn these rough notes into meeting minutes. Sections: decisions, actions (table: action, owner, due date), open questions. Don't invent anything; mark gaps as [unclear]. Notes: [paste]

**Make it clearer**
> Rewrite this for [a reader outside our team / senior management / the public]. Plain English, short sentences, no jargon, same meaning. Show me the changes you made and why. Text: [paste]

**Translate**
> Translate into [Bahasa Melayu / English], [formal / conversational] register, for [audience]. Keep names, numbers and product terms unchanged. Flag any phrase that doesn't translate cleanly. Text: [paste]

**Critique my draft**
> Act as a [sceptical CFO / first-time customer / procurement officer]. Read my draft and list the 5 questions or objections you'd raise, most important first. Don't rewrite it. Draft: [paste]

## Finance
**Variance commentary**
> Here is a summary table of actual vs budget by [cost centre] for [month]. Draft 5–8 lines of management commentary: biggest variances first, likely reasons as questions for me to confirm (don't assume), and what to watch next month. Table: [paste, no customer or staff names]

**Explain a formula**
> Explain what this Excel formula does, step by step, in plain language, and suggest a simpler version if there is one: [paste formula]

## HR
**Job description**
> Draft a job description for a [role] in a [size, sector] organisation in Malaysia. Must-haves: [list]. Nice-to-haves: [list]. Sections: purpose, responsibilities, requirements, what we offer. Use inclusive, plain language. Then suggest 6 structured interview questions with what a strong answer looks like.

**Policy explainer**
> Turn this policy into a one-page FAQ for staff: 8 questions people will actually ask, with short answers that quote the policy. Policy: [paste]

> **Never** paste staff records, salaries, performance or health information. Never use AI to make decisions about people.

## Operations
**Write an SOP**
> Turn this process description into a standard operating procedure: purpose, scope, roles, numbered steps, checks, and what to do when something goes wrong. Ask me about any step that is ambiguous before writing. Process: [paste]

**Root cause**
> Here is a description of a recurring problem: [paste]. Walk through "5 whys" with me, one question at a time. Don't jump to a solution.

## Sales & customer service
**Proposal outline**
> Using only the public information below about [prospect], outline a proposal for [our service]: their likely priorities, how we help, three questions to ask in the meeting, and risks. Information: [paste from their website or annual report]

**Customer FAQ**
> From these anonymised customer questions, group them into themes and draft a clear answer for each, in [English and BM]. Questions: [paste]

## Managers
**Decision memo**
> Help me write a one-page decision memo on [decision]. Context: [paste]. Structure: the decision needed, 2–3 options, pros and cons of each, risks, recommendation, next steps. Point out any information I should gather before deciding.

**Prepare a difficult conversation**
> I need to tell [audience, no names] that [situation]. Help me plan: key message in one sentence, three points to cover, likely reactions and how to respond, and what not to say.

---

## Our best prompts
> 🛈 Add the client's own best prompts here after the workshop: who wrote it (team), the task, the prompt, and a note on what makes it work.

| Team | Task | Prompt | Why it works |
|---|---|---|---|
| {{TEAM}} | {{TASK}} | {{PROMPT}} | {{NOTE}} |

*Questions:* {{AI_POLICY_OWNER}} · *Prepared by* datawazi · hello@datawazi.com · datawazi.com
