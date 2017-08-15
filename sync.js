const fs = require('fs')
const path = require('path')
const child_process = require('child_process')

const electronAppDir = path.join(__dirname, 'app')
const appjsonpath = path.join(electronAppDir, 'package.json')

try {
	let ver = fs.readFileSync(path.join(__dirname, 'draw.io', 'VERSION'), 'utf8')
// let ver = '6.4.3' // just to test autoupdate

	let pj = require(appjsonpath)
	pj.version = ver
	fs.writeFileSync(appjsonpath, JSON.stringify(pj, null, 2), 'utf8')
	console.log(`App version successfully updated: ${ver}`)
} catch (err) {
	console.error(`Problem updating app version`, err)
}

const res = child_process.spawnSync('yarn', ['install', '--production'], {
	cwd: electronAppDir,
	stdio: 'pipe',
	shell: true,
})

console.log(`App dir: ${electronAppDir}`)

if (res.error) {
	console.error('sub:', res.stderr && res.stderr.toString())
} else {
	console.log('sub:', res.stdout && res.stdout.toString())
}

process.exit(res.status)