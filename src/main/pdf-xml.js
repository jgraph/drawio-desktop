import zlib from 'zlib';

export function readPdfXml(buffer)
{
	var f = buffer.toString('binary');
	var result = null;

	// Extracts Subject or Embedded file attachment from PDF 1.7
	if (f.substring(0, 8) == '%PDF-1.7')
	{
		// Checks all occurrences as the first may be the /EmbeddedFiles
		// name tree entry in the document catalog rather than the
		// /Type /EmbeddedFile stream object with the attached diagram
		var blockStart = f.indexOf('EmbeddedFile');

		while (blockStart > -1)
		{
			var streamStart = f.indexOf('stream', blockStart) + 9;
			var fileInfo = f.substring(blockStart, streamStart);

			if (fileInfo.indexOf('application#2Fvnd.jgraph.mxfile') > 0)
			{
				var streamEnd = f.indexOf('endstream', streamStart - 1);

				try
				{
					return zlib.inflateRawSync(
						Buffer.from(f.substring(streamStart, streamEnd), 'binary')).toString();
				}
				catch (e)
				{
					// Continue to next occurrence or extraction method
				}
			}

			blockStart = f.indexOf('EmbeddedFile', blockStart + 1);
		}

		var last = f.indexOf('/ObjStm');

		while (last > 0)
		{
			var streamStart = f.indexOf('stream', last) + 9;
			var streamEnd = f.indexOf('endstream', streamStart - 1);

			try
			{
				var text = zlib.inflateRawSync(
					Buffer.from(f.substring(streamStart, streamEnd), 'binary')).toString();
				var subj = text.indexOf('/Subject <');

				if (subj > 0)
				{
					var temp = text.substring(subj + 14, text.indexOf('>', subj));

					if (temp != null)
					{
						// Convert hex to ASCII
						var str = [];

						for (var n = 0; n < temp.length; n += 2)
						{
							var code = temp.substr(n, 2);

							if (code != '00')
							{
								str.push(String.fromCharCode(parseInt(code, 16)));
							}
						}

						result = str.join('');
					}

					break;
				}
			}
			catch (e)
			{
				// Continue to next object stream
			}

			last = f.indexOf('/ObjStm', last + 1);
		}
	}

	// Extracts subject from PDF 1.4
	if (result == null && f.substring(0, 8) == '%PDF-1.4')
	{
		var check = '/Subject (%3Cmxfile';
		var curline = '';
		var checked = 0;
		var pos = 0;
		var obj = [];
		var buf = null;

		while (pos < f.length)
		{
			var b = f.charCodeAt(pos);
			pos += 1;

			if (b != 10)
			{
				curline += String.fromCharCode(b);
			}

			if (b == check.charCodeAt(checked))
			{
				checked++;
			}
			else
			{
				checked = 0;
			}

			if (checked == check.length)
			{
				var end = f.indexOf('%3C%2Fmxfile%3E', pos) + 15;
				pos -= 9;

				if (end > pos)
				{
					result = f.substring(pos, end);
					break;
				}
			}

			if (b == 10)
			{
				if (curline == 'endobj')
				{
					buf = null;
				}
				else if (curline.substring(curline.length - 3, curline.length) == 'obj' ||
					curline == 'xref' || curline == 'trailer')
				{
					buf = [];
					obj[curline.split(' ')[0]] = buf;
				}
				else if (buf != null)
				{
					buf.push(curline);
				}

				curline = '';
			}
		}

		// Extract XML via references
		if (result == null && obj != null)
		{
			var trailer = obj['trailer'];

			if (trailer != null)
			{
				var arr = /.* \/Info (\d+) (\d+) R/g.exec(trailer.join('\n'));

				if (arr != null && arr.length > 0)
				{
					var info = obj[arr[1]];

					if (info != null)
					{
						arr = /.* \/Subject (\d+) (\d+) R/g.exec(info.join('\n'));

						if (arr != null && arr.length > 0)
						{
							var subj = obj[arr[1]];

							if (subj != null)
							{
								subj = subj.join('\n');
								result = subj.substring(1, subj.length - 1);
							}
						}
					}
				}
			}
		}
	}

	if (result != null)
	{
		result = decodeURIComponent(result.
			replace(/\\\(/g, "(").
			replace(/\\\)/g, ")"));
	}

	return result;
}
