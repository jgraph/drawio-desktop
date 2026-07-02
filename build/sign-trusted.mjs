// Custom electron-builder Windows signing hook backed by Azure Trusted Signing
// (rebranded "Artifact Signing" but the dlib retains its original name).
//
// Invoked by electron-builder for every Windows binary that needs signing —
// the packaged draw.io.exe inside win-unpacked/, plus each NSIS/MSI installer
// artifact. Inner binary is signed before NSIS bundles it, so the installed
// app has a valid signature on the executable a user runs.
//
// Auth uses DefaultAzureCredential via env vars set in the workflow:
//   AZURE_TENANT_ID, AZURE_CLIENT_ID, AZURE_CLIENT_SECRET
//
// Tooling expected on PATH / pinned via env vars:
//   TRUSTED_SIGNING_DLIB_PATH — Azure.CodeSigning.Dlib.dll (NuGet-extracted)
//   SIGNTOOL_PATH             — signtool.exe from the Windows SDK

import { execFileSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import os from 'os';

const ENDPOINT = 'https://weu.codesigning.azure.net';
const ACCOUNT_NAME = 'drawio-signing';
const PROFILE_NAME = 'drawio-codesign';

export default async function (configuration)
{
    // Explicit opt-out for personal/fork builds with no signing
    // infrastructure. See doc/BUILDING_FOR_PERSONAL_USE.md.
    if (process.env.DRAWIO_UNSIGNED === 'true')
    {
        console.log(`DRAWIO_UNSIGNED=true: skipping code signing for ${configuration.path}`);
        return;
    }

    const dlibPath = process.env.TRUSTED_SIGNING_DLIB_PATH;
    const signtool = process.env.SIGNTOOL_PATH;

    if (!dlibPath || !fs.existsSync(dlibPath))
    {
        throw new Error(`Trusted Signing dlib not found at "${dlibPath}". The "Set up signing dependencies" workflow step should set TRUSTED_SIGNING_DLIB_PATH. For an unsigned personal build, set DRAWIO_UNSIGNED=true instead (see doc/BUILDING_FOR_PERSONAL_USE.md).`);
    }

    if (!signtool || !fs.existsSync(signtool))
    {
        throw new Error(`signtool.exe not found at "${signtool}". The "Set up signing dependencies" workflow step should set SIGNTOOL_PATH.`);
    }

    const metadata = {
        Endpoint: ENDPOINT,
        CodeSigningAccountName: ACCOUNT_NAME,
        CertificateProfileName: PROFILE_NAME
    };

    const metadataPath = path.join(os.tmpdir(), `trusted-signing-${process.pid}-${Date.now()}.json`);
    fs.writeFileSync(metadataPath, JSON.stringify(metadata));

    try
    {
        const file = configuration.path;
        console.log(`Trusted Signing: ${file}`);

        execFileSync(signtool, [
            'sign',
            '/v',
            '/fd', 'SHA256',
            '/td', 'SHA256',
            '/tr', 'http://timestamp.acs.microsoft.com',
            '/dlib', dlibPath,
            '/dmdf', metadataPath,
            file
        ], { stdio: 'inherit' });
    }
    finally
    {
        try { fs.unlinkSync(metadataPath); } catch (e) { /* ignore */ }
    }
}
