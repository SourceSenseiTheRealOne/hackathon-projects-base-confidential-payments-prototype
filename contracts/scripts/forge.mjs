import {spawnSync} from 'node:child_process';
import {existsSync} from 'node:fs';
import {join} from 'node:path';
const arch=process.arch==='x64'?'amd64':process.arch;
const name=`@foundry-rs/forge-${process.platform}-${arch}`;
const binary=join(import.meta.dirname,'..','node_modules',name,'bin',process.platform==='win32'?'forge.exe':'forge');
if(!existsSync(binary)){console.error(`Missing native Foundry binary: ${name}. Run npm ci --ignore-scripts in contracts.`);process.exit(1);}
const result=spawnSync(binary,process.argv.slice(2),{stdio:'inherit'});
if(result.error){console.error(result.error.message);process.exit(1);}
process.exit(result.status??1);
