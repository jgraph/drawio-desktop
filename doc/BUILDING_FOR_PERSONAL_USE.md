# Building draw.io Desktop from a fork for personal use

draw.io Desktop is closed to code contributions, but it is GPL v3
licensed — you are free to fork it, make your own changes and build the
app for your own use.

This repository holds the application source and the Linux packaging,
published with each release. The official Windows and macOS installers
are built, signed and notarized from our internal repository, and their
packaging is not part of this one.

The build is yours: unofficial builds are not supported, so please don't
file issues against a modified build, and don't distribute your build to
others as if it were draw.io.

## 1. Fork and clone

Fork [jgraph/drawio-desktop](https://github.com/jgraph/drawio-desktop)
on GitHub, then clone **recursively** — the core editor is a git
submodule and the build fails without it:

```
git clone --recursive https://github.com/<your-username>/drawio-desktop.git
cd drawio-desktop
```

If you already cloned without `--recursive`, run
`git submodule update --init`.

You need [Node.js](https://nodejs.org/) 22.12 or later (the official
builds use Node 24) and npm.

## 2. Make your change

As a worked example, this change adds a suffix to every window title so
you can see at a glance that you are running your own build. In
[`src/main/electron.js`](../src/main/electron.js), find where the main
window is created (around line 442):

```js
	let mainWindow = new BrowserWindow(options)
	windowsRegistry.push(mainWindow)
```

and add after it:

```js
	mainWindow.on('page-title-updated', (event, title) =>
	{
		event.preventDefault();
		mainWindow.setTitle(title + ' (my build)');
	});
```

(The code style is tabs for indentation with opening braces on their
own line.)

## 3. Test the change without packaging

You don't need to build an installer to try a change:

```
npm install
npm start
```

runs the app directly from the source tree. Every window title should
now end in ` (my build)`. Set `DRAWIO_ENV=dev` to also open DevTools.

One gotcha: draw.io only allows a single running instance per user. If
the official app is already running, launching your copy just opens a
new window in the *official* app — without your change — so quit any
running draw.io first.

If your day-to-day usage is on the machine you develop on, you can even
stop here and just use `npm start` — packaging is only needed for a
normal installed app.

## 4. Build the Linux packages locally

First, sync the version and disable auto-update:

```
npm install
npm run sync -- disableUpdate
```

`sync` stamps the version from `drawio/VERSION` into `package.json`;
`disableUpdate` stops the app from auto-updating itself back to the
official (unmodified) release, which would silently undo your change.

Then build. Note this calls `electron-builder` directly — the
`npm run release-*` scripts are for CI and (apart from `release-snap`)
try to publish the result to GitHub releases. Output lands in `dist/`.


```
npx electron-builder --config electron-builder-linux-mac.json --linux AppImage deb --x64 --publish never
```

Swap in `rpm` or `--arm64` as needed; building the rpm target requires
the `rpm` package to be installed.

Note the official Linux packages (and the GitHub Actions workflow
below) set the product name to `drawio`, while a plain local build uses
`draw.io` — so a local deb/rpm installs *alongside* an official drawio
package rather than replacing it. To match the official naming, add
`"productName": "drawio"` to `electron-builder-linux-mac.json` before
building.

## 5. Or: build with GitHub Actions on your fork

If you don't have a Linux machine (or don't want to install the
toolchain), your fork can build in GitHub Actions using the
[`personal-build.yml`](../.github/workflows/personal-build.yml)
workflow. It needs no secrets, never publishes anything, and only runs
when you trigger it:

1. Commit your change and push it to your fork — Actions builds what is
   on GitHub, not your local working tree:

   ```
   git add -A
   git commit -m "my change"
   git push
   ```

2. On your fork's GitHub page, open the **Actions** tab and enable
   workflows (GitHub disables them on new forks until you confirm).
3. Select **Personal Unsigned Build** in the left sidebar and press
   **Run workflow**. In the dialog, make sure the *Use workflow from*
   branch is the one you pushed your change to, and run.
4. When the run finishes, download the packages from the
   **Artifacts** section of the run page.

## 6. Keeping your fork up to date

Commit your own changes first, and discard the files a build rewrites —
`npm run sync` regenerates `package.json`'s version and
`src/main/disableUpdate.js`, and git refuses to merge over them:

```
git checkout -- package.json src/main/disableUpdate.js
git remote add upstream https://github.com/jgraph/drawio-desktop.git
git fetch upstream
git merge upstream/dev
git submodule update --init
```

The last step moves the `drawio` submodule to the commit the desktop
app expects. Rebuild after updating.

Two version quirks to be aware of:

- Your build's version comes from `drawio/VERSION` in the public
  submodule, which can lag slightly behind the official desktop release
  built from our internal repository.
- This repository gets one commit per release, so `upstream/dev` only
  moves when a new version is published.
- Because auto-update is disabled, updating is always: pull, rebuild,
  reinstall.

## 7. Changing the editor rather than the app shell

Everything in this guide so far modifies the Electron shell
(`src/main/`). The diagram editor itself lives in the `drawio`
submodule, and local **builds** pack whatever is in your submodule
working tree — so for a local build you can simply edit files under
`drawio/src/main/webapp/` (for example `js/PreConfig.js`, which is
loaded before the editor and is the supported place for configuration
overrides).

For GitHub **Actions** builds the submodule is fetched fresh from
`jgraph/drawio`, so local submodule edits don't apply: you would need to
fork `drawio` too, push your editor change there, and point your
desktop fork's submodule at it (edit `.gitmodules` and commit a new
submodule reference).

## 8. Adding a plugin to your build

draw.io Desktop only runs the plugins that ship inside the app (the ones
listed in *Extras* → *Plugins*). It does not load plugin files from
anywhere else, and there is no flag or setting to turn that on. In your
own build you can ship your plugin inside the app instead, where it
loads like the built-in ones.

1. Save the plugin as `drawio/src/main/webapp/plugins/myplugin.js`.
2. Add these two lines to the end of
   `drawio/src/main/webapp/js/PostConfig.js`:

   ```js
   App.initPluginCallback();
   mxscript('plugins/myplugin.js');
   ```

3. Try it with `npm start` (section 3), then build as in section 4.

`PostConfig.js` runs after the editor code has loaded and before the
editor starts, so the plugin is in place before any diagram is shown,
including one opened by double-clicking a file. Code at the top level
of the plugin runs straight away, which is all a custom shape needs
(`mxCellRenderer.registerShape`). `App.initPluginCallback()` defines
`Draw.loadPlugin`, the usual plugin entry point, which calls back with
the editor once it is ready. For example, a plugin that registers a
shape named `mxgraph.example.box` can put it in the shape panel by
ending with:

```js
Draw.loadPlugin(function(ui)
{
	ui.sidebar.addPaletteFunctions('myshapes', 'My Shapes', true,
	[
		ui.sidebar.createVertexTemplateEntry('shape=mxgraph.example.box;whiteSpace=wrap;html=1;',
			200, 120, '', 'Box')
	]);
});
```

The plugin is always on and runs with the same access as the editor's
own code, so only add code you trust. The app's Content Security Policy
still applies to it: it cannot load scripts from outside the app or
fetch from other servers.

These are edits to the `drawio` submodule, so for a GitHub Actions
build they need to go into your own fork of `drawio` (section 7).
