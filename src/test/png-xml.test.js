// Unit tests for the PNG diagram reader. Malformed files run in a child process
// with a time limit: the parser is synchronous, so a hang would otherwise block
// the test run instead of failing it
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'child_process';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath, pathToFileURL } from 'url';
import { readPngXml } from '../main/png-xml.js';

const modulePath = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'main', 'png-xml.js');
const signature = Buffer.from('89504e470d0a1a0a', 'hex');
const xml = '<mxGraphModel><root/></mxGraphModel>';

// Writes a chunk header with any length, so the length can disagree with the data
function rawChunk(length, type, data = Buffer.alloc(0))
{
	const header = Buffer.alloc(8);
	header.writeUInt32BE(length >>> 0, 0);
	header.write(type, 4, 'ascii');

	return Buffer.concat([header, data, Buffer.alloc(4)]);
}

function chunk(type, data = Buffer.alloc(0))
{
	return rawChunk(data.length, type, data);
}

function png(...chunks)
{
	return Buffer.concat([signature, ...chunks]);
}

function readInChild(buffer)
{
	const script = `import { readPngXml } from ${JSON.stringify(pathToFileURL(modulePath).href)};
		console.log(JSON.stringify(readPngXml(Buffer.from('${buffer.toString('hex')}', 'hex'))));`;
	const result = spawnSync(process.execPath, ['--input-type=module', '-e', script],
		{encoding: 'utf8', timeout: 5000});

	assert.equal(result.error, undefined, 'parser did not return');
	assert.equal(result.status, 0, result.stderr);

	return JSON.parse(result.stdout);
}

describe('readPngXml', () =>
{
	const ihdr = chunk('IHDR', Buffer.alloc(13));
	const iend = chunk('IEND');
	const text = Buffer.concat([Buffer.from('mxGraphModel\0'), Buffer.from(xml)]);
	const key = Buffer.from('mxGraphModel\0\0');

	test('reads a tEXt chunk', () =>
	{
		assert.equal(readPngXml(png(ihdr, chunk('tEXt', text), iend)), xml);
	});

	test('reads a zTXt chunk', () =>
	{
		const data = Buffer.concat([key, zlib.deflateSync(encodeURIComponent(xml))]);

		assert.equal(readPngXml(png(ihdr, chunk('zTXt', data), iend)), xml);
	});

	test('reads the raw deflate zTXt of older CLI exports', () =>
	{
		const data = Buffer.concat([key, zlib.deflateRawSync(encodeURIComponent(xml))]);

		assert.equal(readPngXml(png(ihdr, chunk('zTXt', data), iend)), xml);
	});

	test('reads a chunk at the very end of a file with no IEND', () =>
	{
		assert.equal(readPngXml(png(ihdr, chunk('tEXt', text))), xml);
	});

	test('skips text chunks under other keywords', () =>
	{
		const other = Buffer.from('Software\0draw.io');

		assert.equal(readPngXml(png(ihdr, chunk('tEXt', other), chunk('tEXt', text), iend)), xml);
	});

	test('returns null without a diagram', () =>
	{
		assert.equal(readPngXml(png(ihdr, iend)), null);
	});

	test('stops at a length that points back at its own chunk', () =>
	{
		assert.equal(readInChild(png(rawChunk(-12, 'IHDR'))), null);
	});

	test('stops at a length that points back at an earlier chunk', () =>
	{
		assert.equal(readInChild(png(chunk('IHDR'), rawChunk(-24, 'IDAT'))), null);
	});

	test('stops at a negative length in a text chunk', () =>
	{
		assert.equal(readInChild(png(rawChunk(-12, 'tEXt'))), null);
	});

	test('stops at a text chunk that runs past the end of the file', () =>
	{
		// Cut before the CRC: a NUL anywhere in the file would end the keyword scan
		const cut = (length) => png(rawChunk(length, 'tEXt', Buffer.from('AAAA')).subarray(0, 12));

		assert.equal(readInChild(cut(0x7fffffff)), null);
		assert.equal(readInChild(cut(0xffffffff)), null);
	});
});
