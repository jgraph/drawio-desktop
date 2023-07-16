/**
 * A Draw.io diagram viewer component with configurable toolbar buttons for editing, deleting and zooming buttons.
 * Parameters :
 * diagramName - name of the diagram
 * attachmentId - ID of the diagram attachment
 * ceoId - page ID or issue key
 * readerOpts - JSON object with options :
 * 		loadUrl - url from which to load the diagram
 * 		editUrl - url of the editor
 * 		stylePath - url from which to load the css
 * 		stencilPath - url from which to load the stencils
 * 		imagePath - url from which to load the graph mages
 * 		resourcePath - path to the translations
 * 		viewerToolbar - show toolbar or not
 * 		autoSize - resizes the graph container to match the graph bounds
 * 		width - width of the container
 * 		height - height of the container
 * 		disableButtons - disables all buttons
 * 		center - should the diagram be horizontally centered or not
 * 		evaluation - evaluation mode
 * lightbox - boolean indicating if this viewer is a lightbox
 * graphDocument - optional document containing the XML data
 */
function DrawioViewer(diagramName, attachmentId, ceoId, readerOpts, lightbox, graphDocument, connect)
{
	this.id = attachmentId;
	this.diagramName = diagramName;
	this.ceoId = ceoId;
	this.options = readerOpts;
	this.lightbox = lightbox;
	this.graphDocument = graphDocument;
	this.connect = connect;
	this.paddingBottom = (connect) ? 0 : 30;

	// Overrides browser language with Confluence user language
	var lang = null;
	
	// Language is in the readOpts in Server and in the URL in Connect
	if (!connect && readerOpts.language != null)
	{
		lang = readerOpts.language
	}
	else if (connect != null && urlParams['loc'] != null)
	{
		lang = urlParams['loc'];
		var dash = lang.indexOf('-');
		
		if (dash >= 0)
		{
			lang = lang.substring(0, dash);
		}
	}
	
	// Only german and english supported currently. English is default.
	if (lang == 'de')
	{
		mxClient.language = 'de';
	}

	// Special extension used for the message bundle. For this bundle there is only a German
	// translation and the default English bundle so we temporarily override isLanguageSupported
	// to return true only if German is used and fallback to English for all other languages.
	var prevExtension = mxResources.extension;
	var prevIsLangSupported = mxResources.isLanguageSupported;
	mxResources.extension = '.txt';
	
	mxResources.isLanguageSupported = function(lan)
	{
		return lan == 'de';
	};
	
	mxResources.add(this.options.resourcePath);
	
	// Restores previous settings
	mxResources.extension = prevExtension;
	mxResources.isLanguageSupported = prevIsLangSupported;
	
	this.buttons = this.createButtons();
	
	this.transparentImage = Editor.prototype.transparentImage;
	this.extractGraphModel = Editor.prototype.extractGraphModel;
	this.setGraphXml = Editor.prototype.setGraphXml;
	this.readGraphState = Editor.prototype.readGraphState;
	this.resetGraph = Editor.prototype.resetGraph;
	this.decompress = Editor.prototype.decompress;
	this.updateGraphComponents = Editor.prototype.updateGraphComponents;
	this.fireEvent = Editor.prototype.fireEvent;
	this.addListener = Editor.prototype.addListener;
	this.originalNoForeignObject = Editor.prototype.originalNoForeignObject;
	this.gridImage = '';
	
	this.addListener('resetGraphView', this.resetGraphView);
}

DrawioViewer.prototype = new mxEventSource();

DrawioViewer.prototype.graph = null;
DrawioViewer.prototype.id = null;
DrawioViewer.prototype.toolbar = null;
DrawioViewer.prototype.options = null;
DrawioViewer.prototype.originX = 0;
DrawioViewer.prototype.originY = 0;
DrawioViewer.prototype.popupWindow = null;
DrawioViewer.prototype.buttons = {};

DrawioViewer.prototype.graphXmlString = null;

DrawioViewer.prototype.installToolbar = function()
{
	this.toolbar = document.createElement('div');
	var toolbar = this.toolbar;
	var container = this.graph.container;
	toolbar.id = 'diagramly-reader-toolbar-' + this.id;
	toolbar.className = 'diagramly-reader-toolbar';
	toolbar.style.position = 'absolute';
	
	container.parentNode.appendChild(toolbar);

	toolbar.style.height = '30px';
	toolbar.style.width = this.countVisibleButtons() * 29 + 'px';

	// Makes sure the toolbar is always visible and
	// disables toolbar for all overflow content
	container.parentNode.style.overflow = 'visible';
	
	if (this.lightbox)
	{
		toolbar.style.bottom = '4px';
		toolbar.style.left = '50%';
		toolbar.style.width = this.countVisibleButtons() * 29 + 'px';
		toolbar.style.marginLeft = -Math.round(this.countVisibleButtons() * 29 / 2) + 'px'
	}
	else
	{
		container.parentNode.style.paddingBottom = this.paddingBottom + 'px';

		var bs = this.graph.getBorderSizes();
		toolbar.style.bottom = (container.offsetTop + bs.y + 4) + 'px';
		toolbar.style.left = (container.offsetLeft + bs.x) + 'px';
	
		if (!mxClient.IS_TOUCH) 
		{
			toolbar.style.display = 'none';
			
			$(container.parentNode).hover(function() 
			{
				toolbar.style.bottom = (container.offsetTop + bs.y + 4) + 'px';
				toolbar.style.left = (container.offsetLeft + bs.x) + 'px';
				
				$(toolbar).fadeIn(100);
			},
			function() 
			{
				$(toolbar).fadeOut(100);
			});
		}
	}
}

DrawioViewer.prototype.countVisibleButtons = function() 
{
	var counter = 0;
	
	for(var key in this.buttons) 
	{
		var button = this.buttons[key];
		
		if (button.visible)
		{
			counter++;
		}
	}
	
	return counter;
}

DrawioViewer.prototype.init = function()
{
	this.loadStylesheet();
	
	// Makes the shadow brighter
	mxConstants.SHADOWCOLOR = '#000000';
	mxConstants.SHADOW_OPACITY = 0.25;
	this.graph.setEnabled(false);
	this.graph.autoScroll = false;
	this.graph.container.style.overflow = 'hidden';
	this.graph.container.style.cursor = 'move';
	
	// Panning only enabled in lightbox to allow text selection in viewer
	this.graph.setPanning(true);
	
	// Workaround for context trigger starting panning if ignoreCell is true
	this.graph.panningHandler.useLeftButtonForPanning = true;
	this.graph.panningHandler.usePopupTrigger = false;
	this.graph.panningHandler.ignoreCell = true;
	
	this.graph.panningHandler.isForcePanningEvent = function(me)
	{
		return mxEvent.isLeftMouseButton(me.getEvent());
	};

	// Folding only enabled in lightbox
	this.graph.foldingEnabled = this.lightbox;
	
	// Overrides click handler to ignore graph enabled state
	if (this.graph.foldingEnabled)
	{
		this.graph.cellRenderer.createControlClickHandler = function(state)
		{
			var graph = state.view.graph;
			
			return function (evt)
			{
				var collapse = !graph.isCellCollapsed(state.cell);
				graph.foldCells(collapse, false, [state.cell], null, evt);
				mxEvent.consume(evt);
			};
		};
	}
	else
	{
		// Hides collapse/expand icon if folding is disabled
		this.graph.getFoldingImage = function()
		{
			return null;
		};
	};

	// HTML entities are displayed as plain text in wrapped plain text labels
	this.graph.cellRenderer.getLabelValue = function(state)
	{
		var result = mxCellRenderer.prototype.getLabelValue.apply(this, arguments);
		
		if (state.view.graph.isHtmlLabel(state.cell))
		{
			if (state.style['html'] != 1)
			{
				result = mxUtils.htmlEntities(result, false);
			}
			else
			{
				result = Graph.sanitizeHtml(result);
			}
		}
		
		return result;
	};

	// Enables links if graph is "disabled" (ie. read-only)
	this.graph.click = function(me)
	{
		var cell = me.getCell();
		
		if (cell != null && !me.isConsumed() && (mxEvent.isTouchEvent(me.getEvent()) ||
			mxEvent.isLeftMouseButton(me.getEvent())))
		{
			var href = this.getLinkForCell(cell);
			
			// Test cases:
			// 1) the relative link without the Conf base path, with a leading slash, e.g. /download/attachment/....
			// 2) the relative link with the Conf base path, with a leading slash, e.g. /confluence/download/attachmentss/...
			// 3) the relative link without the conf base path, without a leading slash, e.g. download/attachments/...
			// 4) the full absolute path, e.g. https://localhost:1990/confluence/download/attachments/...
			// 5) full path without protocol, e.g. //confluence/download/attachments/...

			if (href != null)
			{
				var r = new RegExp('^(?:[a-z]+:)?//', 'i'); // https://stackoverflow.com/questions/10687099/how-to-test-if-a-url-string-is-absolute-or-relative
				
				if (!r.test(href))
				{
					// relative link

					if (href.lastIndexOf('/', 0) !== 0) // http://stackoverflow.com/a/4579228/226469 seems to be the fastest check
					{
						// Need a leading slash in case we need to prepend the base path
						href = '/' + href;
					}

					// var cp = AJS.Confluence.getContextPath(); // TODO confluence call in a common module
					
					// Originally, links included the base path (but not the host), so there might be cases of the base path
					// already being prepended. If the base path has changed, we can't recover those cases
					// window.location.href = href.substring(0, cp.length) === cp ? href : cp + href; // prepends the context path if it's not already there
					window.location.href = href;
				}
				else
				{
					// Test if it's an absolute URL, but on the same domain (i.e. open in same window)
					// There's a security setting (unknown which) that seems to stop the IE hack below working in
					// IE 11, https://desk.draw.io/browse/DS-175, https://desk.draw.io/browse/DFCS-52
					// Worst case is these users will open an absolute same domain link in a window

					var link = document.createElement('a');
					link.href = href;
					link.href = link.href; // hack to populate 'host' under IE
				
					if (link.host === location.host)
					{
						window.location.href = href;
					}
					else
					{
						window.open(href);
					}
				}
			}
			
			me.consume();
		}
	};

	this.graph.setTooltips(!mxClient.IS_TOUCH);

	if (this.options.width != null) 
	{
		this.graph.container.style.width = this.options.width + 'px';
	}
	
	if (this.options.height != null) 
	{
		this.graph.container.style.height = this.options.height + 'px';
	}

	// Accumulates the zoom factor while the rendering is taking place
	// so that not the complete sequence of zoom steps must be painted
	var graph = this.graph;
	graph.updateZoomTimeout = null;
	graph.cumulativeZoomFactor = 1;
	
	graph.lazyZoom = function(zoomIn)
	{
		if (this.updateZoomTimeout != null)
		{
			window.clearTimeout(this.updateZoomTimeout);
		}

		if (zoomIn)
		{
			this.cumulativeZoomFactor *= this.zoomFactor;
		}
		else
		{
			this.cumulativeZoomFactor /= this.zoomFactor;
		}
		
		this.cumulativeZoomFactor = Math.round(this.view.scale * this.cumulativeZoomFactor * 100) / 100 / this.view.scale;
		
		this.updateZoomTimeout = window.setTimeout(mxUtils.bind(this, function()
		{
			this.zoom(this.cumulativeZoomFactor);					
			this.cumulativeZoomFactor = 1;
			this.updateZoomTimeout = null;
		}), 20);
	};
	
	if (this.lightbox)
	{
		mxEvent.addMouseWheelListener(mxUtils.bind(this, function(evt, up)
		{
			if (!mxClient.IS_MAC || !mxEvent.isControlDown(evt))
			{
				var source = mxEvent.getSource(evt);
				
				while (source != null)
				{
					if (source == graph.container)
					{
						graph.lazyZoom(up);
						mxEvent.consume(evt);
						
						return;
					}
					
					source = source.parentNode;
				}
			}
		}));
	}
};

DrawioViewer.prototype.resetGraphView = function()
{
	this.graph.pageBreaksVisible = false;
	this.graph.preferPageSize = false;
	this.graph.pageVisible = false;
	
	if (!this.lightbox)
	{
		var update = mxUtils.bind(this, function()
		{
			this.graph.centerZoom = this.graph.panningHandler.panningEnabled;
			
			// If width and height are specified the height is overridden to match the diagram size
			var autoSizeWidth = this.options.width == null;
			var autoSizeHeight = this.options.height == null;
			var bounds = this.graph.getGraphBounds();
			var ratio = bounds.width / bounds.height;
			
			var width = autoSizeWidth ? bounds.width + 2 : this.options.width;
			var height = autoSizeHeight ? (width / ratio) + 1 : this.options.height;
	
			this.graph.container.style.width = Math.ceil(width) + 'px';
			this.graph.container.style.height = Math.ceil(height) + 'px';
			this.graph.container.style.maxWidth = '100%';
			
			if (autoSizeWidth && autoSizeHeight)
			{
				this.translateOrigin();
				
				// Used for fast restore of initial position in zoom to fit button
				this.initialX = this.graph.view.translate.x;
				this.initialY = this.graph.view.translate.y;
			}
			else if (this.options.zoomToFit)
			{
				this.graph.fit();
			}
	
			//set the border after calling updateGraphComponnets() because the call sets it to ''
			this.graph.container.style.border = this.options.border ? '1px solid #DDDDDD' : 'none';
			this.graph.container.style.backgroundColor = (this.graph.background == null ||
					this.graph.background == 'none') ? '#ffffff' : this.graph.background;
		});
		
		// Workaround for invisible container is to move the container to the document body for rendering
		if (!this.connect && (this.graph.container.clientWidth == 0 || this.graph.container.clientHeight == 0))
		{
			var previousParent = this.graph.container.parentNode;
			var nextSibling = this.graph.container.nextSibling;
			var prevPosition = this.graph.container.style.position;
			var prevVisible = this.graph.container.style.visible;
			
			// Moves to document body for rendering (needed for text measuring)
			this.graph.container.style.position = 'absolute';
			this.graph.container.style.visible = 'hidden';
			
			document.body.appendChild(this.graph.container);
			
			// Refresh required in visible DOM to update text bounding boxes
			this.graph.refresh();
			update();
			
			// Move it back into DOM tree position
			if (nextSibling != null)
			{
				nextSibling.parentNode.insertBefore(this.graph.container, nextSibling);
			}
			else
			{
				previousParent.appendChild(this.graph.container);
			}
			
			// Restore position CSS
			this.graph.container.style.visible = prevVisible;
			this.graph.container.style.position = prevPosition;
		}
		else
		{
			update();
		}
	}
	else
	{
		this.graph.container.style.backgroundColor = (this.graph.background == null ||
			this.graph.background == 'none') ? '#ffffff' : this.graph.background;
	}
};

DrawioViewer.prototype.translateOrigin = function()
{
	var bounds = this.graph.getGraphBounds();
	this.graph.view.setTranslate(this.originX - Math.floor(bounds.x), this.originY - Math.floor(bounds.y));
};

DrawioViewer.prototype.loadGraph = function(diagramName, ceoId)
{
	var spinner = this.createSpinner(this.graph.container);

	try
	{
		mxUtils.get(this.options.loadUrl, mxUtils.bind(this, function(req)
		{
			spinner.stop();
			
			if (req.getStatus() < 200 || req.getStatus() > 299)
			{
				this.showWarning(mxResources.get('error') + ' ' + req.getStatus());
				this.graph.container.style.border = this.options.border ? '1px solid #DDDDDD' : 'none';
				this.graph.container.style.backgroundColor = '#ffffff';
				this.graph.container.style.height = '20px';
			}
			else
			{
				var json = JSON.parse(req.getText());
				this.graphXmlString = json.xml;
				var doc = mxUtils.parseXml(json.xml);
				this.xmlDoc = doc;
				this.filename = json.filename;
				this.setGraphXml(doc.documentElement);
				this.graphDocument = doc;
			}
		}),
		function()
		{
			spinner.stop();
		});
	}
	catch (e)
	{
		spinner.stop();
	}
};

DrawioViewer.prototype.loadStylesheet = function()
{
	var node = mxUtils.load(this.options.stylePath + '/default.xml').getDocumentElement();
	var dec = new mxCodec(node.ownerDocument);
	dec.decode(node, this.graph.getStylesheet());
};

DrawioViewer.prototype.renderButtons = function()
{
	for (var key in this.buttons) 
	{
		var button = this.buttons[key];
		
		if (button.visible) 
		{
			this.addToolbarButton(this.toolbar, button);
		}
	}
};

DrawioViewer.prototype.addToolbarButton = function(toolbar, drawioButton)
{
	var enabled = typeof drawioButton.enabled === 'undefined' ? true : enabled;
	var button = drawioButton.linkButton ? document.createElement('a') : document.createElement('div');
	button.className = 'diagramly-reader-toolbar-button';

	if (drawioButton.icon != null)
	{
		var img = document.createElement('img');
		img.setAttribute('src', drawioButton.icon);
		img.style.verticalAlign = 'middle';
		img.style.marginRight = '2px';
		button.appendChild(img);
		button.title = drawioButton.label;
	}

	if (!drawioButton.enabled)
	{
		button.style.opacity = 0.2;

	} else
	{
		if(drawioButton.linkButton) 
		{
			button.href = drawioButton.url;
		}
		else 
		{
			mxEvent.addListener(button, 'click', function(evt)
			{
				drawioButton.clickHandler.apply(this, arguments);
			});
		}
		mxEvent.addListener(button, 'mouseover', function(evt)
		{
			button.className += ' diagramly-reader-toolbar-button-hover';
		});
		mxEvent.addListener(button, 'mouseout', function(evt)
		{
			button.className = 'diagramly-reader-toolbar-button';
		});
	}

	toolbar.appendChild(button);
	return button;
};

DrawioViewer.prototype.createSpinner = function(container)
{
	var opts =
	{
		lines : 12, // The number of lines to draw
		length : 12, // The length of each line
		width : 5, // The line thickness
		radius : 10, // The radius of the inner circle
		rotate : 0, // The rotation offset
		color : '#000', // #rgb or #rrggbb
		speed : 1, // Rounds per second
		trail : 60, // Afterglow percentage
		shadow : false, // Whether to render a shadow
		hwaccel : false, // Whether to use hardware acceleration
		className : 'spinner', // The CSS class to assign to the spinner
		zIndex : 2e9 // The z-index (defaults to 2000000000)
	};

	return new Spinner(opts).spin(container);
};

DrawioViewer.prototype.show = function(container) 
{
	this.graph = new Graph(container);
	this.graph.id = this.id;
	this.init();

	// Uses the XML document that was loaded for the viewer in the lightbox
	if (this.graphDocument != null)
	{
		this.setGraphXml(this.graphDocument.documentElement);
	}
	else
	{
		this.loadGraph(this.diagramName, this.ceoId);
	}
	
	if (this.options.viewerToolbar) 
	{
		this.installToolbar();
		this.renderButtons();
	}
	
	if (this.options.licenseStatus == 'NO_LICENSE') 
	{
		this.showWarning(mxResources.get('drawio.reader.noLicense'));
	} 
	else if (this.options.licenseStatus == 'EVAL_LICENSE') 
	{
		this.showWarning(mxResources.get('drawio.reader.evaluation'));
	} 
	else if (this.options.licenseStatus == 'EVAL_EXPIRED') 
	{
		this.showWarning(mxResources.get('drawio.reader.evaluationExpired'));
	} 
	else if (this.options.licenseStatus == 'VERSION_MISMATCH') 
	{
		this.showWarning(mxResources.get('drawio.reader.versionMismatch', ['https://support.draw.io/pages/viewpage.action?pageId=11829320']));
	}
	else if (this.options.licenseStatus == 'USER_MISMATCH') 
	{
		this.showWarning(mxResources.get('drawio.reader.userMismatch', ['https://support.draw.io/pages/viewpage.action?pageId=11829323']));
	}
	
	
};

DrawioViewer.prototype.showWarning = function(msg) 
{
	var div = document.createElement('div');
	div.style.position = 'absolute';
	div.style.overflow = 'hidden';
	div.style.left = '0px';
	div.style.top = '0px';
	div.style.right = '0px';
	div.style.fontSize = '12px';
	div.style.margin = '2px';
	mxUtils.setOpacity(div, 50);
	div.style.color = 'gray';
	div.style.textAlign = 'center';
	div.style.whiteSpace = 'nowrap';
	span = document.createElement('span');
	span.innerHTML = msg;
	
	div.appendChild(span);
	
	this.graph.container.parentNode.appendChild(div);
};

DrawioViewer.prototype.showLightbox = function() 
{
	console.log('Lightbox feature not implemented.');
};

DrawioViewer.prototype.createButtons = function() 
{
	var viewer = this;
	var buttons = {}; 
	
	var enableButton = typeof this.options.disableButtons === 'undefined' ? true : !this.options.disableButtons;
	var canEdit = this.options.userCanEdit && enableButton;
	var canRemove = this.options.userCanRemove && enableButton;

	var autoSizeWidth = this.options.width == null;
	var autoSizeHeight = this.options.height == null;
	
	buttons[DrawioViewerActions.EDIT] = new DrawioViewerButton(
	{
		label : mxResources.get('diagramly.reader.edit'),
		icon : viewer.options.imagePath + '/edit.png', 
		url : viewer.options.editUrl,
		enabled : canEdit,
		linkButton : true
	});
	
	buttons[DrawioViewerActions.REMOVE] = new DrawioViewerButton(
	{
		label : mxResources.get('diagramly.reader.remove'),
		icon : viewer.options.imagePath + '/remove.png', 
		clickHandler : function()
		{
			if (confirm(mxResources.get('diagramly.reader.confirmDelete')))
			{
				window.location.href = viewer.options.removeUrl;
			}
		},
		enabled : canRemove
	});
	
	buttons[DrawioViewerActions.ACTUAL_SIZE] = new DrawioViewerButton(
	{
		label : mxResources.get('diagramly.reader.zoomActual'),
		icon : viewer.options.imagePath + '/zoomActual.png', 
		clickHandler : function()
		{
			viewer.graph.zoomActual();
			viewer.translateOrigin();
		},
		enabled : enableButton
	});
	
	buttons[DrawioViewerActions.ZOOM_TO_FIT] = new DrawioViewerButton(
	{
		label : (this.lightbox) ? mxResources.get('diagramly.reader.zoomActual') : mxResources.get('diagramly.reader.fit'),
		icon : (this.lightbox) ? viewer.options.imagePath + '/zoomActual.png' : viewer.options.imagePath + '/zoomFit.gif', 
		clickHandler : mxUtils.bind(this, function()
		{
			if (this.lightbox)
			{
				// NOTE: Maxscale is 1 here so only make smaller but not larger
				viewer.graph.fit(8);
				viewer.graph.center(true, true, null, 0.42);
			}
			else
			{
				if (autoSizeWidth && autoSizeHeight)
				{
					this.graph.view.scaleAndTranslate(1, this.initialX, this.initialY);
				}
				else
				{
					this.graph.fit();
				}
			}
		}),
		enabled : enableButton
	});
	
	buttons[DrawioViewerActions.ZOOM_OUT] = new DrawioViewerButton(
	{
		label : mxResources.get('diagramly.reader.zoomOut'),
		icon : viewer.options.imagePath + '/zoomOut.gif', 
		clickHandler : function()
		{
			viewer.graph.zoomOut();
		},
		enabled : enableButton
	});
	
	buttons[DrawioViewerActions.ZOOM_IN] = new DrawioViewerButton(
	{
		label : mxResources.get('diagramly.reader.zoomIn'),
		icon : viewer.options.imagePath + '/zoomIn.gif', 
		clickHandler : function()
		{
			viewer.graph.zoomIn();
		},
		enabled : enableButton
	});
	
	buttons[DrawioViewerActions.EXPAND] = new DrawioViewerButton(
	{
		label : mxResources.get('diagramly.reader.fullScreen'),
		icon : viewer.options.imagePath + '/largeView.png', 
		clickHandler : mxUtils.bind(this, function()
		{
			this.showLightbox();
		}),
		enabled : enableButton
	});
	
	buttons[DrawioViewerActions.CLOSE] = new DrawioViewerButton(
	{
		label : mxResources.get('diagramly.reader.closeFullScreen'),
		icon : viewer.options.imagePath + '/closeLargeView.gif', 
		clickHandler : function()
		{
			viewer.popupWindow.remove();
		},
		enabled : enableButton,
		visible : false
	});
	
	return buttons;
};

DrawioViewerActions = 
{
	EDIT : 'edit',
	REMOVE : 'remove',
	ACTUAL_SIZE : 'actualSize',
	ZOOM_TO_FIT : 'zoomToFit',
	ZOOM_OUT : 'zoomOut',
	ZOOM_IN : 'zoomIn',
	EXPAND : 'expand',
	CLOSE : 'close'
};

function DrawioViewerButton(options) 
{
	this.label = options.label;
	this.clickHandler = options.clickHandler;
	this.enabled = typeof options.enabled != 'undefined' ? options.enabled : true;
	this.icon = options.icon;
	this.visible = typeof options.visible != 'undefined' ? options.visible : true;
	this.linkButton = typeof options.linkButton != 'undefined' ? options.linkButton : false;
	this.url = options.url;
};

DrawioViewerButton.prototype.label = null;
DrawioViewerButton.prototype.clickHandler = null;
DrawioViewerButton.prototype.enabled = true;
DrawioViewerButton.prototype.icon = null;
DrawioViewerButton.prototype.visible = true;
DrawioViewerButton.prototype.linkButton = false;
DrawioViewerButton.prototype.url = null;