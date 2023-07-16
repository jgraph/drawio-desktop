/**
 * Copyright (c) 2006-2017, JGraph Ltd
 * Copyright (c) 2006-2017, Gaudenz Alder
 */
(function()
{
	/**
	 * Version
	 */
	EditorUi.VERSION = '@DRAWIO-VERSION@';
	
	/**
	 * Overrides compact UI setting.
	 */
	EditorUi.compactUi = Editor.currentTheme != 'atlas';

	/**
	 * Overrides default grid color for dark mode
	 */
	if (Editor.isDarkMode())
	{
		mxGraphView.prototype.gridColor = mxGraphView.prototype.defaultDarkGridColor;
	}
	
	/**
	 * Switch to disable logging for mode and search terms.
	 */
	EditorUi.enableLogging = urlParams['stealth'] != '1' && urlParams['lockdown'] != '1' &&
		(/.*\.draw\.io$/.test(window.location.hostname) ||
		/.*\.diagrams\.net$/.test(window.location.hostname)) &&
		window.location.hostname != 'support.draw.io';
	
	/**
	 * Protocol and hostname to use for embedded files. Default is https://www.draw.io
	 */
	EditorUi.drawHost = window.DRAWIO_BASE_URL;
	
	/**
	 * Protocol and hostname to use for embedded files. Default is https://www.draw.io
	 */
	EditorUi.lightboxHost = window.DRAWIO_LIGHTBOX_URL;
	
	/**
	 * Switch to disable logging for mode and search terms.
	 */
	EditorUi.lastErrorMessage = null;

	/**
	 * Switch to disable logging for mode and search terms.
	 */
	EditorUi.ignoredAnonymizedChars = '\n\t`~!@#$%^&*()_+{}|:"<>?-=[]\;\'.\/,\n\t';

	/**
	 * Specifies the URL for the templates index file.
	 */
	EditorUi.templateFile = TEMPLATE_PATH + '/index.xml';

	/**
	 * Specifies the URL for the diffsync cache.
	 */
	EditorUi.cacheUrl = window.REALTIME_URL;

	/**
	 * Disables sync if no diffsync cache is defined.
	 */
	if (EditorUi.cacheUrl == null && typeof DrawioFile !== 'undefined')
	{
		DrawioFile.SYNC = 'none'; // Disables real-time sync
	}
	
	/**
	 * Cache timeout is 10 seconds.
	 */
	Editor.cacheTimeout = 10000;

	/**
	 * Switch to enable PlantUML in the insert from text dialog.
	 * NOTE: This must also be enabled on the server-side.
	 */
	EditorUi.enablePlantUml = EditorUi.enableLogging;

	/**
	 * https://github.com/electron/electron/issues/2288
	 */
	EditorUi.isElectronApp = window != null && window.process != null &&
		window.process.versions != null && window.process.versions['electron'] != null;
	
	/**
	 * Shortcut for capability check.
	 */
	EditorUi.nativeFileSupport = !mxClient.IS_OP && !EditorUi.isElectronApp &&
		urlParams['extAuth'] != '1' && 'showSaveFilePicker' in window &&
		'showOpenFilePicker' in window;

	/**
	 * Specifies if drafts should be saved in IndexedDB.
	 */
	EditorUi.enableDrafts = !mxClient.IS_CHROMEAPP &&
		isLocalStorage && urlParams['drafts'] != '0';
	
	/**
	 * Link for scratchpad help.
	 */
	EditorUi.scratchpadHelpLink = 'https://www.drawio.com/doc/faq/scratchpad';

	/**
	 * Specifies if the edit option should be shown in the HTML export dialog.
	 */
	EditorUi.enableHtmlEditOption = true;
 
	/**
	 * Default Mermaid config without using foreign objects in flowcharts.
	 */
	EditorUi.mermaidDiagramTypes = ['flowchart', 'classDiagram', 'sequenceDiagram',
		'stateDiagram', 'mindmap', 'graph', 'erDiagram', 'requirementDiagram',
		'journey', 'gantt', 'pie', 'gitGraph'];

	/**
	 * Default Mermaid config without using foreign objects in flowcharts.
	 */
	EditorUi.defaultMermaidConfig = {
		theme:'neutral',
		arrowMarkerAbsolute:false,
	    flowchart:
	    {
	    	htmlLabels:false
	    },
	    sequence:
	    {
	    	diagramMarginX:50,
	    	diagramMarginY:10,
	    	actorMargin:50,
	    	width:150,
	    	height:65,
	    	boxMargin:10,
	    	boxTextMargin:5,
	    	noteMargin:10,
	    	messageMargin:35,
	    	mirrorActors:true,
	    	bottomMarginAdj:1,
	    	useMaxWidth:true,
	    	rightAngles:false,
	    	showSequenceNumbers:false
	    },
	    gantt:{
	    	titleTopMargin:25,
	    	barHeight:20,
	    	barGap:4,
	    	topPadding:50,
	    	leftPadding:75,
	    	gridLineStartPadding:35,
	    	fontSize:11,
	    	fontFamily:'"Open-Sans", "sans-serif"',
	    	numberSectionStyles:4,
	    	axisFormat:'%Y-%m-%d'
	    }
	};

	/**
	 * Updates action states depending on the selection.
	 */
	EditorUi.logError = function(message, url, linenumber, colno, err, severity, quiet)
	{
		if (message != null)
		{
			err = (err != null) ? err : new Error(message);
			err.stack = (err.stack != null) ? err.stack : '';
			severity = (severity != null) ? severity : ((message.indexOf('NetworkError') < 0 &&
				message.indexOf('SecurityError') < 0 && message.indexOf('NS_ERROR_FAILURE') < 0 &&
				message.indexOf('out of memory') < 0) ? 'SEVERE' : 'CONFIG');
			
			try
			{
				if (EditorUi.enableLogging && urlParams['dev'] != '1' &&
					message != EditorUi.lastErrorMessage && message.indexOf('extension:') < 0 &&
					err.stack.indexOf('extension:') < 0 && err.stack.indexOf('<anonymous>:') < 0)
				{
					EditorUi.lastErrorMessage = message;

					var img = new Image();
					var logDomain = window.DRAWIO_LOG_URL != null ?
						window.DRAWIO_LOG_URL : '';
					img.src = logDomain + '/log?severity=' + severity +
						'&v=' + encodeURIComponent(EditorUi.VERSION) +
						'&msg=clientError:' + encodeURIComponent(message) +
						':url:' + encodeURIComponent(window.location.href) +
						':lnum:' + encodeURIComponent(linenumber) +
						((colno != null) ?
							':colno:' + encodeURIComponent(colno) : '') +
						((err.stack != '') ?
							'&stack=' + encodeURIComponent(err.stack) : '');
				}
			}
			catch (e)
			{
				// ignore
			}
			
			try
			{
				if (!quiet && window.console != null)
				{
					console.error(severity, message, url, linenumber, colno, err);
				}
			}
			catch (e)
			{
				// ignore
			}
		}
	};
	
	/**
	 * Updates action states depending on the selection.
	 */
	EditorUi.logEvent = function(data)
	{
		if (urlParams['dev'] == '1')
		{
			EditorUi.debug('logEvent', data);
		}
		else if (EditorUi.enableLogging)
		{
			try
			{
				var logDomain = window.DRAWIO_LOG_URL != null ? window.DRAWIO_LOG_URL : '';
				var img = new Image();
				img.src = logDomain + '/images/1x1.png?' +
						'v=' + encodeURIComponent(EditorUi.VERSION) +
						((data != null) ? '&data=' + encodeURIComponent(JSON.stringify(data)) : '');
	    	}
			catch (e)
			{
	    			// ignore
			}
		}
	};

	/**
	 * Sending error reports.
	 */
	EditorUi.sendReport = function(data, maxLength)
	{
		if (urlParams['dev'] == '1')
		{
			EditorUi.debug('sendReport', data);
		}
		else if (EditorUi.enableLogging)
		{
			try
			{
				maxLength = (maxLength != null) ? maxLength : 50000;

				if (data.length > maxLength)
				{
					data = data.substring(0, maxLength) + '\n...[SHORTENED]'
				}
				
				mxUtils.post('/email', 'version=' + encodeURIComponent(EditorUi.VERSION) +
					'&url=' + encodeURIComponent(window.location.href) +
					'&data=' + encodeURIComponent(data));
			}
			catch (e)
			{
				// ignore
			}
		}
	};

	/**
	 * Adds the listener for automatically saving the diagram for local changes.
	 */
	EditorUi.debug = function()
	{
		try
		{
			if (window.console != null && urlParams['test'] == '1')
			{
				var args = [new Date().toISOString()];
				
				for (var i = 0; i < arguments.length; i++)
			    {
					args.push(arguments[i]);
			    }
			    
				console.log.apply(console, args);
			}
		}
		catch (e)
		{
			// ignore
		}
	};

	/**
	 * Removes any values, styles and geometries from the given XML node.
	 */
	EditorUi.removeChildNodes = function(node)
	{
		while (node.firstChild != null)
		{
			node.removeChild(node.firstChild);
		}
	};
	
	/**
	 * Contains the default XML for an empty diagram.
	 */
	EditorUi.prototype.emptyDiagramXml = '<mxGraphModel><root><mxCell id="0"/><mxCell id="1" parent="0"/></root></mxGraphModel>';

	/**
	 * 
	 */
	EditorUi.prototype.emptyLibraryXml = '<mxlibrary>[]</mxlibrary>';

	/**
	 * Sets the delay for autosave in milliseconds. Default is 2000.
	 */
	EditorUi.prototype.mode = null;

	/**
	 * General timeout is 25 seconds.
	 * LATER: Move to Editor
	 */
	EditorUi.prototype.timeout = Editor.prototype.timeout;

	/**
	 * Specifies the default custom shape style.
	 */
	EditorUi.prototype.defaultCustomShapeStyle = 'shape=stencil(tZRtTsQgEEBPw1+DJR7AoN6DbWftpAgE0Ortd/jYRGq72R+YNE2YgTePloEJGWblgA18ZuKFDcMj5/Sm8boZq+BgjCX4pTyqk6ZlKROitwusOMXKQDODx5iy4pXxZ5qTHiFHawxB0JrQZH7lCabQ0Fr+XWC1/E8zcsT/gAi+Subo2/3Mh6d/oJb5nU1b5tW7r2knautaa3T+U32o7f7vZwpJkaNDLORJjcu7t59m2jXxqX9un+tt022acsfmoKaQZ+vhhswZtS6Ne/ThQGt0IV0N3Yyv6P3CeT9/tHO0XFI5cAE=);whiteSpace=wrap;html=1;';

	/**
	 * Defines the maximum size for images.
	 */
	EditorUi.prototype.maxBackgroundSize = 1600;

	/**
	 * Defines the maximum size for images in px. Default is 1200.
	 */
	EditorUi.prototype.maxImageSize = 1200;
	
	/**
	 * Defines the maximum width for pasted text.
	 * Use 0 to disable check.
	 */
	EditorUi.prototype.maxTextWidth = 520;

	/**
	 * Images above 100K should be resampled.
	 */
	EditorUi.prototype.resampleThreshold = 100000;

	/**
	 * Defines the maximum size for images in bytes. Default is 2 MB.
	 */
	EditorUi.prototype.maxImageBytes = 2000000;

	/**
	 * Maximum size for background images is 2.5 MB.
	 */
	EditorUi.prototype.maxBackgroundBytes = 2500000;

	/**
	 * Maximum size for text files in labels is 0.5 MB.
	 */
	EditorUi.prototype.maxTextBytes = 500000;

	/**
	 * Holds the current file.
	 */
	EditorUi.prototype.currentFile = null;

	/**
	 * Specifies if PDF export should be done via print dialog. Default is
	 * false which uses the PhantomJS backend to create the PDF.
	 */
	EditorUi.prototype.printPdfExport = false;
	
	/**
	 * Specifies if PDF export with pages is enabled.
	 */
	EditorUi.prototype.pdfPageExport = true;

	/**
	 * Restores app defaults for UI
	 */
	EditorUi.prototype.formatEnabled = urlParams['format'] != '0';

	/**
	 * Whether template action should be shown in insert menu.
	 */
	EditorUi.prototype.insertTemplateEnabled = true;
	
	/**
	 * Restores app defaults for UI
	 */
	EditorUi.prototype.closableScratchpad = true;
	
	/**
	 * Restores app defaults for UI
	 */
	EditorUi.prototype.embedExportBorder = 8;
	
	/**
	 * Restores app defaults for UI
	 */
	EditorUi.prototype.embedExportBackground = null;
	
	/**
	 * Restores app defaults for UI
	 */
	EditorUi.prototype.shareCursorPosition = true;

	/**
	 * Restores app defaults for UI
	 */
	EditorUi.prototype.showRemoteCursors = true;

	/**
	 * Capability check for canvas export
	 */
	(function()
	{
		EditorUi.prototype.useCanvasForExport = false;
		EditorUi.prototype.jpgSupported = false;
		
		// Checks if canvas is supported
		try
		{
			var cnv = document.createElement('canvas');
			EditorUi.prototype.canvasSupported = !!(cnv.getContext && cnv.getContext('2d'));
		}
		catch (e)
		{
			// ignore
		}
		
		try
		{
			var canvas = document.createElement('canvas');
			var img = new Image();
			
			// LATER: Capability check should not be async
			img.onload = function()
			{
				try
				{
			   		var ctx = canvas.getContext('2d');
			   		ctx.drawImage(img, 0, 0);

			   		// Works in Chrome, Firefox, Edge, Safari and Opera
					var result = canvas.toDataURL('image/png');
					EditorUi.prototype.useCanvasForExport = result != null && result.length > 6;
				}
				catch (e)
				{
					// ignore
				}
			};

			// Checks if SVG with foreignObject can be exported
			var svg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1px" height="1px" version="1.1"><foreignObject pointer-events="all" width="1" height="1"><div xmlns="http://www.w3.org/1999/xhtml"></div></foreignObject></svg>';
			img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
		}
		catch (e)
		{
			// ignore
		}
		
		// Checks for client-side JPG support
		try
		{
		    var canvas = document.createElement('canvas');
		    canvas.width = canvas.height = 1;
		    var uri = canvas.toDataURL('image/jpeg');
		    
		    EditorUi.prototype.jpgSupported = (uri.match('image/jpeg') !== null);
		}
		catch (e)
		{
			// ignore
		}
	})();

	/**
	 * Hook for subclassers.
	 */
	EditorUi.prototype.createButtonContainer = function()
	{
		var div = document.createElement('div');
		div.className = 'geButtonContainer';
		div.style.overflow = (urlParams['embed'] == '1') ? 'hidden' : '';

		return div;
	};

	/**
	 * Hook for subclassers.
	 */
	EditorUi.prototype.openLink = function(url, target, allowOpener)
	{
		// LATER: Replace this with direct calls to graph
		return this.editor.graph.openLink(url, target, allowOpener);
	};

	/**
	 * Hook for subclassers.
	 */
	EditorUi.prototype.showSplash = function(force) { };

	/**
	 * Abstraction for local storage access.
	 */
	EditorUi.prototype.getLocalData = function(key, fn)
	{
		fn(localStorage.getItem(key));
	};
	
	/**
	 * Abstraction for local storage access.
	 */
	EditorUi.prototype.setLocalData = function(key, data, fn)
	{
		localStorage.setItem(key, data);
		
		if (fn != null)
		{
			fn();
		}
	};
	
	/**
	 * Abstraction for local storage access.
	 */
	EditorUi.prototype.removeLocalData = function(key, fn)
	{
		localStorage.removeItem(key)
		fn();
	};

	/**
	 * Returns true if offline app, which isn't a defined thing
	 */
	EditorUi.prototype.setShareCursorPosition = function(value)
	{
		this.shareCursorPosition = value;

		this.fireEvent(new mxEventObject('shareCursorPositionChanged'));
	};

	/**
	 * Returns true if offline app, which isn't a defined thing
	 */
	EditorUi.prototype.isShareCursorPosition = function()
	{
		return this.shareCursorPosition;
	};

	 /**
	  * Returns true if offline app, which isn't a defined thing
	  */
	EditorUi.prototype.setShowRemoteCursors = function(value)
	{
		this.showRemoteCursors = value;

		this.fireEvent(new mxEventObject('showRemoteCursorsChanged'));
	};
 
	/**
	 * Returns true if offline app, which isn't a defined thing
	 */
	EditorUi.prototype.isShowRemoteCursors = function()
	{
		return this.showRemoteCursors;
	};
 
	/**
	 * Returns true if offline app, which isn't a defined thing
	 */
	EditorUi.prototype.setMathEnabled = function(value)
	{
		this.editor.graph.mathEnabled = value;
		this.editor.updateGraphComponents();
		this.editor.graph.refresh();
		this.editor.graph.defaultMathEnabled = value;
		
		this.fireEvent(new mxEventObject('mathEnabledChanged'));
	};

	/**
	 * Returns true if offline app, which isn't a defined thing
	 */
	EditorUi.prototype.isMathEnabled = function(value)
	{
		return this.editor.graph.mathEnabled;
	};

	/**
	 * Returns true if offline app, which isn't a defined thing
	 */
	EditorUi.prototype.isStandaloneApp = function()
	{
		return mxClient.IS_CHROMEAPP || EditorUi.isElectronApp || this.isOfflineApp();
	};

	/**
	 * Returns true if offline app, which isn't a defined thing
	 */
	EditorUi.prototype.isOfflineApp = function()
	{
		return urlParams['offline'] == '1';
	};

	/**
	 * Deprecated. Poorly defined, to be replaced with isExternalDataComms and other more granular flags.
	 * Original idea was it returns true if no external comms allowed or possible
	 */
	EditorUi.prototype.isOffline = function(ignoreStealth)
	{
		return this.isOfflineApp() || !navigator.onLine || (!ignoreStealth && (urlParams['stealth'] == '1' || urlParams['lockdown'] == '1'));
	};

	/**
	 * Returns true if diagram data transmission other than save/load is allowed or possible..
	 */
	EditorUi.prototype.isExternalDataComms = function()
	{
		return urlParams['offline'] != '1' && !this.isOffline() && !this.isOfflineApp();
	};

	/**
	 * Translates this point by the given vector.
	 * 
	 * @param {number} dx X-coordinate of the translation.
	 * @param {number} dy Y-coordinate of the translation.
	 */
	EditorUi.prototype.createSpinner = function(x, y, size)
	{
		var autoPosition = (x == null || y == null);
		size = (size != null) ? size : 24;

		var spinner = new Spinner({
			lines: 12, // The number of lines to draw
			length: size, // The length of each line
			width: Math.round(size / 3), // The line thickness
			radius: Math.round(size / 2), // The radius of the inner circle
			rotate: 0, // The rotation offset
			color: (Editor.isDarkMode()) ? '#c0c0c0' : '#000', // #rgb or #rrggbb
			speed: 1.5, // Rounds per second
			trail: 60, // Afterglow percentage
			shadow: false, // Whether to render a shadow
			hwaccel: false, // Whether to use hardware acceleration
			zIndex: 2e9 // The z-index (defaults to 2000000000)
		});

		// Extends spin method to include an optional label
		var oldSpin = spinner.spin;
		
		spinner.spin = function(container, label)
		{
			var result = false;
			
			if (!this.active)
			{
				oldSpin.call(this, container);
				this.active = true;
				
				if (label != null)
				{
					if (autoPosition)
					{
						y = Math.max(document.body.clientHeight || 0, document.documentElement.clientHeight || 0) / 2;
						x = document.body.clientWidth / 2 - 2;
					}

					var status = document.createElement('div');
					status.style.position = 'absolute';
					status.style.whiteSpace = 'nowrap';
					status.style.background = '#4B4243';
					status.style.color = 'white';
					status.style.fontFamily = Editor.defaultHtmlFont;
					status.style.fontSize = '9pt';
					status.style.padding = '6px';
					status.style.paddingLeft = '10px';
					status.style.paddingRight = '10px';
					status.style.zIndex = 2e9;
					status.style.left = Math.max(0, x) + 'px';
					status.style.top = Math.max(0, y + 70) + 'px';
					
					mxUtils.setPrefixedStyle(status.style, 'borderRadius', '6px');
					mxUtils.setPrefixedStyle(status.style, 'transform', 'translate(-50%,-50%)');

					if (!Editor.isDarkMode())
					{
						mxUtils.setPrefixedStyle(status.style, 'boxShadow', '2px 2px 3px 0px #ddd');
					}
					
					if (label.substring(label.length - 3, label.length) != '...' &&
						label.charAt(label.length - 1) != '!')
					{
						label = label + '...';
					}
					
					status.innerHTML = label;
					container.appendChild(status);
					spinner.status = status;
				}
				
				// Pause returns a function to resume the spinner
				this.pause = mxUtils.bind(this, function()
				{
					var fn = function() { };
					
					if (this.active)
					{
						fn = mxUtils.bind(this, function()
						{
							this.spin(container, label);
						});
					}
					
					this.stop();
					
					return fn;
				});
				
				result = true;
			}
				
			return result;
		};
		
		// Extends stop method to remove the optional label
		var oldStop = spinner.stop;
		
		spinner.stop = function()
		{
			oldStop.call(this);
			this.active = false;
			
			if (spinner.status != null && spinner.status.parentNode != null)
			{
				spinner.status.parentNode.removeChild(spinner.status);
			}

			spinner.status = null;
		};
		
		spinner.pause = function()
		{
			return function() {};
		};
		
		return spinner;
	};

	/**
	 * Returns true if the given string contains a compatible graph model.
	 */
	EditorUi.prototype.isCompatibleString = function(data)
	{
		try
		{
			var doc = mxUtils.parseXml(data);
			var node = this.editor.extractGraphModel(doc.documentElement, true);
			
			return node != null && node.getElementsByTagName('parsererror').length == 0;
		}
		catch (e)
		{
			// ignore
		}
		
		return false;
	};

	/**
	 * Returns true if the given binary data is a Visio file.
	 */
	EditorUi.prototype.isVisioData = function(data)
	{
		return data.length > 8 && ((data.charCodeAt(0) == 0xD0 && data.charCodeAt(1) == 0xCF &&
			data.charCodeAt(2) == 0x11 && data.charCodeAt(3) == 0xE0 && data.charCodeAt(4) == 0xA1 && data.charCodeAt(5) == 0xB1 &&
			data.charCodeAt(6) == 0x1A && data.charCodeAt(7) == 0xE1) || (data.charCodeAt(0) == 0x50 && data.charCodeAt(1) == 0x4B &&
			data.charCodeAt(2) == 0x03 && data.charCodeAt(3) == 0x04) || (data.charCodeAt(0) == 0x50 && data.charCodeAt(1) == 0x4B &&
			data.charCodeAt(2) == 0x03 && data.charCodeAt(3) == 0x06));
	};

	/**
	 * Returns true if the given binary data is a Visio file that requires remote conversion.
	 * This code returns true for vss, vsd and vdx files.
	 */
	EditorUi.prototype.isRemoteVisioData = function(data)
	{
		return data.length > 8 && ((data.charCodeAt(0) == 0xD0 && data.charCodeAt(1) == 0xCF &&
			data.charCodeAt(2) == 0x11 && data.charCodeAt(3) == 0xE0 && data.charCodeAt(4) == 0xA1 && data.charCodeAt(5) == 0xB1 &&
			data.charCodeAt(6) == 0x1A && data.charCodeAt(7) == 0xE1) || (data.charCodeAt(0) == 0x3C && data.charCodeAt(1) == 0x3F &&
			data.charCodeAt(2) == 0x78 && data.charCodeAt(3) == 0x6D && data.charCodeAt(3) == 0x6C));
	};

	/**
	 * Adds keyboard shortcuts for page handling.
	 */
    var editorUiCreateKeyHandler = EditorUi.prototype.createKeyHandler;
    EditorUi.prototype.createKeyHandler = function(editor)
    {
    	var keyHandler = editorUiCreateKeyHandler.apply(this, arguments);
    	
    	if (!this.editor.chromeless || this.editor.editable)
		{
	    	var keyHandlerGetFunction = keyHandler.getFunction;
	    	var graph = this.editor.graph;
	    	var ui = this;
	    	
	    	keyHandler.getFunction = function(evt)
	    	{
	    		if (graph.isSelectionEmpty() && ui.pages != null && ui.pages.length > 0)
	    		{
	    			var idx = ui.getSelectedPageIndex();

	    			if (mxEvent.isShiftDown(evt))
	    			{
		    			if (evt.keyCode == 37)
		    			{
	    					return function()
	    					{
			    				if (idx > 0)
			    				{
		    						ui.movePage(idx, idx - 1);
		    					}
		    				};
		    			}
		    			else if (evt.keyCode == 38)
		    			{
	    					return function()
	    					{
			    				if (idx > 0)
			    				{
		    						ui.movePage(idx, 0);
		    					}
		    				};
		    			}
		    			else if (evt.keyCode == 39)
		    			{
	    					return function()
	    					{
			    				if (idx < ui.pages.length - 1)
			    				{
		    						ui.movePage(idx, idx + 1);
		    					}
		    				};
		    			}
		    			else if (evt.keyCode == 40)
		    			{
	    					return function()
	    					{
			    				if (idx < ui.pages.length - 1)
			    				{
		    						ui.movePage(idx, ui.pages.length - 1);
		    					}
		    				};
		    			}
	    			}
	    			else if (mxEvent.isControlDown(evt) || (mxClient.IS_MAC && mxEvent.isMetaDown(evt)))
					{
	    				if (evt.keyCode == 37)
		    			{
	    					return function()
	    					{
			    				if (idx > 0)
			    				{
		    						ui.selectNextPage(false);
		    					}
		    				};
		    			}
		    			else if (evt.keyCode == 38)
		    			{
	    					return function()
	    					{
			    				if (idx > 0)
			    				{
			    					ui.selectPage(ui.pages[0]);
		    					}
		    				};
		    			}
		    			else if (evt.keyCode == 39)
		    			{
	    					return function()
	    					{
			    				if (idx < ui.pages.length - 1)
			    				{
			    					ui.selectNextPage(true);
		    					}
		    				};
		    			}
		    			else if (evt.keyCode == 40)
		    			{
	    					return function()
	    					{
			    				if (idx < ui.pages.length - 1)
			    				{
			    					ui.selectPage(ui.pages[ui.pages.length - 1]);
		    					}
		    				};
		    			}
					}
	    		}

				// Ignores normal keystrokes as shortcuts if cells are selected (eg. A/S/D/F)
				if (evt.keyCode >= 65 && evt.keyCode <= 90 && !graph.isSelectionEmpty() &&
					!mxEvent.isAltDown(evt) && !mxEvent.isShiftDown(evt) &&
					!mxEvent.isControlDown(evt) && !(mxClient.IS_MAC && mxEvent.isMetaDown(evt)))
				{
					return null;
				}
	    		else
				{
	    			return keyHandlerGetFunction.apply(this, arguments);
				}
	    	};
		}
    	
    	return keyHandler;
    };

	/**
	 * Extracts the mxfile from the given HTML data from a data transfer event.
	 */
	var editorUiExtractGraphModelFromHtml = EditorUi.prototype.extractGraphModelFromHtml;
	EditorUi.prototype.extractGraphModelFromHtml = function(data)
	{
		var result = editorUiExtractGraphModelFromHtml.apply(this, arguments);
		
		if (result == null)
		{
			try
			{
		    	var idx = data.indexOf('&lt;mxfile ');
		    	
		    	if (idx >= 0)
		    	{
		    		var idx2 = data.lastIndexOf('&lt;/mxfile&gt;');
		    		
		    		if (idx2 > idx)
		    		{
		    			result = data.substring(idx, idx2 + 15).replace(/&gt;/g, '>').
		    				replace(/&lt;/g, '<').replace(/\\&quot;/g, '"').replace(/\n/g, '');
		    		}
		    	}
		    	else
		    	{
		    		// Gets compressed data from mxgraph element in HTML document
					var doc = mxUtils.parseXml(data);
					var node = this.editor.extractGraphModel(doc.documentElement, this.pages != null ||
						this.diagramContainer.style.visibility == 'hidden');
					result = (node != null) ? mxUtils.getXml(node) : '';
		    	}
			}
			catch (e)
			{
				// ignore
			}
		}
		
		return result;
	};
		
	/**
	 * Workaround for malformed xhtml meta element bug 07.08.16. The trailing slash was missing causing
	 * reopen to fail trying to parse. Used in replaceFileData, setFileData and importFile.
	 */
	EditorUi.prototype.validateFileData = function(data)
	{
		if (data != null && data.length > 0)
		{
			var index = data.indexOf('<meta charset="utf-8">');
			
			if (index >= 0)
			{
				var replaceString = '<meta charset="utf-8"/>';
				var replaceStrLen = replaceString.length;
				data = data.slice(0, index) + replaceString + data.slice(index + replaceStrLen - 1, data.length);
			}
			
			data = Graph.zapGremlins(data);
		}
		
		return data;
	};
	
	/**
	 * 
	 */
	EditorUi.prototype.replaceFileData = function(data)
	{
		data = this.validateFileData(data);
		var node = (data != null && data.length > 0) ? mxUtils.parseXml(data).documentElement : null;

		// Some nodes must be extracted here to find the mxfile node
		// LATER: Remove duplicate call to extractGraphModel in overridden setGraphXml
		var tmp = (node != null) ? this.editor.extractGraphModel(node, true) : null;
		
		if (tmp != null)
		{
			node = tmp;
		}

		if (node != null)
		{
			var graph = this.editor.graph;
			
			graph.model.beginUpdate();
			try
			{
				var oldPages = (this.pages != null) ? this.pages.slice() : null;
				var nodes = node.getElementsByTagName('diagram');

				if (nodes.length > 1 || (nodes.length == 1 && nodes[0].hasAttribute('name')))
				{
					this.fileNode = node;
					this.pages = (this.pages != null) ? this.pages : [];
					
					// Wraps page nodes
					for (var i = nodes.length - 1; i >= 0; i--)
					{
						var page = this.updatePageRoot(new DiagramPage(nodes[i]));
						
						// Checks for invalid page names
						if (page.getName() == null)
						{
							page.setName(mxResources.get('pageWithNumber', [i + 1]));
						}

						graph.model.execute(new ChangePage(this, page, (i == 0) ? page : null, 0));
					}
				}
				else
				{
					// Creates tabbed file structure if enforced by URL
					if (this.fileNode == null)
					{
						this.fileNode = node.ownerDocument.createElement('mxfile');
						this.currentPage = new DiagramPage(node.ownerDocument.createElement('diagram'));
						this.currentPage.setName(mxResources.get('pageWithNumber', [1]));
						graph.model.execute(new ChangePage(this, this.currentPage, this.currentPage, 0));
					}
					
					// Avoids scroll offset when switching page
					this.editor.setGraphXml(node);
					
					// Avoids duplicate parsing of the XML stored in the node
					if (this.currentPage != null)
					{
						this.currentPage.root = this.editor.graph.model.root;
						graph.model.execute(new ChangePage(this, this.currentPage, this.currentPage, 0));
					}
				}
				
				// Removes old pages
				if (oldPages != null)
				{
					for (var i = 0; i < oldPages.length; i++)
					{
						graph.model.execute(new ChangePage(this, oldPages[i], null));
					}
				}
			}
			finally
			{
				graph.model.endUpdate();
			}
		}
	};
	
	/**
	 * Translates this point by the given vector.
	 * 
	 * @param {number} dx X-coordinate of the translation.
	 * @param {number} dy Y-coordinate of the translation.
	 */
	EditorUi.prototype.createFileData = function(node, graph, file, url, forceXml, forceSvg, forceHtml,
		embeddedCallback, ignoreSelection, compact, uncompressed)
	{
		graph = (graph != null) ? graph : this.editor.graph;
		forceXml = (forceXml != null) ? forceXml : false;
		ignoreSelection = (ignoreSelection != null) ? ignoreSelection : true;
		uncompressed = (uncompressed != null) ? uncompressed : !Editor.defaultCompressed;
		
		var editLink = null;
		var redirect = null;
		
		if (file == null || file.getMode() == App.MODE_DEVICE || file.getMode() == App.MODE_BROWSER)
		{
			editLink = '_blank';
		}
		else
		{
			editLink = url;
			redirect = editLink;
		}

		if (node == null)
		{
			return '';
		}
		else
		{
			var fileNode = node;
	
			// Ignores case for possible HTML or XML nodes
			if (fileNode.nodeName.toLowerCase() != 'mxfile')
			{
				if (uncompressed)
				{
					var diagramNode = node.ownerDocument.createElement('diagram');
					diagramNode.setAttribute('name', mxResources.get('pageWithNumber', [1]));
					diagramNode.setAttribute('id', Editor.guid());
					diagramNode.appendChild(node);
					
					fileNode = node.ownerDocument.createElement('mxfile');
					fileNode.appendChild(diagramNode);
				}
				else
				{
					// Removes control chars in input for correct roundtrip check
					var text = Graph.zapGremlins(mxUtils.getXml(node));
					var data = Graph.compress(text);
					
					// Fallback to plain XML for invalid compression
					// TODO: Remove this fallback with active pages
					if (Graph.decompress(data) != text)
					{
						return text;
					}
					else
					{
						var diagramNode = node.ownerDocument.createElement('diagram');
						diagramNode.setAttribute('name', mxResources.get('pageWithNumber', [1]));
						diagramNode.setAttribute('id', Editor.guid());
						mxUtils.setTextContent(diagramNode, data);
						
						fileNode = node.ownerDocument.createElement('mxfile');
						fileNode.appendChild(diagramNode);
					}
				}
			}
			
			if (!compact)
			{
				// Removes old metadata
				fileNode.removeAttribute('userAgent');
				fileNode.removeAttribute('version');
				fileNode.removeAttribute('editor');
				fileNode.removeAttribute('pages');
				fileNode.removeAttribute('type');
				
				if (mxClient.IS_CHROMEAPP)
				{
					fileNode.setAttribute('host', 'Chrome');
				}
				else if (EditorUi.isElectronApp)
				{
					fileNode.setAttribute('host', 'Electron');
				}
				else
				{
					fileNode.setAttribute('host', window.location.hostname);
				}
				
				// Adds new metadata
				fileNode.setAttribute('modified', new Date().toISOString());
				fileNode.setAttribute('agent', (navigator.userAgent != null) ?
					navigator.userAgent : navigator.appVersion);
				fileNode.setAttribute('version', EditorUi.VERSION);
				fileNode.setAttribute('etag', Editor.guid());
				
				var md = (file != null) ? file.getMode() : this.mode;
				
				if (md != null)
				{
					fileNode.setAttribute('type', md);
				}
				
				if (fileNode.getElementsByTagName('diagram').length > 1 && this.pages != null)
				{
					fileNode.setAttribute('pages', this.pages.length);
				}
			}
			else
			{
				fileNode = fileNode.cloneNode(true);
				fileNode.removeAttribute('modified');
				fileNode.removeAttribute('host');
				fileNode.removeAttribute('agent');
				fileNode.removeAttribute('etag');
				fileNode.removeAttribute('userAgent');
				fileNode.removeAttribute('version');
				fileNode.removeAttribute('editor');
				fileNode.removeAttribute('type');
			}

			var xml = (uncompressed) ? mxUtils.getPrettyXml(fileNode) : mxUtils.getXml(fileNode);
			
			// Writes the file as an embedded HTML file
			if (!forceSvg && !forceXml && (forceHtml || (file != null && /(\.html)$/i.test(file.getTitle()))))
			{
				xml = this.getHtml2(mxUtils.getXml(fileNode), graph, (file != null) ? file.getTitle() : null, editLink, redirect);
			}
			// Maps the XML data to the content attribute in the SVG node 
			else if (forceSvg || (!forceXml && file != null && /(\.svg)$/i.test(file.getTitle())))
			{
				if (file != null && (file.getMode() == App.MODE_DEVICE || file.getMode() == App.MODE_BROWSER))
				{
					url = null;
				}

				var props = this.getSvgFileProperties(fileNode);
				
				xml = this.getEmbeddedSvg(xml, graph, url, null, embeddedCallback,
					ignoreSelection, redirect, null, null, props.scale, props.border);
			}
			
			return xml;
		}
	};
	
	/**
	 * Translates this point by the given vector.
	 * 
	 * @param {number} dx X-coordinate of the translation.
	 * @param {number} dy Y-coordinate of the translation.
	 */
	EditorUi.prototype.getXmlFileData = function(ignoreSelection, currentPage, uncompressed, resolveReferences)
	{
		ignoreSelection = (ignoreSelection != null) ? ignoreSelection : true;
		currentPage = (currentPage != null) ? currentPage : false;
		uncompressed = (uncompressed != null) ? uncompressed : !Editor.defaultCompressed;
		
		// Generats graph model XML node for single page export
		var node = this.editor.getGraphXml(ignoreSelection, resolveReferences);
		
		if (ignoreSelection && this.fileNode != null && this.currentPage != null)
		{
			// Updates current page XML if selection is ignored
			EditorUi.removeChildNodes(this.currentPage.node);
			mxUtils.setTextContent(this.currentPage.node, Graph.compressNode(node));

			// Creates a clone of the file node for processing
			node = this.fileNode.cloneNode(false);

			// Appends the node of the page and applies compression
			function appendPage(pageNode)
			{
				var models = pageNode.getElementsByTagName('mxGraphModel');
				var modelNode = (models.length > 0) ? models[0] : null;
				var clone = pageNode;
				
				if (modelNode == null && uncompressed)
				{
					var text = mxUtils.trim(mxUtils.getTextContent(pageNode));
					clone = pageNode.cloneNode(false);
					
					if (text.length > 0)
					{
						var tmp = Graph.decompress(text);
						
						if (tmp != null && tmp.length > 0)
						{
							clone.appendChild(mxUtils.parseXml(tmp).documentElement);
						}
					}
				}
				else if (modelNode != null && !uncompressed)
				{
					clone = pageNode.cloneNode(false);
					mxUtils.setTextContent(clone, Graph.compressNode(modelNode));
				}
				else
				{
					clone = pageNode.cloneNode(true);
				}
				
				node.appendChild(clone);
			};

			if (currentPage)
			{
				appendPage(this.currentPage.node);
			}
			else
			{
				// Restores order of pages
				for (var i = 0; i < this.pages.length; i++)
				{
					var page = this.pages[i];
					var currNode = page.node;

					if (page != this.currentPage)
					{
						if (page.needsUpdate)
						{
							var enc = new mxCodec(mxUtils.createXmlDocument());
							var temp = enc.encode(new mxGraphModel(page.root));
							this.editor.graph.saveViewState(page.viewState,
								temp, null, resolveReferences);
							EditorUi.removeChildNodes(currNode);
							mxUtils.setTextContent(currNode, Graph.compressNode(temp));

							// Marks the page as up-to-date
							delete page.needsUpdate;
						}
						else if (resolveReferences)
						{
							this.updatePageRoot(page);

							// Forces update of background page image in offscreen page
							if (page.viewState.backgroundImage != null)
							{
								if (page.viewState.backgroundImage.originalSrc != null)
								{
									page.viewState.backgroundImage = this.createImageForPageLink(
										page.viewState.backgroundImage.originalSrc, page);
								}
								else if (Graph.isPageLink(page.viewState.backgroundImage.src))
								{
									page.viewState.backgroundImage = this.createImageForPageLink(
										page.viewState.backgroundImage.src, page);
								}
							}

							// Updates the page node
							if (page.viewState.backgroundImage != null &&
								page.viewState.backgroundImage.originalSrc != null)
							{
								var enc = new mxCodec(mxUtils.createXmlDocument());
								var temp = enc.encode(new mxGraphModel(page.root));
								this.editor.graph.saveViewState(page.viewState,
									temp, null, resolveReferences);
								currNode = currNode.cloneNode(false);
								mxUtils.setTextContent(currNode, Graph.compressNode(temp));
							}
						}
					}
					
					appendPage(currNode);
				}
			}
		}
		
		return node;
	};
	
	/**
	 * Removes any values, styles and geometries from the given XML node.
	 */
	EditorUi.prototype.anonymizeString = function(text, zeros)
	{
		var result = [];
		
		for (var i = 0; i < text.length; i++)
		{
			var c = text.charAt(i);
			
			if (EditorUi.ignoredAnonymizedChars.indexOf(c) >= 0)
			{
				result.push(c);
			}
			else if (!isNaN(parseInt(c)))
			{
				result.push((zeros) ? '0' : Math.round(Math.random() * 9));
			}
			else if (c.toLowerCase() != c)
			{
				result.push(String.fromCharCode(65 + Math.round(Math.random() * 25)));
			}
			else if (c.toUpperCase() != c)
			{
				result.push(String.fromCharCode(97 + Math.round(Math.random() * 25)));
			}
			else if (/\s/.test(c))
			{
				/* any whitespace */
				result.push(' ');
			}
			else
			{
				result.push('?');
			}
		}
		
		return result.join('');
	};
	
	/**
	 * Removes any values, styles and geometries from the given XML node.
	 */
	EditorUi.prototype.anonymizePatch = function(patch)
	{
		if (patch[EditorUi.DIFF_INSERT] != null)
		{
			for (var i = 0; i < patch[EditorUi.DIFF_INSERT].length; i++)
			{
				try
				{
					var data = patch[EditorUi.DIFF_INSERT][i].data;
					var doc = mxUtils.parseXml(data);
					var clone = doc.documentElement.cloneNode(false);
					
					if (clone.getAttribute('name') != null)
					{
						clone.setAttribute('name', this.anonymizeString(clone.getAttribute('name')));
					}
					
					patch[EditorUi.DIFF_INSERT][i].data = mxUtils.getXml(clone);
				}
				catch (e)
				{
					patch[EditorUi.DIFF_INSERT][i].data = e.message;
				}
			}
		}
		
		if (patch[EditorUi.DIFF_UPDATE] != null)
		{
			for (var pageId in patch[EditorUi.DIFF_UPDATE])
			{
				var diff = patch[EditorUi.DIFF_UPDATE][pageId];
				
				if (diff.name != null)
				{
					diff.name = this.anonymizeString(diff.name);
				}
				
				if (diff.cells != null)
				{
					var anonymizeCellDiffs = mxUtils.bind(this, function(key)
					{
						var cellDiffs = diff.cells[key];
						
						if (cellDiffs != null)
						{
							for (var cellId in cellDiffs)
							{
								if (cellDiffs[cellId].value != null)
								{
									cellDiffs[cellId].value = '[' +
										cellDiffs[cellId].value.length + ']';
								}

								if (cellDiffs[cellId].xmlValue != null)
								{
									cellDiffs[cellId].xmlValue = '[' +
										cellDiffs[cellId].xmlValue.length + ']';
								}
								
								if (cellDiffs[cellId].style != null)
								{
									cellDiffs[cellId].style = '[' +
										cellDiffs[cellId].style.length + ']';
								}
								
								if (mxUtils.isEmptyObject(cellDiffs[cellId]))
								{
									delete cellDiffs[cellId];
								}
							}
							
							if (mxUtils.isEmptyObject(cellDiffs))
							{
								delete diff.cells[key];
							}
						}
					});
					
					anonymizeCellDiffs(EditorUi.DIFF_INSERT);
					anonymizeCellDiffs(EditorUi.DIFF_UPDATE);
					
					if (mxUtils.isEmptyObject(diff.cells))
					{
						delete diff.cells;
					}
				}
	
				if (mxUtils.isEmptyObject(diff))
				{
					delete patch[EditorUi.DIFF_UPDATE][pageId];
				}
			}
			
			if (mxUtils.isEmptyObject(patch[EditorUi.DIFF_UPDATE]))
			{
				delete patch[EditorUi.DIFF_UPDATE];
			}
		}
			
		return patch;
	};

	/**
	 * Removes any values, styles and geometries from the given XML node.
	 */
	EditorUi.prototype.anonymizeAttributes = function(node, zeros)
	{
		if (node.attributes != null)
		{
			for (var i = 0; i < node.attributes.length; i++)
			{
				if (node.attributes[i].name != 'as')
				{
					node.setAttribute(node.attributes[i].name,
						this.anonymizeString(node.attributes[i].value, zeros));
				}
			}
		}
		
		if (node.childNodes != null)
		{
			for (var i = 0; i < node.childNodes.length; i++)
			{
				this.anonymizeAttributes(node.childNodes[i], zeros);
			}
		}
	};
	
	/**
	 * Removes any values, styles and geometries from the given XML node.
	 */
	EditorUi.prototype.anonymizeNode = function(node, zeros)
	{
		var nodes = node.getElementsByTagName('mxCell');
		
		for (var i = 0; i < nodes.length; i++)
		{
			if (nodes[i].getAttribute('value') != null)
			{
				nodes[i].setAttribute('value', '[' + nodes[i].getAttribute('value').length + ']');
			}

			if (nodes[i].getAttribute('xmlValue') != null)
			{
				nodes[i].setAttribute('xmlValue', '[' + nodes[i].getAttribute('xmlValue').length + ']');
			}
			
			if (nodes[i].getAttribute('style') != null)
			{
				nodes[i].setAttribute('style', '[' + nodes[i].getAttribute('style').length + ']');
			}
			
			if (nodes[i].parentNode != null && nodes[i].parentNode.nodeName != 'root' &&
				nodes[i].parentNode.parentNode != null)
			{
				nodes[i].setAttribute('id', nodes[i].parentNode.getAttribute('id'));
				nodes[i].parentNode.parentNode.replaceChild(nodes[i], nodes[i].parentNode);
			}
		}
		
		return node;
	};

	/**
	 * Translates this point by the given vector.
	 * 
	 * @param {number} dx X-coordinate of the translation.
	 * @param {number} dy Y-coordinate of the translation.
	 */
	EditorUi.prototype.synchronizeCurrentFile = function(forceReload)
	{
		var currentFile = this.getCurrentFile();
		
		if (currentFile != null)
		{
			if (currentFile.savingFile)
			{
				this.handleError({message: mxResources.get('busy')});
			}
			else if (!forceReload && currentFile.invalidChecksum)
			{
				currentFile.handleFileError(null, true);
			}
			else if (this.spinner.spin(document.body, mxResources.get('updatingDocument')))
			{
				currentFile.clearAutosave();
				this.editor.setStatus('');
				
				if (forceReload)
				{
					currentFile.reloadFile(mxUtils.bind(this, function()
					{
						currentFile.handleFileSuccess(DrawioFile.SYNC == 'manual');
					}), mxUtils.bind(this, function(err)
					{
						currentFile.handleFileError(err, true);
					}));
				}
				else
				{
					currentFile.synchronizeFile(mxUtils.bind(this, function()
					{
						currentFile.handleFileSuccess(DrawioFile.SYNC == 'manual');
					}), mxUtils.bind(this, function(err)
					{
						currentFile.handleFileError(err, true);
					}));
				}
			}
		}
	};
	
	/**
	 * Translates this point by the given vector.
	 * 
	 * @param {number} dx X-coordinate of the translation.
	 * @param {number} dy Y-coordinate of the translation.
	 */
	EditorUi.prototype.getFileData = function(forceXml, forceSvg, forceHtml, embeddedCallback,
		ignoreSelection, currentPage, node, compact, file, uncompressed, resolveReferences)
	{
		ignoreSelection = (ignoreSelection != null) ? ignoreSelection : true;
		currentPage = (currentPage != null) ? currentPage : false;
		uncompressed = (uncompressed != null) ? uncompressed : !Editor.defaultCompressed;
		var graph = this.editor.graph;
		
		// Forces compression of embedded XML
		if (forceSvg || (!forceXml && file != null && /(\.svg)$/i.test(file.getTitle())))
		{
			var darkTheme = graph.themes != null && graph.defaultThemeName == 'darkTheme';

			// Exports SVG for first page while other page is visible by creating a graph
			// LATER: Add caching for the graph or SVG while not on first page
			// Dark mode requires a refresh that would destroy all handlers
			// LATER: Use dark theme here to bypass refresh
			if (darkTheme || (this.pages != null && this.currentPage != this.pages[0]))
			{
				var graphGetGlobalVariable = graph.getGlobalVariable;
				graph = this.createTemporaryGraph(darkTheme ?
					graph.getDefaultStylesheet() :
					graph.getStylesheet());
				graph.setBackgroundImage = this.editor.graph.setBackgroundImage;
				graph.background = this.editor.graph.background;
				var page = (this.pages != null) ? this.pages[0] : null;;

				if (page == null || this.currentPage == page)
				{
					graph.setBackgroundImage(this.editor.graph.backgroundImage);	
				}
				else if (page.viewState != null && page.viewState != null)
				{
					graph.setBackgroundImage(page.viewState.backgroundImage);
				}

				graph.getGlobalVariable = function(name)
				{
					if (name == 'page' && page != null)
					{
						return page.getName();
					}
					else if (name == 'pagenumber')
					{
						return 1;
					}
					
					return graphGetGlobalVariable.apply(this, arguments);
				};
		
				document.body.appendChild(graph.container);

				if (page != null)
				{
					graph.model.setRoot(page.root);
				}
			}
		}

		node = (node != null) ? node : this.getXmlFileData(ignoreSelection,
			currentPage, uncompressed, resolveReferences);
		file = (file != null) ? file : this.getCurrentFile();

		var result = this.createFileData(node, graph, file, window.location.href,
			forceXml, forceSvg, forceHtml, embeddedCallback, ignoreSelection, compact,
			uncompressed);
		
		// Removes temporary graph from DOM
		if (graph != this.editor.graph)
		{
			graph.container.parentNode.removeChild(graph.container);
		}
		
		return result;
	};
	
	/**
	 * 
	 */
	EditorUi.prototype.getHtml = function(node, graph, title, editLink, redirect, ignoreSelection)
	{
		ignoreSelection = (ignoreSelection != null) ? ignoreSelection : true;
		var bg = null;
		var js = EditorUi.drawHost + '/js/embed-static.min.js';
	
		// LATER: Merge common code with EmbedDialog
		if (graph != null)
		{
			var bounds = (ignoreSelection) ? graph.getGraphBounds() :
				graph.getBoundingBox(graph.getSelectionCells());
			var scale = graph.view.scale;
			var x0 = Math.floor(bounds.x / scale - graph.view.translate.x);
			var y0 = Math.floor(bounds.y / scale - graph.view.translate.y);
			bg = graph.background;
	
			// Embed script only used if no redirect
			if (redirect == null)
			{
				var s = this.getBasenames().join(';');
	
				if (s.length > 0)
				{
					js = EditorUi.drawHost + '/embed.js?s=' + s;
				}
			}
			
			// Adds embed attributes
			node.setAttribute('x0', x0);
			node.setAttribute('y0', y0);
		}
		
		if (node != null)
		{
			node.setAttribute('pan', '1');
			node.setAttribute('zoom', '1');
			node.setAttribute('resize', '0');
			node.setAttribute('fit', '0');
			node.setAttribute('border', '20');
			
			// Hidden attributes
			node.setAttribute('links', '1');
			
			if (editLink != null)
			{
				node.setAttribute('edit', editLink);
			}
		}
		
		// Makes XHTML compatible
		if (redirect != null)
		{
			redirect = redirect.replace(/&/g, '&amp;');
		}
	
		// Removes control chars in input for correct roundtrip check
		var text = (node != null) ? Graph.zapGremlins(mxUtils.getXml(node)) : '';
		
		// Double compression for mxfile not fixed since it may cause imcompatibilites with
		// embed clients that rely on this format. HTML files and export use getHtml2.
		var data = Graph.compress(text);
		
		// Fallback to URI encoded XML for invalid compression
		if (Graph.decompress(data) != text)
		{
			data = encodeURIComponent(text);
		}
		
		var style = 'position:relative;overflow:auto;width:100%;';
	
		return ((redirect == null) ? '<!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=5,IE=9" ><![endif]-->\n' : '') +
			'<!DOCTYPE html>\n<html' + ((redirect != null) ? ' xmlns="http://www.w3.org/1999/xhtml">' : '>') +
			'\n<head>\n' + ((redirect == null) ? ((title != null) ? '<title>' + mxUtils.htmlEntities(title) +
				'</title>\n' : '') : '<title>draw.io</title>\n') +
			((redirect != null) ? '<meta http-equiv="refresh" content="0;URL=\'' + redirect + '\'"/>\n' : '') +
			'</head>\n<body' +
			(((redirect == null && bg != null && bg != mxConstants.NONE) ? ' style="background-color:' + bg + ';">' : '>')) +
			'\n<div class="mxgraph" style="' + style + '">\n' +
			'<div style="width:1px;height:1px;overflow:hidden;">' + data + '</div>\n</div>\n' +
			((redirect == null) ? '<script type="text/javascript" src="' + js + '"></script>' :
			'<a style="position:absolute;top:50%;left:50%;margin-top:-128px;margin-left:-64px;" ' +
			'href="' + redirect + '" target="_blank"><img border="0" ' +
			'src="' + EditorUi.drawHost + '/images/drawlogo128.png"/></a>') +
			'\n</body>\n</html>\n';
	};
	
	/**
	 * Same as above but using the new embed code.
	 */
	EditorUi.prototype.getHtml2 = function(xml, graph, title, editLink, redirect)
	{
		var js = window.DRAWIO_VIEWER_URL || EditorUi.drawHost + '/js/viewer-static.min.js';
	
		// Makes XHTML compatible
		if (redirect != null)
		{
			redirect = redirect.replace(/&/g, '&amp;');
		}
		
		var data = {highlight: '#0000ff', nav: this.editor.graph.foldingEnabled, resize: true,
			xml: Graph.zapGremlins(xml), toolbar: 'pages zoom layers lightbox'};
		
		if (this.pages != null && this.currentPage != null)
		{
			data.page = mxUtils.indexOf(this.pages, this.currentPage);
		}
	
		var style = 'max-width:100%;border:1px solid transparent;';
	
		return ((redirect == null) ? '<!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=5,IE=9" ><![endif]-->\n' : '') +
			'<!DOCTYPE html>\n<html' + ((redirect != null) ? ' xmlns="http://www.w3.org/1999/xhtml">' : '>') +
			'\n<head>\n' + ((redirect == null) ? ((title != null) ? '<title>' + mxUtils.htmlEntities(title) +
				'</title>\n' : '') : '<title>draw.io</title>\n') +
			((redirect != null) ? '<meta http-equiv="refresh" content="0;URL=\'' + redirect + '\'"/>\n' : '') +
			'<meta charset="utf-8"/>\n</head>\n<body>' +
			'\n<div class="mxgraph" style="' + style + '" data-mxgraph="' + mxUtils.htmlEntities(JSON.stringify(data)) + '"></div>\n' +
			((redirect == null) ? '<script type="text/javascript" src="' + js + '"></script>' :
			'<a style="position:absolute;top:50%;left:50%;margin-top:-128px;margin-left:-64px;" ' +
			'href="' + redirect + '" target="_blank"><img border="0" ' +
			'src="' + EditorUi.drawHost + '/images/drawlogo128.png"/></a>') +
			'\n</body>\n</html>\n';
	};

	/**
	 * 
	 */
	EditorUi.prototype.setFileData = function(data)
	{
		data = this.validateFileData(data);
		this.currentPage = null;
		this.fileNode = null;
		this.pages = null;

		var node = (data != null && data.length > 0) ? mxUtils.parseXml(data).documentElement : null;
		
		// Checks for parser errors
		var cause = Editor.extractParserError(node, mxResources.get('invalidOrMissingFile'));
		
		if (cause)
		{
			EditorUi.debug('EditorUi.setFileData ParserError', [this],
				'data', [data], 'node', [node], 'cause', [cause]);

			throw new Error(mxResources.get('notADiagramFile') + ' (' + cause + ')');
		}
		else
		{
			// Some nodes must be extracted here to find the mxfile node
			// LATER: Remove duplicate call to extractGraphModel in overridden setGraphXml
			var tmp = (node != null) ? this.editor.extractGraphModel(node, true) : null;
			
			if (tmp != null)
			{
				node = tmp;
			}

			if (node != null && node.nodeName == 'mxfile')
			{
				var nodes = node.getElementsByTagName('diagram');

				if (nodes.length > 0)
				{
					var hashObj = this.getHashObject();
					var selectedPage = null;
					this.fileNode = node;
					this.pages = [];
					
					// Wraps page nodes
					for (var i = 0; i < nodes.length; i++)
					{
						// Adds page ID based on page order to match
						// remote IDs given if IDs are missing here
						if (nodes[i].getAttribute('id') == null)
						{
							nodes[i].setAttribute('id', i);
						}
						
						var page = new DiagramPage(nodes[i]);
						
						// Checks for invalid page names
						if (page.getName() == null)
						{
							page.setName(mxResources.get('pageWithNumber', [i + 1]));
						}
						
						this.pages.push(page);
						
						if ((hashObj.pageId == null && urlParams['page-id'] != null &&
								page.getId() == urlParams['page-id']) ||
							(hashObj.pageId != null && page.getId() == hashObj.pageId))
						{
							selectedPage = page;
						}
					}
					
					this.currentPage = (selectedPage != null) ? selectedPage :
						this.pages[Math.max(0, Math.min(this.pages.length - 1, urlParams['page'] || 0))];
					node = this.currentPage.node;
				}
			}
			
			// Creates tabbed file structure if enforced by URL
			if (this.fileNode == null && node != null)
			{
				this.fileNode = node.ownerDocument.createElement('mxfile');
				this.currentPage = new DiagramPage(node.ownerDocument.createElement('diagram'));
				this.currentPage.setName(mxResources.get('pageWithNumber', [1]));
		 	 	this.pages = [this.currentPage];
			}
			
			// Avoids scroll offset when switching page
			this.editor.setGraphXml(node);
			
			// Avoids duplicate parsing of the XML stored in the node
			if (this.currentPage != null)
			{
				this.currentPage.root = this.editor.graph.model.root;
				
				// Scrolls to current page
				this.scrollToPage();				
			}
			
			if (urlParams['layer-ids'] != null)
			{
				try
				{
					var layerIds = urlParams['layer-ids'].split(' ');
					var layerIdsMap = {};
					
					for (var i = 0; i < layerIds.length; i++)
					{
						layerIdsMap[layerIds[i]] = true;
					}
					
					var model = this.editor.graph.getModel();
					var children = model.getChildren(model.root);
					
					// handle layers visibility
					for (var i = 0; i < children.length; i++)
					{
						var child = children[i];
						model.setVisible(child, layerIdsMap[child.id] || false);
					}
				}
				catch(e){} //ignore
			}
		}
	};

	/**
	 * Translates this point by the given vector.
	 * 
	 * @param {number} dx X-coordinate of the translation.
	 * @param {number} dy Y-coordinate of the translation.
	 */
	EditorUi.prototype.getBaseFilename = function(ignorePageName)
	{
		var file = this.getCurrentFile();
		var basename = (file != null && file.getTitle() != null) ? file.getTitle() : this.defaultFilename;
		
		if (/(\.xml)$/i.test(basename) || /(\.html)$/i.test(basename) ||
			/(\.svg)$/i.test(basename) || /(\.png)$/i.test(basename))
		{
			basename = basename.substring(0, basename.lastIndexOf('.'));
		}
		
		if (/(\.drawio)$/i.test(basename))
		{
			basename = basename.substring(0, basename.lastIndexOf('.'));
		}

		if (!ignorePageName && this.pages != null && this.pages.length > 1 &&
			this.currentPage != null && this.currentPage.node.getAttribute('name') != null &&
			this.currentPage.getName().length > 0)
		{
			basename = basename + '-' + this.currentPage.getName();
		}
		
		return basename;
	};
	
	/**
	 * Translates this point by the given vector.
	 * 
	 * @param {number} dx X-coordinate of the translation.
	 * @param {number} dy Y-coordinate of the translation.
	 */
	EditorUi.prototype.downloadFile = function(format, uncompressed, addShadow, ignoreSelection,
		currentPage, pageVisible, transparent, scale, border, grid, includeXml, pageRange)
	{
		try
		{
			ignoreSelection = (ignoreSelection != null) ? ignoreSelection : this.editor.graph.isSelectionEmpty();
			var basename = this.getBaseFilename(format == 'remoteSvg'? false : !currentPage);
			var filename = basename + ((format == 'xml' || (format == 'pdf' &&
				includeXml)) ? '.drawio' : '') + '.' + format;
			
			if (format == 'xml')
			{
		    	var data = Graph.xmlDeclaration +'\n' +
		    		this.getFileData(true, null, null, null, ignoreSelection, currentPage,
		    			null, null, null, uncompressed);
		    	
		    	this.saveData(filename, format, data, 'text/xml');
			}
		    else if (format == 'html')
		    {
		    	var data = this.getHtml2(this.getFileData(true), this.editor.graph, basename);
		    	this.saveData(filename, format, data, 'text/html');
		    }
		    else if ((format == 'svg' || format == 'xmlsvg') && this.spinner.spin(document.body, mxResources.get('export')))
		    {
		    	var svg = null;
		    	
		    	var saveSvg = mxUtils.bind(this, function(data)
		    	{
		    		if (data.length <= MAX_REQUEST_SIZE)
		    		{
		    	    	this.saveData(filename, 'svg', data, 'image/svg+xml');
		    		}
		    		else
		    		{
		    			this.handleError({message: mxResources.get('drawingTooLarge')}, mxResources.get('error'), mxUtils.bind(this, function()
		    			{
		    				mxUtils.popup(svg);
		    			}));
		    		}
		    	});
		    	
		    	if (format == 'svg')
		    	{
		        	var bg = this.editor.graph.background;
		        	
		        	if (transparent || bg == mxConstants.NONE)
		        	{
		        		bg = null;
		        	}
		
		        	// Sets or disables alternate text for foreignObjects. Disabling is needed
		        	// because PhantomJS seems to ignore switch statements and paint all text.
		        	var svgRoot = this.editor.graph.getSvg(bg, null, null, null, null, ignoreSelection);
					
					if (addShadow)
					{
						this.editor.graph.addSvgShadow(svgRoot);
					}
					
					// Embeds the images in the SVG output (async)
					this.editor.convertImages(svgRoot, mxUtils.bind(this, mxUtils.bind(this, function(svgRoot2)
					{
						this.spinner.stop();
						
						saveSvg(Graph.xmlDeclaration + '\n' + Graph.svgDoctype + '\n' + mxUtils.getXml(svgRoot2));
					})));
		    	}
		    	else
		    	{
		    		filename = basename + '.svg';
		    		
		    		svg = this.getFileData(false, true, null, mxUtils.bind(this, function(svg)
		    		{
		    			this.spinner.stop();
		        		saveSvg(svg);
		    		}), ignoreSelection);
		    	}
		    }
			else
			{
				var w, h;

				if (format == 'xmlpng')
				{
					filename = basename + '.png';
				}
				else if (format == 'jpeg')
				{
					filename = basename + '.jpg';
				}
				else if (format == 'remoteSvg')
				{
					filename = basename + '.svg';
					format = 'svg';
					var b = parseInt(border);

					if (typeof scale === 'string' && scale.indexOf('%') > 0)
					{
						scale = parseInt(scale) / 100;
					}

					if (b > 0)
					{
						var graph = this.editor.graph;
						var bounds = graph.getGraphBounds();
						w = Math.ceil(bounds.width * scale / graph.view.scale + 2 * b);
						h = Math.ceil(bounds.height * scale / graph.view.scale + 2 * b);
					}
				}
				
				this.saveRequest(filename, format, mxUtils.bind(this, function(newTitle, base64)
				{
					try
					{
						var prev = this.editor.graph.pageVisible;
						
						//Only override if page is actually visible
						if (pageVisible == false)
						{
							this.editor.graph.pageVisible = pageVisible;
						}
						
						var req = this.createDownloadRequest(newTitle, format, ignoreSelection, base64,
							transparent, currentPage, scale, border, grid, includeXml, pageRange, w, h);
						this.editor.graph.pageVisible = prev;
						
						return req;
					}
					catch (e)
					{
						this.handleError(e);
					}
				}));
			}
		}
		catch (e)
		{
			this.handleError(e);
		}
	};
	
	// Note: Remember to adjust ElectronApp override when this function is modified
	EditorUi.prototype.createDownloadRequest = function(filename, format, ignoreSelection,
		base64, transparent, currentPage, scale, border, grid, includeXml, pageRange, w, h)
	{
		var params = this.downloadRequestBuilder(filename, format, ignoreSelection, base64,
			transparent, currentPage, scale, border, grid, includeXml, pageRange, w, h);

		var paramsStr = '';

		for (var p in params)
		{
			var val = params[p];

			if (val != null)
			{
				paramsStr += p + '=' + encodeURIComponent(val) + '&';
			}
		}

		return new mxXmlRequest(EXPORT_URL, paramsStr);
	};

	/**
	 * Translates this point by the given vector.
	 * 
	 * @param {number} dx X-coordinate of the translation.
	 * @param {number} dy Y-coordinate of the translation.
	 */
	EditorUi.prototype.downloadRequestBuilder = function(filename, format, ignoreSelection,
		base64, transparent, currentPage, scale, border, grid, includeXml, pageRange, w, h)
	{
		var graph = this.editor.graph;
		var bounds = graph.getGraphBounds();
		
		// Exports only current page for images that does not contain file data, but for
		// the other formats with XML included or pdf with all pages, we need to send the complete data and use
		// the from/to URL parameters to specify the page to be exported.
		var data = this.getFileData(true, null, null, null, ignoreSelection,
			currentPage == false ? false : format != 'xmlpng', null, null,
			null, !Editor.defaultCompressed, format == 'pdf');
		var from = null, to = null, allPages = null;

		if (bounds.width * bounds.height > MAX_AREA || data.length > MAX_REQUEST_SIZE)
		{
			throw {message: mxResources.get('drawingTooLarge')};
		}
		
		var embed = (includeXml) ? '1' : '0';
       	
		if (format == 'pdf')
		{
			if (pageRange != null)
			{
				from = pageRange.from;
				to = pageRange.to;
			}
			else if (currentPage == false)
			{
				allPages = '1';
			}
		}
		
       	if (format == 'xmlpng')
       	{
       		embed = '1';
       		format = 'png';
		}
		
		if (format == 'xmlpng' || format == 'svg')
		{
       		// Finds the current page number
       		if (this.pages != null && this.currentPage != null)
       		{
       			for (var i = 0; i < this.pages.length; i++)
       			{
       				if (this.pages[i] == this.currentPage)
       				{
       					from = i;
       					break;
       				}
       			}
       		}
       	}
       	
		var bg = graph.background;
		
		if ((format == 'png' || format == 'pdf' || format == 'svg') && transparent)
		{
			bg = mxConstants.NONE;
		}
		else if (!transparent && (bg == null || bg == mxConstants.NONE))
		{
			bg = '#ffffff';
		}
		
		var extras = {globalVars: graph.getExportVariables()};
		
		if (grid)
		{
			extras.grid = {
				size: graph.gridSize,
				steps: graph.view.gridSteps,
				color: graph.view.gridColor
			};
		}
		
		if (Graph.translateDiagram)
		{
			extras.diagramLanguage = Graph.diagramLanguage;
		}
		
		return {
			format: format,
			from: from,
			to: to,
			allPages: allPages,
			bg: ((bg != null) ? bg : mxConstants.NONE),
			base64: base64,
			embedXml: embed,
			xml: data,
			filename: ((filename != null) ? filename : ''),
			extras: JSON.stringify(extras),
			scale: scale,
			border: border,
			w: (w && isFinite(w)? w : null),
			h: (h && isFinite(h)? h : null)
		};
	};
	
	/**
	 * Translates this point by the given vector.
	 * 
	 * @param {number} dx X-coordinate of the translation.
	 * @param {number} dy Y-coordinate of the translation.
	 */
	EditorUi.prototype.setMode = function(mode, remember)
	{
		this.mode = mode;
	};

	/**
	 * Translates this point by the given vector.
	 * 
	 * @param {number} dx X-coordinate of the translation.
	 * @param {number} dy Y-coordinate of the translation.
	 */
	EditorUi.prototype.getDiagramId = function()
	{
		var id = window.location.hash;
		
		// Strips the hash sign
		if (id != null && id.length > 0)
		{
			id = id.substring(1);
		}

		// Removes additional parameters after trailing hash
		if (id != null && id.length > 1)
		{
			var idx = id.indexOf('#');
			
			if (idx >= 0)
			{
				id = id.substring(0, idx);
			}
		}
		
		return id;
	};

	/**
	 * Translates this point by the given vector.
	 * 
	 * @param {number} dx X-coordinate of the translation.
	 * @param {number} dy Y-coordinate of the translation.
	 */
	EditorUi.prototype.getHashObject = function()
	{
		var id = window.location.hash;
		var result = {};

		if (id != null && id.length > 0)
		{
			var last = id.lastIndexOf('#');

			if (last > 0)
			{
				var temp = decodeURIComponent(id.substring(last + 1));

				try
				{
					result = JSON.parse(temp);
				}
				catch (e)
				{
					// ignore
				}
			}
		}

		return result;
	};

	/**
	 * Updates the hash object with the current page id.
	 */
	EditorUi.prototype.updateHashObject = function()
	{
		if (this.currentFile != null && this.currentFile.getHash() != '' &&
			this.currentPage != null && this.getSelectedPageIndex() > 0)
		{
			var obj = this.getHashObject();
			obj.pageId = this.currentPage.getId();
			this.setHashObject(obj);
		}
		else
		{
			this.setHashObject(null);
		}
	};
	
	/**
	 * Translates this point by the given vector.
	 * 
	 * @param {number} dx X-coordinate of the translation.
	 * @param {number} dy Y-coordinate of the translation.
	 */
	EditorUi.prototype.setHashObject = function(obj)
	{
		if (Editor.enableHashObjects)
		{
			var id = window.location.hash;

			if (id == null || id == '')
			{
				id = '#';
			}

			var last = id.lastIndexOf('#');

			if (last > 0)
			{
				id = id.substring(0, last);
			}
			
			try
			{
				if (obj != null && !mxUtils.isEmptyObject(obj))
				{
					id = id + '#' + encodeURIComponent(JSON.stringify(obj));
				}
			}
			catch (e)
			{
				// ignore
			}

			window.location.hash = id;
		}
	};

	/**
	 * Loads the given file descriptor. The descriptor may define the following properties:
	 * 
	 * - url: The url to load the data from (proxy is used if CORS is not enabled)
	 * - data: The data to be inserted. If both, data and url are defined, then the data
	 * is preprendended to the data returned from the given URL.
	 * - format: Currently, only 'csv' is supported as an optional value. Default is XML.
	 * - update: Optional URL to fetch updates from (POST request with the page XML).
	 * - interval: Optional interval for fetching updates. Default is 60000 (60 seconds).
	 */
	EditorUi.prototype.loadDescriptor = function(desc, success, error)
	{
		var hash = window.location.hash;
		
		var loadData = mxUtils.bind(this, function(data)
		{
			var realData = (desc.data != null) ? desc.data : '';
			
			if (data != null && data.length > 0)
			{
				if (realData.length > 0)
				{
					realData += '\n';
				}
				
				realData += data;
			}

			var xml = (desc.format != 'csv' && realData.length > 0) ? realData : this.emptyDiagramXml;
			var tempFile = new LocalFile(this, xml, (urlParams['title'] != null) ?
					decodeURIComponent(urlParams['title']) : this.defaultFilename, true);
			tempFile.getHash = function()
			{
				return hash;
			};
			this.fileLoaded(tempFile);
			
			if (desc.format == 'csv')
			{
				this.importCsv(realData, mxUtils.bind(this, function(cells)
				{
					this.editor.undoManager.clear();
					this.editor.setModified(false);
					this.editor.setStatus('');
				}));
			}
        	
			// Installs updates
			if (desc.update != null)
			{
				var interval = (desc.interval != null) ? parseInt(desc.interval) : 60000;
				var currentThread = null;
				
				var doUpdate = mxUtils.bind(this, function()
				{
					var page = this.currentPage;
					
					mxUtils.post(desc.update, 'xml=' + encodeURIComponent(
						mxUtils.getXml(this.editor.getGraphXml())),
						mxUtils.bind(this, function(req)
					{
						if (page === this.currentPage)
						{
							if (req.getStatus() >= 200 && req.getStatus() <= 300)
							{
								var doc = this.updateDiagram(req.getText());
								schedule();
							}
							else
							{
								this.handleError({message: mxResources.get('error') + ' ' + req.getStatus()});
							}
						}
					}), mxUtils.bind(this, function(err)
					{
						this.handleError(err);
					}));
				});
				
				var schedule = mxUtils.bind(this, function()
				{
					window.clearTimeout(currentThread);
					currentThread = window.setTimeout(doUpdate, interval);
				});
				
				this.editor.addListener('pageSelected', mxUtils.bind(this, function()
				{
					schedule();
					doUpdate();
				}));
				
				schedule();
				doUpdate();
			}
			
    		if (success != null)
    		{
    			success();
    		}
		});
		
		if (desc.url != null && desc.url.length > 0)
		{
			var url = this.editor.getProxiedUrl(desc.url);
			
            // LATER: Remove cache-control header
            this.editor.loadUrl(url, mxUtils.bind(this, function(data)
            {
            	loadData(data);
            }), mxUtils.bind(this, function(err)
            {
            	if (error != null)
            	{
            		error(err)
            	}
            }));
		}
		else
		{
			loadData('');
		}
	};
	
	/**
	 * Translates this point by the given vector.
	 * 
	 * @param {number} dx X-coordinate of the translation.
	 * @param {number} dy Y-coordinate of the translation.
	 */
	EditorUi.prototype.updateDiagram = function(xml)
	{
		var doc = null;
		var ui = this;
		
		function createOverlay(desc)
		{
			var overlay = new mxCellOverlay(desc.image || graph.warningImage,
				desc.tooltip, desc.align, desc.valign, desc.offset);

			// Installs a handler for clicks on the overlay
			overlay.addListener(mxEvent.CLICK, function(sender, evt)
			{
				ui.alert(desc.tooltip);
			});
			
			return overlay;
		};
		
		if (xml != null && xml.length > 0)
		{
			doc = mxUtils.parseXml(xml);
			var node = (doc != null) ? doc.documentElement : null;
			
			if (node != null && node.nodeName == 'updates')
			{
				var graph = this.editor.graph;
				var model = graph.getModel();
				model.beginUpdate();
				var fit = null;

				try
				{
					node = node.firstChild;
					
					while (node != null)
					{
						if (node.nodeName == 'update')
						{
							// Resolves the cell ID
							var cell = model.getCell(node.getAttribute('id'));
							
							if (cell != null)
							{
								// Changes the value
								try
								{
									var value = node.getAttribute('value');
									
									if (value != null)
									{
										var valueNode = mxUtils.parseXml(value).documentElement;

										if (valueNode != null)
										{
											if (valueNode.getAttribute('replace-value') == '1')
											{
												model.setValue(cell, valueNode);
											}
											else
											{
												var attrs = valueNode.attributes;
												
												for (var j = 0; j < attrs.length; j++)
												{
													graph.setAttributeForCell(cell, attrs[j].nodeName,
														(attrs[j].nodeValue.length > 0) ? attrs[j].nodeValue : null);
												}
											}
										}
									}
								}
								catch (e)
								{
									if (window.console != null)
									{
										console.log('Error in value for ' + cell.id + ': ' + e);
									}
								}
								
								// Changes the style
								try
								{
									var style = node.getAttribute('style');
									
									if (style != null)
									{
										graph.model.setStyle(cell, style);
									}
								}
								catch (e)
								{
									if (window.console != null)
									{
										console.log('Error in style for ' + cell.id + ': ' + e);
									}
								}
								
								// Adds or removes an overlay icon
								try
								{
									var icon = node.getAttribute('icon');
									
									if (icon != null)
									{
										var desc = (icon.length > 0) ? JSON.parse(icon) : null;
										
										if (desc == null || !desc.append)
										{
											graph.removeCellOverlays(cell);
										}
										
										if (desc != null)
										{
											graph.addCellOverlay(cell, createOverlay(desc));
										}
									}
								}
								catch (e)
								{
									if (window.console != null)
									{
										console.log('Error in icon for ' + cell.id + ': ' + e);
									}
								}
								
								// Replaces the geometry
								try
								{
									var geo = node.getAttribute('geometry');
									
									if (geo != null)
									{
										geo = JSON.parse(geo);
										var curr = graph.getCellGeometry(cell);
										
										if (curr != null)
										{
											curr = curr.clone();
											
											// Partially overwrites geometry
											for (key in geo)
											{
												var val = parseFloat(geo[key]);
												
												if (key == 'dx')
												{
													curr.x += val; 
												}
												else if (key == 'dy')
												{
													curr.y += val;
												}
												else if (key == 'dw')
												{
													curr.width += val;
												}
												else if (key == 'dh')
												{
													curr.height += val;
												}
												else
												{
													curr[key] = parseFloat(geo[key]);
												}
											}
											
											graph.model.setGeometry(cell, curr);
										}
									}
								}
								catch (e)
								{
									if (window.console != null)
									{
										console.log('Error in icon for ' + cell.id + ': ' + e);
									}
								}
							} // if cell != null
						} // if node.nodeName == 'update
						else if (node.nodeName == 'model')
						{
							// Finds first child element
							var dataNode = node.firstChild;
							
							while (dataNode != null && dataNode.nodeType != mxConstants.NODETYPE_ELEMENT)
							{
								dataNode = dataNode.nextSibling;
							}
							
							if (dataNode != null)
							{
								var dec = new mxCodec(node.firstChild);
								dec.decode(dataNode, model);
							}
						}
						else if (node.nodeName == 'view')
						{
							if (node.hasAttribute('scale'))
							{
								graph.view.scale = parseFloat(node.getAttribute('scale'));
							}
							
							if (node.hasAttribute('dx') || node.hasAttribute('dy'))
							{
								graph.view.translate = new mxPoint(parseFloat(node.getAttribute('dx') || 0),
									parseFloat(node.getAttribute('dy') || 0));
							}
						}
						else if (node.nodeName == 'fit')
						{
							if (node.hasAttribute('max-scale'))
							{
								fit = parseFloat(node.getAttribute('max-scale'));
							}
							else
							{
								fit = 1;
							}
						}
						
						node = node.nextSibling;
					} // end of while
				}
				finally
				{
					model.endUpdate();
				}
				
				if (fit != null && this.chromelessResize)
				{
					this.chromelessResize(true, fit);
				}
			}
		}
		
		return doc;
	};
	
	/**
	 * Constructs a filename for a copy of the given file.
	 */
	EditorUi.prototype.getCopyFilename = function(file, timestamp)
	{
		var title = (file != null && file.getTitle() != null) ?
			file.getTitle() : this.defaultFilename;
		
		// Handles extension
		var extension = '';
		var dot = title.lastIndexOf('.');
		
		if (dot >= 0)
		{
			extension = title.substring(dot);
			title = title.substring(0, dot);
		}
		
		if (timestamp)
		{
			function getFormattedTime()
			{
			    var today = new Date();
			    var y = today.getFullYear();
			    // JavaScript months are 0-based.
			    var m = today.getMonth() + 1;
			    var d = today.getDate();
			    var h = today.getHours();
			    var mi = today.getMinutes();
			    var s = today.getSeconds();
			    
			    return y + "-" + m + "-" + d + "-" + h + "-" + mi + "-" + s;
			}
			
			var ts = new Date();
			title += ' ' + getFormattedTime();
		}
		
		title = mxResources.get('copyOf', [title]) + extension;
		
		return title;
	};
	
	/**
	 * Translates this point by the given vector.
	 * 
	 * @param {number} dx X-coordinate of the translation.
	 * @param {number} dy Y-coordinate of the translation.
	 */
	EditorUi.prototype.fileLoaded = function(file, noDialogs, success)
	{
		var oldFile = this.getCurrentFile();
		this.fileLoadedError = null;
		this.fileEditable = null;
		this.setCurrentFile(null);
		var result = false;
		this.hideDialog();
		
		if (oldFile != null)
		{
			EditorUi.debug('File.closed', [oldFile]);
			oldFile.removeListener(this.descriptorChangedListener);
			oldFile.close();
		}
		
		this.editor.graph.model.clear();
		this.editor.undoManager.clear();
	
		var noFile = mxUtils.bind(this, function()
		{
			this.setGraphEnabled(false);
			this.setCurrentFile(null);
			
			// Keeps initial title if no file existed before
			if (oldFile != null)
			{
				this.updateDocumentTitle();
			}
			
			// File might have been loaded halfway
			this.editor.graph.model.clear();
			this.editor.undoManager.clear();
			this.setBackgroundImage(null);
					
			// Avoids empty hash with no value
			if (!noDialogs && window.location.hash != null &&
				window.location.hash.length > 0)
			{
				window.location.hash = '';
			}
			
			if (this.fname != null)
			{
				this.fnameWrapper.style.display = 'none';
				this.fname.innerText = '';
				this.fname.setAttribute('title', mxResources.get('rename'));
			}

			this.editor.setStatus('');
			this.updateUi();
			
			if (!noDialogs)
			{
				this.showSplash();
			}
		});
	
		if (file != null)
		{
			try
			{
				// Workaround for delayed scroll repaint with min UI in Safari
				if (mxClient.IS_SF && uiTheme == 'min')
				{
					this.diagramContainer.style.visibility = '';
				}
				
				// Order is significant, current file needed for correct
				// file format for initial save after starting realtime
				this.openingFile = true;
				this.setCurrentFile(file);
				file.addListener('descriptorChanged', this.descriptorChangedListener);
				file.addListener('contentChanged', this.descriptorChangedListener);
				file.open();
				delete this.openingFile;
				
				// DescriptorChanged updates the enabled state of the graph
				this.setGraphEnabled(true);
				this.setMode(file.getMode());
				this.editor.graph.model.prefix = Editor.guid() + '-';
				this.editor.undoManager.clear();
				this.descriptorChanged();
				this.updateUi();
				
				// Realtime files have a valid status message
				if (!file.isEditable())
				{
					this.editor.setStatus('<span class="geStatusAlert">' +
						mxUtils.htmlEntities(mxResources.get('readOnly')) + '</span>');
				}
				// Handles modified state after error of loading new file
				else if (file.isModified())
				{
					file.addUnsavedStatus();
					
					// Restores unsaved data
					if (file.backupPatch != null)
					{
						file.patch([file.backupPatch]);
					}
				}
				else
				{
					this.editor.setStatus('');
				}
	
				if (!this.editor.isChromelessView() || this.editor.editable)
				{
					this.editor.graph.selectUnlockedLayer();
					this.showLayersDialog();
					this.restoreLibraries();
					
					// Workaround for no initial focus in FF
					if (window.self !== window.top)
					{
						window.focus();
					}
				}
				else if (this.editor.graph.isLightboxView())
				{
					this.lightboxFit();
				}
	
				if (this.chromelessResize)
				{
					this.chromelessResize();
				}

				if (success != null)
				{
					success();
				}
				
				this.editor.fireEvent(new mxEventObject('fileLoaded'));
				result = true;

				if (!this.isOffline() && file.getMode() != null)
				{
					var theme = (urlParams['sketch'] == '1') ? 'sketch' : uiTheme;

					if (theme == null)
					{
						theme = 'default';
					}
					else if (theme == 'sketch' || theme == 'min')
					{
						theme += Editor.isDarkMode() ? '-dark' : '-light';
					}

					EditorUi.logEvent({category: file.getMode().toUpperCase() + '-OPEN-FILE-' + file.getHash(),
						action: 'size_' + file.getSize(),
						label: 'autosave_' + ((this.editor.autosave) ? 'on' : 'off') + '_theme_' + theme});
				}
				
				EditorUi.debug('File.opened', [file]);
				
				//Notify users that editing is disabled within mobile apps (mainly for MS Teams)
				if (urlParams['viewerOnlyMsg'] == '1')
				{
					this.showAlert(mxResources.get('viewerOnlyMsg'));
				}
			
				if (this.editor.editable && this.mode == file.getMode() &&
					file.getMode() != App.MODE_DEVICE && file.getMode() != null)
				{
					try
					{
						this.addRecent({id: file.getHash(), title: file.getTitle(), mode: file.getMode()});
					}
					catch (e)
					{
						// ignore
					}
				}
				
				try
				{
					mxSettings.setOpenCounter(mxSettings.getOpenCounter() + 1);
					mxSettings.save();
				}
				catch (e)
				{
					// ignore
				}
			}
			catch (e)
			{
				this.fileLoadedError = e;
				
				// Disconnects file from UI
				if (file != null)
				{
					try
					{
						file.close();
					}
					catch (e2)
					{
						// ignore
					}
				}
				
				if (EditorUi.enableLogging && !this.isOffline())
				{
		        	try
		        	{
		        		EditorUi.logEvent({category: 'ERROR-LOAD-FILE-' +
		        			((file != null) ? file.getHash() : 'none'),
		        			action: 'message_' + e.message,
		        			label: 'stack_' + e.stack});
		        	}
		        	catch (e)
		        	{
		        		// ignore
		        	}
				}
				
				// Asynchronous handling of errors
				var fn = mxUtils.bind(this, function()
				{
					// Removes URL parameter and reloads the page
					if (urlParams['url'] != null && this.spinner.spin(document.body, mxResources.get('reconnecting')))
					{
						window.location.search = this.getSearch(['url']);
					}
					else if (oldFile != null)
					{
						if (!this.fileLoaded(oldFile))
						{
							noFile();
						}
					}
					else
					{
						noFile();
					}
				});
				
				if (!noDialogs)
				{
					this.handleError(e, mxResources.get('errorLoadingFile'), fn, true, null, null, true);
				}
				else
				{
					fn();
				}
			}
		}
		else
		{
			noFile();
		}
		
		return result;
	};

	/**
	 * Creates a hash value for the current file.
	 */
	EditorUi.prototype.getHashValueForPages = function(pages, details)
	{
		// TODO: Avoid encoding to XML to make it faster
		var hash = 0;
		var model = new mxGraphModel();
		var codec = new mxCodec();

		if (details != null)
		{
			details.byteCount = 0;
			details.attrCount = 0;
			details.eltCount = 0;
			details.nodeCount = 0;
		}
		
		for (var i = 0; i < pages.length; i++)
		{
			this.updatePageRoot(pages[i]);
			var diagram = pages[i].node.cloneNode(false);
			
			// FIXME: Check why names can be null in newer files
			// ignore in hash and do not diff null names for now
			diagram.removeAttribute('name');
			
			// Model is only a holder for the root
			model.root = pages[i].root;
			var xmlNode = codec.encode(model);
			this.editor.graph.saveViewState(pages[i].viewState, xmlNode, true);
			
			// Local defaults may be different in files so ignore
			xmlNode.removeAttribute('pageWidth');
			xmlNode.removeAttribute('pageHeight');
			
			diagram.appendChild(xmlNode);
			
			if (details != null)
			{
				details.eltCount += diagram.getElementsByTagName('*').length;
				details.nodeCount += diagram.getElementsByTagName('mxCell').length;
			}
			
			hash = ((hash << 5) - hash + this.hashValue(diagram, function(obj, key, value, isXml)
			{
				// Ignores JS machine rounding errors in known numeric attributes
				// eg. 412.33333333333326 (Webkit/FF) == 412.33333333333325 (Edge/IE11)
				if (isXml && (obj.nodeName == 'mxGeometry' || obj.nodeName == 'mxPoint') &&
					(key == 'x' || key == 'y' || key == 'width' || key == 'height'))
				{
					return Math.round(value);
				}
				// Workaround for previous in patch written to mxCell in 10.0.23
				else if (isXml && obj.nodeName == 'mxCell' && key == 'previous')
				{
					return null;
				}
				else
				{
					return value;
				}
			}, details)) << 0;
		}
		
		return hash;
	};
	
	/**
	 * Creates a hash value for the given object. Replacer returns the value of the
	 * property or attribute for the given object or XML node.
	 */
	EditorUi.prototype.hashValue = function(obj, replacer, details)
	{
		var hash = 0;
		
		// Checks for XML nodes
		if (obj != null && typeof obj === 'object' && typeof obj.nodeType === 'number' &&
			typeof obj.nodeName === 'string' && typeof obj.getAttribute === 'function')
		{
			if (obj.nodeName != null)
			{
				hash = hash ^ this.hashValue(obj.nodeName, replacer, details);
			}
			
			if (obj.attributes != null)
			{
				if (details != null)
				{
					details.attrCount += obj.attributes.length;
				}
				
				for (var i = 0; i < obj.attributes.length; i++)
				{
					var key = obj.attributes[i].name;
					var value = (replacer != null) ? replacer(obj, key, obj.attributes[i].value, true) : obj.attributes[i].value;
	
					if (value != null)
					{
						hash = hash ^ (this.hashValue(key, replacer, details) +
							this.hashValue(value, replacer, details));
					}
				}
			}
			
			if (obj.childNodes != null)
			{
				for (var i = 0; i < obj.childNodes.length; i++)
				{
					hash = ((hash << 5) - hash + this.hashValue(
						obj.childNodes[i], replacer, details)) << 0;
				}
			}
		}
		else if (obj != null && typeof obj !== 'function')
		{
			var str = String(obj);
			var temp = 0;

			if (details != null)
			{
				details.byteCount += str.length;
			}
			
			for (var i = 0; i < str.length; i++)
			{
		    	temp = ((temp << 5) - temp + str.charCodeAt(i)) << 0;
			}
		    
			hash = hash ^ temp;
		}
		
	    return hash;
	};

	/**
	 * Adds empty implementation
	 */
	EditorUi.prototype.descriptorChanged = function()
	{
		// empty
	};

	/**
	 * Hook for subclassers.
	 */
	EditorUi.prototype.restoreLibraries = function() { };

	/**
	 * Hook for subclassers.
	 */
	EditorUi.prototype.saveLibrary = function(name, images, file, mode, noSpin, noReload, fn) { };
	
	/**
	 * 
	 */
	EditorUi.prototype.isScratchpadEnabled = function()
	{
		return isLocalStorage || mxClient.IS_CHROMEAPP;
	};

	/**
	 * Shows or hides the scratchpad library.
	 */
	EditorUi.prototype.toggleScratchpad = function()
	{
		if (this.isScratchpadEnabled())
		{
			if (this.scratchpad == null)
			{
				StorageFile.getFileContent(this, '.scratchpad', mxUtils.bind(this, function(xml)
				{
					if (xml == null)
					{
						xml = this.emptyLibraryXml;
					}
					
					this.loadLibrary(new StorageLibrary(this, xml, '.scratchpad'));
				}));
			}
			else
			{
				this.closeLibrary(this.scratchpad);
			}
		}
	};
	
	/**
	 * Translates this point by the given vector.
	 * 
	 * @param {number} dx X-coordinate of the translation.
	 * @param {number} dy Y-coordinate of the translation.
	 */
	EditorUi.prototype.createLibraryDataFromImages = function(images)
	{
		// Uncompresses existing entries for saving
		if (!Editor.defaultCompressed)
		{
			for (var i = 0; i < images.length; i++)
			{
				if (images[i].xml != null && images[i].xml.charAt(0) != '<')
				{
					images[i].xml = mxUtils.trim(Graph.decompress(images[i].xml));
				}
			}
		}

		var doc = mxUtils.createXmlDocument();
		var library = doc.createElement('mxlibrary');
		mxUtils.setTextContent(library, JSON.stringify(images, null, 2));
		doc.appendChild(library);
		
		return mxUtils.getXml(doc, '\n');
	};
	
	/**
	 * Translates this point by the given vector.
	 * 
	 * @param {number} dx X-coordinate of the translation.
	 * @param {number} dy Y-coordinate of the translation.
	 */
	EditorUi.prototype.closeLibrary = function(file)
	{
		if (file != null)
		{
			this.removeLibrarySidebar(file.getHash());
			
			if (file.constructor != LocalLibrary)
			{
				mxSettings.removeCustomLibrary(file.getHash());
			}
			
			if (file.title == '.scratchpad')
			{
				this.scratchpad = null;
			}
		}
	};
	
	/**
	 * Translates this point by the given vector.
	 * 
	 * @param {number} dx X-coordinate of the translation.
	 * @param {number} dy Y-coordinate of the translation.
	 */
	EditorUi.prototype.removeLibrarySidebar = function(id)
	{
		var elts = this.sidebar.palettes[id];
		
		if (elts != null)
		{
			for (var i = 0; i < elts.length; i++)
			{
				elts[i].parentNode.removeChild(elts[i]);
			}
			
			delete this.sidebar.palettes[id];
		}
	};
	
	/**
	 * Changes the position of the library in the sidebar 
	 */
	EditorUi.prototype.repositionLibrary = function(nextChild) 
	{
	    var c = this.sidebar.getEntryContainer();
	    
	    if (nextChild == null)
	    {
	    	var elts = this.sidebar.palettes['L.scratchpad'];
	    	
	    	if (elts == null)
	    	{
	    		elts = this.sidebar.palettes['search'];
	    	}
	    	
	    	if (elts != null)
	    	{
	    		nextChild = elts[elts.length - 1].nextSibling;
	    	}
	    }
	    
		nextChild = (nextChild != null) ? nextChild : c.firstChild.nextSibling.nextSibling;
		
		var content = c.lastChild;
		var title = content.previousSibling;
		
	    c.insertBefore(content, nextChild);
	    c.insertBefore(title, content);
	}
	
	/**
	 * Translates this point by the given vector.
	 * 
	 * @param {number} dx X-coordinate of the translation.
	 * @param {number} dy Y-coordinate of the translation.
	 */
	EditorUi.prototype.loadLibrary = function(file, expand)
	{
		var doc = mxUtils.parseXml(file.getData());
		
		if (doc.documentElement.nodeName == 'mxlibrary')
		{
			var images = JSON.parse(mxUtils.getTextContent(doc.documentElement));
			this.libraryLoaded(file, images, doc.documentElement.getAttribute('title'), expand);
		}
		else
		{
			throw {message: mxResources.get('notALibraryFile')};
		}
	};
	
	/**
	 * Translates this point by the given vector.
	 * 
	 * @param {number} dx X-coordinate of the translation.
	 * @param {number} dy Y-coordinate of the translation.
	 */
	EditorUi.prototype.getLibraryStorageHint = function(file)
	{
		return '';
	};

	/**
	 * Translates this point by the given vector.
	 * 
	 * @param {number} dx X-coordinate of the translation.
	 * @param {number} dy Y-coordinate of the translation.
	 */
	EditorUi.prototype.libraryLoaded = function(file, images, optionalTitle, expand)
	{
		if (this.sidebar == null)
		{
			return;
		}

		if (file.constructor != LocalLibrary)
		{
			mxSettings.addCustomLibrary(file.getHash());
		}
		
		var library = null;

		if (file.constructor != StorageLibrary || file.title != '.scratchpad')
		{
			if (this.openLibraries == null)
			{
				this.openLibraries = [];
			}

			// Removes existing entry for this file ID
			for (var i = 0; i < this.openLibraries.length; i++)
			{
				if (this.openLibraries[i].file.getHash() == file.getHash())
				{
					mxUtils.remove(this.openLibraries[i], this.openLibraries);
					break;
				}
			}

			// Adds new entry to the array of open libraries
			library = {file: file, images: images,
				title: optionalTitle,
				expand: expand};
			this.openLibraries.push(library);
		}
		else
		{
			this.scratchpad = file;
		}
		
		var elts = this.sidebar.palettes[file.getHash()];
		var nextSibling = (elts != null) ? elts[elts.length - 1].nextSibling : null;
	
		// Removes existing sidebar entry for this library
		this.removeLibrarySidebar(file.getHash());
		var dropTarget = null;
		
		var addImages = mxUtils.bind(this, function(imgs, content)
		{
			if (imgs.length == 0 && file.isEditable())
			{
				if (dropTarget == null)
				{
					dropTarget = document.createElement('div');
					dropTarget.className = 'geDropTarget';
					mxUtils.write(dropTarget, mxResources.get('dragElementsHere'));
				}
				
				content.appendChild(dropTarget);
			}
			else
			{
				this.addLibraryEntries(imgs, content);
			}
		});

		// Adds entries to search index
		// KNOWN: Existing entries are not replaced after edit of custom library
		if (this.sidebar != null && images != null)
		{
			this.sidebar.addEntries(images);
		}
		
		// Adds new sidebar entry for this library
		var tmp = optionalTitle;
		
		if (tmp == null)
		{
			tmp = file.getTitle();

			if (tmp != null && /(\.xml)$/i.test(tmp))
			{
				tmp = tmp.substring(0, tmp.lastIndexOf('.'));
			}
		}

		var contentDiv = this.sidebar.addPalette(file.getHash(), tmp,
			(expand != null) ? expand : true, mxUtils.bind(this, function(content)
		{
			addImages(images, content);
	    }));

		if (library != null)
		{
			library.div = contentDiv;
		}
	
		this.repositionLibrary(nextSibling);
		
		// Adds tooltip for backend
		var title = contentDiv.parentNode.previousSibling;
	    var tip = title.getAttribute('title');
	    
	    if (tip != null && tip.length > 0 && file.title != '.scratchpad')
	    {
	    	title.setAttribute('title', this.getLibraryStorageHint(file) + '\n' + tip);
	    }
	    
	    var buttons = document.createElement('div');
	    buttons.style.position = 'absolute';
	    buttons.style.right = '0px';
	    buttons.style.top = '0px';
	    buttons.style.padding = '8px'	    
	    buttons.style.backgroundColor = 'inherit';
	    
	    title.style.position = 'relative';
	    
	    var btnWidth = 18;
		var btn = document.createElement('img');
		btn.className = 'geAdaptiveAsset';
		btn.setAttribute('src', Editor.crossImage);
		btn.setAttribute('title', mxResources.get('close'));
		btn.setAttribute('valign', 'absmiddle');
		btn.setAttribute('border', '0');
		btn.style.position = 'relative';
		btn.style.top = '2px';
		btn.style.width = '14px';
		btn.style.cursor = 'pointer';
		btn.style.margin = '0 3px';

		var saveBtn = null;
		
	    if (file.title != '.scratchpad' || this.closableScratchpad)
	    {
			buttons.appendChild(btn);
			
			mxEvent.addListener(btn, 'click', mxUtils.bind(this, function(evt)
			{
				// Workaround for close after any button click in IE8
				if (!mxEvent.isConsumed(evt))
				{
					var fn = mxUtils.bind(this, function()
					{
						if (library != null)
						{
							mxUtils.remove(library, this.openLibraries);
						}

						this.closeLibrary(file);
					});
					
					if (saveBtn != null)
					{
						this.confirm(mxResources.get('allChangesLost'), null, fn,
							mxResources.get('cancel'), mxResources.get('discardChanges'));
					}
					else
					{
						fn();
					}
			
					mxEvent.consume(evt);
				}
			}));
	    }
		
		if (file.isEditable())
		{
			var graph = this.editor.graph;
			var spinBtn = null;
			
			var editLibrary = mxUtils.bind(this, function(evt)
			{
				this.showLibraryDialog(file.getTitle(), contentDiv, images, file, file.getMode());
				mxEvent.consume(evt);
			});
			
			var saveLibrary = mxUtils.bind(this, function(evt)
			{
				file.setModified(true);
				
				if (file.isAutosave())
				{
					if (spinBtn != null && spinBtn.parentNode != null)
					{
						spinBtn.parentNode.removeChild(spinBtn);
					}
					
					spinBtn = btn.cloneNode(false);
					spinBtn.setAttribute('src', Editor.spinImage);
					spinBtn.setAttribute('title', mxResources.get('saving'));
					spinBtn.style.cursor = 'default';
					spinBtn.style.marginRight = '2px';
					spinBtn.style.marginTop = '-2px';
					buttons.insertBefore(spinBtn, buttons.firstChild);
					title.style.paddingRight = (buttons.childNodes.length * btnWidth) + 'px';
					
					this.saveLibrary(file.getTitle(), images, file, file.getMode(), true, true, function()
					{
						if (spinBtn != null && spinBtn.parentNode != null)
						{
							spinBtn.parentNode.removeChild(spinBtn);
							title.style.paddingRight = (buttons.childNodes.length * btnWidth) + 'px';
						}
					});
				}
				else if (saveBtn == null)
				{
					saveBtn = btn.cloneNode(false);
					saveBtn.setAttribute('src', Editor.saveImage);
					saveBtn.setAttribute('title', mxResources.get('save'));
					buttons.insertBefore(saveBtn, buttons.firstChild);
					
					mxEvent.addListener(saveBtn, 'click', mxUtils.bind(this, function(evt)
					{
						this.saveLibrary(file.getTitle(), images, file, file.getMode(),
							file.constructor == LocalLibrary, true, function()
							{
								if (saveBtn != null && !file.isModified())
								{
									title.style.paddingRight = (buttons.childNodes.length * btnWidth) + 'px';
									saveBtn.parentNode.removeChild(saveBtn);
									saveBtn = null;
								}
							});
						
						mxEvent.consume(evt);
					}));
					
					title.style.paddingRight = (buttons.childNodes.length * btnWidth) + 'px';
				}
			});
			
			var addCells = mxUtils.bind(this, function(cells, bounds, evt, title)
			{
				cells = graph.cloneCells(mxUtils.sortCells(graph.model.getTopmostCells(cells)));
	
				// Translates cells to origin
				for (var i = 0; i < cells.length; i++)
				{
					var geo = graph.getCellGeometry(cells[i]);
					
					if (geo != null)
					{
						geo.translate(-bounds.x, -bounds.y);
					}
				}

				contentDiv.appendChild(this.sidebar.createVertexTemplateFromCells(
					cells, bounds.width, bounds.height, title || '', true, null, false));
				var xml = mxUtils.getXml(this.editor.graph.encodeCells(cells));

				if (Editor.defaultCompressed)
				{
					xml = Graph.compress(xml);
				}

				var entry = {xml: xml, w: bounds.width, h: bounds.height};
				
				if (title != null)
				{
					entry.title = title;
				}
				
				images.push(entry);
				saveLibrary(evt);
				
				if (dropTarget != null && dropTarget.parentNode != null && images.length > 0)
				{
					dropTarget.parentNode.removeChild(dropTarget);
					dropTarget = null;
				}
			});
		
			var addSelection = mxUtils.bind(this, function(evt)
			{
				if (!graph.isSelectionEmpty())
				{
					var cells = graph.getSelectionCells();
					var bounds = graph.view.getBounds(cells);
					
					var s = graph.view.scale;
					
					bounds.x /= s;
					bounds.y /= s;
					bounds.width /= s;
					bounds.height /= s;
					
					bounds.x -= graph.view.translate.x;
					bounds.y -= graph.view.translate.y;
					
					addCells(cells, bounds);
				}
				else if (graph.getRubberband().isActive())
				{
					graph.getRubberband().execute(evt);
					graph.getRubberband().reset();
				}
				else
				{
					this.showError(mxResources.get('error'), mxResources.get('nothingIsSelected'), mxResources.get('ok'));
				}
				
				mxEvent.consume(evt);
			});
			
			// Adds drop handler from graph
			mxEvent.addGestureListeners(contentDiv, function(){}, mxUtils.bind(this, function(evt)
			{
				if (graph.isMouseDown && graph.panningManager != null && graph.graphHandler.first != null)
				{
					graph.graphHandler.suspend();
					
					if (graph.graphHandler.hint != null)
					{
						graph.graphHandler.hint.style.visibility = 'hidden';	
					}
					
					contentDiv.style.backgroundColor = (Editor.isDarkMode()) ? '#000000' : '#fefefe';
					contentDiv.style.cursor = 'copy';
					graph.panningManager.stop();
					graph.autoScroll = false;
					
					mxEvent.consume(evt);
				}
			}), mxUtils.bind(this, function(evt)
			{
				if (graph.isMouseDown && graph.panningManager != null && graph.graphHandler != null)
				{
					contentDiv.style.backgroundColor = '';
					contentDiv.style.cursor = 'default';
					this.sidebar.showTooltips = true;
					graph.panningManager.stop();
					
					graph.graphHandler.reset();
					graph.isMouseDown = false;
					graph.autoScroll = true;
					
					addSelection(evt);
					mxEvent.consume(evt);
				}
			}));
			
			// Handles mouse leaving the library and restoring move
			mxEvent.addListener(contentDiv, 'mouseleave', mxUtils.bind(this, function(evt)
			{
				if (graph.isMouseDown && graph.graphHandler.first != null)
				{
					graph.graphHandler.resume();

					if (graph.graphHandler.hint != null)
					{
						graph.graphHandler.hint.style.visibility = 'visible';	
					}
					
					contentDiv.style.backgroundColor = '';
					contentDiv.style.cursor = '';
					graph.autoScroll = true;
				}
			}));
			
			// Adds drop handler from filesystem
			if (Graph.fileSupport)
			{
				mxEvent.addListener(contentDiv, 'dragover', mxUtils.bind(this, function(evt)
				{
					contentDiv.style.backgroundColor = (Editor.isDarkMode()) ? '#000000' : '#fefefe';
					evt.dataTransfer.dropEffect = 'copy';
					contentDiv.style.cursor = 'copy';
					this.sidebar.hideTooltip();
					evt.stopPropagation();
					evt.preventDefault();
				}));
				
				mxEvent.addListener(contentDiv, 'drop', mxUtils.bind(this, function(evt)
				{
					contentDiv.style.cursor = '';
					contentDiv.style.backgroundColor = '';
					
				    if (evt.dataTransfer.files.length > 0)
				    {	
				    	this.importFiles(evt.dataTransfer.files, 0, 0, this.maxImageSize, mxUtils.bind(this, function(data, mimeType, x, y, w, h, img, doneFn, file)
				    	{
							if (data != null && mimeType.substring(0, 6) == 'image/')
							{
								var style = 'shape=image;verticalLabelPosition=bottom;verticalAlign=top;imageAspect=0;aspect=fixed;image=' +
									this.convertDataUri(data);
								var cells = [new mxCell('', new mxGeometry(0, 0, w, h), style)];
								cells[0].vertex = true;
	
								addCells(cells, new mxRectangle(0, 0, w, h), evt, (mxEvent.isAltDown(evt)) ? null : img.substring(0, img.lastIndexOf('.')).replace(/_/g, ' '));

								if (dropTarget != null && dropTarget.parentNode != null && images.length > 0)
								{
									dropTarget.parentNode.removeChild(dropTarget);
									dropTarget = null;
								}
							}
							else
							{
								var done = false;
								
								var doImport = mxUtils.bind(this, function(theData, theMimeType)
								{
									if (theData != null && theMimeType == 'application/pdf')
									{
										var xml = Editor.extractGraphModelFromPdf(theData);
					
										if (xml != null && xml.length > 0)
										{
											theMimeType = 'text/xml';
											theData = xml;
										}
									}
									
									if (theData != null) //Try to parse the file as xml (can be a library or mxfile). Otherwise, an error will be shown
									{
										var doc = mxUtils.parseXml(theData);
										
										if (doc.documentElement.nodeName == 'mxlibrary')
										{
											try
											{
												var temp = JSON.parse(mxUtils.getTextContent(doc.documentElement));
												addImages(temp, contentDiv);
												images = images.concat(temp);
												saveLibrary(evt);
												this.spinner.stop();
												done = true;
											}
											catch (e)
											{
												// ignore
											}
										}
										else if (doc.documentElement.nodeName == 'mxfile')
										{
											try
											{
												var pages = doc.documentElement.getElementsByTagName('diagram');
												
												for (var i = 0; i < pages.length; i++)
												{
													var cells = this.stringToCells(Editor.getDiagramNodeXml(pages[i]));
													var size = this.editor.graph.getBoundingBoxFromGeometry(cells);
													addCells(cells, new mxRectangle(0, 0, size.width, size.height), evt);
												}
												
												done = true;
											}
											catch (e)
											{
												if (window.console != null)
												{
													console.log('error in drop handler:', e);
												}
											}
										}
									}
									
									if (!done)
									{
										this.spinner.stop();
										this.handleError({message: mxResources.get('errorLoadingFile')})
									}

									if (dropTarget != null && dropTarget.parentNode != null && images.length > 0)
									{
										dropTarget.parentNode.removeChild(dropTarget);
										dropTarget = null;
									}
								});
								
								if (file != null && img != null && ((/(\.v(dx|sdx?))($|\?)/i.test(img)) || /(\.vs(x|sx?))($|\?)/i.test(img)))
								{
									this.importVisio(file, function(xml)
									{
										doImport(xml, 'text/xml');
									}, null, img);
								}
								else if (new XMLHttpRequest().upload && this.isRemoteFileFormat(data, img) && file != null)
								{
									if (this.isExternalDataComms())
									{
										this.parseFile(file, mxUtils.bind(this, function(xhr)
										{
											if (xhr.readyState == 4)
											{
												this.spinner.stop();
												
												if (xhr.status >= 200 && xhr.status <= 299)
												{
													doImport(xhr.responseText, 'text/xml');
												}
												else
												{
													this.handleError({message: mxResources.get((xhr.status == 413) ?
														'drawingTooLarge' : 'invalidOrMissingFile')},
														mxResources.get('errorLoadingFile'));
												}
											}
										}));
									}
									else
									{
										this.spinner.stop();
										this.showError(mxResources.get('error'), mxResources.get('notInOffline'));
									}
								}
								else
								{
									doImport(data, mimeType);
								}
							}
				    	}));
					}
				    
				    evt.stopPropagation();
				    evt.preventDefault();
				}));
	
				mxEvent.addListener(contentDiv, 'dragleave', function(evt)
				{
					contentDiv.style.cursor = '';
					contentDiv.style.backgroundColor = '';
					evt.stopPropagation();
					evt.preventDefault();
				});
			}
	
			btn = btn.cloneNode(false);
			btn.setAttribute('src', Editor.editImage);
			btn.setAttribute('title', mxResources.get('edit'));
			buttons.insertBefore(btn, buttons.firstChild);
			
			mxEvent.addListener(btn, 'click', editLibrary);

			var btn2 = btn.cloneNode(false);
			btn2.setAttribute('src', Editor.plusImage);
			btn2.setAttribute('title', mxResources.get('add'));
			buttons.insertBefore(btn2, buttons.firstChild);
			mxEvent.addListener(btn2, 'click', addSelection);

			// Hack to add selection via context menu
			if (file.title == '.scratchpad')
			{
				this.addSelectionToScratchpad = addSelection;
			}
			
			if (!this.isOffline() && file.title == '.scratchpad' && EditorUi.scratchpadHelpLink != null)
			{
				var link = document.createElement('span');
				link.setAttribute('title', mxResources.get('help'));
				link.style.cssText = 'color:#a3a3a3;text-decoration:none;margin-right:2px;cursor:pointer;';
				mxUtils.write(link, '?');
				
				mxEvent.addGestureListeners(link, mxUtils.bind(this, function(evt)
				{
					this.openLink(EditorUi.scratchpadHelpLink);
					mxEvent.consume(evt);
				}));
				
				buttons.insertBefore(link, buttons.firstChild);
			}
		}
		
		title.appendChild(buttons);
		title.style.paddingRight = (buttons.childNodes.length * btnWidth) + 'px';
	};

	/**
	 * Adds the library entries to the given DOM node.
	 */
	EditorUi.prototype.addLibraryEntries = function(imgs, content)
	{
		for (var i = 0; i < imgs.length; i++)
		{
			var img = imgs[i];
			var data = img.data;

			if (data != null)
			{
				data = this.convertDataUri(data);
				var s = 'shape=image;verticalLabelPosition=bottom;verticalAlign=top;imageAspect=0;';
				
				if (img.aspect == 'fixed')
				{
					s += 'aspect=fixed;'
				}
				
				content.appendChild(this.sidebar.createVertexTemplate(s + 'image=' +
					data, img.w, img.h, '', img.title || '', false, null, true));
			}
			else if (img.xml != null)
			{
				var cells = this.stringToCells((img.xml.charAt(0) == '<') ?
					img.xml : Graph.decompress(img.xml));
				
				if (cells.length > 0)
				{
					content.appendChild(this.sidebar.createVertexTemplateFromCells(
						cells, img.w, img.h, img.title || '', true, null, true));
				}
			}
		}
	};

	/**
	 * Extracts the resource for the current language from the given multi language
	 * resource object of the form {es: "...", de: "...", main: "..."} where the keys
	 * are country codes and main defines the fallback if no resource for the current
	 * country code exists.
	 */
	EditorUi.prototype.getResource = function(obj)
	{
		return (obj != null) ? (obj[mxLanguage] || obj.main) : null;
	};
	
	/**
	 * EditorUi Overrides
	 */
	EditorUi.prototype.footerHeight = 0;
	
	if (urlParams['savesidebar'] == '1')
	{
		Sidebar.prototype.thumbWidth = 64;
		Sidebar.prototype.thumbHeight = 64;
	}

	/**
	 * Programmatic settings for theme.
	 */
    EditorUi.initTheme = function()
    {
    	if (Editor.currentTheme == 'atlas')
    	{
    		mxClient.link('stylesheet', STYLE_PATH + '/atlas.css');

    		if (typeof Toolbar !== 'undefined')
    		{
    			Toolbar.prototype.unselectedBackground = 'linear-gradient(rgb(255, 255, 255) 0px, rgb(242, 242, 242) 100%)';
    			Toolbar.prototype.selectedBackground = 'rgb(242, 242, 242)';
    		}
    		
    		Editor.prototype.initialTopSpacing = 3;
    		EditorUi.prototype.menubarHeight = 41;
    		EditorUi.prototype.toolbarHeight = 38;
    	}

		// Implements the sketch-min UI
		if (Editor.currentTheme == 'sketch')
		{
			Editor.configurationKey = '.sketch-configuration';
			Editor.settingsKey = '.sketch-config';
		}
    };
    
	EditorUi.initTheme();

	/**
	 * Overrides image dialog to add image search and Google+.
	 */
    EditorUi.prototype.showImageDialog = function(title, value, fn, ignoreExisting, convertDataUri, withCrop, initClipPath)
	{
		// KNOWN: IE+FF don't return keyboard focus after image dialog (calling focus doesn't help)
	    var dlg = new ImageDialog(this, title, value, fn, ignoreExisting, convertDataUri, withCrop, initClipPath);
		this.showDialog(dlg.container, (Graph.fileSupport) ? 480 : 360, (Graph.fileSupport) ? 200 : 90, true, true);
		dlg.init();
	};

	/**
	 * Overrides image dialog to add image search and Google+.
	 */
    EditorUi.prototype.showLocalStorageDialog = function(title, key, buttons, elt, helpLink, applyFn)
	{
		var value = localStorage.getItem(key);

		var dlg = new TextareaDialog(this, title, (value != null) ?
			JSON.stringify(JSON.parse(value), null, 2) : '',
			mxUtils.bind(this, function(newValue)
			{
				if (newValue != null)
				{
					try
					{
						if (applyFn != null)
						{
							applyFn(newValue);
						}
						
						if (newValue == value)
						{
							this.hideDialog();
						}
						else
						{
							if (newValue.length > 0)
							{
								var obj = JSON.parse(newValue);
								
								localStorage.setItem(key, JSON.stringify(obj));
							}
							else
							{
								localStorage.removeItem(key);
							}

							this.hideDialog();
							this.alert(mxResources.get('restartForChangeRequired'));
						}
					}
					catch (e)
					{
						this.handleError(e);	
					}
				}
			}), null, mxResources.get('close'), null, null, null, true, null, null, helpLink, buttons, elt);
		
		this.showDialog(dlg.container, 660, 480, true, false);
		dlg.init();
	};

	/**
	 * Hides the current menu.
	 */
	EditorUi.prototype.showBackgroundImageDialog = function(apply, img, color, showColor)
	{
		apply = (apply != null) ? apply : mxUtils.bind(this, function(image, failed, color, shadowVisible)
		{
			if (!failed)
			{
				var change = new ChangePageSetup(this, (showColor) ? color : null, image);
				change.ignoreColor = !showColor;

				if (shadowVisible != null && showColor)
				{
					change.shadowVisible = shadowVisible;
				}
				
				this.editor.graph.model.execute(change);
			}
		});

		var dlg = new BackgroundImageDialog(this, apply, img, color, showColor);
		this.showDialog(dlg.container, 400, (showColor) ? 240 : 220, true, true);
		dlg.init();
	};

	/**
	 * Hides the current menu.
	 */
	EditorUi.prototype.showLibraryDialog = function(name, sidebar, images, file, mode)
	{
		var dlg = new LibraryDialog(this, name, sidebar, images, file, mode);
		
		this.showDialog(dlg.container, 640, 440, true, false, mxUtils.bind(this, function(cancel)
		{
			if (cancel && this.getCurrentFile() == null && urlParams['embed'] != '1')
			{
				this.showSplash();
			}
		}));
		
		dlg.init();
	};

	/**
	 * Overridden to update after view state changes.
	 */
	var editorUiCreateFormat = EditorUi.prototype.createFormat;
	
	EditorUi.prototype.createFormat = function(container)
	{
		var format = editorUiCreateFormat.apply(this, arguments);
		
		this.editor.graph.addListener('viewStateChanged', mxUtils.bind(this, function(evt)
		{
			if (this.editor.graph.isSelectionEmpty())
			{
				format.refresh();
			}
		}));
		
		return format;
	};
	
	/**
	 * Translates this point by the given vector.
	 * 
	 * @param {number} dx X-coordinate of the translation.
	 * @param {number} dy Y-coordinate of the translation.
	 */
	EditorUi.prototype.handleError = function(resp, title, fn, invokeFnOnClose, notFoundMessage, fileHash, disableLogging)
	{
		var resume = (this.spinner != null && this.spinner.pause != null) ? this.spinner.pause() : function() {};
		var e = (resp != null && resp.error != null) ? resp.error : resp;

		// Logs errors and writes stack to console
		if (resp != null && (urlParams['test'] == '1' || resp.stack != null) && resp.message != null)
		{
			try
			{
				if (!disableLogging)
				{
					EditorUi.logError('Caught: ' +
						(resp.message == '' && resp.name != null) ? resp.name : resp.message,
						resp.filename, resp.lineNumber, resp.columnNumber, resp, 'INFO');
				}
				else
				{
					if (window.console != null)
					{
						console.error('EditorUi.handleError:', resp);
					}
				}
			}
			catch (e)
			{
				// ignore
			}
		}
	
		if (e != null || title != null)
		{
			var msg = mxUtils.htmlEntities(mxResources.get('unknownError'), false);
			var btn = mxResources.get('ok');
			var retry = null;
			title = (title != null) ? title : mxResources.get('error');
			
			if (e != null)
			{
				if (e.retry != null)
				{
					btn = mxResources.get('cancel');
					retry = function()
					{
						resume();
						e.retry();
					};
				}
				
				if (e.code == 404 || e.status == 404 || e.code == 403)
				{
					if (e.code == 403)
					{
						if (e.message != null)
						{
							msg = mxUtils.htmlEntities(e.message, false);
						}
						else
						{
							msg = mxUtils.htmlEntities(mxResources.get('accessDenied'), false);
						}
					}
					else
					{
						msg = (notFoundMessage != null) ? notFoundMessage :
							mxUtils.htmlEntities(mxResources.get('fileNotFoundOrDenied') +
							((this.drive != null && this.drive.user != null) ? ' (' + this.drive.user.displayName +
							', ' + this.drive.user.email+ ')' : ''), false);
					}
					
					var id = (notFoundMessage != null) ? null : ((fileHash != null) ? fileHash : window.location.hash);
					
					// #U handles case where we tried to fallback to Google File and
					// hash property still shows the public URL we tried to load
					if (id != null && (id.substring(0, 2) == '#G' ||
						id.substring(0, 45) == '#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D') &&
						((resp != null && resp.error != null && ((resp.error.errors != null &&
						resp.error.errors.length > 0 && resp.error.errors[0].reason == 'fileAccess') ||
						(resp.error.data != null && resp.error.data.length > 0 &&
						resp.error.data[0].reason == 'fileAccess'))) ||
						e.code == 404 || e.status == 404))
					{
						id = (id.substring(0, 2) == '#U') ? id.substring(45, id.lastIndexOf('%26ex')) : id.substring(2);
						
						// Special case where the button must have a different label and function
						this.showError(title, msg, mxResources.get('openInNewWindow'), mxUtils.bind(this, function()
						{
							this.editor.graph.openLink('https://drive.google.com/open?id=' + id);
							this.handleError(resp, title, fn, invokeFnOnClose, notFoundMessage)
						}), retry, mxResources.get('changeUser'), mxUtils.bind(this, function()
						{
							var driveUsers = this.drive.getUsersList();
							
							var div = document.createElement('div');
							
							var title = document.createElement('span');
							title.style.marginTop = '6px';
							mxUtils.write(title, mxResources.get('changeUser') + ': ');
							
							div.appendChild(title);
							
							var usersSelect = document.createElement('select');
							usersSelect.style.width = '200px';
							
							//TODO This code is similar to Dialogs.js change user part in SplashDialog
							function fillUsersSelect()
							{
								usersSelect.innerText = '';
								
								for (var i = 0; i < driveUsers.length; i++)
								{
									var option = document.createElement('option');
									mxUtils.write(option, driveUsers[i].displayName);
									option.value = i;
									usersSelect.appendChild(option);
									//More info (email) about the user in a disabled option
									option = document.createElement('option');
									option.innerHTML = '&nbsp;&nbsp;&nbsp;';
									mxUtils.write(option, '<' + driveUsers[i].email + '>');
									option.setAttribute('disabled', 'disabled');
									usersSelect.appendChild(option);
								}
								
								//Add account option
								var option = document.createElement('option');
								mxUtils.write(option, mxResources.get('addAccount'));
								option.value = driveUsers.length;
								usersSelect.appendChild(option);
							}
							
							fillUsersSelect();
							
							mxEvent.addListener(usersSelect, 'change', mxUtils.bind(this, function()
							{
								var userIndex = usersSelect.value;
								var existingAccount = driveUsers.length != userIndex;
								
								if (existingAccount)
								{
									this.drive.setUser(driveUsers[userIndex]);
								}
								
								this.drive.authorize(existingAccount, mxUtils.bind(this, function()
								{
									if (!existingAccount) 
									{
										driveUsers = this.drive.getUsersList();
										fillUsersSelect();
									}
								}), mxUtils.bind(this, function(resp)
								{
									this.handleError(resp);
								}), true);
							}));
							
							div.appendChild(usersSelect);
							
							var dlg = new CustomDialog(this, div, mxUtils.bind(this, function()
							{
								this.loadFile(window.location.hash.substr(1), true);
							}));
							this.showDialog(dlg.container, 300, 100, true, true);
						}), mxResources.get('cancel'), mxUtils.bind(this, function()
						{
							this.hideDialog();
							
							if (fn != null)
							{
								fn();
							}
						}), 480, 150);

						return;
					}
				}
				
				if (e.message != null)
				{
					if (e.message == '' && e.name != null)
					{
						msg = mxUtils.htmlEntities(e.name, false);
					}
					else
					{
						msg = mxUtils.htmlEntities(e.message, false);
					}
				}
				else if (e.response != null && e.response.error != null)
				{
					msg = mxUtils.htmlEntities(e.response.error, false);
				}
				else if (typeof window.App !== 'undefined')
				{
					if (e.code == App.ERROR_TIMEOUT)
					{
						msg = mxUtils.htmlEntities(mxResources.get('timeout'), false);
					}
					else if (e.code == App.ERROR_BUSY)
					{
						msg = mxUtils.htmlEntities(mxResources.get('busy'), false);
					}
					else if (typeof e === 'string' && e.length > 0)
					{
						msg = mxUtils.htmlEntities(e, false);
					}
				}
			}
			
			var btn3 = null;
			var fn3 = null;
			
			if (e != null && e.helpLink != null)
			{
				btn3 = mxResources.get('help');
				
				fn3 = mxUtils.bind(this, function()
				{
					return this.editor.graph.openLink(e.helpLink);
				});
			}
			else if (e != null && e.ownerEmail != null)
			{
				btn3 = mxResources.get('contactOwner');
				
				msg += mxUtils.htmlEntities(' (' + btn3 + ': ' + e.ownerEmail + ')', false);
				
				fn3 = mxUtils.bind(this, function()
				{
					return this.openLink('mailto:' + mxUtils.htmlEntities(e.ownerEmail));
				});
			}
	
			this.showError(title, msg, btn, fn, retry, null, null, btn3, fn3,
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
	EditorUi.prototype.alert = function(msg, fn, optionalWidth)
	{
		var dlg = new ErrorDialog(this, null, msg, mxResources.get('ok'), fn);
		this.showDialog(dlg.container, optionalWidth || 340, 100, true, false);
		dlg.init();
	};
	
	/**
	 * Translates this point by the given vector.
	 * 
	 * @param {number} dx X-coordinate of the translation.
	 * @param {number} dy Y-coordinate of the translation.
	 */
	EditorUi.prototype.confirm = function(msg, okFn, cancelFn, okLabel, cancelLabel, closable)
	{
		msg = (msg != null) ? msg : '';
		var resume = (this.spinner != null && this.spinner.pause != null) ? this.spinner.pause() : function() {};
		var height = Math.min(220, Math.ceil(Math.max(1, msg.length) / 50) * 28);
		
		var dlg = new ConfirmDialog(this, msg, function()
		{
			resume();
			
			if (okFn != null)
			{
				okFn();
			}
		}, function()
		{
			resume();
			
			if (cancelFn != null)
			{
				cancelFn();
			}
		}, okLabel, cancelLabel, null, null, null, null, height);
		
		this.showDialog(dlg.container, 340, 46 + height, true, closable);
		dlg.init();
	};
	
	/**
	 * Creates a popup banner.
	 */
	EditorUi.prototype.showBanner = function(id, text, onclick, doNotShowAgainOnClose, small, positionCss, t1, t2, to)
	{
		var result = false;
		
		if (!this.bannerShowing && !this['hideBanner' + id] &&
			(!isLocalStorage || mxSettings.settings == null ||
			mxSettings.settings['close' + id] == null))
		{
			positionCss = (positionCss != null) ? positionCss : 'bottom:10px;left:50%;';
			t1 = (t1 != null) ? t1 : 'translate(-50%,120%)';
			t2 = (t2 != null) ? t2 : 'translate(-50%,0%)';
			var delay = (small) ? 500 : 1000;

			var css = (!small) ? 'font-size:16px;padding:18px 34px 12px 20px;font-weight:bold;' :
				'padding:4px;border-radius:6px;font-size:11px;height:12px;font-weight:normal;';

			var banner = document.createElement('div');
			banner.style.cssText = 'position:absolute;' + positionCss + ';max-width:90%;white-space:nowrap;' +
				'cursor:pointer;z-index:' + mxPopupMenu.prototype.zIndex + ';' + css;
			mxUtils.setPrefixedStyle(banner.style, 'transform', t1);
			mxUtils.setPrefixedStyle(banner.style, 'transition', 'all ' + delay + 'ms ease');
			banner.className = 'geBtn gePrimaryBtn' + ((small) ? ' geSmallBanner' : '');

			if (!Editor.isDarkMode())
			{
				mxUtils.setPrefixedStyle(banner.style, 'box-shadow', '1px 1px 2px 0px #ddd');
			}

			if (to != null)
			{
				mxUtils.setPrefixedStyle(banner.style, 'transform-origin', to);
			}
			
			if (!small)
			{
				var logo = document.createElement('img');
				logo.setAttribute('src', IMAGE_PATH + '/logo.png');
				logo.setAttribute('border', '0');
				logo.setAttribute('align', 'absmiddle');
				logo.style.cssText = 'margin-top:-4px;margin-left:8px;'+
					'margin-right:12px;width:26px;height:26px;';
				banner.appendChild(logo);

				var img = document.createElement('img');
				img.setAttribute('src', Dialog.prototype.closeImage);
				img.setAttribute('title', mxResources.get((doNotShowAgainOnClose) ? 'doNotShowAgain' : 'close'));
				img.setAttribute('border', '0');
				img.style.cssText =  ((small) ? 'right:6px;top:9px;' :
					'right:10px;top:12px;') + 'position:absolute;filter:invert(1);padding:6px;margin:-6px;cursor:default;';
				banner.appendChild(img);
			}

			mxUtils.write(banner, text);
			document.body.appendChild(banner);
			this.bannerShowing = true;
			
			var div = document.createElement('div');
			div.style.cssText = 'display:flex;align-items:center;justify-content:center;' +
				'padding-top:6px;font-size:11px;text-align:center;font-weight:normal;';
			var chk = document.createElement('input');
			chk.setAttribute('type', 'checkbox');
			chk.setAttribute('id', 'geDoNotShowAgainCheckbox');
			chk.style.marginRight = '6px';
			
			if (!doNotShowAgainOnClose)
			{
				div.appendChild(chk);
				
				var label = document.createElement('label');
				label.setAttribute('for', 'geDoNotShowAgainCheckbox');
				mxUtils.write(label, mxResources.get('doNotShowAgain'));
				div.appendChild(label);
				banner.style.paddingBottom = (small) ? '16px' : '30px';
				banner.appendChild(div);
			}
			
			var onclose = mxUtils.bind(this, function()
			{
				if (banner.parentNode != null)
				{
					banner.parentNode.removeChild(banner);
					this.bannerShowing = false;
					
					if (chk.checked || doNotShowAgainOnClose)
					{
						this['hideBanner' + id] = true;
	
						if (isLocalStorage && mxSettings.settings != null)
						{
							mxSettings.settings['close' + id] = Date.now();
							mxSettings.save();
						}
					}
				}
			});
			
			if (img != null)
			{
				mxEvent.addListener(img, 'click', mxUtils.bind(this, function(e)
				{
					mxEvent.consume(e);
					onclose();
				}));
			}
			
			var hide = mxUtils.bind(this, function()
			{
				mxUtils.setPrefixedStyle(banner.style, 'transform', t1);
				
				window.setTimeout(mxUtils.bind(this, function()
				{
					onclose();
				}), delay);
			});
			
			mxEvent.addListener(banner, 'click', mxUtils.bind(this, function(e)
			{
				var source = mxEvent.getSource(e);
				
				if (source != chk && source != label)
				{
					if (onclick != null)
					{
						onclick();
					}
					
					onclose();
					mxEvent.consume(e);
				}
				else
				{
					hide();
				}
			}));
			
			window.setTimeout(mxUtils.bind(this, function()
			{
				mxUtils.setPrefixedStyle(banner.style, 'transform', t2);
			}), delay / 2);
			
			window.setTimeout(hide, (small) ? 4000 : 30000);
			result = true;
		}
		
		return result;
	};

	/**
	 * Translates this point by the given vector.
	 * 
	 * @param {number} dx X-coordinate of the translation.
	 * @param {number} dy Y-coordinate of the translation.
	 */
	EditorUi.prototype.setCurrentFile = function(file)
	{
		if (file != null)
		{
			file.opened = new Date();
		}
		
		this.currentFile = file;
	};

	/**
	 * Translates this point by the given vector.
	 * 
	 * @param {number} dx X-coordinate of the translation.
	 * @param {number} dy Y-coordinate of the translation.
	 */
	EditorUi.prototype.getCurrentFile = function()
	{
		return this.currentFile;
	};
	
	/**
	 * Handling for canvas export.
	 */
	EditorUi.prototype.isExportToCanvas = function()
	{
		return this.editor.isExportToCanvas();
	};

	/**
	 * 
	 */
	EditorUi.prototype.createImageDataUri = function(canvas, xml, format, dpi)
	{
		var data = canvas.toDataURL('image/' + format);
		
		// Checks for valid output
		if (data != null && data.length > 6)
		{
			if (xml != null)
			{
				data = Editor.writeGraphModelToPng(data, 'tEXt', 'mxfile', encodeURIComponent(xml));
			}
			
			if (dpi > 0)
			{
				data = Editor.writeGraphModelToPng(data, 'pHYs', 'dpi', dpi);
			}
		}
		else
		{
			throw {message: mxResources.get('unknownError')};
		}
		
		return data;
	};
	
	/**
	 * 
	 */
	EditorUi.prototype.saveCanvas = function(canvas, xml, format, ignorePageName, dpi)
	{
		var ext = ((format == 'jpeg') ? 'jpg' : format);
		var filename = this.getBaseFilename(ignorePageName) +
			((xml != null) ? '.drawio' : '') + '.' + ext;
   	    var data = this.createImageDataUri(canvas, xml, format, dpi);

   	    this.saveData(filename, ext, data.substring(data.lastIndexOf(',') + 1), 'image/' + format, true);
	};
	
	/**
	 * Returns true if files should be saved using <saveLocalFile>.
	 */
	EditorUi.prototype.isLocalFileSave = function()
	{
		return ((urlParams['save'] != 'remote' && (mxClient.IS_IE ||
			(typeof window.Blob !== 'undefined' && typeof window.URL !== 'undefined')) &&
			document.documentMode != 9 && document.documentMode != 8 &&
			document.documentMode != 7) ||
			this.isOfflineApp() || mxClient.IS_IOS);
	};
	
	/**
	 * Translates this point by the given vector.
	 * 
	 * @param {number} dx X-coordinate of the translation.
	 * @param {number} dy Y-coordinate of the translation.
	 */
	EditorUi.prototype.showTextDialog = function(title, text)
	{
    	var dlg = new TextareaDialog(this, title, text, null, null, mxResources.get('close'));
		this.showDialog(dlg.container, 620, 460, true, true, null, null, null, null, true);
		dlg.init();
		document.execCommand('selectall', false, null);
	};
	
	/**
	 * Translates this point by the given vector.
	 * 
	 * @param {number} dx X-coordinate of the translation.
	 * @param {number} dy Y-coordinate of the translation.
	 */
	EditorUi.prototype.doSaveLocalFile = function(data, filename, mimeType, base64Encoded, format, defaultExtension)
	{
		// Appends .drawio extension for XML files with no extension
		// to avoid the browser to automatically append .xml instead
		if (mimeType == 'text/xml' &&
			!/(\.drawio)$/i.test(filename) &&
			!/(\.xml)$/i.test(filename) &&
			!/(\.svg)$/i.test(filename) &&
			!/(\.html)$/i.test(filename))
		{
			defaultExtension = (defaultExtension != null) ? defaultExtension : 'drawio';
			filename = filename + '.' + defaultExtension;
		}
		
		// Newer versions of IE
		if (window.Blob && navigator.msSaveOrOpenBlob)
		{
			var blob = (base64Encoded) ?
					this.base64ToBlob(data, mimeType) :
					new Blob([data], {type: mimeType})
			navigator.msSaveOrOpenBlob(blob, filename);
		}
		// Older versions of IE (binary not supported)
		else if (mxClient.IS_IE)
		{
			var win = window.open('about:blank', '_blank');
			
			if (win == null)
			{
				mxUtils.popup(data, true);
			}
			else
			{
				win.document.write(data);
				win.document.close();
				win.document.execCommand('SaveAs', true, filename);
				win.close();
			}
		}
		else if (mxClient.IS_IOS && this.isOffline())
		{
			// Workaround for "WebKitBlobResource error 1" in mobile Safari
			if (!navigator.standalone && mimeType != null && mimeType.substring(0, 6) == 'image/')
			{
				this.openInNewWindow(data, mimeType, base64Encoded);
			}
			else
			{
				this.showTextDialog(filename + ':', data);
			}
		}
		else
		{
			var a = document.createElement('a');
			
			// Workaround for mxXmlRequest.simulate no longer working in PaleMoon
			// if this is used (ie PNG export broken after XML export in PaleMoon)
			// and for "WebKitBlobResource error 1" for all browsers on iOS.
			var useDownload = (navigator.userAgent == null ||
				navigator.userAgent.indexOf("PaleMoon/") < 0) &&
				typeof a.download !== 'undefined';
			
			// Workaround for Chromium 65 cross-domain anchor download issue
			if (mxClient.IS_GC && navigator.userAgent != null)
			{
				var raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)
				var vers = raw ? parseInt(raw[2], 10) : false;
				useDownload = vers == 65 ? false : useDownload;
			}
			
			if (useDownload || this.isOffline())
			{
				a.href = URL.createObjectURL((base64Encoded) ?
					this.base64ToBlob(data, mimeType) :
					new Blob([data], {type: mimeType}));
				
				if (useDownload)
				{
					a.download = filename;
				}
				else
				{
					// Workaround for same window in Safari
					a.setAttribute('target', '_blank');
				}

				document.body.appendChild(a);
				
				try
				{
					window.setTimeout(function()
					{
						URL.revokeObjectURL(a.href);
					}, 20000);

					a.click();
					a.parentNode.removeChild(a);
				}
				catch (e)
				{
					// ignore
				}
			}
			else
			{
				var req = this.createEchoRequest(data, filename, mimeType, base64Encoded, format);
				
				req.simulate(document, '_blank');
			}
		}
	};
		
	/**
	 * Translates this point by the given vector.
	 * 
	 * @param {number} dx X-coordinate of the translation.
	 * @param {number} dy Y-coordinate of the translation.
	 */
	EditorUi.prototype.createEchoRequest = function(data, filename, mimeType, base64Encoded, format, base64Response)
	{
		var param = (typeof(pako) === 'undefined' || true) ? 'xml=' + encodeURIComponent(data) :
			'data=' + encodeURIComponent(Graph.compress(data));
		
		return new mxXmlRequest(SAVE_URL, param +
			((mimeType != null) ? '&mime=' + mimeType : '') +
			((format != null) ? '&format=' + format : '') +
			((base64Response != null) ? '&base64=' + base64Response : '') +
			((filename != null) ? '&filename=' + encodeURIComponent(filename) : '') +
			((base64Encoded) ? '&binary=1' : ''));
	};
	
	/**
	 * Translates this point by the given vector.
	 * 
	 * @param {number} dx X-coordinate of the translation.
	 * @param {number} dy Y-coordinate of the translation.
	 */
	EditorUi.prototype.base64ToBlob = function(base64Data, contentType)
	{
	    contentType = contentType || '';
	    var sliceSize = 1024;
	    var byteCharacters = atob(base64Data);
	    var bytesLength = byteCharacters.length;
	    var slicesCount = Math.ceil(bytesLength / sliceSize);
	    var byteArrays = new Array(slicesCount);
	
	    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex)
	    {
	        var begin = sliceIndex * sliceSize;
	        var end = Math.min(begin + sliceSize, bytesLength);
	
	        var bytes = new Array(end - begin);
	        
	        for (var offset = begin, i = 0 ; offset < end; ++i, ++offset)
	        {
	            bytes[i] = byteCharacters[offset].charCodeAt(0);
	        }
	        
	        byteArrays[sliceIndex] = new Uint8Array(bytes);
	    }
	
	    return new Blob(byteArrays, {type: contentType});
	};

	/**
	 * Translates this point by the given vector.
	 * 
	 * @param {number} dx X-coordinate of the translation.
	 * @param {number} dy Y-coordinate of the translation.
	 */
	EditorUi.prototype.saveLocalFile = function(data, filename, mimeType, base64Encoded, format, allowBrowser, allowTab, defaultExtension)
	{
		allowBrowser = (allowBrowser != null) ? allowBrowser : false;
		allowTab = (allowTab != null) ? allowTab : (format != 'vsdx') && (!mxClient.IS_IOS || !navigator.standalone);

		var saveFunction = mxUtils.bind(this, function(newTitle, mode, input, folderId)
		{
			try
			{
				// Opens a new window
				if (mode == '_blank')
				{
					if (mimeType != null && mimeType.substring(0, 6) == 'image/')
					{
						this.openInNewWindow(data, mimeType, base64Encoded);
					}
					else if (mimeType != null && mimeType.substring(0, 9) == 'text/html')
					{
						var dlg = new EmbedDialog(this, data);
						this.showDialog(dlg.container, 450, 240, true, true);
						dlg.init();
					}
					else
					{
						var win = window.open('about:blank');
						
						if (win == null)
						{
							mxUtils.popup(data, true);
						}
						else
						{
							win.document.write('<pre>' + mxUtils.htmlEntities(data, false) + '</pre>');
							win.document.close();
						}
					}
				}
				else if (mode == App.MODE_DEVICE || mode == 'download')
				{
					this.doSaveLocalFile(data, newTitle, mimeType, base64Encoded, null, defaultExtension);
				} 
				else if (newTitle != null && newTitle.length > 0)
				{
					var saveFile = mxUtils.bind(this, function(folderId)
					{
						try
						{
							this.exportFile(data, newTitle, mimeType, base64Encoded, mode, folderId);
						}
						catch (e)
						{
							this.handleError(e);
						}
					});

					if (folderId != null)
					{
						saveFile(folderId);
					}
					else
					{
						this.pickFolder(mode, saveFile);
					}
				}
			}
			catch (e)
			{
				this.handleError(e);
			}
		});
		
		if (urlParams['save-dialog'] == '1')
		{
			var disabled = [];

			if (!allowBrowser)
			{
				disabled.push(App.MODE_BROWSER);
			}

			if (!allowTab)
			{
				disabled.push('_blank');
			}

			var dlg = new SaveDialog(this, filename, mxUtils.bind(this, function(input, mode, folderId)
			{
				saveFunction(input.value, mode, input, folderId);
				this.hideDialog();
			}), disabled, data, mimeType, base64Encoded);

			this.showDialog(dlg.container, 420, 100, true, false, mxUtils.bind(this, function()
			{
				this.hideDialog();
			}));

			dlg.init();
		}
		else
		{
			var count = this.getServiceCount(allowBrowser);
			
			if (isLocalStorage)
			{
				count++;
			}
			
			var rowLimit = (count <= 4) ? 2 : (count > 6 ? 4 : 3);
			
			var dlg = new CreateDialog(this, filename, saveFunction, mxUtils.bind(this, function()
			{
				this.hideDialog();
			}), mxResources.get('saveAs'), mxResources.get('download'), false, allowBrowser, allowTab,
				null, count > 1, rowLimit, data, mimeType, base64Encoded);
			var height = (this.isServices(count)) ? ((count > rowLimit) ? 390 : 280) : 160;
			this.showDialog(dlg.container, 420, height, true, true);
			dlg.init();
		}
	};
	
	/**
	 * 
	 */
	EditorUi.prototype.openInNewWindow = function(data, mimeType, base64Encoded)
	{
		var win = window.open('about:blank');
		
		if (win == null || win.document == null)
		{
			mxUtils.popup(data, true);
		}
		else
		{
			if (mimeType == 'image/svg+xml' && !mxClient.IS_SVG)
			{
				win.document.write('<html><pre>' + mxUtils.htmlEntities(data, false) + '</pre></html>');
				win.document.close();
			}
			else
			{
				if (mimeType == 'image/svg+xml' && !base64Encoded)
				{
					win.document.write('<html>'+ data + '</html>');
				}
				else
				{
					var temp = (base64Encoded) ? data : btoa(unescape(encodeURIComponent(data)));
				
					win.document.write('<html><img style="max-width:100%;" src="data:' +
						mimeType  + ';base64,' + temp + '"/></html>');
				}
				
				win.document.close();
			}
		}
	};
	
	var editoUiAddChromelessToolbarItems = EditorUi.prototype.addChromelessToolbarItems;

	/**
	 * Image export in viewer is only allowed for same domain or hosted environments
	 * but disabled to avoid cross domain image export in canvas which isn't allowed.
	 */
	EditorUi.prototype.isChromelessImageExportEnabled = function()
	{
		return this.getServiceName() != 'draw.io' ||
			/.*\.draw\.io$/.test(window.location.hostname) ||
			/.*\.diagrams\.net$/.test(window.location.hostname);
	};

	/**
	 * Creates a temporary graph instance for rendering off-screen content.
	 */
	EditorUi.prototype.addChromelessToolbarItems = function(addButton)
	{
		if (urlParams['tags'] != null)
		{
			this.tagsComponent = null;
			this.tagsDialog = null;
					
			var tagsButton = addButton(mxUtils.bind(this, function(evt)
			{
				if (this.tagsComponent == null)
				{
					this.tagsComponent = this.editor.graph.createTagsDialog(mxUtils.bind(this, function()
					{
						return this.tagsDialog != null;
					}), true);

					this.tagsComponent.div.getElementsByTagName('div')[0].style.position = '';
					mxUtils.setPrefixedStyle(this.tagsComponent.div.style, 'borderRadius', '5px');
					this.tagsComponent.div.className = 'geScrollable';
					this.tagsComponent.div.style.maxHeight = '160px';
					this.tagsComponent.div.style.maxWidth = '120px';
					this.tagsComponent.div.style.padding = '4px';
					this.tagsComponent.div.style.overflow = 'auto';
					this.tagsComponent.div.style.height = 'auto';
					this.tagsComponent.div.style.position = 'fixed';
					this.tagsComponent.div.style.fontFamily = Editor.defaultHtmlFont;

					if (!mxClient.IS_IE && !mxClient.IS_IE11)
					{
						this.tagsComponent.div.style.backgroundColor = '#000000';
						this.tagsComponent.div.style.color = '#ffffff';
						mxUtils.setOpacity(this.tagsComponent.div, 80);
					}
					else
					{
						this.tagsComponent.div.style.backgroundColor = '#ffffff';
						this.tagsComponent.div.style.border = '2px solid black';
						this.tagsComponent.div.style.color = '#000000';
					}
				}

				if (this.tagsDialog != null)
				{
					this.tagsDialog.parentNode.removeChild(this.tagsDialog);
					this.tagsDialog = null;
				}
				else
				{
					this.tagsDialog = this.tagsComponent.div;

					mxEvent.addListener(this.tagsDialog, 'mouseleave', mxUtils.bind(this, function()
					{
						if (this.tagsDialog != null)
						{
							this.tagsDialog.parentNode.removeChild(this.tagsDialog);
							this.tagsDialog = null;
						}
					}));
					
					var r = tagsButton.getBoundingClientRect();
					this.tagsDialog.style.left = r.left + 'px';
					this.tagsDialog.style.bottom = parseInt(this.chromelessToolbar.style.bottom) +
						this.chromelessToolbar.offsetHeight + 4 + 'px';
					
					// Puts the dialog on top of the container z-index
					var style = mxUtils.getCurrentStyle(this.editor.graph.container);
					this.tagsDialog.style.zIndex = style.zIndex;
					document.body.appendChild(this.tagsDialog);

					this.tagsComponent.refresh();
					this.editor.fireEvent(new mxEventObject('tagsDialogShown'));
				}
				
				mxEvent.consume(evt);
			}), Editor.tagsImage, mxResources.get('tags'));

			// Shows/hides tags button depending on content
			var model = this.editor.graph.getModel();

			model.addListener(mxEvent.CHANGE, mxUtils.bind(this, function()
			{
				var tags = this.editor.graph.getAllTags();
				tagsButton.style.display = (tags.length > 0) ? '' : 'none';
			}));
		}
	
		editoUiAddChromelessToolbarItems.apply(this, arguments);

		this.editor.addListener('tagsDialogShown', mxUtils.bind(this, function()
		{
			if (this.layersDialog != null)
			{
				this.layersDialog.parentNode.removeChild(this.layersDialog);
				this.layersDialog = null;
			}
		}));

		this.editor.addListener('layersDialogShown', mxUtils.bind(this, function()
		{
			if (this.tagsDialog != null)
			{
				this.tagsDialog.parentNode.removeChild(this.tagsDialog);
				this.tagsDialog = null;
			}
		}));

		this.editor.addListener('pageSelected', mxUtils.bind(this, function()
		{
			if (this.tagsDialog != null)
			{
				this.tagsDialog.parentNode.removeChild(this.tagsDialog);
				this.tagsDialog = null;
			}
			
			if (this.layersDialog != null)
			{
				this.layersDialog.parentNode.removeChild(this.layersDialog);
				this.layersDialog = null;
			}
		}));

		mxEvent.addListener(this.editor.graph.container, 'click', mxUtils.bind(this, function()
		{
			if (this.tagsDialog != null)
			{
				this.tagsDialog.parentNode.removeChild(this.tagsDialog);
				this.tagsDialog = null;
			}
			
			if (this.layersDialog != null)
			{
				this.layersDialog.parentNode.removeChild(this.layersDialog);
				this.layersDialog = null;
			}
		}));

		if (this.isExportToCanvas() && this.isChromelessImageExportEnabled())
		{
			this.exportDialog = null;
			
			var exportButton = addButton(mxUtils.bind(this, function(evt)
			{
				var clickHandler = mxUtils.bind(this, function()
				{
					mxEvent.removeListener(this.editor.graph.container, 'click', clickHandler);
					
					if (this.exportDialog != null)
					{
						this.exportDialog.parentNode.removeChild(this.exportDialog);
						this.exportDialog = null;
					}
				});
				
				if (this.exportDialog != null)
				{
					clickHandler.apply(this);
				}
				else
				{
					this.exportDialog = document.createElement('div');
					var r = exportButton.getBoundingClientRect();
					
					mxUtils.setPrefixedStyle(this.exportDialog.style, 'borderRadius', '5px');
					this.exportDialog.style.position = 'fixed';
					this.exportDialog.style.textAlign = 'center';
					this.exportDialog.style.fontFamily = Editor.defaultHtmlFont;
					this.exportDialog.style.backgroundColor = '#000000';
					this.exportDialog.style.width = '50px';
					this.exportDialog.style.height = '50px';
					this.exportDialog.style.padding = '4px 2px 4px 2px';
					this.exportDialog.style.color = '#ffffff';
					mxUtils.setOpacity(this.exportDialog, 80);
					this.exportDialog.style.left = r.left + 'px';
					this.exportDialog.style.bottom = parseInt(this.chromelessToolbar.style.bottom) +
						this.chromelessToolbar.offsetHeight + 4 + 'px';
					
					// Puts the dialog on top of the container z-index
					var style = mxUtils.getCurrentStyle(this.editor.graph.container);
					this.exportDialog.style.zIndex = style.zIndex;
					
					var spinner = new Spinner({
						lines: 8, // The number of lines to draw
						length: 6, // The length of each line
						width: 5, // The line thickness
						radius: 6, // The radius of the inner circle
						rotate: 0, // The rotation offset
						color: '#fff', // #rgb or #rrggbb
						speed: 1.5, // Rounds per second
						trail: 60, // Afterglow percentage
						shadow: false, // Whether to render a shadow
						hwaccel: false, // Whether to use hardware acceleration
						top: '28px',
						zIndex: 2e9 // The z-index (defaults to 2000000000)
					});

					spinner.spin(this.exportDialog);
				   	document.body.appendChild(this.exportDialog);
					mxEvent.addListener(this.editor.graph.container, 'click', clickHandler);
					
				   	this.editor.exportToCanvas(mxUtils.bind(this, function(canvas)
				   	{
				   		spinner.stop();
				   		
						this.exportDialog.style.width = 'auto';
						this.exportDialog.style.height = 'auto';
						this.exportDialog.style.padding = '10px';
				   		
			   	   	    var data = this.createImageDataUri(canvas, null, 'png');
			   	   	    var img = document.createElement('img');
			   	   	    
			   	   	    img.style.maxWidth = '140px';
			   	   	    img.style.maxHeight = '140px';
			   	   	    img.style.cursor = 'pointer';
			   	   	    img.style.backgroundColor = 'white';
			   	   	    
			   	   	    img.setAttribute('title', mxResources.get('openInNewWindow'));
			   	   	    img.setAttribute('border', '0');
			   	   	    img.setAttribute('src', data);
			   	   	    
			   	   	    this.exportDialog.appendChild(img);

						mxEvent.addListener(img, 'click', mxUtils.bind(this, function()
						{
							this.openInNewWindow(data.substring(data.indexOf(',') + 1), 'image/png', true);
							clickHandler.apply(this, arguments);
						}));
				   	}), null, this.thumbImageCache, null, mxUtils.bind(this, function(e)
				   	{
				   		spinner.stop();
						
						if (this.exportDialog != null && this.exportDialog.parentNode != null)
						{
							this.exportDialog.parentNode.removeChild(this.exportDialog);
							this.exportDialog = null;
						}

				   		this.handleError(e);
				   	}), null, null, null, null, null, null, null, Editor.defaultBorder);
				}
				
				mxEvent.consume(evt);
			}), Editor.cameraImage, mxResources.get('export'));
		}
	};

	/**
	 * Translates this point by the given vector.
	 * 
	 * @param {number} dx X-coordinate of the translation.
	 * @param {number} dy Y-coordinate of the translation.
	 */
	EditorUi.prototype.saveData = function(filename, format, data, mime, base64Encoded)
	{
		if (this.isLocalFileSave())
		{
			this.saveLocalFile(data, filename, mime, base64Encoded, format);
		}
		else
		{
			this.saveRequest(filename, format, mxUtils.bind(this, function(newTitle, base64)
			{
				return this.createEchoRequest(data, newTitle, mime, base64Encoded, format, base64);
			}), data, base64Encoded, mime);
		}
	};
	
	/**
	 * Translates this point by the given vector.
	 * 
	 * Last 3 argument are optional and must only be used if the data can be stored as is on the client
	 * side without requiring a server roundtrip.
	 * 
	 * @param {number} dx X-coordinate of the translation.
	 * @param {number} dy Y-coordinate of the translation.
	 */
	EditorUi.prototype.saveRequest = function(filename, format, fn, data, base64Encoded, mimeType, allowTab)
	{
		allowTab = (allowTab != null) ? allowTab : !mxClient.IS_IOS || !navigator.standalone;

		var saveFunction = mxUtils.bind(this, function(newTitle, mode, input, folderId)
		{
			if (mode == '_blank' || newTitle != null && newTitle.length > 0)
			{
				var base64 = (mode == App.MODE_DEVICE || mode == 'download' || mode == null || mode == '_blank') ? '0' : '1';
				var xhr = fn((mode == '_blank') ? null : newTitle, base64);
				
				if (xhr != null)
				{
					if (mode == App.MODE_DEVICE || mode == 'download' || mode == '_blank')
					{
						xhr.simulate(document, '_blank');
					}
					else
					{
						var doSave = mxUtils.bind(this, function(folderId)
						{
							mimeType = (mimeType != null) ? mimeType : ((format == 'pdf') ?
								'application/pdf' : 'image/' + format);
							
							// Workaround for no roundtrip required if data is available on client-side
							// TODO: Refactor the saveData/saveRequest call chain for local data
							if (data != null)
							{
								try
								{
									this.exportFile(data, newTitle, mimeType, true, mode, folderId);
								}
								catch (e)
								{
									this.handleError(e);
								}
							}
							else if (this.spinner.spin(document.body, mxResources.get('saving')))
							{
								// LATER: Catch possible mixed content error
								// see http://stackoverflow.com/questions/30646417/catching-mixed-content-error
								xhr.send(mxUtils.bind(this, function()
								{
									this.spinner.stop();
									
									if (xhr.getStatus() >= 200 && xhr.getStatus() <= 299)
									{
										try
										{
											this.exportFile(xhr.getText(), newTitle, mimeType, true, mode, folderId);
										}
										catch (e)
										{
											this.handleError(e);
										}
									}
									else
									{
										this.handleError({message: mxResources.get('errorSavingFile')});
									}
								}), mxUtils.bind(this, function(resp)
								{
									this.spinner.stop();
									this.handleError(resp);
								}));
							}
						});

						if (folderId != null)
						{
							doSave(folderId);
						}
						else
						{
							this.pickFolder(mode, doSave);
						}
					}
				}
			}
		});

		if (urlParams['save-dialog'] == '1')
		{
			var disabled = [App.MODE_BROWSER];

			if (!allowTab)
			{
				disabled.push('_blank');
			}

			var dlg = new SaveDialog(this, filename, mxUtils.bind(this, function(input, mode, folderId)
			{
				saveFunction(input.value, mode, input, folderId);
				this.hideDialog();
			}), disabled, null, 'application/pdf');

			this.showDialog(dlg.container, 420, 100, true, false, mxUtils.bind(this, function()
			{
				this.hideDialog();
			}));

			dlg.init();
		}
		else
		{
			var count = this.getServiceCount(false);
			
			if (isLocalStorage)
			{
				count++;
			}
			
			var rowLimit = (count <= 4) ? 2 : (count > 6 ? 4 : 3);
			
			var dlg = new CreateDialog(this, filename, saveFunction, mxUtils.bind(this, function()
			{
				this.hideDialog();
			}), mxResources.get('saveAs'), mxResources.get('download'), false, false, allowTab,
				null, count > 1, rowLimit, data, mimeType, base64Encoded);
			
			var height = (this.isServices(count)) ? ((count > 4) ? 390 : 280) : 160;
			this.showDialog(dlg.container, 420, height, true, true);
			dlg.init();
		}
	};

	/**
	 * Returns whether or not any services should be shown in dialogs
	 */
	EditorUi.prototype.isServices = function(count)
	{
		var noServices = 1; //(mxClient.IS_IOS) ? 0 : 1;
		return count != noServices;
	};

	/**
	 * 
	 */
	EditorUi.prototype.getEditBlankXml = function()
	{
		return this.getFileData(true);
	};
		
	/**
	 * Hook for subclassers.
	 */
	EditorUi.prototype.exportFile = function(data, filename, mimeType, base64Encoded, mode, folderId)
	{
		// do nothing
	};

	/**
	 * Hook for subclassers.
	 */
	EditorUi.prototype.getServiceForName = function(name)
	{
		return null;
	};
	
	/**
	 * Hook for subclassers.
	 */
	EditorUi.prototype.getTitleForService = function(name)
	{
		return mxResources.get(name);
	};

	/**
	 * Hook for subclassers.
	 */
	EditorUi.prototype.pickFolder = function(mode, fn, enabled)
	{
		fn(null);
	};

	/**
	 *
	 */
	EditorUi.prototype.exportSvg = function(scale, transparentBackground, ignoreSelection, addShadow,
		editable, embedImages, border, noCrop, currentPage, linkTarget, theme, exportType,
		embedFonts, saveFn)
	{
		if (this.spinner.spin(document.body, mxResources.get('export')))
		{
			try
			{
				var selectionEmpty = this.editor.graph.isSelectionEmpty();
				ignoreSelection = (ignoreSelection != null) ? ignoreSelection : selectionEmpty;
				var bg = (transparentBackground) ? null : this.editor.graph.background;
				
				if (bg == mxConstants.NONE)
				{
					bg = null;
				}
				
				// Handles special case where background is null but transparent is false
				if (bg == null && transparentBackground == false)
				{
					bg = (theme == 'dark' && !Editor.enableSvgDarkMode) ? Editor.darkColor : '#ffffff';
				}
				
				// Sets or disables alternate text for foreignObjects. Disabling is needed
				// because PhantomJS seems to ignore switch statements and paint all text.
				var svgRoot = this.editor.graph.getSvg(bg, scale, border, noCrop, null,
					ignoreSelection, null, null, (linkTarget == 'blank') ? '_blank' :
					((linkTarget == 'self') ? '_top' : null), null, !embedFonts,
					theme, exportType);
				
				if (addShadow)
				{
					this.editor.graph.addSvgShadow(svgRoot);
				}
				
				var filename = this.getBaseFilename() + ((editable) ? '.drawio' : '') + '.svg';

				saveFn = (saveFn != null) ? saveFn : mxUtils.bind(this, function(svg)
				{
		    		if (this.isLocalFileSave() || svg.length <= MAX_REQUEST_SIZE)
		    		{
		    			this.saveData(filename, 'svg', svg, 'image/svg+xml');
		    		}
		    		else
		    		{
		    			this.handleError({message: mxResources.get('drawingTooLarge')},
							mxResources.get('error'), mxUtils.bind(this, function()
						{
							mxUtils.popup(svg);
						}));
				}
				});
	
				var doSave = mxUtils.bind(this, function(svgRoot)
				{
					this.spinner.stop();
					
					if (editable)
					{
						svgRoot.setAttribute('content', this.getFileData(true, null, null, null, ignoreSelection,
							currentPage, null, null, null, false));
					}

					saveFn(Graph.xmlDeclaration + '\n' + ((editable) ? Graph.svgFileComment + '\n' : '') +
						Graph.svgDoctype + '\n' + mxUtils.getXml(svgRoot));
				});

				// Adds CSS
				if (this.editor.graph.mathEnabled)
				{
					this.editor.addMathCss(svgRoot);
				}

				var done = mxUtils.bind(this, function(svgRoot)
				{
					if (embedImages)
					{
						// Caches images
						if (this.thumbImageCache == null)
						{
							this.thumbImageCache = new Object();
						}
						
						this.editor.convertImages(svgRoot, doSave, this.thumbImageCache);
					}
					else
					{
						doSave(svgRoot);
					}
				});

				if (embedFonts)
				{
					this.embedFonts(svgRoot, done);
				}
				else
				{
					this.editor.addFontCss(svgRoot);
					done(svgRoot);
				}
			}
			catch (e)
			{
				this.handleError(e);
			}
		}
	};
	
	/**
	 * 
	 */
	EditorUi.prototype.addRadiobox = function(div, radioGroupName, label, checked, disabled, disableNewline, visible)
	{
		return this.addCheckbox(div, label, checked, disabled, disableNewline, visible, true, radioGroupName);
	};
	
	/**
	 * 
	 */
	EditorUi.prototype.addCheckbox = function(div, label, checked, disabled, disableNewline, visible, asRadio, radioGroupName)
	{
		visible = (visible != null) ? visible : true;
		
		var cb = document.createElement('input');
		cb.style.marginRight = '8px';
		cb.style.marginTop = '16px';
		cb.setAttribute('type', asRadio? 'radio' : 'checkbox');
		var id = 'geCheckbox-' + Editor.guid();
		cb.id = id;
		
		if (radioGroupName != null)
		{
			cb.setAttribute('name', radioGroupName);
		}
		
		if (checked)
		{
			cb.setAttribute('checked', 'checked');
			cb.defaultChecked = true;
		}
		
		if (disabled)
		{
			cb.setAttribute('disabled', 'disabled');
		}
		
		if (visible)
		{
			div.appendChild(cb);
			
			var lbl = document.createElement('label');
			mxUtils.write(lbl, label);
			lbl.setAttribute('for', id);
			div.appendChild(lbl);

			if (!disableNewline)
			{
				mxUtils.br(div);
			}
		}
		
		return cb;
	};
	
	/**
	 * 
	 */
	EditorUi.prototype.addEditButton = function(div, lightbox)
	{
		var edit = this.addCheckbox(div, mxResources.get('edit') + ':', true, null, true);
		edit.style.marginLeft = '24px';
		
		var file = this.getCurrentFile();
		var editUrl = '';
		
		if (file != null && file.getMode() != App.MODE_DEVICE && file.getMode() != App.MODE_BROWSER)
		{
			editUrl = window.location.href;
		}
		
		var editSelect = document.createElement('select');
		editSelect.style.maxWidth = '200px';
		editSelect.style.width = 'auto';
		editSelect.style.marginLeft = '8px';
		editSelect.style.marginRight = '10px';
		editSelect.className = 'geBtn';

		var blankOption = document.createElement('option');
		blankOption.setAttribute('value', 'blank');
		mxUtils.write(blankOption, mxResources.get('makeCopy'));
		editSelect.appendChild(blankOption);

		var customOption = document.createElement('option');
		customOption.setAttribute('value', 'custom');
		mxUtils.write(customOption, mxResources.get('custom') + '...');
		editSelect.appendChild(customOption);
		
		div.appendChild(editSelect);
		
		mxEvent.addListener(editSelect, 'change', mxUtils.bind(this, function()
		{
			if (editSelect.value == 'custom')
			{
				var dlg2 = new FilenameDialog(this, editUrl, mxResources.get('ok'), function(value)
				{
					if (value != null)
					{
						editUrl = value;
					}
					else
					{
						editSelect.value = 'blank';
					}
				}, mxResources.get('url'), null, null, null, null, function()
				{
					editSelect.value = 'blank';
				});
				this.showDialog(dlg2.container, 300, 80, true, false);
				dlg2.init();
			}
		}));
		
		mxEvent.addListener(edit, 'change', mxUtils.bind(this, function()
		{
			if (edit.checked && (lightbox == null || lightbox.checked))
			{
				editSelect.removeAttribute('disabled');
			}
			else
			{
				editSelect.setAttribute('disabled', 'disabled');
			}
		}));

		mxUtils.br(div);
		
		return {
			getLink: function()
			{
				return (edit.checked) ? ((editSelect.value === 'blank') ? '_blank' : editUrl) : null;
			},
			getEditInput: function()
			{
				return edit;
			},
			getEditSelect: function()
			{
				return editSelect;
			}
		};
	}
	
	/**
	 * 
	 */
	EditorUi.prototype.addLinkSection = function(div, showFrameOption)
	{
		mxUtils.write(div, mxResources.get('links') + ':');

		var linkSelect = document.createElement('select');
		linkSelect.style.width = '100px';
		linkSelect.style.padding = '0px';
		linkSelect.style.marginLeft = '8px';
		linkSelect.style.marginRight = '10px';
		linkSelect.className = 'geBtn';

		var autoOption = document.createElement('option');
		autoOption.setAttribute('value', 'auto');
		mxUtils.write(autoOption, mxResources.get('automatic'));
		linkSelect.appendChild(autoOption);

		var blankOption = document.createElement('option');
		blankOption.setAttribute('value', 'blank');
		mxUtils.write(blankOption, mxResources.get('openInNewWindow'));
		linkSelect.appendChild(blankOption);

		var selfOption = document.createElement('option');
		selfOption.setAttribute('value', 'self');
		mxUtils.write(selfOption, mxResources.get('openInThisWindow'));
		linkSelect.appendChild(selfOption);

		if (showFrameOption)
		{
			var frameOption = document.createElement('option');
			frameOption.setAttribute('value', 'frame');
			mxUtils.write(frameOption, mxResources.get('openInThisWindow') +
				' (' + mxResources.get('iframe') + ')');
			linkSelect.appendChild(frameOption);
		}
		
		div.appendChild(linkSelect);
		
		mxUtils.write(div, mxResources.get('borderColor') + ':');
		var linkColor = '#0000ff';
		var linkButton = null;
		
		function updateLinkColor()
		{
			var div = document.createElement('div');
			div.style.width = '100%';
			div.style.height = '100%';
			div.style.boxSizing = 'border-box';

			if (linkColor != null && linkColor != mxConstants.NONE)
			{
				div.style.border = '1px solid black';
				div.style.backgroundColor = linkColor;
			}
			else
			{
				div.style.backgroundPosition = 'center center';
				div.style.backgroundRepeat = 'no-repeat';
				div.style.backgroundImage = 'url(\'' + Dialog.prototype.closeImage + '\')';
			}

			linkButton.innerText = '';
			linkButton.appendChild(div);
		};
		
		linkButton = mxUtils.button('', mxUtils.bind(this, function(evt)
		{
			this.pickColor(linkColor || 'none', function(color)
			{
				linkColor = color;
				updateLinkColor();
			});
			
			mxEvent.consume(evt);
		}));

		updateLinkColor();
		linkButton.style.padding = (mxClient.IS_FF) ? '4px 2px 4px 2px' : '4px';
		linkButton.style.marginLeft = '4px';
		linkButton.style.height = '22px';
		linkButton.style.width = '22px';
		linkButton.style.position = 'relative';
		linkButton.style.top = (mxClient.IS_IE || mxClient.IS_IE11 || mxClient.IS_EDGE) ? '6px' : '1px';
		linkButton.className = 'geColorBtn';
		div.appendChild(linkButton);
		mxUtils.br(div);
		
		return {
			getColor: function()
			{
				return linkColor;
			},
			getTarget: function()
			{
				return linkSelect.value;
			},
			focus: function()
			{
				linkSelect.focus();
			}
		};
	}

	/**
	 * 
	 */
	EditorUi.prototype.createUrlParameters = function(linkTarget, linkColor, allPages, lightbox, editLink, layers, params)
	{
		params = (params != null) ? params : [];
		
		if (lightbox)
		{
			if (EditorUi.lightboxHost != 'https://viewer.diagrams.net' || urlParams['dev'] == '1')
			{
				params.push('lightbox=1');
			}

			if (linkTarget != 'auto')
			{
				params.push('target=' + linkTarget);
			}
			
			if (linkColor != null && linkColor != mxConstants.NONE)
			{
				params.push('highlight=' + ((linkColor.charAt(0) == '#') ?
					linkColor.substring(1) : linkColor));
			}
			
			if (editLink != null && editLink.length > 0)
			{
				params.push('edit=' + encodeURIComponent(editLink));
			}
			
			if (layers)
			{
				params.push('layers=1');
			}
			
			if (this.editor.graph.foldingEnabled)
			{
				params.push('nav=1');
			}
		}
		
		if (allPages && this.currentPage != null && this.pages != null &&
			this.currentPage != this.pages[0])
		{
			params.push('page-id=' + this.currentPage.getId());
		}
		
		return params;
	};
	
	/**
	 * 
	 */
	EditorUi.prototype.createLink = function(linkTarget, linkColor, allPages, lightbox, editLink, layers, url, ignoreFile, params, useOpenParameter)
	{
		params = this.createUrlParameters(linkTarget, linkColor, allPages, lightbox, editLink, layers, params);
		var file = this.getCurrentFile();
		var addTitle = true;
		var data = '';

		if (url != null)
		{
			data = '#U' + encodeURIComponent(url);
		}
		else
		{
			var file = this.getCurrentFile();

			// Fallback to non-public URL for Drive files	
			if (!ignoreFile && file != null && file.constructor == window.DriveFile)
			{
				data = '#' + file.getHash();
				addTitle = false;
			}
			else
			{
				data = '#R' + encodeURIComponent((allPages) ?
					this.getFileData(true, null, null, null, null, null, null, true, null, false) :
					Graph.compress(mxUtils.getXml(this.editor.getGraphXml())))
			}
		}

		if (addTitle && file != null && file.getTitle() != null && file.getTitle() != this.defaultFilename)
		{
			params.push('title=' + encodeURIComponent(file.getTitle()));
		}

		if (useOpenParameter && data.length > 1)
		{
			params.push('open=' + data.substring(1));
			data = '';
		}
		
		return ((lightbox && urlParams['dev'] != '1') ? EditorUi.lightboxHost :
			(((mxClient.IS_CHROMEAPP || EditorUi.isElectronApp ||
			!(/.*\.draw\.io$/.test(window.location.hostname))) ?
			EditorUi.drawHost : 'https://' + window.location.host))) + '/' +
			((params.length > 0) ? '?' + params.join('&') : '') + data;
	};
	
	/**
	 * 
	 */
	EditorUi.prototype.createHtml = function(publicUrl, zoomEnabled, initialZoom, linkTarget,
		linkColor, fit, allPages, layers, tags, lightbox, editLink, fn)
	{
		var s = this.getBasenames();
		var data = {};
		
		if (linkColor != '' && linkColor != mxConstants.NONE)
		{
			data.highlight = linkColor;
		}
		
		if (linkTarget !== 'auto')
		{
			data.target = linkTarget;
		}
		
		if (!lightbox)
		{
			data.lightbox = false;
		}
		
		data.nav = this.editor.graph.foldingEnabled;
		var zoom = parseInt(initialZoom);
		
		if (!isNaN(zoom) && zoom != 100)
		{
			data.zoom = zoom / 100;
		}
		
		var tb = [];
		
		if (allPages)
		{
			tb.push('pages');
			data.resize = true;
			
			if (this.pages != null && this.currentPage != null)
			{
				data.page = mxUtils.indexOf(this.pages, this.currentPage);
			}
		}
		
		if (zoomEnabled)
		{
			tb.push('zoom');
			data.resize = true;
		}
		
		if (layers)
		{
			tb.push('layers');
		}

		if (tags)
		{
			tb.push('tags');
		}
		
		if (tb.length > 0)
		{
			if (lightbox)
			{
				tb.push('lightbox');
			}
			
			data.toolbar = tb.join(' ');
		}

		if (editLink != null && editLink.length > 0)
		{
			data.edit = editLink;
		}
		
		if (publicUrl != null)
		{
			data.url = publicUrl;
		}
		else
		{
			data.xml = this.getFileData(true, null, null, null, null, !allPages);
		}
	
		var value = '<div class="mxgraph" style="' +
			((fit) ? 'max-width:100%;' : '') +
			((tb != '') ? 'border:1px solid transparent;' : '') +
			'" data-mxgraph="' + mxUtils.htmlEntities(JSON.stringify(data)) + '"></div>';
		
		var fetchParam = (publicUrl != null) ? '&fetch=' + encodeURIComponent(publicUrl) : '';
		var s2 = (fetchParam.length > 0) ? (((urlParams['dev'] == '1') ?
			'https://test.draw.io/embed2.js?dev=1' : EditorUi.lightboxHost + '/embed2.js?')) + fetchParam :
			(((urlParams['dev'] == '1') ? 'https://test.draw.io/js/viewer-static.min.js' :
			window.DRAWIO_VIEWER_URL ? window.DRAWIO_VIEWER_URL : EditorUi.lightboxHost + '/js/viewer-static.min.js'));
		var src = '<script type="text/javascript" src="' + s2 + '"></script>';
		
		fn(value, src);
	};

	/**
	 * 
	 */
	EditorUi.prototype.showHtmlDialog = function(btnLabel, helpLink, publicUrl, fn)
	{
		var div = document.createElement('div');
		div.style.whiteSpace = 'nowrap';
		var graph = this.editor.graph;
		
		var hd = document.createElement('h3');
		mxUtils.write(hd, mxResources.get('html'));
		hd.style.cssText = 'width:100%;text-align:center;margin-top:0px;margin-bottom:12px';
		div.appendChild(hd);

		var radioSection = document.createElement('div');
		radioSection.style.cssText = 'border-bottom:1px solid lightGray;padding-bottom:8px;margin-bottom:12px;';

		var publicUrlRadio = document.createElement('input');
		publicUrlRadio.style.cssText = 'margin-right:8px;margin-top:8px;margin-bottom:8px;';
		publicUrlRadio.setAttribute('value', 'url');
		publicUrlRadio.setAttribute('type', 'radio');
		publicUrlRadio.setAttribute('name', 'type-embedhtmldialog');

		var copyRadio = publicUrlRadio.cloneNode(true);
		copyRadio.setAttribute('value', 'copy');
		radioSection.appendChild(copyRadio);
		
		var span = document.createElement('span');
		mxUtils.write(span, mxResources.get('includeCopyOfMyDiagram'));
		radioSection.appendChild(span);
		
		mxUtils.br(radioSection);
		radioSection.appendChild(publicUrlRadio);

		var span = document.createElement('span');
		mxUtils.write(span, mxResources.get('publicDiagramUrl'));
		radioSection.appendChild(span);

		var file = this.getCurrentFile();
		
		if (publicUrl == null && file != null && file.constructor == window.DriveFile)
		{
			var testLink = document.createElement('a');
			testLink.style.paddingLeft = '12px';
			testLink.style.color = 'gray';
			testLink.style.cursor = 'pointer';
			mxUtils.write(testLink, mxResources.get('share'));
			radioSection.appendChild(testLink);
			
			mxEvent.addListener(testLink, 'click', mxUtils.bind(this, function()
			{
				this.hideDialog();
				this.drive.showPermissions(file.getId());
			}));
		}

		copyRadio.setAttribute('checked', 'checked');
		
		if (publicUrl == null)
		{
			publicUrlRadio.setAttribute('disabled', 'disabled');
		}

		div.appendChild(radioSection);

		var linkSection = this.addLinkSection(div);
		var zoom = this.addCheckbox(div, mxResources.get('zoom'), true, null, true);
		mxUtils.write(div, ':');
		
		var zoomInput = document.createElement('input');
		zoomInput.setAttribute('type', 'text');
		zoomInput.style.marginRight = '16px';
		zoomInput.style.width = '60px';
		zoomInput.style.marginLeft = '4px';
		zoomInput.style.marginRight = '12px';
		zoomInput.value = '100%';
		
		div.appendChild(zoomInput);

		var fit = this.addCheckbox(div, mxResources.get('fit'), true);
		var hasPages = this.pages != null && this.pages.length > 1;
		var allPages = allPages = this.addCheckbox(div, mxResources.get('allPages'), hasPages, !hasPages);
		var layers = this.addCheckbox(div, mxResources.get('layers'), true);
		var tags = this.addCheckbox(div, mxResources.get('tags'), true);
		var lightbox = this.addCheckbox(div, mxResources.get('lightbox'), true);

		var editSection = null;
		var h = 380;

		if (EditorUi.enableHtmlEditOption)
		{
			editSection = this.addEditButton(div, lightbox);
			var edit = editSection.getEditInput();
			edit.style.marginBottom = '16px';
			h += 50;

			mxEvent.addListener(lightbox, 'change', function()
			{
				if (lightbox.checked)
				{
					edit.removeAttribute('disabled');
				}
				else
				{
					edit.setAttribute('disabled', 'disabled');
				}
				
				if (edit.checked && lightbox.checked)
				{
					editSection.getEditSelect().removeAttribute('disabled');
				}
				else
				{
					editSection.getEditSelect().setAttribute('disabled', 'disabled');
				}
			});
		}

		var dlg = new CustomDialog(this, div, mxUtils.bind(this, function()
		{
			fn((publicUrlRadio.checked) ? publicUrl : null, zoom.checked, zoomInput.value, linkSection.getTarget(),
				linkSection.getColor(), fit.checked, allPages.checked, layers.checked, tags.checked,
				lightbox.checked, (editSection != null) ? editSection.getLink() : null);
		}), null, btnLabel, helpLink);
		this.showDialog(dlg.container, 340, h, true, true);
		copyRadio.focus();
	};
	
	/**
	 * 
	 */
	EditorUi.prototype.showPublishLinkDialog = function(title, hideShare, width, height, fn, showFrameOption, helpLink, footer)
	{
		var div = document.createElement('div');
		div.style.whiteSpace = 'nowrap';
		var graph = this.editor.graph;
		
		var hd = document.createElement('h3');
		mxUtils.write(hd, title || mxResources.get('publish'));
		hd.style.cssText = 'width:100%;text-align:center;margin-top:0px;margin-bottom:12px';
		div.appendChild(hd);
		
		var file = this.getCurrentFile();
		var dy = 0;
		
		if (file != null && file.constructor == window.DriveFile && !hideShare)
		{
			dy = 80;
			helpLink = (helpLink != null) ? helpLink : 'https://www.drawio.com/doc/faq/google-drive-publicly-publish-diagram';
			var hintSection = document.createElement('div');
			hintSection.style.cssText = 'border-bottom:1px solid lightGray;padding-bottom:14px;padding-top:6px;margin-bottom:14px;text-align:center;';
			
			var text = document.createElement('div');
			text.style.whiteSpace = 'normal';
			mxUtils.write(text, mxResources.get('linkAccountRequired'));
			hintSection.appendChild(text);
			
			var shareBtn = mxUtils.button(mxResources.get('share'), mxUtils.bind(this, function()
			{
				this.drive.showPermissions(file.getId());
			}));
			
			shareBtn.style.marginTop = '12px';
			shareBtn.className = 'geBtn';
			hintSection.appendChild(shareBtn);
			div.appendChild(hintSection);
			
			var testLink = document.createElement('a');
			testLink.style.paddingLeft = '12px';
			testLink.style.color = 'gray';
			testLink.style.fontSize = '11px';
			testLink.style.cursor = 'pointer';
			mxUtils.write(testLink, mxResources.get('check'));
			hintSection.appendChild(testLink);
			
			mxEvent.addListener(testLink, 'click', mxUtils.bind(this, function()
			{
				if (this.spinner.spin(document.body, mxResources.get('loading')))
				{
					this.getPublicUrl(this.getCurrentFile(), mxUtils.bind(this, function(url)
					{
						this.spinner.stop();
						
						var dlg = new ErrorDialog(this, null, mxResources.get((url != null) ?
							'diagramIsPublic' : 'diagramIsNotPublic'), mxResources.get('ok'));
						this.showDialog(dlg.container, 300, 80, true, false);
						dlg.init();
					}));
				}
			}));
		}
		else
		{
			helpLink = (helpLink != null) ? helpLink : 'https://www.drawio.com/doc/faq/publish-diagram-as-link';
		}
		
		var widthInput = null;
		var heightInput = null;
		
		if (width != null || height != null)
		{
			dy += 30;
			mxUtils.write(div, mxResources.get('width') + ':');

			widthInput = document.createElement('input');
			widthInput.setAttribute('type', 'text');
			widthInput.style.marginRight = '16px';
			widthInput.style.width = '50px';
			widthInput.style.marginLeft = '6px';
			widthInput.style.marginRight = '16px';
			widthInput.style.marginBottom = '10px';
			widthInput.value = '100%';
			
			div.appendChild(widthInput);

			mxUtils.write(div, mxResources.get('height') + ':');
			
			heightInput = document.createElement('input');
			heightInput.setAttribute('type', 'text');
			heightInput.style.width = '50px';
			heightInput.style.marginLeft = '6px';
			heightInput.style.marginBottom = '10px';
			heightInput.value = height + 'px';
			
			div.appendChild(heightInput);
			mxUtils.br(div);
		}
		
		var linkSection = this.addLinkSection(div, showFrameOption);
		var hasPages = this.pages != null && this.pages.length > 1;
		var allPages = null;
		
		if (file == null || file.constructor != window.DriveFile || hideShare)
		{
			allPages = this.addCheckbox(div, mxResources.get('allPages'), hasPages, !hasPages);
		}
		
		var lightbox = this.addCheckbox(div, mxResources.get('lightbox'), true, null, null, !showFrameOption);
		var editSection = this.addEditButton(div, lightbox);
		var edit = editSection.getEditInput();

		// Cannot disable lightbox in iframes
		if (showFrameOption)
		{
			edit.style.marginLeft = lightbox.style.marginLeft;
			lightbox.style.display = 'none';
			dy -= 20;
		}
		
		var layers = this.addCheckbox(div, mxResources.get('layers'), true);
		layers.style.marginLeft = edit.style.marginLeft;
		layers.style.marginTop = '8px';
				
		var tags = this.addCheckbox(div, mxResources.get('tags'), true);
		tags.style.marginLeft = edit.style.marginLeft;
		tags.style.marginBottom = '16px';
		tags.style.marginTop = '16px';

		mxEvent.addListener(lightbox, 'change', function()
		{
			if (lightbox.checked)
			{
				layers.removeAttribute('disabled');
				edit.removeAttribute('disabled');
			}
			else
			{
				layers.setAttribute('disabled', 'disabled');
				edit.setAttribute('disabled', 'disabled');
			}
			
			if (edit.checked && lightbox.checked)
			{
				editSection.getEditSelect().removeAttribute('disabled');
			}
			else
			{
				editSection.getEditSelect().setAttribute('disabled', 'disabled');
			}
		});
		
		var dlg = new CustomDialog(this, div, mxUtils.bind(this, function()
		{
			fn(linkSection.getTarget(), linkSection.getColor(),
				(allPages == null) ? true : allPages.checked,
				lightbox.checked, editSection.getLink(),
				layers.checked, (widthInput != null) ? widthInput.value : null,
				(heightInput != null) ? heightInput.value : null, tags.checked);
		}), null, mxResources.get('create'), helpLink, footer);
		this.showDialog(dlg.container, 340, 300 + dy, true, true);
		
		if (widthInput != null)
		{
			widthInput.focus();
			
			if (mxClient.IS_GC || mxClient.IS_FF || document.documentMode >= 5)
			{
				widthInput.select();
			}
			else
			{
				document.execCommand('selectAll', false, null);
			}
		}
		else
		{
			linkSection.focus();
		}
	};

	/**
	 * 
	 */
	EditorUi.prototype.showRemoteExportDialog = function(btnLabel, helpLink, callback, hideInclude, showZoomBorder)
	{
		var div = document.createElement('div');
		div.style.whiteSpace = 'nowrap';
		
		var hd = document.createElement('h3');
		mxUtils.write(hd, mxResources.get('image'));
		hd.style.cssText = 'width:100%;text-align:center;margin-top:0px;margin-bottom:' + (showZoomBorder? '10' : '4') +'px';
		div.appendChild(hd);

		if (showZoomBorder)
		{
			mxUtils.write(div, mxResources.get('zoom') + ':');
			var zoomInput = document.createElement('input');
			zoomInput.setAttribute('type', 'text');
			zoomInput.style.marginRight = '16px';
			zoomInput.style.width = '60px';
			zoomInput.style.marginLeft = '4px';
			zoomInput.style.marginRight = '12px';
			zoomInput.value = this.lastExportZoom || '100%';
			div.appendChild(zoomInput);
			
			mxUtils.write(div, mxResources.get('borderWidth') + ':');
			var borderInput = document.createElement('input');
			borderInput.setAttribute('type', 'text');
			borderInput.style.marginRight = '16px';
			borderInput.style.width = '60px';
			borderInput.style.marginLeft = '4px';
			borderInput.value = this.lastExportBorder || '0';
			div.appendChild(borderInput);
			mxUtils.br(div);
		}
		
		var selection = this.addCheckbox(div, mxResources.get('selectionOnly'), false,
			this.editor.graph.isSelectionEmpty());
		var include = (hideInclude) ? null : this.addCheckbox(div, mxResources.get('includeCopyOfMyDiagram'),
			Editor.defaultIncludeDiagram);
		
		var graph = this.editor.graph;
		var transparent = (hideInclude) ? null : this.addCheckbox(div, mxResources.get('transparentBackground'),
				graph.background == mxConstants.NONE || graph.background == null);

		if (transparent != null)
		{
			transparent.style.marginBottom = '16px';
		}
		
		var dlg = new CustomDialog(this, div, mxUtils.bind(this, function()
		{
			var scale = parseInt(zoomInput.value) / 100 || 1;
			var border = parseInt(borderInput.value) || 0;
			
			callback(!selection.checked, (include != null) ? include.checked : false,
				(transparent != null) ? transparent.checked : false, scale, border);
		}), null, btnLabel, helpLink);
		this.showDialog(dlg.container, 300, (showZoomBorder? 25 : 0) + (hideInclude ? 125 : 210), true, true);
	};
	
	/**
	 * 
	 */
	EditorUi.prototype.showExportDialog = function(title, embedOption, btnLabel, helpLink, callback,
		cropOption, defaultInclude, format, exportOption)
	{
		defaultInclude = (defaultInclude != null) ? defaultInclude : Editor.defaultIncludeDiagram;
		
		var div = document.createElement('div');
		div.style.whiteSpace = 'nowrap';
		var graph = this.editor.graph;
		var height = (format == 'jpeg') ? 220 : 300;
		
		var hd = document.createElement('h3');
		mxUtils.write(hd, title);
		hd.style.cssText = 'width:100%;text-align:center;margin-top:0px;margin-bottom:10px';
		div.appendChild(hd);

		mxUtils.write(div, mxResources.get('zoom') + ':');
		var zoomInput = document.createElement('input');
		zoomInput.setAttribute('type', 'text');
		zoomInput.style.marginRight = '16px';
		zoomInput.style.width = '60px';
		zoomInput.style.marginLeft = '4px';
		zoomInput.style.marginRight = '12px';
		zoomInput.value = this.lastExportZoom || '100%';
		div.appendChild(zoomInput);
		
		mxUtils.write(div, mxResources.get('borderWidth') + ':');
		var borderInput = document.createElement('input');
		borderInput.setAttribute('type', 'text');
		borderInput.style.marginRight = '16px';
		borderInput.style.width = '60px';
		borderInput.style.marginLeft = '4px';
		borderInput.value = this.lastExportBorder || '0';
		div.appendChild(borderInput);
		mxUtils.br(div);

		var selection = this.addCheckbox(div, mxResources.get('selectionOnly'),
			false, graph.isSelectionEmpty());

		var cb6 = document.createElement('input');
		cb6.style.marginTop = '16px';
		cb6.style.marginRight = '8px';
		cb6.style.marginLeft = '24px';
		cb6.setAttribute('disabled', 'disabled');
		cb6.setAttribute('type', 'checkbox');

		var exportSelect = document.createElement('select');
		exportSelect.style.marginTop = '16px';
		exportSelect.style.marginLeft = '8px';

		var sizes = ['selectionOnly', 'diagram', 'page'];
		var sizesOpt = {};

		for (var i = 0; i < sizes.length; i++)
		{
			if (!graph.isSelectionEmpty() || sizes[i] != 'selectionOnly')
			{
				var opt = document.createElement('option');
				mxUtils.write(opt, mxResources.get(sizes[i]));
				opt.setAttribute('value', sizes[i]);
				exportSelect.appendChild(opt);
				sizesOpt[sizes[i]] = opt;
			}
		}

		if (exportOption)
		{
			mxUtils.write(div, mxResources.get('size') + ':');
			div.appendChild(exportSelect);
			mxUtils.br(div);
			height += 26;

			mxEvent.addListener(exportSelect, 'change', function()
			{
				if (exportSelect.value == 'selectionOnly')
				{
					selection.checked = true;
				}
			});
		}
		else if (cropOption)
		{
			div.appendChild(cb6);
			mxUtils.write(div, mxResources.get('crop'));
			mxUtils.br(div);
			
			height += 30;
			
			mxEvent.addListener(selection, 'change', function()
			{
				if (selection.checked)
				{
					cb6.removeAttribute('disabled');
				}
				else
				{
					cb6.setAttribute('disabled', 'disabled');
				}
			});
		}

		if (graph.isSelectionEmpty())
		{
			if (exportOption)
			{
				selection.style.display = 'none';
				selection.nextSibling.style.display = 'none';
				selection.nextSibling.nextSibling.style.display = 'none';
				height -= 30;
			}
		}
		else
		{
			exportSelect.value = 'diagram';
			cb6.setAttribute('checked', 'checked');
			cb6.defaultChecked = true;

			mxEvent.addListener(selection, 'change', function()
			{
				if (selection.checked)
				{
					exportSelect.value = 'selectionOnly';
				}
				else
				{
					exportSelect.value = 'diagram';
				}
			});
		}
				
		var defaultTransparent = false; /*graph.background == mxConstants.NONE || graph.background == null*/; 
		var transparent = this.addCheckbox(div, mxResources.get('transparentBackground'),
			defaultTransparent, null, null, format != 'jpeg');

		var themeSelect = null;

		if (Editor.isDarkMode() || Editor.enableCssDarkMode)
		{
			var themeSelect = document.createElement('select');
			themeSelect.style.maxWidth = '260px';
			themeSelect.style.marginLeft = '8px';
			themeSelect.style.marginTop = '16px';
	
			var lightOption = document.createElement('option');
			lightOption.setAttribute('value', 'light');
			mxUtils.write(lightOption, mxResources.get('light'));
			themeSelect.appendChild(lightOption);
	
			var darkOption = document.createElement('option');
			darkOption.setAttribute('value', 'dark');
			mxUtils.write(darkOption, mxResources.get('dark'));
			themeSelect.appendChild(darkOption);
			
			if (Editor.enableCssDarkMode && format == 'svg')
			{
				var autoOption = document.createElement('option');
				autoOption.setAttribute('value', 'auto');
				mxUtils.write(autoOption, mxResources.get('automatic'));
				themeSelect.appendChild(autoOption);
			}

			mxUtils.write(div, mxResources.get('appearance') + ':');
			div.appendChild(themeSelect);
			mxUtils.br(div);

			if (Editor.isDarkMode() || Editor.cssDarkMode)
			{
				darkOption.setAttribute('selected', 'selected');
			}
			else
			{
				lightOption.setAttribute('selected', 'selected');
			}
			
			height += 26;
		}
		
		var shadow = this.addCheckbox(div, mxResources.get('shadow'), graph.shadowVisible);
				
		var grid = null;
		
		if (format == 'png' || format == 'jpeg')
		{
			grid = this.addCheckbox(div, mxResources.get('grid'), false,
				this.isOffline() || !this.canvasSupported, false, true); 
			height += 30;
		}
		
		var include = this.addCheckbox(div, mxResources.get('includeCopyOfMyDiagram'),
			defaultInclude, null, null, format != 'jpeg');
		include.style.marginBottom = '16px';
		
		var cb5 = document.createElement('input');
		cb5.style.marginBottom = '16px';
		cb5.style.marginRight = '8px';
		cb5.setAttribute('type', 'checkbox');
		
		if (this.isOffline() || !this.canvasSupported)
		{
			cb5.setAttribute('disabled', 'disabled');
		}
		
		var txtSettingsSelect = document.createElement('select');
		txtSettingsSelect.style.maxWidth = '200px';
		txtSettingsSelect.style.marginLeft = '8px';
		txtSettingsSelect.style.marginBottom = '16px';

		var noneOption = document.createElement('option');
		noneOption.setAttribute('value', 'none');
		mxUtils.write(noneOption, mxResources.get('default'));
		txtSettingsSelect.appendChild(noneOption);

		var embedFontsOption = document.createElement('option');
		embedFontsOption.setAttribute('value', 'embedFonts');
		mxUtils.write(embedFontsOption, mxResources.get('embedFonts'));
		txtSettingsSelect.appendChild(embedFontsOption);

		var lblToSvgOption = document.createElement('option');
		lblToSvgOption.setAttribute('value', 'lblToSvg');
		mxUtils.write(lblToSvgOption, mxResources.get('lblToSvg'));
		
		if (this.getServiceName() == 'draw.io' && !this.isOffline() && !EditorUi.isElectronApp)
		{
			txtSettingsSelect.appendChild(lblToSvgOption);
		}

		mxEvent.addListener(txtSettingsSelect, 'change', mxUtils.bind(this, function()
		{
			if (txtSettingsSelect.value == 'lblToSvg')
			{
				cb5.checked = true;
				cb5.setAttribute('disabled', 'disabled');
				sizesOpt['page'].style.display = 'none';

				if (exportSelect.value == 'page')
				{
					exportSelect.value = 'diagram';
				}

				shadow.checked = false;
				shadow.setAttribute('disabled', 'disabled');

				linkLost.style.display = 'inline-block';
				linkSelect.style.display = 'none';
			}
			else if (cb5.getAttribute('disabled') == 'disabled')
			{
				cb5.checked = false;
				cb5.removeAttribute('disabled');
				shadow.removeAttribute('disabled');
				sizesOpt['page'].style.display = '';
				linkLost.style.display = 'none';
				linkSelect.style.display = '';
			}
		}));

		if (embedOption)
		{
			div.appendChild(cb5);
			mxUtils.write(div, mxResources.get('embedImages'));
			mxUtils.br(div);

			mxUtils.write(div, mxResources.get('txtSettings') + ':');
			div.appendChild(txtSettingsSelect);
			mxUtils.br(div);
			
			height += 60;
		}

		var linkSelect = document.createElement('select');
		linkSelect.style.maxWidth = '260px';
		linkSelect.style.marginLeft = '8px';

		var autoOption = document.createElement('option');
		autoOption.setAttribute('value', 'auto');
		mxUtils.write(autoOption, mxResources.get('automatic'));
		linkSelect.appendChild(autoOption);

		var blankOption = document.createElement('option');
		blankOption.setAttribute('value', 'blank');
		mxUtils.write(blankOption, mxResources.get('openInNewWindow'));
		linkSelect.appendChild(blankOption);

		var selfOption = document.createElement('option');
		selfOption.setAttribute('value', 'self');
		mxUtils.write(selfOption, mxResources.get('openInThisWindow'));
		linkSelect.appendChild(selfOption);

		//Inkscape doesn't support links from pdf to svg. Related to https://gitlab.com/inkscape/inbox/-/issues/583
		var linkLost = document.createElement('div');
		mxUtils.write(linkLost, mxResources.get('LinksLost'));
		linkLost.style.margin = '7px';
		linkLost.style.display = 'none';
		
		if (format == 'svg')
		{
			mxUtils.write(div, mxResources.get('links') + ':');
			div.appendChild(linkSelect);
			div.appendChild(linkLost);
			mxUtils.br(div);
			mxUtils.br(div);
			height += 50;
		}

		var dlg = new CustomDialog(this, div, mxUtils.bind(this, function()
		{
			this.lastExportBorder = borderInput.value;
			this.lastExportZoom = zoomInput.value;

			callback(zoomInput.value, transparent.checked, !selection.checked, shadow.checked,
				include.checked, cb5.checked, borderInput.value, cb6.checked, false, linkSelect.value,
				(grid != null) ? grid.checked : null, (themeSelect != null) ? themeSelect.value : null,
				exportSelect.value, txtSettingsSelect.value == 'embedFonts',
				txtSettingsSelect.value == 'lblToSvg');
		}), null, btnLabel, helpLink);
		this.showDialog(dlg.container, 340, height, true, true, null, null, null, null, true);
		zoomInput.focus();
		
		if (mxClient.IS_GC || mxClient.IS_FF || document.documentMode >= 5)
		{
			zoomInput.select();
		}
		else
		{
			document.execCommand('selectAll', false, null);
		}
	};
	
	/**
	 * 
	 */
	EditorUi.prototype.showEmbedImageDialog = function(fn, title, imageLabel, shadowEnabled, helpLink)
	{
		var div = document.createElement('div');
		div.style.whiteSpace = 'nowrap';
		var graph = this.editor.graph;
		
		if (title != null)
		{
			var hd = document.createElement('h3');
			mxUtils.write(hd, title);
			hd.style.cssText = 'width:100%;text-align:center;margin-top:0px;margin-bottom:4px';
			div.appendChild(hd);
		}
		
		var fit = this.addCheckbox(div, mxResources.get('fit'), true);
		var shadow = this.addCheckbox(div, mxResources.get('shadow'),
			graph.shadowVisible && shadowEnabled, !shadowEnabled);
		var image = this.addCheckbox(div, imageLabel);
		var lightbox = this.addCheckbox(div, mxResources.get('lightbox'), true);
		var editSection = this.addEditButton(div, lightbox);
		var edit = editSection.getEditInput();
		
		var hasLayers = graph.model.getChildCount(graph.model.getRoot()) > 1;
		var layers = this.addCheckbox(div, mxResources.get('layers'), hasLayers, !hasLayers);
		layers.style.marginLeft = edit.style.marginLeft;
		layers.style.marginBottom = '12px';
		layers.style.marginTop = '8px';
		
		mxEvent.addListener(lightbox, 'change', function()
		{
			if (lightbox.checked)
			{
				if (hasLayers)
				{
					layers.removeAttribute('disabled');
				}
				
				edit.removeAttribute('disabled');
			}
			else
			{
				layers.setAttribute('disabled', 'disabled');
				edit.setAttribute('disabled', 'disabled');
			}
			
			if (edit.checked && lightbox.checked)
			{
				editSection.getEditSelect().removeAttribute('disabled');
			}
			else
			{
				editSection.getEditSelect().setAttribute('disabled', 'disabled');
			}
		});
		
		var dlg = new CustomDialog(this, div, mxUtils.bind(this, function()
		{
			fn(fit.checked, shadow.checked, image.checked, lightbox.checked,
				editSection.getLink(), layers.checked);
		}), null, mxResources.get('embed'), helpLink);
		this.showDialog(dlg.container, 280, 300, true, true);
	};

	/**
	 * 
	 */
	EditorUi.prototype.createEmbedImage = function(fit, shadow, retina, lightbox, edit, layers, fn, err)
	{
		var bounds = this.editor.graph.getGraphBounds();
		var page = this.getSelectedPageIndex();
		
		function doUpdate(dataUri)
		{
   			var onclick = ' ';
   			var css = '';
   			
   			// Adds double click handling
			if (lightbox)
			{
				// KNOWN: Message passing does not seem to work in IE11
				onclick = " onclick=\"(function(img){if(img.wnd!=null&&!img.wnd.closed){img.wnd.focus();}else{var r=function(evt){if(evt.data=='ready'&&evt.source==img.wnd){img.wnd.postMessage(decodeURIComponent(" +
					"img.getAttribute('src')),'*');window.removeEventListener('message',r);}};window.addEventListener('message',r);img.wnd=window.open('" + EditorUi.lightboxHost + "/?client=1" +
					((page != null) ? ("&page=" + page) : "") +
					((edit) ? "&edit=_blank" : "") +
					((layers) ? '&layers=1' : '') + "');}})(this);\"";
				css += 'cursor:pointer;';
			}
   			
			if (fit)
			{
				css += 'max-width:100%;';
			}
			
			var atts = '';
			
			if (retina)
			{
				atts = ' width="' + Math.round(bounds.width) + '" height="' + Math.round(bounds.height) + '"';
			}
			
			fn('<img src="' + dataUri + '"' + atts + ((css != '') ? ' style="' + css + '"' : '') + onclick + '/>');
		};
		
		if (this.isExportToCanvas())
		{
			this.editor.exportToCanvas(mxUtils.bind(this, function(canvas)
		   	{
	   			var xml = (lightbox) ? this.getFileData(true) : null;
	   			var data = this.createImageDataUri(canvas, xml, 'png');
	   			doUpdate(data);
		   	}), null, null, null, mxUtils.bind(this, function(e)
		   	{
		   		err({message: mxResources.get('unknownError')});
		   	}), null, true, (retina) ? 2 : 1, null, shadow, null, null, Editor.defaultBorder);
		}
		else
		{
			var data = this.getFileData(true);
			
			if (bounds.width * bounds.height <= MAX_AREA && data.length <= MAX_REQUEST_SIZE)
			{
				var size = '';
				
				if (retina)
				{
					size = '&w=' + Math.round(2 * bounds.width) +
						'&h=' + Math.round(2 * bounds.height);
				}
				
				var embed = (lightbox) ? '1' : '0';
				var req = new mxXmlRequest(EXPORT_URL, 'format=png' +
					'&base64=1&embedXml=' + embed + size + '&xml=' +
					encodeURIComponent(data));
				
				// LATER: Updates on each change, add a delay
				req.send(mxUtils.bind(this, function()
				{
					if (req.getStatus() >= 200 && req.getStatus() <= 299)
					{
						// Fixes possible "incorrect function" for select() on
						// DOM node which is no longer in document with IE11
						doUpdate('data:image/png;base64,' + req.getText());
					}
					else
					{
						err({message: mxResources.get('unknownError')});
					}
				}));
			}
			else
			{
				err({message: mxResources.get('drawingTooLarge')});
			}
		}
	};
	
	/**
	 * 
	 */
	EditorUi.prototype.createEmbedSvg = function(fit, shadow, image, lightbox, edit, layers, fn)
	{
		var svgRoot = this.editor.graph.getSvg(null, null, null,
			null, null, null, null, null, null, null, !image);
		
		// Keeps hashtag links on same page
		var links = svgRoot.getElementsByTagName('a');
		
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
		
		if (lightbox)
		{
			svgRoot.setAttribute('content', this.getFileData(true));
		}
		
		// Adds shadow filter
		if (shadow)
		{
			this.editor.graph.addSvgShadow(svgRoot);
		}
		
		// SVG inside image tag
		if (image)
		{
   			var onclick = ' ';
   			var css = '';

   			// Adds double click handling
			if (lightbox)
			{
				// KNOWN: Message passing does not seem to work in IE11
				onclick = "onclick=\"(function(img){if(img.wnd!=null&&!img.wnd.closed){img.wnd.focus();}else{var r=function(evt){if(evt.data=='ready'&&evt.source==img.wnd){img.wnd.postMessage(decodeURIComponent(" +
					"img.getAttribute('src')),'*');window.removeEventListener('message',r);}};window.addEventListener('message',r);img.wnd=window.open('" + EditorUi.lightboxHost + "/?client=1" +
					((edit) ? "&edit=_blank" : "") + ((layers) ? '&layers=1' : '') + "');}})(this);\"";
				css += 'cursor:pointer;';
			}
   			
			if (fit)
			{
				css += 'max-width:100%;';
			}
   			
   			// Images inside IMG don't seem to work so embed them all
			this.editor.convertImages(svgRoot, mxUtils.bind(this, function(svgRoot)
			{
				fn('<img src="' + Editor.createSvgDataUri(mxUtils.getXml(svgRoot)) + '"' +
					((css != '') ? ' style="' + css + '"' : '') + onclick + '/>');
			}));
		}
		else
		{
			var css = '';
			
			// Adds double click handling
			if (lightbox)
			{
				var page = this.getSelectedPageIndex();
				
				// KNOWN: Message passing does not seem to work in IE11
				var js = "(function(svg){var src=window.event.target||window.event.srcElement;" +
					// Ignores link events
					"while (src!=null&&src.nodeName.toLowerCase()!='a'){src=src.parentNode;}if(src==null)" +
					// Focus existing lightbox
					"{if(svg.wnd!=null&&!svg.wnd.closed){svg.wnd.focus();}else{var r=function(evt){" +
					// Message handling
					"if(evt.data=='ready'&&evt.source==svg.wnd){svg.wnd.postMessage(decodeURIComponent(" +
					"svg.getAttribute('content')),'*');window.removeEventListener('message',r);}};" +
					"window.addEventListener('message',r);" +
					// Opens lightbox window
					"svg.wnd=window.open('" + EditorUi.lightboxHost + "/?client=1" +
					((page != null) ? ("&page=" + page) : "") +
					((edit) ? "&edit=_blank" : "") + ((layers) ? '&layers=1' : '') + "');}}})(this);";
				svgRoot.setAttribute('onclick', js);
				css += 'cursor:pointer;';
			}
			
			// Adds responsive size
			if (fit)
			{
				var w = parseInt(svgRoot.getAttribute('width'));
				var h = parseInt(svgRoot.getAttribute('height'));
				svgRoot.setAttribute('viewBox', '-0.5 -0.5 ' + w + ' ' + h);
				css += 'max-width:100%;max-height:' + h + 'px;';
				svgRoot.removeAttribute('height');
			}
			
			if (css != '')
			{
				svgRoot.setAttribute('style', css);
			}
			
			// Adds CSS
			this.editor.addFontCss(svgRoot);
			
			if (this.editor.graph.mathEnabled)
			{
				this.editor.addMathCss(svgRoot);
			}
			
			fn(mxUtils.getXml(svgRoot));
		}
	};

	/**
	 * Translates this point by the given vector.
	 * 
	 * @param {number} dx X-coordinate of the translation.
	 * @param {number} dy Y-coordinate of the translation.
	 */
	EditorUi.prototype.timeSince = function(date)
	{
	    var seconds = Math.floor((new Date() - date) / 1000);
	    var interval = Math.floor(seconds / 31536000);

	    if (interval > 1)
	    {
	        return interval + ' ' + mxResources.get('years');
	    }
	    
	    interval = Math.floor(seconds / 2592000);
	    
	    if (interval > 1)
	    {
	        return interval + ' ' + mxResources.get('months');
	    }
	    
	    interval = Math.floor(seconds / 86400);
	    
	    if (interval > 1)
	    {
	        return interval + ' ' + mxResources.get('days');
	    }
	    
	    interval = Math.floor(seconds / 3600);
	    
	    if (interval > 1)
	    {
	        return interval + ' ' + mxResources.get('hours');
	    }
	    
	    interval = Math.floor(seconds / 60);
	    
	    if (interval > 1)
	    {
	        return interval + ' ' + mxResources.get('minutes');
	    }
	    
	    if (interval == 1)
	    {
	        return interval + ' ' + mxResources.get('minute');
	    }
	    
	    return null;
	};

	/**
	 * 
	 */
	EditorUi.prototype.decodeNodeIntoGraph = function(node, graph)
	{
		if (node != null)
		{
			var diagramNode = null;
			
			if (node.nodeName == 'diagram')
			{
				diagramNode = node;
			}
			else if (node.nodeName == 'mxfile')
			{
				var diagrams = node.getElementsByTagName('diagram');

				if (diagrams.length > 0)
				{
					diagramNode = diagrams[0];
					var graphGetGlobalVariable = graph.getGlobalVariable;
					
					graph.getGlobalVariable = function(name)
					{
						if (name == 'page')
						{
							return diagramNode.getAttribute('name') || mxResources.get('pageWithNumber', [1])
						}
						else if (name == 'pagenumber')
						{
							return 1;
						}
						
						return graphGetGlobalVariable.apply(this, arguments);
					};
				}
			}
			
			if (diagramNode != null)
			{
				node = Editor.parseDiagramNode(diagramNode);
			}
		}
		
		// Hack to decode XML into temp graph via editor
		var prev = this.editor.graph;
		
		try
		{
			this.editor.graph = graph;
			this.editor.setGraphXml(node);	
		}
		catch (e)
		{
			// ignore
		}
		finally
		{
			this.editor.graph = prev;
		}
		
		return node;
	};

	/**
	 * 
	 */
	EditorUi.prototype.getSvgFileProperties = function(node)
	{
		return this.getPngFileProperties(node);
	};
	
	/**
	 * 
	 */
	EditorUi.prototype.getPngFileProperties = function(node)
	{
		var scale = 1;
		var border = 0;
		
		if (node != null)
		{
			if (node.hasAttribute('scale'))
			{
				var temp = parseFloat(node.getAttribute('scale'));
				
				if (!isNaN(temp) && temp > 0)
				{
					scale = temp;
				}
			}
			
			if (node.hasAttribute('border'))
			{
				var temp = parseInt(node.getAttribute('border'));
				
				if (!isNaN(temp) && temp > 0)
				{
					border = temp;
				}
			}
		}
		
		return {scale: scale, border: border};
	};
	
	/**
	 * 
	 */
	EditorUi.prototype.getEmbeddedPng = function(success, error, optionalData, scale, border)
	{
		try
		{
			var graph = this.editor.graph;
			var darkTheme = graph.themes != null && graph.defaultThemeName == 'darkTheme';
			var diagramData = null;
			
			// Exports PNG for given optional data
			if (optionalData != null && optionalData.length > 0)
			{
				graph = this.createTemporaryGraph((darkTheme) ?
					graph.getDefaultStylesheet() : graph.getStylesheet());
				document.body.appendChild(graph.container);
				this.decodeNodeIntoGraph(this.editor.extractGraphModel(
					mxUtils.parseXml(optionalData).documentElement, true), graph);
				diagramData = optionalData;
			}
			// Exports PNG for first page while other page is showing
			else if (darkTheme || (this.pages != null && this.currentPage != this.pages[0]))
			{
				graph = this.createTemporaryGraph((darkTheme) ?
					graph.getDefaultStylesheet() : graph.getStylesheet());
				var graphGetGlobalVariable = graph.getGlobalVariable;
				graph.setBackgroundImage = this.editor.graph.setBackgroundImage;
				var page = this.pages[0];

				if (this.currentPage == page)
				{
					graph.setBackgroundImage(this.editor.graph.backgroundImage);	
				}
				else if (page.viewState != null && page.viewState != null)
				{
					graph.setBackgroundImage(page.viewState.backgroundImage);
				}
		
				graph.getGlobalVariable = function(name)
				{
					if (name == 'page')
					{
						return page.getName();
					}
					else if (name == 'pagenumber')
					{
						return 1;
					}
					
					return graphGetGlobalVariable.apply(this, arguments);
				};
		
				document.body.appendChild(graph.container);
				graph.model.setRoot(page.root);
			}
			
		   	this.editor.exportToCanvas(mxUtils.bind(this, function(canvas)
		   	{
		   		try
		   		{
		   			if (diagramData == null)
		   			{
		   				diagramData = this.getFileData(true, null, null, null, null,
		   						null, null, null, null, false);
		   			}
		   			
		   	   	    var data = canvas.toDataURL('image/png');
		   	   	    data = Editor.writeGraphModelToPng(data,
		   	   	    	'tEXt', 'mxfile', encodeURIComponent(diagramData));
	   	   	   		success(data.substring(data.lastIndexOf(',') + 1));
	
					// Removes temporary graph from DOM
	   	   	   		if (graph != this.editor.graph)
					{
						graph.container.parentNode.removeChild(graph.container);
					}
		   		}
		   		catch (e)
		   		{
		   			if (error != null)
		   			{
		   				error(e);
		   			}
		   		}
		   	}), null, null, null, mxUtils.bind(this, function(e)
		   	{
		   		if (error != null)
	   			{
	   				error(e);
	   			}
		   	}), null, null, scale, null, graph.shadowVisible, null,
				graph, border, null, null, null, 'diagram', null);
		}
		catch (e)
		{
			if (error != null)
			{
				error(e);
			}
		}
	}

	/**
	 * Returns the SVG of the diagram with embedded XML. If a callback function is
	 * used, the images are converted to data URIs.
	 */
	EditorUi.prototype.getEmbeddedSvg = function(xml, graph, url, noHeader, callback, ignoreSelection,
		redirect, embedImages, background, scale, border, shadow, theme)
	{
		embedImages = (embedImages != null) ? embedImages : true;
		border = (border != null) ? border : 0;

		var bg = (background != null) ? background : graph.background;
		
		if (bg == mxConstants.NONE)
		{
			bg = null;
		}

		// Sets or disables alternate text for foreignObjects. Disabling is needed
		// because PhantomJS seems to ignore switch statements and paint all text.
		var svgRoot = graph.getSvg(bg, scale, border, null, null, ignoreSelection, null,
			null, null, graph.shadowVisible || shadow, null, theme, 'diagram');
		
		if (graph.shadowVisible || shadow)
		{
			graph.addSvgShadow(svgRoot, null, null, border == 0);
		}

		if (xml != null)
		{
			svgRoot.setAttribute('content', xml);
		}
		
		if (url != null)
		{
			svgRoot.setAttribute('resource', url);
		}
		
		// LATER: Click on SVG content to start editing
//		if (redirect != null)
//		{
//			// TODO: Ignore anchor tag source for click event
//			svgRoot.setAttribute('style', 'cursor:pointer;');
//			svgRoot.setAttribute('onclick', 'window.location.href=\'' + redirect + '\';'); 
//		}

		var done = mxUtils.bind(this, function(svgRoot)
		{
			var result = ((!noHeader) ? Graph.xmlDeclaration + '\n' + Graph.svgFileComment +
				'\n' + Graph.svgDoctype + '\n' : '') + mxUtils.getXml(svgRoot);

			if (callback != null)
			{
				callback(result);
			}

			return result;
		});

		// Adds CSS
		if (graph.mathEnabled)
		{
			this.editor.addMathCss(svgRoot);
		}

		if (callback != null)
		{
			this.embedFonts(svgRoot, mxUtils.bind(this, function(svgRoot)
			{
				if (embedImages)
				{
					this.editor.convertImages(svgRoot, mxUtils.bind(this, function(svgRoot)
					{
						done(svgRoot);
					}));
				}
				else
				{
					done(svgRoot);
				}
			}));
		}
		else
		{
			return done(svgRoot);
		}
	};
	
	/**
	 * Embeds font CSS as data URIs into the given svgRoot.
	 */
	EditorUi.prototype.embedFonts = function(svgRoot, callback)
	{
		this.editor.loadFonts(mxUtils.bind(this, function()
		{
			try
			{
				if (this.editor.resolvedFontCss != null)
				{
					this.editor.addFontCss(svgRoot, this.editor.resolvedFontCss);
				}
				
				this.editor.embedExtFonts(mxUtils.bind(this, function(extFontsEmbeddedCss)
				{
					try
					{
						if (extFontsEmbeddedCss != null)
						{
							this.editor.addFontCss(svgRoot, extFontsEmbeddedCss);
						}
						
						callback(svgRoot);
					}
					catch (e)
					{
						callback(svgRoot);
					}
				}));
			}
			catch (e)
			{
				callback(svgRoot);
			}
		}));
	};
	
	/**
	 *
	 */
	EditorUi.prototype.exportImage = function(scale, transparentBackground, ignoreSelection, addShadow,
		editable, border, noCrop, currentPage, format, grid, dpi, theme, exportType)
	{
		format = (format != null) ? format : 'png';
		
		if (this.spinner.spin(document.body, mxResources.get('exporting')))
		{
			var selectionEmpty = this.editor.graph.isSelectionEmpty();
			ignoreSelection = (ignoreSelection != null) ? ignoreSelection : selectionEmpty;
			
			// Caches images
			if (this.thumbImageCache == null)
			{
				this.thumbImageCache = new Object();
			}
			
			try
			{
			   	this.editor.exportToCanvas(mxUtils.bind(this, function(canvas)
			   	{
			   		this.spinner.stop();
			   		
			   		try
			   		{
			   			this.saveCanvas(canvas, (editable) ? this.getFileData(true, null,
			   				null, null, ignoreSelection, currentPage) : null,
			   				format, (this.pages == null || this.pages.length == 0), dpi);
			   		}
			   		catch (e)
			   		{
			   			this.handleError(e);
			   		}
			   	}), null, this.thumbImageCache, null, mxUtils.bind(this, function(e)
			   	{
			   		this.spinner.stop();
			   		this.handleError(e);
				}), null, ignoreSelection, scale || 1, transparentBackground, addShadow,
					null, null, border, noCrop, grid, theme, exportType);
			}
			catch (e)
			{
				this.spinner.stop();
				this.handleError(e);
			}
		}
	};

	/**
	/**
	 * Returns true if the given URL is known to have CORS headers.
	 */
	EditorUi.prototype.isCorsEnabledForUrl = function(url)
	{
		return this.editor.isCorsEnabledForUrl(url);
	};

	/**
	 * Handling drag and drop and import.
	 */

	/**
	 * Imports the given XML into the existing diagram.
	 */
	EditorUi.prototype.importXml = function(xml, dx, dy, crop, noErrorHandling, addNewPage, applyDefaultStyles)
	{
		dx = (dx != null) ? dx : 0;
		dy = (dy != null) ? dy : 0;
		var cells = []
		
		try
		{
			var graph = this.editor.graph;
	
			if (xml != null && xml.length > 0)
			{
				// Adds pages
				graph.model.beginUpdate();
				try
				{
					var doc = mxUtils.parseXml(xml);
					var mapping = {};
					
					// Checks for mxfile with multiple pages
					var node = this.editor.extractGraphModel(doc.documentElement, this.pages != null);

					if (node != null && node.nodeName == 'mxfile' && this.pages != null)
					{
						var diagrams = node.getElementsByTagName('diagram');

						if (diagrams.length == 1 && !addNewPage)
						{
							node = Editor.parseDiagramNode(diagrams[0]);
							
							if (this.currentPage != null)
							{
								mapping[diagrams[0].getAttribute('id')] = this.currentPage.getId();
								
								// Renames page if diagram has one blank page with default name
								if (this.isBlankFile())
								{
									var name = diagrams[0].getAttribute('name');
									
									if (name != null && name != '')
									{
										this.editor.graph.model.execute(new RenamePage(
											this, this.currentPage, name));
									}
								}
							}
						}
						else if (diagrams.length > 0)
						{
							var pages = [];
							var i0 = 0;
							
							// Adds first page to current page if current page is only page and empty
							if (this.pages != null && this.pages.length == 1 && this.isDiagramEmpty())
							{
								mapping[diagrams[0].getAttribute('id')] = this.pages[0].getId();
								node = Editor.parseDiagramNode(diagrams[0]);
								crop = false;
								i0 = 1;
							}

							for (var i = i0; i < diagrams.length; i++)
							{
								// Imported pages must obtain a new ID and
								// all links to pages must be updated below
								var oldId = diagrams[i].getAttribute('id')
								diagrams[i].removeAttribute('id');
								
								var page = this.updatePageRoot(new DiagramPage(diagrams[i]));
								mapping[oldId] = diagrams[i].getAttribute('id');
								var index = this.pages.length;
								
								// Checks for invalid page names
								if (page.getName() == null)
								{
									page.setName(mxResources.get('pageWithNumber', [index + 1]));
								}
								
								graph.model.execute(new ChangePage(this, page, page, index, true));
								pages.push(page);
							}
							
							this.updatePageLinks(mapping, pages);
						}
					}
					
					if (node != null && node.nodeName === 'mxGraphModel')
					{
						cells = graph.importGraphModel(node, dx, dy, crop);
						
						if (cells != null)
						{
							for (var i = 0; i < cells.length; i++)
							{
								this.updatePageLinksForCell(mapping, cells[i]);
							}
						}

						var bgImg = graph.parseBackgroundImage(node.getAttribute('backgroundImage'));

						if (bgImg != null && bgImg.originalSrc != null)
						{
							this.updateBackgroundPageLink(mapping, bgImg);
							var change = new ChangePageSetup(this, null, bgImg);
							change.ignoreColor = true;
							graph.model.execute(change);
						}
					}
					
					if (applyDefaultStyles)
					{
						this.insertHandler(cells, null, null,
							graph.defaultVertexStyle,
							graph.defaultEdgeStyle,
							false, true);
					}
				}
				finally
				{
					graph.model.endUpdate();
				}
			}
		}
		catch (e)
		{
			if (!noErrorHandling)
			{
				this.handleError(e);
			}
			else
			{
				throw e;
			}
		}
		
		return cells;
	};
	
	/**
	 * Updates links to pages in shapes and labels.
	 */
	EditorUi.prototype.updatePageLinks = function(mapping, pages)
	{
		for (var i = 0; i < pages.length; i++)
		{
			this.updatePageLinksForCell(mapping, pages[i].root);

			if (pages[i].viewState != null)
			{
				this.updateBackgroundPageLink(mapping, pages[i].viewState.backgroundImage);
			}
		}
	};
	
	/**
	 * Updates links to pages in shapes and labels.
	 */
	EditorUi.prototype.updateBackgroundPageLink = function(mapping, obj)
	{
		try
		{
			if (obj != null && Graph.isPageLink(obj.originalSrc))
			{
				var newId = mapping[obj.originalSrc.substring(obj.originalSrc.indexOf(',') + 1)];

				if (newId != null)
				{
					obj.originalSrc = 'data:page/id,' + newId;
				}
			}
		}
		catch (e)
		{
			// ignore background image
		}
	};

	/**
	 * Updates links to pages in shapes and labels.
	 */
	EditorUi.prototype.updatePageLinksForCell = function(mapping, cell)
	{
		var temp = document.createElement('div');
		var graph = this.editor.graph;
		var href = graph.getLinkForCell(cell);

		if (href != null)
		{
			graph.setLinkForCell(cell, this.updatePageLink(mapping, href));
		}
		
		if (graph.isHtmlLabel(cell))
		{
			temp.innerHTML = Graph.sanitizeHtml(graph.getLabel(cell));
			var links = temp.getElementsByTagName('a');
			var changed = false;
			
			for (var i = 0; i < links.length; i++)
			{
				href = links[i].getAttribute('href');
				
				if (href != null)
				{
					links[i].setAttribute('href', this.updatePageLink(mapping, href));
					changed = true;
				}
			}
			
			if (changed)
			{
				graph.labelChanged(cell, temp.innerHTML);
			}
		}
		
		for (var i = 0; i < graph.model.getChildCount(cell); i++)
		{
			this.updatePageLinksForCell(mapping, graph.model.getChildAt(cell, i));
		}
	};

	/**
	 * Updates links to pages in shapes and labels.
	 */
	EditorUi.prototype.updatePageLink = function(mapping, href)
	{
		if (Graph.isPageLink(href))
		{
			var newId = mapping[href.substring(href.indexOf(',') + 1)];
			href = (newId != null) ? 'data:page/id,' + newId : null;
		}
		else if (href.substring(0, 17) == 'data:action/json,')
		{
			try
			{
				var link = JSON.parse(href.substring(17));

				if (link.actions != null)
				{
					for (var i = 0; i < link.actions.length; i++)
					{
						var action = link.actions[i];
						
						if (action.open != null && Graph.isPageLink(action.open))
						{
							var oldId = action.open.substring(action.open.indexOf(',') + 1);
							var newId = mapping[oldId];
							
							if (newId != null)
							{
								action.open = 'data:page/id,' + newId;
							}
							else if (this.getPageById(oldId) == null)
							{
								delete action.open;
							}
						}
					}
					
					href = 'data:action/json,' + JSON.stringify(link);
				}
			}
			catch (e)
			{
				// Ignore
			}
		}
		
		return href;
	};
	
	/**
	 * Returns true for VSD, VDX and VSS, VSX files.
	 */
	EditorUi.prototype.isRemoteVisioFormat = function(filename)
	{
		return /(\.v(sd|dx))($|\?)/i.test(filename) || /(\.vs(s|x))($|\?)/i.test(filename);
	};
	
	/**
	 * Imports the given Visio file
	 */
	EditorUi.prototype.importVisio = function(file, done, error, filename, customParam)
	{
		var onerror = mxUtils.bind(this, function(e)
		{
			this.loadingExtensions = false;

			if (error != null)
			{
				error(e);
			}
			else
			{
				this.handleError(e);
			}
		});

		//A reduced version of this code is used in conf/jira plugins, review that code whenever this function is changed
		this.createTimeout(null, mxUtils.bind(this, function(timeout)
		{
			filename = (filename != null) ? filename : file.name;

			var handleError = mxUtils.bind(this, function(e)
			{
				if (timeout.clear())
				{
					onerror(e);
				}
			});

			var delayed = mxUtils.bind(this, function()
			{
				this.loadingExtensions = false;

				if (this.doImportVisio)
				{
					var remote = this.isRemoteVisioFormat(filename);
					
					try
					{
						var ext = 'UNKNOWN-VISIO';
						var dot = filename.lastIndexOf('.');
						
						if (dot >= 0 && dot < filename.length)
						{
							ext = filename.substring(dot + 1).toUpperCase();
						}
						else
						{
							var slash = filename.lastIndexOf('/');
							
							if (slash >= 0 && slash < filename.length)
							{
								filename = filename.substring(slash + 1);
							}
						}
						
						EditorUi.logEvent({category: ext + '-MS-IMPORT-FILE',
							action: 'filename_' + filename,
							label: (remote) ? 'remote' : 'local'});
					}
					catch (e)
					{
						// ignore
					}
					
					if (remote) 
					{
						if (VSD_CONVERT_URL != null && !this.isOffline())
						{
							var formData = new FormData();
							formData.append('file1', file, filename);
		
							var xhr = new XMLHttpRequest();
							xhr.open('POST', VSD_CONVERT_URL + (/(\.vss|\.vsx)$/.test(filename)? '?stencil=1' : ''));
							xhr.responseType = 'blob';
							this.addRemoteServiceSecurityCheck(xhr);
							
							if (customParam != null)
							{
								xhr.setRequestHeader('x-convert-custom', customParam);
							}
							
							xhr.onreadystatechange = mxUtils.bind(this, function()
							{
								if (xhr.readyState == 4 && timeout.clear())
								{
									if (xhr.status >= 200 && xhr.status <= 299)
									{
										try
										{
											var resp = xhr.response;

											if (resp.type == 'text/xml')
											{
												var reader = new FileReader();
												
												reader.onload = mxUtils.bind(this, function(e)
												{
													try
													{
														done(e.target.result);
													}
													catch (e)
													{
														handleError({message: mxResources.get('errorLoadingFile')});
													}
												});
						
												reader.readAsText(resp);
											}
											else
											{
												this.doImportVisio(resp, done, handleError, filename);
											}
										}
										catch (e)
										{
											handleError(e);
										}
									}
									else
									{
										try
										{
											if (xhr.responseType == '' || xhr.responseType == 'text')
											{
												handleError({message: xhr.responseText});
											}
											else
											{
												var reader = new FileReader();

												reader.onload = function() 
												{
													try
													{	
														handleError({message: JSON.parse(reader.result).Message});
													}
													catch (e)
													{
														handleError(e);
													}
												}

												reader.readAsText(xhr.response);
											}
										}
										catch(e)
										{
											handleError({});
										}
									}
								}
							});
							
							xhr.send(formData);
						}
						else
						{
							handleError({message: this.getServiceName() != 'draw.io'? mxResources.get('vsdNoConfig') :
								mxResources.get('serviceUnavailableOrBlocked')});
						}
					}
					else if (timeout.clear())
					{
						try
						{
							this.doImportVisio(file, done, handleError, filename);
						}
						catch (e)
						{
							handleError(e);
						}
					}
				}
				else
				{
					handleError({message: mxResources.get('serviceUnavailableOrBlocked')});
				}
			});
			
			if (!this.doImportVisio && !this.loadingExtensions && !this.isOffline(true))
			{
				this.loadingExtensions = true;
				mxscript('js/extensions.min.js', delayed, null, null, null, handleError);
			}
			else
			{
				delayed();
			}
		}), onerror);
	};

	/**
	 * Imports the given GraphML (yEd) file
	 */
	EditorUi.prototype.importGraphML = function(xmlData, done, error)
	{
		var onerror = mxUtils.bind(this, function(e)
		{
			this.loadingExtensions = false;

			if (error != null)
			{
				error(e);
			}
			else
			{
				this.handleError(e);
			}
		});

		this.createTimeout(null, mxUtils.bind(this, function(timeout)
		{
			var handleError = mxUtils.bind(this, function(e)
			{
				if (timeout.clear())
				{
					onerror(e);
				}
			});

			var delayed = mxUtils.bind(this, function()
			{
				this.loadingExtensions = false;

				if (timeout.clear())
				{
					if (this.doImportGraphML)
					{
						try
						{
							this.doImportGraphML(xmlData, done, onerror);
						}
						catch (e)
						{
							handleError(e);
						}
					}
					else
					{
						handleError({message: mxResources.get('serviceUnavailableOrBlocked')});
					}
				}
			});
			
			if (!this.doImportGraphML && !this.loadingExtensions && !this.isOffline(true))
			{
				this.loadingExtensions = true;
				mxscript('js/extensions.min.js', delayed, null, null, null, handleError);
			}
			else
			{
				delayed();
			}
		}), onerror);
	};	
	
	/**
	 * Export the diagram to VSDX
	 */
	EditorUi.prototype.exportVisio = function(currentPage)
	{
		if (this.spinner.spin(document.body, mxResources.get('loading')))
		{
			var onerror = mxUtils.bind(this, function(e)
			{
				this.loadingExtensions = false;
				this.handleError(e);
			});

			this.createTimeout(null, mxUtils.bind(this, function(timeout)
			{
				var handleError = mxUtils.bind(this, function(e)
				{
					if (timeout.clear())
					{
						onerror(e);
					}
				});

				var delayed = mxUtils.bind(this, function()
				{
					this.loadingExtensions = false;

					if (timeout.clear())
					{
						if (typeof VsdxExport  !== 'undefined')
						{
							try
							{
								this.spinner.stop();
								var expSuccess = new VsdxExport(this).exportCurrentDiagrams(currentPage);
								
								if (!expSuccess)
								{
									handleError({message: mxResources.get('unknownError')});
								}
							}
							catch (e)
							{
								handleError(e);
							}
						}
						else
						{
							handleError({message: mxResources.get('serviceUnavailableOrBlocked')});
						}
					}
				});
				
				if (typeof VsdxExport === 'undefined' && !this.loadingExtensions && !this.isOffline(true))
				{
					this.loadingExtensions = true;
					mxscript('js/extensions.min.js', delayed, null, null, null, handleError);
				}
				else
				{
					// Async needed for showing spinner for longer exports
					window.setTimeout(delayed, 0);
				}
			}), onerror);
		}
	};
	
	/**
	 * Imports the given Lucidchart data.
	 */
	EditorUi.prototype.convertLucidChart = function(data, success, error)
	{
		var onerror = mxUtils.bind(this, function(e)
		{
			this.loadingExtensions = false;

			if (error != null)
			{
				error(e);
			}
			else
			{
				this.handleError(e);
			}
		});

		this.createTimeout(null, mxUtils.bind(this, function(timeout)
		{
			var handleError = mxUtils.bind(this, function(e)
			{
				if (timeout.clear())
				{
					onerror(e);
				}
			});

			var delayed = mxUtils.bind(this, function()
			{
				this.loadingExtensions = false;
				
				if (timeout.clear())
				{
					// Checks for signature method
					if (typeof window.LucidImporter !== 'undefined')
					{
						try
						{
							var obj = JSON.parse(data);
							success(LucidImporter.importState(obj));

							try
							{
								EditorUi.logEvent({category: 'LUCIDCHART-IMPORT-FILE',
									action: 'size_' + data.length});

									if (window.console != null && urlParams['test'] == '1')
									{
										var args = [new Date().toISOString(), 'convertLucidChart', obj];

										if (obj.state != null)
										{
											args.push(JSON.parse(obj.state));
										}
				
										if (obj.svgThumbs != null)
										{
											for (var i = 0; i < obj.svgThumbs.length; i++)
											{
												args.push(Editor.createSvgDataUri(obj.svgThumbs[i]));
											}
										}

										if (obj.thumb != null)
										{
											args.push(obj.thumb);
										}

										console.log.apply(console, args);
									}
							}
							catch (e)
							{
								// ignore
							}
						}
						catch (e)
						{
							if (window.console != null)
							{
								console.error(e);
							}
							
							handleError(e);
						}
					}
					else
					{
						handleError({message: mxResources.get('serviceUnavailableOrBlocked')});
					}
				}
			});
			
			if (typeof window.LucidImporter === 'undefined' &&
				!this.loadingExtensions && !this.isOffline(true))
			{
				this.loadingExtensions = true;
				
				if (urlParams['dev'] == '1')
				{
					//Lucid org chart requires orgChart layout, in production, it is part of the extemsions.min.js
					mxscript('js/diagramly/Extensions.js', function()
					{
						mxscript('js/orgchart/bridge.min.js', function()
						{
							mxscript('js/orgchart/bridge.collections.min.js', function()
							{
								mxscript('js/orgchart/OrgChart.Layout.min.js', function()
								{
									mxscript('js/orgchart/mxOrgChartLayout.js',
										delayed, null, null, null, handleError);											
								}, null, null, null, handleError);		
							}, null, null, null, handleError);	
						}, null, null, null, handleError);
					}, null, null, null, handleError);
				}
				else
				{
					mxscript('js/extensions.min.js', delayed,
						null, null, null, handleError);
				}
			}
			else
			{
				// Async needed for selection
				window.setTimeout(delayed, 0);
			}
		}), onerror);
	};

	/**
	 * Generates a Mermaid image.
	 */
	EditorUi.prototype.createMermaidXml = function(input, config, data, w, h)
	{
		var graph = new Graph(document.createElement('div'));
		var cell = graph.insertVertex(null, null, null, 0, 0, w, h,
			'shape=image;noLabel=1;verticalAlign=top;' +
			'imageAspect=1;image=' + data + ';')
		graph.setAttributeForCell(cell, 'mermaidData', JSON.stringify(
			{data: input, config: config}, null, 2));

		var codec = new mxCodec();
		var node = codec.encode(graph.getModel());

		return mxUtils.getXml(node);
	};

	/**
	 * Generates a Mermaid image.
	 */
	EditorUi.prototype.generateOpenAiMermaidDiagram = function(prompt, success, error)
	{
		var maxRetries = 3;
		var retryCount = 0;

		var fn = mxUtils.bind(this, function()
		{
			if (this.spinner.spin(document.body, mxResources.get('loading')))
			{
				this.createTimeout(40000, mxUtils.bind(this, function(timeout)
				{
					EditorUi.logEvent({category: 'OPENAI-DIAGRAM',
						action: 'generateOpenAiMermaidDiagram',
						label: prompt});
					var url = 'https://www.draw.io/generate/v1';

					var req = new mxXmlRequest(url, prompt, 'POST');
					
					var handleError = mxUtils.bind(this, function(e)
					{
						if (timeout.clear())
						{
							this.spinner.stop();
							error(e);
						}
					});

					req.send(mxUtils.bind(this, function(req)
					{
						if (timeout.isAlive())
						{
							if (req.getStatus() >= 200 && req.getStatus() <= 299)
							{
								this.tryAndHandle(mxUtils.bind(this, function()
								{
									var response = mxUtils.trim(req.getText());
									var result = this.extractMermaidDeclaration(response);
									
									this.generateMermaidImage(result, null, mxUtils.bind(this, function(data, w, h)
									{
										this.tryAndHandle(mxUtils.bind(this, function()
										{
											if (timeout.clear())
											{
												EditorUi.debug('EditorUi.generateOpenAiMermaidDiagram',
													'\nprompt:', prompt, '\nresponse:', response,
													'\nresult:', result);
												
												this.spinner.stop();
												success(result, data, w, h);
											}
										}), handleError);
									}), handleError, mxUtils.bind(this, function(e)
									{
										if (retryCount++ < maxRetries)
										{
											if (timeout.clear())
											{
												this.spinner.stop();
												fn();
											}
										}
										else
										{
											handleError(e);
										}
									}));
								}), handleError);
							}
							else
							{
								var e = {message: mxResources.get('error') + ' ' + req.getStatus()};

								try
								{
									e = JSON.parse(req.getText());
									e = e.error;
								}
								catch (e)
								{
									// ignore
								}

								handleError(e);
							}
						}
					}), handleError);
				}), error);
			}
		});

		fn();
	};
	
	/**
	 * Generates a Mermaid image.
	 */
	EditorUi.prototype.extractMermaidMindmap = function(lines)
	{
		if (lines[1].indexOf('orientation') > 0)
		{
			lines.splice(1, 1);
		}

		while (lines.length > 1 && lines[1] == '')
		{
			lines.splice(1, 1);
		}

		var newLines = [];

		// Removes dashes in entries
		for (var i = 2; i < lines.length; i++)
		{
			var temp = mxUtils.trim(lines[i]);

			if (temp != '[' && temp != ']' &&
				temp.substring(0, 2) != '%%' &&
				temp.substring(0, 2) != '##')
			{
				temp = lines[i].replace(/[-|>]/g, ' ')
				
				if (mxUtils.trim(temp) != '' &&
					temp.charAt(0) == ' ')
				{
					newLines.push(temp);
				}
			}
		}

		// Removes indentiation for root element
		return 'mindmap\nroot((' + mxUtils.trim(lines[1]) +
			'))\n' + newLines.join('\n');
	};

	/**
	 * Generates a Mermaid image.
	 */
	EditorUi.prototype.extractMermaidDeclaration = function(value)
	{
		// Removes occasional "o" on first line in response
		if (value.substring(0, 3) == 'o\n\n')
		{
			value = value.substring(3);
		}

		// Various formats supported
		var tokens = value.split('```');
		tokens = (tokens.length > 1) ? tokens : value.split('<pre>');
		tokens = (tokens.length > 1) ? tokens : value.split('~~~');
		tokens = (tokens.length > 1) ? tokens : value.split('%%');
		tokens = (tokens.length > 1) ? tokens : value.split('(Begins)');
		
		var text = mxUtils.trim((tokens.length <= 1) ? value : tokens[1]);
		var lines = text.split('\n');

		// Removes occasional mermaid tag or other text on first line
		if ((lines.length > 0 && mxUtils.trim(lines[0]) == 'mermaid') ||
			(lines.length > 1 && mxUtils.indexOf(
				EditorUi.mermaidDiagramTypes, lines[1]) >= 0))
		{
			lines.shift();
			text = mxUtils.trim(lines.join('\n'));
			lines = text.split('\n');
		}

		// Validates diagram type on first line
		var type = lines[0].split(' ')[0].replace(/:$/, '');

		try
		{
			if (type == 'mindmap' && lines.length > 2)
			{
				text = this.extractMermaidMindmap(lines);
			}
		}
		catch (e)
		{
			// ignore
		}

		if (type.charAt(0) != '@' && mxUtils.indexOf(
			EditorUi.mermaidDiagramTypes, type) < 0)
		{
			text = 'classDiagram\n' + text;
		}

		EditorUi.debug('EditorUi.extractMermaidDeclaration',
			'\nlines:', lines, '\ntype:', type,
			'\nvalue:', value, '\ntext:', text);

		return text;
	};
		
	/**
	 * Removes all lines starting with %%.
	 */
	EditorUi.prototype.removeMermaidComments = function(data)
	{
		var lines = data.split('\n');
		var result = [];

		for (var i = 0; i < lines.length; i++)
		{
			if (lines[i].substring(0, 2) != '%%')
			{
				result.push(lines[i]);
			}
		}

		return result.join('\n');
	};

	/**
	 * Generates a Mermaid image.
	 */
	EditorUi.prototype.generateMermaidImage = function(data, config, success, error, parseErrorHandler)
	{
		data = this.removeMermaidComments(data);

		var onerror = mxUtils.bind(this, function(e)
		{
			this.loadingMermaid = false;

			if (error != null)
			{
				error(e);
			}
			else
			{
				this.handleError(e);
			}
		});
		
		var delayed = mxUtils.bind(this, function()
		{
			try
			{
				this.loadingMermaid = false;
				
				config = (config != null) ? config : mxUtils.clone(EditorUi.defaultMermaidConfig);
				config.securityLevel = 'strict';
				config.startOnLoad = false;

				if (Editor.isDarkMode())
				{
					config.theme = 'dark';
				}
				
				var renderCallback = mxUtils.bind(this, function(svg)
				{
					try
					{
						// Workaround for namespace errors in SVG output for IE
						if (mxClient.IS_IE || mxClient.IS_IE11)
						{
							svg = svg.replace(/ xmlns:\S*="http:\/\/www.w3.org\/XML\/1998\/namespace"/g, '').
								replace(/ (NS xml|\S*):space="preserve"/g, ' xml:space="preserve"');
						}
						
						var doc = mxUtils.parseXml(svg);
						var svgs = doc.getElementsByTagName('svg');

						if (svgs.length > 0 && svgs[0].getAttribute('aria-roledescription') != 'error')
						{
							var w = parseFloat(svgs[0].getAttribute('width'));
							var h = parseFloat(svgs[0].getAttribute('height'));
							
							if (isNaN(w) || isNaN(h))
							{
								try
								{
									var viewBox = svgs[0].getAttribute('viewBox').split(/\s+/);
									w = parseFloat(viewBox[2]);
									h = parseFloat(viewBox[3]);
								}
								catch(e)
								{
									//Any size such that it shows up
									w = w || 100;
									h = h || 100;									
								}
							}
							
							success(this.convertDataUri(Editor.createSvgDataUri(svg)), w, h);
						}
						else
						{
							if (parseErrorHandler != null)
							{
								parseErrorHandler();
							}
							else
							{
								error({message: mxResources.get('invalidInput')});
							}
						}
					}
					catch (e)
					{
						error(e);
					}
				});

				mermaid.mermaidAPI.initialize(config);

				mermaid.mermaidAPI.render('geMermaidOutput-' + new Date().getTime(), data).then(function(result)
				{
					renderCallback(result.svg);
				}).catch(function(e)
				{
					if (parseErrorHandler != null)
					{
						parseErrorHandler(e);
					}
					else
					{
						error(e);
					}
				});
			}
			catch (e)
			{
				error(e);
			}
		});

		if (typeof mermaid === 'undefined' && !this.loadingMermaid && !this.isOffline(true))
		{
			this.loadingMermaid = true;
			
			if (urlParams['dev'] == '1')
			{
				if (urlParams['mermaidToDrawioTest'] == '1')
        		{
					mxMermaidToDrawio.addListener(mxUtils.bind(this, function(modelXml)
					{
						this.importXml(modelXml, null, null, null, null, null, true);
					}));
				}
				
				mxscript('js/mermaid/mermaid.min.js', delayed,
					null, null, null, onerror);
			}
			else
			{
				mxscript('js/extensions.min.js', delayed,
					null, null, null, onerror);
			}
		}
		else
		{
			window.setTimeout(delayed, 0);
		}
	};
	
	/**
	 * Generates a plant UML image. Possible types are svg, png and txt.
	 */
	EditorUi.prototype.generatePlantUmlImage = function(data, type, success, error)
	{	
		function encode64(data)
		{
			r = "";
			
			for (i = 0; i < data.length; i += 3)
			{
				if (i + 2 == data.length)
				{
					r += append3bytes(data.charCodeAt(i), data.charCodeAt(i + 1), 0);
				}
				else if (i + 1 == data.length)
				{
					r += append3bytes(data.charCodeAt(i), 0, 0);
				}
				else
				{
					r += append3bytes(data.charCodeAt(i), data.charCodeAt(i + 1),
						data.charCodeAt(i + 2));
				}
			}
			
			return r;
		}

		function append3bytes(b1, b2, b3)
		{
			c1 = b1 >> 2;
			c2 = ((b1 & 0x3) << 4) | (b2 >> 4);
			c3 = ((b2 & 0xF) << 2) | (b3 >> 6);
			c4 = b3 & 0x3F;
			r = "";
			r += encode6bit(c1 & 0x3F);
			r += encode6bit(c2 & 0x3F);
			r += encode6bit(c3 & 0x3F);
			r += encode6bit(c4 & 0x3F);
			
			return r;
		}

		function encode6bit(b)
		{
			if (b < 10)
			{
				return String.fromCharCode(48 + b);
			}
			
			b -= 10;
			
			if (b < 26)
			{
				return String.fromCharCode(65 + b);
			}
			
			b -= 26;
			
			if (b < 26)
			{
				return String.fromCharCode(97 + b);
			}
			
			b -= 26;
			
			if (b == 0)
			{
				return '-';
			}
			
			if (b == 1)
			{
				return '_';
			}
			
			return '?';
		}

		// TODO: Remove unescape, use btoa for compatibility with graph.compress
		function compress(s)
		{
			return encode64(Graph.arrayBufferToString(pako.deflateRaw(s)));
		};

		var plantUmlServerUrl = (type == 'txt') ? PLANT_URL + '/txt/' :
			((type == 'png') ? PLANT_URL + '/png/' : PLANT_URL + '/svg/');
		
		var xhr = new XMLHttpRequest();
		xhr.open('GET', plantUmlServerUrl + compress(data), true);

		if (type != 'txt')
		{
			xhr.responseType = 'blob';
		}

		xhr.onload = function(e)
		{
			if (this.status >= 200 && this.status < 300)
			{
				if (type == 'txt')
				{
					success(this.response);
				}
				else
				{
					var reader = new FileReader();
					reader.readAsDataURL(this.response);

					reader.onloadend = function(e)
					{
						var img = new Image();

						img.onload = function()
						{
							try
							{
								var w = img.width;
								var h = img.height;
	
								// Workaround for 0 image size in IE11
								if (w == 0 && h == 0)
								{
									var data = reader.result;
									var comma = data.indexOf(',');
									var svgText = decodeURIComponent(escape(atob(data.substring(comma + 1))));
									var root = mxUtils.parseXml(svgText);
									var svgs = root.getElementsByTagName('svg');
	
									if (svgs.length > 0)
									{
										w = parseFloat(svgs[0].getAttribute('width'));
										h = parseFloat(svgs[0].getAttribute('height'));
									}
								}
								
								success(reader.result, w, h);
							}
							catch (e)
							{
								error(e);
							}
						};

						img.src = reader.result;
					};

					reader.onerror = function(e)
					{
						error(e);
					};
				}
			}
			else
			{
				error(e);
			}
		};

		xhr.onerror = function(e)
		{
			error(e);
		};

		xhr.send();
	};

	/**
	 * Inserts the given text as a preformatted HTML text.
	 */
	EditorUi.prototype.insertAsPreText = function(text, x, y)
	{
		var graph = this.editor.graph;
		var cell = null;
		
		graph.getModel().beginUpdate();
		try
		{
			cell = graph.insertVertex(null, null, '<pre>' + text + '</pre>',
				x, y, 1, 1, 'text;html=1;align=left;verticalAlign=top;');
			graph.updateCellSize(cell, true);
		}
		finally
		{
			graph.getModel().endUpdate();
		}

		return cell;
	};

	/**
	 * Imports the given XML into the existing diagram.
	 * TODO: Make this function asynchronous
	 */
	EditorUi.prototype.insertTextAt = function(text, dx, dy, html, asImage, crop, resizeImages, addNewPage)
	{
		crop = (crop != null) ? crop : true;
		resizeImages = (resizeImages != null) ? resizeImages : true;
		
		// Handles special case for Gliffy data which requires async server-side for parsing
		if (text != null)
		{
			if (Graph.fileSupport && new XMLHttpRequest().upload && this.isRemoteFileFormat(text))
			{
				if (this.isOffline())
				{
					this.showError(mxResources.get('error'), mxResources.get('notInOffline'));
				}
				else
				{
					// Fixes possible parsing problems with ASCII 160 (non-breaking space)
					this.parseFileData(text.replace(/\s+/g,' '), mxUtils.bind(this, function(xhr)
					{
						if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status <= 299)
						{
							this.editor.graph.setSelectionCells(this.insertTextAt(
								xhr.responseText, dx, dy, true));
						}
					}));
				}

				// Returns empty cells array as it is aysynchronous
				return [];
			}
			// Handles special case of data URI which requires async loading for finding size
			else if (text.substring(0, 5) == 'data:' || (!this.isOffline() &&
				(asImage || (/\.(gif|jpg|jpeg|tiff|png|svg)$/i).test(text))))
			{
				var graph = this.editor.graph;
				
				// Checks for embedded XML in PDF
				if (text.substring(0, 28) == 'data:application/pdf;base64,')
	    		{
					var xml = Editor.extractGraphModelFromPdf(text);
					
					if (xml != null && xml.length > 0)
					{
						return this.importXml(xml, dx, dy, crop, true, addNewPage);
					}
	    		}
				
				// Checks for embedded XML in PNG
				if (Editor.isPngDataUrl(text))
				{
					var xml = Editor.extractGraphModelFromPng(text);
					
					if (xml != null && xml.length > 0)
					{
						return this.importXml(xml, dx, dy, crop, true, addNewPage);
					}
				}
				
				// Tries to extract embedded XML from SVG data URI
				if (text.substring(0, 19) == 'data:image/svg+xml;')
				{
					try
					{
						var xml = null;
						
						if (text.substring(0, 26) == 'data:image/svg+xml;base64,')
						{
							xml = text.substring(text.indexOf(',') + 1);
							xml = (window.atob && !mxClient.IS_SF) ? atob(xml) : Base64.decode(xml, true);
						}
						else
						{
							xml = decodeURIComponent(text.substring(text.indexOf(',') + 1));
						}
						
						var result = this.importXml(xml, dx, dy, crop, true, addNewPage); 
	
						if (result.length > 0)
						{
							return result;
						}
					}
					catch (e)
					{
						// Ignore
					}
				}
				
				this.loadImage(text, mxUtils.bind(this, function(img)
				{
					if (text.substring(0, 5) == 'data:')
					{
						this.resizeImage(img, text, mxUtils.bind(this, function(data2, w2, h2)
	    				{
							graph.setSelectionCell(graph.insertVertex(null, null, '', graph.snap(dx), graph.snap(dy),
									w2, h2, 'shape=image;verticalLabelPosition=bottom;labelBackgroundColor=default;' +
									'verticalAlign=top;aspect=fixed;imageAspect=0;image=' + this.convertDataUri(data2) + ';'));
	    				}), resizeImages, this.maxImageSize);
					}
					else
					{
						var s = Math.min(1, Math.min(this.maxImageSize / img.width, this.maxImageSize / img.height));
						var w = Math.round(img.width * s);
						var h = Math.round(img.height * s);
						
						graph.setSelectionCell(graph.insertVertex(null, null, '', graph.snap(dx), graph.snap(dy),
								w, h, 'shape=image;verticalLabelPosition=bottom;labelBackgroundColor=default;' +
								'verticalAlign=top;aspect=fixed;imageAspect=0;image=' + text + ';'));
					}
				}), mxUtils.bind(this, function()
				{
					var cell = null;
					
					// Inserts invalid data URIs as text
			    	graph.getModel().beginUpdate();
			    	try
			    	{
						cell = graph.insertVertex(graph.getDefaultParent(), null, text,
								graph.snap(dx), graph.snap(dy), 1, 1, 'text;' + ((html) ? 'html=1;' : ''));
						graph.updateCellSize(cell);
						graph.fireEvent(new mxEventObject('textInserted', 'cells', [cell]));
			    	}
			    	finally
			    	{
			    		graph.getModel().endUpdate();
			    	}
	
					graph.setSelectionCell(cell);
				}));
				
				return [];
			}
			else
			{
				text = Graph.zapGremlins(mxUtils.trim(text));
			
				if (this.isCompatibleString(text))
				{
					return this.importXml(text, dx, dy, crop, null, addNewPage);
				}
				else if (text.length > 0)
				{
					if (this.isLucidChartData(text))
					{
						this.convertLucidChart(text, mxUtils.bind(this, function(xml)
						{
							this.editor.graph.setSelectionCells(
								this.importXml(xml, dx, dy, crop,
								null, addNewPage));
						}), mxUtils.bind(this, function(e)
						{
							this.handleError(e);
						}));
					}
					else
					{
						var graph = this.editor.graph;
						var cell = null;
						
				    	graph.getModel().beginUpdate();
				    	try
				    	{
				    		// Fires cellsInserted to apply the current style to the inserted text.
				    		// This requires the value to be empty when the event is fired.
				    		cell = graph.insertVertex(graph.getDefaultParent(), null, '',
								graph.snap(dx), graph.snap(dy), 1, 1, 'text;whiteSpace=wrap;' + ((html) ? 'html=1;' : ''));
				    		graph.fireEvent(new mxEventObject('textInserted', 'cells', [cell]));
							
							if (html)
							{
								text = graph.sanitizeHtml(text);
							}

				    		//TODO Refuse unsupported file types early as at this stage a lot of processing has beed done and time is wasted. 
				    		//		For example, 5 MB PDF files is processed and then only 0.5 MB of meaningless text is added!
				    		//Limit labels to maxTextBytes
				    		if (text.length > this.maxTextBytes)
			    			{
				    			text = text.substring(0, this.maxTextBytes) + '...';
			    			}
				    		
							// Apply value and updates the cell size to fit the text block
							cell.value = text;
							graph.updateCellSize(cell);
							
							// Adds wrapping for large text blocks
							if (this.maxTextWidth > 0 && cell.geometry.width > this.maxTextWidth)
							{
								var size = graph.getPreferredSizeForCell(cell, this.maxTextWidth);
								cell.geometry.width = size.width;
								cell.geometry.height = size.height;
							}
							
							// See https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
							if (Graph.isLink(cell.value))
							{
								graph.setLinkForCell(cell, cell.value);
							}
							
							// Adds spacing
							cell.geometry.width += graph.gridSize;
							cell.geometry.height += graph.gridSize;
				    	}
				    	finally
				    	{
				    		graph.getModel().endUpdate();
				    	}
						
						return [cell];
					}
				}
			}
		}
		
		return [];
	};

	/**
	 * Formats the given file size.
	 */
	EditorUi.prototype.formatFileSize = function(size)
	{
	    var units = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
		var i = -1;
		
	    do
	    {
	    	size = size / 1024;
	        i++;
	    } while (size > 1024);

	    return Math.max(size, 0.1).toFixed(1) + units[i];
	};

	/**
	 * Imports the given XML into the existing diagram.
	 */
	EditorUi.prototype.convertDataUri = function(uri)
	{
		// Handles special case of data URI which needs to be rewritten
		// to be used in a cell style to remove the semicolon
		if (uri.substring(0, 5) == 'data:')
		{
			var semi = uri.indexOf(';');
			
			if (semi > 0)
			{
				uri = uri.substring(0, semi) + uri.substring(uri.indexOf(',', semi + 1));
			}
		}
		
		return uri;
	};
	
	/**
	 * Returns true for Gliffy data.
	 */
	EditorUi.prototype.isRemoteFileFormat = function(data, filename)
	{
		return /(\"contentType\":\s*\"application\/gliffy\+json\")/.test(data);
	};
	
	/**
	 * Returns true for Gliffy
	 */
	EditorUi.prototype.isLucidChartData = function(data)
	{
		return data != null && (data.substring(0, 26) ==
			'{"state":"{\\"Properties\\":' ||
			data.substring(0, 14) == '{"Properties":');
	};

	/**
	 * Imports a local file from the device or local storage.
	 */
	EditorUi.prototype.importLocalFile = function(device, noSplash)
	{
		if (device && Graph.fileSupport)
		{
			if (this.importFileInputElt == null) 
			{
				var input = document.createElement('input');
				input.setAttribute('type', 'file');
				
				mxEvent.addListener(input, 'change', mxUtils.bind(this, function()
				{
					if (input.files != null)
					{
						// Using null for position will disable crop of input file
						this.importFiles(input.files, null, null, this.maxImageSize);
						
			    		// Resets input to force change event for same file (type reset required for IE)
						input.type = '';
						input.type = 'file';
			    		input.value = '';
					}
				}));
				
				input.style.display = 'none';
				document.body.appendChild(input);
				this.importFileInputElt = input;
			}
			
			this.importFileInputElt.click();
		}
		else
		{
			window.openNew = false;
			window.openKey = 'import';
							
			window.listBrowserFiles = mxUtils.bind(this, function(success, error) 
			{
				StorageFile.listFiles(this, 'F', success, error);
			});
			
			window.openBrowserFile = mxUtils.bind(this, function(title, success, error)
			{
				StorageFile.getFileContent(this, title, success, error);
			});
			
			window.deleteBrowserFile = mxUtils.bind(this, function(title, success, error)
			{
				StorageFile.deleteFile(this, title, success, error);
			});

			if (!noSplash)
			{
				var prevValue = Editor.useLocalStorage;
				Editor.useLocalStorage = !device;
			}

			// Closes dialog after open
			window.openFile = new OpenFile(mxUtils.bind(this, function(cancel)
			{
				this.hideDialog(cancel);
			}));
			
			window.openFile.setConsumer(mxUtils.bind(this, function(xml, filename)
			{
				if (filename != null && Graph.fileSupport && /(\.v(dx|sdx?))($|\?)/i.test(filename))
				{
					// "Not a UTF 8 file" when opening VSDX in IE so this is never called
					var file = new Blob([xml], {type: 'application/octet-stream'})
					
					this.importVisio(file, mxUtils.bind(this, function(xml)
					{
						this.importXml(xml, 0, 0, true);
					}), null, filename);
				}
				else
				{				
					this.editor.graph.setSelectionCells(this.importXml(xml, 0, 0, true));
				}
			}));

			// Removes openFile if dialog is closed
			this.showDialog(new OpenDialog(this).container,  (Editor.useLocalStorage) ? 640 : 360,
				(Editor.useLocalStorage) ? 480 : 220, true, true, function()
			{
				window.openFile = null;
			});
			
			// Extends dialog close to show splash screen
			if (!noSplash)
			{
				var dlg = this.dialog;
				var dlgClose = dlg.close;
				
				this.dialog.close = mxUtils.bind(this, function(cancel)
				{
					Editor.useLocalStorage = prevValue;
					dlgClose.apply(dlg, arguments);
					
					if (cancel && this.getCurrentFile() == null && urlParams['embed'] != '1')
					{
						this.showSplash();
					}
				});
			}
		}
	};

	/**
	 * Imports the given zip file.
	 */
	EditorUi.prototype.importZipFile = function(file, success, onerror)
	{
		var ui = this;
		
		var delayed = mxUtils.bind(this, function()
		{
			this.loadingExtensions = false;
			
			if (typeof JSZip  !== 'undefined')
			{
				JSZip.loadAsync(file).then(function(zip) 
		        {
		        	if (mxUtils.isEmptyObject(zip.files))
		        	{
		        		onerror();
		        	}
		        	else
		        	{
		        		var gliffyLatestVer = {version: 0};
		        		var drawioFound = false;
		        		
		                zip.forEach(function (relativePath, zipEntry) 
		                {
		                	var name = zipEntry.name.toLowerCase();
							
		                    if (name == 'diagram/diagram.xml') //draw.io zip format has the latest diagram version at diagram/diagram.xml
		                    {
		                    	drawioFound = true;
		                    	
			                    zipEntry.async("string").then(function(str){
			                    	if (str.indexOf('<mxfile ') == 0)
			                    	{
			                    		success(str);
			                    	}
			                    	else
		                    		{
			                    		onerror();
		                    		}
			                    });
		                    }
		                    else if (name.indexOf('versions/') == 0) //Gliffy zip format has the versions inside versions folder
		                   	{
		                    	var version = parseInt(name.substr(9)); //9 is the length of versions/
		                    	
		                    	if (version > gliffyLatestVer.version)
		                    	{
		                    		gliffyLatestVer = {version: version, zipEntry: zipEntry}
		                    	}
		                   	}
		                });
		                
		                if (gliffyLatestVer.version > 0)
		            	{
		                	gliffyLatestVer.zipEntry.async("string").then(function(data)
		                	{
		                		if (new XMLHttpRequest().upload && ui.isRemoteFileFormat(data, file.name))
		                		{
									if (ui.isOffline())
									{
										ui.showError(mxResources.get('error'), mxResources.get('notInOffline'), null, onerror);
									}
									else
									{
										ui.parseFileData(data, mxUtils.bind(this, function(xhr)
										{
											if (xhr.readyState == 4)
											{
												if (xhr.status >= 200 && xhr.status <= 299)
												{
													success(xhr.responseText);
												}
												else
												{
													onerror();
												}
											}
										}), file.name);
									}
		                		}
		                		else
		            			{
		                			onerror();
		            			}
		                	});
		            	}
		                else if (!drawioFound)
		            	{
		                	onerror();
		            	}
		        	}
		        }, function (e) {
		    		onerror(e);
		        }); 
			}
			else
			{
				onerror();
			}
		});
		
		if (typeof JSZip === 'undefined' && !this.loadingExtensions && !this.isOffline(true))
		{
			this.loadingExtensions = true;
			mxscript('js/extensions.min.js', delayed,
				null, null, null, onerror);
		}
		else
		{
			delayed();
		}
	};
	
	/**
	 * Imports the given XML into the existing diagram.
	 */
	EditorUi.prototype.importFile = function(data, mimeType, dx, dy, w, h, filename,
		done, file, crop, ignoreEmbeddedXml, evt)
	{
		crop = (crop != null) ? crop : true;
		var async = false;
		var cells = null;

		var handleResult = mxUtils.bind(this, function(xml)
		{
			var importedCells = null;
			
			if (xml != null && xml.substring(0, 10) == '<mxlibrary')
			{
				this.loadLibrary(new LocalLibrary(this, xml, filename));
			}
			else
			{
				importedCells = this.importXml(xml, dx, dy, crop, null,
					(evt != null) ? mxEvent.isControlDown(evt) : null);
			}
			
			if (done != null)
			{
				done(importedCells);
			}
		});

		if (mimeType.substring(0, 5) == 'image')
		{
			var containsModel = false;

			if (mimeType.substring(0, 9) == 'image/png')
			{
				var xml = (ignoreEmbeddedXml) ? null : this.extractGraphModelFromPng(data);
				
				if (xml != null && xml.length > 0)
				{
					cells = this.importXml(xml, dx, dy, crop, null, (evt != null) ?
						mxEvent.isControlDown(evt) : null);
					containsModel = true;
				}
			}
			
			if (!containsModel)
			{
				var graph = this.editor.graph;
				
				// Strips encoding bit (eg. ;base64,) for cell style
				var semi = data.indexOf(';');
	
				if (semi > 0)
				{
					data = data.substring(0, semi) + data.substring(data.indexOf(',', semi + 1));
				}
				
				if (crop && graph.isGridEnabled())
				{
					dx = graph.snap(dx);
					dy = graph.snap(dy);
				}

				cells = [graph.insertVertex(null, null, '', dx, dy, w, h,
					'shape=image;verticalLabelPosition=bottom;labelBackgroundColor=default;' +
					'verticalAlign=top;aspect=fixed;imageAspect=0;image=' + data + ';')];
			}
		}
		else if (/(\.*<graphml )/.test(data)) 
        {
			async = true;

			this.importGraphML(data, handleResult);
        }
		else if (file != null && filename != null && ((/(\.v(dx|sdx?))($|\?)/i.test(filename)) || /(\.vs(x|sx?))($|\?)/i.test(filename)))
		{
			//  LATER: done and async are a hack before making this asynchronous
			async = true;

			this.importVisio(file, handleResult);
		}
		else if (new XMLHttpRequest().upload && this.isRemoteFileFormat(data, filename))
		{
			if (this.isOffline())
			{
				this.showError(mxResources.get('error'), mxResources.get('notInOffline'));
			}
			else
			{
				//  LATER: done and async are a hack before making this asynchronous
				async = true;

				// Returns empty cells array as it is aysynchronous
				var parseCallback = mxUtils.bind(this, function(xhr)
				{
					if (xhr.readyState == 4)
					{
						if (xhr.status >= 200 && xhr.status <= 299)
						{
							handleResult(xhr.responseText);
						}
						else if (done != null)
						{
							done(null);
							this.showError(mxResources.get('error'), xhr.status == 413? mxResources.get('diagramTooLarge') :
													mxResources.get('unknownError'));
						}
					}
				});

				if (data != null)
				{
					this.parseFileData(data, parseCallback, filename);
				}
				else
				{
					this.parseFile(file, parseCallback, filename);
				}
			}
		}
		else if (data.indexOf('PK') == 0 && file != null)
		{
			async = true;
			
			this.importZipFile(file, handleResult, mxUtils.bind(this, function()
			{
				//If importing as a zip file failed, just insert as text
				cells = this.insertTextAt(this.validateFileData(data), dx, dy, true, null, crop);
				done(cells);
			}));
		}
		else if (!/(\.v(sd|dx))($|\?)/i.test(filename) && !/(\.vs(s|x))($|\?)/i.test(filename))
		{
			cells = this.insertTextAt(this.validateFileData(data), dx, dy, true,
				null, crop, null, (evt != null) ? mxEvent.isControlDown(evt) : null);
		}

		if (!async && done != null)
		{
			done(cells);
		}
		
		return cells;
	};

	/**
	 * 
	 */
	EditorUi.prototype.importFiles = function(files, x, y, maxSize, fn, resultFn, filterFn, barrierFn,
		resizeDialog, maxBytes, resampleThreshold, ignoreEmbeddedXml, evt)
	{
		maxSize = (maxSize != null) ? maxSize : this.maxImageSize;
		maxBytes = (maxBytes != null) ? maxBytes : this.maxImageBytes;
		
		var crop = x != null && y != null;
		var resizeImages = true;
		x = (x != null) ? x : 0;
		y = (y != null) ? y : 0;
		
		// Checks if large images are imported
		var largeImages = false;
		
		if (!mxClient.IS_CHROMEAPP && files != null)
		{
			var thresh = resampleThreshold || this.resampleThreshold;
			
			for (var i = 0; i < files.length; i++)
			{
				if (files[i].type.substring(0, 9) !== 'image/svg' &&
					files[i].type.substring(0, 6) === 'image/' &&
					files[i].size > thresh)
				{
					largeImages = true;
					
					break;
				}
			}
		}

		var doImportFiles = mxUtils.bind(this, function()
		{
			var graph = this.editor.graph;
			var gs = graph.gridSize;
	
			fn = (fn != null) ? fn : mxUtils.bind(this, function(data, mimeType, x, y, w, h, filename, done, file)
			{
				try
				{
					if (data != null && data.substring(0, 10) == '<mxlibrary')
					{
						this.spinner.stop();
						this.loadLibrary(new LocalLibrary(this, data, filename));
		    			
		    			return null;
					}
					else if (this.getServiceName() != 'atlassian' && urlParams['embed'] != '1' && 
						this.isCompatibleString(data) && files.length == 1 &&
						this.isBlankFile() && !this.canUndo())
					{
						// Opens as diagram if current file is blank with no undoable changes
						this.spinner.stop();
						this.fileLoaded(new LocalFile(this, data, filename, true));

						return null;
					}
					else
					{
						return this.importFile(data, mimeType, x, y, w, h, filename,
							done, file, crop, ignoreEmbeddedXml, evt);
					}
				}
				catch (e)
				{
					this.handleError(e);
					
					return null;
				}
			});
			
			resultFn = (resultFn != null) ? resultFn : mxUtils.bind(this, function(cells)
			{
				graph.setSelectionCells(cells);
			});
			
			if (this.spinner.spin(document.body, mxResources.get('loading')))
			{
				var count = files.length;
				var remain = count;
				var queue = [];
				
				// Barrier waits for all files to be loaded asynchronously
				var barrier = mxUtils.bind(this, function(index, fnc)
				{
					queue[index] = fnc;
					
					if (--remain == 0)
					{
						this.spinner.stop();
						
						if (barrierFn != null)
						{
							barrierFn(queue);
						}
						else
						{
							var cells = [];
							
							graph.getModel().beginUpdate();
							try
							{
						    	for (var j = 0; j < queue.length; j++)
						    	{
						    		var tmp = queue[j]();
						    		
						    		if (tmp != null)
						    		{
						    			cells = cells.concat(tmp);
						    		}
						    	}
							}
							finally
							{
								graph.getModel().endUpdate();
							}
						}
						
						resultFn(cells);
					}
				});
				
				for (var i = 0; i < count; i++)
				{
					(mxUtils.bind(this, function(index)
					{
						var file = files[index];
						
						if (file != null)
						{
							var reader = new FileReader();
							
							reader.onload = mxUtils.bind(this, function(e)
							{
								if (filterFn == null || filterFn(file))
								{
									try
									{
										if (file.type.substring(0, 6) == 'image/')
										{
											if (file.type.substring(0, 9) == 'image/svg')
											{
												// Checks if SVG contains content attribute
												var data = Graph.clipSvgDataUri(e.target.result);
												var comma = data.indexOf(',');
												var svgText = decodeURIComponent(escape(atob(data.substring(comma + 1))));
												var root = mxUtils.parseXml(svgText);
												var svgs = root.getElementsByTagName('svg');
												
												if (svgs.length > 0)
												{
													var svgRoot = svgs[0];
													var cont = (ignoreEmbeddedXml) ? null : svgRoot.getAttribute('content');
			
													if (cont != null && cont.charAt(0) != '<' && cont.charAt(0) != '%')
													{
														cont = unescape((window.atob) ? atob(cont) : Base64.decode(cont, true));
													}
													
													if (cont != null && cont.charAt(0) == '%')
													{
														cont = decodeURIComponent(cont);
													}
			
													if (cont != null && (cont.substring(0, 8) === '<mxfile ' ||
														cont.substring(0, 14) === '<mxGraphModel '))
													{
														barrier(index, mxUtils.bind(this, function()
														{
															return fn(cont, 'text/xml', x + index * gs, y + index * gs, 0, 0, file.name);	
														}));
													}
													else
													{
														// SVG needs special handling to add viewbox if missing and
														// find initial size from SVG attributes (only for IE11)
														barrier(index, mxUtils.bind(this, function()
														{
															try
															{
																// Parses SVG and find width and height
																if (root != null)
																{
																	var svgs = root.getElementsByTagName('svg');
																	
																	if (svgs.length > 0)
																	{
																		var svgRoot = svgs[0];
																		var w = svgRoot.getAttribute('width');
																		var h = svgRoot.getAttribute('height');
																		
																		if (w != null && w.charAt(w.length - 1) != '%')
																		{
																			w = parseFloat(w);
																		}
																		else
																		{
																			w = NaN;
																		}
																		
																		if (h != null && h.charAt(h.length - 1) != '%')
																		{
																			h = parseFloat(h);
																		}
																		else
																		{
																			h = NaN;
																		}
																		
																		// Check if viewBox attribute already exists
																		var vb = svgRoot.getAttribute('viewBox');
																		
																		if (vb == null || vb.length == 0)
																		{
																			svgRoot.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
																		}
																		// Uses width and height from viewbox for
																		// missing width and height attributes
																		else if (isNaN(w) || isNaN(h))
																		{
																			var tokens = vb.split(' ');
																			
																			if (tokens.length > 3)
																			{
																				w = parseFloat(tokens[2]);
																				h = parseFloat(tokens[3]);
																			}
																		}
		
																		data = Editor.createSvgDataUri(mxUtils.getXml(svgRoot));
																		var s = Math.min(1, Math.min(maxSize / Math.max(1, w)), maxSize / Math.max(1, h));
																		var cells = fn(data, file.type, x + index * gs, y + index * gs, Math.max(
																			1, Math.round(w * s)), Math.max(1, Math.round(h * s)), file.name);
																		
																		// Hack to fix width and height asynchronously
																		if (cells != null && (isNaN(w) || isNaN(h)))
																		{
																			var img = new Image();
																			
																			img.onload = mxUtils.bind(this, function()
																			{
																				w = Math.max(1, img.width);
																				h = Math.max(1, img.height);
																				
																				cells[0].geometry.width = w;
																				cells[0].geometry.height = h;
																				
																				svgRoot.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
																				data = Editor.createSvgDataUri(mxUtils.getXml(svgRoot));
																				
																				var semi = data.indexOf(';');
																				
																				if (semi > 0)
																				{
																					data = data.substring(0, semi) + data.substring(data.indexOf(',', semi + 1));
																				}
																				
																				graph.setCellStyles('image', data, [cells[0]]);
																			});
																			
																			img.src = Editor.createSvgDataUri(mxUtils.getXml(svgRoot));
																		}
																		
																		return cells;
																	}
																}
															}
															catch (e)
															{
																// ignores any SVG parsing errors
															}
															
															return null;
														}));
													}
												}
												else
												{
													barrier(index, mxUtils.bind(this, function()
													{
														return null;
													}));
												}
											}
											else
											{
												// Checks if PNG+XML is available to bypass code below
												var containsModel = false;
												
												if (file.type == 'image/png')
												{
													var xml = (ignoreEmbeddedXml) ? null : this.extractGraphModelFromPng(e.target.result);
													
													if (xml != null && xml.length > 0)
													{
														var img = new Image();
														img.src = e.target.result;
														
														barrier(index, mxUtils.bind(this, function()
														{
															return fn(xml, 'text/xml', x + index * gs, y + index * gs,
																img.width, img.height, file.name);	
														}));
														
														containsModel = true;
													}
												}
												
												// Additional asynchronous step for finding image size
												if (!containsModel)
												{
													// Cannot load local files in Chrome App
													if (mxClient.IS_CHROMEAPP)
													{
														this.spinner.stop();
														this.showError(mxResources.get('error'), mxResources.get('dragAndDropNotSupported'),
															mxResources.get('cancel'), mxUtils.bind(this, function()
															{
																// Hides the dialog
															}), null, mxResources.get('ok'), mxUtils.bind(this, function()
															{
																// Redirects to import function
																this.actions.get('import').funct();
															})
														);
													}
													else
													{
														this.loadImage(e.target.result, mxUtils.bind(this, function(img)
														{
															this.resizeImage(img, e.target.result, mxUtils.bind(this, function(data2, w2, h2)
															{
																barrier(index, mxUtils.bind(this, function()
																{
																	// Refuses to insert images above a certain size as they kill the app
																	if (data2 != null && data2.length < maxBytes)
																	{
																		var s = (!resizeImages || !this.isResampleImageSize(
																			file.size, resampleThreshold)) ? 1 :
																			Math.min(1, Math.min(maxSize / w2, maxSize / h2));
																		
																		return fn(data2, file.type, x + index * gs, y + index * gs,
																			Math.round(w2 * s), Math.round(h2 * s), file.name);
																	}
																	else
																	{
																		this.handleError({message: mxResources.get('imageTooBig')});
																		
																		return null;
																	}
																}));
															}), resizeImages, maxSize, resampleThreshold, file.size);
														}), mxUtils.bind(this, function()
														{
															this.handleError({message: mxResources.get('invalidOrMissingFile')});
														}));
													}
												}
											}
										}
										else
										{
											var data = e.target.result;
											
											fn(data, file.type, x + index * gs, y + index * gs, 240, 160, file.name, function(cells)
											{
												barrier(index, function()
												{
													return cells;
												});
											}, file);
										}
									}
									catch (e)
									{
										// Ignores file parsing error
										barrier(index, mxUtils.bind(this, function()
										{
											return null;
										}));

										if (window.console != null)
										{
											console.error(e, file);
										}
									}
								}
							});
							
							// Handles special cases
							if (/(\.v(dx|sdx?))($|\?)/i.test(file.name) || /(\.vs(x|sx?))($|\?)/i.test(file.name))
							{
								fn(null, file.type, x + index * gs, y + index * gs, 240, 160, file.name, function(cells)
								{
									barrier(index, function()
		    	    				{
		    		    				return cells;
		    	    				});
								}, file);
							}
							else if (file.type.substring(0, 5) == 'image' || file.type == 'application/pdf')
							{
								reader.readAsDataURL(file);
							}
							else
							{
								reader.readAsText(file);
							}
						}
					}))(i);
				}
			}
		});
		
		if (largeImages)
		{
			// Workaround for lost files array in async code
			var tmp = [];
			
			for (var i = 0; i < files.length; i++)
			{
				tmp.push(files[i]);
			}
			
			files = tmp;
			
			this.confirmImageResize(function(doResize)
			{
				resizeImages = doResize;
				doImportFiles();
			}, resizeDialog);
		}
		else
		{
			doImportFiles();
		}
	};

	/**
	 * Returns true if the current file is a blank diagram.
	 */
	EditorUi.prototype.isBlankFile = function()
	{
		return this.pages != null && this.pages.length == 1 &&
			this.isDiagramEmpty() && this.currentPage.getName() ==
			mxResources.get('pageWithNumber', [1]);
	};

	/**
	 * Parses the file using XHR2 via the server. File can be a blob or file object.
	 * Filename is an optional parameter for blobs (that do not have a filename).
	 */
	EditorUi.prototype.confirmImageResize = function(fn, force)
	{
		force = (force != null) ? force : false;
		var resume = (this.spinner != null && this.spinner.pause != null) ? this.spinner.pause() : function() {};
		var resizeImages = (isLocalStorage || mxClient.IS_CHROMEAPP) ? mxSettings.getResizeImages() : null;
		
		var wrapper = function(remember, resize)
		{
			if (remember || force)
			{
				mxSettings.setResizeImages((remember) ? resize : null);
				mxSettings.save();
			}
			
			resume();
			fn(resize);
		};

		if (resizeImages != null && !force)
		{
			wrapper(false, resizeImages);
		}
		else
		{
			this.showDialog(new ConfirmDialog(this, mxResources.get('resizeLargeImages'),
			function(remember)
			{
				wrapper(remember, true);
			},
			function(remember)
			{
				wrapper(remember, false);
			}, mxResources.get('resize'), mxResources.get('actualSize'),
			'<img style="margin-top:8px;" src="' + Editor.loResImage + '"/>',
			'<img style="margin-top:8px;" src="' + Editor.hiResImage + '"/>',
			isLocalStorage || mxClient.IS_CHROMEAPP).container, 340,
			(isLocalStorage || mxClient.IS_CHROMEAPP) ? 220 : 200, true, true);
		}
	};
	
	/**
	 * Parses the file using XHR2 via the server. File can be a blob or file object.
	 * Filename is an optional parameter for blobs (that do not have a filename).
	 */
	EditorUi.prototype.parseFile = function(file, fn, filename)
	{
		filename = (filename != null) ? filename : file.name;

		var reader = new FileReader();

        reader.onload = mxUtils.bind(this, function()
		{
			this.parseFileData(reader.result, fn, filename)
        });

        reader.readAsText(file);
	};

	//TODO Use this version of the function instead of creating a Blob then read it again
	EditorUi.prototype.parseFileData = function(data, fn, filename)
	{

		var xhr = new XMLHttpRequest();
		xhr.open('POST', OPEN_URL);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		xhr.onreadystatechange = function()
		{
			fn(xhr);
		};
		
		xhr.send('format=xml&filename=' + encodeURIComponent(filename) + '&data=' + encodeURIComponent(data));
		
		try
		{
			EditorUi.logEvent({category: 'GLIFFY-IMPORT-FILE',
				action: 'size_' + file.size});
		}
		catch (e)
		{
			// ignore
		}
	};
	
	/**
	 * 
	 */
	EditorUi.prototype.isResampleImageSize = function(size, thresh)
	{
		thresh = (thresh != null) ? thresh : this.resampleThreshold;

		return size > thresh;
	};
	
	/**
	 * Resizes the given image if <maxImageBytes> is not null.
	 */
	EditorUi.prototype.resizeImage = function(img, data, fn, enabled, maxSize, thresh, fileSize)
	{
		maxSize = (maxSize != null) ? maxSize : this.maxImageSize;
		var w = Math.max(1, img.width);
		var h = Math.max(1, img.height);
		
		if (enabled && this.isResampleImageSize((fileSize != null) ? fileSize : data.length, thresh))
		{
			try
			{
				var factor = Math.max(w / maxSize, h / maxSize);
				
				if (factor > 1)
				{
					var w2 = Math.round(w / factor);
					var h2 = Math.round(h / factor);
					
					var canvas = document.createElement('canvas');
				    canvas.width = w2;
				    canvas.height = h2;
	
				    var ctx = canvas.getContext('2d');
				    ctx.drawImage(img, 0, 0, w2, h2);
				    
				    var tmp = canvas.toDataURL();

				    // Uses new image if smaller
				    if (tmp.length < data.length)
				    {			    
				    	// Checks if the image is empty by comparing
				    	// with an empty image of the same size
				    	var canvas2 = document.createElement('canvas');
						canvas2.width = w2;
					    canvas2.height = h2;
					    var tmp2 = canvas2.toDataURL();
					    
					    if (tmp !== tmp2)
					    {	
					    	data = tmp;
					    	w = w2;
					    	h = h2;
					    }
				    }
				}
			}
			catch (e)
			{
				// ignores image scaling errors
			}
		}

		fn(data, w, h);
	};
	
	/**
	 * Extracts the XML from the compressed or non-compressed text chunk.
	 */
	EditorUi.prototype.extractGraphModelFromPng = function(data)
	{
		return Editor.extractGraphModelFromPng(data);
	};

	/**
	 * Loads the image from the given URI.
	 * 
	 * @param {number} dx X-coordinate of the translation.
	 * @param {number} dy Y-coordinate of the translation.
	 */
	EditorUi.prototype.loadImage = function(uri, onload, onerror)
	{
		try
		{
			var img = new Image();
			
			img.onload = function()
			{
				img.width = (img.width > 0) ? img.width : 120;
				img.height = (img.height > 0) ? img.height : 120;
				
				onload(img);
			};
			
			if (onerror != null)
			{
				img.onerror = onerror;
			};
			
			img.src = uri;
		}
		catch (e)
		{
			if (onerror != null)
			{
				onerror(e);
			}
			else
			{
				throw e;
			}
		}
	};

	/**
	 * Returns the default value for sketch mode.
	 */
	EditorUi.prototype.getDefaultSketchMode = function()
	{
		var defaultValue = urlParams['sketch'] == '1';
		var roughParam = (urlParams['rough'] != null) ? urlParams['rough'] : defaultValue;
		
		return roughParam != '0';
	};

	/**
	 * Overridden to set sketch mode before UI is created.
	 */
	var editorUiCreateUi = EditorUi.prototype.createUi;
	EditorUi.prototype.createUi = function()
	{
		if (Editor.isSettingsEnabled())
		{
			this.doSetSketchMode((mxSettings.settings.sketchMode != null && urlParams['rough'] == null &&
				urlParams['sketch'] == null) ? mxSettings.settings.sketchMode : this.getDefaultSketchMode());

			if (mxSettings.settings.sidebarTitles != null)
			{
				Sidebar.prototype.sidebarTitles = mxSettings.settings.sidebarTitles;
			}

			this.formatWidth = mxSettings.getFormatWidth();
		}
		
		editorUiCreateUi.apply(this, arguments);
	};

	/**
	 * Initializes the UI.
	 */
	var editorUiInit = EditorUi.prototype.init;
	EditorUi.prototype.init = function()
	{
		mxStencilRegistry.allowEval = mxStencilRegistry.allowEval && !this.isOfflineApp();
		
		var ui = this;
		var graph = this.editor.graph;

		// Stops panning while freehand is active
		if (Graph.touchStyle)
		{
			graph.panningHandler.isPanningTrigger = function(me)
			{
				var evt = me.getEvent();
				
			 	return (me.getState() == null && (!mxEvent.isMouseEvent(evt) &&
					!graph.freehand.isDrawing())) ||
			 		(mxEvent.isPopupTrigger(evt) && (me.getState() == null ||
			 		mxEvent.isControlDown(evt) || mxEvent.isShiftDown(evt)));
			};
		}
		
		// Starts editing PlantUML data
		graph.cellEditor.editPlantUmlData = function(cell, trigger, data)
		{
			var obj = JSON.parse(data);
			
	    	var dlg = new TextareaDialog(ui, mxResources.get('plantUml') + ':',
	    		obj.data, function(text)
			{
	    		if (text != null)
				{
	    			if (ui.spinner.spin(document.body, mxResources.get('inserting')))
	    			{
	    				ui.generatePlantUmlImage(text, obj.format, function(data, w, h)
	    				{
	    					ui.spinner.stop();

	    					graph.getModel().beginUpdate();
	    					try
	    					{
	    						if (obj.format == 'txt')
		    					{
		    						graph.labelChanged(cell, '<pre>' + data + '</pre>');
		    						graph.updateCellSize(cell, true);
		    					}
	    						else
	    						{
	    							graph.setCellStyles('image', ui.convertDataUri(data), [cell]);
	    							var geo = graph.model.getGeometry(cell);
	    							
	    							if (geo != null)
	    							{
	    								geo = geo.clone();
	    								geo.width = w;
	    								geo.height = h;
	    								graph.cellsResized([cell], [geo], false);
	    							}
	    						}
	    						
	    						graph.setAttributeForCell(cell, 'plantUmlData',
		    						JSON.stringify({data: text, format: obj.format}));
	    					}
	    					finally
	    					{
	    						graph.getModel().endUpdate();
	    					}
	    				}, function(e)
	    				{
	    					ui.handleError(e);
	    				});
	    			}
				}
			}, null, null, 400, 220);
			ui.showDialog(dlg.container, 420, 300, true, true);
			dlg.init();
		};
		
		// Starts editing Mermaid data
		graph.cellEditor.editMermaidData = function(cell, trigger, data)
		{
			var obj = JSON.parse(data);
			
	    	var dlg = new TextareaDialog(ui, mxResources.get('mermaid') + ':',
	    		obj.data, function(text)
			{
	    		if (text != null)
				{
	    			if (ui.spinner.spin(document.body, mxResources.get('inserting')))
	    			{
	    				ui.generateMermaidImage(text, obj.config, function(data, w, h)
	    				{
	    					ui.spinner.stop();

	    					graph.getModel().beginUpdate();
	    					try
	    					{
	    						graph.setCellStyles('image', data, [cell]);
    							var geo = graph.model.getGeometry(cell);
    							
    							if (geo != null)
    							{
    								geo = geo.clone();
    								geo.width = Math.max(geo.width, w);
    								geo.height = Math.max(geo.height, h);
    								graph.cellsResized([cell], [geo], false);
    							}
	    						
	    						graph.setAttributeForCell(cell, 'mermaidData',
		    						JSON.stringify({data: text, config:
		    						obj.config}, null, 2));
	    					}
	    					finally
	    					{
	    						graph.getModel().endUpdate();
	    					}
	    				}, function(e)
	    				{
	    					ui.handleError(e);
	    				});
	    			}
				}
			}, null, null, 400, 220);
			ui.showDialog(dlg.container, 420, 300, true, true);
			dlg.init();
		};
		
		// Overrides function to add editing for Plant UML.
		var cellEditorStartEditing = graph.cellEditor.startEditing;
		graph.cellEditor.startEditing = function(cell, trigger)
		{
			try
			{
				var data = this.graph.getAttributeForCell(cell, 'plantUmlData');
				
				if (data != null)
				{
					this.editPlantUmlData(cell, trigger, data);
				}
				else
				{
					data = this.graph.getAttributeForCell(cell, 'mermaidData');
				
					if (data != null)
					{
						this.editMermaidData(cell, trigger, data);
					}
					else
					{
						var style = graph.getCellStyle(cell);
						
						if (mxUtils.getValue(style, 'metaEdit', '0') == '1')
						{
							ui.showDataDialog(cell);
						}
						else
						{
							cellEditorStartEditing.apply(this, arguments);
						}
					}
				}
			}
			catch (e)
			{
				ui.handleError(e);
			}
		};

		// Redirects custom link title via UI for page links
		graph.getLinkTitle = function(href)
		{
			return ui.getLinkTitle(href);
		};
		
		// Redirects custom link via UI for page link handling
		graph.customLinkClicked = function(link)
		{
			var done = false;
			
			try
			{
				ui.handleCustomLink(link);
				done = true;
			}
			catch (e)
			{
				ui.handleError(e);
			}
			
			return done;
		};

		// Parses background page references
		var graphParseBackgroundImage = graph.parseBackgroundImage;
		
		graph.parseBackgroundImage = function(json)
		{
			var result = graphParseBackgroundImage.apply(this, arguments);

			if (result != null && result.src != null && Graph.isPageLink(result.src))
			{
				result = {originalSrc: result.src};
			}

			return result;
		};

		// Updates background page SVG
		var graphSetBackgroundImage = graph.setBackgroundImage;
		
		graph.setBackgroundImage = function(img)
		{
			if (img != null && img.originalSrc != null)
			{
				img = ui.createImageForPageLink(img.originalSrc, ui.currentPage, this);
			}

			graphSetBackgroundImage.apply(this, arguments);
		};

		// Updates background to update placeholders for page title
		this.editor.addListener('pageRenamed', mxUtils.bind(this, function()
		{
			graph.refreshBackgroundImage();
		}));

		// Updates background to update placeholders for page number
		this.editor.addListener('pageMoved', mxUtils.bind(this, function()
		{
			graph.refreshBackgroundImage();
		}));

		// Updates background image after remote changes to the referenced page
		this.editor.addListener('pagesPatched', mxUtils.bind(this, function(sender, evt)
		{
			var ref = (graph.backgroundImage != null) ? graph.backgroundImage.originalSrc : null;

			if (ref != null)
			{
				var comma = ref.indexOf(',');
				
				if (comma > 0)
				{
					var id = ref.substring(comma + 1);
					var patches = evt.getProperty('patches');
					
					for (var i = 0; i < patches.length; i++)
					{
						if ((patches[i][EditorUi.DIFF_UPDATE] != null &&
							patches[i][EditorUi.DIFF_UPDATE][id] != null) ||
							(patches[i][EditorUi.DIFF_REMOVE] != null &&
							mxUtils.indexOf(patches[i][EditorUi.DIFF_REMOVE], id) >= 0))
						{
							graph.refreshBackgroundImage();

							break;
						}
					}
				}
			}
		}));

		// Restores background page reference in output data or
		// replaces dark mode page image with normal mode image
		var graphGetBackgroundImageObject = graph.getBackgroundImageObject;
		
		graph.getBackgroundImageObject = function(obj, resolveReferences)
		{
			var result = graphGetBackgroundImageObject.apply(this, arguments);

			if (result != null && result.originalSrc != null)
			{
				if (!resolveReferences)
				{
					result = {src: result.originalSrc};
				}
				else if (resolveReferences && this.themes != null &&
					this.defaultThemeName == 'darkTheme')
				{
					var temp = this.stylesheet;
					var tempFg = this.shapeForegroundColor;
					var tempBg = this.shapeBackgroundColor;
					this.stylesheet = this.getDefaultStylesheet();
					this.shapeBackgroundColor = '#ffffff';
					this.shapeForegroundColor = '#000000';
					result = ui.createImageForPageLink(result.originalSrc);
					this.shapeBackgroundColor = tempBg;
					this.shapeForegroundColor = tempFg;
					this.stylesheet = temp;
				}
			}

			return result;
		};
		
		// Sets help link for placeholders
		if (!this.isOffline() && typeof window.EditDataDialog !== 'undefined')
		{
			EditDataDialog.placeholderHelpLink = 'https://www.drawio.com/doc/faq/predefined-placeholders';
		}
		
		if (/viewer\.diagrams\.net$/.test(window.location.hostname) ||
			/embed\.diagrams\.net$/.test(window.location.hostname))
		{
			this.editor.editBlankUrl = 'https://app.diagrams.net/';
		}
		
		// Passes dev mode to new window
		var editorGetEditBlankUrl = ui.editor.getEditBlankUrl;
		
		this.editor.getEditBlankUrl = function(params)
		{
			params = (params != null) ? params : '';

			if (urlParams['dev'] == '1')
			{
				params += ((params.length > 0) ? '&' : '?') + 'dev=1';
			}
			
			return editorGetEditBlankUrl.apply(this, arguments);
		};

		// For chromeless mode and lightbox mode in viewer
		// Must be overridden before supercall to be applied
		// in case of chromeless initialization
		var graphAddClickHandler = graph.addClickHandler;

		graph.addClickHandler = function(highlight, beforeClick, onClick)
		{
			var tmp = beforeClick;

			beforeClick = function(evt, href)
			{
				if (href == null)
				{
					var source = mxEvent.getSource(evt);
				
					if (source.nodeName.toLowerCase() == 'a')
					{
						href = source.getAttribute('href');
					}
				}
				
				if (href != null && graph.isCustomLink(href) &&
					(mxEvent.isTouchEvent(evt) ||
					!mxEvent.isPopupTrigger(evt)) &&
					graph.customLinkClicked(href))
				{
					mxEvent.consume(evt);
				}
				
				if (tmp != null)
				{
					tmp(evt, href);
				}
			};
			
			// For some reason, local argument override is not enough in this case...
			graphAddClickHandler.call(this, highlight, beforeClick, onClick);
		};

		editorUiInit.apply(this, arguments);
		
		if (mxClient.IS_SVG)
		{
			// LATER: Add shadow for labels in graph.container (eg. math, NO_FO), scaling
			this.editor.graph.addSvgShadow(graph.view.canvas.ownerSVGElement, null, true);
		}

		if (this.menus != null)
		{
			var menusAddPopupMenuItems = Menus.prototype.addPopupMenuItems;

			// Inserts zoomIn/zoomOut into popup menu
			this.menus.addPopupMenuItems = function(menu, cell, evt)
			{
				if (graph.isSelectionEmpty() && Editor.currentTheme == 'simple')
				{
					this.addMenuItems(menu, ['zoomIn', 'zoomOut', '-'], null, evt);
				}

				menusAddPopupMenuItems.apply(this, arguments);

				// Shows add to scratchpad option
				if (!graph.isSelectionEmpty() &&
					ui.addSelectionToScratchpad != null)
				{
					this.addMenuItems(menu, ['-', 'addToScratchpad'], null, evt);
				}

				if (graph.isSelectionEmpty() && Editor.currentTheme == 'simple')
				{
					this.addMenuItems(menu, ['-', 'exitGroup', 'home'], null, evt);
				}
			};

			var menusAddPopupMenuEditItems = Menus.prototype.addPopupMenuEditItems;
			
			// Inserts copyAsImage into popup menu
			this.menus.addPopupMenuEditItems = function(menu, cell, evt)
			{
				if (ui.editor.graph.isSelectionEmpty())
				{
					menusAddPopupMenuEditItems.apply(this, arguments);
					ui.menus.addMenuItems(menu, ['copyAsImage'], null, evt);
				}
				else
				{
					if (this.isShowCellEditItems())
					{
						this.addPopupDeleteItem(menu, cell, evt);
					}
					else
					{
						this.addPopupMenuArrangeItems(menu, cell, evt);
					}
			
					this.addMenuItems(menu, ['-', 'cut', 'copy', 'copyAsImage',
						'duplicate', '-'], null, evt);

					if (!this.isShowCellEditItems())
					{
						this.addPopupDeleteItem(menu, cell, evt);
					}

					this.addMenuItems(menu, ['lockUnlock', '-'], null, evt);

					if (!this.isShowStyleItems())
					{
						if (graph.getSelectionCount() == 1 && !graph.isCellLocked(cell) &&
							graph.isCellEditable(cell))
						{
							this.addSubmenu('editCell', menu, null, mxResources.get('edit'));
							menu.addSeparator();

							// Shows line submenu for edges
							if (graph.getModel().isEdge(cell))
							{
								this.addSubmenu('line', menu);

								var geo = graph.getModel().getGeometry(cell);

								if (geo != null && geo.points != null && geo.points.length > 0)
								{
									this.addMenuItems(menu, ['clearWaypoints'], null, evt);
								}
							}
						}

						if (graph.getSelectionCount() == 1)
						{
							this.addMenuItems(menu, ['enterGroup'], null, evt);
						}

						// Shows table cell options
						var ss = ui.getSelectionState();

						if (ss.mergeCell != null)
						{
							var item = this.addMenuItem(menu, 'mergeCells');
						}
						else if (ss.style['colspan'] > 1 || ss.style['rowspan'] > 1)
						{
							var item = this.addMenuItem(menu, 'unmergeCells');
						}
					}
				}
			};

			this.menus.isShowStyleItems = function()
			{
				return 	Editor.currentTheme != 'simple' &&
					Editor.currentTheme != 'sketch' &&
					Editor.currentTheme != 'min';
			};

			this.menus.isShowHistoryItems = function()
			{
				return 	Editor.currentTheme != 'simple';
			};
			
			this.menus.isShowArrangeItems = this.menus.isShowStyleItems;
			this.menus.isShowCellEditItems = this.menus.isShowStyleItems;
		}

		// Overrides print dialog size
		ui.actions.get('print').funct = function()
		{
			ui.showDialog(new PrintDialog(ui).container, 360,
				(ui.pages != null && ui.pages.length > 1) ?
				470 : 390, true, true);
		};

		// Specifies the default filename
		this.defaultFilename = mxResources.get('untitledDiagram');

		// Adds export for %page%, %pagenumber% and %pagecount% placeholders
		var graphGetExportVariables = graph.getExportVariables;
		
		graph.getExportVariables = function()
		{
			var vars = graphGetExportVariables.apply(this, arguments);
			var file = ui.getCurrentFile();
			
			if (file != null)
			{
				vars['filename'] = file.getTitle();
			}
			
			vars['pagecount'] = (ui.pages != null) ? ui.pages.length : 1;
			vars['page'] = (ui.currentPage != null) ? ui.currentPage.getName() : '';
			vars['pagenumber'] = (ui.pages != null && ui.currentPage != null) ?
				mxUtils.indexOf(ui.pages, ui.currentPage) + 1 : 1;
			
			return vars;
		};

		// Adds %page%, %pagenumber% and %pagecount% placeholders
		var graphGetGlobalVariable = graph.getGlobalVariable;
		
		graph.getGlobalVariable = function(name)
		{
			var file = ui.getCurrentFile();
			
			if (name == 'filename' && file != null)
			{
				return file.getTitle();
			}
			else if (name == 'page' && ui.currentPage != null)
			{
				return ui.currentPage.getName();
			}
			else if (name == 'pagenumber')
			{
				if (ui.currentPage != null && ui.pages != null)
				{
					return mxUtils.indexOf(ui.pages, ui.currentPage) + 1;
				}
				else
				{
					return 1;
				}
			}
			else if (name == 'pagecount')
			{
				return (ui.pages != null) ? ui.pages.length : 1;
			}
			
			return graphGetGlobalVariable.apply(this, arguments);
		};

		// Forces update of filename placeholder
		var lastFilename = null;
		var lastFile = null;

		this.addListener('fileDescriptorChanged', mxUtils.bind(this, function()
		{
			var file = this.getCurrentFile();
			var filename = (file != null && file.getTitle() != null) ?
				file.getTitle() : this.defaultFilename;
			
			if (lastFilename != filename && file == lastFile)
			{
				graph.invalidateDescendantsWithPlaceholders(
					graph.model.getRoot());
				graph.view.validate();
			}

			lastFilename = filename;
			lastFile = file;
		}));

		var graphLabelLinkClicked = graph.labelLinkClicked;
		
		graph.labelLinkClicked = function(state, elt, evt)
		{
			var href = elt.getAttribute('href');
			
			if (href != null && graph.isCustomLink(href) &&
				(mxEvent.isTouchEvent(evt) ||
				!mxEvent.isPopupTrigger(evt)))
			{
				// Active links are moved to the hint
				if (!graph.isEnabled() || (state != null && graph.isCellLocked(state.cell)))
				{
					graph.customLinkClicked(href);
					
					// Resets rubberband after click on locked cell
					graph.getRubberband().reset();
				}
				
				mxEvent.consume(evt);
			}
			else
			{
				graphLabelLinkClicked.apply(this, arguments);
			}
		};

		// Overrides editor filename
		this.editor.getOrCreateFilename = function()
		{
			var filename = ui.defaultFilename;
			var file = ui.getCurrentFile();
			
			if (file != null)
			{
				filename = (file.getTitle() != null) ? file.getTitle() : filename;
			}
			
			return filename;
		};

		// Disables print action for standalone apps on iOS
		// because there is no way to close the new window
		// LATER: Use iframe for print, disable preview
		var printAction = this.actions.get('print');
		printAction.setEnabled(!mxClient.IS_IOS || !navigator.standalone);
		printAction.visible = printAction.isEnabled();
		
		// Installs additional keyboard shortcuts for editor
		if (!this.editor.chromeless || this.editor.editable)
		{
			// Defines additional hotkeys
			this.keyHandler.bindAction(70, true, 'findReplace'); // Ctrl+F
			this.keyHandler.bindAction(77, true, 'editGeometry', true); // Ctrl+Shift+M
			this.keyHandler.bindAction(75, true, 'tags'); // Ctrl+K
			this.keyHandler.bindAction(65, false, 'insertText'); // A
			this.keyHandler.bindAction(83, false, 'insertNote'); // S
			this.keyHandler.bindAction(68, false, 'insertRectangle'); // D
			this.keyHandler.bindAction(70, false, 'insertEllipse'); // F
			this.keyHandler.bindAction(76, false, 'insertLink'); // L
			this.keyHandler.bindAction(82, false, 'insertRhombus'); // R
			this.keyHandler.bindAction(67, false, 'insertEdge'); // C
			this.keyHandler.bindAction(88, false, 'insertFreehand'); // X
			this.keyHandler.bindAction(75, true, 'toggleShapes', true); // Ctrl+Shift+K
			this.keyHandler.bindAction(54, true, 'convertDarkModeColors', true); // Ctrl+Shift+6
			this.altShiftActions[81] = 'copyStyle'; // Alt+Shift+Q
			this.altShiftActions[87] = 'pasteStyle'; // Alt+Shift+W
			this.altShiftActions[83] = 'synchronize'; // Alt+Shift+S
			
			if (urlParams['embedInline'] == '1')
			{
				graph.addListener(mxEvent.ESCAPE, function(sender, evt)
				{
					if (evt != null && graph.isEnabled() && !graph.isEditing() &&
						evt.getProperty('event') != null)
					{
						ui.actions.get('exit').funct();
					}
				});
			}

		    this.installImagePasteHandler();
		    this.installNativeClipboardHandler();
		};

		// Updates realtime state icon
		this.addListener('realtimeStateChanged', mxUtils.bind(this, function()
		{
			this.updateUserElement();
		}));

		// Creates the spinner
		this.spinner = this.createSpinner(null, null, 24);
		
		// Installs drag and drop handler for rich text editor
		if (Graph.fileSupport)
		{
			graph.addListener(mxEvent.EDITING_STARTED, mxUtils.bind(this, function(evt)
			{
				// Setup the dnd listeners
				var textElt = graph.cellEditor.text2;
				var dropElt = null;
				
				if (textElt != null)
				{
					mxEvent.addListener(textElt, 'dragleave', function(evt)
					{
						if (dropElt != null)
					    {
					    	dropElt.parentNode.removeChild(dropElt);
					    	dropElt = null;
					    }
					    
						evt.stopPropagation();
						evt.preventDefault();
					});
					
					mxEvent.addListener(textElt, 'dragover', mxUtils.bind(this, function(evt)
					{
						// IE 10 does not implement pointer-events so it can't have a drop highlight
						if (dropElt == null && (!mxClient.IS_IE || document.documentMode > 10))
						{
							dropElt = this.highlightElement(textElt);
						}
						
						evt.stopPropagation();
						evt.preventDefault();
					}));
					
					mxEvent.addListener(textElt, 'drop', mxUtils.bind(this, function(evt)
					{
					    if (dropElt != null)
					    {
					    	dropElt.parentNode.removeChild(dropElt);
					    	dropElt = null;
					    }

					    if (evt.dataTransfer.files.length > 0)
					    {
					    	this.importFiles(evt.dataTransfer.files, 0, 0, this.maxImageSize, function(data, mimeType, x, y, w, h)
					    	{
					    		// Inserts image into current text box
					    		graph.insertImage(data, w, h);
					    	}, function()
					    	{
					    		// No post processing
					    	}, function(file)
					    	{
					    		// Handles only images
					    		return file.type.substring(0, 6) == 'image/';
					    	}, function(queue)
					    	{
					    		// Invokes elements of queue in order
					    		for (var i = 0; i < queue.length; i++)
					    		{
					    			queue[i]();
					    		}
					    	}, mxEvent.isControlDown(evt));
			    		}
					    else if (mxUtils.indexOf(evt.dataTransfer.types, 'text/uri-list') >= 0)
					    {
					    	var uri = evt.dataTransfer.getData('text/uri-list');
					    	
					    	if ((/\.(gif|jpg|jpeg|tiff|png|svg)$/i).test(uri))
							{
				    			this.loadImage(decodeURIComponent(uri), mxUtils.bind(this, function(img)
				    			{
				    				var w = Math.max(1, img.width);
			    					var h = Math.max(1, img.height);
			    					var maxSize = this.maxImageSize;

				    				var s = Math.min(1, Math.min(maxSize / Math.max(1, w)), maxSize / Math.max(1, h));
				    				graph.insertImage(decodeURIComponent(uri), w * s, h * s);
				    			}));
							}
							else
							{
								document.execCommand('insertHTML', false, evt.dataTransfer.getData('text/plain'));
							}
					    }
					    else
					    {
					    	if (mxUtils.indexOf(evt.dataTransfer.types, 'text/html') >= 0)
						    {
					    		document.execCommand('insertHTML', false, evt.dataTransfer.getData('text/html'));
						    }
						    else if (mxUtils.indexOf(evt.dataTransfer.types, 'text/plain') >= 0)
						    {
						    	document.execCommand('insertHTML', false, evt.dataTransfer.getData('text/plain'));
						    }
					    }
	
					    evt.stopPropagation();
					    evt.preventDefault();
					}));
				}
			}));
		}
		
		// Adding mxRuler to editor
		if (Editor.isSettingsEnabled())
		{
			var view = this.editor.graph.view;
			view.setUnit(mxSettings.getUnit());
			
			view.addListener('unitChanged', function(sender, evt)
			{
				mxSettings.setUnit(evt.getProperty('unit'));
				mxSettings.save();		
			});

			var showRuler = this.canvasSupported && document.documentMode != 9 &&
				(urlParams['ruler'] == '1' || mxSettings.isRulerOn()) &&
				(!this.editor.isChromelessView() || this.editor.editable);
			
			this.ruler = (showRuler) ? new mxDualRuler(this, view.unit) : null;
			this.refresh();
		}
		
		// Adds an element to edit the style in the footer in test mode
		if (urlParams['styledev'] == '1')
		{
			var footer = document.getElementById('geFooter');

			if (footer != null)
			{
				this.styleInput = document.createElement('input');
				this.styleInput.setAttribute('type', 'text');
				this.styleInput.style.position = 'absolute';
				this.styleInput.style.top = '14px';
				this.styleInput.style.left = '2px';
				// Workaround for ignore right CSS property in FF
				this.styleInput.style.width = '98%';
				this.styleInput.style.visibility = 'hidden';
				this.styleInput.style.opacity = '0.9';

				mxEvent.addListener(this.styleInput, 'change', mxUtils.bind(this, function()
				{
					this.editor.graph.getModel().setStyle(this.editor.graph.getSelectionCell(), this.styleInput.value);
				}));

				footer.appendChild(this.styleInput);

				this.editor.graph.getSelectionModel().addListener(mxEvent.CHANGE, mxUtils.bind(this, function(sender, evt)
				{
					if (this.editor.graph.getSelectionCount() > 0)
					{
						var cell = this.editor.graph.getSelectionCell();
						var style = this.editor.graph.getModel().getStyle(cell);

						this.styleInput.value = style || '';
						this.styleInput.style.visibility = 'visible';
					}
					else
					{
						this.styleInput.style.visibility = 'hidden';
					}
				}));
			}

			var isSelectionAllowed = this.isSelectionAllowed;
			this.isSelectionAllowed = function(evt)
			{
				if (mxEvent.getSource(evt) == this.styleInput)
				{
					return true;
				}

				return isSelectionAllowed.apply(this, arguments);
			};
		}

		// Removes info text in page
		var info = document.getElementById('geInfo');

		if (info != null)
		{
			info.parentNode.removeChild(info);
		}

		// Installs drag and drop handler for files
		// Enables dropping files
		if (Graph.fileSupport && (!this.editor.chromeless || this.editor.editable))
		{
			// Setup the dnd listeners
			var dropElt = null;

			mxEvent.addListener(graph.container, 'dragleave', function(evt)
			{
				if (graph.isEnabled())
				{
					if (dropElt != null)
				    {
				    	dropElt.parentNode.removeChild(dropElt);
				    	dropElt = null;
				    }
				    
					evt.stopPropagation();
					evt.preventDefault();
				}
			});
			
			mxEvent.addListener(graph.container, 'dragover', mxUtils.bind(this, function(evt)
			{
				// IE 10 does not implement pointer-events so it can't have a drop highlight
				if (dropElt == null && (!mxClient.IS_IE || document.documentMode > 10))
				{
					dropElt = this.highlightElement(graph.container);
				}
				
				if (this.sidebar != null)
				{
					this.sidebar.hideTooltip();
				}

				evt.stopPropagation();
				evt.preventDefault();
			}));
			
			mxEvent.addListener(graph.container, 'drop', mxUtils.bind(this, function(evt)
			{
			    if (dropElt != null)
			    {
			    	dropElt.parentNode.removeChild(dropElt);
			    	dropElt = null;
			    }
			    
				if (graph.isEnabled())
				{
				    var pt = mxUtils.convertPoint(graph.container, mxEvent.getClientX(evt), mxEvent.getClientY(evt));
					var files = evt.dataTransfer.files;
					var tr = graph.view.translate;
					var scale = graph.view.scale;
					var x = pt.x / scale - tr.x;
					var y = pt.y / scale - tr.y;
					
				    if (files.length > 0)
				    {
						if (urlParams['embed'] != '1' && mxEvent.isShiftDown(evt))
						{
							// Closes current file if blank and no undoable changes
							if (this.isBlankFile() && !this.canUndo() &&
								this.getCurrentFile() != null)
							{
								this.fileLoaded(null);
							}

							this.openFiles(files, true);
						}
						else
				    	{
							if (mxEvent.isAltDown(evt))
							{
								x = null;
								y = null;
							}
							
							this.importFiles(files, x, y, this.maxImageSize, null, null, null,
								null, mxEvent.isControlDown(evt), null, null,
								mxEvent.isShiftDown(evt), evt);
				    	}
		    		}
				    else
				    {
						if (mxEvent.isAltDown(evt))
						{
							x = 0;
							y = 0;
						}
						
				    	var uri = (mxUtils.indexOf(evt.dataTransfer.types, 'text/uri-list') >= 0) ?
				    		evt.dataTransfer.getData('text/uri-list') : null;
				    	var data = this.extractGraphModelFromEvent(evt, this.pages != null);
				    	
				    	if (data != null)
				    	{
				    		graph.setSelectionCells(this.importXml(data, x, y, true));
				    	}
				    	else if (mxUtils.indexOf(evt.dataTransfer.types, 'text/html') >= 0)
					    {
				    		var html = evt.dataTransfer.getData('text/html');
				    		var div = document.createElement('div');
				    		div.innerHTML = Graph.sanitizeHtml(html);
				    		
				    		// The default is based on the extension
				    		var asImage = null;
				    		
				    		// Extracts single image
				    		var imgs = div.getElementsByTagName('img');

				    		if (imgs != null && imgs.length == 1)
				    		{
				    			html = imgs[0].getAttribute('src');
				    			
				    			if (html == null)
				    			{
				    				html = imgs[0].getAttribute('srcset');
				    			}
				    			
				    			// Handles special case where the src attribute has no valid extension
				    			// in which case the text would be inserted as text with a link
				    			if (!(/\.(gif|jpg|jpeg|tiff|png|svg)$/i).test(html))
				    			{
				    				asImage = true;
				    			}
				    		}
				    		else
				    		{
				    			// Extracts single link
				    			var a = div.getElementsByTagName('a');

				    			if (a != null && a.length == 1)
				    			{
				    				html = a[0].getAttribute('href');
				    			}
					    		else
					    		{
					    			// Extracts preformatted text
					    			var pre = div.getElementsByTagName('pre');
					    			
					    			if (pre != null && pre.length == 1)
					    			{
					    				html = mxUtils.getTextContent(pre[0]);
					    			}
					    		}
				    		}
				    		
				    		var resizeImages = true;
				    		
				    		var doInsert = mxUtils.bind(this, function()
				    		{
				    			graph.setSelectionCells(this.insertTextAt(html, x, y, true,
				    				asImage, null, resizeImages, mxEvent.isControlDown(evt)));
				    		});
				    		
				    		if (asImage && html != null && html.length > this.resampleThreshold)
				    		{
				    			this.confirmImageResize(function(doResize)
		    					{
		    						resizeImages = doResize;
		    						doInsert();
		    					}, mxEvent.isControlDown(evt));
				    		}
				    		else
			    			{
				    			doInsert();
			    			}
					    }
				    	else if (uri != null && (/\.(gif|jpg|jpeg|tiff|png|svg)$/i).test(uri))
						{
			    			this.loadImage(decodeURIComponent(uri), mxUtils.bind(this, function(img)
			    			{
			    				var w = Math.max(1, img.width);
		    					var h = Math.max(1, img.height);
		    					var maxSize = this.maxImageSize;

			    				var s = Math.min(1, Math.min(maxSize / Math.max(1, w)), maxSize / Math.max(1, h));

			    				graph.setSelectionCell(graph.insertVertex(null, null, '', x, y, w * s, h * s,
			    					'shape=image;verticalLabelPosition=bottom;labelBackgroundColor=default;' +
			    					'verticalAlign=top;aspect=fixed;imageAspect=0;image=' + uri + ';'));
			    			}), mxUtils.bind(this, function(img)
			    			{
			    				graph.setSelectionCells(this.insertTextAt(uri, x, y, true));
			    			}));
						}
					    else if (mxUtils.indexOf(evt.dataTransfer.types, 'text/plain') >= 0)
					    {
					    	graph.setSelectionCells(this.insertTextAt(evt.dataTransfer.getData('text/plain'), x, y, true));
					    }
					}
				}

			    evt.stopPropagation();
			    evt.preventDefault();
			}), false);
		}

		graph.enableFlowAnimation = true;
		this.initPages();

		// Embedded mode
		if (urlParams['embed'] == '1')
		{
			this.initializeEmbedMode();
		}

		var themeChangeListener = mxUtils.bind(this, function()
		{
			graph.refresh();
			graph.view.validateBackground();
			this.updateDocumentTitle();
			this.updateTabContainer();
			this.hideShapePicker();
		});

		this.addListener('darkModeChanged', themeChangeListener);
		this.addListener('sketchModeChanged', themeChangeListener);
		this.addListener('currentThemeChanged', mxUtils.bind(this, function()
		{
			if (this.sidebar != null)
			{
				this.sidebar.updateEntries();
			}

			this.updateButtonContainer();
			this.updateDocumentTitle();
			this.refresh();
		}));
		
		graph.addListener('enabledChanged', mxUtils.bind(this, function()
		{
			if (!graph.isEnabled())
			{
				this.hideShapePicker();
			}
		}));

		// Overrides mxWindow.fit to allow for embedViewport
		var ui = this;

		mxWindow.prototype.fit = function()
		{
			if (!Editor.inlineFullscreen && ui.embedViewport != null)
			{
				var left = parseInt(this.div.offsetLeft);
				var width = parseInt(this.div.offsetWidth);
				var right = ui.embedViewport.x + ui.embedViewport.width;
				var top = parseInt(this.div.offsetTop);
				var height = parseInt(this.div.offsetHeight);
				var bottom = ui.embedViewport.y + ui.embedViewport.height;

				this.div.style.left = Math.max(ui.embedViewport.x, Math.min(left, right - width)) + 'px';
				this.div.style.top = Math.max(ui.embedViewport.y, Math.min(top, bottom - height)) + 'px';
				this.div.style.height = Math.min(ui.embedViewport.height, parseInt(this.div.style.height)) + 'px';
				this.div.style.width = Math.min(ui.embedViewport.width, parseInt(this.div.style.width)) + 'px';
			}
			else
			{
				mxUtils.fit(this.div);
			}
		};

		if (!this.editor.chromeless || this.editor.editable)
		{
			// Activates scheme in UI
			if (Editor.currentTheme == 'simple' ||
				Editor.currentTheme == 'sketch')
			{
				var theme = Editor.currentTheme;
				Editor.currentTheme = '';
				this.doSetCurrentTheme(theme, 0, mxUtils.bind(this, function()
				{
					if (urlParams['embedInline'] == '1')
					{
						// Inline embed mode must be initialized after setting current theme
						this.initializeInlineEmbedMode();
					}
					else
					{
						// Initial state of format panel
						var iw = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
						
						if (iw < Editor.smallScreenWidth)
						{
							this.toggleFormatPanel(false);
						}
					}

					this.fireEvent(new mxEventObject('themeInitialized'));
				}));
			}
		}

		if (Editor.currentTheme != 'atlas')
		{
			if (!mxClient.IS_IE && !mxClient.IS_IE11 && urlParams['dark'] != '0' &&
				Editor.currentTheme != 'atlas' && (urlParams['embed'] != '1' ||
				urlParams['dark'] == '1' || urlParams['dark'] == 'auto' ||
				Editor.currentTheme == 'dark' || urlParams['atlas'] == '1'))
			{
				var darkMode = false;

				if (this.isAutoDarkModeSupported() && this.isAutoDarkMode())
				{
					darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
				}
				else if (urlParams['dark'] == null && Editor.isSettingsEnabled() &&
					mxSettings.settings.darkMode === true)
				{
					darkMode = true;
				}
				
				if (darkMode || urlParams['dark'] == '1' ||
					Editor.currentTheme == 'dark')
				{
					this.setDarkMode(true);
				}
			}

			if (this.isAutoDarkModeSupported())
			{
				try
				{
					// Automatically updates theme when system setting changes
					window.matchMedia('(prefers-color-scheme: dark)')
						.addEventListener('change', mxUtils.bind(this, function (e)
						{
							if (this.isAutoDarkMode())
							{
								this.setDarkMode(e.matches);
							}
						}));
				}
				catch (e)
				{
					// Ignores object doesn't support addEventListener and disables auto dark mode
					this.actions.get('autoMode').setEnabled(false);
				}
			}
			else if (Editor.isSettingsEnabled() && mxSettings.settings.darkMode === true)
			{
				darkMode = true;
			}
		}
		
		this.installSettings();

		if (screen.width <= Editor.smallScreenWidth)
		{
			this.formatWidth = 0;
		}
		
		if (urlParams['prefetchFonts'] == '1')
		{
			ui.editor.loadFonts();
		}
	};

	/**
	 * Adapts the UI elements when the window size changes.
	 */
	var editorUiWindowResized = EditorUi.prototype.windowResized;

	EditorUi.prototype.windowResized = function()
	{
		if (Editor.currentTheme == 'simple')
		{
			var iw = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
			var limit = Editor.smallScreenWidth;

			if (this.lastWindowWidth != null && this.lastWindowWidth >= limit && iw < limit)
			{
				if (this.isFormatPanelVisible())
				{
					this.toggleFormatPanel(false);
				}
			}
			else if (this.lastWindowWidth != null && this.lastWindowWidth < limit && iw >= limit)
			{
				if (!this.isFormatPanelVisible())
				{
					this.toggleFormatPanel(true);
				}
			}

			this.lastWindowWidth = iw;
		}

		editorUiWindowResized.apply(this, arguments);
	};

	/**
	 * Initializes embed inline mode.
	 */
	EditorUi.prototype.initializeInlineEmbedMode = function()
	{
		var footer = this.sketchFooterMenuElt;
		var toolbar = this.sketchMainMenuElt;
		var picker = this.sketchPickerMenuElt;
		var graph = this.editor.graph;
		picker.style.transform = '';

		mxEvent.addGestureListeners(this.diagramContainer.parentNode, mxUtils.bind(this, function(evt)
		{
			if (mxEvent.getSource(evt) == this.diagramContainer.parentNode)
			{
				this.embedExitPoint = new mxPoint(
					mxEvent.getClientX(evt),
					mxEvent.getClientY(evt));
				this.sendEmbeddedSvgExport();
			}
		}));

		document.body.style.cursor = 'text';

		var div = document.createElement('div');
		div.style.position = 'absolute';
		div.style.width = '10px';
		div.style.height = '10px';
		div.style.borderRadius = '5px';
		div.style.border = '1px solid gray';
		div.style.background = '#ffffff';
		div.style.cursor = 'row-resize';

		this.diagramContainer.parentNode.appendChild(div);
		this.bottomResizer = div;

		var x0 = null;
		var y0 = null;
		var w0 = null;
		var h0 = null;

		mxEvent.addGestureListeners(div, mxUtils.bind(this, function(evt)
		{
			h0 = parseInt(this.diagramContainer.style.height);
			y0 = mxEvent.getClientY(evt);
			graph.popupMenuHandler.hideMenu();
			mxEvent.consume(evt);
		}));

		div = div.cloneNode(false);
		div.style.cursor = 'col-resize';
		this.diagramContainer.parentNode.appendChild(div);
		this.rightResizer = div;

		mxEvent.addGestureListeners(div, mxUtils.bind(this, function(evt)
		{
			w0 = parseInt(this.diagramContainer.style.width);
			x0 = mxEvent.getClientX(evt);
			graph.popupMenuHandler.hideMenu();
			mxEvent.consume(evt);
		}));

		mxEvent.addGestureListeners(document.body, null, mxUtils.bind(this, function(evt)
		{
			var changed = false;

			if (x0 != null)
			{
				this.diagramContainer.style.width = Math.max(20,
					w0 + mxEvent.getClientX(evt) - x0) + 'px';
				changed = true;
			}

			if (y0 != null)
			{
				this.diagramContainer.style.height = Math.max(20,
					h0 + mxEvent.getClientY(evt) - y0) + 'px';
				changed = true;
			}

			if (changed)
			{
				var parent = window.opener || window.parent;
				parent.postMessage(JSON.stringify({
					event: 'resize',
					fullscreen: Editor.inlineFullscreen,
					rect: this.diagramContainer.getBoundingClientRect()
				}), '*');
				this.inlineSizeChanged();
				this.refresh();
			}
		}), function(evt)
		{
			if (x0 != null || y0 != null)
			{
				mxEvent.consume(evt);
			}

			x0 = null;
			y0 = null;
		});

		document.body.style.backgroundColor = 'transparent';
		this.diagramContainer.style.borderRadius = '4px';
		this.bottomResizer.style.visibility = 'hidden';
		this.rightResizer.style.visibility = 'hidden';
		this.sketchMenubarElt.style.display = 'none';
		toolbar.style.visibility = 'hidden';
		footer.style.visibility = 'hidden';
		picker.style.display = 'none';
		
		this.addListener('editInlineStart', mxUtils.bind(this, function(evt)
		{
			this.inlineSizeChanged();
			this.fitWindows();
		}));

		if (!Editor.enableCssDarkMode)
		{
			this.addListener('darkModeChanged', mxUtils.bind(this, function(evt)
			{
				this.inlineSizeChanged();
			}));
		}

		this.addListener('editInlineStop', mxUtils.bind(this, function(evt)
		{
			this.diagramContainer.style.width = '10px';
			this.diagramContainer.style.height = '10px';
			this.diagramContainer.style.border = '';
			this.bottomResizer.style.visibility = 'hidden';
			this.rightResizer.style.visibility = 'hidden';
			toolbar.style.visibility = 'hidden';
			footer.style.visibility = 'hidden';
			picker.style.display = 'none';
		}));

		// Overridden to avoid reset of scrollbars
		this.windowResized = mxUtils.bind(this, function()
	   	{
	   		// do nothing
	   	});

		this.inlineSizeChanged();
	};
	
	/**
	 * Installs handler for pasting image from clipboard.
	 */
	EditorUi.prototype.installImagePasteHandler = function()
	{
		if (!mxClient.IS_IE)
		{
			var graph = this.editor.graph;
			
			graph.container.addEventListener('paste', mxUtils.bind(this, function(evt)
			{
				if (!mxEvent.isConsumed(evt))
				{
					try
					{
						var data = (evt.clipboardData || evt.originalEvent.clipboardData);
						var containsText = false;
						
						// Workaround for asynchronous paste event processing in textInput
						// is to ignore this event if it contains text/html/rtf (see below).
						// NOTE: Image is not pasted into textInput so can't listen there.
						for (var i = 0; i < data.types.length; i++)
						{	
							if (data.types[i].substring(0, 5) === 'text/')
							{
								containsText = true;
								break;
							}
						}
						
						if (!containsText)
						{
							var items = data.items;
							
							for (index in items)
							{
								var item = items[index];
								
								if (item.kind === 'file')
								{
									if (graph.isEditing())
									{
								    	this.importFiles([item.getAsFile()], 0, 0, this.maxImageSize, function(data, mimeType, x, y, w, h)
								    	{
								    		// Inserts image into current text box
								    		graph.insertImage(data, w, h);
								    	}, function()
								    	{
								    		// No post processing
								    	}, function(file)
								    	{
								    		// Handles only images
								    		return file.type.substring(0, 6) == 'image/';
								    	}, function(queue)
								    	{
								    		// Invokes elements of queue in order
								    		for (var i = 0; i < queue.length; i++)
								    		{
								    			queue[i]();
								    		}
								    	});
									}
									else
									{
										var pt = this.editor.graph.getInsertPoint();
										this.importFiles([item.getAsFile()], pt.x, pt.y, this.maxImageSize);
										mxEvent.consume(evt);
									}
									
									break;
								}
							}
						}
					}
					catch (e)
					{
						// ignore
					}
				}
			}), false);
		}
	};
	
	/**
	 * Installs the native clipboard support.
	 */
	EditorUi.prototype.installNativeClipboardHandler = function()
	{
		var graph = this.editor.graph;

		// Focused but invisible textarea during control or meta key events
		// LATER: Disable text rendering to avoid delay while keeping focus
		var textInput = document.createElement('div');
		textInput.setAttribute('autocomplete', 'off');
		textInput.setAttribute('autocorrect', 'off');
		textInput.setAttribute('autocapitalize', 'off');
		textInput.setAttribute('spellcheck', 'false');
		textInput.style.textRendering = 'optimizeSpeed';
		textInput.style.fontFamily = 'monospace';
		textInput.style.wordBreak = 'break-all';
		textInput.style.background = 'transparent';
		textInput.style.color = 'transparent';
		textInput.style.position = 'absolute';
		textInput.style.whiteSpace = 'nowrap';
		textInput.style.overflow = 'hidden';
		textInput.style.display = 'block';
		textInput.style.fontSize = '1';
		textInput.style.zIndex = '-1';
		textInput.style.resize = 'none';
		textInput.style.outline = 'none';
		textInput.style.width = '1px';
		textInput.style.height = '1px';
		mxUtils.setOpacity(textInput, 0);
		textInput.contentEditable = true;
		textInput.innerHTML = '&nbsp;';

		var restoreFocus = false;
		
		// Disables built-in cut, copy and paste shortcuts
		this.keyHandler.bindControlKey(88, null);
		this.keyHandler.bindControlKey(67, null);
		this.keyHandler.bindControlKey(86, null);

		// Shows a textare when control/cmd is pressed to handle native clipboard actions
		mxEvent.addListener(document, 'keydown', mxUtils.bind(this, function(evt)
		{
			// No dialog visible
			var source = mxEvent.getSource(evt);
			
			if (graph.container != null && graph.isEnabled() && !graph.isMouseDown && !graph.isEditing() &&
				this.dialog == null && source.nodeName != 'INPUT' && source.nodeName != 'TEXTAREA')
			{
				if (evt.keyCode == 224 /* FF */ || (!mxClient.IS_MAC && evt.keyCode == 17 /* Control */) ||
					(mxClient.IS_MAC && (evt.keyCode == 91 || evt.keyCode == 93) /* Left/Right Meta */))
				{
					// Cannot use parentNode for check in IE
					if (!restoreFocus)
					{
						// Avoid autoscroll but allow handling of all pass-through ctrl shortcuts
						textInput.style.left = (graph.container.scrollLeft + 10) + 'px';
						textInput.style.top = (graph.container.scrollTop + 10) + 'px';
						var x0 = graph.container.scrollLeft;
						var y0 = graph.container.scrollTop;

						graph.container.appendChild(textInput);
						restoreFocus = true;
						
						textInput.focus();
						document.execCommand('selectAll', false, null);

						// Workaround for Safari 16 scroll after CMD key press
						graph.container.scrollLeft = x0;
						graph.container.scrollTop = y0;
					}
				}
			}
		}));

		// Clears input and restores focus and selection
		function clearInput()
		{
			window.setTimeout(function()
			{
				textInput.innerHTML = '&nbsp;';
				textInput.focus();
				document.execCommand('selectAll', false, null);
			}, 0);
		};
		
		mxEvent.addListener(document, 'keyup', mxUtils.bind(this, function(evt)
		{
			// Workaround for asynchronous event read invalid in IE quirks mode
			var keyCode = evt.keyCode;
			
			// Asynchronous workaround for scroll to origin after paste if the
			// Ctrl-key is not pressed for long enough in FF on Windows
			window.setTimeout(mxUtils.bind(this, function()
			{
				if (restoreFocus && (keyCode == 224 /* FF */ || keyCode == 17 /* Control */ ||
					keyCode == 91 /* MetaLeft */ || keyCode == 93 /* MetaRight */))
				{
					restoreFocus = false;
					
					if (!graph.isEditing() && this.dialog == null && graph.container != null)
					{
						graph.container.focus();
					}
					
					textInput.parentNode.removeChild(textInput);
					
					// Workaround for lost cursor in focused element
					if (this.dialog == null)
					{
						mxUtils.clearSelection();
					}
				}
			}), 0);
		}));
		
		mxEvent.addListener(textInput, 'copy', mxUtils.bind(this, function(evt)
		{
			if (graph.isEnabled())
			{
				try
				{
					mxClipboard.copy(graph);
					this.copyCells(textInput);
					clearInput();
				}
				catch (e)
				{
					this.handleError(e);
				}
			}
		}));
		
		mxEvent.addListener(textInput, 'cut', mxUtils.bind(this, function(evt)
		{
			if (graph.isEnabled())
			{
				try
				{
					mxClipboard.copy(graph);
					this.copyCells(textInput, true);
					clearInput();
				}
				catch (e)
				{
					this.handleError(e);
				}
			}
		}));
		
		mxEvent.addListener(textInput, 'paste', mxUtils.bind(this, function(evt)
		{
			if (graph.isEnabled() && !graph.isCellLocked(graph.getDefaultParent()))
			{
				try
				{
					textInput.innerHTML = '&nbsp;';
					textInput.focus();
					
					if (evt.clipboardData != null)
					{
						Graph.removePasteFormatting(textInput.firstChild);
						this.pasteCells(evt, textInput, true, true);
					}

					if (!mxEvent.isConsumed(evt))
					{
						var x0 = graph.container.scrollLeft;
						var y0 = graph.container.scrollTop;

						window.setTimeout(mxUtils.bind(this, function()
						{
							try
							{
								// Workaround for Safari 16 scroll after paste
								graph.container.scrollLeft = x0;
								graph.container.scrollTop = y0;
								Graph.removePasteFormatting(textInput.firstChild);
								this.pasteCells(evt, textInput, false, true);
							}
							catch (e)
							{
								this.handleError(e);
							}
						}), 0);
					}
				}
				catch (e)
				{
					this.handleError(e);
				}
			}
		}), true);
		
		// Needed for IE11
		var isSelectionAllowed2 = this.isSelectionAllowed;
		this.isSelectionAllowed = function(evt)
		{
			if (mxEvent.getSource(evt) == textInput)
			{
				return true;
			}

			return isSelectionAllowed2.apply(this, arguments);
		};
	};

	/**
	 * Sets the current UI theme. Possible values are null, "kennedy" and "sketch".
	 */
	EditorUi.prototype.setCurrentTheme = function(value, noRestart)
	{
		mxSettings.setUi(value);
		noRestart = this.doSetCurrentTheme(value) || noRestart;

		if (!noRestart)
		{
			this.alert(mxResources.get('restartForChangeRequired'));
		}
	};

	/**
	 * Changes the current UI theme.
	 */
	EditorUi.prototype.isDefaultTheme = function(theme)
	{
		return theme == '' || theme == 'dark' || theme == 'default' ||
			theme == 'kennedy' || theme == null;
	};
	
	/**
	 * Changes the current UI theme.
	 */
	EditorUi.prototype.doSetCurrentTheme = function(value, delay, post)
	{
		delay = (delay != null) ? delay : 150;

		function isSimple(theme)
		{
			return theme == 'simple' || (delay == 0 &&
				theme == 'sketch');
		};

		// From kennedy to simple or sketch or vice versa
		var curr = Editor.currentTheme;
		var transition = (isSimple(curr) && this.isDefaultTheme(value)) ||
			(this.isDefaultTheme(curr) && isSimple(value));
		var noRestart = transition && (value != 'sketch' && curr != 'sketch');

		if (transition && !this.themeSwitching)
		{
			Editor.currentTheme = value;
			this.themeSwitching = true;
			var scrollState = this.saveScrollState();

			mxUtils.setPrefixedStyle(this.container.style, 'transition',
				'all ' + delay + 'ms ease-in-out');

			if (delay == 0)
			{
				this.container.style.opacity = '0';
			}

			window.setTimeout(mxUtils.bind(this, function()
			{
				this.editor.graph.stopEditing(false);
				this.container.style.opacity = '0';

				window.setTimeout(mxUtils.bind(this, function()
				{
					if (isSimple(curr) && this.isDefaultTheme(value))
					{
						this.menubarContainer.style.display = '';
						this.toolbarContainer.style.display = 'block';
						this.tabContainer.style.display = 'flex';
						this.hsplit.style.display = 'block';
						this.menubarHeight = App.prototype.menubarHeight;
					}
					else if (this.isDefaultTheme(curr) && isSimple(value))
					{
						this.menubarContainer.style.display = 'none';
						this.toolbarContainer.style.display = 'none';
						this.menubarHeight = 0;

						if (value != 'simple')
						{
							this.tabContainer.style.display = 'none';
							this.hsplit.style.display = 'none';
							this.hsplitPosition = 0;
						}
						else
						{
							this.tabContainer.style.display = 'flex';
						}
					}

					this.switchTheme(value);

					window.setTimeout(mxUtils.bind(this, function()
					{
						this.fireEvent(new mxEventObject('currentThemeChanged'));
						this.editor.fireEvent(new mxEventObject('statusChanged'));
						this.editor.graph.refresh();
						this.restoreScrollState(scrollState);
						this.container.style.opacity = '';

						window.setTimeout(mxUtils.bind(this, function()
						{
							mxUtils.setPrefixedStyle(this.container.style, 'transition', null);
							delete this.themeSwitching;

							if (isLocalStorage && isSimple(value))
							{
								this.setTabContainerVisible((mxSettings.settings.pages != null) ?
									mxSettings.settings.pages : true);
							}

							if (post != null)
							{
								post();
							}
						}), delay);
					}), delay);
				}), delay);
			}), 0);
		}

		return noRestart;
	};

	/**
	 * Overrides image dialog to add image search and Google+.
	 */
	EditorUi.prototype.installStatusMinimizer = function(parent)
	{
		parent = (parent != null) ? parent : this.statusContainer.parentNode;
		var visible = false;
		
		mxEvent.addListener(parent, 'mouseenter', mxUtils.bind(this, function()
		{
			if (Editor.currentTheme == 'sketch' && this.editor.getStatus() != '')
			{
				this.statusContainer.style.display = 'inline-flex';
			}
		}));
		
		mxEvent.addListener(parent, 'mouseleave', mxUtils.bind(this, function()
		{
			if (Editor.currentTheme == 'sketch' && !visible)
			{
				this.statusContainer.style.display = 'none';
			}
		}));

		var statusChanged = mxUtils.bind(this, function()
		{
			if (Editor.currentTheme == 'sketch')
			{
				var elt = (this.statusContainer.firstChild != null &&
					typeof this.statusContainer.firstChild.getAttribute === 'function') ?
					this.statusContainer.firstChild : null;
				visible = elt != null && elt.getAttribute('class') != null;
				
				if (!visible && elt != null)
				{
					var title = elt.getAttribute('title');
					var file = this.getCurrentFile();
					var key = (file != null) ? file.savingStatusKey :
						DrawioFile.prototype.savingStatusKey;
					
					// Shows animated spinner while saving
					if (title == mxResources.get(key) + '...')
					{
						this.statusContainer.innerHTML = '<div><img title="' + mxUtils.htmlEntities(
							mxResources.get(key)) + '...' + '"src="' + Editor.tailSpin + '"></div>';
						visible = true;
					}
				}

				// Checks size of container without status
				this.statusContainer.style.display = 'none';
				var empty = parent.clientWidth <= 32;

				// Hides container if empty and no status
				parent.style.visibility = (empty && this.editor.getStatus() == '') ?
					'hidden' : '';

				// Shows status if container empty or status relevant
				if (empty || visible)
				{
					this.statusContainer.style.display = 'inline-flex';
					visible = true;
				}
			}
			else if (Editor.currentTheme == 'simple')
			{
				// Required for flex layout gaps to be applied correctly
				this.statusContainer.style.display = 'inline-flex';
				this.statusContainer.style.display = (this.statusContainer.clientWidth == 0)
					? 'none' : 'inline-flex';
			}
			else
			{
				this.statusContainer.style.display = 'inline-flex';
			}
		});
		
		this.editor.addListener('statusChanged', statusChanged);
		statusChanged();
	};

	/**
	 * Overrides image dialog to add image search and Google+.
	 */
	EditorUi.prototype.switchTheme = function(value)
	{
		// Removes containers before destroying windows
		if (this.isDefaultTheme(value))
		{
			// Format window
			if (this.formatContainer != null)
			{
				this.formatContainer.style.left = '';
				this.formatContainer.style.zIndex = '1';
				this.formatContainer.style.border = '';

				if (this.footerContainer != null)
				{
					if (this.footerContainer.parentNode !=
						this.formatContainer.parentNode)
					{
						this.footerContainer.parentNode.insertBefore(
							this.formatContainer, this.footerContainer);
					}
				}

				// Shapes window
				if (this.sidebarContainer != null)
				{
					if (this.formatContainer.parentNode !=
						this.sidebarContainer.parentNode)
					{
						this.formatContainer.parentNode.insertBefore(
							this.sidebarContainer, this.formatContainer);
					}
				}
			}
		}

		this.destroyWindows();
		this.updateUserElement();
		this.updateDefaultStyles();
		this.switchThemeConstants(value);
		this.switchCssForTheme(value);
		this.createWrapperForTheme(value);
		this.createMainMenuForTheme(value);
		this.createFooterMenuForTheme(value);
		this.createPickerMenuForTheme(value);
		this.createMenubarForTheme(value);

		// TODO: Check what hides sidebarContainer
		this.sidebarContainer.style.display = '';

		if (value == 'sketch')
		{
			// Format window
			this.createFormatWindow();
			this.formatContainer.style.left = '0px';
			this.formatContainer.style.top = '0px';
			this.formatContainer.style.width = '';
			this.formatContainer.style.zIndex = '';
			this.formatContainer.style.border = 'none';

			// Shapes window
			var libs = Editor.enableCustomLibraries && (urlParams['embed'] != '1' ||
				urlParams['libraries'] == '1');
			
			this.createShapesWindow();
			this.sidebarContainer.className = '';
			this.sidebarContainer.style.position = 'absolute';
			this.sidebarContainer.style.left = '0px';
			this.sidebarContainer.style.top = '0px';
			this.sidebarContainer.style.bottom = (libs) ? '32px' : '0px';
			this.sidebarContainer.style.width = '100%';
		}

		// Format panel close button
		if (this.format != null)
		{
			var closeButton = this.isDefaultTheme(value) || value == 'atlas'; 

			if (this.format.showCloseButton != closeButton)
			{
				this.format.showCloseButton = closeButton;
				this.format.refresh();
			}
		}
	};

	/**
	 * Overrides image dialog to add image search and Google+.
	 */
	EditorUi.prototype.getWindows = function()
	{
		var wnd = [this.sidebarWindow, this.formatWindow, this.freehandWindow];

		if (this.actions != null)
		{
			wnd = wnd.concat([this.actions.outlineWindow, this.actions.layersWindow]);
		}

		if (this.menus != null)
		{
			wnd = wnd.concat([this.menus.tagsWindow, this.menus.findWindow,
				this.menus.findReplaceWindow, this.menus.commentsWindow]);
		}

		return wnd;
	};

	/**
	 * Overrides image dialog to add image search and Google+.
	 */
	EditorUi.prototype.fitWindows = function()
	{
		var wnd = this.getWindows();

		for (var i = 0; i < wnd.length; i++)
		{
			if (wnd[i] != null)
			{
				wnd[i].window.fit();
			}
		}
	};

	/**
	 * Overrides image dialog to add image search and Google+.
	 */
	EditorUi.prototype.hideWindows = function()
	{
		var wnd = this.getWindows();

		for (var i = 0; i < wnd.length; i++)
		{
			if (wnd[i] != null)
			{
				wnd[i].window.setVisible(false);
			}
		}
	};

	/**
	 * Overrides image dialog to add image search and Google+.
	 */
	EditorUi.prototype.destroyWindows = function()
	{
        if (this.sidebarWindow != null)
        {
            this.sidebarWindow.destroy();
            this.sidebarWindow = null;
        }
        
        if (this.formatWindow != null)
        {
        	this.formatWindow.destroy();
        	this.formatWindow = null;
        }

		if (this.freehandWindow != null)
		{
        	this.freehandWindow.destroy();
        	this.freehandWindow = null;
        }

        if (this.actions.outlineWindow != null)
        {
        	this.actions.outlineWindow.destroy();
        	this.actions.outlineWindow = null;
        }

        if (this.actions.layersWindow != null)
        {
        	this.actions.layersWindow.destroy();
        	this.actions.layersWindow = null;
        }

		if (this.menus != null)
		{
			if (this.menus.tagsWindow != null)
			{
				this.menus.tagsWindow.destroy();
				this.menus.tagsWindow = null;
			}

			if (this.menus.findWindow != null)
			{
				this.menus.findWindow.destroy();
				this.menus.findWindow = null;
			}

			if (this.menus.findReplaceWindow != null)
			{
				this.menus.findReplaceWindow.destroy();
				this.menus.findReplaceWindow = null;
			}

			if (this.menus.commentsWindow != null)
			{
				this.menus.commentsWindow.destroy();
				this.menus.commentsWindow = null;
			}
		}
	};

	/**
	 * Overrides image dialog to add image search and Google+.
	 */
	EditorUi.prototype.switchThemeConstants = function(value)
	{
		var graph = this.editor.graph;
		graph.defaultEdgeLength = Graph.prototype.defaultEdgeLength;
		graph.defaultGridEnabled = Graph.prototype.defaultGridEnabled;
		graph.defaultPageVisible = Graph.prototype.defaultPageVisible;

		if (this.menus != null)
		{
			this.menus.autoPopup = value != 'simple' && value != 'sketch';
		}

		if (value == 'simple' || value == 'sketch')
		{
			Editor.fitWindowBorders = new mxRectangle(60, 30, 30, 30);
			graph.defaultEdgeLength = 120;

			if (urlParams['grid'] == null)
			{
				graph.defaultGridEnabled = false;
			}

			if (urlParams['pv'] == null)
			{
				graph.defaultPageVisible = false;
			}
		}
		else
		{
			Editor.fitWindowBorders = null;
		}
	};

	/**
	 * Overrides image dialog to add image search and Google+.
	 */
	EditorUi.prototype.switchCssForTheme = function(value)
	{
		if (value == 'simple' || value == 'sketch')
		{
			if (this.sketchStyleElt == null)
			{
				this.sketchStyleElt = document.createElement('style');
				this.sketchStyleElt.setAttribute('type', 'text/css');
				this.sketchStyleElt.innerHTML = Editor.createMinimalCss();
				document.getElementsByTagName('head')[0].appendChild(this.sketchStyleElt);
			}
		}
		else
		{
			if (this.sketchStyleElt != null)
			{
				this.sketchStyleElt.parentNode.removeChild(this.sketchStyleElt);
				this.sketchStyleElt = null;
			}
		}
	};

	/**
	 * Overrides image dialog to add image search and Google+.
	 */
	EditorUi.prototype.createWrapperForTheme = function(value)
	{
		if (value == 'simple' || value == 'sketch')
		{
			if (this.sketchWrapperElt == null)
			{
				this.sketchWrapperElt = document.createElement('div');
				this.sketchWrapperElt.style.cssText = 'position:absolute;' +
					'top:0px;left:0px;right:0px;bottom:0px;overflow:hidden;';
			}

			if (value == 'sketch')
			{
				this.sketchWrapperElt.className = 'geSketch';
			}

			this.diagramContainer.parentNode.appendChild(this.sketchWrapperElt);
			this.sketchWrapperElt.appendChild(this.diagramContainer);
		}
		else if (this.sketchWrapperElt != null && this.sketchWrapperElt.parentNode != null)
		{
			this.tabContainer.parentNode.insertBefore(this.diagramContainer, this.tabContainer);
			this.sketchWrapperElt.parentNode.removeChild(this.sketchWrapperElt);
		}
	};

	/**
	 * Overrides image dialog to add image search and Google+.
	 */
	EditorUi.prototype.createMainMenuForTheme = function(value)
	{
		if (value == 'simple' || value == 'sketch')
		{
			if (this.sketchMainMenuElt == null)
			{
				this.sketchMainMenuElt = document.createElement('div');
				this.sketchMainMenuElt.style.cssText = 'position:absolute;' +
					'padding:9px 12px;overflow:hidden;white-space:nowrap;' +
					'user-select:none;box-sizing:border-box;';

				var elt = this.createMenu((value == 'simple') ? 'view' : 'diagram',
					(value == 'simple') ? Editor.thinViewImage : Editor.menuImage);
				this.sketchMainMenuElt.appendChild(elt);

				if (value == 'simple')
				{
					this.sketchMainMenuElt.className = 'geToolbarContainer geSimpleMainMenu';
					this.sketchMainMenuElt.style.display = 'flex';
					this.sketchMainMenuElt.style.height = '52px';
					this.sketchMainMenuElt.style.justifyContent = 'start';
					this.sketchMainMenuElt.style.alignItems = 'center';
					this.sketchMainMenuElt.style.top = '0px';
					this.sketchMainMenuElt.style.left = '0px';
					this.sketchMainMenuElt.style.right = '0px';
					this.sketchMainMenuElt.style.gap = '10px';
					elt.style.flexShrink = '0';
					elt.style.opacity = '0.7';
				}
				else
				{
					this.sketchMainMenuElt.appendChild(this.createMenuItem('delete', Editor.trashImage));
					this.sketchMainMenuElt.appendChild(this.createMenuItem('undo', Editor.undoImage));
					this.sketchMainMenuElt.appendChild(this.createMenuItem('redo', Editor.redoImage));
					this.sketchMainMenuElt.className = 'geToolbarContainer';
					this.sketchMainMenuElt.style.borderRadius = '4px';
					this.sketchMainMenuElt.style.height = '44px';
					this.sketchMainMenuElt.style.left = '10px';
					this.sketchMainMenuElt.style.top = '10px';
					this.sketchMainMenuElt.style.zIndex = '1';
				}

				this.sketchWrapperElt.appendChild(this.sketchMainMenuElt);
			}
		}
	};

	/**
	 * Overrides image dialog to add image search and Google+.
	 */
	EditorUi.prototype.isPageMenuVisible = function()
	{
		return this.pages != null && (urlParams['pages'] != '0' ||
			this.pages.length > 1 || Editor.pagesVisible);
	};
	
	/**
	 * Overrides image dialog to add image search and Google+.
	 */
	EditorUi.prototype.createFooterMenuForTheme = function(value)
	{
		if (value == 'simple' || value == 'sketch')
		{
			if (this.sketchFooterMenuElt == null)
			{
				this.sketchFooterMenuElt = document.createElement('div');
				this.sketchFooterMenuElt.className = 'geToolbarContainer';
				var footer = this.sketchFooterMenuElt;

				if (value != 'simple')
				{
					var pageMenu = this.createPageMenuTab(false, value != 'simple');
					pageMenu.className = 'geToolbarButton geAdaptiveAsset';
					pageMenu.style.cssText = 'display:inline-block;cursor:pointer;overflow:hidden;padding:4px 16px 4px 4px;' +
						'white-space:nowrap;max-width:160px;text-overflow:ellipsis;background-position:right 0px top 8px;' +
						'background-repeat:no-repeat;background-size:13px;background-image:url(' +
						mxWindow.prototype.minimizeImage + ');';
					footer.appendChild(pageMenu);
					
					var updatePageName = mxUtils.bind(this, function()
					{
						pageMenu.innerText = '';

						if (this.currentPage != null)
						{
							mxUtils.write(pageMenu, this.currentPage.getName());
							var n = (this.pages != null) ? this.pages.length : 1;
							var idx = this.getPageIndex(this.currentPage);
							idx = (idx != null) ? idx + 1 : 1;
							var id = this.currentPage.getId();
							pageMenu.setAttribute('title', this.currentPage.getName() +
								' (' + idx + '/' + n + ')' + ((id != null) ?
								' [' + id + ']' : ''));
						}
					});

					this.editor.addListener('pagesPatched', updatePageName);
					this.editor.addListener('pageSelected', updatePageName);
					this.editor.addListener('pageRenamed', updatePageName);
					this.editor.addListener('fileLoaded', updatePageName);
					updatePageName();

					// Page menu only visible for multiple pages
					var pagesVisibleChanged = mxUtils.bind(this, function()
					{
						pageMenu.style.display = (this.isPageMenuVisible()) ? 'inline-block' : 'none';
					});

					this.addListener('editInlineStart', mxUtils.bind(this, function()
					{
						pagesVisibleChanged();
						updatePageName();
					}));
					
					this.addListener('fileDescriptorChanged', pagesVisibleChanged);
					this.addListener('pagesVisibleChanged', pagesVisibleChanged);
					this.editor.addListener('pagesPatched', pagesVisibleChanged);
					pagesVisibleChanged();

					footer.appendChild(this.createMenuItem('zoomOut', Editor.minusImage));
				}

				var elt = this.createMenu('viewZoom', null, 'geToolbarButton geAdaptiveAsset');
				elt.setAttribute('title', mxResources.get('zoom'));
				elt.innerHTML = '100%';
				elt.style.cssText = 'display:inline-flex;align-items:center;position:relative;' +
					'padding:4px;box-shadow:none;width:40px;justify-content:center;cursor:pointer;';

				if (value == 'simple')
				{
					elt.style.borderStyle = 'solid';
					elt.style.borderWidth = '1px';
					elt.style.borderRadius = '4px';
					elt.style.fontSize = '11px';
					elt.style.fontWeight = '500';
					elt.style.paddingTop = '4px';
					elt.style.paddingRight = '14px';
					elt.style.backgroundImage = 'url(' + Editor.thinExpandImage + ')';
					elt.style.backgroundPosition = 'right 0px center';
					elt.style.backgroundRepeat = 'no-repeat';
					elt.style.backgroundSize = '18px';
					elt.style.opacity = '0.7';
					elt.style.height = '12px';
				}
				else
				{
					elt.style.backgroundImage = 'url(' + mxWindow.prototype.minimizeImage + ')';
					elt.style.backgroundPosition = 'right 0px top 8px';
					elt.style.backgroundRepeat = 'no-repeat';
					elt.style.backgroundSize = '13px';
					elt.style.paddingRight = '16px';
					elt.style.marginRight = '-4px';
				}

				footer.appendChild(elt);

				if (value == 'simple')
				{
					var pagesElt = this.createMenu('pages', Editor.thinNoteImage);
					pagesElt.style.backgroundSize = '24px';
					pagesElt.style.display = 'inline-block';
					pagesElt.style.width = '24px';
					pagesElt.style.height = '30px';
					pagesElt.style.opacity = '0.7';
					footer.appendChild(pagesElt);

					var undoElt = this.createMenuItem('undo', Editor.thinUndoImage);
					undoElt.style.marginLeft = 'auto';
					undoElt.style.flexShrink = '0';
					undoElt.style.opacity = '0.7';
					footer.appendChild(undoElt);

					var redoElt = this.createMenuItem('redo', Editor.thinRedoImage);
					redoElt.style.marginLeft = '0px';
					redoElt.style.flexShrink = '0';
					redoElt.style.opacity = '0.7';
					footer.appendChild(redoElt);
					
					// Page menu only visible for multiple pages
					var refreshMenu = mxUtils.bind(this, function()
					{
						var iw = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

						pagesElt.style.display = (iw < 480) ? 'none' : '';
						elt.style.display = (iw < 750) ? 'none' : 'inline-flex';
					});

					mxEvent.addListener(window, 'resize', refreshMenu);
					refreshMenu();
				}

				// Updates the label if the scale changes
				(mxUtils.bind(this, function(elt)
				{
					// Adds shift+/alt+click on zoom label
					mxEvent.addListener(elt, 'click', mxUtils.bind(this, function(evt)
					{
						if (mxEvent.isAltDown(evt))
						{
							this.hideCurrentMenu();
							this.actions.get('customZoom').funct();
							mxEvent.consume(evt);
						}
						// geItem is a dropdown menu, geMenuItem is a button in the toolbar
						else if (mxEvent.isShiftDown(evt))
						{
							this.hideCurrentMenu();
							this.actions.get('smartFit').funct();
							mxEvent.consume(evt);
						}
					}));

					var updateZoom = mxUtils.bind(this, function(sender, evt, f)
					{
						f = (f != null) ? f : 1;
						elt.innerText = '';
						mxUtils.write(elt, Math.round(this.editor.graph.view.scale * 100 * f) + '%');
					});

					this.editor.graph.view.addListener(mxEvent.EVENT_SCALE, updateZoom);
					this.editor.addListener('resetGraphView', updateZoom);
					this.editor.addListener('pageSelected', updateZoom);

					// Zoom Preview
					this.editor.graph.addListener('zoomPreview', mxUtils.bind(this, function(sender, evt)
					{
						updateZoom(sender, evt, evt.getProperty('factor'));
					}));
				}))(elt);

				if (value != 'simple')
				{
					footer.appendChild(this.createMenuItem('zoomIn', Editor.plusImage));
				}

				if (urlParams['embedInline'] == '1')
				{
					var fullscreenElt = this.createMenuItem('fullscreen', Editor.fullscreenImage);
					footer.appendChild(fullscreenElt);

					var inlineFullscreenChanged = mxUtils.bind(this, function()
					{
						fullscreenElt.style.backgroundImage = 'url(' + ((!Editor.inlineFullscreen) ?
							Editor.fullscreenImage : Editor.fullscreenExitImage) + ')';
						this.inlineSizeChanged();
						this.editor.graph.refresh();
						this.fitWindows();
					});

					this.addListener('editInlineStart', mxUtils.bind(this, function()
					{
						fullscreenElt.style.backgroundImage = 'url(' + ((!Editor.inlineFullscreen) ?
							Editor.fullscreenImage : Editor.fullscreenExitImage) + ')';
					}));
					
					this.addListener('inlineFullscreenChanged', inlineFullscreenChanged);
					footer.appendChild(this.createMenuItem('exit', Editor.closeImage));
				}

				if (value == 'simple')
				{
					this.sketchFooterMenuElt.style.cssText = 'position:relative;white-space:nowrap;gap:6px;' +
						'user-select:none;display:flex;flex-shrink:0;flex-grow:0.5;align-items:center;';
					this.sketchMainMenuElt.appendChild(this.sketchFooterMenuElt);
				}
				else
				{
					this.sketchFooterMenuElt.style.cssText = 'position:absolute;right:12px;bottom:12px;height:44px;' +
						'border-radius:4px;padding:9px 12px;overflow:hidden;z-index:1;white-space:nowrap;display:flex;' +
						'text-align:right;user-select:none;box-sizing:border-box;';
					this.sketchWrapperElt.appendChild(this.sketchFooterMenuElt);
				}
			}
		}
	};

	/**
	 * Overrides image dialog to add image search and Google+.
	 */
	EditorUi.prototype.createPickerMenuForTheme = function(value)
	{
		if (value == 'simple' || value == 'sketch')
		{
			if (this.sketchPickerMenuElt == null)
			{
				var graph = this.editor.graph;
				this.sketchPickerMenuElt = document.createElement('div');
				this.sketchPickerMenuElt.className = 'geToolbarContainer';

				var picker = this.sketchPickerMenuElt;
				mxUtils.setPrefixedStyle(picker.style, 'transition', 'transform .3s ease-out');
				
				var foldImg = document.createElement('a');
				foldImg.style.padding = '0px';
				foldImg.style.boxShadow = 'none';
				foldImg.className = 'geMenuItem geAdaptiveAsset';
				foldImg.style.display = (value == 'simple') ? 'inline-block' : 'block';
				foldImg.style.width = '100%';
				foldImg.style.height = '14px';
				foldImg.style.margin = '4px 0 2px 0';
				foldImg.style.backgroundImage = 'url(' + Editor.expandMoreImage + ')';
				foldImg.style.backgroundPosition = 'center center';
				foldImg.style.backgroundRepeat = 'no-repeat';
				foldImg.style.backgroundSize = '22px';
				mxUtils.setOpacity(foldImg, 40);
				foldImg.setAttribute('title', mxResources.get('collapseExpand'));
				var fmargin = foldImg.style.margin;
				
				var freehandElt = this.createMenuItem('insertFreehand', (value == 'simple') ?
					Editor.thinGestureImage : Editor.freehandImage, true);
				freehandElt.style.paddingLeft = (value == 'simple') ? '0px' : '12px';
				freehandElt.style.backgroundSize = '24px';
				freehandElt.style.width = '26px';
				freehandElt.style.height = '30px';
				freehandElt.style.opacity = '0.7';
				
				var insertElt = this.createMenu('insert', (value == 'simple') ?
					Editor.thinAddCircleImage : Editor.addBoxImage);
				insertElt.style.backgroundSize = '24px';
				insertElt.style.display = (value == 'simple') ? 'inline-block' : 'block';
				insertElt.style.flexShrink = '0';
				insertElt.style.width = '30px';
				insertElt.style.height = '30px';
				insertElt.style.padding = (value == 'simple') ? '0px' : '4px 4px 0px 4px';
				insertElt.style.opacity = '0.7';

				var tableElt = this.createMenu('table', Editor.thinTableImage);
				tableElt.style.backgroundSize = '24px';
				tableElt.style.padding = (value == 'simple') ? '0px' : '4px 4px 0px 4px';
				tableElt.style.display = 'inline-block';
				tableElt.style.width = '30px';
				tableElt.style.height = '30px';
				tableElt.style.opacity = '0.7';

				var shapesElt = insertElt.cloneNode(true);
				shapesElt.style.backgroundImage = 'url(' + ((value == 'simple') ?
					Editor.thinShapesImage : Editor.shapesImage) + ')';
				shapesElt.style.backgroundSize = '24px';
				shapesElt.setAttribute('title', mxResources.get('shapes'));

				var tw = 28;
				var th = 28;
				
				mxEvent.addListener(shapesElt, 'click', mxUtils.bind(this, function(evt)
				{
					if (this.isShapePickerVisible())
					{
						this.hideShapePicker();
					}
					else
					{
						var off = mxUtils.getOffset(shapesElt);

						if (Editor.inlineFullscreen || this.embedViewport == null)
						{
							if (value == 'simple')
							{
								off.x -= this.diagramContainer.offsetLeft + 30;
								off.y += shapesElt.offsetHeight - 19;
							}
							else
							{
								off.x += shapesElt.offsetWidth + 28;
								off.y += 20;
							}
						}
						else
						{
							off.x = 0;
							off.y = shapesElt.offsetTop;
						}

						this.showShapePicker(Math.max(this.diagramContainer.scrollLeft + Math.max(24, off.x)),
							this.diagramContainer.scrollTop + off.y, null, null, null, null,
							mxUtils.bind(this, function(cells)
						{
							return graph.getCenterInsertPoint(graph.getBoundingBoxFromGeometry(cells, true));
						}), value == 'simple', false);
					}

					mxEvent.consume(evt);
				}));

				insertElt.style.backgroundSize = '24px';

				if (value == 'simple')
				{
					insertElt.style.flexShrink = '0';
				}
				else
				{
					insertElt.style.marginBottom = '4px';
				}

				var collapsed = false;
	
				var initPicker = mxUtils.bind(this, function(force)
				{
					if (force || document.body.contains(picker))
					{
						function addKey(elt, key, kx, ky)
						{
							kx = (kx != null) ? kx : 30;
							ky = (ky != null) ? ky : 26;

							elt.style.position = 'relative';
							elt.style.overflow = 'visible';
	
							var div = document.createElement('div');
							div.style.position = 'absolute';
							div.style.fontSize = '8px';
							div.style.left = kx + 'px';
							div.style.top = ky + 'px';
							mxUtils.write(div, key);
							elt.appendChild(div);
						};
						
						function addElt(elt, title, cursor, key, kx, ky)
						{
							if (title != null)
							{
								elt.setAttribute('title', title);
							}
							
							elt.style.cursor = 'pointer';
							elt.style.margin = (value == 'simple') ? '0px' : '8px 0px 8px 2px';
							elt.style.display = (value == 'simple') ? 'inline-block' : 'block';
							picker.appendChild(elt);

							if (value == 'simple')
							{
								elt.style.opacity = '0.7';
							}
							else if (key != null)
							{
								addKey(elt, key, kx, ky);
							}
							
							return elt;
						};

						picker.innerText = '';
						
						if (!collapsed)
						{
							var iw = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

							// Thinner previews in simple toolbar
							if (value == 'simple')
							{
								this.sidebar.graph.cellRenderer.minSvgStrokeWidth = 0.9;
							}

							// Append sidebar elements
							var margin = (value == 'simple') ? '0px' : '4px 0px 6px 2px';
							var em = '1px 0px 1px 2px';
						
							if (value != 'simple' || iw >= 660)
							{
								var textElt = this.sidebar.createVertexTemplate('text;strokeColor=none;fillColor=none;html=1;' +
									'align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;', 60, 30, 'Text',
									mxResources.get('text') + ' (A)', true, false, null, value != 'simple', null,
									tw + 10, th + 10, value == 'simple' ? Editor.thinTextImage : null, true);

								if (value == 'simple')
								{
									textElt.className = 'geToolbarButton';
									textElt.style.opacity = '0.7';
								}

								addElt(textElt, mxResources.get('text') + ' (A)', null, 'A', 32).
									style.margin = (value == 'simple') ?
										'0 -8px 0 0' : '0 0 0 -2px';
							}

							var boxElt = this.sidebar.createVertexTemplate('rounded=0;whiteSpace=wrap;html=1;', 160, 80, '',
								mxResources.get('rectangle') + ' (D)', true, false, null, value != 'simple', null, tw, th,
								(value == 'simple') ? Editor.thinRectangleImage : null)

							if (value == 'simple')
							{
								if (iw >= 600)
								{
									boxElt.className = 'geToolbarButton';
									boxElt.style.opacity = '0.7';
									addElt(boxElt, mxResources.get('rectangle') + ' (D)', null, 'D').style.margin = '0 -4px 0 0';
								}

								if (iw >= 390)
								{
									this.sketchPickerMenuElt.appendChild(shapesElt);
								}
								
								if (iw >= 440)
								{
									addElt(freehandElt, mxResources.get('freehand') + ' (X)', null, 'X');
								}
	
								if (iw >= 500)
								{
									this.sketchPickerMenuElt.appendChild(tableElt);
								}
							}
							else
							{
								addElt(this.sidebar.createVertexTemplate('shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;' +
									'fontColor=#000000;darkOpacity=0.05;fillColor=#FFF9B2;strokeColor=none;fillStyle=solid;' +
									'direction=west;gradientDirection=north;gradientColor=#FFF2A1;shadow=1;size=20;pointerEvents=1;',
									140, 160, '', mxResources.get('note') + ' (S)', true, false, null, true, null, tw, th),
									mxResources.get('note') + ' (S)', null, 'S').style.margin = margin;
								addElt(boxElt, mxResources.get('rectangle') + ' (D)', null, 'D').style.margin = margin;
								addElt(this.sidebar.createVertexTemplate('ellipse;whiteSpace=wrap;html=1;', 160, 100, '',
									mxResources.get('ellipse') + ' (F)', true, false, null, true, null, tw, th),
									mxResources.get('ellipse') + ' (F)', null, 'F').style.margin = margin;

								var edgeStyle = 'edgeStyle=none;orthogonalLoop=1;jettySize=auto;html=1;';
								var cell = new mxCell('', new mxGeometry(0, 0, this.editor.graph.defaultEdgeLength + 20, 0), edgeStyle);
								cell.geometry.setTerminalPoint(new mxPoint(0, 0), true);
								cell.geometry.setTerminalPoint(new mxPoint(cell.geometry.width, 0), false);
								cell.geometry.points = [];
								cell.geometry.relative = true;
								cell.edge = true;
								
								addElt(this.sidebar.createEdgeTemplateFromCells([cell],
									cell.geometry.width, cell.geometry.height, mxResources.get('line') + ' (C)',
									true, null, value != 'simple', false, null, tw, th),
									mxResources.get('line') + ' (C)', null, 'C').margin = em;
								
								cell = cell.clone();
								cell.style = edgeStyle + 'shape=flexArrow;rounded=1;startSize=8;endSize=8;';
								cell.geometry.width = this.editor.graph.defaultEdgeLength + 20;
								cell.geometry.setTerminalPoint(new mxPoint(0, 20), true);
								cell.geometry.setTerminalPoint(new mxPoint(cell.geometry.width, 20), false);
				
								addElt(this.sidebar.createEdgeTemplateFromCells([cell],
									cell.geometry.width, 40, mxResources.get('arrow'),
									true, null, true, false, null, tw, th),
									mxResources.get('arrow')).
									style.margin = em;
								
								addElt(freehandElt, mxResources.get('freehand') + ' (X)', null, 'X');
								this.sketchPickerMenuElt.appendChild(shapesElt);
							}
							
							if (value != 'simple' || iw > 320)
							{
								this.sketchPickerMenuElt.appendChild(insertElt);
							}
						}

						if (value != 'simple' && urlParams['embedInline'] != '1')
						{
							picker.appendChild(foldImg);
						}

						this.sidebar.graph.cellRenderer.minSvgStrokeWidth = this.sidebar.minThumbStrokeWidth;
					}
				});
				
				mxEvent.addListener(foldImg, 'click', mxUtils.bind(this, function()
				{
					if (collapsed)
					{
						mxUtils.setPrefixedStyle(picker.style, 'transform', 'translate(0, -50%)');
						picker.style.padding = '0px 4px 4px';
						picker.style.width = '48px';
						picker.style.top = '50%';
						picker.style.bottom = '';
						picker.style.height = '';
						foldImg.style.backgroundImage = 'url(' + Editor.expandMoreImage + ')';
						foldImg.style.width = '100%';
						foldImg.style.height = '14px';
						foldImg.style.margin = fmargin;
						collapsed = false;
						initPicker();
					}
					else
					{				
						picker.innerText = '';
						picker.appendChild(foldImg);
						mxUtils.setPrefixedStyle(picker.style, 'transform', 'translate(0, 0)');
						picker.style.width = 'auto';
						picker.style.bottom = '12px';
						picker.style.padding = '0px';
						picker.style.top = '';
						foldImg.style.backgroundImage = 'url(' + Editor.expandLessImage + ')';
						foldImg.style.width = '24px';
						foldImg.style.height = '24px';
						foldImg.style.margin = '0px';
						collapsed = true;
					}
				}));


				var lastWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
				var currentThread = null;
				
				mxEvent.addListener(window, 'resize', function()
				{
					var currentWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

					if (currentWidth != lastWidth)
					{
						lastWidth = currentWidth;

						if (currentThread != null)
						{
							window.clearTimeout(currentThread);
						}

						currentThread = window.setTimeout(function()
						{
							currentThread = null;
							initPicker();
						}, 200);
					}
				});

				this.editor.addListener('fileLoaded', initPicker);
				this.addListener('sketchModeChanged', initPicker);
				this.addListener('currentThemeChanged', initPicker);

				if (!Editor.enableCssDarkMode)
				{
					this.addListener('darkModeChanged', initPicker);
				}

				initPicker(true);

				if (value == 'simple')
				{
					this.sketchPickerMenuElt.style.cssText = 'position:relative;white-space:nowrap;user-select:none;' +
						'display:flex;align-items:center;justify-content:flex-end;flex-grow:1;gap:6px;flex-shrink:0;';
					this.sketchMainMenuElt.appendChild(this.sketchPickerMenuElt);
				}
				else
				{
					this.sketchPickerMenuElt.style.cssText = 'position:absolute;left:10px;border-radius:4px;' +
						'padding:0px 4px 4px;white-space:nowrap;max-height:100%;z-index:1;width:48px;' +
						'box-sizing:border-box;transform:translate(0, -50%);top:50%;user-select:none;';
					this.sketchWrapperElt.appendChild(this.sketchPickerMenuElt);
				}

				// Disables built-in pan and zoom on touch devices
				if (mxClient.IS_POINTER)
				{
					this.sketchPickerMenuElt.style.touchAction = 'none';
				}
			}
		}
	};

	/**
	 * 
	 */
	EditorUi.prototype.getNetworkStatus = function()
	{
		var status = null;

		if (this.isOffline(true))
		{
			status = mxResources.get('offline');
		}
		else
		{
			var file = this.getCurrentFile();

			if (file != null)
			{
				if (file.invalidChecksum)
				{
					status = mxResources.get('error') + ': ' +
						mxResources.get('checksum');
				}
				else if (file.sync != null && (!file.sync.enabled ||
					!file.sync.isRealtimeActive()))
				{
					status = mxResources.get('realtimeCollaboration') +
						': ' + mxResources.get('disabled');
				}
				else if (file.sync != null && !file.sync.isConnected())
				{
					status = mxResources.get('notConnected');
				}
				else if (file.isRealtimeEnabled() &&
					file.isRealtimeSupported() &&
					file.getRealtimeState() > 1)
				{
					var err = file.getRealtimeError();
					status = mxResources.get('realtimeCollaboration') + ': ' +
						((err != null && err.message != null) ?
						err.message : mxResources.get('error'));
				}
			}
		}

		return status;
	};

	/**
	 * Overrides image dialog to add image search and Google+.
	 */
	EditorUi.prototype.createMenubarForTheme = function(value)
	{
		if (value == 'simple' || value == 'sketch')
		{
			if (this.sketchMenubarElt == null)
			{
				this.sketchMenubarElt = document.createElement('div');
				this.sketchMenubarElt.className = 'geToolbarContainer';

				var css = 'display:flex;white-space:nowrap;user-select:none;justify-content:flex-end;' +
					'align-items:center;flex-wrap:nowrap;gap:6px;';

				if (value == 'simple')
				{
					this.sketchMenubarElt.style.cssText = 'position:relative;flex-grow:0.5;' +
						'overflow:visible;' + ((urlParams['embed'] != '1') ?
						'flex-shrink:0;' : 'min-width:0;') + css;

					if (this.commentElt == null)
					{
						this.commentElt = this.createMenuItem('comments', Editor.thinCommentImage, true);
						this.commentElt.style.paddingLeft = '0px';
						this.commentElt.style.backgroundSize = '24px';
						this.commentElt.style.width = '26px';
						this.commentElt.style.height = '30px';
						this.commentElt.style.opacity = '0.7';
					}

					if (this.shareElt == null && urlParams['embed'] != '1' &&
						this.getServiceName() == 'draw.io')
					{
						this.shareElt = this.createMenu('share', Editor.thinUserAddImage);
						this.shareElt.style.backgroundSize = '24px';
						this.shareElt.style.display = 'inline-block';
						this.shareElt.style.flexShrink = '0';
						this.shareElt.style.width = '24px';
						this.shareElt.style.height = '30px';
						this.shareElt.style.opacity = '0.7';
						
						if (this.isStandaloneApp())
						{
							this.shareElt.style.backgroundImage = 'url(' +
								Editor.thinShareImage + ')';
						}
						else
						{
							var networkListener = mxUtils.bind(this, function()
							{
								var title = mxResources.get('share');
								var img = Editor.thinUserAddImage;
								var status = this.getNetworkStatus();

								if (status != null)
								{
									title = title + ' (' + status + ')';
									img = Editor.thinUserFlashImage;
								}

								this.shareElt.style.backgroundImage = 'url(' + img + ')';
								this.shareElt.setAttribute('title', title);
							});

							this.addListener('realtimeStateChanged', networkListener);
							this.editor.addListener('statusChanged', networkListener);
							mxEvent.addListener(window, 'offline', networkListener);
							mxEvent.addListener(window, 'online', networkListener);
							networkListener();
						}
					}

					if (this.mainMenuElt == null)
					{
						this.mainMenuElt = this.createMenu('diagram', Editor.thinMenuImage);
						this.mainMenuElt.style.backgroundSize = '24px';
						this.mainMenuElt.style.display = 'inline-block';
						this.mainMenuElt.style.flexShrink = '0';
						this.mainMenuElt.style.width = '24px';
						this.mainMenuElt.style.height = '30px';
						this.mainMenuElt.style.opacity = '0.7';
					}

					if (this.formatElt == null)
					{
						this.formatElt = this.createMenuItem('format', Editor.thinDesignImage, true);
						this.formatElt.style.backgroundSize = '24px';
						this.formatElt.style.marginLeft = (urlParams['embed'] != '1') ? 'auto' : '0';
						this.formatElt.style.flexShrink = '0';
						this.formatElt.style.width = '20px';
						this.formatElt.style.opacity = '0.7';

						var cls = this.formatElt.className + ' geToggleItem';
						this.formatElt.className = cls + ((this.formatWidth == 0) ? '' : ' geActiveItem');

						this.addListener('formatWidthChanged', function()
						{
							this.formatElt.className = cls + ((this.formatWidth == 0) ? '' : ' geActiveItem');
						});
					}	
				}
				else
				{
					this.sketchMenubarElt.style.cssText = 'position:absolute;right:12px;top:10px;height:44px;' +
						'border-radius:4px;overflow:hidden;user-select:none;max-width:calc(100% - 170px);' +
						'box-sizing:border-box;justify-content:flex-end;z-index:1;padding:7px 12px;' + css;
					this.sketchWrapperElt.appendChild(this.sketchMenubarElt);
				}

				if (urlParams['embedInline'] != '1')
				{
					// Moves menu away if picker overlaps
					var refreshMenu = mxUtils.bind(this, function()
					{
						if (Editor.currentTheme == 'sketch')
						{
							var overflow = (this.sketchPickerMenuElt.offsetTop -
								this.sketchPickerMenuElt.offsetHeight / 2 < 58);
							this.sketchMainMenuElt.style.left = (overflow) ? '70px' : '10px';
							this.sketchMenubarElt.style.maxWidth = (overflow) ? 
								'calc(100% - 230px)' : 'calc(100% - 170px)';
						}
						else if (Editor.currentTheme == 'simple')
						{
							var iw = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

							if (this.commentElt != null)
							{
								this.commentElt.style.display = (iw > 560 && this.commentsSupported()) ? '' : 'none';
							}

							if (this.shareElt != null)
							{
								this.shareElt.style.display = (iw > 360) ? '' : 'none';
							}
						}
					});

					refreshMenu();
					mxEvent.addListener(window, 'resize', refreshMenu);
					this.editor.addListener('fileLoaded', refreshMenu);
				}

				if (urlParams['embed'] != '1' && this.getServiceName() != 'atlassian')
				{
					this.installStatusMinimizer(this.sketchMenubarElt);
				}
			}

			if (value == 'simple')
			{
				if (this.buttonContainer != null)
				{
					this.buttonContainer.style.padding = '0px';
					this.sketchMenubarElt.appendChild(this.buttonContainer);

					if (this.formatElt != null && urlParams['embed'] == '1')
					{
						this.formatElt.style.marginLeft = '';
					}
				}

				if (this.commentElt != null)
				{
					this.sketchMenubarElt.appendChild(this.commentElt);
				}
				
				if (this.shareElt != null)
				{
					this.sketchMenubarElt.appendChild(this.shareElt);
				}

				this.sketchMenubarElt.appendChild(this.mainMenuElt);
				this.sketchMenubarElt.appendChild(this.formatElt);
			}

			if (this.statusContainer != null)
			{
				this.statusContainer.style.flexGrow = '1';
				this.statusContainer.style.flexShrink = '1';
				this.statusContainer.style.marginTop = '0px';

				if (value != 'simple')
				{
					this.sketchMenubarElt.appendChild(this.statusContainer);
				}
				else
				{
					this.statusContainer.style.justifyContent = 'center';
					this.statusContainer.style.width = '22%';
				}
			}

			if (value != 'simple' && this.userElement != null)
			{
				this.userElement.style.flexShrink = '0';
				this.userElement.style.top = '';
				this.sketchMenubarElt.appendChild(this.userElement);
			}
			
			var elt = this.menubar.langIcon;

			if (elt != null)
			{
				elt.style.position = '';
				elt.style.height = '21px';
				elt.style.width = '21px';
				elt.style.flexShrink = '0';
				elt.style.opacity = '0.7';

				this.sketchMenubarElt.appendChild(elt);
			}

			if (value == 'simple')
			{
				this.sketchMainMenuElt.appendChild(this.statusContainer);
				this.sketchMainMenuElt.appendChild(this.sketchMenubarElt);
			}
			else if (this.buttonContainer != null)
			{
				this.buttonContainer.style.padding = '0px';
				this.sketchMenubarElt.appendChild(this.buttonContainer);
			}
		}
		else
		{
			if (this.statusContainer != null)
			{
				this.statusContainer.style.flexGrow = '';
				this.statusContainer.style.flexShrink = '';
				this.statusContainer.style.width = '';
				this.statusContainer.style.marginTop = '';
				this.statusContainer.style.justifyContent = '';
				this.statusContainer.style.opacity = '';
				this.menubar.container.appendChild(this.statusContainer);
			}

			if (this.userElement != null)
			{
				this.menubarContainer.appendChild(this.userElement);
			}

			var elt = this.menubar.langIcon;

			if (elt != null)
			{
				elt.style.position = 'absolute';
				elt.style.height = '18px';
				elt.style.width = '18px';
				elt.style.flexShrink = '';
				elt.style.opacity = '';

				this.menubarContainer.parentNode.insertBefore(elt,
					this.menubarContainer);
			}

			if (this.buttonContainer != null)
			{
				this.buttonContainer.style.display = '';
				this.buttonContainer.style.padding = '';
				this.menubar.container.appendChild(this.buttonContainer);
			}
		}
	};

	/**
	 * Overrides image dialog to add image search and Google+.
	 */
	EditorUi.prototype.createMenu = function(key, img, className, clickFn)
	{
		className = (className != null) ? className : 'geToolbarButton';
		var menu = this.menus.get(key);
		var elt = this.menubar.addMenu(mxResources.get(key), menu.funct, null, clickFn);
		
		elt.className = className;
		elt.style.display = 'inline-block';
		elt.style.cursor = 'pointer';
		elt.style.height = '24px';
		elt.setAttribute('title', mxResources.get(key));
		this.menus.menuCreated(menu, elt, className);
		
		if (img != null)
		{
			elt.style.backgroundImage = 'url(' + img + ')';
			elt.style.backgroundPosition = 'center center';
			elt.style.backgroundRepeat = 'no-repeat';
			elt.style.backgroundSize = '100% 100%';
			elt.style.width = '24px';
			elt.innerText = '';
		}

		return elt;
	};

	/**
	 * Create toolbar button.
	 */
	EditorUi.prototype.createToolbarButton = function(img, title, fn, size)
	{
		size = (size != null) ? size : 24;
		var btn = document.createElement('a');
		btn.className = 'geToolbarButton geAdaptiveAsset';
		btn.setAttribute('title', title);
		btn.style.backgroundImage = 'url(' + img + ')';
		btn.style.backgroundPosition = 'center center';
		btn.style.backgroundRepeat = 'no-repeat';
		btn.style.backgroundSize = '100% 100%';
		btn.style.display = 'inline-block';
		btn.style.cursor = 'pointer';
		btn.style.marginLeft = '6px';
		btn.style.width = size + 'px';
		btn.style.height = size + 'px';

		if (fn != null)
		{
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
		}

		return btn;
	};

	/**
	 * Overrides image dialog to add image search and Google+.
	 */
	EditorUi.prototype.createMenuItem = function(key, img, ignoreState)
	{
		var action = this.actions.get(key);
		var fn = (action != null) ? action.funct : null;
		var btn = this.createToolbarButton(img, mxResources.get(key) +
			((action != null && action.shortcut != null) ? ' (' +
			action.shortcut + ')' : ''), fn);

		if (action != null)
		{
			if (!ignoreState)
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

					btn.style.opacity = (action.isEnabled()) ? '' : '0.2';
				};
				
				this.editor.graph.addListener('enabledChanged', updateState);
				action.addListener('stateChanged', updateState);
				updateState();
			}
		}
	   
		return btn;
	};

	/**
	 * Overrides image dialog to add image search and Google+.
	 */
	EditorUi.prototype.createFormatWindow = function()
	{
		if (this.formatWindow == null)
		{
			var x = Math.max(10, this.diagramContainer.parentNode.clientWidth - 256);
			var y = 60;
			var h = (urlParams['embedInline'] == '1') ? 580 :
				((urlParams['sketch'] == '1') ? 580 : Math.min(566,
					this.editor.graph.container.clientHeight - 10));
			
			this.formatWindow = new WrapperWindow(this, mxResources.get('format'), x, y, 240, h,
				mxUtils.bind(this, function(container)
			{
				container.appendChild(this.formatContainer);
			}));

			this.formatWindow.window.addListener(mxEvent.SHOW, mxUtils.bind(this, function()
			{
				this.formatWindow.window.fit();
			}));

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
			
			this.formatWindow.window.minimumSize = new mxRectangle(0, 0, 240, 80);

			// Sets initial state for format window
			if (Editor.currentTheme == 'sketch')
			{
				var iw = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
				var ih = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
				
				if (iw < 1200 || ih < 708)
				{
					this.formatWindow.window.toggleMinimized();
				}
			}
			else
			{
				this.formatWindow.window.setVisible(false);
			}
		}
	};

	/**
	 * 
	 */
	var editorUiToggleFormatPanel = EditorUi.prototype.toggleFormatPanel;

	EditorUi.prototype.toggleFormatPanel = function(visible)
	{
		var wnd = this.formatWindow;
		
		if (wnd != null)
		{
			wnd.window.setVisible((visible != null) ? visible :
				!this.isFormatPanelVisible());
		}
		else
		{
			editorUiToggleFormatPanel.apply(this, arguments);
		}
	};

	/**
	 * 
	 */
	EditorUi.prototype.toggleShapesPanel = function(visible)
	{
		var size = EditorUi.prototype.hsplitPosition;

		// On smaller screens this is set to 0
		if (size == 0)
		{
			size = 134;
		}

		var x = this.hsplitPosition;

		var doRefresh = mxUtils.bind(this, function()
		{
			this.hsplitPosition = tmp;
			this.refresh();
			this.diagramContainer.scrollLeft -= x - this.hsplitPosition;
		});
		
		var tmp = (visible) ? size : 0;
		var delay = 0.3;

		mxUtils.setPrefixedStyle(this.sidebarContainer.style, 'transform', (tmp == 0) ? 'translateX(0)' : 'translateX(-100%)');

		if (tmp != 0)
		{
			doRefresh();
		}

		window.setTimeout(mxUtils.bind(this, function()
		{
			mxUtils.setPrefixedStyle(this.sidebarContainer.style, 'transform', (tmp == 0) ? 'translateX(-100%)' : 'translateX(0)');
			mxUtils.setPrefixedStyle(this.sidebarContainer.style, 'transition', 'transform ' + delay + 's ease-in-out');
			mxUtils.setPrefixedStyle(this.sidebarContainer.style, 'transform-origin', 'top left');

			window.setTimeout(mxUtils.bind(this, function()
			{
				mxUtils.setPrefixedStyle(this.sidebarContainer.style, 'transition', null);
				mxUtils.setPrefixedStyle(this.sidebarContainer.style, 'transform', null);
				mxUtils.setPrefixedStyle(this.sidebarContainer.style, 'transform-origin', null);
				
				if (tmp == 0)
				{
					doRefresh();
				}
			}), delay * 1000);
		}), 10);
	};

	/**
	 * 
	 */
	EditorUi.prototype.isShapesPanelVisible = function()
	{
		return this.hsplitPosition > 0;
	};

	/**
	 * 
	 */
	var editorUiIsFormatPanelVisible = EditorUi.prototype.isFormatPanelVisible;

	EditorUi.prototype.isFormatPanelVisible = function()
	{
		var wnd = this.formatWindow;
		
		if (wnd != null)
		{
			return wnd.window.isVisible();
		}
		else
		{
			return editorUiIsFormatPanelVisible.apply(this, arguments);
		}
	};
	
	var editorUiRefresh = EditorUi.prototype.refresh;
	
	/**
	 * Changes refresh to only update the diagram container in sketch mode.
	 */
	EditorUi.prototype.refresh = function(sizeDidChange)
	{
		if (this.sketchWrapperElt != null && this.sketchWrapperElt.parentNode != null)
		{
			sizeDidChange = (sizeDidChange != null) ? sizeDidChange : true;

			if (urlParams['embedInline'] != '1')
			{
				var w = this.container.clientWidth;
				var h = this.container.clientHeight;
				var off = this.zeroOffset;
				var x = off.x;
				var y = off.y;

				if (this.container == document.body)
				{
					w = document.body.clientWidth || document.documentElement.clientWidth;
					h = document.documentElement.clientHeight;
				}
			
				off = this.getDiagramContainerOffset();
				x = off.x;
				y = off.y;

				if (Editor.currentTheme == 'simple')
				{
					y += this.sketchMainMenuElt.offsetHeight;
				}
				
				this.diagramContainer.style.top = y + 'px';
				this.diagramContainer.style.bottom = '0';

				if (Editor.currentTheme == 'simple')
				{
					this.hsplit.style.top = this.sketchMainMenuElt.offsetHeight + 'px';
					this.sidebarContainer.style.top = this.hsplit.style.top;
					this.formatContainer.style.top = this.hsplit.style.top;
					
					var iw = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
					var effHsplitPosition = Math.max(0, Math.min(iw - this.formatWidth,
						Math.min(this.hsplitPosition, w - this.splitSize - 40)));

					this.sidebarContainer.style.width = effHsplitPosition + 'px';
					this.diagramContainer.style.left = (effHsplitPosition + x) + 'px';
					this.tabContainer.style.left = effHsplitPosition + 'px';
					this.tabContainer.style.right = this.formatWidth + 'px';
					this.sketchMainMenuElt.style.left = '0px';
					this.sketchMainMenuElt.style.right = '0px';
					this.hsplit.style.left = effHsplitPosition + 'px';
					this.diagramContainer.style.right = this.formatWidth + 'px';
					this.formatContainer.style.width = this.formatWidth + 'px';

					this.hsplit.style.bottom = this.tabContainer.offsetHeight + 'px';
					this.diagramContainer.style.bottom = this.hsplit.style.bottom;

					this.checkTabScrollerOverflow();
				}
				else
				{
					this.diagramContainer.style.left = off.x + 'px';
					this.diagramContainer.style.right = '0';
				}
			}

			if (sizeDidChange)
			{
				this.editor.graph.sizeDidChange();
			}
		}
		else
		{
			editorUiRefresh.apply(this, arguments);
		}
	};

	/**
	 * 
	 */
	EditorUi.prototype.createShapesPanel = function(container)
	{
		var css = 'position:absolute;border-width:1px;cusor:pointer;border-style:none;' +
			'height:24px;bottom:0px;text-align:center;padding:8px 6px 0 6px;border-top-style:solid;' +
			'width:50%;height:32px;box-sizing:border-box;font-size:11px;';

		var addMenu = mxUtils.bind(this, function(id)
		{
			var elt = this.createMenu(id, null, 'geTitle');

			elt.style.cssText = css;
			container.appendChild(elt);

			return elt;
		});
		
		if (Editor.enableCustomLibraries && (urlParams['embed'] != '1' || urlParams['libraries'] == '1'))
		{
			// Defined in native apps together with openLibrary
			if (this.actions.get('newLibrary') != null)
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
				var elt = addMenu('newLibrary');
				elt.style.fontSize = '11px';
				elt.style.left = '0';
				
				var elt = addMenu('openLibraryFrom');
				elt.style.borderLeftStyle = 'solid';
				elt.style.fontSize = '11px';
				elt.style.left = '50%';
			}
		}

		container.appendChild(this.sidebarContainer);
		container.style.overflow = 'hidden';
	};

	/**
	 * Overrides image dialog to add image search and Google+.
	 */
	EditorUi.prototype.createShapesWindow = function()
	{
		if (this.sidebarWindow == null)
		{
			var w = Math.min(this.diagramContainer.parentNode.clientWidth - 10, 218);
			var h = (urlParams['embedInline'] == '1') ? 650 :
				Math.min(this.diagramContainer.parentNode.clientHeight, 650);
			var simpleTheme = Editor.currentTheme == 'simple' ||
				Editor.currentTheme == 'sketch';
			
			this.sidebarWindow = new WrapperWindow(this, mxResources.get('shapes'),
				(simpleTheme && urlParams['embedInline'] != '1') ? 66 : 10,
				(simpleTheme && urlParams['embedInline'] != '1') ?
					Math.max(30, (this.diagramContainer.parentNode.clientHeight - h) / 2) : 56,
				w - 6, h - 6, mxUtils.bind(this, function(container)
			{
				this.createShapesPanel(container);
			}));
			
			this.sidebarWindow.window.addListener(mxEvent.SHOW, mxUtils.bind(this, function()
			{
				this.sidebarWindow.window.fit();
			}));

			this.sidebarWindow.window.minimumSize = new mxRectangle(0, 0, 90, 90);
			this.sidebarWindow.window.setVisible(false);
		}
	};

	/**
	 * Overrides image dialog to add image search and Google+.
	 */
	EditorUi.prototype.setSketchMode = function(value)
	{
		if (this.spinner.spin(document.body, mxResources.get('working') + '...'))
		{
			window.setTimeout(mxUtils.bind(this, function()
			{
				this.spinner.stop();
				this.doSetSketchMode(value);
				
				// Persist setting
				if (urlParams['rough'] == null)
				{
					mxSettings.settings.sketchMode = value;
					mxSettings.save();
				}
				
				this.fireEvent(new mxEventObject('sketchModeChanged'));
			}), 0);
		}
	};

	/**
	 * Dynamic change of dark mode.
	 */
	Editor.createMinimalCss = function()
	{
		// Dark mode styles
		return (Editor.isDarkMode() ?
			'html body .geMenubarContainer .geMenuItem .geMenuItem, html body .geMenubarContainer a.geMenuItem { color: #353535; }' +
			'html body .geToolbarContainer .geMenuItem, html body .geToolbarContainer .geToolbarButton, ' +
			'html body .geMenubarContainer .geMenuItem .geMenuItem, html body .geMenubarContainer a.geMenuItem,' +
			'html body .geMenubarContainer .geToolbarButton { filter: invert(1); }' +
			'html > body.geEditor > div > a.geItem { background-color: ' + Editor.darkColor + '; color: #cccccc; border-color: #505759; }' +
			'html body .mxCellEditor { color: #f0f0f0; }'
			:
			// Non-dark mode styles
			'div.diagramContainer button.gePrimaryBtn, .mxWindow button.gePrimaryBtn, .geDialog button.gePrimaryBtn, html body .gePrimaryBtn ' +
				'{ background: #29b6f2 !important; color: #fff !important; border: none !important; box-shadow: none !important; }' +
			'html body .gePrimaryBtn:hover:not([disabled]) { background: #12a2e0 !important; }'
			) +
			// End of custom styles
			'html body .geStatus { overflow: hidden; text-overflow: ellipsis; }' +
			'html body .geStatus > *:not([class]) { vertical-align:top; }' +
			'html > body > div > a.geItem { background-color: #ffffff; color: #707070; border-top: 1px solid lightgray; border-left: 1px solid lightgray; }' +
			'html body .mxWindow { z-index: 3; font-size: 12px; }' +
			'html body table.mxWindow { font-size: 12px; }' +
			'html body button.geBtn:active { opacity: 0.6; }' +
			'html body a.geMenuItem { opacity: 0.75; cursor: pointer; user-select: none; }' +
			'html body a.geMenuItem[disabled] { opacity: 0.2; }' +
			'html body a.geMenuItem[disabled]:active { opacity: 0.2; }' +
			'html body a.geMenuItem:active { opacity: 0.2; }' +
			'html body .geToolbarButton:active { opacity: 0.15; }' +
			'html body .geStatus:active { opacity: 0.5; }' +
			'.geStatus > div { box-sizing: border-box; max-width: 100%; text-overflow: ellipsis; }' +
			'html table.mxPopupMenu tr.mxPopupMenuItemHover:active { opacity: 0.7; }' +
			'html body .mxWindow input[type="checkbox"] {padding: 0px; }' +
			'.mxWindow button, .geDialog select, .mxWindow select { display:inline-block; }' +
			'html body .mxWindow .geColorBtn, html body .geDialog .geColorBtn { background: none; }' +
			'html body div.diagramContainer button:active, html body .mxWindow button:active, html body .geDialog button:active { opacity: 0.6; }' +
			'.geBtn button { min-width:72px !important; }' +
			'div.geToolbarContainer a.geButton { margin:0px; padding: 0 2px 4px 2px; } ' +
			'html body div.geToolbarContainer a.geColorBtn { margin: 2px; } ' +
			'table.mxWindow td.mxWindowPane button.geColorBtn { padding:0px; box-sizing: border-box; }' +
			'html body .geMenuItem { font-size:14px; text-decoration: none; font-weight: normal; padding: 6px 10px 6px 10px; border: none; border-radius: 5px; color: #353535; box-shadow: inset 0 0 0 1px rgba(0,0,0,.11), inset 0 -1px 0 0 rgba(0,0,0,.08), 0 1px 2px 0 rgba(0,0,0,.04); ' + (EditorUi.isElectronApp? 'app-region: no-drag; ' : '') + '}' +
			'div.mxWindow td.mxWindowPane button { background-image: none; float: none; }' +
			'html div.geVerticalHandle { position:absolute;bottom:0px;left:50%;cursor:row-resize;width:11px;height:11px;background:white;margin-bottom:-6px; margin-left:-6px; border: none; border-radius: 6px; box-shadow: inset 0 0 0 1px rgba(0,0,0,.11), inset 0 -1px 0 0 rgba(0,0,0,.08), 0 1px 2px 0 rgba(0,0,0,.04); }' +
			'html div.mxRubberband { border:1px solid; border-color: #29b6f2 !important; background:rgba(41,182,242,0.4) !important; } ' +
			'html body div.mxPopupMenu { border-radius:5px; border:1px solid #c0c0c0; padding:5px 0 5px 0; box-shadow: 0px 4px 17px -4px rgba(96,96,96,1); } ' +
			'html table.mxPopupMenu td.mxPopupMenuItem { color: ' + (Editor.isDarkMode() ? '#cccccc' : '#353535') + '; font-size: 14px; padding-top: 4px; padding-bottom: 4px; }' +
			'html table.mxPopupMenu tr.mxPopupMenuItemHover { background-color: ' + (Editor.isDarkMode() ? '#000000' : '#29b6f2') + '; }' +
			'html tr.mxPopupMenuItemHover td.mxPopupMenuItem, html tr.mxPopupMenuItemHover td.mxPopupMenuItem span { color: ' + (Editor.isDarkMode() ? '#cccccc' : '#ffffff') + ' !important; }' +
			'html tr.mxPopupMenuItem, html td.mxPopupMenuItem { transition-property: none !important; }' +
			'html body td.mxWindowTitle { padding-right: 14px; }';
	};

	/**
	 * Sets dark mode and persists the setting.
	 */
	EditorUi.prototype.setAndPersistDarkMode = function(value)
	{
		var actual = value;

		if (value == 'auto')
		{
			actual = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
		}

		this.setDarkMode(actual);
		mxSettings.settings.darkMode = value;
		mxSettings.save();
		
		var theme = mxSettings.getUi();

		if (urlParams['ui'] == null && value != 'auto' && theme != 'atlas' &&
			theme != 'min' && theme != 'sketch' && theme != 'simple')
		{
			this.setCurrentTheme((!Editor.isDarkMode()) ? 'kennedy' : 'dark', true);
		}
	};

	/**
	 * Sets dark mode and persists the setting.
	 */
	EditorUi.prototype.setAndPersistLanguage = function(value)
	{
		mxSettings.setLanguage(value);
		mxSettings.save();
		
		// Shows dialog in new language
		mxClient.language = value;
		mxResources.loadDefaultBundle = false;
		mxResources.add(RESOURCE_BASE);
	};

	/**
	 * Dynamic change of dark mode.
	 */
	EditorUi.prototype.isRulerVisible = function()
	{
		return this.ruler != null;
	};
	
	/**
	 * Dynamic change of dark mode.
	 */
	EditorUi.prototype.setRulerVisible = function(visible)
	{
		var before = this.getDiagramContainerOffset();
		mxSettings.setRulerOn(visible);
		mxSettings.save();
		
		if (!visible && this.ruler != null)
		{
			this.ruler.destroy();
			this.ruler = null;
		}
		else if (visible && this.ruler == null)
		{
			this.ruler = new mxDualRuler(this, this.editor.graph.view.unit);
		}

		this.refresh();
		this.fireEvent(new mxEventObject('rulerVisibleChanged'));

		var after = this.getDiagramContainerOffset();
		this.diagramContainer.scrollLeft += after.x - before.x;
		this.diagramContainer.scrollTop += after.x - before.x;
	};
	
	/**
	 * Returns true if automatic dark mode is supported.
	 */
	EditorUi.prototype.isAutoDarkModeSupported = function()
	{
		return window.matchMedia != null;
	};
	
	/**
	 * Returns the current state of the dark mode.
	 */
	EditorUi.prototype.isAutoDarkMode = function(ignoreUrl)
	{
		return (!ignoreUrl && urlParams['dark'] == 'auto') ||
			(Editor.isSettingsEnabled() && (mxSettings.settings.darkMode == 'auto' ||
			(this.getServiceName() == 'draw.io' && urlParams['embed'] != '1' &&
			(!this.editor.chromeless || this.editor.editable) &&
			mxSettings.settings.darkMode == null)));
	};
	
	/**
	 * Dynamic change of dark mode.
	 */
	EditorUi.prototype.setDarkMode = function(value)
	{
		this.doSetDarkMode(value, mxUtils.bind(this, function()
		{
			this.fireEvent(new mxEventObject('darkModeChanged'));
		}), mxUtils.bind(this, function(e)
		{
			if (window.console != null)
			{
				console.error(e);
			}

			this.editor.setStatus(e.message);
		}));
	};
	
	/**
	 * Creates dark mode style node.
	 */
	EditorUi.prototype.createDarkStyle = function()
	{
		var darkStyle = document.createElement('link');
		darkStyle.setAttribute('rel', 'stylesheet');
		darkStyle.setAttribute('href', STYLE_PATH + '/dark.css');
		darkStyle.setAttribute('charset', 'UTF-8');
		darkStyle.setAttribute('type', 'text/css');

		return darkStyle;
	};
	
	// Sets instance graph stylesheet
	EditorUi.setGraphDarkMode = function(graph, container, darkMode)
	{
		graph.view.defaultGridColor = darkMode ?
			mxGraphView.prototype.defaultDarkGridColor : mxGraphView.prototype.defaultGridColor;
		graph.view.gridColor = graph.view.defaultGridColor;
		graph.defaultPageBackgroundColor = (urlParams['embedInline'] == '1') ? 'transparent' :
			darkMode ? Editor.darkColor : '#ffffff';
		graph.defaultPageBorderColor = darkMode ? '#000000' : '#ffffff';
		graph.shapeBackgroundColor = darkMode ? Editor.darkColor : '#ffffff';
		graph.shapeForegroundColor = darkMode ? Editor.lightColor : '#000000';
		graph.defaultThemeName = darkMode ? 'darkTheme' : 'default-style2';
		graph.graphHandler.previewColor = darkMode ? '#cccccc' : 'black';
		mxGraphHandler.prototype.previewColor = graph.graphHandler.previewColor;
		
		if (container != null)
		{
			container.style.backgroundColor = (urlParams['embedInline'] == '1') ? 'transparent' :
				(darkMode ? Editor.darkColor : '#ffffff');
		}

		graph.loadStylesheet();

		// Sets global vars
		Graph.prototype.defaultPageBackgroundColor = graph.defaultPageBackgroundColor;
		Graph.prototype.defaultPageBorderColor = graph.defaultPageBorderColor;
		Graph.prototype.shapeBackgroundColor = graph.shapeBackgroundColor;
		Graph.prototype.shapeForegroundColor = graph.shapeForegroundColor;
		Graph.prototype.defaultThemeName = graph.defaultThemeName;
	};

	/**
	 * Dynamic change of dark mode.
	 */
	EditorUi.prototype.setCssDarkMode = function(value)
	{
		var node = (mxUtils.isAncestorNode(document.body, this.container)) ?
			this.container : this.editor.graph.container;

		if (node != null)
		{
			if (value)
			{
				node.classList.add('geDarkMode');
			}
			else
			{
				node.classList.remove('geDarkMode');
			}
		}
	};

	/**
	 * Dynamic change of dark mode.
	 */
	EditorUi.prototype.doSetDarkMode = function(value, success, error)
	{
		if (Editor.enableCssDarkMode)
		{
			this.setCssDarkMode(value);
			Editor.cssDarkMode = value;
			success();
		}
		else
		{
			var delayed = mxUtils.bind(this, function()
			{
				if (Editor.darkMode != value)
				{
					var graph = this.editor.graph;
					Editor.darkMode = value;

					// Sets instance vars and graph stylesheet
					this.spinner.opts.color = Editor.isDarkMode() ? '#c0c0c0' : '#000';
					EditorUi.setGraphDarkMode(graph, document.body, Editor.isDarkMode());
					
					// Destroys windows with code for dark mode
					if (this.actions.layersWindow != null)
					{
						var wasVisible = this.actions.layersWindow.window.isVisible();
					
						this.actions.layersWindow.window.setVisible(false);
						this.actions.layersWindow.destroy();
						this.actions.layersWindow = null;

						if (wasVisible)
						{
							window.setTimeout(this.actions.get('layers').funct, 0);
						}
					}

					if (this.menus != null && this.menus.commentsWindow != null)
					{
						this.menus.commentsWindow.window.setVisible(false);
						this.menus.commentsWindow.destroy();
						this.menus.commentsWindow = null;
					}
					
					if (this.ruler != null)
					{
						this.ruler.updateStyle();
					}

					if (window.StyleFormatPanel != null)
					{
						StyleFormatPanel.prototype.defaultStrokeColor = Editor.isDarkMode() ? '#cccccc' : 'black';
					}

					if (window.Format != null)
					{
						Format.inactiveTabBackgroundColor = Editor.isDarkMode() ? '#000000' : '#e4e4e4';
					}

					mxConstants.DROP_TARGET_COLOR = Editor.isDarkMode() ? '#00ff00' : '#0000FF';
					Editor.helpImage = (Editor.isDarkMode() && mxClient.IS_SVG) ?
						Editor.darkHelpImage : Editor.lightHelpImage;
					Editor.checkmarkImage = (Editor.isDarkMode() && mxClient.IS_SVG) ?
						Editor.darkCheckmarkImage : Editor.lightCheckmarkImage;
					
					// Updates CSS
					if (this.sketchStyleElt != null)
					{
						this.sketchStyleElt.innerHTML = Editor.createMinimalCss();
					}
					else if (Editor.styleElt != null)
					{
						Editor.styleElt.innerHTML = Editor.createMinimalCss();
					}
				}

				// Adds or removes link to CSS
				if (Editor.isDarkMode())
				{
					if (this.darkStyle.parentNode == null)
					{
						var head = document.getElementsByTagName('head')[0];
						head.appendChild(this.darkStyle);
					}
				}
				else if (this.darkStyle.parentNode != null)
				{
					this.darkStyle.parentNode.removeChild(this.darkStyle);
				}

				success();
			});

			if (this.darkStyle != null)
			{
				delayed();
			}
			else
			{
				var darkStyle = this.createDarkStyle();

				this.createTimeout(null, mxUtils.bind(this, function(timeout)
				{
					darkStyle.onerror = mxUtils.bind(this, function(e)
					{
						if (timeout.clear())
						{
							error(new Error(mxResources.get('errorLoadingFile') +
								' ' + darkStyle.getAttribute('href')));
						}
					});

					darkStyle.onload = mxUtils.bind(this, function()
					{
						if (timeout.clear())
						{
							this.darkStyle = darkStyle;
							delayed();
						}
					});

					var head = document.getElementsByTagName('head')[0];
					head.appendChild(darkStyle);
				}), mxUtils.bind(this, function()
				{
					error(new Error(mxResources.get('timeout') +
						' ' + darkStyle.getAttribute('href')));
				}));
			};
		}
	};

	/**
	 * Changes Editor.pagesVisible.
	 */
	EditorUi.prototype.setPagesVisible = function(value)
	{
		if (Editor.pagesVisible != value)
		{
			Editor.pagesVisible = value;

			// Persist setting
			mxSettings.settings.pagesVisible = value;
			mxSettings.save();

			this.fireEvent(new mxEventObject('pagesVisibleChanged'));
		}
	};
    
	/**
	 * Changes Sidebar.sidebarTitles.
	 */
	EditorUi.prototype.setSidebarTitles = function(value, remember)
	{
		if (this.sidebar.sidebarTitles != value)
		{
			this.sidebar.sidebarTitles = value;
			this.sidebar.refresh();

			// Persist setting
			if (Editor.isSettingsEnabled() && remember)
			{
				mxSettings.settings.sidebarTitles = value;
				mxSettings.save();
			}

			this.fireEvent(new mxEventObject('sidebarTitlesChanged'));
		}
	};
    
	/**
	 * Saves scroll position
	 */
	EditorUi.prototype.saveScrollState = function()
	{
		var t = this.editor.graph.view.translate;
		var off = mxUtils.getOffset(this.diagramContainer);
		var x = this.diagramContainer.scrollLeft - off.x;
		var y = this.diagramContainer.scrollTop - off.y;

		if (this.embedViewport != null)
		{
			if (!Editor.inlineFullscreen)
			{
				x += this.embedViewport.x;
				y += this.embedViewport.y;
			}
			else
			{
				x -= this.embedViewport.x;
				y -= this.embedViewport.y;
			}
		}

		return {x: x, y: y, tx: t.x, ty: t.y};
	};
   
	/**
	 * Dynamic change of dark mode.
	 */
	EditorUi.prototype.restoreScrollState = function(state)
	{
		var s = this.editor.graph.view.scale;
		var t = this.editor.graph.view.translate;
		var off = mxUtils.getOffset(this.diagramContainer);
		
		this.diagramContainer.scrollLeft = state.x + off.x + (t.x - state.tx) * s;
		this.diagramContainer.scrollTop = state.y + off.y + (t.y - state.ty) * s;
	};

	/**
	 * Dynamic change of dark mode.
	 */
	EditorUi.prototype.setInlineFullscreen = function(value)
	{
		if (Editor.inlineFullscreen != value)
		{
			this.diagramContainer.setAttribute('data-scrollState',
				JSON.stringify(this.saveScrollState()));
			
			// Send request for fullscreen to parent
			var parent = window.opener || window.parent;
			parent.postMessage(JSON.stringify({
				event: 'resize',
				fullscreen: value,
				rect: this.diagramContainer.getBoundingClientRect()
			}), '*');
		}
	};

	/**
	 * Invokes to update the UI after a size change in inline embed mode.
	 */
	EditorUi.prototype.inlineSizeChanged = function()
	{
		var footer = this.sketchFooterMenuElt;
		var toolbar = this.sketchMainMenuElt;
		var picker = this.sketchPickerMenuElt;
		var graph = this.editor.graph;
		
		if (Editor.inlineFullscreen)
		{
			toolbar.style.left = '10px';
			toolbar.style.top = '10px';
			
			picker.style.left = '10px';
			picker.style.top = '60px';

			footer.style.top = '10px';
			footer.style.right = '12px';
			footer.style.left = '';

			if (this.diagramContainer.getAttribute('data-bounds') == null)
			{
				this.diagramContainer.setAttribute('data-bounds', this.diagramContainer.style.top + ' ' +
					this.diagramContainer.style.left + ' ' + this.diagramContainer.style.width + ' ' +
					this.diagramContainer.style.height);

				this.diagramContainer.style.top = '0px';
				this.diagramContainer.style.left = '0px';
				this.diagramContainer.style.bottom = '0px';
				this.diagramContainer.style.right = '0px';
				this.diagramContainer.style.width = '';
				this.diagramContainer.style.height = '';
			}
		}
		else
		{
			var bounds = this.diagramContainer.getAttribute('data-bounds');

			if (bounds != null) 
			{
				this.diagramContainer.removeAttribute('data-bounds');
				var gb = graph.getGraphBounds();
				var tokens = bounds.split(' ');

				var ds = mxUtils.getDocumentSize();
				this.diagramContainer.style.top = tokens[0];
				this.diagramContainer.style.left = tokens[1];

				var w = parseInt(tokens[2]);
				var h = parseInt(tokens[3]);

				w = Math.min((this.minInlineWidth != null) ? Math.max(
					this.minInlineWidth, w) : w, ds.width - 80);
				h = Math.min((this.minInlineHeight != null) ? Math.max(
					this.minInlineHeight, h) : h, ds.height - 80);
				
				this.diagramContainer.style.width = w + 'px';
				this.diagramContainer.style.height = h + 'px';
				this.diagramContainer.style.bottom = '';
				this.diagramContainer.style.right = '';

				var parent = window.opener || window.parent;
				parent.postMessage(JSON.stringify({
					event: 'resize',
					rect: this.diagramContainer.getBoundingClientRect()
				}), '*');
			}
			
			toolbar.style.left = this.diagramContainer.offsetLeft + 'px';
			toolbar.style.top = (this.diagramContainer.offsetTop -
				toolbar.offsetHeight - 4) + 'px';
			
			picker.style.display = '';
			picker.style.left = (this.diagramContainer.offsetLeft -
				picker.offsetWidth - 4) + 'px';
			picker.style.top = this.diagramContainer.offsetTop + 'px';

			footer.style.left = (this.diagramContainer.offsetLeft +
				this.diagramContainer.offsetWidth -
				footer.offsetWidth) + 'px';
			footer.style.top = toolbar.style.top;
			footer.style.right = '';

			this.bottomResizer.style.left = (this.diagramContainer.offsetLeft +
				(this.diagramContainer.offsetWidth -
				this.bottomResizer.offsetWidth) / 2) + 'px';
			this.bottomResizer.style.top = (this.diagramContainer.offsetTop +
				this.diagramContainer.offsetHeight -
				this.bottomResizer.offsetHeight / 2 - 1) + 'px';

			this.rightResizer.style.left = (this.diagramContainer.offsetLeft +
				this.diagramContainer.offsetWidth -
				this.rightResizer.offsetWidth / 2 - 1) + 'px';
			this.rightResizer.style.top = (this.diagramContainer.offsetTop +
				(this.diagramContainer.offsetHeight -
				this.bottomResizer.offsetHeight) / 2) + 'px';
		}

		this.bottomResizer.style.visibility = (Editor.inlineFullscreen) ? 'hidden' : '';
		this.rightResizer.style.visibility = this.bottomResizer.style.visibility;
		toolbar.style.visibility = '';
		footer.style.visibility = '';
	};

	/**
	 * Dynamic change of dark mode.
	 */
	EditorUi.prototype.doSetSketchMode = function(value)
	{
		if (Editor.sketchMode != value)
		{
			Editor.sketchMode = value;
			this.updateDefaultStyles();
		}
	};

	/**
	 * Overrides image dialog to add image search and Google+.
	 */
	EditorUi.prototype.updateDefaultStyles = function()
	{
		function setStyle(style, key, value)
		{
			style[key] = value;
		};
		
		var graph = this.editor.graph;
		graph.defaultVertexStyle = mxUtils.clone(Graph.prototype.defaultVertexStyle);
		graph.defaultEdgeStyle = mxUtils.clone(Graph.prototype.defaultEdgeStyle);

		if (Editor.sketchMode)
		{
			this.menus.defaultFontSize = 20;
		}
		else if (Editor.currentTheme == 'simple')
		{
			this.menus.defaultFontSize = 16;
		}
		else
		{
			this.menus.defaultFontSize = Menus.prototype.defaultFontSize;
		}

		if (this.menus.defaultFontSize == Menus.prototype.defaultFontSize)
		{
			setStyle(graph.defaultEdgeStyle, 'fontSize', null);
			setStyle(graph.defaultVertexStyle, 'fontSize', null);
		}
		else
		{
			setStyle(graph.defaultVertexStyle, 'fontSize', this.menus.defaultFontSize);	
			setStyle(graph.defaultEdgeStyle, 'fontSize', parseInt(this.menus.defaultFontSize) - 4);
		}

		if (Editor.currentTheme == 'simple')
		{
			setStyle(graph.defaultEdgeStyle, 'edgeStyle', 'none');
			setStyle(graph.defaultEdgeStyle, 'curved', '1');
			setStyle(graph.defaultEdgeStyle, 'rounded', '0');
			setStyle(graph.defaultEdgeStyle, 'endSize', '8');
			setStyle(graph.defaultEdgeStyle, 'startSize', '8');
		}
		else if (Editor.currentTheme == 'sketch')
		{
			setStyle(graph.defaultEdgeStyle, 'edgeStyle', 'none');
			setStyle(graph.defaultEdgeStyle, 'curved', '1');
			setStyle(graph.defaultEdgeStyle, 'rounded', '0');
			setStyle(graph.defaultEdgeStyle, 'jettySize', 'auto');
			setStyle(graph.defaultEdgeStyle, 'orthogonalLoop', '1');
			setStyle(graph.defaultEdgeStyle, 'endArrow', 'open');
			setStyle(graph.defaultEdgeStyle, 'endSize', '14');
			setStyle(graph.defaultEdgeStyle, 'startSize', '14');
			setStyle(graph.defaultEdgeStyle, 'sourcePerimeterSpacing', '8');
			setStyle(graph.defaultEdgeStyle, 'targetPerimeterSpacing', '8');
		}

		if (Editor.sketchMode)
		{
			this.menus.defaultFonts = Menus.prototype.defaultFonts.concat(Editor.sketchFonts);
			
			setStyle(graph.defaultVertexStyle, 'fontFamily', Editor.sketchFontFamily);
			setStyle(graph.defaultVertexStyle, 'fontSource', Editor.sketchFontSource);
			setStyle(graph.defaultVertexStyle, 'hachureGap', '4');
			setStyle(graph.defaultVertexStyle, 'sketch', '1');
			setStyle(graph.defaultVertexStyle, 'curveFitting', Editor.sketchDefaultCurveFitting);
			setStyle(graph.defaultVertexStyle, 'jiggle', Editor.sketchDefaultJiggle);

			setStyle(graph.defaultEdgeStyle, 'fontFamily', Editor.sketchFontFamily);
			setStyle(graph.defaultEdgeStyle, 'fontSource', Editor.sketchFontSource);
			setStyle(graph.defaultEdgeStyle, 'sketch', '1');
			setStyle(graph.defaultEdgeStyle, 'curveFitting', Editor.sketchDefaultCurveFitting);
			setStyle(graph.defaultEdgeStyle, 'jiggle', Editor.sketchDefaultJiggle);
			setStyle(graph.defaultEdgeStyle, 'hachureGap', '4');
		}
		else
		{
			this.menus.defaultFonts = Menus.prototype.defaultFonts;
		}

		graph.currentVertexStyle = mxUtils.clone(graph.defaultVertexStyle);
		graph.currentEdgeStyle = mxUtils.clone(graph.defaultEdgeStyle);
		this.clearDefaultStyle();
	};

	/**
	 * 
	 */
	EditorUi.prototype.getLinkTitle = function(href)
	{
		var title = Graph.prototype.getLinkTitle.apply(this, arguments);

		if (Graph.isPageLink(href))
		{
			var comma = href.indexOf(',');
	
			if (comma > 0)
			{
				var page = this.getPageById(href.substring(comma + 1));
	
				if (page != null)
				{
					title = page.getName();
				}
				else
				{
					title = mxResources.get('pageNotFound');
				}
			}
		}
		else if (href.substring(0, 5) == 'data:')
		{
			title = mxResources.get('action');
		}
		
		return title;
	};
	
	/**
	 * 
	 */
	EditorUi.prototype.handleCustomLink = function(href)
	{
		if (Graph.isPageLink(href))
		{
			var comma = href.indexOf(',');
			var page = this.getPageById(href.substring(comma + 1));
			
			if (page)
			{
				this.selectPage(page)
			}
			else
			{
				// Needs fallback for missing resource in case of viewer lightbox
				throw new Error(mxResources.get('pageNotFound') || 'Page not found');
			}
		}
		else
		{
			this.editor.graph.handleCustomLink(href);
		}
	};

	/**
	 * Creates the format panel and adds overrides.
	 */
	EditorUi.prototype.installSettings = function()
	{
		if (Editor.isSettingsEnabled())
		{
			// Sets global switch for sketch mode
			Editor.pagesVisible = mxSettings.settings.pagesVisible;

			// Gets recent colors from settings
			ColorDialog.recentColors = mxSettings.getRecentColors();

			// Avoids overridden values for changes in
			// multiple windows and updates shared values 
			if (isLocalStorage)
			{
				try
				{
					window.addEventListener('storage', mxUtils.bind(this, function(evt)
					{
						if (evt.key == mxSettings.key)
						{
							mxSettings.load();
							
							// Updates values
							ColorDialog.recentColors = mxSettings.getRecentColors();
							this.menus.customFonts = mxSettings.getCustomFonts();
						}
					}), false);
				}
				catch (e)
				{
					// ignore
				}
			}

			// Updates UI to reflect current edge style
			this.fireEvent(new mxEventObject('styleChanged', 'keys', [], 'values', [], 'cells', []));
			
			/**
			 * Persists custom fonts.
			 */
			this.menus.customFonts = mxSettings.getCustomFonts();
			
			this.addListener('customFontsChanged', mxUtils.bind(this, function(sender, evt)
			{
				if (urlParams['ext-fonts'] != '1')
				{
					mxSettings.setCustomFonts(this.menus.customFonts);
				}
				else
				{
					var customFonts = evt.getProperty('customFonts');
					this.menus.customFonts = customFonts;
					mxSettings.setCustomFonts(customFonts);
				}
				
				mxSettings.save();
			}));
			
			/**
			 * Persists copy on connect switch.
			 */
			this.editor.graph.connectionHandler.setCreateTarget(mxSettings.isCreateTarget());
			this.fireEvent(new mxEventObject('copyConnectChanged'));
			
			this.addListener('copyConnectChanged', mxUtils.bind(this, function(sender, evt)
			{
				mxSettings.setCreateTarget(this.editor.graph.connectionHandler.isCreateTarget());
				mxSettings.save();
			}));
			
			/**
			 * Persists default page format.
			 */
			this.editor.graph.pageFormat = (this.editor.graph.defaultPageFormat != null) ?
				this.editor.graph.defaultPageFormat : mxSettings.getPageFormat();

			this.addListener('pageFormatChanged', mxUtils.bind(this, function(sender, evt)
			{
				mxSettings.setPageFormat(this.editor.graph.pageFormat);
				mxSettings.save();
			}));

			/**
			 * Persists default grid color.
			 */
			this.editor.graph.view.gridColor = mxSettings.getGridColor(Editor.isDarkMode());
			this.editor.graph.view.defaultDarkGridColor = mxSettings.getGridColor(true);
			this.editor.graph.view.defaultGridColor = mxSettings.getGridColor(false);

			this.addListener('gridColorChanged', mxUtils.bind(this, function(sender, evt)
			{
				mxSettings.setGridColor(this.editor.graph.view.gridColor, Editor.isDarkMode());
				mxSettings.save();
			}));

			/**
			 * Persists autosave switch in Chrome app.
			 */
			if (mxClient.IS_CHROMEAPP || EditorUi.isElectronApp)
			{
				this.editor.addListener('autosaveChanged', mxUtils.bind(this, function(sender, evt)
				{
					mxSettings.setAutosave(this.editor.autosave);
					mxSettings.save();
				}));
				
				this.editor.autosave = mxSettings.getAutosave();
			}
			
			if (this.sidebar != null)
			{
				if (urlParams['search-shapes'] != null && this.sidebar.searchShapes != null)
				{
					this.sidebar.searchShapes(decodeURIComponent(urlParams['search-shapes']));
					this.sidebar.showEntries('search');
				}
				else
				{
					this.sidebar.showPalette('search', mxSettings.settings.search);
					
					/**
					 * Shows scratchpad if never shown.
					 */
					if ((!this.editor.chromeless || this.editor.editable) && (mxSettings.settings.isNew ||
						parseInt(mxSettings.settings.version || 0) <= 8))
					{
						this.toggleScratchpad();
						mxSettings.save();
					}
				}
			}

			// Saves app defaults for UI
			this.addListener('formatWidthChanged', function()
			{
				mxSettings.setFormatWidth(this.formatWidth);
				mxSettings.save();
			});
		}
	};
		
	/**
	 * Copies the given cells and XML to the clipboard as an embedded image.
	 */
	EditorUi.prototype.copyImage = function(cells, xml, scale)
	{
		try
		{
			if (navigator.clipboard != null && typeof window.ClipboardItem === 'function' &&
				this.spinner.spin(document.body, mxResources.get('exporting')))
			{
				this.editor.exportToCanvas(mxUtils.bind(this, function(canvas, svgRoot)
				{
					try
					{
						this.spinner.stop();
						
						// KNOWN: SVG and delayed content currently not supported
						var dataUrl = this.createImageDataUri(canvas, xml, 'png');
						var w = parseInt(svgRoot.getAttribute('width'));
						var h = parseInt(svgRoot.getAttribute('height'));
						this.writeImageToClipboard(dataUrl, w, h, mxUtils.bind(this, function(e)
						{
							this.handleError(e);
						}));
					}
					catch (e)
					{
						this.handleError(e);
					}
				}), null, null, null, mxUtils.bind(this, function(e)
				{
					this.spinner.stop();
					this.handleError(e);
				}), null, null, (scale != null) ? scale : 4,
					this.editor.graph.background == null ||
					this.editor.graph.background == mxConstants.NONE,
					null, null, null, 10, null, null, false, null,
					(cells.length > 0) ? cells : null);
			}
		}
		catch (e)
		{
			this.handleError(e);
		}
	};
	
	/**
	 * Copies the given cells and XML to the clipboard as an embedded image.
	 */
	EditorUi.prototype.writeImageToClipboard = function(dataUrl, w, h, error)
	{
		var blob = this.base64ToBlob(dataUrl.substring(dataUrl.indexOf(',') + 1), 'image/png');
		var html = '<img src="' + dataUrl + '" width="' + w + '" height="' + h + '">';
		var cbi = new ClipboardItem({'image/png': blob,
			'text/html': new Blob([html], {type: 'text/html'})});
		navigator.clipboard.write([cbi])['catch'](error);
	};

	/**
	 * Creates the format panel and adds overrides.
	 */
	EditorUi.prototype.copyCells = function(elt, removeCells)
	{
		var graph = this.editor.graph;
		
		if (!graph.isSelectionEmpty())
		{
			// Fixes cross-platform clipboard UTF8 issues by encoding as URI
			var cells = mxUtils.sortCells(graph.model.getTopmostCells(graph.getSelectionCells()));
			var xml = mxUtils.getXml(graph.encodeCells(cells));
			mxUtils.setTextContent(elt, encodeURIComponent(xml));

			if (removeCells)
			{
				graph.removeCells(cells, false);
				graph.lastPasteXml = null;
			}
			else
			{
				graph.lastPasteXml = xml;
				graph.pasteCounter = 0;
			}

			elt.focus();
			document.execCommand('selectAll', false, null);
		}
		else
		{
			// Disables copy on focused element
			elt.innerText = '';
		}
	};

	/**
	 * Creates the format panel and adds overrides.
	 */
	EditorUi.prototype.copyXml = function()
	{
		var cells = null;
		
		if (Editor.enableNativeCipboard)
		{
			var graph = this.editor.graph;
			
			if (!graph.isSelectionEmpty())
			{
				cells = mxUtils.sortCells(graph.getExportableCells(
					graph.model.getTopmostCells(graph.getSelectionCells())));
				var xml = mxUtils.getXml(graph.encodeCells(cells));
				navigator.clipboard.writeText(xml);
			}
		}
		
		return cells;
	};
	
	/**
	 * Creates the format panel and adds overrides.
	 */
	EditorUi.prototype.pasteXml = function(xml, pasteAsLabel, compat, evt, html)
	{
		html = (html != null) ? html : true;
		var graph = this.editor.graph;
		var cells = null;
		
		if (graph.lastPasteXml == xml)
		{
			graph.pasteCounter++;
		}
		else
		{
			graph.lastPasteXml = xml;
			graph.pasteCounter = 0;
		}
	
		var dx = graph.pasteCounter * graph.gridSize;
							
		if (compat || this.isCompatibleString(xml))
		{
			cells = this.importXml(xml, dx, dx);
			graph.setSelectionCells(cells);
		}
		else if (pasteAsLabel && graph.getSelectionCount() == 1)
		{
			var cell = graph.getStartEditingCell(graph.getSelectionCell(), evt);
			
			if ((/\.(gif|jpg|jpeg|tiff|png|svg)$/i).test(xml) &&
				graph.getCurrentCellStyle(cell)[mxConstants.STYLE_SHAPE] == 'image')
			{
				graph.setCellStyles(mxConstants.STYLE_IMAGE, xml, [cell]);
			}
			else
			{
				graph.model.beginUpdate();
        		try
        		{
					graph.labelChanged(cell, xml);
		
					if (Graph.isLink(xml))
					{
						graph.setLinkForCell(cell, xml);
					}
				}
        		finally
        		{
        			graph.model.endUpdate();
        		}
			}
			
			graph.setSelectionCell(cell);
		}
		else
		{
			var pt = graph.getInsertPoint();
			
			if (graph.isMouseInsertPoint())
			{
				dx = 0;
				
				// No offset for insert at mouse position
				if (graph.lastPasteXml == xml && graph.pasteCounter > 0)
				{
					graph.pasteCounter--;
				}
			}

			cells = this.insertTextAt(xml, pt.x + dx, pt.y + dx, html);
			graph.setSelectionCells(cells);
		}
		
		if (!graph.isSelectionEmpty())
		{
			graph.scrollCellToVisible(graph.getSelectionCell());
		
			if (this.hoverIcons != null)
			{
				this.hoverIcons.update(graph.view.getState(graph.getSelectionCell()));
			}
		}
		
		return cells;
	};
	
	/**
	 * Creates the format panel and adds overrides.
	 */
	EditorUi.prototype.pasteCells = function(evt, realElt, useEvent, pasteAsLabel)
	{
		if (!mxEvent.isConsumed(evt))
		{
			var elt = realElt;
			var asHtml = false;
			
			if (useEvent && evt.clipboardData != null && evt.clipboardData.getData)
			{
				// Workaround for paste from IE11 where the page is copied
				// as HTML while the data is only available via text/plain
				var plain = evt.clipboardData.getData('text/plain');
				var override = false;
				
				if (plain != null && plain.length > 0 && plain.substring(0, 18) == '%3CmxGraphModel%3E')
				{
					try
					{
						var tmp = decodeURIComponent(plain);
						
						if (this.isCompatibleString(tmp))
						{
							override = true;
							plain = tmp;
						}
					}
					catch (e)
					{
						// ignore
					}
				}
			
				var data = (!override) ? evt.clipboardData.getData('text/html') : null;
				
				if (data != null && data.length > 0)
				{
					elt = this.parseHtmlData(data);
					asHtml = elt.getAttribute('data-type') != 'text/plain';
				}
				else if (plain != null && plain.length > 0)
				{
					elt = document.createElement('div');
					mxUtils.setTextContent(elt, data);
				}
			}
			
			var spans = elt.getElementsByTagName('span');
		
			if (spans != null && spans.length > 0 && spans[0].getAttribute('data-lucid-type') ===
				'application/vnd.lucid.chart.objects')
			{
				var content = spans[0].getAttribute('data-lucid-content');
				
				if (content != null && content.length > 0)
				{
					this.convertLucidChart(content, mxUtils.bind(this, function(xml)
					{
						var graph = this.editor.graph;
						
						if (graph.lastPasteXml == xml)
						{
							graph.pasteCounter++;
						}
						else
						{
							graph.lastPasteXml = xml;
							graph.pasteCounter = 0;
						}
						
						var dx = graph.pasteCounter * graph.gridSize;
						graph.setSelectionCells(this.importXml(xml, dx, dx));
						graph.scrollCellToVisible(graph.getSelectionCell());
					}), mxUtils.bind(this, function(e)
					{
						this.handleError(e);
					}));
			
					mxEvent.consume(evt);
				}
			}
			//Miro is using unkown encoding instead of BASE64 as before
			/*else if (spans != null && spans.length > 0 && spans[0].hasAttribute('data-meta')
				&& spans[0].getAttribute('data-meta').substring(0, 14) == '<--(miro-data)')
			{
				var miroData = spans[0].getAttribute('data-meta');
				miroData = miroData.substring(14, miroData.length - 15);
				console.log(miroData);
			}*/
			else
			{
				// KNOWN: Paste from IE11 to other browsers on Windows
				// seems to paste the contents of index.html
				var xml = (asHtml) ? elt.innerHTML :
					mxUtils.trim((elt.innerText == null) ?
					mxUtils.getTextContent(elt) : elt.innerText);
				var compat = false;

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
							
					if (tmp && (this.isCompatibleString(tmp) || 
						tmp.substring(0, 20).replace(/\s/g, '').indexOf('{"isProtected":') == 0))
					{
						compat = true;
						xml = tmp;
					}
				}
				catch (e)
				{
					// ignore
				}

				try
				{
					if (xml != null && xml.length > 0)
					{
						if (xml.substring(0, 20).replace(/\s/g, '').indexOf('{"isProtected":') == 0)
						{
							var delayed = mxUtils.bind(this, function ()
							{
								try
								{
									var miro = new MiroImporter();
									xml = miro.importMiroJson(JSON.parse(xml));
									this.pasteXml(xml, pasteAsLabel, compat, evt);
								}
								catch(e)
								{
									console.log('Miro import error:', e);
								}
							});

							if (typeof MiroImporter === 'undefined')
							{
								mxscript('js/diagramly/miro/MiroImporter.js', delayed);
							}
							else
							{
								delayed();
							}
						}
						else
						{
							this.pasteXml(xml, pasteAsLabel, compat, evt, asHtml);
						}

						try
						{
							mxEvent.consume(evt);
						}
						catch (e)
						{
							// ignore event no longer exists in async handler in IE8-
						}
					}
					else if (!useEvent)
					{
						var graph = this.editor.graph;
					
						graph.lastPasteXml = null;
						graph.pasteCounter = 0;
					}
				}
				catch (e)
				{
					this.handleError(e);
				}
			}
		}
		
		realElt.innerHTML = '&nbsp;';
	};

	/**
	 * Adds a file drop handler for opening local files.
	 */
	EditorUi.prototype.addFileDropHandler = function(elts)
	{
		// Installs drag and drop handler for files
		if (Graph.fileSupport)
		{
			var dropElt = null;
			
			for (var i = 0; i < elts.length; i++)
			{
				// Setup the dnd listeners
				mxEvent.addListener(elts[i], 'dragleave', function(evt)
				{
					if (dropElt != null)
				    {
				    	dropElt.parentNode.removeChild(dropElt);
				    	dropElt = null;
				    }
					
					evt.stopPropagation();
					evt.preventDefault();
				});
		
				mxEvent.addListener(elts[i], 'dragover', mxUtils.bind(this, function(evt)
				{
					if (this.editor.graph.isEnabled() || urlParams['embed'] != '1')
					{
						// IE 10 does not implement pointer-events so it can't have a drop highlight
						if (dropElt == null && (!mxClient.IS_IE || (document.documentMode > 10 && document.documentMode < 12)))
						{
							dropElt = this.highlightElement();
						}
					}

					evt.stopPropagation();
					evt.preventDefault();
				}));
				
				mxEvent.addListener(elts[i], 'drop', mxUtils.bind(this, function(evt)
				{
					if (dropElt != null)
				    {
					    dropElt.parentNode.removeChild(dropElt);
					    dropElt = null;
				    }
					
					if (this.editor.graph.isEnabled() || urlParams['embed'] != '1')
					{
						if (evt.dataTransfer.files.length > 0)
						{
							this.hideDialog();
							
							// Never open files in embed mode
							if (urlParams['embed'] == '1')
							{
								this.importFiles(evt.dataTransfer.files, 0, 0, this.maxImageSize, null, null,
									null, null, !mxEvent.isControlDown(evt) && !mxEvent.isShiftDown(evt));
							}
							else
							{
								this.openFiles(evt.dataTransfer.files, true);
							}
						}
						else
						{
							// Handles open special files via text drag and drop
							var data = this.extractGraphModelFromEvent(evt);
							
							// Tries additional and async parsing of text content such as HTML, Gliffy data
							if (data == null)
							{
								var provider = (evt.dataTransfer != null) ? evt.dataTransfer : evt.clipboardData;
							
								if (provider != null)
								{
									if (document.documentMode == 10 || document.documentMode == 11)
									{
										data = provider.getData('Text');
									}
									else
									{
								    	var data = null;
								    	
								    	if (mxUtils.indexOf(provider.types, 'text/uri-list') >= 0)
								    	{
								    		data = evt.dataTransfer.getData('text/uri-list');
								    	}
								    	else
								    	{
								    		data = (mxUtils.indexOf(provider.types, 'text/html') >= 0) ? provider.getData('text/html') : null;
								    	}
										
										if (data != null && data.length > 0)
										{
											var div = document.createElement('div');
								    		div.innerHTML = Graph.sanitizeHtml(data);
		
								    		// Extracts single image
								    		var imgs = div.getElementsByTagName('img');
								    		
								    		if (imgs.length > 0)
								    		{
								    			data = imgs[0].getAttribute('src');
								    		}
										}
										else if (mxUtils.indexOf(provider.types, 'text/plain') >= 0)
										{
											data = provider.getData('text/plain');
										}
									}
									
									if (data != null)
									{
										// Checks for embedded XML in PNG
										if (Editor.isPngDataUrl(data))
										{
											var xml = Editor.extractGraphModelFromPng(data);
											
											if (xml != null && xml.length > 0)
											{
												this.openLocalFile(xml, null, true);
											}
										}
										else if (this.isRemoteFileFormat(data))
										{
											if (this.isOffline())
											{
												this.showError(mxResources.get('error'), mxResources.get('notInOffline'));
											}
											else
											{
												new mxXmlRequest(OPEN_URL, 'format=xml&data=' + encodeURIComponent(data)).send(mxUtils.bind(this, function(req)
												{
													if (req.getStatus() >= 200 && req.getStatus() <= 299)
													{
														this.openLocalFile(req.getText(), null, true);
													}
													else
													{
														this.showError(mxResources.get('error'), req.getStatus() == 413? mxResources.get('diagramTooLarge') :
																			mxResources.get('unknownError'));
													}
												}));
											}
										}
										else if (/^https?:\/\//.test(data))
										{
											if (this.getCurrentFile() == null)
											{
												window.location.hash = '#U' + encodeURIComponent(data);
											}
											else
											{
												window.openWindow(((mxClient.IS_CHROMEAPP) ?
													(EditorUi.drawHost + '/') : 'https://' + location.host + '/') +
													window.location.search + '#U' + encodeURIComponent(data));
											}
										}
									}
								}
							}
							else
							{
								this.openLocalFile(data, null, true);
							}
						}
					}

					evt.stopPropagation();
					evt.preventDefault();
				}));
			}
		}
	};
	
	/**
	 * Highlights the given element
	 */
	EditorUi.prototype.highlightElement = function(elt)
	{
		var x = 0;
		var y = 0;
		var w = 0;
		var h = 0;
		
		if (elt == null)
		{
			var b = document.body;
			var d = document.documentElement;
		
			w = (b.clientWidth || d.clientWidth) - 3;
			h = Math.max(b.clientHeight || 0, d.clientHeight) - 3;
		}
		else
		{
			x = elt.offsetTop;
			y = elt.offsetLeft;
			w = elt.clientWidth;
			h = elt.clientHeight;
		}
		
		var hl = document.createElement('div');
		hl.style.zIndex = mxPopupMenu.prototype.zIndex + 2;
		hl.style.border = '3px dotted rgb(254, 137, 12)';
		hl.style.pointerEvents = 'none';
		hl.style.position = 'absolute';
		hl.style.top = x + 'px';
		hl.style.left = y + 'px';
		hl.style.width = Math.max(0, w - 3) + 'px';
		hl.style.height = Math.max(0, h - 3) + 'px';
		
		if (elt != null && elt.parentNode == this.editor.graph.container)
		{
			this.editor.graph.container.appendChild(hl);
		}
		else
		{
			document.body.appendChild(hl);
		}
		
		return hl;
	};
	
	/**
	 * Highlights the given element
	 */
	EditorUi.prototype.stringToCells = function(xml)
	{
		var doc = mxUtils.parseXml(xml);
		var node = this.editor.extractGraphModel(doc.documentElement);
		var cells = [];
		
		if (node != null)
		{
			var codec = new mxCodec(node.ownerDocument);
			var model = new mxGraphModel();
			codec.decode(node, model);
			
			var parent = model.getChildAt(model.getRoot(), 0);
			
			for (var j = 0; j < model.getChildCount(parent); j++)
			{
				cells.push(model.getChildAt(parent, j));
			}
		}
		
		return cells;
	};
	
	/**
	 * Opens the given files in the editor.
	 */
	EditorUi.prototype.openFileHandle = function(data, name, file, temp, fileHandle)
	{
		if (name != null && name.length > 0)
		{
			if ((!this.useCanvasForExport && /(\.png)$/i.test(name)) ||
				/(\.pdf)$/i.test(name))
			{
				name = name.substring(0, name.length - 4);
				
				if (!/(\.drawio)$/i.test(name))
				{
					name = name + '.drawio';
				}
			}
			
			var handleResult = mxUtils.bind(this, function(xml)
			{
				var dot = name.lastIndexOf('.');
				
				if (dot >= 0)
				{
					name = name.substring(0, name.lastIndexOf('.')) + '.drawio';
				}
				else
				{
					name = name + '.drawio';
				}
				
				if (xml.substring(0, 10) == '<mxlibrary')
				{
					// Creates new temporary file if library is dropped in splash screen
					if (this.getCurrentFile() == null && urlParams['embed'] != '1')
					{
						this.openLocalFile(this.emptyDiagramXml, this.defaultFilename, temp);
					}
				
    				try
	    			{
    					this.loadLibrary(new LocalLibrary(this, xml, name));
	    			}
    				catch (e)
	    			{
	    				this.handleError(e, mxResources.get('errorLoadingFile'));
	    			}
				}
				else
				{
					this.openLocalFile(xml, name, temp);
				}
			});
			
			if  (/(\.v(dx|sdx?))($|\?)/i.test(name) || /(\.vs(x|sx?))($|\?)/i.test(name))
			{
				this.importVisio(file, mxUtils.bind(this, function(xml)
				{
					this.spinner.stop();
					handleResult(xml);
				}));
			}
			else if (/(\.*<graphml )/.test(data)) 
			{
				this.importGraphML(data, mxUtils.bind(this, function(xml)
				{
					this.spinner.stop();
					handleResult(xml);
				}));
			}
			else if (Graph.fileSupport && new XMLHttpRequest().upload &&
				this.isRemoteFileFormat(data, name))
			{
				if (this.isOffline())
				{
					this.spinner.stop();
					this.showError(mxResources.get('error'), mxResources.get('notInOffline'));
				}
				else
				{
					this.parseFile(file, mxUtils.bind(this, function(xhr)
					{
						if (xhr.readyState == 4)
						{
							this.spinner.stop();
							
							if (xhr.status >= 200 && xhr.status <= 299)
							{
								handleResult(xhr.responseText);
							}
							else
							{
								this.handleError({message: mxResources.get((xhr.status == 413) ?
									'drawingTooLarge' : 'invalidOrMissingFile')},
									mxResources.get('errorLoadingFile'));
							}
						}
					}));
				}
			}
			else if (this.isLucidChartData(data))
			{
				if (/(\.json)$/i.test(name))
				{
					name = name.substring(0, name.length - 5) + '.drawio';
				}

				// LATER: Add import step that produces cells and use callback
				this.convertLucidChart(data, mxUtils.bind(this, function(xml)
				{
					this.spinner.stop();
					this.openLocalFile(xml, name, temp);
				}), mxUtils.bind(this, function(e)
				{
					this.spinner.stop();
					this.handleError(e);
				}));
			}
			else if (data.substring(0, 10) == '<mxlibrary')
			{
				this.spinner.stop();
				
				// Creates new temporary file if library is dropped in splash screen
				if (this.getCurrentFile() == null && urlParams['embed'] != '1')
				{
					this.openLocalFile(this.emptyDiagramXml, this.defaultFilename, temp);
				}
				
				try
    			{
    				this.loadLibrary(new LocalLibrary(this, data, file.name));
    			}
    			catch (e)
    			{
    				this.handleError(e, mxResources.get('errorLoadingFile'));
    			}
			}
			else if (data.indexOf('PK') == 0)
			{
				this.importZipFile(file, mxUtils.bind(this, function(xml)
				{
					this.spinner.stop();
					handleResult(xml);
				}), mxUtils.bind(this, function()
				{
					this.spinner.stop();
					this.openLocalFile(data, name, temp);
				}));
			}
			else
			{
				if (file.type.substring(0, 9) == 'image/png')
				{
					data = this.extractGraphModelFromPng(data);
				}
				else if (file.type == 'application/pdf')
	    		{
					var xml = Editor.extractGraphModelFromPdf(data);
					
					if (xml != null)
					{
						fileHandle = null;
						temp = true;
						data = xml;
					}
	    		}
				
				this.spinner.stop();
				this.openLocalFile(data, name, temp, fileHandle, (fileHandle != null) ? file : null);
			}
		}
	};
	
	/**
	 * Opens the given files in the editor.
	 */
	EditorUi.prototype.openFiles = function(files, temp)
	{
		if (this.spinner.spin(document.body, mxResources.get('loading')))
		{
			for (var i = 0; i < files.length; i++)
			{
				(mxUtils.bind(this, function(file)
				{
					var reader = new FileReader();
				
					reader.onload = mxUtils.bind(this, function(e)
					{
						try
						{
							this.openFileHandle(e.target.result, file.name, file, temp);
						}
						catch (e)
						{
							this.handleError(e);
						}
					});
					
					reader.onerror = mxUtils.bind(this, function(e)
					{
						this.spinner.stop();
						this.handleError(e);
						window.openFile = null;
					});
					
					if ((file.type.substring(0, 5) === 'image' ||
						file.type === 'application/pdf') &&
						file.type.substring(0, 9) !== 'image/svg')
					{
						reader.readAsDataURL(file);
					}
					else
					{
						reader.readAsText(file);
					}
				}))(files[i]);
			}
		}
	};

	/**
	 * Shows the layers dialog if the graph has more than one layer.
	 */
	EditorUi.prototype.openLocalFile = function(data, name, temp, fileHandle, desc)
	{
		var currentFile = this.getCurrentFile();
		
		var fn = mxUtils.bind(this, function()
		{
			window.openFile = null;
			
			if (name == null && this.getCurrentFile() != null && this.isDiagramEmpty())
			{
				var doc = mxUtils.parseXml(data);
				
				if (doc != null)
				{
					this.editor.setGraphXml(doc.documentElement);
					this.editor.graph.selectAll();
				}
			}
			else
			{
				this.fileLoaded(new LocalFile(this, data, name ||
					this.defaultFilename, temp, fileHandle, desc));
			}
		});

		if (data != null && data.length > 0)
		{
			if (currentFile == null || (!currentFile.isModified() &&
				(mxClient.IS_CHROMEAPP || EditorUi.isElectronApp || fileHandle != null)))
			{
				fn();
			}
			else if ((mxClient.IS_CHROMEAPP || EditorUi.isElectronApp || fileHandle != null) &&
				currentFile != null && currentFile.isModified())
			{
				this.confirm(mxResources.get('allChangesLost'), null, fn,
					mxResources.get('cancel'), mxResources.get('discardChanges'));
			}
			else
			{
				window.openFile = new OpenFile(function()
				{
					window.openFile = null;
				});
				
				window.openFile.setData(data, name);
				window.openWindow(this.getUrl(), null, mxUtils.bind(this, function()
				{
					if (currentFile != null && currentFile.isModified())
					{
						this.confirm(mxResources.get('allChangesLost'), null, fn,
							mxResources.get('cancel'), mxResources.get('discardChanges'));
					}
					else
					{
						fn();
					}
				}));
			}
		}
		else
		{
			throw new Error(mxResources.get('notADiagramFile'));
		}
	};
	
	/**
	 * Returns a list of all shapes used in the current file.
	 */
	EditorUi.prototype.getBasenames = function()
	{
		var basenames = {};

		if (this.pages != null)
		{
			for (var i = 0; i < this.pages.length; i++)
			{
				this.updatePageRoot(this.pages[i]);
				this.addBasenamesForCell(this.pages[i].root, basenames);
			}
		}
		else
		{
			this.addBasenamesForCell(this.editor.graph.model.getRoot(), basenames);
		}
		
		var result = [];
		
		for (var key in basenames)
		{
			result.push(key);
		}
		
		return result;
	};
		
	/**
	 * Returns a list of all shapes used in the current file.
	 */
	EditorUi.prototype.addBasenamesForCell = function(cell, basenames)
	{
		function addName(name)
		{
			if (name != null)
			{
				// LATER: Check if this case exists
				var dot = name.lastIndexOf('.');
				
				if (dot > 0)
				{
					name = name.substring(dot + 1, name.length);
				}
				
				if (basenames[name] == null)
				{
					basenames[name] = true;
				}
			}
		};
		
		var graph = this.editor.graph;
		var style = graph.getCellStyle(cell);
		var shape = style[mxConstants.STYLE_SHAPE];
		addName(mxStencilRegistry.getBasenameForStencil(shape));
		
		// Adds package names for markers in edges
		if (graph.model.isEdge(cell))
		{
			addName(mxMarker.getPackageForType(style[mxConstants.STYLE_STARTARROW]));
			addName(mxMarker.getPackageForType(style[mxConstants.STYLE_ENDARROW]));
		}

		var childCount = graph.model.getChildCount(cell);
		
		for (var i = 0; i < childCount; i++)
		{
			this.addBasenamesForCell(graph.model.getChildAt(cell, i), basenames);
		}
	};
	
	/**
	 * Shows the layers dialog if the graph has more than one layer.
	 */
	EditorUi.prototype.setGraphEnabled = function(enabled)
	{
		this.diagramContainer.style.visibility = (enabled) ? '' : 'hidden';
		this.formatContainer.style.visibility = (enabled) ? '' : 'hidden';
		this.sidebarContainer.style.display = (enabled) ? '' : 'none';
		this.hsplit.style.display = (enabled && Editor.currentTheme != 'sketch' &&
			Editor.currentTheme != 'min') ? '' : 'none';
		this.editor.graph.setEnabled(enabled);
		
		if (this.tabContainer != null)
		{
			this.tabContainer.style.visibility = (enabled) ? '' : 'hidden';	
		}
		
		if (this.ruler != null)
		{
			this.ruler.hRuler.container.style.visibility = (enabled) ? '' : 'hidden';
			this.ruler.vRuler.container.style.visibility = (enabled) ? '' : 'hidden';
		}
		
		if (!enabled)
		{
			this.hideWindows();
		}
	};
	
	/**
	 * Shows the layers dialog if the graph has more than one layer.
	 */
	EditorUi.prototype.initializeEmbedMode = function()
	{
		this.setGraphEnabled(false);
		var parent = window.opener || window.parent;

		if (parent != window)
		{
			if (urlParams['spin'] != '1' || this.spinner.spin(document.body, mxResources.get('loading')))
			{
				var initialized = false;

				this.installMessageHandler(mxUtils.bind(this, function(xml, evt, modified, convertToSketch)
				{
					if (!initialized)
					{
						initialized = true;
						
						this.spinner.stop();
						this.addEmbedButtons();
						this.setGraphEnabled(true);
					}
					
					if (xml == null || xml.length == 0)
					{
						xml = this.emptyDiagramXml;
					}
					
					// Creates temporary file for diff sync in embed mode
					this.setCurrentFile(new EmbedFile(this, xml, {}));
					this.mode = App.MODE_EMBED;
					this.setFileData(xml);
					
					// TODO: Check if cellsInserted should be fired instead here
					if (convertToSketch)
					{
						try
						{
							//Disable grid and page view
							var graph = this.editor.graph;
							graph.setGridEnabled(false);
							graph.pageVisible = false;
							var cells = graph.model.cells;
							
							//Add sketch style and font to all cells
							for (var id in cells)
							{
								var cell = cells[id];
								
								if (cell != null && cell.style != null)
								{
									cell.style += ';sketch=1;' + (cell.style.indexOf('fontFamily=') == -1 || cell.style.indexOf('fontFamily=Helvetica;') > -1? 
											'fontFamily=Architects Daughter;fontSource=https%3A%2F%2Ffonts.googleapis.com%2Fcss%3Ffamily%3DArchitects%2BDaughter;' : '');
								}
							}
						}
						catch(e)
						{
							console.log(e); //Ignore
						}
					}
					
					if (!this.editor.isChromelessView())
					{
						this.showLayersDialog();
					}
					else if (this.editor.graph.isLightboxView())
					{
						this.lightboxFit();
					}
					
					if (this.chromelessResize)
					{
						this.chromelessResize();
					}
	
					this.editor.undoManager.clear();
					this.editor.modified = (modified != null) ? modified : false;
					this.updateUi();
					
					// Workaround for no initial focus in FF
					// (does not work in Conf Cloud with FF)
					if (window.self !== window.top)
					{
						window.focus();
					}
					
					if (this.format != null)
					{
						this.format.refresh();
					}
				}));
			}
		}
	};
	
	/**
	 * Shows the layers dialog if the graph has more than one layer.
	 */
	EditorUi.prototype.showLayersDialog = function()
	{
		if (this.editor.graph.getModel().getChildCount(this.editor.graph.getModel().getRoot()) > 1)
		{
			if (this.actions.layersWindow == null)
			{
				this.actions.get('layers').funct();
			}
			else
			{
				this.actions.layersWindow.window.setVisible(true);
			}
		}
	};

	/**
	 * Tries to find a public URL for the given file.
	 */
	EditorUi.prototype.getPublicUrl = function(file, fn)
	{
		if (file != null)
		{
			file.getPublicUrl(fn);
		}
		else
		{
			fn(null);
		}
	};

	/**
	 * Adds the buttons for embedded mode.
	 */
	EditorUi.prototype.createLoadMessage = function(eventName)
	{
		var graph = this.editor.graph;
		
		return {event: eventName, pageVisible: graph.pageVisible, translate: graph.view.translate,
			bounds: graph.getGraphBounds(), currentPage: this.getSelectedPageIndex(),
			scale: graph.view.scale, page: graph.view.getBackgroundPageBounds()};
	};
	
	/**
	 * Adds the buttons for embedded mode.
	 */
	EditorUi.prototype.sendEmbeddedSvgExport = function(noExit)
	{
		try
		{
			var graph = this.editor.graph;

			if (graph.isEditing())
			{
				graph.stopEditing(!graph.isInvokesStopCellEditing());
			}

			var parent = window.opener || window.parent;
			
			if (!this.editor.modified)
			{
				if (!noExit)
				{
					parent.postMessage(JSON.stringify({event: 'exit',
						point: this.embedExitPoint}), '*');
				}
			}
			else
			{
				var bg = graph.background;
			
				if (bg == null || bg == mxConstants.NONE)
				{
					bg = this.embedExportBackground;
				}

				this.getEmbeddedSvg(this.getFileData(true, null, null, null, null,
					null, null, null, null, false), graph, null, true,
					mxUtils.bind(this, function(svg)
				{
					parent.postMessage(JSON.stringify({
						event: 'export', point: this.embedExitPoint,
						exit: (noExit != null) ? !noExit : true,
						data: Editor.createSvgDataUri(svg)
					}), '*');
				}), null, null, true, bg, 1, this.embedExportBorder);
			}

			if (!noExit)
			{
				this.diagramContainer.removeAttribute('data-bounds');
				Editor.inlineFullscreen = false;
				graph.model.clear();
				this.editor.undoManager.clear();
				this.setBackgroundImage(null);
				this.editor.modified = false;

				if (urlParams['embed'] != '1')
				{
					this.fireEvent(new mxEventObject('editInlineStop'));
				}
			}
		}
		catch (e)
		{
			if (!noExit)
			{
				this.handleError(e);
			}
		}
	};
	
	/**
	 * Adds the buttons for embedded mode.
	 */
	EditorUi.prototype.installMessageHandler = function(fn)
	{
		var changeListener = null;
		var ignoreChange = false;
		var autosave = false;
		var lastData = null;
		
		var updateStatus = mxUtils.bind(this, function(sender, eventObject)
		{
			if (!this.editor.modified || urlParams['modified'] == '0')
			{
				this.editor.setStatus('');
			}
			else if (urlParams['modified'] != null)
			{
				this.editor.setStatus(mxUtils.htmlEntities(mxResources.get(urlParams['modified'])));
			}
		});
		
		this.editor.graph.model.addListener(mxEvent.CHANGE, updateStatus);
		
		// Receives XML message from opener and puts it into the graph
		mxEvent.addListener(window, 'message', mxUtils.bind(this, function(evt)
		{
			var validSource = window.opener || window.parent;
			
			if (evt.source != validSource)
			{
				return;
			}
			
			var data = evt.data;
			var afterLoad = null;
			
			var extractDiagramXml = mxUtils.bind(this, function(data)
			{
				if (data != null && typeof data.charAt === 'function' && data.charAt(0) != '<')
				{
					try
					{
						if (Editor.isPngDataUrl(data))
						{
							data = Editor.extractGraphModelFromPng(data);
						}
						else if (data.substring(0, 26) == 'data:image/svg+xml;base64,')
						{
							data = atob(data.substring(26));
						}
						else if (data.substring(0, 24) == 'data:image/svg+xml;utf8,')
						{
							data = data.substring(24);
						}
						
						if (data != null)
						{
							if (data.charAt(0) == '%')
							{
								data = decodeURIComponent(data);
							}
							else if (data.charAt(0) != '<')
							{
								data = Graph.decompress(data);
							}
						}
					}
					catch (e)
					{
						// ignore compression errors and use empty data
					}
				}
				
				return data;
			});

			if (urlParams['proto'] == 'json')
			{
				var convertToSketch = false;
				
				try
				{
					data = JSON.parse(data);

					EditorUi.debug('EditorUi.installMessageHandler',
						[this], 'evt', [evt], 'data', [data]);
				}
				catch (e)
				{
					data = null;
				}
				
				try
				{
					if (data == null)
					{
						// Ignore
						return;
					}
					else if (data.action == 'dialog')
					{
						this.showError((data.titleKey != null) ? mxResources.get(data.titleKey) : data.title,
							(data.messageKey != null) ? mxResources.get(data.messageKey) : data.message,
							(data.buttonKey != null) ? mxResources.get(data.buttonKey) : data.button);
						
						if (data.modified != null)
						{
							this.editor.modified = data.modified;
						}
						
						return;
					}
					else if (data.action == 'layout')
					{
						this.executeLayouts(this.editor.graph.createLayouts(data.layouts));

						return;
					}
					else if (data.action == 'prompt')
					{
						this.spinner.stop();
						
						var dlg = new FilenameDialog(this, data.defaultValue || '',
							(data.okKey != null) ? mxResources.get(data.okKey) : data.ok, function(value)
						{
							if (value != null)
							{
								parent.postMessage(JSON.stringify({event: 'prompt', value: value, message: data}), '*');
							}
							else
							{
								parent.postMessage(JSON.stringify({event: 'prompt-cancel', message: data}), '*');
							}
						}, (data.titleKey != null) ? mxResources.get(data.titleKey) : data.title, 
						null, null, null, null, function()
						{
							parent.postMessage(JSON.stringify({event: 'prompt-cancel', message: data}), '*');
						});
						this.showDialog(dlg.container, 300, 80, true, false);
						dlg.init();
						
						return;
					}
					else if (data.action == 'draft')
					{
						var tmp = extractDiagramXml(data.xml);
						this.spinner.stop();
						
						var dlg = new DraftDialog(this, mxResources.get('draftFound',
								[data.name || this.defaultFilename]),
							tmp, mxUtils.bind(this, function()
						{
							this.hideDialog();
							parent.postMessage(JSON.stringify({event: 'draft',
								result: 'edit', message: data}), '*');
						}), mxUtils.bind(this, function()
						{
							this.hideDialog();
							parent.postMessage(JSON.stringify({event: 'draft',
								result: 'discard', message: data}), '*');
						}), (data.editKey) ? mxResources.get(data.editKey) : null,
							(data.discardKey) ? mxResources.get(data.discardKey) : null,
							(data.ignore) ? mxUtils.bind(this, function()
							{
								this.hideDialog();
								parent.postMessage(JSON.stringify({event: 'draft',
									result: 'ignore', message: data}), '*');
							}) : null);
						this.showDialog(dlg.container, 640, 480, true, false, mxUtils.bind(this, function(cancel)
						{
							if (cancel)
							{
								this.actions.get('exit').funct();
							}
						}));
						
						try
						{
							dlg.init();
						}
						catch (e)
						{
							parent.postMessage(JSON.stringify({event: 'draft',
								error: e.toString(), message: data}), '*');
						}
						
						return;
					}
					else if (data.action == 'template')
					{
						this.spinner.stop();
						
						var enableRecentDocs = data.enableRecent == 1;
						var enableSearchDocs = data.enableSearch == 1;
						var enableCustomTemp = data.enableCustomTemp == 1;
						
						if (urlParams['newTempDlg'] == '1' && !data.templatesOnly && data.callback != null)
						{
							var user = this.getCurrentUser();
							
							var tempDlg = new TemplatesDialog(this, function(xml, filename, itemInfo)
							{
								xml = xml || this.emptyDiagramXml;
								
								parent.postMessage(JSON.stringify({event: 'template', xml: xml,
									blank: xml == this.emptyDiagramXml, name: filename,
									tempUrl: itemInfo.url, libs: itemInfo.libs, 
									builtIn: itemInfo.info != null && itemInfo.info.custContentId != null,
									message: data}), '*');
							}, mxUtils.bind(this, function()
							{
								this.actions.get('exit').funct();
							}), null, null, user != null? user.id : null, 
							enableRecentDocs? mxUtils.bind(this, function(recentReadyCallback, error, username) 
							{
								this.remoteInvoke('getRecentDiagrams', [username], null, recentReadyCallback, error);
							}) : null, enableSearchDocs?  mxUtils.bind(this, function(searchStr, searchReadyCallback, error, username) 
							{
								this.remoteInvoke('searchDiagrams', [searchStr, username], null, searchReadyCallback, error);
							}) : null, mxUtils.bind(this, function(obj, callback, error) 
							{
								this.remoteInvoke('getFileContent', [obj.url], null, callback, error);
							}), null, enableCustomTemp? mxUtils.bind(this, function(customTempCallback) 
							{
								this.remoteInvoke('getCustomTemplates', null, null, customTempCallback, function()
								{
									customTempCallback({}, 0); //ignore error by sending empty templates
								});
							}) : null, false, false, true, true);
							
							this.showDialog(tempDlg.container, window.innerWidth, window.innerHeight, true, false, null, false, true);

							return;
						}
						
						var dlg = new NewDialog(this, false, data.templatesOnly? false : data.callback != null,
							mxUtils.bind(this, function(xml, name, url, libs)
						{
							xml = xml || this.emptyDiagramXml;
							
							// LATER: Add autosave option in template message
							if (data.callback != null)
							{
								parent.postMessage(JSON.stringify({event: 'template', xml: xml,
									blank: xml == this.emptyDiagramXml, name: name,
									tempUrl: url, libs: libs, builtIn: true,
									message: data}), '*');
							}
							else
							{
								fn(xml, evt, xml != this.emptyDiagramXml, data.toSketch);
								
								// Workaround for status updated before modified applied
								if (!this.editor.modified)
								{
									this.editor.setStatus('');
								}
							}
						}), null, null, null, null, null, null, null, 
						enableRecentDocs? mxUtils.bind(this, function(recentReadyCallback) 
						{
							this.remoteInvoke('getRecentDiagrams', [null], null, recentReadyCallback, function()
							{
								recentReadyCallback(null, 'Network Error!');
							});
						}) : null, 
						enableSearchDocs?  mxUtils.bind(this, function(searchStr, searchReadyCallback) 
						{
							this.remoteInvoke('searchDiagrams', [searchStr, null], null, searchReadyCallback, function()
							{
								searchReadyCallback(null, 'Network Error!');
							});
						}) : null, 
						mxUtils.bind(this, function(url, info, name) 
						{
							//If binary files are possible, we can get the file content using remote invokation, imported it, and send final mxFile back
							parent.postMessage(JSON.stringify({event: 'template', docUrl: url, info: info,
								name: name}), '*');
						}), null, null,
						enableCustomTemp? mxUtils.bind(this, function(customTempCallback) 
						{
							this.remoteInvoke('getCustomTemplates', null, null, customTempCallback, function()
							{
								customTempCallback({}, 0); //ignore error by sending empty templates
							});
						}) : null, data.withoutType == 1);
	
						this.showDialog(dlg.container, 620, 460, true, false, mxUtils.bind(this, function(cancel)
						{
							this.sidebar.hideTooltip();
							
							if (cancel)
							{
								this.actions.get('exit').funct();
							}
						}));
						dlg.init();
						
						return;
					}
					else if (data.action == 'textContent')
					{
						//TODO Remove this message and use remote invokation instead
						var allPagesTxt = this.getDiagramTextContent();
						parent.postMessage(JSON.stringify({event: 'textContent',
							data: allPagesTxt, message: data}), '*');
						return;
					}
					else if (data.action == 'status')
					{
						if (data.messageKey != null)
						{
							this.editor.setStatus(mxUtils.htmlEntities(mxResources.get(data.messageKey)));
						}
						else if (data.message != null)
						{
							this.editor.setStatus(mxUtils.htmlEntities(data.message));
						}
						
						if (data.modified != null)
						{
							this.editor.modified = data.modified;
						}
						
						return;
					}
					else if (data.action == 'spinner')
					{
						var msg = (data.messageKey != null) ? mxResources.get(data.messageKey) : data.message;
						
						if (data.show != null && !data.show)
						{
							this.spinner.stop();
						}
						else
						{
							this.spinner.spin(document.body, msg)
						}
	
						return;
					}
					else if (data.action == 'exit')
					{
						this.actions.get('exit').funct();

						return;
					}
					else if (data.action == 'viewport')
					{
						if (data.viewport != null)
						{
							this.embedViewport = data.viewport;
							this.editor.graph.refresh();
							this.fireEvent(new mxEventObject('embedViewportChanged'));
						}

						return;
					}
					else if (data.action == 'fullscreenChanged')
					{
						var scrollState = null;

						try
						{
							var temp = this.diagramContainer.getAttribute('data-scrollState');

							if (temp != null) 
							{
								this.diagramContainer.removeAttribute('data-scrollState');
								scrollState = JSON.parse(temp);
							}
						}
						catch (e)
						{
							// ignore
						}

						Editor.inlineFullscreen = data.value;
						this.fireEvent(new mxEventObject('inlineFullscreenChanged'));

						if (scrollState != null)
						{
							this.restoreScrollState(scrollState);
						}

						return;
					}
					else if (data.action == 'snapshot')
					{
						this.sendEmbeddedSvgExport(true);

						return;
					}
					else if (data.action == 'export')
					{
						if (data.format == 'png' || data.format == 'xmlpng')
						{
							if ((data.spin == null && data.spinKey == null) || this.spinner.spin(document.body,
								(data.spinKey != null) ? mxResources.get(data.spinKey) : data.spin))
							{
								var xml = (data.xml != null) ? data.xml : this.getFileData(true);
								this.editor.graph.setEnabled(false);
								var graph = this.editor.graph;
								
								var postDataBack = mxUtils.bind(this, function(uri)
								{
									this.editor.graph.setEnabled(true);
									this.spinner.stop();
									
									var msg = this.createLoadMessage('export');
									msg.format = data.format;
									msg.message = data;
									msg.data = uri;
									msg.xml = xml;
									parent.postMessage(JSON.stringify(msg), '*');
								});
								
								var processUri = mxUtils.bind(this, function(uri)
								{
									if (uri == null)
									{
										uri = Editor.blankImage;
									}
									
							   	    if (data.format == 'xmlpng')
							   	    {
							   	    	uri = Editor.writeGraphModelToPng(uri, 'tEXt', 'mxfile',
							   	    		encodeURIComponent(xml));
							   	    }
							   	    	
									// Removes temporary graph from DOM
							   	    if (graph != this.editor.graph)
									{
										graph.container.parentNode.removeChild(graph.container);
									}
					   	   	    	
							   	    postDataBack(uri);
								});
						
								var pageId = data.pageId || (this.pages != null? ((data.currentPage) ?
									this.currentPage.getId() : this.pages[0].getId()) : null);
								
								if (this.isExportToCanvas())
								{
									var graphReady = mxUtils.bind(this, function()
									{
										// Exports PNG for first/specific page while other page is visible by creating a graph
										// LATER: Add caching for the graph or SVG while not on first page
										if (this.pages != null && this.currentPage.getId() != pageId)
										{
											var graphGetGlobalVariable = graph.getGlobalVariable;
											graph = this.createTemporaryGraph(graph.getStylesheet());
											var page;
											
											for (var i = 0; i < this.pages.length; i++)
											{
												if (this.pages[i].getId() == pageId)
												{
													page = this.updatePageRoot(this.pages[i]);
													break;
												}
											}
											
											//If pageId info is incorrect
											if (page == null)
											{
												page = this.currentPage; 
											}
									
											graph.getGlobalVariable = function(name)
											{
												if (name == 'page')
												{
													return page.getName();
												}
												else if (name == 'pagenumber')
												{
													return 1;
												}
												
												return graphGetGlobalVariable.apply(this, arguments);
											};
									
											document.body.appendChild(graph.container);
											graph.model.setRoot(page.root);
										}
		
										// Set visible layers based on message setting
										if (data.layerIds != null)
										{
											var graphModel = graph.model;
											var layers = graphModel.getChildCells(graphModel.getRoot());
											var layerIdsMap = {};
											
											for (var i = 0; i < data.layerIds.length; i++)
											{
												layerIdsMap[data.layerIds[i]] = true;
											}
		
											for (var i = 0; i < layers.length; i++)
											{
												graphModel.setVisible(layers[i], layerIdsMap[layers[i].id] || false);
											}
										}

										var theme = null;

										if (data.keepTheme)
										{
											theme = (Editor.cssDarkMode || Editor.isDarkMode()) ? 'dark' : 'light'
										}

										this.editor.exportToCanvas(mxUtils.bind(this, function(canvas)
										{
											processUri(canvas.toDataURL('image/png'));
										}), data.width, null, data.background, mxUtils.bind(this, function()
										{
											processUri(null);
										}), null, null, data.scale, data.transparent, data.shadow,
											null, graph, data.border, null, data.grid, theme);
									});

									// Uses optional XML from incoming message
									if (data.xml != null && data.xml.length > 0)
									{
										ignoreChange = true;
										this.setFileData(xml);
										ignoreChange = false;
									}

									graphReady();
								}
								else
								{
									// Data from server is base64 encoded to avoid binary XHR
									// Double encoding for XML arg is needed for UTF8 encoding
							       	var req = new mxXmlRequest(EXPORT_URL, 'format=png&embedXml=' +
							       		((data.format == 'xmlpng') ? '1' : '0') + 
							       		(pageId != null? '&pageId=' + pageId : '') +
							       		(data.layerIds != null && data.layerIds.length > 0?
										'&extras=' + encodeURIComponent(JSON.stringify({layerIds: data.layerIds})) : '') +
							       		(data.scale != null? '&scale=' + data.scale : '') +'&base64=1&xml=' +
							       		encodeURIComponent(xml));
	
									req.send(mxUtils.bind(this, function(req)
									{
										// Temp graph was never created at this point so we can
										// skip processUri since it already contains the XML
										if (req.getStatus() >= 200 && req.getStatus() <= 299)
										{
											postDataBack('data:image/png;base64,' + req.getText());
										}
										else
										{
											processUri(null);
										}
									}), mxUtils.bind(this, function()
									{
										processUri(null);
									}));
								}
							}
						}
						else
						{
							var graphReady = mxUtils.bind(this, function()
							{
								var msg = this.createLoadMessage('export');
								
								// Attaches incoming message
								msg.message = data;
								
								// Forces new HTML format if pages exists
								if (data.format == 'html2' || (data.format == 'html' && (urlParams['pages'] != '0' ||
									(this.pages != null && this.pages.length > 1))))
								{
									var node = this.getXmlFileData();
									msg.xml = mxUtils.getXml(node);
									msg.data = this.getFileData(null, null, true, null, null, null, node);
									msg.format = data.format;
								}
								else if (data.format == 'html')
								{
									var xml = this.editor.getGraphXml();
									msg.data = this.getHtml(xml, this.editor.graph);
									msg.xml = mxUtils.getXml(xml);
									msg.format = data.format;
								}
								else
								{
									// Creates a preview with no alt text for unsupported browsers
									mxSvgCanvas2D.prototype.foAltText = null;
									
									var bg = (data.background != null) ? data.background : this.editor.graph.background;
									
									if (bg == mxConstants.NONE)
									{
										bg = null;
									}
		
									msg.xml = this.getFileData(true, null, null, null, null,
										null, null, null, null, false);
									msg.format = 'svg';
									
									var postResult = mxUtils.bind(this, function(svg)
									{
										this.editor.graph.setEnabled(true);
										this.spinner.stop();
									
										msg.data = Editor.createSvgDataUri(svg);
										parent.postMessage(JSON.stringify(msg), '*');
									});

									var theme = null;

									if (data.keepTheme)
									{
										theme = (Editor.cssDarkMode || Editor.isDarkMode()) ? 'dark' : 'light'
									}
									
									if (data.format == 'xmlsvg')
									{
										if ((data.spin == null && data.spinKey == null) || this.spinner.spin(document.body,
											(data.spinKey != null) ? mxResources.get(data.spinKey) : data.spin))
										{
											this.getEmbeddedSvg(msg.xml, this.editor.graph, null, true, postResult, null, null,
												data.embedImages, bg, data.scale, data.border, data.shadow, theme);
										}
									}
									else
									{
										if ((data.spin == null && data.spinKey == null) || this.spinner.spin(document.body,
											(data.spinKey != null) ? mxResources.get(data.spinKey) : data.spin))
										{
											this.editor.graph.setEnabled(false);
											var svgRoot = this.editor.graph.getSvg(bg, data.scale, data.border, null, null,
												null, null, null, null, this.editor.graph.shadowVisible || data.shadow,
												null, theme);
											
											if (this.editor.graph.shadowVisible || data.shadow)
											{
												this.editor.graph.addSvgShadow(svgRoot);
											}

											this.embedFonts(svgRoot, mxUtils.bind(this, function(svgRoot)
											{
												if (data.embedImages || data.embedImages == null)
												{
													this.editor.convertImages(svgRoot, mxUtils.bind(this, function(svgRoot)
													{
														postResult(mxUtils.getXml(svgRoot));
													}));
												}
												else
												{
													postResult(mxUtils.getXml(svgRoot));
												}
											}));
										}
									}
									
									return;
								}
		
								parent.postMessage(JSON.stringify(msg), '*');
							});

							// SVG is generated from graph so parse optional XML
							if (data.xml != null && data.xml.length > 0)
							{
								if (this.editor.graph.mathEnabled)
								{
									// Waits for MathJax autoloading and rendering
									var editorOnMathJaxDone = Editor.onMathJaxDone;

									Editor.onMathJaxDone = function()
									{
										editorOnMathJaxDone.apply(this, arguments);
										graphReady();
									};
								}

								ignoreChange = true;
								this.setFileData(data.xml);
								ignoreChange = false;

								if (!this.editor.graph.mathEnabled)
								{
									graphReady();
								}
							}
							else
							{
								graphReady();
							}
						}

						return;
					}
					else if (data.action == 'load')
					{
						convertToSketch = data.toSketch;
						autosave = data.autosave == 1;
						this.hideDialog();
						
						if (data.modified != null && urlParams['modified'] == null)
						{
							urlParams['modified'] = data.modified;
						}
						
						if (data.saveAndExit != null && urlParams['saveAndExit'] == null)
						{
							urlParams['saveAndExit'] = data.saveAndExit;
						}
						
						if (data.noSaveBtn != null && urlParams['noSaveBtn'] == null)
						{
							urlParams['noSaveBtn'] = data.noSaveBtn;
						}

						if (data.rough != null)
						{
							var initial = Editor.sketchMode; 
							this.doSetSketchMode(data.rough);

							if (initial != Editor.sketchMode)
							{
								this.fireEvent(new mxEventObject('sketchModeChanged'));
							}
						}

						if (data.dark != null)
						{
							this.setDarkMode(data.dark);
						}
						
						if (data.border != null)
						{
							this.embedExportBorder = data.border;
						}

						if (data.background != null)
						{
							this.embedExportBackground = data.background;
						}

						if (data.viewport != null)
						{
							this.embedViewport = data.viewport;
						}

						this.embedExitPoint = null;

						if (data.rect != null)
						{
							var border = this.embedExportBorder;
							this.diagramContainer.style.left = Math.max(60, data.rect.left) + 'px';
							this.diagramContainer.style.top = Math.max(40, data.rect.top) + 'px';

							// Inline min width and height
							this.minInlineWidth = data.minWidth;
							this.minInlineHeight = data.minHeight;

							this.diagramContainer.style.border = '2px solid #295fcc';
							this.diagramContainer.style.bottom = '';
							this.diagramContainer.style.right = '';
							
							// Data is extracted diagram in async code
							var maxFitScale = data.maxFitScale;
							var w = data.rect.width + 2 * border;
							var h0 = data.rect.height + 2 * border;

							afterLoad = mxUtils.bind(this, function()
							{
								var ds = mxUtils.getDocumentSize();
								w = Math.min((this.minInlineWidth != null) ? Math.max(
									this.minInlineWidth, w) : w, ds.width - 80);
								var h = Math.min((this.minInlineHeight != null) ? Math.max(
									this.minInlineHeight, h0) : h0, ds.height - 80);
								
								this.diagramContainer.style.width = w + 'px';
								this.diagramContainer.style.height = h + 'px';
								
								var graph = this.editor.graph;
								var prev = graph.maxFitScale;
								graph.maxFitScale = maxFitScale;
								
								graph.fit(2 * border, null, null, null, null, null, h0);
								this.setPageVisible(false);

								if (this.minInlineWidth != null &&
									graph.getGraphBounds().width < this.minInlineWidth)
								{
									var dy = graph.container.scrollTop;
									this.resetScrollbars();
									graph.container.scrollTop = dy;
								}
								
								graph.maxFitScale = prev;
								graph.container.scrollTop -= border;
								graph.container.scrollLeft -= border;

								window.setTimeout(mxUtils.bind(this, function()
								{
									this.fireEvent(new mxEventObject('editInlineStart', 'data', [data]));
									graph.container.focus();
									
									// Moves format window to top of graph
									if (this.formatWindow != null &&
										this.formatWindow.window != null &&
										this.formatWindow.window.isVisible())
									{
										this.formatWindow.window.div.style.top =
											graph.container.style.top;
									}

									// Centers horizontally
									var bounds = graph.getGraphBounds();

									if (graph.container.clientWidth > bounds.width + 2 * border)
									{
										graph.container.scrollLeft = bounds.x + ((bounds.width +
											border) - graph.container.clientWidth) / 2;
									}
								}), 10);
							});
						}
						
						if (data.noExitBtn != null && urlParams['noExitBtn'] == null)
						{
							urlParams['noExitBtn'] = data.noExitBtn;
						}
						
						if (data.title != null && this.buttonContainer != null)
						{
							var tmp = this.createStatusDiv('');
							mxUtils.write(tmp, data.title);

							if (this.embedFilenameSpan != null)
							{
								this.embedFilenameSpan.parentNode.removeChild(this.embedFilenameSpan);
							}
	
							this.buttonContainer.appendChild(tmp);
							this.embedFilenameSpan = tmp;
						}
						
						try
						{
							if (data.libs)
							{
								this.sidebar.showEntries(data.libs);
							}
						}
						catch(e){}

						if (data.xmlpng != null)
						{
							data = this.extractGraphModelFromPng(data.xmlpng);
						}
						else if (data.descriptor != null)
						{
							data = data.descriptor;
						}
						else
						{
							data = data.xml;
						}						
					}
					else if (data.action == 'merge')
					{
						var file = this.getCurrentFile();
						
						if (file != null)
						{
							var tmp = extractDiagramXml(data.xml);

							if (tmp != null && tmp != '')
							{
								file.mergeFile(new LocalFile(this, tmp), function()
								{
									parent.postMessage(JSON.stringify({event: 'merge', message: data}), '*');
								}, function(err)
								{
									parent.postMessage(JSON.stringify({event: 'merge', message: data, error: err}), '*');
								});
							}
						}
						
						return;
					}
					else if (data.action == 'remoteInvokeReady') 
					{
						this.handleRemoteInvokeReady(parent);
						return;
					}
					else if (data.action == 'remoteInvoke') 
					{
						this.handleRemoteInvoke(data, evt.origin);
						return;
					}
					else if (data.action == 'remoteInvokeResponse')
					{
						this.handleRemoteInvokeResponse(data);
						return;
					}
					else
					{
						// Unknown message must stop execution
						parent.postMessage(JSON.stringify({error: 'unknownMessage', data: JSON.stringify(data)}), '*');
						
						return;
					}
				}
				catch (e)
				{
					// TODO: Block handling of more messages when in error state
					this.handleError(e);
				}
			}
						
			var getData = mxUtils.bind(this, function()
			{
				return (urlParams['pages'] != '0' || (this.pages != null && this.pages.length > 1)) ?
					this.getFileData(true): mxUtils.getXml(this.editor.getGraphXml());
			});
			
			var doLoad = mxUtils.bind(this, function(data, evt)
			{
				ignoreChange = true;
				try
				{
					fn(data, evt, null, convertToSketch);
				}
				catch (e)
				{
					this.handleError(e);
				}
				ignoreChange = false;
				
				if (urlParams['modified'] != null)
				{
					this.editor.setStatus('');
				}

				lastData = getData();

				if (autosave && changeListener == null)
				{
					changeListener = mxUtils.bind(this, function(sender, eventObject)
					{
						var data = getData();
						
						if (data != lastData && !ignoreChange)
						{
							var msg = this.createLoadMessage('autosave');
							msg.xml = data;
							var parent = window.opener || window.parent;
							parent.postMessage(JSON.stringify(msg), '*');
						}
						
						lastData = data;
					});
					
					this.editor.graph.model.addListener(mxEvent.CHANGE, changeListener);

					// Some options trigger autosave
					this.editor.graph.addListener('gridSizeChanged', changeListener);
					this.editor.graph.addListener('shadowVisibleChanged', changeListener);
					this.addListener('pageFormatChanged', changeListener);
					this.addListener('pageScaleChanged', changeListener);
					this.addListener('backgroundColorChanged', changeListener);
					this.addListener('backgroundImageChanged', changeListener);
					this.addListener('foldingEnabledChanged', changeListener);
					this.addListener('mathEnabledChanged', changeListener);
					this.addListener('gridEnabledChanged', changeListener);
					this.addListener('guidesEnabledChanged', changeListener);
					this.addListener('pageViewChanged', changeListener);
				}
				
				// Sends the bounds of the graph to the host after parsing
				if (urlParams['returnbounds'] == '1' || urlParams['proto'] == 'json')
				{
					var resp = this.createLoadMessage('load');
					
					// Attaches XML to response
					resp.xml = data;
					
					parent.postMessage(JSON.stringify(resp), '*');
				}

				if (afterLoad != null)
				{
					afterLoad();
				}
			});
			
			if (data != null && typeof data.substring === 'function' && data.substring(0, 34) == 'data:application/vnd.visio;base64,')
			{
				// Checks VND binary magic number in base64
				var filename = (data.substring(34, 45) == '0M8R4KGxGuE') ? 'raw.vsd' : 'raw.vsdx';
				
				this.importVisio(this.base64ToBlob(data.substring(data.indexOf(',') + 1)), function(xml)
				{
					doLoad(xml, evt);
				}, mxUtils.bind(this, function(e)
				{
					this.handleError(e);
				}), filename);
			}
			else if (data != null && typeof data.substring === 'function' && new XMLHttpRequest().upload && this.isRemoteFileFormat(data, ''))
			{
				if (this.isOffline())
				{
					this.showError(mxResources.get('error'), mxResources.get('notInOffline'));
				}
				else
				{
					// Asynchronous parsing via server
					this.parseFileData(data, mxUtils.bind(this, function(xhr)
					{
						if (xhr.readyState == 4)
						{
							if (xhr.status >= 200 && xhr.status <= 299 &&
								xhr.responseText.substring(0, 13) == '<mxGraphModel')
							{
								doLoad(xhr.responseText, evt);
							}
							else
							{
								this.handleError({message: xhr.status == 413? mxResources.get('diagramTooLarge') : 
										mxResources.get('unknownError')});
							}
						}
					}), '');
				}
			}
			else if (data != null && typeof data.substring === 'function' && this.isLucidChartData(data))
			{
				this.convertLucidChart(data, mxUtils.bind(this, function(xml)
				{
					doLoad(xml);
				}), mxUtils.bind(this, function(e)
				{
					this.handleError(e);
				}));
			}
			else if (data != null && typeof data === 'object' && data.format != null && (data.data != null || data.url != null))
			{
				this.loadDescriptor(data, mxUtils.bind(this, function(e)
				{
					doLoad(getData(), evt);
				}), mxUtils.bind(this, function(e)
				{
					this.handleError(e, mxResources.get('errorLoadingFile'));
				}));
			}
			else
			{
				data = extractDiagramXml(data);
				doLoad(data, evt);
			}
		}));
		
		// Requests data from the sender. This is a workaround for not allowing
		// the opener to listen for the onload event if not in the same origin.
		var parent = window.opener || window.parent;
		var msg = (urlParams['proto'] == 'json') ? JSON.stringify({event: 'init'}) : (urlParams['ready'] || 'ready');
		parent.postMessage(msg, '*');
		
		// Adds JSON event for opening links
		if (urlParams['proto'] == 'json')
		{
			var graphOpenLink = this.editor.graph.openLink;
			
			this.editor.graph.openLink = function(href, target, allowOpener)
			{
				graphOpenLink.apply(this, arguments);
				
				parent.postMessage(JSON.stringify({event: 'openLink', href: href, target: target, allowOpener: allowOpener}), '*');
			};
		}
	};
	
	/**
	 * Adds the buttons for embedded mode.
	 */
	EditorUi.prototype.createEmbedButton = function(title, fn, shortcut, primary)
	{
		var modern = (Editor.currentTheme == 'simple' ||
			Editor.currentTheme == 'sketch' ||
			Editor.currentTheme == 'min');
		var btn = document.createElement('button');
		btn.setAttribute('title', title + ((shortcut != null) ?
			' (' + shortcut + ')' : ''));
		btn.style.marginLeft = '6px';
		mxUtils.write(btn, title);

		if (modern)
		{
			btn.className = ((primary) ? 'gePrimaryBtn' : '');
			btn.style.marginLeft = '8px';
			btn.style.padding = '6px';
		}
		else
		{
			btn.className = 'geBigButton' + ((!primary) ?
				' geBigStandardButton' : '');
		}

		mxEvent.addListener(btn, 'click', fn);

		return btn;
	};

	/**
	 * Adds the buttons for embedded mode.
	 */
	EditorUi.prototype.addEmbedButtons = function()
	{
		var div = document.createElement('div');
		div.style.display = 'inline-flex';
		div.style.alignItems = 'center';
		div.style.marginLeft = 'auto';

		if (Editor.currentTheme != 'simple' &&
			Editor.currentTheme != 'sketch'	&&
			Editor.currentTheme != 'min')
		{
			div.style.marginRight = '66px';
			div.style['float'] = 'right';

			if (Editor.currentTheme == 'atlas')
			{
				div.style.marginTop = '2px';
			}
		}

		var button = document.createElement('button');
		button.className = 'geBigButton';

		if (urlParams['noSaveBtn'] == '1')
		{
			if (urlParams['saveAndExit'] != '0')
			{
				div.appendChild(this.createEmbedButton(urlParams['publishClose'] == '1' ?
					mxResources.get('publish') : mxResources.get('saveAndExit'),
					this.actions.get('saveAndExit').funct, null, true));
			}
		}
		else
		{
			div.appendChild(this.createEmbedButton(mxResources.get('save'), mxUtils.bind(this, function()
			{
				this.actions.get('save').funct(false);
			}), Editor.ctrlKey + '+S', true));
			
			if (urlParams['saveAndExit'] == '1')
			{
				div.appendChild(this.createEmbedButton(mxResources.get('saveAndExit'),
					this.actions.get('saveAndExit').funct));
			}
		}

		if (urlParams['noExitBtn'] != '1')
		{
			div.appendChild(this.createEmbedButton(urlParams['publishClose'] == '1' ?
				mxResources.get('close') : mxResources.get('exit'),
				this.actions.get('exit').funct));
		}

		if ((Editor.currentTheme == 'simple' ||
			Editor.currentTheme == 'sketch' ||
			Editor.currentTheme == 'min') &&
			this.buttonContainer != null)
		{
			this.buttonContainer.appendChild(div);
			this.editor.fireEvent(new mxEventObject('statusChanged'));
		}
		else if (this.menubar != null)
		{
			this.toolbar.container.appendChild(div);
			this.toolbar.staticElements.push(div);
		}
	};

	/**
	 * 
	 */
	EditorUi.prototype.showImportCsvDialog = function()
	{
		if (this.importCsvDialog == null)
		{
			this.importCsvDialog = new TextareaDialog(this, mxResources.get('csv') + ':',
    			Editor.defaultCsvValue, mxUtils.bind(this, function(newValue)
			{
    			this.importCsv(newValue);
			}), null, null, 620, 430, null, true, true, mxResources.get('import'),
				!this.isOffline() ? 'https://drawio-app.com/import-from-csv-to-drawio/' : null);
		}
		
		this.showDialog(this.importCsvDialog.container, 640, 520, true, true, null, null, null, null, true);
		this.importCsvDialog.init();
	};
		
	/**
	 * Loads orgchart layouts and executes the given function.
	 */
	EditorUi.prototype.showCustomLayoutDialog = function(value)
	{
		this.loadOrgChartLayouts(mxUtils.bind(this, function()
		{
			var dlg = new TextareaDialog(this, mxResources.get('layout'),
				value, mxUtils.bind(this, function(newValue)
			{
				if (newValue.length > 0)
				{
					try
					{
						var list = JSON.parse(newValue);
						this.executeLayouts(this.editor.graph.createLayouts(list));
						this.customLayoutConfig = list;
						this.hideDialog();
					}
					catch (e)
					{
						this.handleError(e);
					}
				}
			}), null, null, null, null, mxUtils.bind(this, function(buttons, input)
			{
				var copyBtn = mxUtils.button(mxResources.get('copy'), mxUtils.bind(this, function()
				{
					try
					{
						var orig = input.value;
						input.value = JSON.stringify(JSON.parse(orig));
						input.focus();
						
						if (mxClient.IS_GC || mxClient.IS_FF || document.documentMode >= 5)
						{
							input.select();
						}
						else
						{
							document.execCommand('selectAll', false, null);
						}
						
						document.execCommand('copy');
						this.alert(mxResources.get('copiedToClipboard'));

						input.value = orig;
					}
					catch (e)
					{
						this.handleError(e);
					}
				}));

				copyBtn.setAttribute('title', 'copy');
				copyBtn.className = 'geBtn';
				buttons.appendChild(copyBtn);
			}), true, null, null, 'https://www.drawio.com/doc/faq/apply-layouts');

			this.showDialog(dlg.container, 620, 460, true, true);
			dlg.init();
		}));
	};

	/**
	 * Loads orgchart layouts and executes the given function.
	 */
	EditorUi.prototype.loadOrgChartLayouts = function(fn)
	{
		this.createTimeout(null, mxUtils.bind(this, function(timeout)
		{
			var onload = mxUtils.bind(this, function()
			{
				this.loadingOrgChart = false;

				if (timeout.clear())
				{
					Graph.layoutNames.push('mxOrgChartLayout');
					this.spinner.stop();
					fn();
				}
			});

			var onerror = mxUtils.bind(this, function(e)
			{
				this.loadingOrgChart = false;

				if (timeout.clear())
				{
					this.handleError(e);
				}
			});

			if (typeof mxOrgChartLayout === 'undefined' && !this.loadingOrgChart && !this.isOffline(true))
			{
				if (this.spinner.spin(document.body, mxResources.get('loading')))
				{
					this.loadingOrgChart = true;

					if (urlParams['dev'] == '1')
					{
						mxscript('js/orgchart/bridge.min.js', function()
						{
							mxscript('js/orgchart/bridge.collections.min.js', function()
							{
								mxscript('js/orgchart/OrgChart.Layout.min.js', function()
								{
									mxscript('js/orgchart/mxOrgChartLayout.js',
										onload, null, null, null, onerror);											
								}, null, null, null, onerror);		
							}, null, null, null, onerror);	
						}, null, null, null, onerror);
					}
					else
					{
						mxscript(DRAWIO_BASE_URL + '/js/orgchart.min.js',
							onload, null, null, null, onerror);
					}
				}
			}
			else
			{
				onload();
			}
		}), onerror);
	};
	
	/**
	 *
	 */
	EditorUi.prototype.importCsv = function(text, done)
	{
		this.loadOrgChartLayouts(mxUtils.bind(this, function()
		{
			this.doImportCsv(text, done);
		}));
	};

	/**
	 *
	 */
	EditorUi.prototype.doImportCsv = function(text, done)
	{
		try
		{
    		var lines = text.split('\n');
    		var allCells = [];
			var parents = [];
    		var cells = [];
    		var dups = {};
    		
    		if (lines.length > 0)
    		{
        		// Internal lookup table
        		var lookups = {};
        		
        		// Default values
        		var graph = this.editor.graph;
        		var vars = null;
        		var style = null;
        		var styles = null;
        		var stylename = null;
        		var labelname = null;
				var unknownStyle = null;
        		var labels = null;
        		var parentstyle = 'whiteSpace=wrap;html=1;';
        		var identity = null;
        		var parent = null;
        		var namespace = '';
        		var width = 'auto';
        		var height = 'auto';
				var collapsed = false;
        		var left = null;
        		var top = null;
        		var edgespacing = 40;
        		var nodespacing = 40;
        		var levelspacing = 100;
        		var padding = 0;

				// Delayed after optional layout
    			var afterInsert = mxUtils.bind(this, function()
    			{
    				if (done != null)
    				{
    					done(select);
    				}
    				else
    				{
    					graph.setSelectionCells(select);
    					graph.scrollCellToVisible(graph.getSelectionCell());
    				}
					
					if (this.chromelessResize != null)
					{
						window.setTimeout(mxUtils.bind(this, function()
						{
							this.chromelessResize(true);
						}), 0);
					}
    			});
    				
    			// Computes unscaled, untranslated graph bounds
    			var pt = graph.getFreeInsertPoint();
				var x0 = pt.x;
				var y0 = pt.y;
				var y = y0;

    			// Default label value depends on column names
        		var label = null;
        		
    			// Default layout to run.
        		var layout = 'auto';
        		
        		// Name of the attribute that contains the parent reference
        		var parent = null;
        		
        		// Name of the attribute that contains the references for creating edges
        		var edges = [];

        		// Name of the column for hyperlinks
        		var link = null;
        		
        		// String array of names to remove from metadata
        		var ignore = null;
        		
        		// Read processing instructions first
        		var index = 0;
        		
        		while (index < lines.length && lines[index].charAt(0) == '#')
        		{
        			var text = lines[index].replace(/\r$/,''); // Remove trailing \r if the file uses \r\n line breaks
        			index++;
        			
        			while (index < lines.length && text.charAt(text.length - 1) == '\\' &&
        				lines[index].charAt(0) == '#')
        			{
        				text = text.substring(0, text.length - 1) + mxUtils.trim(lines[index].substring(1));
        				index++;
        			}
        			
        			if (text.charAt(1) != '#')
        			{
	    				// Processing instruction
	    				var idx = text.indexOf(':');
	    				
	    				if (idx > 0)
	    				{
		    				var key = mxUtils.trim(text.substring(1, idx));
		    				var value = mxUtils.trim(text.substring(idx + 1));
	
		    				if (key == 'label')
		    				{
		    					label = Graph.sanitizeHtml(value);
		    				}
		    				else if (key == 'labelname' && value.length > 0 && value != '-')
		    				{
		    					labelname = value;
		    				}
		    				else if (key == 'labels' && value.length > 0 && value != '-')
		    				{
		    					labels = JSON.parse(value);
		    				}
		    				else if (key == 'style')
		    				{
		    					style = value;
		    				}
		    				else if (key == 'parentstyle')
		    				{
		    					parentstyle = value;
		    				}
							else if (key == 'unknownStyle' && value != '-')
		    				{
		    					unknownStyle = value;
		    				}
		    				else if (key == 'stylename' && value.length > 0 && value != '-')
		    				{
		    					stylename = value;
		    				}
		    				else if (key == 'styles' && value.length > 0 && value != '-')
		    				{
		    					styles = JSON.parse(value);
		    				}
		    				else if (key == 'vars' && value.length > 0 && value != '-')
		    				{
		    					vars = JSON.parse(value);
		    				}
		    				else if (key == 'identity' && value.length > 0 && value != '-')
		    				{
		    					identity = value;
		    				}
		    				else if (key == 'parent' && value.length > 0 && value != '-')
		    				{
		    					parent = value;
		    				}
		    				else if (key == 'namespace' && value.length > 0 && value != '-')
		    				{
		    					namespace = value;
		    				}
		    				else if (key == 'width')
		    				{
		    					width = value;
		    				}
		    				else if (key == 'height')
		    				{
		    					height = value;
		    				}
							else if (key == 'collapsed' && value != '-')
		    				{
		    					collapsed = value == 'true';
		    				}
		    				else if (key == 'left' && value.length > 0)
		    				{
		    					left = value;
		    				}
		    				else if (key == 'top' && value.length > 0)
		    				{
		    					top = value;
		    				}
		    				else if (key == 'ignore')
		    				{
		    					ignore = value.split(',');
		    				}
		    				else if (key == 'connect')
		    				{
		    					edges.push(JSON.parse(value));
		    				}
		    				else if (key == 'link')
		    				{
		    					link = value;
		    				}
		    				else if (key == 'padding')
		    				{
		    					padding = parseFloat(value);
		    				}
		    				else if (key == 'edgespacing')
		    				{
		    					edgespacing = parseFloat(value);
		    				}
		    				else if (key == 'nodespacing')
		    				{
		    					nodespacing = parseFloat(value);
		    				}
		    				else if (key == 'levelspacing')
		    				{
		    					levelspacing = parseFloat(value);
		    				}
		    				else if (key == 'layout')
		    				{
		    					layout = value;
		    				}
	    				}
        			}
        		}
        		
        		if (lines[index] == null)
        		{
        			throw new Error(mxResources.get('invalidOrMissingFile'));
        		}
        		
    			// Converts identity and parent to index and validates XML attribute names
    			var keys = this.editor.csvToArray(lines[index].replace(/\r$/,''));
        		var identityIndex = null;
    			var parentIndex = null;
    			var attribs = [];
    			
				for (var i = 0; i < keys.length; i++)
	    		{
					if (identity == keys[i])
					{
						identityIndex = i;
					}
					
					if (parent == keys[i])
					{
						parentIndex = i;
					}
					
					attribs.push(mxUtils.trim(keys[i]).replace(/[^a-z0-9]+/ig, '_').
						replace(/^\d+/, '').replace(/_+$/, ''));
	    		}
				
    			if (label == null)
    			{
    				label = '%' + attribs[0] + '%';
    			}
    			
    			if (edges != null)
				{
					for (var e = 0; e < edges.length; e++)
					{
						if (lookups[edges[e].to] == null)
						{
							lookups[edges[e].to] = {};
						}
					}
				}
    			
    			// Parse and validate input
    			var arrays = [];
    			
    			for (var i = index + 1; i < lines.length; i++)
	    		{
	    			var values = this.editor.csvToArray(lines[i].replace(/\r$/,''));
	    			
	    			if (values == null)
	    			{
	    				var short = (lines[i].length > 40) ? lines[i].substring(0, 40) + '...' : lines[i];
	    				
	    				throw new Error(short + ' (' + i + '):\n' + mxResources.get('containsValidationErrors'));
	    			}
	    			else if (values.length > 0)
		    		{
	    				arrays.push(values);
	    			}
	    		}
    			
        		graph.model.beginUpdate();
        		try
        		{
	    			for (var i = 0; i < arrays.length; i++)
		    		{
    	    			var values = arrays[i];
    					var cell = null;
    					var id = (identityIndex != null) ? namespace + values[identityIndex] : null;
						var ignoreCell = false;
    					
    					if (id != null)
    					{
    						cell = graph.model.getCell(id);

							// Bypasses update of cells inserted during this run
							ignoreCell = cell == null || mxUtils.indexOf(
								allCells, cell) >= 0;
    					}
						
    					var newCell = new mxCell(label, new mxGeometry(x0, y,
		    				0, 0), style || 'whiteSpace=wrap;html=1;');
						newCell.collapsed = collapsed;
						newCell.vertex = true;
    					newCell.id = id;
						
						if (cell != null && !ignoreCell)
						{
							graph.model.setCollapsed(cell, collapsed);
						}
						
						for (var j = 0; j < values.length; j++)
				    	{
							graph.setAttributeForCell(newCell, attribs[j], values[j]);

							if (cell != null && !ignoreCell)
							{
								graph.setAttributeForCell(cell, attribs[j], values[j]);
							}
				    	}
						
						if (labelname != null && labels != null)
						{
							var tempLabel = labels[newCell.getAttribute(labelname)];
							
							if (tempLabel != null)
							{
								graph.labelChanged(newCell, tempLabel);

								if (cell != null && !ignoreCell)
								{
									graph.cellLabelChanged(cell, tempLabel);
								}
							}
						}

						if (stylename != null && styles != null)
						{
							var tempStyle = styles[newCell.getAttribute(stylename)];
							
							if (tempStyle != null)
							{
								newCell.style = tempStyle;
							}
						}

						graph.setAttributeForCell(newCell, 'placeholders', '1');
						newCell.style = graph.replacePlaceholders(newCell, newCell.style, vars);

						if (cell != null && !ignoreCell)
						{
							graph.model.setStyle(cell, newCell.style);

							if (mxUtils.indexOf(cells, cell) < 0)
							{
								cells.push(cell);
							}

							graph.fireEvent(new mxEventObject('cellsInserted', 'cells', [cell]));
						}
						else
						{
							graph.fireEvent(new mxEventObject('cellsInserted', 'cells', [newCell]));
						}

    					var exists = cell != null;
						cell = newCell;
    					
						if (!exists)
						{
	    					for (var e = 0; e < edges.length; e++)
	    					{
	    						lookups[edges[e].to][cell.getAttribute(edges[e].to)] = cell;
	    					}
						}
						
						if (link != null && link != 'link')
						{
							graph.setLinkForCell(cell, cell.getAttribute(link));
							
							// Removes attribute
							graph.setAttributeForCell(cell, link, null);
						}
						
						// Sets the geometry
						var size = this.editor.graph.getPreferredSizeForCell(cell);
						var parent = (parentIndex != null) ? graph.model.getCell(
							namespace + values[parentIndex]) : null;

						if (cell.vertex)
						{
							var originX = (parent != null) ? 0 : x0;
							var originY = (parent != null) ? 0 : y0;

							if (left != null && cell.getAttribute(left) != null)
							{
								cell.geometry.x = originX + parseFloat(cell.getAttribute(left));
							}

							if (top != null && cell.getAttribute(top) != null)
							{
								cell.geometry.y = originY + parseFloat(cell.getAttribute(top));
							}

							var widthValue = (width.charAt(0) == '@') ? cell.getAttribute(width.substring(1)) : null;

							if (widthValue != null && widthValue != 'auto')
							{
								cell.geometry.width = parseFloat(cell.getAttribute(width.substring(1)));
							}
							else
							{
								cell.geometry.width = (width == 'auto' || widthValue == 'auto') ?
									size.width + padding : parseFloat(width);
							}

							var heightValue = (height.charAt(0) == '@') ? cell.getAttribute(height.substring(1)) : null;

							if (heightValue != null && heightValue != 'auto')
							{
								cell.geometry.height = parseFloat(heightValue);
							}
							else
							{
								cell.geometry.height = (height == 'auto' || heightValue == 'auto') ?
									size.height + padding : parseFloat(height);
							}
							
							y += cell.geometry.height + nodespacing;
						}
						
						if (!exists)
						{
							allCells.push(cell);
	    					
	    					if (parent != null)
	    					{
	    						parent.style = graph.replacePlaceholders(parent, parentstyle, vars);
	    						graph.addCell(cell, parent);
								parents.push(parent);
	    					}
	    					else
	    					{
	    						cells.push(graph.addCell(cell));
	    					}
						}
						else
						{
							if (dups[id] == null)
							{
								dups[id] = [];
							}
							
							dups[id].push(cell);
						}
	    			}

					// Process parents for autosize
					for (var i = 0; i < parents.length; i++)
					{
						var widthValue = (width.charAt(0) == '@') ? parents[i].getAttribute(width.substring(1)) : null;
						var heightValue = (height.charAt(0) == '@') ? parents[i].getAttribute(height.substring(1)) : null;

						if ((width == 'auto' || widthValue == 'auto') &&
							(height == 'auto' || heightValue == 'auto'))
						{
							graph.updateGroupBounds([parents[i]], padding, true);
						}
					}

					var roots = cells.slice();
					var select = cells.slice();
					
					for (var e = 0; e < edges.length; e++)
					{
						var edge = edges[e];
	
						for (var i = 0; i < allCells.length; i++)
	    				{
							var cell = allCells[i];
							
							var insertEdge = mxUtils.bind(this, function(realCell, dataCell, edge)
							{
								var tmp = dataCell.getAttribute(edge.from);
								
		    					if (tmp != null && tmp != '')
		    					{
									var refs = tmp.split(',');
									
									for (var j = 0; j < refs.length; j++)
									{
										var ref = lookups[edge.to][refs[j]];

										if (ref == null && unknownStyle != null)
										{
											ref = new mxCell(refs[j], new mxGeometry(x0, y0, 0, 0), unknownStyle);
											ref.style = graph.replacePlaceholders(dataCell, ref.style, vars);
											var refSize = this.editor.graph.getPreferredSizeForCell(ref);
											ref.geometry.width = refSize.width + padding;
											ref.geometry.height = refSize.height + padding;
											lookups[edge.to][refs[j]] = ref;
											ref.vertex = true;
											ref.id = refs[j];
											cells.push(graph.addCell(ref));
										}

										if (ref != null)
										{
											var label = edge.label;
											
											if (edge.fromlabel != null)
											{
												label = (dataCell.getAttribute(edge.fromlabel) || '') + (label || '');
											}
											
											if (edge.sourcelabel != null)
											{
												label = graph.replacePlaceholders(dataCell,
													edge.sourcelabel, vars) + (label || '');
											}
						
											if (edge.tolabel != null)
											{
												label = (label || '') + (ref.getAttribute(edge.tolabel) || '');
											}
																							
											if (edge.targetlabel != null)
											{
												label = (label || '') + graph.replacePlaceholders(
													ref, edge.targetlabel, vars);
											}
						
											var placeholders = ((edge.placeholders == 'target') ==
												!edge.invert) ? ref : realCell;
											var edgeStyle = (edge.style != null) ?
												graph.replacePlaceholders(placeholders, edge.style, vars) :
												graph.createCurrentEdgeStyle();

											var edgeCell = graph.insertEdge(null, null, label || '', (edge.invert) ?
												ref : realCell, (edge.invert) ? realCell : ref, edgeStyle);
											
											// Adds additional edge labels
											if (edge.labels != null)
											{
												for (var k = 0; k < edge.labels.length; k++)
												{
													var def = edge.labels[k];
													var elx = (def.x != null) ? def.x : 0;
													var ely = (def.y != null) ? def.y : 0;
													var st = 'resizable=0;html=1;';
													var el = new mxCell(def.label || k,
														new mxGeometry(elx,  ely, 0, 0), st);
													el.vertex = true;
													el.connectable = false;
													el.geometry.relative = true;
								
													if (def.placeholders != null)
													{
														el.value = graph.replacePlaceholders(
															((def.placeholders == 'target') ==
															!edge.invert) ? ref : realCell,
														el.value, vars)
													}
													
													if (def.dx != null || def.dy != null)
													{
														el.geometry.offset = new mxPoint(
															(def.dx != null) ? def.dx : 0,
															(def.dy != null) ? def.dy : 0);
													}
								
													edgeCell.insert(el);
												}
											}
											
											select.push(edgeCell);
											mxUtils.remove((edge.invert) ? realCell : ref, roots);
										}
									}
		    					}
							});
							
							insertEdge(cell, cell, edge);

    						// Checks more entries
    						if (dups[cell.id] != null)
    						{
    							for (var j = 0; j < dups[cell.id].length; j++)
    		    				{
    								insertEdge(cell, dups[cell.id][j], edge);
    		    				}
    						}
						}
					}
						
					// Removes ignored attributes after processing above
					if (ignore != null)
					{
						for (var i = 0; i < allCells.length; i++)
						{
							var cell = allCells[i];
							
							for (var j = 0; j < ignore.length; j++)
					    	{
								graph.setAttributeForCell(cell, mxUtils.trim(ignore[j]), null);
					    	}
						}
					}
					
					if (cells.length > 0)
					{
						var edgeLayout = new mxParallelEdgeLayout(graph);
						edgeLayout.spacing = edgespacing;
						edgeLayout.checkOverlap = true;
				
						var postProcess = function()
						{
							if (edgeLayout.spacing > 0)
							{
								edgeLayout.execute(graph.getDefaultParent());
							}
							
			    			// Aligns cells to grid and/or rounds positions
							for (var i = 0; i < cells.length; i++)
		    				{
								var geo = graph.getCellGeometry(cells[i]);
								geo.x = Math.round(graph.snap(geo.x));
								geo.y = Math.round(graph.snap(geo.y));
								
								if (width == 'auto')
								{
									geo.width = Math.round(graph.snap(geo.width));	
								}
								
								if (height == 'auto')
								{
									geo.height = Math.round(graph.snap(geo.height));	
								}
		    				}
						};
						
						if (layout.charAt(0) == '[')
						{
			    			// Required for layouts to work with new cells
							var temp = afterInsert;
			    			graph.view.validate();

							this.executeLayouts(graph.createLayouts(JSON.parse(layout)), function()
							{
								postProcess();
								temp();
							});

							afterInsert = null;
						}
						else if (layout == 'circle')
						{
							var circleLayout = new mxCircleLayout(graph);
							circleLayout.disableEdgeStyle = false;
		    				circleLayout.resetEdges = false;
		    				
		    				var circleLayoutIsVertexIgnored = circleLayout.isVertexIgnored;
		    				
			    			// Ignore other cells
		    				circleLayout.isVertexIgnored = function(vertex)
		    				{
		    					return circleLayoutIsVertexIgnored.apply(this, arguments) ||
		    						mxUtils.indexOf(cells, vertex) < 0;
		    				};
						
				    		this.executeLayout(function()
				    		{
				    			circleLayout.execute(graph.getDefaultParent());
				    			postProcess();
				    		}, true, afterInsert);
						
				    		afterInsert = null;
						}
						else if (layout == 'horizontaltree' || layout == 'verticaltree' ||
								(layout == 'auto' && select.length == 2 * cells.length - 1 && roots.length == 1))
		    			{
			    			// Required for layouts to work with new cells
			    			graph.view.validate();
			    			
		    				var treeLayout = new mxCompactTreeLayout(graph, layout == 'horizontaltree');
		    				treeLayout.levelDistance = nodespacing;
		    				treeLayout.edgeRouting = false;
		    				treeLayout.resetEdges = false;
		    				
		    				this.executeLayout(function()
		    	    		{
		    					treeLayout.execute(graph.getDefaultParent(), (roots.length > 0) ? roots[0] : null);
		    	    		}, true, afterInsert);
		    				
		    				afterInsert = null;
		    			}
		    			else if (layout == 'horizontalflow' || layout == 'verticalflow' ||
		    					(layout == 'auto' && roots.length == 1))
		    			{
			    			// Required for layouts to work with new cells
			    			graph.view.validate();
			    			
			    			var flowLayout = new mxHierarchicalLayout(graph,
			    				(layout == 'horizontalflow') ?
								mxConstants.DIRECTION_WEST :
								mxConstants.DIRECTION_NORTH);
			    			flowLayout.intraCellSpacing = nodespacing;
			    			flowLayout.parallelEdgeSpacing = edgespacing;
			    			flowLayout.interRankCellSpacing = levelspacing;
			    			flowLayout.disableEdgeStyle = false;
			    			
			        		this.executeLayout(function()
			        		{
			        			flowLayout.execute(graph.getDefaultParent(), select);
			        			
			        			// Workaround for flow layout moving cells to origin
			        			graph.moveCells(select, x0, y0);
			        		}, true, afterInsert);
				    			
			    			afterInsert = null;
			    		}
						else if (layout == 'orgchart')
						{
			    			// Required for layouts to work with new cells
			    			graph.view.validate();
							
							var orgChartLayout = new mxOrgChartLayout(graph,
								2, levelspacing, nodespacing);
		
		    				var orgChartLayoutIsVertexIgnored = orgChartLayout.isVertexIgnored;
		
			    			// Ignore other cells
		    				orgChartLayout.isVertexIgnored = function(vertex)
		    				{
		    					return orgChartLayoutIsVertexIgnored.apply(this, arguments) ||
		    						mxUtils.indexOf(cells, vertex) < 0;
		    				};
		
		    	    		this.executeLayout(function()
		    	    		{
		    	    			orgChartLayout.execute(graph.getDefaultParent());
				    			postProcess();
		    	    		}, true, afterInsert);
		    	    		
		    	    		afterInsert = null;
						}
		    			else if (layout == 'organic' || (layout == 'auto' &&
		    					select.length > cells.length))
		    			{
			    			// Required for layouts to work with new cells
			    			graph.view.validate();
			    			
		    				var organicLayout = new mxFastOrganicLayout(graph);
		    				organicLayout.forceConstant = nodespacing * 3;
		    				organicLayout.disableEdgeStyle = false;
		    				organicLayout.resetEdges = false;
		
		    				var organicLayoutIsVertexIgnored = organicLayout.isVertexIgnored;
		
			    			// Ignore other cells
		    				organicLayout.isVertexIgnored = function(vertex)
		    				{
		    					return organicLayoutIsVertexIgnored.apply(this, arguments) ||
		    						mxUtils.indexOf(cells, vertex) < 0;
		    				};
		
		    	    		this.executeLayout(function()
		    	    		{
		    	    			organicLayout.execute(graph.getDefaultParent());
				    			postProcess();
		    	    		}, true, afterInsert);
		    	    		
		    	    		afterInsert = null;
		    			}
					}
	    			
	    			this.hideDialog();
        		}
        		finally
        		{
        			graph.model.endUpdate();
        		}
				
        		if (afterInsert != null)
        		{
        			afterInsert();
        		}
    		}
		}
		catch (e)
		{
			this.handleError(e);
		}
	};

	/**
	 * Translates this point by the given vector.
	 * 
	 * @param {number} dx X-coordinate of the translation.
	 * @param {number} dy Y-coordinate of the translation.
	 */
	EditorUi.prototype.getSearch = function(exclude)
	{
		var result = '';
		
		if (urlParams['offline'] != '1' && urlParams['demo'] != '1' && exclude != null && window.location.search.length > 0)
		{
			var amp = '?';
			
			for (var key in urlParams)
			{
				if (mxUtils.indexOf(exclude, key) < 0 && urlParams[key] != null)
				{
					result += amp + key + '=' + urlParams[key];
					amp = '&';
				}
			}
		}
		else
		{
			result = window.location.search;
		}
		
		return result;
	};

	/**
	 * Returns the URL for a copy of this editor with no state.
	 */
	EditorUi.prototype.getUrl = function(pathname)
	{
		var href = (pathname != null) ? pathname : window.location.pathname;
		var parms = (href.indexOf('?') > 0) ? 1 : 0;

		if (urlParams['offline'] == '1')
		{
			href += window.location.search;
		}
		else
		{
			var ignored = ['tmp', 'libs', 'clibs', 'state', 'fileId', 'code', 'share', 'notitle',
			               'data', 'url', 'embed', 'client', 'create', 'title', 'splash'];
			
			// Removes template URL parameter for new blank diagram
			for (var key in urlParams)
			{
				if (mxUtils.indexOf(ignored, key) < 0)
				{
					if (parms == 0)
					{
						href += '?';
					}
					else
					{
						href += '&';
					}
					
					if (urlParams[key] != null)
					{
						href += key + '=' + urlParams[key];
						parms++;
					}
				}
			}
		}

		return href;
	};

	/**
	 * Overrides link dialog.
	 */
	EditorUi.prototype.showLinkDialog = function(value, btnLabel, fn, showNewWindowOption, linkTarget)
	{
		var dlg = new LinkDialog(this, value, btnLabel, fn, true, showNewWindowOption, linkTarget);
		this.showDialog(dlg.container, 560, 130, true, true);
		dlg.init();
	};
	
	/**
	 * Returns the number of storage options enabled
	 */
	EditorUi.prototype.getServiceCount = function(allowBrowser)
	{
		var serviceCount = 1;
		
		if (this.drive != null || typeof window.DriveClient === 'function')
		{
			serviceCount++
		}
		
		if	(this.dropbox != null || typeof window.DropboxClient === 'function')
		{
			serviceCount++
		}

		if (this.oneDrive != null || typeof window.OneDriveClient === 'function')
		{
			serviceCount++
		}
		
		if (this.gitHub != null)
		{
			serviceCount++
		}
		
		if (this.gitLab != null)
		{
			serviceCount++
		}
		
		if (allowBrowser && isLocalStorage && urlParams['browser'] == '1')
		{
			serviceCount++
		}
		
		return serviceCount;
	}

	/**
	 * Updates action and menu states depending on the file.
	 */
	EditorUi.prototype.updateUi = function()
	{
		this.updateButtonContainer();
		this.updateActionStates();
		
		// Action states that only need update for new files
		var file = this.getCurrentFile();
		var active = file != null || (urlParams['embed'] == '1' &&
			this.editor.graph.isEnabled());
		this.menus.get('viewPanels').setEnabled(active);
		this.menus.get('viewZoom').setEnabled(active);
		
		var restricted = (urlParams['embed'] != '1' || urlParams['embedRT'] == '1' ||
			!this.editor.graph.isEnabled()) &&
			(file == null || file.isRestricted());
		this.actions.get('makeCopy').setEnabled(!restricted);
		this.actions.get('print').setEnabled(!restricted);
		this.menus.get('exportAs').setEnabled(!restricted);
		this.menus.get('embed').setEnabled(!restricted);
		
		// Disables libraries and extras menu in embed mode
		// while waiting for file data
		var libsEnabled = urlParams['embed'] != '1' ||
				this.editor.graph.isEnabled();
		this.menus.get('extras').setEnabled(libsEnabled);
		
		if (Editor.enableCustomLibraries)
		{
			this.menus.get('openLibraryFrom').setEnabled(libsEnabled);
			this.menus.get('newLibrary').setEnabled(libsEnabled);
		}
		
		// Disables actions in the toolbar
		var editable = (urlParams['embed'] == '1' &&
			this.editor.graph.isEnabled()) ||
			(file != null && file.isEditable());
		this.actions.get('image').setEnabled(active);
		this.actions.get('zoomIn').setEnabled(active);
		this.actions.get('zoomOut').setEnabled(active);
		this.actions.get('smartFit').setEnabled(active);
		this.actions.get('resetView').setEnabled(active);
		this.actions.get('darkMode').setEnabled(Editor.currentTheme != 'atlas');
		this.actions.get('lightMode').setEnabled(Editor.currentTheme != 'atlas');

		var autoModeAction = this.actions.get('autoMode');
		autoModeAction.setEnabled(autoModeAction.isEnabled() && Editor.currentTheme != 'atlas');
		
		// Disables menus
		this.menus.get('edit').setEnabled(active);
		this.menus.get('view').setEnabled(active);
		this.menus.get('importFrom').setEnabled(editable);
		this.menus.get('arrange').setEnabled(editable);
		
		// Disables connection drop downs in toolbar
		if (this.toolbar != null)
		{
			if (this.toolbar.edgeShapeMenu != null)
			{
				this.toolbar.edgeShapeMenu.setEnabled(editable);
			}
			
			if (this.toolbar.edgeStyleMenu != null)
			{
				this.toolbar.edgeStyleMenu.setEnabled(editable);
			}
		}

		this.updateUserElement();
	};
	
	/**
	 * Hook for subclassers
	 */
	EditorUi.prototype.updateButtonContainer = function()
	{
		// do nothing
	};
		
	/**
	 * Hook for subclassers
	 */
	EditorUi.prototype.updateUserElement = function()
	{
		// do nothing
	};
	
	/**
	 * Hook for subclassers
	 */
	EditorUi.prototype.scheduleSanityCheck = function()
	{
		// do nothing
	};
	
	/**
	 * Hook for subclassers
	 */
	EditorUi.prototype.stopSanityCheck = function()
	{
		// do nothing
	};

	/**
	 * Returns true if a diagram is cative and editable.
	 */
	EditorUi.prototype.isDiagramActive = function()
	{
		var file = this.getCurrentFile();
		
		return (file != null && file.isEditable()) || 
			(urlParams['embed'] == '1' && this.editor.graph.isEnabled());
	};

	/**
	 * Extends sidebar construction to add listeners for theme changes.
	 */
	var editorUiCreateSidebar = EditorUi.prototype.createSidebar;
	EditorUi.prototype.createSidebar = function(container)
	{
		var sidebar = editorUiCreateSidebar.apply(this, arguments);

		var refreshSidebar = mxUtils.bind(this, function()
		{
			sidebar.refresh();
			this.restoreOpenLibraries();
		});

		if (!Editor.enableCssDarkMode)
		{
			this.addListener('darkModeChanged', refreshSidebar);
		}

		this.addListener('sketchModeChanged', refreshSidebar);
		this.addListener('currentThemeChanged', refreshSidebar);
		
		return sidebar;
	};

	/**
	 * Extends sidebar construction to add listeners for theme changes.
	 */
	EditorUi.prototype.restoreOpenLibraries = function()
	{
		var temp = this.openLibraries;
		this.openLibraries = null;

		if (temp != null)
		{
			for (var i = 0; i < temp.length; i++)
			{
				this.libraryLoaded(temp[i].file, temp[i].images,
					temp[i].title, (temp[i].div != null) ?
						temp[i].div.style.display != 'none' :
						temp[i].expand);
			}
		}
	};

	/**
	 * Updates action states depending on the selection.
	 */
	var editorUiUpdateActionStates = EditorUi.prototype.updateActionStates;
	EditorUi.prototype.updateActionStates = function()
	{
		editorUiUpdateActionStates.apply(this, arguments);

		var graph = this.editor.graph;
		var file = this.getCurrentFile();
		var ss = this.getSelectionState();
		var active = this.isDiagramActive();
		var editable = (urlParams['embed'] == '1' &&
			this.editor.graph.isEnabled()) ||
			(file != null && file.isEditable());
		
		this.actions.get('undo').setEnabled(this.canUndo() && editable);
		this.actions.get('redo').setEnabled(this.canRedo() && editable);
		this.actions.get('autosave').setEnabled(file != null && file.isEditable() && file.isAutosaveOptional());
		this.actions.get('guides').setEnabled(active);
		this.actions.get('editData').setEnabled(graph.isEnabled());
		this.actions.get('editConnectionPoints').setEnabled(active && ss.edges.length == 0 && ss.vertices.length == 1);
		this.actions.get('editImage').setEnabled(active && ss.image && ss.cells.length > 0);
		this.actions.get('crop').setEnabled(active && ss.image && ss.cells.length > 0);
		this.actions.get('pageSetup').setEnabled(active);
		this.actions.get('shadowVisible').setEnabled(active);
		this.actions.get('connectionArrows').setEnabled(active);
		this.actions.get('connectionPoints').setEnabled(active);
		this.actions.get('copyStyle').setEnabled(active && !graph.isSelectionEmpty());
		this.actions.get('pasteStyle').setEnabled(this.copiedStyle != null && active && ss.cells.length > 0);
		this.actions.get('editGeometry').setEnabled(ss.vertices.length > 0);
		this.actions.get('createShape').setEnabled(active);
		this.actions.get('createRevision').setEnabled(active);
		this.actions.get('moveToFolder').setEnabled(file != null);
		this.actions.get('makeCopy').setEnabled(file != null && !file.isRestricted());
		this.actions.get('editDiagram').setEnabled(active && (file == null || !file.isRestricted()));
		this.actions.get('publishLink').setEnabled(file != null && !file.isRestricted());
		this.actions.get('tags').setEnabled(this.diagramContainer.style.visibility != 'hidden');
		this.actions.get('layers').setEnabled(this.diagramContainer.style.visibility != 'hidden');
		this.actions.get('outline').setEnabled(this.diagramContainer.style.visibility != 'hidden');
		this.actions.get('rename').setEnabled((file != null && file.isRenamable()) || urlParams['embed'] == '1');
		this.actions.get('close').setEnabled(file != null);
		this.actions.get('properties').setEnabled(file != null);
		this.menus.get('publish').setEnabled(file != null && !file.isRestricted());
		
		var findReplace = this.actions.get('findReplace');
		findReplace.setEnabled(this.diagramContainer.style.visibility != 'hidden');
		findReplace.label = mxResources.get('find') + ((graph.isEnabled()) ?
			'/' + mxResources.get('replace') : '');
		
		var state = graph.view.getState(graph.getSelectionCell());
		this.actions.get('editShape').setEnabled(active && state != null &&
			state.shape != null && state.shape.stencil != null);
	};

	/**
	 * Overridden to remove export dialog in chromeless lightbox.
	 */
	var editoUiDestroy = EditorUi.prototype.destroy;

	EditorUi.prototype.destroy = function()
	{
		if (this.exportDialog != null)
		{
			this.exportDialog.parentNode.removeChild(this.exportDialog);
			this.exportDialog = null;
		}
		
		editoUiDestroy.apply(this, arguments);
	};
				
	/**
	 * Overrides export dialog for using ui functions for save and setting global switches.
	 */
	if (window.ExportDialog != null)
	{
		ExportDialog.showXmlOption = false;
		ExportDialog.showGifOption = false;
		
		ExportDialog.exportFile = function(editorUi, name, format, bg, s, b, dpi, grid)
		{
			var graph = editorUi.editor.graph;
			
			if (format == 'xml')
			{
				editorUi.hideDialog();
				editorUi.saveData(name, 'xml', mxUtils.getXml(editorUi.editor.getGraphXml()), 'text/xml');
			}
		    else if (format == 'svg')
			{
		    	editorUi.hideDialog();
				editorUi.saveData(name, 'svg', mxUtils.getXml(graph.getSvg(bg, s, b)), 'image/svg+xml');
			}
		    else
		    {
		    	var data = editorUi.getFileData(true, null, null, null, null, true);
		    	var bounds = graph.getGraphBounds();
				var w = Math.floor(bounds.width * s / graph.view.scale);
				var h = Math.floor(bounds.height * s / graph.view.scale);
				
				if (data.length <= MAX_REQUEST_SIZE && w * h < MAX_AREA)
				{
					editorUi.hideDialog();
					
					if ((format == 'png' || format == 'jpg' || format == 'jpeg') && editorUi.isExportToCanvas())
					{
						if (format == 'png')
						{
							editorUi.exportImage(s, bg == null || bg == 'none', true,
						   		false, false, b, true, false, null, grid, dpi);
						}
						else 
						{
							editorUi.exportImage(s, false, true,
								false, false, b, true, false, 'jpeg', grid);
						}
					}
					else 
					{
						var extras = {globalVars: graph.getExportVariables()};
						
						if (grid)
						{
							extras.grid = {
								size: graph.gridSize,
								steps: graph.view.gridSteps,
								color: graph.view.gridColor
							};
						}
						
						editorUi.saveRequest(name, format,
							function(newTitle, base64)
							{
								return new mxXmlRequest(EXPORT_URL, 'format=' + format + '&base64=' + (base64 || '0') +
									((newTitle != null) ? '&filename=' + encodeURIComponent(newTitle) : '') +
									'&extras=' + encodeURIComponent(JSON.stringify(extras)) +
									(dpi > 0? '&dpi=' + dpi : '') +
									'&bg=' + ((bg != null) ? bg : 'none') + '&w=' + w + '&h=' + h +
									'&border=' + b + '&xml=' + encodeURIComponent(data));
							});
					}
				}
				else
				{
					mxUtils.alert(mxResources.get('drawingTooLarge'));
				}
			}
		};
	}

	EditorUi.prototype.getDiagramTextContent = function()
	{
		this.editor.graph.setEnabled(false);
		var graph = this.editor.graph;
			
		var allPagesTxt = '';
		
		if (this.pages != null)
		{
			for (var i = 0; i < this.pages.length; i++)
			{
				var pageGraph = graph;
				
				if (this.currentPage != this.pages[i])
				{
					pageGraph = this.createTemporaryGraph(graph.getStylesheet());
					this.updatePageRoot(this.pages[i]);
					pageGraph.model.setRoot(this.pages[i].root);								
				}
				allPagesTxt += this.pages[i].getName() + ' ' + pageGraph.getIndexableText() + ' ';
			}
		}
		else
		{
			allPagesTxt = graph.getIndexableText();
		}
		
		this.editor.graph.setEnabled(true);
		return allPagesTxt;
	};
	
	EditorUi.prototype.showRemotelyStoredLibrary = function(title)
	{
		var selectedLibs = {};
		var div = document.createElement('div');
		div.style.whiteSpace = 'nowrap';
		var graph = this.editor.graph;
		
		var hd = document.createElement('h3');
		mxUtils.write(hd, mxUtils.htmlEntities(title));
		hd.style.cssText = 'width:100%;text-align:center;margin-top:0px;margin-bottom:12px';
		div.appendChild(hd);

		var libsSection = document.createElement('div');
		libsSection.style.cssText = 'border:1px solid lightGray;overflow: auto;height:300px';

		libsSection.innerHTML = '<div style="text-align:center;padding:8px;"><img src="' + IMAGE_PATH + '/spin.gif"></div>';
		
		var loadedLibs = {};
		
		try
		{
			var custLibs = mxSettings.getCustomLibraries();
			
			for (var j = 0; j < custLibs.length; j++)
			{
				var l = custLibs[j];
				
				if (l.substring(0, 1) == 'R')
				{
					var libDesc = JSON.parse(decodeURIComponent(l.substring(1)));
					loadedLibs[libDesc[0]] = {
						id: libDesc[0], 
               			title: libDesc[1], 
               			downloadUrl: libDesc[2]
					};
				}
			}
		}
		catch(e){}

		this.remoteInvoke('getCustomLibraries', null, null, function(libsList)
		{
			libsSection.innerText = '';
			
			if (libsList.length == 0)
			{
				libsSection.innerHTML = '<div style="text-align:center;padding-top:20px;color:gray;">' +
					mxUtils.htmlEntities(mxResources.get('noLibraries')) + '</div>';
			}
			else
			{
				for (var i = 0; i < libsList.length; i++)
				{
					var lib = libsList[i];
					
					if (loadedLibs[lib.id])
					{
						selectedLibs[lib.id] = lib;
					}
					
					var libCheck = this.addCheckbox(libsSection, lib.title, loadedLibs[lib.id]); 
	
					(function(lib2, check)
					{
						mxEvent.addListener(check, 'change', function()
						{
							if (this.checked)
							{
								selectedLibs[lib2.id] = lib2;
							}
							else
							{
								delete selectedLibs[lib2.id];
							}
						});
					})(lib, libCheck)
				}
			}
		}, mxUtils.bind(this, function(e)
		{
			libsSection.innerText = '';
			var status = document.createElement('div');
			status.style.padding = '8px';
			status.style.textAlign = 'center';
			mxUtils.write(status, mxResources.get('error') + ': ');
			mxUtils.write(status, (e != null && e.message != null) ?
				e.message : mxResources.get('unknownError'));
			libsSection.appendChild(status);
		}));

		div.appendChild(libsSection);
		
		var dlg = new CustomDialog(this, div, mxUtils.bind(this, function()
		{
			this.spinner.spin(document.body, mxResources.get('loading'));
			var pendingLibs = 0;
			
			for (var id in selectedLibs)
			{
				if (loadedLibs[id] != null) continue; //already loaded!
				
				pendingLibs++;
				
				(mxUtils.bind(this, function(lib)
				{
					this.remoteInvoke('getFileContent', [lib.downloadUrl], null, mxUtils.bind(this, function(libContent)
					{
						pendingLibs--;
						
						if (pendingLibs == 0) this.spinner.stop();
						
						try
						{
							this.loadLibrary(new RemoteLibrary(this, libContent, lib));
						}
						catch (e)
						{
							this.handleError(e, mxResources.get('errorLoadingFile'));
						}
					}), mxUtils.bind(this, function()
					{
						pendingLibs--;
						
						if (pendingLibs == 0) this.spinner.stop();
						
						this.handleError(null, mxResources.get('errorLoadingFile'));
					}));
				}))(selectedLibs[id]);
			}
			
			for (var id in loadedLibs)
			{
				if (!selectedLibs[id]) //Removed
				{
					this.closeLibrary(new RemoteLibrary(this, null, loadedLibs[id])); //create a dummy library such that we can call closeLibrary
				}
			}
			
			if (pendingLibs == 0) this.spinner.stop();
		}), null, null, 'https://www.drawio.com/doc/faq/custom-libraries-confluence-cloud');
		this.showDialog(dlg.container, 340, 390, true, true, null, null, null, null, true);
	};
	
	//Remote invokation, currently limited to functions in EditorUi (and its sub objects) for security reasons
	//White-listed functions and some info about it
	EditorUi.prototype.remoteInvokableFns = {
		getDiagramTextContent: {isAsync: false},
		getLocalStorageFile: {isAsync: false, allowedDomains: ['app.diagrams.net']},
		getLocalStorageFileNames: {isAsync: false, allowedDomains: ['app.diagrams.net']},
		setMigratedFlag: {isAsync: false, allowedDomains: ['app.diagrams.net']}
	};
	
	EditorUi.prototype.remoteInvokeCallbacks = [];
	EditorUi.prototype.remoteInvokeQueue = [];

	EditorUi.prototype.handleRemoteInvokeReady = function(remoteWin)
	{
		this.remoteWin = remoteWin;
		
		for (var i = 0; i < this.remoteInvokeQueue.length; i++)
		{
			remoteWin.postMessage(this.remoteInvokeQueue[i], '*');
		}
		
		this.remoteInvokeQueue = [];
	};
	
	EditorUi.prototype.handleRemoteInvokeResponse = function(msg)
	{
		var msgMarkers = msg.msgMarkers;
		var callback = this.remoteInvokeCallbacks[msgMarkers.callbackId];
		
		if (callback == null)
		{
			throw new Error('No callback for ' + ((msgMarkers != null) ? msgMarkers.callbackId : 'null'));
		}
		else if (msg.error)
		{
			if (callback.error) callback.error(msg.error.errResp);
		}
		else if (callback.callback)
		{
			callback.callback.apply(this, msg.resp);
		}
			
		this.remoteInvokeCallbacks[msgMarkers.callbackId] = null; //set it to null only to keep the index
	};

	EditorUi.prototype.remoteInvoke = function(remoteFn, remoteFnArgs, msgMarkers, callback, error)
	{
		var acceptResponse = true;
		
		var timeoutThread = window.setTimeout(mxUtils.bind(this, function()
		{
			acceptResponse = false;
			error({code: App.ERROR_TIMEOUT, message: mxResources.get('timeout')});
		}), this.timeout);

		var wrapper = mxUtils.bind(this, function()
		{
	    	window.clearTimeout(timeoutThread);
			
			if (acceptResponse)
			{
				callback.apply(this, arguments);
			}
		});
		
		var errWrapper = mxUtils.bind(this, function()
		{
	    	window.clearTimeout(timeoutThread);
			
			if (acceptResponse)
			{
				error.apply(this, arguments);
			}
		});
		
		msgMarkers = msgMarkers || {};
		msgMarkers.callbackId = this.remoteInvokeCallbacks.length;
		this.remoteInvokeCallbacks.push({callback: wrapper, error: errWrapper});
		var msg = JSON.stringify({event: 'remoteInvoke', funtionName: remoteFn, functionArgs: remoteFnArgs, msgMarkers: msgMarkers});
		
		if (this.remoteWin != null) //remote invoke is ready
		{
			this.remoteWin.postMessage(msg, '*');
		}
		else
		{
			this.remoteInvokeQueue.push(msg);
		}
	};

	EditorUi.prototype.handleRemoteInvoke = function(msg, origin)
	{
		var sendResponse = mxUtils.bind(this, function(resp, error)
		{
			var respMsg = {event: 'remoteInvokeResponse', msgMarkers: msg.msgMarkers};
			
			if (error != null)
			{
				respMsg.error = {errResp: error};
			}
			else if (resp != null) 
			{
				respMsg.resp = resp;
			}
			
			this.remoteWin.postMessage(JSON.stringify(respMsg), '*');
		});
		
		try
		{
			//Remote invoke are allowed to call functions in AC
			var funtionName = msg.funtionName;
			var functionInfo = this.remoteInvokableFns[funtionName];
			
			if (functionInfo != null && typeof this[funtionName] === 'function')
			{
				if (functionInfo.allowedDomains)
				{
					var allowed = false;
					
					for (var i = 0; i < functionInfo.allowedDomains.length; i++)
					{
						if (origin == 'https://' + functionInfo.allowedDomains[i])
						{
							allowed = true;
							break;
						}
					}
					
					if (!allowed)
					{
						sendResponse(null, 'Invalid Call: ' + funtionName + ' is not allowed.');
						return;
					}
				}
				
				var functionArgs = msg.functionArgs;
				
				//Confirm functionArgs are not null and is array, otherwise, discard it
				if (!Array.isArray(functionArgs))
				{
					functionArgs = [];
				}
				
				//for functions with callbacks (async) we assume last two arguments are success, error
				if (functionInfo.isAsync)
				{
					//success
					functionArgs.push(function() 
					{
						sendResponse(Array.prototype.slice.apply(arguments));
					});
					
					//error
					functionArgs.push(function(err) 
					{
						sendResponse(null, err || 'Unkown Error');
					});
					
					this[funtionName].apply(this, functionArgs);
				}
				else
				{
					var resp = this[funtionName].apply(this, functionArgs);
					
					sendResponse([resp]);
				}
			}
			else
			{
				sendResponse(null, 'Invalid Call: ' + funtionName + ' is not found.');
			}
		}
		catch(e)
		{
			sendResponse(null, 'Invalid Call: An error occurred, ' + e.message);
		}
	};
	
	/**
	 * Opens the application keystore.
	 */
	EditorUi.prototype.openDatabase = function(success, error)
	{
		if (this.database == null)
		{
			var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB;
			
			if (indexedDB != null)
			{
				try
				{
					var req = indexedDB.open('database', 2);
					
					req.onupgradeneeded = function(e)
					{
						try
						{
							var db = req.result;
							
							if (e.oldVersion < 1)
							{
							    // Version 1 is the first version of the database.
								db.createObjectStore('objects', {keyPath: 'key'});
							}
							
							if (e.oldVersion < 2)
							{
								// Version 2 introduces browser file storage.
								db.createObjectStore('files', {keyPath: 'title'});
								db.createObjectStore('filesInfo', {keyPath: 'title'});
								EditorUi.migrateStorageFiles = isLocalStorage;
							}
						}
						catch (e)
						{
							if (error != null)
							{
								error(e);
							}
						}
					}
					
					req.onsuccess = mxUtils.bind(this, function(e)
					{
						try
						{
							var db = req.result;
							this.database = db;

							if (EditorUi.migrateStorageFiles)
							{
								StorageFile.migrate(db);
								EditorUi.migrateStorageFiles = false;
							}

							if (location.host == 'app.diagrams.net' && !this.drawioMigrationStarted)
							{
								this.drawioMigrationStarted = true;
								
								this.getDatabaseItem('.drawioMigrated3', mxUtils.bind(this, function(value)
								{
									if (value && urlParams['forceMigration'] != '1') //Already migrated
									{
										return;
									}
									
									var drawioFrame = document.createElement('iframe');
									drawioFrame.style.display = 'none';
									drawioFrame.setAttribute('src', 'https://www.draw.io?embed=1&proto=json&forceMigration=' + urlParams['forceMigration']);
									document.body.appendChild(drawioFrame);
									var collectNames = true, allDone = false;
									var fileNames, index = 0;
									
									var markAsMigrated = mxUtils.bind(this, function()
									{
										allDone = true;
										this.setDatabaseItem('.drawioMigrated3', true);
										drawioFrame.contentWindow.postMessage(JSON.stringify({action: 'remoteInvoke', funtionName: 'setMigratedFlag'}), '*');
									});
									
									var next = mxUtils.bind(this, function()
									{
										index++;
										fetchOneFile();
									});
									
									var fetchOneFile = mxUtils.bind(this, function()
									{
										try
										{
											if (index >= fileNames.length)
											{
												markAsMigrated();
												return;
											}
											
											var fileTitle = fileNames[index];
											
											StorageFile.getFileContent(this, fileTitle, mxUtils.bind(this, function(data)
											{
												if (data == null || (fileTitle == '.scratchpad' && data == this.emptyLibraryXml)) //Don't overwrite
												{
													drawioFrame.contentWindow.postMessage(JSON.stringify({action: 'remoteInvoke', funtionName: 'getLocalStorageFile', functionArgs: [fileTitle]}), '*');
												}
												else
												{
													next();
												}
											}), next);  //Ignore errors
										}
										catch(e)
										{
											//Log error
											console.log(e);
										}
									});
									
									var importOneFile = mxUtils.bind(this, function(file)
									{
										try
										{
											this.setDatabaseItem(null, [{
												title: file.title,
												size: file.data.length,
												lastModified: Date.now(),
												type: file.isLib? 'L' : 'F'
											}, {
												title: file.title,
												data: file.data
											}], next, next /* Ignore errors */, ['filesInfo', 'files']);
										}
										catch(e)
										{
											//Log error
											console.log(e);
										}
									});
											
									var messageListener = mxUtils.bind(this, function(evt)
									{
										try
										{
											//Only accept messages from migration iframe
											if (evt.source != drawioFrame.contentWindow)
											{
												return;
											}
											
											var drawMsg = {};
											
											try
											{
												drawMsg = JSON.parse(evt.data);
											}
											catch(e){} //Ignore
										
											if (drawMsg.event == 'init')
											{
												drawioFrame.contentWindow.postMessage(JSON.stringify({action: 'remoteInvokeReady'}), '*');
												drawioFrame.contentWindow.postMessage(JSON.stringify({action: 'remoteInvoke', funtionName: 'getLocalStorageFileNames'}), '*');
											}
											else if (drawMsg.event == 'remoteInvokeResponse' && !allDone)
											{
												if (collectNames)
												{
													if (drawMsg.resp != null && drawMsg.resp.length > 0 && drawMsg.resp[0] != null)
													{
														fileNames = drawMsg.resp[0];
														collectNames = false;
														fetchOneFile();
													}
													else
													{
														//Nothing in draw.io localStorage
														markAsMigrated();
													}
												}
												else
												{
													//Add the file, then move to the next
													if (drawMsg.resp != null && drawMsg.resp.length > 0 && drawMsg.resp[0] != null)
													{
														importOneFile(drawMsg.resp[0]);
													}
													else
													{
														next();
													}
												}
											}
										}
										catch(e)
										{
											console.log(e);
										}
									});
		
									window.addEventListener('message', messageListener);
								})); //Ignore errors
							}
								
							success(db);
							
							db.onversionchange = function() 
							{
								//TODO Handle DB revision update while code is running
								//		Save open file and request a page reload before closing the DB
								db.close();
							};
						}
						catch (e)
						{
							// Warn if error handler is not set
							if (error != null)
							{
								error(e);
							}
							else if (window.console != null)
							{
								console.warn(e);
							}
						};
					});
					
					req.onerror = error;
					
					req.onblocked = function() 
					{
						//TODO Use this when a new version is introduced
						// there's another open connection to same database
						// and it wasn't closed after db.onversionchange triggered for them
					};
				}
				catch (e)
				{
					// Warn if error handler is not set
					if (error != null)
					{
						error(e);
					}
					else if (window.console != null)
					{
						console.error(e);
					}
				}
			}
			else if (error != null)
			{
				error(new Error('IndexedDB not supported'));
			}
		}
		else
		{
			success(this.database);
		}
	};
	
	/**
	 * Add/Update item(s) in the database. It supports multiple stores transactions by sending an array of data, storeName 
	 * (key is optional, can be an array also if multiple stores are needed)
	 */
	EditorUi.prototype.setDatabaseItem = function(key, data, success, error, storeName)
	{
		this.openDatabase(mxUtils.bind(this, function(db)
		{
			try
			{
				storeName = storeName || 'objects';
				
				if (!Array.isArray(storeName))
				{
					storeName = [storeName];
					key = [key];
					data = [data];
				}
				
				var trx = db.transaction(storeName, 'readwrite');
				trx.oncomplete = success;
				trx.onerror = error;
		        
				for (var i = 0; i < storeName.length; i++)
				{
					trx.objectStore(storeName[i]).put(key != null && key[i] != null? {key: key[i], data: data[i]} : data[i]);
				}
			}
			catch (e)
			{
				if (error != null)
				{
					error(e);
				}
			}
		}), error);
	};

	/**
	 * Removes the item for the given key from the database.
	 */
	EditorUi.prototype.removeDatabaseItem = function(key, success, error, storeName)
	{
		this.openDatabase(mxUtils.bind(this, function(db)
		{
			storeName = storeName || 'objects';
			
			if (!Array.isArray(storeName))
			{
				storeName = [storeName];
				key = [key];
			}
			
			var trx = db.transaction(storeName, 'readwrite');
			trx.oncomplete = success;
			trx.onerror = error;
			
			for (var i = 0; i < storeName.length; i++)
			{
				trx.objectStore(storeName[i]).delete(key[i]);
			}
		}), error);
	};
	
	/**
	 * Returns one item from the database.
	 */
	EditorUi.prototype.getDatabaseItem = function(key, success, error, storeName)
	{
		this.openDatabase(mxUtils.bind(this, function(db)
		{
			try
			{
				storeName = storeName || 'objects';
				var trx = db.transaction([storeName], 'readonly');
				var req = trx.objectStore(storeName).get(key);
				
				req.onsuccess = function()
				{
					success(req.result);
				};
				
		        req.onerror = error;
			}
	        catch (e)
			{
				if (error != null)
				{
					error(e);
				}
			}
		}), error);
	};
	
	/**
	 * Returns all items from the database.
	 */
	EditorUi.prototype.getDatabaseItems = function(success, error, storeName)
	{
		this.openDatabase(mxUtils.bind(this, function(db)
		{
			try
			{
				storeName = storeName || 'objects';
				var trx = db.transaction([storeName], 'readonly');
				var req = trx.objectStore(storeName).openCursor(
					IDBKeyRange.lowerBound(0));
				var items = [];
				
				req.onsuccess = function(e)
				{
					if (e.target.result == null)
					{
						success(items);
					}
					else
					{
						items.push(e.target.result.value);
						e.target.result.continue();
					}
		        };
		        
		        req.onerror = error;
			}
			catch (e)
			{
				if (error != null)
				{
					error(e);
				}
			}
		}), error);
	};
	
	/**
	 * Returns all item keys from the database.
	 */
	EditorUi.prototype.getDatabaseItemKeys = function(success, error, storeName)
	{
		this.openDatabase(mxUtils.bind(this, function(db)
		{
			try
			{
				storeName = storeName || 'objects';
				var trx = db.transaction([storeName], 'readonly');
				var req = trx.objectStore(storeName).getAllKeys();
				
				req.onsuccess = function()
				{
					success(req.result);
		        };
		        
		        req.onerror = error;
			}
			catch (e)
			{
				if (error != null)
				{
					error(e);
				}
			}
		}), error);
	};
	/**
	 * Comments: We need these functions as wrapper of File functions in order to facilitate
	 * overriding them if comments are needed without having a file (e.g. Confluence Plugin)
	 */
	
	/**
	 * Are comments supported
	 */
	EditorUi.prototype.commentsSupported = function()
	{
		var file = this.getCurrentFile();
		
		return file != null? file.commentsSupported() : false;
	};

	/**
	 * Show refresh button?
	 */
	EditorUi.prototype.commentsRefreshNeeded = function()
	{
		var file = this.getCurrentFile();
		
		return file != null? file.commentsRefreshNeeded() : true;
	};
	
	/**
	 * Show save button?
	 */
	EditorUi.prototype.commentsSaveNeeded = function()
	{
		var file = this.getCurrentFile();

		return file != null? file.commentsSaveNeeded() : false;
	};
	
	/**
	 * Get comments
	 */
	EditorUi.prototype.getComments = function(success, error)
	{
		var file = this.getCurrentFile();
		
		if (file != null)
		{
			file.getComments(success, error);
		}
		else 
		{
			success([]); //placeholder
		}
	};

	/**
	 * Add a comment
	 */
	EditorUi.prototype.addComment = function(comment, success, error)
	{
		var file = this.getCurrentFile();
		
		if (file != null)
		{
			file.addComment(comment, success, error);
		}
		else 
		{
			success(Date.now()); //placeholder
		}
	};

	/**
	 * Can add a reply to a reply
	 */
	EditorUi.prototype.canReplyToReplies = function()
	{
		var file = this.getCurrentFile();
			
		return file != null? file.canReplyToReplies() : true;
	};

	/**
	 * Can add comments (The permission to comment)
	 */
	EditorUi.prototype.canComment = function()
	{
		var file = this.getCurrentFile();
		
		return file != null? file.canComment() : true;
	};

	/**
	 * Get a new comment object
	 */
	EditorUi.prototype.newComment = function(content, user)
	{
		var file = this.getCurrentFile();
		
		if (file != null)
		{
			return file.newComment(content, user)
		}
		else 
		{
			return new DrawioComment(this, null, content, Date.now(), Date.now(), false, user);
		}
	};
	
	//==================================================== End of comments =================================================================
	
	/**
	 * Does revisions history available
	 */
	EditorUi.prototype.isRevisionHistorySupported = function()
	{
		var file = this.getCurrentFile();
		
		return file != null && file.isRevisionHistorySupported();
	};

	/**
	 * Get revisions of current file
	 */
	EditorUi.prototype.getRevisions = function(success, error)
	{
		var file = this.getCurrentFile();
		
		if (file != null && file.getRevisions)
		{
			file.getRevisions(success, error);
		}
		else
		{
			error({message: mxResources.get('unknownError')});
		}
	};
	
	/**
	 * Is revisions history enabled
	 */
	EditorUi.prototype.isRevisionHistoryEnabled = function()
	{
		var file = this.getCurrentFile();
		
		return file != null &&
				((file.constructor == DriveFile && file.isEditable()) ||
				file.constructor == DropboxFile);
	};
	
	//===========Adding methods to find the service running draw.io and allowing calling draw.io remote services
	EditorUi.prototype.getServiceName = function()
	{
		return 'draw.io';
	};
	
	EditorUi.prototype.addRemoteServiceSecurityCheck = function(xhr)
	{
		//Using a standard header with specific sequence
		xhr.setRequestHeader('Content-Language', 'da, mi, en, de-DE');
	};
	
	//===========To Be Removed Soon==========
	EditorUi.prototype.loadUrl = function(url, success, error, forceBinary, retry, dataUriPrefix, noBinary, headers)
	{
		EditorUi.logEvent('SHOULD NOT BE CALLED: loadUrl');
		return this.editor.loadUrl(url, success, error, forceBinary, retry, dataUriPrefix, noBinary, headers);	
	};
	
	EditorUi.prototype.loadFonts = function(then)
	{
		EditorUi.logEvent('SHOULD NOT BE CALLED: loadFonts');
		return this.editor.loadFonts(then);	
	};
	
	EditorUi.prototype.createSvgDataUri = function(svg)
	{
		EditorUi.logEvent('SHOULD NOT BE CALLED: createSvgDataUri');
		return Editor.createSvgDataUri(svg);	
	};
	
    EditorUi.prototype.embedCssFonts = function(fontCss, then)
    {
		EditorUi.logEvent('SHOULD NOT BE CALLED: embedCssFonts');
		return this.editor.embedCssFonts(fontCss, then);	
	};
	
    EditorUi.prototype.embedExtFonts = function(callback)
	{
		EditorUi.logEvent('SHOULD NOT BE CALLED: embedExtFonts');
		return this.editor.embedExtFonts(callback);	
	};
	
	EditorUi.prototype.exportToCanvas = function(callback, width, imageCache, background, error, limitHeight,
			ignoreSelection, scale, transparentBackground, addShadow, converter, graph, border, noCrop, grid, theme)
	{
		EditorUi.logEvent('SHOULD NOT BE CALLED: exportToCanvas');
		return this.editor.exportToCanvas(callback, width, imageCache, background, error, limitHeight,
			ignoreSelection, scale, transparentBackground, addShadow, converter, graph, border,
			noCrop, grid, theme);	
	};
	
	EditorUi.prototype.createImageUrlConverter = function()
	{
		EditorUi.logEvent('SHOULD NOT BE CALLED: createImageUrlConverter');
		return this.editor.createImageUrlConverter();	
	};
	
	EditorUi.prototype.convertImages = function(svgRoot, callback, imageCache, converter)
	{
		EditorUi.logEvent('SHOULD NOT BE CALLED: convertImages');
		return this.editor.convertImages(svgRoot, callback, imageCache, converter);	
	};
	
	EditorUi.prototype.convertImageToDataUri = function(url, callback)
	{
		EditorUi.logEvent('SHOULD NOT BE CALLED: convertImageToDataUri');
		return this.editor.convertImageToDataUri(url, callback);	
	};
	
	EditorUi.prototype.base64Encode = function(str)
	{
		EditorUi.logEvent('SHOULD NOT BE CALLED: base64Encode');
		return Editor.base64Encode(str);	
	};
	
	EditorUi.prototype.updateCRC = function(crc, data, off, len)
	{
		EditorUi.logEvent('SHOULD NOT BE CALLED: updateCRC');
		return Editor.updateCRC(crc, data, off, len);	
	};
	
	EditorUi.prototype.crc32 = function(str)
	{
		EditorUi.logEvent('SHOULD NOT BE CALLED: crc32');
		return Editor.crc32(str);	
	};
	
	EditorUi.prototype.writeGraphModelToPng = function(data, type, key, value, error)
	{
		EditorUi.logEvent('SHOULD NOT BE CALLED: writeGraphModelToPng');
		return Editor.writeGraphModelToPng(data, type, key, value, error);
	};
	
	//=======End of To Be Removed Soon==========
	
	EditorUi.prototype.getLocalStorageFileNames = function()
	{
		if (localStorage.getItem('.localStorageMigrated') == '1' && urlParams['forceMigration'] != '1')
		{
			return null;
		}
		
		var files = [];
		
		for (var i = 0; i < localStorage.length; i++)
		{
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			
			if (key.length > 0 && (key == '.scratchpad' || key.charAt(0) != '.') && value.length > 0)
			{
				var isFile = (value.substring(0, 8) === '<mxfile ' ||
							value.substring(0, 5) === '<?xml' || value.substring(0, 12) === '<!--[if IE]>');
				var isLib = (value.substring(0, 11) === '<mxlibrary>');

				if (isFile || isLib)
				{
					files.push(key);
				}	
			}
		}
		
		return files;
	};
	
	EditorUi.prototype.getLocalStorageFile = function(key)
	{
		if (localStorage.getItem('.localStorageMigrated') == '1' && urlParams['forceMigration'] != '1')
		{
			return null;
		}
		
		var value = localStorage.getItem(key);
		return {title: key, data: value, isLib: value.substring(0, 11) === '<mxlibrary>'};
	};
	
	EditorUi.prototype.setMigratedFlag = function()
	{
		localStorage.setItem('.localStorageMigrated', '1');	
	};
})();

/**
 * Comments Window, It is used by both editor and viewer. So, it is here in a common place
 */
var CommentsWindow = function(editorUi, x, y, w, h, saveCallback)
{
	var readOnly = !editorUi.canComment();
	var canReplyToReplies = editorUi.canReplyToReplies();
	var curEdited = null;
		
	var div = document.createElement('div');
	div.className = 'geCommentsWin';
	div.style.background = (Editor.isDarkMode()) ?
		Editor.darkColor : 'whiteSmoke';

	var tbarHeight = (!EditorUi.compactUi) ? '30px' : '26px';
	
	var listDiv = document.createElement('div');
	listDiv.className = 'geCommentsList';
	listDiv.style.backgroundColor = (Editor.isDarkMode()) ?
		Editor.darkColor : 'whiteSmoke';
	listDiv.style.bottom = (parseInt(tbarHeight) + 7) + 'px';
	div.appendChild(listDiv);
	
	var noComments = document.createElement('span');
	noComments.style.cssText = 'display:none;padding-top:10px;text-align:center;';
	mxUtils.write(noComments, mxResources.get('noCommentsFound'));
	
	var selectionComment = null;
	
	var ldiv = document.createElement('div');
	
	ldiv.className = 'geToolbarContainer geCommentsToolbar';
	ldiv.style.height = tbarHeight;
	ldiv.style.padding = (!EditorUi.compactUi) ? '1px' : '4px 0px 3px 0px';
	
	var link = document.createElement('a');
	link.className = 'geButton';
	
	function updateNoComments()
	{
		var divs = listDiv.getElementsByTagName('div');
		var visibleCount = 0;
		
		for (var i = 0; i < divs.length; i++)
		{
			if (divs[i].style.display != 'none' && divs[i].parentNode == listDiv)
			{
				visibleCount++;
			}
		}
		
		noComments.style.display = (visibleCount == 0) ? 'block' : 'none';
	};
	
	function editComment(comment, cdiv, saveCallback, deleteOnCancel)
	{
		curEdited = {div: cdiv, comment: comment, saveCallback: saveCallback, deleteOnCancel: deleteOnCancel};
		
		var commentTxt = cdiv.querySelector('.geCommentTxt');
		var actionsDiv = cdiv.querySelector('.geCommentActionsList');
		
		var textArea = document.createElement('textarea');
		textArea.className = 'geCommentEditTxtArea';
		textArea.style.minHeight = commentTxt.offsetHeight + 'px';
		textArea.value = comment.content;
		cdiv.insertBefore(textArea, commentTxt);
		
		var btnDiv = document.createElement('div');
		btnDiv.className = 'geCommentEditBtns';
		
		function reset()
		{
			cdiv.removeChild(textArea);
			cdiv.removeChild(btnDiv);
			actionsDiv.style.display = 'block';
			commentTxt.style.display = 'block';	
		};
		
		var cancelBtn = mxUtils.button(mxResources.get('cancel'), function()
		{
			if (deleteOnCancel)
			{
				cdiv.parentNode.removeChild(cdiv);
				updateNoComments();
			}
			else
			{
				reset();
			}
			
			curEdited = null;
		});
		
		cancelBtn.className = 'geCommentEditBtn';
		btnDiv.appendChild(cancelBtn);
		
		var saveBtn = mxUtils.button(mxResources.get('save'), function()
		{
			commentTxt.innerText = '';
			comment.content = textArea.value;
			mxUtils.write(commentTxt, comment.content);
			reset();
			saveCallback(comment);
			curEdited = null;
		});
		
		// Updates modified state and handles placeholder text
		mxEvent.addListener(textArea, 'keydown', mxUtils.bind(this, function(evt)
		{
			if (!mxEvent.isConsumed(evt))
			{
				if ((mxEvent.isControlDown(evt) || (mxClient.IS_MAC &&
					mxEvent.isMetaDown(evt))) && evt.keyCode == 13 /* Ctrl+Enter */)
				{
					saveBtn.click();
					mxEvent.consume(evt);
				}
				else if (evt.keyCode == 27 /* Escape */)
				{
					cancelBtn.click();
					mxEvent.consume(evt);
				}
			}
		}));
		
		// Focused to include in viewport before focusin textbox
		saveBtn.focus();
		saveBtn.className = 'geCommentEditBtn gePrimaryBtn';
		btnDiv.appendChild(saveBtn);

		cdiv.insertBefore(btnDiv, commentTxt);
		actionsDiv.style.display = 'none';
		commentTxt.style.display = 'none';
		textArea.focus();
	};
	
	function writeCommentDate(comment, dateDiv)
	{
		dateDiv.innerText = '';
		var ts = new Date(comment.modifiedDate);
		var str = editorUi.timeSince(ts);
		
		if (str == null)
		{
			str = mxResources.get('lessThanAMinute');
		}
		
		mxUtils.write(dateDiv, mxResources.get('timeAgo', [str], '{1} ago'));
		dateDiv.setAttribute('title', ts.toLocaleDateString() + ' ' +
				ts.toLocaleTimeString());
	};
	
	function showBusy(commentDiv)
	{
		var busyImg = document.createElement('img');
		busyImg.className = 'geCommentBusyImg';
		busyImg.src= IMAGE_PATH + '/spin.gif';
		commentDiv.appendChild(busyImg);
		commentDiv.busyImg = busyImg;
	};
	
	function showError(commentDiv)
	{
		commentDiv.style.border = '1px solid red';
		commentDiv.removeChild(commentDiv.busyImg);
	};
	
	function showDone(commentDiv)
	{
		commentDiv.style.border = '';
		commentDiv.removeChild(commentDiv.busyImg);
	};

	function addComment(comment, parentArr, parent, level, showResolved)
	{
		//Skip resolved comments if showResolved is not set
		if (!showResolved && comment.isResolved)
		{
			return;
		}

		noComments.style.display = 'none';
		
		var cdiv = document.createElement('div');
		cdiv.className = 'geCommentContainer';
		cdiv.setAttribute('data-commentId', comment.id);
		cdiv.style.marginLeft = (level * 20 + 5) + 'px';

		if (comment.isResolved && !Editor.isDarkMode())
		{
			cdiv.style.backgroundColor = 'ghostWhite';
		}
		
		var headerDiv = document.createElement('div');
		headerDiv.className = 'geCommentHeader';
		
		var userImg = document.createElement('img');
		userImg.className = 'geCommentUserImg';
		userImg.src = comment.user.pictureUrl || Editor.userImage;
		headerDiv.appendChild(userImg);
		
		var headerTxt = document.createElement('div');
		headerTxt.className = 'geCommentHeaderTxt';
		headerDiv.appendChild(headerTxt);
		
		var usernameDiv = document.createElement('div');
		usernameDiv.className = 'geCommentUsername';
		mxUtils.write(usernameDiv, comment.user.displayName || '');
		headerTxt.appendChild(usernameDiv);
		
		var dateDiv = document.createElement('div');
		dateDiv.className = 'geCommentDate';
		dateDiv.setAttribute('data-commentId', comment.id);
		writeCommentDate(comment, dateDiv);
		headerTxt.appendChild(dateDiv);
		cdiv.appendChild(headerDiv);
		
		var commentTxtDiv = document.createElement('div');
		commentTxtDiv.className = 'geCommentTxt';
		mxUtils.write(commentTxtDiv, comment.content || '');
		cdiv.appendChild(commentTxtDiv);
		
		if (comment.isLocked)
		{
			cdiv.style.opacity = '0.5';
		}
		
		var actionsDiv = document.createElement('div');
		actionsDiv.className = 'geCommentActions';
		var actionsList = document.createElement('ul');
		actionsList.className = 'geCommentActionsList';
		actionsDiv.appendChild(actionsList);
		
		function addAction(name, evtHandler, hide)
		{
			var action = document.createElement('li');
			action.className = 'geCommentAction';
			var actionLnk = document.createElement('a');
			actionLnk.className = 'geCommentActionLnk';
			mxUtils.write(actionLnk, name);
			action.appendChild(actionLnk);
			
			mxEvent.addListener(actionLnk, 'click', function(evt)
			{
				evtHandler(evt, comment);
				evt.preventDefault();
				mxEvent.consume(evt);
			});
			
			actionsList.appendChild(action);
			
			if (hide) action.style.display = 'none';
		};
		
		function collectReplies()
		{
			var replies = [];
			var pdiv = cdiv;
			
			function collectReplies(comment) 
			{
				replies.push(pdiv);
				
				if (comment.replies != null)
				{
					for (var i = 0; i < comment.replies.length; i++) 
					{
						pdiv = pdiv.nextSibling;
						collectReplies(comment.replies[i]); 
					}
				}	
			}
			
			collectReplies(comment);
			
			return {pdiv: pdiv, replies: replies};
		};
		
		function addReply(initContent, editIt, saveCallback, doResolve, doReopen)
		{
			var pdiv = collectReplies().pdiv;
			
			var newReply = editorUi.newComment(initContent, editorUi.getCurrentUser());
			newReply.pCommentId = comment.id;
			
			if (comment.replies == null) comment.replies = [];
			
			var replyComment = addComment(newReply, comment.replies, pdiv, level + 1);

			function doAddReply()
			{
				showBusy(replyComment);
				
				comment.addReply(newReply, function(id)
				{
					newReply.id = id;
					comment.replies.push(newReply);
					showDone(replyComment);
					
					if (saveCallback) saveCallback();
					
				}, function(err)
				{
					doEdit();
					showError(replyComment);
					editorUi.handleError(err, null, null, null,
						mxUtils.htmlEntities(mxResources.get('objectNotFound')));
				}, doResolve, doReopen);				
			};
			
			function doEdit()
			{
				editComment(newReply, replyComment, function(newReply)
				{
					doAddReply();
				}, true);
			};

			if (editIt)
			{
				doEdit();
			}
			else
			{
				doAddReply();
			}
		};
		
		if (!readOnly && !comment.isLocked && (level == 0 || canReplyToReplies))
		{
			addAction(mxResources.get('reply'), function()
			{
				addReply('', true);
			}, comment.isResolved);
		}
		
		var user = editorUi.getCurrentUser();
		
		if (user != null && user.id == comment.user.id && !readOnly && !comment.isLocked)
		{
			addAction(mxResources.get('edit'), function()
			{
				function doEditComment()
				{
					editComment(comment, cdiv, function()
					{
						showBusy(cdiv);
						
						comment.editComment(comment.content, function()
						{
							showDone(cdiv);
						}, function(err)
						{
							showError(cdiv);
							doEditComment();
							editorUi.handleError(err, null, null, null,
								mxUtils.htmlEntities(mxResources.get('objectNotFound')));
						});
					});
				};
				
				doEditComment();
			}, comment.isResolved);
			
			addAction(mxResources.get('delete'), function()
			{
				editorUi.confirm(mxResources.get('areYouSure'), function()
				{
					showBusy(cdiv);
					
					comment.deleteComment(function(markedOnly)
					{
						if (markedOnly === true)
						{
							var commentTxt = cdiv.querySelector('.geCommentTxt');
							commentTxt.innerText = '';
							mxUtils.write(commentTxt, mxResources.get('msgDeleted'));
							
							var actions = cdiv.querySelectorAll('.geCommentAction');
							
							for (var i = 0; i < actions.length; i++)
							{
								actions[i].parentNode.removeChild(actions[i]);
							}
							
							showDone(cdiv);
							cdiv.style.opacity = '0.5';
						}
						else
						{
							var replies = collectReplies(comment).replies;
							
							for (var i = 0; i < replies.length; i++)
							{
								listDiv.removeChild(replies[i]);
							}
							
							for (var i = 0; i < parentArr.length; i++)
							{
								if (parentArr[i] == comment) 
								{
									parentArr.splice(i, 1);
									break;
								}
							}
							
							noComments.style.display = (listDiv.getElementsByTagName('div').length == 0) ? 'block' : 'none';
						}
					}, function(err)
					{
						showError(cdiv);
						editorUi.handleError(err, null, null, null,
							mxUtils.htmlEntities(mxResources.get('objectNotFound')));
					});
				});
			}, comment.isResolved);
		}
		
		if (!readOnly && !comment.isLocked && level == 0) //Resolve is a top-level action only
		{
			function toggleResolve(evt)
			{
				function doToggle()
				{
					var resolveActionLnk = evt.target;
					resolveActionLnk.innerText = '';

					comment.isResolved = !comment.isResolved;
					mxUtils.write(resolveActionLnk, comment.isResolved? mxResources.get('reopen') : mxResources.get('resolve'));
					var actionsDisplay = comment.isResolved? 'none' : '';
					var replies = collectReplies(comment).replies;
					var color = (Editor.isDarkMode()) ? 'transparent' : (comment.isResolved? 'ghostWhite' : 'white');
					
					for (var i = 0; i < replies.length; i++)
					{
						replies[i].style.backgroundColor = color;
						
						var forOpenActions = replies[i].querySelectorAll('.geCommentAction');
						
						for (var j = 0; j < forOpenActions.length; j ++) 
						{
							if (forOpenActions[j] == resolveActionLnk.parentNode) continue;
							
							forOpenActions[j].style.display = actionsDisplay;
						}

						if (!resolvedChecked)
						{
							replies[i].style.display = 'none';
						}
					}
					
					updateNoComments();
				};
				
				if (comment.isResolved)
				{
					addReply(mxResources.get('reOpened') + ': ', true, doToggle, false, true);
				}
				else
				{
					addReply(mxResources.get('markedAsResolved'), false, doToggle, true);
				}
			};
			
			addAction(comment.isResolved? mxResources.get('reopen') : mxResources.get('resolve'), toggleResolve);
		}
		
		cdiv.appendChild(actionsDiv);
		
		if (parent != null) 
		{
			listDiv.insertBefore(cdiv, parent.nextSibling);
		}
		else
		{
			listDiv.appendChild(cdiv);
		}
		
		for (var i = 0; comment.replies != null && i < comment.replies.length; i++)
		{
			var reply = comment.replies[i];
			reply.isResolved = comment.isResolved; //copy isResolved to child comments (replies)
			addComment(reply, comment.replies, null, level + 1, showResolved);
		}
		
		if (curEdited != null)
		{
			if (curEdited.comment.id == comment.id)
			{
				var origContent = comment.content;
				comment.content = curEdited.comment.content;
				editComment(comment, cdiv, curEdited.saveCallback, curEdited.deleteOnCancel);
				comment.content = origContent;
			}
			else if (curEdited.comment.id == null && curEdited.comment.pCommentId == comment.id)
			{
				listDiv.appendChild(curEdited.div);
				editComment(curEdited.comment, curEdited.div, curEdited.saveCallback, curEdited.deleteOnCancel);
			}
		}

		return cdiv;
	};

	if (!readOnly)
	{
		var addLink = link.cloneNode();
		addLink.innerHTML = '<div class="geSprite geSprite-plus" style="display:inline-block;"></div>';
		addLink.setAttribute('title', mxResources.get('create') + '...');
		
		mxEvent.addListener(addLink, 'click', function(evt)
		{
			var newComment = editorUi.newComment('', editorUi.getCurrentUser());
			var newCommentDiv = addComment(newComment, comments, null, 0);
			
			function doAddComment()
			{
				editComment(newComment, newCommentDiv, function(newComment)
				{
					showBusy(newCommentDiv);
					
					editorUi.addComment(newComment, function(id)
					{
						newComment.id = id;
						comments.push(newComment);
						showDone(newCommentDiv);
					}, function(err)
					{
						showError(newCommentDiv);
						doAddComment();
						editorUi.handleError(err, null, null, null,
							mxUtils.htmlEntities(mxResources.get('objectNotFound')));
					});
				}, true);
			}
			
			doAddComment();
			evt.preventDefault();
			mxEvent.consume(evt);
		});
		
		ldiv.appendChild(addLink);
	}

	var resolvedLink = link.cloneNode();
	resolvedLink.innerHTML = '<img class="geAdaptiveAsset" src="' + IMAGE_PATH + '/check.png" style="width: 16px; padding: 2px;">';
	resolvedLink.setAttribute('title', mxResources.get('showResolved'));
	resolvedLink.className = 'geButton';
	var resolvedChecked = false;
	
	mxEvent.addListener(resolvedLink, 'click', function(evt)
	{
		resolvedChecked = !resolvedChecked;
		
		this.className = resolvedChecked? 'geButton geCheckedBtn' : 'geButton';
		refresh();
		
		evt.preventDefault();
		mxEvent.consume(evt);
	});
	
	ldiv.appendChild(resolvedLink);
	
	if (editorUi.commentsRefreshNeeded())
	{
		var refreshLink = link.cloneNode();
		refreshLink.innerHTML = '<img class="geAdaptiveAsset" src="' + IMAGE_PATH + '/update16.png" style="width: 16px; padding: 2px;">';
		refreshLink.setAttribute('title', mxResources.get('refresh'));
		refreshLink.className = 'geButton';
		
		mxEvent.addListener(refreshLink, 'click', function(evt)
		{
			refresh();
			
			evt.preventDefault();
			mxEvent.consume(evt);
		});
		
		ldiv.appendChild(refreshLink);
	}
	
	if (editorUi.commentsSaveNeeded())
	{
		var saveLink = link.cloneNode();
		saveLink.innerHTML = '<img src="' + IMAGE_PATH + '/save.png" style="width: 20px; padding: 2px;">';
		saveLink.setAttribute('title', mxResources.get('save'));
		saveLink.className = 'geButton geAdaptiveAsset';
		
		mxEvent.addListener(saveLink, 'click', function(evt)
		{
			saveCallback();
			
			evt.preventDefault();
			mxEvent.consume(evt);
		});
		
		ldiv.appendChild(saveLink);
	}

	div.appendChild(ldiv);	

	var comments = [];

	var refresh = mxUtils.bind(this, function()
	{
		this.hasError = false;
		
		if (curEdited != null)
		{
			try
			{
				curEdited.div = curEdited.div.cloneNode(true);
				var commentEditTxt = curEdited.div.querySelector('.geCommentEditTxtArea');
				var commentEditBtns = curEdited.div.querySelector('.geCommentEditBtns');
				
				curEdited.comment.content = commentEditTxt.value;
				commentEditTxt.parentNode.removeChild(commentEditTxt);
				commentEditBtns.parentNode.removeChild(commentEditBtns);
			}
			catch (e)
			{
				editorUi.handleError(e);
			}
		}
		
		listDiv.innerHTML = '<div style="padding-top:10px;text-align:center;"><img src="' + IMAGE_PATH + '/spin.gif" valign="middle"> ' +
			mxUtils.htmlEntities(mxResources.get('loading')) + '...</div>';
		
		canReplyToReplies = editorUi.canReplyToReplies();
		
		if (editorUi.commentsSupported())
		{
			editorUi.getComments(function(list)
			{
				function sortReplies(replies)
				{
					if (replies != null)
					{
						//Sort replies old to new
						replies.sort(function(r1, r2)
						{
							return new Date(r1.modifiedDate) - new Date(r2.modifiedDate);
						});
						
						for (var i = 0; i < replies.length; i++)
						{
							sortReplies(replies[i].replies);
						}						
					}
				};
				
				//Sort comments old to new
				list.sort(function(c1, c2)
				{
					return new Date(c1.modifiedDate) - new Date(c2.modifiedDate);
				});

				listDiv.innerText = '';
				listDiv.appendChild(noComments);
				noComments.style.display = 'block';
				comments = list;
				
				for (var i = 0; i < comments.length; i++)
				{
					sortReplies(comments[i].replies);
					addComment(comments[i], comments, null, 0, resolvedChecked);
				}
				
				//New comment case
				if (curEdited != null && curEdited.comment.id == null && curEdited.comment.pCommentId == null)
				{
					listDiv.appendChild(curEdited.div);
					editComment(curEdited.comment, curEdited.div, curEdited.saveCallback, curEdited.deleteOnCancel);
				}
				
			}, mxUtils.bind(this, function(err)
			{
				listDiv.innerHTML = mxUtils.htmlEntities(mxResources.get('error') + (err && err.message? ': ' + err.message : ''));
				this.hasError = true;
			}));
		}
		else
		{
			//TODO if comments are not supported, close the dialog
			listDiv.innerHTML = mxUtils.htmlEntities(mxResources.get('error'));
		}
	});

	refresh();
	
	this.refreshComments = refresh;

	//Refresh the modified date of each comment if the window is visible
	var refreshCommentsTime = mxUtils.bind(this, function()
	{
		if (!this.window.isVisible()) return; //only update if it is visible
		
		var modDateDivs = listDiv.querySelectorAll('.geCommentDate');
		var modDateDivsMap = {};
		
		for (var i = 0; i < modDateDivs.length; i++)
		{
			var div = modDateDivs[i];
			modDateDivsMap[div.getAttribute('data-commentId')] = div;
		}
		
		function processComment(comment) 
		{
			var div = modDateDivsMap[comment.id];
			
			if (div == null) return; //resolved comments
			
			writeCommentDate(comment, div);
			
			for (var i = 0; comment.replies != null && i < comment.replies.length; i++)
			{
				processComment(comment.replies[i]);
			}
		};
		
		for (var i = 0; i < comments.length; i++)
		{
			processComment(comments[i]);
		}
	});

	//Periodically refresh time every one minute
	setInterval(refreshCommentsTime, 60000);
	this.refreshCommentsTime = refreshCommentsTime;
	
	this.window = new mxWindow(mxResources.get('comments'), div, x, y, w, h, true, true);
	this.window.minimumSize = new mxRectangle(0, 0, 260, 200);
	this.window.destroyOnClose = false;
	this.window.setMaximizable(false);
	this.window.setResizable(true);
	this.window.setClosable(true);
	this.window.setVisible(true);
	
	this.window.addListener(mxEvent.SHOW, mxUtils.bind(this, function()
	{
		this.window.fit();
	}));
	
	editorUi.installResizeHandler(this, true);
};

/**
 * 
 */
var ConfirmDialog = function(editorUi, message, okFn, cancelFn, okLabel, cancelLabel,
		okImg, cancelImg, showRememberOption, imgSrc, maxHeight)
{
	var div = document.createElement('div');
	div.style.textAlign = 'center';
	maxHeight = (maxHeight != null) ? maxHeight : 44;
	
	var p2 = document.createElement('div');
	p2.style.padding = '6px';
	p2.style.overflow = 'auto';
	p2.style.maxHeight = maxHeight + 'px';
	p2.style.lineHeight = '1.2em';
	
	mxUtils.write(p2, message);
	div.appendChild(p2);
	
	if (imgSrc != null)
	{
		var p3 = document.createElement('div');
		p3.style.padding = '6px 0 6px 0';
		var img = document.createElement('img');
		img.setAttribute('src', imgSrc);
		p3.appendChild(img);
		div.appendChild(p3);
	}
	
	var btns = document.createElement('div');
	btns.style.textAlign = 'center';
	btns.style.whiteSpace = 'nowrap';

	var cb = document.createElement('input');
	cb.setAttribute('type', 'checkbox');

	var cancelBtn = mxUtils.button(cancelLabel || mxResources.get('cancel'), function()
	{
		editorUi.hideDialog();
		
		if (cancelFn != null)
		{
			cancelFn(cb.checked);
		}
	});
	cancelBtn.className = 'geBtn';
	
	if (cancelImg != null)
	{
		cancelBtn.innerHTML = cancelImg + '<br>' + cancelBtn.innerHTML;
		cancelBtn.style.paddingBottom = '8px';
		cancelBtn.style.paddingTop = '8px';
		cancelBtn.style.height = 'auto';
		cancelBtn.style.width = '40%';
	}
	
	if (editorUi.editor.cancelFirst)
	{
		btns.appendChild(cancelBtn);
	}
	
	var okBtn = mxUtils.button(okLabel || mxResources.get('ok'), function()
	{
		editorUi.hideDialog();
		
		if (okFn != null)
		{
			okFn(cb.checked);
		}
	});
	btns.appendChild(okBtn);
	
	if (okImg != null)
	{
		okBtn.innerHTML = okImg + '<br>' + okBtn.innerHTML + '<br>';
		okBtn.style.paddingBottom = '8px';
		okBtn.style.paddingTop = '8px';
		okBtn.style.height = 'auto';
		okBtn.className = 'geBtn';
		okBtn.style.width = '40%';
	}
	else
	{
		okBtn.className = 'geBtn gePrimaryBtn';
	}
	
	if (!editorUi.editor.cancelFirst)
	{
		btns.appendChild(cancelBtn);
	}

	div.appendChild(btns);
	
	if (showRememberOption)
	{
		btns.style.marginTop = '10px';
		var p2 = document.createElement('p');
		p2.style.marginTop = '20px';
		p2.style.marginBottom = '0px';
		p2.appendChild(cb);
		var span = document.createElement('span');
		mxUtils.write(span, ' ' + mxResources.get('rememberThisSetting'));
		p2.appendChild(span);
		div.appendChild(p2);
		
		mxEvent.addListener(span, 'click', function(evt)
		{
			cb.checked = !cb.checked;
			mxEvent.consume(evt);
		});
	}
	else
	{
		btns.style.marginTop = '12px';
	}

	this.init = function()
	{
		okBtn.focus();
	};
	
	this.container = div;
};

/**
 * Headless Editor UI class for offscreen editor instances.
 */
var HeadlessEditorUi = function()
{
	EditorUi.call(this, new Editor(true), document.createElement('div'), true);
};

/**
 * Extends EditorUi.
 */
mxUtils.extend(HeadlessEditorUi, EditorUi);

/**
 * Avoid creating UI and event listeners.
 */
HeadlessEditorUi.prototype.createUi = function() {};
HeadlessEditorUi.prototype.addTrees = function() {};
HeadlessEditorUi.prototype.onBeforeUnload = function() {};
HeadlessEditorUi.prototype.updateActionStates = function() {};
