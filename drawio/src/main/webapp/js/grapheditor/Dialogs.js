/**
 * Copyright (c) 2006-2012, JGraph Ltd
 */
/**
 * Constructs a new open dialog.
 */
var OpenDialog = function()
{
	var iframe = document.createElement('iframe');
	iframe.style.backgroundColor = 'transparent';
	iframe.allowTransparency = 'true';
	iframe.style.borderStyle = 'none';
	iframe.style.borderWidth = '0px';
	iframe.style.overflow = 'hidden';
	iframe.style.maxWidth = '100%';
	iframe.frameBorder = '0';
	
	var dx = 0;
	iframe.setAttribute('width', (((Editor.useLocalStorage) ? 640 : 320) + dx) + 'px');
	iframe.setAttribute('height', (((Editor.useLocalStorage) ? 480 : 220) + dx) + 'px');
	iframe.setAttribute('src', OPEN_FORM);
	
	this.container = iframe;
};

/**
 * Constructs a new color dialog.
 */
var ColorDialog = function(editorUi, color, apply, cancelFn)
{
	this.editorUi = editorUi;
	
	var input = document.createElement('input');
	input.style.marginBottom = '10px';
	
	// Required for picker to render in IE
	if (mxClient.IS_IE)
	{
		input.style.marginTop = '10px';
		document.body.appendChild(input);
	}

	var applyFunction = (apply != null) ? apply : this.createApplyFunction();
	
	function doApply()
	{
		var color = input.value;
		
		// Blocks any non-alphabetic chars in colors
		if (/(^#?[a-zA-Z0-9]*$)/.test(color))
		{
			if (color != 'none' && color.charAt(0) != '#')
			{
				color = '#' + color;
			}

			ColorDialog.addRecentColor((color != 'none') ? color.substring(1) : color, 12);
			applyFunction(color);
			editorUi.hideDialog();
		}
		else
		{
			editorUi.handleError({message: mxResources.get('invalidInput')});	
		}
	};
	
	this.init = function()
	{
		if (!mxClient.IS_TOUCH)
		{
			input.focus();
		}
	};

	var picker = new mxJSColor.color(input);
	picker.pickerOnfocus = false;
	picker.showPicker();

	var div = document.createElement('div');
	mxJSColor.picker.box.style.position = 'relative';
	mxJSColor.picker.box.style.width = '230px';
	mxJSColor.picker.box.style.height = '100px';
	mxJSColor.picker.box.style.paddingBottom = '10px';
	div.appendChild(mxJSColor.picker.box);

	var center = document.createElement('center');
	
	function createRecentColorTable()
	{
		var table = addPresets((ColorDialog.recentColors.length == 0) ? ['FFFFFF'] :
					ColorDialog.recentColors, 11, 'FFFFFF', true);
		table.style.marginBottom = '8px';
		
		return table;
	};
	
	var addPresets = mxUtils.bind(this, function(presets, rowLength, defaultColor, addResetOption)
	{
		rowLength = (rowLength != null) ? rowLength : 12;
		var table = document.createElement('table');
		table.style.borderCollapse = 'collapse';
		table.setAttribute('cellspacing', '0');
		table.style.marginBottom = '20px';
		table.style.cellSpacing = '0px';
		table.style.marginLeft = '1px';
		var tbody = document.createElement('tbody');
		table.appendChild(tbody);

		var rows = presets.length / rowLength;
		
		for (var row = 0; row < rows; row++)
		{
			var tr = document.createElement('tr');
			
			for (var i = 0; i < rowLength; i++)
			{
				(mxUtils.bind(this, function(clr)
				{
					var td = document.createElement('td');
					td.style.border = '0px solid black';
					td.style.padding = '0px';
					td.style.width = '16px';
					td.style.height = '16px';
					
					if (clr == null)
					{
						clr = defaultColor;
					}

					if (clr != null)
					{
						td.style.borderWidth = '1px';

						if (clr == 'none')
						{
							td.style.background = 'url(\'' + Dialog.prototype.noColorImage + '\')';
						}
						else
						{
							td.style.backgroundColor = '#' + clr;
						}

						var name = this.colorNames[clr.toUpperCase()];

						if (name != null)
						{
							td.setAttribute('title', name);
						}
					}
					
					tr.appendChild(td);

					if (clr != null)
					{
						td.style.cursor = 'pointer';
						
						mxEvent.addListener(td, 'click', function()
						{
							if (clr == 'none')
							{
								picker.fromString('ffffff');
								input.value = 'none';
							}
							else
							{
								picker.fromString(clr);
							}
						});
						
						mxEvent.addListener(td, 'dblclick', doApply);
					}
				}))(presets[row * rowLength + i]);
			}
			
			tbody.appendChild(tr);
		}
		
		if (addResetOption)
		{
			var td = document.createElement('td');
			td.setAttribute('title', mxResources.get('reset'));
			td.style.border = '1px solid black';
			td.style.padding = '0px';
			td.style.width = '16px';
			td.style.height = '16px';
			td.style.backgroundImage = 'url(\'' + Dialog.prototype.closeImage + '\')';
			td.style.backgroundPosition = 'center center';
			td.style.backgroundRepeat = 'no-repeat';
			td.style.cursor = 'pointer';
			
			tr.appendChild(td);

			mxEvent.addListener(td, 'click', function()
			{
				ColorDialog.resetRecentColors();
				table.parentNode.replaceChild(createRecentColorTable(), table);
			});
		}
		
		center.appendChild(table);
		
		return table;
	});

	div.appendChild(input);

	if (!mxClient.IS_IE && !mxClient.IS_IE11)
	{
		input.style.width = '182px';

		var clrInput = document.createElement('input');
		clrInput.setAttribute('type', 'color');
		clrInput.style.position = 'relative';
		clrInput.style.visibility = 'hidden';
		clrInput.style.top = '10px';
		clrInput.style.width = '0px';
		clrInput.style.height = '0px';
		clrInput.style.border = 'none';
		
		div.style.whiteSpace = 'nowrap';
		div.appendChild(clrInput);

		var dropperBtn = mxUtils.button('', function()
		{
			// LATER: Check if clrInput is expanded
			if (document.activeElement == clrInput)
			{
				input.focus();
			}
			else
			{
				clrInput.value = '#' + input.value;
				clrInput.click();
			}
		});

		var dropper = document.createElement('img');
		dropper.src = Editor.colorDropperImage;
		dropper.className = 'geAdaptiveAsset';
		dropper.style.position = 'relative';
		dropper.style.verticalAlign = 'middle';
		dropper.style.width = 'auto';
		dropper.style.height = '14px';

		dropperBtn.appendChild(dropper);
		div.appendChild(dropperBtn);

		mxEvent.addListener(clrInput, 'change', function()
		{
			picker.fromString(clrInput.value.substring(1));
		});
	}
	else
	{
		input.style.width = '216px';
	}

	mxUtils.br(div);
	
	// Adds recent colors
	createRecentColorTable();
		
	// Adds presets
	var table = addPresets(this.presetColors);
	table.style.marginBottom = '8px';
	table = addPresets(this.defaultColors);
	table.style.marginBottom = '16px';

	div.appendChild(center);

	var buttons = document.createElement('div');
	buttons.style.textAlign = 'right';
	buttons.style.whiteSpace = 'nowrap';
	
	var cancelBtn = mxUtils.button(mxResources.get('cancel'), function()
	{
		editorUi.hideDialog();
		
		if (cancelFn != null)
		{
			cancelFn();
		}
	});
	cancelBtn.className = 'geBtn';

	if (editorUi.editor.cancelFirst)
	{
		buttons.appendChild(cancelBtn);
	}
	
	var applyBtn = mxUtils.button(mxResources.get('apply'), doApply);
	applyBtn.className = 'geBtn gePrimaryBtn';
	buttons.appendChild(applyBtn);
	
	if (!editorUi.editor.cancelFirst)
	{
		buttons.appendChild(cancelBtn);
	}
	
	if (color != null)
	{
		if (color == 'none')
		{
			picker.fromString('ffffff');
			input.value = 'none';
		}
		else
		{
			picker.fromString(color);
		}
	}
	
	div.appendChild(buttons);
	this.picker = picker;
	this.colorInput = input;

	// LATER: Only fires if input if focused, should always
	// fire if this dialog is showing.
	mxEvent.addListener(div, 'keydown', function(e)
	{
		if (e.keyCode == 27)
		{
			editorUi.hideDialog();
			
			if (cancelFn != null)
			{
				cancelFn();
			}
			
			mxEvent.consume(e);
		}
	});
	
	this.container = div;
};

/**
 * Creates function to apply value
 */
ColorDialog.prototype.presetColors = ['E6D0DE', 'CDA2BE', 'B5739D', 'E1D5E7', 'C3ABD0', 'A680B8', 'D4E1F5', 'A9C4EB', '7EA6E0', 'D5E8D4', '9AC7BF', '67AB9F', 'D5E8D4', 'B9E0A5', '97D077', 'FFF2CC', 'FFE599', 'FFD966', 'FFF4C3', 'FFCE9F', 'FFB570', 'F8CECC', 'F19C99', 'EA6B66']; 

/**
 * Creates function to apply value
 */
 ColorDialog.prototype.colorNames = {};

/**
 * Creates function to apply value
 */
ColorDialog.prototype.defaultColors = ['none', 'FFFFFF', 'E6E6E6', 'CCCCCC', 'B3B3B3', '999999', '808080', '666666', '4D4D4D', '333333', '1A1A1A', '000000', 'FFCCCC', 'FFE6CC', 'FFFFCC', 'E6FFCC', 'CCFFCC', 'CCFFE6', 'CCFFFF', 'CCE5FF', 'CCCCFF', 'E5CCFF', 'FFCCFF', 'FFCCE6',
		'FF9999', 'FFCC99', 'FFFF99', 'CCFF99', '99FF99', '99FFCC', '99FFFF', '99CCFF', '9999FF', 'CC99FF', 'FF99FF', 'FF99CC', 'FF6666', 'FFB366', 'FFFF66', 'B3FF66', '66FF66', '66FFB3', '66FFFF', '66B2FF', '6666FF', 'B266FF', 'FF66FF', 'FF66B3', 'FF3333', 'FF9933', 'FFFF33',
		'99FF33', '33FF33', '33FF99', '33FFFF', '3399FF', '3333FF', '9933FF', 'FF33FF', 'FF3399', 'FF0000', 'FF8000', 'FFFF00', '80FF00', '00FF00', '00FF80', '00FFFF', '007FFF', '0000FF', '7F00FF', 'FF00FF', 'FF0080', 'CC0000', 'CC6600', 'CCCC00', '66CC00', '00CC00', '00CC66',
		'00CCCC', '0066CC', '0000CC', '6600CC', 'CC00CC', 'CC0066', '990000', '994C00', '999900', '4D9900', '009900', '00994D', '009999', '004C99', '000099', '4C0099', '990099', '99004D', '660000', '663300', '666600', '336600', '006600', '006633', '006666', '003366', '000066',
		'330066', '660066', '660033', '330000', '331A00', '333300', '1A3300', '003300', '00331A', '003333', '001933', '000033', '190033', '330033', '33001A'];

/**
 * Creates function to apply value
 */
ColorDialog.prototype.createApplyFunction = function()
{
	return mxUtils.bind(this, function(color)
	{
		var graph = this.editorUi.editor.graph;
		
		graph.getModel().beginUpdate();
		try
		{
			graph.setCellStyles(this.currentColorKey, color);
			this.editorUi.fireEvent(new mxEventObject('styleChanged', 'keys', [this.currentColorKey],
				'values', [color], 'cells', graph.getSelectionCells()));
		}
		finally
		{
			graph.getModel().endUpdate();
		}
	});
};

/**
 * 
 */
ColorDialog.recentColors = [];

/**
 * Adds recent color for later use.
 */
ColorDialog.addRecentColor = function(color, max)
{
	if (color != null)
	{
		mxUtils.remove(color, ColorDialog.recentColors);
		ColorDialog.recentColors.splice(0, 0, color);
		
		if (ColorDialog.recentColors.length >= max)
		{
			ColorDialog.recentColors.pop();
		}
	}
};

/**
 * Adds recent color for later use.
 */
ColorDialog.resetRecentColors = function()
{
	ColorDialog.recentColors = [];
};

/**
 * Constructs a new about dialog.
 */
var AboutDialog = function(editorUi)
{
	var div = document.createElement('div');
	div.setAttribute('align', 'center');
	var h3 = document.createElement('h3');
	mxUtils.write(h3, mxResources.get('about') + ' GraphEditor');
	div.appendChild(h3);
	var img = document.createElement('img');
	img.style.border = '0px';
	img.setAttribute('width', '176');
	img.setAttribute('width', '151');
	img.setAttribute('src', IMAGE_PATH + '/logo.png');
	div.appendChild(img);
	mxUtils.br(div);
	mxUtils.write(div, 'Powered by mxGraph ' + mxClient.VERSION);
	mxUtils.br(div);
	var link = document.createElement('a');
	link.setAttribute('href', 'http://www.jgraph.com/');
	link.setAttribute('target', '_blank');
	mxUtils.write(link, 'www.jgraph.com');
	div.appendChild(link);
	mxUtils.br(div);
	mxUtils.br(div);
	var closeBtn = mxUtils.button(mxResources.get('close'), function()
	{
		editorUi.hideDialog();
	});
	closeBtn.className = 'geBtn gePrimaryBtn';
	div.appendChild(closeBtn);
	
	this.container = div;
};

/**
 * Constructs a new textarea dialog.
 */
var TextareaDialog = function(editorUi, title, url, fn, cancelFn, cancelTitle, w, h,
	addButtons, noHide, noWrap, applyTitle, helpLink, customButtons, header)
{
	w = (w != null) ? w : 300;
	h = (h != null) ? h : 120;
	noHide = (noHide != null) ? noHide : false;

	var div = document.createElement('div');
	div.style.position = 'absolute';
	div.style.top = '20px';
	div.style.bottom = '20px';
	div.style.left = '20px';
	div.style.right = '20px';

	var top = document.createElement('div');

	top.style.position = 'absolute';
	top.style.left = '0px';
	top.style.right = '0px';

	var main = top.cloneNode(false);
	var buttons = top.cloneNode(false);

	top.style.top = '0px';
	top.style.height = '20px';
	main.style.top = '20px';
	main.style.bottom = '64px';
	buttons.style.bottom = '0px';
	buttons.style.height = '60px';
	buttons.style.textAlign = 'center';

	mxUtils.write(top, title);

	div.appendChild(top);
	div.appendChild(main);
	div.appendChild(buttons);

	if (header != null)
	{
		top.appendChild(header);
	}
	
	var nameInput = document.createElement('textarea');
	
	if (noWrap)
	{
		nameInput.setAttribute('wrap', 'off');
	}
	
	nameInput.setAttribute('spellcheck', 'false');
	nameInput.setAttribute('autocorrect', 'off');
	nameInput.setAttribute('autocomplete', 'off');
	nameInput.setAttribute('autocapitalize', 'off');
	
	mxUtils.write(nameInput, url || '');
	nameInput.style.resize = 'none';
	nameInput.style.outline = 'none';
	nameInput.style.position = 'absolute';
	nameInput.style.boxSizing = 'border-box';
	nameInput.style.top = '0px';
	nameInput.style.left = '0px';
	nameInput.style.height = '100%';
	nameInput.style.width = '100%';
	
	this.textarea = nameInput;

	this.init = function()
	{
		nameInput.focus();
		nameInput.scrollTop = 0;
	};

	main.appendChild(nameInput);

	if (helpLink != null)
	{
		var helpBtn = mxUtils.button(mxResources.get('help'), function()
		{
			editorUi.editor.graph.openLink(helpLink);
		});
		helpBtn.className = 'geBtn';
		
		buttons.appendChild(helpBtn);
	}
	
	if (customButtons != null)
	{
		for (var i = 0; i < customButtons.length; i++)
		{
			(function(label, fn, title)
			{
				var customBtn = mxUtils.button(label, function(e)
				{
					fn(e, nameInput);
				});

				if (title != null)
				{
					customBtn.setAttribute('title', title);
				}

				customBtn.className = 'geBtn';
				
				buttons.appendChild(customBtn);
			})(customButtons[i][0], customButtons[i][1], customButtons[i][2]);
		}
	}
	
	var cancelBtn = mxUtils.button(cancelTitle || mxResources.get('cancel'), function()
	{
		editorUi.hideDialog();
		
		if (cancelFn != null)
		{
			cancelFn();
		}
	});

	cancelBtn.setAttribute('title', 'Escape');
	cancelBtn.className = 'geBtn';
	
	if (editorUi.editor.cancelFirst)
	{
		buttons.appendChild(cancelBtn);
	}
	
	if (addButtons != null)
	{
		addButtons(buttons, nameInput);
	}
	
	if (fn != null)
	{
		var genericBtn = mxUtils.button(applyTitle || mxResources.get('apply'), function()
		{
			if (!noHide)
			{
				editorUi.hideDialog();
			}
			
			fn(nameInput.value);
		});
		
		genericBtn.setAttribute('title', 'Ctrl+Enter');
		genericBtn.className = 'geBtn gePrimaryBtn';
		buttons.appendChild(genericBtn);

		mxEvent.addListener(nameInput, 'keypress', function(e)
		{
			if (e.keyCode == 13 && mxEvent.isControlDown(e))
			{
				genericBtn.click();
			}
		});
	}
	
	if (!editorUi.editor.cancelFirst)
	{
		buttons.appendChild(cancelBtn);
	}

	this.container = div;
};

/**
 * Constructs a new edit file dialog.
 */
var EditDiagramDialog = function(editorUi)
{
	var div = document.createElement('div');
	div.style.textAlign = 'right';
	var textarea = document.createElement('textarea');
	textarea.setAttribute('wrap', 'off');
	textarea.setAttribute('spellcheck', 'false');
	textarea.setAttribute('autocorrect', 'off');
	textarea.setAttribute('autocomplete', 'off');
	textarea.setAttribute('autocapitalize', 'off');
	textarea.style.overflow = 'auto';
	textarea.style.resize = 'none';
	textarea.style.width = '600px';
	textarea.style.height = '360px';
	textarea.style.marginBottom = '16px';
	
	textarea.value = mxUtils.getPrettyXml(editorUi.editor.getGraphXml());
	div.appendChild(textarea);
	
	this.init = function()
	{
		textarea.focus();
	};
	
	// Enables dropping files
	if (Graph.fileSupport)
	{
		function handleDrop(evt)
		{
		    evt.stopPropagation();
		    evt.preventDefault();
		    
		    if (evt.dataTransfer.files.length > 0)
		    {
    			var file = evt.dataTransfer.files[0];
    			var reader = new FileReader();
				
				reader.onload = function(e)
				{
					textarea.value = e.target.result;
				};
				
				reader.readAsText(file);
    		}
		    else
		    {
		    	textarea.value = editorUi.extractGraphModelFromEvent(evt);
		    }
		};
		
		function handleDragOver(evt)
		{
			evt.stopPropagation();
			evt.preventDefault();
		};

		// Setup the dnd listeners.
		textarea.addEventListener('dragover', handleDragOver, false);
		textarea.addEventListener('drop', handleDrop, false);
	}
	
	var cancelBtn = mxUtils.button(mxResources.get('cancel'), function()
	{
		editorUi.hideDialog();
	});
	cancelBtn.className = 'geBtn';
	
	if (editorUi.editor.cancelFirst)
	{
		div.appendChild(cancelBtn);
	}
	
	var select = document.createElement('select');
	select.style.width = '196px';
	select.className = 'geBtn';

	if (editorUi.editor.graph.isEnabled())
	{
		var replaceOption = document.createElement('option');
		replaceOption.setAttribute('value', 'replace');
		mxUtils.write(replaceOption, mxResources.get('replaceExistingDrawing'));
		select.appendChild(replaceOption);
	}

	var newOption = document.createElement('option');
	newOption.setAttribute('value', 'new');
	mxUtils.write(newOption, mxResources.get('openInNewWindow'));
	
	if (EditDiagramDialog.showNewWindowOption)
	{
		select.appendChild(newOption);
	}

	if (editorUi.editor.graph.isEnabled())
	{
		var importOption = document.createElement('option');
		importOption.setAttribute('value', 'import');
		mxUtils.write(importOption, mxResources.get('addToExistingDrawing'));
		select.appendChild(importOption);
	}

	div.appendChild(select);

	var okBtn = mxUtils.button(mxResources.get('ok'), function()
	{
		// Removes all illegal control characters before parsing
		var data = Graph.zapGremlins(mxUtils.trim(textarea.value));
		var error = null;
		
		if (select.value == 'new')
		{
			editorUi.hideDialog();
			editorUi.editor.editAsNew(data);
		}
		else if (select.value == 'replace')
		{
			try
			{
				editorUi.replaceDiagramData(data);
				editorUi.hideDialog();
			}
			catch (e)
			{
				error = e;
			}
		}
		else if (select.value == 'import')
		{
			editorUi.editor.graph.model.beginUpdate();
			try
			{
				var doc = mxUtils.parseXml(data);
				var model = new mxGraphModel();
				var codec = new mxCodec(doc);
				codec.decode(doc.documentElement, model);
				
				var children = model.getChildren(model.getChildAt(model.getRoot(), 0));
				editorUi.editor.graph.setSelectionCells(editorUi.editor.graph.importCells(children));
				
				// LATER: Why is hideDialog between begin-/endUpdate faster?
				editorUi.hideDialog();
			}
			catch (e)
			{
				error = e;
			}
			finally
			{
				editorUi.editor.graph.model.endUpdate();				
			}
		}
			
		if (error != null)
		{
			mxUtils.alert(error.message);
		}
	});
	okBtn.className = 'geBtn gePrimaryBtn';
	div.appendChild(okBtn);
	
	if (!editorUi.editor.cancelFirst)
	{
		div.appendChild(cancelBtn);
	}

	this.container = div;
};

/**
 * 
 */
EditDiagramDialog.showNewWindowOption = true;

/**
 * Constructs a new export dialog.
 */
var ExportDialog = function(editorUi)
{
	var graph = editorUi.editor.graph;
	var bounds = graph.getGraphBounds();
	var scale = graph.view.scale;
	
	var width = Math.ceil(bounds.width / scale);
	var height = Math.ceil(bounds.height / scale);

	var row, td;
	
	var table = document.createElement('table');
	var tbody = document.createElement('tbody');
	table.setAttribute('cellpadding', (mxClient.IS_SF) ? '0' : '2');
	
	row = document.createElement('tr');
	
	td = document.createElement('td');
	td.style.fontSize = '10pt';
	td.style.width = '100px';
	mxUtils.write(td, mxResources.get('filename') + ':');
	
	row.appendChild(td);
	
	var nameInput = document.createElement('input');
	nameInput.setAttribute('value', editorUi.editor.getOrCreateFilename());
	nameInput.style.width = '180px';

	td = document.createElement('td');
	td.appendChild(nameInput);
	row.appendChild(td);
	
	tbody.appendChild(row);
		
	row = document.createElement('tr');
	
	td = document.createElement('td');
	td.style.fontSize = '10pt';
	mxUtils.write(td, mxResources.get('format') + ':');
	
	row.appendChild(td);
	
	var imageFormatSelect = document.createElement('select');
	imageFormatSelect.style.width = '180px';

	var pngOption = document.createElement('option');
	pngOption.setAttribute('value', 'png');
	mxUtils.write(pngOption, mxResources.get('formatPng'));
	imageFormatSelect.appendChild(pngOption);

	var gifOption = document.createElement('option');
	
	if (ExportDialog.showGifOption)
	{
		gifOption.setAttribute('value', 'gif');
		mxUtils.write(gifOption, mxResources.get('formatGif'));
		imageFormatSelect.appendChild(gifOption);
	}
	
	var jpgOption = document.createElement('option');
	jpgOption.setAttribute('value', 'jpg');
	mxUtils.write(jpgOption, mxResources.get('formatJpg'));
	imageFormatSelect.appendChild(jpgOption);

	if (!editorUi.printPdfExport)
	{
		var pdfOption = document.createElement('option');
		pdfOption.setAttribute('value', 'pdf');
		mxUtils.write(pdfOption, mxResources.get('formatPdf'));
		imageFormatSelect.appendChild(pdfOption);
	}

	var svgOption = document.createElement('option');
	svgOption.setAttribute('value', 'svg');
	mxUtils.write(svgOption, mxResources.get('formatSvg'));
	imageFormatSelect.appendChild(svgOption);
	
	if (ExportDialog.showXmlOption)
	{
		var xmlOption = document.createElement('option');
		xmlOption.setAttribute('value', 'xml');
		mxUtils.write(xmlOption, mxResources.get('formatXml'));
		imageFormatSelect.appendChild(xmlOption);
	}

	td = document.createElement('td');
	td.appendChild(imageFormatSelect);
	row.appendChild(td);
	
	tbody.appendChild(row);
	
	row = document.createElement('tr');

	td = document.createElement('td');
	td.style.fontSize = '10pt';
	mxUtils.write(td, mxResources.get('zoom') + ' (%):');
	
	row.appendChild(td);
	
	var zoomInput = document.createElement('input');
	zoomInput.setAttribute('type', 'number');
	zoomInput.setAttribute('value', '100');
	zoomInput.style.width = '180px';

	td = document.createElement('td');
	td.appendChild(zoomInput);
	row.appendChild(td);

	tbody.appendChild(row);

	row = document.createElement('tr');

	td = document.createElement('td');
	td.style.fontSize = '10pt';
	mxUtils.write(td, mxResources.get('width') + ':');
	
	row.appendChild(td);
	
	var widthInput = document.createElement('input');
	widthInput.setAttribute('value', width);
	widthInput.style.width = '180px';

	td = document.createElement('td');
	td.appendChild(widthInput);
	row.appendChild(td);

	tbody.appendChild(row);
	
	row = document.createElement('tr');
	
	td = document.createElement('td');
	td.style.fontSize = '10pt';
	mxUtils.write(td, mxResources.get('height') + ':');
	
	row.appendChild(td);
	
	var heightInput = document.createElement('input');
	heightInput.setAttribute('value', height);
	heightInput.style.width = '180px';

	td = document.createElement('td');
	td.appendChild(heightInput);
	row.appendChild(td);

	tbody.appendChild(row);
	
	row = document.createElement('tr');
	
	td = document.createElement('td');
	td.style.fontSize = '10pt';
	mxUtils.write(td, mxResources.get('dpi') + ':');
	
	row.appendChild(td);
	
	var dpiSelect = document.createElement('select');
	dpiSelect.style.width = '180px';

	var dpi100Option = document.createElement('option');
	dpi100Option.setAttribute('value', '100');
	mxUtils.write(dpi100Option, '100dpi');
	dpiSelect.appendChild(dpi100Option);

	var dpi200Option = document.createElement('option');
	dpi200Option.setAttribute('value', '200');
	mxUtils.write(dpi200Option, '200dpi');
	dpiSelect.appendChild(dpi200Option);
	
	var dpi300Option = document.createElement('option');
	dpi300Option.setAttribute('value', '300');
	mxUtils.write(dpi300Option, '300dpi');
	dpiSelect.appendChild(dpi300Option);
	
	var dpi400Option = document.createElement('option');
	dpi400Option.setAttribute('value', '400');
	mxUtils.write(dpi400Option, '400dpi');
	dpiSelect.appendChild(dpi400Option);
	
	var dpiCustOption = document.createElement('option');
	dpiCustOption.setAttribute('value', 'custom');
	mxUtils.write(dpiCustOption, mxResources.get('custom'));
	dpiSelect.appendChild(dpiCustOption);

	var customDpi = document.createElement('input');
	customDpi.style.width = '180px';
	customDpi.style.display = 'none';
	customDpi.setAttribute('value', '100');
	customDpi.setAttribute('type', 'number');
	customDpi.setAttribute('min', '50');
	customDpi.setAttribute('step', '50');
	
	var zoomUserChanged = false;
	
	mxEvent.addListener(dpiSelect, 'change', function()
	{
		if (this.value == 'custom')
		{
			this.style.display = 'none';
			customDpi.style.display = '';
			customDpi.focus();
		}
		else
		{
			customDpi.value = this.value;
			
			if (!zoomUserChanged) 
			{
				zoomInput.value = this.value;
			}
		}
	});
	
	mxEvent.addListener(customDpi, 'change', function()
	{
		var dpi = parseInt(customDpi.value);
		
		if (isNaN(dpi) || dpi <= 0)
		{
			customDpi.style.backgroundColor = 'red';
		}
		else
		{
			customDpi.style.backgroundColor = '';

			if (!zoomUserChanged) 
			{
				zoomInput.value = dpi;
			}
		}	
	});
	
	td = document.createElement('td');
	td.appendChild(dpiSelect);
	td.appendChild(customDpi);
	row.appendChild(td);

	tbody.appendChild(row);
	
	row = document.createElement('tr');
	
	td = document.createElement('td');
	td.style.fontSize = '10pt';
	mxUtils.write(td, mxResources.get('background') + ':');
	
	row.appendChild(td);
	
	var transparentCheckbox = document.createElement('input');
	transparentCheckbox.setAttribute('type', 'checkbox');
	transparentCheckbox.checked = graph.background == null || graph.background == mxConstants.NONE;

	td = document.createElement('td');
	td.appendChild(transparentCheckbox);
	mxUtils.write(td, mxResources.get('transparent'));
	
	row.appendChild(td);
	
	tbody.appendChild(row);
	
	row = document.createElement('tr');
	
	td = document.createElement('td');
	td.style.fontSize = '10pt';
	mxUtils.write(td, mxResources.get('grid') + ':');
	
	row.appendChild(td);
	
	var gridCheckbox = document.createElement('input');
	gridCheckbox.setAttribute('type', 'checkbox');
	gridCheckbox.checked = false;

	td = document.createElement('td');
	td.appendChild(gridCheckbox);
	
	row.appendChild(td);
	
	tbody.appendChild(row);
	
	row = document.createElement('tr');

	td = document.createElement('td');
	td.style.fontSize = '10pt';
	mxUtils.write(td, mxResources.get('borderWidth') + ':');
	
	row.appendChild(td);
	
	var borderInput = document.createElement('input');
	borderInput.setAttribute('type', 'number');
	borderInput.setAttribute('value', ExportDialog.lastBorderValue);
	borderInput.style.width = '180px';

	td = document.createElement('td');
	td.appendChild(borderInput);
	row.appendChild(td);

	tbody.appendChild(row);
	table.appendChild(tbody);
	
	// Handles changes in the export format
	function formatChanged()
	{
		var name = nameInput.value;
		var dot = name.lastIndexOf('.');
		
		if (dot > 0)
		{
			nameInput.value = name.substring(0, dot + 1) + imageFormatSelect.value;
		}
		else
		{
			nameInput.value = name + '.' + imageFormatSelect.value;
		}
		
		if (imageFormatSelect.value === 'xml')
		{
			zoomInput.setAttribute('disabled', 'true');
			widthInput.setAttribute('disabled', 'true');
			heightInput.setAttribute('disabled', 'true');
			borderInput.setAttribute('disabled', 'true');
		}
		else
		{
			zoomInput.removeAttribute('disabled');
			widthInput.removeAttribute('disabled');
			heightInput.removeAttribute('disabled');
			borderInput.removeAttribute('disabled');
		}
		
		if (imageFormatSelect.value === 'png' || imageFormatSelect.value === 'svg' || imageFormatSelect.value === 'pdf')
		{
			transparentCheckbox.removeAttribute('disabled');
		}
		else
		{
			transparentCheckbox.setAttribute('disabled', 'disabled');
		}
		
		if (imageFormatSelect.value === 'png' || imageFormatSelect.value === 'jpg' || imageFormatSelect.value === 'pdf')
		{
			gridCheckbox.removeAttribute('disabled');
		}
		else
		{
			gridCheckbox.setAttribute('disabled', 'disabled');
		}
		
		if (imageFormatSelect.value === 'png')
		{
			dpiSelect.removeAttribute('disabled');
			customDpi.removeAttribute('disabled');
		}
		else
		{
			dpiSelect.setAttribute('disabled', 'disabled');
			customDpi.setAttribute('disabled', 'disabled');
		}
	};
	
	mxEvent.addListener(imageFormatSelect, 'change', formatChanged);
	formatChanged();

	function checkValues()
	{
		if (widthInput.value * heightInput.value > MAX_AREA || widthInput.value <= 0)
		{
			widthInput.style.backgroundColor = 'red';
		}
		else
		{
			widthInput.style.backgroundColor = '';
		}
		
		if (widthInput.value * heightInput.value > MAX_AREA || heightInput.value <= 0)
		{
			heightInput.style.backgroundColor = 'red';
		}
		else
		{
			heightInput.style.backgroundColor = '';
		}
	};

	mxEvent.addListener(zoomInput, 'change', function()
	{
		zoomUserChanged = true;
		var s = Math.max(0, parseFloat(zoomInput.value) || 100) / 100;
		zoomInput.value = parseFloat((s * 100).toFixed(2));
		
		if (width > 0)
		{
			widthInput.value = Math.floor(width * s);
			heightInput.value = Math.floor(height * s);
		}
		else
		{
			zoomInput.value = '100';
			widthInput.value = width;
			heightInput.value = height;
		}
		
		checkValues();
	});

	mxEvent.addListener(widthInput, 'change', function()
	{
		var s = parseInt(widthInput.value) / width;
		
		if (s > 0)
		{
			zoomInput.value = parseFloat((s * 100).toFixed(2));
			heightInput.value = Math.floor(height * s);
		}
		else
		{
			zoomInput.value = '100';
			widthInput.value = width;
			heightInput.value = height;
		}
		
		checkValues();
	});

	mxEvent.addListener(heightInput, 'change', function()
	{
		var s = parseInt(heightInput.value) / height;
		
		if (s > 0)
		{
			zoomInput.value = parseFloat((s * 100).toFixed(2));
			widthInput.value = Math.floor(width * s);
		}
		else
		{
			zoomInput.value = '100';
			widthInput.value = width;
			heightInput.value = height;
		}
		
		checkValues();
	});
	
	row = document.createElement('tr');
	td = document.createElement('td');
	td.setAttribute('align', 'right');
	td.style.paddingTop = '22px';
	td.colSpan = 2;
	
	var saveBtn = mxUtils.button(mxResources.get('export'), mxUtils.bind(this, function()
	{
		if (parseInt(zoomInput.value) <= 0)
		{
			mxUtils.alert(mxResources.get('drawingEmpty'));
		}
		else
		{
	    	var name = nameInput.value;
			var format = imageFormatSelect.value;
	    	var s = Math.max(0, parseFloat(zoomInput.value) || 100) / 100;
			var b = Math.max(0, parseInt(borderInput.value));
			var bg = graph.background;
			var dpi = Math.max(1, parseInt(customDpi.value));
			
			if ((format == 'svg' || format == 'png' || format == 'pdf') && transparentCheckbox.checked)
			{
				bg = null;
			}
			else if (bg == null || bg == mxConstants.NONE)
			{
				bg = '#ffffff';
			}
			
			ExportDialog.lastBorderValue = b;
			ExportDialog.exportFile(editorUi, name, format, bg, s, b, dpi, gridCheckbox.checked);
		}
	}));
	saveBtn.className = 'geBtn gePrimaryBtn';
	
	var cancelBtn = mxUtils.button(mxResources.get('cancel'), function()
	{
		editorUi.hideDialog();
	});
	cancelBtn.className = 'geBtn';
	
	if (editorUi.editor.cancelFirst)
	{
		td.appendChild(cancelBtn);
		td.appendChild(saveBtn);
	}
	else
	{
		td.appendChild(saveBtn);
		td.appendChild(cancelBtn);
	}

	row.appendChild(td);
	tbody.appendChild(row);
	table.appendChild(tbody);
	this.container = table;
};

/**
 * Remembers last value for border.
 */
ExportDialog.lastBorderValue = 0;

/**
 * Global switches for the export dialog.
 */
ExportDialog.showGifOption = true;

/**
 * Global switches for the export dialog.
 */
ExportDialog.showXmlOption = true;

/**
 * Hook for getting the export format. Returns null for the default
 * intermediate XML export format or a function that returns the
 * parameter and value to be used in the request in the form
 * key=value, where value should be URL encoded.
 */
ExportDialog.exportFile = function(editorUi, name, format, bg, s, b, dpi, grid)
{
	var graph = editorUi.editor.graph;
	
	if (format == 'xml')
	{
    	ExportDialog.saveLocalFile(editorUi, mxUtils.getXml(editorUi.editor.getGraphXml()), name, format);
	}
    else if (format == 'svg')
	{
		ExportDialog.saveLocalFile(editorUi, mxUtils.getXml(graph.getSvg(bg, s, b)), name, format);
	}
    else
    {
    	var bounds = graph.getGraphBounds();
    	
		// New image export
		var xmlDoc = mxUtils.createXmlDocument();
		var root = xmlDoc.createElement('output');
		xmlDoc.appendChild(root);
		
	    // Renders graph. Offset will be multiplied with state's scale when painting state.
		var xmlCanvas = new mxXmlCanvas2D(root);
		xmlCanvas.translate(Math.floor((b / s - bounds.x) / graph.view.scale),
			Math.floor((b / s - bounds.y) / graph.view.scale));
		xmlCanvas.scale(s / graph.view.scale);
		
		var imgExport = new mxImageExport()
	    imgExport.drawState(graph.getView().getState(graph.model.root), xmlCanvas);
	    
		// Puts request data together
		var param = 'xml=' + encodeURIComponent(mxUtils.getXml(root));
		var w = Math.ceil(bounds.width * s / graph.view.scale + 2 * b);
		var h = Math.ceil(bounds.height * s / graph.view.scale + 2 * b);
		
		// Requests image if request is valid
		if (param.length <= MAX_REQUEST_SIZE && w * h < MAX_AREA)
		{
			editorUi.hideDialog();
			var req = new mxXmlRequest(EXPORT_URL, 'format=' + format +
				'&filename=' + encodeURIComponent(name) +
				'&bg=' + ((bg != null) ? bg : 'none') +
				'&w=' + w + '&h=' + h + '&' + param +
				'&dpi=' + dpi);
			req.simulate(document, '_blank');
		}
		else
		{
			mxUtils.alert(mxResources.get('drawingTooLarge'));
		}
	}
};

/**
 * Hook for getting the export format. Returns null for the default
 * intermediate XML export format or a function that returns the
 * parameter and value to be used in the request in the form
 * key=value, where value should be URL encoded.
 */
ExportDialog.saveLocalFile = function(editorUi, data, filename, format)
{
	if (data.length < MAX_REQUEST_SIZE)
	{
		editorUi.hideDialog();
		var req = new mxXmlRequest(SAVE_URL, 'xml=' + encodeURIComponent(data) + '&filename=' +
			encodeURIComponent(filename) + '&format=' + format);
		req.simulate(document, '_blank');
	}
	else
	{
		mxUtils.alert(mxResources.get('drawingTooLarge'));
		mxUtils.popup(xml);
	}
};

/**
 * Constructs a new metadata dialog.
 */
var EditDataDialog = function(ui, cell)
{
	var div = document.createElement('div');
	var graph = ui.editor.graph;
	
	var value = graph.getModel().getValue(cell);
	
	// Converts the value to an XML node
	if (!mxUtils.isNode(value))
	{
		var doc = mxUtils.createXmlDocument();
		var obj = doc.createElement('object');
		obj.setAttribute('label', value || '');
		value = obj;
	}
	
	var meta = {};
	
	try
	{
		var temp = mxUtils.getValue(ui.editor.graph.getCurrentCellStyle(cell), 'metaData', null);
		
		if (temp != null)
		{
			meta = JSON.parse(temp);
		}
	}
	catch (e)
	{
		// ignore
	}
	
	// Creates the dialog contents
	var form = new mxForm('properties');
	form.table.style.width = '100%';

	var attrs = value.attributes;
	var names = [];
	var texts = [];
	var count = 0;

	var id = (EditDataDialog.getDisplayIdForCell != null) ?
		EditDataDialog.getDisplayIdForCell(ui, cell) : null;
	
	var addRemoveButton = function(text, name)
	{
		var wrapper = document.createElement('div');
		wrapper.style.position = 'relative';
		wrapper.style.paddingRight = '20px';
		wrapper.style.boxSizing = 'border-box';
		wrapper.style.width = '100%';
		
		var removeAttr = document.createElement('a');
		var img = mxUtils.createImage(Dialog.prototype.closeImage);
		img.style.height = '9px';
		img.style.fontSize = '9px';
		img.style.marginBottom = (mxClient.IS_IE11) ? '-1px' : '5px';
		
		removeAttr.className = 'geButton';
		removeAttr.setAttribute('title', mxResources.get('delete'));
		removeAttr.style.position = 'absolute';
		removeAttr.style.top = '4px';
		removeAttr.style.right = '0px';
		removeAttr.style.margin = '0px';
		removeAttr.style.width = '9px';
		removeAttr.style.height = '9px';
		removeAttr.style.cursor = 'pointer';
		removeAttr.appendChild(img);
		
		var removeAttrFn = (function(name)
		{
			return function()
			{
				var count = 0;
				
				for (var j = 0; j < names.length; j++)
				{
					if (names[j] == name)
					{
						texts[j] = null;
						form.table.deleteRow(count + ((id != null) ? 1 : 0));
						
						break;
					}
					
					if (texts[j] != null)
					{
						count++;
					}
				}
			};
		})(name);
		
		mxEvent.addListener(removeAttr, 'click', removeAttrFn);
		
		var parent = text.parentNode;
		wrapper.appendChild(text);
		wrapper.appendChild(removeAttr);
		parent.appendChild(wrapper);
	};
	
	var addTextArea = function(index, name, value)
	{
		names[index] = name;
		texts[index] = form.addTextarea(names[count] + ':', value, 2);
		texts[index].style.width = '100%';
		
		if (value.indexOf('\n') > 0)
		{
			texts[index].setAttribute('rows', '2');
		}
		
		addRemoveButton(texts[index], name);
		
		if (meta[name] != null && meta[name].editable == false)
		{
			texts[index].setAttribute('disabled', 'disabled');
		}
	};
	
	var temp = [];
	var isLayer = graph.getModel().getParent(cell) == graph.getModel().getRoot();

	for (var i = 0; i < attrs.length; i++)
	{
		if ((attrs[i].nodeName != 'label' || Graph.translateDiagram ||
			isLayer) && attrs[i].nodeName != 'placeholders')
		{
			temp.push({name: attrs[i].nodeName, value: attrs[i].nodeValue});
		}
	}
	
	// Sorts by name
	temp.sort(function(a, b)
	{
	    if (a.name < b.name)
	    {
	    	return -1;
	    }
	    else if (a.name > b.name)
	    {
	    	return 1;
	    }
	    else
	    {
	    	return 0;
	    }
	});

	if (id != null)
	{	
		var text = document.createElement('div');
		text.style.width = '100%';
		text.style.fontSize = '11px';
		text.style.textAlign = 'center';
		mxUtils.write(text, id);
		
		var idInput = form.addField(mxResources.get('id') + ':', text);
		
		mxEvent.addListener(text, 'dblclick', function(evt)
		{
			var dlg = new FilenameDialog(ui, id, mxResources.get('apply'), mxUtils.bind(this, function(value)
			{
				if (value != null && value.length > 0 && value != id)
				{
					if (graph.model.isRoot(cell))
					{
						var page = ui.getPageById(id);

						if (page != null)
						{
							if (ui.getPageById(value) == null)
							{
								var index = ui.getPageIndex(page);

								if (index >= 0)
								{
									ui.removePage(page);
									page.node.setAttribute('id', value);
									id = value;
									idInput.innerHTML = mxUtils.htmlEntities(value);
									ui.insertPage(page, index);
								}
							}
							else
							{
								ui.handleError({message: mxResources.get('alreadyExst', [mxResources.get('page')])});
							}
						}
					}
					else
					{
						if (graph.getModel().getCell(value) == null)
						{
							graph.getModel().cellRemoved(cell);
							cell.setId(value);
							id = value;
							idInput.innerHTML = mxUtils.htmlEntities(value);
							graph.getModel().cellAdded(cell);
						}
						else
						{
							ui.handleError({message: mxResources.get('alreadyExst', [value])});
						}
					}
				}
			}), mxResources.get('id'), null, null, null, null, null, null, 200);
			ui.showDialog(dlg.container, 300, 80, true, true);
			dlg.init();
		});
	}
	
	for (var i = 0; i < temp.length; i++)
	{
		addTextArea(count, temp[i].name, temp[i].value);
		count++;
	}
	
	var top = document.createElement('div');
	top.style.position = 'absolute';
	top.style.top = '30px';
	top.style.left = '30px';
	top.style.right = '30px';
	top.style.bottom = '80px';
	top.style.overflowY = 'auto';
	
	top.appendChild(form.table);

	var newProp = document.createElement('div');
	newProp.style.display = 'flex';
	newProp.style.alignItems = 'center';
	newProp.style.boxSizing = 'border-box';
	newProp.style.paddingRight = '160px';
	newProp.style.whiteSpace = 'nowrap';
	newProp.style.marginTop = '6px';
	newProp.style.width = '100%';
	
	var nameInput = document.createElement('input');
	nameInput.setAttribute('placeholder', mxResources.get('enterPropertyName'));
	nameInput.setAttribute('type', 'text');
	nameInput.setAttribute('size', (mxClient.IS_IE || mxClient.IS_IE11) ? '36' : '40');
	nameInput.style.boxSizing = 'border-box';
	nameInput.style.borderWidth = '1px';
	nameInput.style.borderStyle = 'solid';
	nameInput.style.marginLeft = '2px';
	nameInput.style.padding = '4px';
	nameInput.style.width = '100%';
	
	newProp.appendChild(nameInput);
	top.appendChild(newProp);
	div.appendChild(top);
	
	var addBtn = mxUtils.button(mxResources.get('addProperty'), function()
	{
		var name = nameInput.value;

		// Avoid ':' in attribute names which seems to be valid in Chrome
		if (name.length > 0 && name != 'label' && name != 'id' &&
			name != 'placeholders' && name.indexOf(':') < 0)
		{
			try
			{
				var idx = mxUtils.indexOf(names, name);
				
				if (idx >= 0 && texts[idx] != null)
				{
					texts[idx].focus();
				}
				else
				{
					// Checks if the name is valid
					var clone = value.cloneNode(false);
					clone.setAttribute(name, '');
					
					if (idx >= 0)
					{
						names.splice(idx, 1);
						texts.splice(idx, 1);
					}

					names.push(name);
					var text = form.addTextarea(name + ':', '', 2);
					text.style.width = '100%';
					texts.push(text);
					addRemoveButton(text, name);

					text.focus();
				}

				addBtn.setAttribute('disabled', 'disabled');
				nameInput.value = '';
			}
			catch (e)
			{
				mxUtils.alert(e);
			}
		}
		else
		{
			mxUtils.alert(mxResources.get('invalidName'));
		}
	});

	mxEvent.addListener(nameInput, 'keypress', function(e)
	{
		if (e.keyCode == 13 )
		{
			addBtn.click();
		}
	});
	
	this.init = function()
	{
		if (texts.length > 0)
		{
			texts[0].focus();
		}
		else
		{
			nameInput.focus();
		}
	};
	
	addBtn.setAttribute('title', mxResources.get('addProperty'));
	addBtn.setAttribute('disabled', 'disabled');
	addBtn.style.textOverflow = 'ellipsis';
	addBtn.style.position = 'absolute';
	addBtn.style.overflow = 'hidden';
	addBtn.style.width = '144px';
	addBtn.style.right = '0px';
	addBtn.className = 'geBtn';
	newProp.appendChild(addBtn);

	var cancelBtn = mxUtils.button(mxResources.get('cancel'), function()
	{
		ui.hideDialog.apply(ui, arguments);
	});
	
	cancelBtn.setAttribute('title', 'Escape');
	cancelBtn.className = 'geBtn';

	var exportBtn = mxUtils.button(mxResources.get('export'), mxUtils.bind(this, function(evt)
	{
		var result = graph.getDataForCells([cell]);

		var dlg = new EmbedDialog(ui, JSON.stringify(result, null, 2), null, null, function()
		{
			console.log(result);
			ui.alert('Written to Console (Dev Tools)');
		}, mxResources.get('export'), null, 'Console', 'data.json');
		ui.showDialog(dlg.container, 450, 240, true, true);
		dlg.init();
	}));
	
	exportBtn.setAttribute('title', mxResources.get('export'));
	exportBtn.className = 'geBtn';
	
	var applyBtn = mxUtils.button(mxResources.get('apply'), function()
	{
		try
		{
			ui.hideDialog.apply(ui, arguments);
			
			// Clones and updates the value
			value = value.cloneNode(true);
			var removeLabel = false;
			
			for (var i = 0; i < names.length; i++)
			{
				if (texts[i] == null)
				{
					value.removeAttribute(names[i]);
				}
				else
				{
					value.setAttribute(names[i], texts[i].value);
					removeLabel = removeLabel || (names[i] == 'placeholder' &&
						value.getAttribute('placeholders') == '1');
				}
			}
			
			// Removes label if placeholder is assigned
			if (removeLabel)
			{
				value.removeAttribute('label');
			}
			
			// Updates the value of the cell (undoable)
			graph.getModel().setValue(cell, value);
		}
		catch (e)
		{
			mxUtils.alert(e);
		}
	});

	applyBtn.setAttribute('title', 'Ctrl+Enter');
	applyBtn.className = 'geBtn gePrimaryBtn';

	mxEvent.addListener(div, 'keypress', function(e)
	{
		if (e.keyCode == 13 && mxEvent.isControlDown(e))
		{
			applyBtn.click();
		}
	});
	
	function updateAddBtn()
	{
		if (nameInput.value.length > 0)
		{
			addBtn.removeAttribute('disabled');
		}
		else
		{
			addBtn.setAttribute('disabled', 'disabled');
		}
	};

	mxEvent.addListener(nameInput, 'keyup', updateAddBtn);
	
	// Catches all changes that don't fire a keyup (such as paste via mouse)
	mxEvent.addListener(nameInput, 'change', updateAddBtn);
	
	var buttons = document.createElement('div');
	buttons.style.cssText = 'position:absolute;left:30px;right:30px;text-align:right;bottom:30px;height:40px;'
	
	if (ui.editor.graph.getModel().isVertex(cell) || ui.editor.graph.getModel().isEdge(cell))
	{
		var replace = document.createElement('span');
		replace.style.marginRight = '10px';
		var input = document.createElement('input');
		input.setAttribute('type', 'checkbox');
		input.style.marginRight = '6px';
		
		if (value.getAttribute('placeholders') == '1')
		{
			input.setAttribute('checked', 'checked');
			input.defaultChecked = true;
		}
	
		mxEvent.addListener(input, 'click', function()
		{
			if (value.getAttribute('placeholders') == '1')
			{
				value.removeAttribute('placeholders');
			}
			else
			{
				value.setAttribute('placeholders', '1');
			}
		});
		
		replace.appendChild(input);
		mxUtils.write(replace, mxResources.get('placeholders'));
		
		if (EditDataDialog.placeholderHelpLink != null)
		{
			var link = document.createElement('a');
			link.setAttribute('href', EditDataDialog.placeholderHelpLink);
			link.setAttribute('title', mxResources.get('help'));
			link.setAttribute('target', '_blank');
			link.style.marginLeft = '8px';
			link.style.cursor = 'help';
			
			var icon = document.createElement('img');
			mxUtils.setOpacity(icon, 50);
			icon.style.height = '16px';
			icon.style.width = '16px';
			icon.setAttribute('border', '0');
			icon.setAttribute('valign', 'middle');
			icon.style.marginTop = (mxClient.IS_IE11) ? '0px' : '-4px';
			icon.setAttribute('src', Editor.helpImage);
			link.appendChild(icon);

			if (Editor.enableCssDarkMode)
			{
				icon.className = 'geAdaptiveAsset';
			}
			
			replace.appendChild(link);
		}
		
		buttons.appendChild(replace);
	}
	
	if (ui.editor.cancelFirst)
	{
		buttons.appendChild(cancelBtn);
	}
	
	buttons.appendChild(exportBtn);
	buttons.appendChild(applyBtn);

	if (!ui.editor.cancelFirst)
	{
		buttons.appendChild(cancelBtn);
	}

	div.appendChild(buttons);
	this.container = div;
};

/**
 * Optional help link.
 */
EditDataDialog.getDisplayIdForCell = function(ui, cell)
{
	var id = null;
	
	if (ui.editor.graph.getModel().getParent(cell) != null)
	{
		id = cell.getId();
	}
	
	return id;
};

/**
 * Optional help link.
 */
EditDataDialog.placeholderHelpLink = null;

/**
 * Constructs a new link dialog.
 */
var LinkDialog = function(editorUi, initialValue, btnLabel, fn)
{
	var div = document.createElement('div');
	mxUtils.write(div, mxResources.get('editLink') + ':');
	
	var inner = document.createElement('div');
	inner.className = 'geTitle';
	inner.style.backgroundColor = 'transparent';
	inner.style.borderColor = 'transparent';
	inner.style.whiteSpace = 'nowrap';
	inner.style.textOverflow = 'clip';
	inner.style.cursor = 'default';
	inner.style.paddingRight = '20px';
	
	var linkInput = document.createElement('input');
	linkInput.setAttribute('value', initialValue);
	linkInput.setAttribute('placeholder', 'http://www.example.com/');
	linkInput.setAttribute('type', 'text');
	linkInput.style.marginTop = '6px';
	linkInput.style.width = '400px';
	linkInput.style.backgroundImage = 'url(\'' + Dialog.prototype.clearImage + '\')';
	linkInput.style.backgroundRepeat = 'no-repeat';
	linkInput.style.backgroundPosition = '100% 50%';
	linkInput.style.paddingRight = '14px';
	
	var cross = document.createElement('div');
	cross.setAttribute('title', mxResources.get('reset'));
	cross.style.position = 'relative';
	cross.style.left = '-16px';
	cross.style.width = '12px';
	cross.style.height = '14px';
	cross.style.cursor = 'pointer';

	// Workaround for inline-block not supported in IE
	cross.style.display = 'inline-block';
	cross.style.top = '3px';
	
	// Needed to block event transparency in IE
	cross.style.background = 'url(' + IMAGE_PATH + '/transparent.gif)';

	mxEvent.addListener(cross, 'click', function()
	{
		linkInput.value = '';
		linkInput.focus();
	});
	
	inner.appendChild(linkInput);
	inner.appendChild(cross);
	div.appendChild(inner);
	
	this.init = function()
	{
		linkInput.focus();
		
		if (mxClient.IS_GC || mxClient.IS_FF || document.documentMode >= 5)
		{
			linkInput.select();
		}
		else
		{
			document.execCommand('selectAll', false, null);
		}
	};
	
	var btns = document.createElement('div');
	btns.style.marginTop = '18px';
	btns.style.textAlign = 'right';

	mxEvent.addListener(linkInput, 'keypress', function(e)
	{
		if (e.keyCode == 13)
		{
			editorUi.hideDialog();
			fn(linkInput.value);
		}
	});

	var cancelBtn = mxUtils.button(mxResources.get('cancel'), function()
	{
		editorUi.hideDialog();
	});
	cancelBtn.className = 'geBtn';
	
	if (editorUi.editor.cancelFirst)
	{
		btns.appendChild(cancelBtn);
	}
	
	var mainBtn = mxUtils.button(btnLabel, function()
	{
		editorUi.hideDialog();
		fn(linkInput.value);
	});
	mainBtn.className = 'geBtn gePrimaryBtn';
	btns.appendChild(mainBtn);
	
	if (!editorUi.editor.cancelFirst)
	{
		btns.appendChild(cancelBtn);
	}

	div.appendChild(btns);

	this.container = div;
};

/**
 * 
 */
var OutlineWindow = function(editorUi, x, y, w, h)
{
	var graph = editorUi.editor.graph;

	var div = document.createElement('div');
	div.style.position = 'absolute';
	div.style.width = '100%';
	div.style.height = '100%';
	div.style.overflow = 'hidden';

	this.window = new mxWindow(mxResources.get('outline'), div, x, y, w, h, true, true);
	this.window.minimumSize = new mxRectangle(0, 0, 80, 80);
	this.window.destroyOnClose = false;
	this.window.setMaximizable(false);
	this.window.setResizable(true);
	this.window.setClosable(true);
	this.window.setVisible(true);
	
	var outline = editorUi.createOutline(this.window);

	editorUi.installResizeHandler(this, true, function()
	{
		outline.destroy();
	});

	this.window.addListener(mxEvent.SHOW, mxUtils.bind(this, function()
	{
		this.window.fit();
		outline.setSuspended(false);
	}));
	
	this.window.addListener(mxEvent.HIDE, mxUtils.bind(this, function()
	{
		outline.setSuspended(true);
	}));
	
	this.window.addListener(mxEvent.NORMALIZE, mxUtils.bind(this, function()
	{
		outline.setSuspended(false);
	}));
			
	this.window.addListener(mxEvent.MINIMIZE, mxUtils.bind(this, function()
	{
		outline.setSuspended(true);
	}));

	outline.init(div);
	
	mxEvent.addMouseWheelListener(function(evt, up)
	{
		var outlineWheel = false;
		var source = mxEvent.getSource(evt);

		while (source != null)
		{
			if (source == outline.svg)
			{
				outlineWheel = true;
				break;
			}

			source = source.parentNode;
		}

		if (outlineWheel)
		{
			var factor = graph.zoomFactor;

			// Slower zoom for pinch gesture on trackpad
			if (evt.deltaY != null && Math.round(evt.deltaY) != evt.deltaY)
			{
				factor = 1 + (Math.abs(evt.deltaY) / 20) * (factor - 1);
			}

			graph.lazyZoom(up, null, null, factor);
			mxEvent.consume(evt);
		}
	});
};

/**
 * 
 */
var LayersWindow = function(editorUi, x, y, w, h)
{
	var graph = editorUi.editor.graph;
	
	var div = document.createElement('div');
	div.className = 'geBackground';
	div.style.userSelect = 'none';
	div.style.border = '1px solid whiteSmoke';
	div.style.height = '100%';
	div.style.marginBottom = '10px';
	div.style.overflow = 'auto';

	var tbarHeight = (!EditorUi.compactUi) ? '30px' : '26px';
	
	var listDiv = document.createElement('div')
	listDiv.className = 'geBackground';
	listDiv.style.position = 'absolute';
	listDiv.style.overflow = 'auto';
	listDiv.style.left = '0px';
	listDiv.style.right = '0px';
	listDiv.style.top = '0px';
	listDiv.style.bottom = (parseInt(tbarHeight) + 7) + 'px';
	div.appendChild(listDiv);
	
	var dragSource = null;
	var dropIndex = null;
	
	mxEvent.addListener(div, 'dragover', function(evt)
	{
		evt.dataTransfer.dropEffect = 'move';
		dropIndex = 0;
		evt.stopPropagation();
		evt.preventDefault();
	});
	
	// Workaround for "no element found" error in FF
	mxEvent.addListener(div, 'drop', function(evt)
	{
		evt.stopPropagation();
		evt.preventDefault();
	});

	var layerCount = null;
	var selectionLayer = null;
	var ldiv = document.createElement('div');
	
	ldiv.className = 'geToolbarContainer';
	ldiv.style.position = 'absolute';
	ldiv.style.bottom = '0px';
	ldiv.style.left = '0px';
	ldiv.style.right = '0px';
	ldiv.style.height = tbarHeight;
	ldiv.style.overflow = 'hidden';
	ldiv.style.padding = (!EditorUi.compactUi) ? '1px' : '4px 0px 3px 0px';
	ldiv.style.borderWidth = '1px 0px 0px 0px';
	ldiv.style.borderStyle = 'solid';
	ldiv.style.display = 'block';
	ldiv.style.whiteSpace = 'nowrap';
	
	var link = document.createElement('a');
	link.className = 'geButton';
	
	var removeLink = link.cloneNode(false);
	var img = document.createElement('img');
	img.className = 'geAdaptiveAsset';
	img.setAttribute('border', '0');
	img.setAttribute('width', '22');
	img.setAttribute('src', Editor.trashImage);
	img.style.opacity = '0.9';

	removeLink.appendChild(img);

	mxEvent.addListener(removeLink, 'click', function(evt)
	{
		if (graph.isEnabled())
		{
			graph.model.beginUpdate();
			try
			{
				var index = graph.model.root.getIndex(selectionLayer);
				graph.removeCells([selectionLayer], false);
				
				// Creates default layer if no layer exists
				if (graph.model.getChildCount(graph.model.root) == 0)
				{
					graph.model.add(graph.model.root, new mxCell());
					graph.setDefaultParent(null);
				}
				else if (index > 0 && index <= graph.model.getChildCount(graph.model.root))
				{
					graph.setDefaultParent(graph.model.getChildAt(graph.model.root, index - 1));
				}
				else
				{
					graph.setDefaultParent(null);
				}
			}
			finally
			{
				graph.model.endUpdate();
			}
		}
		
		mxEvent.consume(evt);
	});
	
	if (!graph.isEnabled())
	{
		removeLink.className = 'geButton mxDisabled';
	}
	
	ldiv.appendChild(removeLink);

	var insertLink = link.cloneNode();
	insertLink.setAttribute('title', mxUtils.trim(mxResources.get('moveSelectionTo', ['...'])));

	img = img.cloneNode(false);
	img.setAttribute('src', Editor.verticalDotsImage);
	insertLink.appendChild(img);

	mxEvent.addListener(insertLink, 'click', function(evt)
	{
		if (graph.isEnabled() && !graph.isSelectionEmpty())
		{
			var offset = mxUtils.getOffset(insertLink);
			
			editorUi.showPopupMenu(mxUtils.bind(this, function(menu, parent)
			{
				for (var i = layerCount - 1; i >= 0; i--)
				{
					(mxUtils.bind(this, function(child)
					{
						var item = menu.addItem(graph.convertValueToString(child) ||
								mxResources.get('background'), null, mxUtils.bind(this, function()
						{
							graph.moveCells(graph.getSelectionCells(), 0, 0, false, child);
						}), parent);
						
						if (graph.getSelectionCount() == 1 && graph.model.isAncestor(child, graph.getSelectionCell()))
						{
							menu.addCheckmark(item, Editor.checkmarkImage);
						}
						
					}))(graph.model.getChildAt(graph.model.root, i));
				}
			}), offset.x, offset.y + insertLink.offsetHeight, evt);
		}
	});

	ldiv.appendChild(insertLink);
	
	var dataLink = link.cloneNode(false);
	dataLink.setAttribute('title', mxResources.get('editData'));

	img = img.cloneNode(false);
	img.setAttribute('src', Editor.editImage);
	dataLink.appendChild(img);

	mxEvent.addListener(dataLink, 'click', function(evt)
	{
		if (graph.isEnabled())
		{
			editorUi.showDataDialog(selectionLayer);
		}
		
		mxEvent.consume(evt);
	});
	
	if (!graph.isEnabled())
	{
		dataLink.className = 'geButton mxDisabled';
	}

	ldiv.appendChild(dataLink);
	
	function renameLayer(layer)
	{
		if (graph.isEnabled() && layer != null)
		{
			var label = graph.convertValueToString(layer);
			var dlg = new FilenameDialog(editorUi, label || mxResources.get('background'),
				mxResources.get('rename'), mxUtils.bind(this, function(newValue)
			{
				if (newValue != null)
				{
					graph.cellLabelChanged(layer, newValue);
				}
			}), mxResources.get('enterName'));
			editorUi.showDialog(dlg.container, 300, 100, true, true);
			dlg.init();
		}
	};
	
	var duplicateLink = link.cloneNode(false);
	duplicateLink.setAttribute('title', mxResources.get('duplicate'));

	img = img.cloneNode(false);
	img.setAttribute('src', Editor.duplicateImage);
	duplicateLink.appendChild(img);

	mxEvent.addListener(duplicateLink, 'click', function(evt)
	{
		if (graph.isEnabled())
		{
			var newCell = null;
			graph.model.beginUpdate();
			try
			{
				newCell = graph.cloneCell(selectionLayer);
				graph.cellLabelChanged(newCell, mxResources.get('untitledLayer'));
				newCell.setVisible(true);
				newCell = graph.addCell(newCell, graph.model.root);
				graph.setDefaultParent(newCell);
			}
			finally
			{
				graph.model.endUpdate();
			}

			if (newCell != null && !graph.isCellLocked(newCell))
			{
				graph.selectAll(newCell);
			}
		}
	});
	
	if (!graph.isEnabled())
	{
		duplicateLink.className = 'geButton mxDisabled';
	}

	ldiv.appendChild(duplicateLink);

	var addLink = link.cloneNode(false);
	addLink.setAttribute('title', mxResources.get('addLayer'));

	img = img.cloneNode(false);
	img.setAttribute('src', Editor.addImage);
	addLink.appendChild(img);
	
	mxEvent.addListener(addLink, 'click', function(evt)
	{
		if (graph.isEnabled())
		{
			graph.model.beginUpdate();
			
			try
			{
				var cell = graph.addCell(new mxCell(mxResources.get('untitledLayer')), graph.model.root);
				graph.setDefaultParent(cell);
			}
			finally
			{
				graph.model.endUpdate();
			}
		}
		
		mxEvent.consume(evt);
	});
	
	if (!graph.isEnabled())
	{
		addLink.className = 'geButton mxDisabled';
	}
	
	ldiv.appendChild(addLink);
	div.appendChild(ldiv);
	
	var layerDivs = new mxDictionary();
	
	var dot = document.createElement('span');
	dot.setAttribute('title', mxResources.get('selectionOnly'));
	dot.innerHTML = '&#8226;';
	dot.style.position = 'absolute';
	dot.style.fontWeight = 'bold';
	dot.style.fontSize = '16pt';
	dot.style.right = '2px';
	dot.style.top = '2px';
	
	function updateLayerDot()
	{
		var div = layerDivs.get(graph.getLayerForCells(graph.getSelectionCells()));
		
		if (div != null)
		{
			div.appendChild(dot);
		}
		else if (dot.parentNode != null)
		{
			dot.parentNode.removeChild(dot);
		}
	};
	
	function refresh()
	{
		layerCount = graph.model.getChildCount(graph.model.root)
		listDiv.innerText = '';
		layerDivs.clear();
		
		function addLayer(index, label, child, defaultParent)
		{
			var ldiv = document.createElement('div');
			ldiv.className = 'geToolbarContainer';
			layerDivs.put(child, ldiv);

			ldiv.style.overflow = 'hidden';
			ldiv.style.position = 'relative';
			ldiv.style.padding = '4px';
			ldiv.style.height = '22px';
			ldiv.style.display = 'block';
			ldiv.style.backgroundColor = (Editor.isDarkMode()) ?
				Editor.darkColor : 'whiteSmoke';
			ldiv.style.borderWidth = '0px 0px 1px 0px';
			ldiv.style.borderColor = '#c3c3c3';
			ldiv.style.borderStyle = 'solid';
			ldiv.style.whiteSpace = 'nowrap';
			ldiv.setAttribute('title', label);
			
			var left = document.createElement('div');
			left.style.display = 'inline-block';
			left.style.width = '100%';
			left.style.textOverflow = 'ellipsis';
			left.style.overflow = 'hidden';
			
			mxEvent.addListener(ldiv, 'dragover', function(evt)
			{
				evt.dataTransfer.dropEffect = 'move';
				dropIndex = index;
				evt.stopPropagation();
				evt.preventDefault();
			});
			
			mxEvent.addListener(ldiv, 'dragstart', function(evt)
			{
				dragSource = ldiv;
				
				// Workaround for no DnD on DIV in FF
				if (mxClient.IS_FF)
				{
					// LATER: Check what triggers a parse as XML on this in FF after drop
					evt.dataTransfer.setData('Text', '<layer/>');
				}
			});
			
			mxEvent.addListener(ldiv, 'dragend', function(evt)
			{
				if (dragSource != null && dropIndex != null)
				{
					graph.addCell(child, graph.model.root, dropIndex);
				}

				dragSource = null;
				dropIndex = null;
				evt.stopPropagation();
				evt.preventDefault();
			});

			var inp = document.createElement('img');
			inp.setAttribute('draggable', 'false');
			inp.setAttribute('align', 'top');
			inp.setAttribute('border', '0');
			inp.className = 'geAdaptiveAsset';
			inp.style.width = '16px';
			inp.style.padding = '0px 6px 0 4px';
			inp.style.marginTop = '2px';
			inp.style.cursor = 'pointer';
			inp.setAttribute('title', mxResources.get(
				graph.model.isVisible(child) ?
				'hide' : 'show'));

			if (graph.model.isVisible(child))
			{
				inp.setAttribute('src', Editor.visibleImage);
				mxUtils.setOpacity(ldiv, 90);
			}
			else
			{
				inp.setAttribute('src', Editor.hiddenImage);
				mxUtils.setOpacity(ldiv, 40);
			}

			left.appendChild(inp);
			
			mxEvent.addListener(inp, 'click', function(evt)
			{
				graph.model.setVisible(child, !graph.model.isVisible(child));
				mxEvent.consume(evt);
			});

			var btn = document.createElement('img');
			btn.setAttribute('draggable', 'false');
			btn.setAttribute('align', 'top');
			btn.setAttribute('border', '0');
			btn.className = 'geAdaptiveAsset';
			btn.style.width = '16px';
			btn.style.padding = '0px 6px 0 0';
			btn.style.marginTop = '2px';
			btn.setAttribute('title', mxResources.get('lockUnlock'));

			var style = graph.getCurrentCellStyle(child);

			if (mxUtils.getValue(style, 'locked', '0') == '1')
			{
				btn.setAttribute('src', Editor.lockedImage);
				mxUtils.setOpacity(btn, 90);
				ldiv.style.color = 'red';
			}
			else
			{
				btn.setAttribute('src', Editor.unlockedImage);
				mxUtils.setOpacity(btn, 40);
			}
			
			if (graph.isEnabled())
			{
				btn.style.cursor = 'pointer';
			}
			
			mxEvent.addListener(btn, 'click', function(evt)
			{
				if (graph.isEnabled())
				{
					var value = null;
					
					graph.getModel().beginUpdate();
					try
					{
			    		value = (mxUtils.getValue(style, 'locked', '0') == '1') ? null : '1';
			    		graph.setCellStyles('locked', value, [child]);
					}
					finally
					{
						graph.getModel().endUpdate();
					}

					if (value == '1')
					{
						graph.removeSelectionCells(graph.getModel().getDescendants(child));
					}
					
					mxEvent.consume(evt);
				}
			});

			left.appendChild(btn);

			var span = document.createElement('span');
			mxUtils.write(span, label);
			span.style.display = 'block';
			span.style.whiteSpace = 'nowrap';
			span.style.overflow = 'hidden';
			span.style.textOverflow = 'ellipsis';
			span.style.position = 'absolute';
			span.style.left = '52px';
			span.style.right = '8px';
			span.style.top = '8px';

			left.appendChild(span);
			ldiv.appendChild(left);
			
			if (graph.isEnabled())
			{
				// Fallback if no drag and drop is available
				if (mxClient.IS_TOUCH || mxClient.IS_POINTER ||
					(mxClient.IS_IE && document.documentMode < 10))
				{
					var right = document.createElement('div');
					right.style.display = 'block';
					right.style.textAlign = 'right';
					right.style.whiteSpace = 'nowrap';
					right.style.position = 'absolute';
					right.style.right = '16px';
					right.style.top = '6px';
		
					// Poor man's change layer order
					if (index > 0)
					{
						var img2 = document.createElement('a');
						
						img2.setAttribute('title', mxResources.get('toBack'));
						
						img2.className = 'geButton';
						img2.style.cssFloat = 'none';
						img2.innerHTML = '&#9660;';
						img2.style.width = '14px';
						img2.style.height = '14px';
						img2.style.fontSize = '14px';
						img2.style.margin = '0px';
						img2.style.marginTop = '-1px';
						right.appendChild(img2);
						
						mxEvent.addListener(img2, 'click', function(evt)
						{
							if (graph.isEnabled())
							{
								graph.addCell(child, graph.model.root, index - 1);
							}
							
							mxEvent.consume(evt);
						});
					}
		
					if (index >= 0 && index < layerCount - 1)
					{
						var img1 = document.createElement('a');
						
						img1.setAttribute('title', mxResources.get('toFront'));
						
						img1.className = 'geButton';
						img1.style.cssFloat = 'none';
						img1.innerHTML = '&#9650;';
						img1.style.width = '14px';
						img1.style.height = '14px';
						img1.style.fontSize = '14px';
						img1.style.margin = '0px';
						img1.style.marginTop = '-1px';
						right.appendChild(img1);
						
						mxEvent.addListener(img1, 'click', function(evt)
						{
							if (graph.isEnabled())
							{
								graph.addCell(child, graph.model.root, index + 1);
							}
							
							mxEvent.consume(evt);
						});
					}
					
					ldiv.appendChild(right);
				}
				
				if (mxClient.IS_SVG && (!mxClient.IS_IE || document.documentMode >= 10))
				{
					ldiv.setAttribute('draggable', 'true');
					ldiv.style.cursor = 'move';
				}
			}

			mxEvent.addListener(ldiv, 'dblclick', function(evt)
			{
				var nodeName = mxEvent.getSource(evt).nodeName;
				
				if (nodeName != 'INPUT' && nodeName != 'IMG')
				{
					renameLayer(child);
					mxEvent.consume(evt);
				}
			});

			if (graph.getDefaultParent() == child)
			{
				ldiv.style.background = (!Editor.isDarkMode()) ? '#e6eff8' : '#505759';
				ldiv.style.fontWeight = (graph.isEnabled()) ? 'bold' : '';
				selectionLayer = child;
			}

			mxEvent.addListener(ldiv, 'click', function(evt)
			{
				if (graph.isEnabled())
				{
					graph.setDefaultParent(defaultParent);
					graph.view.setCurrentRoot(null);

					if (mxEvent.isShiftDown(evt))
					{
						graph.setSelectionCells(child.children);	
					}
					
					mxEvent.consume(evt);
				}
			});
			
			listDiv.appendChild(ldiv);
		};
		
		// Cannot be moved or deleted
		for (var i = layerCount - 1; i >= 0; i--)
		{
			(mxUtils.bind(this, function(child)
			{
				addLayer(i, graph.convertValueToString(child) ||
					mxResources.get('background'), child, child);
			}))(graph.model.getChildAt(graph.model.root, i));
		}
		
		var label = graph.convertValueToString(selectionLayer) || mxResources.get('background');
		removeLink.setAttribute('title', mxResources.get('removeIt', [label]));
		duplicateLink.setAttribute('title', mxResources.get('duplicateIt', [label]));

		if (graph.isSelectionEmpty())
		{
			insertLink.className = 'geButton mxDisabled';
		}
		
		updateLayerDot();
	};

	refresh();
	graph.model.addListener(mxEvent.CHANGE, refresh);
	graph.addListener('defaultParentChanged', refresh);
	
	graph.selectionModel.addListener(mxEvent.CHANGE, function()
	{
		if (graph.isSelectionEmpty())
		{
			insertLink.className = 'geButton mxDisabled';
		}
		else
		{
			insertLink.className = 'geButton';
		}
		
		updateLayerDot();
	});

	this.window = new mxWindow(mxResources.get('layers'), div, x, y, w, h, true, true);
	this.window.minimumSize = new mxRectangle(0, 0, 150, 120);
	this.window.destroyOnClose = false;
	this.window.setMaximizable(false);
	this.window.setResizable(true);
	this.window.setClosable(true);
	this.window.setVisible(true);
	
	this.init = function()
	{
		listDiv.scrollTop = listDiv.scrollHeight - listDiv.clientHeight;	
	};

	this.window.addListener(mxEvent.SHOW, mxUtils.bind(this, function()
	{
		this.window.fit();
	}));
	
	// Make refresh available via instance
	this.refreshLayers = refresh;
	editorUi.installResizeHandler(this, true);
};
