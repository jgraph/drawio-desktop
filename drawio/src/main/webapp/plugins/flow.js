/**
 * Flow plugin.
 */
Draw.loadPlugin(function(ui)
{
	// Adds resource for action
	mxResources.parse('toggleFlow=Toggle Flow...');
	
	// Max number of edges per page
	var pageSize = 20;

	var uiCreatePopupMenu = ui.menus.createPopupMenu;
	ui.menus.createPopupMenu = function(menu, cell, evt)
	{
		uiCreatePopupMenu.apply(this, arguments);
		
		var graph = ui.editor.graph;
		
		if (graph.model.isEdge(graph.getSelectionCell()))
		{
			this.addMenuItems(menu, ['-', 'toggleFlow'], null, evt);
		}
	};

	//
	// Main function
	//
	function toggleFlow(cells)
	{
		for (var i = 0; i < cells.length; i++)
		{
			if (ui.editor.graph.model.isEdge(cells[i]))
			{
				var state = ui.editor.graph.view.getState(cells[i]);
				
				if (state.shape != null)
				{
					var paths = state.shape.node.getElementsByTagName('path');
					
					if (paths.length > 1)
					{
						if (paths[1].getAttribute('class') == 'mxEdgeFlow')
						{
							paths[1].removeAttribute('class');
			
							if (mxUtils.getValue(state.style, mxConstants.STYLE_DASHED, '0') != '1')
							{
								paths[1].removeAttribute('stroke-dasharray');
							}
						}
						else
						{
							paths[1].setAttribute('class', 'mxEdgeFlow');
			
							if (mxUtils.getValue(state.style, mxConstants.STYLE_DASHED, '0') != '1')
							{
								paths[1].setAttribute('stroke-dasharray', '8');
							}
						}
					}
				}
			}
		}
	};
	
	// Adds action
	ui.actions.addAction('toggleFlow', function()
	{
		var cell = ui.editor.graph.getSelectionCell();
		
		if (ui.editor.graph.model.isEdge(cell))
		{
			toggleFlow(ui.editor.graph.getSelectionCells());
		}
	});
	
	// Click handler for chromeless mode
	if (ui.editor.isChromelessView())
	{
		ui.editor.graph.click = function(me)
		{
			if (ui.editor.graph.model.isEdge(me.getCell()))
			{
				toggleFlow([me.getCell()]);
			}
		};
	}
	
	try
	{
		var style = document.createElement('style')
		style.type = 'text/css';
		style.innerHTML = ['.mxEdgeFlow {',
			  'animation: mxEdgeFlow 0.5s linear;',
			  'animation-iteration-count: infinite;',
			'}',
			'@keyframes mxEdgeFlow {',
			  'to {',
			    'stroke-dashoffset: -16;',
			  '}',
			'}'].join('\n');
		document.getElementsByTagName('head')[0].appendChild(style);
	}
	catch (e)
	{
		// ignore
	}
});
