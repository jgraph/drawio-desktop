/**
 * Explore plugin.
 */
Draw.loadPlugin(function(editorUi)
{
	// Adds resource for action
	mxResources.parse('animation=Animation...');

	// Adds action
	editorUi.actions.addAction('animation', function()
	{
		if (this.animationWindow == null)
		{
			// LATER: Check outline window for initial placement
			this.animationWindow = new AnimationWindow(editorUi, (document.body.offsetWidth - 480) / 2,
				120, 640, 480);
			this.animationWindow.window.setVisible(true);
		}
		else
		{
			this.animationWindow.window.setVisible(!this.animationWindow.window.isVisible());
		}
	});
	
	var menu = editorUi.menus.get('extras');
	var oldFunct = menu.funct;
	
	menu.funct = function(menu, parent)
	{
		oldFunct.apply(this, arguments);
		
		editorUi.menus.addMenuItems(menu, ['-', 'animation'], parent);
	};

	function animateCells(graph, cells, steps, delay)
	{
		graph.executeAnimations(graph.createWipeAnimations(cells, true), null, steps, delay);
	};
	
	function mapCell(cell, clone, mapping)
	{
		mapping = (mapping != null) ? mapping : new Object();
		mapping[cell.id] = clone;
		
		var childCount = cell.getChildCount();
		
		for (var i = 0; i < childCount; i++)
		{
			mapCell(cell.getChildAt(i), clone.getChildAt(i), mapping);
		}
		
		return mapping;
	};
	
	var allowedToRun = false;
	var running = false;
	
	function stop()
	{
		allowedToRun = false;
	};
	
	function run(graph, steps, loop)
	{
		if (!running)
		{
			allowedToRun = true;
			running = true;

			graph.getModel().beginUpdate();
			try
			{
				for (var id in graph.getModel().cells)
				{
					var cell = graph.getModel().cells[id];
					
					if (graph.getModel().isVertex(cell) || graph.getModel().isEdge(cell))
					{
						graph.setCellStyles('opacity', '0', [cell]);
						graph.setCellStyles('noLabel', '1', [cell]);
					}
				}
			}
			finally
			{
				graph.getModel().endUpdate();
			}
			
			var mapping = mapCell(editorUi.editor.graph.getModel().getRoot(), graph.getModel().getRoot());
			var step = 0;
			
			function next()
			{
				if (allowedToRun && step < steps.length)
				{
					var tokens = steps[step].split(' ');
					
					if (tokens.length > 0)
					{
						if (tokens[0] == 'wait' && tokens.length > 1)
						{
							window.setTimeout(function()
							{
								step++;
								next();
							}, parseFloat(tokens[1]));
						}
						else
						{
							if (tokens.length > 1)
							{
								var cell = mapping[tokens[1]];
								
								if (cell != null)
								{
									if (tokens[0] == 'show')
									{
										graph.setCellStyles('opacity', '100', [cell]);
										graph.setCellStyles('noLabel', null, [cell]);
										
										if (tokens.length > 2 && tokens[2] == 'fade')
										{
											Graph.fadeNodes(graph.getNodesForCells([cell]), 0, 1);
										}
										else
										{
											animateCells(graph, [cell]);
										}
									}
				                    else if (tokens[0] == 'flow')
									{
					                    if (graph.model.isEdge(cell))
					                    {
					                      	toggleFlowAnim(graph, [cell], tokens[2]);
					                    }
									}
									else if (tokens[0] == 'hide')
									{
										Graph.fadeNodes(graph.getNodesForCells([cell]), 1, 0);
									}
								}
								else
								{
									console.log('cell not found', id, steps[step]);
								}
							}
							
							step++;
							next();
						}
					}
				}
				else
				{
					running = false;
					
					if (loop)
					{
						// Workaround for edge animation
						graph.refresh();
						run(graph, steps, loop);
					}
				}
			};
	
			next();
		}
	};
	
	/**
	 * 
	 */
	var AnimationWindow = function(editorUi, x, y, w, h)
	{
		var table = document.createElement('table');
		table.style.width = '100%';
		table.style.height = '100%';
		var tbody = document.createElement('tbody');
		var tr1 = document.createElement('tr');
		var td11 = document.createElement('td');
		td11.style.width = '140px';
		var td12 = document.createElement('td');
		var tr2 = document.createElement('tr');
		tr2.style.height = '40px';
		var td21 = document.createElement('td');
		td21.setAttribute('colspan', '2');
		
		var list = document.createElement('textarea');
		list.style.overflow = 'auto';
		list.style.width = '100%';
		list.style.height = '100%';
		td11.appendChild(list);
		
		var root = editorUi.editor.graph.getModel().getRoot();
		
		if (root.value != null && typeof(root.value) == 'object')
		{
			list.value = root.value.getAttribute('animation');
		}
		
		var container = document.createElement('div');
		container.style.border = '1px solid lightGray';
		container.style.background = '#ffffff';
		container.style.width = '100%';
		container.style.height = '100%';
		container.style.overflow = 'auto';
		
		mxEvent.disableContextMenu(container);
		td12.appendChild(container);
		
		var graph = new Graph(container);
		graph.setEnabled(false);
		graph.setPanning(true);
		graph.foldingEnabled = false;
		graph.panningHandler.ignoreCell = true;
		graph.panningHandler.useLeftButtonForPanning = true;
		graph.minFitScale = null;
		graph.maxFitScale = null;
		graph.centerZoom = true;

	    var buttons = {
	      'Fade In': 'show CELL fade',
	      'Wipe In': 'show CELL',
	      'Fade Out': 'hide CELL',
	      'Flow On': 'flow CELL start',
	      'Flow Off': 'flow CELL stop',
	      'Flow Toggle': 'flow CELL',
	      'Wait': '', // added by default
	    }
	    
	    var bkeys = Object.keys(buttons);
	    
	    for (var i = 0; i < bkeys.length; i++)
	    {
	      var wait = 'wait 1000\n';
	    	  
	      (function(key)
	      {
		      var btn = mxUtils.button(key, function()
		      {
		        // we have a cell object
		        var val = buttons[key]
		        
		        if (val.indexOf('CELL') > -1)
		        {
		          var cells = editorUi.editor.graph.getSelectionCells();
		          
		          if (cells.length > 0)
		          {
		            for (var i = 0; i < cells.length; i++)
		            {
		              var tmp = val.replace('CELL', cells[i].id)
		              list.value += tmp + '\n'
		            }
		            
		            list.value += wait
		          }
		        }
		        else
		        {
		          if (val)
		          {
		            list.value += val + '\n'
		          }
		          
		          list.value += wait
		        }
		
		      });
		      td21.appendChild(btn);
	      })(bkeys[i]);
	    }

		var runBtn = mxUtils.button('Preview', function()
		{
			graph.getModel().clear();
			graph.getModel().setRoot(graph.cloneCells([editorUi.editor.graph.getModel().getRoot()])[0]);
			graph.maxFitScale = 1;
			graph.fit(8);
			graph.center();
			
			run(graph, list.value.split('\n'));
		});
		td21.appendChild(runBtn);
		
		var stopBtn = mxUtils.button('Stop', function()
		{
			graph.getModel().clear();
			stop();
		});
		td21.appendChild(stopBtn);
		
		var applyBtn = mxUtils.button('Apply', function()
		{
			editorUi.editor.graph.setAttributeForCell(root, 'animation', list.value);
		});
		td21.appendChild(applyBtn);
		
		tr1.appendChild(td11);
		tr1.appendChild(td12);
		tbody.appendChild(tr1);
		tr2.appendChild(td21);
		tbody.appendChild(tr2);
		table.appendChild(tbody);

		this.window = new mxWindow('Animation', table, x, y, w, h, true, true);
		this.window.destroyOnClose = false;
		this.window.setMaximizable(false);
		this.window.setResizable(true);
		this.window.setClosable(true);
		this.window.setVisible(true);
	};
	
	// Autostart in chromeless mode
	if (editorUi.editor.isChromelessView())
	{
		function startAnimation()
		{
			var root = editorUi.editor.graph.getModel().getRoot();
			var result = false;
			
			if (root.value != null && typeof(root.value) == 'object')
			{
				var desc = root.value.getAttribute('animation');
				
				if (desc != null)
				{
					run(editorUi.editor.graph, desc.split('\n'), true);
					result = true;
				}
			}
			
			return result;
		};
		
		// Wait for file to be loaded if no animation data is present
		if (!startAnimation())
		{
			editorUi.editor.addListener('fileLoaded', startAnimation);
		}
	}

	// Add flow capability
	function toggleFlowAnim(graph, cells, status)
	{
	    if (!status)
	    {
	      status = 'toggle'
	    }
	    
		for (var i = 0; i < cells.length; i++)
		{
			if (editorUi.editor.graph.model.isEdge(cells[i]))
			{
				var state = graph.view.getState(cells[i]);
				
				if (state && state.shape != null)
				{
					var paths = state.shape.node.getElementsByTagName('path');
					
					if (paths.length > 1)
					{
						if ((status == 'toggle' && paths[1].getAttribute('class') == 'mxEdgeFlow') || status == 'stop')
						{
							paths[1].removeAttribute('class');

							if (mxUtils.getValue(state.style, mxConstants.STYLE_DASHED, '0') != '1')
							{
								paths[1].removeAttribute('stroke-dasharray');
							}
						}
						else if ((status == 'toggle' && paths[1].getAttribute('class') != 'mxEdgeFlow') || status == 'start')
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

  function showCell(graph, cell)
  {
    graph.setCellStyles('opacity', '100', cell);
    graph.setCellStyles('noLabel', null, [cell]);
		nodes = graph.getNodesForCells([cell]);
		if (nodes != null)
    {
			for (var i = 0; i < nodes.length; i++)
      {
        mxUtils.setPrefixedStyle(nodes[i].style, 'transition', null);
        nodes[i].style.opacity = '0';
      }
    }
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