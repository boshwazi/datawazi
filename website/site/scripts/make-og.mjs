// Renders public/og.png (1200x630 social preview) and public/apple-touch-icon.png.
// Run: npm run og   (uses the Playwright + Chromium already on this machine)
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const here = path.dirname(fileURLToPath(import.meta.url));
const pub = path.join(here, '..', 'public');
const font = readFileSync(path.join(pub, 'fonts/jetbrains-mono-latin-800-normal.woff2')).toString('base64');
const font4 = readFileSync(path.join(pub, 'fonts/jetbrains-mono-latin-400-normal.woff2')).toString('base64');
const mono = readFileSync(path.join(here, '../../../brand/logo/datawazi-monogram.svg'), 'utf8');

const og = `<style>
@font-face{font-family:M;src:url(data:font/woff2;base64,${font}) format('woff2');font-weight:800}
@font-face{font-family:M;src:url(data:font/woff2;base64,${font4}) format('woff2');font-weight:400}
html,body{margin:0}
body{width:1200px;height:630px;background:#0A0C0F;color:#EEF0EA;font-family:M,monospace;position:relative;overflow:hidden;
background-image:linear-gradient(rgba(238,240,234,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(238,240,234,.08) 1px,transparent 1px);background-size:48px 48px}
.in{position:absolute;inset:72px 80px;display:flex;flex-direction:column;justify-content:space-between}
.mark{font-weight:800;font-size:40px;letter-spacing:-.04em}.u{color:#C8FF2E}
h1{font-weight:800;font-size:96px;line-height:1;letter-spacing:-.045em;margin:0}
.row{display:flex;justify-content:space-between;align-items:center;font-size:24px;color:#B3B8B0}
.row b{color:#0A0C0F;background:#C8FF2E;padding:6px 14px;font-weight:800}
</style><div class="in"><div class="mark">datawazi<span class="u">_</span></div>
<h1>Data &amp; AI,<br>built to work<span class="u">_</span></h1>
<div class="row"><span>[00] // data &amp; ai solutions · malaysia</span><b>book a fit check →</b></div></div>`;

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
await p.setContent(og);
await p.waitForTimeout(300);
await p.screenshot({ path: path.join(pub, 'og.png') });
const t = await b.newPage({ viewport: { width: 180, height: 180 } });
await t.setContent(`<style>html,body{margin:0;background:#0A0C0F}svg{width:180px;height:180px;display:block}</style>${mono.replace(/rx="\d+"/, 'rx="0"')}`);
await t.screenshot({ path: path.join(pub, 'apple-touch-icon.png') });
await b.close();
console.log('wrote public/og.png, public/apple-touch-icon.png');
