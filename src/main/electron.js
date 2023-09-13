const fs = require('fs')
const fsProm = require('fs/promises');
const os = require('os');
const path = require('path')
const url = require('url')
const {Menu: menu, shell, dialog, session,
		clipboard, nativeImage, ipcMain, app, BrowserWindow} = require('electron')
const crc = require('crc');
const zlib = require('zlib');
const log = require('electron-log')
const program = require('commander')
const {autoUpdater} = require("electron-updater")
const PDFDocument = require('pdf-lib').PDFDocument;
const Store = require('electron-store');
const store = new Store();
const ProgressBar = require('electron-progressbar');
const spawn = require('child_process').spawn;
const disableUpdate = require('./disableUpdate').disableUpdate() || 
						process.env.DRAWIO_DISABLE_UPDATE === 'true' || 
						fs.existsSync('/.flatpak-info'); //This file indicates running in flatpak sandbox
autoUpdater.logger = log
autoUpdater.logger.transports.file.level = 'info'
autoUpdater.autoDownload = false

//Command option to disable hardware acceleration
if (process.argv.indexOf('--disable-acceleration') !== -1)
{
	app.disableHardwareAcceleration();
}

const __DEV__ = process.env.DRAWIO_ENV === 'dev'
		
let windowsRegistry = []
let cmdQPressed = false
let firstWinLoaded = false
let firstWinFilePath = null
const isMac = process.platform === 'darwin'
const isWin = process.platform === 'win32'
let enableSpellCheck = store.get('enableSpellCheck');
enableSpellCheck = enableSpellCheck != null? enableSpellCheck : isMac;
let enableStoreBkp = store.get('enableStoreBkp') != null? store.get('enableStoreBkp') : true;
let dialogOpen = false;
let enablePlugins = false;
const codeDir = path.join(__dirname, '/../../drawio/src/main/webapp');
const codeUrl = url.pathToFileURL(codeDir).href;
// Production app uses asar archive, so we need to go up two more level. It's extra cautious since asar is read-only anyway.
const appBaseDir = path.join(__dirname, __dirname.endsWith(path.join('resources', 'app.asar', 'src', 'main')) ? 
								'/../../../../' : '/../../');
let appZoom = 1;
// Disabled by default
let isGoogleFontsEnabled = store.get('isGoogleFontsEnabled') != null? store.get('isGoogleFontsEnabled') : false;

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
	return frame.url.startsWith(codeUrl);
}

function createWindow (opt = {})
{
	let lastWinSizeStr = store.get('lastWinSize');
	let lastWinSize = lastWinSizeStr ? lastWinSizeStr.split(',') : [1600, 1200];

	// TODO On some Mac OS, double click the titlebar set incorrect window size
	if (lastWinSize[0] < 500)
	{
		lastWinSize[0] = 500;
	}

	if (lastWinSize[1] < 500)
	{
		lastWinSize[1] = 500;
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
			disableBlinkFeatures: 'Auxclick' // Is this needed?
		}
	}, opt)

	let mainWindow = new BrowserWindow(options)
	windowsRegistry.push(mainWindow)

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
		const size = mainWindow.getSize();
		store.set('lastWinSize', size[0] + ',' + size[1]);

		mainWindow.webContents.send('resize')
	});

	mainWindow.on('close', (event) =>
	{
		const win = mainWindow;
		
		if (__DEV__)
		{
			const index = windowsRegistry.indexOf(win)
			console.log('Window on close', index)
		}
		
		const contents = win.webContents

		if (contents != null)
		{
	        ipcMain.once('isModified-result', async (e, data) =>
			{
				if (!validateSender(e.senderFrame)) return null;

				if (data.isModified)
				{
					// Can't use async function here because it crashes on Linux when win.destroy is called
					let response = dialog.showMessageBoxSync(
						win,
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
							win.destroy();
						}
						else
						{
							contents.send('removeDraft');

							ipcMain.once('draftRemoved', (e) =>
							{
								if (!validateSender(e.senderFrame)) return null;

								win.destroy();
							});
						}
					}
					else
					{
						cmdQPressed = false;
					}
				}
				else
				{
					win.destroy();
				}
			});

			contents.send('isModified');
			event.preventDefault();
		}
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
app.on('ready', e =>
{
	// Enforce our CSP on all contents
	session.defaultSession.webRequest.onHeadersReceived((details, callback) => 
	{
		callback({
			responseHeaders: {
				...details.responseHeaders,
				// Replace the first sha with the one of the current version shown in the console log (the second one is for the second script block which is rarely changed)
				'Content-Security-Policy': ['default-src \'self\'; script-src \'self\' \'sha256-PDJOTCOfwIg8Ri7U2PH1pIpx+haCyKsJEbFxlW6hdSI=\' \'sha256-6g514VrT/cZFZltSaKxIVNFF46+MFaTSDTPB8WfYK+c=\'; connect-src \'self\'' +
				(isGoogleFontsEnabled? ' https://fonts.googleapis.com https://fonts.gstatic.com' : '') + '; img-src * data:; media-src *; font-src *; frame-src \'none\'; style-src \'self\' \'unsafe-inline\'' +
				(isGoogleFontsEnabled? ' https://fonts.googleapis.com' : '') + '; base-uri \'none\';child-src \'self\';object-src \'none\';']
			}
		})
	});

	const pluginsCodeUrl = url.pathToFileURL(path.join(getAppDataFolder(), '/plugins/')).href;

	// Enforce loading file only from our app directory
	session.defaultSession.webRequest.onBeforeRequest({urls: ['file://*']}, (details, callback) =>
	{
		if (!details.url.startsWith(codeUrl) && (!isPluginsEnabled() || (isPluginsEnabled() && !details.url.startsWith(pluginsCodeUrl))))
		{
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

	var validFormatRegExp = /^(pdf|svg|png|jpeg|jpg|vsdx|xml)$/;
	
	function argsRange(val) 
	{
	  return val.split('..').map(Number);
	}
	
	try
	{
		program
	        .version(app.getVersion())
	        .usage('[options] [input file/folder]')
	        .allowUnknownOption() //-h and --help are considered unknown!!
	        .option('-c, --create', 'creates a new empty file if no file is passed')
	        .option('-k, --check', 'does not overwrite existing files')
	        .option('-x, --export', 'export the input file/folder based on the given options')
	        .option('-r, --recursive', 'for a folder input, recursively convert all files in sub-folders also')
	        .option('-o, --output <output file/folder>', 'specify the output file/folder. If omitted, the input file name is used for output with the specified format as extension')
	        .option('-f, --format <format>',
			    'if output file name extension is specified, this option is ignored (file type is determined from output extension, possible export formats are pdf, png, jpg, svg, vsdx, and xml)',
			    validFormatRegExp, 'pdf')
			.option('-q, --quality <quality>',
				'output image quality for JPEG (default: 90)', parseInt)
			.option('-t, --transparent',
				'set transparent background for PNG')
			.option('-e, --embed-diagram',
				'includes a copy of the diagram (for PNG, SVG and PDF formats only)')
			.option('--embed-svg-images',
				'Embed Images in SVG file (for SVG format only)')
			.option('-b, --border <border>',
				'sets the border width around the diagram (default: 0)', parseInt)
			.option('-s, --scale <scale>',
				'scales the diagram size', parseFloat)
			.option('--width <width>',
				'fits the generated image/pdf into the specified width, preserves aspect ratio.', parseInt)
			.option('--height <height>',
				'fits the generated image/pdf into the specified height, preserves aspect ratio.', parseInt)
			.option('--crop',
				'crops PDF to diagram size')
			.option('-a, --all-pages',
				'export all pages (for PDF format only)')
			.option('-p, --page-index <pageIndex>',
				'selects a specific page, if not specified and the format is an image, the first page is selected', parseInt)
			.option('-l, --layers <comma separated layer indexes>',
				'selects which layers to export (applies to all pages), if not specified, all layers are selected')
			.option('-g, --page-range <from>..<to>',
				'selects a page range (for PDF format only)', argsRange)
			.option('-u, --uncompressed',
				'Uncompressed XML output (for XML format only)')
			.option('-z, --zoom <zoom>',
				'scales the application interface', parseFloat)
			.option('--enable-plugins',
				'Enable Plugins')
	        .parse(argv)
	}
	catch(e)
	{
		//On parse error, return [exit and commander will show the error message]
		return;
	}
	
	var options = program.opts();
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
	    	
	    	var from = null, to = null;
	    	
	    	if (options.pageIndex != null && options.pageIndex >= 0)
			{
	    		from = options.pageIndex;
				to = options.pageIndex;
				options.allPages = false;
			}
	    	else if (options.pageRange && options.pageRange.length == 2)
			{
	    		from = options.pageRange[0] >= 0 ? options.pageRange[0] : null;
	    		to = options.pageRange[1] >= 0 ? options.pageRange[1] : null;
				options.allPages = false;
			}

			var expArgs = {
				format: format,
				w: options.width > 0 ? options.width : null,
				h: options.height > 0 ? options.height : null,
				border: options.border > 0 ? options.border : 0,
				bg: options.transparent ? 'none' : '#ffffff',
				from: from,
				to: to,
				allPages: format == 'pdf' && options.allPages,
				scale: (options.crop && (options.scale == null || options.scale == 1)) ? 1.00001: (options.scale || 1), //any value other than 1 crops the pdf
				embedXml: options.embedDiagram? '1' : '0',
				embedImages: options.embedSvgImages? '1' : '0',
				jpegQuality: options.quality,
				uncompressed: options.uncompressed
			};

			if (options.layers)
			{
				expArgs.extras = JSON.stringify({layers: options.layers.split(',')});
			}

			var paths = program.args;
			
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
						stat = fs.statSync(filePath);
						
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
					
					function processOneFile()
					{
						var curFile = files[fileIndex];
						
						try
						{
							var ext = path.extname(curFile);
							
							let fileContent = fs.readFileSync(curFile, ext === '.png' || ext === '.vsdx' ? null : 'utf-8');
							
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
									expArgs.xml = Buffer.from(fileContent).toString('base64');
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
								else
								{
									cmdQPressed = true;
									dummyWin.destroy();
								}
							};
							
							function startExport()
							{
								var mockEvent = {
									reply: function(msg, data)
									{
										try
										{
											if (data == null || data.length == 0)
											{
												console.error('Error: Export failed: ' + curFile);
											}
											else if (msg == 'export-success')
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
													
													if (program.rawArgs.indexOf('-k') > -1 || program.rawArgs.indexOf('--check') > -1)
													{
														while (fs.existsSync(realFileName))
														{
															counter++;
															realFileName = path.join(path.dirname(outFileName), path.basename(outFileName,
																path.extname(outFileName))) + '-' + counter + path.extname(outFileName);
														}
													}
													
													fs.writeFileSync(realFileName, data, format == 'vsdx'? 'base64' : null, { flag: 'wx' });
													console.log(curFile + ' -> ' + realFileName);
												}
												catch(e)
												{
													console.error('Error writing to file: ' + outFileName);
												}
											}
											else
											{
												console.error('Error: ' + data + ': ' + curFile);
											}
											
											next();
										}
										finally
										{
											mockEvent.finalize();
										}
							    	}
								};

								exportDiagram(mockEvent, expArgs, true);
							};
						}
						catch(e)
						{
							console.error('Error reading file: ' + curFile);
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
    		
    		cmdQPressed = true;
			dummyWin.destroy();
    	}
    	
    	return;
	}
    else if (program.rawArgs.indexOf('-h') > -1 || program.rawArgs.indexOf('--help') > -1 || program.rawArgs.indexOf('-V') > -1 || program.rawArgs.indexOf('--version') > -1) //To prevent execution when help/version arg is used
	{
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
	    	    	//Open the file if new app request is from opening a file
	    	    	var potFile = commandLine.pop();
	    	    	
	    	    	if (fs.existsSync(potFile))
	    	    	{
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
			//Sending entire program is not allowed in Electron 9 as it is not native JS object
			win.webContents.send('args-obj', {args: program.args, create: options.create});
		}
	}
	
	//Order of these two events is not guaranteed, so wait for them async.
	//TOOD There is still a chance we catch another window 'app-load-finished' if user created multiple windows quickly 
	ipcMain.once('app-load-finished', loadFinished);

    win.webContents.on('did-finish-load', function()
    {
    	if (firstWinFilePath != null)
		{
    		if (program.args != null)
    		{
    			program.args.push(firstWinFilePath);
    		}
    		else
			{
    			program.args = [firstWinFilePath];
			}
		}
    	
    	firstWinLoaded = true;
    	
        win.webContents.zoomFactor = appZoom;
        win.webContents.setVisualZoomLevelLimits(1, appZoom);
		loadFinished();
    });
	
	function toggleSpellCheck(e)
	{
		if (e != null && !validateSender(e.senderFrame)) return null;

		enableSpellCheck = !enableSpellCheck;
		store.set('enableSpellCheck', enableSpellCheck);
	};

	ipcMain.on('toggleSpellCheck', toggleSpellCheck);

	function toggleStoreBkp(e)
	{
		if (e != null && !validateSender(e.senderFrame)) return null;

		enableStoreBkp = !enableStoreBkp;
		store.set('enableStoreBkp', enableStoreBkp);
	};

	ipcMain.on('toggleStoreBkp', toggleStoreBkp);

	function toggleGoogleFonts(e)
	{
		if (e != null && !validateSender(e.senderFrame)) return null;

		isGoogleFontsEnabled = !isGoogleFontsEnabled;
		store.set('isGoogleFontsEnabled', isGoogleFontsEnabled);
	}

	ipcMain.on('toggleGoogleFonts', toggleGoogleFonts);

    let updateNoAvailAdded = false;
    
	function checkForUpdatesFn(e) 
	{ 
		if (e != null && e.senderFrame != null && 
			!validateSender(e.senderFrame)) return null;

		autoUpdater.checkForUpdates();
		store.set('dontCheckUpdates', false);
		
		if (!updateNoAvailAdded) 
		{
			updateNoAvailAdded = true;
			autoUpdater.on('update-not-available', (info) => {
				dialog.showMessageBox(
					{
						type: 'info',
						title: 'No updates found',
						message: 'Your application is up-to-date',
					})
			})
		}
	};
	
	let checkForUpdates = {
		label: 'Check for updates',
		click: checkForUpdatesFn
	}

	ipcMain.on('checkForUpdates', checkForUpdatesFn);

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
			template[0].submenu.splice(2, 1);
		}
		
		const menuBar = menu.buildFromTemplate(template)
		menu.setApplicationMenu(menuBar)
	}
	else //hide  menubar in win/linux
	{
		menu.setApplicationMenu(null)
	}
	
	autoUpdater.setFeedURL({
		provider: 'github',
		repo: 'drawio-desktop',
		owner: 'jgraph'
	})
	
	if (!disableUpdate && !store.get('dontCheckUpdates'))
	{
		autoUpdater.checkForUpdates()
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

autoUpdater.on('error', e => log.error('@error@\n', e))

autoUpdater.on('update-available', (a, b) =>
{
	log.info('@update-available@\n', a, b)
	
	dialog.showMessageBox(
	{
		type: 'question',
		buttons: ['Ok', 'Cancel', 'Don\'t Ask Again'],
		title: 'Confirm Update',
		message: 'Update available.\n\nWould you like to download and install new version?',
		detail: 'Application will automatically restart to apply update after download',
	}).then( result =>
	{
		if (result.response === 0)
		{
			autoUpdater.downloadUpdate()
			
			var progressBar = new ProgressBar({
				title: 'draw.io Update',
			    text: 'Downloading draw.io update...'
			});
			
			function reportUpdateError(e)
			{
				progressBar.detail = 'Error occurred while fetching updates. ' + (e && e.message? e.message : e)
				progressBar._window.setClosable(true);
			}

			autoUpdater.on('error', e => {
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
			})

			var firstTimeProg = true;
			
			autoUpdater.on('download-progress', (d) => {
				//On mac, download-progress event is not called, so the indeterminate progress will continue until download is finished
				log.info('@update-progress@\n', d);
				
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
								log.info(`progress aborted... ${value}`);
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
			});

		    autoUpdater.on('update-downloaded', (info) => {
				if (!progressBar.isCompleted())
				{
					progressBar.close()
				}
		
				log.info('@update-downloaded@\n', info)
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
						setTimeout(() => autoUpdater.quitAndInstall(), 1)
					}
				})
		    });
		}
		else if (result.response === 2)
		{
			//save in settings don't check for updates
			log.info('@dont check for updates!@')
			store.set('dontCheckUpdates', true)
		}
	})
})

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
		data = zlib.deflateRawSync(encodeURIComponent(text));
		dataLen = key.length + data.length + 2; //we add 2 zeros with compressed data
	}
	
	var outBuff = Buffer.allocUnsafe(origBuff.length + dataLen + 4); //4 is the header size "zTXt", "tEXt" or "pHYs"
	
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
				
				outOffset += 4;

				if (isDpi)
				{
					var dpm = Math.round(parseInt(text) / 0.0254) || 3937; //One inch is equal to exactly 0.0254 meters. 3937 is 100dpi

					outBuff.writeInt32BE(dpm, outOffset);
					outBuff.writeInt32BE(dpm, outOffset + 4);
					outBuff.writeInt8(1, outOffset + 8);
					outOffset += 9;

					data = Buffer.allocUnsafe(9);
					data.writeInt32BE(dpm, 0);
					data.writeInt32BE(dpm, 4);
					data.writeInt8(1, 8);
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
				crcVal = crc.crcjam(typeSignature, crcVal);
				crcVal = crc.crcjam(data, crcVal);

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

//TODO Create a lightweight html file similar to export3.html for exporting to vsdx
function exportVsdx(event, args, directFinalize)
{
	let win = createWindow({
		show : false
	});

	let loadEvtCount = 0;
			
	function loadFinished(e)
	{
		if (e != null && e.senderFrame != null &&
			!validateSender(e.senderFrame)) return null;

		loadEvtCount++;
		
		if (loadEvtCount == 2)
		{
	    	win.webContents.send('export-vsdx', args);
	    	
	        ipcMain.once('export-vsdx-finished', (e, data) =>
			{
				if (!validateSender(e.senderFrame)) return null;

				var hasError = false;
				
				if (data == null)
				{
					hasError = true;
				}
				
				//Set finalize here since it is call in the reply below
				function finalize()
				{
					win.destroy();
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
				
				if (hasError)
				{
					event.reply('export-error');
				}
				else
				{
					event.reply('export-success', data);
				}
			});
		}
	}
	
	//Order of these two events is not guaranteed, so wait for them async.
	//TOOD There is still a chance we catch another window 'app-load-finished' if user created multiple windows quickly 
	ipcMain.once('app-load-finished', loadFinished);
    win.webContents.on('did-finish-load', loadFinished);
};

async function mergePdfs(pdfFiles, xml)
{
	//Pass throgh single files
	if (pdfFiles.length == 1 && xml == null)
	{
		return pdfFiles[0];
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
			const pdfFile = await PDFDocument.load(pdfFiles[i].buffer);
			const pages = await pdfDoc.copyPages(pdfFile, pdfFile.getPageIndices());
			pages.forEach(p => pdfDoc.addPage(p));
		}

		const pdfBytes = await pdfDoc.save();
        return Buffer.from(pdfBytes);
    }
	catch(e)
	{
        throw new Error('Error during PDF combination: ' + e.message);
    }
}

//TODO Use canvas to export images if math is not used to speedup export (no capturePage). Requires change to export3.html also
function exportDiagram(event, args, directFinalize)
{
	if (event != null && event.senderFrame != null &&
		!validateSender(event.senderFrame)) return null;

	if (args.format == 'vsdx')
	{
		exportVsdx(event, args, directFinalize);
		return;
	}
	
	var browser = null;
	
	try
	{
		browser = new BrowserWindow({
			webPreferences: {
				preload: `${__dirname}/electron-preload.js`,
				backgroundThrottling: false,
				contextIsolation: true,
				disableBlinkFeatures: 'Auxclick' // Is this needed?
			},
			show : false,
			frame: false,
			enableLargerThanScreen: true,
			transparent: args.format == 'png' && (args.bg == null || args.bg == 'none'),
			parent: windowsRegistry[0] //set parent to first opened window. Not very accurate, but useful when all visible windows are closed
		});

		browser.loadURL(`file://${codeDir}/export3.html`);

		const contents = browser.webContents;
		var pageByPage = (args.format == 'pdf' && !args.print), from, pdfs;

		if (pageByPage)
		{
			from = args.allPages? 0 : parseInt(args.from || 0);
			to = args.allPages? 1000 : parseInt(args.to || 1000) + 1; //The 'to' will be corrected later
			pdfs = [];

			args.from = from;
			args.to = from;
			args.allPages = false;
		}
			
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
				
				var pdfOptions = {pageSize: 'A4'};
				var hasError = false;
				
				if (bounds == null || bounds.width < 5 || bounds.height < 5) //very small page size never return from printToPDF
				{
					//A workaround to detect errors in the input file or being empty file
					hasError = true;
				}
				else
				{
					pdfOptions = {
						printBackground: true,
						pageSize : {
							width: bounds.width / PIXELS_PER_INCH,
							height: (bounds.height + 2) / PIXELS_PER_INCH //the extra 2 pixels to prevent adding an extra empty page						
						},
						margins: {
							top: 0,
							bottom: 0,
							left: 0,
							right: 0
						} // no margin
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
							
							if (args.embedXml == "1" && args.format == 'png')
							{
								data = writePngWithText(data, "mxGraphModel", args.xml, true,
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
							scaleFactor: args.pageScale,
							printBackground: true,
							pageSize : {
								width: args.pageWidth * MICRON_TO_PIXEL,
								//This height adjustment fixes the output. TODO Test more cases
								height: (args.pageHeight * 1.025) * MICRON_TO_PIXEL
							},
							marginsType: 1 // no margin
						};
						 
						contents.print(pdfOptions, (success, errorType) => 
						{
							//Consider all as success
							event.reply('export-success', {});
						});
					}
					else
					{
						contents.printToPDF(pdfOptions).then(async (data) => 
						{
							pdfs.push(data);
							to = to > pageCount? pageCount : to;
							from++;
							
							if (from < to)
							{
								args.from = from;
								args.to = from;
								ipcMain.once('render-finished', renderingFinishHandler);
								contents.send('render', args);
							}
							else
							{
								data = await mergePdfs(pdfs, args.embedXml == '1' ? args.xml : null);
								event.reply('export-success', data);
							}
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
 * Confirm content is xml, pdf, png, jpg, svg, vsdx ...
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

		// vsdx, vssx (also zip, jar, odt, ods, odp, docx, xlsx, pptx, apk, aar)
		if (cc1 == 0x50 && cc2 == 0x4B && cc3 == 0x03 && cc4 == 0x04)
		{
			return true;
		}
		else if (cc1 == 0x50 && cc2 == 0x4B && cc3 == 0x03 && cc4 == 0x06)
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

	if (!checkFileContent(data) || path.resolve(draftFileName).startsWith(appBaseDir))
	{
		throw new Error('Invalid file data');
	}
	else
	{
		await fsProm.writeFile(draftFileName, data, 'utf8');
		
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
}

async function saveFile(fileObject, data, origStat, overwrite, defEnc)
{
	if (!checkFileContent(data) || path.resolve(fileObject.path).startsWith(appBaseDir))
	{
		throw new Error('Invalid file data');
	}

	var retryCount = 0;
	var backupCreated = false;
	var bkpPath = path.join(path.dirname(fileObject.path), BKP_PREFEX + path.basename(fileObject.path) + BKP_EXT);
	const oldBkpPath = path.join(path.dirname(fileObject.path), OLD_BKP_PREFEX + path.basename(fileObject.path) + BKP_EXT);
	var writeEnc = defEnc || fileObject.encoding;

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
					fs.unlink(oldBkpPath, (err) => {}); //Ignore errors
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
	if (!checkFileContent(data, enc) || path.resolve(filePath).startsWith(appBaseDir))
	{
		throw new Error('Invalid file data');
	}
	else
	{
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

	return dialog.showOpenDialog(win, {
		defaultPath: defaultPath,
		filters: filters,
		properties: properties
	});
};

async function showSaveDialog(defaultPath, filters)
{
	let win = BrowserWindow.getFocusedWindow();

	return dialog.showSaveDialog(win, {
		defaultPath: defaultPath,
		filters: filters
	});
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

	if (checkFileContent(data, encoding) && !path.resolve(filename).startsWith(appBaseDir))
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
	// Reading the header of the file to confirm it is a file we can delete
	let fh = await fsProm.open(file, O_RDONLY);
	let buffer = Buffer.allocUnsafe(16);
	await fh.read(buffer, 0, 16);
	await fh.close();

	if (checkFileContent(buffer) && !path.resolve(file).startsWith(appBaseDir))
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

ipcMain.on("rendererReq", async (event, args) => 
{
	if (!validateSender(event.senderFrame)) return null;

	try
	{
		let ret = null;

		switch(args.action)
		{
		case 'saveFile':
			ret = await saveFile(args.fileObject, args.data, args.origStat, args.overwrite, args.defEnc);
			break;
		case 'writeFile':
			ret = await writeFile(args.path, args.data, args.enc);
			break;
		case 'saveDraft':
			ret = await saveDraft(args.fileObject, args.data);
			break;
		case 'getFileDrafts':
			ret = await getFileDrafts(args.fileObject);
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
			ret = await installPlugin(args.filePath);
			break;
		case 'uninstallPlugin':
			ret = await uninstallPlugin(args.plugin);
			break;
		case 'getPluginFile':
			ret = await getPluginFile(args.plugin);
			break;
		case 'isPluginsEnabled':
			ret = enablePlugins;
			break;
		case 'dirname':
			ret = await dirname(args.path);
			break;
		case 'readFile':
			ret = await readFile(args.filename, args.encoding);
			break;
		case 'clipboardAction':
			ret = await clipboardAction(args.method, args.data);
			break;
		case 'deleteFile':
			ret = await deleteFile(args.file);
			break;
		case 'fileStat':
			ret = await fileStat(args.file);
			break;
		case 'isFileWritable':
			ret = await isFileWritable(args.file);
			break;
		case 'windowAction':
			ret = await windowAction(args.method);
			break;
		case 'openExternal':
			ret = await openExternal(args.url);
			break;
		case 'watchFile':
			ret = await watchFile(args.path);
			break;
		case 'unwatchFile':	
			ret = await unwatchFile(args.path);
			break;
		};

		event.reply('mainResp', {success: true, data: ret, reqId: args.reqId});
	}
	catch (e)
	{
		event.reply('mainResp', {error: true, msg: e.message, e: e, reqId: args.reqId});
	}
});