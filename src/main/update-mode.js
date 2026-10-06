import path from 'path';

// How this install gets updates: 'auto' downloads in the background and installs
// on quit or on Restart to Update, 'notify' only says that a new version is out
// and links to its release page, 'off' never checks.
// Only the installer that made an install may update it in place. NSIS installs
// have its uninstaller next to the exe; MSI, zip and portable builds do not, and
// running the NSIS installer over them leaves files that nothing tracks
// [jgraph/drawio-desktop#2142]. deb and rpm installs carry electron-builder's
// package-type marker and are left to the package manager instead of a pkexec
// dpkg/rpm run at quit. Snap, Flatpak and the Store update the app themselves
// [jgraph/drawio-desktop#2569]
export function getUpdateMode({platform, env, execPath, resourcesPath, productName, windowsStore, exists})
{
	if (windowsStore || env.SNAP != null || exists('/.flatpak-info'))
	{
		return 'off';
	}

	if (platform === 'darwin')
	{
		return 'auto';
	}

	if (platform === 'win32')
	{
		if (env.PORTABLE_EXECUTABLE_FILE != null)
		{
			return 'notify';
		}

		return exists(path.win32.join(path.win32.dirname(execPath),
			'Uninstall ' + productName + '.exe')) ? 'auto' : 'notify';
	}

	if (env.APPIMAGE != null)
	{
		return 'auto';
	}

	return exists(path.posix.join(resourcesPath, 'package-type')) ? 'notify' : 'off';
}

// Release page for the download link in notify mode
export function getReleaseUrl(version)
{
	return 'https://github.com/jgraph/drawio-desktop/releases/tag/v' + encodeURIComponent(version);
}
