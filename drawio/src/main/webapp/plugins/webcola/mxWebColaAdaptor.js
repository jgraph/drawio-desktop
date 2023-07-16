/**
 * Copyright (c) 2006-2018, JGraph Ltd
 * Copyright (c) 2006-2018, Gaudenz Alder
 */
/**
 * Class: mxWebColaAdaptor
 *
 * Extends WebCola's cola object to act as both adaptor and layout in WebCola for mxGraph.
 *
 * Constructor: mxWebColaAdaptor
 *
 * Constructs a new WebCola-based adaptor for given mxGraph.
 *
 * Arguments:
 *
 * graph - <mxGraph> that contains the cells.
 * dimension - <[]> array containing [width, height] of canvas in points
 * movableVertices - <[]> IDs of vertices that are movable; if undefined all vertices are movable
 * options - <{}> WebCola options for layout/adapter
 *
 **/
var doNothing = function()
  /**
   * Empty method for default event handlers
   */
{
}

function mxWebColaAdaptor(graph, dimension, movableVertices, options)
/**
 * Constructs a WebCola adaptor for mxGraph
 * @param graph mxGraph instance
 * @param dimension array containing [width, height] of drawing canvas in points
 * @param movableVertices set containing IDs of vertices that are movable; if undefined all vertices are movable
 * @param options WebCola options for layout/adapter
 * @constructor
 */
{
  this.graph = graph;
  this.dimension = dimension;
  if (typeof dimension === 'undefined')
  {
    this.dimension = [600, 600];
  }
  // compute vertex/group degrees from incidence
  this.vertexDegrees = new mxDictionary();
  this.groupDegrees = new mxDictionary();
  this.computeVertexDegrees();
  // convert draw.io graph to WebCola's nodes/links
  var layoutResult = this.graphToLayout(graph, movableVertices);
  this.nodes = layoutResult.nodes;
  this.links = layoutResult.links;
  this.groups = layoutResult.groups;
  this.cellToNode = layoutResult.cellToNode;
  this.isStopped = false;
  this.options = {};
  // assign default values
  for (var key in this.defaultValues)
  {
    this.options[key] = this.defaultValues[key];
  }
  // if options were passed, override defaults for keys available in options
  if (options != null)
  {
    for (var key in options)
    {
      this.options[key] = options[key];
    }
  }
}

// default layout options
mxWebColaAdaptor.prototype.defaultValues = {
  doAnimations: true, // whether to show the layout as it's running
  // doAnimations: false, // whether to show the layout as it's running
  skipFrames: 1, // number of ticks per frame; higher is faster but more jerky
  maxSimulationTime: 4000, // max length in ms to run the layout
  ungrabifyWhileSimulating: false, // so you can't drag nodes during layout
  fit: true, // on every layout reposition of nodes, fit the viewport
  padding: 30, // padding around the simulation
  boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
  nodeDimensionsIncludeLabels: false, // whether labels should be included in determining the space used by a node

  // layout event callbacks
  ready: function ready() {}, // on layoutready
  stop: function stop() {}, // on layoutstop

  // positioning options
  randomize: false, // use random node positions at beginning of layout
  avoidOverlap: true, // if true, prevents overlap of node bounding boxes
  handleDisconnected: true, // if true, avoids disconnected components from overlapping
  nodeSpacing: function nodeSpacing(node) {
    return 10;
  }, // extra spacing around nodes
  flow: undefined, // use DAG/tree flow layout if specified, e.g. { axis: 'y', minSeparation: 30 }
  alignment: undefined, // relative alignment constraints on nodes, e.g. function( node ){ return { x: 0, y: 1 } }
  gapInequalities: undefined, // list of inequality constraints for the gap between the nodes, e.g. [{"axis":"y", "left":node1, "right":node2, "gap":25}]

  // different methods of specifying edge length
  // each can be a constant numerical value or a function like `function( edge ){ return 2; }`
  edgeLength: undefined, // sets edge length directly in simulation
  edgeSymDiffLength: undefined, // symmetric diff edge length in simulation
  edgeJaccardLength: undefined, // jaccard edge length in simulation

  // iterations of cola algorithm; uses default values on undefined
  unconstrIter: undefined, // unconstrained initial layout iterations
  userConstIter: undefined, // initial layout iterations with user-specified constraints
  allConstIter: undefined, // initial layout iterations with all constraints including non-overlap

  // infinite layout options
  keepRunning: false // overrides all other options for a forces-all-the-time mode
};

mxWebColaAdaptor.prototype.updatePositions = function(isUndoable)
  /**
   * Default method for updating positions
   * Should be overridden by the caller/user of the adaptor
   */
{
  console.log("colaAdaptor: updatePositions");
  // TODO: do all the positions here
}

mxWebColaAdaptor.prototype.kick = function (colaAdaptor)
/**
 * Starts WebCola computation on the given adaptor
 */
{
  console.log("colaAdaptor: step");

  if ('doAnimations' in this.options && this.options.doAnimations)
  {
    doRendering(this.callback);
  }
  else
  {
    // run until the end
    while (!this.process(colaAdaptor))
    {
    }
  }
}

mxWebColaAdaptor.prototype.step = function (colaAdaptor)
/**
 * Notifies about a single layout computation step on WebCola adaptor
 */
{
  if ('doAnimations' in this.options && this.options.doAnimations)
  {
    this.updatePositions(false);
  }
}

mxWebColaAdaptor.prototype.frameSteps = function(colaAdaptor)
/**
 * Runs multiple ticks on WebCola adaptor until finished
 */
{
  var result = void 0;

  for (var i = 0; i < this.options.skipFrames && !result; i++) {
    result = result || this.process(colaAdaptor);
  }
  return result;
}

mxWebColaAdaptor.prototype.process = function(colaAdaptor)
/**
 * Executes the whole layout computation on WebCola adaptor
 */
{
  if (this.isStopped)
  {
    this.finish();
    return true;
  }
  var result = colaAdaptor.tick();
  if (result && this.options.keepRunning) {
    colaAdaptor.resume();
  }
  return result;
}

mxWebColaAdaptor.prototype.renderingChain = function(colaAdaptor)
/**
 * This keeps rendering new simulation frames until end is reached
 */
{
  if (this.process(colaAdaptor))
  {
    return;
  }
  doRendering(this.callback);
}

mxWebColaAdaptor.prototype.finish = function()
{

}

mxWebColaAdaptor.prototype.run = function()
  /**
   * Runs the layout computation on given nodes/links/groups
   * @returns Nothing
   */
{
  var layout = this;
  var options = this.options;

  var colaAdaptor = layout.adaptor = cola.adaptor
  ({
    trigger: function (evt)
    {
      var START = cola.EventType ? cola.EventType.start : 'start';
      var TICK = cola.EventType ? cola.EventType.tick : 'tick';
      var END = cola.EventType ? cola.EventType.end : 'end';

      switch (evt.type)
      {
        case START:
        {
          // colaAdaptor.start();
        }
        break;
        case TICK:
        {
          layout.step();
        }
        break;
        case END:
        {
          console.log("colaAdaptor: end");
          layout.updatePositions(true);
          if (!options.keepRunning)
          {
            layout.finish();
          }
        }
        break;
      }
    },

    kick: function ()
    {
      layout.kick(colaAdaptor);
    },

    finish: function()
    {
      layout.finish();
    },

    on: doNothing,

    drag: doNothing
  });

  colaAdaptor.nodes(this.nodes)
             .links(this.links)
             .groups(this.groups)
             .size(this.dimension)
             .linkDistance(function (link)
              {
                return link.length;
              });

  layout.callback = function()
  {
    layout.renderingChain(colaAdaptor);
  }

  colaAdaptor.avoidOverlaps(options.avoidOverlap)
             .handleDisconnected(options.handleDisconnected)
             // .constraints(constraints)
             // .start(100, 100, 100);
             .start();
  return this.adaptor;
}

function getScreenConstraints(layout, width, height)
/**
 * Returns a set of constraints covering limits of screen
 * @param layout
 * @param width
 * @param height
 * @returns {Array}
 */
{
  var gap = 20;
  var size = layout._nodes.length;
  var topLeft = {x: 0, y: 0, fixed: true, index: size};
  var bottomRight = {x: width, y: height, fixed: true, index: size + 1};
  layout._nodes.push(topLeft);
  layout._nodes.push(bottomRight);
  var constraints = [];
  for (var i = 0; i < size; i++) {
    var index = layout._nodes[i].index;
    constraints.push({ axis: 'x', type: 'separation', left: topLeft.index, right: index, gap: gap });
    constraints.push({ axis: 'y', type: 'separation', left: topLeft.index, right: index, gap: gap });
    constraints.push({ axis: 'x', type: 'separation', left: index, right: bottomRight.index, gap: gap });
    constraints.push({ axis: 'y', type: 'separation', left: index, right: bottomRight.index, gap: gap });
  }
  return constraints;
}

mxWebColaAdaptor.prototype.graphToLayout = function(graph, movableVertices)
/**
 * Returns a WebCola layout set up for the given Draw.io graph
 * In WebCola's TypeScript source: vertex cell -> InputNode
 *                                 edge cell -> Link
 *                                 parent/child -> Group
 * @param graph Draw.io graph object
 * @param fixedVertices Vertices that shouldn't be moved (dictionary with {id: True} pairs, id is vertex id)
 *                      optional, if undefined all vertices are considered movable
 * @returns list of WebCola nodes, list of WebCola links, and a dictionary from Draw.io cell ID to WebCola node ID
 *          returned as a dictionary: {nodes: ..., links: ..., cellToNode: ...}
 */
{
  var activeMaps = this.findActiveVertices(graph);  // list of all active vertices, i.e. with no collapsed parents
  var activeVertices = activeMaps.activeVertices;  // inactive vertex to its nearest active parent map
  var inactiveToActiveMap = activeMaps.inactiveToActiveMap;
  var model = graph.getModel();
  var cells = model.cells;
  var view = graph.getView();
  var cellSpacing = 20;
  
  // Ignores cells that have no states
  var tmp = {};
  
  for (var id in cells)
  {
	  if (view.getState(cells[id]) != null)
	  {
		  tmp[id] = cells[id];
	  }
  }
  
  cells = tmp;
  
  var nodeCells = {};
  var linkCells = {};
  var cellIds = {};
  var edgeIds = {};
  var colaId = 0;
  var nodes = [];
  var links = [];
  // process nodes first
  for (var id in cells)
  {
    var cell = cells[id];
    var state = view.getState(cell);
    var bounds = view.getBoundingBox(state, true);
    var bounds = model.getGeometry(cell);
    var isFirst = true;
    // if (cell.isVertex() && this.isLeafOrCollapsed(cell)) {
    // only active vertices should be considered (i.e. not hidden by a collapsed or layouted vertex)
    // if (cell.isVertex() && activeVertices[cell.id])
    if (cell.isVertex() && this.isLeafOrCollapsed(cell) && activeVertices[cell.id])
    {
      var node = {};
      // node.x = bounds.getCenterX();
      // node.y = bounds.getCenterY();
      node.width = bounds.width + cellSpacing;
      node.height = bounds.height + cellSpacing;
      node.index = colaId;
      node.name = cell.value;
      node.fixed = false;
      if (typeof movableVertices !== 'undefined' && !(id in movableVertices))
      {
        node.fixed = true;
      }
      nodes.push(node);
      cellIds[id] = colaId;
      nodeCells[colaId] = cell;
      colaId++;
    }
  }
  // now edges can be processed as well
  for (var id in cells)
  {
    var cell = cells[id];
    var state = view.getState(cell);
    if (cell.isEdge() && cell.getTerminal(true) != null && cell.getTerminal(false) != null)
    {
      // attach edges to lowest active vertex corresponding to each of their terminals
      var terminal_id1 = inactiveToActiveMap[cell.source.id];
      var terminal_id2 = inactiveToActiveMap[cell.target.id];
      if (terminal_id1 == terminal_id2)
      {
        // both terminals are under the same active parent, no need to make an invisible edge
        continue;
      }
      // if either of terminals are groups, we need to insert complete graph between nodes within these groups
      var terminal1 = cells[terminal_id1];
      var terminal2 = cells[terminal_id2];
      var addedLinks = [];
      if (this.isGroup(terminal1) || this.isGroup(terminal2))
      {
        addedLinks = this.addGroupConstraintLinks(terminal1, terminal2, activeVertices, inactiveToActiveMap, cellIds);
      }
      else
      {
        // link = {}
        // link.source = cellIds[cell.source.id];
        // link.target = cellIds[cell.target.id];
        var link = this.createLink(terminal_id1, terminal_id2, cellIds);
        addedLinks.push(link);
      }
      for (var i = 0; i < addedLinks.length; i++)
      {
        var link = addedLinks[i];
        links.push(link);
        edgeIds[cell] = id;
        linkCells[link] = cell;
      }
    }
  }
  links = this.getUniqueLinks(links);
  // finally, groups need to be extracted
  // mxGraph.getCellsForGroup
  // mxGraphModel.getChildCount
  // mxGraph.getBoundsForGroup
  // first, get all possible parents and their children
  var groupParents = {};
  var directParentChildren = {};
  for (var id in cells)
  {
    var cell = cells[id];
    if (!cell.isVertex() || !this.isLeafOrCollapsed(cell))
      continue;
    var parent = cell.getParent();
    if (parent.isVertex())
    {
      groupParents[parent.id] = parent;
      if (!(parent.id in directParentChildren))
      {
        directParentChildren[parent.id] = {}
      }
      directParentChildren[parent.id][id] = cell;
    }
  }
  // now go through all parents/children and build a group hierarchy for WebCola
  var preliminaryGroups = [];
  var groupId = 0;
  var groupToParent = {}
  for (var parentId in groupParents)
  {
    var parentChildren = directParentChildren[parentId];
    var groupNodes = []
    for (var childId in parentChildren)
    {
      if (activeVertices[childId])
      {
        groupNodes.push(cellIds[childId]);
      }
    }
    preliminaryGroups.push({id: groupId, parentId: parentId, nodes: parentChildren, leaves: groupNodes, groups: []});
    groupToParent[groupId] = parentId;
    groupId++;
  }
  // here scan newly formed groups if their parent is a child of any of the nodes in any of the groups
  for (var i = 0; i < preliminaryGroups.length; i++)
  {
    var parentGroup = preliminaryGroups[i];
    var parentId = parentGroup.parentId;
    for (var j = 0; j < preliminaryGroups.length; j++)
    {
      if (i == j)
        continue;
      var groupParentId = cells[preliminaryGroups[j].parentId].getParent().id;
      if (parentId == groupParentId)
        parentGroup.groups.push(j);
    }
  }
  // finalize groups
  var groups = [];
  for (var i = 0; i < preliminaryGroups.length; i++)
  {
    var group = preliminaryGroups[i];
    var graphGroup = {};
    if (group.leaves.length > 0)
    {
      graphGroup["leaves"] = group.leaves;
    }
    if (group.groups.length > 0)
    {
      graphGroup["groups"] = group.groups;
    }
    if (graphGroup.hasOwnProperty("leaves") || graphGroup.hasOwnProperty("groups"))
    {
      groups.push(graphGroup);
    }
  }

  return {nodes: nodes, links: links, groups: groups, cellToNode: cellIds};
};

mxWebColaAdaptor.prototype.createLink = function(sourceId, targetId, cellIds)
/**
 * Creates a default version of a WebCola link/edge
 * @param sourceId ID of the edge's source vertex cell
 * @param targetId ID of the edge's target vertex cell
 * @param cellIds cell ID to WebCola's node ID mapping
 * @returns a WebCola link corresponding to the edge [sourceId, targetId] 
 * in WebCola node IDs
 */
{
  var link = {};
  link.source = cellIds[sourceId];
  link.target = cellIds[targetId];
  link.weight = 0.5;
  link.length = 200; //Graph.prototype.defaultEdgeLength;
  return link;
}

mxWebColaAdaptor.prototype.computeVertexDegrees = function()
/**
 * Computes group vertex and vertex degrees. Useful to stop layouting for groups
 * with no internal, incoming or outgoing edges.
 */
{
  var model = this.graph.getModel();
  var cells = model.cells;
  
  // compute individual vertex degrees
  for (var id in cells)
  {
    var cell = cells[id];
    if (cell.isEdge() && cell.source != null && cell.target != null)
    {
    	  // scan all edges, ignore other types
    	  var sourceId = cell.source.id;
    	  var targetId = cell.target.id;
    	  var source = cells[sourceId];
    	  var target = cells[targetId];
    	  
    	  if (sourceId == targetId)
      {
    		 // self-loops are irrelevant
         continue;    		  
    	  }
    	  
    	  var sourceDegree = this.vertexDegrees.get(source);
    	  if (typeof sourceDegree == "undefined")
      {
    		sourceDegree = 0;
      }
    	  sourceDegree++;
    	  this.vertexDegrees.put(source, sourceDegree);

    	  var targetDegree = this.vertexDegrees.get(target);
    	  if (typeof targetDegree == "undefined")
      {
    		  targetDegree = 0;
      }
    	  targetDegree++;
    	  this.vertexDegrees.put(target, targetDegree);
    }
  }
  // compute sub-group degree, i.e. sum of all degrees of children
  // algorithm goes through all vertices, then for each vertex it goes on its material
  // path to root and adds its contribution to all vertices on this path
  // this should for each vertex place exactly the sum of degrees of all its vertices
  // and itself, nothing less, nothing more
  for (var id in cells)
  {
    var cell = cells[id];
    if (cell.isVertex())
    {
    	  // scan all vertices, ignore other types
    	  var vertexDegree = this.vertexDegrees.get(cell);
    	  if (typeof vertexDegree == "undefined")
    	  {
    		vertexDegree = 0;
    	  }
      var parent = cell;
    	  while (parent != null && typeof parent != "undefined")
	  {
	    	var groupDegree = this.groupDegrees.get(parent);
	    	if (typeof groupDegree == "undefined")
	    	{
	      groupDegree = 0;
	    }
	    groupDegree += vertexDegree;
        this.groupDegrees.put(parent, groupDegree);
        parent = parent.parent;
      }
    }
  }
}

mxWebColaAdaptor.prototype.isZeroConnected = function(groupCell)
/**
 * Indicates if all group cell's vertices have no incidental edges
 * @params groupCell group cell
 * @returns true if the group cell doesn't contain any vertices with edges
 */
{
  var groupDegree = this.groupDegrees.get(groupCell);
  console.log("Group " + groupCell.id + " degree: " + groupDegree);
  if (typeof groupDegree != "undefined" && groupDegree > 0)
  {
	return false;
  }
  return true;
}

mxWebColaAdaptor.prototype.isInZeroConnectedGroup = function(cell)
{
  var parent = cell.parent;
  if (parent == null || typeof parent == "undefined")
  {
	return this.isZeroConnected(cell);
  }
  else
  {
	return this.isZeroConnected(parent);
  }
}

mxWebColaAdaptor.prototype.isLeafOrCollapsed = function(cell)
  /**
   * Returns true if a cell is either a leaf or a collapsed group
   * @param cell cell to investigate
   * @returns true if a cell is either a leaf or a collapsed group, false otherwise
   */
{
  if (cell.isCollapsed() ||
      cell.children == null || cell.children.length == 0 ||
      typeof this.graph.getCellStyle(cell)['childLayout'] != 'undefined')
  {
    return true;
  }
  if (this.isZeroConnected(cell))
  {
	return true;
  }
  /*
  if (!cell.isCollapsed() && cell.children != null && cell.children.length > 0 && this.graph.getEdges(cell, null, true, true, true, true).length == 0)
  {
	console.log("cell " + cell.id + " is 0-connected.");
	return true;
  }
  */
  return false;
}

mxWebColaAdaptor.prototype.findActiveVertices = function(graph)
  /**
   * Scans all groups and finds active vertices, as well as an inactive-vertex-to-active-parent map
   * @param graph input graph
   */
{
  var inactiveToActiveMap = {};
  var activeVertices = {};
  var root = graph.getModel().root;
  var cellsToExplore = [{vertex: root, isActive: true, activeParent: root}]
  while (cellsToExplore.length > 0)
  {
    var currentCellInfo = cellsToExplore.shift();
    var cell = currentCellInfo.vertex;
    if (cell.isEdge())
    {
      // cut at edge group, those are ignored
      continue;
    }
    var isActive = currentCellInfo.isActive;
    var activeParent = currentCellInfo.activeParent;
    if (cell.isVertex())
    {
      if (isActive)
      {
        activeVertices[cell.id] = true;
      }
      else
      {
        activeVertices[cell.id] = false;
      }
    }
    // prepare children
    // child can be active only if any of its parents is not collapsed
    var isActive = isActive && !this.isLeafOrCollapsed(cell);
    var children = cell.children;
    if (children != null && children.length > 0)
    {
      for (var i = 0; i < children.length; i++)
      {
        var child = children[i];
        var childActiveParent = isActive? child: activeParent;
        cellsToExplore.push({vertex: child, isActive: isActive, activeParent: childActiveParent});
        if (child.isVertex())
        {
          inactiveToActiveMap[child.id] = childActiveParent.id;
        }
      }
    }
  }
  return {activeVertices: activeVertices, inactiveToActiveMap: inactiveToActiveMap};
}

mxWebColaAdaptor.prototype.getActiveVerticesInGroup = function(groupCell, activeVertices, includeCollapsedGroups)
  /**
   * Scans all children in group and returns all active vertices inside group
   * This method is for creating redundant edges between members of groups to simulate group edges in WebCola
   * See https://github.com/tgdwyer/WebCola/issues/38
   * @param groupCell group cell
   */
{
  var activeChildren = [];
  if (includeCollapsedGroups && this.isLeafOrCollapsed(groupCell))
  {
    activeChildren.push(groupCell);
  }
  var cellsToExplore = [groupCell];
  while (cellsToExplore.length > 0)
  {
    var cell = cellsToExplore.shift();
    if (!cell.isVertex() || !activeVertices[cell])
    {
      // cut at edge group, those are ignored
      continue;
    }
    if (this.isLeafOrCollapsed(cell))
    {
      activeChildren.push(cell);
    }
    else
    {
      var children = cell.children;
      if (children == null || children.length == 0)
      {
        continue;
      }
      cellsToExplore = cellsToExplore.concat(children);
    }
  }
  return activeChildren;
}

mxWebColaAdaptor.prototype.getAllVerticesInGroup = function(groupCell, includeCollapsedGroups)
  /**
   * Scans all children in group and returns all active vertices inside group
   * This method is for creating redundant edges between members of groups to simulate group edges in WebCola
   * See https://github.com/tgdwyer/WebCola/issues/38
   * @param groupCell group cell
   */
{
  var result = [];
  if (includeCollapsedGroups && this.isLeafOrCollapsed(groupCell))
  {
    result.push(groupCell);
  }
  var cellsToExplore = [groupCell];
  while (cellsToExplore.length > 0)
  {
    var cell = cellsToExplore.shift();
    if (!cell.isVertex())
    {
      // cut at edge group, those are ignored
      continue;
    }
    if (this.isLeafOrCollapsed(cell))
    {
      result.push(cell);
    }
    else
    {
      var children = cell.children;
      if (children == null || children.length == 0)
      {
        continue;
      }
      cellsToExplore = cellsToExplore.concat(children);
    }
  }
  return result;
}

mxWebColaAdaptor.prototype.hasVertexChildren = function(cell)
  /**
   * Returns true if a (group) cell has vertex children in its subtree
   * @param cell (group) cell
   * @returns true if if a (group) cell has vertex children in its subtree, false otherwise
   */
{
  if (cell.children == null || cell.children.length == 0)
  {
    return false;
  }
  var toBeExamined = []
  toBeExamined = toBeExamined.concat(cell.children);
  while (toBeExamined.length > 0)
  {
    var cell = toBeExamined.shift();
    if (cell.isVertex())
      return true;
    if (cell.children != null && cell.children.length > 0)
    {
      toBeExamined = toBeExamined.concat(cell.children);
    }
  }
  return false;
}

mxWebColaAdaptor.prototype.isInCollapsedTree = function(cell)
{
  // scan the material path for collapsed group node
  while (cell != null)
  {
    cell = cell.getParent();
    if (cell != null && cell.isCollapsed())
    {
      return true;
    }
  }
  return false;
}

mxWebColaAdaptor.prototype.isGroup = function(cell)
  /**
   * Returns true if cell is a group (has children)
   * @param cell cell
   * @returns true if cell is a group (has children); false otherwise
   */
{
  return cell.children != null && cell.children.length > 0;
}

mxWebColaAdaptor.prototype.addGroupConstraintLinks = function(groupA, groupB, activeVertices, inactiveToActiveMap, cellIds)
  /**
   * Adds edges between vertex and group or two groups. Each vertex child of a group must be connected to the vertex/
   * group, as this way WebCola simulates edges on the group level (as groups don't exist as vertices in WebCola)
   * @param rootCell root cell
   */
{
  var result = []
  // var childrenA = this.getActiveVerticesInGroup(groupA, activeVertices, false);
  // var childrenB = this.getActiveVerticesInGroup(groupB, activeVertices, false);
  var childrenA = [groupA];
  var childrenB = [groupB];
  if (!groupA.isCollapsed())
  {
    childrenA = this.getAllVerticesInGroup(groupA, activeVertices, false);
  }
  if (!groupB.isCollapsed())
  {
    childrenB = this.getAllVerticesInGroup(groupB, activeVertices, false);
  }
  if (childrenA == null || childrenA.length == 0 || childrenB == null || childrenB.length == 0)
    return result;
  for (var i = 0; i < childrenA.length; i++)
  {
    var childA_Id = inactiveToActiveMap[childrenA[i].id];
    for (var j = 0; j < childrenB.length; j++)
    {
      var childB_Id = inactiveToActiveMap[childrenB[j].id];
      var link = this.createLink(childA_Id, childB_Id, cellIds);
      result.push(link);
    }
  }
  return result;
}

mxWebColaAdaptor.prototype.getUniqueLinks = function(links)
  /**
   * Returns an array of unique links from an array of links
   * @param links array of links containing duplicate links
   * @returns array of unique links
   */
{
  var result = [];
  // TODO: this part is inefficient - O(n^2); Theta(n) should be possible with hashmap
  for (var i = 0; i < links.length; i++)
  {
    var link = links[i];
    var shouldBeAdded = true;
    for (var j = 0; j < result.length; j++)
    {
      var existingLink = result[j];
      if (link.source == existingLink.source && link.target == existingLink.target)
      {
        shouldBeAdded = false;
        break;
      }
    }
    if (shouldBeAdded)
    {
      result.push(link);
    }
  }
  return result;
}

var doRendering = void 0;

if ((typeof window === "undefined" ? "undefined" : typeof(window)) !== ( true ? "undefined" : typeof(undefined)))
{
  doRendering = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;
}
else
{
  // if not available, all you get is immediate calls
  function doRendering(callback)
  {
    callback();
  };
}
