/**
 * Sample plugin.
 */
Draw.loadPlugin(function(ui) {

	var graph = ui.editor.graph;
	
	function updateOverlays(cell)
	{
		var tooltip = cell.getAttribute('tooltip');
		
		if (tooltip != null && tooltip.length > 0)
		{
			var overlays = graph.getCellOverlays(cell);
			
			if (overlays == null)
			{
				// Creates a new overlay with an image
				var overlay = new mxCellOverlay(
					new mxImage('data:image/png;base64,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', 48, 48),
					null, mxConstants.ALIGN_RIGHT, mxConstants.ALIGN_TOP, null, 'default');
				
				// Sets the overlay for the cell in the graph
				graph.addCellOverlay(cell, overlay);
			}
		}
		else
		{
			graph.removeCellOverlays(cell);
		}
	};
	
	function refresh()
	{
		var cells = graph.model.cells;
		
		for (var id in cells)
		{
			updateOverlays(cells[id]);
		}
	};
	
	graph.addListener(mxEvent.SIZE, refresh);
	refresh();
});