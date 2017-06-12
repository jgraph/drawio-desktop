const fs = require('fs')
const path = require('path')
const url = require('url')
const electron = require('electron')
const ipcMain = electron.ipcMain
const dialog = electron.dialog
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const autoUpdater = require('electron-updater').autoUpdater
const log = require('electron-log')
autoUpdater.logger = log
autoUpdater.logger.transports.file.level = 'info'
// autoUpdater.autoDownload = false
autoUpdater.autoDownload = true
const process = require('process');
process.chdir('draw.io/war');
__dirname = __dirname + '/draw.io/war';

const __DEV__ = process.env.NODE_ENV === 'development'

let windowsRegistry = []

function createWindow (opt = {}) {
	let options = Object.assign({
		width: 1600,
		height: 1200,
		'web-security': false,
		webPreferences: {
			// preload: path.resolve('./preload.js'),
		},
	}, opt)

	let mainWindow = new BrowserWindow(options)
	windowsRegistry.push(mainWindow)

	console.log('createWindow', opt)

	let wurl = url.format({
		pathname: `${__dirname}/index.html`,
		protocol: 'file:',
		query: {
			'dev': __DEV__ ? 1 : 0,
			'test': 1,
			'db': 0,
			'gapi': 0,
			'od': 0,
			'gh': 0,
			'analytics': 0,
			'picker': 0,
			'mode': 'device',
			'browser': 0,
			'p': 'electron',
		},
		slashes: true,
	})

//`file://${__dirname}/index.html?dev=1&test=1&db=0&gapi=0&od=0&analytics=0&picker=0&mode=device&browser=0&p=electron`
	// and load the index.html of the app.
	mainWindow.loadURL(wurl)

	// Open the DevTools.
	mainWindow.webContents.openDevTools()

	mainWindow.on('close', (event/*:WindowEvent*/) => {
		const win = event.sender
		const index = windowsRegistry.indexOf(win)
		console.log('Window on close idx:%d', index)
		const contents = win.webContents
		if (contents != null) {
			contents.executeJavaScript(`global.__emt_isModified()`, true,
				isModified => {
					console.log('__emt_isModified', isModified)
					if (isModified) {
						var choice = dialog.showMessageBox(
							win,
							{
								type: 'question',
								buttons: ['Cancel', 'Discard Changes'],
								title: 'Confirm',
								message: 'The document has unsaved changes. Do you really want to quit without saving?' //mxResources.get('allChangesLost')
							})
						if (choice === 1) {
							win.destroy()
						}
					} else {
						win.destroy()
					}
				})
			event.preventDefault()
		}
	})

	// Emitted when the window is closed.
	mainWindow.on('closed', (event/*:WindowEvent*/) => {
		const index = windowsRegistry.indexOf(event.sender)
		console.log('Window closed idx:%d', index)
		windowsRegistry.splice(index, 1)
	})

	return mainWindow.id
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', e => {
	//asynchronous
	ipcMain.on('asynchronous-message', (event, arg) => {
		console.log(arg)  // prints "ping"
		event.sender.send('asynchronous-reply', 'pong')
	})
	//synchronous
	ipcMain.on('winman', (event, arg) => {
		console.log('ipcMain.on winman', arg)
		if (arg.action === 'newfile') {
			event.returnValue = createWindow(arg.opt)
			return
		}
		event.returnValue = 'pong'
	})
	createWindow()
	// checkUpdate()
	if (!__DEV__)
	{
		autoUpdater.checkForUpdates()
	}
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
	console.log('window-all-closed', windowsRegistry.length)
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', function () {
	console.log('app on activate', windowsRegistry.length)
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (windowsRegistry.length === 0) {
		createWindow()
	}
})

function checkUpdate () {
	autoUpdater.checkForUpdates().then(UpdateCheckResult => {
		if (UpdateCheckResult) {
			let idx = dialog.showMessageBox({
				type: 'question',
				buttons: ['Ok', 'Cancel'],
				title: 'Confirm Update',
				message: 'Update available.\n\nWould you like to download and install new version?',
				detail: 'Application will automatically restart to apply update after download',
			})
			if (idx === 0) return autoUpdater.downloadUpdate()
		}
	}).then((a, b) => {
		log.info('@cfu update-downloaded@\n', a, b)
	}).catch(e => {
		log.error('@cfu then error@\n', e)
	})
}

autoUpdater.on('error', e => log.error('@error@\n', e))

autoUpdater.on('update-available',
	(a, b) => log.info('@update-available@\n', a, b))

/**/
autoUpdater.on('update-downloaded', (event, info) => {
	log.info('@update-downloaded@\n', info, event)
	// Ask user to update the app
	dialog.showMessageBox({
		type: 'question',
		buttons: ['Install and Relaunch', 'Later'],
		defaultId: 0,
		message: 'A new version of ' + app.getName() + ' has been downloaded',
		detail: 'It will be installed the next time you restart the application',
	}, response => {
		if (response === 0) {
			setTimeout(() => autoUpdater.quitAndInstall(), 1)
		}
	})
})
/**/