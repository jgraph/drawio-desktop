// Unit tests for the CLI HTML export. A real fatal error needs a string of about
// 256M characters in an Electron main process, so these check instead that the
// page is what one JSON.stringify gave and that the diagram never goes through
// one in full
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { buildHtmlExport, MAX_XML_PART_LENGTH } from '../main/html-export.js';

function htmlEntities(str)
{
	return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;')
		.replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function page(xml, title, options, partLength)
{
	return [...buildHtmlExport(xml, title, options, partLength)].join('');
}

// The page as written before it came in parts
function expectedPage(data, title, style = 'max-width:100%;border:1px solid transparent;')
{
	return '<!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=5,IE=9" ><![endif]-->\n' +
		'<!DOCTYPE html>\n<html>\n<head>\n' +
		'<title>' + htmlEntities(title) + '</title>\n' +
		'<meta charset="utf-8"/>\n' +
		'</head>\n<body>\n<div class="mxgraph" style="' + style + '" data-mxgraph="' +
		htmlEntities(JSON.stringify(data)) + '"></div>\n' +
		'<script type="text/javascript" src="https://viewer.diagrams.net/js/viewer-static.min.js"></script>' +
		'\n</body>\n</html>';
}

function defaultData(xml)
{
	return {highlight: '#0000ff', nav: true, resize: true, xml: xml, toolbar: 'zoom layers tags lightbox'};
}

function readBack(html)
{
	var attr = /data-mxgraph="([^"]*)"/.exec(html)[1];

	return JSON.parse(attr.replace(/&quot;/g, '"').replace(/&gt;/g, '>')
		.replace(/&lt;/g, '<').replace(/&amp;/g, '&'));
}

describe('buildHtmlExport', () =>
{
	const samples = {
		'plain XML': '<mxGraphModel><root><mxCell id="0"/></root></mxGraphModel>',
		'every escaped character': '"\\/\b\f\n\r\t\u0001\u001f<>&  ',
		'text that looks escaped': '&quot;\\"\\u0041&amp;&lt;',
		'text outside Latin-1': '<a label="日本語 Ωmega">中</a>',
		'surrogate pairs': '😀a😀😀b😀😀😀',
		'lone surrogates': 'a\ud83db\ude00c\ude00\ud83d',
		'empty diagram': ''
	};

	for (const [name, xml] of Object.entries(samples))
	{
		test('matches a single JSON.stringify: ' + name, () =>
		{
			for (const partLength of [2, 3, 5, 7, 16, MAX_XML_PART_LENGTH])
			{
				assert.equal(page(xml, 'file', {}, partLength), expectedPage(defaultData(xml), 'file'));
			}
		});
	}

	test('keeps the order of the options around the diagram', () =>
	{
		const options = {htmlLinkColor: '#ff0000', htmlLinkTarget: 'blank', htmlLightbox: false,
			allPages: true, pageIndex: 2, htmlTheme: 'dark', htmlEditLink: '_blank'};
		const data = {highlight: '#ff0000', target: '_blank', lightbox: false, nav: true, resize: true,
			xml: '<a/>', page: 2, toolbar: 'pages zoom layers tags', 'dark-mode': 'dark', edit: '_blank'};

		assert.equal(page('<a/>', 'file', options, 2), expectedPage(data, 'file'));
	});

	test('leaves out the border and width when not wanted', () =>
	{
		const options = {htmlZoom: false, htmlLayers: false, htmlTags: false, htmlFit: false};
		const data = {highlight: '#0000ff', nav: true, resize: true, xml: '<a/>'};

		assert.equal(page('<a/>', 'file', options), expectedPage(data, 'file', ''));
	});

	test('an option cannot pass for the diagram', () =>
	{
		const color = '"xml":"" "xml":""';
		const html = page('<a/>', 'file', {htmlLinkColor: color});
		const data = readBack(html);

		assert.equal(data.highlight, color);
		assert.equal(data.xml, '<a/>');
	});

	test('escapes the title', () =>
	{
		assert.match(page('<a/>', 'a<b>&"c', {}), /<title>a&lt;b&gt;&amp;&quot;c<\/title>/);
	});

	test('the diagram reads back whole', () =>
	{
		const xml = '<a b="😀">&amp;</a>\n'.repeat(1000);

		assert.equal(readBack(page(xml, 'file', {}, 64)).xml, xml);
	});

	test('never passes more than a part of the diagram to JSON.stringify', (t) =>
	{
		const xml = 'a'.repeat(MAX_XML_PART_LENGTH * 2 + 100);
		const stringify = t.mock.method(JSON, 'stringify');

		assert.equal(readBack(page(xml, 'file', {})).xml.length, xml.length);

		const strings = stringify.mock.calls.map(call => call.arguments[0]).filter(arg => typeof arg === 'string');

		assert.equal(strings.length, 3);
		assert.ok(strings.every(str => str.length <= MAX_XML_PART_LENGTH));
	});

	test('a part stays far below what V8 can reserve in one allocation', () =>
	{
		// 8 characters reserved per character, 2 bytes each outside Latin-1
		assert.ok(MAX_XML_PART_LENGTH * 8 * 2 < 2 ** 31 - 2 ** 21);
	});

	test('builds the page as it is read, not all at once', () =>
	{
		const parts = buildHtmlExport('<a/>'.repeat(100), 'file', {}, 4);
		const first = parts.next().value;

		assert.ok(first.endsWith('&quot;xml&quot;:&quot;'));
		assert.equal(parts.next().value, '&lt;a/&gt;');
	});
});
