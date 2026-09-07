// Unit tests for the Windows arm64 update channel — exercises src/main/update-channel.js
// and pins the channel name to electron-builder-win-arm64.json so the two cannot drift
// [jgraph/drawio-desktop#2197]
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getUpdateChannel } from '../main/update-channel.js';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const readConfig = (name) => JSON.parse(fs.readFileSync(path.join(root, name), 'utf8'));

describe('getUpdateChannel', () =>
{
	test('windows arm64 uses its own channel', () =>
	{
		assert.equal(getUpdateChannel('win32', 'arm64'), 'latest-arm64');
	});

	test('windows x64 stays on the default latest.yml', () =>
	{
		assert.equal(getUpdateChannel('win32', 'x64'), null);
	});

	test('macOS and Linux are left to electron-updater', () =>
	{
		// latest-mac.yml lists both arches; Linux already gets a -arm64 suffix
		assert.equal(getUpdateChannel('darwin', 'arm64'), null);
		assert.equal(getUpdateChannel('darwin', 'x64'), null);
		assert.equal(getUpdateChannel('linux', 'arm64'), null);
		assert.equal(getUpdateChannel('linux', 'x64'), null);
	});
});

describe('electron-builder publish config', () =>
{
	test('arm64 config publishes the channel the app asks for', () =>
	{
		const config = readConfig('electron-builder-win-arm64.json');
		assert.equal(config.publish.provider, 'github');
		assert.equal(config.publish.channel, getUpdateChannel('win32', 'arm64'));
	});

	test('x64 config publishes plain latest.yml', () =>
	{
		const config = readConfig('electron-builder-win.json');
		assert.equal(config.publish.provider, 'github');
		assert.equal(config.publish.channel, undefined);
	});
});
