#!/usr/bin/env node
/*
 * Structural + cross-record validator for data/questions_v1.json, beyond what
 * data/questions.schema.json (a JSON Schema) can express on its own -- exact
 * totals, category/difficulty/type distributions, asset existence, overlay
 * coordinate ranges, and the fixed set of pre-existing photo assets/markers
 * that must never change.
 *
 * Usage:
 *   node tools/dataset_validate.js [path-to-questions-json]
 * Defaults to data/questions_v1.json relative to the repo root (this file's
 * parent directory's parent).
 *
 * Exit code 0 = no errors (warnings are non-fatal, printed for review).
 */
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const DATA_PATH = process.argv[2] || path.join(REPO, 'data', 'questions_v1.json');
const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));

let errors = [];
let warnings = [];
function fail(msg) { errors.push(msg); }
function warn(msg) { warnings.push(msg); }

const qs = data.questions;

// -- total / id sequence --------------------------------------------------
// v2.0.1: 11 new image_mcq (Q301-Q311) added, extracted from existing
// high-quality open-license assets rather than forced onto unrelated text
// questions -- see docs/v2.0.1_expansion_log.md. 300 -> 311.
if (qs.length !== 311) fail(`total questions = ${qs.length}, expected 311`);
if (data.question_count !== 311) fail(`question_count = ${data.question_count}, expected 311`);

const idSet = new Set();
qs.forEach(q => {
  if (idSet.has(q.id)) fail(`duplicate id ${q.id}`);
  idSet.add(q.id);
});
for (let n = 1; n <= 311; n++) {
  const id = 'Q' + String(n).padStart(3, '0');
  if (!idSet.has(id)) fail(`missing id ${id}`);
}

// -- category / difficulty distributions -----------------------------------
const catCount = {};
const validCats = ['総論', '循環器', '呼吸器', '泌尿器'];
qs.forEach(q => {
  if (!validCats.includes(q.category)) fail(`${q.id}: invalid category "${q.category}"`);
  catCount[q.category] = (catCount[q.category] || 0) + 1;
});
const expectCat = { '総論': 70, '循環器': 88, '呼吸器': 80, '泌尿器': 73 };
Object.keys(expectCat).forEach(c => {
  if (catCount[c] !== expectCat[c]) fail(`category ${c} count = ${catCount[c]}, expected ${expectCat[c]}`);
});

const diffCount = {};
qs.forEach(q => {
  if (![1, 2, 3].includes(q.difficulty)) fail(`${q.id}: invalid difficulty ${q.difficulty}`);
  diffCount[q.difficulty] = (diffCount[q.difficulty] || 0) + 1;
});
const expectDiff = { 1: 176, 2: 112, 3: 23 };
Object.keys(expectDiff).forEach(d => {
  if ((diffCount[d] || 0) !== expectDiff[d]) fail(`difficulty ${d} count = ${diffCount[d] || 0}, expected ${expectDiff[d]}`);
});

// -- choices / answer -------------------------------------------------------
qs.forEach(q => {
  if (!Array.isArray(q.choices) || q.choices.length !== 4) { fail(`${q.id}: choices count != 4`); return; }
  const ids = q.choices.map(c => c.id);
  if (JSON.stringify(ids.slice().sort()) !== JSON.stringify(['A', 'B', 'C', 'D'])) fail(`${q.id}: choice ids not exactly A-D: ${ids}`);
  q.choices.forEach(c => { if (!c.text || !c.text.trim()) fail(`${q.id}: empty choice text for ${c.id}`); });
  const texts = q.choices.map(c => c.text);
  if (new Set(texts).size !== texts.length) warn(`${q.id}: duplicate choice text within question`);
});
qs.forEach(q => {
  if (!['A', 'B', 'C', 'D'].includes(q.answer)) { fail(`${q.id}: invalid answer "${q.answer}"`); return; }
  if (!q.choices.some(c => c.id === q.answer)) fail(`${q.id}: answer ${q.answer} not among choices`);
});

// -- required strings / tags -------------------------------------------------
qs.forEach(q => {
  ['question', 'explanation', 'category', 'subcategory'].forEach(f => {
    if (!q[f] || !String(q[f]).trim()) fail(`${q.id}: empty field ${f}`);
  });
  if (!Array.isArray(q.tags)) fail(`${q.id}: tags not an array`);
});

// -- type / image_mcq distributions -----------------------------------------
const typeCount = {};
qs.forEach(q => {
  if (!['text_mcq', 'image_mcq'].includes(q.type)) fail(`${q.id}: invalid type "${q.type}"`);
  typeCount[q.type] = (typeCount[q.type] || 0) + 1;
});
// v2.0.1: Q140 (冠状静脈洞) converted image_mcq -> text_mcq -- no open-license
// image was found that actually depicts the coronary sinus as an identifiable
// structure (see docs/v2.0.1_asset_source_log.md), so the question was moved
// off image_mcq rather than keep an approximate/unverifiable marker.
// v2.0.1 (expansion pass): +11 new image_mcq (Q301-Q311), each extracted from
// a structure already visible and markable in an existing asset -- see
// docs/v2.0.1_expansion_log.md. 64 -> 75.
// v2.0.1 (R4 peripheral_airway_continuum pass): Q034 (導気部の終点) converted
// text_mcq -> image_mcq once a real open-license-quality asset made its
// marker target (終末細気管支, a genuinely smooth alveoli-free segment)
// uniquely identifiable. 75 -> 76.
// v2.0.1 (common illustration library batch 1): Q140 (冠状静脈洞) converted
// text_mcq -> image_mcq once the new C02 posterior heart view made the
// coronary sinus (running the AV groove, distinct from every neighboring
// vessel) uniquely identifiable for the first time. 76 -> 77.
// Nano Banana final integration: Q096 (bladder trigone) and Q290 (detrusor)
// converted to image_mcq using new U05 bladder-interior master. 77 -> 79.
// Q053: sagittal-plane identification moved to text after Phone visual review.
if ((typeCount.text_mcq || 0) !== 233) fail(`text_mcq count = ${typeCount.text_mcq}, expected 233`);
if ((typeCount.image_mcq || 0) !== 78) fail(`image_mcq count = ${typeCount.image_mcq}, expected 78`);

const catImgCount = {};
qs.forEach(q => { if (q.type === 'image_mcq') catImgCount[q.category] = (catImgCount[q.category] || 0) + 1; });
const expectCatImg = { '総論': 9, '循環器': 27, '呼吸器': 23, '泌尿器': 19 };
Object.keys(expectCatImg).forEach(c => {
  if ((catImgCount[c] || 0) !== expectCatImg[c]) fail(`category ${c} image_mcq count = ${catImgCount[c] || 0}, expected ${expectCatImg[c]}`);
});

// -- image_mcq structure, assets, overlays -----------------------------------
// NOTE: overlay/overlays is intentionally OPTIONAL per data/questions.schema.json
// ("省略時は何も描画しない"). Q051 (解剖学的正位) legitimately has none -- the
// whole image *is* the answer (a posture to recognize), not a "point at this
// structure" question. Do not treat "no overlay" as an error; only warn, and
// only for QIDs that don't explicitly document why (see marker_target).
const ASSET_PREFIX = 'assets/illustrations/v1/assets/';
const assetsDir = path.join(REPO, 'assets', 'illustrations', 'v1', 'assets');
const referencedAssets = new Set();
let overlayCount = { withOverlay: 0, withoutOverlay: 0, singleOverlay: 0, multiOverlay: 0, markerTotal: 0 };
const withoutOverlayIds = [];

qs.forEach(q => {
  if (q.type !== 'image_mcq') {
    if (q.image) warn(`${q.id}: text_mcq unexpectedly has an image object`);
    return;
  }
  if (!q.image) { fail(`${q.id}: image_mcq missing image object`); return; }
  const img = q.image;
  ['prompt_id', 'asset', 'alt', 'marker_target'].forEach(f => {
    if (!img[f] && img[f] !== '') fail(`${q.id}: image.${f} missing`);
  });
  if (!/^IMG-[0-9]{3}$/.test(img.prompt_id)) fail(`${q.id}: invalid prompt_id "${img.prompt_id}"`);
  if (!img.asset || !img.asset.startsWith(ASSET_PREFIX)) fail(`${q.id}: image.asset does not start with ${ASSET_PREFIX}: "${img.asset}"`);
  const assetFile = img.asset.replace(ASSET_PREFIX, '');
  referencedAssets.add(assetFile);
  const fullPath = path.join(assetsDir, assetFile);
  if (!fs.existsSync(fullPath)) fail(`${q.id}: asset file missing on disk: ${fullPath}`);
  else if (!assetFile.endsWith('.webp')) fail(`${q.id}: asset is not a .webp file: ${assetFile}`);

  const overlays = [];
  if (img.overlay) overlays.push(img.overlay);
  if (img.overlays) overlays.push(...img.overlays);

  if (overlays.length === 0) {
    overlayCount.withoutOverlay++;
    withoutOverlayIds.push(q.id);
    // Q051 is the one documented, intentional exception. Any other QID with
    // zero overlays is worth a human look, but is not a schema violation.
    if (q.id !== 'Q051') warn(`${q.id}: image_mcq has no overlay/overlays (verify this is intentional)`);
  } else {
    overlayCount.withOverlay++;
    overlayCount.markerTotal += overlays.length;
    if (overlays.length === 1) overlayCount.singleOverlay++;
    else overlayCount.multiOverlay++;
  }

  overlays.forEach((o, i) => {
    if (typeof o.x !== 'number' || o.x < 0 || o.x > 1) fail(`${q.id}: overlay[${i}].x out of range: ${o.x}`);
    if (typeof o.y !== 'number' || o.y < 0 || o.y > 1) fail(`${q.id}: overlay[${i}].y out of range: ${o.y}`);
    if (typeof o.label !== 'string') fail(`${q.id}: overlay[${i}].label not a string`);
  });
});

// v2.0.1 image-quality re-evaluation pass: heart_valves_schematic.webp
// (self-made SVG) was retired. Q129 later moved from the shared C03 chamber
// image to a dedicated C11 close-up of chordae tendineae and papillary muscle.
// q016_apex.webp (self-made
// SVG) was likewise retired in favour of reusing heart_exterior_anterior.webp
// (Q016's apex marker added alongside Q138's existing marker on that asset).
// 28 -> 26 unique assets is the deliberate result (two self-made assets
// discarded, zero new ones added).
// v2.0.1 (common illustration library batch 2 -- 泌尿器 U1/U2/U3 consolidation):
// U01 (renal hilum, Q045-only) was merged into U04 (kidney coronal section --
// Q045's marker now sits on the same coronal image's hilum notch), and U02/U03/
// U04 were all revised to new custom-generated images. 26 -> 25 unique assets
// (one master retired, zero new ones added). See
// docs/common_illustration_library_v1_implementation_log.md and
// docs/v2.0.1_asset_source_log.md.
// v2.0.1 (common illustration library batch 3 -- 呼吸器 R1/R2-A/R2-C
// consolidation): R03 (肺葉) and R04 (気管支分岐) were merged into a single
// custom-generated R03 (肺外観・気管支樹統合図), renumbering the former R05/
// R06/R07 down to R04/R05/R06 (25 -> 24 unique assets: two old masters
// discarded, one new one added). Separately, R01 (喉頭外観と上下気道) was
// split -- Q032 moved off to a new R08 (上気道矢状断) and Q304/Q305/Q306
// moved off to a new R09 (喉頭外観・前面), leaving R01 with only Q256（喉頭蓋,
// pending a still-unreviewed R2-B master). R02 was revised to a new
// custom-generated laryngoscopic image that -- unlike its Servier predecessor
// -- makes the true vocal folds, the vestibular folds, and the rima glottidis
// all separately identifiable (Q307's marker moved off the fold tissue onto
// the glottic chink itself). 24 -> 26 unique assets (two new masters added,
// zero retired). See docs/common_illustration_library_v1_implementation_log.md
// and docs/v2.0.1_asset_source_log.md.
// Nano Banana final integration adds U05 for Q096/Q290. 26 -> 27.
// Q129's dedicated C11 and Q176's dedicated U06 masters add two further
// assets. 27 -> 29.
if (referencedAssets.size !== 29) fail(`unique referenced assets = ${referencedAssets.size}, expected 29`);

const allFiles = fs.existsSync(assetsDir) ? fs.readdirSync(assetsDir).filter(f => f.endsWith('.webp')) : [];
allFiles.forEach(f => { if (!referencedAssets.has(f)) warn(`asset file not referenced by any question: ${f}`); });

// Q129 uses a dedicated close-up so both chordae tendineae and papillary
// muscle remain independently identifiable on a phone display.
const q129 = qs.find(q => q.id === 'Q129');
if (!q129 || !q129.image || q129.image.asset !== 'assets/illustrations/v1/assets/c11_av_valve_chordae_papillary.webp') {
  fail(`Q129 must use dedicated C11 AV-valve master, got: ${q129 && q129.image && q129.image.asset}`);
}

// Q176 uses a dedicated renal-corpuscle close-up so Bowman's capsule wall
// remains distinct from the glomerular tuft at phone width.
const q176 = qs.find(q => q.id === 'Q176');
if (!q176 || !q176.image || q176.image.asset !== 'assets/illustrations/v1/assets/u06_renal_corpuscle.webp') {
  fail(`Q176 must use dedicated U06 renal-corpuscle master, got: ${q176 && q176.image && q176.image.asset}`);
}

// The 5 pre-existing real-photo assets' Q001-Q100 overlays must never drift
// -- EXCEPT when an asset is deliberately upgraded, in which case this
// baseline is updated in the same commit as the intentional change (same
// pattern used throughout this project's history). Q017/Q064 baseline was
// updated for the "common illustration library batch 1" pass: c03's
// underlying image was replaced with a higher-quality custom-generated
// chamber cutaway, and all 4/5 chamber-marker coordinates were re-measured
// on the new file by pixel sampling (previous baseline, now historical:
// Q017 {x:0.62,y:0.67}; Q064 {x:0.32,y:0.46}/{x:0.38,y:0.73}/{x:0.63,y:0.38}/{x:0.62,y:0.67}).
// Q048 baseline was updated for the "common illustration library batch 2"
// pass: u02_nephron.webp was replaced with a higher-quality custom-generated
// nephron diagram and the renal-corpuscle marker was re-measured on the new
// file by pixel sampling (previous baseline, now historical: {x:0.19,y:0.135}).
const BASELINE_OVERLAYS = {
  Q002: [{ x: 0.08, y: 0.46, label: '①' }, { x: 0.28, y: 0.46, label: '②' }, { x: 0.48, y: 0.43, label: '③' }, { x: 0.7, y: 0.45, label: '④' }, { x: 0.91, y: 0.47, label: '⑤' }],
  Q004: [{ x: 0.5, y: 0.46, label: '①' }],
  // Playtest correction: move off the papillary muscle into the LV cavity.
  Q017: [{ x: 0.5533, y: 0.6185, label: '①' }],
  Q037: [{ x: 0.385, y: 0.57, label: '①' }],
  Q048: [{ x: 0.3196, y: 0.207, label: '①' }],
  Q064: [{ x: 0.397, y: 0.4297, label: '①' }, { x: 0.4197, y: 0.7422, label: '②' }, { x: 0.5888, y: 0.4102, label: '③' }, { x: 0.5717, y: 0.7161, label: '④' }],
};
Object.keys(BASELINE_OVERLAYS).forEach(id => {
  const q = qs.find(x => x.id === id);
  if (!q) { fail(`${id}: missing (expected preserved photo-backed question)`); return; }
  const img = q.image || {};
  const overlays = [];
  if (img.overlay) overlays.push(img.overlay);
  if (img.overlays) overlays.push(...img.overlays);
  if (JSON.stringify(overlays) !== JSON.stringify(BASELINE_OVERLAYS[id])) {
    fail(`${id}: overlay drifted from the preserved baseline. current=${JSON.stringify(overlays)} baseline=${JSON.stringify(BASELINE_OVERLAYS[id])}`);
  }
});
const PRESERVED_5 = ['g01_organization_levels.webp', 'g02_epithelium.webp', 'c03_heart_chambers.webp', 'r05_alveolar_gas_exchange.webp', 'u02_nephron.webp'];
PRESERVED_5.forEach(f => {
  if (!fs.existsSync(path.join(assetsDir, f))) fail(`preserved asset missing on disk: ${f}`);
});

// -- report -------------------------------------------------------------
console.log('=== dataset_validate.js RESULT ===');
console.log('errors:', errors.length);
errors.forEach(e => console.log('  [FAIL]', e));
console.log('warnings:', warnings.length);
warnings.forEach(w => console.log('  [WARN]', w));
console.log('');
console.log('summary:');
console.log('  total:', qs.length, '| category:', JSON.stringify(catCount), '| difficulty:', JSON.stringify(diffCount));
console.log('  type:', JSON.stringify(typeCount), '| category-image:', JSON.stringify(catImgCount));
console.log('  unique assets referenced:', referencedAssets.size);
console.log('  image_mcq total:', (typeCount.image_mcq || 0),
  '| overlay-yes:', overlayCount.withOverlay,
  '| overlay-no:', overlayCount.withoutOverlay, withoutOverlayIds,
  '| single:', overlayCount.singleOverlay,
  '| multi:', overlayCount.multiOverlay,
  '| marker total:', overlayCount.markerTotal);

process.exitCode = errors.length > 0 ? 1 : 0;
