/**
 * Copyright (c) 2019-2020, JGraph Ltd
 */
/**
 * Class: mxOrgChartLayout
 * 
 * Extends <mxGraphLayout> to implement organization chart layout algorithm.
 * The vertices need to be connected for this layout to work, vertices
 * with no connections are ignored.
 * 
 * Example:
 * 
 * (code)
 * var layout = new mxOrgChartLayout(graph);
 * layout.execute(graph.getDefaultParent());
 * (end)
 * 
 */
function mxOrgChartLayout(graph, branchOptimizer, parentChildSpacing, siblingSpacing)
{
	mxGraphLayout.call(this, graph);
	this.correctY = false;
	
	switch(parseInt(branchOptimizer))
	{
		case 0:
			this.branchOptimizer = mxOrgChartLayout.prototype.BRANCH_OPT_LINEAR;
			this.correctY = true;
			break;
		case 1:
			this.branchOptimizer = mxOrgChartLayout.prototype.BRANCH_OPT_HANGER2;
			this.correctY = true;
			break;
		case 3:
			this.branchOptimizer = mxOrgChartLayout.prototype.BRANCH_OPT_FISHBONE1;
			break;
		case 4:
			this.branchOptimizer = mxOrgChartLayout.prototype.BRANCH_OPT_FISHBONE2;
			break;
		case 5:
			this.branchOptimizer = mxOrgChartLayout.prototype.BRANCH_OPT_1COLUMN_L;
			break;
		case 6:
			this.branchOptimizer = mxOrgChartLayout.prototype.BRANCH_OPT_1COLUMN_R;
			break;
		case 7:
			this.branchOptimizer = mxOrgChartLayout.prototype.BRANCH_OPT_SMART;
			break;
		default: //and case 2
			this.branchOptimizer = mxOrgChartLayout.prototype.BRANCH_OPT_HANGER4;
			this.correctY = true;
	}
	
	this.parentChildSpacing = parentChildSpacing > 0 ? parentChildSpacing : 20;
	this.siblingSpacing = siblingSpacing > 0 ? siblingSpacing : 20;
};

/**
 * Extends mxGraphLayout.
 */
mxOrgChartLayout.prototype = new mxGraphLayout();
mxOrgChartLayout.prototype.constructor = mxOrgChartLayout;

//Branch Optimizers
mxOrgChartLayout.prototype.BRANCH_OPT_LINEAR = 'branchOptimizerAllLinear';
mxOrgChartLayout.prototype.BRANCH_OPT_HANGER2 = 'branchOptimizerAllHanger2';
mxOrgChartLayout.prototype.BRANCH_OPT_HANGER4 = 'branchOptimizerAllHanger4';
mxOrgChartLayout.prototype.BRANCH_OPT_FISHBONE1 = 'branchOptimizerAllFishbone1';
mxOrgChartLayout.prototype.BRANCH_OPT_FISHBONE2 = 'branchOptimizerAllFishbone2';
mxOrgChartLayout.prototype.BRANCH_OPT_1COLUMN_L = 'branchOptimizerAllSingleColumnLeft';
mxOrgChartLayout.prototype.BRANCH_OPT_1COLUMN_R = 'branchOptimizerAllSingleColumnRight';
mxOrgChartLayout.prototype.BRANCH_OPT_SMART = 'branchOptimizerSmart';

/**
 * Function: execute
 * 
 * Implements <mxGraphLayout.execute>. This operates on all children of the
 * given parent.
 */
mxOrgChartLayout.prototype.execute = function(parent)
{
	this.graph.model.beginUpdate();
	try
	{
		RPOrgChart.main(this.graph, parent, this.branchOptimizer, this.parentChildSpacing, this.siblingSpacing, this.correctY);		
	}
	finally
	{
		this.graph.model.endUpdate();
	}
}

Bridge.define('RPOrgChart',
{
    statics: {
        config: {
            init: function() {

            }
        },
        main: function (graph, parent, branchOptimizer, parentChildSpacing, siblingSpacing, correctY) {
            Bridge.Console.log = console.log;
            Bridge.Console.error = console.error;
            Bridge.Console.debug = console.debug;

            RPOrgChart.graph = graph;
            RPOrgChart.parent = parent;
			RPOrgChart.dx = 0;
			RPOrgChart.dy = 0;
			
			if (parent.style == 'group' && parent.geometry)
			{
				RPOrgChart.dx = parent.geometry.x;
				RPOrgChart.dy = parent.geometry.y;
			}
			
            RPOrgChart.branchOptimizer = branchOptimizer;
			RPOrgChart.correctY = correctY;
            RPOrgChart.parentChildSpacing = parseInt(parentChildSpacing);
            RPOrgChart.siblingSpacing = parseInt(siblingSpacing);
            RPOrgChart.buildChart(true);
        },

        diagram: {},
        dataSource: {},

        buildChart: function (initData) {
            if (initData) {
                RPOrgChart.initDiagram();
            }
            RPOrgChart.positionBoxes();
        },

        collapseAllBoxes: function(boxContainer, isCollapsed) {
            var en = boxContainer.getBoxesById().getValues().getEnumerator();
            while (en.moveNext()) {
                var box = en.getCurrent();
                if (!box.IsSpecial) {
                    box.IsCollapsed = isCollapsed;
                }
            }
        },

        generateData: function () 
        {
        	var dataSource = new OrgChart.Test.TestDataSource();
        	
            var graph = RPOrgChart.graph;
            var cells = graph.getChildVertices(RPOrgChart.parent);
            
            for (var i = 0; i < cells.length; i++)
        	{
            	var cell = cells[i];
            	
            	if (cell.geometry != null && cell.vertex && cell.parent == RPOrgChart.parent) //Vertices and first level children only
            	{
            		// Find cell parent. If it has more than one parent, take first parent (should be an error?)
            		var parentId = null;
            		
            		var incomingEdge = graph.getIncomingEdges(cell)[0];
            		
            		if (incomingEdge != null && incomingEdge.source != null)
           			{
            			parentId = incomingEdge.source.id;
           			}
            		
            		var item = new OrgChart.Test.TestDataItem();
            		item.Id = cell.id;
            		item.ParentId = parentId;
            		dataSource.Items.add(item.getId(), item);
            	}
           	}
            
            return dataSource;
        },

        initDiagram: function () {
            var dataSource = RPOrgChart.generateData();

            RPOrgChart.dataSource = dataSource;

            var boxContainer = new OrgChart.Layout.BoxContainer.$ctor1(dataSource);
            RPOrgChart.diagram = new OrgChart.Layout.Diagram();

            var diagram = RPOrgChart.diagram;
            diagram.setBoxes(boxContainer);

            var linearLayoutStrategy = new OrgChart.Layout.LinearLayoutStrategy();
            linearLayoutStrategy.ParentAlignment = OrgChart.Layout.BranchParentAlignment.Center;
            linearLayoutStrategy.ParentChildSpacing = RPOrgChart.parentChildSpacing;
            linearLayoutStrategy.SiblingSpacing = RPOrgChart.siblingSpacing;
            diagram.LayoutSettings.LayoutStrategies.add("linear", linearLayoutStrategy);

            var multiLineHangerLayoutStrategy = new OrgChart.Layout.MultiLineHangerLayoutStrategy();
            multiLineHangerLayoutStrategy.ParentAlignment = OrgChart.Layout.BranchParentAlignment.Center;
            multiLineHangerLayoutStrategy.MaxSiblingsPerRow = 2;
            multiLineHangerLayoutStrategy.ParentChildSpacing = RPOrgChart.parentChildSpacing;
            multiLineHangerLayoutStrategy.SiblingSpacing = RPOrgChart.siblingSpacing;
            diagram.LayoutSettings.LayoutStrategies.add("hanger2", multiLineHangerLayoutStrategy);

            multiLineHangerLayoutStrategy = new OrgChart.Layout.MultiLineHangerLayoutStrategy();
            multiLineHangerLayoutStrategy.ParentAlignment = OrgChart.Layout.BranchParentAlignment.Center;
            multiLineHangerLayoutStrategy.MaxSiblingsPerRow = 4;
            multiLineHangerLayoutStrategy.ParentChildSpacing = RPOrgChart.parentChildSpacing;
            multiLineHangerLayoutStrategy.SiblingSpacing = RPOrgChart.siblingSpacing;
            diagram.LayoutSettings.LayoutStrategies.add("hanger4", multiLineHangerLayoutStrategy);

            var singleColumnLayoutStrategy = new OrgChart.Layout.SingleColumnLayoutStrategy();
            singleColumnLayoutStrategy.ParentAlignment = OrgChart.Layout.BranchParentAlignment.Right;
            singleColumnLayoutStrategy.ParentChildSpacing = RPOrgChart.parentChildSpacing;
            singleColumnLayoutStrategy.SiblingSpacing = RPOrgChart.siblingSpacing;
            diagram.LayoutSettings.LayoutStrategies.add("singleColumnRight", singleColumnLayoutStrategy);

            singleColumnLayoutStrategy = new OrgChart.Layout.SingleColumnLayoutStrategy();
            singleColumnLayoutStrategy.ParentAlignment = OrgChart.Layout.BranchParentAlignment.Left;
            singleColumnLayoutStrategy.ParentChildSpacing = RPOrgChart.parentChildSpacing;
            singleColumnLayoutStrategy.SiblingSpacing = RPOrgChart.siblingSpacing;
            diagram.LayoutSettings.LayoutStrategies.add("singleColumnLeft", singleColumnLayoutStrategy);

            var fishboneLayoutStrategy = new OrgChart.Layout.MultiLineFishboneLayoutStrategy();
            fishboneLayoutStrategy.ParentAlignment = OrgChart.Layout.BranchParentAlignment.Center;
            fishboneLayoutStrategy.MaxGroups = 1;
            fishboneLayoutStrategy.ParentChildSpacing = RPOrgChart.parentChildSpacing;
            fishboneLayoutStrategy.SiblingSpacing = RPOrgChart.siblingSpacing;
            diagram.LayoutSettings.LayoutStrategies.add("fishbone1", fishboneLayoutStrategy);

            fishboneLayoutStrategy = new OrgChart.Layout.MultiLineFishboneLayoutStrategy();
            fishboneLayoutStrategy.ParentAlignment = OrgChart.Layout.BranchParentAlignment.Center;
            fishboneLayoutStrategy.MaxGroups = 2;
            fishboneLayoutStrategy.ParentChildSpacing = RPOrgChart.parentChildSpacing;
            fishboneLayoutStrategy.SiblingSpacing = RPOrgChart.siblingSpacing;
            diagram.LayoutSettings.LayoutStrategies.add("fishbone2", fishboneLayoutStrategy);

            var hstackLayoutStrategy = new OrgChart.Layout.StackingLayoutStrategy();
            hstackLayoutStrategy.ParentAlignment = OrgChart.Layout.BranchParentAlignment.InvalidValue;
            hstackLayoutStrategy.Orientation = OrgChart.Layout.StackOrientation.SingleRowHorizontal;
            hstackLayoutStrategy.ParentChildSpacing = RPOrgChart.parentChildSpacing;
            hstackLayoutStrategy.SiblingSpacing = RPOrgChart.siblingSpacing;
            diagram.LayoutSettings.LayoutStrategies.add("hstack", hstackLayoutStrategy);

            var vstackLayoutStrategy = new OrgChart.Layout.StackingLayoutStrategy();
            vstackLayoutStrategy.ParentAlignment = OrgChart.Layout.BranchParentAlignment.InvalidValue;
            vstackLayoutStrategy.Orientation = OrgChart.Layout.StackOrientation.SingleColumnVertical;
            vstackLayoutStrategy.ParentChildSpacing = RPOrgChart.parentChildSpacing;
            vstackLayoutStrategy.SiblingSpacing = RPOrgChart.siblingSpacing;
            diagram.LayoutSettings.LayoutStrategies.add("vstack", vstackLayoutStrategy);

            vstackLayoutStrategy = new OrgChart.Layout.StackingLayoutStrategy();
            vstackLayoutStrategy.ParentAlignment = OrgChart.Layout.BranchParentAlignment.InvalidValue;
            vstackLayoutStrategy.Orientation = OrgChart.Layout.StackOrientation.SingleColumnVertical;
            vstackLayoutStrategy.ParentChildSpacing = RPOrgChart.parentChildSpacing;
            vstackLayoutStrategy.SiblingSpacing = RPOrgChart.siblingSpacing;
            diagram.LayoutSettings.LayoutStrategies.add("vstackMiddle", vstackLayoutStrategy);

            vstackLayoutStrategy = new OrgChart.Layout.StackingLayoutStrategy();
            vstackLayoutStrategy.ParentAlignment = OrgChart.Layout.BranchParentAlignment.InvalidValue;
            vstackLayoutStrategy.Orientation = OrgChart.Layout.StackOrientation.SingleColumnVertical;
            vstackLayoutStrategy.ParentChildSpacing = RPOrgChart.parentChildSpacing;
            vstackLayoutStrategy.SiblingSpacing = RPOrgChart.siblingSpacing;
            diagram.LayoutSettings.LayoutStrategies.add("vstackTop", vstackLayoutStrategy);

            var assistantsLayoutStrategy = new OrgChart.Layout.FishboneAssistantsLayoutStrategy();
            assistantsLayoutStrategy.ParentAlignment = OrgChart.Layout.BranchParentAlignment.Center;
            assistantsLayoutStrategy.ParentChildSpacing = RPOrgChart.parentChildSpacing;
            assistantsLayoutStrategy.SiblingSpacing = RPOrgChart.siblingSpacing;
            diagram.LayoutSettings.LayoutStrategies.add("assistants", assistantsLayoutStrategy);

            diagram.LayoutSettings.DefaultLayoutStrategyId = "vstack";
            diagram.LayoutSettings.DefaultAssistantLayoutStrategyId = "assistants";
            //diagram.LayoutSettings.setBranchSpacing(5);
        },

        getBoxLevel: function(boxContainer, box) {
            var level = 0;
            var obj = {};
            while (box.ParentId > 0) {
                if (!boxContainer.getBoxesById().tryGetValue(box.ParentId, obj)) {
                    break;
                }
                box = obj.v;
                level++;
            }

            return level;
        },

        onLayoutStateChanged: function (sender, args) {
            if (args.State.getCurrentOperation() === OrgChart.Layout.LayoutState.Operation.PreprocessVisualTree) {
                // When layout algorithm is ready to preprocess the tree,
                // we need to have box sizes ready -> hence have to render visible boxes in HTML.
                // Rendering can happen at earlier time, but it's just more convenient to do it here,
                // to utilize some readily available information about visual tree.
                RPOrgChart.renderBoxes();
            }
        },
        
        renderBoxes: function () {
            var visitorFunc = function (node) {
                var box = node.Element;

                if (box.getIsDataBound()) {
                    // we're being run when nodes have already been marked as visible or hidden,
                    // based on IsCollapsed attribute of each Box
                    // so use this knowledge to prevent unnecessary rendering of invisible branches
                    if (node.State.IsHidden) {
                        return true;
                    }

                    box.Size = RPOrgChart.getBoxElementSize(box.DataId);
                }

                return true;
            }

            RPOrgChart.diagram.getVisualTree().IterateParentFirst(visitorFunc);
        },

        getBranchOptimizerFunc: function () {
            return RPOrgChart[RPOrgChart.branchOptimizer];
        },

        branchOptimizerAllLinear: function(node) {
            return node.getIsAssistantRoot() ? null : "linear";
        },
        
        branchOptimizerAllHanger2: function(node) {
            return node.getIsAssistantRoot() ? null : "hanger2";
        },
        
        branchOptimizerAllHanger4: function(node) {
            return node.getIsAssistantRoot() ? null : "hanger4";
        },
        
        branchOptimizerAllFishbone1: function(node) {
            return node.getIsAssistantRoot() ? null : "fishbone1";
        },

        branchOptimizerAllFishbone2: function (node) {
            return node.getIsAssistantRoot() ? null : "fishbone2";
        },

        branchOptimizerAllSingleColumnLeft: function (node) {
            return node.getIsAssistantRoot() ? null : "singleColumnRight";
        },

        branchOptimizerAllSingleColumnRight: function (node) {
            return node.getIsAssistantRoot() ? null : "singleColumnLeft";
        },

        branchOptimizerStackers: function(node) {
            if (node.getIsAssistantRoot()) {
                return null;
            }
            return node.Level === 0 // this is Node for boxContainer.SystemRoot, which is not visible itself
                ? "vstackTop"
                : node.Level === 1 // this is children of SystemRoot - they appear as roots in the diagram
                ? "vstackMiddle"
                : "hstack";

        },

        branchOptimizerSmart: function(node) {
            if (node.getIsAssistantRoot()) {
                return null;
            }

            var childCount = node.getChildCount();

            if (childCount <= 1) {
                return "vstack";
            }

            var nonLeafChildren = 0;
            for (var i = 0; i < childCount; i++) {
                if (node.Children.getItem(i).getChildCount() > 0) {
                    nonLeafChildren++;
                }
            }

            if (nonLeafChildren <= 1) {
                if (childCount <= 4) {
                    return "vstack";
                }
                if (childCount <= 8) {
                    return "fishbone1";
                }
                return "fishbone2";
            }

            return "hanger4";
        },

        boxSizeFunc: function (dataId) {
            // ChartLayoutAlgorithm requires this function to accept data ID
            // so have to convert it to Box ID first, to get rendered visual element
            var boxId = RPOrgChart.diagram.getBoxes().getBoxesByDataId().getItem(dataId).Id;
            return RPOrgChart.diagram.getBoxes().getBoxesById().getItem(boxId).Size;
        },

        getBoxElementSize: function (boxId) {
    		var geo = RPOrgChart.graph.model.cells[boxId].geometry;
    		return new OrgChart.Layout.Size.$ctor1(geo.width, geo.height);
        },

        positionBoxes: function () {
            var diagram = RPOrgChart.diagram;

            var state = new OrgChart.Layout.LayoutState(diagram);

            state.addOperationChanged(RPOrgChart.onLayoutStateChanged);
            state.BoxSizeFunc = Bridge.fn.bind(this, RPOrgChart.boxSizeFunc, null, true);
            state.LayoutOptimizerFunc = Bridge.fn.bind(this, RPOrgChart.getBranchOptimizerFunc(), null, true);

            OrgChart.Layout.LayoutAlgorithm.Apply(state);

            var diagramBoundary = OrgChart.Layout.LayoutAlgorithm.ComputeBranchVisualBoundingRect(diagram.getVisualTree());

			var offsetx = -diagramBoundary.getLeft() + diagramBoundary.getTop();

			var graph = RPOrgChart.graph;
            var cells = graph.model.cells;
			var pointsList = [];
            
            var visitorVertexFunc = function (node) 
            {
                if (node.State.IsHidden) {
                    return false;
                }

                var box = node.Element;

                if (box.getIsDataBound()) {
                    var cell = cells[box.DataId];
                    var geo = cell.geometry.clone();
                    geo.x = node.State.TopLeft.X + offsetx;
                    geo.y = node.State.TopLeft.Y;
                    graph.model.setGeometry(cell, geo);
                }
                
                return true;
            }
            
            var visitorEdgeFunc = function (node) 
            {
				//The algorithm default is 5 px only above the node, this centers it
				var yCorrection = RPOrgChart.correctY? Math.min(0, -(RPOrgChart.parentChildSpacing / 2) + 5) : 0;
                // Render connectors
                if (node.State.Connector != null) {
                	
                    var cell = cells[node.Element.DataId];
                         
                	var outgoingEdge = graph.getOutgoingEdges(cell);

                	var uniquePoints = {};
                	
                	//Sort segments points from top to bottom or left to right + add offset
                	for (var ix = 0; ix < node.State.Connector.Segments.length; ix++) 
                    {
                		var edge = node.State.Connector.Segments[ix];
                		edge.mark = 1 << ix; //TODO Support up to 31 segments. In this a limit?
                        edge.From.X += offsetx;
                        edge.To.X += offsetx;
                        var fx = edge.From.X, fy = edge.From.Y, tx = edge.To.X, ty = edge.To.Y;
                        
                        if ((fx == tx && fy > ty) || (fy == ty && fx > tx))
                    	{
                        	var tmp = edge.From;
                        	edge.From = edge.To;
                        	edge.To = tmp;
                    	}
                    }
                	
                	//Collecting points including intersection of segments
                    for (var ix = 0; ix < node.State.Connector.Segments.length; ix++) 
                    {
                    	var edge = node.State.Connector.Segments[ix];
                        var fx = edge.From.X, fy = edge.From.Y, tx = edge.To.X, ty = edge.To.Y;
                        var fp = new mxPoint(fx, fy);
						pointsList.push(fp);
                        fp.mark = edge.mark;
                        var up = uniquePoints[fx + ',' + fy];
                        
                        if (up != null)
                    	{
                        	up.mark |= fp.mark;
                    	}
                        else
                        {
                        	uniquePoints[fx + ',' + fy] = fp;
                        }
                        
                        var tp = new mxPoint(tx, ty);
						pointsList.push(tp);
                        tp.mark = edge.mark;
                        var up = uniquePoints[tx + ',' + ty];
                        
                        if (up != null)
                    	{
                        	up.mark |= tp.mark;
                    	}
                        else
                        {
                        	uniquePoints[tx + ',' + ty] = tp; 
                        }
                        
                        //Find intersections
                        for (var j = ix + 1; j < node.State.Connector.Segments.length; j++) 
                        {
                        	var e2 = node.State.Connector.Segments[j];
                        	var fx2 = e2.From.X, fy2 = e2.From.Y, tx2 = e2.To.X, ty2 = e2.To.Y;
                        	
                        	if (fx == tx && fy <= fy2 && ty >= fy2 && fx2 <= fx && tx2 >= fx) //Ver |_ Hor
                    		{
                        		var ip = new mxPoint(fx, fy2);
								pointsList.push(ip);
                        		ip.mark = edge.mark | e2.mark;
                        		var up = uniquePoints[fx + ',' + fy2];
                                
                                if (up != null)
                            	{
                                	up.mark |= ip.mark;
                            	}
                                else
                                {
                                	uniquePoints[fx + ',' + fy2] = ip;
                                }
                    		}
                        	else if (fy == ty && fx <= fx2 && tx >= fx2 && fy2 <= fy && ty2 >= fy) //Hor _| Ver
                    		{
                        		var ip = new mxPoint(fx2, fy);
								pointsList.push(ip);
                        		ip.mark = edge.mark | e2.mark;
                        		var up = uniquePoints[fx2 + ',' + fy]
                                
                                if (up != null)
                            	{
                                	up.mark |= ip.mark;
                            	}
                                else
                                {
                                	uniquePoints[fx2 + ',' + fy] = ip;
                                }
                    		}
                        }
                    }
                    
                    //Sort points on y then x
                    var pointsArr = [];
                    
                    for (var k in uniquePoints)
                	{
                    	pointsArr.push(uniquePoints[k]);
                	}
                    
                    pointsArr.sort(function(a, b)
                   	{
                    	var dy = a.y - b.y;
                    	
                    	return dy == 0? a.x - b.x : dy; 
                    });
                    
                    function pointOnCell(geo, p)
                    {
                    	return p.x >= geo.x && p.x <= geo.x + geo.width && p.y >= geo.y && p.y <= geo.y + geo.height;
                    };
                    
                    function adjustEdgeGeoAndStyle(edge, edgePoints)
                    {
                        var eGeo = edge.geometry.clone();
						
						for (var i = 0; edgePoints && i < edgePoints.length; i++)
						{
							if (!edgePoints[i].corrected)
							{
								edgePoints[i].y += yCorrection;
								edgePoints[i].corrected = true
							}
						}
						
                        eGeo.points = edgePoints;
                        graph.model.setGeometry(edge, eGeo);

                        //Remove entry and exit points
                        graph.setCellStyles('entryX', null, [edge]);
                        graph.setCellStyles('entryY', null, [edge]);
                        graph.setCellStyles('exitX', null, [edge]);
                        graph.setCellStyles('exitY', null, [edge]);
                        //Set type orthogonal
                        graph.setCellStyles('edgeStyle', 'orthogonalEdgeStyle', [edge]);
                    };
                    
                    var outgoingEdge = graph.getOutgoingEdges(cell);
                    
                    //Simple case of a single segment. TODO Handle this case earlier
                    if (pointsArr.length == 2 && outgoingEdge.length == 1)
                	{
                        adjustEdgeGeoAndStyle(outgoingEdge[0], pointsArr);
                	}
                    else
                	{
                        var srcGeo = cell.geometry;
                        var srcP;
                        
                        //Find src starting point //TODO It should be first point always? 
                        for (var i = 0; i < pointsArr.length; i++)
                    	{
                        	if (pointOnCell(srcGeo, pointsArr[i]))
                    		{
                        		srcP = pointsArr[i];
                        		break;
                    		}
                    	}
                        
                        var selected;
                        
                        function getNextPoint(lp)
                        {
                        	for (var i = 0; i < pointsArr.length; i++)
                        	{
                        		var p = pointsArr[i];
                        		if (selected[p.x + ',' + p.y]) continue;
                        		
                        		if (p.mark & lp.mark)
                    			{
                        			selected[p.x + ',' + p.y] = true;
                        			return p;
                                }
                        	}
                        }
                        
                    	for (var j = 0; j < outgoingEdge.length; j++)
                		{
                    		if (outgoingEdge[j].target != null)
                			{
                    			selected = {};
                    			selected[srcP.x + ',' + srcP.y] = true;
                                var trgGeo = outgoingEdge[j].target.geometry;
                                
                                var edgePoints = [srcP];
                                var lp = srcP;
                                var safeGuard = 0;
                                //Is BFS better?
                                while (safeGuard < 1000)
                            	{
                                	safeGuard++;
                                	var np = getNextPoint(lp);

                                	//retract, then remove this point
                                	if (np == null) 
                            		{
                                		edgePoints.pop();
                                		lp = edgePoints[edgePoints.length - 1];
                            		}
                                	else 
                            		{
                                		edgePoints.push(np);
                                		lp = np;
                                		if (pointOnCell(trgGeo, np)) break;
                            		}
                            	}
                                
                                //Remove retracted points TODO can we do it in a better way?
                                if (edgePoints.length > 2)
                                {
	                                var spX = edgePoints[0].x;
	                                var lpX = edgePoints[edgePoints.length - 1].x;
	                                
	                                for (var i = edgePoints.length - 2; i > 0; i--)
	                            	{
	                                	if ((spX > lpX && edgePoints[i].x < lpX) || (spX < lpX && edgePoints[i].x < spX))
	                            		{
	                                		edgePoints.splice(i, 1);
	                            		}
	                            	}
                                }
                                
                                var eGeo = outgoingEdge[j].geometry.clone();
                                eGeo.points = edgePoints;
                                RPOrgChart.graph.model.setGeometry(outgoingEdge[j], eGeo);
                                
                                //Fix edge points and style
                                adjustEdgeGeoAndStyle(outgoingEdge[j], edgePoints);
                			}
                		}                            
            		}
                }

                return true;
            }

            diagram.getVisualTree().IterateParentFirst(visitorVertexFunc);
            diagram.getVisualTree().IterateParentFirst(visitorEdgeFunc);
			
			//Cleanup
			for (var i = 0; i < pointsList.length; i++)
			{
				delete pointsList[i].mark;
				delete pointsList[i].corrected;
			}
        }

    }
});

Bridge.init();
