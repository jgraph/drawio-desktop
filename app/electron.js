const fs = require('fs')
const path = require('path')
const url = require('url')
const electron = require('electron')
const ipcMain = electron.ipcMain
const dialog = electron.dialog
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const log = require('electron-log')

let autoUpdater = null

const __DEV__ = process.env.NODE_ENV === 'development'
const __MXDEV__ = process.env.NODE_MXDEV === 'on'

if (!__DEV__) {
	// you cannot update in devmode
	autoUpdater = require('electron-updater').autoUpdater
	if (autoUpdater) setupAutoUpdater()
}

let windowsRegistry = []

function createWindow (opt = {}) {
	const electronScreen = electron.screen
	const WIN_PADDING = 80
	let size = electronScreen.getPrimaryDisplay().workAreaSize
	let aspect = size.width / size.height

	let options = Object.assign({
		width: ~~Math.max(980, size.width - WIN_PADDING * aspect),
		height: ~~Math.max(760, size.height - WIN_PADDING),
		'web-security': false,
		webPreferences: {
			// preload: path.resolve('./preload.js'),
			// partition: 'persist:ui',
		},
	}, opt)

	let mainWindow = new BrowserWindow(options)
	windowsRegistry.push(mainWindow)

	console.log('createWindow', opt)

	let pathname = path.join(__dirname, 'war', 'index.html')
	if (__DEV__) {
		pathname = path.join(__dirname, '..', 'draw.io', 'war', 'index.html')
	}

	console.log('Starting drawio via:', pathname)

	let wurl = url.format({
		pathname,
		protocol: 'file:',
		query: {
			'dev': __MXDEV__ ? 1 : 0,
			'test': __DEV__ ? 1 : 0,
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

	// and load the index.html of the app.
	mainWindow.loadURL(wurl)

	// Open the DevTools.
	if (__DEV__ || __MXDEV__) {
		mainWindow.webContents.openDevTools()
	}

	mainWindow.on('close', (event/*:WindowEvent*/) => {
		const win = event.sender
		const index = windowsRegistry.indexOf(win)
		console.log('Window on close idx:%d', index)
		const contents = win.webContents
		if (contents) {
			contents.executeJavaScript(`typeof global.__emt_isModified === "function" 
			? global.__emt_isModified()
			: false`, true,
				isModified => {
					console.log('__emt_isModified', isModified)
					if (isModified) {
						const choice = dialog.showMessageBox(
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
	checkUpdate()
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
	if (!autoUpdater) return false
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
		log.info('@checkForUpdates update-downloaded@\n', a, b)
	}).catch(e => {
		log.error('@checkForUpdates catch error@\n', e)
	})
}

function setupAutoUpdater () {
	autoUpdater.logger = log
	autoUpdater.logger.transports.file.level = 'info'
	autoUpdater.autoDownload = true

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
}