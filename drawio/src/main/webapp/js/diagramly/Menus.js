/**
 * Copyright (c) 2006-2020, JGraph Ltd
 * Copyright (c) 2006-2020, draw.io AG
 */
(function()
{
	// Adds scrollbars for menus that exceed the page height
	var mxPopupMenuShowMenu = mxPopupMenu.prototype.showMenu;
	mxPopupMenu.prototype.showMenu = function()
	{
		this.div.style.overflowY = 'auto';
		this.div.style.overflowX = 'hidden';
		var h0 = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
		this.div.style.maxHeight = (h0 - (EditorUi.isElectronApp? 50 : 10)) + 'px'; //In Electron and without titlebar, the top item is not selectable

		mxPopupMenuShowMenu.apply(this, arguments);
	};
	
	Menus.prototype.createHelpLink = function(href)
	{
		var link = document.createElement('span');
		link.setAttribute('title', mxResources.get('help'));
		link.style.cssText = 'color:blue;text-decoration:underline;margin-left:8px;cursor:help;';
		
		var icon = document.createElement('img');
		mxUtils.setOpacity(icon, 50);
		icon.style.height = '16px';
		icon.style.width = '16px';
		icon.setAttribute('border', '0');
		icon.setAttribute('valign', 'bottom');
		icon.setAttribute('src', Editor.helpImage);
		link.appendChild(icon);

		if (Editor.enableCssDarkMode)
		{
			icon.className = 'geAdaptiveAsset';
		}
		
		mxEvent.addGestureListeners(link, mxUtils.bind(this, function(evt)
		{
			this.editorUi.hideCurrentMenu();
			this.editorUi.openLink(href);
			mxEvent.consume(evt);
		}));
		
		return link;
	};

	Menus.prototype.addLinkToItem = function(item, href)
	{
		if (item != null)
		{
			item.firstChild.nextSibling.appendChild(this.createHelpLink(href));
		}
	};

	var menusInit = Menus.prototype.init;
	Menus.prototype.init = function()
	{
		menusInit.apply(this, arguments);
		var editorUi = this.editorUi;
		var graph = editorUi.editor.graph;
		var isGraphEnabled = mxUtils.bind(graph, graph.isEnabled);
		var googleEnabled = ((urlParams['embed'] != '1' && urlParams['gapi'] != '0') ||
			(urlParams['embed'] == '1' && urlParams['gapi'] == '1')) && mxClient.IS_SVG &&
			isLocalStorage && (document.documentMode == null || document.documentMode >= 10);
		var dropboxEnabled = ((urlParams['embed'] != '1' && urlParams['db'] != '0') || (urlParams['embed'] == '1' && urlParams['db'] == '1')) &&
			mxClient.IS_SVG && (document.documentMode == null || document.documentMode > 9);
		var oneDriveEnabled = (window.location.hostname == 'www.draw.io' || window.location.hostname == 'test.draw.io' ||
			window.location.hostname == 'drive.draw.io' || window.location.hostname == 'app.diagrams.net') &&
			(((urlParams['embed'] != '1' && urlParams['od'] != '0') || (urlParams['embed'] == '1' && urlParams['od'] == '1')) &&
			!mxClient.IS_IOS && (navigator.userAgent.indexOf('MSIE') < 0 || document.documentMode >= 10));
		var trelloEnabled = urlParams['tr'] == '1' && mxClient.IS_SVG && (document.documentMode == null ||
			document.documentMode > 9);

		if (!mxClient.IS_SVG && !editorUi.isOffline())
		{
			var img = new Image();
			img.src = IMAGE_PATH + '/help.png';
		}
		
		if (urlParams['noFileMenu'] == '1')
		{
			this.defaultMenuItems = this.defaultMenuItems.filter(function(m)
			{
				return m != 'file';
			});
		}

		editorUi.actions.addAction('new...', function()
		{
			var compact = editorUi.isOffline();
			
			if (!compact && urlParams['newTempDlg'] == '1' && editorUi.mode == App.MODE_GOOGLE)
			{
				function driveObjToTempDlg(item)
				{
					return {id: item.id, isExt: true, url: item.downloadUrl, title: item.title, imgUrl: item.thumbnailLink,
							changedBy: item.lastModifyingUserName, lastModifiedOn: item.modifiedDate}
				};
				
				var tempDlg = new TemplatesDialog(editorUi, function(templateXml, title, infoObj)
				{
					var templateLibs = infoObj.libs, templateClibs = infoObj.clibs;

					editorUi.pickFolder(editorUi.mode, function(folderId)
					{
						editorUi.createFile(title, templateXml, (templateLibs != null &&
							templateLibs.length > 0) ? templateLibs : null, null, function()
						{
							editorUi.hideDialog();
						}, null, folderId, null, (templateClibs != null &&
							templateClibs.length > 0) ? templateClibs : null);
					}, editorUi.stateArg == null ||
						editorUi.stateArg.folderId == null);
					
				}, null, null, null, 'user', function(callback, error, username)
				{
					var oneWeek = new Date();
					oneWeek.setDate(oneWeek.getDate() - 7);
					
					editorUi.drive.listFiles(null, oneWeek, username? true : false, function(resp)
					{
						var results = [];
						
						for (var i = 0; i < resp.items.length; i++)
						{
							results.push(driveObjToTempDlg(resp.items[i]));
						}
						
						callback(results);
					}, error)
				}, function(str, callback, error, username)
				{
					editorUi.drive.listFiles(str, null, username? true : false, function(resp)
					{
						var results = [];
						
						for (var i = 0; i < resp.items.length; i++)
						{
							results.push(driveObjToTempDlg(resp.items[i]));
						}
						
						callback(results);
					}, error)
				}, function(obj, callback, error)
				{
					editorUi.drive.getFile(obj.id, function(file)
					{
						callback(file.data);
					}, error);
				}, null, null, false, false);
				
				editorUi.showDialog(tempDlg.container, window.innerWidth, window.innerHeight, true, false, null, false, true);

				return;	
			};
			
			var dlg = new NewDialog(editorUi, compact, !(editorUi.mode == App.MODE_DEVICE && 'chooseFileSystemEntries' in window));

			editorUi.showDialog(dlg.container, (compact) ? 350 : 620, (compact) ? 70 : 460, true, true, function(cancel)
			{
				editorUi.sidebar.hideTooltip();
				
				if (cancel && editorUi.getCurrentFile() == null)
				{
					editorUi.showSplash();
				}
			});
			
			dlg.init();
		});

		editorUi.actions.put('insertTemplate', new Action(mxResources.get('template') + '...', function()
		{
			if (graph.isEnabled() && !graph.isCellLocked(graph.getDefaultParent()))
			{
				var dlg = new NewDialog(editorUi, null, false, function(xml)
				{
					editorUi.hideDialog();
					
					if (xml != null)
					{
						var insertPoint = editorUi.editor.graph.getFreeInsertPoint();
						graph.setSelectionCells(editorUi.importXml(xml,
							Math.max(insertPoint.x, 20),
							Math.max(insertPoint.y, 20),
							true, null, null, true));
						graph.scrollCellToVisible(graph.getSelectionCell());
					}
				}, null, null, null, null, null, null, null, null, null, null,
					false, mxResources.get('insert'));
	
				editorUi.showDialog(dlg.container, 620, 460, true, true, function()
				{
					editorUi.sidebar.hideTooltip();
				});
				
				dlg.init();
			}
		})).isEnabled = isGraphEnabled;
		
		var shareCursorAction = editorUi.actions.addAction('shareCursor', function()
		{
			editorUi.setShareCursorPosition(!editorUi.isShareCursorPosition());;
		});
		
		shareCursorAction.setToggleAction(true);
		shareCursorAction.setSelectedCallback(function() { return editorUi.isShareCursorPosition(); });
		
		var showRemoteCursorsAction = editorUi.actions.addAction('showRemoteCursors', function()
		{
			editorUi.setShowRemoteCursors(!editorUi.isShowRemoteCursors());;
		});
		
		showRemoteCursorsAction.setToggleAction(true);
		showRemoteCursorsAction.setSelectedCallback(function() { return editorUi.isShowRemoteCursors(); });
		
		var pointAction = editorUi.actions.addAction('points', function()
		{
			editorUi.editor.graph.view.setUnit(mxConstants.POINTS);
		});
		
		pointAction.setToggleAction(true);
		pointAction.setSelectedCallback(function() { return editorUi.editor.graph.view.unit == mxConstants.POINTS; });
		
		var inchAction = editorUi.actions.addAction('inches', function()
		{
			editorUi.editor.graph.view.setUnit(mxConstants.INCHES);
		});
		
		inchAction.setToggleAction(true);
		inchAction.setSelectedCallback(function() { return editorUi.editor.graph.view.unit == mxConstants.INCHES; });
		
		var mmAction = editorUi.actions.addAction('millimeters', function()
		{
			editorUi.editor.graph.view.setUnit(mxConstants.MILLIMETERS);
		});
		
		mmAction.setToggleAction(true);
		mmAction.setSelectedCallback(function() { return editorUi.editor.graph.view.unit == mxConstants.MILLIMETERS; });

		var meterAction = editorUi.actions.addAction('meters', function()
		{
			editorUi.editor.graph.view.setUnit(mxConstants.METERS);
		});
		
		meterAction.setToggleAction(true);
		meterAction.setSelectedCallback(function() { return editorUi.editor.graph.view.unit == mxConstants.METERS; });

		this.put('units', new Menu(mxUtils.bind(this, function(menu, parent)
		{
			this.addMenuItems(menu, ['points', 'inches', 'millimeters', 'meters'], parent);
		
			if (Editor.currentTheme == 'min' ||
				Editor.currentTheme == 'simple' ||	
				Editor.currentTheme == 'sketch')
			{
				editorUi.menus.addMenuItems(menu, ['-', 'pageScale'], parent);
			}
		})));

		var pagesAction = editorUi.actions.addAction('pageTabs', function()
		{
			editorUi.setTabContainerVisible(!editorUi.isTabContainerVisible());
		});
		
		pagesAction.setToggleAction(true);
		pagesAction.setSelectedCallback(function() { return editorUi.isTabContainerVisible(); });
		
		var rulerAction = editorUi.actions.addAction('ruler', function()
		{
			editorUi.setRulerVisible(!editorUi.isRulerVisible());
		});
		rulerAction.setEnabled(editorUi.canvasSupported && document.documentMode != 9);
		rulerAction.setToggleAction(true);
		rulerAction.setSelectedCallback(function() { return editorUi.isRulerVisible(); });
		
        var fullscreenAction = editorUi.actions.addAction('fullscreen', function()
		{
			if (urlParams['embedInline'] == '1')
			{
				editorUi.setInlineFullscreen(!Editor.inlineFullscreen);
			}
			else
			{
				if (document.fullscreenElement == null)
				{
					document.body.requestFullscreen();
				}
				else
				{
					document.exitFullscreen();
				}
			}
		});

		fullscreenAction.visible = urlParams['embedInline'] == '1' ||
			(window == window.top && document.fullscreenEnabled &&
			document.body.requestFullscreen != null);
		fullscreenAction.setToggleAction(true);
		
		fullscreenAction.setSelectedCallback(function()
		{
			return urlParams['embedInline'] == '1' ? 
				Editor.inlineFullscreen :
				document.fullscreenElement != null;
		});

        var lightModeAction = editorUi.actions.put('lightMode', new Action(mxResources.get('light'), function(e)
        {
			editorUi.setAndPersistDarkMode(false);
        }));

		lightModeAction.setToggleAction(true);
		lightModeAction.setSelectedCallback(function()
		{
			return !editorUi.isAutoDarkMode(true) && !Editor.isDarkMode() && !Editor.cssDarkMode;
		});
		
        var darkModeAction = editorUi.actions.put('darkMode', new Action(mxResources.get('dark'), function(e)
        {
			editorUi.setAndPersistDarkMode(true);
        }));

		darkModeAction.setToggleAction(true);
		darkModeAction.setSelectedCallback(function()
		{
			return !editorUi.isAutoDarkMode(true) && (Editor.isDarkMode() || Editor.cssDarkMode);
		});
		
        var autoModeAction = editorUi.actions.put('autoMode', new Action(mxResources.get('automatic'), function(e)
        {
			editorUi.setAndPersistDarkMode('auto');
        }));

		autoModeAction.setToggleAction(true);
		autoModeAction.setSelectedCallback(function()
		{
			return editorUi.isAutoDarkMode(true);
		});

        var toggleSimpleModeAction = editorUi.actions.put('toggleSimpleMode', new Action(mxResources.get('simple'), function(e)
        {
			editorUi.setCurrentTheme((Editor.currentTheme == 'simple') ?
				((!Editor.isDarkMode()) ? 'kennedy' : 'dark') : 'simple');
        }));

		toggleSimpleModeAction.setToggleAction(true);
		toggleSimpleModeAction.visible = Editor.currentTheme != 'min' && Editor.currentTheme != 'sketch' &&
			Editor.currentTheme != 'atlas';
		toggleSimpleModeAction.setSelectedCallback(function() { return Editor.currentTheme == 'simple'; });

        var toggleSketchModeAction = editorUi.actions.put('toggleSketchMode', new Action(mxResources.get('sketch'), function(e)
        {
			editorUi.setSketchMode(!Editor.sketchMode);
        }));

		toggleSketchModeAction.setToggleAction(true);
		toggleSketchModeAction.setSelectedCallback(function() { return Editor.sketchMode; });
		
		editorUi.actions.addAction('properties...', function()
		{
			var dlg = new FilePropertiesDialog(editorUi);
			editorUi.showDialog(dlg.container, 340, 160, true, true);
			dlg.init();
		}).isEnabled = isGraphEnabled;
	
		if (window.mxFreehand)
		{
			editorUi.actions.put('insertFreehand', new Action(mxResources.get('freehand') + '...', function()
			{
				if (graph.isEnabled())
				{
					if (editorUi.freehandWindow == null)
					{
						var withBrush = !mxClient.IS_IE && !mxClient.IS_IE11;
						editorUi.freehandWindow = new FreehandWindow(
							editorUi, document.body.offsetWidth - 420, 102, 176,
							withBrush? 120 : 84, withBrush);
					}
					
					if (graph.freehand.isDrawing())
					{
						graph.freehand.stopDrawing();
					}
					else
					{
						graph.freehand.startDrawing();
					}
					
					editorUi.freehandWindow.window.setVisible(graph.freehand.isDrawing());
				}
			}, null, null, 'X')).isEnabled = function()
			{
				return isGraphEnabled() && mxClient.IS_SVG;
			};
		}
		
		editorUi.actions.put('exportXml', new Action(mxResources.get('formatXml') + '...', function()
		{
			var div = document.createElement('div');
			div.style.whiteSpace = 'nowrap';
			var noPages = editorUi.pages == null || editorUi.pages.length <= 1;
			
			var hd = document.createElement('h3');
			mxUtils.write(hd, mxResources.get('formatXml'));
			hd.style.cssText = 'width:100%;text-align:center;margin-top:0px;margin-bottom:4px';
			div.appendChild(hd);
			
			var selection = editorUi.addCheckbox(div, mxResources.get('selectionOnly'),
				false, graph.isSelectionEmpty());
			var compressed = editorUi.addCheckbox(div, mxResources.get('compressed'), Editor.defaultCompressed);
			var pages = editorUi.addCheckbox(div, mxResources.get('allPages'), !noPages, noPages);
			pages.style.marginBottom = '16px';
			
			mxEvent.addListener(selection, 'change', function()
			{
				if (selection.checked)
				{
					pages.setAttribute('disabled', 'disabled');
				}
				else
				{
					pages.removeAttribute('disabled');
				}
			});
			
			var dlg = new CustomDialog(editorUi, div, mxUtils.bind(this, function()
			{
				editorUi.downloadFile('xml', !compressed.checked, null,
					!selection.checked, noPages || !pages.checked);
			}), null, mxResources.get('export'));
			
			editorUi.showDialog(dlg.container, 300, 200, true, true);
		}));
		
		if (Editor.enableExportUrl)
		{
			editorUi.actions.put('exportUrl', new Action(mxResources.get('url') + '...', function()
			{
				editorUi.showPublishLinkDialog(mxResources.get('url'), true, null, null,
					function(linkTarget, linkColor, allPages, lightbox, editLink, layers, width, height, tags)
				{
					var params = [];

					if (tags)
					{
						params.push('tags=%7B%7D');
					}

					var dlg = new EmbedDialog(editorUi, editorUi.createLink(linkTarget, linkColor,
						allPages, lightbox, editLink, layers, null, true, params));
					editorUi.showDialog(dlg.container, 450, 240, true, true);
					dlg.init();
				});
			}));
		}
		
		editorUi.actions.put('exportHtml', new Action(mxResources.get('formatHtmlEmbedded') + '...', function()
		{
			if (editorUi.spinner.spin(document.body, mxResources.get('loading')))
			{
				editorUi.getPublicUrl(editorUi.getCurrentFile(), function(url)
				{
					editorUi.spinner.stop();
					
					editorUi.showHtmlDialog(mxResources.get('export'), null, url, function(publicUrl, zoomEnabled,
						initialZoom, linkTarget, linkColor, fit, allPages, layers, tags, lightbox, editLink)
					{
						editorUi.createHtml(publicUrl, zoomEnabled, initialZoom, linkTarget, linkColor, fit, allPages,
							layers, tags, lightbox, editLink, mxUtils.bind(this, function(html, scriptTag)
							{
								var basename = editorUi.getBaseFilename(allPages);
								var result = '<!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=5,IE=9" ><![endif]-->\n' +
									'<!DOCTYPE html>\n<html>\n<head>\n<title>' + mxUtils.htmlEntities(basename) + '</title>\n' +
									'<meta charset="utf-8"/>\n</head>\n<body>' + html + '\n' + scriptTag + '\n</body>\n</html>';
								editorUi.saveData(basename + ((basename.substring(basename.lenth - 7) ==
									'.drawio') ? '' : '.drawio') + '.html', 'html', result, 'text/html');
							}));
					});
				});
			}
		}));
		
		editorUi.actions.put('exportPdf', new Action(mxResources.get('formatPdf') + '...', function()
		{
			if (!EditorUi.isElectronApp && (editorUi.isOffline() || editorUi.printPdfExport))
			{
				// Export PDF action for chrome OS (same as print with different dialog title)
				editorUi.showDialog(new PrintDialog(editorUi, mxResources.get('formatPdf')).container, 360,
						(editorUi.pages != null && editorUi.pages.length > 1 && (editorUi.editor.editable ||
						urlParams['hide-pages'] != '1')) ?
						470 : 390, true, true);
			}
			else
			{
				var noPages = editorUi.pages == null || editorUi.pages.length <= 1;
				var div = document.createElement('div');
				div.style.whiteSpace = 'nowrap';
				
				var hd = document.createElement('h3');
				mxUtils.write(hd, mxResources.get('formatPdf'));
				hd.style.cssText = 'width:100%;text-align:center;margin-top:0px;margin-bottom:4px';
				div.appendChild(hd);
				
				var cropEnableFn = function()
				{
					if (allPages != this && this.checked)
					{
						crop.removeAttribute('disabled');
						crop.checked = !graph.pageVisible;
					}
					else
					{
						crop.setAttribute('disabled', 'disabled');
						crop.checked = false;
					}
				};
				
				var dlgH = 200;
				var pageCount = 1;
				var currentPage = null;
				
				if (editorUi.pdfPageExport && !noPages)
				{
					var allPages = editorUi.addRadiobox(div, 'pages', mxResources.get('allPages'), true);
					var pagesRadio = editorUi.addRadiobox(div, 'pages', mxResources.get('pages') + ':', false, null, true);

					var pagesFromInput = document.createElement('input');
					pagesFromInput.style.cssText = 'margin:0 8px 0 8px;'
					pagesFromInput.setAttribute('value', '1');
					pagesFromInput.setAttribute('type', 'number');
					pagesFromInput.setAttribute('min', '1');
					pagesFromInput.style.width = '50px';
					div.appendChild(pagesFromInput);
					
					var span = document.createElement('span');
					mxUtils.write(span, mxResources.get('to'));
					div.appendChild(span);
					
					var pagesToInput = pagesFromInput.cloneNode(true);
					div.appendChild(pagesToInput);

					mxEvent.addListener(pagesFromInput, 'focus', function()
					{
						pagesRadio.checked = true;
					});
					
					mxEvent.addListener(pagesToInput, 'focus', function()
					{
						pagesRadio.checked = true;
					});					

					function validatePageRange()
					{
						pagesToInput.value = Math.max(1, Math.min(pageCount, Math.max(parseInt(pagesToInput.value), parseInt(pagesFromInput.value))));
						pagesFromInput.value = Math.max(1, Math.min(pageCount, Math.min(parseInt(pagesToInput.value), parseInt(pagesFromInput.value))));
					};
					
					mxEvent.addListener(pagesFromInput, 'change', validatePageRange);
					mxEvent.addListener(pagesToInput, 'change', validatePageRange);
					
					if (editorUi.pages != null)
					{
						pageCount = editorUi.pages.length;
			
						if (editorUi.currentPage != null)
						{
							for (var i = 0; i < editorUi.pages.length; i++)
							{
								if (editorUi.currentPage == editorUi.pages[i])
								{
									currentPage = i + 1;
									pagesFromInput.value = currentPage;
									pagesToInput.value = currentPage;
									break;
								}
							}
						}
					}
					
					pagesFromInput.setAttribute('max', pageCount);
					pagesToInput.setAttribute('max', pageCount);
					mxUtils.br(div);

					var selection = editorUi.addRadiobox(div, 'pages', mxResources.get('selectionOnly'), false, graph.isSelectionEmpty());
					var crop = editorUi.addCheckbox(div, mxResources.get('crop'), false, true);
					var grid = editorUi.addCheckbox(div, mxResources.get('grid'), false, false);
					
					mxEvent.addListener(allPages, 'change', cropEnableFn);
					mxEvent.addListener(pagesRadio, 'change', cropEnableFn);
					mxEvent.addListener(selection, 'change', cropEnableFn);
					dlgH += 64;
				}
				else
				{
					var selection = editorUi.addCheckbox(div, mxResources.get('selectionOnly'),
							false, graph.isSelectionEmpty());
					var crop = editorUi.addCheckbox(div, mxResources.get('crop'),
							!graph.pageVisible || !editorUi.pdfPageExport,
							!editorUi.pdfPageExport);
					var grid = editorUi.addCheckbox(div, mxResources.get('grid'), false, false);
					
					// Crop is only enabled if selection only is selected
					if (!editorUi.pdfPageExport)
					{
						mxEvent.addListener(selection, 'change', cropEnableFn);	
					}
				}
				
				var isDrawioWeb = !mxClient.IS_CHROMEAPP && !EditorUi.isElectronApp &&
					editorUi.getServiceName() == 'draw.io';

				var transparentBkg = null, include = null;
				
				if (EditorUi.isElectronApp || isDrawioWeb)
				{
					include = editorUi.addCheckbox(div, mxResources.get('includeCopyOfMyDiagram'),
						Editor.defaultIncludeDiagram);
					dlgH += 30;
				}
				
				if (isDrawioWeb)
				{
					transparentBkg = editorUi.addCheckbox(div,
							mxResources.get('transparentBackground'), false);
					
					dlgH += 30;
				}

				var dlg = new CustomDialog(editorUi, div, mxUtils.bind(this, function()
				{
					var pageRange = null;

					if (!noPages)
					{
						var from = parseInt(pagesFromInput.value);
						var to = parseInt(pagesToInput.value);
						pageRange = (!allPages.checked &&
							(from != currentPage || to != currentPage)) ?
							{from: Math.max(0, Math.min(pageCount - 1, from - 1)),
							to: Math.max(0, Math.min(pageCount - 1, to - 1))} : null;
					}
					
					editorUi.downloadFile('pdf', null, null, !selection.checked,
						noPages? true : !allPages.checked && pageRange == null,
						!crop.checked, transparentBkg != null && transparentBkg.checked, null,
						null, grid.checked, include != null && include.checked, pageRange);
				}), null, mxResources.get('export'));
				editorUi.showDialog(dlg.container, 300, dlgH, true, true);
			}
		}));

		editorUi.actions.addAction('open...', function()
		{
			editorUi.pickFile();
		});
		
		editorUi.actions.addAction('close', function()
		{
			var currentFile = editorUi.getCurrentFile();
			
			function fn()
			{
				if (currentFile != null)
				{
					currentFile.removeDraft();
				}
				
				editorUi.fileLoaded(null);
			};
			
			if (currentFile != null && currentFile.isModified())
			{
				editorUi.confirm(mxResources.get('allChangesLost'), null, fn,
					mxResources.get('cancel'), mxResources.get('discardChanges'));
			}
			else
			{
				fn();
			}
		});
		
		editorUi.actions.addAction('editShape...', mxUtils.bind(this, function()
		{
			var cells = graph.getSelectionCells();
			
			if (graph.getSelectionCount() == 1)
			{
				var cell = graph.getSelectionCell();
				var state = graph.view.getState(cell);
				
				if (state != null && state.shape != null && state.shape.stencil != null)
				{
			    	var dlg = new EditShapeDialog(editorUi, cell, mxResources.get('editShape') + ':', 630, 400);
					editorUi.showDialog(dlg.container, 640, 480, true, false);
					dlg.init();
				}
			}
		}));
		
		editorUi.actions.addAction('revisionHistory...', function()
		{
			if (!editorUi.isRevisionHistorySupported())
			{
				editorUi.showError(mxResources.get('error'), mxResources.get('notAvailable'), mxResources.get('ok'));
			}
			else if (editorUi.spinner.spin(document.body, mxResources.get('loading')))
			{
				editorUi.getRevisions(mxUtils.bind(this, function(revs, restoreFn)
				{
					editorUi.spinner.stop();
					var dlg = new RevisionDialog(editorUi, revs, restoreFn);
					editorUi.showDialog(dlg.container, 640, 480, true, true);
					dlg.init();
				}), mxUtils.bind(this, function(err)
				{
					editorUi.handleError((err != null) ? err : mxResources.get('notAvailable'));
				}));
			}
		});
		
		editorUi.actions.addAction('createRevision', function()
		{
			editorUi.actions.get('save').funct();
		}, null, null, Editor.ctrlKey + '+S');
		
		var action = editorUi.actions.addAction('synchronize', function()
		{
			editorUi.synchronizeCurrentFile(DrawioFile.SYNC == 'none');
		}, null, null, 'Alt+Shift+S');
		
		// Changes the label if synchronization is disabled
		if (DrawioFile.SYNC == 'none')
		{
			action.label = mxResources.get('refresh');
		}
		
		editorUi.actions.addAction('upload...', function()
		{
			var file = editorUi.getCurrentFile();
			
			if (file != null)
			{
				// Data is pulled from global variable after tab loads
				// LATER: Change to use message passing to deal with potential cross-domain
				window.drawdata = editorUi.getFileData();
				var filename = (file.getTitle() != null) ? file.getTitle() : editorUi.defaultFilename;
				editorUi.openLink(window.location.protocol + '//' + window.location.host + '/?create=drawdata&' +
						((editorUi.mode == App.MODE_DROPBOX) ? 'mode=dropbox&' : '') +
						'title=' + encodeURIComponent(filename), null, true);
			}
		});

		if (typeof(MathJax) !== 'undefined')
		{
			var action = editorUi.actions.addAction('mathematicalTypesetting', function()
			{
				var change = new ChangePageSetup(editorUi);
				change.ignoreColor = true;
				change.ignoreImage = true;
				change.mathEnabled = !editorUi.isMathEnabled();
				
				graph.model.execute(change);
			});
			
			action.setToggleAction(true);
			action.setSelectedCallback(function() { return editorUi.isMathEnabled(); });
			action.isEnabled = isGraphEnabled;
		}
		
		if (isLocalStorage)
		{
			var action = editorUi.actions.addAction('showStartScreen', function()
			{
				mxSettings.setShowStartScreen(!mxSettings.getShowStartScreen());
				mxSettings.save();
			});
			
			action.setToggleAction(true);
			action.setSelectedCallback(function() { return mxSettings.getShowStartScreen(); });
		}

		var autosaveAction = editorUi.actions.addAction('autosave', function()
		{
			editorUi.editor.setAutosave(!editorUi.editor.autosave);
		});
		
		autosaveAction.setToggleAction(true);
		autosaveAction.setSelectedCallback(function()
		{
			return autosaveAction.isEnabled() && editorUi.editor.autosave;
		});
		
		editorUi.actions.addAction('editGeometry...', function()
		{
			var cells = graph.getSelectionCells();
			var vertices = [];
			
			for (var i = 0; i < cells.length; i++)
			{
				if (graph.getModel().isVertex(cells[i]))
				{
					vertices.push(cells[i]);
				}
			}
			
			if (vertices.length > 0)
			{
				var dlg = new EditGeometryDialog(editorUi, vertices);
				editorUi.showDialog(dlg.container, 200, 270, true, true);
				dlg.init();
			}
		}, null, null, Editor.ctrlKey + '+Shift+M');
		
		editorUi.actions.addAction('copyStyle', function()
		{
			if (graph.isEnabled() && !graph.isSelectionEmpty())
			{
				editorUi.copiedStyle = graph.copyStyle(graph.getSelectionCell())
			}
		}, null, null, 'Alt+Shift+Q');

		editorUi.actions.addAction('pasteStyle', function()
		{
			if (graph.isEnabled() && !graph.isSelectionEmpty() && editorUi.copiedStyle != null)
			{
				graph.pasteStyle(editorUi.copiedStyle, graph.getSelectionCells())
			}
		}, null, null, 'Alt+Shift+W');
		
		editorUi.actions.put('exportSvg', new Action(mxResources.get('formatSvg') + '...', function()
		{
			editorUi.showExportDialog(mxResources.get('formatSvg'), true, mxResources.get('export'),
				'https://www.drawio.com/doc/faq/export-diagram',
				mxUtils.bind(this, function(scale, transparentBackground, ignoreSelection,
					addShadow, editable, embedImages, border, cropImage, currentPage,
					linkTarget, grid, theme, exportType, embedFonts, lblToSvg)
				{
					var val = parseInt(scale);
					
					if (!isNaN(val) && val > 0)
					{
						if (lblToSvg)
						{
							editorUi.downloadFile('remoteSvg', null, null, ignoreSelection, null, cropImage,
										 transparentBackground, scale, border, null, editable);
						}
						else
						{
							editorUi.exportSvg(val / 100, transparentBackground, ignoreSelection,
								addShadow, editable, embedImages, border, !cropImage, false,
								linkTarget, theme, exportType, embedFonts);
						}
					}
				}), true, null, 'svg', true);
		}));
		
		editorUi.actions.put('exportPng', new Action(mxResources.get('formatPng') + '...', function()
		{
			if (editorUi.isExportToCanvas())
			{
				editorUi.showExportDialog(mxResources.get('image'), false, mxResources.get('export'),
					'https://www.drawio.com/doc/faq/export-diagram',
					mxUtils.bind(this, function(scale, transparentBackground, ignoreSelection, addShadow, editable,
						embedImages, border, cropImage, currentPage, dummy, grid, theme, exportType)
					{
						var val = parseInt(scale);
						
						if (!isNaN(val) && val > 0)
						{
							editorUi.exportImage(val / 100, transparentBackground, ignoreSelection,
								addShadow, editable, border, !cropImage, false, null, grid, null,
								theme, exportType);
						}
					}), true, Editor.defaultIncludeDiagram, 'png', true);
			}
			else if (!editorUi.isOffline() && (!mxClient.IS_IOS || !navigator.standalone))
			{
				editorUi.showRemoteExportDialog(mxResources.get('export'), null, mxUtils.bind(this, function(ignoreSelection, editable, transparent, scale, border)
				{
					editorUi.downloadFile((editable) ? 'xmlpng' : 'png', null, null, ignoreSelection, null, null, transparent, scale, border);
				}), false, true);
			}
		}));
		
		editorUi.actions.put('exportJpg', new Action(mxResources.get('formatJpg') + '...', function()
		{
			if (editorUi.isExportToCanvas())
			{
				editorUi.showExportDialog(mxResources.get('image'), false, mxResources.get('export'),
					'https://www.drawio.com/doc/faq/export-diagram',
					mxUtils.bind(this, function(scale, transparentBackground, ignoreSelection, addShadow, editable,
						embedImages, border, cropImage, currentPage, dummy, grid, theme, exportType)
					{
						var val = parseInt(scale);
						
						if (!isNaN(val) && val > 0)
						{
							editorUi.exportImage(val / 100, false, ignoreSelection,
								addShadow, false, border, !cropImage, false, 'jpeg',
								grid, null, theme, exportType);
						}
					}), true, false, 'jpeg', true);
			}
			else if (!editorUi.isOffline() && (!mxClient.IS_IOS || !navigator.standalone))
			{
				editorUi.showRemoteExportDialog(mxResources.get('export'), null, mxUtils.bind(this, function(ignoreSelection, editable, tranaparent, scale, border)
				{
					editorUi.downloadFile('jpeg', null, null, ignoreSelection, null, null, null, scale, border);
				}), true, true);
			}
		}));

		action = editorUi.actions.addAction('copyAsImage', mxUtils.bind(this, function()
		{
			var cells = mxUtils.sortCells(graph.model.getTopmostCells(graph.getSelectionCells()));
			var xml = mxUtils.getXml((cells.length == 0) ? editorUi.editor.getGraphXml() : graph.encodeCells(cells));
			editorUi.copyImage(cells, xml);
		}));

		// Disabled in Safari as operation is not allowed
		action.visible = Editor.enableNativeCipboard && editorUi.isExportToCanvas() && !mxClient.IS_SF;
		
		action = editorUi.actions.put('shadowVisible', new Action(mxResources.get('shadow'), function()
		{
			graph.setShadowVisible(!graph.shadowVisible);
		}));
		action.setToggleAction(true);
		action.setSelectedCallback(function() { return graph.shadowVisible; });

		editorUi.actions.put('about', new Action(mxResources.get('about') + ' ' + EditorUi.VERSION + '...', function(arg1, evt)
		{
			if (evt != null && mxEvent.isShiftDown(evt))
			{
				mxLog.show();

				if (window.console != null)
				{
					console.log(editorUi, window);
				}
			}
			else if (editorUi.isOffline() || mxClient.IS_CHROMEAPP || EditorUi.isElectronApp)
			{
				editorUi.alert(editorUi.editor.appName + ' ' + EditorUi.VERSION);
			}
			else
			{
				editorUi.openLink('https://www.drawio.com/');
			}
		}));
		
		editorUi.actions.addAction('support...', function()
		{
			if (EditorUi.isElectronApp)
			{
				editorUi.openLink('https://github.com/jgraph/drawio-desktop/wiki/Getting-Support');
			}
			else
			{
				editorUi.openLink('https://github.com/jgraph/drawio/wiki/Getting-Support');
			}
		});

		editorUi.actions.addAction('exportOptionsDisabled...', function()
		{
			editorUi.handleError({message: mxResources.get('exportOptionsDisabledDetails')},
				mxResources.get('exportOptionsDisabled'));
		});

		editorUi.actions.addAction('keyboardShortcuts...', function()
		{
			if (mxClient.IS_SVG && !mxClient.IS_CHROMEAPP && !EditorUi.isElectronApp)
			{
				editorUi.openLink('shortcuts.svg');
			}
			else
			{
				editorUi.openLink('https://viewer.diagrams.net/#Uhttps%3A%2F%2Fviewer.diagrams.net%2Fshortcuts.svg');
			}
		});

		editorUi.actions.addAction('feedback...', function()
		{
			var dlg = new FeedbackDialog(editorUi);
			editorUi.showDialog(dlg.container, 610, 360, true, false);
			dlg.init();
		});

		editorUi.actions.addAction('quickStart...', function()
		{
			if ('ac.draw.io' === window.location.hostname)
			{
				editorUi.openLink('https://www.youtube.com/watch?v=s5BG0705MHU');
			}
			else
			{
				editorUi.openLink('https://www.youtube.com/watch?v=Z0D96ZikMkc');
			}
		});
		
		action = editorUi.actions.addAction('tags', mxUtils.bind(this, function()
		{
			if (this.tagsWindow == null)
			{
				this.tagsWindow = new TagsWindow(editorUi, document.body.offsetWidth - 400, 60, 212, 200);
				this.tagsWindow.window.addListener('show', mxUtils.bind(this, function()
				{
					editorUi.fireEvent(new mxEventObject('tags'));
				}));
				this.tagsWindow.window.addListener('hide', function()
				{
					editorUi.fireEvent(new mxEventObject('tags'));
				});
				this.tagsWindow.window.setVisible(true);
				editorUi.fireEvent(new mxEventObject('tags'));
			}
			else
			{
				this.tagsWindow.window.setVisible(!this.tagsWindow.window.isVisible());
			}
		}), null, null, Editor.ctrlKey + '+K');
		action.setToggleAction(true);
		action.setSelectedCallback(mxUtils.bind(this, function() { return this.tagsWindow != null && this.tagsWindow.window.isVisible(); }));

		action = editorUi.actions.addAction('findReplace', mxUtils.bind(this, function(arg1, evt)
		{
			var findReplace = graph.isEnabled() && (evt == null || !mxEvent.isShiftDown(evt));
			var evtName = (findReplace) ? 'findReplace' : 'find';
			var name = evtName + 'Window';
			
			if (this[name] == null)
			{
				var modern = (Editor.currentTheme == 'min' ||
					Editor.currentTheme == 'simple' ||	
					Editor.currentTheme == 'sketch');
				var w = (findReplace) ? ((modern) ? 330 : 300) : 240;
				var h = (findReplace) ? ((modern) ? 304 : 288) : 170;
				this[name] = new FindWindow(editorUi,
					document.body.offsetWidth - (w + 20),
					100, w, h, findReplace);
				this[name].window.addListener('show', function()
				{
					editorUi.fireEvent(new mxEventObject(evtName));
				});
				this[name].window.addListener('hide', function()
				{
					editorUi.fireEvent(new mxEventObject(evtName));
				});
				this[name].window.setVisible(true);
			}
			else
			{
				this[name].window.setVisible(!this[name].window.isVisible());
			}
		}), null, null, Editor.ctrlKey + '+F');
		action.setToggleAction(true);
		action.setSelectedCallback(mxUtils.bind(this, function()
		{
			var name = (graph.isEnabled()) ? 'findReplaceWindow' : 'findWindow';
			
			return this[name] != null && this[name].window.isVisible();
		}));
		
		editorUi.actions.put('exportVsdx', new Action(mxResources.get('formatVsdx') + ' (beta)...', function()
		{
			var noPages = editorUi.pages == null || editorUi.pages.length <= 1;
			
			if (noPages)
			{
				editorUi.exportVisio();
			}
			else
			{
				var div = document.createElement('div');
				div.style.whiteSpace = 'nowrap';

				var hd = document.createElement('h3');
				mxUtils.write(hd, mxResources.get('formatVsdx'));
				hd.style.cssText = 'width:100%;text-align:center;margin-top:0px;margin-bottom:4px';
				div.appendChild(hd);
				
				var pages = editorUi.addCheckbox(div, mxResources.get('allPages'), !noPages, noPages);
				pages.style.marginBottom = '16px';
				
				var dlg = new CustomDialog(editorUi, div, mxUtils.bind(this, function()
				{
					editorUi.exportVisio(!pages.checked);
				}), null, mxResources.get('export'));
				
				editorUi.showDialog(dlg.container, 300, 130, true, true);
			}
		}));
		
		if (isLocalStorage && localStorage != null && urlParams['embed'] != '1')
		{
			editorUi.actions.addAction('configuration...', function()
			{
				// Moves show start screen option to configuration dialog in sketch
				var splashCb = document.createElement('input');
				splashCb.setAttribute('type', 'checkbox');
				splashCb.style.marginRight = '8px';
				splashCb.checked = mxSettings.getShowStartScreen();
				splashCb.defaultChecked = splashCb.checked;

				if (Editor.isSettingsEnabled() && (Editor.currentTheme == 'sketch' ||
					Editor.currentTheme == 'simple' || Editor.currentTheme == 'min'))
				{
					var showSplash = document.createElement('span');
					showSplash.style.display = 'flex';
					showSplash.style.alignItems = 'center';
					showSplash.style['float'] = 'right';
					showSplash.style.cursor = 'pointer';
					showSplash.style.userSelect = 'none';
					showSplash.style.marginTop = '-3px';
					showSplash.appendChild(splashCb);
					mxUtils.write(showSplash, mxResources.get('showStartScreen'));

					mxEvent.addListener(showSplash, 'click', function(evt)
					{
						if (mxEvent.getSource(evt) != splashCb)
						{	
							splashCb.checked = !splashCb.checked;
						}
					});

					header = showSplash;
				}
				
				var buttons = [[mxResources.get('reset'), function()
				{
					editorUi.confirm(mxResources.get('areYouSure'), function()
					{
						try
						{
							localStorage.removeItem(Editor.configurationKey);
							editorUi.hideDialog();
							editorUi.alert(mxResources.get('restartForChangeRequired'));
						}
						catch (e)
						{
							editorUi.handleError(e);
						}
					});
				}]];
				
				if (!editorUi.isOfflineApp() && isLocalStorage && editorUi.mode != App.MODE_ATLAS)
				{
					var pluginsAction = editorUi.actions.get('plugins');

					if (pluginsAction != null && (Editor.currentTheme == 'sketch' ||
						Editor.currentTheme == 'simple' || Editor.currentTheme == 'min'))
					{
						// TODO: Show change message only when plugins have changed
						buttons.push([mxResources.get('plugins'), pluginsAction.funct]);
					}
				}
				
				if (!EditorUi.isElectronApp)
				{
					buttons.push([mxResources.get('link'), function(evt, input)
					{
						if (input.value.length > 0)
						{
							try
							{
								var obj = JSON.parse(input.value);
								var url = window.location.protocol + '//' + window.location.host +
									'/' + editorUi.getSearch() + '#_CONFIG_' +
									Graph.compress(JSON.stringify(obj));
								var dlg = new EmbedDialog(editorUi, url);
								editorUi.showDialog(dlg.container, 450, 240, true);
								dlg.init();
							}
							catch (e)
							{
								editorUi.handleError(e);	
							}
						}
						else
						{
							editorUi.handleError({message: mxResources.get('invalidInput')});
						}
					}])
				}

				if (editorUi.getServiceName() != 'atlassian' && urlParams['embed'] != '1')
				{
					buttons.push([mxResources.get('preferences'), function()
					{
						editorUi.showLocalStorageDialog(mxResources.get('preferences') + ':', Editor.settingsKey,
							[[mxResources.get('reset'), function()
							{
								editorUi.confirm(mxResources.get('areYouSure'), function()
								{
									try
									{
										localStorage.removeItem(Editor.settingsKey);
										localStorage.removeItem('.drawio-config');
										editorUi.hideDialog();
										editorUi.alert(mxResources.get('restartForChangeRequired'));
									}
									catch (e)
									{
										editorUi.handleError(e);
									}
								});
							}]]);
					}]);
				}
				
				editorUi.showLocalStorageDialog(mxResources.get('configuration') + ':', Editor.configurationKey,
					buttons, splashCb.parentNode, 'https://www.drawio.com/doc/faq/configure-diagram-editor',
					function()
					{
						if (splashCb.parentNode != null)
						{
							mxSettings.setShowStartScreen(splashCb.checked);
							mxSettings.save();
						}
					});
			});
		}
		
		// Adds language menu to options only if localStorage is available for
		// storing the choice. We do not want to use cookies for older browsers.
		// Note that the URL param lang=XX is available for setting the language
		// in older browsers. URL param has precedence over the saved setting.
		if (mxClient.IS_CHROMEAPP || isLocalStorage)
		{
			this.put('language', new Menu(mxUtils.bind(this, function(menu, parent)
			{
				var addLangItem = mxUtils.bind(this, function (id)
				{
					var lang = (id == '') ? mxResources.get('automatic') : mxLanguageMap[id];
					var item = null;
					
					if (lang != '')
					{
						item = menu.addItem(lang, null, mxUtils.bind(this, function()
						{
							editorUi.setAndPersistLanguage(id);
							editorUi.alert(mxResources.get('restartForChangeRequired'));
						}), parent);
						
						if (id == mxLanguage || (id == '' && mxLanguage == null))
						{
							menu.addCheckmark(item, Editor.checkmarkImage);
						}
					}
					
					return item;
				});
				
				addLangItem('');
				menu.addSeparator(parent);

				// LATER: Sort menu by language name
				for(var langId in mxLanguageMap) 
				{
					addLangItem(langId);
				}
			})));

			// Extends the menubar with the language menu
			var menusCreateMenuBar = Menus.prototype.createMenubar;
			Menus.prototype.createMenubar = function(container)
			{
				var menubar = menusCreateMenuBar.apply(this, arguments);
				
				if ((urlParams['embed'] != '1' || urlParams['atlas'] == '1') &&
					menubar != null && Editor.enableSimpleTheme &&
					editorUi.getServiceName() != 'atlassian')
				{
					var themeMenu = this.get('dynamicAppearance');
					
					if (themeMenu != null)
					{
						var elt = menubar.addMenu('', themeMenu.funct);
						elt.setAttribute('title', mxResources.get('appearance'));
						elt.className = 'geToolbarButton geAdaptiveAsset';
						elt.style.backgroundPosition = 'center center';
						elt.style.backgroundRepeat = 'no-repeat';
						elt.style.backgroundSize = '100% 100%';
						elt.style.display = 'inline-block';
						elt.style.cursor = 'pointer';
						elt.style.zIndex = '1';

						// Depends on theme
						elt.style.position = 'absolute';
						elt.style.height = '18px';
						elt.style.width = '18px';

						if (Editor.currentTheme == 'atlas')
						{
							elt.style.filter = 'invert(100%)';
							elt.style.right = '11px';
							elt.style.top = '10px';
						}
						else
						{
							elt.style.right = '10px';
							elt.style.top = '5px';
						}
						
						document.body.appendChild(elt);
						menubar.langIcon = elt;

						var updateThemeElement = mxUtils.bind(this, function()
						{
							var iw = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
							
							elt.style.display = (Editor.currentTheme == 'atlas' || Editor.currentTheme == 'min' ||
								Editor.currentTheme == 'sketch') ? 'none' : '';

							if (Editor.currentTheme == 'simple')
							{
								if (iw < 750)
								{
									elt.style.backgroundImage = 'url(' + Editor.thinDoubleArrowRightImage + ')';
								}
								else
								{
									elt.style.backgroundImage = 'url(' + ((Editor.isDarkMode() || Editor.cssDarkMode) ?
										Editor.thinDarkImage : Editor.thinLightImage) + ')';
								}
							}
							else
							{
								elt.style.backgroundImage = 'url(' + ((Editor.isDarkMode()) ?
									Editor.darkModeImage : Editor.lightModeImage) + ')';
							}
						});

						this.editorUi.addListener('currentThemeChanged', updateThemeElement);
						this.editorUi.addListener('darkModeChanged', updateThemeElement);
						mxEvent.addListener(window, 'resize', updateThemeElement);
						updateThemeElement();
					}
				}

				return menubar;
			};
		}
		
		editorUi.customLayoutConfig = [{'layout': 'mxHierarchicalLayout',
			'config':
			{'orientation': 'west',
			'intraCellSpacing': 30,
			'interRankCellSpacing': 100,
			'interHierarchySpacing': 60,
			'parallelEdgeSpacing': 10}}];
		
		// Adds action for running layouts
		editorUi.actions.addAction('runLayout', function()
		{
	    	editorUi.showCustomLayoutDialog(JSON.stringify(
				editorUi.customLayoutConfig, null, 2));
		});

		// Adds action for converting dark mode colors
		if (Editor.enableCssDarkMode)
		{
			editorUi.actions.put('convertDarkModeColors', new Action('Dark Mode Colors...', function(evt)
			{
				if (editorUi.darkModeColorsWindow == null)
				{
					editorUi.darkModeColorsWindow = new DarkModeColorsWindow(
						editorUi, document.body.offsetWidth - 520, 80, 200, 100);
				}

				editorUi.darkModeColorsWindow.window.setVisible(true);
			}));
		}

		// Adds fullscreen toggle to zoom menu in sketch and min
        var viewZoomMenu = this.get('viewZoom');
		var viewZoomMenuFunct = viewZoomMenu.funct;
		
		viewZoomMenu.funct = mxUtils.bind(this, function(menu, parent)
		{
			viewZoomMenuFunct.apply(this, arguments);
			
			if (Editor.currentTheme == 'sketch' || Editor.currentTheme == 'min')
			{
				this.addMenuItems(menu, ['-', 'outline', 'fullscreen'], parent);
			}
		});
		
		var layoutMenu = this.get('layout');
		var layoutMenuFunct = layoutMenu.funct;
		
		layoutMenu.funct = function(menu, parent)
		{
			layoutMenuFunct.apply(this, arguments);

			menu.addItem(mxResources.get('orgChart'), null, function()
			{
				var branchOptimizer = null, parentChildSpacingVal = 20, siblingSpacingVal = 20;
				
				// Invoked when orgchart code was loaded
				var delayed = function()
				{
					if (typeof mxOrgChartLayout !== 'undefined' && branchOptimizer != null)
					{
						editorUi.tryAndHandle(mxUtils.bind(this, function()
						{
							var graph = editorUi.editor.graph;
							var orgChartLayout = new mxOrgChartLayout(graph,
								branchOptimizer, parentChildSpacingVal, siblingSpacingVal);
							var cell = graph.getDefaultParent();
							
							if (graph.model.getChildCount(graph.getSelectionCell()) > 1)
							{
								cell = graph.getSelectionCell();
							}
							
							orgChartLayout.execute(cell);
						}));
					}
				};

				var div = document.createElement('div');
				
				var title = document.createElement('div');
				title.style.marginTop = '6px';
				title.style.display = 'inline-block';
				title.style.width = '140px';
				mxUtils.write(title, mxResources.get('orgChartType') + ': ');
				
				div.appendChild(title);
				
				var typeSelect = document.createElement('select');
				typeSelect.style.width = '200px';
				typeSelect.style.boxSizing = 'border-box';
				
				//Types are hardcoded here since the code is not loaded yet
				var typesArr = [mxResources.get('linear'),
					mxResources.get('hanger2'),
					mxResources.get('hanger4'),
					mxResources.get('fishbone1'),
					mxResources.get('fishbone2'),
					mxResources.get('1ColumnLeft'),
					mxResources.get('1ColumnRight'),
					mxResources.get('smart')
				];
				
				for (var i = 0; i < typesArr.length; i++)
				{
					var option = document.createElement('option');
					mxUtils.write(option, typesArr[i]);
					option.value = i;
					
					if (i == 2)
					{
						option.setAttribute('selected', 'selected');
					}
					
					typeSelect.appendChild(option);
				}
					
				mxEvent.addListener(typeSelect, 'change', function()
				{
					branchOptimizer = typeSelect.value;
				});
				
				div.appendChild(typeSelect);
				
				title = document.createElement('div');
				title.style.marginTop = '6px';
				title.style.display = 'inline-block';
				title.style.width = '140px';
				mxUtils.write(title, mxResources.get('parentChildSpacing') + ': ');
				div.appendChild(title);
				
				var parentChildSpacing = document.createElement('input');
				parentChildSpacing.type = 'number';
				parentChildSpacing.value = parentChildSpacingVal;
				parentChildSpacing.style.width = '200px';
				parentChildSpacing.style.boxSizing = 'border-box';
				div.appendChild(parentChildSpacing);
				
				mxEvent.addListener(parentChildSpacing, 'change', function()
				{
					parentChildSpacingVal = parentChildSpacing.value;
				});
				
				title = document.createElement('div');
				title.style.marginTop = '6px';
				title.style.display = 'inline-block';
				title.style.width = '140px';
				mxUtils.write(title, mxResources.get('siblingSpacing') + ': ');
				div.appendChild(title);
				
				var siblingSpacing = document.createElement('input');
				siblingSpacing.type = 'number';
				siblingSpacing.value = siblingSpacingVal;
				siblingSpacing.style.width = '200px';
				siblingSpacing.style.boxSizing = 'border-box';
				div.appendChild(siblingSpacing);
				
				mxEvent.addListener(siblingSpacing, 'change', function()
				{
					siblingSpacingVal = siblingSpacing.value;
				});

				var customBtn = mxUtils.button(mxResources.get('custom') + '...', function()
				{
					var value = [{layout: 'mxOrgChartLayout',
						config: {
							branchOptimizer: parseInt(typeSelect.value),
							parentChildSpacing: parseInt(parentChildSpacing.value),
							siblingSpacing: parseInt(siblingSpacing.value)
						}
					}];

					editorUi.hideDialog();
					editorUi.showCustomLayoutDialog(
						JSON.stringify(value, null, 2));
				});
				
				customBtn.className = 'geBtn';

				var dlg = new CustomDialog(editorUi, div, function()
				{
					if (branchOptimizer == null)
					{
						branchOptimizer = 2;
					}
					
					editorUi.loadOrgChartLayouts(delayed);
				}, null, null, null, customBtn);

				editorUi.showDialog(dlg.container, 355, 140, true, true);
			}, parent, null, isGraphEnabled());
			
			menu.addSeparator(parent);
			
			menu.addItem(mxResources.get('parallels'), null, mxUtils.bind(this, function()
			{
				editorUi.tryAndHandle(mxUtils.bind(this, function()
				{
					var layout = new mxParallelEdgeLayout(graph);
					layout.checkOverlap = true;

					editorUi.prompt(mxResources.get('spacing'), layout.spacing, mxUtils.bind(this, function(newValue)
					{
						editorUi.tryAndHandle(mxUtils.bind(this, function()
						{
							layout.spacing = newValue;

							editorUi.executeLayout(function()
							{
								layout.execute(graph.getDefaultParent(), (!graph.isSelectionEmpty()) ?
									graph.getSelectionCells() : null);
							}, false);
						}));
					}));
				}));
			}), parent);
			
			menu.addSeparator(parent);
			editorUi.menus.addMenuItem(menu, 'runLayout', parent, null, null, mxResources.get('custom') + '...');
		};
		
		this.put('help', new Menu(mxUtils.bind(this, function(menu, parent)
		{
			if (!mxClient.IS_CHROMEAPP && editorUi.isOffline())
			{
				this.addMenuItems(menu, ['about'], parent);
			}
			else
			{
				// No translation for menu item since help is english only
				var item = menu.addItem('Search:', null, null, parent, null, null, false);
				item.style.cursor = 'default';
				
				var input = document.createElement('input');
				input.setAttribute('type', 'text');
				input.setAttribute('size', '25');
				input.style.borderWidth = '1px';
				input.style.marginLeft = '8px';

				mxEvent.addListener(input, 'keydown', mxUtils.bind(this, function(e)
				{
					var term = mxUtils.trim(input.value);
					
					if (e.keyCode == 13 && term.length > 0)
					{
						this.editorUi.openLink('https://www.drawio.com/search?src=' +
							(EditorUi.isElectronApp ? 'DESKTOP' : encodeURIComponent(location.host)) + 
							'&search=' + encodeURIComponent(term));
						input.value = '';
						EditorUi.logEvent({category: 'SEARCH-HELP', action: 'search', label: term});
						
						window.setTimeout(mxUtils.bind(this, function()
						{
							this.editorUi.hideCurrentMenu();
						}), 0);
					}
	                else if (e.keyCode == 27)
	                {
	                    input.value = '';
	                }
				}));
				
				item.firstChild.nextSibling.appendChild(input);
				
				mxEvent.addGestureListeners(input, function(evt)
				{
					if (document.activeElement != input)
					{
						input.focus();
					}
					
					mxEvent.consume(evt);
				}, function(evt)
				{
					mxEvent.consume(evt);
				}, function(evt)
				{
					mxEvent.consume(evt);
				});
				
				window.setTimeout(function()
				{
					input.focus();
				}, 0);

				if (EditorUi.isElectronApp)
				{
					editorUi.actions.addAction('website...', function()
					{
						editorUi.openLink('https://www.drawio.com');
					});
					
					editorUi.actions.addAction('check4Updates', function()
					{
						editorUi.checkForUpdates();
					});
					
					this.addMenuItems(menu, ['-', 'keyboardShortcuts', 'quickStart',
						'website', 'support', '-'], parent);

					if (urlParams['disableUpdate'] != '1')
					{
						this.addMenuItems(menu, ['check4Updates'], parent);
					}

					this.addMenuItems(menu, ['openDevTools', '-', 'about'], parent);
				}
				else
				{
					this.addMenuItems(menu, ['-', 'keyboardShortcuts',
						'quickStart', 'support', '-', 'about'], parent);
				}
			}
			
			if (urlParams['test'] == '1')
			{
				menu.addSeparator(parent);
				this.addSubmenu('testDevelop', menu, parent);
			}
		})));
		
		editorUi.actions.addAction('languageCode...', function()
		{
			var lang = Graph.diagramLanguage || '';
					
			var dlg = new FilenameDialog(editorUi, lang, mxResources.get('ok'), mxUtils.bind(this, function(newLang)
			{
				if (newLang != null)
				{
					Graph.diagramLanguage = (newLang.length > 0) ? newLang : null;
					Graph.translateDiagram = true;
					graph.refresh();
				}
			}), mxResources.get('languageCode'), null, null, 'https://www.drawio.com/blog/translate-diagrams');
			editorUi.showDialog(dlg.container, 340, 96, true, true);
			dlg.init();
		});
		
		this.put('diagramLanguage', new Menu(mxUtils.bind(this, function(menu, parent)
		{
			this.addMenuItems(menu, ['languageCode', '-'], parent);

			var item = menu.addItem(mxResources.get('disabled'), null, function()
			{
				Graph.translateDiagram = false;
				graph.refresh();
			}, parent);

			if (!Graph.translateDiagram)
			{
				menu.addCheckmark(item, Editor.checkmarkImage);
			}
		})));

		// Only visible in test mode
		if (urlParams['test'] == '1')
		{
			mxResources.parse('testDevelop=Develop');
			mxResources.parse('showBoundingBox=Show bounding box');
			mxResources.parse('createSidebarEntry=Create Sidebar Entry');
			mxResources.parse('testCheckFile=Check File');
			mxResources.parse('testDiff=Diff/Sync');
			mxResources.parse('testChecksum=Checksum');
			mxResources.parse('testCheckPages=Check Pages');
			mxResources.parse('testFixPages=Fix Pages');
			mxResources.parse('testInspect=Inspect');
			mxResources.parse('testShowConsole=Show Console');
			mxResources.parse('testXmlImageExport=XML Image Export');
			mxResources.parse('testOptimize=Remove Inline Images');
			mxResources.parse('testPerformance=Performance');

			editorUi.actions.addAction('createSidebarEntry', mxUtils.bind(this, function()
			{
				if (!graph.isSelectionEmpty())
				{
					var cells = graph.cloneCells(graph.getSelectionCells());
					var bbox = graph.getBoundingBoxFromGeometry(cells);
					cells = graph.moveCells(cells, -bbox.x, -bbox.y);
					
					editorUi.showTextDialog('Create Sidebar Entry', 'this.addDataEntry(\'tag1 tag2\', ' +
						bbox.width + ', ' + bbox.height + ', \'The Title\', \'' +
						Graph.compress(mxUtils.getXml(graph.encodeCells(cells))) + '\'),');
				}
			}));
	
			editorUi.actions.addAction('showBoundingBox', mxUtils.bind(this, function()
			{
				var b = graph.getGraphBounds();

				var tr = graph.view.translate;
				var s = graph.view.scale;
				graph.insertVertex(graph.getDefaultParent(), null, '',
					b.x / s - tr.x, b.y / s - tr.y, b.width / s, b.height / s,
					'fillColor=none;strokeColor=red;');

				// Checking bounding boxes
				function checkBounds(shape)
				{
					return shape == null || shape.boundingBox == null || (!isNaN(shape.boundingBox.x) &&
						!isNaN(shape.boundingBox.y) && !isNaN(shape.boundingBox.width) &&
						!isNaN(shape.boundingBox.height));
				};

				var invalid = 0;
				var count = 0;

				graph.view.states.visit(function(id, state)
				{
					var valid = true;

					if (!checkBounds(state.shape))
					{
						console.log('invalid shape', state.cell.id, state.shape);
						valid = false;
					}

					if (!checkBounds(state.text))
					{
						console.log('invalid text', state.cell.id, state.text);
						valid = false;
					}

					if (!valid)
					{
						invalid++;
					}

					count++;
				});

				console.log('states checked', count, 'invalid', invalid);
			}));
	
			editorUi.actions.addAction('testCheckFile', mxUtils.bind(this, function()
			{
				var xml = (editorUi.pages != null && editorUi.getCurrentFile() != null) ?
					editorUi.getCurrentFile().getAnonymizedXmlForPages(editorUi.pages) : '';

		    	var dlg = new TextareaDialog(editorUi, 'Paste Data:', xml,
		    		function(newValue)
				{
					if (newValue.length > 0)
					{
						try
						{
							if (newValue.charAt(0) != '<')
							{
								newValue = Graph.decompress(newValue);
								mxLog.debug('See console for uncompressed XML');
								console.log('xml', newValue);
							}
							
							var doc = mxUtils.parseXml(newValue);
							var pages = editorUi.getPagesForNode(doc.documentElement, 'mxGraphModel');
							
							if (pages != null && pages.length > 0)
							{
								try
								{
									var checksum = editorUi.getHashValueForPages(pages);
									mxLog.debug('Checksum: ', checksum);
								}
								catch (e)
								{
									mxLog.debug('Error: ', e.message);
								}
							}
							else
							{
								mxLog.debug('No pages found for checksum');
							}

							// Checks for duplicates
							function checkModel(node)
							{
								var pageId = node.parentNode.id;
								var all = node.childNodes;
								var allIds = {};
								var childs = {};
								var root = null;
								var dups = {};
								
								for (var i = 0; i < all.length; i++)
								{
									var el = all[i];
									
									if (el.id != null && el.id.length > 0)
									{
										if (allIds[el.id] == null)
										{
											allIds[el.id] = el.id;
											var pid = el.getAttribute('parent');
											
											if (pid == null)
											{
												if (root != null)
												{
													mxLog.debug(pageId + ': Multiple roots: ' + el.id);
												}
												else
												{
													root = el.id;
												}
											}
											else
											{
												if (childs[pid] == null)
												{
													childs[pid] = [];
												}
												
												childs[pid].push(el.id);
											}
										}
										else
										{
											dups[el.id] = el.id;
										}
									}
								}

								var keys = Object.keys(dups);
								
								if (keys.length > 0)
								{
									var log = pageId + ': ' + keys.length +
										' Duplicates: ' + keys.join(', ');
									mxLog.debug(log + ' (see console)');
								}
								else
								{
									mxLog.debug(pageId + ': Checked');
								}
								
								// Checks tree for cycles
								var visited = {};
								
								function visit(id)
								{
									if (visited[id] == null)
									{
										visited[id] = true;
										
										if (childs[id] != null)
										{
											while (childs[id].length > 0)
											{
												var temp = childs[id].pop();
												visit(temp);
											}
											
											delete childs[id];
										}
									}
									else
									{
										mxLog.debug(pageId + ': Visited: ' + id);
									}
								};
								
								if (root == null)
								{
									mxLog.debug(pageId + ': No root');
								}
								else
								{
									visit(root);
									
									if (Object.keys(visited).length != Object.keys(allIds).length)
									{
										mxLog.debug(pageId + ': Invalid tree: (see console)');
										console.log(pageId + ': Invalid tree', childs);
									}
								}
							};
							
							var roots = doc.getElementsByTagName('root');
							
							for (var i = 0; i < roots.length; i++)
							{
								checkModel(roots[i]);
							}
							
							mxLog.show();
						}
						catch (e)
						{
							editorUi.handleError(e);
							
							if (window.console != null)
							{
								console.error(e);
							}
						}
					}
				});
		    	
				editorUi.showDialog(dlg.container, 620, 460, true, true);
				dlg.init();
			}));
	
			var snapshot = null;
			
			editorUi.actions.addAction('testDiff', mxUtils.bind(this, function()
			{
				if (editorUi.pages != null)
				{
					var buttons = [['Snapshot', function(evt, input)
					{
						snapshot = editorUi.getPagesForXml(editorUi.getFileData(true));
						dlg.textarea.value = 'Snapshot updated ' + new Date().toLocaleString() +
							' Checksum ' + editorUi.getHashValueForPages(snapshot);
					}], ['Diff', function(evt, input)
					{
						try
						{
							dlg.textarea.value = JSON.stringify(editorUi.diffPages(
								snapshot, editorUi.pages), null, 2);
						}
						catch (e)
						{
							editorUi.handleError(e);
						}
					}]];
					
			    	var dlg = new TextareaDialog(editorUi, 'Diff/Sync:', '',
			    		function(newValue)
					{
						var file = editorUi.getCurrentFile();
						
						if (newValue.length > 0 && file != null)
						{
							try
							{
								var patch = JSON.parse(newValue);
								file.patch([patch], null, true, true);
								editorUi.hideDialog();
							}
							catch (e)
							{
								editorUi.handleError(e);
							}
						}
					}, null, 'Close', null, null, null, true, null, 'Patch', null, buttons);
			    	
					if (snapshot == null)
					{
						snapshot = editorUi.getPagesForXml(editorUi.getFileData(true));
						dlg.textarea.value = 'Snapshot created ' + new Date().toLocaleString() +
							' Checksum ' + editorUi.getHashValueForPages(snapshot);
					}
					else
					{
						dlg.textarea.value = JSON.stringify(editorUi.diffPages(
							snapshot, editorUi.pages), null, 2);
					}
					
					editorUi.showDialog(dlg.container, 620, 460, true, true);
					dlg.init();
				}
				else
				{
					editorUi.alert('No pages');
				}
			}));

			editorUi.actions.addAction('testChecksum', mxUtils.bind(this, function()
			{
				var file = editorUi.getCurrentFile();

				if (editorUi.pages != null && file != null)
				{
					if (editorUi.spinner.spin(document.body, mxResources.get('loading')))
					{
						file.getLatestVersion(function(latestFile)
						{
							editorUi.spinner.stop();

							var localChecksum = editorUi.getHashValueForPages(editorUi.pages);
							var localRev = file.getCurrentRevisionId();
							var remoteChecksum = editorUi.getHashValueForPages(
								latestFile.getShadowPages());
							var descChecksum = latestFile.getDescriptorChecksum(
								latestFile.getDescriptor());
							var remoteRev = latestFile.getCurrentRevisionId();
							
							console.log('Local File', [file],
								'modified', file.isModified(),
								'checksum', localChecksum);
							
							console.log('Remote File', [latestFile],
								'rev', remoteRev == localRev,
								'desc', descChecksum == remoteChecksum,
								'checksum', remoteChecksum);
							
							editorUi.alert('Checksums ' +
								(remoteChecksum == localChecksum ?
								'match' : 'no not match'));
						}, function(err)
						{
							console.log('Error getLatestVersion', err);
							editorUi.handleError(err);
						});
					}
				}
				else
				{
					console.log('Checksum: no file or pages');
				}
			}));

			editorUi.actions.addAction('testCheckPages', mxUtils.bind(this, function()
			{
				var file = editorUi.getCurrentFile();
				console.log('editorUi', editorUi, 'file', file);

				if (file != null && file.isRealtime())
				{
					console.log('Checksum ownPages',
						editorUi.getHashValueForPages(
							file.ownPages));
					console.log('Checksum theirPages',
						editorUi.getHashValueForPages(
							file.theirPages));
					console.log('diff ownPages/theirPages',
						editorUi.diffPages(file.ownPages,
							file.theirPages));

					var shadow = file.getShadowPages();
					
					if (shadow != null)
					{
						console.log('Checksum shadowPages',
							editorUi.getHashValueForPages(shadow));
						console.log('diff shadowPages/ownPages',
							editorUi.diffPages(shadow, file.ownPages));
						console.log('diff ownPages/shadowPages',
							editorUi.diffPages(file.ownPages, shadow));
						console.log('diff theirPages/shadowPages',
							editorUi.diffPages(file.theirPages, shadow));
					}

					if (file.sync != null && file.sync.snapshot != null)
					{
						console.log('Checksum snapshot',
							editorUi.getHashValueForPages(
								file.sync.snapshot));
						console.log('diff ownPages/snapshot',
							editorUi.diffPages(file.ownPages,
								file.sync.snapshot));
						console.log('diff theirPages/snapshot',
							editorUi.diffPages(file.theirPages,
								file.sync.snapshot));

						if (editorUi.pages != null)
						{
							console.log('diff snapshot/actualPages',
								editorUi.diffPages(file.sync.snapshot,
									editorUi.pages));
						}
					}

					if (editorUi.pages != null)
					{
						console.log('diff ownPages/actualPages',
							editorUi.diffPages(file.ownPages,
								editorUi.pages));
						console.log('diff theirPages/actualPages',
							editorUi.diffPages(file.theirPages,
								editorUi.pages));
					}
				}

				if (file != null)
				{
					console.log('Shadow pages',
						[editorUi.getXmlForPages(
							file.getShadowPages())]);
				}

				if (editorUi.pages != null)
				{
					console.log('Checksum actualPages',
						editorUi.getHashValueForPages(
							editorUi.pages));
				}
			}));
			
			editorUi.actions.addAction('testFixPages', mxUtils.bind(this, function()
			{
				console.log('editorUi', editorUi);
				var file = editorUi.getCurrentFile();

				if (file != null && file.isRealtime() &&
					file.shadowPages != null)
				{
					console.log('patching actualPages to shadowPages',
						file.patch([editorUi.diffPages(
							file.shadowPages, editorUi.pages)]));
					file.ownPages = editorUi.clonePages(editorUi.pages);
					file.theirPages = editorUi.clonePages(editorUi.pages);
					file.shadowPages = editorUi.clonePages(editorUi.pages);

					if (file.sync != null)
					{
						file.sync.snapshot = editorUi.clonePages(editorUi.pages);
					}
				}
			}));

			editorUi.actions.addAction('testOptimize', mxUtils.bind(this, function()
			{
				graph.model.beginUpdate();
				try
				{
					var all = graph.model.cells;
					var imageCount = 0;
					var images = [];
					var cells = [];

					for (var id in all)
					{
						var cell = all[id];
						var style = graph.getCurrentCellStyle(cell);
						var image = style[mxConstants.STYLE_IMAGE];

						if (image != null && image.substring(0, 5) == 'data:')
						{
							if (images[image] == null)
							{
								images[image] = (images[image] || 0) + 1;
								imageCount++;
							}

							cells.push(cell);
						}
					}

					graph.setCellStyles(mxConstants.STYLE_IMAGE, null, cells);
					console.log('Removed', imageCount, 'image(s) from', cells.length, 'cell(s): ', [cells, images]);
				}
				finally
				{
					graph.model.endUpdate();
				}
			}));
	
			editorUi.actions.addAction('testInspect', mxUtils.bind(this, function()
			{
				console.log(editorUi, graph.getModel());
			}));
			
			editorUi.actions.addAction('testXmlImageExport', mxUtils.bind(this, function()
			{
				var scale = 1;
				var b = 1;
				
				var imgExport = new mxImageExport();
				var bounds = graph.getGraphBounds();
				var vs = graph.view.scale;
				
	        	// New image export
				var xmlDoc = mxUtils.createXmlDocument();
				var root = xmlDoc.createElement('output');
				xmlDoc.appendChild(root);
				
			    // Renders graph. Offset will be multiplied with state's scale when painting state.
				var xmlCanvas = new mxXmlCanvas2D(root);
				xmlCanvas.translate(Math.floor((b / scale - bounds.x) / vs),
					Math.floor((b / scale - bounds.y) / vs));
				xmlCanvas.scale(scale / vs);
				
				var stateCounter = 0;
				
				var canvasSave = xmlCanvas.save;
				xmlCanvas.save = function()
				{
					stateCounter++;
					canvasSave.apply(this, arguments);
				};
				
				var canvasRestore = xmlCanvas.restore;
				xmlCanvas.restore = function()
				{
					stateCounter--;
					canvasRestore.apply(this, arguments);
				};
				
				var exportDrawShape = imgExport.drawShape;
				imgExport.drawShape = function(state)
				{
					mxLog.debug('entering shape', state, stateCounter);
					exportDrawShape.apply(this, arguments);
					mxLog.debug('leaving shape', state, stateCounter);
				};
				
			    imgExport.drawState(graph.getView().getState(graph.model.root), xmlCanvas);
			    
				// Puts request data together
				var w = Math.ceil(bounds.width * scale / vs + 2 * b);
				var h = Math.ceil(bounds.height * scale / vs + 2 * b);
				
				mxLog.show();
				mxLog.debug(mxUtils.getXml(root));
				mxLog.debug('stateCounter', stateCounter);
			}));

			editorUi.actions.addAction('testShowConsole', function()
			{
				if (!mxLog.isVisible())
				{
					mxLog.show();
				}
				else
				{
					mxLog.window.fit();
				}
				
				mxLog.window.div.style.zIndex = mxPopupMenu.prototype.zIndex - 2;
			});
			

			// Adds logging for performance
			var prevRevalidate = null;
			var prevSelectPage = null;
			var prevDiffPages = null;
			var prevPatchPages = null;
			var prevClonePages = null;
			var prevGetHashValueForPages = null;
			var prevResolveCrossReferences = null;

			editorUi.actions.addAction('testPerformance', mxUtils.bind(this, function()
			{
				if (prevRevalidate != null)
				{
					graph.view.revalidate = prevRevalidate;
					prevRevalidate = null;
				}
				else
				{
					prevRevalidate = graph.view.revalidate;

					graph.view.revalidate = function()
					{
						var t0 = Date.now();
						var result = prevRevalidate.apply(this, arguments);
						EditorUi.debug('[Performance] mxGraphView.revalidate',
							[this], 'time', (Date.now() - t0) + ' ms',
							'args', arguments);
						
						return result;
					};
				}

				if (prevSelectPage != null)
				{
					editorUi.selectPage = prevSelectPage;
					prevSelectPage = null;
				}
				else
				{
					prevSelectPage = editorUi.selectPage;

					editorUi.selectPage = function()
					{
						var t0 = Date.now();
						var result = prevSelectPage.apply(this, arguments);
						EditorUi.debug('[Performance] EditorUi.selectPage',
							[this], 'time', (Date.now() - t0) + ' ms',
							'args', arguments);
						
						return result;
					};
				}

				if (prevDiffPages != null)
				{
					editorUi.diffPages = prevDiffPages;
					prevDiffPages = null;
				}
				else
				{
					prevDiffPages = editorUi.diffPages;

					editorUi.diffPages = function()
					{
						var t0 = Date.now();
						var result = prevDiffPages.apply(this, arguments);
						EditorUi.debug('[Performance] EditorUi.diffPages',
							[this], 'time', (Date.now() - t0) + ' ms',
							'args', arguments);
						
						return result;
					};
				}

				if (prevPatchPages != null)
				{
					editorUi.patchPages = prevPatchPages;
					prevPatchPages = null;
				}
				else
				{
					prevPatchPages = editorUi.patchPages;

					editorUi.patchPages = function()
					{
						var t0 = Date.now();
						var result = prevPatchPages.apply(this, arguments);
						EditorUi.debug('[Performance] EditorUi.patchPages',
							[this], 'time', (Date.now() - t0) + ' ms',
							'args', arguments);
						
						return result;
					};
				};

				if (prevClonePages != null)
				{
					editorUi.clonePages = prevClonePages;
					prevClonePages = null;
				}
				else
				{
					prevClonePages = editorUi.clonePages;

					editorUi.clonePages = function()
					{
						var t0 = Date.now();
						var result = prevClonePages.apply(this, arguments);
						EditorUi.debug('[Performance] EditorUi.clonePages',
							[this], 'time', (Date.now() - t0) + ' ms',
							'args', arguments);
						
						return result;
					};
				};

				if (prevGetHashValueForPages != null)
				{
					editorUi.getHashValueForPages = prevGetHashValueForPages;
					prevGetHashValueForPages = null;
				}
				else
				{
					prevGetHashValueForPages = editorUi.getHashValueForPages;

					editorUi.getHashValueForPages = function()
					{
						var t0 = Date.now();
						var result = prevGetHashValueForPages.apply(this, arguments);
						EditorUi.debug('[Performance] EditorUi.getHashValueForPages',
							[this], 'time', (Date.now() - t0) + ' ms',
							'args', arguments);
						
						return result;
					};
				}

				if (prevResolveCrossReferences != null)
				{
					editorUi.resolveCrossReferences = prevResolveCrossReferences;
					prevResolveCrossReferences = null;
				}
				else
				{
					prevResolveCrossReferences = editorUi.resolveCrossReferences;

					editorUi.resolveCrossReferences = function()
					{
						var t0 = Date.now();
						var result = prevResolveCrossReferences.apply(this, arguments);
						EditorUi.debug('[Performance] EditorUi.resolveCrossReferences',
							[this], 'time', (Date.now() - t0) + ' ms',
							'args', arguments);

						return result;
					};
				}

				EditorUi.debug('[Performance]', (prevRevalidate != null) ? 'Enabled' : 'Disabled');
			}));

			this.put('testDevelop', new Menu(mxUtils.bind(this, function(menu, parent)
			{
				this.addMenuItems(menu, ['createSidebarEntry', 'showBoundingBox', '-',
					'testCheckPages', 'testChecksum', 'testFixPages', '-',
					'testCheckFile', 'testDiff', '-', 'testInspect', 'testOptimize', '-',
					'testXmlImageExport', '-'], parent);

				var item = menu.addItem(mxResources.get('testPerformance'), null, function()
				{
					editorUi.actions.get('testPerformance').funct();
				}, parent);
				
				if (prevRevalidate != null)
				{
					menu.addCheckmark(item, Editor.checkmarkImage);
				}

				this.addMenuItems(menu, ['-', 'testShowConsole'], parent);
			})));
		}
		
		editorUi.actions.put('shapes', new Action(mxResources.get('moreShapes') + '...', function(evt)
		{
			if (mxClient.IS_CHROMEAPP || !editorUi.isOffline())
			{
				editorUi.showDialog(new MoreShapesDialog(editorUi, true).container, 640, (isLocalStorage) ?
						((mxClient.IS_IOS) ? 480 : 460) : 440, true, true);
			}
			else
			{
				editorUi.showDialog(new MoreShapesDialog(editorUi, false).container, 360, (isLocalStorage) ?
						((mxClient.IS_IOS) ? 300 : 280) : 260, true, true);
			}
		}));

		editorUi.actions.put('createShape', new Action(mxResources.get('shape') + '...', function(evt)
		{
			if (graph.isEnabled())
			{
				var cell = new mxCell('', new mxGeometry(0, 0, 120, 120), editorUi.defaultCustomShapeStyle);
				cell.vertex = true;
			
		    	var dlg = new EditShapeDialog(editorUi, cell, mxResources.get('editShape') + ':', 630, 400);
				editorUi.showDialog(dlg.container, 640, 480, true, false);
				dlg.init();
			}
		})).isEnabled = isGraphEnabled;
		
		editorUi.actions.put('embedHtml', new Action(mxResources.get('html') + '...', function()
		{
			if (editorUi.spinner.spin(document.body, mxResources.get('loading')))
			{
				editorUi.getPublicUrl(editorUi.getCurrentFile(), function(url)
				{
					editorUi.spinner.stop();
					
					editorUi.showHtmlDialog(mxResources.get('create'), 'https://www.drawio.com/doc/faq/embed-html-options',
						url, function(publicUrl, zoomEnabled, initialZoom, linkTarget, linkColor, fit, allPages, layers, tags, lightbox, editLink)
					{
						editorUi.createHtml(publicUrl, zoomEnabled, initialZoom, linkTarget, linkColor, fit, allPages,
							layers, tags, lightbox, editLink, mxUtils.bind(this, function(html, scriptTag)
							{
								var dlg = new EmbedDialog(editorUi, html + '\n' + scriptTag, null, null, function()
								{
									var wnd = window.open();
									var doc = wnd.document;
									
									if (doc != null)
									{
										if (document.compatMode === 'CSS1Compat')
										{
											doc.writeln('<!DOCTYPE html>');
										}
										
										doc.writeln('<html>');
										doc.writeln('<head><title>' + encodeURIComponent(mxResources.get('preview')) +
											'</title><meta charset="utf-8"></head>');
										doc.writeln('<body>');
										doc.writeln(html);
										
										var direct = mxClient.IS_IE || mxClient.IS_EDGE || document.documentMode != null;
										
										if (direct)
										{
											doc.writeln(scriptTag);
										}
										
										doc.writeln('</body>');
										doc.writeln('</html>');
										doc.close();
										
										// Adds script tag after closing page and delay to fix timing issues
										if (!direct)
										{
											var info = wnd.document.createElement('div');
											info.marginLeft = '26px';
											info.marginTop = '26px';
											mxUtils.write(info, mxResources.get('updatingDocument'));
	
											var img = wnd.document.createElement('img');
											img.setAttribute('src', window.location.protocol + '//' + window.location.hostname +
												'/' + IMAGE_PATH + '/spin.gif');
											img.style.marginLeft = '6px';
											info.appendChild(img);
											
											wnd.document.body.insertBefore(info, wnd.document.body.firstChild);
											
											window.setTimeout(function()
											{
												var script = document.createElement('script');
												script.type = 'text/javascript';
												script.src = /<script.*?src="(.*?)"/.exec(scriptTag)[1];
												doc.body.appendChild(script);
												
												info.parentNode.removeChild(info);
											}, 20);
										}
									}
									else
									{
										editorUi.handleError({message: mxResources.get('errorUpdatingPreview')});
									}
								});
								editorUi.showDialog(dlg.container, 450, 240, true, true);
								dlg.init();
							}));
					});
				});
			}
		}));
		
		editorUi.actions.put('liveImage', new Action('Live image...', function()
		{
			var current = editorUi.getCurrentFile();
			
			if (current != null && editorUi.spinner.spin(document.body, mxResources.get('loading')))
			{
				editorUi.getPublicUrl(editorUi.getCurrentFile(), function(url)
				{
					editorUi.spinner.stop();
					
					if (url != null)
					{
						var dlg = new EmbedDialog(editorUi, '<img src="' + ((current.constructor != DriveFile) ?
							url : 'https://drive.google.com/uc?id=' + current.getId()) + '"/>');
						editorUi.showDialog(dlg.container, 450, 240, true, true);
						dlg.init();
					}
					else
					{
						editorUi.handleError({message: mxResources.get('invalidPublicUrl')});
					}
				});
			}
		}));
		
		editorUi.actions.put('embedImage', new Action(mxResources.get('image') + '...', function()
		{
			editorUi.showEmbedImageDialog(function(fit, shadow, retina, lightbox, editLink, layers)
			{
				if (editorUi.spinner.spin(document.body, mxResources.get('loading')))
				{
					editorUi.createEmbedImage(fit, shadow, retina, lightbox, editLink, layers, function(result)
					{
						editorUi.spinner.stop();
						var dlg = new EmbedDialog(editorUi, result);
						editorUi.showDialog(dlg.container, 450, 240, true, true);
						dlg.init();
					}, function(err)
					{
						editorUi.spinner.stop();
						editorUi.handleError(err);
					});
				}
			}, mxResources.get('image'), mxResources.get('retina'), editorUi.isExportToCanvas());
		}));

		editorUi.actions.put('embedSvg', new Action(mxResources.get('formatSvg') + '...', function()
		{
			editorUi.showEmbedImageDialog(function(fit, shadow, image, lightbox, editLink, layers)
			{
				if (editorUi.spinner.spin(document.body, mxResources.get('loading')))
				{
					editorUi.createEmbedSvg(fit, shadow, image, lightbox, editLink, layers, function(result)
					{
						editorUi.spinner.stop();
						
						var dlg = new EmbedDialog(editorUi, result);
						editorUi.showDialog(dlg.container, 450, 240, true, true);
						dlg.init();
					}, function(err)
					{
						editorUi.spinner.stop();
						editorUi.handleError(err);
					});
				}
			}, mxResources.get('formatSvg'), mxResources.get('image'),
				true, 'https://www.drawio.com/doc/faq/embed-svg.html');
		}));
		
		editorUi.actions.put('embedIframe', new Action(mxResources.get('iframe') + '...', function()
		{
			var bounds = graph.getGraphBounds();
			
			editorUi.showPublishLinkDialog(mxResources.get('iframe'), null, '100%',
				Math.ceil(bounds.height / graph.view.scale) + 2,
				function(linkTarget, linkColor, allPages, lightbox, editLink, layers, width, height, tags)
			{
				if (editorUi.spinner.spin(document.body, mxResources.get('loading')))
				{
					editorUi.getPublicUrl(editorUi.getCurrentFile(), function(url)
					{
						editorUi.spinner.stop();
						var params = [];

						if (tags)
						{
							params.push('tags=%7B%7D');
						}
						
						var dlg = new EmbedDialog(editorUi, '<iframe frameborder="0" style="width:' + width +
							';height:' + height + ';" src="' + editorUi.createLink(linkTarget, linkColor,
							allPages, lightbox, editLink, layers, url, null, params) + '"></iframe>');
						editorUi.showDialog(dlg.container, 450, 240, true, true);
						dlg.init();
					});
				}
			}, true);
		}));

		editorUi.actions.put('embedNotion', new Action(mxResources.get('notion') + '...', function()
		{
			var footer = document.createElement('div');
			footer.style.position = 'absolute';
			footer.style.bottom = '30px';
			footer.style.textAlign = 'center';
			footer.style.width = '100%';
			footer.style.left = '0px';
			var link = document.createElement('a');
			link.setAttribute('href', 'javascript:void(0);');
			link.setAttribute('target', '_blank');
			link.style.cursor = 'pointer';
			mxUtils.write(link, mxResources.get('getNotionChromeExtension'));
			footer.appendChild(link);

			mxEvent.addListener(link, 'click', function(evt)
			{
				editorUi.openLink('https://chrome.google.com/webstore/detail/drawio-for-notion/plhaalebpkihaccllnkdaokdoeaokmle');
				mxEvent.consume(evt);
			});
			
			editorUi.showPublishLinkDialog(mxResources.get('notion'), null, null, null,
				function(linkTarget, linkColor, allPages, lightbox, editLink, layers, width, height, tags)
			{
				if (editorUi.spinner.spin(document.body, mxResources.get('loading')))
				{
					editorUi.getPublicUrl(editorUi.getCurrentFile(), function(url)
					{
						editorUi.spinner.stop();
						var params = ['border=0'];

						if (tags)
						{
							params.push('tags=%7B%7D');
						}

						var dlg = new EmbedDialog(editorUi, editorUi.createLink(linkTarget, linkColor,
							allPages, lightbox, editLink, layers, url, null, params, true));
						editorUi.showDialog(dlg.container, 450, 240, true, true);
						dlg.init();
					});
				}
			}, true, 'https://www.drawio.com/blog/drawio-notion', footer);
		}));
		
		editorUi.actions.put('publishLink', new Action(mxResources.get('link') + '...', function()
		{
			editorUi.showPublishLinkDialog(null, null, null, null,
				function(linkTarget, linkColor, allPages, lightbox, editLink, layers, width, height, tags)
			{
				if (editorUi.spinner.spin(document.body, mxResources.get('loading')))
				{
					editorUi.getPublicUrl(editorUi.getCurrentFile(), function(url)
					{
						editorUi.spinner.stop();
						
						var params = [];

						if (tags)
						{
							params.push('tags=%7B%7D');
						}

						var dlg = new EmbedDialog(editorUi, editorUi.createLink(linkTarget, linkColor,
							allPages, lightbox, editLink, layers, url, null, params));
						editorUi.showDialog(dlg.container, 450, 240, true, true);
						dlg.init();
					});
				}
			});
		}));

		editorUi.actions.addAction('microsoftOffice...', function()
		{
			editorUi.openLink('https://office.draw.io');
		});

		editorUi.actions.addAction('googleDocs...', function()
		{
			editorUi.openLink('http://docsaddon.draw.io');
		});

		editorUi.actions.addAction('googleSlides...', function()
		{
			editorUi.openLink('https://slidesaddon.draw.io');
		});

		editorUi.actions.addAction('googleSheets...', function()
		{
			editorUi.openLink('https://sheetsaddon.draw.io');
		});

		editorUi.actions.addAction('googleSites...', function()
		{
			if (editorUi.spinner.spin(document.body, mxResources.get('loading')))
			{
				editorUi.getPublicUrl(editorUi.getCurrentFile(), function(url)
				{
					editorUi.spinner.stop();
					var dlg = new GoogleSitesDialog(editorUi, url);
					editorUi.showDialog(dlg.container, 420, 256, true, true);
					dlg.init();
				});
			}
		});

		// Adds plugins menu item only if localStorage is available for storing the plugins
		if (isLocalStorage || mxClient.IS_CHROMEAPP)
		{
			var action = editorUi.actions.addAction('scratchpad', function()
			{
				editorUi.toggleScratchpad();
			});
			
			action.setToggleAction(true);
			action.setSelectedCallback(function()
			{
				return editorUi.scratchpad != null;
			});
			
			if (urlParams['plugins'] != '0')
			{
				editorUi.actions.addAction('plugins...', function()
				{
					editorUi.showDialog(new PluginsDialog(editorUi).container, 380, 240, true, false);
				});
			}
		}
		
		var action = editorUi.actions.addAction('search', function()
		{
			var visible = editorUi.sidebar.isEntryVisible('search');
			editorUi.sidebar.showPalette('search', !visible);
			
			if (isLocalStorage)
			{
				mxSettings.settings.search = !visible;
				mxSettings.save();
			}
		});
		
		action.label = mxResources.get('searchShapes');
		action.setToggleAction(true);
		action.setSelectedCallback(function() { return editorUi.sidebar.isEntryVisible('search'); });

		editorUi.actions.get('clearDefaultStyle').funct = function(exit)
		{
			if (graph.isEnabled())
			{
				editorUi.clearDefaultStyle();

				if (Editor.sketchMode)
				{
					editorUi.setSketchMode(false);
				}
			}
		};
		
		if (urlParams['embed'] == '1')
		{
			editorUi.actions.get('save').funct = function(exit)
			{
				if (graph.isEditing())
				{
					graph.stopEditing();
				}
				
				var data = (urlParams['pages'] != '0' || (editorUi.pages != null && editorUi.pages.length > 1)) ?
					editorUi.getFileData(true) : mxUtils.getXml(editorUi.editor.getGraphXml());
				
				if (urlParams['proto'] == 'json')
				{
					var msg = editorUi.createLoadMessage('save');
					msg.xml = data;
					
					if (exit)
					{
						msg.exit = true;
					}
					
					data = JSON.stringify(msg);
				}
				
				var parent = window.opener || window.parent;
				parent.postMessage(data, '*');
				
				if (urlParams['modified'] != '0' && urlParams['keepmodified'] != '1')
				{
					editorUi.editor.modified = false;
					editorUi.editor.setStatus('');
				}
				
				//Add support to saving files if embedded mode is running with files
				var file = editorUi.getCurrentFile();
				
				if (file != null && file.constructor != EmbedFile && (file.constructor != LocalFile || file.mode != null))
				{
					editorUi.saveFile();
				}
			};
	
			var saveAndExitAction = editorUi.actions.addAction('saveAndExit', function()
			{
				if (urlParams['toSvg'] == '1')
				{
					editorUi.sendEmbeddedSvgExport();
				}
				else
				{
					editorUi.actions.get('save').funct(true);
				}

			});
			
			saveAndExitAction.label = urlParams['publishClose'] == '1' ? mxResources.get('publish') : mxResources.get('saveAndExit');
			
			editorUi.actions.addAction('exit', function()
			{
				if (urlParams['embedInline'] == '1')
				{
					editorUi.sendEmbeddedSvgExport();
				}
				else
				{
					var fn = function()
					{
						editorUi.editor.modified = false;
						var msg = (urlParams['proto'] == 'json') ? JSON.stringify({event: 'exit',
							modified: editorUi.editor.modified}) : '';
						var parent = window.opener || window.parent;
						parent.postMessage(msg, '*');
					}
					
					if (!editorUi.editor.modified)
					{
						fn();
					}
					else
					{
						editorUi.confirm(mxResources.get('allChangesLost'), null, fn,
							mxResources.get('cancel'), mxResources.get('discardChanges'));
					}
				}
			}, null, null, (urlParams['embedInline'] == '1') ? 'Escape' : null);
		}
		
		this.put('exportAs', new Menu(mxUtils.bind(this, function(menu, parent)
		{
			if (editorUi.isExportToCanvas())
			{
				this.addMenuItems(menu, ['exportPng'], parent);
				
				if (editorUi.jpgSupported)
				{
					this.addMenuItems(menu, ['exportJpg'], parent);
				}
			}
			
			// Disabled for standalone mode in iOS because new tab cannot be closed
			else if (!editorUi.isOffline() && (!mxClient.IS_IOS || !navigator.standalone))
			{
				this.addMenuItems(menu, ['exportPng', 'exportJpg'], parent);
			}
			
			this.addMenuItems(menu, ['exportSvg', '-'], parent);
			
			// Redirects export to PDF to print in Chrome App
			if (editorUi.isOffline() || editorUi.printPdfExport)
			{
				this.addMenuItems(menu, ['exportPdf'], parent);
			}
			// Disabled for standalone mode in iOS because new tab cannot be closed
			else if (!editorUi.isOffline() && (!mxClient.IS_IOS || !navigator.standalone))
			{
				this.addMenuItems(menu, ['exportPdf'], parent);
			}

			if (!mxClient.IS_IE && (typeof(VsdxExport) !== 'undefined' || !editorUi.isOffline()))
			{
				this.addMenuItems(menu, ['exportVsdx'], parent);
			}

			this.addMenuItems(menu, ['-', 'exportHtml', 'exportXml', 'exportUrl'], parent);

			if (!editorUi.isOffline())
			{
				menu.addSeparator(parent);
				this.addMenuItem(menu, 'export', parent).firstChild.nextSibling.innerHTML = mxResources.get('advanced') + '...';
			}

			if (!mxClient.IS_CHROMEAPP && !EditorUi.isElectronApp && Editor.currentTheme == 'min')
			{
				this.addMenuItems(menu, ['publishLink'], parent);
			}	

			if (editorUi.mode != App.MODE_ATLAS && urlParams['extAuth'] != '1' &&
				(Editor.currentTheme == 'simple' || Editor.currentTheme == 'sketch' ||
				Editor.currentTheme == 'min'))
			{
				menu.addSeparator(parent);
				editorUi.menus.addSubmenu('embed', menu, parent);
			}
		})));

		this.put('importFrom', new Menu(mxUtils.bind(this, function(menu, parent)
		{
			var doImportFile = mxUtils.bind(this, function(data, mime, filename)
			{
				// Gets insert location
				var view = graph.view;
				var bds = graph.getGraphBounds();
				var x = graph.snap(Math.ceil(Math.max(0, bds.x / view.scale - view.translate.x) + 4 * graph.gridSize));
				var y = graph.snap(Math.ceil(Math.max(0, (bds.y + bds.height) / view.scale - view.translate.y) + 4 * graph.gridSize));

				if (data.substring(0, 11) == 'data:image/')
				{
					editorUi.loadImage(data, mxUtils.bind(this, function(img)
	    			{
			    		var resizeImages = true;
			    		
			    		var doInsert = mxUtils.bind(this, function()
			    		{
		    				editorUi.resizeImage(img, data, mxUtils.bind(this, function(data2, w2, h2)
	    	    			{
	    		    			var s = (resizeImages) ? Math.min(1, Math.min(editorUi.maxImageSize / w2, editorUi.maxImageSize / h2)) : 1;
	
    							editorUi.importFile(data, mime, x, y, Math.round(w2 * s), Math.round(h2 * s), filename, function(cells)
    							{
    								editorUi.spinner.stop();
    								graph.setSelectionCells(cells);
    								graph.scrollCellToVisible(graph.getSelectionCell());
    							});
	    	    			}), resizeImages);
			    		});
			    		
			    		if (data.length > editorUi.resampleThreshold)
			    		{
			    			editorUi.confirmImageResize(function(doResize)
	    					{
	    						resizeImages = doResize;
	    						doInsert();
	    					});
			    		}
			    		else
		    			{
			    			doInsert();
		    			}
	    			}), mxUtils.bind(this, function()
	    			{
	    				editorUi.handleError({message: mxResources.get('cannotOpenFile')});
	    			}));
				}
				else
				{
					editorUi.importFile(data, mime, x, y, 0, 0, filename, function(cells)
					{
						editorUi.spinner.stop();
						graph.setSelectionCells(cells);
						graph.scrollCellToVisible(graph.getSelectionCell());
					});
				}
			});
			
			var getMimeType = mxUtils.bind(this, function(filename)
			{
				var mime = 'text/xml';
				
				if (/\.png$/i.test(filename))
				{
					mime = 'image/png';
				}
				else if (/\.jpe?g$/i.test(filename))
				{
					mime = 'image/jpg';
				}
				else if (/\.gif$/i.test(filename))
				{
					mime = 'image/gif';
				}
				else if (/\.pdf$/i.test(filename))
				{
					mime = 'application/pdf';
				}
				
				return mime;
			});
			
			function pickFileFromService(service)
			{
				// Drive requires special arguments for libraries and bypassing realtime
				service.pickFile(function(id)
				{
					if (editorUi.spinner.spin(document.body, mxResources.get('loading')))
					{
						// NOTE The third argument in getFile says denyConvert to match
						// the existing signature in the original DriveClient which has
						// as slightly different semantic, but works the same way.
						service.getFile(id, function(file)
						{
							var mime = (file.getData().substring(0, 11) == 'data:image/') ? getMimeType(file.getTitle()) : 'text/xml';
							
							// Imports SVG as images
							if (/\.svg$/i.test(file.getTitle()) && !editorUi.editor.isDataSvg(file.getData()))
							{
								file.setData(Editor.createSvgDataUri(file.getData()));
								mime = 'image/svg+xml';
							}
							
							doImportFile(file.getData(), mime, file.getTitle());
						},
						function(resp)
						{
							editorUi.handleError(resp, (resp != null) ? mxResources.get('errorLoadingFile') : null);
						}, service == editorUi.drive);
					}
				}, true);
			};
		
			if (typeof(google) != 'undefined' && typeof(google.picker) != 'undefined')
			{
				if (editorUi.drive != null)
				{
					// Requires special arguments for libraries and realtime
					menu.addItem(mxResources.get('googleDrive') + '...', null, function()
					{
						pickFileFromService(editorUi.drive);
					}, parent);
				}
				else if (googleEnabled && typeof window.DriveClient === 'function')
				{
					menu.addItem(mxResources.get('googleDrive') + ' (' + mxResources.get('loading') + '...)', null, function()
					{
						// do nothing
					}, parent, null, false);
				}
			}

			if (editorUi.oneDrive != null)
			{
				menu.addItem(mxResources.get('oneDrive') + '...', null, function()
				{
					pickFileFromService(editorUi.oneDrive);
				}, parent);
			}
			else if (oneDriveEnabled && typeof window.OneDriveClient === 'function')
			{
				menu.addItem(mxResources.get('oneDrive') + ' (' + mxResources.get('loading') + '...)', null, function()
				{
					// do nothing
				}, parent, null, false);
			}

			if (editorUi.dropbox != null)
			{
				menu.addItem(mxResources.get('dropbox') + '...', null, function()
				{
					pickFileFromService(editorUi.dropbox);
				}, parent);
			}
			else if (dropboxEnabled && typeof window.DropboxClient === 'function')
			{
				menu.addItem(mxResources.get('dropbox') + ' (' + mxResources.get('loading') + '...)', null, function()
				{
					// do nothing
				}, parent, null, false);
			}
			
			menu.addSeparator(parent);
			
			if (editorUi.gitHub != null)
			{
				menu.addItem(mxResources.get('github') + '...', null, function()
				{
					pickFileFromService(editorUi.gitHub);
				}, parent);
			}
			
			if (editorUi.gitLab != null)
			{
				menu.addItem(mxResources.get('gitlab') + '...', null, function()
				{
					pickFileFromService(editorUi.gitLab);
				}, parent);
			}

			if (editorUi.trello != null)
			{
				menu.addItem(mxResources.get('trello') + '...', null, function()
				{
					pickFileFromService(editorUi.trello);
				}, parent);
			}
			else if (trelloEnabled && typeof window.TrelloClient === 'function')
			{
				menu.addItem(mxResources.get('trello') + ' (' + mxResources.get('loading') + '...)', null, function()
				{
					// do nothing
				}, parent, null, false);
			}
			
			menu.addSeparator(parent);

			if (isLocalStorage && urlParams['browser'] != '0')
			{
				menu.addItem(mxResources.get('browser') + '...', null, function()
				{
					editorUi.importLocalFile(false);
				}, parent);
			}

			if (urlParams['noDevice'] != '1')
			{
				menu.addItem(mxResources.get('device') + '...', null, function()
				{
					editorUi.importLocalFile(true);
				}, parent);
			}
			
			if (!editorUi.isOffline())
			{
				menu.addSeparator(parent);
				
				menu.addItem(mxResources.get('url') + '...', null, function()
				{
					var dlg = new FilenameDialog(editorUi, '', mxResources.get('import'), function(fileUrl)
					{
						if (fileUrl != null && fileUrl.length > 0 && editorUi.spinner.spin(document.body, mxResources.get('loading')))
						{
							var mime = (/(\.png)($|\?)/i.test(fileUrl)) ? 'image/png' : 'text/xml';
							
							// Uses proxy to avoid CORS issues
							editorUi.editor.loadUrl(PROXY_URL + '?url=' + encodeURIComponent(fileUrl), function(data)
							{
								doImportFile(data, mime, fileUrl);
							},
							function ()
							{
								editorUi.spinner.stop();
								editorUi.handleError(null, mxResources.get('errorLoadingFile'));
							}, mime == 'image/png');
						}
					}, mxResources.get('url'));
					editorUi.showDialog(dlg.container, 300, 80, true, true);
					dlg.init();
				}, parent);
			}
		}))).isEnabled = isGraphEnabled;

		this.put('dynamicAppearance', new Menu(mxUtils.bind(this, function(menu, parent)
		{
			var iw = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

			if (Editor.currentTheme == 'simple')
			{
				// Elements are hidden with the following widths:
				// ViewZoom: <750
				// Insert edge: <680
				// Insert text: <660
				// Comments: <560
				// Insert Table: <500
				// Pages: <480
				// Insert Shapes: <440
				// Insert Freehand: <390
				// Share: <360
				// Insert: <320

				if (iw < 750)
				{
					this.addSubmenu('viewZoom', menu, parent, mxResources.get('zoom'));
				}

				if (iw < 460 && editorUi.isPageMenuVisible())
				{
					this.addSubmenu('pages', menu, parent);
				}

				if (iw < 320)
				{
					this.addSubmenu('insert', menu, parent);
				}

				if (iw < 360  && urlParams['embed'] != '1' &&
					editorUi.getServiceName() == 'draw.io')
				{
					this.addSubmenu('share', menu, parent);
				}
			}

			this.addMenuItems(menu, ['-', 'lightMode', 'darkMode'], parent);

			if (editorUi.isAutoDarkModeSupported())
			{
				var item = editorUi.menus.addMenuItem(menu, 'autoMode', parent);

				if (item != null)
				{
					item.setAttribute('title', mxResources.get('automatic') +
						' (' + mxResources.get(Editor.cssDarkMode || Editor.isDarkMode() ?
							'dark' : 'light') + ')');
				}
			}
			
			if (urlParams['embed'] != '1')
			{
				this.addMenuItems(menu, ['-', 'toggleSimpleMode'], parent);
			}
		})));
		
		this.put('appearance', new Menu(mxUtils.bind(this, function(menu, parent)
		{
			this.addMenuItems(menu, ['-', 'lightMode', 'darkMode'], parent);

			if (editorUi.isAutoDarkModeSupported())
			{
				var item = editorUi.menus.addMenuItem(menu, 'autoMode', parent);

				if (item != null)
				{
					item.setAttribute('title', mxResources.get('automatic') +
						' (' + mxResources.get(Editor.cssDarkMode || Editor.isDarkMode() ?
							'dark' : 'light') + ')');
				}
			}
		})));

		editorUi.actions.addAction('addToScratchpad', function(evt)
		{
			if (!graph.isSelectionEmpty() && editorUi.addSelectionToScratchpad != null)
			{
				editorUi.addSelectionToScratchpad(evt);
			}
		});

		editorUi.actions.addAction('accounts...', function()
		{
			editorUi.toggleUserPanel();
			editorUi.userPanel.style.right = '10px';
			editorUi.userPanel.style.top = '10px';
		});
		
		this.put('theme', new Menu(mxUtils.bind(this, function(menu, parent)
		{
			var theme = (urlParams['sketch'] == '1') ? 'sketch' : mxSettings.getUi();
			
			var item = menu.addItem(mxResources.get('automatic'), null, function()
			{
				editorUi.setCurrentTheme('');
			}, parent);
			
			if (theme != 'kennedy' && theme != 'atlas' &&
				theme != 'dark' && theme != 'simple' &&
				theme != 'sketch' && theme != 'min')
			{
				menu.addCheckmark(item, Editor.checkmarkImage);
			}
			
			item = menu.addItem(mxResources.get('classic'), null, function()
			{
				editorUi.setCurrentTheme((!Editor.isDarkMode()) ? 'kennedy' : 'dark');
			}, parent);

			if (theme == 'kennedy' || theme == 'dark')
			{
				menu.addCheckmark(item, Editor.checkmarkImage);
			}

			item = menu.addItem(mxResources.get('simple'), null, function()
			{
				editorUi.setCurrentTheme('simple');
			}, parent);

			if (theme == 'simple')
			{
				menu.addCheckmark(item, Editor.checkmarkImage);
			}

			item = menu.addItem(mxResources.get('sketch'), null, function()
			{
				editorUi.setCurrentTheme('sketch');
			}, parent);
			
			if (theme == 'sketch')
			{
				menu.addCheckmark(item, Editor.checkmarkImage);
			}

			item = menu.addItem(mxResources.get('minimal'), null, function()
			{
				editorUi.setCurrentTheme('min');
			}, parent);
			
			if (theme == 'min')
			{
				menu.addCheckmark(item, Editor.checkmarkImage);
			}
			
			item = menu.addItem(mxResources.get('atlas'), null, function()
			{
				editorUi.setCurrentTheme('atlas');
			}, parent);
			
			if (theme == 'atlas')
			{
				menu.addCheckmark(item, Editor.checkmarkImage);
			}
		})));

		var renameAction = this.editorUi.actions.addAction('rename...', mxUtils.bind(this, function()
		{
			var file = this.editorUi.getCurrentFile();
			
			if (file != null)
			{
				if (file.constructor == LocalFile && file.fileHandle != null)
				{
					editorUi.showSaveFilePicker(mxUtils.bind(editorUi, function(fileHandle, desc)
					{
						file.invalidFileHandle = null;
						file.fileHandle = fileHandle;
						file.title = desc.name;
						file.desc = desc;
						editorUi.save(desc.name);
					}), null, editorUi.createFileSystemOptions(file.getTitle()));
				}
				else
				{
					var filename = (file.getTitle() != null) ? file.getTitle() : this.editorUi.defaultFilename;
					
					var dlg = new FilenameDialog(this.editorUi, filename, mxResources.get('rename'), mxUtils.bind(this, function(title)
					{
						if (title != null && title.length > 0 && file != null && title != file.getTitle() &&
							this.editorUi.spinner.spin(document.body, mxResources.get('renaming')))
						{
							// Delete old file, save new file in dropbox if autosize is enabled
							file.rename(title, mxUtils.bind(this, function(resp)
							{
								this.editorUi.spinner.stop();
							}),
							mxUtils.bind(this, function(resp)
							{
								this.editorUi.handleError(resp, (resp != null) ? mxResources.get('errorRenamingFile') : null);
							}));
						}
					}), (file.constructor == DriveFile || file.constructor == StorageFile) ?
						mxResources.get('diagramName') : null, function(name)
					{
						if (name != null && name.length > 0)
						{
							return true;
						}
						
						editorUi.showError(mxResources.get('error'), mxResources.get('invalidName'), mxResources.get('ok'));
						
						return false;
					}, null, null, null, null, editorUi.editor.fileExtensions);
					this.editorUi.showDialog(dlg.container, 340, 96, true, true);
					dlg.init();
				}
			}
		}));
		
		renameAction.isEnabled = function()
		{
			return this.enabled && isGraphEnabled.apply(this, arguments);
		}
		
		renameAction.visible = urlParams['embed'] != '1';
		
		editorUi.actions.addAction('makeCopy...', mxUtils.bind(this, function()
		{
			var file = editorUi.getCurrentFile();
			
			if (file != null)
			{
				var title = editorUi.getCopyFilename(file);

				if (file.constructor == DriveFile)
				{
					var dlg = new CreateDialog(editorUi, title, mxUtils.bind(this, function(newTitle, mode)
					{
						if (mode == '_blank')
						{
							editorUi.editor.editAsNew(editorUi.getFileData(), newTitle);
						}
						else
						{
							// Mode is "download" if Create button is pressed, means use Google Drive
							if (mode == 'download')
							{
								mode = App.MODE_GOOGLE;
							}
	
							if (newTitle != null && newTitle.length > 0)
							{
								if (mode == App.MODE_GOOGLE)
								{
									if (editorUi.spinner.spin(document.body, mxResources.get('saving')))
									{
										// Saveas does not update the file descriptor in Google Drive
										file.saveAs(newTitle, mxUtils.bind(this, function(resp)
										{
											// Replaces file descriptor in-place and saves
											file.desc = resp;
											
											// Makes sure the latest XML is in the file
											file.save(false, mxUtils.bind(this, function()
											{
												editorUi.spinner.stop();
												file.setModified(false);
												file.addAllSavedStatus();
											}), mxUtils.bind(this, function(resp)
											{
												editorUi.handleError(resp);
											}));
										}), mxUtils.bind(this, function(resp)
										{
											editorUi.handleError(resp);
										}));
									}
								}
								else
								{
									editorUi.createFile(newTitle, editorUi.getFileData(true), null, mode);
								}
							}
						}
					}), mxUtils.bind(this, function()
					{
						editorUi.hideDialog();
					}), mxResources.get('makeCopy'), mxResources.get('create'), null,
						null, true, null, true, null, null, null, null,
						editorUi.editor.fileExtensions);
					editorUi.showDialog(dlg.container, 420, 380, true, true);
					dlg.init();
				}
				else
				{
					// Creates a copy with no predefined storage
					editorUi.editor.editAsNew(this.editorUi.getFileData(true), title);
				}
			}
		}));

		editorUi.actions.put('openFolder', new Action(mxResources.get('openIt', [mxResources.get('folder')]) + '...', function(evt, trigger)
		{
			var file = editorUi.getCurrentFile();

			if (file != null)
			{
				editorUi.openLink(file.getFolderUrl());
			}
		}));

		editorUi.actions.addAction('openFile...', mxUtils.bind(this, function()
		{
			var file = editorUi.getCurrentFile();

			if (file != null)
			{
				editorUi.openLink(file.getFileUrl());
			}
		}));
		
		editorUi.actions.addAction('moveToFolder...', mxUtils.bind(this, function()
		{
			var file = editorUi.getCurrentFile();
			
			if (file.getMode() == App.MODE_GOOGLE || file.getMode() == App.MODE_ONEDRIVE)
			{
				var isInRoot = false;
				
				if (file.getMode() == App.MODE_GOOGLE && file.desc.parents != null)
				{
					for (var i = 0; i < file.desc.parents.length; i++)
					{
						if (file.desc.parents[i].isRoot)
						{
							isInRoot = true;
							break;
						}
					}
				}
				
				editorUi.pickFolder(file.getMode(), mxUtils.bind(this, function(folderId)
				{
	            	if (editorUi.spinner.spin(document.body, mxResources.get('moving')))
	            	{
	            	    file.move(folderId, mxUtils.bind(this, function(resp)
	            		{
	            	    	editorUi.spinner.stop();
	        			}), mxUtils.bind(this, function(resp)
	        			{
	        				editorUi.handleError(resp);
	        			}));
	            	}
				}), null, true, isInRoot);
			}
		}));
		
		this.put('publish', new Menu(mxUtils.bind(this, function(menu, parent)
		{
			this.addMenuItems(menu, ['publishLink'], parent);
		})));

		editorUi.actions.put('useOffline', new Action(mxResources.get('useOffline') + '...', function()
		{
			editorUi.openLink('https://app.draw.io/')
		}));

		this.editorUi.actions.addAction('share...', mxUtils.bind(this, function()
		{
			try
			{
				var file = editorUi.getCurrentFile();
				
				if (file != null)
				{
					file.share();
				}
			}
			catch (e)
			{
				editorUi.handleError(e);
			}
		}));

		this.put('embed', new Menu(mxUtils.bind(this, function(menu, parent)
		{
			var file = editorUi.getCurrentFile();
			
			if (file != null && (file.getMode() == App.MODE_GOOGLE ||
				file.getMode() == App.MODE_GITHUB) && /(\.png)$/i.test(file.getTitle()))
			{
				this.addMenuItems(menu, ['liveImage', '-'], parent);
			}
			
			this.addMenuItems(menu, ['embedImage', 'embedSvg', '-', 'embedHtml'], parent);
			
			if (!navigator.standalone && !editorUi.isOffline())
			{
				this.addMenuItems(menu, ['embedIframe'], parent);
			}

			if (urlParams['embed'] != '1' && !editorUi.isOffline())
			{
				this.addMenuItems(menu, ['-', 'googleDocs', 'googleSlides', 'googleSheets', '-', 'microsoftOffice', '-', 'embedNotion'], parent);
			}
		})));

		editorUi.addInsertItem = function(menu, parent, title, method)
		{
			if (method != 'plantUml' || (EditorUi.enablePlantUml && !editorUi.isOffline()))
			{
				menu.addItem(title, null, mxUtils.bind(this, function()
				{
					if (method == 'fromText' || method == 'formatSql' ||
						method == 'plantUml' || method == 'mermaid')
					{
						var dlg = new ParseDialog(editorUi, title, method);
						editorUi.showDialog(dlg.container, 620, 420, true, false);
						editorUi.dialog.container.style.overflow = 'auto';
						dlg.init();
					}
					else
					{
						var dlg = new CreateGraphDialog(editorUi, title, method);
						editorUi.showDialog(dlg.container, 620, 420, true, false);
						// Executed after dialog is added to dom
						dlg.init();
					}
				}), parent, null, isGraphEnabled());
			}
		};

		var insertCell = function(cell)
		{
    		graph.getModel().beginUpdate();
    		try
    	    {
    			cell = graph.addCell(cell);
    	    	graph.fireEvent(new mxEventObject('cellsInserted', 'cells', [cell]));

				if (graph.model.isVertex(cell) && graph.isAutoSizeCell(cell))
				{
					graph.updateCellSize(cell);
				}
    	    }
    		finally
    		{
    			graph.getModel().endUpdate();
    		}
		
    		graph.scrollCellToVisible(cell);
    		graph.setSelectionCell(cell);
    		graph.container.focus();

    		if (graph.editAfterInsert)
    		{
    	        graph.startEditing(cell);
    		}
    		
    		// Async call is workaroun for touch events resetting hover icons
    		window.setTimeout(function()
    		{
	    		if (editorUi.hoverIcons != null)
				{
					editorUi.hoverIcons.update(graph.view.getState(cell));
				}
    		}, 0);
    		
	    	return cell;
		};
		
		var insertVertex = function(value, w, h, style, pt)
		{
			var cell = new mxCell(value, new mxGeometry(0, 0, w, h), style);
			cell.vertex = true;

			if (pt == null)
			{
				pt = graph.getCenterInsertPoint(graph.getBoundingBoxFromGeometry([cell], true));
			}

			cell.geometry.x = pt.x;
    	    cell.geometry.y = pt.y;

			return insertCell(cell);
		};
		
		var insertEdge  = function(value, length, style, pt)
		{
			if (pt == null)
			{
				pt = graph.getCenterInsertPoint(graph.getBoundingBoxFromGeometry([cell], true));
			}

			var cell = new mxCell('', new mxGeometry(0, 0, length, 0), style);
			cell.geometry.setTerminalPoint(pt, true);
			cell.geometry.setTerminalPoint(new mxPoint(pt.x + cell.geometry.width, pt.y), false);
			cell.geometry.points = [];
			cell.geometry.relative = true;
			cell.edge = true;

			return insertCell(cell);
		};
		
		editorUi.actions.put('insertText', new Action(mxResources.get('text'), function(evt)
		{
			if (graph.isEnabled() && !graph.isCellLocked(graph.getDefaultParent()))
			{
    			graph.startEditingAtCell(insertVertex('Text', 60, 30, 'text;strokeColor=none;align=center;' +
					'fillColor=none;html=1;verticalAlign=middle;whiteSpace=wrap;rounded=0;',
					(evt != null && !mxEvent.isControlDown(evt) && !mxEvent.isMetaDown(evt) &&
					graph.isMouseInsertPoint()) ? graph.getInsertPoint() : null));
			}
		}, null, null, 'A')).isEnabled = isGraphEnabled;
		
		editorUi.actions.put('insertRectangle', new Action(mxResources.get('rectangle'), function(evt)
		{
			if (graph.isEnabled() && !graph.isCellLocked(graph.getDefaultParent()))
			{
    	    	insertVertex('', 120, 60, 'whiteSpace=wrap;html=1;', (evt != null &&
					!mxEvent.isControlDown(evt) && !mxEvent.isMetaDown(evt) &&
					graph.isMouseInsertPoint()) ? graph.getInsertPoint() : null);
			}
		}, null, null, 'D')).isEnabled = isGraphEnabled;
		
		editorUi.actions.put('insertNote', new Action(mxResources.get('note'), function(evt)
		{
			if (graph.isEnabled() && !graph.isCellLocked(graph.getDefaultParent()))
			{
    	    	insertVertex('', 140, 160, 'shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;' +
					'fontColor=#000000;darkOpacity=0.05;fillColor=#FFF9B2;strokeColor=none;fillStyle=solid;' +
					'direction=west;gradientDirection=north;gradientColor=#FFF2A1;shadow=1;size=20;pointerEvents=1;',
					(evt != null && !mxEvent.isControlDown(evt) && !mxEvent.isMetaDown(evt) &&
					graph.isMouseInsertPoint()) ? graph.getInsertPoint() : null);
			}
		}, null, null, 'S')).isEnabled = isGraphEnabled;

		editorUi.actions.put('insertEllipse', new Action(mxResources.get('ellipse'), function(evt)
		{
			if (graph.isEnabled() && !graph.isCellLocked(graph.getDefaultParent()))
			{
    	    	insertVertex('', 80, 80, 'ellipse;whiteSpace=wrap;html=1;', (evt != null &&
					!mxEvent.isControlDown(evt) && !mxEvent.isMetaDown(evt) &&
					graph.isMouseInsertPoint()) ? graph.getInsertPoint() : null);
			}
		}, null, null, 'F')).isEnabled = isGraphEnabled;
		
		editorUi.actions.put('insertRhombus', new Action(mxResources.get('rhombus'), function(evt)
		{
			if (graph.isEnabled() && !graph.isCellLocked(graph.getDefaultParent()))
			{
    	    	insertVertex('', 80, 80, 'rhombus;whiteSpace=wrap;html=1;', (evt != null &&
					!mxEvent.isControlDown(evt) && !mxEvent.isMetaDown(evt) &&
					graph.isMouseInsertPoint()) ? graph.getInsertPoint() : null);
			}
		}, null, null, 'R')).isEnabled = isGraphEnabled;

		editorUi.actions.put('insertEdge', new Action(mxResources.get('line'), function(evt)
		{
			if (graph.isEnabled() && !graph.isCellLocked(graph.getDefaultParent()))
			{
    	    	insertEdge('', graph.defaultEdgeLength, 'edgeStyle=none;orthogonalLoop=1;jettySize=auto;html=1;',
					(evt != null && !mxEvent.isControlDown(evt) && !mxEvent.isMetaDown(evt) &&
					graph.isMouseInsertPoint()) ? graph.getInsertPoint() : null);
			}
		}, null, null, 'C')).isEnabled = isGraphEnabled;

		var toggleShapes = editorUi.actions.put('toggleShapes', new Action(mxResources.get('shapes'), function()
        {
			if (editorUi.sidebarWindow != null)
			{
				editorUi.sidebarWindow.window.setVisible(
					!editorUi.sidebarWindow.window.isVisible());
			}
			else
			{
				editorUi.toggleShapesPanel(!editorUi.isShapesPanelVisible());
			}
        }, null, null, Editor.ctrlKey + '+Shift+K'));

		toggleShapes.setToggleAction(true);
		toggleShapes.setSelectedCallback(mxUtils.bind(this, function()
		{
			return (editorUi.sidebarWindow != null && editorUi.sidebarWindow.window.isVisible()) ||
				(editorUi.sidebarWindow == null && editorUi.hsplitPosition > 0);
		}));

		editorUi.addInsertMenuItems = mxUtils.bind(this, function(menu, parent, methods)
		{
			for (var i = 0; i < methods.length; i++)
			{
				if (methods[i] == '-')
				{
					menu.addSeparator(parent);
				}
				else
				{
					editorUi.addInsertItem(menu, parent, mxResources.get(methods[i]) + '...', methods[i]);
				}
			}
		});
		
		this.put('insert', new Menu(mxUtils.bind(this, function(menu, parent)
		{
			if (Editor.currentTheme == 'sketch')
			{
				editorUi.menus.addMenuItems(menu, ['toggleShapes'], parent);
				editorUi.menus.addSubmenu('table', menu, parent);
				menu.addSeparator(parent);

				if (editorUi.insertTemplateEnabled && !editorUi.isOffline())
				{
					editorUi.menus.addMenuItems(menu, ['insertTemplate'], parent);
				}
				
				editorUi.menus.addMenuItems(menu, ['insertImage', 'insertLink', '-'], parent);
				editorUi.menus.addSubmenu('insertAdvanced', menu, parent, mxResources.get('advanced'));
				editorUi.menus.addSubmenu('layout', menu, parent);
			}
			else
			{
				this.addMenuItems(menu, ['insertRectangle', 'insertEllipse', 'insertRhombus',
					'-', 'insertEdge', 'insertNote', '-', 'insertText', 'insertLink',
					'-', 'createShape', 'insertFreehand', '-', 'insertImage'], parent);

				if (editorUi.insertTemplateEnabled && !editorUi.isOffline())
				{
					this.addMenuItems(menu, ['insertTemplate'], parent);
				}
				
				menu.addSeparator(parent);

				if (uiTheme == 'min' || Editor.currentTheme == 'simple')
				{
					this.addSubmenu('table', menu, parent);
					this.addSubmenu('layout', menu, parent);
				}
				else
				{
					this.addSubmenu('insertLayout', menu, parent, mxResources.get('layout'));
				}

				this.addSubmenu('insertAdvanced', menu, parent, mxResources.get('advanced'));
			}
		})));

        this.put('table', new Menu(mxUtils.bind(this, function(menu, parent)
		{
			editorUi.menus.addInsertTableCellItem(menu, parent);
		})));

		this.put('insertLayout', new Menu(mxUtils.bind(this, function(menu, parent)
		{
			editorUi.addInsertMenuItems(menu, parent, ['horizontalFlow',
				'verticalFlow', '-', 'horizontalTree', 'verticalTree',
				'radialTree', '-', 'organic', 'circle']);
		})));

        this.put('insertAdvanced', new Menu(mxUtils.bind(this, function(menu, parent)
        {
			editorUi.addInsertMenuItems(menu, parent, ['fromText',
				'plantUml', 'mermaid', '-', 'formatSql']);
			
			menu.addItem(mxResources.get('csv') + '...', null, function()
			{
				graph.popupMenuHandler.hideMenu();
				editorUi.showImportCsvDialog();
			}, parent, null, isGraphEnabled());
			
			if (Editor.currentTheme == 'simple' || Editor.currentTheme == 'min')
			{
				this.addMenuItems(menu, ['-', 'createShape', 'editDiagram'], parent);
			}
        })));
        
		this.put('openRecent', new Menu(function(menu, parent)
		{
			var recent = editorUi.getRecent();

			if (recent != null)
			{
				for (var i = 0; i < recent.length; i++)
				{
					(function(entry)
					{
						var modeKey = entry.mode;
						
						// Google and oneDrive use different keys
						if (modeKey == App.MODE_GOOGLE)
						{
							modeKey = 'googleDrive';
						}
						else if (modeKey == App.MODE_ONEDRIVE)
						{
							modeKey = 'oneDrive';
						}
						
						menu.addItem(entry.title + ' (' + mxResources.get(modeKey) + ')', null, function()
						{
							editorUi.loadFile(entry.id);
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
		
		this.put('openFrom', new Menu(function(menu, parent)
		{
			if (editorUi.drive != null)
			{
				menu.addItem(mxResources.get('googleDrive') + '...', null, function()
				{
					editorUi.pickFile(App.MODE_GOOGLE);
				}, parent);
			}
			else if (googleEnabled && typeof window.DriveClient === 'function')
			{
				menu.addItem(mxResources.get('googleDrive') + ' (' + mxResources.get('loading') + '...)', null, function()
				{
					// do nothing
				}, parent, null, false);
			}
			
			if (editorUi.oneDrive != null)
			{
				menu.addItem(mxResources.get('oneDrive') + '...', null, function()
				{
					editorUi.pickFile(App.MODE_ONEDRIVE);
				}, parent);
			}
			else if (oneDriveEnabled && typeof window.OneDriveClient === 'function')
			{
				menu.addItem(mxResources.get('oneDrive') + ' (' + mxResources.get('loading') + '...)', null, function()
				{
					// do nothing
				}, parent, null, false);
			}
			
			if (editorUi.dropbox != null)
			{
				menu.addItem(mxResources.get('dropbox') + '...', null, function()
				{
					editorUi.pickFile(App.MODE_DROPBOX);
				}, parent);
			}
			else if (dropboxEnabled && typeof window.DropboxClient === 'function')
			{
				menu.addItem(mxResources.get('dropbox') + ' (' + mxResources.get('loading') + '...)', null, function()
				{
					// do nothing
				}, parent, null, false);
			}

			menu.addSeparator(parent);
			
			if (editorUi.gitHub != null)
			{
				menu.addItem(mxResources.get('github') + '...', null, function()
				{
					editorUi.pickFile(App.MODE_GITHUB);
				}, parent);
			}
			
			if (editorUi.gitLab != null)
			{
				menu.addItem(mxResources.get('gitlab') + '...', null, function()
				{
					editorUi.pickFile(App.MODE_GITLAB);
				}, parent);
			}

			if (editorUi.trello != null)
			{
				menu.addItem(mxResources.get('trello') + '...', null, function()
				{
					editorUi.pickFile(App.MODE_TRELLO);
				}, parent);
			}
			else if (trelloEnabled && typeof window.TrelloClient === 'function')
			{
				menu.addItem(mxResources.get('trello') + ' (' + mxResources.get('loading') + '...)', null, function()
				{
					// do nothing
				}, parent, null, false);
			}
			
			menu.addSeparator(parent);

			if (isLocalStorage && urlParams['browser'] != '0')
			{
				menu.addItem(mxResources.get('browser') + '...', null, function()
				{
					editorUi.pickFile(App.MODE_BROWSER);
				}, parent);
			}
			
			//if (!mxClient.IS_IOS)
			if (urlParams['noDevice'] != '1')
			{
				menu.addItem(mxResources.get('device') + '...', null, function()
				{
					editorUi.pickFile(App.MODE_DEVICE);
				}, parent);
			}

			if (!editorUi.isOffline())
			{
				menu.addSeparator(parent);
				
				menu.addItem(mxResources.get('url') + '...', null, function()
				{
					var dlg = new FilenameDialog(editorUi, '', mxResources.get('open'), function(fileUrl)
					{
						if (fileUrl != null && fileUrl.length > 0)
						{
							if (editorUi.getCurrentFile() == null)
							{
								window.location.hash = '#U' + encodeURIComponent(fileUrl);
							}
							else
							{
								window.openWindow(((mxClient.IS_CHROMEAPP) ?
									'https://www.draw.io/' : 'https://' + location.host + '/') +
									window.location.search + '#U' + encodeURIComponent(fileUrl));
							}
						}
					}, mxResources.get('url'));
					editorUi.showDialog(dlg.container, 300, 80, true, true);
					dlg.init();
				}, parent);
			}
		}));
		
		if (Editor.enableCustomLibraries)
		{
			this.put('newLibrary', new Menu(function(menu, parent)
			{
				if (typeof(google) != 'undefined' && typeof(google.picker) != 'undefined')
				{
					if (editorUi.drive != null)
					{
						menu.addItem(mxResources.get('googleDrive') + '...', null, function()
						{
							editorUi.showLibraryDialog(null, null, null, null, App.MODE_GOOGLE);
						}, parent);
					}
					else if (googleEnabled && typeof window.DriveClient === 'function')
					{
						menu.addItem(mxResources.get('googleDrive') + ' (' + mxResources.get('loading') + '...)', null, function()
						{
							// do nothing
						}, parent, null, false);
					}
				}

				if (editorUi.oneDrive != null)
				{
					menu.addItem(mxResources.get('oneDrive') + '...', null, function()
					{
						editorUi.showLibraryDialog(null, null, null, null, App.MODE_ONEDRIVE);
					}, parent);
				}
				else if (oneDriveEnabled && typeof window.OneDriveClient === 'function')
				{
					menu.addItem(mxResources.get('oneDrive') + ' (' + mxResources.get('loading') + '...)', null, function()
					{
						// do nothing
					}, parent, null, false);
				}

				if (editorUi.dropbox != null)
				{
					menu.addItem(mxResources.get('dropbox') + '...', null, function()
					{
						editorUi.showLibraryDialog(null, null, null, null, App.MODE_DROPBOX);
					}, parent);
				}
				else if (dropboxEnabled && typeof window.DropboxClient === 'function')
				{
					menu.addItem(mxResources.get('dropbox') + ' (' + mxResources.get('loading') + '...)', null, function()
					{
						// do nothing
					}, parent, null, false);
				}
				
				menu.addSeparator(parent);
				
				if (editorUi.gitHub != null)
				{
					menu.addItem(mxResources.get('github') + '...', null, function()
					{
						editorUi.showLibraryDialog(null, null, null, null, App.MODE_GITHUB);
					}, parent);
				}
				
				if (editorUi.gitLab != null)
				{
					menu.addItem(mxResources.get('gitlab') + '...', null, function()
					{
						editorUi.showLibraryDialog(null, null, null, null, App.MODE_GITLAB);
					}, parent);
				}

				if (editorUi.trello != null)
				{
					menu.addItem(mxResources.get('trello') + '...', null, function()
					{
						editorUi.showLibraryDialog(null, null, null, null, App.MODE_TRELLO);
					}, parent);
				}
				else if (trelloEnabled && typeof window.TrelloClient === 'function')
				{
					menu.addItem(mxResources.get('trello') + ' (' + mxResources.get('loading') + '...)', null, function()
					{
						// do nothing
					}, parent, null, false);
				}
				
				menu.addSeparator(parent);
	
				if (isLocalStorage && urlParams['browser'] != '0')
				{
					menu.addItem(mxResources.get('browser') + '...', null, function()
					{
						editorUi.showLibraryDialog(null, null, null, null, App.MODE_BROWSER);
					}, parent);
				}
				
				//if (!mxClient.IS_IOS)
				if (urlParams['noDevice'] != '1')
				{
					menu.addItem(mxResources.get('device') + '...', null, function()
					{
						editorUi.showLibraryDialog(null, null, null, null, App.MODE_DEVICE);
					}, parent);
				}
			}));
	
			this.put('openLibraryFrom', new Menu(function(menu, parent)
			{
				if (typeof(google) != 'undefined' && typeof(google.picker) != 'undefined')
				{
					if (editorUi.drive != null)
					{
						menu.addItem(mxResources.get('googleDrive') + '...', null, function()
						{
							editorUi.pickLibrary(App.MODE_GOOGLE);
						}, parent);
					}
					else if (googleEnabled && typeof window.DriveClient === 'function')
					{
						menu.addItem(mxResources.get('googleDrive') + ' (' + mxResources.get('loading') + '...)', null, function()
						{
							// do nothing
						}, parent, null, false);
					}
				}

				if (editorUi.oneDrive != null)
				{
					menu.addItem(mxResources.get('oneDrive') + '...', null, function()
					{
						editorUi.pickLibrary(App.MODE_ONEDRIVE);
					}, parent);
				}
				else if (oneDriveEnabled && typeof window.OneDriveClient === 'function')
				{
					menu.addItem(mxResources.get('oneDrive') + ' (' + mxResources.get('loading') + '...)', null, function()
					{
						// do nothing
					}, parent, null, false);
				}

				if (editorUi.dropbox != null)
				{
					menu.addItem(mxResources.get('dropbox') + '...', null, function()
					{
						editorUi.pickLibrary(App.MODE_DROPBOX);
					}, parent);
				}
				else if (dropboxEnabled && typeof window.DropboxClient === 'function')
				{
					menu.addItem(mxResources.get('dropbox') + ' (' + mxResources.get('loading') + '...)', null, function()
					{
						// do nothing
					}, parent, null, false);
				}
				
				menu.addSeparator(parent);
				
				if (editorUi.gitHub != null)
				{
					menu.addItem(mxResources.get('github') + '...', null, function()
					{
						editorUi.pickLibrary(App.MODE_GITHUB);
					}, parent);
				}
				
				if (editorUi.gitLab != null)
				{
					menu.addItem(mxResources.get('gitlab') + '...', null, function()
					{
						editorUi.pickLibrary(App.MODE_GITLAB);
					}, parent);
				}

				if (editorUi.trello != null)
				{
					menu.addItem(mxResources.get('trello') + '...', null, function()
					{
						editorUi.pickLibrary(App.MODE_TRELLO);
					}, parent);
				}
				else if (trelloEnabled && typeof window.TrelloClient === 'function')
				{
					menu.addItem(mxResources.get('trello') + ' (' + mxResources.get('loading') + '...)', null, function()
					{
						// do nothing
					}, parent, null, false);
				}
				
				menu.addSeparator(parent);
	
				if (isLocalStorage && urlParams['browser'] != '0')
				{
					menu.addItem(mxResources.get('browser') + '...', null, function()
					{
						editorUi.pickLibrary(App.MODE_BROWSER);
					}, parent);
				}
				
				//if (!mxClient.IS_IOS)
				if (urlParams['noDevice'] != '1')
				{
					menu.addItem(mxResources.get('device') + '...', null, function()
					{
						editorUi.pickLibrary(App.MODE_DEVICE);
					}, parent);
				}
	
				if (!editorUi.isOffline())
				{
					menu.addSeparator(parent);
					
					menu.addItem(mxResources.get('url') + '...', null, function()
					{
						var dlg = new FilenameDialog(editorUi, '', mxResources.get('open'), function(fileUrl)
						{
							if (fileUrl != null && fileUrl.length > 0 && editorUi.spinner.spin(document.body, mxResources.get('loading')))
							{
								var realUrl = fileUrl;
								
								if (!editorUi.editor.isCorsEnabledForUrl(fileUrl))
								{
									realUrl = PROXY_URL + '?url=' + encodeURIComponent(fileUrl);
								}
								
								// Uses proxy to avoid CORS issues
								mxUtils.get(realUrl, function(req)
								{
									if (req.getStatus() >= 200 && req.getStatus() <= 299)
									{
										editorUi.spinner.stop();
										
										try
										{
											editorUi.loadLibrary(new UrlLibrary(this, req.getText(), fileUrl));
										}
										catch (e)
										{
											editorUi.handleError(e, mxResources.get('errorLoadingFile'));
										}
									}
									else
									{
										editorUi.spinner.stop();
										editorUi.handleError(null, mxResources.get('errorLoadingFile'));
									}
								}, function()
								{
									editorUi.spinner.stop();
									editorUi.handleError(null, mxResources.get('errorLoadingFile'));
								});
							}
						}, mxResources.get('url'));
						editorUi.showDialog(dlg.container, 300, 80, true, true);
						dlg.init();
					}, parent);
				}
				
				if (urlParams['confLib'] == '1')
				{
					menu.addSeparator(parent);
					
					menu.addItem(mxResources.get('confluenceCloud') + '...', null, function()
					{
						editorUi.showRemotelyStoredLibrary(mxResources.get('libraries'));
					}, parent);
				}
			}));
		}

		// Overrides edit menu to add find, copyAsImage editGeometry
		this.put('edit', new Menu(mxUtils.bind(this, function(menu, parent)
		{
			this.addMenuItems(menu, ['undo', 'redo', '-', 'cut', 'copy', 'copyAsImage', 'paste',
				'delete', '-', 'duplicate', '-', 'findReplace', '-', 'editData', 'editTooltip', '-',
				'editStyle',  'editGeometry', '-', 'edit', '-', 'editLink', 'openLink', '-',
                'selectVertices', 'selectEdges', 'selectAll', 'selectNone', '-', 'lockUnlock']);
		})));

		var action = editorUi.actions.addAction('comments', mxUtils.bind(this, function()
		{
			if (this.commentsWindow == null)
			{
				// LATER: Check outline window for initial placement
				this.commentsWindow = new CommentsWindow(editorUi, document.body.offsetWidth - 380, 120, 300, 350);
				//TODO Are these events needed?
				this.commentsWindow.window.addListener('show', function()
				{
					editorUi.fireEvent(new mxEventObject('comments'));
				});
				this.commentsWindow.window.addListener('hide', function()
				{
					editorUi.fireEvent(new mxEventObject('comments'));
				});
				this.commentsWindow.window.setVisible(true);
				editorUi.fireEvent(new mxEventObject('comments'));
			}
			else
			{
				var isVisible = !this.commentsWindow.window.isVisible();
				this.commentsWindow.window.setVisible(isVisible);
				
				this.commentsWindow.refreshCommentsTime();

				if (isVisible && this.commentsWindow.hasError) 
				{
					this.commentsWindow.refreshComments();
				}				
			}
		}));
		action.setToggleAction(true);
		action.setSelectedCallback(mxUtils.bind(this, function() { return this.commentsWindow != null && this.commentsWindow.window.isVisible(); }));

		// Destroys comments window to force update or disable if not supported
		editorUi.editor.addListener('fileLoaded', mxUtils.bind(this, function()
		{
			if (this.commentsWindow != null)
			{
				this.commentsWindow.destroy();
				this.commentsWindow = null;
			}
		}));
		
		// Extends toolbar dropdown
		var viewPanelsMenu = this.get('viewPanels');
		
		viewPanelsMenu.funct = function(menu, parent)
		{
			var file = editorUi.getCurrentFile();
			editorUi.menus.addMenuItems(menu, ['toggleShapes', 'format', 'ruler',
				'-', 'findReplace', 'layers', 'tags', 'outline', '-'], parent);

			if (editorUi.commentsSupported())
			{
				editorUi.menus.addMenuItems(menu, ['comments'], parent);
			}
			
			if (file != null && file.isRealtimeEnabled() && file.isRealtimeSupported())
			{
				editorUi.menus.addMenuItems(menu, ['showRemoteCursors'], parent);
			}

			editorUi.menus.addMenuItems(menu, ['-', 'fullscreen'], parent);
		};

		// Overrides view menu to add search and scratchpad
		this.put('view', new Menu(mxUtils.bind(this, function(menu, parent)
		{
			if (Editor.currentTheme == 'simple')
			{
				var file = editorUi.getCurrentFile();
				editorUi.menus.addMenuItems(menu, ['toggleShapes', 'format'], parent);
	
				if (editorUi.isPageMenuVisible())
				{
					editorUi.menus.addMenuItems(menu, ['pageTabs'], parent);
				}

				editorUi.menus.addMenuItems(menu, ['ruler', '-', 'search'], parent);

				if (isLocalStorage || mxClient.IS_CHROMEAPP)
				{
					var item = editorUi.menus.addMenuItem(menu, 'scratchpad', parent);
					
					if (!editorUi.isOffline() || mxClient.IS_CHROMEAPP || EditorUi.isElectronApp)
					{
						editorUi.menus.addLinkToItem(item, 'https://www.drawio.com/doc/faq/scratchpad');
					}
				}
				
				editorUi.menus.addMenuItems(menu, ['-', 'findReplace',
					'layers', 'tags', 'outline', '-'], parent);
				
				if (editorUi.commentsSupported())
				{
					editorUi.menus.addMenuItems(menu, ['comments'], parent);
				}
				
				if (file != null && file.isRealtimeEnabled() && file.isRealtimeSupported())
				{
					this.addMenuItems(menu, ['showRemoteCursors'], parent);
				}

				this.addMenuItems(menu, ['-', 'fullscreen'], parent);
			}
			else
			{
				this.addMenuItems(menu, (['format', 'outline', 'layers', 'tags']).
					concat((editorUi.commentsSupported()) ?
					['comments', '-'] : ['-']));
				
				this.addMenuItems(menu, ['-', 'search'], parent);
				
				if (isLocalStorage || mxClient.IS_CHROMEAPP)
				{
					var item = this.addMenuItem(menu, 'scratchpad', parent);
					
					if (!editorUi.isOffline() || mxClient.IS_CHROMEAPP || EditorUi.isElectronApp)
					{
						this.addLinkToItem(item, 'https://www.drawio.com/doc/faq/scratchpad');
					}
				}
				
				this.addMenuItems(menu, ['toggleShapes', '-', 'pageView', 'pageScale']);
				this.addSubmenu('units', menu, parent);
				menu.addSeparator(parent);

				if (editorUi.isPageMenuVisible())
				{
					editorUi.menus.addMenuItems(menu, ['pageTabs'], parent);
				}

				this.addMenuItems(menu, ['tooltips', 'ruler', '-', 'grid', 'guides',
					'-', 'connectionArrows', 'connectionPoints', '-',
					'resetView', 'zoomIn', 'zoomOut'], parent);

				if (urlParams['sketch'] != '1')
				{
					this.addMenuItems(menu, ['-', 'fullscreen'], parent);
				}
			}
		})));

		// Edit cell menu
		this.put('editCell', new Menu(mxUtils.bind(this, function(menu, parent)
		{
			// Last entry edits cell label
			this.addMenuItems(menu, ['editLink', 'editShape', 'editImage', 'crop', '-',
				'editData', 'copyData', 'pasteData', '-', 'editConnectionPoints',
				'editGeometry', '-', 'editTooltip', 'editStyle', '-', 'edit'], parent);
		})));
				
		// Current page menu
		this.put('currentPage', new Menu(mxUtils.bind(this, function(menu, parent)
		{
			var page = editorUi.currentPage;

			if (page != null)
			{
				menu.addItem(mxResources.get('rename') + '...', null, mxUtils.bind(this, function()
				{
					editorUi.renamePage(page, page.getName());
				}), parent);
				
				menu.addItem(mxResources.get('delete'), null, mxUtils.bind(this, function()
				{
					editorUi.removePage(page);
				}), parent);
				
				if (editorUi.pages.length > 1)
				{
					editorUi.menus.addSubmenu('movePage', menu, parent, mxResources.get('move'));
					menu.addSeparator(parent);
				}

				menu.addSeparator(parent);

				menu.addItem(mxResources.get('duplicate'), null, mxUtils.bind(this, function()
				{
					editorUi.duplicatePage(page, mxResources.get('copyOf', [page.getName()]));
				}), parent);
				
				if (urlParams['embed'] != 1)
				{
					menu.addSeparator(parent);

					if (!mxClient.IS_CHROMEAPP && !EditorUi.isElectronApp && editorUi.getServiceName() == 'draw.io')
					{
						menu.addItem(mxResources.get('openInNewWindow'), null, mxUtils.bind(this, function()
						{
							editorUi.editor.editAsNew(editorUi.getFileData(true, null, null, null, true, true));
						}), parent);
					}
					
					var url = editorUi.getLinkForPage(page);

					if (url != null)
					{
						menu.addItem(mxResources.get('link') + '...', null, mxUtils.bind(this, function()
						{
							editorUi.showPageLinkDialog(page);
						}), parent);
					}
				}
			}
		})));

		// Pages menu
		this.put('pages', new Menu(mxUtils.bind(this, function(menu, parent)
		{
			var page = editorUi.currentPage;
			
			menu.addItem(mxResources.get('insertPage'), null, mxUtils.bind(this, function()
			{
				editorUi.insertPage();
			}), parent);

			menu.addSeparator(parent);
			
			if (editorUi.pages != null)
			{
				for (var i = 0; i < editorUi.pages.length; i++)
				{
					(mxUtils.bind(this, function(index)
					{
						var item = null;

						if (editorUi.pages[index] == page)
						{
							item = editorUi.menus.addSubmenu('currentPage', menu, parent,
								editorUi.getShortPageName(page));
						}
						else
						{
							item = menu.addItem(editorUi.getShortPageName(editorUi.pages[index]),
								null, mxUtils.bind(this, function()
							{
								editorUi.selectPage(editorUi.pages[index]);
							}), parent);
						}

						var id = editorUi.pages[index].getId();
						item.setAttribute('title', editorUi.pages[index].getName() +
							' (' + (index + 1) + '/' + editorUi.pages.length + ')' +
							((id != null) ? ' [' + id + ']' : ''));
						
						// Adds checkmark to current page
						if (editorUi.pages[index] == page)
						{
							menu.addCheckmark(item, Editor.checkmarkImage);
						}
					}))(i);
				}
			}
		})));
		
		if (EditorUi.isElectronApp)
		{
			var enableSpellCheck = urlParams['enableSpellCheck'] == '1';

			var spellCheckAction = editorUi.actions.addAction('spellCheck', function()
			{
				editorUi.toggleSpellCheck();
				enableSpellCheck = !enableSpellCheck;
				editorUi.alert(mxResources.get('restartForChangeRequired'));
			});
			
			spellCheckAction.setToggleAction(true);
			spellCheckAction.setSelectedCallback(function() { return enableSpellCheck; });

			var enableStoreBkp = urlParams['enableStoreBkp'] == '1';

			var storeBkpAction = editorUi.actions.addAction('autoBkp', function()
			{
				editorUi.toggleStoreBkp();
				enableStoreBkp = !enableStoreBkp;
			});
			
			storeBkpAction.setToggleAction(true);
			storeBkpAction.setSelectedCallback(function() { return enableStoreBkp; });

			editorUi.actions.addAction('openDevTools', function()
			{
				editorUi.openDevTools();
			});

			editorUi.actions.addAction('drafts...', function()
			{
				var dlg = new FilenameDialog(editorUi, (EditorUi.draftSaveDelay / 1000) + '', mxResources.get('apply'), mxUtils.bind(this, function(newValue)
				{
					var val = parseInt(newValue);
					
					if (val >= 0)
					{
						EditorUi.draftSaveDelay = val * 1000;
						EditorUi.enableDrafts = val > 0;  //Disable if zero
						mxSettings.setDraftSaveDelay(val);
						mxSettings.save();		
					}
				}), mxResources.get('draftSaveInt'), null, null, null, null, null, null, 50, 250);
				editorUi.showDialog(dlg.container, 320, 80, true, true);
				dlg.init();
			});
		}
		
		var langMenu = this.get('language');

		this.put('extras', new Menu(mxUtils.bind(this, function(menu, parent)
		{
			// Compatiblity code for live UI switch and static UI
			var sketchTheme = Editor.currentTheme == 'simple' || urlParams['sketch'] == '1';
			
			if (sketchTheme || uiTheme == 'min')
			{
				if ((urlParams['embed'] != '1' || urlParams['atlas'] == '1') &&
					urlParams['extAuth'] != '1' && editorUi.mode != App.MODE_ATLAS &&
					urlParams['embedInline'] != '1' && (Editor.isDarkMode() ||
					(!mxClient.IS_IE && !mxClient.IS_IE11)))
				{
					editorUi.menus.addSubmenu('appearance', menu, parent);
				}

				if (urlParams['embed'] != '1' && urlParams['extAuth'] != '1' &&
					editorUi.mode != App.MODE_ATLAS)
				{
					editorUi.menus.addSubmenu('theme', menu, parent);
				}
				
				menu.addSeparator(parent);

				if (langMenu != null && (urlParams['embed'] != '1' || urlParams['lang'] == null))
				{
					editorUi.menus.addSubmenu('language', menu, parent);
				}
				
				editorUi.menus.addSubmenu('units', menu, parent);
				editorUi.menus.addMenuItems(menu, ['-', 'copyConnect',
					'collapseExpand', 'tooltips', '-'], parent);

				var file = editorUi.getCurrentFile();

				if (Editor.currentTheme != 'simple')
				{
					if (file != null && file.isRealtimeEnabled() && file.isRealtimeSupported())
					{
						this.addMenuItems(menu, ['showRemoteCursors'], parent);
					}
					
					editorUi.menus.addMenuItems(menu, ['ruler', '-'], parent);
				}

				if (EditorUi.isElectronApp)
				{
					editorUi.menus.addMenuItems(menu, ['-', 'spellCheck', 'autoBkp', 'drafts', '-'], parent);
				}

				this.addSubmenu('diagramLanguage', menu, parent);
				menu.addSeparator(parent);
				
				if (editorUi.mode != App.MODE_ATLAS) 
				{
					editorUi.menus.addMenuItem(menu, 'configuration', parent);
				}
				
				// Adds trailing separator in case new plugin entries are added
				menu.addSeparator(parent);
			}
			else
			{
				if (urlParams['embed'] != '1' || urlParams['lang'] == null)
				{
					this.addSubmenu('language', menu, parent);
				}
				
				if ((urlParams['embed'] != '1' || urlParams['atlas'] == '1') &&
					Editor.currentTheme != 'atlas' && (Editor.isDarkMode() ||
					(!mxClient.IS_IE && !mxClient.IS_IE11)))
				{
					editorUi.menus.addSubmenu('appearance', menu, parent);
				}

				if (urlParams['embed'] != '1' && urlParams['extAuth'] != '1' &&
					editorUi.mode != App.MODE_ATLAS)
				{
					this.addSubmenu('theme', menu, parent);
				}

				menu.addSeparator(parent);

				if (typeof(MathJax) !== 'undefined')
				{
					var item = this.addMenuItem(menu, 'mathematicalTypesetting', parent);
					
					if (!editorUi.isOffline() || mxClient.IS_CHROMEAPP || EditorUi.isElectronApp)
					{
						this.addLinkToItem(item, 'https://www.drawio.com/doc/faq/math-typesetting');
					}
				}
				
				if (EditorUi.isElectronApp)
				{
					this.addMenuItems(menu, ['spellCheck', 'autoBkp', 'drafts', '-'], parent);
				}

				this.addMenuItems(menu, ['copyConnect', 'collapseExpand', '-'], parent);
				
				if (urlParams['embed'] != '1')
				{
					var file = editorUi.getCurrentFile();

					if (file != null && file.isRealtimeEnabled() && file.isRealtimeSupported())
					{
						this.addMenuItems(menu, ['showRemoteCursors', 'shareCursor'], parent);
					}

					this.addMenuItems(menu, ['autosave'], parent);
				}

				menu.addSeparator(parent);
				
				if (!editorUi.isOfflineApp() && isLocalStorage)
				{
					this.addMenuItem(menu, 'plugins', parent);
				}

				this.addMenuItems(menu, ['-', 'editDiagram'], parent);
				this.addSubmenu('diagramLanguage', menu, parent);
				menu.addSeparator(parent);

				if (urlParams['embed'] != '1' && (isLocalStorage || mxClient.IS_CHROMEAPP))
				{
					this.addMenuItems(menu, ['showStartScreen'], parent);
				}

				this.addMenuItems(menu, ['configuration'], parent);
				
				// Adds trailing separator in case new plugin entries are added
				menu.addSeparator(parent);
				
				if (urlParams['newTempDlg'] == '1')
				{
					editorUi.actions.addAction('templates', function()
					{
						function driveObjToTempDlg(item)
						{
							return {id: item.id, isExt: true, url: item.downloadUrl, title: item.title, imgUrl: item.thumbnailLink,
									changedBy: item.lastModifyingUserName, lastModifiedOn: item.modifiedDate}
						};
						
						var tempDlg = new TemplatesDialog(editorUi, function(xml){console.log(arguments)}, null,
								null, null, 'user', function(callback, error, username)
						{
							var oneWeek = new Date();
							oneWeek.setDate(oneWeek.getDate() - 7);
							
							editorUi.drive.listFiles(null, oneWeek, username? true : false, function(resp)
							{
								var results = [];
								
								for (var i = 0; i < resp.items.length; i++)
								{
									results.push(driveObjToTempDlg(resp.items[i]));
								}
								
								callback(results);
							}, error)
						}, function(str, callback, error, username)
						{
							editorUi.drive.listFiles(str, null, username? true : false, function(resp)
							{
								var results = [];
								
								for (var i = 0; i < resp.items.length; i++)
								{
									results.push(driveObjToTempDlg(resp.items[i]));
								}
								
								callback(results);
							}, error)
						}, function(obj, callback, error)
						{
							editorUi.drive.getFile(obj.id, function(file)
							{
								callback(file.data);
							}, error);
						}, null, function(callback)
						{
							callback({'Test': []}, 1);
						}, true, false);
						
						editorUi.showDialog(tempDlg.container, window.innerWidth, window.innerHeight, true, false, null, false, true);
					});
					this.addMenuItem(menu, 'templates', parent);
				}
			}
		})));

		this.put('movePage', new Menu(mxUtils.bind(this, function(menu, parent)
		{
			var current = editorUi.getSelectedPageIndex();

			if (editorUi.pages != null)
			{
				for (var i = 0; i < editorUi.pages.length; i++)
				{
					if (i != current)
					{
						(function(index)
						{
							menu.addItem(editorUi.getShortPageName(editorUi.pages[index]), null, function()
							{
								editorUi.movePage(current, index);
							}, parent);
						})(i);
					}
				}
			}
		})));

		this.put('share', new Menu(mxUtils.bind(this, function(menu, parent)
		{
			if (!editorUi.isStandaloneApp())
			{
				var err = (editorUi.isOffline(true)) ?
					mxResources.get('offline') :
					editorUi.getNetworkStatus();

				if (err != null)
				{
					menu.addItem(err, null, null, parent, null, false);
					menu.addSeparator(parent);
				}

				editorUi.menus.addMenuItems(menu, ['share'], parent);
			}

			this.addMenuItem(menu, 'publishLink', parent, null,
				null, mxResources.get('publish') + '...');

			if (editorUi.getMainUser() != null)
			{
				this.addMenuItems(menu, ['accounts'], parent);
			}
		})));

		this.put('diagram', new Menu(mxUtils.bind(this, function(menu, parent)
		{
			var file = editorUi.getCurrentFile();

			if (Editor.currentTheme != 'simple')
			{
				editorUi.menus.addSubmenu('extras', menu, parent, mxResources.get('settings'));
				menu.addSeparator(parent);
			}

			// Compatiblity code for live UI switch and static UI
			var sketchTheme = Editor.currentTheme == 'simple' ||
				Editor.currentTheme == 'sketch';
			
			if (mxClient.IS_CHROMEAPP || EditorUi.isElectronApp)
			{
				editorUi.menus.addMenuItems(menu, ['new', 'open', '-',
					'synchronize', 'properties', '-',
					'save', 'saveAs', '-'], parent);
			}
			else if (editorUi.mode == App.MODE_ATLAS)
			{
				if (urlParams['noSaveBtn'] != '1' &&
					urlParams['embedInline'] != '1')
				{
					editorUi.menus.addMenuItems(menu, ['-', 'save'], parent);
				}
				
				if (urlParams['saveAndExit'] == '1' || 
					(urlParams['noSaveBtn'] == '1' &&
					urlParams['saveAndExit'] != '0') || editorUi.mode == App.MODE_ATLAS)
				{
					editorUi.menus.addMenuItems(menu, ['saveAndExit'], parent);
					
					if (file != null && file.isRevisionHistorySupported())
					{
						editorUi.menus.addMenuItems(menu, ['revisionHistory'], parent);
					}
				}
				
				menu.addSeparator(parent);
			}
			else if (editorUi.mode == App.MODE_ATLAS)
			{
				editorUi.menus.addMenuItems(menu, ['save', 'synchronize', '-'], parent);
			}
			else if (urlParams['noFileMenu'] != '1')
			{
				editorUi.menus.addSubmenu('file', menu, parent);
				menu.addSeparator(parent);

				if (Editor.currentTheme == 'min')
				{
					editorUi.menus.addMenuItems(menu, ['toggleShapes', 'format',
						'layers', 'tags', '-', 'findReplace'], parent);
			
					if (editorUi.commentsSupported())
					{
						editorUi.menus.addMenuItems(menu, ['comments'], parent);
					}
					
					menu.addSeparator(parent);
				}
			}
			
			editorUi.menus.addSubmenu('exportAs', menu, parent);
			
			if (mxClient.IS_CHROMEAPP || EditorUi.isElectronApp)
			{
				editorUi.menus.addMenuItems(menu, ['import'], parent);
			}
			else if (urlParams['noFileMenu'] != '1')
			{
				editorUi.menus.addSubmenu('importFrom', menu, parent);
			}
	
			if (Editor.currentTheme != 'simple' && Editor.currentTheme != 'min')
			{
				editorUi.menus.addMenuItems(menu, ['-',  'findReplace'], parent);
		
				if (editorUi.commentsSupported())
				{
					editorUi.menus.addMenuItems(menu, ['comments', '-'], parent);
				}

				editorUi.menus.addMenuItems(menu, ['toggleShapes', 'format', 'layers', 'tags', '-'], parent);	
				editorUi.menus.addMenuItems(menu, ['pageSetup'], parent);
			}
			else if (Editor.currentTheme != 'min')
			{
				this.addMenuItems(menu, ['-'], parent);
				this.addSubmenu('newLibrary', menu, parent);
				this.addSubmenu('openLibraryFrom', menu, parent);
			}
	
			menu.addSeparator(parent);

			// Cannot use print in standalone mode on iOS as we cannot open new windows
			if (urlParams['noFileMenu'] != '1' && (!mxClient.IS_IOS || !navigator.standalone))
			{
				editorUi.menus.addMenuItems(menu, ['print'], parent);
			}
	
			if (!sketchTheme && Editor.currentTheme != 'min')
			{
				if (file != null && editorUi.fileNode != null && urlParams['embedInline'] != '1')
				{
					var filename = (file.getTitle() != null) ?
						file.getTitle() : editorUi.defaultFilename;
					
					if (!/(\.html)$/i.test(filename))
					{
						this.addMenuItems(menu, ['-', 'properties']);
					}
				}
			}
	
			menu.addSeparator(parent);
			
			if (Editor.currentTheme == 'simple')
			{
				editorUi.menus.addSubmenu('extras', menu, parent, mxResources.get('settings'));
				menu.addSeparator(parent);
			}

			editorUi.menus.addSubmenu('help', menu, parent);
			menu.addSeparator(parent);

			if (urlParams['embed'] == '1')
			{
				if (urlParams['noSaveBtn'] != '1' &&
					urlParams['embedInline'] != '1')
				{
					editorUi.menus.addMenuItems(menu, ['save'], parent);
				}
				
				if (urlParams['saveAndExit'] == '1' || 
					(urlParams['noSaveBtn'] == '1' &&
					urlParams['saveAndExit'] != '0'))
				{
					editorUi.menus.addMenuItems(menu, ['saveAndExit'], parent);
					
					if (file != null && file.isRevisionHistorySupported())
					{
						editorUi.menus.addMenuItems(menu, ['revisionHistory'], parent);
					}
				}
			}

			if (urlParams['embed'] == '1' || editorUi.mode == App.MODE_ATLAS)
			{
				if (urlParams['noExitBtn'] != '1' || editorUi.mode == App.MODE_ATLAS)
				{
					editorUi.menus.addMenuItems(menu, ['exit'], parent);
				}
			}
			
			if (urlParams['embed'] != '1' && file != null)
			{
				editorUi.menus.addMenuItems(menu, ['-', 'close'], parent);
			}
		})));

		this.put('save', new Menu(mxUtils.bind(this, function(menu, parent)
		{
			var file = editorUi.getCurrentFile();
			
			if (file != null && (file.constructor == DriveFile || file.constructor == OneDriveFile))
			{
				editorUi.menus.addMenuItems(menu, ['save', 'makeCopy', '-', 'rename', 'moveToFolder'], parent);
			}
			else
			{
				editorUi.menus.addMenuItems(menu, ['save', 'saveAs', '-', 'rename'], parent);
				
				if (editorUi.isOfflineApp())
				{
					if (navigator.onLine && urlParams['stealth'] != '1' && urlParams['lockdown'] != '1')
					{
						this.addMenuItems(menu, ['upload'], parent);
					}
				}
				else
				{
					editorUi.menus.addMenuItems(menu, ['makeCopy'], parent);
				}
			}
			
			editorUi.menus.addMenuItems(menu, ['-', 'autosave'], parent);
	
			if (file != null && file.isRevisionHistorySupported())
			{
				editorUi.menus.addMenuItems(menu, ['-', 'revisionHistory'], parent);
			}
		})));

		this.put('file', new Menu(mxUtils.bind(this, function(menu, parent)
		{
			// Compatiblity code for live UI switch and static UI
			var minTheme = Editor.currentTheme == 'simple' ||
				Editor.currentTheme == 'sketch' ||
				Editor.currentTheme == 'min';

			if (urlParams['embed'] == '1')
			{
				this.addSubmenu('importFrom', menu, parent);
				this.addSubmenu('exportAs', menu, parent);
				this.addSubmenu('embed', menu, parent);

				if (urlParams['libraries'] == '1')
				{
					this.addMenuItems(menu, ['-'], parent);
					this.addSubmenu('newLibrary', menu, parent);
					this.addSubmenu('openLibraryFrom', menu, parent);
				}
				
				if (editorUi.isRevisionHistorySupported())
				{
					this.addMenuItems(menu, ['-', 'revisionHistory'], parent);
				}
				
				this.addMenuItems(menu, ['-', 'pageSetup', 'print', '-', 'rename'], parent);
				
				if (urlParams['embedInline'] != '1')
				{
					if (urlParams['noSaveBtn'] == '1')
					{
						if (urlParams['saveAndExit'] != '0')
						{
							this.addMenuItems(menu, ['saveAndExit'], parent);
						}
					}
					else
					{
						this.addMenuItems(menu, ['save'], parent);
						
						if (urlParams['saveAndExit'] == '1')
						{
							this.addMenuItems(menu, ['saveAndExit'], parent);
						}
					}
				}
				
				if (urlParams['noExitBtn'] != '1')
				{
					this.addMenuItems(menu, ['exit'], parent);
				}
			}
			else if (minTheme)
			{
				var file = editorUi.getCurrentFile();
				editorUi.menus.addMenuItems(menu, ['new'], parent);
				editorUi.menus.addSubmenu('openFrom', menu, parent);

				if (isLocalStorage)
				{
					this.addSubmenu('openRecent', menu, parent);
				}
				
				menu.addSeparator(parent);
				editorUi.menus.addMenuItems(menu, ['-', 'save'], parent);

				if (file == null || file.constructor != DriveFile)
				{
					editorUi.menus.addMenuItems(menu, ['saveAs'], parent);
				}

				if (!mxClient.IS_CHROMEAPP && !EditorUi.isElectronApp &&
					file != null && (file.constructor != LocalFile ||
					file.fileHandle != null))
				{
					editorUi.menus.addMenuItems(menu, ['synchronize'], parent);
				}

				menu.addSeparator(parent);

				if (file != null)
				{
					if (!mxClient.IS_CHROMEAPP && !EditorUi.isElectronApp &&
						Editor.currentTheme == 'sketch')
					{
						this.addMenuItem(menu, 'publishLink', parent, null, null, mxResources.get('publish') + '...');
					}

					if (Editor.currentTheme != 'simple' &&
						(file.constructor == DriveFile ||
						file.constructor == GitHubFile ||
						file.constructor == OneDriveFile))
					{
						editorUi.menus.addMenuItems(menu, ['share'], parent);
					}
				}

				menu.addSeparator(parent);

				if (file != null && file.isRenamable())
				{
					this.addMenuItems(menu, ['rename'], parent);
				}
				
				if (editorUi.isOfflineApp())
				{
					if (navigator.onLine && urlParams['stealth'] != '1' && urlParams['lockdown'] != '1')
					{
						this.addMenuItems(menu, ['upload'], parent);
					}
				}
				else
				{
					editorUi.menus.addMenuItems(menu, ['makeCopy'], parent);

					if (file != null)
					{
						if (file.constructor == OneDriveFile ||
							file.constructor == DriveFile)
						{
							editorUi.menus.addMenuItems(menu, ['moveToFolder'], parent);
						}

						menu.addSeparator(parent);

						if (file.getFolderUrl() != null)
						{
							editorUi.menus.addMenuItems(menu, ['openFolder'], parent);
						}

						if (file.getFileUrl() != null)
						{
							editorUi.menus.addMenuItems(menu, ['openFile'], parent);
						}
					}
				}
				
				menu.addSeparator(parent);

				if (file != null && file.isRevisionHistorySupported())
				{
					editorUi.menus.addMenuItems(menu, ['revisionHistory'], parent);
				}

				if (file != null && editorUi.fileNode != null && urlParams['embedInline'] != '1')
				{
					var filename = (file.getTitle() != null) ?
						file.getTitle() : editorUi.defaultFilename;
					
					if ((file.constructor == DriveFile && file.sync != null &&
						file.sync.isConnected()) || !/(\.html)$/i.test(filename))
					{
						this.addMenuItems(menu, ['properties'], parent);
					}
				}
					
				if (Editor.currentTheme == 'simple')
				{
					editorUi.menus.addMenuItems(menu, ['-', 'autosave'], parent);
				}
			}
			else
			{
				var file = this.editorUi.getCurrentFile();
				
				if (file != null && file.constructor == DriveFile)
				{
					if (file.isRestricted())
					{
						this.addMenuItems(menu, ['exportOptionsDisabled'], parent);
					}
					
					this.addMenuItems(menu, ['save', '-', 'share'], parent);
					
					var item = this.addMenuItem(menu, 'synchronize', parent);
					
					if (!editorUi.isOffline() || mxClient.IS_CHROMEAPP || EditorUi.isElectronApp)
					{
						this.addLinkToItem(item, 'https://www.drawio.com/doc/faq/synchronize');
					}
					
					menu.addSeparator(parent);
				}
				else
				{
					this.addMenuItems(menu, ['new'], parent);
				}
				
				this.addSubmenu('openFrom', menu, parent);

				if (isLocalStorage)
				{
					this.addSubmenu('openRecent', menu, parent);
				}
				
				if (file != null && file.constructor == DriveFile)
				{
					this.addMenuItems(menu, ['new', '-', 'rename', 'makeCopy',
						'openFolder', 'moveToFolder'], parent);
				}
				else
				{
					if (!mxClient.IS_CHROMEAPP && !EditorUi.isElectronApp &&
						file != null && (file.constructor != LocalFile ||
						file.fileHandle != null))
					{	
						menu.addSeparator(parent);
						var item = this.addMenuItem(menu, 'synchronize', parent);
						
						if (!editorUi.isOffline() || mxClient.IS_CHROMEAPP || EditorUi.isElectronApp)
						{
							this.addLinkToItem(item, 'https://www.drawio.com/doc/faq/synchronize');
						}
					}
					
					this.addMenuItems(menu, ['-', 'save', 'saveAs', '-'], parent);
					
					if (!mxClient.IS_CHROMEAPP && !EditorUi.isElectronApp &&
						editorUi.getServiceName() == 'draw.io' &&
						!editorUi.isOfflineApp() && file != null)
					{
						this.addMenuItems(menu, ['share', '-'], parent);
					}
					
					if (file != null && file.isRenamable())
					{
						this.addMenuItems(menu, ['rename'], parent);
					}
					
					if (editorUi.isOfflineApp())
					{
						if (navigator.onLine && urlParams['stealth'] != '1' && urlParams['lockdown'] != '1')
						{
							this.addMenuItems(menu, ['upload'], parent);
						}
					}
					else
					{
						this.addMenuItems(menu, ['makeCopy'], parent);

						if (file != null)
						{
							if (file.constructor == OneDriveFile)
							{
								this.addMenuItems(menu, ['moveToFolder'], parent);
							}

							if (file.getFolderUrl() != null)
							{
								editorUi.menus.addMenuItems(menu, ['openFolder'], parent);
							}
						}
					}
				}
				
				menu.addSeparator(parent);
				this.addSubmenu('importFrom', menu, parent);
				this.addSubmenu('exportAs', menu, parent);
				menu.addSeparator(parent);
				this.addSubmenu('embed', menu, parent);
				this.addSubmenu('publish', menu, parent);
				menu.addSeparator(parent);
				this.addSubmenu('newLibrary', menu, parent);
				this.addSubmenu('openLibraryFrom', menu, parent);
				
				if (editorUi.isRevisionHistorySupported())
				{
					this.addMenuItems(menu, ['-', 'revisionHistory'], parent);
				}
				
				if (file != null && editorUi.fileNode != null && urlParams['embedInline'] != '1')
				{
					var filename = (file.getTitle() != null) ?
						file.getTitle() : editorUi.defaultFilename;
					
					if ((file.constructor == DriveFile && file.sync != null &&
						file.sync.isConnected()) || !/(\.html)$/i.test(filename))
					{
						this.addMenuItems(menu, ['-', 'properties']);
					}
				}
				
				this.addMenuItems(menu, ['-', 'pageSetup'], parent);
				
				// Cannot use print in standalone mode on iOS as we cannot open new windows
				if (!mxClient.IS_IOS || !navigator.standalone)
				{
					this.addMenuItems(menu, ['print'], parent);
				}

				this.addMenuItems(menu, ['-', 'close']);
			}
		})));
		
		/**
		 * External Fonts undoable change
		 */
		function ChangeExtFonts(ui, extFonts, customFonts)
		{
			this.ui = ui;
			this.extFonts = extFonts;
			this.previousExtFonts = extFonts;
			this.customFonts = customFonts;
			this.prevCustomFonts = customFonts;
		};

		/**
		 * Implementation of the undoable External Fonts Change.
		 */
		ChangeExtFonts.prototype.execute = function()
		{
			var graph = this.ui.editor.graph;
			this.customFonts = this.prevCustomFonts;
			this.prevCustomFonts = this.ui.menus.customFonts;
			this.ui.fireEvent(new mxEventObject('customFontsChanged', 'customFonts', this.customFonts));
			
			this.extFonts = this.previousExtFonts;
			var tmp = graph.extFonts;
			
			for (var i = 0; tmp != null && i < tmp.length; i++)
			{
				var fontElem = document.getElementById('extFont_' + tmp[i].name);
				
				if (fontElem != null)
				{
					fontElem.parentNode.removeChild(fontElem);
				}
			}
			
			graph.extFonts = [];
			
			for (var i = 0; this.previousExtFonts != null && i < this.previousExtFonts.length; i++)
			{
				this.ui.editor.graph.addExtFont(this.previousExtFonts[i].name, this.previousExtFonts[i].url);
			}
			
			this.previousExtFonts = tmp;
		};

		//Replace the default font family menu
		this.put('fontFamily', new Menu(mxUtils.bind(this, function(menu, parent)
		{
			var addItem = mxUtils.bind(this, function(fontName, fontUrl, deletable, fontLabel, tooltip)
			{
				var graph = editorUi.editor.graph;

				var tr = this.styleChange(menu, fontLabel || fontName,
					(urlParams['ext-fonts'] != '1') ?
						[mxConstants.STYLE_FONTFAMILY, 'fontSource', 'FType'] : [mxConstants.STYLE_FONTFAMILY],
					(urlParams['ext-fonts'] != '1') ?
						[fontName, (fontUrl != null) ? encodeURIComponent(fontUrl) : null, null] : [fontName],
					null, parent, function()
				{
					if (urlParams['ext-fonts'] != '1')
					{
						graph.setFont(fontName, fontUrl);
					}
					else
					{
						document.execCommand('fontname', false, fontName);
						//Add the font to the file in case it was a previous font from the settings
						graph.addExtFont(fontName, fontUrl);
					}
					
					editorUi.fireEvent(new mxEventObject('styleChanged',
						'keys', (urlParams['ext-fonts'] != '1') ?
							[mxConstants.STYLE_FONTFAMILY, 'fontSource', 'FType'] : [mxConstants.STYLE_FONTFAMILY],
						'values', (urlParams['ext-fonts'] != '1') ?
							[fontName, (fontUrl != null) ? encodeURIComponent(fontUrl) : null, null] : [fontName],
						'cells', [graph.cellEditor.getEditingCell()]));
				}, function()
				{
					graph.updateLabelElements(graph.getSelectionCells(), function(elt)
					{
						elt.removeAttribute('face');
						elt.style.fontFamily = null;
						
						if (elt.nodeName == 'PRE')
						{
							graph.replaceElement(elt, 'div');
						}
					});
					
					//Add the font to the file in case it was a previous font from the settings
					if (urlParams['ext-fonts'] == '1')
					{
						graph.addExtFont(fontName, fontUrl);
					}
				});
				
				if (deletable)
				{
					var img = document.createElement('span');
					img.className = 'geSprite geSprite-delete';
					img.style.cursor = 'pointer';
					img.style.display = 'inline-block';
					tr.firstChild.nextSibling.nextSibling.appendChild(img);
					
					mxEvent.addListener(img, (mxClient.IS_POINTER) ? 'pointerup' : 'mouseup', mxUtils.bind(this, function(evt)
					{
						if (urlParams['ext-fonts'] != '1')
						{
							delete Graph.recentCustomFonts[fontName.toLowerCase()];
							
							for (var i = 0; i < this.customFonts.length; i++)
							{
								if (this.customFonts[i].name == fontName &&
									this.customFonts[i].url == fontUrl)
								{
									this.customFonts.splice(i, 1);
									editorUi.fireEvent(new mxEventObject('customFontsChanged'));
									
									break;
								}
							}
						}
						else
						{
							var extFonts = mxUtils.clone(this.editorUi.editor.graph.extFonts);
							
							if (extFonts != null && extFonts.length > 0)
							{
								for (var i = 0; i < extFonts.length; i++)
								{
									if (extFonts[i].name == fontName)
									{
										extFonts.splice(i, 1);
										break;
									}
								}
							}
							
							var customFonts = mxUtils.clone(this.customFonts);
							
							for (var i = 0; i < customFonts.length; i++)
							{
								if (customFonts[i].name == fontName)
								{
									customFonts.splice(i, 1);
									break;
								}
							}
							
							var change = new ChangeExtFonts(this.editorUi, extFonts, customFonts);
							this.editorUi.editor.graph.model.execute(change);
						}
						
						this.editorUi.hideCurrentMenu();
						mxEvent.consume(evt);
					}));
				}
				
				Graph.addFont(fontName, fontUrl);
				tr.firstChild.nextSibling.style.fontFamily = fontName;
				
				if (tooltip != null)
				{
					tr.setAttribute('title', tooltip);
				}
			});
			
			var reserved = {};

			for (var i = 0; i < this.defaultFonts.length; i++)
			{
				var value = this.defaultFonts[i];
				
				if (typeof value === 'string')
				{
					addItem(value);
				}
				else if (value.fontFamily != null && value.fontUrl != null)
				{
					reserved[encodeURIComponent(value.fontFamily) + '@' +
						encodeURIComponent(value.fontUrl)] = true;
					addItem(value.fontFamily, value.fontUrl);
				}
			}

			menu.addSeparator(parent);
			
			if (urlParams['ext-fonts'] != '1')
			{
				// Special entries in the font menu are composed of custom fonts
				// from the local storage and actual used fonts in the file
				var duplicates = {};
				var fontNames = {};
				var entries = [];
				
				function addEntry(entry)
				{
					var key = encodeURIComponent(entry.name) +
						((entry.url == null) ? '' :
						'@' + encodeURIComponent(entry.url));
						
					if (!reserved[key])
					{
						var label = entry.name;
						var counter = 0;
						
						while (fontNames[label.toLowerCase()] != null)
						{
							label = entry.name + ' (' + (++counter) + ')';
						}
						
						if (duplicates[key] == null)
						{
							entries.push({name: entry.name, url: entry.url,
								label: label, title: entry.url});
							fontNames[label.toLowerCase()] = entry;
							duplicates[key] = entry;
						}
					}
				};
				
				// Adds custom user defined fonts from local storage
				for (var i = 0; i < this.customFonts.length; i++)
				{
					addEntry(this.customFonts[i]);
				}
				
				// Adds fonts that were recently used in the editor
				for (var key in Graph.recentCustomFonts)
				{
					addEntry(Graph.recentCustomFonts[key]);
				}
				
				// Sorts by label
				entries.sort(function(a, b)
				{
					if (a.label < b.label)
					{
						return -1;
					}
					else if (a.label > b.label)
					{
						return 1;
					}
					else
					{
						return 0;
					}
				});
				
				if (entries.length > 0)
				{
					for (var i = 0; i < entries.length; i++)
					{
						addItem(entries[i].name, entries[i].url, true,
							entries[i].label, entries[i].url);
					}
	
					menu.addSeparator(parent);
				}
				
				menu.addItem(mxResources.get('reset'), null, mxUtils.bind(this, function()
				{
					Graph.recentCustomFonts = {};
					this.customFonts = [];
					editorUi.fireEvent(new mxEventObject('customFontsChanged'));
				}), parent);
				
				menu.addSeparator(parent);
			}
			else
			{
				//Load custom fonts already in the Graph
				var extFonts = this.editorUi.editor.graph.extFonts;
				
				//Merge external fonts with custom fonts
				if (extFonts != null && extFonts.length > 0)
				{
					var custMap = {}, changed = false;
					
					for (var i = 0; i < this.customFonts.length; i++)
					{
						custMap[this.customFonts[i].name] = true;
					}
					
					for (var i = 0; i < extFonts.length; i++)
					{
						if (!custMap[extFonts[i].name])
						{
							this.customFonts.push(extFonts[i]);
							changed = true;
						}
					}
					
					if (changed)
					{
						this.editorUi.fireEvent(new mxEventObject('customFontsChanged', 'customFonts', this.customFonts));
					}
				}
				
				if (this.customFonts.length > 0)
				{
					for (var i = 0; i < this.customFonts.length; i++)
					{
						var name = this.customFonts[i].name, url = this.customFonts[i].url;
						addItem(name, url, true);
						
						//Load external fonts without saving them to the file
						this.editorUi.editor.graph.addExtFont(name, url, true);
					}
					
					menu.addSeparator(parent);
					
					menu.addItem(mxResources.get('reset'), null, mxUtils.bind(this, function()
					{
						var change = new ChangeExtFonts(this.editorUi, [], []);
						editorUi.editor.graph.model.execute(change);
					}), parent);
					
					menu.addSeparator(parent);
				}
			}
			
			menu.addItem(mxResources.get('custom') + '...', null, mxUtils.bind(this, function()
			{
				var graph = this.editorUi.editor.graph;
				var curFontName = graph.getStylesheet().getDefaultVertexStyle()
					[mxConstants.STYLE_FONTFAMILY];
				var curType = 's';
				var curUrl = null;
				
				// Handles in-place editing custom fonts via font family lookup
				if (urlParams['ext-fonts'] != '1' && graph.isEditing())
				{
					var node = graph.getSelectedEditingElement();

					if (node != null)
					{
						var css = mxUtils.getCurrentStyle(node);

						if (css != null)
						{
							curFontName = Graph.stripQuotes(css.fontFamily);
							curUrl = Graph.getFontUrl(curFontName, null);
							
							if (curUrl != null)
							{
			    				if (Graph.isGoogleFontUrl(curUrl))
			    				{
			    					curUrl = null;
			    					curType = 'g';
			    				}
			    				else
			    				{
			    					curType = 'w';
			    				}
							}
						}
					}
				}
				else
				{
			    	var state = graph.getView().getState(graph.getSelectionCell());
			    	
			    	if (state != null)
			    	{
			    		curFontName = state.style[mxConstants.STYLE_FONTFAMILY] || curFontName;
			    		
			    		if (urlParams['ext-fonts'] != '1')
			    		{
			    			var temp = state.style['fontSource'];
			    			
			    			if (temp != null)
			    			{
				    			temp = decodeURIComponent(temp);
								
			    				if (Graph.isGoogleFontUrl(temp))
			    				{
			    					curType = 'g';
			    				}
			    				else
			    				{
			    					curType = 'w';
				    				curUrl = temp;
			    				}
			    			}
			    		}
			    		else
			    		{
			    			curType = state.style['FType'] || curType;
			    		
			    			if (curType == 'w')
			    			{
				    			var extFonts = this.editorUi.editor.graph.extFonts;
				    			var webFont = null;
				    			
				    			if (extFonts != null)
			    				{
				    				webFont = extFonts.find(function(ef)
		    						{
				    					return ef.name == curFontName;
		    						});
				    			}
				    			
				    			// TODO: Resource is not defined
				    			curUrl = webFont != null? webFont.url : mxResources.get('urlNotFound', null, 'URL not found');
			    			}
			    		}
			    	}
				}
		    	
    			if (curUrl != null && curUrl.substring(0, PROXY_URL.length) == PROXY_URL)
				{
    				curUrl = decodeURIComponent(curUrl.substr((PROXY_URL + '?url=').length));
				}
		    	
		    	// Saves the current selection state
		    	var selState = null;
		    	
		    	if (document.activeElement == graph.cellEditor.textarea)
				{
					selState = graph.cellEditor.saveSelection();
				}
				
				var dlg = new FontDialog(this.editorUi, curFontName, curUrl, curType, mxUtils.bind(this, function(fontName, fontUrl, type)
				{
					// Restores the selection state
					if (selState != null)
					{
						graph.cellEditor.restoreSelection(selState);
						selState = null;
					}
					
					if (fontName != null && fontName.length > 0)
					{
						if (urlParams['ext-fonts'] != '1' && graph.isEditing())
						{
							graph.setFont(fontName, fontUrl);
						}
						else
						{
							graph.getModel().beginUpdate();
							
							try
							{
								graph.stopEditing(false);
								
								if (urlParams['ext-fonts'] != '1')
								{
									graph.setCellStyles(mxConstants.STYLE_FONTFAMILY, fontName);
									graph.setCellStyles('fontSource', (fontUrl != null) ?
										encodeURIComponent(fontUrl) : null);
									graph.setCellStyles('FType', null);
								}
								else
								{
									graph.setCellStyles(mxConstants.STYLE_FONTFAMILY, fontName);
									
									if (type != 's')
									{
										graph.setCellStyles('FType', type);
										
										if (fontUrl.indexOf('http://') == 0)
										{
											fontUrl = PROXY_URL + '?url=' + encodeURIComponent(fontUrl);
										}
										
										this.editorUi.editor.graph.addExtFont(fontName, fontUrl);
									}
								}
								
								var addToCustom = true;
								
								for (var i = 0; i < this.customFonts.length; i++)
								{
									if (this.customFonts[i].name == fontName)
									{
										addToCustom = false;
										break;
									}
								}
								
								if (addToCustom)
								{
									this.customFonts.push({name: fontName, url: fontUrl});
									this.editorUi.fireEvent(new mxEventObject('customFontsChanged', 'customFonts', this.customFonts));
								}
							}
							finally
							{
								graph.getModel().endUpdate();
							}
						}
					}
				}));
				this.editorUi.showDialog(dlg.container, 380, Editor.enableWebFonts ? 250 : 180, true, true);
				dlg.init();
			}), parent, null, true);
		})));
	};
})();