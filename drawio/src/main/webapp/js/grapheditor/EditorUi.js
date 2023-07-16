/**
 * Copyright (c) 2006-2012, JGraph Ltd
 */
/**
 * Constructs a new graph editor
 */
EditorUi = function(editor, container, lightbox)
{
	mxEventSource.call(this);
	
	this.destroyFunctions = [];
	this.editor = editor || new Editor();
	this.container = container || document.body;
	
	var ui = this;
	var graph = this.editor.graph;
	graph.lightbox = lightbox;

	// Overrides graph bounds to include background images
	var graphGetGraphBounds = graph.getGraphBounds;

	graph.getGraphBounds = function()
	{
		var bounds = graphGetGraphBounds.apply(this, arguments);
		var img = this.backgroundImage;
		
		if (img != null && img.width != null && img.height != null)
		{
			var t = this.view.translate;
			var s = this.view.scale;

			bounds = mxRectangle.fromRectangle(bounds);
			bounds.add(new mxRectangle(
				(t.x + img.x) * s, (t.y + img.y) * s,
				img.width * s, img.height * s));
		}

		return bounds;
	};

	// Faster scrollwheel zoom is possible with CSS transforms
	if (graph.useCssTransforms)
	{
		this.lazyZoomDelay = 0;
	}
	
	// Pre-fetches submenu image or replaces with embedded image if supported
	if (mxClient.IS_SVG)
	{
		mxPopupMenu.prototype.submenuImage = 'data:image/gif;base64,R0lGODlhCQAJAIAAAP///zMzMyH5BAEAAAAALAAAAAAJAAkAAAIPhI8WebHsHopSOVgb26AAADs=';
	}
	else
	{
		new Image().src = mxPopupMenu.prototype.submenuImage;
	}

	// Pre-fetches connect image
	if (!mxClient.IS_SVG && mxConnectionHandler.prototype.connectImage != null)
	{
		new Image().src = mxConnectionHandler.prototype.connectImage.src;
	}

	// Installs selection state listener
	this.selectionStateListener = mxUtils.bind(this, function(sender, evt)
	{
		this.clearSelectionState();
	});
	
	graph.getSelectionModel().addListener(mxEvent.CHANGE, this.selectionStateListener);
	graph.getModel().addListener(mxEvent.CHANGE, this.selectionStateListener);
	graph.addListener(mxEvent.EDITING_STARTED, this.selectionStateListener);
	graph.addListener(mxEvent.EDITING_STOPPED, this.selectionStateListener);
	graph.getView().addListener('unitChanged', this.selectionStateListener);

	// Disables graph and forced panning in chromeless mode
	if (this.editor.chromeless && !this.editor.editable)
	{
		this.footerHeight = 0;
		graph.isEnabled = function() { return false; };
		graph.panningHandler.isForcePanningEvent = function(me)
		{
			return !mxEvent.isPopupTrigger(me.getEvent());
		};
	}
	
    // Creates the user interface
	this.actions = new Actions(this);
	this.menus = this.createMenus();
	
	if (!graph.standalone)
	{
		// Stores the current style and assigns it to new cells
		var styles = ['rounded', 'shadow', 'glass', 'dashed', 'dashPattern', 'labelBackgroundColor',
			'labelBorderColor', 'comic', 'sketch', 'fillWeight', 'hachureGap', 'hachureAngle', 'jiggle',
			'disableMultiStroke', 'disableMultiStrokeFill', 'fillStyle', 'curveFitting',
			'simplification', 'sketchStyle', 'pointerEvents', 'strokeColor', 'strokeWidth'];
		var connectStyles = ['shape', 'edgeStyle', 'curved', 'rounded', 'elbow', 'jumpStyle', 'jumpSize',
			'comic', 'sketch', 'fillWeight', 'hachureGap', 'hachureAngle', 'jiggle',
			'disableMultiStroke', 'disableMultiStrokeFill', 'fillStyle', 'curveFitting',
			'simplification', 'sketchStyle'];
		// Styles to be ignored if applyAll is false
		var ignoredEdgeStyles = ['curved', 'sourcePerimeterSpacing', 'targetPerimeterSpacing',
			'startArrow', 'startFill', 'startSize', 'endArrow', 'endFill', 'endSize'];
		var vertexStyleIgnored = false;
		var edgeStyleIgnored = false;
		
		// Note: Everything that is not in styles is ignored (styles is augmented below)
		this.setDefaultStyle = function(cell)
		{
			try
			{
				if (graph.getModel().isEdge(cell))
				{
					edgeStyleIgnored = false;
				}
				else
				{
					vertexStyleIgnored = false;
				}

				var style = graph.getCellStyle(cell, false);
				var values = [];
				var keys = [];

				for (var key in style)
				{
					values.push(style[key]);
					keys.push(key);
				}

				// Resets current style
				if (graph.getModel().isEdge(cell))
				{
					graph.currentEdgeStyle = {};
				}
				else
				{
					graph.currentVertexStyle = {}
				}
	
				this.fireEvent(new mxEventObject('styleChanged',
					'keys', keys, 'values', values,
					'cells', [cell], 'force', true));
				
				// Blocks update of default style with style changes
				// once the it was set using this function
				if (graph.getModel().isEdge(cell))
				{
					edgeStyleIgnored = true;
				}
				else
				{
					vertexStyleIgnored = true;
				}
			}
			catch (e)
			{
				this.handleError(e);
			}
		};

		this.clearDefaultStyle = function()
		{
			graph.currentEdgeStyle = mxUtils.clone(graph.defaultEdgeStyle);
			graph.currentVertexStyle = mxUtils.clone(graph.defaultVertexStyle);
			edgeStyleIgnored = false;
			vertexStyleIgnored = false;
			
			// Updates UI
			this.fireEvent(new mxEventObject('styleChanged', 'keys', [], 'values', [], 'cells', []));
		};
	
		// Keys that should be ignored if the cell has a value (known: new default for all cells is html=1 so
	    // for the html key this effecticely only works for edges inserted via the connection handler)
		var valueStyles = ['fontFamily', 'fontSource', 'fontSize', 'fontColor'];
				
		for (var i = 0; i < valueStyles.length; i++)
		{
			if (mxUtils.indexOf(styles, valueStyles[i]) < 0)
			{
				styles.push(valueStyles[i]);
			}
		}
		
		// Keys that always update the current edge style regardless of selection
		var alwaysEdgeStyles = ['edgeStyle', 'startArrow', 'startFill', 'startSize', 'endArrow',
			'endFill', 'endSize'];
		
		// Keys that are ignored together (if one appears all are ignored)
		var keyGroups = [['startArrow', 'startFill', 'endArrow', 'endFill'],
						['startSize', 'endSize'],
						['sourcePerimeterSpacing', 'targetPerimeterSpacing'],
						['fillColor', 'gradientColor', 'gradientDirection'],
						['opacity'],
						['html']];
		
		// Adds all keys used above to the styles array
		for (var i = 0; i < keyGroups.length; i++)
		{
			for (var j = 0; j < keyGroups[i].length; j++)
			{
				styles.push(keyGroups[i][j]);
			}
		}
		
		for (var i = 0; i < connectStyles.length; i++)
		{
			if (mxUtils.indexOf(styles, connectStyles[i]) < 0)
			{
				styles.push(connectStyles[i]);
			}
		}
		
		// Implements a global current style for edges and vertices that is applied to new cells
		var insertHandler = function(cells, asText, model, vertexStyle, edgeStyle, applyAll, recurse)
		{
			vertexStyle = (vertexStyle != null) ? vertexStyle : graph.currentVertexStyle;
			edgeStyle = (edgeStyle != null) ? edgeStyle : graph.currentEdgeStyle;
			applyAll = (applyAll != null) ? applyAll : true;
			
			model = (model != null) ? model : graph.getModel();
			
			if (recurse)
			{
				var temp = [];
				
				for (var i = 0; i < cells.length; i++)
				{
					temp = temp.concat(model.getDescendants(cells[i]));
				}
				
				cells = temp;				
			}
			
			model.beginUpdate();
			try
			{
				for (var i = 0; i < cells.length; i++)
				{
					var cell = cells[i];
					var isText = asText;
					var appliedStyles;

					// Applies basic text styles for cells with text class
					if (cell.style != null && !isText)
					{
						pairs = cell.style.split(';');
						isText = isText || mxUtils.indexOf(pairs, 'text') >= 0;
					}
					
					if (isText)
					{
						// Applies only basic text styles
						appliedStyles = ['fontSize', 'fontFamily', 'fontColor'];
					}
					else
					{
						// Removes styles defined in the cell style from the styles to be applied
						var cellStyle = model.getStyle(cell);
						var tokens = (cellStyle != null) ? cellStyle.split(';') : [];
						appliedStyles = styles.slice();
						
						for (var j = 0; j < tokens.length; j++)
						{
							var tmp = tokens[j];
					 		var pos = tmp.indexOf('=');
					 					 		
					 		if (pos >= 0)
					 		{
					 			var key = tmp.substring(0, pos);
					 			var index = mxUtils.indexOf(appliedStyles, key);
					 			
					 			if (index >= 0)
					 			{
					 				appliedStyles.splice(index, 1);
					 			}
					 			
					 			// Handles special cases where one defined style ignores other styles
					 			for (var k = 0; k < keyGroups.length; k++)
					 			{
					 				var group = keyGroups[k];
					 				
					 				if (mxUtils.indexOf(group, key) >= 0)
					 				{
					 					for (var l = 0; l < group.length; l++)
					 					{
								 			var index2 = mxUtils.indexOf(appliedStyles, group[l]);
								 			
								 			if (index2 >= 0)
								 			{
								 				appliedStyles.splice(index2, 1);
								 			}
					 					}
					 				}
					 			}
					 		}
						}
					}
					
					// Applies the current style to the cell
					var edge = model.isEdge(cell);
					var current = (edge) ? edgeStyle : vertexStyle;
					var newStyle = model.getStyle(cell);

					for (var j = 0; j < appliedStyles.length; j++)
					{
						var key = appliedStyles[j];
						var styleValue = current[key];
	
						if (styleValue != null && key != 'edgeStyle' && (key != 'shape' || edge))
						{
							// Special case: Connect styles are not applied here but in the connection handler
							if (!edge || applyAll || mxUtils.indexOf(ignoredEdgeStyles, key) < 0)
							{
								newStyle = mxUtils.setStyle(newStyle, key, styleValue);
							}
						}
					}

					if (Editor.simpleLabels)
					{
						newStyle = mxUtils.setStyle(mxUtils.setStyle(
							newStyle, 'html', null), 'whiteSpace', null);
					}
					
					model.setStyle(cell, newStyle);
				}
			}
			finally
			{
				model.endUpdate();
			}

			return cells;
		};
	
		graph.addListener('cellsInserted', function(sender, evt)
		{
			insertHandler(evt.getProperty('cells'), null, null, null, null, true, true);
		});
		
		graph.addListener('textInserted', function(sender, evt)
		{
			insertHandler(evt.getProperty('cells'), true);
		});
		
		this.insertHandler = insertHandler;
		
		this.createDivs();
		this.createUi();
		this.refresh();

		// Disables HTML and text selection
		var textEditing =  mxUtils.bind(this, function(evt)
		{
			if (evt == null)
			{
				evt = window.event;
			}
			
			return graph.isEditing() || (evt != null && this.isSelectionAllowed(evt));
		});
	
		// Disables text selection while not editing and no dialog visible
		if (this.container == document.body)
		{
			this.menubarContainer.onselectstart = textEditing;
			this.menubarContainer.onmousedown = textEditing;
			this.toolbarContainer.onselectstart = textEditing;
			this.toolbarContainer.onmousedown = textEditing;
			this.diagramContainer.onselectstart = textEditing;
			this.diagramContainer.onmousedown = textEditing;
			this.sidebarContainer.onselectstart = textEditing;
			this.sidebarContainer.onmousedown = textEditing;
			this.formatContainer.onselectstart = textEditing;
			this.formatContainer.onmousedown = textEditing;
			this.footerContainer.onselectstart = textEditing;
			this.footerContainer.onmousedown = textEditing;
			
			if (this.tabContainer != null)
			{
				// Mouse down is needed for drag and drop
				this.tabContainer.onselectstart = textEditing;
			}

			// Workaround for rubberband selection on iPadOS 16
			// Avoid on previous versions to allow label editing
			if (mxClient.IS_IOS)
			{
				function iOSversion()
				{
					if (/iP(hone|od|ad)/.test(navigator.platform)) {
						// supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
						var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
						
						return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
					}
				}
				
				var ver = iOSversion();

				if (ver != null && ver[0] >= 16)
				{
					mxUtils.setPrefixedStyle(this.menubarContainer.style, 'userSelect', 'none');
					mxUtils.setPrefixedStyle(this.diagramContainer.style, 'userSelect', 'none');
					mxUtils.setPrefixedStyle(this.sidebarContainer.style, 'userSelect', 'none');
					mxUtils.setPrefixedStyle(this.formatContainer.style, 'userSelect', 'none');
					mxUtils.setPrefixedStyle(this.footerContainer.style, 'userSelect', 'none');

					if (this.tabContainer != null)
					{
						mxUtils.setPrefixedStyle(this.tabContainer.style, 'userSelect', 'none');
					}
				}
			}
		}
		
		// And uses built-in context menu while editing
		if (!this.editor.chromeless || this.editor.editable)
		{
			// Allows context menu for links in hints
			var linkHandler = function(evt)
			{
				if (evt != null)
				{
					var source = mxEvent.getSource(evt);
					
					if (source.nodeName == 'A')
					{
						while (source != null)
						{
							if (source.className == 'geHint')
							{
								return true;
							}
							
							source = source.parentNode;
						}
					}
				}
				
				return textEditing(evt);
			};
			
			if (mxClient.IS_IE && (typeof(document.documentMode) === 'undefined' || document.documentMode < 9))
			{
				mxEvent.addListener(this.diagramContainer, 'contextmenu', linkHandler);
			}
			else
			{
				// Allows browser context menu outside of diagram and sidebar
				this.diagramContainer.oncontextmenu = linkHandler;
			}
		}
		else
		{
			graph.panningHandler.usePopupTrigger = false;
		}
	
		// Contains the main graph instance inside the given panel
		graph.init(this.diagramContainer);
	
	    // Improves line wrapping for in-place editor
	    if (mxClient.IS_SVG && graph.view.getDrawPane() != null)
	    {
	        var root = graph.view.getDrawPane().ownerSVGElement;
	        
	        if (root != null)
	        {
	            root.style.position = 'absolute';
	        }
	    }
	    
		// Creates hover icons
		this.hoverIcons = this.createHoverIcons();
		
		// Hides hover icons when cells are moved
		if (graph.graphHandler != null)
		{
			var graphHandlerStart = graph.graphHandler.start;
			
			graph.graphHandler.start = function()
			{
				if (ui.hoverIcons != null)
				{
					ui.hoverIcons.reset();
				}
				
				graphHandlerStart.apply(this, arguments);
			};
		}
		
		// Adds tooltip when mouse is over scrollbars to show space-drag panning option
		mxEvent.addListener(this.diagramContainer, 'mousemove', mxUtils.bind(this, function(evt)
		{
			var off = mxUtils.getOffset(this.diagramContainer);
			
			if (mxEvent.getClientX(evt) - off.x - this.diagramContainer.clientWidth > 0 ||
				mxEvent.getClientY(evt) - off.y - this.diagramContainer.clientHeight > 0)
			{
				this.diagramContainer.setAttribute('title', mxResources.get('panTooltip'));
			}
			else
			{
				this.diagramContainer.removeAttribute('title');
			}
		}));
		
		// Overrides hovericons to disable while space key is pressed
		var hoverIconsIsResetEvent = this.hoverIcons.isResetEvent;
		
		this.hoverIcons.isResetEvent = function(evt, allowShift)
		{
			return ui.isSpaceDown() || hoverIconsIsResetEvent.apply(this, arguments);
		};
		
		this.keydownHandler = mxUtils.bind(this, function(evt)
		{
			if (evt.which == 16 /* Shift */)
			{
				this.shiftDown = true;
			}
			else if (evt.which == 32 /* Space */ && !graph.isEditing())
			{
				this.spaceDown = true;
				this.hoverIcons.reset();
				graph.container.style.cursor = 'move';
				
				// Disables scroll after space keystroke with scrollbars
				if (!graph.isEditing() && mxEvent.getSource(evt) == graph.container)
				{
					mxEvent.consume(evt);
				}
			}
			else if (!mxEvent.isConsumed(evt) && evt.keyCode == 27 /* Escape */)
			{
				this.hideDialog(null, true);
			}
		});
	   	
		mxEvent.addListener(document, 'keydown', this.keydownHandler);
		
		this.keyupHandler = mxUtils.bind(this, function(evt)
		{
			graph.container.style.cursor = '';
			this.spaceDown = false;
			this.shiftDown = false;
		});
	
		mxEvent.addListener(document, 'keyup', this.keyupHandler);
	    
	    // Forces panning for middle and right mouse buttons
		var panningHandlerIsForcePanningEvent = graph.panningHandler.isForcePanningEvent;
		graph.panningHandler.isForcePanningEvent = function(me)
		{
			// Ctrl+left button is reported as right button in FF on Mac
			return panningHandlerIsForcePanningEvent.apply(this, arguments) ||
				ui.isSpaceDown() || (mxEvent.isMouseEvent(me.getEvent()) &&
				(this.usePopupTrigger || !mxEvent.isPopupTrigger(me.getEvent())) &&
				((!mxEvent.isControlDown(me.getEvent()) &&
				mxEvent.isRightMouseButton(me.getEvent())) ||
				mxEvent.isMiddleMouseButton(me.getEvent())));
		};
	
		// Ctrl/Cmd+Enter applies editing value except in Safari where Ctrl+Enter creates
		// a new line (while Enter creates a new paragraph and Shift+Enter stops)
		var cellEditorIsStopEditingEvent = graph.cellEditor.isStopEditingEvent;
		graph.cellEditor.isStopEditingEvent = function(evt)
		{
			return cellEditorIsStopEditingEvent.apply(this, arguments) ||
				(evt.keyCode == 13 && ((!mxClient.IS_SF && mxEvent.isControlDown(evt)) ||
				(mxClient.IS_MAC && mxEvent.isMetaDown(evt)) ||
				(mxClient.IS_SF && mxEvent.isShiftDown(evt))));
		};
				
		// Adds space+wheel for zoom
		var graphIsZoomWheelEvent = graph.isZoomWheelEvent;
		
		graph.isZoomWheelEvent = function()
		{
			return ui.isSpaceDown() || graphIsZoomWheelEvent.apply(this, arguments);
		};
		
		// Switches toolbar for text editing
		var textMode = false;
		var fontMenu = null;
		var sizeMenu = null;
		var nodes = null;
		
		var updateToolbar = mxUtils.bind(this, function()
		{
			if (this.toolbar != null && textMode != graph.cellEditor.isContentEditing())
			{
				var node = this.toolbar.container.firstChild;
				var newNodes = [];
				
				while (node != null)
				{
					var tmp = node.nextSibling;
					
					if (mxUtils.indexOf(this.toolbar.staticElements, node) < 0)
					{
						node.parentNode.removeChild(node);
						newNodes.push(node);
					}
					
					node = tmp;
				}
				
				// Saves references to special items
				var tmp1 = this.toolbar.fontMenu;
				var tmp2 = this.toolbar.sizeMenu;
				
				if (nodes == null)
				{
					this.toolbar.createTextToolbar();
				}
				else
				{
					for (var i = 0; i < nodes.length; i++)
					{
						this.toolbar.container.appendChild(nodes[i]);
					}
					
					// Restores references to special items
					this.toolbar.fontMenu = fontMenu;
					this.toolbar.sizeMenu = sizeMenu;
				}
				
				textMode = graph.cellEditor.isContentEditing();
				fontMenu = tmp1;
				sizeMenu = tmp2;
				nodes = newNodes;
			}
		});
		
		// Overrides cell editor to update toolbar
		var cellEditorStartEditing = graph.cellEditor.startEditing;
		graph.cellEditor.startEditing = function()
		{
			cellEditorStartEditing.apply(this, arguments);
			updateToolbar();
			
			if (graph.cellEditor.isContentEditing())
			{
				var updating = false;
				
				var updateCssHandler = function()
				{
					if (!updating)
					{
						updating = true;
					
						window.setTimeout(function()
						{
							var node = graph.getSelectedEditingElement();

							if (node != null)
							{
								var css = mxUtils.getCurrentStyle(node);
		
								if (css != null && ui.toolbar != null)
								{
									ui.toolbar.setFontName(Graph.stripQuotes(css.fontFamily));
									ui.toolbar.setFontSize(parseInt(css.fontSize));
								}
							}
							
							updating = false;
						}, 0);
					}
				};
				
				mxEvent.addListener(graph.cellEditor.textarea, 'input', updateCssHandler)
				mxEvent.addListener(graph.cellEditor.textarea, 'touchend', updateCssHandler);
				mxEvent.addListener(graph.cellEditor.textarea, 'mouseup', updateCssHandler);
				mxEvent.addListener(graph.cellEditor.textarea, 'keyup', updateCssHandler);
				updateCssHandler();
			}
		};
		
		// Updates toolbar and handles possible errors
		var cellEditorStopEditing = graph.cellEditor.stopEditing;
		graph.cellEditor.stopEditing = function(cell, trigger)
		{
			try
			{
				cellEditorStopEditing.apply(this, arguments);
				updateToolbar();
			}
			catch (e)
			{
				ui.handleError(e);
			}
		};
		
	    // Enables scrollbars and sets cursor style for the container
		graph.container.setAttribute('tabindex', '0');
	   	graph.container.style.cursor = 'default';

		// Workaround for page scroll if embedded via iframe
		if (window.self === window.top && graph.container.parentNode != null)
		{
			try
			{
				graph.container.focus();
			}
			catch (e)
			{
				// ignores error in old versions of IE
			}
		}
	
	   	// Keeps graph container focused on mouse down
	   	var graphFireMouseEvent = graph.fireMouseEvent;
	   	graph.fireMouseEvent = function(evtName, me, sender)
	   	{
			try
			{
				if (evtName == mxEvent.MOUSE_DOWN)
				{
					this.container.focus();
				}
				
				graphFireMouseEvent.apply(this, arguments);
			}
			catch (e)
			{
				ui.handleError(e);
			}
	   	};

		// Adds error handling for foldCells
		var graphFoldCells = graph.foldCells;
		graph.foldCells = function(collapse, recurse, cells, checkFoldable, evt)
		{
			try
			{
				graphFoldCells.apply(this, arguments);
			}
			catch (e)
			{
				ui.handleError(e);
			}
		};
	
	   	// Configures automatic expand on mouseover
		graph.popupMenuHandler.autoExpand = true;
	
	    // Installs context menu
		if (this.menus != null)
		{
			graph.popupMenuHandler.factoryMethod = mxUtils.bind(this, function(menu, cell, evt)
			{
				this.menus.createPopupMenu(menu, cell, evt);
			});
		}
		
		// Hides context menu
		mxEvent.addGestureListeners(document, mxUtils.bind(this, function(evt)
		{
			graph.popupMenuHandler.hideMenu();
		}));
	
	    // Create handler for key events
		this.keyHandler = this.createKeyHandler(editor);
	    
		// Getter for key handler
		this.getKeyHandler = function()
		{
			return keyHandler;
		};

		graph.connectionHandler.addListener(mxEvent.CONNECT, function(sender, evt)
		{
			var cells = [evt.getProperty('cell')];
			
			if (evt.getProperty('terminalInserted'))
			{
				cells.push(evt.getProperty('terminal'));

				window.setTimeout(function()
				{
					if (ui.hoverIcons != null)
					{
						ui.hoverIcons.update(graph.view.getState(cells[cells.length - 1]));
					}
				}, 0);
			}
			
			insertHandler(cells);
		});

		this.addListener('styleChanged', mxUtils.bind(this, function(sender, evt)
		{
			var force = evt.getProperty('force');
			
			// Checks if edges and/or vertices were modified
			if (this.updateDefaultStyle || force)
			{
				var cells = evt.getProperty('cells');
				var vertex = false;
				var edge = false;
				
				if (cells.length > 0)
				{
					for (var i = 0; i < cells.length; i++)
					{
						vertex = graph.getModel().isVertex(cells[i]) || vertex;
						edge = graph.getModel().isEdge(cells[i]) || edge;
						
						if (edge && vertex)
						{
							break;
						}
					}
				}
				else
				{
					vertex = true;
					edge = true;
				}

				vertex = vertex && !vertexStyleIgnored;
				edge = edge && !edgeStyleIgnored;
				
				var keys = evt.getProperty('keys');
				var values = evt.getProperty('values');
		
				for (var i = 0; i < keys.length; i++)
				{
					var common = mxUtils.indexOf(valueStyles, keys[i]) >= 0;

					// Ignores transparent stroke colors
					if (keys[i] != 'strokeColor' || (values[i] != null && values[i] != 'none'))
					{
						// Special case: Edge style and shape
						if (mxUtils.indexOf(connectStyles, keys[i]) >= 0)
						{
							if (edge || mxUtils.indexOf(alwaysEdgeStyles, keys[i]) >= 0)
							{
								if (values[i] == null)
								{
									delete graph.currentEdgeStyle[keys[i]];
								}
								else
								{
									graph.currentEdgeStyle[keys[i]] = values[i];
								}
							}
							// Uses style for vertex if defined in styles
							else if (vertex && mxUtils.indexOf(styles, keys[i]) >= 0)
							{
								if (values[i] == null)
								{
									delete graph.currentVertexStyle[keys[i]];
								}
								else
								{
									graph.currentVertexStyle[keys[i]] = values[i];
								}
							}
						}
						else if (mxUtils.indexOf(styles, keys[i]) >= 0)
						{
							if (vertex || common)
							{
								if (values[i] == null)
								{
									delete graph.currentVertexStyle[keys[i]];
								}
								else
								{
									graph.currentVertexStyle[keys[i]] = values[i];
								}
							}
							
							if (edge || common || mxUtils.indexOf(alwaysEdgeStyles, keys[i]) >= 0)
							{
								if (values[i] == null)
								{
									delete graph.currentEdgeStyle[keys[i]];
								}
								else
								{
									graph.currentEdgeStyle[keys[i]] = values[i];
								}
							}
						}
					}
				}
			}

			if (this.toolbar != null)
			{
				this.toolbar.setFontName(graph.currentVertexStyle['fontFamily'] || Menus.prototype.defaultFont);
				this.toolbar.setFontSize(graph.currentVertexStyle['fontSize'] || Menus.prototype.defaultFontSize);
				
				if (this.toolbar.edgeStyleMenu != null)
				{
					// Updates toolbar icon for edge style
					var edgeStyleDiv = this.toolbar.edgeStyleMenu.getElementsByTagName('div')[0];
	
					if (graph.currentEdgeStyle['edgeStyle'] == 'orthogonalEdgeStyle' && graph.currentEdgeStyle['curved'] == '1')
					{
						edgeStyleDiv.className = 'geSprite geSprite-curved';
					}
					else if (graph.currentEdgeStyle['edgeStyle'] == 'straight' || graph.currentEdgeStyle['edgeStyle'] == 'none' ||
							graph.currentEdgeStyle['edgeStyle'] == null)
					{
						edgeStyleDiv.className = 'geSprite geSprite-straight';
					}
					else if (graph.currentEdgeStyle['edgeStyle'] == 'entityRelationEdgeStyle')
					{
						edgeStyleDiv.className = 'geSprite geSprite-entity';
					}
					else if (graph.currentEdgeStyle['edgeStyle'] == 'elbowEdgeStyle')
					{
						edgeStyleDiv.className = 'geSprite geSprite-' + ((graph.currentEdgeStyle['elbow'] == 'vertical') ?
							'verticalelbow' : 'horizontalelbow');
					}
					else if (graph.currentEdgeStyle['edgeStyle'] == 'isometricEdgeStyle')
					{
						edgeStyleDiv.className = 'geSprite geSprite-' + ((graph.currentEdgeStyle['elbow'] == 'vertical') ?
							'verticalisometric' : 'horizontalisometric');
					}
					else
					{
						edgeStyleDiv.className = 'geSprite geSprite-orthogonal';
					}
				}
				
				if (this.toolbar.edgeShapeMenu != null)
				{
					// Updates icon for edge shape
					var edgeShapeDiv = this.toolbar.edgeShapeMenu.getElementsByTagName('div')[0];
					
					if (graph.currentEdgeStyle['shape'] == 'link')
					{
						edgeShapeDiv.className = 'geSprite geSprite-linkedge';
					}
					else if (graph.currentEdgeStyle['shape'] == 'flexArrow')
					{
						edgeShapeDiv.className = 'geSprite geSprite-arrow';
					}
					else if (graph.currentEdgeStyle['shape'] == 'arrow')
					{
						edgeShapeDiv.className = 'geSprite geSprite-simplearrow';
					}
					else
					{
						edgeShapeDiv.className = 'geSprite geSprite-connection';
					}
				}
			}
		}));
		
		// Update font size and font family labels
		if (this.toolbar != null)
		{
			var update = mxUtils.bind(this, function()
			{
				var ff = graph.currentVertexStyle['fontFamily'] || 'Helvetica';
				var fs = String(graph.currentVertexStyle['fontSize'] || '12');
			    	var state = graph.getView().getState(graph.getSelectionCell());
			    	
			    	if (state != null)
			    	{
			    		ff = state.style[mxConstants.STYLE_FONTFAMILY] || ff;
			    		fs = state.style[mxConstants.STYLE_FONTSIZE] || fs;
			    		
			    		if (ff.length > 10)
			    		{
			    			ff = ff.substring(0, 8) + '...';
			    		}
			    	}
			    	
			    	this.toolbar.setFontName(ff);
			    	this.toolbar.setFontSize(fs);
			});
			
		    graph.getSelectionModel().addListener(mxEvent.CHANGE, update);
		    graph.getModel().addListener(mxEvent.CHANGE, update);
		}
		
		// Makes sure the current layer is visible when cells are added
		graph.addListener(mxEvent.CELLS_ADDED, function(sender, evt)
		{
			var cells = evt.getProperty('cells');
			var parent = evt.getProperty('parent');
			
			if (parent != null && graph.getModel().isLayer(parent) &&
				!graph.isCellVisible(parent) && cells != null &&
				cells.length > 0)
			{
				graph.getModel().setVisible(parent, true);
			}
		});
		
		// Global handler to hide the current menu
		this.gestureHandler = mxUtils.bind(this, function(evt)
		{
			if (this.currentMenu != null && mxEvent.getSource(evt) != this.currentMenu.div)
			{
				this.hideCurrentMenu();
			}
		});
		
		mxEvent.addGestureListeners(document, this.gestureHandler);
	
		// Updates the editor UI after the window has been resized or the orientation changes
		// Timeout is workaround for old IE versions which have a delay for DOM client sizes.
		var resizeThread = null;

		this.resizeHandler = mxUtils.bind(this, function()
	   	{
			if (resizeThread != null)
			{
				window.clearTimeout(resizeThread);
			}

			resizeThread = window.setTimeout(mxUtils.bind(this, function()
			{
				resizeThread = null;
				this.windowResized();
			}), 100);
	   	});
		
	   	mxEvent.addListener(window, 'resize', this.resizeHandler);
	   	
	   	this.orientationChangeHandler = mxUtils.bind(this, function()
	   	{
	   		this.refresh();
	   	});
	   	
	   	mxEvent.addListener(window, 'orientationchange', this.orientationChangeHandler);
	   	
		// Workaround for bug on iOS see
		// http://stackoverflow.com/questions/19012135/ios-7-ipad-safari-landscape-innerheight-outerheight-layout-issue
		if (mxClient.IS_IOS && !window.navigator.standalone && typeof Menus !== 'undefined')
		{
			this.scrollHandler = mxUtils.bind(this, function()
		   	{
		   		window.scrollTo(0, 0);
		   	});
			
		   	mxEvent.addListener(window, 'scroll', this.scrollHandler);
		}
	
		/**
		 * Sets the initial scrollbar locations after a file was loaded.
		 */
		this.editor.addListener('resetGraphView', mxUtils.bind(this, function()
		{
			this.resetScrollbars();
		}));
		
		/**
		 * Repaints the grid.
		 */
		this.addListener('gridEnabledChanged', mxUtils.bind(this, function()
		{
			graph.view.validateBackground();
		}));
		
		this.addListener('backgroundColorChanged', mxUtils.bind(this, function()
		{
			graph.view.validateBackground();
		}));
	
		/**
		 * Repaints the grid.
		 */
		graph.addListener('gridSizeChanged', mxUtils.bind(this, function()
		{
			if (graph.isGridEnabled())
			{
				graph.view.validateBackground();
			}
		}));
		
	   	// Resets UI, updates action and menu states
	   	this.editor.resetGraph();
	}

	this.init();
	
	if (!graph.standalone)
	{
		this.open();
	}
};

/**
 * Global config that specifies if the compact UI elements should be used.
 */
 EditorUi.compactUi = true;

 /**
  * Static method for pasing PNG files.
  */
 EditorUi.parsePng = function(f, fn, error)
 {
	 var pos = 0;
	 
	 function fread(d, count)
	 {
		 var start = pos;
		 pos += count;
		 
		 return d.substring(start, pos);
	 };
	 
	 // Reads unsigned long 32 bit big endian
	 function _freadint(d)
	 {
		 var bytes = fread(d, 4);
		 
		 return bytes.charCodeAt(3) + (bytes.charCodeAt(2) << 8) +
			 (bytes.charCodeAt(1) << 16) + (bytes.charCodeAt(0) << 24);
	 };
	 
	 // Checks signature
	 if (fread(f,8) != String.fromCharCode(137) + 'PNG' + String.fromCharCode(13, 10, 26, 10))
	 {
		 if (error != null)
		 {
			 error();
		 }
		 
		 return;
	 }
	 
	 // Reads header chunk
	 fread(f,4);
	 
	 if (fread(f,4) != 'IHDR')
	 {
		 if (error != null)
		 {
			 error();
		 }
		 
		 return;
	 }
	 
	 fread(f, 17);
	 
	 do
	 {
		 var n = _freadint(f);
		 var type = fread(f,4);
		 
		 if (fn != null)
		 {
			 if (fn(pos - 8, type, n))
			 {
				 break;
			 }
		 }
		 
		 value = fread(f,n);
		 fread(f,4);
		 
		 if (type == 'IEND')
		 {
			 break;
		 }
	 }
	 while (n);
 };
 
// Extends mxEventSource
mxUtils.extend(EditorUi, mxEventSource);

/**
 * Specifies the size of the split bar.
 */
EditorUi.prototype.splitSize = (mxClient.IS_TOUCH || mxClient.IS_POINTER) ? 12 : 8;

/**
 * Specifies the height of the menubar. Default is 30.
 */
EditorUi.prototype.menubarHeight = 30;

/**
 * Specifies the width of the format panel should be enabled. Default is true.
 */
EditorUi.prototype.formatEnabled = true;

/**
 * Specifies the width of the format panel. Default is 240.
 */
EditorUi.prototype.formatWidth = 240;

/**
 * Specifies the height of the toolbar. Default is 38.
 */
EditorUi.prototype.toolbarHeight = 38;

/**
 * Specifies the height of the footer. Default is 28.
 */
EditorUi.prototype.footerHeight = 28;

/**
 * Specifies the position of the horizontal split bar. Default is 240 or 118 for
 * screen widths <= 640px.
 */
EditorUi.prototype.hsplitPosition = (screen.width <= Editor.smallScreenWidth) ? 0 :
	((urlParams['sidebar-entries'] != 'large') ? 212 : 240);

/**
 * Specifies if animations are allowed in <executeLayout>. Default is true.
 */
EditorUi.prototype.allowAnimation = true;

/**
 * Default is 2.
 */
EditorUi.prototype.lightboxMaxFitScale = 2;

/**
 * Default is 4.
 */
EditorUi.prototype.lightboxVerticalDivider = 4;

/**
 * Specifies if single click on horizontal split should collapse sidebar. Default is false.
 */
EditorUi.prototype.hsplitClickEnabled = false;

/**
 * Whether the default styles should be updated when styles are changed. Default is true.
 */
EditorUi.prototype.updateDefaultStyle = false;

/**
 * Whether the default styles should be updated when styles are changed. Default is true.
 */
EditorUi.prototype.spaceDown = false;

/**
 * Whether the default styles should be updated when styles are changed. Default is true.
 */
EditorUi.prototype.shiftDown = false;

/**
 * Installs the listeners to update the action states.
 */
EditorUi.prototype.init = function()
{
	var graph = this.editor.graph;
	
	if (!graph.standalone)
	{
		if (urlParams['shape-picker'] != '0')
		{
			this.installShapePicker();
		}
		
		// Hides tooltips and connection points when scrolling
		mxEvent.addListener(graph.container, 'scroll', mxUtils.bind(this, function()
		{
			graph.tooltipHandler.hide();
			
			if (graph.connectionHandler != null && graph.connectionHandler.constraintHandler != null)
			{
				graph.connectionHandler.constraintHandler.reset();
			}
		}));
		
		// Hides tooltip on escape
		graph.addListener(mxEvent.ESCAPE, mxUtils.bind(this, function()
		{
			graph.tooltipHandler.hide();
			var rb = graph.getRubberband();
			
			if (rb != null)
			{
				rb.cancel();
			}
		}));
		
		mxEvent.addListener(graph.container, 'keydown', mxUtils.bind(this, function(evt)
		{
			this.onKeyDown(evt);
		}));
		
		mxEvent.addListener(graph.container, 'keypress', mxUtils.bind(this, function(evt)
		{
			this.onKeyPress(evt);
		}));
	
		// Updates action states
		this.addUndoListener();
		this.addBeforeUnloadListener();
		
		graph.getSelectionModel().addListener(mxEvent.CHANGE, mxUtils.bind(this, function()
		{
			this.updateActionStates();
		}));
		
		graph.getModel().addListener(mxEvent.CHANGE, mxUtils.bind(this, function()
		{
			this.updateActionStates();
		}));
		
		// Changes action states after change of default parent
		var graphSetDefaultParent = graph.setDefaultParent;
		var ui = this;
		
		this.editor.graph.setDefaultParent = function()
		{
			graphSetDefaultParent.apply(this, arguments);
			ui.updateActionStates();
		};
		
		// Hack to make showLinkDialog and editLink available in vertex handler
		graph.showLinkDialog = mxUtils.bind(ui, ui.showLinkDialog);
		graph.editLink = ui.actions.get('editLink').funct;
		
		this.updateActionStates();
		this.initClipboard();
		this.initCanvas();
		
		if (this.format != null)
		{
			this.format.init();
		}
	}
};

/**
 * Returns information about the current selection.
 */
EditorUi.prototype.clearSelectionState = function()
{
	this.selectionState = null;
};

/**
 * Returns information about the current selection.
 */
EditorUi.prototype.getSelectionState = function()
{
	if (this.selectionState == null)
	{
		this.selectionState = this.createSelectionState();
	}
	
	return this.selectionState;
};

/**
 * Returns information about the current selection.
 */
EditorUi.prototype.createSelectionState = function()
{
	var graph = this.editor.graph;
	var cells = graph.getSelectionCells();
	var result = this.initSelectionState();
	var initial = true;
	
	for (var i = 0; i < cells.length; i++)
	{
		var style = graph.getCurrentCellStyle(cells[i]);
	
		if (mxUtils.getValue(style, mxConstants.STYLE_EDITABLE, '1') != '0')
		{
			this.updateSelectionStateForCell(result, cells[i], cells, initial);
			initial = false;
		}
	}

	this.updateSelectionStateForTableCells(result);
	
	return result;
};

/**
 * Returns information about the current selection.
 */
EditorUi.prototype.initSelectionState = function()
{
	return {vertices: [], edges: [], cells: [], x: null, y: null, width: null, height: null,
		style: {}, containsImage: false, containsLabel: false, fill: true, glass: true,
		rounded: true, autoSize: false, image: false, shadow: true, lineJumps: true, resizable: true,
		table: false, cell: false, row: false, movable: true, rotatable: true, stroke: true,
		swimlane: false, unlocked: this.editor.graph.isEnabled(), connections: false};
};

/**
 * Adds information about current selected table cells range.
 */
EditorUi.prototype.updateSelectionStateForTableCells = function(result)
{
	if (result.cells.length > 1 && result.cell)
	{
		var cells = mxUtils.sortCells(result.cells);
		var model = this.editor.graph.model;
		var parent = model.getParent(cells[0]);
		var table = model.getParent(parent);

		if (parent != null && table != null)
		{
			var col = parent.getIndex(cells[0]);
			var row = table.getIndex(parent);
			var lastspan = null;
			var colspan = 1;
			var rowspan = 1;
			var index = 0;

			var nextRowCell = (row < table.getChildCount() - 1) ?
				model.getChildAt(model.getChildAt(
					table, row + 1), col) : null;
			
			while (index < cells.length - 1)
			{
				var next = cells[++index];
				
				if (nextRowCell != null && nextRowCell == next &&
					(lastspan == null || colspan == lastspan))
				{
					lastspan = colspan;
					colspan = 0;
					rowspan++;
					parent = model.getParent(nextRowCell);
					nextRowCell = (row + rowspan < table.getChildCount()) ?
						model.getChildAt(model.getChildAt(
							table, row + rowspan), col) : null;
				}

				var state = this.editor.graph.view.getState(next);

				if (next == model.getChildAt(parent, col + colspan) && state != null &&
					mxUtils.getValue(state.style, 'colspan', 1) == 1 &&
					mxUtils.getValue(state.style, 'rowspan', 1) == 1)
				{
					colspan++;
				}
				else
				{
					break;
				}
			}

			if (index == rowspan * colspan - 1)
			{
				result.mergeCell = cells[0];
				result.colspan = colspan;
				result.rowspan = rowspan;
			}
		}
	}
};

/**
 * Returns information about the current selection.
 */
EditorUi.prototype.windowResized = function()
{
	window.setTimeout(mxUtils.bind(this, function()
	{
		if (this.editor.graph != null)
		{
			this.refresh();
		}
	}), 0);
};

/**
 * Returns information about the current selection.
 */
EditorUi.prototype.createTimeout = function(timeout, fn, error)
{
	var acceptResponse = true;
	var result = null;

	var handleError = mxUtils.bind(this, function(e)
	{
		if (result.clear())
		{
			acceptResponse = false;
			e = (e != null) ? e : {code: App.ERROR_TIMEOUT,
				message: mxResources.get('timeout'),
				retry: mxUtils.bind(this, function()
				{
					this.createTimeout(timeout, fn, error);
				})};

			if (error != null)
			{
				error(e);
			}
			else
			{
				this.handleError(e);
			}
		}
	});
	
	var timeoutThread = window.setTimeout(handleError,
		(timeout != null) ? timeout : this.timeout);

	var result = {
		clear: function()
		{
			window.clearTimeout(timeoutThread);

			return acceptResponse;
		},
		isAlive: function()
		{
			return acceptResponse;
		}
	};

	if (fn != null)
	{
		this.tryAndHandle(mxUtils.bind(this, function()
		{
			fn(result);
		}), handleError);
	}

	return result;
};

/**
 * Returns information about the current selection.
 */
EditorUi.prototype.tryAndHandle = function(fn, error)
{
	try
	{
		fn();
	}
	catch (e)
	{
		if (error != null)
		{
			error(e);
		}
		else
		{
			this.handleError(e);
		}
	}
};

/**
 * Returns information about the current selection.
 */
EditorUi.prototype.convertDarkModeColors = function(cells, keys)
{
	var graph = this.editor.graph;
	cells = (cells != null) ? cells : graph.getSelectionCells();
	keys = (keys != null) ? keys : [mxConstants.STYLE_FONTCOLOR,
		mxConstants.STYLE_FILLCOLOR, mxConstants.STYLE_GRADIENTCOLOR,
		mxConstants.STYLE_STROKECOLOR, mxConstants.STYLE_IMAGE_BORDER,
		mxConstants.STYLE_IMAGE_BACKGROUND, mxConstants.STYLE_LABEL_BORDERCOLOR,
		mxConstants.STYLE_SWIMLANE_FILLCOLOR, mxConstants.STYLE_LABEL_BACKGROUNDCOLOR];
	
	var colorCache = {};
	var canvas = document.createElement('canvas');
	canvas.width = 1;
	canvas.height = 1;

	var ctx = canvas.getContext('2d', {willReadFrequently: true});
	ctx.filter = 'invert(100%) hue-rotate(180deg) saturate(1.3)';
	
	graph.model.beginUpdate();
	try
	{
		for (var i = 0; i < cells.length; i++)
		{
			if (graph.model.isEdge(cells[i]) || graph.model.isVertex(cells[i]))
			{
				var style = graph.getCurrentCellStyle(cells[i]);

				if (style != null)
				{
					for (var j = 0; j < keys.length; j++)
					{
						try
						{
							var value = style[keys[j]];

							if (value != null && value.charAt(0) == '#')
							{
								var result = colorCache[value];

								if (result == null)
								{
									ctx.fillStyle = value;
									ctx.fillRect(0, 0, 1, 1);
									var imgData = ctx.getImageData(0, 0, 1, 1);

									var r = imgData.data[0];
									var g = imgData.data[1];
									var b = imgData.data[2];

									var rgb = b | (g << 8) | (r << 16);
									result = '#' + (0x1000000 | rgb).toString(16).substring(1);
									colorCache[value] = result;
								}

								graph.setCellStyles(keys[j], result, [cells[i]]);
							}
						}
						catch (e)
						{
							// ignore
						}
					}
				}
			}
		}
	}
	finally
	{
		graph.model.endUpdate();
	}
};

/**
 * Returns information about the current selection.
 */
EditorUi.prototype.updateSelectionStateForCell = function(result, cell, cells, initial)
{
	var graph = this.editor.graph;
	result.cells.push(cell);
	
	if (graph.getModel().isVertex(cell))
	{
		result.connections = graph.model.getEdgeCount(cell) > 0;
		result.unlocked = result.unlocked && !graph.isCellLocked(cell);
		result.resizable = result.resizable && graph.isCellResizable(cell);
		result.rotatable = result.rotatable && graph.isCellRotatable(cell);
		result.movable = result.movable && graph.isCellMovable(cell) &&
			!graph.isTableRow(cell) && !graph.isTableCell(cell);
		result.swimlane = result.swimlane || graph.isSwimlane(cell);
		result.table = result.table || graph.isTable(cell);
		result.cell = result.cell || graph.isTableCell(cell);
		result.row = result.row || graph.isTableRow(cell);
		result.vertices.push(cell);
		var geo = graph.getCellGeometry(cell);
		
		if (geo != null)
		{
			if (geo.width > 0)
			{
				if (result.width == null)
				{
					result.width = geo.width;
				}
				else if (result.width != geo.width)
				{
					result.width = '';
				}
			}
			else
			{
				result.containsLabel = true;
			}
			
			if (geo.height > 0)
			{
				if (result.height == null)
				{
					result.height = geo.height;
				}
				else if (result.height != geo.height)
				{
					result.height = '';
				}
			}
			else
			{
				result.containsLabel = true;
			}
			
			if (!geo.relative || geo.offset != null)
			{
				var x = (geo.relative) ? geo.offset.x : geo.x;
				var y = (geo.relative) ? geo.offset.y : geo.y;
				
				if (result.x == null)
				{
					result.x = x;
				}
				else if (result.x != x)
				{
					result.x = '';
				}
				
				if (result.y == null)
				{
					result.y = y;
				}
				else if (result.y != y)
				{
					result.y = '';
				}
			}
		}
	}
	else if (graph.getModel().isEdge(cell))
	{
		result.edges.push(cell);
		result.connections = true;
		result.resizable = false;
		result.rotatable = false;
		result.movable = false;
	}

	var state = graph.view.getState(cell);
	
	if (state != null)
	{
		result.autoSize = result.autoSize || graph.isAutoSizeState(state);
		result.glass = result.glass && graph.isGlassState(state);
		result.rounded = result.rounded && graph.isRoundedState(state);
		result.lineJumps = result.lineJumps && graph.isLineJumpState(state);
		result.image = result.image || graph.isImageState(state);
		result.shadow = result.shadow && graph.isShadowState(state);
		result.fill = result.fill && graph.isFillState(state);
		result.gradient = result.fill && graph.isGradientState(state);
		result.stroke = result.stroke && graph.isStrokeState(state);
		
		var shape = mxUtils.getValue(state.style, mxConstants.STYLE_SHAPE, null);
		result.containsImage = result.containsImage || shape == 'image';
		graph.mergeStyle(state.style, result.style, initial);
	}
};

/**
 * Returns true if the given event should start editing. This implementation returns true.
 */
EditorUi.prototype.installShapePicker = function()
{
	var graph = this.editor.graph;
	var ui = this;

	// Uses this event to process mouseDown to check the selection state before it is changed
	graph.addListener(mxEvent.FIRE_MOUSE_EVENT, mxUtils.bind(this, function(sender, evt)
	{
		if (evt.getProperty('eventName') == 'mouseDown')
		{
			ui.hideShapePicker();
		}
	}));

	var hidePicker = mxUtils.bind(this, function()
	{
		ui.hideShapePicker(true);
	});
	
	graph.addListener('wheel', hidePicker);
	graph.addListener(mxEvent.ESCAPE, hidePicker);
	graph.view.addListener(mxEvent.SCALE, hidePicker);
	graph.view.addListener(mxEvent.SCALE_AND_TRANSLATE, hidePicker);
	graph.getSelectionModel().addListener(mxEvent.CHANGE, hidePicker);
	
	// Counts as popup menu
	var popupMenuHandlerIsMenuShowing = graph.popupMenuHandler.isMenuShowing;
	 
	graph.popupMenuHandler.isMenuShowing = function()
	{
		return popupMenuHandlerIsMenuShowing.apply(this, arguments) ||
			ui.shapePicker != null || ui.currentMenu != null;
	};
	
	// Adds dbl click dialog for inserting shapes
	var graphDblClick = graph.dblClick;
	
	graph.dblClick = function(evt, cell)
	{
		if (this.isEnabled())
		{
			if (cell == null && ui.sidebar != null && !mxEvent.isShiftDown(evt) &&
				!graph.isCellLocked(graph.getDefaultParent()))
			{
				var pt = mxUtils.convertPoint(this.container, mxEvent.getClientX(evt), mxEvent.getClientY(evt));
				mxEvent.consume(evt);

				// Asynchronous to avoid direct insert after double tap
				window.setTimeout(mxUtils.bind(this, function()
				{
					ui.showShapePicker(pt.x, pt.y);
				}), 30);
			}
			else
			{
				graphDblClick.apply(this, arguments);
			}
		}
	};

	if (this.hoverIcons != null)
	{
		this.hoverIcons.addListener('reset', hidePicker);
		var hoverIconsDrag = this.hoverIcons.drag;
		
		this.hoverIcons.drag = function()
		{
			ui.hideShapePicker();
			hoverIconsDrag.apply(this, arguments);
		};
		
		var hoverIconsExecute = this.hoverIcons.execute;
		
		this.hoverIcons.execute = function(state, dir, me)
		{
			var evt = me.getEvent();
			
			if (!this.graph.isCloneEvent(evt) && !mxEvent.isShiftDown(evt))
			{
				this.graph.connectVertex(state.cell, dir, this.graph.defaultEdgeLength, evt, null, null, mxUtils.bind(this, function(x, y, execute)
				{
					var temp = graph.getCompositeParent(state.cell);
					var geo = graph.getCellGeometry(temp);
					me.consume();
					
					while (temp != null && graph.model.isVertex(temp) && geo != null && geo.relative)
					{
						cell = temp;
						temp = graph.model.getParent(cell)
						geo = graph.getCellGeometry(temp);
					}
					
					// Asynchronous to avoid direct insert after double tap
					window.setTimeout(mxUtils.bind(this, function()
					{
						ui.showShapePicker(me.getGraphX(), me.getGraphY(), temp, mxUtils.bind(this, function(cell)
						{
							execute(cell);
							
							if (ui.hoverIcons != null)
							{
								ui.hoverIcons.update(graph.view.getState(cell));
							}
						}), dir);
					}), 30);
				}), mxUtils.bind(this, function(result)
				{
					this.graph.selectCellsForConnectVertex(result, evt, this);
				}));
			}
			else
			{
				hoverIconsExecute.apply(this, arguments);
			}
		};

		var thread = null;

		this.hoverIcons.addListener('focus', mxUtils.bind(this, function(sender, evt)
		{
			if (thread != null)
			{
				window.clearTimeout(thread);
			}

			thread = window.setTimeout(mxUtils.bind(this, function()
			{
				var arrow = evt.getProperty('arrow');
				var dir = evt.getProperty('direction');
				var mouseEvent = evt.getProperty('event');

				var rect = arrow.getBoundingClientRect();
				var offset = mxUtils.getOffset(graph.container);
				var x = graph.container.scrollLeft + rect.x - offset.x;
				var y = graph.container.scrollTop + rect.y - offset.y;

				var temp = graph.getCompositeParent((this.hoverIcons.currentState != null) ?
					this.hoverIcons.currentState.cell : null);
				var div = ui.showShapePicker(x, y, temp, mxUtils.bind(this, function(cell)
				{
					if (cell != null)
					{
						graph.connectVertex(temp, dir, graph.defaultEdgeLength, mouseEvent, true, false, function(x, y, execute)
						{
							execute(cell);
								
							if (ui.hoverIcons != null)
							{
								ui.hoverIcons.update(graph.view.getState(cell));
							}
						}, function(cells)
						{
							graph.selectCellsForConnectVertex(cells);
						}, mouseEvent, this.hoverIcons);
					}
				}), dir, true);

				this.centerShapePicker(div, rect, x, y, dir);
				mxUtils.setOpacity(div, 30);

				mxEvent.addListener(div, 'mouseenter', function()
				{
					mxUtils.setOpacity(div, 100);
				});

				mxEvent.addListener(div, 'mouseleave', function()
				{
					ui.hideShapePicker();
				});
			}), Editor.shapePickerHoverDelay);
		}));

		this.hoverIcons.addListener('blur', mxUtils.bind(this, function(sender, evt)
		{
			if (thread != null)
			{
				window.clearTimeout(thread);
			}
		}));
	}
};

/**
 * Creates a temporary graph instance for rendering off-screen content.
 */
EditorUi.prototype.centerShapePicker = function(div, rect, x, y, dir)
{
	if (dir == mxConstants.DIRECTION_EAST || dir == mxConstants.DIRECTION_WEST)
	{
		div.style.width = '40px';
	}

	var r2 = div.getBoundingClientRect();

	if (dir == mxConstants.DIRECTION_NORTH)
	{
		x -= r2.width / 2 - 10;
		y -= r2.height + 6;
	}
	else if (dir == mxConstants.DIRECTION_SOUTH)
	{
		x -= r2.width / 2 - 10;
		y += rect.height + 6;
	}
	else if (dir == mxConstants.DIRECTION_WEST)
	{
		x -= r2.width + 6;
		y -= r2.height / 2 - 10;
	}
	else if (dir == mxConstants.DIRECTION_EAST)
	{
		x += rect.width + 6;
		y -= r2.height / 2 - 10;
	}

	div.style.left = x + 'px';
	div.style.top = y + 'px';
};

/**
 * Creates a temporary graph instance for rendering off-screen content.
 */
EditorUi.prototype.showShapePicker = function(x, y, source, callback, direction, hovering,
	getInsertLocationFn, showEdges, startEditing)
{
	showEdges = showEdges || source == null;

	var div = this.createShapePicker(x, y, source, callback, direction, mxUtils.bind(this, function()
	{	
		this.hideShapePicker();
	}), this.getCellsForShapePicker(source, hovering, showEdges), hovering,
		getInsertLocationFn, showEdges, startEditing);
	
	if (div != null)
	{
		if (this.hoverIcons != null && !hovering)
		{
			this.hoverIcons.reset();
		}
		
		var graph = this.editor.graph;
		graph.popupMenuHandler.hideMenu();
		graph.tooltipHandler.hideTooltip();
		this.hideCurrentMenu();
		this.hideShapePicker();
		
		this.shapePickerCallback = callback;
		this.shapePicker = div;
	}

	return div;
};

/**
 * Creates a temporary graph instance for rendering off-screen content.
 */
EditorUi.prototype.createShapePicker = function(x, y, source, callback, direction,
	afterClick, cells, hovering, getInsertLocationFn, showEdges, startEditing)
{
	startEditing = (startEditing != null) ? startEditing : true;
	var graph = this.editor.graph;
	var div = null;

	getInsertLocationFn = (getInsertLocationFn != null) ? getInsertLocationFn : function(cells)
	{
		var cell = cells[0];
		var w = 0;
		var h = 0;
		var geo = cell.geometry;

		if (geo != null)
		{	
			if (graph.model.isEdge(cell))
			{
				var pt = geo.getTerminalPoint(false);
				geo = new mxRectangle(0, 0, pt.x, pt.y);
			}

			w = geo.width / 2;
			h = geo.height / 2;
		}

		return new mxPoint(graph.snap(Math.round(x / graph.view.scale) - graph.view.translate.x - w),
			graph.snap(Math.round(y / graph.view.scale) - graph.view.translate.y - h));
	};
	
	if (cells != null && cells.length > 0)
	{
		var ui = this;
		var graph = this.editor.graph;
		div = document.createElement('div');
		var sourceState = graph.view.getState(source);
		var style = (source != null && (sourceState == null ||
			!graph.isTransparentState(sourceState))) ?
			graph.copyStyle(source) : null;
		
		// Do not place entry under pointer for touch devices
		var w = (cells.length < 6) ? cells.length * 35 : 140;
		div.className = 'geToolbarContainer geSidebarContainer geShapePicker';
		div.setAttribute('title', mxResources.get('sidebarTooltip'));
		div.style.left = x + 'px';
		div.style.top = y + 'px';
		div.style.width = w + 'px';

		// Disables built-in pan and zoom on touch devices
		if (mxClient.IS_POINTER)
		{
			div.style.touchAction = 'none';
		}

		if (!hovering)
		{
			mxUtils.setPrefixedStyle(div.style, 'transform', 'translate(-22px,-22px)');
		}
		
		if (graph.background != null && graph.background != mxConstants.NONE)
		{
			div.style.backgroundColor = graph.background;
		}
		
		graph.container.appendChild(div);
		
		var addCell = mxUtils.bind(this, function(cell)
		{
			// Wrapper needed to catch events
			var node = document.createElement('a');
			node.className = 'geItem';
			node.style.cssText = 'position:relative;display:inline-block;position:relative;' +
				'width:30px;height:30px;cursor:pointer;overflow:hidden;padding:1px';
			div.appendChild(node);
			
			if (style != null && urlParams['sketch'] != '1')
			{
				this.sidebar.graph.pasteStyle(style, [cell]);
			}
			else
			{
				ui.insertHandler([cell], cell.value != '' && urlParams['sketch'] != '1', this.sidebar.graph.model);
			}

			var geo = cell.geometry;
			
			if (graph.model.isEdge(cell))
			{
				var pt = geo.getTerminalPoint(false);
				geo = new mxRectangle(0, 0, pt.x, pt.y);
			}
			
			if (geo != null)
			{
				node.appendChild(this.sidebar.createVertexTemplateFromCells([cell],
					geo.width, geo.height, '', true, false, null, false,
					mxUtils.bind(this, function(evt)
				{
					if (mxEvent.isShiftDown(evt) && (source != null ||
						!graph.isSelectionEmpty()))
					{
						var temp = graph.getEditableCells((source != null) ?
							[source] : graph.getSelectionCells());
						graph.updateShapes(cell, temp);
					}
					else
					{
						var clone = graph.cloneCell(cell);

						if (callback != null)
						{
							callback(clone);
						}
						else
						{
							var pt = getInsertLocationFn([clone]);

							if (graph.model.isEdge(clone))
							{
								clone.geometry.translate(pt.x, pt.y);
							}
							else
							{
								clone.geometry.x = pt.x;
								clone.geometry.y = pt.y;
							}
							
							graph.model.beginUpdate();
							try
							{
								graph.addCell(clone);

								if (graph.model.isVertex(clone) &&
									graph.isAutoSizeCell(clone))
								{
									graph.updateCellSize(clone);
								}
							}
							finally
							{
								graph.model.endUpdate();
							}
							
							graph.setSelectionCell(clone);
							graph.scrollCellToVisible(clone);
							
							if (startEditing)
							{
								graph.startEditing(clone);
							}
							
							if (ui.hoverIcons != null)
							{
								ui.hoverIcons.update(graph.view.getState(clone));
							}
						}
					}
					
					if (afterClick != null)
					{
						afterClick(evt);
					}

					mxEvent.consume(evt);
				}), 25, 25, null, null, source));
			}
		});
		
		for (var i = 0; i < (hovering ? Math.min(cells.length, 4) : cells.length); i++)
		{
			addCell(cells[i]);
		}
		
		var b = graph.container.scrollTop + graph.container.offsetHeight;
		var dy = div.offsetTop + div.clientHeight - b;
		
		if (dy > 0)
		{
			div.style.top = Math.max(graph.container.scrollTop + 22, y - dy) + 'px';
		}
		
		var r = graph.container.scrollLeft + graph.container.offsetWidth;
		var dx = div.offsetLeft + div.clientWidth - r;
		
		if (dx > 0)
		{
			div.style.left = Math.max(graph.container.scrollLeft + 22, x - dx) + 'px';
		}
	}
	
	return div;
};

/**
 * Creates a temporary graph instance for rendering off-screen content.
 */
EditorUi.prototype.getCellsForShapePicker = function(cell, hovering, showEdges)
{
	var graph = this.editor.graph;

	var createVertex = mxUtils.bind(this, function(style, w, h, value)
	{
		return graph.createVertex(null, null, value || '', 0, 0, w || 120, h || 60, style, false);
	});

	var createEdge = mxUtils.bind(this, function(style, y, value)
	{
		var cell = new mxCell(value || '', new mxGeometry(0, 0, graph.defaultEdgeLength + 20, 0), style);
		cell.geometry.setTerminalPoint(new mxPoint(0, 0), true);
		cell.geometry.setTerminalPoint(new mxPoint(cell.geometry.width, (y != null) ? y : 0), false);
		cell.geometry.points = (y != null) ? [new mxPoint(cell.geometry.width / 2, y)] : [];
		cell.geometry.relative = true;
		cell.edge = true;

		return cell;
	});

	// Creates a clone of the source cell and moves it to the origin
	if (cell != null)
	{
		try
		{
			cell = graph.cloneCell(cell);
			
			if (graph.model.isVertex(cell) && cell.geometry != null)
			{
				cell.geometry.x = 0;
				cell.geometry.y = 0;
			}
		}
		catch (e)
		{
			cell = null;
		}
	}
	
	if (cell == null)
	{
		cell = createVertex('text;html=1;align=center;verticalAlign=middle;resizable=0;' +
			'points=[];autosize=1;strokeColor=none;fillColor=none;', 40, 20, 'Text');
		
		if (graph.model.isVertex(cell) && graph.isAutoSizeCell(cell))
		{
			// Uses offscreen graph to bypass undo history
			var tempGraph = Graph.createOffscreenGraph(graph.getStylesheet());
			tempGraph.updateCellSize(cell);
		}
	}

	var cells = [cell, createVertex('whiteSpace=wrap;html=1;'),
		createVertex('ellipse;whiteSpace=wrap;html=1;', 80, 80),
		createVertex('rhombus;whiteSpace=wrap;html=1;', 80, 80),
		createVertex('rounded=1;whiteSpace=wrap;html=1;'),
		createVertex('shape=parallelogram;perimeter=parallelogramPerimeter;whiteSpace=wrap;html=1;fixedSize=1;'),
		createVertex('shape=trapezoid;perimeter=trapezoidPerimeter;whiteSpace=wrap;html=1;fixedSize=1;', 120, 60),
		createVertex('shape=hexagon;perimeter=hexagonPerimeter2;whiteSpace=wrap;html=1;fixedSize=1;', 120, 80),
		createVertex('shape=step;perimeter=stepPerimeter;whiteSpace=wrap;html=1;fixedSize=1;', 120, 80),
		createVertex('shape=process;whiteSpace=wrap;html=1;backgroundOutline=1;'),
		createVertex('triangle;whiteSpace=wrap;html=1;', 60, 80),
		createVertex('shape=document;whiteSpace=wrap;html=1;boundedLbl=1;', 120, 80),
		createVertex('shape=tape;whiteSpace=wrap;html=1;', 120, 100),
		createVertex('ellipse;shape=cloud;whiteSpace=wrap;html=1;', 120, 80),
		createVertex('shape=singleArrow;whiteSpace=wrap;html=1;arrowWidth=0.4;arrowSize=0.4;', 80, 60),
		createVertex('shape=waypoint;sketch=0;size=6;pointerEvents=1;points=[];fillColor=none;resizable=0;' +
			'rotatable=0;perimeter=centerPerimeter;snapToPoint=1;', 20, 20)];
	
	if (showEdges)
	{
		cells = cells.concat([
			createEdge('edgeStyle=none;orthogonalLoop=1;jettySize=auto;html=1;'),
			createEdge('edgeStyle=none;orthogonalLoop=1;jettySize=auto;html=1;endArrow=classic;startArrow=classic;endSize=8;startSize=8;'),
			createEdge('edgeStyle=none;orthogonalLoop=1;jettySize=auto;html=1;shape=flexArrow;rounded=1;startSize=8;endSize=8;'),
			createEdge('edgeStyle=segmentEdgeStyle;endArrow=classic;html=1;curved=0;rounded=0;endSize=8;startSize=8;sourcePerimeterSpacing=0;targetPerimeterSpacing=0;',
				this.editor.graph.defaultEdgeLength / 2)
		]);
	}

	return cells;
};

/**
 * Creates a temporary graph instance for rendering off-screen content.
 */
EditorUi.prototype.isShapePickerVisible = function(cancel)
{
	return this.shapePicker != null;
};

/**
 * Creates a temporary graph instance for rendering off-screen content.
 */
EditorUi.prototype.hideShapePicker = function(cancel)
{
	if (this.shapePicker != null)
	{
		this.shapePicker.parentNode.removeChild(this.shapePicker);
		this.shapePicker = null;
				
		if (!cancel && this.shapePickerCallback != null)
		{
			this.shapePickerCallback();
		}
		
		this.shapePickerCallback = null;
	}
};

/**
 * Whether the default styles should be updated when styles are changed. Default is true.
 */
EditorUi.prototype.isSpaceDown = function()
{
	return this.spaceDown;
};

/**
 * Whether the default styles should be updated when styles are changed. Default is true.
 */
EditorUi.prototype.isShiftDown = function()
{
	return this.shiftDown;
};

/**
 * Returns true if the given event should start editing. This implementation returns true.
 */
EditorUi.prototype.onKeyDown = function(evt)
{
	var graph = this.editor.graph;
	
	// Alt+tab for task switcher in Windows, ctrl+tab for tab control in Chrome
	if (evt.which == 9 && graph.isEnabled() && !mxEvent.isControlDown(evt))
	{
		if (graph.isEditing())
		{
			if (mxEvent.isAltDown(evt))
			{
				graph.stopEditing(false);
			}
			else
			{
				try
				{
					var nesting = graph.cellEditor.isContentEditing() && graph.cellEditor.isTextSelected();

					if (window.getSelection && graph.cellEditor.isContentEditing() &&
						!nesting && !mxClient.IS_IE && !mxClient.IS_IE11)
					{
						var selection = window.getSelection();
						var container = (selection.rangeCount > 0) ? selection.getRangeAt(0).commonAncestorContainer : null;
						nesting = container != null && (container.nodeName == 'LI' || (container.parentNode != null &&
							container.parentNode.nodeName == 'LI'));
					}

					if (nesting)
					{
						// (Shift+)tab indents/outdents with text selection or inside list elements
						document.execCommand(mxEvent.isShiftDown(evt) ? 'outdent' : 'indent', false, null);
					}
					// Shift+tab applies value with cursor
					else if (mxEvent.isShiftDown(evt))
					{
						graph.stopEditing(false);
					}
					else
					{
						// Inserts tab character
						graph.cellEditor.insertTab(!graph.cellEditor.isContentEditing() ? 4 : null);
					}
				}
				catch (e)
				{
					// ignore
				}
			}
		}
		else if (mxEvent.isAltDown(evt))
		{
			graph.selectParentCell();
		}
		else
		{
			graph.selectCell(!mxEvent.isShiftDown(evt));
		}
			
		mxEvent.consume(evt);
	}
};

/**
 * Returns true if the given event should start editing. This implementation returns true.
 */
EditorUi.prototype.onKeyPress = function(evt)
{
	var graph = this.editor.graph;
	
	// KNOWN: Focus does not work if label is empty in quirks mode
	if (this.isImmediateEditingEvent(evt) && !graph.isEditing() && !graph.isSelectionEmpty() && evt.which !== 0 &&
		evt.which !== 27 && !mxEvent.isAltDown(evt) && !mxEvent.isControlDown(evt) && !mxEvent.isMetaDown(evt))
	{
		graph.escape();
		graph.startEditing();

		// Workaround for FF where char is lost if cursor is placed before char
		if (mxClient.IS_FF)
		{
			var ce = graph.cellEditor;
			
			if (ce.textarea != null)
			{
				ce.textarea.innerHTML = String.fromCharCode(evt.which);
	
				// Moves cursor to end of textarea
				var range = document.createRange();
				range.selectNodeContents(ce.textarea);
				range.collapse(false);
				var sel = window.getSelection();
				sel.removeAllRanges();
				sel.addRange(range);
			}
		}
	}
};

/**
 * Returns true if the given event should start editing. This implementation returns true.
 */
EditorUi.prototype.isImmediateEditingEvent = function(evt)
{
	return true;
};

/**
 * Updates the CSS for the given element to match the selection.
 */
EditorUi.prototype.updateCssForMarker = function(markerDiv, prefix, shape, marker, fill)
{
	markerDiv.style.display = 'inline-flex';
	markerDiv.style.alignItems = 'center';
	markerDiv.style.justifyContent = 'center';
	markerDiv.innerText = '';

	if (shape == 'flexArrow')
	{
		markerDiv.className = (marker != null && marker != mxConstants.NONE) ?
			'geSprite geSprite-' + prefix + 'blocktrans' : 'geSprite geSprite-noarrow';
	}
	else
	{
		var src = this.getImageForMarker(marker, fill);

		if (src != null)
		{
			var img = document.createElement('img');
			img.className = 'geAdaptiveAsset';
			img.setAttribute('src', src);
			markerDiv.className = '';

			if (prefix == 'end')
			{
				mxUtils.setPrefixedStyle(img.style, 'transform', 'scaleX(-1)');
			}

			markerDiv.appendChild(img);
		}
		else
		{
			markerDiv.className = 'geSprite geSprite-noarrow';
			markerDiv.innerHTML = mxUtils.htmlEntities(mxResources.get('none'));
			markerDiv.style.backgroundImage = 'none';
			markerDiv.style.fontSize = '11px';
			markerDiv.style.filter = 'none';
		}
	}
};

/**
 * Returns true if the given event should start editing. This implementation returns true.
 */
EditorUi.prototype.getImageForMarker = function(marker, fill)
{
	var result = null;

	if (marker == mxConstants.ARROW_CLASSIC)
	{
		result = (fill != '1') ? Format.classicMarkerImage.src :
			Format.classicFilledMarkerImage.src
	}
	else if (marker == mxConstants.ARROW_CLASSIC_THIN)
	{
		result = (fill != '1') ? Format.classicThinMarkerImage.src :
			Format.openThinFilledMarkerImage.src;
	}
	else if (marker == mxConstants.ARROW_OPEN)
	{
		result = Format.openFilledMarkerImage.src;
	}
	else if (marker == mxConstants.ARROW_OPEN_THIN)
	{
		result = Format.openThinFilledMarkerImage.src;
	}
	else if (marker == mxConstants.ARROW_BLOCK)
	{
		result = (fill != '1') ? Format.blockMarkerImage.src :
			Format.blockFilledMarkerImage.src;
	}
	else if (marker == mxConstants.ARROW_BLOCK_THIN)
	{
		result = (fill != '1') ? Format.blockThinMarkerImage.src :
			Format.blockThinFilledMarkerImage.src;
	}
	else if (marker == mxConstants.ARROW_OVAL)
	{
		result = (fill != '1') ? Format.ovalMarkerImage.src :
			Format.ovalFilledMarkerImage.src;
	}
	else if (marker == mxConstants.ARROW_DIAMOND)
	{
		result = (fill != '1') ? Format.diamondMarkerImage.src :
			Format.diamondFilledMarkerImage.src;
	}
	else if (marker == mxConstants.ARROW_DIAMOND_THIN)
	{
		result = (fill != '1') ? Format.diamondThinMarkerImage.src :
			Format.diamondThinFilledMarkerImage.src;
	}
	else if (marker == 'doubleBlock')
	{
		result = (fill != '1') ? Format.doubleBlockMarkerImage.src :
			Format.doubleBlockFilledMarkerImage.src;
	}
	else if (marker == 'box')
	{
		result = Format.boxMarkerImage.src;
	}
	else if (marker == 'halfCircle')
	{
		result = Format.halfCircleMarkerImage.src;
	}
	else if (marker == 'openAsync')
	{
		result = Format.openAsyncFilledMarkerImage.src;
	}
	else if (marker == 'async')
	{
		result = (fill != '1') ? Format.asyncMarkerImage.src :
			Format.asyncFilledMarkerImage.src;
	}
	else if (marker == 'dash')
	{
		result = Format.dashMarkerImage.src;
	}
	else if (marker == 'baseDash')
	{
		result = Format.baseDashMarkerImage.src;
	}
	else if (marker == 'cross')
	{
		result = Format.crossMarkerImage.src;
	}
	else if (marker == 'circle')
	{
		result = Format.circleMarkerImage.src;
	}
	else if (marker == 'circlePlus')
	{
		result = Format.circlePlusMarkerImage.src;
	}
	else if (marker == 'ERone')
	{
		result = Format.EROneMarkerImage.src;
	}
	else if (marker == 'ERmandOne')
	{
		result = Format.ERmandOneMarkerImage.src;
	}
	else if (marker == 'ERmany')
	{
		result = Format.ERmanyMarkerImage.src;
	}
	else if (marker == 'ERoneToMany')
	{
		result = Format.ERoneToManyMarkerImage.src;
	}
	else if (marker == 'ERzeroToOne')
	{
		result = Format.ERzeroToOneMarkerImage.src;
	}
	else if (marker == 'ERzeroToMany')
	{
		result = Format.ERzeroToManyMarkerImage.src;
	}

	return result;
};

/**
 * Overridden in Menus.js
 */
EditorUi.prototype.createMenus = function()
{
	return null;
};

/**
 * Hook for allowing selection and context menu for certain events.
 */
EditorUi.prototype.updatePasteActionStates = function()
{
	var graph = this.editor.graph;
	var paste = this.actions.get('paste');
	var pasteHere = this.actions.get('pasteHere');
	
	paste.setEnabled(this.editor.graph.cellEditor.isContentEditing() ||
		(((!mxClient.IS_FF && navigator.clipboard != null) || !mxClipboard.isEmpty()) &&
		graph.isEnabled() && !graph.isCellLocked(graph.getDefaultParent())));
	pasteHere.setEnabled(paste.isEnabled());
};

/**
 * Hook for allowing selection and context menu for certain events.
 */
EditorUi.prototype.initClipboard = function()
{
	var ui = this;

	var mxClipboardCut = mxClipboard.cut;
	mxClipboard.cut = function(graph)
	{
		if (graph.cellEditor.isContentEditing())
		{
			document.execCommand('cut', false, null);
		}
		else
		{
			mxClipboardCut.apply(this, arguments);
		}
		
		ui.updatePasteActionStates();
	};
	
	var mxClipboardCopy = mxClipboard.copy;
	mxClipboard.copy = function(graph)
	{
		var result = null;
		
		if (graph.cellEditor.isContentEditing())
		{
			document.execCommand('copy', false, null);
		}
		else
		{
			result = result || graph.getSelectionCells();
			result = graph.getExportableCells(graph.model.getTopmostCells(result));
			
			var cloneMap = new Object();
			var lookup = graph.createCellLookup(result);
			var clones = graph.cloneCells(result, null, cloneMap);
			
			// Uses temporary model to force new IDs to be assigned
			// to avoid having to carry over the mapping from object
			// ID to cell ID to the paste operation
			var model = new mxGraphModel();
			var parent = model.getChildAt(model.getRoot(), 0);
			
			for (var i = 0; i < clones.length; i++)
			{
				model.add(parent, clones[i]);
				
				// Checks for orphaned relative children and makes absolute				
				var state = graph.view.getState(result[i]);
				
				if (state != null)
				{
					var geo = graph.getCellGeometry(clones[i]);
				
					if (geo != null && geo.relative && !model.isEdge(result[i]) &&
						lookup[mxObjectIdentity.get(model.getParent(result[i]))] == null)
					{
						geo.offset = null;
						geo.relative = false;
						geo.x = state.x / state.view.scale - state.view.translate.x;
						geo.y = state.y / state.view.scale - state.view.translate.y;
					}
				}
			}
			
			graph.updateCustomLinks(graph.createCellMapping(cloneMap, lookup), clones);

			mxClipboard.insertCount = 1;
			mxClipboard.setCells(clones);
		}
		
		ui.updatePasteActionStates();
		
		return result;
	};

	var mxClipboardPaste = mxClipboard.paste;
	mxClipboard.paste = function(graph)
	{
		var result = null;
		
		if (graph.cellEditor.isContentEditing())
		{
			document.execCommand('paste', false, null);
		}
		else
		{
			result = mxClipboardPaste.apply(this, arguments);
		}
		
		ui.updatePasteActionStates();
		
		return result;
	};

	// Overrides cell editor to update paste action state
	var cellEditorStartEditing = this.editor.graph.cellEditor.startEditing;
	
	this.editor.graph.cellEditor.startEditing = function()
	{
		cellEditorStartEditing.apply(this, arguments);
		ui.updatePasteActionStates();
	};
	
	var cellEditorStopEditing = this.editor.graph.cellEditor.stopEditing;
	
	this.editor.graph.cellEditor.stopEditing = function(cell, trigger)
	{
		cellEditorStopEditing.apply(this, arguments);
		ui.updatePasteActionStates();
	};
	
	this.updatePasteActionStates();
};

/**
 * Delay between zoom steps when not using preview.
 */
EditorUi.prototype.lazyZoomDelay = 20;

/**
 * Delay before update of DOM when using preview.
 */
EditorUi.prototype.wheelZoomDelay = 500;

/**
 * Delay before update of DOM when using preview.
 */
EditorUi.prototype.buttonZoomDelay = 600;

/**
 * Initializes the infinite canvas.
 */
EditorUi.prototype.initCanvas = function()
{
	// Initial page layout view, scrollBuffer and timer-based scrolling
	var graph = this.editor.graph;
	graph.timerAutoScroll = true;

	/**
	 * Returns the padding for pages in page view with scrollbars.
	 */
	graph.getPagePadding = function()
	{
		return new mxPoint(Math.max(0, Math.round((graph.container.offsetWidth - 34) / graph.view.scale)),
				Math.max(0, Math.round((graph.container.offsetHeight - 34) / graph.view.scale)));
	};

	// Fits the number of background pages to the graph
	graph.view.getBackgroundPageBounds = function()
	{
		var layout = this.graph.getPageLayout();
		var page = this.graph.getPageSize();
		
		return new mxRectangle(this.scale * (this.translate.x + layout.x * page.width),
				this.scale * (this.translate.y + layout.y * page.height),
				this.scale * layout.width * page.width,
				this.scale * layout.height * page.height);
	};

	graph.getPreferredPageSize = function(bounds, width, height)
	{
		var pages = this.getPageLayout();
		var size = this.getPageSize();
		
		return new mxRectangle(0, 0, pages.width * size.width, pages.height * size.height);
	};
	
	// Scales pages/graph to fit available size
	var resize = null;
	var ui = this;
	
	if (this.editor.isChromelessView())
	{
        resize = mxUtils.bind(this, function(autoscale, maxScale, cx, cy)
        {
            if (graph.container != null && !graph.isViewer())
            {
                cx = (cx != null) ? cx : 0;
                cy = (cy != null) ? cy : 0;
                
                var bds = (graph.pageVisible) ?
					graph.view.getBackgroundPageBounds() :
					graph.getGraphBounds();
                var scroll = mxUtils.hasScrollbars(graph.container);
                var tr = graph.view.translate;
                var s = graph.view.scale;
                
                // Normalizes the bounds
                var b = mxRectangle.fromRectangle(bds);
                b.x = b.x / s - tr.x;
                b.y = b.y / s - tr.y;
                b.width /= s;
                b.height /= s;
                
                var st = graph.container.scrollTop;
                var sl = graph.container.scrollLeft;
                var sb = (document.documentMode >= 8) ? 20 : 14;
                
                if (document.documentMode == 8 || document.documentMode == 9)
                {
                    sb += 3;
                }
                
                var cw = graph.container.offsetWidth - sb;
                var ch = graph.container.offsetHeight - sb;
                
                var ns = (autoscale) ? Math.max(0.3, Math.min(maxScale || 1, cw / b.width)) : s;
                var dx = ((cw - ns * b.width) / 2) / ns;
                var dy = (this.lightboxVerticalDivider == 0) ? 0 : ((ch - ns * b.height) / this.lightboxVerticalDivider) / ns;
                
                if (scroll)
                {
                    dx = Math.max(dx, 0);
                    dy = Math.max(dy, 0);
                }

                if (scroll || bds.width < cw || bds.height < ch)
                {
                    graph.view.scaleAndTranslate(ns, Math.floor(dx - b.x), Math.floor(dy - b.y));
                    graph.container.scrollTop = st * ns / s;
                    graph.container.scrollLeft = sl * ns / s;
                }
                else if (cx != 0 || cy != 0)
                {
                    var t = graph.view.translate;
                    graph.view.setTranslate(Math.floor(t.x + cx / s), Math.floor(t.y + cy / s));
                }
            }
        });
		
		// Hack to make function available to subclassers
		this.chromelessResize = resize;

		// Hook for subclassers for override
		this.chromelessWindowResize = mxUtils.bind(this, function()
	   	{
			this.chromelessResize(false);
	   	});

		// Removable resize listener
		var autoscaleResize = mxUtils.bind(this, function()
	   	{
			this.chromelessWindowResize(false);
	   	});
		
	   	mxEvent.addListener(window, 'resize', autoscaleResize);
	   	
	   	this.destroyFunctions.push(function()
	   	{
	   		mxEvent.removeListener(window, 'resize', autoscaleResize);
	   	});
	   	
		this.editor.addListener('resetGraphView', mxUtils.bind(this, function()
		{
			this.chromelessResize(true);
		}));

		this.actions.get('zoomIn').funct = mxUtils.bind(this, function(evt)
		{
			graph.zoomIn();
			this.chromelessResize(false);
		});
		this.actions.get('zoomOut').funct = mxUtils.bind(this, function(evt)
		{
			graph.zoomOut();
			this.chromelessResize(false);
		});
		
		// Creates toolbar for viewer - do not use CSS here
		// as this may be used in a viewer that has no CSS
		if (urlParams['toolbar'] != '0')
		{
			var toolbarConfig = JSON.parse(decodeURIComponent(urlParams['toolbar-config'] || '{}'));
			
			this.chromelessToolbar = document.createElement('div');
			this.chromelessToolbar.style.position = 'fixed';
			this.chromelessToolbar.style.overflow = 'hidden';
			this.chromelessToolbar.style.boxSizing = 'border-box';
			this.chromelessToolbar.style.whiteSpace = 'nowrap';
			this.chromelessToolbar.style.padding = '10px 10px 8px 10px';
			this.chromelessToolbar.style.left = (graph.isViewer()) ? '0' : '50%';

			if (!mxClient.IS_IE && !mxClient.IS_IE11)
			{
				this.chromelessToolbar.style.backgroundColor = '#000000';
			}
			else
			{
				this.chromelessToolbar.style.backgroundColor = '#ffffff';
				this.chromelessToolbar.style.border = '3px solid black';
			}
			
			mxUtils.setPrefixedStyle(this.chromelessToolbar.style, 'borderRadius', '16px');
			mxUtils.setPrefixedStyle(this.chromelessToolbar.style, 'transition', 'opacity 600ms ease-in-out');
			
			var updateChromelessToolbarPosition = mxUtils.bind(this, function()
			{
				var css = mxUtils.getCurrentStyle(graph.container);
				
				if (graph.isViewer())
				{
					this.chromelessToolbar.style.top = '0';
				}
				else
				{
				 	this.chromelessToolbar.style.bottom = ((css != null) ? parseInt(css['margin-bottom'] || 0) : 0) +
				 		((this.tabContainer != null) ? (20 + parseInt(this.tabContainer.style.height)) : 20) + 'px';
				} 
			});
			
			this.editor.addListener('resetGraphView', updateChromelessToolbarPosition);
			updateChromelessToolbarPosition();
			
			var btnCount = 0;
	
			var addButton = mxUtils.bind(this, function(fn, imgSrc, tip)
			{
				btnCount++;
				
				var a = document.createElement('span');
				a.style.paddingLeft = '8px';
				a.style.paddingRight = '8px';
				a.style.cursor = 'pointer';
				mxEvent.addListener(a, 'click', fn);
				
				if (tip != null)
				{
					a.setAttribute('title', tip);
				}
				
				var img = document.createElement('img');
				img.setAttribute('border', '0');
				img.setAttribute('src', imgSrc);
				img.style.width = '36px';
				img.style.filter = 'invert(100%)';
				
				a.appendChild(img);
				this.chromelessToolbar.appendChild(a);
				
				return a;
			});
			
			if (toolbarConfig.backBtn != null)
			{
				var backUrl = Graph.sanitizeLink(toolbarConfig.backBtn.url);

				if (backUrl != null)
				{
					addButton(mxUtils.bind(this, function(evt)
					{
						window.location.href = backUrl;
						mxEvent.consume(evt);
					}), Editor.backImage, mxResources.get('back', null, 'Back'));
				}
			}
			
			if (this.isPagesEnabled())
			{
				var prevButton = addButton(mxUtils.bind(this, function(evt)
				{
					this.actions.get('previousPage').funct();
					mxEvent.consume(evt);
				}), Editor.previousImage, mxResources.get('previousPage'));
				
				var pageInfo = document.createElement('div');
				pageInfo.style.fontFamily = Editor.defaultHtmlFont;
				pageInfo.style.display = 'inline-block';
				pageInfo.style.verticalAlign = 'top';
				pageInfo.style.fontWeight = 'bold';
				pageInfo.style.marginTop = '8px';
				pageInfo.style.fontSize = '14px';

				if (!mxClient.IS_IE && !mxClient.IS_IE11)
				{
					pageInfo.style.color = '#ffffff';
				}
				else
				{
					pageInfo.style.color = '#000000';
				}

				this.chromelessToolbar.appendChild(pageInfo);
				
				var nextButton = addButton(mxUtils.bind(this, function(evt)
				{
					this.actions.get('nextPage').funct();
					mxEvent.consume(evt);
				}), Editor.nextImage, mxResources.get('nextPage'));
				
				var updatePageInfo = mxUtils.bind(this, function()
				{
					if (this.pages != null && this.pages.length > 1 && this.currentPage != null)
					{
						pageInfo.innerText = '';
						mxUtils.write(pageInfo, (mxUtils.indexOf(this.pages, this.currentPage) + 1) + ' / ' + this.pages.length);
					}
				});
				
				prevButton.style.paddingLeft = '0px';
				prevButton.style.paddingRight = '4px';
				nextButton.style.paddingLeft = '4px';
				nextButton.style.paddingRight = '0px';
				
				var updatePageButtons = mxUtils.bind(this, function()
				{
					if (this.pages != null && this.pages.length > 1 && this.currentPage != null)
					{
						nextButton.style.display = '';
						prevButton.style.display = '';
						pageInfo.style.display = 'inline-block';
					}
					else
					{
						nextButton.style.display = 'none';
						prevButton.style.display = 'none';
						pageInfo.style.display = 'none';
					}
					
					updatePageInfo();
				});
				
				this.editor.addListener('resetGraphView', updatePageButtons);
				this.editor.addListener('pageSelected', updatePageInfo);
			}
		
			addButton(mxUtils.bind(this, function(evt)
			{
				this.actions.get('zoomOut').funct();
				mxEvent.consume(evt);
			}), Editor.zoomOutImage, mxResources.get('zoomOut') + ' (Alt+Mousewheel)');
			
			addButton(mxUtils.bind(this, function(evt)
			{
				this.actions.get('zoomIn').funct();
				mxEvent.consume(evt);
			}), Editor.zoomInImage, mxResources.get('zoomIn') + ' (Alt+Mousewheel)');
			
			addButton(mxUtils.bind(this, function(evt)
			{
				if (graph.isLightboxView())
				{
					if (graph.view.scale == 1)
					{
						this.lightboxFit();
					}
					else
					{
						graph.zoomTo(1);
					}
					
					this.chromelessResize(false);
				}
				else
				{
					this.chromelessResize(true);
				}
				
				mxEvent.consume(evt);
			}), Editor.zoomFitImage, mxResources.get('fit'));
	
			// Changes toolbar opacity on hover
			var fadeThread = null;
			var fadeThread2 = null;
			
			var fadeOut = mxUtils.bind(this, function(delay)
			{
				if (fadeThread != null)
				{
					window.clearTimeout(fadeThread);
					fadeThread = null;
				}
				
				if (fadeThread2 != null)
				{
					window.clearTimeout(fadeThread2);
					fadeThread2 = null;
				}
				
				fadeThread = window.setTimeout(mxUtils.bind(this, function()
				{
				 	mxUtils.setOpacity(this.chromelessToolbar, 0);
					fadeThread = null;
				 	
					fadeThread2 = window.setTimeout(mxUtils.bind(this, function()
					{
						this.chromelessToolbar.style.display = 'none';
						fadeThread2 = null;
					}), 600);
				}), delay || 200);
			});
			
			var fadeIn = mxUtils.bind(this, function(opacity)
			{
				if (fadeThread != null)
				{
					window.clearTimeout(fadeThread);
					fadeThread = null;
				}
				
				if (fadeThread2 != null)
				{
					window.clearTimeout(fadeThread2);
					fadeThread2 = null;
				}
				
				this.chromelessToolbar.style.display = '';
				mxUtils.setOpacity(this.chromelessToolbar, opacity || 30);
			});
	
			if (urlParams['layers'] == '1')
			{
				this.layersDialog = null;
				
				var layersButton = addButton(mxUtils.bind(this, function(evt)
				{
					if (this.layersDialog != null)
					{
						this.layersDialog.parentNode.removeChild(this.layersDialog);
						this.layersDialog = null;
					}
					else
					{
						this.layersDialog = graph.createLayersDialog(null, true);
						
						mxEvent.addListener(this.layersDialog, 'mouseleave', mxUtils.bind(this, function()
						{
							this.layersDialog.parentNode.removeChild(this.layersDialog);
							this.layersDialog = null;
						}));
						
						var r = layersButton.getBoundingClientRect();
						
						mxUtils.setPrefixedStyle(this.layersDialog.style, 'borderRadius', '5px');
						this.layersDialog.style.position = 'fixed';
						this.layersDialog.style.fontFamily = Editor.defaultHtmlFont;
						this.layersDialog.style.width = '160px';
						this.layersDialog.style.padding = '4px 2px 4px 2px';
						this.layersDialog.style.left = r.left + 'px';
						this.layersDialog.style.bottom = parseInt(this.chromelessToolbar.style.bottom) +
							this.chromelessToolbar.offsetHeight + 4 + 'px';

						if (!mxClient.IS_IE && !mxClient.IS_IE11)
						{
							this.layersDialog.style.backgroundColor = '#000000';
							this.layersDialog.style.color = '#ffffff';
							mxUtils.setOpacity(this.layersDialog, 80);
						}
						else
						{
							this.layersDialog.style.backgroundColor = '#ffffff';
							this.layersDialog.style.border = '2px solid black';
							this.layersDialog.style.color = '#000000';
						}

						// Puts the dialog on top of the container z-index
						var style = mxUtils.getCurrentStyle(this.editor.graph.container);
						this.layersDialog.style.zIndex = style.zIndex;
						
						document.body.appendChild(this.layersDialog);
						this.editor.fireEvent(new mxEventObject('layersDialogShown'));
					}
					
					mxEvent.consume(evt);
				}), Editor.layersImage, mxResources.get('layers'));
				
				// Shows/hides layers button depending on content
				var model = graph.getModel();
	
				model.addListener(mxEvent.CHANGE, function()
				{
					layersButton.style.display = (model.getChildCount(model.root) > 1) ? '' : 'none';
				});
			}
	
			if (urlParams['openInSameWin'] != '1' || navigator.standalone)
			{
				this.addChromelessToolbarItems(addButton);
			}
	
			if (this.editor.editButtonLink != null || this.editor.editButtonFunc != null)
			{
				addButton(mxUtils.bind(this, function(evt)
				{
					if (this.editor.editButtonFunc != null) 
					{
						this.editor.editButtonFunc();
					} 
					else if (this.editor.editButtonLink == '_blank')
					{
						this.editor.editAsNew(this.getEditBlankXml());
					}
					else
					{
						graph.openLink(this.editor.editButtonLink, 'editWindow');
					}
					
					mxEvent.consume(evt);
				}), Editor.editImage, mxResources.get('edit'));
			}
			
			if (this.lightboxToolbarActions != null)
			{
				for (var i = 0; i < this.lightboxToolbarActions.length; i++)
				{
					var lbAction = this.lightboxToolbarActions[i];
					lbAction.elem = addButton(lbAction.fn, lbAction.icon, lbAction.tooltip);
				}
			}

			if (toolbarConfig.refreshBtn != null)
			{
				var refreshUrl = (toolbarConfig.refreshBtn.url == null) ? null :
					Graph.sanitizeLink(toolbarConfig.refreshBtn.url);

				addButton(mxUtils.bind(this, function(evt)
				{
					if (refreshUrl != null)
					{
						window.location.href = refreshUrl;
					}
					else
					{
						window.location.reload();
					}
					
					mxEvent.consume(evt);
				}), Editor.refreshImage, mxResources.get('refresh', null, 'Refresh'));
			}

			if (toolbarConfig.fullscreenBtn != null && window.self !== window.top)
			{
				addButton(mxUtils.bind(this, function(evt)
				{
					if (toolbarConfig.fullscreenBtn.url)
					{
						graph.openLink(toolbarConfig.fullscreenBtn.url);
					}
					else
					{
						graph.openLink(window.location.href);
					}
					
					mxEvent.consume(evt);
				}), Editor.fullscreenImage, mxResources.get('openInNewWindow', null, 'Open in New Window'));
			}
			
			if (!toolbarConfig.noCloseBtn && ((toolbarConfig.closeBtn && window.self === window.top) ||
				(graph.lightbox && (urlParams['close'] == '1' || this.container != document.body))))
			{
				addButton(mxUtils.bind(this, function(evt)
				{
					if (urlParams['close'] == '1' || toolbarConfig.closeBtn)
					{
						window.close();
					}
					else
					{
						this.destroy();
						mxEvent.consume(evt);
					}
				}), Editor.closeImage, mxResources.get('close') + ' (Escape)');
			}
	
			// Initial state invisible
			this.chromelessToolbar.style.display = 'none';
			
			if (!graph.isViewer())
			{
				mxUtils.setPrefixedStyle(this.chromelessToolbar.style, 'transform', 'translate(-50%,0)');
			}
			
			graph.container.appendChild(this.chromelessToolbar);
			
			mxEvent.addListener(graph.container, (mxClient.IS_POINTER) ? 'pointermove' : 'mousemove', mxUtils.bind(this, function(evt)
			{
				if (!mxEvent.isTouchEvent(evt))
				{
					if (!mxEvent.isShiftDown(evt))
					{
						fadeIn(30);
					}
					
					fadeOut();
				}
			}));
			
			mxEvent.addListener(this.chromelessToolbar, (mxClient.IS_POINTER) ? 'pointermove' : 'mousemove', function(evt)
			{
				mxEvent.consume(evt);
			});
			
			mxEvent.addListener(this.chromelessToolbar, 'mouseenter', mxUtils.bind(this, function(evt)
			{
				graph.tooltipHandler.resetTimer();
				graph.tooltipHandler.hideTooltip();

				if (!mxEvent.isShiftDown(evt))
				{
					fadeIn(100);
				}
				else
				{
					fadeOut();
				}
			}));

			mxEvent.addListener(this.chromelessToolbar, 'mousemove',  mxUtils.bind(this, function(evt)
			{
				if (!mxEvent.isShiftDown(evt))
				{
					fadeIn(100);
				}
				else
				{
					fadeOut();
				}
				
				mxEvent.consume(evt);
			}));

			mxEvent.addListener(this.chromelessToolbar, 'mouseleave',  mxUtils.bind(this, function(evt)
			{
				if (!mxEvent.isTouchEvent(evt))
				{
					fadeIn(30);
				}
			}));

			// Shows/hides toolbar for touch devices
			var tol = graph.getTolerance();

			graph.addMouseListener(
			{
			    startX: 0,
			    startY: 0,
			    scrollLeft: 0,
			    scrollTop: 0,
			    mouseDown: function(sender, me)
			    {
			    	this.startX = me.getGraphX();
			    	this.startY = me.getGraphY();
				    this.scrollLeft = graph.container.scrollLeft;
				    this.scrollTop = graph.container.scrollTop;
			    },
			    mouseMove: function(sender, me) {},
			    mouseUp: function(sender, me)
			    {
			    	if (mxEvent.isTouchEvent(me.getEvent()))
			    	{
				    	if ((Math.abs(this.scrollLeft - graph.container.scrollLeft) < tol &&
				    		Math.abs(this.scrollTop - graph.container.scrollTop) < tol) &&
				    		(Math.abs(this.startX - me.getGraphX()) < tol &&
				    		Math.abs(this.startY - me.getGraphY()) < tol))
				    	{
				    		if (parseFloat(ui.chromelessToolbar.style.opacity || 0) > 0)
				    		{
				    			fadeOut();
				    		}
				    		else
				    		{
				    			fadeIn(30);
				    		}
						}
			    	}
			    }
			});
		} // end if toolbar

		// Installs handling of highlight and handling links to relative links and anchors
		if (!this.editor.editable)
		{
			this.addChromelessClickHandler();
		}
	}
	else if (this.editor.extendCanvas)
	{
		/**
		 * Guesses autoTranslate to avoid another repaint (see below).
		 * Works if only the scale of the graph changes or if pages
		 * are visible and the visible pages do not change. Uses
		 * geometries to guess the bounding box of the graph.
		 */
		var graphViewValidate = graph.view.validate;
		var zero = new mxPoint();
		var lastPage = null;

		graph.view.validate = function()
		{
			if (graph.container != null &&
				mxUtils.hasScrollbars(graph.container))
			{
				// Sets initial state after page changes
				if (ui.currentPage != null &&
					lastPage != ui.currentPage)
				{
					lastPage = ui.currentPage;

					// Sets initial translate based on geometries
					// to avoid revalidation in sizeDidChange
					var bbox = graph.getBoundingBoxFromGeometry(
						graph.model.getCells(), true);
					
					// Handles blank diagrams
					if (bbox == null)
					{
						bbox = new mxRectangle(
							graph.view.translate.x * graph.view.scale,
							graph.view.translate.y * graph.view.scale);
					}

					var pageLayout = graph.getPageLayout(bbox, zero, 1);
					var tr = graph.getDefaultTranslate(pageLayout);
					this.x0 = pageLayout.x;
					this.y0 = pageLayout.y;
					
					if (tr.x != this.translate.x ||
						tr.y != this.translate.y)
					{
						this.invalidate();
						this.translate.x = tr.x;
						this.translate.y = tr.y;
					}
				}
				
				var pad = graph.getPagePadding();
				var size = graph.getPageSize();
				var tx = pad.x - (this.x0 || 0) * size.width;
				var ty = pad.y - (this.y0 || 0) * size.height;

				if (this.translate.x != tx || this.translate.y != ty)
				{
					this.invalidate();	
					this.translate.x = tx
					this.translate.y = ty
				}
			}
			
			graphViewValidate.apply(this, arguments);
		};
		
		if (!graph.isViewer())
		{
			var graphSizeDidChange = graph.sizeDidChange;

			graph.sizeDidChange = function()
			{
				if (this.container != null &&
					mxUtils.hasScrollbars(this.container))
				{
					this.updateMinimumSize();

					if (!this.autoTranslate)
					{
						var pageLayout = this.getPageLayout();
						var tr = this.getDefaultTranslate(pageLayout);
						var tx = this.view.translate.x;
						var ty = this.view.translate.y;
						
						if (tr.x != tx || tr.y != ty)
						{
							this.view.x0 = pageLayout.x;
							this.view.y0 = pageLayout.y;
							this.autoTranslate = true;

							// Requires full revalidation
							this.view.setTranslate(tr.x, tr.y);
							this.container.scrollLeft += Math.round((tr.x - tx) * this.view.scale);
							this.container.scrollTop += Math.round((tr.y - ty) * this.view.scale);
							this.autoTranslate = false;
							
							return;
						}
					}
					
					graphSizeDidChange.apply(this, arguments);
				}
				else
				{
					// Fires event but does not invoke superclass
					this.fireEvent(new mxEventObject(mxEvent.SIZE,
						'bounds', this.getGraphBounds()));
				}
			};
		}
	}
	
	// Accumulates the zoom factor while the rendering is taking place
	// so that not the complete sequence of zoom steps must be painted
	var bgGroup = graph.view.getBackgroundPane();
	var mainGroup = graph.view.getDrawPane();
	graph.cumulativeZoomFactor = 1;
	var updateZoomTimeout = null;
	var cursorPosition = null;
	var scrollPosition = null;
	var forcedZoom = null;
	var filter = null;
	var mult = 20;
	
	var scheduleZoom = function(delay)
	{
		if (updateZoomTimeout != null)
		{
			window.clearTimeout(updateZoomTimeout);
		}

		if (delay >= 0)
		{
			window.setTimeout(function()
			{
				if (!graph.isMouseDown || forcedZoom)
				{
					updateZoomTimeout = window.setTimeout(mxUtils.bind(this, function()
					{
						if (graph.isFastZoomEnabled())
						{
							// Transforms background page
							if (graph.view.backgroundPageShape != null && graph.view.backgroundPageShape.node != null)
							{
								mxUtils.setPrefixedStyle(graph.view.backgroundPageShape.node.style, 'transform-origin', null);
								mxUtils.setPrefixedStyle(graph.view.backgroundPageShape.node.style, 'transform', null);
							}
							
							// Transforms graph and background image
							mainGroup.style.transformOrigin = '';
							bgGroup.style.transformOrigin = '';

							// Workaround for no reset of transform in Safari
							if (mxClient.IS_SF)
							{
								mainGroup.style.transform = 'scale(1)';
								bgGroup.style.transform = 'scale(1)';
								
								window.setTimeout(function()
								{
									mainGroup.style.transform = '';
									bgGroup.style.transform = '';
								}, 0)
							}
							else
							{
								mainGroup.style.transform = '';
								bgGroup.style.transform = '';
							}
							
							// Shows interactive elements
							graph.view.getDecoratorPane().style.opacity = '';
							graph.view.getOverlayPane().style.opacity = '';
						}
						
						var sp = new mxPoint(graph.container.scrollLeft, graph.container.scrollTop);
						var offset = mxUtils.getOffset(graph.container);
						var prev = graph.view.scale;
						var dx = 0;
						var dy = 0;
						
						if (cursorPosition != null)
						{
							dx = graph.container.offsetWidth / 2 - cursorPosition.x + offset.x;
							dy = graph.container.offsetHeight / 2 - cursorPosition.y + offset.y;
						}

						graph.zoom(graph.cumulativeZoomFactor, null,
							graph.isFastZoomEnabled() ? mult : null);
						var s = graph.view.scale;
						
						if (s != prev)
						{
							if (scrollPosition != null)
							{
								dx += sp.x - scrollPosition.x;
								dy += sp.y - scrollPosition.y;
							}
							
							if (resize != null)
							{
								ui.chromelessResize(false, null, dx * (graph.cumulativeZoomFactor - 1),
									dy * (graph.cumulativeZoomFactor - 1));
							}
							
							if (mxUtils.hasScrollbars(graph.container) && (dx != 0 || dy != 0))
							{
								graph.container.scrollLeft -= dx * (graph.cumulativeZoomFactor - 1);
								graph.container.scrollTop -= dy * (graph.cumulativeZoomFactor - 1);
							}
						}
						
						if (filter != null)
						{
							mainGroup.setAttribute('filter', filter);
						}
						
						graph.cumulativeZoomFactor = 1;
						updateZoomTimeout = null;
						scrollPosition = null;
						cursorPosition = null;
						forcedZoom = null;
						filter = null;
					}), (delay != null) ? delay : ((graph.isFastZoomEnabled()) ? ui.wheelZoomDelay : ui.lazyZoomDelay));
				}
			}, 0);
		}
	};
	
	graph.lazyZoom = function(zoomIn, ignoreCursorPosition, delay, factor)
	{
		factor = (factor != null) ? factor : this.zoomFactor;

		// TODO: Fix ignored cursor position if scrollbars are disabled
		ignoreCursorPosition = ignoreCursorPosition || !graph.scrollbars;
		
		if (ignoreCursorPosition)
		{
			cursorPosition = new mxPoint(
				graph.container.offsetLeft + graph.container.clientWidth / 2,
				graph.container.offsetTop + graph.container.clientHeight / 2);
		}
		
		// Switches to 5% zoom steps below 15%
		if (zoomIn)
		{
			if (this.view.scale * this.cumulativeZoomFactor <= 0.15)
			{
				this.cumulativeZoomFactor *= (this.view.scale + 0.05) / this.view.scale;
			}
			else
			{
				this.cumulativeZoomFactor *= factor;
				this.cumulativeZoomFactor = Math.round(this.view.scale * this.cumulativeZoomFactor * 100) / 100 / this.view.scale;
			}
		}
		else
		{
			if (this.view.scale * this.cumulativeZoomFactor <= 0.15)
			{
				this.cumulativeZoomFactor *= (this.view.scale - 0.05) / this.view.scale;
			}
			else
			{
				this.cumulativeZoomFactor /= factor;
				this.cumulativeZoomFactor = Math.round(this.view.scale * this.cumulativeZoomFactor * 100) / 100 / this.view.scale;
			}
		}

		this.cumulativeZoomFactor = Math.max(0.05, Math.min(this.view.scale * this.cumulativeZoomFactor, 160)) / this.view.scale;

		if (graph.isFastZoomEnabled())
		{
			if (filter == null && mainGroup.getAttribute('filter') != '')
			{
				filter = mainGroup.getAttribute('filter');
				mainGroup.removeAttribute('filter');
			}

			scrollPosition = new mxPoint(graph.container.scrollLeft, graph.container.scrollTop);

			// Applies final rounding to preview
			var f = Math.round((Math.round(this.view.scale * this.cumulativeZoomFactor *
				100) / 100) * mult) / (mult * this.view.scale);
			
			var cx = (ignoreCursorPosition || cursorPosition == null) ?
				graph.container.scrollLeft + graph.container.clientWidth / 2 :
				cursorPosition.x + graph.container.scrollLeft - graph.container.offsetLeft;
			var cy = (ignoreCursorPosition || cursorPosition == null) ?
				graph.container.scrollTop + graph.container.clientHeight / 2 :
				cursorPosition.y + graph.container.scrollTop - graph.container.offsetTop;
			mainGroup.style.transformOrigin = cx + 'px ' + cy + 'px';
			mainGroup.style.transform = 'scale(' + f + ')';
			bgGroup.style.transformOrigin = cx + 'px ' + cy + 'px';
			bgGroup.style.transform = 'scale(' + f + ')';
			
			if (graph.view.backgroundPageShape != null && graph.view.backgroundPageShape.node != null)
			{
				var page = graph.view.backgroundPageShape.node;
				
				mxUtils.setPrefixedStyle(page.style, 'transform-origin',
					((ignoreCursorPosition || cursorPosition == null) ?
						((graph.container.clientWidth / 2 + graph.container.scrollLeft -
						page.offsetLeft) + 'px') : ((cursorPosition.x + graph.container.scrollLeft -
						page.offsetLeft - graph.container.offsetLeft) + 'px')) + ' ' +
					((ignoreCursorPosition || cursorPosition == null) ?
						((graph.container.clientHeight / 2 + graph.container.scrollTop -
						page.offsetTop) + 'px') : ((cursorPosition.y + graph.container.scrollTop -
						page.offsetTop - graph.container.offsetTop) + 'px')));
				mxUtils.setPrefixedStyle(page.style, 'transform', 'scale(' + f + ')');
			}
			else
			{
				graph.view.validateBackgroundStyles(f, cx, cy);
			}

			graph.view.getDecoratorPane().style.opacity = '0';
			graph.view.getOverlayPane().style.opacity = '0';
			
			if (ui.hoverIcons != null)
			{
				ui.hoverIcons.reset();
			}

			graph.fireEvent(new mxEventObject('zoomPreview', 'factor', f));
		}
		
		scheduleZoom(graph.isFastZoomEnabled() ? delay : 0);
	};
	
	// Holds back repaint until after mouse gestures
	mxEvent.addGestureListeners(graph.container, function(evt)
	{
		if (updateZoomTimeout != null)
		{
			window.clearTimeout(updateZoomTimeout);
		}
	}, null, function(evt)
	{
		if (graph.cumulativeZoomFactor != 1)
		{
			scheduleZoom(0);
		}
	});
	
	// Holds back repaint until scroll ends
	mxEvent.addListener(graph.container, 'scroll', function(evt)
	{
		if (updateZoomTimeout != null && !graph.isMouseDown && graph.cumulativeZoomFactor != 1)
		{
			scheduleZoom(0);
		}
	});
	
	mxEvent.addMouseWheelListener(mxUtils.bind(this, function(evt, up, force, cx, cy)
	{
		graph.fireEvent(new mxEventObject('wheel'));

		if (this.dialogs == null || this.dialogs.length == 0)
		{
			// Scrolls with scrollbars turned off
			if (!graph.scrollbars && !force && graph.isScrollWheelEvent(evt))
            {
                var t = graph.view.getTranslate();
                var step = 40 / graph.view.scale;
                
                if (!mxEvent.isShiftDown(evt))
                {
                    graph.view.setTranslate(t.x, t.y + ((up) ? step : -step));
                }
                else
                {
                    graph.view.setTranslate(t.x + ((up) ? -step : step), t.y);
                }
            }
			else if (force || graph.isZoomWheelEvent(evt))
			{
				var source = mxEvent.getSource(evt);

				while (source != null)
				{
					if (source == graph.container)
					{
						graph.tooltipHandler.hideTooltip();
						cursorPosition = (cx != null && cy!= null) ? new mxPoint(cx, cy) :
							new mxPoint(mxEvent.getClientX(evt), mxEvent.getClientY(evt));
						forcedZoom = force;
						var factor = graph.zoomFactor;
						var delay = null;

						// Slower zoom for pinch gesture on trackpad with max delta to
						// filter out mouse wheel events in Brave browser for Windows 
						if (evt.ctrlKey && evt.deltaY != null && Math.abs(evt.deltaY) < 40 &&
							Math.round(evt.deltaY) != evt.deltaY)
						{
							factor = 1 + (Math.abs(evt.deltaY) / 20) * (factor - 1);
						}
						// Slower zoom for pinch gesture on touch screens
						else if (evt.movementY != null && evt.type == 'pointermove')
						{
							factor = 1 + (Math.max(1, Math.abs(evt.movementY)) / 20) * (factor - 1);
							delay = -1;
						}
						
						graph.lazyZoom(up, null, delay, factor);
						mxEvent.consume(evt);
				
						return false;
					}
					
					source = source.parentNode;
				}
			}
		}
	}), graph.container);
	
	// Uses fast zoom for pinch gestures on iOS
	graph.panningHandler.zoomGraph = function(evt)
	{
		graph.cumulativeZoomFactor = evt.scale;
		graph.lazyZoom(evt.scale > 0, true);
		mxEvent.consume(evt);
	};
};

/**
 * Creates a temporary graph instance for rendering off-screen content.
 */
EditorUi.prototype.addChromelessToolbarItems = function(addButton)
{
	addButton(mxUtils.bind(this, function(evt)
	{
		this.actions.get('print').funct();
		mxEvent.consume(evt);
	}), Editor.printImage, mxResources.get('print'));	
};

/**
 * Creates a temporary graph instance for rendering off-screen content.
 */
EditorUi.prototype.isPagesEnabled = function()
{
	return this.editor.editable || urlParams['hide-pages'] != '1';
};

/**
 * Creates a temporary graph instance for rendering off-screen content.
 */
EditorUi.prototype.createTemporaryGraph = function(stylesheet)
{
	return Graph.createOffscreenGraph(stylesheet);
};

/**
 * 
 */
EditorUi.prototype.addChromelessClickHandler = function()
{
	var hl = urlParams['highlight'];
	
	// Adds leading # for highlight color code
	if (hl != null && hl.length > 0)
	{
		hl = '#' + hl;
	}

	this.editor.graph.addClickHandler(hl);
};

/**
 * 
 */
EditorUi.prototype.toggleFormatPanel = function(visible)
{
	visible = (visible != null) ? visible : this.formatWidth == 0;
	
	if (this.format != null)
	{
		this.formatWidth = (visible) ? 240 : 0;
		this.formatContainer.style.width = this.formatWidth + 'px';
		this.refresh();
		this.format.refresh();
		this.fireEvent(new mxEventObject('formatWidthChanged'));
	}
};

/**
 * 
 */
EditorUi.prototype.isFormatPanelVisible = function()
{
	return this.formatWidth > 0;
};

/**
 * Adds support for placeholders in labels.
 */
EditorUi.prototype.lightboxFit = function(maxHeight)
{
	if (this.isDiagramEmpty())
	{
		this.editor.graph.view.setScale(1);
	}
	else
	{
		var p = urlParams['border'];
		var border = 60;
		
		if (p != null)
		{
			border = parseInt(p);
		}
		
		// LATER: Use initial graph bounds to avoid rounding errors
		this.editor.graph.maxFitScale = this.lightboxMaxFitScale;
		this.editor.graph.fit(border, null, null, null, null, null, maxHeight);
		this.editor.graph.maxFitScale = null;
	}
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
EditorUi.prototype.isDiagramEmpty = function()
{
	var model = this.editor.graph.getModel();
	
	return model.getChildCount(model.root) == 1 && model.getChildCount(model.getChildAt(model.root, 0)) == 0;
};

/**
 * Hook for allowing selection and context menu for certain events.
 */
EditorUi.prototype.isSelectionAllowed = function(evt)
{
	return mxEvent.getSource(evt).nodeName == 'SELECT' || (mxEvent.getSource(evt).nodeName == 'INPUT' &&
		mxUtils.isAncestorNode(this.formatContainer, mxEvent.getSource(evt)));
};

/**
 * Installs dialog if browser window is closed without saving
 * This must be disabled during save and image export.
 */
EditorUi.prototype.addBeforeUnloadListener = function()
{
	// Installs dialog if browser window is closed without saving
	// This must be disabled during save and image export
	window.onbeforeunload = mxUtils.bind(this, function()
	{
		if (!this.editor.isChromelessView())
		{
			return this.onBeforeUnload();
		}
	});
};

/**
 * Sets the onbeforeunload for the application
 */
EditorUi.prototype.onBeforeUnload = function()
{
	if (this.editor.modified)
	{
		return mxResources.get('allChangesLost');
	}
};

/**
 * Opens the current diagram via the window.opener if one exists.
 */
EditorUi.prototype.open = function()
{
	// Cross-domain window access is not allowed in FF, so if we
	// were opened from another domain then this will fail.
	try
	{
		if (window.opener != null && window.opener.openFile != null)
		{
			window.opener.openFile.setConsumer(mxUtils.bind(this, function(xml, filename)
			{
				try
				{
					var doc = mxUtils.parseXml(xml); 
					this.editor.setGraphXml(doc.documentElement);
					this.editor.setModified(false);
					this.editor.undoManager.clear();
					
					if (filename != null)
					{
						this.editor.setFilename(filename);
						this.updateDocumentTitle();
					}
					
					return;
				}
				catch (e)
				{
					mxUtils.alert(mxResources.get('invalidOrMissingFile') + ': ' + e.message);
				}
			}));
		}
	}
	catch(e)
	{
		// ignore
	}
	
	// Fires as the last step if no file was loaded
	this.editor.graph.view.validate();
	
	// Required only in special cases where an initial file is opened
	// and the minimumGraphSize changes and CSS must be updated.
	this.editor.graph.sizeDidChange();
	this.editor.fireEvent(new mxEventObject('resetGraphView'));
};

/**
 * Shows the given popup menu.
 */
EditorUi.prototype.showPopupMenu = function(fn, x, y, evt)
{
	this.editor.graph.popupMenuHandler.hideMenu();
	
	var menu = new mxPopupMenu(fn);
	menu.div.className += ' geMenubarMenu';
	menu.smartSeparators = true;
	menu.showDisabled = true;
	menu.autoExpand = true;
	
	// Disables autoexpand and destroys menu when hidden
	menu.hideMenu = mxUtils.bind(this, function()
	{
		mxPopupMenu.prototype.hideMenu.apply(menu, arguments);
		menu.destroy();
	});

	menu.popup(x, y, null, evt);
	
	// Allows hiding by clicking on document
	this.setCurrentMenu(menu);	
};

/**
 * Sets the current menu and element.
 */
EditorUi.prototype.setCurrentMenu = function(menu, elt)
{
	this.currentMenuElt = elt;
	this.currentMenu = menu;
	this.hideShapePicker();
};

/**
 * Resets the current menu and element.
 */
EditorUi.prototype.resetCurrentMenu = function()
{
	this.currentMenuElt = null;
	this.currentMenu = null;
};

/**
 * Hides and destroys the current menu.
 */
EditorUi.prototype.hideCurrentMenu = function()
{
	if (this.currentMenu != null)
	{
		this.currentMenu.hideMenu();
		this.resetCurrentMenu();
	}
};

/**
 * Updates the document title.
 */
EditorUi.prototype.updateDocumentTitle = function()
{
	var title = this.editor.getOrCreateFilename();
	
	if (this.editor.appName != null)
	{
		title += ' - ' + this.editor.appName;
	}
	
	document.title = title;
};

/**
 * Updates the document title.
 */
EditorUi.prototype.createHoverIcons = function()
{
	return new HoverIcons(this.editor.graph);
};

/**
 * Returns the URL for a copy of this editor with no state.
 */
EditorUi.prototype.redo = function()
{
	try
	{
		var graph = this.editor.graph;
		
		if (graph.isEditing())
		{
			document.execCommand('redo', false, null);
		}
		else
		{
			this.editor.undoManager.redo();
		}
	}
	catch (e)
	{
		// ignore all errors
	}
};

/**
 * Returns the URL for a copy of this editor with no state.
 */
EditorUi.prototype.undo = function()
{
	try
	{
		var graph = this.editor.graph;
	
		if (graph.isEditing())
		{
			// Stops editing and executes undo on graph if native undo
			// does not affect current editing value
			var value = graph.cellEditor.textarea.innerHTML;
			document.execCommand('undo', false, null);
	
			if (value == graph.cellEditor.textarea.innerHTML)
			{
				graph.stopEditing(true);
				this.editor.undoManager.undo();
			}
		}
		else
		{
			this.editor.undoManager.undo();
		}
	}
	catch (e)
	{
		// ignore all errors
	}
};

/**
 * Returns the URL for a copy of this editor with no state.
 */
EditorUi.prototype.canRedo = function()
{
	return this.editor.graph.isEditing() || this.editor.undoManager.canRedo();
};

/**
 * Returns the URL for a copy of this editor with no state.
 */
EditorUi.prototype.canUndo = function()
{
	return this.editor.graph.isEditing() || this.editor.undoManager.canUndo();
};

/**
 * 
 */
EditorUi.prototype.replaceDiagramData = function(data)
{
	this.editor.graph.model.beginUpdate();
	try
	{
		this.editor.setGraphXml(mxUtils.parseXml(data).documentElement);
	}
	finally
	{
		this.editor.graph.model.endUpdate();				
	}
};

/**
 * 
 */
EditorUi.prototype.getEditBlankXml = function()
{
	return mxUtils.getXml(this.editor.getGraphXml());
};

/**
 * Returns the URL for a copy of this editor with no state.
 */
EditorUi.prototype.getUrl = function(pathname)
{
	var href = (pathname != null) ? pathname : window.location.pathname;
	var parms = (href.indexOf('?') > 0) ? 1 : 0;
	
	// Removes template URL parameter for new blank diagram
	for (var key in urlParams)
	{
		if (parms == 0)
		{
			href += '?';
		}
		else
		{
			href += '&';
		}
	
		href += key + '=' + urlParams[key];
		parms++;
	}
	
	return href;
};

/**
 * Specifies if the graph has scrollbars.
 */
EditorUi.prototype.setScrollbars = function(value)
{
	var graph = this.editor.graph;
	var prev = graph.container.style.overflow;
	graph.scrollbars = value;
	this.editor.updateGraphComponents();

	if (prev != graph.container.style.overflow)
	{
		graph.container.scrollTop = 0;
		graph.container.scrollLeft = 0;
		graph.view.scaleAndTranslate(1, 0, 0);
		this.resetScrollbars();
	}
	
	this.fireEvent(new mxEventObject('scrollbarsChanged'));
};

/**
 * Function: fitDiagramToWindow
 * 
 * Zooms the diagram to fit into the window.
 */
EditorUi.prototype.fitDiagramToWindow = function()
{
	var graph = this.editor.graph;
	var bounds = (graph.isSelectionEmpty()) ?
		mxRectangle.fromRectangle(graph.getGraphBounds()) :
		graph.getBoundingBox(graph.getSelectionCells())
	var t = graph.view.translate;
	var s = graph.view.scale;
	
	bounds.x = bounds.x / s - t.x;
	bounds.y = bounds.y / s - t.y;
	bounds.width /= s;
	bounds.height /= s;

	if (graph.backgroundImage != null)
	{
		bounds.add(new mxRectangle(0, 0,
			graph.backgroundImage.width,
			graph.backgroundImage.height));
	}

	if (bounds.width == 0 || bounds.height == 0)
	{
		graph.zoomTo(1);
		this.resetScrollbars();
	}
	else
	{
		var b = Editor.fitWindowBorders;
		
		if (b != null)
		{
			bounds.x -= b.x;
			bounds.y -= b.y;
			bounds.width += b.width + b.x;
			bounds.height += b.height + b.y;
		}
		
		graph.fitWindow(bounds);
	}
};

/**
 * Returns true if the graph has scrollbars.
 */
EditorUi.prototype.hasScrollbars = function()
{
	return this.editor.graph.scrollbars;
};

/**
 * Resets the state of the scrollbars.
 */
EditorUi.prototype.resetScrollbars = function()
{
	var graph = this.editor.graph;
	var c = graph.container;
	
	if (!this.editor.extendCanvas)
	{
		c.scrollTop = 0;
		c.scrollLeft = 0;
	
		if (!mxUtils.hasScrollbars(c))
		{
			graph.view.setTranslate(0, 0);
		}
	}
	else if (!this.editor.isChromelessView())
	{
		if (mxUtils.hasScrollbars(c))
		{
			if (graph.pageVisible)
			{
				var pad = graph.getPagePadding();
				c.scrollTop = Math.floor(pad.y - this.editor.initialTopSpacing) - 1;
				c.scrollLeft = Math.floor(Math.min(pad.x,
					(c.scrollWidth - c.clientWidth) / 2)) - 1;

				// Scrolls graph to visible area
				var bounds = graph.getGraphBounds();
				
				if (bounds.width > 0 && bounds.height > 0)
				{
					if (bounds.x > c.scrollLeft + c.clientWidth * 0.9)
					{
						c.scrollLeft = Math.min(bounds.x + bounds.width - c.clientWidth, bounds.x - 10);
					}
					
					if (bounds.y > c.scrollTop + c.clientHeight * 0.9)
					{
						c.scrollTop = Math.min(bounds.y + bounds.height - c.clientHeight, bounds.y - 10);
					}
				}
			}
			else
			{
				var bounds = graph.getGraphBounds();

				if (bounds.width == 0 && bounds.height == 0)
				{
					c.scrollLeft = (c.scrollWidth - c.clientWidth) / 2;
					c.scrollTop = (c.scrollHeight - c.clientHeight) / 2;
				}
				else
				{
					var width = Math.max(bounds.width, graph.scrollTileSize.width * graph.view.scale);
					var height = Math.max(bounds.height, graph.scrollTileSize.height * graph.view.scale);

					c.scrollLeft = Math.floor(Math.max(0, bounds.x - Math.max(0, (c.clientWidth - width) / 2)));
					c.scrollTop = Math.floor(Math.max(0, bounds.y - Math.max(20, (c.clientHeight - height) / 4)));
				}
			}
		}
		else
		{
			var b = mxRectangle.fromRectangle((graph.pageVisible) ?
				graph.view.getBackgroundPageBounds() :
				graph.getGraphBounds())
			var tr = graph.view.translate;
			var s = graph.view.scale;
            b.x = b.x / s - tr.x;
            b.y = b.y / s - tr.y;
            b.width /= s;
            b.height /= s;
            
            var dy = (graph.pageVisible) ? 0 : Math.max(0, (c.clientHeight - b.height) / 4); 
            
			graph.view.setTranslate(Math.floor(Math.max(0,
				(c.clientWidth - b.width) / 2) - b.x + 2),
				Math.floor(dy - b.y + 1));
		}
	}
};

/**
 * Loads the stylesheet for this graph.
 */
EditorUi.prototype.setPageVisible = function(value)
{
	var graph = this.editor.graph;
	var hasScrollbars = mxUtils.hasScrollbars(graph.container);
	var tx = 0;
	var ty = 0;
	
	if (hasScrollbars)
	{
		tx = graph.view.translate.x * graph.view.scale - graph.container.scrollLeft;
		ty = graph.view.translate.y * graph.view.scale - graph.container.scrollTop;
	}
	
	graph.pageVisible = value;
	graph.pageBreaksVisible = value; 
	graph.preferPageSize = value;
	graph.view.validateBackground();

	// Workaround for possible handle offset
	if (hasScrollbars)
	{
		var cells = graph.getSelectionCells();
		graph.clearSelection();
		graph.setSelectionCells(cells);
	}
	
	// Calls updatePageBreaks
	graph.sizeDidChange();
	
	if (hasScrollbars)
	{
		graph.container.scrollLeft = graph.view.translate.x * graph.view.scale - tx;
		graph.container.scrollTop = graph.view.translate.y * graph.view.scale - ty;
	}
	
	graph.defaultPageVisible = value;
	this.fireEvent(new mxEventObject('pageViewChanged'));
};

/**
 * Loads the stylesheet for this graph.
 */
EditorUi.prototype.installResizeHandler = function(dialog, resizable, destroy)
{
	if (resizable)
	{
		dialog.window.setSize = function(w, h)
		{
			if (!this.minimized)
			{
				var iw = window.innerWidth || document.body.clientWidth || document.documentElement.clientWidth;
				var ih = window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight;
				w = Math.min(w, iw - this.getX());
				h = Math.min(h, ih - this.getY());
			}

			mxWindow.prototype.setSize.apply(this, arguments);
		};
	}	

	dialog.window.setLocation = function(x, y)
	{
		var iw = window.innerWidth || document.body.clientWidth || document.documentElement.clientWidth;
		var ih = window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight;
		
		var w = parseInt(this.div.style.width);
		var h = parseInt(this.div.style.height);

		x = Math.max(0, Math.min(x, iw - w));
		y = Math.max(0, Math.min(y, ih - h));

		if (this.getX() != x || this.getY() != y)
		{
			mxWindow.prototype.setLocation.apply(this, arguments);
		}

		if (resizable && !this.minimized)
		{
			this.setSize(w, h);
		}
	};
	
	var resizeListener = mxUtils.bind(this, function()
	{
		var x = dialog.window.getX();
		var y = dialog.window.getY();
		
		dialog.window.setLocation(x, y);
	});
	
	mxEvent.addListener(window, 'resize', resizeListener);

	dialog.destroy = function()
	{
		mxEvent.removeListener(window, 'resize', resizeListener);
		dialog.window.destroy();

		if (destroy != null)
		{
			destroy();
		}
	}
};

/**
 * Class: ChangeGridColor
 *
 * Undoable change to grid color.
 */
function ChangeGridColor(ui, color)
{
	this.ui = ui;
	this.color = color;
};

/**
 * Executes selection of a new page.
 */
ChangeGridColor.prototype.execute = function()
{
	var temp = this.ui.editor.graph.view.gridColor;
	this.ui.setGridColor(this.color);
	this.color = temp;
};

// Registers codec for ChangePageSetup
(function()
{
	var codec = new mxObjectCodec(new ChangeGridColor(), ['ui']);

	mxCodecRegistry.register(codec);
})();

/**
 * Change types
 */
function ChangePageSetup(ui, color, image, format, pageScale)
{
	this.ui = ui;
	this.color = color;
	this.previousColor = color;
	this.image = image;
	this.previousImage = image;
	this.format = format;
	this.previousFormat = format;
	this.pageScale = pageScale;
	this.previousPageScale = pageScale;
	
	// Needed since null are valid values for color and image
	this.ignoreColor = false;
	this.ignoreImage = false;
}

/**
 * Implementation of the undoable page rename.
 */
ChangePageSetup.prototype.execute = function()
{
	var graph = this.ui.editor.graph;
	
	if (!this.ignoreColor)
	{
		this.color = this.previousColor;
		var tmp = graph.background;
		this.ui.setBackgroundColor(this.previousColor);
		this.previousColor = tmp;
	}
	
	if (!this.ignoreImage)
	{
		this.image = this.previousImage;
		var tmp = graph.backgroundImage;
		var img = this.previousImage;

		if (img != null && Graph.isPageLink(img.src))
		{
			img = this.ui.createImageForPageLink(img.src, this.ui.currentPage);
		}

		this.ui.setBackgroundImage(img);
		this.previousImage = tmp;
	}
	
	if (this.previousFormat != null)
	{
		this.format = this.previousFormat;
		var tmp = graph.pageFormat;
		
		if (this.previousFormat.width != tmp.width ||
			this.previousFormat.height != tmp.height)
		{
			this.ui.setPageFormat(this.previousFormat);
			this.previousFormat = tmp;
		}
	}

    if (this.foldingEnabled != null && this.foldingEnabled != this.ui.editor.graph.foldingEnabled)
    {
    	this.ui.setFoldingEnabled(this.foldingEnabled);
        this.foldingEnabled = !this.foldingEnabled;
    }

    if (this.previousPageScale != null)
    {
	    var currentPageScale = this.ui.editor.graph.pageScale;
	    
	    if (this.previousPageScale != currentPageScale)
	    {
	    	this.ui.setPageScale(this.previousPageScale);
	        this.previousPageScale = currentPageScale;
	    }
    }
};

// Registers codec for ChangePageSetup
(function()
{
	var codec = new mxObjectCodec(new ChangePageSetup(),  ['ui', 'previousColor', 'previousImage', 'previousFormat', 'previousPageScale']);

	codec.afterDecode = function(dec, node, obj)
	{
		obj.previousColor = obj.color;
		obj.previousImage = obj.image;
		obj.previousFormat = obj.format;
		obj.previousPageScale = obj.pageScale;

        if (obj.foldingEnabled != null)
        {
        	obj.foldingEnabled = !obj.foldingEnabled;
        }
       
		return obj;
	};
	
	mxCodecRegistry.register(codec);
})();

/**
 * Loads the stylesheet for this graph.
 */
EditorUi.prototype.setBackgroundColor = function(value)
{
	this.editor.graph.background = value;
	this.editor.graph.view.validateBackground();

	this.fireEvent(new mxEventObject('backgroundColorChanged'));
};

/**
 * Loads the stylesheet for this graph.
 */
EditorUi.prototype.setFoldingEnabled = function(value)
{
	this.editor.graph.foldingEnabled = value;
	this.editor.graph.view.revalidate();
	
	this.fireEvent(new mxEventObject('foldingEnabledChanged'));
};

/**
 * Loads the stylesheet for this graph.
 */
EditorUi.prototype.setPageFormat = function(value, ignorePageVisible)
{
	ignorePageVisible = (ignorePageVisible != null) ? ignorePageVisible : urlParams['sketch'] == '1';
	this.editor.graph.pageFormat = value;
	
	if (!ignorePageVisible)
	{
		if (!this.editor.graph.pageVisible)
		{
			this.actions.get('pageView').funct();
		}
		else
		{
			this.editor.graph.view.validateBackground();
			this.editor.graph.sizeDidChange();
		}
	}

	this.fireEvent(new mxEventObject('pageFormatChanged'));
};

/**
 * Loads the stylesheet for this graph.
 */
EditorUi.prototype.setPageScale = function(value)
{
	this.editor.graph.pageScale = value;
	
	if (!this.editor.graph.pageVisible)
	{
		this.actions.get('pageView').funct();
	}
	else
	{
		this.editor.graph.view.validateBackground();
		this.editor.graph.sizeDidChange();
	}

	this.fireEvent(new mxEventObject('pageScaleChanged'));
};

/**
 * Loads the stylesheet for this graph.
 */
EditorUi.prototype.setGridColor = function(value)
{
	this.editor.graph.view.gridColor = value;
	this.editor.graph.view.validateBackground();
	this.fireEvent(new mxEventObject('gridColorChanged'));
};

/**
 * Updates the states of the given undo/redo items.
 */
EditorUi.prototype.addUndoListener = function()
{
	var undoMgr = this.editor.undoManager;
	
    var undoListener = mxUtils.bind(this, function()
    {
		this.updateActionStates();
    });

    undoMgr.addListener(mxEvent.ADD, undoListener);
    undoMgr.addListener(mxEvent.UNDO, undoListener);
    undoMgr.addListener(mxEvent.REDO, undoListener);
    undoMgr.addListener(mxEvent.CLEAR, undoListener);
	
	// Overrides cell editor to update action states
	var cellEditorStartEditing = this.editor.graph.cellEditor.startEditing;
	
	this.editor.graph.cellEditor.startEditing = function()
	{
		cellEditorStartEditing.apply(this, arguments);
		undoListener();
	};
	
	var cellEditorStopEditing = this.editor.graph.cellEditor.stopEditing;
	
	this.editor.graph.cellEditor.stopEditing = function(cell, trigger)
	{
		cellEditorStopEditing.apply(this, arguments);
		undoListener();
	};
	
	// Updates the button states once
    undoListener();
};

/**
* Updates the states of the given toolbar items based on the selection.
*/
EditorUi.prototype.updateActionStates = function()
{
	var graph = this.editor.graph;
	var ss = this.getSelectionState();
    var unlocked = graph.isEnabled() && !graph.isCellLocked(graph.getDefaultParent());
	var editable = !this.editor.chromeless || this.editor.editable;

	// Updates action states
	var actions = ['cut', 'copy', 'bold', 'italic', 'underline', 'delete', 'duplicate',
	               'editStyle', 'editTooltip', 'editLink', 'backgroundColor', 'borderColor',
	               'edit', 'toFront', 'toBack', 'solid', 'dashed', 'pasteSize',
	               'dotted', 'fillColor', 'gradientColor', 'shadow', 'fontColor',
	               'formattedText', 'rounded', 'toggleRounded', 'strokeColor',
				   'sharp', 'snapToGrid'];
	
	for (var i = 0; i < actions.length; i++)
	{
		this.actions.get(actions[i]).setEnabled(ss.cells.length > 0);
	}

	this.actions.get('grid').setEnabled(editable);
	this.actions.get('undo').setEnabled(this.canUndo() && editable);
	this.actions.get('redo').setEnabled(this.canRedo() && editable);
	this.actions.get('swap').setEnabled(ss.cells.length == 2 && ss.vertices.length == 2);
	this.actions.get('pasteSize').setEnabled(this.copiedSize != null && ss.vertices.length > 0);
	this.actions.get('pasteData').setEnabled(this.copiedValue != null && ss.cells.length > 0);
	this.actions.get('setAsDefaultStyle').setEnabled(graph.getSelectionCount() == 1);
	this.actions.get('lockUnlock').setEnabled(!graph.isSelectionEmpty());
	this.actions.get('bringForward').setEnabled(ss.cells.length == 1);
	this.actions.get('sendBackward').setEnabled(ss.cells.length == 1);
	this.actions.get('rotation').setEnabled(ss.vertices.length == 1);
	this.actions.get('wordWrap').setEnabled(ss.vertices.length == 1);
	this.actions.get('autosize').setEnabled(ss.vertices.length > 0);
	this.actions.get('copySize').setEnabled(ss.vertices.length == 1);
	this.actions.get('clearWaypoints').setEnabled(ss.connections);
	this.actions.get('curved').setEnabled(ss.edges.length > 0);
	this.actions.get('turn').setEnabled(ss.cells.length > 0);
	this.actions.get('group').setEnabled(!ss.row && !ss.cell &&
		(ss.cells.length > 1 || (ss.vertices.length == 1 &&
		graph.model.getChildCount(ss.cells[0]) == 0 &&
		!graph.isContainer(ss.vertices[0]))));
	this.actions.get('ungroup').setEnabled(!ss.row && !ss.cell && !ss.table &&
		ss.vertices.length > 0 && (graph.isContainer(ss.vertices[0]) ||
		graph.getModel().getChildCount(ss.vertices[0]) > 0));
   	this.actions.get('removeFromGroup').setEnabled(ss.cells.length == 1 &&
   		graph.getModel().isVertex(graph.getModel().getParent(ss.cells[0])));
	this.actions.get('collapsible').setEnabled(ss.vertices.length == 1 &&
		(graph.model.getChildCount(ss.vertices[0]) > 0 ||
		graph.isContainer(ss.vertices[0])));
		this.actions.get('exitGroup').setEnabled(graph.view.currentRoot != null);
	this.actions.get('home').setEnabled(graph.view.currentRoot != null);
	this.actions.get('enterGroup').setEnabled(ss.cells.length == 1 &&
		graph.isValidRoot(ss.cells[0]));
	this.actions.get('copyData').setEnabled(ss.cells.length == 1);
	this.actions.get('editLink').setEnabled(ss.cells.length == 1);
	this.actions.get('editStyle').setEnabled(ss.cells.length == 1);
	this.actions.get('editTooltip').setEnabled(ss.cells.length == 1);
	this.actions.get('openLink').setEnabled(ss.cells.length == 1 &&
		graph.getLinkForCell(ss.cells[0]) != null);
	this.actions.get('guides').setEnabled(graph.isEnabled());
    this.actions.get('selectVertices').setEnabled(unlocked);
    this.actions.get('selectEdges').setEnabled(unlocked);
    this.actions.get('selectAll').setEnabled(unlocked);
    this.actions.get('selectNone').setEnabled(unlocked);
	
	var foldable = ss.vertices.length == 1 &&
		graph.isCellFoldable(ss.vertices[0]);
	this.actions.get('expand').setEnabled(foldable);
	this.actions.get('collapse').setEnabled(foldable);

	// Updates menu states
    this.menus.get('navigation').setEnabled(ss.cells.length > 0 ||
		graph.view.currentRoot != null);
    this.menus.get('layout').setEnabled(unlocked);
    this.menus.get('insert').setEnabled(unlocked);
    this.menus.get('direction').setEnabled(ss.unlocked &&
		ss.vertices.length == 1);
    this.menus.get('distribute').setEnabled(ss.unlocked &&
		ss.vertices.length > 1);
    this.menus.get('align').setEnabled(ss.unlocked &&
		ss.cells.length > 0);

    this.updatePasteActionStates();
};

EditorUi.prototype.zeroOffset = new mxPoint(0, 0);

EditorUi.prototype.getDiagramContainerOffset = function()
{
	return this.zeroOffset;
};

/**
 * Refreshes the viewport.
 */
EditorUi.prototype.refresh = function(sizeDidChange)
{
	sizeDidChange = (sizeDidChange != null) ? sizeDidChange : true;
	
	var w = this.container.clientWidth;
	var h = this.container.clientHeight;

	if (this.container == document.body)
	{
		w = document.body.clientWidth || document.documentElement.clientWidth;
		h = document.documentElement.clientHeight;
	}
	
	// Workaround for bug on iOS see
	// http://stackoverflow.com/questions/19012135/ios-7-ipad-safari-landscape-innerheight-outerheight-layout-issue
	// FIXME: Fix if footer visible
	var off = 0;

	if (mxClient.IS_IOS && !window.navigator.standalone && typeof Menus !== 'undefined')
	{
		if (window.innerHeight != document.documentElement.clientHeight)
		{
			off = document.documentElement.clientHeight - window.innerHeight;
			window.scrollTo(0, 0);
		}
	}
	
	var effHsplitPosition = Math.max(0, Math.min(
		this.hsplitPosition, w - this.splitSize - 40));
	var tmp = 0;
	
	if (this.menubar != null)
	{
		this.menubarContainer.style.height = this.menubarHeight + 'px';
		tmp += this.menubarHeight;
	}
	
	if (this.toolbar != null)
	{
		this.toolbarContainer.style.top = this.menubarHeight + 'px';
		this.toolbarContainer.style.height = this.toolbarHeight + 'px';
		tmp += this.toolbarHeight;
	}
	
	if (tmp > 0)
	{
		tmp += 1;
	}
	
	var fw = (this.format != null) ? this.formatWidth : 0;
	this.sidebarContainer.style.top = tmp + 'px';
	this.sidebarContainer.style.width = effHsplitPosition + 'px';
	this.formatContainer.style.top = tmp + 'px';
	this.formatContainer.style.width = fw + 'px';
	this.formatContainer.style.display = (this.format != null) ? '' : 'none';
	
	var diagContOffset = this.getDiagramContainerOffset();
	var contLeft = (this.hsplit.parentNode != null) ? (effHsplitPosition) : 0;
	this.footerContainer.style.height = this.footerHeight + 'px';
	this.hsplit.style.top = this.sidebarContainer.style.top;
	this.hsplit.style.left = effHsplitPosition + 'px';
	this.footerContainer.style.display = (this.footerHeight == 0) ? 'none' : '';
	
	if (this.tabContainer != null)
	{
		this.tabContainer.style.left = contLeft + 'px';
		this.hsplit.style.bottom = this.tabContainer.offsetHeight + 'px';
	}
	else
	{
		this.hsplit.style.bottom = (this.footerHeight + off) + 'px';
	}

	if (this.footerHeight > 0)
	{
		this.footerContainer.style.bottom = off + 'px';
	}
	
	var th = 0;
	
	if (this.tabContainer != null)
	{
		this.tabContainer.style.bottom = (this.footerHeight + off) + 'px';
		this.tabContainer.style.right = fw + 'px';
		th = this.tabContainer.clientHeight;
		this.checkTabScrollerOverflow();
	}
	
	this.sidebarContainer.style.bottom = (this.footerHeight + off) + 'px';
	this.formatContainer.style.bottom = (this.footerHeight + off) + 'px';

	this.diagramContainer.style.left =  (contLeft + diagContOffset.x) + 'px';
	this.diagramContainer.style.top = (tmp + diagContOffset.y) + 'px';
	this.diagramContainer.style.right = fw + 'px';
	this.diagramContainer.style.bottom = (this.footerHeight + off + th) + 'px';
	
	if (sizeDidChange)
	{
		this.editor.graph.sizeDidChange();
	}
};

/**
 * Creates the required containers.
 */
EditorUi.prototype.createTabContainer = function()
{
	return null;
};

/**
 * Creates the required containers.
 */
EditorUi.prototype.createDivs = function()
{
	this.menubarContainer = this.createDiv('geMenubarContainer');
	this.toolbarContainer = this.createDiv('geToolbarContainer');
	this.sidebarContainer = this.createDiv('geSidebarContainer');
	this.formatContainer = this.createDiv('geSidebarContainer geFormatContainer');
	this.diagramContainer = this.createDiv('geDiagramContainer');
	this.footerContainer = this.createDiv('geFooterContainer');
	this.hsplit = this.createDiv('geHsplit');

	// Sets static style for containers
	this.menubarContainer.style.top = '0px';
	this.menubarContainer.style.left = '0px';
	this.menubarContainer.style.right = '0px';
	this.toolbarContainer.style.left = '0px';
	this.toolbarContainer.style.right = '0px';
	this.sidebarContainer.style.left = '0px';
	this.sidebarContainer.style.zIndex = '1';
	this.formatContainer.style.right = '0px';
	this.formatContainer.style.zIndex = '1';
	this.diagramContainer.style.right = ((this.format != null) ? this.formatWidth : 0) + 'px';
	this.footerContainer.style.left = '0px';
	this.footerContainer.style.right = '0px';
	this.footerContainer.style.bottom = '0px';
	this.footerContainer.style.zIndex = mxPopupMenu.prototype.zIndex - 3;
	this.hsplit.style.width = this.splitSize + 'px';
	this.hsplit.style.zIndex = '1';
	
	if (!this.editor.chromeless)
	{
		this.tabContainer = this.createTabContainer();
	}
	else
	{
		this.diagramContainer.style.border = 'none';
	}
};

/**
 * Hook for sidebar footer container. This implementation returns null.
 */
EditorUi.prototype.createSidebarContainer = function()
{
	var div = document.createElement('div');
	div.className = 'geSidebarContainer';

	return div;
};

/**
 * Creates the required containers.
 */
EditorUi.prototype.createUi = function()
{
	// Creates menubar
	this.menubar = (this.editor.chromeless) ? null : this.menus.createMenubar(this.createDiv('geMenubar'));
	
	if (this.menubar != null)
	{
		this.menubarContainer.appendChild(this.menubar.container);
	}
	
	// Adds status bar in menubar
	if (this.menubar != null)
	{
		this.statusContainer = this.createStatusContainer();
	
		// Connects the status bar to the editor status
		this.editor.addListener('statusChanged', mxUtils.bind(this, function()
		{
			this.setStatusText(this.editor.getStatus());
		}));
	
		this.setStatusText(this.editor.getStatus());
		this.menubar.container.appendChild(this.statusContainer);
		
		// Inserts into DOM
		this.container.appendChild(this.menubarContainer);
	}

	// Creates the sidebar
	this.sidebar = (this.editor.chromeless) ? null : this.createSidebar(this.sidebarContainer);
	
	if (this.sidebar != null)
	{
		this.container.appendChild(this.sidebarContainer);
	}
	
	// Creates the format sidebar
	this.format = (this.editor.chromeless || !this.formatEnabled) ? null : this.createFormat(this.formatContainer);
	
	if (this.format != null)
	{
		this.container.appendChild(this.formatContainer);
	}
	
	// Creates the footer
	var footer = (this.editor.chromeless) ? null : this.createFooter();
	
	if (footer != null)
	{
		this.footerContainer.appendChild(footer);
		this.container.appendChild(this.footerContainer);
	}

	this.container.appendChild(this.diagramContainer);

	if (this.container != null && this.tabContainer != null)
	{
		this.container.appendChild(this.tabContainer);
	}

	// Creates toolbar
	this.toolbar = (this.editor.chromeless) ? null : this.createToolbar(this.createDiv('geToolbar'));
	
	if (this.toolbar != null)
	{
		this.toolbarContainer.appendChild(this.toolbar.container);
		this.container.appendChild(this.toolbarContainer);
	}

	// HSplit
	if (this.sidebar != null)
	{
		this.container.appendChild(this.hsplit);
		
		this.addSplitHandler(this.hsplit, true, 0, mxUtils.bind(this, function(value)
		{
			this.hsplitPosition = value;
			this.refresh();
		}));
	}
};

/**
 * Creates a new toolbar for the given container.
 */
EditorUi.prototype.createStatusContainer = function()
{
	var container = document.createElement('a');
	container.className = 'geItem geStatus';

	// Handles data-action attribute
	mxEvent.addListener(container, 'click', mxUtils.bind(this, function(evt)
	{
		var elt = mxEvent.getSource(evt);

		if (elt != container)
		{
			while (elt.parentNode != container)
			{
				elt = elt.parentNode;
			}
		}
		
		if (elt.nodeName != 'A')
		{
			var name = elt.getAttribute('data-action');

			// Make generic
			if (name == 'statusFunction' && this.editor.statusFunction != null)
			{
				this.editor.statusFunction();
			}
			else if (name != null)
			{
				var action = this.actions.get(name);

				if (action != null)
				{
					action.funct();
				}
			}
			else
			{
				var title = elt.getAttribute('data-title');
				var msg = elt.getAttribute('data-message');

				if (title != null && msg != null)
				{
					this.showError(title, msg);
				}
				else
				{
					var link = elt.getAttribute('data-link');

					if (link != null)
					{
						this.editor.graph.openLink(link);
					}
				}
			}

			mxEvent.consume(evt);
		}
	}));

	return container;
};

/**
 * Creates a new toolbar for the given container.
 */
EditorUi.prototype.setStatusText = function(value)
{
	this.statusContainer.innerHTML = Graph.sanitizeHtml(value);

	// Wraps simple status messages in a div for styling
	if (this.statusContainer.getElementsByTagName('div').length == 0 &&
		value != null && value.length > 0)
	{
		this.statusContainer.innerText = '';
		var div = this.createStatusDiv(value);
		this.statusContainer.appendChild(div);
	}

	// Handles data-effect attribute
	var spans = this.statusContainer.querySelectorAll('[data-effect="fade"]');

	if (spans != null)
	{
		for (var i = 0; i < spans.length; i++)
		{
			(function(temp)
			{
				mxUtils.setOpacity(temp, 0);
				mxUtils.setPrefixedStyle(temp.style, 'transform', 'scaleX(0)');
				mxUtils.setPrefixedStyle(temp.style, 'transition', 'all 0.2s ease');
				
				window.setTimeout(mxUtils.bind(this, function()
				{
					mxUtils.setOpacity(temp, 100);
					mxUtils.setPrefixedStyle(temp.style, 'transform', 'scaleX(1)');
					mxUtils.setPrefixedStyle(temp.style, 'transition', 'all 1s ease');
					
					window.setTimeout(mxUtils.bind(this, function()
					{
						mxUtils.setPrefixedStyle(temp.style, 'transform', 'scaleX(0)');
						mxUtils.setOpacity(temp, 0);
		
						window.setTimeout(mxUtils.bind(this, function()
						{
							if (temp.parentNode != null)
							{
								temp.parentNode.removeChild(temp);
							}
						}), 1000);
					}), Editor.updateStatusInterval / 2);
				}), 0);
			})(spans[i]);
		}
	}		
};

/**
 * Creates a new toolbar for the given container.
 */
EditorUi.prototype.createStatusDiv = function(value)
{
	var div = document.createElement('div');
	div.style.textOverflow = 'ellipsis';
	div.style.display = 'inline-block';
	div.style.whiteSpace = 'nowrap';
	div.style.overflow = 'hidden';
	div.style.minWidth = '0';

	div.setAttribute('title', value);
	div.innerHTML = Graph.sanitizeHtml(value);

	return div;
};

/**
 * Creates a new toolbar for the given container.
 */
EditorUi.prototype.createToolbar = function(container)
{
	return new Toolbar(this, container);
};

/**
 * Creates a new sidebar for the given container.
 */
EditorUi.prototype.createSidebar = function(container)
{
	return new Sidebar(this, container);
};

/**
 * Creates a new sidebar for the given container.
 */
EditorUi.prototype.createFormat = function(container)
{
	return new Format(this, container);
};

/**
 * Creates and returns a new footer.
 */
EditorUi.prototype.createFooter = function()
{
	return this.createDiv('geFooter');
};

/**
 * Creates the actual toolbar for the toolbar container.
 */
EditorUi.prototype.createDiv = function(classname)
{
	var elt = document.createElement('div');
	elt.className = classname;
	
	return elt;
};

/**
 * Updates the states of the given undo/redo items.
 */
EditorUi.prototype.addSplitHandler = function(elt, horizontal, dx, onChange)
{
	var start = null;
	var initial = null;
	var ignoreClick = true;
	var last = null;

	// Disables built-in pan and zoom in IE10 and later
	if (mxClient.IS_POINTER)
	{
		elt.style.touchAction = 'none';
	}
	
	var getValue = mxUtils.bind(this, function()
	{
		var result = parseInt(((horizontal) ? elt.style.left : elt.style.bottom));
	
		// Takes into account hidden footer
		if (!horizontal)
		{
			result = result + dx - this.footerHeight;
		}
		
		return result;
	});

	function moveHandler(evt)
	{
		if (start != null)
		{
			var pt = new mxPoint(mxEvent.getClientX(evt), mxEvent.getClientY(evt));
			onChange(Math.max(0, initial + ((horizontal) ? (pt.x - start.x) : (start.y - pt.y)) - dx));
			mxEvent.consume(evt);
			
			if (initial != getValue())
			{
				ignoreClick = true;
				last = null;
			}
		}
	};
	
	function dropHandler(evt)
	{
		moveHandler(evt);
		initial = null;
		start = null;
	};
	
	mxEvent.addGestureListeners(elt, function(evt)
	{
		start = new mxPoint(mxEvent.getClientX(evt), mxEvent.getClientY(evt));
		initial = getValue();
		ignoreClick = false;
		mxEvent.consume(evt);
	});
	
	mxEvent.addListener(elt, 'click', mxUtils.bind(this, function(evt)
	{
		if (!ignoreClick && this.hsplitClickEnabled)
		{
			var next = (last != null) ? last - dx : 0;
			last = getValue();
			onChange(next);
			mxEvent.consume(evt);
		}
	}));

	mxEvent.addGestureListeners(document, null, moveHandler, dropHandler);
	
	this.destroyFunctions.push(function()
	{
		mxEvent.removeGestureListeners(document, null, moveHandler, dropHandler);
	});	
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
EditorUi.prototype.prompt = function(title, defaultValue, fn)
{
	var dlg = new FilenameDialog(this, defaultValue, mxResources.get('apply'), function(newValue)
	{
		fn(parseFloat(newValue));
	}, title);

	this.showDialog(dlg.container, 300, 80, true, true);
	dlg.init();
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
EditorUi.prototype.handleError = function(resp, title, fn, invokeFnOnClose, notFoundMessage)
{
	var e = (resp != null && resp.error != null) ? resp.error : resp;

	if (e != null || title != null)
	{
		var msg = mxUtils.htmlEntities(mxResources.get('unknownError'));
		var btn = mxResources.get('ok');
		title = (title != null) ? title : mxResources.get('error');
		
		if (e != null && e.message != null)
		{
			msg = mxUtils.htmlEntities(e.message);
		}

		this.showError(title, msg, btn, fn, null, null, null, null, null,
			null, null, null, (invokeFnOnClose) ? fn : null);
	}
	else if (fn != null)
	{
		fn();
	}
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
EditorUi.prototype.showError = function(title, msg, btn, fn, retry, btn2, fn2, btn3, fn3, w, h, hide, onClose)
{
	var dlg = new ErrorDialog(this, title, msg, btn || mxResources.get('ok'),
		fn, retry, btn2, fn2, hide, btn3, fn3);
	var lines = Math.ceil((msg != null) ? msg.length / 50 : 1);
	this.showDialog(dlg.container, w || 340, h || (100 + lines * 20), true, false, onClose);
	dlg.init();
};

/**
 * Displays a print dialog.
 */
EditorUi.prototype.showDialog = function(elt, w, h, modal, closable, onClose, noScroll, transparent, onResize, ignoreBgClick)
{
	this.editor.graph.tooltipHandler.resetTimer();
	this.editor.graph.tooltipHandler.hideTooltip();
	
	if (this.dialogs == null)
	{
		this.dialogs = [];
	}
	
	this.dialog = new Dialog(this, elt, w, h, modal, closable, onClose, noScroll, transparent, onResize, ignoreBgClick);
	this.dialogs.push(this.dialog);
};

/**
 * Displays a print dialog.
 */
EditorUi.prototype.hideDialog = function(cancel, isEsc, matchContainer)
{
	if (this.dialogs != null && this.dialogs.length > 0)
	{
		if (matchContainer != null && matchContainer != this.dialog.container.firstChild)
		{
			return;
		}
		
		var dlg = this.dialogs.pop();
		
		if (dlg.close(cancel, isEsc) == false) 
		{
			//add the dialog back if dialog closing is cancelled
			this.dialogs.push(dlg);
			return;
		}
		
		this.dialog = (this.dialogs.length > 0) ? this.dialogs[this.dialogs.length - 1] : null;
		this.editor.fireEvent(new mxEventObject('hideDialog'));
		
		if (this.dialog == null && this.editor.graph.container != null &&
			this.editor.graph.container.style.visibility != 'hidden')
		{
			window.setTimeout(mxUtils.bind(this, function()
			{
				if (this.editor != null && (this.dialogs == null || this.dialogs.length == 0))
				{
					if (this.editor.graph.isEditing() && this.editor.graph.cellEditor.textarea != null)
					{
						this.editor.graph.cellEditor.textarea.focus();
					}
					else
					{
						mxUtils.clearSelection();
						this.editor.graph.container.focus();
					}
				}
			}), 0);
		}
	}
};

/**
 * Handles ctrl+enter keystroke to clone cells.
 */
EditorUi.prototype.ctrlEnter = function()
{
	var graph = this.editor.graph;

	if (graph.isEnabled())
	{
		try
		{
			var cells = graph.getSelectionCells();
		    var lookup = new mxDictionary();
		    var newCells = [];

		    for (var i = 0; i < cells.length; i++)
		    {
		    	// Clones table rows instead of cells
		    	var cell = (graph.isTableCell(cells[i])) ? graph.model.getParent(cells[i]) : cells[i];
		    	
		    	if (cell != null && !lookup.get(cell))
		    	{
		    		lookup.put(cell, true);
		            newCells.push(cell);
		        }
		    }
		    
			graph.setSelectionCells(graph.duplicateCells(newCells, false));
		}
		catch (e)
		{
			this.handleError(e);
		}
	}
};

/**
 * Display a color dialog.
 */
EditorUi.prototype.pickColor = function(color, apply)
{
	var graph = this.editor.graph;
	var selState = graph.cellEditor.saveSelection();
	var h = 230 + ((Math.ceil(ColorDialog.prototype.presetColors.length / 12) +
		Math.ceil(ColorDialog.prototype.defaultColors.length / 12)) * 17);
	
	var dlg = new ColorDialog(this, mxUtils.rgba2hex(color) || 'none', function(color)
	{
		graph.cellEditor.restoreSelection(selState);
		apply(color);
	}, function()
	{
		graph.cellEditor.restoreSelection(selState);
	});
	
	this.showDialog(dlg.container, 230, h, true, false);
	dlg.init();
};

/**
 * Adds the label menu items to the given menu and parent.
 */
EditorUi.prototype.openFile = function()
{
	// Closes dialog after open
	window.openFile = new OpenFile(mxUtils.bind(this, function(cancel)
	{
		this.hideDialog(cancel);
	}));

	// Removes openFile if dialog is closed
	this.showDialog(new OpenDialog(this).container, (Editor.useLocalStorage) ? 640 : 320,
			(Editor.useLocalStorage) ? 480 : 220, true, true, function()
	{
		window.openFile = null;
	});
};

/**
 * Extracs the graph model from the given HTML data from a data transfer event.
 */
EditorUi.prototype.extractGraphModelFromHtml = function(data)
{
	var result = null;
	
	try
	{
    	var idx = data.indexOf('&lt;mxGraphModel ');
    	
    	if (idx >= 0)
    	{
    		var idx2 = data.lastIndexOf('&lt;/mxGraphModel&gt;');
    		
    		if (idx2 > idx)
    		{
    			result = data.substring(idx, idx2 + 21).replace(/&gt;/g, '>').
    				replace(/&lt;/g, '<').replace(/\\&quot;/g, '"').replace(/\n/g, '');
    		}
    	}
	}
	catch (e)
	{
		// ignore
	}
	
	return result;
};

/**
 * Opens the given files in the editor.
 */
EditorUi.prototype.readGraphModelFromClipboard = function(fn)
{
	this.readGraphModelFromClipboardWithType(mxUtils.bind(this, function(xml)
	{
		if (xml != null)
		{
			fn(xml);
		}
		else
		{
			this.readGraphModelFromClipboardWithType(mxUtils.bind(this, function(xml)
			{
				if (xml != null)
				{
					var tmp = decodeURIComponent(xml);
							
					if (this.isCompatibleString(tmp))
					{
						xml = tmp;
					}
				}
				
				fn(xml);
			}), 'text');
		}
	}), 'html');
};

/**
 * Opens the given files in the editor.
 */
EditorUi.prototype.readGraphModelFromClipboardWithType = function(fn, type)
{
	navigator.clipboard.read().then(mxUtils.bind(this, function(data)
	{
		if (data != null && data.length > 0 && type == 'html' &&
			mxUtils.indexOf(data[0].types, 'text/html') >= 0)
		{
			data[0].getType('text/html').then(mxUtils.bind(this, function(blob)
			{
				blob.text().then(mxUtils.bind(this, function(value)
				{
					try
					{
						var elt = this.parseHtmlData(value);
						var asHtml = elt.getAttribute('data-type') != 'text/plain';
						
						// KNOWN: Paste from IE11 to other browsers on Windows
						// seems to paste the contents of index.html
						var xml = (asHtml) ? elt.innerHTML :
							mxUtils.trim((elt.innerText == null) ?
							mxUtils.getTextContent(elt) : elt.innerText);
		
						// Workaround for junk after XML in VM
						try
						{
							var idx = xml.lastIndexOf('%3E');
							
							if (idx >= 0 && idx < xml.length - 3)
							{
								xml = xml.substring(0, idx + 3);
							}
						}
						catch (e)
						{
							// ignore
						}
						
						// Checks for embedded XML content
						try
						{
							var spans = elt.getElementsByTagName('span');
							var tmp = (spans != null && spans.length > 0) ? 
								mxUtils.trim(decodeURIComponent(spans[0].textContent)) :
								decodeURIComponent(xml);
									
							if (this.isCompatibleString(tmp))
							{
								xml = tmp;
							}
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
					
					fn(this.isCompatibleString(xml) ? xml : null);
				}))['catch'](function(data)
				{
					fn(null);
				});
			}))['catch'](function(data)
			{
				fn(null);
			});
		}
		else if (data != null && data.length > 0 && type == 'text' &&
				mxUtils.indexOf(data[0].types, 'text/plain') >= 0)
		{
			data[0].getType('text/plain').then(function(blob)
			{
				blob.text().then(function(value)
				{
					fn(value);
				})['catch'](function()
				{
					fn(null);
				});
			})['catch'](function()
			{
				fn(null);
			});
		}
		else
		{
			fn(null);
		}
	}))['catch'](function(data)
	{
		fn(null);
	});
};

/**
 * Parses the given HTML data and returns a DIV.
 */
EditorUi.prototype.parseHtmlData = function(data)
{
	var elt = null;
	
	if (data != null && data.length > 0)
	{
		var hasMeta = data.substring(0, 6) == '<meta ';
		elt = document.createElement('div');
		elt.innerHTML = ((hasMeta) ? '<meta charset="utf-8">' : '') +
			Graph.sanitizeHtml(data);
		asHtml = true;
		
		// Workaround for innerText not ignoring style elements in Chrome
		var styles = elt.getElementsByTagName('style');
		
		if (styles != null)
		{
			while (styles.length > 0)
			{
				styles[0].parentNode.removeChild(styles[0]);
			}
		}
		
		// Special case of link pasting from Chrome
		if (elt.firstChild != null && elt.firstChild.nodeType == mxConstants.NODETYPE_ELEMENT &&
			elt.firstChild.nextSibling != null && elt.firstChild.nextSibling.nodeType == mxConstants.NODETYPE_ELEMENT &&
			elt.firstChild.nodeName == 'META' && elt.firstChild.nextSibling.nodeName == 'A' &&
			elt.firstChild.nextSibling.nextSibling == null)
		{
			var temp = (elt.firstChild.nextSibling.innerText == null) ?
				mxUtils.getTextContent(elt.firstChild.nextSibling) :
				elt.firstChild.nextSibling.innerText;
		
			if (temp == elt.firstChild.nextSibling.getAttribute('href'))
			{
				mxUtils.setTextContent(elt, temp);
				asHtml = false;
			}
		}

		// Extracts single image source address with meta tag in markup
		var img = (hasMeta && elt.firstChild != null) ? elt.firstChild.nextSibling : elt.firstChild;

		if (img != null && img.nextSibling == null &&
			img.nodeType == mxConstants.NODETYPE_ELEMENT &&
			img.nodeName == 'IMG')
		{
			var temp = img.getAttribute('src');
			
			if (temp != null)
			{
				if (Editor.isPngDataUrl(temp))
				{
					var xml = Editor.extractGraphModelFromPng(temp);
					
					if (xml != null && xml.length > 0)
					{
						temp = xml;
					}
				}

				mxUtils.setTextContent(elt, temp);
				asHtml = false;
			}
		}
		else
		{
			// Extracts embedded XML or image source address from single PNG image
			var images = elt.getElementsByTagName('img');

			if (images.length == 1)
			{
				var img = images[0];
				var temp = img.getAttribute('src');
				
				if (temp != null && img.parentNode == elt && elt.children.length == 1)
				{
					if (Editor.isPngDataUrl(temp))
					{
						var xml = Editor.extractGraphModelFromPng(temp);
						
						if (xml != null && xml.length > 0)
						{
							temp = xml;
						}
					}
					
					mxUtils.setTextContent(elt, temp);
					asHtml = false;
				}
			}
		}
		
		if (asHtml)
		{
			Graph.removePasteFormatting(elt);
		}
	}
	
	if (!asHtml)
	{
		elt.setAttribute('data-type', 'text/plain');
	}

	return elt;
};

/**
 * Opens the given files in the editor.
 */
EditorUi.prototype.extractGraphModelFromEvent = function(evt)
{
	var result = null;
	var data = null;
	
	if (evt != null)
	{
		var provider = (evt.dataTransfer != null) ?
			evt.dataTransfer : evt.clipboardData;
		
		if (provider != null)
		{
			if (document.documentMode == 10 || document.documentMode == 11)
			{
				data = provider.getData('Text');
			}
			else
			{
				data = (mxUtils.indexOf(provider.types, 'text/html') >= 0) ?
					provider.getData('text/html') : null;
			
				if (mxUtils.indexOf(provider.types, 'text/plain') >= 0 &&
					(data == null || data.length == 0))
				{
					data = provider.getData('text/plain');
				}
			}

			if (data != null)
			{
				data = Graph.zapGremlins(mxUtils.trim(data));
				
				// Tries parsing as HTML document with embedded XML
				var xml =  this.extractGraphModelFromHtml(data);
				
				if (xml != null)
				{
					data = xml;
				}
			}		
		}
	}
	
	if (data != null && this.isCompatibleString(data))
	{
		result = data;
	}
	
	return result;
};

/**
 * Hook for subclassers to return true if event data is a supported format.
 * This implementation always returns false.
 */
EditorUi.prototype.isCompatibleString = function(data)
{
	return false;
};

/**
 * Adds the label menu items to the given menu and parent.
 */
EditorUi.prototype.saveFile = function(forceDialog)
{
	if (!forceDialog && this.editor.filename != null)
	{
		this.save(this.editor.getOrCreateFilename());
	}
	else
	{
		var dlg = new FilenameDialog(this, this.editor.getOrCreateFilename(), mxResources.get('save'), mxUtils.bind(this, function(name)
		{
			this.save(name);
		}), null, mxUtils.bind(this, function(name)
		{
			if (name != null && name.length > 0)
			{
				return true;
			}
			
			mxUtils.confirm(mxResources.get('invalidName'));
			
			return false;
		}));
		this.showDialog(dlg.container, 300, 100, true, true);
		dlg.init();
	}
};

/**
 * Saves the current graph under the given filename.
 */
EditorUi.prototype.save = function(name)
{
	if (name != null)
	{
		if (this.editor.graph.isEditing())
		{
			this.editor.graph.stopEditing();
		}
		
		var xml = mxUtils.getXml(this.editor.getGraphXml());
		
		try
		{
			if (Editor.useLocalStorage)
			{
				if (localStorage.getItem(name) != null &&
					!mxUtils.confirm(mxResources.get('replaceIt', [name])))
				{
					return;
				}

				localStorage.setItem(name, xml);
				this.editor.setStatus(mxUtils.htmlEntities(mxResources.get('saved')) + ' ' + new Date());
			}
			else
			{
				if (xml.length < MAX_REQUEST_SIZE)
				{
					new mxXmlRequest(SAVE_URL, 'filename=' + encodeURIComponent(name) +
						'&xml=' + encodeURIComponent(xml)).simulate(document, '_blank');
				}
				else
				{
					mxUtils.alert(mxResources.get('drawingTooLarge'));
					mxUtils.popup(xml);
					
					return;
				}
			}

			this.editor.setModified(false);
			this.editor.setFilename(name);
			this.updateDocumentTitle();
		}
		catch (e)
		{
			this.editor.setStatus(mxUtils.htmlEntities(mxResources.get('errorSavingFile')));
		}
	}
};

/**
 * Executes the given array of graph layouts using executeLayout and
 * calls done after the last layout has finished.
 */
EditorUi.prototype.executeLayouts = function(layouts, post)
{
	this.executeLayout(mxUtils.bind(this, function()
	{
		var layout = new mxCompositeLayout(this.editor.graph, layouts);
		var cells = this.editor.graph.getSelectionCells();

		layout.execute(this.editor.graph.getDefaultParent(),
			cells.length == 0 ? null : cells);
	}), true, post);
};

/**
 * Executes the given layout.
 */
EditorUi.prototype.executeLayout = function(exec, animate, post)
{
	var graph = this.editor.graph;
	graph.getModel().beginUpdate();
	try
	{
		exec();
	}
	catch (e)
	{
		throw e;
	}
	finally
	{
		// Animates the changes in the graph model
		if (this.allowAnimation && animate && graph.isEnabled())
		{
			// New API for animating graph layout results asynchronously
			var morph = new mxMorphing(graph);
			morph.addListener(mxEvent.DONE, mxUtils.bind(this, function()
			{
				graph.getModel().endUpdate();
				
				if (post != null)
				{
					post();
				}
			}));
			
			morph.startAnimation();
		}
		else
		{
			graph.getModel().endUpdate();
			
			if (post != null)
			{
				post();
			}
		}
	}
};

/**
 * Hides the current menu.
 */
EditorUi.prototype.showImageDialog = function(title, value, fn, ignoreExisting)
{
	var cellEditor = this.editor.graph.cellEditor;
	var selState = cellEditor.saveSelection();
	var newValue = mxUtils.prompt(title, value);
	cellEditor.restoreSelection(selState);
	
	if (newValue != null && newValue.length > 0)
	{
		var img = new Image();
		
		img.onload = function()
		{
			fn(newValue, img.width, img.height);
		};
		img.onerror = function()
		{
			fn(null);
			mxUtils.alert(mxResources.get('fileNotFound'));
		};
		
		img.src = newValue;
	}
	else
	{
		fn(null);
	}
};

/**
 * Hides the current menu.
 */
EditorUi.prototype.showLinkDialog = function(value, btnLabel, fn)
{
	var dlg = new LinkDialog(this, value, btnLabel, fn);
	this.showDialog(dlg.container, 420, 90, true, true);
	dlg.init();
};

/**
 * Hides the current menu.
 */
EditorUi.prototype.showDataDialog = function(cell)
{
	if (cell != null && typeof window.EditDataDialog !== 'undefined')
	{
		var dlg = new EditDataDialog(this, cell);
		this.showDialog(dlg.container, 480, 420, true, false, null, false);
		dlg.init();
	}
};

/**
 * Hides the current menu.
 */
EditorUi.prototype.showBackgroundImageDialog = function(apply, img)
{
	apply = (apply != null) ? apply : mxUtils.bind(this, function(image)
	{
		var change = new ChangePageSetup(this, null, image);
		change.ignoreColor = true;
		
		this.editor.graph.model.execute(change);
	});
	
	var newValue = mxUtils.prompt(mxResources.get('backgroundImage'), (img != null) ? img.src : '');
	
	if (newValue != null && newValue.length > 0)
	{
		var img = new Image();
		
		img.onload = function()
		{
			apply(new mxImage(newValue, img.width, img.height), false);
		};
		img.onerror = function()
		{
			apply(null, true);
			mxUtils.alert(mxResources.get('fileNotFound'));
		};
		
		img.src = newValue;
	}
	else
	{
		apply(null);
	}
};

/**
 * Loads the stylesheet for this graph.
 */
EditorUi.prototype.setBackgroundImage = function(image)
{
	this.editor.graph.setBackgroundImage(image);
	this.editor.graph.view.validateBackgroundImage();

	this.fireEvent(new mxEventObject('backgroundImageChanged'));
};

/**
 * Creates the keyboard event handler for the current graph and history.
 */
EditorUi.prototype.confirm = function(msg, okFn, cancelFn)
{
	if (mxUtils.confirm(msg))
	{
		if (okFn != null)
		{
			okFn();
		}
	}
	else if (cancelFn != null)
	{
		cancelFn();
	}
};

/**
 * Creates the keyboard event handler for the current graph and history.
 */
EditorUi.prototype.createOutline = function(wnd)
{
	var outline = new mxOutline(this.editor.graph);

	mxEvent.addListener(window, 'resize', function()
	{
		outline.update(false);
	});
	
	return outline;
};

// Alt+Shift+Keycode mapping to action
EditorUi.prototype.altShiftActions = {
  65: 'connectionArrows', // Alt+Shift+A
  82: 'clearWaypoints', // Alt+Shift+R
  76: 'editLink', // Alt+Shift+L
  79: 'connectionPoints', // Alt+Shift+O
  81: 'editConnectionPoints', // Alt+Shift+Q
  84: 'editTooltip', // Alt+Shift+T
  86: 'pasteSize', // Alt+Shift+V
  70: 'copySize', // Alt+Shift+F
  66: 'copyData', // Alt+Shift+B
  69: 'pasteData' // Alt+Shift+E
};

/**
 * Creates the keyboard event handler for the current graph and history.
 */
EditorUi.prototype.createKeyHandler = function(editor)
{
	var editorUi = this;
	var graph = this.editor.graph;
	var keyHandler = new mxKeyHandler(graph);

	var isEventIgnored = keyHandler.isEventIgnored;
	keyHandler.isEventIgnored = function(evt)
	{
		// Handles undo/redo/ctrl+./,/u via action and allows ctrl+b/i
		// only if editing value is HTML (except for FF and Safari)
		// 66, 73 are keycodes for editing actions like bold, italic
		return !(mxEvent.isShiftDown(evt) && evt.keyCode == 9) &&
			((!this.isControlDown(evt) || mxEvent.isShiftDown(evt) ||
			(evt.keyCode != 90 && evt.keyCode != 89 && evt.keyCode != 188 &&
			evt.keyCode != 190 && evt.keyCode != 85)) && ((evt.keyCode != 66 && evt.keyCode != 73) ||
			!this.isControlDown(evt) || (this.graph.cellEditor.isContentEditing() &&
			!mxClient.IS_FF && !mxClient.IS_SF)) &&
			((evt.keyCode != 109 && evt.keyCode != 107) ||
			(!this.isControlDown(evt) && !mxEvent.isShiftDown(evt)) ||
			(!this.graph.cellEditor.isContentEditing() &&
			!mxClient.IS_FF && !mxClient.IS_SF)) &&
			isEventIgnored.apply(this, arguments));
	};
	
	// Ignores graph enabled state but not chromeless state
	keyHandler.isEnabledForEvent = function(evt)
	{
		return (!mxEvent.isConsumed(evt) && this.isGraphEvent(evt) && this.isEnabled() &&
			(editorUi.dialogs == null || editorUi.dialogs.length == 0));
	};
	
	// Routes command-key to control-key on Mac
	keyHandler.isControlDown = function(evt)
	{
		return mxEvent.isControlDown(evt) || (mxClient.IS_MAC && evt.metaKey);
	};

	var thread = null;
	
	// Helper function to move cells with the cursor keys
	function nudge(keyCode, stepSize, resize)
	{
		if (!graph.isSelectionEmpty() && graph.isEnabled())
		{
			stepSize = (stepSize != null) ? stepSize : 1;

			var cells = graph.getCompositeParents(graph.getSelectionCells());
			var cell = (cells.length > 0) ? cells[0] : null;

			if (cell != null)
			{
				if (resize)
				{
					// Resizes all selected vertices
					graph.getModel().beginUpdate();
					try
					{
						for (var i = 0; i < cells.length; i++)
						{
							if (graph.getModel().isVertex(cells[i]) && graph.isCellResizable(cells[i]))
							{
								var geo = graph.getCellGeometry(cells[i]);
								
								if (geo != null)
								{
									geo = geo.clone();
									
									if (keyCode == 37)
									{
										geo.width = Math.max(0, geo.width - stepSize);
									}
									else if (keyCode == 38)
									{
										geo.height = Math.max(0, geo.height - stepSize);
									}
									else if (keyCode == 39)
									{
										geo.width += stepSize;
									}
									else if (keyCode == 40)
									{
										geo.height += stepSize;
									}
									
									graph.getModel().setGeometry(cells[i], geo);
								}
							}
						}
					}
					finally
					{
						graph.getModel().endUpdate();
					}
				}
				else
				{
					// Moves vertices up/down in a stack layout
					var parent = graph.model.getParent(cell);
					var scale = graph.getView().scale;
					var layout = null;

					if (graph.getSelectionCount() == 1 && graph.model.isVertex(cell) &&
						graph.layoutManager != null && !graph.isCellLocked(cell))
					{
						layout = graph.layoutManager.getLayout(parent);
					}
					
					if (layout != null && layout.constructor == mxStackLayout)
					{
						var index = parent.getIndex(cell);
						
						if (keyCode == 37 || keyCode == 38)
						{
							graph.model.add(parent, cell, Math.max(0, index - 1));
						}
						else if (keyCode == 39 ||keyCode == 40)
						{
							graph.model.add(parent, cell, Math.min(graph.model.getChildCount(parent), index + 1));
						}
					}
					else
					{
						var handler = graph.graphHandler;

						if (handler != null)
						{
							if (handler.first == null)
							{
								handler.start(cell, 0, 0, graph.getMovableCells(cells));
							}

							if (handler.first != null)
							{
								var dx = 0;
								var dy = 0;
								
								if (keyCode == 37)
								{
									dx = -stepSize;
								}
								else if (keyCode == 38)
								{
									dy = -stepSize;
								}
								else if (keyCode == 39)
								{
									dx = stepSize;
								}
								else if (keyCode == 40)
								{
									dy = stepSize;
								}

								handler.currentDx += dx * scale;
								handler.currentDy += dy * scale;
								handler.checkPreview();
								handler.updatePreview();
							}

							// Groups move steps in undoable change
							if (thread != null)
							{
								window.clearTimeout(thread);
							}
							
							thread = window.setTimeout(function()
							{
								if (handler.first != null)
								{
									var dx = handler.roundLength(handler.currentDx / scale);
									var dy = handler.roundLength(handler.currentDy / scale);
									handler.moveCells(handler.cells, dx, dy);
									handler.reset();
								}
							}, 400);
						}
					}
				}
			}
		}
	};
	
	// Overridden to handle special alt+shift+cursor keyboard shortcuts
	var directions = {37: mxConstants.DIRECTION_WEST, 38: mxConstants.DIRECTION_NORTH,
		39: mxConstants.DIRECTION_EAST, 40: mxConstants.DIRECTION_SOUTH};
	var keyHandlerGetFunction = keyHandler.getFunction;

	mxKeyHandler.prototype.getFunction = function(evt)
	{
		if (graph.isEnabled())
		{
			// TODO: Add alt modifier state in core API, here are some specific cases
			if (mxEvent.isShiftDown(evt) && mxEvent.isAltDown(evt))
			{
				var action = editorUi.actions.get(editorUi.altShiftActions[evt.keyCode]);

				if (action != null)
				{
					return action.funct;
				}
			}
			
			if (directions[evt.keyCode] != null && !graph.isSelectionEmpty())
			{
				// On macOS, Control+Cursor is used by Expose so allow for Alt+Control to resize
				if (!this.isControlDown(evt) && mxEvent.isShiftDown(evt) && mxEvent.isAltDown(evt))
				{
					if (graph.model.isVertex(graph.getSelectionCell()))
					{
						return function()
						{
							var cells = graph.connectVertex(graph.getSelectionCell(), directions[evt.keyCode],
								graph.defaultEdgeLength, evt, true);
			
							if (cells != null && cells.length > 0)
							{
								if (cells.length == 1 && graph.model.isEdge(cells[0]))
								{
									graph.setSelectionCell(graph.model.getTerminal(cells[0], false));
								}
								else
								{
									graph.setSelectionCell(cells[cells.length - 1]);
								}

								graph.scrollCellToVisible(graph.getSelectionCell());
								
								if (editorUi.hoverIcons != null)
								{
									editorUi.hoverIcons.update(graph.view.getState(graph.getSelectionCell()));
								}
							}
						};
					}
				}
				else
				{
					// Avoids consuming event if no vertex is selected by returning null below
					// Cursor keys move and resize (ctrl) cells
					if (this.isControlDown(evt))
					{
						return function()
						{
							nudge(evt.keyCode, (mxEvent.isShiftDown(evt)) ? graph.gridSize : null, true);
						};
					}
					else
					{
						return function()
						{
							nudge(evt.keyCode, (mxEvent.isShiftDown(evt)) ? graph.gridSize : null);
						};
					}
				}
			}
		}

		return keyHandlerGetFunction.apply(this, arguments);
	};

	// Binds keystrokes to actions
	keyHandler.bindAction = mxUtils.bind(this, function(code, control, key, shift)
	{
		var action = this.actions.get(key);
		
		if (action != null)
		{
			var f = function()
			{
				if (action.isEnabled())
				{
					action.funct.apply(this, arguments);
				}
			};
    		
			if (control)
			{
				if (shift)
				{
					keyHandler.bindControlShiftKey(code, f);
				}
				else
				{
					keyHandler.bindControlKey(code, f);
				}
			}
			else
			{
				if (shift)
				{
					keyHandler.bindShiftKey(code, f);
				}
				else
				{
					keyHandler.bindKey(code, f);
				}
			}
		}
	});

	var ui = this;
	var keyHandlerEscape = keyHandler.escape;
	keyHandler.escape = function(evt)
	{
		keyHandlerEscape.apply(this, arguments);
	};

	// Ignores enter keystroke. Remove this line if you want the
	// enter keystroke to stop editing. N, W, T are reserved.
	keyHandler.enter = function() {};
	
	keyHandler.bindControlShiftKey(36, function() { graph.exitGroup(); }); // Ctrl+Shift+Home
	keyHandler.bindControlShiftKey(35, function() { graph.enterGroup(); }); // Ctrl+Shift+End
	keyHandler.bindShiftKey(36, function() { graph.home(); }); // Ctrl+Shift+Home
	keyHandler.bindKey(35, function() { graph.refresh(); }); // End
	keyHandler.bindAction(107, true, 'zoomIn'); // Ctrl+Plus
	keyHandler.bindAction(109, true, 'zoomOut'); // Ctrl+Minus
	keyHandler.bindAction(80, true, 'print'); // Ctrl+P
	
	if (!this.editor.chromeless || this.editor.editable)
	{
		keyHandler.bindAction(79, true, 'outline', true); // Ctrl+Shift+O
		keyHandler.bindControlKey(36, function() { if (graph.isEnabled()) { graph.foldCells(true); }}); // Ctrl+Home
		keyHandler.bindControlKey(35, function() { if (graph.isEnabled()) { graph.foldCells(false); }}); // Ctrl+End
		keyHandler.bindControlKey(13, function() { ui.ctrlEnter(); }); // Ctrl+Enter
		keyHandler.bindAction(8, false, 'delete'); // Backspace
		keyHandler.bindAction(8, true, 'deleteAll'); // Ctrl+Backspace
		keyHandler.bindAction(8, false, 'deleteLabels', true); // Shift+Backspace
		keyHandler.bindAction(46, false, 'delete'); // Delete
		keyHandler.bindAction(46, true, 'deleteAll'); // Ctrl+Delete
		keyHandler.bindAction(46, false, 'deleteLabels', true); // Shift+Delete
		keyHandler.bindAction(36, false, 'resetView'); // Home
		keyHandler.bindAction(72, true, 'fitWindow', true); // Ctrl+Shift+H
		keyHandler.bindAction(74, true, 'fitPage'); // Ctrl+J
		keyHandler.bindAction(74, true, 'fitTwoPages', true); // Ctrl+Shift+J
		keyHandler.bindAction(48, true, 'customZoom'); // Ctrl+0
		keyHandler.bindAction(82, true, 'turn'); // Ctrl+R
		keyHandler.bindAction(82, true, 'clearDefaultStyle', true); // Ctrl+Shift+R
		keyHandler.bindAction(83, true, 'save'); // Ctrl+S
		keyHandler.bindAction(83, true, 'saveAs', true); // Ctrl+Shift+S
		keyHandler.bindAction(65, true, 'selectAll'); // Ctrl+A
		keyHandler.bindAction(65, true, 'selectNone', true); // Ctrl+A
		keyHandler.bindAction(73, true, 'selectVertices', true); // Ctrl+Shift+I
		keyHandler.bindAction(69, true, 'selectEdges', true); // Ctrl+Shift+E
		keyHandler.bindAction(69, true, 'editStyle'); // Ctrl+E
		keyHandler.bindAction(66, true, 'bold'); // Ctrl+B
		keyHandler.bindAction(66, true, 'toBack', true); // Ctrl+Shift+B
		keyHandler.bindAction(70, true, 'toFront', true); // Ctrl+Shift+F
		keyHandler.bindAction(68, true, 'duplicate'); // Ctrl+D
		keyHandler.bindAction(68, true, 'setAsDefaultStyle', true); // Ctrl+Shift+D   
		keyHandler.bindAction(90, true, 'undo'); // Ctrl+Z
		keyHandler.bindAction(89, true, 'autosize', true); // Ctrl+Shift+Y
		keyHandler.bindAction(88, true, 'cut'); // Ctrl+X
		keyHandler.bindAction(67, true, 'copy'); // Ctrl+C
		keyHandler.bindAction(86, true, 'paste'); // Ctrl+V
		keyHandler.bindAction(71, true, 'group'); // Ctrl+G
		keyHandler.bindAction(77, true, 'editData'); // Ctrl+M
		keyHandler.bindAction(71, true, 'grid', true); // Ctrl+Shift+G
		keyHandler.bindAction(73, true, 'italic'); // Ctrl+I
		keyHandler.bindAction(76, true, 'lockUnlock'); // Ctrl+L
		keyHandler.bindAction(76, true, 'layers', true); // Ctrl+Shift+L
		keyHandler.bindAction(80, true, 'format', true); // Ctrl+Shift+P
		keyHandler.bindAction(85, true, 'underline'); // Ctrl+U
		keyHandler.bindAction(85, true, 'ungroup', true); // Ctrl+Shift+U
		keyHandler.bindAction(109, true, 'decreaseFontSize', true); // Ctrl+Shift+Minus
		keyHandler.bindAction(107, true, 'increaseFontSize', true); // Ctrl+Shift+Plus
		keyHandler.bindAction(219, true, 'decreaseFontSize', true); // Ctrl+{
		keyHandler.bindAction(221, true, 'increaseFontSize', true); // Ctrl+}
		keyHandler.bindAction(190, true, 'superscript'); // Ctrl+.
		keyHandler.bindAction(188, true, 'subscript'); // Ctrl+,
		keyHandler.bindAction(13, false, 'keyPressEnter'); // Enter
		keyHandler.bindKey(113, function() { if (graph.isEnabled()) { graph.startEditingAtCell(); }}); // F2
	}
	
	if (!mxClient.IS_WIN)
	{
		keyHandler.bindAction(90, true, 'redo', true); // Ctrl+Shift+Z
	}
	else
	{
		keyHandler.bindAction(89, true, 'redo'); // Ctrl+Y
	}
	
	return keyHandler;
};

/**
 * Creates the keyboard event handler for the current graph and history.
 */
EditorUi.prototype.destroy = function()
{
	var graph = this.editor.graph;

	if (graph != null && this.selectionStateListener != null)
	{
		graph.getSelectionModel().removeListener(mxEvent.CHANGE, this.selectionStateListener);
		graph.getModel().removeListener(mxEvent.CHANGE, this.selectionStateListener);
		graph.removeListener(mxEvent.EDITING_STARTED, this.selectionStateListener);
		graph.removeListener(mxEvent.EDITING_STOPPED, this.selectionStateListener);
		graph.getView().removeListener('unitChanged', this.selectionStateListener);
		this.selectionStateListener = null;
	}
	
	if (this.editor != null)
	{
		this.editor.destroy();
		this.editor = null;
	}
	
	if (this.menubar != null)
	{
		this.menubar.destroy();
		this.menubar = null;
	}
	
	if (this.toolbar != null)
	{
		this.toolbar.destroy();
		this.toolbar = null;
	}
	
	if (this.sidebar != null)
	{
		this.sidebar.destroy();
		this.sidebar = null;
	}
	
	if (this.keyHandler != null)
	{
		this.keyHandler.destroy();
		this.keyHandler = null;
	}
	
	if (this.keydownHandler != null)
	{
		mxEvent.removeListener(document, 'keydown', this.keydownHandler);
		this.keydownHandler = null;
	}
		
	if (this.keyupHandler != null)
	{
		mxEvent.removeListener(document, 'keyup', this.keyupHandler);
		this.keyupHandler = null;
	}
	
	if (this.resizeHandler != null)
	{
		mxEvent.removeListener(window, 'resize', this.resizeHandler);
		this.resizeHandler = null;
	}
	
	if (this.gestureHandler != null)
	{
		mxEvent.removeGestureListeners(document, this.gestureHandler);
		this.gestureHandler = null;
	}
	
	if (this.orientationChangeHandler != null)
	{
		mxEvent.removeListener(window, 'orientationchange', this.orientationChangeHandler);
		this.orientationChangeHandler = null;
	}
	
	if (this.scrollHandler != null)
	{
		mxEvent.removeListener(window, 'scroll', this.scrollHandler);
		this.scrollHandler = null;
	}

	if (this.destroyFunctions != null)
	{
		for (var i = 0; i < this.destroyFunctions.length; i++)
		{
			this.destroyFunctions[i]();
		}
		
		this.destroyFunctions = null;
	}
	
	var c = [this.menubarContainer, this.toolbarContainer, this.sidebarContainer,
	         this.formatContainer, this.diagramContainer, this.footerContainer,
	         this.chromelessToolbar, this.hsplit, this.layersDialog];
	
	for (var i = 0; i < c.length; i++)
	{
		if (c[i] != null && c[i].parentNode != null)
		{
			c[i].parentNode.removeChild(c[i]);
		}
	}
};
