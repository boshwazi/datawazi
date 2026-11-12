// Builds delivery/training/Datawazi_AI_Workshop.pptx: the half-day "AI at work" workshop deck
// (AI adoption & training service). Same layouts as the slide template (slides_common.js), Obel Mono only.
// Run from tools/:  npm run workshop      Then export a PDF and check fonts (only ObelMono-* allowed):
//   soffice --headless --convert-to pdf ../delivery/training/Datawazi_AI_Workshop.pptx --outdir ../delivery/training
//   pdffonts ../delivery/training/Datawazi_AI_Workshop.pdf
// Tailor per client: cover placeholders, exercise examples (slides 16–17) and the policy slide (22).
const path = require('path');
const { K, W, M, ROOT, createDeck, finishDeck } = require('./slides_common');
const OUT = path.join(ROOT, 'delivery/training/Datawazi_AI_Workshop.pptx');

async function main() {
  const { pres, T, chip, card } = await createDeck('datawazi AI at work workshop');
  const ph = (s, name, text, extra = {}) => s.addText(text, { placeholder: name, align: 'left', ...(name === 'title' ? { bold: true } : {}), ...extra });
  const cols = (n, gap = 0.35) => { const w = (W - 2 * M - (n - 1) * gap) / n; return [...Array(n)].map((_, i) => ({ x: M + i * (w + gap), w })); };
  const bl = (arr) => arr.map((t, j) => ({ text: t, options: { bullet: true, breakLine: j < arr.length - 1 } }));
  const section = (kick, title, notes) => {
    const s = pres.addSlide({ masterName: 'DW Section (dark)' });
    ph(s, 'kicker', kick); ph(s, 'title', title);
    if (notes) s.addNotes(notes);
    return s;
  };
  // Row of cards: items = [[chipText, heading, body], ...]
  const cardRow = (s, items, { dark = false, y = 2.55, h = 3.5, n = items.length, gap = 0.3, head = 17, body = 13 } = {}) => {
    items.forEach(([c, hd, bd], i) => {
      const col = cols(n, gap)[i];
      card(s, col.x, y, col.w, h, dark);
      if (c) chip(s, c, col.x + 0.25, y + 0.28, dark);
      s.addText(hd, T({ x: col.x + 0.25, y: y + (c ? 0.8 : 0.3), w: col.w - 0.5, h: 0.8, fontSize: head, bold: true, color: dark ? K.paper : K.ink, valign: 'top' }));
      s.addText(bd, T({ x: col.x + 0.25, y: y + (c ? 1.65 : 1.15), w: col.w - 0.5, h: h - (c ? 1.85 : 1.35), fontSize: body, color: dark ? K.mutedD : K.mutedL, valign: 'top', paraSpaceAfter: 4 }));
    });
  };
  const footNote = (s, text, dark) => s.addText(text, T({ x: M, y: 6.25, w: W - 2 * M, h: 0.4, fontSize: 12, color: dark ? K.lime : K.mutedL }));

  // 1. Cover
  let s = pres.addSlide({ masterName: 'DW Title (dark)' });
  ph(s, 'kicker', '[00] // AI at work · workshop');
  ph(s, 'title', 'Using AI well,\nand safely_');
  ph(s, 'subtitle', 'For {{CLIENT_NAME}}');
  ph(s, 'meta', '{{DATE}} · half day · facilitated by datawazi');
  s.addNotes('Welcome. Housekeeping: breaks, phones, Wi-Fi. Ask everyone to log in to {{APPROVED_AI_TOOL}} now so the first exercise starts on time.');

  // 2. Agenda
  s = pres.addSlide({ masterName: 'DW Title only (light)' });
  ph(s, 'kicker', '[01] // today');
  ph(s, 'title', 'Three and a half hours.\nMostly hands-on.');
  const agenda = [['09:00', 'Welcome & goals'], ['09:15', 'What AI is good at (and bad at)'], ['09:40', 'Safe use: the traffic light'], ['10:00', 'The 5-part brief'], ['10:30', 'Break'], ['10:45', 'Your turn: everyday tasks'], ['11:20', 'Your turn: your role'], ['11:55', 'Check before you send'], ['12:10', 'Use cases & your policy'], ['12:25', 'Commitments & close']];
  agenda.forEach(([t, a], i) => {
    const c = cols(2, 0.6)[Math.floor(i / 5)]; const y = 2.5 + (i % 5) * 0.72;
    s.addShape(pres.shapes.LINE, { x: c.x, y: y + 0.62, w: c.w, h: 0, line: { color: K.lineL, width: 0.75 } });
    s.addText(t, T({ x: c.x, y, w: 1.1, h: 0.55, fontSize: 14, bold: true, color: K.ink, valign: 'middle' }));
    s.addText(a, T({ x: c.x + 1.2, y, w: c.w - 1.2, h: 0.55, fontSize: 15, color: a === 'Break' ? K.mutedL : K.ink, valign: 'middle' }));
  });
  s.addNotes('Adjust times to the client. For a full day, add: AI with spreadsheets and data, a team prompt library, and a use-case scoring workshop (see the facilitator guide).');

  // 3. Goals
  s = pres.addSlide({ masterName: 'DW Title only (light)' });
  ph(s, 'kicker', '[02] // by the end of today');
  ph(s, 'title', 'Three things\nyou will leave with.');
  cardRow(s, [['use', 'Get real work done', 'Draft, summarise, rewrite and analyse with AI on tasks from your own job.'], ['safe', 'Know what not to share', 'A simple rule for which information can go into which AI tool.'], ['check', 'Trust, but verify', 'A short checklist so nothing goes out wrong under your name.']]);
  s.addNotes('Ask: who has used an AI tool this week? For what? Note two or three answers on the whiteboard and come back to them in the exercises.');

  // 4–6. What AI is good at
  section('[03] // what it is', 'What AI is good at.\nAnd what it isn\'t.', 'Keep this short and concrete. The goal is the right mental model, not the technology.');

  s = pres.addSlide({ masterName: 'DW Two columns (light)' });
  ph(s, 'kicker', '[03] // good at · bad at');
  ph(s, 'title', 'A fast, tireless assistant.\nNot an expert.');
  ph(s, 'leftHead', 'Good at');
  s.addText(bl(['First drafts: emails, reports, proposals', 'Summarising long documents and meetings', 'Rewriting: shorter, clearer, another tone', 'Translating, e.g. English ↔ Bahasa Melayu', 'Ideas, outlines and checklists', 'Explaining formulas, code and jargon']), { placeholder: 'left', align: 'left' });
  ph(s, 'rightHead', 'Bad at');
  s.addText(bl(['Facts it wasn\'t given (it guesses, confidently)', 'Exact numbers and calculations', 'Recent events and your internal knowledge', 'Knowing your context unless you tell it', 'Judgement, accountability, final decisions', 'Keeping secrets you paste into the wrong tool']), { placeholder: 'right', align: 'left' });

  s = pres.addSlide({ masterName: 'DW Title only (dark)' });
  ph(s, 'kicker', '[03] // how it works, in one line');
  ph(s, 'title', 'It predicts.\nIt doesn\'t know.');
  cardRow(s, [['in', 'Your brief', 'Your instructions, context and any material you paste in.'], ['model', 'Predicts the next words', 'Trained on huge amounts of text. Fluent, fast, often right.'], ['out', 'Confident text', 'Sounds certain either way. Right and wrong look the same.'], ['you', 'Check it', 'You own what you send. Verify facts, numbers and names.']], { dark: true, n: 4, h: 3.2 });
  footNote(s, 'Better input → better output. That is most of today.', true);

  // 7–9. Safe use
  section('[04] // safe use', 'Safe use first.', 'Do this before any hands-on work. If the client already has an AI policy, use their rules here instead.');

  s = pres.addSlide({ masterName: 'DW Title only (light)' });
  ph(s, 'kicker', '[04] // the traffic light');
  ph(s, 'title', 'Before you paste,\ncheck the colour.');
  [['green · go', 'Public or harmless', 'Published information, generic text, your own writing with no names or numbers.', 'Any approved AI tool.', K.lime],
   ['amber · check', 'Internal, not sensitive', 'Internal procedures, anonymised or summary data, drafts for internal use.', 'Only company-approved tools, with a work account.', K.raiseL],
   ['red · stop', 'Personal or confidential', 'Names with IC numbers, salaries, health or customer data, contracts, unreleased financials, passwords.', 'Never, unless a specific system is approved for it.', K.ink]].forEach(([c, h, ex, rule, fill], i) => {
    const col = cols(3)[i]; const dk = fill === K.ink;
    s.addShape(pres.shapes.RECTANGLE, { x: col.x, y: 2.55, w: col.w, h: 3.6, fill: { color: fill }, line: { color: dk ? K.ink : K.lineL, width: 0.75 }, objectName: 'traffic light card' });
    s.addText(c, T({ x: col.x + 0.25, y: 2.8, w: col.w - 0.5, h: 0.35, fontSize: 12, bold: true, color: dk ? K.lime : K.ink }));
    s.addText(h, T({ x: col.x + 0.25, y: 3.25, w: col.w - 0.5, h: 0.5, fontSize: 18, bold: true, color: dk ? K.paper : K.ink }));
    s.addText(ex, T({ x: col.x + 0.25, y: 3.85, w: col.w - 0.5, h: 1.3, fontSize: 12, color: dk ? K.mutedD : K.mutedL, valign: 'top' }));
    s.addText(rule, T({ x: col.x + 0.25, y: 5.3, w: col.w - 0.5, h: 0.7, fontSize: 13, bold: true, color: dk ? K.paper : K.ink, valign: 'top' }));
  });
  s.addNotes('Quick quiz: read out five examples and ask the room for the colour. e.g. a press release (green), last month\'s sales by region (amber), a staff list with IC numbers (red), a customer complaint email with the customer\'s name (red: remove the name and it can become amber).');

  s = pres.addSlide({ masterName: 'DW Two columns (light)' });
  ph(s, 'kicker', '[04] // PDPA in 60 seconds');
  ph(s, 'title', 'Personal data is still\npersonal data in a chatbot.');
  ph(s, 'leftHead', 'What the law expects');
  s.addText(bl(['Use personal data only for the purpose it was collected for', 'Keep it secure, including from tools you send it to', 'Think twice before it leaves Malaysia', 'Amended in 2024: breach notification, data protection officers, higher penalties']), { placeholder: 'left', align: 'left' });
  ph(s, 'rightHead', 'What that means for you');
  s.addText(bl(['Remove names, IC numbers, phone numbers and emails first', 'Use made-up or anonymised examples', 'Use only the AI tools your organisation approves', 'Unsure? Treat it as red and ask']), { placeholder: 'right', align: 'left' });
  s.addNotes('This is awareness, not legal advice. Point to the client\'s own data protection officer or policy where one exists.');

  // 10–13. The brief
  section('[05] // prompting', 'Brief it like\na new colleague.', 'Frame: a capable new hire on day one. Smart, but knows nothing about you. What would you tell them?');

  s = pres.addSlide({ masterName: 'DW Title only (light)' });
  ph(s, 'kicker', '[05] // the 5-part brief');
  ph(s, 'title', 'Goal. Context. Material.\nFormat. Check.');
  cardRow(s, [['1', 'Goal', 'What you want and who it is for.'], ['2', 'Context', 'Your role, the situation, what matters.'], ['3', 'Material', 'The text, notes or data to work from (traffic light!).'], ['4', 'Format', 'Length, tone, structure, language.'], ['5', 'Check', 'Ask it to flag gaps, assumptions or questions first.']], { n: 5, gap: 0.25, h: 3.0, head: 18, body: 12 });
  footNote(s, 'You won\'t need all five every time. Missing context is the most common reason for a weak answer.');

  s = pres.addSlide({ masterName: 'DW Two columns (light)' });
  ph(s, 'kicker', '[05] // before · after');
  ph(s, 'title', 'Same task.\nVery different answer.');
  ph(s, 'leftHead', 'Weak');
  s.addText([{ text: '"Write an email about the delay."', options: { breakLine: true } }, { text: ' ', options: { breakLine: true } }, { text: 'Generic, wrong tone, invents reasons, needs a full rewrite.', options: { color: K.mutedL } }], { placeholder: 'left', align: 'left' });
  ph(s, 'rightHead', 'Strong');
  s.addText([{ text: '"Write a short, apologetic email to a long-standing customer (goal). Their order is 5 days late because a supplier shipment was held at port (context). Key facts: new date 28 Nov, free delivery on this order (material). Under 120 words, warm but professional, in English (format). Ask me if anything is unclear before writing (check)."', options: {} }], { placeholder: 'right', align: 'left', fontSize: 13 });

  s = pres.addSlide({ masterName: 'DW Title only (dark)' });
  ph(s, 'kicker', '[05] // keep going');
  ph(s, 'title', 'The first answer\nis a first draft.');
  cardRow(s, [['refine', '"Shorter."', '"Half the length, keep the three key points."'], ['tone', '"Warmer."', '"More formal, for a government client."'], ['shape', '"As a table."', '"Columns: issue, owner, due date."'], ['language', '"In BM."', '"Translate to Bahasa Melayu, formal register."'], ['critic', '"What\'s missing?"', '"What would a sceptical CFO ask?"']], { dark: true, n: 5, gap: 0.25, h: 2.9, head: 16, body: 12 });

  // 14–16. Hands-on
  section('[06] // hands-on', 'Your turn.', 'Pairs work best: one types, one critiques, then swap. Walk the room. Collect good prompts for the playbook.');

  s = pres.addSlide({ masterName: 'DW Title only (light)' });
  ph(s, 'kicker', '[06] // exercise 1 · 30 min');
  ph(s, 'title', 'Everyday tasks.\nPick two.');
  cardRow(s, [['A', 'The email', 'Reply to a difficult email (made-up or anonymised). Workbook, exercise 1.'], ['B', 'The summary', 'Summarise a long public document into 5 bullets for your manager.'], ['C', 'The meeting', 'Turn rough notes into minutes with actions, owners and dates.'], ['D', 'The rewrite', 'Make a dense paragraph clear for someone outside your team.']], { n: 4, h: 3.0 });
  footNote(s, 'Use the 5-part brief. Write down your best prompt in the workbook. Traffic light applies.');

  s = pres.addSlide({ masterName: 'DW Title only (light)' });
  ph(s, 'kicker', '[06] // exercise 2 · 30 min');
  ph(s, 'title', 'Your role.\nOne real task.');
  cardRow(s, [['finance', 'Variance commentary', 'Draft commentary from a summary table (no client names).'], ['HR', 'Job description', 'Draft a JD and interview questions from a short brief.'], ['operations', 'SOP', 'Turn a process description into a step-by-step SOP.'], ['sales', 'Proposal outline', 'Outline a proposal from public information on a prospect.'], ['managers', 'Decision memo', 'Lay out options, risks and a recommendation.']], { n: 5, gap: 0.25, h: 3.0, head: 15, body: 12 });
  footNote(s, 'Tailor these to the client\'s teams. Pre-survey answers tell you which roles are in the room.');
  s.addNotes('Debrief: ask two or three people to share the prompt that worked best and why. Add them to the client\'s prompt playbook.');

  // 17–18. Checking
  section('[07] // checking', 'Check before\nyou send.', 'The most important habit of the day.');

  s = pres.addSlide({ masterName: 'DW Two columns (light)' });
  ph(s, 'kicker', '[07] // the 6-point check');
  ph(s, 'title', 'Your name is on it.\nNot the AI\'s.');
  ph(s, 'leftHead', 'Before it goes out');
  s.addText(bl(['Facts: true? From a source you trust?', 'Numbers: recalculated, not copied', 'Names, dates, titles: correct?', 'Tone: right for this reader?', 'Data: nothing red in it?', 'Would you sign it without the AI?']), { placeholder: 'left', align: 'left' });
  ph(s, 'rightHead', 'Where it goes wrong');
  s.addText(bl(['Made-up facts, references and quotes', 'Out-of-date information', 'Biased or one-sided framing', 'Confident tone hiding uncertainty', 'Sensitive data pasted into the wrong tool']), { placeholder: 'right', align: 'left' });

  // 19–22. Make it stick
  section('[08] // make it stick', 'Make it stick.', 'Move from individual tips to team habits.');

  s = pres.addSlide({ masterName: 'DW Title only (light)' });
  ph(s, 'kicker', '[08] // use-case shortlist');
  ph(s, 'title', 'Where should your team\nuse AI first?');
  const q = [['quick wins', 'high value · easy', 'Start this week.', true], ['projects', 'high value · harder', 'Plan properly. May need a build.', false], ['nice to have', 'low value · easy', 'Let people try.', false], ['park', 'low value · harder', 'Not now.', false]];
  q.forEach(([h, sub, t, hl], i) => {
    const c = cols(2, 0.3)[i % 2]; const y = 2.5 + Math.floor(i / 2) * 1.85;
    s.addShape(pres.shapes.RECTANGLE, { x: c.x, y, w: c.w, h: 1.65, fill: { color: hl ? K.lime : K.raiseL }, line: { color: K.lineL, width: 0.75 }, objectName: 'quadrant' });
    s.addText(h, T({ x: c.x + 0.3, y: y + 0.25, w: c.w - 0.6, h: 0.45, fontSize: 18, bold: true, color: K.ink }));
    s.addText(sub + '  ·  ' + t, T({ x: c.x + 0.3, y: y + 0.85, w: c.w - 0.6, h: 0.5, fontSize: 13, color: K.ink }));
  });
  s.addNotes('Group exercise (workbook, exercise 3): each table lists 5 tasks, scores value and ease 1–5, and places them. Collect the quick wins; they become the follow-up list.');

  s = pres.addSlide({ masterName: 'DW Content (light)' });
  ph(s, 'kicker', '[08] // our AI rules');
  ph(s, 'title', '{{CLIENT_NAME}} AI rules,\non one slide.');
  s.addText(bl(['Approved tools: {{APPROVED_AI_TOOLS}}. Use a work account', 'Traffic light: red data never goes into AI tools without approval', 'A person checks every output before it is used or sent', 'Say when AI wrote most of something that goes outside', 'No AI for final decisions about people (hiring, performance, credit)', 'Questions or mistakes: tell {{AI_POLICY_OWNER}}. No blame for reporting']), { placeholder: 'body', align: 'left' });
  s.addNotes('Replace with the client\'s own policy. If they have none, this slide previews the AI usage policy template we leave with them.');

  s = pres.addSlide({ masterName: 'DW Title only (dark)' });
  ph(s, 'kicker', '[08] // commitments');
  ph(s, 'title', 'One task.\nThis week.');
  cardRow(s, [['write', 'Your task', 'One real task you will use AI for this week. Write it in the workbook.'], ['share', 'Your best prompt', 'Post it to the team\'s prompt library or channel.'], ['check', 'Your habit', 'The 6-point check, every time.']], { dark: true });

  // 23. Close
  s = pres.addSlide({ masterName: 'DW Close (lime)' });
  ph(s, 'kicker', '[--] // thank you');
  ph(s, 'title', 'Use it well.\nUse it safely.\nKeep the human in charge.');
  ph(s, 'body', 'You\'ll receive: the workbook, the prompt playbook and the AI usage policy.\nhello@datawazi.com · datawazi.com · cal.com/datawazi/fit-check');
  s.addNotes('Hand out the feedback form (facilitator guide). Remind them of the follow-up clinic date if one is booked.');

  await finishDeck(pres, OUT);
}

main().catch((e) => { console.error(e); process.exit(1); });
