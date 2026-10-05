const { chromium } = require('playwright');
(async () => {
  const lang = process.argv[2] || 'en', times = process.argv.slice(3).map(Number);
  const b = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  p.on('console', m => console.log('console:', m.text())); p.on('pageerror', e => console.log('ERR', e.message));
  await p.goto(`http://127.0.0.1:8765/reel.html?lang=${lang}`);
  await p.waitForFunction(() => window.READY === true, null, { timeout: 60000 });
  for (const t of times) {
    const t0 = Date.now();
    await p.evaluate(t => window.renderAt(t, Math.round(t * 30)), t);
    await p.screenshot({ path: `still-${lang}-${t}.png` });
    console.log('t', t, Date.now() - t0, 'ms');
  }
  await b.close();
})();
