// Render a print-ready HTML file to PDF with Chromium (fonts embedded, backgrounds printed).
// Usage (repo root):  node tools/html_to_pdf.js <input.html> <output.pdf>
const path = require('path');
const { chromium } = require('playwright');

(async () => {
  const [input, output] = process.argv.slice(2);
  if (!input || !output) { console.error('usage: node tools/html_to_pdf.js <input.html> <output.pdf>'); process.exit(1); }
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file://' + path.resolve(input), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: path.resolve(output), printBackground: true, preferCSSPageSize: true });
  await browser.close();
  console.log('wrote', output);
})();
