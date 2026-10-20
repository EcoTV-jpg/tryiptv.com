
const fs = require('fs');

function fail(msg) { console.error(msg); process.exit(1); }
function isObj(v){ return v && typeof v === 'object' && !Array.isArray(v); }
function str(v){ return typeof v === 'string' && v.length > 0; }
function arr(v){ return Array.isArray(v); }

const file = process.argv[2] || 'coverage-ledger.json';
let data;
try { data = JSON.parse(fs.readFileSync(file,'utf8')); } catch(e){ fail(`Invalid JSON: ${e.message}`); }
if (!arr(data)) fail('Coverage ledger must be an array');
const ids = new Set();
const statuses = new Set(['not_checked','checked','needs_validation','not_applicable']);
for (const [i,x] of data.entries()){
  if (!isObj(x)) fail(`Entry ${i} must be object`);
  for (const k of ['unit_id','class','scope','status']) if(!str(x[k])) fail(`Entry ${i}: missing ${k}`);
  if (ids.has(x.unit_id)) fail(`Duplicate unit_id: ${x.unit_id}`);
  ids.add(x.unit_id);
  if(!statuses.has(x.status)) fail(`Entry ${i}: invalid status`);
  if(!arr(x.checks) || !arr(x.evidence)) fail(`Entry ${i}: checks/evidence must be arrays`);
}
console.log(`OK: ${data.length} coverage units`);
