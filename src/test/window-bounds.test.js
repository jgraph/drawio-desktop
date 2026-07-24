// Unit tests for window bounds restore — exercises src/main/window-bounds.js directly
// Run with: npm test
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { parseLastWinSize, placeWindowOnDisplays } from '../main/window-bounds.js';

// 1920x1200 laptop minus taskbar
const laptop = {x: 0, y: 0, width: 1920, height: 1152};
// 3840x1600 ultrawide to the right of the laptop
const ultrawide = {x: 1920, y: 0, width: 3840, height: 1560};
// Display to the left of the primary has negative coordinates
const leftMonitor = {x: -1920, y: 0, width: 1920, height: 1050};

// ─── parseLastWinSize ────────────────────────────────────────────────────────

describe('parseLastWinSize', () =>
{
	test('parses width, height, position and flags', () =>
	{
		assert.deepEqual(parseLastWinSize('1300,900,10,20,true,false'),
			{width: 1300, height: 900, x: 10, y: 20, maximized: true, fullScreen: false});
	});

	test('parses the fullScreen flag', () =>
	{
		assert.deepEqual(parseLastWinSize('1300,900,10,20,false,true'),
			{width: 1300, height: 900, x: 10, y: 20, maximized: false, fullScreen: true});
	});

	test('parses negative positions', () =>
	{
		const result = parseLastWinSize('1300,900,-1900,-8,false,false');
		assert.equal(result.x, -1900);
		assert.equal(result.y, -8);
	});

	test('falls back to defaults for a corrupt value', () =>
	{
		assert.deepEqual(parseLastWinSize('garbage'),
			{width: 1200, height: 800, x: null, y: null, maximized: false, fullScreen: false});
	});

	test('falls back to defaults for null', () =>
	{
		assert.deepEqual(parseLastWinSize(null),
			{width: 1200, height: 800, x: null, y: null, maximized: false, fullScreen: false});
	});

	test('has no position when the value omits it', () =>
	{
		const result = parseLastWinSize('1300,900');
		assert.equal(result.x, null);
		assert.equal(result.y, null);
	});

	test('enforces the minimum window size', () =>
	{
		const result = parseLastWinSize('300,200,5,5,false,false');
		assert.equal(result.width, 500);
		assert.equal(result.height, 500);
	});
});

// ─── placeWindowOnDisplays ───────────────────────────────────────────────────

describe('placeWindowOnDisplays', () =>
{
	test('keeps a fully visible window unchanged', () =>
	{
		const bounds = {x: 100, y: 50, width: 1200, height: 800};
		assert.deepEqual(placeWindowOnDisplays(bounds, [laptop], laptop), bounds);
	});

	test('centers on the primary display when there is no saved position', () =>
	{
		assert.deepEqual(
			placeWindowOnDisplays({x: null, y: null, width: 1200, height: 800}, [laptop], laptop),
			{x: 360, y: 176, width: 1200, height: 800});
	});

	// jgraph/drawio-desktop#2282: window on the right half of an ultrawide,
	// reopened after undocking with only the laptop display left
	test('resets a window saved on a removed display and shrinks it to fit', () =>
	{
		assert.deepEqual(
			placeWindowOnDisplays({x: 3840, y: 0, width: 1920, height: 1600}, [laptop], laptop),
			{x: 0, y: 0, width: 1920, height: 1152});
	});

	test('resets a window that is only visible as a thin sliver', () =>
	{
		const result = placeWindowOnDisplays({x: 1900, y: 0, width: 1920, height: 800}, [laptop], laptop);
		assert.equal(result.x, 0);
		assert.equal(result.width, 1920);
	});

	test('keeps a window with just enough visible width', () =>
	{
		const bounds = {x: 1820, y: 0, width: 1920, height: 800};
		assert.deepEqual(placeWindowOnDisplays(bounds, [laptop], laptop), bounds);
	});

	test('resets a window whose title bar is above the top of the screen', () =>
	{
		const result = placeWindowOnDisplays({x: 100, y: -224, width: 1200, height: 800}, [laptop], laptop);
		assert.equal(result.y, 176);
	});

	test('resets a window whose title bar is below the bottom of the screen', () =>
	{
		const result = placeWindowOnDisplays({x: 100, y: 1140, width: 1200, height: 800}, [laptop], laptop);
		assert.equal(result.y, 176);
	});

	test('keeps the small negative offset of a window maximized on Windows', () =>
	{
		const bounds = {x: -8, y: -8, width: 1936, height: 1168};
		assert.deepEqual(placeWindowOnDisplays(bounds, [laptop], laptop), bounds);
	});

	test('resets the position saved for a window closed while minimized on Windows', () =>
	{
		const result = placeWindowOnDisplays({x: -32000, y: -32000, width: 1200, height: 800}, [laptop], laptop);
		assert.deepEqual(result, {x: 360, y: 176, width: 1200, height: 800});
	});

	test('keeps a window spanning two displays at full size', () =>
	{
		const bounds = {x: 1000, y: 100, width: 2000, height: 900};
		assert.deepEqual(placeWindowOnDisplays(bounds, [laptop, ultrawide], laptop), bounds);
	});

	test('keeps a window on a display left of the primary', () =>
	{
		const bounds = {x: -1900, y: 50, width: 1200, height: 800};
		assert.deepEqual(placeWindowOnDisplays(bounds, [leftMonitor, laptop], laptop), bounds);
	});

	test('keeps an oversized window as long as its title bar is visible', () =>
	{
		const bounds = {x: 0, y: 0, width: 1920, height: 1600};
		assert.deepEqual(placeWindowOnDisplays(bounds, [laptop], laptop), bounds);
	});

	test('centers within the work area of an offset primary display', () =>
	{
		const primary = {x: 100, y: 50, width: 1000, height: 700};
		assert.deepEqual(
			placeWindowOnDisplays({x: null, y: null, width: 2000, height: 1600}, [primary], primary),
			{x: 100, y: 50, width: 1000, height: 700});
	});
});
