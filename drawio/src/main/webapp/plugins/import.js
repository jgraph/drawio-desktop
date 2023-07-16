/**
 * Plugin for Freemind import.
 * See https://github.com/jiangxin/freemind-mmx/tree/master/freemind
 */
Draw.loadPlugin(function(ui)
{
	var graph = ui.editor.graph;

	// Adds resource for action
	mxResources.parse('importFreemind=Freemind');

	// Parses Freemind data
	function importFreemindData(data)
	{
		// Gets the default parent for inserting new cells. This
		// is normally the first child of the root (ie. layer 0).
		var defaultParent = graph.getDefaultParent();
		var cells = [];

		var defaultWidth = 80;
		var defaultHeight = 30;
		var mainConceptHeight = 40;
		var defaultHorizontalSpaceBetweenVertex = 40;
		var defaultVerticalSpaceBetweenVertex = 10;

		var freeMindMainConceptVertexStyle = 'ellipse;whiteSpace=wrap;html=1;align=center;collapsible=0;container=1;recursiveResize=0;';
		var freeMindBranchVertexStyle = 'whiteSpace=wrap;html=1;shape=partialRectangle;top=0;left=0;bottom=1;right=0;points=[[0,1],[1,1]];strokeColor=#000000;fillColor=none;align=center;verticalAlign=bottom;routingCenterY=0.5;snapToPoint=1;collapsible=0;container=1;recursiveResize=0;autosize=1;';
		var freeMindConceptVertexStyle = 'whiteSpace=wrap;html=1;rounded=1;arcSize=50;align=center;verticalAlign=middle;collapsible=0;container=1;recursiveResize=0;strokeWidth=1;autosize=1;spacing=4;';
		var freeMindEdgeStyle = 'edgeStyle=entityRelationEdgeStyle;startArrow=none;endArrow=none;segment=10;curved=1;html=1;';

		// Tells whether or not a node has child ideas
		var hasChilds = function(node)
		{
			for (var i = 0; i < node.childNodes.length; i++)
			{
				if (node.childNodes[i].nodeName == 'node')
				{
					return true;
				}
			}
			
			return false;
		};

		// Generates useful info on the nodes to be used later.
		var generatePreprocessingNodeInfo = function(node)
		{
			var childCount = 0;
			var maxChildsInHierarchy = 0;
			
			for (var i = 0; i < node.childNodes.length; i++)
			{
				var childNode = node.childNodes[i];
				
				if (childNode.nodeName == 'node')
				{
					var maxChilds = generatePreprocessingNodeInfo(childNode);
					maxChildsInHierarchy = Math.max(maxChildsInHierarchy, maxChilds);
					childCount++;
				}
			}
			
			node.childCount = childCount;
			node.maxChilds = Math.max(childCount, maxChildsInHierarchy);
			return childCount;
		}

		// Main node generation funcion (recursive)
		var processFreeMindNode = function(node, nodeParent, x, y)
		{
			var mainConcept = false;
			var vertexStyle = freeMindBranchVertexStyle;
			
			if (nodeParent == defaultParent)
			{
				mainConcept = true;
				vertexStyle = freeMindMainConceptVertexStyle;
			}
			else if (hasChilds(node))
			{
				// Concept, style appropiately
				vertexStyle = freeMindConceptVertexStyle;
			}
			
			var nodeName = node.getAttribute('TEXT') || '';
			var nodeVertex = graph.insertVertex(defaultParent, null, nodeName, x, y, defaultWidth,
					defaultHeight, vertexStyle);
			graph.cellLabelChanged(nodeVertex, nodeName, true);
			
			if (mainConcept)
			{
				nodeVertex.geometry.height = mainConceptHeight; // TODO: Maybe set height according to it's width, so it's rounded?
			}
			
			if (nodeParent != defaultParent)
			{
				// Don't generate an edge for the first node
				graph.insertEdge(defaultParent, null, '', nodeParent, nodeVertex, freeMindEdgeStyle);
			}
			
			cells.push(nodeVertex);
			// Insert child nodes, on correct positions
			var childNumber = 0;
			
			for (var i = 0; i < node.childNodes.length; i++)
			{
				var childNode = node.childNodes[i];
				
				if (childNode.nodeName == 'node')
				{
					var childX = x + nodeVertex.geometry.width + defaultHorizontalSpaceBetweenVertex;
					var childY = y + (defaultHeight + defaultVerticalSpaceBetweenVertex) * childNumber;
					childNumber += childNode.maxChilds == 0 ? 1 : childNode.maxChilds;
					processFreeMindNode(childNode, nodeVertex, childX, childY);
				}
			}
		}

		// Makes the import one undoable edit
		graph.getModel().beginUpdate();
		try
		{
			// Gets point for free space in the graph for insert
			var pt = graph.getFreeInsertPoint();
			var freeMindDOM = mxUtils.parseXml(data);
			var freeMindDOMchilds = freeMindDOM.children[0];

			// Transverse the childs, and generate relevant input 
			for (var i = 0; i < freeMindDOMchilds.childNodes.length; i++)
			{
				if (freeMindDOMchilds.childNodes[i].nodeName == 'node')
				{
					generatePreprocessingNodeInfo(freeMindDOMchilds.childNodes[i]);
				}
			}
			
			// Generate the nodes
			for (var i = 0; i < freeMindDOMchilds.childNodes.length; i++)
			{
				if (freeMindDOMchilds.childNodes[i].nodeName == 'node')
				{
					processFreeMindNode(freeMindDOMchilds.childNodes[i], defaultParent, pt.x, pt.y);
				}
			}

			// Applies current styles to new cells (might not be needed)
			graph.fireEvent(new mxEventObject('cellsInserted', 'cells', cells));
		}
		finally
		{
			graph.getModel().endUpdate();
		}

		// Selects new cells and scrolls into view
		graph.setSelectionCells(cells);
		graph.scrollCellToVisible(graph.getSelectionCell());
	};

	// Adds action
	ui.actions.addAction('importFreemind...', function()
	{
		// Only modern browsers for now. We'll move the import
		// code above to the main codebase later
		if (Graph.fileSupport)
		{
			if (ui.impFMFileInputElt == null) 
			{
				var input = document.createElement('input');
				input.setAttribute('type', 'file');
	
				mxEvent.addListener(input, 'change', function()
				{
					if (input.files != null)
					{
						// Only one file for now...
						var reader = new FileReader();
	
						reader.onload = function(e)
						{
							importFreemindData(e.target.result);
						};
	
						reader.readAsText(input.files[0]);
						
			    		// Resets input to force change event for same file (type reset required for IE)
						input.type = '';
						input.type = 'file';
			    		input.value = '';
					}
				});
				
				input.style.display = 'none';
				document.body.appendChild(input);
				ui.impFMFileInputElt = input;
			}
			
			ui.impFMFileInputElt.click();
		}
	});

	// Adds menu
	ui.menubar.addMenu('Import', function(menu, parent)
	{
		ui.menus.addMenuItem(menu, 'importFreemind');
	});

	// Moves import menu to before help menu
	ui.menubar.container.insertBefore(ui.menubar.container.lastChild,
			ui.menubar.container.lastChild.previousSibling.previousSibling.previousSibling);
});
