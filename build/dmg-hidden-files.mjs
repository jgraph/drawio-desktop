// Positions the DMG's hidden support files (.background.tiff,
// .VolumeIcon.icns, .DS_Store) below the visible installer window so they
// don't clutter the layout when Finder is configured to show hidden files
// [jgraph/drawio-desktop#2475].
//
// electron-builder's config schema only allows dmg.contents entries of type
// file/link/dir, but the dmgbuild tool it delegates to also supports appdmg's
// "position" type, which sets an icon location without copying anything.
// Schema validation runs before hooks, so injecting the entries here (as a
// beforePack hook) lets them through to dmgbuild unvalidated.

// The DMG window is 540x380 (the size of the default background image), so
// anything at y=500 is outside the visible area. .Trashes and .fseventsd
// don't normally survive into the final image, but cover them in case the
// packaging flow changes.
const hiddenFilePositions = [
    { x: 130, y: 500, type: 'position', path: '.background.tiff' },
    { x: 240, y: 500, type: 'position', path: '.VolumeIcon.icns' },
    { x: 350, y: 500, type: 'position', path: '.DS_Store' },
    { x: 460, y: 500, type: 'position', path: '.Trashes' },
    { x: 570, y: 500, type: 'position', path: '.fseventsd' }
];

export default async function (context)
{
    if (context.electronPlatformName !== 'darwin')
    {
        return;
    }

    const dmg = context.packager.config.dmg;

    if (dmg == null)
    {
        return;
    }

    if (dmg.contents == null)
    {
        // Replicate the electron-builder defaults, which are not applied
        // once contents is set (path defaults to the built .app when omitted)
        dmg.contents = [
            { x: 130, y: 220, type: 'file' },
            { x: 410, y: 220, type: 'link', path: '/Applications' }
        ];
    }

    for (const entry of hiddenFilePositions)
    {
        if (!dmg.contents.some(c => c.path === entry.path))
        {
            dmg.contents.push(entry);
        }
    }
}
