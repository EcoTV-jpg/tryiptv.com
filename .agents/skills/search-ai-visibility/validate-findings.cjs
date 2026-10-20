
const fs = require('fs');

function fail(msg) { console.error(msg); process.exit(1); }
function isObj(v){ return v && typeof v === 'object' && !Array.isArray(v); }
function str(v){ return typeof v === 'string' && v.length > 0; }
function arr(v){ return Array.isArray(v); }

const file = process.argv[2] || 'findings.json';
let data;
try { data = JSON.parse(fs.readFileSync(file,'utf8')); } catch(e){ fail(`Invalid JSON: ${e.message}`); }
if (!arr(data)) fail('Findings must be an array');
const verdicts = new Set(['confirmed','needs_validation','rejected']);
const fps = new Set();
for (const [i,x] of data.entries()){
  if(!isObj(x)) fail(`Finding ${i} must be object`);
  if(!verdicts.has(x.verdict)) fail(`Finding ${i}: invalid verdict`);
  for(const k of ['fingerprint','title','description']) if(!str(x[k])) fail(`Finding ${i}: missing ${k}`);
  if(fps.has(x.fingerprint)) fail(`Duplicate fingerprint: ${x.fingerprint}`);
  fps.add(x.fingerprint);
  if(x.verdict === 'confirmed'){
    for(const k of ['category','root_cause','search_mechanism']) if(!str(x[k])) fail(`Finding ${i}: missing ${k}`);
    if(!arr(x.affected_scope) || !x.affected_scope.length) fail(`Finding ${i}: affected_scope required`);
    if(!arr(x.evidence) || !x.evidence.length) fail(`Finding ${i}: evidence required`);
    if(!isObj(x.remediation) || !str(x.remediation.strategy) || !arr(x.remediation.validation)) fail(`Finding ${i}: remediation invalid`);
    if(!isObj(x.priority) || !str(x.priority.reason)) fail(`Finding ${i}: priority invalid`);
  }
  if(x.verdict === 'needs_validation'){
    if(!arr(x.blockers) || !x.blockers.length || !arr(x.validation_plan) || !x.validation_plan.length) fail(`Finding ${i}: blockers/validation_plan required`);
  }
  if(x.verdict === 'rejected' && !str(x.reason)) fail(`Finding ${i}: reason required`);
}
console.log(`OK: ${data.length} findings`);
