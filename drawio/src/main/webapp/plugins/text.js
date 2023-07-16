/**
 * Text extraction plugin.
 */
Draw.loadPlugin(function(ui)
{
	// Adds resource for action
	mxResources.parse('extractText=Extract Text...');

	// Adds action
	ui.actions.addAction('extractText', function()
	{
		var graph = ui.editor.graph;
		var text = graph.getIndexableText(
			(graph.isSelectionEmpty()) ? null :
			graph.getSelectionCells());
		var dlg = new EmbedDialog(ui, text, null,
			null, null, 'Extracted Text:');
		ui.showDialog(dlg.container, 450, 240, true, true);
		dlg.init();
	});
	
	var menu = ui.menus.get('extras');
	var oldFunct = menu.funct;
	
	menu.funct = function(menu, parent)
	{
		oldFunct.apply(this, arguments);
		
		ui.menus.addMenuItems(menu, ['-', 'extractText'], parent);
	};
});
