// Builds sales/deck/Datawazi_Capabilities_Deck.pptx: the client-facing capabilities deck
// (show at or send after a fit check). Same layouts as the slide template (slides_common.js).
// Run from tools/:  npm run deck
// Client-facing: NO prices, rates or payment terms (CLAUDE.md).
const path = require('path');
const { K, FONT, W, M, ROOT, createDeck, finishDeck } = require('./slides_common');
const OUT = path.join(ROOT, 'sales/deck/Datawazi_Capabilities_Deck.pptx');

async function main() {
  const { pres, T, chip, card } = await createDeck('datawazi capabilities');
  const ph = (s, name, text, extra = {}) => s.addText(text, { placeholder: name, align: 'left', ...(name === 'title' ? { bold: true } : {}), ...extra });
  const cols = (n, gap = 0.35) => { const w = (W - 2 * M - (n - 1) * gap) / n; return [...Array(n)].map((_, i) => ({ x: M + i * (w + gap), w })); };

  // 1. Cover
  pres.addSection({ title: 'Intro' });
  let s = pres.addSlide({ masterName: 'DW Title (dark)', sectionTitle: 'Intro' });
  ph(s, 'kicker', '[00] // capabilities');
  ph(s, 'title', 'Data & AI,\nbuilt to work_');
  ph(s, 'subtitle', 'datawazi designs, builds and runs the systems that help organisations work smarter.');
  ph(s, 'meta', 'datawazi · data & AI solutions · Malaysia · datawazi.com');
  s.addNotes('Open with the one-line positioning. Then ask what made them book the call: their problem, in their words, is the thread for the rest of the deck.');

  // 2. The problem
  s = pres.addSlide({ masterName: 'DW Title only (light)', sectionTitle: 'Intro' });
  ph(s, 'kicker', '[01] // sound familiar?');
  ph(s, 'title', "The data exists.\nStraight answers don't.");
  [['reporting', 'Month-end takes five days of copy-paste.'], ['trust', 'Three departments.\nThree versions of revenue.'], ['ai', 'Everyone wants AI.\nNobody knows for what.']].forEach(([tag, q], i) => {
    const c = cols(3)[i];
    card(s, c.x, 2.6, c.w, 3.4, false);
    chip(s, tag, c.x + 0.3, 2.9, false);
    s.addText(q, T({ x: c.x + 0.3, y: 3.5, w: c.w - 0.6, h: 2.2, fontSize: 20, bold: true, color: K.ink, valign: 'top' }));
  });
  s.addNotes('Ask which of these is closest to their situation. Most clients pick one immediately.');

  // 3. What we build
  pres.addSection({ title: 'What we do' });
  s = pres.addSlide({ masterName: 'DW Title only (dark)', sectionTitle: 'What we do' });
  ph(s, 'kicker', '[02] // what we build');
  ph(s, 'title', 'Six things we build.\nSized to what you need.');
  const builds = [
    ['01', 'data platforms', 'A single source of truth,\nsized to your budget.'],
    ['02', 'pipelines & integrations', 'ERP, CRM, finance, HR, spreadsheets, APIs and files, connected.'],
    ['03', 'dashboards & analytics', 'Numbers people trust, reconciled to source.'],
    ['04', 'workflow automation', 'Reports, approvals and hand-offs without the manual work.'],
    ['05', 'custom tools', 'The internal tool your team keeps wishing for.'],
    ['06', 'AI integration', 'Assistants and AI features that answer from your own documents.'],
  ];
  builds.forEach(([n, lab, txt], i) => {
    const c = cols(3)[i % 3]; const y = 2.45 + Math.floor(i / 3) * 2.15;
    card(s, c.x, y, c.w, 1.95, true);
    s.addText([{ text: n + ' ', options: { color: K.lime, bold: true } }, { text: '/ ' + lab, options: { color: K.mutedD } }], T({ x: c.x + 0.3, y: y + 0.25, w: c.w - 0.6, h: 0.35, fontSize: 11 }));
    s.addText(txt, T({ x: c.x + 0.3, y: y + 0.7, w: c.w - 0.6, h: 1.1, fontSize: 15, bold: true, color: K.paper, valign: 'top' }));
  });
  s.addNotes('Most first projects are one of these, sized small: e.g. one pipeline plus one dashboard. Point to the one that matches their problem.');

  // 4. Advise · train · run
  s = pres.addSlide({ masterName: 'DW Title only (light)', sectionTitle: 'What we do' });
  ph(s, 'kicker', '[03] // advise · train · run');
  ph(s, 'title', 'We advise,\nand we build.');
  [['before the build', 'Health check & audit', ['data health check', 'readiness audit', 'a roadmap you keep']],
   ['any time', 'Strategy & advice', ['data & AI roadmap', 'tool & vendor selection', 'AI governance', 'on-call adviser']],
   ['alongside', 'AI adoption & training', ['hands-on workshops', 'team playbooks', 'AI usage policy']],
   ['after go-live', 'Managed support', ['monitoring & fixes', 'small changes', 'monthly report']]].forEach(([when, ttl, pts], i) => {
    const c = cols(4, 0.3)[i];
    card(s, c.x, 2.6, c.w, 3.6, false);
    chip(s, when, c.x + 0.25, 2.9, false);
    s.addText(ttl, T({ x: c.x + 0.25, y: 3.45, w: c.w - 0.5, h: 0.75, fontSize: 16, bold: true, color: K.ink, valign: 'top' }));
    s.addText(pts.map((p, j) => ({ text: p, options: { bullet: true, breakLine: j < pts.length - 1 } })), T({ x: c.x + 0.25, y: 4.3, w: c.w - 0.5, h: 1.7, fontSize: 12, color: K.ink, valign: 'top', paraSpaceAfter: 6 }));
  });
  s.addNotes('Advice stands on its own: a health check, audit, roadmap or vendor selection is useful even if someone else builds. If the path is unclear or the data is messy, start with the health check or the readiness audit.');

  // 5. How we work
  pres.addSection({ title: 'How we work' });
  s = pres.addSlide({ masterName: 'DW Title only (dark)', sectionTitle: 'How we work' });
  ph(s, 'kicker', '[04] // how we work');
  ph(s, 'title', 'Five phases.\nNo surprises.');
  const phases = [['fit', 0.2, ['Fit check call', 'Intake questions']], ['discover', 0.4, ['Discovery & audit', 'Proposal & SOW']], ['build', 0.7, ['Kickoff & access', 'Solution design', 'Weekly sprints & demos', 'Test & sign-off']], ['launch', 0.9, ['Handover & training', 'Hypercare']], ['run', 1, ['Support', 'Next phase']]];
  const pw = (W - 2 * M) / 5;
  phases.forEach(([name, p, steps], i) => {
    const x = M + i * pw;
    card(s, x, 2.55, pw, 3.2, true);
    s.addText(name, T({ x: x + 0.25, y: 2.8, w: pw - 0.5, h: 0.4, fontSize: 18, bold: true, color: K.paper }));
    s.addShape(pres.shapes.RECTANGLE, { x: x + 0.25, y: 3.35, w: pw - 0.5, h: 0.06, fill: { color: K.lineD }, line: { type: 'none' }, objectName: 'phase bar track' });
    s.addShape(pres.shapes.RECTANGLE, { x: x + 0.25, y: 3.35, w: (pw - 0.5) * p, h: 0.06, fill: { color: K.lime }, line: { type: 'none' }, objectName: 'phase bar' });
    s.addText(steps.map((st, j) => ({ text: st, options: { breakLine: j < steps.length - 1 } })), T({ x: x + 0.25, y: 3.65, w: pw - 0.5, h: 1.9, fontSize: 13, color: K.paper, valign: 'top', paraSpaceAfter: 8 }));
  });
  s.addText('A demo every week · every number reconciled to your systems · docs and training at handover', T({ x: M, y: 6.0, w: W - 2 * M, h: 0.4, fontSize: 12, color: K.lime }));
  s.addNotes('Stress weekly demos (no black box) and reconciliation (numbers they can defend in a board meeting).');

  // 6. What you can expect
  s = pres.addSlide({ masterName: 'DW Two columns (light)', sectionTitle: 'How we work' });
  ph(s, 'kicker', '[05] // working with us');
  ph(s, 'title', 'What you get.\nWhat we need from you.');
  ph(s, 'leftHead', 'What you get');
  const bl = (arr) => arr.map((t, j) => ({ text: t, options: { bullet: true, breakLine: j < arr.length - 1 } }));
  s.addText(bl(['A clear scope and fixed deliverables before work starts', 'Working software every week, shown in a demo', 'Numbers reconciled against your source systems', 'Documentation and training for your team', '2–4 weeks of close support after go-live', 'Everything built in your accounts, owned by you']), { placeholder: 'left', align: 'left' });
  ph(s, 'rightHead', 'What we need from you');
  s.addText(bl(['A sponsor who can make decisions quickly', 'A day-to-day contact for questions', 'Access to the systems in scope', 'People to test before go-live']), { placeholder: 'right', align: 'left' });

  // 7. Principles
  s = pres.addSlide({ masterName: 'DW Title only (light)', sectionTitle: 'How we work' });
  ph(s, 'kicker', '[06] // principles');
  ph(s, 'title', 'Five rules.\nEvery project.');
  [['Business first', 'Decisions before technology.'], ['Practical', 'Working systems, not hype.'], ['Handed over', 'Docs and training, always.'], ['Vendor-neutral', 'What fits, not what sells.'], ['PDPA-aware', 'Designed in from day one.']].forEach(([h, t], i) => {
    const c = cols(5, 0.25)[i];
    card(s, c.x, 2.6, c.w, 2.9, false);
    s.addShape(pres.shapes.RECTANGLE, { x: c.x + 0.25, y: 2.85, w: 0.55, h: 0.36, fill: { color: K.lime }, line: { type: 'none' }, objectName: 'number chip' });
    s.addText('0' + (i + 1), T({ x: c.x + 0.25, y: 2.85, w: 0.55, h: 0.36, fontSize: 12, bold: true, color: K.ink, align: 'center', valign: 'middle' }));
    s.addText(h, T({ x: c.x + 0.25, y: 3.45, w: c.w - 0.5, h: 0.8, fontSize: 16, bold: true, color: K.ink, valign: 'top' }));
    s.addText(t, T({ x: c.x + 0.25, y: 4.35, w: c.w - 0.5, h: 0.9, fontSize: 13, color: K.mutedL, valign: 'top' }));
  });

  // 8. Who we work with
  pres.addSection({ title: 'Why datawazi' });
  s = pres.addSlide({ masterName: 'DW Title only (dark)', sectionTitle: 'Why datawazi' });
  ph(s, 'kicker', '[07] // who we work with');
  ph(s, 'title', 'Any organisation,\nany sector.');
  const sectors = [['SMEs', 'Our numbers live in twelve spreadsheets.'], ['Corporates', 'Every department has its own revenue.'], ['Public sector & GLCs', 'Board reporting takes three weeks.'], ['Non-profits', 'Funders want impact data, fast.'], ['Education', "Enrolment and finance don't talk."], ['Healthcare', 'Patient data must stay protected.'], ['Startups', 'AI in the product, not a science project.'], ['Not sure?', "Tell us the problem. If it isn't for us, we'll say so."]];
  sectors.forEach(([n, q], i) => {
    const c = cols(4, 0.25)[i % 4]; const y = 2.45 + Math.floor(i / 4) * 1.95;
    const last = i === 7;
    s.addShape(pres.shapes.RECTANGLE, { x: c.x, y, w: c.w, h: 1.75, fill: { color: last ? K.lime : K.raise }, line: { color: last ? K.lime : K.lineD, width: 0.75 }, objectName: 'sector card' });
    s.addText(n, T({ x: c.x + 0.25, y: y + 0.22, w: c.w - 0.5, h: 0.5, fontSize: 15, bold: true, color: last ? K.ink : K.paper }));
    s.addText(last ? q : '“' + q + '”', T({ x: c.x + 0.25, y: y + 0.8, w: c.w - 0.5, h: 0.8, fontSize: 11, color: last ? K.ink : K.mutedD, valign: 'top' }));
  });

  // 9. Why datawazi
  s = pres.addSlide({ masterName: 'DW Title only (light)', sectionTitle: 'Why datawazi' });
  ph(s, 'kicker', '[08] // why datawazi');
  ph(s, 'title', 'We build.\nYou own it.');
  [['We advise, and we build', 'Advice that ends in working systems, not a slide deck.'], ['Sized to you', "From an SME's first dashboard to a GLC data platform."], ['Your team can run it', 'Handover, docs and training are standard. No lock-in.'], ['Safe with your data', 'PDPA-aware, read-only where possible, data kept where you need it.']].forEach(([h, t], i) => {
    const c = cols(2)[i % 2]; const y = 2.45 + Math.floor(i / 2) * 2.05;
    card(s, c.x, y, c.w, 1.85, false);
    chip(s, 'message ' + (i + 1), c.x + 0.3, y + 0.25, false);
    s.addText(h, T({ x: c.x + 0.3, y: y + 0.72, w: c.w - 0.6, h: 0.45, fontSize: 18, bold: true, color: K.ink }));
    s.addText(t, T({ x: c.x + 0.3, y: y + 1.2, w: c.w - 0.6, h: 0.5, fontSize: 13, color: K.mutedL }));
  });

  // 10. Ways to start
  pres.addSection({ title: 'Next step' });
  s = pres.addSlide({ masterName: 'DW Title only (dark)', sectionTitle: 'Next step' });
  ph(s, 'kicker', '[09] // ways to start');
  ph(s, 'title', 'Three ways to start.\nScoped after a fit check.');
  [['health check or audit', '2 days · 1–2 weeks', 'Not sure where to start, or the data is messy. Ends in clear next steps and a roadmap you keep.'],
   ['focused build', 'typically 4–8 weeks', 'A clear problem: e.g. one pipeline and dashboard, or one automated workflow.'],
   ['AI workshop', 'half or full day', 'Get your team using AI well and safely, with a usage policy everyone understands.']].forEach(([n, dur, t], i) => {
    const c = cols(3)[i];
    card(s, c.x, 2.6, c.w, 3.2, true);
    chip(s, n, c.x + 0.3, 2.9, true);
    s.addText(dur, T({ x: c.x + 0.3, y: 3.5, w: c.w - 0.6, h: 0.5, fontSize: 18, bold: true, color: K.paper }));
    s.addText(t, T({ x: c.x + 0.3, y: 4.15, w: c.w - 0.6, h: 1.4, fontSize: 13, color: K.mutedD, valign: 'top' }));
  });
  s.addText('Ongoing support available after any build · pricing is scoped to each organisation', T({ x: M, y: 6.05, w: W - 2 * M, h: 0.4, fontSize: 12, color: K.lime }));
  s.addNotes('Never quote prices on the call. Say: "I will send a clear recommendation and quotation within two working days."');

  // 11. The name
  s = pres.addSlide({ masterName: 'DW Title only (light)', sectionTitle: 'Next step' });
  ph(s, 'kicker', '[--] // the name');
  ph(s, 'title', 'datawazi_\nData made clear.');
  [['Swahili', 'wazi = clear, open', 'Take messy data and make it clear enough to decide with.'], ['Malay', 'wazi ≈ wazir, a trusted adviser', 'The role we play for the organisations we work with.']].forEach(([lang, h, t], i) => {
    const c = cols(2)[i];
    card(s, c.x, 2.7, c.w, 2.6, false);
    chip(s, lang, c.x + 0.3, 3.0, false);
    s.addText(h, T({ x: c.x + 0.3, y: 3.55, w: c.w - 0.6, h: 0.5, fontSize: 20, bold: true, color: K.ink }));
    s.addText(t, T({ x: c.x + 0.3, y: 4.2, w: c.w - 0.6, h: 0.9, fontSize: 14, color: K.mutedL, valign: 'top' }));
  });

  // 12. Close
  s = pres.addSlide({ masterName: 'DW Close (lime)', sectionTitle: 'Next step' });
  ph(s, 'kicker', '[--] // start here');
  ph(s, 'title', 'One problem.\nThirty minutes.\nA clear next step.');
  ph(s, 'body', 'Book a free fit check: cal.com/datawazi/fit-check\nhello@datawazi.com · datawazi.com · linkedin.com/company/datawazi');

  await finishDeck(pres, OUT);
}

main().catch((e) => { console.error(e); process.exit(1); });
