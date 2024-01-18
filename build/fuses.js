// https://github.com/electron-userland/electron-builder/issues/6365
const path = require('path');
const { flipFuses, FuseVersion, FuseV1Options } = require('@electron/fuses');
const builder = require('electron-builder');

async function addElectronFuses(context) 
{
    const { appOutDir, packager: { appInfo: { productFilename } }, electronPlatformName, arch } = context;

    const ext = {
        darwin: '.app',
        win32: '.exe',
        linux: [''],
    }[electronPlatformName];

    const IS_LINUX = electronPlatformName === 'linux';
    const executableName = IS_LINUX
        ? productFilename.replace('.', '') // Remove . from "draw.io"
        : productFilename;

    const electronBinaryPath = path.join(appOutDir, `${executableName}${ext}`);

    // We build for x64 and arm64, but universal build for these two also but no fuses is needed at this temp stages
    if (electronBinaryPath.includes('-temp/'))
    {
        return;
    }

    console.log('Flipping fuses for: ', electronBinaryPath);

    await flipFuses(electronBinaryPath, 
    {
        version: FuseVersion.V1,
        [FuseV1Options.RunAsNode]: false, // Disables ELECTRON_RUN_AS_NODE
        [FuseV1Options.EnableCookieEncryption]: true, // Enables cookie encryption
        [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false, // Disables the NODE_OPTIONS environment variable
        [FuseV1Options.EnableNodeCliInspectArguments]: false, // Disables the --inspect and --inspect-brk family of CLI options
        [FuseV1Options.OnlyLoadAppFromAsar]: true, // Enforces that Electron will only load your app from "app.asar" instead of its normal search paths
        // https://github.com/electron-userland/electron-builder/issues/6930 (electron-builder uses its own asar packaging)
        [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: false, // TODO Enables validation of the app.asar archive on macOS
        // Some reports it crashes when enabled on arm64
        [FuseV1Options.LoadBrowserProcessSpecificV8Snapshot]: false, // TODO Loads V8 Snapshot from `browser_v8_context_snapshot.bin` for the browser process
        // Based on docs, this should be enabled for macOS on arm64
        resetAdHocDarwinSignature: electronPlatformName === 'darwin' && (arch === builder.Arch.arm64 || arch === builder.Arch.universal),
    });
}

module.exports = async (context) => 
{
    await addElectronFuses(context);
};