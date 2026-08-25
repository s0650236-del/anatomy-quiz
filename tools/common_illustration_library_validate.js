#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repo = path.join(__dirname, '..');
const manifestPath = path.join(repo, 'assets', 'illustrations', 'v1', 'manifest.json');
const datasetPath = path.join(repo, 'data', 'questions_v1.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const dataset = JSON.parse(fs.readFileSync(datasetPath, 'utf8'));
const swSource = fs.readFileSync(path.join(repo, 'sw.js'), 'utf8');
const errors = [];
const fail = message => errors.push(message);

if (manifest.master_count !== manifest.masters.length) fail(`master_count=${manifest.master_count}, actual=${manifest.masters.length}`);
const ids = manifest.masters.map(m => m.id);
if (new Set(ids).size !== ids.length) fail('duplicate master ID');
const assets = manifest.masters.map(m => m.asset);
if (new Set(assets).size !== assets.length) fail('duplicate master asset path');

const imageQuestions = dataset.questions.filter(q => q.type === 'image_mcq');
const qById = new Map(imageQuestions.map(q => [q.id, q]));
const assigned = new Map();

for (const master of manifest.masters) {
  for (const field of ['id', 'asset', 'domain', 'name', 'view', 'scale', 'source_asset', 'status']) {
    if (!master[field]) fail(`${master.id || '?'}: missing ${field}`);
  }
  for (const field of ['structures', 'marker_targets', 'questions']) {
    if (!Array.isArray(master[field]) || master[field].length === 0) fail(`${master.id}: ${field} must be a non-empty array`);
  }
  if (!master.generation || typeof master.generation.required !== 'boolean' || !master.generation.prompt) fail(`${master.id}: invalid generation specification`);
  if (!master.provenance || !master.provenance.source || !master.provenance.license || !master.provenance.reference) fail(`${master.id}: incomplete provenance`);
  const masterFile = path.join(repo, master.asset);
  const sourceFile = path.join(repo, master.source_asset);
  if (master.status === 'accepted-existing' && !fs.existsSync(masterFile)) fail(`${master.id}: accepted asset missing: ${master.asset}`);
  if (master.status === 'accepted-existing' && master.generation.required) fail(`${master.id}: accepted-existing cannot require generation`);
  if (master.status === 'accepted-existing' && fs.existsSync(masterFile) && fs.existsSync(sourceFile)) {
    const digest = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
    if (digest(masterFile) !== digest(sourceFile)) fail(`${master.id}: library asset differs from source_asset`);
  }
  if (master.status === 'accepted-existing' && !swSource.includes(`./${master.asset}`)) fail(`${master.id}: missing from Service Worker precache`);
  for (const qid of master.questions) {
    if (assigned.has(qid)) fail(`${qid}: assigned to both ${assigned.get(qid)} and ${master.id}`);
    assigned.set(qid, master.id);
    const q = qById.get(qid);
    if (!q) fail(`${master.id}: ${qid} is not an image_mcq`);
    else if (q.image.asset !== master.asset) fail(`${qid}: dataset asset ${q.image.asset} != ${master.asset}`);
  }
}

for (const q of imageQuestions) if (!assigned.has(q.id)) fail(`${q.id}: no master assignment`);
if (assigned.size !== imageQuestions.length) fail(`assigned=${assigned.size}, image_mcq=${imageQuestions.length}`);
if (new Set(imageQuestions.map(q => q.image.asset)).size !== manifest.masters.length) fail('dataset unique asset count differs from master count');

console.log('=== common illustration library v1 ===');
console.log(`masters: ${manifest.masters.length}`);
console.log(`image questions assigned: ${assigned.size}/${imageQuestions.length}`);
console.log(`accepted-existing: ${manifest.masters.filter(m => m.status === 'accepted-existing').length}`);
console.log(`pending-generation: ${manifest.masters.filter(m => m.status === 'pending-generation').length}`);
console.log(`errors: ${errors.length}`);
for (const error of errors) console.log(`  [FAIL] ${error}`);
process.exitCode = errors.length ? 1 : 0;
