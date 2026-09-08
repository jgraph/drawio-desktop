// Tracks fs.watchFile registrations per owner (a webContents) so change events
// reach the window that asked for them, and so closing one window does not stop
// the watches belonging to another [jgraph/drawio-desktop#2541].
// No Electron imports, the fs implementation is injected, so it is unit testable.

export default class FileWatcher
{
	constructor(fsImpl)
	{
		this.fs = fsImpl;
		// owner -> Map of path -> listener passed to fs.watchFile
		this.watches = new Map();
	}

	// Watches filePath for the given owner, calling onChange(curr, prev). A
	// repeat call for the same owner and path is a no-op: the renderer re-arms
	// the watch on every setCurrentFile, and a second fs listener would deliver
	// every change twice
	watch(owner, filePath, onChange)
	{
		let ownerWatches = this.watches.get(owner);

		if (ownerWatches == null)
		{
			ownerWatches = new Map();
			this.watches.set(owner, ownerWatches);
		}

		if (ownerWatches.has(filePath))
		{
			return false;
		}

		const listener = (curr, prev) => onChange(curr, prev);
		ownerWatches.set(filePath, listener);
		this.fs.watchFile(filePath, listener);

		return true;
	}

	// Removes only this owner's listener, other windows watching the same file
	// keep theirs
	unwatch(owner, filePath)
	{
		const ownerWatches = this.watches.get(owner);
		const listener = ownerWatches != null ? ownerWatches.get(filePath) : null;

		if (listener == null)
		{
			return false;
		}

		ownerWatches.delete(filePath);

		if (ownerWatches.size == 0)
		{
			this.watches.delete(owner);
		}

		this.fs.unwatchFile(filePath, listener);

		return true;
	}

	// Called when a window goes away, so its watches do not leak
	unwatchAll(owner)
	{
		const ownerWatches = this.watches.get(owner);

		if (ownerWatches == null)
		{
			return 0;
		}

		for (const [filePath, listener] of ownerWatches)
		{
			this.fs.unwatchFile(filePath, listener);
		}

		const count = ownerWatches.size;
		this.watches.delete(owner);

		return count;
	}

	// For tests and diagnostics
	watchedPaths(owner)
	{
		const ownerWatches = this.watches.get(owner);

		return ownerWatches != null ? Array.from(ownerWatches.keys()) : [];
	}
}
