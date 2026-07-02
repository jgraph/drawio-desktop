# Building draw.io Desktop from a fork for personal use

draw.io Desktop is closed to code contributions, but it is Apache 2.0
licensed — you are free to fork it, make your own changes and build the
app for your own use.

The official binaries are produced by our GitHub Actions release
workflows, which code-sign and notarize using private infrastructure
(Apple Developer certificates, Azure Trusted Signing, a private
`drawio-dev` repository). None of that is available to a fork, so
personal builds are **unsigned**. The build supports this with an
explicit opt-in: setting the environment variable

```
DRAWIO_UNSIGNED=true
```

skips code signing and notarization. Setting it is your agreement that:

- Your operating system will warn about (or block) the unsigned app —
  macOS Gatekeeper and Windows SmartScreen exist for good reasons, and
  you are choosing to bypass them for a build you made yourself.
- The build is yours: unofficial builds are not supported, so please
  don't file issues against a modified build, and don't distribute your
  build to others as if it were draw.io.

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
now end in ` (my build)`. Set `DRAWIO_ENV=dev` (PowerShell:
`$env:DRAWIO_ENV="dev"`) to also open DevTools.

One gotcha: draw.io only allows a single running instance per user. If
the official app is already running, launching your copy just opens a
new window in the *official* app — without your change — so quit any
running draw.io first.

If your day-to-day usage is on the machine you develop on, you can even
stop here and just use `npm start` — packaging is only needed for a
normal installed app.

## 4. Build an installer locally

First, on any platform, sync the version and disable auto-update:

```
npm install
npm run sync -- disableUpdate
```

`sync` stamps the version from `drawio/VERSION` into `package.json`;
`disableUpdate` stops the app from auto-updating itself back to the
official (unmodified) release, which would silently undo your change.

Then build for your platform. Note these commands call `electron-builder`
directly — the `npm run release-*` scripts are for CI and (apart from
`release-snap`) try to publish the result to GitHub releases. Output
lands in `dist/`.

### macOS

```
DRAWIO_UNSIGNED=true CSC_IDENTITY_AUTO_DISCOVERY=false npx electron-builder --config electron-builder-linux-mac.json --mac dmg --arm64 --publish never
```

Use `--x64` on an Intel Mac. To build the full official set (zip for
x64 + arm64, dmg for x64 + arm64 + universal — considerably slower),
drop `--mac dmg --arm64` from the command entirely: targets given on
the command line *replace* the ones in the config file, so only the
bare command picks up the config's target list.
`CSC_IDENTITY_AUTO_DISCOVERY=false` stops electron-builder searching
your keychain for a signing certificate.

The resulting app is ad-hoc signed. It opens normally on the machine
that built it. If you copy it to *another* Mac (or download it from a
GitHub Actions run, see below), Gatekeeper quarantines it and typically
reports it as "damaged" — after copying it to `/Applications`, clear
the quarantine flag once:

```
xattr -cr /Applications/draw.io.app
```

The Quick Look preview extension is included and ad-hoc signed, but
macOS may decline to load unsigned app extensions; treat Quick Look as
unsupported in personal builds.

### Windows

In PowerShell:

```
$env:DRAWIO_UNSIGNED="true"
npx electron-builder --config electron-builder-win.json --publish never
```

or in cmd.exe:

```
set DRAWIO_UNSIGNED=true
npx electron-builder --config electron-builder-win.json --publish never
```

The variable only lives for the current terminal session — if you open
a new terminal, set it again (a missing `DRAWIO_UNSIGNED` fails with an
error about a "Trusted Signing dlib").

This produces the NSIS installer and the MSI. SmartScreen will warn
when you run the installer ("Windows protected your PC") — choose
*More info* → *Run anyway*. Note the NSIS installer installs
per-machine, so it will replace an existing official installation.

### Linux

```
npx electron-builder --config electron-builder-linux-mac.json --linux AppImage deb --x64 --publish never
```

Linux binaries are not signed, so `DRAWIO_UNSIGNED` is not required
(but harmless). Swap in `rpm` or `--arm64` as needed; building the rpm
target requires the `rpm` package to be installed.

Note the official Linux packages (and the GitHub Actions workflow
below) set the product name to `drawio`, while a plain local build uses
`draw.io` — so a local deb/rpm installs *alongside* an official drawio
package rather than replacing it. To match the official naming, add
`"productName": "drawio"` to `electron-builder-linux-mac.json` before
building.

## 5. Or: build with GitHub Actions on your fork

If you don't have a machine for the platform you want (or don't want to
install the toolchain), your fork can build in GitHub Actions using the
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
   branch is the one you pushed your change to, pick the platform, and
   run.
4. When the run finishes, download the installers from the
   **Artifacts** section of the run page.

The same unsigned-build caveats apply; in particular a macOS `.dmg`
downloaded from GitHub is always quarantined, so expect to need the
`xattr -cr` step above.

The tag-triggered release workflows (`electron-builder.yml`,
`electron-builder-win.yml`) cannot work on a fork — they need the
private `drawio-dev` repository and signing secrets. They only run if
you push a `v*` tag, so simply don't do that (or delete them from your
fork).

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
