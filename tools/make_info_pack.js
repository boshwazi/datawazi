// Renders brand/info-pack/info-pack.html to brand/Datawazi_Info_Pack.pdf (A4, fonts embedded).
// Run from the repo root:  node tools/make_info_pack.js   (uses the machine's Playwright + Chromium)
const path = require('path');
const { chromium } = require('playwright');

(async () => {
  const root = path.resolve(__dirname, '..');
  const src = 'file://' + path.join(root, 'brand/info-pack/info-pack.html');
  const out = path.join(root, 'brand/Datawazi_Info_Pack.pdf');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(src, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: out, format: 'A4', printBackground: true, preferCSSPageSize: true });
  await browser.close();
  console.log('wrote', path.relative(root, out));
})();
