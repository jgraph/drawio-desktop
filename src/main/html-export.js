// Most characters of the diagram passed to JSON.stringify at once. V8 reserves
// 8 times the length of a string in one allocation there, and when that does
// not fit, at about 256M characters or 128M outside Latin-1, the process dies
// with a fatal error that JS cannot catch
export const MAX_XML_PART_LENGTH = 1024 * 1024;

function htmlEntities(str)
{
	return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;')
		.replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function isHighSurrogate(charCode)
{
	return charCode >= 0xd800 && charCode <= 0xdbff;
}

// Returns an iterator of strings to write out in order. A large diagram cannot
// go through one JSON.stringify, and escaping can grow the page past the
// longest string, so the page only ever exists in parts. partLength must be at
// least 2 to fit a surrogate pair
export function* buildHtmlExport(xml, title, options, partLength = MAX_XML_PART_LENGTH)
{
	var data = {};

	if (options.htmlLinkColor && options.htmlLinkColor !== 'none')
	{
		data.highlight = options.htmlLinkColor;
	}
	else
	{
		data.highlight = '#0000ff';
	}

	if (options.htmlLinkTarget && options.htmlLinkTarget !== 'auto')
	{
		data.target = options.htmlLinkTarget === 'blank' ? '_blank' : '_self';
	}

	if (options.htmlLightbox === false)
	{
		data.lightbox = false;
	}

	data.nav = true;
	data.resize = true;
	data.xml = ''; // Holds its place in the JSON, the value is written in parts

	var tb = [];

	if (options.allPages)
	{
		tb.push('pages');
	}

	if (options.pageIndex != null && options.pageIndex >= 0)
	{
		data.page = options.pageIndex;
	}

	if (options.htmlZoom !== false)
	{
		tb.push('zoom');
	}

	if (options.htmlLayers !== false)
	{
		tb.push('layers');
	}

	if (options.htmlTags !== false)
	{
		tb.push('tags');
	}

	if (tb.length > 0)
	{
		if (options.htmlLightbox !== false)
		{
			tb.push('lightbox');
		}

		data.toolbar = tb.join(' ');
	}

	if (options.htmlTheme && options.htmlTheme !== 'auto')
	{
		data['dark-mode'] = options.htmlTheme;
	}

	if (options.htmlEditLink)
	{
		data.edit = options.htmlEditLink;
	}

	var fit = options.htmlFit !== false;

	// Quotes inside other values are escaped, so this can only match the key
	var json = JSON.stringify(data);
	var xmlStart = json.indexOf('"xml":""') + '"xml":"'.length;

	yield '<!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=5,IE=9" ><![endif]-->\n' +
		'<!DOCTYPE html>\n<html>\n<head>\n' +
		'<title>' + htmlEntities(title) + '</title>\n' +
		'<meta charset="utf-8"/>\n' +
		'</head>\n<body>\n' +
		'<div class="mxgraph" style="' +
		(fit ? 'max-width:100%;' : '') +
		(tb.length > 0 ? 'border:1px solid transparent;' : '') +
		'" data-mxgraph="' + htmlEntities(json.substring(0, xmlStart));

	var start = 0;

	while (start < xml.length)
	{
		var end = Math.min(start + partLength, xml.length);

		// JSON.stringify escapes half a surrogate pair
		if (end < xml.length && isHighSurrogate(xml.charCodeAt(end - 1)))
		{
			end--;
		}

		yield htmlEntities(JSON.stringify(xml.substring(start, end)).slice(1, -1));
		start = end;
	}

	yield htmlEntities(json.substring(xmlStart)) + '"></div>\n' +
		'<script type="text/javascript" src="https://viewer.diagrams.net/js/viewer-static.min.js"></script>' +
		'\n</body>\n</html>';
}
