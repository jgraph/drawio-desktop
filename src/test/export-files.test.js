// Unit tests for the CLI export's file handling — exercises src/main/export-files.js
// against a scratch tree with symbolic links [GHSA-2w35-fgjm-2vvh]
// Run with: npm test
import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { O_NOFOLLOW, lexists, isSymbolicLink, listExportFiles, openExportFile } from '../main/export-files.js';

const exts = ['.drawio', '.xml', '.csv', '.png'];

let tmp, root, outside, canLink;

function write(p, data)
{
	fs.mkdirSync(path.dirname(p), {recursive: true});
	fs.writeFileSync(p, data);
}

function link(target, p)
{
	fs.symlinkSync(target, p, fs.existsSync(path.resolve(path.dirname(p), target)) &&
		fs.statSync(path.resolve(path.dirname(p), target)).isDirectory() ? 'dir' : 'file');
}

// Writes data the way the CLI export does
function exportTo(fileName, data, followLink)
{
	const fh = openExportFile(fileName, followLink);

	try
	{
		fs.writeFileSync(fh, data);
	}
	finally
	{
		fs.closeSync(fh);
	}
}

function scan(dir, recursive)
{
	const skipped = [];
	const files = listExportFiles(dir, recursive, exts, p => skipped.push(p));
	const rel = list => list.map(p => path.relative(root, p).split(path.sep).join('/')).sort();

	return {files: rel(files), skipped: rel(skipped)};
}

before(() =>
{
	// No realpath: on macOS the temp folder sits below the /var -> /private/var
	// link, and links above the last path component must keep working
	tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'drawio-export-files-'));
	root = path.join(tmp, 'root');
	outside = path.join(tmp, 'outside');

	write(path.join(outside, 'secret.drawio'), '<mxfile>SECRET</mxfile>');
	write(path.join(outside, 'notes.txt'), 'header\nprivate line\n');
	write(path.join(outside, 'dir', 'e.drawio'), '<mxfile/>');
	write(path.join(root, 'a.drawio'), '<mxfile/>');
	write(path.join(root, 'B.XML'), '<mxfile/>');
	write(path.join(root, '.hidden.drawio'), '<mxfile/>');
	write(path.join(root, 'readme.md'), '# readme');
	write(path.join(root, 'sub', 'c.drawio'), '<mxfile/>');
	write(path.join(root, 'sub', 'deeper', 'd.png'), 'png');

	// Creating symbolic links on Windows needs Developer Mode or admin rights
	try
	{
		link('../outside/secret.drawio', path.join(root, 'leak.drawio'));
		canLink = true;
	}
	catch (e)
	{
		canLink = false;
		return;
	}

	link('../outside/notes.txt', path.join(root, 'leak.csv'));
	link('a.drawio', path.join(root, 'alias.drawio'));
	link('a.drawio', path.join(root, 'link.txt'));
	link('../outside/dir', path.join(root, 'escape'));
	link('.', path.join(root, 'loop'));
	link('..', path.join(root, 'sub', 'up'));
	link('missing.drawio', path.join(root, 'broken.drawio'));
	link('missing.txt', path.join(root, 'broken.txt'));
});

after(() =>
{
	fs.rmSync(tmp, {recursive: true, force: true});
});

// ─── listExportFiles ─────────────────────────────────────────────────────────

describe('listExportFiles', () =>
{
	test('lists regular files with an exportable extension', () =>
	{
		assert.deepEqual(scan(root, false).files, ['B.XML', 'a.drawio']);
	});

	test('recurses into real folders only', () =>
	{
		assert.deepEqual(scan(root, true).files,
			['B.XML', 'a.drawio', 'sub/c.drawio', 'sub/deeper/d.png']);
	});

	test('does not follow links to files, even inside the folder', (t) =>
	{
		if (!canLink) return t.skip('cannot create symbolic links');

		const files = scan(root, false).files;
		assert.ok(!files.includes('leak.drawio'));
		assert.ok(!files.includes('leak.csv'));
		assert.ok(!files.includes('alias.drawio'));
	});

	test('does not follow links to folders, so loops end', (t) =>
	{
		if (!canLink) return t.skip('cannot create symbolic links');

		const files = scan(root, true).files;
		assert.ok(!files.some(f => f.startsWith('escape/') || f.startsWith('loop/') ||
			f.startsWith('sub/up/')));
	});

	test('dangling links do not fail the scan', (t) =>
	{
		if (!canLink) return t.skip('cannot create symbolic links');

		assert.doesNotThrow(() => scan(root, true));
	});

	test('reports skipped links named like exportable files', (t) =>
	{
		if (!canLink) return t.skip('cannot create symbolic links');

		// Dangling or not, but not link.txt or links to folders
		const skipped = ['alias.drawio', 'broken.drawio', 'leak.csv', 'leak.drawio'];
		assert.deepEqual(scan(root, false).skipped, skipped);
		assert.deepEqual(scan(root, true).skipped, skipped);
	});

	test('never looks at what a link points to', (t) =>
	{
		if (!canLink) return t.skip('cannot create symbolic links');

		// A link to a network path would make a connection
		const spies = ['statSync', 'existsSync', 'realpathSync', 'readFileSync', 'openSync']
			.map(name => t.mock.method(fs, name));

		scan(root, true);
		assert.deepEqual(spies.map(spy => spy.mock.callCount()), [0, 0, 0, 0, 0]);
	});

	test('follows a link given as the folder itself', (t) =>
	{
		if (!canLink) return t.skip('cannot create symbolic links');

		const linkedRoot = path.join(tmp, 'linked-root');
		link('root', linkedRoot);
		assert.deepEqual(listExportFiles(linkedRoot, false, exts).map(p => path.basename(p)).sort(),
			['B.XML', 'a.drawio']);
	});
});

// ─── lexists / isSymbolicLink ────────────────────────────────────────────────

describe('lexists', () =>
{
	test('regular and missing files', () =>
	{
		assert.equal(lexists(path.join(root, 'a.drawio')), true);
		assert.equal(lexists(path.join(root, 'nothing.drawio')), false);
	});

	test('a dangling link exists, unlike with fs.existsSync', (t) =>
	{
		if (!canLink) return t.skip('cannot create symbolic links');

		assert.equal(fs.existsSync(path.join(root, 'broken.drawio')), false);
		assert.equal(lexists(path.join(root, 'broken.drawio')), true);
	});
});

describe('isSymbolicLink', () =>
{
	test('regular, missing and linked paths', (t) =>
	{
		assert.equal(isSymbolicLink(path.join(root, 'a.drawio')), false);
		assert.equal(isSymbolicLink(path.join(root, 'sub')), false);
		assert.equal(isSymbolicLink(path.join(root, 'nothing.drawio')), false);

		if (!canLink) return t.skip('cannot create symbolic links');

		assert.equal(isSymbolicLink(path.join(root, 'alias.drawio')), true);
		assert.equal(isSymbolicLink(path.join(root, 'broken.drawio')), true);
		assert.equal(isSymbolicLink(path.join(root, 'escape')), true);
	});
});

// ─── openExportFile ──────────────────────────────────────────────────────────

describe('openExportFile', () =>
{
	test('creates a new file', () =>
	{
		const out = path.join(tmp, 'out', 'new.html');
		fs.mkdirSync(path.dirname(out), {recursive: true});
		exportTo(out, 'NEW');
		assert.equal(fs.readFileSync(out, 'utf8'), 'NEW');
	});

	test('truncates and overwrites an existing file', () =>
	{
		const out = path.join(tmp, 'out', 'existing.html');
		write(out, 'OLD CONTENT THAT IS LONGER');
		exportTo(out, 'NEW');
		assert.equal(fs.readFileSync(out, 'utf8'), 'NEW');
	});

	test('refuses a link to an existing file and leaves the target alone', (t) =>
	{
		if (!canLink) return t.skip('cannot create symbolic links');

		const target = path.join(outside, 'target.txt');
		const out = path.join(root, 'overwrite.html');
		write(target, 'SAFE');
		link('../outside/target.txt', out);

		assert.throws(() => exportTo(out, 'ATTACKER'), {code: 'ELOOP'});
		assert.equal(fs.readFileSync(target, 'utf8'), 'SAFE');
		assert.equal(isSymbolicLink(out), true);
	});

	test('refuses a dangling link and does not create its target', (t) =>
	{
		if (!canLink) return t.skip('cannot create symbolic links');

		const out = path.join(root, 'dangle.html');
		link('../outside/created.txt', out);

		assert.throws(() => exportTo(out, 'ATTACKER'), {code: 'ELOOP'});
		assert.equal(fs.existsSync(path.join(outside, 'created.txt')), false);
	});

	test('writes into a linked folder, only the file name itself is checked', (t) =>
	{
		if (!canLink) return t.skip('cannot create symbolic links');

		const realDir = path.join(tmp, 'outreal');
		fs.mkdirSync(realDir);
		link('outreal', path.join(tmp, 'outlink'));
		exportTo(path.join(tmp, 'outlink', 'in.html'), 'OK');
		assert.equal(fs.readFileSync(path.join(realDir, 'in.html'), 'utf8'), 'OK');
	});

	test('follows a link when followLink is set (typed -o file name)', (t) =>
	{
		if (!canLink) return t.skip('cannot create symbolic links');

		const target = path.join(tmp, 'typed-target.pdf');
		const out = path.join(tmp, 'typed.pdf');
		write(target, 'OLD');
		link('typed-target.pdf', out);

		exportTo(out, 'NEW', true);
		assert.equal(fs.readFileSync(target, 'utf8'), 'NEW');
	});

	test('O_NOFOLLOW refuses a link planted after the lstat check', (t) =>
	{
		if (process.platform == 'win32') return t.skip('Windows has no O_NOFOLLOW');
		if (!canLink) return t.skip('cannot create symbolic links');

		assert.notEqual(O_NOFOLLOW, 0);
		const target = path.join(outside, 'race.txt');
		const out = path.join(root, 'race.html');
		write(target, 'SAFE');
		link('../outside/race.txt', out);

		// What openExportFile passes to open once the check has passed
		const { O_SYNC, O_CREAT, O_WRONLY, O_TRUNC } = fs.constants;
		assert.throws(() => fs.openSync(out, O_SYNC | O_CREAT | O_WRONLY | O_TRUNC | O_NOFOLLOW),
			{code: 'ELOOP'});
		assert.equal(fs.readFileSync(target, 'utf8'), 'SAFE');
	});
});
