About
----- 

**drawio-desktop** is a diagramming desktop app based on [Electron](https://electronjs.org/) that wraps the [core draw.io editor](https://github.com/jgraph/drawio).

Download built binaries from the [releases section](https://github.com/jgraph/drawio-desktop/releases).

**Can I use this app for free?** Yes, under the GPL v3 license. If you don't change the code and accept it is provided "as-is", you can use it for any purpose.

Windows installation
--------------------

Three flavours of Windows download are published on the [releases page](https://github.com/jgraph/drawio-desktop/releases):

- `draw.io-<version>-windows-installer.exe` — NSIS installer. Installs **per-machine** into `Program Files` and **requires administrator privileges**.
- `draw.io-<version>.msi` — MSI installer. Installs **per-user** into the user's profile and **does not require administrator privileges**. Use this one if you don't have admin rights on your machine.
- `draw.io-<version>-windows.zip` — portable build. Extract the zip anywhere and run `draw.io.exe`, with no installation (and therefore without admin rights). File-type associations are not registered.

The Microsoft Store (APPX) build is also installable per-user without admin rights via the Store.

### Windows on Arm

draw.io Desktop is built natively for Windows on Arm (ARM64) and is supported on Windows 11 ARM64 devices. Two native ARM64 downloads are published with every release:

- `draw.io-arm64-<version>-windows-arm64-installer.exe` — NSIS installer, per-machine, requires administrator privileges.
- `draw.io-arm64-<version>-windows-arm64-no-installer.exe` — portable build, no installation or admin rights needed.

The MSI and Microsoft Store builds are x64 only and run under emulation on ARM64 devices. ARM64 builds up to and including 31.4.4 were shipped with auto-update disabled; install a newer release manually once, after which the ARM64 installer build updates itself like x64.

Linux installation
------------------

If you manage AppImages with [AppImageLauncher](https://github.com/TheAssassin/AppImageLauncher), you need a 3.0 release of it (currently labelled beta). Since 31.4.2 the AppImage uses the static AppImage runtime so that it no longer depends on the end-of-life `libfuse2`, and AppImageLauncher 2.2.0, the last stable release, cannot load a static runtime. The app then fails to start with:

```
fuse: memory allocation failed
squashfuse 0.5.2 (c) 2012 Dave Vasilevsky
...
Can't open squashfs image: Bad address
```

Install a current AppImageLauncher from its [releases page](https://github.com/TheAssassin/AppImageLauncher/releases), which provides .deb packages, or uninstall AppImageLauncher altogether. It is not needed to run the AppImage. See [#2538](https://github.com/jgraph/drawio-desktop/issues/2538) for the detail.

Updates
-------

How draw.io Desktop updates depends on how it was installed:

- **Windows installer (`.exe`), macOS and AppImage:** new versions download in the background. When one is ready, the editor shows a notice, and clicking it or Help > Restart to Update installs it straight away. Otherwise it is installed when you quit draw.io. The Windows installer is per-machine, so the update asks for administrator rights.
- **MSI, Windows zip, Windows ARM64 portable, deb and rpm:** draw.io tells you when a new version is available and links to its release page. Install it the same way as the current one.
- **Microsoft Store, Snap and Flatpak:** the store updates the app, and draw.io does not check for updates.

Extras > Automatic Updates (draw.io > Check for Updates Automatically on macOS) turns the background checks off. Help > Check for Updates still works. For centrally managed installs, set the `DRAWIO_DISABLE_UPDATE=true` environment variable or pass `--disable-update` to turn off all update checks, or set `DRAWIO_NO_SILENT_UPDATE=true` or pass `--no-silent-update` so that draw.io asks before it downloads an update.

Security
--------

draw.io Desktop is designed to be completely isolated from the Internet, apart from the update process. This checks github.com once a day for a newer version and downloads it from an AWS S3 bucket owned by Github. To disable the update check entirely (e.g. for centrally-managed installs), set the `DRAWIO_DISABLE_UPDATE=true` environment variable or pass `--disable-update` on launch. All JavaScript files are self-contained, the Content Security Policy forbids running remotely loaded JavaScript.

No diagram data is ever sent externally, nor do we send any analytics about app usage externally. The Content Security Policy on the web part of the interface forbids remotely-loaded JavaScript and restricts the application's own network connections to itself, so the app cannot transmit your diagrams or otherwise phone home. Note that a diagram can reference external media - for example an image, background or font loaded from a URL embedded in the diagram - and these are fetched when the diagram is opened so that it renders correctly. Opening a diagram from an untrusted source may therefore trigger a request to the referenced URL, which can reveal metadata such as your IP address to that server; no diagram content is transmitted.

Security and isolating the app are the primarily objectives of draw.io desktop. If you ask for anything that involves external connections enabled in the app by default, the answer will be no.

Support
-------

Support is provided on a reasonable business constraints basis, but without anything contractually binding. All support is provided via this repo. There is no private ticketing support for non-paying users.

Purchasing draw.io for Confluence or Jira does not entitle you to commercial support for draw.io desktop.

Developing
----------

**draw.io** is a git submodule of **drawio-desktop**. To get both you need to clone recursively:

`git clone --recursive https://github.com/jgraph/drawio-desktop.git`

To run this:
1. `npm install` (in the root directory of this repo)
2. [internal use only] export DRAWIO_ENV=dev if you want to develop/debug in dev mode.
3. `npm start` _in the root directory of this repo_ runs the app. For debugging, use `npm start --enable-logging`.

Note: If a symlink is used to refer to drawio repo (instead of the submodule), then symlink the `node_modules` directory inside `drawio/src/main/webapp` also.

To fork the project, make your own changes and build an (unsigned) app for personal use, see [doc/BUILDING_FOR_PERSONAL_USE.md](doc/BUILDING_FOR_PERSONAL_USE.md).

The release process (GitHub Actions builds, signing and publishing) is described in [doc/RELEASE_PROCESS.md](doc/RELEASE_PROCESS.md).

Local Storage and Session Storage is stored in the AppData folder:

- macOS: `~/Library/Application Support/draw.io`
- Windows: `C:\Users\<USER-NAME>\AppData\Roaming\draw.io\`

Not open-contribution
---------------------

draw.io is closed to contributions (unless a maintainer permits it, which is extremely rare).

The level of complexity of this project means that even simple changes 
can break a _lot_ of other moving parts. The amount of testing required 
is far more than it first seems. If we were to receive a PR, we'd have 
to basically throw it away and write it how we want it to be implemented.

We are grateful for community involvement, bug reports, & feature requests. We do
not wish to come off as anything but welcoming, however, we've
made the decision to keep this project closed to contributions for 
the long term viability of the project.
