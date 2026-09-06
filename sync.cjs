const fs = require('fs')
const path = require('path')

const appjsonpath = path.join(__dirname, 'package.json')
const disableUpdatePath = path.join(__dirname, 'src/main', 'disableUpdate.js')
const updateChannelPath = path.join(__dirname, 'src/main', 'updateChannel.js')
const versionPath = path.join(__dirname, 'drawio', 'VERSION')

if (!fs.existsSync(versionPath))
{
	console.error('Error: drawio/VERSION not found. Did you clone with --recursive or run git submodule update --init?')
	process.exit(1)
}

let ver = fs.readFileSync(versionPath, 'utf8').trim()
//let ver = '14.1.5' // just to test autoupdate

if (!/^\d+\.\d+\.\d+$/.test(ver))
{
	console.error('Error: drawio/VERSION contains invalid version: "' + ver + '"')
	process.exit(1)
}

let pj = require(appjsonpath)

pj.version = ver

fs.writeFileSync(appjsonpath, JSON.stringify(pj, null, 2), 'utf8')
const flags = process.argv.slice(2)

//Enable/disable updates
fs.writeFileSync(disableUpdatePath, 'export function disableUpdate() { return ' + (flags.indexOf('disableUpdate') !== -1? 'true' : 'false') + ';}', 'utf8');
//Update channel. The libfuse2 AppImage variant tracks its own channel so the two
//AppImage builds never auto-update onto each other [jgraph/drawio-desktop#2538]
fs.writeFileSync(updateChannelPath, 'export function updateChannel() { return \'' + (flags.indexOf('legacy') !== -1? 'legacy' : 'latest') + '\';}', 'utf8');
