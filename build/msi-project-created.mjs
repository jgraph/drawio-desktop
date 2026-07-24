// https://github.com/jgraph/drawio-desktop/issues/2487
//
// electron-builder authors the MSI shortcuts with an Icon attribute that
// references the MSI Icon table. Windows Installer caches that icon under
// C:\Windows\Installer\{ProductCode}\ and writes the shortcut's icon location
// against the cached copy, so the shortcut icon breaks when that folder is
// purged by cleanup tools. The generated project sets DISABLEADVTSHORTCUTS=1,
// meaning the shortcuts are created as regular shortcuts targeting the
// installed exe; removing the Icon attribute makes Explorer fall back to the
// icon embedded in draw.io.exe instead. File association (ProgId) icons are
// left untouched as advertised extensions require the Icon table.
import { readFile, writeFile } from 'fs/promises';

export function removeShortcutIcons(wxs)
{
    return wxs.replace(/(<Shortcut\b[^>]*?)\s+Icon="[^"]*"/g, '$1');
}

export default async function (projectFile)
{
    const wxs = await readFile(projectFile, 'utf8');
    const patched = removeShortcutIcons(wxs);

    if (patched === wxs)
    {
        console.warn('msiProjectCreated: no shortcut Icon attributes found, WiX project unchanged');
    }
    else
    {
        await writeFile(projectFile, patched);
        console.log('msiProjectCreated: removed shortcut Icon attributes, shortcuts use the exe icon');
    }
}
