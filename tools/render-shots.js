#!/usr/bin/env node
// Renders the three welcome illustrations (tools/shots.html) to welcome/step-{1,2,3}.png at 2x.
//   node tools/render-shots.js   (uses Chrome for Testing and puppeteer-core from the extension repo)
'use strict';
const path = require('path');
const EXT = path.resolve(__dirname, '../../form-filler');
const { launch } = require(path.join(EXT, 'tools/e2e/run.js'));
(async () => {
  const b = await launch();
  const p = await b.newPage();
  await p.setViewport({ width: 720, height: 1300, deviceScaleFactor: 2 });
  await p.goto('file://' + path.join(__dirname, 'shots.html'));
  for (const n of [1, 2, 3]) {
    const el = await p.$('#step-' + n);
    await el.screenshot({ path: path.join(__dirname, '..', 'welcome', `step-${n}.png`), omitBackground: true });
    console.log(`welcome/step-${n}.png`);
  }
  await b.close();
})().catch((e) => { console.error(e); process.exit(1); });
