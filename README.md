# drawio-desktop

draw.io desktop app based on Electron

[![Build Status](https://travis-ci.org/jgraph/drawio-desktop.svg?branch=master)](https://travis-ci.org/jgraph/drawio-desktop)

[![Build status](https://ci.appveyor.com/api/projects/status/e56wdssukquwe7bv?svg=true)](https://ci.appveyor.com/project/davidjgraph/drawio-desktop)

To run this:
1. npm install (in the root directory of this repo)
2. export NODE_ENV=development
3. npm start

To release:
1. Update the draw.io sub-module and push the change
2. Wait for the builds to complete (https://travis-ci.org/jgraph/drawio-desktop and https://ci.appveyor.com/project/davidjgraph/drawio-desktop)
3. Go to https://github.com/jgraph/drawio-desktop/releases, edit the preview release and publish it.