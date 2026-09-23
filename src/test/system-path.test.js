// Unit tests for absolute Windows system program paths — exercises src/main/system-path.js
// [GHSA-qg46-52fx-h7p8]
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import path from 'path';
import { getSystem32Path } from '../main/system-path.js';

describe('getSystem32Path', () =>
{
	test('builds the path from SystemRoot', () =>
	{
		assert.equal(getSystem32Path('attrib.exe', {SystemRoot: 'D:\\WINDOWS'}),
			'D:\\WINDOWS\\System32\\attrib.exe');
	});

	test('keeps subdirectories of System32', () =>
	{
		assert.equal(getSystem32Path('WindowsPowerShell\\v1.0\\powershell.exe', {SystemRoot: 'C:\\Windows'}),
			'C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe');
	});

	test('tolerates a trailing separator', () =>
	{
		assert.equal(getSystem32Path('attrib.exe', {SystemRoot: 'C:\\Windows\\'}),
			'C:\\Windows\\System32\\attrib.exe');
	});

	test('falls back to windir, then C:\\Windows', () =>
	{
		assert.equal(getSystem32Path('attrib.exe', {windir: 'E:\\Win'}), 'E:\\Win\\System32\\attrib.exe');
		assert.equal(getSystem32Path('attrib.exe', {}), 'C:\\Windows\\System32\\attrib.exe');
	});

	test('ignores roots that would resolve against the working directory', () =>
	{
		for (const root of ['', '.', '..\\evil', 'Windows', '\\Windows', 'C:Windows', '\\\\server\\share'])
		{
			assert.equal(getSystem32Path('attrib.exe', {SystemRoot: root}),
				'C:\\Windows\\System32\\attrib.exe', JSON.stringify(root));
		}
	});

	test('always returns an absolute drive path', () =>
	{
		for (const env of [{}, {SystemRoot: 'attrib'}, {SystemRoot: 'C:\\Windows'}])
		{
			const p = getSystem32Path('attrib.exe', env);
			assert.ok(path.win32.isAbsolute(p) && /^[A-Za-z]:\\/.test(p), p);
		}
	});
});
