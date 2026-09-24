// Tests for the configuration paths the renderer may read [jgraph/drawio-desktop#1278].
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { pathToFileURL } from 'url';
import vm from 'vm';

// Run the actual main-process code without starting Electron
const source = fs.readFileSync(new URL('../main/electron.js', import.meta.url), 'utf8');
const from = source.indexOf('// Paths declared in the user');
const to = source.indexOf('// fs.statSync that never throws', from);
assert.ok(from >= 0 && to > from, 'config path helper boundaries exist');
const helpers = source.slice(from, to);

// Stands in for the renderer that runs collectConfigPathsScript. Its only global
// is Editor, so the script also fails here if it reaches outside its own body.
function renderer(config)
{
	const context = vm.createContext((config !== undefined) ? {Editor: {config}} : {});
	return {webContents: {executeJavaScript: async (script) => vm.runInContext(script, context)}};
}

function mainProcess(win)
{
	const context = vm.createContext({fs, path,
		BrowserWindow: {getFocusedWindow: () => win, getAllWindows: () => [win]}});
	vm.runInContext(helpers, context, {filename: 'electron-config-paths.js'});
	return context;
}

async function collect(config)
{
	const win = renderer(config);
	const script = vm.runInContext('collectConfigPathsScript', mainProcess(win));
	return Array.from(await win.webContents.executeJavaScript(script));
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

describe('loadConfigReadablePaths', () =>
{
	test('makes configured local library files readable and nothing else', async (t) =>
	{
		const root = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'drawio-config-')));
		t.after(() => fs.rmSync(root, {recursive: true, force: true}));
		const library = path.join(root, 'library.xml');
		const other = path.join(root, 'other.xml');
		fs.writeFileSync(library, '<mxlibrary>[]</mxlibrary>');
		fs.writeFileSync(other, '<mxlibrary>[]</mxlibrary>');
		const context = mainProcess(renderer({
			libraries: [{entries: [{id: 'local', libs: [{url: pathToFileURL(library).href},
				{url: 'https://example.com/remote.xml'}, {url: 'relative.xml'}]}]}],
			unknownKey: {url: pathToFileURL(other).href}
		}));
		await vm.runInContext('loadConfigReadablePaths()', context);
		assert.deepEqual([...vm.runInContext('configReadablePaths', context)], [library]);
	});
});
