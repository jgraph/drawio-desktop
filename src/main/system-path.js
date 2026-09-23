import path from 'path';

// Windows looks for a program started by bare name in the working directory
// before PATH, and opening a diagram from Explorer makes the diagram's folder
// the working directory, so system programs are started by absolute path
// [GHSA-qg46-52fx-h7p8]
export function getSystem32Path(file, env = process.env)
{
	let root = env.SystemRoot || env.windir;

	// Anything but a drive path (C:\...) would resolve against the working
	// directory or its drive
	if (typeof root !== 'string' || !/^[A-Za-z]:[\\/]/.test(root))
	{
		root = 'C:\\Windows';
	}

	return path.win32.join(root, 'System32', file);
}
