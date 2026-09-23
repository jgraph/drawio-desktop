// Regression tests for GUI backup symlink writes [GHSA-36x5-vw5q-29rv].
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import os from 'os';
import path from 'path';
import vm from 'vm';
import { writeBackupFile } from '../main/backup-file.js';

const original = '<mxfile><diagram name="ATTACKER-CONTROLLED-BACKUP-MARKER"/></mxfile>';
const edited = '<mxfile><diagram name="USER-EDIT"/></mxfile>';
const sentinel = 'SAFE-VICTIM-TARGET\n';

// Run the actual main-process helpers without starting Electron. Only the
// Electron globals are stubbed; authorisation and saving use the real disk.
const source = fs.readFileSync(new URL('../main/electron.js', import.meta.url), 'utf8');
function section(start, end)
{
	const from = source.indexOf(start);
	const to = source.indexOf(end, from);
	assert.ok(from >= 0 && to > from, 'main-process helper boundaries exist');
	return source.slice(from, to);
}
const helpers = section('function blessPath(p)', '// Paths declared') + '\n' +
	section('const { O_SYNC, O_CREAT, O_WRONLY, O_TRUNC, O_RDONLY }', 'function getDocumentsFolder()');

function fixture(t)
{
	const root = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'drawio-backup-')));
	t.after(() => fs.rmSync(root, {recursive: true, force: true}));
	const directory = path.join(root, 'diagrams');
	const privateDir = path.join(root, 'private');
	const userData = path.join(root, 'user-data');
	const appDir = path.join(root, 'app');
	for (const dir of [directory, privateDir, userData, appDir]) fs.mkdirSync(dir);
	const diagram = path.join(directory, 'poc.drawio');
	const backup = path.join(directory, '.$poc.drawio.bkp');
	const target = path.join(privateDir, 'target.txt');
	fs.writeFileSync(diagram, original);
	fs.writeFileSync(target, sentinel);
	const files = Object.create(fs.promises);
	const context = vm.createContext({
		fs, fsProm: files, path, Buffer, TextDecoder, writeBackupFile,
		app: {getPath: () => userData}, appBaseDir: appDir + path.sep,
		blessedPaths: new Set(), configReadablePaths: new Set(),
		persistBlessedPaths: () => {}, loadConfigReadablePaths: async () => {},
		legacyLibrariesMigration: null, enableStoreBkp: true, isWin: false, __DEV__: false
	});
	vm.runInContext(helpers, context, {filename: 'electron-file-helpers.js'});
	context.blessPath(diagram);
	const save = () => context.saveFile({path: diagram, encoding: 'utf8'},
		edited, fs.statSync(diagram), false);
	return {root, directory, diagram, backup, target, userData, appDir, files, context, save};
}

function symlink(t, target, linkPath, type = 'file')
{
	try
	{
		fs.symlinkSync(target, linkPath, type);
		return true;
	}
	catch (e)
	{
		if (process.platform === 'win32' && e.code === 'EPERM')
		{
			t.skip('creating symbolic links requires Windows Developer Mode or admin rights');
			return false;
		}
		throw e;
	}
}

describe('GUI save authorisation', () =>
{
	test('normal saves retain the previous diagram and replace an existing backup', async (t) =>
	{
		const f = fixture(t);
		fs.writeFileSync(f.backup, 'OLDER BACKUP');
		await f.save();
		assert.equal(fs.readFileSync(f.backup, 'utf8'), original);
		assert.equal(fs.readFileSync(f.diagram, 'utf8'), edited);
		assert.deepEqual(fs.readdirSync(f.directory).sort(), ['.$poc.drawio.bkp', 'poc.drawio']);
	});

	for (const missing of [false, true])
	{
		test('skips a backup symlink to an ' + (missing ? 'absent' : 'existing') + ' outside target', async (t) =>
		{
			const f = fixture(t);
			if (missing) fs.unlinkSync(f.target);
			if (!symlink(t, path.relative(f.directory, f.target), f.backup)) return;
			await assert.rejects(f.context.assertWritablePath(f.target), /path not authorised/);
			await assert.rejects(f.context.assertWritablePath(f.backup), /path not authorised/);
			await f.save();
			assert.equal(fs.readFileSync(f.diagram, 'utf8'), edited);
			assert.ok(fs.lstatSync(f.backup).isSymbolicLink());
			if (missing) assert.equal(fs.existsSync(f.target), false);
			else assert.equal(fs.readFileSync(f.target, 'utf8'), sentinel);
		});
	}

	test('skips looping backup symlinks', async (t) =>
	{
		const f = fixture(t);
		if (!symlink(t, path.basename(f.backup), f.backup)) return;
		await assert.rejects(f.context.assertWritablePath(f.backup), /path not authorised/);
		await f.save();
		assert.equal(fs.readFileSync(f.diagram, 'utf8'), edited);
	});

	test('does not authorise a blessed filename retargeted to another file', async (t) =>
	{
		const f = fixture(t);
		fs.unlinkSync(f.diagram);
		if (!symlink(t, f.target, f.diagram)) return;
		await assert.rejects(f.context.assertWritablePath(f.diagram), /path not authorised/);
		await assert.rejects(f.context.assertReadablePath(f.diagram), /path not authorised/);
		await assert.rejects(f.context.writeFile(f.diagram, edited, 'utf8'), /path not authorised/);
		assert.equal(fs.readFileSync(f.target, 'utf8'), sentinel);
	});

	test('does not authorise draft symlinks for reading or writing', async (t) =>
	{
		const f = fixture(t);
		const draft = path.join(f.directory, '.$poc.drawio.dtmp');
		if (!symlink(t, f.target, draft)) return;
		await assert.rejects(f.context.assertReadablePath(draft), /path not authorised/);
		await assert.rejects(f.context.saveDraft({path: f.diagram, draftFileName: draft}, edited),
			/path not authorised/);
		assert.equal(fs.readFileSync(f.target, 'utf8'), sentinel);
	});

	test('permits explicitly opened symlinks whose real target was blessed', async (t) =>
	{
		const f = fixture(t);
		const alias = path.join(f.directory, 'alias.drawio');
		if (!symlink(t, f.diagram, alias)) return;
		f.context.blessPath(alias);
		await f.context.assertReadablePath(alias);
		await f.context.saveFile({path: alias, encoding: 'utf8'}, edited, fs.statSync(alias), false);
		assert.equal(fs.readFileSync(f.diagram, 'utf8'), edited);
		assert.equal(fs.readFileSync(path.join(f.directory, '.$alias.drawio.bkp'), 'utf8'), original);
	});

	test('Save As and subsequent backups work in a symlinked directory', async (t) =>
	{
		const f = fixture(t);
		const alias = path.join(f.root, 'linked-directory');
		if (!symlink(t, f.directory, alias, 'dir')) return;
		const newFile = path.join(alias, 'new.drawio');
		f.context.blessPath(newFile);
		await f.context.saveFile({path: newFile, encoding: 'utf8'}, original, null, false);
		await f.context.saveFile({path: newFile, encoding: 'utf8'}, edited, fs.statSync(newFile), false);
		assert.equal(fs.readFileSync(path.join(f.directory, 'new.drawio'), 'utf8'), edited);
		assert.equal(fs.readFileSync(path.join(f.directory, '.$new.drawio.bkp'), 'utf8'), original);
	});

	test('configured reads require the current canonical target', async (t) =>
	{
		const f = fixture(t);
		const alias = path.join(f.directory, 'library.xml');
		if (!symlink(t, f.diagram, alias)) return;
		f.context.configReadablePaths.add(alias);
		f.context.configReadablePaths.add(f.diagram);
		await f.context.assertReadablePath(alias);
		fs.unlinkSync(alias);
		fs.symlinkSync(f.target, alias, 'file');
		await assert.rejects(f.context.assertReadablePath(alias), /path not authorised/);
	});

	test('retains the app and userData write exclusions even for blessed paths', async (t) =>
	{
		const f = fixture(t);
		for (const dir of [f.appDir, f.userData])
		{
			const protectedFile = path.join(dir, 'file.drawio');
			fs.writeFileSync(protectedFile, original);
			f.context.blessPath(protectedFile);
			await assert.rejects(f.context.writeFile(protectedFile, edited, 'utf8'), /path not authorised/);
			assert.equal(fs.readFileSync(protectedFile, 'utf8'), original);
		}
	});

	test('retains regular file saves on filesystems without realpath support', async (t) =>
	{
		const f = fixture(t);
		f.files.realpath = async () => { throw Object.assign(new Error('unsupported'), {code: 'ENOSYS'}); };
		await f.save();
		assert.equal(fs.readFileSync(f.backup, 'utf8'), original);
		assert.equal(fs.readFileSync(f.diagram, 'utf8'), edited);
		await assert.rejects(f.context.assertWritablePath(f.target), /path not authorised/);
	});

	test('skips backup symlinks even when realpath is unsupported', async (t) =>
	{
		const f = fixture(t);
		if (!symlink(t, f.target, f.backup)) return;
		f.files.realpath = async () => { throw Object.assign(new Error('unsupported'), {code: 'ENOSYS'}); };
		await assert.rejects(f.context.assertWritablePath(f.backup), /path not authorised/);
		await f.save();
		assert.equal(fs.readFileSync(f.target, 'utf8'), sentinel);
	});

	test('disabled backups do not inspect or write the backup target', async (t) =>
	{
		const f = fixture(t);
		if (!symlink(t, f.target, f.backup)) return;
		f.context.enableStoreBkp = false;
		const checked = [];
		f.files.realpath = async (file) =>
		{
			checked.push(file);
			return fs.promises.realpath(file);
		};
		await f.save();
		assert.ok(!checked.includes(f.backup));
		assert.equal(fs.readFileSync(f.target, 'utf8'), sentinel);
		assert.equal(fs.readFileSync(f.diagram, 'utf8'), edited);
	});

	test('a backup symlink planted after authorisation cannot redirect the save', async (t) =>
	{
		const f = fixture(t);
		// Check link support before injecting the race into the save.
		const probe = path.join(f.root, 'probe');
		if (!symlink(t, f.target, probe)) return;
		let planted = false;
		f.files.readFile = async (...args) =>
		{
			const data = await fs.promises.readFile(...args);
			if (!planted && args[0] === f.diagram)
			{
				fs.symlinkSync(f.target, f.backup, 'file');
				planted = true;
			}
			return data;
		};
		await f.save();
		assert.ok(planted);
		assert.equal(fs.readFileSync(f.target, 'utf8'), sentinel);
		assert.equal(fs.readFileSync(f.diagram, 'utf8'), edited);
		assert.equal(fs.readFileSync(f.backup, 'utf8'), original);
		assert.equal(fs.lstatSync(f.backup).isSymbolicLink(), false);
	});

	test('a failed backup replacement retains the old backup and still saves the diagram', async (t) =>
	{
		const f = fixture(t);
		fs.writeFileSync(f.backup, 'OLDER BACKUP');
		t.mock.method(fs.promises, 'rename', async () => { throw new Error('rename failed'); });
		await f.save();
		assert.equal(fs.readFileSync(f.diagram, 'utf8'), edited);
		assert.equal(fs.readFileSync(f.backup, 'utf8'), 'OLDER BACKUP');
		assert.deepEqual(fs.readdirSync(f.directory).sort(), ['.$poc.drawio.bkp', 'poc.drawio']);
	});
});

describe('writeBackupFile', () =>
{
	for (const missing of [false, true])
	{
		test('replaces a ' + (missing ? 'dangling' : 'live') + ' symlink without writing its target', async (t) =>
		{
			const f = fixture(t);
			if (missing) fs.unlinkSync(f.target);
			if (!symlink(t, f.target, f.backup)) return;
			await writeBackupFile(f.backup, original, 'utf8');
			assert.equal(fs.lstatSync(f.backup).isSymbolicLink(), false);
			assert.equal(fs.readFileSync(f.backup, 'utf8'), original);
			if (missing) assert.equal(fs.existsSync(f.target), false);
			else assert.equal(fs.readFileSync(f.target, 'utf8'), sentinel);
		});
	}

	test('does not overwrite other names of a hard-linked backup', async (t) =>
	{
		const f = fixture(t);
		fs.linkSync(f.target, f.backup);
		await f.save();
		assert.equal(fs.readFileSync(f.target, 'utf8'), sentinel);
		assert.equal(fs.readFileSync(f.backup, 'utf8'), original);
	});

	test('retains binary backup data', async (t) =>
	{
		const f = fixture(t);
		const data = Buffer.from([0, 255, 128, 10, 13]);
		await writeBackupFile(f.backup, data.toString('binary'), 'binary');
		assert.deepEqual(fs.readFileSync(f.backup), data);
	});

	test('does not follow or delete a collision at the temporary filename', async (t) =>
	{
		const f = fixture(t);
		if (!symlink(t, f.target, path.join(f.root, 'probe'))) return;
		const open = fs.promises.open;
		let collision;
		t.mock.method(fs.promises, 'open', async (file, ...args) =>
		{
			collision = file;
			fs.symlinkSync(f.target, file, 'file');
			return open(file, ...args);
		});
		await assert.rejects(writeBackupFile(f.backup, original, 'utf8'), {code: 'EEXIST'});
		assert.equal(fs.readFileSync(f.target, 'utf8'), sentinel);
		assert.ok(fs.lstatSync(collision).isSymbolicLink());
		assert.equal(fs.existsSync(f.backup), false);
	});

	test('cleans up a partial write without damaging the previous backup', async (t) =>
	{
		const f = fixture(t);
		fs.writeFileSync(f.backup, 'OLDER BACKUP');
		const open = fs.promises.open;
		let handle;
		t.mock.method(fs.promises, 'open', async (...args) =>
		{
			handle = await open(...args);
			t.mock.method(handle, 'writeFile', async () =>
			{
				await handle.write('PARTIAL');
				throw new Error('write failed');
			});
			return handle;
		});
		await assert.rejects(writeBackupFile(f.backup, original, 'utf8'), /write failed/);
		await assert.rejects(handle.stat(), {code: 'EBADF'});
		assert.equal(fs.readFileSync(f.backup, 'utf8'), 'OLDER BACKUP');
		assert.deepEqual(fs.readdirSync(f.directory).sort(), ['.$poc.drawio.bkp', 'poc.drawio']);
	});
});
