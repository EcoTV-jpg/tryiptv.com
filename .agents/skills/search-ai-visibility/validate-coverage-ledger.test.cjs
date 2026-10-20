const fs = require('fs'); const {spawnSync}=require('child_process'); const p=require('path');
const tmp=p.join(__dirname,'.test-ledger.json');
fs.writeFileSync(tmp, JSON.stringify([{unit_id:'home.indexability',class:'crawl',scope:'/',status:'checked',checks:['canonical'],evidence:['source']}]));
const r=spawnSync(process.execPath,[p.join(__dirname,'validate-coverage-ledger.cjs'),tmp],{encoding:'utf8'});
fs.unlinkSync(tmp);
if(r.status!==0){console.error(r.stderr||r.stdout);process.exit(1)} console.log('PASS validate-coverage-ledger');
