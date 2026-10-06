// Unit tests for the native print dialog options — exercises src/main/print-options.js
// [jgraph/drawio-desktop#2568]
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { getPrintOptions } from '../main/print-options.js';

// Chromium's macOS print context only reuses a printer paper within 2 points
// (kMaxPaperSizeDifferenceInPoints) and creates a custom paper otherwise
const MAX_PAPER_DIFFERENCE_POINTS = 2;
const toPoints = (microns) => microns * 72 / 25400;

function assertPaper(pageSize, paper)
{
	var diff = Math.max(Math.abs(toPoints(pageSize.width - paper.width)),
		Math.abs(toPoints(pageSize.height - paper.height)));
	assert.ok(diff <= MAX_PAPER_DIFFERENCE_POINTS, 'paper differs by ' + diff.toFixed(2) + 'pt: ' +
		JSON.stringify(pageSize) + ' vs ' + JSON.stringify(paper));
}

// Page formats from PageSetupDialog.getFormats and the printer paper they stand for
const formats = [
	{name: 'US-Letter', width: 850, height: 1100, paper: {width: 215900, height: 279400}},
	{name: 'US-Legal', width: 850, height: 1400, paper: {width: 215900, height: 355600}},
	{name: 'US-Tabloid', width: 1100, height: 1700, paper: {width: 279400, height: 431800}},
	{name: 'A3', width: 1169, height: 1654, paper: {width: 297000, height: 420000}},
	{name: 'A4', width: 827, height: 1169, paper: {width: 210000, height: 297000}},
	{name: 'A5', width: 583, height: 827, paper: {width: 148000, height: 210000}},
	{name: 'A6', width: 413, height: 583, paper: {width: 105000, height: 148000}}
];

describe('getPrintOptions', () =>
{
	for (const f of formats)
	{
		test(f.name + ' portrait is the printer paper in portrait', () =>
		{
			var options = getPrintOptions(f.width, f.height, 1);
			assertPaper(options.pageSize, f.paper);
			assert.equal(options.landscape, false);
		});

		test(f.name + ' landscape is the same paper in landscape', () =>
		{
			var options = getPrintOptions(f.height, f.width, 1);
			assertPaper(options.pageSize, f.paper);
			assert.equal(options.landscape, true);
		});
	}

	test('custom and screen formats keep their size', () =>
	{
		var options = getPrintOptions(1600, 900, 1);
		assert.deepEqual(options.pageSize, {width: 900 * 254, height: 1600 * 254});
		assert.equal(options.landscape, true);
	});

	test('a square page is portrait', () =>
	{
		assert.equal(getPrintOptions(1000, 1000, 1).landscape, false);
	});

	test('no margins and backgrounds printed', () =>
	{
		var options = getPrintOptions(827, 1169, 1);
		assert.deepEqual(options.margins, {marginType: 'none'});
		assert.equal(options.printBackground, true);
	});

	test('scaleFactor is the inverse page scale in percent', () =>
	{
		assert.equal(getPrintOptions(827, 1169, 1).scaleFactor, 100);
		assert.equal(getPrintOptions(827, 1169, 2).scaleFactor, 50);
		assert.equal(getPrintOptions(827, 1169, 0.5).scaleFactor, 200);
		assert.equal(getPrintOptions(827, 1169, 1.5).scaleFactor, 67);
	});

	test('scaleFactor is clamped to 10-200% and defaults to 100%', () =>
	{
		assert.equal(getPrintOptions(827, 1169, 20).scaleFactor, 10);
		assert.equal(getPrintOptions(827, 1169, 0.1).scaleFactor, 200);
		assert.equal(getPrintOptions(827, 1169, 0).scaleFactor, 100);
		assert.equal(getPrintOptions(827, 1169, undefined).scaleFactor, 100);
	});
});
