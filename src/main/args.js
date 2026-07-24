export const validFormatRegExp = /^(pdf|svg|png|jpeg|jpg|xml|html)$/;

export function parseBool(val) { return val === 'true'; }

export function argsRange(val) { return val.split('..').map(n => parseInt(n, 10) - 1); }

// Each entry: { short?, long, key, valueLabel?, takesValue?, parse?, default?, desc }
// parse(rawString) must return null/undefined to signal "use default" (e.g. regex mismatch).
const OPTION_DEFS = [
	{ short: '-c', long: '--create',           key: 'create',
	  desc: 'creates a new empty file if no file is passed' },
	{ short: '-k', long: '--check',            key: 'check',
	  desc: 'does not overwrite existing files' },
	{ short: '-x', long: '--export',           key: 'export',
	  desc: 'export the input files/folders based on the given options. Besides draw.io files, vsdx, csv and Mermaid (.mmd/.mermaid) inputs are also supported' },
	{ short: '-r', long: '--recursive',        key: 'recursive',
	  desc: 'for a folder input, recursively convert all files in sub-folders also' },
	{ short: '-o', long: '--output',           key: 'output',         takesValue: true,
	  valueLabel: '<output file/folder>',
	  desc: 'specify the output file/folder. If omitted, the input file name is used for output with the specified format as extension' },
	{ short: '-f', long: '--format',           key: 'format',         takesValue: true,
	  valueLabel: '<format>',
	  parse: v => validFormatRegExp.test(v) ? v : null,               default: 'pdf',
	  desc: 'if output file name extension is specified, this option is ignored (file type is determined from output extension, possible export formats are pdf, png, jpg, svg, xml, and html)' },
	{              long: '--layout',            key: 'layout',         takesValue: true,
	  valueLabel: '<name|json>',
	  desc: 'run a layout on the diagram after opening it (applies on open and before export). Either a preset name (verticalFlow, horizontalFlow, verticalTree, horizontalTree, radialTree, organic) or a custom-layout JSON array as used by the Layout dialog, e.g. [{"layout":"elkLayered","config":{"elk.direction":"RIGHT"}}], for layout sequences and per-layout options' },
	{              long: '--mermaid-image',     key: 'mermaidImage',   takesValue: true,
	  valueLabel: '<true/false>',
	  parse: v => v === '1' || v === 'true',
	  desc: 'open Mermaid (.mmd/.mermaid) files as a static image instead of an editable diagram (default: false)' },
	{ short: '-q', long: '--quality',          key: 'quality',        takesValue: true,
	  valueLabel: '<quality>',
	  parse: parseInt,
	  desc: 'output image quality for JPEG (default: 90)' },
	{ short: '-t', long: '--transparent',      key: 'transparent',
	  desc: 'set transparent background for PNG and SVG' },
	{ short: '-e', long: '--embed-diagram',    key: 'embedDiagram',
	  desc: 'includes a copy of the diagram (for PNG, SVG and PDF formats only)' },
	{              long: '--embed-svg-images', key: 'embedSvgImages',
	  desc: 'Embed Images in SVG file (for SVG format only)' },
	{              long: '--embed-svg-fonts',  key: 'embedSvgFonts',  takesValue: true,
	  valueLabel: '<true/false>',
	  parse: parseBool,                                                default: true,
	  desc: 'Embed Fonts in SVG file (for SVG format only). Default is true' },
	{ short: '-b', long: '--border',           key: 'border',         takesValue: true,
	  valueLabel: '<border>',
	  parse: parseInt,
	  desc: 'sets the border width around the diagram (default: 0)' },
	{ short: '-s', long: '--scale',            key: 'scale',          takesValue: true,
	  valueLabel: '<scale>',
	  parse: parseFloat,
	  desc: 'scales the diagram size' },
	{              long: '--width',            key: 'width',          takesValue: true,
	  valueLabel: '<width>',
	  parse: parseInt,
	  desc: 'fits the generated image/pdf into the specified width, preserves aspect ratio.' },
	{              long: '--height',           key: 'height',         takesValue: true,
	  valueLabel: '<height>',
	  parse: parseInt,
	  desc: 'fits the generated image/pdf into the specified height, preserves aspect ratio.' },
	{              long: '--crop',             key: 'crop',
	  desc: 'crops PDF to diagram size' },
	{              long: '--size',             key: 'size',           takesValue: true,
	  valueLabel: '<size>',
	  parse: v => /^(diagram|page)$/.test(v) ? v : null,               default: 'diagram',
	  desc: 'export size mode (for png, jpg and svg formats): diagram [default] crops the output to the diagram content, page exports the full page(s) the diagram is on, as with the Size option in the export dialog' },
	{ short: '-a', long: '--all-pages',        key: 'allPages',
	  desc: 'export all pages (for PDF and HTML formats)' },
	{ short: '-p', long: '--page-index',       key: 'pageIndex',      takesValue: true,
	  valueLabel: '<pageIndex>',
	  parse: i => parseInt(i) - 1,
	  desc: 'selects a specific page (1-based); if not specified and the format is an image, the first page is selected' },
	{ short: '-l', long: '--layers',           key: 'layers',         takesValue: true,
	  valueLabel: '<comma separated layer indexes>',
	  desc: 'selects which layers to export (applies to all pages), if not specified, all layers are selected' },
	{ short: '-g', long: '--page-range',       key: 'pageRange',      takesValue: true,
	  valueLabel: '<from>..<to>',
	  parse: argsRange,
	  desc: 'selects a page range (1-based, for PDF format only)' },
	{ short: '-u', long: '--uncompressed',     key: 'uncompressed',
	  desc: 'Uncompressed XML output (for XML and SVG format only)' },
	{ short: '-z', long: '--zoom',             key: 'zoom',           takesValue: true,
	  valueLabel: '<zoom>',
	  parse: parseFloat,
	  desc: 'scales the application interface' },
	{              long: '--theme',            key: 'theme',          takesValue: true,
	  valueLabel: '<theme>',
	  parse: v => /^(dark|light|auto)$/.test(v) ? v : null,
	  desc: 'Theme of the exported image (dark, light, auto [default]); applies to svg, png, jpeg and pdf. auto keeps SVG adaptive to the viewer and renders other formats light' },
	{              long: '--svg-theme',        key: 'svgTheme',       takesValue: true,
	  valueLabel: '<theme>',
	  parse: v => /^(dark|light)$/.test(v) ? v : null,                default: 'auto',
	  desc: 'Deprecated, use --theme. Theme of the exported SVG image (dark, light, auto [default])' },
	{              long: '--svg-links-target', key: 'svgLinksTarget', takesValue: true,
	  valueLabel: '<target>',
	  parse: v => /^(auto|new-win|same-win)$/.test(v) ? v : null,     default: 'auto',
	  desc: 'Target of links in the exported SVG image (auto [default], new-win, same-win)' },
	{              long: '--enable-plugins',   key: 'enablePlugins',
	  desc: 'Enable Plugins' },
	{              long: '--html-theme',       key: 'htmlTheme',      takesValue: true,
	  valueLabel: '<theme>',
	  parse: v => /^(dark|light|auto)$/.test(v) ? v : null,           default: 'auto',
	  desc: 'Theme of the HTML viewer (dark, light, auto [default])' },
	{              long: '--html-zoom',        key: 'htmlZoom',       takesValue: true,
	  valueLabel: '<true/false>',
	  parse: parseBool,                                                default: true,
	  desc: 'Show zoom controls in HTML viewer (default: true)' },
	{              long: '--html-lightbox',    key: 'htmlLightbox',   takesValue: true,
	  valueLabel: '<true/false>',
	  parse: parseBool,                                                default: true,
	  desc: 'Enable lightbox in HTML viewer (default: true)' },
	{              long: '--html-layers',      key: 'htmlLayers',     takesValue: true,
	  valueLabel: '<true/false>',
	  parse: parseBool,                                                default: true,
	  desc: 'Show layers toolbar in HTML viewer (default: true)' },
	{              long: '--html-tags',        key: 'htmlTags',       takesValue: true,
	  valueLabel: '<true/false>',
	  parse: parseBool,                                                default: true,
	  desc: 'Show tags toolbar in HTML viewer (default: true)' },
	{              long: '--html-fit',         key: 'htmlFit',        takesValue: true,
	  valueLabel: '<true/false>',
	  parse: parseBool,                                                default: true,
	  desc: 'Responsive fit to container width in HTML viewer (default: true)' },
	{              long: '--html-link-target', key: 'htmlLinkTarget', takesValue: true,
	  valueLabel: '<target>',
	  parse: v => /^(auto|blank|self)$/.test(v) ? v : null,           default: 'auto',
	  desc: 'Link target in HTML viewer (auto [default], blank, self)' },
	{              long: '--html-link-color',  key: 'htmlLinkColor',  takesValue: true,
	  valueLabel: '<color>',
	  desc: 'Link highlight color in HTML viewer (default: #0000ff)' },
	{              long: '--html-edit-link',   key: 'htmlEditLink',   takesValue: true,
	  valueLabel: '<url>',
	  desc: 'URL for edit button in HTML viewer' },
	// Handled via process.argv before the parser runs; listed here for help text only.
	{ long: '--disable-update',    helpOnly: true,
	  desc: 'disable auto-update' },
	{ long: '--no-silent-update',  helpOnly: true,
	  desc: 'prompt before downloading updates instead of updating silently' },
];

const SHORT_MAP = new Map(OPTION_DEFS.filter(d => d.short && !d.helpOnly).map(d => [d.short, d]));
const LONG_MAP  = new Map(OPTION_DEFS.filter(d => !d.helpOnly).map(d => [d.long, d]));

export function formatHelp(version)
{
	const lines = [
		`draw.io ${version}`,
		'',
		'Usage: drawio [options] [input file/folder]...',
		'',
		'Options:',
	];

	// Build flag strings first so we can measure the max width for alignment
	const rows = [];
	rows.push({ flags: '-V, --version',  desc: 'output the version number' });
	for (const def of OPTION_DEFS)
	{
		const label = def.valueLabel ? ` ${def.valueLabel}` : '';
		const flags = def.short ? `${def.short}, ${def.long}${label}` : `${def.long}${label}`;
		rows.push({ flags, desc: def.desc });
	}
	rows.push({ flags: '-h, --help', desc: 'display help for command' });

	const col = Math.max(...rows.map(r => r.flags.length)) + 4;
	for (const row of rows)
	{
		lines.push('  ' + row.flags.padEnd(col) + row.desc);
	}

	return lines.join('\n');
}

/**
 * Parse draw.io CLI arguments.
 *
 * argv is process.argv, possibly with a leading null inserted by the Electron
 * packaged-app workaround (github.com/electron/electron/issues/4690).
 * Either way, user-supplied tokens start at index 2.
 *
 * Returns { opts, args } where opts is a plain object of parsed option values
 * and args is an array of positional (non-flag) arguments.
 */
export function parseDrawioArgs(argv)
{
	const opts = {};
	for (const def of OPTION_DEFS)
	{
		if ('default' in def) opts[def.key] = def.default;
	}

	const tokens = argv.slice(2).filter(t => t != null);
	const positional = [];
	let i = 0;

	while (i < tokens.length)
	{
		const token = tokens[i];

		if (token === '--')
		{
			for (const t of tokens.slice(i + 1))
			{
				if (t != null && !t.startsWith('-')) positional.push(t);
			}
			break;
		}

		// --flag=value inline syntax
		if (token.startsWith('--') && token.includes('='))
		{
			const eq  = token.indexOf('=');
			const def = LONG_MAP.get(token.slice(0, eq));
			if (def && def.takesValue) applyValue(opts, def, token.slice(eq + 1));
			i++;
			continue;
		}

		if (token.startsWith('-'))
		{
			let def = SHORT_MAP.get(token) || LONG_MAP.get(token);

			// Combined short flags: -abc → -a -b -c, or -fpng → -f png (value attached).
			// Only applies when the token is a single-dash multi-char short cluster that
			// doesn't itself match a known flag. Mirrors commander.js behaviour, which
			// pre-30.0.0 drawio relied on (e.g. Makefiles using `drawio -xa --crop ...`).
			if (!def && !token.startsWith('--') && token.length > 2)
			{
				let allRecognized = true;
				let j = 1;

				while (j < token.length)
				{
					const shortDef = SHORT_MAP.get('-' + token[j]);
					if (!shortDef) { allRecognized = false; break; }

					if (shortDef.takesValue)
					{
						// Attached-value form: -fpng → -f with value "png".
						applyValue(opts, shortDef, token.slice(j + 1));
						j = token.length;
						break;
					}

					opts[shortDef.key] = true;
					j++;
				}

				if (allRecognized)
				{
					i++;
					continue;
				}
				// Unknown letter in the cluster — drop the whole token (existing behaviour).
			}

			if (!def)
			{
				i++;
				continue;
			}

			if (!def.takesValue)
			{
				opts[def.key] = true;
				i++;
			}
			else
			{
				i++;
				if (i < tokens.length && !tokens[i].startsWith('-'))
				{
					applyValue(opts, def, tokens[i]);
					i++;
				}
			}
			continue;
		}

		positional.push(token);
		i++;
	}

	return { opts, args: positional };
}

function applyValue(opts, def, raw)
{
	if (def.parse)
	{
		const parsed = def.parse(raw);
		opts[def.key] = (parsed === null || parsed === undefined)
			? ('default' in def ? def.default : undefined)
			: parsed;
	}
	else
	{
		opts[def.key] = raw;
	}
}
