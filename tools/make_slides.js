// Builds sales/deck/Datawazi_Slide_Template.pptx: datawazi's branded slide template.
// Run from tools/:  npm install && npm run slides
// Typeface: Obel Mono (install brand/fonts/obel-mono/ttf/ to see it). Logo: outlined PNGs from brand/logo/.
// Never put prices into this template: fees are {{FEES_TABLE}} / {{PAYMENT_TERMS}} placeholders (see CLAUDE.md).

const path = require('path');
const fs = require('fs');
const pptxgen = require('pptxgenjs');
const sharp = require('sharp');
const JSZip = require('jszip');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'sales/deck/Datawazi_Slide_Template.pptx');
const LOGO_DARK = path.join(ROOT, 'brand/logo/datawazi-wordmark-on-dark.png'); // paper letters, lime _
const LOGO_LIGHT = path.join(ROOT, 'brand/logo/datawazi-wordmark-on-light.png'); // ink letters, ink _
const LOGO_RATIO = 1600 / 416;

// Brand palette (brand/BRAND.md). Lime text only on ink; cobalt only in charts.
const K = { ink: '0A0C0F', paper: 'EEF0EA', lime: 'C8FF2E', cobalt: '4D6BFF', raise: '161A20', raiseL: 'E1E4DA', mutedD: 'B3B8B0', mutedL: '464B45', lineD: '2A2F36', lineL: 'C9CCC4' };
const FONT = 'Obel Mono';
const THEME_COLORS = { dk1: K.ink, lt1: K.paper, dk2: K.raise, lt2: K.raiseL, accent1: K.lime, accent2: K.cobalt, accent3: K.mutedL, accent4: K.mutedD, accent5: K.raise, accent6: K.ink, hlink: K.cobalt, folHlink: K.mutedL };

const W = 13.333, H = 7.5, M = 0.6;

async function gridBackground(fade) {
  const w = 1920, h = 1080, step = 72;
  let lines = '';
  for (let x = 0; x <= w; x += step) lines += `<line x1="${x}" y1="0" x2="${x}" y2="${h}"/>`;
  for (let y = 0; y <= h; y += step) lines += `<line x1="0" y1="${y}" x2="${w}" y2="${y}"/>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <defs><radialGradient id="g" cx="${fade.cx}" cy="${fade.cy}" r="${fade.r}"><stop offset="0" stop-color="#fff" stop-opacity="1"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
    <mask id="m"><rect width="${w}" height="${h}" fill="url(#g)"/></mask></defs>
    <rect width="${w}" height="${h}" fill="#${fade.bg}"/>
    <g mask="url(#m)" stroke="#${fade.line}" stroke-opacity="${fade.op}" stroke-width="1.5">${lines}</g></svg>`;
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return 'image/png;base64,' + buf.toString('base64');
}

function logo(x, y, w, dark) {
  return { image: { x, y, w, h: w / LOGO_RATIO, path: dark ? LOGO_DARK : LOGO_LIGHT } };
}

// Standard placeholders shared by content layouts
function kicker(dark) {
  return { placeholder: { options: { name: 'kicker', type: 'body', x: M, y: 0.5, w: 9, h: 0.35, fontFace: FONT, fontSize: 12, color: dark ? K.lime : K.mutedL, margin: 0, valign: 'middle' }, text: '[00] // section label' } };
}
function title(dark, y = 0.95, h = 1.25, size = 32) {
  return { placeholder: { options: { name: 'title', type: 'title', x: M, y, w: W - 2 * M, h, fontFace: FONT, fontSize: size, bold: true, align: 'left', color: dark ? K.paper : K.ink, margin: 0, valign: 'top', charSpacing: -1 }, text: 'Headline,\nbreak after a comma or full stop.' } };
}
function footer(dark) {
  return [
    logo(M, 6.92, 1.15, dark),
    { text: { text: 'confidential', options: { x: 2.0, y: 6.9, w: 3, h: 0.3, fontFace: FONT, fontSize: 9, color: dark ? K.mutedD : K.mutedL, margin: 0, valign: 'middle' } } },
  ];
}
const slideNum = (dark) => ({ x: W - M - 0.6, y: 6.9, w: 0.6, h: 0.3, fontFace: FONT, fontSize: 9, color: dark ? K.mutedD : K.mutedL, align: 'right' });

async function main() {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_WIDE';
  pres.author = 'datawazi';
  pres.company = 'datawazi';
  pres.title = 'datawazi slide template';
  pres.theme = { headFontFace: FONT, bodyFontFace: FONT };

  const gridHero = await gridBackground({ bg: K.ink, line: K.paper, op: 0.14, cx: '0.25', cy: '0.35', r: '0.75' });
  const gridLime = await gridBackground({ bg: K.lime, line: K.ink, op: 0.16, cx: '0.85', cy: '0.55', r: '0.7' });

  // ---------- Layouts ----------
  pres.defineSlideMaster({
    title: 'DW Title (dark)',
    background: { data: gridHero },
    objects: [
      logo(M, 0.55, 1.7, true),
      { placeholder: { options: { name: 'kicker', type: 'body', x: M, y: 2.3, w: 10, h: 0.4, fontFace: FONT, fontSize: 14, color: K.lime, margin: 0 }, text: '[00] // proposal' } },
      { placeholder: { options: { name: 'title', type: 'title', x: M, y: 2.8, w: 11.5, h: 2.1, fontFace: FONT, fontSize: 54, bold: true, align: 'left', color: K.paper, margin: 0, valign: 'top', charSpacing: -2 }, text: 'Project title' } },
      { placeholder: { options: { name: 'subtitle', type: 'body', x: M, y: 5.0, w: 11, h: 0.6, fontFace: FONT, fontSize: 20, color: K.paper, margin: 0 }, text: 'For client name' } },
      { placeholder: { options: { name: 'meta', type: 'body', x: M, y: 6.55, w: 11, h: 0.4, fontFace: FONT, fontSize: 12, color: K.mutedD, margin: 0 }, text: 'date · reference · prepared by datawazi' } },
    ],
  });
  pres.defineSlideMaster({
    title: 'DW Section (dark)',
    background: { data: gridHero },
    objects: [
      { placeholder: { options: { name: 'kicker', type: 'body', x: M, y: 2.75, w: 10, h: 0.4, fontFace: FONT, fontSize: 14, color: K.lime, margin: 0 }, text: '[02] // section' } },
      { placeholder: { options: { name: 'title', type: 'title', x: M, y: 3.25, w: 11.5, h: 1.9, fontFace: FONT, fontSize: 44, bold: true, align: 'left', color: K.paper, margin: 0, valign: 'top', charSpacing: -2 }, text: 'Section title.' } },
      ...footer(true),
    ],
    slideNumber: slideNum(true),
  });
  pres.defineSlideMaster({
    title: 'DW Content (light)',
    background: { color: K.paper },
    objects: [kicker(false), title(false),
      { placeholder: { options: { name: 'body', type: 'body', x: M, y: 2.4, w: W - 2 * M, h: 4.2, fontFace: FONT, fontSize: 16, color: K.ink, margin: 0, valign: 'top', paraSpaceAfter: 8 }, text: 'Body text' } },
      ...footer(false)],
    slideNumber: slideNum(false),
  });
  pres.defineSlideMaster({
    title: 'DW Content (dark)',
    background: { color: K.ink },
    objects: [kicker(true), title(true),
      { placeholder: { options: { name: 'body', type: 'body', x: M, y: 2.4, w: W - 2 * M, h: 4.2, fontFace: FONT, fontSize: 16, color: K.paper, margin: 0, valign: 'top', paraSpaceAfter: 8 }, text: 'Body text' } },
      ...footer(true)],
    slideNumber: slideNum(true),
  });
  pres.defineSlideMaster({
    title: 'DW Title only (light)',
    background: { color: K.paper },
    objects: [kicker(false), title(false), ...footer(false)],
    slideNumber: slideNum(false),
  });
  pres.defineSlideMaster({
    title: 'DW Title only (dark)',
    background: { color: K.ink },
    objects: [kicker(true), title(true), ...footer(true)],
    slideNumber: slideNum(true),
  });
  const colW = (W - 2 * M - 0.5) / 2;
  pres.defineSlideMaster({
    title: 'DW Two columns (light)',
    background: { color: K.paper },
    objects: [kicker(false), title(false),
      { placeholder: { options: { name: 'leftHead', type: 'body', x: M, y: 2.4, w: colW, h: 0.45, fontFace: FONT, fontSize: 18, bold: true, color: K.ink, margin: 0 }, text: 'Left heading' } },
      { placeholder: { options: { name: 'left', type: 'body', x: M, y: 3.0, w: colW, h: 3.6, fontFace: FONT, fontSize: 15, color: K.ink, margin: 0, valign: 'top', paraSpaceAfter: 6 }, text: 'Left column' } },
      { placeholder: { options: { name: 'rightHead', type: 'body', x: M + colW + 0.5, y: 2.4, w: colW, h: 0.45, fontFace: FONT, fontSize: 18, bold: true, color: K.ink, margin: 0 }, text: 'Right heading' } },
      { placeholder: { options: { name: 'right', type: 'body', x: M + colW + 0.5, y: 3.0, w: colW, h: 3.6, fontFace: FONT, fontSize: 15, color: K.ink, margin: 0, valign: 'top', paraSpaceAfter: 6 }, text: 'Right column' } },
      ...footer(false)],
    slideNumber: slideNum(false),
  });
  pres.defineSlideMaster({
    title: 'DW Close (lime)',
    background: { data: gridLime },
    objects: [
      logo(M, 0.55, 1.7, false),
      { placeholder: { options: { name: 'kicker', type: 'body', x: M, y: 2.0, w: 10, h: 0.4, fontFace: FONT, fontSize: 14, color: K.ink, margin: 0 }, text: '[--] // next step' } },
      { placeholder: { options: { name: 'title', type: 'title', x: M, y: 2.5, w: 11.5, h: 2.6, fontFace: FONT, fontSize: 48, bold: true, align: 'left', color: K.ink, margin: 0, valign: 'top', charSpacing: -2 }, text: 'Closing line.' } },
      { placeholder: { options: { name: 'body', type: 'body', x: M, y: 5.5, w: 11, h: 1.0, fontFace: FONT, fontSize: 16, color: K.ink, margin: 0, valign: 'top' }, text: 'hello@datawazi.com · datawazi.com' } },
    ],
  });

  // ---------- Helpers for composed slides ----------
  const T = (opts) => ({ fontFace: FONT, margin: 0, isTextBox: true, ...opts });
  const chip = (s, text, x, y, dark) => {
    const w = 0.105 * text.length + 0.3;
    s.addShape(pres.shapes.RECTANGLE, { x, y, w, h: 0.32, fill: { color: dark ? K.lime : K.ink }, line: { type: 'none' }, objectName: 'chip' });
    s.addText(text, T({ x, y, w, h: 0.32, fontSize: 11, bold: true, color: dark ? K.ink : K.lime, align: 'center', valign: 'middle' }));
  };
  const card = (s, x, y, w, h, dark) =>
    s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: dark ? K.raise : K.raiseL }, line: { color: dark ? K.lineD : K.lineL, width: 0.75 }, objectName: 'card' });

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

  await pres.writeFile({ fileName: OUT });
  await applyBrandTheme(OUT);
  console.log('wrote', path.relative(ROOT, OUT));
}

// Write brand colours into the theme so new shapes, charts and text pick up the palette.
async function applyBrandTheme(file) {
  const zip = await JSZip.loadAsync(fs.readFileSync(file));
  const scheme = `<a:clrScheme name="datawazi">${['dk1', 'lt1', 'dk2', 'lt2', 'accent1', 'accent2', 'accent3', 'accent4', 'accent5', 'accent6', 'hlink', 'folHlink']
    .map((k) => `<a:${k}><a:srgbClr val="${THEME_COLORS[k]}"/></a:${k}>`).join('')}</a:clrScheme>`;
  for (const name of Object.keys(zip.files).filter((n) => /^ppt\/theme\/theme\d+\.xml$/.test(n))) {
    let xml = await zip.file(name).async('string');
    xml = xml.replace(/<a:clrScheme [\s\S]*?<\/a:clrScheme>/, scheme).replace(/(<a:theme [^>]*name=")[^"]*(")/, '$1Datawazi$2');
    zip.file(name, xml);
  }
  // Bullet glyphs in the master text styles: Obel Mono instead of Arial
  for (const name of Object.keys(zip.files).filter((n) => /^ppt\/slideMasters\/slideMaster\d+\.xml$/.test(n))) {
    const xml = await zip.file(name).async('string');
    zip.file(name, xml.replace(/<a:buFont typeface="Arial"[^/]*\/>/g, `<a:buFont typeface="${FONT}"/>`));
  }
  for (const [name, entry] of Object.entries(zip.files)) if (entry.dir) delete zip.files[name]; // drop folder entries only
  fs.writeFileSync(file, await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' }));
}

main().catch((e) => { console.error(e); process.exit(1); });
