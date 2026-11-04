import zlib from 'zlib';
import { MAX_INFLATED_LENGTH } from './png-xml.js';

// A diagram attachment is raw UTF-8 XML, so unlike the ASCII hex of an object stream
// its characters can take 3 bytes each, and toString only fails past this many times
// the longest string. A smaller limit would refuse attachments that read
const MAX_BYTES_PER_CHAR = 3;

// A stream past the longest string ends the read: the next stream is not tried
function isTooLong(e)
{
	return e.code === 'ERR_BUFFER_TOO_LARGE' || e.code === 'ERR_STRING_TOO_LONG';
}

// Returns the diagram embedded in a PDF, or null if it has none. Each stream is
// inflated at most once, however many occurrences lead to it. Throws if the diagram
// cannot be read, as with a stream over maxInflatedLength
export function readPdfXml(buffer, maxInflatedLength = MAX_INFLATED_LENGTH)
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

			// No stream follows this occurrence or any later one
			if (streamStart < 9)
			{
				break;
			}

			var fileInfo = f.substring(blockStart, streamStart);
			var nextBlock = blockStart + 1;

			if (fileInfo.indexOf('application#2Fvnd.jgraph.mxfile') > 0)
			{
				var streamEnd = f.indexOf('endstream', streamStart - 1);

				if (streamEnd < 0)
				{
					break;
				}

				try
				{
					return zlib.inflateRawSync(
						Buffer.from(f.substring(streamStart, streamEnd), 'binary'),
						{maxOutputLength: maxInflatedLength * MAX_BYTES_PER_CHAR}).toString();
				}
				catch (e)
				{
					if (isTooLong(e))
					{
						throw e;
					}

					// Continue to next occurrence or extraction method
				}

				nextBlock = streamEnd;
			}

			blockStart = f.indexOf('EmbeddedFile', nextBlock);
		}

		var last = f.indexOf('/ObjStm');

		while (last > 0)
		{
			var streamStart = f.indexOf('stream', last) + 9;
			var streamEnd = f.indexOf('endstream', streamStart - 1);

			// No whole stream follows this occurrence or any later one
			if (streamStart < 9 || streamEnd < 0)
			{
				break;
			}

			try
			{
				var text = zlib.inflateRawSync(
					Buffer.from(f.substring(streamStart, streamEnd), 'binary'),
					{maxOutputLength: maxInflatedLength}).toString();
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
				if (isTooLong(e))
				{
					throw e;
				}

				// Continue to next object stream
			}

			last = f.indexOf('/ObjStm', streamEnd);
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
