/**
 * Text extraction plugin.
 */
Draw.loadPlugin(function(ui)
{
	var defaultMax = 20;
	var defaultDelay = 2000;
	var graph = ui.editor.graph;

	// Adds resource for action
	mxResources.parse('randomLabel=Random Label...');
	
	// Adds action
	ui.actions.addAction('randomLabel', function()
	{
		var cells = graph.getSelectionCells().slice();
		
		if (cells.length > 0)
		{
			var delay = parseInt(prompt('Delay (ms)', defaultDelay));

			if (!isNaN(delay))
			{
				defaultDelay = delay;
				var max = parseInt(prompt('Cycles', defaultMax));

				if (!isNaN(max))
				{
					defaultMax = max;
					var counter = 0;

					function schedule()
					{
						var jitter = 1 + 0.5 * (Math.random() - 0.5);
						
						window.setTimeout(function()
						{
							for (var i = 0; i < cells.length; i++)
							{
								graph.labelChanged(cells[i], 'Test ' + Math.round(Math.random() * 100));
							}
							
							if (ui.dialog != null)
							{
								console.log('random.js: randomLabel halted');
							}
							else
							{
								if (counter++ < max && ui.dialog == null)
								{
									console.log('random.js: randomLabel', counter);
									schedule();
								}
								else
								{
									console.log('random.js: randomLabel halted');
								}
							}
						}, delay * jitter);
					}
					
					schedule();
				}
			}
		}
		else
		{
			ui.alert(mxResources.get('nothingIsSelected'));
		}
	});
	
	// Adds resource for action
	mxResources.parse('swapChildren=Swap children...');

	// Adds action
	ui.actions.addAction('swapChildren', function()
	{
		var cells = graph.getSelectionCells().slice();
		
		if (cells.length > 1)
		{
			var delay = parseInt(prompt('Delay (ms)', defaultDelay));

			if (!isNaN(delay))
			{
				defaultDelay = delay;
				var max = parseInt(prompt('Cycles', defaultMax));

				if (!isNaN(max))
				{
					defaultMax = max;
					var counter = 0;
					
					function schedule()
					{
						var jitter = 1 + 0.5 * (Math.random() - 0.5);
						
						window.setTimeout(function()
						{
							// assuming parent is the first cell selected
							var parentA = cells[0];
							var parentB = cells[1];
							
							var childrenA = parentA.children;
							var childrenB = parentB.children;
							
							if (childrenA != null && childrenB != null)
							{
								var numberA = childrenA.length;
								var numberB = childrenB.length;

								graph.getModel().beginUpdate();
								try
								{
									// permute children
									var passes = Math.floor(Math.random() * numberA) + 1;
									console.log('random.js: ' + counter + " - swapping " + passes + " children from parent A to parent B");
									
									for (var i = 0; i < passes; i++)
									{
										// which child to select from parent A
										var k = Math.floor(Math.random() * numberA);
										// where to insert it to parent B
										var l = Math.floor(Math.random() * (numberB + 1));
										graph.model.add(parentB, childrenA[k], l);
										
										numberA -= 1;
										numberB += 1;
									}

									var passes = Math.floor(Math.random() * numberB) + 1;
									console.log('random.js: ' + counter + " - swapping " + passes + " children from parent B to parent A");
									
									for (var i = 0; i < passes; i++)
									{
										// which child to select from parent A
										var k = Math.floor(Math.random() * numberB);
										// where to insert it to parent B
										var l = Math.floor(Math.random() * (numberA + 1));
										graph.model.add(parentA, childrenB[k], l);
										numberA += 1;
										numberB -= 1;
									}
								}
								finally
								{
									graph.getModel().endUpdate();
								}
							}
							
							if (ui.dialog != null)
							{
								console.log('random.js: swapChildren halted');
							}
							else
							{
								if (counter++ < max && ui.dialog == null)
								{
									console.log('random.js: swapChildren', counter + '/' + max);
									schedule();
								}
								else
								{
									console.log('random.js: swapChildren halted');
								}
							}
						}, delay * jitter);
					}
					
					schedule();
				}
			}
		}
		else
		{
			ui.alert(mxResources.get('nothingIsSelected'));
		}
	});
	
	// Adds resource for action
	mxResources.parse('placeChildren=Place children...');

	// Adds action
	ui.actions.addAction('placeChildren', function()
	{
		var graph = ui.editor.graph;
		var cells = graph.getSelectionCells().slice();
		
		if (cells.length > 1)
		{

			var counter = 0;
			var delay = parseInt(prompt('Delay (ms)', defaultDelay));
			var max = parseInt(prompt('Cycles', defaultMax));
			
			
			function schedule()
			{
				var jitter = 1 + 0.5 * (Math.random() - 0.5);
				
				window.setTimeout(function()
				{
					// assuming parent is the first cell selected
					var parentA = cells[0];
					var parentB = cells[1];
					
					var childrenA = parentA.children;
					var childrenB = parentB.children;
					
					var numberA = (childrenA != null)? childrenA.length: 0;
					var numberB = (childrenB != null)? childrenB.length: 0;
					
					var n = 0;
					
					if (childrenA != null && childrenA.length > 1 || childrenB != null && childrenB.length > 1)
					{
						graph.getModel().beginUpdate();
						try
						{
							// first, remove a few children from each parent
							childrenA = parentA.children;
							childrenB = parentB.children;
							numberA = (childrenA != null)? childrenA.length: 0;
							numberB = (childrenB != null)? childrenB.length: 0;
							
							// 1st parent
							n = Math.floor(Math.random() * 4); // how many to delete? at least 1 should remain
							n = Math.min(n, Math.max(0, numberA - 2));
							console.log(counter + " - removing " + n + " children from parent A");
							for (var i = 0; i < n;  i++)
							{
								childrenA = parentA.children;
								numberA = (childrenA != null)? childrenA.length: 0;
								if (numberA > 0)
								{
									var k = Math.floor(Math.random() * numberA);
									parentA.remove(k);
								}
							}
							
							// 2nd parent
							n = Math.floor(Math.random() * 4); // how many to delete? at least 1 should remain
							n = Math.min(n, Math.max(0, numberB - 2));
							console.log(counter + " - removing " + n + " children from parent B");
							for (var i = 0; i < n;  i++)
							{
								childrenB = parentB.children;
								numberB = (childrenB != null)? childrenB.length: 0;
								if (numberB > 0)
								{
									var k = Math.floor(Math.random() * numberB);
									parentB.remove(k);
								}
							}
							
							// second, insert a few children to each parent
							childrenA = parentA.children;
							childrenB = parentB.children;
							numberA = (childrenA != null)? childrenA.length: 0;
							numberB = (childrenB != null)? childrenB.length: 0;
							
							// 1st parent
							n = Math.floor(Math.random() * 4); // how many to insert?
							console.log(counter + " - inserting " + n + " children into parent A");
							for (var i = 0; i < n;  i++)
							{
								childrenA = parentA.children;
								numberA = (childrenA != null)? childrenA.length: 0;
								if (numberA > 0)
								{
									var k = Math.floor(Math.random() * numberA);
									var x = Math.floor(Math.random() * 200);
									var y = Math.floor(Math.random() * 50);
									var number = Math.floor(Math.random() * 9000 + 1000);
									var child = graph.insertVertex(parentA, null, number.toString(), x, y, 120, 30);
									parentA.insert(child, k);
								}
							}
							
							// 2nd parent
							n = Math.floor(Math.random() * 4); // how many to insert?
							console.log(counter + " - inserting " + n + " children into parent B");
							for (var i = 0; i < n;  i++)
							{
								childrenB = parentB.children;
								numberB = (childrenB != null)? childrenB.length: 0;
								if (numberB > 0)
								{
									var k = Math.floor(Math.random() * numberB);
									var x = Math.floor(Math.random() * 200);
									var y = Math.floor(Math.random() * 50);
									var number = Math.floor(Math.random() * 9000 + 1000);
									var child = graph.insertVertex(parentB, null, number.toString(), x, y, 120, 30);
									parentB.insert(child, k);
								}
							}
							
							// third, shuffle children in each parent
							childrenA = parentA.children;
							childrenB = parentB.children;
							numberA = (childrenA != null)? childrenA.length: 0;
							numberB = (childrenB != null)? childrenB.length: 0;
							
							// 1st parent
							n = Math.floor(Math.random() * numberA); // how many to shuffle?
							console.log(counter + " - moving " + n + " children inside parent A");
							for (var i = 0; i < n;  i++)
							{
								childrenA = parentA.children;
								numberA = (childrenA != null)? childrenA.length: 0;
								if (numberA > 0)
								{
									var k = Math.floor(Math.random() * numberA);  // from index
									var l = Math.floor(Math.random() * numberA);  // to index
									var child = parentA.getChildAt(k);
									parentA.insert(child, l);
								}
							}
							
							// 2nd parent
							n = Math.floor(Math.random() * numberB); // how many to shuffle?
							console.log(counter + " - moving " + n + " children inside parent B");
							for (var i = 0; i < n;  i++)
							{
								childrenB = parentB.children;
								numberB = (childrenB != null)? childrenB.length: 0;
								if (numberB > 0)
								{
									var k = Math.floor(Math.random() * numberB);  // from index
									var l = Math.floor(Math.random() * numberB);  // to index
									var child = parentB.getChildAt(k);
									parentB.insert(child, l);
								}
							}
							
							// fourth, exchange a few children between both parents
							childrenA = parentA.children;
							childrenB = parentB.children;
							numberA = (childrenA != null)? childrenA.length: 0;
							numberB = (childrenB != null)? childrenB.length: 0;
							
							// permute children
							var passes = Math.floor(Math.random() * numberA) + 1;
							console.log(counter + " - swapping " + passes + " children from parent A to parent B");
							
							for (var i = 0; i < passes; i++)
							{
								// which child to select from parent A
								var k = Math.floor(Math.random() * numberA);
								// where to insert it to parent B
								var l = Math.floor(Math.random() * (numberB + 1));
								graph.model.add(parentB, childrenA[k], l);
								
								numberA -= 1;
								numberB += 1;
							}

							var passes = Math.floor(Math.random() * numberB) + 1;
							console.log(counter + " - swapping " + passes + " children from parent B to parent A");
							
							for (var i = 0; i < passes; i++)
							{
								// which child to select from parent A
								var k = Math.floor(Math.random() * numberB);
								// where to insert it to parent B
								var l = Math.floor(Math.random() * (numberA + 1));
								graph.model.add(parentA, childrenB[k], l);
								numberA += 1;
								numberB -= 1;
							}
						}
						finally
						{
							graph.getModel().endUpdate();
						}
					}

					if (ui.dialog != null)
					{
						console.log('placeChildren halted');
					}
					else
					{
						if (counter++ < max && ui.dialog == null)
						{
							console.log('placeChildren', counter);
							schedule();
						}
						else
						{
							console.log('placeChildren halted');
						}
					}
				}, delay * jitter);
			}
			
			schedule();
		}
		else
		{
			ui.alert(mxResources.get('nothingIsSelected'));
		}
	});
	
	// Adds resource for action
	mxResources.parse('reorderChildren=Reorder children...');

	// Adds action
	ui.actions.addAction('reorderChildren', function()
	{
		var cells = graph.getSelectionCells().slice();
		
		if (cells.length > 0)
		{
			var delay = parseInt(prompt('Delay (ms)', defaultDelay));

			if (!isNaN(delay))
			{
				defaultDelay = delay;
				var max = parseInt(prompt('Cycles', defaultMax));

				if (!isNaN(max))
				{
					defaultMax = max;
					var counter = 0;
					
					function schedule()
					{
						var jitter = 1 + 0.3 * (Math.random() - 0.5);
						
						window.setTimeout(function()
						{
							graph.getModel().beginUpdate();
							try
							{
								// assuming parent is the first cell selected
								for (var i = 0; i < cells.length; i++)
								{
									var parent = cells[i];
									var children = parent.children;

									if (children != null && children.length > 1)
									{
										// permute children
										var number = children.length;

										var passes = Math.floor(Math.random() * number) + 1;
										console.log('random.js: ' + counter + " - reordering in " + passes + " passes");
										
										for (var j = 0; j < passes; j++)
										{
											var k = Math.floor(Math.random() * number);
											graph.orderCells(true, [children[k]]);
										}
									}
								}
							}
							finally
							{
								graph.getModel().endUpdate();
							}
							
							if (ui.dialog != null)
							{
								console.log('random.js: reorderChildren halted');
							}
							else
							{
								if (counter++ < max && ui.dialog == null)
								{
									console.log('random.js: reorderChildren', counter + '/' + max);
									schedule();
								}
								else
								{
									console.log('random.js: reorderChildren halted');
								}
							}
						}, delay * jitter);
					}
					
					schedule();
				}
			}
		}
		else
		{
			ui.alert(mxResources.get('nothingIsSelected'));
		}
	});
	
	var menu = ui.menus.get((urlParams['test'] == '1') ?
		'testDevelop' : 'extras');
	var oldFunct = menu.funct;
	
	menu.funct = function(menu, parent)
	{
		oldFunct.apply(this, arguments);
		
		ui.menus.addMenuItems(menu, ['-', 'randomLabel', 'reorderChildren', 'swapChildren', 'placeChildren'], parent);
	};
});
