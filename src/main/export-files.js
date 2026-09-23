// File handling for the CLI export (drawio -x) of paths the user did not type:
// files found by scanning an input folder, and output names made up from an
// input name. Whoever wrote that folder chose where its symbolic links point,
// which can be anywhere, so they are not followed [GHSA-2w35-fgjm-2vvh].
// Pure Node (no Electron imports) so it is unit testable.
import fs from 'fs';
import path from 'path';

const { O_SYNC, O_CREAT, O_WRONLY, O_TRUNC } = fs.constants;

// Not defined on Windows, where the lstat check in openExportFile is all there is
export const O_NOFOLLOW = fs.constants.O_NOFOLLOW || 0;

function lstatSafe(p)
{
	try
	{
		return fs.lstatSync(p);
	}
	catch (e)
	{
		return null;
	}
}

// Like fs.existsSync, except that a dangling symbolic link exists
export function lexists(p)
{
	return lstatSafe(p) != null;
}

export function isSymbolicLink(p)
{
	const stat = lstatSafe(p);

	return stat != null && stat.isSymbolicLink();
}

// Lists the files in dir, and in its subfolders if recursive, that are not dot
// files and have one of the given extensions. Symbolic links are skipped, even
// those that stay inside dir: a link named leak.csv renders any text file it
// points to into the export. Their targets are not even stat'ed, as that would
// connect to a network path (sending credentials for a UNC path on Windows).
// onSkipLink(path) reports the links named like files that would be exported
export function listExportFiles(dir, recursive, exts, onSkipLink)
{
	const files = [];

	function isExportable(name)
	{
		return name.charAt(0) != '.' && exts.includes(path.extname(name).toLowerCase());
	}

	function scan(dir)
	{
		for (const name of fs.readdirSync(dir))
		{
			const filePath = path.join(dir, name);

			// lstat, not readdir's file types: on Windows those report every
			// reparse point as a link, which can include OneDrive and
			// deduplicated files
			const stat = fs.lstatSync(filePath);

			if (stat.isSymbolicLink())
			{
				if (onSkipLink != null && isExportable(name))
				{
					onSkipLink(filePath);
				}
			}
			else if (stat.isFile() && isExportable(name))
			{
				files.push(filePath);
			}
			else if (stat.isDirectory() && recursive)
			{
				scan(filePath);
			}
		}
	}

	scan(dir);

	return files;
}

// Opens fileName for writing, creating or truncating it. Unless followLink is
// set, a symbolic link at fileName, dangling or not, fails with ELOOP instead
// of being written through: the lstat check covers Windows, which has no
// O_NOFOLLOW, and O_NOFOLLOW covers a link planted after the check
export function openExportFile(fileName, followLink)
{
	if (!followLink && isSymbolicLink(fileName))
	{
		const e = new Error('ELOOP: output file is a symbolic link, open \'' + fileName + '\'');
		e.code = 'ELOOP';

		throw e;
	}

	return fs.openSync(fileName, O_SYNC | O_CREAT | O_WRONLY | O_TRUNC |
		(followLink ? 0 : O_NOFOLLOW));
}
