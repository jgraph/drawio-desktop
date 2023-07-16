/**
 * Copyright (c) 2006-2012, JGraph Ltd
 */
/**
 * Editor constructor executed on page load.
 */
Editor = function(chromeless, themes, model, graph, editable)
{
	mxEventSource.call(this);
	this.chromeless = (chromeless != null) ? chromeless : this.chromeless;
	this.initStencilRegistry();
	this.graph = graph || this.createGraph(themes, model);
	this.editable = (editable != null) ? editable : !chromeless;
	this.undoManager = this.createUndoManager();
	this.status = '';

	this.getOrCreateFilename = function()
	{
		return this.filename || mxResources.get('drawing', [Editor.pageCounter]) + '.xml';
	};
	
	this.getFilename = function()
	{
		return this.filename;
	};
	
	// Sets the status and fires a statusChanged event
	this.setStatus = function(value, fn)
	{
		this.status = value;
		this.statusFunction = fn;
		this.fireEvent(new mxEventObject('statusChanged'));
	};
	
	// Returns the current status
	this.getStatus = function()
	{
		return this.status;
	};

	// Updates modified state if graph changes
	this.graphChangeListener = function(sender, eventObject) 
	{
		var edit = (eventObject != null) ? eventObject.getProperty('edit') : null;
				
		if (edit == null || !edit.ignoreEdit)
		{
			this.setModified(true);
		}
	};
	
	this.graph.getModel().addListener(mxEvent.CHANGE, mxUtils.bind(this, function()
	{
		this.graphChangeListener.apply(this, arguments);
	}));

	// Sets persistent graph state defaults
	this.graph.resetViewOnRootChange = false;
	this.init();
};

/**
 * Counts open editor tabs (must be global for cross-window access)
 */
Editor.pageCounter = 0;

// Cross-domain window access is not allowed in FF, so if we
// were opened from another domain then this will fail.
(function()
{
	try
	{
		var op = window;

		while (op.opener != null && typeof op.opener.Editor !== 'undefined' &&
			!isNaN(op.opener.Editor.pageCounter) &&	
			// Workaround for possible infinite loop in FF https://drawio.atlassian.net/browse/DS-795
			op.opener != op)
		{
			op = op.opener;
		}
		
		// Increments the counter in the first opener in the chain
		if (op != null)
		{
			op.Editor.pageCounter++;
			Editor.pageCounter = op.Editor.pageCounter;
		}
	}
	catch (e)
	{
		// ignore
	}
})();

/**
 * 
 */
Editor.defaultHtmlFont = '-apple-system, BlinkMacSystemFont, "Segoe UI Variable", "Segoe UI", system-ui, ui-sans-serif, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"';

/**
 * Specifies if local storage should be used (eg. on the iPad which has no filesystem)
 */
Editor.useLocalStorage = typeof(Storage) != 'undefined' && mxClient.IS_IOS;

/**
 * Window width for simple mode to collapse panels.
 */
Editor.smallScreenWidth = 800;

/**
 * 
 */
Editor.lightCheckmarkImage = 'data:image/gif;base64,R0lGODlhFQAVAMQfAGxsbHx8fIqKioaGhvb29nJycvr6+sDAwJqamltbW5OTk+np6YGBgeTk5Ly8vJiYmP39/fLy8qWlpa6ursjIyOLi4vj4+N/f3+3t7fT09LCwsHZ2dubm5r6+vmZmZv///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OEY4NTZERTQ5QUFBMTFFMUE5MTVDOTM5MUZGMTE3M0QiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OEY4NTZERTU5QUFBMTFFMUE5MTVDOTM5MUZGMTE3M0QiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4Rjg1NkRFMjlBQUExMUUxQTkxNUM5MzkxRkYxMTczRCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4Rjg1NkRFMzlBQUExMUUxQTkxNUM5MzkxRkYxMTczRCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQzMjEwLy4tLCsqKSgnJiUkIyIhIB8eHRwbGhkYFxYVFBMSERAPDg0MCwoJCAcGBQQDAgEAACH5BAEAAB8ALAAAAAAVABUAAAVI4CeOZGmeaKqubKtylktSgCOLRyLd3+QJEJnh4VHcMoOfYQXQLBcBD4PA6ngGlIInEHEhPOANRkaIFhq8SuHCE1Hb8Lh8LgsBADs=';
Editor.darkCheckmarkImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAMAAACeyVWkAAAARVBMVEUAAACZmZkICAgEBASNjY2Dg4MYGBiTk5N5eXl1dXVmZmZQUFBCQkI3NzceHh4MDAykpKSJiYl+fn5sbGxaWlo/Pz8SEhK96uPlAAAAAXRSTlMAQObYZgAAAE5JREFUGNPFzTcSgDAQQ1HJGUfy/Y9K7V1qeOUfzQifCQZai1XHaz11LFysbDbzgDSSWMZiETz3+b8yNUc/MMsktxuC8XQBSncdLwz+8gCCggGXzBcozAAAAABJRU5ErkJggg==';
Editor.darkHelpImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAP1BMVEUAAAD///////////////////////////////////////////////////////////////////////////////9Du/pqAAAAFXRSTlMAT30qCJRBboyDZyCgRzUUdF46MJlgXETgAAAAeklEQVQY022O2w4DIQhEQUURda/9/28tUO2+7CQS5sgQ4F1RapX78YUwRqQjTU8ILqQfKerTKTvACJ4nLX3krt+8aS82oI8aQC4KavRgtvEW/mDvsICgA03PSGRr79MqX1YPNIxzjyqtw8ZnnRo4t5a5undtJYRywau+ds4Cyza3E6YAAAAASUVORK5CYII=';
Editor.lightHelpImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSJub25lIiBkPSJNMCAwaDI0djI0SDB6Ii8+PHBhdGggZD0iTTExIDE4aDJ2LTJoLTJ2MnptMS0xNkM2LjQ4IDIgMiA2LjQ4IDIgMTJzNC40OCAxMCAxMCAxMCAxMC00LjQ4IDEwLTEwUzE3LjUyIDIgMTIgMnptMCAxOGMtNC40MSAwLTgtMy41OS04LThzMy41OS04IDgtOCA4IDMuNTkgOCA4LTMuNTkgOC04IDh6bTAtMTRjLTIuMjEgMC00IDEuNzktNCA0aDJjMC0xLjEuOS0yIDItMnMyIC45IDIgMmMwIDItMyAxLjc1LTMgNWgyYzAtMi4yNSAzLTIuNSAzLTUgMC0yLjIxLTEuNzktNC00LTR6Ii8+PC9zdmc+';
Editor.menuImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjRweCIgZmlsbD0iIzAwMDAwMCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTMgMThoMTh2LTJIM3Yyem0wLTVoMTh2LTJIM3Yyem0wLTd2MmgxOFY2SDN6Ii8+PC9zdmc+';
Editor.moveImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI4cHgiIGhlaWdodD0iMjhweCI+PGc+PC9nPjxnPjxnPjxnPjxwYXRoIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIuNCwyLjQpc2NhbGUoMC44KXJvdGF0ZSg0NSwxMiwxMikiIHN0cm9rZT0iIzI5YjZmMiIgZmlsbD0iIzI5YjZmMiIgZD0iTTE1LDNsMi4zLDIuM2wtMi44OSwyLjg3bDEuNDIsMS40MkwxOC43LDYuN0wyMSw5VjNIMTV6IE0zLDlsMi4zLTIuM2wyLjg3LDIuODlsMS40Mi0xLjQyTDYuNyw1LjNMOSwzSDNWOXogTTksMjEgbC0yLjMtMi4zbDIuODktMi44N2wtMS40Mi0xLjQyTDUuMywxNy4zTDMsMTV2Nkg5eiBNMjEsMTVsLTIuMywyLjNsLTIuODctMi44OWwtMS40MiwxLjQybDIuODksMi44N0wxNSwyMWg2VjE1eiIvPjwvZz48L2c+PC9nPjwvc3ZnPgo=';
Editor.zoomInImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTUuNSAxNGgtLjc5bC0uMjgtLjI3QzE1LjQxIDEyLjU5IDE2IDExLjExIDE2IDkuNSAxNiA1LjkxIDEzLjA5IDMgOS41IDNTMyA1LjkxIDMgOS41IDUuOTEgMTYgOS41IDE2YzEuNjEgMCAzLjA5LS41OSA0LjIzLTEuNTdsLjI3LjI4di43OWw1IDQuOTlMMjAuNDkgMTlsLTQuOTktNXptLTYgMEM3LjAxIDE0IDUgMTEuOTkgNSA5LjVTNy4wMSA1IDkuNSA1IDE0IDcuMDEgMTQgOS41IDExLjk5IDE0IDkuNSAxNHptMi41LTRoLTJ2Mkg5di0ySDdWOWgyVjdoMXYyaDJ2MXoiLz48L3N2Zz4=';
Editor.zoomOutImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTUuNSAxNGgtLjc5bC0uMjgtLjI3QzE1LjQxIDEyLjU5IDE2IDExLjExIDE2IDkuNSAxNiA1LjkxIDEzLjA5IDMgOS41IDNTMyA1LjkxIDMgOS41IDUuOTEgMTYgOS41IDE2YzEuNjEgMCAzLjA5LS41OSA0LjIzLTEuNTdsLjI3LjI4di43OWw1IDQuOTlMMjAuNDkgMTlsLTQuOTktNXptLTYgMEM3LjAxIDE0IDUgMTEuOTkgNSA5LjVTNy4wMSA1IDkuNSA1IDE0IDcuMDEgMTQgOS41IDExLjk5IDE0IDkuNSAxNHpNNyA5aDV2MUg3eiIvPjwvc3ZnPg==';
Editor.fullscreenImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMyA1djRoMlY1aDRWM0g1Yy0xLjEgMC0yIC45LTIgMnptMiAxMEgzdjRjMCAxLjEuOSAyIDIgMmg0di0ySDV2LTR6bTE0IDRoLTR2Mmg0YzEuMSAwIDItLjkgMi0ydi00aC0ydjR6bTAtMTZoLTR2Mmg0djRoMlY1YzAtMS4xLS45LTItMi0yeiIvPjwvc3ZnPg==';
Editor.fullscreenExitImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjRweCIgZmlsbD0iIzAwMDAwMCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTUgMTZoM3YzaDJ2LTVINXYyem0zLThINXYyaDVWNUg4djN6bTYgMTFoMnYtM2gzdi0yaC01djV6bTItMTFWNWgtMnY1aDVWOGgtM3oiLz48L3N2Zz4=';
Editor.zoomFitImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMThweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMThweCIgZmlsbD0iIzAwMDAwMCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTUgMTVIM3Y0YzAgMS4xLjkgMiAyIDJoNHYtMkg1di00ek01IDVoNFYzSDVjLTEuMSAwLTIgLjktMiAydjRoMlY1em03IDNjLTIuMjEgMC00IDEuNzktNCA0czEuNzkgNCA0IDQgNC0xLjc5IDQtNC0xLjc5LTQtNC00em0wIDZjLTEuMSAwLTItLjktMi0ycy45LTIgMi0yIDIgLjkgMiAyLS45IDItMiAyem03LTExaC00djJoNHY0aDJWNWMwLTEuMS0uOS0yLTItMnptMCAxNmgtNHYyaDRjMS4xIDAgMi0uOSAyLTJ2LTRoLTJ2NHoiLz48L3N2Zz4=';
Editor.layersImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMThweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMThweCIgZmlsbD0iIzAwMDAwMCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTExLjk5IDE4LjU0bC03LjM3LTUuNzNMMyAxNC4wN2w5IDcgOS03LTEuNjMtMS4yN3pNMTIgMTZsNy4zNi01LjczTDIxIDlsLTktNy05IDcgMS42MyAxLjI3TDEyIDE2em0wLTExLjQ3TDE3Ljc0IDkgMTIgMTMuNDcgNi4yNiA5IDEyIDQuNTN6Ii8+PC9zdmc+';
Editor.previousImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMThweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMThweCIgZmlsbD0iIzAwMDAwMCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTE1LjQxIDcuNDFMMTQgNmwtNiA2IDYgNiAxLjQxLTEuNDFMMTAuODMgMTJsNC41OC00LjU5eiIvPjwvc3ZnPg==';
Editor.nextImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMThweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMThweCIgZmlsbD0iIzAwMDAwMCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTEwIDZMOC41OSA3LjQxIDEzLjE3IDEybC00LjU4IDQuNTlMMTAgMThsNi02LTYtNnoiLz48L3N2Zz4=';
Editor.editImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMThweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMThweCIgZmlsbD0iIzAwMDAwMCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTE0LjA2IDkuMDJsLjkyLjkyTDUuOTIgMTlINXYtLjkybDkuMDYtOS4wNk0xNy42NiAzYy0uMjUgMC0uNTEuMS0uNy4yOWwtMS44MyAxLjgzIDMuNzUgMy43NSAxLjgzLTEuODNjLjM5LS4zOS4zOS0xLjAyIDAtMS40MWwtMi4zNC0yLjM0Yy0uMi0uMi0uNDUtLjI5LS43MS0uMjl6bS0zLjYgMy4xOUwzIDE3LjI1VjIxaDMuNzVMMTcuODEgOS45NGwtMy43NS0zLjc1eiIvPjwvc3ZnPg==';
Editor.duplicateImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMThweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMThweCIgZmlsbD0iIzAwMDAwMCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTE2IDFINGMtMS4xIDAtMiAuOS0yIDJ2MTRoMlYzaDEyVjF6bTMgNEg4Yy0xLjEgMC0yIC45LTIgMnYxNGMwIDEuMS45IDIgMiAyaDExYzEuMSAwIDItLjkgMi0yVjdjMC0xLjEtLjktMi0yLTJ6bTAgMTZIOFY3aDExdjE0eiIvPjwvc3ZnPg==';
Editor.addImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMThweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMThweCIgZmlsbD0iIzAwMDAwMCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTE5IDEzaC02djZoLTJ2LTZINXYtMmg2VjVoMnY2aDZ2MnoiLz48L3N2Zz4=';
Editor.crossImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMThweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMThweCIgZmlsbD0iIzAwMDAwMCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTE5IDYuNDFMMTcuNTkgNSAxMiAxMC41OSA2LjQxIDUgNSA2LjQxIDEwLjU5IDEyIDUgMTcuNTkgNi40MSAxOSAxMiAxMy40MSAxNy41OSAxOSAxOSAxNy41OSAxMy40MSAxMiAxOSA2LjQxeiIvPjwvc3ZnPg==';
Editor.verticalDotsImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMThweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMThweCIgZmlsbD0iIzAwMDAwMCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTEyIDhjMS4xIDAgMi0uOSAyLTJzLS45LTItMi0yLTIgLjktMiAyIC45IDIgMiAyem0wIDJjLTEuMSAwLTIgLjktMiAycy45IDIgMiAyIDItLjkgMi0yLS45LTItMi0yem0wIDZjLTEuMSAwLTIgLjktMiAycy45IDIgMiAyIDItLjkgMi0yLS45LTItMi0yeiIvPjwvc3ZnPg==';
Editor.trashImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMThweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMThweCIgZmlsbD0iIzAwMDAwMCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTE2IDl2MTBIOFY5aDhtLTEuNS02aC01bC0xIDFINXYyaDE0VjRoLTMuNWwtMS0xek0xOCA3SDZ2MTJjMCAxLjEuOSAyIDIgMmg4YzEuMSAwIDItLjkgMi0yVjd6Ii8+PC9zdmc+';
Editor.hiddenImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMThweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMThweCIgZmlsbD0iIzAwMDAwMCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6bTAgMGgyNHYyNEgwVjB6bTAgMGgyNHYyNEgwVjB6bTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTEyIDZjMy43OSAwIDcuMTcgMi4xMyA4LjgyIDUuNS0uNTkgMS4yMi0xLjQyIDIuMjctMi40MSAzLjEybDEuNDEgMS40MWMxLjM5LTEuMjMgMi40OS0yLjc3IDMuMTgtNC41M0MyMS4yNyA3LjExIDE3IDQgMTIgNGMtMS4yNyAwLTIuNDkuMi0zLjY0LjU3bDEuNjUgMS42NUMxMC42NiA2LjA5IDExLjMyIDYgMTIgNnptLTEuMDcgMS4xNEwxMyA5LjIxYy41Ny4yNSAxLjAzLjcxIDEuMjggMS4yOGwyLjA3IDIuMDdjLjA4LS4zNC4xNC0uNy4xNC0xLjA3QzE2LjUgOS4wMSAxNC40OCA3IDEyIDdjLS4zNyAwLS43Mi4wNS0xLjA3LjE0ek0yLjAxIDMuODdsMi42OCAyLjY4QzMuMDYgNy44MyAxLjc3IDkuNTMgMSAxMS41IDIuNzMgMTUuODkgNyAxOSAxMiAxOWMxLjUyIDAgMi45OC0uMjkgNC4zMi0uODJsMy40MiAzLjQyIDEuNDEtMS40MUwzLjQyIDIuNDUgMi4wMSAzLjg3em03LjUgNy41bDIuNjEgMi42MWMtLjA0LjAxLS4wOC4wMi0uMTIuMDItMS4zOCAwLTIuNS0xLjEyLTIuNS0yLjUgMC0uMDUuMDEtLjA4LjAxLS4xM3ptLTMuNC0zLjRsMS43NSAxLjc1Yy0uMjMuNTUtLjM2IDEuMTUtLjM2IDEuNzggMCAyLjQ4IDIuMDIgNC41IDQuNSA0LjUuNjMgMCAxLjIzLS4xMyAxLjc3LS4zNmwuOTguOThjLS44OC4yNC0xLjguMzgtMi43NS4zOC0zLjc5IDAtNy4xNy0yLjEzLTguODItNS41LjctMS40MyAxLjcyLTIuNjEgMi45My0zLjUzeiIvPjwvc3ZnPg==';
Editor.visibleImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMThweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMThweCIgZmlsbD0iIzAwMDAwMCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTEyIDZjMy43OSAwIDcuMTcgMi4xMyA4LjgyIDUuNUMxOS4xNyAxNC44NyAxNS43OSAxNyAxMiAxN3MtNy4xNy0yLjEzLTguODItNS41QzQuODMgOC4xMyA4LjIxIDYgMTIgNm0wLTJDNyA0IDIuNzMgNy4xMSAxIDExLjUgMi43MyAxNS44OSA3IDE5IDEyIDE5czkuMjctMy4xMSAxMS03LjVDMjEuMjcgNy4xMSAxNyA0IDEyIDR6bTAgNWMxLjM4IDAgMi41IDEuMTIgMi41IDIuNVMxMy4zOCAxNCAxMiAxNHMtMi41LTEuMTItMi41LTIuNVMxMC42MiA5IDEyIDltMC0yYy0yLjQ4IDAtNC41IDIuMDItNC41IDQuNVM5LjUyIDE2IDEyIDE2czQuNS0yLjAyIDQuNS00LjVTMTQuNDggNyAxMiA3eiIvPjwvc3ZnPg==';
Editor.lockedImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMThweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMThweCIgZmlsbD0iIzAwMDAwMCI+PGcgZmlsbD0ibm9uZSI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6Ii8+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBvcGFjaXR5PSIuODciLz48L2c+PHBhdGggZD0iTTE4IDhoLTFWNmMwLTIuNzYtMi4yNC01LTUtNVM3IDMuMjQgNyA2djJINmMtMS4xIDAtMiAuOS0yIDJ2MTBjMCAxLjEuOSAyIDIgMmgxMmMxLjEgMCAyLS45IDItMlYxMGMwLTEuMS0uOS0yLTItMnpNOSA2YzAtMS42NiAxLjM0LTMgMy0zczMgMS4zNCAzIDN2Mkg5VjZ6bTkgMTRINlYxMGgxMnYxMHptLTYtM2MxLjEgMCAyLS45IDItMnMtLjktMi0yLTItMiAuOS0yIDIgLjkgMiAyIDJ6Ii8+PC9zdmc+';
Editor.unlockedImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjRweCIgZmlsbD0iIzAwMDAwMCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTE4IDhoLTFWNmMwLTIuNzYtMi4yNC01LTUtNVM3IDMuMjQgNyA2aDJjMC0xLjY2IDEuMzQtMyAzLTNzMyAxLjM0IDMgM3YySDZjLTEuMSAwLTIgLjktMiAydjEwYzAgMS4xLjkgMiAyIDJoMTJjMS4xIDAgMi0uOSAyLTJWMTBjMC0xLjEtLjktMi0yLTJ6bTAgMTJINlYxMGgxMnYxMHptLTYtM2MxLjEgMCAyLS45IDItMnMtLjktMi0yLTItMiAuOS0yIDIgLjkgMiAyIDJ6Ii8+PC9zdmc+';
Editor.printImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMThweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMThweCIgZmlsbD0iIzAwMDAwMCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTE5IDhoLTFWM0g2djVINWMtMS42NiAwLTMgMS4zNC0zIDN2Nmg0djRoMTJ2LTRoNHYtNmMwLTEuNjYtMS4zNC0zLTMtM3pNOCA1aDh2M0g4VjV6bTggMTJ2Mkg4di00aDh2MnptMi0ydi0ySDZ2Mkg0di00YzAtLjU1LjQ1LTEgMS0xaDE0Yy41NSAwIDEgLjQ1IDEgMXY0aC0yeiIvPjxjaXJjbGUgY3g9IjE4IiBjeT0iMTEuNSIgcj0iMSIvPjwvc3ZnPg==';
Editor.refreshImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMThweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMThweCIgZmlsbD0iIzAwMDAwMCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTE3LjY1IDYuMzVDMTYuMiA0LjkgMTQuMjEgNCAxMiA0Yy00LjQyIDAtNy45OSAzLjU4LTcuOTkgOHMzLjU3IDggNy45OSA4YzMuNzMgMCA2Ljg0LTIuNTUgNy43My02aC0yLjA4Yy0uODIgMi4zMy0zLjA0IDQtNS42NSA0LTMuMzEgMC02LTIuNjktNi02czIuNjktNiA2LTZjMS42NiAwIDMuMTQuNjkgNC4yMiAxLjc4TDEzIDExaDdWNGwtMi4zNSAyLjM1eiIvPjwvc3ZnPg==';
Editor.backImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMThweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMThweCIgZmlsbD0iIzAwMDAwMCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIiBvcGFjaXR5PSIuODciLz48cGF0aCBkPSJNMTcuNTEgMy44N0wxNS43MyAyLjEgNS44NCAxMmw5LjkgOS45IDEuNzctMS43N0w5LjM4IDEybDguMTMtOC4xM3oiLz48L3N2Zz4=';
Editor.closeImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMThweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMThweCIgZmlsbD0iIzAwMDAwMCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIiBvcGFjaXR5PSIuODciLz48cGF0aCBkPSJNMTIgMkM2LjQ3IDIgMiA2LjQ3IDIgMTJzNC40NyAxMCAxMCAxMCAxMC00LjQ3IDEwLTEwUzE3LjUzIDIgMTIgMnptMCAxOGMtNC40MSAwLTgtMy41OS04LThzMy41OS04IDgtOCA4IDMuNTkgOCA4LTMuNTkgOC04IDh6bTMuNTktMTNMMTIgMTAuNTkgOC40MSA3IDcgOC40MSAxMC41OSAxMiA3IDE1LjU5IDguNDEgMTcgMTIgMTMuNDEgMTUuNTkgMTcgMTcgMTUuNTkgMTMuNDEgMTIgMTcgOC40MXoiLz48L3N2Zz4='
Editor.closeBlackImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjZweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjZweCI+PGVsbGlwc2UgY3g9IjEyIiBjeT0iMTIiIHJ4PSI5IiByeT0iOSIgc3Ryb2tlPSJub25lIiBmaWxsPSIjMDAwIi8+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTE0LjU5IDhMMTIgMTAuNTkgOS40MSA4IDggOS40MSAxMC41OSAxMiA4IDE0LjU5IDkuNDEgMTYgMTIgMTMuNDEgMTQuNTkgMTYgMTYgMTQuNTkgMTMuNDEgMTIgMTYgOS40MSAxNC41OSA4ek0xMiAyQzYuNDcgMiAyIDYuNDcgMiAxMnM0LjQ3IDEwIDEwIDEwIDEwLTQuNDcgMTAtMTBTMTcuNTMgMiAxMiAyem0wIDE4Yy00LjQxIDAtOC0zLjU5LTgtOHMzLjU5LTggOC04IDggMy41OSA4IDgtMy41OSA4LTggOHoiLz48L3N2Zz4=';
Editor.minusImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNDgiIHdpZHRoPSI0OCI+PHBhdGggZD0iTTEwIDI1LjV2LTNoMjh2M1oiLz48L3N2Zz4=';
Editor.plusImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTkgMTNoLTZ2NmgtMnYtNkg1di0yaDZWNWgydjZoNnYyeiIvPjwvc3ZnPg==';
Editor.addBoxImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjQiIHdpZHRoPSIyNCI+PHBhdGggZD0iTTExIDE3aDJ2LTRoNHYtMmgtNFY3aC0ydjRIN3YyaDRabS02IDRxLS44MjUgMC0xLjQxMy0uNTg3UTMgMTkuODI1IDMgMTlWNXEwLS44MjUuNTg3LTEuNDEzUTQuMTc1IDMgNSAzaDE0cS44MjUgMCAxLjQxMy41ODdRMjEgNC4xNzUgMjEgNXYxNHEwIC44MjUtLjU4NyAxLjQxM1ExOS44MjUgMjEgMTkgMjFabTAtMmgxNFY1SDV2MTRaTTUgNXYxNFY1WiIvPjwvc3ZnPg==';
Editor.shapesImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjQiIHdpZHRoPSIyNCI+PHBhdGggZD0iTTE1IDE1Wm0tNyAyLjk1cS4yNS4wMjUuNDg4LjAzOFE4LjcyNSAxOCA5IDE4dC41MTItLjAxMnEuMjM4LS4wMTMuNDg4LS4wMzhWMjBoMTBWMTBoLTIuMDVxLjAyNS0uMjUuMDM4LS40ODhRMTggOS4yNzUgMTggOXQtLjAxMi0uNTEyUTE3Ljk3NSA4LjI1IDE3Ljk1IDhIMjBxLjgyNSAwIDEuNDEzLjU4N1EyMiA5LjE3NSAyMiAxMHYxMHEwIC44MjUtLjU4NyAxLjQxM1EyMC44MjUgMjIgMjAgMjJIMTBxLS44MjUgMC0xLjQxMi0uNTg3UTggMjAuODI1IDggMjBaTTkgMTZxLTIuOTI1IDAtNC45NjMtMi4wMzhRMiAxMS45MjUgMiA5dDIuMDM3LTQuOTYzUTYuMDc1IDIgOSAycTIuOTI1IDAgNC45NjMgMi4wMzdRMTYgNi4wNzUgMTYgOXEwIDIuOTI1LTIuMDM3IDQuOTYyUTExLjkyNSAxNiA5IDE2Wm0wLTJxMi4wNzUgMCAzLjUzOC0xLjQ2M1ExNCAxMS4wNzUgMTQgOXQtMS40NjItMy41MzdRMTEuMDc1IDQgOSA0IDYuOTI1IDQgNS40NjMgNS40NjMgNCA2LjkyNSA0IDl0MS40NjMgMy41MzdRNi45MjUgMTQgOSAxNFptMC01WiIvPjwvc3ZnPg==';
Editor.formatImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjQiIHdpZHRoPSIyNCI+PHBhdGggZD0iTTExIDIycS0uODI1IDAtMS40MTItLjU4N1E5IDIwLjgyNSA5IDIwdi00SDZxLS44MjUgMC0xLjQxMi0uNTg4UTQgMTQuODI1IDQgMTRWN3EwLTEuNjUgMS4xNzUtMi44MjVRNi4zNSAzIDggM2gxMnYxMXEwIC44MjUtLjU4NyAxLjQxMlExOC44MjUgMTYgMTggMTZoLTN2NHEwIC44MjUtLjU4NyAxLjQxM1ExMy44MjUgMjIgMTMgMjJaTTYgMTBoMTJWNWgtMXY0aC0yVjVoLTF2MmgtMlY1SDhxLS44MjUgMC0xLjQxMi41ODhRNiA2LjE3NSA2IDdabTAgNGgxMnYtMkg2djJabTAtMnYyWiIvPjwvc3ZnPg==';
Editor.freehandImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjRweCIgZmlsbD0iIzAwMDAwMCI+PHJlY3QgZmlsbD0ibm9uZSIgaGVpZ2h0PSIyNCIgd2lkdGg9IjI0Ii8+PHBhdGggZD0iTTQuNSw4YzEuMDQsMCwyLjM0LTEuNSw0LjI1LTEuNWMxLjUyLDAsMi43NSwxLjIzLDIuNzUsMi43NWMwLDIuMDQtMS45OSwzLjE1LTMuOTEsNC4yMkM1LjQyLDE0LjY3LDQsMTUuNTcsNCwxNyBjMCwxLjEsMC45LDIsMiwydjJjLTIuMjEsMC00LTEuNzktNC00YzAtMi43MSwyLjU2LTQuMTQsNC42Mi01LjI4YzEuNDItMC43OSwyLjg4LTEuNiwyLjg4LTIuNDdjMC0wLjQxLTAuMzQtMC43NS0wLjc1LTAuNzUgQzcuNSw4LjUsNi4yNSwxMCw0LjUsMTBDMy4xMiwxMCwyLDguODgsMiw3LjVDMiw1LjQ1LDQuMTcsMi44Myw1LDJsMS40MSwxLjQxQzUuNDEsNC40Miw0LDYuNDMsNCw3LjVDNCw3Ljc4LDQuMjIsOCw0LjUsOHogTTgsMjEgbDMuNzUsMGw4LjA2LTguMDZsLTMuNzUtMy43NUw4LDE3LjI1TDgsMjF6IE0xMCwxOC4wOGw2LjA2LTYuMDZsMC45MiwwLjkyTDEwLjkyLDE5TDEwLDE5TDEwLDE4LjA4eiBNMjAuMzcsNi4yOSBjLTAuMzktMC4zOS0xLjAyLTAuMzktMS40MSwwbC0xLjgzLDEuODNsMy43NSwzLjc1bDEuODMtMS44M2MwLjM5LTAuMzksMC4zOS0xLjAyLDAtMS40MUwyMC4zNyw2LjI5eiIvPjwvc3ZnPg==';
Editor.undoImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIuNSA4Yy0yLjY1IDAtNS4wNS45OS02LjkgMi42TDIgN3Y5aDlsLTMuNjItMy42MmMxLjM5LTEuMTYgMy4xNi0xLjg4IDUuMTItMS44OCAzLjU0IDAgNi41NSAyLjMxIDcuNiA1LjVsMi4zNy0uNzhDMjEuMDggMTEuMDMgMTcuMTUgOCAxMi41IDh6Ii8+PC9zdmc+';
Editor.redoImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTguNCAxMC42QzE2LjU1IDguOTkgMTQuMTUgOCAxMS41IDhjLTQuNjUgMC04LjU4IDMuMDMtOS45NiA3LjIyTDMuOSAxNmMxLjA1LTMuMTkgNC4wNS01LjUgNy42LTUuNSAxLjk1IDAgMy43My43MiA1LjEyIDEuODhMMTMgMTZoOVY3bC0zLjYgMy42eiIvPjwvc3ZnPg==';
Editor.outlineImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjQiIHdpZHRoPSIyNCI+PHBhdGggZD0ibTE1IDIxLTYtMi4xLTQuNjUgMS44cS0uNS4yLS45MjUtLjExM1EzIDIwLjI3NSAzIDE5Ljc1di0xNHEwLS4zMjUuMTg4LS41NzUuMTg3LS4yNS41MTItLjM3NUw5IDNsNiAyLjEgNC42NS0xLjhxLjUtLjIuOTI1LjExMi40MjUuMzEzLjQyNS44Mzh2MTRxMCAuMzI1LS4xODguNTc1LS4xODcuMjUtLjUxMi4zNzVabS0xLTIuNDVWNi44NWwtNC0xLjR2MTEuN1ptMiAwIDMtMVY1LjdsLTMgMS4xNVpNNSAxOC4zbDMtMS4xNVY1LjQ1bC0zIDFaTTE2IDYuODV2MTEuN1ptLTgtMS40djExLjdaIi8+PC9zdmc+';
Editor.saveImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMThweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMThweCIgZmlsbD0iIzAwMDAwMCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTE5IDEydjdINXYtN0gzdjdjMCAxLjEuOSAyIDIgMmgxNGMxLjEgMCAyLS45IDItMnYtN2gtMnptLTYgLjY3bDIuNTktMi41OEwxNyAxMS41bC01IDUtNS01IDEuNDEtMS40MUwxMSAxMi42N1YzaDJ2OS42N3oiLz48L3N2Zz4=';
Editor.compareImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNDgiIHdpZHRoPSI0OCI+PHBhdGggZD0ibTE1Ljg1IDQwLTIuMS0yLjEgNi4wNS02LjA1SDR2LTNoMTUuOGwtNi4wNS02LjA1IDIuMS0yLjEgOS42NSA5LjY1Wm0xNi4zLTEyLjctOS42NS05LjY1TDMyLjE1IDhsMi4xIDIuMS02LjA1IDYuMDVINDR2M0gyOC4ybDYuMDUgNi4wNVoiLz48L3N2Zz4=';
Editor.expandMoreImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjQiIHdpZHRoPSIyNCI+PHBhdGggZD0ibTEyIDE1LjM3NS02LTYgMS40LTEuNCA0LjYgNC42IDQuNi00LjYgMS40IDEuNFoiLz48L3N2Zz4=';
Editor.expandLessImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjQiIHdpZHRoPSIyNCI+PHBhdGggZD0ibTcuNCAxNS4zNzUtMS40LTEuNCA2LTYgNiA2LTEuNCAxLjQtNC42LTQuNloiLz48L3N2Zz4=';
Editor.gearImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjQiIHdpZHRoPSIyNCI+PHBhdGggZD0ibTkuMjUgMjItLjQtMy4ycS0uMzI1LS4xMjUtLjYxMi0uMy0uMjg4LS4xNzUtLjU2My0uMzc1TDQuNyAxOS4zNzVsLTIuNzUtNC43NSAyLjU3NS0xLjk1UTQuNSAxMi41IDQuNSAxMi4zMzd2LS42NzVxMC0uMTYyLjAyNS0uMzM3TDEuOTUgOS4zNzVsMi43NS00Ljc1IDIuOTc1IDEuMjVxLjI3NS0uMi41NzUtLjM3NS4zLS4xNzUuNi0uM2wuNC0zLjJoNS41bC40IDMuMnEuMzI1LjEyNS42MTMuMy4yODcuMTc1LjU2Mi4zNzVsMi45NzUtMS4yNSAyLjc1IDQuNzUtMi41NzUgMS45NXEuMDI1LjE3NS4wMjUuMzM3di42NzVxMCAuMTYzLS4wNS4zMzhsMi41NzUgMS45NS0yLjc1IDQuNzUtMi45NS0xLjI1cS0uMjc1LjItLjU3NS4zNzUtLjMuMTc1LS42LjNsLS40IDMuMlptMi44LTYuNXExLjQ1IDAgMi40NzUtMS4wMjVRMTUuNTUgMTMuNDUgMTUuNTUgMTJxMC0xLjQ1LTEuMDI1LTIuNDc1UTEzLjUgOC41IDEyLjA1IDguNXEtMS40NzUgMC0yLjQ4OCAxLjAyNVE4LjU1IDEwLjU1IDguNTUgMTJxMCAxLjQ1IDEuMDEyIDIuNDc1UTEwLjU3NSAxNS41IDEyLjA1IDE1LjVabTAtMnEtLjYyNSAwLTEuMDYyLS40MzgtLjQzOC0uNDM3LS40MzgtMS4wNjJ0LjQzOC0xLjA2MnEuNDM3LS40MzggMS4wNjItLjQzOHQxLjA2My40MzhxLjQzNy40MzcuNDM3IDEuMDYydC0uNDM3IDEuMDYycS0uNDM4LjQzOC0xLjA2My40MzhaTTEyIDEyWm0tMSA4aDEuOTc1bC4zNS0yLjY1cS43NzUtLjIgMS40MzgtLjU4OC42NjItLjM4NyAxLjIxMi0uOTM3bDIuNDc1IDEuMDI1Ljk3NS0xLjctMi4xNS0xLjYyNXEuMTI1LS4zNS4xNzUtLjczOC4wNS0uMzg3LjA1LS43ODd0LS4wNS0uNzg4cS0uMDUtLjM4Ny0uMTc1LS43MzdsMi4xNS0xLjYyNS0uOTc1LTEuNy0yLjQ3NSAxLjA1cS0uNTUtLjU3NS0xLjIxMi0uOTYzLS42NjMtLjM4Ny0xLjQzOC0uNTg3TDEzIDRoLTEuOTc1bC0uMzUgMi42NXEtLjc3NS4yLTEuNDM3LjU4Ny0uNjYzLjM4OC0xLjIxMy45MzhMNS41NSA3LjE1bC0uOTc1IDEuNyAyLjE1IDEuNnEtLjEyNS4zNzUtLjE3NS43NS0uMDUuMzc1LS4wNS44IDAgLjQuMDUuNzc1dC4xNzUuNzVsLTIuMTUgMS42MjUuOTc1IDEuNyAyLjQ3NS0xLjA1cS41NS41NzUgMS4yMTMuOTYyLjY2Mi4zODggMS40MzcuNTg4WiIvPjwvc3ZnPg==';
Editor.extensionImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjQiIHdpZHRoPSIyNCI+PHBhdGggZD0iTTguOCAyMUg1cS0uODI1IDAtMS40MTMtLjU4N1EzIDE5LjgyNSAzIDE5di0zLjhxMS4yIDAgMi4xLS43NjIuOS0uNzYzLjktMS45MzggMC0xLjE3NS0uOS0xLjkzOFE0LjIgOS44IDMgOS44VjZxMC0uODI1LjU4Ny0xLjQxMlE0LjE3NSA0IDUgNGg0cTAtMS4wNS43MjUtMS43NzVRMTAuNDUgMS41IDExLjUgMS41cTEuMDUgMCAxLjc3NS43MjVRMTQgMi45NSAxNCA0aDRxLjgyNSAwIDEuNDEzLjU4OFEyMCA1LjE3NSAyMCA2djRxMS4wNSAwIDEuNzc1LjcyNS43MjUuNzI1LjcyNSAxLjc3NSAwIDEuMDUtLjcyNSAxLjc3NVEyMS4wNSAxNSAyMCAxNXY0cTAgLjgyNS0uNTg3IDEuNDEzUTE4LjgyNSAyMSAxOCAyMWgtMy44cTAtMS4yNS0uNzg3LTIuMTI1UTEyLjYyNSAxOCAxMS41IDE4dC0xLjkxMi44NzVROC44IDE5Ljc1IDguOCAyMVpNNSAxOWgyLjEyNXEuNi0xLjY1IDEuOTI1LTIuMzI1UTEwLjM3NSAxNiAxMS41IDE2cTEuMTI1IDAgMi40NS42NzUgMS4zMjUuNjc1IDEuOTI1IDIuMzI1SDE4di02aDJxLjIgMCAuMzUtLjE1LjE1LS4xNS4xNS0uMzUgMC0uMi0uMTUtLjM1UTIwLjIgMTIgMjAgMTJoLTJWNmgtNlY0cTAtLjItLjE1LS4zNS0uMTUtLjE1LS4zNS0uMTUtLjIgMC0uMzUuMTVRMTEgMy44IDExIDR2Mkg1djIuMnExLjM1LjUgMi4xNzUgMS42NzVROCAxMS4wNSA4IDEyLjVxMCAxLjQyNS0uODI1IDIuNlQ1IDE2LjhabTcuNzUtNy43NVoiLz48L3N2Zz4=';
Editor.colorDropperImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iNDgiIHdpZHRoPSI0OCI+PHBhdGggZD0iTTYgNDJ2LTguNGwxOC44NS0xOC44NS0zLjYtMy42TDIzLjMgOS4xbDQuNiA0LjZMMzUgNi42cS41NS0uNTUgMS4xNzUtLjU1dDEuMTc1LjU1bDQuMDUgNC4wNXEuNTUuNTUuNTUgMS4xNzVUNDEuNCAxM2wtNy4xIDcuMSA0LjYgNC42LTIuMDUgMi4wNS0zLjYtMy42TDE0LjQgNDJabTMtM2g0LjM1TDMxLjEgMjEuMjVsLTQuMzUtNC4zNUw5IDM0LjY1Wm0yMy4xNS0yMSA2LjItNi4yLTIuMTUtMi4xNS02LjIgNi4yWm0wIDBMMzAgMTUuODUgMzIuMTUgMThaIi8+PC9zdmc+';
Editor.helpImage = Editor.lightHelpImage;
Editor.checkmarkImage = Editor.lightCheckmarkImage;

/**
 * All fill styles supported by rough.js.
 */
Editor.roughFillStyles = [{val: 'auto', dispName: 'Auto'}, {val: 'hachure', dispName: 'Hachure'},
	{val: 'solid', dispName: 'Solid'}, {val: 'zigzag', dispName: 'ZigZag'},
	{val: 'cross-hatch', dispName: 'Cross Hatch'}, {val: 'dashed', dispName: 'Dashed'},
	{val: 'zigzag-line', dispName: 'ZigZag Line'}];

/**
 * Fill styles for normal mode.
 */
Editor.fillStyles = [{val: 'auto', dispName: 'Auto'}, {val: 'hatch', dispName: 'Hatch'},
	{val: 'solid', dispName: 'Solid'}, {val: 'dots', dispName: 'Dots'}, 
	{val: 'cross-hatch', dispName: 'Cross Hatch'}, {val: 'dashed', dispName: 'Dashed'},
	{val: 'zigzag-line', dispName: 'ZigZag Line'}];

/**
 * Graph themes for the format panel.
 */
Editor.themes = null;

/**
 * Specifies the image URL to be used for the transparent background.
 */
Editor.ctrlKey = (mxClient.IS_MAC) ? 'Cmd' : 'Ctrl';

/**
 * Specifies the image URL to be used for the transparent background.
 */
Editor.hintOffset = 20;

/**
 * Delay in ms to show shape picker on hover over blue arrows.
 */
Editor.shapePickerHoverDelay = 300;

/**
 * Specifies the image URL to be used for the transparent background.
 */
Editor.fitWindowBorders = null;

/**
 * Specifies if the diagram should be saved automatically if possible. Default
 * is true.
 */
Editor.popupsAllowed = window.urlParams != null? urlParams['noDevice'] != '1' : true;

/**
 * Specifies if the html and whiteSpace styles should be removed on inserted cells.
 */
Editor.simpleLabels = false;
	
/**
 * Specifies if the native clipboard is enabled. Blocked in iframes for possible sandbox attribute.
 * LATER: Check if actually blocked.
 */
Editor.enableNativeCipboard = window == window.top && !mxClient.IS_FF && navigator.clipboard != null;
		
/**
 * Dynamic change of dark mode for minimal and sketch theme.
 */
Editor.sketchMode = false;

/**
 * Dynamic change of dark mode for minimal and sketch theme.
 */
Editor.enableCssDarkMode = true;

/**
 * Dynamic change of dark mode for minimal and sketch theme.
 */
Editor.cssDarkMode = false;

/**
 * Dynamic change of dark mode for minimal and sketch theme.
 */
Editor.darkMode = false;

/**
 * Dynamic change of dark mode for minimal and sketch theme.
 */
Editor.currentTheme = uiTheme;

/**
 * Dynamic change of dark mode for minimal and sketch theme.
 */
Editor.darkColor = (Editor.enableCssDarkMode) ? '#121212' : '#18141D';

/**
 * Dynamic change of dark mode for minimal and sketch theme.
 */
Editor.lightColor = '#f0f0f0';

/**
 * Returns the current state of the dark mode.
 */
Editor.isDarkMode = function(value)
{
	return Editor.darkMode;
};

/**
 * Returns true if the given URL is a PNG data URL.
 */
Editor.isPngDataUrl = function(url)
{
	return url != null && url.substring(0, 15) == 'data:image/png;'
};

/**
 * Returns true if the given binary data is a PNG file.
 */
Editor.isPngData = function(data)
{
	return data.length > 8 && data.charCodeAt(0) == 137 && data.charCodeAt(1) == 80 &&
		data.charCodeAt(2) == 78 && data.charCodeAt(3) == 71 && data.charCodeAt(4) == 13 &&
		data.charCodeAt(5) == 10 && data.charCodeAt(6) == 26 && data.charCodeAt(7) == 10;
};

/**
 * Converts HTML to plain text.
 */
Editor.convertHtmlToText = function(label)
{
	if (label != null)
	{
		var temp = document.createElement('div');
		temp.innerHTML = Graph.sanitizeHtml(label);

		return mxUtils.extractTextWithWhitespace(temp.childNodes)
	}
	else
	{
		return null;
	}
};

/**
 * Extracts the XML from the compressed or non-compressed text chunk.
 */
Editor.extractGraphModelFromPng = function(data)
{
	var result = null;
	
	try
	{
		var base64 = data.substring(data.indexOf(',') + 1);

		// Workaround for invalid character error in Safari
		var binary = (window.atob && !mxClient.IS_SF) ? atob(base64) : Base64.decode(base64, true);
		
		EditorUi.parsePng(binary, mxUtils.bind(this, function(pos, type, length)
		{
			var value = binary.substring(pos + 8, pos + 8 + length);
			
			if (type == 'zTXt')
			{
				var idx = value.indexOf(String.fromCharCode(0));
				
				if (value.substring(0, idx) == 'mxGraphModel')
				{
					// Workaround for Java URL Encoder using + for spaces, which isn't compatible with JS
					var xmlData = pako.inflateRaw(Graph.stringToArrayBuffer(
						value.substring(idx + 2)), {to: 'string'}).replace(/\+/g,' ');
					
					if (xmlData != null && xmlData.length > 0)
					{
						result = xmlData;
					}
				}
			}
			// Uncompressed section is normally not used
			else if (type == 'tEXt')
			{
				var vals = value.split(String.fromCharCode(0));
				
				if (vals.length > 1 && (vals[0] == 'mxGraphModel' ||
					vals[0] == 'mxfile'))
				{
					result = vals[1];
				}
			}
			
			if (result != null || type == 'IDAT')
			{
				// Stops processing the file as our text chunks
				// are always placed before the data section
				return true;
			}
		}));
	}
	catch (e)
	{
		// ignores decoding errors
	}
	
	if (result != null && result.charAt(0) == '%')
	{
		result = decodeURIComponent(result);
	}
	
	// Workaround for double encoded content
	if (result != null && result.charAt(0) == '%')
	{
		result = decodeURIComponent(result);
	}
	
	return result;
};

/**
 * Soundex algorithm for strings.
 * See https://www.codedrome.com/the-soundex-algorithm-in-javascript/
 */
Editor.soundex = function(name)
{
	if (name == null || name.length == 0)
	{
		return '';
	}
	else
	{
		var s = [];
		var si = 1;
		var c;

		// Changed: s maps to 0 not 2 to ignore plurals
		//              ABCDEFGHIJKLMNOPQRSTUVWXYZ
		var mappings = '01230120022455012603010202';

		s[0] = name[0].toUpperCase();

		for(var i = 1, l = name.length; i < l; i++)
		{
			c = (name[i].toUpperCase()).charCodeAt(0) - 65;

			if(c >= 0 && c <= 25)
			{
				if(mappings[c] != '0')
				{
					if(mappings[c] != s[si-1])
					{
						s[si] = mappings[c];
						si++;
					}

					if(si > 3)
					{
						break;
					}
				}
			}
		}

		if(si <= 3)
		{
			while(si <= 3)
			{
				s[si] = '0';
				si++;
			}
		}

		return s.join('');
	}
};

/**
 * Selects the given part of the input element.
 */
Editor.selectFilename = function(input)
{
	var end = input.value.lastIndexOf('.');

	if (end > 0)
	{
		var ext = input.value.substring(end + 1);

		if (ext != 'drawio')
		{
			if (mxUtils.indexOf(['png', 'svg', 'html', 'xml', 'pdf'], ext) >= 0)
			{
				var temp = input.value.lastIndexOf('.drawio.', end);

				if (temp > 0)
				{
					end = temp;
				}
			}
		}
	}
	
	end = (end > 0) ? end : input.value.length;
	Editor.selectSubstring(input, 0, end);
};

/**
 * Selects the given part of the input element.
 */
Editor.selectSubstring = function(input, startPos, endPos)
{
	input.focus();

	if (typeof input.selectionStart != 'undefined')
	{
		input.selectionStart = startPos;
		input.selectionEnd = endPos;
	}
	else if (document.selection && document.selection.createRange)
	{
		// IE branch
		input.select();
		var range = document.selection.createRange();
		range.collapse(true);
		range.moveEnd('character', endPos);
		range.moveStart('character', startPos);
		range.select();
	}
};

/**
 * Editor inherits from mxEventSource
 */
mxUtils.extend(Editor, mxEventSource);

/**
 * Stores initial state of mxClient.NO_FO.
 */
Editor.prototype.originalNoForeignObject = mxClient.NO_FO;

/**
 * Specifies the image URL to be used for the transparent background.
 */
Editor.prototype.transparentImage = (mxClient.IS_SVG) ? 'data:image/gif;base64,R0lGODlhMAAwAIAAAP///wAAACH5BAEAAAAALAAAAAAwADAAAAIxhI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuC8fyTNf2jef6zvf+DwwKh8Si8egpAAA7' :
	IMAGE_PATH + '/transparent.gif';

/**
 * Specifies if the canvas should be extended in all directions. Default is true.
 */
Editor.prototype.extendCanvas = true;

/**
 * Specifies if the app should run in chromeless mode. Default is false.
 * This default is only used if the contructor argument is null.
 */
Editor.prototype.chromeless = false;

/**
 * Specifies the order of OK/Cancel buttons in dialogs. Default is true.
 * Cancel first is used on Macs, Windows/Confluence uses cancel last.
 */
Editor.prototype.cancelFirst = true;

/**
 * Specifies if the editor is enabled. Default is true.
 */
Editor.prototype.enabled = true;

/**
 * Contains the name which was used for the last save. Default value is null.
 */
Editor.prototype.filename = null;

/**
 * Contains the current modified state of the diagram. This is false for
 * new diagrams and after the diagram was saved.
 */
Editor.prototype.modified = false;

/**
 * Specifies if the diagram should be saved automatically if possible. Default
 * is true.
 */
Editor.prototype.autosave = true;

/**
 * Specifies the top spacing for the initial page view. Default is 0.
 */
Editor.prototype.initialTopSpacing = 0;

/**
 * Specifies the app name. Default is document.title.
 */
Editor.prototype.appName = document.title;

/**
 * 
 */
Editor.prototype.editBlankUrl = window.location.protocol + '//' + window.location.host + '/';

/**
 * Default value for the graph container overflow style.
 */
Editor.prototype.defaultGraphOverflow = 'hidden';

/**
 * Initializes the environment.
 */
Editor.prototype.init = function() { };

/**
 * Sets the XML node for the current diagram.
 */
Editor.prototype.isChromelessView = function()
{
	return this.chromeless;
};

/**
 * Sets the XML node for the current diagram.
 */
Editor.prototype.setAutosave = function(value)
{
	this.autosave = value;
	this.fireEvent(new mxEventObject('autosaveChanged'));
};

/**
 * 
 */
Editor.prototype.getEditBlankUrl = function(params)
{
	return this.editBlankUrl + params;
}

/**
 * 
 */
Editor.prototype.editAsNew = function(xml, title)
{
	var p = (title != null) ? '?title=' + encodeURIComponent(title) : '';
	
	if (urlParams['ui'] != null)
	{
		p += ((p.length > 0) ? '&' : '?') + 'ui=' + urlParams['ui'];
	}
	
	if (typeof window.postMessage !== 'undefined' &&
		(document.documentMode == null ||
		document.documentMode >= 10))
	{
		var wnd = null;
		
		var l = mxUtils.bind(this, function(evt)
		{
			if (evt.data == 'ready' && evt.source == wnd)
			{
				mxEvent.removeListener(window, 'message', l);
				wnd.postMessage(xml, '*');
			}
		});
			
		mxEvent.addListener(window, 'message', l);
		wnd = this.graph.openLink(this.getEditBlankUrl(
			p + ((p.length > 0) ? '&' : '?') +
			'client=1'), null, true);
	}
	else
	{
		this.graph.openLink(this.getEditBlankUrl(p) +
			'#R' + encodeURIComponent(xml));
	}
};

/**
 * Sets the XML node for the current diagram.
 */
Editor.prototype.createGraph = function(themes, model)
{
	var graph = new Graph(null, model, null, null, themes);
	graph.transparentBackground = false;
	
	// Disables CSS transforms in Safari in chromeless mode
	var graphIsCssTransformsSupported = graph.isCssTransformsSupported;
	var self = this;

	graph.isCssTransformsSupported = function()
	{
		return graphIsCssTransformsSupported.apply(this, arguments) &&
			(!self.chromeless || !mxClient.IS_SF);
	};

	// Opens all links in a new window while editing
	if (!this.chromeless)
	{
		graph.isBlankLink = function(href)
		{
			return !this.isExternalProtocol(href);
		};
	}
	
	return graph;
};

/**
 * Sets the XML node for the current diagram.
 */
Editor.prototype.resetGraph = function()
{
	this.graph.gridEnabled = this.graph.defaultGridEnabled && (!this.isChromelessView() || urlParams['grid'] == '1');
	this.graph.graphHandler.guidesEnabled = true;
	this.graph.setTooltips(true);
	this.graph.setConnectable(true);
	this.graph.foldingEnabled = true;
	this.graph.scrollbars = this.graph.defaultScrollbars;
	this.graph.pageVisible = this.graph.defaultPageVisible;
	this.graph.pageBreaksVisible = this.graph.pageVisible; 
	this.graph.preferPageSize = this.graph.pageBreaksVisible;
	this.graph.background = null;
	this.graph.pageScale = mxGraph.prototype.pageScale;
	this.graph.pageFormat = mxGraph.prototype.pageFormat;
	this.graph.currentScale = 1;
	this.graph.currentTranslate.x = 0;
	this.graph.currentTranslate.y = 0;
	this.updateGraphComponents();
	this.graph.view.setScale(1);
};

/**
 * Sets the XML node for the current diagram.
 */
Editor.prototype.readGraphState = function(node)
{
	var grid = node.getAttribute('grid');
	
	if (grid == null || grid == '')
	{
		grid = this.graph.defaultGridEnabled ? '1' : '0';
	}
	
	this.graph.gridEnabled = grid != '0' && (!this.isChromelessView() || urlParams['grid'] == '1');
	this.graph.gridSize = parseFloat(node.getAttribute('gridSize')) || mxGraph.prototype.gridSize;
	this.graph.graphHandler.guidesEnabled = node.getAttribute('guides') != '0';
	this.graph.setTooltips(node.getAttribute('tooltips') != '0');
	this.graph.setConnectable(node.getAttribute('connect') != '0');
	this.graph.connectionArrowsEnabled = node.getAttribute('arrows') != '0';
	this.graph.foldingEnabled = node.getAttribute('fold') != '0';

	if (this.isChromelessView() && this.graph.foldingEnabled)
	{
		this.graph.foldingEnabled = urlParams['nav'] == '1';
		this.graph.cellRenderer.forceControlClickHandler = this.graph.foldingEnabled;
	}
	
	var ps = parseFloat(node.getAttribute('pageScale'));
	
	if (!isNaN(ps) && ps > 0)
	{
		this.graph.pageScale = ps;
	}
	else
	{
		this.graph.pageScale = mxGraph.prototype.pageScale;
	}

	if (!this.graph.isLightboxView() && !this.graph.isViewer())
	{
		var pv = node.getAttribute('page');
	
		if (pv != null)
		{
			this.graph.pageVisible = (pv != '0');
		}
		else
		{
			this.graph.pageVisible = this.graph.defaultPageVisible;
		}
	}
	else
	{
		this.graph.pageVisible = false;
	}
	
	this.graph.pageBreaksVisible = this.graph.pageVisible; 
	this.graph.preferPageSize = this.graph.pageBreaksVisible;
	
	var pw = parseFloat(node.getAttribute('pageWidth'));
	var ph = parseFloat(node.getAttribute('pageHeight'));
	
	if (!isNaN(pw) && !isNaN(ph))
	{
		this.graph.pageFormat = new mxRectangle(0, 0, pw, ph);
	}

	// Loads the persistent state settings
	var bg = node.getAttribute('background');
	
	if (bg != null && bg.length > 0)
	{
		this.graph.background = bg;
	}
	else
	{
		this.graph.background = null;
	}
};

/**
 * Sets the XML node for the current diagram.
 */
Editor.prototype.setGraphXml = function(node)
{
	if (node != null)
	{
		var dec = new mxCodec(node.ownerDocument);
	
		if (node.nodeName == 'mxGraphModel')
		{
			this.graph.model.beginUpdate();
			
			try
			{
				this.graph.model.clear();
				this.graph.view.scale = 1;
				this.readGraphState(node);
				this.updateGraphComponents();
				dec.decode(node, this.graph.getModel());
			}
			finally
			{
				this.graph.model.endUpdate();
			}
	
			this.fireEvent(new mxEventObject('resetGraphView'));
		}
		else if (node.nodeName == 'root')
		{
			this.resetGraph();
			
			// Workaround for invalid XML output in Firefox 20 due to bug in mxUtils.getXml
			var wrapper = dec.document.createElement('mxGraphModel');
			wrapper.appendChild(node);
			
			dec.decode(wrapper, this.graph.getModel());
			this.updateGraphComponents();
			this.fireEvent(new mxEventObject('resetGraphView'));
		}
		else
		{
			throw { 
			    message: mxResources.get('cannotOpenFile'), 
			    node: node,
			    toString: function() { return this.message; }
			};
		}
	}
	else
	{
		this.resetGraph();
		this.graph.model.clear();
		this.fireEvent(new mxEventObject('resetGraphView'));
	}
};

/**
 * Returns the XML node that represents the current diagram.
 */
Editor.prototype.getGraphXml = function(ignoreSelection)
{
	ignoreSelection = (ignoreSelection != null) ? ignoreSelection : true;
	var node = null;
	
	if (ignoreSelection)
	{
		var enc = new mxCodec(mxUtils.createXmlDocument());
		node = enc.encode(this.graph.getModel());
	}
	else
	{
		node = this.graph.encodeCells(mxUtils.sortCells(this.graph.model.getTopmostCells(
			this.graph.getSelectionCells())));
	}

	if (this.graph.view.translate.x != 0 || this.graph.view.translate.y != 0)
	{
		node.setAttribute('dx', Math.round(this.graph.view.translate.x * 100) / 100);
		node.setAttribute('dy', Math.round(this.graph.view.translate.y * 100) / 100);
	}
	
	node.setAttribute('grid', (this.graph.isGridEnabled()) ? '1' : '0');
	node.setAttribute('gridSize', this.graph.gridSize);
	node.setAttribute('guides', (this.graph.graphHandler.guidesEnabled) ? '1' : '0');
	node.setAttribute('tooltips', (this.graph.tooltipHandler.isEnabled()) ? '1' : '0');
	node.setAttribute('connect', (this.graph.connectionHandler.isEnabled()) ? '1' : '0');
	node.setAttribute('arrows', (this.graph.connectionArrowsEnabled) ? '1' : '0');
	node.setAttribute('fold', (this.graph.foldingEnabled) ? '1' : '0');
	node.setAttribute('page', (this.graph.pageVisible) ? '1' : '0');
	node.setAttribute('pageScale', this.graph.pageScale);
	node.setAttribute('pageWidth', this.graph.pageFormat.width);
	node.setAttribute('pageHeight', this.graph.pageFormat.height);

	if (this.graph.background != null)
	{
		node.setAttribute('background', this.graph.background);
	}
	
	return node;
};

/**
 * Keeps the graph container in sync with the persistent graph state
 */
Editor.prototype.updateGraphComponents = function()
{
	var graph = this.graph;
	
	if (graph.container != null)
	{
		graph.view.validateBackground();
		graph.container.style.overflow = (graph.scrollbars) ? 'auto' : this.defaultGraphOverflow;
		
		this.fireEvent(new mxEventObject('updateGraphComponents'));
	}
};

/**
 * Sets the modified flag.
 */
Editor.prototype.setModified = function(value)
{
	this.modified = value;
};

/**
 * Sets the filename.
 */
Editor.prototype.setFilename = function(value)
{
	this.filename = value;
};

/**
 * Creates and returns a new undo manager.
 */
Editor.prototype.createUndoManager = function()
{
	var graph = this.graph;
	var undoMgr = new mxUndoManager();

	this.undoListener = function(sender, evt)
	{
		undoMgr.undoableEditHappened(evt.getProperty('edit'));
	};
	
    // Installs the command history
	var listener = mxUtils.bind(this, function(sender, evt)
	{
		this.undoListener.apply(this, arguments);
	});
	
	graph.getModel().addListener(mxEvent.UNDO, listener);
	graph.getView().addListener(mxEvent.UNDO, listener);

	// Keeps the selection in sync with the history
	var undoHandler = function(sender, evt)
	{
		var cand = graph.getSelectionCellsForChanges(evt.getProperty('edit').changes, function(change)
		{
			// Only selects changes to the cell hierarchy
			return !(change instanceof mxChildChange);
		});
		
		if (cand.length > 0)
		{
			var model = graph.getModel();
			var cells = [];
			
			for (var i = 0; i < cand.length; i++)
			{
				if (graph.view.getState(cand[i]) != null)
				{
					cells.push(cand[i]);
				}
			}
			
			graph.setSelectionCells(cells);
		}
	};
	
	undoMgr.addListener(mxEvent.UNDO, undoHandler);
	undoMgr.addListener(mxEvent.REDO, undoHandler);

	return undoMgr;
};

/**
 * Adds basic stencil set (no namespace).
 */
Editor.prototype.initStencilRegistry = function() { };

/**
 * Creates and returns a new undo manager.
 */
Editor.prototype.destroy = function()
{
	if (this.graph != null)
	{
		this.graph.destroy();
		this.graph = null;
	}
};

/**
 * Class for asynchronously opening a new window and loading a file at the same
 * time. This acts as a bridge between the open dialog and the new editor.
 */
OpenFile = function(done)
{
	this.producer = null;
	this.consumer = null;
	this.done = done;
	this.args = null;
};

/**
 * Registers the editor from the new window.
 */
OpenFile.prototype.setConsumer = function(value)
{
	this.consumer = value;
	this.execute();
};

/**
 * Sets the data from the loaded file.
 */
OpenFile.prototype.setData = function()
{
	this.args = arguments;
	this.execute();
};

/**
 * Displays an error message.
 */
OpenFile.prototype.error = function(msg)
{
	this.cancel(true);
	mxUtils.alert(msg);
};

/**
 * Consumes the data.
 */
OpenFile.prototype.execute = function()
{
	if (this.consumer != null && this.args != null)
	{
		this.cancel(false);
		this.consumer.apply(this, this.args);
	}
};

/**
 * Cancels the operation.
 */
OpenFile.prototype.cancel = function(cancel)
{
	if (this.done != null)
	{
		this.done((cancel != null) ? cancel : true);
	}
};

/**
 * Basic dialogs that are available in the viewer (print dialog).
 */
function Dialog(editorUi, elt, w, h, modal, closable, onClose, noScroll, transparent, onResize, ignoreBgClick)
{
	this.editorUi = editorUi;
	var dx = transparent? 57 : 0;
	var w0 = w;
	var h0 = h;
	var padding = transparent? 0 : 64; //No padding needed for transparent dialogs
	
	var ds = (!Editor.inlineFullscreen && editorUi.embedViewport != null) ?
		mxUtils.clone(editorUi.embedViewport) : this.getDocumentSize();
	
	// Workaround for print dialog offset in viewer lightbox
	if (editorUi.embedViewport == null && window.innerHeight != null)
	{
		ds.height = window.innerHeight;
	}
	
	var dh = ds.height;
	var left = Math.max(1, Math.round((ds.width - w - padding) / 2));
	var top = Math.max(1, Math.round((dh - h - editorUi.footerHeight) / 3));
	
	// Keeps window size inside available space
	elt.style.maxHeight = '100%';
	
	w = (document.body != null) ? Math.min(w, document.body.scrollWidth - padding) : w;
	h = Math.min(h, dh - padding);
	
	// Increments zIndex to put subdialogs and background over existing dialogs and background
	if (editorUi.dialogs.length > 0)
	{
		this.zIndex += editorUi.dialogs.length * 2;
	}

	if (this.bg == null)
	{
		this.bg = editorUi.createDiv('geBackground');
		this.bg.style.position = 'absolute';
		this.bg.style.height = dh + 'px';
		this.bg.style.right = '0px';
		this.bg.style.zIndex = this.zIndex - 2;
		
		mxUtils.setOpacity(this.bg, this.bgOpacity);
	}
	
	var origin = mxUtils.getDocumentScrollOrigin(document);
	this.bg.style.left = origin.x + 'px';
	this.bg.style.top = origin.y + 'px';
	left += origin.x;
	top += origin.y;

	if (!Editor.inlineFullscreen && editorUi.embedViewport != null)
	{
		this.bg.style.height = this.getDocumentSize().height + 'px';
		top += editorUi.embedViewport.y;
		left += editorUi.embedViewport.x;
	}
	
	if (modal)
	{
		document.body.appendChild(this.bg);
	}
	
	var div = editorUi.createDiv(transparent? 'geTransDialog' : 'geDialog');
	var pos = this.getPosition(left, top, w, h);
	left = pos.x;
	top = pos.y;

	div.style.width = w + 'px';
	div.style.height = h + 'px';
	div.style.left = left + 'px';
	div.style.top = top + 'px';
	div.style.zIndex = this.zIndex;
	
	div.appendChild(elt);
	document.body.appendChild(div);
	
	// Adds vertical scrollbars if needed
	if (!noScroll && elt.clientHeight > div.clientHeight - padding)
	{
		elt.style.overflowY = 'auto';
	}
	
	//Prevent horizontal scrollbar
	elt.style.overflowX = 'hidden';
	
	if (closable)
	{
		var img = document.createElement('img');

		img.setAttribute('src', Dialog.prototype.closeImage);
		img.setAttribute('title', mxResources.get('close'));
		img.className = 'geDialogClose';
		img.style.top = (top + 14) + 'px';
		img.style.left = (left + w + 38 - dx) + 'px';
		img.style.zIndex = this.zIndex;
		
		mxEvent.addListener(img, 'click', mxUtils.bind(this, function()
		{
			editorUi.hideDialog(true);
		}));
		
		document.body.appendChild(img);
		this.dialogImg = img;
		
		if (!ignoreBgClick)
		{
			var mouseDownSeen = false;
			
			mxEvent.addGestureListeners(this.bg, mxUtils.bind(this, function(evt)
			{
				mouseDownSeen = true;
			}), null, mxUtils.bind(this, function(evt)
			{
				if (mouseDownSeen)
				{
					editorUi.hideDialog(true);
					mouseDownSeen = false;
				}
			}));
		}
	}
	
	this.resizeListener = mxUtils.bind(this, function()
	{
		if (onResize != null)
		{
			var newWH = onResize();
			
			if (newWH != null)
			{
				w0 = w = newWH.w;
				h0 = h = newWH.h;
			}
		}
		
		var ds = (!Editor.inlineFullscreen && editorUi.embedViewport != null) ?
			mxUtils.clone(editorUi.embedViewport) : this.getDocumentSize();
		dh = ds.height;
		this.bg.style.height = dh + 'px';
		
		if (!Editor.inlineFullscreen && editorUi.embedViewport != null)
		{
			this.bg.style.height = this.getDocumentSize().height + 'px';
		}

		left = Math.max(1, Math.round((ds.width - w - padding) / 2));
		top = Math.max(1, Math.round((dh - h - editorUi.footerHeight) / 3));
		w = (document.body != null) ? Math.min(w0, document.body.scrollWidth - padding) : w0;
		h = Math.min(h0, dh - padding);

		// var dh = ds.height;
		var left = Math.max(1, Math.round((ds.width - w - padding) / 2));
		var top = Math.max(1, Math.round((dh - h - editorUi.footerHeight) / 3));
		
		var pos = this.getPosition(left, top, w, h);
		left = pos.x;
		top = pos.y;

		var origin = mxUtils.getDocumentScrollOrigin(document);
		left += origin.x;
		top += origin.y;
	
		if (!Editor.inlineFullscreen && editorUi.embedViewport != null)
		{
			top += editorUi.embedViewport.y;
			left += editorUi.embedViewport.x;
		}
		
		div.style.left = left + 'px';
		div.style.top = top + 'px';
		div.style.width = w + 'px';
		div.style.height = h + 'px';
		
		// Adds vertical scrollbars if needed
		if (!noScroll && elt.clientHeight > div.clientHeight - padding)
		{
			elt.style.overflowY = 'auto';
		}
		
		if (this.dialogImg != null)
		{
			this.dialogImg.style.top = (top + 14) + 'px';
			this.dialogImg.style.left = (left + w + 38 - dx) + 'px';
		}
	});
	
	if (editorUi.embedViewport != null)
	{
		editorUi.addListener('embedViewportChanged', this.resizeListener);
	}
	else
	{
		mxEvent.addListener(window, 'resize', this.resizeListener);
	}

	this.onDialogClose = onClose;
	this.container = div;
	
	editorUi.editor.fireEvent(new mxEventObject('showDialog'));
};

/**
 * 
 */
Dialog.prototype.zIndex = mxPopupMenu.prototype.zIndex - 2;

/**
 * 
 */
Dialog.prototype.noColorImage = (!mxClient.IS_SVG) ? IMAGE_PATH + '/nocolor.png' : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkEzRDlBMUUwODYxMTExRTFCMzA4RDdDMjJBMEMxRDM3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkEzRDlBMUUxODYxMTExRTFCMzA4RDdDMjJBMEMxRDM3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTNEOUExREU4NjExMTFFMUIzMDhEN0MyMkEwQzFEMzciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QTNEOUExREY4NjExMTFFMUIzMDhEN0MyMkEwQzFEMzciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5xh3fmAAAABlBMVEX////MzMw46qqDAAAAGElEQVR42mJggAJGKGAYIIGBth8KAAIMAEUQAIElnLuQAAAAAElFTkSuQmCC';

/**
 * 
 */
Dialog.prototype.closeImage = (!mxClient.IS_SVG) ? IMAGE_PATH + '/close.png' : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJAQMAAADaX5RTAAAABlBMVEV7mr3///+wksspAAAAAnRSTlP/AOW3MEoAAAAdSURBVAgdY9jXwCDDwNDRwHCwgeExmASygSL7GgB12QiqNHZZIwAAAABJRU5ErkJggg==';

/**
 * 
 */
Dialog.prototype.clearImage = (!mxClient.IS_SVG) ? IMAGE_PATH + '/clear.gif' : 'data:image/gif;base64,R0lGODlhDQAKAIABAMDAwP///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OUIzOEM1NzI4NjEyMTFFMUEzMkNDMUE3NjZERDE2QjIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OUIzOEM1NzM4NjEyMTFFMUEzMkNDMUE3NjZERDE2QjIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5QjM4QzU3MDg2MTIxMUUxQTMyQ0MxQTc2NkREMTZCMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5QjM4QzU3MTg2MTIxMUUxQTMyQ0MxQTc2NkREMTZCMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQzMjEwLy4tLCsqKSgnJiUkIyIhIB8eHRwbGhkYFxYVFBMSERAPDg0MCwoJCAcGBQQDAgEAACH5BAEAAAEALAAAAAANAAoAAAIXTGCJebD9jEOTqRlttXdrB32PJ2ncyRQAOw==';

/**
 * Removes the dialog from the DOM.
 */
Dialog.prototype.bgOpacity = 80;

/**
 * Removes the dialog from the DOM.
 */
Dialog.prototype.getDocumentSize = function()
{
	return mxUtils.getDocumentSize();
};

/**
 * Removes the dialog from the DOM.
 */
Dialog.prototype.getPosition = function(left, top)
{
	return new mxPoint(left, top);
};

/**
 * Removes the dialog from the DOM.
 */
Dialog.prototype.close = function(cancel, isEsc)
{
	if (this.onDialogClose != null)
	{
		if (this.onDialogClose(cancel, isEsc) == false)
		{
			return false;
		}
		
		this.onDialogClose = null;
	}
	
	if (this.dialogImg != null && this.dialogImg.parentNode != null)
	{
		this.dialogImg.parentNode.removeChild(this.dialogImg);
		this.dialogImg = null;
	}
	
	if (this.bg != null && this.bg.parentNode != null)
	{
		this.bg.parentNode.removeChild(this.bg);
	}

	if (this.editorUi.embedViewport != null)
	{
		this.editorUi.removeListener(this.resizeListener);
	}
	else
	{
		mxEvent.removeListener(window, 'resize', this.resizeListener);
	}

	if (this.container.parentNode != null)
	{
		this.container.parentNode.removeChild(this.container);
	}
};

/**
 * 
 */
var ErrorDialog = function(editorUi, title, message, buttonText, fn, retry, buttonText2, fn2, hide, buttonText3, fn3)
{
	hide = (hide != null) ? hide : true;
	
	var div = document.createElement('div');
	div.style.textAlign = 'center';

	if (title != null)
	{
		var hd = document.createElement('div');
		hd.style.padding = '0px';
		hd.style.margin = '0px';
		hd.style.fontSize = '18px';
		hd.style.paddingBottom = '16px';
		hd.style.marginBottom = '10px';
		hd.style.borderBottom = '1px solid #c0c0c0';
		hd.style.color = 'gray';
		hd.style.whiteSpace = 'nowrap';
		hd.style.textOverflow = 'ellipsis';
		hd.style.overflow = 'hidden';
		mxUtils.write(hd, title);
		hd.setAttribute('title', title);
		div.appendChild(hd);
	}

	var p2 = document.createElement('div');
	p2.style.lineHeight = '1.2em';
	p2.style.padding = '6px';
	
	if (typeof message === 'string')
	{
		message = message.replace(/\n/g, '<br/>');
	}

	p2.innerHTML = message;
	div.appendChild(p2);
	
	var btns = document.createElement('div');
	btns.style.marginTop = '12px';
	btns.style.textAlign = 'center';
	
	if (retry != null)
	{
		var retryBtn = mxUtils.button(mxResources.get('tryAgain'), function()
		{
			editorUi.hideDialog();
			retry();
		});
		retryBtn.className = 'geBtn';
		btns.appendChild(retryBtn);
		
		btns.style.textAlign = 'center';
	}
	
	if (buttonText3 != null)
	{
		var btn3 = mxUtils.button(buttonText3, function()
		{
			if (fn3 != null)
			{
				fn3();
			}
		});
		
		btn3.className = 'geBtn';
		btns.appendChild(btn3);
	}
	
	var btn = mxUtils.button(buttonText, function()
	{
		if (hide)
		{
			editorUi.hideDialog();
		}
		
		if (fn != null)
		{
			fn();
		}
	});
	
	btn.className = 'geBtn';
	btns.appendChild(btn);

	if (buttonText2 != null)
	{
		var mainBtn = mxUtils.button(buttonText2, function()
		{
			if (hide)
			{
				editorUi.hideDialog();
			}
			
			if (fn2 != null)
			{
				fn2();
			}
		});
		
		mainBtn.className = 'geBtn gePrimaryBtn';
		btns.appendChild(mainBtn);
	}

	this.init = function()
	{
		btn.focus();
	};
	
	div.appendChild(btns);

	this.container = div;
};

/**
 * Constructs a new print dialog.
 */
var PrintDialog = function(editorUi, title)
{
	this.create(editorUi, title);
};

/**
 * Constructs a new print dialog.
 */
PrintDialog.prototype.create = function(editorUi)
{
	var graph = editorUi.editor.graph;
	var row, td;
	
	var table = document.createElement('table');
	table.style.width = '100%';
	table.style.height = '100%';
	var tbody = document.createElement('tbody');
	
	row = document.createElement('tr');
	
	var onePageCheckBox = document.createElement('input');
	onePageCheckBox.setAttribute('type', 'checkbox');
	td = document.createElement('td');
	td.setAttribute('colspan', '2');
	td.style.fontSize = '10pt';
	td.appendChild(onePageCheckBox);
	
	var span = document.createElement('span');
	mxUtils.write(span, ' ' + mxResources.get('fitPage'));
	td.appendChild(span);
	
	mxEvent.addListener(span, 'click', function(evt)
	{
		onePageCheckBox.checked = !onePageCheckBox.checked;
		pageCountCheckBox.checked = !onePageCheckBox.checked;
		mxEvent.consume(evt);
	});
	
	mxEvent.addListener(onePageCheckBox, 'change', function()
	{
		pageCountCheckBox.checked = !onePageCheckBox.checked;
	});
	
	row.appendChild(td);
	tbody.appendChild(row);

	row = row.cloneNode(false);
	
	var pageCountCheckBox = document.createElement('input');
	pageCountCheckBox.setAttribute('type', 'checkbox');
	td = document.createElement('td');
	td.style.fontSize = '10pt';
	td.appendChild(pageCountCheckBox);
	
	var span = document.createElement('span');
	mxUtils.write(span, ' ' + mxResources.get('posterPrint') + ':');
	td.appendChild(span);
	
	mxEvent.addListener(span, 'click', function(evt)
	{
		pageCountCheckBox.checked = !pageCountCheckBox.checked;
		onePageCheckBox.checked = !pageCountCheckBox.checked;
		mxEvent.consume(evt);
	});
	
	row.appendChild(td);
	
	var pageCountInput = document.createElement('input');
	pageCountInput.setAttribute('value', '1');
	pageCountInput.setAttribute('type', 'number');
	pageCountInput.setAttribute('min', '1');
	pageCountInput.setAttribute('size', '4');
	pageCountInput.setAttribute('disabled', 'disabled');
	pageCountInput.style.width = '50px';

	td = document.createElement('td');
	td.style.fontSize = '10pt';
	td.appendChild(pageCountInput);
	mxUtils.write(td, ' ' + mxResources.get('pages') + ' (max)');
	row.appendChild(td);
	tbody.appendChild(row);

	mxEvent.addListener(pageCountCheckBox, 'change', function()
	{
		if (pageCountCheckBox.checked)
		{
			pageCountInput.removeAttribute('disabled');
		}
		else
		{
			pageCountInput.setAttribute('disabled', 'disabled');
		}

		onePageCheckBox.checked = !pageCountCheckBox.checked;
	});

	row = row.cloneNode(false);
	
	td = document.createElement('td');
	mxUtils.write(td, mxResources.get('pageScale') + ':');
	row.appendChild(td);
	
	td = document.createElement('td');
	var pageScaleInput = document.createElement('input');
	pageScaleInput.setAttribute('value', '100 %');
	pageScaleInput.setAttribute('size', '5');
	pageScaleInput.style.width = '50px';
	
	td.appendChild(pageScaleInput);
	row.appendChild(td);
	tbody.appendChild(row);
	
	row = document.createElement('tr');
	td = document.createElement('td');
	td.colSpan = 2;
	td.style.paddingTop = '20px';
	td.setAttribute('align', 'right');
	
	// Overall scale for print-out to account for print borders in dialogs etc
	function preview(print)
	{
		var autoOrigin = onePageCheckBox.checked || pageCountCheckBox.checked;
		var printScale = parseInt(pageScaleInput.value) / 100;
		
		if (isNaN(printScale))
		{
			printScale = 1;
			pageScaleInput.value = '100%';
		}

		// Workaround to match available paper size in actual print output
		if (mxClient.IS_SF)
		{
			printScale *= 0.75;
		}
		
		var pf = graph.pageFormat || mxConstants.PAGE_FORMAT_A4_PORTRAIT;
		var scale = 1 / graph.pageScale;
		
		if (autoOrigin)
		{
    		var pageCount = (onePageCheckBox.checked) ? 1 : parseInt(pageCountInput.value);
			
			if (!isNaN(pageCount))
			{
				scale = mxUtils.getScaleForPageCount(pageCount, graph, pf);
			}
		}

		// Negative coordinates are cropped or shifted if page visible
		var border = 0;
		var x0 = 0;
		var y0 = 0;

		// Applies print scale
		pf = mxRectangle.fromRectangle(pf);
		pf.width = Math.ceil(pf.width * printScale);
		pf.height = Math.ceil(pf.height * printScale);
		scale *= printScale;
		
		// Starts at first visible page
		if (!autoOrigin && graph.pageVisible)
		{
			var layout = graph.getPageLayout();
			x0 -= layout.x * pf.width;
			y0 -= layout.y * pf.height;
		}
		else
		{
			autoOrigin = true;
		}
		
		var preview = PrintDialog.createPrintPreview(graph, scale, pf, border, x0, y0, autoOrigin);
		preview.open();
	
		if (print)
		{
			PrintDialog.printPreview(preview);
		}
	};
	
	var cancelBtn = mxUtils.button(mxResources.get('cancel'), function()
	{
		editorUi.hideDialog();
	});
	cancelBtn.className = 'geBtn';
	
	if (editorUi.editor.cancelFirst)
	{
		td.appendChild(cancelBtn);
	}

	if (PrintDialog.previewEnabled)
	{
		var previewBtn = mxUtils.button(mxResources.get('preview'), function()
		{
			editorUi.hideDialog();
			preview(false);
		});
		previewBtn.className = 'geBtn';
		td.appendChild(previewBtn);
	}
	
	var printBtn = mxUtils.button(mxResources.get((!PrintDialog.previewEnabled) ? 'ok' : 'print'), function()
	{
		editorUi.hideDialog();
		preview(true);
	});
	printBtn.className = 'geBtn gePrimaryBtn';
	td.appendChild(printBtn);
	
	if (!editorUi.editor.cancelFirst)
	{
		td.appendChild(cancelBtn);
	}

	row.appendChild(td);
	tbody.appendChild(row);
	
	table.appendChild(tbody);
	this.container = table;
};

/**
 * Constructs a new print dialog.
 */
PrintDialog.printPreview = function(preview)
{
	try
	{
		if (preview.wnd != null)
		{
			var printFn = function()
			{
				preview.wnd.focus();
				preview.wnd.print();
				preview.wnd.close();
			};
			
			// Workaround for rendering SVG output and
			// make window available for printing
			window.setTimeout(printFn, 500);
		}
	}
	catch (e)
	{
		// ignores possible Access Denied
	}
};

/**
 * Constructs a new print dialog.
 */
PrintDialog.createPrintPreview = function(graph, scale, pf, border, x0, y0, autoOrigin)
{
	var preview = new mxPrintPreview(graph, scale, pf, border, x0, y0);
	preview.title = mxResources.get('preview');
	preview.addPageCss = !mxClient.IS_SF;
	preview.printBackgroundImage = true;
	preview.autoOrigin = autoOrigin;
	var bg = graph.background;
	
	if (bg == null || bg == '' || bg == mxConstants.NONE)
	{
		bg = '#ffffff';
	}
	
	preview.backgroundColor = bg;
	
	var writeHead = preview.writeHead;
	
	// Adds a border in the preview
	preview.writeHead = function(doc)
	{
		writeHead.apply(this, arguments);
		
		doc.writeln('<style type="text/css">');
		doc.writeln('@media screen {');
		doc.writeln('  body > div { padding:30px;box-sizing:content-box; }');
		doc.writeln('}');
		doc.writeln('</style>');
	};
	
	return preview;
};

/**
 * Specifies if the preview button should be enabled. Default is true.
 */
PrintDialog.previewEnabled = true;

/**
 * Constructs a new page setup dialog.
 */
var PageSetupDialog = function(editorUi)
{
	var graph = editorUi.editor.graph;
	var row, td;

	var table = document.createElement('table');
	table.style.width = '100%';
	table.style.height = '100%';
	var tbody = document.createElement('tbody');
	
	row = document.createElement('tr');
	
	td = document.createElement('td');
	td.style.verticalAlign = 'top';
	td.style.fontSize = '10pt';
	mxUtils.write(td, mxResources.get('paperSize') + ':');
	
	row.appendChild(td);
	
	td = document.createElement('td');
	td.style.verticalAlign = 'top';
	td.style.fontSize = '10pt';
	
	var accessor = PageSetupDialog.addPageFormatPanel(td, 'pagesetupdialog', graph.pageFormat);

	row.appendChild(td);
	tbody.appendChild(row);
	
	row = document.createElement('tr');
	
	td = document.createElement('td');
	mxUtils.write(td, mxResources.get('gridSize') + ':');
	row.appendChild(td);
	
	td = document.createElement('td');
	td.style.whiteSpace = 'nowrap';

	var gridSizeInput = document.createElement('input');
	gridSizeInput.setAttribute('type', 'number');
	gridSizeInput.setAttribute('min', '0');
	gridSizeInput.style.width = '40px';
	gridSizeInput.style.marginLeft = '6px';
	
	gridSizeInput.value = graph.getGridSize();
	td.appendChild(gridSizeInput);
	
	mxEvent.addListener(gridSizeInput, 'change', function()
	{
		var value = parseInt(gridSizeInput.value);
		gridSizeInput.value = Math.max(1, (isNaN(value)) ? graph.getGridSize() : value);
	});
	
	row.appendChild(td);
	tbody.appendChild(row);
	
	row = document.createElement('tr');
	td = document.createElement('td');
	
	mxUtils.write(td, mxResources.get('background') + ':');
	
	row.appendChild(td);
	td = document.createElement('td');
	
	var changeImageLink = document.createElement('button');
	changeImageLink.className = 'geBtn';
	changeImageLink.style.margin = '0px';
	mxUtils.write(changeImageLink, mxResources.get('change') + '...');

	var imgPreview = document.createElement('div');
	imgPreview.style.display = 'inline-block';
	imgPreview.style.verticalAlign = 'middle';
	imgPreview.style.backgroundPosition = 'center center';
	imgPreview.style.backgroundRepeat = 'no-repeat';
	imgPreview.style.backgroundSize = 'contain';
	imgPreview.style.border = '1px solid lightGray';
	imgPreview.style.borderRadius = '4px';
	imgPreview.style.marginRight = '14px';
	imgPreview.style.height = '32px';
	imgPreview.style.width = '64px';
	imgPreview.style.cursor = 'pointer';
	imgPreview.style.padding = '4px';
	
	var newBackgroundImage = graph.backgroundImage;
	var newBackgroundColor = graph.background;
	var newShadowVisible = graph.shadowVisible;
	
	function updateBackgroundImage()
	{
		var img = newBackgroundImage;

		if (img != null && img.originalSrc != null)
		{
			img = editorUi.createImageForPageLink(img.originalSrc, null);
		}
		
		if (img != null && img.src != null)
		{
			imgPreview.style.backgroundImage = 'url(' + img.src + ')';
			imgPreview.style.display = 'inline-block';
		}
		else
		{
			imgPreview.style.backgroundImage = '';
			imgPreview.style.display = 'none';
		}

		imgPreview.style.backgroundColor = '';

		if (newBackgroundColor != null && newBackgroundColor != mxConstants.NONE)
		{
			imgPreview.style.backgroundColor = newBackgroundColor;
			imgPreview.style.display = 'inline-block';
		}
	};

	var changeImage = function(evt)
	{
		editorUi.showBackgroundImageDialog(function(image, failed, color, shadowVisible)
		{
			if (!failed)
			{
				if (image != null && image.src != null && Graph.isPageLink(image.src))
				{
					image = {originalSrc: image.src};
				}

				newBackgroundImage = image;
				newShadowVisible = shadowVisible;
			}

			newBackgroundColor = color;
			updateBackgroundImage();
		}, newBackgroundImage, newBackgroundColor, true);
		
		mxEvent.consume(evt);
	};
	
	mxEvent.addListener(changeImageLink, 'click', changeImage);
	mxEvent.addListener(imgPreview, 'click', changeImage);
	
	updateBackgroundImage();
	td.appendChild(imgPreview);
	td.appendChild(changeImageLink);
	
	row.appendChild(td);
	tbody.appendChild(row);
	
	row = document.createElement('tr');
	td = document.createElement('td');
	td.colSpan = 2;
	td.style.paddingTop = '16px';
	td.setAttribute('align', 'right');

	var cancelBtn = mxUtils.button(mxResources.get('cancel'), function()
	{
		editorUi.hideDialog();
	});
	cancelBtn.className = 'geBtn';
	
	if (editorUi.editor.cancelFirst)
	{
		td.appendChild(cancelBtn);
	}
	
	var applyBtn = mxUtils.button(mxResources.get('apply'), function()
	{
		editorUi.hideDialog();
		var gridSize = parseInt(gridSizeInput.value);
		
		if (!isNaN(gridSize) && graph.gridSize !== gridSize)
		{
			graph.setGridSize(gridSize);
		}

		var change = new ChangePageSetup(editorUi, newBackgroundColor,
			newBackgroundImage, accessor.get());
		change.ignoreColor = graph.background == newBackgroundColor;
		
		var oldSrc = (graph.backgroundImage != null) ? graph.backgroundImage.src : null;
		var newSrc = (newBackgroundImage != null) ? newBackgroundImage.src : null;
		
		change.ignoreImage = oldSrc === newSrc;

		if (newShadowVisible != null)
		{
			change.shadowVisible = newShadowVisible;
		}

		if (graph.pageFormat.width != change.previousFormat.width ||
			graph.pageFormat.height != change.previousFormat.height ||
			!change.ignoreColor || !change.ignoreImage||
			change.shadowVisible != graph.shadowVisible)
		{
			graph.model.execute(change);
		}
	});
	applyBtn.className = 'geBtn gePrimaryBtn';
	td.appendChild(applyBtn);

	if (!editorUi.editor.cancelFirst)
	{
		td.appendChild(cancelBtn);
	}
	
	row.appendChild(td);
	tbody.appendChild(row);
	
	table.appendChild(tbody);
	this.container = table;
};

/**
 * 
 */
PageSetupDialog.addPageFormatPanel = function(div, namePostfix, pageFormat, pageFormatListener)
{
	var formatName = 'format-' + namePostfix;
	
	var portraitCheckBox = document.createElement('input');
	portraitCheckBox.setAttribute('name', formatName);
	portraitCheckBox.setAttribute('type', 'radio');
	portraitCheckBox.setAttribute('value', 'portrait');
	
	var landscapeCheckBox = document.createElement('input');
	landscapeCheckBox.setAttribute('name', formatName);
	landscapeCheckBox.setAttribute('type', 'radio');
	landscapeCheckBox.setAttribute('value', 'landscape');
	
	var paperSizeSelect = document.createElement('select');
	paperSizeSelect.style.marginBottom = '8px';
	paperSizeSelect.style.borderRadius = '4px';
	paperSizeSelect.style.borderWidth = '1px';
	paperSizeSelect.style.borderStyle = 'solid';
	paperSizeSelect.style.width = '206px';

	var formatDiv = document.createElement('div');
	formatDiv.style.marginLeft = '4px';
	formatDiv.style.width = '210px';
	formatDiv.style.height = '24px';

	portraitCheckBox.style.marginRight = '6px';
	formatDiv.appendChild(portraitCheckBox);
	
	var portraitSpan = document.createElement('span');
	portraitSpan.style.maxWidth = '100px';
	mxUtils.write(portraitSpan, mxResources.get('portrait'));
	formatDiv.appendChild(portraitSpan);

	landscapeCheckBox.style.marginLeft = '10px';
	landscapeCheckBox.style.marginRight = '6px';
	formatDiv.appendChild(landscapeCheckBox);
	
	var landscapeSpan = document.createElement('span');
	landscapeSpan.style.width = '100px';
	mxUtils.write(landscapeSpan, mxResources.get('landscape'));
	formatDiv.appendChild(landscapeSpan)

	var customDiv = document.createElement('div');
	customDiv.style.marginLeft = '4px';
	customDiv.style.width = '210px';
	customDiv.style.height = '24px';
	
	var widthInput = document.createElement('input');
	widthInput.setAttribute('size', '7');
	widthInput.style.textAlign = 'right';
	customDiv.appendChild(widthInput);
	mxUtils.write(customDiv, ' in x ');
	
	var heightInput = document.createElement('input');
	heightInput.setAttribute('size', '7');
	heightInput.style.textAlign = 'right';
	customDiv.appendChild(heightInput);
	mxUtils.write(customDiv, ' in');

	formatDiv.style.display = 'none';
	customDiv.style.display = 'none';
	
	var pf = new Object();
	var formats = PageSetupDialog.getFormats();
	
	for (var i = 0; i < formats.length; i++)
	{
		var f = formats[i];
		pf[f.key] = f;

		var paperSizeOption = document.createElement('option');
		paperSizeOption.setAttribute('value', f.key);
		mxUtils.write(paperSizeOption, f.title);
		paperSizeSelect.appendChild(paperSizeOption);
	}
	
	var customSize = false;
	
	function listener(sender, evt, force)
	{
		if (force || (widthInput != document.activeElement && heightInput != document.activeElement))
		{
			var detected = false;
			
			for (var i = 0; i < formats.length; i++)
			{
				var f = formats[i];
	
				// Special case where custom was chosen
				if (customSize)
				{
					if (f.key == 'custom')
					{
						paperSizeSelect.value = f.key;
						customSize = false;
					}
				}
				else if (f.format != null)
				{
					// Fixes wrong values for previous A4 and A5 page sizes
					if (f.key == 'a4')
					{
						if (pageFormat.width == 826)
						{
							pageFormat = mxRectangle.fromRectangle(pageFormat);
							pageFormat.width = 827;
						}
						else if (pageFormat.height == 826)
						{
							pageFormat = mxRectangle.fromRectangle(pageFormat);
							pageFormat.height = 827;
						}
					}
					else if (f.key == 'a5')
					{
						if (pageFormat.width == 584)
						{
							pageFormat = mxRectangle.fromRectangle(pageFormat);
							pageFormat.width = 583;
						}
						else if (pageFormat.height == 584)
						{
							pageFormat = mxRectangle.fromRectangle(pageFormat);
							pageFormat.height = 583;
						}
					}
					
					if (pageFormat.width == f.format.width && pageFormat.height == f.format.height)
					{
						paperSizeSelect.value = f.key;
						portraitCheckBox.setAttribute('checked', 'checked');
						portraitCheckBox.defaultChecked = true;
						portraitCheckBox.checked = true;
						landscapeCheckBox.removeAttribute('checked');
						landscapeCheckBox.defaultChecked = false;
						landscapeCheckBox.checked = false;
						detected = true;
					}
					else if (pageFormat.width == f.format.height && pageFormat.height == f.format.width)
					{
						paperSizeSelect.value = f.key;
						portraitCheckBox.removeAttribute('checked');
						portraitCheckBox.defaultChecked = false;
						portraitCheckBox.checked = false;
						landscapeCheckBox.setAttribute('checked', 'checked');
						landscapeCheckBox.defaultChecked = true;
						landscapeCheckBox.checked = true;
						detected = true;
					}
				}
			}
			
			// Selects custom format which is last in list
			if (!detected)
			{
				widthInput.value = pageFormat.width / 100;
				heightInput.value = pageFormat.height / 100;
				portraitCheckBox.setAttribute('checked', 'checked');
				paperSizeSelect.value = 'custom';
				formatDiv.style.display = 'none';
				customDiv.style.display = '';
			}
			else
			{
				formatDiv.style.display = '';
				customDiv.style.display = 'none';
			}
		}
	};
	
	listener();

	div.appendChild(paperSizeSelect);
	mxUtils.br(div);

	div.appendChild(formatDiv);
	div.appendChild(customDiv);
	
	var currentPageFormat = pageFormat;
	
	var update = function(evt, selectChanged)
	{
		var f = pf[paperSizeSelect.value];
		
		if (f.format != null)
		{
			widthInput.value = f.format.width / 100;
			heightInput.value = f.format.height / 100;
			customDiv.style.display = 'none';
			formatDiv.style.display = '';
		}
		else
		{
			formatDiv.style.display = 'none';
			customDiv.style.display = '';
		}
		
		var wi = parseFloat(widthInput.value);
		
		if (isNaN(wi) || wi <= 0)
		{
			widthInput.value = pageFormat.width / 100;
		}
		
		var hi = parseFloat(heightInput.value);
		
		if (isNaN(hi) || hi <= 0)
		{
			heightInput.value = pageFormat.height / 100;
		}
		
		var newPageFormat = new mxRectangle(0, 0,
			Math.floor(parseFloat(widthInput.value) * 100),
			Math.floor(parseFloat(heightInput.value) * 100));
		
		if (paperSizeSelect.value != 'custom' && landscapeCheckBox.checked)
		{
			newPageFormat = new mxRectangle(0, 0, newPageFormat.height, newPageFormat.width);
		}
		
		// Initial select of custom should not update page format to avoid update of combo
		if ((!selectChanged || !customSize) && (newPageFormat.width != currentPageFormat.width ||
			newPageFormat.height != currentPageFormat.height))
		{
			currentPageFormat = newPageFormat;
			
			// Updates page format and reloads format panel
			if (pageFormatListener != null)
			{
				pageFormatListener(currentPageFormat);
			}
		}
	};

	mxEvent.addListener(portraitSpan, 'click', function(evt)
	{
		portraitCheckBox.checked = true;
		update(evt);
		mxEvent.consume(evt);
	});
	
	mxEvent.addListener(landscapeSpan, 'click', function(evt)
	{
		landscapeCheckBox.checked = true;
		update(evt);
		mxEvent.consume(evt);
	});
	
	mxEvent.addListener(widthInput, 'blur', update);
	mxEvent.addListener(widthInput, 'click', update);
	mxEvent.addListener(heightInput, 'blur', update);
	mxEvent.addListener(heightInput, 'click', update);
	mxEvent.addListener(landscapeCheckBox, 'change', update);
	mxEvent.addListener(portraitCheckBox, 'change', update);
	mxEvent.addListener(paperSizeSelect, 'change', function(evt)
	{
		// Handles special case where custom was chosen
		customSize = paperSizeSelect.value == 'custom';
		update(evt, true);
	});
	
	update();
	
	return {set: function(value)
	{
		pageFormat = value;
		listener(null, null, true);
	},get: function()
	{
		return currentPageFormat;
	}, widthInput: widthInput,
		heightInput: heightInput};
};

/**
 * 
 */
PageSetupDialog.getFormats = function()
{
	return [{key: 'letter', title: 'US-Letter (8,5" x 11")', format: mxConstants.PAGE_FORMAT_LETTER_PORTRAIT},
	        {key: 'legal', title: 'US-Legal (8,5" x 14")', format: new mxRectangle(0, 0, 850, 1400)},
	        {key: 'tabloid', title: 'US-Tabloid (11" x 17")', format: new mxRectangle(0, 0, 1100, 1700)},
	        {key: 'executive', title: 'US-Executive (7" x 10")', format: new mxRectangle(0, 0, 700, 1000)},
	        {key: 'a0', title: 'A0 (841 mm x 1189 mm)', format: new mxRectangle(0, 0, 3300, 4681)},
	        {key: 'a1', title: 'A1 (594 mm x 841 mm)', format: new mxRectangle(0, 0, 2339, 3300)},
	        {key: 'a2', title: 'A2 (420 mm x 594 mm)', format: new mxRectangle(0, 0, 1654, 2336)},
	        {key: 'a3', title: 'A3 (297 mm x 420 mm)', format: new mxRectangle(0, 0, 1169, 1654)},
	        {key: 'a4', title: 'A4 (210 mm x 297 mm)', format: mxConstants.PAGE_FORMAT_A4_PORTRAIT},
	        {key: 'a5', title: 'A5 (148 mm x 210 mm)', format: new mxRectangle(0, 0, 583, 827)},
	        {key: 'a6', title: 'A6 (105 mm x 148 mm)', format: new mxRectangle(0, 0, 413, 583)},
	        {key: 'a7', title: 'A7 (74 mm x 105 mm)', format: new mxRectangle(0, 0, 291, 413)},
	        {key: 'b4', title: 'B4 (250 mm x 353 mm)', format: new mxRectangle(0, 0, 980, 1390)},
	        {key: 'b5', title: 'B5 (176 mm x 250 mm)', format: new mxRectangle(0, 0, 690, 980)},
	        {key: '16-9', title: '16:9 (1600 x 900)', format: new mxRectangle(0, 0, 900, 1600)},
	        {key: '16-10', title: '16:10 (1920 x 1200)', format: new mxRectangle(0, 0, 1200, 1920)},
	        {key: '4-3', title: '4:3 (1600 x 1200)', format: new mxRectangle(0, 0, 1200, 1600)},
	        {key: 'custom', title: mxResources.get('custom'), format: null}];
};

/**
 * Constructs a new filename dialog.
 */
var FilenameDialog = function(editorUi, filename, buttonText, fn, label, validateFn, content, helpLink, closeOnBtn, cancelFn, hints, w, lblW)
{
	closeOnBtn = (closeOnBtn != null) ? closeOnBtn : true;

	var table = document.createElement('table');
	var tbody = document.createElement('tbody');
	var row = document.createElement('tr');
	var td = document.createElement('td');
	table.style.margin = '0 auto';

	td.style.textOverflow = 'ellipsis';
	td.style.whiteSpace = 'nowrap';
	td.style.textAlign = 'right';
	td.style.maxWidth = (lblW? lblW + 15 : 100) + 'px';
	td.style.fontSize = '10pt';
	td.style.width = (lblW? lblW : 84) + 'px';
	mxUtils.write(td, (label || mxResources.get('filename')) + ':');
	
	row.appendChild(td);
	
	var nameInput = document.createElement('input');
	nameInput.setAttribute('value', filename || '');
	nameInput.style.marginLeft = '4px';
	nameInput.style.width = (w != null) ? w + 'px' : '180px';
	
	var genericBtn = mxUtils.button(buttonText, function()
	{
		if (validateFn == null || validateFn(nameInput.value))
		{
			if (closeOnBtn)
			{
				editorUi.hideDialog();
			}
			
			fn(nameInput.value);
		}
	});
	genericBtn.className = 'geBtn gePrimaryBtn';
	
	this.init = function()
	{
		if (label == null && content != null)
		{
			return;
		}

		if (hints != null)
		{
			Editor.selectFilename(nameInput);
		}
		else
		{
			nameInput.focus();
			
			if (mxClient.IS_GC || mxClient.IS_FF || document.documentMode >= 5)
			{
				nameInput.select();
			}
			else
			{
				document.execCommand('selectAll', false, null);
			}
		}
		
		// Installs drag and drop handler for links
		if (Graph.fileSupport)
		{
			// Setup the dnd listeners
			var dlg = table.parentNode;
			
			if (dlg != null)
			{
				var graph = editorUi.editor.graph;
				var dropElt = null;
					
				mxEvent.addListener(dlg, 'dragleave', function(evt)
				{
					if (dropElt != null)
				    {
						dropElt.style.backgroundColor = '';
				    	dropElt = null;
				    }
				    
					evt.stopPropagation();
					evt.preventDefault();
				});
				
				mxEvent.addListener(dlg, 'dragover', mxUtils.bind(this, function(evt)
				{
					// IE 10 does not implement pointer-events so it can't have a drop highlight
					if (dropElt == null && (!mxClient.IS_IE || document.documentMode > 10))
					{
						dropElt = nameInput;
						dropElt.style.backgroundColor = '#ebf2f9';
					}
					
					evt.stopPropagation();
					evt.preventDefault();
				}));
						
				mxEvent.addListener(dlg, 'drop', mxUtils.bind(this, function(evt)
				{
				    if (dropElt != null)
				    {
						dropElt.style.backgroundColor = '';
				    	dropElt = null;
				    }
	
				    if (mxUtils.indexOf(evt.dataTransfer.types, 'text/uri-list') >= 0)
				    {
				    	nameInput.value = decodeURIComponent(evt.dataTransfer.getData('text/uri-list'));
				    	genericBtn.click();
				    }
	
				    evt.stopPropagation();
				    evt.preventDefault();
				}));
			}
		}
	};

	td = document.createElement('td');
	td.style.whiteSpace = 'nowrap';
	td.appendChild(nameInput);
	row.appendChild(td);
	
	if (label != null || content == null)
	{
		tbody.appendChild(row);
		
		if (hints != null)
		{	
			td.appendChild(FilenameDialog.createTypeHint(editorUi, nameInput, hints));

			if (editorUi.editor.diagramFileTypes != null)
			{
				row = document.createElement('tr');
		
				td = document.createElement('td');
				td.style.textOverflow = 'ellipsis';
				td.style.textAlign = 'right';
				td.style.maxWidth = '100px';
				td.style.fontSize = '10pt';
				td.style.width = '84px';
				mxUtils.write(td, mxResources.get('type') + ':');
				row.appendChild(td);

				td = document.createElement('td');
				td.style.whiteSpace = 'nowrap';
				row.appendChild(td);

				var typeSelect = FilenameDialog.createFileTypes(editorUi,
					nameInput, editorUi.editor.diagramFileTypes);
				typeSelect.style.marginLeft = '4px';
				typeSelect.style.width = '198px';

				td.appendChild(typeSelect);
				nameInput.style.width = (w != null) ? (w - 40) + 'px' : '190px';

				row.appendChild(td);
				tbody.appendChild(row);
			}
		}
	}
	
	if (content != null)
	{
		row = document.createElement('tr');
		td = document.createElement('td');
		td.colSpan = 2;
		td.appendChild(content);
		row.appendChild(td);
		tbody.appendChild(row);
	}
	
	row = document.createElement('tr');
	td = document.createElement('td');
	td.colSpan = 2;
	td.style.paddingTop = (hints != null) ? '12px' : '20px';
	td.style.whiteSpace = 'nowrap';
	td.setAttribute('align', 'right');
	
	var cancelBtn = mxUtils.button(mxResources.get('cancel'), function()
	{
		editorUi.hideDialog();
		
		if (cancelFn != null)
		{
			cancelFn();
		}
	});
	cancelBtn.className = 'geBtn';
	
	if (helpLink != null)
	{
		var helpBtn = mxUtils.button(mxResources.get('help'), function()
		{
			editorUi.editor.graph.openLink(helpLink);
		});
		
		helpBtn.className = 'geBtn';	
		td.appendChild(helpBtn);
	}

	if (editorUi.editor.cancelFirst)
	{
		td.appendChild(cancelBtn);
	}
	
	mxEvent.addListener(nameInput, 'keypress', function(e)
	{
		if (e.keyCode == 13)
		{
			genericBtn.click();
		}
	});
	
	td.appendChild(genericBtn);
	
	if (!editorUi.editor.cancelFirst)
	{
		td.appendChild(cancelBtn);
	}

	row.appendChild(td);
	tbody.appendChild(row);
	table.appendChild(tbody);
	
	this.container = table;
};

/**
 * 
 */
FilenameDialog.filenameHelpLink = null;

/**
 * 
 */
FilenameDialog.createTypeHint = function(ui, nameInput, hints)
{
	var hint = document.createElement('img');
	hint.style.backgroundPosition = 'center bottom';
	hint.style.backgroundRepeat = 'no-repeat';
	hint.style.margin = '2px 0 0 4px';
	hint.style.verticalAlign = 'top';
	hint.style.cursor = 'pointer';
	hint.style.height = '16px';
	hint.style.width = '16px';
	mxUtils.setOpacity(hint, 70);
	
	var nameChanged = function()
	{
		hint.setAttribute('src', Editor.helpImage);
		hint.setAttribute('title', mxResources.get('help'));
		
		for (var i = 0; i < hints.length; i++)
		{
			if (hints[i].ext.length > 0 && nameInput.value.toLowerCase().substring(
				nameInput.value.length - hints[i].ext.length - 1) == '.' + hints[i].ext)
			{
				hint.setAttribute('title', mxResources.get(hints[i].title));
				break;
			}
		}
	};
	
	mxEvent.addListener(nameInput, 'keyup', nameChanged);
	mxEvent.addListener(nameInput, 'change', nameChanged);
	mxEvent.addListener(hint, 'click', function(evt)
	{
		var title = hint.getAttribute('title');
		
		if (hint.getAttribute('src') == Editor.helpImage)
		{
			ui.editor.graph.openLink(FilenameDialog.filenameHelpLink);
		}
		else if (title != '')
		{
			ui.showError(null, title, mxResources.get('help'), function()
			{
				ui.editor.graph.openLink(FilenameDialog.filenameHelpLink);
			}, null, mxResources.get('ok'), null, null, null, 340, 90);
		}
		
		mxEvent.consume(evt);
	});
	
	nameChanged();
	
	return hint;
};

/**
 * 
 */
FilenameDialog.createFileTypes = function(editorUi, nameInput, types)
{
	var typeSelect = document.createElement('select');

	for (var i = 0; i < types.length; i++)
	{
		var typeOption = document.createElement('option');
		typeOption.setAttribute('value', i);
		mxUtils.write(typeOption, mxResources.get(types[i].description) +
			' (.' + types[i].extension + ')');
		typeSelect.appendChild(typeOption);
	}
			
	mxEvent.addListener(typeSelect, 'change', function(evt)
	{
		var ext = types[typeSelect.value].extension;
		var idx2 = nameInput.value.lastIndexOf('.drawio.');
		var idx = (idx2 > 0) ? idx2 : nameInput.value.lastIndexOf('.');

		if (ext != 'drawio')
		{
			ext = 'drawio.' + ext;
		}
		
		if (idx > 0)
		{
			nameInput.value = nameInput.value.substring(0, idx + 1) + ext;
		}
		else
		{
			nameInput.value = nameInput.value + '.' + ext;
		}
		
		if ('createEvent' in document)
		{
		    var changeEvent = document.createEvent('HTMLEvents');
		    changeEvent.initEvent('change', false, true);
		    nameInput.dispatchEvent(changeEvent);
		}
		else
		{
		    nameInput.fireEvent('onchange');
		}
	});
	
	var nameInputChanged = function(evt)
	{
		var name = nameInput.value.toLowerCase();
		var active = 0;
		
		// Finds current extension
		for (var i = 0; i < types.length; i++)
		{
			var ext = types[i].extension;
			var subExt = null;

			if (ext != 'drawio')
			{
				subExt = ext;
				ext = '.drawio.' + ext;
			}

			if (name.substring(name.length - ext.length - 1) == '.' + ext ||
				(subExt != null && name.substring(name.length - subExt.length - 1) == '.' + subExt))
			{
				active = i;
				break;
			}
		}
		
		typeSelect.value = active;
	};
	
	mxEvent.addListener(nameInput, 'change', nameInputChanged);
	mxEvent.addListener(nameInput, 'keyup', nameInputChanged);
	nameInputChanged();
	
	return typeSelect;
};

/**
 * 
 */
var WrapperWindow = function(editorUi, title, x, y, w, h, fn)
{
	var div = editorUi.createSidebarContainer();
	fn(div);

	this.window = new mxWindow(title, div, x, y, w, h, true, true);
	this.window.destroyOnClose = false;
	this.window.setMaximizable(false);
	this.window.setResizable(true);
	this.window.setClosable(true);
	this.window.setVisible(true);

	editorUi.installResizeHandler(this, true);
	
	// Workaround for text selection starting in Safari
	// when dragging shapes outside of window
	if (mxClient.IS_SF)
	{
		this.window.div.onselectstart = mxUtils.bind(this, function(evt)
		{
			if (evt == null)
			{
				evt = window.event;
			}
			
			return (evt != null && editorUi.isSelectionAllowed(evt));
		});
	}
};

/**
 * Static overrides
 */
(function()
{
	// Uses HTML for background pages (to support grid background image)
	mxGraphView.prototype.validateBackgroundPage = function()
	{
		var graph = this.graph;
		
		if (graph.container != null && !graph.transparentBackground)
		{
			if (graph.pageVisible)
			{
				var bounds = this.getBackgroundPageBounds();
				
				if (this.backgroundPageShape == null)
				{
					// Finds first element in graph container
					var firstChild = graph.container.firstChild;
					
					while (firstChild != null && firstChild.nodeType != mxConstants.NODETYPE_ELEMENT)
					{
						firstChild = firstChild.nextSibling;
					}
					
					if (firstChild != null)
					{
						this.backgroundPageShape = this.createBackgroundPageShape(bounds);
						this.backgroundPageShape.scale = 1;
						
						// IE8 standards has known rendering issues inside mxWindow but not using shadow is worse.
						this.backgroundPageShape.isShadow = true;
						this.backgroundPageShape.dialect = mxConstants.DIALECT_STRICTHTML;
						this.backgroundPageShape.init(graph.container);
	
						// Required for the browser to render the background page in correct order
						firstChild.style.position = 'absolute';
						graph.container.insertBefore(this.backgroundPageShape.node, firstChild);
						this.backgroundPageShape.redraw();
						
						this.backgroundPageShape.node.className = 'geBackgroundPage';
						
						// Adds listener for double click handling on background
						mxEvent.addListener(this.backgroundPageShape.node, 'dblclick',
							mxUtils.bind(this, function(evt)
							{
								graph.dblClick(evt);
							})
						);
						
						// Adds basic listeners for graph event dispatching outside of the
						// container and finishing the handling of a single gesture
						mxEvent.addGestureListeners(this.backgroundPageShape.node,
							mxUtils.bind(this, function(evt)
							{
								graph.fireMouseEvent(mxEvent.MOUSE_DOWN, new mxMouseEvent(evt));
							}),
							mxUtils.bind(this, function(evt)
							{
								// Hides the tooltip if mouse is outside container
								if (graph.tooltipHandler != null && graph.tooltipHandler.isHideOnHover())
								{
									graph.tooltipHandler.hide();
								}
								
								if (graph.isMouseDown && !mxEvent.isConsumed(evt))
								{
									graph.fireMouseEvent(mxEvent.MOUSE_MOVE, new mxMouseEvent(evt));
								}
							}),
							mxUtils.bind(this, function(evt)
							{
								graph.fireMouseEvent(mxEvent.MOUSE_UP, new mxMouseEvent(evt));
							})
						);
					}
				}
				else
				{
					this.backgroundPageShape.scale = 1;
					this.backgroundPageShape.bounds = bounds;
					this.backgroundPageShape.redraw();
				}
			}
			else if (this.backgroundPageShape != null)
			{
				this.backgroundPageShape.destroy();
				this.backgroundPageShape = null;
			}
			
			this.validateBackgroundStyles();
		}
	};

	// Updates the CSS of the background to draw the grid
	mxGraphView.prototype.validateBackgroundStyles = function(factor, cx, cy)
	{
		var graph = this.graph;
		factor = (factor != null) ? factor : 1;
		var color = (graph.background == null || graph.background == mxConstants.NONE) ?
			graph.defaultPageBackgroundColor : graph.background;
		var gridColor = (color != null && this.gridColor != color.toLowerCase()) ? this.gridColor : '#ffffff';
		var image = 'none';
		var position = '';
		
		if (graph.isGridEnabled() || graph.gridVisible)
		{
			var phase = 10;
			
			if (mxClient.IS_SVG)
			{
				// Generates the SVG required for drawing the dynamic grid
				image = unescape(encodeURIComponent(this.createSvgGrid(gridColor, factor)));
				image = (window.btoa) ? btoa(image) : Base64.encode(image, true);
				image = 'url(' + 'data:image/svg+xml;base64,' + image + ')'
				phase = graph.gridSize * this.scale * this.gridSteps * factor;
			}
			else
			{
				// Fallback to grid wallpaper with fixed size
				image = 'url(' + this.gridImage + ')';
			}
			
			var x0 = 0;
			var y0 = 0;

			var dx = (cx != null) ? cx - this.translate.x * this.scale : 0;
			var dy = (cy != null) ? cy - this.translate.y * this.scale : 0;

			var p = graph.gridSize * this.scale * this.gridSteps;
			var ddx = dx % p;
			var ddy = dy % p;
			
			if (graph.view.backgroundPageShape != null)
			{
				var bds = this.getBackgroundPageBounds();
				
				x0 = 1 + bds.x;
				y0 = 1 + bds.y;
			}
			
			// Computes the offset to maintain origin for grid
			position = -Math.round(phase - mxUtils.mod(this.translate.x * this.scale - x0 + dx, phase) + ddx * factor) + 'px ' +
				-Math.round(phase - mxUtils.mod(this.translate.y * this.scale - y0 + dy, phase) + ddy * factor) + 'px';
		}
		
		var canvas = graph.view.canvas;
		
		if (canvas.ownerSVGElement != null)
		{
			canvas = canvas.ownerSVGElement;
		}

		var useDiagramBackground = !Editor.isDarkMode() && graph.enableDiagramBackground;
		
		if (graph.view.backgroundPageShape != null)
		{
			graph.view.backgroundPageShape.node.style.backgroundPosition = position;
			graph.view.backgroundPageShape.node.style.backgroundImage = image;
			graph.view.backgroundPageShape.node.style.backgroundColor = color;
			graph.view.backgroundPageShape.node.style.borderColor = graph.defaultPageBorderColor;
			graph.container.classList.add('geDiagramBackdrop');
			canvas.style.backgroundImage = 'none';
			canvas.style.backgroundColor = '';

			if (useDiagramBackground)
			{
				graph.container.style.backgroundColor = graph.diagramBackgroundColor;
			}
			else
			{
				graph.container.style.backgroundColor = '';
			}
		}
		else
		{
			graph.container.classList.remove('geDiagramBackdrop');
			canvas.style.backgroundPosition = position;
			canvas.style.backgroundImage = image;
			
			if (useDiagramBackground && (graph.background == null ||
				graph.background == mxConstants.NONE))
			{
				canvas.style.backgroundColor = graph.diagramBackgroundColor;
				graph.container.style.backgroundColor = '';
			}
			else
			{
				canvas.style.backgroundColor = color;
			}
		}
	};
	
	// Returns the SVG required for painting the background grid.
	mxGraphView.prototype.createSvgGrid = function(color, factor)
	{
		factor = (factor != null) ? factor : 1;
		var tmp = this.graph.gridSize * this.scale * factor;
		
		while (tmp < this.minGridSize)
		{
			tmp *= 2;
		}
		
		var tmp2 = this.gridSteps * tmp;
		
		// Small grid lines
		var d = [];
		
		for (var i = 1; i < this.gridSteps; i++)
		{
			var tmp3 = i * tmp;
			d.push('M 0 ' + tmp3 + ' L ' + tmp2 + ' ' + tmp3 + ' M ' + tmp3 + ' 0 L ' + tmp3 + ' ' + tmp2);
		}
		
		// KNOWN: Rounding errors for certain scales (eg. 144%, 121% in Chrome, FF and Safari). Workaround
		// in Chrome is to use 100% for the svg size, but this results in blurred grid for large diagrams.
		var size = tmp2;
		var svg =  '<svg width="' + size + '" height="' + size + '" xmlns="' + mxConstants.NS_SVG + '">' +
		    '<defs><pattern id="grid" width="' + tmp2 + '" height="' + tmp2 + '" patternUnits="userSpaceOnUse">' +
		    '<path d="' + d.join(' ') + '" fill="none" stroke="' + color + '" opacity="0.2" stroke-width="1"/>' +
		    '<path d="M ' + tmp2 + ' 0 L 0 0 0 ' + tmp2 + '" fill="none" stroke="' + color + '" stroke-width="1"/>' +
		    '</pattern></defs><rect width="100%" height="100%" fill="url(#grid)"/></svg>';

		return svg;
	};

	// Adds panning for the grid with no page view and disabled scrollbars
	var mxGraphPanGraph = mxGraph.prototype.panGraph;
	mxGraph.prototype.panGraph = function(dx, dy)
	{
		mxGraphPanGraph.apply(this, arguments);
		
		if (this.shiftPreview1 != null)
		{
			var canvas = this.view.canvas;
			
			if (canvas.ownerSVGElement != null)
			{
				canvas = canvas.ownerSVGElement;
			}
			
			var phase = this.gridSize * this.view.scale * this.view.gridSteps;
			var position = -Math.round(phase - mxUtils.mod(this.view.translate.x * this.view.scale + dx, phase)) + 'px ' +
				-Math.round(phase - mxUtils.mod(this.view.translate.y * this.view.scale + dy, phase)) + 'px';
			canvas.style.backgroundPosition = position;
		}
	};
	
	// Draws page breaks only within the page
	mxGraph.prototype.updatePageBreaks = function(visible, width, height)
	{
		var scale = this.view.scale;
		var tr = this.view.translate;
		var fmt = this.pageFormat;
		var ps = scale * this.pageScale;

		var bounds2 = this.view.getBackgroundPageBounds();

		width = bounds2.width;
		height = bounds2.height;
		var bounds = new mxRectangle(scale * tr.x, scale * tr.y, fmt.width * ps, fmt.height * ps);

		// Does not show page breaks if the scale is too small
		visible = visible && Math.min(bounds.width, bounds.height) > this.minPageBreakDist;

		var horizontalCount = (visible) ? Math.ceil(height / bounds.height) - 1 : 0;
		var verticalCount = (visible) ? Math.ceil(width / bounds.width) - 1 : 0;
		var right = bounds2.x + width;
		var bottom = bounds2.y + height;

		if (this.horizontalPageBreaks == null && horizontalCount > 0)
		{
			this.horizontalPageBreaks = [];
		}
		
		if (this.verticalPageBreaks == null && verticalCount > 0)
		{
			this.verticalPageBreaks = [];
		}
			
		var drawPageBreaks = mxUtils.bind(this, function(breaks)
		{
			if (breaks != null)
			{
				var count = (breaks == this.horizontalPageBreaks) ? horizontalCount : verticalCount; 
				
				for (var i = 0; i <= count; i++)
				{
					var pts = (breaks == this.horizontalPageBreaks) ?
						[new mxPoint(Math.round(bounds2.x), Math.round(bounds2.y + (i + 1) * bounds.height)),
						 new mxPoint(Math.round(right), Math.round(bounds2.y + (i + 1) * bounds.height))] :
						[new mxPoint(Math.round(bounds2.x + (i + 1) * bounds.width), Math.round(bounds2.y)),
						 new mxPoint(Math.round(bounds2.x + (i + 1) * bounds.width), Math.round(bottom))];
					
					if (breaks[i] != null)
					{
						breaks[i].points = pts;
						breaks[i].redraw();
					}
					else
					{
						var pageBreak = new mxPolyline(pts, this.pageBreakColor);
						pageBreak.dialect = this.dialect;
						pageBreak.isDashed = this.pageBreakDashed;
						pageBreak.pointerEvents = false;
						pageBreak.init(this.view.backgroundPane);
						pageBreak.redraw();
						
						breaks[i] = pageBreak;
					}
				}
				
				for (var i = count; i < breaks.length; i++)
				{
					if (breaks[i] != null)
					{
						breaks[i].destroy();
					}
				}
				
				breaks.splice(count, breaks.length - count);
			}
		});
			
		drawPageBreaks(this.horizontalPageBreaks);
		drawPageBreaks(this.verticalPageBreaks);
	};
	
	// Disables removing relative children and table rows and cells from parents
	var mxGraphHandlerShouldRemoveCellsFromParent = mxGraphHandler.prototype.shouldRemoveCellsFromParent;
	mxGraphHandler.prototype.shouldRemoveCellsFromParent = function(parent, cells, evt)
	{
		for (var i = 0; i < cells.length; i++)
		{
			if (this.graph.isTableCell(cells[i]) || this.graph.isTableRow(cells[i]))
			{
				return false;
			}
			else if (this.graph.getModel().isVertex(cells[i]))
			{
				var geo = this.graph.getCellGeometry(cells[i]);
				
				if (geo != null && geo.relative)
				{
					return false;
				}
			}
		}
		
		return mxGraphHandlerShouldRemoveCellsFromParent.apply(this, arguments);
	};

	// Overrides to ignore hotspot only for target terminal
	var mxConnectionHandlerCreateMarker = mxConnectionHandler.prototype.createMarker;
	mxConnectionHandler.prototype.createMarker = function()
	{
		var marker = mxConnectionHandlerCreateMarker.apply(this, arguments);
		
		marker.intersects = mxUtils.bind(this, function(state, evt)
		{
			if (this.isConnecting())
			{
				return true;
			}
			
			return mxCellMarker.prototype.intersects.apply(marker, arguments);
		});
		
		return marker;
	};

	// Creates background page shape
	mxGraphView.prototype.createBackgroundPageShape = function(bounds)
	{
		return new mxRectangleShape(bounds, '#ffffff', this.graph.defaultPageBorderColor);
	};

	// Fits the number of background pages to the graph
	mxGraphView.prototype.getBackgroundPageBounds = function()
	{
		var gb = this.getGraphBounds();
		
		// Computes unscaled, untranslated graph bounds
		var x = (gb.width > 0) ? gb.x / this.scale - this.translate.x : 0;
		var y = (gb.height > 0) ? gb.y / this.scale - this.translate.y : 0;
		var w = gb.width / this.scale;
		var h = gb.height / this.scale;
		
		var fmt = this.graph.pageFormat;
		var ps = this.graph.pageScale;

		var pw = fmt.width * ps;
		var ph = fmt.height * ps;

		var x0 = Math.floor(Math.min(0, x) / pw);
		var y0 = Math.floor(Math.min(0, y) / ph);
		var xe = Math.ceil(Math.max(1, x + w) / pw);
		var ye = Math.ceil(Math.max(1, y + h) / ph);
		
		var rows = xe - x0;
		var cols = ye - y0;

		var bounds = new mxRectangle(this.scale * (this.translate.x + x0 * pw), this.scale *
				(this.translate.y + y0 * ph), this.scale * rows * pw, this.scale * cols * ph);
		
		return bounds;
	};
	
	// Add panning for background page in VML
	var graphPanGraph = mxGraph.prototype.panGraph;
	mxGraph.prototype.panGraph = function(dx, dy)
	{
		graphPanGraph.apply(this, arguments);
		
		if ((this.dialect != mxConstants.DIALECT_SVG && this.view.backgroundPageShape != null) &&
			(!this.useScrollbarsForPanning || !mxUtils.hasScrollbars(this.container)))
		{
			this.view.backgroundPageShape.node.style.marginLeft = dx + 'px';
			this.view.backgroundPageShape.node.style.marginTop = dy + 'px';
		}
	};

	/**
	 * Consumes click events for disabled menu items.
	 */
	var mxPopupMenuAddItem = mxPopupMenu.prototype.addItem;
	mxPopupMenu.prototype.addItem = function(title, image, funct, parent, iconCls, enabled)
	{
		var result = mxPopupMenuAddItem.apply(this, arguments);
		
		if (enabled != null && !enabled)
		{
			mxEvent.addListener(result, 'mousedown', function(evt)
			{
				mxEvent.consume(evt);
			});
		}
		
		return result;
	};
	
	/**
	 * Selects tables before cells and rows.
	 */
	var mxGraphHandlerIsPropagateSelectionCell = mxGraphHandler.prototype.isPropagateSelectionCell;
	mxGraphHandler.prototype.isPropagateSelectionCell = function(cell, immediate, me)
	{
		var result = false;
		var parent = this.graph.model.getParent(cell)
		
		if (immediate)
		{
			var geo = (this.graph.model.isEdge(cell)) ? null :
				this.graph.getCellGeometry(cell);
			
			result = !this.graph.model.isEdge(parent) &&
				!this.graph.isSiblingSelected(cell) &&
				((geo != null && geo.relative) ||
				!this.graph.isContainer(parent) ||
				this.graph.isPart(cell));
		}
		else
		{
			result = mxGraphHandlerIsPropagateSelectionCell.apply(this, arguments);
			
			if (this.graph.isTableCell(cell) || this.graph.isTableRow(cell))
			{
				var table = parent;
				
				if (!this.graph.isTable(table))
				{
					table = this.graph.model.getParent(table);
				}
				
				result = !this.graph.selectionCellsHandler.isHandled(table) ||
					(this.graph.isCellSelected(table) && this.graph.isToggleEvent(me.getEvent())) ||
					(this.graph.isCellSelected(cell) && !this.graph.isToggleEvent(me.getEvent())) ||
					(this.graph.isTableCell(cell) && this.graph.isCellSelected(parent));
			}
		}
		
		return result;
	};

	/**
	 * Returns last selected ancestor
	 */
	mxPopupMenuHandler.prototype.getCellForPopupEvent = function(me)
	{
		var cell = me.getCell();
		var model = this.graph.getModel();
		var parent = model.getParent(cell);
		var state = this.graph.view.getState(parent);
		var selected = this.graph.isCellSelected(cell);
		
		while (state != null && (model.isVertex(parent) || model.isEdge(parent)))
		{
			var temp = this.graph.isCellSelected(parent);
			selected = selected || temp;
			
			if (temp || (!selected && (this.graph.isTableCell(cell) ||
				this.graph.isTableRow(cell))))
			{
				cell = parent;
			}
			
			parent = model.getParent(parent);
		}
		
		return cell;
	};

})();
