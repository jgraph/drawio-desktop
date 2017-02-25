const fs = require('fs')
const path = require('path')
let appjsonpath = path.resolve(__dirname, 'draw.io', 'war', 'package.json')

let ver = fs.readFileSync(path.resolve(__dirname, 'draw.io', 'VERSION'), 'utf8')

let pj = require(appjsonpath)

pj.version = ver

fs.writeFileSync(appjsonpath, JSON.stringify(pj), 'utf8')

