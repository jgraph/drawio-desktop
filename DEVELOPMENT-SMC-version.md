# Development Notes for Drawio Desktop SMC Version

Basic repos are:
* https://github.com/Systems-Modeling/drawio-desktop-SMC forked from https://github.com/jgraph/drawio-desktop
* https://github.com/Systems-Modeling/drawio-SMC forked from https://github.com/jgraph/drawio

> Note: The most recent release from jgraph that can be used is `v24.7.17` (dated 2024-10-01). Later releases 
do not contain anymore the human-readable source code of important modules, in particular module 
`drawio/src/webapp/js/diagramly module`. Rather they only contain obfuscated, minified `.min.js` files.

The working branch is named `SMC`.

The version is postfixed with `-SMC` as in `24.7.17-SMC`. The version identifier should be present in files `drawio/VERSION` and `package.json`.

## Development environment on Windows 11

### Preparations

* It is recommended to use the Jetbrains WebStorm IDE.
* Install `node` and `npm` following the instructions from https://nodejs.org/en/download
  * Select `node v22.16.0 (LTS)` with `npm`
* Ensure that the correct versions of node and npm are running, e.g.,
  ```
  $ node --version
  v22.16.0
  $ npm --version
  10.9.2
  ```

### Development Environment Setup

1. Open a Windows CMD Terminal and `cd` to the directory for development.
2. Clone repo `drawio-desktop-SMC` as follows:
    ```
    git clone --recursive https://github.com/Systems-Modeling/drawio-desktop-SMC
    ```
   Note: This contains submodule `drawio` cloned from https://github.com/Systems-Modeling/drawio-SMC .
3. Open 
4. `cd` to the root directory of the cloned repo.
5. In order to get the correct version of `node` and `npm` start Webstorm from the terminal:
    ```
    webstorm .
    ```
6. Check that file `.gitmodules` has the following content:
   ```
   [submodule "drawio"]
       path = drawio
       url = https://github.com/Systems-Modeling/drawio-SMC.git
       branch = SMC
   ```
7. Open a terminal inside Webstorm and install all needed node modules:
   ```
   npm install
   ```

### Developing and Testing

1. Set environment variables as follows:
   ```
   set DRAWIO_ENV=dev
   set DRAWIO_DISABLE_UPDATE=true
   ```
2. Edit source files as needed
3. Run an interactive test with the electron app
   ```
   npm start --enable-logging
   ```

### Building an Installer for the Drawio Desktop App

1. Check that `ant` is installed:
   ```
   $ ant -version
   Apache Ant(TM) version 1.10.15 compiled on August 25 2024
   ```
2. If not, get `ant` from https://ant.apache.org/ and install it
3. In MS or WebStorm Terminal, build minified `.min.js` scripts
   ```
   cd drawio/etc/build
   ant app
   ```
4. Build release(s)
   ```
   npm release-win
   ```
   Note: See `package.json` under `scripts:` for available release build scripts.
