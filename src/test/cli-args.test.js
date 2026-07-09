// Unit tests for CLI argument parsing — exercises src/main/args.js directly
// Run with: npm test
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { parseDrawioArgs, parseBool, argsRange } from '../main/args.js';

function parse(args)
{
	return parseDrawioArgs(['node', 'drawio', ...args]);
}

// ─── Helper functions ────────────────────────────────────────────────────────

describe('parseBool', () =>
{
	test('returns true for "true"', () => assert.equal(parseBool('true'), true));
	test('returns false for "false"', () => assert.equal(parseBool('false'), false));
	test('returns false for empty string', () => assert.equal(parseBool(''), false));
	test('returns false for any other string', () => assert.equal(parseBool('yes'), false));
});

describe('argsRange', () =>
{
	test('converts 1-based page range to 0-based indexes', () =>
	{
		assert.deepEqual(argsRange('1..3'), [0, 2]);
	});

	test('single page range', () =>
	{
		assert.deepEqual(argsRange('2..2'), [1, 1]);
	});

	test('large range', () =>
	{
		assert.deepEqual(argsRange('5..10'), [4, 9]);
	});
});

// ─── Default values ──────────────────────────────────────────────────────────

describe('defaults', () =>
{
	test('format defaults to pdf', () =>
	{
		const { opts } = parse([]);
		assert.equal(opts.format, 'pdf');
	});

	test('embed-svg-fonts defaults to true', () =>
	{
		const { opts } = parse([]);
		assert.equal(opts.embedSvgFonts, true);
	});

	test('svg-theme defaults to auto', () =>
	{
		const { opts } = parse([]);
		assert.equal(opts.svgTheme, 'auto');
	});

	test('svg-links-target defaults to auto', () =>
	{
		const { opts } = parse([]);
		assert.equal(opts.svgLinksTarget, 'auto');
	});

	test('html-theme defaults to auto', () =>
	{
		const { opts } = parse([]);
		assert.equal(opts.htmlTheme, 'auto');
	});

	test('html-zoom defaults to true', () =>
	{
		const { opts } = parse([]);
		assert.equal(opts.htmlZoom, true);
	});

	test('html-lightbox defaults to true', () =>
	{
		const { opts } = parse([]);
		assert.equal(opts.htmlLightbox, true);
	});

	test('html-layers defaults to true', () =>
	{
		const { opts } = parse([]);
		assert.equal(opts.htmlLayers, true);
	});

	test('html-tags defaults to true', () =>
	{
		const { opts } = parse([]);
		assert.equal(opts.htmlTags, true);
	});

	test('html-fit defaults to true', () =>
	{
		const { opts } = parse([]);
		assert.equal(opts.htmlFit, true);
	});

	test('html-link-target defaults to auto', () =>
	{
		const { opts } = parse([]);
		assert.equal(opts.htmlLinkTarget, 'auto');
	});

	test('boolean flags default to undefined (not false)', () =>
	{
		const { opts } = parse([]);
		assert.equal(opts.create, undefined);
		assert.equal(opts.export, undefined);
		assert.equal(opts.recursive, undefined);
		assert.equal(opts.transparent, undefined);
		assert.equal(opts.allPages, undefined);
		assert.equal(opts.crop, undefined);
		assert.equal(opts.enablePlugins, undefined);
	});
});

// ─── Boolean flags ───────────────────────────────────────────────────────────

describe('boolean flags', () =>
{
	test('-c / --create sets create to true', () =>
	{
		assert.equal(parse(['-c']).opts.create, true);
		assert.equal(parse(['--create']).opts.create, true);
	});

	test('-k / --check sets check to true', () =>
	{
		assert.equal(parse(['-k']).opts.check, true);
		assert.equal(parse(['--check']).opts.check, true);
	});

	test('-x / --export sets export to true', () =>
	{
		assert.equal(parse(['-x']).opts.export, true);
		assert.equal(parse(['--export']).opts.export, true);
	});

	test('-r / --recursive sets recursive to true', () =>
	{
		assert.equal(parse(['-r']).opts.recursive, true);
		assert.equal(parse(['--recursive']).opts.recursive, true);
	});

	test('-t / --transparent sets transparent to true', () =>
	{
		assert.equal(parse(['-t']).opts.transparent, true);
		assert.equal(parse(['--transparent']).opts.transparent, true);
	});

	test('-e / --embed-diagram sets embedDiagram to true', () =>
	{
		assert.equal(parse(['-e']).opts.embedDiagram, true);
		assert.equal(parse(['--embed-diagram']).opts.embedDiagram, true);
	});

	test('--embed-svg-images sets embedSvgImages to true', () =>
	{
		assert.equal(parse(['--embed-svg-images']).opts.embedSvgImages, true);
	});

	test('--crop sets crop to true', () =>
	{
		assert.equal(parse(['--crop']).opts.crop, true);
	});

	test('-a / --all-pages sets allPages to true', () =>
	{
		assert.equal(parse(['-a']).opts.allPages, true);
		assert.equal(parse(['--all-pages']).opts.allPages, true);
	});

	test('-u / --uncompressed sets uncompressed to true', () =>
	{
		assert.equal(parse(['-u']).opts.uncompressed, true);
		assert.equal(parse(['--uncompressed']).opts.uncompressed, true);
	});

	test('--enable-plugins sets enablePlugins to true', () =>
	{
		assert.equal(parse(['--enable-plugins']).opts.enablePlugins, true);
	});
});

// ─── Format validation ───────────────────────────────────────────────────────
// Note: commander v14 with a RegExp parseArg silently falls back to the default
// value when the input does not match — it does NOT throw an error.

describe('--format / -f', () =>
{
	const validFormats = ['pdf', 'svg', 'png', 'jpeg', 'jpg', 'xml', 'html'];

	for (const fmt of validFormats)
	{
		test(`accepts valid format: ${fmt}`, () =>
		{
			assert.equal(parse(['-f', fmt]).opts.format, fmt);
			assert.equal(parse(['--format', fmt]).opts.format, fmt);
		});
	}

	test('invalid format falls back to default (pdf)', () =>
	{
		assert.equal(parse(['-f', 'gif']).opts.format, 'pdf');
	});

	test('invalid format (txt) falls back to default (pdf)', () =>
	{
		assert.equal(parse(['-f', 'txt']).opts.format, 'pdf');
	});
});

// ─── --layout ────────────────────────────────────────────────────────────────

describe('--layout', () =>
{
	const presets = ['verticalFlow', 'horizontalFlow', 'verticalTree',
		'horizontalTree', 'radialTree', 'organic'];

	for (const name of presets)
	{
		test(`accepts layout name: ${name}`, () =>
		{
			assert.equal(parse(['--layout', name]).opts.layout, name);
		});
	}

	test('defaults to undefined when not passed', () =>
	{
		assert.equal(parse([]).opts.layout, undefined);
	});

	test('passes unknown names through (validated at runtime)', () =>
	{
		assert.equal(parse(['--layout', 'bogus']).opts.layout, 'bogus');
	});

	test('does not consume a following positional', () =>
	{
		const { opts, args } = parse(['--layout', 'organic', 'in.drawio']);
		assert.equal(opts.layout, 'organic');
		assert.deepEqual(args, ['in.drawio']);
	});

	test('passes a custom-layout JSON array through verbatim', () =>
	{
		const json = '[{"layout":"elkLayered","config":{"elk.direction":"RIGHT"}}]';
		const { opts, args } = parse(['--layout', json, 'in.drawio']);
		assert.equal(opts.layout, json);
		assert.deepEqual(JSON.parse(opts.layout), [{layout: 'elkLayered', config: {'elk.direction': 'RIGHT'}}]);
		assert.deepEqual(args, ['in.drawio']);
	});

	test('accepts JSON via inline --layout=<json> form', () =>
	{
		const json = '[{"layout":"elkTree","config":{}}]';
		assert.equal(parse(['--layout=' + json]).opts.layout, json);
	});
});

// ─── --mermaid-image ─────────────────────────────────────────────────────────

describe('--mermaid-image', () =>
{
	test('defaults to undefined when not passed', () =>
	{
		assert.equal(parse([]).opts.mermaidImage, undefined);
	});

	test('parses 1 / true as true', () =>
	{
		assert.equal(parse(['--mermaid-image', '1']).opts.mermaidImage, true);
		assert.equal(parse(['--mermaid-image', 'true']).opts.mermaidImage, true);
	});

	test('parses 0 / false as false', () =>
	{
		assert.equal(parse(['--mermaid-image', '0']).opts.mermaidImage, false);
		assert.equal(parse(['--mermaid-image', 'false']).opts.mermaidImage, false);
	});

	test('consumes its value and keeps the positional file', () =>
	{
		const { opts, args } = parse(['in.mmd', '--mermaid-image', '1']);
		assert.equal(opts.mermaidImage, true);
		assert.deepEqual(args, ['in.mmd']);
	});

	test('accepts inline --mermaid-image=1 form', () =>
	{
		assert.equal(parse(['--mermaid-image=1']).opts.mermaidImage, true);
		assert.equal(parse(['--mermaid-image=false']).opts.mermaidImage, false);
	});
});

// ─── Numeric options ─────────────────────────────────────────────────────────

describe('numeric options', () =>
{
	test('-q / --quality parses integer', () =>
	{
		assert.equal(parse(['-q', '85']).opts.quality, 85);
		assert.equal(parse(['--quality', '100']).opts.quality, 100);
	});

	test('-b / --border parses integer', () =>
	{
		assert.equal(parse(['-b', '10']).opts.border, 10);
		assert.equal(parse(['--border', '0']).opts.border, 0);
	});

	test('-s / --scale parses float', () =>
	{
		assert.equal(parse(['-s', '1.5']).opts.scale, 1.5);
		assert.equal(parse(['--scale', '2.0']).opts.scale, 2.0);
	});

	test('--width parses integer', () =>
	{
		assert.equal(parse(['--width', '800']).opts.width, 800);
	});

	test('--height parses integer', () =>
	{
		assert.equal(parse(['--height', '600']).opts.height, 600);
	});

	test('-z / --zoom parses float', () =>
	{
		assert.equal(parse(['-z', '1.25']).opts.zoom, 1.25);
		assert.equal(parse(['--zoom', '0.75']).opts.zoom, 0.75);
	});
});

// ─── Page index ──────────────────────────────────────────────────────────────

describe('-p / --page-index', () =>
{
	test('converts 1-based CLI input to 0-based index', () =>
	{
		assert.equal(parse(['-p', '1']).opts.pageIndex, 0);
		assert.equal(parse(['-p', '2']).opts.pageIndex, 1);
		assert.equal(parse(['--page-index', '5']).opts.pageIndex, 4);
	});
});

// ─── Page range ──────────────────────────────────────────────────────────────

describe('-g / --page-range', () =>
{
	test('parses 1-based range into 0-based array', () =>
	{
		assert.deepEqual(parse(['-g', '1..3']).opts.pageRange, [0, 2]);
		assert.deepEqual(parse(['--page-range', '2..5']).opts.pageRange, [1, 4]);
	});

	test('single-page range', () =>
	{
		assert.deepEqual(parse(['-g', '3..3']).opts.pageRange, [2, 2]);
	});
});

// ─── Layers ──────────────────────────────────────────────────────────────────

describe('-l / --layers', () =>
{
	test('stores the raw comma-separated string', () =>
	{
		assert.equal(parse(['-l', '0,1,2']).opts.layers, '0,1,2');
		assert.equal(parse(['--layers', '3']).opts.layers, '3');
	});
});

// ─── Output / paths ──────────────────────────────────────────────────────────

describe('-o / --output', () =>
{
	test('stores the output path', () =>
	{
		assert.equal(parse(['-o', '/tmp/out.pdf']).opts.output, '/tmp/out.pdf');
		assert.equal(parse(['--output', 'diagram.svg']).opts.output, 'diagram.svg');
	});
});

describe('positional argument', () =>
{
	test('captures the input file path', () =>
	{
		const { args } = parse(['/path/to/diagram.drawio']);
		assert.equal(args[0], '/path/to/diagram.drawio');
	});

	test('no positional arg when not provided', () =>
	{
		const { args } = parse([]);
		assert.equal(args.length, 0);
	});
});

// ─── SVG theme ───────────────────────────────────────────────────────────────
// themeRegExp = /^(dark|light)$/ — 'auto' is NOT in the pattern.
// Commander v14 silently falls back to the option default when the regex doesn't match,
// so passing --svg-theme auto on the CLI silently yields 'auto' (the default) rather
// than accepting 'auto' as a matched value.  This means 'auto' cannot be distinguished
// from "user didn't pass the flag at all", which is a subtle limitation of this setup.

describe('--svg-theme', () =>
{
	test('accepts dark', () => assert.equal(parse(['--svg-theme', 'dark']).opts.svgTheme, 'dark'));
	test('accepts light', () => assert.equal(parse(['--svg-theme', 'light']).opts.svgTheme, 'light'));

	test('"auto" is not in the regex so falls back to default "auto"', () =>
	{
		assert.equal(parse(['--svg-theme', 'auto']).opts.svgTheme, 'auto');
	});

	test('invalid theme falls back to default "auto"', () =>
	{
		assert.equal(parse(['--svg-theme', 'blue']).opts.svgTheme, 'auto');
	});
});

// ─── SVG links target ────────────────────────────────────────────────────────

describe('--svg-links-target', () =>
{
	test('accepts auto',     () => assert.equal(parse(['--svg-links-target', 'auto']).opts.svgLinksTarget, 'auto'));
	test('accepts new-win', () => assert.equal(parse(['--svg-links-target', 'new-win']).opts.svgLinksTarget, 'new-win'));
	test('accepts same-win', () => assert.equal(parse(['--svg-links-target', 'same-win']).opts.svgLinksTarget, 'same-win'));
	test('invalid value falls back to default "auto"', () =>
	{
		assert.equal(parse(['--svg-links-target', 'blank']).opts.svgLinksTarget, 'auto');
	});
});

// ─── HTML options ────────────────────────────────────────────────────────────

describe('html-theme', () =>
{
	test('accepts dark',  () => assert.equal(parse(['--html-theme', 'dark']).opts.htmlTheme, 'dark'));
	test('accepts light', () => assert.equal(parse(['--html-theme', 'light']).opts.htmlTheme, 'light'));
	test('accepts auto',  () => assert.equal(parse(['--html-theme', 'auto']).opts.htmlTheme, 'auto'));
	test('invalid value falls back to default "auto"', () =>
	{
		assert.equal(parse(['--html-theme', 'system']).opts.htmlTheme, 'auto');
	});
});

describe('html-link-target', () =>
{
	test('accepts auto',  () => assert.equal(parse(['--html-link-target', 'auto']).opts.htmlLinkTarget, 'auto'));
	test('accepts blank', () => assert.equal(parse(['--html-link-target', 'blank']).opts.htmlLinkTarget, 'blank'));
	test('accepts self',  () => assert.equal(parse(['--html-link-target', 'self']).opts.htmlLinkTarget, 'self'));
	test('invalid value falls back to default "auto"', () =>
	{
		assert.equal(parse(['--html-link-target', 'new-win']).opts.htmlLinkTarget, 'auto');
	});
});

describe('html bool options via --html-* flags', () =>
{
	const htmlBoolOpts = [
		['--html-zoom',      'htmlZoom'],
		['--html-lightbox',  'htmlLightbox'],
		['--html-layers',    'htmlLayers'],
		['--html-tags',      'htmlTags'],
		['--html-fit',       'htmlFit'],
	];

	for (const [flag, key] of htmlBoolOpts)
	{
		test(`${flag} false disables the option`, () =>
		{
			assert.equal(parse([flag, 'false']).opts[key], false);
		});

		test(`${flag} true keeps the option enabled`, () =>
		{
			assert.equal(parse([flag, 'true']).opts[key], true);
		});
	}
});

describe('--embed-svg-fonts', () =>
{
	test('false disables font embedding', () =>
	{
		assert.equal(parse(['--embed-svg-fonts', 'false']).opts.embedSvgFonts, false);
	});

	test('true enables font embedding', () =>
	{
		assert.equal(parse(['--embed-svg-fonts', 'true']).opts.embedSvgFonts, true);
	});
});

describe('--html-link-color and --html-edit-link', () =>
{
	test('stores html-link-color as string', () =>
	{
		assert.equal(parse(['--html-link-color', '#ff0000']).opts.htmlLinkColor, '#ff0000');
	});

	test('stores html-edit-link as string', () =>
	{
		assert.equal(parse(['--html-edit-link', 'https://example.com/edit']).opts.htmlEditLink, 'https://example.com/edit');
	});
});

// ─── Combined short flags (commander.js compat) ──────────────────────────────
// Pre-30.0.0, drawio used commander.js, which expands stacked short booleans
// (`-xa` → `-x -a`) and attached short-flag values (`-fpng` → `-f png`).
// Real-world Makefiles (e.g. jgraph/drawio-desktop#2426) depend on this.

describe('combined short flags', () =>
{
	test('-xa expands to -x -a (stacked booleans)', () =>
	{
		const { opts } = parse(['-xa']);
		assert.equal(opts.export, true);
		assert.equal(opts.allPages, true);
	});

	test('-xa --crop -o file matches the Makefile scenario from issue #2426', () =>
	{
		const { opts, args } = parse(['schematy.drawio', '-xa', '--crop', '-o', 'out.pdf']);
		assert.equal(opts.export, true);
		assert.equal(opts.allPages, true);
		assert.equal(opts.crop, true);
		assert.equal(opts.output, 'out.pdf');
		assert.equal(args[0], 'schematy.drawio');
	});

	test('-cke expands three booleans', () =>
	{
		const { opts } = parse(['-cke']);
		assert.equal(opts.create, true);
		assert.equal(opts.check, true);
		assert.equal(opts.embedDiagram, true);
	});

	test('-fpng treats trailing chars as value', () =>
	{
		const { opts } = parse(['-fpng']);
		assert.equal(opts.format, 'png');
	});

	test('-xfpng combines boolean -x with value-bearing -f', () =>
	{
		const { opts } = parse(['-xfpng']);
		assert.equal(opts.export, true);
		assert.equal(opts.format, 'png');
	});

	test('-q85 treats 85 as the quality value', () =>
	{
		const { opts } = parse(['-q85']);
		assert.equal(opts.quality, 85);
	});

	test('recognized prefix is applied, unknown trailing letters ignored', () =>
	{
		// Pre-30.0.0 drawio used commander with .allowUnknownOption(); unknown
		// letters in a cluster were silently skipped, not treated as a fatal error.
		const { opts } = parse(['-xZ']);
		assert.equal(opts.export, true);
	});

	test('clustered short does not consume the next positional', () =>
	{
		const { opts, args } = parse(['-xa', 'input.drawio']);
		assert.equal(opts.export, true);
		assert.equal(opts.allPages, true);
		assert.equal(args[0], 'input.drawio');
	});
});

// ─── Combined options ────────────────────────────────────────────────────────

describe('combined export scenario', () =>
{
	test('typical PNG export with all relevant flags', () =>
	{
		const { opts, args } = parse([
			'-x',
			'-f', 'png',
			'-o', '/tmp/diagram.png',
			'-b', '5',
			'-s', '2.0',
			'-t',
			'-e',
			'input.drawio',
		]);

		assert.equal(opts.export, true);
		assert.equal(opts.format, 'png');
		assert.equal(opts.output, '/tmp/diagram.png');
		assert.equal(opts.border, 5);
		assert.equal(opts.scale, 2.0);
		assert.equal(opts.transparent, true);
		assert.equal(opts.embedDiagram, true);
		assert.equal(args[0], 'input.drawio');
	});

	test('typical PDF export with page range', () =>
	{
		const { opts } = parse([
			'-x',
			'-f', 'pdf',
			'-a',
			'--crop',
			'-g', '2..4',
		]);

		assert.equal(opts.export, true);
		assert.equal(opts.format, 'pdf');
		assert.equal(opts.allPages, true);
		assert.equal(opts.crop, true);
		assert.deepEqual(opts.pageRange, [1, 3]);
	});

	test('HTML export with custom viewer settings', () =>
	{
		const { opts } = parse([
			'-x',
			'-f', 'html',
			'--html-theme', 'dark',
			'--html-zoom', 'false',
			'--html-lightbox', 'false',
			'--html-link-target', 'blank',
			'--html-link-color', '#00ff00',
		]);

		assert.equal(opts.format, 'html');
		assert.equal(opts.htmlTheme, 'dark');
		assert.equal(opts.htmlZoom, false);
		assert.equal(opts.htmlLightbox, false);
		assert.equal(opts.htmlLinkTarget, 'blank');
		assert.equal(opts.htmlLinkColor, '#00ff00');
	});
});
