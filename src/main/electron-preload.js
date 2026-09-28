const {
    contextBridge,
    ipcRenderer
} = require("electron");

// One-shot migration: when the main process determines this is the first
// launch with the new defaultAdaptiveColors behaviour, it passes the chosen
// mode here via webPreferences.additionalArguments. We seed it into the
// drawio Configuration JSON in localStorage (key '.configuration') so that
// Editor.configure() picks it up during App.js boot. We never overwrite an
// explicit value the user may have already set via Extras > Configuration.
try
{
	const flagPrefix = '--initial-adaptive-colors=';
	const flagArg = process.argv.find(a => a.startsWith(flagPrefix));

	if (flagArg)
	{
		const mode = flagArg.slice(flagPrefix.length);

		if (mode === 'auto' || mode === 'simple' || mode === 'none')
		{
			const raw = window.localStorage.getItem('.configuration');
			const cfg = raw ? JSON.parse(raw) : {};

			if (cfg.defaultAdaptiveColors == null)
			{
				cfg.defaultAdaptiveColors = mode;
				window.localStorage.setItem('.configuration', JSON.stringify(cfg));
			}
		}
	}
}
catch (e)
{
	// Don't block app startup if the migration fails for any reason.
	console.error('Failed to seed defaultAdaptiveColors:', e);
}

// Navigations to about: URLs (about:blank, about:srcdoc) never reach
// will-navigate in the main process, as Chromium commits them without a
// network request, and cannot be stopped there. Without this, a link,
// window.open('about:blank', '_self') or top.location from an iframe or popup
// replaces the editor with a blank page. The listener is in the isolated
// world, so page scripts cannot remove it.
if (window.navigation != null)
{
	window.navigation.addEventListener('navigate', (e) =>
	{
		if (/^about:/i.test(e.destination.url))
		{
			e.preventDefault();
		}
	});
}

let reqId = 1;
let reqInfo = {};
let fileChangedListeners = {};

ipcRenderer.on('mainResp', (event, resp) => 
{
	var callbacks = reqInfo[resp.reqId];
	
	if (resp.error)
	{
		callbacks.error(resp.msg, resp.e);
	}
	else
	{
		callbacks.callback(resp.data);
	}
	
	delete reqInfo[resp.reqId];
});

ipcRenderer.on('fileChanged', (event, resp) => 
{
	var listener = fileChangedListeners[resp.path];
	
	if (listener)
	{
		listener(resp.curr, resp.prev);
	}
});

contextBridge.exposeInMainWorld(
    'electron', {
        request: (msg, callback, error) => 
		{
			msg.reqId = reqId++;
			reqInfo[msg.reqId] = {callback: callback, error: error};

			//TODO Maybe a special function for this better than this hack?
			//File watch special case where the callback is called multiple times
			if (msg.action == 'watchFile')
			{
				fileChangedListeners[msg.path] = msg.listener;
				delete msg.listener;
			}

			ipcRenderer.send('rendererReq', msg);
        },
		registerMsgListener: function(action, callback)
		{
			ipcRenderer.on(action, function(event, args)
			{
				callback(args);
			});
		},
		sendMessage: function(action, args)
		{
			ipcRenderer.send(action, args);
		},
		listenOnce: function(action, callback)
		{
			ipcRenderer.once(action, function(event, args)
			{
				callback(args);
			});
		}
    }
);

contextBridge.exposeInMainWorld(
    'process', {
		type: process.type,
		versions: process.versions
	}
);
