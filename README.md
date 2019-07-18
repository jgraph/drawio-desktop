About
----- 

**drawio-desktop** is a **draw.io** desktop app based on [Electron](https://electronjs.org/).

Download built binaries from the [releases section](https://github.com/jgraph/drawio-desktop/releases).

Security
--------

draw.io Desktop is designed to be completely isolated from the Internet. All JavaScript files are self-contained, the Content Security Policy forbids running remotely loaded JavaScript.

No diagram data is ever sent externally, none do we send any analtics about app usage externally. This means certain functionality that we do not have a JavaScript implementation of do not work in the Desktop build, namely .vsd and Gliffy import.

[![Build Status](https://travis-ci.org/jgraph/drawio-desktop.svg?branch=master)](https://travis-ci.org/jgraph/drawio-desktop)

[![Build status](https://ci.appveyor.com/api/projects/status/e56wdssukquwe7bv?svg=true)](https://ci.appveyor.com/project/davidjgraph/drawio-desktop)

**draw.io** is a git submodule of **drawio-desktop**. To get both you need to clone recursively:

`git clone --recursive https://github.com/jgraph/drawio-desktop.git`

To run this:
1. npm install (in the root directory of this repo)
2. npm install (in the drawio directory of this repo)
3. export NODE_ENV=development if you want to develop/debug in dev mode.
4. If you run in dev mode, clone https://github.com/jgraph/mxgraph as a sibling directory to this repo, rename the folder containing the repo "mxgraph2".
5. npm start runs the app.

To release:
1. Update the draw.io sub-module and push the change
2. Wait for the builds to complete (https://travis-ci.org/jgraph/drawio-desktop and https://ci.appveyor.com/project/davidjgraph/drawio-desktop)
3. Go to https://github.com/jgraph/drawio-desktop/releases, edit the preview release.
4. Download the windows exe and windows portable, sign them using signtool sign /a /tr http://timestamp.globalsign.com/?signature=sha2 /td SHA256 c:/path/to/your/file.exe
5. Re-upload signed file as draw.io-windows-installer-x.y.z.exe and draw.io-windows-no-installer-x.y.z.exe
6. Add release notes
7. Publish release



![draw.io desktop app](screenshot.png)

**draw-io desktop** uses [draw-io](https://github.com/jgraph/drawio). draw.io uses the [mxGraph library](https://github.com/jgraph/mxgraph) as the base of the stack, with the [GraphEditor example](https://github.com/jgraph/mxgraph/tree/master/javascript/examples/grapheditor) from mxGraph as the base of the application part. 

![Dependency Diagram](dependency-diagram.png)
[Edit this image](https://www.draw.io/#Hjgraph%2Fdrawio-desktop%2Fmaster%2Fdependency-diagram.png)
