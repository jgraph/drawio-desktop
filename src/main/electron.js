import fs from 'fs';
import { promises as fsProm } from 'fs';
import path from 'path';
import url from 'url';
import {Menu as menu, shell, dialog, session, screen, 
		clipboard, nativeImage, ipcMain, app, BrowserWindow} from 'electron';
import crc from 'crc';
import zlib from 'zlib';
import log from'electron-log';
import { parseDrawioArgs, formatHelp, validFormatRegExp as validFormatRegExpImport } from './args.js';
import elecUpPkg from 'electron-updater';
const {autoUpdater} = elecUpPkg;
import {PDFDocument} from '@cantoo/pdf-lib';
import Store from 'electron-store';
import ProgressBar from './progress-bar.js';
import contextMenu from 'electron-context-menu';
import {spawn, exec} from 'child_process';
import {disableUpdate as disUpPkg} from './disableUpdate.js';

let store;

try
{
	store = new Store();
}
catch (e)
{
	console.error('Failed to initialize electron-store:', e);
	store = null;
}

// One-shot migration: detect whether this is a fresh install or an update,
// so we can seed the drawio Configuration's defaultAdaptiveColors accordingly.
// 'auto' for fresh installs (matches drawio.com behaviour), 'simple' for
// updates (preserves what desktop users have been seeing historically).
// Returns 'auto' / 'simple' / 'none' on the first launch with this code,
// null on every subsequent launch. Safe to call before app.whenReady().
function detectInitialAdaptiveColorsDefault()
{
	if (store == null) return null;

	const MIGRATION_KEY = 'adaptiveColorsDefaultMigrated';

	if (store.get(MIGRATION_KEY)) return null;

	let hadPriorState = store.size > 0;

	if (!hadPriorState)
	{
		try
		{
			const lsPath = path.join(app.getPath('userData'), 'Local Storage', 'leveldb');
			hadPriorState = fs.existsSync(lsPath) && fs.readdirSync(lsPath).length > 0;
		}
		catch (e)
		{
			// If we can't read userData for any reason, fall through and treat
			// as a fresh install. The preload guard won't overwrite an existing
			// explicit user choice, so this is safe.
		}
	}

	const mode = hadPriorState ? 'simple' : 'auto';
	store.set(MIGRATION_KEY, app.getVersion());
	return mode;
}

const disableUpdate = disUpPkg() ||
						process.env.DRAWIO_DISABLE_UPDATE === 'true' ||
						process.argv.indexOf('--disable-update') !== -1 ||
						fs.existsSync('/.flatpak-info'); //This file indicates running in flatpak sandbox
const silentUpdate = !disableUpdate && (process.env.DRAWIO_NO_SILENT_UPDATE !== 'true' &&
										process.argv.indexOf('--no-silent-update') === -1); // Defaults to silent update if not disabled explicitly
let manualUpdateCheck = false; // Set when the user clicks "Check for updates" so the manual flow stays interactive even when silentUpdate is on
autoUpdater.logger = log
autoUpdater.logger.transports.file.level = 'error'
autoUpdater.logger.transports.console.level = 'error'
// autoDownload is always false: we trigger downloadUpdate() explicitly so silent vs. interactive paths can branch on manualUpdateCheck
autoUpdater.autoDownload = false
autoUpdater.autoInstallOnAppQuit = silentUpdate

const UPDATE_DOWNLOAD_URL = 'https://get.draw.io';
let updateFailureDialogShown = false;

// Shows a user-facing fallback message when the in-app updater fails for any reason.
// Deduped within a short window so a single underlying failure (which can fan out into
// both a sync throw and an 'error' event) doesn't produce stacked dialogs.
function notifyUpdateFailure(err, context)
{
	manualUpdateCheck = false;

	try { log.error('Update failure (' + (context || 'unknown') + '):', err); }
	catch (e) { /* swallow logger errors */ }

	if (updateFailureDialogShown) return;
	updateFailureDialogShown = true;
	setTimeout(() => { updateFailureDialogShown = false; }, 5000);

	try
	{
		dialog.showMessageBox(
		{
			type: 'error',
			title: 'Update Error',
			message: 'There was a problem updating draw.io.',
			detail: 'Please manually download and update from ' + UPDATE_DOWNLOAD_URL
		});
	}
	catch (dialogErr)
	{
		try { log.error('Failed to show update error dialog:', dialogErr); }
		catch (e) { /* swallow */ }
	}
}

// Invokes an autoUpdater method, catching synchronous throws (e.g. NPEs deep inside
// electron-updater) and unhandled promise rejections, routing both to the fallback dialog.
function safeUpdaterCall(label, fn)
{
	try
	{
		const result = fn();

		if (result != null && typeof result.catch === 'function')
		{
			result.catch(err => notifyUpdateFailure(err, label));
		}

		return result;
	}
	catch (err)
	{
		notifyUpdateFailure(err, label);
		return null;
	}
}

// Wraps an event listener so an exception in the handler can't escape and tear down
// the updater (or, worse, crash the process via an unhandled exception in a callback).
function safeUpdaterListener(label, fn)
{
	return function(...args)
	{
		try
		{
			return fn.apply(this, args);
		}
		catch (err)
		{
			notifyUpdateFailure(err, label);
		}
	};
}

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

//Command option to disable hardware acceleration
if (process.argv.indexOf('--disable-acceleration') !== -1)
{
	app.disableHardwareAcceleration();
}

// Configure context menu for text fields
contextMenu({
	showCopyImage: true,
	showSaveImage: true,
	showSaveImageAs: true,
	showLookUpSelection: false,
	showSearchWithGoogle: false,
	showCopyLink: false,
	showSelectAll: true,
	append: (defaultActions, params, browserWindow) => [
		{
			label: 'Paste and Match Style',
			// Only show this item when there's a text in the clipboard
			visible: clipboard.availableFormats().includes('text/plain'),
			click: () => {
				// Execute the paste command in the focused window
				browserWindow.webContents.pasteAndMatchStyle();
			}
		}
	]
});

const __DEV__ = process.env.DRAWIO_ENV === 'dev'
		
let windowsRegistry = []
let cmdQPressed = false
let firstWinLoaded = false
let firstWinFilePath = null
const isMac = process.platform === 'darwin'
const isWin = process.platform === 'win32'
let enableSpellCheck = store != null ? store.get('enableSpellCheck') : false;
enableSpellCheck = enableSpellCheck != null ? enableSpellCheck : isMac;
let enableStoreBkp = store != null ? (store.get('enableStoreBkp') != null ? store.get('enableStoreBkp') : true) : false;
let dialogOpen = false;
let enablePlugins = false;
// One-shot value used to seed the drawio Configuration's defaultAdaptiveColors
// for users running this version for the first time. 'auto' for new installs,
// 'simple' for updates from a previous desktop version. Null after migration.
let initialAdaptiveColorsDefault = null;
const codeDir = path.join(__dirname, '/../../drawio/src/main/webapp');
const codeUrl = url.pathToFileURL(codeDir).href.replace(/\/.\:\//, str => str.toUpperCase()); // Fix for windows drive letter
// Production app uses asar archive, so we need to go up two more level. It's extra cautious since asar is read-only anyway.
const appBaseDir = path.join(__dirname, __dirname.endsWith(path.join('resources', 'app.asar', 'src', 'main')) ?
								'/../../../../' : '/../../');
// Paths the user has authorised through trusted UI (file picker, file association,
// command line). The renderer is not allowed to write to anything else, even via
// IPC handlers that pass validateSender. Symlinks are resolved before insertion so
// the realpath of a blessed path is what's actually authorised.
//
// Persisted across sessions via electron-store so drawio's "Open Recent" (which
// fakes an args-obj entirely in the renderer) still works — recent files are
// only added to the menu after a successful open via trusted UI, so a path in
// the persisted set is one we previously authorised.
const BLESSED_PATHS_KEY = 'blessedPaths';
const BLESSED_PATHS_MAX = 500;
const blessedPaths = new Set();

if (store != null)
{
	try
	{
		const persisted = store.get(BLESSED_PATHS_KEY);

		if (Array.isArray(persisted))
		{
			for (const p of persisted)
			{
				if (typeof p === 'string' && p) blessedPaths.add(p);
			}
		}
	}
	catch (e) {} // Bad store contents — start with an empty set.
}

function persistBlessedPaths()
{
	if (store == null) return;

	try
	{
		let arr = Array.from(blessedPaths);

		// Cap to keep the store bounded; newest insertions win.
		if (arr.length > BLESSED_PATHS_MAX)
		{
			arr = arr.slice(arr.length - BLESSED_PATHS_MAX);
		}

		store.set(BLESSED_PATHS_KEY, arr);
	}
	catch (e) {}
}

function blessPath(p)
{
	if (typeof p !== 'string' || !p) return;

	try
	{
		const resolved = path.resolve(p);
		blessedPaths.add(resolved);

		try
		{
			blessedPaths.add(fs.realpathSync(resolved));
		}
		catch (e) {} // Path may not exist yet (Save As) — that's fine.

		persistBlessedPaths();
	}
	catch (e) {} // Defensive: blessPath must never throw into a caller's flow.
}

// fs.statSync that never throws (returns null for missing, deleted-in-between
// or inaccessible paths) so callers can't crash the main process on a race
function statSafe(p)
{
	try
	{
		return (typeof p === 'string' && p) ? fs.statSync(p) : null;
	}
	catch (e)
	{
		return null;
	}
}

// One-shot migration: on first launch with the blessedPaths fix, the renderer's
// drawio "Open Recent" list (in localStorage at key '.recent') contains paths
// that were opened in prior versions and so were never blessed. Without this
// migration, autosave would break for every legacy recent file until the user
// re-opened it via the file picker. Trust-on-first-use is acceptable here: any
// attacker who could have poisoned localStorage in a prior version already had
// the broader (pre-fix) attack surface, so this migration does not widen it.
const BLESSED_PATHS_MIGRATION_KEY = 'blessedPathsLegacyMigrated';

async function migrateLegacyRecentsOnce(webContents)
{
	if (store == null) return;
	if (store.get(BLESSED_PATHS_MIGRATION_KEY)) return;

	try
	{
		const recentsJson = await webContents.executeJavaScript(
			'try { localStorage.getItem(".recent") } catch (e) { null }');

		if (typeof recentsJson === 'string')
		{
			const recents = JSON.parse(recentsJson);

			if (Array.isArray(recents))
			{
				for (const entry of recents)
				{
					if (entry != null && typeof entry.id === 'string' &&
						entry.id && fs.existsSync(entry.id))
					{
						blessPath(entry.id);
					}
				}
			}
		}
	}
	catch (e) {} // Migration is best-effort; never block app startup.

	try { store.set(BLESSED_PATHS_MIGRATION_KEY, true); } catch (e) {}
}
let appZoom = 1;
// Disabled by default
let isGoogleFontsEnabled = store != null ? (store.get('isGoogleFontsEnabled') != null? store.get('isGoogleFontsEnabled') : false) : false;

//Read config file
var queryObj = {
	'dev': __DEV__ ? 1 : 0,
	'test': __DEV__ ? 1 : 0,
	'gapi': 0,
	'db': 0,
	'od': 0,
	'gh': 0,
	'gl': 0,
	'tr': 0,
	'browser': 0,
	'picker': 0,
	'mode': 'device',
	'export': 'https://convert.diagrams.net/node/export',
	'disableUpdate': disableUpdate? 1 : 0,
	'enableSpellCheck': enableSpellCheck? 1 : 0,
	'enableStoreBkp': enableStoreBkp? 1 : 0,
	'isGoogleFontsEnabled': isGoogleFontsEnabled? 1 : 0
};

try
{
	if (fs.existsSync(process.cwd() + '/urlParams.json'))
	{
		let urlParams = JSON.parse(fs.readFileSync(process.cwd() + '/urlParams.json'));
		
		for (var param in urlParams)
		{
			queryObj[param] = urlParams[param];
		}
	}
}
catch(e)
{
	console.log('Error in urlParams.json file: ' + e.message);
}

// Trying sandboxing the renderer for more protection
//app.enableSandbox(); // This maybe the reason snap stopped working

// Only allow request from the app code itself
function validateSender (frame)
{
	// senderFrame may be null if the frame has navigated or been destroyed
	// before the IPC handler runs (documented behaviour on IpcMainEvent).
	if (frame == null) return false;
	return frame.url.replace(/\/.\:\//, str => str.toUpperCase()).startsWith(codeUrl);
}

function isWithinDisplayBounds(pos) 
{
	const displays = screen.getAllDisplays();

	return displays.reduce((result, display) => 
	{
		const area = display.workArea
		return (
			result ||
			(pos.x >= area.x &&
			pos.y >= area.y &&
			pos.x < area.x + area.width &&
			pos.y < area.y + area.height)
		)
	}, false)
}

function createWindow (opt = {})
{
	let lastWinSizeStr = (store && store.get('lastWinSize')) || '1200,800,0,0,false,false';
	let lastWinSize = lastWinSizeStr ? lastWinSizeStr.split(',') : [1200, 800];

	// TODO On some Mac OS, double click the titlebar set incorrect window size
	if (lastWinSize[0] < 500)
	{
		lastWinSize[0] = 500;
	}

	if (lastWinSize[1] < 500)
	{
		lastWinSize[1] = 500;
	}

	const additionalArguments = [];

	if (initialAdaptiveColorsDefault != null)
	{
		additionalArguments.push('--initial-adaptive-colors=' + initialAdaptiveColorsDefault);
	}

	let options = Object.assign(
	{
		backgroundColor: '#FFF',
		width: parseInt(lastWinSize[0]),
		height: parseInt(lastWinSize[1]),
		icon: `${codeDir}/images/drawlogo256.png`,
		webviewTag: false,
		webSecurity: true,
		webPreferences: {
			preload: `${__dirname}/electron-preload.js`,
			spellcheck: enableSpellCheck,
			contextIsolation: true,
			disableBlinkFeatures: 'Auxclick', // Is this needed?
			additionalArguments: additionalArguments
		}
	}, opt)
	
	if (lastWinSize[2] != null)
	{
		options.x = parseInt(lastWinSize[2]);
	}

	if (lastWinSize[3] != null)
	{
		options.y = parseInt(lastWinSize[3]);
	}

	if (!isWithinDisplayBounds(options))
	{
		options.x = null;
		options.y = null;
	}

	let mainWindow = new BrowserWindow(options)
	windowsRegistry.push(mainWindow)

	if (lastWinSize[4] === 'true')
	{
		mainWindow.maximize()
	}

	if (lastWinSize[5] === 'true')
	{
		mainWindow.setFullScreen(true);
	}

	if (__DEV__) 
	{
		console.log('createWindow', opt)
	}

	//Cannot be read before app is ready
	queryObj['appLang'] = app.getLocale();

	let ourl = url.format(
	{
		pathname: `${codeDir}/index.html`,
		protocol: 'file:',
		query: queryObj,
		slashes: true
	})
	
	mainWindow.loadURL(ourl)

	// Intercept Ctrl/Cmd+Shift+V before it reaches the renderer
	// so paste-without-formatting works even when the web app captures the shortcut
	mainWindow.webContents.on('before-input-event', (event, input) =>
	{
		if (input.type === 'keyDown' && input.key === 'v' &&
			input.shift && (isMac ? input.meta : input.control) && !input.alt)
		{
			event.preventDefault();
			mainWindow.webContents.pasteAndMatchStyle();
		}
	});

	// Open the DevTools.
	if (__DEV__)
	{
		mainWindow.webContents.openDevTools()
	}

	ipcMain.on('openDevTools', function(e)
	{
		if (!validateSender(e.senderFrame)) return null;

		mainWindow.webContents.openDevTools();
	});

	function rememberWinSize(win)
	{
		if (store != null)
		{
			const size = win.getSize();
			const pos = win.getPosition();
			store.set('lastWinSize', size[0] + ',' + size[1] + ',' + pos[0] + ',' + pos[1] + ',' + win.isMaximized() + ',' + win.isFullScreen());
		}
	}

	mainWindow.on('maximize', function()
	{
		mainWindow.webContents.send('maximize')
	});

	mainWindow.on('unmaximize', function()
	{
		mainWindow.webContents.send('unmaximize')
	});

	mainWindow.on('resize', function()
	{
		mainWindow.webContents.send('resize')
	});

	let uniqueIsModifiedId, modifiedModalOpen = false;

	ipcMain.on('isModified-result', async (e, data) =>
	{
		if (!validateSender(e.senderFrame) || uniqueIsModifiedId != data.uniqueId || modifiedModalOpen) return null;

		if (data.isModified)
		{
			modifiedModalOpen = true;
			// Can't use async function here because it crashes on Linux when win.destroy is called
			let response = dialog.showMessageBoxSync(
				mainWindow,
				{
					type: 'question',
					buttons: ['Cancel', 'Discard Changes'],
					title: 'Confirm',
					message: 'The document has unsaved changes. Do you really want to quit without saving?' //mxResources.get('allChangesLost')
				});

			if (response === 1)
			{
				//If user chose not to save, remove the draft
				if (data.draftPath != null)
				{
					await deleteFile(data.draftPath);
					mainWindow.destroy();
				}
				else
				{
					mainWindow.webContents.send('removeDraft');

					ipcMain.once('draftRemoved', (e) =>
					{
						if (!validateSender(e.senderFrame)) return null;

						mainWindow.destroy();
					});
				}
			}
			else
			{
				cmdQPressed = false;
				modifiedModalOpen = false;
			}
		}
		else
		{
			mainWindow.destroy();
		}
	});
	
	mainWindow.on('close', (event) =>
	{
		uniqueIsModifiedId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

		if (__DEV__)
		{
			const index = windowsRegistry.indexOf(mainWindow)
			console.log('Window on close', index, uniqueIsModifiedId)
		}
		
		const contents = mainWindow.webContents

		if (contents != null)
		{
			contents.send('isModified', uniqueIsModifiedId);
			event.preventDefault();
		}

		rememberWinSize(mainWindow);
	})

	// Emitted when the window is closed.
	mainWindow.on('closed', () =>
	{
		const index = windowsRegistry.indexOf(mainWindow)
		
		if (__DEV__) 
		{
			console.log('Window closed idx:%d', index)
		}
		
		windowsRegistry.splice(index, 1)
	})
	
	return mainWindow
}

function isPluginsEnabled()
{
	return enablePlugins;
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() =>
{
	// Determine initial defaultAdaptiveColors for the drawio Configuration
	// before any window is created so the value is passed to the preload.
	initialAdaptiveColorsDefault = detectInitialAdaptiveColorsDefault();

	// Enforce our CSP on all contents
	session.defaultSession.webRequest.onHeadersReceived((details, callback) =>
	{
		// Skip CSP for config-editor iframe
		if (details.url.indexOf('config-editor.html') >= 0)
		{
			callback({responseHeaders: details.responseHeaders});
			return;
		}

		callback({
			responseHeaders: {
				...details.responseHeaders,
				'Content-Security-Policy': ['default-src \'self\'; script-src \'self\'; connect-src \'self\'' +
				(isGoogleFontsEnabled? ' https://fonts.googleapis.com https://fonts.gstatic.com' : '') + '; img-src * data:; media-src *; font-src * data:; frame-src \'self\'; style-src \'self\' \'unsafe-inline\'' +
				(isGoogleFontsEnabled? ' https://fonts.googleapis.com' : '') + '; base-uri \'none\';child-src \'self\';object-src \'none\';']
			}
		})
	});

	const pluginsCodeUrl = url.pathToFileURL(path.join(getAppDataFolder(), '/plugins/')).href.replace(/\/.\:\//, str => str.toUpperCase());

	// Enforce loading file only from our app directory
	session.defaultSession.webRequest.onBeforeRequest({urls: ['file://*']}, (details, callback) =>
	{
		const url = details.url.replace(/\/.\:\//, str => str.toUpperCase());

		if (!url.startsWith(codeUrl) && (!isPluginsEnabled() || (isPluginsEnabled() && !url.startsWith(pluginsCodeUrl))))
		{
			console.log('Blocked loading file from ' + details.url, url, codeUrl, pluginsCodeUrl);
			callback({cancel: true});
		}
		else
		{
			callback({});
		}
	});

	ipcMain.on('newfile', (e, arg) =>
	{
		if (!validateSender(e.senderFrame)) return null;

		let opts = {};

		if (arg)
		{
			if (arg.width)
			{
				opts.width = arg.width;
			}

			if (arg.height)
			{
				opts.height = arg.height;
			}
		}

		createWindow(opts);
	})
	
    let argv = process.argv

    // https://github.com/electron/electron/issues/4690#issuecomment-217435222
    if (process.defaultApp != true)
    {
        argv.unshift(null)
    }

	var validFormatRegExp = validFormatRegExpImport;
	var { opts: options, args: parsedArgs } = parseDrawioArgs(argv);
	enablePlugins = options.enablePlugins;

	if (options.zoom != null)
	{
		appZoom = options.zoom;
	}

    //Start export mode?
    if (options.export)
	{
    	var dummyWin = new BrowserWindow({
			show : false,
			webPreferences: {
				preload: `${__dirname}/electron-preload.js`,
				contextIsolation: true,
				disableBlinkFeatures: 'Auxclick' // Is this needed?
			}
		});
    	
    	windowsRegistry.push(dummyWin);
    	
		/*ipcMain.on('log', function(event, msg)
		{
			console.log(msg);
		});*/
	
    	try
    	{
	    	//Prepare arguments and confirm it's valid
	    	var format = null;
	    	var outType = null;
	    	
	    	//Format & Output
	    	if (options.output)
			{
	    		try
	    		{
	    			var outStat = fs.statSync(options.output);
	    			
	    			if (outStat.isDirectory())
					{
	    				outType = {isDir: true};
					}
	    			else //If we can get file stat, then it exists
					{
	    				throw 'Error: Output file already exists';
					}
	    		}
	    		catch(e) //on error, file doesn't exist and it is not a dir
	    		{
	    			outType = {isFile: true};
	    			
	    			format = path.extname(options.output).substr(1);
					
					if (!validFormatRegExp.test(format))
					{
						format = null;
					}
	    		}
			}
	    	
	    	if (format == null)
			{
	    		format = options.format;
			}
	    	
	    	let from = null, to = null;
	    	
	    	if (options.pageIndex != null && options.pageIndex >= 0)
			{
	    		from = options.pageIndex;
				to = options.pageIndex;
				options.allPages = false;
			}
	    	else if (options.pageRange && options.pageRange.length == 2)
			{
				const [rangeFrom, rangeTo] = options.pageRange;

				if (rangeFrom >= 0 && rangeTo >= 0 && rangeFrom <= rangeTo)
				{
					from = rangeFrom;
					to = rangeTo;
					options.allPages = false;
				}
				else
				{
					console.error('Invalid page range: must be non-negative and from ≤ to');
					process.exit(1);
				}
			}

			var expArgs = {
				format: format,
				w: options.width > 0 ? options.width : null,
				h: options.height > 0 ? options.height : null,
				bg: options.transparent ? 'none' : '#ffffff',
				from: from,
				to: to,
				allPages: (format == 'pdf' || format == 'html') && options.allPages,
				scale: (options.scale || 1),
				embedXml: options.embedDiagram? '1' : '0',
				embedImages: options.embedSvgImages? '1' : '0',
				embedFonts: (options.embedSvgFonts === true || options.embedSvgFonts === 'true')? '1' : '0',
				jpegQuality: options.quality,
				uncompressed: options.uncompressed,
				theme: options.svgTheme,
				linkTarget: options.svgLinksTarget,
				crop: (options.crop && format == 'pdf') ? '1' : '0'
			};

			options.border = options.border > 0 ? options.border : 0;

			if (format === 'pdf') 
			{
				expArgs.pageMargin = options.border;
			}
			else
			{
				expArgs.border = options.border;
			}

			if (options.layers)
			{
				expArgs.extras = JSON.stringify({layers: options.layers.split(',')});
			}

			if (options.layout)
			{
				expArgs.layout = options.layout;
			}

			var paths = parsedArgs;
			
			// Remove --no-sandbox arg from the paths
			if (Array.isArray(paths))
			{
				paths = paths.filter(function(path) { return path != null && path != '--no-sandbox'; });
			}

			// If a file is passed 
			if (paths !== undefined && paths[0] != null)
			{
				var inStat = null;
				
				try
				{
					inStat = fs.statSync(paths[0]);
				}
				catch(e)
				{
					throw 'Error: input file/directory not found';	
				}
				
				var files = [];
				
				function addDirectoryFiles(dir, isRecursive)
				{
					fs.readdirSync(dir).forEach(function(file) 
					{
						var filePath = path.join(dir, file);
						var stat = fs.statSync(filePath);
						
						if (stat.isFile() && path.basename(filePath).charAt(0) != '.')
						{
							files.push(filePath);
						}
						if (stat.isDirectory() && isRecursive)
					    {
							addDirectoryFiles(filePath, isRecursive)
					    }
					});
				}
				
				if (inStat.isFile())
				{
					files.push(paths[0]);
				}
				else if (inStat.isDirectory())
				{
					addDirectoryFiles(paths[0], options.recursive);
				}

				if (files.length > 0)
				{
					var fileIndex = 0;
					var exportFailed = false;
					
					function processOneFile()
					{
						var curFile = files[fileIndex];
						
						try
						{
							var ext = path.extname(curFile);
							
							let fileContent = fs.readFileSync(curFile, ext === '.png' || ext === '.pdf' || ext === '.vsdx' ? null : 'utf-8');
							
							if (ext === '.vsdx')
							{
								dummyWin.loadURL(`file://${codeDir}/vsdxImporter.html`);
								
								const contents = dummyWin.webContents;

								contents.on('did-finish-load', function()
							    {
									contents.send('import', fileContent);

									ipcMain.once('import-success', function(e, xml)
						    	    {
										if (!validateSender(e.senderFrame)) return null;

										expArgs.xml = xml;
										startExport();
						    	    });
						    	    
						    	    ipcMain.once('import-error', function(e)
						    	    {
										if (!validateSender(e.senderFrame)) return null;

						    	    	console.error('Error: cannot import VSDX file: ' + curFile);
										exportFailed = true;
						    	    	next();
						    	    });
							    });
							}
							else
							{
								if (ext === '.csv')
								{
									expArgs.csv = fileContent;
								}
								else if (ext === '.png')
								{
									expArgs.xmlEncoded = true;
									expArgs.xml = Buffer.from(fileContent).toString('base64');
								}
								else if (ext === '.pdf')
								{
									expArgs.pdfEncoded = true;
									expArgs.xml = Buffer.from(fileContent).toString('base64');
								}
								else if (ext === '.mmd' || ext === '.mermaid')
								{
									// Mermaid is converted to a diagram in the renderer
									// (export3.html loads the Mermaid bundle); export.js
									// handles the data.mermaid input.
									expArgs.mermaid = fileContent;
								}
								else
								{
									expArgs.xml = fileContent;
								}

								startExport();
							}
							
							function next()
							{
								fileIndex++;
								
								if (fileIndex < files.length)
								{
									processOneFile();
								}
								else if (exportFailed)
								{
									app.exit(1);
								}
								else
								{
									cmdQPressed = true;
									dummyWin.destroy();
								}
							};
							
							function startExport()
							{
								var replied = false;
								var mockEvent = {
									reply: function(msg, data)
									{
										if (replied) return;
										replied = true;

										try
										{
											if (msg == 'export-success')
											{
												if (data == null || data.length == 0)
												{
													console.error('Error: Empty export data: ' + curFile);
													exportFailed = true;
												}
												else
												{
													var outFileName = null;

													if (outType != null)
													{
														if (outType.isDir)
														{
															outFileName = path.join(options.output, path.basename(curFile,
																path.extname(curFile))) + '.' + format;
														}
														else
														{
															outFileName = options.output;
														}
													}
													else if (inStat.isFile())
													{
														outFileName = path.join(path.dirname(paths[0]), path.basename(paths[0],
															path.extname(paths[0]))) + '.' + format;

													}
													else //dir
													{
														outFileName = path.join(path.dirname(curFile), path.basename(curFile,
															path.extname(curFile))) + '.' + format;
													}

													try
													{
														var counter = 0;
														var realFileName = outFileName;

														if (options.check)
														{
															while (fs.existsSync(realFileName))
															{
																counter++;
																realFileName = path.join(path.dirname(outFileName), path.basename(outFileName,
																	path.extname(outFileName))) + '-' + counter + path.extname(outFileName);
															}
														}

														let fh = fs.openSync(realFileName,
															fs.constants.O_SYNC | fs.constants.O_CREAT |
															fs.constants.O_WRONLY | fs.constants.O_TRUNC);

														try
														{
															fs.writeFileSync(fh, data);
															fs.fsyncSync(fh);
														}
														finally
														{
															fs.closeSync(fh);
														}

														console.log(curFile + ' -> ' + realFileName);
													}
													catch(e)
													{
														console.error('Error writing to file: ' + outFileName);
														exportFailed = true;
													}
												}
											}
											else
											{
												console.error('Error: ' + (data || 'Export failed') + ': ' + curFile);
												exportFailed = true;
											}

											next();
										}
										finally
										{
											mockEvent.finalize();
										}
							    	}
								};

								if (format === 'html')
								{
									mockEvent.finalize = function() {};
									var xml = expArgs.xml;

									if (expArgs.xmlEncoded)
									{
										var pngBuf = Buffer.from(xml, 'base64');
										xml = readPngXml(pngBuf);

										if (xml == null)
										{
											mockEvent.reply('export-error', 'No diagram data found in PNG file');
											return;
										}
									}
									else if (expArgs.pdfEncoded)
									{
										xml = readPdfXml(Buffer.from(xml, 'base64'));

										if (xml == null)
										{
											mockEvent.reply('export-error', 'No diagram data found in PDF file');
											return;
										}
									}
									else if (ext === '.svg')
									{
										xml = readSvgXml(xml);

										if (xml == null)
										{
											mockEvent.reply('export-error', 'No diagram data found in SVG file');
											return;
										}
									}
									else if (expArgs.csv)
									{
										mockEvent.reply('export-error', 'CSV to HTML export is not supported');
										return;
									}
									else if (expArgs.mermaid)
									{
										mockEvent.reply('export-error', 'Mermaid to HTML export is not supported');
										return;
									}
									else if (expArgs.layout)
									{
										mockEvent.reply('export-error', 'Layout is not supported for HTML export');
										return;
									}

									var title = path.basename(curFile, path.extname(curFile));
									var htmlData = buildHtmlExport(xml, title, options);
									mockEvent.reply('export-success', htmlData);
								}
								else
								{
									exportDiagram(mockEvent, expArgs, true);
								}
							};
						}
						catch(e)
						{
							console.error('Error reading file: ' + curFile);
							exportFailed = true;
							next();
						}
					}
					
					processOneFile();
				}
				else
				{
					throw 'Error: input file/directory not found or directory is empty';
				}
			}
			else
			{
				throw 'Error: An input file must be specified';
			}
    	}
    	catch(e)
    	{
    		console.error(e);
    		app.exit(1);
    	}
    	
    	return;
	}
    else if (argv.some(a => a === '-V' || a === '--version')) //To prevent execution when version arg is used
	{
		console.log(app.getVersion());
		app.quit();
    	return;
	}
    else if (argv.some(a => a === '-h' || a === '--help')) //To prevent execution when help arg is used
	{
		console.log(formatHelp(app.getVersion()));
		app.quit();
    	return;
	}
    
    //Prevent multiple instances of the application (casuses issues with configuration)
    const gotTheLock = app.requestSingleInstanceLock()

    if (!gotTheLock) 
    {
		app.quit()
    } 
    else 
    {
    	app.on('second-instance', (event, commandLine, workingDirectory) => {
			// Creating a new window while a save/open dialog is open crashes the app
			if (dialogOpen) return;

    		//Create another window
    		let win = createWindow()

			let loadEvtCount = 0;
			
			function loadFinished(e)
			{
				if (e != null && !validateSender(e.senderFrame)) return null;

				loadEvtCount++;
				
				if (loadEvtCount == 2)
				{
	    	    	//Open the file if new app request is from opening a file.
	    	    	//Must be a regular file: the trailing token of a dev-mode
	    	    	//launch is the app directory ".", and reading a directory
	    	    	//shows an EISDIR error dialog.
	    	    	var potFile = commandLine.pop();
	    	    	var potStat = statSafe(potFile);

	    	    	if (potStat != null && potStat.isFile())
	    	    	{
	    	    		// User intent: launched the app from CLI / file association
	    	    		// while another instance was already running.
	    	    		blessPath(potFile);
	    	    		win.webContents.send('args-obj', {args: [potFile]});
	    	    	}
				}
			}
			
			//Order of these two events is not guaranteed, so wait for them async.
			//TOOD There is still a chance we catch another window 'app-load-finished' if user created multiple windows quickly 
	    	ipcMain.once('app-load-finished', loadFinished);
    	    
    	    win.webContents.on('did-finish-load', function()
    	    {    			
    	        win.webContents.zoomFactor = appZoom;
    	        win.webContents.setVisualZoomLevelLimits(1, appZoom);
				loadFinished();
    	    });
    	})
    }

    let win = createWindow()
    
	let loadEvtCount = 0;
			
	function loadFinished(e)
	{
		if (e != null && !validateSender(e.senderFrame)) return null;

		loadEvtCount++;
		
		if (loadEvtCount == 2)
		{
			// User intent: paths passed on the command line / file association.
			if (Array.isArray(parsedArgs))
			{
				// Directories cannot be opened as diagrams (reading one shows
				// an EISDIR error dialog), so drop them here. Nonexistent
				// paths are kept: they reach the renderer as before.
				parsedArgs = parsedArgs.filter(a =>
				{
					if (typeof a !== 'string' || !a) return false;

					const st = statSafe(a);
					return st == null || !st.isDirectory();
				});

				for (const a of parsedArgs)
				{
					if (fs.existsSync(a))
					{
						blessPath(a);
					}
				}
			}

			//Sending entire program is not allowed in Electron 9 as it is not native JS object
			win.webContents.send('args-obj', {args: parsedArgs, create: options.create, layout: options.layout, mermaidImage: options.mermaidImage});
		}
	}
	
	//Order of these two events is not guaranteed, so wait for them async.
	//TOOD There is still a chance we catch another window 'app-load-finished' if user created multiple windows quickly 
	ipcMain.once('app-load-finished', loadFinished);

    win.webContents.on('did-finish-load', function()
    {
    	if (firstWinFilePath != null)
		{
    		if (parsedArgs != null)
    		{
    			parsedArgs.push(firstWinFilePath);
    		}
    		else
			{
    			parsedArgs = [firstWinFilePath];
			}
		}

    	firstWinLoaded = true;

    	migrateLegacyRecentsOnce(win.webContents);

        win.webContents.zoomFactor = appZoom;
        win.webContents.setVisualZoomLevelLimits(1, appZoom);
		loadFinished();
    });
	
	function toggleSpellCheck(e)
	{
		if (e != null && !validateSender(e.senderFrame)) return null;

		if (store != null)
		{
			enableSpellCheck = !enableSpellCheck;
			store.set('enableSpellCheck', enableSpellCheck);
		}
	};

	ipcMain.on('toggleSpellCheck', toggleSpellCheck);

	function toggleStoreBkp(e)
	{
		if (e != null && !validateSender(e.senderFrame)) return null;

		if (store != null)
		{
			enableStoreBkp = !enableStoreBkp;
			store.set('enableStoreBkp', enableStoreBkp);
		}
	};

	ipcMain.on('toggleStoreBkp', toggleStoreBkp);

	function toggleGoogleFonts(e)
	{
		if (e != null && !validateSender(e.senderFrame)) return null;

		if (store != null)
		{
			isGoogleFontsEnabled = !isGoogleFontsEnabled;
			store.set('isGoogleFontsEnabled', isGoogleFontsEnabled);
		}
	}

	ipcMain.on('toggleGoogleFonts', toggleGoogleFonts);

	function toggleFullscreen(e)
	{
		if (e != null && !validateSender(e.senderFrame)) return null;

		let win = BrowserWindow.getFocusedWindow();

		if (win != null)
		{
			win.setFullScreen(!win.isFullScreen());
		}
	};

	ipcMain.on('toggleFullscreen', toggleFullscreen);

    let updateNoAvailAdded = false;
    
	function checkForUpdatesFn(e)
	{
		if (e != null && e.senderFrame != null &&
			!validateSender(e.senderFrame)) return null;

		manualUpdateCheck = true;
		safeUpdaterCall('checkForUpdates (manual)', () => autoUpdater.checkForUpdates());

		if (!updateNoAvailAdded)
		{
			updateNoAvailAdded = true;
			autoUpdater.on('update-not-available', safeUpdaterListener('update-not-available', (info) =>
			{
				if (!manualUpdateCheck) return; // Suppress dialog for boot-time silent checks

				manualUpdateCheck = false;
				dialog.showMessageBox(
				{
					type: 'info',
					title: 'No updates found',
					message: 'Your application is up-to-date',
				})
			}))
		}
	};

	var zoomSteps = [0.25, 0.33, 0.5, 0.67, 0.75, 0.8, 0.9, 1,
		1.1, 1.25, 1.5, 1.75, 2, 2.5, 3, 4, 5];

	// Zooms to the next zoom step
	function zoomInFn()
	{
		var zoomFactor = win.webContents.zoomFactor;
		var newZoomFactor = zoomSteps[zoomSteps.length - 1];

		for (var i = 0; i < zoomSteps.length; i++)
		{
			if (zoomSteps[i] - zoomFactor > 0.01)
			{
				newZoomFactor = zoomSteps[i];
				break;
			}
		}

		win.webContents.zoomFactor = newZoomFactor;
	};

	// Zooms to the previous zoom step
	function zoomOutFn()
	{
		var zoomFactor = win.webContents.zoomFactor;
		var newZoomFactor = zoomSteps[0];

		for (var i = zoomSteps.length - 1; i >= 0; i--)
		{
			if (zoomSteps[i] - zoomFactor < -0.01)
			{
				newZoomFactor = zoomSteps[i];
				break;
			}
		}

		win.webContents.zoomFactor = newZoomFactor;
	};

	// Resets the zoom factor
	function resetZoomFn()
	{
		win.webContents.zoomFactor = 1;
	};

	let checkForUpdates = {
		label: 'Check for updates',
		click: checkForUpdatesFn
	}

	let autoCheckForUpdates = {
		label: 'Check for Updates Automatically',
		type: 'checkbox',
		checked: store == null || store.get('dontCheckUpdates') !== true,
		click: (menuItem) =>
		{
			if (store != null)
			{
				store.set('dontCheckUpdates', !menuItem.checked);
			}
		}
	}

	function setUpdateIntervalFn()
	{
		const hours = [24, 48, 72, 168];
		const currentHours = store?.get('updateCheckIntervalHours') ?? DEFAULT_UPDATE_CHECK_HOURS;
		const buttons = hours.map(h => h === 168 ? '1 week' : `${h} hours`);
		buttons.push('Cancel');

		dialog.showMessageBox(win,
		{
			type: 'question',
			title: 'Update Check Interval',
			message: 'How often should draw.io check for updates?',
			detail: `Current interval: ${currentHours === 168 ? '1 week' : currentHours + ' hours'}`,
			buttons: buttons,
			defaultId: hours.indexOf(currentHours) >= 0 ? hours.indexOf(currentHours) : hours.indexOf(DEFAULT_UPDATE_CHECK_HOURS),
			cancelId: buttons.length - 1
		}).then(result =>
		{
			if (result.response < hours.length && store != null)
			{
				store.set('updateCheckIntervalHours', hours[result.response]);
			}
		});
	}

	let setUpdateInterval = {
		label: 'Set Update Check Interval...',
		click: setUpdateIntervalFn
	}

	let zoomIn = {
		label: 'Zoom In',
		click: zoomInFn
	};

	let zoomOut = {
		label: 'Zoom Out',
		click: zoomOutFn
	};

	let resetZoom = {
		label: 'Actual Size',
		click: resetZoomFn
	};

	ipcMain.on('checkForUpdates', checkForUpdatesFn);
	ipcMain.on('zoomIn', zoomInFn);
	ipcMain.on('zoomOut', zoomOutFn);
	ipcMain.on('resetZoom', resetZoomFn);

	if (isMac)
	{
	    let template = [{
	      label: app.name,
	      submenu: [
	        {
	          label: 'About ' + app.name,
	          click() { shell.openExternal('https://www.drawio.com'); }
	        },
	        {
	          label: 'Support',
	          click() { shell.openExternal('https://github.com/jgraph/drawio-desktop/issues'); }
			},
			checkForUpdates,
			autoCheckForUpdates,
			setUpdateInterval,
	        { type: 'separator' },
			resetZoom,
			zoomIn,
			zoomOut,
			{ type: 'separator' },
	        { role: 'hide' },
	        { role: 'hideothers' },
	        { role: 'unhide' },
			{ type: 'separator' },
	        { role: 'quit' }
	      ]
	    }, {
	      label: 'Edit',
	      submenu: [
			{ role: 'undo' },
			{ role: 'redo' },
			{ type: 'separator' },
			{ role: 'cut' },
			{ role: 'copy' },
			{ role: 'paste' },
			{ role: 'pasteAndMatchStyle' },
			{ role: 'selectAll' }
	      ]
	    }]
	    
	    if (disableUpdate)
		{
			template[0].submenu.splice(2, 3);
		}
		
		const menuBar = menu.buildFromTemplate(template)
		menu.setApplicationMenu(menuBar)
	}
	else //hide  menubar in win/linux
	{
		menu.setApplicationMenu(null)
	}
	
	safeUpdaterCall('setFeedURL', () => autoUpdater.setFeedURL({
		provider: 'github',
		repo: 'drawio-desktop',
		owner: 'jgraph'
	}))
	
	// Cache update check - configurable interval (default: 24 hours)
	const DEFAULT_UPDATE_CHECK_HOURS = 24;
	const updateCheckHours = store?.get('updateCheckIntervalHours') ?? DEFAULT_UPDATE_CHECK_HOURS;
	const UPDATE_CHECK_INTERVAL = updateCheckHours * 60 * 60 * 1000;
	const lastUpdateCheck = store?.get('lastUpdateCheck') || 0;
	const shouldCheckUpdates = Date.now() - lastUpdateCheck > UPDATE_CHECK_INTERVAL;
	
	if (store == null || (!disableUpdate && !store.get('dontCheckUpdates') && shouldCheckUpdates))
	{
		if (store != null)
		{
			store.set('lastUpdateCheck', Date.now());
		}
		
		safeUpdaterCall('checkForUpdates (boot)', () => autoUpdater.checkForUpdates());
	}
})

//Quit from the dock context menu should quit the application directly
if (isMac) 
{
	app.on('before-quit', function() {
		cmdQPressed = true;
	});	
}

// Quit when all windows are closed.
app.on('window-all-closed', function ()
{
	if (__DEV__) 
	{
		console.log('window-all-closed', windowsRegistry.length)
	}
	
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (cmdQPressed || !isMac)
	{
		app.quit()
	}
})

app.on('activate', function ()
{
	if (__DEV__) 
	{
		console.log('app on activate', windowsRegistry.length)
	}
	
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (windowsRegistry.length === 0)
	{
		createWindow()
	}
})

app.on('will-finish-launching', function()
{
	app.on("open-file", function(event, filePath)
	{
	    event.preventDefault();
		// Creating a new window while a save/open dialog is open crashes the app
		if (dialogOpen) return;

		// User intent: OS handed us a path via file association.
		blessPath(filePath);

	    if (firstWinLoaded)
	    {
		    let win = createWindow();
		    
			let loadEvtCount = 0;
			
			function loadFinished(e)
			{
				if (e != null && !validateSender(e.senderFrame)) return null;

				loadEvtCount++;
				
				if (loadEvtCount == 2)
				{
	    	    	win.webContents.send('args-obj', {args: [filePath]});
				}
			}
			
			//Order of these two events is not guaranteed, so wait for them async.
			//TOOD There is still a chance we catch another window 'app-load-finished' if user created multiple windows quickly 
	    	ipcMain.once('app-load-finished', loadFinished);
    	    
		    win.webContents.on('did-finish-load', function()
		    {
		        win.webContents.zoomFactor = appZoom;
		        win.webContents.setVisualZoomLevelLimits(1, appZoom);
				loadFinished();
		    });
	    }
	    else
		{
	    	firstWinFilePath = filePath
		}
	});
});
 
app.on('web-contents-created', (event, contents) => {
	// Disable navigation
	contents.on('will-navigate', (event, navigationUrl) => {
		event.preventDefault()
	})

	// Limit creation of new windows (we also override window.open)
	contents.setWindowOpenHandler(({ url }) => {
		// We allow external absolute URLs to be open externally (check openExternal for details) and also empty windows (url -> about:blank)
		if (url.startsWith('about:blank'))
		{
			return {
				action: 'allow',
				overrideBrowserWindowOptions: {
					fullscreenable: false,
					webPreferences: {
						contextIsolation: true
					}
				}
			}
		} 
		else if (!openExternal(url))
		{
			return {action: 'deny'}
		}
	})

	// Disable all webviews
	contents.on('will-attach-webview', (event, webPreferences, params) => {
		event.preventDefault()
	})
})

autoUpdater.on('error', e => notifyUpdateFailure(e, 'autoUpdater error event'))

autoUpdater.on('update-available', safeUpdaterListener('update-available', (info) =>
{
	// Boot-time silent path: download in the background; autoInstallOnAppQuit handles install
	if (silentUpdate && !manualUpdateCheck)
	{
		safeUpdaterCall('downloadUpdate (silent)', () => autoUpdater.downloadUpdate());
		return;
	}

	manualUpdateCheck = false;

	dialog.showMessageBox(
	{
		type: 'question',
		buttons: ['Ok', 'Cancel', 'Don\'t Ask Again'],
		title: 'Confirm draw.io Update',
		message: `draw.io update available (${app.getVersion()} → ${info.version}).\n\nWould you like to download and install new version?`,
		detail: 'Application will automatically restart to apply update after download',
	}).then( result =>
	{
		if (result.response === 0)
		{
			safeUpdaterCall('downloadUpdate (manual)', () => autoUpdater.downloadUpdate())

			var progressBar = new ProgressBar({
				title: 'draw.io Update',
			    text: 'Downloading draw.io update...'
			});

			function reportUpdateError(e)
			{
				try
				{
					progressBar.detail = 'Error occurred while fetching updates. ' + (e && e.message? e.message : e)
					progressBar._window.setClosable(true);
				}
				catch (err)
				{
					notifyUpdateFailure(err, 'reportUpdateError');
				}
			}

			autoUpdater.on('error', safeUpdaterListener('download error', e => {
				if (progressBar._window != null)
				{
					reportUpdateError(e);
				}
				else
				{
					progressBar.on('ready', function() {
						reportUpdateError(e);
					});
				}
			}))

			var firstTimeProg = true;

			autoUpdater.on('download-progress', safeUpdaterListener('download-progress', (d) => {
				//On mac, download-progress event is not called, so the indeterminate progress will continue until download is finished
				var percent = d.percent;
				
				if (percent)
				{
					percent = Math.round(percent * 100)/100;
				}
				
				if (firstTimeProg)
				{
					firstTimeProg = false;
					progressBar.close();

					progressBar = new ProgressBar({
						indeterminate: false,
						title: 'draw.io Update',
						text: 'Downloading draw.io update...',
						detail: `${percent}% ...`,
						initialValue: percent
					});
				
					progressBar
							.on('completed', function() {
								progressBar.detail = 'Download completed.';
							})
							.on('aborted', function(value) {
								if (__DEV__)
								{
									log.error(`progress aborted... ${value}`);
								}
							})
							.on('progress', function(value) {
								progressBar.detail = `${value}% ...`;
							})
							.on('ready', function() {
								//InitialValue doesn't set the UI! so this is needed to render it correctly
								progressBar.value = percent;
							});
				}
				else
				{
					progressBar.value = percent;
				}
			}));

		    autoUpdater.on('update-downloaded', safeUpdaterListener('update-downloaded', (info) => {
				if (!progressBar.isCompleted())
				{
					progressBar.close()
				}

				// Ask user to update the app
				dialog.showMessageBox(
				{
					type: 'question',
					buttons: ['Install', 'Later'],
					defaultId: 0,
					message: 'A new version of ' + app.name + ' has been downloaded',
					detail: 'It will be installed the next time you restart the application',
				}).then(result =>
				{
					if (result.response === 0)
					{
						setTimeout(() => safeUpdaterCall('quitAndInstall', () => autoUpdater.quitAndInstall()), 1)
					}
				})
		    }));
		}
		else if (result.response === 2 && store != null)
		{
			//save in settings don't check for updates
			store.set('dontCheckUpdates', true)
		}
	})
}))

//Pdf export
const MICRON_TO_PIXEL = 264.58 		//264.58 micron = 1 pixel
const PIXELS_PER_INCH = 100.117		// Usually it is 100 pixels per inch but this give better results
const PNG_CHUNK_IDAT = 1229209940;
const LARGE_IMAGE_AREA = 30000000;

//NOTE: Key length must not be longer than 79 bytes (not checked)
function writePngWithText(origBuff, key, text, compressed, base64encoded)
{
	var isDpi = key == 'dpi';
	var inOffset = 0;
	var outOffset = 0;
	var data = text;
	var dataLen = isDpi? 9 : key.length + data.length + 1; //we add 1 zeros with non-compressed data, for pHYs it's 2 of 4-byte-int + 1 byte

	//prepare compressed data to get its size
	if (compressed)
	{
		// PNG zTXt requires an RFC 1950 zlib datastream, not raw deflate
		// [jgraph/drawio-desktop#2425]
		data = zlib.deflateSync(encodeURIComponent(text));
		dataLen = key.length + data.length + 2; //we add 2 zeros with compressed data
	}

	// 12 = chunk framing overhead: length(4) + type(4) + CRC(4)
	var outBuff = Buffer.allocUnsafe(origBuff.length + dataLen + 12);
	
	try
	{
		var magic1 = origBuff.readUInt32BE(inOffset);
		inOffset += 4;
		var magic2 = origBuff.readUInt32BE(inOffset);
		inOffset += 4;
		
		if (magic1 != 0x89504e47 && magic2 != 0x0d0a1a0a)
		{
			throw new Error("PNGImageDecoder0");
		}
		
		outBuff.writeUInt32BE(magic1, outOffset);
		outOffset += 4;
		outBuff.writeUInt32BE(magic2, outOffset);
		outOffset += 4;
	}
	catch (e)
	{
		log.error(e.message, {stack: e.stack});
		throw new Error("PNGImageDecoder1");
	}

	try
	{
		while (inOffset < origBuff.length)
		{
			var length = origBuff.readInt32BE(inOffset);
			inOffset += 4;
			var type = origBuff.readInt32BE(inOffset)
			inOffset += 4;

			if (type == PNG_CHUNK_IDAT)
			{
				// Insert zTXt chunk before IDAT chunk
				outBuff.writeInt32BE(dataLen, outOffset);
				outOffset += 4;

				var typeSignature = isDpi? 'pHYs' : (compressed ? "zTXt" : "tEXt");
				outBuff.write(typeSignature, outOffset);

				// CRC covers chunk type + chunk data — start of range is the type field
				var crcStart = outOffset;
				outOffset += 4;

				if (isDpi)
				{
					var dpm = Math.round(parseInt(text) / 0.0254) || 3937; //One inch is equal to exactly 0.0254 meters. 3937 is 100dpi

					outBuff.writeInt32BE(dpm, outOffset);
					outBuff.writeInt32BE(dpm, outOffset + 4);
					outBuff.writeInt8(1, outOffset + 8);
					outOffset += 9;
				}
				else
				{
					outBuff.write(key, outOffset);
					outOffset += key.length;
					outBuff.writeInt8(0, outOffset);
					outOffset ++;

					if (compressed)
					{
						outBuff.writeInt8(0, outOffset);
						outOffset ++;
						data.copy(outBuff, outOffset);
					}
					else
					{
						outBuff.write(data, outOffset);
					}

					outOffset += data.length;
				}

				var crcVal = 0xffffffff;
				crcVal = crc.crcjam(outBuff.subarray(crcStart, outOffset), crcVal);

				// CRC
				outBuff.writeInt32BE(crcVal ^ 0xffffffff, outOffset);
				outOffset += 4;

				// Writes the IDAT chunk after the zTXt
				outBuff.writeInt32BE(length, outOffset);
				outOffset += 4;
				outBuff.writeInt32BE(type, outOffset);
				outOffset += 4;

				origBuff.copy(outBuff, outOffset, inOffset);

				// Encodes the buffer using base64 if requested
				return base64encoded? outBuff.toString('base64') : outBuff;
			}

			outBuff.writeInt32BE(length, outOffset);
			outOffset += 4;
			outBuff.writeInt32BE(type, outOffset);
			outOffset += 4;

			origBuff.copy(outBuff, outOffset, inOffset, inOffset + length + 4);// +4 to move past the crc
			
			inOffset += length + 4;
			outOffset += length + 4;
		}
	}
	catch (e)
	{
		log.error(e.message, {stack: e.stack});
		throw e;
	}
}

async function mergePdfs(pdfFiles, xml)
{
	if (pdfFiles.length == 1)
	{
		// Converts to PDF 1.7 with compression
		const pdfDoc = await PDFDocument.load(pdfFiles[0]);
		pdfDoc.setCreator('diagrams.net');

		// KNOWN: Attachments produce smaller files but break
		// internal links in pdf-lib so using Subject for now
		if (xml != null)
		{
			pdfDoc.setSubject(encodeURIComponent(xml).
				replace(/\(/g, "\\(").replace(/\)/g, "\\)"));
		}

		// Forces /ObjStm so the hex-encoded Subject is reachable by the PDF
		// importer [jgraph/drawio-desktop#2394]
		const pdfBytes = await pdfDoc.save({ useObjectStreams: true });

		return Buffer.from(pdfBytes);
	}

	try
	{
		const pdfDoc = await PDFDocument.create();
		pdfDoc.setCreator('diagrams.net');

		if (xml != null)
		{	
			//Embed diagram XML as file attachment
			await pdfDoc.attach(Buffer.from(xml).toString('base64'), 'diagram.xml', {
				mimeType: 'application/vnd.jgraph.mxfile',
				description: 'Diagram Content'
			  });
		}

		for (var i = 0; i < pdfFiles.length; i++)
		{
			try
			{
				const pdfFile = await PDFDocument.load(pdfFiles[i].buffer);
				const pages = await pdfDoc.copyPages(pdfFile, pdfFile.getPageIndices());
				pages.forEach(p => pdfDoc.addPage(p));
			}
			catch (innerError)
			{
				log.error(`Failed to load PDF part ${i}:`, innerError);
				throw new Error(`Failed to process page ${i+1}. The file may be corrupt.`);
			}
		}

		const pdfBytes = await pdfDoc.save();
        return Buffer.from(pdfBytes);
    }
	catch(e)
	{
        throw new Error('Error during PDF combination: ' + e.message);
    }
}

function htmlEntities(str)
{
	return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;')
		.replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function readPngXml(buffer)
{
	var offset = 8; // Skip PNG signature

	while (offset < buffer.length)
	{
		var length = buffer.readInt32BE(offset);
		offset += 4;
		var type = buffer.toString('ascii', offset, offset + 4);
		offset += 4;

		if (type === 'tEXt' || type === 'zTXt')
		{
			var keyEnd = offset;

			while (keyEnd < offset + length && buffer[keyEnd] !== 0)
			{
				keyEnd++;
			}

			var key = buffer.toString('ascii', offset, keyEnd);

			if (key === 'mxGraphModel')
			{
				if (type === 'zTXt')
				{
					var dataStart = keyEnd + 2; // Skip null + compression method
					var compressed = buffer.subarray(dataStart, offset + length);
					var inflated;

					try
					{
						inflated = zlib.inflateSync(compressed);
					}
					catch (e)
					{
						// Fallback for PNGs produced by the pre-fix CLI which
						// wrote raw deflate instead of zlib datastream
						// [jgraph/drawio-desktop#2425]
						inflated = zlib.inflateRawSync(compressed);
					}

					return decodeURIComponent(inflated.toString());
				}
				else
				{
					return buffer.toString('utf-8', keyEnd + 1, offset + length);
				}
			}
		}

		offset += length + 4; // Skip data + CRC
	}

	return null;
}

function readSvgXml(svgString)
{
	// Extracts content attribute from SVG root element
	var match = /\bcontent="([^"]*)"/.exec(svgString);

	if (match != null && match[1] != null)
	{
		var tmp = match[1];

		// Decode HTML entities
		tmp = tmp.replace(/&lt;/g, '<').replace(/&gt;/g, '>')
			.replace(/&amp;/g, '&').replace(/&quot;/g, '"')
			.replace(/&#39;/g, "'").replace(/&#x27;/g, "'")
			.replace(/&#x2F;/g, '/');

		if (tmp.charAt(0) != '<' && tmp.charAt(0) != '%')
		{
			tmp = Buffer.from(tmp, 'base64').toString('utf-8');
		}

		if (tmp.charAt(0) == '%')
		{
			tmp = decodeURIComponent(tmp);
		}

		if (tmp != null && tmp.length > 0)
		{
			return tmp;
		}
	}

	return null;
}

function readPdfXml(buffer)
{
	var f = buffer.toString('binary');
	var result = null;

	// Extracts Subject or Embedded file attachment from PDF 1.7
	if (f.substring(0, 8) == '%PDF-1.7')
	{
		var blockStart = f.indexOf('EmbeddedFile');

		if (blockStart > -1)
		{
			var streamStart = f.indexOf('stream', blockStart) + 9;
			var fileInfo = f.substring(blockStart, streamStart);

			if (fileInfo.indexOf('application#2Fvnd.jgraph.mxfile') > 0)
			{
				var streamEnd = f.indexOf('endstream', streamStart - 1);

				try
				{
					return zlib.inflateRawSync(
						Buffer.from(f.substring(streamStart, streamEnd), 'binary')).toString();
				}
				catch (e)
				{
					// Continue to next extraction method
				}
			}
		}

		var last = f.indexOf('/ObjStm');

		while (last > 0)
		{
			var streamStart = f.indexOf('stream', last) + 9;
			var streamEnd = f.indexOf('endstream', streamStart - 1);

			try
			{
				var text = zlib.inflateRawSync(
					Buffer.from(f.substring(streamStart, streamEnd), 'binary')).toString();
				var subj = text.indexOf('/Subject <');

				if (subj > 0)
				{
					var temp = text.substring(subj + 14, text.indexOf('>', subj));

					if (temp != null)
					{
						// Convert hex to ASCII
						var str = [];

						for (var n = 0; n < temp.length; n += 2)
						{
							var code = temp.substr(n, 2);

							if (code != '00')
							{
								str.push(String.fromCharCode(parseInt(code, 16)));
							}
						}

						result = str.join('');
					}

					break;
				}
			}
			catch (e)
			{
				// Continue to next object stream
			}

			last = f.indexOf('/ObjStm', last + 1);
		}
	}

	// Extracts subject from PDF 1.4
	if (result == null && f.substring(0, 8) == '%PDF-1.4')
	{
		var check = '/Subject (%3Cmxfile';
		var curline = '';
		var checked = 0;
		var pos = 0;
		var obj = [];
		var buf = null;

		while (pos < f.length)
		{
			var b = f.charCodeAt(pos);
			pos += 1;

			if (b != 10)
			{
				curline += String.fromCharCode(b);
			}

			if (b == check.charCodeAt(checked))
			{
				checked++;
			}
			else
			{
				checked = 0;
			}

			if (checked == check.length)
			{
				var end = f.indexOf('%3C%2Fmxfile%3E', pos) + 15;
				pos -= 9;

				if (end > pos)
				{
					result = f.substring(pos, end);
					break;
				}
			}

			if (b == 10)
			{
				if (curline == 'endobj')
				{
					buf = null;
				}
				else if (curline.substring(curline.length - 3, curline.length) == 'obj' ||
					curline == 'xref' || curline == 'trailer')
				{
					buf = [];
					obj[curline.split(' ')[0]] = buf;
				}
				else if (buf != null)
				{
					buf.push(curline);
				}

				curline = '';
			}
		}

		// Extract XML via references
		if (result == null && obj != null)
		{
			var trailer = obj['trailer'];

			if (trailer != null)
			{
				var arr = /.* \/Info (\d+) (\d+) R/g.exec(trailer.join('\n'));

				if (arr != null && arr.length > 0)
				{
					var info = obj[arr[1]];

					if (info != null)
					{
						arr = /.* \/Subject (\d+) (\d+) R/g.exec(info.join('\n'));

						if (arr != null && arr.length > 0)
						{
							var subj = obj[arr[1]];

							if (subj != null)
							{
								subj = subj.join('\n');
								result = subj.substring(1, subj.length - 1);
							}
						}
					}
				}
			}
		}
	}

	if (result != null)
	{
		result = decodeURIComponent(result.
			replace(/\\\(/g, "(").
			replace(/\\\)/g, ")"));
	}

	return result;
}

function buildHtmlExport(xml, title, options)
{
	var data = {};

	if (options.htmlLinkColor && options.htmlLinkColor !== 'none')
	{
		data.highlight = options.htmlLinkColor;
	}
	else
	{
		data.highlight = '#0000ff';
	}

	if (options.htmlLinkTarget && options.htmlLinkTarget !== 'auto')
	{
		data.target = options.htmlLinkTarget === 'blank' ? '_blank' : '_self';
	}

	if (options.htmlLightbox === false)
	{
		data.lightbox = false;
	}

	data.nav = true;
	data.resize = true;
	data.xml = xml;

	var tb = [];

	if (options.allPages)
	{
		tb.push('pages');
	}

	if (options.pageIndex != null && options.pageIndex >= 0)
	{
		data.page = options.pageIndex;
	}

	if (options.htmlZoom !== false)
	{
		tb.push('zoom');
	}

	if (options.htmlLayers !== false)
	{
		tb.push('layers');
	}

	if (options.htmlTags !== false)
	{
		tb.push('tags');
	}

	if (tb.length > 0)
	{
		if (options.htmlLightbox !== false)
		{
			tb.push('lightbox');
		}

		data.toolbar = tb.join(' ');
	}

	if (options.htmlTheme && options.htmlTheme !== 'auto')
	{
		data['dark-mode'] = options.htmlTheme;
	}

	if (options.htmlEditLink)
	{
		data.edit = options.htmlEditLink;
	}

	var fit = options.htmlFit !== false;

	var div = '<div class="mxgraph" style="' +
		(fit ? 'max-width:100%;' : '') +
		(tb.length > 0 ? 'border:1px solid transparent;' : '') +
		'" data-mxgraph="' + htmlEntities(JSON.stringify(data)) + '"></div>';

	var scriptTag = '<script type="text/javascript" src="https://viewer.diagrams.net/js/viewer-static.min.js"></script>';

	return '<!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=5,IE=9" ><![endif]-->\n' +
		'<!DOCTYPE html>\n<html>\n<head>\n' +
		'<title>' + htmlEntities(title) + '</title>\n' +
		'<meta charset="utf-8"/>\n' +
		'</head>\n<body>\n' + div + '\n' + scriptTag + '\n</body>\n</html>';
}

//TODO Use canvas to export images if math is not used to speedup export (no capturePage). Requires change to export3.html also
function exportDiagram(event, args, directFinalize)
{
	if (event != null && event.senderFrame != null &&
		!validateSender(event.senderFrame)) return null;

	var browser = null;
	
	try
	{
		browser = new BrowserWindow({
			webPreferences: {
				preload: `${__dirname}/electron-preload.js`,
				backgroundThrottling: false,
				contextIsolation: true,
				disableBlinkFeatures: 'Auxclick', // Is this needed?
				// Electron 42 offscreen DPR defaults to 1; force 2 so post-capture img.resize() downsamples [jgraph/drawio-desktop#2422]
				offscreen: { deviceScaleFactor: 2 },
			},
			show : false,
			frame: false,
			enableLargerThanScreen: true,
			transparent: args.format == 'png' && (args.bg == null || args.bg == 'none'),
			parent: windowsRegistry[0] //set parent to first opened window. Not very accurate, but useful when all visible windows are closed
		});

		browser.loadURL(`file://${codeDir}/export3.html`);

		const contents = browser.webContents;

		// Resolved diagram XML reported by the renderer (render-finished). For
		// Mermaid/CSV/layout inputs the CLI never set args.xml (or it's the
		// pre-layout source), so this is preferred when embedding XML (-e).
		var resolvedXml = null;

		contents.on('did-finish-load', function()
	    {
			//Set finalize here since it is call in the reply below
			function finalize()
			{
				browser.destroy();
			};
			
			if (directFinalize === true)
			{
				event.finalize = finalize;
			}
			else
			{
				//Destroy the window after response being received by caller
				ipcMain.once('export-finalize', finalize);
			}

			function renderingFinishHandler(e, renderInfo)
			{
				if (!validateSender(e.senderFrame)) return null;

				if (renderInfo == null)
				{
					event.reply('export-error');
					return;
				}

				if (renderInfo.xml != null)
				{
					resolvedXml = renderInfo.xml;
				}

				var pageCount = renderInfo.pageCount, bounds = null;
				//For some reason, Electron 9 doesn't send this object as is without stringifying. Usually when variable is external to function own scope
				try
				{
					bounds = JSON.parse(renderInfo.bounds);
				}
				catch(e)
				{
					bounds = null;
				}
				
				var pdfOptions = {};
				var hasError = false;
				
				if (bounds == null || bounds.width < 5 || bounds.height < 5) //very small page size never return from printToPDF
				{
					//A workaround to detect errors in the input file or being empty file
					hasError = true;
				}
				else
				{
					pdfOptions = {
						preferCSSPageSize: true,
						printBackground: true
					}
				}
				
				var base64encoded = args.base64 == '1';
				
				if (hasError)
				{
					event.reply('export-error');
				}
				else if (args.format == 'png' || args.format == 'jpg' || args.format == 'jpeg')
				{
					//Adds an extra pixel to prevent scrollbars from showing
					var newBounds = {width: Math.ceil(bounds.width + bounds.x) + 1, height: Math.ceil(bounds.height + bounds.y) + 1};
					browser.setBounds(newBounds);
					
					//TODO The browser takes sometime to show the graph (also after resize it takes some time to render)
					//	 	1 sec is most probably enough (for small images, 5 for large ones) BUT not a stable solution
					setTimeout(function()
					{
						browser.capturePage().then(function(img)
						{
							//Image is double the given bounds, so resize is needed!
							var tScale = 1;

							//If user defined width and/or height, enforce it precisely here. Height override width
							if (args.h)
							{
								tScale = args.h / newBounds.height;
							}
							else if (args.w)
							{
								tScale = args.w / newBounds.width;
							}
							
							newBounds.width *= tScale;
							newBounds.height *= tScale;
							img = img.resize(newBounds);

							var data = args.format == 'png'? img.toPNG() : img.toJPEG(args.jpegQuality || 90);
							
							if (args.dpi != null && args.format == 'png')
							{
								data = writePngWithText(data, 'dpi', args.dpi);
							}
							
							var embedSource = (resolvedXml != null) ? resolvedXml : args.xml;

							if (args.embedXml == "1" && args.format == 'png' && embedSource != null)
							{
								data = writePngWithText(data, "mxGraphModel", embedSource, true,
										base64encoded);
							}
							else
							{
								if (base64encoded)
								{
									data = data.toString('base64');
								}
							}
							
							event.reply('export-success', data);
						});
					}, bounds.width * bounds.height < LARGE_IMAGE_AREA? 1000 : 5000);
				}
				else if (args.format == 'pdf')
				{
					if (args.print)
					{
						pdfOptions = {
							// scaleFactor is an integer percent in Chromium (Electron 41+ honors
							// it in the native macOS print dialog), so pageScale 1 = 100%, not 1%.
							scaleFactor: 100 * (args.pageScale || 1),
							printBackground: true,
							pageSize : {
								width: args.pageWidth * MICRON_TO_PIXEL,
								//This height adjustment fixes the output. TODO Test more cases
								height: (args.pageHeight * 1.025) * MICRON_TO_PIXEL
							},
							margins: {
								marginType: 'none' // no margin
							}
						};
						
						contents.print(pdfOptions, (success, errorType) => 
						{
							//Consider all as success
							event.reply('export-success', {});
							// Notify the user with an error if it fails
							if (!success && errorType != 'Print job canceled')
							{
								dialog.showMessageBox(null, {
									type: 'error',
									title: 'Printing Error',
									message: 'There was an error printing. ' + errorType
								});
							}
						});
					}
					else
					{
						contents.printToPDF(pdfOptions).then(async (data) =>
						{
							// The render above already produced a single PDF for the
							// whole page range (or all pages) with cross-page links
							// intact. We merge it as-is to normalize the PDF and embed
							// the diagram XML. Previously the remaining pages of a range
							// were re-rendered one at a time and appended, which added
							// duplicate trailing pages and broke internal hyperlinks
							// [jgraph/drawio-desktop#2170]. "All Pages" was unaffected
							// because its from/to collapsed to one page, exiting the loop
							// after the first full-document render.
							data = await mergePdfs([data], args.embedXml == '1' ?
								((resolvedXml != null) ? resolvedXml : args.xml) : null);
							event.reply('export-success', data);
						})
						.catch((error) => 
						{
							event.reply('export-error', error);
						});
					}
				}
				else if (args.format == 'svg')
				{
					contents.send('get-svg-data');
					
					ipcMain.once('svg-data', (e, data) =>
					{
						if (!validateSender(e.senderFrame)) return null;

						event.reply('export-success', data);
					});
				}
				else
				{
					event.reply('export-error', 'Error: Unsupported format');
				}
			};
			
			ipcMain.once('render-finished', renderingFinishHandler);

			if (args.format == 'xml')
			{
				ipcMain.once('xml-data', (e, data) =>
				{
					if (!validateSender(e.senderFrame)) return null;

					event.reply('export-success', data);
				});
				
				ipcMain.once('xml-data-error', (e) =>
				{
					if (!validateSender(e.senderFrame)) return null;

					event.reply('export-error');
				});
			}
			
			args.border = args.border || 0;
			args.scale = args.scale || 1;
			
			if (args.filename != null && args.filename != '')
			{
				var filename = decodeURIComponent(args.filename);

				if (filename.substring(filename.length - 4) == '.pdf')
				{
					filename = filename.substring(0, filename.length - 4);
				}

				if (filename.substring(filename.length - 7) == '.drawio')
				{
					filename = filename.substring(0, filename.length - 7);
				}

				args.fileTitle = filename;
			}
			
			contents.send('render', args);
	    });
	}
	catch (e)
	{
		if (browser != null)
		{
			browser.destroy();
		}

		event.reply('export-error', e);
		console.log('export-error', e);
	}
};

ipcMain.on('export', exportDiagram);

//================================================================
// Renderer Helper functions
//================================================================

const { O_SYNC, O_CREAT, O_WRONLY, O_TRUNC, O_RDONLY } = fs.constants;
const DRAFT_PREFEX = '.$';
const OLD_DRAFT_PREFEX = '~$';
const DRAFT_EXT = '.dtmp';
const BKP_PREFEX = '.$';
const OLD_BKP_PREFEX = '~$';
const BKP_EXT = '.bkp';

/**
 * Checks the file content type
 * Confirm content is xml, json, pdf, png, jpg, svg, vsdx ...
 */
function checkFileContent(body, enc)
{
	if (body != null)
	{
		let head, headBinay;
		
		if (typeof body === 'string')
		{
			if (enc === 'base64')
			{
				headBinay = Buffer.from(body.substring(0, 22), 'base64');
				head = headBinay.toString();
			}
			else
			{
				head = body.substring(0, 16);
				headBinay = Buffer.from(head);
			}
		}
		else
		{
			head = new TextDecoder("utf-8").decode(body.subarray(0, 16));
			headBinay = body;
		}
		
		let c1 = head[0],
		c2 = head[1],
		c3 = head[2],
		c4 = head[3],
		c5 = head[4],
		c6 = head[5],
		c7 = head[6],
		c8 = head[7],
		c9 = head[8],
		c10 = head[9],
		c11 = head[10],
		c12 = head[11],
		c13 = head[12],
		c14 = head[13],
		c15 = head[14],
		c16 = head[15];

		let cc1 = headBinay[0],
		cc2 = headBinay[1],
		cc3 = headBinay[2],
		cc4 = headBinay[3],
		cc5 = headBinay[4],
		cc6 = headBinay[5],
		cc7 = headBinay[6],
		cc8 = headBinay[7],
		cc9 = headBinay[8],
		cc10 = headBinay[9],
		cc11 = headBinay[10],
		cc12 = headBinay[11],
		cc13 = headBinay[12],
		cc14 = headBinay[13],
		cc15 = headBinay[14],
		cc16 = headBinay[15];

		if (c1 == '<')
		{
			// text/html
			if (c2 == '!'
					|| ((c2 == 'h'
							&& (c3 == 't' && c4 == 'm' && c5 == 'l'
									|| c3 == 'e' && c4 == 'a' && c5 == 'd')
							|| (c2 == 'b' && c3 == 'o' && c4 == 'd'
									&& c5 == 'y')))
					|| ((c2 == 'H'
							&& (c3 == 'T' && c4 == 'M' && c5 == 'L'
									|| c3 == 'E' && c4 == 'A' && c5 == 'D')
							|| (c2 == 'B' && c3 == 'O' && c4 == 'D'
									&& c5 == 'Y'))))
			{
				return true;
			}

			// application/xml
			if (c2 == '?' && c3 == 'x' && c4 == 'm' && c5 == 'l'
					&& c6 == ' ')
			{
				return true;
			}
			
			// application/svg+xml
			if (c2 == 's' && c3 == 'v' && c4 == 'g' && c5 == ' ')
			{
				return true;
			}

			// Embed cases img and iframe
			if (c2 == 'i' && c3 == 'm' && c4 == 'g' && c5 == ' '
					|| (c2 == 'i' && c3 == 'f' && c4 == 'r' && c5 == 'a'
							&& c6 == 'm' && c7 == 'e' && c8 == ' '))
			{
				return true;
			}
		}

		// big and little (identical) endian UTF-8 encodings, with BOM
		// application/xml
		if (cc1 == 0xef && cc2 == 0xbb && cc3 == 0xbf)
		{
			if (c4 == '<' && c5 == '?' && c6 == 'x')
			{
				return true;
			}
		}

		// big and little endian UTF-16 encodings, with byte order mark
		// application/xml
		if (cc1 == 0xfe && cc2 == 0xff)
		{
			if (cc3 == 0 && c4 == '<' && cc5 == 0 && c6 == '?' && cc7 == 0
					&& c8 == 'x')
			{
				return true;
			}
		}

		// application/xml
		if (cc1 == 0xff && cc2 == 0xfe)
		{
			if (c3 == '<' && cc4 == 0 && c5 == '?' && cc6 == 0 && c7 == 'x'
					&& cc8 == 0)
			{
				return true;
			}
		}

		// big and little endian UTF-32 encodings, with BOM
		// application/xml
		if (cc1 == 0x00 && cc2 == 0x00 && cc3 == 0xfe && cc4 == 0xff)
		{
			if (cc5 == 0 && cc6 == 0 && cc7 == 0 && c8 == '<' && cc9 == 0
					&& cc10 == 0 && cc11 == 0 && c12 == '?' && cc13 == 0
					&& cc14 == 0 && cc15 == 0 && c16 == 'x')
			{
				return true;
			}
		}

		// application/xml
		if (cc1 == 0xff && cc2 == 0xfe && cc3 == 0x00 && cc4 == 0x00)
		{
			if (c5 == '<' && cc6 == 0 && cc7 == 0 && cc8 == 0 && c9 == '?'
					&& cc10 == 0 && cc11 == 0 && cc12 == 0 && c13 == 'x'
					&& cc14 == 0 && cc15 == 0 && cc16 == 0)
			{
				return true;
			}
		}

		// application/pdf (%PDF-)
		if (cc1 == 37 && cc2 == 80 && cc3 == 68 && cc4 == 70 && cc5 == 45)
		{
			return true;
		}

		// image/png
		if ((cc1 == 137 && cc2 == 80 && cc3 == 78 && cc4 == 71 && cc5 == 13
				&& cc6 == 10 && cc7 == 26 && cc8 == 10) ||
			(cc1 == 194 && cc2 == 137 && cc3 == 80 && cc4 == 78 && cc5 == 71 && cc6 == 13 //Our embedded PNG+XML
				&& cc7 == 10 && cc8 == 26 && cc9 == 10))
		{
			return true;
		}

		// image/jpeg
		if (cc1 == 0xFF && cc2 == 0xD8 && cc3 == 0xFF)
		{
			if (cc4 == 0xE0 || cc4 == 0xEE)
			{
				return true;
			}

			/**
			 * File format used by digital cameras to store images.
			 * Exif Format can be read by any application supporting
			 * JPEG. Exif Spec can be found at:
			 * http://www.pima.net/standards/it10/PIMA15740/Exif_2-1.PDF
			 */
			if ((cc4 == 0xE1) && (c7 == 'E' && c8 == 'x' && c9 == 'i'
					&& c10 == 'f' && cc11 == 0))
			{
				return true;
			}
		}

		// image/webp
		if (cc1 == 0x52 && cc2 == 0x49 && cc3 == 0x46 && cc4 == 0x46)	//RIFF
		{
			if (cc9 == 0x57 && cc10 == 0x45 && cc11 == 0x42 && cc12 == 0x50) //WEBP
			{
				return true;
			}
		}

		// vsdx, vssx (also zip, jar, odt, ods, odp, docx, xlsx, pptx, apk, aar)
		if (cc1 == 0x50 && cc2 == 0x4B && cc3 == 0x03 && cc4 == 0x04)
		{
			return true;
		}
		else if (cc1 == 0x50 && cc2 == 0x4B && cc3 == 0x03 && cc4 == 0x06)
		{
			return true;
		}

		// json
		if (c1 == '{' || c1 == '[')
		{
			return true;
		}
		
		// mxfile, mxlibrary, mxGraphModel
		if (c1 == '<' && c2 == 'm' && c3 == 'x')
		{
			return true;
		}
	}

	return false;
};

function isConflict(origStat, stat)
{
	return stat != null && origStat != null && stat.mtimeMs != origStat.mtimeMs;
};

function reqStr(v, name)
{
	if (typeof v !== 'string' || !v)
	{
		throw new Error('bad arg: ' + name);
	}

	return v;
}

// Returns true if `realpath` is a draft- or backup-naming variant of any path
// in blessedPaths (same directory, basename starts with DRAFT_PREFEX +
// origBasename or BKP_PREFEX + origBasename). Drafts and backups are
// derivative — drawio writes them as siblings of files the user opened.
function isDraftOrBkpOfBlessed(realpath)
{
	const dir = path.dirname(realpath);
	const base = path.basename(realpath);

	for (const blessed of blessedPaths)
	{
		if (path.dirname(blessed) !== dir) continue;

		const blessedBase = path.basename(blessed);

		if (base.startsWith(DRAFT_PREFEX + blessedBase) ||
			base.startsWith(OLD_DRAFT_PREFEX + blessedBase) ||
			base.startsWith(BKP_PREFEX + blessedBase) ||
			base.startsWith(OLD_BKP_PREFEX + blessedBase))
		{
			return true;
		}
	}

	return false;
}

// The renderer is semi-untrusted: it parses attacker-controlled diagram XML,
// .vsdx, SVG, Mermaid, etc. validateSender is necessary but not sufficient,
// because a renderer-side XSS attacker would also pass it. So write-side IPC
// handlers must additionally confirm the requested path is one the user has
// authorised through OS chrome (file picker, file association, argv) — see
// blessPath. This function realpath-canonicalises the requested path
// (defeating symlink traversal) and accepts only paths in blessedPaths or
// their draft/backup siblings.
async function assertWritablePath(p)
{
	if (typeof p !== 'string' || !p || p.includes('\0'))
	{
		throw new Error('path not authorised');
	}

	const resolved = path.resolve(p);
	let realpath;

	try
	{
		realpath = await fsProm.realpath(resolved);
	}
	catch (e)
	{
		// File doesn't exist yet (e.g. Save As to a new file). Canonicalise
		// the parent directory so symlinks in the directory chain are still
		// resolved.
		try
		{
			const parentReal = await fsProm.realpath(path.dirname(resolved));
			realpath = path.join(parentReal, path.basename(resolved));
		}
		catch (e2)
		{
			// Neither the file nor its parent could be realpath-canonicalised.
			// This happens on filesystems whose driver doesn't support the
			// underlying call (e.g. WinFSP "local" / Cryptomator, some FUSE
			// mounts), not just on missing paths. realpath is a defence-in-depth
			// measure against symlink traversal; when it's simply unavailable we
			// must not deny an otherwise-blessed write, so fall back to the
			// lexically-resolved path. blessedPaths is still consulted below, so
			// only paths the user authorised through trusted UI are accepted.
			realpath = resolved;
		}
	}

	if (realpath.startsWith(appBaseDir))
	{
		throw new Error('path not authorised');
	}

	// Block writes anywhere inside userData (settings store, plugins, Local
	// Storage). installPlugin has its own write-into-userData flow and is
	// out of scope here; it does not go through assertWritablePath.
	let userDataDir;

	try
	{
		userDataDir = path.resolve(app.getPath('userData'));
	}
	catch (e)
	{
		userDataDir = null;
	}

	if (userDataDir && (realpath === userDataDir ||
		realpath.startsWith(userDataDir + path.sep)))
	{
		throw new Error('path not authorised');
	}

	if (blessedPaths.has(realpath) || blessedPaths.has(resolved))
	{
		return;
	}

	if (isDraftOrBkpOfBlessed(realpath) || isDraftOrBkpOfBlessed(resolved))
	{
		return;
	}

	throw new Error('path not authorised');
};

function getDraftFileName(fileObject)
{
	let filePath = fileObject.path;
	let draftFileName = '', counter = 1, uniquePart = '';

	do
	{
		draftFileName = path.join(path.dirname(filePath), DRAFT_PREFEX + path.basename(filePath) + uniquePart + DRAFT_EXT);
		uniquePart = '_' + counter++;
	} while (fs.existsSync(draftFileName));

	return draftFileName;
};

async function getFileDrafts(fileObject)
{
	let filePath = fileObject.path;
	let draftsPaths = [], drafts = [], draftFileName, counter = 1, uniquePart = '';

	do
	{
		draftsPaths.push(draftFileName);
		draftFileName = path.join(path.dirname(filePath), DRAFT_PREFEX + path.basename(filePath) + uniquePart + DRAFT_EXT);
		uniquePart = '_' + counter++;
	} while (fs.existsSync(draftFileName)); //TODO this assume continuous drafts names

	//Port old draft files to new prefex
	counter = 1;
	uniquePart = '';
	let draftExists = false;

	do
	{
		draftFileName = path.join(path.dirname(filePath), OLD_DRAFT_PREFEX + path.basename(filePath) + uniquePart + DRAFT_EXT);
		draftExists = fs.existsSync(draftFileName);
		
		if (draftExists)
		{
			const newDraftFileName = path.join(path.dirname(filePath), DRAFT_PREFEX + path.basename(filePath) + uniquePart + DRAFT_EXT);
			await fsProm.rename(draftFileName, newDraftFileName);
			draftsPaths.push(newDraftFileName);
		}

		uniquePart = '_' + counter++;
	} while (draftExists); //TODO this assume continuous drafts names

	//Skip the first null element
	for (let i = 1; i < draftsPaths.length; i++)
	{
		try
		{
			let stat = await fsProm.lstat(draftsPaths[i]);
			drafts.push({data: await fsProm.readFile(draftsPaths[i], 'utf8'), 
						created: stat.ctimeMs,
						modified: stat.mtimeMs,
						path: draftsPaths[i]});
		}
		catch (e){} // Ignore
	}

	return drafts;
};

async function saveDraft(fileObject, data)
{
	var draftFileName = fileObject.draftFileName || getDraftFileName(fileObject);

	if (!checkFileContent(data))
	{
		throw new Error('Invalid file data');
	}

	await assertWritablePath(draftFileName);

	let draftFh;

	try
	{
		draftFh = await fsProm.open(draftFileName, O_SYNC | O_CREAT | O_WRONLY | O_TRUNC);
		await fsProm.writeFile(draftFh, data, 'utf8');
		await draftFh.sync(); // Flush to disk
	}
	finally
	{
		await draftFh?.close();
	}

	if (isWin)
	{
		try
		{
			// Add Hidden attribute:
			var child = spawn('attrib', ['+h', draftFileName]);
			child.on('error', function(err)
			{
				console.log('hiding draft file error: ' + err);
			});
		} catch(e) {}
	}

	return draftFileName;
}

// Reads the .bkp backup written before the last overwrite (see saveFile),
// used for best-effort recovery when the main file fails to load. Returns
// {data, created, modified, path} or null if no readable backup exists.
async function getBkpFile(fileObject)
{
	let filePath = fileObject.path;
	let bkpPaths = [
		path.join(path.dirname(filePath), BKP_PREFEX + path.basename(filePath) + BKP_EXT),
		path.join(path.dirname(filePath), OLD_BKP_PREFEX + path.basename(filePath) + BKP_EXT)
	];

	for (let i = 0; i < bkpPaths.length; i++)
	{
		try
		{
			let stat = await fsProm.lstat(bkpPaths[i]);
			return {data: await fsProm.readFile(bkpPaths[i], 'utf8'),
					created: stat.ctimeMs,
					modified: stat.mtimeMs,
					path: bkpPaths[i]};
		}
		catch (e){} // Ignore, try next prefix / no backup
	}

	return null;
};

async function saveFile(fileObject, data, origStat, overwrite, defEnc)
{
	if (!checkFileContent(data))
	{
		throw new Error('Invalid file data');
	}

	if (fileObject == null || typeof fileObject.path !== 'string')
	{
		throw new Error('bad arg: fileObject.path');
	}

	await assertWritablePath(fileObject.path);

	var retryCount = 0;
	var backupCreated = false;
	var bkpPath = path.join(path.dirname(fileObject.path), BKP_PREFEX + path.basename(fileObject.path) + BKP_EXT);
	const oldBkpPath = path.join(path.dirname(fileObject.path), OLD_BKP_PREFEX + path.basename(fileObject.path) + BKP_EXT);
	var writeEnc = defEnc || fileObject.encoding;

	// Backup paths are derived siblings of fileObject.path, so they pass the
	// draft/bkp carve-out — but realpath them anyway in case symlinks have
	// been planted at those names.
	await assertWritablePath(bkpPath);

	var writeFile = async function()
	{
		let fh;

		try
		{
			// O_SYNC is for sync I/O and reduce risk of file corruption
			fh = await fsProm.open(fileObject.path, O_SYNC | O_CREAT | O_WRONLY | O_TRUNC);
			await fsProm.writeFile(fh, data, writeEnc);
			await fh.sync(); // Flush to disk
		}
		finally
		{
			await fh?.close();
		}

		let stat2 = await fsProm.stat(fileObject.path);
		// Workaround for possible writing errors is to check the written
		// contents of the file and retry 3 times before showing an error
		let writtenData = await fsProm.readFile(fileObject.path, writeEnc);
		
		if (data != writtenData)
		{
			retryCount++;
			
			if (retryCount < 3)
			{
				return await writeFile();
			}
			else
			{
				throw new Error('all saving trials failed');
			}
		}
		else
		{
			//We'll keep the backup file in case the original file is corrupted. TODO When should we delete the backup file?
			if (backupCreated)
			{
				//fs.unlink(bkpPath, (err) => {}); //Ignore errors!

				//Delete old backup file with old prefix
				if (fs.existsSync(oldBkpPath))
				{
					try
					{
						await assertWritablePath(oldBkpPath);
						fs.unlink(oldBkpPath, (err) => {}); //Ignore errors
					}
					catch (e) {} //Ignore — path failed authorisation, skip cleanup.
				}
			}

			return stat2;
		}
	};
	
	async function doSaveFile(isNew)
	{
		if (enableStoreBkp && !isNew)
		{
			//Copy file to backup file (after conflict and stat is checked)
			let bkpFh;

			try
			{
				//Use file read then write to open the backup file direct sync write to reduce the chance of file corruption
				let fileContent = await fsProm.readFile(fileObject.path, writeEnc);
				bkpFh = await fsProm.open(bkpPath, O_SYNC | O_CREAT | O_WRONLY | O_TRUNC);
				await fsProm.writeFile(bkpFh, fileContent, writeEnc);
				await bkpFh.sync(); // Flush to disk
				backupCreated = true;
			}
			catch (e) 
			{
				if (__DEV__)
				{
					console.log('Backup file writing failed', e); //Ignore
				}
			}
			finally 
			{
				await bkpFh?.close();

				if (isWin)
				{
					try
					{
						// Add Hidden attribute:
						var child = spawn('attrib', ['+h', bkpPath]);
						child.on('error', function(err) 
						{
							console.log('hiding backup file error: ' + err);
						});
					} catch(e) {}
				}
			}
		}

		return await writeFile();
	};
	
	if (overwrite)
	{
		return await doSaveFile(true);
	}
	else
	{
		let stat = fs.existsSync(fileObject.path)?
					await fsProm.stat(fileObject.path) : null;

		if (stat && isConflict(origStat, stat))
		{
			throw new Error('conflict');
		}
		else
		{
			return await doSaveFile(stat == null);
		}
	}
};

async function writeFile(filePath, data, enc)
{
	if (!checkFileContent(data, enc))
	{
		throw new Error('Invalid file data');
	}

	await assertWritablePath(filePath);

	let fh;

	try
	{
		// O_SYNC is for sync I/O and reduce risk of file corruption
		fh = await fsProm.open(filePath, O_SYNC | O_CREAT | O_WRONLY | O_TRUNC);
		await fsProm.writeFile(fh, data, enc);
		await fh.sync(); // Flush to disk
	}
	finally
	{
		await fh?.close();
	}
};

function getAppDataFolder()
{
	try
	{
		var appDataDir = app.getPath('appData');
		var drawioDir = appDataDir + '/draw.io';
		
		if (!fs.existsSync(drawioDir)) //Usually this dir already exists
		{
			fs.mkdirSync(drawioDir);
		}
		
		return drawioDir;
	}
	catch(e) {}
	
	return '.';
};

function getDocumentsFolder()
{
	//On windows, misconfigured Documents folder cause an exception
	try
	{
		return app.getPath('documents');
	}
	catch(e) {}
	
	return '.';
};

function checkFileExists(pathParts)
{
	let filePath = path.join(...pathParts);
	return {exists: fs.existsSync(filePath), path: filePath};
};

async function showOpenDialog(defaultPath, filters, properties)
{
	let win = BrowserWindow.getFocusedWindow();

	const result = await dialog.showOpenDialog(win, {
		defaultPath: defaultPath,
		filters: filters,
		properties: properties
	});

	if (!result.canceled && Array.isArray(result.filePaths))
	{
		for (const fp of result.filePaths)
		{
			blessPath(fp);
		}
	}

	return result;
};

async function showSaveDialog(defaultPath, filters)
{
	let win = BrowserWindow.getFocusedWindow();

	const result = await dialog.showSaveDialog(win, {
		defaultPath: defaultPath,
		filters: filters
	});

	if (!result.canceled)
	{
		blessPath(result.filePath);
	}

	return result;
};

async function installPlugin(filePath)
{
	if (!enablePlugins) return {};

	var pluginsDir = path.join(getAppDataFolder(), '/plugins');
	
	if (!fs.existsSync(pluginsDir))
	{
		fs.mkdirSync(pluginsDir);
	}
	
	var pluginName = path.basename(filePath);
	var dstFile = path.join(pluginsDir, pluginName);
	
	if (fs.existsSync(dstFile))
	{
		throw new Error('fileExists');
	}
	else
	{
		await fsProm.copyFile(filePath, dstFile);
	}

	return {pluginName: pluginName, selDir: path.dirname(filePath)};
}

function getPluginFile(plugin)
{
	if (!enablePlugins) return null;
	
	const prefix = path.join(getAppDataFolder(), '/plugins/');
	const pluginFile = path.join(prefix, plugin);
	        	
	if (pluginFile.startsWith(prefix) && fs.existsSync(pluginFile))
	{
		return pluginFile;
	}

	return null;
}

function uninstallPlugin(plugin)
{
	const pluginFile = getPluginFile(plugin);
	        	
	if (pluginFile != null)
	{
		fs.unlinkSync(pluginFile);
	}
}

function dirname(path_p)
{
	return path.dirname(path_p);
}

async function readFile(filename, encoding)
{
	let data = await fsProm.readFile(filename, encoding);

	// Mermaid (.mmd/.mermaid) files are plain text that checkFileContent does
	// not recognise as a known diagram format; allow them through by extension
	// (the renderer converts them to a diagram on open). The appBaseDir guard
	// below still applies.
	let isMermaid = /\.(mmd|mermaid)$/i.test(filename);

	if ((checkFileContent(data, encoding) || isMermaid) &&
		!path.resolve(filename).startsWith(appBaseDir))
	{
		return data;
	}

	throw new Error('Invalid file data');
}

async function fileStat(file)
{
	return await fsProm.stat(file);
}

async function isFileWritable(file)
{
	try 
	{
		await fsProm.access(file, fs.constants.W_OK);
		return true;
	}
	catch (e)
	{
		return false;
	}
}

function clipboardAction(method, data)
{
	if (method == 'writeText')
	{
		clipboard.writeText(data);
	}
	else if (method == 'readText')
	{
		return clipboard.readText();
	}
	else if (method == 'writeImage')
	{
		clipboard.write({image: 
			nativeImage.createFromDataURL(data.dataUrl), html: '<img src="' +
			data.dataUrl + '" width="' + data.w + '" height="' + data.h + '">'});
	}
}

async function deleteFile(file)
{
	await assertWritablePath(file);

	// Reading the header of the file to confirm it is a file we can delete
	let fh = await fsProm.open(file, O_RDONLY);
	let buffer = Buffer.allocUnsafe(16);
	await fh.read(buffer, 0, 16);
	await fh.close();

	if (checkFileContent(buffer))
	{
		await fsProm.unlink(file);
	}
}

function windowAction(method)
{
	let win = BrowserWindow.getFocusedWindow();

	if (win)
	{
		if (method == 'minimize')
		{
			win.minimize();
		}
		else if (method == 'maximize')
		{
			win.maximize();
		}
		else if (method == 'unmaximize')
		{
			win.unmaximize();
		}
		else if (method == 'close')
		{
			win.close();
		}
		else if (method == 'isMaximized')
		{
			return win.isMaximized();
		}
		else if (method == 'removeAllListeners')
		{
			win.removeAllListeners();
		}
	}
}

const allowedUrls = /^(?:https?|mailto|tel|callto):/i;

function openExternal(url)
{
	//Only open http(s), mailto, tel, and callto links
	if (allowedUrls.test(url))
	{
		shell.openExternal(url);
		return true;
	}

	return false;
}

function watchFile(filePath)
{
	let win = BrowserWindow.getFocusedWindow();

	if (win)
	{
		fs.watchFile(filePath, (curr, prev) => {
			try
			{
				win.webContents.send('fileChanged', {
					path: filePath,
					curr: curr,
					prev: prev
				});
			}
			catch (e) {} // Ignore
		});
	}
}

function unwatchFile(filePath)
{
	fs.unwatchFile(filePath);
}

function getLocalFonts()
{
	return new Promise((resolve) =>
	{
		let cmd;

		if (process.platform === 'win32')
		{
			cmd = 'powershell -NoProfile -command "Add-Type -AssemblyName System.Drawing; (New-Object System.Drawing.Text.InstalledFontCollection).Families | ForEach-Object { $_.Name }"';
		}
		else
		{
			cmd = 'fc-list --format="%{family[0]}\\n"';
		}

		exec(cmd, {encoding: 'utf8', timeout: 30000}, (err, stdout) =>
		{
			if (err)
			{
				resolve([]);
				return;
			}

			let fonts = stdout.split('\n')
				.map(f => f.trim())
				.filter(f => f.length > 0);
			fonts = [...new Set(fonts)].sort(
				(a, b) => a.localeCompare(b));
			resolve(fonts);
		});
	});
}

ipcMain.on("rendererReq", async (event, args) =>
{
	if (!validateSender(event.senderFrame)) return null;

	try
	{
		let ret = null;

		switch(args.action)
		{
		case 'saveFile':
			if (args.fileObject == null) throw new Error('bad arg: fileObject');
			reqStr(args.fileObject.path, 'fileObject.path');
			ret = await saveFile(args.fileObject, args.data, args.origStat, args.overwrite, args.defEnc);
			break;
		case 'writeFile':
			reqStr(args.path, 'path');
			ret = await writeFile(args.path, args.data, args.enc);
			break;
		case 'saveDraft':
			if (args.fileObject == null) throw new Error('bad arg: fileObject');
			reqStr(args.fileObject.path, 'fileObject.path');
			ret = await saveDraft(args.fileObject, args.data);
			break;
		case 'getFileDrafts':
			if (args.fileObject == null) throw new Error('bad arg: fileObject');
			reqStr(args.fileObject.path, 'fileObject.path');
			ret = await getFileDrafts(args.fileObject);
			break;
		case 'getBkpFile':
			if (args.fileObject == null) throw new Error('bad arg: fileObject');
			reqStr(args.fileObject.path, 'fileObject.path');
			ret = await getBkpFile(args.fileObject);
			break;
		case 'getDocumentsFolder':
			ret = await getDocumentsFolder();
			break;
		case 'checkFileExists':
			ret = await checkFileExists(args.pathParts);
			break;
		case 'showOpenDialog':
			dialogOpen = true;
			ret = await showOpenDialog(args.defaultPath, args.filters, args.properties);
			ret = ret.filePaths;
			dialogOpen = false;
			break;
		case 'showSaveDialog':
			dialogOpen = true;
			ret = await showSaveDialog(args.defaultPath, args.filters);
			ret = ret.canceled? null : ret.filePath;
			dialogOpen = false;
			break;
		case 'installPlugin':
			reqStr(args.filePath, 'filePath');
			ret = await installPlugin(args.filePath);
			break;
		case 'uninstallPlugin':
			reqStr(args.plugin, 'plugin');
			ret = await uninstallPlugin(args.plugin);
			break;
		case 'getPluginFile':
			reqStr(args.plugin, 'plugin');
			ret = await getPluginFile(args.plugin);
			break;
		case 'isPluginsEnabled':
			ret = enablePlugins;
			break;
		case 'dirname':
			reqStr(args.path, 'path');
			ret = await dirname(args.path);
			break;
		case 'readFile':
			reqStr(args.filename, 'filename');
			ret = await readFile(args.filename, args.encoding);
			break;
		case 'clipboardAction':
			ret = await clipboardAction(args.method, args.data);
			break;
		case 'deleteFile':
			reqStr(args.file, 'file');
			ret = await deleteFile(args.file);
			break;
		case 'fileStat':
			reqStr(args.file, 'file');
			ret = await fileStat(args.file);
			break;
		case 'isFileWritable':
			reqStr(args.file, 'file');
			ret = await isFileWritable(args.file);
			break;
		case 'windowAction':
			ret = await windowAction(args.method);
			break;
		case 'openExternal':
			ret = await openExternal(args.url);
			break;
		case 'watchFile':
			reqStr(args.path, 'path');
			ret = await watchFile(args.path);
			break;
		case 'unwatchFile':
			reqStr(args.path, 'path');
			ret = await unwatchFile(args.path);
			break;
		case 'exit':
			app.quit();
			break;
		case 'getLocalFonts':
			ret = await getLocalFonts();
			break;
		case 'isFullscreen':
			ret = BrowserWindow.getFocusedWindow()?.isFullScreen() ?? false;
			break;
		};

		event.reply('mainResp', {success: true, data: ret, reqId: args.reqId});
	}
	catch (e)
	{
		event.reply('mainResp', {error: true, msg: e.message, e: e, reqId: args.reqId});
	}
});