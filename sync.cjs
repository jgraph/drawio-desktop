const fs = require('fs')
const path = require('path')

const appjsonpath = path.join(__dirname, 'package.json')
const disableUpdatePath = path.join(__dirname, 'src/main', 'disableUpdate.js')

let ver = fs.readFileSync(path.join(__dirname, 'drawio', 'VERSION'), 'utf8')
//let ver = '14.1.5' // just to test autoupdate

let pj = require(appjsonpath)

pj.version = ver

fs.writeFileSync(appjsonpath, JSON.stringify(pj, null, 2), 'utf8')
//Enable/disable updates
fs.writeFileSync(disableUpdatePath, 'export function disableUpdate() { return ' + (process.argv[2] == 'disableUpdate'? 'true' : 'false') + ';}', 'utf8');
