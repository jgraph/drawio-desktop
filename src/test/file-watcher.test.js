// Unit tests for the per-window file watch registry — exercises
// src/main/file-watcher.js with a fake fs, no Electron needed
// [jgraph/drawio-desktop#2541]
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import FileWatcher from '../main/file-watcher.js';

// Mimics the listener semantics of fs.watchFile / fs.unwatchFile: several
// listeners may be registered for one path and each is called on a change
function fakeFs()
{
	const listeners = new Map();

	return {
		listeners: listeners,
		unwatchCalls: [],
		watchFile(filePath, listener)
		{
			if (!listeners.has(filePath))
			{
				listeners.set(filePath, []);
			}

			listeners.get(filePath).push(listener);
		},
		unwatchFile(filePath, listener)
		{
			this.unwatchCalls.push({path: filePath, listener: listener});
			const forPath = listeners.get(filePath) || [];

			if (listener == null)
			{
				// Node removes every listener when none is given, the bug this fixes
				listeners.set(filePath, []);
			}
			else
			{
				const index = forPath.indexOf(listener);

				if (index >= 0)
				{
					forPath.splice(index, 1);
				}
			}
		},
		change(filePath, curr, prev)
		{
			for (const listener of (listeners.get(filePath) || []).slice())
			{
				listener(curr, prev);
			}
		},
		listenerCount(filePath)
		{
			return (listeners.get(filePath) || []).length;
		}
	};
}

const winA = {id: 'a'};
const winB = {id: 'b'};

describe('FileWatcher.watch', () =>
{
	test('registers for the requesting owner, with no focused window involved', () =>
	{
		const fs = fakeFs();
		const watcher = new FileWatcher(fs);
		const seen = [];

		watcher.watch(winA, '/tmp/a.drawio', (curr, prev) => seen.push([curr, prev]));
		fs.change('/tmp/a.drawio', {mtimeMs: 2}, {mtimeMs: 1});

		assert.equal(fs.listenerCount('/tmp/a.drawio'), 1);
		assert.deepEqual(seen, [[{mtimeMs: 2}, {mtimeMs: 1}]]);
		assert.deepEqual(watcher.watchedPaths(winA), ['/tmp/a.drawio']);
	});

	test('a repeat watch of the same path does not register a second listener', () =>
	{
		const fs = fakeFs();
		const watcher = new FileWatcher(fs);
		let calls = 0;

		assert.equal(watcher.watch(winA, '/tmp/a.drawio', () => calls++), true);
		assert.equal(watcher.watch(winA, '/tmp/a.drawio', () => calls++), false);
		fs.change('/tmp/a.drawio', {mtimeMs: 2}, {mtimeMs: 1});

		assert.equal(fs.listenerCount('/tmp/a.drawio'), 1);
		assert.equal(calls, 1);
	});

	test('each window only sees changes to its own file', () =>
	{
		const fs = fakeFs();
		const watcher = new FileWatcher(fs);
		const seenA = [], seenB = [];

		watcher.watch(winA, '/tmp/a.drawio', () => seenA.push('a'));
		watcher.watch(winB, '/tmp/b.drawio', () => seenB.push('b'));
		fs.change('/tmp/b.drawio', {mtimeMs: 2}, {mtimeMs: 1});

		assert.deepEqual(seenA, []);
		assert.deepEqual(seenB, ['b']);
	});

	test('two windows on the same file both get the change', () =>
	{
		const fs = fakeFs();
		const watcher = new FileWatcher(fs);
		const seen = [];

		watcher.watch(winA, '/tmp/shared.drawio', () => seen.push('a'));
		watcher.watch(winB, '/tmp/shared.drawio', () => seen.push('b'));
		fs.change('/tmp/shared.drawio', {mtimeMs: 2}, {mtimeMs: 1});

		assert.equal(fs.listenerCount('/tmp/shared.drawio'), 2);
		assert.deepEqual(seen.sort(), ['a', 'b']);
	});
});

describe('FileWatcher.unwatch', () =>
{
	test('passes the listener so only that owner stops watching', () =>
	{
		const fs = fakeFs();
		const watcher = new FileWatcher(fs);
		const seen = [];

		watcher.watch(winA, '/tmp/shared.drawio', () => seen.push('a'));
		watcher.watch(winB, '/tmp/shared.drawio', () => seen.push('b'));
		watcher.unwatch(winA, '/tmp/shared.drawio');

		assert.equal(fs.unwatchCalls.length, 1);
		assert.notEqual(fs.unwatchCalls[0].listener, null);

		fs.change('/tmp/shared.drawio', {mtimeMs: 2}, {mtimeMs: 1});

		assert.deepEqual(seen, ['b']);
		assert.deepEqual(watcher.watchedPaths(winA), []);
		assert.deepEqual(watcher.watchedPaths(winB), ['/tmp/shared.drawio']);
	});

	test('an unknown owner or path is a no-op', () =>
	{
		const fs = fakeFs();
		const watcher = new FileWatcher(fs);

		watcher.watch(winA, '/tmp/a.drawio', () => {});

		assert.equal(watcher.unwatch(winB, '/tmp/a.drawio'), false);
		assert.equal(watcher.unwatch(winA, '/tmp/other.drawio'), false);
		assert.equal(fs.unwatchCalls.length, 0);
		assert.equal(fs.listenerCount('/tmp/a.drawio'), 1);
	});
});

describe('FileWatcher.unwatchAll', () =>
{
	test('a closing window drops its own watches and leaves the others', () =>
	{
		const fs = fakeFs();
		const watcher = new FileWatcher(fs);
		const seen = [];

		watcher.watch(winA, '/tmp/shared.drawio', () => seen.push('a'));
		watcher.watch(winA, '/tmp/a.drawio', () => seen.push('a2'));
		watcher.watch(winB, '/tmp/shared.drawio', () => seen.push('b'));

		assert.equal(watcher.unwatchAll(winA), 2);

		fs.change('/tmp/shared.drawio', {mtimeMs: 2}, {mtimeMs: 1});
		fs.change('/tmp/a.drawio', {mtimeMs: 2}, {mtimeMs: 1});

		assert.deepEqual(seen, ['b']);
		assert.equal(fs.listenerCount('/tmp/a.drawio'), 0);
		assert.deepEqual(watcher.watchedPaths(winA), []);
	});

	test('is a no-op for a window that never watched anything', () =>
	{
		const fs = fakeFs();
		const watcher = new FileWatcher(fs);

		assert.equal(watcher.unwatchAll(winA), 0);
		assert.equal(fs.unwatchCalls.length, 0);
	});

	test('leaves no listeners behind after every window closes', () =>
	{
		const fs = fakeFs();
		const watcher = new FileWatcher(fs);

		watcher.watch(winA, '/tmp/shared.drawio', () => {});
		watcher.watch(winB, '/tmp/shared.drawio', () => {});
		watcher.unwatchAll(winA);
		watcher.unwatchAll(winB);

		assert.equal(fs.listenerCount('/tmp/shared.drawio'), 0);
		assert.equal(watcher.watches.size, 0);
	});
});
