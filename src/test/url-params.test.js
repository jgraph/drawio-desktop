// Unit tests for urlParams.json locations and merging — exercises src/main/url-params.js
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import path from 'path';
import { getUrlParams, getUrlParamsFiles } from '../main/url-params.js';

const exeDir = path.join('/', 'opt', 'drawio');
const userDataDir = path.join('/', 'home', 'u', '.config', 'draw.io');
const diagramDir = path.join('/', 'home', 'u', 'Downloads', 'shared');

function enoent(file)
{
	const e = new Error('ENOENT: no such file or directory, open \'' + file + '\'');
	e.code = 'ENOENT';

	return e;
}

function read(files)
{
	return (file) =>
	{
		if (!(file in files))
		{
			throw enoent(file);
		}

		return files[file];
	};
}

function params(opts)
{
	const logged = [];
	const result = getUrlParams({
		defaults: {dev: 0, mode: 'device'},
		state: {enableStoreBkp: 1, isGoogleFontsEnabled: 0},
		files: [path.join(exeDir, 'urlParams.json'), path.join(userDataDir, 'urlParams.json')],
		readFile: read({}),
		log: (msg) => logged.push(msg),
		...opts
	});

	return {result, logged};
}

describe('getUrlParamsFiles', () =>
{
	test('reads the install and user data folders, not the working directory', () =>
	{
		assert.deepEqual(getUrlParamsFiles({exeDir, userDataDir, cwd: diagramDir, dev: false}),
			[path.join(exeDir, 'urlParams.json'), path.join(userDataDir, 'urlParams.json')]);
	});

	test('reads the working directory last with DRAWIO_ENV=dev', () =>
	{
		assert.deepEqual(getUrlParamsFiles({exeDir, userDataDir, cwd: diagramDir, dev: true}),
			[path.join(exeDir, 'urlParams.json'), path.join(userDataDir, 'urlParams.json'),
				path.join(diagramDir, 'urlParams.json')]);
	});
});

describe('getUrlParams', () =>
{
	test('no files gives the defaults and state', () =>
	{
		const {result, logged} = params({});

		assert.deepEqual(result, {dev: 0, mode: 'device', enableStoreBkp: 1, isGoogleFontsEnabled: 0});
		assert.deepEqual(logged, []);
	});

	test('files add and override defaults, later files win', () =>
	{
		const {result} = params({readFile: read({
			[path.join(exeDir, 'urlParams.json')]: '{"math-font": "STIX-Web", "lang": "de"}',
			[path.join(userDataDir, 'urlParams.json')]: '{"lang": "fr", "dev": 1}'
		})});

		assert.equal(result['math-font'], 'STIX-Web');
		assert.equal(result.lang, 'fr');
		assert.equal(result.dev, 1);
	});

	test('files cannot change state', () =>
	{
		const {result} = params({readFile: read({
			[path.join(userDataDir, 'urlParams.json')]:
				'{"enableStoreBkp": 0, "isGoogleFontsEnabled": "1"}'
		})});

		assert.equal(result.enableStoreBkp, 1);
		assert.equal(result.isGoogleFontsEnabled, 0);
	});

	test('keeps only scalar values', () =>
	{
		const {result} = params({readFile: read({
			[path.join(userDataDir, 'urlParams.json')]:
				'{"a": "x", "b": 2, "c": true, "d": null, "e": [1, 2], "f": {"g": 1}, ' +
				'"__proto__": {"polluted": 1}}'
		})});

		assert.equal(result.a, 'x');
		assert.equal(result.b, 2);
		assert.equal(result.c, true);
		assert.ok(!('d' in result) && !('e' in result) && !('f' in result));
		assert.equal(Object.getPrototypeOf(result), Object.prototype);
		assert.equal(result.polluted, undefined);
	});

	test('logs and skips a file that is not a JSON object', () =>
	{
		const {result, logged} = params({readFile: read({
			[path.join(exeDir, 'urlParams.json')]: '{"lang": ',
			[path.join(userDataDir, 'urlParams.json')]: '["lang", "de"]'
		})});

		assert.equal(result.lang, undefined);
		assert.equal(logged.length, 2);
		assert.ok(logged[0].startsWith('Error in ' + path.join(exeDir, 'urlParams.json')));
		assert.ok(logged[1].startsWith('Error in ' + path.join(userDataDir, 'urlParams.json')));
	});

	test('logs a file that cannot be read', () =>
	{
		const {logged} = params({readFile: (file) =>
		{
			const e = new Error('EACCES: permission denied');
			e.code = 'EACCES';

			throw e;
		}});

		assert.equal(logged.length, 2);
	});
});
