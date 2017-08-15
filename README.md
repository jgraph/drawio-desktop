# drawio-desktop

draw.io desktop app based on Electron

[![Build Status](https://travis-ci.org/jgraph/drawio-desktop.svg?branch=master)](https://travis-ci.org/jgraph/drawio-desktop)

[![Build status](https://ci.appveyor.com/api/projects/status/e56wdssukquwe7bv?svg=true)](https://ci.appveyor.com/project/davidjgraph/drawio-desktop)

### Prepare

Run 
`yarn install`
`yarn appdeps`

### Running

Generic devmode: `yarn start`
    
Mxgraph development: `yarn startmx`
    
### Logs    

By default it writes logs to the following locations:

on Linux: ~/.config/<app name>/log.log
on OS X: ~/Library/Logs/<app name>/log.log
on Windows: %USERPROFILE%\AppData\Roaming\<app name>\log.log