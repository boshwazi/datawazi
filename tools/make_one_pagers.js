// Builds the client-facing service one-pagers (A4 PDF, Obel Mono embedded) into sales/one-pagers/:
//   one PDF per service, the Data health check offer sheet, and a combined "all services" PDF.
// Also builds case-study one-pagers from the CASE_STUDIES list (delivery/run/case-studies/).
// Run from the repo root:  node tools/make_one_pagers.js      (uses the machine's Playwright + Chromium)
// Client-facing: NO prices, rates, ranges or payment terms (CLAUDE.md). Durations are fine.
const fs = require('fs');
const os = require('os');
const path = require('path');
const { chromium } = require('playwright');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'sales/one-pagers');
const CS_OUT = path.join(ROOT, 'delivery/run/case-studies');
const f = (p) => 'file://' + path.join(ROOT, p);
const BOOK = 'cal.com/datawazi/fit-check';

// ---------------------------------------------------------------- content
// Headlines: line break (\n) after each comma or full stop.
const SERVICES = [
  {
    file: '01_Data_Platforms', group: 'what we build', n: '01', name: 'Data platforms',
    headline: 'One source of truth,\nsized to your budget.',
    lede: 'We bring your systems into one well-modelled place, so every report, dashboard and AI feature starts from the same numbers.',
    pains: ['Finance and sales report different revenue.', 'Every report starts with an export.', 'Nobody knows which spreadsheet is final.'],
    doHead: 'What we do',
    do: ['Map your sources and the decisions they feed', 'Choose a platform that fits your budget and team', 'Build the warehouse and a clear data model', 'Set up refresh schedules, monitoring and access control', 'Reconcile key figures against your source systems'],
    get: ['A working data platform in your own accounts', 'A documented data model and data dictionary', 'Automated, monitored refreshes', 'Role-based access with PDPA controls designed in', 'Training and a handover pack'],
    steps: [['discover', '1–2 weeks'], ['design', '~1 week'], ['build', 'weekly demos'], ['test & hand over', 'UAT, training']],
    typical: 'A first phase usually takes 6–12 weeks.',
    fit: ['Two or more systems need to agree', 'Reports take days to prepare', 'You plan to add dashboards or AI later'],
    tools: 'BigQuery, Snowflake, Microsoft Fabric, PostgreSQL, dbt, or what you already use.',
  },
  {
    file: '02_Pipelines_and_Integrations', group: 'what we build', n: '02', name: 'Pipelines & integrations',
    headline: 'Your systems,\nconnected.',
    lede: 'Scheduled, checked pipelines that move data between your ERP, CRM, finance, HR, spreadsheets and APIs, so nobody has to re-key it.',
    pains: ['Someone copies data between systems every Monday.', 'The ERP and the CRM never match.', 'When an export fails, nobody notices.'],
    doHead: 'What we do',
    do: ['List each source, its owner and how fresh it must be', 'Build scheduled, incremental pipelines', 'Add data quality checks and alerts', 'Handle databases, APIs, files and spreadsheets', 'Leave out or mask personal data you don\'t need'],
    get: ['Pipelines running in your environment', 'Alerts when a run fails or a number looks wrong', 'A source-to-target mapping document', 'A runbook for your team', 'A reconciliation report against source'],
    steps: [['map sources', 'owners, access'], ['build', 'per source'], ['check', 'quality, alerts'], ['hand over', 'runbook, training']],
    typical: 'Usually 1–2 weeks per source system.',
    fit: ['Data is copy-pasted between systems', 'You need daily, not monthly, figures', 'A dashboard or platform needs feeding'],
    tools: 'SQL Account, AutoCount, SAP, Xero, Salesforce, HubSpot, Google Sheets, Excel, REST APIs, SFTP files.',
  },
  {
    file: '03_Dashboards_and_Analytics', group: 'what we build', n: '03', name: 'Dashboards & analytics',
    headline: 'Numbers people trust,\nreconciled to source.',
    lede: 'Dashboards built around the decisions your leaders make, on agreed definitions, with every headline number checked against your systems.',
    pains: ['Month-end takes five days of copy-paste.', 'The board pack is out of date by the meeting.', 'Every manager has their own version.'],
    doHead: 'What we do',
    do: ['Start from the decisions and the questions behind them', 'Agree metric definitions with their owners', 'Design pages for each audience', 'Build on a reliable data model', 'Reconcile every headline number'],
    get: ['Live dashboards with agreed definitions', 'A metric glossary everyone can read', 'Scheduled refresh and email snapshots', 'Access by role or department where needed', 'Training for viewers and builders'],
    steps: [['questions', 'decisions, metrics'], ['wireframe', 'agree the pages'], ['build', 'weekly demos'], ['reconcile', 'sign-off, training']],
    typical: 'Usually 2–6 weeks, depending on sources.',
    fit: ['The same numbers are rebuilt by hand each month', 'Leaders want one view of the business', 'You pay for BI licences nobody uses well'],
    tools: 'Power BI, Looker Studio, Tableau, Metabase, or what you already licence.',
  },
  {
    file: '04_Workflow_Automation', group: 'what we build', n: '04', name: 'Workflow automation',
    headline: 'Less copy-paste.\nFewer chasers.',
    lede: 'We automate the reports, approvals and hand-offs that eat your team\'s week, and keep a person in the loop where it matters.',
    pains: ['Approvals live in WhatsApp and email.', 'The same report is rebuilt every week.', 'Hand-offs fall through the cracks.'],
    doHead: 'What we do',
    do: ['Map the current process and where the time goes', 'Remove steps before automating them', 'Automate reports, approvals, notifications and hand-offs', 'Keep a human sign-off where it matters', 'Log every run for audit'],
    get: ['Working automations in your own tools', 'A before-and-after process map', 'Time saved, measured after go-live', 'Error handling and alerts', 'A guide for the process owner'],
    steps: [['map', 'today\'s process'], ['simplify', 'cut steps first'], ['automate', 'weekly demos'], ['measure', 'time saved']],
    typical: 'Usually 1–4 weeks per workflow.',
    fit: ['A task repeats every week with the same steps', 'Errors come from re-typing', 'People wait days on approvals'],
    tools: 'Power Automate, Google Apps Script, Make, n8n, Zapier, or your ERP\'s own workflow features.',
  },
  {
    file: '05_Custom_Tools', group: 'what we build', n: '05', name: 'Custom tools & internal platforms',
    headline: 'Built for your process.\nNot the other way round.',
    lede: 'When no product fits and a spreadsheet has become a system, we build the internal tool your team keeps asking for.',
    pains: ['We run the operation on a 40-tab spreadsheet.', 'Off-the-shelf software almost fits.', 'The same data is keyed in three times.'],
    doHead: 'What we do',
    do: ['Work through the process with the people who use it', 'Wireframe before writing code', 'Build in short sprints with weekly demos', 'Connect to your existing systems and data', 'Secure access, audit trail and backups'],
    get: ['A working tool hosted in your environment', 'Source code and accounts you own', 'User and admin guides', 'Training for users and the system owner', 'Optional support after go-live'],
    steps: [['workshop', 'process, users'], ['wireframe', 'agree screens'], ['build', 'weekly demos'], ['launch', 'UAT, training']],
    typical: 'Usually 4–12 weeks.',
    fit: ['A spreadsheet has become a system', 'No product fits how you work', 'Several teams key in the same data'],
    tools: 'Low-code (Power Apps, AppSheet, Retool) or a custom web app, chosen for who will maintain it.',
  },
  {
    file: '06_AI_Integration', group: 'what we build', n: '06', name: 'AI integration',
    headline: 'AI that answers,\nfrom your own documents.',
    lede: 'Knowledge assistants, chatbots and AI features that work from your own documents and data, with guardrails, testing and monitoring.',
    pains: ['Staff spend hours searching policies and SOPs.', 'Customers ask the same twenty questions.', 'We tried a chatbot. It made things up.'],
    doHead: 'What we do',
    do: ['Pick one use case with a clear measure', 'Prepare and permission the documents or data', 'Build the assistant or feature with guardrails', 'Test answers against a question set before launch', 'Monitor quality, usage and running cost'],
    get: ['A proof of concept, then a production version', 'Answers that cite their sources', 'Access control matched to your roles', 'An evaluation report and monitoring', 'Usage guidance for staff (English and BM)'],
    steps: [['use case', 'one, measurable'], ['proof', '2–3 weeks'], ['production', 'guardrails, access'], ['monitor', 'quality, cost']],
    typical: 'Proof of concept in 2–3 weeks; production in 4–8 more.',
    fit: ['Answers exist in documents but are hard to find', 'The same questions come in every day', 'Data must stay in your own environment'],
    tools: 'Claude, OpenAI, Gemini, Copilot or open-weight models, in your cloud where needed.',
  },
  {
    file: '07_Strategy_and_Advice', noStd: true, group: 'advise', n: 'A', name: 'Strategy & advice',
    headline: 'Advice you can act on.\nWhoever builds it.',
    lede: 'Independent, vendor-neutral advice on data and AI: where to start, what to buy, what to stop, and how to govern it.',
    pains: ['We have a budget but no plan.', 'Three vendors, three different answers.', 'The project stalled and nobody knows why.'],
    doHead: 'Ways we advise',
    do: ['Data health check · 2 days', 'Data & AI readiness audit · 1–2 weeks', 'Data & AI strategy and roadmap', 'Tool and vendor selection', 'AI governance and usage policy', 'Second opinion on a proposal or project', 'On-call adviser, monthly'],
    get: ['Findings in plain language', 'A prioritised roadmap: impact, effort, order', 'Vendor-neutral recommendations', 'Inputs for your business case', 'A readout to your leadership team'],
    steps: [['listen', 'interviews'], ['review', 'systems, data'], ['recommend', 'roadmap'], ['read out', 'leadership']],
    typical: 'From 2 days (health check) to a few weeks (strategy).',
    fit: ['You are not sure where to start', 'You are choosing between vendors', 'Leadership needs a plan before a budget'],
    tools: 'We don\'t resell software, so our advice isn\'t tied to any vendor.',
  },
  {
    file: '08_AI_Adoption_and_Training', noStd: true, group: 'train', n: 'T', name: 'AI adoption & training',
    headline: 'Your team,\nusing AI well and safely.',
    lede: 'Hands-on workshops, playbooks and a clear AI usage policy, so people get real value from AI without putting your data at risk.',
    pains: ['Staff use AI tools with no rules.', 'A few people use it well. Most don\'t.', 'Leadership asks about AI and nobody owns it.'],
    doHead: 'What we run',
    do: ['Half-day or full-day hands-on workshops', 'Leadership AI briefing (2–3 hours)', 'A prompt playbook for your roles', 'An AI usage policy, PDPA-aware', 'A follow-up clinic for questions'],
    get: ['Workshop slides and a participant workbook', 'A prompt playbook by function', 'An AI usage policy ready to adopt', 'A feedback summary and next-step use cases', 'Exercises built on your own (safe) examples'],
    steps: [['survey', 'roles, tools'], ['tailor', 'your examples'], ['workshop', 'hands-on'], ['follow up', 'clinic, policy']],
    typical: 'Half or full day, up to 20 people per group, in-house or online.',
    fit: ['Staff already use AI informally', 'You want quick, safe wins', 'You need a policy before a wider rollout'],
    tools: 'Whichever AI tools you have approved: ChatGPT, Claude, Copilot, Gemini.',
  },
  {
    file: '09_Managed_Support', noStd: true, group: 'run', n: 'R', name: 'Managed support',
    headline: 'Live systems,\nlooked after.',
    lede: 'A monthly retainer that keeps your pipelines, dashboards and tools healthy, whoever built them, with agreed response times.',
    pains: ['The person who built it has left.', 'A pipeline broke and nobody noticed for a week.', 'Small changes wait months.'],
    doHead: 'What we do',
    do: ['Monitor pipelines, refreshes and usage', 'Fix issues within agreed response times', 'Make small changes and improvements', 'Keep documentation up to date', 'Review the roadmap with you each quarter'],
    get: ['A monthly support report', 'Agreed response times by priority', 'A set number of support hours each month', 'First call on new work', 'Three tiers: Essential, Standard, Priority'],
    steps: [['onboard', 'review, access'], ['monitor', 'daily checks'], ['fix & improve', 'within SLA'], ['report', 'monthly']],
    typical: 'Monthly, minimum three months.',
    fit: ['You have gone live and want peace of mind', 'There is no in-house data team', 'Systems built by us or by others'],
    tools: 'Works with the stack you have. We take over other vendors\' builds after a short review.',
  },
];

const HEALTH = {
  file: '00_Data_Health_Check', name: 'Data health check',
  headline: 'Data health check.\nTwo days. Clear answers.',
  lede: 'A short, fixed-scope look at your data and reporting. You get plain findings and three quick wins you can act on, whoever does the work.',
  inc: [['2 interviews', 'a leader who uses the numbers, and the person who prepares them'], ['1–2 key reports or systems', 'reviewed for accuracy, effort and risk'], ['5-page findings', 'what works, what is at risk, three quick wins, recommended next step'], ['1-hour readout', 'with your team, online or on site']],
  steps: [['day 0', 'Short call. You share the reports and read-only access (or samples).'], ['day 1', 'Interviews and review.'], ['day 2', 'Analysis and findings.'], ['within a week', 'Readout and written findings.']],
  need: ['A sponsor who owns the question', 'Two people for 60 minutes each', 'Read-only access or exported samples. No personal data needed'],
  out: ['Three quick wins, in order', 'Risks, including PDPA and key-person risk', 'An honest next step, even if it is "nothing yet"'],
};

// Case studies: add one object per approved case study, then run this script.
// Only with the client's WRITTEN approval of the final text (delivery/run/case-study-template.md). No prices, no personal data.
const CASE_STUDIES = [
  {
    file: 'TEMPLATE_Case_Study', client: '{{CLIENT_NAME or "A Malaysian {{SECTOR}} organisation"}}', sector: '{{SECTOR}}', built: '{{WHAT WE BUILT}}', timeline: '{{N}} weeks',
    headline: '{{Result in one line,}}\n{{line break after a comma.}}',
    problem: '{{2–3 sentences in business terms: what wasn\'t working and what it cost.}}',
    built_text: '{{2–3 sentences, plain language. Name the type of solution, not the stack, unless the stack matters.}}',
    results: [['{{5 → 1}}', '{{days to close month-end reporting}}'], ['{{100%}}', '{{revenue reconciled to the ledger}}'], ['{{24}}', '{{people using it every week}}']],
    how: [['{{week 1}}', '{{discovery: what we looked at}}'], ['{{weeks 2–3}}', '{{design: what was agreed}}'], ['{{weeks 4–7}}', '{{build: weekly demos}}'], ['{{week 8}}', '{{UAT, training, go-live}}']],
    quote: '{{Quote, approved in writing.}}', who: '{{Name, role, organisation}}',
  },
];

// ---------------------------------------------------------------- html
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const br = (s) => esc(s).replace(/\n/g, '<br>');
const lis = (a) => a.map((x) => `<li>${esc(x)}</li>`).join('');

const CSS = `
@font-face { font-family: "Obel Mono"; src: url("${f('brand/fonts/obel-mono/ObelMono-VF.woff2')}") format("woff2"); font-weight: 100 900; font-style: normal; }
@page { size: A4; margin: 0; }
:root { --ink:#0A0C0F; --paper:#EEF0EA; --lime:#C8FF2E; --raise:#E1E4DA; --raise-d:#161A20; --muted:#464B45; --muted-d:#B3B8B0; --line:rgba(10,12,15,.16); --line-d:rgba(238,240,234,.18); }
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body { font-family: "Obel Mono", ui-monospace, monospace; color: var(--ink); background: var(--paper); font-size: 9pt; line-height: 1.5; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.page { width: 210mm; height: 297mm; position: relative; overflow: hidden; page-break-after: always; display: flex; flex-direction: column; background: var(--paper); }
.page:last-child { page-break-after: auto; }
.top { background: var(--ink); color: var(--paper); padding: 13mm 16mm 11mm; position: relative; }
.top::before { content: ""; position: absolute; inset: 0; background-image: linear-gradient(rgba(238,240,234,.11) 1px, transparent 1px), linear-gradient(90deg, rgba(238,240,234,.11) 1px, transparent 1px); background-size: 10mm 10mm; -webkit-mask-image: radial-gradient(ellipse 80% 90% at 85% 20%, #000 20%, transparent 75%); }
.top > * { position: relative; }
.rail { display: flex; justify-content: space-between; align-items: center; font-size: 7.5pt; color: var(--muted-d); margin-bottom: 9mm; }
.rail img { height: 5.5mm; }
.kick { font-size: 8pt; color: var(--lime); margin-bottom: 3mm; }
h1 { font-size: 25pt; font-weight: 800; letter-spacing: -.04em; line-height: 1.06; margin: 0 0 4mm; }
h1 .u { color: var(--lime); }
.lede { font-size: 10pt; max-width: 160mm; margin: 0; color: var(--paper); }
.body { padding: 7mm 16mm 5mm; flex: 1; display: flex; flex-direction: column; gap: 5mm; }
h3 { font-size: 7.5pt; font-weight: 700; letter-spacing: .05em; text-transform: lowercase; color: var(--muted); margin: 0 0 2.5mm; }
.pains { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3.5mm; }
.pain { background: var(--raise); border: 1px solid var(--line); border-radius: 1.5mm; padding: 3.5mm 4mm; font-weight: 700; font-size: 9pt; line-height: 1.35; }
.cols { display: grid; grid-template-columns: 1fr 1fr; gap: 8mm; }
ul { list-style: none; margin: 0; padding: 0; }
li { padding: 1.2mm 0; border-bottom: 1px solid var(--line); display: grid; grid-template-columns: 5mm 1fr; }
li::before { content: "+"; font-weight: 800; }
.get li::before { content: "✓"; }
.steps { display: grid; grid-template-columns: repeat(4, 1fr); border: 1px solid var(--line); border-radius: 1.5mm; overflow: hidden; }
.step { padding: 3mm 3.5mm; border-right: 1px solid var(--line); }
.step:last-child { border-right: 0; }
.step b { display: block; font-size: 9pt; }
.step span { font-size: 7.5pt; color: var(--muted); }
.step i { display: block; height: .9mm; background: var(--line); margin: 2mm 0; position: relative; }
.step i::after { content: ""; position: absolute; inset: 0 auto 0 0; width: var(--p); background: var(--ink); }
.typ { font-size: 8pt; color: var(--muted); margin-top: 2mm; }
.fit li::before { content: "→"; }
.tools { font-size: 8pt; color: var(--muted); }
.cta { margin-top: auto; background: var(--lime); padding: 7mm 16mm; display: flex; justify-content: space-between; align-items: flex-end; gap: 8mm; }
.cta strong { font-size: 13pt; letter-spacing: -.02em; display: block; margin-bottom: 1mm; }
.cta small { font-size: 7.5pt; }
.cta .r { text-align: right; font-size: 8pt; line-height: 1.6; white-space: nowrap; }
.chip { display: inline-block; background: var(--ink); color: var(--lime); font-size: 7pt; font-weight: 700; padding: .5mm 1.8mm; border-radius: 1px; }
.inc { display: grid; grid-template-columns: 1fr 1fr; gap: 3.5mm; }
.inc div { background: var(--raise); border: 1px solid var(--line); border-radius: 1.5mm; padding: 4mm; }
.inc b { display: block; font-size: 11pt; letter-spacing: -.02em; margin-bottom: 1mm; }
.inc span { font-size: 8pt; color: var(--muted); }
.tl { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; border-top: 2px solid var(--ink); }
.tl div { padding: 2.5mm 3mm 0 0; font-size: 8pt; }
.tl b { display: inline-block; background: var(--ink); color: var(--lime); padding: 0 1.5mm; margin-bottom: 1.5mm; font-size: 7.5pt; }
.big3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3.5mm; }
.big3 div { border-top: 2px solid var(--ink); padding-top: 3mm; }
.big3 b { display: block; font-size: 26pt; letter-spacing: -.045em; line-height: 1; margin-bottom: 2mm; }
.big3 span { font-size: 8pt; color: var(--muted); }
blockquote { margin: 0; padding: 5mm 6mm; background: var(--ink); color: var(--paper); border-radius: 1.5mm; font-size: 11pt; line-height: 1.45; }
blockquote cite { display: block; font-style: normal; font-size: 8pt; color: var(--lime); margin-top: 3mm; }
.facts { display: flex; gap: 6mm; flex-wrap: wrap; font-size: 8pt; color: var(--muted-d); margin-top: 5mm; }
.facts b { color: var(--paper); }
p { margin: 0 0 2mm; }
`;

const head = (label) => `<div class="rail"><img src="${f('brand/logo/datawazi-wordmark-on-dark.svg')}" alt="datawazi_"><span>${esc(label)}</span></div>`;
const cta = (line = 'Start with a free 30-minute fit check.', small = 'Pricing is scoped after the fit check, in writing, before any work starts.') =>
  `<div class="cta"><div><strong>${esc(line)}</strong><small>${esc(small)}</small></div><div class="r"><b>${BOOK}</b><br>hello@datawazi.com · datawazi.com<br>linkedin.com/company/datawazi</div></div>`;
const headline = (h) => br(h) + '<span class="u">_</span>';

function servicePage(s) {
  const P = ['25%', '50%', '75%', '100%'];
  return `<section class="page">
  <div class="top">${head('datawazi.com · services')}
    <div class="kick">[${s.n}] // ${esc(s.group)} · ${esc(s.name.toLowerCase())}</div>
    <h1>${headline(s.headline)}</h1>
    <p class="lede">${esc(s.lede)}</p>
  </div>
  <div class="body">
    <div><h3>sound familiar?</h3><div class="pains">${s.pains.map((p) => `<div class="pain">“${esc(p)}”</div>`).join('')}</div></div>
    <div class="cols">
      <div><h3>${esc(s.doHead.toLowerCase())}</h3><ul>${lis(s.do)}</ul></div>
      <div class="get"><h3>what you get</h3><ul>${lis(s.get)}</ul></div>
    </div>
    <div><h3>how it runs</h3>
      <div class="steps">${s.steps.map(([a, b], i) => `<div class="step" style="--p:${P[i]}"><b>${String(i + 1).padStart(2, '0')} ${esc(a)}</b><i></i><span>${esc(b)}</span></div>`).join('')}</div>
      <div class="typ">${esc(s.typical)}${s.noStd ? '' : ' Weekly demos, docs and training are standard.'}</div>
    </div>
    <div class="cols">
      <div class="fit"><h3>a good fit if</h3><ul>${lis(s.fit)}</ul></div>
      <div><h3>works with</h3><p class="tools">${esc(s.tools)}</p><p class="tools">Vendor-neutral: we recommend what fits, not what we resell. PDPA designed in from kickoff.</p></div>
    </div>
  </div>
  ${cta()}
</section>`;
}

function healthPage(h) {
  return `<section class="page">
  <div class="top">${head('datawazi.com · offer sheet')}
    <div class="kick">[00] // the easiest place to start</div>
    <h1>${headline(h.headline)}</h1>
    <p class="lede">${esc(h.lede)}</p>
  </div>
  <div class="body">
    <div><h3>what's included</h3><div class="inc">${h.inc.map(([a, b]) => `<div><b>${esc(a)}</b><span>${esc(b)}</span></div>`).join('')}</div></div>
    <div><h3>how it runs</h3><div class="tl">${h.steps.map(([a, b]) => `<div><b>${esc(a)}</b><br>${esc(b)}</div>`).join('')}</div></div>
    <div class="cols">
      <div class="fit"><h3>what we need from you</h3><ul>${lis(h.need)}</ul></div>
      <div class="get"><h3>what you walk away with</h3><ul>${lis(h.out)}</ul></div>
    </div>
    <div class="cols">
      <div><h3>a good fit if you're asking</h3><ul class="fit">${lis(['"Where do we start?"', '"Can we trust these numbers?"', '"Is our data ready for AI?"'])}</ul></div>
      <div><h3>the fee</h3><p class="tools">One fixed fee, agreed in writing before we start. No surprises, no hourly meter.</p><p class="tools">If you want to go further, the next step could be a readiness audit, a focused build, or nothing yet. We'll say which.</p></div>
    </div>
  </div>
  ${cta('Ask for the health check.', 'Thirty minutes to confirm it fits. The fee is confirmed in writing before any work starts.')}
</section>`;
}

function caseStudyPage(c) {
  return `<section class="page">
  <div class="top">${head('datawazi.com · case study')}
    <div class="kick">[cs] // case study · ${esc(c.sector)}</div>
    <h1>${headline(c.headline)}</h1>
    <div class="facts"><span>client <b>${esc(c.client)}</b></span><span>built <b>${esc(c.built)}</b></span><span>timeline <b>${esc(c.timeline)}</b></span></div>
  </div>
  <div class="body">
    <div class="cols">
      <div><h3>the problem</h3><p>${esc(c.problem)}</p></div>
      <div><h3>what we built</h3><p>${esc(c.built_text)}</p></div>
    </div>
    ${c.how ? `<div><h3>how we worked</h3><div class="tl">${c.how.map(([a, b]) => `<div><b>${esc(a)}</b><br>${esc(b)}</div>`).join('')}</div></div>` : ''}
    <div><h3>the result</h3><div class="big3">${c.results.map(([a, b]) => `<div><b>${esc(a)}</b><span>${esc(b)}</span></div>`).join('')}</div></div>
    <blockquote>“${esc(c.quote)}”<cite>${esc(c.who)}</cite></blockquote>
  </div>
  ${cta('Have a similar problem?', 'Book a free 30-minute fit check.')}
</section>`;
}

const doc = (title, pages) => `<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><title>${esc(title)}</title><style>${CSS}</style></head><body>${pages.join('\n')}</body></html>`;

// ---------------------------------------------------------------- render
async function render(browser, title, pages, out) {
  const tmp = path.join(os.tmpdir(), `dw-onepager-${process.pid}.html`);
  fs.writeFileSync(tmp, doc(title, pages));
  const page = await browser.newPage();
  await page.goto('file://' + tmp, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const over = await page.$$eval('.page', (els) => els.filter((e) => e.scrollHeight > e.clientHeight + 1).length);
  if (over) console.warn(`  ! ${path.basename(out)}: ${over} page(s) overflow A4`);
  await page.pdf({ path: out, format: 'A4', printBackground: true, preferCSSPageSize: true });
  await page.close();
  fs.unlinkSync(tmp);
  console.log('wrote', path.relative(ROOT, out));
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  fs.mkdirSync(CS_OUT, { recursive: true });
  const browser = await chromium.launch();
  const hp = healthPage(HEALTH);
  const sp = SERVICES.map(servicePage);
  await render(browser, 'datawazi data health check', [hp], path.join(OUT, `Datawazi_${HEALTH.file}.pdf`));
  for (let i = 0; i < SERVICES.length; i++) await render(browser, `datawazi ${SERVICES[i].name}`, [sp[i]], path.join(OUT, `Datawazi_${SERVICES[i].file}.pdf`));
  await render(browser, 'datawazi services', [hp, ...sp], path.join(OUT, 'Datawazi_All_Services.pdf'));
  for (const c of CASE_STUDIES) await render(browser, 'datawazi case study', [caseStudyPage(c)], path.join(CS_OUT, `Datawazi_${c.file}.pdf`));
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
