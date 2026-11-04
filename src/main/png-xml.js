import zlib from 'zlib';

// Returns the diagram embedded in a PNG, or null if it has none. Chunk lengths
// are unsigned, and a chunk that runs past the end of the file ends the scan,
// so each pass moves forward and a malformed file cannot keep the parser going
export function readPngXml(buffer)
{
	var offset = 8; // Skip PNG signature

	while (offset < buffer.length)
	{
		var length = buffer.readUInt32BE(offset);
		offset += 4;
		var type = buffer.toString('ascii', offset, offset + 4);
		offset += 4;

		if (offset + length > buffer.length)
		{
			return null;
		}

		if (type === 'tEXt' || type === 'zTXt')
		{
			var keyEnd = offset;

			while (keyEnd < offset + length && buffer[keyEnd] !== 0)
			{
				keyEnd++;
			}

			var key = buffer.toString('ascii', offset, keyEnd);

			if (key === 'mxGraphModel')
			{
				if (type === 'zTXt')
				{
					var dataStart = keyEnd + 2; // Skip null + compression method
					var compressed = buffer.subarray(dataStart, offset + length);
					var inflated;

					try
					{
						inflated = zlib.inflateSync(compressed);
					}
					catch (e)
					{
						// Fallback for PNGs produced by the pre-fix CLI which
						// wrote raw deflate instead of zlib datastream
						// [jgraph/drawio-desktop#2425]
						inflated = zlib.inflateRawSync(compressed);
					}

					return decodeURIComponent(inflated.toString());
				}
				else
				{
					return buffer.toString('utf-8', keyEnd + 1, offset + length);
				}
			}
		}

		offset += length + 4; // Skip data + CRC
	}

	return null;
}
