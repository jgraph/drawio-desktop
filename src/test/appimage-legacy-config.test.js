// Guards the two AppImage variants against silent drift [jgraph/drawio-desktop#2538]
// electron-builder-linux-mac.json ships the static runtime (no libfuse2); the legacy
// config ships the fuse2 runtime for AppImageLauncher 2.x, which cannot load a
// static-PIE runtime. The two must stay identical apart from the runtime, the
// artifact name and the update channel.
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (f) => JSON.parse(readFileSync(new URL('../../' + f, import.meta.url), 'utf8'));

const main = read('electron-builder-linux-mac.json');
const legacy = read('electron-builder-linux-legacy.json');

describe('AppImage legacy variant config', () =>
{
	test('main config selects the static runtime', () =>
	{
		// If this ever goes away the legacy variant is pointless, both builds would
		// ship the same runtime
		assert.ok(main.toolsets?.appimage, 'electron-builder-linux-mac.json must set toolsets.appimage');
	});

	test('legacy config selects no toolset, so it falls back to the fuse2 runtime', () =>
	{
		assert.equal(legacy.toolsets, undefined);
	});

	test('the two builds use separate update channels', () =>
	{
		assert.equal(legacy.publish.channel, 'legacy');
		assert.equal(main.publish.channel, undefined); // undefined means 'latest'
	});

	test('committed update channel default is latest', () =>
	{
		// Catches `npm run sync -- legacy` being run locally and committed, which would
		// point every build at the legacy channel
		const generated = readFileSync(new URL('../main/updateChannel.js', import.meta.url), 'utf8');
		assert.match(generated, /return 'latest';/);
	});

	test('artifact names cannot collide', () =>
	{
		assert.notEqual(legacy.artifactName, main.artifactName);
		assert.match(legacy.artifactName, /-legacy\./);
	});

	test('legacy build still applies the security fuses', () =>
	{
		assert.equal(legacy.afterPack, main.afterPack);
	});

	test('legacy build targets AppImage only', () =>
	{
		assert.deepEqual(legacy.linux.target, [{ target: 'AppImage', arch: ['x64', 'arm64'] }]);
	});

	test('shared packaging settings match the main config', () =>
	{
		assert.equal(legacy.appId, main.appId);
		assert.equal(legacy.asar, main.asar);
		assert.equal(legacy.copyright, main.copyright);
		assert.equal(legacy.npmRebuild, main.npmRebuild);
		assert.deepEqual(legacy.files, main.files);
		assert.deepEqual(legacy.directories, main.directories);
		assert.deepEqual(legacy.fileAssociations, main.fileAssociations);
	});

	test('linux settings match the main config apart from the target list', () =>
	{
		const { target: _mainTarget, ...mainLinux } = main.linux;
		const { target: _legacyTarget, ...legacyLinux } = legacy.linux;
		assert.deepEqual(legacyLinux, mainLinux);
	});
});
