/**
 * Copyright (c) 2006-2016, JGraph Ltd
 * Copyright (c) 2006-2016, Gaudenz Alder
 */
/**
 * Constructs a new point for the optional x and y coordinates. If no
 * coordinates are given, then the default values for <x> and <y> are used.
 * @constructor
 * @class Implements a basic 2D point. Known subclassers = {@link mxRectangle}.
 * @param {number} x X-coordinate of the point.
 * @param {number} y Y-coordinate of the point.
 */
/**
 * Global types
 */
function DiagramPage(node, id)
{
	this.node = node;

	if (id != null)
	{
		this.node.setAttribute('id', id);
	}
	else if (this.getId() == null)
	{
		this.node.setAttribute('id', Editor.guid());
	}
};

/**
 * Holds the diagram node for the page.
 */
DiagramPage.prototype.node = null;

/**
 * Holds the root cell for the page.
 */
DiagramPage.prototype.root = null;

/**
 * Holds the view state for the page.
 */
DiagramPage.prototype.viewState = null;

/**
 * 
 */
DiagramPage.prototype.getId = function()
{
	return this.node.getAttribute('id');
};

/**
 * 
 */
DiagramPage.prototype.getName = function()
{
	return this.node.getAttribute('name');
};

/**
 * 
 */
DiagramPage.prototype.setName = function(value)
{
	if (value == null)
	{
		this.node.removeAttribute('name');
	}
	else
	{
		this.node.setAttribute('name', value);
	}
};

/**
 * Change types
 */
function RenamePage(ui, page, name)
{
	this.ui = ui;
	this.page = page;
	this.name = name;
	this.previous = name;
}

/**
 * Implementation of the undoable page rename.
 */
RenamePage.prototype.execute = function()
{
	var tmp = this.page.getName();
	this.page.setName(this.previous);
	this.name = this.previous;
	this.previous = tmp;
	
	// Required to update page name in placeholders
	this.ui.editor.graph.updatePlaceholders();
	this.ui.editor.fireEvent(new mxEventObject('pageRenamed'));
};

/**
 * Undoable change of page title.
 */
function MovePage(ui, oldIndex, newIndex)
{
	this.ui = ui;
	this.oldIndex = oldIndex;
	this.newIndex = newIndex;
}

/**
 * Implementation of the undoable page rename.
 */
MovePage.prototype.execute = function()
{
	this.ui.pages.splice(this.newIndex, 0, this.ui.pages.splice(this.oldIndex, 1)[0]);
	var tmp = this.oldIndex;
	this.oldIndex = this.newIndex;
	this.newIndex = tmp;
	
	// Required to update page numbers in placeholders
	this.ui.editor.graph.updatePlaceholders();
	this.ui.editor.fireEvent(new mxEventObject('pageMoved'));
};

/**
 * Class: mxCurrentRootChange
 *
 * Action to change the current root in a view.
 *
 * Constructor: mxCurrentRootChange
 *
 * Constructs a change of the current root in the given view.
 */
function SelectPage(ui, page, viewState)
{
	this.ui = ui;
	this.page = page;
	this.previousPage = page;
	
	if (page != null)
	{
		this.ui.updatePageRoot(page);
		
		if (viewState != null)
		{
			page.viewState = viewState;
		}
	}
};

/**
 * Executes selection of a new page.
 */
SelectPage.prototype.execute = function()
{
	var prevIndex = mxUtils.indexOf(this.ui.pages, this.previousPage);
	
	if (this.page != null && prevIndex >= 0)
	{
		var page = this.ui.currentPage;
		var editor = this.ui.editor;
		var graph = editor.graph;
		
		// Stores current diagram state in the page
		var data = Graph.compressNode(editor.getGraphXml(true));
		mxUtils.setTextContent(page.node, data);
		page.viewState = graph.getViewState();
		page.root = graph.model.root;
		
		if (page.model != null)
		{
			// Updates internal structures of offpage model
			page.model.rootChanged(page.root);
		}
		
		// Removes the previous cells and clears selection
		graph.view.clear(page.root, true);
		graph.clearSelection();
			
		// Switches the current page
		this.ui.currentPage = this.previousPage;
		this.previousPage = page;
		page = this.ui.currentPage;
	
		// Switches the root cell and sets the view state
		graph.model.prefix = Editor.guid() + '-';
		graph.model.rootChanged(page.root);
		graph.setViewState(page.viewState);

		// Handles grid state in chromeless mode which is stored in Editor instance
		graph.gridEnabled = graph.gridEnabled && (!this.ui.editor.isChromelessView() ||
			urlParams['grid'] == '1');
		
		// Fires events
		editor.graph.fireEvent(new mxEventObject(mxEvent.ROOT));
		editor.fireEvent(new mxEventObject('pageSelected', 'change', this));
	}
};

/**
 * 
 */
function ChangePage(ui, page, select, index, noSelect)
{
	SelectPage.call(this, ui, select);
	this.relatedPage = page;
	this.index = index;
	this.previousIndex = null;
	this.noSelect = noSelect;
};

mxUtils.extend(ChangePage, SelectPage);

/**
 * Function: execute
 *
 * Changes the current root of the view.
 */
ChangePage.prototype.execute = function()
{
	// Fires event to setting view state from realtime
	this.ui.editor.fireEvent(new mxEventObject('beforePageChange', 'change', this));
	this.previousIndex = this.index;
	
	if (this.index == null)
	{
		var tmp = mxUtils.indexOf(this.ui.pages, this.relatedPage);
		this.ui.pages.splice(tmp, 1);
		this.index = tmp;
	}
	else
	{
		this.ui.pages.splice(this.index, 0, this.relatedPage);
		this.index = null;
	}
	
	if (!this.noSelect)
	{
		SelectPage.prototype.execute.apply(this, arguments);
	}
};

/**
 * 
 */
function ReplaceDiagram(ui, data)
{
	this.ui = ui;
	this.data = data;
};

/**
 * Function: execute
 *
 * Changes the current root of the view.
 */
ReplaceDiagram.prototype.execute = function()
{
	var graph = this.ui.editor.graph;
	var data = this.ui.editor.getGraphXml();

	this.ui.editor.readGraphState(this.data);
	this.ui.editor.updateGraphComponents();
	
	var dec = new mxCodec(this.data.ownerDocument);
	var model = new mxGraphModel();
	dec.decode(this.data, model);
	
	this.data = data;

	if (this.ui.currentPage)
	{
		this.ui.currentPage.viewState = graph.getViewState();
		this.ui.currentPage.root = model.root;

		if (this.ui.currentPage.model != null)
		{
			// Updates internal structures of offpage model
			this.ui.currentPage.model.rootChanged(this.ui.currentPage.model.root);
		}
	}

	graph.view.clear(graph.model.root, true);
	graph.model.rootChanged(model.root);
	graph.fireEvent(new mxEventObject(mxEvent.ROOT));
};

/**
 * Specifies the height of the tab container. Default is 36.
 */
EditorUi.prototype.tabContainerHeight = 36;

/**
 * Returns the index of the selected page.
 */
EditorUi.prototype.setTabContainerVisible = function(visible)
{
	if (visible)
	{
		this.tabContainerHeight = EditorUi.prototype.tabContainerHeight;
	}
	else
	{
		this.tabContainerHeight = 0;
	}

	if (isLocalStorage)
	{
		mxSettings.settings.pages = this.tabContainerHeight > 0;
		mxSettings.save();
	}

	this.editor.updateGraphComponents();
	this.refresh();
};

/**
 * Returns the index of the selected page.
 */
EditorUi.prototype.isTabContainerVisible = function()
{
	return this.tabContainerHeight > 0;
};

/**
 * Returns the index of the selected page.
 */
EditorUi.prototype.getSelectedPageIndex = function()
{
	return this.getPageIndex(this.currentPage);
};

/**
 * Returns the index of the given page.
 */
 EditorUi.prototype.getPageIndex = function(page)
 {
	 var result = null;
	 
	 if (this.pages != null && page != null)
	 {
		 for (var i = 0; i < this.pages.length; i++)
		 {
			 if (this.pages[i] == page)
			 {
				 result = i;
				 
				 break;
			 }
		 }
	 }
	 
	 return result;
 };
 
/**
 * Returns the page with the given ID from the optional array of pages.
 */
EditorUi.prototype.getPageById = function(id, pages)
{
	pages = (pages != null) ? pages : this.pages;

	if (pages != null)
	{
		for (var i = 0; i < pages.length; i++)
		{
			if (pages[i].getId() == id)
			{
				return pages[i];
			}
		}
	}

	return null;
};

/**
 * Returns the background image for the given page link.
 */
EditorUi.prototype.createImageForPageLink = function(src, sourcePage, sourceGraph)
{
	var comma = src.indexOf(',');
	var result = null;
		
	if (comma > 0)
	{
		var page = this.getPageById(src.substring(comma + 1));

		if (page != null && page != sourcePage)
		{
			result = this.getImageForPage(page, sourcePage, sourceGraph);
			result.originalSrc = src;
		}
	}

	if (result == null)
	{
		result = {originalSrc: src};
	}

	return result;
};

/**
 * Returns true if the given string contains an mxfile.
 */
EditorUi.prototype.pageSelected = function()
{
	var graph = this.editor.graph;
	var page = this.currentPage;

	if (page != null)
	{
		graph.tooltipHandler.hide();

		if (page.viewState == null ||
			page.viewState.scrollTop == null ||
			page.viewState.scrollLeft == null)
		{
			// Selects unlocked layer if page was never shown
			graph.selectUnlockedLayer();
			this.resetScrollbars();

			if (graph.isLightboxView())
			{
				this.lightboxFit();
			}

			if (this.chromelessResize != null)
			{
				graph.container.scrollleft = 0;
				graph.container.scrollTop = 0;
				this.chromelessResize();
			}
		}
		else
		{
			// Restores scrollbar positions
			graph.setScrollbarPositions(page.viewState,
				graph.view.translate.x, graph.view.translate.y);
		}
		
		this.updateTabContainer();
		this.scrollToPage();
	}
};

/**
 * Returns true if the given string contains an mxfile.
 */
EditorUi.prototype.getImageForPage = function(page, sourcePage, sourceGraph)
{
	sourceGraph = (sourceGraph != null) ? sourceGraph : this.editor.graph;
	var graphGetGlobalVariable = sourceGraph.getGlobalVariable;
	var graph = this.createTemporaryGraph(sourceGraph.getStylesheet());
	graph.defaultPageBackgroundColor = sourceGraph.defaultPageBackgroundColor;
	graph.shapeBackgroundColor = sourceGraph.shapeBackgroundColor;
	graph.shapeForegroundColor = sourceGraph.shapeForegroundColor;
	var index = this.getPageIndex((sourcePage != null) ?
		sourcePage : this.currentPage);

	graph.getGlobalVariable = function(name)
	{
		if (name == 'pagenumber')
		{
			return index + 1;
		}
		else if (name == 'page' && sourcePage != null)
		{
			return sourcePage.getName();
		}
		else
		{
			return graphGetGlobalVariable.apply(this, arguments);
		}
	};

	document.body.appendChild(graph.container);

	this.updatePageRoot(page);
	graph.model.setRoot(page.root);

	var temp = Graph.foreignObjectWarningText;
	Graph.foreignObjectWarningText = '';
	var theme = (Editor.cssDarkMode || Editor.isDarkMode()) ?
		'dark' : 'light';
	var svgRoot = graph.getSvg(null, null, null, null, null,
		null, null, null, null, null, null, theme);
	var bounds = graph.getGraphBounds();
	document.body.removeChild(graph.container);
	Graph.foreignObjectWarningText = temp;

	return new mxImage(Editor.createSvgDataUri(mxUtils.getXml(svgRoot)),
		bounds.width, bounds.height, bounds.x, bounds.y);
};

/**
 * Returns true if the given string contains an mxfile.
 */
EditorUi.prototype.initPages = function()
{
	if (!this.editor.graph.standalone)
	{
		this.actions.addAction('previousPage', mxUtils.bind(this, function()
		{
			this.selectNextPage(false);
		}));
		
		this.actions.addAction('nextPage', mxUtils.bind(this, function()
		{
			this.selectNextPage(true);
		}));

		if (this.isPagesEnabled())
		{
			this.keyHandler.bindAction(33, true, 'previousPage', true); // Ctrl+Shift+PageUp
			this.keyHandler.bindAction(34, true, 'nextPage', true); // Ctrl+Shift+PageDown
		}
			
		// Updates the tabs after loading the diagram
		var graph = this.editor.graph;
		var graphViewValidateBackground = graph.view.validateBackground; 
		
		graph.view.validateBackground = mxUtils.bind(this, function()
		{
			if (this.tabContainer != null)
			{
				var prevHeight = this.tabContainer.style.height;
				
				if (this.fileNode == null || this.pages == null ||
					(this.pages.length == 1 && urlParams['pages'] == '0'))
				{
					this.tabContainer.style.height = '0px';
				}
				else
				{
					this.tabContainer.style.height = this.tabContainerHeight + 'px';
				}
				
				if (prevHeight != this.tabContainer.style.height)
				{
					this.refresh(false);
				}
			}
			
			graphViewValidateBackground.apply(graph.view, arguments);
		});

		// Adds a graph model listener to update the view
		this.editor.graph.model.addListener(mxEvent.CHANGE, mxUtils.bind(this, function(sender, evt)
		{
			var edit = evt.getProperty('edit');
			var changes = edit.changes;
			
			for (var i = 0; i < changes.length; i++)
			{
				if (changes[i] instanceof RenamePage ||
					changes[i] instanceof MovePage ||
					changes[i] instanceof mxRootChange)
				{
					this.updateTabContainer();
					break;	
				}
			}
		}));
		
		// Invokes pageSelected to reset/restore view state
		var graphSizeDidChange = graph.sizeDidChange;
		var lastPage = null;
		var ui = this;

		graph.sizeDidChange = function()
		{
			var result = graphSizeDidChange.apply(this, arguments);

			if (ui.currentPage != null &&
				lastPage != ui.currentPage)
			{
				lastPage = ui.currentPage;
				ui.pageSelected();
			}

			return result;
		};

		var pagesChanged = mxUtils.bind(this, function()
		{
			this.updateDocumentTitle();
			this.updateTabContainer();
		});

		this.addListener('currentThemeChanged', pagesChanged);
		this.editor.addListener('pagesPatched', pagesChanged);
		this.editor.addListener('pageRenamed', pagesChanged);
		this.editor.addListener('pageMoved', pagesChanged);
		this.editor.addListener('fileLoaded', pagesChanged);

		this.editor.addListener('pageSelected', mxUtils.bind(this, function(sender, evt)
		{
			this.scrollToPage();
			this.updateHashObject();
			this.updateTabContainer();
			this.updateDocumentTitle();

			if (this.toolbar != null)
			{
				this.toolbar.updateZoom();
			}
		}));

		this.editor.addListener('pageMoved', mxUtils.bind(this, function(sender, evt)
		{
			this.scrollToPage();
			this.updateHashObject();
		}));

		mxEvent.addListener(window, 'resize', mxUtils.bind(this, function()
		{
			this.checkTabScrollerOverflow();
		}));
	}
};

/**
 * Adds the listener for automatically saving the diagram for local changes.
 */
EditorUi.prototype.scrollToPage = function()
{
	var index = this.getSelectedPageIndex();

	if (this.tabScroller != null && this.tabScroller.children.length > index &&
		this.tabScroller.children[index] != null)
	{
		this.tabScroller.children[index].scrollIntoView(
			{block: 'nearest', inline: 'nearest'});
		this.tabScroller.children[index].className =
			'geTab gePageTab geActivePage';
		lastSelectedElt = this.tabScroller.children[index];
	}
};

/**
 * Adds the listener for automatically saving the diagram for local changes.
 */
EditorUi.prototype.restoreViewState = function(page, viewState, selection)
{
	var newPage = (page != null) ? this.getPageById(page.getId()) : null;
	var graph = this.editor.graph;
	
	if (newPage != null && this.currentPage != null && this.pages != null)
	{
		if (newPage != this.currentPage)
		{
			this.selectPage(newPage, true, viewState);
		}
		else
		{
			// TODO: Pass viewState to setGraphXml
			graph.setViewState(viewState);
			this.editor.updateGraphComponents();
			graph.view.revalidate();
			graph.sizeDidChange();
		}

		graph.container.scrollLeft = graph.view.translate.x * graph.view.scale + viewState.scrollLeft;
		graph.container.scrollTop = graph.view.translate.y * graph.view.scale + viewState.scrollTop;
		graph.restoreSelection(selection);
	}
};

/**
 * Overrides setDefaultParent
 */
Graph.prototype.createViewState = function(node)
{
	var pv = node.getAttribute('page');
	var ps = parseFloat(node.getAttribute('pageScale'));
	var pw = parseFloat(node.getAttribute('pageWidth'));
	var ph = parseFloat(node.getAttribute('pageHeight'));
	var bg = node.getAttribute('background');
	var bgImg = this.parseBackgroundImage(node.getAttribute('backgroundImage'));
	var extFonts = node.getAttribute('extFonts');
	
	if (extFonts)
	{
		try
		{
			extFonts = extFonts.split('|').map(function(ef)
			{
				var parts = ef.split('^');
				return {name: parts[0], url: parts[1]};
			});
		}
		catch(e)
		{
			console.log('ExtFonts format error: ' + e.message);
		}
	}

	return {
		gridEnabled: node.getAttribute('grid') != '0',
		//gridColor: node.getAttribute('gridColor') || mxSettings.getGridColor(Editor.isDarkMode()),
		gridSize: parseFloat(node.getAttribute('gridSize')) || mxGraph.prototype.gridSize,
		guidesEnabled: node.getAttribute('guides') != '0',
		foldingEnabled: node.getAttribute('fold') != '0',
		shadowVisible: node.getAttribute('shadow') == '1',
		pageVisible: (this.isLightboxView()) ? false : ((pv != null) ? (pv != '0') : this.defaultPageVisible),
		background: (bg != null && bg.length > 0) ? bg : null,
		backgroundImage: bgImg,
		pageScale: (!isNaN(ps)) ? ps : mxGraph.prototype.pageScale,
		pageFormat: (!isNaN(pw) && !isNaN(ph)) ? new mxRectangle(0, 0, pw, ph) :
			((typeof mxSettings === 'undefined' || this.defaultPageFormat != null) ?
				mxGraph.prototype.pageFormat : mxSettings.getPageFormat()),
		tooltips: node.getAttribute('tooltips') != '0',
		connect: node.getAttribute('connect') != '0',
		arrows: node.getAttribute('arrows') != '0',
		mathEnabled: node.getAttribute('math') == '1',
		selectionCells: null,
		defaultParent: null,
		scrollbars: this.defaultScrollbars,
		scale: 1,
		hiddenTags: [],
		extFonts: extFonts || []
	};
};

/**
 * Writes the graph properties from the realtime model to the given mxGraphModel node.
 */
Graph.prototype.saveViewState = function(vs, node, ignoreTransient, resolveReferences)
{
	if (!ignoreTransient)
	{
		node.setAttribute('grid', ((vs == null) ? this.defaultGridEnabled : vs.gridEnabled) ? '1' : '0');
		node.setAttribute('page', ((vs == null) ? this.defaultPageVisible : vs.pageVisible) ? '1' : '0');
		node.setAttribute('gridSize', (vs != null) ? vs.gridSize : mxGraph.prototype.gridSize);
		node.setAttribute('guides', (vs == null || vs.guidesEnabled) ? '1' : '0');
		node.setAttribute('tooltips', (vs == null || vs.tooltips) ? '1' : '0');
		node.setAttribute('connect', (vs == null || vs.connect) ? '1' : '0');
		node.setAttribute('arrows', (vs == null || vs.arrows) ? '1' : '0');
		
		// Ignores fold to avoid checksum errors for lightbox mode
		node.setAttribute('fold', (vs == null || vs.foldingEnabled) ? '1' : '0');
	}

	node.setAttribute('pageScale', (vs != null && vs.pageScale != null) ?
		vs.pageScale : mxGraph.prototype.pageScale);
	
	var pf = (vs != null) ? vs.pageFormat : (typeof mxSettings === 'undefined' ||
		this.defaultPageFormat != null) ? mxGraph.prototype.pageFormat :
			mxSettings.getPageFormat();
	
	if (pf != null)
	{
		node.setAttribute('pageWidth', pf.width);
		node.setAttribute('pageHeight', pf.height);
	}

	if (vs != null)
	{
		if (vs.background != null)
		{
			node.setAttribute('background', vs.background);
		}

		var bgImg = this.getBackgroundImageObject(vs.backgroundImage, resolveReferences);

		if (bgImg != null)
		{
			node.setAttribute('backgroundImage', JSON.stringify(bgImg));
		}
	}

	node.setAttribute('math', ((vs == null) ? this.defaultMathEnabled : vs.mathEnabled) ? '1' : '0');
	node.setAttribute('shadow', (vs != null && vs.shadowVisible) ? '1' : '0');
	
	if (vs != null && vs.extFonts != null && vs.extFonts.length > 0)
	{
		node.setAttribute('extFonts', vs.extFonts.map(function(ef)
		{
			return ef.name + '^' + ef.url;
		}).join('|'));
	}
};

/**
 * Overrides setDefaultParent
 */
Graph.prototype.getViewState = function()
{
	return {
		defaultParent: this.defaultParent,
		currentRoot: this.view.currentRoot,
		gridEnabled: this.gridEnabled,
		//gridColor: this.view.gridColor,
		gridSize: this.gridSize,
		guidesEnabled: this.graphHandler.guidesEnabled,
		foldingEnabled: this.foldingEnabled,
		shadowVisible: this.shadowVisible,
		scrollbars: this.scrollbars,
		pageVisible: this.pageVisible,
		background: this.background,
		backgroundImage: this.backgroundImage,
		pageScale: this.pageScale,
		pageFormat: this.pageFormat,
		tooltips: this.tooltipHandler.isEnabled(),
		connect: this.connectionHandler.isEnabled(),
		arrows: this.connectionArrowsEnabled,
		scale: this.view.scale,
		scrollLeft: this.container.scrollLeft - this.view.translate.x * this.view.scale,
		scrollTop: this.container.scrollTop - this.view.translate.y * this.view.scale,
		translate: this.view.translate.clone(),
		lastPasteXml: this.lastPasteXml,
		pasteCounter: this.pasteCounter,
		mathEnabled: this.mathEnabled,
		hiddenTags: this.hiddenTags,
		extFonts: this.extFonts
	};
};

/**
 * Overrides setDefaultParent
 */
Graph.prototype.setViewState = function(state, removeOldExtFonts)
{
	if (state != null)
	{
		this.lastPasteXml = state.lastPasteXml;
		this.pasteCounter = state.pasteCounter || 0;
		this.mathEnabled = state.mathEnabled;
		this.gridEnabled = state.gridEnabled;
		//this.view.gridColor = state.gridColor;
		this.gridSize = state.gridSize;
		this.graphHandler.guidesEnabled = state.guidesEnabled;
		this.foldingEnabled = state.foldingEnabled;
		this.setShadowVisible(state.shadowVisible, false);
		this.scrollbars = state.scrollbars;
		this.pageVisible = !this.isViewer() && state.pageVisible;
		this.background = state.background;
		this.pageScale = state.pageScale;
		this.pageFormat = state.pageFormat;
		this.view.currentRoot = state.currentRoot;
		this.defaultParent = state.defaultParent;
		this.connectionArrowsEnabled = state.arrows;
		this.setTooltips(state.tooltips);
		this.setConnectable(state.connect);
		this.setBackgroundImage(state.backgroundImage);
		this.hiddenTags = state.hiddenTags;

		var oldExtFonts = this.extFonts;
		this.extFonts = state.extFonts || [];

		// Removing old fonts is important for real-time synchronization
		// But, for page change, it results in undesirable font flicker
		if (removeOldExtFonts && oldExtFonts != null)
		{
			for (var i = 0; i < oldExtFonts.length; i++)
			{
				var fontElem = document.getElementById('extFont_' + oldExtFonts[i].name);
				
				if (fontElem != null)
				{
					fontElem.parentNode.removeChild(fontElem);
				}
			}
		}
		
		for (var i = 0; i < this.extFonts.length; i++)
		{
			this.addExtFont(this.extFonts[i].name, this.extFonts[i].url, true);
		}
		
		if (state.scale != null)
		{
			this.view.scale = state.scale;
		}
		else
		{
			this.view.scale = 1;
		}
		
		// Checks if current root or default parent have been removed
		if (this.view.currentRoot != null &&
			!this.model.contains(this.view.currentRoot))
		{
			this.view.currentRoot = null;
		}
		
		if (this.defaultParent != null &&
			!this.model.contains(this.defaultParent))
		{
			this.setDefaultParent(null);
			this.selectUnlockedLayer();
		}
		
		if (state.translate != null)
		{
			this.view.translate = state.translate;
		}
	}
	else
	{
		this.view.currentRoot = null;
		this.view.scale = 1;
		this.gridEnabled = this.defaultGridEnabled;
		this.gridSize = mxGraph.prototype.gridSize;
		this.pageScale = mxGraph.prototype.pageScale;
		this.pageFormat = (typeof mxSettings === 'undefined' || this.defaultPageFormat != null) ?
			mxGraph.prototype.pageFormat : mxSettings.getPageFormat();
		this.pageVisible = this.defaultPageVisible;
		this.background = null;
		this.backgroundImage = null;
		this.scrollbars = this.defaultScrollbars;
		this.graphHandler.guidesEnabled = true;
		this.foldingEnabled = true;
		this.setShadowVisible(false, false);
		this.defaultParent = null;
		this.setTooltips(true);
		this.setConnectable(true);
		this.lastPasteXml = null;
		this.pasteCounter = 0;
		this.mathEnabled = this.defaultMathEnabled;
		this.connectionArrowsEnabled = true;
		this.hiddenTags = [];
		this.extFonts = [];
	}
	
	// Implicit settings
	this.pageBreaksVisible = this.pageVisible; 
	this.preferPageSize = this.pageVisible;
	this.fireEvent(new mxEventObject('viewStateChanged', 'state', state));
};

/**
 * Sets the scrollbar positions from the given view state.
 */
Graph.prototype.setScrollbarPositions = function(state, dx, dy)
{
	if (state != null &&
		state.scrollLeft != null &&
		state.scrollTop != null)
	{
		this.container.scrollLeft = dx *
			this.view.scale + state.scrollLeft;
		this.container.scrollTop = dy *
			this.view.scale + state.scrollTop;
	}
};

/**
 * Executes selection of a new page.
 */
Graph.prototype.addExtFont = function(fontName, fontUrl, dontRemember)
{
	// KNOWN: Font not added when pasting cells with custom fonts
	if (fontName && fontUrl)
	{
		if (urlParams['ext-fonts'] != '1')
		{
			// Adds inserted fonts to font family menu
			Graph.recentCustomFonts[fontName.toLowerCase()] = {name: fontName, url: fontUrl};
		}
		
		var fontId = 'extFont_' + fontName;

		if (document.getElementById(fontId) == null)
		{
			if (fontUrl.indexOf(Editor.GOOGLE_FONTS) == 0)
			{
				mxClient.link('stylesheet', fontUrl, null, fontId);
			}
			else
			{
				var head = document.getElementsByTagName('head')[0];
				
				// KNOWN: Should load fonts synchronously
				var style = document.createElement('style');
				
				style.appendChild(document.createTextNode('@font-face {\n' +
					'\tfont-family: "'+ fontName +'";\n' + 
					'\tsrc: url("'+ fontUrl +'");\n}'));
				
				style.setAttribute('id', fontId);
				var head = document.getElementsByTagName('head')[0];
		   		head.appendChild(style);
			}
		}
		
		if (!dontRemember)
		{
			if (this.extFonts == null) 
			{
				this.extFonts = [];
			}
			
			var extFonts = this.extFonts, notFound = true;
			
			for (var i = 0; i < extFonts.length; i++)
			{
				if (extFonts[i].name == fontName)
				{
					notFound = false;
					break;
				}
			}
			
			if (notFound)
			{
				this.extFonts.push({name: fontName, url: fontUrl});
			}
		}
	}
};

/**
 * Executes selection of a new page.
 */
EditorUi.prototype.updatePageRoot = function(page, checked)
{
	if (page.root == null)
	{
		var node = this.editor.extractGraphModel(page.node, null, checked);
		var cause = Editor.extractParserError(node);
		
		if (cause)
		{
			throw new Error(cause);
		}
		else if (node != null)
		{
			page.graphModelNode = node;
			
			// Converts model XML into page object with root cell
			page.viewState = this.editor.graph.createViewState(node);
			var codec = new mxCodec(node.ownerDocument);
			page.root = codec.decode(node).root;
		}
		else
		{
			// Initializes page object with new empty root
			page.root = this.editor.graph.model.createRoot();
		}
	}
	else if (page.viewState == null)
	{
		if (page.graphModelNode == null)
		{
			var node = this.editor.extractGraphModel(page.node);
			
			var cause = Editor.extractParserError(node);
			
			if (cause)
			{
				throw new Error(cause);
			}
			else if (node != null)
			{
				page.graphModelNode = node;
			}
		}
		
		if (page.graphModelNode != null)
		{
			page.viewState = this.editor.graph.createViewState(page.graphModelNode);	
		}
	}
	
	return page;
};

/**
 * Adds keyboard shortcuts for page handling.
 */
EditorUi.prototype.replaceDiagramData = function(data)
{
	this.editor.graph.model.execute(new ReplaceDiagram(
		this, mxUtils.parseXml(data).documentElement));
};

/**
 * Returns true if the given string contains an mxfile.
 */
EditorUi.prototype.selectPage = function(page, quiet, viewState)
{
	try
	{
		if (page != this.currentPage)
		{
			var graph = this.editor.graph;

			if (graph.isEditing())
			{
				graph.stopEditing(false);
			}
			
			quiet = (quiet != null) ? quiet : false;
			graph.isMouseDown = false;
			graph.reset();
			
			var edit = graph.model.createUndoableEdit();
			
			// Special flag to bypass autosave for this edit
			edit.ignoreEdit = true;

			var change = new SelectPage(this, page, viewState);
			change.execute();
			edit.add(change);
			edit.notify();
			
			if (!quiet)
			{
				graph.model.fireEvent(new mxEventObject(
					mxEvent.UNDO, 'edit', edit));
			}
		}
	}
	catch (e)
	{
		this.handleError(e);
	}
};

/**
 * 
 */
EditorUi.prototype.selectNextPage = function(forward)
{
	var next = this.currentPage;
	
	if (next != null && this.pages != null)
	{
		var tmp = mxUtils.indexOf(this.pages, next);
		
		if (forward)
		{
			this.selectPage(this.pages[mxUtils.mod(tmp + 1, this.pages.length)]);
		}
		else if (!forward)
		{
			this.selectPage(this.pages[mxUtils.mod(tmp - 1, this.pages.length)]);
		}
	}
};

/**
 * Returns true if the given string contains an mxfile.
 */
EditorUi.prototype.insertPage = function(page, index)
{
	if (this.editor.graph.isEnabled())
	{
		if (this.editor.graph.isEditing())
		{
			this.editor.graph.stopEditing(false);
		}
		
		page = (page != null) ? page : this.createPage(null, this.createPageId());
		index = (index != null) ? index : this.pages.length;
		
		// Uses model to fire event and trigger autosave
		var change = new ChangePage(this, page, page, index);
		this.editor.graph.model.execute(change);
	}
	
	return page;
};

/**
 * Returns a unique page ID.
 */
EditorUi.prototype.createPageId = function()
{
	var id = null;
	
	do
	{
		id = Editor.guid();
	} while (this.getPageById(id) != null)
	
	return id;
};

/**
 * Returns a new DiagramPage instance.
 */
EditorUi.prototype.createPage = function(name, id)
{
	var doc = (this.fileNode != null) ? this.fileNode.ownerDocument : document;
	var page = new DiagramPage(doc.createElement('diagram'), id);
	page.setName((name != null) ? name : this.createPageName());
	this.initDiagramNode(page);
	
	return page;
};

/**
 * Returns a page name.
 */
EditorUi.prototype.createPageName = function()
{
	// Creates a lookup with names
	var existing = {};
	
	for (var i = 0; i < this.pages.length; i++)
	{
		var tmp = this.pages[i].getName();
		
		if (tmp != null && tmp.length > 0)
		{
			existing[tmp] = tmp;
		}
	}

	// Avoids existing names
	var nr = this.pages.length;
	var name = null;
	
	do
	{
		name = mxResources.get('pageWithNumber', [++nr]);
	}
	while (existing[name] != null);
	
	return name;
};

/**
 * Removes the given page.
 */
EditorUi.prototype.removePage = function(page)
{
	try
	{
		var graph = this.editor.graph;
		var tmp = mxUtils.indexOf(this.pages, page);
		
		if (graph.isEnabled() && tmp >= 0)
		{
			if (this.editor.graph.isEditing())
			{
				this.editor.graph.stopEditing(false);
			}
			
			graph.model.beginUpdate();
			try
			{
				var next = this.currentPage;
				
				if (next == page && this.pages.length > 1)
				{
					if (tmp == this.pages.length - 1)
					{
						tmp--;
					}
					else
					{
						tmp++;
					}
					
					next = this.pages[tmp];
				}
				else if (this.pages.length <= 1)
				{
					// Removes label with incorrect page number to force
					// default page name which is OK for a single page
					next = this.insertPage();
					graph.model.execute(new RenamePage(this, next,
						mxResources.get('pageWithNumber', [1])));
				}
				
				// Uses model to fire event to trigger autosave
				graph.model.execute(new ChangePage(this, page, next));
			}
			finally
			{
				graph.model.endUpdate();
			}
		}
	}
	catch (e)
	{
		this.handleError(e);
	}
	
	return page;
};

/**
 * Duplicates the given page.
 */
EditorUi.prototype.duplicatePage = function(page, name)
{
	var newPage = null;
	
	try
	{
		var graph = this.editor.graph;
		
		if (graph.isEnabled())
		{
			if (graph.isEditing())
			{
				graph.stopEditing();
			}
			
			// Clones the current page and takes a snapshot of the graph model and view state
			var node = page.node.cloneNode(false);
			node.removeAttribute('id');

			var cloneMap = new Object();
			var lookup = graph.createCellLookup([graph.model.root]);

			var newPage = new DiagramPage(node);
			newPage.root = graph.cloneCell(graph.model.root,
				null, cloneMap);
			// Updates cell IDs
			var model = new mxGraphModel();
			model.prefix = Editor.guid() + '-';
			model.setRoot(newPage.root);

			// Updates custom links
			graph.updateCustomLinks(graph.createCellMapping(
				cloneMap, lookup), [newPage.root]);
			
			// Initializes diagram node
			newPage.viewState = (page == this.currentPage) ?
				graph.getViewState() : page.viewState;
			this.initDiagramNode(newPage);
			
			// Resets zoom and scrollbar positions
			newPage.viewState.scale = 1;
			delete newPage.viewState.scrollLeft;
			delete newPage.viewState.scrollTop;
			delete newPage.viewState.currentRoot
			delete newPage.viewState.defaultParent;
			newPage.setName(name);
			
			// Inserts new page after duplicated page
			newPage = this.insertPage(newPage,
				mxUtils.indexOf(this.pages,
					page) + 1);
		}
	}
	catch (e)
	{
		this.handleError(e);
	}
	
	return newPage;
};

/**
 * Duplicates the given page.
 */
EditorUi.prototype.initDiagramNode = function(page)
{
	var enc = new mxCodec(mxUtils.createXmlDocument());
	var temp = enc.encode(new mxGraphModel(page.root));
	this.editor.graph.saveViewState(page.viewState, temp);
	mxUtils.setTextContent(page.node, Graph.compressNode(temp));
};

/**
 * Duplicates the given page.
 */
EditorUi.prototype.clonePages = function(pages)
{
	var errors = [];
	var result = [];
	
	for (var i = 0; i < pages.length; i++)
	{
		try
		{
			result.push(this.clonePage(pages[i]));
		}
		catch (e)
		{
			errors.push(mxResources.get('pageWithNumber', [i + 1]) +
				' (' + pages[i].getName() + '): ' + e.message);
		}
	}

	if (errors.length > 0)
	{
		throw new Error(errors.join('\n'));
	}
	
	return result;
};

/**
 * Duplicates the given page.
 */
EditorUi.prototype.clonePage = function(page)
{
	this.updatePageRoot(page);

	var result = new DiagramPage(page.node.cloneNode(true));
	var viewState = (page == this.currentPage) ?
		this.editor.graph.getViewState() :
		page.viewState;
	result.viewState = mxUtils.clone(viewState,
		EditorUi.transientViewStateProperties)
	result.root = this.editor.graph.model.cloneCell(
		page.root, null, true);

	return result;
};

/**
 * Renames the given page using a dialog.
 */
EditorUi.prototype.renamePage = function(page)
{
	var graph = this.editor.graph;

	if (graph.isEnabled())
	{
		var dlg = new FilenameDialog(this, page.getName(), mxResources.get('rename'),
			mxUtils.bind(this, function(name)
		{
			if (name != null && name.length > 0)
			{
				this.editor.graph.model.execute(new RenamePage(this, page, name));
			}
		}), mxResources.get('rename'));
		this.showDialog(dlg.container, 300, 80, true, true);
		dlg.init();
	}
	
	return page;
}

/**
 * Returns true if the given string contains an mxfile.
 */
EditorUi.prototype.movePage = function(oldIndex, newIndex)
{
	this.editor.graph.model.execute(new MovePage(this, oldIndex, newIndex));
}

/**
 * Returns true if the given string contains an mxfile.
 */
EditorUi.prototype.createTabContainer = function()
{
	var div = document.createElement('div');
	div.className = 'geTabContainer geTabItem';
	
	return div;
};

/**
 * Returns true if the given string contains an mxfile.
 */
EditorUi.prototype.updateTabContainer = function()
{
	if (this.tabContainer != null && this.pages != null)
	{
		var graph = this.editor.graph;
		var wrapper = document.createElement('div');
		wrapper.className = 'geTabScroller';
		var startIndex = null;

		for (var i = 0; i < this.pages.length; i++)
		{
			// Install drag and drop for page reorder
			(mxUtils.bind(this, function(index, tab)
			{
				if (this.pages[index] == this.currentPage)
				{
					tab.className = 'geTab gePageTab geActivePage';
				}
				else
				{
					tab.className = 'geTab gePageTab geInactivePage';
				}
				
				tab.setAttribute('draggable', 'true');
				
				mxEvent.addListener(tab, 'dragstart', mxUtils.bind(this, function(evt)
				{
					if (graph.isEnabled())
					{
						// Workaround for no DnD on DIV in FF
						if (mxClient.IS_FF)
						{
							// LATER: Check what triggers a parse as XML on this in FF after drop
							evt.dataTransfer.setData('Text', '<diagram/>');
						}
						
						startIndex = index;
					}
					else
					{
						// Blocks event
						mxEvent.consume(evt);
					}
				}));
				
				mxEvent.addListener(tab, 'dragend', mxUtils.bind(this, function(evt)
				{
					startIndex = null;
					evt.stopPropagation();
					evt.preventDefault();
				}));
				
				mxEvent.addListener(tab, 'dragover', mxUtils.bind(this, function(evt)
				{
					if (startIndex != null)
					{
						evt.dataTransfer.dropEffect = 'move';
					}
					
					evt.stopPropagation();
					evt.preventDefault();
				}));
				
				mxEvent.addListener(tab, 'drop', mxUtils.bind(this, function(evt)
				{
					if (startIndex != null && index != startIndex)
					{
						// LATER: Shift+drag for merge, ctrl+drag for clone 
						this.movePage(startIndex, index);
					}

					evt.stopPropagation();
					evt.preventDefault();
				}));
				
				wrapper.appendChild(tab);
			}))(i, this.createTabForPage(this.pages[i], i + 1));
		}

		var sl = (this.tabScroller != null) ? this.tabScroller.scrollLeft : 0;
		this.tabContainer.innerText = '';

		if (Editor.currentTheme != 'simple')
		{
			this.pageMenuTab = this.createPageMenuTab();
			this.tabContainer.appendChild(this.pageMenuTab);
		}
		
		this.tabContainer.appendChild(wrapper);
		
		// Not chromeless and not read-only file
		if (this.isPageInsertTabVisible())
		{
			this.tabContainer.appendChild(this.createPageInsertTab());
		}

		this.leftScrollTab = this.createLeftScrollTab();
		this.tabContainer.appendChild(this.leftScrollTab);

		this.rightScrollTab = this.createRightScrollTab();
		this.tabContainer.appendChild(this.rightScrollTab);

		this.tabScroller = wrapper;
		this.tabScroller.scrollLeft = sl;
		this.checkTabScrollerOverflow();

		mxEvent.addListener(this.tabScroller, 'scroll', mxUtils.bind(this, function(evt)
		{
			this.checkTabScrollerOverflow();
		}));

		window.setTimeout(mxUtils.bind(this, function()
		{
			mxUtils.setPrefixedStyle(this.leftScrollTab.style, 'transition', 'all 0.2s linear');
			mxUtils.setPrefixedStyle(this.rightScrollTab.style, 'transition', 'all 0.2s linear');
		}), 0);
	}
};

/**
 * Returns true if the given string contains an mxfile.
 */
EditorUi.prototype.checkTabScrollerOverflow = function()
{
	if (this.tabScroller != null && this.tabContainer != null &&
		this.tabContainer.children.length > 2)
	{
		var overflow = this.tabScroller.scrollWidth > this.tabScroller.offsetWidth;
		this.leftScrollTab.style.opacity = (!overflow) ? 0 :
			((this.tabScroller.scrollLeft == 0) ? 0.2 : 1);
		this.rightScrollTab.style.opacity = (!overflow) ? 0 :
			((Math.ceil(this.tabScroller.scrollLeft) + this.tabScroller.offsetWidth >=
				this.tabScroller.scrollWidth) ? 0.2 : 1);
	}
};

/**
 * Returns true if the given string contains an mxfile.
 */
EditorUi.prototype.isPageInsertTabVisible = function()
{
	return urlParams['embed'] == 1 || (this.getCurrentFile() != null &&
		this.getCurrentFile().isEditable());
};

/**
 * Returns true if the given string contains an mxfile.
 */
EditorUi.prototype.createTab = function()
{
	var tab = document.createElement('div');
	tab.className = 'geTab';

	return tab;
};

/**
 * Returns a shortened page name.
 */
EditorUi.prototype.getShortPageName = function(page)
{
	var short = null;
	
	if (page != null)
	{
		short = page.getName();

		if (short != null && short.length > 36)
		{
			short = short.substring(0, 34) + '...';
		}
	}

	return short;
};

/**
 * Returns true if the given string contains an mxfile.
 */
EditorUi.prototype.createControlTab = function(title, image, fn)
{
	var tab = this.createTab();
	tab.className = 'geTab geControlTab';
	tab.style.width = '30px';

	if (title != null)
	{
		tab.setAttribute('title', title);
	}

	var inner = document.createElement('div');
	inner.className = 'geAdaptiveAsset';
	inner.style.backgroundImage = 'url(' + image + ')';
	inner.style.backgroundRepeat = 'no-repeat';
	inner.style.backgroundPosition = 'center';
	inner.style.backgroundSize = '24px';
	inner.style.position = 'relative';
	inner.style.opacity = '0.5';
	inner.style.width = '100%';
	inner.style.height = '100%';

	tab.appendChild(inner);

	mxEvent.addListener(tab, 'click', fn);

	return tab;
};

/**
 * Returns true if the given string contains an mxfile.
 */
EditorUi.prototype.createPageInsertTab = function()
{
	return this.createControlTab(mxResources.get('insertPage'),
		Editor.plusImage, mxUtils.bind(this, function(evt)
		{
			this.insertPage();
			mxEvent.consume(evt);
		}));
};

/**
 * Returns true if the given string contains an mxfile.
 */
EditorUi.prototype.createLeftScrollTab = function()
{
	return this.createControlTab(null, Editor.thinArrowLeftImage, mxUtils.bind(this, function(evt)
		{
			var dx = Math.max(60, this.tabScroller.clientWidth / 2);

			if (this.tabScroller.scrollBy != null)
			{
				this.tabScroller.scrollBy({left: -dx, top: 0, behavior: 'smooth'});
			}
			else
			{
				this.tabScroller.scrollLeft -= dx;
			}

			mxEvent.consume(evt);
		}));
};

/**
 * Returns true if the given string contains an mxfile.
 */
EditorUi.prototype.createRightScrollTab = function()
{
	return this.createControlTab(null, Editor.thinArrowRightImage, mxUtils.bind(this, function(evt)
		{
			var dx = Math.max(60, this.tabScroller.clientWidth / 2);

			if (this.tabScroller.scrollBy != null)
			{
				this.tabScroller.scrollBy({left: dx, top: 0, behavior: 'smooth'});
			}
			else
			{
				this.tabScroller.scrollLeft += dx;
			}

			mxEvent.consume(evt);
		}));
};

/**
 * Returns true if the given string contains an mxfile.
 */
EditorUi.prototype.createPageMenuTab = function()
{
	return this.createControlTab(mxResources.get('pages'),
		Editor.verticalDotsImage, mxUtils.bind(this, function(evt)
	{
		this.editor.graph.popupMenuHandler.hideMenu();

		var menu = new mxPopupMenu(mxUtils.bind(this, function(menu, parent)
		{
			this.menus.get('pages').funct(menu, parent);
		}));
		
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
	
		var x = mxEvent.getClientX(evt);
		var y = mxEvent.getClientY(evt);
		menu.popup(x, y, null, evt);
		
		// Allows hiding by clicking on document
		this.setCurrentMenu(menu);

		mxEvent.consume(evt);
	}));
};

/**
 * Returns true if the given string contains an mxfile.
 */
EditorUi.prototype.createTabForPage = function(page, pageNumber)
{
	var tab = this.createTab();
	var name = page.getName() || mxResources.get('untitled');
	var id = page.getId();
	tab.setAttribute('title', name + ((id != null) ?
		' (' + id + ')' : '') + ' [' + pageNumber + ']');
	
	var label = document.createElement('span');
	label.style.maxWidth = '160px';
	label.style.textOverflow = 'ellipsis';
	label.style.overflow = 'hidden';
	mxUtils.write(label, name);
	tab.appendChild(label);

	this.addTabListeners(page, tab);

	return tab;
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
EditorUi.prototype.addTabListeners = function(page, tab)
{
	mxEvent.disableContextMenu(tab);
	var graph = this.editor.graph;

	mxEvent.addListener(tab, 'dblclick', mxUtils.bind(this, function(evt)
	{
		this.renamePage(page)
		mxEvent.consume(evt);
	}));
	
	var elt = document.createElement('div');
	elt.className = 'geTabMenuButton';
	elt.style.backgroundImage = 'url(' + mxWindow.prototype.minimizeImage + ')';
	elt.style.backgroundPosition = 'center center';
	elt.style.backgroundRepeat = 'no-repeat';
	elt.style.backgroundSize = '10px';
	tab.appendChild(elt);
	
	var menuWasVisible = false;
	var pageWasActive = false;

	var onMouseDown = mxUtils.bind(this, function(evt)
	{
		// Do not consume event here to allow for drag and drop of tabs
		menuWasVisible = this.currentMenu != null;
		pageWasActive = page == this.currentPage;
		
		if (!graph.isMouseDown && !pageWasActive)
		{
			this.selectPage(page);
		}
		
		this.scrollToPage();
	});

	var onMouseUp = mxUtils.bind(this, function(evt)
	{
		if (graph.isEnabled() && !graph.isMouseDown &&
			((pageWasActive && (mxEvent.isTouchEvent(evt) ||
				mxEvent.getSource(evt) == elt)) ||
			mxEvent.isPopupTrigger(evt)))
		{
			graph.popupMenuHandler.hideMenu();
			this.hideCurrentMenu();

			if (!mxEvent.isTouchEvent(evt) || !menuWasVisible)
			{
				var menu = new mxPopupMenu(this.createPageMenu(page));
				
				menu.div.className += ' geMenubarMenu';
				menu.smartSeparators = true;
				menu.showDisabled = true;
				menu.autoExpand = true;
				
				// Disables autoexpand and destroys menu when hidden
				menu.hideMenu = mxUtils.bind(this, function()
				{
					mxPopupMenu.prototype.hideMenu.apply(menu, arguments);
					this.resetCurrentMenu();
					menu.destroy();
				});
		
				var x = mxEvent.getClientX(evt);
				var y = mxEvent.getClientY(evt);
				menu.popup(x, y, null, evt);
				this.setCurrentMenu(menu, tab);
			}
		}

		mxEvent.consume(evt);
	});

	mxEvent.addGestureListeners(elt, onMouseDown, null, onMouseUp);
	mxEvent.addGestureListeners(tab, onMouseDown, null, onMouseUp);
};

/**
 * Returns an absolute URL to the given page or null of absolute links
 * to pages are not supported in this file.
 */
EditorUi.prototype.getLinkForPage = function(page, params, lightbox)
{
	if (page != null && !mxClient.IS_CHROMEAPP && !EditorUi.isElectronApp)
	{
		var file = this.getCurrentFile();
		
		if (file != null && file.constructor != LocalFile && this.getServiceName() == 'draw.io')
		{
			var search = this.getSearch(['create', 'title', 'mode', 'url', 'drive', 'splash',
				'state', 'clibs', 'ui', 'viewbox', 'hide-pages', 'sketch']);
			search += ((search.length == 0) ? '?' : '&') + 'page-id=' + page.getId();
			
			if (params != null)
			{
				search += '&' + params.join('&');
			}
			
			return ((lightbox && urlParams['dev'] != '1') ? EditorUi.lightboxHost :
				(((mxClient.IS_CHROMEAPP || EditorUi.isElectronApp ||
				!(/.*\.draw\.io$/.test(window.location.hostname))) ?
				EditorUi.drawHost : 'https://' + window.location.host))) +
				'/' + search + '#' + file.getHash();
		}
	}
	
	return null;
};

/**
 * Returns true if the given string contains an mxfile.
 */
EditorUi.prototype.createPageMenu = function(page, label)
{
	return mxUtils.bind(this, function(menu, parent)
	{
		if (urlParams['embed'] != 1)
		{
			var url = this.getLinkForPage(page);

			if (url != null)
			{
				menu.addItem(mxResources.get('link') + '...', null, mxUtils.bind(this, function()
				{
					this.showPageLinkDialog(page);
				}));
			}
			
			if (!mxClient.IS_CHROMEAPP && !EditorUi.isElectronApp && this.getServiceName() == 'draw.io')
			{
				menu.addItem(mxResources.get('openInNewWindow'), null, mxUtils.bind(this, function()
				{
					this.editor.editAsNew(this.getFileData(true, null, null, null, true, true));
				}), parent);
			}

			menu.addSeparator(parent);
		}

		menu.addItem(mxResources.get('duplicate'), null, mxUtils.bind(this, function()
		{
			this.duplicatePage(page, mxResources.get('copyOf', [page.getName()]));
		}), parent);

		menu.addSeparator(parent);
		
		if (this.currentPage == page && this.pages.length > 1)
		{
			this.menus.addSubmenu('movePage', menu, parent, mxResources.get('move'));
		}

		menu.addItem(mxResources.get('delete'), null, mxUtils.bind(this, function()
		{
			this.removePage(page);
		}), parent);
		
		menu.addItem(mxResources.get('rename') + '...', null, mxUtils.bind(this, function()
		{
			this.renamePage(page, label);
		}), parent);
	});
};

/**
 * Returns true if the given string contains an mxfile.
 */
EditorUi.prototype.showPageLinkDialog = function(page)
{
	var graph = this.editor.graph;

	this.showPublishLinkDialog(mxResources.get('url'), true, null, null,
		mxUtils.bind(this, function(linkTarget, linkColor, allPages, lightbox, editLink, layers)
	{
		var params = this.createUrlParameters(linkTarget, linkColor, allPages, lightbox, editLink, layers);
		
		if (!allPages)
		{
			params.push('hide-pages=1');
		}
		
		if (!graph.isSelectionEmpty())
		{
			var bounds = graph.getBoundingBox(graph.getSelectionCells());
					
			var t = graph.view.translate;
			var s = graph.view.scale;
			bounds.width /= s;
			bounds.height /= s;
			bounds.x = bounds.x / s - t.x;
			bounds.y = bounds.y / s - t.y;
		
			params.push('viewbox=' + encodeURIComponent(JSON.stringify({x: Math.round(bounds.x), y: Math.round(bounds.y),
				width: Math.round(bounds.width), height: Math.round(bounds.height), border: 100})));
		}
		
		var dlg = new EmbedDialog(this, this.getLinkForPage(page, params, lightbox));
		this.showDialog(dlg.container, 450, 240, true, true);
		dlg.init();
	}));
};

//Overrides ChangePageSetup codec to exclude page
(function()
{
	var codec = mxCodecRegistry.getCodec(ChangePageSetup);
	codec.exclude.push('page');
})();

//Registers codec for MovePage
(function()
{
	var codec = new mxObjectCodec(new MovePage(), ['ui']);
	
	codec.beforeDecode = function(dec, node, obj)
	{
		obj.ui = dec.ui;
		  
		return node;
	};
	
	codec.afterDecode = function(dec, node, obj)
	{
		var tmp = obj.oldIndex;
		obj.oldIndex = obj.newIndex;
		obj.newIndex = tmp;
		
	    return obj;
	};
	
	mxCodecRegistry.register(codec);
})();

//Registers codec for RenamePage
(function()
{
	var codec = new mxObjectCodec(new RenamePage(), ['ui', 'page']);
	
	codec.beforeDecode = function(dec, node, obj)
	{
		obj.ui = dec.ui;
	  
		return node;
	};
	
	codec.afterDecode = function(dec, node, obj)
	{
	    var tmp = obj.previous;
	    obj.previous = obj.name;
	    obj.name = tmp;
	    
	    return obj;
	};
	
	mxCodecRegistry.register(codec);
})();

//Registers codec for ChangePage
(function()
{
	var codec = new mxObjectCodec(new ChangePage(), ['ui',
		'relatedPage', 'index', 'page', 'previousPage']);
	
	codec.afterEncode = function(enc, obj, node)
	{
		node.setAttribute('relatedPage', obj.relatedPage.getId())
	    
		if (obj.index == null)
		{
			node.setAttribute('name', obj.relatedPage.getName());

			if (obj.relatedPage.viewState != null)
			{
	        	node.setAttribute('viewState', JSON.stringify(
	        		obj.relatedPage.viewState, function(key, value)
	        	{
	        		return (mxUtils.indexOf(EditorUi.transientViewStateProperties, key) < 0) ? value : undefined;
	        	}));
			}
	        
			if (obj.relatedPage.root != null)
			{
				enc.encodeCell(obj.relatedPage.root, node);
			}
	    }
	    
	    return node;
	};

	codec.beforeDecode = function(dec, node, obj)
	{
		obj.ui = dec.ui;
		obj.relatedPage = obj.ui.getPageById(node.getAttribute('relatedPage'));
	    
		if (obj.relatedPage == null)
		{
			var temp = node.ownerDocument.createElement('diagram');
			temp.setAttribute('id', node.getAttribute('relatedPage'));
			temp.setAttribute('name', node.getAttribute('name'));
			obj.relatedPage = new DiagramPage(temp);

			var vs = node.getAttribute('viewState');

			if (vs != null)
			{
				obj.relatedPage.viewState = JSON.parse(vs);
				node.removeAttribute('viewState');
			}

	        // Makes sure the original node isn't modified
			node = node.cloneNode(true);
			var tmp = node.firstChild;

			if (tmp != null)
			{
				obj.relatedPage.root = dec.decodeCell(tmp, false);

				var tmp2 = tmp.nextSibling;
				tmp.parentNode.removeChild(tmp);
				tmp = tmp2;

				while (tmp != null)
				{
					tmp2 = tmp.nextSibling;

					if (tmp.nodeType == mxConstants.NODETYPE_ELEMENT)
					{
						// Ignores all existing cells because those do not need to
						// be re-inserted into the model. Since the encoded version
						// of these cells contains the new parent, this would leave
						// to an inconsistent state on the model (ie. a parent
						// change without a call to parentForCellChanged).
						var id = tmp.getAttribute('id');

						if (dec.lookup(id) == null)
						{
							dec.decodeCell(tmp);
						}
					}

					tmp.parentNode.removeChild(tmp);
					tmp = tmp2;
				}
			}
		}

		return node;
	};

	codec.afterDecode = function(dec, node, obj)
	{
		obj.index = obj.previousIndex;

		return obj;
	};
	
	mxCodecRegistry.register(codec);
})();