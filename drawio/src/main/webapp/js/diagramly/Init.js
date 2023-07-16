/**
 * Copyright (c) 2006-2021, JGraph Ltd
 * Copyright (c) 2006-2021, draw.io AG
 */

// urlParams is null when used for embedding
window.urlParams = window.urlParams || {};

// isLocalStorage controls access to local storage
window.isLocalStorage = window.isLocalStorage || false;

// Disables loading settings in configured mode
window.mxLoadSettings = window.mxLoadSettings || urlParams['configure'] != '1';

// Checks for SVG support
window.isSvgBrowser = true;

// CUSTOM_PARAMETERS - URLs for save and export
window.DRAWIO_BASE_URL = window.DRAWIO_BASE_URL || ((/.*\.draw\.io$/.test(window.location.hostname)) || (/.*\.diagrams\.net$/.test(window.location.hostname)) ?
	window.location.protocol + '//' + window.location.hostname : 'https://app.diagrams.net');
window.DRAWIO_LIGHTBOX_URL = window.DRAWIO_LIGHTBOX_URL || 'https://viewer.diagrams.net';
window.EXPORT_URL = window.EXPORT_URL || 'https://convert.diagrams.net/node/export';
window.PLANT_URL = window.PLANT_URL || 'https://plant-aws.diagrams.net';
window.DRAW_MATH_URL = window.DRAW_MATH_URL || window.DRAWIO_BASE_URL + '/math/es5';
window.VSD_CONVERT_URL = window.VSD_CONVERT_URL || 'https://convert.diagrams.net/VsdConverter/api/converter';
window.EMF_CONVERT_URL = window.EMF_CONVERT_URL || 'https://convert.diagrams.net/emf2png/convertEMF';
window.REALTIME_URL = window.REALTIME_URL || ((window.location.hostname == 'test.draw.io' &&
	urlParams['cache'] != 'local') ? 'https://app.diagrams.net/cache' : 'cache');
window.DRAWIO_GITLAB_URL = window.DRAWIO_GITLAB_URL || 'https://gitlab.com';
window.DRAWIO_GITLAB_ID = window.DRAWIO_GITLAB_ID || '2b14debc5feeb18ba65358d863ec870e4cc9294b28c3c941cb3014eb4af9a9b4';
window.DRAWIO_GITHUB_URL = window.DRAWIO_GITHUB_URL || 'https://github.com';
window.DRAWIO_GITHUB_API_URL = window.DRAWIO_GITHUB_API_URL || 'https://api.github.com';
window.DRAWIO_GITHUB_ID = window.DRAWIO_GITHUB_ID || 'Iv1.98d62f0431e40543';
window.DRAWIO_DROPBOX_ID = window.DRAWIO_DROPBOX_ID || 'jg02tc0onwmhlgm';
window.SAVE_URL = window.SAVE_URL || 'save';
window.OPEN_URL = window.OPEN_URL || 'import';
window.PROXY_URL = window.PROXY_URL || 'proxy';
window.DRAWIO_VIEWER_URL = window.DRAWIO_VIEWER_URL || null;
window.NOTIFICATIONS_URL = window.NOTIFICATIONS_URL || 'https://www.draw.io/notifications';
window.RT_WEBSOCKET_URL = window.RT_WEBSOCKET_URL || ('wss://' + ((window.location.hostname == 'test.draw.io') ?
	'app.diagrams.net' : window.location.hostname) + '/rt');

// Paths and files
window.SHAPES_PATH = window.SHAPES_PATH || 'shapes';
// Path for images inside the diagram
window.GRAPH_IMAGE_PATH = window.GRAPH_IMAGE_PATH || 'img';
window.ICONSEARCH_PATH = window.ICONSEARCH_PATH || (((navigator.userAgent != null && navigator.userAgent.indexOf('MSIE') >= 0) ||
	urlParams['dev']) && window.location.protocol != 'file:' ? 'iconSearch' : window.DRAWIO_BASE_URL + '/iconSearch');
window.TEMPLATE_PATH = window.TEMPLATE_PATH || 'templates';
window.NEW_DIAGRAM_CATS_PATH = window.NEW_DIAGRAM_CATS_PATH || 'newDiagramCats';
window.PLUGINS_BASE_PATH = window.PLUGINS_BASE_PATH || '';

// Allows third-party plugins to run
window.ALLOW_CUSTOM_PLUGINS = window.ALLOW_CUSTOM_PLUGINS || false;

// Directory for i18 files and basename for main i18n file
window.RESOURCES_PATH = window.RESOURCES_PATH || 'resources';
window.RESOURCE_BASE = window.RESOURCE_BASE || RESOURCES_PATH + '/dia';

// Specifies global configuration via variable
window.DRAWIO_CONFIG = window.DRAWIO_CONFIG || null;

// Sets the base path, the UI language via URL param and configures the
// supported languages to avoid 404s. The loading of all core language
// resources is disabled as all required resources are in grapheditor.
// properties. Note that in this example the loading of two resource
// files (the special bundle and the default bundle) is disabled to
// save a GET request. This requires that all resources be present in
// the special bundle.
window.mxLoadResources = window.mxLoadResources || false;
window.mxLanguage = window.mxLanguage || (function() 
{
	var lang = urlParams['lang'];
	
	// Known issue: No JSON object at this point in quirks in IE8
	if (lang == null && typeof(JSON) != 'undefined')
	{
		// Cannot use mxSettings here
		if (isLocalStorage) 
		{
			try
			{
				var value = localStorage.getItem('.drawio-config');
				
				if (value != null)
				{
					lang = JSON.parse(value).language || null;
				}
				
				if (!lang && window.mxIsElectron)
				{
					lang = urlParams['appLang'];
					
					if (lang != null)
			    	{
			    		var dash = lang.indexOf('-');
			    		
			    		if (dash >= 0)
			    		{
			    			lang = lang.substring(0, dash);
			    		}
			    		
			    		lang = lang.toLowerCase();
			    	}
				}
			}
			catch (e)
			{
				// cookies are disabled, attempts to use local storage will cause
				// a DOM error at a minimum on Chrome
				isLocalStorage = false;
			}
		}
	}
	
	return lang;
})();

// Add new languages here. First entry is translated to [Automatic]
// in the menu defintion in Diagramly.js.
window.mxLanguageMap = window.mxLanguageMap ||
{
	'i18n': '',
	'id' : 'Bahasa Indonesia',
	'ms' : 'Bahasa Melayu',
	'bs' : 'Bosanski',
	'bg' : 'Bulgarian',
	'ca' : 'Català',
	'cs' : 'Čeština',
	'da' : 'Dansk',
	'de' : 'Deutsch',
	'et' : 'Eesti',
	'en' : 'English',
	'es' : 'Español',
	'eu' : 'Euskara',
	'fil' : 'Filipino',
	'fr' : 'Français',
	'gl' : 'Galego',
	'it' : 'Italiano',
	'hu' : 'Magyar',
	'lt' : 'Lietuvių',
	'lv' : 'Latviešu',
	'nl' : 'Nederlands',
	'no' : 'Norsk',
	'pl' : 'Polski',
	'pt-br' : 'Português (Brasil)',
	'pt' : 'Português (Portugal)',
	'ro' : 'Română',
	'fi' : 'Suomi',
	'sv' : 'Svenska',
	'vi' : 'Tiếng Việt',
	'tr' : 'Türkçe',
	'el' : 'Ελληνικά',
	'ru' : 'Русский',
	'sr' : 'Српски',
	'uk' : 'Українська',
	'he' : 'עברית',
	'ar' : 'العربية',
	'fa' : 'فارسی',
	'th' : 'ไทย',
	'ko' : '한국어',
	'ja' : '日本語',
	'zh' : '简体中文',
	'zh-tw' : '繁體中文'
};

if (typeof window.mxBasePath === 'undefined')
{
	window.mxBasePath = 'mxgraph';
	window.mxImageBasePath = 'mxgraph/images';
}

if (window.mxLanguages == null)
{
	window.mxLanguages = [];
	
	// Populates the list of supported special language bundles
	for (var lang in mxLanguageMap)
	{
		// Empty means default (ie. browser language), "en" means English (default for unsupported languages)
		// Since "en" uses no extension this must not be added to the array of supported language bundles.
		if (lang != 'en')
		{
			window.mxLanguages.push(lang);
		}
	}

	// Uses browser language if supported
	if (window.mxLanguage == null &&
		(window.location.hostname == 'test.draw.io' ||
		window.location.hostname == 'www.draw.io' ||
		window.location.hostname == 'viewer.diagrams.net' ||
		window.location.hostname == 'embed.diagrams.net' ||
		window.location.hostname == 'app.diagrams.net' ||
		window.location.hostname == 'jgraph.github.io'))
	{
		var lang = navigator.language;

		if (lang != null)
		{
			var dash = lang.indexOf('-');
				
			if (dash > 0)
			{
				lang = lang.substring(0, dash);
			}

			if (window.mxLanguages.indexOf(lang) >= 0)
			{
				window.mxLanguage = lang;
			}
		}
	}
}

//Disable Google Drive when running in a WebView (e.g, MS Teams App) Since auth doesn't work with disallowd_useragent
//[For MS Teams only] TODO Check if other apps are affected also (android and iOS)
if (urlParams['extAuth'] == '1' && /((iPhone|iPod|iPad).*AppleWebKit(?!.*Version)|; wv)/i.test(navigator.userAgent))
{
	urlParams['gapi'] = '0';
	urlParams['noDevice'] = '1';
	//Force viewer only
	//TODO This should always be for MS Teams only
	if (urlParams['lightbox'] != '1')
	{
		urlParams['lightbox'] = '1';
		urlParams['layers'] = '1';
		urlParams['viewerOnlyMsg'] = '1';
	}
}

// Uses lightbox mode on viewer domain
if (window.location.hostname == DRAWIO_LIGHTBOX_URL.substring(DRAWIO_LIGHTBOX_URL.indexOf('//') + 2))
{
	urlParams['lightbox'] = '1';
}	

// Lightbox enables chromeless mode
if (urlParams['lightbox'] == '1')
{
	urlParams['chrome'] = '0';
}

// Embed inline is embed mode and sketch UI
if (urlParams['embedInline'] == '1')
{
	urlParams['embed'] = '1';
	urlParams['ui'] = 'sketch';
	urlParams['plugins'] = '0';
	urlParams['proto'] = 'json';
	urlParams['prefetchFonts'] = '1';
}

/**
 * Global function for loading local files via servlet
 */
function setCurrentXml(data, filename)
{
	if (window.parent != null && window.parent.openFile != null)
	{
		window.parent.openFile.setData(data, filename);
	}
};
 
/**
 * Returns the global UI setting before running static draw.io code
 */
window.uiTheme = window.uiTheme || (function() 
{
	var ui = urlParams['ui'];

	//Use Sketch theme for MS Teams (and any future extAuth) by default
	if (urlParams['extAuth'] == '1')
	{
		ui = 'sketch';
	}

	// Known issue: No JSON object at this point in quirks in IE8
	if (ui == null && isLocalStorage && typeof JSON !== 'undefined' && urlParams['lightbox'] != '1')
	{
		try
		{
			var value = localStorage.getItem('.drawio-config');
			
			if (value != null)
			{
				ui = JSON.parse(value).ui || null;
			}
		}
		catch (e)
		{
			// cookies are disabled, attempts to use local storage will cause
			// a DOM error at a minimum on Chrome
			isLocalStorage = false;
		}
	}
	
	// Uses simple theme on small screens in own domain standalone app
	try
	{
		if (ui == null && urlParams['embed'] != '1' &&
			(urlParams['dev'] == 1 || urlParams['test'] == 1 ||
			window.location.hostname === 'test.draw.io' ||
			window.location.hostname === 'www.draw.io' ||
			window.location.hostname === 'preprod.diagrams.net' ||
			window.location.hostname === 'app.diagrams.net' ||
			window.location.hostname === 'jgraph.github.io'))
		{
			var iw = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
			var userAgent = navigator.userAgent || navigator.vendor || window.opera;

			if (iw <= 800 ||  /android/i.test(userAgent) || (/iPad|iPhone|iPod/.test(userAgent) &&
				!window.MSStream) || (navigator.userAgent.match(/Mac/) &&
				navigator.maxTouchPoints && navigator.maxTouchPoints > 2))
			{
				ui = 'simple';
			}
		}
	}
	catch (e)
	{
		// ignore
	}

	// Activates sketch mode in Confluence Cloud sketch theme
	if (ui == 'sketch' && urlParams['sketch'] == null &&
		window.location.hostname === 'ac.draw.io')
	{
		urlParams['sketch'] = '1';
	}
	else if (urlParams['dark'] == '1' && (ui == '' || ui == 'kennedy'))
	{
		ui = 'dark';
	}
	
	return ui;
})();

/**
 * Overrides splash URL parameter via local storage
 */
(function() 
{
	// Known issue: No JSON object at this point in quirks in IE8
	if (typeof JSON !== 'undefined')
	{
		// Cannot use mxSettings here
		if (isLocalStorage) 
		{
			try
			{
				var key = (urlParams['sketch'] == '1') ? '.sketch-config' : '.drawio-config';
				var value = localStorage.getItem(key);
				var showSplash = true;
				
				if (value != null)
				{
					showSplash = JSON.parse(value).showStartScreen;
				}

				// Undefined means true
				if (showSplash == false)
				{
					urlParams['splash'] = '0';
				}
			}
			catch (e)
			{
				// ignore
			}
		}
	}
	
	// Customizes export URL
	var ex = urlParams['export'];

	if (ex != null)
	{
		ex = decodeURIComponent(ex);
		
		if (ex.substring(0, 7) != 'http://' &&  ex.substring(0, 8) != 'https://')
		{
			ex = 'http://' + ex;
		}
		
		EXPORT_URL = ex;
	}

	// Customizes gitlab URL
	var glUrl = urlParams['gitlab'];

	if (glUrl != null)
	{
		glUrl = decodeURIComponent(glUrl);
		
		if (glUrl.substring(0, 7) != 'http://' &&  glUrl.substring(0, 8) != 'https://')
		{
			glUrl = 'http://' + glUrl;
		}
		
		DRAWIO_GITLAB_URL = glUrl;
	}
	
	var glId = urlParams['gitlab-id'];

	if (glId != null)
	{
		DRAWIO_GITLAB_ID = glId;
	}

	// URL for logging
	window.DRAWIO_LOG_URL = window.DRAWIO_LOG_URL || '';

	//Adds hard-coded logging domain for draw.io domains
	var host = window.location.host;
	
	if (host != 'test.draw.io')
	{
		var searchString = 'diagrams.net';
		var position = host.length - searchString.length;
		var lastIndex = host.lastIndexOf(searchString, position);
		
		if (lastIndex !== -1 && lastIndex === position)
		{
			window.DRAWIO_LOG_URL = 'https://log.diagrams.net';
		}
		else
		{
			// For atlas integrations
			var searchString = 'draw.io';
			var position = host.length - searchString.length;
			var lastIndex = host.lastIndexOf(searchString, position);
			
			if (lastIndex !== -1 && lastIndex === position)
			{
				window.DRAWIO_LOG_URL = 'https://log.draw.io';
			}
		}
	}
})();

// Enables offline mode
if (urlParams['offline'] == '1' || urlParams['demo'] == '1' || 
	urlParams['stealth'] == '1' || urlParams['local'] == '1' ||
	urlParams['lockdown'] == '1')
{
	urlParams['picker'] = '0';
	urlParams['gapi'] = '0';
	urlParams['db'] = '0';
	urlParams['od'] = '0';
	urlParams['gh'] = '0';
	urlParams['gl'] = '0';
	urlParams['tr'] = '0';
}
// Do not insert code between above and below blocks
// se mode. Ensure this comes after the block above. 
if (window.location.hostname == 'se.diagrams.net')
{
	urlParams['db'] = '0';
	urlParams['od'] = '0';
	urlParams['gh'] = '0';
	urlParams['gl'] = '0';
	urlParams['tr'] = '0';
	urlParams['plugins'] = '0';
	urlParams['mode'] = 'google';
	urlParams['lockdown'] = '1'; // Do not want to apply lockdown true to above block

	window.DRAWIO_GOOGLE_APP_ID = window.DRAWIO_GOOGLE_APP_ID || '184079235871';
	window.DRAWIO_GOOGLE_CLIENT_ID = window.DRAWIO_GOOGLE_CLIENT_ID || '184079235871-pjf5nn0lff27lk8qf0770gmffiv9gt61.apps.googleusercontent.com';
}

// Disables Trello client by default
if (urlParams['mode'] == 'trello')
{
	urlParams['tr'] = '1';
}

// Uses embed mode on embed domain
if (window.location.hostname == 'embed.diagrams.net')
{
	urlParams['embed'] = '1';
}

// Fallback for cases where the hash property is not available
if ((window.location.hash == null || window.location.hash.length <= 1) &&
	urlParams['open'] != null)
{
	window.location.hash = urlParams['open'];
}
