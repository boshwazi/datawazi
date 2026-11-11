// Builds sales/deck/Datawazi_Slide_Template.pptx: datawazi's branded slide template.
// Run from tools/:  npm install && npm run slides
// Typeface: Obel Mono (install brand/fonts/obel-mono/ttf/ to see it). Logo: outlined PNGs from brand/logo/.
// Never put prices into this template: fees are {{FEES_TABLE}} / {{PAYMENT_TERMS}} placeholders (see CLAUDE.md).
const path = require('path');
const { K, FONT, W, M, ROOT, createDeck, finishDeck } = require('./slides_common');
const OUT = path.join(ROOT, 'sales/deck/Datawazi_Slide_Template.pptx');

async function main() {
  const { pres, T, chip, card } = await createDeck('datawazi slide template');
  // ---------- Example proposal ----------
  pres.addSection({ title: 'Cover' });
  let s = pres.addSlide({ masterName: 'DW Title (dark)', sectionTitle: 'Cover' });
  s.addText('[00] // proposal', { placeholder: 'kicker', align: 'left' });
  s.addText('{{PROJECT_TITLE}}', { placeholder: 'title', bold: true, align: 'left' });
  s.addText('For {{CLIENT_NAME}}', { placeholder: 'subtitle', align: 'left' });
  s.addText('{{DATE}} · ref {{PROPOSAL_REF}} · prepared by datawazi', { placeholder: 'meta', align: 'left' });
  s.addNotes('COVER. Use for proposals, SOW walkthroughs, audit readouts and fit-check decks: change the kicker ([00] // proposal, // statement of work, // readiness readout). Replace every {{PLACEHOLDER}} before sending. Delete example slides you do not need. New slides: Home → New Slide → pick a "DW" layout.');

  pres.addSection({ title: 'Summary' });
  s = pres.addSlide({ masterName: 'DW Title only (light)', sectionTitle: 'Summary' });
  s.addText('[01] // summary', { placeholder: 'kicker', align: 'left' });
  s.addText('You told us the problem.\nHere is the fix.', { placeholder: 'title', bold: true, align: 'left' });
  const cw = (W - 2 * M - 2 * 0.35) / 3;
  [['you told us', '{{PROBLEM}}'], ['we will build', '{{SOLUTION}}'], ['so that', '{{OUTCOME}}']].forEach(([lab, txt], i) => {
    const x = M + i * (cw + 0.35);
    card(s, x, 2.6, cw, 3.7, false);
    chip(s, lab, x + 0.3, 2.9, false);
    s.addText(txt, T({ x: x + 0.3, y: 3.5, w: cw - 0.6, h: 2.5, fontSize: 18, bold: true, color: K.ink, valign: 'top' }));
  });
  s.addNotes('One sentence each. PROBLEM: the client\'s own words from intake Q1. SOLUTION: what we will build. OUTCOME: the business result (intake Q3).');

  s = pres.addSlide({ masterName: 'DW Title only (light)', sectionTitle: 'Summary' });
  s.addText('[02] // what success looks like', { placeholder: 'kicker', align: 'left' });
  s.addText('Three measures.\nAgreed at kickoff.', { placeholder: 'title', bold: true, align: 'left' });
  [['{{TARGET_1}}', '{{MEASURE_1}}', 'today: {{BASELINE_1}}'], ['{{TARGET_2}}', '{{MEASURE_2}}', 'today: {{BASELINE_2}}'], ['{{TARGET_3}}', '{{MEASURE_3}}', 'today: {{BASELINE_3}}']].forEach(([big, lab, base], i) => {
    const x = M + i * (cw + 0.35);
    card(s, x, 2.6, cw, 3.7, false);
    s.addText(big, T({ x: x + 0.3, y: 2.95, w: cw - 0.6, h: 1.3, fontSize: 30, bold: true, color: K.ink, valign: 'top', fit: 'shrink' }));
    s.addText(lab, T({ x: x + 0.3, y: 4.45, w: cw - 0.6, h: 0.9, fontSize: 16, color: K.ink, valign: 'top' }));
    s.addText(base, T({ x: x + 0.3, y: 5.55, w: cw - 0.6, h: 0.45, fontSize: 12, color: K.mutedL }));
  });
  s.addNotes('Big text = the target (e.g. "1 day"). Measure = what it is (e.g. "time to produce the monthly report"). Baseline from intake Q3.');

  pres.addSection({ title: 'Scope & plan' });
  s = pres.addSlide({ masterName: 'DW Section (dark)', sectionTitle: 'Scope & plan' });
  s.addText('[03] // scope & plan', { placeholder: 'kicker', align: 'left' });
  s.addText('What we will build,\nand how.', { placeholder: 'title', bold: true, align: 'left' });

  s = pres.addSlide({ masterName: 'DW Title only (light)', sectionTitle: 'Scope & plan' });
  s.addText('[04] // deliverables', { placeholder: 'kicker', align: 'left' });
  s.addText('What you get.', { placeholder: 'title', bold: true, align: 'left' });
  const hdr = (t) => ({ text: t, options: { bold: true, color: K.paper, fill: { color: K.ink } } });
  const rows = [
    [hdr('#'), hdr('Deliverable'), hdr('Description'), hdr('Accepted when')],
    ['D1', '{{DELIVERABLE}}', '{{DESCRIPTION}}', '{{ACCEPTANCE_CRITERIA}}'],
    ['D2', '{{DELIVERABLE}}', '{{DESCRIPTION}}', '{{ACCEPTANCE_CRITERIA}}'],
    ['D3', 'Documentation', 'Technical runbook and user guide', 'Delivered and walked through'],
    ['D4', 'Training', '{{N}} sessions for {{AUDIENCE}}', 'Sessions held, recordings shared'],
    ['D5', 'Hypercare', '{{N}} weeks of close support', 'Exit criteria met'],
  ];
  s.addTable(rows, { x: M, y: 2.3, w: W - 2 * M, colW: [0.7, 3.2, 4.6, 3.633], fontFace: FONT, fontSize: 13, color: K.ink, border: { type: 'solid', pt: 0.75, color: K.lineL }, fill: { color: K.paper }, rowH: 0.62, valign: 'middle', margin: [0, 0.12, 0, 0.12] });
  s.addNotes('Only what is listed here is in scope. Mirror the SOW table exactly.');

  s = pres.addSlide({ masterName: 'DW Title only (dark)', sectionTitle: 'Scope & plan' });
  s.addText('[05] // how we work', { placeholder: 'kicker', align: 'left' });
  s.addText('Five phases.\nA demo every week.', { placeholder: 'title', bold: true, align: 'left' });
  const phases = [['fit', 0.2, ['Intake', 'Fit check']], ['discover', 0.4, ['Discovery & audit', 'Proposal & SOW']], ['build', 0.7, ['Kickoff & access', 'Solution design', 'Weekly sprints', 'Test & UAT']], ['launch', 0.9, ['Handover & training', 'Hypercare']], ['run', 1, ['Run & grow', '↻ next phase']]];
  const pw = (W - 2 * M) / 5;
  let n = 0;
  phases.forEach(([name, p, steps], i) => {
    const x = M + i * pw;
    card(s, x, 2.55, pw, 2.9, true);
    s.addText(name, T({ x: x + 0.25, y: 2.8, w: pw - 0.5, h: 0.4, fontSize: 16, bold: true, color: K.paper }));
    s.addShape(pres.shapes.RECTANGLE, { x: x + 0.25, y: 3.35, w: pw - 0.5, h: 0.06, fill: { color: K.lineD }, line: { type: 'none' }, objectName: 'phase bar track' });
    s.addShape(pres.shapes.RECTANGLE, { x: x + 0.25, y: 3.35, w: (pw - 0.5) * p, h: 0.06, fill: { color: K.lime }, line: { type: 'none' }, objectName: 'phase bar' });
    s.addText(steps.map((st, j) => ({ text: (st.startsWith('↻') ? '' : String(++n).padStart(2, '0') + '  ') + st, options: { breakLine: j < steps.length - 1 } })), T({ x: x + 0.25, y: 3.65, w: pw - 0.5, h: 1.65, fontSize: 12, color: K.paper, valign: 'top', paraSpaceAfter: 8 }));
  });

  s = pres.addSlide({ masterName: 'DW Title only (light)', sectionTitle: 'Scope & plan' });
  s.addText('[06] // timeline', { placeholder: 'kicker', align: 'left' });
  s.addText('{{N}} weeks,\nkickoff to handover.', { placeholder: 'title', bold: true, align: 'left' });
  const streams = [['Kickoff & design', [1, 2]], ['Build', [2, 3, 4]], ['Test & UAT', [4, 5]], ['Launch & hypercare', [5, 6]]];
  const labW = 3.0, gx = M + labW, gw = (W - 2 * M - labW) / 6, gy = 2.55, rh = 0.8;
  for (let wk = 1; wk <= 6; wk++) s.addText(`wk ${wk}`, T({ x: gx + (wk - 1) * gw, y: gy, w: gw, h: 0.4, fontSize: 12, color: K.mutedL, align: 'center' }));
  streams.forEach(([lab, wks], r) => {
    const y = gy + 0.55 + r * rh;
    s.addText(lab, T({ x: M, y, w: labW - 0.2, h: rh - 0.2, fontSize: 14, bold: true, color: K.ink, valign: 'middle' }));
    for (let wk = 1; wk <= 6; wk++) {
      const on = wks.includes(wk);
      s.addShape(pres.shapes.RECTANGLE, { x: gx + (wk - 1) * gw + 0.05, y, w: gw - 0.1, h: rh - 0.2, fill: { color: on ? K.ink : K.raiseL }, line: { type: 'none' }, objectName: on ? 'week on' : 'week off' });
    }
  });
  s.addShape(pres.shapes.RECTANGLE, { x: gx + 5 * gw + 0.05, y: gy + 0.55 + 3 * rh, w: gw - 0.1, h: rh - 0.2, fill: { color: K.lime }, line: { type: 'none' }, objectName: 'go-live' });
  s.addText('go-live', T({ x: gx + 5 * gw + 0.05, y: gy + 0.55 + 3 * rh, w: gw - 0.1, h: rh - 0.2, fontSize: 12, bold: true, color: K.ink, align: 'center', valign: 'middle' }));
  s.addNotes('Fill the cells per week: ink = active, light = idle, lime = go-live. Add or remove week columns to match the SOW.');

  s = pres.addSlide({ masterName: 'DW Title only (light)', sectionTitle: 'Scope & plan' });
  s.addText('[--] // readout chart', { placeholder: 'kicker', align: 'left' });
  s.addText('Where the time goes.', { placeholder: 'title', bold: true, align: 'left' });
  s.addChart(pres.charts.BAR, [{ name: 'Hours per month', labels: ['Finance', 'Sales ops', 'HR', 'Operations', 'Management'], values: [64, 41, 28, 22, 9] }], {
    x: M, y: 2.3, w: 8.2, h: 4.3, barDir: 'bar', chartColors: [K.cobalt], showValue: true, dataLabelPosition: 'outEnd', dataLabelColor: K.ink, dataLabelFontFace: FONT, dataLabelFontSize: 12,
    catAxisLabelFontFace: FONT, valAxisLabelFontFace: FONT, catAxisLabelColor: K.ink, valAxisLabelColor: K.mutedL, catAxisLabelFontSize: 12, valAxisLabelFontSize: 10,
    valGridLine: { color: K.lineL, size: 0.5 }, catGridLine: { style: 'none' }, showLegend: false, catAxisOrientation: 'maxMin', barGapWidthPct: 60,
    showTitle: true, title: 'Manual reporting, hours per month (sample data)', titleFontFace: FONT, titleFontSize: 12, titleColor: K.mutedL,
  });
  card(s, 9.3, 2.3, W - M - 9.3, 4.3, false);
  s.addText('164', T({ x: 9.6, y: 2.6, w: 3.2, h: 1.0, fontSize: 48, bold: true, color: K.ink }));
  s.addText('hours a month spent copying data between systems (sample)', T({ x: 9.6, y: 3.7, w: 2.9, h: 1.3, fontSize: 14, color: K.ink, valign: 'top' }));
  s.addText('For audit readouts. Charts use cobalt only; replace the sample data.', T({ x: 9.6, y: 5.3, w: 2.9, h: 1.0, fontSize: 11, color: K.mutedL, valign: 'top' }));
  s.addNotes('SAMPLE DATA. Right-click the chart → Edit Data to replace. Keep charts cobalt (brand rule); lime is for UI accents only.');

  pres.addSection({ title: 'Commercials' });
  s = pres.addSlide({ masterName: 'DW Two columns (light)', sectionTitle: 'Commercials' });
  s.addText('[07] // working together', { placeholder: 'kicker', align: 'left' });
  s.addText('What we need,\nand what we assume.', { placeholder: 'title', bold: true, align: 'left' });
  s.addText('What we need from you', { placeholder: 'leftHead', align: 'left' });
  s.addText([
    { text: 'A sponsor who decides within {{3}} working days', options: { bullet: true, breakLine: true } },
    { text: 'A day-to-day contact, about {{N}} hours a week', options: { bullet: true, breakLine: true } },
    { text: 'Access to {{SYSTEMS}} by {{DATE}}', options: { bullet: true, breakLine: true } },
    { text: 'UAT testers in week {{N}}', options: { bullet: true } },
  ], { placeholder: 'left', align: 'left' });
  s.addText('Assumptions', { placeholder: 'rightHead', align: 'left' });
  s.addText([
    { text: '{{e.g. data available via API or daily export}}', options: { bullet: true, breakLine: true } },
    { text: 'Data issues found in build are logged and agreed', options: { bullet: true, breakLine: true } },
    { text: 'Scope changes go through a change request', options: { bullet: true } },
  ], { placeholder: 'right', align: 'left' });

  s = pres.addSlide({ masterName: 'DW Title only (light)', sectionTitle: 'Commercials' });
  s.addText('[08] // investment', { placeholder: 'kicker', align: 'left' });
  s.addText('Investment.', { placeholder: 'title', bold: true, align: 'left' });
  card(s, M, 2.4, 7.4, 4.1, false);
  chip(s, 'fees', M + 0.3, 2.7, false);
  s.addText('{{FEES_TABLE}}', T({ x: M + 0.3, y: 3.3, w: 6.8, h: 2.9, fontSize: 18, bold: true, color: K.ink, valign: 'top' }));
  const rx = M + 7.75, rw = W - M - rx;
  card(s, rx, 2.4, rw, 1.95, false);
  chip(s, 'payment', rx + 0.3, 2.7, false);
  s.addText('{{PAYMENT_TERMS}}', T({ x: rx + 0.3, y: 3.25, w: rw - 0.6, h: 0.9, fontSize: 14, color: K.ink, valign: 'top' }));
  card(s, rx, 4.55, rw, 1.95, false);
  chip(s, 'third-party costs', rx + 0.3, 4.85, false);
  s.addText('{{THIRD_PARTY_COSTS_NOTE}}', T({ x: rx + 0.3, y: 5.4, w: rw - 0.6, h: 0.9, fontSize: 14, color: K.ink, valign: 'top' }));
  s.addNotes('Fill per client from internal/pricing/PRICING.md. NEVER save prices into the template itself. Amounts in RM; state SST treatment.');

  pres.addSection({ title: 'Close' });
  s = pres.addSlide({ masterName: 'DW Title only (dark)', sectionTitle: 'Close' });
  s.addText('[09] // next steps', { placeholder: 'kicker', align: 'left' });
  s.addText('Three steps\nto kickoff.', { placeholder: 'title', bold: true, align: 'left' });
  [['01', 'Confirm', 'Approve this proposal by {{VALID_UNTIL}}'], ['02', 'Sign', 'SOW and agreements sent for signature'], ['03', 'Start', 'Kickoff on {{START_DATE}}']].forEach(([num, head, txt], i) => {
    const x = M + i * (cw + 0.35);
    card(s, x, 2.6, cw, 3.7, true);
    s.addText(num, T({ x: x + 0.3, y: 2.9, w: 2, h: 1.0, fontSize: 48, bold: true, color: K.lime }));
    s.addText(head, T({ x: x + 0.3, y: 4.1, w: cw - 0.6, h: 0.5, fontSize: 20, bold: true, color: K.paper }));
    s.addText(txt, T({ x: x + 0.3, y: 4.75, w: cw - 0.6, h: 1.2, fontSize: 14, color: K.mutedD, valign: 'top' }));
  });

  s = pres.addSlide({ masterName: 'DW Close (lime)', sectionTitle: 'Close' });
  s.addText('[--] // start here', { placeholder: 'kicker', align: 'left' });
  s.addText('One problem.\nA clear next step.', { placeholder: 'title', bold: true, align: 'left' });
  s.addText('hello@datawazi.com  ·  datawazi.com', { placeholder: 'body', align: 'left' });

  await finishDeck(pres, OUT);
}

main().catch((e) => { console.error(e); process.exit(1); });
