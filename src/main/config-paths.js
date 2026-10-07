// Local files named in the user's configuration (Extras > Configuration):
// libraries, templates and fonts that point at local paths or file:// URLs are
// fetched through the readFile IPC [jgraph/drawio-desktop#1278]. They are never
// picked in a file dialog, so they cannot be blessed the way opened files are.
//
// The configuration lives in the renderer (Editor.config, loaded from
// localStorage), where any script in the page can rewrite it, so what it names
// is only a request. Each window's configuration is read once, when its app has
// loaded and before any file content has been sent to it, and a path in it is
// readable only after the user has allowed it in a dialog of the main process.
// Never consulted for writes: the configuration widens what the renderer may
// read, never what it may write.
// No Electron imports, fs, the store and the dialog are injected, so it is unit
// testable.
import path from 'path';

const ALLOWED_PATHS_KEY = 'allowedConfigPaths';
const ALLOWED_PATHS_MAX = 500;

// Set once the configuration found on the first launch with these grants has
// been adopted without asking: every earlier version let any script in the
// renderer read these files, so trusting what is already there widens nothing
const ALLOWED_PATHS_MIGRATION_KEY = 'allowedConfigPathsMigrated';

// Collects the config-declared URLs in the renderer. The keys to look at are
// listed here, in the main process, and only the values of known path-carrying
// fields are used. Returned values are still just candidates: the caller keeps
// the ones that name a local file.
//
// Runs in the renderer via executeJavaScript (see collectConfigPathsScript), so
// it must not reference anything outside its own body.
export function collectConfigPaths()
{
	try
	{
		var urls = [];

		function addUrl(url)
		{
			if (typeof url === 'string' && url.length > 0)
			{
				urls.push(url);
			}
		};

		function addFont(entry)
		{
			if (entry != null && typeof entry === 'object')
			{
				addUrl(entry.fontUrl);
			}
		};

		var config = (typeof Editor !== 'undefined') ? Editor.config : null;

		if (config != null && typeof config === 'object')
		{
			addUrl(config.templateFile);

			if (Array.isArray(config.customTemplates))
			{
				config.customTemplates.forEach(function(entry)
				{
					if (entry != null && typeof entry === 'object')
					{
						addUrl(entry.url);
						addUrl(entry.preview);
					}
				});
			}

			// Library ids are a one-character service prefix (U for a URL,
			// S for a desktop file) followed by the encoded URL
			if (Array.isArray(config.defaultCustomLibraries))
			{
				config.defaultCustomLibraries.forEach(function(id)
				{
					if (typeof id === 'string' && id.length > 1)
					{
						var url = id.substring(1);

						try
						{
							url = decodeURIComponent(url);
						}
						catch (e) {} // Not encoded, use as-is

						addUrl(url);
					}
				});
			}

			// Libraries offered in the More Shapes dialog
			if (Array.isArray(config.libraries))
			{
				config.libraries.forEach(function(section)
				{
					if (section != null && typeof section === 'object' &&
						Array.isArray(section.entries))
					{
						section.entries.forEach(function(entry)
						{
							if (entry != null && typeof entry === 'object' &&
								Array.isArray(entry.libs))
							{
								entry.libs.forEach(function(lib)
								{
									if (lib != null && typeof lib === 'object')
									{
										addUrl(lib.url);
									}
								});
							}
						});
					}
				});
			}

			if (Array.isArray(config.customFonts))
			{
				config.customFonts.forEach(addFont);
			}

			if (Array.isArray(config.defaultFonts))
			{
				config.defaultFonts.forEach(addFont);
			}

			if (typeof config.fontCss === 'string')
			{
				var parts = config.fontCss.split('url(');

				for (var i = 1; i < parts.length; i++)
				{
					var end = parts[i].indexOf(')');

					if (end > 0)
					{
						// Same trimming as Editor.trimCssUrl in the renderer
						addUrl(parts[i].substring(0, end).
							replace(/^[\s"']+/, '').replace(/[\s"']+$/, ''));
					}
				}
			}
		}

		return urls;
	}
	catch (e)
	{
		return [];
	}
};

// Serialised so it can be handed to executeJavaScript, which takes source and
// not a function. Built from the function above so it stays ordinary,
// syntax-checked code instead of a string literal with escaped regexes.
export const collectConfigPathsScript = '(' + String(collectConfigPaths) + ')()';

// Returns the filesystem path for URLs that name a local file (file:// URLs,
// drive, UNC and absolute paths), null otherwise. Mirrors Editor.getLocalFilePath
// in the renderer, which decides what is routed through the readFile IPC.
export function getLocalFilePath(url)
{
	if (typeof url !== 'string')
	{
		return null;
	}

	if (url.substring(0, 7) == 'file://')
	{
		let decoded;

		try
		{
			decoded = decodeURIComponent(url.substring(7).split(/[?#]/)[0]);
		}
		catch (e)
		{
			return null;
		}

		// Removes the leading slash before Windows drive letters (file:///C:/...)
		return (/^\/[a-zA-Z]:/.test(decoded)) ? decoded.substring(1) : decoded;
	}
	else if (/^([a-zA-Z]:[\\\/]|[\\\/])/.test(url))
	{
		return url;
	}

	return null;
};

export class ConfigPathGrants
{
	// confirm(owner, entries) asks the user and resolves true to allow, entries
	// being {path, realpath} for the files not allowed before. store is
	// electron-store or null, without it nothing is remembered across launches
	// and nothing is adopted.
	constructor(fsImpl, store, confirm)
	{
		this.fs = fsImpl;
		this.store = store;
		this.confirm = confirm;
		// owner (a webContents) -> state of its one configuration read
		this.owners = new Map();
		// Realpaths the user allowed, kept across launches
		this.allowed = new Set();
		// Realpaths the user refused, this session only, so other windows do
		// not ask again until the next launch
		this.denied = new Set();
		// Chains the decisions so two windows loading at once ask one at a
		// time and the second sees what was decided for the first
		this.decisions = Promise.resolve();

		if (store != null)
		{
			try
			{
				const persisted = store.get(ALLOWED_PATHS_KEY);

				if (Array.isArray(persisted))
				{
					for (const p of persisted)
					{
						if (typeof p === 'string' && p) this.allowed.add(p);
					}
				}
			}
			catch (e) {} // Bad store contents, start with nothing allowed
		}
	}

	// Called for each editor window before it loads. Reads from a webContents
	// that was never registered (the export window) get no configured paths.
	register(owner)
	{
		const state = {started: false};
		state.collected = new Promise((resolve) => state.resolveCollected = resolve);
		state.readable = new Promise((resolve) => state.resolveReadable = resolve);
		this.owners.set(owner, state);
	}

	unregister(owner)
	{
		this.owners.delete(owner);
	}

	// Reads owner's configuration. Only the first call for an owner does
	// anything: it comes from the app-load-finished message, which the renderer
	// sends once its app has loaded and before it has been sent any file, and
	// a later message, from whatever script runs in the page by then, must not
	// read the configuration again.
	async collect(owner)
	{
		const state = this.owners.get(owner);

		if (state == null || state.started)
		{
			return false;
		}

		state.started = true;
		let entries = [];

		try
		{
			entries = this.getEntries(await owner.executeJavaScript(collectConfigPathsScript));
		}
		catch (e) {} // Renderer gone or not loaded, nothing configured is readable

		state.resolveCollected();

		const decision = this.decisions.then(() => this.decide(owner, entries));
		this.decisions = decision.catch(() => {});
		let readable = new Set();

		try
		{
			readable = await decision;
		}
		catch (e) {} // Dialog failed, nothing configured is readable

		state.resolveReadable(readable);

		return true;
	}

	// Resolves once owner's configuration has been read. The read-side IPC
	// waits for it before replying, so no file content (an opened diagram, a
	// library) is in the renderer when the configuration is read.
	waitForCollection(owner)
	{
		const state = this.owners.get(owner);

		return (state != null) ? state.collected : Promise.resolve();
	}

	// Waits for the user's answer if owner's configuration names paths not
	// allowed before
	async isReadable(owner, realpath)
	{
		const state = this.owners.get(owner);

		return state != null && (await state.readable).has(realpath);
	}

	// Configured local paths with the realpath that reads are checked against,
	// one entry per realpath
	getEntries(urls)
	{
		const entries = new Map();

		if (!Array.isArray(urls))
		{
			return [];
		}

		for (const url of urls)
		{
			const local = getLocalFilePath(url);

			if (local == null || local.includes('\0'))
			{
				continue;
			}

			const resolved = path.resolve(local);
			const realpath = this.getRealpath(resolved);

			if (!entries.has(realpath))
			{
				entries.set(realpath, {path: resolved, realpath: realpath});
			}
		}

		return Array.from(entries.values());
	}

	// Must be the native realpath that canonicalisePath in electron.js checks
	// against, see blessPath there [jgraph/drawio-desktop#2559]. A configured
	// file that does not exist yet gets its directory's realpath, as there.
	getRealpath(resolved)
	{
		try
		{
			return this.fs.realpathSync.native(resolved);
		}
		catch (e)
		{
			try
			{
				return path.join(this.fs.realpathSync.native(path.dirname(resolved)),
					path.basename(resolved));
			}
			catch (e2)
			{
				return resolved; // Some filesystems do not support realpath
			}
		}
	}

	async decide(owner, entries)
	{
		const readable = new Set();

		if (this.store != null && !this.store.get(ALLOWED_PATHS_MIGRATION_KEY))
		{
			for (const entry of entries)
			{
				this.allowed.add(entry.realpath);
			}

			this.persist();
			this.store.set(ALLOWED_PATHS_MIGRATION_KEY, true);
		}

		const unknown = entries.filter((entry) => !this.allowed.has(entry.realpath) &&
			!this.denied.has(entry.realpath));

		// A window closed while its turn came up has no one to ask
		if (unknown.length > 0 && this.owners.has(owner))
		{
			const allow = await this.confirm(owner, unknown) === true;

			for (const entry of unknown)
			{
				(allow ? this.allowed : this.denied).add(entry.realpath);
			}

			if (allow)
			{
				this.persist();
			}
		}

		for (const entry of entries)
		{
			if (this.allowed.has(entry.realpath))
			{
				readable.add(entry.path);
				readable.add(entry.realpath);
			}
		}

		return readable;
	}

	persist()
	{
		if (this.store == null) return;

		try
		{
			let arr = Array.from(this.allowed);

			// Newest insertions win
			if (arr.length > ALLOWED_PATHS_MAX)
			{
				arr = arr.slice(arr.length - ALLOWED_PATHS_MAX);
			}

			this.store.set(ALLOWED_PATHS_KEY, arr);
		}
		catch (e) {}
	}
}
