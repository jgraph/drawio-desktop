/**
 * Explore plugin.
 */
Draw.loadPlugin(function(ui)
{
	// Adds resource for action
	mxResources.parse('exploreFromHere=Explore from here...');
	
	// Max number of edges per page
	var pageSize = 20;

	var uiCreatePopupMenu = ui.menus.createPopupMenu;
	ui.menus.createPopupMenu = function(menu, cell, evt)
	{
		uiCreatePopupMenu.apply(this, arguments);
		
		var graph = ui.editor.graph;
		
		if (graph.getEdges(graph.getSelectionCell()).length > 0)
		{
			this.addMenuItems(menu, ['-', 'exploreFromHere'], null, evt);
		}
	};

	//
	// Main function
	//
	function exploreFromHere(selectionCell)
	{
		var sourceGraph = ui.editor.graph;
		
		var container = document.createElement('div');
		container.style.position = 'absolute';
		container.style.display = 'block';
		container.style.background = (Editor.isDarkMode()) ?
			Editor.darkColor : '#ffffff';
		container.style.width = '100%';
		container.style.height = '100%';
		container.style.left = '0px';
		container.style.top = '0px';
		container.style.zIndex = 2;

		var deleteImage = document.createElement('img');
		deleteImage.setAttribute('src', IMAGE_PATH + '/delete.png');
		deleteImage.style.position = 'absolute';
		deleteImage.style.cursor = 'pointer';
		deleteImage.style.right = '10px';
		deleteImage.style.top = '10px';
		container.appendChild(deleteImage);
		
		var closeLabel = document.createElement('div');
		closeLabel.style.position = 'absolute';
		closeLabel.style.cursor = 'pointer';
		closeLabel.style.right = '38px';
		closeLabel.style.top = '14px';
		closeLabel.style.textAlign = 'right';
		closeLabel.style.verticalAlign = 'top';
		mxUtils.write(closeLabel, mxResources.get('close'));
		container.appendChild(closeLabel);
		document.body.appendChild(container);
		
		var keyHandler = function(evt)
		{
			if (evt.keyCode == 27)
			{
				deleteImage.click();
			}
		};
		
		mxEvent.addListener(document, 'keydown', keyHandler);
		
		function main(container)
		{
			// Checks if browser is supported
			if (!mxClient.isBrowserSupported())
			{
				// Displays an error message if the browser is
				// not supported.
				mxUtils.error('Browser is not supported!', 200, false);
			}
			else
			{
				// Creates the graph inside the given container
				var graph = new Graph(container);
				graph.keepEdgesInBackground = true;
				graph.isCellResizable = function()
				{
					return false;
				};
				// Workaround to hide custom handles
				graph.isCellRotatable = function()
				{
					return false;
				};
				
				// Shows hand cursor for all vertices
				graph.getCursorForCell = function(cell)
				{
					if (this.model.isVertex(cell))
					{
						return 'pointer';
					}
					
					return null;
				};
				
				graph.getFoldingImage = function()
				{
					return null;
				};
				
				var closeHandler = function()
				{
					mxEvent.removeListener(document, 'keydown', keyHandler);
					container.parentNode.removeChild(container);
					
					// FIXME: Does not work
					sourceGraph.scrollCellToVisible(selectionCell);
				};
				
				mxEvent.addListener(deleteImage, 'click', closeHandler);
				mxEvent.addListener(closeLabel, 'click', closeHandler);
				
				// Disables all built-in interactions
				graph.setEnabled(false);

				// Handles clicks on cells
				graph.click = function(me)
				{
					var cell = me.getCell();
					
					if (cell != null && graph.getEdges(cell).length > 0)
					{
						load(graph, cell);
					}
				};
				
				var cx = graph.container.scrollWidth / 2;
				var cy = graph.container.scrollHeight / 3;

				graph.model.beginUpdate();
				var cell = graph.importCells([selectionCell])[0];
				cell.sourceCellId = selectionCell.id;
				cell.geometry.x = cx - cell.geometry.width / 2;
				cell.geometry.y = cy - cell.geometry.height / 2;
				graph.model.endUpdate();

				// Animates the changes in the graph model
				graph.getModel().addListener(mxEvent.CHANGE, function(sender, evt)
				{
					var changes = evt.getProperty('edit').changes;
					mxText.prototype.enableBoundingBox = false;
					graph.labelsVisible = false;
					
					mxEffects.animateChanges(graph, changes, function()
					{
						mxText.prototype.enableBoundingBox = true;
						graph.labelsVisible = true;
						graph.tooltipHandler.hide();
						graph.refresh();
					});
				});

				load(graph, cell);
			}
		};

		// Loads the links for the given cell into the given graph
		// by requesting the respective data in the server-side
		// (implemented for this demo using the server-function)
		function load(graph, cell)
		{
			if (graph.getModel().isVertex(cell))
			{
				var cx = graph.container.scrollWidth / 2;
				var cy = graph.container.scrollHeight / 3;
				
				// Gets the default parent for inserting new cells. This
				// is normally the first child of the root (ie. layer 0).
				var parent = graph.getDefaultParent();
				graph.rootCell = cell.referenceCell || cell;

				// Adds cells to the model in a single step
				graph.getModel().beginUpdate();
				try
				{
					var cells = rootChanged(graph, cell);

					// Removes all cells except the new root
					for (var key in graph.getModel().cells)
					{
						var tmp = graph.getModel().getCell(key);
						
						if (tmp != graph.rootCell && !graph.getModel().isAncestor(
							graph.rootCell, tmp) && graph.getModel().isVertex(tmp))
						{
							graph.removeCells([tmp]);
						}
					}

					// Merges the response model with the client model
					//graph.getModel().mergeChildren(model.getRoot().getChildAt(0), parent);
					graph.addCells(cells);

					// Moves the given cell to the center
					var geo = graph.getModel().getGeometry(graph.rootCell);

					if (geo != null)
					{
						geo = geo.clone();
						
						geo.x = cx - geo.width / 2;
						geo.y = cy - geo.height / 3;
						graph.getModel().setGeometry(graph.rootCell, geo);
					}
					
					// Creates a list of the new vertices, if there is more
					// than the center vertex which might have existed
					// previously, then this needs to be changed to analyze
					// the target model before calling mergeChildren above
					var vertices = [];
					
					for (var key in graph.getModel().cells)
					{
						var tmp = graph.getModel().getCell(key);
						
						if (tmp != graph.rootCell && graph.getModel().isVertex(tmp) &&
							graph.getModel().getParent(tmp) == graph.getDefaultParent())
						{
							vertices.push(tmp);

							// Changes the initial location "in-place"
							// to get a nice animation effect from the
							// center to the radius of the circle
							var geo = graph.getModel().getGeometry(tmp);

							if (geo != null)
							{
								geo.x = cx - geo.width / 2;
								geo.y = cy - geo.height / 2;
							}
						}
					}
					
					// Arranges the response in a circle
					var cellCount = vertices.length;
					var phi = 2 * Math.PI / cellCount;
					var r = Math.min(graph.container.scrollWidth / 3 - 80,
							graph.container.scrollHeight / 3 - 80);
					
					for (var i = 0; i < cellCount; i++)
					{
						var geo = graph.getModel().getGeometry(vertices[i]);
						
						if (geo != null)
						{
							geo = geo.clone();
							geo.x += r * Math.sin(i * phi);
							geo.y += r * Math.cos(i * phi);

							graph.getModel().setGeometry(vertices[i], geo);
						}
					}
					
					// Keeps parallel edges apart
					var layout = new mxParallelEdgeLayout(graph);
					layout.spacing = 60;
					layout.execute(graph.getDefaultParent());
				}
				finally
				{
					// Updates the display
					graph.getModel().endUpdate();
				}
			}
		};

		// Gets the edges from the source cell and adds the targets
		function rootChanged(graph, cell)
		{
			// TODO: Keep existing cells, probably best via XML to redirect IDs
			var realCell = cell.referenceCell || cell;
			var sourceCell = sourceGraph.model.getCell(realCell.sourceCellId);
			var edges = sourceGraph.getEdges(sourceCell, null, true, true, false, true);
			var cells = edges;
			
			// Paging by selecting a window in the edges array
			if (cell.startIndex != null || (pageSize > 0 && edges.length > pageSize))
			{
				var start = cell.startIndex || 0;
				
				cells = edges.slice(Math.max(0, start), Math.min(edges.length, start + pageSize));
			}
			
			cells = cells.concat(sourceGraph.getOpposites(cells, sourceCell));
			var clones = graph.cloneCells(cells);
			
			var edgeStyle = ';curved=1;noEdgeStyle=1;entryX=none;entryY=none;exitX=none;exitY=none;';
			var btnStyle = 'fillColor=green;fontColor=white;strokeColor=green;';
			
			for (var i = 0; i < cells.length; i++)
			{
				clones[i].sourceCellId = cells[i].id;
				
				if (graph.model.isEdge(clones[i]))
				{
					// Removes waypoints, edge styles, constraints and centers the label
					clones[i].geometry.x = 0;
					clones[i].geometry.y = 0;
					clones[i].geometry.points = null;
					clones[i].setStyle(clones[i].getStyle() + edgeStyle);
					clones[i].setTerminal(realCell, clones[i].getTerminal(true) == null);
				}
			}

			if (cell.startIndex > 0)
			{
				var backCell = graph.createVertex(null, null, 'Back...', 0, 0, 80, 30, btnStyle);
				backCell.referenceCell = realCell;
				backCell.startIndex = Math.max(0, (cell.startIndex || 0) - pageSize);
				clones.splice(0, 0, backCell);
			}
			
			if (edges.length > (cell.startIndex || 0) + pageSize)
			{
				var moreCell = graph.createVertex(null, null, 'More...', 0, 0, 80, 30, btnStyle);
				moreCell.referenceCell = realCell;
				moreCell.startIndex = (cell.startIndex || 0) + pageSize;
				clones.splice(0, 0, moreCell);
			}
			
			return clones;
		};
		
		main(container);
	};
	
	// Adds action
	ui.actions.addAction('exploreFromHere', function()
	{
		exploreFromHere(ui.editor.graph.getSelectionCell());
	});
	
	// Click handler for chromeless mode
	if (ui.editor.isChromelessView())
	{
		ui.editor.graph.click = function(me)
		{
			if (ui.editor.graph.model.isVertex(me.getCell()) &&
				ui.editor.graph.model.getEdgeCount(me.getCell()) > 0 &&
				this.getLinkForCell(me.getCell()) == null)
			{
				exploreFromHere(me.getCell());
			}
		};
	}
});
