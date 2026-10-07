import path from 'path';

// urlParams.json adds URL parameters to every editor window, for options that
// have no other place on desktop such as math-font [jgraph/drawio-desktop#298].
// It is read from the install folder, then the user data folder, and from the
// working directory only with DRAWIO_ENV=dev: a diagram opened from Explorer
// while draw.io is closed starts it in the diagram's folder, so a urlParams.json
// next to the diagram changed every window until quit (embed=1 drops
// ElectronApp.js, dev=1 breaks a packaged build)
export function getUrlParamsFiles({exeDir, userDataDir, cwd, dev})
{
	const files = [path.join(exeDir, 'urlParams.json'),
		path.join(userDataDir, 'urlParams.json')];

	if (dev && cwd != null)
	{
		files.push(path.join(cwd, 'urlParams.json'));
	}

	return files;
}

// Returns the defaults, then the values of each file in turn, then state, which
// no file can change: it mirrors settings that the main process acts on itself,
// and the Extras menu checkmarks come from it, so a different value made a
// toggle store the opposite of what the user picked
export function getUrlParams({defaults, state, files, readFile, log})
{
	const params = Object.assign({}, defaults);

	for (const file of files)
	{
		let values;

		try
		{
			values = JSON.parse(readFile(file));
		}
		catch (e)
		{
			if (e.code !== 'ENOENT')
			{
				log('Error in ' + file + ': ' + e.message);
			}

			continue;
		}

		if (values == null || typeof values !== 'object' || Array.isArray(values))
		{
			log('Error in ' + file + ': not an object');
			continue;
		}

		for (const key of Object.keys(values))
		{
			const value = values[key];

			// URL parameters are scalars, and an object for __proto__ would
			// replace the prototype of params
			if (typeof value === 'string' || typeof value === 'number' ||
				typeof value === 'boolean')
			{
				params[key] = value;
			}
		}
	}

	return Object.assign(params, state);
}
