/**
 * Copyright (c) 2006-2020, JGraph Ltd
 * Copyright (c) 2006-2020, draw.io AG
 */

/**
 * Constructs a new point for the optional x and y coordinates. If no
 * coordinates are given, then the default values for <x> and <y> are used.
 * @constructor
 * @class Implements a basic 2D point. Known subclassers = {@link mxRectangle}.
 * @param {number} x X-coordinate of the point.
 * @param {number} y Y-coordinate of the point.
 */
App = function(editor, container, lightbox)
{
	EditorUi.call(this, editor, container, (lightbox != null) ? lightbox :
		(urlParams['lightbox'] == '1' || (uiTheme == 'min' &&
		urlParams['chrome'] != '0')));
	
	// Logs unloading of window with modifications for Google Drive file
	if (!mxClient.IS_CHROMEAPP && !EditorUi.isElectronApp)
	{
		window.onunload = mxUtils.bind(this, function()
		{
			var file = this.getCurrentFile();
			
			if (file != null && file.isModified())
			{
				var evt = {category: 'DISCARD-FILE-' + file.getHash(),
					action: ((file.savingFile) ? 'saving' : '') +
					((file.savingFile && file.savingFileTime != null) ? '_' +
						Math.round((Date.now() - file.savingFileTime.getTime()) / 1000) : '') +
					((file.saveLevel != null) ? ('-sl_' + file.saveLevel) : '') +
					'-age_' + ((file.ageStart != null) ? Math.round((Date.now() - file.ageStart.getTime()) / 1000) : 'x') +
					((this.editor.autosave) ? '' : '-nosave') +
					((file.isAutosave()) ? '' : '-noauto') +
					'-open_' + ((file.opened != null) ? Math.round((Date.now() - file.opened.getTime()) / 1000) : 'x') +
					'-save_' + ((file.lastSaved != null) ? Math.round((Date.now() - file.lastSaved.getTime()) / 1000) : 'x') +
					'-change_' + ((file.lastChanged != null) ? Math.round((Date.now() - file.lastChanged.getTime()) / 1000) : 'x') +
					'-alive_' + Math.round((Date.now() - App.startTime.getTime()) / 1000),
					label: (file.sync != null) ? ('client_' + file.sync.clientId) : 'nosync'};
					
				if (file.constructor == DriveFile && file.desc != null && this.drive != null)
				{
					evt.label += ((this.drive.user != null) ? ('-user_' + this.drive.user.id) : '-nouser') + '-rev_' +
						file.desc.headRevisionId + '-mod_' + file.desc.modifiedDate + '-size_' + file.getSize() +
						'-mime_' + file.desc.mimeType;
				}

				EditorUi.logEvent(evt);
			}
		});
	}

	// Logs changes to autosave
	this.editor.addListener('autosaveChanged', mxUtils.bind(this, function()
	{
		var file = this.getCurrentFile();
		
		if (file != null)
		{
			EditorUi.logEvent({category: ((this.editor.autosave) ? 'ON' : 'OFF') +
				'-AUTOSAVE-FILE-' + file.getHash(), action: 'changed',
				label: 'autosave_' + ((this.editor.autosave) ? 'on' : 'off')});
		}
	}));
	
	// Pre-fetches images
	if (mxClient.IS_SVG)
	{
		mxGraph.prototype.warningImage.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAE7SURBVHjaYvz//z8DJQAggBjwGXDuHMP/tWuD/uPTCxBAOA0AaQRK/f/+XeJ/cbHlf1wGAAQQTgPu3QNLgfHSpZo4DQAIIKwGwGyH4e/fFbG6AiQJEEAs2Ew2NFzH8OOHBMO6dT/A/KCg7wxGRh+wuhQggDBcALMdFIAcHBxgDGJjcwVIIUAAYbhAUXEdVos4OO4DXcGBIQ4QQCguQPY7sgtgAYruCpAgQACx4LJdU1OCwctLEcyWlLwPJF+AXQE0EMUBAAEEdwF6yMOiD4RRY0QT7gqQAEAAseDzu6XldYYPH9DD4joQa8L5AAEENgWb7SBcXa0JDQMBrK4AcQACiAlfyOMCEFdAnAYQQEz4FLa0XGf4/v0H0IIPONUABBAjyBmMjIwMS5cK/L927QORbtBkaG29DtYLEGAAH6f7oq3Zc+kAAAAASUVORK5CYII=';
	}
	else
	{
		var img = new Image();
		img.src = mxGraph.prototype.warningImage.src;
	}
	
	// Global helper method to deal with popup blockers
	window.openWindow = mxUtils.bind(this, function(url, pre, fallback)
	{
		if (urlParams['openInSameWin'] == '1' || navigator.standalone)
		{
			if (fallback != null)
			{
				fallback();
			}
		}
		else
		{
			var wnd = null;
			
			try
			{
				wnd = window.open(url);
			}
			catch (e)
			{
				// ignore
			}
			
			if (wnd == null || wnd === undefined)
			{
				this.showDialog(new PopupDialog(this, url, pre, fallback).container, 320, 140, true, true);
			}
			else if (pre != null)
			{
				pre();
			}
		}
	});

	// Initial state for toolbar items is disabled
	this.updateDocumentTitle();
	this.updateUi();

	// Global helper method to display error messages
	window.showOpenAlert = mxUtils.bind(this, function(message)
	{
		// Cancel must be called before showing error message
		if (window.openFile != null)
		{
			window.openFile.cancel(true);
		}
		
		this.handleError(message);
	});

	// Handles opening files via drag and drop
	if (!this.editor.chromeless || this.editor.editable)
	{
		this.addFileDropHandler([document]);
	}
	
	// Process the queue for waiting plugins
	if (App.DrawPlugins != null)
	{
		for (var i = 0; i < App.DrawPlugins.length; i++)
		{
			try
			{
				App.DrawPlugins[i](this);
			}
			catch (e)
			{
				if (window.console != null)
				{
					console.log('Plugin Error:', e, App.DrawPlugins[i]);
				}
			}
			finally
			{
				App.embedModePluginsCount--;
				this.initializeEmbedMode();
			}
		}
		
		// Installs global callback for plugins
		window.Draw.loadPlugin = mxUtils.bind(this, function(callback)
		{
			try
			{
				callback(this);
			}
			finally
			{
				App.embedModePluginsCount--;
				this.initializeEmbedMode();
			}
		});
		
		//Set a timeout in case a plugin doesn't load quickly or doesn't load at all
		setTimeout(mxUtils.bind(this, function()
		{
			//Force finish loading if its not yet called
			if (App.embedModePluginsCount > 0)
			{
				App.embedModePluginsCount = 0;
				this.initializeEmbedMode();
			}
		}), 5000); //5 sec timeout
	}

	this.load();
};

/**
 * Timeout error
 */
App.ERROR_TIMEOUT = 'timeout';

/**
 * Busy error
 */
App.ERROR_BUSY = 'busy';

/**
 * Unknown error
 */
App.ERROR_UNKNOWN = 'unknown';

/**
 * Google drive mode
 */
App.MODE_GOOGLE = 'google';

/**
 * Dropbox mode
 */
App.MODE_DROPBOX = 'dropbox';

/**
 * OneDrive Mode
 */
App.MODE_ONEDRIVE = 'onedrive';

/**
 * Github Mode
 */
App.MODE_GITHUB = 'github';

/**
 * Gitlab mode
 */
App.MODE_GITLAB = 'gitlab';

/**
 * Device Mode
 */
App.MODE_DEVICE = 'device';

/**
 * Browser Mode
 */
App.MODE_BROWSER = 'browser';

/**
 * Trello App Mode
 */
App.MODE_TRELLO = 'trello';

/**
 * Embed App Mode
 */
App.MODE_EMBED = 'embed';

/**
 * Atlas App Mode
 */
App.MODE_ATLAS = 'atlas';

/**
 * Sets the delay for autosave in milliseconds. Default is 2000.
 */
App.DROPBOX_APPKEY = window.DRAWIO_DROPBOX_ID;

/**
 * Sets URL to load the Dropbox SDK from
 */
App.DROPBOX_URL = window.DRAWIO_BASE_URL + '/js/dropbox/Dropbox-sdk.min.js';

/**
 * Sets URL to load the Dropbox dropins JS from.
 */
App.DROPINS_URL = 'https://www.dropbox.com/static/api/2/dropins.js';

/**
 * OneDrive Client JS (file/folder picker). This is a slightly modified version to allow using accessTokens
 * But it doesn't work for IE11, so we fallback to the original one
 */
App.ONEDRIVE_URL = mxClient.IS_IE11? 'https://js.live.net/v7.2/OneDrive.js' : window.DRAWIO_BASE_URL + '/js/onedrive/OneDrive.js';

/**
 * Trello URL
 */
App.TRELLO_URL = 'https://api.trello.com/1/client.js';

/**
 * Trello JQuery dependency
 */
App.TRELLO_JQUERY_URL = window.DRAWIO_BASE_URL + '/js/jquery/jquery-3.6.0.min.js';

/**
 * Specifies the key for the pusher project.
 */
App.PUSHER_KEY = '1e756b07a690c5bdb054';

/**
 * Specifies the key for the pusher project.
 */
App.PUSHER_CLUSTER = 'eu';

/**
 * Specifies the URL for the pusher API.
 */
App.PUSHER_URL = 'https://js.pusher.com/7.0.3/pusher.min.js';

/**
 * SimplePeer library 
 */
 App.SIMPLE_PEER_URL = window.DRAWIO_BASE_URL + '/js/simplepeer/simplepeer9.10.0.min.js';

/**
 * Google APIs to load. The realtime API is needed to notify collaborators of conversion
 * of the realtime files, but after Dec 11 it's read-only and hence no longer needed.
 */
App.GOOGLE_APIS = 'drive-share'; 

/**
 * Function: authorize
 * 
 * Authorizes the client, gets the userId and calls <open>.
 */
App.startTime = new Date();

/**
 * Defines plugin IDs for loading via p URL parameter. Update the table at
 * https://www.drawio.com/doc/faq/supported-url-parameters
 */
App.pluginRegistry = {'4xAKTrabTpTzahoLthkwPNUn': 'plugins/explore.js',
	'ex': 'plugins/explore.js',
	'ac': 'plugins/connect.js', 'acj': 'plugins/connectJira.js',
	'ac148': 'plugins/cConf-1-4-8.js', 'ac148cmnt': 'plugins/cConf-comments.js', 
	'nxtcld': 'plugins/nextcloud.js',
	'monday': 'plugins/monday.js',
	'voice': 'plugins/voice.js',
	'tips': 'plugins/tooltips.js', 'svgdata': 'plugins/svgdata.js',
	'number': 'plugins/number.js', 'sql': 'plugins/sql.js',
	'props': 'plugins/props.js', 'text': 'plugins/text.js',
	'anim': 'plugins/animation.js', 'update': 'plugins/update.js',
	'trees': 'plugins/trees/trees.js', 'import': 'plugins/import.js',
	'replay': 'plugins/replay.js', 'anon': 'plugins/anonymize.js',
	'tr': 'plugins/trello.js', 'f5': 'plugins/rackF5.js',
	'tickets': 'plugins/tickets.js', 'flow': 'plugins/flow.js',
	'webcola': 'plugins/webcola/webcola.js', 'rnd': 'plugins/random.js',
	'page': 'plugins/page.js', 'gd': 'plugins/googledrive.js',
	'tags': 'plugins/tags.js'};

App.publicPlugin = [
	'ex',
	'voice',
	'tips',
	'svgdata',
	'number',
	'sql',
	'props',
	'text',
	'anim',
	'update',
	'trees',
//	'import',
	'replay',
	'anon',
	'tickets',
	'flow',
	'webcola',
//	'rnd', 'page', 'gd',
	'tags'
];

/**
 * Loads all given scripts and invokes onload after
 * all scripts have finished loading.
 */
App.loadScripts = function(scripts, onload, onerror)
{
	var n = scripts.length;
	var failed = false;
	
	for (var i = 0; i < scripts.length; i++)
	{
		mxscript(scripts[i], function()
		{
			if (--n == 0 && !failed && onload != null)
			{
				onload();
			}
		}, null, null, null, function(message)
		{
			failed = true;

			if (onerror != null)
			{
				onerror(new Error(message));
			}
		});
	}
};

/**
 * Function: getStoredMode
 * 
 * Returns the current mode.
 */
App.getStoredMode = function()
{
	var mode = null;
	
	if (mode == null && isLocalStorage)
	{
		mode = localStorage.getItem('.mode');
	}
	
	if (mode == null && typeof(Storage) != 'undefined')
	{
		var cookies = document.cookie.split(";");
		
		for (var i = 0; i < cookies.length; i++)
		{
			// Removes spaces around cookie
			var cookie = mxUtils.trim(cookies[i]);
			
			if (cookie.substring(0, 5) == 'MODE=')
			{
				mode = cookie.substring(5);
				break;
			}
		}
		
		if (mode != null && isLocalStorage)
		{
			// Moves to local storage
			var expiry = new Date();
			expiry.setYear(expiry.getFullYear() - 1);
			document.cookie = 'MODE=; expires=' + expiry.toUTCString();
			localStorage.setItem('.mode', mode);
		}
	}
	
	return mode;
};

/**
 * Static Application initializer executed at load-time.
 */
(function()
{
	if (!mxClient.IS_CHROMEAPP)
	{
		if (urlParams['offline'] != '1')
		{
			// Switches to dropbox mode for db.draw.io
			if (window.location.hostname == 'db.draw.io' && urlParams['mode'] == null)
			{
				urlParams['mode'] = 'dropbox';
			}
			
			App.mode = urlParams['mode'];
		}
			
		if (App.mode == null)
		{
			// Stored mode overrides preferred mode
			App.mode = App.getStoredMode();
		}
		
		/**
		 * Lazy loading backends.
		 */
		if (window.mxscript != null)
		{
			// Loads gapi for all browsers but IE8 and below if not disabled or if enabled and in embed mode
			if (urlParams['embed'] != '1')
			{
				if (typeof window.DriveClient === 'function')
				{
					if (urlParams['gapi'] != '0' && isSvgBrowser &&
						(document.documentMode == null || document.documentMode >= 10))
					{
						// Immediately loads client
						if (App.mode == App.MODE_GOOGLE || (urlParams['state'] != null &&
							window.location.hash == '') || (window.location.hash != null &&
							window.location.hash.substring(0, 2) == '#G'))
						{
							mxscript('https://apis.google.com/js/api.js');
						}
						// Keeps lazy loading for fallback to authenticated Google file if not public in loadFile
						else if (urlParams['chrome'] == '0' && (window.location.hash == null ||
							window.location.hash.substring(0, 45) !== '#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D'))
						{
							// Disables loading of client
							window.DriveClient = null;
						}
					}
					else
					{
						// Disables loading of client
						window.DriveClient = null;
					}
				}
	
				// Loads dropbox for all browsers but IE8 and below (no CORS) if not disabled or if enabled and in embed mode
				// KNOWN: Picker does not work in IE11 (https://dropbox.zendesk.com/requests/1650781)
				if (typeof window.DropboxClient === 'function')
				{
					if (urlParams['db'] != '0' && isSvgBrowser &&
						(document.documentMode == null || document.documentMode > 9))
					{
						// Immediately loads client
						if (App.mode == App.MODE_DROPBOX || (window.location.hash != null &&
							window.location.hash.substring(0, 2) == '#D'))
						{
							mxscript(App.DROPBOX_URL, function()
							{
								// Must load this after the dropbox SDK since they use the same namespace
								mxscript(App.DROPINS_URL, null, 'dropboxjs', App.DROPBOX_APPKEY, true);
							});							
						}
						else if (urlParams['chrome'] == '0')
						{
							window.DropboxClient = null;
						}
					}
					else
					{
						// Disables loading of client
						window.DropboxClient = null;
					}
				}
				
				// Loads OneDrive for all browsers but IE6/IOS if not disabled or if enabled and in embed mode
				if (typeof window.OneDriveClient === 'function')
				{
					if (urlParams['od'] != '0' && (navigator.userAgent == null ||
						navigator.userAgent.indexOf('MSIE') < 0 || document.documentMode >= 10))
					{
						// Immediately loads client
						if (App.mode == App.MODE_ONEDRIVE || (window.location.hash != null &&
							window.location.hash.substring(0, 2) == '#W'))
						{
							//Editor.oneDriveInlinePicker can be set with configuration which is done later, so load it all time
							mxscript(App.ONEDRIVE_URL);
						}
						else if (urlParams['chrome'] == '0')
						{
							window.OneDriveClient = null;
						}
					}
					else
					{
						// Disables loading of client
						window.OneDriveClient = null;
					}
				}
				
				// Loads Trello for all browsers but < IE10 if not disabled or if enabled and in embed mode
				if (typeof window.TrelloClient === 'function')
				{
					if (urlParams['tr'] == '1' && isSvgBrowser && !mxClient.IS_IE11 &&
						(document.documentMode == null || document.documentMode >= 10))
					{
						// Immediately loads client
						if (App.mode == App.MODE_TRELLO || (window.location.hash != null &&
							window.location.hash.substring(0, 2) == '#T'))
						{
							mxscript(App.TRELLO_JQUERY_URL, function()
							{
								mxscript(App.TRELLO_URL);
							});
						}
						else if (urlParams['chrome'] == '0')
						{
							window.TrelloClient = null;
						}
					}
					else
					{
						// Disables loading of client
						window.TrelloClient = null;
					}
				}
			}
		}
	}
})();

/**
 * Clears the PWA cache.
 */
App.clearServiceWorker = function(success, error)
{
	navigator.serviceWorker.getRegistrations().then(function(registrations)
	{
		if (registrations != null && registrations.length > 0)
		{
			for (var i = 0; i < registrations.length; i++)
			{
				registrations[i].unregister();
			}

			if (success != null)
			{
				success();
			}
		}
	})['catch'](function()
	{
		if (error != null)
		{
			error();
		}
	});
};

/**
 * Returns true if the given link is on the same domain as this app.
 */
App.isSameDomain = function(link)
{
	var a = document.createElement('a');
	a.href = link;

	return a.protocol === window.location.protocol ||
		a.host === window.location.host;
};

/**
 * Returns true if the given relative path is a built-in plugin.
 */
App.isBuiltInPlugin = function(path)
{
	for (var key in App.pluginRegistry)
	{
		if (App.pluginRegistry[key] == path)
		{
			return true;
		}
	}

	return false;
};

/**
 * Program flow starts here.
 * 
 * Optional callback is called with the app instance.
 */
App.main = function(callback, createUi)
{
	try
	{
		// This function is called only once, so we can set the flag here
		// Safari calls window.load event when the location hash is set (e.g, on descriptor change) resulting in calling main twice
		if (App.isMainCalled) 
		{
			return;
		}
		
		App.isMainCalled = true;
		// Handles uncaught errors before the app is loaded
		window.onerror = function(message, url, linenumber, colno, err)
		{
			EditorUi.logError('Global: ' + ((message != null) ? message : ''),
				url, linenumber, colno, err, null, true);
			
			if (window.console != null && !EditorUi.isElectronApp)
			{
				console.error('Message:', message, '\nURL:', url, '\nLine:',
					linenumber, '\nColumn:', colno, '\nError:', err);
			}
			else
			{
				mxLog.show();
				mxLog.debug('Message:', message, '\nURL:', url, '\nLine:',
					linenumber, '\nColumn:', colno, '\nError:', err);
			}

			// Waits for page and console output to appear
			window.setTimeout(function()
			{
				alert('Error: ' + ((message != null) ? message : ''));
			}, 100);
		};

		// Blocks stand-alone mode for certain subdomains
		if (window.top == window.self &&
			('import.diagrams.net' === window.location.hostname ||
			'ac.draw.io' === window.location.hostname ||
			'aj.draw.io' === window.location.hostname))
		{
			document.body.innerHTML = '<div style="margin-top:10%;text-align:center;">Stand-alone mode not allowed for this domain.</div>';
			
			return;
		}
		
		// Removes info text in embed mode
		if (urlParams['embed'] == '1' || urlParams['lightbox'] == '1')
		{
			var geInfo = document.getElementById('geInfo');
			
			if (geInfo != null)
			{
				geInfo.parentNode.removeChild(geInfo);
			}
		}
		
		// Redirects to the latest AWS icons
		if (document.referrer != null && urlParams['libs'] == 'aws3' &&
			document.referrer.substring(0, 42) == 'https://aws.amazon.com/architecture/icons/')
		{
			urlParams['libs'] = 'aws4';
		}
		
		if (window.mxscript != null)
		{
			// Checks for script content changes to avoid CSP errors in production
			if (urlParams['dev'] == '1' && !mxClient.IS_CHROMEAPP && !EditorUi.isElectronApp &&
				CryptoJS != null && App.mode != App.MODE_DROPBOX && App.mode != App.MODE_TRELLO)
			{
				var scripts = document.getElementsByTagName('script');
				
				// Checks bootstrap script
				if (scripts != null && scripts.length > 0)
				{
					var content = mxUtils.getTextContent(scripts[0]);
					
					if (CryptoJS.MD5(content).toString() != '3428184eed5811f9c1458f703cb2806b')
					{
						console.log('Change bootstrap script MD5 in the previous line:', CryptoJS.MD5(content).toString());
						alert('[Dev] Bootstrap script change requires update of CSP');
					}
				}
				
				// Checks main script
				if (scripts != null && scripts.length > 1)
				{
					var content = mxUtils.getTextContent(scripts[scripts.length - 1]);
					
					if (CryptoJS.MD5(content).toString() != '69c25556b6237c57cdb7d017147af34b')
					{
						console.log('Change main script MD5 in the previous line:', CryptoJS.MD5(content).toString());
						alert('[Dev] Main script change requires update of CSP');
					}
				}
			}

			try
			{
				// Removes PWA cache on www.draw.io to force use of new domain via redirect
				if (Editor.enableServiceWorker && (urlParams['offline'] == '0' ||
					/www\.draw\.io$/.test(window.location.hostname) ||
					(urlParams['offline'] != '1' && urlParams['dev'] == '1')))
				{
					App.clearServiceWorker(function()
					{
						if (urlParams['offline'] == '0')
						{
							alert('Cache cleared');
						}
					});
				}
				else if (Editor.enableServiceWorker)
				{
					// Runs as progressive web app if service workers are supported
					navigator.serviceWorker.register('service-worker.js');
				}
			}
			catch (e)
			{
				if (window.console != null && !EditorUi.isElectronApp)
				{
					console.error(e);
				}
				else
				{
					mxLog.show();
					mxLog.debug(e.stack);
				}
			}
			
			// Loads Pusher API
			if (('ArrayBuffer' in window) && !mxClient.IS_CHROMEAPP && !EditorUi.isElectronApp &&
				DrawioFile.SYNC == 'auto' && (urlParams['embed'] != '1' ||
				urlParams['embedRT'] == '1') && urlParams['local'] != '1' &&
				(urlParams['chrome'] != '0' || urlParams['rt'] == '1') &&
				urlParams['stealth'] != '1' && urlParams['offline'] != '1')
			{
				// TODO: Check if async loading is fast enough
				mxscript(App.PUSHER_URL);
				
				if (urlParams['fast-sync'] == '1')
				{
					mxscript(App.SIMPLE_PEER_URL);
				}
			}
			
			// Loads plugins
			if (urlParams['plugins'] != '0' && urlParams['offline'] != '1')
			{
				// mxSettings is not yet initialized in configure mode, redirect parameter
				// to p URL parameter in caller for plugins in embed mode
				var plugins = (mxSettings.settings != null) ? mxSettings.getPlugins() : null;
				
				// Configured plugins in embed mode with configure=1 URL should be loaded so we
				// look ahead here and parse the config to fetch the list of custom plugins
				if (mxSettings.settings == null && isLocalStorage && typeof(JSON) !== 'undefined')
				{
					try
					{
						var temp = JSON.parse(localStorage.getItem(mxSettings.key));
						
						if (temp != null)
						{
							plugins = temp.plugins;
						}
					}
					catch (e)
					{
						// ignore
					}
				}

				var temp = urlParams['p'];
				App.initPluginCallback();

				if (temp != null)
				{
					// Mapping from key to URL in App.plugins
					App.loadPlugins(temp.split(';'));
				}
				
				if (plugins != null && plugins.length > 0 && urlParams['plugins'] != '0')
				{
					for (var i = 0; i < plugins.length; i++)
					{
						try
						{
							if (plugins[i].charAt(0) == '/')
							{
								plugins[i] = PLUGINS_BASE_PATH + plugins[i];
							}

							if (!App.isSameDomain(plugins[i]))
							{
								if (window.console != null)
								{
									console.log('Blocked plugin:', plugins[i]);
								}
							}
							else if (!ALLOW_CUSTOM_PLUGINS && !App.isBuiltInPlugin(plugins[i]))
							{
								if (window.console != null)
								{
									console.log('Unknown plugin:', plugins[i]);
								}
							}
							else if (App.pluginsLoaded[plugins[i]] == null)
							{
								App.pluginsLoaded[plugins[i]] = true;
								App.embedModePluginsCount++;
								mxscript(plugins[i]);
							}
						}
						catch (e)
						{
							// ignore
						}
					}
				}
			}
			
			// Loads gapi for all browsers but IE8 and below if not disabled or if enabled and in embed mode
			// Special case: Cannot load in asynchronous code below
			if (typeof window.DriveClient === 'function' &&
				(typeof gapi === 'undefined' && (((urlParams['embed'] != '1' && urlParams['gapi'] != '0') ||
				(urlParams['embed'] == '1' && urlParams['gapi'] == '1')) && isSvgBrowser &&
				isLocalStorage && (document.documentMode == null || document.documentMode >= 10))))
			{
				mxscript('https://apis.google.com/js/api.js?onload=DrawGapiClientCallback', null, null, null, mxClient.IS_SVG);
			}
			// Disables client
			else if (typeof window.gapi === 'undefined')
			{
				window.DriveClient = null;
			}
		}
		
		/**
		 * Asynchronous MathJax extension.
		 */
		if (urlParams['math'] != '0')
		{
			Editor.initMath();
		}

		function doLoad(bundle)
		{
			// Prefetches asynchronous requests so that below code runs synchronous
			// Loading the correct bundle (one file) via the fallback system in mxResources. The stylesheet
			// is compiled into JS in the build process and is only needed for local development.
			mxUtils.getAll((urlParams['dev'] != '1') ? [bundle] : [bundle,
				STYLE_PATH + '/default.xml'], function(xhr)
			{
				// Adds bundle text to resources
				mxResources.parse(xhr[0].getText());
				
				// Configuration mode
				if (isLocalStorage && localStorage != null && window.location.hash != null &&
					window.location.hash.substring(0, 9) == '#_CONFIG_')
				{
					try
					{
						var value = JSON.parse(Graph.decompress(window.location.hash.substring(9)));

						if (value != null)
						{
							EditorUi.debug('Setting configuration', JSON.stringify(value));
							
							if (value.merge != null)
							{
								var temp = localStorage.getItem(Editor.configurationKey);
								
								if (temp != null)
								{
									try
									{
										var config = JSON.parse(temp);
										
										for (var key in value.merge)
										{
											config[key] = value.merge[key];
										}
										
										value = config;
									}
									catch (e)
									{
										window.location.hash = '';
										alert(e);
									}
								}
								else
								{
									value = value.merge;
								}
							}
							
							if (confirm(mxResources.get('configLinkWarn')) &&
								confirm(mxResources.get('configLinkConfirm')))
							{
								localStorage.setItem(Editor.configurationKey, JSON.stringify(value));
								window.location.hash = '';
								window.location.reload();
							}
						}

						window.location.hash = '';
					}
					catch (e)
					{
						window.location.hash = '';
						alert(e);
					}
				}
				
				// Prepares themes with mapping from old default-style to old XML file
				if (xhr.length > 1)
				{
					Graph.prototype.defaultThemes['default-style2'] = xhr[1].getDocumentElement();
					Graph.prototype.defaultThemes['darkTheme'] = xhr[1].getDocumentElement();
				}
				
				// Main
				function realMain()
				{
					try
					{
						var ui = (createUi != null) ? createUi() : new App(new Editor(
								urlParams['chrome'] == '0' || uiTheme == 'min',
								null, null, null, urlParams['chrome'] != '0'));
						
						if (window.mxscript != null)
						{
							// Loads dropbox for all browsers but IE8 and below (no CORS) if not disabled or if enabled and in embed mode
							// KNOWN: Picker does not work in IE11 (https://dropbox.zendesk.com/requests/1650781)
							if (typeof window.DropboxClient === 'function' &&
								(window.Dropbox == null && window.DrawDropboxClientCallback != null &&
								(((urlParams['embed'] != '1' && urlParams['db'] != '0') ||
								(urlParams['embed'] == '1' && urlParams['db'] == '1')) &&
								isSvgBrowser && (document.documentMode == null || document.documentMode > 9))))
							{
								mxscript(App.DROPBOX_URL, function()
								{
									// Must load this after the dropbox SDK since they use the same namespace
									mxscript(App.DROPINS_URL, function()
									{
										DrawDropboxClientCallback();
									}, 'dropboxjs', App.DROPBOX_APPKEY);
								});
							}
							// Disables client
							else if (typeof window.Dropbox === 'undefined' || typeof window.Dropbox.choose === 'undefined')
							{
								window.DropboxClient = null;
							}
							
							// Loads OneDrive for all browsers but IE6/IOS if not disabled or if enabled and in embed mode
							if (typeof window.OneDriveClient === 'function' &&
								(typeof OneDrive === 'undefined' && window.DrawOneDriveClientCallback != null &&
								(((urlParams['embed'] != '1' && urlParams['od'] != '0') || (urlParams['embed'] == '1' &&
								urlParams['od'] == '1')) && (navigator.userAgent == null ||
								navigator.userAgent.indexOf('MSIE') < 0 || document.documentMode >= 10))))
							{
								//Editor.oneDriveInlinePicker can be set with configuration which is done later, so load it all time
								mxscript(App.ONEDRIVE_URL, window.DrawOneDriveClientCallback);
							}
							// Disables client
							else if (typeof window.OneDrive === 'undefined')
							{
								window.OneDriveClient = null;
							}
							
							// Loads Trello for all browsers but < IE10 if not disabled or if enabled and in embed mode
							if (typeof window.TrelloClient === 'function' && !mxClient.IS_IE11 &&
								typeof window.Trello === 'undefined' && window.DrawTrelloClientCallback != null &&
								urlParams['tr'] == '1' && (navigator.userAgent == null ||
								navigator.userAgent.indexOf('MSIE') < 0 || document.documentMode >= 10))
							{
								mxscript(App.TRELLO_JQUERY_URL, function()
								{
									// Must load this after the dropbox SDK since they use the same namespace
									mxscript(App.TRELLO_URL, function()
									{
										DrawTrelloClientCallback();
									});
								});
							}
							// Disables client
							else if (typeof window.Trello === 'undefined')
							{
								window.TrelloClient = null;
							}
						}
						
						if (callback != null)
						{
							callback(ui);
						}
						
						/**
						 * For developers only
						 */
						if (urlParams['chrome'] != '0' && urlParams['test'] == '1')
						{
							EditorUi.debug('App.start', [ui, (new Date().getTime() - t0.getTime()) + 'ms']);
							
							if (urlParams['export'] != null)
							{
								EditorUi.debug('Export:', EXPORT_URL);
							}
						}
					}
					catch (e)
					{
						if (EditorUi.isElectronApp)
						{
							mxLog.show();
							mxLog.debug(e.stack);
						}
						else
						{
							EditorUi.logError(e.message, null, null, null, e);

							window.setTimeout(function()
							{
								alert(e.message);
							}, 1);
						}
					}
				};
				
				if (urlParams['dev'] == '1' || EditorUi.isElectronApp) //TODO check if we can remove these scripts loading from index.html
				{
					realMain();
				}
				else
				{
					mxStencilRegistry.allowEval = false;
					App.loadScripts(['js/shapes-14-6-5.min.js', 'js/stencils.min.js',
						'js/extensions.min.js'], realMain, function(e)
						{
							document.body.innerHTML = '';
							var pre = document.createElement('pre');
							mxUtils.write(pre, e.stack);
							document.body.appendChild(pre);
						});
				}
			}, function(xhr)
			{
				var st = document.getElementById('geStatus');
				
				if (st != null)
				{
					st.innerHTML = 'Error loading page. <a>Please try refreshing.</a>';
					
					// Tries reload with default resources in case any language resources were not available
					st.getElementsByTagName('a')[0].onclick = function()
					{
						mxLanguage = 'en';
						doLoad(mxResources.getDefaultBundle(RESOURCE_BASE, mxLanguage) ||
								mxResources.getSpecialBundle(RESOURCE_BASE, mxLanguage));
					};
				}
			});
		};

		function doMain()
		{
			// Optional override for autosaveDelay and defaultEdgeLength
			try
			{
				if (mxSettings.settings != null)
				{
					if (mxSettings.settings.autosaveDelay != null)
					{
						var val = parseInt(mxSettings.settings.autosaveDelay);
						
						if (!isNaN(val) && val > 0)
						{
							DrawioFile.prototype.autosaveDelay = val;
							EditorUi.debug('Setting autosaveDelay', val);
						}
						else
						{
							EditorUi.debug('Invalid autosaveDelay', val);
						}
					}
					
					if (mxSettings.settings.defaultEdgeLength != null)
					{
						var val = parseInt(mxSettings.settings.defaultEdgeLength);
						
						if (!isNaN(val) && val > 0)
						{
							Graph.prototype.defaultEdgeLength = val;
							EditorUi.debug('Using defaultEdgeLength', val);
						}
						else
						{
							EditorUi.debug('Invalid defaultEdgeLength', val);
						}
					}
				}
			}
			catch (e)
			{
				if (window.console != null && !EditorUi.isElectronApp)
				{
					console.error(e);
				}
				else
				{
					mxLog.show();
					mxLog.debug(e.stack);
				}
			}

			try
			{
				// Prefetches default fonts with URLs
				if (Menus.prototype.defaultFonts != null)
				{
					for (var i = 0; i < Menus.prototype.defaultFonts.length; i++)
					{
						var value = Menus.prototype.defaultFonts[i];
						
						if (typeof value !== 'string' &&
							value.fontFamily != null &&
							value.fontUrl != null)
						{
							Graph.addFont(value.fontFamily, value.fontUrl);
						}
					}
				}
				
				// Adds required resources (disables loading of fallback properties, this can only
				// be used if we know that all keys are defined in the language specific file)
				mxResources.loadDefaultBundle = false;
				doLoad(mxResources.getDefaultBundle(RESOURCE_BASE, mxLanguage) ||
					mxResources.getSpecialBundle(RESOURCE_BASE, mxLanguage));
			}
			catch (e)
			{
				document.body.innerHTML = '';
				var pre = document.createElement('pre');
				mxUtils.write(pre, e.stack);
				document.body.appendChild(pre);
			}
		};

		// Sends load event if configuration is requested and waits for configure message
		if (urlParams['configure'] == '1')
		{
			var op = window.opener || window.parent;
			
			var configHandler = function(evt)
			{
				if (evt.source == op)
				{
					try
					{
						var data = JSON.parse(evt.data);
						
						if (data != null && data.action == 'configure')
						{
							mxEvent.removeListener(window, 'message', configHandler);
							Editor.configure(data.config);
							mxSettings.load();

							//To enable transparent iframe in dark mode (e.g, in gitlab)
							if (data.colorSchemeMeta)
							{
								mxmeta('color-scheme', 'dark light');
							}

							doMain();
						}
					}
					catch (e)
					{
						if (window.console != null)
						{
							console.log('Error in configure message: ' + e, evt.data);
						}
					}
				}
			};
			
			// Receives XML message from opener and puts it into the graph
			mxEvent.addListener(window, 'message', configHandler);
			op.postMessage(JSON.stringify({event: 'configure'}), '*');
		}
		else
		{
			if (Editor.config == null)
			{
				// Loads configuration from global scope or local storage
				if (window.DRAWIO_CONFIG != null)
				{
					try
					{
						EditorUi.debug('Using global configuration', window.DRAWIO_CONFIG);
						Editor.configure(window.DRAWIO_CONFIG);
						mxSettings.load();
					}
					catch (e)
					{
						if (window.console != null && !EditorUi.isElectronApp)
						{
							console.error(e);
						}
						else
						{
							mxLog.show();
							mxLog.debug(e.stack);
						}
					}
				}
		
				// Loads configuration from local storage
				if (isLocalStorage && localStorage != null && urlParams['embed'] != '1')
				{
					var configData = localStorage.getItem(Editor.configurationKey);
		
					if (configData != null)
					{
						try
						{
							configData = JSON.parse(configData);
							
							if (configData != null)
							{
								EditorUi.debug('Using local configuration', configData);
								Editor.configure(configData);
								mxSettings.load();
							}
						}
						catch (e)
						{
							if (window.console != null && !EditorUi.isElectronApp)
							{
								console.error(e);
							}
							else
							{
								mxLog.show();
								mxLog.debug(e.stack);
							}
						}
					}
				}
			}
			
			doMain();
		}
	}
	catch (e)
	{
		document.body.innerHTML = '';
		var pre = document.createElement('pre');
		mxUtils.write(pre, e.stack);
		document.body.appendChild(pre);
	}
};

//Extends EditorUi
mxUtils.extend(App, EditorUi);

/**
 * Executes the first step for connecting to Google Drive.
 */
App.prototype.defaultUserPicture = IMAGE_PATH + '/default-user.jpg';

/**
 * 
 */
App.prototype.shareImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowOTgwMTE3NDA3MjA2ODExODhDNkFGMDBEQkQ0RTgwOSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxMjU2NzdEMTcwRDIxMUUxQjc0MDkxRDhCNUQzOEFGRCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxMjU2NzdEMDcwRDIxMUUxQjc0MDkxRDhCNUQzOEFGRCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowNjgwMTE3NDA3MjA2ODExODcxRkM4MUY1OTFDMjQ5OCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowNzgwMTE3NDA3MjA2ODExODhDNkFGMDBEQkQ0RTgwOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrM/fs0AAADgSURBVHjaYmDAA/7//88MwgzkAKDGFiD+BsQ/QWxSNaf9RwN37twpI8WAS+gGfP78+RpQSoRYA36iG/D379+vQClNdLVMOMz4gi7w79+/n0CKg1gD9qELvH379hzIHGK9oA508ieY8//8+fO5rq4uFCilRKwL1JmYmNhhHEZGRiZ+fn6Q2meEbDYG4u3/cYCfP38uA7kOm0ZOIJ7zn0jw48ePPiDFhmzArv8kgi9fvuwB+w5qwH9ykjswbFSZyM4sEMDPBDTlL5BxkFSd7969OwZ2BZKYGhDzkmjOJ4AAAwBhpRqGnEFb8QAAAABJRU5ErkJggg==';
App.prototype.chevronUpImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDg2NEE3NUY1MUVBMTFFM0I3MUVEMTc0N0YyOUI4QzEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDg2NEE3NjA1MUVBMTFFM0I3MUVEMTc0N0YyOUI4QzEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0ODY0QTc1RDUxRUExMUUzQjcxRUQxNzQ3RjI5QjhDMSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0ODY0QTc1RTUxRUExMUUzQjcxRUQxNzQ3RjI5QjhDMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pg+qUokAAAAMUExURQAAANnZ2b+/v////5bgre4AAAAEdFJOU////wBAKqn0AAAAL0lEQVR42mJgRgMMRAswMKAKMDDARBjg8lARBoR6KImkH0wTbygT6YaS4DmAAAMAYPkClOEDDD0AAAAASUVORK5CYII=';
App.prototype.chevronDownImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDg2NEE3NUI1MUVBMTFFM0I3MUVEMTc0N0YyOUI4QzEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDg2NEE3NUM1MUVBMTFFM0I3MUVEMTc0N0YyOUI4QzEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0ODY0QTc1OTUxRUExMUUzQjcxRUQxNzQ3RjI5QjhDMSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0ODY0QTc1QTUxRUExMUUzQjcxRUQxNzQ3RjI5QjhDMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PsCtve8AAAAMUExURQAAANnZ2b+/v////5bgre4AAAAEdFJOU////wBAKqn0AAAALUlEQVR42mJgRgMMRAkwQEXBNAOcBSPhclB1cNVwfcxI+vEZykSpoSR6DiDAAF23ApT99bZ+AAAAAElFTkSuQmCC';
App.prototype.formatShowImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODdCREY5REY1NkQ3MTFFNTkyNjNEMTA5NjgwODUyRTgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODdCREY5RTA1NkQ3MTFFNTkyNjNEMTA5NjgwODUyRTgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4N0JERjlERDU2RDcxMUU1OTI2M0QxMDk2ODA4NTJFOCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4N0JERjlERTU2RDcxMUU1OTI2M0QxMDk2ODA4NTJFOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PlnMQ/8AAAAJUExURQAAAP///3FxcTfTiAsAAAACdFJOU/8A5bcwSgAAACFJREFUeNpiYEQDDEQJMMABTAAixcQ00ALoDiPRcwABBgB6DADly9Yx8wAAAABJRU5ErkJggg==';
App.prototype.formatHideImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODdCREY5REI1NkQ3MTFFNTkyNjNEMTA5NjgwODUyRTgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODdCREY5REM1NkQ3MTFFNTkyNjNEMTA5NjgwODUyRTgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4N0JERjlEOTU2RDcxMUU1OTI2M0QxMDk2ODA4NTJFOCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4N0JERjlEQTU2RDcxMUU1OTI2M0QxMDk2ODA4NTJFOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqjT9SMAAAAGUExURQAAAP///6XZn90AAAACdFJOU/8A5bcwSgAAAB9JREFUeNpiYEQDDEQJMMABTAAmNdAC6A4j0XMAAQYAcbwA1Xvj1CgAAAAASUVORK5CYII=';

/**
 * Interval to show dialog for unsaved data if autosave is on.
 * Default is 300000 (5 minutes).
 */
App.prototype.warnInterval = 300000;

/**
 *
 */
App.prototype.compactMode = false;

/**
 *
 */
App.prototype.fullscreenMode = false;
	
/**
 * Overriden UI settings depending on mode.
 */
if (urlParams['embed'] != '1')
{
	App.prototype.menubarHeight = 64;
}
else
{
	App.prototype.footerHeight = 0;
}

/**
 * Queue for loading plugins and wait for UI instance
 */
App.initPluginCallback = function()
{
	if (App.DrawPlugins == null)
	{
		// Workaround for need to load plugins now but wait for UI instance
		App.DrawPlugins = [];
		
		// Global entry point for plugins is Draw.loadPlugin. This is the only
		// long-term supported solution for access to the EditorUi instance.
		window.Draw = new Object();
		window.Draw.loadPlugin = function(callback)
		{
			App.DrawPlugins.push(callback);
		};
	}
};

/**
 * 
 */
App.pluginsLoaded = {};
App.embedModePluginsCount = 0;

/**
 * Queue for loading plugins and wait for UI instance
 */
App.loadPlugins = function(plugins, useInclude)
{
	EditorUi.debug('Loading plugins', plugins);

	for (var i = 0; i < plugins.length; i++)
	{
		if (plugins[i] != null && plugins[i].length > 0)
		{
			try
			{
				if (App.pluginRegistry[plugins[i]] != null)
				{
					var url = PLUGINS_BASE_PATH + App.pluginRegistry[plugins[i]];
					
					if (App.pluginsLoaded[url] == null)
					{
						App.pluginsLoaded[url] = true;
						App.embedModePluginsCount++;
						
						if (typeof window.drawDevUrl === 'undefined')
						{
							if (useInclude)
							{
								mxinclude(url);
							}
							else
							{
								mxscript(url);
							}
						}
						else
						{
							if (useInclude)
							{
								mxinclude(url);
							}
							else
							{
								mxscript(drawDevUrl + url);
							}
						}
					}
				}
				else if (window.console != null)
				{
					console.log('Unknown plugin:', plugins[i]);
				}
			}
			catch (e)
			{
				if (window.console != null)
				{
					console.log('Error loading plugin:', plugins[i], e);
				}
			}
		}
	}
};

/**
 * Delay embed mode initialization until all plugins are loaded
 */
App.prototype.initializeEmbedMode = function()
{
	if (urlParams['embed'] == '1')
	{
		if (window.location.hostname == 'app.diagrams.net')
		{
			this.showBanner('EmbedDeprecationFooter', 'app.diagrams.net will stop working for embed mode. Please use embed.diagrams.net.');
		}
		
		if (App.embedModePluginsCount > 0 || this.initEmbedDone)
		{
			return; //Wait for plugins to load, or this is a duplicate call due to timeout
		}
		else
		{
			this.initEmbedDone = true;
		}
		
		EditorUi.prototype.initializeEmbedMode.apply(this, arguments);
	}
};

/**
 * TODO: Define viewer protocol and implement new viewer style toolbar
 */
App.prototype.initializeViewerMode = function()
{
	var parent = window.opener || window.parent;

	if (parent != null)
	{
		this.editor.graph.addListener(mxEvent.SIZE, mxUtils.bind(this, function()
		{
			parent.postMessage(JSON.stringify(this.createLoadMessage('size')), '*');
		}));
	}
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
App.prototype.init = function()
{
	EditorUi.prototype.init.apply(this, arguments);

	/**
	 * Specifies the default filename.
	 */
	this.defaultLibraryName = mxResources.get('untitledLibrary');

	/**
	 * Holds the listener for description changes.
	 */	
	this.descriptorChangedListener = mxUtils.bind(this, this.descriptorChanged);

	/**
	 * Creates github client.
	 */
	this.gitHub = (!mxClient.IS_IE || document.documentMode == 10 ||
			mxClient.IS_IE11 || mxClient.IS_EDGE) &&
			(urlParams['gh'] != '0' && (urlParams['embed'] != '1' ||
			urlParams['gh'] == '1')) ? new GitHubClient(this) : null;
	
	if (this.gitHub != null)
	{
		this.gitHub.addListener('userChanged', mxUtils.bind(this, function()
		{
			this.updateUserElement();
			this.restoreLibraries();
		}));
	}

	this.addListener('currentThemeChanged', mxUtils.bind(this, function()
	{
		if (this.compactMode && this.isDefaultTheme(Editor.currentTheme))
		{
			this.toggleCompactMode(true);
		}
	}));

	/**
	 * Creates gitlab client.
	 */
	this.gitLab = (!mxClient.IS_IE || document.documentMode == 10 ||
		mxClient.IS_IE11 || mxClient.IS_EDGE) &&
		(urlParams['gl'] != '0' && (urlParams['embed'] != '1' ||
		urlParams['gl'] == '1')) ? new GitLabClient(this) : null;

	if (this.gitLab != null)
	{
		this.gitLab.addListener('userChanged', mxUtils.bind(this, function()
		{
			this.updateUserElement();
			this.restoreLibraries();
		}));
	}

	/**
	 * Lazy-loading for individual backends
	 */
	if (urlParams['embed'] != '1' || urlParams['od'] == '1')
	{
		/**
		 * Creates onedrive client if all required libraries are available.
		 */
		var initOneDriveClient = mxUtils.bind(this, function()
		{
			if (typeof OneDrive !== 'undefined')
			{
				/**
				 * Holds the x-coordinate of the point.
				 */
				this.oneDrive = new OneDriveClient(this);
				
				this.oneDrive.addListener('userChanged', mxUtils.bind(this, function()
				{
					this.updateUserElement();
					this.restoreLibraries();
				}));
				
				// Notifies listeners of new client
				this.fireEvent(new mxEventObject('clientLoaded', 'client', this.oneDrive));
			}
			else if (window.DrawOneDriveClientCallback == null)
			{
				window.DrawOneDriveClientCallback = initOneDriveClient;
			}
		});

		initOneDriveClient();
	}

	/**
	 * Lazy-loading for Trello
	 */
	if (urlParams['embed'] != '1' || urlParams['tr'] == '1')
	{
		/**
		 * Creates Trello client if all required libraries are available.
		 */
		var initTrelloClient = mxUtils.bind(this, function()
		{
			if (typeof window.Trello !== 'undefined')
			{
				try
				{
					this.trello = new TrelloClient(this);
					
					//TODO we have no user info from Trello so we don't set a user
					this.trello.addListener('userChanged', mxUtils.bind(this, function()
					{
						this.updateUserElement();
						this.restoreLibraries();
					}));
					
					// Notifies listeners of new client
					this.fireEvent(new mxEventObject('clientLoaded', 'client', this.trello));
				}
				catch (e)
				{
					if (window.console != null)
					{
						console.error(e);
					}
				}
			}
			else if (window.DrawTrelloClientCallback == null)
			{
				window.DrawTrelloClientCallback = initTrelloClient;
			}
		});

		initTrelloClient();
	}

	/**
	 * Creates drive client with all required libraries are available.
	 */
	if (urlParams['embed'] != '1' || urlParams['gapi'] == '1')
	{
		var initDriveClient = mxUtils.bind(this, function()
		{
			/**
			 * Creates google drive client if all required libraries are available.
			 */
			if (typeof gapi !== 'undefined')
			{
				var doInit = mxUtils.bind(this, function()
				{
					this.drive = new DriveClient(this);
					
					this.drive.addListener('userChanged', mxUtils.bind(this, function()
					{
						this.updateUserElement();
						this.restoreLibraries();
						this.checkLicense();
					}))
					
					// Notifies listeners of new client
					this.fireEvent(new mxEventObject('clientLoaded', 'client', this.drive));
				});
				
				if (window.DrawGapiClientCallback != null)
				{
					gapi.load(((urlParams['picker'] != '0') ? 'picker,': '') + App.GOOGLE_APIS, doInit);
					
					/**
					 * Clears any callbacks.
					 */
					window.DrawGapiClientCallback = null;
				}
				else
				{
					doInit();
				}
			}
			else if (window.DrawGapiClientCallback == null)
			{
				window.DrawGapiClientCallback = initDriveClient;
			}
		});
		
		initDriveClient();
	}

	if (urlParams['embed'] != '1' || urlParams['db'] == '1')
	{
		/**
		 * Creates dropbox client if all required libraries are available.
		 */
		var initDropboxClient = mxUtils.bind(this, function()
		{
			if (typeof Dropbox === 'function' && typeof Dropbox.choose !== 'undefined')
			{
				/**
				 * Clears dropbox client callback.
				 */
				window.DrawDropboxClientCallback = null;
				
				/**
				 * Holds the x-coordinate of the point.
				 */
				try
				{
					this.dropbox = new DropboxClient(this);
					
					this.dropbox.addListener('userChanged', mxUtils.bind(this, function()
					{
						this.updateUserElement();
						this.restoreLibraries();
					}));
					
					// Notifies listeners of new client
					this.fireEvent(new mxEventObject('clientLoaded', 'client', this.dropbox));
				}
				catch (e)
				{
					if (window.console != null)
					{
						console.error(e);
					}
				}
			}
			else if (window.DrawDropboxClientCallback == null)
			{
				window.DrawDropboxClientCallback = initDropboxClient;
			}
		});

		initDropboxClient();
	}

	if (urlParams['embed'] != '1')
	{
		/**
		 * Holds the background element.
		 */
		this.bg = this.createBackground();
		document.body.appendChild(this.bg);
		this.diagramContainer.style.visibility = 'hidden';
		this.formatContainer.style.visibility = 'hidden';
		this.hsplit.style.display = 'none';
		this.sidebarContainer.style.display = 'none';
		
		// Sets the initial mode
		if (urlParams['local'] == '1')
		{
			this.setMode(App.MODE_DEVICE);
		}
		else
		{
			this.mode = App.mode;
		}
		
		// Add to Home Screen dialog for mobile devices
		if ('serviceWorker' in navigator && !this.editor.isChromelessView() &&
			(mxClient.IS_ANDROID || mxClient.IS_IOS))
		{
			window.addEventListener('beforeinstallprompt', mxUtils.bind(this, function(e)
			{
				this.showBanner('AddToHomeScreenFooter', mxResources.get('installApp'), function()
				{
				    e.prompt();
				});
			}));
		}
		
		if (this.isOwnDomain() && (!this.editor.chromeless || this.editor.editable))
		{
			this.editor.addListener('fileLoaded', mxUtils.bind(this, function()
			{
				var file = this.getCurrentFile();
				var mode = (file != null) ? file.getMode() : null;
				
				if (!mxClient.IS_CHROMEAPP && !mxClient.IS_ANDROID && !mxClient.IS_IOS &&
					!EditorUi.isElectronApp && !this.isOffline() && urlParams['open'] == null &&
					urlParams['extAuth'] != '1' && (mode == App.MODE_DEVICE || mode == App.MODE_BROWSER))
				{
					this.showDownloadDesktopBanner();
				}
			}));
		}
		
		if (!mxClient.IS_CHROMEAPP && !EditorUi.isElectronApp && DrawioFile.SYNC == 'auto' &&
			urlParams['local'] != '1' && urlParams['stealth'] != '1' && !this.isOffline() &&
			Editor.enableRealtimeCache && (!this.editor.chromeless || this.editor.editable))
		{
			// Checks if the cache is alive
			var timeoutThread = window.setTimeout(mxUtils.bind(this, function()
			{
				// Switches to sync via sockets if cache is not reachable
				Editor.enableRealtimeCache = false;
			}), Editor.cacheTimeout);
			
			mxUtils.get(EditorUi.cacheUrl + '?alive', mxUtils.bind(this, function(req)
			{
				Editor.enableRealtimeCache = req.getStatus() >= 200 && req.getStatus() <= 299;
				window.clearTimeout(timeoutThread);
			}), function()
			{
				Editor.enableRealtimeCache = false;
				window.clearTimeout(timeoutThread);
			});
		}
	}
	else if (this.menubar != null)
	{
		this.menubar.container.style.paddingTop = '0px';
	}

	this.updateHeader();

	if (this.menubar != null)
	{
		this.buttonContainer = this.createButtonContainer();
		this.menubar.container.appendChild(this.buttonContainer);

		if (Editor.currentTheme == 'atlas')
		{
			this.toggleCompactMode(false);
		}

		if (Editor.currentTheme == 'atlas' || urlParams['atlas'] == '1')
		{	
			this.icon = document.createElement('img');
			this.icon.setAttribute('src', IMAGE_PATH + '/logo-flat-small.png');
			this.icon.setAttribute('title', mxResources.get('draw.io'));
			this.icon.style.padding = urlParams['atlas'] == '1'? '7px' : '6px';

			if (urlParams['embed'] != '1')
			{
				this.icon.style.cursor = 'pointer';
				
				mxEvent.addListener(this.icon, 'click', mxUtils.bind(this, function(evt)
				{
					this.appIconClicked(evt);
				}));
			}
			
			this.menubar.container.insertBefore(this.icon, this.menubar.container.firstChild);
		}
	}
	
	if (this.editor.graph.isViewer())
	{
		this.initializeViewerMode();
	}

	// Log the ansestor frames
	App.logAncestorFrames();
};

App.logAncestorFrames = function()
{
	try
	{
		if (window.location.ancestorOrigins && window.location.hostname &&
				window.location.ancestorOrigins.length && window.location.ancestorOrigins.length > 0)
		{
			var hostname = window.location.hostname;

			if (hostname && hostname.length > 1 && hostname.charAt(hostname.length - 1) == '/')
			{
				hostname = hostname.substring(0, hostname.length - 1)
			}

			var message = '';

			for (var i = 0; i < window.location.ancestorOrigins.length; i++)
			{
				message += ' -> ' + window.location.ancestorOrigins[i];
			}

			if (hostname.endsWith('embed.diagrams.net') && window.location.ancestorOrigins.length > 0)
			{
				var img = new Image();
				img.src = 'https://log.diagrams.net/images/1x1.png?src=EditorEmbedAncestorFrames' +
					'&v=' + encodeURIComponent(EditorUi.VERSION) + '&data=' + encodeURIComponent(message);
			}
		}
	}
	catch (e)
	{
		// ignore
	}
};

/**
 * Schedules a sanity check.
 */
App.prototype.scheduleSanityCheck = function()
{
	if (!mxClient.IS_CHROMEAPP && !EditorUi.isElectronApp &&
		this.sanityCheckThread == null)
	{
		this.sanityCheckThread = window.setTimeout(mxUtils.bind(this, function()
		{
			this.sanityCheckThread = null;
			this.sanityCheck();
		}), this.warnInterval);
	}
};

/**
 * Stops sanity checks.
 */
App.prototype.stopSanityCheck = function()
{
	if (this.sanityCheckThread != null)
	{
		window.clearTimeout(this.sanityCheckThread);
		this.sanityCheckThread = null;
	}
};

/**
 * Shows a warning after some time with unsaved changes and autosave.
 */
App.prototype.sanityCheck = function()
{
	var file = this.getCurrentFile();

	if (file != null && file.isModified() && file.isAutosave() && file.isOverdue())
	{
		var evt = {category: 'WARN-FILE-' + file.getHash(),
			action: ((file.savingFile) ? 'saving' : '') +
			((file.savingFile && file.savingFileTime != null) ? '_' +
				Math.round((Date.now() - file.savingFileTime.getTime()) / 1000) : '') +
			((file.saveLevel != null) ? ('-sl_' + file.saveLevel) : '') +
			'-age_' + ((file.ageStart != null) ? Math.round((Date.now() - file.ageStart.getTime()) / 1000) : 'x') +
			((this.editor.autosave) ? '' : '-nosave') +
			((file.isAutosave()) ? '' : '-noauto') +
			'-open_' + ((file.opened != null) ? Math.round((Date.now() - file.opened.getTime()) / 1000) : 'x') +
			'-save_' + ((file.lastSaved != null) ? Math.round((Date.now() - file.lastSaved.getTime()) / 1000) : 'x') +
			'-change_' + ((file.lastChanged != null) ? Math.round((Date.now() - file.lastChanged.getTime()) / 1000) : 'x')+
			'-alive_' + Math.round((Date.now() - App.startTime.getTime()) / 1000),
			label: (file.sync != null) ? ('client_' + file.sync.clientId) : 'nosync'};
			
		if (file.constructor == DriveFile && file.desc != null && this.drive != null)
		{
			evt.label += ((this.drive.user != null) ? ('-user_' + this.drive.user.id) : '-nouser') + '-rev_' +
				file.desc.headRevisionId + '-mod_' + file.desc.modifiedDate + '-size_' + file.getSize() +
				'-mime_' + file.desc.mimeType;
		}
			
		EditorUi.logEvent(evt);

		var msg = mxResources.get('ensureDataSaved');
		
		if (file.lastSaved != null)
		{
			var str = this.timeSince(file.lastSaved);
			
			if (str == null)
			{
				str = mxResources.get('lessThanAMinute');
			}

			msg = mxResources.get('lastSaved', [str]);
		}
		
		// Resets possible stale state
		this.spinner.stop();

		this.showError(mxResources.get('unsavedChanges'), msg, mxResources.get('ignore'),
			mxUtils.bind(this, function()
			{
				this.hideDialog();
			}), null, mxResources.get('save'), mxUtils.bind(this, function()
			{
				this.stopSanityCheck();
				this.actions.get((this.mode == null || !file.isEditable()) ?
					'saveAs' : 'save').funct();
			}), null, null, 360, 120, null, mxUtils.bind(this, function()
			{
				this.scheduleSanityCheck();
			}));
	}
};

/**
 * Returns true if the current domain is for the new drive app.
 */
App.prototype.isOwnDomain = function()
{
	return window.location.hostname == 'test.draw.io' ||
		window.location.hostname == 'www.draw.io' ||
		window.location.hostname == 'drive.draw.io' ||
		window.location.hostname == 'preprod.diagrams.net' ||
		window.location.hostname == 'app.diagrams.net';
};

/**
 * Returns true if the current domain is for the new drive app.
 */
App.prototype.isDriveDomain = function()
{
	return urlParams['drive'] != '0' && this.isOwnDomain();
};

/**
 * Returns the pusher instance for notifications. Creates the instance of none exists.
 */
App.prototype.getPusher = function()
{
	if (this.pusher == null && typeof window.Pusher === 'function')
	{
		this.pusher = new Pusher(App.PUSHER_KEY,
		{
			cluster: App.PUSHER_CLUSTER,
			encrypted: true
		});
	}
	
	return this.pusher;
};

/**
 * Shows a footer to download the desktop version once per session.
 */
App.prototype.showNameChangeBanner = function()
{
	this.showBanner('DiagramsFooter', 'draw.io is now diagrams.net', mxUtils.bind(this, function()
	{
		this.openLink('https://www.drawio.com/blog/move-diagrams-net');
	}));
};

/**
 * Shows a footer to download the desktop version once per session.
 */
App.prototype.showNameConfBanner = function()
{
	this.showBanner('ConfFooter', 'Try draw.io for Confluence', mxUtils.bind(this, function()
	{
		this.openLink('https://marketplace.atlassian.com/apps/1210933/draw-io-diagrams-for-confluence');
	}), true);
};

/**
 * Shows a footer to download the desktop version once per session.
 */
App.prototype.showDownloadDesktopBanner = function()
{
	this.showBanner('DesktopFooter', mxResources.get('downloadDesktop'), mxUtils.bind(this, function()
	{
		this.openLink('https://get.diagrams.net/');
	}));
};

/**
 * Shows a footer to download the desktop version once per session.
 */
App.prototype.showRatingBanner = function()
{
		if (!this.bannerShowing && !this['hideBanner' + 'ratingFooter'] &&
			(!isLocalStorage || mxSettings.settings == null ||
			mxSettings.settings['close' + 'ratingFooter'] == null))
		{
			var banner = document.createElement('div');
			banner.style.cssText = 'position:absolute;bottom:10px;left:50%;max-width:90%;padding:18px 34px 12px 20px;' +
				'font-size:16px;font-weight:bold;white-space:nowrap;cursor:pointer;z-index:' + mxPopupMenu.prototype.zIndex + ';';
			mxUtils.setPrefixedStyle(banner.style, 'box-shadow', '1px 1px 2px 0px #ddd');
			mxUtils.setPrefixedStyle(banner.style, 'transform', 'translate(-50%,120%)');
			mxUtils.setPrefixedStyle(banner.style, 'transition', 'all 1s ease');
			banner.className = 'geBtn gePrimaryBtn';
	
			var img = document.createElement('img');
			img.setAttribute('src', Dialog.prototype.closeImage);
			img.setAttribute('title', mxResources.get('close'));
			img.setAttribute('border', '0');
			img.style.cssText = 'position:absolute;right:10px;top:12px;filter:invert(1);padding:6px;margin:-6px;cursor:default;';
			banner.appendChild(img);
			
			var star = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZ' +
				'XdvcmtzIENTM5jWRgMAAAQRdEVYdFhNTDpjb20uYWRvYmUueG1wADw/eHBhY2tldCBiZWdpbj0iICAgIiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8i' +
				'IHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDQuMS1jMDM0IDQ2LjI3Mjk3NiwgU2F0IEphbiAyNyAyMDA3IDIyOjExOjQxICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDI' +
				'vMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4YXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iPgogICAgICAgICA8eGFwOkNyZW' +
				'F0b3JUb29sPkFkb2JlIEZpcmV3b3JrcyBDUzM8L3hhcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhhcDpDcmVhdGVEYXRlPjIwMDgtMDItMTdUMDI6MzY6NDVaPC94YXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhhcDpNb2RpZ' +
				'nlEYXRlPjIwMDktMDMtMTdUMTQ6MTI6MDJaPC94YXA6TW9kaWZ5RGF0ZT4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOmRjPSJo' +
				'dHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyI+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo' +
				'gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgIC' +
				'AgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgI' +
				'CAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIIImu8AAAAAVdEVYdENyZWF0aW9uIFRpbWUAMi8xNy8wOCCcqlgAAAHuSURBVDiNlZJBi1JRGIbfk+fc0ZuMXorJe4XujWoMdREaA23HICj6AQeLINr0C4I27ab2' +
				'7VqOI9+q/sH8gMDceG1RkIwgClEXFMbRc5zTZgZURmG+5fu9PN/7Hg6wZohoh4h21nn4uqXW+q0xZgzg+SrPlTXX73uet+26bp6ICpcGaK1fua57M5vN3tZav7gUgIiSqVTqcRAEm0EQbCaTyQoRXb3Iy4hoG8CT6XSaY4xtMMa' +
				'SQohMPp8v+r7vAEC3243CMGwqpfoApsaYE8uyfgM45ABOjDEvXdfNlMvlzFINAIDneY7neZVzvdlsDgaDQYtzfsjOIjtKqU+e5+0Wi0V3VV8ACMOw3+/3v3HOX0sp/7K53te11h/S6fRuoVAIhBAL76OUOm2320dRFH0VQuxJKf' +
				'8BAFu+UKvVvpRKpWe2bYt5fTweq0ajQUKIN1LK43N94SMR0Y1YLLYlhBBKqQUw51wkEol7WmuzoC8FuJtIJLaUUoii6Ljb7f4yxpz6vp9zHMe2bfvacDi8BeDHKkBuNps5rVbr52QyaVuW9ZExttHpdN73ej0/Ho+nADxYCdBaV' +
				'0aj0RGAz5ZlHUgpx2erR/V6/d1wOHwK4CGA/QsBnPN9AN+llH+WkqFare4R0QGAO/M6M8Ysey81/wGqa8MlVvHPNAAAAABJRU5ErkJggg==';

			mxUtils.write(banner, 'Please rate us');
			document.body.appendChild(banner);
	
			var star1 = document.createElement('img');
			star1.setAttribute('border', '0');
			star1.setAttribute('align', 'absmiddle');
			star1.setAttribute('title', '1 star');
			star1.setAttribute('style', 'margin-top:-6px;cursor:pointer;margin-left:8px;');
			star1.setAttribute('src', star);
			banner.appendChild(star1);
			
			var star2 = document.createElement('img');
			star2.setAttribute('border', '0');
			star2.setAttribute('align', 'absmiddle');
			star2.setAttribute('title', '2 star');
			star2.setAttribute('style', 'margin-top:-6px;margin-left:3px;cursor:pointer;');
			star2.setAttribute('src', star);
			banner.appendChild(star2);
			
			var star3 = document.createElement('img');
			star3.setAttribute('border', '0');
			star3.setAttribute('align', 'absmiddle');
			star3.setAttribute('title', '3 star');
			star3.setAttribute('style', 'margin-top:-6px;margin-left:3px;cursor:pointer;');
			star3.setAttribute('src', star);
			banner.appendChild(star3);
			
			var star4 = document.createElement('img');
			star4.setAttribute('border', '0');
			star4.setAttribute('align', 'absmiddle');
			star4.setAttribute('title', '4 star');
			star4.setAttribute('style', 'margin-top:-6px;margin-left:3px;cursor:pointer;');
			star4.setAttribute('src', star);
			banner.appendChild(star4);
			
			this.bannerShowing = true;
			
			var onclose = mxUtils.bind(this, function()
			{
				if (banner.parentNode != null)
				{
					banner.parentNode.removeChild(banner);
					this.bannerShowing = false;
					
					this['hideBanner' + 'ratingFooter'] = true;

					if (isLocalStorage && mxSettings.settings != null)
					{
						mxSettings.settings['close' + 'ratingFooter'] = Date.now();
						mxSettings.save();
					}
				}
			});
			
			mxEvent.addListener(img, 'click', mxUtils.bind(this, function(e)
			{
				mxEvent.consume(e);
				onclose();
			}));
			mxEvent.addListener(star1, 'click', mxUtils.bind(this, function(e)
			{
				mxEvent.consume(e);
				onclose();
			}));
			mxEvent.addListener(star2, 'click', mxUtils.bind(this, function(e)
			{
				mxEvent.consume(e);
				onclose();
			}));
			mxEvent.addListener(star3, 'click', mxUtils.bind(this, function(e)
			{
				mxEvent.consume(e);
				onclose();
			}));
			mxEvent.addListener(star4, 'click', mxUtils.bind(this, function(e)
			{
				mxEvent.consume(e);
				window.open('https://marketplace.atlassian.com/apps/1210933/draw-io-diagrams-for-confluence?hosting=datacenter&tab=reviews');
				onclose();
			}));

			var hide = mxUtils.bind(this, function()
			{
				mxUtils.setPrefixedStyle(banner.style, 'transform', 'translate(-50%,120%)');
				
				window.setTimeout(mxUtils.bind(this, function()
				{
					onclose();
				}), 1000);
			});
			
			window.setTimeout(mxUtils.bind(this, function()
			{
				mxUtils.setPrefixedStyle(banner.style, 'transform', 'translate(-50%,0%)');
			}), 500);
			
			window.setTimeout(hide, 60000);
		}
};

/**
 * Checks license in the case of Google Drive storage.
 * IMPORTANT: Do not change this function without consulting 
 * the privacy lead. No personal information must be sent.
 */
App.prototype.checkLicense = function()
{
	var driveUser = this.drive.getUser();
	var email = (driveUser != null) ? driveUser.email : null;
	
	if (!this.isOffline() && !this.editor.chromeless && email != null && driveUser.id != null)
	{
		// Only the domain and hashed user ID are transmitted. This code was reviewed and deemed
		// compliant by dbenson 2021-09-01.
		var at = email.lastIndexOf('@');
		var domain = (at >= 0) ? email.substring(at + 1) : '';
		var userId = Editor.crc32(driveUser.id);
		
		// Timestamp is workaround for cached response in certain environments
		mxUtils.post('/license', 'domain=' + encodeURIComponent(domain) + '&id=' + encodeURIComponent(userId) + 
				'&ts=' + new Date().getTime(),
			mxUtils.bind(this, function(req)
			{
				try
				{
					if (req.getStatus() >= 200 && req.getStatus() <= 299)
					{
						var value = req.getText();
						
						if (value.length > 0)
						{
							var lic = JSON.parse(value);
							
							if (lic != null)
							{
								this.handleLicense(lic, domain);
							}
						}
					}
				}
				catch (e)
				{
					// ignore
				}
			}));
	}
};

/**
 * Returns true if the current domain is for the new drive app.
 */
App.prototype.handleLicense = function(lic, domain)
{
	// Hook for subclassers to handle license response
};

/**
 * 
 */
App.prototype.getEditBlankXml = function()
{
	var file = this.getCurrentFile();
	
	if (file != null && this.editor.isChromelessView() && this.editor.graph.isLightboxView())
	{
		return file.getData();
	}
	else
	{
		return this.getFileData(true);
	}
};

/**
 * Updates action states depending on the selection.
 */
App.prototype.updateActionStates = function()
{
	EditorUi.prototype.updateActionStates.apply(this, arguments);

	this.actions.get('revisionHistory').setEnabled(this.isRevisionHistoryEnabled());
};

/**
 * Adds the specified entry to the recent file list in local storage
 */
App.prototype.addRecent = function(entry, type)
{
	if (isLocalStorage && localStorage != null)
	{
		type = (type != null) ? type : '';	
		var recent = this.getRecent(type);
		
		if (recent == null)
		{
			recent = [];
		}
		else
		{
			for (var i = 0; i < recent.length; i++)
			{
				if (recent[i].mode == entry.mode &&
					recent[i].id == entry.id)
				{
					recent.splice(i, 1);
				}
			}
		}
		
		if (recent != null)
		{
			recent.unshift(entry);
			recent = recent.slice(0, 10);
			localStorage.setItem('.recent' + type, JSON.stringify(recent));
		}
	}
};

/**
 * Returns the recent file list from local storage
 */
App.prototype.getRecent = function(type)
{
	if (isLocalStorage && localStorage != null)
	{
		type = (type != null) ? type : '';

		try
		{
			var recent = localStorage.getItem('.recent' + type);
			
			if (recent != null)
			{
				return JSON.parse(recent);
			}
		}
		catch (e)
		{
			// ignore
		}
		
		return null;
	}
};

/**
 * Clears the recent file list in local storage
 */
App.prototype.resetRecent = function(type)
{
	if (isLocalStorage && localStorage != null)
	{
		type = (type != null) ? type : '';

		try
		{
			localStorage.removeItem('.recent' + type);
		}
		catch (e)
		{
			// ignore
		}
	}
};

/**
 * Sets the onbeforeunload for the application
 */
App.prototype.onBeforeUnload = function()
{
	if (urlParams['embed'] == '1' && this.editor.modified)
	{
		return mxResources.get('allChangesLost');
	}
	else
	{
		var file = this.getCurrentFile();
		
		if (file != null)
		{
			// KNOWN: Message is ignored by most browsers
			if (file.constructor == LocalFile && file.getHash() == '' && !file.isModified() &&
				urlParams['nowarn'] != '1' && !this.isDiagramEmpty() && urlParams['url'] == null &&
				!this.editor.isChromelessView() && file.fileHandle == null)
			{
				return mxResources.get('ensureDataSaved');
			}
			else if (file.isModified())
			{
				return mxResources.get('allChangesLost');
			}
			else
			{
				file.close(true);
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
App.prototype.updateDocumentTitle = function()
{
	if (!this.editor.graph.isLightboxView())
	{
		var title = this.editor.appName;
		var file = this.getCurrentFile();

		if (file != null && Editor.currentTheme == 'simple' &&
			this.pages != null && this.currentPage != null)
		{
			title = this.getShortPageName(this.currentPage);
		}
		else if (this.isOfflineApp())
		{
			title += ' app';
		}
		
		if (file != null)
		{
			var filename = (file.getTitle() != null) ? file.getTitle() : this.defaultFilename;
			title = filename + ' - ' + title;
		}
		
		if (document.title != title)
		{
			document.title = title;
		}
	}
};

/**
 * Returns a thumbnail of the current file.
 */
App.prototype.getThumbnail = function(width, fn)
{
	var result = false;
	
	try
	{
		var acceptResponse = true;
		
		var timeoutThread = window.setTimeout(mxUtils.bind(this, function()
		{
			acceptResponse = false;
			fn(null);
		}), this.timeout);
		
		var success = mxUtils.bind(this, function(canvas)
		{
			window.clearTimeout(timeoutThread);
			
			if (acceptResponse)
			{
				fn(canvas);
			}
		});
		
		if (this.thumbImageCache == null)
		{
			this.thumbImageCache = new Object();
		}
		
		var graph = this.editor.graph;
		var bgImg = graph.backgroundImage;

		// Exports PNG for first page while other page is visible by creating a graph
		// LATER: Add caching for the graph or SVG while not on first page
		// To avoid refresh during save dark theme uses separate graph instance
		var darkTheme = graph.themes != null && graph.defaultThemeName == 'darkTheme';

		if (this.pages != null && (darkTheme || this.currentPage != this.pages[0]))
		{
			var graphGetGlobalVariable = graph.getGlobalVariable;
			graph = this.createTemporaryGraph(graph.getStylesheet());
			graph.setBackgroundImage = this.editor.graph.setBackgroundImage;
			var page = this.pages[0];

			if (this.currentPage == page)
			{
				graph.setBackgroundImage(bgImg);
			}
			else if (page.viewState != null && page.viewState != null)
			{
				bgImg = page.viewState.backgroundImage;
				graph.setBackgroundImage(bgImg);
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
			
			graph.getGlobalVariable = graphGetGlobalVariable;
			document.body.appendChild(graph.container);
			graph.model.setRoot(page.root);
		}
		
		// Uses client-side canvas export
		if (mxClient.IS_CHROMEAPP || this.useCanvasForExport)
		{
		   	this.editor.exportToCanvas(mxUtils.bind(this, function(canvas)
		   	{
		   		try
		   		{
			   		// Removes temporary graph from DOM
	   	   	    	if (graph != this.editor.graph && graph.container.parentNode != null)
					{
						graph.container.parentNode.removeChild(graph.container);
					}
				}
				catch (e)
				{
					canvas = null;
				}
				
		   		success(canvas);
		   	}), width, this.thumbImageCache, '#ffffff', function()
		   	{
		   		// Continues with null in error case
		   		success();
		   	}, null, null, null, null, null, null, graph, null, null, null,
			   null, 'diagram', null);
		   	
		   	result = true;
		}
		else if (this.canvasSupported && this.getCurrentFile() != null)
		{
			var canvas = document.createElement('canvas');
			var bounds = graph.getGraphBounds();
			var t = graph.view.translate;
			var s = graph.view.scale;

			if (bgImg != null)
			{
				bounds = mxRectangle.fromRectangle(bounds);
				bounds.add(new mxRectangle(
					(t.x + bgImg.x) * s, (t.y + bgImg.y) * s,
					bgImg.width * s, bgImg.height * s));
			}

			var scale = width / bounds.width;

			// Limits scale to 1 or 2 * width / height
			scale = Math.min(1, Math.min((width * 3) / (bounds.height * 4), scale));
			
			var x0 = Math.floor(bounds.x);
			var y0 = Math.floor(bounds.y);
			
			canvas.setAttribute('width', Math.ceil(scale * (bounds.width + 4)));
			canvas.setAttribute('height', Math.ceil(scale * (bounds.height + 4)));
			
			var ctx = canvas.getContext('2d');
			
			// Configures the canvas
			ctx.scale(scale, scale);
			ctx.translate(-x0, -y0);
			
			// Paint white background instead of transparent
			var bg = graph.background;
			
			if (bg == null || bg == '' || bg == mxConstants.NONE)
			{
				bg = '#ffffff';
			}
	
			// Paints background
			ctx.save();
			ctx.fillStyle = bg;
			ctx.fillRect(x0, y0, Math.ceil(bounds.width + 4), Math.ceil(bounds.height + 4));
			ctx.restore();
			
			// Paints background image
			if (bgImg != null)
			{
				var img = new Image();
				img.src = bgImg.src;

				ctx.drawImage(img, bgImg.x * scale, bgImg.y * scale,
					bgImg.width * scale, bgImg.height * scale);
			}
			
			var htmlCanvas = new mxJsCanvas(canvas);
			
			// NOTE: htmlCanvas passed into async canvas is only used for image
			// and canvas caching (canvas caching not used in this case as we do
			// not render text). To reuse that cache via the thumbImageCache we
			// pass that into the async canvas and override the image cache in
			// the newly created html canvas with that of the thumbImageCache.
			// LATER: Is clear thumbImageCache needed if file changes?
			var asynCanvas = new mxAsyncCanvas(this.thumbImageCache);
			htmlCanvas.images = this.thumbImageCache.images;
			
			// Render graph
			var imgExport = new mxImageExport();

			imgExport.drawShape = function(state, canvas)
			{
				if (state.shape instanceof mxShape && state.shape.checkBounds())
				{
					canvas.save();
					canvas.translate(0.5, 0.5);
					state.shape.paint(canvas);
					canvas.translate(-0.5, -0.5);
					canvas.restore();
				}
			};
			
			imgExport.drawText = function(state, canvas)
			{
				// No text output for thumbnails
			};
	
			imgExport.drawState(graph.getView().getState(graph.model.root), asynCanvas);
	
			asynCanvas.finish(mxUtils.bind(this, function()
			{
				try
				{
					imgExport.drawState(graph.getView().getState(graph.model.root), htmlCanvas);
					
			   		// Removes temporary graph from DOM
	   	   	    	if (graph != this.editor.graph && graph.container.parentNode != null)
					{
						graph.container.parentNode.removeChild(graph.container);
					}
				}
				catch (e)
				{
					canvas = null;
				}

				success(canvas);
			}));
			
			result = true;
		}
	}
	catch (e)
	{
		result = false;
		
		// Removes temporary graph from DOM
  	    if (graph != null && graph != this.editor.graph && graph.container.parentNode != null)
		{
			graph.container.parentNode.removeChild(graph.container);
		}
	}
	
	if (!result)
	{
		window.clearTimeout(timeoutThread);
	}
	
	return result;
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
App.prototype.createBackground = function()
{
	var bg = this.createDiv('background');
	bg.style.position = 'absolute';
	bg.style.background = 'white';
	bg.style.left = '0px';
	bg.style.top = '0px';
	bg.style.bottom = '0px';
	bg.style.right = '0px';
	
	mxUtils.setOpacity(bg, 100);
	
	return bg;
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
(function()
{
	var editorUiSetMode = EditorUi.prototype.setMode;
	
	App.prototype.setMode = function(mode, remember)
	{
		editorUiSetMode.apply(this, arguments);
		
		// Note: UseLocalStorage affects the file dialogs
		// and should not be modified if mode is undefined
		if (this.mode != null)
		{
			Editor.useLocalStorage = this.mode == App.MODE_BROWSER;
		}

		if (this.appIcon != null)
		{
			var file = this.getCurrentFile();
			mode = (file != null) ? file.getMode() : mode;
			
			if (mode == App.MODE_GOOGLE)
			{
				this.appIcon.setAttribute('title', mxResources.get('openIt', [mxResources.get('googleDrive')]));
				this.appIcon.style.cursor = 'pointer';
			}
			else if (mode == App.MODE_DROPBOX)
			{
				this.appIcon.setAttribute('title', mxResources.get('openIt', [mxResources.get('dropbox')]));
				this.appIcon.style.cursor = 'pointer';
			}
			else if (mode == App.MODE_ONEDRIVE)
			{
				this.appIcon.setAttribute('title', mxResources.get('openIt', [mxResources.get('oneDrive')]));
				this.appIcon.style.cursor = 'pointer';
			}
			else
			{
				this.appIcon.removeAttribute('title');
				this.appIcon.style.cursor = (mode == App.MODE_DEVICE) ? 'pointer' : 'default';
			}
		}
		
		if (remember)
		{
			try
			{
				if (isLocalStorage)
				{
					localStorage.setItem('.mode', mode);
				}
				else if (typeof(Storage) != 'undefined')
				{
					var expiry = new Date();
					expiry.setYear(expiry.getFullYear() + 1);
					document.cookie = 'MODE=' + mode + '; expires=' + expiry.toUTCString();
				}
			}
			catch (e)
			{
				// ignore possible access denied
			}
		}
	};
})();

/**
 * Function: authorize
 * 
 * Authorizes the client, gets the userId and calls <open>.
 */
App.prototype.appIconClicked = function(evt)
{
	var file = this.getCurrentFile();
	var mode = (file != null) ? file.getMode() : null;
	var url = (file != null) ? (mxEvent.isAltDown(evt) ?
		file.getFolderUrl() : file.getFileUrl()) : null;

	if (url != null)
	{
		this.openLink(url);
	}
	else if (mode == App.MODE_GOOGLE)
	{
		this.openLink('https://drive.google.com/?authuser=0');
	}
	else if (mode == App.MODE_ONEDRIVE)
	{
		this.openLink('https://onedrive.live.com/');
	}
	else if (mode == App.MODE_DROPBOX)
	{
		this.openLink('https://www.dropbox.com/');
	}
	else if (mode == App.MODE_GITHUB)
	{
		this.openLink('https://github.com/');
	}
	else if (mode == App.MODE_GITLAB)
	{
		this.openLink(DRAWIO_GITLAB_URL);
	}
	else if (mode == App.MODE_TRELLO)
	{
		this.openLink('https://trello.com/');
	}
	else if (mode == App.MODE_DEVICE)
	{
		this.openLink('https://get.draw.io/');
	}
	else
	{
		this.openLink('https://www.drawio.com/');
	}
	
	mxEvent.consume(evt);
};

/**
 * Function: authorize
 * 
 * Authorizes the client, gets the userId and calls <open>.
 */
App.prototype.clearMode = function()
{
	if (isLocalStorage)
	{
		localStorage.removeItem('.mode');
	}
	else if (typeof(Storage) != 'undefined')
	{
		var expiry = new Date();
		expiry.setYear(expiry.getFullYear() - 1);
		document.cookie = 'MODE=; expires=' + expiry.toUTCString();
	}
};

/**
 * Opens any file specified in the URL parameters.
 */
App.prototype.open = function()
{
	// Cross-domain window access is not allowed in FF, so if we
	// were opened from another domain then this will fail.
	try
	{
		// If the create URL param is used in embed mode then
		// we try to open the XML from window.opener[value].
		// Use this for embedding via tab to bypass the timing
		// issues when passing messages without onload event.
		if (window.opener != null)
		{
			var value = urlParams['create'];
			
			if (value != null)
			{
				value = decodeURIComponent(value);
			}
			
			if (value != null && value.length > 0 && value.substring(0, 7) != 'http://' &&
				value.substring(0, 8) != 'https://')
			{
				var doc = mxUtils.parseXml(window.opener[value]);
				this.editor.setGraphXml(doc.documentElement);
			}
			else if (window.opener.openFile != null)
			{
				window.opener.openFile.setConsumer(mxUtils.bind(this, function(xml, filename, temp)
				{
					this.spinner.stop();
					
					if (filename == null)
					{
						var title = urlParams['title'];
						temp = true;
						
						if (title != null)
						{
							filename = decodeURIComponent(title);
						}
						else
						{
							filename = this.defaultFilename;
						}
					}
					
					// Replaces PNG with XML extension
					var dot = (!this.useCanvasForExport) ? filename.substring(filename.length - 4) == '.png' : -1;
					
					if (dot > 0)
					{
						filename = filename.substring(0, filename.length - 4) + '.drawio';
					}
					
					this.fileLoaded((mxClient.IS_IOS) ?
						new StorageFile(this, xml, filename) :
						new LocalFile(this, xml, filename, temp));
				}));
			}
		}
	}
	catch(e)
	{
		// ignore
	}
};

App.prototype.loadGapi = function(then)
{
	if (typeof gapi !== 'undefined')
	{
		gapi.load(((urlParams['picker'] != '0') ? 'picker,': '') + App.GOOGLE_APIS, then);
	}
};

/**
 * Main function. Program starts here.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
App.prototype.load = function()
{
	try
	{
		// Checks if we're running in embedded mode
		if (urlParams['embed'] != '1')
		{
			if (this.spinner.spin(document.body, mxResources.get('starting')))
			{
				try
				{
					this.stateArg = (urlParams['state'] != null && this.drive != null) ?
						JSON.parse(decodeURIComponent(urlParams['state'])) : null;
				}
				catch (e)
				{
					// ignores invalid state args
				}
				
				this.editor.graph.setEnabled(this.getCurrentFile() != null);
				
				// Passes the userId from the state parameter to the client
				if ((window.location.hash == null || window.location.hash.length == 0) &&
					this.drive != null && this.stateArg != null && this.stateArg.userId != null)
				{
					this.drive.setUserId(this.stateArg.userId);
				}

				// Legacy support for fileId parameter which is moved to the hash tag
				if (urlParams['fileId'] != null)
				{
					window.location.hash = 'G' + urlParams['fileId'];
					window.location.search = this.getSearch(['fileId']);
				}
				else
				{
					// Asynchronous or disabled loading of client
					if (this.drive == null)
					{
						if (this.mode == App.MODE_GOOGLE)
						{
							this.mode = null;
						}
						
						this.start();
					}
					else
					{
						this.loadGapi(mxUtils.bind(this, function()
						{
							this.start();
						}));
					}
				}
			}
		}
		else
		{
			this.restoreLibraries();
			
			if (urlParams['gapi'] == '1')
			{
				this.loadGapi(function() {});
			}
		}
	}
	catch (e)
	{
		if (EditorUi.isElectronApp)
		{
			mxLog.show();
			mxLog.debug(e.stack);
		}
		else
		{
			EditorUi.logError(e.message, null, null, null, e);
			alert(e.message);
		}
	}
};

/**
 * Adds the listener for automatically saving the diagram for local changes.
 */
App.prototype.showRefreshDialog = function(title, message)
{
	if (!this.showingRefreshDialog)
	{
		this.showingRefreshDialog = true;

		this.showError(title || mxResources.get('externalChanges'),
			message || mxResources.get('redirectToNewApp'),
			mxResources.get('refresh'), mxUtils.bind(this, function()
		{
			var file = this.getCurrentFile();
			
			if (file != null)
			{
				file.setModified(false);
			}
				
			this.spinner.spin(document.body, mxResources.get('connecting'));
			this.editor.graph.setEnabled(false);
			window.location.reload();
		}), null, null, null, null, null, 340, 180);
		
		// Adds important notice to dialog
		if (this.dialog != null && this.dialog.container != null)
		{
			var alert = this.createRealtimeNotice();
			alert.style.left = '0';
			alert.style.right = '0';
			alert.style.borderRadius = '0';
			alert.style.borderLeftStyle = 'none';
			alert.style.borderRightStyle = 'none';
			alert.style.marginBottom = '26px';
			alert.style.padding = '8px 0 8px 0';

			this.dialog.container.appendChild(alert);
		}
	}
};

/**
 * Called in start after the spinner stops.
 */
App.prototype.showAlert = function(message)
{
	if (message != null && message.length > 0)
	{
		var div = document.createElement('div');
		div.className = 'geAlert';
		div.style.zIndex = 2e9; 
		div.style.left = '50%';
		div.style.top = '-100%';
		//Limit width to 80% max with word wrapping
		div.style.maxWidth = '80%';
		div.style.width = 'max-content';
		div.style.whiteSpace = 'pre-wrap';
		mxUtils.setPrefixedStyle(div.style, 'transform', 'translate(-50%,0%)');
		mxUtils.setPrefixedStyle(div.style, 'transition', 'all 1s ease');
		
		div.innerHTML = message;
		
		var close = document.createElement('a');
		close.className = 'geAlertLink';
		close.style.textAlign = 'right';
		close.style.marginTop = '20px';
		close.style.display = 'block';
		close.setAttribute('title', mxResources.get('close'));
		close.innerHTML = mxResources.get('close');
		div.appendChild(close);
		
		mxEvent.addListener(close, 'click', function(evt)
		{
			if (div.parentNode != null)
			{
				div.parentNode.removeChild(div);
				mxEvent.consume(evt);
			}
		});
		
		document.body.appendChild(div);
		
		// Delayed to get smoother animation after DOM rendering
		window.setTimeout(function()
		{
			div.style.top = '30px';
		}, 10);
		
		// Fades out the alert after 15 secs
		window.setTimeout(function()
		{
			mxUtils.setPrefixedStyle(div.style, 'transition', 'all 2s ease');
			div.style.opacity = '0';
			
			window.setTimeout(function()
			{
				if (div.parentNode != null)
				{
					div.parentNode.removeChild(div);
				}
			}, 2000);
		}, 15000);
	}
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
App.prototype.start = function()
{
	try
	{
		// Handles all errors
		var ui = this;
			
		if (this.bg != null && this.bg.parentNode != null)
		{
			this.bg.parentNode.removeChild(this.bg);
		}
		
		this.restoreLibraries();
		this.spinner.stop();

		window.onerror = function(message, url, linenumber, colno, err)
		{
			// Ignores Grammarly error [1344]
			if (message != 'ResizeObserver loop limit exceeded')
			{
				EditorUi.logError('Uncaught: ' + ((message != null) ? message : ''),
					url, linenumber, colno, err, null, true);
				ui.handleError({message: message}, mxResources.get('unknownError'),
					null, null, null, null, true);
			}
		};
		
		// Listens to changes of the hash if not in embed or client mode
		if (urlParams['client'] != '1' && urlParams['embed'] != '1')
		{
			// Installs listener to claim current draft if there is one
			try
			{
				if (isLocalStorage)
				{
					window.addEventListener('storage', mxUtils.bind(this, function(evt)
					{
						var file = this.getCurrentFile();
						EditorUi.debug('storage event', [evt], [file]);
	
						if (file != null && evt.key == '.draft-alive-check' &&
							evt.newValue != null && file.draftId != null)
						{
							this.draftAliveCheck = evt.newValue;
							file.saveDraft();
						}
					}));
				}

				if (!mxClient.IS_CHROMEAPP && !EditorUi.isElectronApp && !this.isOfflineApp() &&
					urlParams['open'] == null && /www\.draw\.io$/.test(window.location.hostname) &&
					(!this.editor.chromeless || this.editor.editable))
				{
					this.showNameChangeBanner();
				}
			}
			catch (e)
			{
				// ignore
			}

			// Handles changes of the file ID in the hash
			var lastId = this.getDiagramId();
			
			mxEvent.addListener(window, 'hashchange', mxUtils.bind(this, function(evt)
			{
				try
				{
					var id = this.getDiagramId();

					if (id != lastId)
					{
						lastId = id;
						var file = this.getCurrentFile();

						if (file == null || file.getHash() != id)
						{
							this.loadFile(id, true);
						}
					}
				}
				catch (e)
				{
					// Workaround for possible scrollWidth of null in Dialog ctor
					if (document.body != null)
					{
						this.handleError(e, mxResources.get('errorLoadingFile'), mxUtils.bind(this, function()
						{
							var file = this.getCurrentFile();
							window.location.hash = (file != null) ? file.getHash() : '';
						}));
					}
				}
			}));
		}
		
		// Descriptor for CSV import
		if ((window.location.hash == null || window.location.hash.length <= 1) && urlParams['desc'] != null)
		{
			try
			{
				this.loadDescriptor(JSON.parse(Graph.decompress(urlParams['desc'])),
					null, mxUtils.bind(this, function(e)
				{
					this.handleError(e, mxResources.get('errorLoadingFile'));
				}));
			}
			catch (e)
			{
				this.handleError(e, mxResources.get('errorLoadingFile'));
			}
		}
		// Redirects old url URL parameter to new #U format
		else if ((window.location.hash == null || window.location.hash.length <= 1) && urlParams['url'] != null)
		{
			this.loadFile('U' + urlParams['url'], true);
		}
		else if (this.getCurrentFile() == null)
		{
			var done = mxUtils.bind(this, function()
			{
				// Starts in client mode and waits for data
				if (urlParams['client'] == '1' && (window.location.hash == null ||
					window.location.hash.length == 0 || window.location.hash.substring(0, 2) == '#P'))
				{
					var doLoadFile = mxUtils.bind(this, function(xml)
					{
						// Extracts graph model from PNG
						if (Editor.isPngDataUrl(xml))
						{
							xml = Editor.extractGraphModelFromPng(xml);
						}
						
						var title = urlParams['title'];
						
						if (title != null)
						{
							title = decodeURIComponent(title);
						}
						else
						{
							title = this.defaultFilename;
						}
						
						var file = new LocalFile(this, xml, title, true);
						
						if (window.location.hash != null && window.location.hash.substring(0, 2) == '#P')
						{
							file.getHash = function()
							{
								return window.location.hash.substring(1);
							};
						}
						
						this.fileLoaded(file);
						this.getCurrentFile().setModified(!this.editor.chromeless);
					});

					var parent = window.opener || window.parent;
					
					if (parent != window)
					{
						var value = urlParams['create'];
						
						if (value != null)
						{
							doLoadFile(parent[decodeURIComponent(value)]);
						}
						else
						{
							value = urlParams['data'];
							
							if (value != null)
							{
								doLoadFile(decodeURIComponent(value));
							}
							else
							{
								this.installMessageHandler(mxUtils.bind(this, function(xml, evt)
								{
									// Ignores messages from other windows
									if (evt.source == parent)
									{
										doLoadFile(xml);
									}
								}));
							}
						}
					}
				}
				// Checks if no earlier loading errors are showing
				else if (this.dialog == null)
				{
					if (urlParams['demo'] == '1')
					{
						var prev = Editor.useLocalStorage;
						this.createFile(this.defaultFilename, null,
							null, null, null, null, null, true);
						Editor.useLocalStorage = prev;
					}
					else if (urlParams['smart-template'] != null)
					{
						this.createFile(this.defaultFilename, null,
							null, null, null, null, null, true);
						this.actions.get('insertTemplate').funct();
					}
					else
					{
						var waiting = false;
						
						// Checks if we're waiting for some asynchronous file to be loaded
						// Cross-domain window access is not allowed in FF, so if we
						// were opened from another domain then this will fail.
						try
						{
							waiting = window.opener != null && window.opener.openFile != null;
						}
						catch(e)
						{
							// ignore
						}
						
						if (waiting)
						{
							// Spinner is stopped in App.open
							this.spinner.spin(document.body, mxResources.get('loading'))
						}
						else
						{
							var id = this.getDiagramId();
							
							if (EditorUi.enableDrafts && urlParams['mode'] == null &&
								this.getServiceName() == 'draw.io' && (id == null || id.length == 0) &&
								!this.editor.isChromelessView())
							{
								
								this.checkDrafts();
							}
							else if (id != null && id.length > 0)
							{
								this.loadFile(id, null, null, mxUtils.bind(this, function()
								{
									var temp = decodeURIComponent(urlParams['viewbox'] || '');
									
									if (temp != '')
									{
										try
										{
											var bounds = JSON.parse(temp);
											this.editor.graph.fitWindow(bounds, bounds.border);
										}
										catch (e)
										{
											// Ignore invalid viewport
											console.error(e);
										}
									}
								}));
							}
							else if (urlParams['splash'] != '0' || urlParams['mode'] != null)
							{
								this.loadFile();
							}
							else if (!EditorUi.isElectronApp)
							{
								this.createFile(this.defaultFilename, this.getFileData(),
									null, null, null, null, null, true);
							}
						}
					}
				}
			});
	
			var value = decodeURIComponent(urlParams['create'] || '');
			
			if ((window.location.hash == null || window.location.hash.length <= 1) &&
				value != null && value.length > 0 && this.spinner.spin(document.body, mxResources.get('loading')))
			{
				var reconnect = mxUtils.bind(this, function()
				{
					// Removes URL parameter and reloads the page
					if (this.spinner.spin(document.body, mxResources.get('reconnecting')))
					{
						window.location.search = this.getSearch(['create', 'title']);
					};
				});
	
				var showCreateDialog = mxUtils.bind(this, function(xml)
				{
					this.spinner.stop();
	
					// Resets mode for dialog - local file is only for preview
					if (urlParams['splash'] != '0')
					{
						this.fileLoaded(new LocalFile(this, xml, null));
						
						this.editor.graph.setEnabled(false);
						this.mode = urlParams['mode'];
						var title = urlParams['title'];
		
						if (title != null)
						{
							title = decodeURIComponent(title);
						}
						else
						{
							title = this.defaultFilename;
						}
						
						var serviceCount = this.getServiceCount(true);
						
						if (isLocalStorage)
						{
							serviceCount++;
						}
						
						var rowLimit = (serviceCount <= 4) ? 2 : (serviceCount > 6 ? 4 : 3);
						
						var dlg = new CreateDialog(this, title, mxUtils.bind(this, function(filename, mode)
						{
							if (mode == null)
							{
								this.hideDialog();
								var prev = Editor.useLocalStorage;
								this.createFile((filename.length > 0) ? filename : this.defaultFilename,
									this.getFileData(), null, null, null, true, null, true);
								Editor.useLocalStorage = prev;
							}
							else
							{
								this.pickFolder(mode, mxUtils.bind(this, function(folderId)
								{
									this.createFile(filename, this.getFileData(true),
										null, mode, null, true, folderId);
								}));
							}
						}), null, null, null, null, urlParams['browser'] == '1',
							null, null, true, rowLimit, null, null, null,
							this.editor.fileExtensions);
						this.showDialog(dlg.container, 420, (serviceCount > rowLimit) ? 390 : 280,
							true, false, mxUtils.bind(this, function(cancel)
						{
							if (cancel && this.getCurrentFile() == null)
							{
								this.showSplash();
							}
						}));
						dlg.init();
					}
				});
				
				value = decodeURIComponent(value);
				
				if (value.substring(0, 7) != 'http://' && value.substring(0, 8) != 'https://')
				{
					// Cross-domain window access is not allowed in FF, so if we
					// were opened from another domain then this will fail.
					try
					{
						if (window.opener != null && window.opener[value] != null)
						{
							showCreateDialog(window.opener[value]);
						}
						else
						{
							this.handleError(null, mxResources.get('errorLoadingFile'));
						}
					}
					catch (e)
					{
						this.handleError(e, mxResources.get('errorLoadingFile'));
					}
				}
				else
				{
					this.loadTemplate(value, function(text)
					{
						showCreateDialog(text);
					}, mxUtils.bind(this, function(e)
					{
						this.handleError(e, mxResources.get('errorLoadingFile'), reconnect);
					}));
				}
			}
			else
			{
				// Passes the fileId from the state parameter to the hash tag and reloads
				// the page without the state parameter
				if ((window.location.hash == null || window.location.hash.length <= 1) &&
					urlParams['state'] != null && this.stateArg != null && this.stateArg.action == 'open')
				{
					if (this.stateArg.ids != null)
					{
						if (window.history && window.history.replaceState)
						{
							// Removes state URL parameter without reloading the page
							window.history.replaceState(null, null, window.location.pathname +
								this.getSearch(['state']));
						}
						
						window.location.hash = 'G' + this.stateArg.ids[0];
					}
				}
				else if ((window.location.hash == null || window.location.hash.length <= 1) &&
					this.drive != null && this.stateArg != null && this.stateArg.action == 'create')
				{
					if (window.history && window.history.replaceState)
					{
						// Removes state URL parameter without reloading the page
						window.history.replaceState(null, null, window.location.pathname +
							this.getSearch(['state']));
					}
					
					this.setMode(App.MODE_GOOGLE);

					if (urlParams['splash'] == '0')
					{
						this.createFile((urlParams['title'] != null) ?
							decodeURIComponent(urlParams['title']) :
							this.defaultFilename);
					}
					else
					{
						this.actions.get('new').funct();
					}
				}
				else
				{
					// Removes open URL parameter. Hash is also updated in Init to load client.
					if (urlParams['open'] != null && window.history && window.history.replaceState)
					{
						window.history.replaceState(null, null, window.location.pathname +
							this.getSearch(['open', 'sketch']));
						window.location.hash = urlParams['open'];
					}
					
					done();
				}
			}
		}
	}
	catch (e)
	{
		this.handleError(e);
	}
};

/**
 * Checks for orphaned drafts.
 */
App.prototype.loadDraft = function(xml, success)
{
	this.createFile(this.defaultFilename, xml, null, null, mxUtils.bind(this, function()
	{
		window.setTimeout(mxUtils.bind(this, function()
		{
			var file = this.getCurrentFile();
			
			if (file != null)
			{
				file.fileChanged();
				
				if (success != null)
				{
					success();
				}
			}
		}), 0);
	}), null, null, true);
};

App.prototype.filterDrafts = function(filePath, guid, callback)
{
	var drafts = [];

	function result()
	{
		callback(drafts);
	};

	try
	{
		this.getDatabaseItems(mxUtils.bind(this, function(items)
		{
			EditorUi.debug('App.filterDrafts',
				[this], 'items', items);

			// Collects orphaned drafts
			for (var i = 0; i < items.length; i++)
			{
				try
				{
					var key = items[i].key;
					
					if (key != null && key.substring(0, 7) == '.draft_')
					{
						var obj = JSON.parse(items[i].data);
						
						if (obj != null && obj.type == 'draft' && obj.aliveCheck != guid && 
							((filePath == null && obj.fileObject == null) ||
								(obj.fileObject != null && obj.fileObject.path == filePath)))	
						{
							obj.key = key;
							drafts.push(obj);
						}
					}
				}
				catch (e)
				{
					// ignore
				}
			}

			result();
		}), result);
	}
	catch (e)
	{
		result();
	}
};

/**
 * Checks for orphaned drafts.
 */
App.prototype.checkDrafts = function()
{
	try
	{
		// Triggers storage event for other windows to mark active drafts
		var guid = Editor.guid();
		localStorage.setItem('.draft-alive-check', guid);
		
		window.setTimeout(mxUtils.bind(this, function()
		{
			localStorage.removeItem('.draft-alive-check');

			this.filterDrafts(null, guid, mxUtils.bind(this, function(drafts)
			{
				if (drafts.length == 1)
				{
					this.loadDraft(drafts[0].data, mxUtils.bind(this, function()
					{
						this.removeDatabaseItem(drafts[0].key);
					}));
				}
				else if (drafts.length > 1)
				{
					var ts = new Date(drafts[0].modified);
					
					var dlg = new DraftDialog(this, (drafts.length > 1) ? mxResources.get('selectDraft') :
						mxResources.get('draftFound', [ts.toLocaleDateString() + ' ' + ts.toLocaleTimeString()]),
						(drafts.length > 1) ? null : drafts[0].data, mxUtils.bind(this, function(index)
					{
						this.hideDialog();
						index = (index != '') ? index : 0;
						
						this.loadDraft(drafts[index].data, mxUtils.bind(this, function()
						{
							this.removeDatabaseItem(drafts[index].key);
						}));
					}), mxUtils.bind(this, function(index, success)
					{
						index = (index != '') ? index : 0;
						
						// Discard draft
						this.confirm(mxResources.get('areYouSure'), null, mxUtils.bind(this, function()
						{
							this.removeDatabaseItem(drafts[index].key);
							
							if (success != null)
							{
								success();
							}
						}), mxResources.get('no'), mxResources.get('yes'));
					}), null, null, null, (drafts.length > 1) ? drafts : null);
					this.showDialog(dlg.container, 640, 480, true, false, mxUtils.bind(this, function(cancel)
					{
						if (urlParams['splash'] != '0')
						{
							this.loadFile();
						}
						else
						{
							this.createFile(this.defaultFilename, this.getFileData(),
								null, null, null, null, null, true);
						}
					}));
					dlg.init();
				}
				else if (urlParams['splash'] != '0')
				{
					this.loadFile();
				}
				else
				{
					this.createFile(this.defaultFilename, this.getFileData(),
						null, null, null, null, null, true);
				}
			}));
		}), 0);
	}
	catch (e)
	{
		// ignore
	}
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
App.prototype.showSplash = function(force)
{
	//Splash dialog shouldn't be shownn when running without a file menu
	if (urlParams['noFileMenu'] == '1')
	{
		return;	
	}
	
	var serviceCount = this.getServiceCount(true);
	
	var showSecondDialog = mxUtils.bind(this, function()
	{
		var dlg = new SplashDialog(this);
		
		this.showDialog(dlg.container, 340, (mxClient.IS_CHROMEAPP ||
			EditorUi.isElectronApp) ? 200 : 230, true, true,
			mxUtils.bind(this, function(cancel)
			{
				// Creates a blank diagram if the dialog is closed
				if (cancel && !mxClient.IS_CHROMEAPP)
				{
					var prev = Editor.useLocalStorage;
					this.createFile(this.defaultFilename + (EditorUi.isElectronApp? '.drawio' : ''),
						null, null, null, null, null, null, urlParams['local'] != '1');
					Editor.useLocalStorage = prev;
				}
			}), true);
	});
	
	if (this.editor.isChromelessView())
	{
		this.handleError({message: mxResources.get('noFileSelected')},
			mxResources.get('errorLoadingFile'), mxUtils.bind(this, function()
		{
			this.showSplash();
		}));
	}
	else if (!mxClient.IS_CHROMEAPP && (this.mode == null || force))
	{
		var rowLimit = (serviceCount == 4) ? 2 : 3;
		
		var dlg = new StorageDialog(this, mxUtils.bind(this, function()
		{
			this.hideDialog();
			showSecondDialog();
		}), rowLimit);
		
		this.showDialog(dlg.container, (rowLimit < 3) ? 200 : 300,
			((serviceCount > 3) ? 320 : 210), true, false);
	}
	else if (urlParams['create'] == null)
	{
		showSecondDialog();
	}
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
App.prototype.addLanguageMenu = function(elt, addLabel, right)
{
	var img = null;
	var langMenu = this.menus.get('language');
	
	if (langMenu != null)
	{
		img = document.createElement('div');
		img.setAttribute('title', mxResources.get('language'));

		img.className = (Editor.currentTheme != 'atlas') ? 'geIcon geAdaptiveAsset' : '';
		img.style.backgroundImage = 'url(' + Editor.globeImage + ')';
		img.style.backgroundPosition = 'right center';
		img.style.backgroundRepeat = 'no-repeat';
		img.style.backgroundSize = '19px 19px';
		img.style.width = '19px';
		img.style.height = '19px';
		mxUtils.setOpacity(img, 40);

		img.style.position = 'absolute';
		img.style.cursor = 'pointer';
		img.style.bottom = '20px';
		img.style.right = (right != null) ? right : '22px';
		
		if (addLabel)
		{
			img.style.direction = 'rtl';
			img.style.textAlign = 'right';
			img.style.right = (right != null) ? right : '24px';

			var label = document.createElement('span');
			label.style.display = 'inline-block';
			label.style.fontSize = '12px';
			label.style.margin = '2px 24px 0 0';
			label.style.userSelect = 'none';
			
			mxUtils.write(label, mxResources.get('language'));
			img.appendChild(label);

			label.className = (Editor.currentTheme != 'atlas') ? 'geAdaptiveAsset' : '';
		}
		
		mxEvent.addListener(img, 'click', mxUtils.bind(this, function(evt)
		{
			this.editor.graph.popupMenuHandler.hideMenu();
			var menu = new mxPopupMenu(this.menus.get('language').funct);
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
	
			var offset = mxUtils.getOffset(img);
			menu.popup(offset.x, offset.y + img.offsetHeight, null, evt);
			
			// Allows hiding by clicking on document
			this.setCurrentMenu(menu);
		}));
	
		elt.appendChild(img);
	}
	
	return img;
};

/**
 * Loads the given file handle as a local file.
 */
App.prototype.loadFileSystemEntry = function(fileHandle, success, error)
{
	error = (error != null) ? error : mxUtils.bind(this, function(e)
	{
		this.handleError(e);
	});
	
	try
	{
		fileHandle.getFile().then(mxUtils.bind(this, function(file)
		{
			var reader = new FileReader();
					
			reader.onload = mxUtils.bind(this, function(e)
			{
				try
				{
					if (success != null)
					{
						var data = e.target.result;
						
						if (file.type == 'image/png')
						{
							data = this.extractGraphModelFromPng(data);
						}
	
						success(new LocalFile(this, data, file.name, null, fileHandle, file));
					}
					else
					{
						this.openFileHandle(e.target.result, file.name, file, false, fileHandle);
					}
				}
				catch(e)
				{
					error(e);
				}
			});
			
			reader.onerror = error;
			
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
		}), error);
	}
	catch (e)
	{
		error(e);
	}
};

/**
 * Loads the given file handle as a local file.
 */
App.prototype.createFileSystemOptions = function(name)
{
	var ext = [];
	var temp = null;
		
	if (name != null)
	{
		var idx = name.lastIndexOf('.');
		
		if (idx > 0)
		{
			temp = name.substring(idx + 1);
		}
	}
	
	for (var i = 0; i < this.editor.diagramFileTypes.length; i++)
	{
		var obj = {description: mxResources.get(this.editor.diagramFileTypes[i].description) +
			((mxClient.IS_MAC) ? ' (.' + this.editor.diagramFileTypes[i].extension + ')' : ''),
			accept: {}};
		obj.accept[this.editor.diagramFileTypes[i].mimeType] = ['.' + this.editor.diagramFileTypes[i].extension];
		
		if (this.editor.diagramFileTypes[i].extension == temp)
		{
			ext.splice(0, 0, obj);
		}
		else
		{
			if (this.editor.diagramFileTypes[i].extension == temp)
			{
				ext.splice(0, 0, obj);
			}
			else
			{
				ext.push(obj);
			}
		}
	}
	
	// TODO: Specify default filename
	return {types: ext, fileName: name};
};

/**
 * Loads the given file handle as a local file.
 */
App.prototype.showSaveFilePicker = function(success, error, opts)
{
	error = (error != null) ? error : mxUtils.bind(this, function(e)
	{
		if (e.name != 'AbortError')
		{
			this.handleError(e);
		}
	});
	
	opts = (opts != null) ? opts : this.createFileSystemOptions();
	
	window.showSaveFilePicker(opts).then(mxUtils.bind(this, function(fileHandle)
	{
		if (fileHandle != null)
		{
			fileHandle.getFile().then(mxUtils.bind(this, function(desc)
			{
				success(fileHandle, desc);
			}), error);
		}
	}), error);
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
App.prototype.pickFile = function(mode)
{
	try
	{
		mode = (mode != null) ? mode : this.mode;
		
		if (mode == App.MODE_GOOGLE)
		{
			if (this.drive != null && typeof(google) != 'undefined' && typeof(google.picker) != 'undefined')
			{
				this.drive.pickFile();
			}
			else
			{
				this.openLink('https://drive.google.com');
			}
		}
		else
		{
			var peer = this.getPeerForMode(mode);
			
			if (peer != null)
			{
				peer.pickFile();
			}
			else if (mode == App.MODE_DEVICE && EditorUi.nativeFileSupport)
			{
				window.showOpenFilePicker().then(mxUtils.bind(this, function(fileHandles)
				{
					if (fileHandles != null && fileHandles.length > 0 &&
						this.spinner.spin(document.body, mxResources.get('loading')))
					{
						this.loadFileSystemEntry(fileHandles[0]);
					}
				}), mxUtils.bind(this, function(e)
				{
					if (e.name != 'AbortError')
					{
						this.handleError(e);
					}
				}));
			}
			else if (mode == App.MODE_DEVICE && Graph.fileSupport)
			{
				if (this.openFileInputElt == null) 
				{
					var input = document.createElement('input');
					input.setAttribute('type', 'file');
					
					mxEvent.addListener(input, 'change', mxUtils.bind(this, function()
					{
						if (input.files != null)
						{
							this.openFiles(input.files);
							
				    		// Resets input to force change event for
							// same file (type reset required for IE)
							input.type = '';
							input.type = 'file';
				    		input.value = '';
						}
					}));
					
					input.style.display = 'none';
					document.body.appendChild(input);
					this.openFileInputElt = input;
				}
				
				this.openFileInputElt.click();
			}
			else
			{
				this.hideDialog();
				window.openNew = this.getCurrentFile() != null && !this.isDiagramEmpty();
				window.baseUrl = this.getUrl();
				window.openKey = 'open';
				
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
				
				var prevValue = Editor.useLocalStorage;
				Editor.useLocalStorage = (mode == App.MODE_BROWSER);
				this.openFile();
				
				// Installs local handler for opened files in same window
				window.openFile.setConsumer(mxUtils.bind(this, function(xml, filename)
				{
					var doOpenFile = mxUtils.bind(this, function()
					{
						// Replaces PNG with XML extension
						var dot = !this.useCanvasForExport && filename.substring(filename.length - 4) == '.png';
						
						if (dot)
						{
							filename = filename.substring(0, filename.length - 4) + '.drawio';
						}
		
						this.fileLoaded((mode == App.MODE_BROWSER) ?
							new StorageFile(this, xml, filename) :
							new LocalFile(this, xml, filename));
					});
					
					var currentFile = this.getCurrentFile();
					
					if (currentFile == null || !currentFile.isModified())
					{
						doOpenFile();
					}
					else
					{
						this.confirm(mxResources.get('allChangesLost'), null, doOpenFile,
							mxResources.get('cancel'), mxResources.get('discardChanges'));
					}
				}));
				
				// Extends dialog close to show splash screen
				var dlg = this.dialog;
				var dlgClose = dlg.close;
				
				this.dialog.close = mxUtils.bind(this, function(cancel)
				{
					Editor.useLocalStorage = prevValue;
					dlgClose.apply(dlg, arguments);
		
					if (this.getCurrentFile() == null)
					{
						this.showSplash();
					}
				});
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
App.prototype.pickLibrary = function(mode)
{
	mode = (mode != null) ? mode : this.mode;
	
	if (mode == App.MODE_GOOGLE || mode == App.MODE_DROPBOX || mode == App.MODE_ONEDRIVE ||
		mode == App.MODE_GITHUB || mode == App.MODE_GITLAB || mode == App.MODE_TRELLO)
	{
		var peer = (mode == App.MODE_GOOGLE) ? this.drive :
			((mode == App.MODE_ONEDRIVE) ? this.oneDrive :
			((mode == App.MODE_GITHUB) ? this.gitHub :
			((mode == App.MODE_GITLAB) ? this.gitLab :
			((mode == App.MODE_TRELLO) ? this.trello :
			this.dropbox))));
		
		if (peer != null)
		{
			peer.pickLibrary(mxUtils.bind(this, function(id, optionalFile)
			{
				if (optionalFile != null)
				{
					try
					{
						this.loadLibrary(optionalFile);
					}
					catch (e)
					{
						this.handleError(e, mxResources.get('errorLoadingFile'));
					}
				}
				else
				{
					if (this.spinner.spin(document.body, mxResources.get('loading')))
					{
						peer.getLibrary(id, mxUtils.bind(this, function(file)
						{
							this.spinner.stop();
							
							try
							{
								this.loadLibrary(file);
							}
							catch (e)
							{
								this.handleError(e, mxResources.get('errorLoadingFile'));
							}
						}), mxUtils.bind(this, function(resp)
						{
							this.handleError(resp, (resp != null) ? mxResources.get('errorLoadingFile') : null);
						}));
					}
				}
			}));
		}
	}
	else if (mode == App.MODE_DEVICE && Graph.fileSupport)
	{
		if (this.libFileInputElt == null) 
		{
			var input = document.createElement('input');
			input.setAttribute('type', 'file');
			
			mxEvent.addListener(input, 'change', mxUtils.bind(this, function()
			{
				if (input.files != null)
				{
					for (var i = 0; i < input.files.length; i++)
					{
						(mxUtils.bind(this, function(file)
						{
							var reader = new FileReader();
						
							reader.onload = mxUtils.bind(this, function(e)
							{
								try
								{
									this.loadLibrary(new LocalLibrary(this, e.target.result, file.name));
								}
								catch (e)
								{
									this.handleError(e, mxResources.get('errorLoadingFile'));
								}
							});
	
							reader.readAsText(file);
						}))(input.files[i]);
					}
					
		    		// Resets input to force change event for same file (type reset required for IE)
					input.type = '';
					input.type = 'file';
		    		input.value = '';
				}
			}));
			
			input.style.display = 'none';
			document.body.appendChild(input);
			this.libFileInputElt = input;
		}
		
		this.libFileInputElt.click();
	}
	else
	{
		window.openNew = false;
		window.openKey = 'open';
		
		window.listBrowserFiles = mxUtils.bind(this, function(success, error) 
		{
			StorageFile.listFiles(this, 'L', success, error);
		});
		
		window.openBrowserFile = mxUtils.bind(this, function(title, success, error)
		{
			StorageFile.getFileContent(this, title, success, error);
		});
		
		window.deleteBrowserFile = mxUtils.bind(this, function(title, success, error)
		{
			StorageFile.deleteFile(this, title, success, error);
		});
		
		var prevValue = Editor.useLocalStorage;
		Editor.useLocalStorage = mode == App.MODE_BROWSER;
		
		// Closes dialog after open
		window.openFile = new OpenFile(mxUtils.bind(this, function(cancel)
		{
			this.hideDialog(cancel);
		}));
		
		window.openFile.setConsumer(mxUtils.bind(this, function(xml, filename)
		{
			try
			{
				this.loadLibrary((mode == App.MODE_BROWSER) ? new StorageLibrary(this, xml, filename) :
					new LocalLibrary(this, xml, filename));
			}
			catch (e)
			{
				this.handleError(e, mxResources.get('errorLoadingFile'));
			}
		}));

		// Removes openFile if dialog is closed
		this.showDialog(new OpenDialog(this).container, (Editor.useLocalStorage) ? 640 : 360,
			(Editor.useLocalStorage) ? 480 : 220, true, true, function()
		{
			Editor.useLocalStorage = prevValue;
			window.openFile = null;
		});
	}
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
App.prototype.saveLibrary = function(name, images, file, mode, noSpin, noReload, fn)
{
	try
	{
		mode = (mode != null) ? mode : this.mode;
		noSpin = (noSpin != null) ? noSpin : false;
		noReload = (noReload != null) ? noReload : false;
		var xml = this.createLibraryDataFromImages(images);
		
		var error = mxUtils.bind(this, function(resp)
		{
			this.spinner.stop();
			
			if (fn != null)
			{
				fn();
			}
			
			this.handleError(resp, (resp != null) ? mxResources.get('errorSavingFile') : null);
		});
	
		// Handles special case for local libraries
		if (file == null && mode == App.MODE_DEVICE)
		{
			file = new LocalLibrary(this, xml, name);
		}
		
		if (file == null)
		{
			this.pickFolder(mode, mxUtils.bind(this, function(folderId)
			{
				if (mode == App.MODE_GOOGLE && this.drive != null && this.spinner.spin(document.body, mxResources.get('inserting')))
				{
					this.drive.insertFile(name, xml, folderId, mxUtils.bind(this, function(newFile)
					{
						this.spinner.stop();
						this.hideDialog(true);
						this.libraryLoaded(newFile, images);
					}), error, this.drive.libraryMimeType);
				}
				else if (mode == App.MODE_GITHUB && this.gitHub != null && this.spinner.spin(document.body, mxResources.get('inserting')))
				{
					this.gitHub.insertLibrary(name, xml, mxUtils.bind(this, function(newFile)
					{
						this.spinner.stop();
						this.hideDialog(true);
						this.libraryLoaded(newFile, images);
					}), error, folderId);
				}
				else if (mode == App.MODE_GITLAB && this.gitLab != null && this.spinner.spin(document.body, mxResources.get('inserting')))
				{
					this.gitLab.insertLibrary(name, xml, mxUtils.bind(this, function(newFile)
					{
						this.spinner.stop();
						this.hideDialog(true);
						this.libraryLoaded(newFile, images);
					}), error, folderId);
				}
				else if (mode == App.MODE_TRELLO && this.trello != null && this.spinner.spin(document.body, mxResources.get('inserting')))
				{
					this.trello.insertLibrary(name, xml, mxUtils.bind(this, function(newFile)
					{
						this.spinner.stop();
						this.hideDialog(true);
						this.libraryLoaded(newFile, images);
					}), error, folderId);
				}
				else if (mode == App.MODE_DROPBOX && this.dropbox != null && this.spinner.spin(document.body, mxResources.get('inserting')))
				{
					this.dropbox.insertLibrary(name, xml, mxUtils.bind(this, function(newFile)
					{
						this.spinner.stop();
						this.hideDialog(true);
						this.libraryLoaded(newFile, images);
					}), error, folderId);
				}
				else if (mode == App.MODE_ONEDRIVE && this.oneDrive != null && this.spinner.spin(document.body, mxResources.get('inserting')))
				{
					this.oneDrive.insertLibrary(name, xml, mxUtils.bind(this, function(newFile)
					{
						this.spinner.stop();
						this.hideDialog(true);
						this.libraryLoaded(newFile, images);
					}), error, folderId);
				}
				else if (mode == App.MODE_BROWSER)
				{
					var fn = mxUtils.bind(this, function()
					{
						var file = new StorageLibrary(this, xml, name);
						
						// Inserts data into local storage
						file.saveFile(name, false, mxUtils.bind(this, function()
						{
							this.hideDialog(true);
							this.libraryLoaded(file, images);
						}), error);
					});
					
					if (localStorage.getItem(name) == null)
					{
						fn();
					}
					else
					{
						this.confirm(mxResources.get('replaceIt', [name]), fn);
					}
				}
				else
				{
					this.handleError({message: mxResources.get('serviceUnavailableOrBlocked')});
				}
			}));
		}
		else if (noSpin || this.spinner.spin(document.body, mxResources.get('saving')))
		{
			file.setData(xml);
			
			var doSave = mxUtils.bind(this, function()
			{
				file.save(true, mxUtils.bind(this, function(resp)
				{
					this.spinner.stop();
					this.hideDialog(true);
					
					if (!noReload)
					{
						this.libraryLoaded(file, images);
					}
					
					if (fn != null)
					{
						fn();
					}
				}), error);
			});
			
			if (name != file.getTitle())
			{
				var oldHash = file.getHash();
				
				file.rename(name, mxUtils.bind(this, function(resp)
				{
					// Change hash in stored settings
					if (file.constructor != LocalLibrary && oldHash != file.getHash())
					{
						mxSettings.removeCustomLibrary(oldHash);
						mxSettings.addCustomLibrary(file.getHash());
					}
	
					// Workaround for library files changing hash so
					// the old library cannot be removed from the
					// sidebar using the updated file in libraryLoaded
					this.removeLibrarySidebar(oldHash);
	
					doSave();
				}), error)
			}
			else
			{
				doSave();
			}
		}
	}
	catch (e)
	{
		this.handleError(e);
	}
};

/**
 * Adds the label menu items to the given menu and parent.
 */
App.prototype.saveFile = function(forceDialog, success)
{
	var file = this.getCurrentFile();
	
	if (file != null)
	{
		// FIXME: Invoke for local files
		var done = mxUtils.bind(this, function()
		{
			if (EditorUi.enableDrafts)
			{
				file.removeDraft();
			}
			
			if (this.getCurrentFile() != file && !file.isModified())
			{
				// Workaround for possible status update while save as dialog is showing
				// is to show no saved status for device files
				if (file.getMode() != App.MODE_DEVICE)
				{
					this.editor.setStatus(mxUtils.htmlEntities(mxResources.get('allChangesSaved')));
				}
				else
				{
					this.editor.setStatus('');
				}
			}
			
			if (success != null)
			{
				success();
			}
		});
		
		if (!forceDialog && file.getTitle() != null && file.invalidFileHandle == null && this.mode != null)
		{
			this.save(file.getTitle(), done);
		}
		else if (file != null && file.constructor == LocalFile && file.fileHandle != null)
		{
			this.showSaveFilePicker(mxUtils.bind(this, function(fileHandle, desc)
			{
				file.invalidFileHandle = null;
				file.fileHandle = fileHandle;
				file.title = desc.name;
				file.desc = desc;
				this.save(desc.name, done);
			}), null, this.createFileSystemOptions(file.getTitle()));
		}
		else
		{
			var filename = (file.getTitle() != null) ? file.getTitle() : this.defaultFilename;

			var saveFunction = mxUtils.bind(this, function(name, mode, input, folderId)
			{
				if (name != null && name.length > 0)
				{
					// Handles special case where PDF export is detected
					if (/(\.pdf)$/i.test(name))
					{
						this.confirm(mxResources.get('didYouMeanToExportToPdf'), mxUtils.bind(this, function()
						{
							this.hideDialog();
							this.actions.get('exportPdf').funct();
						}), mxUtils.bind(this, function()
						{
							input.value = name.split('.').slice(0, -1).join('.');
							input.focus();
							
							if (mxClient.IS_GC || mxClient.IS_FF || document.documentMode >= 5)
							{
								input.select();
							}
							else
							{
								document.execCommand('selectAll', false, null);
							}
						}), mxResources.get('yes'), mxResources.get('no'));
					}
					else
					{
						this.hideDialog();
						
						if (prev == null && mode == App.MODE_DEVICE)
						{
							if (file != null && EditorUi.nativeFileSupport)
							{
								this.showSaveFilePicker(mxUtils.bind(this, function(fileHandle, desc)
								{
									file.fileHandle = fileHandle;
									file.mode = App.MODE_DEVICE;
									file.title = desc.name;
									file.desc = desc;

									this.setMode(App.MODE_DEVICE);
									this.save(desc.name, done);
								}), mxUtils.bind(this, function(e)
								{
									if (e.name != 'AbortError')
									{
										this.handleError(e);
									}
								}), this.createFileSystemOptions(name));
							}
							else
							{
								this.setMode(App.MODE_DEVICE);
								this.save(name, done);
							}
						}
						else if (mode == 'download')
						{
							var tmp = new LocalFile(this, null, name);
							tmp.save();
						}
						else if (mode == '_blank')
						{
							window.openFile = new OpenFile(function()
							{
								window.openFile = null;
							});
							
							// Do not use a filename to use undefined mode
							window.openFile.setData(this.getFileData(true));
							this.openLink(this.getUrl(window.location.pathname), null, true);
						}
						else if (prev != mode)
						{
							var createFile = mxUtils.bind(this, function(folderId)
							{
								var graph = this.editor.graph;
								var selection = graph.getSelectionCells();
								var viewState = graph.getViewState();
								var page = this.currentPage;
								
								this.createFile(name, this.getFileData(/(\.xml)$/i.test(name) ||
									name.indexOf('.') < 0 || /(\.drawio)$/i.test(name),
									/(\.svg)$/i.test(name), /(\.html)$/i.test(name)), null,
									mode, done, this.mode == null, folderId, null, null,
									mxUtils.bind(this, function()
									{
										this.restoreViewState(page, viewState, selection);
									}));
							});

							if (folderId != null)
							{
								createFile(folderId);
							}
							else
							{
								this.pickFolder(mode, createFile);
							}
						}
						else if (mode != null)
						{
							this.save(name, done);
						}
					}
				}
			});

			var allowTab = !mxClient.IS_IOS || !navigator.standalone;

			if (urlParams['save-dialog'] == '1')
			{
				var dlg = new SaveDialog(this, filename, mxUtils.bind(this, function(input, mode, folderId)
				{
					saveFunction(input.value, mode, input, folderId);
					this.hideDialog();
				}), (allowTab) ? null : ['_blank']);

				this.showDialog(dlg.container, 420, 136, true, false, mxUtils.bind(this, function()
				{
					this.hideDialog();
				}));
				dlg.init();
			}
			else
			{
				var prev = this.mode;
				var serviceCount = this.getServiceCount(true);
				
				if (isLocalStorage)
				{
					serviceCount++;
				}
				
				var rowLimit = (serviceCount <= 4) ? 2 : (serviceCount > 6 ? 4 : 3);
				
				var dlg = new CreateDialog(this, filename, saveFunction, mxUtils.bind(this, function()
				{
					this.hideDialog();
				}), mxResources.get('saveAs'), mxResources.get('download'), null, null, allowTab,
					null, true, rowLimit, null, null, null, this.editor.fileExtensions, false);
				this.showDialog(dlg.container, 420, (serviceCount > rowLimit) ? 390 : 280, true, true);
				dlg.init();
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
App.prototype.loadTemplate = function(url, onload, onerror, templateFilename, asLibrary)
{
	var base64 = false;
	var realUrl = url;
	var filterFn = (templateFilename != null) ? templateFilename : url;
	var isVisioFilename = /(\.v(dx|sdx?))($|\?)/i.test(filterFn) ||
		/(\.vs(x|sx?))($|\?)/i.test(filterFn);
	var binary = /\.png$/i.test(filterFn) || /\.pdf$/i.test(filterFn);
	
	if (!this.editor.isCorsEnabledForUrl(realUrl))
	{
		base64 = binary || isVisioFilename;
		var nocache = 't=' + new Date().getTime();
		realUrl = PROXY_URL + '?url=' + encodeURIComponent(url) +
			'&' + nocache + ((base64) ? '&base64=1' : '');
	}

	this.editor.loadUrl(realUrl, mxUtils.bind(this, function(responseData)
	{
		try
		{
			var data = (!base64) ? responseData : ((window.atob && !mxClient.IS_IE && !mxClient.IS_IE11) ?
				atob(responseData) : Base64.decode(responseData));
			
			if (isVisioFilename || this.isVisioData(data))
			{
				// Adds filename to control converter code
				if (!isVisioFilename)
				{
					if (asLibrary)
					{
						filterFn = this.isRemoteVisioData(data) ? 'raw.vss' : 'raw.vssx';
					}
					else
					{
						filterFn = this.isRemoteVisioData(data) ? 'raw.vsd' : 'raw.vsdx';
					}
				}
				
				this.importVisio(this.base64ToBlob(responseData.substring(responseData.indexOf(',') + 1)), function(xml)
				{
					onload(xml);
				}, onerror, filterFn);
			}
			else if (new XMLHttpRequest().upload && this.isRemoteFileFormat(data, filterFn))
			{
				if (this.isExternalDataComms())
				{
					// Asynchronous parsing via server
					this.parseFileData(data, mxUtils.bind(this, function(xhr)
					{
						if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status <= 299 &&
							xhr.responseText.substring(0, 13) == '<mxGraphModel')
						{
							onload(xhr.responseText);
						}
					}), url);
				}
				else
				{
					this.showError(mxResources.get('error'), mxResources.get('notInOffline'), null, onerror);
				}
			}
			else if (this.isLucidChartData(data))
			{
				this.convertLucidChart(data, mxUtils.bind(this, function(xml)
				{
					onload(xml);
				}), mxUtils.bind(this, function(e)
				{
					onerror(e);
				}));
			}
			else
			{
				if (/(\.png)($|\?)/i.test(filterFn) || Editor.isPngData(data))
				{
					data = Editor.extractGraphModelFromPng(responseData);
				}
				
				onload(data);
			}
		}
		catch (e)
		{
			onerror(e);
		}
	}), onerror, /(\.png)($|\?)/i.test(filterFn) || /(\.v(dx|sdx?))($|\?)/i.test(filterFn) ||
		/(\.vs(x|sx?))($|\?)/i.test(filterFn), null, null, base64);
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
App.prototype.getPeerForMode = function(mode)
{
	if (mode == App.MODE_GOOGLE)
	{
		return this.drive;
	}
	else if (mode == App.MODE_GITHUB)
	{
		return this.gitHub;
	}
	else if (mode == App.MODE_GITLAB)
	{
		return this.gitLab;
	}
	else if (mode == App.MODE_DROPBOX)
	{
		return this.dropbox;
	}
	else if (mode == App.MODE_ONEDRIVE)
	{
		return this.oneDrive;
	}
	else if (mode == App.MODE_TRELLO)
	{
		return this.trello;
	}
	else
	{
		return null;
	}
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
App.prototype.uncompressPages = function(data)
{
	if (data != null)
	{
		try
		{
			var doc = mxUtils.parseXml(data);

			if (doc.documentElement.nodeName == 'mxfile')
			{
				var diagrams = doc.documentElement.getElementsByTagName('diagram');

				for (var i = 0; i < diagrams.length; i++)
				{
					var node = Editor.parseDiagramNode(diagrams[i], true);

					// Replaces text content with XML
					if (node != null)
					{
						mxUtils.setTextContent(diagrams[i], '');
						diagrams[i].appendChild(node);
					}
				}

				data = mxUtils.getPrettyXml(doc.documentElement);
			}
		}
		catch (e)
		{
			// fallback to input data in case of error
		}
	}

	return data;
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
App.prototype.createFile = function(title, data, libs, mode, done, replace, folderId, tempFile, clibs, success)
{
	mode = (tempFile) ? null : ((mode != null) ? mode : this.mode);

	if (title != null && this.spinner.spin(document.body, mxResources.get('inserting')))
	{
		data = (data != null) ? data : this.emptyDiagramXml;

		// Decompresses existing content
		if (data != null && !Editor.defaultCompressed)
		{
			data = this.uncompressPages(data);
		}

		var complete = mxUtils.bind(this, function()
		{
			this.spinner.stop();
		});
		
		var error = mxUtils.bind(this, function(resp)
		{
			complete();
			
			if (resp == null && this.getCurrentFile() == null && this.dialog == null)
			{
				this.showSplash();
			}
			else if (resp != null)
			{
				this.handleError(resp);
			}
		});
		
		try
		{
			var fileCreated = mxUtils.bind(this, function(file)
			{
				complete();
				this.fileCreated(file, libs, replace, done, clibs, success);
			});

			if (mode == App.MODE_GOOGLE && this.drive != null)
			{
				if (folderId == null && this.stateArg != null && this.stateArg.folderId != null)
				{
					folderId = this.stateArg.folderId;
				}
	
				this.drive.insertFile(title, data, folderId, fileCreated, error);
			}
			else if (mode == App.MODE_GITHUB && this.gitHub != null)
			{
				this.gitHub.insertFile(title, data, fileCreated, error, false, folderId);
			}
			else if (mode == App.MODE_GITLAB && this.gitLab != null)
			{
				this.gitLab.insertFile(title, data, fileCreated, error, false, folderId);
			}
			else if (mode == App.MODE_TRELLO && this.trello != null)
			{
				this.trello.insertFile(title, data, fileCreated, error, false, folderId);
			}
			else if (mode == App.MODE_DROPBOX && this.dropbox != null)
			{
				this.dropbox.insertFile(title, data, fileCreated, error);
			}
			else if (mode == App.MODE_ONEDRIVE && this.oneDrive != null)
			{
				this.oneDrive.insertFile(title, data, fileCreated, error, false, folderId);
			}
			else if (mode == App.MODE_BROWSER)
			{
				StorageFile.insertFile(this, title, data, fileCreated, error);
			}
			else if (!tempFile && mode == App.MODE_DEVICE && EditorUi.nativeFileSupport)
			{
				complete();
				
				this.showSaveFilePicker(mxUtils.bind(this, function(fileHandle, desc)
				{
					var file = new LocalFile(this, data, desc.name, null, fileHandle, desc);
					
					file.saveFile(desc.name, false, mxUtils.bind(this, function()
					{
						this.fileCreated(file, libs, replace, done, clibs, success);
					}), error, true);
				}), mxUtils.bind(this, function(e)
				{
					if (e.name != 'AbortError')
					{
						error(e);
					}
				}), this.createFileSystemOptions(title));
			}
			else
			{
				complete();
				this.fileCreated(new LocalFile(this, data, title, mode == null),
					libs, replace, done, clibs, success);
			}
		}
		catch (e)
		{
			complete();
			this.handleError(e);
		}
	}
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
App.prototype.fileCreated = function(file, libs, replace, done, clibs, success)
{
	var url = window.location.pathname;
	
	if (libs != null && libs.length > 0)
	{
		url += '?libs=' + libs;
	}

	if (clibs != null && clibs.length > 0)
	{
		url += '?clibs=' + clibs;
	}
	
	url = this.getUrl(url);

	// Always opens a new tab for local files to avoid losing changes
	if (file.getMode() != App.MODE_DEVICE)
	{
		url += '#' + file.getHash();
	}

	// Makes sure to produce consistent output with finalized files via createFileData this needs
	// to save the file again since it needs the newly created file ID for redirecting in HTML
	if (this.spinner.spin(document.body, mxResources.get('inserting')))
	{
		var data = file.getData();
		var dataNode = (data.length > 0) ? this.editor.extractGraphModel(
			mxUtils.parseXml(data).documentElement, true) : null;
		var redirect = window.location.protocol + '//' + window.location.hostname + url;
		var node = dataNode;
		var graph = null;
		
		// Handles special case where SVG files need a rendered graph to be saved
		if (dataNode != null && /\.svg$/i.test(file.getTitle()))
		{
			graph = this.createTemporaryGraph(this.editor.graph.getStylesheet());
			document.body.appendChild(graph.container);
			node = this.decodeNodeIntoGraph(node, graph);
		}
		
		file.setData(this.createFileData(dataNode, graph, file, redirect));

		if (graph != null)
		{
			graph.container.parentNode.removeChild(graph.container);
		}

		var complete = mxUtils.bind(this, function()
		{
			this.spinner.stop();
		});
		
		var fn = mxUtils.bind(this, function()
		{
			complete();
			
			var currentFile = this.getCurrentFile();
			
			if (replace == null && currentFile != null)
			{
				replace = !currentFile.isModified() && currentFile.getMode() == null;
			}
			
			var fn3 = mxUtils.bind(this, function()
			{
				window.openFile = null;
				this.fileLoaded(file, null, success);
				
				if (replace)
				{
					file.addAllSavedStatus();
				}
				
				if (libs != null)
				{
					this.sidebar.showEntries(libs);
				}
				
				if (clibs != null)
				{
					var temp = [];
					var tokens = clibs.split(';');
					
					for (var i = 0; i < tokens.length; i++)
					{
						temp.push(decodeURIComponent(tokens[i]));
					}
					
					this.loadLibraries(temp);
				}

				if (done != null)
				{
					done();
				}
			});

			var fn2 = mxUtils.bind(this, function()
			{
				if (replace || currentFile == null || !currentFile.isModified())
				{
					fn3();
				}
				else
				{
					this.confirm(mxResources.get('allChangesLost'), null, fn3,
						mxResources.get('cancel'), mxResources.get('discardChanges'));
				}
			});

			// Opens the file in a new window
			if (replace != null && !replace)
			{
				// Opens local file in a new window
				if (file.constructor == LocalFile)
				{
					window.openFile = new OpenFile(function()
					{
						window.openFile = null;
					});
						
					window.openFile.setData(file.getData(), file.getTitle(), file.getMode() == null);
				}

				window.openWindow(url, null, fn2);
			}
			else
			{
				fn2();
			}
		});

		// Updates data in memory for local files
		if (file.constructor == LocalFile)
		{
			fn();
		}
		else
		{
			file.saveFile(file.getTitle(), false, mxUtils.bind(this, function()
			{
				fn();
			}), mxUtils.bind(this, function(resp)
			{
				complete();

				if (resp == null || resp.name != 'AbortError')
				{
					this.handleError(resp);
				}
			}));
		}
	}
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
App.prototype.loadFile = function(id, sameWindow, file, success, force)
{
	if (urlParams['openInSameWin'] == '1' || navigator.standalone)
	{
		sameWindow = true;
	}
	
	this.hideDialog();
	
	var fn2 = mxUtils.bind(this, function()
	{
		if (id == null || id.length == 0)
		{
			this.editor.setStatus('');
			this.fileLoaded(null);
		}
		else if (this.spinner.spin(document.body, mxResources.get('loading')))
		{
			// Handles files from localStorage
			if (id.charAt(0) == 'L')
			{
				this.spinner.stop();

				if (!isLocalStorage)
				{
					this.handleError({message: mxResources.get('serviceUnavailableOrBlocked')},
						mxResources.get('errorLoadingFile'), mxUtils.bind(this, function()
					{
						var tempFile = this.getCurrentFile();
						window.location.hash = (tempFile != null) ? tempFile.getHash() : '';
					}));
				}
				else
				{
					var error = mxUtils.bind(this, function (e)
					{
						this.handleError(e, mxResources.get('errorLoadingFile'),
							mxUtils.bind(this, function()
						{
							var tempFile = this.getCurrentFile();
							window.location.hash = (tempFile != null) ? tempFile.getHash() : '';
						}));
					});
					
					id = decodeURIComponent(id.substring(1));
					
					StorageFile.getFileContent(this, id, mxUtils.bind(this, function(data)
					{
						if (data != null)
						{
							this.fileLoaded(new StorageFile(this, data, id));

							if (success != null)
							{
								success();
							}
						}
						else
						{
							error({message: mxResources.get('fileNotFound')});
						}
					}), error);
				}
			}
			else if (file != null)
			{
				// File already loaded
				this.spinner.stop();
				this.fileLoaded(file);

				if (success != null)
				{
					success();
				}
			}
			else if (id.charAt(0) == 'S')
			{
				this.spinner.stop();
				
				this.alert('[Deprecation] #S is no longer supported, go to https://app.diagrams.net/?desc=' + id.substring(1).substring(0, 10), mxUtils.bind(this, function()
				{
					window.location.href = 'https://app.diagrams.net/?desc=' + id.substring(1);
				}));
			}
			else if (id.charAt(0) == 'R')
			{
				// Raw file encoded into URL
				this.spinner.stop();
				var data = decodeURIComponent(id.substring(1));
				
				if (data.charAt(0) != '<')
				{
					data = Graph.decompress(data);
				}
				
				var tempFile = new LocalFile(this, data, (urlParams['title'] != null) ?
					decodeURIComponent(urlParams['title']) : this.defaultFilename, true);
				tempFile.getHash = function()
				{
					return id;
				};
				this.fileLoaded(tempFile);

				if (success != null)
				{
					success();
				}
			}
			else if (id.charAt(0) == 'E') // Embed file
			{
				//Currently we only reload current file. Id is not used!
				var currentFile = this.getCurrentFile();
				
				if (currentFile == null)
				{
					this.handleError({message: mxResources.get('serviceUnavailableOrBlocked')}, mxResources.get('errorLoadingFile'));
				}
				else
				{
					this.remoteInvoke('getDraftFileContent', null, null, mxUtils.bind(this, function(data, desc)
					{
						this.spinner.stop();
						this.fileLoaded(new EmbedFile(this, data, desc));
						
						if (success != null)
						{
							success();
						}
					}), mxUtils.bind(this, function()
					{
						this.handleError({message: mxResources.get('serviceUnavailableOrBlocked')}, mxResources.get('errorLoadingFile'));
					}));
				}
			}
			else if (id.charAt(0) == 'U')
			{
				var url = decodeURIComponent(id.substring(1));
				
				var doFallback = mxUtils.bind(this, function()
				{
					// Fallback for non-public Google Drive files
					if (url.substring(0, 31) == 'https://drive.google.com/uc?id=' &&
						(this.drive != null || typeof window.DriveClient === 'function'))
					{
						this.hideDialog();
						
						var fallback = mxUtils.bind(this, function()
						{
							this.spinner.stop();
							
							if (this.drive != null)
							{
								var tempId = url.substring(31, url.lastIndexOf('&ex'));
								
								this.loadFile('G' + tempId, sameWindow, null, mxUtils.bind(this, function()
								{
									var currentFile = this.getCurrentFile();
									
									if (currentFile != null && this.editor.chromeless && !this.editor.editable)
									{
										currentFile.getHash = function()
										{
											return 'G' + tempId;
										};
										
										window.location.hash = '#' + currentFile.getHash();
									}
									
									if (success != null)
									{
										success();
									}
								}));
								
								return true;
							}
							else
							{
								return false;
							}
						});
						
						if (!fallback() && this.spinner.spin(document.body, mxResources.get('loading')))
						{
							this.addListener('clientLoaded', fallback);
						}
						
						return true;
					}
					else
					{
						return false;
					}
				});
				
				this.loadTemplate(url, mxUtils.bind(this, function(text)
				{
					this.spinner.stop();
					
					if (text != null && text.length > 0)
					{
						var filename = this.defaultFilename;
						
						// Tries to find name from URL with valid extensions
						if (urlParams['title'] == null && urlParams['notitle'] != '1')
						{
							var tmp = url;
							var dot = url.lastIndexOf('.');
							var slash = tmp.lastIndexOf('/');
							
							if (dot > slash && slash > 0)
							{
								tmp = tmp.substring(slash + 1, dot);
								var ext = url.substring(dot);
								
								if (!this.useCanvasForExport && ext == '.png')
								{
									ext = '.drawio';
								}

								if (ext === '.svg' || ext === '.xml' ||
									ext === '.html' || ext === '.png'  ||
									ext === '.drawio')
								{
									filename = tmp + ext;
								}
							}
						}
						
						var tempFile = new LocalFile(this, text, (urlParams['title'] != null) ?
							decodeURIComponent(urlParams['title']) : filename, true);
						tempFile.getHash = function()
						{
							return id;
						};
						
						if (this.fileLoaded(tempFile, true))
						{
							if (success != null)
							{
								success();
							}
						}
						else if (!doFallback())
						{
							this.handleError({message: mxResources.get('fileNotFound')},
								mxResources.get('errorLoadingFile'));
						}
					}
					else if (!doFallback())
					{
						this.handleError({message: mxResources.get('fileNotFound')},
							mxResources.get('errorLoadingFile'));
					}
				}), mxUtils.bind(this, function()
				{
					if (!doFallback())
					{
						this.spinner.stop();
						this.handleError({message: mxResources.get('fileNotFound')},
							mxResources.get('errorLoadingFile'));
					}
				}), (urlParams['template-filename'] != null) ?
					decodeURIComponent(urlParams['template-filename']) : null);
			}
			else
			{
				// Google Drive files are handled as default file types
				var peer = null;
				
				if (id.charAt(0) == 'G')
				{
					peer = this.drive;
				}
				else if (id.charAt(0) == 'D')
				{
					peer = this.dropbox;
				}
				else if (id.charAt(0) == 'W')
				{
					peer = this.oneDrive;
				}
				else if (id.charAt(0) == 'H')
				{
					peer = this.gitHub;
				}
				else if (id.charAt(0) == 'A')
				{
					peer = this.gitLab;
				}
				else if (id.charAt(0) == 'T')
				{
					peer = this.trello;
				}
				
				if (peer == null)
				{
					this.handleError({message: mxResources.get('serviceUnavailableOrBlocked')},
						mxResources.get('errorLoadingFile'), mxUtils.bind(this, function()
					{
						var currentFile = this.getCurrentFile();
						window.location.hash = (currentFile != null) ? currentFile.getHash() : '';
					}));
				}
				else
				{
					var peerChar = id.charAt(0);
					id = decodeURIComponent(id.substring(1));

					peer.getFile(id, mxUtils.bind(this, function(file)
					{
						this.spinner.stop();
						this.fileLoaded(file);
						var currentFile = this.getCurrentFile();
						
						if (currentFile == null)
						{
							window.location.hash = '';
							this.showSplash();
						}
						else if (this.editor.chromeless && !this.editor.editable)
						{
							// Keeps ID even for converted files in chromeless mode for refresh to work
							currentFile.getHash = function()
							{
								return peerChar + id;
							};
							
							window.location.hash = '#' + currentFile.getHash();
						}
						else if (file == currentFile && file.getMode() == null)
						{
							// Shows a warning if a copy was opened which happens
							// eg. for .png files in IE as they cannot be written
							var status = mxResources.get('copyCreated');
							this.editor.setStatus('<div title="'+ status +
								'" class="geStatusAlert">' + status + '</div>');
						}
						
						if (success != null)
						{
							success();
						}
					}), mxUtils.bind(this, function(resp)
					{
						// Makes sure the file does not save the invalid UI model and overwrites anything important
						if (window.console != null && resp != null)
						{
							console.log('error in loadFile:', id, resp);
						}

						var fn = mxUtils.bind(this, function()
						{
							var currentFile = this.getCurrentFile();
							
							if (currentFile == null)
							{
								window.location.hash = '';
								this.showSplash();
							}
							else
							{
								window.location.hash = '#' + currentFile.getHash();
							}
						});

						if (resp == null || resp.name != 'AbortError')
						{
							this.handleError(resp, (resp != null) ? mxResources.get('errorLoadingFile') : null,
								fn, null, null, '#' + peerChar + id);
						}
						else
						{
							fn();
						}
					}));
				}
			}
		}
	});
	
	var currentFile = this.getCurrentFile();
	
	var fn = mxUtils.bind(this, function()
	{
		if (force || currentFile == null || !currentFile.isModified())
		{
			fn2();
		}
		else
		{
			this.confirm(mxResources.get('allChangesLost'), mxUtils.bind(this, function()
			{
				if (currentFile != null)
				{
					window.location.hash = currentFile.getHash();
				}
			}), fn2, mxResources.get('cancel'), mxResources.get('discardChanges'));
		}
	});
	
	if (id == null || id.length == 0)
	{
		fn();
	}
	else if (currentFile != null && !sameWindow)
	{
		this.showDialog(new PopupDialog(this, this.getUrl() + '#' + id,
			null, fn).container, 320, 140, true, true);
	}
	else
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
App.prototype.getLibraryStorageHint = function(file)
{
	var tip = file.getTitle();
	
	if (file.constructor != LocalLibrary)
	{
		tip += '\n' + file.getHash();
	}
	
	if (file.constructor == DriveLibrary)
	{
		tip += ' (' + mxResources.get('googleDrive') + ')';
	}
	else if (file.constructor == GitHubLibrary)
	{
		tip += ' (' + mxResources.get('github') + ')';
	}
	else if (file.constructor == TrelloLibrary)
	{
		tip += ' (' + mxResources.get('trello') + ')';
	}
	else if (file.constructor == DropboxLibrary)
	{
		tip += ' (' + mxResources.get('dropbox') + ')';
	}
	else if (file.constructor == OneDriveLibrary)
	{
		tip += ' (' + mxResources.get('oneDrive') + ')';
	}
	else if (file.constructor == StorageLibrary)
	{
		tip += ' (' + mxResources.get('browser') + ')';
	}
	else if (file.constructor == LocalLibrary)
	{
		tip += ' (' + mxResources.get('device') + ')';
	}

	return tip;
};

/**
 * Updates action states depending on the selection.
 */
App.prototype.restoreLibraries = function()
{
	var checked = [];

	function addLibs(libs)
	{
		for (var i = 0; i < libs.length; i++)
		{
			if (libs[i] != '' && mxUtils.indexOf(
				checked, libs[i]) < 0)
			{
				checked.push(libs[i]);
			}
		}
	};

	addLibs(mxSettings.getCustomLibraries());
	addLibs((urlParams['clibs'] || '').split(';'));
	this.loadLibraries(checked);
};

/**
 * Updates action states depending on the selection.
 */
App.prototype.loadLibraries = function(libs, done)
{
	if (this.sidebar != null)
	{
		if (this.loadedLibraries == null)
		{
			this.loadedLibraries = new Object();
		}
		
		// Ignores this library next time
		var ignore = mxUtils.bind(this, function(id, keep)
		{
			if (!keep)
			{
				mxSettings.removeCustomLibrary(id);
			}

			delete this.loadedLibraries[id];
		});

		var waiting = 0;
		var files = [];
		var idx = (libs.length > 0 && libs[0] == 'L.scratchpad') ? 1 : 0;

		// Loads in order of libs array
		var checkDone = mxUtils.bind(this, function()
		{
			if (waiting == 0)
			{
				if (libs != null)
				{
					for (var i = libs.length - 1; i >= 0; i--)
					{
						if (files[i] != null)
						{
							this.loadLibrary(files[i], i <= idx);
						}
					}
				}
				
				if (done != null)
				{
					done();
				}
			}
		});
		
		if (libs != null)
		{
			for (var i = 0; i < libs.length; i++)
			{
				var name = encodeURIComponent(decodeURIComponent(libs[i]));
				
				(mxUtils.bind(this, function(id, index)
				{
					if (id != null && id.length > 0 && this.loadedLibraries[id] == null &&
						this.sidebar.palettes[id] == null)
					{
						// Waits for all libraries to load
						this.loadedLibraries[id] = true;
						waiting++;
						
						var onload = mxUtils.bind(this, function(file)
						{
							files[index] = file;
							waiting--;
							checkDone();
						});
						
						var onerror = mxUtils.bind(this, function(keep)
						{
							ignore(id, keep);
							waiting--;
							checkDone();
						});
						
						var service = id.substring(0, 1);
						
						if (service == 'L')
						{
							if (isLocalStorage || mxClient.IS_CHROMEAPP)
							{
								// Make asynchronous for barrier to work
								window.setTimeout(mxUtils.bind(this, function()
								{
									try
									{
										var name = decodeURIComponent(id.substring(1));
										
										StorageFile.getFileContent(this, name, mxUtils.bind(this, function(xml)
										{
											if (name == '.scratchpad' && xml == null)
											{
												xml = this.emptyLibraryXml;
											}
											
											if (xml != null)
											{
												onload(new StorageLibrary(this, xml, name));
											}
											else
											{
												onerror();
											}
										}), onerror);
									}
									catch (e)
									{
										onerror();
									}
								}), 0);
							}
						}
						else if (service == 'U')
						{
							var url = decodeURIComponent(id.substring(1));
							
							if (!this.isOffline())
							{
								this.loadTemplate(url, mxUtils.bind(this, function(text)
								{
									if (text != null && text.length > 0)
									{
										// LATER: Convert mxfile to mxlibrary using code from libraryLoaded
										onload(new UrlLibrary(this, text, url));
									}
									else
									{
										onerror();
									}
								}), function()
								{
									onerror();
								}, null, true);
							}
						}
						else if (service == 'R')
						{
							var libDesc = decodeURIComponent(id.substring(1));
							
							try
							{
								libDesc = JSON.parse(libDesc);
								var libObj = {
									id: libDesc[0], 
			               			title: libDesc[1], 
			               			downloadUrl: libDesc[2]
								}
								
								this.remoteInvoke('getFileContent', [libObj.downloadUrl], null, mxUtils.bind(this, function(libContent)
								{
									try
									{
										onload(new RemoteLibrary(this, libContent, libObj));
									}
									catch (e)
									{
										onerror();
									}
								}), function()
								{
									onerror();
								});
							}
							catch (e)
							{
								onerror();
							}
						}
						else if (service == 'S' && this.loadDesktopLib != null)
						{
							try
							{
								this.loadDesktopLib(decodeURIComponent(id.substring(1)), function(desktopLib)
								{
									onload(desktopLib);
								}, onerror);
							}
							catch (e)
							{
								onerror();
							}
						}
						else
						{
							var peer = null;
							
							if (service == 'G')
							{
								if (this.drive != null && this.drive.user != null)
								{
									peer = this.drive;
								}
							}
							else if (service == 'H')
							{
								if (this.gitHub != null && this.gitHub.getUser() != null)
								{
									peer = this.gitHub;
								}
							}
							else if (service == 'T')
							{
								if (this.trello != null && this.trello.isAuthorized())
								{
									peer = this.trello;
								}
							}
							else if (service == 'D')
							{
								if (this.dropbox != null && this.dropbox.getUser() != null)
								{
									peer = this.dropbox;
								}
							}
							else if (service == 'W')
							{
								if (this.oneDrive != null && this.oneDrive.getUser() != null)
								{
									peer = this.oneDrive;
								}
							}
							
							if (peer != null)
							{
								peer.getLibrary(decodeURIComponent(id.substring(1)), mxUtils.bind(this, function(file)
								{
									try
									{
										onload(file);
									}
									catch (e)
									{
										onerror();
									}
								}), function(resp)
								{
									onerror();
								});
							}
							else
							{
								onerror(true);
							}
						}
					}
				}))(name, i);
			}
			
			checkDone();
		}
		else
		{
			checkDone();
		}
	}
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
App.prototype.updateButtonContainer = function()
{
	if (this.buttonContainer != null)
	{
		var file = this.getCurrentFile();
		
		if (urlParams['embed'] == '1' && Editor.currentTheme != 'simple' &&
			Editor.currentTheme != 'sketch')
		{
			this.buttonContainer.style.paddingRight = urlParams['atlas'] == '1' ? '32px' : '8px';
		}

		// Comments
		if (this.commentsSupported() && Editor.currentTheme != 'simple' &&
			Editor.currentTheme != 'atlas' &&
			Editor.currentTheme != 'sketch')
		{
			if (this.commentButton == null)
			{
				this.commentButton = document.createElement('a');
				this.commentButton.setAttribute('title', mxResources.get('comments'));
				this.commentButton.className = 'geToolbarButton geAdaptiveAsset';
				this.commentButton.style.cssText = 'display:inline-block;position:relative;box-sizing:border-box;' +
					'width:24px;height:24px;background-size:24px 24px;background-position:center center;cursor:pointer;' +
					'background-repeat:no-repeat;background-image:url(' + Editor.commentImage + ');';
				
				mxEvent.addListener(this.commentButton, 'click', mxUtils.bind(this, function()
				{
					this.actions.get('comments').funct();
				}));

				if (this.userElement != null && this.userElement.parentNode == this.buttonContainer)
				{
					this.buttonContainer.insertBefore(this.commentButton, this.userElement);
				}
				else if (this.shareButton != null && this.shareButton.parentNode == this.buttonContainer)
				{
					this.buttonContainer.insertBefore(this.commentButton, this.shareButton);
				}
				else
				{
					this.buttonContainer.appendChild(this.commentButton);
				}
			}
		}
		else if (this.commentButton != null)
		{
			this.commentButton.parentNode.removeChild(this.commentButton);
			this.commentButton = null;
		}
		
		// Share
		if (this.getServiceName() == 'draw.io' &&
			urlParams['embed'] != '1' &&
			!this.isStandaloneApp())
		{
			if (file != null)
			{
				if (this.shareButton == null && Editor.currentTheme != 'atlas')
				{
					this.shareButton = document.createElement('button');
					this.shareButton.className = 'geBtn geShareBtn';
					this.shareButton.style.display = 'inline-block';
					this.shareButton.style.position = 'relative';
					this.shareButton.style.backgroundImage = 'none';
					this.shareButton.style.padding = '2px 10px 0 10px';
					this.shareButton.style.marginTop = '-10px';
					this.shareButton.style.cursor = 'pointer';
					this.shareButton.style.height = '32px';
					this.shareButton.style.minWidth = '0px';
					this.shareButton.style.top = '-2px';
					this.shareButton.setAttribute('title', mxResources.get('share'));
					
					var icon = document.createElement('img');
					icon.className = 'geInverseAdaptiveAsset';
					icon.setAttribute('src', this.shareImage);
					icon.setAttribute('align', 'absmiddle');
					icon.style.marginRight = '4px';
					icon.style.marginTop = '-3px';
					this.shareButton.appendChild(icon);
					
					if (Editor.currentTheme != 'atlas')
					{
						icon.style.filter = 'invert(100%)';
					}
					
					mxUtils.write(this.shareButton, mxResources.get('share'));
					
					mxEvent.addListener(this.shareButton, 'click', mxUtils.bind(this, function()
					{
						this.actions.get('share').funct();
					}));
					
					this.buttonContainer.appendChild(this.shareButton);
				}

				if (this.shareButton != null)
				{
					this.shareButton.style.display = (Editor.currentTheme == 'simple' ||
						Editor.currentTheme == 'sketch' || Editor.currentTheme == 'min')
						? 'none' : 'inline-block';
					
					// Hides parent element if empty for flex layout gap to work
					if (Editor.currentTheme == 'simple' ||
						Editor.currentTheme == 'sketch')
					{
						this.shareButton.parentNode.style.display =
							(this.shareButton.parentNode.clientWidth == 0)
							? 'none' : '';
					}
				}
			}
			else if (this.shareButton != null)
			{
				this.shareButton.parentNode.removeChild(this.shareButton);
				this.shareButton = null;
			}

			// Fetch notifications
			if (urlParams['extAuth'] != '1' && 
				Editor.currentTheme != 'atlas') //Disable notification with external auth (e.g, Teams app)
			{
				this.fetchAndShowNotification('online', this.mode);
			}
		}
		else
		{
			if (urlParams['notif'] != null) //Notif for embed mode
			{
				this.fetchAndShowNotification(urlParams['notif']);
			}

			// Hides button container if empty for flex layout gap to work
			if (this.isStandaloneApp() &&
				(Editor.currentTheme == 'simple' ||
				Editor.currentTheme == 'sketch'))
			{
				this.buttonContainer.style.display =
					(this.buttonContainer.clientWidth == 0)
					? 'none' : '';
			}
		}

		// Updates comments button CSS
		if (this.commentButton != null)
		{
			this.commentButton.style.marginRight = '';
			this.commentButton.style.top = '';

			if (Editor.currentTheme != 'simple' &&
				Editor.currentTheme != 'sketch' &&
				Editor.currentTheme != 'min' &&
				urlParams['embed'] != '1')
			{
				this.commentButton.style.top = '-6px';
			}
			else if (urlParams['embed'] == '1')
			{
				this.commentButton.style.marginRight = '4px';
			}
		}

		// Updates notification button CSS
		if (this.notificationBtn != null)
		{
			if (Editor.currentTheme != 'simple' &&
				Editor.currentTheme != 'sketch' &&
				Editor.currentTheme != 'atlas' &&
				Editor.currentTheme != 'min' &&
				urlParams['embed'] != '1')
			{
				this.notificationBtn.style.marginRight = '4px';
				this.notificationBtn.style.marginTop = '-12px';
			}
			else
			{
				this.notificationBtn.style.marginRight = '';
				this.notificationBtn.style.marginTop = '';
			}
		}
	}
};

/**
 * For testing use notifs = [{timestamp: Date.now(), content: 'Test'}]
 */
App.prototype.fetchAndShowNotification = function(target, subtarget)
{
	if (this.fetchingNotif)
	{
		return;	
	}
	
	target = target || 'online';
	var cachedNotifKey = '.notifCache';
	var cachedNotif = null;
	
	var processNotif = mxUtils.bind(this, function(notifs)
	{
		notifs = notifs.filter(function(notif)
		{
			return !notif.targets || notif.targets.indexOf(target) > -1 || 
						(subtarget != null && notif.targets.indexOf(subtarget) > -1);
		});
		
		var lsReadFlag = target + 'NotifReadTS';
		var lastRead = isLocalStorage ? parseInt(localStorage.getItem(lsReadFlag)) : true;
				
		for (var i = 0; i < notifs.length; i++)
		{
			notifs[i].isNew = (!lastRead || notifs[i].timestamp > lastRead);
		}
		
		this.showNotification(notifs, lsReadFlag);
	});
	
	try
	{
		if (isLocalStorage)
		{
			cachedNotif = JSON.parse(localStorage.getItem(cachedNotifKey));
		}
	}
	catch(e) {} //Ignore
	
	if (cachedNotif == null || cachedNotif.ts + 24 * 60 * 60 * 1000 < Date.now()) //Cache for one day
	{
		this.fetchingNotif = true;
		//Fetch all notifications and store them, then filter client-side
		mxUtils.get(NOTIFICATIONS_URL, mxUtils.bind(this, function(req)
		{
			if (req.getStatus() >= 200 && req.getStatus() <= 299)
			{
				try
				{
					var notifs = JSON.parse(req.getText());
					
					//Process and sort
					notifs.sort(function(a, b)
					{
						return b.timestamp - a.timestamp;
					});

					if (isLocalStorage)
					{
						localStorage.setItem(cachedNotifKey, JSON.stringify({ts: Date.now(), notifs: notifs}));
					}
					
					this.fetchingNotif = false;	
					processNotif(notifs);
				}
				catch(e)
				{
					// ignore
				}
			}
		}));
	}
	else
	{
		processNotif(cachedNotif.notifs);
	}
};

App.prototype.showNotification = function(notifs, lsReadFlag)
{
	var newCount = notifs.length;

	if (Editor.currentTheme == 'min' || Editor.currentTheme == 'simple')
	{
		newCount = 0;

		for (var i = 0; i < notifs.length; i++)
		{
			if (notifs[i].isNew)
			{
				newCount++;
			}
		}
	}
	
	if (newCount == 0)
	{
		if (this.notificationBtn != null)
		{
			this.notificationBtn.style.display = 'none';
			this.editor.fireEvent(new mxEventObject('statusChanged'));
		}
		
		return;
	}
	
	function shouldAnimate(newNotif)
	{
		var countEl = document.querySelector('.geNotification-count');
		
		if (countEl == null)
		{
			return;
		}
		
		countEl.innerHTML = newNotif;
		countEl.style.display = newNotif == 0? 'none' : '';
		var notifBell = document.querySelector('.geNotification-bell');
		notifBell.style.animation = newNotif == 0? 'none' : '';
		notifBell.className = 'geNotification-bell' + (newNotif == 0? ' geNotification-bellOff' : '');
		document.querySelector('.geBell-rad').style.animation = newNotif == 0? 'none' : '';
	}
	
	var markAllAsRead = mxUtils.bind(this, function()
	{
		this.notificationWin.style.display = 'none';
		var unread = this.notificationWin.querySelectorAll('.circle.active');
		
		for (var i = 0; i < unread.length; i++)
		{
			unread[i].className = 'circle';
		}
		
		if (isLocalStorage && notifs[0])
		{
			localStorage.setItem(lsReadFlag, notifs[0].timestamp);
		}
	});
	
	if (this.notificationBtn == null)
	{
		this.notificationBtn = document.createElement('div');
		this.notificationBtn.className = 'geNotification-box';

		var notifCount = document.createElement('span');
		notifCount.className = 'geNotification-count';
		this.notificationBtn.appendChild(notifCount);
		this.notifCount = notifCount;
		
		var notifBell = document.createElement('div');
		notifBell.className = 'geNotification-bell';
		var bellPart = document.createElement('span');
		bellPart.className = 'geBell-top';
		notifBell.appendChild(bellPart);
		var bellPart = document.createElement('span');
		bellPart.className = 'geBell-middle';
		notifBell.appendChild(bellPart);
		var bellPart = document.createElement('span');
		bellPart.className = 'geBell-bottom';
		notifBell.appendChild(bellPart);
		var bellPart = document.createElement('span');
		bellPart.className = 'geBell-rad';
		notifBell.appendChild(bellPart);
		this.notificationBtn.appendChild(notifBell);
		
		// Add as first child such that it is the left-most one
		this.buttonContainer.insertBefore(this.notificationBtn, this.buttonContainer.firstChild);
		this.notificationWin = document.createElement('div');
		this.notificationWin.className = 'geNotifPanel';
		this.notificationWin.style.display = 'none';
		document.body.appendChild(this.notificationWin);
		
		var winHeader = document.createElement('div');
		winHeader.className = 'header';
		var winTitle = document.createElement('span');
		winTitle.className = 'title';
		winTitle.textContent = mxResources.get('notifications');
		winHeader.appendChild(winTitle);
		var winClose = document.createElement('span');
		winClose.className = 'closeBtn';
		winClose.textContent = 'x';
		winHeader.appendChild(winClose);
		this.notificationWin.appendChild(winHeader);
		
		var winBody = document.createElement('div');
		winBody.className = 'notifications clearfix';
		var notifList = document.createElement('div');
		notifList.setAttribute('id', 'geNotifList');
		notifList.style.position = 'relative';
		winBody.appendChild(notifList);
		this.notificationWin.appendChild(winBody);
		
		mxEvent.addListener(this.notificationBtn, 'click', mxUtils.bind(this, function()
		{
			if (this.notificationWin.style.display == 'none')
			{
				this.notificationWin.style.display = '';
				document.querySelector('.notifications').scrollTop = 0;
				var r = this.notificationBtn.getBoundingClientRect();
				this.notificationWin.style.top = (r.top + this.notificationBtn.clientHeight) + 'px';
				this.notificationWin.style.left = (r.right - this.notificationWin.clientWidth) + 'px';
				shouldAnimate(0); //Stop animation once notifications are open
			}
			else
			{
				markAllAsRead();
			}
		}));
		
		mxEvent.addListener(winClose, 'click', markAllAsRead);
	}
	else
	{
		this.notificationBtn.style.display = ''; //In case it was hidden
	}
		
	var newNotif = 0;
	var notifListEl = document.getElementById('geNotifList');
	
	if (notifListEl == null)
	{
		return; //This shouldn't happen and no meaning of continuing
	}
	else
	{
		notifListEl.innerHTML = '<div class="line"></div>';
		
		for (var i = 0; i < notifs.length; i++)
		{
			(function(editorUi, notif)
			{
				if (notif.isNew)
				{
					newNotif++;
				}
				
				var notifEl = document.createElement('div');
				notifEl.className = 'notification';
				var ts = new Date(notif.timestamp);
				var str = editorUi.timeSince(ts);
		
				if (str == null)
				{
					str = mxResources.get('lessThanAMinute');
				}
				
				notifEl.innerHTML = '<div class="circle' + (notif.isNew? ' active' : '') + '"></div><span class="time">' + 
										mxUtils.htmlEntities(mxResources.get('timeAgo', [str], '{1} ago')) + '</span>' + 
										'<p>' + mxUtils.htmlEntities(notif.content) + '</p>';
				if (notif.link)
				{
					mxEvent.addListener(notifEl, 'click', function()
					{
						window.open(notif.link, 'notifWin');
					});
				}
				
				notifListEl.appendChild(notifEl);
			})(this, notifs[i]);
		}
	}
	
	shouldAnimate(newNotif);
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
App.prototype.save = function(name, done)
{
	var file = this.getCurrentFile();
	
	if (file != null && this.spinner.spin(document.body, mxResources.get('saving')))
	{
		var onerror = mxUtils.bind(this, function(e)
		{
			this.handleError(e);
		});

		this.createTimeout(3 * this.timeout, mxUtils.bind(this, function(timeout)
		{
			this.editor.setStatus('');
			
			if (this.editor.graph.isEditing())
			{
				this.editor.graph.stopEditing();
			}
			
			var success = mxUtils.bind(this, function()
			{
				if (timeout.clear())
				{
					file.handleFileSuccess(true);

					if (done != null)
					{
						done();
					}
				}
			});
			
			var error = mxUtils.bind(this, function(err)
			{
				if (timeout.clear())
				{
					if (file.isModified())
					{
						Editor.addRetryToError(err, mxUtils.bind(this, function()
						{
							this.save(name, done);
						}));
					}
					
					file.handleFileError(err, err == null || err.name != 'AbortError');
				}
			});
			
			try
			{
				if (name == file.getTitle())
				{
					file.save(true, success, error);
				}
				else
				{
					file.saveAs(name, success, error)
				}
			}
			catch (err)
			{
				error(err);
			}
		}), onerror);
	}
};

/**
 * Hook for subclassers.
 */
App.prototype.getExtensionForService = function(name)
{
	var service = this.getServiceForName(name);

	return service != null ? service.extension : '.drawio';
};

/**
 * Hook for subclassers.
 */
App.prototype.getServiceForName = function(name)
{
	if (name == App.MODE_GOOGLE)
	{
		return this.drive;
	}
	else if (name == App.MODE_ONEDRIVE)
	{
		return this.oneDrive;
	}
	else if (name == App.MODE_DROPBOX)
	{
		return this.dropbox;
	}
	else if (name == App.MODE_GITHUB)
	{
		return this.gitHub;
	}
	else if (name == App.MODE_GITLAB)
	{
		return this.gitLab;
	}
	else if (name == App.MODE_TRELLO)
	{
		return this.trello;
	}

	return null;
};

/**
 * Hook for subclassers.
 */
App.prototype.getTitleForService = function(name)
{
	if (name == App.MODE_GOOGLE)
	{
		return mxResources.get('googleDrive');
	}
	else if (name == App.MODE_ONEDRIVE)
	{
		return mxResources.get('oneDrive');
	}
	else
	{
		return EditorUi.prototype.getTitleForService.apply(this, arguments);
	}
};

/**
 * Invokes callback with null if mode does not support folder or not null
 * if a valid folder was chosen for a mode that supports it. No callback
 * is made if no folder was chosen for a mode that supports it.
 */
App.prototype.pickFolder = function(mode, fn, enabled, direct, force, returnPickerValue)
{
	enabled = (enabled != null) ? enabled : true;
	var resume = this.spinner.pause();
	
	if (enabled && mode == App.MODE_GOOGLE && this.drive != null)
	{
		// Shows a save dialog
		this.drive.pickFolder(mxUtils.bind(this, function(evt)
		{
			resume();
			
			if (evt.action == google.picker.Action.PICKED)
			{
				var folderId = null;
				
				if (evt.docs != null && evt.docs.length > 0 && evt.docs[0].type == 'folder')
				{
					folderId = evt.docs[0].id;
				}
				
				fn((returnPickerValue) ? evt : folderId);
			}
		}), force);
	}
	else if (enabled && mode == App.MODE_ONEDRIVE && this.oneDrive != null)
	{
		this.oneDrive.pickFolder(mxUtils.bind(this, function(files)
		{
			var folderId = null;
			resume();
			
			if (files != null && files.value != null && files.value.length > 0)
			{
				folderId = OneDriveFile.prototype.getIdOf(files.value[0]);
        		fn((returnPickerValue) ? files : folderId);
			}
		}), direct);
	}
	else if (enabled && mode == App.MODE_GITHUB && this.gitHub != null)
	{
		this.gitHub.pickFolder(mxUtils.bind(this, function(folderPath)
		{
			resume();
			fn(folderPath);
		}));
	}
	else if (enabled && mode == App.MODE_GITLAB && this.gitLab != null)
	{
		this.gitLab.pickFolder(mxUtils.bind(this, function(folderPath)
		{
			resume();
			fn(folderPath);
		}));
	}
	else if (enabled && mode == App.MODE_TRELLO && this.trello != null)
	{
		this.trello.pickFolder(mxUtils.bind(this, function(cardId)
		{
			resume();
			fn(cardId);
		}));
	}
	else
	{
		EditorUi.prototype.pickFolder.apply(this, arguments);
	}
};

/**
 * 
 */
App.prototype.exportFile = function(data, filename, mimeType, base64Encoded, mode, folderId)
{
	if (mode == App.MODE_DROPBOX)
	{
		if (this.dropbox != null && this.spinner.spin(document.body, mxResources.get('saving')))
		{
			// LATER: Add folder picker
			this.dropbox.insertFile(filename, (base64Encoded) ? this.base64ToBlob(data, mimeType) :
				data, mxUtils.bind(this, function()
			{
				this.spinner.stop();
			}), mxUtils.bind(this, function(resp)
			{
				this.spinner.stop();
				this.handleError(resp);
			}));
		}
	}
	else if (mode == App.MODE_GOOGLE)
	{
		if (this.drive != null && this.spinner.spin(document.body, mxResources.get('saving')))
		{
			this.drive.insertFile(filename, data, folderId, mxUtils.bind(this, function(resp)
			{
				// TODO: Add callback with url param for clickable status message
				// "File exported. Click here to open folder."
//				this.editor.setStatus('<div class="geStatusMessage">' +
//					mxResources.get('saved') + '</div>');
//				
//				// Installs click handler for opening
//				if (this.statusContainer != null)
//				{
//					var links = this.statusContainer.getElementsByTagName('div');
//					
//					if (links.length > 0)
//					{
//						links[0].style.cursor = 'pointer';
//
//						mxEvent.addListener(links[0], 'click', mxUtils.bind(this, function()
//						{
//							if (resp != null && resp.id != null)
//							{
//								window.open('https://drive.google.com/open?id=' + resp.id);
//							}
//						}));
//					}
//				}
				
				this.spinner.stop();
			}), mxUtils.bind(this, function(resp)
			{
				this.spinner.stop();
				this.handleError(resp);
			}), mimeType, base64Encoded);
		}
	}
	else if (mode == App.MODE_ONEDRIVE)
	{
		if (this.oneDrive != null && this.spinner.spin(document.body, mxResources.get('saving')))
		{
			// KNOWN: OneDrive does not show .svg extension
			this.oneDrive.insertFile(filename, (base64Encoded) ? this.base64ToBlob(data, mimeType) :
				data, mxUtils.bind(this, function()
			{
				this.spinner.stop();
			}), mxUtils.bind(this, function(resp)
			{
				this.spinner.stop();
				this.handleError(resp);
			}), false, folderId);
		}
	}
	else if (mode == App.MODE_GITHUB)
	{
		if (this.gitHub != null && this.spinner.spin(document.body, mxResources.get('saving')))
		{
			// Must insert file as library to force the file to be written
			this.gitHub.insertFile(filename, data, mxUtils.bind(this, function()
			{
				this.spinner.stop();
			}), mxUtils.bind(this, function(resp)
			{
				this.spinner.stop();
				this.handleError(resp);
			}), true, folderId, base64Encoded);
		}
	}
	else if (mode == App.MODE_GITLAB)
	{
		if (this.gitHub != null && this.spinner.spin(document.body, mxResources.get('saving')))
		{
			// Must insert file as library to force the file to be written
			this.gitLab.insertFile(filename, data, mxUtils.bind(this, function()
			{
				this.spinner.stop();
			}), mxUtils.bind(this, function(resp)
			{
				this.spinner.stop();
				this.handleError(resp);
			}), true, folderId, base64Encoded);
		}
	}
	else if (mode == App.MODE_TRELLO)
	{
		if (this.trello != null && this.spinner.spin(document.body, mxResources.get('saving')))
		{
			this.trello.insertFile(filename, (base64Encoded) ? this.base64ToBlob(data, mimeType) :
				data, mxUtils.bind(this, function()
			{
				this.spinner.stop();
			}), mxUtils.bind(this, function(resp)
			{
				this.spinner.stop();
				this.handleError(resp);
			}), false, folderId);
		}
	}
	else if (mode == App.MODE_BROWSER)
	{
		var fn = mxUtils.bind(this, function()
		{
			localStorage.setItem(filename, data);
		});
		
		if (localStorage.getItem(filename) == null)
		{
			fn();
		}
		else
		{
			this.confirm(mxResources.get('replaceIt', [filename]), fn);
		}
	}
};

/**
 * Translates this point by the given vector.
 * 
 * @param {number} dx X-coordinate of the translation.
 * @param {number} dy Y-coordinate of the translation.
 */
App.prototype.descriptorChanged = function()
{
	var file = this.getCurrentFile();
	
	if (file != null)
	{
		if (this.fname != null)
		{
			this.fnameWrapper.style.display = 'block';
			this.fname.innerText = '';
			var filename = (file.getTitle() != null) ? file.getTitle() : this.defaultFilename;
			mxUtils.write(this.fname, filename);
			this.fname.setAttribute('title', filename + ' - ' + mxResources.get('rename'));
		}
		
		var graph = this.editor.graph;
		var editable = file.isEditable() && !file.invalidChecksum;
		
		if (graph.isEnabled() && !editable)
		{
			graph.reset();
		}
		
		graph.setEnabled(editable);
		
		// Ignores title and hash for revisions
		if (urlParams['rev'] == null)
		{
			this.updateDocumentTitle();
			var newHash = file.getHash();
			
			if (newHash.length > 0)
			{
				window.location.hash = newHash;
				this.updateHashObject();
			}
			else if (window.location.hash.length > 0)
			{
				window.location.hash = '';
			}
		}
	}
	
	this.updateUi();
	
	// Refresh if editable state has changed
	if (this.format != null && (file == null ||
		this.fileEditable != file.isEditable()) &&
		this.editor.graph.isSelectionEmpty())
	{
		this.format.refresh();
		this.fileEditable = (file != null) ? file.isEditable() : null;
	}
	
	this.fireEvent(new mxEventObject('fileDescriptorChanged', 'file', file));
};

/**
 * Adds the listener for automatically saving the diagram for local changes.
 */
App.prototype.showAuthDialog = function(peer, showRememberOption, fn, closeFn)
{
	var resume = this.spinner.pause();
	
	this.showDialog(new AuthDialog(this, peer, showRememberOption, mxUtils.bind(this, function(remember)
	{
		try
		{
			if (fn != null)
			{
				fn(remember, mxUtils.bind(this, function()
				{
					this.hideDialog();
					resume();
				}));
			}
		}
		catch (e)
		{
			this.editor.setStatus(mxUtils.htmlEntities(e.message));
		}
	})).container, 300, (showRememberOption) ? 180 : 140, true, true, mxUtils.bind(this, function(cancel)
	{
		if (closeFn != null)
		{
			closeFn(cancel);
		}
		
		if (cancel && this.getCurrentFile() == null && this.dialog == null)
		{
			this.showSplash();
		}
	}));
};

/**
 * Checks if the client is authorized and calls the next step. The optional
 * readXml argument is used for import. Default is false. The optional
 * readLibrary argument is used for reading libraries. Default is false.
 */
App.prototype.convertFile = function(url, filename, mimeType, extension, success, error, executeRequest, headers)
{
	var name = filename;
	
	// SVG file extensions are valid and needed for image import
	if (!/\.svg$/i.test(name))
	{
		name = name.substring(0, filename.lastIndexOf('.')) + extension;
	}
	
	var gitHubUrl = false;
	
	if (this.gitHub != null && url.substring(0, this.gitHub.baseUrl.length) == this.gitHub.baseUrl)
	{
		gitHubUrl = true;
	}
	
	// Workaround for wrong binary response with VSD(X) & VDX files
	if (/\.v(dx|sdx?)$/i.test(filename) && Graph.fileSupport && new XMLHttpRequest().upload &&
		typeof new XMLHttpRequest().responseType === 'string')
	{
		var req = new XMLHttpRequest();
		req.open('GET', url, true);
		
		if (!gitHubUrl)
		{
			req.responseType = 'blob';
		}
		
		if (headers)
		{
			for (var key in headers)
			{
				req.setRequestHeader(key, headers[key]);
			}
		}
		
		req.onload = mxUtils.bind(this, function()
		{
			if (req.status >= 200 && req.status <= 299)
			{
				var blob = null;
				
				if (gitHubUrl)
				{
					var file = JSON.parse(req.responseText);
					blob = this.base64ToBlob(file.content, 'application/octet-stream');
				}
				else
				{
					blob = new Blob([req.response], {type: 'application/octet-stream'});
				}
				
				this.importVisio(blob, mxUtils.bind(this, function(xml)
				{
					success(new LocalFile(this, xml, name, true));
				}), error, filename)
			}
			else if (error != null)
			{
				error({message: mxResources.get('errorLoadingFile')});
			}
		});

		req.onerror = error;
		req.send();
	}
	else
	{
		var handleData = mxUtils.bind(this, function(data)
		{
			try
			{
				if (/\.pdf$/i.test(filename))
				{
					var temp = Editor.extractGraphModelFromPdf(data);
						
					if (temp != null && temp.length > 0)
					{
						success(new LocalFile(this, temp, name, true));
					}
				}
				else if (/\.png$/i.test(filename))
				{
					var temp = this.extractGraphModelFromPng(data);
					
					if (temp != null)
					{
						success(new LocalFile(this, temp, name, true));
					}
					else
					{
						success(new LocalFile(this, data, filename, true));
					}
				}
				else if (Graph.fileSupport && new XMLHttpRequest().upload && this.isRemoteFileFormat(data, url))
				{
					this.parseFileData(data, mxUtils.bind(this, function(xhr)
					{
						if (xhr.readyState == 4)
						{
							if (xhr.status >= 200 && xhr.status <= 299)
							{
								success(new LocalFile(this, xhr.responseText, name, true));
							}
							else if (error != null)
							{
								error({message: mxResources.get('errorLoadingFile')});
							}
						}
					}), filename);
				}
				else
				{
					success(new LocalFile(this, data, name, true));
				}
			}
			catch (e)
			{
				if (error != null)
				{
					error(e);
				}
			}
		});

		var binary = /\.png$/i.test(filename) || /\.jpe?g$/i.test(filename) ||
		 	/\.pdf$/i.test(filename) || (mimeType != null &&
		 	mimeType.substring(0, 6) == 'image/');
		
		// NOTE: Cannot force non-binary request via loadUrl so needs separate
		// code as decoding twice on content with binary data did not work
		if (gitHubUrl)
		{
			mxUtils.get(url, mxUtils.bind(this, function(req)
			{
				if (req.getStatus() >= 200 && req.getStatus() <= 299)
				{
			    	if (success != null)
			    	{
				    	var file = JSON.parse(req.getText());
				    	var data = file.content;
				    	
				    	if (file.encoding === 'base64')
				    	{
				    		if (/\.png$/i.test(filename))
					    	{
					    		data = 'data:image/png;base64,' + data;	
					    	}
				    		else if (/\.pdf$/i.test(filename))
					    	{
					    		data = 'data:application/pdf;base64,' + data;	
					    	}
				    		else
					    	{
					    		// Workaround for character encoding issues in IE10/11
					    		data = (window.atob && !mxClient.IS_IE && !mxClient.IS_IE11) ? atob(data) : Base64.decode(data);
					    	}
				    	}
				    	
				    	handleData(data);
			    	}
				}
				else if (error != null)
		    	{
		    		error({code: App.ERROR_UNKNOWN});
		    	}
			}), function()
			{
		    	if (error != null)
		    	{
		    		error({code: App.ERROR_UNKNOWN});
		    	}
			}, false, this.timeout, function()
		    {
		    	if (error != null)
				{
					error({code: App.ERROR_TIMEOUT, retry: fn});
				}
		    }, headers);
		}
		else if (executeRequest != null)
		{
			executeRequest(url, handleData, error, binary);
		}
		else
		{
			this.editor.loadUrl(url, handleData, error, binary, null, null, null, headers);
		}
	}
};

/**
 * Adds the listener for automatically saving the diagram for local changes.
 */ 
App.prototype.updateHeader = function()
{
	if (this.menubar != null)
	{
		var logo = 'url(' + Editor.logoImage + ')';
		this.appIcon = document.createElement('a');
		this.appIcon.style.display = 'block';
		this.appIcon.style.position = 'absolute';
		this.appIcon.style.width = '32px';
		this.appIcon.style.height = (this.menubarHeight - 28) + 'px';
		this.appIcon.style.margin = '8px 0px 8px 16px';
		this.appIcon.style.opacity = '0.85';
		this.appIcon.style.borderRadius = '3px';		
		this.appIcon.style.backgroundPosition = 'center center';
		this.appIcon.style.backgroundSize = '100% 100%';
		this.appIcon.style.backgroundRepeat = 'no-repeat';
		this.appIcon.style.backgroundImage = logo;

		mxEvent.disableContextMenu(this.appIcon);
		
		mxEvent.addListener(this.appIcon, 'click', mxUtils.bind(this, function(evt)
		{
			this.appIconClicked(evt);
		}));
		
		if (!Editor.enableCssDarkMode)
		{
			var updateBackground = mxUtils.bind(this, function()
			{
				this.appIcon.style.backgroundColor = (!Editor.isDarkMode()) ? '#f08705' : '';
			});

			this.addListener('darkModeChanged', updateBackground);
			updateBackground();
		}
		else
		{
			this.appIcon.style.backgroundColor = '#f08705';
		}

		mxUtils.setPrefixedStyle(this.appIcon.style, 'transition', 'all 125ms linear');

		mxEvent.addListener(this.appIcon, 'mouseover', mxUtils.bind(this, function()
		{
			var file = this.getCurrentFile();
			
			if (file != null)
			{
				var mode = file.getMode();
				
				if (mode == App.MODE_GOOGLE)
				{
					this.appIcon.style.backgroundImage = 'url(' + IMAGE_PATH + '/google-drive-logo-white.svg)';
					this.appIcon.style.backgroundSize = '70% 70%';
				}
				else if (mode == App.MODE_DROPBOX)
				{
					this.appIcon.style.backgroundImage = 'url(' + IMAGE_PATH + '/dropbox-logo-white.svg)';
					this.appIcon.style.backgroundSize = '70% 70%';
				}
				else if (mode == App.MODE_ONEDRIVE)
				{
					this.appIcon.style.backgroundImage = 'url(' + IMAGE_PATH + '/onedrive-logo-white.svg)';
					this.appIcon.style.backgroundSize = '70% 70%';
				}
				else if (mode == App.MODE_GITHUB)
				{
					this.appIcon.style.backgroundImage = 'url(' + IMAGE_PATH + '/github-logo-white.svg)';
					this.appIcon.style.backgroundSize = '70% 70%';
				}
				else if (mode == App.MODE_GITLAB)
				{
					this.appIcon.style.backgroundImage = 'url(' + IMAGE_PATH + '/gitlab-logo-white.svg)';
					this.appIcon.style.backgroundSize = '100% 100%';
				}
				else if (mode == App.MODE_TRELLO)
				{
					this.appIcon.style.backgroundImage = 'url(' + IMAGE_PATH + '/trello-logo-white-orange.svg)';
					this.appIcon.style.backgroundSize = '70% 70%';
				}
			}
		}));
		
		mxEvent.addListener(this.appIcon, 'mouseout', mxUtils.bind(this, function()
		{
			this.appIcon.style.backgroundImage = logo;
			this.appIcon.style.backgroundSize = '90% 90%';
		}));
		
		if (urlParams['embed'] != '1')
		{
			this.menubarContainer.appendChild(this.appIcon);
		}
	
		this.fnameWrapper = document.createElement('div');
		this.fnameWrapper.style.position = 'absolute';
		this.fnameWrapper.style.right = '120px';
		this.fnameWrapper.style.left = '60px';
		this.fnameWrapper.style.top = '9px';
		this.fnameWrapper.style.height = '26px';
		this.fnameWrapper.style.display = 'none';
		this.fnameWrapper.style.overflow = 'hidden';
		this.fnameWrapper.style.textOverflow = 'ellipsis';
		
		this.fname = document.createElement('a');
		this.fname.setAttribute('title', mxResources.get('rename'));
		this.fname.className = 'geItem';
		this.fname.style.padding = '2px 8px 2px 8px';
		this.fname.style.display = 'inline';
		this.fname.style.fontSize = '18px';
		this.fname.style.whiteSpace = 'nowrap';
		
		// Prevents focus
        mxEvent.addListener(this.fname, (mxClient.IS_POINTER) ? 'pointerdown' : 'mousedown',
        	mxUtils.bind(this, function(evt)
        {
			evt.preventDefault();
		}));
		
		mxEvent.addListener(this.fname, 'click', mxUtils.bind(this, function(evt)
		{
			var file = this.getCurrentFile();
			
			if (file != null && file.isRenamable())
			{
				if (this.editor.graph.isEditing())
				{
					this.editor.graph.stopEditing();
				}

				this.actions.get('rename').funct();
			}
			
			mxEvent.consume(evt);
		}));
		
		this.fnameWrapper.appendChild(this.fname);
		
		if (urlParams['embed'] != '1')
		{
			this.menubarContainer.appendChild(this.fnameWrapper);
		
			this.menubar.container.style.position = 'absolute';
			this.menubar.container.style.paddingLeft = '59px';
			this.toolbar.container.style.paddingLeft = '16px';
			this.menubar.container.style.boxSizing = 'border-box';
			this.menubar.container.style.top = '34px';
		}
		
		/**
		 * Adds format panel toggle.
		 */
		var right = (Editor.currentTheme != 'atlas' && urlParams['embed'] != '1') ? 30 : 10;
		this.toggleFormatElement = document.createElement('a');
		this.toggleFormatElement.setAttribute('title', mxResources.get('format') + ' (' + Editor.ctrlKey + '+Shift+P)');
		this.toggleFormatElement.style.position = 'absolute';
		this.toggleFormatElement.style.display = 'inline-block';
		this.toggleFormatElement.style.top = (Editor.currentTheme == 'atlas') ? '8px' : '6px';
		this.toggleFormatElement.style.right = right + 'px';
		this.toggleFormatElement.style.padding = '2px';
		this.toggleFormatElement.style.fontSize = '14px';
		this.toggleFormatElement.className = (Editor.currentTheme != 'atlas') ? 'geButton geAdaptiveAsset' : '';
		this.toggleFormatElement.style.width = '16px';
		this.toggleFormatElement.style.height = '16px';
		this.toggleFormatElement.style.backgroundPosition = '50% 50%';
		this.toggleFormatElement.style.backgroundSize = '16px 16px';
		this.toggleFormatElement.style.backgroundRepeat = 'no-repeat';
		this.toolbarContainer.appendChild(this.toggleFormatElement);
		right += 20;
		
		// Prevents focus
	    mxEvent.addListener(this.toggleFormatElement, (mxClient.IS_POINTER) ? 'pointerdown' : 'mousedown',
        	mxUtils.bind(this, function(evt)
    	{
			evt.preventDefault();
		}));
		
		mxEvent.addListener(this.toggleFormatElement, 'click', mxUtils.bind(this, function(evt)
		{
			EditorUi.logEvent({category: 'TOOLBAR-ACTION-',
				action: 'format'});
		
			this.actions.get('format').funct();
			mxEvent.consume(evt);
		}));

		var toggleFormatPanel = mxUtils.bind(this, function()
		{
			if (this.formatWidth > 0)
			{
				this.toggleFormatElement.style.backgroundImage = 'url(\'' + this.formatShowImage + '\')';
			}
			else
			{
				this.toggleFormatElement.style.backgroundImage = 'url(\'' + this.formatHideImage + '\')';
			}
		});
		
		this.addListener('formatWidthChanged', toggleFormatPanel);
		toggleFormatPanel();

		this.fullscreenElement = this.toggleFormatElement.cloneNode(true);
		this.fullscreenElement.setAttribute('title', mxResources.get('fullscreen'));
		this.fullscreenElement.style.backgroundImage = 'url(\'' + Editor.fullscreenImage + '\')';
		this.fullscreenElement.style.right = right + 'px';
		this.toolbarContainer.appendChild(this.fullscreenElement);
		right += 20;
		
		// Prevents focus
		mxEvent.addListener(this.fullscreenElement, (mxClient.IS_POINTER) ? 'pointerdown' : 'mousedown',
        	mxUtils.bind(this, function(evt)
    	{
			evt.preventDefault();
		}));
		
		mxEvent.addListener(this.fullscreenElement, 'click', mxUtils.bind(this, function(evt)
		{
			var visible = this.fullscreenMode;

			EditorUi.logEvent({category: 'TOOLBAR-ACTION-',
				action: 'fullscreen' , currentstate: visible});
			
			if (Editor.currentTheme != 'atlas' && urlParams['embed'] != '1')
			{
				this.toggleCompactMode(visible);
			}

			this.toggleShapesPanel(visible);
			this.toggleFormatPanel(visible);
			this.fullscreenMode = !visible;

			this.fullscreenElement.style.backgroundImage = 'url(\'' + ((this.fullscreenMode) ?
				Editor.fullscreenExitImage : Editor.fullscreenImage) + '\')';

			mxEvent.consume(evt);
		}));
		
		// Some style changes in Atlas theme
		if (Editor.currentTheme == 'atlas')
		{
			mxUtils.setOpacity(this.toggleFormatElement, 70);
			mxUtils.setOpacity(this.fullscreenElement, 70);
		}
		
		/**
		 * Adds compact UI toggle.
		 */
		if (urlParams['embed'] != '1' && Editor.currentTheme != 'atlas')
		{
			this.toggleElement = document.createElement('a');
			this.toggleElement.setAttribute('title', mxResources.get('collapseExpand'));
			this.toggleElement.className = 'geButton geAdaptiveAsset';
			this.toggleElement.style.position = 'absolute';
			this.toggleElement.style.display = 'inline-block';
			this.toggleElement.style.width = '16px';
			this.toggleElement.style.height = '16px';
			this.toggleElement.style.color = '#666';
			this.toggleElement.style.top = '6px';
			this.toggleElement.style.right = '10px';
			this.toggleElement.style.padding = '2px';
			this.toggleElement.style.fontSize = '14px';
			this.toggleElement.style.textDecoration = 'none';
			this.toggleElement.style.backgroundImage = 'url(\'' + this.chevronUpImage + '\')';
				
			this.toggleElement.style.backgroundPosition = '50% 50%';
			this.toggleElement.style.backgroundRepeat = 'no-repeat';
			
			// Prevents focus
			mxEvent.addListener(this.toggleElement, (mxClient.IS_POINTER) ? 'pointerdown' : 'mousedown',
	        	mxUtils.bind(this, function(evt)
	    	{
				evt.preventDefault();
			}));
	
			// Toggles compact mode
			mxEvent.addListener(this.toggleElement, 'click', mxUtils.bind(this, function(evt)
			{
				EditorUi.logEvent({category: 'TOOLBAR-ACTION-',
					action: 'toggleUI'});
				this.toggleCompactMode();
				mxEvent.consume(evt);
			}));
		
			if (Editor.currentTheme != 'atlas')
			{
				this.toolbarContainer.appendChild(this.toggleElement);
			}
			
			// Enable compact mode for small screens except for Firefox where the height is wrong
			if (!mxClient.IS_FF && screen.height <= 740 && typeof this.toggleElement.click !== 'undefined')
			{
				window.setTimeout(mxUtils.bind(this, function()
				{
					this.toggleElement.click();
				}), 0);
			}
		}
	}
};

/**
 * Adds the listener for automatically saving the diagram for local changes.
 */
App.prototype.toggleCompactMode = function(visible)
{
	visible = (visible != null) ? visible : this.compactMode;
	
	if (visible)
	{
		this.menubar.container.style.position = 'absolute';
		this.menubar.container.style.paddingLeft = '59px';
		this.menubar.container.style.paddingTop = '';
		this.menubar.container.style.paddingBottom = '';
		this.menubar.container.style.top = '34px';
		this.toolbar.container.style.paddingLeft = '16px';
		this.buttonContainer.style.visibility = 'visible';
		this.appIcon.style.display = 'block';
		this.fnameWrapper.style.display = 'block';
		this.fnameWrapper.style.visibility = 'visible';
		this.menubarHeight = App.prototype.menubarHeight;
	}
	else
	{
		this.menubar.container.style.position = 'relative';
		this.menubar.container.style.paddingLeft = '4px';
		this.menubar.container.style.paddingTop = '0px';
		this.menubar.container.style.paddingBottom = '0px';
		this.menubar.container.style.top = '0px';
		this.toolbar.container.style.paddingLeft = '8px';
		this.appIcon.style.display = 'none';
		this.fnameWrapper.style.display = 'none';
		this.fnameWrapper.style.visibility = 'hidden';
		this.menubarHeight = EditorUi.prototype.menubarHeight;

		if (Editor.currentTheme != 'atlas' && Editor.currentTheme != 'simple')
		{
			this.buttonContainer.style.visibility = 'hidden';
		}
	}

	if (this.toggleElement != null)
	{
		this.toggleElement.style.backgroundImage = 'url(\'' + ((visible) ?
			this.chevronUpImage : this.chevronDownImage) + '\')';
	}

	this.refresh();
	this.compactMode = !visible;
};

/**
 * Adds the listener for automatically saving the diagram for local changes.
 */
App.prototype.getMainUser = function()
{
	var user = null;

	// LATER: Trello no user issue
	if (this.drive != null && this.drive.getUser() != null)
	{
		user = this.drive.getUser();
	}
	else if (this.oneDrive != null && this.oneDrive.getUser() != null)
	{
		user = this.oneDrive.getUser();
	}
	else if (this.dropbox != null && this.dropbox.getUser() != null)
	{
		user = this.dropbox.getUser();
	}
	else if (this.gitHub != null && this.gitHub.getUser() != null)
	{
		user = this.gitHub.getUser();
	}
	else if (this.gitLab != null && this.gitLab.getUser() != null)
	{
		user = this.gitLab.getUser();
	}

	return user;
};

/**
 * Adds the listener for automatically saving the diagram for local changes.
 */
App.prototype.updateUserElement = function()
{
	if (this.userElement == null)
	{
		this.userElement = this.createUserElement();
		this.menubarContainer.appendChild(this.userElement);
	}

	this.updateUserElementStyle();
	this.updateUserElementIcon();
};

/**
 * 
 */
App.prototype.updateUserElementStyle = function()
{
	var elt = this.userElement;

	if (elt != null)
	{
		if (Editor.currentTheme == 'simple' ||
			Editor.currentTheme == 'sketch' ||
			Editor.currentTheme == 'min')
		{
    		elt.className = 'geUser geToolbarButton';
			elt.style.backgroundImage = 'url(' + Editor.userImage + ')';
        	elt.style.backgroundPosition = 'center center';
        	elt.style.backgroundRepeat = 'no-repeat';
        	elt.style.backgroundSize = '100% 100%';
			elt.style.position = 'relative';
			elt.style.margin = '0px';
			elt.style.padding = '0px';
        	elt.style.height = '24px';
        	elt.style.width = '24px';
			elt.style.right = '';
		}
		else
		{
			elt.className = 'geUser geItem';
			elt.style.backgroundImage =  'url(' + IMAGE_PATH + '/expanded.gif)';
			elt.style.backgroundPosition = '100% 70%';
			elt.style.backgroundRepeat = 'no-repeat';
        	elt.style.backgroundSize = '';
			elt.style.position = 'absolute';
			elt.style.margin = '4px';
			elt.style.padding = '2px';
			elt.style.paddingRight = '16px';
			elt.style.width = '';
			elt.style.height = '';
			elt.style.right = (Editor.currentTheme == 'atlas' ||
				this.darkModeElement != null) ? '12px' : '26px';
			elt.style.top = (Editor.currentTheme == 'atlas') ? '8px' : '2px';
		}
	}
};

/**
 * 
 */
App.prototype.updateUserElementIcon = function()
{
	var elt = this.userElement;

	if (elt != null)
	{
		var file = this.getCurrentFile();
		var user = this.getMainUser();

		if (urlParams['embed'] == '1' || file == null || user == null)
		{
			elt.style.display = 'none';
		}
		else
		{
			var title = mxResources.get('changeUser');
			EditorUi.removeChildNodes(elt);
			elt.style.display = '';
			elt.innerText = '';

			if (Editor.currentTheme != 'simple' &&
				Editor.currentTheme != 'sketch' &&
				Editor.currentTheme != 'min')
			{
				mxUtils.write(elt, user.displayName);
			}
			else
			{
				title = user.displayName;
			}

			if (file.isRealtimeEnabled() && file.isRealtimeSupported())
			{
				var icon = document.createElement('img');
				icon.setAttribute('border', '0');
				icon.style.position = 'absolute';
				icon.style.left = '16px';
				icon.style.width = '12px';
				icon.style.height = '12px';

				if (Editor.enableCssDarkMode)
				{
					icon.className = 'geAdaptiveAsset';
				}

				var err = file.getRealtimeError();
				var state = file.getRealtimeState();
				title += ' (';

				if (state == 1)
				{
					icon.src = Editor.syncImage;
					title += mxResources.get('online');
				}
				else
				{
					icon.src = Editor.syncProblemImage;

					if (err != null && err.message != null)
					{
						title += err.message;
					}
					else
					{
						title += mxResources.get('disconnected');
					}
				}
				
				title += ')';

				if (Editor.currentTheme == 'simple' ||
					Editor.currentTheme == 'sketch' ||
					Editor.currentTheme == 'min')
				{
					elt.appendChild(icon);

					if (Editor.currentTheme == 'min')
					{
						elt.style.marginRight = '4px';
					}
				}
				else
				{
					icon.style.top = '2px';
				}
			}

			elt.setAttribute('title', title);
		}
	}
};

/**
 * Adds the listener for automatically saving the diagram for local changes.
 */
App.prototype.toggleUserPanel = function()
{
	if (this.userPanel == null)
	{
		var div = document.createElement('div');
		div.className = 'geDialog';
		div.style.position = 'absolute';
		div.style.zIndex = 5;
		div.style.padding = '0px';
		div.style.cursor = 'default';
		div.style.minWidth = '300px';
		
		this.userPanel = div;

		mxEvent.addListener(document.body, 'click', mxUtils.bind(this, function(evt)
		{
			if (!mxEvent.isConsumed(evt) && this.userPanel != null && this.userPanel.parentNode != null)
			{
				this.userPanel.parentNode.removeChild(this.userPanel);
			}
		}));
	}
	
	if (this.userPanel.parentNode != null)
	{
		this.userPanel.parentNode.removeChild(this.userPanel);
	}
	else
	{
		var connected = false;
		this.userPanel.innerText = '';
		
		var img = document.createElement('img');

		img.setAttribute('src', Dialog.prototype.closeImage);
		img.setAttribute('title', mxResources.get('close'));
		img.className = 'geDialogClose';
		img.style.top = '8px';
		img.style.right = '8px';
		
		mxEvent.addListener(img, 'click', mxUtils.bind(this, function()
		{
			if (this.userPanel.parentNode != null)
			{
				this.userPanel.parentNode.removeChild(this.userPanel);
			}
		}));
		
		this.userPanel.appendChild(img);
							
		if (this.drive != null)
		{
			var driveUsers = this.drive.getUsersList();
			
			if (driveUsers.length > 0)
			{
				// LATER: Cannot change user while file is open since close will not work with new
				// credentials and closing the file using fileLoaded(null) will show splash dialog.
				var closeFile = mxUtils.bind(this, function(callback, spinnerMsg)
				{
					var file = this.getCurrentFile();

					if (file != null && file.constructor == DriveFile)
					{
						this.spinner.spin(document.body, spinnerMsg);
							
//									file.close();
						this.fileLoaded(null);

						// LATER: Use callback to wait for thumbnail update
						window.setTimeout(mxUtils.bind(this, function()
						{
							this.spinner.stop();
							callback();
						}), 2000);
					}
					else
					{
						callback();
					}
				});
				
				var createUserRow = mxUtils.bind(this, function (user)
				{
					var tr = document.createElement('tr');
					tr.setAttribute('title', 'User ID: ' + user.id);

					var td = document.createElement('td');
					td.setAttribute('valig', 'middle');
					td.style.height = '59px';
					td.style.width = '66px';

					var img = document.createElement('img');
					img.setAttribute('width', '50');
					img.setAttribute('height', '50');
					img.setAttribute('border', '0');
					img.setAttribute('src', (user.pictureUrl != null) ? user.pictureUrl : this.defaultUserPicture);
					img.style.borderRadius = '50%';
					img.style.margin = '4px 8px 0 8px';
					td.appendChild(img);
					tr.appendChild(td);

					var td = document.createElement('td');
					td.setAttribute('valign', 'middle');
					td.style.whiteSpace = 'nowrap';
					td.style.paddingTop = '4px';
					td.style.maxWidth = '0';
					td.style.overflow = 'hidden';
					td.style.textOverflow = 'ellipsis';
					mxUtils.write(td, user.displayName +
						((user.isCurrent && driveUsers.length > 1) ?
						' (' + mxResources.get('default') + ')' : ''));

					if (user.email != null)
					{
						mxUtils.br(td);

						var small = document.createElement('small');
						small.style.color = 'gray';
						mxUtils.write(small, user.email);
						td.appendChild(small);
					}

					var div = document.createElement('div');
					div.style.marginTop = '4px';

					var i = document.createElement('i');
					mxUtils.write(i, mxResources.get('googleDrive'));
					div.appendChild(i);
					td.appendChild(div);
					tr.appendChild(td);

					if (!user.isCurrent)
					{
						tr.style.cursor = 'pointer';
						tr.style.opacity = '0.3';

						mxEvent.addListener(tr, 'click', mxUtils.bind(this, function(evt)
						{
							closeFile(mxUtils.bind(this, function()
							{
								this.stateArg = null;
								this.drive.setUser(user);
								
								this.drive.authorize(true, mxUtils.bind(this, function()
								{
									this.setMode(App.MODE_GOOGLE);
									this.hideDialog();
									this.showSplash();
								}), mxUtils.bind(this, function(resp)
								{
									this.handleError(resp);
								}), true); //Remember is true since add account imply keeping that account
							}), mxResources.get('closingFile') + '...');
							
							mxEvent.consume(evt);
						}));
					}
				
					return tr;
				});
				
				connected = true;
				
				var driveUserTable = document.createElement('table');
				driveUserTable.style.borderSpacing = '0';
				driveUserTable.style.fontSize = '10pt';
				driveUserTable.style.width = '100%';
				driveUserTable.style.padding = '10px';

				for (var i = 0; i < driveUsers.length; i++)
				{
					driveUserTable.appendChild(createUserRow(driveUsers[i]));
				}
				
				this.userPanel.appendChild(driveUserTable);
				
				var div = document.createElement('div');
				div.style.textAlign = 'left';
				div.style.padding = '10px';
				div.style.whiteSpace = 'nowrap';
				div.style.borderTopStyle = 'solid';
				div.style.borderTopWidth = '1px';

				var btn = mxUtils.button(mxResources.get('signOut'), mxUtils.bind(this, function()
				{
					this.confirm(mxResources.get('areYouSure'), mxUtils.bind(this, function()
					{
						closeFile(mxUtils.bind(this, function()
						{
							this.stateArg = null;
							this.drive.logout();
							this.setMode(App.MODE_GOOGLE);
							this.hideDialog();
							this.showSplash();
						}), mxResources.get('signOut'));
					}));
				}));
				btn.className = 'geBtn';
				btn.style.float = 'right';
				div.appendChild(btn);
				
				var btn = mxUtils.button(mxResources.get('addAccount'), mxUtils.bind(this, function()
				{
					var authWin = this.drive.createAuthWin();
					//FIXME This doean't work to set focus back to main window until closing the file is done
					authWin.blur();
					window.focus();
					
					closeFile(mxUtils.bind(this, function()
					{
						this.stateArg = null;
						
						this.drive.authorize(false, mxUtils.bind(this, function()
						{
							this.setMode(App.MODE_GOOGLE);
							this.hideDialog();
							this.showSplash();
						}), mxUtils.bind(this, function(resp)
						{
							this.handleError(resp);
						}), true, authWin); //Remember is true since add account imply keeping that account
					}), mxResources.get('closingFile') + '...');
				}));
				btn.className = 'geBtn';
				btn.style.margin = '0px';
				div.appendChild(btn);
				this.userPanel.appendChild(div);
			}
		}
		
		var addUser = mxUtils.bind(this, function(user, logo, logout, label)
		{
			if (user != null)
			{
				if (connected)
				{
					this.userPanel.appendChild(document.createElement('hr'));
				}
				
				connected = true;
				var userTable = document.createElement('table');
				userTable.style.borderSpacing = '0';
				userTable.style.fontSize = '10pt';
				userTable.style.width = '100%';
				userTable.style.padding = '10px';

				var tbody = document.createElement('tbody');
				var row = document.createElement('tr');
				var td = document.createElement('td');
				td.setAttribute('valig', 'top');
				td.style.width = '40px';

				if (logo != null)
				{
					var img = document.createElement('img');
					img.setAttribute('width', '40');
					img.setAttribute('height', '40');
					img.setAttribute('border', '0');
					img.setAttribute('src', logo);
					img.style.marginRight = '6px';

					td.appendChild(img);
				}

				row.appendChild(td);

				var td = document.createElement('td');
				td.setAttribute('valign', 'middle');
				td.style.whiteSpace = 'nowrap';
				td.style.maxWidth = '0';
				td.style.overflow = 'hidden';
				td.style.textOverflow = 'ellipsis';

				mxUtils.write(td, user.displayName);

				if (user.email != null)
				{
					mxUtils.br(td);

					var small = document.createElement('small');
					small.style.color = 'gray';
					mxUtils.write(small, user.email);
					td.appendChild(small);
				}

				if (label != null)
				{
					var div = document.createElement('div');
					div.style.marginTop = '4px';

					var i = document.createElement('i');
					mxUtils.write(i, label);
					div.appendChild(i);
					td.appendChild(div);
				}

				row.appendChild(td);
				tbody.appendChild(row);
				userTable.appendChild(tbody);

				this.userPanel.appendChild(userTable);
				var div = document.createElement('div');
				div.style.textAlign = 'center';
				div.style.padding = '10px';
				div.style.whiteSpace = 'nowrap';
				
				if (logout != null)
				{
					var btn = mxUtils.button(mxResources.get('signOut'), logout);
					btn.className = 'geBtn';
					div.appendChild(btn);
				}
				
				this.userPanel.appendChild(div);
			}
		});
		
		if (this.dropbox != null)
		{
			addUser(this.dropbox.getUser(), IMAGE_PATH + '/dropbox-logo.svg', mxUtils.bind(this, function()
			{
				var file = this.getCurrentFile();

				if (file != null && file.constructor == DropboxFile)
				{
					var doLogout = mxUtils.bind(this, function()
					{
						this.dropbox.logout();
						window.location.hash = '';
					});
					
					if (!file.isModified())
					{
						doLogout();
					}
					else
					{
						this.confirm(mxResources.get('allChangesLost'), null, doLogout,
							mxResources.get('cancel'), mxResources.get('discardChanges'));
					}
				}
				else
				{
					this.dropbox.logout();
				}
			}), mxResources.get('dropbox'));
		}

		if (this.oneDrive != null)
		{
			addUser(this.oneDrive.getUser(), IMAGE_PATH + '/onedrive-logo.svg', this.oneDrive.noLogout? null : mxUtils.bind(this, function()
			{
				var file = this.getCurrentFile();

				if (file != null && file.constructor == OneDriveFile)
				{
					var doLogout = mxUtils.bind(this, function()
					{
						this.oneDrive.logout();
						window.location.hash = '';
					});
					
					if (!file.isModified())
					{
						doLogout();
					}
					else
					{
						this.confirm(mxResources.get('allChangesLost'), null, doLogout,
							mxResources.get('cancel'), mxResources.get('discardChanges'));
					}
				}
				else
				{
					this.oneDrive.logout();
				}
			}), mxResources.get('oneDrive'));
		}

		if (this.gitHub != null)
		{
			addUser(this.gitHub.getUser(), IMAGE_PATH + '/github-logo.svg', mxUtils.bind(this, function()
			{
				var file = this.getCurrentFile();

				if (file != null && file.constructor == GitHubFile)
				{
					var doLogout = mxUtils.bind(this, function()
					{
						this.gitHub.logout();
						window.location.hash = '';
					});
					
					if (!file.isModified())
					{
						doLogout();
					}
					else
					{
						this.confirm(mxResources.get('allChangesLost'), null, doLogout,
							mxResources.get('cancel'), mxResources.get('discardChanges'));
					}
				}
				else
				{
					this.gitHub.logout();
				}
			}), mxResources.get('github'));
		}
		
		if (this.gitLab != null)
		{
			addUser(this.gitLab.getUser(), IMAGE_PATH + '/gitlab-logo.svg', mxUtils.bind(this, function()
			{
				var file = this.getCurrentFile();

				if (file != null && file.constructor == GitLabFile)
				{
					var doLogout = mxUtils.bind(this, function()
					{
						this.gitLab.logout();
						window.location.hash = '';
					});

					if (!file.isModified())
					{
						doLogout();
					}
					else
					{
						this.confirm(mxResources.get('allChangesLost'), null, doLogout,
							mxResources.get('cancel'), mxResources.get('discardChanges'));
					}
				}
				else
				{
					this.gitLab.logout();
				}
			}), mxResources.get('gitlab'));
		}

		//TODO We have no user info from Trello, how we can create a user?
		if (this.trello != null)
		{
			addUser(this.trello.getUser(), IMAGE_PATH + '/trello-logo.svg', mxUtils.bind(this, function()
			{
				var file = this.getCurrentFile();

				if (file != null && file.constructor == TrelloFile)
				{
					var doLogout = mxUtils.bind(this, function()
					{
						this.trello.logout();
						window.location.hash = '';
					});
					
					if (!file.isModified())
					{
						doLogout();
					}
					else
					{
						this.confirm(mxResources.get('allChangesLost'), null, doLogout,
							mxResources.get('cancel'), mxResources.get('discardChanges'));
					}
				}
				else
				{
					this.trello.logout();
				}
			}), mxResources.get('trello'));
		}
		
		if (uiTheme == 'min')
		{
			var file = this.getCurrentFile();

			if (file != null && file.isRealtimeEnabled() && file.isRealtimeSupported())
			{
				var div = document.createElement('div');
				div.style.padding = '10px';
				div.style.whiteSpace = 'nowrap';
				div.style.borderTop = '1px solid rgb(224, 224, 224)';
				div.style.marginTop = '4px';
				div.style.textAlign = 'center';
				div.style.padding = '10px';
				div.style.fontSize = '9pt';
				var err = file.getRealtimeError();
				var state = file.getRealtimeState();

				if (state != 1)
				{
					mxUtils.write(div, mxResources.get('realtimeCollaboration') + ': ' +
							((err != null && err.message != null) ?
							err.message : mxResources.get('disconnected')));
					this.userPanel.appendChild(div);
				}
			}
		}

		document.body.appendChild(this.userPanel);
	}
};

/**
 * Adds the listener for automatically saving the diagram for local changes.
 */
App.prototype.createUserElement = function()
{
	var elt = document.createElement('a');

	// Prevents focus
	mxEvent.addListener(elt, (mxClient.IS_POINTER) ? 'pointerdown' : 'mousedown',
		mxUtils.bind(this, function(evt)
	{
		evt.preventDefault();
	}));

	mxEvent.addListener(elt, 'click', mxUtils.bind(this, function(evt)
	{
		this.toggleUserPanel();

		this.userPanel.style.top = (elt.clientTop + elt.clientHeight + 6) + 'px';
		this.userPanel.style.right = '36px';
		this.userPanel.style.left = '';

		mxEvent.consume(evt);
	}));
	
	return elt;
};

//TODO Use this function to get the currently logged in user
App.prototype.getCurrentUser = function()
{
	var user = null;
	
	if (this.drive != null && this.drive.getUser() != null)
	{
		user = this.drive.getUser();
	}
	else if (this.oneDrive != null && this.oneDrive.getUser() != null)
	{
		user = this.oneDrive.getUser();
	}
	else if (this.dropbox != null && this.dropbox.getUser() != null)
	{
		user = this.dropbox.getUser();
	}
	else if (this.gitHub != null && this.gitHub.getUser() != null)
	{
		user = this.gitHub.getUser();
	}
	//TODO Trello no user issue
	
	return user;
};

/**
 * Override depends on mxSettings which is not defined in the minified viewer.
 */
var editorResetGraph = Editor.prototype.resetGraph;	
Editor.prototype.resetGraph = function()
{
	editorResetGraph.apply(this, arguments);
	
	// Overrides default with persisted value
	if (this.graph.defaultPageFormat == null)
	{
		this.graph.pageFormat = mxSettings.getPageFormat();
	}
};
