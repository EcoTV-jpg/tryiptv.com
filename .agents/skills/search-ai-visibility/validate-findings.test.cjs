const fs = require('fs'); const {spawnSync}=require('child_process'); const p=require('path');
const tmp=p.join(__dirname,'.test-findings.json');
fs.writeFileSync(tmp, JSON.stringify([{verdict:'rejected',fingerprint:'test.1',title:'x',description:'x',evidence:['x'],reason:'false positive'}]));
const r=spawnSync(process.execPath,[p.join(__dirname,'validate-findings.cjs'),tmp],{encoding:'utf8'});
fs.unlinkSync(tmp);
if(r.status!==0){console.error(r.stderr||r.stdout);process.exit(1)} console.log('PASS validate-findings');
