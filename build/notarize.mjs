import dotenv from 'dotenv';
dotenv.config({ quiet: true });
import { notarize } from '@electron/notarize';
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const APPEX_BUNDLE_ID = 'com.jgraph.drawio.desktop.PreviewExtension';
const DRAWIO_UTI = 'com.jgraph.drawio';

/**
 * Finds the codesign identity used to sign the app bundle.
 * Parses the output of `codesign -dvv` to extract the signing authority.
 * Returns '-' (ad-hoc) if no identity can be determined.
 */
function getSigningIdentity(appPath)
{
  try
  {
    const output = execSync(`codesign -dvv "${appPath}" 2>&1`, { encoding: 'utf8' });
    const match = output.match(/^Authority=(.+)$/m);

    if (match && match[1] && match[1] !== '(unavailable)')
    {
      return match[1];
    }
  }
  catch (e)
  {
    // codesign failed, fall back to ad-hoc
  }

  return '-';
}

/**
 * Sets up the macOS Quick Look preview extension for .drawio files.
 *
 * Copies the quicklookjs PreviewExtension.appex into the app bundle,
 * replaces the default preview.html with our draw.io viewer, bundles
 * viewer-static.min.js, and writes a custom Info.plist declaring the
 * com.jgraph.drawio UTI.
 *
 * This runs in afterSign (after electron-builder has signed the app)
 * so the .appex is never present in an unsigned state during the
 * build. Once assembled, it is immediately signed with sandbox
 * entitlements below.
 */
function setupQuickLookExtension(appPath, appVersion)
{
  const plugInsDir = path.join(appPath, 'Contents', 'PlugIns');
  const appexDest = path.join(plugInsDir, 'PreviewExtension.appex');
  const appexResourcesDir = path.join(appexDest, 'Contents', 'Resources');

  const projectDir = path.resolve(__dirname, '..');
  const appexSrc = path.join(projectDir, 'node_modules', 'quicklookjs',
    'dist', 'PreviewExtension.appex');

  // Find viewer-static.min.js (CI copies to build/, local dev uses submodule)
  const viewerCandidates = [
    path.join(projectDir, 'build', 'viewer-static.min.js'),
    path.join(projectDir, 'drawio', 'src', 'main', 'webapp', 'js', 'viewer-static.min.js'),
  ];

  let viewerSrc = null;

  for (const p of viewerCandidates)
  {
    if (fs.existsSync(p))
    {
      viewerSrc = p;
      break;
    }
  }

  if (!viewerSrc)
  {
    console.warn('Quick Look: viewer-static.min.js not found, skipping Quick Look setup');
    console.warn('Quick Look: expected at one of:', viewerCandidates.join(', '));
    return;
  }

  if (!fs.existsSync(appexSrc))
  {
    console.warn('Quick Look: quicklookjs .appex not found at', appexSrc);
    return;
  }

  console.log('Quick Look: setting up preview extension...');
  console.log('Quick Look: using viewer from', viewerSrc);

  // Copy .appex bundle
  fs.mkdirSync(plugInsDir, { recursive: true });
  fs.cpSync(appexSrc, appexDest, { recursive: true });

  // Copy our preview.html
  fs.copyFileSync(
    path.join(__dirname, 'quicklook-preview.html'),
    path.join(appexResourcesDir, 'preview.html')
  );

  // Copy viewer-static.min.js
  fs.copyFileSync(viewerSrc, path.join(appexResourcesDir, 'viewer-static.min.js'));

  // Write custom Info.plist
  const infoPlist = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>CFBundleDevelopmentRegion</key>
	<string>en</string>
	<key>CFBundleDisplayName</key>
	<string>draw.io Quick Look</string>
	<key>CFBundleExecutable</key>
	<string>PreviewExtension</string>
	<key>CFBundleIdentifier</key>
	<string>${APPEX_BUNDLE_ID}</string>
	<key>CFBundleInfoDictionaryVersion</key>
	<string>6.0</string>
	<key>CFBundleName</key>
	<string>PreviewExtension</string>
	<key>CFBundlePackageType</key>
	<string>XPC!</string>
	<key>CFBundleShortVersionString</key>
	<string>${appVersion}</string>
	<key>CFBundleSupportedPlatforms</key>
	<array>
		<string>MacOSX</string>
	</array>
	<key>CFBundleVersion</key>
	<string>1</string>
	<key>LSMinimumSystemVersion</key>
	<string>11.0</string>
	<key>NSExtension</key>
	<dict>
		<key>NSExtensionAttributes</key>
		<dict>
			<key>QLSupportedContentTypes</key>
			<array>
				<string>${DRAWIO_UTI}</string>
			</array>
			<key>QLSupportsSearchableItems</key>
			<false/>
		</dict>
		<key>NSExtensionPointIdentifier</key>
		<string>com.apple.quicklook.preview</string>
		<key>NSExtensionPrincipalClass</key>
		<string>PreviewExtension.PreviewViewController</string>
	</dict>
	<key>QLJS</key>
	<dict>
		<key>loadingStrategy</key>
		<string>waitForSignal</string>
		<key>pagePath</key>
		<string>preview.html</string>
		<key>preferredContentSize</key>
		<string>{800,600}</string>
		<key>transparentBackground</key>
		<false/>
	</dict>
</dict>
</plist>`;

  fs.writeFileSync(path.join(appexDest, 'Contents', 'Info.plist'), infoPlist);

  // Remove the old code signature from the source .appex (it's invalid
  // after our modifications). We sign immediately below.
  const codeSignDir = path.join(appexDest, 'Contents', '_CodeSignature');

  if (fs.existsSync(codeSignDir))
  {
    fs.rmSync(codeSignDir, { recursive: true });
  }

  console.log('Quick Look: setup complete');
}

/**
 * Signs the Quick Look .appex with sandbox entitlements, then re-signs
 * the outer .app bundle so its seal includes the .appex.
 */
function signQuickLookExtension(appPath)
{
  const appexPath = path.join(appPath, 'Contents', 'PlugIns', 'PreviewExtension.appex');

  if (!fs.existsSync(appexPath))
  {
    return;
  }

  const identity = getSigningIdentity(appPath);
  const entitlementsPath = path.join(__dirname, 'quicklook-entitlements.plist');
  const mainEntitlementsPath = path.join(__dirname, 'entitlements.mac.plist');

  if (identity === '-')
  {
    console.log('Quick Look: no signing identity found, using ad-hoc signing');

    // Sign the .appex with sandbox entitlements (required for Quick Look)
    execSync(
      `codesign -f -s - --entitlements "${entitlementsPath}" "${appexPath}"`,
      { stdio: 'inherit' }
    );

    // Unsigned (personal) builds need a deep ad-hoc re-sign: the fuse
    // changes invalidated the main executable's signature, and dyld
    // refuses to load Electron's original linker-signed frameworks from
    // an executable with a fresh, mismatched ad-hoc signature. Hardened
    // runtime is omitted — its library validation breaks ad-hoc builds
    // and it is pointless without notarization. --preserve-metadata
    // keeps the .appex entitlements applied above.
    execSync(
      `codesign -f -s - --deep --preserve-metadata=entitlements "${appPath}"`,
      { stdio: 'inherit' }
    );
  }
  else
  {
    console.log('Quick Look: signing with identity:', identity);

    // Sign the .appex with sandbox entitlements (required for Quick Look)
    execSync(
      `codesign -f -s "${identity}" --entitlements "${entitlementsPath}" --options runtime "${appexPath}"`,
      { stdio: 'inherit' }
    );

    // Re-sign the outer .app to update its seal (the .appex was added/signed)
    execSync(
      `codesign -f -s "${identity}" --entitlements "${mainEntitlementsPath}" --options runtime "${appPath}"`,
      { stdio: 'inherit' }
    );
  }

  console.log('Quick Look: signing complete');
}

export default async function notarizing(context) {
  const { electronPlatformName, appOutDir } = context;
  const appName = context.packager.appInfo.productFilename;
  const appVersion = context.packager.appInfo.version;

  if (electronPlatformName !== 'darwin') {
    return;
  }

  const appPath = `${appOutDir}/${appName}.app`;

  setupQuickLookExtension(appPath, appVersion);
  signQuickLookExtension(appPath);

  // Explicit opt-out for personal/fork builds with no Apple Developer
  // account. See doc/BUILDING_FOR_PERSONAL_USE.md.
  if (process.env.DRAWIO_UNSIGNED === 'true')
  {
    console.log('DRAWIO_UNSIGNED=true: skipping notarization');
    return;
  }

  return await notarize({
    tool: "notarytool",
    appBundleId: 'com.jgraph.drawio.desktop',
    appPath: appPath,
    appleId: process.env.APPLEID,
    appleIdPassword: process.env.APPLEIDPASS,
    teamId: process.env.APPLE_TEAM_ID
  });
};
