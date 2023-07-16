/**
 * Copyright (c) 2006-2012, JGraph Ltd
 */
/**
 * Construcs a new sidebar for the given editor.
 */
function Sidebar(editorUi, container)
{
	this.editorUi = editorUi;
	this.container = container;
	this.palettes = new Object();
	this.taglist = new Object();
	this.lastCreated = 0;
	this.showTooltips = true;
	this.graph = editorUi.createTemporaryGraph(this.editorUi.editor.graph.getStylesheet());
    this.graph.cellRenderer.minSvgStrokeWidth = this.minThumbStrokeWidth;
	this.graph.cellRenderer.antiAlias = this.thumbAntiAlias;
	this.graph.container.style.visibility = 'hidden';
	this.graph.shapeBackgroundColor = 'transparent';
	this.graph.foldingEnabled = false;

	// Wrapper for entries and footer
	this.container.style.overflow = 'visible';
	this.wrapper = document.createElement('div');
	this.wrapper.style.position = 'relative';
	this.wrapper.style.overflowX = 'hidden';
	this.wrapper.style.overflowY = 'auto';
	this.wrapper.style.left = '0px';
	this.wrapper.style.top = '0px';
	this.wrapper.style.right = '0px';
	this.wrapper.style.boxSizing = 'border-box';
	this.wrapper.style.maxHeight = 'calc(100% - ' + this.moreShapesHeight + 'px)';
	this.container.appendChild(this.wrapper);

	var title = this.createMoreShapes();
	this.container.appendChild(title);

	document.body.appendChild(this.graph.container);
	
	this.pointerUpHandler = mxUtils.bind(this, function()
	{
		if (this.tooltipCloseImage == null || this.tooltipCloseImage.style.display == 'none')
		{
			this.showTooltips = true;
			this.hideTooltip();
		}
	});

	mxEvent.addListener(document, (mxClient.IS_POINTER) ? 'pointerup' : 'mouseup', this.pointerUpHandler);

	this.pointerDownHandler = mxUtils.bind(this, function()
	{
		if (this.tooltipCloseImage == null || this.tooltipCloseImage.style.display == 'none')
		{
			this.showTooltips = false;
			this.hideTooltip();
		}
	});
	
	mxEvent.addListener(document, (mxClient.IS_POINTER) ? 'pointerdown' : 'mousedown', this.pointerDownHandler);
	
	this.pointerMoveHandler = mxUtils.bind(this, function(evt)
	{
		if (Date.now() - this.lastCreated > 300 && (this.tooltipCloseImage == null ||
			this.tooltipCloseImage.style.display == 'none'))
		{
			var src = mxEvent.getSource(evt);
			
			while (src != null)
			{
				if (src == this.currentElt)
				{
					return;
				}
				
				src = src.parentNode;
			}
			
			this.hideTooltip();
		}
	});

	mxEvent.addListener(document, (mxClient.IS_POINTER) ? 'pointermove' : 'mousemove', this.pointerMoveHandler);

	// Handles mouse leaving the window
	this.pointerOutHandler = mxUtils.bind(this, function(evt)
	{
		if (evt.toElement == null && evt.relatedTarget == null)
		{
			this.hideTooltip();
		}
	});
	
	mxEvent.addListener(document, (mxClient.IS_POINTER) ? 'pointerout' : 'mouseout', this.pointerOutHandler);

	// Enables tooltips after scroll
	mxEvent.addListener(container, 'scroll', mxUtils.bind(this, function()
	{
		this.showTooltips = true;
		this.hideTooltip();
	}));
	
	this.init();
};

/**
 * Adds all palettes to the sidebar.
 */
Sidebar.prototype.init = function()
{
	var dir = STENCIL_PATH;
	
	this.addSearchPalette(true);
	this.addGeneralPalette(true);
	this.addMiscPalette(false);
	this.addAdvancedPalette(false);
	this.addBasicPalette(dir);
	
	this.setCurrentSearchEntryLibrary('arrows');
	this.addStencilPalette('arrows', mxResources.get('arrows'), dir + '/arrows.xml',
		';whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#000000;strokeWidth=2');
	this.setCurrentSearchEntryLibrary();
	
	this.addUmlPalette(false);
	this.addBpmnPalette(dir, false);
	
	this.setCurrentSearchEntryLibrary('flowchart');
	this.addStencilPalette('flowchart', 'Flowchart', dir + '/flowchart.xml',
		';whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#000000;strokeWidth=2');
	this.setCurrentSearchEntryLibrary();
	
	this.setCurrentSearchEntryLibrary('clipart');
	this.addImagePalette('clipart', mxResources.get('clipart'), dir + '/clipart/', '_128x128.png',
		['Earth_globe', 'Empty_Folder', 'Full_Folder', 'Gear', 'Lock', 'Software', 'Virus', 'Email',
		 'Database', 'Router_Icon', 'iPad', 'iMac', 'Laptop', 'MacBook', 'Monitor_Tower', 'Printer',
		 'Server_Tower', 'Workstation', 'Firewall_02', 'Wireless_Router_N', 'Credit_Card',
		 'Piggy_Bank', 'Graph', 'Safe', 'Shopping_Cart', 'Suit1', 'Suit2', 'Suit3', 'Pilot1',
		 'Worker1', 'Soldier1', 'Doctor1', 'Tech1', 'Security1', 'Telesales1'], null,
		 {'Wireless_Router_N': 'wireless router switch wap wifi access point wlan',
		  'Router_Icon': 'router switch'});
	this.setCurrentSearchEntryLibrary();
};

/**
 * Sets the default font size.
 */
Sidebar.prototype.collapsedImage = (!mxClient.IS_SVG) ? IMAGE_PATH + '/collapsed.gif' : 'data:image/gif;base64,R0lGODlhDQANAIABAJmZmf///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozNUQyRTJFNjZGNUYxMUU1QjZEOThCNDYxMDQ2MzNCQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozNUQyRTJFNzZGNUYxMUU1QjZEOThCNDYxMDQ2MzNCQiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjFERjc3MEUxNkY1RjExRTVCNkQ5OEI0NjEwNDYzM0JCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjFERjc3MEUyNkY1RjExRTVCNkQ5OEI0NjEwNDYzM0JCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAQAAAQAsAAAAAA0ADQAAAhSMj6lrwAjcC1GyahV+dcZJgeIIFgA7';

/**
 * Sets the default font size.
 */
Sidebar.prototype.expandedImage = (!mxClient.IS_SVG) ? IMAGE_PATH + '/expanded.gif' : 'data:image/gif;base64,R0lGODlhDQANAIABAJmZmf///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxREY3NzBERjZGNUYxMUU1QjZEOThCNDYxMDQ2MzNCQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxREY3NzBFMDZGNUYxMUU1QjZEOThCNDYxMDQ2MzNCQiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjFERjc3MERENkY1RjExRTVCNkQ5OEI0NjEwNDYzM0JCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjFERjc3MERFNkY1RjExRTVCNkQ5OEI0NjEwNDYzM0JCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAQAAAQAsAAAAAA0ADQAAAhGMj6nL3QAjVHIu6azbvPtWAAA7';

/**
 * 
 */
Sidebar.prototype.searchImage = (!mxClient.IS_SVG) ? IMAGE_PATH + '/search.png' : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAEaSURBVHjabNGxS5VxFIfxz71XaWuQUJCG/gCHhgTD9VpEETg4aMOlQRp0EoezObgcd220KQiXmpretTAHQRBdojlQEJyukPdt+b1ywfvAGc7wnHP4nlZd1yKijQW8xzNc4Su+ZOYfQ3T6/f4YNvEJYzjELXp4VVXVz263+7cR2niBxAFeZ2YPi3iHR/gYERPDwhpOsd6sz8x/mfkNG3iOlWFhFj8y89J9KvzGXER0GuEaD42mgwHqUtoljbcRsTBCeINpfM/MgZLKPpaxFxGbOCqDXmILN7hoJrTKH+axhxmcYRxP0MIDnOBDZv5q1XUNIuJxifJp+UNV7t7BFM6xeic0RMQ4Bpl5W/ol7GISx/eEUUTECrbx+f8A8xhiZht9zsgAAAAASUVORK5CYII=';

/**
 * Specifies if tooltips should be visible. Default is true.
 */
Sidebar.prototype.enableTooltips = true;

/**
 * Specifies the delay for the tooltip. Default is 16 px.
 */
Sidebar.prototype.tooltipBorder = 16;

/**
 * Specifies the delay for the tooltip. Default is 300 ms.
 */
Sidebar.prototype.tooltipDelay = 300;

/**
 * Specifies the delay for the drop target icons. Default is 200 ms.
 */
Sidebar.prototype.dropTargetDelay = 200;

/**
 * Specifies the URL of the gear image.
 */
Sidebar.prototype.gearImage = STENCIL_PATH + '/clipart/Gear_128x128.png';

/**
 * Specifies the width of the thumbnails.
 */
Sidebar.prototype.thumbWidth = 42;

/**
 * Specifies the height of the thumbnails.
 */
Sidebar.prototype.thumbHeight = 42;

/**
 * Specifies the width of the thumbnails.
 */
Sidebar.prototype.minThumbStrokeWidth = 1;

/**
 * Specifies the width of the thumbnails.
 */
Sidebar.prototype.thumbAntiAlias = false;

/**
 * Specifies the padding for the thumbnails. Default is 3.
 */
Sidebar.prototype.thumbPadding = (document.documentMode >= 5) ? 2 : 3;

/**
 * Specifies the delay for the tooltip. Default is 2 px.
 */
Sidebar.prototype.thumbBorder = 2;

/**
 * Allows for two buttons in the sidebar footer.
 */
Sidebar.prototype.moreShapesHeight = 52;

/**
 * Whether live preview should be enabled. Default is true.
 */
Sidebar.prototype.livePreview = true;

/*
 * Experimental smaller sidebar entries
 */
if (urlParams['sidebar-entries'] != 'large')
{
	Sidebar.prototype.thumbPadding = (document.documentMode >= 5) ? 0 : 1;
	Sidebar.prototype.thumbBorder = 1;
	Sidebar.prototype.thumbWidth = 32;
	Sidebar.prototype.thumbHeight = 30;
	Sidebar.prototype.minThumbStrokeWidth = 1.3;
	Sidebar.prototype.thumbAntiAlias = true;
}

/**
 * Specifies the size of the sidebar titles.
 */
Sidebar.prototype.sidebarTitleSize = 8;

/**
 * Specifies if titles in the sidebar should be enabled.
 */
Sidebar.prototype.sidebarTitles = false;

/**
 * Specifies if titles in the tooltips should be enabled.
 */
Sidebar.prototype.tooltipTitles = true;

/**
 * Specifies if titles in the tooltips should be enabled.
 */
Sidebar.prototype.maxTooltipWidth = 400;

/**
 * Specifies if titles in the tooltips should be enabled.
 */
Sidebar.prototype.maxTooltipHeight = 400;

/**
 * Specifies if stencil files should be loaded and added to the search index
 * when stencil palettes are added. If this is false then the stencil files
 * are lazy-loaded when the palette is shown.
 */
Sidebar.prototype.addStencilsToIndex = true;

/**
 * Specifies the width for clipart images. Default is 80.
 */
Sidebar.prototype.defaultImageWidth = 80;

/**
 * Specifies the height for clipart images. Default is 80.
 */
Sidebar.prototype.defaultImageHeight = 80;

/**
 * Specifies the height for clipart images. Default is 80.
 */
Sidebar.prototype.tooltipMouseDown = null;

/**
 * Reloads the sidebar.
 */
Sidebar.prototype.refresh = function()
{
	var graph = this.editorUi.editor.graph;
	this.graph.stylesheet.styles = mxUtils.clone(
		graph.getDefaultStylesheet().styles);
	var scrollTop = this.wrapper.scrollTop;
	this.wrapper.innerText = '';
	var temp = this.palettes;
	this.palettes = new Object();

	// Overrides addPalette to restore expanded state
	var addPalette = this.addPalette;

	this.addPalette = function(id, title, expanded, onInit)
	{
		expanded = this.wasPaletteExpanded(temp, id, expanded);

		return addPalette.apply(this, arguments);
	};

	this.init(temp);

	// Restores previous implementation
	this.addPalette = addPalette;

	// Restores scrollbar position
	window.setTimeout(mxUtils.bind(this, function()
	{	
		this.wrapper.scrollTop = scrollTop;
	}), 0);
};

/**
 * Overrides the sidebar init.
 */
Sidebar.prototype.wasPaletteExpanded = function(paletteStates, id, defaultExpanded)
{
	var elts = (paletteStates != null && id != null) ? paletteStates[id] : null;
	var result = defaultExpanded

	if (elts != null && elts.length == 2 &&
		elts[1].firstChild != null)
	{
		result = elts[1].firstChild.style.display != 'none';
	}

	return result;
};

/**
 * Adds the general palette to the sidebar.
 */
Sidebar.prototype.getEntryContainer = function()
{
	return this.wrapper;
};

/**
 * Adds the general palette to the sidebar.
 */
Sidebar.prototype.appendChild = function(child)
{
	this.wrapper.appendChild(child);
};

/**
 * Adds all palettes to the sidebar.
 */
Sidebar.prototype.getTooltipOffset = function(elt, bounds)
{
	var b = document.body;
	var d = document.documentElement;
	var bottom = Math.max(b.clientHeight || 0, d.clientHeight);
	var height = bounds.height + 2 * this.tooltipBorder;
	
	return new mxPoint(this.container.offsetWidth + 2 + this.editorUi.container.offsetLeft,
		Math.min(bottom - height - 20 /*status bar*/, Math.max(0, (this.editorUi.container.offsetTop +
			this.container.offsetTop + elt.offsetTop - this.wrapper.scrollTop - height / 2 + 16))));
};

/**
 * Adds all palettes to the sidebar.
 */
Sidebar.prototype.createMoreShapes = function()
{
	var div =  this.editorUi.createDiv('geSidebarFooter');
	div.style.position = 'absolute';
	div.style.overflow = 'hidden';
	div.style.display = 'inline-flex';
	div.style.alignItems = 'center';
	div.style.justifyContent = 'center';
	div.style.width = '100%';
	div.style.marginTop = '-1px';
	div.style.height = this.moreShapesHeight+ 'px';
	
	var title = document.createElement('button');
	title.className = 'geBtn gePrimaryBtn';
	title.style.display = 'inline-flex';
	title.style.alignItems = 'center';
	title.style.whiteSpace = 'nowrap';
	title.style.padding = '8px';
	title.style.margin = '0px';
	title.innerHTML = '<span>+</span>';
	
	var span = title.getElementsByTagName('span')[0];
	span.style.fontSize = '18px';
	span.style.marginRight = '5px';

	mxUtils.write(title, mxResources.get('moreShapes'));

	// Prevents focus
	mxEvent.addListener(title, (mxClient.IS_POINTER) ? 'pointerdown' : 'mousedown',
		mxUtils.bind(this, function(evt)
	{
		evt.preventDefault();
	}));
	
	mxEvent.addListener(title, 'click', mxUtils.bind(this, function(evt)
	{
		this.editorUi.actions.get('shapes').funct();
		mxEvent.consume(evt);
	}));
	
	div.appendChild(title);
	
	return div;
};

/**
 * Adds all palettes to the sidebar.
 */
Sidebar.prototype.createTooltip = function(elt, cells, w, h, title, showLabel, off, maxSize, mouseDown, closable, applyAllStyles)
{
	applyAllStyles = (applyAllStyles != null) ? applyAllStyles : true;
	this.tooltipMouseDown = mouseDown;
	
	// Lazy creation of the DOM nodes and graph instance
	if (this.tooltip == null)
	{
		this.tooltip = document.createElement('div');
		this.tooltip.className = 'geSidebarTooltip';
		this.tooltip.style.userSelect = 'none';
		this.tooltip.style.zIndex = mxPopupMenu.prototype.zIndex - 1;
		document.body.appendChild(this.tooltip);

		mxEvent.addMouseWheelListener(mxUtils.bind(this, function(evt)
		{
			this.hideTooltip();
		}), this.tooltip);
		
		this.graph2 = new Graph(this.tooltip, null, null, this.editorUi.editor.graph.getStylesheet());
		this.graph2.shapeBackgroundColor = 'transparent';
		this.graph2.resetViewOnRootChange = false;
		this.graph2.foldingEnabled = false;
		this.graph2.gridEnabled = false;
		this.graph2.autoScroll = false;
		this.graph2.setTooltips(false);
		this.graph2.setConnectable(false);
		this.graph2.setPanning(false);
		this.graph2.setEnabled(false);
		
		// Blocks all links
		this.graph2.openLink = mxUtils.bind(this, function()
		{
			this.hideTooltip();
		});
		
		mxEvent.addGestureListeners(this.tooltip, mxUtils.bind(this, function(evt)
		{
			if (this.tooltipMouseDown != null)
			{
				this.tooltipMouseDown(evt);
			}
			
			window.setTimeout(mxUtils.bind(this, function()
			{
				if (this.tooltipCloseImage == null || this.tooltipCloseImage.style.display == 'none')
				{
					this.hideTooltip();
				}
			}), 0);
		}), null, mxUtils.bind(this, function(evt)
		{
			this.hideTooltip();
		}));
		
		if (!mxClient.IS_SVG)
		{
			this.graph2.view.canvas.style.position = 'relative';
		}

		var close = document.createElement('img');
		close.setAttribute('src', Dialog.prototype.closeImage);
		close.setAttribute('title', mxResources.get('close'));
		close.style.position = 'absolute';
		close.style.cursor = 'default';
		close.style.padding = '8px';
		close.style.right = '2px';
		close.style.top = '2px';
		this.tooltip.appendChild(close);
		this.tooltipCloseImage = close;
		
		mxEvent.addListener(close, 'click', mxUtils.bind(this, function(evt)
		{
			this.hideTooltip();
			mxEvent.consume(evt);
		}));
	}
	
	this.tooltipCloseImage.style.display = (closable) ? '' : 'none';
	this.graph2.model.clear();
	this.graph2.view.setTranslate(this.tooltipBorder, this.tooltipBorder);
	
	if (!maxSize && (w > this.maxTooltipWidth || h > this.maxTooltipHeight))
	{
		this.graph2.view.scale = Math.round(Math.min(this.maxTooltipWidth / w, this.maxTooltipHeight / h) * 100) / 100;
	}
	else
	{
		this.graph2.view.scale = 1;
	}
	
	this.tooltip.style.display = 'block';
	this.graph2.labelsVisible = (showLabel == null || showLabel);
	var fo = mxClient.NO_FO;
	mxClient.NO_FO = Editor.prototype.originalNoForeignObject;

	// Ensures opaque background for edge labels
	var style = mxUtils.getCurrentStyle(this.tooltip);
	this.graph2.shapeBackgroundColor = style.backgroundColor;

	// Applies current style for preview
	var temp = this.graph2.cloneCells(cells);
	this.editorUi.insertHandler(temp, null, this.graph2.model,
		(!applyAllStyles) ? this.editorUi.editor.graph.defaultVertexStyle : null,
		(!applyAllStyles) ? this.editorUi.editor.graph.defaultEdgeStyle : null,
		applyAllStyles, true);
	
	this.graph2.addCells(temp);

	mxClient.NO_FO = fo;
	var bounds = this.graph2.getGraphBounds();
	
	// Maximum size applied with transform for faster repaint
	if (maxSize && w > 0 && h > 0 && (bounds.width > w || bounds.height > h))
	{
		var s = Math.round(Math.min(w / bounds.width, h / bounds.height) * 100) / 100;
		
		if (!mxClient.NO_FO)
		{
			this.graph2.view.getDrawPane().ownerSVGElement.style.transform = 'scale(' + s + ')';
			this.graph2.view.getDrawPane().ownerSVGElement.style.transformOrigin = '0 0';
			bounds.width *= s;
			bounds.height *= s;
		}
		else
		{
			this.graph2.view.setScale(Math.round(Math.min(
				this.maxTooltipWidth / bounds.width,
				this.maxTooltipHeight / bounds.height) * 100) / 100);
			bounds = this.graph2.getGraphBounds();
		}
	}
	else if (!mxClient.NO_FO)
	{
		this.graph2.view.getDrawPane().ownerSVGElement.style.transform = '';
	}
	
	var width = bounds.width + 2 * this.tooltipBorder + 4;
	var height = bounds.height + 2 * this.tooltipBorder;
	
	this.tooltip.style.overflow = 'visible';
	this.tooltip.style.width = width + 'px';
	var w2 = width;
	
	// Adds title for entry
	if (this.tooltipTitles && title != null && title.length > 0)
	{
		if (this.tooltipTitle == null)
		{
			this.tooltipTitle = document.createElement('div');
			this.tooltipTitle.style.borderTop = '1px solid gray';
			this.tooltipTitle.style.textAlign = 'center';
			this.tooltipTitle.style.width = '100%';
			this.tooltipTitle.style.overflow = 'hidden';
			this.tooltipTitle.style.position = 'absolute';
			this.tooltipTitle.style.paddingTop = '6px';
			this.tooltipTitle.style.bottom = '6px';

			this.tooltip.appendChild(this.tooltipTitle);
		}
		else
		{
			this.tooltipTitle.innerText = '';
		}
		
		this.tooltipTitle.style.display = '';
		mxUtils.write(this.tooltipTitle, title);
		
		// Allows for wider labels
		w2 = Math.min(this.maxTooltipWidth, Math.max(width, this.tooltipTitle.scrollWidth + 4));
		var ddy = this.tooltipTitle.offsetHeight + 10;
		height += ddy;
		
		if (mxClient.IS_SVG)
		{
			this.tooltipTitle.style.marginTop = (2 - ddy) + 'px';
		}
		else
		{
			height -= 6;
			this.tooltipTitle.style.top = (height - ddy) + 'px';	
		}
	}
	else if (this.tooltipTitle != null && this.tooltipTitle.parentNode != null)
	{
		this.tooltipTitle.style.display = 'none';
	}

	// Updates width if label is wider
	if (w2 > width)
	{
		this.tooltip.style.width = w2 + 'px';
	}
	
	this.tooltip.style.height = height + 'px';
	var x0 = -Math.round(bounds.x - this.tooltipBorder) +
		((w2 > width) ? (w2 - width) / 2 : 0);
	var y0 = -Math.round(bounds.y - this.tooltipBorder);
	off = (off != null) ? off : this.getTooltipOffset(elt, bounds);
	var left = off.x;
	var top = off.y;
	
	if (mxClient.IS_SVG)
	{
		if (x0 != 0 || y0 != 0)
		{
			this.graph2.view.canvas.setAttribute('transform', 'translate(' + x0 + ',' + y0 + ')');
		}
		else
		{
			this.graph2.view.canvas.removeAttribute('transform');
		}
	}
	else
	{
		this.graph2.view.drawPane.style.left = x0 + 'px';
		this.graph2.view.drawPane.style.top = y0 + 'px';
	}
	
	// Workaround for ignored position CSS style in IE9
	// (changes to relative without the following line)
	this.tooltip.style.position = 'absolute';
	this.tooltip.style.left = left + 'px';
	this.tooltip.style.top = top + 'px';
	
	mxUtils.fit(this.tooltip);
	this.lastCreated = Date.now();
};

/**
 * Adds all palettes to the sidebar.
 */
Sidebar.prototype.showTooltip = function(elt, cells, w, h, title, showLabel)
{
	if (this.enableTooltips && this.showTooltips)
	{
		if (this.currentElt != elt)
		{
			if (this.thread != null)
			{
				window.clearTimeout(this.thread);
				this.thread = null;
			}
			
			var show = mxUtils.bind(this, function()
			{
				this.createTooltip(elt, cells, w, h, title, showLabel);
			});

			if (this.tooltip != null && this.tooltip.style.display != 'none')
			{
				show();
			}
			else
			{
				this.thread = window.setTimeout(show, this.tooltipDelay);
			}

			this.currentElt = elt;
		}
	}
};

/**
 * Hides the current tooltip.
 */
Sidebar.prototype.hideTooltip = function()
{
	if (this.thread != null)
	{
		window.clearTimeout(this.thread);
		this.thread = null;
	}
	
	if (this.tooltip != null)
	{
		this.tooltip.style.display = 'none';
		this.currentElt = null;
	}
	
	this.tooltipMouseDown = null;
};

/**
 * Hides the current tooltip.
 */
Sidebar.prototype.addDataEntry = function(tags, width, height, title, data)
{
	if (tags == null)
	{
		tags = '';
	}

	if (title != null)
	{
		tags += ' ' + title;
	}

	return this.addEntry(tags, mxUtils.bind(this, function()
	{
	   	return this.createVertexTemplateFromData(data, width, height, title);
	}));
};

/**
 * Adds the give entries to the search index.
 */
Sidebar.prototype.addEntries = function(images)
{
	for (var i = 0; i < images.length; i++)
	{
		(mxUtils.bind(this, function(img)
		{
			var data = img.data;
			var tags = (img.title != null) ? img.title : '';
			
			if (img.tags != null)
			{
				tags += ' ' + img.tags;
			}

			if (data != null && tags.length > 0)
			{
				this.addEntry(tags, mxUtils.bind(this, function()
				{
					data = this.editorUi.convertDataUri(data);
					var s = 'shape=image;verticalLabelPosition=bottom;verticalAlign=top;imageAspect=0;';
					
					if (img.aspect == 'fixed')
					{
						s += 'aspect=fixed;'
					}
					
					return this.createVertexTemplate(s + 'image=' +
						data, img.w, img.h, '', img.title || '', false, false, true)
				}));
			}
			else if (img.xml != null && tags.length > 0)
			{
				this.addEntry(tags, mxUtils.bind(this, function()
				{
					var cells = this.editorUi.stringToCells(Graph.decompress(img.xml));

					return this.createVertexTemplateFromCells(
						cells, img.w, img.h, img.title || '', true, false, true);
				}));
			}
		}))(images[i]);
	}
};

/**
 * Hides the current tooltip.
 */
Sidebar.prototype.setCurrentSearchEntryLibrary = function(id, lib)
{
	this.currentSearchEntryLibrary = (id != null) ? {id: id, lib: lib} : null;
};

/**
 * Hides the current tooltip.
 */
Sidebar.prototype.addEntry = function(tags, fn)
{
	if (this.taglist != null && tags != null && tags.length > 0)
	{
		if (this.currentSearchEntryLibrary != null)
		{
			fn.parentLibraries = [this.currentSearchEntryLibrary];
		}
		
		// Replaces special characters
		var tmp = tags.toLowerCase().replace(/[\/\,\(\)]/g, ' ').split(' ');
		var tagList = [];
		var hash = {};

		// Finds unique tags
		for (var i = 0; i < tmp.length; i++)
		{
			if (hash[tmp[i]] == null)
			{
				hash[tmp[i]] = true;
				tagList.push(tmp[i]);
			}
			
			// Adds additional entry with removed trailing numbers
			var normalized = Editor.soundex(tmp[i].replace(/\.*\d*$/, ''));

			if (normalized != tmp[i])
			{
				if (hash[normalized] == null)
				{
					hash[normalized] = true;
					tagList.push(normalized);
				}
			}
		}
		
		for (var i = 0; i < tagList.length; i++)
		{
			this.addEntryForTag(tagList[i], fn);
		}
	}

	return fn;
};

/**
 * Hides the current tooltip.
 */
Sidebar.prototype.addEntryForTag = function(tag, fn)
{
	if (tag != null && tag.length > 1)
	{
		var entry = this.taglist[tag];
		
		if (typeof entry !== 'object')
		{
			entry = {entries: []};
			this.taglist[tag] = entry;
		}

		entry.entries.push(fn);
	}
};

/**
 * Adds shape search UI.
 */
Sidebar.prototype.searchEntries = function(searchTerms, count, page, success, error)
{
	if (this.taglist != null && searchTerms != null)
	{
		var tmp = searchTerms.toLowerCase().split(' ');
		var dict = new mxDictionary();
		var max = (page + 1) * count;
		var results = [];
		var index = 0;
		
		for (var i = 0; i < tmp.length; i++)
		{
			var normalized = Editor.soundex(tmp[i].replace(/\.*\d*$/, ''));

			if (normalized.length > 0)
			{
				var entry = this.taglist[normalized];
				var tmpDict = new mxDictionary();
				
				if (entry != null)
				{
					var arr = entry.entries;
					results = [];

					for (var j = 0; j < arr.length; j++)
					{
						var entry = arr[j];
	
						// NOTE Array does not contain duplicates
						if ((index == 0) == (dict.get(entry) == null))
						{
							tmpDict.put(entry, entry);
							results.push(entry);
							
							if (i == tmp.length - 1 && results.length == max)
							{
								success(results.slice(page * count, max), max, true, tmp);
								
								return;
							}
						}
					}
				}
				else
				{
					results = [];
				}
				
				dict = tmpDict;
				index++;
			}
		}
		
		var len = results.length;
		success(results.slice(page * count, (page + 1) * count), len, false, tmp);
	}
	else
	{
		success([], null, null, tmp);
	}
};

/**
 * Adds shape search UI.
 */
Sidebar.prototype.filterTags = function(tags)
{
	if (tags != null)
	{
		var arr = tags.split(' ');
		var result = [];
		var hash = {};
		
		// Ignores tags with leading numbers, strips trailing numbers
		for (var i = 0; i < arr.length; i++)
		{
			// Removes duplicates
			if (hash[arr[i]] == null)
			{
				hash[arr[i]] = '1';
				result.push(arr[i]);
			}
		}
		
		return result.join(' ');
	}
	
	return null;
};

/**
 * Adds the general palette to the sidebar.
 */
Sidebar.prototype.cloneCell = function(cell, value)
{
	var clone = cell.clone();
	
	if (value != null)
	{
		clone.value = value;
	}
	
	return clone;
};

/**
 * Adds shape search UI.
 */
Sidebar.prototype.showPopupMenuForEntry = function(elt, libs, evt)
{												
	// Hook for subclassers
};

/**
 * Adds shape search UI.
 */
Sidebar.prototype.addSearchPalette = function(expand)
{
	var elt = document.createElement('div');
	elt.style.visibility = 'hidden';
	this.appendChild(elt);
		
	var div = document.createElement('div');
	div.className = 'geSidebar geSearchSidebar';

	if (!expand)
	{
		div.style.display = 'none';
	}
	
	var inner = document.createElement('div');
	inner.style.whiteSpace = 'nowrap';
	inner.style.textOverflow = 'clip';
	inner.style.paddingBottom = '8px';
	inner.style.cursor = 'default';

	var input = document.createElement('input');
	input.setAttribute('placeholder', mxResources.get('searchShapes'));
	input.setAttribute('type', 'text');
	inner.appendChild(input);

	var cross = document.createElement('img');
	cross.setAttribute('src', Sidebar.prototype.searchImage);
	cross.setAttribute('title', mxResources.get('search'));
	cross.style.position = 'relative';
	cross.style.left = '-18px';
	cross.style.top = '1px';

	// Needed to block event transparency in IE
	cross.style.background = 'url(\'' + this.editorUi.editor.transparentImage + '\')';
	
	var find;

	inner.appendChild(cross);
	div.appendChild(inner);

	var center = document.createElement('center');
	var button = mxUtils.button(mxResources.get('moreResults'), function()
	{
		find();
	});
	button.style.display = 'none';
	
	// Workaround for inherited line-height in quirks mode
	button.style.lineHeight = 'normal';
	button.style.fontSize = '12px';
	button.style.padding = '6px 12px 6px 12px';
	button.style.marginTop = '4px';
	button.style.marginBottom = '8px';
	center.style.paddingTop = '4px';
	center.style.paddingBottom = '4px';
	
	center.appendChild(button);
	div.appendChild(center);
	
	var searchTerm = '';
	var active = false;
	var complete = false;
	var page = 0;
	var hash = new Object();

	// Count is dynamically updated below
	var count = 12;
	
	var clearDiv = mxUtils.bind(this, function()
	{
		active = false;
		this.currentSearch = null;
		var child = div.firstChild;
		
		while (child != null)
		{
			var next = child.nextSibling;
			
			if (child != inner && child != center)
			{
				child.parentNode.removeChild(child);
			}
			
			child = next;
		}
	});
		
	mxEvent.addListener(cross, 'click', function()
	{
		if (cross.getAttribute('src') == Dialog.prototype.closeImage)
		{
			cross.setAttribute('src', Sidebar.prototype.searchImage);
			cross.setAttribute('title', mxResources.get('search'));
			button.style.display = 'none';
			input.value = '';
			searchTerm = '';
			clearDiv();
		}

		input.focus();
	});

	find = mxUtils.bind(this, function()
	{
		// Shows 4 rows (minimum 4 results)
		count = 4 * Math.max(1, Math.floor(this.container.clientWidth / (this.thumbWidth + 10)));
		this.hideTooltip();
		
		if (input.value != '')
		{
			if (center.parentNode != null)
			{
				if (searchTerm != input.value)
				{
					clearDiv();
					searchTerm = input.value;
					hash = new Object();
					complete = false;
					page = 0;
				}
				
				if (!active && !complete)
				{
					button.setAttribute('disabled', 'true');
					button.style.display = '';
					button.style.cursor = 'wait';
					button.innerHTML = mxResources.get('loading') + '...';
					active = true;
					
					// Ignores old results
					var current = new Object();
					this.currentSearch = current;
					
					this.searchEntries(searchTerm, count, page, mxUtils.bind(this, function(results, len, more, terms)
					{
						if (this.currentSearch == current)
						{
							results = (results != null) ? results : [];
							active = false;
							page++;
							this.insertSearchHint(div, searchTerm, count, page, results, len, more, terms);
							
							// Allows to repeat the search
							if (results.length == 0 && page == 1)
							{
								searchTerm = '';
							}

							if (center.parentNode != null)
							{
								center.parentNode.removeChild(center);
							}
							
							for (var i = 0; i < results.length; i++)
							{
								(mxUtils.bind(this, function(result)
								{
									try
									{
										var elt = result();
										
										// Avoids duplicates in results
										if (hash[elt.innerHTML] == null)
										{
											hash[elt.innerHTML] = (result.parentLibraries != null) ? result.parentLibraries.slice() : [];
											div.appendChild(elt);
										}
										else if (result.parentLibraries != null)
										{
											hash[elt.innerHTML] = hash[elt.innerHTML].concat(result.parentLibraries);
										}

										mxEvent.addGestureListeners(elt, null, null, mxUtils.bind(this, function(evt)
										{
											var libs = hash[elt.innerHTML];
	
											if (mxEvent.isPopupTrigger(evt))
											{
												this.showPopupMenuForEntry(elt, libs, evt);
											}
										}));
										
										// Disables the built-in context menu
										mxEvent.disableContextMenu(elt);
									}
									catch (e)
									{
										// ignore
									}
								}))(results[i]);
							}
							
							if (more)
							{
								button.removeAttribute('disabled');
								button.innerHTML = mxResources.get('moreResults');
							}
							else
							{
								button.innerHTML = mxResources.get('reset');
								button.style.display = 'none';
								complete = true;
							}
							
							button.style.cursor = '';
							div.appendChild(center);
						}
					}), mxUtils.bind(this, function()
					{
						// TODO: Error handling
						button.style.cursor = '';
					}));
				}
			}
		}
		else
		{
			clearDiv();
			input.value = '';
			searchTerm = '';
			hash = new Object();
			button.style.display = 'none';
			complete = false;
			input.focus();
		}
	});

	this.searchShapes = function(value)
	{
		input.value = value;
		find();
	};
	
	mxEvent.addListener(input, 'keydown', mxUtils.bind(this, function(evt)
	{
		if (evt.keyCode == 13 /* Enter */)
		{
			find();
			mxEvent.consume(evt);
		}
	}));

	var searchChanged = mxUtils.bind(this, function()
	{
		window.setTimeout(mxUtils.bind(this, function()
		{
			if (input.value == '')
			{
				cross.setAttribute('src', Sidebar.prototype.searchImage);
				cross.setAttribute('title', mxResources.get('search'));
			}
			else
			{
				cross.setAttribute('src', Dialog.prototype.closeImage);
				cross.setAttribute('title', mxResources.get('reset'));
			}
			
			if (input.value == '')
			{
				complete = true;
				button.style.display = 'none';
			}
			else if (input.value != searchTerm)
			{
				button.style.display = 'none';
				complete = false;
			}
			else if (!active)
			{
				if (complete)
				{
					button.style.display = 'none';
				}
				else
				{
					button.style.display = '';
				}
			}
		}), 0);
	});
	
	mxEvent.addListener(input, 'keyup', searchChanged);
	mxEvent.addListener(input, 'paste', searchChanged);
	mxEvent.addListener(input, 'cut', searchChanged);

    // Workaround for blocked text selection in Editor
    mxEvent.addListener(input, 'mousedown', function(evt)
    {
    	if (evt.stopPropagation)
    	{
    		evt.stopPropagation();
    	}
    	
    	evt.cancelBubble = true;
    });
    
    // Workaround for blocked text selection in Editor
    mxEvent.addListener(input, 'selectstart', function(evt)
    {
    	if (evt.stopPropagation)
    	{
    		evt.stopPropagation();
    	}
    	
    	evt.cancelBubble = true;
    });

	var outer = document.createElement('div');
    outer.appendChild(div);
    this.appendChild(outer);
	
    // Keeps references to the DOM nodes
	this.palettes['search'] = [elt, outer];
};

/**
 * Adds the general palette to the sidebar.
 */
Sidebar.prototype.insertSearchHint = function(div, searchTerm, count, page, results, len, more, terms)
{
	if (results.length == 0 && page == 1)
	{
		var err = document.createElement('div');
		err.className = 'geTitle';
		err.style.cssText = 'background-color:transparent;border-color:transparent;' +
			'padding:6px 0px 0px 0px !important;margin:4px 8px 4px 8px;text-align:center;' +
			'cursor:default !important;font-size:11px;font-weight:normal;';
		
		mxUtils.write(err, mxResources.get('noResultsFor', [searchTerm]));
		div.appendChild(err);
	}
};

/**
 * Adds the general palette to the sidebar.
 */
Sidebar.prototype.addGeneralPalette = function(expand)
{
	var lineTags = 'line lines connector connectors connection connections arrow arrows ';
	this.setCurrentSearchEntryLibrary('general', 'general');
	var sb = this;

	var temp = parseInt(this.editorUi.editor.graph.defaultVertexStyle['fontSize']);
	var fontSize = !isNaN(temp) ? 'fontSize=' + Math.min(16, temp) + ';' : '';

	// Reusable cells
	var field = new mxCell('List Item', new mxGeometry(0, 0, 80, 30),
		'text;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;' +
		'spacingLeft=4;spacingRight=4;overflow=hidden;points=[[0,0.5],[1,0.5]];' +
		'portConstraint=eastwest;rotatable=0;whiteSpace=wrap;html=1;' + fontSize);
	field.vertex = true;

	var fns = [
	 	this.createVertexTemplateEntry('rounded=0;whiteSpace=wrap;html=1;', 120, 60, '', 'Rectangle', null, null, 'rect rectangle box'),
	 	this.createVertexTemplateEntry('rounded=1;whiteSpace=wrap;html=1;', 120, 60, '', 'Rounded Rectangle', null, null, 'rounded rect rectangle box'),
	 	// Explicit strokecolor/fillcolor=none is a workaround to maintain transparent background regardless of current style
	 	this.createVertexTemplateEntry('text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;',
 			60, 30, 'Text', 'Text', null, null, 'text textbox textarea label'),
	 	this.createVertexTemplateEntry('text;html=1;strokeColor=none;fillColor=none;spacing=5;spacingTop=-20;whiteSpace=wrap;overflow=hidden;rounded=0;', 190, 120,
			'<h1>Heading</h1><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>',
			'Textbox', null, null, 'text textbox textarea'),
 		this.createVertexTemplateEntry('ellipse;whiteSpace=wrap;html=1;', 120, 80, '', 'Ellipse', null, null, 'oval ellipse state'),
		this.createVertexTemplateEntry('whiteSpace=wrap;html=1;aspect=fixed;', 80, 80, '', 'Square', null, null, 'square'),
		this.createVertexTemplateEntry('ellipse;whiteSpace=wrap;html=1;aspect=fixed;', 80, 80, '', 'Circle', null, null, 'circle'),
	 	this.createVertexTemplateEntry('shape=process;whiteSpace=wrap;html=1;backgroundOutline=1;', 120, 60, '', 'Process', null, null, 'process task'),
	 	this.createVertexTemplateEntry('rhombus;whiteSpace=wrap;html=1;', 80, 80, '', 'Diamond', null, null, 'diamond rhombus if condition decision conditional question test'),
	 	this.createVertexTemplateEntry('shape=parallelogram;perimeter=parallelogramPerimeter;whiteSpace=wrap;html=1;fixedSize=1;', 120, 60, '', 'Parallelogram'),
	 	this.createVertexTemplateEntry('shape=hexagon;perimeter=hexagonPerimeter2;whiteSpace=wrap;html=1;fixedSize=1;', 120, 80, '', 'Hexagon', null, null, 'hexagon preparation'),
	 	this.createVertexTemplateEntry('triangle;whiteSpace=wrap;html=1;', 60, 80, '', 'Triangle', null, null, 'triangle logic inverter buffer'),
	 	this.createVertexTemplateEntry('shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=15;', 60, 80, '', 'Cylinder', null, null, 'cylinder data database'),
	 	this.createVertexTemplateEntry('ellipse;shape=cloud;whiteSpace=wrap;html=1;', 120, 80, '', 'Cloud', null, null, 'cloud network'),
	 	this.createVertexTemplateEntry('shape=document;whiteSpace=wrap;html=1;boundedLbl=1;', 120, 80, '', 'Document'),
	 	this.createVertexTemplateEntry('shape=internalStorage;whiteSpace=wrap;html=1;backgroundOutline=1;', 80, 80, '', 'Internal Storage'),
	 	this.createVertexTemplateEntry('shape=cube;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;darkOpacity=0.05;darkOpacity2=0.1;', 120, 80, '', 'Cube'),
	 	this.createVertexTemplateEntry('shape=step;perimeter=stepPerimeter;whiteSpace=wrap;html=1;fixedSize=1;', 120, 80, '', 'Step'),
	 	this.createVertexTemplateEntry('shape=trapezoid;perimeter=trapezoidPerimeter;whiteSpace=wrap;html=1;fixedSize=1;', 120, 60, '', 'Trapezoid'),
	 	this.createVertexTemplateEntry('shape=tape;whiteSpace=wrap;html=1;', 120, 100, '', 'Tape'),
	 	this.createVertexTemplateEntry('shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;', 80, 100, '', 'Note'),
	    this.createVertexTemplateEntry('shape=card;whiteSpace=wrap;html=1;', 80, 100, '', 'Card'),
	    this.createVertexTemplateEntry('shape=callout;whiteSpace=wrap;html=1;perimeter=calloutPerimeter;', 120, 80, '', 'Callout', null, null, 'bubble chat thought speech message'),
	 	this.createVertexTemplateEntry('shape=umlActor;verticalLabelPosition=bottom;verticalAlign=top;html=1;outlineConnect=0;', 30, 60, 'Actor', 'Actor', false, null, 'user person human stickman'),
	 	this.createVertexTemplateEntry('shape=xor;whiteSpace=wrap;html=1;', 60, 80, '', 'Or', null, null, 'logic or'),
	 	this.createVertexTemplateEntry('shape=or;whiteSpace=wrap;html=1;', 60, 80, '', 'And', null, null, 'logic and'),
	 	this.createVertexTemplateEntry('shape=dataStorage;whiteSpace=wrap;html=1;fixedSize=1;', 100, 80, '', 'Data Storage'),
		this.createVertexTemplateEntry('swimlane;startSize=0;', 200, 200, '', 'Container', null, null, 'container swimlane lane pool group'),
		this.createVertexTemplateEntry('swimlane;whiteSpace=wrap;html=1;', 200, 200, 'Vertical Container', 'Container', null, null, 'container swimlane lane pool group'),
		this.createVertexTemplateEntry('swimlane;horizontal=0;whiteSpace=wrap;html=1;', 200, 200, 'Horizontal Container', 'Horizontal Container', null, null, 'container swimlane lane pool group'),
		this.addEntry('list group erd table', function()
		{
			var cell = new mxCell('List', new mxGeometry(0, 0, 140, 120),
		    	'swimlane;fontStyle=0;childLayout=stackLayout;horizontal=1;startSize=30;horizontalStack=0;' +
		    	'resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;whiteSpace=wrap;html=1;');
			cell.vertex = true;
			cell.insert(sb.cloneCell(field, 'Item 1'));
			cell.insert(sb.cloneCell(field, 'Item 2'));
			cell.insert(sb.cloneCell(field, 'Item 3'));
			
			return sb.createVertexTemplateFromCells([cell], cell.geometry.width, cell.geometry.height, 'List');
		}),
		this.addEntry('list item entry value group erd table', function()
		{
			return sb.createVertexTemplateFromCells([sb.cloneCell(field, 'List Item')], field.geometry.width, field.geometry.height, 'List Item');
		}),
		this.addEntry('curve', mxUtils.bind(this, function()
	 	{
			var cell = new mxCell('', new mxGeometry(0, 0, 50, 50), 'curved=1;endArrow=classic;html=1;');
			cell.geometry.setTerminalPoint(new mxPoint(0, 50), true);
			cell.geometry.setTerminalPoint(new mxPoint(50, 0), false);
			cell.geometry.points = [new mxPoint(50, 50), new mxPoint(0, 0)];
			cell.geometry.relative = true;
			cell.edge = true;
			
		    return this.createEdgeTemplateFromCells([cell], cell.geometry.width, cell.geometry.height, 'Curve');
	 	})),
	 	this.createEdgeTemplateEntry('shape=flexArrow;endArrow=classic;startArrow=classic;html=1;', 100, 100, '', 'Bidirectional Arrow', null, lineTags + 'bidirectional'),
	 	this.createEdgeTemplateEntry('shape=flexArrow;endArrow=classic;html=1;', 50, 50, '', 'Arrow', null, lineTags + 'directional directed'),
	 	this.createEdgeTemplateEntry('endArrow=none;dashed=1;html=1;', 50, 50, '', 'Dashed Line', null, lineTags + 'dashed undirected no'),
	 	this.createEdgeTemplateEntry('endArrow=none;dashed=1;html=1;dashPattern=1 3;strokeWidth=2;', 50, 50, '', 'Dotted Line', null, lineTags + 'dotted undirected no'),
	 	this.createEdgeTemplateEntry('endArrow=none;html=1;', 50, 50, '', 'Line', null, lineTags + 'simple undirected plain blank no'),
	 	this.createEdgeTemplateEntry('endArrow=classic;startArrow=classic;html=1;', 50, 50, '', 'Bidirectional Connector', null, lineTags + 'bidirectional'),
	 	this.createEdgeTemplateEntry('endArrow=classic;html=1;', 50, 50, '', 'Directional Connector', null, lineTags + 'directional directed'),
	 	this.createEdgeTemplateEntry('shape=link;html=1;', 100, 0, '', 'Link', null, lineTags + 'link'),
	 	this.addEntry(lineTags + 'edge title', mxUtils.bind(this, function()
		{
			var edge = new mxCell('', new mxGeometry(0, 0, 0, 0), 'endArrow=classic;html=1;');
			edge.geometry.setTerminalPoint(new mxPoint(0, 0), true);
			edge.geometry.setTerminalPoint(new mxPoint(100, 0), false);
			edge.geometry.relative = true;
			edge.edge = true;
			
	    	var cell0 = new mxCell('Label', new mxGeometry(0, 0, 0, 0), 'edgeLabel;resizable=0;html=1;align=center;verticalAlign=middle;');
	    	cell0.geometry.relative = true;
	    	cell0.setConnectable(false);
	    	cell0.vertex = true;
	    	edge.insert(cell0);
			
			return this.createEdgeTemplateFromCells([edge], 100, 0, 'Connector with Label');
		})),
		this.addEntry(lineTags + 'edge title multiplicity', mxUtils.bind(this, function()
		{
			var edge = new mxCell('', new mxGeometry(0, 0, 0, 0), 'endArrow=classic;html=1;');
			edge.geometry.setTerminalPoint(new mxPoint(0, 0), true);
			edge.geometry.setTerminalPoint(new mxPoint(160, 0), false);
			edge.geometry.relative = true;
			edge.edge = true;

	    	var cell0 = new mxCell('Label', new mxGeometry(0, 0, 0, 0), 'edgeLabel;resizable=0;html=1;align=center;verticalAlign=middle;');
	    	cell0.geometry.relative = true;
	    	cell0.setConnectable(false);
	    	cell0.vertex = true;
	    	edge.insert(cell0);
	    	
	    	var cell1 = new mxCell('Source', new mxGeometry(-1, 0, 0, 0), 'edgeLabel;resizable=0;html=1;align=left;verticalAlign=bottom;');
	    	cell1.geometry.relative = true;
	    	cell1.setConnectable(false);
	    	cell1.vertex = true;
	    	edge.insert(cell1);
			
			return this.createEdgeTemplateFromCells([edge], 160, 0, 'Connector with 2 Labels');
		})),
		this.addEntry(lineTags + 'edge title multiplicity', mxUtils.bind(this, function()
		{
			var edge = new mxCell('', new mxGeometry(0, 0, 0, 0), 'endArrow=classic;html=1;');
			edge.geometry.setTerminalPoint(new mxPoint(0, 0), true);
			edge.geometry.setTerminalPoint(new mxPoint(160, 0), false);
			edge.geometry.relative = true;
			edge.edge = true;
			
	    	var cell0 = new mxCell('Label', new mxGeometry(0, 0, 0, 0), 'edgeLabel;resizable=0;html=1;align=center;verticalAlign=middle;');
	    	cell0.geometry.relative = true;
	    	cell0.setConnectable(false);
	    	cell0.vertex = true;
	    	edge.insert(cell0);
	    	
	    	var cell1 = new mxCell('Source', new mxGeometry(-1, 0, 0, 0), 'edgeLabel;resizable=0;html=1;align=left;verticalAlign=bottom;');
	    	cell1.geometry.relative = true;
	    	cell1.setConnectable(false);
	    	cell1.vertex = true;
	    	edge.insert(cell1);
			
	    	var cell2 = new mxCell('Target', new mxGeometry(1, 0, 0, 0), 'edgeLabel;resizable=0;html=1;align=right;verticalAlign=bottom;');
	    	cell2.geometry.relative = true;
	    	cell2.setConnectable(false);
	    	cell2.vertex = true;
	    	edge.insert(cell2);
	    	
			return this.createEdgeTemplateFromCells([edge], 160, 0, 'Connector with 3 Labels');
		})),
	 	this.addEntry(lineTags + 'edge shape symbol message mail email', mxUtils.bind(this, function()
		{
			var edge = new mxCell('', new mxGeometry(0, 0, 0, 0), 'endArrow=classic;html=1;');
			edge.geometry.setTerminalPoint(new mxPoint(0, 0), true);
			edge.geometry.setTerminalPoint(new mxPoint(100, 0), false);
			edge.geometry.relative = true;
			edge.edge = true;
			
	    	var cell = new mxCell('', new mxGeometry(0, 0, 20, 14), 'shape=message;html=1;outlineConnect=0;');
	    	cell.geometry.relative = true;
	    	cell.vertex = true;
	    	cell.geometry.offset = new mxPoint(-10, -7);
	    	edge.insert(cell);

			return this.createEdgeTemplateFromCells([edge], 100, 0, 'Connector with Symbol');
		}))
	];
	
	this.addPaletteFunctions('general', mxResources.get('general'), (expand != null) ? expand : true, fns);
	this.setCurrentSearchEntryLibrary();
};

/**
 * Adds the general palette to the sidebar.
 */
Sidebar.prototype.addMiscPalette = function(expand)
{
	var sb = this;
	var lineTags = 'line lines connector connectors connection connections arrow arrows '
	this.setCurrentSearchEntryLibrary('general', 'misc');

	var fns = [
   	 	this.createVertexTemplateEntry('text;strokeColor=none;fillColor=none;html=1;fontSize=24;fontStyle=1;verticalAlign=middle;align=center;', 100, 40, 'Title', 'Title', null, null, 'text heading title'),
	 	this.createVertexTemplateEntry('text;strokeColor=none;fillColor=none;html=1;whiteSpace=wrap;verticalAlign=middle;overflow=hidden;', 100, 80,
 			'<ul><li>Value 1</li><li>Value 2</li><li>Value 3</li></ul>', 'Unordered List'),
	 	this.createVertexTemplateEntry('text;strokeColor=none;fillColor=none;html=1;whiteSpace=wrap;verticalAlign=middle;overflow=hidden;', 100, 80,
 			'<ol><li>Value 1</li><li>Value 2</li><li>Value 3</li></ol>', 'Ordered List'),
 		this.addDataEntry('table', 180, 120, 'Table 1', '7VnbcpswEP0aXjtcYsd9NUnTh/Yl6Q8o1trSVEiMWAeTr+8KhGlSe2xwJpMSZvCMdtmVteccwY4IkjTb3VmWi5+GgwqS2yBJrTHYjLJdCkoFcSh5kNwEcRzSL4i/Hbkb1XfDnFnQeE5C3CQ8MbWFxtM4CqyUdxSC5W6I7NG5lgUyiw/y2flCsldGI5MaLNlRbSvF8kLW0U2EkIr/YJXZYjtPay3XlO0ni+Zk+/WARdgdral2+YLuwGSAtqKQUnIUPmLR1B0KkBvRpnkwQlY0js0+t4OIBh6lw4glPRG7NyWVJYyVzw4o5TF5jWJRykwxDd+B8VeupeHVPsua35AaZRzaUguw0qGIJvcRCtboh48G0WTesB6G8CBD3Jr8F7MbaEPWUqn2b7TRjvfcSI01cLMlXQRlGn6ZBTOqOCU76my6XLjF1GhaMYnDTQuswBKKwaTHw0i/egPOr87nnFaMkql7WCHTm3rDCMyU3xulkAgPOVu50JJ2fbN/tIvu2DjGsiGE1srp6UZIzkEfJqqfGGpawd4+QcNuNJSf5CQ/8570+Mk6LHvPxhSVphnSHtpqXvzD+X6dZ8lgNslgsAx2L0kbkSrmkyouVcX+xTwiWVxPfcKH6hOql6S/R9uwmJ4Mp+m6Hn3b8HWSwWAZjLdtiMJJFpfKYox9QxRNjcNHbBwW79g4RD2O5T7vsyE6fQz43z8Mepw2TkL4RM3DdCJ5uS5G0D2Q2X0rasL//pT0Bw=='),
 		this.addDataEntry('table', 180, 120, 'Table 2', '7ZlLc9owEMc/ja8dP3jlimnSQ3pJOr0reMGayFqPvNSQT9+VLUMCOEDbyaTYM2ZGWq9e/99K7MheFGfrOyPy9DsmoLzoqxfFBpHqUraOQSkv9GXiRTMvDH3+eeFty9ugeuvnwoCmcxqEdYNfQq2gttSGgjbKGYpU5LZI4smapillPM1ZwMUylQSPuZjb9yUvgm0FCUOP8sWafK7PUZOQGoxrM0elRF7IqrPaI5UquRcbXFEzTFOz3qtM33P7wnkbLF9XF9y9Gy0YVcMbfIYYFdoBE1iIlbIduXWCIVi3alWZnFB3gBmQ2bBLKRNKncek1tNPQS7TppkT2RdFbVhu2+6k54JT/ziJ6EISD1haGGjki1VYOT325S9KmSmh4RuIZM80xWTjTIS5KylYkCs+IRFmjexuuf5RhInB/IcwS2hcFlKpBoJGbeMmR6mpEmg45Ycli/0vQ2/IK4u5Huzq/Fh3QzFq5snRY7sFUVAJBZ2ELnUKRp4NPfwz6IN/wHxwwPxnVQz9oBU+T52kUA8wJ6GX5+xI3oHaeu9wHaFzWQQga7pQNgJnqUwS0HtQwr+FEp2EMrqQietsp9vFvQlFYLQg3jgrnRQHoLfzPIv9sJV9+8bvNPv1W1JXFAqj1lCI+lB4JxS2/7tXFAvjPg34VGnA5i30j8gKJq3HwaDjx8H46rOCm1b2w559t7KCwG+NhVEfCx1LC4Kgzws+Y14w+cC8IDi8rGsOhHHHD4Tg9M3df38CHF4QNvQnPf2u5QbtN4c3fTBceXLA1d0Hotr99fej3w=='),
		this.addDataEntry('table title', 180, 150, 'Table with Title 1', '7VnbbtswDP0avw6WXSfda5yue9he2v6AGjGRMFkyZKZO+vWjbOWyJVluQ9G6BmxApChaOudIIOQozYvFveOl/GkF6Ci9i9LcWYttq1jkoHWUxEpE6ThKkpjeKPl2oJc1vXHJHRg8ZUDSDnjheg6t54k/a2i9FS518FaSl76JTW86qpA7fFSv3pfG5JhYg1wZcORgja01LyvVhI+bCKm0+MGXdo6rRCuL0jn7C3KrrR8vYMrn2vunlDV8hQ3IDrMFh7A4uOLGFZZ7D7YAdEsKqZVAGSJuW1RiCWomV8Oy4ORV65itx24ApEbAcD+e6Q6e/4bywda0LGmdevUA6oDVNryNXatCcwPfgYu/XCMrlutR2ygqI8EpjyLaMkRomGJoPltEWwTDBRjivcwJZ8sn7mawCpkqrVefMdZ4QZRWGWyAy0b0EJR5/CWLMlpxTjbb2PT4cIe5NTRjEo1PC7zCGqqLSU/2k74MtARqj2ng5j9I4OZ0CdACUHH9ABPkZtZsLImFDluolgrhseQTH1rTEdFuM+OjN+QcIt0SYFPt5TWWSggw+3k7TxsNy+DuXqAlm11KV3p0jw7OpCck22B5djauaWmGI22puRHVDufreZ4kg6yXwcUyWPxJWodUMehVca0qWNI9WQz7suE9lg3DNywbbvuT4Thdw86XDV97GVwsg+6WDSzuZXGtLLpYNzDWFw7vsXBg7A0rB7Z7idcfDru3gsevBT/8aXDG7WMvhE9UPfRXktfrogPlA5mbP0tt+PaPp98='),
		this.addDataEntry('table title', 180, 120, 'Table with Title 2', '7VhNb6MwEP01XFd8NNnmGtLtHrKXptq7Gw9grbGRmZSkv34HbEJ3CdtklaYoqgSSZxgP+L1nPwkvivPtvWFF9kNzkF5050Wx0RrtKN/GIKUX+oJ70cILQ59uL/w28DRonvoFM6DwmAmhnfDM5AZs5pE9SbDZEnfSZcuMFfUQm6fRvERmcCVe6lzkU2KtFTKhwFAiaGIpWVGKpnzRVGRC8iXb6Q22jdponogt8AddlW620dWSmpVuakLNV+5j/ObtRv+CWEtdv45DwjYS2zr7UcGUYrc4MAjbQYCalEPnHnQOaHZUUgmOmau4tSD6GYg0a6c5ZH1W2kS6n9vhTQMH+WH4ox78/0aeIKJlZdqIlxpvucejY6OJK5FLpuA7MP5Xaq75zqVQF24kIUE3fNKIOneBccv1DxLKjS4emUmhLUmElC0pSqtaJ4UWChuAJnO6CLLY/zLxJrSymOKgi+mqyw3GWhG/pKW6LbASKyixR7pQGRjx36SHh0nfOVoctW9pIDqDBG56EggGNUArQMHkA6yRqbTZiBnm0m2aKhMIq4Kt69KKjhS7LVVd3bF2gKTThKAJ2kTWQlxkgnNQLc1g7p7Bsh2cm6/ozU16cyI/rlmH5cndmKQlK4a0pzaKlz3S9995lA4mPR38bIahP3I9MClS0sDC1s5LeqFQ6dLOnA4I5hLi2P5J5evNfF6xHNXuvGqZfhrHGI1jekHj+NqTwLAGRnFQvPs5ML16k7gdNImRc//xJjEgjms2idmnSYzRJGYXNInA72kgGvdJ8e4HwezqXSIIBm1i5OR/vE0MqOOKbILC7v+iLX/9+/E3'),
		this.addDataEntry('crossfunctional cross-functional cross functional flowchart swimlane table', 400, 400, 'Cross-Functional Flowchart',
			'7ZnfbpswFMafhstN/EnS7nIhS3fRSlO2F3DhNFhzfJB90iR9+tlgkirgFUXtqjIkItmHY2O+84v1yQRJutnfKFYWd5iDCJJvQZIqRKpbm30KQgRxyPMgWQRxHJpfEC89d6PqblgyBZL6DIjrAY9MbKGOmIdr/Wm5lRlxlMwmLwXusoIpqpM1HYRL1gUrbZPYvQ3Ns4KL/JYdcEtNtOnNNZkZfvInmz8JbTIKwUrNq6ELG1GQbZXmj7ACXSfaKOxLJnPXeUDZTBLNTN+tHxTB3qtBFXIC3ABugNTBpOx4TkWdMQlrncIC+LqgsyDTdWB9HHuS1DScqt0KJy2Fv2aEyoSiv8u5wp15vwIVfzLvbApRC6B3fCOYhO/A8rPQHPODCxGWriXggZo8UvgbUhTm8cmCywIUt5W5RyLcNDVw72/bucLyF1NroOfqu/VWfS5EM59EaREokUuq9JrOzWUUTMPP02Bq3i81/ejUN5dNV5SiNEtjvCoXME070O9MTNxNzKEBox7xEkBR/AoATVoA/SiYhm6AHAm9OTkvqA+RDKWEzP3NfaV/x3ol3fXae+t1LE3vernZV1YGuRZwyXxMECjJyJRgK3PdwuC49F5kTL1kxCMZ/ciIZsNEY+ZFIxnR6IdGfD1MNK68hqRj1xgNyYcwJF3b2Ns5kusWQa+/p7T3Dh8sL+wp/7ZMV/+jD/ky8nAZD0N1H1E4EnEZEUM1HVHkdR0dhnR0HR/CdXTB+nauI2qfVY6bSiOw54Rz2L4jap+tjkT0I2KwzqN9Wjoi0Q+JgVgP0z19PqvTn39d+wM='),
		
 		this.addDataEntry('table', 280, 160, 'Table', '7Zpdc6IwFIZ/DfcksSqX1X7sxe6NdvY+ylEyjYQJsWp//QZIrDXSIkUdcZ3pTDiSNHmfHF5yRo8MF+tnSZPojwiBe+TRI0MphCpai/UQOPewz0KPPHgY+/rPw08l36L8Wz+hEmJVpQMuOrxRvoQicp+moNIinKoNN+FpxHj4m27EMhtX0QkHezWQMF3KlL3BCFL2nnXwdTRVUrzCUHAh8yFI0J/M9AzJYMY434nf94ZBB2c9IhqKlQ5mN5mJgVSwLl1cHjIrewaxACU3+pYVC1VkFtgvBPAjYPPIduuaIE2LwHzb90Mr3TByHZaOOBrp+Sdg1RllKxlEQrJ3ESvKt6pQqcY7Kq3YgtMYfgEN90IDEW5MSInEtDjMlGlOhFJiYS6kWV3WDqVIXqicgw1MBec0SdmE2397GBmsExrbacz0tMdmcS5PFkcgmXJpzvJPVYC4HkBCfs6v42z9F6b0arGP3N0v4himOdcvBayo0XbHU87msY5NtSAg90RH5nqn41P+yfaVWvBjEoV8q3NAjpPZDDbKZInnuW5Hjka5XnNMld7oyzhMHXbbeVbCeVeKE98MzvVn8Xd5dBqlW2G0Zul2S+m6j+GW00X9nov3ypO35+D9b64nM9fNZ6Lfei3+udf2Hb5/8+apvfYj6iTvKmIKxgmdZuOt9At4jUTt1XPVLwStkZh7ozWbmEEpuNO66mXAHemf9TlWGK1ZjsgvBXlaA70oyMpWeUUZidAteyWq7pWP90/4gTTjld27il6Jfu6VyK3J2FTtnClVm8hM9H1t5mDyfKFgjVTcG63hVCSlpO5aQOpIN6wPrsJoDYNzaz8WXLc94Cq73zWlnFvmuSH3u9BJMehWdL8GqrLIrfTY1OydKTX3FT/Ji2uxkVtdkUVuVcei7N8CyvZWY1F5PSe4IbJtrMQit+JzQwZ7oeMlsnW2c5wvcXkpyFaJruPtN6jnoFf0tovdWs8W1bkK56dE1d4Tpn1qHiLnPlCvllwLjpj68uPnVsXtu7/G+gc='),
		
 		this.addDataEntry('table', 180, 140, 'Table', '7ZhNc5swEIZ/DXc+HH9cTdv00F7sTu8yWoOmi8QIOUB+fSUjJXEwMbZzgcl4PKNdIVn7PlovkhfFef0oSZH9FhTQi757USyFUG0rr2NA9EKfUS/65oWhr79e+KOnNzj2+gWRwNWQAWE74IngAVpP6yhVg9aRZAzpL9KIg5lRkR2Cs9YSkoMs2RNsoGTPZoCvvWVGqKissWeIsUAhtc0FB9OvpPgHzumFUeybj+6xqwGpoO6N6Oiy4TyCyEHJRj9SMaoy+8SyjdrPgKWZGzazTlK2jvRl7KtAumE1Oq9XdFkvHX0BTqmN0WGdCcmeBVcEnUKKSLV9o1jFciQcfgKh71xrQRvrUqKwLYS9ss2dUErk1pA2XNOmUhR/iEzBORKBSIqS7dD97Hl8UBeEu2Xs9bK3NrgenIOghbdBmy3uZzbrMPt7bIZ+0N3sgnNIjug+1Oh0C1shzmhDkKVcm4kWArR/XWVMwbYgiZmp0nlvtofKzcYIhmoZXdRyfqWUdrKNCZ2nCNfPRlDHx4nS+/XAadnh87LOQcgeepGd+X8aMbL6VOAJEZz3EoymSDAIp4dw8VXa7iltzSmji5Vufn+lW/Ym3WycSbe4rdJ9IOUNSfZuts9NslUvsodJIbuy0o2IYOD3IpxPEeHgUjcmht2TwFetu77WraKBte4TTnVB9+rCpV33xWUUaRdcvtgY+ytl0L0/cdCW04I23ZNd0H+fspokwwmc7bT5eqfcPv72yvk/'),
		
 		this.addDataEntry('table', 180, 140, 'Table', '7ZhLc5swEMc/DXcejh9X3CY9tBe707uM1qCpkBixDpBPX2GkvLBi7LgHmBw8s1okof3/tF4kL1rn9YMiRfZLUuBe9N2L1kpK7Ky8XgPnXugz6kXfvDD09c8L7x1Pg+NTvyAKBA4ZEHYDHgk/QOfpHCU23DiSjHH6kzTy0M6IZMfBtmIFyUGV7BE2ULKndoCvvWVGqKxMY884X0sulW4LKXSf2LwTFELtXPfRZRb9ADIHVI3uUjGKmemx7GLzM2BpZofNjJOUnSN9HvsigzaMEqdVic6romMswOqxaaONM6nYkxRIuNUBicLtK10qlnMi4AcQ+s4VS9oYF8rCWBz2aMydRJS5aSgTbmtTJYvfRKVgHYnknBQl23H72tOQoC6IsMvY62VvTXAOaCUq+Resk4kMFMOhMMPrYM4Wn2c567H8czRDP+hvdSkEJEekH2rn0uKEbISzVOhmorUA7Y+rjCFsC5K0k1U68dudg3m7Z4KhckZn5ZxfqKaZbNNGL1IOl89GuI5PENRb+SBo2UP0vM5B1O6c1E78QY2bWv1W4wlBnDshRhOFGITTo7j4qn3/o/Y1b9mdLYXzz5fCpTMfZ6PNx8V1pfADNa/Iv3ez3Tb/Vk5qd1OjdmEpHBHEwHdSnE+U4uBaOCaM/TPDVzG8XTFcRQOL4Q3OhUH/6sNmZP+LZywZGZy/NRn752jQv5yx3JaT4zbds2HgvpdZTRXjBE6HuvlyOd11f313/Q8='),
		
	 	this.createVertexTemplateEntry('text;html=1;whiteSpace=wrap;strokeColor=none;fillColor=none;overflow=fill;', 180, 180,
 			'<table border="1" width="100%" height="100%" cellpadding="4" style="width:100%;height:100%;border-collapse:collapse;">' +
 			'<tr><th align="center"><b>Title</b></th></tr>' +
 			'<tr><td align="center">Section 1.1\nSection 1.2\nSection 1.3</td></tr>' +
 			'<tr><td align="center">Section 2.1\nSection 2.2\nSection 2.3</td></tr></table>', 'HTML Table 4'),

	 	this.addEntry('link hyperlink', mxUtils.bind(this, function()
	 	{
	 		var cell = new mxCell('Link', new mxGeometry(0, 0, 60, 40), 'text;html=1;strokeColor=none;fillColor=none;whiteSpace=wrap;align=center;verticalAlign=middle;fontColor=#0000EE;fontStyle=4;');
	 		cell.vertex = true;
	 		this.graph.setLinkForCell(cell, 'https://www.draw.io');

	 		return this.createVertexTemplateFromCells([cell], cell.geometry.width, cell.geometry.height, 'Link');
	 	})),
	 	this.addEntry('timestamp date time text label', mxUtils.bind(this, function()
	 	{
	 		var cell = new mxCell('%date{ddd mmm dd yyyy HH:MM:ss}%', new mxGeometry(0, 0, 160, 20), 'text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;overflow=hidden;');
	 		cell.vertex = true;
	 		this.graph.setAttributeForCell(cell, 'placeholders', '1');

	 		return this.createVertexTemplateFromCells([cell], cell.geometry.width, cell.geometry.height, 'Timestamp');
	 	})),
	 	this.addEntry('variable placeholder metadata hello world text label', mxUtils.bind(this, function()
	 	{
	 		var cell = new mxCell('%name% Text', new mxGeometry(0, 0, 80, 20), 'text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;overflow=hidden;');
	 		cell.vertex = true;
	 		this.graph.setAttributeForCell(cell, 'placeholders', '1');
	 		this.graph.setAttributeForCell(cell, 'name', 'Variable');

	 		return this.createVertexTemplateFromCells([cell], cell.geometry.width, cell.geometry.height, 'Variable');
	 	})),
		this.createVertexTemplateEntry('shape=ext;double=1;rounded=0;whiteSpace=wrap;html=1;', 120, 80, '', 'Double Rectangle', null, null, 'rect rectangle box double'),
	 	this.createVertexTemplateEntry('shape=ext;double=1;rounded=1;whiteSpace=wrap;html=1;', 120, 80, '', 'Double Rounded Rectangle', null, null, 'rounded rect rectangle box double'),
 		this.createVertexTemplateEntry('ellipse;shape=doubleEllipse;whiteSpace=wrap;html=1;', 100, 60, '', 'Double Ellipse', null, null, 'oval ellipse start end state double'),
		this.createVertexTemplateEntry('shape=ext;double=1;whiteSpace=wrap;html=1;aspect=fixed;', 80, 80, '', 'Double Square', null, null, 'double square'),
		this.createVertexTemplateEntry('ellipse;shape=doubleEllipse;whiteSpace=wrap;html=1;aspect=fixed;', 80, 80, '', 'Double Circle', null, null, 'double circle'),
		this.createVertexTemplateEntry('rounded=1;whiteSpace=wrap;html=1;strokeWidth=2;fillWeight=4;hachureGap=8;hachureAngle=45;fillColor=#1ba1e2;sketch=1;', 120, 60, '', 'Rectangle Sketch', true, null, 'rectangle rect box text sketch comic retro'),
		this.createVertexTemplateEntry('ellipse;whiteSpace=wrap;html=1;strokeWidth=2;fillWeight=2;hachureGap=8;fillColor=#990000;fillStyle=dots;sketch=1;', 120, 60, '', 'Ellipse Sketch', true, null, 'ellipse oval sketch comic retro'),
		this.createVertexTemplateEntry('rhombus;whiteSpace=wrap;html=1;strokeWidth=2;fillWeight=-1;hachureGap=8;fillStyle=cross-hatch;fillColor=#006600;sketch=1;', 120, 60, '', 'Diamond Sketch', true, null, 'diamond sketch comic retro'),
	 	this.createVertexTemplateEntry('html=1;whiteSpace=wrap;shape=isoCube2;backgroundOutline=1;isoAngle=15;', 90, 100, '', 'Isometric Cube', true, null, 'cube box iso isometric'),
	 	this.createVertexTemplateEntry('html=1;whiteSpace=wrap;aspect=fixed;shape=isoRectangle;', 150, 90, '', 'Isometric Square', true, null, 'rectangle rect box iso isometric'),
	 	this.createEdgeTemplateEntry('edgeStyle=isometricEdgeStyle;endArrow=none;html=1;', 50, 100, '', 'Isometric Edge 1'),
	 	this.createEdgeTemplateEntry('edgeStyle=isometricEdgeStyle;endArrow=none;html=1;elbow=vertical;', 50, 100, '', 'Isometric Edge 2'),
	 	this.createVertexTemplateEntry('shape=curlyBracket;whiteSpace=wrap;html=1;rounded=1;labelPosition=left;verticalLabelPosition=middle;align=right;verticalAlign=middle;', 20, 120, '', 'Left Curly Bracket'),
		this.createVertexTemplateEntry('shape=curlyBracket;whiteSpace=wrap;html=1;rounded=1;flipH=1;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=middle;', 20, 120, '', 'Right Curly Bracket'),
	 	this.createVertexTemplateEntry('line;strokeWidth=2;html=1;', 160, 10, '', 'Horizontal Line'),
	 	this.createVertexTemplateEntry('line;strokeWidth=2;direction=south;html=1;', 10, 160, '', 'Vertical Line'),
	 	this.createVertexTemplateEntry('line;strokeWidth=4;html=1;perimeter=backbonePerimeter;points=[];outlineConnect=0;', 160, 10, '', 'Horizontal Backbone', false, null, 'backbone bus network'),
	 	this.createVertexTemplateEntry('line;strokeWidth=4;direction=south;html=1;perimeter=backbonePerimeter;points=[];outlineConnect=0;', 10, 160, '', 'Vertical Backbone', false, null, 'backbone bus network'),
	 	this.createVertexTemplateEntry('shape=crossbar;whiteSpace=wrap;html=1;rounded=1;', 120, 20, '', 'Horizontal Crossbar', false, null, 'crossbar distance measure dimension unit'),
		this.createVertexTemplateEntry('shape=crossbar;whiteSpace=wrap;html=1;rounded=1;direction=south;', 20, 120, '', 'Vertical Crossbar', false, null, 'crossbar distance measure dimension unit'),
	 	this.createVertexTemplateEntry('shape=image;html=1;verticalLabelPosition=bottom;verticalAlign=top;imageAspect=1;aspect=fixed;image=' + this.gearImage, 52, 61, '', 'Image (Fixed Aspect)', false, null, 'fixed image icon symbol'),
	 	this.createVertexTemplateEntry('shape=image;html=1;verticalLabelPosition=bottom;verticalAlign=top;imageAspect=0;image=' + this.gearImage, 50, 60, '', 'Image (Variable Aspect)', false, null, 'strechted image icon symbol'),
	 	this.createVertexTemplateEntry('icon;html=1;image=' + this.gearImage, 60, 60, 'Icon', 'Icon', false, null, 'icon image symbol'),
	 	this.createVertexTemplateEntry('label;whiteSpace=wrap;html=1;image=' + this.gearImage, 140, 60, 'Label', 'Label 1', null, null, 'label image icon symbol'),
	 	this.createVertexTemplateEntry('label;whiteSpace=wrap;html=1;align=center;verticalAlign=bottom;spacingLeft=0;spacingBottom=4;imageAlign=center;imageVerticalAlign=top;image=' + this.gearImage, 120, 80, 'Label', 'Label 2', null, null, 'label image icon symbol'),
		this.addEntry('shape group container', function()
		{
		    var cell = new mxCell('Label', new mxGeometry(0, 0, 160, 70),
				'html=1;whiteSpace=wrap;container=1;recursiveResize=0;collapsible=0;');
		    cell.vertex = true;
		    
			var symbol = new mxCell('', new mxGeometry(20, 20, 20, 30), 'triangle;html=1;whiteSpace=wrap;');
			symbol.vertex = true;
			cell.insert(symbol);
	    	
    		return sb.createVertexTemplateFromCells([cell], cell.geometry.width, cell.geometry.height, 'Shape Group');
		}),
	 	this.createVertexTemplateEntry('shape=partialRectangle;whiteSpace=wrap;html=1;left=0;right=0;fillColor=none;', 120, 60, '', 'Partial Rectangle'),
		this.createVertexTemplateEntry('shape=partialRectangle;whiteSpace=wrap;html=1;bottom=0;top=0;fillColor=none;', 120, 60, '', 'Partial Rectangle'),
		this.createVertexTemplateEntry('shape=partialRectangle;whiteSpace=wrap;html=1;bottom=0;right=0;fillColor=none;', 120, 60, '', 'Partial Rectangle'),
		this.createVertexTemplateEntry('shape=partialRectangle;whiteSpace=wrap;html=1;bottom=1;right=1;left=1;top=0;fillColor=none;routingCenterX=-0.5;', 120, 60, '', 'Partial Rectangle'),
		this.createVertexTemplateEntry('shape=waypoint;sketch=0;fillStyle=solid;size=6;pointerEvents=1;points=[];fillColor=none;resizable=0;rotatable=0;perimeter=centerPerimeter;snapToPoint=1;', 20, 20, '', 'Waypoint'),
		this.createEdgeTemplateEntry('edgeStyle=segmentEdgeStyle;endArrow=classic;html=1;curved=0;rounded=0;endSize=8;startSize=8;', 50, 50, '', 'Manual Line', null, lineTags + 'manual'),
	 	this.createEdgeTemplateEntry('shape=filledEdge;curved=0;rounded=0;fixDash=1;endArrow=none;strokeWidth=10;fillColor=#ffffff;edgeStyle=orthogonalEdgeStyle;html=1;', 60, 40, '', 'Filled Edge'),
	 	this.createEdgeTemplateEntry('edgeStyle=elbowEdgeStyle;elbow=horizontal;endArrow=classic;html=1;curved=0;rounded=0;endSize=8;startSize=8;', 50, 50, '', 'Horizontal Elbow', null, lineTags + 'elbow horizontal'),
	 	this.createEdgeTemplateEntry('edgeStyle=elbowEdgeStyle;elbow=vertical;endArrow=classic;html=1;curved=0;rounded=0;endSize=8;startSize=8;', 50, 50, '', 'Vertical Elbow', null, lineTags + 'elbow vertical')
	];

	this.addPaletteFunctions('misc', mxResources.get('misc'), (expand != null) ? expand : true, fns);
	this.setCurrentSearchEntryLibrary();
};
/**
 * Adds the container palette to the sidebar.
 */
Sidebar.prototype.addAdvancedPalette = function(expand)
{
	this.setCurrentSearchEntryLibrary('general', 'advanced');
	this.addPaletteFunctions('advanced', mxResources.get('advanced'), (expand != null) ? expand : false, this.createAdvancedShapes());
	this.setCurrentSearchEntryLibrary();
};

/**
 * Adds the general palette to the sidebar.
 */
Sidebar.prototype.addBasicPalette = function(dir)
{
	this.setCurrentSearchEntryLibrary('basic');
	this.addStencilPalette('basic', mxResources.get('basic'), dir + '/basic.xml',
		';whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#000000;strokeWidth=2',
		null, null, null, null, [
			this.createVertexTemplateEntry('shape=partialRectangle;whiteSpace=wrap;html=1;top=0;bottom=0;fillColor=none;', 120, 60, '', 'Partial Rectangle'),
			this.createVertexTemplateEntry('shape=partialRectangle;whiteSpace=wrap;html=1;right=0;top=0;bottom=0;fillColor=none;routingCenterX=-0.5;', 120, 60, '', 'Partial Rectangle'),
			this.createVertexTemplateEntry('shape=partialRectangle;whiteSpace=wrap;html=1;bottom=0;right=0;fillColor=none;', 120, 60, '', 'Partial Rectangle'),
			this.createVertexTemplateEntry('shape=partialRectangle;whiteSpace=wrap;html=1;top=0;left=0;fillColor=none;', 120, 60, '', 'Partial Rectangle')
	]);
	this.setCurrentSearchEntryLibrary();
};

/**
 * Adds the container palette to the sidebar.
 */
Sidebar.prototype.createAdvancedShapes = function()
{
	// Avoids having to bind all functions to "this"
	var sb = this;

	// Reusable cells
	var field = new mxCell('List Item', new mxGeometry(0, 0, 60, 26), 'text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;whiteSpace=wrap;html=1;');
	field.vertex = true;

	return [
	 	this.createVertexTemplateEntry('shape=tapeData;whiteSpace=wrap;html=1;perimeter=ellipsePerimeter;', 80, 80, '', 'Tape Data'),
	 	this.createVertexTemplateEntry('shape=manualInput;whiteSpace=wrap;html=1;', 80, 80, '', 'Manual Input'),
	 	this.createVertexTemplateEntry('shape=loopLimit;whiteSpace=wrap;html=1;', 100, 80, '', 'Loop Limit'),
	 	this.createVertexTemplateEntry('shape=offPageConnector;whiteSpace=wrap;html=1;', 80, 80, '', 'Off Page Connector'),
	 	this.createVertexTemplateEntry('shape=delay;whiteSpace=wrap;html=1;', 80, 40, '', 'Delay'),
	 	this.createVertexTemplateEntry('shape=display;whiteSpace=wrap;html=1;', 80, 40, '', 'Display'),
	 	this.createVertexTemplateEntry('shape=singleArrow;direction=west;whiteSpace=wrap;html=1;', 100, 60, '', 'Arrow Left'),
	 	this.createVertexTemplateEntry('shape=singleArrow;whiteSpace=wrap;html=1;', 100, 60, '', 'Arrow Right'),
	 	this.createVertexTemplateEntry('shape=singleArrow;direction=north;whiteSpace=wrap;html=1;', 60, 100, '', 'Arrow Up'),
	 	this.createVertexTemplateEntry('shape=singleArrow;direction=south;whiteSpace=wrap;html=1;', 60, 100, '', 'Arrow Down'),
	 	this.createVertexTemplateEntry('shape=doubleArrow;whiteSpace=wrap;html=1;', 100, 60, '', 'Double Arrow'),
	 	this.createVertexTemplateEntry('shape=doubleArrow;direction=south;whiteSpace=wrap;html=1;', 60, 100, '', 'Double Arrow Vertical', null, null, 'double arrow'),
	 	this.createVertexTemplateEntry('shape=actor;whiteSpace=wrap;html=1;', 40, 60, '', 'User', null, null, 'user person human'),
	 	this.createVertexTemplateEntry('shape=cross;whiteSpace=wrap;html=1;', 80, 80, '', 'Cross'),
	 	this.createVertexTemplateEntry('shape=corner;whiteSpace=wrap;html=1;', 80, 80, '', 'Corner'),
	 	this.createVertexTemplateEntry('shape=tee;whiteSpace=wrap;html=1;', 80, 80, '', 'Tee'),
	 	this.createVertexTemplateEntry('shape=datastore;whiteSpace=wrap;html=1;', 60, 60, '', 'Data Store', null, null, 'data store cylinder database'),
	 	this.createVertexTemplateEntry('shape=orEllipse;perimeter=ellipsePerimeter;whiteSpace=wrap;html=1;backgroundOutline=1;', 80, 80, '', 'Or', null, null, 'or circle oval ellipse'),
	 	this.createVertexTemplateEntry('shape=sumEllipse;perimeter=ellipsePerimeter;whiteSpace=wrap;html=1;backgroundOutline=1;', 80, 80, '', 'Sum', null, null, 'sum circle oval ellipse'),
	 	this.createVertexTemplateEntry('shape=lineEllipse;perimeter=ellipsePerimeter;whiteSpace=wrap;html=1;backgroundOutline=1;', 80, 80, '', 'Ellipse with horizontal divider', null, null, 'circle oval ellipse'),
	 	this.createVertexTemplateEntry('shape=lineEllipse;line=vertical;perimeter=ellipsePerimeter;whiteSpace=wrap;html=1;backgroundOutline=1;', 80, 80, '', 'Ellipse with vertical divider', null, null, 'circle oval ellipse'),
	 	this.createVertexTemplateEntry('shape=sortShape;perimeter=rhombusPerimeter;whiteSpace=wrap;html=1;', 80, 80, '', 'Sort', null, null, 'sort'),
	 	this.createVertexTemplateEntry('shape=collate;whiteSpace=wrap;html=1;', 80, 80, '', 'Collate', null, null, 'collate'),
	 	this.createVertexTemplateEntry('shape=switch;whiteSpace=wrap;html=1;', 60, 60, '', 'Switch', null, null, 'switch router'),

		this.addEntry('process bar', function()
		{
			return sb.createVertexTemplateFromData('1ZVNboMwEIVP42UlfkqabCFtNokUiRO4MAWrBiPbKZDTd2xMSJMgVaraKgskzxs/e+YbS5AwqbqNpE25EzlwEj6TMJFC6GFVdQlwTgKP5SRckyDw8CPBy0zWt1mvoRJq/R1DMBg+KD/AoOylyEApFGMqh6zSPXdZ1bKK0xqjOCsZz7e0Fwdzk9I0ex+juBSSHUWtKTa09lF4Y5wngguJcS2sf9qTGq/bKEGxI+zHBi6lHe1Q9U7qlirthExwThvFXm2tRlFaine4uNYWGguZgxF9b5TShmasLlB78IPxfDocZqqgnBU1rjOswljjRrBaK4Mlikm0RqUtmQZzjvG0OFPTpa5GBg41SA3d7Lis5Ga1AVGBlj1uaVmuSzey1WKwlcCKcrR5w5w9qgahOHmn6ePCPYDbjyG8egyphgYV//odlLQBO3YwXTYgGV5nkRppP8U4+g7yFGflMPwOt+A2t9Hg6PSuUdfpGdUTwHOq0dPPoT7OQQ3uHepq+W9Qozmo4b1D9ZeLv6KK4fSjsbkv/6FP', 296, 100, 'Process Bar');
		}),
	 	this.createVertexTemplateEntry('swimlane;', 200, 200, 'Container', 'Container', null, null, 'container swimlane lane pool group'),
		this.addEntry('list group erd table', function()
		{
			var cell = new mxCell('List', new mxGeometry(0, 0, 140, 110),
		    	'swimlane;fontStyle=0;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=none;horizontalStack=0;' +
		    	'resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;html=1;');
			cell.vertex = true;
			cell.insert(sb.cloneCell(field, 'Item 1'));
			cell.insert(sb.cloneCell(field, 'Item 2'));
			cell.insert(sb.cloneCell(field, 'Item 3'));
			
			return sb.createVertexTemplateFromCells([cell], cell.geometry.width, cell.geometry.height, 'List');
		}),
		this.addEntry('list item entry value group erd table', function()
		{
			return sb.createVertexTemplateFromCells([sb.cloneCell(field, 'List Item')], field.geometry.width, field.geometry.height, 'List Item');
		})
	];
};

/**
 * Adds the general palette to the sidebar.
 */
Sidebar.prototype.addBasicPalette = function(dir)
{
	this.setCurrentSearchEntryLibrary('basic');
	this.addStencilPalette('basic', mxResources.get('basic'), dir + '/basic.xml',
		';whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#000000;strokeWidth=2',
		null, null, null, null, [
			this.createVertexTemplateEntry('shape=partialRectangle;whiteSpace=wrap;html=1;top=0;bottom=0;fillColor=none;', 120, 60, '', 'Partial Rectangle'),
			this.createVertexTemplateEntry('shape=partialRectangle;whiteSpace=wrap;html=1;right=0;top=0;bottom=0;fillColor=none;routingCenterX=-0.5;', 120, 60, '', 'Partial Rectangle'),
			this.createVertexTemplateEntry('shape=partialRectangle;whiteSpace=wrap;html=1;bottom=0;right=0;fillColor=none;', 120, 60, '', 'Partial Rectangle'),
			this.createVertexTemplateEntry('shape=partialRectangle;whiteSpace=wrap;html=1;top=0;left=0;fillColor=none;', 120, 60, '', 'Partial Rectangle')
	]);
	this.setCurrentSearchEntryLibrary();
};

/**
 * Adds the general palette to the sidebar.
 */
Sidebar.prototype.addUmlPalette = function(expand)
{
	// Avoids having to bind all functions to "this"
	var sb = this;

	// Reusable cells
	var field = new mxCell('+ field: type', new mxGeometry(0, 0, 100, 26), 'text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;whiteSpace=wrap;html=1;');
	field.vertex = true;

	var divider = new mxCell('', new mxGeometry(0, 0, 40, 8), 'line;strokeWidth=1;fillColor=none;align=left;verticalAlign=middle;spacingTop=-1;spacingLeft=3;spacingRight=3;rotatable=0;labelPosition=right;points=[];portConstraint=eastwest;strokeColor=inherit;');
	divider.vertex = true;

	var sequenceEdgeStyle = 'newEdgeStyle={"edgeStyle":"elbowEdgeStyle","elbow":"vertical","curved":0,"rounded":0};';
	var lifelineStyle = 'shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;dropTarget=0;' +
		'collapsible=0;recursiveResize=0;outlineConnect=0;portConstraint=eastwest;' + sequenceEdgeStyle;
	var activationStyle = 'html=1;points=[];perimeter=orthogonalPerimeter;outlineConnect=0;' +
		'targetShapes=umlLifeline;portConstraint=eastwest;' + sequenceEdgeStyle;
	
	// Default tags
	var dt = 'uml static class ';
	this.setCurrentSearchEntryLibrary('uml');
	
	var fns = [
   		this.createVertexTemplateEntry('html=1;whiteSpace=wrap;', 110, 50, 'Object', 'Object', null, null, dt + 'object instance'),
   		this.createVertexTemplateEntry('html=1;whiteSpace=wrap;', 110, 50, '&laquo;interface&raquo;<br><b>Name</b>', 'Interface', null, null, dt + 'interface object instance annotated annotation'),
	 	this.addEntry(dt + 'object instance', function()
		{
			var cell = new mxCell('Classname', new mxGeometry(0, 0, 160, 90),
		    	'swimlane;fontStyle=1;align=center;verticalAlign=top;childLayout=stackLayout;horizontal=1;startSize=26;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;whiteSpace=wrap;html=1;');
			cell.vertex = true;
			cell.insert(field.clone());
			cell.insert(divider.clone());
			cell.insert(sb.cloneCell(field, '+ method(type): type'));
			
			return sb.createVertexTemplateFromCells([cell], cell.geometry.width, cell.geometry.height, 'Class'); 
		}),
		this.addEntry(dt + 'section subsection', function()
		{
			var cell = new mxCell('Classname', new mxGeometry(0, 0, 140, 110),
		    	'swimlane;fontStyle=0;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=none;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;whiteSpace=wrap;html=1;');
			cell.vertex = true;
			cell.insert(field.clone());
			cell.insert(field.clone());
			cell.insert(field.clone());
			
			return sb.createVertexTemplateFromCells([cell], cell.geometry.width, cell.geometry.height, 'Class 2');
		}),
		this.addEntry(dt + 'item member method function variable field attribute label', function()
		{
			return sb.createVertexTemplateFromCells([sb.cloneCell(field, '+ item: attribute')], field.geometry.width, field.geometry.height, 'Item 1');
		}),
   		this.addEntry(dt + 'item member method function variable field attribute label', function()
		{
   			var cell = new mxCell('item: attribute', new mxGeometry(0, 0, 120, field.geometry.height), 'label;fontStyle=0;strokeColor=none;fillColor=none;align=left;verticalAlign=top;overflow=hidden;' +
   				'spacingLeft=28;spacingRight=4;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;imageWidth=16;imageHeight=16;whiteSpace=wrap;html=1;image=' + sb.gearImage);
   			cell.vertex = true;
   			
			return sb.createVertexTemplateFromCells([cell], cell.geometry.width, cell.geometry.height, 'Item 2');
		}),
		this.addEntry(dt + 'divider hline line separator', function()
		{
			return sb.createVertexTemplateFromCells([divider.clone()], divider.geometry.width, divider.geometry.height, 'Divider');
		}),
		this.addEntry(dt + 'spacer space gap separator', function()
		{
			var cell = new mxCell('', new mxGeometry(0, 0, 20, 14), 'text;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingTop=-1;spacingLeft=4;spacingRight=4;rotatable=0;labelPosition=right;points=[];portConstraint=eastwest;');
			cell.vertex = true;
			
			return sb.createVertexTemplateFromCells([cell.clone()], cell.geometry.width, cell.geometry.height, 'Spacer');
		}),
		this.createVertexTemplateEntry('text;align=center;fontStyle=1;verticalAlign=middle;spacingLeft=3;spacingRight=3;strokeColor=none;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;html=1;',
			80, 26, 'Title', 'Title', null, null, dt + 'title label'),
		this.addEntry(dt + 'component', function()
		{
		    var cell = new mxCell('&laquo;Annotation&raquo;<br/><b>Component</b>', new mxGeometry(0, 0, 180, 90), 'html=1;dropTarget=0;whiteSpace=wrap;');
		    cell.vertex = true;
		    
			var symbol = new mxCell('', new mxGeometry(1, 0, 20, 20), 'shape=module;jettyWidth=8;jettyHeight=4;');
			symbol.vertex = true;
			symbol.geometry.relative = true;
			symbol.geometry.offset = new mxPoint(-27, 7);
			cell.insert(symbol);
	    	
	    	return sb.createVertexTemplateFromCells([cell], cell.geometry.width, cell.geometry.height, 'Component');
		}),
		this.addEntry(dt + 'component', function()
		{
		    var cell = new mxCell('<p style="margin:0px;margin-top:6px;text-align:center;"><b>Component</b></p>' +
				'<hr/><p style="margin:0px;margin-left:8px;">+ Attribute1: Type<br/>+ Attribute2: Type</p>', new mxGeometry(0, 0, 180, 90),
				'align=left;overflow=fill;html=1;dropTarget=0;whiteSpace=wrap;');
		    cell.vertex = true;
		    
			var symbol = new mxCell('', new mxGeometry(1, 0, 20, 20), 'shape=component;jettyWidth=8;jettyHeight=4;');
			symbol.vertex = true;
			symbol.geometry.relative = true;
			symbol.geometry.offset = new mxPoint(-24, 4);
			cell.insert(symbol);
	    	
	    	return sb.createVertexTemplateFromCells([cell], cell.geometry.width, cell.geometry.height, 'Component with Attributes');
		}),
		this.createVertexTemplateEntry('verticalAlign=top;align=left;spacingTop=8;spacingLeft=2;spacingRight=12;shape=cube;size=10;direction=south;fontStyle=4;html=1;whiteSpace=wrap;',
			180, 120, 'Block', 'Block', null, null, dt + 'block'),
		this.createVertexTemplateEntry('shape=module;align=left;spacingLeft=20;align=center;verticalAlign=top;whiteSpace=wrap;html=1;', 100, 50, 'Module', 'Module', null, null, dt + 'module component'),
		this.createVertexTemplateEntry('shape=folder;fontStyle=1;spacingTop=10;tabWidth=40;tabHeight=14;tabPosition=left;html=1;whiteSpace=wrap;', 70, 50,
		   	'package', 'Package', null, null, dt + 'package'),
		this.createVertexTemplateEntry('verticalAlign=top;align=left;overflow=fill;fontSize=12;fontFamily=Helvetica;html=1;whiteSpace=wrap;',
			160, 90, '<p style="margin:0px;margin-top:4px;text-align:center;text-decoration:underline;"><b>Object:Type</b></p><hr/>' +
			'<p style="margin:0px;margin-left:8px;">field1 = value1<br/>field2 = value2<br>field3 = value3</p>', 'Object',
			null, null, dt + 'object instance'),
		this.createVertexTemplateEntry('verticalAlign=top;align=left;overflow=fill;html=1;whiteSpace=wrap;',180, 90,
			'<div style="box-sizing:border-box;width:100%;background:#e4e4e4;padding:2px;">Tablename</div>' +
			'<table style="width:100%;font-size:1em;" cellpadding="2" cellspacing="0">' +
			'<tr><td>PK</td><td>uniqueId</td></tr><tr><td>FK1</td><td>' +
			'foreignKey</td></tr><tr><td></td><td>fieldname</td></tr></table>', 'Entity', null, null, 'er entity table'),
		this.addEntry(dt + 'object instance', function()
		{
		    var cell = new mxCell('<p style="margin:0px;margin-top:4px;text-align:center;">' +
	    			'<b>Class</b></p>' +
					'<hr size="1"/><div style="height:2px;"></div>', new mxGeometry(0, 0, 140, 60),
					'verticalAlign=top;align=left;overflow=fill;fontSize=12;fontFamily=Helvetica;html=1;whiteSpace=wrap;');
		    cell.vertex = true;
			
			return sb.createVertexTemplateFromCells([cell.clone()], cell.geometry.width, cell.geometry.height, 'Class 3');
		}),
		this.addEntry(dt + 'object instance', function()
		{
		    var cell = new mxCell('<p style="margin:0px;margin-top:4px;text-align:center;">' +
	    			'<b>Class</b></p>' +
					'<hr size="1"/><div style="height:2px;"></div><hr size="1"/><div style="height:2px;"></div>', new mxGeometry(0, 0, 140, 60),
					'verticalAlign=top;align=left;overflow=fill;fontSize=12;fontFamily=Helvetica;html=1;whiteSpace=wrap;');
		    cell.vertex = true;
			
			return sb.createVertexTemplateFromCells([cell.clone()], cell.geometry.width, cell.geometry.height, 'Class 4');
		}),
		this.addEntry(dt + 'object instance', function()
		{
		    var cell = new mxCell('<p style="margin:0px;margin-top:4px;text-align:center;">' +
	    			'<b>Class</b></p>' +
					'<hr size="1"/><p style="margin:0px;margin-left:4px;">+ field: Type</p><hr size="1"/>' +
					'<p style="margin:0px;margin-left:4px;">+ method(): Type</p>', new mxGeometry(0, 0, 160, 90),
					'verticalAlign=top;align=left;overflow=fill;fontSize=12;fontFamily=Helvetica;html=1;whiteSpace=wrap;');
		    cell.vertex = true;
			
			return sb.createVertexTemplateFromCells([cell.clone()], cell.geometry.width, cell.geometry.height, 'Class 5');
		}),
		this.addEntry(dt + 'object instance', function()
		{
		    var cell = new mxCell('<p style="margin:0px;margin-top:4px;text-align:center;">' +
	    			'<i>&lt;&lt;Interface&gt;&gt;</i><br/><b>Interface</b></p>' +
					'<hr size="1"/><p style="margin:0px;margin-left:4px;">+ field1: Type<br/>' +
					'+ field2: Type</p>' +
					'<hr size="1"/><p style="margin:0px;margin-left:4px;">' +
					'+ method1(Type): Type<br/>' +
					'+ method2(Type, Type): Type</p>', new mxGeometry(0, 0, 190, 140),
					'verticalAlign=top;align=left;overflow=fill;fontSize=12;fontFamily=Helvetica;html=1;whiteSpace=wrap;');
		    cell.vertex = true;
			
			return sb.createVertexTemplateFromCells([cell.clone()], cell.geometry.width, cell.geometry.height, 'Interface 2');
		}),
		this.createVertexTemplateEntry('shape=providedRequiredInterface;html=1;verticalLabelPosition=bottom;sketch=0;', 20, 20, '', 'Provided/Required Interface', null, null, 'uml provided required interface lollipop notation'),
		this.createVertexTemplateEntry('shape=requiredInterface;html=1;verticalLabelPosition=bottom;sketch=0;', 10, 20, '', 'Required Interface', null, null, 'uml required interface lollipop notation'),
		this.addDataEntry('uml lollipop notation provided required interface', 20, 20, 'Required Interface',
			'jVNBbuMwDHyN7o6N9L5x2l66QIEe9qy1GUutIhoUHTt9/VKWNo7bBu0hgDicYeQZSlX1cXok3Zvf2IJT1b2qakLkdDpONTinysK2qtqrsizkp8qHG93N3C16TeD5J4IyCU7aDZCQBAQ+uwwQDr6FyC9UtUNigx167Z4QewE3Ar4C8/nFvkeFHhgFMnx0uQu+/UWEo5RGu0NtqYmzI/5gncuDpcoT7qQKTPgGf2zLJk8Jb8CNyeQDes7sTSl1M9BpvmJkpi+AtoOVKaypg2xK9dmnmZVNegQ8AtNZKAROsz2tR+mQyu7Cu0if0crEspiyv9ukOKdyu9YHHKiBLFlSksPVHRZozu7rHKvvcxSB7UM0fjSW4aXXTeyMsnvrvLSznZdzI94ARSD00ESbDnaKLu8OEluNDqW59+jhEtgHkCDYd/13vkGMrQey8lFxaJ7+vCA7QtZ8xdbO4ThvTvivj07N3m13aruP6ziws17+1/t0xWUBTkAM0813cSPvMa9cZKSnUxiwneE19tUGrOJbspJyec8p2uvn/g8='),
		this.addEntry('uml lollipop notation provided required interface', function()
		{
			return sb.createVertexTemplateFromData('zZRNb9swDIZ/je6O3ey+OGsvG1Cgh55Vm7G0KqJB07HTXz/KUux4bbBdNvRgQHz5IYmPTFWUx/GBdGt+YA1OFd9UURIix9VxLME5lWe2VsVe5Xkmn8rvb3g3kzdrNYHnv0koYsJJux6iEoWOzy4JhL2vIcRnqtghscEGvXbfEVsRNyL+BObzk30LGbpnFMnw0SUv+PorEQ5iGu0OpaUq1A76vXUuFRYrVfgiVseEr/BsazapSvcKXJkUHA8JdQOre7OmBtK97963YopKfXgAPALTWUIInGZ7WpfSXTSbOW5OfUQrFfNsTBvFDmfnaG7X+R32VEFKWUDI4uoMizTh+RhV/n9RoWz0DtIKQroakJVbAD21urK+Sc6I4oZzYb35NDT/Nb67P+OTBNt24dcYjGUIPQueQabDGpN2tvGyrqQZQEHoWqhCXw52DPx3B2FWokNx7j16mH+p30SCzr7pl+kEAUV7ATZXf1yUHSFrvorWzuEwPZjukh86NfVuu1PbfXiFPTvrZV/v4xE3M/ETEMN4c3LdAHxJSKSGNCOClP5EA7YxvNY+egErmgs6MZcBHElfz+df',
				40, 10, 'Lollipop Notation');
		}),
		this.createVertexTemplateEntry('shape=umlBoundary;whiteSpace=wrap;html=1;', 100, 80, 'Boundary Object', 'Boundary Object', null, null, 'uml boundary object'),
		this.createVertexTemplateEntry('ellipse;shape=umlEntity;whiteSpace=wrap;html=1;', 80, 80, 'Entity Object', 'Entity Object', null, null, 'uml entity object'),
		this.createVertexTemplateEntry('ellipse;shape=umlControl;whiteSpace=wrap;html=1;', 70, 80, 'Control Object', 'Control Object', null, null, 'uml control object'),
		this.createVertexTemplateEntry('shape=umlActor;verticalLabelPosition=bottom;verticalAlign=top;html=1;', 30, 60, 'Actor', 'Actor', false, null, 'uml actor'),
		this.createVertexTemplateEntry('ellipse;whiteSpace=wrap;html=1;', 140, 70, 'Use Case', 'Use Case', null, null, 'uml use case usecase'),
		this.addEntry('uml activity state start', function()
		{
	    	var cell = new mxCell('', new mxGeometry(0, 0, 30, 30),
	    		'ellipse;html=1;shape=startState;fillColor=#000000;strokeColor=#ff0000;');
	    	cell.vertex = true;
	    	
			var edge = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=orthogonalEdgeStyle;html=1;verticalAlign=bottom;endArrow=open;endSize=8;strokeColor=#ff0000;');
			edge.geometry.setTerminalPoint(new mxPoint(15, 90), false);
			edge.geometry.relative = true;
			edge.edge = true;
			
			cell.insertEdge(edge, true);
	    	
			return sb.createVertexTemplateFromCells([cell, edge], 30, 90, 'Start');
		}),
		this.addEntry('uml activity state', function()
		{
			var cell = new mxCell('Activity', new mxGeometry(0, 0, 120, 40),
				'rounded=1;whiteSpace=wrap;html=1;arcSize=40;fontColor=#000000;fillColor=#ffffc0;strokeColor=#ff0000;');
			cell.vertex = true;
			
			var edge = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=orthogonalEdgeStyle;html=1;verticalAlign=bottom;endArrow=open;endSize=8;strokeColor=#ff0000;');
			edge.geometry.setTerminalPoint(new mxPoint(60, 100), false);
			edge.geometry.relative = true;
			edge.edge = true;
			
			cell.insertEdge(edge, true);
			
			return sb.createVertexTemplateFromCells([cell, edge], 120, 100, 'Activity');
		}),
		this.addEntry('uml activity composite state', function()
		{
			var cell = new mxCell('Composite State', new mxGeometry(0, 0, 160, 60),
					'swimlane;fontStyle=1;align=center;verticalAlign=middle;childLayout=stackLayout;horizontal=1;startSize=30;horizontalStack=0;resizeParent=0;resizeLast=1;container=0;fontColor=#000000;collapsible=0;rounded=1;arcSize=30;strokeColor=#ff0000;fillColor=#ffffc0;swimlaneFillColor=#ffffc0;dropTarget=0;');
			cell.vertex = true;
			
			var cell1 = new mxCell('Subtitle', new mxGeometry(0, 0, 200, 26), 'text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;spacingLeft=4;spacingRight=4;whiteSpace=wrap;overflow=hidden;rotatable=0;fontColor=#000000;');
			cell1.vertex = true;
			cell.insert(cell1);
			
			var edge = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=orthogonalEdgeStyle;html=1;verticalAlign=bottom;endArrow=open;endSize=8;strokeColor=#ff0000;');
			edge.geometry.setTerminalPoint(new mxPoint(80, 120), false);
			edge.geometry.relative = true;
			edge.edge = true;
			
			cell.insertEdge(edge, true);
			
			return sb.createVertexTemplateFromCells([cell, edge], 160, 120, 'Composite State');
		}),
		this.addEntry('uml activity condition', function()
		{
	    	var cell = new mxCell('Condition', new mxGeometry(0, 0, 80, 40), 'rhombus;whiteSpace=wrap;html=1;fontColor=#000000;fillColor=#ffffc0;strokeColor=#ff0000;');
	    	cell.vertex = true;
	    	
			var edge1 = new mxCell('no', new mxGeometry(0, 0, 0, 0), 'edgeStyle=orthogonalEdgeStyle;html=1;align=left;verticalAlign=bottom;endArrow=open;endSize=8;strokeColor=#ff0000;');
			edge1.geometry.setTerminalPoint(new mxPoint(180, 20), false);
			edge1.geometry.relative = true;
			edge1.geometry.x = -1;
			edge1.edge = true;
			
			cell.insertEdge(edge1, true);
	    	
			var edge2 = new mxCell('yes', new mxGeometry(0, 0, 0, 0), 'edgeStyle=orthogonalEdgeStyle;html=1;align=left;verticalAlign=top;endArrow=open;endSize=8;strokeColor=#ff0000;');
			edge2.geometry.setTerminalPoint(new mxPoint(40, 100), false);
			edge2.geometry.relative = true;
			edge2.geometry.x = -1;
			edge2.edge = true;
			
			cell.insertEdge(edge2, true);
			
			return sb.createVertexTemplateFromCells([cell, edge1, edge2], 180, 100, 'Condition');
		}),
		this.addEntry('uml activity fork join', function()
		{
	    	var cell = new mxCell('', new mxGeometry(0, 0, 200, 10), 'shape=line;html=1;strokeWidth=6;strokeColor=#ff0000;');
	    	cell.vertex = true;
			
			var edge = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=orthogonalEdgeStyle;html=1;verticalAlign=bottom;endArrow=open;endSize=8;strokeColor=#ff0000;');
			edge.geometry.setTerminalPoint(new mxPoint(100, 80), false);
			edge.geometry.relative = true;
			edge.edge = true;
			
			cell.insertEdge(edge, true);
		
			return sb.createVertexTemplateFromCells([cell, edge], 200, 80, 'Fork/Join');
		}),
		this.createVertexTemplateEntry('ellipse;html=1;shape=endState;fillColor=#000000;strokeColor=#ff0000;', 30, 30, '', 'End', null, null, 'uml activity state end'),
		this.createVertexTemplateEntry(lifelineStyle, 100, 300, ':Object', 'Lifeline', null, null, 'uml sequence participant lifeline'),
		this.createVertexTemplateEntry(lifelineStyle + 'participant=umlActor;', 20, 300, '', 'Actor Lifeline', null, null, 'uml sequence participant lifeline actor'),
		this.createVertexTemplateEntry(lifelineStyle + 'participant=umlBoundary;', 50, 300, '', 'Boundary Lifeline', null, null, 'uml sequence participant lifeline boundary'),
		this.createVertexTemplateEntry(lifelineStyle + 'participant=umlEntity;', 40, 300, '', 'Entity Lifeline', null, null, 'uml sequence participant lifeline entity'),
		this.createVertexTemplateEntry(lifelineStyle + 'participant=umlControl;', 40, 300, '', 'Control Lifeline', null, null, 'uml sequence participant lifeline control'),
		this.createVertexTemplateEntry('shape=umlFrame;whiteSpace=wrap;html=1;pointerEvents=0;', 300, 200, 'frame', 'Frame', null, null, 'uml sequence frame'),
		this.createVertexTemplateEntry('shape=umlDestroy;whiteSpace=wrap;html=1;strokeWidth=3;targetShapes=umlLifeline;',
			30, 30, '', 'Destruction', null, null, 'uml sequence destruction destroy'),
		this.addEntry('uml sequence invoke invocation call activation bar', function()
		{
	    	var cell = new mxCell('', new mxGeometry(0, 0, 10, 80), activationStyle);
	    	cell.vertex = true;
	    	
			var edge = new mxCell('dispatch', new mxGeometry(0, 0, 0, 0), 'html=1;verticalAlign=bottom;startArrow=oval;endArrow=block;' +
				'startSize=8;edgeStyle=elbowEdgeStyle;elbow=vertical;curved=0;rounded=0;');
			edge.geometry.setTerminalPoint(new mxPoint(-60, 0), true);
			edge.geometry.relative = true;
			edge.edge = true;
			
			cell.insertEdge(edge, false);
	
			return sb.createVertexTemplateFromCells([cell, edge], 10, 80, 'Found Message');
		}),
		this.addEntry('uml sequence invoke call delegation synchronous invocation activation bar', function()
		{
	    	var cell = new mxCell('', new mxGeometry(0, 0, 10, 80), activationStyle);
	    	cell.vertex = true;
	    	
			var edge1 = new mxCell('dispatch', new mxGeometry(0, 0, 0, 0), 'html=1;verticalAlign=bottom;endArrow=block;' +
				'edgeStyle=elbowEdgeStyle;elbow=vertical;curved=0;rounded=0;');
			edge1.geometry.setTerminalPoint(new mxPoint(-70, 0), true);
			edge1.geometry.relative = true;
			edge1.edge = true;

			cell.insertEdge(edge1, false);
			
			var edge2 = new mxCell('return', new mxGeometry(0, 0, 0, 0), 'html=1;verticalAlign=bottom;endArrow=open;dashed=1;' +
				'endSize=8;edgeStyle=elbowEdgeStyle;elbow=vertical;curved=0;rounded=0;');
			edge2.geometry.setTerminalPoint(new mxPoint(-70, 75), false);
			edge2.geometry.relative = true;
			edge2.edge = true;
			
			cell.insertEdge(edge2, true);
			
			return sb.createVertexTemplateFromCells([cell, edge1, edge2], 10, 80, 'Synchronous Invocation');
		}),
		this.addEntry('uml sequence self call recursion delegation activation bar', function()
		{
	    	var cell = new mxCell('', new mxGeometry(-5, 20, 10, 40), activationStyle);
	    	cell.vertex = true;
	
			var edge = new mxCell('self call', new mxGeometry(0, 0, 0, 0), 'html=1;align=left;spacingLeft=2;endArrow=block;' +
				'rounded=0;edgeStyle=orthogonalEdgeStyle;curved=0;rounded=0;');
			edge.geometry.setTerminalPoint(new mxPoint(0, 0), true);
			edge.geometry.points = [new mxPoint(30, 30)];
			edge.geometry.relative = true;
			edge.edge = true;
			
			cell.insertEdge(edge, false);
	
			return sb.createVertexTemplateFromCells([cell, edge], 10, 60, 'Self Call');
		}),
		this.addEntry('uml sequence invoke call delegation callback activation bar', function()
		{
			var cell = new mxCell('', new mxGeometry(0, 0, 10, 80), activationStyle);
			cell.vertex = true;

			var edge1 = new mxCell('callback', new mxGeometry(0, 0, 0, 0), 'html=1;verticalAlign=bottom;endArrow=block;' +
				'edgeStyle=elbowEdgeStyle;elbow=vertical;curved=0;rounded=0;');
			edge1.geometry.setTerminalPoint(new mxPoint(80, 0), true);
			edge1.geometry.relative = true;
			edge1.edge = true;

			cell.insertEdge(edge1, false);

			var edge2 = new mxCell('return', new mxGeometry(0, 0, 0, 0), 'html=1;verticalAlign=bottom;endArrow=open;dashed=1;' +
				'endSize=8;edgeStyle=elbowEdgeStyle;elbow=vertical;curved=0;rounded=0;');
			edge2.geometry.setTerminalPoint(new mxPoint(80, 75), false);
			edge2.geometry.relative = true;
			edge2.edge = true;

			cell.insertEdge(edge2, true);

			return sb.createVertexTemplateFromCells([cell, edge1, edge2], 10, 80, 'Callback');

		}),
		this.createVertexTemplateEntry(activationStyle, 10, 80, '', 'Activation Bar', null, null, 'uml sequence activation bar'),
	 	this.createEdgeTemplateEntry('html=1;verticalAlign=bottom;startArrow=oval;startFill=1;endArrow=block;startSize=8;' +
		 	'edgeStyle=elbowEdgeStyle;elbow=vertical;curved=0;rounded=0;', 60, 0, 'dispatch', 'Found Message 1', null, 'uml sequence message call invoke dispatch'),
	 	this.createEdgeTemplateEntry('html=1;verticalAlign=bottom;startArrow=circle;startFill=1;endArrow=open;startSize=6;endSize=8;' +
			 'edgeStyle=elbowEdgeStyle;elbow=vertical;curved=0;rounded=0;', 80, 0, 'dispatch', 'Found Message 2', null, 'uml sequence message call invoke dispatch'),
	 	this.createEdgeTemplateEntry('html=1;verticalAlign=bottom;endArrow=block;edgeStyle=elbowEdgeStyle;elbow=vertical;curved=0;rounded=0;',
			80, 0, 'dispatch', 'Message', null, 'uml sequence message call invoke dispatch'),
		this.addEntry('uml sequence return message', function()
		{
			var edge = new mxCell('return', new mxGeometry(0, 0, 0, 0), 'html=1;verticalAlign=bottom;endArrow=open;dashed=1;endSize=8;' +
				'edgeStyle=elbowEdgeStyle;elbow=vertical;curved=0;rounded=0;');
			edge.geometry.setTerminalPoint(new mxPoint(80, 0), true);
			edge.geometry.setTerminalPoint(new mxPoint(0, 0), false);
			edge.geometry.relative = true;
			edge.edge = true;
			
			return sb.createEdgeTemplateFromCells([edge], 80, 0, 'Return');
		}),
		this.addEntry('uml relation', function()
		{
			var edge = new mxCell('name', new mxGeometry(0, 0, 0, 0), 'endArrow=block;endFill=1;html=1;edgeStyle=orthogonalEdgeStyle;align=left;verticalAlign=top;');
			edge.geometry.setTerminalPoint(new mxPoint(0, 0), true);
			edge.geometry.setTerminalPoint(new mxPoint(160, 0), false);
			edge.geometry.relative = true;
			edge.geometry.x = -1;
			edge.edge = true;
			
	    	var cell = new mxCell('1', new mxGeometry(-1, 0, 0, 0), 'edgeLabel;resizable=0;html=1;align=left;verticalAlign=bottom;');
	    	cell.geometry.relative = true;
	    	cell.setConnectable(false);
	    	cell.vertex = true;
	    	edge.insert(cell);
	    	
			return sb.createEdgeTemplateFromCells([edge], 160, 0, 'Relation 1');
		}),
		this.addEntry('uml association', function()
		{
			var edge = new mxCell('', new mxGeometry(0, 0, 0, 0), 'endArrow=none;html=1;edgeStyle=orthogonalEdgeStyle;');
			edge.geometry.setTerminalPoint(new mxPoint(0, 0), true);
			edge.geometry.setTerminalPoint(new mxPoint(160, 0), false);
			edge.geometry.relative = true;
			edge.edge = true;
			
	    	var cell1 = new mxCell('parent', new mxGeometry(-1, 0, 0, 0), 'edgeLabel;resizable=0;html=1;align=left;verticalAlign=bottom;');
	    	cell1.geometry.relative = true;
	    	cell1.setConnectable(false);
	    	cell1.vertex = true;
	    	edge.insert(cell1);
			
	    	var cell2 = new mxCell('child', new mxGeometry(1, 0, 0, 0), 'edgeLabel;resizable=0;html=1;align=right;verticalAlign=bottom;');
	    	cell2.geometry.relative = true;
	    	cell2.setConnectable(false);
	    	cell2.vertex = true;
	    	edge.insert(cell2);
	    	
			return sb.createEdgeTemplateFromCells([edge], 160, 0, 'Association 1');
		}),
		this.addEntry('uml aggregation', function()
		{
			var edge = new mxCell('1', new mxGeometry(0, 0, 0, 0), 'endArrow=open;html=1;endSize=12;startArrow=diamondThin;startSize=14;startFill=0;edgeStyle=orthogonalEdgeStyle;align=left;verticalAlign=bottom;');
			edge.geometry.setTerminalPoint(new mxPoint(0, 0), true);
			edge.geometry.setTerminalPoint(new mxPoint(160, 0), false);
			edge.geometry.relative = true;
			edge.geometry.x = -1;
			edge.geometry.y = 3;
			edge.edge = true;
		
			return sb.createEdgeTemplateFromCells([edge], 160, 0, 'Aggregation 1');
		}),
		this.addEntry('uml composition', function()
		{
			var edge = new mxCell('1', new mxGeometry(0, 0, 0, 0), 'endArrow=open;html=1;endSize=12;startArrow=diamondThin;startSize=14;startFill=1;edgeStyle=orthogonalEdgeStyle;align=left;verticalAlign=bottom;');
			edge.geometry.setTerminalPoint(new mxPoint(0, 0), true);
			edge.geometry.setTerminalPoint(new mxPoint(160, 0), false);
			edge.geometry.relative = true;
			edge.geometry.x = -1;
			edge.geometry.y = 3;
			edge.edge = true;
			
			return sb.createEdgeTemplateFromCells([edge], 160, 0, 'Composition 1');
		}),
		this.addEntry('uml relation', function()
		{
			var edge = new mxCell('Relation', new mxGeometry(0, 0, 0, 0), 'endArrow=open;html=1;endSize=12;startArrow=diamondThin;startSize=14;startFill=0;edgeStyle=orthogonalEdgeStyle;');
			edge.geometry.setTerminalPoint(new mxPoint(0, 0), true);
			edge.geometry.setTerminalPoint(new mxPoint(160, 0), false);
			edge.geometry.relative = true;
			edge.edge = true;
			
	    	var cell1 = new mxCell('0..n', new mxGeometry(-1, 0, 0, 0), 'edgeLabel;resizable=0;html=1;align=left;verticalAlign=top;');
	    	cell1.geometry.relative = true;
	    	cell1.setConnectable(false);
	    	cell1.vertex = true;
	    	edge.insert(cell1);
			
	    	var cell2 = new mxCell('1', new mxGeometry(1, 0, 0, 0), 'edgeLabel;resizable=0;html=1;align=right;verticalAlign=top;');
	    	cell2.geometry.relative = true;
	    	cell2.setConnectable(false);
	    	cell2.vertex = true;
	    	edge.insert(cell2);
	    	
			return sb.createEdgeTemplateFromCells([edge], 160, 0, 'Relation 2');
		}),
		this.createEdgeTemplateEntry('endArrow=open;endSize=12;dashed=1;html=1;', 160, 0, 'Use', 'Dependency', null, 'uml dependency use'),
		this.createEdgeTemplateEntry('endArrow=block;endSize=16;endFill=0;html=1;', 160, 0, 'Extends', 'Generalization', null, 'uml generalization extend'),
	 	this.createEdgeTemplateEntry('endArrow=block;startArrow=block;endFill=1;startFill=1;html=1;', 160, 0, '', 'Association 2', null, 'uml association'),
	 	this.createEdgeTemplateEntry('endArrow=open;startArrow=circlePlus;endFill=0;startFill=0;endSize=8;html=1;', 160, 0, '', 'Inner Class', null, 'uml inner class'),
	 	this.createEdgeTemplateEntry('endArrow=open;startArrow=cross;endFill=0;startFill=0;endSize=8;startSize=10;html=1;', 160, 0, '', 'Terminate', null, 'uml terminate'),
	 	this.createEdgeTemplateEntry('endArrow=block;dashed=1;endFill=0;endSize=12;html=1;', 160, 0, '', 'Implementation', null, 'uml realization implementation'),
	 	this.createEdgeTemplateEntry('endArrow=diamondThin;endFill=0;endSize=24;html=1;', 160, 0, '', 'Aggregation 2', null, 'uml aggregation'),
	 	this.createEdgeTemplateEntry('endArrow=diamondThin;endFill=1;endSize=24;html=1;', 160, 0, '', 'Composition 2', null, 'uml composition'),
	 	this.createEdgeTemplateEntry('endArrow=open;endFill=1;endSize=12;html=1;', 160, 0, '', 'Association 3', null, 'uml association')
	];
	
	this.addPaletteFunctions('uml', mxResources.get('uml'), expand || false, fns);
	this.setCurrentSearchEntryLibrary();
};

/**
 * Creates and returns the given title element.
 */
Sidebar.prototype.createTitle = function(label)
{
	var elt = document.createElement('a');
	elt.setAttribute('title', mxResources.get('sidebarTooltip'));
	elt.className = 'geTitle';
	mxUtils.write(elt, label);

	return elt;
};

/**
 * Creates a thumbnail for the given cells.
 */
Sidebar.prototype.createThumb = function(cells, width, height, parent, title, showLabel, showTitle, w, h, bg, border, scale)
{
	this.graph.labelsVisible = (showLabel == null || showLabel);
	var fo = mxClient.NO_FO;
	mxClient.NO_FO = Editor.prototype.originalNoForeignObject;

	// Tries to avoid transparent color but can't use computed
	// style due to async CSS
	this.graph.shapeBackgroundColor = (bg != null) ? bg :
		(Editor.isDarkMode() ? '#2a252f' : '#f1f3f4');
	this.graph.view.scaleAndTranslate((scale != null) ? scale : 1, 0, 0);
	this.graph.addCells(cells);
	var bounds = this.graph.getGraphBounds();

	if (scale == null)
	{
		var s = Math.floor(Math.min((width - 2 * this.thumbBorder) / bounds.width,
			(height - 2 * this.thumbBorder) / bounds.height) * 100) / 100;
		this.graph.view.scaleAndTranslate(s,
			(width - bounds.width * s) / 2 / s - bounds.x,
			(height - bounds.height * s) / 2 / s - bounds.y);
	}

	var node = null;
	
	// For supporting HTML labels in IE9 standards mode the container is cloned instead
	if (this.graph.dialect == mxConstants.DIALECT_SVG && !mxClient.NO_FO &&
		this.graph.view.getCanvas().ownerSVGElement != null)
	{
		node = this.graph.view.getCanvas().ownerSVGElement.cloneNode(true);
	}
	// LATER: Check if deep clone can be used for quirks if container in DOM
	else
	{
		node = this.graph.container.cloneNode(false);
		node.innerHTML = this.graph.container.innerHTML;
	}

	this.graph.getModel().clear();
	this.graph.view.scaleAndTranslate(1, 0, 0);
	this.graph.shapeBackgroundColor = (Editor.isDarkMode() ?
		'#2a252f' : '#f1f3f4');
	mxClient.NO_FO = fo;
	
	node.style.position = 'relative';
	node.style.overflow = (scale != null) ? 'visible' : 'hidden';
	node.style.left = ((border != null) ? border : this.thumbBorder) + 'px';
	node.style.top = node.style.left;
	node.style.width = width + 'px';
	node.style.height = height + 'px';
	node.style.visibility = '';
	node.style.minWidth = '';
	node.style.minHeight = '';
	this.disablePointerEvents(node);
	
	parent.appendChild(node);
	
	// Adds title for sidebar entries
	if (this.sidebarTitles && title != null && showTitle != false)
	{
		var border = 0;
		parent.style.height = (this.thumbHeight + border + this.sidebarTitleSize + 8) + 'px';
		
		var div = document.createElement('div');
		div.style.color = Editor.isDarkMode() ? '#A0A0A0' : '#303030';
		div.style.fontSize = this.sidebarTitleSize + 'px';
		div.style.textAlign = 'center';
		div.style.whiteSpace = 'nowrap';
		div.style.overflow = 'hidden';
		div.style.textOverflow = 'ellipsis';
		
		if (mxClient.IS_IE)
		{
			div.style.height = (this.sidebarTitleSize + 12) + 'px';
		}

		div.style.paddingTop = '4px';
		mxUtils.write(div, title);
		parent.appendChild(div);
	}

	return bounds;
};

/**
 * Returns a function that creates a title.
 */
Sidebar.prototype.createSection = function(title)
{
	return mxUtils.bind(this, function()
	{
		var elt = document.createElement('div');
		elt.setAttribute('title', title);
		elt.style.textOverflow = 'ellipsis';
		elt.style.whiteSpace = 'nowrap';
		elt.style.textAlign = 'center';
		elt.style.overflow = 'hidden';
		elt.style.width = '100%';
		elt.style.padding = '14px 0';
		
		mxUtils.write(elt, title);
		
		return elt;
	});
};

/**
 * Creates and returns a new palette item for the given image.
 */
Sidebar.prototype.createItem = function(cells, title, showLabel, showTitle, width, height,
	allowCellsInserted, showTooltip, clickFn, thumbWidth, thumbHeight, icon, startEditing,
	sourceCell)
{
	showTooltip = (showTooltip != null) ? showTooltip : true;
	thumbWidth = (thumbWidth != null) ? thumbWidth : this.thumbWidth;
	thumbHeight = (thumbHeight != null) ? thumbHeight : this.thumbHeight;
	
	var elt = document.createElement('a');
	elt.className = 'geItem';
	elt.style.overflow = 'hidden';
	var border = 2 * this.thumbBorder;
	elt.style.width = (thumbWidth + border) + 'px';
	elt.style.height = (thumbHeight + border) + 'px';
	elt.style.padding = this.thumbPadding + 'px';
	
	// Blocks default click action
	mxEvent.addListener(elt, 'click', function(evt)
	{
		mxEvent.consume(evt);
	});
	
	// Applies default styles
	var originalCells = cells;
	cells = this.graph.cloneCells(cells);
	this.editorUi.insertHandler(originalCells, null, this.graph.model,
		this.editorUi.editor.graph.defaultVertexStyle,
		this.editorUi.editor.graph.defaultEdgeStyle,
		true, true);

	if (icon != null)
	{
		elt.style.backgroundImage = 'url(' + icon + ')';
		elt.style.backgroundRepeat = 'no-repeat';
		elt.style.backgroundPosition = 'center';
		elt.style.backgroundSize = '24px 24px';
	}
	else
	{
		this.createThumb(originalCells, thumbWidth, thumbHeight,
			elt, title, showLabel, showTitle, width, height);
	}
	
	var bounds = new mxRectangle(0, 0, width, height);
	
	if (cells.length > 1 || cells[0].vertex)
	{
		var ds = this.createDragSource(elt, this.createDropHandler(cells, true, allowCellsInserted,
			bounds, startEditing, sourceCell), this.createDragPreview(width, height),
			cells, bounds, startEditing);
		this.addClickHandler(elt, ds, cells, clickFn, startEditing);
	
		// Uses guides for vertices only if enabled in graph
		ds.isGuidesEnabled = mxUtils.bind(this, function()
		{
			return this.editorUi.editor.graph.graphHandler.guidesEnabled;
		});
	}
	else if (cells[0] != null && cells[0].edge)
	{
		var ds = this.createDragSource(elt, this.createDropHandler(cells, false, allowCellsInserted,
			bounds, startEditing, sourceCell), this.createDragPreview(width, height),
			cells, bounds, startEditing);
		this.addClickHandler(elt, ds, cells, clickFn);
	}
	
	// Shows a tooltip with the rendered cell
	if (!mxClient.IS_IOS && showTooltip)
	{
		mxEvent.addGestureListeners(elt, null, mxUtils.bind(this, function(evt)
		{
			if (mxEvent.isMouseEvent(evt))
			{
				this.showTooltip(elt, cells, bounds.width, bounds.height, title, showLabel);
			}
		}));
	}
	
	return elt;
};

/**
 * Creates a drop handler for inserting the given cells.
 */
Sidebar.prototype.createDropHandler = function(cells, allowSplit, allowCellsInserted, bounds, startEditing, sourceCell)
{
	allowCellsInserted = (allowCellsInserted != null) ? allowCellsInserted : true;
	
	return mxUtils.bind(this, function(graph, evt, target, x, y, force)
	{
		var elt = (force) ? null : ((mxEvent.isTouchEvent(evt) || mxEvent.isPenEvent(evt)) ?
			document.elementFromPoint(mxEvent.getClientX(evt), mxEvent.getClientY(evt)) :
			mxEvent.getSource(evt));
		
		while (elt != null && elt != this.container)
		{
			elt = elt.parentNode;
		}
		
		if (elt == null && graph.isEnabled())
		{
			cells = graph.getImportableCells(cells);
			
			if (cells.length > 0)
			{
				graph.stopEditing();
				
				// Holding alt while mouse is released ignores drop target
				var validDropTarget = (target != null && !mxEvent.isAltDown(evt)) ?
					graph.isValidDropTarget(target, cells, evt) : false;
					
				var select = null;

				if (target != null && !validDropTarget)
				{
					target = null;
				}
				
				if (!graph.isCellLocked(target || graph.getDefaultParent()))
				{
					graph.model.beginUpdate();
					try
					{
						x = Math.round(x);
						y = Math.round(y);
						
						// Splits the target edge or inserts into target group
						if (allowSplit && graph.isSplitTarget(target, cells, evt))
						{
							var s = graph.view.scale;
							var tr = graph.view.translate;
							var tx = (x + tr.x) * s;
							var ty = (y + tr.y) * s;
							
							var clones = graph.cloneCells(cells);
							graph.splitEdge(target, clones, null,
								x - bounds.width / 2, y - bounds.height / 2,
								tx, ty);
							select = clones;
						}
						else if (cells.length > 0)
						{
							select = graph.importCells(cells, x, y, target);
							
							if (graph.model.isVertex(sourceCell) && select.length == 1 &&
								graph.model.isVertex(select[0]))
							{
								var edge = graph.insertEdge(graph.model.getParent(sourceCell),
									null, '', sourceCell, select[0], graph.createCurrentEdgeStyle());
								graph.applyNewEdgeStyle(sourceCell, [edge]);
								select.push(edge);

								if (graph.connectionHandler.insertBeforeSource)
								{
									graph.insertEdgeBeforeCell(edge, sourceCell);
								}
							}
						}
						
						// Executes parent layout hooks for position/order
						if (graph.layoutManager != null)
						{
							var layout = graph.layoutManager.getLayout(target);
							
							if (layout != null)
							{
								var s = graph.view.scale;
								var tr = graph.view.translate;
								var tx = (x + tr.x) * s;
								var ty = (y + tr.y) * s;
								
								for (var i = 0; i < select.length; i++)
								{
									layout.moveCell(select[i], tx, ty);
								}
							}
						}

						if (allowCellsInserted && (evt == null || !mxEvent.isShiftDown(evt)))
						{
							graph.fireEvent(new mxEventObject('cellsInserted', 'cells', select));
						}

						for (var i = 0; i < select.length; i++)
						{
							if (graph.model.isVertex(select[i]) &&
								graph.isAutoSizeCell(select[i]))
							{
								graph.updateCellSize(select[i]);
							}
						}
					}
					catch (e)
					{
						this.editorUi.handleError(e);
					}
					finally
					{
						graph.model.endUpdate();
					}
	
					if (select != null && select.length > 0)
					{
						graph.scrollCellToVisible(select[0]);
						graph.setSelectionCells(select);
					}

					if (startEditing || (graph.editAfterInsert && evt != null &&
						mxEvent.isMouseEvent(evt) && select != null &&
						select.length == 1))
					{
						window.setTimeout(function()
						{
							graph.startEditing(select[0]);
						}, 0);
					}
				}
			}
			
			mxEvent.consume(evt);
		}
	});
};

/**
 * Creates and returns a preview element for the given width and height.
 */
Sidebar.prototype.createDragPreview = function(width, height)
{
	var elt = document.createElement('div');
	elt.className = 'geDragPreview';
	elt.style.width = width + 'px';
	elt.style.height = height + 'px';
	
	return elt;
};

/**
 * Creates a drag source for the given element.
 */
Sidebar.prototype.dropAndConnect = function(source, targets, direction, dropCellIndex, evt, firstVertex, freeSourceEdge)
{
	var graph = this.editorUi.editor.graph;
	var index = (graph.model.isEdge(source) || firstVertex != null) ? firstVertex : freeSourceEdge;
	var geo = this.getDropAndConnectGeometry(source, targets[index], direction, targets);
	
	// Targets without the new edge for selection
	var tmp = [];
	
	if (geo != null)
	{
		var editingCell = null;

		graph.model.beginUpdate();
		try
		{
			var sourceGeo = graph.getCellGeometry(source);
			var geo2 = graph.getCellGeometry(targets[dropCellIndex]);

			// Handles special case where target should be ignored for stack layouts
			var targetParent = graph.model.getParent(source);
			var validLayout = true;
			
			// Ignores parent if it has a stack layout or if it is a table or row
			if (graph.layoutManager != null)
			{
				var layout = graph.layoutManager.getLayout(targetParent);
			
				// LATER: Use parent of parent if valid layout
				if (layout != null && layout.constructor == mxStackLayout)
				{
					validLayout = false;
				}
			}
			
			// Checks if another container is at the drop location
			var tmp = (graph.model.isEdge(source)) ? null : graph.view.getState(targetParent);
			var dx = 0;
			var dy = 0;
			
			// Offsets by parent position
			if (tmp != null)
			{
				var offset = tmp.origin;
				dx = offset.x;
				dy = offset.y;
			}
			
			var useParent = !graph.isTableRow(source) && !graph.isTableCell(source) &&
				(graph.model.isEdge(source) || (sourceGeo != null &&
				!sourceGeo.relative && validLayout));
			
			var tempTarget = graph.getCellAt((geo.x + dx + graph.view.translate.x) * graph.view.scale,
				(geo.y + dy + graph.view.translate.y) * graph.view.scale, null, null, null, function(state, x, y)
				{
					return !graph.isContainer(state.cell);
				});
			
			if (tempTarget != null && tempTarget != targetParent)
			{
				tmp = graph.view.getState(tempTarget);
			
				// Offsets by new parent position
				if (tmp != null)
				{
					var offset = tmp.origin;
					targetParent = tempTarget;
					useParent = true;
					
					if (!graph.model.isEdge(source))
					{
						geo.x -= offset.x - dx;
						geo.y -= offset.y - dy;
					}
				}
			}
			else if (!validLayout || graph.isTableRow(source) || graph.isTableCell(source))
			{
				geo.x += dx;
				geo.y += dy;
			}

			dx = geo2.x;
			dy = geo2.y;
			
			// Ignores geometry of edges
			if (graph.model.isEdge(targets[dropCellIndex]))
			{
				dx = 0;
				dy = 0;
			}
			
			targets = graph.importCells(targets, (geo.x - (useParent ? dx : 0)),
				(geo.y - (useParent ? dy : 0)), (useParent) ? targetParent : null);
			tmp = targets;

			if (graph.model.isEdge(source))
			{
				// Adds new terminal to edge
				// LATER: Push new terminal out radially from edge start point
				graph.model.setTerminal(source, targets[dropCellIndex],
					direction == mxConstants.DIRECTION_NORTH);
				
				// Replaces the source edge style with the dangling edge and
				// removes the dangling edge from the graph
				if (freeSourceEdge != null && firstVertex != null)
				{
					graph.model.remove(targets[freeSourceEdge]);
					graph.updateShapes(targets[freeSourceEdge], [source]);
				}
			}
			else if (graph.model.isEdge(targets[dropCellIndex]) && firstVertex == null)
			{
				// Adds new outgoing connection to vertex and clears points
				graph.model.setTerminal(targets[dropCellIndex], source, true);
				var geo3 = graph.getCellGeometry(targets[dropCellIndex]);
				var tp = (geo3 != null) ? geo3.getTerminalPoint(true) : null;
				geo3.points = null;

				// Connects edge terminal points at the same location to the source
				if (tp != null)
				{
					for (var i = 0; i < targets.length; i++)
					{
						if (graph.model.isEdge(targets[i]) && i != dropCellIndex)
						{
							var geo4 = graph.getCellGeometry(targets[i]);
							var pt = (geo4 != null) ? geo4.getTerminalPoint(true) : null;
							
							if (pt != null)
							{
								if (pt.x == tp.x && pt.y == tp.y)
								{
									graph.model.setTerminal(targets[i], source, true);
								}
							}
						}
					}
				}

				if (geo3.getTerminalPoint(false) != null)
				{
					geo3.setTerminalPoint(geo.getTerminalPoint(false), false);
				}
				else if (useParent && graph.model.isVertex(targetParent))
				{
					// Adds parent offset to other nodes
					var tmpState = graph.view.getState(targetParent);
					var offset = (tmpState.cell != graph.view.currentRoot) ?
						tmpState.origin : new mxPoint(0, 0);

					graph.cellsMoved(targets, offset.x, offset.y, null, null, true);
				}
			}
			else if (firstVertex != null)
			{
				geo2 = graph.getCellGeometry(targets[firstVertex]);
				dx = geo.x - Math.round(geo2.x);
				dy = geo.y - Math.round(geo2.y);
				geo.x = Math.round(geo2.x);
				geo.y = Math.round(geo2.y);
				graph.model.setGeometry(targets[dropCellIndex], geo);
				graph.cellsMoved(targets, dx, dy, null, null, true);
				tmp = targets.slice();
				editingCell = (tmp.length == 1) ? tmp[0] : null;

				if (freeSourceEdge != null)
				{
					graph.model.setTerminal(targets[freeSourceEdge], source, true);
				}
				else
				{
					targets.push(graph.insertEdge(null, null, '', source, targets[dropCellIndex],
						graph.createCurrentEdgeStyle()));
				}
			}
			
			if (evt == null || !mxEvent.isShiftDown(evt))
			{
				graph.fireEvent(new mxEventObject('cellsInserted', 'cells', targets));
			}
		}
		catch (e)
		{
			this.editorUi.handleError(e);
		}
		finally
		{
			graph.model.endUpdate();
		}
		
		if (graph.editAfterInsert && evt != null && mxEvent.isMouseEvent(evt) &&
			editingCell != null)
		{
			window.setTimeout(function()
			{
				graph.startEditing(editingCell);
			}, 0);
		}
	}

	// Removes connected edge from selection
	// cells to avoid disconnecting on move
	if (freeSourceEdge != null && tmp.length > 1)
	{
		tmp.splice(freeSourceEdge, 1);
	}
	
	return tmp;
};

/**
 * Creates a drag source for the given element.
 */
Sidebar.prototype.getDropAndConnectGeometry = function(source, target, direction, targets)
{
	var graph = this.editorUi.editor.graph;
	var view = graph.view;
	var keepSize = targets.length > 1;
	var state = graph.view.getState(source);
	var geo = graph.getCellGeometry(source);
	var geo2 = graph.getCellGeometry(target);

	if (state != null && geo != null && geo2 != null)
	{
		geo2 = geo2.clone();

		if (graph.model.isEdge(source))
		{
			var pts = state.absolutePoints;
			var p0 = pts[0];
			var pe = pts[pts.length - 1];
			
			if (direction == mxConstants.DIRECTION_NORTH)
			{
				geo2.x = p0.x / view.scale - view.translate.x - geo2.width / 2;
				geo2.y = p0.y / view.scale - view.translate.y - geo2.height / 2;
			}
			else
			{
				geo2.x = pe.x / view.scale - view.translate.x - geo2.width / 2;
				geo2.y = pe.y / view.scale - view.translate.y - geo2.height / 2;
			}
		}
		else
		{
			if (geo.relative)
			{
				geo = geo.clone();
				geo.x = (state.x - view.translate.x) / view.scale;
				geo.y = (state.y - view.translate.y) / view.scale;
			}
			
			var length = graph.defaultEdgeLength;
			
			// Maintains edge length
			if (graph.model.isEdge(target) && geo2.getTerminalPoint(true) != null &&
				geo2.getTerminalPoint(false) != null)
			{
				var p0 = geo2.getTerminalPoint(true);
				var pe = geo2.getTerminalPoint(false);
				var dx = pe.x - p0.x;
				var dy = pe.y - p0.y;
				
				length = Math.sqrt(dx * dx + dy * dy);
				
				geo2.x = geo.getCenterX();
				geo2.y = geo.getCenterY();
				geo2.width = 1;
				geo2.height = 1;
				
				if (direction == mxConstants.DIRECTION_NORTH)
				{
					geo2.height = length
					geo2.y = geo.y - length;
					geo2.setTerminalPoint(new mxPoint(geo2.x, geo2.y), false);
				}
				else if (direction == mxConstants.DIRECTION_EAST)
				{
					geo2.width = length
					geo2.x = geo.x + geo.width;
					geo2.setTerminalPoint(new mxPoint(geo2.x + geo2.width, geo2.y), false);
				}
				else if (direction == mxConstants.DIRECTION_SOUTH)
				{
					geo2.height = length
					geo2.y = geo.y + geo.height;
					geo2.setTerminalPoint(new mxPoint(geo2.x, geo2.y + geo2.height), false);
				}
				else if (direction == mxConstants.DIRECTION_WEST)
				{
					geo2.width = length
					geo2.x = geo.x - length;
					geo2.setTerminalPoint(new mxPoint(geo2.x, geo2.y), false);
				}
			}
			else
			{
				// Try match size or ignore if width or height < 45 which
				// is considered special enough to be ignored here
				if (!keepSize && geo2.width > 45 && geo2.height > 45 &&
					geo.width > 45 && geo.height > 45)
				{
					geo2.width = geo2.width * (geo.height / geo2.height);
					geo2.height = geo.height;
				}
	
				geo2.x = geo.x + geo.width / 2 - geo2.width / 2;
				geo2.y = geo.y + geo.height / 2 - geo2.height / 2;

				if (direction == mxConstants.DIRECTION_NORTH)
				{
					geo2.y = geo2.y - geo.height / 2 - geo2.height / 2 - length;
				}
				else if (direction == mxConstants.DIRECTION_EAST)
				{
					geo2.x = geo2.x + geo.width / 2 + geo2.width / 2 + length;
				}
				else if (direction == mxConstants.DIRECTION_SOUTH)
				{
					geo2.y = geo2.y + geo.height / 2 + geo2.height / 2 + length;
				}
				else if (direction == mxConstants.DIRECTION_WEST)
				{
					geo2.x = geo2.x - geo.width / 2 - geo2.width / 2 - length;
				}
				
				// Adds offset to match cells without connecting edge
				if (graph.model.isEdge(target) && geo2.getTerminalPoint(true) != null &&
					target.getTerminal(false) != null)
				{
					var targetGeo = graph.getCellGeometry(target.getTerminal(false));
					
					if (targetGeo != null)
					{
						if (direction == mxConstants.DIRECTION_NORTH)
						{
							geo2.x -= targetGeo.getCenterX();
							geo2.y -= targetGeo.getCenterY() + targetGeo.height / 2;
						}
						else if (direction == mxConstants.DIRECTION_EAST)
						{
							geo2.x -= targetGeo.getCenterX() - targetGeo.width / 2;
							geo2.y -= targetGeo.getCenterY();
						}
						else if (direction == mxConstants.DIRECTION_SOUTH)
						{
							geo2.x -= targetGeo.getCenterX();
							geo2.y -= targetGeo.getCenterY() - targetGeo.height / 2;
						}
						else if (direction == mxConstants.DIRECTION_WEST)
						{
							geo2.x -= targetGeo.getCenterX() + targetGeo.width / 2;
							geo2.y -= targetGeo.getCenterY();
						}
					}
				}
			}
		}
	}
	
	return geo2;
};

/**
 * Limits drop style to non-transparent source shapes.
 */
Sidebar.prototype.isDropStyleEnabled = function(cells, firstVertex)
{
	var result = true;
	
	if (firstVertex != null && cells.length == 1)
	{
		var vstyle = this.graph.getCellStyle(cells[firstVertex]);
		
		if (vstyle != null)
		{
			result = mxUtils.getValue(vstyle, mxConstants.STYLE_STROKECOLOR, mxConstants.NONE) != mxConstants.NONE ||
				mxUtils.getValue(vstyle, mxConstants.STYLE_FILLCOLOR, mxConstants.NONE) != mxConstants.NONE;
		}
	}
	
	return result;
};

/**
 * Ignores swimlanes as drop style targets.
 */
Sidebar.prototype.isDropStyleTargetIgnored = function(state)
{
	return this.graph.isSwimlane(state.cell) || this.graph.isTableCell(state.cell) ||
		this.graph.isTableRow(state.cell) || this.graph.isTable(state.cell);
};

/**
 * Creates a drag source for the given element.
 */
Sidebar.prototype.disablePointerEvents = function(node)
{
	mxUtils.visitNodes(node, mxUtils.bind(this, function(node)
	{
		if (node.nodeType == mxConstants.NODETYPE_ELEMENT)
		{
			node.style.pointerEvents = 'none';
			node.removeAttribute('pointer-events');
		}
	}));
};

/**
 * Creates a drag source for the given element.
 */
Sidebar.prototype.createDragSource = function(elt, dropHandler, preview, cells, bounds, startEditing)
{
	// Checks if the cells contain any vertices
	var ui = this.editorUi;
	var graph = ui.editor.graph;
	var freeSourceEdge = null;
	var firstVertex = null;
	var sidebar = this;
	var count = 0;
	var livePreview = this.livePreview;

	for (var i = 0; i < cells.length && livePreview; i++)
	{
		count += graph.model.getDescendants(cells[i]).length;
		livePreview = count < graph.graphHandler.maxLivePreview;
	}

	for (var i = 0; i < cells.length; i++)
	{
		if (firstVertex == null && graph.model.isVertex(cells[i]))
		{
			firstVertex = i;
		}
		else if (freeSourceEdge == null && graph.model.isEdge(cells[i]) &&
				graph.model.getTerminal(cells[i], true) == null)
		{
			freeSourceEdge = i;
		}
		
		if (firstVertex != null && freeSourceEdge != null)
		{
			break;
		}
	}
	
	var dropStyleEnabled = this.isDropStyleEnabled(cells, firstVertex);
	
	var dragSource = mxUtils.makeDraggable(elt, graph, mxUtils.bind(this, function(graph, evt, target, x, y)
	{
		if (this.updateThread != null)
		{
			window.clearTimeout(this.updateThread);
		}
		
		if (cells != null && currentStyleTarget != null && activeArrow == styleTarget)
		{
			var tmp = graph.isCellSelected(currentStyleTarget.cell) ? graph.getSelectionCells() : [currentStyleTarget.cell];
			graph.updateShapes((graph.model.isEdge(currentStyleTarget.cell)) ? cells[0] : cells[firstVertex], tmp, true);
			graph.setSelectionCells(tmp);
		}
		else if (cells != null && activeArrow != null && currentTargetState != null && activeArrow != styleTarget)
		{
			var index = (graph.model.isEdge(currentTargetState.cell) || freeSourceEdge == null) ? firstVertex : freeSourceEdge;
			graph.setSelectionCells(this.dropAndConnect(currentTargetState.cell, cells, direction, index, evt, firstVertex, freeSourceEdge));
		}
		else
		{
			dropHandler.apply(this, arguments);
		}
		
		if (this.editorUi.hoverIcons != null)
		{
			this.editorUi.hoverIcons.update(graph.view.getState(graph.getSelectionCell()));
		}
	}), preview, 0, 0, graph.autoscroll, true, true);

	if (livePreview)
	{
		dragSource.createDragElement = mxUtils.bind(this, function()
		{
			return dragSource.createPreviewElement(this.graph);
		});
		
		dragSource.createPreviewElement = mxUtils.bind(this, function(targetGraph)
		{
			var elt = document.createElement('a');
			elt.className = 'geItem';
			elt.style.overflow = 'visible';
			var s = targetGraph.view.scale;
			elt.style.width = (s * Math.max(1, bounds.width)) + 'px';
			elt.style.height = (s * Math.max(1, bounds.height)) + 'px';
			
			// Transparency for guides and target highlights
			mxUtils.setOpacity(elt, 50);

			var clones = graph.cloneCells(cells);
			ui.insertHandler(clones, null, this.graph.model,
				null, null, true, true);
			
			sidebar.createThumb(clones, s * Math.max(1, bounds.width),
				s * Math.max(1, bounds.height), elt, null, null, null,
				null, null, graph.shapeBackgroundColor, 0, s);
			
			return elt;
		});
	}
	
	// Stops dragging if cancel is pressed
	graph.addListener(mxEvent.ESCAPE, function(sender, evt)
	{
		if (dragSource.isActive())
		{
			dragSource.reset();
		}
	});

	// Overrides mouseDown to ignore popup triggers
	var mouseDown = dragSource.mouseDown;
	
	dragSource.mouseDown = function(evt)
	{
		if (!mxEvent.isPopupTrigger(evt) && !mxEvent.isMultiTouchEvent(evt) &&
			!graph.isCellLocked(graph.getDefaultParent()))
		{
			graph.stopEditing();
			mouseDown.apply(this, arguments);
		}
	};

	// Workaround for event redirection via image tag in quirks and IE8
	function createArrow(img, tooltip)
	{
		var arrow = null;
		arrow = mxUtils.createImage(img.src);
		arrow.style.width = img.width + 'px';
		arrow.style.height = img.height + 'px';
		
		if (tooltip != null)
		{
			arrow.setAttribute('title', tooltip);
		}
		
		mxUtils.setOpacity(arrow, (img == this.refreshTarget) ? 30 : 20);
		arrow.style.position = 'absolute';
		arrow.style.cursor = 'crosshair';
		
		return arrow;
	};

	var currentTargetState = null;
	var currentStateHandle = null;
	var currentStyleTarget = null;
	var activeTarget = false;
	
	var arrowUp = createArrow(this.triangleUp, mxResources.get('connect'));
	var arrowRight = createArrow(this.triangleRight, mxResources.get('connect'));
	var arrowDown = createArrow(this.triangleDown, mxResources.get('connect'));
	var arrowLeft = createArrow(this.triangleLeft, mxResources.get('connect'));
	var styleTarget = createArrow(this.refreshTarget, mxResources.get('replace'));

	// Workaround for actual parentNode not being updated in old IE
	var styleTargetParent = null;
	var roundSource = createArrow(this.roundDrop);
	var roundTarget = createArrow(this.roundDrop);
	var direction = mxConstants.DIRECTION_NORTH;
	var activeArrow = null;
	
	function checkArrow(x, y, bounds, arrow)
	{
		if (arrow.parentNode != null)
		{
			if (mxUtils.contains(bounds, x, y))
			{
				mxUtils.setOpacity(arrow, 100);
				activeArrow = arrow;
			}
			else
			{
				mxUtils.setOpacity(arrow, (arrow == styleTarget) ? 30 : 20);
			}
		}
		
		return bounds;
	};
	
	// Hides guides and preview if target is active
	var dsCreatePreviewElement = dragSource.createPreviewElement;
	
	// Stores initial size of preview element
	dragSource.createPreviewElement = function(graph)
	{
		var elt = dsCreatePreviewElement.apply(this, arguments);
		
		// Pass-through events required to tooltip on replace shape
		if (mxClient.IS_SVG)
		{
			elt.style.pointerEvents = 'none';
		}
		
		this.previewElementWidth = elt.style.width;
		this.previewElementHeight = elt.style.height;
		
		return elt;
	};
	
	// Shows/hides hover icons
	var dragEnter = dragSource.dragEnter;
	dragSource.dragEnter = function(graph, evt)
	{
		if (ui.hoverIcons != null)
		{
			ui.hoverIcons.setDisplay('none');
		}
		
		dragEnter.apply(this, arguments);
	};
	
	var dragExit = dragSource.dragExit;
	dragSource.dragExit = function(graph, evt)
	{
		if (ui.hoverIcons != null)
		{
			ui.hoverIcons.setDisplay('');
		}
		
		dragExit.apply(this, arguments);
	};
	
	dragSource.dragOver = function(graph, evt)
	{
		mxDragSource.prototype.dragOver.apply(this, arguments);

		if (this.currentGuide != null && activeArrow != null)
		{
			this.currentGuide.hide();
		}

		if (this.previewElement != null)
		{
			ui.hideShapePicker();
			var view = graph.view;
			
			if (currentStyleTarget != null && activeArrow == styleTarget)
			{
				this.previewElement.style.display = 'none';
			}
			else if (currentTargetState != null && activeArrow != null)
			{
				if (dragSource.currentHighlight != null && dragSource.currentHighlight.state != null)
				{
					dragSource.currentHighlight.hide();
				}
				
				var index = (graph.model.isEdge(currentTargetState.cell) || firstVertex != null) ? firstVertex : freeSourceEdge;
				var geo = sidebar.getDropAndConnectGeometry(currentTargetState.cell, cells[index], direction, cells);
				var geo2 = (!graph.model.isEdge(currentTargetState.cell)) ? graph.getCellGeometry(currentTargetState.cell) : null;
				var geo3 = graph.getCellGeometry(cells[index]);
				var parent = graph.model.getParent(currentTargetState.cell);
				var dx = view.translate.x * view.scale;
				var dy = view.translate.y * view.scale;
				
				if (geo2 != null && !geo2.relative && graph.model.isVertex(parent) && parent != view.currentRoot)
				{
					var pState = view.getState(parent);
					
					dx = pState.x;
					dy = pState.y;
				}
				
				var dx2 = geo3.x;
				var dy2 = geo3.y;

				// Ignores geometry of edges
				if (graph.model.isEdge(cells[index]))
				{
					dx2 = 0;
					dy2 = 0;
				}
				
				// Shows preview at drop location
				this.previewElement.style.left = ((geo.x - dx2) * view.scale + dx) + 'px';
				this.previewElement.style.top = ((geo.y - dy2) * view.scale + dy) + 'px';
				
				if (cells.length == 1)
				{
					this.previewElement.style.width = (geo.width * view.scale) + 'px';
					this.previewElement.style.height = (geo.height * view.scale) + 'px';

					if (this.previewElement.firstChild != null)
					{
						this.previewElement.firstChild.style.display = 'none';
						this.previewElement.className = 'geDragPreview';
						mxUtils.setOpacity(this.previewElement, 100);
					}
				}
				
				this.previewElement.style.display = '';
			}
			else if (dragSource.currentHighlight.state != null &&
				graph.model.isEdge(dragSource.currentHighlight.state.cell))
			{
				// Centers drop cells when splitting edges
				this.previewElement.style.left = Math.round(parseInt(this.previewElement.style.left) -
					bounds.width * view.scale / 2) + 'px';
				this.previewElement.style.top = Math.round(parseInt(this.previewElement.style.top) -
					bounds.height * view.scale / 2) + 'px';
			}
			else
			{
				this.previewElement.style.width = this.previewElementWidth;
				this.previewElement.style.height = this.previewElementHeight;
				this.previewElement.style.display = '';

				if (this.previewElement.firstChild != null)
				{
					this.previewElement.firstChild.style.display = '';
					mxUtils.setOpacity(this.previewElement, 50);
					this.previewElement.className = '';
				}
			}
		}
	};
	
	var startTime = new Date().getTime();
	var timeOnTarget = 0;
	var prev = null;
	
	// Gets source cell style to compare shape below
	var sourceCellStyle = this.editorUi.editor.graph.getCellStyle(cells[0]);
	
	// Allows drop into cell only if target is a valid root
	dragSource.getDropTarget = mxUtils.bind(this, function(graph, x, y, evt)
	{
		// Alt means no targets at all
		// LATER: Show preview where result will go
		var cell = (!mxEvent.isAltDown(evt) && cells != null) ?
			graph.getCellAt(x, y, null, null, null, function(state, x, y)
			{
				return graph.isContainer(state.cell);
			}) : null;
		
		// Uses connectable parent vertex if one exists
		if (cell != null && !this.graph.isCellConnectable(cell) &&
			!this.graph.model.isEdge(cell))
		{
			var parent = this.graph.getModel().getParent(cell);
			
			if (this.graph.getModel().isVertex(parent) &&
				this.graph.isCellConnectable(parent))
			{
				cell = parent;
			}
		}
		
		// Ignores locked cells
		if (graph.isCellLocked(cell))
		{
			cell = null;
		}
		
		var state = graph.view.getState(cell);
		activeArrow = null;
		var bbox = null;

		// Time on target
		if (prev != state)
		{
			startTime = new Date().getTime();
			timeOnTarget = 0;
			prev = state;

			if (this.updateThread != null)
			{
				window.clearTimeout(this.updateThread);
			}
			
			if (state != null)
			{
				this.updateThread = window.setTimeout(function()
				{
					if (activeArrow == null)
					{
						prev = state;
						dragSource.getDropTarget(graph, x, y, evt);
					}
				}, this.dropTargetDelay + 10);
			}
		}
		else
		{
			timeOnTarget = new Date().getTime() - startTime;
		}

		// Shift means disabled, delayed on cells with children, shows after this.dropTargetDelay, hides after 2500ms
		if (dropStyleEnabled && (timeOnTarget < 2500) && state != null && !mxEvent.isShiftDown(evt) &&
			// If shape is equal or target has no stroke, fill and gradient then use longer delay except for images
			(((mxUtils.getValue(state.style, mxConstants.STYLE_SHAPE) != mxUtils.getValue(sourceCellStyle, mxConstants.STYLE_SHAPE) &&
			(mxUtils.getValue(state.style, mxConstants.STYLE_STROKECOLOR, mxConstants.NONE) != mxConstants.NONE ||
			mxUtils.getValue(state.style, mxConstants.STYLE_FILLCOLOR, mxConstants.NONE) != mxConstants.NONE ||
			mxUtils.getValue(state.style, mxConstants.STYLE_GRADIENTCOLOR, mxConstants.NONE) != mxConstants.NONE)) ||
			mxUtils.getValue(sourceCellStyle, mxConstants.STYLE_SHAPE) == 'image') ||
			timeOnTarget > 1500 || graph.model.isEdge(state.cell)) && (timeOnTarget > this.dropTargetDelay) &&
			!this.isDropStyleTargetIgnored(state) && ((graph.model.isVertex(state.cell) && firstVertex != null) ||
			(graph.model.isEdge(state.cell) && graph.model.isEdge(cells[0]))))
		{
			if (graph.isCellEditable(state.cell))
			{
				currentStyleTarget = state;
				var tmp = (graph.model.isEdge(state.cell)) ? graph.view.getPoint(state) :
					new mxPoint(state.getCenterX(), state.getCenterY());
				tmp = new mxRectangle(tmp.x - this.refreshTarget.width / 2, tmp.y - this.refreshTarget.height / 2,
					this.refreshTarget.width, this.refreshTarget.height);
				
				styleTarget.style.left = Math.floor(tmp.x) + 'px';
				styleTarget.style.top = Math.floor(tmp.y) + 'px';
				
				if (styleTargetParent == null)
				{
					graph.container.appendChild(styleTarget);
					styleTargetParent = styleTarget.parentNode;
				}
				
				checkArrow(x, y, tmp, styleTarget);
			}
		}
		// Does not reset on ignored edges
		else if (currentStyleTarget == null || !mxUtils.contains(currentStyleTarget, x, y) ||
			(timeOnTarget > 1500 && !mxEvent.isShiftDown(evt)))
		{
			currentStyleTarget = null;
			
			if (styleTargetParent != null)
			{
				styleTarget.parentNode.removeChild(styleTarget);
				styleTargetParent = null;
			}
		}
		else if (currentStyleTarget != null && styleTargetParent != null)
		{
			// Sets active Arrow as side effect
			var tmp = (graph.model.isEdge(currentStyleTarget.cell)) ? graph.view.getPoint(currentStyleTarget) :
				new mxPoint(currentStyleTarget.getCenterX(), currentStyleTarget.getCenterY());
			tmp = new mxRectangle(tmp.x - this.refreshTarget.width / 2, tmp.y - this.refreshTarget.height / 2,
				this.refreshTarget.width, this.refreshTarget.height);
			checkArrow(x, y, tmp, styleTarget);
		}
		
		// Checks if inside bounds
		if (activeTarget && currentTargetState != null && !mxEvent.isAltDown(evt) && activeArrow == null)
		{
			// LATER: Use hit-detection for edges
			bbox = mxRectangle.fromRectangle(currentTargetState);
			
			if (graph.model.isEdge(currentTargetState.cell))
			{
				var pts = currentTargetState.absolutePoints;
				
				if (roundSource.parentNode != null)
				{
					var p0 = pts[0];
					bbox.add(checkArrow(x, y, new mxRectangle(p0.x - this.roundDrop.width / 2,
						p0.y - this.roundDrop.height / 2, this.roundDrop.width,
						this.roundDrop.height), roundSource));
				}
				
				if (roundTarget.parentNode != null)
				{
					var pe = pts[pts.length - 1];
					bbox.add(checkArrow(x, y, new mxRectangle(pe.x - this.roundDrop.width / 2,
						pe.y - this.roundDrop.height / 2, this.roundDrop.width,
						this.roundDrop.height), roundTarget));
				}
			}
			else
			{
				var bds = mxRectangle.fromRectangle(currentTargetState);
				
				// Uses outer bounding box to take rotation into account
				if (currentTargetState.shape != null && currentTargetState.shape.boundingBox != null)
				{
					bds = mxRectangle.fromRectangle(currentTargetState.shape.boundingBox);
				}

				bds.grow(this.graph.tolerance);
				bds.grow(HoverIcons.prototype.arrowSpacing);
				
				var handler = this.graph.selectionCellsHandler.getHandler(currentTargetState.cell);
				
				if (handler != null)
				{
					bds.x -= handler.horizontalOffset / 2;
					bds.y -= handler.verticalOffset / 2;
					bds.width += handler.horizontalOffset;
					bds.height += handler.verticalOffset;
					
					// Adds bounding box of rotation handle to avoid overlap
					if (handler.rotationShape != null && handler.rotationShape.node != null &&
						handler.rotationShape.node.style.visibility != 'hidden' &&
						handler.rotationShape.node.style.display != 'none' &&
						handler.rotationShape.boundingBox != null)
					{
						bds.add(handler.rotationShape.boundingBox);
					}
				}
				
				bbox.add(checkArrow(x, y, new mxRectangle(currentTargetState.getCenterX() - this.triangleUp.width / 2,
					bds.y - this.triangleUp.height, this.triangleUp.width, this.triangleUp.height), arrowUp));
				bbox.add(checkArrow(x, y, new mxRectangle(bds.x + bds.width,
					currentTargetState.getCenterY() - this.triangleRight.height / 2,
					this.triangleRight.width, this.triangleRight.height), arrowRight));
				bbox.add(checkArrow(x, y, new mxRectangle(currentTargetState.getCenterX() - this.triangleDown.width / 2,
						bds.y + bds.height, this.triangleDown.width, this.triangleDown.height), arrowDown));
				bbox.add(checkArrow(x, y, new mxRectangle(bds.x - this.triangleLeft.width,
						currentTargetState.getCenterY() - this.triangleLeft.height / 2,
						this.triangleLeft.width, this.triangleLeft.height), arrowLeft));
			}
			
			// Adds tolerance
			if (bbox != null)
			{
				bbox.grow(10);
			}
		}
		
		direction = mxConstants.DIRECTION_NORTH;
		
		if (activeArrow == arrowRight)
		{
			direction = mxConstants.DIRECTION_EAST;
		}
		else if (activeArrow == arrowDown || activeArrow == roundTarget)
		{
			direction = mxConstants.DIRECTION_SOUTH;
		}
		else if (activeArrow == arrowLeft)
		{
			direction = mxConstants.DIRECTION_WEST;
		}
		
		if (currentStyleTarget != null && activeArrow == styleTarget)
		{
			state = currentStyleTarget;
		}

		var validTarget = (firstVertex == null || graph.isCellConnectable(cells[firstVertex])) &&
			((graph.model.isEdge(cell) && firstVertex != null) ||
			(graph.model.isVertex(cell) && graph.isCellConnectable(cell)));
		
		// Drop arrows shown after this.dropTargetDelay, hidden after 5 secs, switches arrows after 500ms
		if ((currentTargetState != null && timeOnTarget >= 5000) ||
			(currentTargetState != state &&
			(bbox == null || !mxUtils.contains(bbox, x, y) ||
			(timeOnTarget > 500 && activeArrow == null && validTarget))))
		{
			activeTarget = false;
			currentTargetState = ((timeOnTarget < 5000 && timeOnTarget > this.dropTargetDelay) ||
				graph.model.isEdge(cell)) ? state : null;

			if (currentTargetState != null && validTarget)
			{
				var elts = [roundSource, roundTarget, arrowUp, arrowRight, arrowDown, arrowLeft];
				
				for (var i = 0; i < elts.length; i++)
				{
					if (elts[i].parentNode != null)
					{
						elts[i].parentNode.removeChild(elts[i]);
					}
				}
				
				if (graph.model.isEdge(cell))
				{
					var pts = state.absolutePoints;
					
					if (pts != null)
					{
						var p0 = pts[0];
						var pe = pts[pts.length - 1];
						
						roundSource.style.left = Math.floor(p0.x - this.roundDrop.width / 2) + 'px';
						roundSource.style.top = Math.floor(p0.y - this.roundDrop.height / 2) + 'px';
						
						roundTarget.style.left = Math.floor(pe.x - this.roundDrop.width / 2) + 'px';
						roundTarget.style.top = Math.floor(pe.y - this.roundDrop.height / 2) + 'px';
						
						if (graph.model.getTerminal(cell, true) == null)
						{
							graph.container.appendChild(roundSource);
						}
						
						if (graph.model.getTerminal(cell, false) == null)
						{
							graph.container.appendChild(roundTarget);
						}
					}
				}
				else
				{
					var bds = mxRectangle.fromRectangle(state);
					
					// Uses outer bounding box to take rotation into account
					if (state.shape != null && state.shape.boundingBox != null)
					{
						bds = mxRectangle.fromRectangle(state.shape.boundingBox);
					}

					bds.grow(this.graph.tolerance);
					bds.grow(HoverIcons.prototype.arrowSpacing);
					
					var handler = this.graph.selectionCellsHandler.getHandler(state.cell);
					
					if (handler != null)
					{
						bds.x -= handler.horizontalOffset / 2;
						bds.y -= handler.verticalOffset / 2;
						bds.width += handler.horizontalOffset;
						bds.height += handler.verticalOffset;
						
						// Adds bounding box of rotation handle to avoid overlap
						if (handler.rotationShape != null && handler.rotationShape.node != null &&
							handler.rotationShape.node.style.visibility != 'hidden' &&
							handler.rotationShape.node.style.display != 'none' &&
							handler.rotationShape.boundingBox != null)
						{
							bds.add(handler.rotationShape.boundingBox);
						}
					}
					
					arrowUp.style.left = Math.floor(state.getCenterX() - this.triangleUp.width / 2) + 'px';
					arrowUp.style.top = Math.floor(bds.y - this.triangleUp.height) + 'px';
					
					arrowRight.style.left = Math.floor(bds.x + bds.width) + 'px';
					arrowRight.style.top = Math.floor(state.getCenterY() - this.triangleRight.height / 2) + 'px';
					
					arrowDown.style.left = arrowUp.style.left
					arrowDown.style.top = Math.floor(bds.y + bds.height) + 'px';
					
					arrowLeft.style.left = Math.floor(bds.x - this.triangleLeft.width) + 'px';
					arrowLeft.style.top = arrowRight.style.top;
					
					if (state.style['portConstraint'] != 'eastwest')
					{
						graph.container.appendChild(arrowUp);
						graph.container.appendChild(arrowDown);
					}

					graph.container.appendChild(arrowRight);
					graph.container.appendChild(arrowLeft);
				}
				
				// Hides handle for cell under mouse
				if (state != null)
				{
					currentStateHandle = graph.selectionCellsHandler.getHandler(state.cell);
					
					if (currentStateHandle != null && currentStateHandle.setHandlesVisible != null)
					{
						currentStateHandle.setHandlesVisible(false);
					}
				}
				
				activeTarget = true;
			}
			else
			{
				var elts = [roundSource, roundTarget, arrowUp, arrowRight, arrowDown, arrowLeft];
				
				for (var i = 0; i < elts.length; i++)
				{
					if (elts[i].parentNode != null)
					{
						elts[i].parentNode.removeChild(elts[i]);
					}
				}
			}
		}

		if (!activeTarget && currentStateHandle != null)
		{
			currentStateHandle.setHandlesVisible(true);
		}
		
		// Handles drop target
		var target = ((!mxEvent.isAltDown(evt) || mxEvent.isShiftDown(evt)) &&
			!(currentStyleTarget != null && activeArrow == styleTarget)) ?
			mxDragSource.prototype.getDropTarget.apply(this, arguments) : null;

		if (target != null && (activeArrow != null ||
			!graph.isSplitTarget(target, cells, evt)))
		{
			target = graph.getDropTarget(cells, evt, target, true);
		}
		
		return target;
	});
	
	dragSource.stopDrag = function()
	{
		mxDragSource.prototype.stopDrag.apply(this, arguments);
		
		var elts = [roundSource, roundTarget, styleTarget, arrowUp, arrowRight, arrowDown, arrowLeft];
		
		for (var i = 0; i < elts.length; i++)
		{
			if (elts[i].parentNode != null)
			{
				elts[i].parentNode.removeChild(elts[i]);
			}
		}
		
		if (currentTargetState != null && currentStateHandle != null)
		{
			currentStateHandle.reset();
		}
		
		currentStateHandle = null;
		currentTargetState = null;
		currentStyleTarget = null;
		styleTargetParent = null;
		activeArrow = null;
	};
	
	return dragSource;
};

/**
 * Adds a handler for inserting the cell with a single click.
 */
Sidebar.prototype.itemClicked = function(cells, ds, evt, elt)
{
	var graph = this.editorUi.editor.graph;
	graph.container.focus();
	
	// Alt+Click inserts and connects
	if (mxEvent.isAltDown(evt) && graph.getSelectionCount() == 1 &&
		graph.model.isVertex(graph.getSelectionCell()))
	{
		var firstVertex = null;
		
		for (var i = 0; i < cells.length && firstVertex == null; i++)
		{
			if (graph.model.isVertex(cells[i]))
			{
				firstVertex = i;
			}
		}
		
		if (firstVertex != null)
		{
			graph.setSelectionCells(this.dropAndConnect(graph.getSelectionCell(), cells,
				(mxEvent.isMetaDown(evt) || mxEvent.isControlDown(evt)) ?
				(mxEvent.isShiftDown(evt) ? mxConstants.DIRECTION_WEST : mxConstants.DIRECTION_NORTH) : 
				(mxEvent.isShiftDown(evt) ? mxConstants.DIRECTION_EAST : mxConstants.DIRECTION_SOUTH),
				firstVertex, evt));
			graph.scrollCellToVisible(graph.getSelectionCell());
		}
	}
	// Shift+Click updates shape
	else if (mxEvent.isShiftDown(evt) && !graph.isSelectionEmpty())
	{
		var temp = graph.getEditableCells(graph.getSelectionCells());
		graph.updateShapes(cells[0], temp, true);
		graph.scrollCellToVisible(temp);
	}
	else
	{
		var pt = (mxEvent.isAltDown(evt)) ? graph.getFreeInsertPoint() :
			graph.getCenterInsertPoint(graph.getBoundingBoxFromGeometry(cells, true));
		ds.drop(graph, evt, null, pt.x, pt.y, true);
	}
};

/**
 * Adds a handler for inserting the cell with a single click.
 */
Sidebar.prototype.addClickHandler = function(elt, ds, cells, clickFn)
{
	var graph = this.editorUi.editor.graph;
	var oldGetGraphForEvent = ds.getGraphForEvent;
	var oldMouseDown = ds.mouseDown;
	var oldMouseMove = ds.mouseMove;
	var oldMouseUp = ds.mouseUp;
	var tol = graph.tolerance;
	var active = false;
	var first = null;
	var sb = this;
	var op = null;

	ds.getGraphForEvent = function(evt)
	{
		if (active)
		{
			return oldGetGraphForEvent.apply(this, arguments);
		}
		else
		{
			return null;
		}
	};

	ds.mouseDown =function(evt)
	{
		oldMouseDown.apply(this, arguments);
		first = new mxPoint(mxEvent.getClientX(evt), mxEvent.getClientY(evt));
		op = elt.style.opacity;
		active = false;

		if (op == '')
		{
			op = '1';
		}
		
		if (this.dragElement != null)
		{
			this.dragElement.style.display = 'none';
			mxUtils.setOpacity(elt, 50);
		}
	};
	
	ds.mouseMove = function(evt)
	{
		active = first != null && (Math.abs(first.x - mxEvent.getClientX(evt)) > tol ||
			Math.abs(first.y - mxEvent.getClientY(evt)) > tol);

		if (active && this.dragElement != null &&
			this.dragElement.style.display == 'none')
		{
			this.dragElement.style.display = '';
			mxUtils.setOpacity(elt, op * 100);
		}
		
		oldMouseMove.apply(this, arguments);
	};
	
	ds.mouseUp = function(evt)
	{
		try
		{
			if (!mxEvent.isPopupTrigger(evt) && this.currentGraph == null &&
				this.dragElement != null && this.dragElement.style.display == 'none')
			{
				if (clickFn != null)
				{
					clickFn(evt);
				}

				if (!mxEvent.isConsumed(evt))
				{
					sb.itemClicked(cells, ds, evt, elt);
				}
			}
	
			oldMouseUp.apply(ds, arguments);
			mxUtils.setOpacity(elt, op * 100);
			first = null;
			
			// Blocks tooltips on this element after single click
			sb.currentElt = elt;
		}
		catch (e)
		{
			ds.reset();
			sb.editorUi.handleError(e);
		}
	};
};

/**
 * Creates a drop handler for inserting the given cells.
 */
Sidebar.prototype.createVertexTemplateEntry = function(style, width, height, value, title, showLabel, showTitle, tags)
{
	if (tags != null && title != null)
	{
		tags += ' ' + title;
	}

	tags = (tags != null && tags.length > 0) ? tags : ((title != null) ? title.toLowerCase() : '');
	
	return this.addEntry(tags, mxUtils.bind(this, function()
 	{
 		return this.createVertexTemplate(style, width, height, value, title, showLabel, showTitle);
 	}));
}

/**
 * Creates a drop handler for inserting the given cells.
 */
Sidebar.prototype.createVertexTemplate = function(style, width, height, value, title, showLabel, showTitle,
	allowCellsInserted, showTooltip, clickFn, thumbWidth, thumbHeight, icon, startEditing)
{
	var cells = [new mxCell((value != null) ? value : '', new mxGeometry(0, 0, width, height), style)];
	cells[0].vertex = true;

	return this.createVertexTemplateFromCells(cells, width, height, title, showLabel, showTitle,
		allowCellsInserted, showTooltip, clickFn, thumbWidth, thumbHeight, icon, startEditing);
};

/**
 * Creates a drop handler for inserting the given cells.
 */
Sidebar.prototype.createVertexTemplateFromData = function(data, width, height, title, showLabel,
	showTitle, allowCellsInserted, showTooltip)
{
	var doc = mxUtils.parseXml(Graph.decompress(data));
	var codec = new mxCodec(doc);

	var model = new mxGraphModel();
	codec.decode(doc.documentElement, model);
	
	var cells = this.graph.cloneCells(model.root.getChildAt(0).children);

	return this.createVertexTemplateFromCells(cells, width, height, title, showLabel, showTitle,
		allowCellsInserted, showTooltip);
};

/**
 * Creates a drop handler for inserting the given cells.
 */
Sidebar.prototype.createVertexTemplateFromCells = function(cells, width, height, title, showLabel,
	showTitle, allowCellsInserted, showTooltip, clickFn, thumbWidth, thumbHeight, icon, startEditing,
	sourceCell)
{
	// Use this line to convert calls to this function with lots of boilerplate code for creating cells
	//console.trace('xml', Graph.compress(mxUtils.getXml(this.graph.encodeCells(cells))), cells);
	return this.createItem(cells, title, showLabel, showTitle, width, height, allowCellsInserted,
		showTooltip, clickFn, thumbWidth, thumbHeight, icon, startEditing, sourceCell);
};

/**
 * 
 */
Sidebar.prototype.createEdgeTemplateEntry = function(style, width, height, value, title, showLabel,
	tags, allowCellsInserted, showTooltip)
{
	tags = (tags != null && tags.length > 0) ? tags : title.toLowerCase();
	
 	return this.addEntry(tags, mxUtils.bind(this, function()
 	{
 		return this.createEdgeTemplate(style, width, height, value, title, showLabel, allowCellsInserted, showTooltip);
 	}));
};

/**
 * Creates a drop handler for inserting the given cells.
 */
Sidebar.prototype.createEdgeTemplate = function(style, width, height, value, title, showLabel,
	allowCellsInserted, showTooltip)
{
	var cell = new mxCell((value != null) ? value : '', new mxGeometry(0, 0, width, height), style);
	cell.geometry.setTerminalPoint(new mxPoint(0, height), true);
	cell.geometry.setTerminalPoint(new mxPoint(width, 0), false);
	cell.geometry.relative = true;
	cell.edge = true;
	
	return this.createEdgeTemplateFromCells([cell], width, height, title, showLabel, allowCellsInserted, showTooltip);
};

/**
 * Creates a drop handler for inserting the given cells.
 */
Sidebar.prototype.createEdgeTemplateFromCells = function(cells, width, height, title, showLabel,
	allowCellsInserted, showTooltip, showTitle, clickFn, thumbWidth, thumbHeight, icon)
{
	return this.createItem(cells, title, showLabel, (showTitle != null) ? showTitle : true, width, height,
		allowCellsInserted, showTooltip, clickFn, thumbWidth, thumbHeight, icon);
};

/**
 * Adds the given palette.
 */
Sidebar.prototype.addPaletteFunctions = function(id, title, expanded, fns)
{
	this.addPalette(id, title, expanded, mxUtils.bind(this, function(content)
	{
		for (var i = 0; i < fns.length; i++)
		{
			content.appendChild(fns[i](content));
		}
	}));
};

/**
 * Adds the given palette.
 */
Sidebar.prototype.addPalette = function(id, title, expanded, onInit)
{
	var elt = this.createTitle(title);
	this.appendChild(elt);
	
	var div = document.createElement('div');
	div.className = 'geSidebar';
	
	// Disables built-in pan and zoom on touch devices
	if (mxClient.IS_POINTER)
	{
		div.style.touchAction = 'none';
	}

	if (expanded)
	{
		onInit(div);
		onInit = null;
	}
	else
	{
		div.style.display = 'none';
	}
	
    this.addFoldingHandler(elt, div, onInit);
	
	var outer = document.createElement('div');
    outer.appendChild(div);
    this.appendChild(outer);
    
    // Keeps references to the DOM nodes
    if (id != null)
    {
    	this.palettes[id] = [elt, outer];
    }
    
    return div;
};

/**
 * Create the given title element.
 */
Sidebar.prototype.addFoldingHandler = function(title, content, funct)
{
	var initialized = false;

	// Avoids mixed content warning in IE6-8
	if (!mxClient.IS_IE || document.documentMode >= 8)
	{
		title.style.backgroundImage = (content.style.display == 'none') ?
			'url(\'' + this.collapsedImage + '\')' : 'url(\'' + this.expandedImage + '\')';
	}
	
	title.style.backgroundRepeat = 'no-repeat';
	title.style.backgroundPosition = '4px 50%';

	mxEvent.addListener(title, 'click', mxUtils.bind(this, function(evt)
	{
		if (mxEvent.getSource(evt) == title)
		{
			if (content.style.display == 'none')
			{
				if (!initialized)
				{
					initialized = true;
					
					if (funct != null)
					{
						// Wait cursor does not show up on Mac
						title.style.cursor = 'wait';

						// Captures child nodes
						var children = [];

						for (var i = 0; i < title.children.length; i++)
						{
							children.push(title.children[i]);
							title.removeChild(title.children[i]);
						}			

						var prev = title.innerHTML;
						title.innerHTML = mxResources.get('loading') + '...';
						
						window.setTimeout(mxUtils.bind(this, function()
						{
							this.setContentVisible(content, true);
							title.style.cursor = '';
							title.innerHTML = prev;

							// Restores child nodes
							for (var i = 0; i < children.length; i++)
							{
								title.appendChild(children[i]);
							}

							var fo = mxClient.NO_FO;
							mxClient.NO_FO = Editor.prototype.originalNoForeignObject;
							funct(content, title);
							mxClient.NO_FO = fo;
						}), (mxClient.IS_FF) ? 20 : 0);
					}
					else
					{
						this.setContentVisible(content, true);
					}
				}
				else
				{
					this.setContentVisible(content, true);
				}
				
				title.style.backgroundImage = 'url(\'' + this.expandedImage + '\')';
			}
			else
			{
				title.style.backgroundImage = 'url(\'' + this.collapsedImage + '\')';
				this.setContentVisible(content, false);
			}
			
			mxEvent.consume(evt);
		}
	}));
	
	// Prevents focus
	mxEvent.addListener(title, (mxClient.IS_POINTER) ? 'pointerdown' : 'mousedown',
		mxUtils.bind(this, function(evt)
	{
		evt.preventDefault();
	}));
};

/**
 * Removes the palette for the given ID.
 */
Sidebar.prototype.setContentVisible = function(content, visible)
{
	mxUtils.setPrefixedStyle(content.style, 'transition', 'all 0.2s linear');
	mxUtils.setPrefixedStyle(content.style, 'transform-origin', 'top left');

	if (visible)
	{
		mxUtils.setPrefixedStyle(content.style, 'transform', 'scaleY(0)');
		content.style.display = 'block';

		window.setTimeout(mxUtils.bind(this, function()
		{
			mxUtils.setPrefixedStyle(content.style, 'transform', 'scaleY(1)');

			window.setTimeout(mxUtils.bind(this, function()
			{
				mxUtils.setPrefixedStyle(content.style, 'transform', null);
				mxUtils.setPrefixedStyle(content.style, 'transition', null);
			}), 200);
		}), 0);
	}
	else
	{
		mxUtils.setPrefixedStyle(content.style, 'transform', 'scaleY(0)');

		window.setTimeout(mxUtils.bind(this, function()
		{
			mxUtils.setPrefixedStyle(content.style, 'transform', null);
			mxUtils.setPrefixedStyle(content.style, 'transition', null);
			content.style.display = 'none';
		}), 200);
	}
};

/**
 * Removes the palette for the given ID.
 */
Sidebar.prototype.removePalette = function(id)
{
	var elts = this.palettes[id];
	
	if (elts != null)
	{
		this.palettes[id] = null;
		
		for (var i = 0; i < elts.length; i++)
		{
			this.container.removeChild(elts[i]);
		}
		
		return true;
	}
	
	return false;
};

/**
 * Adds the given image palette.
 */
Sidebar.prototype.addImagePalette = function(id, title, prefix, postfix, items, titles, tags)
{
	var showTitles = titles != null;
	var fns = [];
	
	for (var i = 0; i < items.length; i++)
	{
		(mxUtils.bind(this, function(item, title, tmpTags)
		{
			if (tmpTags == null)
			{
				var slash = item.lastIndexOf('/');
				var dot = item.lastIndexOf('.');
				tmpTags = item.substring((slash >= 0) ? slash + 1 : 0, (dot >= 0) ? dot : item.length).replace(/[-_]/g, ' ');
			}
			
			fns.push(this.createVertexTemplateEntry('image;html=1;image=' + prefix + item + postfix,
				this.defaultImageWidth, this.defaultImageHeight, '', title, title != null, null, this.filterTags(tmpTags)));
		}))(items[i], (titles != null) ? titles[i] : null, (tags != null) ? tags[items[i]] : null);
	}

	this.addPaletteFunctions(id, title, false, fns);
};

/**
 * Creates the array of tags for the given stencil. Duplicates are allowed and will be filtered out later.
 */
Sidebar.prototype.getTagsForStencil = function(packageName, stencilName, moreTags)
{
	var tags = packageName.split('.');
	
	for (var i = 1; i < tags.length; i++)
	{
		tags[i] = tags[i].replace(/_/g, ' ')
	}
	
	tags.push(stencilName.replace(/_/g, ' '));
	
	if (moreTags != null)
	{
		tags.push(moreTags);
	}
	
	return tags.slice(1, tags.length);
};

/**
 * Adds the given stencil palette.
 */
Sidebar.prototype.addStencilPalette = function(id, title, stencilFile, style, ignore, onInit, scale, tags, customFns, groupId)
{
	scale = (scale != null) ? scale : 1;

	if (this.addStencilsToIndex)
	{
		// LATER: Handle asynchronous loading dependency
		var fns = [];
		
		if (customFns != null)
		{
			for (var i = 0; i < customFns.length; i++)
			{
				fns.push(customFns[i]);
			}
		}

		mxStencilRegistry.loadStencilSet(stencilFile, mxUtils.bind(this, function(packageName, stencilName, displayName, w, h)
		{
			if (ignore == null || mxUtils.indexOf(ignore, stencilName) < 0)
			{
				var tmp = this.getTagsForStencil(packageName, stencilName);
				var tmpTags = (tags != null) ? tags[stencilName] : null;

				if (tmpTags != null)
				{
					tmp.push(tmpTags);
				}
				
				fns.push(this.createVertexTemplateEntry('shape=' + packageName + stencilName.toLowerCase() + style,
					Math.round(w * scale), Math.round(h * scale), '', stencilName.replace(/_/g, ' '), null, null,
					this.filterTags(tmp.join(' '))));
			}
		}), true, true);
	
		this.addPaletteFunctions(id, title, false, fns);
	}
	else
	{
		this.addPalette(id, title, false, mxUtils.bind(this, function(content)
	    {
			if (style == null)
			{
				style = '';
			}
			
			if (onInit != null)
			{
				onInit.call(this, content);
			}
			
			if (customFns != null)
			{
				for (var i = 0; i < customFns.length; i++)
				{
					customFns[i](content);
				}
			}

			mxStencilRegistry.loadStencilSet(stencilFile, mxUtils.bind(this, function(packageName, stencilName, displayName, w, h)
			{
				if (ignore == null || mxUtils.indexOf(ignore, stencilName) < 0)
				{
					content.appendChild(this.createVertexTemplate('shape=' + packageName + stencilName.toLowerCase() + style,
						Math.round(w * scale), Math.round(h * scale), '', stencilName.replace(/_/g, ' '), true));
				}
			}), true);
	    }));
	}
};

/**
 * Adds the given stencil palette.
 */
Sidebar.prototype.destroy = function()
{
	if (this.graph != null)
	{
		if (this.graph.container != null && this.graph.container.parentNode != null)
		{
			this.graph.container.parentNode.removeChild(this.graph.container);
		}
		
		this.graph.destroy();
		this.graph = null;
	}
	
	if (this.pointerUpHandler != null)
	{
		mxEvent.removeListener(document, (mxClient.IS_POINTER) ? 'pointerup' : 'mouseup', this.pointerUpHandler);
		this.pointerUpHandler = null;
	}

	if (this.pointerDownHandler != null)
	{
		mxEvent.removeListener(document, (mxClient.IS_POINTER) ? 'pointerdown' : 'mousedown', this.pointerDownHandler);
		this.pointerDownHandler = null;
	}
	
	if (this.pointerMoveHandler != null)
	{
		mxEvent.removeListener(document, (mxClient.IS_POINTER) ? 'pointermove' : 'mousemove', this.pointerMoveHandler);
		this.pointerMoveHandler = null;
	}
	
	if (this.pointerOutHandler != null)
	{
		mxEvent.removeListener(document, (mxClient.IS_POINTER) ? 'pointerout' : 'mouseout', this.pointerOutHandler);
		this.pointerOutHandler = null;
	}
};
