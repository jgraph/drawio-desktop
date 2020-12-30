const fs = require('fs')
const path = require('path')
const child_process = require('child_process')

const electronAppDir = path.join(__dirname, 'drawio', 'src/main/webapp')
const appjsonpath = path.join(__dirname, 'drawio', 'src/main/webapp', 'package.json')
const disableUpdatePath = path.join(__dirname, 'drawio', 'src/main/webapp', 'disableUpdate.js')

let ver = fs.readFileSync(path.join(__dirname, 'drawio', 'VERSION'), 'utf8')
//let ver = '14.1.5' // just to test autoupdate

let pj = require(appjsonpath)

pj.version = ver

fs.writeFileSync(appjsonpath, JSON.stringify(pj, null, 2), 'utf8')

if (process.argv[2] == 'disableUpdate')
{
	fs.writeFileSync(disableUpdatePath, 'module.exports = { disableUpdate: function() { return true;}}', 'utf8');
}

child_process.spawnSync('yarn', ['install', '--production'], {cwd: electronAppDir})
