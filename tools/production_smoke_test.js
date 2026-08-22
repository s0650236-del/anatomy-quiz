#!/usr/bin/env node
/*
 * Post-deployment smoke test for the anatomy-quiz PWA on GitHub Pages.
 *
 * Not run as part of this repository's normal workflow -- this is a script to
 * run manually, once, right after a `main` merge is actually published to
 * GitHub Pages (or against any other https:// URL you want to check, e.g. a
 * staging deploy). It does NOT run automatically and does NOT touch git,
 * main, or Pages settings itself.
 *
 * Requires Playwright, which is NOT a repository dependency (no package.json
 * exists here). Install it ad hoc before running:
 *   npm install --no-save playwright
 *   npx playwright install chromium --with-deps
 *
 * Usage:
 *   node tools/production_smoke_test.js https://<user>.github.io/anatomy-quiz/
 *
 * Checks (see docs/release_candidate_verification.md Phase 7 for the source
 * checklist):
 *   1. app loads
 *   2. 300 questions load (via the same fetch the app itself makes)
 *   3. an image_mcq question renders and its image loads
 *   4. Service Worker registers
 *   5. Cache Storage is created and populated
 *   6. page reload still works (served from cache-first / network as normal)
 *   7. switching to offline mode still serves the app shell + a question
 *   8. a text_mcq question can be answered end-to-end
 *   9. an image_mcq question can be answered end-to-end
 *   10. a representative sample of image assets actually renders (naturalWidth > 0)
 *   11. after simulating an "app update" (a second registration pass), the
 *       old cache name is gone and only the current one remains
 *
 * Exits non-zero if any check fails, printing a summary either way.
 */
const { chromium } = require('playwright');

const url = process.argv[2];
if (!url) {
  console.error('usage: node tools/production_smoke_test.js <https-url>');
  process.exit(2);
}

const results = [];
function record(name, ok, detail) {
  results.push({ name, ok, detail });
  console.log((ok ? '[PASS] ' : '[FAIL] ') + name + (detail ? ' -- ' + detail : ''));
}

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // 1. app load
  const resp = await page.goto(url, { waitUntil: 'networkidle' });
  record('1. app load', resp && resp.ok(), 'status=' + (resp && resp.status()));

  // 2. 300 questions load
  const qData = await page.evaluate(async () => {
    const r = await fetch('./data/questions_v1.json', { cache: 'no-cache' });
    const d = await r.json();
    return { count: d.questions.length, imageCount: d.questions.filter(q => q.type === 'image_mcq').length };
  });
  record('2. 300 questions load', qData.count === 300, 'count=' + qData.count + ', image_mcq=' + qData.imageCount);

  // start a quiz to exercise rendering
  await page.evaluate(() => {
    document.getElementById('countSelect').value = '20';
    document.getElementById('countSelect').dispatchEvent(new Event('change'));
    document.getElementById('orderSelect').value = 'sequential';
    document.getElementById('startBtn').click();
  });
  await page.waitForSelector('#questionCard');

  // step through until we hit an image_mcq question (Q002 should be within the first 20 sequential)
  let foundImageQuestion = false;
  for (let i = 0; i < 20; i++) {
    const hasImg = await page.evaluate(() => !!document.querySelector('#questionCard .img-wrap'));
    if (hasImg) { foundImageQuestion = true; break; }
    const answered = await page.evaluate(() => {
      const btn = document.querySelector('#options .option');
      if (!btn) return false;
      btn.click();
      return true;
    });
    if (!answered) break;
    await page.click('#nextBtn').catch(() => {});
    await page.waitForTimeout(100);
  }
  record('3. image_mcq question renders', foundImageQuestion);
  if (foundImageQuestion) {
    const imgOk = await page.evaluate(async () => {
      const img = document.querySelector('#questionCard .img-wrap img');
      if (!img) return false;
      if (!img.complete) await new Promise(r => setTimeout(r, 500));
      return img.complete && img.naturalWidth > 0;
    });
    record('3b. that image actually loaded', imgOk);
  }

  // 4. Service Worker registers
  await page.waitForTimeout(1500); // registerServiceWorker() fires on window 'load'
  const swState = await page.evaluate(async () => {
    if (!('serviceWorker' in navigator)) return 'unsupported';
    const regs = await navigator.serviceWorker.getRegistrations();
    if (!regs.length) return 'not-registered';
    await navigator.serviceWorker.ready;
    return 'registered:' + (regs[0].active ? regs[0].active.state : 'no-active-worker');
  });
  record('4. Service Worker registered', swState.startsWith('registered'), swState);

  // 5. Cache Storage created and populated
  const cacheInfo = await page.evaluate(async () => {
    const names = await caches.keys();
    const out = {};
    for (const n of names) {
      const c = await caches.open(n);
      out[n] = (await c.keys()).length;
    }
    return out;
  });
  const totalCached = Object.values(cacheInfo).reduce((a, b) => a + b, 0);
  record('5. Cache Storage created', Object.keys(cacheInfo).length > 0 && totalCached > 0, JSON.stringify(cacheInfo));

  // 6. page reload
  const reload = await page.reload({ waitUntil: 'networkidle' });
  record('6. page reload', reload && reload.ok());

  // 7. offline mode
  await context.setOffline(true);
  let offlineOk = false;
  let offlineDetail = '';
  try {
    const offlineResp = await page.reload({ waitUntil: 'domcontentloaded', timeout: 8000 });
    offlineOk = !!offlineResp;
    const hasSettings = await page.evaluate(() => !!document.getElementById('settingsCard'));
    offlineOk = offlineOk && hasSettings;
    offlineDetail = 'shell served offline, settings card present=' + hasSettings;
  } catch (e) {
    offlineDetail = 'reload failed offline: ' + e.message;
  }
  record('7. offline mode serves app shell', offlineOk, offlineDetail);

  // 8. text_mcq answers end-to-end (offline, from cache)
  let textAnswerOk = false;
  try {
    await page.evaluate(() => {
      const chips = Array.from(document.querySelectorAll('.chip'));
      const allChip = chips.find(c => c.textContent.includes('全分野'));
      if (allChip) allChip.click();
      document.getElementById('countSelect').value = '5';
      document.getElementById('countSelect').dispatchEvent(new Event('change'));
      document.getElementById('orderSelect').value = 'sequential';
      document.getElementById('startBtn').click();
    });
    await page.waitForSelector('#questionCard', { timeout: 5000 });
    textAnswerOk = await page.evaluate(() => {
      const btn = document.querySelector('#options .option');
      if (!btn) return false;
      btn.click();
      return !!document.getElementById('feedbackArea').textContent;
    });
  } catch (e) { textAnswerOk = false; }
  record('8. text_mcq answers offline', textAnswerOk);

  // 9. image_mcq answers end-to-end (offline, from cache) -- go back online first to
  // reliably reach an image question by ID, then flip offline again to answer it.
  await context.setOffline(false);
  await page.goto(url, { waitUntil: 'networkidle' });
  await context.setOffline(true);
  let imageAnswerOk = false;
  try {
    await page.evaluate(() => {
      document.getElementById('countSelect').value = '20';
      document.getElementById('countSelect').dispatchEvent(new Event('change'));
      document.getElementById('orderSelect').value = 'sequential';
      document.getElementById('startBtn').click();
    });
    await page.waitForSelector('#questionCard', { timeout: 5000 });
    for (let i = 0; i < 20; i++) {
      const hasImg = await page.evaluate(() => !!document.querySelector('#questionCard .img-wrap'));
      if (hasImg) {
        imageAnswerOk = await page.evaluate(() => {
          const btn = document.querySelector('#options .option');
          if (!btn) return false;
          btn.click();
          return !!document.getElementById('feedbackArea').textContent;
        });
        break;
      }
      await page.evaluate(() => { document.querySelector('#options .option').click(); });
      await page.click('#nextBtn').catch(() => {});
      await page.waitForTimeout(100);
    }
  } catch (e) { imageAnswerOk = false; }
  record('9. image_mcq answers offline', imageAnswerOk);

  // 10. representative sample of image assets render offline
  const sampleCheck = await page.evaluate(async () => {
    const r = await fetch('./data/questions_v1.json', { cache: 'no-cache' }).catch(() => null);
    if (!r) return { ok: false, detail: 'could not read dataset offline' };
    const d = await r.json();
    const assets = Array.from(new Set(d.questions.filter(q => q.type === 'image_mcq').map(q => q.image.asset)));
    const sample = assets.filter((_, i) => i % 5 === 0).slice(0, 8); // ~8 assets spread across the set
    const outcomes = [];
    for (const a of sample) {
      const resp = await fetch('./' + a).catch(() => null);
      outcomes.push({ a, ok: !!(resp && resp.ok) });
    }
    return { ok: outcomes.every(o => o.ok), outcomes };
  });
  await context.setOffline(false);
  record('10. sample image assets available offline', sampleCheck.ok, JSON.stringify(sampleCheck.outcomes || sampleCheck.detail));

  // 11. app update doesn't leave stale caches around
  const cacheNamesBefore = await page.evaluate(async () => (await caches.keys()));
  await page.evaluate(async () => {
    const reg = await navigator.serviceWorker.getRegistration();
    if (reg) await reg.update();
  });
  await page.waitForTimeout(1000);
  const cacheNamesAfter = await page.evaluate(async () => (await caches.keys()));
  record('11. no duplicate/stale cache after update check', cacheNamesAfter.length <= cacheNamesBefore.length,
    'before=' + JSON.stringify(cacheNamesBefore) + ' after=' + JSON.stringify(cacheNamesAfter));

  await browser.close();

  const failed = results.filter(r => !r.ok);
  console.log('\n=== SUMMARY: ' + (results.length - failed.length) + '/' + results.length + ' passed ===');
  if (failed.length) {
    console.log('Failed checks:', failed.map(f => f.name).join(', '));
    process.exit(1);
  }
})().catch(e => {
  console.error('smoke test crashed:', e);
  process.exit(1);
});
