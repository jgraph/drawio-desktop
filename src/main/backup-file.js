import { promises as fs } from 'fs';
import { constants } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

// Never open the backup destination for writing: a link can be planted there
// after authorisation. Rename replaces that directory entry without following
// it, including on Windows where O_NOFOLLOW is unavailable [GHSA-36x5-vw5q-29rv].
export async function writeBackupFile(filePath, data, encoding)
{
	const tempPath = path.join(path.dirname(filePath), '.drawio-bkp-' + randomUUID() + '.tmp');
	let fh;
	let created = false;

	try
	{
		fh = await fs.open(tempPath, constants.O_SYNC | constants.O_CREAT |
			constants.O_EXCL | constants.O_WRONLY, 0o600);
		created = true;
		await fh.writeFile(data, encoding);
		await fh.sync();
		await fh.close();
		fh = null;
		await fs.rename(tempPath, filePath);
		created = false;
	}
	finally
	{
		try
		{
			await fh?.close();
		}
		finally
		{
			if (created)
			{
				await fs.unlink(tempPath).catch(() => {});
			}
		}
	}
}
