/**
 * Copyright (c) 2006-2020, JGraph Ltd
 * Copyright (c) 2006-2020, draw.io AG
 *
 * Constructs the actions object for the given UI.
 */
function Actions(editorUi)
{
	this.editorUi = editorUi;
	this.actions = new Object();
	this.init();
};

/**
 * Adds the default actions.
 */
Actions.prototype.init = function()
{
	var ui = this.editorUi;
	var editor = ui.editor;
	var graph = editor.graph;
	var isGraphEnabled = function()
	{
		return Action.prototype.isEnabled.apply(this, arguments) && graph.isEnabled();
	};

	// File actions
	this.addAction('new...', function() { graph.openLink(ui.getUrl()); });
	this.addAction('open...', function()
	{
		window.openNew = true;
		window.openKey = 'open';
		
		ui.openFile();
	});
	this.put('smartFit', new Action(mxResources.get('fitWindow') + ' / ' + mxResources.get('resetView'), function()
	{
		graph.popupMenuHandler.hideMenu();

		var scale = graph.view.scale;
		var sx = graph.container.scrollLeft;
		var sy = graph.container.scrollTop;
        var tx = graph.view.translate.x;
        var ty = graph.view.translate.y;
		var thresh = 5;

    	ui.actions.get('resetView').funct();
    	
        // Toggle scale if nothing has changed
        if (Math.abs(scale - graph.view.scale) < 0.00001 &&
			Math.abs(sx - graph.container.scrollLeft) < thresh &&
			Math.abs(sy - graph.container.scrollTop) < thresh &&
			tx == graph.view.translate.x &&
			ty == graph.view.translate.y)
        {
			ui.actions.get('fitWindow').funct();
        }
	}, null, null, 'Enter'));
	this.addAction('keyPressEnter', function()
	{
		if (graph.isEnabled())
		{
			if (graph.isSelectionEmpty())
			{
				ui.actions.get('smartFit').funct();
			}
			else
			{
				graph.startEditingAtCell();
			}
		}
	});
	this.addAction('import...', function()
	{
		window.openNew = false;
		window.openKey = 'import';
		
		// Closes dialog after open
		window.openFile = new OpenFile(mxUtils.bind(this, function()
		{
			ui.hideDialog();
		}));
		
		window.openFile.setConsumer(mxUtils.bind(this, function(xml, filename)
		{
			try
			{
				var doc = mxUtils.parseXml(xml);
				editor.graph.setSelectionCells(editor.graph.importGraphModel(doc.documentElement));
			}
			catch (e)
			{
				mxUtils.alert(mxResources.get('invalidOrMissingFile') + ': ' + e.message);
			}
		}));

		// Removes openFile if dialog is closed
		ui.showDialog(new OpenDialog(this).container, 320, 220, true, true, function()
		{
			window.openFile = null;
		});
	}).isEnabled = isGraphEnabled;
	this.addAction('save', function() { ui.saveFile(false); }, null, null, Editor.ctrlKey + '+S').isEnabled = isGraphEnabled;
	this.addAction('saveAs...', function() { ui.saveFile(true); }, null, null, Editor.ctrlKey + '+Shift+S').isEnabled = isGraphEnabled;
	this.addAction('export...', function() { ui.showDialog(new ExportDialog(ui).container, 300, 340, true, true); });
	this.addAction('editDiagram...', function()
	{
		var dlg = new EditDiagramDialog(ui);
		ui.showDialog(dlg.container, 620, 420, true, false);
		dlg.init();
	});
	this.addAction('pageSetup...', function() { ui.showDialog(new PageSetupDialog(ui).container, 320, 240, true, true); }).isEnabled = isGraphEnabled;
	this.addAction('print...', function() { ui.showDialog(new PrintDialog(ui).container, 300, 180, true, true); }, null, 'sprite-print', Editor.ctrlKey + '+P');
	this.addAction('preview', function() { mxUtils.show(graph, null, 10, 10); });

	// Edit actions
	this.addAction('undo', function() { ui.undo(); }, null, 'sprite-undo', Editor.ctrlKey + '+Z');
	this.addAction('redo', function() { ui.redo(); }, null, 'sprite-redo', (!mxClient.IS_WIN) ? Editor.ctrlKey + '+Shift+Z' : Editor.ctrlKey + '+Y');
	this.addAction('cut', function()
	{
		var cells = null;
		
		try
		{
			cells = ui.copyXml();

			if (cells != null)
			{
				graph.removeCells(cells, false);
			}
		}
		catch (e)
		{
			// ignore
		}
		
		try
		{
			if (cells == null)
			{
				mxClipboard.cut(graph);
			}
		}
		catch (e)
		{
			ui.handleError(e);
		}
	}, null, 'sprite-cut', Editor.ctrlKey + '+X');
	this.addAction('copy', function()
	{
		try
		{
			ui.copyXml();
		}
		catch (e)
		{
			// ignore
		}
		
		try
		{
			mxClipboard.copy(graph);
		}
		catch (e)
		{
			ui.handleError(e);
		}
	}, null, 'sprite-copy', Editor.ctrlKey + '+C');
	this.addAction('paste', function()
	{
		if (graph.isEnabled() && !graph.isCellLocked(graph.getDefaultParent()))
		{
			var done = false;
		
			try
			{
				if (Editor.enableNativeCipboard)
				{
					ui.readGraphModelFromClipboard(function(xml)
					{
						if (xml != null)
						{
							graph.getModel().beginUpdate();
							try
							{
								ui.pasteXml(xml, true);
							}
							finally
							{
								graph.getModel().endUpdate();
							}
						}
						else
						{
							mxClipboard.paste(graph);
						}
					})
					
					done = true;
				}
			}
			catch (e)
			{
				// ignore
			}
		
			if (!done)
			{
				mxClipboard.paste(graph);
			}
		}
	}, false, 'sprite-paste', Editor.ctrlKey + '+V');
	this.addAction('pasteHere', function(evt)
	{
		function pasteCellsHere(cells)
		{
			if (cells != null)
			{
				var includeEdges = true;
				
				for (var i = 0; i < cells.length && includeEdges; i++)
				{
					includeEdges = includeEdges && graph.model.isEdge(cells[i]);
				}

				var t = graph.view.translate;
				var s = graph.view.scale;
				var dx = t.x;
				var dy = t.y;
				var bb = null;
				
				if (cells.length == 1 && includeEdges)
				{
					var geo = graph.getCellGeometry(cells[0]);
					
					if (geo != null)
					{
						bb = geo.getTerminalPoint(true);
					}
				}

				bb = (bb != null) ? bb : graph.getBoundingBoxFromGeometry(cells, includeEdges);
				
				if (bb != null)
				{
					var x = Math.round(graph.snap(graph.popupMenuHandler.triggerX / s - dx));
					var y = Math.round(graph.snap(graph.popupMenuHandler.triggerY / s - dy));
					
					graph.cellsMoved(cells, x - bb.x, y - bb.y);
				}
			}
		};
		
		function fallback()
		{
			graph.getModel().beginUpdate();
			try
			{
				pasteCellsHere(mxClipboard.paste(graph));
			}
			finally
			{
				graph.getModel().endUpdate();
			}
		};
		
		if (graph.isEnabled() && !graph.isCellLocked(graph.getDefaultParent()))
		{
			var done = false;
		
			try
			{
				if (Editor.enableNativeCipboard)
				{
					ui.readGraphModelFromClipboard(function(xml)
					{
						if (xml != null)
						{
							graph.getModel().beginUpdate();
							try
							{
								pasteCellsHere(ui.pasteXml(xml, true));
							}
							finally
							{
								graph.getModel().endUpdate();
							}
						}
						else
						{
							fallback();
						}
					})
					
					done = true;
				}
			}
			catch (e)
			{
				// ignore
			}
			
			if (!done)
			{
				fallback();
			}
		}
	});
	
	this.addAction('swap', function()
	{
		var cells = graph.getSelectionCells();
		var model = graph.getModel();

		if (cells.length == 2 && model.isVertex(cells[0]) && model.isVertex(cells[1]) &&
			graph.getMovableCells(cells).length == 2)
		{
			var geo1 = graph.getCellGeometry(cells[0]);
			var geo2 = graph.getCellGeometry(cells[1]);

			if (geo1 != null && geo2 != null)
			{
				geo1 = geo1.clone();
				geo2 = geo2.clone();
				
				model.beginUpdate();
				try
				{
					model.setGeometry(cells[0], geo2);
					model.setGeometry(cells[1], geo1);
				}
				finally
				{
					model.endUpdate();
				}
			}
		}
	});

	this.addAction('copySize', function()
	{
		var cell = graph.getSelectionCell();
		
		if (graph.isEnabled() && cell != null && graph.getModel().isVertex(cell))
		{
			var geo = graph.getCellGeometry(cell);
			
			if (geo != null)
			{
				ui.copiedSize = new mxRectangle(geo.x, geo.y, geo.width, geo.height);
			}
		}
	}, null, null, 'Alt+Shift+F');

	this.addAction('pasteSize', function()
	{
		if (graph.isEnabled() && !graph.isSelectionEmpty() && ui.copiedSize != null)
		{
			graph.getModel().beginUpdate();
			
			try
			{
				var cells = graph.getResizableCells(graph.getSelectionCells());
				
				for (var i = 0; i < cells.length; i++)
				{
					if (graph.getModel().isVertex(cells[i]))
					{
						var geo = graph.getCellGeometry(cells[i]);
						
						if (geo != null)
						{
							geo = geo.clone();
							geo.width = ui.copiedSize.width;
							geo.height = ui.copiedSize.height;
							
							graph.getModel().setGeometry(cells[i], geo);
						}
					}
				}
			}
			finally
			{
				graph.getModel().endUpdate();
			}
		}
	}, null, null, 'Alt+Shift+V');
		
	this.addAction('copyData', function()
	{
		var cell = graph.getSelectionCell() || graph.getModel().getRoot();
		
		if (graph.isEnabled() && cell != null)
		{
			var value = cell.cloneValue();
			
			if (value != null && !isNaN(value.nodeType))
			{
				ui.copiedValue = value;
			}
		}
	}, null, null, 'Alt+Shift+B');

	this.addAction('pasteData', function(evt, trigger)
	{
		// Context menu click uses trigger, toolbar menu click uses evt
		var evt = (trigger != null) ? trigger : evt;
		var model = graph.getModel();
		
		function applyValue(cell, value)
		{
			var old = model.getValue(cell);
			value = cell.cloneValue(value);
			value.removeAttribute('placeholders');
			
			// Carries over placeholders and label properties
			if (old != null && !isNaN(old.nodeType))
			{
				value.setAttribute('placeholders', old.getAttribute('placeholders'));
			}
			
			if (evt == null || !mxEvent.isShiftDown(evt))
			{
				value.setAttribute('label', graph.convertValueToString(cell));
			}
			
			model.setValue(cell, value);
		};
		
		if (graph.isEnabled() && !graph.isSelectionEmpty() && ui.copiedValue != null)
		{
			model.beginUpdate();
			
			try
			{
				var cells = graph.getEditableCells(graph.getSelectionCells());
				
				if (cells.length == 0)
				{
					applyValue(model.getRoot(), ui.copiedValue);
				}
				else
				{
					for (var i = 0; i < cells.length; i++)
					{
						applyValue(cells[i], ui.copiedValue);
					}
				}
			}
			finally
			{
				model.endUpdate();
			}
		}
	}, null, null, 'Alt+Shift+E');
	
	function deleteCells(includeEdges)
	{
		// Cancels interactive operations
		graph.escape();
		var select = graph.deleteCells(graph.getDeletableCells(graph.getSelectionCells()), includeEdges);
		
		if (select != null)
		{
			graph.setSelectionCells(select);
		}
	};

	function deleteLabels()
	{
		if (!graph.isSelectionEmpty())
		{
			graph.getModel().beginUpdate();
			try
			{
				var cells = graph.getSelectionCells();
				
				for (var i = 0; i < cells.length; i++)
				{
					graph.cellLabelChanged(cells[i], '');
				}
			}
			finally
			{
				graph.getModel().endUpdate();
			}
		}
	};
	
	this.addAction('delete', function(evt, trigger)
	{
		// Context menu click uses trigger, toolbar menu click uses evt
		var evt = (trigger != null) ? trigger : evt;

		if (evt != null && mxEvent.isShiftDown(evt))
		{
			deleteLabels();
		}
		else
		{
			deleteCells(evt != null && (mxEvent.isControlDown(evt) ||
				mxEvent.isMetaDown(evt) || mxEvent.isAltDown(evt)));
		}
	}, null, null, 'Delete');
	this.addAction('deleteAll', function()
	{
		deleteCells(true);
	});
	this.addAction('deleteLabels', function()
	{
		deleteLabels();
	}, null, null, Editor.ctrlKey + '+Delete');
	this.addAction('duplicate', function()
	{
		try
		{
			graph.setSelectionCells(graph.duplicateCells());
			graph.scrollCellToVisible(graph.getSelectionCell());
		}
		catch (e)
		{
			ui.handleError(e);
		}
	}, null, null, Editor.ctrlKey + '+D');
	this.put('mergeCells', new Action(mxResources.get('merge'), function()
	{
		var ss = ui.getSelectionState();

		if (ss.mergeCell != null)
		{
			graph.getModel().beginUpdate();
			try
			{
				graph.setCellStyles('rowspan', ss.rowspan, [ss.mergeCell]);
				graph.setCellStyles('colspan', ss.colspan, [ss.mergeCell]);
			}
			finally
			{
				graph.getModel().endUpdate();
			}
		}
	}));
	this.put('unmergeCells', new Action(mxResources.get('unmerge'), function()
	{
		var ss = ui.getSelectionState();

		if (ss.cells.length > 0)
		{
			graph.getModel().beginUpdate();
			try
			{
				graph.setCellStyles('rowspan', null, ss.cells);
				graph.setCellStyles('colspan', null, ss.cells);
			}
			finally
			{
				graph.getModel().endUpdate();
			}
		}
	}));
	this.put('turn', new Action(mxResources.get('turn') + ' / ' + mxResources.get('reverse'), function(evt, trigger)
	{
		// Context menu click uses trigger, toolbar menu click uses evt
		var evt = (trigger != null) ? trigger : evt;

		graph.turnShapes(graph.getResizableCells(graph.getSelectionCells()),
			(evt != null) ? mxEvent.isShiftDown(evt) : false);
	}, null, null, (mxClient.IS_SF) ? null : Editor.ctrlKey + '+R'));
	this.put('selectConnections', new Action(mxResources.get('selectEdges'), function(evt)
	{
		var cell = graph.getSelectionCell();
		
		if (graph.isEnabled() && cell != null)
		{
			graph.addSelectionCells(graph.getEdges(cell));
		}
	}));
	this.addAction('selectVertices', function() { graph.selectVertices(null, true); }, null, null, Editor.ctrlKey + '+Shift+I');
	this.addAction('selectEdges', function() { graph.selectEdges(); }, null, null, Editor.ctrlKey + '+Shift+E');
	this.addAction('selectAll', function() { graph.selectAll(null, true); }, null, null, Editor.ctrlKey + '+A');
	this.addAction('selectNone', function() { graph.clearSelection(); }, null, null, Editor.ctrlKey + '+Shift+A');
	this.addAction('lockUnlock', function()
	{
		if (!graph.isSelectionEmpty())
		{
			graph.getModel().beginUpdate();
			try
			{
				var cells = graph.getSelectionCells();
				var style = graph.getCurrentCellStyle(graph.getSelectionCell());
				var value = (mxUtils.getValue(style, mxConstants.STYLE_EDITABLE, 1)) == 1 ? 0 : 1;
				graph.setCellStyles(mxConstants.STYLE_MOVABLE, value, cells);
				graph.setCellStyles(mxConstants.STYLE_RESIZABLE, value, cells);
				graph.setCellStyles(mxConstants.STYLE_ROTATABLE, value, cells);
				graph.setCellStyles(mxConstants.STYLE_DELETABLE, value, cells);
				graph.setCellStyles(mxConstants.STYLE_EDITABLE, value, cells);
				graph.setCellStyles('locked', (value == 1) ? 0 : 1, cells);
				graph.setCellStyles('connectable', value, cells);
			}
			finally
			{
				graph.getModel().endUpdate();
			}
		}
	}, null, null, Editor.ctrlKey + '+L');

	// Navigation actions
	this.addAction('home', function() { graph.home(); }, null, null, 'Shift+Home');
	this.addAction('exitGroup', function() { graph.exitGroup(); }, null, null, Editor.ctrlKey + '+Shift+Home');
	this.addAction('enterGroup', function() { graph.enterGroup(); }, null, null, Editor.ctrlKey + '+Shift+End');
	this.addAction('collapse', function() { graph.foldCells(true); }, null, null, Editor.ctrlKey + '+Home');
	this.addAction('expand', function() { graph.foldCells(false); }, null, null, Editor.ctrlKey + '+End');
	
	// Arrange actions
	this.addAction('toFront', function()
	{
		graph.orderCells(false);
	}, null, null, Editor.ctrlKey + '+Shift+F');
	this.addAction('toBack', function()
	{
		graph.orderCells(true);
	}, null, null, Editor.ctrlKey + '+Shift+B');
	this.addAction('bringForward', function(evt)
	{
		graph.orderCells(false, null, true);
	});
	this.addAction('sendBackward', function(evt)
	{
		graph.orderCells(true, null, true);
	});
	this.addAction('group', function()
	{
		if (graph.isEnabled())
		{
			var cells = mxUtils.sortCells(graph.getSelectionCells(), true);

			if (cells.length == 1 && !graph.isTable(cells[0]) && !graph.isTableRow(cells[0]))
			{
				graph.setCellStyles('container', '1');
			}
			else
			{
				cells = graph.getCellsForGroup(cells);
				
				if (cells.length > 1)
				{
					graph.setSelectionCell(graph.groupCells(null, 0, cells));
				}
			}
		}
	}, null, null, Editor.ctrlKey + '+G');
	this.addAction('ungroup', function()
	{
		if (graph.isEnabled())
		{
			var cells = graph.getEditableCells(graph.getSelectionCells());
			
	        graph.model.beginUpdate();
			try
			{
				var temp = graph.ungroupCells();
				
				// Clears container flag for remaining cells
				if (cells != null)
				{
					for (var i = 0; i < cells.length; i++)
			    	{
						if (graph.model.contains(cells[i]))
						{
							if (graph.model.getChildCount(cells[i]) == 0 &&
								graph.model.isVertex(cells[i]))
							{
								graph.setCellStyles('container', '0', [cells[i]]);
							}
							
							temp.push(cells[i]);
						}
			    	}
				}
		    }
			finally
			{
				graph.model.endUpdate();
			}
	
			if (temp.length > 0)
			{
				graph.setSelectionCells(temp);
			}
		}
	}, null, null, Editor.ctrlKey + '+Shift+U');
	this.addAction('removeFromGroup', function()
	{
		if (graph.isEnabled())
		{
			var cells = graph.getSelectionCells();
			
			// Removes table rows and cells
			if (cells != null)
			{
				var temp = [];
				
				for (var i = 0; i < cells.length; i++)
		    	{
					if (!graph.isTableRow(cells[i]) &&
						!graph.isTableCell(cells[i]))
					{
						temp.push(cells[i]);
					}
		    	}
				
				graph.removeCellsFromParent(temp);
			}
		}
	});
	// Adds action
	this.addAction('edit', function()
	{
		if (graph.isEnabled())
		{
			graph.startEditingAtCell();
		}
	}, null, null, 'F2/Enter');
	this.addAction('editData...', function()
	{
		var cell = graph.getSelectionCell() || graph.getModel().getRoot();
		ui.showDataDialog(cell);
	}, null, null, Editor.ctrlKey + '+M');
	this.addAction('editTooltip...', function()
	{
		var cell = graph.getSelectionCell();
		
		if (graph.isEnabled() && cell != null && graph.isCellEditable(cell))
		{
			var tooltip = '';
			
			if (mxUtils.isNode(cell.value))
			{
				var tmp = null;
				
				if (Graph.translateDiagram && Graph.diagramLanguage != null &&
					cell.value.hasAttribute('tooltip_' + Graph.diagramLanguage))
				{
					tmp = cell.value.getAttribute('tooltip_' + Graph.diagramLanguage);
				}
				
				if (tmp == null)
				{
					tmp = cell.value.getAttribute('tooltip');
				}
				
				if (tmp != null)
				{
					tooltip = tmp;
				}
			}
			
	    	var dlg = new TextareaDialog(ui, mxResources.get('editTooltip') + ':', tooltip, function(newValue)
			{
				graph.setTooltipForCell(cell, newValue);
			});
			ui.showDialog(dlg.container, 320, 200, true, true);
			dlg.init();
		}
	}, null, null, 'Alt+Shift+T');
	this.addAction('openLink', function()
	{
		var link = graph.getLinkForCell(graph.getSelectionCell());
		
		if (link != null)
		{
			graph.openLink(link);
		}
	});
	this.addAction('editLink...', function()
	{
		var cell = graph.getSelectionCell();
		
		if (graph.isEnabled() && cell != null && graph.isCellEditable(cell))
		{
			var value = graph.getLinkForCell(cell) || '';
			
			ui.showLinkDialog(value, mxResources.get('apply'), function(link, docs, linkTarget)
			{
				link = mxUtils.trim(link);
    			graph.setLinkForCell(cell, (link.length > 0) ? link : null);
				graph.setAttributeForCell(cell, 'linkTarget', linkTarget);
			}, true, graph.getLinkTargetForCell(cell));
		}
	}, null, null, 'Alt+Shift+L');
	this.put('insertImage', new Action(mxResources.get('image') + '...', function()
	{
		if (graph.isEnabled() && !graph.isCellLocked(graph.getDefaultParent()))
		{
			graph.clearSelection();
			ui.actions.get('image').funct();
		}
	})).isEnabled = isGraphEnabled;
	this.addAction('editImage...', function()
	{
		ui.actions.get('image').funct();
	});
	this.put('insertLink', new Action(mxResources.get('link') + '...', function()
	{
		if (graph.isEnabled() && !graph.isCellLocked(graph.getDefaultParent()))
		{
			ui.showLinkDialog('', mxResources.get('insert'), function(link, docs, linkTarget)
			{
				link = mxUtils.trim(link);
				
				if (link.length > 0)
				{
					var icon = null;
					var title = graph.getLinkTitle(link);
					
					if (docs != null && docs.length > 0)
					{
						icon = docs[0].iconUrl;
						title = docs[0].name || docs[0].type;
						title = title.charAt(0).toUpperCase() + title.substring(1);
						
						if (title.length > 30)
						{
							title = title.substring(0, 30) + '...';
						}
					}
					
            		var linkCell = new mxCell(title, new mxGeometry(0, 0, 100, 40),
	            	    	'fontColor=#0000EE;fontStyle=4;rounded=1;overflow=hidden;' + ((icon != null) ?
	            	    	'shape=label;imageWidth=16;imageHeight=16;spacingLeft=26;align=left;image=' + icon :
	            	    	'spacing=10;'));
            	    linkCell.vertex = true;

            	    var pt = graph.getCenterInsertPoint(graph.getBoundingBoxFromGeometry([linkCell], true));
					linkCell.geometry.x = pt.x;
            	    linkCell.geometry.y = pt.y;
            	    
					graph.setAttributeForCell(linkCell, 'linkTarget', linkTarget);
            	    graph.setLinkForCell(linkCell, link);
            	    graph.cellSizeUpdated(linkCell, true);

            		graph.getModel().beginUpdate();
            		try
            		{
        	    		linkCell = graph.addCell(linkCell);
        	    		graph.fireEvent(new mxEventObject('cellsInserted', 'cells', [linkCell]));
            	    }
            		finally
            		{
            			graph.getModel().endUpdate();
            		}
            		
            	    graph.setSelectionCell(linkCell);
            	    graph.scrollCellToVisible(graph.getSelectionCell());
				}
			}, true);
		}
	}, null, null, 'L')).isEnabled = isGraphEnabled;
	this.addAction('link...', mxUtils.bind(this, function()
	{
		if (graph.isEnabled())
		{
			if (graph.cellEditor.isContentEditing())
			{
				var elt = graph.getSelectedElement();
				var link = graph.getParentByName(elt, 'A', graph.cellEditor.textarea);
				var oldValue = '';
				
				// Workaround for FF returning the outermost selected element after double
				// click on a DOM hierarchy with a link inside (but not as topmost element)
				if (link == null && elt != null && elt.getElementsByTagName != null)
				{
					// Finds all links in the selected DOM and uses the link
					// where the selection text matches its text content
					var links = elt.getElementsByTagName('a');
					
					for (var i = 0; i < links.length && link == null; i++)
					{
						if (links[i].textContent == elt.textContent)
						{
							link = links[i];
						}
					}
				}

				if (link != null && link.nodeName == 'A')
				{
					oldValue = link.getAttribute('href') || '';
					graph.selectNode(link);
				}
				
				var selState = graph.cellEditor.saveSelection();
				
				ui.showLinkDialog(oldValue, mxResources.get('apply'), mxUtils.bind(this, function(value)
				{
		    		graph.cellEditor.restoreSelection(selState);

		    		if (value != null)
		    		{
		    			graph.insertLink(value);
					}
				}));
			}
			else if (graph.isSelectionEmpty())
			{
				this.get('insertLink').funct();
			}
			else
			{
				this.get('editLink').funct();
			}
		}
	})).isEnabled = isGraphEnabled;
	this.addAction('autosize', function()
	{
		var cells = graph.getSelectionCells();
		
		if (cells != null)
		{
			graph.getModel().beginUpdate();
			try
			{
				for (var i = 0; i < cells.length; i++)
				{
					var cell = cells[i];

					if (graph.getModel().isVertex(cell))
					{
						if (graph.getModel().getChildCount(cell) > 0)
						{
							graph.updateGroupBounds([cell], 0, true);
						}
						else
						{
							graph.updateCellSize(cell);
						}
					}
				}
			}
			finally
			{
				graph.getModel().endUpdate();
			}
		}
	}, null, null, Editor.ctrlKey + '+Shift+Y');
	this.addAction('snapToGrid', function()
	{
		graph.snapCellsToGrid(graph.getSelectionCells(), graph.gridSize);
	});
	this.addAction('formattedText', function()
	{
    	graph.stopEditing();

		var style = graph.getCommonStyle(graph.getSelectionCells());
		var value = (mxUtils.getValue(style, 'html', '0') == '1') ? null : '1';
		
		graph.getModel().beginUpdate();
		try
		{
			var cells = graph.getEditableCells(graph.getSelectionCells());
			
			for (var i = 0; i < cells.length; i++)
			{
				state = graph.getView().getState(cells[i]);
				
				if (state != null)
				{
					var html = mxUtils.getValue(state.style, 'html', '0');
					
					if (html == '1' && value == null)
			    	{
						graph.removeTextStyleForCell(state.cell);
						graph.setCellStyles('html', value, [cells[i]]);
			    	}
					else if (html == '0' && value == '1')
			    	{
			    		// Converts HTML tags to text
			    		var label = mxUtils.htmlEntities(graph.convertValueToString(state.cell), false);
			    		
			    		if (mxUtils.getValue(state.style, 'nl2Br', '1') != '0')
						{
							// Converts newlines in plain text to breaks in HTML
							// to match the plain text output
			    			label = label.replace(/\n/g, '<br/>');
						}
			    		
			    		graph.cellLabelChanged(state.cell, Graph.sanitizeHtml(label));
			    		graph.setCellStyles('html', value, [cells[i]]);
			    	}
				}
			}

			ui.fireEvent(new mxEventObject('styleChanged', 'keys', ['html'],
				'values', [(value != null) ? value : '0'], 'cells', cells));
		}
		finally
		{
			graph.getModel().endUpdate();
		}
	});
	this.addAction('wordWrap', function()
	{
    	var state = graph.getView().getState(graph.getSelectionCell());
    	var value = 'wrap';
    	
		graph.stopEditing();
    	
    	if (state != null && state.style[mxConstants.STYLE_WHITE_SPACE] == 'wrap')
    	{
    		value = null;
    	}

       	graph.setCellStyles(mxConstants.STYLE_WHITE_SPACE, value);
	});
	this.addAction('rotation', function()
	{
		var value = '0';
    	var state = graph.getView().getState(graph.getSelectionCell());
    	
    	if (state != null)
    	{
    		value = state.style[mxConstants.STYLE_ROTATION] || value;
    	}

		var dlg = new FilenameDialog(ui, value, mxResources.get('apply'), function(newValue)
		{
			if (newValue != null && newValue.length > 0)
			{
				graph.setCellStyles(mxConstants.STYLE_ROTATION, newValue);
			}
		}, mxResources.get('enterValue') + ' (' + mxResources.get('rotation') + ' 0-360)');
		
		ui.showDialog(dlg.container, 375, 80, true, true);
		dlg.init();
	});
	// View actions
	this.addAction('resetView', function()
	{
		graph.zoomTo(1);
		ui.resetScrollbars();
	}, null, null, 'Enter/Home');
	this.addAction('zoomIn', function(evt)
	{
		if (graph.isFastZoomEnabled())
		{
			graph.lazyZoom(true, true, ui.buttonZoomDelay);
		}
		else
		{
			graph.zoomIn();
		}
	}, null, null, Editor.ctrlKey + ' + (Numpad) / Alt+Mousewheel');
	this.addAction('zoomOut', function(evt)
	{
		if (graph.isFastZoomEnabled())
		{
			graph.lazyZoom(false, true, ui.buttonZoomDelay);
		}
		else
		{
			graph.zoomOut();
		}
	}, null, null, Editor.ctrlKey + ' - (Numpad) / Alt+Mousewheel');
	this.addAction('fitWindow', function()
	{
		if (graph.pageVisible && graph.isSelectionEmpty())
		{
			graph.fitPages();
		}
		else
		{
			ui.fitDiagramToWindow();
		}
	}, null, null, Editor.ctrlKey + '+Shift+H');
	this.addAction('fitPage', mxUtils.bind(this, function()
	{
		if (graph.pageVisible)
		{
			graph.fitPages(1);
		}
		else
		{
			this.get('pageView').funct();
		}
	}), null, null, Editor.ctrlKey + '+J');
	this.addAction('fitTwoPages', mxUtils.bind(this, function()
	{
		if (graph.pageVisible)
		{
			graph.fitPages(2);
		}
		else
		{
			this.get('pageView').funct();
		}
	}), null, null, Editor.ctrlKey + '+Shift+J');
	this.addAction('fitPageWidth', mxUtils.bind(this, function()
	{
		if (graph.pageVisible)
		{
			graph.fitPages(1, true);
		}
		else
		{
			this.get('pageView').funct();
		}
	}));
	this.put('customZoom', new Action(mxResources.get('custom') + '...', mxUtils.bind(this, function()
	{
		var dlg = new FilenameDialog(this.editorUi, parseInt(graph.getView().getScale() * 100), mxResources.get('apply'), mxUtils.bind(this, function(newValue)
		{
			var val = parseInt(newValue);
			
			if (!isNaN(val) && val > 0)
			{
				graph.zoomTo(val / 100);
			}
		}), mxResources.get('zoom') + ' (%)');
		this.editorUi.showDialog(dlg.container, 300, 80, true, true);
		dlg.init();
	}), null, null, Editor.ctrlKey + '+0'));
	this.addAction('pageScale...', mxUtils.bind(this, function()
	{
		var dlg = new FilenameDialog(this.editorUi, parseInt(graph.pageScale * 100), mxResources.get('apply'), mxUtils.bind(this, function(newValue)
		{
			var val = parseInt(newValue);
			
			if (!isNaN(val) && val > 0)
			{
				var change = new ChangePageSetup(ui, null, null, null, val / 100);
				change.ignoreColor = true;
				change.ignoreImage = true;
				
				graph.model.execute(change);
			}
		}), mxResources.get('pageScale') + ' (%)');
		this.editorUi.showDialog(dlg.container, 300, 80, true, true);
		dlg.init();
	}));

	// Option actions
	var action = null;
	action = this.addAction('grid', function()
	{
		graph.setGridEnabled(!graph.isGridEnabled());
		graph.defaultGridEnabled = graph.isGridEnabled();
		ui.fireEvent(new mxEventObject('gridEnabledChanged'));
	}, null, null, Editor.ctrlKey + '+Shift+G');
	action.setToggleAction(true);
	action.setSelectedCallback(function() { return graph.isGridEnabled(); });
	action.setEnabled(false);
	
	action = this.addAction('guides', function()
	{
		graph.graphHandler.guidesEnabled = !graph.graphHandler.guidesEnabled;
		ui.fireEvent(new mxEventObject('guidesEnabledChanged'));
	});
	action.setToggleAction(true);
	action.setSelectedCallback(function() { return graph.graphHandler.guidesEnabled; });
	action.setEnabled(false);
	
	action = this.addAction('tooltips', function()
	{
		graph.tooltipHandler.setEnabled(!graph.tooltipHandler.isEnabled());
		ui.fireEvent(new mxEventObject('tooltipsEnabledChanged'));
	});
	action.setToggleAction(true);
	action.setSelectedCallback(function() { return graph.tooltipHandler.isEnabled(); });
	
	action = this.addAction('collapseExpand', function()
	{
		var change = new ChangePageSetup(ui);
		change.ignoreColor = true;
		change.ignoreImage = true;
		change.foldingEnabled = !graph.foldingEnabled;
		
		graph.model.execute(change);
	});
	action.setToggleAction(true);
	action.setSelectedCallback(function() { return graph.foldingEnabled; });
	action.isEnabled = isGraphEnabled;
	action = this.addAction('pageView', mxUtils.bind(this, function()
	{
		ui.setPageVisible(!graph.pageVisible);
	}));
	action.setToggleAction(true);
	action.setSelectedCallback(function() { return graph.pageVisible; });
	action = this.addAction('connectionArrows', function()
	{
		graph.connectionArrowsEnabled = !graph.connectionArrowsEnabled;
		ui.fireEvent(new mxEventObject('connectionArrowsChanged'));
	}, null, null, 'Alt+Shift+A');
	action.setToggleAction(true);
	action.setSelectedCallback(function() { return graph.connectionArrowsEnabled; });
	action = this.addAction('connectionPoints', function()
	{
		graph.setConnectable(!graph.connectionHandler.isEnabled());
		ui.fireEvent(new mxEventObject('connectionPointsChanged'));
	}, null, null, 'Alt+Shift+O');
	action.setToggleAction(true);
	action.setSelectedCallback(function() { return graph.connectionHandler.isEnabled(); });
	action = this.addAction('copyConnect', function()
	{
		graph.connectionHandler.setCreateTarget(!graph.connectionHandler.isCreateTarget());
		ui.fireEvent(new mxEventObject('copyConnectChanged'));
	});
	action.setToggleAction(true);
	action.setSelectedCallback(function() { return graph.connectionHandler.isCreateTarget(); });
	action.isEnabled = isGraphEnabled;
	action = this.addAction('autosave', function()
	{
		ui.editor.setAutosave(!ui.editor.autosave);
	});
	action.setToggleAction(true);
	action.setSelectedCallback(function() { return ui.editor.autosave; });
	action.isEnabled = isGraphEnabled;
	action.visible = false;
	
	// Help actions
	this.addAction('help', function()
	{
		var ext = '';
		
		if (mxResources.isLanguageSupported(mxClient.language))
		{
			ext = '_' + mxClient.language;
		}
		
		graph.openLink(RESOURCES_PATH + '/help' + ext + '.html');
	});
	
	var showingAbout = false;
	
	this.put('about', new Action(mxResources.get('about') + ' Graph Editor...', function()
	{
		if (!showingAbout)
		{
			ui.showDialog(new AboutDialog(ui).container, 320, 280, true, true, function()
			{
				showingAbout = false;
			});
			
			showingAbout = true;
		}
	}));
	
	// Font style actions
	var toggleFontStyle = mxUtils.bind(this, function(key, style, fn, shortcut)
	{
		return this.addAction(key, function()
		{
			if (fn != null && graph.cellEditor.isContentEditing())
			{
				fn();
			}
			else
			{
				graph.stopEditing(false);
				
				graph.getModel().beginUpdate();
				try
				{
					var cells = graph.getEditableCells(graph.getSelectionCells());
					graph.toggleCellStyleFlags(mxConstants.STYLE_FONTSTYLE, style, cells);
					
					// Removes bold and italic tags and CSS styles inside labels
					if ((style & mxConstants.FONT_BOLD) == mxConstants.FONT_BOLD)
					{
						graph.updateLabelElements(cells, function(elt)
						{
							elt.style.fontWeight = null;
							
							if (elt.nodeName == 'B')
							{
								graph.replaceElement(elt);
							}
						});
					}
					else if ((style & mxConstants.FONT_ITALIC) == mxConstants.FONT_ITALIC)
					{
						graph.updateLabelElements(cells, function(elt)
						{
							elt.style.fontStyle = null;
							
							if (elt.nodeName == 'I')
							{
								graph.replaceElement(elt);
							}
						});
					}
					else if ((style & mxConstants.FONT_UNDERLINE) == mxConstants.FONT_UNDERLINE)
					{
						graph.updateLabelElements(cells, function(elt)
						{
							elt.style.textDecoration = null;
							
							if (elt.nodeName == 'U')
							{
								graph.replaceElement(elt);
							}
						});
					}
					
					for (var i = 0; i < cells.length; i++)
					{
						if (graph.model.getChildCount(cells[i]) == 0)
						{
							graph.autoSizeCell(cells[i], false);
						}
					}
				}
				finally
				{
					graph.getModel().endUpdate();
				}
			}
		}, null, null, shortcut);
	});
	
	toggleFontStyle('bold', mxConstants.FONT_BOLD, function() { document.execCommand('bold', false, null); }, Editor.ctrlKey + '+B');
	toggleFontStyle('italic', mxConstants.FONT_ITALIC, function() { document.execCommand('italic', false, null); }, Editor.ctrlKey + '+I');
	toggleFontStyle('underline', mxConstants.FONT_UNDERLINE, function() { document.execCommand('underline', false, null); }, Editor.ctrlKey + '+U');
	
	// Color actions
	this.addAction('fontColor...', function() { ui.menus.pickColor(mxConstants.STYLE_FONTCOLOR, 'forecolor', '000000'); });
	this.addAction('strokeColor...', function() { ui.menus.pickColor(mxConstants.STYLE_STROKECOLOR); });
	this.addAction('fillColor...', function() { ui.menus.pickColor(mxConstants.STYLE_FILLCOLOR); });
	this.addAction('gradientColor...', function() { ui.menus.pickColor(mxConstants.STYLE_GRADIENTCOLOR); });
	this.addAction('backgroundColor...', function() { ui.menus.pickColor(mxConstants.STYLE_LABEL_BACKGROUNDCOLOR, 'backcolor'); });
	this.addAction('borderColor...', function() { ui.menus.pickColor(mxConstants.STYLE_LABEL_BORDERCOLOR); });
	
	// Format actions
	this.addAction('removeFormat', function()
	{
		if (graph.isEnabled() && !graph.isSelectionEmpty() && !graph.isEditing())
		{
			graph.getModel().beginUpdate();
			try
			{
				var cells = graph.getSelectionCells();

				for (var i = 0; i < cells.length; i++)
				{
					graph.removeTextStyleForCell(cells[i], true);
				}
			}
			finally
			{
				graph.getModel().endUpdate();
			}
		}
	});
	this.addAction('vertical', function() { ui.menus.toggleStyle(mxConstants.STYLE_HORIZONTAL, true); });
	this.addAction('shadow', function() { ui.menus.toggleStyle(mxConstants.STYLE_SHADOW); });
	this.addAction('solid', function()
	{
		graph.getModel().beginUpdate();
		try
		{
			graph.setCellStyles(mxConstants.STYLE_DASHED, null);
			graph.setCellStyles(mxConstants.STYLE_DASH_PATTERN, null);
			ui.fireEvent(new mxEventObject('styleChanged', 'keys', [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN],
				'values', [null, null], 'cells', graph.getSelectionCells()));
		}
		finally
		{
			graph.getModel().endUpdate();
		}
	});
	this.addAction('dashed', function()
	{
		graph.getModel().beginUpdate();
		try
		{
			graph.setCellStyles(mxConstants.STYLE_DASHED, '1');
			graph.setCellStyles(mxConstants.STYLE_DASH_PATTERN, null);
			ui.fireEvent(new mxEventObject('styleChanged', 'keys', [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN],
				'values', ['1', null], 'cells', graph.getSelectionCells()));
		}
		finally
		{
			graph.getModel().endUpdate();
		}
	});
	this.addAction('dotted', function()
	{
		graph.getModel().beginUpdate();
		try
		{
			graph.setCellStyles(mxConstants.STYLE_DASHED, '1');
			graph.setCellStyles(mxConstants.STYLE_DASH_PATTERN, '1 4');
			ui.fireEvent(new mxEventObject('styleChanged', 'keys', [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN],
				'values', ['1', '1 4'], 'cells', graph.getSelectionCells()));
		}
		finally
		{
			graph.getModel().endUpdate();
		}
	});
	this.addAction('sharp', function()
	{
		graph.getModel().beginUpdate();
		try
		{
			graph.setCellStyles(mxConstants.STYLE_ROUNDED, '0');
			graph.setCellStyles(mxConstants.STYLE_CURVED, '0');
			ui.fireEvent(new mxEventObject('styleChanged', 'keys', [mxConstants.STYLE_ROUNDED, mxConstants.STYLE_CURVED],
					'values', ['0', '0'], 'cells', graph.getSelectionCells()));
		}
		finally
		{
			graph.getModel().endUpdate();
		}
	});
	this.addAction('rounded', function()
	{
		graph.getModel().beginUpdate();
		try
		{
			graph.setCellStyles(mxConstants.STYLE_ROUNDED, '1');
			graph.setCellStyles(mxConstants.STYLE_CURVED, '0');
			ui.fireEvent(new mxEventObject('styleChanged', 'keys', [mxConstants.STYLE_ROUNDED, mxConstants.STYLE_CURVED],
					'values', ['1', '0'], 'cells', graph.getSelectionCells()));
		}
		finally
		{
			graph.getModel().endUpdate();
		}
	});
	this.addAction('toggleRounded', function()
	{
		if (!graph.isSelectionEmpty() && graph.isEnabled())
		{
			graph.getModel().beginUpdate();
			try
			{
				var cells = graph.getSelectionCells();
	    		var style = graph.getCurrentCellStyle(cells[0]);
	    		var value = (mxUtils.getValue(style, mxConstants.STYLE_ROUNDED, '0') == '1') ? '0' : '1';
	    		
				graph.setCellStyles(mxConstants.STYLE_ROUNDED, value);
				graph.setCellStyles(mxConstants.STYLE_CURVED, null);
				ui.fireEvent(new mxEventObject('styleChanged', 'keys', [mxConstants.STYLE_ROUNDED, mxConstants.STYLE_CURVED],
						'values', [value, '0'], 'cells', graph.getSelectionCells()));
			}
			finally
			{
				graph.getModel().endUpdate();
			}
		}
	});
	this.addAction('curved', function()
	{
		graph.getModel().beginUpdate();
		try
		{
			graph.setCellStyles(mxConstants.STYLE_ROUNDED, '0');
			graph.setCellStyles(mxConstants.STYLE_CURVED, '1');
			ui.fireEvent(new mxEventObject('styleChanged', 'keys', [mxConstants.STYLE_ROUNDED, mxConstants.STYLE_CURVED],
					'values', ['0', '1'], 'cells', graph.getSelectionCells()));
		}
		finally
		{
			graph.getModel().endUpdate();
		}
	});
	this.addAction('collapsible', function()
	{
		var state = graph.view.getState(graph.getSelectionCell());
		var value = '1';
		
		if (state != null && graph.getFoldingImage(state) != null)
		{
			value = '0';	
		}
		
		graph.setCellStyles('collapsible', value);
		ui.fireEvent(new mxEventObject('styleChanged', 'keys', ['collapsible'],
				'values', [value], 'cells', graph.getSelectionCells()));
	});
	this.addAction('editStyle...', mxUtils.bind(this, function()
	{
		var cells = graph.getEditableCells(graph.getSelectionCells());
		
		if (cells != null && cells.length > 0)
		{
			var model = graph.getModel();
			
	    	var dlg = new TextareaDialog(this.editorUi, mxResources.get('editStyle') + ':',
	    		model.getStyle(cells[0]) || '', function(newValue)
			{
	    		if (newValue != null)
				{
					graph.setCellStyle(mxUtils.trim(newValue), cells);
				}
			}, null, null, 400, 220);
			this.editorUi.showDialog(dlg.container, 420, 300, true, true);
			dlg.init();
		}
	}), null, null, Editor.ctrlKey + '+E');
	this.addAction('setAsDefaultStyle', function()
	{
		if (graph.isEnabled() && !graph.isSelectionEmpty())
		{
			ui.setDefaultStyle(graph.getSelectionCell());
		}
	}, null, null, Editor.ctrlKey + '+Shift+D');
	this.addAction('clearDefaultStyle', function()
	{
		if (graph.isEnabled())
		{
			ui.clearDefaultStyle();
		}
	}, null, null, Editor.ctrlKey + '+Shift+R');
	this.addAction('addWaypoint', function()
	{
		var cell = graph.getSelectionCell();
		
		if (cell != null && graph.getModel().isEdge(cell))
		{
			var handler = editor.graph.selectionCellsHandler.getHandler(cell);
			
			if (handler instanceof mxEdgeHandler)
			{
				var t = graph.view.translate;
				var s = graph.view.scale;
				var dx = t.x;
				var dy = t.y;
				
				var parent = graph.getModel().getParent(cell);
				var pgeo = graph.getCellGeometry(parent);
				
				while (graph.getModel().isVertex(parent) && pgeo != null)
				{
					dx += pgeo.x;
					dy += pgeo.y;
					
					parent = graph.getModel().getParent(parent);
					pgeo = graph.getCellGeometry(parent);
				}
				
				var x = Math.round(graph.snap(graph.popupMenuHandler.triggerX / s - dx));
				var y = Math.round(graph.snap(graph.popupMenuHandler.triggerY / s - dy));
				
				handler.addPointAt(handler.state, x, y);
			}
		}
	});
	this.addAction('removeWaypoint', function()
	{
		// TODO: Action should run with "this" set to action
		var rmWaypointAction = ui.actions.get('removeWaypoint');
		
		if (rmWaypointAction.handler != null)
		{
			// NOTE: Popupevent handled and action updated in Menus.createPopupMenu
			rmWaypointAction.handler.removePoint(rmWaypointAction.handler.state, rmWaypointAction.index);
		}
	});
	this.addAction('clearWaypoints', function(evt, trigger)
	{
		// Context menu click uses trigger, toolbar menu click uses evt
		var evt = (trigger != null) ? trigger : evt;
		var cells = graph.getSelectionCells();

		if (cells != null)
		{
			cells = graph.getEditableCells(graph.addAllEdges(cells));
			
			graph.getModel().beginUpdate();
			try
			{
				for (var i = 0; i < cells.length; i++)
				{
					var cell = cells[i];
					
					if (graph.getModel().isEdge(cell))
					{
						var geo = graph.getCellGeometry(cell);
			
						// Resets fixed connection point
						if (trigger != null && mxEvent.isShiftDown(evt))
						{
							graph.setCellStyles(mxConstants.STYLE_EXIT_X, null, [cell]);
							graph.setCellStyles(mxConstants.STYLE_EXIT_Y, null, [cell]);
							graph.setCellStyles(mxConstants.STYLE_ENTRY_X, null, [cell]);
							graph.setCellStyles(mxConstants.STYLE_ENTRY_Y, null, [cell]);
						}
						else if (geo != null)
						{
							geo = geo.clone();
							geo.points = null;
							geo.x = 0;
							geo.y = 0;
							geo.offset = null;
							graph.getModel().setGeometry(cell, geo);
						}
					}
				}
			}
			finally
			{
				graph.getModel().endUpdate();
			}
		}
	}, null, null, 'Alt+Shift+R');
	action = this.addAction('subscript', mxUtils.bind(this, function()
	{
	    if (graph.cellEditor.isContentEditing())
	    {
			document.execCommand('subscript', false, null);
		}
	}), null, null, Editor.ctrlKey + '+,');
	action = this.addAction('superscript', mxUtils.bind(this, function()
	{
	    if (graph.cellEditor.isContentEditing())
	    {
			document.execCommand('superscript', false, null);
		}
	}), null, null, Editor.ctrlKey + '+.');
	action = this.addAction('decreaseFontSize', mxUtils.bind(this, function()
	{
		if (!graph.isSelectionEmpty())
		{
			var style = graph.getCurrentCellStyle(graph.getSelectionCell());
			var size = mxUtils.getValue(style, mxConstants.STYLE_FONTSIZE, mxConstants.DEFAULT_FONTSIZE);
			graph.setCellStyles(mxConstants.STYLE_FONTSIZE, Math.max(1, size - 1),
				graph.getSelectionCells());
		}
	}), null, null, Editor.ctrlKey + '+Shift + (Numpad)');
	action = this.addAction('increaseFontSize', mxUtils.bind(this, function()
	{
		if (!graph.isSelectionEmpty())
		{
			var style = graph.getCurrentCellStyle(graph.getSelectionCell());
			var size = mxUtils.getValue(style, mxConstants.STYLE_FONTSIZE, mxConstants.DEFAULT_FONTSIZE);
			graph.setCellStyles(mxConstants.STYLE_FONTSIZE, Math.min(100, size + 1),
				graph.getSelectionCells());
		}
	}), null, null, Editor.ctrlKey + '+Shift - (Numpad)');

	function applyClipPath(cell, clipPath, width, height, graph)
	{
		graph.getModel().beginUpdate();
		try
		{
			var geo = graph.getCellGeometry(cell);
				
			if (geo != null && width && height) //Comparing the ratio mostly will fail since it's float
			{
				var scale = width / height;
				geo = geo.clone();

				if (scale > 1)
				{
					geo.height = geo.width / scale;
				}
				else
				{
					geo.width = geo.height * scale;
				}

				graph.getModel().setGeometry(cell, geo);
			}

			graph.setCellStyles(mxConstants.STYLE_CLIP_PATH, clipPath, [cell]); //Set/unset clipPath
			graph.setCellStyles(mxConstants.STYLE_ASPECT, 'fixed', [cell]);
		}
		finally
		{
			graph.getModel().endUpdate();
		}
	};

	this.addAction('image...', function()
	{
		if (graph.isEnabled() && !graph.isCellLocked(graph.getDefaultParent()))
		{
			var title = mxResources.get('image') + ' (' + mxResources.get('url') + '):';
	    	var state = graph.getView().getState(graph.getSelectionCell());
	    	var value = '', clipPath = null;
	    	
	    	if (state != null)
	    	{
	    		value = state.style[mxConstants.STYLE_IMAGE] || value;
				clipPath = state.style[mxConstants.STYLE_CLIP_PATH] || clipPath;
		    }
	    	
	    	var selectionState = graph.cellEditor.saveSelection();
	    	
	    	ui.showImageDialog(title, value, function(newValue, w, h, clipPath, cW, cH)
			{
	    		// Inserts image into HTML text
	    		if (graph.cellEditor.isContentEditing())
	    		{
	    			graph.cellEditor.restoreSelection(selectionState);
	    			graph.insertImage(newValue, w, h);
	    		}
	    		else
	    		{
					var cells = graph.getSelectionCells();
					
					if (newValue != null && (newValue.length > 0 || cells.length > 0))
					{
						var select = null;
						
						graph.getModel().beginUpdate();
			        	try
			        	{
			        		// Inserts new cell if no cell is selected
			    			if (cells.length == 0)
			    			{
			    				cells = [graph.insertVertex(graph.getDefaultParent(), null, '', 0, 0, w, h,
			    					'shape=image;imageAspect=0;aspect=fixed;verticalLabelPosition=bottom;verticalAlign=top;')];
			    				var pt = graph.getCenterInsertPoint(graph.getBoundingBoxFromGeometry(cells, true));
								cells[0].geometry.x = pt.x;
			            	    cells[0].geometry.y = pt.y;

								if (clipPath != null)
								{
			            	    	applyClipPath(cells[0], clipPath, cW, cH, graph);
								}
								
			    				select = cells;
		            	    	graph.fireEvent(new mxEventObject('cellsInserted', 'cells', select));
			    			}
			    			
			        		graph.setCellStyles(mxConstants.STYLE_IMAGE, (newValue.length > 0) ? newValue : null, cells);
							
			        		// Sets shape only if not already shape with image (label or image)
			        		var style = graph.getCurrentCellStyle(cells[0]);
			        		
			        		if (style[mxConstants.STYLE_SHAPE] != 'image' && style[mxConstants.STYLE_SHAPE] != 'label')
			        		{
			        			graph.setCellStyles(mxConstants.STYLE_SHAPE, 'image', cells);
			        		}
			        		else if (newValue.length == 0)
			        		{
			        			graph.setCellStyles(mxConstants.STYLE_SHAPE, null, cells);
			        		}

							if (clipPath == null)
							{
								graph.setCellStyles(mxConstants.STYLE_CLIP_PATH, null, cells); //Reset clip path
							}
				        	
							if (w != null && h != null)
							{
								for (var i = 0; i < cells.length; i++)
								{
									var cell = cells[i];

									if (graph.getCurrentCellStyle(cell)['expand'] != '0')
									{
										var geo = graph.getModel().getGeometry(cell);
										
										if (geo != null)
										{
											geo = geo.clone();
											geo.width = w;
											geo.height = h;
											graph.getModel().setGeometry(cell, geo);
										}
									}

									if (clipPath != null)
									{
										applyClipPath(cell, clipPath, cW, cH, graph);
									}
								}
							}
			        	}
			        	finally
			        	{
			        		graph.getModel().endUpdate();
			        	}
			        	
			        	if (select != null)
			        	{
			        		graph.setSelectionCells(select);
			        		graph.scrollCellToVisible(select[0]);
			        	}
					}
		    	}
			}, graph.cellEditor.isContentEditing(), !graph.cellEditor.isContentEditing(), true, clipPath);
		}
	}).isEnabled = isGraphEnabled;
	
	this.addAction('crop...', function()
	{
		var cell = graph.getSelectionCell();

		if (graph.isEnabled() && !graph.isCellLocked(graph.getDefaultParent()) && cell != null)
		{
			var style = graph.getCurrentCellStyle(cell);

	    	var value = style[mxConstants.STYLE_IMAGE], shape = style[mxConstants.STYLE_SHAPE];
	    	
			if (!value || shape != 'image')
			{
				return; //Can only process an existing image
			}
			
			var dlg = new CropImageDialog(ui, value, style[mxConstants.STYLE_CLIP_PATH], function(clipPath, width, height)
	    	{
				applyClipPath(cell, clipPath, width, height, graph);
	    	});
	    	
	    	ui.showDialog(dlg.container, 300, 390, true, true);
		}
	}).isEnabled = isGraphEnabled;
	action = this.addAction('layers', mxUtils.bind(this, function()
	{
		if (this.layersWindow == null)
		{
			// LATER: Check outline window for initial placement
			this.layersWindow = new LayersWindow(ui, document.body.offsetWidth - 280, 120, 212, 200);
			this.layersWindow.window.addListener('show', mxUtils.bind(this, function()
			{
				ui.fireEvent(new mxEventObject('layers'));
			}));
			this.layersWindow.window.addListener('hide', function()
			{
				ui.fireEvent(new mxEventObject('layers'));
			});
			this.layersWindow.window.setVisible(true);
			ui.fireEvent(new mxEventObject('layers'));
			
			this.layersWindow.init();
		}
		else
		{
			this.layersWindow.window.setVisible(!this.layersWindow.window.isVisible());
		}
	}), null, null, Editor.ctrlKey + '+Shift+L');
	action.setToggleAction(true);
	action.setSelectedCallback(mxUtils.bind(this, function() { return this.layersWindow != null && this.layersWindow.window.isVisible(); }));
	action = this.addAction('format', mxUtils.bind(this, function()
	{
		ui.toggleFormatPanel();
	}), null, null, Editor.ctrlKey + '+Shift+P');
	action.setToggleAction(true);
	action.setSelectedCallback(mxUtils.bind(this, function() { return ui.isFormatPanelVisible(); }));
	action = this.addAction('outline', mxUtils.bind(this, function()
	{
		if (this.outlineWindow == null)
		{
			// LATER: Check layers window for initial placement
			this.outlineWindow = new OutlineWindow(ui, document.body.offsetWidth - 260, 100, 180, 180);
			this.outlineWindow.window.addListener('show', mxUtils.bind(this, function()
			{
				ui.fireEvent(new mxEventObject('outline'));
			}));
			this.outlineWindow.window.addListener('hide', function()
			{
				ui.fireEvent(new mxEventObject('outline'));
			});
			this.outlineWindow.window.setVisible(true);
			ui.fireEvent(new mxEventObject('outline'));
		}
		else
		{
			this.outlineWindow.window.setVisible(!this.outlineWindow.window.isVisible());
		}
	}), null, null, Editor.ctrlKey + '+Shift+O');
	
	action.setToggleAction(true);
	action.setSelectedCallback(mxUtils.bind(this, function() { return this.outlineWindow != null && this.outlineWindow.window.isVisible(); }));

	this.addAction('editConnectionPoints...', function()
	{
		var cell = graph.getSelectionCell();

		if (graph.isEnabled() && !graph.isCellLocked(graph.getDefaultParent()) && cell != null)
		{
			var dlg = new ConnectionPointsDialog(ui, cell);
	    	ui.showDialog(dlg.container, 350, 450, true, false, function() 
			{
				dlg.destroy();
			});
			dlg.init();
		}
	}, null, null, 'Alt+Shift+Q').isEnabled = isGraphEnabled;
};

/**
 * Registers the given action under the given name.
 */
Actions.prototype.addAction = function(key, funct, enabled, iconCls, shortcut)
{
	var title;
	
	if (key.substring(key.length - 3) == '...')
	{
		key = key.substring(0, key.length - 3);
		title = mxResources.get(key) + '...';
	}
	else
	{
		title = mxResources.get(key);
	}
	
	return this.put(key, new Action(title, funct, enabled, iconCls, shortcut));
};

/**
 * Registers the given action under the given name.
 */
Actions.prototype.put = function(name, action)
{
	this.actions[name] = action;
	
	return action;
};

/**
 * Returns the action for the given name or null if no such action exists.
 */
Actions.prototype.get = function(name)
{
	return this.actions[name];
};

/**
 * Constructs a new action for the given parameters.
 */
function Action(label, funct, enabled, iconCls, shortcut)
{
	mxEventSource.call(this);
	this.label = label;
	this.funct = this.createFunction(funct);
	this.enabled = (enabled != null) ? enabled : true;
	this.iconCls = iconCls;
	this.shortcut = shortcut;
	this.visible = true;
};

// Action inherits from mxEventSource
mxUtils.extend(Action, mxEventSource);

/**
 * Sets the enabled state of the action and fires a stateChanged event.
 */
Action.prototype.createFunction = function(funct)
{
	return funct;
};

/**
 * Sets the enabled state of the action and fires a stateChanged event.
 */
Action.prototype.setEnabled = function(value)
{
	if (this.enabled != value)
	{
		this.enabled = value;
		this.fireEvent(new mxEventObject('stateChanged'));
	}
};

/**
 * Sets the enabled state of the action and fires a stateChanged event.
 */
Action.prototype.isEnabled = function()
{
	return this.enabled;
};

/**
 * Sets the enabled state of the action and fires a stateChanged event.
 */
Action.prototype.setToggleAction = function(value)
{
	this.toggleAction = value;
};

/**
 * Sets the enabled state of the action and fires a stateChanged event.
 */
Action.prototype.setSelectedCallback = function(funct)
{
	this.selectedCallback = funct;
};

/**
 * Sets the enabled state of the action and fires a stateChanged event.
 */
Action.prototype.isSelected = function()
{
	return this.selectedCallback();
};
