/**
 * Sample plugin.
 */
Draw.loadPlugin(function(ui) {
	
	var div = document.createElement('div');
	div.style.background = Editor.isDarkMode() ? Editor.darkColor : '#ffffff';
	div.style.border = '1px solid gray';
	div.style.opacity = '0.8';
	div.style.padding = '10px';
	div.style.paddingTop = '0px';
	div.style.width = '20%';
	div.innerHTML = '<p><i>' + mxResources.get('nothingIsSelected') + '</i></p>';
	
	var graph = ui.editor.graph;
	
	if (!ui.editor.isChromelessView())
	{
		div.style.boxSizing = 'border-box';
		div.style.minHeight = '100%';
		div.style.width = '100%';

		var iiw = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		
		var dataWindow = new mxWindow('Data', div, iiw - 320, 60, 240, 220, true, true);
		dataWindow.destroyOnClose = false;
		dataWindow.setMaximizable(false);
		dataWindow.setResizable(true);
		dataWindow.setScrollable(true);
		dataWindow.setClosable(true);
		dataWindow.contentWrapper.style.overflowY = 'scroll';

		// Adds resource for action
		mxResources.parse('extractData=Extract Data');

		// Adds action
		ui.actions.addAction('extractData...', function()
		{
			dataWindow.setVisible(!dataWindow.isVisible());
		});
		
		var menu = ui.menus.get('extras');
		var oldFunct = menu.funct;
		
		menu.funct = function(menu, parent)
		{
			oldFunct.apply(this, arguments);
			
			ui.menus.addMenuItems(menu, ['-', 'extractData'], parent);
		};
	}
	else
	{
		div.style.position = 'absolute';
		div.style.minWidth = '200px';
		div.style.top = '40px';
		div.style.right = '20px';

		document.body.appendChild(div);
	}
	
	// Highlights current cell
	var highlight = new mxCellHighlight(graph, '#00ff00', 8);
	var ignored = ['label', 'tooltip', 'placeholders'];

	function extractData(evt)
	{
		var result = graph.getDataForCells(graph.getSelectionCells());

		if (mxEvent.isShiftDown(evt))
		{
			console.log(JSON.stringify(result, null, '  '));
		}
		else
		{
			console.log(result);
		}
	};

	/**
	 * Updates the properties panel
	 */
	function cellClicked(cell)
	{
		// Gets the selection cell
		if (cell == null)
		{
			highlight.highlight(null);
			div.innerHTML = '<p><i>' + mxResources.get('nothingIsSelected') + '</i></p>';
		}
		else
		{
			var attrs = (cell.value != null) ? cell.value.attributes : null;

			if (ui.editor.isChromelessView())
			{
				highlight.highlight(graph.view.getState(cell));
			}
	
			if (attrs != null)
			{
				var label = Graph.sanitizeHtml(graph.getLabel(cell));
				
				if (label != null && label.length > 0)
				{
					div.innerHTML = '<h1>' + label + '</h1>';
				}
				else
				{
					div.innerText = '';
				}
				
				for (var i = 0; i < attrs.length; i++)
				{
					if (mxUtils.indexOf(ignored, attrs[i].nodeName) < 0 &&
						attrs[i].nodeValue.length > 0)
					{
						// TODO: Add click handler on h2 to output data
						var h2 = document.createElement('h2');
						mxUtils.write(h2, attrs[i].nodeName);
						div.appendChild(h2);
						var p = document.createElement('p');
						mxUtils.write(p, attrs[i].nodeValue);
						div.appendChild(p);
					}
				}
			}
			else
			{
				var label = graph.convertValueToString(cell);
				
				if (label != '')
				{
					div.innerHTML = '<h1>' + Graph.sanitizeHtml(label) + '</h1>';
				}
				else
				{
					div.innerHTML = '<p><i>No data</i></p>';
				}
			}

			if (!ui.editor.isChromelessView())
			{
				var button = document.createElement('button');
				button.setAttribute('title', 'Click or Shift+Click to write data for all selected cells to the browser console');
				button.style['float'] = 'none';
				mxUtils.write(button, 'Write to Console');

				mxEvent.addListener(button, 'click', function(evt)
				{
					extractData(evt);
				});

				div.appendChild(button);
			}
		}
	};

	if (!ui.editor.isChromelessView())
	{
		graph.selectionModel.addListener(mxEvent.CHANGE, function(sender, evt)
		{
			cellClicked(graph.getSelectionCell());
		});
		
		graph.model.addListener(mxEvent.CHANGE, function(sender, evt)
		{
			cellClicked(graph.getSelectionCell());
		});
	}
	else
	{
		graph.click = function(me)
		{
			// Async required to enable hyperlinks in labels
			window.setTimeout(function()
			{
				cellClicked(me.getCell());
			}, 0);
		};
	}
});