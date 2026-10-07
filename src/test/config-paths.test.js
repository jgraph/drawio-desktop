// Tests for the configuration paths the renderer may read [jgraph/drawio-desktop#1278].
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { pathToFileURL } from 'url';
import vm from 'vm';
import { collectConfigPathsScript, getLocalFilePath, ConfigPathGrants } from '../main/config-paths.js';

// Stands in for an editor window that runs collectConfigPathsScript. Its only
// global is Editor, so the script also fails here if it reaches outside its own body.
function editorWindow(config)
{
	const page = vm.createContext((config !== undefined) ? {Editor: {config}} : {});
	return {page, executeJavaScript: async (script) => vm.runInContext(script, page)};
}

async function collect(config)
{
	return Array.from(await editorWindow(config).executeJavaScript(collectConfigPathsScript));
}

function memoryStore(values = {})
{
	return {values, get: (key) => values[key], set: (key, value) => { values[key] = value; }};
}

// The store of an install that already adopted the configuration it had
function migratedStore(allowed = [])
{
	return memoryStore({allowedConfigPathsMigrated: true, allowedConfigPaths: allowed});
}

// answer is what the user clicks, or a function of the window and the entries
function grants(store, answer = true, fsImpl = fs)
{
	const asked = [];
	const result = new ConfigPathGrants(fsImpl, store, async (owner, entries) =>
	{
		asked.push(entries.map((entry) => entry.path));
		return (typeof answer === 'function') ? answer(owner, entries) : answer;
	});
	result.asked = asked;
	return result;
}

async function load(configGrants, config)
{
	const win = editorWindow(config);
	configGrants.register(win);
	await configGrants.collect(win);
	return win;
}

function files(t, ...names)
{
	const root = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'drawio-config-')));
	t.after(() => fs.rmSync(root, {recursive: true, force: true}));

	return names.map((name) =>
	{
		const file = path.join(root, name);
		fs.writeFileSync(file, '<mxlibrary>[]</mxlibrary>');
		return file;
	});
}

function libraries(...paths)
{
	return {libraries: [{entries: [{id: 'local', libs: paths.map((p) => ({url: pathToFileURL(p).href}))}]}]};
}

describe('collectConfigPaths', () =>
{
	test('collects the url of every library in the libraries configuration', async () =>
	{
		assert.deepEqual(await collect({libraries: [
			{title: {main: 'One'}, entries: [
				{id: 'a', libs: [{title: {main: 'A1'}, url: 'file:///libs/a1.xml'},
					{title: {main: 'A2'}, data: []}]},
				{id: 'b', libs: [{url: '/libs/b.xml'}]}]},
			{title: {main: 'Two'}, entries: [
				{id: 'c', libs: [{url: 'https://example.com/c.xml'}]}]}]}),
			['file:///libs/a1.xml', '/libs/b.xml', 'https://example.com/c.xml']);
	});

	test('skips malformed library entries', async () =>
	{
		assert.deepEqual(await collect({libraries: [null, 'x', {}, {entries: 'x'},
			{entries: [null, {}, {libs: 'x'}, {libs: [null, {}, {url: 42}, {url: ''},
				{url: '/ok.xml'}]}]}]}), ['/ok.xml']);
		assert.deepEqual(await collect({libraries: 'x'}), []);
	});

	test('collects templates, custom libraries and fonts', async () =>
	{
		assert.deepEqual(await collect({
			templateFile: '/t/templates.xml',
			customTemplates: [{url: '/t/a.drawio', preview: '/t/a.png'}],
			defaultCustomLibraries: ['U' + encodeURIComponent('file:///l/u.xml'), 'S/l/s.xml', 'U'],
			customFonts: [{fontFamily: 'Custom', fontUrl: '/f/custom.ttf'}],
			defaultFonts: ['Helvetica', {fontFamily: 'Default', fontUrl: '/f/default.ttf'}],
			fontCss: '@font-face { src: url("/f/a.woff2"), url(\'/f/b.woff\'); }'
		}), ['/t/templates.xml', '/t/a.drawio', '/t/a.png', 'file:///l/u.xml', '/l/s.xml',
			'/f/custom.ttf', '/f/default.ttf', '/f/a.woff2', '/f/b.woff']);
	});

	test('ignores paths outside the path-carrying keys', async () =>
	{
		assert.deepEqual(await collect({
			css: 'body { background: url(/etc/a.png); }',
			libraries: [{entries: [{id: 'x', url: '/etc/entry.xml', preview: '/etc/preview.png',
				libs: [{title: {main: '/etc/title.xml'}, data: [{xml: '/etc/data.xml'}]}]}]}],
			customTemplates: [{title: '/etc/title.drawio'}],
			unknownKey: {url: '/etc/unknown.xml'}
		}), []);
	});

	test('returns nothing without a configuration', async () =>
	{
		assert.deepEqual(await collect(undefined), []);
		assert.deepEqual(await collect(null), []);
	});
});

describe('getLocalFilePath', () =>
{
	test('returns the path of file URLs, drive, UNC and absolute paths only', () =>
	{
		assert.equal(getLocalFilePath('file:///C:/libs/a%20b.xml?x=1#y'), 'C:/libs/a b.xml');
		assert.equal(getLocalFilePath('file:///libs/a.xml'), '/libs/a.xml');
		assert.equal(getLocalFilePath('C:\\libs\\a.xml'), 'C:\\libs\\a.xml');
		assert.equal(getLocalFilePath('\\\\server\\share\\a.xml'), '\\\\server\\share\\a.xml');
		assert.equal(getLocalFilePath('/libs/a.xml'), '/libs/a.xml');
		assert.equal(getLocalFilePath('https://example.com/a.xml'), null);
		assert.equal(getLocalFilePath('relative.xml'), null);
		assert.equal(getLocalFilePath('file:///%E0%A4%A'), null);
		assert.equal(getLocalFilePath(null), null);
	});
});

describe('ConfigPathGrants', () =>
{
	test('makes configured local library files readable and nothing else', async (t) =>
	{
		const [library, other] = files(t, 'library.xml', 'other.xml');
		const configGrants = grants(migratedStore());
		const win = await load(configGrants, {
			libraries: [{entries: [{id: 'local', libs: [{url: pathToFileURL(library).href},
				{url: 'https://example.com/remote.xml'}, {url: 'relative.xml'}]}]}],
			unknownKey: {url: pathToFileURL(other).href}
		});
		assert.deepEqual(configGrants.asked, [[library]]);
		assert.equal(await configGrants.isReadable(win, library), true);
		assert.equal(await configGrants.isReadable(win, other), false);
	});

	test('never reads the configuration again once the window has loaded', async (t) =>
	{
		const [library, secret] = files(t, 'library.xml', 'credentials.json');
		const configGrants = grants(migratedStore([library]));
		const win = await load(configGrants, libraries(library));
		// What any script in the page can do once a diagram is open
		vm.runInContext('Editor.config = ' + JSON.stringify(libraries(secret)), win.page);
		assert.equal(await configGrants.collect(win), false);
		assert.equal(await configGrants.isReadable(win, secret), false);
		assert.equal(await configGrants.isReadable(win, library), true);
		assert.deepEqual(configGrants.asked, []);
	});

	test('holds reads until the window configuration has been read', async (t) =>
	{
		const [library] = files(t, 'library.xml');
		const configGrants = grants(migratedStore([library]));
		const win = editorWindow(libraries(library));
		configGrants.register(win);
		let collected = false;
		const waiting = configGrants.waitForCollection(win).then(() => collected = true);
		await new Promise((resolve) => setImmediate(resolve));
		assert.equal(collected, false);
		await configGrants.collect(win);
		await waiting;
		assert.equal(collected, true);
	});

	test('gives windows it was never told about no configured paths and no wait', async (t) =>
	{
		const [library] = files(t, 'library.xml');
		const configGrants = grants(migratedStore([library]));
		await load(configGrants, libraries(library));
		const exportWindow = editorWindow(libraries(library));
		await configGrants.waitForCollection(exportWindow);
		assert.equal(await configGrants.collect(exportWindow), false);
		assert.equal(await configGrants.isReadable(exportWindow, library), false);
	});

	test('asks once before a newly configured file becomes readable and remembers it', async (t) =>
	{
		const [library] = files(t, 'library.xml');
		const store = migratedStore();
		const first = grants(store, true);
		assert.equal(await first.isReadable(await load(first, libraries(library)), library), true);
		assert.deepEqual(first.asked, [[library]]);
		const nextLaunch = grants(store, false);
		assert.equal(await nextLaunch.isReadable(await load(nextLaunch, libraries(library)), library), true);
		assert.deepEqual(nextLaunch.asked, []);
	});

	test('keeps a refused file unreadable and asks again on the next launch only', async (t) =>
	{
		const [library] = files(t, 'library.xml');
		const store = migratedStore();
		const configGrants = grants(store, false);
		assert.equal(await configGrants.isReadable(await load(configGrants, libraries(library)), library), false);
		assert.equal(await configGrants.isReadable(await load(configGrants, libraries(library)), library), false);
		assert.deepEqual(configGrants.asked, [[library]]);
		const nextLaunch = grants(store, true);
		assert.equal(await nextLaunch.isReadable(await load(nextLaunch, libraries(library)), library), true);
		assert.deepEqual(nextLaunch.asked, [[library]]);
	});

	test('adopts the configuration found on the first launch with these grants', async (t) =>
	{
		const [library, other] = files(t, 'library.xml', 'other.xml');
		const store = memoryStore();
		const configGrants = grants(store, false);
		assert.equal(await configGrants.isReadable(await load(configGrants, libraries(library)), library), true);
		assert.deepEqual(configGrants.asked, []);
		assert.equal(store.values.allowedConfigPathsMigrated, true);
		const win = await load(configGrants, libraries(library, other));
		assert.deepEqual(configGrants.asked, [[other]]);
		assert.equal(await configGrants.isReadable(win, library), true);
		assert.equal(await configGrants.isReadable(win, other), false);
	});

	test('adopts nothing and remembers nothing without a store', async (t) =>
	{
		const [library] = files(t, 'library.xml');
		const configGrants = grants(null, true);
		assert.equal(await configGrants.isReadable(await load(configGrants, libraries(library)), library), true);
		const nextLaunch = grants(null, false);
		assert.equal(await nextLaunch.isReadable(await load(nextLaunch, libraries(library)), library), false);
		assert.deepEqual([...configGrants.asked, ...nextLaunch.asked], [[library], [library]]);
	});

	test('does not read a file allowed before once the configuration drops it', async (t) =>
	{
		const [library] = files(t, 'library.xml');
		const configGrants = grants(migratedStore([library]));
		assert.equal(await configGrants.isReadable(await load(configGrants, {}), library), false);
	});

	test('asks again when a configured link points somewhere else', async (t) =>
	{
		const [library, other] = files(t, 'library.xml', 'other.xml');
		const link = path.join(path.dirname(library), 'link.xml');

		try
		{
			fs.symlinkSync(library, link, 'file');
		}
		catch (e)
		{
			if (process.platform === 'win32' && e.code === 'EPERM')
			{
				t.skip('creating symbolic links requires Windows Developer Mode or admin rights');
				return;
			}
			throw e;
		}

		const store = migratedStore([library]);
		const configGrants = grants(store, false);
		assert.equal(await configGrants.isReadable(await load(configGrants, libraries(link)), library), true);
		fs.unlinkSync(link);
		fs.symlinkSync(other, link, 'file');
		const nextLaunch = grants(store, false);
		const win = await load(nextLaunch, libraries(link));
		assert.deepEqual(nextLaunch.asked, [[link]]);
		assert.equal(await nextLaunch.isReadable(win, other), false);
		assert.equal(await nextLaunch.isReadable(win, link), false);
	});

	test('asks for one window at a time and applies the answer to the next', async (t) =>
	{
		const [library] = files(t, 'library.xml');
		const configGrants = grants(migratedStore(), async () =>
		{
			await new Promise((resolve) => setTimeout(resolve, 10));
			return true;
		});
		const one = editorWindow(libraries(library));
		const two = editorWindow(libraries(library));
		configGrants.register(one);
		configGrants.register(two);
		await Promise.all([configGrants.collect(one), configGrants.collect(two)]);
		assert.deepEqual(configGrants.asked, [[library]]);
		assert.equal(await configGrants.isReadable(one, library), true);
		assert.equal(await configGrants.isReadable(two, library), true);
	});

	test('does not ask for a window closed before its turn', async (t) =>
	{
		const [library, other] = files(t, 'library.xml', 'other.xml');
		const one = editorWindow(libraries(library));
		const two = editorWindow(libraries(other));
		const configGrants = grants(migratedStore(), (owner) =>
		{
			configGrants.unregister(two);
			return true;
		});
		configGrants.register(one);
		configGrants.register(two);
		await Promise.all([configGrants.collect(one), configGrants.collect(two)]);
		assert.deepEqual(configGrants.asked, [[library]]);
		assert.equal(await configGrants.isReadable(two, other), false);
	});

	test('makes nothing configured readable when the dialog fails', async (t) =>
	{
		const [library] = files(t, 'library.xml');
		const configGrants = grants(migratedStore(), () =>
		{
			throw new Error('no dialog');
		});
		const win = await load(configGrants, libraries(library));
		assert.equal(await configGrants.isReadable(win, library), false);
	});

	test('keeps the form that reads are checked against for a mapped network drive', async (t) =>
	{
		const root = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'drawio-config-')));
		t.after(() => fs.rmSync(root, {recursive: true, force: true}));
		const share = path.join(root, 'share');
		const drive = path.join(root, 'Z');
		const library = path.join(drive, 'library.xml');
		fs.mkdirSync(share);
		fs.writeFileSync(path.join(share, 'library.xml'), '<mxlibrary>[]</mxlibrary>');
		fs.symlinkSync(share, drive, 'junction');
		// Node's JS walker keeps a mapped drive as given, see mapDrive in backup-file.test.js
		const walker = (p, options) => path.resolve(p).startsWith(drive + path.sep) ?
			path.resolve(p) : fs.realpathSync(p, options);
		walker.native = fs.realpathSync.native;
		const configGrants = grants(migratedStore(), true,
			Object.assign(Object.create(fs), {realpathSync: walker}));
		const win = await load(configGrants, libraries(library));
		// canonicalisePath in electron.js checks reads with fs.promises.realpath
		assert.equal(await configGrants.isReadable(win, await fs.promises.realpath(library)), true);
	});
});
