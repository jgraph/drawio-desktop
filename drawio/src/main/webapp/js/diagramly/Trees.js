/**
 * Copyright (c) 2006-2017, JGraph Ltd
 * Copyright (c) 2006-2017, Gaudenz Alder
 */
(function()
{

	/**
	 * Overrides folding based on treeFolding style.
	 */
	var graphFoldCells = Graph.prototype.foldCells;
	
	Graph.prototype.foldCells = function(collapse, recurse, cells, checkFoldable, evt)
	{
		recurse = (recurse != null) ? recurse : false;
		
		if (cells == null)
		{
			cells = this.getFoldableCells(this.getSelectionCells(), collapse);
		}

		this.stopEditing();
		
		this.model.beginUpdate();
		try
		{
			var newCells = cells.slice();
			
			for (var i = 0; i < cells.length; i++)
			{
				if (mxUtils.getValue(this.getCurrentCellStyle(cells[i]),
					'treeFolding', '0') == '1')
				{
					this.foldTreeCell(collapse, cells[i]);
				}
			}
			
			cells = newCells;
			cells = graphFoldCells.apply(this, arguments);
		}
		finally
		{
			this.model.endUpdate();
		}
		
		return cells;
	};
	
	/**
	 * Implements folding a tree cell.
	 */
	Graph.prototype.foldTreeCell = function(collapse, cell)
	{
		this.model.beginUpdate();
		try
		{
			var tmp = [];

			this.traverse(cell, true, mxUtils.bind(this, function(vertex, edge)
			{
				var treeEdge = edge != null && this.isTreeEdge(edge);
				
				if (treeEdge)
				{
					tmp.push(edge);
				}
				
				if (vertex != cell && (edge == null || treeEdge))
				{
					tmp.push(vertex);
				}
				
				// Stops traversal on collapsed vertices
				return (edge == null || treeEdge) &&
					(vertex == cell || !this.model.isCollapsed(vertex));
			}));
					
			this.model.setCollapsed(cell, collapse);

			for (var i = 0; i < tmp.length; i++)
			{
				this.model.setVisible(tmp[i], !collapse);
			}
		}
		finally
		{
			this.model.endUpdate();
		}
	};
	
	/**
	 * Implements folding a tree cell.
	 */
	Graph.prototype.isTreeEdge = function(cell)
	{
		return !this.isEdgeIgnored(cell);
	};
	
	/**
	 * Returns all tree edges for the given cell.
	 */
	Graph.prototype.getTreeEdges = function(cell, parent, incoming, outgoing, includeLoops, recurse)
	{
		return this.model.filterCells(this.getEdges(cell, parent, incoming, outgoing, includeLoops, recurse), mxUtils.bind(this, function(cell)
		{
			return this.isTreeEdge(cell);
		}));
	};
		
	/**
	 * Returns all incoming tree edges for the given cell.
	 */
	Graph.prototype.getIncomingTreeEdges = function(cell, parent)
	{
		return this.getTreeEdges(cell, parent, true, false, false);
	};

	/**
	 * Returns all outgoing tree edges for the given cell.
	 */
	Graph.prototype.getOutgoingTreeEdges = function(cell, parent)
	{
		return this.getTreeEdges(cell, parent, false, true, false);
	};

	/**
	 * Overrides functionality in editor.
	 */
	var editorUiInit = EditorUi.prototype.init;
	
	EditorUi.prototype.init = function()
	{
		editorUiInit.apply(this, arguments);
		
		if (!this.editor.isChromelessView() || this.editor.editable)
		{
			this.addTrees();
		}
	};

	EditorUi.prototype.addTrees = function()
	{
		var ui = this;
		var graph = ui.editor.graph;
		var model = graph.getModel();
		var spacing = 10;
		var level = 40;
	
		function isTreeVertex(cell)
		{
			return model.isVertex(cell) && hasTreeParent(cell);
		};

		function isTreeMoving(cell)
		{
			var result = false;
			
			if (cell != null)
			{
				var style = graph.getCurrentCellStyle(cell);
	
				result = style['treeMoving'] == '1';
			}
			
			return result;
		};
	
		function hasTreeParent(cell)
		{
			var result = false;
			
			if (cell != null)
			{
				var parent = model.getParent(cell);
				var pstate = graph.view.getState(parent);
				var style = (pstate != null) ? pstate.style : graph.getCellStyle(parent);
	
				result = style['containerType'] == 'tree';
			}
			
			return result;
		};
	
		function hasLayoutParent(cell)
		{
			var result = false;
			
			if (cell != null)
			{
				var parent = model.getParent(cell);
				var pstate = graph.view.getState(parent);
				
				var state = graph.view.getState(parent);
				var style = (pstate != null) ? pstate.style : graph.getCellStyle(parent);
				
				result = style['childLayout'] != null;
			}
			
			return result;
		};
		
		var uiCreatePopupMenu = ui.menus.createPopupMenu;
		ui.menus.createPopupMenu = function(menu, cell, evt)
		{
			uiCreatePopupMenu.apply(this, arguments);
			
			if (graph.getSelectionCount() == 1)
			{
				var cell = graph.getSelectionCell();
				var sib = graph.getOutgoingTreeEdges(cell);
				menu.addSeparator();
				
				if (sib.length > 0)
				{
					if (isTreeVertex(graph.getSelectionCell()))
					{
						this.addMenuItems(menu, ['selectChildren'], null, evt);	
					}
					
					this.addMenuItems(menu, ['selectDescendants'], null, evt);
				}
				
				if (isTreeVertex(graph.getSelectionCell()))
				{
					menu.addSeparator();
					
					if (graph.getIncomingTreeEdges(cell).length > 0)
					{
						this.addMenuItems(menu, ['selectSiblings', 'selectParent'], null, evt);
					}
				}
				else if (graph.model.getEdgeCount(cell) > 0)
				{
					this.addMenuItems(menu, ['selectConnections'], null, evt);
				}
			}
		};

		// Adds actions
		ui.actions.addAction('selectChildren', function(evt)
		{
			if (graph.isEnabled() && graph.getSelectionCount() == 1)
			{
				var cell = graph.getSelectionCell();
				var sib = mxEvent.isControlDown(evt) ? null :
					graph.getOutgoingTreeEdges(cell);
				
				if (sib != null && sib.length > 0)
				{
					var tmp = [];
					
					for (var i = 0; i < sib.length; i++)
					{
						tmp.push(graph.model.getTerminal(sib[i], false));
					}
					
					graph.setSelectionCells(tmp);
				}
				else
				{
					graph.setSelectionCells(graph.model.getChildren(cell));
				}
			}
		}, null, null, 'Alt+Shift+C');
		
		ui.actions.addAction('selectDescendants', function(evt)
		{
			var cell = graph.getSelectionCell();
			
			if (graph.isEnabled() && cell != null)
			{
				var tmp = [];

				if (!mxEvent.isControlDown(evt))
				{
					graph.traverse(cell, true, function(vertex, edge)
					{
						var treeEdge = edge != null && graph.isTreeEdge(edge);
				
						if (treeEdge && mxEvent.isControlDown(evt))
						{
							tmp.push(edge);
						}
						
						if (edge == null || treeEdge)
						{
							tmp.push(vertex);
						}
						
						return edge == null || treeEdge;
					});
				}
				
				if (tmp.length == 0 || (tmp.length == 1 &&
					tmp[0] == cell))
				{
					tmp = graph.model.getDescendants(cell);
				}
				
				graph.setSelectionCells(tmp);
			}
		}, null, null, 'Alt+Shift+X');
		
		// Adds actions
		ui.actions.addAction('selectParent', function(evt)
		{
			var cell = graph.getSelectionCell();

			if (graph.isEnabled() && cell != null)
			{
				var edges = mxEvent.isControlDown(evt) ? null :
					graph.getIncomingTreeEdges(cell);
	
				if (edges != null && edges.length > 0)
				{
					graph.setSelectionCell(graph.model.getTerminal(edges[0], true));
				}
				else
				{
					graph.selectParentCell();
				}
			}
		}, null, null, 'Alt+Shift+P');
		
		// Adds actions
		ui.actions.addAction('selectSiblings', function(evt)
		{
			if (graph.isEnabled() && graph.getSelectionCount() == 1)
			{
				var cell = graph.getSelectionCell();
				var edges = mxEvent.isControlDown(evt) ? null :
					graph.getIncomingTreeEdges(cell);
				var tmp = [];
	
				if (edges != null && edges.length > 0)
				{
					var sib = graph.getOutgoingTreeEdges(graph.model.getTerminal(edges[0], true));
					
					if (sib != null)
					{
						for (var i = 0; i < sib.length; i++)
						{
							tmp.push(graph.model.getTerminal(sib[i], false));
						}
					}
				}

				if (tmp.length == 0)
				{
					tmp = graph.model.getChildren(graph.model.getParent(cell));
				}

				graph.setSelectionCells(tmp);
			}
		}, null, null, 'Alt+Shift+S');
		
		/**
		 * Overriddes
		 */
		var graphRemoveCells = graph.removeCells;
		
		graph.removeCells = function(cells, includeEdges)
		{
			includeEdges = (includeEdges != null) ? includeEdges : true;
			
			if (cells == null)
			{
				cells = this.getDeletableCells(this.getSelectionCells());
			}
	
			// Adds all edges to the cells
			if (includeEdges)
			{
				// FIXME: Remove duplicate cells in result or do not add if
				// in cells or descendant of cells
				cells = this.getDeletableCells(this.addAllEdges(cells));
			}
			
			var tmp = [];
			
			for (var i = 0; i < cells.length; i++)
			{
				var target = cells[i];
				
				if (model.isEdge(target) && hasTreeParent(target))
				{
					tmp.push(target);
					target = model.getTerminal(target, false);
				}
				
				if (isTreeVertex(target))
				{
					var subtree = [];
					
					graph.traverse(target, true, function(vertex, edge)
					{
						var treeEdge = edge != null && graph.isTreeEdge(edge);
						
						if (treeEdge)
						{
							subtree.push(edge);
						}
						
						if (edge == null || treeEdge)
						{
							subtree.push(vertex);
						}

						return edge == null || treeEdge;
					});
					
					if (subtree.length > 0)
					{
						tmp = tmp.concat(subtree);
						var edges = graph.getIncomingTreeEdges(cells[i]);
						cells = cells.concat(edges);
					}
				}
				else if (target != null)
				{
					tmp.push(cells[i]);
				}
			}
			
			cells = tmp;
			
			return graphRemoveCells.apply(this, arguments);
		};
	
		ui.hoverIcons.getStateAt = function(state, x, y)
		{
			return (isTreeVertex(state.cell)) ? null : this.graph.view.getState(this.graph.getCellAt(x, y));
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
				
				if (state != null && isTreeVertex(state.cell))
				{
					// Avoids disconnecting subtree by removing all incoming edges
					var edges = graph.getIncomingTreeEdges(state.cell);
					
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
						if (isTreeVertex(cells[i]))
						{
							var newEdges = graph.getIncomingTreeEdges(result[i]);
							var edges = graph.getIncomingTreeEdges(cells[i]);
							
							if (newEdges.length == 0 && edges.length > 0)
							{
								var clone = this.cloneCell(edges[0]);
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
				var style = this.getCurrentCellStyle(target);

				if (cells != null && isTreeVertex(target) && mxUtils.getValue(style, 'treeFolding', '0') == '1')
				{
					// Handles only drag from tree or from sidebar with dangling edges
					for (var i = 0; i < cells.length; i++)
					{
						if (isTreeVertex(cells[i]) || (graph.model.isEdge(cells[i]) &&
							graph.model.getTerminal(cells[i], true) == null))
						{
							target = graph.model.getParent(cells[i]);
							break;
						}
					}
	
					// Applies distance between previous and current parent for non-sidebar drags
					if (newSource != null && target != newSource && this.view.getState(cells[0]) != null)
					{
						var edges = graph.getIncomingTreeEdges(cells[0]);
						
						if (edges.length > 0)
						{
							var state1 = graph.view.getState(graph.model.getTerminal(edges[0], true));
							
							if (state1 != null)
							{
								var state2 = graph.view.getState(newSource);
								
								if (state2 != null)
								{
									dx = (state2.getCenterX() - state1.getCenterX()) / graph.view.scale;
									dy = (state2.getCenterY() - state1.getCenterY()) / graph.view.scale;
								}
							}
						}
					}
				}

				result = graphMoveCells.apply(this, arguments);
				
				if (result != null && cells != null && result.length == cells.length)
				{
					for (var i = 0; i < result.length; i++)
					{
						// Connects all dangling edges from the sidebar
						// when dropped into drop target (not hover icon)
						if (this.model.isEdge(result[i]))
						{
							if (isTreeVertex(newSource) && mxUtils.indexOf(result,
								this.model.getTerminal(result[i], true)) < 0)
							{
								this.model.setTerminal(result[i], newSource, true);
							}
						}
						else if (isTreeVertex(cells[i]))
						{
							var edges = graph.getIncomingTreeEdges(cells[i]);
	
							if (edges.length > 0)
							{
								if (!clone)
								{
									if (isTreeVertex(newSource) && mxUtils.indexOf(cells,
										this.model.getTerminal(edges[0], true)) < 0)
									{
										this.model.setTerminal(edges[0], newSource, true);
									}
								}
								else
								{
									var newEdges = graph.getIncomingTreeEdges(result[i]);
									
									if (newEdges.length == 0)
									{
										var temp = newSource;
										
										if (temp == null || temp == graph.model.getParent(cells[i]))
										{
											temp = graph.model.getTerminal(edges[0], true);
										}
										
										var clone = this.cloneCell(edges[0]);
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
		if (ui.sidebar != null)
		{
			var sidebarDropAndConnect = ui.sidebar.dropAndConnect;
			
			ui.sidebar.dropAndConnect = function(source, targets, direction, dropCellIndex)
			{
				var model = graph.model;
				var result = null;
			
				model.beginUpdate();
				try
				{
					result = sidebarDropAndConnect.apply(this, arguments);
					
					if (isTreeVertex(source))
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
		}
	
		/**
		 * Checks source point of incoming edge relative to target terminal.
		 */
		function getTreeDirection(cell)
		{
			var state = graph.view.getState(cell);
			
			if (state != null)
			{
				var edges = graph.getIncomingTreeEdges(state.cell);
				
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
				var parent = graph.model.getParent(cell);
				var edges = graph.getIncomingTreeEdges(cell);
				var clones = graph.cloneCells([edges[0], cell]);
				graph.model.setTerminal(clones[0], graph.model.getTerminal(edges[0], true), true);
				var dir = getTreeDirection(cell);
				var pgeo = parent.geometry;
				
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
				
				if (graph.view.currentRoot != parent)
				{
					clones[1].geometry.x -= pgeo.x;
					clones[1].geometry.y -= pgeo.y;
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
					
					var sib = graph.getOutgoingTreeEdges(graph.model.getTerminal(edges[0], true));
					
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
											var treeEdge = edge != null && graph.isTreeEdge(edge);
											
											if (treeEdge)
											{
												subtree.push(edge);
											}
		
											if (edge == null || treeEdge)
											{
												subtree.push(vertex);
											}
											
											return edge == null || treeEdge;
										});
										
										graph.moveCells(subtree, ((after) ? 1 : -1) * dx, ((after) ? 1 : -1) * dy);
									}
								}
							}
						}
					}
				}
				
				return graph.addCells(clones, parent);
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
				var edges = graph.getIncomingTreeEdges(cell);
				var clones = graph.cloneCells([edges[0], cell]);
				graph.model.setTerminal(edges[0], clones[1], false);
				graph.model.setTerminal(clones[0], clones[1], true);
				graph.model.setTerminal(clones[0], cell, false);
	
				// Makes space for new parent
				var parent = graph.model.getParent(cell);
				var pgeo = parent.geometry;
				var subtree = [];
				
				if (graph.view.currentRoot != parent)
				{
					clones[1].geometry.x -= pgeo.x;
					clones[1].geometry.y -= pgeo.y;
				}
				
				graph.traverse(cell, true, function(vertex, edge)
				{
					var treeEdge = edge != null && graph.isTreeEdge(edge);
				
					if (treeEdge)
					{
						subtree.push(edge);
					}
	
					if (edge == null || treeEdge)
					{
						subtree.push(vertex);
					}
					
					return edge == null || treeEdge;
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
					dy = -dy;
				}
				else if (dir == mxConstants.DIRECTION_WEST)
				{
					dx = -dx;
					dy = 0;
				}
				else if (dir == mxConstants.DIRECTION_EAST)
				{
					dy = 0;
				}
				
				graph.moveCells(subtree, dx, dy);
	
				return graph.addCells(clones, parent);
			}
			finally
			{
				graph.model.endUpdate();
			}
		};
	
		function addChild(cell, direction)
		{
			graph.model.beginUpdate();
			try
			{
				var parent = graph.model.getParent(cell);
				var edges = graph.getIncomingTreeEdges(cell);
				var dir = getTreeDirection(cell);
				
				// Handles special case for click on tree root
				if (edges.length == 0)
				{
					edges = [graph.createEdge(parent, null, '', null, null,
						graph.createCurrentEdgeStyle())];
					dir = direction;
				}
				
				var clones = graph.cloneCells([edges[0], cell]);
				graph.model.setTerminal(clones[0], cell, true);
				
				if (graph.model.getTerminal(clones[0], false) == null)
				{
					graph.model.setTerminal(clones[0], clones[1], false);
					graph.applyNewEdgeStyle(clones[1], [clones[0]], dir);
				}
				
				// Finds free space
				var edges = graph.getOutgoingTreeEdges(cell);
				var pgeo = parent.geometry;
				var targets = [];
				
				// Not offset if inside group
				if (graph.view.currentRoot == parent)
				{
					pgeo = new mxRectangle();
				}
	
				for (var i = 0; i < edges.length; i++)
				{
					var target = graph.model.getTerminal(edges[i], false);
					
					if (target != null)
					{
						targets.push(target);
					}
				}
				
				var bbox = graph.view.getBounds(targets);
				var tr = graph.view.translate;
				var s = graph.view.scale;
				
				if (dir == mxConstants.DIRECTION_SOUTH)
				{
					clones[1].geometry.x = (bbox == null) ? cell.geometry.x + (cell.geometry.width -
						clones[1].geometry.width) / 2 : (bbox.x + bbox.width) / s - tr.x -
						pgeo.x + spacing; 
					clones[1].geometry.y += clones[1].geometry.height - pgeo.y + level;
				}
				else if (dir == mxConstants.DIRECTION_NORTH)
				{
					clones[1].geometry.x = (bbox == null) ? cell.geometry.x + (cell.geometry.width -
						clones[1].geometry.width) / 2 : (bbox.x + bbox.width) / s - tr.x + -
						pgeo.x + spacing; 
					clones[1].geometry.y -= clones[1].geometry.height + pgeo.y + level;
				}
				else if (dir == mxConstants.DIRECTION_WEST)
				{
					clones[1].geometry.x -= clones[1].geometry.width + pgeo.x + level;
					clones[1].geometry.y = (bbox == null) ? cell.geometry.y + (cell.geometry.height -
						clones[1].geometry.height) / 2 : (bbox.y + bbox.height) / s - tr.y + -
						pgeo.y + spacing; 
				}
				else
				{
					clones[1].geometry.x += clones[1].geometry.width - pgeo.x + level;
					clones[1].geometry.y = (bbox == null) ? cell.geometry.y + (cell.geometry.height -
						clones[1].geometry.height) / 2 : (bbox.y + bbox.height) / s - tr.y + -
						pgeo.y + spacing;
				}
	
				return graph.addCells(clones, parent);
			}
			finally
			{
				graph.model.endUpdate();
			}
		};
		
		function getOrderedTargets(cell, horizontal, ref)
		{
			var sib = graph.getOutgoingTreeEdges(cell);
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
				var sib = graph.getOutgoingTreeEdges(cell);
				
				if (sib != null && sib.length > 0)
				{
					graph.setSelectionCell(graph.model.getTerminal(sib[0], false));
				}	
			}
			else
			{
				var edges = graph.getIncomingTreeEdges(cell);
	
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
			
		// Overrides keyboard shortcuts inside tree containers
		var altShiftActions = {67: ui.actions.get('selectChildren'), // Alt+Shift+C
				88: ui.actions.get('selectDescendants'), // Alt+Shift+X
				80: ui.actions.get('selectParent'), // Alt+Shift+P
				83: ui.actions.get('selectSiblings')} // Alt+Shift+S

		var editorUiOnKeyDown = ui.onKeyDown;
		
		ui.onKeyDown = function(evt)
		{
			try
			{
				var cell = graph.getSelectionCell();

				if (graph.isEnabled() && !graph.isEditing() && cell != null)
				{
					var action = (mxEvent.isAltDown(evt) && mxEvent.isShiftDown(evt)) ? 
						altShiftActions[evt.keyCode] : null;
					
					if (action != null)
					{
						action.funct(evt);
						mxEvent.consume(evt);
					}
					else if (isTreeVertex(cell))
					{
						var cells = null;
		
						if (graph.getIncomingTreeEdges(cell).length > 0)
						{
							if (evt.which == 9) // Tab adds child
							{
								cells = (mxEvent.isShiftDown(evt)) ?
									addParent(cell) :
									addChild(cell);
							}
							else if (evt.which == 13) // Enter adds sibling
							{
								cells = addSibling(cell, !mxEvent.isShiftDown(evt));
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
								ui.hoverIcons.update(graph.view.getState(cell));
							}
							
							graph.startEditingAtCell(cell);
							mxEvent.consume(evt);
						}
						else if (evt.keyCode == 37) // left
						{
							selectCell(cell, mxConstants.DIRECTION_WEST);
							mxEvent.consume(evt);
						}
						else if (evt.keyCode == 38) // up
						{
							selectCell(cell, mxConstants.DIRECTION_NORTH);
							mxEvent.consume(evt);
						}
						else if (evt.keyCode == 39) // right
						{
							selectCell(cell, mxConstants.DIRECTION_EAST);
							mxEvent.consume(evt);
						}
						else if (evt.keyCode == 40) // down
						{
							selectCell(cell, mxConstants.DIRECTION_SOUTH);
							mxEvent.consume(evt);
						}
					}
				}
			}
			catch (e)
			{
				ui.handleError(e);
			}
			
			if (!mxEvent.isConsumed(evt))
			{
				editorUiOnKeyDown.apply(this, arguments);
			}
		};
	
		var graphConnectVertex = graph.connectVertex;
		
		graph.connectVertex = function(source, direction, length, evt, forceClone, ignoreCellAt, targetCell)
		{
			var edges = graph.getIncomingTreeEdges(source);
			
			if (isTreeVertex(source))
			{
				var dir = getTreeDirection(source);
				var h1 = dir == mxConstants.DIRECTION_EAST || dir == mxConstants.DIRECTION_WEST;
				var h2 = direction == mxConstants.DIRECTION_EAST || direction == mxConstants.DIRECTION_WEST;
				
				if (dir == direction || edges.length == 0)
				{
					return addChild(source, direction);
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
			}
			else
			{
				return graphConnectVertex.apply(this, arguments);
			}
		};
		
		graph.getSubtree = function(initialCell)
		{
			var cells = [initialCell];
			
			if ((isTreeMoving(initialCell) || isTreeVertex(initialCell)) &&
				!hasLayoutParent(initialCell))
			{
				// Gets the subtree from cell downwards
				graph.traverse(initialCell, true, function(vertex, edge)
				{
					var treeEdge = edge != null && graph.isTreeEdge(edge);
					
					// LATER: Use dictionary to avoid duplicates
					if (treeEdge && mxUtils.indexOf(cells, edge) < 0)
					{
						cells.push(edge);
					}
	
					if ((edge == null || treeEdge) &&
						mxUtils.indexOf(cells, vertex) < 0)
					{
						cells.push(vertex);
					}
					
					return edge == null || treeEdge;
				});
			}
	
			return cells;
		};
		
		var vertexHandlerInit = mxVertexHandler.prototype.init;
		
		mxVertexHandler.prototype.init = function()
		{
			vertexHandlerInit.apply(this, arguments);
			
			if (((isTreeMoving(this.state.cell) || isTreeVertex(this.state.cell)) &&
				!hasLayoutParent(this.state.cell)) && this.graph.getOutgoingTreeEdges(
				this.state.cell).length > 0)
			{
				this.moveHandle = mxUtils.createImage(Editor.moveImage);
				this.moveHandle.setAttribute('title', 'Move Subtree');
				this.moveHandle.style.position = 'absolute';
				this.moveHandle.style.cursor = 'pointer';
				this.moveHandle.style.width = '24px';
				this.moveHandle.style.height = '24px';
				this.graph.container.appendChild(this.moveHandle);
				
				mxEvent.addGestureListeners(this.moveHandle, mxUtils.bind(this, function(evt)
				{
					this.graph.graphHandler.start(this.state.cell,
						mxEvent.getClientX(evt), mxEvent.getClientY(evt),
						this.graph.getSubtree(this.state.cell));
					this.graph.graphHandler.cellWasClicked = true;
					this.graph.isMouseTrigger = mxEvent.isMouseEvent(evt);
					this.graph.isMouseDown = true;
					ui.hoverIcons.reset();
					mxEvent.consume(evt);
				}));
			}
		};

		var vertexHandlerRedrawHandles = mxVertexHandler.prototype.redrawHandles;

		mxVertexHandler.prototype.redrawHandles = function()
		{
			vertexHandlerRedrawHandles.apply(this, arguments);
			
			if (this.moveHandle != null)
			{
				this.moveHandle.style.left = this.state.x + this.state.width +
					((this.state.width < 40) ? 10 : 0) + 2 + 'px';
				this.moveHandle.style.top = this.state.y + this.state.height +
					((this.state.height < 40) ? 10 : 0) + 2 + 'px';
			}
		};
		
		var vertexHandlerSetHandlesVisible = mxVertexHandler.prototype.setHandlesVisible;

		mxVertexHandler.prototype.setHandlesVisible = function(visible)
		{
			vertexHandlerSetHandlesVisible.apply(this, arguments);
			
			if (this.moveHandle != null)
			{
				this.moveHandle.style.display = (visible) ? '' : 'none';
			}
		};
		
		var vertexHandlerDestroy = mxVertexHandler.prototype.destroy;

		mxVertexHandler.prototype.destroy = function(sender, me)
		{
			vertexHandlerDestroy.apply(this, arguments);

			if (this.moveHandle != null)
			{
				this.moveHandle.parentNode.removeChild(this.moveHandle);
				this.moveHandle = null;
			}
		};
	};

	/**
	 * Adds shapes to sidebar in edit mode.
	 */
	if (typeof Sidebar !== 'undefined')
	{
		var sidebarCreateAdvancedShapes = Sidebar.prototype.createAdvancedShapes;
		Sidebar.prototype.createAdvancedShapes = function()
		{
			var result = sidebarCreateAdvancedShapes.apply(this, arguments);
			var graph = this.graph;
			
			// Style that defines the key, value pairs to be used for creating styles of new connections if no incoming edge exists
			var orgEdgeStyle = 'edgeStyle=elbowEdgeStyle;elbow=vertical;sourcePerimeterSpacing=0;' +
				'targetPerimeterSpacing=0;startArrow=none;endArrow=none;rounded=0;curved=0;';
			var mmEdgeStyle = 'newEdgeStyle={"edgeStyle":"entityRelationEdgeStyle","startArrow":"none","endArrow":"none",' +
				'"segment":10,"curved":1,"sourcePerimeterSpacing":0,"targetPerimeterSpacing":0};';
			var treeEdgeStyle = 'newEdgeStyle={"edgeStyle":"elbowEdgeStyle","startArrow":"none","endArrow":"none"};';

			return result.concat([
				this.addEntry('tree container', function()
				{
					var cell = new mxCell('Tree Container', new mxGeometry(0, 0, 400, 320),
						'swimlane;startSize=20;horizontal=1;containerType=tree;');
					cell.vertex = true;
					
			    	var cell2 = new mxCell('Parent', new mxGeometry(140, 60, 120, 40),
			    		'whiteSpace=wrap;html=1;treeFolding=1;treeMoving=1;' + treeEdgeStyle);
			    	cell2.vertex = true;
			    	
			    	var cell3 = new mxCell('Child', new mxGeometry(140, 140, 120, 40),
			    		'whiteSpace=wrap;html=1;treeFolding=1;treeMoving=1;' + treeEdgeStyle);
			    	cell3.vertex = true;
	
			    	var edge = new mxCell('', new mxGeometry(0, 0, 0, 0), orgEdgeStyle);
					edge.geometry.relative = true;
					edge.edge = true;
	
					cell2.insertEdge(edge, true);
					cell3.insertEdge(edge, false);
					
			    	cell.insert(edge);
			    	cell.insert(cell2);
			    	cell.insert(cell3);
					
			    	return sb.createVertexTemplateFromCells([cell], cell.geometry.width,
				    	cell.geometry.height, cell.value);
				}),
				this.addEntry('tree mindmap mindmaps central idea branch topic', function()
				{
					var mindmap = new mxCell('Mindmap', new mxGeometry(0, 0, 420, 126),
						'swimlane;startSize=20;horizontal=1;containerType=tree;');
					mindmap.vertex = true;
					
					var cell = new mxCell('Central Idea', new mxGeometry(160, 60, 100, 40),
				    	'ellipse;whiteSpace=wrap;html=1;align=center;' +
				    	'treeFolding=1;treeMoving=1;' + mmEdgeStyle);
			    	cell.vertex = true;
			    	
			    	var cell2 = new mxCell('Topic', new mxGeometry(320, 40, 80, 20),
				    	'whiteSpace=wrap;html=1;rounded=1;arcSize=50;align=center;verticalAlign=middle;' +
		    			'strokeWidth=1;autosize=1;spacing=4;treeFolding=1;treeMoving=1;' + mmEdgeStyle);
			    	cell2.vertex = true;

			    	var edge = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=entityRelationEdgeStyle;' +
						'startArrow=none;endArrow=none;segment=10;curved=1;sourcePerimeterSpacing=0;' +
						'targetPerimeterSpacing=0;');
					edge.geometry.relative = true;
					edge.edge = true;
	
					cell.insertEdge(edge, true);
					cell2.insertEdge(edge, false);
					
			    	var cell3 = new mxCell('Branch', new mxGeometry(320, 80, 72, 26),
			    		'whiteSpace=wrap;html=1;shape=partialRectangle;top=0;left=0;bottom=1;right=0;points=[[0,1],[1,1]];' +
			    		'fillColor=none;align=center;verticalAlign=bottom;routingCenterY=0.5;' +
			    		'snapToPoint=1;autosize=1;treeFolding=1;treeMoving=1;' + mmEdgeStyle);
			    	cell3.vertex = true;

			    	var edge2 = new mxCell('', new mxGeometry(0, 0, 0, 0), edge.style);
					edge2.geometry.relative = true;
					edge2.edge = true;
	
					cell.insertEdge(edge2, true);
					cell3.insertEdge(edge2, false);
			    	
			    	var cell4 = new mxCell('Topic', new mxGeometry(20, 40, 80, 20),
				    	'whiteSpace=wrap;html=1;rounded=1;arcSize=50;align=center;verticalAlign=middle;' +
		    			'strokeWidth=1;autosize=1;spacing=4;treeFolding=1;treeMoving=1;' + mmEdgeStyle);
			    	cell4.vertex = true;
	
			    	var edge3 = new mxCell('', new mxGeometry(0, 0, 0, 0), edge.style);
					edge3.geometry.relative = true;
					edge3.edge = true;
		
					cell.insertEdge(edge3, true);
					cell4.insertEdge(edge3, false);
					
			    	var cell5 = new mxCell('Branch', new mxGeometry(20, 80, 72, 26),
			    		'whiteSpace=wrap;html=1;shape=partialRectangle;top=0;left=0;bottom=1;right=0;points=[[0,1],[1,1]];' +
			    		'fillColor=none;align=center;verticalAlign=bottom;routingCenterY=0.5;' +
			    		'snapToPoint=1;autosize=1;treeFolding=1;treeMoving=1;' + mmEdgeStyle);
			    	cell5.vertex = true;
	
			    	var edge4 = new mxCell('', new mxGeometry(0, 0, 0, 0), edge.style);
					edge4.geometry.relative = true;
					edge4.edge = true;
	
					cell.insertEdge(edge4, true);
					cell5.insertEdge(edge4, false);
				    	
					mindmap.insert(edge);
					mindmap.insert(edge2);
					mindmap.insert(edge3);
					mindmap.insert(edge4);
					mindmap.insert(cell);
					mindmap.insert(cell2);
					mindmap.insert(cell3);
					mindmap.insert(cell4);
					mindmap.insert(cell5);
					
					return sb.createVertexTemplateFromCells([mindmap], mindmap.geometry.width,
						mindmap.geometry.height, mindmap.value);
				}),
				this.addEntry('tree mindmap mindmaps central idea', function()
				{
					var cell = new mxCell('Central Idea', new mxGeometry(0, 0, 100, 40),
				    	'ellipse;whiteSpace=wrap;html=1;align=center;' + mmEdgeStyle +
				    	'treeFolding=1;treeMoving=1;');
			    	cell.vertex = true;
			    	
			    	return sb.createVertexTemplateFromCells([cell], cell.geometry.width,
			    		cell.geometry.height, cell.value);
				}),
				this.addEntry('tree mindmap mindmaps branch', function()
				{
			    	var cell = new mxCell('Branch', new mxGeometry(0, 0, 80, 20),
			    		'whiteSpace=wrap;html=1;shape=partialRectangle;top=0;left=0;bottom=1;right=0;points=[[0,1],[1,1]];' +
			    		'fillColor=none;align=center;verticalAlign=bottom;routingCenterY=0.5;' +
			    		'snapToPoint=1;recursiveResize=0;autosize=1;treeFolding=1;treeMoving=1;' + mmEdgeStyle);
			    	cell.vertex = true;
	
			    	var edge = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=entityRelationEdgeStyle;' +
						'startArrow=none;endArrow=none;segment=10;curved=1;sourcePerimeterSpacing=0;' +
						'targetPerimeterSpacing=0;');
					edge.geometry.setTerminalPoint(new mxPoint(-40, 40), true);
					edge.geometry.relative = true;
					edge.edge = true;
	
					cell.insertEdge(edge, false);
					
					return sb.createVertexTemplateFromCells([cell, edge], cell.geometry.width,
						cell.geometry.height, cell.value);
				}),
				this.addEntry('tree mindmap mindmaps sub topic', function()
				{
			   		var cell = new mxCell('Sub Topic', new mxGeometry(0, 0, 80, 26),
			    		'whiteSpace=wrap;html=1;rounded=1;arcSize=50;align=center;verticalAlign=middle;' +
			    		'strokeWidth=1;autosize=1;spacing=4;treeFolding=1;treeMoving=1;' + mmEdgeStyle);
			    	cell.vertex = true;
	
			    	var edge = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=entityRelationEdgeStyle;startArrow=none;' +
			    		'endArrow=none;segment=10;curved=1;sourcePerimeterSpacing=0;' +
						'targetPerimeterSpacing=0;');
					edge.geometry.setTerminalPoint(new mxPoint(-40, 40), true);
					edge.geometry.relative = true;
					edge.edge = true;
	
					cell.insertEdge(edge, false);
					
					return sb.createVertexTemplateFromCells([cell, edge], cell.geometry.width,
						cell.geometry.height, cell.value);
				}),
				this.addEntry('tree orgchart organization division', function()
				{
					var orgchart = new mxCell('Orgchart', new mxGeometry(0, 0, 280, 220),
						'swimlane;startSize=20;horizontal=1;containerType=tree;' + treeEdgeStyle);
					orgchart.vertex = true;
				
			    	var cell = new mxCell('Organization', new mxGeometry(80, 40, 120, 60),
			    		'whiteSpace=wrap;html=1;align=center;treeFolding=1;treeMoving=1;' + treeEdgeStyle);
				    graph.setAttributeForCell(cell, 'treeRoot', '1');
			    	cell.vertex = true;
			    	
			    	var cell2 = new mxCell('Division', new mxGeometry(20, 140, 100, 60),
			    		'whiteSpace=wrap;html=1;align=center;verticalAlign=middle;treeFolding=1;treeMoving=1;' + treeEdgeStyle);
			    	cell2.vertex = true;
	
			    	var edge = new mxCell('', new mxGeometry(0, 0, 0, 0), orgEdgeStyle);
					edge.geometry.relative = true;
					edge.edge = true;
	
					cell.insertEdge(edge, true);
					cell2.insertEdge(edge, false);
			    	
			    	var cell3 = new mxCell('Division', new mxGeometry(160, 140, 100, 60),
			    		'whiteSpace=wrap;html=1;align=center;verticalAlign=middle;treeFolding=1;treeMoving=1;' + treeEdgeStyle);
			    	cell3.vertex = true;
	
			    	var edge2 = new mxCell('', new mxGeometry(0, 0, 0, 0), orgEdgeStyle);
					edge2.geometry.relative = true;
					edge2.edge = true;
	
					cell.insertEdge(edge2, true);
					cell3.insertEdge(edge2, false);
					
					orgchart.insert(edge);
					orgchart.insert(edge2);
					orgchart.insert(cell);
					orgchart.insert(cell2);
					orgchart.insert(cell3);
					
					return sb.createVertexTemplateFromCells([orgchart], orgchart.geometry.width,
							orgchart.geometry.height, orgchart.value);
				}),
				this.addEntry('tree root', function()
				{
			    	var cell = new mxCell('Organization', new mxGeometry(0, 0, 120, 60),
			    		'whiteSpace=wrap;html=1;align=center;treeFolding=1;treeMoving=1;' + treeEdgeStyle);
				    graph.setAttributeForCell(cell, 'treeRoot', '1');
			    	cell.vertex = true;
			
			    	return sb.createVertexTemplateFromCells([cell], cell.geometry.width,
				    		cell.geometry.height, cell.value);
				}),
				this.addEntry('tree division', function()
				{
		    		var cell = new mxCell('Division', new mxGeometry(20, 40, 100, 60),
			    		'whiteSpace=wrap;html=1;align=center;verticalAlign=middle;treeFolding=1;treeMoving=1;' + treeEdgeStyle);
			    	cell.vertex = true;
			    	
			    	var edge = new mxCell('', new mxGeometry(0, 0, 0, 0), orgEdgeStyle);
			    	edge.geometry.setTerminalPoint(new mxPoint(0, 0), true);
					edge.geometry.relative = true;
					edge.edge = true;
	
					cell.insertEdge(edge, false);
				    	
					return sb.createVertexTemplateFromCells([cell, edge], cell.geometry.width,
						cell.geometry.height, cell.value);
				}),
				this.addEntry('tree sub sections', function()
				{
			    	var cell = new mxCell('Sub Section', new mxGeometry(0, 0, 100, 60),
			    		'whiteSpace=wrap;html=1;align=center;verticalAlign=middle;treeFolding=1;treeMoving=1;');
			    	cell.vertex = true;
	
			    	var edge = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=orthogonalEdgeStyle;sourcePerimeterSpacing=0;targetPerimeterSpacing=0;' +
						'startArrow=none;endArrow=none;rounded=0;targetPortConstraint=eastwest;sourcePortConstraint=northsouth;curved=0;rounded=0;');
					edge.geometry.setTerminalPoint(new mxPoint(110, -40), true);
					edge.geometry.relative = true;
					edge.edge = true;
	
					cell.insertEdge(edge, false);
	
			    	var cell2 = new mxCell('Sub Section', new mxGeometry(120, 0, 100, 60),
			    		'whiteSpace=wrap;html=1;align=center;verticalAlign=middle;treeFolding=1;treeMoving=1;');
			    	cell2.vertex = true;
	
			    	var edge2 = new mxCell('', new mxGeometry(0, 0, 0, 0), edge.style);
					edge2.geometry.setTerminalPoint(new mxPoint(110, -40), true);
					edge2.geometry.relative = true;
					edge2.edge = true;
	
					cell2.insertEdge(edge2, false);
										
				    	return sb.createVertexTemplateFromCells([edge, edge2, cell, cell2], 220, 60, 'Sub Sections');
				})
			]);
		};
	}
})();
