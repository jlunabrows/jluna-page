const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const lang = process.argv[2], FPS = 30, DUR = 36, dir = `frames-${lang}`;
  fs.mkdirSync(dir, { recursive: true });
  const b = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  p.on('pageerror', e => console.log('ERR', e.message));
  await p.goto(`http://127.0.0.1:8765/reel.html?lang=${lang}`);
  await p.waitForFunction(() => window.READY === true, null, { timeout: 60000 });
  const N = FPS * DUR;
  const ranges = (process.argv[3] || `0-${N-1}`).split(",").map(r => r.split("-").map(Number));
  for (const [a, z] of ranges) for (let f = a; f <= z; f++) {
    await p.evaluate(f => window.renderAt(f / 30, f), f);
    await p.screenshot({ path: `${dir}/f${String(f).padStart(4, '0')}.png` });
    if (f % 75 === 0) console.log(lang, f, '/', N);
  }
  await b.close();
})();
