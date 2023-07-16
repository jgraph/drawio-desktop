var mxIsElectron = navigator.userAgent != null &&
	navigator.userAgent.toLowerCase().indexOf(' electron/') > -1 && 
	navigator.userAgent.indexOf(' draw.io/') > -1;
var GOOGLE_APPS_MAX_AREA = 25000000;
var GOOGLE_SHEET_MAX_AREA = 1048576; //1024x1024

/**
 * Adds meta tag to the page.
 */
function mxmeta(content, httpEquiv)
{
	try
	{
		var s = document.createElement('meta');
		
		s.setAttribute('content', content);
		s.setAttribute('http-equiv', httpEquiv);

		var t = document.getElementsByTagName('meta')[0];
		t.parentNode.insertBefore(s, t);
	}
	catch (e)
	{
		// ignore
	}
};

function mxscript(src, onLoad)
{
	var s = document.createElement('script');
	s.setAttribute('type', 'text/javascript');
	s.setAttribute('src', src);
	
	if (onLoad != null)
	{
		var r = false;
	
		s.onload = s.onreadystatechange = function()
		{
			if (!r && (!this.readyState || this.readyState == 'complete'))
			{
				r = true;
				onLoad();
			}
		};
	}

	var t = document.getElementsByTagName('script')[0];
	
	if (t != null)
	{
		t.parentNode.insertBefore(s, t);
	}
};

if (mxIsElectron)
{
	mxmeta('default-src \'self\'; script-src \'self\'; connect-src \'self\' https://*.draw.io https://*.diagrams.net https://fonts.googleapis.com https://fonts.gstatic.com; img-src * data:; media-src *; font-src *; frame-src \'none\'; style-src \'self\' \'unsafe-inline\' https://fonts.googleapis.com; base-uri \'none\';child-src \'self\';object-src \'none\';', 'Content-Security-Policy');
	
	// We can't use eval in Electron because of CSP, so load all shapes and disable eval
	mxscript('js/stencils.min.js', function()
	{
		mxscript('js/shapes-14-6-5.min.js', function()
		{
			if (window.pendingRequest != null)
			{
				render(window.pendingRequest);
			}

			window.shapesLoaded = true;
		});
	});
	
	// Disables eval for JS (uses shapes-14-6-5.min.js)
	mxStencilRegistry.allowEval = false;
}
//TODO Add support for loading math from a local folder
Editor.initMath((remoteMath? 'https://app.diagrams.net/' : '') + 'math/es5/startup.js');

function render(data)
{
	if (data.csv != null)
	{
		// CSV loads orgChart asynchronously and needs mxscript
		window.mxscript = function (src, onLoad, id)
		{
			var s = document.createElement('script');
			s.setAttribute('type', 'text/javascript');
			s.setAttribute('defer', 'true');
			s.setAttribute('src', src);

			if (id != null)
			{
				s.setAttribute('id', id);
			}
			
			if (onLoad != null)
			{
				var r = false;
			
				s.onload = s.onreadystatechange = function()
				{
					if (!r && (!this.readyState || this.readyState == 'complete'))
					{
						r = true;
						onLoad();
					}
				};
			}
			
			var t = document.getElementsByTagName('script')[0];
			
			if (t != null)
			{
				t.parentNode.insertBefore(s, t);
			}
		};

		var editorUi = new HeadlessEditorUi();
		
		editorUi.importCsv(data.csv, function()
		{
			data.xml = mxUtils.getXml(editorUi.editor.getGraphXml());
			delete data.csv;
			render(data);
		});

		return;
	}

	var autoScale = false;
	
	if (data.scale == 'auto')
	{
		autoScale = true;
		data.scale = 1;
	}
	
	document.body.innerText = '';
	var container = document.createElement('div');
	container.id = 'graph';
	container.style.width = '100%';
	container.style.height = '100%';
	document.body.appendChild(container);
	
	var graph = new Graph(container);
	data.border = parseInt(data.border) || 0;
	data.w = parseFloat(data.w) || 0;
	data.h = parseFloat(data.h) || 0;
	data.scale = parseFloat(data.scale) || 1;
	
	var extras = null;
	
	try
	{
		extras = JSON.parse(data.extras);
	} 
	catch (e)
	{
		try 
		{
			extras = JSON.parse(decodeURIComponent(data.extras));
		}
		catch (e)
		{
			// ignore
		}
	}

	var gridColor = null;
	
	if (extras != null && extras.grid != null)
	{
		graph.gridSize = extras.grid.size;
		graph.view.gridSteps = extras.grid.steps;
		gridColor = extras.grid.color;
	}
	
	if (extras != null && extras.diagramLanguage != null)
	{
		Graph.diagramLanguage = extras.diagramLanguage;
		Graph.translateDiagram = true;
	}
	
	//PNG+XML format
	if (data.xml.substring(0, 5) == 'iVBOR' || (extras != null && extras.isPng))
	{
		data.xml = Editor.extractGraphModelFromPng('data:image/png;base64,' + data.xml);
	}
	
	//IE11 sends incorrect xml
	if (data.xml.substring(0, 11) == '<#document>')
	{
		data.xml = data.xml.substring(11, data.xml.length - 12);
	}
	
	// Parses XML
	var doc = mxUtils.parseXml(data.xml);
	var node = Editor.extractGraphModel(doc.documentElement, true);

	if (node == null)
	{
		//Electron pdf export
		try 
		{
			electron.sendMessage('render-finished', null);
		}
		catch(e)
		{
			console.log(e);
		}
		
		return graph;
	}
	
	var xmlDoc = node.ownerDocument;
	var origXmlDoc = xmlDoc;
	var diagrams = null;
	var from = 0;

	function getFileXml(uncompressed)
	{
		var xml = mxUtils.getXml(origXmlDoc);
		var editorUi = new HeadlessEditorUi();
		var tmpFile = new LocalFile(editorUi, xml);
		editorUi.setCurrentFile(tmpFile);
		editorUi.setFileData(xml);
		return editorUi.createFileData(editorUi.getXmlFileData(null, null, uncompressed));
	};

	if (mxIsElectron && data.format == 'xml')
	{
		try
		{
			electron.sendMessage('xml-data', getFileXml(data.uncompressed));
		}
		catch(e)
		{
			electron.sendMessage('xml-data-error');
		}
		
		return;
	}

	// Handles mxfile
	if (xmlDoc.documentElement.nodeName == 'mxfile')
	{
		diagrams = xmlDoc.documentElement.getElementsByTagName('diagram');
	}
	
	//Add global variables to graph
	if (extras != null && extras.globalVars != null)
	{
		graph.globalVars = extras.globalVars;
	}

	/**
	 * Disables custom links but allows page links.
	 */
	function isLinkIgnored(graph, link)
	{
		return link == null || (graph.isCustomLink(link) && !Graph.isPageLink(link));
	};

	/**
	 * Disables custom links on shapes.
	 */
	var graphGetLinkForCell = graph.getLinkForCell;
	
	graph.getLinkForCell = function(cell)
	{
		var link = graphGetLinkForCell.apply(this, arguments);

		if (isLinkIgnored(this, link))
		{
			link = null;
		}
		
		return link;
	};
	
	/**
	 * Disables custom links in labels.
	 */
	var cellRendererRedrawLabelShape = graph.cellRenderer.redrawLabelShape;
	
	graph.cellRenderer.redrawLabelShape = function(shape)
	{
		cellRendererRedrawLabelShape.apply(this, arguments);
		
		if (shape.node != null)
		{
			var links = shape.node.getElementsByTagName('a');

			for (var i = 0; i < links.length; i++)
			{
				var href = links[i].getAttribute('href');
				
				if (isLinkIgnored(graph, href))
				{
					links[i].setAttribute('href', '#');
				}
			}	
		}
	};
	
	var preview = null;
	var waitCounter = 1;
	var bounds;
	var pageId;
	var expScale;
	// Waits for all images to finish loading
	var cache = new Object();
	var math = false;
	
	// Decrements waitCounter and invokes callback when finished
	function decrementWaitCounter()
	{
		if (--waitCounter < 1)
		{
			//Note: This code targets Chrome as it is the browser used by export server
			//Ensure that all fonts has been loaded, this promise is never rejected
			document.fonts.ready.then(function() 
			{
				// Rewrite page links
				Graph.rewritePageLinks(document);
				
				var doneDiv = document.createElement("div");
				var pageCount = diagrams != null? diagrams.length : 1;
				doneDiv.id = 'LoadingComplete';
				doneDiv.style.display = 'none';
				doneDiv.setAttribute('bounds', JSON.stringify(bounds));
				doneDiv.setAttribute('page-id', pageId);
				doneDiv.setAttribute('scale', expScale);
				doneDiv.setAttribute('pageCount', pageCount);
				document.body.appendChild(doneDiv);

				//Electron pdf export
				if (mxIsElectron)
				{
					try 
					{
						electron.registerMsgListener('get-svg-data', (arg) => 
						{
							graph.mathEnabled = math; //Enable math such that getSvg works as expected
							// Returns the exported SVG for the given graph (see EditorUi.exportSvg)
							var bg = graph.background;
								
							if (bg == mxConstants.NONE)
							{
								bg = null;
							}
							
							var svgRoot = graph.getSvg(bg, expScale, 0, false, null, true, null, null, null);
							
							if (graph.shadowVisible)
							{
								graph.addSvgShadow(svgRoot);
							}
							
							// TODO addFontCss cannot be used as it requires this
							// Adds CSS
							//Editor.prototype.addFontCss(svgRoot);
							
							if (math)
							{
								Editor.prototype.addMathCss(svgRoot);
							}
						
							function doSend() 
							{
								var editable = data.embedXml == '1';

								if (editable)
								{
									svgRoot.setAttribute('content', getFileXml());
								}

								electron.sendMessage('svg-data', Graph.xmlDeclaration + '\n' + ((editable) ? Graph.svgFileComment + '\n' : '') +
															 Graph.svgDoctype + '\n' + mxUtils.getXml(svgRoot));
							};

							if (data.embedImages == '1')
							{
								var tmpEditor = new Editor();
								tmpEditor.convertImages(svgRoot, doSend);
							}
							else
							{
								doSend();
							}
						});
						
						//For some reason, Electron 9 doesn't send this object as is without stringifying. Usually when variable is external to function own scope
						electron.sendMessage('render-finished', {bounds: JSON.stringify(bounds), pageCount: pageCount});
					}
					catch(e)
					{
						console.log(e);
					}
				}
			});
		}
	};
	
	function waitForImages(tagName, attributeName)
	{
		var imgs = document.body.getElementsByTagName(tagName);
		waitCounter += imgs.length;

		for (var i = 0; i < imgs.length; i++)
		{
			// No load events for image elements in Phantom using indirection instead
			var src = imgs[i].getAttribute(attributeName);
			
			if (src != null && src.length > 0 && cache[src] == null)
			{
				cache[src] = new Image();
				cache[src].onload = decrementWaitCounter;
				cache[src].onerror = decrementWaitCounter;
				cache[src].src = src;
			}
			else
			{
				decrementWaitCounter();
			}
		}
	};
	
	// Waits for MathJax autoloading and rendering
	var editorOnMathJaxDone = Editor.onMathJaxDone;
	
	Editor.onMathJaxDone = function()
	{
		editorOnMathJaxDone.apply(this, arguments);
		decrementWaitCounter();
	};

	// Adds MathJax rendering task
	function renderMath(elt)
	{
		if (math && Editor.MathJaxRender != null)
		{
			waitCounter++;
			Editor.MathJaxRender(elt);
		}
	};

	function loadExtFonts(extFonts)
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
			//ignore and return!
			return;
		}
		
		waitCounter += extFonts.length;

		//Note: This code targets Chrome as it is the browser used by export server
		for (var i = 0; i < extFonts.length; i++)
		{
			if (extFonts[i].url.indexOf(Editor.GOOGLE_FONTS) == 0)
			{
				var link = document.createElement('link');
				
				link.setAttribute('rel', 'stylesheet');
				link.setAttribute('charset', 'UTF-8');
				link.setAttribute('type', 'text/css');
				
				link.onload = decrementWaitCounter;
				link.onerror = decrementWaitCounter;
			
				link.setAttribute('href', extFonts[i].url);
				var head = document.getElementsByTagName('head')[0];
				head.appendChild(link);
			}
			else
			{
				//Relative urls doesn't work
				if (extFonts[i].url.indexOf(PROXY_URL) == 0 && PROXY_URL.indexOf('http') == -1)
				{
					var href = window.location.href;
					href = href.substring(0, href.lastIndexOf('/') + 1);
					extFonts[i].url = href + extFonts[i].url;
				}
				
				var font = new FontFace(extFonts[i].name, 'url(' + extFonts[i].url + ')');
				
				font.load().then(function(loadedFont)
				{
					document.fonts.add(loadedFont);
					decrementWaitCounter();
				}).catch(decrementWaitCounter);
			}
		}
	};

	function renderGrid()
	{
		if (gridColor == null) return;
			
		var view = graph.view;
		var gridImage = btoa(unescape(encodeURIComponent(view.createSvgGrid(gridColor))));
		gridImage = 'url(' + 'data:image/svg+xml;base64,' + gridImage + ')';
		var phase = graph.gridSize * view.gridSteps * view.scale;
		
		var x0 = 0;
		var y0 = 0;
		
		if (view.backgroundPageShape != null)
		{
			var bds = view.getBackgroundPageBounds();
			
			x0 = 1 + bds.x;
			y0 = 1 + bds.y;
		}
		
		// Computes the offset to maintain origin for grid
		var position = -Math.round(phase - mxUtils.mod(view.translate.x * view.scale - x0, phase)) + 'px ' +
			-Math.round(phase - mxUtils.mod(view.translate.y * view.scale - y0, phase)) + 'px';
		
		var pages = document.querySelectorAll('[id^=mxPage]');
		
		var cssTxt = 'margin: 0;padding: 0;background-image: ' + gridImage + ';background-position: ' + position;
		document.body.style.cssText = cssTxt;

		for (var i = 0; i < pages.length; i++)
		{
			pages[i].style.cssText = cssTxt;
		}
	};
	
	var origAddFont = Graph.addFont;
	
	Graph.addFont = function(name, url)
	{
		waitCounter++;
		return origAddFont.call(this, name, url, decrementWaitCounter);	
	};
		
	function renderPage(currentPageId)
	{
		// Enables math typesetting
		math |= xmlDoc.documentElement.getAttribute('math') == '1';
		
		//Load external fonts
		var extFonts = xmlDoc.documentElement.getAttribute('extFonts');
		
		if (extFonts)
		{
			loadExtFonts(extFonts);
		}
		
		// Configure graph
		graph.foldingEnabled = false;
		graph.setEnabled(false);
		
		// Sets background image
		var bgImg = xmlDoc.documentElement.getAttribute('backgroundImage');

		if (bgImg != null)
		{
			bgImg = JSON.parse(bgImg);
			graph.setBackgroundImage(new mxImage(bgImg.src, bgImg.width,
				bgImg.height, bgImg.x, bgImg.y));
		}
		
		// Parses XML into graph
		var codec = new mxCodec(xmlDoc);
		var model = graph.getModel();
		codec.decode(xmlDoc.documentElement, model);

		var bg;
		
		if (data.format == 'pdf')
		{
			if (data.bg == 'none')
			{
				bg = null;	
			}
			else
			{
				bg = xmlDoc.documentElement.getAttribute('background');
				
				if (bg == 'none' || !bg)
				{
					bg = '#ffffff';
				}
			}
		}
		else
		{
			// Loads background color
			bg = (data.bg != null && data.bg.length > 0) ?
				data.bg : xmlDoc.documentElement.getAttribute('background');

			// Normalizes values for transparent backgrounds
			if (bg == 'none' || bg == '')
			{
				bg = null;
			}
			
			// Checks if export format supports transparent backgrounds
			if (bg == null && data.format != 'gif' && data.format != 'png' && data.format != 'svg')
			{
				bg = '#ffffff';
			}	
		}
		
		// Sets background color on page
		if (bg != null)
		{
			document.body.style.backgroundColor = bg;
		}
		
		//handle layers
		if (extras != null && ((extras.layers != null && extras.layers.length > 0) || 
							   (extras.layerIds != null && extras.layerIds.length > 0)))
		{
			var childCount = model.getChildCount(model.root);
			
			// Hides all layers
			for (var i = 0; i < childCount; i++)
			{
				model.setVisible(model.getChildAt(model.root, i), false);
			}

			if (extras.layerIds != null)
			{
				for (var i = 0; i < extras.layerIds.length; i++)
				{
					model.setVisible(model.getCell(extras.layerIds[i]), true);
				}
			}
			else
			{
				for (var i = 0; i < extras.layers.length; i++)
				{
					var layer = model.getChildAt(model.root, extras.layers[i]);
					
					if (layer != null)
					{
						model.setVisible(layer, true);
					}
				}
			}
		}
		
		// Sets initial value for PDF page background
		graph.pdfPageVisible = false;
		
		// Handles PDF output where the output should match the page format if the page is visible
		if (data.print || (data.format == 'pdf' && xmlDoc.documentElement.getAttribute('page') == '1' && data.w == 0 && data.h == 0 && data.scale == 1))
		{
			//Electron printing
			var printScale = 1;
			
			if (data.print)
			{
				document.title = data.fileTitle;
				
				var gb = graph.getGraphBounds();
				printScale = data.pageScale;
		
				if (isNaN(printScale))
				{
					printScale = 1;
				}
				
				if (data.fit)
				{
					var h = parseInt(data.sheetsAcross);
					var v = parseInt(data.sheetsDown);
					
					data.scale = Math.min((data.pageHeight * v) / (gb.height / graph.view.scale),
							(data.pageWidth * h) / (gb.width / graph.view.scale));
				}
				else
				{
					data.scale = data.scale / graph.pageScale;
					
					if (isNaN(data.scale))
					{
						printScale = 1 / graph.pageScale;
					}
				}
			}
			
			var pw = data.pageWidth || xmlDoc.documentElement.getAttribute('pageWidth');
			var ph = data.pageHeight || xmlDoc.documentElement.getAttribute('pageHeight');
			graph.pdfPageVisible = true;
			
			if (pw != null && ph != null)
			{
				graph.pageFormat = new mxRectangle(0, 0, parseFloat(pw), parseFloat(ph));
			}
			
			var ps = data.pageScale || xmlDoc.documentElement.getAttribute('pageScale');
			
			if (ps != null)
			{
				graph.pageScale = ps;
			}
			
			graph.getPageSize = function()
			{
				return new mxRectangle(0, 0, this.pageFormat.width * this.pageScale,
					this.pageFormat.height * this.pageScale);
			};
			
			graph.getPageLayout = function()
			{
				var size = this.getPageSize();
				var bounds = this.getGraphBounds();

				if (bounds.width == 0 || bounds.height == 0)
				{
					return new mxRectangle(0, 0, 1, 1);
				}
				else
				{
					// Computes untransformed graph bounds
					var x = Math.ceil(bounds.x / this.view.scale - this.view.translate.x);
					var y = Math.ceil(bounds.y / this.view.scale - this.view.translate.y);
					var w = Math.floor(bounds.width / this.view.scale);
					var h = Math.floor(bounds.height / this.view.scale);
					
					var x0 = Math.floor(x / size.width);
					var y0 = Math.floor(y / size.height);
					var w0 = Math.ceil((x + w) / size.width) - x0;
					var h0 = Math.ceil((y + h) / size.height) - y0;
					
					return new mxRectangle(x0, y0, w0, h0);
				}
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
		}

		if (!graph.pdfPageVisible)
		{
			var b = graph.getGraphBounds();
			
			// Floor is needed to keep rendering crisp
			if (data.w > 0 || data.h > 0)
			{
				var s = 1;
				
				if (data.w > 0 && data.h > 0)
				{
					s = Math.min(data.w / b.width, data.h / b.height);
				}
				else if (data.w > 0)
				{
					s = data.w / b.width;
				}
				else
				{
					s = data.h / b.height;
				}
				
				graph.view.scaleAndTranslate(s,
					Math.floor(data.border / s - Math.floor(b.x)),
					Math.floor(data.border / s - Math.floor(b.y)));
			}
			else
			{
				var s = data.scale;
				
				if (autoScale)
				{
					var pageWidth = (extras != null && extras.pageWidth != null) ? extras.pageWidth : 800;
					
					if (b.width < pageWidth & b.height < 1.5 * pageWidth)
					{
						s = 4;
					}
					else if (b.width < 2 * pageWidth & b.height < 3 * pageWidth)
					{
						s = 3;
					}
					else if (b.width < 4 * pageWidth && b.height < 6 * pageWidth)
					{
						s = 2;
					}
					
					if (extras != null && extras.isGoogleSheet != null)
					{
						GOOGLE_APPS_MAX_AREA = GOOGLE_SHEET_MAX_AREA;
					}
					
					//The image cannot exceed 25 MP to be included in Google Apps
					if (b.width * s * b.height * s > GOOGLE_APPS_MAX_AREA)
					{
						//Subtracting 0.01 to prevent any other rounding that can make slightly over 25 MP 
						s = Math.sqrt(GOOGLE_APPS_MAX_AREA / (b.width * b.height)) - 0.01;
					}
				}
				
				graph.view.scaleAndTranslate(s,
					Math.floor(data.border - Math.floor(b.x)),
					Math.floor(data.border - Math.floor(b.y)));
			}
		}
		else
		{
			// Disables border for PDF page export
			data.border = 0;
			
			// Moves to first page in page layout
			var layout = graph.getPageLayout();
			var page = graph.getPageSize();
			var dx = layout.x * page.width;
			var dy = layout.y * page.height;
			
			if (dx != 0 || dy != 0)
			{
				graph.view.setTranslate(Math.floor(-dx), Math.floor(-dy));
			}
		}
		
		// Gets the diagram bounds and sets the document size
		bounds = (graph.pdfPageVisible) ? graph.view.getBackgroundPageBounds() : graph.getGraphBounds();
		bounds.width = Math.ceil(bounds.width + data.border) + 1; //The 1 extra pixels to prevent cutting the cells on the edges when crop is enabled
		bounds.height = Math.ceil(bounds.height + data.border) + 1; //The 1 extra pixels to prevent starting a new page. TODO Not working in every case
		
		//Print to pdf fails for 1x1 pages
		if (bounds.width <= 1 && bounds.height <= 1)
		{
			bounds.width = 2;
			bounds.height = 2;
		}

		expScale = graph.view.scale || 1;
		
		// Converts the graph to a vertical sequence of pages for PDF export
		if (graph.pdfPageVisible)
		{
			var pf = graph.pageFormat || mxConstants.PAGE_FORMAT_A4_PORTRAIT;
			var scale = data.print? data.scale : 1 / graph.pageScale;
			var autoOrigin = (data.print && data.fit != null) ? data.fit : false;
			var border = 0;

			// Negative coordinates are cropped or shifted if page visible
			var gb = graph.getGraphBounds();
			var x0 = 0;
			var y0 = 0;
	
			// Applies print scale
			pf = mxRectangle.fromRectangle(pf);
			pf.width = Math.ceil(pf.width * printScale) + 1; //The 1 extra pixels to prevent cutting the cells on the right edge of the page
			pf.height = Math.ceil(pf.height * printScale) + 1; //The 1 extra pixels to prevent starting a new page. TODO Not working in every case
			scale *= printScale;	
			
			// Starts at first visible page
			if (!autoOrigin)
			{
				var layout = graph.getPageLayout();
				x0 -= layout.x * pf.width;
				y0 -= layout.y * pf.height;
			}

			var anchorId = (currentPageId != null) ? 'page/id,' + currentPageId : null;
			
			if (preview == null)
			{
				preview = new mxPrintPreview(graph, scale, pf, border, x0, y0);
				preview.printBackgroundImage = true;
				preview.autoOrigin = autoOrigin;
				preview.backgroundColor = bg;
				// Renders print output into this document and removes the graph container
				preview.open(null, window, null, null, anchorId);
				graph.container.parentNode.removeChild(graph.container);
			}
			else
			{
				preview.backgroundColor = bg;
				preview.autoOrigin = autoOrigin; 
				preview.appendGraph(graph, scale, x0, y0, null, null, anchorId);
			}

			// Adds shadow
			// NOTE: Shadow rasterizes output
			/*if (mxClient.IS_SVG && xmlDoc.documentElement.getAttribute('shadow') == '1')
			{
				var svgs = document.getElementsByTagName('svg');
				
				for (var i = 0; i < svgs.length; i++)
				{
					var svg = svgs[i];

					var filter = graph.addSvgShadow(svg, null, true);
					filter.setAttribute('id', 'shadow-' + i);
					svg.appendChild(filter);
					svg.setAttribute('filter', 'url(#' + 'shadow-' + i + ')');
				}
				
				border = 7;
			}*/
			
			bounds = new mxRectangle(0, 0, pf.width, pf.height);
		}
		else
		{
			var bgImg = graph.backgroundImage;

			if (bgImg != null)
			{
				var t = graph.view.translate;
				var s = graph.view.scale;

				bounds.add(new mxRectangle(
					(t.x + bgImg.x) * s, (t.y + bgImg.y) * s,
					bgImg.width * s, bgImg.height * s));

				if (t.x < 0 || t.y < 0)
				{
					graph.view.setTranslate(t.x < 0? -bgImg.x * s : t.x, t.y < 0? -bgImg.y * s : t.y);
					bounds.x = 0.5;
					bounds.y = 0.5;
				}
			}

			// Adds shadow
			// NOTE: PDF shadow rasterizes output so it's disabled
			if (data.format != 'pdf' && mxClient.IS_SVG && xmlDoc.documentElement.getAttribute('shadow') == '1')
			{
				graph.addSvgShadow(graph.view.canvas.ownerSVGElement, null, true);
				graph.setShadowVisible(true);
				bounds.width += 7;
				bounds.height += 7;
			}
			
			document.body.style.width = Math.ceil(bounds.x + bounds.width) + 'px';
			document.body.style.height = Math.ceil(bounds.y + bounds.height) + 'px';
		}
	};
	
	if (diagrams != null && diagrams.length > 0)
	{
		var to = diagrams.length - 1;
		
		//Parameters to and all pages should not be sent with formats other than PDF with page view enabled
		if (!data.allPages)
		{
			if (data.pageId != null)
			{
				for (var i = 0; i < diagrams.length; i++)
				{
					if (data.pageId == diagrams[i].getAttribute('id'))
					{
						from = i;
						to = i;
						break;
					}
				}
			}
			else
			{
				from = Math.max(0, Math.min(parseInt(data.from) || from, diagrams.length - 1));
				to = parseInt(data.to);
				//If to is not defined, use from (so one page), otherwise, to is restricted to the range from "from" to diagrams.length - 1
				to = isNaN(to)? from : Math.max(from, Math.min(to, diagrams.length - 1));
			}
		}
		
		/**
		 * Implements %page% and %pagenumber% placeholders
		 */
		var graphGetGlobalVariable = graph.getGlobalVariable;
		
		graph.getGlobalVariable = function(name)
		{
			if (name == 'page')
			{
				return (diagrams == null) ? 'Page-1' :
					(diagrams[from].getAttribute('name') || ('Page-' + (from + 1)));
			}
			else if (name == 'pagenumber')
			{
				return from + 1;
			}
			
			return graphGetGlobalVariable.apply(this, arguments);
		};
			
		for (var i = from; i <= to; i++) 
		{
			if (diagrams[i] != null)
			{
				if (pageId == null)
				{
					pageId = diagrams[i].getAttribute('id');
				}
				
				xmlDoc = Editor.parseDiagramNode(diagrams[i]);
				
				if (xmlDoc != null)
				{
					xmlDoc = xmlDoc.ownerDocument;
				}

				graph.getModel().clear();
				from = i;
				renderPage(diagrams[i].getAttribute('id'));
			}
		}
	}
	else
	{
		renderPage();
	}
	
	if (fallbackFont)
	{
		// Add a fallbackFont font to all labels in case the selected font doesn't support the character
		// Some systems doesn't have a good fallback fomt that supports all languages
		// Use this with a custom font-face in export-fonts.css file
		document.querySelectorAll('foreignObject div').forEach(d => d.style.fontFamily = (d.style.fontFamily || '') + ', ' + fallbackFont);
	}
	
	renderGrid();
	// Includes images in SVG and HTML labels
	waitForImages('image', 'xlink:href');
	waitForImages('img', 'src');
	renderMath(document.body);
	// Immediate return if not waiting for any content
	decrementWaitCounter();
	
	return graph;
};

//Electron pdf export
if (mxIsElectron)
{
	try 
	{
		electron.registerMsgListener('render', (arg) => 
		{
			try
			{
				if (window.shapesLoaded)
				{
					render(arg);
				}
				else
				{
					window.pendingRequest = arg;
				}
			}
			catch(e)
			{
				console.log(e);
				electron.sendMessage('render-finished', null);
			}
		});
	}
	catch(e)
	{
		console.log(e);
	}
}
