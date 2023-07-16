window.PLUGINS_BASE_PATH = '.';
window.TEMPLATE_PATH = 'templates';
window.DRAW_MATH_URL = 'math/es5';
window.DRAWIO_BASE_URL = '.'; //Prevent access to online website since it is not allowed
FeedbackDialog.feedbackUrl = 'https://log.draw.io/email';
EditorUi.draftSaveDelay = 5000;
//Disables eval for JS (uses shapes-14-6-5.min.js)
mxStencilRegistry.allowEval = false;

(async function()
{
	let requestSync = async function(msg)
	{
		if (typeof msg === 'string')
		{
			msg = {
				action: msg
			};
		}

		async function doRequest()
		{
			return new Promise((resolve, reject) => {
				electron.request(msg, function(data)
				{
					resolve(data);
				}, function(errMsg, e)
				{
					reject(e || errMsg);
				});
			});
		};

		return await doRequest();
	};
	
	// Overrides default mode
	App.mode = App.MODE_DEVICE;
	
	// Disables all external transmission functionality
	App.prototype.isExternalDataComms = function()
	{
		return false;
	};
	
	// Disables preview option in embed dialog
	EmbedDialog.showPreviewOption = false;

	// Disables new window option in edit diagram dialog
	EditDiagramDialog.showNewWindowOption = false;

	PrintDialog.previewEnabled = false;
	
	PrintDialog.electronPrint = function(editorUi, allPages, pagesFrom, pagesTo, 
			fit, sheetsAcross, sheetsDown, zoom, pageScale, pageFormat)
	{
		var xml = '', title = '';
		var file = editorUi.getCurrentFile();
		
		if (file)
		{
			file.updateFileData();
			xml = editorUi.getFileData(true, null, null, null, null, false,
				null, null, null, false, true);
			title = file.title;
		}
		
		var extras = {globalVars: editorUi.editor.graph.getExportVariables()};

		if (Graph.translateDiagram)
		{
			extras.diagramLanguage = Graph.diagramLanguage;
		}

		new mxElectronRequest('export', {
			print: true,
			format: 'pdf',
			xml: xml,
			from: pagesFrom - 1,
			to: pagesTo - 1,
			allPages: allPages,
			pageWidth: pageFormat.width,
			pageHeight: pageFormat.height,
			pageScale: pageScale,
			fit: fit,
			sheetsAcross: sheetsAcross,
			sheetsDown: sheetsDown,
			scale: zoom,
			extras: JSON.stringify(extras),
			fileTitle: title
		}).send(function(){}, function(){});
	};
	
	var oldWindowOpen = window.open;
	window.open = async function(url)
	{
		// Only open a native electron window when url is empty. We use this in our code in several places.
		if (url == null)
		{
			return oldWindowOpen(url);
		}
		else
		{
			// Open external will filter urls based on their protocol
			await requestSync({action: 'openExternal', url: url});
		}
	}

	var origAppMain = App.main;
	
	App.main = async function()
	{
		// Set AutoSave delay
		var draftSaveDelay = mxSettings.getDraftSaveDelay();
		
		if (draftSaveDelay != null)
		{
			EditorUi.draftSaveDelay = draftSaveDelay * 1000;
			EditorUi.enableDrafts = draftSaveDelay > 0;
		}

		//Load desktop plugins
		var plugins = (mxSettings.settings != null) ? mxSettings.getPlugins() : null;
		App.initPluginCallback();

		if (plugins != null && plugins.length > 0)
		{
			// Workaround for body not defined if plugins are used in dev mode
			if (urlParams['dev'] == '1')
			{
				EditorUi.debug('App.main', 'Skipped plugins', plugins);
			}
			else
			{
				for (var i = 0; i < plugins.length; i++)
				{
					try
					{
						if (plugins[i].indexOf('..') >= 0)
						{
							continue;
						}
						else if (plugins[i].startsWith('/plugins/'))
						{
							plugins[i] = '.' + plugins[i];
						}
						else if (plugins[i].startsWith('plugins/'))
						{
							plugins[i] = './' + plugins[i];
						}
						else
						{
							let pluginFile = await requestSync({
								action: 'getPluginFile',
								plugin: plugins[i]
							});
							
							if (pluginFile != null)
							{
								plugins[i] = 'file://' + pluginFile;
							}
							else
							{
								continue; //skip not found files
							}
						}

						try
						{
							mxscript(plugins[i]);
						}
						catch (e)
						{
							// ignore
						}
					}
					catch (e)
					{
						// ignore
					}
				}
			}
		}
		
		//Remove old relaxed CSP and add strict one
		var allMeta = document.getElementsByTagName('meta');

		for (var i = 0; i < allMeta.length; i++)
		{
			if (allMeta[i].getAttribute('http-equiv') == 'Content-Security-Policy')
			{
				allMeta[i].parentNode.removeChild(allMeta[i]);
			}

			break;
		}

		mxmeta(null, 'default-src \'self\'; connect-src \'self\' https://fonts.googleapis.com https://fonts.gstatic.com; img-src * data:; media-src *; font-src *; style-src \'self\' \'unsafe-inline\' https://fonts.googleapis.com', 'Content-Security-Policy');

		//Disable web plugins loading
		urlParams['plugins'] = '0';
		origAppMain.apply(this, arguments);
	};
	
	var menusInit = Menus.prototype.init;
	Menus.prototype.init = function()
	{
		menusInit.apply(this, arguments);

		var editorUi = this.editorUi;

		editorUi.actions.put('useOffline', new Action(mxResources.get('useOffline') + '...', function()
		{
			editorUi.openLink('https://www.draw.io/')
		}));
		
		this.put('openRecent', new Menu(function(menu, parent)
		{
			var recent = editorUi.getRecent();

			if (recent != null)
			{
				for (var i = 0; i < recent.length; i++)
				{
					(function(entry)
					{
						menu.addItem(entry.title, null, function()
						{
							function doOpenRecent()
							{
								//Simulate opening a file via args
								editorUi.loadArgs({args: [entry.id]});
							};
							
							var file = editorUi.getCurrentFile();
							
							if (file != null && file.isModified())
							{
								editorUi.confirm(mxResources.get('allChangesLost'), null, doOpenRecent,
									mxResources.get('cancel'), mxResources.get('discardChanges'));
							}
							else
							{
								doOpenRecent();
							}
						}, parent);
					})(recent[i]);
				}

				menu.addSeparator(parent);
			}

			menu.addItem(mxResources.get('reset'), null, function()
			{
				editorUi.resetRecent();
			}, parent);
		}));
		
		// Replaces file menu to replace openFrom menu with open and rename downloadAs to export
		this.put('file', new Menu(mxUtils.bind(this, function(menu, parent)
		{
			this.addMenuItems(menu, ['new', 'open'], parent);
			this.addSubmenu('openRecent', menu, parent);
			this.addMenuItems(menu, ['-', 'synchronize', '-', 'save', 'saveAs', '-', 'import'], parent);
			this.addSubmenu('exportAs', menu, parent);
			menu.addSeparator(parent);
			this.addSubmenu('embed', menu, parent);
			menu.addSeparator(parent);
			this.addMenuItems(menu, ['newLibrary', 'openLibrary'], parent);

			var file = editorUi.getCurrentFile();
			
			if (file != null && editorUi.fileNode != null)
			{
				var filename = (file.getTitle() != null) ?
					file.getTitle() : editorUi.defaultFilename;
				
				if (!/(\.html)$/i.test(filename) &&
					!/(\.svg)$/i.test(filename))
				{
					this.addMenuItems(menu, ['-', 'properties']);
				}
			}
			
			this.addMenuItems(menu, ['-', 'pageSetup', 'print', '-', 'close'], parent);
			// LATER: Find API for application.quit
		})));
	};

	var graphCreateLinkForHint = Graph.prototype.createLinkForHint;
	
	Graph.prototype.createLinkForHint = function(href, label)
	{
		var a = graphCreateLinkForHint.call(this, href, label);
		
		if (href != null && !this.isCustomLink(href))
		{
			// KNOWN: Event with gesture handler mouseUp the middle click opens a framed window
			mxEvent.addListener(a, 'click', mxUtils.bind(this, function(evt)
			{
				this.openLink(a.getAttribute('href'), a.getAttribute('target'));
				mxEvent.consume(evt);
			}));
		}
		
		return a;
	};
	
	Graph.prototype.openLink = async function(url, target)
	{
		await requestSync({action: 'openExternal', url: url});
	};

	// Initializes the user interface
	var editorUiInit = EditorUi.prototype.init;
	EditorUi.prototype.init = function()
	{
		editorUiInit.apply(this, arguments);

		var editorUi = this;
		var graph = this.editor.graph;
		
		electron.registerMsgListener('isModified', () =>
		{
			const currentFile = editorUi.getCurrentFile();
			let reply = {isModified: false, draftPath: null};

			if (currentFile != null)
			{
				reply.isModified = currentFile.isModified();
				reply.draftPath = EditorUi.enableDrafts && currentFile.fileObject? currentFile.fileObject.draftFileName : null;
			}

			electron.sendMessage('isModified-result', reply);
		});

		electron.registerMsgListener('removeDraft', () =>
		{
			editorUi.getCurrentFile().removeDraft();
			electron.sendMessage('draftRemoved', {});
		});

		// Adds support for libraries
		this.actions.addAction('newLibrary...', mxUtils.bind(this, function()
		{
			editorUi.showLibraryDialog(null, null, null, null, App.MODE_DEVICE);
		}));
		
		this.actions.addAction('openLibrary...', mxUtils.bind(this, function()
		{
			editorUi.pickLibrary(App.MODE_DEVICE);
		}));

		// Replaces import action
		this.actions.addAction('import...', mxUtils.bind(this, async function()
		{
			if (editorUi.getCurrentFile() != null)
			{
				var lastDir = localStorage.getItem('.lastImpDir');
				
				var paths = await requestSync({
					action: 'showOpenDialog',
					defaultPath: lastDir || (await requestSync('getDocumentsFolder')),
					properties: ['openFile']
				});
			           
		        if (paths !== undefined && paths[0] != null)
		        {
		        	var path = paths[0];
		        	localStorage.setItem('.lastImpDir', await requestSync({action: 'dirname', path: path}));
		        	var asImage = /\.png$/i.test(path) || /\.gif$/i.test(path) || /\.jpe?g$/i.test(path);
		        	var encoding = (asImage || /\.pdf$/i.test(path) || /\.vsdx$/i.test(path) || /\.vssx$/i.test(path)) ?
		        		'base64' : 'utf-8';

					if (editorUi.spinner.spin(document.body, mxResources.get('loading')))
					{
						electron.request({action: 'readFile', filename: path, encoding: encoding} , mxUtils.bind(this, function (data)
				        {
							try
							{
								if (editorUi.isLucidChartData(data))
								{
									editorUi.convertLucidChart(data, function(xml)
									{
										editorUi.spinner.stop();
										graph.setSelectionCells(editorUi.importXml(xml));
									}, function(e)
									{
										editorUi.spinner.stop();
										editorUi.handleError(e);
									});
								}
								else if  (/(\.vsdx)($|\?)/i.test(path))
								{
									editorUi.importVisio(editorUi.base64ToBlob(data, 'application/octet-stream'), function(xml)
									{
										editorUi.spinner.stop();
										graph.setSelectionCells(editorUi.importXml(xml));
									});
								}
								else if (editorUi.isRemoteFileFormat(data, path))
								{
									editorUi.spinner.stop();
									editorUi.showError(mxResources.get('error'), mxResources.get('notInDesktop'));
								}
								else
								{
									if (/\.pdf$/i.test(path))
									{
										var tmp = Editor.extractGraphModelFromPdf(data);
										
										if (tmp != null)
										{
											data = tmp;
										}
									}
									else if (/\.png$/i.test(path))
									{
										var tmp = editorUi.extractGraphModelFromPng(data);
										
										if (tmp != null)
										{
											asImage = false;
											data = tmp;
										}
									}
									else if (/\.svg$/i.test(path))
									{
										// LATER: Use importXml without throwing exception if no data
										// Checks if SVG contains content attribute
										var root = mxUtils.parseXml(data);
										var svgs = root.getElementsByTagName('svg');
										
										if (svgs.length > 0)
										{
											var svgRoot = svgs[0];
											var cont = svgRoot.getAttribute('content');

											if (cont != null && cont.charAt(0) != '<' && cont.charAt(0) != '%')
											{
												cont = unescape((window.atob) ? atob(cont) : Base64.decode(cont, true));
											}
											
											if (cont != null && cont.charAt(0) == '%')
											{
												cont = decodeURIComponent(cont);
											}

											if (cont != null && (cont.substring(0, 8) === '<mxfile ' ||
												cont.substring(0, 14) === '<mxGraphModel '))
											{
												asImage = false;
												data = cont;
											}
											else
											{
												asImage = true;
											}
										}
									}
									
									if (asImage)
									{
										var img = new Image();
										img.onload = function()
										{
											editorUi.resizeImage(img, img.src, function(data2, w, h)
											{
												editorUi.spinner.stop();
												var pt = graph.getInsertPoint();
												graph.setSelectionCell(graph.insertVertex(null, null, '', pt.x, pt.y, w, h,
													'shape=image;aspect=fixed;image=' + editorUi.convertDataUri(data2) + ';'));
											}, true);
										};
										
										img.onerror = function(e)
										{
											editorUi.spinner.stop();
											editorUi.handleError();
										};
										
										var format = path.substring(path.lastIndexOf('.') + 1);
										img.src = (format == 'svg') ? Editor.createSvgDataUri(data) :
											'data:image/' + format + ';base64,' + data;
									}
									else
									{
										editorUi.spinner.stop();
										
										if (data != null)
										{
											graph.setSelectionCells(editorUi.importXml(data));
										}
									}
								}
							}
							catch(e)
							{
								editorUi.spinner.stop();
								editorUi.handleError(e);
							}
			        	}), function(e)
						{
							editorUi.spinner.stop();
							editorUi.handleError(e);
						});
					}
		        }
			}
		}));
		
		// Replaces new action
		var oldNew = this.actions.get('new').funct;
		
		this.actions.addAction('new...', mxUtils.bind(this, function()
		{
			if (this.getCurrentFile() == null)
			{
				oldNew();
			}
			else
			{
				electron.sendMessage('newfile', {width: 1600});
			}
		}), null, null, Editor.ctrlKey + '+N');
		
		this.actions.get('open').shortcut = Editor.ctrlKey + '+O';
		
		// Adds shortcut keys for file operations
		editorUi.keyHandler.bindAction(78, true, 'new'); // Ctrl+N
		editorUi.keyHandler.bindAction(79, true, 'open'); // Ctrl+O

		function createGraph()
		{
			var graph = new Graph();
	        graph.setExtendParents(false);
	        graph.setExtendParentsOnAdd(false);
	        graph.setConstrainChildren(false);
	        graph.setHtmlLabels(true);
	        graph.getModel().maintainEdgeParent = false;
	        return graph;
		};
		
		async function cloneMxCLipboardToSys()
		{
			var cells = mxClipboard.getCells();
			
			if (cells && cells.length > 0)
			{
				try
				{
					var tmpGraph = createGraph();
					tmpGraph.importCells(cells, 0, 0, tmpGraph.getDefaultParent());
					var codec = new mxCodec();
		            var node = codec.encode(tmpGraph.getModel());
		            var modelString = mxUtils.getXml(node);
					await requestSync({
						action: 'clipboardAction', 
						method: 'writeText',
						data: encodeURIComponent(modelString)
					});
				}
				catch(e)
				{
					//Ignore
				} 
			}
		};
		
		async function cloneSysCLipboardToMx()
		{
			try
			{
				var modelString = await requestSync({
					action: 'clipboardAction', 
					method: 'readText',
				});
				
				if (modelString)
				{
					modelString = decodeURIComponent(modelString);
					var xmlDoc = mxUtils.parseXml(modelString);
					var tmpGraph = createGraph();
					var codec = new mxCodec(xmlDoc);
					var model = tmpGraph.getModel();
					codec.decode(xmlDoc.documentElement, model);
					mxClipboard.setCells(model.root.children[0].children);
				}
			}
			catch(e)
			{
				//Ignore, the contents of mxClipboard will be used
			}
		};
		
		//Set system clipboard on menu copy/cut
		var origCut = this.actions.get('cut').funct;
		
		editorUi.actions.addAction('cut', function()
		{
			origCut();
			cloneMxCLipboardToSys();
		}, null, 'sprite-cut', Editor.ctrlKey + '+X');
		
		var origCopy = this.actions.get('copy').funct;
		
		editorUi.actions.addAction('copy', function()
		{
			origCopy();
			cloneMxCLipboardToSys();
		}, null, 'sprite-copy', Editor.ctrlKey + '+C');
		
		//Get data from system clipboard for pase/pasteHere
		var origPaste = this.actions.get('paste').funct;
		
		editorUi.actions.addAction('paste', function()
		{
			cloneSysCLipboardToMx();
			origPaste();
		}, false, 'sprite-paste', Editor.ctrlKey + '+V');
	
		var origPasteHere = this.actions.get('pasteHere').funct;

		editorUi.actions.addAction('pasteHere', function()
		{
			cloneSysCLipboardToMx();
			origPasteHere();
		});
		
		//Enable paste action even if mxClipboard is empty! TODO Is this OK?
		editorUi.updatePasteActionStates = function()
		{
			var graph = this.editor.graph;
			var paste = this.actions.get('paste');
			var pasteHere = this.actions.get('pasteHere');
			
			paste.setEnabled(this.editor.graph.cellEditor.isContentEditing() || 
					(graph.isEnabled() && !graph.isCellLocked(graph.getDefaultParent())));
			pasteHere.setEnabled(paste.isEnabled());
		};
		
		editorUi.actions.addAction('plugins...', function()
		{
			var pluginsMap = {};
			//Initialize it with plugins in settings
			var plugins = (mxSettings.settings != null) ? mxSettings.getPlugins() : null;

			if (plugins != null)
			{
				for (var i = 0; i < plugins.length; i++)
				{
					pluginsMap[plugins[i]] = true;
				}
			}

			editorUi.showDialog(new PluginsDialog(editorUi, async function(callback)
			{
				var div = document.createElement('div');
				
				var title = document.createElement('span');
				title.style.marginTop = '6px';
				mxUtils.write(title, mxResources.get('builtinPlugins') + ': ');
				div.appendChild(title);
				
				var pluginsSelect = document.createElement('select');
				pluginsSelect.style.width = '150px';
				
				for (var i = 0; i < App.publicPlugin.length; i++)
				{
					var p = App.publicPlugin[i];

					if  (pluginsMap[App.pluginRegistry[p]]) continue;

					var option = document.createElement('option');
					mxUtils.write(option, p);
					option.value = p;
					pluginsSelect.appendChild(option);
				}
				
				div.appendChild(pluginsSelect);
				mxUtils.br(div);
				mxUtils.br(div);
				
				title = document.createElement('span');
				mxUtils.write(title, mxResources.get('extPlugins') + ': ');
				div.appendChild(title);
				
				if (await requestSync('isPluginsEnabled'))
				{
					var extPluginsBtn = mxUtils.button(mxResources.get('selectFile') + '...', async function()
					{
						var warningMsgs = mxResources.get('pluginWarning').split('\\n');
						var warningMsg = warningMsgs.pop(); //Last line in the message

						if (!warningMsg) 
						{
							warningMsg = warningMsgs.pop();
						}

						if (!confirm(warningMsg)) 
						{
							return;
						}
						
						var lastDir = localStorage.getItem('.lastPluginDir');
						
						var paths = await requestSync({
							action: 'showOpenDialog',
							defaultPath: lastDir || (await requestSync('getDocumentsFolder')),
							filters: [
								{ name: 'draw.io Plugins', extensions: ['js'] },
								{ name: 'All Files', extensions: ['*'] }
							],
							properties: ['openFile']
						});
							
						if (paths !== undefined && paths[0] != null)
						{
							try
							{
								let ret = await requestSync({
									action: 'installPlugin',
									filePath: paths[0]
								});

								localStorage.setItem('.lastPluginDir', ret.selDir);
								callback(ret.pluginName);
								editorUi.hideDialog();
							}
							catch (e)
							{
								if (e.message == 'fileExists')
								{
									alert(mxResources.get('fileExists'));
								}
								else
								{
									alert('Adding plugin failed.');
								}
							}
						}
					});
					
					extPluginsBtn.className = 'geBtn';
					div.appendChild(extPluginsBtn);
				}
				else
				{
					title = document.createElement('span');
					mxUtils.write(title, mxResources.get('pluginsDisabled'));
					div.appendChild(title);
				}
							
				var dlg = new CustomDialog(editorUi, div, mxUtils.bind(this, function()
				{
					var newP = App.pluginRegistry[pluginsSelect.value];
					pluginsMap[newP] = true;
	        		callback(newP);
				}));
				editorUi.showDialog(dlg.container, 300, 125, true, true);
			},
			async function(plugin)
			{
				delete pluginsMap[plugin];
				
				await requestSync({
					action: 'uninstallPlugin',
					plugin: plugin
				});
			}, true).container, 360, 225, true, false);
		});
	}
	
	var appLoad = App.prototype.load;

	App.prototype.load = function()
	{
		appLoad.apply(this, arguments);
		
		electron.registerMsgListener('args-obj', (argsObj) =>
		{
			this.loadArgs(argsObj)
		})

		var editorUi = this;
		
		electron.registerMsgListener('export-vsdx', (argsObj) =>
		{
			var file = new LocalFile(editorUi, argsObj.xml, '');
			
			editorUi.fileLoaded(file);

			try
			{
				editorUi.saveData = function(filename, format, data, mimeType, base64Encoded)
				{
					electron.sendMessage('export-vsdx-finished', data);
				};
				
				var expSuccess = new VsdxExport(editorUi).exportCurrentDiagrams();

				if (!expSuccess)
				{
					electron.sendMessage('export-vsdx-finished', null);
				}
			}
			catch (e)
			{
				electron.sendMessage('export-vsdx-finished', null);
			}
		})	

		//We do some async stuff during app loading so we need to know exactly when loading is finished (it is not when onload is finished)
		electron.sendMessage('app-load-finished', null);

		//Change offline translation
		mxResources.parse('notInOffline=' + mxResources.get('notInDesktop'));
	}
	
	App.prototype.loadArgs = function(argsObj)
	{
		var paths = argsObj.args;
		
		// If a file is passed, and it is not an argument (has a leading -) 
		if (paths !== undefined && paths[0] != null && paths[0].indexOf('-') != 0 && this.spinner.spin(document.body, mxResources.get('loading')))
		{
			var path = paths[0];
			this.hideDialog();
			
			var success = mxUtils.bind(this, function(fileEntry, data, stat, name, isModified)
			{
				this.spinner.stop();
				
				if (data != null)
				{
					var file = new LocalFile(this, data, name || '');
					file.fileObject = fileEntry;
					file.stat = stat;
					file.setModified(isModified? true : false);
					this.fileLoaded(file);
				}
			});
			
			var error = mxUtils.bind(this, function(e)
			{
				this.spinner.stop();
				
				if (e.code === 'ENOENT')
				{
					var title = path.replace(/^.*[\\\/]/, '');
					var data = this.emptyDiagramXml;
					var file = new LocalFile(this, data, title, null);
					
					file.fileObject = new Object();
					file.fileObject.path = path;
					file.fileObject.name = title;
					file.fileObject.type = 'utf-8';
					this.fileCreated(file, null, null, null);					
					this.saveFile();
				}
				else
				{
					this.handleError(e);
				}
				
			});
			
			// Tries to open the file
			this.readGraphFile(success, error, path);
		}
		// If no file is passed, but there is the "create-if-not-exists" flag
		else if (argsObj.create != null)
		{
			var title = 'Untitled document';
			var data = this.emptyDiagramXml;
			var file = new LocalFile(this, data, title, null);
			this.fileCreated(file, null, null, null);
		}
		else
		{
			this.checkDrafts();
		}
	}

	var origFileLoaded = EditorUi.prototype.fileLoaded;
	
	EditorUi.prototype.fileLoaded = async function(file)
	{
		var oldFile = this.getCurrentFile();
		
		if (oldFile != null)
		{
			//TODO This assumes the user confirmed discarding the file changes to get to this function?
			if (EditorUi.enableDrafts)
			{
				oldFile.removeDraft();
			}

			if (oldFile.fileObject != null)
			{
				await requestSync({action: 'unwatchFile', path: oldFile.fileObject.path});
			}
		}
		
		if (file != null)
		{
			if (file.fileObject == null)
			{
				var fname = file.getTitle();
				
				var fileInfo = openFilesMap[fname];
				
				if (fileInfo != null)
				{
					file.fileObject = {
						name: fileInfo.name,
						path: fileInfo.path,
						type: fileInfo.type || 'utf-8'
					};
					//delete it such that it is not used again incorrectly
					delete openFilesMap[fname];
				}
			}
			
			if (file.fileObject != null)
			{
				file.addToRecent();
			
				await requestSync({
					action: 'watchFile', 
					path: file.fileObject.path,
					listener: mxUtils.bind(this, function(curr, prev) 
					{
						EditorUi.debug('EditorUi.watchFile', [this],
							'file', [file], 'stat', [file.stat],
							'curr', [curr], 'prev', [prev],
							'inConflictState', file.inConflictState,
							'unwatchedSaves', file.unwatchedSaves);
						
						//File is changed (not just accessed) && File is not already in a conflict state
						if (curr.mtimeMs != prev.mtimeMs && !file.inConflictState)
						{
							//Ignore our own changes
							if (file.unwatchedSaves || (file.stat != null && file.stat.mtimeMs == curr.mtimeMs))
							{
								file.unwatchedSaves = false;
								return;
							}
							
							file.inConflictState = true;

							file.addConflictStatus(null, mxUtils.bind(this, function()
							{
								file.ui.editor.setStatus(mxUtils.htmlEntities(
									mxResources.get('updatingDocument')));
								file.synchronizeFile(mxUtils.bind(this, function()
								{
									file.handleFileSuccess(false);
								}), mxUtils.bind(this, function(err)
								{
									file.handleFileError(err, true);
								}));
							}));
						}
					})
				});
			}
		}
		
		origFileLoaded.apply(this, arguments);
	};
	
	// Uses local picker
	App.prototype.pickFile = function()
	{
		var doPickFile = mxUtils.bind(this, function()
		{
			this.chooseFileEntry(mxUtils.bind(this, function(fileEntry, data, stat, name, isModified)
			{
				var file = new LocalFile(this, data, '');
				file.fileObject = fileEntry;
				file.stat = stat;
				file.setModified(isModified? true : false);
				this.fileLoaded(file);
			}));
		});

		var file = this.getCurrentFile();
		
		if (file != null && file.isModified())
		{
			this.confirm(mxResources.get('allChangesLost'), null, doPickFile,
				mxResources.get('cancel'), mxResources.get('discardChanges'));
		}
		else
		{
			doPickFile();
		}
	};
	
	/**
	 * Selects a library to load from a picker
	 * 
	 * @param mode the device mode, ignored in this case
	 */
	App.prototype.pickLibrary = function(mode)
	{
		this.chooseFileEntry(mxUtils.bind(this, function(fileEntry, data, stat)
		{
			try
			{
				var library = new DesktopLibrary(this, data, fileEntry);
				this.loadLibrary(library);
			}
			catch (e)
			{
				this.handleError(e, mxResources.get('errorLoadingFile'));
			}
		}));
	};
	
	// Uses local picker
	App.prototype.chooseFileEntry = async function(fn)
	{
		var lastDir = localStorage.getItem('.lastOpenDir');
		
		var paths = await requestSync({
			action: 'showOpenDialog',
			defaultPath: lastDir || (await requestSync('getDocumentsFolder')),
			filters: [
				{ name: 'draw.io Diagrams', extensions: ['drawio', 'xml', 'png', 'svg', 'html'] },
        	    { name: 'VSDX Documents', extensions: ['vsdx'] },
        	    { name: 'All Files', extensions: ['*'] }
			],
			properties: ['openFile']
		});
	           
        if (paths !== undefined && paths[0] != null)
        {
        	localStorage.setItem('.lastOpenDir', await requestSync({action: 'dirname', path: paths[0]}));

			this.readGraphFile(fn, mxUtils.bind(this, function(err)
			{
				this.handleError(err);
			}), paths[0]);
        }
        else
        {
        	this.spinner.stop();
        }
	};
	
	EditorUi.prototype.normalizeFilename = function(title, defaultExtension)
	{
		var tokens = title.split('.');
		var ext = (tokens.length > 1) ? tokens[tokens.length - 1] : '';
		defaultExtension = (defaultExtension != null) ? defaultExtension : 'drawio';

		if (tokens.length == 1 || mxUtils.indexOf(['xml',
			'html', 'drawio', 'png', 'svg'], ext) < 0)
		{
			tokens.push(defaultExtension);
		}

		return tokens.join('.');
	};

	//In order not to repeat the logic for opening a file, we collect files information here and use them in openLocalFile
	var origOpenFiles = EditorUi.prototype.openFiles;
	var openFilesMap = {};
	
	EditorUi.prototype.openFiles = function(files, temp)
	{
		openFilesMap = {};

		for (var i = 0; i < files.length; i++)
		{
			openFilesMap[files[i].name] = files[i];
		}
		
		origOpenFiles.apply(this, arguments);
	};
	
	App.prototype.readGraphFile = function(fn, fnErr, path, noDraftCheck)
	{
		var index = path.lastIndexOf('.png');
		var isPng = index > -1 && index == path.length - 4;
		var isVsdx = /\.vsdx$/i.test(path) || /\.vssx$/i.test(path);
		var encoding = isVsdx? null : ((isPng || /\.pdf$/i.test(path)) ? 'base64' : 'utf-8');
		var fileEntry = new Object(), stat = null;
		fileEntry.path = path;
		fileEntry.name = path.replace(/^.*[\\\/]/, '');
		fileEntry.type = encoding;

		var checkDrafts = mxUtils.bind(this, function()
		{
			if (noDraftCheck) return;

			electron.request({
				action: 'getFileDrafts',
				fileObject: fileEntry
			}, mxUtils.bind(this, function(drafts)
			{
				if (drafts.length > 0)
				{
					var dlg = new DraftDialog(this, mxResources.get('unsavedChanges'),
								(drafts.length > 1) ? null : drafts[0].data, mxUtils.bind(this, async function(index)
					{
						index = index || 0;
						this.hideDialog();
						fn(fileEntry, drafts[index].data, stat, null, true);
						await requestSync({action: 'deleteFile', file: drafts[index].path});
					}), mxUtils.bind(this, function(index)
					{
						index = index || 0;
					
						// Discard draft
						this.confirm(mxResources.get('areYouSure'), null, mxUtils.bind(this, async function()
						{
							await requestSync({action: 'deleteFile', file: drafts[index].path});
							this.hideDialog();
						}), mxResources.get('no'), mxResources.get('yes'));
					}), null, null, null, (drafts.length > 1) ? drafts : null);
					
					this.showDialog(dlg.container, 640, 480, true, false);
					
					dlg.init();
				}
			}),
			mxUtils.bind(this, function(errMsg, err)
			{
				//TODO Currently ignored, maybe we should retry?
			}));
		});

		var readData = mxUtils.bind(this, function (data)
		{
			// VSDX and PDF files are imported instead of being opened
			if (isVsdx)
			{
				var name = fileEntry.name;

				this.importVisio(data, mxUtils.bind(this, function(xml)
				{
					var dot = name.lastIndexOf('.');
					
					if (dot >= 0)
					{
						name = name.substring(0, name.lastIndexOf('.')) + '.drawio';
					}
					else
					{
						name = name + '.drawio';
					}
					
					if (xml.substring(0, 10) == '<mxlibrary')
					{
						// Creates new temporary file if library is dropped in splash screen
						if (this.getCurrentFile() == null && urlParams['embed'] != '1')
						{
							this.openLocalFile(this.emptyDiagramXml, this.defaultFilename);
						}
					
						try
						{
							this.loadLibrary(new LocalLibrary(this, xml, name));
						}
						catch (e)
						{
							this.handleError(e, mxResources.get('errorLoadingFile'));
						}
						
						fn();
					}
					else
					{
						fn(null, xml, null, name, false);
					}

					checkDrafts();
				}), null, name);
				
				return;
			}
			else if (/\.pdf$/i.test(path))
			{
				var tmp = Editor.extractGraphModelFromPdf('data:application/pdf;base64,' + data);
				
				if (tmp != null)
				{
					var name = fileEntry.name;
					fn(null, tmp, null, name.substring(0, name.lastIndexOf('.')) + '.drawio', false);
					checkDrafts();
					return;
				}
			}
			else if (isPng)
			{
				// Detecting png by extension. Would need https://github.com/mscdex/mmmagic
				// to do it by inspection
				data = this.extractGraphModelFromPng('data:image/png;base64,' + data);
			}

			electron.request({action: 'fileStat', file: path}, mxUtils.bind(this, function(stat_p)
			{
				stat = stat_p;
				fn(fileEntry, data, stat, null, false);

				electron.request({action: 'isFileWritable', file: path}, mxUtils.bind(this, function(isWritable)
				{
					if (!isWritable)
					{
						var file = this.getCurrentFile();

						if (file != null && file.fileObject != null && file.fileObject.path == path)
						{
							file.setEditable(false);
							this.editor.setStatus('<div class="geStatusAlert">' + mxResources.get('readOnly') + '</div>');
						}
					}
				}));

				checkDrafts();
			}), function(errMsg, err)
			{
				fnErr(err);
			});
		});
 
		electron.request({
			action: 'readFile',
			filename: path,
			encoding: encoding
		}, readData, function(errMsg, err)
		{
			fnErr(err);
			checkDrafts();
		});
	};

	// Disables temp files in Electron
	var LocalFileCtor = LocalFile;
	
	LocalFile = function(ui, data, title, temp)
	{
		LocalFileCtor.call(this, ui, data, title, false);
	};

	mxUtils.extend(LocalFile, LocalFileCtor);

	LocalFile.prototype.getLatestVersion = function(success, error)
	{
		if (this.fileObject == null)
		{
			if (error != null)
			{
				error({message: mxResources.get('fileNotFound')});
			}
		}
		else
		{
			this.ui.readGraphFile(mxUtils.bind(this, function(fileEntry, data, stat, name, isModified)
			{
				var file = new LocalFile(this.ui, data, '');
				file.stat = stat;
				file.setModified(isModified? true : false);
				success(file);
			}), error, this.fileObject.path, true);
		}
	};
	
	// Call save as for copy
	LocalFile.prototype.copyFile = function(success, error)
	{
		this.saveAs(this.ui.getCopyFilename(this), success, error);
	};
	
	/**
	 * Adds all listeners.
	 */
	LocalFile.prototype.getDescriptor = function()
	{
		return this.stat;
	};

	/**
	* Updates the descriptor of this file with the one from the given file.
	*/
	LocalFile.prototype.setDescriptor = function(stat)
	{
		this.stat = stat;
	};
	
	LocalFile.prototype.reloadFile = function(success)
	{
		if (this.fileObject == null)
		{
			this.ui.handleError({message: mxResources.get('fileNotFound')});
		}
		else
		{
			this.ui.spinner.stop();
			
			var fn = mxUtils.bind(this, function()
			{
				this.setModified(false);
				var page = this.ui.currentPage;
				var viewState = this.ui.editor.graph.getViewState();
				var selection = this.ui.editor.graph.getSelectionCells();
				
				if (this.ui.spinner.spin(document.body, mxResources.get('loading')))
				{
					this.ui.readGraphFile(mxUtils.bind(this, function(fileEntry, data, stat, name, isModified)
					{
						this.ui.spinner.stop();
						
						var file = new LocalFile(this.ui, data, '');
						file.fileObject = fileEntry;
						file.stat = stat;
						file.setModified(isModified? true : false);
						this.ui.fileLoaded(file);
						this.ui.restoreViewState(page, viewState, selection);
		
						if (this.backupPatch != null)
						{
							this.patch([this.backupPatch]);
						}
						
						if (success != null)
						{
							success();
						}
					}), mxUtils.bind(this, function(err)
					{
						this.handleFileError(err);
					}), this.fileObject.path);
				}
			});
	
			if (this.isModified() && this.backupPatch == null)
			{
				this.ui.confirm(mxResources.get('allChangesLost'), mxUtils.bind(this, function()
				{
					this.handleFileSuccess(DrawioFile.SYNC == 'manual');
				}), fn, mxResources.get('cancel'), mxResources.get('discardChanges'));
			}
			else
			{
				fn();
			}
		}
	};

	LocalFile.prototype.isAutosave = function()
	{
		return this.fileObject != null && DrawioFile.prototype.isAutosave.apply(this, arguments);
	};
	
	LocalFile.prototype.isAutosaveOptional = function()
	{
		return this.fileObject != null;
	};
	
	LocalFile.prototype.getTitle = function()
	{
		return (this.fileObject != null) ? this.fileObject.name : this.title;
	};

	LocalFile.prototype.isRenamable = function()
	{
		return false;
	};
	
	var autoSaveEnabled = false;

	LocalFile.prototype.save = function(revision, success, error, unloading, overwrite)
	{
		if (!this.isEditable())
		{
			this.saveAs(this.title, success, error);
			return;
		}

		DrawioFile.prototype.save.apply(this, [revision, mxUtils.bind(this, function()
		{
			this.saveFile(revision, mxUtils.bind(this, function() 
			{
				//Only for first save after auto save is enabled (excluding the save as [overwrite]) 
				if (autoSaveEnabled && !overwrite && EditorUi.enableDrafts)
				{
					this.removeDraft();
				}

				autoSaveEnabled = false;
				success.apply(this, arguments);
			}), error, unloading, overwrite);
		}), error, unloading, overwrite]);
	};

	LocalFile.prototype.isConflict = function(stat)
	{
		return stat != null && this.stat != null && stat.mtimeMs != this.stat.mtimeMs;
	};
	
	LocalFile.prototype.isEditable = function()
	{
		return this.editable != null? this.editable : this.ui.editor.editable;
	};

	LocalFile.prototype.setEditable = function(editable)
	{
		this.editable = editable;
	};
	
	LocalFile.prototype.saveFile = async function(revision, success, error, unloading, overwrite)
	{
		//Safeguard in case saveFile is called from online code in the future
		if (typeof success !== 'function')
		{
			if (typeof unloading === 'function')
			{
				//Call error
				unloading({message: 'This is a bug, please report!'}); //Original draw.io function parameters are (title, revision, success, error, useCurrentData)
			}
			return;
		}
		
		if (!this.savingFile)
		{
			var fn = mxUtils.bind(this, function()
			{
				var doSave = mxUtils.bind(this, function(data, enc)
				{
					var savedData = this.data;
					
					// Makes sure no changes get lost while the file is saved
					this.setShadowModified(false);
					this.savingFile = true;
					
					var errorWrapper = mxUtils.bind(this, function(e)
					{
						this.savingFile = false;
						
						if (error != null)
						{
	        				error(e);
						}
					});

					this.unwatchedSaves = true; //Multiple saves doesn't call watch the same number, so use a boolean and check for changes
					
					electron.request({
						action: 'saveFile',
						fileObject: this.fileObject,
						defEnc: enc,
						data: data,
						origStat: this.stat,
						overwrite: overwrite
					}, mxUtils.bind(this, function(stat)
					{
						//No changes during the saving process?
						this.setModified(this.getShadowModified());
						this.savingFile = false;
						var lastDesc = this.stat;
						this.stat = stat;
						
						this.fileSaved(savedData, lastDesc, mxUtils.bind(this, function()
						{
							this.contentChanged();
							
							if (success != null)
							{
								success();
							}
						}), error);
					}), 
					mxUtils.bind(this, function(errMsg, err)
					{
						if (errMsg == 'empty data')
						{
							this.ui.handleError({message: mxResources.get('errorSavingFile')});
							errorWrapper();
						}
						else if (errMsg == 'conflict')
						{
							this.inConflictState = true;
							errorWrapper();
						}
						else
						{
							errorWrapper(err || errMsg);
						}
					}));
				});
	
				if (!/(\.png)$/i.test(this.fileObject.name))
				{
					doSave(this.getData());
				}
				else
				{
					var p = this.ui.getPngFileProperties(this.ui.fileNode);

					this.ui.getEmbeddedPng(function(data)
					{
						doSave(atob(data), 'binary');
					}, error, null, p.scale, p.border);
				}
			});
			
			try
			{
				if (this.fileObject == null)
				{
					var lastDir = localStorage.getItem('.lastSaveDir');
					var name = this.ui.normalizeFilename(this.getTitle(),
						this.constructor == LocalLibrary ? 'xml' : null);
					var ext = null;
					
					if (name != null)
					{
						var idx = name.lastIndexOf('.');
						
						if (idx > 0)
						{
							ext = name.substring(idx + 1);
						}
					}
					
					var path = await requestSync({
						action: 'showSaveDialog',
						defaultPath: (lastDir || (await requestSync('getDocumentsFolder'))) + '/' + name,
						filters: this.ui.createFileSystemFilters(ext)
					});

					if (path != null)
					{
						localStorage.setItem('.lastSaveDir', await requestSync({action: 'dirname', path: path}));
						this.fileObject = new Object();
						this.fileObject.path = path;
						this.fileObject.name = path.replace(/^.*[\\\/]/, '');
						this.fileObject.type = 'utf-8';
						this.title = this.fileObject.name;
						this.addToRecent();
						fn();
					}
					else
					{
						this.ui.spinner.stop();
					}
				}
				else
				{
					fn();
				}
			}
			catch (e)
			{
				error(e);
			}
		}
	};

	LocalFile.prototype.addToRecent = function()
	{
		if (this.fileObject == null) return;

		var title = this.fileObject.path;
				
		if (title.length > 100)
		{
			title = '...' + title.substr(title.length - 97);
		}

		this.ui.addRecent({id: this.fileObject.path, title: title});
	};

	LocalFile.prototype.saveAs = async function(title, success, error)
	{
		try
		{
			var lastDir = localStorage.getItem('.lastSaveDir');
			var name = this.ui.normalizeFilename(this.getTitle(),
				this.constructor == LocalLibrary ? 'xml' : null);
			var ext = null;
			
			if (name != null)
			{
				var idx = name.lastIndexOf('.');
				
				if (idx > 0)
				{
					ext = name.substring(idx + 1);
				}
			}
			
			var path = await requestSync({
				action: 'showSaveDialog',
				defaultPath: (lastDir || (await requestSync('getDocumentsFolder'))) + '/' + name,
				filters: this.ui.createFileSystemFilters(ext)
			});

			if (path != null)
			{
				localStorage.setItem('.lastSaveDir', await requestSync({action: 'dirname', path: path}));
				this.fileObject = new Object();
				this.fileObject.path = path;
				this.fileObject.name = path.replace(/^.*[\\\/]/, '');
				this.fileObject.type = 'utf-8';
				this.title = this.fileObject.name;
				this.addToRecent();
				this.setEditable(true); //In case original file is read only
				this.save(false, success, error, null, true);
			}
		}
		catch (e)
		{
			error(e);
		}
	};
	
	LocalFile.prototype.saveDraft = function()
	{
		if (this.fileObject == null)
		{
			//Use indexed db for unsaved files
			DrawioFile.prototype.saveDraft.apply(this, arguments);
		}
		else
		{
			electron.request({
				action: 'saveDraft',
				fileObject: this.fileObject,
				data: this.ui.getFileData()
			}, mxUtils.bind(this, function(draftFileName)
			{
				this.fileObject.draftFileName = draftFileName;
			}), mxUtils.bind(this, function(msg, e)
			{
				//TODO Currently ignored, maybe we should retry?
			}));
		}
	};

	LocalFile.prototype.removeDraft = async function()
	{
		try
		{
			if (this.fileObject == null)
			{
				//Use indexed db for unsaved files
				DrawioFile.prototype.removeDraft.apply(this, arguments);
			}
			else if (this.fileObject.draftFileName != null)
			{
				await requestSync({action: 'deleteFile', file: this.fileObject.draftFileName});
			}
		}
		catch (e)
		{
			// ignore
		}
	};

	LocalLibrary.prototype.addToRecent = function()
	{
		// do nothing
	};
	
	/**
	 * Loads the given file handle as a local file.
	 */
	App.prototype.createFileSystemFilters = function(defaultExt)
	{
		var ext = [];
		
		for (var i = 0; i < this.editor.diagramFileTypes.length; i++)
		{
			var obj = {name: mxResources.get(this.editor.diagramFileTypes[i].description) +
				' (.' + this.editor.diagramFileTypes[i].extension + ')',
				extensions: [this.editor.diagramFileTypes[i].extension]};
			
			if (this.editor.diagramFileTypes[i].extension == defaultExt)
			{
				ext.splice(0, 0, obj);
			}
			else
			{
				ext.push(obj);
			}
		}
		
		return ext;
	};
	
	/**
	 * Loads the given file handle as a local file.
	 */
	App.prototype.saveFile = function(forceDialog)
	{
		var file = this.getCurrentFile();
		
		if (file != null)
		{
			if (!forceDialog && file.getTitle() != null)
			{
				file.save(true, mxUtils.bind(this, function()
				{
					if (EditorUi.enableDrafts)
					{
						file.removeDraft();
					}
					
					file.handleFileSuccess(true);
				}), mxUtils.bind(this, function(err)
				{
					file.handleFileError(err, true);
				}));
			}
			else
			{
				let oldFileObject = file.fileObject;

				file.saveAs(null, mxUtils.bind(this, function()
				{
					if (EditorUi.enableDrafts)
					{
						//Workaround to delete the correct draft as the file object is updated in place
						let curFileObject = file.fileObject;
						file.fileObject = oldFileObject;
						file.removeDraft();
						file.fileObject = curFileObject;
					}
					
					file.handleFileSuccess(true);
				}), mxUtils.bind(this, function(err)
				{
					file.handleFileError(err, true);
				}));
			}
		}
	};
	
	/**
	 * Translates this point by the given vector.
	 */
	App.prototype.saveLibrary = function(name, images, file, mode, noSpin, noReload, fn)
	{
		mode = (mode != null) ? mode : this.mode;
		noSpin = (noSpin != null) ? noSpin : false;
		noReload = (noReload != null) ? noReload : false;
		var xml = this.createLibraryDataFromImages(images);
		
		var error = mxUtils.bind(this, function(resp)
		{
			this.spinner.stop();
			
			if (fn != null)
			{
				fn();
			}
			
			// Null means cancel by user and is ignored
			if (resp != null)
			{
				this.handleError(resp, mxResources.get('errorSavingFile'));
			}
		});
	
		// Handles special case for local libraries
		if (file == null)
		{
			file = new LocalLibrary(this, xml, name);
		}
		
		if (noSpin || this.spinner.spin(document.body, mxResources.get('saving')))
		{
			file.setData(xml);
			
			var doSave = mxUtils.bind(this, function()
			{
				file.save(true, mxUtils.bind(this, function(resp)
				{
					this.spinner.stop();
					this.hideDialog(true);
					
					if (!noReload)
					{
						this.libraryLoaded(file, images)
					}
					
					if (fn != null)
					{
						fn();
					}
				}), error);
			});
			
			if (name != file.getTitle())
			{
				var oldHash = file.getHash();
				
				file.rename(name, mxUtils.bind(this, function(resp)
				{
					// Change hash in stored settings
					if (file.constructor != LocalLibrary && oldHash != file.getHash())
					{
						mxSettings.removeCustomLibrary(oldHash);
						mxSettings.addCustomLibrary(file.getHash());
					}
	
					// Workaround for library files changing hash so
					// the old library cannot be removed from the
					// sidebar using the updated file in libraryLoaded
					this.removeLibrarySidebar(oldHash);
	
					doSave();
				}), error)
			}
			else
			{
				doSave();
			}
		}
	};
	
	App.prototype.checkForUpdates = function()
	{
		electron.sendMessage('checkForUpdates');
	}
	
	App.prototype.toggleSpellCheck = function()
	{
		electron.sendMessage('toggleSpellCheck');
	}

	App.prototype.toggleStoreBkp = function()
	{
		electron.sendMessage('toggleStoreBkp');
	}
	
	App.prototype.openDevTools = function()
	{
		electron.sendMessage('openDevTools');
	}
	
	/**
	 * Copies the given cells and XML to the clipboard as an embedded image.
	 */
	EditorUi.prototype.writeImageToClipboard = async function(dataUrl, w, h, error)
	{
		try
		{
			await requestSync({
				action: 'clipboardAction', 
				method: 'writeImage',
				data: {dataUrl: dataUrl, w: w, h: h}
			});
		}
		catch (e)
		{
			error(e);
		}
	};

	/**
	 * Updates action states depending on the selection.
	 */
	var editorUiUpdateActionStates = EditorUi.prototype.updateActionStates;
	EditorUi.prototype.updateActionStates = function()
	{
		editorUiUpdateActionStates.apply(this, arguments);

		var file = this.getCurrentFile();
		var syncEnabled = file != null && file.fileObject != null;
		this.actions.get('synchronize').setEnabled(syncEnabled);
	};
	
	EditorUi.prototype.saveLocalFile = function(data, filename, mimeType, base64Encoded, format, allowBrowser)
	{
		this.saveData(filename, format, data, mimeType, base64Encoded);
	};
	
	EditorUi.prototype.saveRequest = function(filename, format, fn, data, base64Encoded, mimeType)
	{
		var xhr = fn(null, '1');
		
		if (xhr != null && this.spinner.spin(document.body, mxResources.get('saving')))
		{
			xhr.send(mxUtils.bind(this, function()
			{
				this.spinner.stop();
				
				if (xhr.getStatus() >= 200 && xhr.getStatus() <= 299)
				{
					this.saveData(filename, format, xhr.getText(), mimeType, true);
				}
				else
				{
					this.handleError({message: mxResources.get('errorSavingFile')});
				}
			}), mxUtils.bind(this, function(resp)
			{
				this.spinner.stop();
				this.handleError(resp);
			}));
		}
	};

	function mxElectronRequest(reqType, reqObj)
	{
		this.reqType = reqType;
		this.reqObj = reqObj;
	};

	//Extends mxXmlRequest
	mxUtils.extend(mxElectronRequest, mxXmlRequest);
	
	mxElectronRequest.prototype.send = function(callback, error)
	{
		electron.sendMessage(this.reqType, this.reqObj);
		
		electron.listenOnce(this.reqType + '-success', (data) => 
		{
			this.response = data;
			callback();
			electron.sendMessage(this.reqType + '-finalize');
		})

		electron.listenOnce(this.reqType + '-error', (err) => 
		{
			this.hasError = true;
			error(err);
			electron.sendMessage(this.reqType + '-finalize');
		})
	};
	
	mxElectronRequest.prototype.getStatus = function()
	{
		return this.hasError? 500 : 200; 
	}
	
	mxElectronRequest.prototype.getText = function()
	{
		return this.response;
	}
	
	//Direct export to pdf
	EditorUi.prototype.createDownloadRequest = function(filename, format, ignoreSelection,
		base64, transparent, currentPage, scale, border, grid, includeXml, pageRange, w, h)
	{
		var params = this.downloadRequestBuilder(filename, format, ignoreSelection,
			base64, transparent, currentPage, scale, border, grid, includeXml, pageRange, w, h);

		return new mxElectronRequest('export', params);
	};
	
	var origSetAutosave = Editor.prototype.setAutosave;

	Editor.prototype.setAutosave = function(value)
	{
		autoSaveEnabled = value;
		return origSetAutosave.apply(this, arguments);
	}

	//Export Dialog Pdf case
	var origExportFile = ExportDialog.exportFile;
	
	ExportDialog.exportFile = function(editorUi, name, format, bg, s, b, dpi)
	{
		var graph = editorUi.editor.graph;
		
		if (format == 'xml' || format == 'svg')
		{
			return origExportFile.apply(this, arguments);
		}
		else
		{
			var data = editorUi.getFileData(true, null, null, null, null, true);
    		var bounds = graph.getGraphBounds();
			var w = Math.floor(bounds.width * s / graph.view.scale);
			var h = Math.floor(bounds.height * s / graph.view.scale);
			
			editorUi.hideDialog();
			
			if ((format == 'png' || format == 'jpg' || format == 'jpeg') && editorUi.isExportToCanvas())
			{
				if (format == 'png')
				{
					editorUi.exportImage(s, bg == null || bg == 'none', true,
				   		false, false, b, true, false, null, null, dpi);
				}
				else 
				{
					editorUi.exportImage(s, false, true, false,
						false, b, true, false, 'jpeg');
				}
			}
			else 
			{
				var extras = {globalVars: graph.getExportVariables()};
				
				if (Graph.translateDiagram)
				{
					extras.diagramLanguage = Graph.diagramLanguage;
				}

				editorUi.saveRequest(name, format,
					function(newTitle, base64)
					{
						return new mxElectronRequest('export', {
							format: format,
							xml: data,
							bg: (bg != null) ? bg : mxConstants.NONE,
							filename: (newTitle != null) ? newTitle : null,
							w: w,
							h: h,
							border: b,
							base64: (base64 || '0'),
							extras: JSON.stringify(extras),
							dpi: dpi > 0? dpi : null
						}); 
					});
			}
		}
	};
	
	EditorUi.prototype.saveData = async function(filename, format, data, mimeType, base64Encoded)
	{
		var resume = (this.spinner != null && this.spinner.pause != null) ? this.spinner.pause() : function() {};
		var lastDir = localStorage.getItem('.lastExpDir');
		
		// Spinner.stop is asynchronous so we must invoke save dialog asynchronously
		// to give the spinner some time to stop spinning
		window.setTimeout(mxUtils.bind(this, async function()
		{
			var dlgConfig = {
				action: 'showSaveDialog',
				defaultPath: (lastDir || (await requestSync('getDocumentsFolder'))) + '/' + filename
			};
			var filters = null;
			
			switch (format)
			{
				case 'xmlpng':
				case 'png':
					filters = [
				          { name: 'PNG Images', extensions: ['png'] }
				       ];
				break;
				case 'jpg':
				case 'jpeg':
					filters = [
				          { name: 'JPEG Images', extensions: ['jpg', 'jpeg'] }
				       ];
				break;
				case 'svg':
					filters = [
				          { name: 'SVG Images', extensions: ['svg'] }
				       ];
				break;
				case 'pdf':
					filters = [
				          { name: 'PDF Documents', extensions: ['pdf'] }
				       ];
				break;
				case 'vsdx':
					filters = [
				          { name: 'VSDX Documents', extensions: ['vsdx'] }
				       ];
				break;
				case 'html':
					filters = [
				          { name: 'HTML Documents', extensions: ['html'] }
				       ];
				break;
				case 'xml':
					filters = [
				          { name: 'XML Documents', extensions: ['xml'] }
				       ];
				break;
			};
			
			dlgConfig['filters'] = filters;
			//showSaveDialog
			var path = await requestSync(dlgConfig);

	        if (path != null)
	        {
	        	localStorage.setItem('.lastExpDir', await requestSync({action: 'dirname', path: path}));

	        	if (data == null || data.length == 0)
				{
					this.handleError({message: mxResources.get('errorSavingFile')});
				}
				else
				{
					resume();
					
					electron.request({
						action: 'writeFile',
						path: path,
						data: data,
						enc: (base64Encoded) ? 'base64' : 'utf-8'
					}, mxUtils.bind(this, function ()
				    {
						this.spinner.stop();
		        	}), mxUtils.bind(this, function ()
				    {
						this.spinner.stop();
						this.handleError({message: mxResources.get('errorSavingFile')});
		        	}));
				}
			}
		}), 50);
	};

	EditorUi.prototype.addBeforeUnloadListener = function() {};
	
	EditorUi.prototype.loadDesktopLib = function(libPath, success, error)
	{
		this.readGraphFile(mxUtils.bind(this, function(fileEntry, data, stat)
		{
			var library = new DesktopLibrary(this, data, fileEntry);
			this.loadLibrary(library);
			success(library);
		}), error, libPath);
	};
})();
