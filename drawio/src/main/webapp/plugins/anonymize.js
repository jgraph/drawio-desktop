/**
 * Explore plugin.
 */
Draw.loadPlugin(function(editorUi)
{
	var div = document.createElement('div');
	
	// Adds resource for action
	mxResources.parse('anonymizeCurrentPage=Anonymize Current Page');

	function replaceTextContent(elt)
	{
		if (elt.nodeValue != null)
		{
			elt.nodeValue = editorUi.anonymizeString(elt.nodeValue);
		}
		
		if (elt.nodeType == mxConstants.NODETYPE_ELEMENT)
		{
			var tmp = elt.firstChild;
			
			while (tmp != null)
			{
				replaceTextContent(tmp);
				tmp = tmp.nextSibling;
			}
		}
	};
	
	function anonymizeHtml(html)
	{
		div.innerHTML = html;
		
		replaceTextContent(div);
		
		return div.innerHTML;
	};

	// Adds action
	editorUi.actions.addAction('anonymizeCurrentPage', function()
	{
		var graph = editorUi.editor.graph;
		var model = graph.model;
		
		model.beginUpdate();
		try
		{
			// Queue used to fix ancestor placeholders
			var queue = [];

			for (var id in model.cells)
			{
				var cell = model.cells[id];
				var label = graph.getLabel(cell);
				
				if (graph.isHtmlLabel(cell))
				{
					label = anonymizeHtml(label);
				}
				else
				{
					label = editorUi.anonymizeString(label);
				}
				
				queue.push({cell: cell, label: label});
			}
			
			for (var i = 0; i < queue.length; i++)
			{
				model.setValue(queue[i].cell, queue[i].label);
			}
						
			// Change page title
			if (editorUi.currentPage != null)
			{
				model.execute(new RenamePage(editorUi, editorUi.currentPage,
					editorUi.anonymizeString(editorUi.currentPage.getName())));
			}
		}
		finally
		{
			model.endUpdate();
		}
	});
	
	var menu = editorUi.menus.get('extras');
	var oldFunct = menu.funct;
	
	menu.funct = function(menu, parent)
	{
		oldFunct.apply(this, arguments);
		
		editorUi.menus.addMenuItems(menu, ['-', 'anonymizeCurrentPage'], parent);
	};

});
