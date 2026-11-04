// Unit tests for the PDF diagram reader. Files from the writers come from pdf-lib,
// the way mergePdfs in electron.js and its pre-30.3.6 version made them. Malformed
// files are built by hand, as pdf-lib will not write them, and the ones that could
// keep the scan going run in a child process with a time limit: the reader is
// synchronous, so a hang would otherwise block the test run instead of failing it
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { constants } from 'buffer';
import { spawnSync } from 'child_process';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath, pathToFileURL } from 'url';
import { PDFDocument } from '@cantoo/pdf-lib';
import { readPdfXml } from '../main/pdf-xml.js';

const modulePath = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'main', 'pdf-xml.js');
const xml = '<mxfile><diagram name="Sid (1)">café 漢</diagram></mxfile>';
const mime = '/Type /EmbeddedFile /Subtype /application#2Fvnd.jgraph.mxfile';

async function subjectPdf(text)
{
	const doc = await PDFDocument.create();
	doc.addPage();
	doc.setSubject(encodeURIComponent(text).replace(/\(/g, '\\(').replace(/\)/g, '\\)'));

	return Buffer.from(await doc.save({useObjectStreams: true}));
}

async function attachmentPdf(text)
{
	const doc = await PDFDocument.create();
	doc.addPage();
	await doc.attach(Buffer.from(text).toString('base64'), 'diagram.xml',
		{mimeType: 'application/vnd.jgraph.mxfile', description: 'Diagram Content'});

	return Buffer.from(await doc.save({useObjectStreams: false}));
}

function object(dict, data)
{
	return Buffer.concat([Buffer.from('1 0 obj\n<< ' + dict + ' >>\nstream\n', 'latin1'),
		data, Buffer.from('\nendstream\nendobj\n', 'latin1')]);
}

function pdf(...parts)
{
	return Buffer.concat([Buffer.from('%PDF-1.7\n', 'latin1'), ...parts]);
}

// The object stream of a Subject, in the UTF-16 hex that pdf-lib writes
function subjectStream(text)
{
	const hex = Buffer.from(encodeURIComponent(text), 'utf16le').swap16().toString('hex').toUpperCase();

	return zlib.deflateSync(Buffer.from('1 0 0\n<< /Subject <FEFF' + hex + '> >>', 'latin1'));
}

function filler(length)
{
	return zlib.deflateSync(Buffer.alloc(length, 'A'));
}

// Ends before its last block does, so inflating it fails only at the end of the data
function cutFiller(length)
{
	const data = filler(length);

	return data.subarray(0, data.length - 8);
}

function readInChild(buffer)
{
	const script = `import { readPdfXml } from ${JSON.stringify(pathToFileURL(modulePath).href)};
		console.log(JSON.stringify(readPdfXml(Buffer.from('${buffer.toString('hex')}', 'hex'))));`;
	const result = spawnSync(process.execPath, ['--input-type=module', '-e', script],
		{encoding: 'utf8', timeout: 5000});

	assert.equal(result.error, undefined, 'reader did not return');
	assert.equal(result.status, 0, result.stderr);

	return JSON.parse(result.stdout);
}

describe('readPdfXml', () =>
{
	test('reads the Subject of a current export', async () =>
	{
		assert.equal(readPdfXml(await subjectPdf(xml)), xml);
	});

	test('reads the attachment of a pre-30.3.6 export', async () =>
	{
		assert.equal(readPdfXml(await attachmentPdf(xml)), xml);
	});

	test('reads the Subject of a PDF 1.4 file', () =>
	{
		const encoded = encodeURIComponent('<mxfile>a</mxfile>');
		const file = Buffer.from('%PDF-1.4\n1 0 obj\n<< /Subject (' + encoded + ') >>\nendobj\n', 'latin1');

		assert.equal(readPdfXml(file), '<mxfile>a</mxfile>');
	});

	test('returns null if there is no diagram', async () =>
	{
		const doc = await PDFDocument.create();
		doc.addPage();

		assert.equal(readPdfXml(Buffer.from(await doc.save({useObjectStreams: true}))), null);
		assert.equal(readPdfXml(Buffer.from('not a pdf')), null);
	});

	test('moves past a broken object stream to the next one', () =>
	{
		const file = pdf(object('/Type /ObjStm', cutFiller(1000)), object('/Type /ObjStm', subjectStream(xml)));

		assert.equal(readPdfXml(file), xml);
	});

	test('moves past a broken attachment to the Subject', () =>
	{
		const file = pdf(object(mime, cutFiller(1000)), object('/Type /ObjStm', subjectStream(xml)));

		assert.equal(readPdfXml(file), xml);
	});

	test('moves past a broken attachment to the next attachment', () =>
	{
		const text = Buffer.from(xml);
		const file = pdf(object(mime, cutFiller(1000)), object(mime, zlib.deflateSync(text)));

		assert.equal(readPdfXml(file), xml);
	});

	describe('inflate limit', () =>
	{
		// Spans several zlib output chunks. The default limit is only checked
		// through its options: reaching it takes over 2 GB
		const limit = 100000;

		test('stops an object stream over the limit', (t) =>
		{
			const inflate = t.mock.method(zlib, 'inflateRawSync');
			const stream = object('/Type /ObjStm', filler(limit + 1));

			assert.throws(() => readPdfXml(pdf(stream, stream, stream), limit), {code: 'ERR_BUFFER_TOO_LARGE'});
			assert.equal(inflate.mock.callCount(), 1);
		});

		test('stops an attachment past 3 bytes per character', (t) =>
		{
			const inflate = t.mock.method(zlib, 'inflateRawSync');
			const stream = object(mime, filler(limit * 3 + 1));
			const file = pdf(stream, stream, object('/Type /ObjStm', filler(limit + 1)));

			assert.throws(() => readPdfXml(file, limit), {code: 'ERR_BUFFER_TOO_LARGE'});
			assert.equal(inflate.mock.callCount(), 1);
		});

		// Past the string limit in bytes, which toString still reads as UTF-8
		test('reads an attachment of 3 byte characters up to the limit', () =>
		{
			const text = '\u6f22'.repeat(limit);
			const file = pdf(object(mime, zlib.deflateSync(Buffer.from(text))));

			assert.equal(readPdfXml(file, limit), text);
		});

		test('stops a stream that is too long for toString', (t) =>
		{
			const tooLong = Object.assign(new Error('too long'), {code: 'ERR_STRING_TOO_LONG'});
			const inflate = t.mock.method(zlib, 'inflateRawSync', () =>
			{
				return {toString() { throw tooLong; }};
			});

			for (const dict of [mime, '/Type /ObjStm'])
			{
				const stream = object(dict, filler(1000));

				inflate.mock.resetCalls();
				assert.throws(() => readPdfXml(pdf(stream, stream)), tooLong);
				assert.equal(inflate.mock.callCount(), 1);
			}
		});

		test('reads an object stream up to the limit', () =>
		{
			const subject = subjectStream('A'.repeat(1000));
			const length = zlib.inflateRawSync(subject.subarray(2)).length;
			const file = pdf(object('/Type /ObjStm', subject));

			assert.equal(readPdfXml(file, length), 'A'.repeat(1000));
			assert.throws(() => readPdfXml(file, length - 1), {code: 'ERR_BUFFER_TOO_LARGE'});
		});

		test('defaults to the longest string for both inflates', (t) =>
		{
			const inflate = t.mock.method(zlib, 'inflateRawSync');

			readPdfXml(pdf(object(mime, cutFiller(1000)), object('/Type /ObjStm', cutFiller(1000))));

			assert.deepEqual(inflate.mock.calls.map((call) => call.arguments[1].maxOutputLength),
				[constants.MAX_STRING_LENGTH * 3, constants.MAX_STRING_LENGTH]);
		});
	});

	describe('each stream is inflated once', () =>
	{
		test('with several /ObjStm ahead of one stream', (t) =>
		{
			const inflate = t.mock.method(zlib, 'inflateRawSync');
			const dict = '/ObjStm '.repeat(50).trim();

			assert.equal(readPdfXml(pdf(object(dict, filler(1000)))), null);
			assert.equal(inflate.mock.callCount(), 1);
		});

		test('with several EmbeddedFile ahead of one stream', (t) =>
		{
			const inflate = t.mock.method(zlib, 'inflateRawSync');
			const dict = 'EmbeddedFile '.repeat(50) + mime;

			assert.equal(readPdfXml(pdf(object(dict, cutFiller(1000)))), null);
			assert.equal(inflate.mock.callCount(), 1);
		});

		test('and a later stream is still reached', () =>
		{
			const dict = '/ObjStm '.repeat(50).trim();
			const file = pdf(object(dict, filler(1000)), object('/Type /ObjStm', subjectStream(xml)));

			assert.equal(readPdfXml(file), xml);
		});

		test('with /ObjStm after the last stream', (t) =>
		{
			const inflate = t.mock.method(zlib, 'inflateRawSync');
			const file = Buffer.concat([Buffer.from('%PDF-1.7', 'latin1'),
				zlib.deflateRawSync(Buffer.alloc(1000, 'A')),
				Buffer.from('\nendstream\n' + '/ObjStm\n'.repeat(50), 'latin1')]);

			assert.equal(readInChild(file), null);
			assert.equal(readPdfXml(file), null);
			assert.equal(inflate.mock.callCount(), 0);
		});

		test('with EmbeddedFile after the last stream', (t) =>
		{
			const inflate = t.mock.method(zlib, 'inflateRawSync');
			const file = Buffer.concat([Buffer.from('%PDF-1.7', 'latin1'),
				zlib.deflateRawSync(Buffer.alloc(1000, 'A')).subarray(0, -8),
				Buffer.from('\nendstream\n' + (mime + '\n').repeat(50), 'latin1')]);

			assert.equal(readInChild(file), null);
			assert.equal(readPdfXml(file), null);
			assert.equal(inflate.mock.callCount(), 0);
		});

		test('and a stream with no end is not read', (t) =>
		{
			const inflate = t.mock.method(zlib, 'inflateRawSync');

			for (const dict of ['/Type /ObjStm', mime])
			{
				const file = pdf(Buffer.from('1 0 obj\n<< ' + dict + ' >>\nstream\nabc', 'latin1'));

				assert.equal(readInChild(file), null);
				assert.equal(readPdfXml(file), null);
				assert.equal(inflate.mock.callCount(), 0);
			}
		});
	});
});
