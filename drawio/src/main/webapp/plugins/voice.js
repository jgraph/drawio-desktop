/**
 * Copyright (c) 2006-2015, JGraph Ltd
 * Copyright (c) 2006-2015, Gaudenz Alder
 */
/**
 * Voice plugin for draw.io
 * 
 * Documentation:
 * 
 * https://www.drawio.com/doc/faq/voice-plugin
 * 
 * TODO: Use grammer https://msdn.microsoft.com/en-us/library/ee800145.aspx
 */
Draw.loadPlugin(function(ui) {
	// Speech recognition never supported without synthesis 
	if (!('speechSynthesis' in window))
	{
		ui.showError('Error', 'Speech output not supported in this browser.', 'OK');
		
		return;
	}
	else
	{
		// Triggers loading of voices
		speechSynthesis.getVoices();
	}
	
	// Do no use in chromeless mode
	if (ui.editor.isChromelessView())
	{
		return;
	}

	// Mic PNG image
	var outputImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBNDU1RDkxODcxREIxMUU0OTU3Qjg3REYyOTYxQzc0QiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBNDU1RDkxOTcxREIxMUU0OTU3Qjg3REYyOTYxQzc0QiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkE0NTVEOTE2NzFEQjExRTQ5NTdCODdERjI5NjFDNzRCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkE0NTVEOTE3NzFEQjExRTQ5NTdCODdERjI5NjFDNzRCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+QsVUnQAAAX5JREFUeNqck00oRFEUx+eNyYSFUj7KgpfPBUlJWZgFw3IWihpRFpZia4e1hZSlNDsLopSNfBTFQqSwkKmZ5SA2ylfq+Z3pXL15ehlu/fqf9849555777mW4ziBfEZ9rd2InEEsmU4dmP/WHxKEkT1oglaSZOR/0DvRssIVUOQKjEASsxoGoQDmjT/oDUaOdRUzbkASrsMdzMIwSe2cBASXIjtQpyvHYQvzGeLQDkOwDG8w8p2A4GJEJre5Vk5DFBbZ7yG6D+PYL3oW0WwCgh/Re4i4t8PEE2QOxqikDN2AbuwQKr4WU4E4S3wOfw1CWtktFEI5ZDTu5y34DMvPIQl24dTHL9f2CRfQAB/wAFXwlE3gOO990Im95GmcLmQGEpyHTB6AI2xJKL4r7xYmYdX1betpT0kzoT1yhdhyY71aeW4rcyNySJswTVWXWkklcq5N1AETsCAuqkn9+hZ09RXoh1e4hm2CR//7mJqlB8xjCgXyHzXaDzETLONLgAEAxwd5e6Mz+S4AAAAASUVORK5CYII=';
	var micImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA5UlEQVR4Xr3SMYrCQBTGcSfIQiAgRIS9hOANBCurPUAuIAp7A7FVsFkIbLGYA9gKtoKNYG3jll5AFNKG518YMD6SISD4wY9J4MvkMYwRkZqOMSZkifGFe1b4pnvW3TqK8oMo14twxUgXPRSlDxU7TcUNPqATlG7wCi93cA2Iq2x7l7IJsgofB6UTiEjKklFqsabQSdFA5jqDAzrYQGeNNv5d9yDBEAME6NreFmP8Yuma4A8hFpiLSFNAYYYYn0jwCIUnxMcER4h1whS+7hseXKcu9ifGeQ+qeO8GjN7DPve+Q6+oewPhmE63Qfsb6AAAAABJRU5ErkJggg==';
	
	// True if we're on ChromOs
	var chromeOs = mxClient.IS_CHROMEOS;
	
	// Maximum length of message to speak
	var maxMessageLength = 1000;

	// Maximum length of the label before the cell
	// is called by its shapename
	var maxLabelLength = 15;

	// Maximum length of output queue.
	var maxQueueLength = 3;

	// Specifies if speech output is enabled.
	var speechOutputEnabled = true;

	// Specifies if speech output is enabled.
	var speechInputEnabled = true;
	
	// Last message is never repeated
	var lastMessage = null;
	
	// Timestamp of last message
	var lastMessageTimestamp = null;
	
	// Sets global recognition language
	var lang = 'en-US';
	
	// Caches action names
	var actions = null;
	var actionList = null;
	
	// Caches shape names
	var shapeList = null;
	
	// Last inserted cell
	var lastInserted = null;
	
	// Current voice
	var currentVoice = 10;
	
	// Current recognition thread
	var recognizing = null;

	// Adds menu
	mxResources.parse('voiceType=Voice Type');
	mxResources.parse('speechOutput=Speech Output');
	mxResources.parse('speechListen=Listen');
	mxResources.parse('speechInstalled=Start with draw.io');
	mxResources.parse('speechListenContinuous=Start/Stop Listen');
	mxResources.parse('speechHint=Hint');
	mxResources.parse('speechHelp=Help');
	mxResources.parse('speechQuit=Quit');
	
	// Installs footer click handler
	function getOrCreateVoiceButton(ui)
	{
		if (ui.voiceButton == null)
		{
			ui.voiceButton = document.createElement('div');
			ui.voiceButton.className = 'geBtn';
			ui.voiceButton.style.width = '140px';
			ui.voiceButton.style.minWidth = '140px';
			ui.voiceButton.style.textOverflow = 'ellipsis';
			ui.voiceButton.style.overflowX = 'hidden';
			ui.voiceButton.style.fontWeight = 'bold';
			ui.voiceButton.style.textAlign = 'center';
			ui.voiceButton.style.display = 'inline-block';
			ui.voiceButton.style.padding = '0 10px 0 10px';
			ui.voiceButton.style.marginTop = '-4px';
			ui.voiceButton.style.height = '28px';
			ui.voiceButton.style.lineHeight = '28px';
			ui.voiceButton.style.color = '#235695';
			
			if (ui.buttonContainer.firstChild != null)
			{
				ui.buttonContainer.insertBefore(ui.voiceButton, ui.buttonContainer.firstChild);
			}
			else
			{
				ui.buttonContainer.appendChild(ui.voiceButton);
			}
		}
		
		return ui.voiceButton;
	};
	
	var td = getOrCreateVoiceButton(ui);
	
	if (td != null)
	{
		mxEvent.addGestureListeners(td, function(evt)
		{
			ui.editor.graph.popupMenuHandler.hideMenu();
			
			if (ui.menubar == null && mxEvent.isPopupTrigger(evt))
			{
				ui.editor.graph.popupMenuHandler.hideMenu();
				var menu = new mxPopupMenu(ui.menus.get('voice').funct);
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
		
				var offset = mxUtils.getOffset(td);
				menu.popup(offset.x, offset.y + td.offsetHeight, null, evt);
				
				// Allows hiding by clicking on document
				ui.setCurrentMenu(menu);
				mxEvent.consume(evt);
			}
		}, null, function(evt)
		{
			if (!mxEvent.isPopupTrigger(evt))
			{
				if (speechSynthesis.speaking)
				{
					speechSynthesis.cancel();
				}
				
				App.listen(true);
			}

			mxEvent.consume(evt);
		});
		
		mxEvent.disableContextMenu(td);
	}
	
	function setPluginInstalled(value)
	{
		if (mxSettings != null)
		{
	    	var plugins = mxSettings.getPlugins();
	    	var installed = mxUtils.indexOf(plugins, '/plugins/voice.js') >= 0;
	    	
	    	if (value != installed)
	    	{
		    	if (installed)
		    	{
		    		mxUtils.remove('/plugins/voice.js', plugins);
		    	}
		    	else
		    	{
		    		plugins.push('/plugins/voice.js');
		    	}
		    	
				mxSettings.setPlugins(plugins);
				mxSettings.save();
	    	}
		}
	};
	
	// Shows initial status message if only output is enable
	if (!('webkitSpeechRecognition' in window))
	{
		if (td != null)
		{
			td.innerHTML = '<img style="margin-right:4px;" align="absmiddle" border="0" src="' + outputImage + '"/> Ready';
			td.style.color = '#235695';
		}
	}
	
	function updateStatusMessage()
	{
		if ('webkitSpeechRecognition' in window)
		{
			if (td != null)
			{
				if (recognizing != null)
				{
	    			td.innerHTML = '<img style="margin-right:4px;" align="absmiddle" border="0" src="' + micImage + '"/> Listening...';
					td.setAttribute('title', 'Click to Stop (' + Editor.ctrlKey + '+O)');
	    			td.style.color = 'darkGray';
				}
				else
				{
					td.innerHTML = '<img style="margin-right:4px;" align="absmiddle" border="0" src="' + micImage + '"/> Click to Speak';
					td.setAttribute('title', 'Click to Speak (' + Editor.ctrlKey + '+O)');
					td.style.color = '#235695';
				}
			}
		}
	};
	
	updateStatusMessage();
	
    var action = ui.actions.addAction('speechOutput', function()
    {
    	speechOutputEnabled = !speechOutputEnabled;
    }, null, null, 'Ctrl/AltGr+Shift+Esc');
	action.setToggleAction(true);
	action.setSelectedCallback(function() { return speechOutputEnabled; });
	
    var action = ui.actions.addAction('speechInstalled', function()
    {
    	setPluginInstalled();
    });
	action.setToggleAction(true);
	action.setSelectedCallback(function() { return mxUtils.indexOf(mxSettings.getPlugins(), '/plugins/voice.js') >= 0; });
	
    ui.actions.addAction('speechListen', function()
    {
    	App.listen();
    }, null, null, 'Ctrl/AltGr+Esc');
	
    ui.actions.addAction('speechListenContinuous', function()
    {
    	App.listen(true);
    }, null, null, Editor.ctrlKey + '+O');
	
    ui.actions.addAction('speechHint', function()
    {
    	App.sayHint();
    }, null, null, 'Shift+Esc');
	
    ui.actions.addAction('speechHelp', function()
    {
    	window.open('https://www.drawio.com/doc/faq/voice-plugin');
    });

    // Hijacks the settings for storing current voice
	if (mxSettings != null)
	{
	    var tmp = mxSettings.settings.voice;
	    
	    if (tmp != null)
	    {
	    	currentVoice = parseInt(tmp);
	    }
	}
    
	ui.menus.put('voiceType', new Menu(mxUtils.bind(this, function(menu, parent)
	{
		var voices = speechSynthesis.getVoices();
		
		if (voices.length == 0)
		{
			menu.addItem('Loading...', null, function() {}, parent, null, false);
		}
		else
		{
			for (var i = 0; i < voices.length; i++)
			{
				(function(index)
				{
					var item = menu.addItem(voices[index].name + ' (' + voices[i].lang + ')', null, function()
					{
						currentVoice = index;
						App.say('hello');
					    
						if (mxSettings != null)
						{
							mxSettings.settings.voice = currentVoice;
							mxSettings.save();
						}
					}, parent);
					
					if (index == currentVoice)
					{
						menu.addCheckmark(item, Editor.checkmarkImage);
					}
				})(i);
			}
			
			parent.div.style.overflowX = 'hidden';
			parent.div.style.overflowY = 'auto';
			parent.div.style.maxHeight = '100%';
			// Workaround for document scrollbars with 100% max height in Chrome
			parent.div.style.marginBottom = '-20px';
		}
	})));
	
    ui.actions.addAction('speechQuit', function()
    {
    	// Hides UI
    	speechOutputEnabled = false;
    	td.style.display = 'none';
    	
    	if (menu != null)
    	{
    		menu.style.display = 'none';
    	}
    });
    
	ui.menus.put('voice', new Menu(function(menu, parent)
	{
    	ui.menus.addSubmenu('voiceType', menu, parent);
		ui.menus.addMenuItems(menu, ['-', 'speechOutput', 'speechHint', '-', 'speechListen',
            'speechListenContinuous', '-', 'speechInstalled',
            'speechHelp', '-', 'speechQuit']);
	}));

    if (ui.menubar != null)
    {
		var menu = ui.menubar.addMenu('Voice', ui.menus.get('voice').funct);
		
		// Inserts voice menu before help menu
		menu.parentNode.insertBefore(menu, menu.previousSibling.previousSibling.previousSibling);
    }
		
	function insertShape(shape, done)
	{
		var searchTerm = mxUtils.trim(shape);
		
		ui.sidebar.searchEntries(searchTerm, 1, 0, function(results, len, more)
		{
			if (results.length > 0)
			{
				var elt = results[0]();
				
				// Click is blocked, must use mousedown/-up sequence
				// LATER: Use touchstart or pointerEvents depending on system
				dispatchEvent(elt, mouseEvent('mousedown', 1, 50, 1, 50));
				dispatchEvent(document.body, mouseEvent('mouseup', 1, 50, 1, 50));
			}
			else
			{
				App.say('{1} not found', [searchTerm]);
			}
			
			if (done != null)
			{
				done();
			}
		});
	};
	
	// http://stackoverflow.com/questions/11919065/sort-an-array-by-the-levenshtein-distance-with-best-performance-in-javascript
	//http://www.merriampark.com/ld.htm, http://www.mgilleland.com/ld/ldjavascript.htm, Damerau–Levenshtein distance (Wikipedia)
	var levenshteinDist = function(s, t) {
	    var d = []; //2d matrix

	    // Step 1
	    var n = s.length;
	    var m = t.length;

	    if (n == 0) return m;
	    if (m == 0) return n;

	    //Create an array of arrays in javascript (a descending loop is quicker)
	    for (var i = n; i >= 0; i--) d[i] = [];

	    // Step 2
	    for (var i = n; i >= 0; i--) d[i][0] = i;
	    for (var j = m; j >= 0; j--) d[0][j] = j;

	    // Step 3
	    for (var i = 1; i <= n; i++) {
	        var s_i = s.charAt(i - 1);

	        // Step 4
	        for (var j = 1; j <= m; j++) {

	            //Check the jagged ld total so far
	            if (i == j && d[i][j] > 4) return n;

	            var t_j = t.charAt(j - 1);
	            var cost = (s_i == t_j) ? 0 : 1; // Step 5

	            //Calculate the minimum
	            var mi = d[i - 1][j] + 1;
	            var b = d[i][j - 1] + 1;
	            var c = d[i - 1][j - 1] + cost;

	            if (b < mi) mi = b;
	            if (c < mi) mi = c;

	            d[i][j] = mi; // Step 6

	            //Damerau transposition
	            if (i > 1 && j > 1 && s_i == t.charAt(j - 2) && s.charAt(i - 2) == t_j) {
	                d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + cost);
	            }
	        }
	    }

	    // Step 7
	    return d[n][m];
	}
	
	function naiveHammingDistance(str1, str2) {
	    var dist = 0;

	    str1 = str1.toLowerCase();
	    str2 = str2.toLowerCase();

	     for(var i = 0; i < str1.length; i++)
	     {
	        if (str2[i] && str2[i] !== str1[i])
	        {
	            dist += Math.abs(str1.charCodeAt(i) - str2.charCodeAt(i)) + Math.abs(str2.indexOf( str1[i] )) * 2;
	        } 
	        else if (!str2[i])
	        {
	            //  If there's no letter in the comparing string
	            dist += dist;
	        }
	    }

	    return dist;
	};
	
	function getBestWord(str1, words, useLevenshteinDist)
	{
		if (words == null || words.length == 0)
		{
			return str1;
		}
		
		useLevenshteinDist = (useLevenshteinDist != null) ? useLevenshteinDist : true;
		
	    var bestWord = words[0];
	    var minDist = ((useLevenshteinDist) ? levenshteinDist(str1, bestWord) :
	    		naiveHammingDistance(str1, bestWord));
	    
	    for (var i = 1; i < words.length; i++)
	    {
		    	var tmp = ((useLevenshteinDist) ? levenshteinDist(str1, words[i]) :
		    		((str1 == words[i]) ? 0 : naiveHammingDistance(str1, words[i])));
		    	
		    	if (tmp < minDist || (tmp == minDist &&
		    		str1.length > bestWord.length &&
		    		bestWord.length < words[i].length))
		    	{
		    		bestWord = words[i];
		    		minDist = tmp;
		    	}
		    	
		    	if (bestWord == str1)
		    	{
		    		break;
		    	}
	    }
	    
	    return bestWord;
	}
	
	function mouseEvent(type, sx, sy, cx, cy, shift)
	{
	  var evt;
	  var e = {
	    bubbles: true,
	    cancelable: (type != "mousemove"),
	    view: window,
	    detail: 0,
	    screenX: sx, 
	    screenY: sy,
	    clientX: cx, 
	    clientY: cy,
	    ctrlKey: false,
	    altKey: false,
	    shiftKey: (shift != null) ? shift : false,
	    metaKey: false,
	    button: 0,
	    relatedTarget: undefined
	  };
	  
	  if (typeof( document.createEvent ) == "function")
	  {
	    evt = document.createEvent("MouseEvents");
	    evt.initMouseEvent(type, 
	      e.bubbles, e.cancelable, e.view, e.detail,
	      e.screenX, e.screenY, e.clientX, e.clientY,
	      e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
	      e.button, document.body.parentNode);
	  }
	  else if (document.createEventObject)
	  {
	    evt = document.createEventObject();
	    for (prop in e)
	    {
	    	evt[prop] = e[prop];
	    }
	  
	    evt.button = { 0:1, 1:4, 2:2 }[evt.button] || evt.button;
	  }
	  
	  return evt;
	};
	
	function dispatchEvent (el, evt)
	{
	  if (el.dispatchEvent)
	  {
	    el.dispatchEvent(evt);
	  }
	  else if (el.fireEvent)
	  {
	    el.fireEvent('on' + type, evt);
	  }
	  
	  return evt;
	};
	
	var keyHandlerEscape = ui.keyHandler.escape;
	ui.keyHandler.escape = function(evt)
	{
		if ((!mxClient.IS_MAC && mxEvent.isAltDown(evt)) ||
			((mxClient.IS_MAC || chromeOs) && mxEvent.isControlDown(evt)))
		{
			if (speechOutputEnabled)
			{
				App.say('Speech output disabled');
			}
			
			speechOutputEnabled = !speechOutputEnabled;
			
			if (speechOutputEnabled)
			{
				App.say('Speech output enabled');
			}
			
			mxEvent.consume(evt);
		}
		else if (mxEvent.isShiftDown(evt))
		{
			App.sayHint();
			mxEvent.consume(evt);
		}
		else
		{
			keyHandlerEscape.apply(this, arguments);
		}
	};

	ui.keyHandler.bindAction(32, true, 'speechListen'); // Ctrl+SPACE
	ui.keyHandler.bindAction(79, true, 'speechListenContinuous'); // Ctrl+O
	
	/**
	 * Plays a beep.
	 */
	var beep = new Audio('data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=');
	var beep2 = new Audio('data:audio/wav;base64,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');

	App.beep = function(wav)
	{
		wav = (wav != null) ? wav : beep;
		
    	wav.play();
	};
	
	// Thread to reset the label
	var resetStatus = null;

	/**
	 * 
	 * Static method for speech output.
	 */
	App.say = function(message, params)
	{
		if ('speechSynthesis' in window && message != null)
		{
			var text = mxResources.replacePlaceholders(message, params || []);
			lastMessageTimestamp = null;
			lastMessage = text;
			
			if (text != null && text.length > 0)
			{
				if (td != null)
				{
					var tmp = text;
					
		    		// Capitalize string
		    		if (tmp != null && tmp.length > 1)
		    		{
		    			tmp = tmp.charAt(0).toUpperCase() + tmp.slice(1);
		    		}
		    		
					td.innerHTML = ((speechOutputEnabled) ? '<img style="margin-right:4px;" align="absmiddle" border="0" src="' +
							outputImage + '"/>' : '') + ' ' + tmp;
		    		td.style.color = '#235695';
					
					if (resetStatus != null)
					{
						window.clearTimeout(resetStatus);
						resetStatus = null;
					}
	
					resetStatus = window.setTimeout(function()
					{
						updateStatusMessage();
					}, (recognizing != null) ? 1000 : 3000);
				}
				
				// Workaround for talking too much
				if (speechOutputEnabled && (!speechSynthesis.speaking || !speechSynthesis.pending))
				{
					if (text.length < maxMessageLength)
					{
						var msg = new SpeechSynthesisUtterance();
	
						// Picks random voice with same main locale
						var voices = speechSynthesis.getVoices();
	
						// Say "again" for same last message except more than 10 secs ago or shorter than again
						if (lastMessageTimestamp != null && text == lastMessage && text != null &&
							text.length > 5 && lastMessage != 'again')
						{
							if (lastMessageTimestamp != null && 
								new Date().getTime() - lastMessageTimestamp.getTime() < 10000)
							{
								text = 'repeat';
							}
						}
	
						msg.voice = voices[currentVoice];
						msg.voiceURI = 'native';
						//msg.lang = lang;
						msg.text = text;
	
						console.log('App.say speak:', msg.text);
						speechSynthesis.speak(msg);
						
						lastMessageTimestamp = new Date();
					}
					else
					{
						console.log('App.say ignored:', text);
					}
				}
				else
				{
					console.log('App.say skipped:', message);
				}
			}
		}
	};

	/**
	 * Static method for speech output.
	 */
	App.listen = function(continuous)
	{
		if ('webkitSpeechRecognition' in window && speechInputEnabled)
		{
			if (recognizing != null)
			{
				recognizing.stop();
			}
			else
			{
				var recognition = new webkitSpeechRecognition();
				recognition.interimResults = true;
				
				// TODO: Should use grammar instead of trying more alternatives
				recognition.maxAlternatives = 5;
				
				recognition.lang = lang;
				
				if (continuous != null)
				{
					recognition.continuous = continuous;
				}
				
				recognition.onstart = function(event)
				{
					updateStatusMessage();
					App.beep();
				};
		    		
				recognition.onresult = function(event)
				{
				    for (var i = event.resultIndex; i < event.results.length; ++i)
				    {
			    		if (td != null)
			    		{
			    			td.innerHTML = '<img style="margin-right:4px;" align="absmiddle" border="0" src="' + micImage +
			    				'"/> ' + event.results[i][0].transcript;
			    			td.style.color = (event.results[i].isFinal) ? '#235695' : 'darkGray';
			    		}
			    		
				    	if (event.results[i].isFinal)
				    	{
				    		var ok = false;
				    		
				    		for (var j = 0; j < event.results[i].length; j++)
				    		{
				    			if (App.executeVoiceCommand(event.results[i][j].transcript, recognition))
				    			{
				    				ok = true;
				    				break;
				    			}
				    		}
				    		
				    		if (!ok)
				    		{
								App.say('{1} not found', [event.results[i][0].transcript]);
				    		}

							if (td != null)
							{
								if (resetStatus != null)
								{
									window.clearTimeout(resetStatus);
									resetStatus = null;
								}

								resetStatus = window.setTimeout(function()
								{
									updateStatusMessage();
								}, 1000);
							}
				    	}
				    }
				};
	
				recognition.onend = function(event)
				{
					// Overrides footer
					recognizing = null;
					updateStatusMessage();
					App.beep(beep2);
				};
				
				recognition.start();
				recognizing = recognition;
			}
		}
		else
		{
			speechOutputEnabled = !speechOutputEnabled;
			lastMessageTimestamp = null;			
			App.say(lastMessage || 'Ready');
			lastMessageTimestamp = null;
		}
	};
	
	/**
	 * Executes the given voice command.
	 */
	App.executeVoiceCommand = function(command, recognition)
	{
	    console.log('App.execute:', mxUtils.trim(command));
	    var tokens = mxUtils.trim(command).split(' ');
	    
	    if (tokens.length > 0 && graph.isEnabled())
	    {
		    // Ask for Mic permissions
		    // FIXME: Dialog seems to be hidden until tab is changed
		    function resolveStylename(token, styles)
		    {
				var tmp = token.toLowerCase().replace(/ /g, '');
		    	var style = null;
		    	
		    	for (var i = 0; i < styles.length; i++)
		    	{
		    		if (styles[i].toLowerCase() == tmp)
		    		{
		    			style = styles[i];
		    			break;
		    		}
		    	}
		    	
		    	return style;
		    };
		    
		    // Main command
		    tokens[0] = tokens[0].toLowerCase();

		    // TODO: Use hamming distance for best match command but include all possible actions
		    // which might be too slow
		    // console.log('connect', naiveHammingDistance(tokens[0], 'connect'), naiveHammingDistance('disable', 'connect'), naiveHammingDistance('change', 'connect'));
		    
		    if (graph.isEditing())
		    {
		    	if (tokens.length == 1 && tokens[0] == 'apply')
			    {
		    		graph.stopEditing();
			    }
		    	else if (tokens.length == 1 && tokens[0] == 'undo')
			    {
		    		document.execCommand('undo', false, null);
			    }
		    	else if (tokens.length == 1 && tokens[0] == 'redo')
			    {
		    		document.execCommand('redo', false, null);
			    }
		    	else
		    	{
		    		document.execCommand('insertHTML', false, command);
		    	}
		    	
		    	return true;
		    }
		    else if (tokens[0] == 'edit' && tokens[1] == 'text')
		    {
				var cells = graph.getSelectionCells();
		    	
		    	if (cells.length == 1)
		    	{
		    		graph.startEditingAtCell(cells[0]);
		    	}
		    	
		    	return true;
		    }
		    else if (tokens[0] == 'hello' || tokens[0] == 'hi')
			{
				App.say('Hello! Try "Help", "Help Topic" or "Quick Start".');
				
		    	return true;
			}
			else if (tokens[0] == 'help')
			{
				var wnd = ui.openLink('https://www.drawio.com/doc/faq/voice-plugin');
				
				if (wnd == null)
				{
					App.say('Popup blocked');
				}
				else if (tokens.length > 1)
				{
					// Just used to check if popup windows are allowed
					wnd.close();
					var searchTerm = mxUtils.trim(command.substring(tokens[0].length));
					
					if (searchTerm !=  null && searchTerm.length > 0)
					{
						ui.openLink('https://www.google.com/search?q=site%3Adiagrams.net+inurl%3A%2Fdoc%2Ffaq%2F+' +
							encodeURIComponent(searchTerm));
						App.say(command);
					}
				}
				else
				{
					App.say('help');
				}
				
		    	return true;
			}
			else if ((tokens[0] == 'info' && tokens.length == 1) || mxUtils.trim(command).toLowerCase() == 'what\'s this')
			{
				App.sayHint();
				
		    	return true;
			}
			else if (tokens[0] == 'install' && tokens.length == 1)
			{
				setPluginInstalled(true);
				App.say('Installed');
				
		    	return true;
			}
			else if (tokens[0] == 'uninstall' && tokens.length == 1)
			{
				setPluginInstalled(false);
				App.say('Uninstalled');
				
		    	return true;
			}
			else if (tokens[0] == 'quick' && tokens.length > 0 && tokens[1].toLowerCase() == 'start')
			{
				var wnd = window.open('https://youtu.be/8OaMWa4R1SE?t=1');
				
				if (wnd == null)
				{
					App.say('Popup blocked');
				}
				
		    	return true;
			}
			else if (tokens[0] == 'search' && tokens.length > 1)
			{
				var searchToken = tokens.slice(1, tokens.length).join(' ').toLowerCase();
				var wnd = window.open('https://www.google.ch/search?q=' + encodeURIComponent(searchToken) + '&tbm=isch', 'voicePluginSearchResult');

				if (wnd == null)
				{
					App.say('Popup blocked');
				}
				
		    	return true;
			}
			else if (tokens[0] == 'shrink')
			{
	    		var cell = graph.getSelectionCell();
	    		var geo = graph.getCellGeometry(cell);
	    		
		    	if (graph.getModel().isVertex(cell) && geo != null)
		    	{
		    		geo = geo.clone();
		    		
		    		if (tokens.length == 1 || tokens[1] == 'height')
		    		{
		    			geo.height = graph.snap(Math.round(geo.height * 0.5));
		    		}
		    		
		    		if (tokens.length == 1 || tokens[1] != 'height')
		    		{
		    			geo.width = graph.snap(Math.round(geo.width * 0.5));
		    		}
		    		
		    		if (geo.width > graph.tolerance && geo.height > graph.tolerance)
		    		{
		    			graph.getModel().setGeometry(cell, geo);
		    			App.say('Resized');
		    		}
		    		else
			    	{
			    		App.say('Too small');
			    	}
		    	}
		    	else
		    	{
		    		App.say('No cell to resize');
		    	}
		    	
		    	return true;
			}
			else if (tokens[0] == 'double')
			{
	    		var cell = graph.getSelectionCell();
	    		var geo = graph.getCellGeometry(cell);
	    		
		    	if (graph.getModel().isVertex(cell) && geo != null)
		    	{
		    		geo = geo.clone();
		    		
		    		if (tokens.length == 1 || tokens[1] == 'height')
		    		{
		    			geo.height *= 2;
		    		}
		    		
		    		if (tokens.length == 1 || tokens[1] != 'height')
		    		{
		    			geo.width *= 2;
		    		}
		    		
		    		if (geo.width > graph.tolerance && geo.height > graph.tolerance)
		    		{
		    			graph.getModel().setGeometry(cell, geo);
		    			App.say('Resized');
		    		}
		    		else
			    	{
			    		App.say('Too small');
			    	}
		    	}
		    	else
		    	{
		    		App.say('No cell to resize');
		    	}
		    	
		    	return true;
			}
			else if (tokens[0] == 'width' || tokens[0] == 'with' || tokens[0] == 'height')
		    {
				// Try numeric stylename if last token is numeric
				var lastToken = tokens[tokens.length - 1].toLowerCase();
				
				// Fixes some special cases for recoginition of short phrases
				// like "stroke width 2" where it tries to be clever
				if (lastToken == 'tool' || lastToken == 'tune' || lastToken == 'tomb' || lastToken == 'tube')
				{
					lastToken = '2';
				}
				else if (lastToken == 'd3')
				{
					lastToken = '3';
				}
				else if (lastToken == 'v')
				{
					lastToken = '5';
				}
				else
				{
					// Converts numeric words to numbers (system only seems to return written numbers for <= 4)
					var numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
					var tmpIndex = mxUtils.indexOf(numbers, lastToken);
					
					if (tmpIndex >= 0)
					{
						lastToken = tmpIndex;
					}
				}

				var lastValue = parseFloat(tokens[1].toLowerCase());
				
				if (tokens.length >= 2 && !isNaN(lastValue))
				{
		    		var cell = graph.getSelectionCell();
		    		var geo = graph.getCellGeometry(cell);
		    		
			    	if (graph.getModel().isVertex(cell) && geo != null)
			    	{
			    		geo = geo.clone();
			    		
			    		if (tokens[0] == 'height')
			    		{
			    			geo.height = lastValue;
			    		}
			    		else
			    		{
			    			geo.width = lastValue;
			    		}
			    		
			    		graph.getModel().setGeometry(cell, geo);
			    		App.say('Resized');
			    	}
			    	else
			    	{
			    		App.say('No cell to resize');
			    	}
				}
				
		    	return true;
		    }
			else if (tokens[0] == 'insert' && tokens.length > 1)
			{
				// Fixes some common mistakes
				if (tokens[1].toLowerCase() == 'edits')
				{
					tokens[1] = 'ellipse';
				}
				
				var searchTerm = mxUtils.trim(tokens.slice(1, tokens.length).join(' '));
				var current = graph.getSelectionCell();
				
				// Clears selection to disable built-in connecting
				graph.clearSelection();
				
				insertShape(searchTerm, function()
				{
					var cell = graph.getSelectionCell();
					
					// Connects dangling edge of previously selected edge and moves cell
					if (graph.model.isVertex(cell) && graph.model.isEdge(current) &&
						(graph.model.getTerminal(current, true) == null ||
						graph.model.getTerminal(current, false) == null))
					{
						var edgeState = graph.view.getState(current);
						var vertexState = graph.view.getState(cell);
						
						if (vertexState != null && edgeState != null && edgeState.absolutePoints != null &&
							edgeState.absolutePoints.length > 1)
						{
							var source = graph.model.getTerminal(current, true) == null;
							var pts = edgeState.absolutePoints;
							var pt = pts[(source) ? 0 : pts.length - 1];
							var loc = new mxPoint(vertexState.getCenterX(), vertexState.getCenterY());

							if (loc != null && edgeState != null)
							{
								var s = graph.view.scale;
								var dx = pt.x - loc.x;
								var dy = pt.y - loc.y;
								
								// TODO: Should add insert to transaction but need absolute position
								graph.model.beginUpdate();
								try
								{
									graph.moveCells(graph.getSelectionCells(), dx / s, dy / s);
									graph.model.setTerminal(current, cell, source);
								}
								finally
								{
									graph.model.endUpdate();
								}
							}
						}
					}
				});
				
		    	return true;
			}
			else if (tokens[0] == 'connect' || tokens[0] == 'kinect' || (tokens[0] == 'clone' && tokens.length > 1))
		    {
	    		var cell = graph.getSelectionCell();
	    		
		    	if (graph.getModel().isVertex(cell))
		    	{
			    	// Uses east direction if token not understood
			    	var direction = mxConstants.DIRECTION_EAST;
			    	
			    	if (tokens.length > 1)
			    	{
			    		tokens[1] = tokens[1].toLowerCase();
	
			    		// Guessing direction based on minimum hamming distance for given set
			    		var guess = getBestWord(tokens[1], ['up', 'left', 'down', 'right', 'north', 'south', 'east', 'west']);
	
				    	if (guess == 'up' || guess == mxConstants.DIRECTION_NORTH)
				    	{
				    		direction = mxConstants.DIRECTION_NORTH;
				    	}
				    	else if (guess == 'left' || guess == mxConstants.DIRECTION_WEST)
				    	{
				    		direction = mxConstants.DIRECTION_WEST;
				    	}
				    	else if (guess == 'down' || guess == mxConstants.DIRECTION_SOUTH)
				    	{
				    		direction = mxConstants.DIRECTION_SOUTH;
				    	}
		    		}
			    	
			    	var length = graph.defaultEdgeLength;
			    	var cloneSource = tokens[0] == 'clone';
			    	var evt = mouseEvent('click', 1, 50, 1, 50, !cloneSource);
			    	var cells = graph.connectVertex(cell, direction, length, evt);
			    	graph.selectCellsForConnectVertex(cells, evt, ui.hoverIcons);
		    	}
		    	
		    	return true;
		    }
			// Fixes drive and ride common mistakes for right
		    else if (mxUtils.indexOf(['and', 'drive', 'ride', 'move', 'up', 'left', 'down', 'right', 'north', 'south', 'east', 'west', 'downright'], tokens[0]) >= 0)
		    {
	    		var cell = graph.getSelectionCell();
	    		
		    	if (!graph.isSelectionEmpty())
		    	{
			    	// Uses east direction if token not understood
			    	var dx = 0;
			    	var dy = 0;
			    	
			    	for (var i = 0; i < tokens.length; i++)
			    	{
			    		tokens[i] = tokens[i].toLowerCase();
				    	var direction = null;
				    	
				    	// Downright is a single word needs special handling
				    	if (tokens[i].toLowerCase() == 'downright')
				    	{
				    		dx += graph.defaultEdgeLength;
				    		dy += graph.defaultEdgeLength;
				    	}
				    	else
				    	{
				    		var guess = null;
				    		
				    		// Guessing direction based on minimum hamming distance for given set
				    		// Handle some common cases
				    		if (tokens[i] == 'drive' || tokens[i] == 'ride')
				    		{
				    			guess = 'right';
				    		}
				    		else
				    		{
					    		guess = getBestWord(tokens[i], ['move', 'and', 'up', 'left', 'right', 'north', 'south', 'east', 'west', 'down', 'downright']);
				    		}
		
				    		if (guess == 'up' || guess == mxConstants.DIRECTION_NORTH)
					    	{
					    		direction = mxConstants.DIRECTION_NORTH;
					    	}
					    	else if (guess == 'left' || guess == mxConstants.DIRECTION_WEST)
					    	{
					    		direction = mxConstants.DIRECTION_WEST;
					    	}
					    	else if (guess == 'down' || guess == mxConstants.DIRECTION_SOUTH)
					    	{
					    		direction = mxConstants.DIRECTION_SOUTH;
					    	}
					    	else if (guess == 'right' || guess == mxConstants.DIRECTION_EAST)
					    	{
					    		direction = mxConstants.DIRECTION_EAST;
					    	}
					    	
					    	if (direction != null)
					    	{
						    	if (direction == mxConstants.DIRECTION_NORTH)
						    	{
						    		dy += -graph.defaultEdgeLength;
						    	}
						    	else if (direction == mxConstants.DIRECTION_WEST)
						    	{
						    		dx += -graph.defaultEdgeLength;
						    	}
						    	else if (direction == mxConstants.DIRECTION_SOUTH)
						    	{
						    		dy += graph.defaultEdgeLength;
						    	}
						    	else if (direction == mxConstants.DIRECTION_EAST)
						    	{
						    		dx += graph.defaultEdgeLength;
						    	}
					    	}
				    	}
			    	}
			    	
			    	if (dx != 0 || dy != null)
			    	{
			    		graph.moveCells(graph.getSelectionCells(), dx, dy);
			    		App.say('Moved');
			    	}
			    	
			    	return true;
		    	}
		    }
		    else if (tokens[0] == 'text')
		    {
				var cells = graph.getSelectionCells();
		    	
		    	if (cells.length == 0 && graph.model.contains(lastInserted))
		    	{
		    		cells = [lastInserted];
		    	}
	
		    	if (cells.length == 0)
		    	{
					App.say('No cell for text');
		    	}
		    	else if (tokens[0].length >= 2)
				{
		    		var value = tokens.slice(1, tokens.length).join(' ');
		    		
		    		if (value.length > 0)
		    		{
			    		// Capitalize string
			    		if (value.length > 1)
			    		{
			    			value = value.charAt(0).toUpperCase() + value.slice(1);
			    		}

		    			graph.labelChanged(cells[0], value);
		    		}
				}
		    	
		    	return true;
		    }
		    else if (tokens[0] == 'disconnect' && tokens.length == 1)
		    {
				var cells = graph.getAllEdges(graph.getSelectionCells());
		    	
		    	if (cells.length == 0)
		    	{
					App.say('No cell to disconnect');
		    	}
		    	else
		    	{
		    		graph.removeCells(cells);
		    	}
		    	
		    	return true;
		    }
		    else if (tokens[0] == 'deselect' && tokens.length == 1)
		    {
		    	graph.clearSelection();
		    	
		    	return true;
		    }
		    else if (tokens[0] === 'select' && (tokens.length == 1 || mxUtils.indexOf(
		    	['vertices', 'edges', 'none', 'all'], tokens[1].toLowerCase()) < 0))
			{
		    	// Handles some other shortcuts
		    	if (tokens.length == 1 || mxUtils.indexOf(['last'], tokens[1].toLowerCase()) >= 0)
		    	{
		    		if (graph.model.contains(lastInserted))
		    		{
		    			graph.setSelectionCell(lastInserted);
		    			App.say('{1} selected', [graph.getWordForCell(lastInserted).replace(/([A-Z])/g, ' $1')]);
				    	return true;
		    		}
		    	}
		    	// Handles alternative cases of edges
		    	else if (mxUtils.indexOf(['connection', 'connections', 'inches'], tokens[1].toLowerCase()) >= 0)
		    	{
					var edges = graph.getAllEdges(graph.getSelectionCells());
		
			    	if (edges.length > 0)
			    	{
			    		graph.setSelectionCells(edges);
			    	}
			    	else
			    	{
			    		ui.actions.get('selectEdges').funct();
			    	}
			    	
		    		App.sayHint();
			    	return true;
		    	}
		    	// Handles alternative version of vertices
		    	else if (mxUtils.indexOf(['shapes'], tokens[1].toLowerCase()) >= 0)
		    	{
		    		ui.actions.get('selectVertices').funct();
		    		App.sayHint();
			    	return true;
		    	}
		    	else if (mxUtils.indexOf(['previous'], tokens[1].toLowerCase()) >= 0)
		    	{
		    		if (graph.isSelectionEmpty())
		    		{
		    			// Selects the first vertex
		    			var parent = graph.getDefaultParent();
		    			var childCount = graph.model.getChildCount(parent);
		    			
		    			for (var i = childCount - 1; i >= 0; i--)
		    			{
		    				var child = graph.model.getChildAt(parent, i);
		    				
		    				if (graph.model.isVertex(child))
		    				{
		    					graph.setSelectionCell(child);
		    					App.say('{1} selected', [graph.getWordForCell(child).replace(/([A-Z])/g, ' $1')]);
		    					
		    					return true;
		    				}
		    			}
		    		}
		    		else
		    		{
			    		var cell = graph.getSelectionCell();
			    		var model = graph.getModel();
			    		var index = model.getParent(cell).getIndex(cell);
			    		var childCount = model.getChildCount(model.getParent(cell));
			    		
			    		if (index >= 0)
			    		{
			    			var next = model.getParent(cell).getChildAt(((index == 0) ? childCount : index) - 1);
			    			
			    			if (next != null)
			    			{
			    				graph.setSelectionCell(next);
			    				App.say('{1} selected', [graph.getWordForCell(next)]);
			    				
			    				return true;
			    			}
			    		}
		
			    		App.say('Previous not found');
		    		}
		    	}
		    	else if (mxUtils.indexOf(['source', 'target'], tokens[1].toLowerCase()) >= 0)
		    	{
		    		var cell = graph.getSelectionCell();
		    		
		    		if (graph.model.isEdge(cell))
		    		{
		    			var terminal = graph.model.getTerminal(cell, tokens[1].toLowerCase() == 'source');
		    			
		    			if (terminal != null)
		    			{
		    				graph.setSelectionCell(terminal);
		    		    	return true;
		    			}
		    		}
		    	}
		    	else if (mxUtils.indexOf(['next'], tokens[1].toLowerCase()) >= 0)
		    	{
		    		if (graph.isSelectionEmpty())
		    		{
		    			// Selects the first vertex
		    			var parent = graph.getDefaultParent();
		    			var childCount = graph.model.getChildCount(parent);
		    			
		    			for (var i = 0; i < childCount; i++)
		    			{
		    				var child = graph.model.getChildAt(parent, i);
		    				
		    				if (graph.model.isVertex(child))
		    				{
		    					graph.setSelectionCell(child);
		    					App.say('{1} selected', [graph.getWordForCell(child).replace(/([A-Z])/g, ' $1')]);
		    					
		    					return true;
		    				}
		    			}
		    		}
		    		else
		    		{
			    		var cell = graph.getSelectionCell();
			    		var model = graph.getModel();
			    		var index = model.getParent(cell).getIndex(cell);
			    		var childCount = model.getChildCount(model.getParent(cell));
			    		
			    		if (index < childCount)
			    		{
			    			var next = model.getParent(cell).getChildAt(((index == childCount - 1) ? 0 : index + 1));
			    			
			    			if (next != null)
			    			{
			    				graph.setSelectionCell(next);
			    				App.say('{1} selected', [graph.getWordForCell(next).replace(/([A-Z])/g, ' $1')]);
			    				
			    				return true;
			    			}
			    		}
		    		}
		    	}
		    	else
		    	{
			    	var states = graph.view.states.getValues();
			    	var token = tokens[1].toLowerCase();
			    	var searchToken = tokens.slice(1, tokens.length).join('').toLowerCase();

			    	for (var i = states.length - 1; i > 0; i--)
			    	{
			    		// Simple matching for shape name or label
				    	if (!graph.isCellSelected(states[i].cell))
				    	{
				    		// Tries label search first
				    		var lab = graph.getLabel(states[i].cell);
				    		
				    		if (lab != null && lab.length > 0)
				    		{
				    			lab = lab.toLowerCase().replace(/ /g, '');
				    			
						    	// Some common mistakes
						    	if (lab.charAt(lab.length - 1) == '2' && tokens[tokens.length - 1].toLowerCase() == 'to')
						    	{
						    		lab = lab.substring(0, lab.length - 1) + 'to';
						    	}
				    			
				    			var min = Math.min(searchToken.length, lab.length);
				    			
				    			if (searchToken.substring(0, min) == lab.substring(0, min))
				    			{
				    				graph.setSelectionCell(states[i].cell);
					    			App.say('{1} selected', [graph.getWordForCell(states[i].cell)]);
					    		
					    			return true;
				    			}
				    		}
				    		
				    		// Then tries shapename search
					    	if (tokens.length == 2)
					    	{
						    	// Some common names
						    	if (mxUtils.indexOf(['circle'], token) >= 0)
						    	{
						    		searchToken = 'ellipse';
						    	}
						    	else if (mxUtils.indexOf(['condition', 'decision'], token) >= 0)
						    	{
						    		searchToken = 'rhombus';
						    	}
						    	else if (mxUtils.indexOf(['preparation'], token) >= 0)
						    	{
						    		searchToken = 'hexagon';
						    	}
						    	else if (mxUtils.indexOf(['trapez'], token) >= 0)
						    	{
						    		searchToken = 'parallelogram';
						    	}
					    	}
					    	
				    		var wrd = graph.getWordForCell(states[i].cell, true);
				    		var min = Math.min(wrd.length, searchToken.length);
				    		
				    		if (searchToken.substring(0, min) == wrd.substring(0, min))
				    		{
				    			graph.setSelectionCell(states[i].cell);
				    			App.say('{1} selected', [graph.getWordForCell(states[i].cell)]);
				    		
				    			return true;
				    		}
				    	}
			    	}
		    	}
			}
		    else if (tokens[0] === 'remove')
			{
				var cells = graph.getSelectionCells();
		    	
		    	if (cells.length == 0 && graph.model.contains(lastInserted))
		    	{
		    		cells = [lastInserted];
		    	}
	
		    	if (cells.length == 0)
		    	{
					App.say('No cells');
		    	}
		    	else if (tokens[1].toLowerCase() == 'text')
				{
	    			graph.labelChanged(cells[0], '');
				}
				else
			    {
					// Remove style
					var styleToken = mxUtils.trim(tokens.slice(1, tokens.length).join(' ').toLowerCase());
					
					// Fixes common recognition errors
					styleToken = styleToken.replace(/a line/g, 'align')
					
					// Merges to single word
					styleToken = styleToken.replace(/ /g, '')

			    	// Fixes common speech errors that make no sense in the context
	    			var keys = [mxConstants.STYLE_FILLCOLOR, mxConstants.STYLE_GRADIENTCOLOR,
	    			               mxConstants.STYLE_STROKECOLOR, mxConstants.STYLE_FONTCOLOR,
	    			               mxConstants.STYLE_LABEL_BACKGROUNDCOLOR, mxConstants.STYLE_LABEL_BORDERCOLOR,
	    			        mxConstants.STYLE_STROKEWIDTH, mxConstants.STYLE_FONTSIZE, mxConstants.STYLE_SPACING,
	    		            mxConstants.STYLE_SPACING_TOP, mxConstants.STYLE_SPACING_LEFT, mxConstants.STYLE_SPACING_RIGHT,
	    		            mxConstants.STYLE_SPACING_BOTTOM, mxConstants.STYLE_PERIMETER_SPACING,
	    		            mxConstants.STYLE_STARTSIZE, mxConstants.STYLE_ENDSIZE, mxConstants.STYLE_OPACITY,
	    		            mxConstants.STYLE_TEXT_OPACITY, mxConstants.STYLE_ROTATION,
	    		            mxConstants.STYLE_ALIGN, mxConstants.STYLE_VERTICAL_ALIGN, mxConstants.STYLE_FONTFAMILY,
	    			        mxConstants.STYLE_LABEL_POSITION, mxConstants.STYLE_VERTICAL_LABEL_POSITION,
	    			        mxConstants.STYLE_GRADIENT_DIRECTION];
    			
		    		// Guesses best word
		    		var	style = getBestWord(styleToken, keys);

		    		if (style != null)
			    	{
			    		graph.setCellStyles(style, null, cells);
			    		ui.fireEvent(new mxEventObject('styleChanged', 'keys', [style], 'values', [null], 'cells', cells));
			    	}
			    	else
			    	{
			    		App.say('Unknown style {1}', [changeTokens[0]]);
			    	}
			    }
		    	
		    	return true;
			}
			else
			{
				var cells = graph.getSelectionCells();
		    	
		    	if (cells.length == 0 && graph.model.contains(lastInserted))
		    	{
		    		cells = [lastInserted];
		    	}
		    	
				// Try numeric stylename if last token is numeric
				var lastToken = tokens[tokens.length - 1].toLowerCase();
				
				// Fixes some special cases for recoginition of short phrases
				// like "stroke width 2" where it tries to be clever
				if (lastToken == 'tool' || lastToken == 'tune' || lastToken == 'tomb' || lastToken == 'tube')
				{
					lastToken = '2';
				}
				else if (lastToken == 'd3')
				{
					lastToken = '3';
				}
				else if (lastToken == 'v')
				{
					lastToken = '5';
				}
				else
				{
					// Converts numeric words to numbers (system only seems to return written numbers for <= 4)
					var numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
					var tmpIndex = mxUtils.indexOf(numbers, lastToken);
					
					if (tmpIndex >= 0)
					{
						lastToken = tmpIndex;
					}
				}
				
				// If last token is numeric
				var lastValue = parseFloat(lastToken);
				
				if (tokens.length >= 2 && !isNaN(lastValue))
				{
					var styleToken = tokens.slice(0, tokens.length - 1).join('').toLowerCase();
					
					// Numeric styles
		    		var keys = [mxConstants.STYLE_STROKEWIDTH, mxConstants.STYLE_FONTSIZE, mxConstants.STYLE_SPACING,
		    		            mxConstants.STYLE_SPACING_TOP, mxConstants.STYLE_SPACING_LEFT, mxConstants.STYLE_SPACING_RIGHT,
		    		            mxConstants.STYLE_SPACING_BOTTOM, mxConstants.STYLE_PERIMETER_SPACING,
		    		            mxConstants.STYLE_STARTSIZE, mxConstants.STYLE_ENDSIZE, mxConstants.STYLE_OPACITY,
		    		            mxConstants.STYLE_TEXT_OPACITY, mxConstants.STYLE_ROTATION]
					var style = null;
					
					// Workaround for problem with "font size" is to say "size" ("font" is near "phone")
					if (styleToken == 'size')
					{
						style = mxConstants.STYLE_FONTSIZE;
					}
					else
					{
						// Guesses best word
						style = getBestWord(styleToken, keys);
					}
					
					if (style != null)
			    	{
						if (cells.length == 0)
				    	{
							App.say('No cell for {1}', [style]);
				    	}
						// Plausibility check
						else if (lastValue <= 400)
						{
							graph.setCellStyles(style, lastValue, cells);
			    			ui.fireEvent(new mxEventObject('styleChanged', 'keys', [style], 'values', [lastValue], 'cells', cells));
						}
						else
						{
							App.say('{1} ignored', [lastValue]);
						}
						
		    			// Terminate
		    			return true;
			    	}
				}
				
				// If "color" appears in the command
				if (tokens.length >= 2)
				{
					// Replaces GB spelling with US spelling for internal lookups
					var colorCommand = mxUtils.trim(command.toLowerCase().replace(/colour/g, 'color'));
					var colorIndex = colorCommand.indexOf('color');
					
					// "Color" (word alone) matches to fill color
					if (colorIndex >= 0)
					{
						// Text from first space after color* word
						var colorToken = mxUtils.trim(colorCommand.substring(
							colorCommand.indexOf(' ', colorIndex))).replace(/ /g, '');
						var color = null;
				    	
						// Checks for color code of token using ntc
				    	for (var i = 0; i < ntc.names.length; i++)
				    	{
				    		if (ntc.names[i][1].toLowerCase().replace(/ /g, '') == colorToken)
				    		{
				    			color = '#' + ntc.names[i][0];
				    			break;
				    		}
				    	}
				    	
				    	// Color is known
				    	if (color != null)
				    	{
				    		var styleToken = colorCommand.substring(0, colorIndex + 'color'.length).replace(/ /g, '');
				    		
				    		keys = [mxConstants.STYLE_GRADIENTCOLOR,
				    		        mxConstants.STYLE_STROKECOLOR, mxConstants.STYLE_FONTCOLOR,
				    		        mxConstants.STYLE_LABEL_BACKGROUNDCOLOR, mxConstants.STYLE_LABEL_BORDERCOLOR,
				    		        mxConstants.STYLE_FILLCOLOR];
				    		var style = null;
				    		
				    		// Handles some special cases
				    		if (styleToken == 'thecolor' || styleToken == 'color')
				    		{
				    			if (graph.model.isEdge(graph.getSelectionCell()))
				    			{
				    				style = mxConstants.STYLE_STROKECOLOR;
				    			}
				    			else
				    			{
				    				style = mxConstants.STYLE_FILLCOLOR;
				    			}
				    		}
				    		else
				    		{
				    			// Guesses best word
				    			style = getBestWord(styleToken, keys);
				    		}
				    		
				    		if (style != null)
				    		{
								if (cells.length == 0)
						    	{
									App.say('No cell for {1}', [style]);
						    	}
								else
								{
									graph.setCellStyles(style, color, cells);
					    			ui.fireEvent(new mxEventObject('styleChanged', 'keys', [style], 'values', [color], 'cells', cells));
								}
				    			
				    			// Terminate
				    			return true;
				    		}
				    	}
					}
				}
				
				// If the first token is a general stylename
				if (tokens.length >= 2)
				{
					var keys = [mxConstants.STYLE_ALIGN, mxConstants.STYLE_VERTICAL_ALIGN,
					        mxConstants.STYLE_FONTFAMILY, mxConstants.STYLE_LABEL_POSITION,
					        mxConstants.STYLE_VERTICAL_LABEL_POSITION,
				            mxConstants.STYLE_GRADIENT_DIRECTION];
					
					var styleToken = mxUtils.trim(tokens.slice(0, tokens.length - 1).join(' ').toLowerCase());
					
					// Fixes common recognition errors
					styleToken = styleToken.replace(/a line/g, 'align')
					
					// Merges to single word
					styleToken = styleToken.replace(/ /g, '')
					
					var style = resolveStylename(styleToken, keys);
					var value = mxUtils.trim(tokens[tokens.length - 1].toLowerCase());
					
					if (style != null && value != null && value.length > 0)
					{
						if (cells.length == 0)
				    	{
							App.say('No cell for {1}', [style]);
				    	}
						else
						{
							graph.setCellStyles(style, value, cells);
			    			ui.fireEvent(new mxEventObject('styleChanged', 'keys', [style], 'values', [value], 'cells', cells));
						}
		    			
		    			// Terminate
		    			return true;
					}
				}
				
				// Checks if the command is a shape name
				var vertices = [];
				
				for (var i = 0; i < cells.length; i++)
				{
					var cell = cells[i];
					
					if (graph.model.isVertex(cell))
					{
						vertices.push(cell);
					}
				}
				
		    	var shapenameToken = mxUtils.trim(tokens.join('')).toLowerCase();

		    	// Searches for registered shape names
		    	// LATER: Using search like insert requires access to
		    	// the cells of the search result items
		    	if (shapeList == null)
		    	{
		    		shapeList = [];
		    		
		    		for (var tmp in mxCellRenderer.defaultShapes)
		    		{
		    			shapeList.push(tmp.toLowerCase());
		    		}
		    	}
		    	
		    	// Only exact matches allowed here
		    	// LATER: Support rounded style
		    	var shape = null;
		    	
		    	// Some common mappings
		    	if (mxUtils.indexOf(['cirlce', 'event', 'start', 'end'], shapenameToken) >= 0)
		    	{
		    		shapenameToken = shape = 'ellipse';
		    	}
		    	else if (mxUtils.indexOf(['condition', 'decision'], shapenameToken) >= 0)
		    	{
		    		shapenameToken = shape = 'rhombus';
		    	}
		    	else if (mxUtils.indexOf(['preparation'], shapenameToken) >= 0)
		    	{
		    		shapenameToken = shape = 'hexagon';
		    	}
		    	else if (mxUtils.indexOf(['trapez'], shapenameToken) >= 0)
		    	{
		    		shapenameToken = shape = 'parallelogram';
		    	}
		    	else
		    	{
		    		shape = getBestWord(shapenameToken, shapeList);
		    	}
		    	
		    	// LATER: Ignore all edge shapes
	    		if (shape != null && shape.toLowerCase() == shapenameToken && shape != 'connector' &&
	    			shape != 'arrow' && shape != 'flexarrow' && shape != 'arrowconnector' &&
	    			shape != 'link')
		    	{
			    	if (cells.length == 0)
			    	{
			    		App.say('No cell for {1}', [shape]);
			    	}
			    	else if (vertices.length == 0)
				{
			    		App.say('Connections ignored');
				}
			    	else
				{
				    	// LATER: Add perimeter style etc
			    		graph.setCellStyles(mxConstants.STYLE_SHAPE, shapenameToken, vertices);
			    		ui.fireEvent(new mxEventObject('styleChanged', 'keys', [mxConstants.STYLE_SHAPE],
			    			'values', [shapenameToken], 'cells', vertices));
			    		
			    		// Terminate
			    		return true;
				}
		    	}
				
				// Lazy creation of cache for action names
				if (actions == null)
				{
					actions = {};
					actionList = [];
					
					for (var name in ui.actions.actions)
					{
						var shortname = mxUtils.trim(name).toLowerCase().replace(/ /g, '');
						actions[shortname] = ui.actions.actions[name];
						actionList.push(shortname);
					}
				}
				
				var name = mxUtils.trim(command).toLowerCase().replace(/ /g, '');
				
				if (urlParams['dev'] == '1')
				{
					var guess = getBestWord(name, actionList, true);
					console.log('App.say guess:', name, '=>', guess, '(' +
						naiveHammingDistance(name, guess) + ', ' +
						levenshteinDist(name, guess) +
						')');
				}
				
				// Some common redirects and mistakes
				if (tokens[0] == 'back')
				{
					command = name = 'undo';
				}
				else if (tokens[0] == 'restore')
				{
					command = name = 'redo';
				}
				else if (tokens[0] == 'clone')
				{
					command = name = 'duplicate';
				}
				else if (mxUtils.indexOf(['all', 'small', 'wall', 'call'], name) >= 0)
				{
					command = name = 'selectall';
				}
				else if (mxUtils.indexOf(['both', 'boat', 'phone', 'don\'t', 'food', 'bolt', 'bull'], tokens[0]) >= 0)
				{
					command = name = 'bold';
				}

				var action = actions[name];
				
				if (action != null)
				{
					if (action.isEnabled())
					{
						App.say(name);
						action.funct();
					}
					else
					{
						// Cannot use name here as it has no spaces
						App.say('{1} disabled', [command]);
					}
					
					return true;
				}
				
				return false;
			}
	    }
	};

	if ('speechSynthesis' in window)
	{
		// Shows dialog for mic access
		if (navigator.webkitGetUserMedia)
		{
			window.addEventListener('load', function()
			{
				navigator.webkitGetUserMedia({audio:true}, function()
				{
	    			//console.log('access to mic ok');
	    		}, function(e)
	    		{
	    			//alert('Error getting audio');
	    			console.log(e);
	    		});
	        });
		}
		
		// Installs helper methods and listeners for speech output
		var graph = ui.editor.graph;
		
		App.reloadVoicePlugin = function()
		{
	    	// Shows UI
			speechOutputEnabled = true;
	    	menu.style.display = '';
	    	td.style.display = 'inline-block';
		};
		
		App.sayHint = function()
		{
			if (graph.getSelectionCount() == 0)
			{
				App.say('No cell selected.' + ((ui.isDiagramEmpty()) ? ' Diagram is empty.' : ''));
			}
			else if (graph.getSelectionCount() == 1)
			{
				var cell = graph.getSelectionCell();
				
				if (graph.getModel().isVertex(cell))
				{
					var geo = graph.getCellGeometry(cell)
			
					if (geo != null)
					{
						App.say('{1} at {2} and {3} is {4} times {5} pixels', [graph.getWordForCell(cell, true),
						                                                       geo.x, geo.y, geo.width, geo.height]);
					}
				}
				else
				{
					App.say('One connection selected');
				}
				
				var lab = mxUtils.trim(graph.getLabel(cell));
				
				if (lab != null && lab.length > 0 && lab.length < 20)
				{
					App.say('Label is {1}', [lab]);
				}
			}
			else
			{
				var cells = graph.getSelectionCells();
				var vertexCount = 0;
				var edgeCount = 0;
				
				for (var i = 0; i < cells.length; i++)
				{
					var cell = cells[i];
					
					if (graph.model.isEdge(cell))
					{
						edgeCount++;
					}
					else if (graph.model.isVertex(cell))
					{
						vertexCount++;
					}
				}

				if (vertexCount > 0 && edgeCount > 0)
				{
					var tmp = '';
					
					if (vertexCount == 1)
					{
						tmp += 'One shape';
					}
					else
					{
						tmp += '{1} shapes';
					}
					
					tmp += ' and ';
					
					if (edgeCount == 1)
					{
						tmp += 'one connection';
					}
					else
					{
						tmp += '{2} connections';
					}
					
					App.say(tmp + ' selected', [vertexCount, edgeCount]);
				}
				else if (vertexCount > 0)
				{
					App.say('{1} shapes selected', [vertexCount]);
				}
				else
				{
					App.say('{1} connections selected', [edgeCount]);
				}
			}
		};
		
		// Can return more than first word
		function firstWord(value)
		{
			// TODO Use regex
			if (value != null && value.length > maxLabelLength)
			{
				var space = value.indexOf(' ');
				
				// Add second word if label is short
				var tmp = value.indexOf(' ', space + 1);
				
				if (tmp >= 0 && tmp <= maxLabelLength)
				{
					space = tmp;

					// Add third word if label is short
					var tmp = value.indexOf(' ', space + 1);
					
					if (tmp >= 0 && tmp <= maxLabelLength)
					{
						space = tmp;
					}
				}
				
				if (space >= 0)
				{
					value = value.substring(0, space);
				}
			}

			return value;
		};

		graph.getWordForCell = function(cell, ignoreLabel)
		{
			var label = 'no';
			
			if (cell != null)
			{
				label = (ignoreLabel) ? null : firstWord(this.getLabel(cell));

				if (label == null || label.length == 0 || label.length > maxLabelLength || mxUtils.isNumeric(label))
				{
					var style = this.getCurrentCellStyle(cell);
					var tmp = style[mxConstants.STYLE_SHAPE];

					if (tmp == 'label')
					{
						label = 'rectangle';
					}
					else if (tmp != null)
					{
						var dot = tmp.lastIndexOf('.');
						
						if (dot >= 0)
						{
							tmp = tmp.substring(dot + 1);
						}

						label = tmp
					}
				}

				var div = document.createElement('div');
				div.innerHTML = label;
				label = div.innerText;
			}
			
			return label;
		};

		ui.addListener('styleChanged', function(sender, evt)
		{
			//console.log('styleChanged', evt, evt.getProperty('keys'));
			var cells = evt.getProperty('cells');
			var keys = evt.getProperty('keys');
			var values = evt.getProperty('values');

			if (cells != null && keys != null && keys.length == 1 && values.length == 1)
			{
				var tmp = values[0];
				
				if (typeof tmp === 'string' && tmp.charAt(0) == '#')
				{
					var n_match  = ntc.name(tmp);
					
					//if (n_match[2]) /* exact match */
					{
						tmp = n_match[1];
					}
				}
				
				if (tmp == mxConstants.NONE || tmp == null)
				{
					App.say('Removed {1}', [keys[0]]);
				}
				else
				{
					// Replaces camel case notation with spaces
					var key = keys[0].replace(/([A-Z])/g, ' $1')
					App.say('{1} {2}', [key, tmp]);
				}
			}
		});
		graph.addListener(mxEvent.LABEL_CHANGED, function(sender, evt)
		{
			//console.log('CELL_CONNECTED', evt);
			var cell = evt.getProperty('cell');
			var old = evt.getProperty('old');

			// Resolves placeholders in new label
			var value = this.getLabel(cell);
			
			if ((value != null && value.length > 20) ||
				(old != null && old.length > 20))
			{
				App.say('Label changed');
			}
			else if (value != null && value.length == 0)
			{
				App.say('Label removed');
			}
			else if (value != null)
			{
				App.say('{1}', [value]);
			}
		});
		
		graph.addListener(mxEvent.CELL_CONNECTED, function(sender, evt)
		{
//				console.log('CELL_CONNECTED', evt);
//				var edge = evt.getProperty('edge');
//				var terminal = evt.getProperty('terminal');
//				var other = graph.model.getTerminal(edge, !evt.getProperty('source'));
//				
//				if (other != null && terminal != null)
//				{
//					App.say('connected {1} to {2}', [getWordForCell(other), getWordForCell(terminal)]);
//				}
		});
		
		graph.addListener(mxEvent.CELLS_ADDED, function(sender, evt)
		{
			//console.log('CELLS_ADDED', evt);
			var cells = evt.getProperty('cells');
			
			if (cells.length > 1)
			{
				var vertexCount = 0;
				var edgeCount = 0;
				
				for (var i = 0; i < cells.length; i++)
				{
					var cell = cells[i];
					
					if (graph.model.isEdge(cell))
					{
						edgeCount++;
					}
					else if (graph.model.isVertex(cell))
					{
						vertexCount++;
					}
				}

				if (vertexCount > 0 && edgeCount > 0)
				{
					var tmp = '';
					
					if (vertexCount == 1)
					{
						tmp += 'One shape';
					}
					else
					{
						tmp += '{1} shapes';
					}
					
					tmp += ' and ';
					
					if (edgeCount == 1)
					{
						tmp += 'one connection';
					}
					else
					{
						tmp += '{2} connections';
					}
					
					App.say(tmp + ' inserted', [vertexCount, edgeCount]);
				}
				else if (vertexCount > 0)
				{
					App.say('{1} shapes', [vertexCount]);
				}
				else
				{
					App.say('{1} connections', [edgeCount]);
				}	
			}
			else
			{
				cell = cells[0];
			
				if (graph.model.isEdge(cell) && graph.model.getTerminal(cell, true) != null &&
					graph.model.getTerminal(cell, false) != null)
				{
					if (graph.getWordForCell(graph.model.getTerminal(cell, true)) ==
						graph.getWordForCell(graph.model.getTerminal(cell, false)))
					{
						App.say('Connected');
					}
					else
					{
						App.say('{1} connected to {2}', [graph.getWordForCell(graph.model.getTerminal(cell, true)),
					                                 graph.getWordForCell(graph.model.getTerminal(cell, false))]);
					}
				}
				else if (graph.model.isVertex(cell))
				{
					lastInserted = cell;
					
					// Replaces camel case notation with spaces
					var word = graph.getWordForCell(cell).replace(/([A-Z])/g, ' $1');
					
					App.say('{1}', [word]);
				}
			}
		});
		graph.addListener(mxEvent.CELLS_REMOVED, function(sender, evt)
		{
			//console.log('CELLS_REMOVED', evt);
			var cells = evt.getProperty('cells');
			
			if (cells.length > 1)
			{
				App.say('{1} cells deleted', [cells.length]);
			}
			else
			{
				cell = cells[0];
				App.say('{1} deleted', [graph.getWordForCell(cell)]);
			}
		});
	}
});

/** Code for color to voice based on ntc (name that color)

/*

+-----------------------------------------------------------------+
|     Created by Chirag Mehta - http://chir.ag/projects/ntc       |
|-----------------------------------------------------------------|
|               ntc js (Name that Color JavaScript)               |
+-----------------------------------------------------------------+

All the functions, code, lists etc. have been written specifically
for the Name that Color JavaScript by Chirag Mehta unless otherwise
specified.

This script is released under the: Creative Commons License:
Attribution 2.5 http://creativecommons.org/licenses/by/2.5/

Sample Usage:

  <script type="text/javascript" src="ntc.js"></script>

  <script type="text/javascript">

    var n_match  = ntc.name("#6195ED");
    n_rgb        = n_match[0]; // This is the RGB value of the closest matching color
    n_name       = n_match[1]; // This is the text string for the name of the match
    n_exactmatch = n_match[2]; // True if exact color match, False if close-match

    alert(n_match);

  </script>

*/

var ntc = {

  init: function() {
    var color, rgb, hsl;
    for(var i = 0; i < ntc.names.length; i++)
    {
      color = "#" + ntc.names[i][0];
      rgb = ntc.rgb(color);
      hsl = ntc.hsl(color);
      ntc.names[i].push(rgb[0], rgb[1], rgb[2], hsl[0], hsl[1], hsl[2]);
    }
  },

  name: function(color) {

    color = color.toUpperCase();
    if(color.length < 3 || color.length > 7)
      return ["#000000", "Invalid Color: " + color, false];
    if(color.length % 3 == 0)
      color = "#" + color;
    if(color.length == 4)
      color = "#" + color.substr(1, 1) + color.substr(1, 1) + color.substr(2, 1) + color.substr(2, 1) + color.substr(3, 1) + color.substr(3, 1);

    var rgb = ntc.rgb(color);
    var r = rgb[0], g = rgb[1], b = rgb[2];
    var hsl = ntc.hsl(color);
    var h = hsl[0], s = hsl[1], l = hsl[2];
    var ndf1 = 0; ndf2 = 0; ndf = 0;
    var cl = -1, df = -1;

    for(var i = 0; i < ntc.names.length; i++)
    {
      if(color == "#" + ntc.names[i][0])
        return ["#" + ntc.names[i][0], ntc.names[i][1], true];

      ndf1 = Math.pow(r - ntc.names[i][2], 2) + Math.pow(g - ntc.names[i][3], 2) + Math.pow(b - ntc.names[i][4], 2);
      ndf2 = Math.pow(h - ntc.names[i][5], 2) + Math.pow(s - ntc.names[i][6], 2) + Math.pow(l - ntc.names[i][7], 2);
      ndf = ndf1 + ndf2 * 2;
      if(df < 0 || df > ndf)
      {
        df = ndf;
        cl = i;
      }
    }

    return (cl < 0 ? ["#000000", "Invalid Color: " + color, false] : ["#" + ntc.names[cl][0], ntc.names[cl][1], false]);
  },

  // adopted from: Farbtastic 1.2
  // http://acko.net/dev/farbtastic
  hsl: function (color) {

    var rgb = [parseInt('0x' + color.substring(1, 3)) / 255, parseInt('0x' + color.substring(3, 5)) / 255, parseInt('0x' + color.substring(5, 7)) / 255];
    var min, max, delta, h, s, l;
    var r = rgb[0], g = rgb[1], b = rgb[2];

    min = Math.min(r, Math.min(g, b));
    max = Math.max(r, Math.max(g, b));
    delta = max - min;
    l = (min + max) / 2;

    s = 0;
    if(l > 0 && l < 1)
      s = delta / (l < 0.5 ? (2 * l) : (2 - 2 * l));

    h = 0;
    if(delta > 0)
    {
      if (max == r && max != g) h += (g - b) / delta;
      if (max == g && max != b) h += (2 + (b - r) / delta);
      if (max == b && max != r) h += (4 + (r - g) / delta);
      h /= 6;
    }
    return [parseInt(h * 255), parseInt(s * 255), parseInt(l * 255)];
  },

  // adopted from: Farbtastic 1.2
  // http://acko.net/dev/farbtastic
  rgb: function(color) {
    return [parseInt('0x' + color.substring(1, 3)), parseInt('0x' + color.substring(3, 5)),  parseInt('0x' + color.substring(5, 7))];
  },

  names: [
          
 // Added all standard HTML color names / gaudenz, oct-2015
["F0F8FF", "aliceblue"],
["FAEBD7", "antiquewhite"],
["00FFFF", "aqua"],
["7FFFD4", "aquamarine"],
["F0FFFF", "azure"],
["F5F5DC", "beige"],
["FFE4C4", "bisque"],
["000000", "black"],
["FFEBCD", "blanchedalmond"],
["0000FF", "blue"],
["8A2BE2", "blueviolet"],
["A52A2A", "brown"],
["DEB887", "burlywood"],
["5F9EA0", "cadetblue"],
["7FFF00", "chartreuse"],
["D2691E", "chocolate"],
["FF7F50", "coral"],
["6495ED", "cornflowerblue"],
["FFF8DC", "cornsilk"],
["DC143C", "crimson"],
["00FFFF", "cyan"],
["00008B", "darkblue"],
["008B8B", "darkcyan"],
["B8860B", "darkgoldenrod"],
["A9A9A9", "darkgray"],
["A9A9A9", "darkgrey"],
["006400", "darkgreen"],
["BDB76B", "darkkhaki"],
["8B008B", "darkmagenta"],
["556B2F", "darkolivegreen"],
["FF8C00", "darkorange"],
["9932CC", "darkorchid"],
["8B0000", "darkred"],
["E9967A", "darksalmon"],
["8FBC8F", "darkseagreen"],
["483D8B", "darkslateblue"],
["2F4F4F", "darkslategray"],
["2F4F4F", "darkslategrey"],
["00CED1", "darkturquoise"],
["9400D3", "darkviolet"],
["FF1493", "deeppink"],
["00BFFF", "deepskyblue"],
["696969", "dimgray"],
["696969", "dimgrey"],
["1E90FF", "dodgerblue"],
["B22222", "firebrick"],
["FFFAF0", "floralwhite"],
["228B22", "forestgreen"],
["FF00FF", "fuchsia"],
["DCDCDC", "gainsboro"],
["F8F8FF", "ghostwhite"],
["FFD700", "gold"],
["DAA520", "goldenrod"],
["808080", "gray"],
["808080", "grey"],
["008000", "green"],
["ADFF2F", "greenyellow"],
["F0FFF0", "honeydew"],
["FF69B4", "hotpink"],
["CD5C5C", "indianred "],
["4B0082", "indigo "],
["FFFFF0", "ivory"],
["F0E68C", "khaki"],
["E6E6FA", "lavender"],
["FFF0F5", "lavenderblush"],
["7CFC00", "lawngreen"],
["FFFACD", "lemonchiffon"],
["ADD8E6", "lightblue"],
["F08080", "lightcoral"],
["E0FFFF", "lightcyan"],
["FAFAD2", "lightgoldenrodyellow"],
["D3D3D3", "lightgray"],
["D3D3D3", "lightgrey"],
["90EE90", "lightgreen"],
["FFB6C1", "lightpink"],
["FFA07A", "lightsalmon"],
["20B2AA", "lightseagreen"],
["87CEFA", "lightskyblue"],
["778899", "lightslategray"],
["778899", "lightslategrey"],
["B0C4DE", "lightsteelblue"],
["FFFFE0", "lightyellow"],
["00FF00", "lime"],
["32CD32", "limegreen"],
["FAF0E6", "linen"],
["FF00FF", "magenta"],
["800000", "maroon"],
["66CDAA", "mediumaquamarine"],
["0000CD", "mediumblue"],
["BA55D3", "mediumorchid"],
["9370DB", "mediumpurple"],
["3CB371", "mediumseagreen"],
["7B68EE", "mediumslateblue"],
["00FA9A", "mediumspringgreen"],
["48D1CC", "mediumturquoise"],
["C71585", "mediumvioletred"],
["191970", "midnightblue"],
["F5FFFA", "mintcream"],
["FFE4E1", "mistyrose"],
["FFE4B5", "moccasin"],
["FFDEAD", "navajowhite"],
["000080", "navy"],
["FDF5E6", "oldlace"],
["808000", "olive"],
["6B8E23", "olivedrab"],
["FFA500", "orange"],
["FF4500", "orangered"],
["DA70D6", "orchid"],
["EEE8AA", "palegoldenrod"],
["98FB98", "palegreen"],
["AFEEEE", "paleturquoise"],
["DB7093", "palevioletred"],
["FFEFD5", "papayawhip"],
["FFDAB9", "peachpuff"],
["CD853F", "peru"],
["FFC0CB", "pink"],
["DDA0DD", "plum"],
["B0E0E6", "powderblue"],
["800080", "purple"],
["FF0000", "red"],
["BC8F8F", "rosybrown"],
["4169E1", "royalblue"],
["8B4513", "saddlebrown"],
["FA8072", "salmon"],
["F4A460", "sandybrown"],
["2E8B57", "seagreen"],
["FFF5EE", "seashell"],
["A0522D", "sienna"],
["C0C0C0", "silver"],
["87CEEB", "skyblue"],
["6A5ACD", "slateblue"],
["708090", "slategray"],
["708090", "slategrey"],
["FFFAFA", "snow"],
["00FF7F", "springgreen"],
["4682B4", "steelblue"],
["D2B48C", "tan"],
["008080", "teal"],
["D8BFD8", "thistle"],
["FF6347", "tomato"],
["40E0D0", "turquoise"],
["EE82EE", "violet"],
["F5DEB3", "wheat"],
["FFFFFF", "white"],
["F5F5F5", "whitesmoke"],
["FFFF00", "yellow"],
["9ACD32", "yellowgreen"],
 
// Existing table
          
["000000", "Black"],
["000080", "Navy Blue"],
["0000C8", "Dark Blue"],
["0000FF", "Blue"],
["000741", "Stratos"],
["001B1C", "Swamp"],
["002387", "Resolution Blue"],
["002900", "Deep Fir"],
["002E20", "Burnham"],
["002FA7", "International Klein Blue"],
["003153", "Prussian Blue"],
["003366", "Midnight Blue"],
["003399", "Smalt"],
["003532", "Deep Teal"],
["003E40", "Cyprus"],
["004620", "Kaitoke Green"],
["0047AB", "Cobalt"],
["004816", "Crusoe"],
["004950", "Sherpa Blue"],
["0056A7", "Endeavour"],
["00581A", "Camarone"],
["0066CC", "Science Blue"],
["0066FF", "Blue Ribbon"],
["00755E", "Tropical Rain Forest"],
["0076A3", "Allports"],
["007BA7", "Deep Cerulean"],
["007EC7", "Lochmara"],
["007FFF", "Azure Radiance"],
["008080", "Teal"],
["0095B6", "Bondi Blue"],
["009DC4", "Pacific Blue"],
["00A693", "Persian Green"],
["00A86B", "Jade"],
["00CC99", "Caribbean Green"],
["00CCCC", "Robin's Egg Blue"],
["00FF00", "Green"],
["00FF7F", "Spring Green"],
["00FFFF", "Cyan / Aqua"],
["010D1A", "Blue Charcoal"],
["011635", "Midnight"],
["011D13", "Holly"],
["012731", "Daintree"],
["01361C", "Cardin Green"],
["01371A", "County Green"],
["013E62", "Astronaut Blue"],
["013F6A", "Regal Blue"],
["014B43", "Aqua Deep"],
["015E85", "Orient"],
["016162", "Blue Stone"],
["016D39", "Fun Green"],
["01796F", "Pine Green"],
["017987", "Blue Lagoon"],
["01826B", "Deep Sea"],
["01A368", "Green Haze"],
["022D15", "English Holly"],
["02402C", "Sherwood Green"],
["02478E", "Congress Blue"],
["024E46", "Evening Sea"],
["026395", "Bahama Blue"],
["02866F", "Observatory"],
["02A4D3", "Cerulean"],
["03163C", "Tangaroa"],
["032B52", "Green Vogue"],
["036A6E", "Mosque"],
["041004", "Midnight Moss"],
["041322", "Black Pearl"],
["042E4C", "Blue Whale"],
["044022", "Zuccini"],
["044259", "Teal Blue"],
["051040", "Deep Cove"],
["051657", "Gulf Blue"],
["055989", "Venice Blue"],
["056F57", "Watercourse"],
["062A78", "Catalina Blue"],
["063537", "Tiber"],
["069B81", "Gossamer"],
["06A189", "Niagara"],
["073A50", "Tarawera"],
["080110", "Jaguar"],
["081910", "Black Bean"],
["082567", "Deep Sapphire"],
["088370", "Elf Green"],
["08E8DE", "Bright Turquoise"],
["092256", "Downriver"],
["09230F", "Palm Green"],
["09255D", "Madison"],
["093624", "Bottle Green"],
["095859", "Deep Sea Green"],
["097F4B", "Salem"],
["0A001C", "Black Russian"],
["0A480D", "Dark Fern"],
["0A6906", "Japanese Laurel"],
["0A6F75", "Atoll"],
["0B0B0B", "Cod Gray"],
["0B0F08", "Marshland"],
["0B1107", "Gordons Green"],
["0B1304", "Black Forest"],
["0B6207", "San Felix"],
["0BDA51", "Malachite"],
["0C0B1D", "Ebony"],
["0C0D0F", "Woodsmoke"],
["0C1911", "Racing Green"],
["0C7A79", "Surfie Green"],
["0C8990", "Blue Chill"],
["0D0332", "Black Rock"],
["0D1117", "Bunker"],
["0D1C19", "Aztec"],
["0D2E1C", "Bush"],
["0E0E18", "Cinder"],
["0E2A30", "Firefly"],
["0F2D9E", "Torea Bay"],
["10121D", "Vulcan"],
["101405", "Green Waterloo"],
["105852", "Eden"],
["110C6C", "Arapawa"],
["120A8F", "Ultramarine"],
["123447", "Elephant"],
["126B40", "Jewel"],
["130000", "Diesel"],
["130A06", "Asphalt"],
["13264D", "Blue Zodiac"],
["134F19", "Parsley"],
["140600", "Nero"],
["1450AA", "Tory Blue"],
["151F4C", "Bunting"],
["1560BD", "Denim"],
["15736B", "Genoa"],
["161928", "Mirage"],
["161D10", "Hunter Green"],
["162A40", "Big Stone"],
["163222", "Celtic"],
["16322C", "Timber Green"],
["163531", "Gable Green"],
["171F04", "Pine Tree"],
["175579", "Chathams Blue"],
["182D09", "Deep Forest Green"],
["18587A", "Blumine"],
["19330E", "Palm Leaf"],
["193751", "Nile Blue"],
["1959A8", "Fun Blue"],
["1A1A68", "Lucky Point"],
["1AB385", "Mountain Meadow"],
["1B0245", "Tolopea"],
["1B1035", "Haiti"],
["1B127B", "Deep Koamaru"],
["1B1404", "Acadia"],
["1B2F11", "Seaweed"],
["1B3162", "Biscay"],
["1B659D", "Matisse"],
["1C1208", "Crowshead"],
["1C1E13", "Rangoon Green"],
["1C39BB", "Persian Blue"],
["1C402E", "Everglade"],
["1C7C7D", "Elm"],
["1D6142", "Green Pea"],
["1E0F04", "Creole"],
["1E1609", "Karaka"],
["1E1708", "El Paso"],
["1E385B", "Cello"],
["1E433C", "Te Papa Green"],
["1E90FF", "Dodger Blue"],
["1E9AB0", "Eastern Blue"],
["1F120F", "Night Rider"],
["1FC2C2", "Java"],
["20208D", "Jacksons Purple"],
["202E54", "Cloud Burst"],
["204852", "Blue Dianne"],
["211A0E", "Eternity"],
["220878", "Deep Blue"],
["228B22", "Forest Green"],
["233418", "Mallard"],
["240A40", "Violet"],
["240C02", "Kilamanjaro"],
["242A1D", "Log Cabin"],
["242E16", "Black Olive"],
["24500F", "Green House"],
["251607", "Graphite"],
["251706", "Cannon Black"],
["251F4F", "Port Gore"],
["25272C", "Shark"],
["25311C", "Green Kelp"],
["2596D1", "Curious Blue"],
["260368", "Paua"],
["26056A", "Paris M"],
["261105", "Wood Bark"],
["261414", "Gondola"],
["262335", "Steel Gray"],
["26283B", "Ebony Clay"],
["273A81", "Bay of Many"],
["27504B", "Plantation"],
["278A5B", "Eucalyptus"],
["281E15", "Oil"],
["283A77", "Astronaut"],
["286ACD", "Mariner"],
["290C5E", "Violent Violet"],
["292130", "Bastille"],
["292319", "Zeus"],
["292937", "Charade"],
["297B9A", "Jelly Bean"],
["29AB87", "Jungle Green"],
["2A0359", "Cherry Pie"],
["2A140E", "Coffee Bean"],
["2A2630", "Baltic Sea"],
["2A380B", "Turtle Green"],
["2A52BE", "Cerulean Blue"],
["2B0202", "Sepia Black"],
["2B194F", "Valhalla"],
["2B3228", "Heavy Metal"],
["2C0E8C", "Blue Gem"],
["2C1632", "Revolver"],
["2C2133", "Bleached Cedar"],
["2C8C84", "Lochinvar"],
["2D2510", "Mikado"],
["2D383A", "Outer Space"],
["2D569B", "St Tropaz"],
["2E0329", "Jacaranda"],
["2E1905", "Jacko Bean"],
["2E3222", "Rangitoto"],
["2E3F62", "Rhino"],
["2E8B57", "Sea Green"],
["2EBFD4", "Scooter"],
["2F270E", "Onion"],
["2F3CB3", "Governor Bay"],
["2F519E", "Sapphire"],
["2F5A57", "Spectra"],
["2F6168", "Casal"],
["300529", "Melanzane"],
["301F1E", "Cocoa Brown"],
["302A0F", "Woodrush"],
["304B6A", "San Juan"],
["30D5C8", "Turquoise"],
["311C17", "Eclipse"],
["314459", "Pickled Bluewood"],
["315BA1", "Azure"],
["31728D", "Calypso"],
["317D82", "Paradiso"],
["32127A", "Persian Indigo"],
["32293A", "Blackcurrant"],
["323232", "Mine Shaft"],
["325D52", "Stromboli"],
["327C14", "Bilbao"],
["327DA0", "Astral"],
["33036B", "Christalle"],
["33292F", "Thunder"],
["33CC99", "Shamrock"],
["341515", "Tamarind"],
["350036", "Mardi Gras"],
["350E42", "Valentino"],
["350E57", "Jagger"],
["353542", "Tuna"],
["354E8C", "Chambray"],
["363050", "Martinique"],
["363534", "Tuatara"],
["363C0D", "Waiouru"],
["36747D", "Ming"],
["368716", "La Palma"],
["370202", "Chocolate"],
["371D09", "Clinker"],
["37290E", "Brown Tumbleweed"],
["373021", "Birch"],
["377475", "Oracle"],
["380474", "Blue Diamond"],
["381A51", "Grape"],
["383533", "Dune"],
["384555", "Oxford Blue"],
["384910", "Clover"],
["394851", "Limed Spruce"],
["396413", "Dell"],
["3A0020", "Toledo"],
["3A2010", "Sambuca"],
["3A2A6A", "Jacarta"],
["3A686C", "William"],
["3A6A47", "Killarney"],
["3AB09E", "Keppel"],
["3B000B", "Temptress"],
["3B0910", "Aubergine"],
["3B1F1F", "Jon"],
["3B2820", "Treehouse"],
["3B7A57", "Amazon"],
["3B91B4", "Boston Blue"],
["3C0878", "Windsor"],
["3C1206", "Rebel"],
["3C1F76", "Meteorite"],
["3C2005", "Dark Ebony"],
["3C3910", "Camouflage"],
["3C4151", "Bright Gray"],
["3C4443", "Cape Cod"],
["3C493A", "Lunar Green"],
["3D0C02", "Bean  "],
["3D2B1F", "Bistre"],
["3D7D52", "Goblin"],
["3E0480", "Kingfisher Daisy"],
["3E1C14", "Cedar"],
["3E2B23", "English Walnut"],
["3E2C1C", "Black Marlin"],
["3E3A44", "Ship Gray"],
["3EABBF", "Pelorous"],
["3F2109", "Bronze"],
["3F2500", "Cola"],
["3F3002", "Madras"],
["3F307F", "Minsk"],
["3F4C3A", "Cabbage Pont"],
["3F583B", "Tom Thumb"],
["3F5D53", "Mineral Green"],
["3FC1AA", "Puerto Rico"],
["3FFF00", "Harlequin"],
["401801", "Brown Pod"],
["40291D", "Cork"],
["403B38", "Masala"],
["403D19", "Thatch Green"],
["405169", "Fiord"],
["40826D", "Viridian"],
["40A860", "Chateau Green"],
["410056", "Ripe Plum"],
["411F10", "Paco"],
["412010", "Deep Oak"],
["413C37", "Merlin"],
["414257", "Gun Powder"],
["414C7D", "East Bay"],
["4169E1", "Royal Blue"],
["41AA78", "Ocean Green"],
["420303", "Burnt Maroon"],
["423921", "Lisbon Brown"],
["427977", "Faded Jade"],
["431560", "Scarlet Gum"],
["433120", "Iroko"],
["433E37", "Armadillo"],
["434C59", "River Bed"],
["436A0D", "Green Leaf"],
["44012D", "Barossa"],
["441D00", "Morocco Brown"],
["444954", "Mako"],
["454936", "Kelp"],
["456CAC", "San Marino"],
["45B1E8", "Picton Blue"],
["460B41", "Loulou"],
["462425", "Crater Brown"],
["465945", "Gray Asparagus"],
["4682B4", "Steel Blue"],
["480404", "Rustic Red"],
["480607", "Bulgarian Rose"],
["480656", "Clairvoyant"],
["481C1C", "Cocoa Bean"],
["483131", "Woody Brown"],
["483C32", "Taupe"],
["49170C", "Van Cleef"],
["492615", "Brown Derby"],
["49371B", "Metallic Bronze"],
["495400", "Verdun Green"],
["496679", "Blue Bayoux"],
["497183", "Bismark"],
["4A2A04", "Bracken"],
["4A3004", "Deep Bronze"],
["4A3C30", "Mondo"],
["4A4244", "Tundora"],
["4A444B", "Gravel"],
["4A4E5A", "Trout"],
["4B0082", "Pigment Indigo"],
["4B5D52", "Nandor"],
["4C3024", "Saddle"],
["4C4F56", "Abbey"],
["4D0135", "Blackberry"],
["4D0A18", "Cab Sav"],
["4D1E01", "Indian Tan"],
["4D282D", "Cowboy"],
["4D282E", "Livid Brown"],
["4D3833", "Rock"],
["4D3D14", "Punga"],
["4D400F", "Bronzetone"],
["4D5328", "Woodland"],
["4E0606", "Mahogany"],
["4E2A5A", "Bossanova"],
["4E3B41", "Matterhorn"],
["4E420C", "Bronze Olive"],
["4E4562", "Mulled Wine"],
["4E6649", "Axolotl"],
["4E7F9E", "Wedgewood"],
["4EABD1", "Shakespeare"],
["4F1C70", "Honey Flower"],
["4F2398", "Daisy Bush"],
["4F69C6", "Indigo"],
["4F7942", "Fern Green"],
["4F9D5D", "Fruit Salad"],
["4FA83D", "Apple"],
["504351", "Mortar"],
["507096", "Kashmir Blue"],
["507672", "Cutty Sark"],
["50C878", "Emerald"],
["514649", "Emperor"],
["516E3D", "Chalet Green"],
["517C66", "Como"],
["51808F", "Smalt Blue"],
["52001F", "Castro"],
["520C17", "Maroon Oak"],
["523C94", "Gigas"],
["533455", "Voodoo"],
["534491", "Victoria"],
["53824B", "Hippie Green"],
["541012", "Heath"],
["544333", "Judge Gray"],
["54534D", "Fuscous Gray"],
["549019", "Vida Loca"],
["55280C", "Cioccolato"],
["555B10", "Saratoga"],
["556D56", "Finlandia"],
["5590D9", "Havelock Blue"],
["56B4BE", "Fountain Blue"],
["578363", "Spring Leaves"],
["583401", "Saddle Brown"],
["585562", "Scarpa Flow"],
["587156", "Cactus"],
["589AAF", "Hippie Blue"],
["591D35", "Wine Berry"],
["592804", "Brown Bramble"],
["593737", "Congo Brown"],
["594433", "Millbrook"],
["5A6E9C", "Waikawa Gray"],
["5A87A0", "Horizon"],
["5B3013", "Jambalaya"],
["5C0120", "Bordeaux"],
["5C0536", "Mulberry Wood"],
["5C2E01", "Carnaby Tan"],
["5C5D75", "Comet"],
["5D1E0F", "Redwood"],
["5D4C51", "Don Juan"],
["5D5C58", "Chicago"],
["5D5E37", "Verdigris"],
["5D7747", "Dingley"],
["5DA19F", "Breaker Bay"],
["5E483E", "Kabul"],
["5E5D3B", "Hemlock"],
["5F3D26", "Irish Coffee"],
["5F5F6E", "Mid Gray"],
["5F6672", "Shuttle Gray"],
["5FA777", "Aqua Forest"],
["5FB3AC", "Tradewind"],
["604913", "Horses Neck"],
["605B73", "Smoky"],
["606E68", "Corduroy"],
["6093D1", "Danube"],
["612718", "Espresso"],
["614051", "Eggplant"],
["615D30", "Costa Del Sol"],
["61845F", "Glade Green"],
["622F30", "Buccaneer"],
["623F2D", "Quincy"],
["624E9A", "Butterfly Bush"],
["625119", "West Coast"],
["626649", "Finch"],
["639A8F", "Patina"],
["63B76C", "Fern"],
["6456B7", "Blue Violet"],
["646077", "Dolphin"],
["646463", "Storm Dust"],
["646A54", "Siam"],
["646E75", "Nevada"],
["6495ED", "Cornflower Blue"],
["64CCDB", "Viking"],
["65000B", "Rosewood"],
["651A14", "Cherrywood"],
["652DC1", "Purple Heart"],
["657220", "Fern Frond"],
["65745D", "Willow Grove"],
["65869F", "Hoki"],
["660045", "Pompadour"],
["660099", "Purple"],
["66023C", "Tyrian Purple"],
["661010", "Dark Tan"],
["66B58F", "Silver Tree"],
["66FF00", "Bright Green"],
["66FF66", "Screamin' Green"],
["67032D", "Black Rose"],
["675FA6", "Scampi"],
["676662", "Ironside Gray"],
["678975", "Viridian Green"],
["67A712", "Christi"],
["683600", "Nutmeg Wood Finish"],
["685558", "Zambezi"],
["685E6E", "Salt Box"],
["692545", "Tawny Port"],
["692D54", "Finn"],
["695F62", "Scorpion"],
["697E9A", "Lynch"],
["6A442E", "Spice"],
["6A5D1B", "Himalaya"],
["6A6051", "Soya Bean"],
["6B2A14", "Hairy Heath"],
["6B3FA0", "Royal Purple"],
["6B4E31", "Shingle Fawn"],
["6B5755", "Dorado"],
["6B8BA2", "Bermuda Gray"],
["6B8E23", "Olive Drab"],
["6C3082", "Eminence"],
["6CDAE7", "Turquoise Blue"],
["6D0101", "Lonestar"],
["6D5E54", "Pine Cone"],
["6D6C6C", "Dove Gray"],
["6D9292", "Juniper"],
["6D92A1", "Gothic"],
["6E0902", "Red Oxide"],
["6E1D14", "Moccaccino"],
["6E4826", "Pickled Bean"],
["6E4B26", "Dallas"],
["6E6D57", "Kokoda"],
["6E7783", "Pale Sky"],
["6F440C", "Cafe Royale"],
["6F6A61", "Flint"],
["6F8E63", "Highland"],
["6F9D02", "Limeade"],
["6FD0C5", "Downy"],
["701C1C", "Persian Plum"],
["704214", "Sepia"],
["704A07", "Antique Bronze"],
["704F50", "Ferra"],
["706555", "Coffee"],
["708090", "Slate Gray"],
["711A00", "Cedar Wood Finish"],
["71291D", "Metallic Copper"],
["714693", "Affair"],
["714AB2", "Studio"],
["715D47", "Tobacco Brown"],
["716338", "Yellow Metal"],
["716B56", "Peat"],
["716E10", "Olivetone"],
["717486", "Storm Gray"],
["718080", "Sirocco"],
["71D9E2", "Aquamarine Blue"],
["72010F", "Venetian Red"],
["724A2F", "Old Copper"],
["726D4E", "Go Ben"],
["727B89", "Raven"],
["731E8F", "Seance"],
["734A12", "Raw Umber"],
["736C9F", "Kimberly"],
["736D58", "Crocodile"],
["737829", "Crete"],
["738678", "Xanadu"],
["74640D", "Spicy Mustard"],
["747D63", "Limed Ash"],
["747D83", "Rolling Stone"],
["748881", "Blue Smoke"],
["749378", "Laurel"],
["74C365", "Mantis"],
["755A57", "Russett"],
["7563A8", "Deluge"],
["76395D", "Cosmic"],
["7666C6", "Blue Marguerite"],
["76BD17", "Lima"],
["76D7EA", "Sky Blue"],
["770F05", "Dark Burgundy"],
["771F1F", "Crown of Thorns"],
["773F1A", "Walnut"],
["776F61", "Pablo"],
["778120", "Pacifika"],
["779E86", "Oxley"],
["77DD77", "Pastel Green"],
["780109", "Japanese Maple"],
["782D19", "Mocha"],
["782F16", "Peanut"],
["78866B", "Camouflage Green"],
["788A25", "Wasabi"],
["788BBA", "Ship Cove"],
["78A39C", "Sea Nymph"],
["795D4C", "Roman Coffee"],
["796878", "Old Lavender"],
["796989", "Rum"],
["796A78", "Fedora"],
["796D62", "Sandstone"],
["79DEEC", "Spray"],
["7A013A", "Siren"],
["7A58C1", "Fuchsia Blue"],
["7A7A7A", "Boulder"],
["7A89B8", "Wild Blue Yonder"],
["7AC488", "De York"],
["7B3801", "Red Beech"],
["7B3F00", "Cinnamon"],
["7B6608", "Yukon Gold"],
["7B7874", "Tapa"],
["7B7C94", "Waterloo "],
["7B8265", "Flax Smoke"],
["7B9F80", "Amulet"],
["7BA05B", "Asparagus"],
["7C1C05", "Kenyan Copper"],
["7C7631", "Pesto"],
["7C778A", "Topaz"],
["7C7B7A", "Concord"],
["7C7B82", "Jumbo"],
["7C881A", "Trendy Green"],
["7CA1A6", "Gumbo"],
["7CB0A1", "Acapulco"],
["7CB7BB", "Neptune"],
["7D2C14", "Pueblo"],
["7DA98D", "Bay Leaf"],
["7DC8F7", "Malibu"],
["7DD8C6", "Bermuda"],
["7E3A15", "Copper Canyon"],
["7F1734", "Claret"],
["7F3A02", "Peru Tan"],
["7F626D", "Falcon"],
["7F7589", "Mobster"],
["7F76D3", "Moody Blue"],
["7FFF00", "Chartreuse"],
["7FFFD4", "Aquamarine"],
["800000", "Maroon"],
["800B47", "Rose Bud Cherry"],
["801818", "Falu Red"],
["80341F", "Red Robin"],
["803790", "Vivid Violet"],
["80461B", "Russet"],
["807E79", "Friar Gray"],
["808000", "Olive"],
["808080", "Gray"],
["80B3AE", "Gulf Stream"],
["80B3C4", "Glacier"],
["80CCEA", "Seagull"],
["81422C", "Nutmeg"],
["816E71", "Spicy Pink"],
["817377", "Empress"],
["819885", "Spanish Green"],
["826F65", "Sand Dune"],
["828685", "Gunsmoke"],
["828F72", "Battleship Gray"],
["831923", "Merlot"],
["837050", "Shadow"],
["83AA5D", "Chelsea Cucumber"],
["83D0C6", "Monte Carlo"],
["843179", "Plum"],
["84A0A0", "Granny Smith"],
["8581D9", "Chetwode Blue"],
["858470", "Bandicoot"],
["859FAF", "Bali Hai"],
["85C4CC", "Half Baked"],
["860111", "Red Devil"],
["863C3C", "Lotus"],
["86483C", "Ironstone"],
["864D1E", "Bull Shot"],
["86560A", "Rusty Nail"],
["868974", "Bitter"],
["86949F", "Regent Gray"],
["871550", "Disco"],
["87756E", "Americano"],
["877C7B", "Hurricane"],
["878D91", "Oslo Gray"],
["87AB39", "Sushi"],
["885342", "Spicy Mix"],
["886221", "Kumera"],
["888387", "Suva Gray"],
["888D65", "Avocado"],
["893456", "Camelot"],
["893843", "Solid Pink"],
["894367", "Cannon Pink"],
["897D6D", "Makara"],
["8A3324", "Burnt Umber"],
["8A73D6", "True V"],
["8A8360", "Clay Creek"],
["8A8389", "Monsoon"],
["8A8F8A", "Stack"],
["8AB9F1", "Jordy Blue"],
["8B00FF", "Electric Violet"],
["8B0723", "Monarch"],
["8B6B0B", "Corn Harvest"],
["8B8470", "Olive Haze"],
["8B847E", "Schooner"],
["8B8680", "Natural Gray"],
["8B9C90", "Mantle"],
["8B9FEE", "Portage"],
["8BA690", "Envy"],
["8BA9A5", "Cascade"],
["8BE6D8", "Riptide"],
["8C055E", "Cardinal Pink"],
["8C472F", "Mule Fawn"],
["8C5738", "Potters Clay"],
["8C6495", "Trendy Pink"],
["8D0226", "Paprika"],
["8D3D38", "Sanguine Brown"],
["8D3F3F", "Tosca"],
["8D7662", "Cement"],
["8D8974", "Granite Green"],
["8D90A1", "Manatee"],
["8DA8CC", "Polo Blue"],
["8E0000", "Red Berry"],
["8E4D1E", "Rope"],
["8E6F70", "Opium"],
["8E775E", "Domino"],
["8E8190", "Mamba"],
["8EABC1", "Nepal"],
["8F021C", "Pohutukawa"],
["8F3E33", "El Salva"],
["8F4B0E", "Korma"],
["8F8176", "Squirrel"],
["8FD6B4", "Vista Blue"],
["900020", "Burgundy"],
["901E1E", "Old Brick"],
["907874", "Hemp"],
["907B71", "Almond Frost"],
["908D39", "Sycamore"],
["92000A", "Sangria"],
["924321", "Cumin"],
["926F5B", "Beaver"],
["928573", "Stonewall"],
["928590", "Venus"],
["9370DB", "Medium Purple"],
["93CCEA", "Cornflower"],
["93DFB8", "Algae Green"],
["944747", "Copper Rust"],
["948771", "Arrowtown"],
["950015", "Scarlett"],
["956387", "Strikemaster"],
["959396", "Mountain Mist"],
["960018", "Carmine"],
["964B00", "Brown"],
["967059", "Leather"],
["9678B6", "Purple Mountain's Majesty"],
["967BB6", "Lavender Purple"],
["96A8A1", "Pewter"],
["96BBAB", "Summer Green"],
["97605D", "Au Chico"],
["9771B5", "Wisteria"],
["97CD2D", "Atlantis"],
["983D61", "Vin Rouge"],
["9874D3", "Lilac Bush"],
["98777B", "Bazaar"],
["98811B", "Hacienda"],
["988D77", "Pale Oyster"],
["98FF98", "Mint Green"],
["990066", "Fresh Eggplant"],
["991199", "Violet Eggplant"],
["991613", "Tamarillo"],
["991B07", "Totem Pole"],
["996666", "Copper Rose"],
["9966CC", "Amethyst"],
["997A8D", "Mountbatten Pink"],
["9999CC", "Blue Bell"],
["9A3820", "Prairie Sand"],
["9A6E61", "Toast"],
["9A9577", "Gurkha"],
["9AB973", "Olivine"],
["9AC2B8", "Shadow Green"],
["9B4703", "Oregon"],
["9B9E8F", "Lemon Grass"],
["9C3336", "Stiletto"],
["9D5616", "Hawaiian Tan"],
["9DACB7", "Gull Gray"],
["9DC209", "Pistachio"],
["9DE093", "Granny Smith Apple"],
["9DE5FF", "Anakiwa"],
["9E5302", "Chelsea Gem"],
["9E5B40", "Sepia Skin"],
["9EA587", "Sage"],
["9EA91F", "Citron"],
["9EB1CD", "Rock Blue"],
["9EDEE0", "Morning Glory"],
["9F381D", "Cognac"],
["9F821C", "Reef Gold"],
["9F9F9C", "Star Dust"],
["9FA0B1", "Santas Gray"],
["9FD7D3", "Sinbad"],
["9FDD8C", "Feijoa"],
["A02712", "Tabasco"],
["A1750D", "Buttered Rum"],
["A1ADB5", "Hit Gray"],
["A1C50A", "Citrus"],
["A1DAD7", "Aqua Island"],
["A1E9DE", "Water Leaf"],
["A2006D", "Flirt"],
["A23B6C", "Rouge"],
["A26645", "Cape Palliser"],
["A2AAB3", "Gray Chateau"],
["A2AEAB", "Edward"],
["A3807B", "Pharlap"],
["A397B4", "Amethyst Smoke"],
["A3E3ED", "Blizzard Blue"],
["A4A49D", "Delta"],
["A4A6D3", "Wistful"],
["A4AF6E", "Green Smoke"],
["A50B5E", "Jazzberry Jam"],
["A59B91", "Zorba"],
["A5CB0C", "Bahia"],
["A62F20", "Roof Terracotta"],
["A65529", "Paarl"],
["A68B5B", "Barley Corn"],
["A69279", "Donkey Brown"],
["A6A29A", "Dawn"],
["A72525", "Mexican Red"],
["A7882C", "Luxor Gold"],
["A85307", "Rich Gold"],
["A86515", "Reno Sand"],
["A86B6B", "Coral Tree"],
["A8989B", "Dusty Gray"],
["A899E6", "Dull Lavender"],
["A8A589", "Tallow"],
["A8AE9C", "Bud"],
["A8AF8E", "Locust"],
["A8BD9F", "Norway"],
["A8E3BD", "Chinook"],
["A9A491", "Gray Olive"],
["A9ACB6", "Aluminium"],
["A9B2C3", "Cadet Blue"],
["A9B497", "Schist"],
["A9BDBF", "Tower Gray"],
["A9BEF2", "Perano"],
["A9C6C2", "Opal"],
["AA375A", "Night Shadz"],
["AA4203", "Fire"],
["AA8B5B", "Muesli"],
["AA8D6F", "Sandal"],
["AAA5A9", "Shady Lady"],
["AAA9CD", "Logan"],
["AAABB7", "Spun Pearl"],
["AAD6E6", "Regent St Blue"],
["AAF0D1", "Magic Mint"],
["AB0563", "Lipstick"],
["AB3472", "Royal Heath"],
["AB917A", "Sandrift"],
["ABA0D9", "Cold Purple"],
["ABA196", "Bronco"],
["AC8A56", "Limed Oak"],
["AC91CE", "East Side"],
["AC9E22", "Lemon Ginger"],
["ACA494", "Napa"],
["ACA586", "Hillary"],
["ACA59F", "Cloudy"],
["ACACAC", "Silver Chalice"],
["ACB78E", "Swamp Green"],
["ACCBB1", "Spring Rain"],
["ACDD4D", "Conifer"],
["ACE1AF", "Celadon"],
["AD781B", "Mandalay"],
["ADBED1", "Casper"],
["ADDFAD", "Moss Green"],
["ADE6C4", "Padua"],
["ADFF2F", "Green Yellow"],
["AE4560", "Hippie Pink"],
["AE6020", "Desert"],
["AE809E", "Bouquet"],
["AF4035", "Medium Carmine"],
["AF4D43", "Apple Blossom"],
["AF593E", "Brown Rust"],
["AF8751", "Driftwood"],
["AF8F2C", "Alpine"],
["AF9F1C", "Lucky"],
["AFA09E", "Martini"],
["AFB1B8", "Bombay"],
["AFBDD9", "Pigeon Post"],
["B04C6A", "Cadillac"],
["B05D54", "Matrix"],
["B05E81", "Tapestry"],
["B06608", "Mai Tai"],
["B09A95", "Del Rio"],
["B0E0E6", "Powder Blue"],
["B0E313", "Inch Worm"],
["B10000", "Bright Red"],
["B14A0B", "Vesuvius"],
["B1610B", "Pumpkin Skin"],
["B16D52", "Santa Fe"],
["B19461", "Teak"],
["B1E2C1", "Fringy Flower"],
["B1F4E7", "Ice Cold"],
["B20931", "Shiraz"],
["B2A1EA", "Biloba Flower"],
["B32D29", "Tall Poppy"],
["B35213", "Fiery Orange"],
["B38007", "Hot Toddy"],
["B3AF95", "Taupe Gray"],
["B3C110", "La Rioja"],
["B43332", "Well Read"],
["B44668", "Blush"],
["B4CFD3", "Jungle Mist"],
["B57281", "Turkish Rose"],
["B57EDC", "Lavender"],
["B5A27F", "Mongoose"],
["B5B35C", "Olive Green"],
["B5D2CE", "Jet Stream"],
["B5ECDF", "Cruise"],
["B6316C", "Hibiscus"],
["B69D98", "Thatch"],
["B6B095", "Heathered Gray"],
["B6BAA4", "Eagle"],
["B6D1EA", "Spindle"],
["B6D3BF", "Gum Leaf"],
["B7410E", "Rust"],
["B78E5C", "Muddy Waters"],
["B7A214", "Sahara"],
["B7A458", "Husk"],
["B7B1B1", "Nobel"],
["B7C3D0", "Heather"],
["B7F0BE", "Madang"],
["B81104", "Milano Red"],
["B87333", "Copper"],
["B8B56A", "Gimblet"],
["B8C1B1", "Green Spring"],
["B8C25D", "Celery"],
["B8E0F9", "Sail"],
["B94E48", "Chestnut"],
["B95140", "Crail"],
["B98D28", "Marigold"],
["B9C46A", "Wild Willow"],
["B9C8AC", "Rainee"],
["BA0101", "Guardsman Red"],
["BA450C", "Rock Spray"],
["BA6F1E", "Bourbon"],
["BA7F03", "Pirate Gold"],
["BAB1A2", "Nomad"],
["BAC7C9", "Submarine"],
["BAEEF9", "Charlotte"],
["BB3385", "Medium Red Violet"],
["BB8983", "Brandy Rose"],
["BBD009", "Rio Grande"],
["BBD7C1", "Surf"],
["BCC9C2", "Powder Ash"],
["BD5E2E", "Tuscany"],
["BD978E", "Quicksand"],
["BDB1A8", "Silk"],
["BDB2A1", "Malta"],
["BDB3C7", "Chatelle"],
["BDBBD7", "Lavender Gray"],
["BDBDC6", "French Gray"],
["BDC8B3", "Clay Ash"],
["BDC9CE", "Loblolly"],
["BDEDFD", "French Pass"],
["BEA6C3", "London Hue"],
["BEB5B7", "Pink Swan"],
["BEDE0D", "Fuego"],
["BF5500", "Rose of Sharon"],
["BFB8B0", "Tide"],
["BFBED8", "Blue Haze"],
["BFC1C2", "Silver Sand"],
["BFC921", "Key Lime Pie"],
["BFDBE2", "Ziggurat"],
["BFFF00", "Lime"],
["C02B18", "Thunderbird"],
["C04737", "Mojo"],
["C08081", "Old Rose"],
["C0C0C0", "Silver"],
["C0D3B9", "Pale Leaf"],
["C0D8B6", "Pixie Green"],
["C1440E", "Tia Maria"],
["C154C1", "Fuchsia Pink"],
["C1A004", "Buddha Gold"],
["C1B7A4", "Bison Hide"],
["C1BAB0", "Tea"],
["C1BECD", "Gray Suit"],
["C1D7B0", "Sprout"],
["C1F07C", "Sulu"],
["C26B03", "Indochine"],
["C2955D", "Twine"],
["C2BDB6", "Cotton Seed"],
["C2CAC4", "Pumice"],
["C2E8E5", "Jagged Ice"],
["C32148", "Maroon Flush"],
["C3B091", "Indian Khaki"],
["C3BFC1", "Pale Slate"],
["C3C3BD", "Gray Nickel"],
["C3CDE6", "Periwinkle Gray"],
["C3D1D1", "Tiara"],
["C3DDF9", "Tropical Blue"],
["C41E3A", "Cardinal"],
["C45655", "Fuzzy Wuzzy Brown"],
["C45719", "Orange Roughy"],
["C4C4BC", "Mist Gray"],
["C4D0B0", "Coriander"],
["C4F4EB", "Mint Tulip"],
["C54B8C", "Mulberry"],
["C59922", "Nugget"],
["C5994B", "Tussock"],
["C5DBCA", "Sea Mist"],
["C5E17A", "Yellow Green"],
["C62D42", "Brick Red"],
["C6726B", "Contessa"],
["C69191", "Oriental Pink"],
["C6A84B", "Roti"],
["C6C3B5", "Ash"],
["C6C8BD", "Kangaroo"],
["C6E610", "Las Palmas"],
["C7031E", "Monza"],
["C71585", "Red Violet"],
["C7BCA2", "Coral Reef"],
["C7C1FF", "Melrose"],
["C7C4BF", "Cloud"],
["C7C9D5", "Ghost"],
["C7CD90", "Pine Glade"],
["C7DDE5", "Botticelli"],
["C88A65", "Antique Brass"],
["C8A2C8", "Lilac"],
["C8A528", "Hokey Pokey"],
["C8AABF", "Lily"],
["C8B568", "Laser"],
["C8E3D7", "Edgewater"],
["C96323", "Piper"],
["C99415", "Pizza"],
["C9A0DC", "Light Wisteria"],
["C9B29B", "Rodeo Dust"],
["C9B35B", "Sundance"],
["C9B93B", "Earls Green"],
["C9C0BB", "Silver Rust"],
["C9D9D2", "Conch"],
["C9FFA2", "Reef"],
["C9FFE5", "Aero Blue"],
["CA3435", "Flush Mahogany"],
["CABB48", "Turmeric"],
["CADCD4", "Paris White"],
["CAE00D", "Bitter Lemon"],
["CAE6DA", "Skeptic"],
["CB8FA9", "Viola"],
["CBCAB6", "Foggy Gray"],
["CBD3B0", "Green Mist"],
["CBDBD6", "Nebula"],
["CC3333", "Persian Red"],
["CC5500", "Burnt Orange"],
["CC7722", "Ochre"],
["CC8899", "Puce"],
["CCCAA8", "Thistle Green"],
["CCCCFF", "Periwinkle"],
["CCFF00", "Electric Lime"],
["CD5700", "Tenn"],
["CD5C5C", "Chestnut Rose"],
["CD8429", "Brandy Punch"],
["CDF4FF", "Onahau"],
["CEB98F", "Sorrell Brown"],
["CEBABA", "Cold Turkey"],
["CEC291", "Yuma"],
["CEC7A7", "Chino"],
["CFA39D", "Eunry"],
["CFB53B", "Old Gold"],
["CFDCCF", "Tasman"],
["CFE5D2", "Surf Crest"],
["CFF9F3", "Humming Bird"],
["CFFAF4", "Scandal"],
["D05F04", "Red Stage"],
["D06DA1", "Hopbush"],
["D07D12", "Meteor"],
["D0BEF8", "Perfume"],
["D0C0E5", "Prelude"],
["D0F0C0", "Tea Green"],
["D18F1B", "Geebung"],
["D1BEA8", "Vanilla"],
["D1C6B4", "Soft Amber"],
["D1D2CA", "Celeste"],
["D1D2DD", "Mischka"],
["D1E231", "Pear"],
["D2691E", "Hot Cinnamon"],
["D27D46", "Raw Sienna"],
["D29EAA", "Careys Pink"],
["D2B48C", "Tan"],
["D2DA97", "Deco"],
["D2F6DE", "Blue Romance"],
["D2F8B0", "Gossip"],
["D3CBBA", "Sisal"],
["D3CDC5", "Swirl"],
["D47494", "Charm"],
["D4B6AF", "Clam Shell"],
["D4BF8D", "Straw"],
["D4C4A8", "Akaroa"],
["D4CD16", "Bird Flower"],
["D4D7D9", "Iron"],
["D4DFE2", "Geyser"],
["D4E2FC", "Hawkes Blue"],
["D54600", "Grenadier"],
["D591A4", "Can Can"],
["D59A6F", "Whiskey"],
["D5D195", "Winter Hazel"],
["D5F6E3", "Granny Apple"],
["D69188", "My Pink"],
["D6C562", "Tacha"],
["D6CEF6", "Moon Raker"],
["D6D6D1", "Quill Gray"],
["D6FFDB", "Snowy Mint"],
["D7837F", "New York Pink"],
["D7C498", "Pavlova"],
["D7D0FF", "Fog"],
["D84437", "Valencia"],
["D87C63", "Japonica"],
["D8BFD8", "Thistle"],
["D8C2D5", "Maverick"],
["D8FCFA", "Foam"],
["D94972", "Cabaret"],
["D99376", "Burning Sand"],
["D9B99B", "Cameo"],
["D9D6CF", "Timberwolf"],
["D9DCC1", "Tana"],
["D9E4F5", "Link Water"],
["D9F7FF", "Mabel"],
["DA3287", "Cerise"],
["DA5B38", "Flame Pea"],
["DA6304", "Bamboo"],
["DA6A41", "Red Damask"],
["DA70D6", "Orchid"],
["DA8A67", "Copperfield"],
["DAA520", "Golden Grass"],
["DAECD6", "Zanah"],
["DAF4F0", "Iceberg"],
["DAFAFF", "Oyster Bay"],
["DB5079", "Cranberry"],
["DB9690", "Petite Orchid"],
["DB995E", "Di Serria"],
["DBDBDB", "Alto"],
["DBFFF8", "Frosted Mint"],
["DC143C", "Crimson"],
["DC4333", "Punch"],
["DCB20C", "Galliano"],
["DCB4BC", "Blossom"],
["DCD747", "Wattle"],
["DCD9D2", "Westar"],
["DCDDCC", "Moon Mist"],
["DCEDB4", "Caper"],
["DCF0EA", "Swans Down"],
["DDD6D5", "Swiss Coffee"],
["DDF9F1", "White Ice"],
["DE3163", "Cerise Red"],
["DE6360", "Roman"],
["DEA681", "Tumbleweed"],
["DEBA13", "Gold Tips"],
["DEC196", "Brandy"],
["DECBC6", "Wafer"],
["DED4A4", "Sapling"],
["DED717", "Barberry"],
["DEE5C0", "Beryl Green"],
["DEF5FF", "Pattens Blue"],
["DF73FF", "Heliotrope"],
["DFBE6F", "Apache"],
["DFCD6F", "Chenin"],
["DFCFDB", "Lola"],
["DFECDA", "Willow Brook"],
["DFFF00", "Chartreuse Yellow"],
["E0B0FF", "Mauve"],
["E0B646", "Anzac"],
["E0B974", "Harvest Gold"],
["E0C095", "Calico"],
["E0FFFF", "Baby Blue"],
["E16865", "Sunglo"],
["E1BC64", "Equator"],
["E1C0C8", "Pink Flare"],
["E1E6D6", "Periglacial Blue"],
["E1EAD4", "Kidnapper"],
["E1F6E8", "Tara"],
["E25465", "Mandy"],
["E2725B", "Terracotta"],
["E28913", "Golden Bell"],
["E292C0", "Shocking"],
["E29418", "Dixie"],
["E29CD2", "Light Orchid"],
["E2D8ED", "Snuff"],
["E2EBED", "Mystic"],
["E2F3EC", "Apple Green"],
["E30B5C", "Razzmatazz"],
["E32636", "Alizarin Crimson"],
["E34234", "Cinnabar"],
["E3BEBE", "Cavern Pink"],
["E3F5E1", "Peppermint"],
["E3F988", "Mindaro"],
["E47698", "Deep Blush"],
["E49B0F", "Gamboge"],
["E4C2D5", "Melanie"],
["E4CFDE", "Twilight"],
["E4D1C0", "Bone"],
["E4D422", "Sunflower"],
["E4D5B7", "Grain Brown"],
["E4D69B", "Zombie"],
["E4F6E7", "Frostee"],
["E4FFD1", "Snow Flurry"],
["E52B50", "Amaranth"],
["E5841B", "Zest"],
["E5CCC9", "Dust Storm"],
["E5D7BD", "Stark White"],
["E5D8AF", "Hampton"],
["E5E0E1", "Bon Jour"],
["E5E5E5", "Mercury"],
["E5F9F6", "Polar"],
["E64E03", "Trinidad"],
["E6BE8A", "Gold Sand"],
["E6BEA5", "Cashmere"],
["E6D7B9", "Double Spanish White"],
["E6E4D4", "Satin Linen"],
["E6F2EA", "Harp"],
["E6F8F3", "Off Green"],
["E6FFE9", "Hint of Green"],
["E6FFFF", "Tranquil"],
["E77200", "Mango Tango"],
["E7730A", "Christine"],
["E79F8C", "Tonys Pink"],
["E79FC4", "Kobi"],
["E7BCB4", "Rose Fog"],
["E7BF05", "Corn"],
["E7CD8C", "Putty"],
["E7ECE6", "Gray Nurse"],
["E7F8FF", "Lily White"],
["E7FEFF", "Bubbles"],
["E89928", "Fire Bush"],
["E8B9B3", "Shilo"],
["E8E0D5", "Pearl Bush"],
["E8EBE0", "Green White"],
["E8F1D4", "Chrome White"],
["E8F2EB", "Gin"],
["E8F5F2", "Aqua Squeeze"],
["E96E00", "Clementine"],
["E97451", "Burnt Sienna"],
["E97C07", "Tahiti Gold"],
["E9CECD", "Oyster Pink"],
["E9D75A", "Confetti"],
["E9E3E3", "Ebb"],
["E9F8ED", "Ottoman"],
["E9FFFD", "Clear Day"],
["EA88A8", "Carissma"],
["EAAE69", "Porsche"],
["EAB33B", "Tulip Tree"],
["EAC674", "Rob Roy"],
["EADAB8", "Raffia"],
["EAE8D4", "White Rock"],
["EAF6EE", "Panache"],
["EAF6FF", "Solitude"],
["EAF9F5", "Aqua Spring"],
["EAFFFE", "Dew"],
["EB9373", "Apricot"],
["EBC2AF", "Zinnwaldite"],
["ECA927", "Fuel Yellow"],
["ECC54E", "Ronchi"],
["ECC7EE", "French Lilac"],
["ECCDB9", "Just Right"],
["ECE090", "Wild Rice"],
["ECEBBD", "Fall Green"],
["ECEBCE", "Aths Special"],
["ECF245", "Starship"],
["ED0A3F", "Red Ribbon"],
["ED7A1C", "Tango"],
["ED9121", "Carrot Orange"],
["ED989E", "Sea Pink"],
["EDB381", "Tacao"],
["EDC9AF", "Desert Sand"],
["EDCDAB", "Pancho"],
["EDDCB1", "Chamois"],
["EDEA99", "Primrose"],
["EDF5DD", "Frost"],
["EDF5F5", "Aqua Haze"],
["EDF6FF", "Zumthor"],
["EDF9F1", "Narvik"],
["EDFC84", "Honeysuckle"],
["EE82EE", "Lavender Magenta"],
["EEC1BE", "Beauty Bush"],
["EED794", "Chalky"],
["EED9C4", "Almond"],
["EEDC82", "Flax"],
["EEDEDA", "Bizarre"],
["EEE3AD", "Double Colonial White"],
["EEEEE8", "Cararra"],
["EEEF78", "Manz"],
["EEF0C8", "Tahuna Sands"],
["EEF0F3", "Athens Gray"],
["EEF3C3", "Tusk"],
["EEF4DE", "Loafer"],
["EEF6F7", "Catskill White"],
["EEFDFF", "Twilight Blue"],
["EEFF9A", "Jonquil"],
["EEFFE2", "Rice Flower"],
["EF863F", "Jaffa"],
["EFEFEF", "Gallery"],
["EFF2F3", "Porcelain"],
["F091A9", "Mauvelous"],
["F0D52D", "Golden Dream"],
["F0DB7D", "Golden Sand"],
["F0DC82", "Buff"],
["F0E2EC", "Prim"],
["F0E68C", "Khaki"],
["F0EEFD", "Selago"],
["F0EEFF", "Titan White"],
["F0F8FF", "Alice Blue"],
["F0FCEA", "Feta"],
["F18200", "Gold Drop"],
["F19BAB", "Wewak"],
["F1E788", "Sahara Sand"],
["F1E9D2", "Parchment"],
["F1E9FF", "Blue Chalk"],
["F1EEC1", "Mint Julep"],
["F1F1F1", "Seashell"],
["F1F7F2", "Saltpan"],
["F1FFAD", "Tidal"],
["F1FFC8", "Chiffon"],
["F2552A", "Flamingo"],
["F28500", "Tangerine"],
["F2C3B2", "Mandys Pink"],
["F2F2F2", "Concrete"],
["F2FAFA", "Black Squeeze"],
["F34723", "Pomegranate"],
["F3AD16", "Buttercup"],
["F3D69D", "New Orleans"],
["F3D9DF", "Vanilla Ice"],
["F3E7BB", "Sidecar"],
["F3E9E5", "Dawn Pink"],
["F3EDCF", "Wheatfield"],
["F3FB62", "Canary"],
["F3FBD4", "Orinoco"],
["F3FFD8", "Carla"],
["F400A1", "Hollywood Cerise"],
["F4A460", "Sandy brown"],
["F4C430", "Saffron"],
["F4D81C", "Ripe Lemon"],
["F4EBD3", "Janna"],
["F4F2EE", "Pampas"],
["F4F4F4", "Wild Sand"],
["F4F8FF", "Zircon"],
["F57584", "Froly"],
["F5C85C", "Cream Can"],
["F5C999", "Manhattan"],
["F5D5A0", "Maize"],
["F5DEB3", "Wheat"],
["F5E7A2", "Sandwisp"],
["F5E7E2", "Pot Pourri"],
["F5E9D3", "Albescent White"],
["F5EDEF", "Soft Peach"],
["F5F3E5", "Ecru White"],
["F5F5DC", "Beige"],
["F5FB3D", "Golden Fizz"],
["F5FFBE", "Australian Mint"],
["F64A8A", "French Rose"],
["F653A6", "Brilliant Rose"],
["F6A4C9", "Illusion"],
["F6F0E6", "Merino"],
["F6F7F7", "Black Haze"],
["F6FFDC", "Spring Sun"],
["F7468A", "Violet Red"],
["F77703", "Chilean Fire"],
["F77FBE", "Persian Pink"],
["F7B668", "Rajah"],
["F7C8DA", "Azalea"],
["F7DBE6", "We Peep"],
["F7F2E1", "Quarter Spanish White"],
["F7F5FA", "Whisper"],
["F7FAF7", "Snow Drift"],
["F8B853", "Casablanca"],
["F8C3DF", "Chantilly"],
["F8D9E9", "Cherub"],
["F8DB9D", "Marzipan"],
["F8DD5C", "Energy Yellow"],
["F8E4BF", "Givry"],
["F8F0E8", "White Linen"],
["F8F4FF", "Magnolia"],
["F8F6F1", "Spring Wood"],
["F8F7DC", "Coconut Cream"],
["F8F7FC", "White Lilac"],
["F8F8F7", "Desert Storm"],
["F8F99C", "Texas"],
["F8FACD", "Corn Field"],
["F8FDD3", "Mimosa"],
["F95A61", "Carnation"],
["F9BF58", "Saffron Mango"],
["F9E0ED", "Carousel Pink"],
["F9E4BC", "Dairy Cream"],
["F9E663", "Portica"],
["F9EAF3", "Amour"],
["F9F8E4", "Rum Swizzle"],
["F9FF8B", "Dolly"],
["F9FFF6", "Sugar Cane"],
["FA7814", "Ecstasy"],
["FA9D5A", "Tan Hide"],
["FAD3A2", "Corvette"],
["FADFAD", "Peach Yellow"],
["FAE600", "Turbo"],
["FAEAB9", "Astra"],
["FAECCC", "Champagne"],
["FAF0E6", "Linen"],
["FAF3F0", "Fantasy"],
["FAF7D6", "Citrine White"],
["FAFAFA", "Alabaster"],
["FAFDE4", "Hint of Yellow"],
["FAFFA4", "Milan"],
["FB607F", "Brink Pink"],
["FB8989", "Geraldine"],
["FBA0E3", "Lavender Rose"],
["FBA129", "Sea Buckthorn"],
["FBAC13", "Sun"],
["FBAED2", "Lavender Pink"],
["FBB2A3", "Rose Bud"],
["FBBEDA", "Cupid"],
["FBCCE7", "Classic Rose"],
["FBCEB1", "Apricot Peach"],
["FBE7B2", "Banana Mania"],
["FBE870", "Marigold Yellow"],
["FBE96C", "Festival"],
["FBEA8C", "Sweet Corn"],
["FBEC5D", "Candy Corn"],
["FBF9F9", "Hint of Red"],
["FBFFBA", "Shalimar"],
["FC0FC0", "Shocking Pink"],
["FC80A5", "Tickle Me Pink"],
["FC9C1D", "Tree Poppy"],
["FCC01E", "Lightning Yellow"],
["FCD667", "Goldenrod"],
["FCD917", "Candlelight"],
["FCDA98", "Cherokee"],
["FCF4D0", "Double Pearl Lusta"],
["FCF4DC", "Pearl Lusta"],
["FCF8F7", "Vista White"],
["FCFBF3", "Bianca"],
["FCFEDA", "Moon Glow"],
["FCFFE7", "China Ivory"],
["FCFFF9", "Ceramic"],
["FD0E35", "Torch Red"],
["FD5B78", "Wild Watermelon"],
["FD7B33", "Crusta"],
["FD7C07", "Sorbus"],
["FD9FA2", "Sweet Pink"],
["FDD5B1", "Light Apricot"],
["FDD7E4", "Pig Pink"],
["FDE1DC", "Cinderella"],
["FDE295", "Golden Glow"],
["FDE910", "Lemon"],
["FDF5E6", "Old Lace"],
["FDF6D3", "Half Colonial White"],
["FDF7AD", "Drover"],
["FDFEB8", "Pale Prim"],
["FDFFD5", "Cumulus"],
["FE28A2", "Persian Rose"],
["FE4C40", "Sunset Orange"],
["FE6F5E", "Bittersweet"],
["FE9D04", "California"],
["FEA904", "Yellow Sea"],
["FEBAAD", "Melon"],
["FED33C", "Bright Sun"],
["FED85D", "Dandelion"],
["FEDB8D", "Salomie"],
["FEE5AC", "Cape Honey"],
["FEEBF3", "Remy"],
["FEEFCE", "Oasis"],
["FEF0EC", "Bridesmaid"],
["FEF2C7", "Beeswax"],
["FEF3D8", "Bleach White"],
["FEF4CC", "Pipi"],
["FEF4DB", "Half Spanish White"],
["FEF4F8", "Wisp Pink"],
["FEF5F1", "Provincial Pink"],
["FEF7DE", "Half Dutch White"],
["FEF8E2", "Solitaire"],
["FEF8FF", "White Pointer"],
["FEF9E3", "Off Yellow"],
["FEFCED", "Orange White"],
["FF0000", "Red"],
["FF007F", "Rose"],
["FF00CC", "Purple Pizzazz"],
["FF00FF", "Magenta / Fuchsia"],
["FF2400", "Scarlet"],
["FF3399", "Wild Strawberry"],
["FF33CC", "Razzle Dazzle Rose"],
["FF355E", "Radical Red"],
["FF3F34", "Red Orange"],
["FF4040", "Coral Red"],
["FF4D00", "Vermilion"],
["FF4F00", "International Orange"],
["FF6037", "Outrageous Orange"],
["FF6600", "Blaze Orange"],
["FF66FF", "Pink Flamingo"],
["FF681F", "Orange"],
["FF69B4", "Hot Pink"],
["FF6B53", "Persimmon"],
["FF6FFF", "Blush Pink"],
["FF7034", "Burning Orange"],
["FF7518", "Pumpkin"],
["FF7D07", "Flamenco"],
["FF7F00", "Flush Orange"],
["FF7F50", "Coral"],
["FF8C69", "Salmon"],
["FF9000", "Pizazz"],
["FF910F", "West Side"],
["FF91A4", "Pink Salmon"],
["FF9933", "Neon Carrot"],
["FF9966", "Atomic Tangerine"],
["FF9980", "Vivid Tangerine"],
["FF9E2C", "Sunshade"],
["FFA000", "Orange Peel"],
["FFA194", "Mona Lisa"],
["FFA500", "Web Orange"],
["FFA6C9", "Carnation Pink"],
["FFAB81", "Hit Pink"],
["FFAE42", "Yellow Orange"],
["FFB0AC", "Cornflower Lilac"],
["FFB1B3", "Sundown"],
["FFB31F", "My Sin"],
["FFB555", "Texas Rose"],
["FFB7D5", "Cotton Candy"],
["FFB97B", "Macaroni and Cheese"],
["FFBA00", "Selective Yellow"],
["FFBD5F", "Koromiko"],
["FFBF00", "Amber"],
["FFC0A8", "Wax Flower"],
["FFC0CB", "Pink"],
["FFC3C0", "Your Pink"],
["FFC901", "Supernova"],
["FFCBA4", "Flesh"],
["FFCC33", "Sunglow"],
["FFCC5C", "Golden Tainoi"],
["FFCC99", "Peach Orange"],
["FFCD8C", "Chardonnay"],
["FFD1DC", "Pastel Pink"],
["FFD2B7", "Romantic"],
["FFD38C", "Grandis"],
["FFD700", "Gold"],
["FFD800", "School bus Yellow"],
["FFD8D9", "Cosmos"],
["FFDB58", "Mustard"],
["FFDCD6", "Peach Schnapps"],
["FFDDAF", "Caramel"],
["FFDDCD", "Tuft Bush"],
["FFDDCF", "Watusi"],
["FFDDF4", "Pink Lace"],
["FFDEAD", "Navajo White"],
["FFDEB3", "Frangipani"],
["FFE1DF", "Pippin"],
["FFE1F2", "Pale Rose"],
["FFE2C5", "Negroni"],
["FFE5A0", "Cream Brulee"],
["FFE5B4", "Peach"],
["FFE6C7", "Tequila"],
["FFE772", "Kournikova"],
["FFEAC8", "Sandy Beach"],
["FFEAD4", "Karry"],
["FFEC13", "Broom"],
["FFEDBC", "Colonial White"],
["FFEED8", "Derby"],
["FFEFA1", "Vis Vis"],
["FFEFC1", "Egg White"],
["FFEFD5", "Papaya Whip"],
["FFEFEC", "Fair Pink"],
["FFF0DB", "Peach Cream"],
["FFF0F5", "Lavender blush"],
["FFF14F", "Gorse"],
["FFF1B5", "Buttermilk"],
["FFF1D8", "Pink Lady"],
["FFF1EE", "Forget Me Not"],
["FFF1F9", "Tutu"],
["FFF39D", "Picasso"],
["FFF3F1", "Chardon"],
["FFF46E", "Paris Daisy"],
["FFF4CE", "Barley White"],
["FFF4DD", "Egg Sour"],
["FFF4E0", "Sazerac"],
["FFF4E8", "Serenade"],
["FFF4F3", "Chablis"],
["FFF5EE", "Seashell Peach"],
["FFF5F3", "Sauvignon"],
["FFF6D4", "Milk Punch"],
["FFF6DF", "Varden"],
["FFF6F5", "Rose White"],
["FFF8D1", "Baja White"],
["FFF9E2", "Gin Fizz"],
["FFF9E6", "Early Dawn"],
["FFFACD", "Lemon Chiffon"],
["FFFAF4", "Bridal Heath"],
["FFFBDC", "Scotch Mist"],
["FFFBF9", "Soapstone"],
["FFFC99", "Witch Haze"],
["FFFCEA", "Buttery White"],
["FFFCEE", "Island Spice"],
["FFFDD0", "Cream"],
["FFFDE6", "Chilean Heath"],
["FFFDE8", "Travertine"],
["FFFDF3", "Orchid White"],
["FFFDF4", "Quarter Pearl Lusta"],
["FFFEE1", "Half and Half"],
["FFFEEC", "Apricot White"],
["FFFEF0", "Rice Cake"],
["FFFEF6", "Black White"],
["FFFEFD", "Romance"],
["FFFF00", "Yellow"],
["FFFF66", "Laser Lemon"],
["FFFF99", "Pale Canary"],
["FFFFB4", "Portafino"],
["FFFFF0", "Ivory"],
["FFFFFF", "White"]
]

}

ntc.init();
