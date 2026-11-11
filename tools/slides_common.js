// Shared datawazi slide design: theme, layouts (DW ...), logo/footer and composed-slide helpers.
// Used by make_slides.js (template) and make_capabilities_deck.js (client deck).

const path = require('path');
const fs = require('fs');
const pptxgen = require('pptxgenjs');
const sharp = require('sharp');
const JSZip = require('jszip');

const ROOT = path.resolve(__dirname, '..');
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

async function createDeck(deckTitle) {
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

  pres.title = deckTitle;
  return { pres, T, chip, card };
}

async function finishDeck(pres, out) {
  await pres.writeFile({ fileName: out });
  await applyBrandTheme(out);
  console.log('wrote', path.relative(ROOT, out));
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
  // Obel Mono everywhere: theme fonts only (no Office script fallbacks), and every bullet glyph.
  for (const name of Object.keys(zip.files).filter((n) => /^ppt\/theme\/theme\d+\.xml$/.test(n))) {
    let xml = await zip.file(name).async('string');
    xml = xml.replace(/<a:font script="[^"]*" typeface="[^"]*"\/>/g, '')
      .replace(/<a:(latin|ea|cs) typeface="[^"]*"/g, `<a:$1 typeface="${FONT}"`);
    zip.file(name, xml);
  }
  for (const name of Object.keys(zip.files).filter((n) => /^ppt\/(slides|slideLayouts|slideMasters)\/[^/]+\.xml$/.test(n))) {
    let xml = await zip.file(name).async('string');
    xml = xml.replace(/<a:buFont typeface="[^"]*"[^/]*\/>/g, '').replace(/<a:buChar /g, `<a:buFont typeface="${FONT}"/><a:buChar `);
    zip.file(name, xml);
  }
  for (const [name, entry] of Object.entries(zip.files)) if (entry.dir) delete zip.files[name]; // drop folder entries only
  fs.writeFileSync(file, await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' }));
}

module.exports = { K, FONT, W, H, M, ROOT, createDeck, finishDeck };
