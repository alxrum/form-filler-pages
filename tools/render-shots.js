#!/usr/bin/env node
// Renders the two welcome illustrations (tools/shots.html) to welcome/steps-1-2.png and step-3.png at 2x.
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
  for (const [id, file] of [['step-1', 'steps-1-2.png'], ['step-2', 'step-3.png']]) {
    const el = await p.$('#' + id);
    await el.screenshot({ path: path.join(__dirname, '..', 'welcome', file), omitBackground: true });
    console.log('welcome/' + file);
  }
  await b.close();
})().catch((e) => { console.error(e); process.exit(1); });
