/**
 * Testing dockable windows.
 */
EditorUi.windowed = urlParams['windows'] != '0';

/**
 * Code for the minimal UI theme.
 */
EditorUi.initMinimalTheme = function()
{
	// Disabled in lightbox and chromeless mode
	if (urlParams['lightbox'] == '1' || urlParams['chrome'] == '0' || typeof window.Format === 'undefined' || typeof window.Menus === 'undefined')
	{
		window.uiTheme = null;
		
		return;
	}
	
	var iw = 0;

	try
	{
		iw = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	}
	catch (e)
	{
		// ignore
	}

	Menus.prototype.autoPopup = false;

	function toggleFormat(ui, visible)
	{
		if (EditorUi.windowed)
		{
			var graph = ui.editor.graph;
			graph.popupMenuHandler.hideMenu();
			
			if (ui.formatWindow == null)
			{
				var x = Math.max(10, ui.diagramContainer.clientWidth - 248);
				var y = 60;
				var h = Math.min(566,graph.container.clientHeight - 10);
				
				ui.formatWindow = new WrapperWindow(ui, mxResources.get('format'), x, y, 240, h,
					function(container)
				{
					var format = ui.createFormat(container);
					format.init();
				});

				ui.formatWindow.window.addListener(mxEvent.SHOW, mxUtils.bind(this, function()
				{
					ui.formatWindow.window.fit();
				}));
				
				ui.formatWindow.window.minimumSize = new mxRectangle(0, 0, 240, 80);
			}
			else
			{
				ui.formatWindow.window.setVisible((visible != null) ?
					visible : !ui.formatWindow.window.isVisible());
			}
		}
		else
		{
			if (ui.formatElt == null)
			{
				ui.formatElt = ui.createSidebarContainer();
				var format = ui.createFormat(ui.formatElt);
				format.init();
				ui.formatElt.style.border = 'none';
				ui.formatElt.style.width = '240px';
				ui.formatElt.style.borderLeft = '1px solid gray';
				ui.formatElt.style.right = '0px';
			}

			var wrapper = ui.diagramContainer.parentNode;

			if (ui.formatElt.parentNode != null)
			{
				ui.formatElt.parentNode.removeChild(ui.formatElt);
				wrapper.style.right = '0px';
			}
			else
			{
				wrapper.parentNode.appendChild(ui.formatElt);
				wrapper.style.right = ui.formatElt.style.width;
			}
		}
	};

	function createSidebar(ui, container)
	{
		var css = 'position:absolute;border-width:1px;cusor:pointer;border-style:none;' +
			'height:24px;bottom:0px;text-align:center;padding:8px 6px 0 6px;border-top-style:solid;' +
			'width:50%;height:32px;box-sizing:border-box;font-size:11px;';
		var menuObj = new Menubar(ui, container);
		
		function addMenu(id, label)
		{
			var menu = ui.menus.get(id);
			
			var elt = menuObj.addMenu(label, mxUtils.bind(this, function()
			{
				// Allows extensions of menu.functid
				menu.funct.apply(this, arguments);
			}));
			
			elt.style.cssText = css;
			elt.className = 'geTitle';
			container.appendChild(elt);
			
			return elt;
		};
		
		if (Editor.enableCustomLibraries && (urlParams['embed'] != '1' || urlParams['libraries'] == '1'))
		{
			// Defined in native apps together with openLibrary
			if (ui.actions.get('newLibrary') != null)
			{
				var div = document.createElement('div');
				div.style.cssText = css;
				div.className = 'geTitle';
				mxUtils.write(div, mxResources.get('newLibrary'));
				container.appendChild(div);
				
				mxEvent.addListener(div, 'click', this.actions.get('newLibrary').funct);
				
				var div = div.cloneNode(false);
				div.style.left = '50%';
				div.style.borderLeftStyle = 'solid';
				mxUtils.write(div, mxResources.get('openLibrary'));
				container.appendChild(div);
				
				mxEvent.addListener(div, 'click', this.actions.get('openLibrary').funct);
			}
			else
			{
				var elt = addMenu('newLibrary', mxResources.get('newLibrary'));
				elt.style.fontSize = '11px';
				elt.style.left = '0';
				
				var elt = addMenu('openLibraryFrom', mxResources.get('openLibraryFrom'));
				elt.style.borderLeftStyle = 'solid';
				elt.style.fontSize = '11px';
				elt.style.left = '50%';
			}
		}

		container.appendChild(ui.sidebar.container);
		container.style.overflow = 'hidden';
	};

	function toggleShapes(ui, visible)
	{
		if (EditorUi.windowed)
		{
			var graph = ui.editor.graph;
			graph.popupMenuHandler.hideMenu();
	
			if (ui.sidebarWindow == null)
			{
				var w = Math.min(graph.container.clientWidth - 10, 218);
				var h = Math.min(graph.container.clientHeight - 40, 650);
				
				ui.sidebarWindow = new WrapperWindow(ui, mxResources.get('shapes'),
					10, 56, w - 6, h - 6, function(container)
				{
					createSidebar(ui, container);
				});
				
				ui.sidebarWindow.window.addListener(mxEvent.SHOW, mxUtils.bind(this, function()
				{
					ui.sidebarWindow.window.fit();
				}));
	
				ui.sidebarWindow.window.minimumSize = new mxRectangle(0, 0, 90, 90);
				ui.sidebarWindow.window.setVisible(true);

				if (isLocalStorage)
				{
					ui.getLocalData('sidebar', function(value)
					{
						ui.sidebar.showEntries(value, null, true);
					});
				}
				
				ui.restoreLibraries();
			}
			else
			{
				ui.sidebarWindow.window.setVisible((visible != null) ?
					visible : !ui.sidebarWindow.window.isVisible());
			}
		}
		else
		{
			if (ui.sidebarElt == null)
			{
				ui.sidebarElt = ui.createSidebarContainer();
				createSidebar(ui, ui.sidebarElt);
				ui.sidebarElt.style.border = 'none';
				ui.sidebarElt.style.width = '210px';
				ui.sidebarElt.style.borderRight = '1px solid gray';
			}

			var wrapper = ui.diagramContainer.parentNode;

			if (ui.sidebarElt.parentNode != null)
			{
				ui.sidebarElt.parentNode.removeChild(ui.sidebarElt);
				wrapper.style.left = '0px';
			}
			else
			{
				wrapper.parentNode.appendChild(ui.sidebarElt);
				wrapper.style.left = ui.sidebarElt.style.width;
			}
		}
	};
	
    // Changes colors for some UI elements
	var fill = '#29b6f2';
	Editor.checkmarkImage = Graph.createSvgImage(22, 18, '<path transform="translate(4 0)" d="M7.181,15.007a1,1,0,0,1-.793-0.391L3.222,10.5A1,1,0,1,1,4.808,9.274L7.132,12.3l6.044-8.86A1,1,0,1,1,14.83,4.569l-6.823,10a1,1,0,0,1-.8.437H7.181Z" fill="' + fill + '"/>').src;
	mxConstraintHandler.prototype.pointImage = Graph.createSvgImage(5, 5,
		'<path d="m 0 0 L 5 5 M 0 5 L 5 0" stroke-width="2" style="stroke-opacity:0.4" stroke="#ffffff"/>' +
		'<path d="m 0 0 L 5 5 M 0 5 L 5 0" stroke="' + fill + '"/>');
	mxOutline.prototype.sizerImage = null;
	
	mxConstants.VERTEX_SELECTION_COLOR = '#C0C0C0';
	mxConstants.EDGE_SELECTION_COLOR = '#C0C0C0';
	mxConstants.CONNECT_HANDLE_FILLCOLOR = '#cee7ff';
	mxConstants.DEFAULT_VALID_COLOR = fill;
	mxConstants.GUIDE_COLOR = '#C0C0C0';
	mxConstants.OUTLINE_COLOR = '#29b6f2';
	mxConstants.OUTLINE_HANDLE_FILLCOLOR = '#29b6f2';
	mxConstants.OUTLINE_HANDLE_STROKECOLOR = '#fff';

	Graph.prototype.svgShadowColor = '#3D4574';
	Graph.prototype.svgShadowOpacity = '0.4';
	Graph.prototype.svgShadowSize = '0.6';
	Graph.prototype.svgShadowBlur = '1.2';

	Format.inactiveTabBackgroundColor = '#e4e4e4';
	mxGraphHandler.prototype.previewColor = '#C0C0C0';
	mxRubberband.prototype.defaultOpacity = 50;
	HoverIcons.prototype.inactiveOpacity = 25;
	Format.prototype.showCloseButton = false;
	EditorUi.prototype.closableScratchpad = false;
	EditorUi.prototype.toolbarHeight = 46;
	EditorUi.prototype.footerHeight = 0;
	Graph.prototype.editAfterInsert = !mxClient.IS_IOS && !mxClient.IS_ANDROID;
	
	/**
	 * Creates inline CSS element.
	 */
	Editor.styleElt = document.createElement('style')
	Editor.styleElt.type = 'text/css';
	Editor.styleElt.innerHTML = Editor.createMinimalCss();
	document.getElementsByTagName('head')[0].appendChild(Editor.styleElt);

	/**
     * Sets the XML node for the current diagram.
     */
    Editor.prototype.isChromelessView = function()
    {
    	return false;
    };

    /**
     * Sets the XML node for the current diagram.
     */
    Graph.prototype.isLightboxView = function()
    {
    	return false;
    };
	
	var editorUiRefresh = EditorUi.prototype.refresh;

	/**
	 * Changes refresh to only update the diagram container in sketch mode.
	 */
	EditorUi.prototype.refresh = function(sizeDidChange)
	{
		editorUiRefresh.apply(this, arguments);

		if (this.tabContainer != null)
        {
        	// Makes room for view zoom menu
        	this.tabContainer.style.right = '62px';
        	this.diagramContainer.style.bottom = this.tabContainerHeight + 'px';
        }
	};

    // Overridden to update save menu state
	/**
	 * Updates action states depending on the selection.
	 */
	var editorUiUpdateActionStates = EditorUi.prototype.updateActionStates;
	
	EditorUi.prototype.updateActionStates = function()
	{
		editorUiUpdateActionStates.apply(this, arguments);

		this.menus.get('save').setEnabled(this.getCurrentFile() != null || urlParams['embed'] == '1');
	};

    // Hides keyboard shortcuts in menus
    var menusAddShortcut = Menus.prototype.addShortcut; 
    
    Menus.prototype.addShortcut = function(item, action)
    {
        if (action.shortcut != null && iw < 900 && !mxClient.IS_IOS)
        {
            var td = item.firstChild.nextSibling;
            td.setAttribute('title', action.shortcut);
        }
        else
        {
        	menusAddShortcut.apply(this, arguments);
        }
    };
	
    // Overridden to toggle window instead
    EditorUi.prototype.toggleFormatPanel = function(visible)
    {
        if (this.formatWindow != null)
        {
        	this.formatWindow.window.setVisible((visible != null) ?
        		visible : !this.formatWindow.window.isVisible());
        }
        else
        {
        	toggleFormat(this);
        }
    };
	
    EditorUi.prototype.isFormatPanelVisible = function()
    {
		return (this.formatWindow != null && this.formatWindow.window.isVisible()) ||
			(this.formatWindow == null && this.formatWidth > 0);
    };

    DiagramFormatPanel.prototype.isMathOptionVisible = function()
    {
        return true;
    };
    
	// Initializes the user interface
	var editorUiDestroy = EditorUi.prototype.destroy;
	EditorUi.prototype.destroy = function()
	{
		this.destroyWindows();
		editorUiDestroy.apply(this, arguments);
	};
	
	// Hides windows when a file is closed
	var editorUiSetGraphEnabled = EditorUi.prototype.setGraphEnabled;
	
	EditorUi.prototype.setGraphEnabled = function(enabled)
	{
		editorUiSetGraphEnabled.apply(this, arguments);
		
		if (!enabled)
		{
			if (this.sidebarWindow != null)
            {
            	this.sidebarWindow.window.setVisible(false);
            }

            if (this.formatWindow != null)
            {
            	this.formatWindow.window.setVisible(false);
            }
		}
		else
		{
			var iw = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

			if (iw >= 1000 && this.sidebarWindow != null)
            {
                this.sidebarWindow.window.setVisible(true);
            }
            
            if (this.formatWindow != null && iw >= 1000)
            {
            	this.formatWindow.window.setVisible(true);
            }
		}
	};
	
    // Disables centering of graph after iframe resize
	EditorUi.prototype.chromelessWindowResize = function() {};
	
	// Adds actions and menus
	var menusInit = Menus.prototype.init;
	Menus.prototype.init = function()
	{
		menusInit.apply(this, arguments);
		
        var ui = this.editorUi;
		
        if (EditorUi.enablePlantUml && !ui.isOffline())
        {
	        ui.actions.put('plantUml', new Action(mxResources.get('plantUml') + '...', function()
	        {
	            var dlg = new ParseDialog(ui, mxResources.get('plantUml') + '...', 'plantUml');
	            ui.showDialog(dlg.container, 620, 420, true, false);
	            dlg.init();
	        }));
        }
        
    	ui.actions.put('mermaid', new Action(mxResources.get('mermaid') + '...', function()
        {
            var dlg = new ParseDialog(ui, mxResources.get('mermaid') + '...', 'mermaid');
            ui.showDialog(dlg.container, 620, 420, true, false);
            dlg.init();
        }));

        var methods = ['horizontalFlow', 'verticalFlow', '-', 'horizontalTree', 'verticalTree',
                       'radialTree', '-', 'organic', 'circle'];

        var addInsertItem = function(menu, parent, title, method)
        {
            menu.addItem(title, null, mxUtils.bind(this, function()
            {
                var dlg = new CreateGraphDialog(ui, title, method);
                ui.showDialog(dlg.container, 620, 420, true, false);
                // Executed after dialog is added to dom
                dlg.init();
            }), parent);
        };

        this.put('insertLayout', new Menu(mxUtils.bind(this, function(menu, parent)
        {
            for (var i = 0; i < methods.length; i++)
            {
                if (methods[i] == '-')
                {
                    menu.addSeparator(parent);
                }
                else
                {
                    addInsertItem(menu, parent, mxResources.get(methods[i]) + '...', methods[i]);
                }
            }
        })));
	};
	
	// Installs the format toolbar
	EditorUi.prototype.installFormatToolbar = function(container)
	{
		var graph = this.editor.graph;
		var div = document.createElement('div');
		
		div.style.cssText = 'position:absolute;top:10px;z-index:1;border-radius:4px;' +
			'box-shadow:0px 0px 3px 1px #d1d1d1;padding:6px;white-space:nowrap;background-color:#fff;' +
			'transform:translate(-50%, 0);left:50%;';
		
		graph.getSelectionModel().addListener(mxEvent.CHANGE, mxUtils.bind(this, function(sender, evt)
		{
			if (graph.getSelectionCount() > 0)
			{
				container.appendChild(div);
				div.innerHTML = 'Selected: ' + graph.getSelectionCount();
			}
			else if (div.parentNode != null)
			{
				div.parentNode.removeChild(div);
			}
		}));
	};

	var formatWindowInitialized = false;

	EditorUi.prototype.initFormatWindow = function()
	{
		if (!formatWindowInitialized && this.formatWindow != null)
		{
			formatWindowInitialized = true;

			var toggleMinimized = this.formatWindow.window.toggleMinimized;
			var w = 240;
			
			this.formatWindow.window.toggleMinimized = function()
			{
				toggleMinimized.apply(this, arguments);
				
				if (this.minimized)
				{
					w = parseInt(this.div.style.width);
					this.div.style.width = '140px';
					this.table.style.width = '140px';
					this.div.style.left = (parseInt(this.div.style.left) + w - 140) + 'px';
				}
				else
				{
					this.div.style.width = w + 'px';
					this.table.style.width = this.div.style.width;
					this.div.style.left = (Math.max(0, parseInt(this.div.style.left) - w + 140)) + 'px';
				}
				
				this.fit();
			};
			
			mxEvent.addListener(this.formatWindow.window.title, 'dblclick', mxUtils.bind(this, function(evt)
			{
				if (mxEvent.getSource(evt) == this.formatWindow.window.title)
				{
					this.formatWindow.window.toggleMinimized();
				}
			}));
		}
	};
	
	// Initializes the user interface
	var editorUiInit = EditorUi.prototype.init;

	EditorUi.prototype.init = function()
	{
		editorUiInit.apply(this, arguments);
		
		var libs = Editor.enableCustomLibraries && (urlParams['embed'] != '1' ||
			urlParams['libraries'] == '1');

		var div = document.createElement('div');
		div.style.cssText = 'position:absolute;left:0px;right:0px;top:0px;overflow-y:auto;overflow-x:hidden;';
		div.style.bottom = (libs) ? '32px' : '0px';
		this.sidebar = this.createSidebar(div);
		
		if (iw >= 1000 || urlParams['clibs'] != null || urlParams['libs'] != null ||
			urlParams['search-shapes'] != null)
		{
			toggleShapes(this, true);
			
			if (this.sidebar != null && urlParams['search-shapes'] != null && this.sidebar.searchShapes != null)
			{
				this.sidebar.searchShapes(urlParams['search-shapes']);
				this.sidebar.showEntries('search');
			}
		}
		
		if (EditorUi.windowed && iw >= 1000)
		{
			toggleFormat(this, true);
			this.formatWindow.window.setVisible(true);
		}
        
		// Needed for creating elements in Format panel
		var ui = this;
		var graph = ui.editor.graph;
		ui.toolbar = this.createToolbar(ui.createDiv('geToolbar'));
		ui.defaultLibraryName = mxResources.get('untitledLibrary');

		var menubar = document.createElement('div');
		menubar.className = 'geMenubarContainer';
		var before = null;
		var menuObj = new Menubar(ui, menubar);

		function addMenu(id, small, img)
		{
			var menu = ui.menus.get(id);

			var elt = menuObj.addMenu(mxResources.get(id), mxUtils.bind(this, function()
			{
				// Allows extensions of menu.functid
				menu.funct.apply(this, arguments);
			}), before);
            
			elt.className = 'geMenuItem';
			elt.style.display = 'inline-block';
			elt.style.boxSizing = 'border-box';
			elt.style.top = '6px';
			elt.style.marginRight = '6px';
			elt.style.height = '30px';
			elt.style.paddingTop = '6px';
			elt.style.paddingBottom = '6px';
			elt.style.cursor = 'pointer';
			elt.setAttribute('title', mxResources.get(id));
			ui.menus.menuCreated(menu, elt, 'geMenuItem');
            
			if (img != null)
			{
				elt.style.backgroundImage = 'url(' + img + ')';
				elt.style.backgroundPosition = 'center center';
				elt.style.backgroundRepeat = 'no-repeat';
				elt.style.backgroundSize = '24px 24px';
				elt.style.width = '34px';
				elt.innerText = '';
			}
			else if (!small)
			{
				elt.style.backgroundImage = 'url(' + mxWindow.prototype.normalizeImage + ')';
				elt.style.backgroundPosition = 'right 6px center';
				elt.style.backgroundRepeat = 'no-repeat';
				elt.style.paddingRight = '22px';
			} 

			return elt;
		};
        
		function addMenuItem(label, fn, small, tooltip, action, img)
		{
			var btn = document.createElement('a');
			btn.className = 'geMenuItem';
			btn.style.display = 'inline-block';
			btn.style.boxSizing = 'border-box';
			btn.style.height = '30px';
			btn.style.padding = '6px';
			btn.style.position = 'relative';
			btn.style.verticalAlign = 'top';
			btn.style.top = '0px';
			
			if (ui.statusContainer != null)
			{
				menubar.insertBefore(btn, ui.statusContainer);
			}
			else
			{
				menubar.appendChild(btn);
			}
            
			if (img != null)
			{
				btn.style.backgroundImage = 'url(' + img + ')';
				btn.style.backgroundPosition = 'center center';
				btn.style.backgroundRepeat = 'no-repeat';
				btn.style.backgroundSize = '24px 24px';
				btn.style.width = '34px';
			}
			else
			{
				mxUtils.write(btn, label);
			}
            
    		// Prevents focus
            mxEvent.addListener(btn, (mxClient.IS_POINTER) ? 'pointerdown' : 'mousedown',
            	mxUtils.bind(this, function(evt)
    		{
    			evt.preventDefault();
    		}));

            mxEvent.addListener(btn, 'click', function(evt)
            {
            	if (btn.getAttribute('disabled') != 'disabled')
            	{
            		fn(evt);
            	}
            	
                mxEvent.consume(evt);
            });
            
            if (small == null)
            {
                btn.style.marginRight = '4px';
            }
            
            if (tooltip != null)
            {
                btn.setAttribute('title', tooltip);
            }

            if (action != null)
            {
                function updateState()
                {
                    if (action.isEnabled())
                    {
                        btn.removeAttribute('disabled');
                        btn.style.cursor = 'pointer';
                    }
                    else
                    {
                        btn.setAttribute('disabled', 'disabled');
                        btn.style.cursor = 'default';
                    }
                };
                
                action.addListener('stateChanged', updateState);
				graph.addListener('enabledChanged', updateState);
                updateState();
            }
           
            return btn;
        };
        
        function createGroup(btns, op, container)
        {
            var btnGroup = document.createElement('div');
            btnGroup.className = 'geMenuItem';
            btnGroup.style.display = 'inline-block';
            btnGroup.style.verticalAlign = 'top';
            btnGroup.style.marginRight = '6px';
            btnGroup.style.padding = '0 4px 0 4px';
            btnGroup.style.height = '30px';
            btnGroup.style.position = 'relative';
            btnGroup.style.top = '0px';

            for (var i = 0; i < btns.length; i++)
            {
            	if (btns[i] != null)
            	{
            		btns[i].style.margin = '0px';
	                btns[i].style.boxShadow = 'none';
	                btnGroup.appendChild(btns[i]);
            	}
            }
            
            if (op != null)
            {
            	mxUtils.setOpacity(btnGroup, op);
            }

			if (ui.statusContainer != null)
            {
            	menubar.insertBefore(btnGroup, ui.statusContainer);
            }
            else
            {
            	menubar.appendChild(btnGroup);
            }
            
            return btnGroup;
        };

		ui.statusContainer = ui.createStatusContainer();
		ui.statusContainer.style.position = 'relative';
		ui.statusContainer.style.maxWidth = '';
		ui.statusContainer.style.color = 'gray';
		ui.statusContainer.style.cursor = 'default';
		
		function updateTitle()
		{
			var file = ui.getCurrentFile();
			
			if (file != null && file.getTitle() != null)
			{
				var mode = file.getMode();
				
				if (mode == 'google')
				{
					mode = 'googleDrive';
				}
				else if (mode == 'github')
				{
					mode = 'gitHub';
				}
				else if (mode == 'gitlab')
				{
					mode = 'gitLab';
				}
				else if (mode == 'onedrive')
				{
					mode = 'oneDrive';
				}
				
				mode = mxResources.get(mode);
				menubar.setAttribute('title', file.getTitle() + ((mode != null) ? ' (' + mode + ')' : ''));
			}
			else
			{
				menubar.removeAttribute('title');
			}
		};
		
		// Hides popup menus
		var uiHideCurrentMenu = ui.hideCurrentMenu;
		
		ui.hideCurrentMenu = function()
		{
			uiHideCurrentMenu.apply(this, arguments);
			this.editor.graph.popupMenuHandler.hideMenu();
		};

		// Connects the status bar to the editor status
		var uiDescriptorChanged = ui.descriptorChanged;
		
		ui.descriptorChanged = function()
		{
			uiDescriptorChanged.apply(this, arguments);
			updateTitle();
		};
		
		ui.setStatusText(ui.editor.getStatus());
		menubar.appendChild(ui.statusContainer);

		ui.buttonContainer = document.createElement('div');
		ui.buttonContainer.style.cssText = 'display:flex;justify-content:flex-end;padding-right:10px;gap:6px;' +
			'white-space:nowrap;background-color:inherit;align-items:center;min-width:0;margin-left:auto;';
		menubar.appendChild(ui.buttonContainer);
		
		// Container for the user element
		ui.menubarContainer = ui.buttonContainer;

        ui.tabContainer = document.createElement('div');
		ui.tabContainer.className = 'geTabContainer geTabItem';
        ui.tabContainer.style.cssText = 'position:absolute;left:0px;right:0px;bottom:0px;height:30px;' +
            'white-space:nowrap;visibility:hidden;';

        var previousParent = ui.diagramContainer.parentNode;

        var wrapper = document.createElement('div');
        wrapper.style.cssText = 'position:absolute;top:0px;left:0px;right:0px;bottom:0px;overflow:hidden;';
        ui.diagramContainer.style.top = '47px';

		var insertImage = Editor.addBoxImage;
		
		// Hides hover icons if freehand is active
		if (ui.hoverIcons != null)
		{
			var hoverIconsUpdate = ui.hoverIcons.update;
			
			ui.hoverIcons.update = function()
			{
				if (!graph.freehand.isDrawing())
				{
					hoverIconsUpdate.apply(this, arguments);
				}
			};
		}
	
		// Removes sketch style from freehand shapes
		if (graph.freehand != null)
		{
			var freehandCreateStyle = graph.freehand.createStyle;
			
			graph.freehand.createStyle = function(stencil)
			{
				return freehandCreateStyle.apply(this, arguments) + 'sketch=0;';
			};
		}
		
		// Connects the status bar to the editor status
		ui.editor.addListener('statusChanged', mxUtils.bind(this, function()
		{
			ui.setStatusText(ui.editor.getStatus());
		}));
		
		ui.setStatusText(ui.editor.getStatus());

        var viewZoomMenu = ui.menus.get('viewZoom');

		if (viewZoomMenu != null)
		{
			var fitFunction = function(evt)
	        {
				if (mxEvent.isAltDown(evt))
				{
					ui.hideCurrentMenu();
					ui.actions.get('customZoom').funct();
					mxEvent.consume(evt);
				}
				// geItem is a dropdown menu, geMenuItem is a button in the toolbar
				else if (mxEvent.getSource(evt).className == 'geMenuItem' || mxEvent.isShiftDown(evt))
				{
					ui.hideCurrentMenu();
					ui.actions.get('smartFit').funct();
					mxEvent.consume(evt);
				}
	        };

        	var zoomInAction = ui.actions.get('zoomIn');
			var zoomOutAction = ui.actions.get('zoomOut');
			var resetViewAction = ui.actions.get('resetView');
        	var undoAction = ui.actions.get('undo');
        	var redoAction = ui.actions.get('redo');        	
	        var undoElt = addMenuItem('', undoAction.funct, null, mxResources.get('undo') + ' (' + undoAction.shortcut + ')', undoAction, Editor.undoImage);
	        var redoElt = addMenuItem('', redoAction.funct, null, mxResources.get('redo') + ' (' + redoAction.shortcut + ')', redoAction, Editor.redoImage);
			var fitElt = addMenuItem('', fitFunction, true, mxResources.get('fit') + ' (' + Editor.ctrlKey + '+H)', resetViewAction, Editor.zoomFitImage);
				
			menubar.style.cssText = 'position:absolute;left:0px;right:0px;top:0px;height:30px;padding:8px;' +
				'text-align:left;white-space:nowrap;';
			this.tabContainer.style.right = '70px';
			var elt = menuObj.addMenu('100%', viewZoomMenu.funct);
			elt.setAttribute('title', mxResources.get('zoom') + ' (Alt+Mousewheel)');
			elt.className = 'geTabItem';
			elt.style.height = ui.tabContainerHeight + 'px';
			elt.style.position = 'absolute';
			elt.style.display = (urlParams['pages'] != '0') ? 'flex' : 'none';
			elt.style.alignItems = 'center';
			elt.style.justifyContent = 'center';
			elt.style.paddingRight = '11px';
			elt.style.whiteSpace = 'nowrap';
			elt.style.overflow = 'hidden';
			elt.style.fontSize = '11px';
			elt.style.width = '51px';
			elt.style.right = '0px';
			elt.style.bottom = '0px';
			elt.style.boxSizing = 'content-box';
			elt.style.backgroundImage = 'url(' + mxWindow.prototype.minimizeImage + ')';
			elt.style.backgroundPosition = 'right 6px top 15px';
			elt.style.backgroundRepeat = 'no-repeat';
			elt.style.backgroundSize = '10px';
			elt.style.zIndex = '1';
			wrapper.appendChild(elt);

	    	// Updates the label if the scale changes
			(function(elt)
			{
				// Adds shift+/alt+click on zoom label
				mxEvent.addListener(elt, 'click', fitFunction);

				var updateZoom = mxUtils.bind(this, function(sender, evt, f)
				{
					f = (f != null) ? f : 1;
					elt.innerText = '';
					mxUtils.write(elt, Math.round(ui.editor.graph.view.scale * 100 * f) + '%');
				});

				ui.editor.graph.view.addListener(mxEvent.EVENT_SCALE, updateZoom);
				ui.editor.addListener('resetGraphView', updateZoom);
				ui.editor.addListener('pageSelected', updateZoom);

				// Zoom Preview
				ui.editor.graph.addListener('zoomPreview', mxUtils.bind(this, function(sender, evt)
				{
					updateZoom(sender, evt, evt.getProperty('factor'));
				}));
			})(elt);
	    	
	    	// Augments setGraphEnabled to update visible state
	    	var uiSetGraphEnabled = ui.setGraphEnabled;
	    	
	    	ui.setGraphEnabled = function()
	    	{
	    		uiSetGraphEnabled.apply(this, arguments);
	    		
	    		if (this.tabContainer != null)
	    		{
	    			elt.style.visibility = this.tabContainer.style.visibility;
    	        	this.diagramContainer.style.bottom = (urlParams['pages'] != '0' &&
						this.tabContainer.style.visibility != 'hidden') ?
							this.tabContainerHeight + 'px' : '0px';
	    		}
	    	};
		}
        
        wrapper.appendChild(menubar);
        wrapper.appendChild(ui.diagramContainer);
        previousParent.appendChild(wrapper);
        ui.updateTabContainer();

		if (!EditorUi.windowed && iw >= 1000)
		{
			toggleFormat(this, true);
		}
        
        wrapper.appendChild(ui.tabContainer);
        
        function refreshMenu()
        {
			// Removes all existing menu items
			var node = menubar.firstChild;
			
			while (node != null)
			{
				var temp = node.nextSibling;
				
				if (node.className == 'geMenuItem' || node.className == 'geItem')
				{
					node.parentNode.removeChild(node);
				}
				
				node = temp;
			}
			
			before = menubar.firstChild;
			iw = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
			var small = iw < 1000;
			var appElt = null;
	
			if (!small)
			{
				appElt = addMenu('diagram');
			}

			var temp = (small) ? addMenu('diagram', null, Editor.menuImage) : null;

			if (temp != null)
			{
				appElt = temp;
			}

			createGroup([appElt, addMenuItem(mxResources.get('shapes'), ui.actions.get('toggleShapes').funct, null,
				mxResources.get('shapes'), ui.actions.get('image'), (small) ? Editor.shapesImage : null),
				addMenuItem(mxResources.get('format'), ui.actions.get('format').funct, null,
				mxResources.get('format') + ' (' + ui.actions.get('format').shortcut + ')', ui.actions.get('image'),
				(small) ? Editor.formatImage : null)],
				(small) ? 60 : null);
		
			var elt = addMenu('insert', true, (small) ? insertImage : null);
			createGroup([elt, addMenuItem(mxResources.get('delete'), ui.actions.get('delete').funct,
				null, mxResources.get('delete'), ui.actions.get('delete'),
				(small) ? Editor.trashImage : null)], (small) ? 60 : null);

			if (iw >= 411)
			{
				createGroup([undoElt, redoElt], 60);
	
				if (iw >= 520)
				{
					createGroup([fitElt,
						(iw >= 640) ? addMenuItem('', zoomInAction.funct, true, mxResources.get('zoomIn') + ' (' + Editor.ctrlKey + ' +)',
							zoomInAction, Editor.zoomInImage) : null,
						(iw >= 640) ? addMenuItem('', zoomOutAction.funct, true, mxResources.get('zoomOut') + ' (' + Editor.ctrlKey + ' -)',
							zoomOutAction, Editor.zoomOutImage) : null], 60);
				}
			}
        };
        
        refreshMenu();
        
        mxEvent.addListener(window, 'resize', function()
		{
        	refreshMenu();
        	
            if (ui.sidebarWindow != null)
            {
                ui.sidebarWindow.window.fit();
            }
            
            if (ui.formatWindow != null)
            {
            	ui.formatWindow.window.fit();
            }

            if (ui.actions.outlineWindow != null)
            {
            	ui.actions.outlineWindow.window.fit();
            }

            if (ui.actions.layersWindow != null)
            {
            	ui.actions.layersWindow.window.fit();
            }

            if (ui.menus.tagsWindow != null)
            {
            	ui.menus.tagsWindow.window.fit();
            }

            if (ui.menus.findWindow != null)
            {
            	ui.menus.findWindow.window.fit();
            }

            if (ui.menus.findReplaceWindow != null)
            {
            	ui.menus.findReplaceWindow.window.fit();
            }
		});
	};
};

(function()
{
	var initialized = false;
	
	// ChromeApp has async local storage
	if (uiTheme == 'min' && !initialized && !mxClient.IS_CHROMEAPP)
	{
		EditorUi.initMinimalTheme();
		initialized = true;
	}
	
	var uiInitTheme = EditorUi.initTheme;
	
	// For async startup like chromeos
	EditorUi.initTheme = function()
	{
		uiInitTheme.apply(this, arguments);
		
		if (uiTheme == 'min' && !initialized)
		{
			this.initMinimalTheme();
			initialized = true;
		}
	};
})();
