About
----- 

**drawio-desktop** is a **draw.io** desktop app based on [Electron](https://electronjs.org/)

[![Build Status](https://travis-ci.org/jgraph/drawio-desktop.svg?branch=master)](https://travis-ci.org/jgraph/drawio-desktop)

[![Build status](https://ci.appveyor.com/api/projects/status/e56wdssukquwe7bv?svg=true)](https://ci.appveyor.com/project/davidjgraph/drawio-desktop)

**draw.io** is a git submodule of **drawio-desktop**. To get both you need to clone recursively:

`git clone --recursive https://github.com/jgraph/drawio-desktop.git`

To run this:
1. npm install (in the root directory of this repo)
2. npm install (in the drawio directory of this repo)
3. export NODE_ENV=development if you want to develop/debug in dev mode.
4. If you run in dev mode, clone https://github.com/jgraph/mxgraph as a sibling directory to this repo, rename the folder containing the repo "mxgraph2".
5. If you want to load a hosted version of draw.io into a browser window, while in dev mode, you must server that version via https, since Electron 5. At https://github.com/jgraph/drawio/blob/e942b08a3bc2203c98659756b3338d9e0d57085b/src/main/webapp/electron.js#L39 change "test.draw.io" to the site where you host it. If you need an easy way to serve a locally hosted draw.io via https, try [ngrok](https://ngrok.com/).
6. If you want to bundle the draw.io version within the app and not load a hosted version, remove the load at https://github.com/jgraph/drawio/blob/e942b08a3bc2203c98659756b3338d9e0d57085b/src/main/webapp/electron.js#L57 and replace it with the URL load up to and including https://github.com/jgraph/drawio/blob/e942b08a3bc2203c98659756b3338d9e0d57085b/src/main/webapp/electron.js#L57.
7. npm start runs the app.

To release:
1. Update the draw.io sub-module and push the change
2. Wait for the builds to complete (https://travis-ci.org/jgraph/drawio-desktop and https://ci.appveyor.com/project/davidjgraph/drawio-desktop)
3. Go to https://github.com/jgraph/drawio-desktop/releases, edit the preview release and publish it.



![draw.io desktop app](screenshot.png)

**draw-io desktop** uses [draw-io](https://github.com/jgraph/drawio). draw.io uses the [mxGraph library](https://github.com/jgraph/mxgraph) as the base of the stack, with the [GraphEditor example](https://github.com/jgraph/mxgraph/tree/master/javascript/examples/grapheditor) from mxGraph as the base of the application part. 

![Dependency Diagram](dependency-diagram.png)
[Edit this image](https://www.draw.io/#Hjgraph%2Fdrawio-desktop%2Fmaster%2Fdependency-diagram.png)
