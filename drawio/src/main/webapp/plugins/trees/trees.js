/**
 * Mindmaps plugin.
 * 
 * Todo:
 * - Make cursor key selection more generic
 * - Handle single-cell movement on touch
 * - Move multiple cells without subtrees
 * - Make offset subtrees more generic
 */
Draw.loadPlugin(function(ui)
{
	if (ui.editor.isChromelessView())
	{
		return;
	}
	
	var spacing = 10;
	var level = 40;
	
	var graph = ui.editor.graph;
	var model = graph.getModel();
	
	// Adds resources for actions
	mxResources.parse('selectChildren=Select Children');
	mxResources.parse('selectSiblings=Select Siblings');
	mxResources.parse('selectSubtree=Select Subtree');
	mxResources.parse('selectParent=Select Parent');

	function isTreeCell(cell)
	{
		var result = false;
		
		if (cell != null)
		{
			graph.traverse(cell, true, function(vertex)
			{
				result = vertex.getAttribute('treeRoot') == '1';
				
				return !result;
			}, null, null, true);
		}
		
		return result;
	};

	var uiCreatePopupMenu = ui.menus.createPopupMenu;
	ui.menus.createPopupMenu = function(menu, cell, evt)
	{
		uiCreatePopupMenu.apply(this, arguments);
		
		if (isTreeCell(graph.getSelectionCell()) && graph.getSelectionCount() == 1)
		{
			var cell = graph.getSelectionCell();
			var sib = graph.getOutgoingEdges(cell);
			menu.addSeparator();
			
			if (sib != null && sib.length > 0)
			{
				this.addMenuItems(menu, ['selectChildren', 'selectSubtree'], null, evt);
			}
			
			menu.addSeparator();
			
			if (cell.getAttribute('treeRoot') != '1')
			{
				this.addMenuItems(menu, ['selectSiblings', 'selectParent'], null, evt);
			}
		}
	};
	
	// Adds actions
	ui.actions.addAction('selectChildren', function()
	{
		if (graph.isEnabled() && graph.getSelectionCount() == 1)
		{
			var cell = graph.getSelectionCell();
			var sib = graph.getOutgoingEdges(cell);
			
			if (sib != null)
			{
				var tmp = [];
				
				for (var i = 0; i < sib.length; i++)
				{
					tmp.push(graph.model.getTerminal(sib[i], false));
				}
				
				graph.setSelectionCells(tmp);
			}
		}
	}, null, null, 'Alt+Shift+X');
	
	// Adds actions
	ui.actions.addAction('selectSiblings', function()
	{
		if (graph.isEnabled() && graph.getSelectionCount() == 1)
		{
			var cell = graph.getSelectionCell();
			var edges = graph.getIncomingEdges(cell);

			if (edges != null && edges.length > 0)
			{
				var sib = graph.getOutgoingEdges(graph.model.getTerminal(edges[0], true));
				
				if (sib != null)
				{
					var tmp = [];
					
					for (var i = 0; i < sib.length; i++)
					{
						tmp.push(graph.model.getTerminal(sib[i], false));
					}
					
					graph.setSelectionCells(tmp);
				}
			}
		}
	}, null, null, 'Alt+Shift+S');
	
	// Adds actions
	ui.actions.addAction('selectParent', function()
	{
		if (graph.isEnabled() && graph.getSelectionCount() == 1)
		{
			var cell = graph.getSelectionCell();
			var edges = graph.getIncomingEdges(cell);

			if (edges != null && edges.length > 0)
			{
				graph.setSelectionCell(graph.model.getTerminal(edges[0], true));
			}
		}
	}, null, null, 'Alt+Shift+P');
	
	ui.actions.addAction('selectSubtree', function()
	{
		if (graph.isEnabled() && graph.getSelectionCount() == 1)
		{
			var cell = graph.getSelectionCell();
			// Makes space for new parent
			var subtree = [];
			
			graph.traverse(cell, true, function(vertex, edge)
			{
				if (edge != null)
				{
					subtree.push(edge);
				}

				subtree.push(vertex);
				
				return true;
			});
					
			graph.setSelectionCells(subtree);
		}
	}, null, null, 'Alt+Shift+T');
		
	/**
	 * Overriddes
	 */
	var graphFoldCells = graph.foldCells;
	
	graph.foldCells = function(collapse, recurse, cells, checkFoldable, evt)
	{
		//console.log('cells', cells, collapse);
		this.stopEditing();
		
		this.model.beginUpdate();
		try
		{
			var newCells = cells.splice();
			var tmp = [];
			
			for (var i = 0; i < cells.length; i++)
			{
				if (isTreeCell(cells[i]))
				{
					graph.traverse(cells[i], true, function(vertex, edge)
					{
						if (edge != null)
						{
							tmp.push(edge);
						}
						
						if (vertex != cells[i])
						{
							tmp.push(vertex);
						}
						
						// Stop traversal on collapsed vertices
						return vertex == cells[i] || !graph.model.isCollapsed(vertex);
					});
					
					graph.model.setCollapsed(cells[i], collapse);
				}
			}

			for (var i = 0; i < tmp.length; i++)
			{
				graph.model.setVisible(tmp[i], !collapse);
			}
			
			cells = newCells;
			graphFoldCells.apply(this, arguments);
		}
		finally
		{
			this.model.endUpdate();
		}
	};
	
	var graphRemoveCells = graph.removeCells;
	
	graph.removeCells = function(cells, includeEdges)
	{
		var tmp = [];
		
		for (var i = 0; i < cells.length; i++)
		{
			if (isTreeCell(cells[i]))
			{
				graph.traverse(cells[i], true, function(vertex, edge)
				{
					if (edge != null)
					{
						tmp.push(edge);
					}

					tmp.push(vertex);
					
					return true;
				});
				
				var edges = graph.getIncomingEdges(cells[i]);
				cells = cells.concat(edges);
			}
			else
			{
				tmp.push(cells[i]);
			}
		}
		
		cells = tmp;
		
		graphRemoveCells.apply(this, arguments);
	};

	ui.hoverIcons.getStateAt = function(state, x, y)
	{
		return (isTreeCell(state.cell)) ? null : this.graph.view.getState(this.graph.getCellAt(x, y));
	};
	
	var graphDuplicateCells = graph.duplicateCells;
	
	graph.duplicateCells = function(cells, append)
	{
		cells = (cells != null) ? cells : this.getSelectionCells();
		var temp = cells.slice(0);
		
		for (var i = 0; i < temp.length; i++)
		{
			var cell = temp[i];
			var state = graph.view.getState(cell);
			
			if (state != null && isTreeCell(state.cell))
			{
				// Avoids disconnecting subtree by removing all incoming edges
				var edges = graph.getIncomingEdges(state.cell);
				
				for (var j = 0; j < edges.length; j++)
				{
					mxUtils.remove(edges[j], cells);
				}
			}
		}
		
		this.model.beginUpdate();
		try
		{
			var result = graphDuplicateCells.call(this, cells, append);

			if (result.length == cells.length)
			{
				for (var i = 0; i < cells.length; i++)
				{
					if (isTreeCell(cells[i]))
					{
						var newEdges = graph.getIncomingEdges(result[i]);
						var edges = graph.getIncomingEdges(cells[i]);
						
						if (newEdges.length == 0 && edges.length > 0)
						{
							var clone = this.cloneCells([edges[0]])[0];
							this.addEdge(clone, graph.getDefaultParent(),
								this.model.getTerminal(edges[0], true), result[i]);
						}
					}
				}
			}
		}
		finally
		{
			this.model.endUpdate();
		}
		
		return result;
	};

	var graphMoveCells = graph.moveCells;
	
	graph.moveCells = function(cells, dx, dy, clone, target, evt, mapping)
	{
		var result = null;
		
		this.model.beginUpdate();
		try
		{
			var newSource = target;
			
			if (isTreeCell(target))
			{
				// Handles only drag from tree or from sidebar with dangling edges
				for (var i = 0; i < cells.length; i++)
				{
					if (isTreeCell(cells[i]) || (graph.model.isEdge(cells[i]) &&
						graph.model.getTerminal(cells[i], true) == null))
					{
						target = null;
						break;
					}
				}

				// Applies distance between previous and current parent for non-sidebar drags
				if (newSource != null && target == null && this.view.getState(cells[0]) != null)
				{
					var edges = graph.getIncomingEdges(cells[0]);
					
					if (edges.length > 0)
					{
						var state1 = graph.view.getState(graph.model.getTerminal(edges[0], true));
						
						if (state1 != null)
						{
							var state2 = graph.view.getState(newSource);
							
							if (state2 != null)
							{
								dx = state2.getCenterX() - state1.getCenterX();
								dy = state2.getCenterY() - state1.getCenterY();
							}
						}
					}
				}
			}

			result = graphMoveCells.apply(this, arguments);
			
			if (result.length == cells.length)
			{
				for (var i = 0; i < result.length; i++)
				{
					// Connects all dangling edges from the sidebar when dropped into drop target (not hover icon)
					if (this.model.isEdge(result[i]))
					{
						if (isTreeCell(newSource) && mxUtils.indexOf(result, this.model.getTerminal(result[i], true)) < 0)
						{
							this.model.setTerminal(result[i], newSource, true);
						}
					}
					else if (isTreeCell(cells[i]))
					{
						var edges = graph.getIncomingEdges(cells[i]);

						if (edges.length > 0)
						{
							if (!clone)
							{
								if (isTreeCell(newSource) && mxUtils.indexOf(cells, this.model.getTerminal(edges[0], true)) < 0)
								{
									this.model.setTerminal(edges[0], newSource, true);
								}
							}
							else
							{
								var newEdges = graph.getIncomingEdges(result[i]);
								
								if (newEdges.length == 0)
								{
									var temp = newSource;
									
									if (temp == null)
									{
										temp = graph.model.getTerminal(edges[0], true);
									}
									
									var clone = this.cloneCells([edges[0]])[0];
									this.addEdge(clone, graph.getDefaultParent(), temp, result[i]);
								}
							}
						}
					}
				}
			}
		}
		finally
		{
			this.model.endUpdate();
		}
		
		return result;
	};
	
	// Connects all dangling edges from the sidebar (by
	// default only first dangling edge gets connected)
	var sidebarDropAndConnect = ui.sidebar.dropAndConnect;
	
	ui.sidebar.dropAndConnect = function(source, targets, direction, dropCellIndex)
	{
		var model = graph.model;
		var result = null;
	
		model.beginUpdate();
		try
		{
			result = sidebarDropAndConnect.apply(this, arguments);
			
			if (isTreeCell(source))
			{
				for (var i = 0; i < result.length; i++)
				{
					if (model.isEdge(result[i]) && model.getTerminal(result[i], true) == null)
					{
						model.setTerminal(result[i], source, true);
						var geo = graph.getCellGeometry(result[i]);
						geo.points = null;
						
						if (geo.getTerminalPoint(true) != null)
						{
							geo.setTerminalPoint(null, true);
						}
					}
				}
			}
		}
		finally
		{
			model.endUpdate();
		}
		
		return result;
	};

	/**
	 * Checks source point of incoming edge relative to target terminal.
	 */
	function getTreeDirection(cell)
	{
		var state = graph.view.getState(cell);
		
		if (state != null)
		{
			var edges = graph.getIncomingEdges(state.cell);
			
			if (edges.length > 0)
			{
				var edgeState = graph.view.getState(edges[0]);
				
				if (edgeState != null)
				{
					var abs = edgeState.absolutePoints;
					
					if (abs != null && abs.length > 0)
					{
						var pt = abs[abs.length - 1];
						
						if (pt != null)
						{
							if (pt.y == state.y && Math.abs(pt.x - state.getCenterX()) < state.width / 2)
							{
								return mxConstants.DIRECTION_SOUTH;
							}
							else if (pt.y == state.y + state.height && Math.abs(pt.x - state.getCenterX()) < state.width / 2)
							{
								return mxConstants.DIRECTION_NORTH;
							}
							else if (pt.x > state.getCenterX())
							{
								return mxConstants.DIRECTION_WEST;
							} 
						}
					}
				}
			}
		}
		
		return mxConstants.DIRECTION_EAST;
	};
	
	function addSibling(cell, after)
	{
		after = (after != null) ? after : true;
		
		graph.model.beginUpdate();
		try
		{
			var edges = graph.getIncomingEdges(cell);
			var clones = graph.cloneCells([edges[0], cell]);
			graph.model.setTerminal(clones[0], graph.model.getTerminal(edges[0], true), true);

			var dir = getTreeDirection(cell);
			
			if (dir == mxConstants.DIRECTION_SOUTH || dir == mxConstants.DIRECTION_NORTH)
			{
				clones[1].geometry.x += (after) ? cell.geometry.width + spacing :
					-clones[1].geometry.width - spacing;
			}
			else
			{
				clones[1].geometry.y += (after) ? cell.geometry.height + spacing :
					-clones[1].geometry.height - spacing;
			}
			
			if (dir == mxConstants.DIRECTION_WEST)
			{
				clones[1].geometry.x = cell.geometry.x + cell.geometry.width - clones[1].geometry.width; 
			}
			
			// Moves existing siblings
			var state = graph.view.getState(cell);
			var s = graph.view.scale;
			
			if (state != null)
			{
				var bbox = mxRectangle.fromRectangle(state);
				
				if (dir == mxConstants.DIRECTION_SOUTH ||
					dir == mxConstants.DIRECTION_NORTH)
				{
					bbox.x += ((after) ? cell.geometry.width + spacing :
						-clones[1].geometry.width - spacing) * s;
				}
				else
				{
					bbox.y += ((after) ? cell.geometry.height + spacing :
						-clones[1].geometry.height - spacing) * s;
				}
				
				var sib = graph.getOutgoingEdges(graph.model.getTerminal(edges[0], true));
				
				if (sib != null)
				{
					var hor = (dir == mxConstants.DIRECTION_SOUTH || dir == mxConstants.DIRECTION_NORTH);
					var dx = 0;
					var dy = 0;
					
					for (var i = 0; i < sib.length; i++)
					{
						var temp = graph.model.getTerminal(sib[i], false);
						
						if (dir == getTreeDirection(temp))
						{
							var sibling = graph.view.getState(temp);
							
							if (temp != cell && sibling != null)
							{
								if ((hor && after != sibling.getCenterX() < state.getCenterX()) ||
									(!hor && after != sibling.getCenterY() < state.getCenterY()))
								{
									if (mxUtils.intersects(bbox, sibling))
									{
										dx = spacing + Math.max(dx, (Math.min(bbox.x + bbox.width,
											sibling.x + sibling.width) - Math.max(bbox.x, sibling.x)) / s);
										dy = spacing + Math.max(dy, (Math.min(bbox.y + bbox.height,
											sibling.y + sibling.height) - Math.max(bbox.y, sibling.y)) / s);
									}
								}
							}
						}
					}
					
					if (hor)
					{
						dy = 0;
					}
					else
					{
						dx = 0;
					}
					
					for (var i = 0; i < sib.length; i++)
					{
						var temp = graph.model.getTerminal(sib[i], false);
						
						if (dir == getTreeDirection(temp))
						{
							var sibling = graph.view.getState(temp);
							
							if (temp != cell && sibling != null)
							{
								if ((hor && after != sibling.getCenterX() < state.getCenterX()) ||
									(!hor && after != sibling.getCenterY() < state.getCenterY()))
								{
									var subtree = [];
									
									graph.traverse(sibling.cell, true, function(vertex, edge)
									{
										if (edge != null)
										{
											subtree.push(edge);
										}
	
										subtree.push(vertex);
										
										return true;
									});
									
									graph.moveCells(subtree, ((after) ? 1 : -1) * dx, ((after) ? 1 : -1) * dy);
								}
							}
						}
					}
				}
			}
			
			return graph.addCells(clones);
		}
		finally
		{
			graph.model.endUpdate();
		}
	};

	function addParent(cell)
	{
		graph.model.beginUpdate();
		try
		{
			var dir = getTreeDirection(cell);
			var edges = graph.getIncomingEdges(cell);
			var clones = graph.cloneCells([edges[0], cell]);
			graph.model.setTerminal(edges[0], clones[1], false);
			graph.model.setTerminal(clones[0], clones[1], true);
			graph.model.setTerminal(clones[0], cell, false);

			// Makes space for new parent
			var subtree = [];
			
			graph.traverse(cell, true, function(vertex, edge)
			{
				if (edge != null)
				{
					subtree.push(edge);
				}

				subtree.push(vertex);
				
				return true;
			});
			
			var dx = cell.geometry.width + level;
			var dy = cell.geometry.height + level;
			
			if (dir == mxConstants.DIRECTION_SOUTH)
			{
				dx = 0;
			}
			else if (dir == mxConstants.DIRECTION_NORTH)
			{
				dx = 0;
				dy = -level;
			}
			else if (dir == mxConstants.DIRECTION_WEST)
			{
				dx = -level;
				dy = 0;
			}
			else if (dir == mxConstants.DIRECTION_EAST)
			{
				dy = 0;
			}
			
			graph.moveCells(subtree, dx, dy);

			return graph.addCells(clones);
		}
		finally
		{
			graph.model.endUpdate();
		}
	};

	function addChild(cell)
	{
		graph.model.beginUpdate();
		try
		{
			var edges = graph.getIncomingEdges(cell);
			var clones = graph.cloneCells([edges[0], cell]);
			graph.model.setTerminal(clones[0], cell, true);
			
			// Finds free space
			var edges = graph.getOutgoingEdges(cell);
			var targets = [];
			
			for (var i = 0; i < edges.length; i++)
			{
				var target = graph.model.getTerminal(edges[i], false);
				
				if (target != null)
				{
					targets.push(target);
				}
			}
			
			var bbox = graph.view.getBounds(targets);
			var dir = getTreeDirection(cell);
			var tr = graph.view.translate;
			var s = graph.view.scale;
			
			if (dir == mxConstants.DIRECTION_SOUTH)
			{
				clones[1].geometry.x = (bbox == null) ? cell.geometry.x + (cell.geometry.width -
					clones[1].geometry.width) / 2 : (bbox.x + bbox.width) / s - tr.x + spacing; 
				clones[1].geometry.y += cell.geometry.height + level;
			}
			else if (dir == mxConstants.DIRECTION_NORTH)
			{
				clones[1].geometry.x = (bbox == null) ? cell.geometry.x + (cell.geometry.width -
						clones[1].geometry.width) / 2 : (bbox.x + bbox.width) / s - tr.x + spacing; 
				clones[1].geometry.y -= clones[1].geometry.height + level;
			}
			else if (dir == mxConstants.DIRECTION_WEST)
			{
				clones[1].geometry.x -= clones[1].geometry.width + level;
				clones[1].geometry.y = (bbox == null) ? cell.geometry.y + (cell.geometry.height -
						clones[1].geometry.height) / 2 : (bbox.y + bbox.height) / s - tr.y + spacing; 
			}
			else
			{
				clones[1].geometry.x += cell.geometry.width + level;
				clones[1].geometry.y = (bbox == null) ? cell.geometry.y + (cell.geometry.height -
						clones[1].geometry.height) / 2 : (bbox.y + bbox.height) / s - tr.y + spacing; 
			}
			
			return graph.addCells(clones);
		}
		finally
		{
			graph.model.endUpdate();
		}
	};
	
	function getOrderedTargets(cell, horizontal, ref)
	{
		var sib = graph.getOutgoingEdges(cell);
		var state = graph.view.getState(ref);
		var targets = [];
		
		if (state != null && sib != null)
		{
			for (var i = 0; i < sib.length; i++)
			{
				var temp = graph.view.getState(graph.model.getTerminal(sib[i], false));
				
				if (temp != null && ((!horizontal && (Math.min(temp.x + temp.width,
					state.x + state.width) >= Math.max(temp.x, state.x))) ||
					(horizontal && (Math.min(temp.y + temp.height, state.y + state.height) >=
					Math.max(temp.y, state.y)))))
				{
					targets.push(temp);
				}
			}
			
			targets.sort(function(a, b)
			{
				return (horizontal) ? a.x + a.width - b.x - b.width : a.y + a.height - b.y - b.height;
			});
		}
		
		return targets;
	};
	
	function selectCell(cell, direction)
	{
		var dir = getTreeDirection(cell);
		var h1 = dir == mxConstants.DIRECTION_EAST || dir == mxConstants.DIRECTION_WEST;
		var h2 = direction == mxConstants.DIRECTION_EAST || direction == mxConstants.DIRECTION_WEST;
		
		if (h1 == h2 && dir != direction)
		{
			ui.actions.get('selectParent').funct();
		}
		else if (dir == direction)
		{
			var sib = graph.getOutgoingEdges(cell);
			
			if (sib != null && sib.length > 0)
			{
				graph.setSelectionCell(graph.model.getTerminal(sib[0], false));
			}	
		}
		else
		{
			var edges = graph.getIncomingEdges(cell);

			if (edges != null && edges.length > 0)
			{
				var targets = getOrderedTargets(graph.model.getTerminal(edges[0], true), h2, cell);
				var state = graph.view.getState(cell);
				
				if (state != null)
				{
					var idx = mxUtils.indexOf(targets, state);
					
					if (idx >= 0)
					{
						idx += (direction == mxConstants.DIRECTION_NORTH || direction == mxConstants.DIRECTION_WEST) ? -1 : 1;
						
						if (idx >= 0 && idx <= targets.length - 1)
						{
							graph.setSelectionCell(targets[idx].cell);
						}
					}
				}
			}	
		}
	};

	// Overrides keyboard shortcuts
	var altShiftActions = {88: ui.actions.get('selectChildren'), // Alt+Shift+X
			84: ui.actions.get('selectSubtree'), // Alt+Shift+T
			80: ui.actions.get('selectParent'), // Alt+Shift+P
			83: ui.actions.get('selectSiblings')} // Alt+Shift+S

	var editorUiOnKeyDown = ui.onKeyDown;
	
	ui.onKeyDown = function(evt)
	{
		try
		{
			if (graph.isEnabled() && !graph.isEditing() && graph.getSelectionCount() == 1 &&
				isTreeCell(graph.getSelectionCell()))
			{
				var cells = null;

				if (graph.getSelectionCell().getAttribute('treeRoot') != '1')
				{
					if (evt.which == 9) // Tab adds child
					{
						cells = (mxEvent.isShiftDown(evt)) ?
							addParent(graph.getSelectionCell()) :
							addChild(graph.getSelectionCell());
					}
					else if (evt.which == 13) // Enter adds sibling
					{
						cells = addSibling(graph.getSelectionCell(), !mxEvent.isShiftDown(evt));
					}
				}
				
				if (cells != null && cells.length > 0)
				{
					if (cells.length == 1 && graph.model.isEdge(cells[0]))
					{
						graph.setSelectionCell(graph.model.getTerminal(cells[0], false));
					}
					else
					{
						graph.setSelectionCell(cells[cells.length - 1]);
					}
					
					if (ui.hoverIcons != null)
					{
						ui.hoverIcons.update(graph.view.getState(graph.getSelectionCell()));
					}
					
					graph.startEditingAtCell(graph.getSelectionCell());
					mxEvent.consume(evt);
				}
				else
				{
					if (mxEvent.isAltDown(evt) && mxEvent.isShiftDown(evt))
					{
						var action = altShiftActions[evt.keyCode];

						if (action != null)
						{
							action.funct(evt);
							mxEvent.consume(evt);
						}
					}
					else
					{
						if (evt.keyCode == 37) // left
						{
							selectCell(graph.getSelectionCell(), mxConstants.DIRECTION_WEST);
							mxEvent.consume(evt);
						}
						else if (evt.keyCode == 38) // up
						{
							selectCell(graph.getSelectionCell(), mxConstants.DIRECTION_NORTH);
							mxEvent.consume(evt);
						}
						else if (evt.keyCode == 39) // right
						{
							selectCell(graph.getSelectionCell(), mxConstants.DIRECTION_EAST);
							mxEvent.consume(evt);
						}
						else if (evt.keyCode == 40) // down
						{
							selectCell(graph.getSelectionCell(), mxConstants.DIRECTION_SOUTH);
							mxEvent.consume(evt);
						}
					}
				}
			}
		}
		catch (e)
		{
			console.log('error', e);
		}
		
		if (!mxEvent.isConsumed(evt))
		{
			editorUiOnKeyDown.apply(this, arguments);
		}
	};

	var graphConnectVertex = graph.connectVertex;
	
	graph.connectVertex = function(source, direction, length, evt, forceClone, ignoreCellAt)
	{
		if (isTreeCell(source) && source.getAttribute('treeRoot') != '1')
		{
			var dir = getTreeDirection(source);
			var h1 = dir == mxConstants.DIRECTION_EAST || dir == mxConstants.DIRECTION_WEST;
			var h2 = direction == mxConstants.DIRECTION_EAST || direction == mxConstants.DIRECTION_WEST;
			
			if (dir == direction)
			{
				return addChild(source);
			}
			else if (h1 == h2)
			{
				return addParent(source);
			}
			else
			{
				return addSibling(source, direction != mxConstants.DIRECTION_NORTH &&
					direction != mxConstants.DIRECTION_WEST);
			}
			
			return [];
		}
		else
		{
			this.model.beginUpdate();
			try
			{
				var cells = graphConnectVertex.call(this, source, direction, length, evt, forceClone,
					ignoreCellAt || source.getAttribute('treeRoot') == '1');
				
				// Removes treeRoot flag in clones
				if (source.getAttribute('treeRoot') == '1')
				{
					for (var i = 0; i < cells.length; i++)
					{
						if (cells[i].getAttribute('treeRoot') == '1')
						{
							graph.setAttributeForCell(cells[i], 'treeRoot', null);
						}
					}
				}
			}
			finally
			{
				this.model.endUpdate();
			}
			
			return cells;
		}
	};
	
	var graphHandlerGetCells = graph.graphHandler.getCells;

	graph.graphHandler.getCells = function(initialCell)
	{
		var cells = graphHandlerGetCells.apply(this, arguments);
		var temp = cells.slice(0);
		
		// Removes all edges first
		for (var i = 0; i < temp.length; i++)
		{
			if (isTreeCell(temp[i]))
			{
				// Avoids disconnecting subtree by removing all incoming edges
				var edges = graph.getIncomingEdges(temp[i]);
				
				for (var j = 0; j < edges.length; j++)
				{
					mxUtils.remove(edges[j], cells);
				}
			}
		}
		
		for (var i = 0; i < temp.length; i++)
		{
			if (isTreeCell(temp[i]))
			{
				// Gets the subtree from cell downwards
				graph.traverse(temp[i], true, function(vertex, edge)
				{
					// TODO: Use dictionary to avoid duplicates
					if (edge != null && mxUtils.indexOf(cells, edge) < 0)
					{
						cells.push(edge);
					}

					if (mxUtils.indexOf(cells, vertex) < 0)
					{
						cells.push(vertex);
					}
					
					return true;
				});
			}
		}

		return cells;
	};
	
//	var ignoreMove = false;
//	
//	graph.addListener(mxEvent.MOVE_CELLS, function(sender, evt)
//	{
//		if (!ignoreMove)
//		{
//			var cells = evt.getProperty('cells');
//			var dx = evt.getProperty('dx');
//			var dy = evt.getProperty('dy');
//			ignoreMove = true;
//			
//			for (var i = 0; i < cells.length; i++)
//			{
//				var state = graph.view.getState(cells[i]);
//				
//				if (state != null && state.style['mindmapRoot'] == '1')
//				{
//					// TODO: Move subtree by same dx/dy
//					//layout.execute(model.getParent(state.cell), state.cell);
//					
//					// Gets the subtree from cell downwards
//					var tmp = [];
//					graph.traverse(cells[i], true, function(vertex)
//					{
//						tmp.push(vertex);
//						
//						return true;
//					});
//					
//					mxUtils.remove(cells[i], tmp);
//					graph.moveCells(tmp, dx, dy);
//				}
//			}
//
//			ignoreMove = false;
//		}
//	});
	
	// Defines a new class for all icons
	function mxIconSet(state)
	{
		this.images = [];
		var graph = state.view.graph;
		
		// Icon1
//		var img = mxUtils.createImage('images/handle-connect.png');
//		img.setAttribute('title', 'Duplicate');
//		img.style.position = 'absolute';
//		img.style.cursor = 'pointer';
//		img.style.width = '26px';
//		img.style.height = '26px';
//		img.style.left = (state.x - 13) + 'px';
//		img.style.top = (state.getCenterY() - 13) + 'px';
//		
//		mxEvent.addGestureListeners(img,
//			mxUtils.bind(this, function(evt)
//			{
//				var s = graph.gridSize;
//				graph.setSelectionCells(graph.moveCells([state.cell], s, s, true));
//				mxEvent.consume(evt);
//				this.destroy();
//			})
//		);
//		
//		state.view.graph.container.appendChild(img);
//		this.images.push(img);
		
		// Delete
		var img = mxUtils.createImage('plugins/trees/handle-move.gif');
		img.setAttribute('title', 'Move Cell without Subtree');
		img.style.position = 'absolute';
		img.style.cursor = 'pointer';
		img.style.width = '26px';
		img.style.height = '26px';
		img.style.left = (state.getCenterX() - 13) + 'px';
		img.style.top = (state.getCenterY() - 13) + 'px';
		
		mxEvent.addGestureListeners(img, mxUtils.bind(this, function(evt)
		{
			graph.stopEditing(false);
			ui.hoverIcons.reset();
			
			if (!graph.isCellSelected(state.cell))
			{
				graph.setSelectionCell(state.cell);
			}
			
			graph.graphHandler.start(state.cell, mxEvent.getClientX(evt), mxEvent.getClientY(evt));

			graph.graphHandler.cells = [state.cell];
			graph.graphHandler.bounds = graph.graphHandler.graph.getView().getBounds(graph.graphHandler.cells);
			graph.graphHandler.pBounds = graph.graphHandler.getPreviewBounds(graph.graphHandler.cells);
			
			graph.graphHandler.cellWasClicked = true;
			graph.isMouseDown = true;
			graph.isMouseTrigger = mxEvent.isMouseEvent(evt);
			mxEvent.consume(evt);
			
			// Disables dragging the image
			mxEvent.consume(evt);
			this.destroy();
		}));
		
//		mxEvent.addListener(img, 'click',
//			mxUtils.bind(this, function(evt)
//			{
//				console.log('here', graph.graphHandler.dx);
//				
//				if (Math.abs(graph.graphHandler.currentDx) < graph.tolerance)
//				{
//					graph.setSelectionCell(state.cell);
//				}
//			})
//		);
		
		state.view.graph.container.appendChild(img);
		this.images.push(img);
	};
	
	mxIconSet.prototype.destroy = function()
	{
		if (this.images != null)
		{
			for (var i = 0; i < this.images.length; i++)
			{
				var img = this.images[i];
				img.parentNode.removeChild(img);
			}
		}
		
		this.images = null;
	};
	
	// Defines the tolerance before removing the icons
	var iconTolerance = 20;

	// Shows icons if the mouse is over a cell
	graph.addMouseListener(
	{
	    currentState: null,
	    currentIconSet: null,
	    mouseDown: function(sender, me)
	    {
	    	// Hides icons on mouse down
        	if (this.currentState != null)
        	{
          		this.dragLeave(me.getEvent(), this.currentState);
          		this.currentState = null;
        	}
        	
        	// TODO: Fix single cell movement on touch devices
//        	if (mxEvent.isTouchEvent(me.getEvent()))
//        	{
//        		this.mouseMove(sender, me);
//        	}
	    },
	    mouseMove: function(sender, me)
	    {
	    	if (this.currentState != null && (me.getState() == this.currentState ||
	    		me.getState() == null))
	    	{
	    		var tol = iconTolerance;
	    		var tmp = new mxRectangle(me.getGraphX() - tol,
	    			me.getGraphY() - tol, 2 * tol, 2 * tol);

	    		if (mxUtils.intersects(tmp, this.currentState))
	    		{
	    			return;
	    		}
	    	}
	    	
			var tmp = me.getState();
			
	    	// Ignores everything but vertices
			if ((graph.isMouseDown && !mxEvent.isTouchEvent(me.getEvent())) ||
				graph.isEditing() || (tmp != null &&
				(!graph.getModel().isVertex(tmp.cell) || !isTreeCell(me.getCell()))))
			{
				tmp = null;
			}
			
	      	if (tmp != this.currentState)
	      	{
	        	if (this.currentState != null)
	        	{
	          		this.dragLeave(me.getEvent(), this.currentState);
	        	}
	        
        		this.currentState = tmp;
	        
	        	if (this.currentState != null)
	        	{
	          		this.dragEnter(me.getEvent(), this.currentState);
	        	}
	      	}
	    },
	    mouseUp: function(sender, me) { },
	    dragEnter: function(evt, state)
	    {
	    	if (this.currentIconSet == null)
	    	{
    			this.currentIconSet = new mxIconSet(state);
	    	}
	    },
	    dragLeave: function(evt, state)
	    {
	    	if (this.currentIconSet != null)
	    	{
    			this.currentIconSet.destroy();
    			this.currentIconSet = null;
	    	}
	    }
	});

	// Adds sidebar entries
	var sb = ui.sidebar;

	function addPalette()
	{
		sb.addPalette('trees', 'Trees', false, function(content)
		{
			(function()
			{
				var cell = new mxCell('Central Idea', new mxGeometry(0, 20, 100, 40),
					'ellipse;whiteSpace=wrap;html=1;align=center;' +
					'collapsible=0;container=1;recursiveResize=0;');
				graph.setAttributeForCell(cell, 'treeRoot', '1');
				cell.vertex = true;
				
				var cell2 = new mxCell('Branch', new mxGeometry(160, 0, 80, 20),
					'whiteSpace=wrap;html=1;shape=partialRectangle;top=0;left=0;bottom=1;right=0;points=[[0,1],[1,1]];' +
					'strokeColor=#000000;fillColor=none;align=center;verticalAlign=bottom;routingCenterY=0.5;' +
					'snapToPoint=1;collapsible=0;container=1;recursiveResize=0;autosize=1;');
				cell2.vertex = true;

				var edge = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=entityRelationEdgeStyle;' +
					'startArrow=none;endArrow=none;segment=10;curved=1;');
				edge.geometry.relative = true;
				edge.edge = true;

				cell.insertEdge(edge, true);
				cell2.insertEdge(edge, false);
				
				var cell3 = new mxCell('Sub Topic', new mxGeometry(160, 40, 72, 26),
					'whiteSpace=wrap;html=1;rounded=1;arcSize=50;align=center;verticalAlign=middle;' +
					'collapsible=0;container=1;recursiveResize=0;strokeWidth=1;autosize=1;spacing=4;');
				cell3.vertex = true;

				var edge2 = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=entityRelationEdgeStyle;' +
					'startArrow=none;endArrow=none;segment=10;curved=1;');
				edge2.geometry.setTerminalPoint(new mxPoint(-40, 40), true);
				edge2.geometry.relative = true;
				edge2.edge = true;

				cell.insertEdge(edge2, true);
				cell3.insertEdge(edge2, false);

				content.appendChild(sb.createVertexTemplateFromCells([edge, edge2, cell, cell2, cell3], 240, 66, 'Mindmap'));
			})();

			(function()
			{
				var cell = new mxCell('Central Idea', new mxGeometry(0, 0, 100, 40),
					'ellipse;whiteSpace=wrap;html=1;align=center;' +
					'collapsible=0;container=1;recursiveResize=0;');
				graph.setAttributeForCell(cell, 'treeRoot', '1');
				cell.vertex = true;
				
				content.appendChild(sb.createVertexTemplateFromCells([cell], 100, 40, 'Central Idea'));
			})();

			(function()
			{
				var cell = new mxCell('Branch', new mxGeometry(0, 0, 80, 20),
					'whiteSpace=wrap;html=1;shape=partialRectangle;top=0;left=0;bottom=1;right=0;points=[[0,1],[1,1]];' +
					'strokeColor=#000000;fillColor=none;align=center;verticalAlign=bottom;routingCenterY=0.5;' +
					'snapToPoint=1;collapsible=0;container=1;recursiveResize=0;autosize=1;');
				cell.vertex = true;

				var edge = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=entityRelationEdgeStyle;' +
					'startArrow=none;endArrow=none;segment=10;curved=1;');
				edge.geometry.setTerminalPoint(new mxPoint(-40, 40), true);
				edge.geometry.relative = true;
				edge.edge = true;

				cell.insertEdge(edge, false);
		
				content.appendChild(sb.createVertexTemplateFromCells([edge, cell], 80, 20, 'Branch'));
			})();
			
			(function()
			{
				var cell = new mxCell('Sub Topic', new mxGeometry(0, 0, 72, 26),
					'whiteSpace=wrap;html=1;rounded=1;arcSize=50;align=center;verticalAlign=middle;' +
					'collapsible=0;container=1;recursiveResize=0;strokeWidth=1;autosize=1;spacing=4;');
				cell.vertex = true;

				var edge = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=entityRelationEdgeStyle;' +
					'startArrow=none;endArrow=none;segment=10;curved=1;');
				edge.geometry.setTerminalPoint(new mxPoint(-40, 40), true);
				edge.geometry.relative = true;
				edge.edge = true;

				cell.insertEdge(edge, false);

				content.appendChild(sb.createVertexTemplateFromCells([edge, cell], 72, 26, 'Sub Topic'));
			})();

			(function()
			{
				var cell = new mxCell('Organization', new mxGeometry(60, 0, 120, 60),
					'whiteSpace=wrap;html=1;align=center;' +
					'collapsible=0;container=1;recursiveResize=0;');
				graph.setAttributeForCell(cell, 'treeRoot', '1');
				cell.vertex = true;
				
				var cell2 = new mxCell('Division', new mxGeometry(0, 100, 100, 60),
					'whiteSpace=wrap;html=1;align=center;verticalAlign=middle;' +
					'collapsible=0;container=1;recursiveResize=0;');
				cell2.vertex = true;

				var edge = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=elbowEdgeStyle;elbow=vertical;' +
					'startArrow=none;endArrow=none;rounded=0;');
				edge.geometry.relative = true;
				edge.edge = true;

				cell.insertEdge(edge, true);
				cell2.insertEdge(edge, false);
				
				var cell3 = new mxCell('Division', new mxGeometry(140, 100, 100, 60),
					'whiteSpace=wrap;html=1;align=center;verticalAlign=middle;' +
					'collapsible=0;container=1;recursiveResize=0;');
				cell3.vertex = true;

				var edge2 = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=elbowEdgeStyle;elbow=vertical;' +
					'startArrow=none;endArrow=none;rounded=0;');
				edge2.geometry.relative = true;
				edge2.edge = true;

				cell.insertEdge(edge2, true);
				cell3.insertEdge(edge2, false);
				
				content.appendChild(sb.createVertexTemplateFromCells([edge, edge2, cell, cell2, cell3], 240, 160, 'Orgchart'));
			})();
			
			(function()
			{
				var cell = new mxCell('Tree Root', new mxGeometry(0, 0, 120, 60),
					'whiteSpace=wrap;html=1;align=center;' +
					'collapsible=0;container=1;recursiveResize=0;');
				graph.setAttributeForCell(cell, 'treeRoot', '1');
				cell.vertex = true;
				
				content.appendChild(sb.createVertexTemplateFromCells([cell], 120, 60, 'Tree Root'));
			})();
			
			(function()
			{
				var cell = new mxCell('Sub Tree', new mxGeometry(0, 0, 100, 60),
					'whiteSpace=wrap;html=1;align=center;verticalAlign=middle;' +
					'collapsible=0;container=1;recursiveResize=0;');
				cell.vertex = true;

				var edge = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=elbowEdgeStyle;elbow=vertical;' +
					'startArrow=none;endArrow=none;rounded=0;');
				edge.geometry.setTerminalPoint(new mxPoint(0, -40), true);
				edge.geometry.relative = true;
				edge.edge = true;

				cell.insertEdge(edge, false);

				content.appendChild(sb.createVertexTemplateFromCells([edge, cell], 100, 60, 'Sub Tree'));
			})();
			
			(function()
			{
				var cell = new mxCell('Sub Section', new mxGeometry(0, 0, 100, 60),
					'whiteSpace=wrap;html=1;align=center;verticalAlign=middle;' +
					'collapsible=0;container=1;recursiveResize=0;');
				cell.vertex = true;

				var edge = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=orthogonalEdgeStyle;' +
					'startArrow=none;endArrow=none;rounded=0;targetPortConstraint=eastwest;sourcePortConstraint=northsouth;');
				edge.geometry.setTerminalPoint(new mxPoint(110, -40), true);
				edge.geometry.relative = true;
				edge.edge = true;

				cell.insertEdge(edge, false);

				var cell2 = new mxCell('Sub Section', new mxGeometry(120, 0, 100, 60),
					'whiteSpace=wrap;html=1;align=center;verticalAlign=middle;' +
					'collapsible=0;container=1;recursiveResize=0;');
				cell2.vertex = true;

				var edge2 = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=orthogonalEdgeStyle;' +
					'startArrow=none;endArrow=none;rounded=0;targetPortConstraint=eastwest;sourcePortConstraint=northsouth;');
				edge2.geometry.setTerminalPoint(new mxPoint(110, -40), true);
				edge2.geometry.relative = true;
				edge2.edge = true;

				cell2.insertEdge(edge2, false);
				
				content.appendChild(sb.createVertexTemplateFromCells([edge, edge2, cell, cell2], 220, 60, 'Sub Sections'));
			})();
		});
	}

	addPalette();

	// Handles reload of sidebar after dark mode change
	var init = sb.init;

	sb.init = function()
	{
		init.apply(this, arguments);
		addPalette();
	};
});
