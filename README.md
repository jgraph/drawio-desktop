About
----- 

**drawio-desktop** is a diagramming desktop app based on [Electron](https://electronjs.org/) that wraps the [core draw.io editor](https://github.com/jgraph/drawio).

Download built binaries from the [releases section](https://github.com/jgraph/drawio-desktop/releases).

**Can I use this app for free?** Yes, under the apache 2.0 license. If you don't change the code and accept it is provided "as-is", you can use it for any purpose.

Windows installation
--------------------

Three flavours of Windows download are published on the [releases page](https://github.com/jgraph/drawio-desktop/releases):

- `draw.io-<version>-windows-installer.exe` — NSIS installer. Installs **per-machine** into `Program Files` and **requires administrator privileges**.
- `draw.io-<version>.msi` — MSI installer. Installs **per-user** into the user's profile and **does not require administrator privileges**. Use this one if you don't have admin rights on your machine.
- `draw.io-<version>-windows-no-installer.exe` — portable build that runs without any installation (and therefore without admin rights). File-type associations are not registered.

The Microsoft Store (APPX) build is also installable per-user without admin rights via the Store.

Security
--------

draw.io Desktop is designed to be completely isolated from the Internet, apart from the update process. This checks github.com at startup for a newer version and downloads it from an AWS S3 bucket owned by Github. To disable the update check entirely (e.g. for centrally-managed installs), set the `DRAWIO_DISABLE_UPDATE=true` environment variable or pass `--disable-update` on launch. All JavaScript files are self-contained, the Content Security Policy forbids running remotely loaded JavaScript.

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

To release:
1. Update the draw.io sub-module and push the change. Add version tag before pushing to origin.
2. Wait for the builds to complete (https://travis-ci.org/jgraph/drawio-desktop and https://ci.appveyor.com/project/davidjgraph/drawio-desktop)
3. Go to https://github.com/jgraph/drawio-desktop/releases, edit the preview release.
4. Download the windows exe and windows portable, sign them using `signtool sign /a /tr http://rfc3161timestamp.globalsign.com/advanced /td SHA256 c:/path/to/your/file.exe`
5. Re-upload signed file as `draw.io-windows-installer-x.y.z.exe` and `draw.io-windows-no-installer-x.y.z.exe`
6. Add release notes
7. Publish release

*Note*: In Windows release, when using both x64 and is32 as arch, the result is one big file with both archs. This is why we split them.

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
