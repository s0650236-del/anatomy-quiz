#!/usr/bin/env node
/*
 * Deterministic regression test for question-selection ("queue building")
 * behavior. Written for the v2.0.1 investigation into a production report of
 * "60問プレイしてもimage_mcqが1問も出なかった" (see
 * docs/v2.0.1_image_mcq_investigation.md for the full writeup).
 *
 * This intentionally does NOT rely on a live Math.random() draw ("ランダムだ
 * から必ず一定数出る" is exactly the kind of flaky assertion this file is
 * meant to avoid) -- every check below is either:
 *   (a) a static source-code check against app.js's actual selection
 *       functions (getPool / buildQueue), or
 *   (b) a seeded, reproducible PRNG replay of the same Fisher-Yates shuffle
 *       app.js uses, run over a fixed list of integer seeds, or
 *   (c) a pure recomputation from data/questions_v1.json with no randomness
 *       at all (the "sequential mode" first-N-by-ID case).
 * Every seed/count/category combination below is fixed at file-write time,
 * so a failure here is always exactly reproducible.
 *
 * Usage:
 *   node tools/queue_distribution_test.js
 * Exit code 0 = all checks passed.
 */
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const DATA_PATH = path.join(REPO, 'data', 'questions_v1.json');
const APP_JS_PATH = path.join(REPO, 'app.js');

const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
const appSrc = fs.readFileSync(APP_JS_PATH, 'utf8');
const qs = data.questions;

let errors = [];
let notes = [];
function fail(msg) { errors.push(msg); }
function note(msg) { notes.push(msg); }

// ---------------------------------------------------------------------
// (a) source pool: exact image_mcq count must be 65, never silently drift
// ---------------------------------------------------------------------
const imageMcq = qs.filter(q => q.type === 'image_mcq');
if (imageMcq.length !== 65) {
  fail(`expected 65 image_mcq in source pool, found ${imageMcq.length}`);
} else {
  note(`source pool: ${imageMcq.length}/${qs.length} questions are image_mcq (OK)`);
}

// ---------------------------------------------------------------------
// (b) static check: getPool()/buildQueue() must not contain any pattern
// that filters out or otherwise special-cases image_mcq / type
// ---------------------------------------------------------------------
function extractFunctionBody(src, fnName) {
  const start = src.indexOf('function ' + fnName + '(');
  if (start === -1) return null;
  // naive brace-matching from the first '{' after the signature
  const braceStart = src.indexOf('{', start);
  let depth = 0;
  for (let i = braceStart; i < src.length; i++) {
    if (src[i] === '{') depth++;
    else if (src[i] === '}') {
      depth--;
      if (depth === 0) return src.slice(start, i + 1);
    }
  }
  return null;
}

const getPoolBody = extractFunctionBody(appSrc, 'getPool');
const buildQueueBody = extractFunctionBody(appSrc, 'buildQueue');

if (!getPoolBody) {
  fail('could not locate getPool() in app.js (has it been renamed/removed?)');
} else if (/image_mcq|\.type\b/.test(getPoolBody)) {
  fail('getPool() references .type or "image_mcq" -- it should only filter by category. ' +
    'Body: ' + getPoolBody);
} else {
  note('getPool(): no type-based filtering found (OK -- only category filtering present)');
}

if (!buildQueueBody) {
  fail('could not locate buildQueue() in app.js (has it been renamed/removed?)');
} else if (/image_mcq/.test(buildQueueBody)) {
  fail('buildQueue() references "image_mcq" directly -- unexpected special-casing. ' +
    'Body: ' + buildQueueBody);
} else {
  note('buildQueue(): no image_mcq-specific special-casing found (OK)');
}

// ---------------------------------------------------------------------
// (b) seeded Fisher-Yates replay -- same algorithm as app.js's shuffle(),
// driven by a seeded PRNG so results are 100% reproducible across runs.
// ---------------------------------------------------------------------
function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seededShuffle(arr, rng) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(rng() * (i + 1));
    var t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

const FIXED_SEEDS = Array.from({ length: 100 }, (_, i) => i + 1); // seeds 1..100, fixed
const RANDOM_QUEUE_SIZE = 60; // the exact figure reported by the reviewer
let zeroImageSeeds = [];
let imageCounts = [];
FIXED_SEEDS.forEach(seed => {
  const rng = mulberry32(seed);
  const shuffled = seededShuffle(qs, rng);
  const picked = shuffled.slice(0, RANDOM_QUEUE_SIZE);
  const count = picked.filter(q => q.type === 'image_mcq').length;
  imageCounts.push(count);
  if (count === 0) zeroImageSeeds.push(seed);
});
const meanImageCount = imageCounts.reduce((a, b) => a + b, 0) / imageCounts.length;
const expectedMean = (65 / 300) * RANDOM_QUEUE_SIZE; // ~13
if (zeroImageSeeds.length > 0) {
  fail(`random ALL-category queue of ${RANDOM_QUEUE_SIZE} had 0 image_mcq for seeds: ${zeroImageSeeds.join(',')}`);
} else {
  note(`random ALL-category queue of ${RANDOM_QUEUE_SIZE}: 0/${FIXED_SEEDS.length} fixed seeds produced 0 image_mcq (OK). ` +
    `mean image_mcq per queue = ${meanImageCount.toFixed(2)} (expected ~${expectedMean.toFixed(2)})`);
}
if (Math.abs(meanImageCount - expectedMean) > expectedMean * 0.5) {
  fail(`mean image_mcq count (${meanImageCount.toFixed(2)}) deviates >50% from expected (${expectedMean.toFixed(2)}) -- ` +
    'possible selection bias introduced');
}

// Known-thin case: small per-category random draws. This is NOT a bug, but the
// v2.0.1 investigation found P(0 image_mcq) is genuinely non-negligible for
// small counts within a single category (e.g. ~45% for 総論 n=5). Record it
// as a documented, expected characteristic rather than silently ignoring it.
const categories = [...new Set(qs.map(q => q.category))];
categories.forEach(cat => {
  const pool = qs.filter(q => q.category === cat);
  const rng = mulberry32(cat.length * 7 + 1); // deterministic per-category seed
  const shuffled = seededShuffle(pool, rng);
  const picked = shuffled.slice(0, 5);
  const count = picked.filter(q => q.type === 'image_mcq').length;
  note(`random ${cat} queue of 5 (fixed seed): image_mcq=${count}/5 -- small-n zero-image draws are ` +
    'a known, documented UX characteristic, not tested for a specific outcome here');
});

// ---------------------------------------------------------------------
// (c) sequential mode: pure recomputation, no randomness. Regression guard
// against the dataset being edited such that a category's leading ID block
// (what "順番どおり" actually returns every time, per the confirmed
// non-advancing behavior) ever loses all its image_mcq questions.
// ---------------------------------------------------------------------
const COUNT_STEPS = [5, 10, 15, 20, 25, 30, 40, 50, 75, 100, 150, 200, 250, 300];
const ALL_AND_CATEGORIES = ['__ALL__'].concat(categories);
ALL_AND_CATEGORIES.forEach(cat => {
  const pool = (cat === '__ALL__' ? qs : qs.filter(q => q.category === cat))
    .slice().sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
  const n = pool.length;
  const steps = COUNT_STEPS.filter(s => s < n).concat([n]);
  steps.forEach(count => {
    const firstN = pool.slice(0, count);
    const imgCount = firstN.filter(q => q.type === 'image_mcq').length;
    if (imgCount === 0) {
      fail(`sequential mode: ${cat} count=${count} -- leading ID block has 0 image_mcq ` +
        '(confirmed non-advancing "順番どおり" would show this repeatedly -- see Phase 6 proposal)');
    }
  });
});
note(`sequential mode: checked ${ALL_AND_CATEGORIES.length} categories x up to ${COUNT_STEPS.length} count steps, ` +
  'all leading ID blocks contain >=1 image_mcq under the CURRENT dataset (informational -- this is a property ' +
  'of the current data ordering, not a guarantee; see docs/v2.0.1_image_mcq_investigation.md for the underlying ' +
  'non-advancing sequential-mode issue itself, which is tracked separately)');

// ---------------------------------------------------------------------
console.log('--- notes ---');
notes.forEach(n => console.log('  ' + n));
console.log('');
if (errors.length) {
  console.log('=== FAILED: ' + errors.length + ' issue(s) ===');
  errors.forEach(e => console.log('  [FAIL] ' + e));
  process.exit(1);
} else {
  console.log('=== PASSED: all queue-distribution checks OK ===');
}
