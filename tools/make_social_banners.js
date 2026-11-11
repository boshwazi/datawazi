const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const R = require('path').resolve(__dirname, '..'); // run: node tools/make_social_banners.js
const obel = fs.readFileSync(R + '/brand/fonts/obel-mono/ObelMono-VF.woff2').toString('base64');
const mark = fs.readFileSync(R + '/brand/logo/datawazi-wordmark-on-dark.svg', 'utf8');
const css = (w, h) => `<style>
@font-face{font-family:O;src:url(data:font/woff2;base64,${obel}) format('woff2');font-weight:100 900}
html,body{margin:0}
body{width:${w}px;height:${h}px;background:#0A0C0F;color:#EEF0EA;font-family:O,monospace;position:relative;overflow:hidden}
.g{position:absolute;inset:0;background-image:linear-gradient(rgba(238,240,234,.10) 1px,transparent 1px),linear-gradient(90deg,rgba(238,240,234,.10) 1px,transparent 1px);background-size:${Math.round(h/4)}px ${Math.round(h/4)}px;
-webkit-mask-image:radial-gradient(ellipse 70% 120% at 75% 50%,#000 25%,transparent 75%)}
.u{color:#C8FF2E}.chip{background:#C8FF2E;color:#0A0C0F;font-weight:800;padding:.25em .6em}
svg{display:block}</style>`;
const company = (w, h) => `${css(w,h)}<div class="g"></div>
<div style="position:absolute;left:${Math.round(w*0.36)}px;right:${Math.round(w*0.04)}px;top:0;bottom:0;display:flex;flex-direction:column;justify-content:center;gap:${Math.round(h*0.07)}px">
<div style="font-size:${Math.round(h*0.075)}px;color:#C8FF2E;letter-spacing:.04em">[00] // data &amp; ai solutions · malaysia</div>
<div style="font-size:${Math.round(h*0.2)}px;font-weight:800;letter-spacing:-.04em;line-height:1">Data &amp; AI, built to work<span class="u">_</span></div>
<div style="font-size:${Math.round(h*0.08)}px;color:#B3B8B0">platforms · pipelines · dashboards · automation · AI &nbsp;&nbsp;<span class="chip">datawazi.com</span></div></div>`;
const personal = (w, h) => `${css(w,h)}<div class="g"></div>
<div style="position:absolute;left:${Math.round(w*0.30)}px;right:${Math.round(w*0.05)}px;top:0;bottom:0;display:flex;flex-direction:column;justify-content:center;gap:${Math.round(h*0.06)}px">
<div style="width:${Math.round(h*0.95)}px">${mark.replace('<svg','<svg style="width:100%;height:auto"')}</div>
<div style="font-size:${Math.round(h*0.105)}px;font-weight:800;letter-spacing:-.03em">We design,<br>build and run data &amp; AI systems<span class="u">.</span></div>
<div style="font-size:${Math.round(h*0.055)}px;color:#B3B8B0">book a 30-min fit check &nbsp;<span class="chip">cal.com/datawazi/fit-check</span></div></div>`;
(async () => {
  const b = await chromium.launch();
  for (const [name, w, h, fn] of [['linkedin-company-cover', 1128, 191, company], ['linkedin-personal-banner', 1584, 396, personal]]) {
    const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 2 });
    await p.setContent(fn(w, h)); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(200);
    await p.screenshot({ path: path.join(R, 'brand/social', name + '.png') }); console.log('wrote', name);
  }
  await b.close();
})();
