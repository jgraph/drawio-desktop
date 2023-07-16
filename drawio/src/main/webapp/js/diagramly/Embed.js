(function(stylesheet, stencils)
{
	// Callbacks:
	// mxClientOnLoad is called  after the script is loaded with the stylesheet and the function to create a
	//     graph (wich takes the container as an argument and returns the graph instance that was created).
	// mxClientOnCreate is called when a graph has been created with the graph.
	mxStencilRegistry.dynamicLoading = false;

	// Adds CSS for tooltips
	try
	{
		var style = document.createElement('style')
		style.type = 'text/css'
		style.innerHTML = ['div.mxTooltip {',
			'-webkit-box-shadow: 3px 3px 12px #C0C0C0;',
			'-moz-box-shadow: 3px 3px 12px #C0C0C0;',
			'box-shadow: 3px 3px 12px #C0C0C0;',
			'background: #FFFFCC;',
			'border-style: solid;',
			'border-width: 1px;',
			'border-color: black;',
			'font-family: Arial;',
			'font-size: 8pt;',
			'position: absolute;',
			'cursor: default;',
			'padding: 4px;',
			'color: black;}'].join('\n');
		document.getElementsByTagName('head')[0].appendChild(style)
	}
	catch (e)
	{
		// ignore
	}

	var mathJaxLoading = typeof MathJax !== 'undefined' && typeof MathJax.typeset === 'function';
	var mathJaxQueue = [];

	function renderMath(nodes)
	{
		try
		{
			MathJax.typesetClear(nodes);
			MathJax.typeset(nodes);
		}
		catch (e)
		{
			MathJax.typesetClear(nodes);

			if (e.retry != null)
			{
				e.retry.then(function()
				{
					MathJax.typesetPromise(nodes);
				});
			}
			else if (window.console != null)
			{
				console.log('Error in MathJax: ' + e.toString());
			}
		}
	};
	
	function loadMathJax()
	{
		// Uses existing configuration if MathJax already in page
		if (!mathJaxLoading)
		{
			mathJaxLoading = true;

			window.MathJax =
			{
				options:
				{
					skipHtmlTags: {'[+]': ['text']}
				},
				loader:
				{
					load: [(urlParams['math-output'] == 'html') ?
						'output/chtml' : 'output/svg', 'input/tex',
						'input/asciimath', 'ui/safe']
				},
				startup:
				{
					pageReady: function()
					{
						renderMath(mathJaxQueue);
					}
				}
			};

			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = 'https://app.diagrams.net/math/es5/startup.js';
			document.getElementsByTagName('head')[0].appendChild(script);
		}
	};
	
	function addMathJaxGraph(graph)
	{
		// Initial rendering when MathJax finished loading
		if (typeof MathJax !== 'undefined' && typeof MathJax.typeset === 'function')
		{
			renderMath([graph.container]);
		}
		else
		{
			mathJaxQueue.push(graph.container);
		}
	};
	
	// Handles relative images
	mxGraph.prototype.getImageFromBundles = function(key)
	{
		if (key != null)
		{
			if (key.substring(0, 7) != 'http://' && key.substring(0, 8) != 'https://' && key.substring(0, 10) != 'data:image')
			{
				if (key.charAt(0) == '/')
				{
					key = key.substring(1, key.length);
				}
				
				key = 'https://app.diagrams.net/' + key;
			}
			
			return key;
		}
		
		return null;
	};
	
	if (stencils != null)
	{
		for (var i = 0; i < stencils.length; i++)
		{
			var xmlDoc = mxUtils.parseXml(stencils[i]);
			mxStencilRegistry.parseStencilSet(xmlDoc.documentElement);
		}
	}
	
	// Panning for touch devices
	if (mxClient.IS_TOUCH)
	{
		mxPanningHandler.prototype.isPanningTrigger = function(me)
		{
			return true;
		};
	}
	
	(function()
	{
		function initGraph(container)
		{
			try
			{
				var child = container.firstChild;
				
				while (child != null && child.nodeType != mxConstants.NODETYPE_ELEMENT)
				{
					child = child.nextSibling;
				}
				
				var xml = mxUtils.trim(child.innerHTML);
				container.innerText = '';

				// Instance needed for decompress helper function
				var graph = new Graph(container);

				if (xml.substring(0, 4) == '&lt;')
				{
					xml = xml.replace(/&lt;/g, '<').replace(/&gt;/g, '>').
						replace(/&amp;gt;/g, '&gt;').replace(/&amp;lt;/g, '&lt;').
						replace(/&amp;quot;/g, '&quot;').replace(/&#xa;/g, '\n');
				}
				else if (xml.substring(0, 3) == '%3C')
				{
					xml = decodeURIComponent(xml);
				}
				else
				{
					xml = Graph.decompress(xml);
				}
				
				var xmlDocument = mxUtils.parseXml(xml);
				var configNode = null;
				var diagrams = null;

				if (xmlDocument.documentElement != null && xmlDocument.documentElement.nodeName == 'mxfile')
				{
					diagrams = xmlDocument.documentElement.getElementsByTagName('diagram');
					configNode = xmlDocument.documentElement;
					
					if (diagrams.length > 0)
					{
						xml = mxUtils.getTextContent(diagrams[0]);
						xml = Graph.decompress(xml);
						xmlDocument = mxUtils.parseXml(xml);
					}
				}
				
				if (xmlDocument.documentElement != null && xmlDocument.documentElement.nodeName == 'mxGraphModel')
				{
					var decoder = new mxCodec(xmlDocument);
					var node = xmlDocument.documentElement;
					
					if (configNode == null)
					{
						configNode = node;
					}

					graph.resetViewOnRootChange = false;
					graph.setEnabled(false);

					if (diagrams != null && diagrams.length > 0)
					{
						/**
						 * Adds placeholder for %page% and %pagenumber%
						 */
						var graphGetGlobalVariable = graph.getGlobalVariable;
						
						graph.getGlobalVariable = function(name)
						{
							if (name == 'page')
							{
								return diagrams[0].getAttribute('name') || 'Page-1';
							}
							else if (name == 'pagenumber')
							{
								return 1;
							}
							else if (name == 'pagecount')
							{
								return diagrams.length;
							}
							
							return graphGetGlobalVariable.apply(this, arguments);
						};
					}
					
					graph.foldingEnabled = configNode.getAttribute('nav') == '1';
					graph.cellRenderer.forceControlClickHandler = graph.foldingEnabled;
					
					var tooltips = configNode.getAttribute('tooltips');
					
			    	if (tooltips != '0')
			    	{
			    		graph.setTooltips(true);
			    	}
			    	else
			    	{
			    		graph.setTooltips(false);
			    	}
					
					// Loads the stylesheet
					if (stylesheet != null)
					{
						var xmlDoc = mxUtils.parseXml(stylesheet);
						var dec = new mxCodec(xmlDoc);
						dec.decode(xmlDoc.documentElement, graph.getStylesheet());
					}
					
					var math = configNode.getAttribute('math');
					
					if (math == '1')
					{
						loadMathJax();
					}
					
					// Enables panning with left mouse button
					var pan = configNode.getAttribute('pan');
					
					if (pan != '0')
					{
						graph.panningHandler.useLeftButtonForPanning = true;
						graph.panningHandler.ignoreCell = true;
						container.style.cursor = 'move';
						graph.setPanning(true);
					}
					else
					{
						container.style.cursor = 'default';
					}
					
					var resize = configNode.getAttribute('resize');
					var border = Number(configNode.getAttribute('border') || 0);
					graph.border = border;

					var fit = configNode.getAttribute('fit');
					
					if ((container.style.width != '100%' && fit != '1' && resize != '0') ||
						(container.style.width == '' && container.style.height == ''))
					{
						graph.resizeContainer = true;
						graph.centerZoom = false;
					}
					else
					{
						// Updates the container height for autosize width
						if (resize != '0' && container.style.width == '100%' && container.style.height == '')
						{
							graph.resizeContainer = true;
							graph.centerZoom = false;
							
							graph.doResizeContainer = function(width, height)
							{
								// Fixes container size for different box models
								if (mxClient.IS_IE)
								{
									if (document.documentMode >= 9)
									{
										width += 3;
										height += 5;
									}
									else
									{
										width += 1;
										height += 1;
									}
								}
								else
								{
									height += 1;
								}
								
								if (this.maximumContainerSize != null)
								{
									width = Math.min(this.maximumContainerSize.width, width);
									height = Math.min(this.maximumContainerSize.height, height);
								}

								this.container.style.height = Math.ceil(height + 18) + 'px';
							};
						}
						else
						{
							graph.centerZoom = true;
						}
					}
					
					// Adds handling for hyperlinks, tooltips
					var links = configNode.getAttribute('links');
					var hl = configNode.getAttribute('highlight');
					
					if (links != '0' || tooltips != '0')
					{
						var cursor = container.style.cursor;
				    	var tol = graph.getTolerance();
						
						graph.addMouseListener(
						{
						    currentState: null,
						    currentLink: null,
						    highlight: (hl != null && hl != '' && hl != mxConstants.NONE) ?
						    	new mxCellHighlight(graph, hl, 2) : null,
						    startX: 0,
						    startY: 0,
						    mouseDown: function(sender, me)
						    {
						    	this.startX = me.getGraphX();
						    	this.startY = me.getGraphY();
						    },
						    mouseMove: function(sender, me)
						    {
						    	if (graph.isMouseDown)
						    	{
						    		if (this.currentLink != null)
						    		{
								    	var dx = Math.abs(this.startX - me.getGraphX());
								    	var dy = Math.abs(this.startY - me.getGraphY());
								    	
								    	if (dx > tol || dy > tol)
								    	{
								    		this.clear();
								    	}
						    		}
						    	}
						    	else
						    	{
							    	if (this.currentState != null && (me.getState() == this.currentState || me.getState() == null) &&
							    		graph.intersects(this.currentState, me.getGraphX(), me.getGraphY()))
							    	{
						    			return;
							    	}
							    	
									var tmp = graph.view.getState(me.getCell());

							      	if (tmp != this.currentState)
							      	{
							        	if (this.currentState != null)
							        	{
							          		this.clear();
							        	}
							        
						        		this.currentState = tmp;
							        
							        	if (this.currentState != null)
							        	{
							          		this.activate(this.currentState);
							        	}
							      	}
						    	}
						    },
						    mouseUp: function(sender, me)
						    {
						    	var tmp = this.currentLink;
						    	this.clear();
						    	
						    	if (tmp != null) 
						    	{
						    		if (tmp.charAt(0) == '#')
						    		{
						    			window.location.hash = tmp;
						    		}
						    		else
						    		{
						    			window.open(tmp);
						    		}
						    	}
						    },
						    activate: function(state)
						    {
						    	this.currentLink = graph.getLinkForCell(state.cell);
						    	
						    	if (this.currentLink != null)
						    	{
						    		container.style.cursor = 'pointer';

						    		if (this.highlight != null)
						    		{
						    			this.highlight.highlight(state);
						    		}
							    }
						    },
						    clear: function()
						    {
						    	container.style.cursor = cursor;
						    	this.currentState = null;
						    	this.currentLink = null;
						    	
						    	if (this.highlight != null)
						    	{
						    		this.highlight.hide();
						    	}
						    }
						});
					}
					
					var x0 = Number(configNode.getAttribute('x0') || 0);
					var y0 = Number(configNode.getAttribute('y0') || 0);
					graph.view.translate.x = -x0 + border;
					graph.view.translate.y = -y0 + border;
					
					function graphAdded(node)
					{
						var img = node.getAttribute('backgroundImage');
						
						if (img != null)
						{
							img = JSON.parse(img);
							graph.setBackgroundImage(new mxImage(img.src, img.width, img.height));
							graph.view.validateBackgroundImage();
						}
						
						if (fit != '0')
						{
							graph.fit(border);
						}
						
						if (math == '1')
						{
							addMathJaxGraph(graph);
						}
						
						// Keeps hashtag links on same page
						var links = graph.container.getElementsByTagName('a');
						
						if (links != null)
						{
							for (var i = 0; i < links.length; i++)
							{
								var href = links[i].getAttribute('href');
								
								if (href != null && href.charAt(0) == '#' &&
									links[i].getAttribute('target') == '_blank')
								{
									links[i].removeAttribute('target');
								}
							}
						}
					};
					
					// Load from URL via url attribute
					var url = configNode.getAttribute('url');
					
					if (url != null)
					{
						try
						{
							// Workaround for unsupported CORS in IE9 XHR
							var xhr = (navigator.userAgent != null && navigator.userAgent.indexOf('MSIE 9') > 0) ?
								new XDomainRequest() : new XMLHttpRequest();
							xhr.open('GET', url);
							
						    xhr.onload = mxUtils.bind(this, function()
						    {
						    	try
						    	{
							    	var data = (xhr.getText != null) ? xhr.getText() : xhr.responseText;

							    	if (data != null)
							    	{
							    		var newDocument = mxUtils.parseXml(data);
							    		
							    		// LATER: Add support for .png (with XML) files
							    		// Adds support for HTML 
							    		if (newDocument != null && newDocument.documentElement.nodeName == 'html')
							    		{
							    			var divs = newDocument.documentElement.getElementsByTagName('div');
							    			
							    			if (divs.length > 0 && divs[0].getAttribute('class') == 'mxgraph')
							    			{
							    				var divs2 = divs[0].getElementsByTagName('div');
							    				
							    				if (divs2.length > 0)
							    				{
							    					var data = mxUtils.getTextContent(divs2[0]);
							    	        		data = Graph.decompress(data);
							    	        		
							    	        		if (data.length > 0)
							    	        		{
							    	        			newDocument = mxUtils.parseXml(data);
							    	        		}
							    				}
							    			}
							    		}
							    		
							    		if (newDocument != null && newDocument.documentElement.nodeName == 'svg')
							    		{
							    			var tmp = newDocument.documentElement.getAttribute('content');
							    			
							    			if (tmp != null && tmp.charAt(0) != '<' && tmp.charAt(0) != '%')
							    			{
							    				tmp = unescape((window.atob) ? atob(tmp) : Base64.decode(cont, tmp));
							    			}
							    			
							    			if (tmp != null && tmp.charAt(0) == '%')
							    			{
							    				tmp = decodeURIComponent(tmp);
							    			}
							    			
							    			if (tmp != null && tmp.length > 0)
							    			{
							    				newDocument = mxUtils.parseXml(tmp);
							    			}
							    		}
							    		
							    		if (newDocument.documentElement.nodeName == 'mxfile')
							    		{
							    			var diagrams = newDocument.documentElement.getElementsByTagName('diagram');
							    			
							    			if (diagrams.length > 0)
							    			{
												var text = mxUtils.trim(mxUtils.getTextContent(diagrams[0]));
												
												if (text.length > 0)
												{
													var tmp = Graph.decompress(text);
													
													if (tmp != null && tmp.length > 0)
													{
														newDocument = mxUtils.parseXml(tmp);
													}
												}
												else
												{
													var temp = mxUtils.getChildNodes(diagrams[0]);
													
													if (temp.length > 0)
													{
														// Creates new document for unique IDs within mxGraphModel
														newDocument = mxUtils.createXmlDocument();
														newDocument.appendChild(newDocument.importNode(temp[0], true));
													}
												}
							    			}
							    		}
							    		
							    		decoder = new mxCodec(newDocument);
							    		decoder.decode(newDocument.documentElement, graph.getModel());
							    		graphAdded(newDocument.documentElement);
							    	}
							    	else
							    	{
							    		graph.container.innerText = 'Cannot load ' + url;
							    	}
						    	}
								catch (e)
								{
									graph.container.innerText = 'Cannot load ' + url + ': ' + e.message;
								}
						    });
						    
						    xhr.onerror = function()
						    {
						    	graph.container.innerText = 'Cannot load ' + url;
						    };
						
						    xhr.send();
						}
						catch (e)
						{
							graph.container.innerText = 'Cannot load ' + url + ': ' + e.message;
						}
					}
					else
					{
						decoder.decode(node, graph.getModel());
						graphAdded(node);
					}

					if (container.style.width != '100%' && fit != '0' && resize == '1')
					{
						graph.resizeContainer = true;
						graph.centerZoom = false;
					}
					
					// Adds zoom, edit etc in top, left corner
					var buttons = document.createElement('div');
					buttons.style.position = 'absolute';
					buttons.style.overflow = 'visible';
					buttons.style.cursor = 'pointer';

					var bs = graph.getBorderSizes();
					
					var left = 0;
					var fontSize = 10;
					var bw = 16;
					var bh = 16;
					
					if (mxClient.IS_TOUCH)
					{
						bw = 24;
						bh = 24;
						var fontSize = 14;
					}
					
					function addButton(label, funct)
					{
						var btn = document.createElement('div');
						btn.style.position = 'absolute';
						btn.style.border = '1px solid gray';
						btn.style.textAlign = 'center';
						btn.style.cursor = 'hand';
						btn.style.width = bw + 'px';
						btn.style.height = bh + 'px';
						btn.style.left = left + 'px';
						btn.style.top = '0px';
						btn.style.backgroundColor = 'white';
						mxUtils.setOpacity(btn, 50);
						
						var table = document.createElement('table');
						table.style.borderWidth = '0px';
						table.style.width = '100%';
						table.style.height = '100%';
						var tbody = document.createElement('tbody');
						var tr = document.createElement('tr');
						var td = document.createElement('td');
						td.style.verticalAlign = 'middle';
						td.style.textAlign = 'center';
						td.style.fontSize = fontSize + 'px';
						td.style.padding = '0px';
						mxUtils.write(td, label);
						tr.appendChild(td);
						tbody.appendChild(tr);
						table.appendChild(tbody);
						btn.appendChild(table);
		
						mxEvent.addListener(btn, (mxClient.IS_POINTER) ? 'pointerdown' : 'mousedown', function(evt)
						{
							mxEvent.consume(evt);
						});
						
						mxEvent.addListener(btn, (mxClient.IS_POINTER) ? 'pointerup' : 'mouseup', function(evt)
						{
							funct();
							mxEvent.consume(evt);
						});

						if (!mxClient.IS_POINTER && mxClient.IS_TOUCH)
						{
							mxEvent.addListener(btn, 'touchstart', function(evt)
							{
								mxEvent.consume(evt);
							});
							
							mxEvent.addListener(btn, 'touchend', function(evt)
							{
								funct();
								mxEvent.consume(evt);
							});
						}
						
						left += bw;
						buttons.appendChild(btn);
						
						return btn;
					};
													
					var zoom = configNode.getAttribute('zoom');
					
					if (zoom != '0')
					{
						addButton('+', function()
						{
							graph.zoomIn();
						});
						
						addButton('-', function()
						{
							graph.zoomOut();
						});
					}
					
					var edit = configNode.getAttribute('edit');
					
					if (edit != null)
					{
						var button = addButton('', function()
						{
							// _blank is a special value to open a new editor
							// in client mode and send the XML as a message
							if (edit == '_blank')
							{
								if (url != null)
								{
									window.open('https://app.diagrams.net/#U' + encodeURIComponent(url));
								}
								else
								{
									var wnd = null;
								
									var receive = function(evt)
									{
										if (evt.data == 'ready' && evt.source == wnd)
										{
											wnd.postMessage(xml, '*');
											window.removeEventListener('message', receive);
										}
									};
									
									window.addEventListener('message', receive);
									wnd = window.open('https://app.diagrams.net/?client=1');
								}
							}
							else
							{
								window.open(edit);
							}
						});
						
						// Do not use HTML entity to avoid problems with XHTML
						button.innerText = '...';
					}
					
					function show()
					{
						buttons.style.top = (container.offsetTop + bs.y) + 'px';
						buttons.style.left = (container.offsetLeft + bs.x) + 'px';
						buttons.style.visibility = 'visible';
					};
					
					if (!mxClient.IS_POINTER && !mxClient.IS_TOUCH)
					{
						function hide()
						{
							buttons.style.visibility = 'hidden';
						};
						
						mxEvent.addListener(container, 'mouseover', show);
						mxEvent.addListener(buttons, 'mouseover', show);
						mxEvent.addListener(container, 'mouseout', hide);
						mxEvent.addListener(buttons, 'mouseout', hide);
						hide();
					}
					else
					{
						show();
					}
					
					if (buttons.firstChild != null)
					{
						if (container.nextSibling != null)
						{
							container.parentNode.insertBefore(buttons, container.nextSibling);
						}
						else
						{
							container.parentNode.appendChild(buttons);
						}
					}
					
					if (typeof(window.mxClientOnCreate) == 'function')
					{
						window.mxClientOnCreate(graph);
					}
				}
			}
			catch (err)
			{
				if (window.console != null)
				{
					console.log('Error:', err);
				}
			}
			
			return graph;
		};
		
		if (typeof(mxClientOnLoad) == 'function')
		{
			mxClientOnLoad(stylesheet, initGraph);
		}
		else if (mxClient.isBrowserSupported())
		{
			var tmp = document.getElementsByTagName('*');
			var divs = [];
			
			for (var i = 0; i < tmp.length; i++)
			{
				divs.push(tmp[i]);
			}
			
			for (var i = 0; i < divs.length; i++)
			{
				if (divs[i].className.toString().indexOf('mxgraph') >= 0)
				{
					initGraph(divs[i]);
				}
			}
		}
	})();
// Last line will be replaced by servlet for passing arguments.
})();
