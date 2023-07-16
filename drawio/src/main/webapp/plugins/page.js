/**
 * Text extraction plugin.
 */
Draw.loadPlugin(function(ui)
{
	// Adds resource for action
	mxResources.parse('page=Reorder pages...');

	// Adds action
	ui.actions.addAction('page', function()
	{
		var graph = ui.editor.graph;
		var pages = ui.pages;
		
		if (pages.length > 1)
		{

			var counter = 0;
			var max = parseInt(prompt('Cycles', '100'));
			
			function schedule()
			{
				var jitter = 1 + 0.3 * (Math.random() - 0.5);
				
				window.setTimeout(function()
				{
					graph.getModel().beginUpdate();
					try
					{
						// permute pages
						var number = pages.length;

						var passes = Math.floor(Math.random() * number) + 1;
						console.log(counter + " - page reordering in " + passes + " passes");
						
						for (var i = 0; i < passes; i++)
						{
							var k = Math.floor(Math.random() * number);
							var l = Math.floor(Math.random() * number);
							ui.movePage(k, l);
						}
					}
					finally
					{
						graph.getModel().endUpdate();
					}

					if (counter++ < max && ui.dialog == null)
					{
						schedule();
					}
				}, 15000 * jitter);
			}
			
			schedule();
		}
		else
		{
			ui.alert(mxResources.get('nothingIsSelected'));
		}
	});
	
	// Adds resource for action
	mxResources.parse('place=Place pages...');

	// Adds action
	ui.actions.addAction('place', function()
	{
		var graph = ui.editor.graph;
		var pages = ui.pages;
		
		if (pages.length > 1)
		{

			var counter = 0;
			var max = parseInt(prompt('Cycles', '100'));
			
			function schedule()
			{
				var jitter = 1 + 0.3 * (Math.random() - 0.5);
				
				window.setTimeout(function()
				{
					graph.getModel().beginUpdate();
					try
					{
						// first insert some pages (at most 3 at a time)
						var n = Math.floor(Math.random() * 4); // how many to insert?
						console.log(counter + " - inserting " + n + " pages");
						for (var i = 0; i < n; i++)
						{
							var k = Math.floor(Math.random() * 4000);
							var page = ui.createPage("Page " + k);
							var change = new ChangePage(ui, page, page, ui.pages.length);
							graph.model.execute(change);
						}
						
						// next delete some pages (at most 3 at a time)
						n = Math.floor(Math.random() * 4); // how many to delete? at least 1 should remain
						n = Math.min(n, ui.pages.length - 1);
						console.log(counter + " - removing " + n + " pages");
						for (var i = 0; i < n; i++)
						{
							var number = ui.pages.length;
							var k = Math.floor(Math.random() * number); // which one to delete?
							ui.removePage(ui.pages[k]);
						}
						
						// permute remaining pages
						pages = ui.pages;
						var number = pages.length;

						var passes = Math.floor(Math.random() * number) + 1;
						console.log(counter + " - moving " + passes + " pages");
						
						for (var i = 0; i < passes; i++)
						{
							var k = Math.floor(Math.random() * number);
							var l = Math.floor(Math.random() * number);
							ui.movePage(k, l);
						}
					}
					finally
					{
						graph.getModel().endUpdate();
					}

					if (counter++ < max && ui.dialog == null)
					{
						schedule();
					}
				}, 15000 * jitter);
			}
			
			schedule();
		}
		else
		{
			ui.alert(mxResources.get('nothingIsSelected'));
		}
	});
	
	var menu = ui.menus.get('extras');
	var oldFunct = menu.funct;
	
	menu.funct = function(menu, parent)
	{
		oldFunct.apply(this, arguments);
		
		ui.menus.addMenuItems(menu, ['-', 'page', 'place'], parent);
	};
});
