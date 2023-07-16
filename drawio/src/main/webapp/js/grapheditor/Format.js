/**
 * Copyright (c) 2006-2012, JGraph Ltd
 */
Format = function(editorUi, container)
{
	this.editorUi = editorUi;
	this.container = container;
};

/**
 * Background color for inactive tabs.
 */
Format.inactiveTabBackgroundColor = '#e4e4e4';

/**
 * Icons for markers (24x16).
 */
Format.classicFilledMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 0 8 L 10 2 L 5 8 L 10 14 Z M 0 8 L 24 8" stroke="#404040" fill="#404040"/>', 32, 20);
Format.classicThinFilledMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 0 8 L 8 4 L 3 8 L 8 12 Z M 0 8 L 24 8" stroke="#404040" fill="#404040"/>', 32, 20);
Format.openFilledMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 8 0 L 0 8 L 8 16 M 0 8 L 24 8" stroke="#404040" fill="transparent"/>', 32, 20);
Format.openThinFilledMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 8 4 L 0 8 L 8 12 M 0 8 L 24 8" stroke="#404040" fill="transparent"/>', 32, 20);
Format.openAsyncFilledMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 8 4 L 0 8 L 24 8" stroke="#404040" fill="transparent"/>', 32, 20);
Format.blockFilledMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 0 8 L 8 2 L 8 14 Z M 0 8 L 24 8" stroke="#404040" fill="#404040"/>', 32, 20);
Format.blockThinFilledMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 0 8 L 8 4 L 8 12 Z M 0 8 L 24 8" stroke="#404040" fill="#404040"/>', 32, 20);
Format.asyncFilledMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 6 8 L 6 4 L 0 8 L 24 8" stroke="#404040" fill="#404040"/>', 32, 20);
Format.ovalFilledMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 0 8 A 5 5 0 0 1 5 3 A 5 5 0 0 1 11 8 A 5 5 0 0 1 5 13 A 5 5 0 0 1 0 8 Z M 10 8 L 24 8" stroke="#404040" fill="#404040"/>', 32, 20);
Format.diamondFilledMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 0 8 L 6 2 L 12 8 L 6 14 Z M 0 8 L 24 8" stroke="#404040" fill="#404040"/>', 32, 20);
Format.diamondThinFilledMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 0 8 L 8 3 L 16 8 L 8 13 Z M 0 8 L 24 8" stroke="#404040" fill="#404040"/>', 32, 20);
Format.classicMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 0 8 L 10 2 L 5 8 L 10 14 Z M 5 8 L 24 8" stroke="#404040" fill="transparent"/>', 32, 20);
Format.classicThinMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 0 8 L 8 4 L 5 8 L 8 12 Z M 5 8 L 24 8" stroke="#404040" fill="transparent"/>', 32, 20);
Format.blockMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 0 8 L 8 2 L 8 14 Z M 8 8 L 24 8" stroke="#404040" fill="transparent"/>', 32, 20);
Format.blockThinMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 0 8 L 8 4 L 8 12 Z M 8 8 L 24 8" stroke="#404040" fill="transparent"/>', 32, 20);
Format.asyncMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 6 8 L 6 4 L 0 8 L 24 8" stroke="#404040" fill="transparent"/>', 32, 20);
Format.ovalMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 0 8 A 5 5 0 0 1 5 3 A 5 5 0 0 1 11 8 A 5 5 0 0 1 5 13 A 5 5 0 0 1 0 8 Z M 10 8 L 24 8" stroke="#404040" fill="transparent"/>', 32, 20);
Format.diamondMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 0 8 L 6 2 L 12 8 L 6 14 Z M 12 8 L 24 8" stroke="#404040" fill="transparent"/>', 32, 20);
Format.diamondThinMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 0 8 L 8 3 L 16 8 L 8 13 Z M 16 8 L 24 8" stroke="#404040" fill="transparent"/>', 32, 20);
Format.boxMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 0 3 L 10 3 L 10 13 L 0 13 Z M 10 8 L 24 8" stroke="#404040" fill="transparent"/>', 32, 20);
Format.halfCircleMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 0 3 A 5 5 0 0 1 5 8 A 5 5 0 0 1 0 13 M 5 8 L 24 8" stroke="#404040" fill="transparent"/>', 32, 20);
Format.dashMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 0 2 L 12 14 M 0 8 L 24 8" stroke="#404040" fill="transparent"/>', 32, 20);
Format.crossMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 0 2 L 12 14 M 12 2 L 0 14 M 0 8 L 24 8" stroke="#404040" fill="transparent"/>', 32, 20);
Format.circlePlusMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 0 8 A 6 6 0 0 1 6 2 A 6 6 0 0 1 12 8 A 6 6 0 0 1 6 14 A 6 6 0 0 1 0 8 Z M 6 2 L 6 14 M 0 8 L 24 8" stroke="#404040" fill="transparent"/>', 32, 20);
Format.circleMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 0 8 A 6 6 0 0 1 6 2 A 6 6 0 0 1 12 8 A 6 6 0 0 1 6 14 A 6 6 0 0 1 0 8 Z M 12 8 L 24 8" stroke="#404040" fill="transparent"/>', 32, 20);
Format.ERmandOneMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 6 2 L 6 14 M 9 2 L 9 14 M 0 8 L 24 8" stroke="#404040" fill="transparent"/>', 32, 20);
Format.ERmanyMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 0 2 L 12 8 L 0 14 M 0 8 L 24 8" stroke="#404040" fill="transparent"/>', 32, 20);
Format.ERoneToManyMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 0 2 L 12 8 L 0 14 M 15 2 L 15 14 M 0 8 L 24 8" stroke="#404040" fill="transparent"/>', 32, 20);
Format.ERzeroToOneMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 8 8 A 5 5 0 0 1 13 3 A 5 5 0 0 1 18 8 A 5 5 0 0 1 13 13 A 5 5 0 0 1 8 8 Z M 0 8 L 8 8 M 18 8 L 24 8 M 4 3 L 4 13" stroke="#404040" fill="transparent"/>', 32, 20);
Format.ERzeroToManyMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 8 8 A 5 5 0 0 1 13 3 A 5 5 0 0 1 18 8 A 5 5 0 0 1 13 13 A 5 5 0 0 1 8 8 Z M 0 8 L 8 8 M 18 8 L 24 8 M 0 3 L 8 8 L 0 13" stroke="#404040" fill="transparent"/>', 32, 20);
Format.EROneMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 5 2 L 5 14 M 0 8 L 24 8" stroke="#404040" fill="transparent"/>', 32, 20);
Format.baseDashMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 0 2 L 0 14 M 0 8 L 24 8" stroke="#404040" fill="transparent"/>', 32, 20);
Format.doubleBlockMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 0 8 L 8 2 L 8 14 Z M 8 8 L 16 2 L 16 14 Z M 16 8 L 24 8" stroke="#404040" fill="transparent"/>', 32, 20);
Format.doubleBlockFilledMarkerImage = Graph.createSvgImage(20, 22, '<path transform="translate(4,2)" stroke-width="2" d="M 0 8 L 8 2 L 8 14 Z M 8 8 L 16 2 L 16 14 Z M 16 8 L 24 8" stroke="#404040" fill="#404040"/>', 32, 20);

/**
 * Adds a style change item to the given menu.
 */
Format.processMenuIcon = function(elt, transform)
{
	var imgs = elt.getElementsByTagName('img');

	if (imgs.length > 0)
	{
		imgs[0].className = 'geIcon geAdaptiveAsset';
		imgs[0].style.padding = '0px';
		imgs[0].style.margin = '0 0 0 2px';

		if (transform != null)
		{
			mxUtils.setPrefixedStyle(imgs[0].style, 'transform', transform);
		}
	}

	return elt;
};

/**
 * Returns information about the current selection.
 */
Format.prototype.labelIndex = 0;

/**
 * Returns information about the current selection.
 */
Format.prototype.diagramIndex = 0;

/**
 * Returns information about the current selection.
 */
Format.prototype.currentIndex = 0;

/**
 * Returns information about the current selection.
 */
Format.prototype.showCloseButton = true;

/**
 * Returns information about the current selection.
 */
Format.prototype.rounded = false;

/**
 * Returns information about the current selection.
 */
Format.prototype.curved = false;

/**
 * Adds the label menu items to the given menu and parent.
 */
Format.prototype.init = function()
{
	var ui = this.editorUi;
	var editor = ui.editor;
	var graph = editor.graph;
	
	this.update = mxUtils.bind(this, function(sender, evt)
	{
		this.refresh();
	});
	
	graph.getSelectionModel().addListener(mxEvent.CHANGE, this.update);
	graph.getModel().addListener(mxEvent.CHANGE, this.update);
	graph.addListener(mxEvent.EDITING_STARTED, this.update);
	graph.addListener(mxEvent.EDITING_STOPPED, this.update);
	graph.getView().addListener('unitChanged', this.update);
	editor.addListener('autosaveChanged', this.update);
	graph.addListener(mxEvent.ROOT, this.update);
	ui.addListener('styleChanged', this.update);
	ui.addListener('darkModeChanged', this.update);
	
	this.refresh();
};

/**
 * Adds the label menu items to the given menu and parent.
 */
Format.prototype.clear = function()
{
	this.container.innerText = '';
	
	// Destroy existing panels
	if (this.panels != null)
	{
		for (var i = 0; i < this.panels.length; i++)
		{
			this.panels[i].destroy();
		}
	}
	
	this.panels = [];
};

/**
 * Adds the label menu items to the given menu and parent.
 */
Format.prototype.refresh = function()
{
	if (this.pendingRefresh != null)
	{
		window.clearTimeout(this.pendingRefresh);
		this.pendingRefresh = null;
	}

	this.pendingRefresh = window.setTimeout(mxUtils.bind(this, function()
	{
		this.immediateRefresh();
	}));
};

/**
 * Adds the label menu items to the given menu and parent.
 */
Format.prototype.immediateRefresh = function()
{
	// Performance tweak: No refresh needed if not visible
	if (this.container.style.width == '0px')
	{
		return;
	}
	
	this.clear();
	var ui = this.editorUi;
	var graph = ui.editor.graph;
	
	var div = document.createElement('div');
	div.style.whiteSpace = 'nowrap';
	div.style.color = Editor.isDarkMode() ? '#8D8D8D' : '#616161';
	div.style.textAlign = 'left';
	div.style.cursor = 'default';
	
	var label = document.createElement('div');
	label.className = 'geFormatSection';
	label.style.textAlign = 'center';
	label.style.fontWeight = 'bold';
	label.style.paddingTop = '8px';
	label.style.fontSize = '13px';
	label.style.borderWidth = '0px 0px 1px 1px';
	label.style.borderStyle = 'solid';
	label.style.display = 'inline-block';
	label.style.height = '25px';
	label.style.overflow = 'hidden';
	label.style.width = '100%';
	this.container.appendChild(div);
	
	// Prevents text selection
    mxEvent.addListener(label, (mxClient.IS_POINTER) ? 'pointerdown' : 'mousedown',
        mxUtils.bind(this, function(evt)
	{
		evt.preventDefault();
	}));

	var ss = ui.getSelectionState();
	var containsLabel = ss.containsLabel;
	var currentLabel = null;
	var currentPanel = null;
	
	var addClickHandler = mxUtils.bind(this, function(elt, panel, index, lastEntry)
	{
		var clickHandler = mxUtils.bind(this, function(evt)
		{
			if (currentLabel != elt)
			{
				if (containsLabel)
				{
					this.labelIndex = index;
				}
				else if (graph.isSelectionEmpty())
				{
					this.diagramIndex = index;
				}
				else
				{
					this.currentIndex = index;
				}
				
				if (currentLabel != null)
				{
					currentLabel.style.backgroundColor = Format.inactiveTabBackgroundColor;
					currentLabel.style.borderBottomWidth = '1px';
				}

				currentLabel = elt;
				currentLabel.style.backgroundColor = '';
				currentLabel.style.borderBottomWidth = '0px';
				
				if (currentPanel != panel)
				{
					if (currentPanel != null)
					{
						currentPanel.style.display = 'none';
					}
					
					currentPanel = panel;
					currentPanel.style.display = '';
				}
			}
		});
		
		mxEvent.addListener(elt, 'click', clickHandler);
		
		// Prevents text selection
	    mxEvent.addListener(elt, (mxClient.IS_POINTER) ? 'pointerdown' : 'mousedown',
        	mxUtils.bind(this, function(evt)
    	{
			evt.preventDefault();
		}));
		
		if ((lastEntry && currentLabel == null) ||
			(index == ((containsLabel) ? this.labelIndex : ((graph.isSelectionEmpty()) ?
			this.diagramIndex : this.currentIndex))))
		{
			// Invokes handler directly as a workaround for no click on DIV in KHTML.
			clickHandler();
		}
	});
	
	var idx = 0;

	if (graph.isSelectionEmpty())
	{
		mxUtils.write(label, mxResources.get('diagram'));
		label.style.borderLeftWidth = '0px';

		div.appendChild(label);
		var diagramPanel = div.cloneNode(false);
		this.panels.push(new DiagramFormatPanel(this, ui, diagramPanel));
		this.container.appendChild(diagramPanel);
		
		if (Editor.styles != null)
		{
			diagramPanel.style.display = 'none';
			label.style.width = (this.showCloseButton) ? '106px' : '50%';
			label.style.cursor = 'pointer';
			label.style.backgroundColor = Format.inactiveTabBackgroundColor;
			
			var label2 = label.cloneNode(false);
			label2.style.borderLeftWidth = '1px';
			label2.style.borderRightWidth = '1px';
			label2.style.backgroundColor = Format.inactiveTabBackgroundColor;
			
			addClickHandler(label, diagramPanel, idx++);
			
			var stylePanel = div.cloneNode(false);
			stylePanel.style.display = 'none';
			mxUtils.write(label2, mxResources.get('style'));
			div.appendChild(label2);
			this.panels.push(new DiagramStylePanel(this, ui, stylePanel));
			this.container.appendChild(stylePanel);
			
			addClickHandler(label2, stylePanel, idx++);
		}
		
		// Adds button to hide the format panel since
		// people don't seem to find the toolbar button
		// and the menu item in the format menu
		if (this.showCloseButton)
		{
			var label2 = label.cloneNode(false);
			label2.style.borderLeftWidth = '1px';
			label2.style.borderRightWidth = '1px';
			label2.style.borderBottomWidth = '1px';
			label2.style.backgroundColor = Format.inactiveTabBackgroundColor;
			label2.style.position = 'absolute';
			label2.style.right = '0px';
			label2.style.top = '0px';
			label2.style.width = '25px';
			
			var img = document.createElement('img');
			img.setAttribute('border', '0');
			img.setAttribute('src', Dialog.prototype.closeImage);
			img.setAttribute('title', mxResources.get('hide'));
			img.style.position = 'absolute';
			img.style.display = 'block';
			img.style.right = '0px';
			img.style.top = '8px';
			img.style.cursor = 'pointer';
			img.style.marginTop = '1px';
			img.style.marginRight = '6px';
			img.style.border = '1px solid transparent';
			img.style.padding = '1px';
			img.style.opacity = 0.5;
			label2.appendChild(img)
			
			mxEvent.addListener(img, 'click', function()
			{
				ui.actions.get('format').funct();
			});
			
			div.appendChild(label2);
		}
	}
	else if (graph.isEditing())
	{
		mxUtils.write(label, mxResources.get('text'));
		div.appendChild(label);
		label.style.borderLeftStyle = 'none';
		this.panels.push(new TextFormatPanel(this, ui, div));
	}
	else
	{
		label.style.backgroundColor = Format.inactiveTabBackgroundColor;
		label.style.borderLeftWidth = '1px';
		label.style.cursor = 'pointer';
		label.style.width = ss.cells.length == 0 ? '100%' :
			(containsLabel ? '50%' : '33.3%');
		var label2 = label.cloneNode(false);
		var label3 = label2.cloneNode(false);

		// Workaround for ignored background in IE
		label2.style.backgroundColor = Format.inactiveTabBackgroundColor;
		label3.style.backgroundColor = Format.inactiveTabBackgroundColor;
		
		// Style
		if (containsLabel)
		{
			label2.style.borderLeftWidth = '0px';
		}
		else if (ss.cells.length > 0)
		{
			label.style.borderLeftWidth = '0px';
			mxUtils.write(label, mxResources.get('style'));
			div.appendChild(label);
			
			var stylePanel = div.cloneNode(false);
			stylePanel.style.display = 'none';
			this.panels.push(new StyleFormatPanel(this, ui, stylePanel));
			this.container.appendChild(stylePanel);

			addClickHandler(label, stylePanel, idx++);
		}
		
		// Text
		mxUtils.write(label2, mxResources.get('text'));
		div.appendChild(label2);

		var textPanel = div.cloneNode(false);
		textPanel.style.display = 'none';
		this.panels.push(new TextFormatPanel(this, ui, textPanel));
		this.container.appendChild(textPanel);
		
		// Arrange
		mxUtils.write(label3, mxResources.get('arrange'));
		div.appendChild(label3);

		var arrangePanel = div.cloneNode(false);
		arrangePanel.style.display = 'none';
		this.panels.push(new ArrangePanel(this, ui, arrangePanel));
		this.container.appendChild(arrangePanel);

		if (ss.cells.length > 0)
		{
			addClickHandler(label2, textPanel, idx + 1);
		}
		else
		{
			label2.style.display = 'none';
		}
		
		addClickHandler(label3, arrangePanel, idx++, true);
	}
};

/**
 * Base class for format panels.
 */
BaseFormatPanel = function(format, editorUi, container)
{
	this.format = format;
	this.editorUi = editorUi;
	this.container = container;
	this.listeners = [];
};

/**
 * 
 */
BaseFormatPanel.prototype.buttonBackgroundColor = 'transparent';

/**
 * Install input handler.
 */
BaseFormatPanel.prototype.installInputHandler = function(input, key, defaultValue, min, max, unit, textEditFallback, isFloat)
{
	unit = (unit != null) ? unit : '';
	isFloat = (isFloat != null) ? isFloat : false;
	
	var ui = this.editorUi;
	var graph = ui.editor.graph;
	
	min = (min != null) ? min : 1;
	max = (max != null) ? max : 999;
	
	var selState = null;
	var updating = false;
	
	var update = mxUtils.bind(this, function(evt)
	{
		var value = (isFloat) ? parseFloat(input.value) : parseInt(input.value);

		// Special case: angle mod 360
		if (!isNaN(value) && key == mxConstants.STYLE_ROTATION)
		{
			// Workaround for decimal rounding errors in floats is to
			// use integer and round all numbers to two decimal point
			value = mxUtils.mod(Math.round(value * 100), 36000) / 100;
		}
		
		value = Math.min(max, Math.max(min, (isNaN(value)) ? defaultValue : value));
		
		if (graph.cellEditor.isContentEditing() && textEditFallback)
		{
			if (!updating)
			{
				updating = true;
				
				if (selState != null)
				{
					graph.cellEditor.restoreSelection(selState);
					selState = null;
				}
				
				textEditFallback(value);
				input.value = value + unit;
	
				// Restore focus and selection in input
				updating = false;
			}
		}
		else if (value != mxUtils.getValue(ui.getSelectionState().style, key, defaultValue))
		{
			if (graph.isEditing())
			{
				graph.stopEditing(true);
			}
			
			graph.getModel().beginUpdate();
			try
			{
				var cells = ui.getSelectionState().cells;
				graph.setCellStyles(key, value, cells);

				// Handles special case for fontSize where HTML labels are parsed and updated
				if (key == mxConstants.STYLE_FONTSIZE)
				{
					graph.updateLabelElements(cells, function(elt)
					{
						elt.style.fontSize = value + 'px';
						elt.removeAttribute('size');
					});
				}
				
				for (var i = 0; i < cells.length; i++)
				{
					if (graph.model.getChildCount(cells[i]) == 0)
					{
						graph.autoSizeCell(cells[i], false);
					}
				}
				
				ui.fireEvent(new mxEventObject('styleChanged', 'keys', [key],
						'values', [value], 'cells', cells));
			}
			finally
			{
				graph.getModel().endUpdate();
			}
		}
		
		input.value = value + unit;
		mxEvent.consume(evt);
	});

	if (textEditFallback && graph.cellEditor.isContentEditing())
	{
		// KNOWN: Arrow up/down clear selection text in quirks/IE 8
		// Text size via arrow button limits to 16 in IE11. Why?
		mxEvent.addListener(input, 'mousedown', function()
		{
			if (document.activeElement == graph.cellEditor.textarea)
			{
				selState = graph.cellEditor.saveSelection();
			}
		});
		
		mxEvent.addListener(input, 'touchstart', function()
		{
			if (document.activeElement == graph.cellEditor.textarea)
			{
				selState = graph.cellEditor.saveSelection();
			}
		});
	}
	
	mxEvent.addListener(input, 'change', update);
	mxEvent.addListener(input, 'blur', update);
	
	return update;
};

/**
 * Adds the given option.
 */
BaseFormatPanel.prototype.createPanel = function()
{
	var div = document.createElement('div');
	div.className = 'geFormatSection';
	div.style.padding = '12px 0px 8px 14px';
	
	return div;
};

/**
 * Adds the given option.
 */
BaseFormatPanel.prototype.createTitle = function(title)
{
	var div = document.createElement('div');
	div.style.padding = '0px 0px 6px 0px';
	div.style.whiteSpace = 'nowrap';
	div.style.overflow = 'hidden';
	div.style.width = '200px';
	div.style.fontWeight = 'bold';
	mxUtils.write(div, title);
	
	return div;
};

/**
 * 
 */
BaseFormatPanel.prototype.addAction = function(div, name)
{
	var action = this.editorUi.actions.get(name);
	var btn = null;

	if (action != null && action.isEnabled())
	{
		btn = mxUtils.button(action.label, mxUtils.bind(this, function(evt)
		{
			try
			{
				action.funct(evt, evt);
			}
			catch (e)
			{
				this.editorUi.handleError(e);
			}
		}));
		
		var short = (action.shortcut != null) ? ' (' + action.shortcut + ')' : '';
		btn.setAttribute('title', action.label + short);
		btn.style.marginBottom = '2px';
		btn.style.width = '210px';
		div.appendChild(btn);
		result = true;
	}

	return btn;
};

/**
 * 
 */
BaseFormatPanel.prototype.addActions = function(div, names)
{
	var lastBr = null;
	var last = null;
	var count = 0;

	for (var i = 0; i < names.length; i++)
	{
		var btn = this.addAction(div, names[i]);

		if (btn != null)
		{
			count++;

			if (mxUtils.mod(count, 2) == 0)
			{
				last.style.marginRight = '2px';
				last.style.width = '104px';
				btn.style.width = '104px';
				lastBr.parentNode.removeChild(lastBr);
			}

			lastBr = mxUtils.br(div);
			last = btn;
		}
	}

	return count;
};

/**
 * 
 */
BaseFormatPanel.prototype.createStepper = function(input, update, step, height, disableFocus, defaultValue, isFloat)
{
	step = (step != null) ? step : 1;
	height = (height != null) ? height : 9;
	var bigStep = 10 * step;
	
	var stepper = document.createElement('div');
	stepper.className = 'geBtnStepper';
	stepper.style.position = 'absolute';
	
	var up = document.createElement('div');
	up.style.position = 'relative';
	up.style.height = height + 'px';
	up.style.width = '10px';
	up.className = 'geBtnUp';
	stepper.appendChild(up);
	
	var down = up.cloneNode(false);
	down.style.border = 'none';
	down.style.height = height + 'px';
	down.className = 'geBtnDown';
	stepper.appendChild(down);

	mxEvent.addGestureListeners(down, function(evt)
	{
		// Stops text selection on shift+click
		mxEvent.consume(evt);
	}, null, function(evt)
	{
		if (input.value == '')
		{
			input.value = defaultValue || '2';
		}
		
		var val = isFloat? parseFloat(input.value) : parseInt(input.value);
		
		if (!isNaN(val))
		{
			input.value = val - (mxEvent.isShiftDown(evt) ? bigStep : step);
			
			if (update != null)
			{
				update(evt);
			}
		}

		mxEvent.consume(evt);
	});
	
	mxEvent.addGestureListeners(up, function(evt)
	{
		// Stops text selection on shift+click
		mxEvent.consume(evt);
	}, null, function(evt)
	{
		if (input.value == '')
		{
			input.value = defaultValue || '0';
		}
		
		var val = isFloat? parseFloat(input.value) : parseInt(input.value);
		
		if (!isNaN(val))
		{
			input.value = val + (mxEvent.isShiftDown(evt) ? bigStep : step);
			
			if (update != null)
			{
				update(evt);
			}
		}

		mxEvent.consume(evt);
	});
	
	// Disables transfer of focus to DIV but also :active CSS
	// so it's only used for fontSize where the focus should
	// stay on the selected text, but not for any other input.
	if (disableFocus)
	{
		var currentSelection = null;
		
		mxEvent.addGestureListeners(stepper,
			function(evt)
			{
				mxEvent.consume(evt);
			},
			null,
			function(evt)
			{
				// Workaround for lost current selection in page because of focus in IE
				if (currentSelection != null)
				{
					try
					{
						currentSelection.select();
					}
					catch (e)
					{
						// ignore
					}
					
					currentSelection = null;
					mxEvent.consume(evt);
				}
			}
		);
	}
	else
	{
		// Stops propagation on checkbox labels
		mxEvent.addListener(stepper, 'click', function(evt)
		{
			mxEvent.consume(evt);
		});
	}
	
	return stepper;
};

/**
 * Adds the given option.
 */
BaseFormatPanel.prototype.createOption = function(label, isCheckedFn, setCheckedFn, listener, fn)
{
	var div = document.createElement('div');
	div.style.display = 'flex';
	div.style.alignItems = 'center';
	div.style.padding = '3px 0px 3px 0px';
	div.style.height = '18px';
	
	var cb = document.createElement('input');
	cb.setAttribute('type', 'checkbox');
	cb.style.margin = '1px 6px 0px 0px';
	cb.style.verticalAlign = 'top';
	div.appendChild(cb);

	var elt = document.createElement('div');
	elt.style.display = 'inline-block';
	elt.style.whiteSpace = 'nowrap';
	elt.style.textOverflow = 'ellipsis';
	elt.style.overflow = 'hidden';
	elt.style.maxWidth = '160px';
	elt.style.maxWidth = '160px';
	elt.style.userSelect = 'none';
	mxUtils.write(elt, label);
	div.appendChild(elt);

	var applying = false;
	var value = isCheckedFn();
	
	var apply = function(newValue, evt)
	{
		if (!applying)
		{
			applying = true;
			
			if (newValue)
			{
				cb.setAttribute('checked', 'checked');
				cb.defaultChecked = true;
				cb.checked = true;
			}
			else
			{
				cb.removeAttribute('checked');
				cb.defaultChecked = false;
				cb.checked = false;
			}
			
			if (value != newValue)
			{
				value = newValue;
				
				// Checks if the color value needs to be updated in the model
				if (isCheckedFn() != value)
				{
					setCheckedFn(value, evt);
				}
			}
			
			applying = false;
		}
	};

	mxEvent.addListener(div, 'click', function(evt)
	{
		if (cb.getAttribute('disabled') != 'disabled')
		{
			// Toggles checkbox state for click on label
			var source = mxEvent.getSource(evt);
			
			if (source == div || source == elt)
			{
				cb.checked = !cb.checked;
			}
			
			apply(cb.checked, evt);
		}
	});
	
	apply(value);
	
	if (listener != null)
	{
		listener.install(apply);
		this.listeners.push(listener);
	}
	
	if (fn != null)
	{
		fn(div);
	}

	return div;
};

/**
 * The string 'null' means use null in values.
 */
BaseFormatPanel.prototype.createCellOption = function(label, key, defaultValue, enabledValue, disabledValue, fn, action, stopEditing, cells)
{	
	var ui = this.editorUi;
	var editor = ui.editor;
	var graph = editor.graph;
	
	enabledValue = (enabledValue != null) ? ((enabledValue == 'null') ? null : enabledValue) : 1;
	disabledValue = (disabledValue != null) ? ((disabledValue == 'null') ? null : disabledValue) : 0;

	var style = (cells != null) ? graph.getCommonStyle(cells) : ui.getSelectionState().style;

	return this.createOption(label, function()
	{
		return mxUtils.getValue(style, key, defaultValue) != disabledValue;
	}, function(checked)
	{
		if (stopEditing)
		{
			graph.stopEditing();
		}
		
		if (action != null)
		{
			action.funct();
		}
		else
		{
			graph.getModel().beginUpdate();
			try
			{
				var temp = (cells != null) ? cells : ui.getSelectionState().cells;
				var value = (checked) ? enabledValue : disabledValue;
				graph.setCellStyles(key, value, temp);

				if (fn != null)
				{
					fn(temp, value);
				}
				
				ui.fireEvent(new mxEventObject('styleChanged', 'keys',
					[key], 'values', [value], 'cells', temp));
			}
			finally
			{
				graph.getModel().endUpdate();
			}
		}
	},
	{
		install: function(apply)
		{
			this.listener = function()
			{
				apply(mxUtils.getValue(style, key, defaultValue) != disabledValue);
			};
			
			graph.getModel().addListener(mxEvent.CHANGE, this.listener);
		},
		destroy: function()
		{
			graph.getModel().removeListener(this.listener);
		}
	});
};

/**
 * Adds the given color option.
 */
BaseFormatPanel.prototype.createColorOption = function(label, getColorFn, setColorFn,
	defaultColor, listener, callbackFn, hideCheckbox, defaultColorValue)
{
	var graph = this.editorUi.editor.graph;

	var div = document.createElement('div');
	div.style.padding = '3px 0px 3px 0px';
	div.style.whiteSpace = 'nowrap';
	div.style.overflow = 'hidden';
	div.style.width = '200px';
	div.style.height = '18px';
	
	var cb = document.createElement('input');
	cb.setAttribute('type', 'checkbox');
	cb.style.margin = '1px 6px 0px 0px';
	cb.style.verticalAlign = 'top';
	
	if (!hideCheckbox)
	{
		div.appendChild(cb);	
	}

	var span = document.createElement('span');
	span.style.verticalAlign = 'top';
	mxUtils.write(span, label);
	div.appendChild(span);

	var value = getColorFn();
	var applying = false;
	var dropper = null;
	var btn = null;

	var clrInput = document.createElement('input');
	clrInput.setAttribute('type', 'color');
	clrInput.style.position = 'relative';
	clrInput.style.visibility = 'hidden';
	clrInput.style.top = '10px';
	clrInput.style.width = '0px';
	clrInput.style.height = '0px';
	clrInput.style.border = 'none';

	// Adds native color dialog
	if (!mxClient.IS_IE && !mxClient.IS_IE11 && !mxClient.IS_TOUCH)
	{
		dropper = document.createElement('img');
		dropper.src = Editor.colorDropperImage;
		dropper.className = 'geColorDropper geAdaptiveAsset';
		dropper.style.position = 'relative';
		dropper.style.right = '-20px';
		dropper.style.top = '-1px';
		dropper.style.width = 'auto';
		dropper.style.height = '14px';

		mxEvent.addListener(dropper, 'click', function(evt)
		{
			var color = value;

			if (color == 'default')
			{
				color = defaultColorValue;
			}
		
			clrInput.value = color;
			clrInput.click();

			mxEvent.consume(evt);
		});
	}

	var apply = function(color, disableUpdate, forceUpdate)
	{
		if (!applying)
		{
			var defaultValue = (defaultColor == 'null') ? null : defaultColor;

			applying = true;
			color = (/(^#?[a-zA-Z0-9]*$)/.test(color)) ? color : defaultValue;
			var tempColor = (color != null && color != mxConstants.NONE) ? color : defaultValue;

			var div = document.createElement('div');
			div.style.width = '21px';
			div.style.height = '12px';
			div.style.margin = '2px 18px 2px 3px';
			div.style.border = '1px solid black';
			div.style.backgroundColor = (tempColor == 'default') ? defaultColorValue : tempColor;
			btn.innerText = '';
			btn.appendChild(div);

			if (dropper != null)
			{
				div.style.width = '21px';
				div.style.margin = '2px 18px 2px 3px';
				div.appendChild(dropper);
			}
			else
			{
				div.style.width = '36px';
				div.style.margin = '3px';
			}

			if (color != null && color != mxConstants.NONE && color.length > 1 && typeof color === 'string')
			{
				var clr = (color.charAt(0) == '#') ? color.substring(1).toUpperCase() : color;
				var name = ColorDialog.prototype.colorNames[clr];

				if (name != null)
				{
					btn.setAttribute('title', name);
				}
			}

			if (color != null && color != mxConstants.NONE &&
				!graph.isSpecialColor(color))
			{
				cb.setAttribute('checked', 'checked');
				cb.defaultChecked = true;
				cb.checked = true;
			}
			else
			{
				cb.removeAttribute('checked');
				cb.defaultChecked = false;
				cb.checked = false;
			}
	
			btn.style.display = (cb.checked || hideCheckbox) ? '' : 'none';

			if (callbackFn != null)
			{
				callbackFn(color == 'null' ? null : color);
			}

			value = color;

			if (!disableUpdate)
			{
				// Checks if the color value needs to be updated in the model
				if (forceUpdate || hideCheckbox || getColorFn() != value)
				{
					setColorFn(value == 'null' ? null : value, value);
				}
			}
			
			applying = false;
		}
	};
	
	div.appendChild(clrInput);

	mxEvent.addListener(clrInput, 'change', function()
	{
		apply(clrInput.value, null, true);
	});

	btn = mxUtils.button('', mxUtils.bind(this, function(evt)
	{
		var color = value;

		if (color == 'default')
		{
			color = defaultColorValue;
		}
		
		this.editorUi.pickColor(color, function(newColor)
		{
			apply(newColor, null, true);
		}, defaultColorValue);

		mxEvent.consume(evt);
	}));
	
	btn.style.position = 'absolute';
	btn.style.marginTop = '-3px';
	btn.style.left = '178px';
	btn.style.height = '22px';
	btn.className = 'geColorBtn';
	btn.style.display = (cb.checked || hideCheckbox) ? '' : 'none';
	div.appendChild(btn);

	var clr = (value != null && typeof value === 'string' && value.charAt(0) == '#') ? value.substring(1).toUpperCase() : value;
	var name = ColorDialog.prototype.colorNames[clr];

	if (name != null)
	{
		btn.setAttribute('title', name);
	}

	mxEvent.addListener(div, 'click', function(evt)
	{
		var source = mxEvent.getSource(evt);
		
		if (source == cb || source.nodeName != 'INPUT')
		{		
			// Toggles checkbox state for click on label
			if (source != cb)
			{
				cb.checked = !cb.checked;
			}
	
			// Overrides default value with current value to make it easier
			// to restore previous value if the checkbox is clicked twice
			if (!cb.checked && value != null && value != mxConstants.NONE &&
				defaultColor != mxConstants.NONE)
			{
				defaultColor = value;
			}
			
			apply((cb.checked) ? defaultColor : mxConstants.NONE);
		}
	});
	
	apply(value, true);
	
	if (listener != null)
	{
		listener.install(apply);
		this.listeners.push(listener);
	}
	
	return div;
};

/**
 * 
 */
BaseFormatPanel.prototype.createCellColorOption = function(label, colorKey, defaultColor, callbackFn, setStyleFn, defaultColorValue)
{
	var ui = this.editorUi;
	var editor = ui.editor;
	var graph = editor.graph;
	
	return this.createColorOption(label, function()
	{
		// Seems to be null sometimes, not sure why...
		var state = graph.view.getState(ui.getSelectionState().cells[0]);
		
		if (state != null)
		{
			return mxUtils.getValue(state.style, colorKey, null);
		}
		
		return null;
	}, function(color)
	{
		graph.getModel().beginUpdate();
		try
		{
			var cells = ui.getSelectionState().cells;
			graph.setCellStyles(colorKey, color, cells);

			if (setStyleFn != null)
			{
				setStyleFn(color);
			}
			
			ui.fireEvent(new mxEventObject('styleChanged', 'keys', [colorKey],
				'values', [color], 'cells', cells));
		}
		finally
		{
			graph.getModel().endUpdate();
		}
	}, defaultColor || mxConstants.NONE,
	{
		install: function(apply)
		{
			this.listener = function()
			{
				// Seems to be null sometimes, not sure why...
				var state = graph.view.getState(ui.getSelectionState().cells[0]);
				
				if (state != null)
				{
					apply(mxUtils.getValue(state.style, colorKey, null), true);
				}
			};
			
			graph.getModel().addListener(mxEvent.CHANGE, this.listener);
		},
		destroy: function()
		{
			graph.getModel().removeListener(this.listener);
		}
	}, callbackFn, null, defaultColorValue);
};

/**
 * 
 */
BaseFormatPanel.prototype.addArrow = function(elt)
{
	elt.className = 'geColorBtn';
	elt.style.display = 'inline-flex';
	elt.style.alignItems = 'top';
	elt.style.boxSizing = 'border-box';
	elt.style.width = '64px';
	elt.style.height = '22px';
	elt.style.borderWidth = '1px';
	elt.style.borderStyle = 'solid';
	elt.style.margin = '2px 2px 2px 3px';

	var arrow = document.createElement('div');
	arrow.className = 'geAdaptiveAsset';
	arrow.style.display = 'inline-block';
	arrow.style.backgroundImage = 'url(' + Editor.thinExpandImage + ')';
	arrow.style.backgroundRepeat = 'no-repeat';
	arrow.style.backgroundPosition = '-2px 1px';
	arrow.style.backgroundSize = '18px 18px';
	arrow.style.opacity = '0.5';
	arrow.style.height = '100%';
	arrow.style.width = '14px';
	
	elt.appendChild(arrow);

	var symbol = elt.getElementsByTagName('div')[0];
	
	if (symbol != null)
	{
		symbol.style.display = 'inline-block';
		symbol.style.backgroundPositionX = 'center';
		symbol.style.textAlign = 'center';
		symbol.style.height = '100%';
		symbol.style.flexGrow = '1';
		symbol.style.opacity = '0.6';
	}

	return symbol;
};

/**
 * 
 */
BaseFormatPanel.prototype.addUnitInput = function(container, unit, right, width, update, step, marginTop, disableFocus, isFloat)
{
	marginTop = (marginTop != null) ? marginTop : 0;
	
	var input = document.createElement('input');
	input.style.position = 'absolute';
	input.style.textAlign = 'right';
	input.style.marginTop = '-2px';
	input.style.left = (228 - right - width) + 'px';
	input.style.width = width + 'px';
	input.style.height = '21px';
	input.style.borderWidth = '1px';
	input.style.borderStyle = 'solid';
	input.style.boxSizing = 'border-box';

	container.appendChild(input);
	
	var stepper = this.createStepper(input, update, step, null, disableFocus, null, isFloat);
	stepper.style.marginTop = (marginTop - 2) + 'px';
	stepper.style.left = (228 - right) + 'px';
	container.appendChild(stepper);

	return input;
};

/**
 * 
 */
BaseFormatPanel.prototype.addGenericInput = function(container, unit, left, width, readFn, writeFn)
{
	var graph = this.editorUi.editor.graph;

	var update = function()
	{
		writeFn(input.value);
	};

	var input = this.addUnitInput(container, unit, left, width, update);

	var listener = mxUtils.bind(this, function(sender, evt, force)
	{
		if (force || input != document.activeElement)
		{
			input.value = readFn() + unit;
		}
	});
	
	mxEvent.addListener(input, 'keydown', function(e)
	{
		if (e.keyCode == 13)
		{
			graph.container.focus();
			mxEvent.consume(e);
		}
		else if (e.keyCode == 27)
		{
			listener(null, null, true);
			graph.container.focus();
			mxEvent.consume(e);
		}
	});
	
	graph.getModel().addListener(mxEvent.CHANGE, listener);
	this.listeners.push({destroy: function() { graph.getModel().removeListener(listener); }});
	listener();

	mxEvent.addListener(input, 'blur', update);
	mxEvent.addListener(input, 'change', update);

	return input;
};

/**
 * 
 */
BaseFormatPanel.prototype.createRelativeOption = function(label, key, width, handler, init)
{
	width = (width != null) ? width : 52;
	
	var ui = this.editorUi;
	var graph = ui.editor.graph;
	var div = this.createPanel();
	div.style.paddingTop = '10px';
	div.style.paddingBottom = '12px';
	mxUtils.write(div, label);
	div.style.fontWeight = 'bold';
	
	var update = mxUtils.bind(this, function(evt)
	{
		if (handler != null)
		{
			handler(input);
		}
		else
		{
			var value = parseInt(input.value);
			value = Math.min(100, Math.max(0, (isNaN(value)) ? 100 : value));
			var state = graph.view.getState(ui.getSelectionState().cells[0]);
			
			if (state != null && value != mxUtils.getValue(state.style, key, 100))
			{
				// Removes entry in style (assumes 100 is default for relative values)
				if (value == 100)
				{
					value = null;
				}
				
				var cells = ui.getSelectionState().cells;
				graph.setCellStyles(key, value, cells);
				this.editorUi.fireEvent(new mxEventObject('styleChanged', 'keys', [key],
					'values', [value], 'cells', cells));
			}
	
			input.value = ((value != null) ? value : '100') + ' %';
		}
		
		mxEvent.consume(evt);
	});

	var input = this.addUnitInput(div, '%', 16, width, update, 10,
		(mxClient.IS_MAC && mxClient.IS_GC) ? -14 :
		((mxClient.IS_WIN) ? -16 : -15), handler != null);

	if (key != null)
	{
		var listener = mxUtils.bind(this, function(sender, evt, force)
		{
			if (force || input != document.activeElement)
			{
				var ss = ui.getSelectionState();
				var tmp = parseInt(mxUtils.getValue(ss.style, key, 100));
				input.value = (isNaN(tmp)) ? '' : tmp + ' %';
			}
		});
		
		mxEvent.addListener(input, 'keydown', function(e)
		{
			if (e.keyCode == 13)
			{
				graph.container.focus();
				mxEvent.consume(e);
			}
			else if (e.keyCode == 27)
			{
				listener(null, null, true);
				graph.container.focus();
				mxEvent.consume(e);
			}
		});
		
		graph.getModel().addListener(mxEvent.CHANGE, listener);
		this.listeners.push({destroy: function() { graph.getModel().removeListener(listener); }});
		listener();
	}

	mxEvent.addListener(input, 'blur', update);
	mxEvent.addListener(input, 'change', update);
	
	if (init != null)
	{
		init(input);
	}

	return div;
};

/**
 * 
 */
BaseFormatPanel.prototype.addLabel = function(div, title, right, width)
{
	width = (width != null) ? width : 61;
	
	var label = document.createElement('div');
	mxUtils.write(label, title);
	label.style.position = 'absolute';
	label.style.left = (240 - right - width) + 'px';
	label.style.width = width + 'px';
	label.style.marginTop = '6px';
	label.style.display = 'flex';
	label.style.justifyContent = 'center';
	div.appendChild(label);

	return label;
};

/**
 * 
 */
BaseFormatPanel.prototype.addKeyHandler = function(input, listener)
{
	mxEvent.addListener(input, 'keydown', mxUtils.bind(this, function(e)
	{
		if (e.keyCode == 13)
		{
			this.editorUi.editor.graph.container.focus();
			mxEvent.consume(e);
		}
		else if (e.keyCode == 27)
		{
			if (listener != null)
			{
				listener(null, null, true);				
			}

			this.editorUi.editor.graph.container.focus();
			mxEvent.consume(e);
		}
	}));
};

/**
 * 
 */
BaseFormatPanel.prototype.styleButtons = function(elts)
{
	for (var i = 0; i < elts.length; i++)
	{
		mxUtils.setPrefixedStyle(elts[i].style, 'borderRadius', '3px');
		mxUtils.setOpacity(elts[i], 100);
		elts[i].style.border = '1px solid #a0a0a0';
		elts[i].style.padding = '4px';
		elts[i].style.paddingTop = '3px';
		elts[i].style.paddingRight = '1px';
		elts[i].style.margin = '1px';
		elts[i].style.marginRight = '2px';
		elts[i].style.width = '24px';
		elts[i].style.height = '20px';
		elts[i].className += ' geColorBtn';
	}
};

/**
 * Adds the label menu items to the given menu and parent.
 */
BaseFormatPanel.prototype.destroy = function()
{
	if (this.listeners != null)
	{
		for (var i = 0; i < this.listeners.length; i++)
		{
			this.listeners[i].destroy();
		}
		
		this.listeners = null;
	}
};

/**
 * Adds the label menu items to the given menu and parent.
 */
ArrangePanel = function(format, editorUi, container)
{
	BaseFormatPanel.call(this, format, editorUi, container);
	this.init();
};

mxUtils.extend(ArrangePanel, BaseFormatPanel);

/**
 * Adds the label menu items to the given menu and parent.
 */
ArrangePanel.prototype.init = function()
{
	var ss = this.editorUi.getSelectionState();

	if (ss.cells.length > 0)
	{
		this.container.appendChild(this.addLayerOps(this.createPanel()));
		
		// Special case that adds two panels
		this.addGeometry(this.container);
		this.addEdgeGeometry(this.container);
	
		if (!ss.containsLabel || ss.edges.length == 0)
		{
			this.container.appendChild(this.addAngle(this.createPanel()));
		}
		
		if (!ss.containsLabel)
		{
			this.container.appendChild(this.addFlip(this.createPanel()));
		}

		this.container.appendChild(this.addAlign(this.createPanel()));
		
		if (ss.vertices.length > 1 && !ss.cell && !ss.row)
		{
			this.container.appendChild(this.addDistribute(this.createPanel()));
		}

		this.container.appendChild(this.addTable(this.createPanel()));
	}
	
	// Allows to lock/unload button to be added
	this.container.appendChild(this.addGroupOps(this.createPanel()));

	if (ss.containsLabel)
	{
		// Adds functions from hidden style format panel
		var span = document.createElement('div');
		span.style.width = '100%';
		span.style.marginTop = '0px';
		span.style.fontWeight = 'bold';
		span.style.padding = '10px 0 0 14px';
		mxUtils.write(span, mxResources.get('style'));
		this.container.appendChild(span);
			
		new StyleFormatPanel(this.format, this.editorUi, this.container);
	}
};

/**
 * 
 */
ArrangePanel.prototype.addTable = function(div)
{
	var ui = this.editorUi;
	var editor = ui.editor;
	var graph = editor.graph;
	var ss = ui.getSelectionState();
	div.style.paddingTop = '6px';
	div.style.paddingBottom = '10px';

	var span = document.createElement('div');
	span.style.marginTop = '0px';
	span.style.marginBottom = '6px';
	span.style.fontWeight = 'bold';
	mxUtils.write(span, mxResources.get('table'));
	div.appendChild(span);
	
	var panel = document.createElement('div');
	panel.style.position = 'relative';
	panel.style.paddingLeft = '0px';
	panel.style.borderWidth = '0px';
	panel.style.width = '220px';
	panel.className = 'geToolbarContainer';

	var cell = ss.vertices[0];

	if (graph.getSelectionCount() > 1)
	{
		if (graph.isTableCell(cell))
		{
			cell = graph.model.getParent(cell);
		}

		if (graph.isTableRow(cell))
		{
			cell = graph.model.getParent(cell);
		}
	}

	var isTable = ss.table || ss.row || ss.cell;
	var isStack = graph.isStack(cell) ||
		graph.isStackChild(cell);

	var showCols = isTable;
	var showRows = isTable;

	if (isStack)
	{
		var style = (graph.isStack(cell)) ? ss.style :
			graph.getCellStyle(graph.model.getParent(cell));

		showRows = style['horizontalStack'] == '0';
		showCols = !showRows;
	}

	var btns = [];

	if (showCols)
	{
		btns = btns.concat([
			ui.toolbar.addButton('geSprite-insertcolumnbefore', mxResources.get('insertColumnBefore'),
			mxUtils.bind(this, function()
			{
				try
				{
					if (isStack)
					{
						graph.insertLane(cell, true);
					}
					else
					{
						graph.insertTableColumn(cell, true);
					}
				}
				catch (e)
				{
					ui.handleError(e);
				}
			}), panel),
			ui.toolbar.addButton('geSprite-insertcolumnafter', mxResources.get('insertColumnAfter'),
			mxUtils.bind(this, function()
			{
				try
				{
					if (isStack)
					{
						graph.insertLane(cell, false);
					}
					else
					{
						graph.insertTableColumn(cell, false);
					}
				}
				catch (e)
				{
					ui.handleError(e);
				}
			}), panel),
			ui.toolbar.addButton('geSprite-deletecolumn', mxResources.get('deleteColumn'),
			mxUtils.bind(this, function()
			{
				try
				{
					if (isStack)
					{
						graph.deleteLane(cell);
					}
					else
					{
						graph.deleteTableColumn(cell);
					}
				}
				catch (e)
				{
					ui.handleError(e);
				}
			}), panel)]);
	}

	if (showRows)
	{
		btns = btns.concat([ui.toolbar.addButton('geSprite-insertrowbefore', mxResources.get('insertRowBefore'),
			mxUtils.bind(this, function()
			{
				try
				{
					if (isStack)
					{
						graph.insertLane(cell, true);
					}
					else
					{
						graph.insertTableRow(cell, true);
					}
				}
				catch (e)
				{
					ui.handleError(e);
				}
			}), panel),
			ui.toolbar.addButton('geSprite-insertrowafter', mxResources.get('insertRowAfter'),
			mxUtils.bind(this, function()
			{
				try
				{
					if (isStack)
					{
						graph.insertLane(cell, false);
					}
					else
					{
						graph.insertTableRow(cell, false);
					}
				}
				catch (e)
				{
					ui.handleError(e);
				}
			}), panel),
			ui.toolbar.addButton('geSprite-deleterow', mxResources.get('deleteRow'),
			mxUtils.bind(this, function()
			{
				try
				{
					if (isStack)
					{
						graph.deleteLane(cell);
					}
					else
					{
						graph.deleteTableRow(cell);
					}
				}
				catch (e)
				{
					ui.handleError(e);
				}
			}), panel)]);
	}

	if (btns.length > 0)
	{
		this.styleButtons(btns);
		div.appendChild(panel);

		if (btns.length > 3)
		{
			btns[2].style.marginRight = '10px';
		}

		var count = 0;

		if (ss.mergeCell != null)
		{
			count += this.addActions(div, ['mergeCells']);
		}
		else if (ss.style['colspan'] > 1 || ss.style['rowspan'] > 1)
		{
			count += this.addActions(div, ['unmergeCells']);
		}

		if (count > 0)
		{
			panel.style.paddingBottom = '2px';
		}
	}
	else
	{
		div.style.display = 'none';
	}
	
	return div;
};

/**
 * 
 */
ArrangePanel.prototype.addLayerOps = function(div)
{
	this.addActions(div, ['toFront', 'toBack']);
	this.addActions(div, ['bringForward', 'sendBackward']);
	
	return div;
};

/**
 * 
 */
ArrangePanel.prototype.addGroupOps = function(div)
{
	var ui = this.editorUi;
	var ss = ui.getSelectionState();
	
	div.style.paddingTop = '8px';
	div.style.paddingBottom = '6px';

	var count = 0;
	
	if (!ss.cell && !ss.row)
	{
		count += this.addActions(div, ['group', 'ungroup',
			'copySize', 'pasteSize', 'swap']) +
			this.addActions(div, ['removeFromGroup']);
	}

	var clearWaypoints = this.addAction(div, 'clearWaypoints');

	if (clearWaypoints != null)
	{
		mxUtils.br(div);
		clearWaypoints.setAttribute('title', mxResources.get('clearWaypoints') +
			' (' + this.editorUi.actions.get('clearWaypoints').shortcut + ')' +
			' Shift+Click to Clear Anchor Points');
		count++;
	}

	count += this.addActions(div, ['lockUnlock']);

	if (count == 0)
	{
		div.style.display = 'none';
	}
	
	return div;
};

/**
 * 
 */
ArrangePanel.prototype.addAlign = function(div)
{
	var ss = this.editorUi.getSelectionState();
	var graph = this.editorUi.editor.graph;
	div.style.paddingTop = '6px';
	div.style.paddingBottom = '8px';
	div.appendChild(this.createTitle(mxResources.get('align')));
	
	var stylePanel = document.createElement('div');
	stylePanel.style.position = 'relative';
	stylePanel.style.whiteSpace = 'nowrap';
	stylePanel.style.paddingLeft = '0px';
	stylePanel.style.paddingBottom = '2px';
	stylePanel.style.borderWidth = '0px';
	stylePanel.style.width = '220px';
	stylePanel.className = 'geToolbarContainer';

	if (ss.vertices.length > 1)
	{
		var left = this.editorUi.toolbar.addButton('geSprite-alignleft', mxResources.get('left'),
			function() { graph.alignCells(mxConstants.ALIGN_LEFT); }, stylePanel);
		var center = this.editorUi.toolbar.addButton('geSprite-aligncenter', mxResources.get('center'),
			function() { graph.alignCells(mxConstants.ALIGN_CENTER); }, stylePanel);
		var right = this.editorUi.toolbar.addButton('geSprite-alignright', mxResources.get('right'),
			function() { graph.alignCells(mxConstants.ALIGN_RIGHT); }, stylePanel);

		var top = this.editorUi.toolbar.addButton('geSprite-aligntop', mxResources.get('top'),
			function() { graph.alignCells(mxConstants.ALIGN_TOP); }, stylePanel);
		var middle = this.editorUi.toolbar.addButton('geSprite-alignmiddle', mxResources.get('middle'),
			function() { graph.alignCells(mxConstants.ALIGN_MIDDLE); }, stylePanel);
		var bottom = this.editorUi.toolbar.addButton('geSprite-alignbottom', mxResources.get('bottom'),
			function() { graph.alignCells(mxConstants.ALIGN_BOTTOM); }, stylePanel);
		
		this.styleButtons([left, center, right, top, middle, bottom]);
			right.style.marginRight = '10px';
	}

	div.appendChild(stylePanel);
	this.addActions(div, ['snapToGrid']);
	
	return div;
};

/**
 * 
 */
ArrangePanel.prototype.addFlip = function(div)
{
	var ui = this.editorUi;
	var editor = ui.editor;
	var graph = editor.graph;
	div.style.paddingTop = '6px';
	div.style.paddingBottom = '10px';
	var ss = this.editorUi.getSelectionState();

	var span = document.createElement('div');
	span.style.marginTop = '2px';
	span.style.marginBottom = '8px';
	span.style.fontWeight = 'bold';
	mxUtils.write(span, mxResources.get('flip'));
	div.appendChild(span);
	
	var btn = mxUtils.button(mxResources.get('horizontal'), function(evt)
	{
		graph.flipCells(ss.cells, true);
	})
	
	btn.setAttribute('title', mxResources.get('horizontal'));
	btn.style.width = '104px';
	btn.style.marginRight = '2px';
	div.appendChild(btn);
	
	var btn = mxUtils.button(mxResources.get('vertical'), function(evt)
	{
		graph.flipCells(ss.cells, false);
	})
	
	btn.setAttribute('title', mxResources.get('vertical'));
	btn.style.width = '104px';
	div.appendChild(btn);
	
	return div;
};

/**
 * 
 */
ArrangePanel.prototype.addDistribute = function(div)
{
	var ui = this.editorUi;
	var editor = ui.editor;
	var graph = editor.graph;
	div.style.paddingTop = '6px';
	div.style.paddingBottom = '8px';
	
	div.appendChild(this.createTitle(mxResources.get('distribute')));

	var btn = mxUtils.button(mxResources.get('horizontal'), function(evt)
	{
		graph.distributeCells(true, null, cb.checked);
	})
	
	btn.setAttribute('title', mxResources.get('horizontal'));
	btn.style.width = '104px';
	btn.style.marginRight = '2px';
	div.appendChild(btn);
	
	var btn = mxUtils.button(mxResources.get('vertical'), function(evt)
	{
		graph.distributeCells(false, null, cb.checked);
	})
	
	btn.setAttribute('title', mxResources.get('vertical'));
	btn.style.width = '104px';
	div.appendChild(btn);
	
	mxUtils.br(div);

	var panel = document.createElement('div');
	panel.style.margin = '6px 0 0 0';
	panel.style.display = 'flex';
	panel.style.justifyContent = 'center';
	panel.style.alignItems = 'center';

	var cb = document.createElement('input');
	cb.setAttribute('type', 'checkbox');
	cb.setAttribute('id', 'spacingCheckbox');
	cb.style.margin = '0 6px 0 0';
	panel.appendChild(cb);

	var label = document.createElement('label');
	label.style.verticalAlign = 'top';
	label.setAttribute('for', 'spacingCheckbox');
	label.style.userSelect = 'none';
	mxUtils.write(label, mxResources.get('spacing'));
	panel.appendChild(label);
	div.appendChild(panel);

	return div;
};

/**
 * 
 */
ArrangePanel.prototype.addAngle = function(div)
{
	var ui = this.editorUi;
	var editor = ui.editor;
	var graph = editor.graph;
	var ss = ui.getSelectionState();

	div.style.paddingBottom = '12px';
	
	var span = document.createElement('div');
	span.style.position = 'absolute';
	span.style.width = '70px';
	span.style.marginTop = '0px';
	span.style.fontWeight = 'bold';
	
	var input = null;
	var update = null;
	var btn = null;
	
	if (ss.rotatable && !ss.table && !ss.row && !ss.cell)
	{
		mxUtils.write(span, mxResources.get('angle'));
		div.appendChild(span);
		
		input = this.addUnitInput(div, '°', 16, 52, function()
		{
			update.apply(this, arguments);
		});
		
		mxUtils.br(div);
		div.style.paddingTop = '10px';
	}
	else
	{
		div.style.paddingTop = '8px';
	}

	if (!ss.containsLabel)
	{
		var label = mxResources.get('reverse');
		
		if (ss.vertices.length > 0 && ss.edges.length > 0)
		{
			label = mxResources.get('turn') + ' / ' + label;
		}
		else if (ss.vertices.length > 0)
		{
			label = mxResources.get('turn');
		}

		btn = mxUtils.button(label, function(evt)
		{
			ui.actions.get('turn').funct(evt);
		})
		
		btn.setAttribute('title', label + ' (' + this.editorUi.actions.get('turn').shortcut + ')');
		btn.style.width = '210px';
		div.appendChild(btn);
		
		if (input != null)
		{
			btn.style.marginTop = '8px';
		}
	}
	
	if (input != null)
	{
		var listener = mxUtils.bind(this, function(sender, evt, force)
		{
			if (force || document.activeElement != input)
			{
				ss = ui.getSelectionState();
				var tmp = parseFloat(mxUtils.getValue(ss.style, mxConstants.STYLE_ROTATION, 0));
				input.value = (isNaN(tmp)) ? '' : tmp  + '°';
			}
		});
	
		update = this.installInputHandler(input, mxConstants.STYLE_ROTATION, 0, 0, 360, '°', null, true);
		this.addKeyHandler(input, listener);
	
		graph.getModel().addListener(mxEvent.CHANGE, listener);
		this.listeners.push({destroy: function() { graph.getModel().removeListener(listener); }});
		listener();
	}

	return div;
};

BaseFormatPanel.prototype.getUnit = function()
{
	var unit = this.editorUi.editor.graph.view.unit;
	
	switch(unit)
	{
		case mxConstants.POINTS:
			return 'pt';
		case mxConstants.INCHES:
			return '"';
		case mxConstants.MILLIMETERS:
			return 'mm';
		case mxConstants.METERS:
			return 'm';
	}
};

BaseFormatPanel.prototype.inUnit = function(pixels)
{
	return this.editorUi.editor.graph.view.formatUnitText(pixels);
};

BaseFormatPanel.prototype.fromUnit = function(value)
{
	var unit = this.editorUi.editor.graph.view.unit;
	
	switch(unit)
	{
		case mxConstants.POINTS:
			return value;
		case mxConstants.INCHES:
			return value * mxConstants.PIXELS_PER_INCH;
		case mxConstants.MILLIMETERS:
			return value * mxConstants.PIXELS_PER_MM;
		case mxConstants.METERS:
			return value * mxConstants.PIXELS_PER_MM * 1000;
	}
};

BaseFormatPanel.prototype.isFloatUnit = function()
{
	return this.editorUi.editor.graph.view.unit != mxConstants.POINTS;
};

BaseFormatPanel.prototype.getUnitStep = function()
{
	var unit = this.editorUi.editor.graph.view.unit;
	
	switch(unit)
	{
		case mxConstants.POINTS:
			return 1;
		case mxConstants.INCHES:
			return 0.1;
		case mxConstants.MILLIMETERS:
			return 0.5;
		case mxConstants.METERS:
			return 0.001;
	}
};

/**
 * 
 */
ArrangePanel.prototype.addGeometry = function(container)
{
	var panel = this;
	var ui = this.editorUi;
	var graph = ui.editor.graph;
	var model = graph.getModel();
	var rect = ui.getSelectionState();

	var div = this.createPanel();
	div.style.paddingBottom = '8px';
		
	var span = document.createElement('div');
	span.style.position = 'absolute';
	span.style.width = '50px';
	span.style.marginTop = '0px';
	span.style.fontWeight = 'bold';
	mxUtils.write(span, mxResources.get('size'));
	div.appendChild(span);

	var widthUpdate, heightUpdate, leftUpdate, topUpdate;
	var width = this.addUnitInput(div, this.getUnit(), 87, 52, function()
	{
		widthUpdate.apply(this, arguments);
	}, this.getUnitStep(), null, null, this.isFloatUnit());
	var height = this.addUnitInput(div, this.getUnit(), 16, 52, function()
	{
		heightUpdate.apply(this, arguments);
	}, this.getUnitStep(), null, null, this.isFloatUnit());
	
	var autosizeBtn = document.createElement('div');
	autosizeBtn.className = 'geSprite geSprite-fit';
	autosizeBtn.setAttribute('title', mxResources.get('autosize') + ' (' + this.editorUi.actions.get('autosize').shortcut + ')');
	autosizeBtn.style.position = 'relative';
	autosizeBtn.style.cursor = 'pointer';
	autosizeBtn.style.marginTop = '-3px';
	autosizeBtn.style.border = '0px';
	autosizeBtn.style.left = '42px';
	mxUtils.setOpacity(autosizeBtn, 50);
	
	mxEvent.addListener(autosizeBtn, 'mouseenter', function()
	{
		mxUtils.setOpacity(autosizeBtn, 100);
	});
	
	mxEvent.addListener(autosizeBtn, 'mouseleave', function()
	{
		mxUtils.setOpacity(autosizeBtn, 50);
	});

	mxEvent.addListener(autosizeBtn, 'click', function()
	{
		ui.actions.get('autosize').funct();
	});
	
	div.appendChild(autosizeBtn);
	
	if (rect.row)
	{
		width.style.visibility = 'hidden';
		width.nextSibling.style.visibility = 'hidden';
	}
	else
	{
		this.addLabel(div, mxResources.get('width'), 87, 64);
	}
	
	this.addLabel(div, mxResources.get('height'), 16, 64);
	mxUtils.br(div);

	var wrapper = document.createElement('div');
	wrapper.style.paddingTop = '8px';
	wrapper.style.paddingRight = '20px';
	wrapper.style.whiteSpace = 'nowrap';
	wrapper.style.textAlign = 'right';
	var opt = this.createCellOption(mxResources.get('constrainProportions'),
		mxConstants.STYLE_ASPECT, null, 'fixed', 'null');
	opt.style.width = '210px';
	wrapper.appendChild(opt);
		
	if (!rect.cell && !rect.row)
	{
		div.appendChild(wrapper);
	}
	else
	{
		autosizeBtn.style.visibility = 'hidden';
	}
	
	var constrainCheckbox = opt.getElementsByTagName('input')[0];
	this.addKeyHandler(width, listener);
	this.addKeyHandler(height, listener);
	
	widthUpdate = this.addGeometryHandler(width, function(geo, value, cell)
	{
		if (graph.isTableCell(cell))
		{
			graph.setTableColumnWidth(cell, value - geo.width, true);
			
			// Blocks processing in caller
			return true;
		}
		else if (geo.width > 0)
		{
			var value = Math.max(1, panel.fromUnit(value));
			
			if (constrainCheckbox.checked)
			{
				geo.height = Math.round((geo.height * value * 100) / geo.width) / 100;
			}
			
			geo.width = value;
		}
	});
	heightUpdate = this.addGeometryHandler(height, function(geo, value, cell)
	{
		if (graph.isTableCell(cell))
		{
			cell = model.getParent(cell);
		}
		
		if (graph.isTableRow(cell))
		{
			graph.setTableRowHeight(cell, value - geo.height);
			
			// Blocks processing in caller
			return true;
		}
		else if (geo.height > 0)
		{
			var value = Math.max(1, panel.fromUnit(value));
			
			if (constrainCheckbox.checked)
			{
				geo.width = Math.round((geo.width  * value * 100) / geo.height) / 100;
			}
			
			geo.height = value;
		}
	});
	
	if (rect.resizable || rect.row || rect.cell)
	{
		container.appendChild(div);
	}
	
	var div2 = this.createPanel();
	div2.style.paddingBottom = '30px';
	
	var span = document.createElement('div');
	span.style.position = 'absolute';
	span.style.width = '70px';
	span.style.marginTop = '0px';
	span.style.fontWeight = 'bold';
	mxUtils.write(span, mxResources.get('position'));
	div2.appendChild(span);

	var left = this.addUnitInput(div2, this.getUnit(), 87, 52, function()
	{
		leftUpdate.apply(this, arguments);
	}, this.getUnitStep(), null, null, this.isFloatUnit());
	var top = this.addUnitInput(div2, this.getUnit(), 16, 52, function()
	{
		topUpdate.apply(this, arguments);
	}, this.getUnitStep(), null, null, this.isFloatUnit());

	mxUtils.br(div2);
	
	var coordinateLabels = true;
	var dx = null;
	var dy = null;

	if (rect.movable)
	{
		if (rect.edges.length == 0 && rect.vertices.length == 1)
		{
			var geo = graph.getCellGeometry(rect.vertices[0]);

			if (geo != null && geo.relative)
			{
				mxUtils.br(div2);

				var span = document.createElement('div');
				span.style.position = 'absolute';
				span.style.width = '70px';
				span.style.marginTop = '0px';
				mxUtils.write(span, mxResources.get('relative'));
				div2.appendChild(span);

				dx = this.addGenericInput(div2, ' %', 87, 52, function()
				{
					return (Math.round(geo.x * 1000) / 10);
				}, function(value)
				{
					value = parseFloat(value);
					
					if (!isNaN(value))
					{
						model.beginUpdate();
						try
						{
							geo = geo.clone();
							geo.x = parseFloat(value) / 100;
							model.setGeometry(rect.vertices[0], geo);
						}
						finally
						{
							model.endUpdate();
						}
					}
				});

				if (model.isEdge(model.getParent(rect.vertices[0])))
				{
					coordinateLabels = false;
					var dyUpdate = null;

					dy = this.addUnitInput(div2, this.getUnit(), 16, 52, function()
					{
						dyUpdate.apply(this, arguments);
					});

					dyUpdate = this.addGeometryHandler(dy, function(geo, value)
					{
						console.log('value', value);

						geo.y = panel.fromUnit(value);
					});
				}
				else
				{
					dy = this.addGenericInput(div2, ' %', 16, 52, function()
					{
						return (Math.round(geo.y * 1000) / 10);
					}, function(value)
					{
						value = parseFloat(value);
						
						if (!isNaN(value))
						{
							model.beginUpdate();
							try
							{
								geo = geo.clone();
								geo.y = parseFloat(value) / 100;
								model.setGeometry(rect.vertices[0], geo);
							}
							finally
							{
								model.endUpdate();
							}
						}
					});
				}

				mxUtils.br(div2);
			}
		}
		container.appendChild(div2);
	}

	this.addLabel(div2, mxResources.get(coordinateLabels ? 'left' : 'line'), 87, 64).style.marginTop = '8px';
	this.addLabel(div2, mxResources.get(coordinateLabels ? 'top' : 'orthogonal'), 16, 64).style.marginTop = '8px';
	
	var listener = mxUtils.bind(this, function(sender, evt, force)
	{
		rect = ui.getSelectionState();

		if (!rect.containsLabel && rect.vertices.length == graph.getSelectionCount() &&
			rect.width != null && rect.height != null)
		{
			div.style.display = '';
			
			if (force || document.activeElement != width)
			{
				width.value = this.inUnit(rect.width) + ' ' + this.getUnit();
			}
			
			if (force || document.activeElement != height)
			{
				height.value = this.inUnit(rect.height) + ' ' + this.getUnit();
			}
		}
		else
		{
			div.style.display = 'none';
		}
		
		if (rect.vertices.length == graph.getSelectionCount() &&
			rect.vertices.length > 0 && rect.x != null &&
			rect.y != null)
		{
			var geo = graph.getCellGeometry(rect.vertices[0]);
			div2.style.display = '';
			
			if (force || document.activeElement != left)
			{
				left.value = this.inUnit(rect.x) + ' ' + this.getUnit();
			}
			
			if (force || document.activeElement != top)
			{
				top.value = this.inUnit(rect.y) + ' ' + this.getUnit();
			}

			if (geo != null && geo.relative)
			{
				if (dx != null && (force || document.activeElement != dx))
				{
					dx.value = (Math.round(geo.x * 1000) / 10) + ' %';
				}

				if (dy != null && (force || document.activeElement != dy))
				{
					if (model.isEdge(model.getParent(rect.vertices[0])))
					{
						dy.value = this.inUnit(geo.y) + ' ' + this.getUnit();
					}
					else
					{
						dy.value = (Math.round(geo.y * 1000) / 10) + ' %';
					}
				}
			}
		}
		else
		{
			div2.style.display = 'none';
		}
	});

	this.listeners.push({destroy: function() { model.removeListener(listener); }});
	model.addListener(mxEvent.CHANGE, listener);
	this.addKeyHandler(left, listener);
	this.addKeyHandler(top, listener);
	listener();
	
	leftUpdate = this.addGeometryHandler(left, function(geo, value)
	{
		value = panel.fromUnit(value);
		
		if (geo.relative)
		{
			geo.offset.x = value;
		}
		else
		{
			geo.x = value;
		}
	});
	topUpdate = this.addGeometryHandler(top, function(geo, value)
	{
		value = panel.fromUnit(value);
		
		if (geo.relative)
		{
			geo.offset.y = value;
		}
		else
		{
			geo.y = value;
		}
	});

	if (rect.movable)
	{
		if (rect.edges.length == 0 && rect.vertices.length == 1 &&
			model.isEdge(model.getParent(rect.vertices[0])))
		{
			var geo = graph.getCellGeometry(rect.vertices[0]);
			
			if (geo != null && geo.relative)
			{
				var btn = mxUtils.button(mxResources.get('center'), mxUtils.bind(this, function(evt)
				{
					model.beginUpdate();
					try
					{
						geo = geo.clone();
						geo.x = 0;
						geo.y = 0;
						geo.offset = new mxPoint();
						model.setGeometry(rect.vertices[0], geo);
					}
					finally
					{
						model.endUpdate();
					}
				}));
				
				btn.setAttribute('title', mxResources.get('center'));
				btn.style.width = '134px';
				btn.style.left = '89px';
				btn.style.position = 'absolute';
				mxUtils.br(div2);
				mxUtils.br(div2);
				div2.appendChild(btn);
			}
		}
		container.appendChild(div2);
	}
};

/**
 * 
 */
ArrangePanel.prototype.addGeometryHandler = function(input, fn)
{
	var ui = this.editorUi;
	var graph = ui.editor.graph;
	var initialValue = null;
	var panel = this;
	
	function update(evt)
	{
		if (input.value != '')
		{
			var value = parseFloat(input.value);

			if (isNaN(value)) 
			{
				input.value = initialValue + ' ' + panel.getUnit();
			}
			else if (value != initialValue)
			{
				graph.getModel().beginUpdate();
				try
				{
					var cells = ui.getSelectionState().cells;
					
					for (var i = 0; i < cells.length; i++)
					{
						if (graph.getModel().isVertex(cells[i]))
						{
							var geo = graph.getCellGeometry(cells[i]);
							
							if (geo != null)
							{
								geo = geo.clone();
								
								if (!fn(geo, value, cells[i]))
								{
									var state = graph.view.getState(cells[i]);
									
									if (state != null && graph.isRecursiveVertexResize(state))
									{
										graph.resizeChildCells(cells[i], geo);
									}
									
									graph.getModel().setGeometry(cells[i], geo);
									graph.constrainChildCells(cells[i]);
								}
							}
						}
					}
				}
				finally
				{
					graph.getModel().endUpdate();
				}
				
				initialValue = value;
				input.value = value + ' ' + panel.getUnit();
			}
		}
		
		mxEvent.consume(evt);
	};

	mxEvent.addListener(input, 'blur', update);
	mxEvent.addListener(input, 'change', update);
	mxEvent.addListener(input, 'focus', function()
	{
		initialValue = input.value;
	});
	
	return update;
};

ArrangePanel.prototype.addEdgeGeometryHandler = function(input, fn)
{
    var ui = this.editorUi;
    var graph = ui.editor.graph;
    var initialValue = null;

    function update(evt)
    {
        if (input.value != '')
        {
            var value = parseFloat(input.value);

            if (isNaN(value))
            {
                input.value = initialValue + ' pt';
            }
            else if (value != initialValue)
            {
                graph.getModel().beginUpdate();
                try
                {
                    var cells = ui.getSelectionState().cells;

                    for (var i = 0; i < cells.length; i++)
                    {
                        if (graph.getModel().isEdge(cells[i]))
                        {
                            var geo = graph.getCellGeometry(cells[i]);

                            if (geo != null)
                            {
                                geo = geo.clone();
                                fn(geo, value);

                                graph.getModel().setGeometry(cells[i], geo);
                            }
                        }
                    }
                }
                finally
                {
                    graph.getModel().endUpdate();
                }

                initialValue = value;
                input.value = value + ' pt';
            }
        }

        mxEvent.consume(evt);
    };

    mxEvent.addListener(input, 'blur', update);
    mxEvent.addListener(input, 'change', update);
    mxEvent.addListener(input, 'focus', function()
    {
        initialValue = input.value;
    });

    return update;
};

/**
 * 
 */
ArrangePanel.prototype.addEdgeGeometry = function(container)
{
	var ui = this.editorUi;
	var graph = ui.editor.graph;
	var rect = ui.getSelectionState();
	var div = this.createPanel();
	
	var span = document.createElement('div');
	span.style.position = 'absolute';
	span.style.width = '70px';
	span.style.marginTop = '0px';
	span.style.fontWeight = 'bold';
	mxUtils.write(span, mxResources.get('width'));
	div.appendChild(span);

	var widthUpdate, xtUpdate, ytUpdate, xsUpdate, ysUpdate;
	var width = this.addUnitInput(div, 'pt', 12, 44, function()
	{
		widthUpdate.apply(this, arguments);
	});

	mxUtils.br(div);
	this.addKeyHandler(width, listener);
	
	var widthUpdate = mxUtils.bind(this, function(evt)
	{
		// Maximum stroke width is 999
		var value = parseInt(width.value);
		value = Math.min(999, Math.max(1, (isNaN(value)) ? 1 : value));
		
		if (value != mxUtils.getValue(rect.style, 'width', mxCellRenderer.defaultShapes['flexArrow'].prototype.defaultWidth))
		{
			var cells = ui.getSelectionState().cells;
			graph.setCellStyles('width', value, cells);
			ui.fireEvent(new mxEventObject('styleChanged', 'keys', ['width'],
					'values', [value], 'cells', cells));
		}

		width.value = value + ' pt';
		mxEvent.consume(evt);
	});

	mxEvent.addListener(width, 'blur', widthUpdate);
	mxEvent.addListener(width, 'change', widthUpdate);

	container.appendChild(div);

	var divs = this.createPanel();
	divs.style.paddingBottom = '30px';

	var span = document.createElement('div');
	span.style.position = 'absolute';
	span.style.width = '70px';
	span.style.marginTop = '0px';
	mxUtils.write(span, mxResources.get('linestart'));
	divs.appendChild(span);

	var xs = this.addUnitInput(divs, 'pt', 87, 52, function()
	{
		xsUpdate.apply(this, arguments);
	});
	var ys = this.addUnitInput(divs, 'pt', 16, 52, function()
	{
		ysUpdate.apply(this, arguments);
	});

	mxUtils.br(divs);
	this.addLabel(divs, mxResources.get('left'), 87, 64);
	this.addLabel(divs, mxResources.get('top'), 16, 64);
	container.appendChild(divs);
	this.addKeyHandler(xs, listener);
	this.addKeyHandler(ys, listener);

	var divt = this.createPanel();
	divt.style.paddingBottom = '30px';

	var span = document.createElement('div');
	span.style.position = 'absolute';
	span.style.width = '70px';
	span.style.marginTop = '0px';
	mxUtils.write(span, mxResources.get('lineend'));
	divt.appendChild(span);

	var xt = this.addUnitInput(divt, 'pt', 87, 52, function()
	{
		xtUpdate.apply(this, arguments);
	});
	var yt = this.addUnitInput(divt, 'pt', 16, 52, function()
	{
		ytUpdate.apply(this, arguments);
	});

	mxUtils.br(divt);
	this.addLabel(divt, mxResources.get('left'), 87, 64);
	this.addLabel(divt, mxResources.get('top'), 16, 64);
	container.appendChild(divt);
	this.addKeyHandler(xt, listener);
	this.addKeyHandler(yt, listener);

	var listener = mxUtils.bind(this, function(sender, evt, force)
	{
		rect = ui.getSelectionState();
		var cell = rect.cells[0];
		
		if (rect.style.shape == 'link' || rect.style.shape == 'flexArrow')
		{
			div.style.display = '';
			
			if (force || document.activeElement != width)
			{
				var value = mxUtils.getValue(rect.style, 'width',
					mxCellRenderer.defaultShapes['flexArrow'].prototype.defaultWidth);
				width.value = value + ' pt';
			}
		}
		else
		{
			div.style.display = 'none';
		}

		if (rect.cells.length == 1 && graph.model.isEdge(cell))
		{
			var geo = graph.model.getGeometry(cell);
			
			if (geo != null && geo.sourcePoint != null &&
				graph.model.getTerminal(cell, true) == null)
			{
				xs.value = geo.sourcePoint.x;
				ys.value = geo.sourcePoint.y;
			}
			else
			{
				divs.style.display = 'none';
			}
			
			if (geo != null && geo.targetPoint != null &&
				graph.model.getTerminal(cell, false) == null)
			{
				xt.value = geo.targetPoint.x;
				yt.value = geo.targetPoint.y;
			}
			else
			{
				divt.style.display = 'none';
			}
		}
		else
		{
			divs.style.display = 'none';
			divt.style.display = 'none';
		}
	});

	xsUpdate = this.addEdgeGeometryHandler(xs, function(geo, value)
	{
		geo.sourcePoint.x = value;
	});

	ysUpdate = this.addEdgeGeometryHandler(ys, function(geo, value)
	{
		geo.sourcePoint.y = value;
	});

	xtUpdate = this.addEdgeGeometryHandler(xt, function(geo, value)
	{
		geo.targetPoint.x = value;
	});

	ytUpdate = this.addEdgeGeometryHandler(yt, function(geo, value)
	{
		geo.targetPoint.y = value;
	});

	graph.getModel().addListener(mxEvent.CHANGE, listener);
	this.listeners.push({destroy: function() { graph.getModel().removeListener(listener); }});
	listener();
};

/**
 * Adds the label menu items to the given menu and parent.
 */
TextFormatPanel = function(format, editorUi, container)
{
	BaseFormatPanel.call(this, format, editorUi, container);
	this.init();
};

mxUtils.extend(TextFormatPanel, BaseFormatPanel);

/**
 * Adds the label menu items to the given menu and parent.
 */
TextFormatPanel.prototype.init = function()
{
	this.container.style.borderBottom = 'none';
	this.addFont(this.container);

	// Allows to lock/unload button to be added
	this.container.appendChild(this.addFontOps(this.createPanel()));
};


/**
 * 
 */
TextFormatPanel.prototype.addFontOps = function(div)
{
	var ui = this.editorUi;
	div.style.paddingTop = '8px';
	div.style.paddingBottom = '6px';

	var count = this.addActions(div, ['removeFormat']);

	if (count == 0)
	{
		div.style.display = 'none';
	}
	
	return div;
};


/**
 * Adds the label menu items to the given menu and parent.
 */
TextFormatPanel.prototype.addFont = function(container)
{
	var ui = this.editorUi;
	var editor = ui.editor;
	var graph = editor.graph;
	var ss = ui.getSelectionState();
	
	var title = this.createTitle(mxResources.get('font'));
	title.style.paddingLeft = '14px';
	title.style.paddingTop = '10px';
	title.style.paddingBottom = '6px';
	container.appendChild(title);

	var stylePanel = this.createPanel();
	stylePanel.style.paddingTop = '2px';
	stylePanel.style.paddingBottom = '2px';
	stylePanel.style.position = 'relative';
	stylePanel.style.marginLeft = '-2px';
	stylePanel.style.borderWidth = '0px';
	stylePanel.className = 'geToolbarContainer';
	
	if (graph.cellEditor.isContentEditing())
	{
		var cssPanel = stylePanel.cloneNode();
		
		var cssMenu = this.editorUi.toolbar.addMenu(mxResources.get('style'),
			mxResources.get('style'), true, 'formatBlock', cssPanel, null, true);
		this.addArrow(cssMenu);
		cssMenu.style.width = '211px';
		cssMenu.style.alignItems = 'center';
		cssMenu.style.justifyContent = 'center';
		cssMenu.style.whiteSpace = 'nowrap';
		cssMenu.style.overflow = 'hidden';
		cssMenu.style.margin = '0px';
		cssMenu.style.position = 'relative';

		var arrow = cssMenu.getElementsByTagName('div')[0];
		arrow.style.position = 'absolute';
		arrow.style.right = '2px';
		container.appendChild(cssPanel);
	}
	
	container.appendChild(stylePanel);
	
	var colorPanel = this.createPanel();
	colorPanel.style.marginTop = '8px';
	colorPanel.style.borderWidth = '1px';
	colorPanel.style.borderStyle = 'solid';
	colorPanel.style.paddingTop = '6px';
	colorPanel.style.paddingBottom = '2px';
	
	var fontMenu = this.editorUi.toolbar.addMenu('Helvetica', mxResources.get('fontFamily'),
		true, 'fontFamily', stylePanel, null, true);
	
	this.addArrow(fontMenu);
	fontMenu.style.width = '211px';
	fontMenu.style.alignItems = 'center';
	fontMenu.style.justifyContent = 'center';
	fontMenu.style.whiteSpace = 'nowrap';
	fontMenu.style.overflow = 'hidden';
	fontMenu.style.margin = '0px';
	fontMenu.style.position = 'relative';

	var arrow = fontMenu.getElementsByTagName('div')[0];
	arrow.style.position = 'absolute';
	arrow.style.right = '2px';
	
	var stylePanel2 = stylePanel.cloneNode(false);
	stylePanel2.style.marginLeft = '-3px';
	var fontStyleItems = this.editorUi.toolbar.addItems(['bold', 'italic', 'underline'], stylePanel2, true);
	fontStyleItems[0].setAttribute('title', mxResources.get('bold') + ' (' + this.editorUi.actions.get('bold').shortcut + ')');
	fontStyleItems[1].setAttribute('title', mxResources.get('italic') + ' (' + this.editorUi.actions.get('italic').shortcut + ')');
	fontStyleItems[2].setAttribute('title', mxResources.get('underline') + ' (' + this.editorUi.actions.get('underline').shortcut + ')');
	
	var verticalItem = this.editorUi.toolbar.addItems(['vertical'], stylePanel2, true)[0];
	
	container.appendChild(stylePanel2);

	this.styleButtons(fontStyleItems);
	this.styleButtons([verticalItem]);
	
	var stylePanel3 = stylePanel.cloneNode(false);
	stylePanel3.style.marginLeft = '-3px';
	stylePanel3.style.paddingBottom = '0px';
	
	// Helper function to return a wrapper function does not pass any arguments
	var callFn = function(fn)
	{
		return function()
		{
			return fn();
		};
	};
	
	var left = this.editorUi.toolbar.addButton('geSprite-left', mxResources.get('left'),
		(graph.cellEditor.isContentEditing()) ?
		function(evt)
		{
			graph.cellEditor.alignText(mxConstants.ALIGN_LEFT, evt);
			ui.fireEvent(new mxEventObject('styleChanged',
				'keys', [mxConstants.STYLE_ALIGN],
				'values', [mxConstants.ALIGN_LEFT],
				'cells', ss.cells));
		} : callFn(this.editorUi.menus.createStyleChangeFunction([mxConstants.STYLE_ALIGN], [mxConstants.ALIGN_LEFT])), stylePanel3);
	var center = this.editorUi.toolbar.addButton('geSprite-center', mxResources.get('center'),
		(graph.cellEditor.isContentEditing()) ?
		function(evt)
		{
			graph.cellEditor.alignText(mxConstants.ALIGN_CENTER, evt);
			ui.fireEvent(new mxEventObject('styleChanged',
				'keys', [mxConstants.STYLE_ALIGN],
				'values', [mxConstants.ALIGN_CENTER],
				'cells', ss.cells));
		} : callFn(this.editorUi.menus.createStyleChangeFunction([mxConstants.STYLE_ALIGN], [mxConstants.ALIGN_CENTER])), stylePanel3);
	var right = this.editorUi.toolbar.addButton('geSprite-right', mxResources.get('right'),
		(graph.cellEditor.isContentEditing()) ?
		function(evt)
		{
			graph.cellEditor.alignText(mxConstants.ALIGN_RIGHT, evt);
			ui.fireEvent(new mxEventObject('styleChanged',
				'keys', [mxConstants.STYLE_ALIGN],
				'values', [mxConstants.ALIGN_RIGHT],
				'cells', ss.cells));
		} : callFn(this.editorUi.menus.createStyleChangeFunction([mxConstants.STYLE_ALIGN], [mxConstants.ALIGN_RIGHT])), stylePanel3);

	this.styleButtons([left, center, right]);
	
	// Quick hack for strikethrough
	// TODO: Add translations and toggle state
	if (graph.cellEditor.isContentEditing())
	{
		var strike = this.editorUi.toolbar.addButton('geSprite-removeformat', mxResources.get('strikethrough'),
			function()
			{
				document.execCommand('strikeThrough', false, null);
			}, stylePanel2);
		this.styleButtons([strike]);

		strike.firstChild.style.background = 'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PGRlZnM+PHBhdGggaWQ9ImEiIGQ9Ik0wIDBoMjR2MjRIMFYweiIvPjwvZGVmcz48Y2xpcFBhdGggaWQ9ImIiPjx1c2UgeGxpbms6aHJlZj0iI2EiIG92ZXJmbG93PSJ2aXNpYmxlIi8+PC9jbGlwUGF0aD48cGF0aCBjbGlwLXBhdGg9InVybCgjYikiIGZpbGw9IiMwMTAxMDEiIGQ9Ik03LjI0IDguNzVjLS4yNi0uNDgtLjM5LTEuMDMtLjM5LTEuNjcgMC0uNjEuMTMtMS4xNi40LTEuNjcuMjYtLjUuNjMtLjkzIDEuMTEtMS4yOS40OC0uMzUgMS4wNS0uNjMgMS43LS44My42Ni0uMTkgMS4zOS0uMjkgMi4xOC0uMjkuODEgMCAxLjU0LjExIDIuMjEuMzQuNjYuMjIgMS4yMy41NCAxLjY5Ljk0LjQ3LjQuODMuODggMS4wOCAxLjQzLjI1LjU1LjM4IDEuMTUuMzggMS44MWgtMy4wMWMwLS4zMS0uMDUtLjU5LS4xNS0uODUtLjA5LS4yNy0uMjQtLjQ5LS40NC0uNjgtLjItLjE5LS40NS0uMzMtLjc1LS40NC0uMy0uMS0uNjYtLjE2LTEuMDYtLjE2LS4zOSAwLS43NC4wNC0xLjAzLjEzLS4yOS4wOS0uNTMuMjEtLjcyLjM2LS4xOS4xNi0uMzQuMzQtLjQ0LjU1LS4xLjIxLS4xNS40My0uMTUuNjYgMCAuNDguMjUuODguNzQgMS4yMS4zOC4yNS43Ny40OCAxLjQxLjdINy4zOWMtLjA1LS4wOC0uMTEtLjE3LS4xNS0uMjV6TTIxIDEydi0ySDN2Mmg5LjYyYy4xOC4wNy40LjE0LjU1LjIuMzcuMTcuNjYuMzQuODcuNTEuMjEuMTcuMzUuMzYuNDMuNTcuMDcuMi4xMS40My4xMS42OSAwIC4yMy0uMDUuNDUtLjE0LjY2LS4wOS4yLS4yMy4zOC0uNDIuNTMtLjE5LjE1LS40Mi4yNi0uNzEuMzUtLjI5LjA4LS42My4xMy0xLjAxLjEzLS40MyAwLS44My0uMDQtMS4xOC0uMTNzLS42Ni0uMjMtLjkxLS40MmMtLjI1LS4xOS0uNDUtLjQ0LS41OS0uNzUtLjE0LS4zMS0uMjUtLjc2LS4yNS0xLjIxSDYuNGMwIC41NS4wOCAxLjEzLjI0IDEuNTguMTYuNDUuMzcuODUuNjUgMS4yMS4yOC4zNS42LjY2Ljk4LjkyLjM3LjI2Ljc4LjQ4IDEuMjIuNjUuNDQuMTcuOS4zIDEuMzguMzkuNDguMDguOTYuMTMgMS40NC4xMy44IDAgMS41My0uMDkgMi4xOC0uMjhzMS4yMS0uNDUgMS42Ny0uNzljLjQ2LS4zNC44Mi0uNzcgMS4wNy0xLjI3cy4zOC0xLjA3LjM4LTEuNzFjMC0uNi0uMS0xLjE0LS4zMS0xLjYxLS4wNS0uMTEtLjExLS4yMy0uMTctLjMzSDIxeiIvPjwvc3ZnPg==)';
		strike.firstChild.style.backgroundPosition = '2px 2px';
		strike.firstChild.style.backgroundSize = '18px 18px';

		this.styleButtons([strike]);
	}
	
	var top = this.editorUi.toolbar.addButton('geSprite-top', mxResources.get('top'),
		callFn(this.editorUi.menus.createStyleChangeFunction([mxConstants.STYLE_VERTICAL_ALIGN],
			[mxConstants.ALIGN_TOP])), stylePanel3);
	var middle = this.editorUi.toolbar.addButton('geSprite-middle', mxResources.get('middle'),
		callFn(this.editorUi.menus.createStyleChangeFunction([mxConstants.STYLE_VERTICAL_ALIGN],
			[mxConstants.ALIGN_MIDDLE])), stylePanel3);
	var bottom = this.editorUi.toolbar.addButton('geSprite-bottom', mxResources.get('bottom'),
		callFn(this.editorUi.menus.createStyleChangeFunction([mxConstants.STYLE_VERTICAL_ALIGN],
			[mxConstants.ALIGN_BOTTOM])), stylePanel3);
	
	this.styleButtons([top, middle, bottom]);
	
	container.appendChild(stylePanel3);
	
	// Hack for updating UI state below based on current text selection
	// currentTable is the current selected DOM table updated below
	var sub, sup, full, tableWrapper, currentTable, tableCell, tableRow;
	
	if (graph.cellEditor.isContentEditing())
	{
		top.style.display = 'none';
		middle.style.display = 'none';
		bottom.style.display = 'none';
		verticalItem.style.display = 'none';
		
		full = this.editorUi.toolbar.addButton('geSprite-justifyfull', mxResources.get('block'),
			function()
			{
				if (full.style.opacity == 1)
				{
					document.execCommand('justifyfull', false, null);
				}
			}, stylePanel3);
		full.style.marginRight = '9px';
		full.style.opacity = 1;

		this.styleButtons([full,
       		sub = this.editorUi.toolbar.addButton('geSprite-subscript',
       			mxResources.get('subscript') + ' (' + Editor.ctrlKey + '+,)',
			function()
			{
				document.execCommand('subscript', false, null);
			}, stylePanel3), sup = this.editorUi.toolbar.addButton('geSprite-superscript',
				mxResources.get('superscript') + ' (' + Editor.ctrlKey + '+.)',
			function()
			{
				document.execCommand('superscript', false, null);
			}, stylePanel3)]);
		sub.style.marginLeft = '10px';
		
		var tmp = stylePanel3.cloneNode(false);
		tmp.style.paddingTop = '4px';
		var btns = [this.editorUi.toolbar.addButton('geSprite-orderedlist', mxResources.get('numberedList'),
				function()
				{
					document.execCommand('insertorderedlist', false, null);
				}, tmp),
			this.editorUi.toolbar.addButton('geSprite-unorderedlist', mxResources.get('bulletedList'),
				function()
				{
					document.execCommand('insertunorderedlist', false, null);
				}, tmp),
			this.editorUi.toolbar.addButton('geSprite-outdent', mxResources.get('decreaseIndent'),
				function()
				{
					document.execCommand('outdent', false, null);
				}, tmp),
			this.editorUi.toolbar.addButton('geSprite-indent', mxResources.get('increaseIndent'),
				function()
				{
					document.execCommand('indent', false, null);
				}, tmp),
			this.editorUi.toolbar.addButton('geSprite-removeformat', mxResources.get('removeFormat'),
				function()
				{
					document.execCommand('removeformat', false, null);
				}, tmp),
			this.editorUi.toolbar.addButton('geSprite-code', mxResources.get('html'),
				function()
				{
					graph.cellEditor.toggleViewMode();
				}, tmp)];
		this.styleButtons(btns);
		btns[btns.length - 2].style.marginLeft = '10px';
		
		container.appendChild(tmp);
	}
	else
	{
		fontStyleItems[2].style.marginRight = '12px';
		right.style.marginRight = '12px';
	}
	
	// Label position
	var stylePanel4 = stylePanel.cloneNode(false);
	stylePanel4.removeAttribute('class');
	stylePanel4.style.marginLeft = '0px';
	stylePanel4.style.paddingTop = '8px';
	stylePanel4.style.paddingBottom = '4px';
	stylePanel4.style.fontWeight = 'normal';
	
	mxUtils.write(stylePanel4, mxResources.get('position'));
	
	// Adds label position options
	var positionSelect = document.createElement('select');
	positionSelect.style.position = 'absolute';
	positionSelect.style.left = '126px';
	positionSelect.style.width = '98px';
	positionSelect.style.borderWidth = '1px';
	positionSelect.style.borderStyle = 'solid';
	positionSelect.style.marginTop = '-3px';
	
	var directions = ['topLeft', 'top', 'topRight', 'left', 'center', 'right', 'bottomLeft', 'bottom', 'bottomRight'];
	var lset = {'topLeft': [mxConstants.ALIGN_LEFT, mxConstants.ALIGN_TOP, mxConstants.ALIGN_RIGHT, mxConstants.ALIGN_BOTTOM],
			'top': [mxConstants.ALIGN_CENTER, mxConstants.ALIGN_TOP, mxConstants.ALIGN_CENTER, mxConstants.ALIGN_BOTTOM],
			'topRight': [mxConstants.ALIGN_RIGHT, mxConstants.ALIGN_TOP, mxConstants.ALIGN_LEFT, mxConstants.ALIGN_BOTTOM],
			'left': [mxConstants.ALIGN_LEFT, mxConstants.ALIGN_MIDDLE, mxConstants.ALIGN_RIGHT, mxConstants.ALIGN_MIDDLE],
			'center': [mxConstants.ALIGN_CENTER, mxConstants.ALIGN_MIDDLE, mxConstants.ALIGN_CENTER, mxConstants.ALIGN_MIDDLE],
			'right': [mxConstants.ALIGN_RIGHT, mxConstants.ALIGN_MIDDLE, mxConstants.ALIGN_LEFT, mxConstants.ALIGN_MIDDLE],
			'bottomLeft': [mxConstants.ALIGN_LEFT, mxConstants.ALIGN_BOTTOM, mxConstants.ALIGN_RIGHT, mxConstants.ALIGN_TOP],
			'bottom': [mxConstants.ALIGN_CENTER, mxConstants.ALIGN_BOTTOM, mxConstants.ALIGN_CENTER, mxConstants.ALIGN_TOP],
			'bottomRight': [mxConstants.ALIGN_RIGHT, mxConstants.ALIGN_BOTTOM, mxConstants.ALIGN_LEFT, mxConstants.ALIGN_TOP]};

	for (var i = 0; i < directions.length; i++)
	{
		var positionOption = document.createElement('option');
		positionOption.setAttribute('value', directions[i]);
		mxUtils.write(positionOption, mxResources.get(directions[i]));
		positionSelect.appendChild(positionOption);
	}

	stylePanel4.appendChild(positionSelect);
	
	// Writing direction
	var stylePanel5 = stylePanel.cloneNode(false);
	stylePanel5.removeAttribute('class');
	stylePanel5.style.marginLeft = '0px';
	stylePanel5.style.paddingTop = '4px';
	stylePanel5.style.paddingBottom = '4px';
	stylePanel5.style.fontWeight = 'normal';

	mxUtils.write(stylePanel5, mxResources.get('writingDirection'));
	
	// Adds writing direction options
	// LATER: Handle reselect of same option in all selects (change event
	// is not fired for same option so have opened state on click) and
	// handle multiple different styles for current selection
	var dirSelect = document.createElement('select');
	dirSelect.style.position = 'absolute';
	dirSelect.style.borderWidth = '1px';
	dirSelect.style.borderStyle = 'solid';
	dirSelect.style.left = '126px';
	dirSelect.style.width = '98px';
	dirSelect.style.marginTop = '-3px';

	// NOTE: For automatic we use the value null since automatic
	// requires the text to be non formatted and non-wrapped
	var dirs = ['automatic', 'leftToRight', 'rightToLeft'];
	var dirSet = {'automatic': null,
			'leftToRight': mxConstants.TEXT_DIRECTION_LTR,
			'rightToLeft': mxConstants.TEXT_DIRECTION_RTL};

	for (var i = 0; i < dirs.length; i++)
	{
		var dirOption = document.createElement('option');
		dirOption.setAttribute('value', dirs[i]);
		mxUtils.write(dirOption, mxResources.get(dirs[i]));
		dirSelect.appendChild(dirOption);
	}

	stylePanel5.appendChild(dirSelect);
	
	if (!graph.isEditing())
	{
		container.appendChild(stylePanel4);
		
		mxEvent.addListener(positionSelect, 'change', function(evt)
		{
			graph.getModel().beginUpdate();
			try
			{
				var vals = lset[positionSelect.value];
				
				if (vals != null)
				{
					graph.setCellStyles(mxConstants.STYLE_LABEL_POSITION, vals[0], ss.cells);
					graph.setCellStyles(mxConstants.STYLE_VERTICAL_LABEL_POSITION, vals[1], ss.cells);
					graph.setCellStyles(mxConstants.STYLE_ALIGN, vals[2], ss.cells);
					graph.setCellStyles(mxConstants.STYLE_VERTICAL_ALIGN, vals[3], ss.cells);
				}
			}
			finally
			{
				graph.getModel().endUpdate();
			}
			
			mxEvent.consume(evt);
		});

		// LATER: Update dir in text editor while editing and update style with label
		// NOTE: The tricky part is handling and passing on the auto value
		container.appendChild(stylePanel5);
		
		mxEvent.addListener(dirSelect, 'change', function(evt)
		{
			graph.setCellStyles(mxConstants.STYLE_TEXT_DIRECTION, dirSet[dirSelect.value], ss.cells);
			mxEvent.consume(evt);
		});
	}

	// Fontsize
	var input = document.createElement('input');
	input.style.position = 'absolute';
	input.style.borderWidth = '1px';
	input.style.borderStyle = 'solid';
	input.style.textAlign = 'right';
	input.style.marginTop = '4px';
	input.style.left = '161px';
	input.style.width = '53px';
	input.style.height = '23px';
	input.style.boxSizing = 'border-box';
	stylePanel2.appendChild(input);
	
	// Workaround for font size 4 if no text is selected is update font size below
	// after first character was entered (as the font element is lazy created)
	var pendingFontSize = null;

	var inputUpdate = this.installInputHandler(input, mxConstants.STYLE_FONTSIZE, Menus.prototype.defaultFontSize, 1, 999, ' pt',
	function(fontSize)
	{
		// IE does not support containsNode
		// KNOWN: Fixes font size issues but bypasses undo
		if (window.getSelection && !mxClient.IS_IE && !mxClient.IS_IE11)
		{
			var selection = window.getSelection();
			var container = (selection.rangeCount > 0) ? selection.getRangeAt(0).commonAncestorContainer :
				graph.cellEditor.textarea;

			function updateSize(elt, ignoreContains)
			{
				if (graph.cellEditor.textarea != null && elt != graph.cellEditor.textarea &&
					graph.cellEditor.textarea.contains(elt) &&
					(ignoreContains || selection.containsNode(elt, true)))
				{
					if (elt.nodeName == 'FONT')
					{
						elt.removeAttribute('size');
						elt.style.fontSize = fontSize + 'px';
					}
					else
					{
						var css = mxUtils.getCurrentStyle(elt);
						
						if (css.fontSize != fontSize + 'px')
						{
							if (mxUtils.getCurrentStyle(elt.parentNode).fontSize != fontSize + 'px')
							{
								elt.style.fontSize = fontSize + 'px';
							}
							else
							{
								elt.style.fontSize = '';
							}
						}
					}
				}

				ui.fireEvent(new mxEventObject('styleChanged',
					'keys', [mxConstants.STYLE_FONTSIZE],
					'values', [fontSize], 'cells', ss.cells));
			};
			
			// Wraps text node or mixed selection with leading text in a font element
			if (container == graph.cellEditor.textarea ||
				container.nodeType != mxConstants.NODETYPE_ELEMENT)
			{
				document.execCommand('fontSize', false, '1');
			}

			if (container != graph.cellEditor.textarea)
			{
				container = container.parentNode;
			}
			
			if (container != null && container.nodeType == mxConstants.NODETYPE_ELEMENT)
			{
				var elts = container.getElementsByTagName('*');
				updateSize(container);
				
				for (var i = 0; i < elts.length; i++)
				{
					updateSize(elts[i]);
				}
			}

			input.value = fontSize + ' pt';
		}
		else if (window.getSelection || document.selection)
		{
			// Checks selection
			var par = null;
			
			if (document.selection)
			{
				par = document.selection.createRange().parentElement();
			}
			else
			{
				var selection = window.getSelection();
				
				if (selection.rangeCount > 0)
				{
					par = selection.getRangeAt(0).commonAncestorContainer;
				}
			}
			
			// Node.contains does not work for text nodes in IE11
			function isOrContains(container, node)
			{
			    while (node != null)
			    {
			        if (node === container)
			        {
			            return true;
			        }
			        
			        node = node.parentNode;
			    }
			    
			    return false;
			};
			
			if (par != null && isOrContains(graph.cellEditor.textarea, par))
			{
				pendingFontSize = fontSize;
				
				// Workaround for can't set font size in px is to change font size afterwards
				document.execCommand('fontSize', false, '4');
				var elts = graph.cellEditor.textarea.getElementsByTagName('font');
				
				for (var i = 0; i < elts.length; i++)
				{
					if (elts[i].getAttribute('size') == '4')
					{
						elts[i].removeAttribute('size');
						elts[i].style.fontSize = pendingFontSize + 'px';
			
						// Overrides fontSize in input with the one just assigned as a workaround
						// for potential fontSize values of parent elements that don't match
						window.setTimeout(function()
						{
							input.value = pendingFontSize + ' pt';
							pendingFontSize = null;
						}, 0);
						
						break;
					}
				}
			}
		}
	}, true);
	
	var stepper = this.createStepper(input, inputUpdate, 1, 10, true, Menus.prototype.defaultFontSize);
	stepper.style.display = input.style.display;
	stepper.style.marginTop = '4px';
	stepper.style.left = '214px';
	
	stylePanel2.appendChild(stepper);
	
	var arrow = fontMenu.getElementsByTagName('div')[0];
	arrow.style.cssFloat = 'right';
	
	var bgColorApply = null;
	var currentBgColor = graph.shapeBackgroundColor;
	
	var fontColorApply = null;
	var currentFontColor = graph.shapeForegroundColor;
		
	var bgPanel = (graph.cellEditor.isContentEditing()) ? this.createColorOption(mxResources.get('backgroundColor'), function()
	{
		return currentBgColor;
	}, function(color)
	{
		document.execCommand('backcolor', false, (color != mxConstants.NONE) ? color : 'transparent');
		ui.fireEvent(new mxEventObject('styleChanged',
			'keys', [mxConstants.STYLE_LABEL_BACKGROUNDCOLOR],
			'values', [color], 'cells', ss.cells));
	}, graph.shapeBackgroundColor,
	{
		install: function(apply) { bgColorApply = apply; },
		destroy: function() { bgColorApply = null; }
	}, null, true) : this.createCellColorOption(mxResources.get('backgroundColor'),
		mxConstants.STYLE_LABEL_BACKGROUNDCOLOR, 'default', null, function(color)
	{
		graph.updateLabelElements(ss.cells, function(elt)
		{
			elt.style.backgroundColor = null;
		});
	}, graph.shapeBackgroundColor);
	bgPanel.style.fontWeight = 'bold';

	var borderPanel = this.createCellColorOption(mxResources.get('borderColor'),
		mxConstants.STYLE_LABEL_BORDERCOLOR, 'default', null, null,
		graph.shapeForegroundColor);
	borderPanel.style.fontWeight = 'bold';
	
	var defs = (ss.vertices.length >= 1) ?
		graph.stylesheet.getDefaultVertexStyle() :
		graph.stylesheet.getDefaultEdgeStyle();

	var panel = (graph.cellEditor.isContentEditing()) ? this.createColorOption(mxResources.get('fontColor'), function()
	{
		return currentFontColor;
	}, function(color)
	{
		if (mxClient.IS_FF)
		{
			// Workaround for Firefox that adds the font element around
			// anchor elements which ignore inherited colors is to move
			// the font element inside anchor elements
			var tmp = graph.cellEditor.textarea.getElementsByTagName('font');
			var oldFonts = [];

			for (var i = 0; i < tmp.length; i++)
			{
				oldFonts.push(
				{
					node: tmp[i],
					color: tmp[i].getAttribute('color')
				});
			}

			document.execCommand('forecolor', false, (color != mxConstants.NONE) ?
				color : 'transparent');
			ui.fireEvent(new mxEventObject('styleChanged',
				'keys', [mxConstants.STYLE_FONTCOLOR],
				'values', [color], 'cells', ss.cells));

			// Finds the new or changed font element
			var newFonts = graph.cellEditor.textarea.getElementsByTagName('font');

			for (var i = 0; i < newFonts.length; i++)
			{
				if (i >= oldFonts.length || newFonts[i] != oldFonts[i].node ||
					(newFonts[i] == oldFonts[i].node &&
						newFonts[i].getAttribute('color') != oldFonts[i].color))
				{
					var child = newFonts[i].firstChild;

					// Moves the font element to inside the anchor element and adopts all children
					if (child != null && child.nodeName == 'A' && child.nextSibling == null &&
						child.firstChild != null)
					{
						var parent = newFonts[i].parentNode;
						parent.insertBefore(child, newFonts[i]);
						var tmp = child.firstChild;

						while (tmp != null)
						{
							var next = tmp.nextSibling;
							newFonts[i].appendChild(tmp);
							tmp = next;
						}

						child.appendChild(newFonts[i]);
					}

					break;
				}
			}
		}
		else
		{
			document.execCommand('forecolor', false, (color != mxConstants.NONE) ?
				color : 'transparent');
			ui.fireEvent(new mxEventObject('styleChanged',
				'keys', [mxConstants.STYLE_FONTCOLOR],
				'values', [color], 'cells', ss.cells));
		}
	}, (defs[mxConstants.STYLE_FONTCOLOR] != null) ? defs[mxConstants.STYLE_FONTCOLOR] : graph.shapeForegroundColor,
	{
		install: function(apply) { fontColorApply = apply; },
		destroy: function() { fontColorApply = null; }
	}, null, true) : this.createCellColorOption(mxResources.get('fontColor'),
		mxConstants.STYLE_FONTCOLOR, 'default', function(color)
	{
		if (color == mxConstants.NONE)
		{
			bgPanel.style.display = 'none';
		}
		else
		{
			bgPanel.style.display = '';
		}
		
		borderPanel.style.display = bgPanel.style.display;
	}, function(color)
	{
		if (color == mxConstants.NONE)
		{
			graph.setCellStyles(mxConstants.STYLE_NOLABEL, '1', ss.cells);
		}
		else
		{
			graph.setCellStyles(mxConstants.STYLE_NOLABEL, null, ss.cells);
		}
		
		graph.setCellStyles(mxConstants.STYLE_FONTCOLOR, color, ss.cells);

		graph.updateLabelElements(ss.cells, function(elt)
		{
			elt.removeAttribute('color');
			elt.style.color = null;
		});
	}, graph.shapeForegroundColor);
	panel.style.fontWeight = 'bold';
	
	colorPanel.appendChild(panel);
	colorPanel.appendChild(bgPanel);
	
	if (!graph.cellEditor.isContentEditing())
	{
		colorPanel.appendChild(borderPanel);
	}
	
	container.appendChild(colorPanel);

	var extraPanel = this.createPanel();
	extraPanel.style.paddingTop = '2px';
	extraPanel.style.paddingBottom = '4px';
	
	var wwCells = graph.filterSelectionCells(mxUtils.bind(this, function(cell)
	{
		var state = graph.view.getState(cell);
		
		return state == null || graph.isAutoSizeState(state) ||
			graph.getModel().isEdge(cell) || (!graph.isTableRow(cell) &&
			!graph.isTableCell(cell) && !graph.isCellResizable(cell));
	}));
	
	var wwOpt = this.createCellOption(mxResources.get('wordWrap'), mxConstants.STYLE_WHITE_SPACE,
		null, 'wrap', 'null', null, null, true, wwCells);
	wwOpt.style.fontWeight = 'bold';
	
	// Word wrap in edge labels only supported via labelWidth style
	if (wwCells.length > 0)
	{
		extraPanel.appendChild(wwOpt);
	}
	
	// Delegates switch of style to formattedText action as it also convertes newlines
	var htmlOpt = this.createCellOption(mxResources.get('formattedText'), 'html', 0,
		null, null, null, ui.actions.get('formattedText'));
	htmlOpt.style.fontWeight = 'bold';
	extraPanel.appendChild(htmlOpt);
	
	var spacingPanel = this.createPanel();
	spacingPanel.style.paddingTop = '10px';
	spacingPanel.style.paddingBottom = '28px';
	spacingPanel.style.fontWeight = 'normal';
	
	var span = document.createElement('div');
	span.style.position = 'absolute';
	span.style.width = '70px';
	span.style.marginTop = '0px';
	span.style.fontWeight = 'bold';
	mxUtils.write(span, mxResources.get('spacing'));
	spacingPanel.appendChild(span);

	var topUpdate, globalUpdate, leftUpdate, bottomUpdate, rightUpdate;
	var topSpacing = this.addUnitInput(spacingPanel, 'pt', 87, 52, function()
	{
		topUpdate.apply(this, arguments);
	});
	var globalSpacing = this.addUnitInput(spacingPanel, 'pt', 16, 52, function()
	{
		globalUpdate.apply(this, arguments);
	});

	mxUtils.br(spacingPanel);
	this.addLabel(spacingPanel, mxResources.get('top'), 87, 64);
	this.addLabel(spacingPanel, mxResources.get('global'), 16, 64);
	mxUtils.br(spacingPanel);
	mxUtils.br(spacingPanel);

	var leftSpacing = this.addUnitInput(spacingPanel, 'pt', 158, 52, function()
	{
		leftUpdate.apply(this, arguments);
	});
	var bottomSpacing = this.addUnitInput(spacingPanel, 'pt', 87, 52, function()
	{
		bottomUpdate.apply(this, arguments);
	});
	var rightSpacing = this.addUnitInput(spacingPanel, 'pt', 16, 52, function()
	{
		rightUpdate.apply(this, arguments);
	});

	mxUtils.br(spacingPanel);
	this.addLabel(spacingPanel, mxResources.get('left'), 158, 64);
	this.addLabel(spacingPanel, mxResources.get('bottom'), 87, 64);
	this.addLabel(spacingPanel, mxResources.get('right'), 16, 64);
	
	if (!graph.cellEditor.isContentEditing())
	{
		container.appendChild(extraPanel);
		container.appendChild(this.createRelativeOption(mxResources.get('opacity'), mxConstants.STYLE_TEXT_OPACITY));
		container.appendChild(spacingPanel);
	}
	else
	{
		var selState = null;
		var lineHeightInput = null;
		
		container.appendChild(this.createRelativeOption(mxResources.get('lineheight'), null, null, function(input)
		{
			var value = (input.value == '') ? 120 : parseInt(input.value);
			value = Math.max(0, (isNaN(value)) ? 120 : value);

			if (selState != null)
			{
				graph.cellEditor.restoreSelection(selState);
				selState = null;
			}

			var blocks = graph.getSelectedTextBlocks();

			// Adds paragraph tags if no block element is selected
			if (blocks.length == 0 && graph.cellEditor.textarea != null &&
				graph.cellEditor.textarea.firstChild != null)
			{
				if (graph.cellEditor.textarea.firstChild.nodeName != 'P')
				{
					graph.cellEditor.textarea.innerHTML = '<p>' + graph.cellEditor.textarea.innerHTML + '</p>';
				}

				blocks = [graph.cellEditor.textarea.firstChild];
			}

			for (var i = 0; i < blocks.length; i++)
			{
				blocks[i].style.lineHeight = value + '%';
			}
			
			input.value = value + ' %';
		}, function(input)
		{
			// Used in CSS handler to update current value
			lineHeightInput = input;
			
			// KNOWN: Arrow up/down clear selection text in quirks/IE 8
			// Text size via arrow button limits to 16 in IE11. Why?
			mxEvent.addListener(input, 'mousedown', function()
			{
				if (document.activeElement == graph.cellEditor.textarea)
				{
					selState = graph.cellEditor.saveSelection();
				}
			});
			
			mxEvent.addListener(input, 'touchstart', function()
			{
				if (document.activeElement == graph.cellEditor.textarea)
				{
					selState = graph.cellEditor.saveSelection();
				}
			});
			
			input.value = '120 %';
		}));
		
		var insertPanel = stylePanel.cloneNode(false);
		insertPanel.style.paddingLeft = '0px';
		var insertBtns = this.editorUi.toolbar.addItems(['link', 'image'], insertPanel, true);

		var btns = [
		        this.editorUi.toolbar.addButton('geSprite-horizontalrule', mxResources.get('insertHorizontalRule'),
				function()
				{
					document.execCommand('inserthorizontalrule', false);
				}, insertPanel),				
				this.editorUi.toolbar.addMenuFunctionInContainer(insertPanel, 'geSprite-table', mxResources.get('table'), false, mxUtils.bind(this, function(menu)
				{
					this.editorUi.menus.addInsertTableItem(menu, null, null, false);
				}))];
		this.styleButtons(insertBtns);
		this.styleButtons(btns);
		
		var wrapper2 = this.createPanel();
		wrapper2.style.paddingTop = '10px';
		wrapper2.style.paddingBottom = '10px';
		wrapper2.appendChild(this.createTitle(mxResources.get('insert')));
		wrapper2.appendChild(insertPanel);
		container.appendChild(wrapper2);
		
		var tablePanel = stylePanel.cloneNode(false);
		tablePanel.style.paddingLeft = '0px';
		
		var btns = [
		        this.editorUi.toolbar.addButton('geSprite-insertcolumnbefore', mxResources.get('insertColumnBefore'),
	     		mxUtils.bind(this, function()
				{
					try
					{
				       	if (currentTable != null)
				       	{
				       		graph.insertColumn(currentTable, (tableCell != null) ? tableCell.cellIndex : 0);
				       	}
					}
					catch (e)
					{
						this.editorUi.handleError(e);
					}
				}), tablePanel),
				this.editorUi.toolbar.addButton('geSprite-insertcolumnafter', mxResources.get('insertColumnAfter'),
				mxUtils.bind(this, function()
				{
					try
					{
						if (currentTable != null)
				       	{
							graph.insertColumn(currentTable, (tableCell != null) ? tableCell.cellIndex + 1 : -1);
				       	}
					}
					catch (e)
					{
						this.editorUi.handleError(e);
					}
				}), tablePanel),
				this.editorUi.toolbar.addButton('geSprite-deletecolumn', mxResources.get('deleteColumn'),
				mxUtils.bind(this, function()
				{
					try
					{
						if (currentTable != null && tableCell != null)
						{
							graph.deleteColumn(currentTable, tableCell.cellIndex);
						}
					}
					catch (e)
					{
						this.editorUi.handleError(e);
					}
				}), tablePanel),
				this.editorUi.toolbar.addButton('geSprite-insertrowbefore', mxResources.get('insertRowBefore'),
				mxUtils.bind(this, function()
				{
					try
					{
						if (currentTable != null && tableRow != null)
						{
							graph.insertRow(currentTable, tableRow.sectionRowIndex);
						}
					}
					catch (e)
					{
						this.editorUi.handleError(e);
					}
				}), tablePanel),
				this.editorUi.toolbar.addButton('geSprite-insertrowafter', mxResources.get('insertRowAfter'),
				mxUtils.bind(this, function()
				{
					try
					{
						if (currentTable != null && tableRow != null)
						{
							graph.insertRow(currentTable, tableRow.sectionRowIndex + 1);
						}
					}
					catch (e)
					{
						this.editorUi.handleError(e);
					}
				}), tablePanel),
				this.editorUi.toolbar.addButton('geSprite-deleterow', mxResources.get('deleteRow'),
				mxUtils.bind(this, function()
				{
					try
					{
						if (currentTable != null && tableRow != null)
						{
							graph.deleteRow(currentTable, tableRow.sectionRowIndex);
						}
					}
					catch (e)
					{
						this.editorUi.handleError(e);
					}
				}), tablePanel)];
		this.styleButtons(btns);
		btns[2].style.marginRight = '10px';
		
		var wrapper3 = this.createPanel();
		wrapper3.style.paddingTop = '10px';
		wrapper3.style.paddingBottom = '10px';
		wrapper3.appendChild(this.createTitle(mxResources.get('table')));
		wrapper3.appendChild(tablePanel);

		var tablePanel2 = stylePanel.cloneNode(false);
		tablePanel2.style.paddingLeft = '0px';
		
		var btns = [
		        this.editorUi.toolbar.addButton('geSprite-strokecolor', mxResources.get('borderColor'),
				mxUtils.bind(this, function(evt)
				{
					if (currentTable != null)
					{
						// Converts rgb(r,g,b) values
						var color = currentTable.style.borderColor.replace(
							    /\brgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/g,
							    function($0, $1, $2, $3) {
							        return "#" + ("0"+Number($1).toString(16)).substr(-2) + ("0"+Number($2).toString(16)).substr(-2) + ("0"+Number($3).toString(16)).substr(-2);
							    });
						this.editorUi.pickColor(color, function(newColor)
						{
							var targetElt = (tableCell != null && (evt == null || !mxEvent.isShiftDown(evt))) ? tableCell : currentTable;
							
							graph.processElements(targetElt, function(elt)
							{
								elt.style.border = null;
							});
							
							if (newColor == null || newColor == mxConstants.NONE)
							{
								targetElt.removeAttribute('border');
								targetElt.style.border = '';
								targetElt.style.borderCollapse = '';
							}
							else
							{
								targetElt.setAttribute('border', '1');
								targetElt.style.border = '1px solid ' + newColor;
								targetElt.style.borderCollapse = 'collapse';
							}
						});
					}
				}), tablePanel2),
				this.editorUi.toolbar.addButton('geSprite-fillcolor', mxResources.get('backgroundColor'),
				mxUtils.bind(this, function(evt)
				{
					// Converts rgb(r,g,b) values
					if (currentTable != null)
					{
						var color = currentTable.style.backgroundColor.replace(
							    /\brgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/g,
							    function($0, $1, $2, $3) {
							        return "#" + ("0"+Number($1).toString(16)).substr(-2) + ("0"+Number($2).toString(16)).substr(-2) + ("0"+Number($3).toString(16)).substr(-2);
							    });
						this.editorUi.pickColor(color, function(newColor)
						{
							var targetElt = (tableCell != null && (evt == null || !mxEvent.isShiftDown(evt))) ? tableCell : currentTable;
							
							graph.processElements(targetElt, function(elt)
							{
								elt.style.backgroundColor = null;
							});
							
							if (newColor == null || newColor == mxConstants.NONE)
							{
								targetElt.style.backgroundColor = '';
							}
							else
							{
								targetElt.style.backgroundColor = newColor;
							}
						});
					}
				}), tablePanel2),
				this.editorUi.toolbar.addButton('geSprite-fit', mxResources.get('spacing'),
				function()
				{
					if (currentTable != null)
					{
						var value = currentTable.getAttribute('cellPadding') || 0;
						
						var dlg = new FilenameDialog(ui, value, mxResources.get('apply'), mxUtils.bind(this, function(newValue)
						{
							if (newValue != null && newValue.length > 0)
							{
								currentTable.setAttribute('cellPadding', newValue);
							}
							else
							{
								currentTable.removeAttribute('cellPadding');
							}
						}), mxResources.get('spacing'));
						ui.showDialog(dlg.container, 300, 80, true, true);
						dlg.init();
					}
				}, tablePanel2),
				this.editorUi.toolbar.addButton('geSprite-left', mxResources.get('left'),
				function()
				{
					if (currentTable != null)
					{
						currentTable.setAttribute('align', 'left');
					}
				}, tablePanel2),
				this.editorUi.toolbar.addButton('geSprite-center', mxResources.get('center'),
				function()
				{
					if (currentTable != null)
					{
						currentTable.setAttribute('align', 'center');
					}
				}, tablePanel2),
				this.editorUi.toolbar.addButton('geSprite-right', mxResources.get('right'),
				function()
				{
					if (currentTable != null)
					{
						currentTable.setAttribute('align', 'right');
					}
				}, tablePanel2)];
		this.styleButtons(btns);
		btns[2].style.marginRight = '10px';
		
		wrapper3.appendChild(tablePanel2);
		container.appendChild(wrapper3);
		
		tableWrapper = wrapper3;
	}
	
	function setSelected(elt, selected)
	{
		elt.style.backgroundImage = (selected) ? (Editor.isDarkMode() ?
			'linear-gradient(rgb(0 161 241) 0px, rgb(0, 97, 146) 100%)':
			'linear-gradient(#c5ecff 0px,#87d4fb 100%)') : '';
	};

	// Updates font style state before typing
	for (var i = 0; i < 3; i++)
	{
		(function(index)
		{
			mxEvent.addListener(fontStyleItems[index], 'click', function()
			{
				setSelected(fontStyleItems[index], fontStyleItems[index].style.backgroundImage == '');
			});
		})(i);
	}

	var listener = mxUtils.bind(this, function(sender, evt, force)
	{
		ss = ui.getSelectionState();
		var fontStyle = mxUtils.getValue(ss.style, mxConstants.STYLE_FONTSTYLE, 0);
		setSelected(fontStyleItems[0], (fontStyle & mxConstants.FONT_BOLD) == mxConstants.FONT_BOLD);
		setSelected(fontStyleItems[1], (fontStyle & mxConstants.FONT_ITALIC) == mxConstants.FONT_ITALIC);
		setSelected(fontStyleItems[2], (fontStyle & mxConstants.FONT_UNDERLINE) == mxConstants.FONT_UNDERLINE);
		fontMenu.firstChild.nodeValue = mxUtils.getValue(ss.style, mxConstants.STYLE_FONTFAMILY, Menus.prototype.defaultFont);

		setSelected(verticalItem, mxUtils.getValue(ss.style, mxConstants.STYLE_HORIZONTAL, '1') == '0');
		
		if (force || document.activeElement != input)
		{
			var tmp = parseFloat(mxUtils.getValue(ss.style, mxConstants.STYLE_FONTSIZE, Menus.prototype.defaultFontSize));
			input.value = (isNaN(tmp)) ? '' : tmp  + ' pt';
		}
		
		var align = mxUtils.getValue(ss.style, mxConstants.STYLE_ALIGN, mxConstants.ALIGN_CENTER);
		setSelected(left, align == mxConstants.ALIGN_LEFT);
		setSelected(center, align == mxConstants.ALIGN_CENTER);
		setSelected(right, align == mxConstants.ALIGN_RIGHT);
		
		var valign = mxUtils.getValue(ss.style, mxConstants.STYLE_VERTICAL_ALIGN, mxConstants.ALIGN_MIDDLE);
		setSelected(top, valign == mxConstants.ALIGN_TOP);
		setSelected(middle, valign == mxConstants.ALIGN_MIDDLE);
		setSelected(bottom, valign == mxConstants.ALIGN_BOTTOM);
		
		var pos = mxUtils.getValue(ss.style, mxConstants.STYLE_LABEL_POSITION, mxConstants.ALIGN_CENTER);
		var vpos = mxUtils.getValue(ss.style, mxConstants.STYLE_VERTICAL_LABEL_POSITION, mxConstants.ALIGN_MIDDLE);
		
		if (pos == mxConstants.ALIGN_LEFT && vpos == mxConstants.ALIGN_TOP)
		{
			positionSelect.value = 'topLeft';
		}
		else if (pos == mxConstants.ALIGN_CENTER && vpos == mxConstants.ALIGN_TOP)
		{
			positionSelect.value = 'top';
		}
		else if (pos == mxConstants.ALIGN_RIGHT && vpos == mxConstants.ALIGN_TOP)
		{
			positionSelect.value = 'topRight';
		}
		else if (pos == mxConstants.ALIGN_LEFT && vpos == mxConstants.ALIGN_BOTTOM)
		{
			positionSelect.value = 'bottomLeft';
		}
		else if (pos == mxConstants.ALIGN_CENTER && vpos == mxConstants.ALIGN_BOTTOM)
		{
			positionSelect.value = 'bottom';
		}
		else if (pos == mxConstants.ALIGN_RIGHT && vpos == mxConstants.ALIGN_BOTTOM)
		{
			positionSelect.value = 'bottomRight';
		}
		else if (pos == mxConstants.ALIGN_LEFT)
		{
			positionSelect.value = 'left';
		}
		else if (pos == mxConstants.ALIGN_RIGHT)
		{
			positionSelect.value = 'right';
		}
		else
		{
			positionSelect.value = 'center';
		}
		
		var dir = mxUtils.getValue(ss.style, mxConstants.STYLE_TEXT_DIRECTION, mxConstants.DEFAULT_TEXT_DIRECTION);
		
		if (dir == mxConstants.TEXT_DIRECTION_RTL)
		{
			dirSelect.value = 'rightToLeft';
		}
		else if (dir == mxConstants.TEXT_DIRECTION_LTR)
		{
			dirSelect.value = 'leftToRight';
		}
		else if (dir == mxConstants.TEXT_DIRECTION_AUTO)
		{
			dirSelect.value = 'automatic';
		}
		
		if (force || document.activeElement != globalSpacing)
		{
			var tmp = parseFloat(mxUtils.getValue(ss.style, mxConstants.STYLE_SPACING, 2));
			globalSpacing.value = (isNaN(tmp)) ? '' : tmp  + ' pt';
		}

		if (force || document.activeElement != topSpacing)
		{
			var tmp = parseFloat(mxUtils.getValue(ss.style, mxConstants.STYLE_SPACING_TOP, 0));
			topSpacing.value = (isNaN(tmp)) ? '' : tmp  + ' pt';
		}
		
		if (force || document.activeElement != rightSpacing)
		{
			var tmp = parseFloat(mxUtils.getValue(ss.style, mxConstants.STYLE_SPACING_RIGHT, 0));
			rightSpacing.value = (isNaN(tmp)) ? '' : tmp  + ' pt';
		}
		
		if (force || document.activeElement != bottomSpacing)
		{
			var tmp = parseFloat(mxUtils.getValue(ss.style, mxConstants.STYLE_SPACING_BOTTOM, 0));
			bottomSpacing.value = (isNaN(tmp)) ? '' : tmp  + ' pt';
		}
		
		if (force || document.activeElement != leftSpacing)
		{
			var tmp = parseFloat(mxUtils.getValue(ss.style, mxConstants.STYLE_SPACING_LEFT, 0));
			leftSpacing.value = (isNaN(tmp)) ? '' : tmp  + ' pt';
		}
	});

	globalUpdate = this.installInputHandler(globalSpacing, mxConstants.STYLE_SPACING, 2, -999, 999, ' pt');
	topUpdate = this.installInputHandler(topSpacing, mxConstants.STYLE_SPACING_TOP, 0, -999, 999, ' pt');
	rightUpdate = this.installInputHandler(rightSpacing, mxConstants.STYLE_SPACING_RIGHT, 0, -999, 999, ' pt');
	bottomUpdate = this.installInputHandler(bottomSpacing, mxConstants.STYLE_SPACING_BOTTOM, 0, -999, 999, ' pt');
	leftUpdate = this.installInputHandler(leftSpacing, mxConstants.STYLE_SPACING_LEFT, 0, -999, 999, ' pt');

	this.addKeyHandler(input, listener);
	this.addKeyHandler(globalSpacing, listener);
	this.addKeyHandler(topSpacing, listener);
	this.addKeyHandler(rightSpacing, listener);
	this.addKeyHandler(bottomSpacing, listener);
	this.addKeyHandler(leftSpacing, listener);

	graph.getModel().addListener(mxEvent.CHANGE, listener);
	this.listeners.push({destroy: function() { graph.getModel().removeListener(listener); }});
	listener();
	
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
						function getRelativeLineHeight(fontSize, css, elt)
						{
							if (elt.style != null && css != null)
							{
								var lineHeight = css.lineHeight
								
								if (elt.style.lineHeight != null && elt.style.lineHeight.substring(elt.style.lineHeight.length - 1) == '%')
								{
									return parseInt(elt.style.lineHeight) / 100;
								}
								else
								{
									return (lineHeight.substring(lineHeight.length - 2) == 'px') ?
											parseFloat(lineHeight) / fontSize : parseInt(lineHeight);
								}
							}
							else
							{
								return '';
							}
						};
						
						function getAbsoluteFontSize(css)
						{
							var fontSize = (css != null) ? css.fontSize : null;
								
							if (fontSize != null && fontSize.substring(fontSize.length - 2) == 'px')
							{
								return parseFloat(fontSize);
							}
							else
							{
								return mxConstants.DEFAULT_FONTSIZE;
							}
						};
						
						var css = mxUtils.getCurrentStyle(node);
						var fontSize = getAbsoluteFontSize(css);
						var lineHeight = getRelativeLineHeight(fontSize, css, node);

						// Finds common font size
						var elts = node.getElementsByTagName('*');

						// IE does not support containsNode
						if (elts.length > 0 && window.getSelection && !mxClient.IS_IE && !mxClient.IS_IE11)
						{
							var selection = window.getSelection();

							for (var i = 0; i < elts.length; i++)
							{
								if (selection.containsNode(elts[i], true))
								{
									temp = mxUtils.getCurrentStyle(elts[i]);
									fontSize = Math.max(getAbsoluteFontSize(temp), fontSize);
									var lh = getRelativeLineHeight(fontSize, temp, elts[i]);
									
									if (lh != lineHeight || isNaN(lh))
									{
										lineHeight = '';
									}
								}
							}
						}
						
						function hasParentOrOnlyChild(name)
						{
							if (graph.getParentByName(node, name, graph.cellEditor.textarea) != null)
							{
								return true;
							}
							else
							{
								var child = node;
								
								while (child != null && child.childNodes.length == 1)
								{
									child = child.childNodes[0];
									
									if (child.nodeName == name)
									{
										return true;
									}
								}
							}
							
							return false;
						};
						
						function isEqualOrPrefixed(str, value)
						{
							if (str != null && value != null)
							{
								if (str == value)
								{
									return true;
								}
								else if (str.length > value.length + 1)
								{
									return str.substring(str.length - value.length - 1, str.length) == '-' + value;
								}
							}
							
							return false;
						};
						
						if (css != null)
						{
							setSelected(fontStyleItems[0], css.fontWeight == 'bold' ||
								css.fontWeight > 400 || hasParentOrOnlyChild('B') ||
								hasParentOrOnlyChild('STRONG'));
							setSelected(fontStyleItems[1], css.fontStyle == 'italic' ||
								hasParentOrOnlyChild('I') || hasParentOrOnlyChild('EM'));
							setSelected(fontStyleItems[2], hasParentOrOnlyChild('U'));
							setSelected(sup, hasParentOrOnlyChild('SUP'));
							setSelected(sub, hasParentOrOnlyChild('SUB'));
							
							if (!graph.cellEditor.isTableSelected())
							{
								var align = graph.cellEditor.align || mxUtils.getValue(ss.style, mxConstants.STYLE_ALIGN, mxConstants.ALIGN_CENTER);

								if (isEqualOrPrefixed(css.textAlign, 'justify'))
								{
									setSelected(full, isEqualOrPrefixed(css.textAlign, 'justify'));
									setSelected(left, false);
									setSelected(center, false);
									setSelected(right, false);
								}
								else
								{
									setSelected(full, false);
									setSelected(left, align == mxConstants.ALIGN_LEFT);
									setSelected(center, align == mxConstants.ALIGN_CENTER);
									setSelected(right, align == mxConstants.ALIGN_RIGHT);
								}
							}
							else
							{
								setSelected(full, isEqualOrPrefixed(css.textAlign, 'justify'));
								setSelected(left, isEqualOrPrefixed(css.textAlign, 'left'));
								setSelected(center, isEqualOrPrefixed(css.textAlign, 'center'));
								setSelected(right, isEqualOrPrefixed(css.textAlign, 'right'));
							}
							
							currentTable = graph.getParentByName(node, 'TABLE', graph.cellEditor.textarea);
							tableRow = (currentTable == null) ? null : graph.getParentByName(node, 'TR', currentTable);
							tableCell = (currentTable == null) ? null : graph.getParentByNames(node, ['TD', 'TH'], currentTable);
							tableWrapper.style.display = (currentTable != null) ? '' : 'none';
							
							if (document.activeElement != input)
							{
								if (node.nodeName == 'FONT' && node.getAttribute('size') == '4' &&
									pendingFontSize != null)
								{
									node.removeAttribute('size');
									node.style.fontSize = pendingFontSize + ' pt';
									pendingFontSize = null;
								}
								else
								{
									input.value = (isNaN(fontSize)) ? '' : fontSize + ' pt';
								}
								
								var lh = parseFloat(lineHeight);
								
								if (!isNaN(lh))
								{
									lineHeightInput.value = Math.round(lh * 100) + ' %';
								}
								else
								{
									lineHeightInput.value = '100 %';
								}
							}
							
							// Updates the color picker for the current font
							if (fontColorApply != null)
							{
								if (css.color == 'rgba(0, 0, 0, 0)' ||
									css.color == 'transparent')
								{
									currentFontColor = mxConstants.NONE;
								}
								else
								{
									currentFontColor = mxUtils.rgba2hex(css.color)
								}

								fontColorApply(currentFontColor, true);
							}
							
							if (bgColorApply != null)
							{
								if (css.backgroundColor == 'rgba(0, 0, 0, 0)' ||
									css.backgroundColor == 'transparent')
								{
									currentBgColor = mxConstants.NONE;
								}
								else
								{
									currentBgColor = mxUtils.rgba2hex(css.backgroundColor);
								}
								
								bgColorApply(currentBgColor, true);
							}
							
							// Workaround for firstChild is null or not an object
							// in the log which seems to be IE8- only / 29.01.15
							if (fontMenu.firstChild != null)
							{
								fontMenu.firstChild.nodeValue = Graph.stripQuotes(css.fontFamily);
							}
						}
					}
					
					updating = false;
				}, 0);
			}
		};
		
		if (mxClient.IS_FF || mxClient.IS_EDGE || mxClient.IS_IE || mxClient.IS_IE11)
		{
			mxEvent.addListener(graph.cellEditor.textarea, 'DOMSubtreeModified', updateCssHandler);
		}
		
		mxEvent.addListener(graph.cellEditor.textarea, 'input', updateCssHandler);
		mxEvent.addListener(graph.cellEditor.textarea, 'touchend', updateCssHandler);
		mxEvent.addListener(graph.cellEditor.textarea, 'mouseup', updateCssHandler);
		mxEvent.addListener(graph.cellEditor.textarea, 'keyup', updateCssHandler);
		this.listeners.push({destroy: function()
		{
			// No need to remove listener since textarea is destroyed after edit
		}});
		updateCssHandler();
	}

	return container;
};

/**
 * Adds the label menu items to the given menu and parent.
 */
StyleFormatPanel = function(format, editorUi, container)
{
	BaseFormatPanel.call(this, format, editorUi, container);
	this.init();
};

mxUtils.extend(StyleFormatPanel, BaseFormatPanel);

/**
 * 
 */
StyleFormatPanel.prototype.defaultStrokeColor = 'black';

/**
 * Adds the label menu items to the given menu and parent.
 */
StyleFormatPanel.prototype.init = function()
{
	var ui = this.editorUi;
	var ss = ui.getSelectionState();
	
	if (!ss.containsLabel && ss.cells.length > 0)
	{
		if (ss.containsImage && ss.vertices.length == 1 && ss.style.shape == 'image' &&
			ss.style.image != null && ss.style.image.substring(0, 19) == 'data:image/svg+xml;')
		{
			this.container.appendChild(this.addSvgStyles(this.createPanel()));
		}

		if (ss.fill)
		{
			this.container.appendChild(this.addFill(this.createPanel()));
		}
	
		this.container.appendChild(this.addStroke(this.createPanel()));
		this.container.appendChild(this.addLineJumps(this.createPanel()));
		var opacityPanel = this.createRelativeOption(mxResources.get('opacity'), mxConstants.STYLE_OPACITY);
		opacityPanel.style.paddingTop = '8px';
		opacityPanel.style.paddingBottom = '10px';
		this.container.appendChild(opacityPanel);
		this.container.appendChild(this.addEffects(this.createPanel()));
	}

	var opsPanel = this.createPanel();
	opsPanel.style.paddingTop = '8px';
	
	if (ss.cells.length == 1)
	{
		this.addEditOps(opsPanel);
		
		if (opsPanel.firstChild != null)
		{
			mxUtils.br(opsPanel);
		}
	}

	if (ss.cells.length >= 1)
	{
		this.addStyleOps(opsPanel);
	}

	if (opsPanel.firstChild != null)
	{
		this.container.appendChild(opsPanel);
	}
};

/**
 * Use browser for parsing CSS.
 */
StyleFormatPanel.prototype.getCssRules = function(css)
{
	var doc = document.implementation.createHTMLDocument('');
	var styleElement = document.createElement('style');
	
	mxUtils.setTextContent(styleElement, css);
	doc.body.appendChild(styleElement);
	
	return styleElement.sheet.cssRules;
};

/**
 * Adds the label menu items to the given menu and parent.
 */
StyleFormatPanel.prototype.addSvgStyles = function(container)
{
	var ui = this.editorUi;
	var ss = ui.getSelectionState();
	container.style.paddingTop = '6px';
	container.style.paddingBottom = '6px';
	container.style.fontWeight = 'bold';
	container.style.display = 'none';

	try
	{
		var exp = ss.style.editableCssRules;
		
		if (exp != null)
		{
			var regex = new RegExp(exp);
			
			var data = ss.style.image.substring(ss.style.image.indexOf(',') + 1);
			var xml = (window.atob) ? decodeURIComponent(escape(atob((data)))) :
				Base64.decode(data, true);
			var svg = mxUtils.parseXml(xml);
			
			if (svg != null)
			{
				var styles = svg.getElementsByTagName('style');
				
				for (var i = 0; i < styles.length; i++)
				{
					var rules = this.getCssRules(mxUtils.getTextContent(styles[i]));
					
					for (var j = 0; j < rules.length; j++)
					{
						this.addSvgRule(container, rules[j], svg, styles[i], rules, j, regex);
					}
				}
			}
		}
	}
	catch (e)
	{
		// ignore
	}
	
	return container;
};

/**
 * Adds the label menu items to the given menu and parent.
 */
StyleFormatPanel.prototype.addSvgRule = function(container, rule, svg, styleElem, rules, ruleIndex, regex)
{
	var ui = this.editorUi;
	var graph = ui.editor.graph;
	
	if (regex.test(rule.selectorText))
	{
		function rgb2hex(rgb)
		{
			 rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
			 
			 return (rgb && rgb.length === 4) ? "#" +
			  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
			  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
			  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
		};
		
		var addStyleRule = mxUtils.bind(this, function(rule, key, label)
		{
			var value = mxUtils.trim(rule.style[key]);
			
			if (value != '' && value.substring(0, 4) != 'url(')
			{
				var option = this.createColorOption(label + ' ' + rule.selectorText, function()
				{
					return rgb2hex(value);
				}, mxUtils.bind(this, function(color)
				{
					rules[ruleIndex].style[key] = color;
					var cssTxt = '';
					
					for (var i = 0; i < rules.length; i++) 
					{
						cssTxt += rules[i].cssText + ' ';
					}
					
					styleElem.textContent = cssTxt;
					var xml = mxUtils.getXml(svg.documentElement);
					
					graph.setCellStyles(mxConstants.STYLE_IMAGE, 'data:image/svg+xml,' +
						((window.btoa) ? btoa(unescape(encodeURIComponent(xml))) :
							Base64.encode(xml, true)),
						ui.getSelectionState().cells);
				}), '#ffffff',
				{
					install: function(apply)
					{
						// ignore
					},
					destroy: function()
					{
						// ignore
					}
				});
			
				container.appendChild(option);
				
				// Shows container if rules are added
				container.style.display = '';
			}
		});
		
		addStyleRule(rule, 'fill', mxResources.get('fill'));
		addStyleRule(rule, 'stroke', mxResources.get('line'));
		addStyleRule(rule, 'stop-color', mxResources.get('gradient'));
	}
};

/**
 * Adds the label menu items to the given menu and parent.
 */
StyleFormatPanel.prototype.addEditOps = function(div)
{
	var ss = this.editorUi.getSelectionState();

	if (ss.cells.length == 1)
	{
		var editSelect = document.createElement('select');
		editSelect.style.width = '210px';
		editSelect.style.textAlign = 'center';
		editSelect.style.marginBottom = '2px';
		
		var ops = ['edit', 'editLink', 'editShape', 'editImage', 'editData',
			'copyData', 'pasteData', 'editConnectionPoints', 'editGeometry',
			'editTooltip', 'editStyle'];
		
		for (var i = 0; i < ops.length; i++)
		{
			var action = this.editorUi.actions.get(ops[i]);

			if (action == null || action.enabled)
			{
				var editOption = document.createElement('option');
				editOption.setAttribute('value', ops[i]);
				var title = mxResources.get(ops[i]);
				mxUtils.write(editOption, title + ((ops[i] == 'edit') ? '' : '...'));

				if (action != null && action.shortcut != null)
				{
					title += ' (' + action.shortcut + ')';
				}

				editOption.setAttribute('title', title);
				editSelect.appendChild(editOption);
			}
		}

		if (editSelect.children.length > 1)
		{
			div.appendChild(editSelect);

			mxEvent.addListener(editSelect, 'change', mxUtils.bind(this, function(evt)
			{
				var action = this.editorUi.actions.get(editSelect.value);
				editSelect.value = 'edit';

				if (action != null)
				{
					action.funct();
				}
			}));
			
			if (ss.image && ss.cells.length > 0)
			{
				var graph = this.editorUi.editor.graph;
				var state = graph.view.getState(graph.getSelectionCell());

				if (state != null && mxUtils.getValue(state.style, mxConstants.STYLE_IMAGE, null) != null)
				{
					var btn = mxUtils.button(mxResources.get('crop') + '...',
						mxUtils.bind(this, function(evt)
					{
						this.editorUi.actions.get('crop').funct();
					}));

					btn.setAttribute('title', mxResources.get('crop'));
					editSelect.style.width = '104px';
					btn.style.width = '104px';
					btn.style.marginLeft = '2px';
					btn.style.marginBottom = '2px';

					div.appendChild(btn);
				}
			}
		}
	}

	return div;
};

/**
 * Adds the label menu items to the given menu and parent.
 */
StyleFormatPanel.prototype.addFill = function(container)
{
	var ui = this.editorUi;
	var graph = ui.editor.graph;
	var ss = ui.getSelectionState();
	container.style.paddingTop = '6px';
	container.style.paddingBottom = '6px';

	// Adds gradient direction option
	var gradientSelect = document.createElement('select');
	gradientSelect.style.position = 'absolute';
	gradientSelect.style.left = '104px';
	gradientSelect.style.width = '70px';
	gradientSelect.style.height = '22px';
	gradientSelect.style.padding = '0px';
	gradientSelect.style.marginTop = '-3px';
	gradientSelect.style.borderWidth = '1px';
	gradientSelect.style.borderStyle = 'solid';
	gradientSelect.style.boxSizing = 'border-box';
	
	var fillStyleSelect = gradientSelect.cloneNode(false);
	
	// Stops events from bubbling to color option event handler
	mxEvent.addListener(gradientSelect, 'click', function(evt)
	{
		mxEvent.consume(evt);
	});
	mxEvent.addListener(fillStyleSelect, 'click', function(evt)
	{
		mxEvent.consume(evt);
	});
	
	var gradientPanel = this.createCellColorOption(mxResources.get('gradient'),
		mxConstants.STYLE_GRADIENTCOLOR, 'default', function(color)
	{
		if (color == null || color == mxConstants.NONE)
		{
			gradientSelect.style.display = 'none';
		}
		else
		{
			gradientSelect.style.display = '';
		}
	}, function(color)
	{
		graph.updateCellStyles({'gradientColor': color}, graph.getSelectionCells());
	}, graph.getDefaultColor(ss.style, mxConstants.STYLE_GRADIENTCOLOR,
		graph.shapeForegroundColor, graph.shapeBackgroundColor));

	var fillKey = (ss.style.shape == 'image') ? mxConstants.STYLE_IMAGE_BACKGROUND : mxConstants.STYLE_FILLCOLOR;

	var fillPanel = this.createCellColorOption(mxResources.get('fill'),
		fillKey, 'default', null, mxUtils.bind(this, function(color)
	{
		graph.setCellStyles(fillKey, color, ss.cells);
	}), graph.getDefaultColor(ss.style, fillKey, graph.shapeBackgroundColor,
		graph.shapeForegroundColor));

	fillPanel.style.fontWeight = 'bold';
	var tmpColor = mxUtils.getValue(ss.style, fillKey, null);
	gradientPanel.style.display = (tmpColor != null && tmpColor != mxConstants.NONE &&
		ss.fill && ss.style.shape != 'image') ? '' : 'none';

	var directions = [mxConstants.DIRECTION_NORTH, mxConstants.DIRECTION_EAST,
	                  mxConstants.DIRECTION_SOUTH, mxConstants.DIRECTION_WEST,
					  mxConstants.DIRECTION_RADIAL];

	for (var i = 0; i < directions.length; i++)
	{
		var gradientOption = document.createElement('option');
		gradientOption.setAttribute('value', directions[i]);
		mxUtils.write(gradientOption, mxResources.get(directions[i]));
		gradientSelect.appendChild(gradientOption);
	}
	
	gradientPanel.appendChild(gradientSelect);
	
	var curFillStyle;

	function populateFillStyle()
	{
		fillStyleSelect.innerHTML = '';
		curFillStyle = 1;
		
		for (var i = 0; i < Editor.fillStyles.length; i++)
		{
			var fillStyleOption = document.createElement('option');
			fillStyleOption.setAttribute('value', Editor.fillStyles[i].val);
			mxUtils.write(fillStyleOption, Editor.fillStyles[i].dispName);
			fillStyleSelect.appendChild(fillStyleOption);
		}
	};

	function populateRoughFillStyle()
	{
		fillStyleSelect.innerHTML = '';
		curFillStyle = 2;

		for (var i = 0; i < Editor.roughFillStyles.length; i++)
		{
			var fillStyleOption = document.createElement('option');
			fillStyleOption.setAttribute('value', Editor.roughFillStyles[i].val);
			mxUtils.write(fillStyleOption, Editor.roughFillStyles[i].dispName);
			fillStyleSelect.appendChild(fillStyleOption);
		}

		fillStyleSelect.value = 'auto';
	};

	populateFillStyle();

	if (ss.gradient)
	{
		fillPanel.appendChild(fillStyleSelect);
	}

	var listener = mxUtils.bind(this, function()
	{
		ss = ui.getSelectionState();
		var value = mxUtils.getValue(ss.style, mxConstants.STYLE_GRADIENT_DIRECTION,
			mxConstants.DIRECTION_SOUTH);
		var fillStyle = mxUtils.getValue(ss.style, 'fillStyle', 'auto');
		
		// Handles empty string which is not allowed as a value
		if (value == '')
		{
			value = mxConstants.DIRECTION_SOUTH;
		}
		
		gradientSelect.value = value;
		container.style.display = (ss.fill) ? '' : 'none';
		
		var fillColor = mxUtils.getValue(ss.style, fillKey, null);
		
		if (!ss.fill || fillColor == null || fillColor == mxConstants.NONE ||
			ss.style.shape == 'filledEdge')
		{
			fillStyleSelect.style.display = 'none';
			gradientPanel.style.display = 'none';
		}
		else
		{
			if (ss.style.sketch == '1')
			{
				if (curFillStyle != 2)
				{
					populateRoughFillStyle()
				}
			}
			else if (curFillStyle != 1)
			{
				populateFillStyle();
			}
			
			fillStyleSelect.value = fillStyle;

			//In case of switching from sketch to regular and fill type is not there
			if (!fillStyleSelect.value)
			{
				fillStyle = 'auto';
				fillStyleSelect.value = fillStyle;
			}

			fillStyleSelect.style.display = ss.style.sketch == '1' ||
				gradientSelect.style.display == 'none'? '' : 'none';
			gradientPanel.style.display = (ss.gradient &&
				!ss.containsImage && (ss.style.sketch != '1' ||
				fillStyle == 'solid' || fillStyle == 'auto')) ?
				'' : 'none';
		}
	});
	
	graph.getModel().addListener(mxEvent.CHANGE, listener);
	this.listeners.push({destroy: function() { graph.getModel().removeListener(listener); }});
	listener();

	mxEvent.addListener(gradientSelect, 'change', function(evt)
	{
		graph.setCellStyles(mxConstants.STYLE_GRADIENT_DIRECTION, gradientSelect.value, ss.cells);
		ui.fireEvent(new mxEventObject('styleChanged', 'keys', [mxConstants.STYLE_GRADIENT_DIRECTION],
			'values', [gradientSelect.value], 'cells', ss.cells));
		mxEvent.consume(evt);
	});
	
	mxEvent.addListener(fillStyleSelect, 'change', function(evt)
	{
		graph.setCellStyles('fillStyle', fillStyleSelect.value, ss.cells);
		ui.fireEvent(new mxEventObject('styleChanged', 'keys', ['fillStyle'],
			'values', [fillStyleSelect.value], 'cells', ss.cells));
		mxEvent.consume(evt);
	});
	
	container.appendChild(fillPanel);
	container.appendChild(gradientPanel);
	
	// Adds custom colors
	var custom = this.getCustomColors();
	
	for (var i = 0; i < custom.length; i++)
	{
		container.appendChild(this.createCellColorOption(custom[i].title,
			custom[i].key, custom[i].defaultValue));
	}
	
	return container;
};

/**
 * Adds the label menu items to the given menu and parent.
 */
StyleFormatPanel.prototype.getCustomColors = function()
{
	var ss = this.editorUi.getSelectionState();
	var result = [];
	
	if (ss.swimlane)
	{
		result.push({title: mxResources.get('laneColor'),
			key: 'swimlaneFillColor', defaultValue: 'default'});
	}
	
	return result;
};

/**
 * Adds the label menu items to the given menu and parent.
 */
StyleFormatPanel.prototype.addStroke = function(container)
{
	var ui = this.editorUi;
	var graph = ui.editor.graph;
	var ss = ui.getSelectionState();
	
	container.style.paddingTop = '6px';
	container.style.paddingBottom = '4px';
	container.style.whiteSpace = 'normal';
	
	var colorPanel = document.createElement('div');
	colorPanel.style.fontWeight = 'bold';
	
	if (!ss.stroke)
	{
		colorPanel.style.display = 'none';
	}
	
	// Adds gradient direction option
	var styleSelect = document.createElement('select');
	styleSelect.style.position = 'absolute';
	styleSelect.style.height = '22px';
	styleSelect.style.padding = '0px';
	styleSelect.style.marginTop = '-3px';
	styleSelect.style.textAlign = 'center';
	styleSelect.style.boxSizing = 'border-box';
	styleSelect.style.left = '90px';
	styleSelect.style.width = '83px';
	styleSelect.style.borderWidth = '1px';
	styleSelect.style.borderStyle = 'solid';

	var styles = ['sharp', 'rounded', 'curved'];

	for (var i = 0; i < styles.length; i++)
	{
		var styleOption = document.createElement('option');
		styleOption.setAttribute('value', styles[i]);
		mxUtils.write(styleOption, mxResources.get(styles[i]));
		styleSelect.appendChild(styleOption);
	}
	
	mxEvent.addListener(styleSelect, 'change', function(evt)
	{
		graph.getModel().beginUpdate();
		try
		{
			var keys = [mxConstants.STYLE_ROUNDED, mxConstants.STYLE_CURVED];
			// Default for rounded is 1
			var values = ['0', null];
			
			if (styleSelect.value == 'rounded')
			{
				values = ['1', null];
			}
			else if (styleSelect.value == 'curved')
			{
				values = [null, '1'];
			}
			
			for (var i = 0; i < keys.length; i++)
			{
				graph.setCellStyles(keys[i], values[i], ss.cells);
			}
			
			ui.fireEvent(new mxEventObject('styleChanged', 'keys', keys,
				'values', values, 'cells', ss.cells));
		}
		finally
		{
			graph.getModel().endUpdate();
		}
		
		mxEvent.consume(evt);
	});
	
	// Stops events from bubbling to color option event handler
	mxEvent.addListener(styleSelect, 'click', function(evt)
	{
		mxEvent.consume(evt);
	});

	var strokeKey = (ss.style.shape == 'image') ? mxConstants.STYLE_IMAGE_BORDER : mxConstants.STYLE_STROKECOLOR;
	var label = (ss.style.shape == 'image') ? mxResources.get('border') : mxResources.get('line');

	var lineColor = this.createCellColorOption(label, strokeKey, 'default', null, mxUtils.bind(this, function(color)
	{
		graph.setCellStyles(strokeKey, color, ss.cells);

		// Sets strokeColor to inherit for rows and cells in tables
		if (color == null || color == mxConstants.NONE)
		{
			var tableCells = [];

			for (var i = 0; i < ss.cells.length; i++)
			{
				if (graph.isTableCell(ss.cells[i]) ||
					graph.isTableRow(ss.cells[i]))
				{
					tableCells.push(ss.cells[i]);
				}
			}

			if (tableCells.length > 0)
			{
				graph.setCellStyles(strokeKey, 'inherit', tableCells);
			}
		}
	}), graph.shapeForegroundColor);
	
	lineColor.appendChild(styleSelect);
	colorPanel.appendChild(lineColor);
	
	// Used if only edges selected
	var stylePanel = colorPanel.cloneNode(false);
	stylePanel.style.display = 'inline-flex';
	stylePanel.style.alignItems = 'top';
	stylePanel.style.fontWeight = 'normal';
	stylePanel.style.whiteSpace = 'nowrap';
	stylePanel.style.position = 'relative';
	stylePanel.style.paddingLeft = '5px';
	stylePanel.style.overflow = 'hidden';
	stylePanel.style.marginTop = '2px';
	stylePanel.style.width = '220px';

	var addItem = mxUtils.bind(this, function(menu, width, cssName, keys, values)
	{
		var item = this.editorUi.menus.styleChange(menu, '', keys, values, 'geIcon', null);
	
		var pat = document.createElement('div');
		pat.style.width = width + 'px';
		pat.style.height = '1px';
		pat.style.borderBottom = '1px ' + cssName + ' ' + this.defaultStrokeColor;
		pat.style.paddingTop = '6px';

		item.firstChild.firstChild.style.padding = '0px 4px 0px 4px';
		item.firstChild.firstChild.style.width = width + 'px';
		item.firstChild.firstChild.appendChild(pat);
		
		return item;
	});

	var pattern = this.editorUi.toolbar.addMenuFunctionInContainer(stylePanel, 'geSprite-orthogonal', mxResources.get('pattern'), false, mxUtils.bind(this, function(menu)
	{
		addItem(menu, 75, 'solid', [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN], [null, null]).setAttribute('title', mxResources.get('solid'));
		addItem(menu, 75, 'dashed', [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN], ['1', null]).setAttribute('title', mxResources.get('dashed') + ' (1)');
		addItem(menu, 75, 'dashed', [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN], ['1', '8 8']).setAttribute('title', mxResources.get('dashed') + ' (2)');
		addItem(menu, 75, 'dashed', [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN], ['1', '12 12']).setAttribute('title', mxResources.get('dashed') + ' (3)');
		addItem(menu, 75, 'dotted', [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN], ['1', '1 1']).setAttribute('title', mxResources.get('dotted') + ' (1)');
		addItem(menu, 75, 'dotted', [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN], ['1', '1 2']).setAttribute('title', mxResources.get('dotted') + ' (2)');
		addItem(menu, 75, 'dotted', [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN], ['1', '1 4']).setAttribute('title', mxResources.get('dotted') + ' (3)');
	}));
	
	// Used for mixed selection (vertices and edges)
	var altStylePanel = stylePanel.cloneNode(false);

	var edgeShape = this.editorUi.toolbar.addMenuFunctionInContainer(altStylePanel, 'geSprite-connection', mxResources.get('connection'), false, mxUtils.bind(this, function(menu)
	{
		this.editorUi.menus.styleChange(menu, '', [mxConstants.STYLE_SHAPE, mxConstants.STYLE_STARTSIZE, mxConstants.STYLE_ENDSIZE, 'width'],
			[null, null, null, null], 'geIcon geSprite geSprite-connection', null, null, null, true).setAttribute('title', mxResources.get('line'));
		this.editorUi.menus.styleChange(menu, '', [mxConstants.STYLE_SHAPE, mxConstants.STYLE_STARTSIZE, mxConstants.STYLE_ENDSIZE, 'width'],
			['link', null, null, null], 'geIcon geSprite geSprite-linkedge', null, null, null, true).setAttribute('title', mxResources.get('link'));
		this.editorUi.menus.styleChange(menu, '', [mxConstants.STYLE_SHAPE, mxConstants.STYLE_STARTSIZE, mxConstants.STYLE_ENDSIZE, 'width'],
			['flexArrow', null, null, null], 'geIcon geSprite geSprite-arrow', null, null, null, true).setAttribute('title', mxResources.get('arrow'));
		this.editorUi.menus.styleChange(menu, '', [mxConstants.STYLE_SHAPE, mxConstants.STYLE_STARTSIZE, mxConstants.STYLE_ENDSIZE, 'width'],
			['arrow', null, null, null], 'geIcon geSprite geSprite-simplearrow', null, null, null, true).setAttribute('title', mxResources.get('simpleArrow')); 
	}));

	var altPattern = this.editorUi.toolbar.addMenuFunctionInContainer(altStylePanel, 'geSprite-orthogonal', mxResources.get('pattern'), false, mxUtils.bind(this, function(menu)
	{
		addItem(menu, 33, 'solid', [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN], [null, null]).setAttribute('title', mxResources.get('solid'));
		addItem(menu, 33, 'dashed', [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN], ['1', null]).setAttribute('title', mxResources.get('dashed') + ' (1)');
		addItem(menu, 33, 'dashed', [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN], ['1', '8 8']).setAttribute('title', mxResources.get('dashed') + ' (2)');
		addItem(menu, 33, 'dashed', [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN], ['1', '12 12']).setAttribute('title', mxResources.get('dashed') + ' (3)');
		addItem(menu, 33, 'dotted', [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN], ['1', '1 1']).setAttribute('title', mxResources.get('dotted') + ' (1)');
		addItem(menu, 33, 'dotted', [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN], ['1', '1 2']).setAttribute('title', mxResources.get('dotted') + ' (2)');
		addItem(menu, 33, 'dotted', [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN], ['1', '1 4']).setAttribute('title', mxResources.get('dotted') + ' (3)');
	}));
	
	var stylePanel2 = stylePanel.cloneNode(false);

	// Stroke width
	var input = document.createElement('input');
	input.style.position = 'absolute';
	input.style.textAlign = 'right';
	input.style.marginTop = '2px';
	input.style.width = '52px';
	input.style.height = '22px';
	input.style.left = '146px';
	input.style.borderWidth = '1px';
	input.style.borderStyle = 'solid';
	input.style.boxSizing = 'border-box';
	input.setAttribute('title', mxResources.get('linewidth'));
	
	stylePanel.appendChild(input);
	
	var altInput = input.cloneNode(true);
	altStylePanel.appendChild(altInput);

	function update(evt)
	{
		// Maximum stroke width is 999
		var value = parseFloat(input.value);
		value = Math.min(999, Math.max(0, (isNaN(value)) ? 1 : value));
		
		if (value != mxUtils.getValue(ss.style, mxConstants.STYLE_STROKEWIDTH, 1))
		{
			graph.setCellStyles(mxConstants.STYLE_STROKEWIDTH, value, ss.cells);
			ui.fireEvent(new mxEventObject('styleChanged', 'keys', [mxConstants.STYLE_STROKEWIDTH],
					'values', [value], 'cells', ss.cells));
		}

		input.value = value + ' pt';
		mxEvent.consume(evt);
	};

	function altUpdate(evt)
	{
		// Maximum stroke width is 999
		var value = parseFloat(altInput.value);
		value = Math.min(999, Math.max(0, (isNaN(value)) ? 1 : value));
		
		if (value != mxUtils.getValue(ss.style, mxConstants.STYLE_STROKEWIDTH, 1))
		{
			graph.setCellStyles(mxConstants.STYLE_STROKEWIDTH, value, ss.cells);
			ui.fireEvent(new mxEventObject('styleChanged', 'keys', [mxConstants.STYLE_STROKEWIDTH],
					'values', [value], 'cells', ss.cells));
		}

		altInput.value = value + ' pt';
		mxEvent.consume(evt);
	};

	var stepper = this.createStepper(input, update, 1, 9);
	stepper.style.display = input.style.display;
	stepper.style.top = '2px';
	stepper.style.left = '198px';
	stylePanel.appendChild(stepper);

	var altStepper = this.createStepper(altInput, altUpdate, 1, 9);
	altStepper.style.display = altInput.style.display;
	altInput.style.position = 'absolute';
	altStepper.style.top = '2px';
	altStepper.style.left = '198px';
	altStylePanel.appendChild(altStepper);
	
	mxEvent.addListener(input, 'blur', update);
	mxEvent.addListener(input, 'change', update);

	mxEvent.addListener(altInput, 'blur', altUpdate);
	mxEvent.addListener(altInput, 'change', altUpdate);
	
	var edgeStyle = this.editorUi.toolbar.addMenuFunctionInContainer(stylePanel2, 'geSprite-orthogonal', mxResources.get('waypoints'), false, mxUtils.bind(this, function(menu)
	{
		if (ss.style.shape != 'arrow')
		{
			this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_EDGE, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE], [null, null, null], 'geIcon geSprite geSprite-straight', null, true).setAttribute('title', mxResources.get('straight'));
			this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_EDGE, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE], ['orthogonalEdgeStyle', null, null], 'geIcon geSprite geSprite-orthogonal', null, true).setAttribute('title', mxResources.get('orthogonal'));
			this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_EDGE, mxConstants.STYLE_ELBOW, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE], ['elbowEdgeStyle', null, null, null], 'geIcon geSprite geSprite-horizontalelbow', null, true).setAttribute('title', mxResources.get('vertical'));
			this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_EDGE, mxConstants.STYLE_ELBOW, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE], ['elbowEdgeStyle', 'vertical', null, null], 'geIcon geSprite geSprite-verticalelbow', null, true).setAttribute('title', mxResources.get('horizontal'));
			this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_EDGE, mxConstants.STYLE_ELBOW, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE], ['isometricEdgeStyle', null, null, null], 'geIcon geSprite geSprite-horizontalisometric', null, true).setAttribute('title', mxResources.get('isometric'));
			this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_EDGE, mxConstants.STYLE_ELBOW, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE], ['isometricEdgeStyle', 'vertical', null, null], 'geIcon geSprite geSprite-verticalisometric', null, true).setAttribute('title', mxResources.get('isometric'));
	
			if (ss.style.shape == 'connector')
			{
				this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_EDGE, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE], ['orthogonalEdgeStyle', '1', null], 'geIcon geSprite geSprite-curved', null, true).setAttribute('title', mxResources.get('curved'));
			}
			
			this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_EDGE, mxConstants.STYLE_CURVED, mxConstants.STYLE_NOEDGESTYLE], ['entityRelationEdgeStyle', null, null], 'geIcon geSprite geSprite-entity', null, true).setAttribute('title', mxResources.get('entityRelation'));
		}
	}));

	var lineStart = this.editorUi.toolbar.addMenuFunctionInContainer(stylePanel2, 'geSprite-startclassic', mxResources.get('linestart'), false, mxUtils.bind(this, function(menu)
	{
		if (ss.style.shape == 'connector' || ss.style.shape == 'flexArrow' || ss.style.shape == 'filledEdge' || ss.style.shape == 'wire')
		{
			var item = this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], [mxConstants.NONE, 0], 'geIcon', null, false);
			item.setAttribute('title', mxResources.get('none'));

			var font = document.createElement('span');
			font.style.fontSize = '11px';
			mxUtils.write(font, mxResources.get('none'));
			item.firstChild.firstChild.appendChild(font);

			if (ss.style.shape == 'connector' || ss.style.shape == 'filledEdge' || ss.style.shape == 'wire')
			{
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], [mxConstants.ARROW_CLASSIC, 1], null, null, false, Format.classicFilledMarkerImage.src));
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], [mxConstants.ARROW_CLASSIC_THIN, 1], null, null, false, Format.classicThinFilledMarkerImage.src));
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], [mxConstants.ARROW_OPEN, 0], null, null, false, Format.openFilledMarkerImage.src));
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], [mxConstants.ARROW_OPEN_THIN, 0], null, null, false, Format.openThinFilledMarkerImage.src));
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], ['openAsync', 0], null, null, false, Format.openAsyncFilledMarkerImage.src));
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], [mxConstants.ARROW_BLOCK, 1], null, null, false, Format.blockFilledMarkerImage.src));
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], [mxConstants.ARROW_BLOCK_THIN, 1], null, null, false, Format.blockThinFilledMarkerImage.src));
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], ['async', 1], null, null, false, Format.asyncFilledMarkerImage.src));
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], [mxConstants.ARROW_OVAL, 1], null, null, false, Format.ovalFilledMarkerImage.src));
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], [mxConstants.ARROW_DIAMOND, 1], null, null, false, Format.diamondFilledMarkerImage.src));
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], [mxConstants.ARROW_DIAMOND_THIN, 1], null, null, false, Format.diamondThinFilledMarkerImage.src));
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], [mxConstants.ARROW_CLASSIC, 0], null, null, false, Format.classicMarkerImage.src));
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], [mxConstants.ARROW_CLASSIC_THIN, 0], null, null, false, Format.classicThinMarkerImage.src));
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], [mxConstants.ARROW_BLOCK, 0], null, null, false, Format.blockMarkerImage.src));
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], [mxConstants.ARROW_BLOCK_THIN, 0], null, null, false, Format.blockThinMarkerImage.src));
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], ['async', 0], null, null, false, Format.asyncMarkerImage.src));
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], [mxConstants.ARROW_OVAL, 0], null, null, false, Format.ovalMarkerImage.src));
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], [mxConstants.ARROW_DIAMOND, 0], null, null, false, Format.diamondMarkerImage.src));
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], [mxConstants.ARROW_DIAMOND_THIN, 0], null, null, false, Format.diamondThinMarkerImage.src));
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], ['box', 0], null, null, false, Format.boxMarkerImage.src));
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], ['halfCircle', 0], null, null, false, Format.halfCircleMarkerImage.src));
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], ['dash', 0], null, null, false, Format.dashMarkerImage.src));
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], ['cross', 0], null, null, false, Format.crossMarkerImage.src));
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], ['circlePlus', 0], null, null, false, Format.circlePlusMarkerImage.src));
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], ['circle', 1], null, null, false, Format.circleMarkerImage.src));
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], ['baseDash', 0], null, null, false, Format.baseDashMarkerImage.src));
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], ['ERone', 0], null, null, false, Format.EROneMarkerImage.src));
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], ['ERmandOne', 0], null, null, false, Format.ERmandOneMarkerImage.src));
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], ['ERmany', 0], null, null, false, Format.ERmanyMarkerImage.src));
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], ['ERoneToMany', 0], null, null, false, Format.ERoneToManyMarkerImage.src));
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], ['ERzeroToOne', 0], null, null, false, Format.ERzeroToOneMarkerImage.src));
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], ['ERzeroToMany', 0], null, null, false, Format.ERzeroToManyMarkerImage.src));
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], ['doubleBlock', 0], null, null, false, Format.doubleBlockMarkerImage.src));
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW, 'startFill'], ['doubleBlock', 1], null, null, false, Format.doubleBlockFilledMarkerImage.src));
			}
			else
			{
				this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_STARTARROW], [mxConstants.ARROW_BLOCK], 'geIcon geSprite geSprite-startblocktrans', null, false).setAttribute('title', mxResources.get('block'));
			}

			menu.div.style.width = '40px';

			window.setTimeout(mxUtils.bind(this, function()
			{
				if (menu.div != null)
				{
					mxUtils.fit(menu.div);
				}
			}), 0);
		}
	}));

	var lineEnd = this.editorUi.toolbar.addMenuFunctionInContainer(stylePanel2, 'geSprite-endclassic', mxResources.get('lineend'), false, mxUtils.bind(this, function(menu)
	{
		if (ss.style.shape == 'connector' || ss.style.shape == 'flexArrow' || ss.style.shape == 'filledEdge' || ss.style.shape == 'wire')
		{
			var item = this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], [mxConstants.NONE, 0], 'geIcon', null, false);
			item.setAttribute('title', mxResources.get('none'));

			var font = document.createElement('span');
			font.style.fontSize = '11px';
			mxUtils.write(font, mxResources.get('none'));
			item.firstChild.firstChild.appendChild(font);
			
			if (ss.style.shape == 'connector' || ss.style.shape == 'filledEdge' || ss.style.shape == 'wire')
			{
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], [mxConstants.ARROW_CLASSIC, 1], null, null, false, Format.classicFilledMarkerImage.src), 'scaleX(-1)');
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], [mxConstants.ARROW_CLASSIC_THIN, 1], null, null, false, Format.classicThinFilledMarkerImage.src), 'scaleX(-1)');
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], [mxConstants.ARROW_OPEN, 0], null, null, false, Format.openFilledMarkerImage.src), 'scaleX(-1)');
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], [mxConstants.ARROW_OPEN_THIN, 0], null, null, false, Format.openThinFilledMarkerImage.src), 'scaleX(-1)');
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], ['openAsync', 0], null, null, false, Format.openAsyncFilledMarkerImage.src), 'scaleX(-1)');
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], [mxConstants.ARROW_BLOCK, 1], null, null, false, Format.blockFilledMarkerImage.src), 'scaleX(-1)');
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], [mxConstants.ARROW_BLOCK_THIN, 1], null, null, false, Format.blockThinFilledMarkerImage.src), 'scaleX(-1)');
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], ['async', 1], null, null, false, Format.asyncFilledMarkerImage.src), 'scaleX(-1)');
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], [mxConstants.ARROW_OVAL, 1], null, null, false, Format.ovalFilledMarkerImage.src), 'scaleX(-1)');
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], [mxConstants.ARROW_DIAMOND, 1], null, null, false, Format.diamondFilledMarkerImage.src), 'scaleX(-1)');
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], [mxConstants.ARROW_DIAMOND_THIN, 1], null, null, false, Format.diamondThinFilledMarkerImage.src), 'scaleX(-1)');
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], [mxConstants.ARROW_CLASSIC, 0], null, null, false, Format.classicMarkerImage.src), 'scaleX(-1)');
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], [mxConstants.ARROW_CLASSIC_THIN, 0], null, null, false, Format.classicThinMarkerImage.src), 'scaleX(-1)');
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], [mxConstants.ARROW_BLOCK, 0], null, null, false, Format.blockMarkerImage.src), 'scaleX(-1)');
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], [mxConstants.ARROW_BLOCK_THIN, 0], null, null, false, Format.blockThinMarkerImage.src), 'scaleX(-1)');
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], ['async', 0], null, null, false, Format.asyncMarkerImage.src), 'scaleX(-1)');
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], [mxConstants.ARROW_OVAL, 0], null, null, false, Format.ovalMarkerImage.src), 'scaleX(-1)');
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], [mxConstants.ARROW_DIAMOND, 0], null, null, false, Format.diamondMarkerImage.src), 'scaleX(-1)');
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], [mxConstants.ARROW_DIAMOND_THIN, 0], null, null, false, Format.diamondThinMarkerImage.src), 'scaleX(-1)');
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], ['box', 0], null, null, false, Format.boxMarkerImage.src), 'scaleX(-1)');
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], ['halfCircle', 0], null, null, false, Format.halfCircleMarkerImage.src), 'scaleX(-1)');
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], ['dash', 0], null, null, false, Format.dashMarkerImage.src), 'scaleX(-1)');
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], ['cross', 0], null, null, false, Format.crossMarkerImage.src), 'scaleX(-1)');
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], ['circlePlus', 0], null, null, false, Format.circlePlusMarkerImage.src), 'scaleX(-1)');
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], ['circle', 0], null, null, false, Format.circleMarkerImage.src), 'scaleX(-1)');
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], ['baseDash', 0], null, null, false, Format.baseDashMarkerImage.src), 'scaleX(-1)');
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], ['ERone', 0], null, null, false, Format.EROneMarkerImage.src), 'scaleX(-1)');
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], ['ERmandOne', 0], null, null, false, Format.ERmandOneMarkerImage.src), 'scaleX(-1)');
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], ['ERmany', 0], null, null, false, Format.ERmanyMarkerImage.src), 'scaleX(-1)');
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], ['ERoneToMany', 0], null, null, false, Format.ERoneToManyMarkerImage.src), 'scaleX(-1)');
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], ['ERzeroToOne', 0], null, null, false, Format.ERzeroToOneMarkerImage.src), 'scaleX(-1)');
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], ['ERzeroToMany', 0], null, null, false, Format.ERzeroToManyMarkerImage.src), 'scaleX(-1)');
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], ['doubleBlock', 0], null, null, false, Format.doubleBlockMarkerImage.src), 'scaleX(-1)');
				Format.processMenuIcon(this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW, 'endFill'], ['doubleBlock', 1], null, null, false, Format.doubleBlockFilledMarkerImage.src), 'scaleX(-1)');
			}
			else
			{
				this.editorUi.menus.edgeStyleChange(menu, '', [mxConstants.STYLE_ENDARROW], [mxConstants.ARROW_BLOCK], 'geIcon geSprite geSprite-endblocktrans', null, false).setAttribute('title', mxResources.get('block'));
			}

			menu.div.style.width = '40px';

			window.setTimeout(mxUtils.bind(this, function()
			{
				if (menu.div != null)
				{
					mxUtils.fit(menu.div);
				}
			}), 0);
		}
	}));

	this.addArrow(edgeShape);
	this.addArrow(edgeStyle).style.marginTop = '-1px';
	this.addArrow(lineStart);
	this.addArrow(lineEnd);
	
	var symbol = this.addArrow(pattern);
	symbol.className = 'geIcon';
	pattern.style.width = '134px';

	var altSymbol = this.addArrow(altPattern);
	altSymbol.className = 'geIcon';
	altSymbol.style.width = '22px';
	
	var solid = document.createElement('div');
	solid.style.width = '102px';
	solid.style.height = '10px';
	solid.style.borderBottom = '1px solid ' + this.defaultStrokeColor;
	solid.style.marginLeft = '10px';
	symbol.appendChild(solid);
	
	var altSolid = document.createElement('div');
	altSolid.style.width = '30px';
	altSolid.style.height = '10px';
	altSolid.style.borderBottom = '1px solid ' + this.defaultStrokeColor;
	altSolid.style.marginLeft = '10px';
	altSymbol.appendChild(altSolid);

	container.appendChild(colorPanel);
	container.appendChild(altStylePanel);
	container.appendChild(stylePanel);

	var arrowPanel = stylePanel.cloneNode(false);
	arrowPanel.style.display = 'block';
	arrowPanel.style.padding = '5px 4px 6px 0px';
	arrowPanel.style.fontWeight = 'normal';
	
	var span = document.createElement('div');
	span.style.position = 'absolute';
	span.style.maxWidth = '78px';
	span.style.overflow = 'hidden';
	span.style.textOverflow = 'ellipsis';
	span.style.marginLeft = '0px';
	span.style.marginBottom = '12px';
	span.style.marginTop = '2px';
	span.style.fontWeight = 'normal';
	
	mxUtils.write(span, mxResources.get('lineend'));
	arrowPanel.appendChild(span);
	
	var endSpacingUpdate, endSizeUpdate;
	var endSpacing = this.addUnitInput(arrowPanel, 'pt', 98, 52, function()
	{
		endSpacingUpdate.apply(this, arguments);
	});
	var endSize = this.addUnitInput(arrowPanel, 'pt', 30, 52, function()
	{
		endSizeUpdate.apply(this, arguments);
	});

	mxUtils.br(arrowPanel);
	
	var spacer = document.createElement('div');
	spacer.style.height = '8px';
	arrowPanel.appendChild(spacer);
	
	span = span.cloneNode(false);
	mxUtils.write(span, mxResources.get('linestart'));
	arrowPanel.appendChild(span);
	
	var startSpacingUpdate, startSizeUpdate;
	var startSpacing = this.addUnitInput(arrowPanel, 'pt', 98, 52, function()
	{
		startSpacingUpdate.apply(this, arguments);
	});
	var startSize = this.addUnitInput(arrowPanel, 'pt', 30, 52, function()
	{
		startSizeUpdate.apply(this, arguments);
	});

	mxUtils.br(arrowPanel);
	this.addLabel(arrowPanel, mxResources.get('spacing'),
		98, 64).style.fontSize = '11px';
	this.addLabel(arrowPanel, mxResources.get('size'),
		30, 64).style.fontSize = '11px';
	mxUtils.br(arrowPanel);
	
	var perimeterPanel = colorPanel.cloneNode(false);
	perimeterPanel.style.fontWeight = 'normal';
	perimeterPanel.style.position = 'relative';
	perimeterPanel.style.paddingLeft = '16px'
	perimeterPanel.style.marginBottom = '2px';
	perimeterPanel.style.marginTop = '6px';
	perimeterPanel.style.borderWidth = '0px';
	perimeterPanel.style.paddingBottom = '18px';
	
	var span = document.createElement('div');
	span.style.position = 'absolute';
	span.style.marginLeft = '3px';
	span.style.marginBottom = '12px';
	span.style.marginTop = '1px';
	span.style.fontWeight = 'normal';
	span.style.width = '120px';
	mxUtils.write(span, mxResources.get('perimeter'));
	perimeterPanel.appendChild(span);
	
	var perimeterUpdate;
	var perimeterSpacing = this.addUnitInput(perimeterPanel, 'pt', 30, 52, function()
	{
		perimeterUpdate.apply(this, arguments);
	});

	if (ss.edges.length == ss.cells.length)
	{
		container.appendChild(stylePanel2);
		container.appendChild(arrowPanel);
	}
	else if (ss.vertices.length == ss.cells.length)
	{
		container.appendChild(perimeterPanel);
	}
	
	var listener = mxUtils.bind(this, function(sender, evt, force)
	{
		ss = ui.getSelectionState();

		if (force || document.activeElement != input)
		{
			var tmp = parseFloat(mxUtils.getValue(ss.style, mxConstants.STYLE_STROKEWIDTH, 1));
			input.value = (isNaN(tmp)) ? '' : tmp + ' pt';
		}
		
		if (force || document.activeElement != altInput)
		{
			var tmp = parseFloat(mxUtils.getValue(ss.style, mxConstants.STYLE_STROKEWIDTH, 1));
			altInput.value = (isNaN(tmp)) ? '' : tmp + ' pt';
		}
		
		styleSelect.style.visibility = (ss.style.shape == 'connector' ||
			ss.style.shape == 'filledEdge' || ss.style.shape == 'wire') ?
			'' : 'hidden';
		
		if (mxUtils.getValue(ss.style, mxConstants.STYLE_CURVED, null) == '1')
		{
			styleSelect.value = 'curved';
		}
		else if (mxUtils.getValue(ss.style, mxConstants.STYLE_ROUNDED, null) == '1')
		{
			styleSelect.value = 'rounded';
		}
		
		if (mxUtils.getValue(ss.style, mxConstants.STYLE_DASHED, null) == '1')
		{
			if (mxUtils.getValue(ss.style, mxConstants.STYLE_DASH_PATTERN, null) == null ||
				String(mxUtils.getValue(ss.style, mxConstants.STYLE_DASH_PATTERN, '')).substring(0, 2) != '1 ')
			{
				solid.style.borderBottom = '1px dashed ' + this.defaultStrokeColor;
			}
			else
			{
				solid.style.borderBottom = '1px dotted ' + this.defaultStrokeColor;
			}
		}
		else
		{
			solid.style.borderBottom = '1px solid ' + this.defaultStrokeColor;
		}
		
		altSolid.style.borderBottom = solid.style.borderBottom;
		
		// Updates toolbar icon for edge style
		var edgeStyleDiv = edgeStyle.getElementsByTagName('div')[0];
		
		if (edgeStyleDiv != null)
		{
			var es = mxUtils.getValue(ss.style, mxConstants.STYLE_EDGE, null);
			
			if (mxUtils.getValue(ss.style, mxConstants.STYLE_NOEDGESTYLE, null) == '1')
			{
				es = null;
			}
			
			if (es == 'orthogonalEdgeStyle' && mxUtils.getValue(ss.style, mxConstants.STYLE_CURVED, null) == '1')
			{
				edgeStyleDiv.className = 'geSprite geSprite-curved';
			}
			else if (es == 'straight' || es == 'none' || es == null)
			{
				edgeStyleDiv.className = 'geSprite geSprite-straight';
			}
			else if (es == 'entityRelationEdgeStyle')
			{
				edgeStyleDiv.className = 'geSprite geSprite-entity';
			}
			else if (es == 'elbowEdgeStyle')
			{
				edgeStyleDiv.className = 'geSprite ' + ((mxUtils.getValue(ss.style,
					mxConstants.STYLE_ELBOW, null) == 'vertical') ?
					'geSprite-verticalelbow' : 'geSprite-horizontalelbow');
			}
			else if (es == 'isometricEdgeStyle')
			{
				edgeStyleDiv.className = 'geSprite ' + ((mxUtils.getValue(ss.style,
					mxConstants.STYLE_ELBOW, null) == 'vertical') ?
					'geSprite-verticalisometric' : 'geSprite-horizontalisometric');
			}
			else
			{
				edgeStyleDiv.className = 'geSprite geSprite-orthogonal';
			}
		}
		
		// Updates icon for edge shape
		var edgeShapeDiv = edgeShape.getElementsByTagName('div')[0];
		
		if (edgeShapeDiv != null)
		{
			if (ss.style.shape == 'link')
			{
				edgeShapeDiv.className = 'geSprite geSprite-linkedge';
			}
			else if (ss.style.shape == 'flexArrow')
			{
				edgeShapeDiv.className = 'geSprite geSprite-arrow';
			}
			else if (ss.style.shape == 'arrow')
			{
				edgeShapeDiv.className = 'geSprite geSprite-simplearrow';
			}
			else
			{
				edgeShapeDiv.className = 'geSprite geSprite-connection';
			}
		}
		
		if (ss.edges.length == ss.cells.length)
		{
			altStylePanel.style.display = '';
			stylePanel.style.display = 'none';
		}
		else
		{
			altStylePanel.style.display = 'none';
			stylePanel.style.display = '';
		}

		if (Graph.lineJumpsEnabled && ss.edges.length > 0 &&
			ss.vertices.length == 0 && ss.lineJumps)
		{
			container.style.borderBottomStyle = 'none';
		}

		function updateArrow(marker, fill, elt, prefix)
		{
			var markerDiv = elt.getElementsByTagName('div')[0];
			
			if (markerDiv != null)
			{
				ui.updateCssForMarker(markerDiv, prefix, ss.style.shape, marker, fill);
			}
			
			return markerDiv;
		};
		
		var sourceDiv = updateArrow(mxUtils.getValue(ss.style, mxConstants.STYLE_STARTARROW, null),
				mxUtils.getValue(ss.style, 'startFill', '1'), lineStart, 'start');
		var targetDiv = updateArrow(mxUtils.getValue(ss.style, mxConstants.STYLE_ENDARROW, null),
				mxUtils.getValue(ss.style, 'endFill', '1'), lineEnd, 'end');

		// Special cases for markers
		if (sourceDiv != null && targetDiv != null)
		{
			if (ss.style.shape == 'arrow')
			{
				sourceDiv.className = 'geSprite geSprite-noarrow';
				targetDiv.className = 'geSprite geSprite-endblocktrans';
			}
			else if (ss.style.shape == 'link')
			{
				sourceDiv.className = 'geSprite geSprite-noarrow';
				targetDiv.className = 'geSprite geSprite-noarrow';
			}
		}

		mxUtils.setOpacity(edgeStyle, (ss.style.shape == 'arrow') ? 30 : 100);			
		
		if (ss.style.shape != 'connector' && ss.style.shape != 'flexArrow' &&
			ss.style.shape != 'filledEdge' && ss.style.shape != 'wire')
		{
			mxUtils.setOpacity(lineStart, 30);
			mxUtils.setOpacity(lineEnd, 30);
		}
		else
		{
			mxUtils.setOpacity(lineStart, 100);
			mxUtils.setOpacity(lineEnd, 100);
		}

		if (force || document.activeElement != startSize)
		{
			var tmp = parseInt(mxUtils.getValue(ss.style, mxConstants.STYLE_STARTSIZE, mxConstants.DEFAULT_MARKERSIZE));
			startSize.value = (isNaN(tmp)) ? '' : tmp  + ' pt';
		}
		
		if (force || document.activeElement != startSpacing)
		{
			var tmp = parseInt(mxUtils.getValue(ss.style, mxConstants.STYLE_SOURCE_PERIMETER_SPACING, 0));
			startSpacing.value = (isNaN(tmp)) ? '' : tmp  + ' pt';
		}

		if (force || document.activeElement != endSize)
		{
			var tmp = parseInt(mxUtils.getValue(ss.style, mxConstants.STYLE_ENDSIZE, mxConstants.DEFAULT_MARKERSIZE));
			endSize.value = (isNaN(tmp)) ? '' : tmp  + ' pt';
		}
		
		if (force || document.activeElement != startSpacing)
		{
			var tmp = parseInt(mxUtils.getValue(ss.style, mxConstants.STYLE_TARGET_PERIMETER_SPACING, 0));
			endSpacing.value = (isNaN(tmp)) ? '' : tmp  + ' pt';
		}
		
		if (force || document.activeElement != perimeterSpacing)
		{
			var tmp = parseInt(mxUtils.getValue(ss.style, mxConstants.STYLE_PERIMETER_SPACING, 0));
			perimeterSpacing.value = (isNaN(tmp)) ? '' : tmp  + ' pt';
		}
	});
	
	startSizeUpdate = this.installInputHandler(startSize, mxConstants.STYLE_STARTSIZE, mxConstants.DEFAULT_MARKERSIZE, 0, 999, ' pt');
	startSpacingUpdate = this.installInputHandler(startSpacing, mxConstants.STYLE_SOURCE_PERIMETER_SPACING, 0, -999, 999, ' pt');
	endSizeUpdate = this.installInputHandler(endSize, mxConstants.STYLE_ENDSIZE, mxConstants.DEFAULT_MARKERSIZE, 0, 999, ' pt');
	endSpacingUpdate = this.installInputHandler(endSpacing, mxConstants.STYLE_TARGET_PERIMETER_SPACING, 0, -999, 999, ' pt');
	perimeterUpdate = this.installInputHandler(perimeterSpacing, mxConstants.STYLE_PERIMETER_SPACING, 0, 0, 999, ' pt');

	this.addKeyHandler(input, listener);
	this.addKeyHandler(startSize, listener);
	this.addKeyHandler(startSpacing, listener);
	this.addKeyHandler(endSize, listener);
	this.addKeyHandler(endSpacing, listener);
	this.addKeyHandler(perimeterSpacing, listener);

	graph.getModel().addListener(mxEvent.CHANGE, listener);
	this.listeners.push({destroy: function() { graph.getModel().removeListener(listener); }});
	listener();

	return container;
};

/**
 * Adds UI for configuring line jumps.
 */
StyleFormatPanel.prototype.addLineJumps = function(container)
{
	var ui = this.editorUi;
	var editor = ui.editor;
	var graph = editor.graph;
	var ss = ui.getSelectionState();
	
	if (Graph.lineJumpsEnabled && ss.edges.length > 0 &&
		ss.vertices.length == 0 && ss.lineJumps)
	{
		container.style.padding = '2px 0px 24px 14px';
		
		var span = document.createElement('div');
		span.style.position = 'absolute';
		span.style.maxWidth = '78px';
		span.style.overflow = 'hidden';
		span.style.textOverflow = 'ellipsis';
		
		mxUtils.write(span, mxResources.get('lineJumps'));
		container.appendChild(span);
		
		var styleSelect = document.createElement('select');
		styleSelect.style.position = 'absolute';
		styleSelect.style.height = '21px';
		styleSelect.style.padding = '0px';
		styleSelect.style.marginTop = '-2px';
		styleSelect.style.boxSizing = 'border-box';
		styleSelect.style.textAlign = 'center';
		styleSelect.style.right = '84px';
		styleSelect.style.width = '64px';
		styleSelect.style.borderWidth = '1px';
		styleSelect.style.borderStyle = 'solid';

		var styles = ['none', 'arc', 'gap', 'sharp', 'line'];

		for (var i = 0; i < styles.length; i++)
		{
			var styleOption = document.createElement('option');
			styleOption.setAttribute('value', styles[i]);
			mxUtils.write(styleOption, mxResources.get(styles[i]));
			styleSelect.appendChild(styleOption);
		}
		
		mxEvent.addListener(styleSelect, 'change', function(evt)
		{
			graph.getModel().beginUpdate();
			try
			{
				graph.setCellStyles('jumpStyle', styleSelect.value, ss.cells);
				ui.fireEvent(new mxEventObject('styleChanged', 'keys', ['jumpStyle'],
					'values', [styleSelect.value], 'cells', ss.cells));
			}
			finally
			{
				graph.getModel().endUpdate();
			}
			
			mxEvent.consume(evt);
		});
		
		// Stops events from bubbling to color option event handler
		mxEvent.addListener(styleSelect, 'click', function(evt)
		{
			mxEvent.consume(evt);
		});
		
		container.appendChild(styleSelect);
		
		var jumpSizeUpdate;
		
		var jumpSize = this.addUnitInput(container, 'pt', 16, 52, function()
		{
			jumpSizeUpdate.apply(this, arguments);
		});
		
		jumpSizeUpdate = this.installInputHandler(jumpSize, 'jumpSize',
			Graph.defaultJumpSize, 0, 999, ' pt');
		
		var listener = mxUtils.bind(this, function(sender, evt, force)
		{
			ss = ui.getSelectionState();
			styleSelect.value = mxUtils.getValue(ss.style, 'jumpStyle', 'none');

			if (force || document.activeElement != jumpSize)
			{
				var tmp = parseInt(mxUtils.getValue(ss.style, 'jumpSize', Graph.defaultJumpSize));
				jumpSize.value = (isNaN(tmp)) ? '' : tmp  + ' pt';
			}
		});

		this.addKeyHandler(jumpSize, listener);

		graph.getModel().addListener(mxEvent.CHANGE, listener);
		this.listeners.push({destroy: function() { graph.getModel().removeListener(listener); }});
		listener();
	}
	else
	{
		container.style.display = 'none';
	}
	
	return container;
};

/**
 * Adds the label menu items to the given menu and parent.
 */
StyleFormatPanel.prototype.addEffects = function(div)
{
	var ui = this.editorUi;
	var editor = ui.editor;
	var graph = editor.graph;
	var ss = ui.getSelectionState();
	
	div.style.paddingTop = '4px';
	div.style.paddingBottom = '4px';

	var table = document.createElement('table');

	table.style.width = '210px';
	table.style.fontWeight = 'bold';
	table.style.tableLayout = 'fixed';
	var tbody = document.createElement('tbody');
	var row = document.createElement('tr');
	row.style.padding = '0px';
	var left = document.createElement('td');
	left.style.padding = '0px';
	left.style.width = '50%';
	left.setAttribute('valign', 'top');
	
	var right = left.cloneNode(true);
	right.style.paddingLeft = '8px';
	row.appendChild(left);
	row.appendChild(right);
	tbody.appendChild(row);
	table.appendChild(tbody);
	div.appendChild(table);

	var current = left;
	
	var addOption = mxUtils.bind(this, function(label, key, defaultValue, fn)
	{
		var opt = this.createCellOption(label, key, defaultValue, null, null, fn);
		opt.style.width = '100%';
		current.appendChild(opt);
		current = (current == left) ? right : left;
	});

	var listener = mxUtils.bind(this, function(sender, evt, force)
	{
		ss = ui.getSelectionState();
		
		left.innerText = '';
		right.innerText = '';
		current = left;
		
		if (ss.rounded)
		{
			addOption(mxResources.get('rounded'), mxConstants.STYLE_ROUNDED, 0);
		}
		
		if (ss.swimlane)
		{
			addOption(mxResources.get('divider'), 'swimlaneLine', 1);
		}

		addOption(mxResources.get('sketch'), 'sketch', 0, function(cells, enabled)
		{
			graph.updateCellStyles({'sketch': (enabled) ? '1' : null,
				'curveFitting': (enabled) ? Editor.sketchDefaultCurveFitting : null,
				'jiggle': (enabled) ? Editor.sketchDefaultJiggle : null}, cells);
		});

		if (ss.glass)
		{
			addOption(mxResources.get('glass'), mxConstants.STYLE_GLASS, 0);
		}
		
		if (!ss.containsImage)
		{
			addOption(mxResources.get('shadow'), mxConstants.STYLE_SHADOW, 0);
		}
	});
	
	graph.getModel().addListener(mxEvent.CHANGE, listener);
	this.listeners.push({destroy: function() { graph.getModel().removeListener(listener); }});
	listener();

	return div;
}

/**
 * Adds the label menu items to the given menu and parent.
 */
StyleFormatPanel.prototype.addStyleOps = function(div)
{
	var ss = this.editorUi.getSelectionState();

	if (ss.cells.length == 1)
	{
		this.addActions(div, ['setAsDefaultStyle']);
	}

	return div;
};

/**
 * Adds the label menu items to the given menu and parent.
 */
DiagramStylePanel = function(format, editorUi, container)
{
	BaseFormatPanel.call(this, format, editorUi, container);
	this.init();
};

mxUtils.extend(DiagramStylePanel, BaseFormatPanel);

/**
 * Adds the label menu items to the given menu and parent.
 */
DiagramStylePanel.prototype.init = function()
{
	var ui = this.editorUi;

	this.darkModeChangedListener = mxUtils.bind(this, function()
	{
		this.format.cachedStyleEntries = [];
	});

	ui.addListener('darkModeChanged', this.darkModeChangedListener);
	this.container.appendChild(this.addView(this.createPanel()));
};

/**
 * Adds the label menu items to the given menu and parent.
 */
DiagramStylePanel.prototype.getGlobalStyleButtons = function()
{
	var ui = this.editorUi;
	var editor = ui.editor;
	var graph = editor.graph;

	var buttons = [mxUtils.button(mxResources.get('sketch'), mxUtils.bind(this, function(evt)
	{
		var value = !Editor.sketchMode;
		graph.updateCellStyles({'sketch': (value) ? '1' : null,
			'curveFitting': (value) ? Editor.sketchDefaultCurveFitting : null,
			'jiggle': (value) ? Editor.sketchDefaultJiggle : null},
			graph.getVerticesAndEdges());
		ui.setSketchMode(value);
		mxEvent.consume(evt);
	})), mxUtils.button(mxResources.get('rounded'), mxUtils.bind(this, function(evt)
	{
		// Checks if all cells are rounded
		var cells = graph.getVerticesAndEdges();
		var rounded = true;

		if (cells.length > 0)
		{
			for (var i = 0; i < cells.length; i++)
			{
				var style = graph.getCellStyle(cells[i]);

				if (mxUtils.getValue(style, mxConstants.STYLE_ROUNDED, 0) == 0)
				{
					rounded = false;
					break;
				}
			}
		}
		
		rounded = !rounded;
		graph.updateCellStyles({'rounded': (rounded) ? '1' : '0'}, cells);

		if (rounded)
		{
			graph.currentEdgeStyle['rounded'] = '1';
			graph.currentVertexStyle['rounded'] = '1';
		}
		else
		{
			delete graph.currentEdgeStyle['rounded'];
			delete graph.currentVertexStyle['rounded'];
		}

		mxEvent.consume(evt);
	}))];

	return buttons;
};

/**
 * Adds the label menu items to the given menu and parent.
 */
DiagramStylePanel.prototype.addView = function(div)
{
	var ui = this.editorUi;
	var editor = ui.editor;
	var graph = editor.graph;
	var model = graph.getModel();
	var gridColor = graph.view.gridColor;

	div.style.paddingTop = '2px';
	div.style.whiteSpace = 'normal';

	var opts = document.createElement('div');
	opts.style.marginRight = '16px';
	opts.style.paddingBottom = '2px';
	
	var table = document.createElement('table');
	table.style.width = '204px';
	
	var tbody = document.createElement('tbody');
	var row = document.createElement('tr');
	row.style.padding = '0px';
	
	var left = document.createElement('td');
	left.style.textAlign = 'center';
	left.style.padding = '2px';
	left.style.width = '50%';
	
	var right = left.cloneNode(true);
	var buttons = this.getGlobalStyleButtons();

	for (var i = 0; i < buttons.length; i += 2)
	{
		var btn = buttons[i];
		btn.style.height = '22px';
		btn.style.width = '92px';

		left.appendChild(btn);
		row.appendChild(left);

		btn = buttons[i + 1];

		if (btn != null)
		{
			btn.style.height = '22px';
			btn.style.width = '92px';
			right.appendChild(btn);
		}

		row.appendChild(right);
		tbody.appendChild(row);

		left = left.cloneNode(false);
		right = right.cloneNode(false);
		row = row.cloneNode(false);
	}

	table.appendChild(tbody);
	opts.appendChild(table);
	div.appendChild(opts);

	var defaultStyles = ['fillColor', 'strokeColor', 'fontColor', 'gradientColor'];
	
	div.style.whiteSpace = 'normal';
	div.style.paddingLeft = '18px';
	div.style.paddingTop = '6px';
	
	var updateCells = mxUtils.bind(this, function(styles, graphStyle)
	{
		var cells = graph.getVerticesAndEdges();
		
		model.beginUpdate();
		try
		{
			for (var i = 0; i < cells.length; i++)
			{
				var style = graph.getCellStyle(cells[i]);
				
				// Handles special label background color
				if (!ignoreGraphStyle && style['labelBackgroundColor'] != null)
				{
					graph.updateCellStyles({'labelBackgroundColor': (graphStyle != null) ?
						graphStyle.background : null}, [cells[i]]);
				}
				else if (ignoreGraphStyle)
				{
					graph.updateCellStyles({'labelBackgroundColor': mxConstants.NONE}, [cells[i]]);
				}
				
				var edge = model.isEdge(cells[i]);
				var newStyle = model.getStyle(cells[i]);
				var current = (edge) ? graph.currentEdgeStyle : graph.currentVertexStyle;

				for (var j = 0; j < styles.length; j++)
				{
					if ((style[styles[j]] != null && style[styles[j]] != mxConstants.NONE) ||
						(styles[j] != mxConstants.STYLE_FILLCOLOR &&
						styles[j] != mxConstants.STYLE_STROKECOLOR))
					{
						if (ignoreGraphStyle && edge && styles[j] == mxConstants.STYLE_FONTCOLOR)
						{
							newStyle = mxUtils.setStyle(newStyle, styles[j], 'default');
						}
						else
						{
							newStyle = mxUtils.setStyle(newStyle, styles[j], current[styles[j]]);
						}
					}
				}
				
				model.setStyle(cells[i], newStyle);
			}
		}
		finally
		{
			model.endUpdate();
		}
	});
			
	var removeStyles = mxUtils.bind(this, function(style, styles, defaultStyle)
	{
		if (style != null)
		{
			for (var j = 0; j < styles.length; j++)
			{
				if (((style[styles[j]] != null &&
					style[styles[j]] != mxConstants.NONE) ||
					(styles[j] != mxConstants.STYLE_FILLCOLOR &&
					styles[j] != mxConstants.STYLE_STROKECOLOR)))
				{
					style[styles[j]] = defaultStyle[styles[j]];
				}
			}
		}
	});

	var ignoreGraphStyle = true;

	var applyStyle = mxUtils.bind(this, function(style, result, cell, graphStyle, theGraph)
	{
		if (style != null)
		{
			if (cell != null)
			{
				// Handles special label background color
				if (!ignoreGraphStyle && result['labelBackgroundColor'] != null)
				{
					var bg = (graphStyle != null) ? graphStyle.background : null;
					theGraph = (theGraph != null) ? theGraph : graph;
					
					if (bg == null)
					{
						bg = theGraph.background;
					}
					
					if (bg == null)
					{
						bg = theGraph.defaultPageBackgroundColor;
					}
					
					result['labelBackgroundColor'] = bg;
				}
				else if (ignoreGraphStyle)
				{
					result['labelBackgroundColor'] = mxConstants.NONE;
				}
			}
			
			for (var key in style)
			{
				if (cell == null || ((result[key] != null &&
					result[key] != mxConstants.NONE) ||
					(key != mxConstants.STYLE_FILLCOLOR &&
					key != mxConstants.STYLE_STROKECOLOR)))
				{
					if (ignoreGraphStyle && model.isEdge(cell) &&
						key == mxConstants.STYLE_FONTCOLOR)
					{
						result[key] = 'default';
					}
					else
					{
						result[key] = style[key];
					}
				}
			}
		}
	});

	var createPreview = mxUtils.bind(this, function(commonStyle, vertexStyle, edgeStyle, graphStyle, container)
	{
		// Wrapper needed to catch events
		var div = document.createElement('div');
		div.style.background = (Editor.isDarkMode() ? '#2a252f' : '#f1f3f4');
		div.style.position = 'absolute';
		div.style.display = 'inline-block';
		div.style.overflow = 'hidden';
		div.style.pointerEvents = 'none';
		div.style.width = '100%';
		div.style.height = '100%';
		container.appendChild(div);
		
		var graph2 = new Graph(div, null, null, graph.getStylesheet());
		graph2.shapeBackgroundColor = div.style.background;
		graph2.resetViewOnRootChange = false;
		graph2.foldingEnabled = false;
		graph2.gridEnabled = false;
		graph2.autoScroll = false;
		graph2.setTooltips(false);
		graph2.setConnectable(false);
		graph2.setPanning(false);
		graph2.setEnabled(false);

		graph2.getCellStyle = function(cell, resolve)
		{
			resolve = (resolve != null) ? resolve : true;
			var result = mxUtils.clone(graph.getCellStyle.apply(this, arguments));
			var defaultStyle = graph.stylesheet.getDefaultVertexStyle();
			var appliedStyle = vertexStyle;
			
			if (model.isEdge(cell))
			{
				defaultStyle = graph.stylesheet.getDefaultEdgeStyle();
				appliedStyle = edgeStyle;	
			}
			
			removeStyles(result, defaultStyles, defaultStyle);
			applyStyle(commonStyle, result, cell, graphStyle, graph2);
			applyStyle(appliedStyle, result, cell, graphStyle, graph2);
			
			if (resolve)
			{
				result = graph.postProcessCellStyle(cell, result);
			}

			return result;
		};
		
		// Avoid HTML labels to capture events in bubble phase
		graph2.model.beginUpdate();
		try
		{
			var v1 = graph2.insertVertex(graph2.getDefaultParent(), null, 'Shape', 14, 8, 70, 36, 'strokeWidth=2;');
			var e1 = graph2.insertEdge(graph2.getDefaultParent(), null, 'Connector', v1, v1,
				'edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;endSize=5;strokeWidth=2;')
			e1.geometry.points = [new mxPoint(32, 66)];
			e1.geometry.offset = new mxPoint(0, 8);
		}
		finally
		{
			graph2.model.endUpdate();
		}
	});
	
	// Entries
	var entries = document.createElement('div');
	entries.style.position = 'relative';
	entries.style.width = '210px';
	div.appendChild(entries);
	
	// Cached entries
	if (this.format.cachedStyleEntries == null)
	{
		this.format.cachedStyleEntries = [];
	}

	function addKeys(style, result)
	{
		for (var key in style)
		{
			result.push(key);
		}

		return result;
	};

	var addEntry = mxUtils.bind(this, function(commonStyle, vertexStyle, edgeStyle, graphStyle, index)
	{
		var panel = this.format.cachedStyleEntries[index];
		
		if (panel == null)
		{
			panel = document.createElement('div');
			panel.style.display = 'inline-block';
			panel.style.position = 'relative';
			panel.style.width = '96px';
			panel.style.height = '86px';
			panel.style.cursor = 'pointer';
			panel.style.border = '1px solid gray';
			panel.style.borderRadius = '8px';
			panel.style.margin = '1px 2px';
			panel.style.overflow = 'hidden';
	
			if (!ignoreGraphStyle && graphStyle != null && graphStyle.background != null)
			{
				panel.style.backgroundColor = graphStyle.background;
			}
			
			createPreview(commonStyle, vertexStyle, edgeStyle, graphStyle, panel); 
	
			mxEvent.addGestureListeners(panel, mxUtils.bind(this, function(evt)
			{
				panel.style.opacity = 0.5;
			}), null, mxUtils.bind(this, function(evt)
			{
				panel.style.opacity = 1;
				graph.currentVertexStyle = mxUtils.clone(graph.defaultVertexStyle);
				graph.currentEdgeStyle = mxUtils.clone(graph.defaultEdgeStyle);
				
				applyStyle(commonStyle, graph.currentVertexStyle);
				applyStyle(commonStyle, graph.currentEdgeStyle);
				applyStyle(vertexStyle, graph.currentVertexStyle);
				applyStyle(edgeStyle, graph.currentEdgeStyle);

				model.beginUpdate();
				try
				{
					updateCells(addKeys(commonStyle, defaultStyles.slice()), graphStyle);
					
					if (!ignoreGraphStyle)
					{
						var change = new ChangePageSetup(ui, (graphStyle != null) ? graphStyle.background : null);
						change.ignoreImage = true;
						model.execute(change);
							
						model.execute(new ChangeGridColor(ui,
							(graphStyle != null && graphStyle.gridColor != null) ?
							graphStyle.gridColor : gridColor));
					}
				}
				finally
				{
					model.endUpdate();
				}
			}));
			
			mxEvent.addListener(panel, 'mouseenter', mxUtils.bind(this, function(evt)
			{
				var prev = graph.getCellStyle;
				var prevBg = graph.background;
				var prevGrid = graph.view.gridColor;
	
				if (!ignoreGraphStyle)
				{
					graph.background = (graphStyle != null) ? graphStyle.background : null;
					graph.view.gridColor = (graphStyle != null && graphStyle.gridColor != null) ?
						graphStyle.gridColor : gridColor;
				}
				
				graph.getCellStyle = function(cell, resolve)
				{
					resolve = (resolve != null) ? resolve : true;
					var result = mxUtils.clone(prev.apply(this, arguments));
					
					var defaultStyle = graph.stylesheet.getDefaultVertexStyle();
					var appliedStyle = vertexStyle;
					
					if (model.isEdge(cell))
					{
						defaultStyle = graph.stylesheet.getDefaultEdgeStyle();
						appliedStyle = edgeStyle;	
					}
					
					removeStyles(result, defaultStyles, defaultStyle);
					applyStyle(commonStyle, result, cell, graphStyle);
					applyStyle(appliedStyle, result, cell, graphStyle);
					
					if (resolve)
					{
						result = this.postProcessCellStyle(cell, result);
					}
					
					return result;
				};
				
				graph.refresh();
				graph.getCellStyle = prev;
				graph.background = prevBg;
				graph.view.gridColor = prevGrid;
			}));
			
			mxEvent.addListener(panel, 'mouseleave', mxUtils.bind(this, function(evt)
			{
				graph.refresh();
			}));
			
			// Workaround for broken cache in IE11
			if (!mxClient.IS_IE && !mxClient.IS_IE11)
			{
				this.format.cachedStyleEntries[index] = panel;
			}
		}
		
		entries.appendChild(panel);
	});
		
	// Maximum palettes to switch the switcher
	var maxEntries = 10;
	var pageCount = Math.ceil(Editor.styles.length / maxEntries);
	this.format.currentStylePage = (this.format.currentStylePage != null) ? this.format.currentStylePage : 0;
	var dots = [];
	
	var addEntries = mxUtils.bind(this, function()
	{
		if (dots.length > 0)
		{
			dots[this.format.currentStylePage].style.background = '#84d7ff';
		}
		
		for (var i = this.format.currentStylePage * maxEntries;
			i < Math.min((this.format.currentStylePage + 1) * maxEntries,
			Editor.styles.length); i++)
		{
			var s = Editor.styles[i];
			addEntry(s.commonStyle, s.vertexStyle, s.edgeStyle, s.graph, i);
		}
	});
	
	var selectPage = mxUtils.bind(this, function(index)
	{
		if (index >= 0 && index < pageCount)
		{
			dots[this.format.currentStylePage].style.background = 'transparent';
			entries.innerText = '';
			this.format.currentStylePage = index;
			addEntries();
		}
	});
	
	if (pageCount > 1)
	{
		// Selector
		var switcher = document.createElement('div');
		switcher.style.whiteSpace = 'nowrap';
		switcher.style.position = 'relative';
		switcher.style.textAlign = 'center';
		switcher.style.paddingTop = '4px';
		switcher.style.width = '210px';
		
		for (var i = 0; i < pageCount; i++)
		{
			var dot = document.createElement('div');
			dot.style.display = 'inline-block';
			dot.style.width = '6px';
			dot.style.height = '6px';
			dot.style.marginLeft = '4px';
			dot.style.marginRight = '3px';
			dot.style.borderRadius = '3px';
			dot.style.cursor = 'pointer';
			dot.style.background = 'transparent';
			dot.style.border = '1px solid #b5b6b7';
			
			(mxUtils.bind(this, function(index, elt)
			{
				mxEvent.addListener(dot, 'click', mxUtils.bind(this, function()
				{
					selectPage(index);
				}));
			}))(i, dot);
			
			switcher.appendChild(dot);
			dots.push(dot);
		}
		
		div.appendChild(switcher);
		addEntries();
		
		if (pageCount < 15)
		{
			var left = document.createElement('div');
			left.className = 'geAdaptiveAsset';
			left.style.position = 'absolute';
			left.style.left = '0px';
			left.style.top = '0px';
			left.style.bottom = '0px';
			left.style.width = '24px';
			left.style.height = '24px';
			left.style.margin = '0px';
			left.style.cursor = 'pointer';
			left.style.opacity = '0.5';
			left.style.backgroundRepeat = 'no-repeat';
			left.style.backgroundPosition = 'center center';
			left.style.backgroundSize = '24px 24px';
			left.style.backgroundImage = 'url(' + Editor.previousImage + ')';
			
			var right = left.cloneNode(false);
			right.style.backgroundImage = 'url(' + Editor.nextImage + ')';
			right.style.left = '';
			right.style.right = '2px';

			switcher.appendChild(left);
			switcher.appendChild(right);
			
			mxEvent.addListener(left, 'click', mxUtils.bind(this, function()
			{
				selectPage(mxUtils.mod(this.format.currentStylePage - 1, pageCount));
			}));
			
			mxEvent.addListener(right, 'click', mxUtils.bind(this, function()
			{
				selectPage(mxUtils.mod(this.format.currentStylePage + 1, pageCount));
			}));
					
			// Hover state
			function addHoverState(elt)
			{
				mxEvent.addListener(elt, 'mouseenter', function()
				{
					elt.style.opacity = '1';
				});
				mxEvent.addListener(elt, 'mouseleave', function()
				{
					elt.style.opacity = '0.5';
				});
			};
			
			addHoverState(left);
			addHoverState(right);
		}
	}
	else
	{
		addEntries();
	}

	return div;
};

/**
 * Adds the label menu items to the given menu and parent.
 */
DiagramStylePanel.prototype.destroy = function()
{
	BaseFormatPanel.prototype.destroy.apply(this, arguments);

	if (this.darkModeChangedListener)
	{
		this.editorUi.removeListener(this.darkModeChangedListener);
		this.darkModeChangedListener = null;
	}
};

/**
 * Adds the label menu items to the given menu and parent.
 */
DiagramFormatPanel = function(format, editorUi, container)
{
	BaseFormatPanel.call(this, format, editorUi, container);
	this.init();
};

mxUtils.extend(DiagramFormatPanel, BaseFormatPanel);

/**
 * Switch to disable page view.
 */
DiagramFormatPanel.showPageView = true;

/**
 * Specifies if the background image option should be shown. Default is true.
 */
DiagramFormatPanel.prototype.showBackgroundImageOption = true;

/**
 * Adds the label menu items to the given menu and parent.
 */
DiagramFormatPanel.prototype.init = function()
{
	var ui = this.editorUi;
	var editor = ui.editor;
	var graph = editor.graph;

	this.container.appendChild(this.addView(this.createPanel()));

	if (graph.isEnabled())
	{
		this.container.appendChild(this.addOptions(this.createPanel()));
		this.container.appendChild(this.addPaperSize(this.createPanel()));
		this.container.appendChild(this.addStyleOps(this.createPanel()));
	}
};

/**
 * Adds the label menu items to the given menu and parent.
 */
DiagramFormatPanel.prototype.addView = function(div)
{
	var ui = this.editorUi;
	var editor = ui.editor;
	var graph = editor.graph;
	
	div.appendChild(this.createTitle(mxResources.get('view')));
	
	// Grid
	this.addGridOption(div);
	
	// Page View
	if (DiagramFormatPanel.showPageView)
	{
		div.appendChild(this.createOption(mxResources.get('pageView'), function()
		{
			return graph.pageVisible;
		}, function(checked)
		{
			ui.actions.get('pageView').funct();
		},
		{
			install: function(apply)
			{
				this.listener = function()
				{
					apply(graph.pageVisible);
				};
				
				ui.addListener('pageViewChanged', this.listener);
			},
			destroy: function()
			{
				ui.removeListener(this.listener);
			}
		}));
	}
	
	if (graph.isEnabled())
	{
		if (this.showBackgroundImageOption)
		{
			var bg = this.createOption(mxResources.get('background'), function()
			{
				return graph.backgroundImage != null;
			}, function(checked)
			{
				if (!checked)
				{
					var change = new ChangePageSetup(ui, null, null);
					change.ignoreColor = true;

					graph.model.execute(change);
				}
			},
			{
				install: function(apply)
				{
					this.listener = function()
					{
						apply(graph.backgroundImage != null);
					};
					
					ui.addListener('backgroundImageChanged', this.listener);
				},
				destroy: function()
				{
					ui.removeListener(this.listener);
				}
			});

			var input = bg.getElementsByTagName('input')[0];

			if (input != null)
			{
				input.style.visibility = graph.backgroundImage != null ? 'visible' : 'hidden';
			}
			
			var label = bg.getElementsByTagName('div')[0];
			
			if (label != null)
			{
				label.style.display = 'inline-block';
				label.style.textOverflow = 'ellipsis';
				label.style.overflow = 'hidden';
				label.style.maxWidth = '80px';
			}

			if (mxClient.IS_FF)
			{
				label.style.marginTop = '1px';
			}

			var btn = mxUtils.button(mxResources.get('change') + '...', function(evt)
			{
				ui.showBackgroundImageDialog(null,
					ui.editor.graph.backgroundImage,
					ui.editor.graph.background);
				mxEvent.consume(evt);
			})
			
			btn.style.position = 'absolute';
			btn.style.height = '22px';
			btn.style.left = '47%';
			btn.style.marginLeft = '1px';
			btn.style.width = '110px';
			btn.style.maxWidth = '110px';
			
			bg.appendChild(btn);
			div.appendChild(bg);
		}

		var bgColor = this.createColorOption(mxResources.get('backgroundColor'), function()
		{
			return graph.background;
		}, function(color)
		{
			var change = new ChangePageSetup(ui, color);
			change.ignoreImage = true;

			graph.model.execute(change);
		}, '#ffffff');

		bgColor.style.padding = '5px 0 1px 0';
		div.appendChild(bgColor);

		var option = this.createOption(mxResources.get('shadow'), function()
		{
			return graph.shadowVisible;
		}, function(checked)
		{
			var change = new ChangePageSetup(ui);
			change.ignoreColor = true;
			change.ignoreImage = true;
			change.shadowVisible = checked;
			
			graph.model.execute(change);
		},
		{
			install: function(apply)
			{
				this.listener = function()
				{
					apply(graph.shadowVisible);
				};
				
				ui.addListener('shadowVisibleChanged', this.listener);
			},
			destroy: function()
			{
				ui.removeListener(this.listener);
			}
		});
		
		if (!Editor.enableShadowOption)
		{
			option.getElementsByTagName('input')[0].setAttribute('disabled', 'disabled');
			mxUtils.setOpacity(option, 60);
		}

		option.style.display = 'inline-flex';
		option.style.width = '100px';
		option.style.maxWidth = '100px';
		option.style.marginRight = '4px';
		div.appendChild(option);

		var sketchOption = this.createOption(mxResources.get('sketch'), function()
		{
			return Editor.sketchMode;
		}, function(checked)
		{
			ui.setSketchMode(checked);
		},
		{
			install: function(apply)
			{
				this.listener = function()
				{
					apply(Editor.sketchMode);
				};
				
				ui.addListener('sketchModeChanged', this.listener);
			},
			destroy: function()
			{
				ui.removeListener(this.listener);
			}
		});
		
		sketchOption.style.display = 'inline-flex';
		sketchOption.style.width = '104px';
		sketchOption.style.maxWidth = '104px';
		div.appendChild(sketchOption);
	}
	
	return div;
};

/**
 * Adds the label menu items to the given menu and parent.
 */
DiagramFormatPanel.prototype.addOptions = function(div)
{
	var ui = this.editorUi;
	var editor = ui.editor;
	var graph = editor.graph;
	
	div.appendChild(this.createTitle(mxResources.get('options')));	

	if (graph.isEnabled())
	{
		// Connection arrows
		div.appendChild(this.createOption(mxResources.get('connectionArrows'), function()
		{
			return graph.connectionArrowsEnabled;
		}, function(checked)
		{
			ui.actions.get('connectionArrows').funct();
		},
		{
			install: function(apply)
			{
				this.listener = function()
				{
					apply(graph.connectionArrowsEnabled);
				};
				
				ui.addListener('connectionArrowsChanged', this.listener);
			},
			destroy: function()
			{
				ui.removeListener(this.listener);
			}
		}));
		
		// Connection points
		div.appendChild(this.createOption(mxResources.get('connectionPoints'), function()
		{
			return graph.connectionHandler.isEnabled();
		}, function(checked)
		{
			ui.actions.get('connectionPoints').funct();
		},
		{
			install: function(apply)
			{
				this.listener = function()
				{
					apply(graph.connectionHandler.isEnabled());
				};
				
				ui.addListener('connectionPointsChanged', this.listener);
			},
			destroy: function()
			{
				ui.removeListener(this.listener);
			}
		}));

		// Guides
		div.appendChild(this.createOption(mxResources.get('guides'), function()
		{
			return graph.graphHandler.guidesEnabled;
		}, function(checked)
		{
			ui.actions.get('guides').funct();
		},
		{
			install: function(apply)
			{
				this.listener = function()
				{
					apply(graph.graphHandler.guidesEnabled);
				};
				
				ui.addListener('guidesEnabledChanged', this.listener);
			},
			destroy: function()
			{
				ui.removeListener(this.listener);
			}
		}));
	}

	return div;
};

/**
 * 
 */
DiagramFormatPanel.prototype.addGridOption = function(container)
{
	var fPanel = this;
	var ui = this.editorUi;
	var graph = ui.editor.graph;
	
	var input = document.createElement('input');
	input.style.position = 'absolute';
	input.style.textAlign = 'right';
	input.style.width = '48px';
	input.style.marginTop = '-2px';
	input.style.height = '21px';
	input.style.borderWidth = '1px';
	input.style.borderStyle = 'solid';
	input.style.boxSizing = 'border-box';
	input.value = this.inUnit(graph.getGridSize()) + ' ' + this.getUnit(); 
	
	var stepper = this.createStepper(input, update, this.getUnitStep(), null, null, null, this.isFloatUnit());
	input.style.display = (graph.isGridEnabled()) ? '' : 'none';
	stepper.style.display = input.style.display;

	mxEvent.addListener(input, 'keydown', function(e)
	{
		if (e.keyCode == 13)
		{
			graph.container.focus();
			mxEvent.consume(e);
		}
		else if (e.keyCode == 27)
		{
			input.value = graph.getGridSize();
			graph.container.focus();
			mxEvent.consume(e);
		}
	});
	
	function update(evt)
	{
		var value = fPanel.isFloatUnit()? parseFloat(input.value) : parseInt(input.value);
		value = fPanel.fromUnit(Math.max(fPanel.inUnit(1), (isNaN(value)) ? fPanel.inUnit(10) : value));
		
		if (value != graph.getGridSize())
		{
			mxGraph.prototype.gridSize = value;
			graph.setGridSize(value)
		}

		input.value = fPanel.inUnit(value) + ' ' + fPanel.getUnit();
		mxEvent.consume(evt);
	};

	mxEvent.addListener(input, 'blur', update);
	mxEvent.addListener(input, 'change', update);

	input.style.right = '78px';
	stepper.style.marginTop = (mxClient.IS_MAC && mxClient.IS_GC) ?
		'-16px' : ((mxClient.IS_WIN) ? '-18px' : '-17px');
	stepper.style.right = '66px';

	var panel = this.createColorOption(mxResources.get('grid'), function()
	{
		var color = graph.view.gridColor;

		return (graph.isGridEnabled()) ? color : null;
	}, function(color)
	{
		var enabled = graph.isGridEnabled();
		
		if (color == mxConstants.NONE)
		{
			graph.setGridEnabled(false);
		}
		else
		{
			graph.setGridEnabled(true);
			ui.setGridColor(color);
		}

		input.style.display = (graph.isGridEnabled()) ? '' : 'none';
		stepper.style.display = input.style.display;
		
		if (enabled != graph.isGridEnabled())
		{
			graph.defaultGridEnabled = graph.isGridEnabled();
			ui.fireEvent(new mxEventObject('gridEnabledChanged'));
		}
	}, Editor.isDarkMode() ? graph.view.defaultDarkGridColor : graph.view.defaultGridColor,
	{
		install: function(apply)
		{
			this.listener = function()
			{
				apply((graph.isGridEnabled()) ? graph.view.gridColor : null);
			};
			
			ui.addListener('gridColorChanged', this.listener);
			ui.addListener('gridEnabledChanged', this.listener);
		},
		destroy: function()
		{
			ui.removeListener(this.listener);
		}
	});

	panel.style.padding = '6px 0 0 0';
	panel.appendChild(input);
	panel.appendChild(stepper);
	container.appendChild(panel);
};

/**
 * Adds the label menu items to the given menu and parent.
 */
DiagramFormatPanel.prototype.addDocumentProperties = function(div)
{
	// Hook for subclassers
	var ui = this.editorUi;
	var editor = ui.editor;
	var graph = editor.graph;
	
	div.appendChild(this.createTitle(mxResources.get('options')));

	return div;
};

/**
 * Adds the label menu items to the given menu and parent.
 */
DiagramFormatPanel.prototype.addPaperSize = function(div)
{
	var ui = this.editorUi;
	var editor = ui.editor;
	var graph = editor.graph;
	
	div.appendChild(this.createTitle(mxResources.get('paperSize')));

	var accessor = PageSetupDialog.addPageFormatPanel(div, 'formatpanel', graph.pageFormat, function(pageFormat)
	{
		if (graph.pageFormat == null || graph.pageFormat.width != pageFormat.width ||
			graph.pageFormat.height != pageFormat.height)
		{
			var change = new ChangePageSetup(ui, null, null, pageFormat);
			change.ignoreColor = true;
			change.ignoreImage = true;
			
			graph.model.execute(change);
		}
	});
	
	this.addKeyHandler(accessor.widthInput, function()
	{
		accessor.set(graph.pageFormat);
	});

	this.addKeyHandler(accessor.heightInput, function()
	{
		accessor.set(graph.pageFormat);	
	});
	
	var listener = function()
	{
		accessor.set(graph.pageFormat);
	};
	
	ui.addListener('pageFormatChanged', listener);
	this.listeners.push({destroy: function() { ui.removeListener(listener); }});
	
	graph.getModel().addListener(mxEvent.CHANGE, listener);
	this.listeners.push({destroy: function() { graph.getModel().removeListener(listener); }});
	
	return div;
};

/**
 * Adds the label menu items to the given menu and parent.
 */
DiagramFormatPanel.prototype.addStyleOps = function(div)
{
	this.addActions(div, ['editData']);
	this.addActions(div, ['clearDefaultStyle']);

	return div;
};

/**
 * Adds the label menu items to the given menu and parent.
 */
DiagramFormatPanel.prototype.destroy = function()
{
	BaseFormatPanel.prototype.destroy.apply(this, arguments);
	
	if (this.gridEnabledListener)
	{
		this.editorUi.removeListener(this.gridEnabledListener);
		this.gridEnabledListener = null;
	}
};
