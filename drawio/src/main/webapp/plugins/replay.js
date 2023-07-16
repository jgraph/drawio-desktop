/**
 * Replay plugin. To record steps in the Editor, click on Extras, Record.
 * To stop recording click Extras, Record again. Enter the delay between
 * the steps and use the URL that opens in the new window.
 */
Draw.loadPlugin(function(ui) {

	var graph = ui.editor.graph;
	var model = graph.model;
	
	function decodeChanges(delta, direct)
	{
		var codec2 = new mxCodec(delta.ownerDocument);
		codec2.lookup = function(id)
		{
			return model.getCell(id);
		};
		
		var changeNode = (direct) ? delta.firstChild : delta.firstChild.firstChild;
		var changes = [];
		
		while (changeNode != null)
		{
			var change = codec2.decode(changeNode);
			
			change.model = model;
			change.execute();
			changes.push(change);
			
			changeNode = changeNode.nextSibling;
		}
		
		return changes;
	};

	function createUndoableEdit(changes)
	{
		var edit = new mxUndoableEdit(model);
		edit.changes = changes;
		
		edit.notify = function()
		{
			// LATER: Remove changes property (deprecated)
			edit.source.fireEvent(new mxEventObject(mxEvent.CHANGE,
				'edit', edit, 'changes', edit.changes));
			edit.source.fireEvent(new mxEventObject(mxEvent.NOTIFY,
				'edit', edit, 'changes', edit.changes));
		};
		
		return edit;
	};

	function processDelta(delta, direct)
	{
		var changes = decodeChanges(delta, direct);
		
		if (changes.length > 0)
		{
			var edit = createUndoableEdit(changes);
				
			if (ui.chromelessResize)
			{
				// No notify event here to avoid the edit from being encoded and transmitted
				// LATER: Remove changes property (deprecated)
				model.fireEvent(new mxEventObject(mxEvent.CHANGE,
					'edit', edit, 'changes', changes));
				model.fireEvent(new mxEventObject(mxEvent.UNDO, 'edit', edit));
				ui.chromelessResize();
			}
			else
			{
				edit.notify();
			}
		}
		
		return edit;
	};

	if (ui.editor.isChromelessView())
	{
		var replayData = urlParams['replay-data'];
		var delay = parseInt(urlParams['delay-delay'] || 1000);
		
		if (replayData != null)
		{
			var xmlDoc = mxUtils.parseXml(Graph.decompress(replayData));
			// LATER: Avoid duplicate parsing
			ui.fileLoaded(new LocalFile(ui, mxUtils.getXml(xmlDoc.documentElement.firstChild.firstChild)));

			// Process deltas
			var delta = xmlDoc.documentElement.firstChild.nextSibling;
			
			function nextStep()
			{
				if (delta != null)
				{
					window.setTimeout(function()
					{
						processDelta(delta);
						delta = delta.nextSibling;
						nextStep();
					}, delay);
				}
			};
			
			nextStep();
		}
	}
	else
	{
		var tape = null;
		var codec = new mxCodec();
		
		codec.lookup = function(id)
		{
			return model.getCell(id);
		};

		model.addListener(mxEvent.CHANGE, function(sender, evt)
	    {
	    	if (tape != null)
	    	{
		    	var changes = evt.getProperty('changes');
		    	var node = codec.encode(changes);
		    	var delta = codec.document.createElement('delta');
		    	delta.appendChild(node);
		    	tape.push(mxUtils.getXml(delta));
	    	}
	    });
		
		mxResources.parse('record=Record');
		mxResources.parse('replay=Replay');
		
	    // Adds actions
	    var action = ui.actions.addAction('record...', function()
	    {
	    	if (tape == null)
	    	{
	    		var node = codec.encode(model);
		    	var state = codec.document.createElement('state');
		    	state.appendChild(node);
		    	tape =[mxUtils.getXml(state)];
		    	ui.editor.setStatus('Recording started');
	    	}
	    	else if (tape != null)
	    	{
	    		ui.editor.setStatus('Recording stopped');
	    		var tmp = tape;
	    		tape = null;

				var dlg = new FilenameDialog(ui, 1000, mxResources.get('apply'), function(newValue)
				{
					if (newValue != null)
					{
						var dlg = new EmbedDialog(ui, 'https://www.draw.io/?p=replay&lightbox=1&replay-delay=' +
							parseFloat(newValue) + '&replay-data=' + Graph.compress('<recording>' +
							tmp.join('') + '</recording>'));
						ui.showDialog(dlg.container, 450, 240, true, true);
						dlg.init();
					}
				}, 'Delay');
				ui.showDialog(dlg.container, 300, 80, true, true);
				dlg.init();
	    	}
	    	
	    	action.label = (tape != null) ? 'Stop recording' : mxResources.get('record') + '...';
	    });
		
	    ui.actions.addAction('replay...', function()
	    {
	    	var dlg = new TextareaDialog(ui, 'Changes [JSON export, compressed edits or <edit>..</edit>]:', '',
	    		function(newValue)
			{
				if (newValue.length > 0)
				{
					try
					{
						var current = null;
						
						if (newValue.charAt(0) == '{')
						{
							var temp = JSON.parse(newValue);
							current = temp.current;
							newValue = temp.edits;
						}
						
						if (newValue.charAt(0) != '<')
						{
							newValue = Graph.decompress(newValue);
						}
						
						if (newValue.charAt(0) == '[')
						{
							newValue = JSON.parse(newValue);
							console.log(JSON.stringify(newValue, null, 2));
							var pageId = null;
							var temp = [];
							
							for (var i = 0; i < newValue.length; i++)
							{
								if (pageId == null)
								{
									pageId = newValue[i].pageid;
								}
								
								if (pageId == newValue[i].pageid)
								{
									temp.push(newValue[i].data);
								}
								else
								{
									mxLog.debug('edit ignored for page ' + newValue[i].pageid);
									mxLog.show();
								}
							}
							
							newValue = temp.join('');
						}
						
						var edits = mxUtils.parseXml('<edits>' + newValue + '</edits>');
						var edit = edits.documentElement.firstChild;
						
						function step()
						{
							console.log(processDelta(edit, true));
							edit = edit.nextSibling;
							
							return edit != null;
						}
						
						if (ui.buttonContainer != null)
						{
							console.log(mxUtils.getPrettyXml(edit));

							var button = mxUtils.button('Step', function()
							{
								if (!step())
								{
									button.parentNode.removeChild(button);
								}
								else
								{
									console.log(mxUtils.getPrettyXml(edit));
								}
							});
							
							button.className = 'geBtn gePrimaryBtn';
							
							ui.buttonContainer.appendChild(button);
						}
						else
						{
							while (step())
							{
								// repeat
							}
						}
					}
					catch (e)
					{
						ui.handleError(e);
						console.error(e);
					}
				}
			});
	    	
			ui.showDialog(dlg.container, 620, 460, true, true);
			dlg.init();
	    });
	    
		var menu = ui.menus.get('extras');
		var oldFunct = menu.funct;
		
		menu.funct = function(menu, parent)
		{
			oldFunct.apply(this, arguments);
			
			ui.menus.addMenuItems(menu, ['-', 'record', 'replay'], parent);
		};
	}
});