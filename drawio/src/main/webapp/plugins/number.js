/**
 * Sample plugin.
 */
Draw.loadPlugin(function(ui) {

	// Adds numbered toggle property
	Editor.commonVertexProperties.push({name: 'numbered', dispName: 'Numbered', type: 'bool', defVal: true, isVisible: function(state, format)
	{
		var graph = format.editorUi.editor.graph;

		return graph.view.redrawNumberShape != null;
	}, onChange: function(graph, newValue)
	{
		graph.refresh();
	}});

	var graph = ui.editor.graph;
	var enabled = true;
	var counter = 0;
	
	var graphViewResetValidationState = graph.view.resetValidationState;
	
	graph.view.resetValidationState = function()
	{
		graphViewResetValidationState.apply(this, arguments);
		this.numberCounter = 0;
	};
	
	var graphViewValidateCellState = graph.view.validateCellState;
	
	graph.view.validateCellState = function(cell, recurse)
	{
		var state = graphViewValidateCellState.apply(this, arguments);
		recurse = (recurse != null) ? recurse : true;
		
		if (recurse && state != null && graph.model.isVertex(state.cell) &&
			mxUtils.getValue(state.style, 'numbered', 1) == 1)
		{
			this.numberCounter++;
			this.redrawNumberShape(state);
		}
		
		return state;
	};
	
	graph.view.redrawNumberShape = function(state)
	{
		var numbered = mxUtils.getValue(state.style, 'numbered', 1) == 1;
		var value = '<div style="padding:2px;border:1px solid gray;background:yellow;border-radius:2px;">' +
			(this.numberCounter) + '</div>';

		if (enabled && numbered && graph.model.isVertex(state.cell) &&
			state.shape != null && state.secondLabel == null)
		{
			state.secondLabel = new mxText(value, new mxRectangle(),
					mxConstants.ALIGN_LEFT, mxConstants.ALIGN_BOTTOM);

			// Styles the label
			state.secondLabel.size = 12;
			state.secondLabel.dialect = mxConstants.DIALECT_STRICTHTML;
			graph.cellRenderer.initializeLabel(state, state.secondLabel);
		}
		
		if (state.secondLabel != null)
		{
			if (!numbered)
			{
				state.secondLabel.destroy();
				state.secondLabel = null;
			}
			else
			{
				var scale = graph.getView().getScale();
				var bounds = new mxRectangle(state.x + state.width - 4 * scale, state.y + 4 * scale, 0, 0);
				state.secondLabel.value = value;
				state.secondLabel.state = state;
				state.secondLabel.scale = scale;
				state.secondLabel.bounds = bounds;
				state.secondLabel.redraw();
			}
		}
	};

	// Destroys the shape number
	var destroy = graph.cellRenderer.destroy;
	graph.cellRenderer.destroy = function(state)
	{
		destroy.apply(this, arguments);
		
		if (state.secondLabel != null)
		{
			state.secondLabel.destroy();
			state.secondLabel = null;
		}
	};
	
	graph.cellRenderer.getShapesForState = function(state)
	{
		return [state.shape, state.text, state.secondLabel, state.control];
	};
	
	// Extends View menu
	mxResources.parse('number=Number');

    // Adds action
    var action = ui.actions.addAction('number...', function()
    {
		enabled = !enabled;
		graph.refresh();
    });
	
    action.setToggleAction(true);
	action.setSelectedCallback(function() { return enabled; });
    
	var menu = ui.menus.get((urlParams['sketch'] == '1') ? 'extras' : 'view');
	var oldFunct = menu.funct;
	
	menu.funct = function(menu, parent)
	{
		oldFunct.apply(this, arguments);
		
		ui.menus.addMenuItems(menu, ['-', 'number'], parent);
	};
	
	// Forces refresh if file was loaded before plugin
	if (ui.getCurrentFile() != null)
	{
		graph.refresh();
	}
});