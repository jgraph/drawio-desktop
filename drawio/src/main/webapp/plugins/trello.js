/**
 * Explore plugin.
 */
Draw.loadPlugin(function(editorUi)
{
	// Trello plugin only works in embed mode
	if (editorUi.actions.get('exit') == null)
	{
		return;
	}
	
	// Overridden to redirect modified check to file
	editorUi.actions.get('exit').funct = function()
	{
		var fn = function()
		{
			var parent = window.opener || window.parent;
			parent.postMessage(JSON.stringify({event: 'exit'}), '*');
		}
		
		var file = editorUi.getCurrentFile();
		
		if (file == null || !file.isModified())
		{
			fn();
		}
		else
		{
			editorUi.confirm(mxResources.get('allChangesLost'), null, fn,
				mxResources.get('cancel'), mxResources.get('discardChanges'));
		}
	};
	
	editorUi.showSplash = function()
	{
		this.actions.get('exit').funct();
	};
	
	function main()
	{
		var name = (urlParams['filename'] != null) ? decodeURIComponent(urlParams['filename']) : null;
		var card = (urlParams['card'] != null) ? decodeURIComponent(urlParams['card']) : null;
		var template = (urlParams['template'] != null) ? decodeURIComponent(urlParams['template']) : null;

		if (name != null && card != null)
		{
			var doCreateFile = function(templateData)
			{
				editorUi.createFile(name, templateData ||
					editorUi.getFileData(/(\.xml)$/i.test(name) ||
					name.indexOf('.') < 0, /(\.svg)$/i.test(name),
					/(\.html)$/i.test(name)), null, 'trello',
					null, true, card);
			};
			
			if (template != null)
			{
				editorUi.trello.getFile(card + editorUi.trello.SEPARATOR +
					template, function(file)
				{
					doCreateFile(file.getData());
				}, function()
				{
					doCreateFile();
				});
			}
			else
			{
				doCreateFile();
			}
		}
		else if (window.location.hash.substring(0, 2) == '#T')
		{
			editorUi.loadFile(editorUi.getDiagramId(), true);
		}

		editorUi.addEmbedButtons();
	};

	// Waits for Trello client
	if (editorUi.trello == null)
	{
		var waitForTrello = function()
		{
			if (editorUi.trello != null)
			{
				editorUi.removeListener(waitForTrello);
				main();
			}
		};
		
		// Waits for Trello client to load
		editorUi.addListener('clientLoaded', waitForTrello);
	}
	else
	{
		main();
	}
});
