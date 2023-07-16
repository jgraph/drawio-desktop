/**
 * WebCola layout plugin.
 */
Draw.loadPlugin(function(ui)
{
	mxscript("plugins/webcola/cola.min.js", null, null, null, true);
	mxscript("plugins/webcola/mxWebColaAdaptor.js", null, null, null, true);
	mxscript("plugins/webcola/mxWebColaLayout.js", null, null, null, true);
	
	// Adds resource for action
	mxResources.parse('webColaLayout=WebCola Layout...');

	// Adds action
	ui.actions.addAction('webColaLayout', function()
	{
		// TODO: set mxWebColaAdaptor's doAnimations to the value of editorUi.allowAnimation
		// TODO: don't record all animation steps as undo states
		var graph = ui.editor.graph;
		var layout = new mxWebColaLayout(graph);
		var parent = graph.getDefaultParent(); 
		layout.execute(parent);
	});
	
	var menu = ui.menus.get('layout');
	
	if (menu != null)
	{
		var oldFunct = menu.funct;
		
		menu.funct = function(menu, parent)
		{
			oldFunct.apply(this, arguments);
			
			if (typeof window.mxWebColaLayout === 'function')
			{
				ui.menus.addMenuItems(menu, ['-', 'webColaLayout'], parent);
			}
		};
	}
});
