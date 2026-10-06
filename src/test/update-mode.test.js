// Unit tests for the per-install update mode — exercises src/main/update-mode.js
// [jgraph/drawio-desktop#2569]
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { getUpdateMode, getReleaseUrl } from '../main/update-mode.js';

const winExe = 'C:\\Program Files\\draw.io\\draw.io.exe';
const winUninstaller = 'C:\\Program Files\\draw.io\\Uninstall draw.io.exe';
const linuxResources = '/opt/drawio/resources';

function mode(opts, files = [])
{
	return getUpdateMode({
		platform: 'win32',
		env: {},
		execPath: winExe,
		resourcesPath: linuxResources,
		productName: 'draw.io',
		windowsStore: false,
		exists: (p) => files.includes(p),
		...opts
	});
}

describe('getUpdateMode on Windows', () =>
{
	test('NSIS install updates automatically', () =>
	{
		assert.equal(mode({}, [winUninstaller]), 'auto');
	});

	test('MSI and zip installs only notify', () =>
	{
		// No NSIS uninstaller next to the exe
		assert.equal(mode({}), 'notify');
	});

	test('portable exe only notifies', () =>
	{
		const env = {PORTABLE_EXECUTABLE_FILE: 'D:\\tools\\draw.io-arm64-31.7.0-windows-arm64-no-installer.exe'};
		assert.equal(mode({env}, [winUninstaller]), 'notify');
	});

	test('Store install is off', () =>
	{
		assert.equal(mode({windowsStore: true}, [winUninstaller]), 'off');
	});
});

describe('getUpdateMode on macOS', () =>
{
	test('updates automatically', () =>
	{
		assert.equal(mode({platform: 'darwin', execPath: '/Applications/draw.io.app/Contents/MacOS/draw.io'}), 'auto');
	});
});

describe('getUpdateMode on Linux', () =>
{
	const linux = {platform: 'linux', execPath: '/opt/drawio/drawio'};

	test('AppImage updates automatically', () =>
	{
		assert.equal(mode({...linux, env: {APPIMAGE: '/home/u/drawio-x86_64-31.7.0.AppImage'}}), 'auto');
	});

	test('deb and rpm installs only notify', () =>
	{
		assert.equal(mode(linux, [linuxResources + '/package-type']), 'notify');
	});

	test('snap is off', () =>
	{
		assert.equal(mode({...linux, env: {SNAP: '/snap/drawio/292'}}), 'off');
	});

	test('flatpak is off', () =>
	{
		assert.equal(mode(linux, ['/.flatpak-info', linuxResources + '/package-type']), 'off');
	});

	test('unknown packaging is off', () =>
	{
		assert.equal(mode(linux), 'off');
	});
});

describe('getReleaseUrl', () =>
{
	test('points at the version tag', () =>
	{
		assert.equal(getReleaseUrl('31.8.0'), 'https://github.com/jgraph/drawio-desktop/releases/tag/v31.8.0');
	});
});
