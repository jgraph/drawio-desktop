function mxGraphMlCodec()
{
	this.cachedRefObj = {};
};


mxGraphMlCodec.prototype.refRegexp = /^\{y\:GraphMLReference\s+(\d+)\}$/;
mxGraphMlCodec.prototype.staticRegexp = /^\{x\:Static\s+(.+)\.(.+)\}$/;

mxGraphMlCodec.prototype.decode = function (xml, callback, onError)
{
	try
	{
		var doc = mxUtils.parseXml(xml);
		
		var graphs = this.getDirectChildNamedElements(doc.documentElement, mxGraphMlConstants.GRAPH);
		
		this.initializeKeys(doc.documentElement);
		
		var mxFile = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><mxfile>";
		for (var i = 0; i < graphs.length; i++)
		{
			var pageElement = graphs[i];
	
			var graph = this.createMxGraph();
			var model = graph.getModel();
			
	        model.beginUpdate();
	        try 
	        {
		        this.nodesMap = {};
		    	this.edges = [];
		        this.importGraph(pageElement, graph, graph.getDefaultParent());
		    	
		    	for (var i = 0; i < this.edges.length; i++)
				{
		    		var edgesObj = this.edges[i];
		    		var edges = edgesObj.edges;
		    		var parent = edgesObj.parent;
		    		var dx = edgesObj.dx, dy = edgesObj.dy;
		
			    	for (var j = 0; j < edges.length; j++)
			    	{
			    		this.importEdge(edges[j], graph, parent, dx, dy);
			    	}
				}
	        }
	        catch(e)
	        {
	        	console.log(e);
	        	throw e;
	        }
	        finally
	        {
	        	model.endUpdate();
	        }
	    	
	    	//update edges' labels to convert their labels relative coordinate to ours
	        model.beginUpdate();
	        try 
	        {
	        	var cells = graph.getModel().cells;
	        	var tr = graph.view.translate;
	        	
	        	for (var id in cells)
	    		{
	        		var edge = cells[id];
	        		
	        		if (edge.edge && edge.getChildCount() > 0)
	    			{
	        			for (var i = 0; i < edge.getChildCount(); i++)
	    				{
	        				var cell = edge.children[i];
	                		var geo = cell.geometry;
	                		
	                		if (!geo.adjustIt) continue;
	                		
		        			var state = graph.view.getState(edge);
		        			var abdPs = state.absolutePoints;
		        			var p0 = abdPs[0];
		        			var pe = abdPs[abdPs.length - 1];
		        			
		        			var ratio = geo.x;
		        			var dist = geo.y;
		        			var dx = pe.x - p0.x
		        			var dy = pe.y - p0.y
		 
		        			var x = p0.x + ratio * dx;
		        			var y = p0.y + ratio * dy;
		        			
		        			var d = Math.sqrt(dx*dx + dy*dy);
		        			dx /= d;
		        			dy /= d;
		        			
		        			x -= dist * dy;
		        			y += dist * dx;
		        			
		        			var np = graph.view.getRelativePoint(state, x, y);
		        			geo.x = np.x;
		        			geo.y = np.y;
		    			}
		    		}
	    		}
	        }
	        catch(e)
	        {
	        	console.log(e);
	        	throw e;
	        }
	        finally
	        {
	        	model.endUpdate();
	        }
	    	
	        mxFile += this.processPage(graph, i+1);
		}
	
		mxFile += "</mxfile>";
		
		if (callback)
		{
			callback(mxFile);
		}
	}
    catch(e)
    {
    	if (onError) 
    	{
    		onError(e);
    	}
    }
};

mxGraphMlCodec.prototype.initializeKeys = function (graphmlElement)
{
	var keys = this.getDirectChildNamedElements(graphmlElement, mxGraphMlConstants.KEY);
	
	this.nodesKeys = {};
	this.edgesKeys = {};
	this.portsKeys = {};
	this.sharedData = {};
	
	this.nodesKeys[mxGraphMlConstants.NODE_GEOMETRY] = {}; 
	this.nodesKeys[mxGraphMlConstants.USER_TAGS] = {};
	this.nodesKeys[mxGraphMlConstants.NODE_STYLE] = {};
	this.nodesKeys[mxGraphMlConstants.NODE_LABELS] = {};
	this.nodesKeys[mxGraphMlConstants.NODE_GRAPHICS] = {};
	this.edgesKeys[mxGraphMlConstants.EDGE_GEOMETRY] = {};
	this.edgesKeys[mxGraphMlConstants.EDGE_STYLE] = {}; 
	this.edgesKeys[mxGraphMlConstants.EDGE_LABELS] = {}; 
	this.portsKeys[mxGraphMlConstants.PORT_LOCATION_PARAMETER] = {};
	this.portsKeys[mxGraphMlConstants.PORT_STYLE] = {};
	this.portsKeys[mxGraphMlConstants.PORT_VIEW_STATE] = {};
	
	var sharedDataId;
	
	for (var i = 0; i < keys.length; i++)
	{
		var keyObj = this.dataElem2Obj(keys[i]);
	
		var id = keyObj[mxGraphMlConstants.ID];
		var _for = keyObj[mxGraphMlConstants.KEY_FOR];
		var attName = keyObj[mxGraphMlConstants.KEY_NAME];
		var yType = keyObj[mxGraphMlConstants.KEY_YTYPE];
		
		if (attName == mxGraphMlConstants.SHARED_DATA) sharedDataId = id;
		
		attName = attName? attName : yType
		
		//TODO handle the defaults inside these keys
		switch (_for)
		{
			case mxGraphMlConstants.NODE:
				this.nodesKeys[attName] = {key: id, keyObj: keyObj};
			break;
			case mxGraphMlConstants.EDGE:
				this.edgesKeys[attName] = {key: id, keyObj: keyObj};
			break;
			case mxGraphMlConstants.PORT:
				this.portsKeys[attName] = {key: id, keyObj: keyObj};
			break;
			case mxGraphMlConstants.ALL:
				var obj = {key: id, keyObj: keyObj};
				this.nodesKeys[attName] = obj;
				this.edgesKeys[attName] = obj;
				this.portsKeys[attName] = obj;
			break;
		}
	}
	
	var data = this.getDirectChildNamedElements(graphmlElement, mxGraphMlConstants.DATA);
	
	for (var i = 0; i < data.length; i++)
	{
		var key = data[i].getAttribute(mxGraphMlConstants.KEY);
		
		if (key == sharedDataId)
		{
			var sharedData = this.getDirectChildNamedElements(data[i], mxGraphMlConstants.Y_SHARED_DATA);
			
			for (var j = 0; j < sharedData.length; j++)
			{
				var dataItems = this.getDirectChildElements(sharedData[j]);
				
				for (var k = 0; k < dataItems.length; k++)
				{
					var dkey = dataItems[k].getAttribute(mxGraphMlConstants.X_KEY);
					this.sharedData[dkey] = dataItems[k];
				}
			}
		}
		else
		{
			var resources = this.getDirectChildNamedElements(data[i], mxGraphMlConstants.Y_RESOURCES);
			
			for (var j = 0; j < resources.length; j++)
			{
				var dataItems = this.getDirectChildElements(resources[j]);
				
				for (var k = 0; k < dataItems.length; k++)
				{
					var dkey = dataItems[k].getAttribute(mxGraphMlConstants.ID);
					this.sharedData[dkey] = dataItems[k];
				}
			}
		}
	}
};

mxGraphMlCodec.prototype.parseAttributes = function (elem, obj) 
{
	var atts = elem.attributes;
	if (atts)
	{
		
		for (var i = 0; i < atts.length; i++)
		{
			var val = atts[i].nodeValue;
			var ref = this.refRegexp.exec(val);
			var staticMem = this.staticRegexp.exec(val);
			
			if (ref)
			{
				var key = ref[1];
				var subObj = this.cachedRefObj[key];
				
				//already cached
				if (!subObj)
				{
					subObj = {};
					subObj[this.sharedData[key].nodeName] = this.dataElem2Obj(this.sharedData[key]);
					this.cachedRefObj[key] = subObj;
				}
				
				obj[atts[i].nodeName] = subObj;
			}
			else if (staticMem)
			{
				obj[atts[i].nodeName] = {};
				obj[atts[i].nodeName][staticMem[1]] = staticMem[2];
			}
			else
			{
				obj[atts[i].nodeName] = val;
			}
		}
	}
};

mxGraphMlCodec.prototype.dataElem2Obj = function (elem) 
{
	var ref = this.getDirectFirstChildNamedElements(elem, mxGraphMlConstants.GRAPHML_REFERENCE)
					|| elem.getAttribute(mxGraphMlConstants.REFID);
	var refKey = null;
	var origElem = elem;
	var obj = {};
	
	if (ref) 
	{
		var key = (typeof ref === "string")? ref : ref.getAttribute(mxGraphMlConstants.RESOURCE_KEY);
		var cachedObj = this.cachedRefObj[key];
		
		//already cached
		if (cachedObj)
		{
			//parse all attributes to update the reference
			this.parseAttributes(elem, cachedObj);
			return cachedObj;
		}
		
		elem = this.sharedData[key];
		refKey = key;
	}

	//parse all attributes
	this.parseAttributes(elem, obj);

	for (var i = 0; i < elem.childNodes.length; i++)
	{
		var child = elem.childNodes[i]; 
		
		if (child.nodeType == 1)
		{
			var attName = child.nodeName;
			
			//Special types of node (x:List and x:Static)
			if (attName == mxGraphMlConstants.X_LIST) 
			{
				var arr = [];
				var arrayElem = this.getDirectChildElements(child);
				
				for (var j = 0; j < arrayElem.length; j++)
				{
					attName = arrayElem[j].nodeName;
					arr.push(this.dataElem2Obj(arrayElem[j]));
				}
					
				obj[attName] = arr;
			}
			else if (attName == mxGraphMlConstants.X_STATIC)
			{
				var member = child.getAttribute(mxGraphMlConstants.MEMBER);
				var dotPos = member.lastIndexOf('.');
				obj[member.substr(0, dotPos)] = member.substr(dotPos + 1);
			}
			else
			{
				var dotPos = attName.lastIndexOf(".");
				
				if (dotPos > 0)
				{
					attName = attName.substr(dotPos + 1);
				}
				
				if (obj[attName] != null)
				{
					if (!(obj[attName] instanceof Array))
					{
						obj[attName] = [obj[attName]];
					}
					
					obj[attName].push(this.dataElem2Obj(child));
				}
				else
				{
					obj[attName] = this.dataElem2Obj(child);
				}
			}
		} 
		else if ((child.nodeType == 3 || child.nodeType == 4) && child.textContent.trim())
		{
			obj["#text"] = child.textContent;
		}
	}
	
	//cache referenced objects
	if (refKey)
	{
		var tmpObj = {};
		//parse all attributes before following the reference
		this.parseAttributes(origElem, tmpObj);
		tmpObj[this.sharedData[refKey].nodeName] = obj; 
		this.cachedRefObj[refKey] = tmpObj;
		return tmpObj;
	}
	
	return obj;
};

mxGraphMlCodec.prototype.mapArray = function(arr, mapping, map)
{
	var obj = {};
	for (var k = 0; k < arr.length; k++)
	{
		if (arr[k].name)
		{
			obj[arr[k].name] = arr[k].value || arr[k]; 
		}
	}
	this.mapObject(obj, mapping, map);
}
//Use mapping information to fill the map based on obj content
//TODO yjs looks like they need special handling
mxGraphMlCodec.prototype.mapObject = function (obj, mapping, map)
{
	//defaults can be overridden by actual values later
	if (mapping.defaults)
	{
		for (var key in mapping.defaults)
		{
			map[key] = mapping.defaults[key];
		}
	}
	
	for (var key in mapping)
	{
		var parts = key.split('.');
		
		var val = obj;
		
		for (var i = 0; i < parts.length; i++)
		{
			if (!val) break;
			
			val = val[parts[i]];
		}
		
		if (val == null && obj) //some vals doesn't need to be split
		{
			val = obj[key];
		}
		
		if (val != null)
		{
			var mappingObj = mapping[key];
			if (typeof val === "string")
			{
				if (typeof mappingObj === "string")
				{
					map[mappingObj] = val.toLowerCase();
				}
				else if (typeof mappingObj === "object")
				{
					var modVal = val.toLowerCase();
					switch(mappingObj.mod)
					{
						case "color": //mxGraph support alfa in colors in the standard format
							if (val.indexOf("#") == 0 && val.length == 9)
							{
								modVal = "#" + val.substr(3) + val.substr(1,2);
							}
							else if (val == "TRANSPARENT")
							{
								modVal = "none";
							}
						break;
						case "shape":
//							console.log(val.toLowerCase());
							modVal = mxGraphMlShapesMap[val.toLowerCase()];
						break;
						case "bpmnOutline":
//							console.log(val.toLowerCase());
							modVal = mxGraphMlShapesMap.bpmnOutline[val.toLowerCase()];
						break;
						case "bpmnSymbol":
//							console.log(val.toLowerCase());
							modVal = mxGraphMlShapesMap.bpmnSymbol[val.toLowerCase()];
						break;
						case "bool":
							modVal = val == "true"? "1" : "0";
						break;
						case "scale":
							try {
								modVal = parseFloat(val) * mappingObj.scale;
							} catch(e) {
								//nothing!
							}
						break;
						case "arrow":
							modVal = mxGraphMlArrowsMap[val];
						break;
					}
					if (modVal != null)
						map[mappingObj.key] = modVal;
				}
				else
				{
					mappingObj(val, map);
				}
			}
			else if (val instanceof Array)
			{
				this.mapArray(val, mappingObj, map);
			}
			else if (val.name != null && val.value != null) //this is the case when a single y:Property is used 
			{
				this.mapArray([val], mappingObj, map);
			}
			else
			{
				this.mapObject(val, mappingObj, map);
			}
		}
	}
};

mxGraphMlCodec.prototype.createMxGraph = function ()
{
    var graph = new mxGraph();
//    graph.setExtendParents(false);
//    graph.setExtendParentsOnAdd(false);
//    graph.setConstrainChildren(false);
//    graph.setHtmlLabels(true);
//    graph.getModel().maintainEdgeParent = false;
    return graph;
}

mxGraphMlCodec.prototype.importGraph = function (pageElement, graph, parent)
{
	var nodes = this.getDirectChildNamedElements(pageElement, mxGraphMlConstants.NODE);

	var p = parent;
	var dx = 0, dy = 0;
	while (p && p.geometry)
	{
		dx += p.geometry.x;
		dy += p.geometry.y;
		
		p = p.parent;
	}

	for (var i = 0; i < nodes.length; i++)
	{
		this.importNode(nodes[i], graph, parent, dx, dy);
	}
	
	this.edges.push({
		edges: this.getDirectChildNamedElements(pageElement, mxGraphMlConstants.EDGE),
		parent: parent,
		dx: dx,
		dy: dy
	});	
};

//FIXME port 0.5, 0.5 push the edge to the other side (bpmn example)
mxGraphMlCodec.prototype.importPort = function (portElement, portsMap)
{
	var name = portElement.getAttribute(mxGraphMlConstants.PORT_NAME);
	var portObj = {};
	
	var data = this.getDirectChildNamedElements(portElement, mxGraphMlConstants.DATA);
	
	for (var i = 0; i < data.length; i++)
	{
		var d = data[i];
		var key = d.getAttribute(mxGraphMlConstants.KEY);
		
		var dataObj = this.dataElem2Obj(d);
//		console.log(dataObj);
		if (dataObj.key == this.portsKeys[mxGraphMlConstants.PORT_LOCATION_PARAMETER].key) 
		{
			this.mapObject(dataObj, {
				"y:FreeNodePortLocationModelParameter.Ratio": function(val, map)
				{
					var parts = val.split(',');
					map["pos"] = {x: parts[0], y: parts[1]};
				}
			}, portObj);
		} 
		/*
		else if (dataObj.key == this.portsKeys[mxGraphMlConstants.PORT_STYLE].key) 
		{
			
		}
		else if (dataObj.key == this.portsKeys[mxGraphMlConstants.PORT_VIEW_STATE].key) 
		{
			
		}*/
	}
	
	portsMap[name] = portObj;
};

mxGraphMlCodec.prototype.styleMap2Str = function (styleMap)
{
	var semi = "";
	var str = "";
	
	for (var key in styleMap)
	{
		str += semi + key + "=" + styleMap[key];
		semi = ";";
	}
	
	return str;
};

mxGraphMlCodec.prototype.importNode = function (nodeElement, graph, parent, dx, dy)
{
	var data = this.getDirectChildNamedElements(nodeElement, mxGraphMlConstants.DATA);
	var v;
	var id = nodeElement.getAttribute(mxGraphMlConstants.ID);
	
	var node = new mxCell();
	node.vertex = true;
	node.geometry = new mxGeometry(0,0,30,30); //some node has no geometry, this is the default

	graph.addCell(node, parent);

	var style = {graphMlID: id};
	var mlStyleObj = null;
	var mlTemplate = null;
	var mlUserTags = null;
	var lblObj = null;
	var lbls = null;
	
	for (var i = 0; i < data.length; i++)
	{
		var d = data[i];
		var dataObj = this.dataElem2Obj(d);
		
		if (dataObj.key)
		{
			if (dataObj.key == this.nodesKeys[mxGraphMlConstants.NODE_GEOMETRY].key) 
			{
				this.addNodeGeo(node, dataObj, dx, dy);
			} 
			else if (dataObj.key == this.nodesKeys[mxGraphMlConstants.USER_TAGS].key) 
			{
				mlUserTags = dataObj;
			}
			else if (dataObj.key == this.nodesKeys[mxGraphMlConstants.NODE_STYLE].key) 
			{
	//			console.log(JSON.stringify(dataObj));
				mlStyleObj = dataObj;
				if (dataObj["yjs:StringTemplateNodeStyle"])
				{
					mlTemplate = dataObj["yjs:StringTemplateNodeStyle"]["#text"];
				} 
				else
				{
					this.addNodeStyle(node, dataObj, style);
				}
			}
			else if (dataObj.key == this.nodesKeys[mxGraphMlConstants.NODE_LABELS].key) 
			{
				lblObj = dataObj;
			}
			else if (dataObj.key == this.nodesKeys[mxGraphMlConstants.NODE_GRAPHICS].key)
			{
				var shape = null, key = null;
				for (var key in dataObj)
				{
					if (key == "key" || key == "#text") continue;
					
					//Special case when a node has multiple graphics
					//TODO support the open/closed states
					if (key == "y:ProxyAutoBoundsNode") 
					{
						var realizers = dataObj[key]["y:Realizers"];
						if (realizers)
						{
							for (var key2 in realizers)
							{
								if (key2 == "active" || key2 == "#text") continue;
								
								shape = realizers[key2][realizers["active"]];
								dataObj = {};
								dataObj[key2] = shape;
								break;
							}
						}
					}
					else
					{
						shape = dataObj[key];
					}
					break;
				}
				if (shape)
				{
					if (shape[mxGraphMlConstants.GEOMETRY])
					{
						this.addNodeGeo(node, shape[mxGraphMlConstants.GEOMETRY], dx, dy);
					}
					
					if (shape[mxGraphMlConstants.NODE_LABEL])
					{
						lblObj = shape[mxGraphMlConstants.NODE_LABEL];
					}
				}
				mlStyleObj = dataObj;
				this.addNodeStyle(node, dataObj, style);
			}
		}
	}
	
	var ports = this.getDirectChildNamedElements(nodeElement, mxGraphMlConstants.PORT);
	var portsMap = {};
	
	for (var i = 0; i < ports.length; i++)
	{
		this.importPort(ports[i], portsMap);
	}
	
	if (mlTemplate)
	{
		this.handleTemplates(mlTemplate, mlUserTags, node, style);
	}
	
	this.handleFixedRatio(node, style);

	//handle special compound shapes
	this.handleCompoundShape(node, style, mlStyleObj, lbls);

	//fix for stroke size of zero
	if (style["strokeWidth"] == 0)
	{
		style["strokeColor"] = "none";
	}
	
	node.style = this.styleMap2Str(style);
	
	var subGraphs = this.getDirectChildNamedElements(nodeElement, mxGraphMlConstants.GRAPH);
	
	for (var i = 0; i < subGraphs.length; i++)
	{
		this.importGraph(subGraphs[i], graph, node, portsMap);
	}	

	//handle labels after node geometry is determined. It is also the last such that labels are on top
	if (lblObj)
		lbls = this.addLabels(node, lblObj, style, graph);

	this.nodesMap[id] = {node: node, ports: portsMap};
};

mxGraphMlCodec.prototype.addNodeStyle = function (node, dataObj, style)
{
	//TODO move these static mapping objects outside such that they are defined once only
	var dashStyleFn = function(val, map)
	{
		if (val == "line") return;
		
		map["dashed"] = 1;
		//map["fixDash"] = 1;
		var pattern = null;
		switch(val)
		{
			case "DashDot":
				pattern = "3 1 1 1";
			break;
			case "Dot":
				pattern = "1 1";
			break;
			case "DashDotDot":
				pattern = "3 1 1 1 1 1";
			break;
			case "Dash":
				pattern = "3 1";
			break;
			case "dotted":
				pattern = "1 3";
			break;
			case "dashed":
				pattern = "5 2";
			break;
			default:
				pattern = val.replace(/0/g, '1');
		}
		
		if (pattern)
		{
			//Some patterns in graphML has only one number
			if (pattern.indexOf(" ") < 0) 
			{
				pattern = pattern + " " + pattern;
			}
			map["dashPattern"] = pattern;
		}
	};
	
	var styleCommonMap = 
	{
		"shape": {key: "shape", mod: "shape"},
		"y:Shape.type": {key: "shape", mod: "shape"},
		"configuration": {key: "shape", mod: "shape"},
		"type": {key: "shape", mod: "shape"},
		"assetName": {key: "shape", mod: "shape"},
		"activityType": {key: "shape", mod: "shape"},
		"fill": {key: "fillColor", mod: "color"},
		"fill.yjs:SolidColorFill.color": {key: "fillColor", mod: "color"},
		"fill.yjs:SolidColorFill.color.yjs:Color.value": {key: "fillColor", mod: "color"},
		"y:Fill": {
			"color": {key: "fillColor", mod: "color"},
			//"color2": {key: "gradientColor", mod: "color"}, //??
			"transparent": function(val, map)
			{
				if (val == "true")
				{
					map["fillColor"] = "none";
				}
			}
		},
		"y:BorderStyle": {
			"color": {key: "strokeColor", mod: "color"},
			"width": "strokeWidth",
			"hasColor":  function(val, map)
			{
				if (val == "false")
				{
					map["strokeColor"] = "none";
				}
			},
			"type": dashStyleFn
			//"raised": ??
		},
		"stroke": {key: "strokeColor", mod: "color"},
		"stroke.yjs:Stroke":
		{
			"dashStyle": dashStyleFn,
			"dashStyle.yjs:DashStyle.dashes": dashStyleFn,
			"fill": {key: "strokeColor", mod: "color"},
			"fill.yjs:SolidColorFill.color": {key: "strokeColor", mod: "color"},
			//"lineCap": "", //??
			"thickness.sys:Double": "strokeWidth",
			"thickness": "strokeWidth"
		}
	};

	var assetNodesStyle = mxUtils.clone(styleCommonMap);
	assetNodesStyle["defaults"] = {
		"fillColor": "#CCCCCC",
		"strokeColor": "#6881B3"
	};
	
	var bpmnActivityStyle = mxUtils.clone(styleCommonMap);
	bpmnActivityStyle["defaults"] = {
		"shape": "ext;rounded=1",
		"fillColor": "#FFFFFF",
		"strokeColor": "#000090"
	};
	
	var bpmnGatewayStyle = mxUtils.clone(styleCommonMap);
	bpmnGatewayStyle["defaults"] = {
		"shape": "rhombus;fillColor=#FFFFFF;strokeColor=#FFCD28"
	};
	
	var bpmnConversationStyle = mxUtils.clone(styleCommonMap);
	bpmnConversationStyle["defaults"] = {
		"shape": "hexagon",
		"strokeColor": "#007000"
	};
	
	var bpmnEventStyle = mxUtils.clone(styleCommonMap);
	bpmnEventStyle["defaults"] = {
		"shape": "mxgraph.bpmn.shape;perimeter=ellipsePerimeter;symbol=general",
		"outline": "standard"
	};
	bpmnEventStyle["characteristic"] = {key: "outline", mod: "bpmnOutline"};
	
	var bpmnDataObjectStyle = mxUtils.clone(styleCommonMap);
	bpmnDataObjectStyle["defaults"] = {
		"shape": "js:bpmnDataObject"
	};
	
	var bpmnDataStoreStyle = mxUtils.clone(styleCommonMap);
	bpmnDataStoreStyle["defaults"] = {
		"shape": "datastore"
	};
	
	var bpmnGroupNodeStyle = mxUtils.clone(styleCommonMap);
	bpmnGroupNodeStyle["defaults"] = {
		"shape": "swimlane;swimlaneLine=0;startSize=20;dashed=1;dashPattern=3 1 1 1;collapsible=0;rounded=1"
	};
	
	var bpmnChoreographyNodeStyle = mxUtils.clone(styleCommonMap);
	bpmnChoreographyNodeStyle["defaults"] = {
		"shape": "js:BpmnChoreography"//"swimlane;childLayout=stackLayout;horizontal=1;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;startSize=20;rounded=1;collapsible=0"
	};
	
	//approximation to GraphML shapes TODO improve them
	var bevelNodeStyle = mxUtils.clone(styleCommonMap);
	bevelNodeStyle["defaults"] = {
		"rounded": "1",
		"glass": "1",
		"strokeColor": "#FFFFFF"
	};
	bevelNodeStyle["inset"] = "strokeWidth";
	bevelNodeStyle["radius"] = "arcSize";
	bevelNodeStyle["drawShadow"] = {key:"shadow", mod:"bool"};
	bevelNodeStyle["color"] = {key:"fillColor", mod:"color", addGradient: "north"};
	bevelNodeStyle["color.yjs:Color.value"] = bevelNodeStyle["color"];
	
	var shinyPlateNodeStyle = mxUtils.clone(styleCommonMap);
	shinyPlateNodeStyle["defaults"] = {
		"rounded": "1",
		"arcSize": 10,
		"glass": "1",
		"shadow": "1",
		"strokeColor": "none"
		//,"rotation": -90 //TODO requires rotation!
	};
	shinyPlateNodeStyle["drawShadow"] = {key:"shadow", mod:"bool"};
	
	var demoGroupStyle = mxUtils.clone(styleCommonMap);
	demoGroupStyle["defaults"] = {
		"shape": "swimlane",
		"startSize": 20,
		"strokeWidth": 4,
		"spacingLeft": 10 //TODO can we change collapse icon to be in right side?
	};
	demoGroupStyle["isCollapsible"] = {key:"collapsible", mod:"bool"};
	demoGroupStyle["borderColor"] = {key:"strokeColor", mod:"color"};
	demoGroupStyle["folderFrontColor"] = {key:"fillColor", mod:"color"}; //TODO fillColor always match strokeColor!
//			demoGroupStyle["folderBackColor"] = {key:"fillColor", mod:"color"}; //??
	
	var collapsibleNodeStyle = mxUtils.clone(styleCommonMap);
	collapsibleNodeStyle["defaults"] = {
		"shape": "swimlane",
		"startSize": 20,
		"spacingLeft": 10 //TODO can we change collapse icon to be in right side?
	};
	collapsibleNodeStyle["yjs:PanelNodeStyle"] = {
		"color": {key:"swimlaneFillColor", mod:"color"},
		"color.yjs:Color.value": {key:"swimlaneFillColor", mod:"color"},
		"labelInsetsColor": {key:"fillColor", mod:"color"},
		"labelInsetsColor.yjs:Color.value": {key:"fillColor", mod:"color"}
	};
	
	var tableStyle = mxUtils.clone(styleCommonMap);
	tableStyle["defaults"] = {
		"shape": "js:table"
	};
	
	var imageNodeStyle = mxUtils.clone(styleCommonMap);
	imageNodeStyle["defaults"] = {
		"shape": "image"
	};
	
	imageNodeStyle["image"] = function(val, map)
	{
		map["image"] = val; 
	};
	
	var svgNodeStyle = mxUtils.clone(styleCommonMap);
	svgNodeStyle["defaults"] = {
		"shape": "image"
	};
//	svgNodeStyle["y:SVGNodeProperties"] = {
//		"usingVisualBounds": ""//??
//	};
//	y:SVGModel.svgBoundsPolicy ??
	svgNodeStyle["y:SVGModel.y:SVGContent.y:Resource.#text"] = function(val, map)
	{
		map["image"] = "data:image/svg+xml," + ((window.btoa) ? btoa(val) : Base64.encode(val)); 
	};
	
	var groupNodeStyle = mxUtils.clone(styleCommonMap);
	groupNodeStyle["defaults"] = {
		"shape": "swimlane",
		"startSize": 20
	};
	
	groupNodeStyle["y:Shape.type"] = function(val, map)
	{
		if (val == "roundrectangle")
		{
			map['rounded'] = 1;
			map['arcSize'] = 5;
		}
	};
	
	var tableNodeStyle = mxUtils.clone(styleCommonMap);
	tableNodeStyle["defaults"] = {
		"shape": "js:table2"
	};

	var genericNodeStyle = mxUtils.clone(styleCommonMap);
	genericNodeStyle["defaults"] = {
		"gradientDirection": "east"
	};
	genericNodeStyle["y:Fill"]["color2"] = {key: "gradientColor", mod: "color"};
	genericNodeStyle["y:StyleProperties.y:Property"] = {
		"com.yworks.bpmn.characteristic": {key: "outline", mod: "bpmnOutline"},
		//TODO support colors for the icon itself other than the remaining shape!
//		"com.yworks.bpmn.icon.line.color": "",
		"com.yworks.bpmn.icon.fill": {key:"gradientColor", mod:"color"},
		"com.yworks.bpmn.icon.fill2": {key:"fillColor", mod:"color"},
		"com.yworks.bpmn.type": {key: "symbol", mod: "bpmnSymbol"},
		"y.view.ShadowNodePainter.SHADOW_PAINTING": {key: "shadow", mod: "bool"},
		"doubleBorder": {key: "double", mod: "bool"},
		"com.yworks.sbgn.style.radius": {key: "arcSize", mod: "scale", scale: 2},
		"com.yworks.sbgn.style.inverse": {key: "flipV", mod: "bool"}
	};
//	console.log(dataObj);
	this.mapObject(dataObj, {
		"yjs:ShapeNodeStyle": styleCommonMap,
		"demostyle:FlowchartNodeStyle": styleCommonMap,
		"demostyle:AssetNodeStyle": assetNodesStyle,
		"bpmn:ActivityNodeStyle": bpmnActivityStyle,
		"bpmn:GatewayNodeStyle": bpmnGatewayStyle,
		"bpmn:ConversationNodeStyle": bpmnConversationStyle,
		"bpmn:EventNodeStyle": bpmnEventStyle,
		"bpmn:DataObjectNodeStyle": bpmnDataObjectStyle,
		"bpmn:DataStoreNodeStyle": bpmnDataStoreStyle,
		"bpmn:GroupNodeStyle": bpmnGroupNodeStyle,
		"bpmn:ChoreographyNodeStyle": bpmnChoreographyNodeStyle,
		"yjs:BevelNodeStyle": bevelNodeStyle,
		"yjs:ShinyPlateNodeStyle": shinyPlateNodeStyle,
		"demostyle:DemoGroupStyle": demoGroupStyle,
		"yjs:CollapsibleNodeStyleDecorator": collapsibleNodeStyle,
		"bpmn:PoolNodeStyle": tableStyle,
		"yjs:TableNodeStyle": tableStyle,
		"demotablestyle:DemoTableStyle": tableStyle,
		"yjs:ImageNodeStyle": imageNodeStyle,
		//desktop
		"y:ShapeNode": styleCommonMap,
		"y:GenericNode": genericNodeStyle,
		"y:GenericGroupNode": genericNodeStyle,
		"y:TableNode": tableNodeStyle,
		"y:SVGNode": svgNodeStyle,
		"y:GroupNode": groupNodeStyle
	}, style);
};

mxGraphMlCodec.prototype.handleTemplates = function (template, userTags, node, styleMap)
{
	if (template)
	{
		var w = node.geometry.width;
		var h = node.geometry.height;
		var header = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 '+ w + ' ' + h +'"><g>';
		var footer = '</g></svg>';
		
		//TODO optimize this! probably only the text before defs has bindings
		var matches = null;
		var bindingPairs = [];
		//find template bindings
		var tempBindRegEx = /\{TemplateBinding\s+([^}]+)\}/g;
		
		while ((matches = tempBindRegEx.exec(template)) != null) 
		{
	        var replacement = "";
	        switch (matches[1])
	        {
	        	case "width":
	        		replacement = w;
	        	break;
	        	case "height":
	        		replacement = h;
	    		break;
	        }
	        
	        bindingPairs.push({match: matches[0], repl: replacement});
		}
		
		if (userTags && userTags["y:Json"])
		{
			var json = JSON.parse(userTags["y:Json"]["#text"]);
			//find user tags bindings
			var userTagBindRegEx = /\{Binding\s+([^}]+)\}/g;
			
			while ((matches = userTagBindRegEx.exec(template)) != null) 
			{
		        var parts = matches[1].split(',');
		        var val = json[parts[0]];
		        
		        if (val)
	        	{
		        	if (parts.length > 1)
	        		{
		        		if (parts[1].indexOf('Converter='))
	        			{
		        			var func = mxGraphMlConverters[parts[1].substr(11)]; //11 is the length of Converter=
		        			
		        			if (func)
	        				{
				        		var args = [val];
				        		
				        		if (parts[2])
				        		{
				        			args.push(parts[2].substr(11)); //11 is the length of Parameter=
				        		}
				        			
		        				val = func.apply(null, args)
	        				}
	        			}
	        		}
		        	
		        	bindingPairs.push({match: matches[0], repl: mxUtils.htmlEntities(val)});
	        	}
			}
		}

		for (var i = 0; i < bindingPairs.length; i++)
		{
			template = template.replace(bindingPairs[i].match, bindingPairs[i].repl);		
		}
		
		bindingPairs = [];
		//Fix text elements (TODO can it be merged with the previous step?)
		var txtRegEx = /\<text.+data-content="([^"]+).+\<\/text\>/g;
		while ((matches = txtRegEx.exec(template)) != null) 
		{
			var val = matches[0].substr(0, matches[0].length - 7) + matches[1] + "</text>"; //7 is the length of </text> 
			bindingPairs.push({match: matches[0], repl: val});
		}

		for (var i = 0; i < bindingPairs.length; i++)
		{
			template = template.replace(bindingPairs[i].match, bindingPairs[i].repl);		
		}

		var svg = header + template + footer;
		styleMap["shape"] = "image";
		styleMap["image"] = "data:image/svg+xml," + ((window.btoa) ? btoa(svg) : Base64.encode(svg));
	}
};

mxGraphMlCodec.prototype.handleCompoundShape = function (node, styleMap, mlStyleObj, lbls)
{
	var shape = styleMap["shape"];
	
	if (shape && shape.indexOf("js:") == 0)
	{
		switch(shape)
		{
			case "js:bpmnArtifactShadow":
				styleMap["shadow"] = "1";
			case "js:bpmnArtifact":
				styleMap["shape"] = styleMap["symbol"];
				delete styleMap["fillColor"];
				delete styleMap["strokeColor"];
				delete styleMap["gradientColor"];
				this.handleCompoundShape(node, styleMap, mlStyleObj, lbls)
			break;
			case "js:bpmnDataObjectShadow":
			case "js:bpmnDataObject":
				styleMap["shape"] = "note;size=16";
//				console.log(mlStyleObj);
				mlStyleObj = mlStyleObj["bpmn:DataObjectNodeStyle"] || mlStyleObj["y:GenericNode"] || mlStyleObj["y:GenericGroupNode"];
				var tmpMap = {};
				
				this.mapObject(mlStyleObj, {
					"y:StyleProperties.y:Property": {
						"com.yworks.bpmn.dataObjectType": "dataObjectType",
						"com.yworks.bpmn.marker1": "marker1"
					}
				}, tmpMap);
				
				if (mlStyleObj["collection"] == "true" || tmpMap["marker1"] == "bpmn_marker_parallel")
				{
					var cell2 = new mxCell('', new mxGeometry(0.5, 1, 10, 10), 'html=1;whiteSpace=wrap;shape=parallelMarker;');
					cell2.vertex = true;
					cell2.geometry.relative = true;
					cell2.geometry.offset = new mxPoint(-5, -10);
					node.insert(cell2);
				}
				if (mlStyleObj["type"] == "INPUT" || tmpMap["dataObjectType"] == "data_object_type_input")
				{
					var cell1 = new mxCell('', new mxGeometry(0, 0, 10, 10), 'html=1;shape=singleArrow;arrowWidth=0.4;arrowSize=0.4;');
					cell1.vertex = true;
					cell1.geometry.relative = true;
					cell1.geometry.offset = new mxPoint(2, 2);
					node.insert(cell1);
				}
				else if (mlStyleObj["type"] == "OUTPUT" || tmpMap["dataObjectType"] == "data_object_type_output")
				{
					var cell1 = new mxCell('', new mxGeometry(0, 0, 10, 10), 'html=1;shape=singleArrow;arrowWidth=0.4;arrowSize=0.4;fillColor=#000000;');
					cell1.vertex = true;
					cell1.geometry.relative = true;
					cell1.geometry.offset = new mxPoint(2, 2);
					node.insert(cell1);
				}
			break;
			case "js:BpmnChoreography":
				this.mapObject(mlStyleObj, {
					"defaults": {
						"shape": "swimlane;collapsible=0;rounded=1",
						"startSize": "20",
						"strokeColor": "#006000",
						"fillColor": "#CCCCCC"
					}
				}, styleMap);
				
				//TODO the shape should be clipped by parent borders. It should also be resized relative to its parent
				var pGeo = node.geometry;
				var cell1 = new mxCell('', new mxGeometry(0, pGeo.height - 20, pGeo.width, 20), 'strokeColor=#006000;fillColor=#777777;rounded=1');
				cell1.vertex = true;
				node.insert(cell1);
				
				//TODO handle labels accurately
				if (lbls && lbls.lblTxts)
				{
//					console.log(lbls);
					node.value = lbls.lblTxts[0];
					cell1.value = lbls.lblTxts[1];
				}
			break;
			case "js:bpmnActivityShadow":
			case "js:bpmnActivity":
				styleMap["shape"] = "ext;rounded=1";
				var tmpMap = {};
				mlStyleObj = mlStyleObj["y:GenericNode"] || mlStyleObj["y:GenericGroupNode"];
				
				this.mapObject(mlStyleObj, {
					"y:StyleProperties.y:Property": {
						"com.yworks.bpmn.taskType": "taskType",
						"com.yworks.bpmn.activityType": "activityType",
						"com.yworks.bpmn.marker1": "marker1",
						"com.yworks.bpmn.marker2": "marker2",
						"com.yworks.bpmn.marker3": "marker3",
						"com.yworks.bpmn.marker4": "marker4"
					}
				}, tmpMap);
				
				switch(tmpMap["activityType"])
				{
					case "activity_type_transaction":
						styleMap["double"] = "1";
					break;
				}
				
				switch(tmpMap["taskType"])
				{
					case "task_type_send":
						var item1 = new mxCell('', new mxGeometry(0, 0, 19, 12), 'shape=message;fillColor=#000000;strokeColor=#FFFFFF;');
						item1.geometry.offset = new mxPoint(4, 7);
						break;
					case "task_type_receive":
						var item1 = new mxCell('', new mxGeometry(0, 0, 19, 12), 'shape=message;');
						item1.geometry.offset = new mxPoint(4, 7);
						break;
					case "task_type_user":
						var item1 = new mxCell('', new mxGeometry(0, 0, 15, 15), 'shape=mxgraph.bpmn.user_task;');
						item1.geometry.offset = new mxPoint(4, 5);
						break;
					case "task_type_manual":
						var item1 = new mxCell('', new mxGeometry(0, 0, 15, 10), 'shape=mxgraph.bpmn.manual_task;');
						item1.geometry.offset = new mxPoint(4, 7);
						break;
					case "task_type_business_rule":
						var item1 = new mxCell('', new mxGeometry(0, 0, 18, 13), 'shape=mxgraph.bpmn.business_rule_task;');
						item1.geometry.offset = new mxPoint(4, 7);
						break;
					case "task_type_service":
						var item1 = new mxCell('', new mxGeometry(0, 0, 15, 15), 'shape=mxgraph.bpmn.service_task;');
						item1.geometry.offset = new mxPoint(4, 5);
						break;
					case "task_type_script":
						var item1 = new mxCell('', new mxGeometry(0, 0, 15, 15), 'shape=mxgraph.bpmn.script_task;');
						item1.geometry.offset = new mxPoint(4, 5);
						break;
				}
				
				if (item1)
				{
					item1.vertex = true;
					item1.geometry.relative = true;
					node.insert(item1);
					item1 = null;
				}
				
				var numIcons = 0;
				
				for (var i = 1; i <= 4; i++)
				{
					if (tmpMap["marker" + i])
						numIcons++;
				}

				var iconX = -7.5 * numIcons - 2 * (numIcons - 1);
				
				for (var i = 1; i <= numIcons; i++)
				{
					switch(tmpMap["marker" + i])
					{
						case "bpmn_marker_closed":
							var item1 = new mxCell('', new mxGeometry(0.5, 1, 15, 15), 'shape=plus;part=1;');
							item1.geometry.offset = new mxPoint(iconX, -20);
							break;
						case "bpmn_marker_open":
							var item1 = new mxCell('', new mxGeometry(0.5, 1, 15, 15), 'shape=rect;part=1;');
							item1.geometry.offset = new mxPoint(iconX, -20);
							var item2 = new mxCell('', new mxGeometry(0.5, 0.5, 8, 1), 'shape=rect;part=1;');
							item2.geometry.offset = new mxPoint(-4, -1);
							item2.geometry.relative = true;
							item2.vertex = true;
							item1.insert(item2);
							break;
						case "bpmn_marker_loop":
							var item1 = new mxCell('', new mxGeometry(0.5, 1, 15, 15), 'shape=mxgraph.bpmn.loop;part=1;');
							item1.geometry.offset = new mxPoint(iconX, -20);
							break;
						case "bpmn_marker_parallel":
							var item1 = new mxCell('', new mxGeometry(0.5, 1, 15, 15), 'shape=parallelMarker;part=1;');
							item1.geometry.offset = new mxPoint(iconX, -20);
							break;
						case "bpmn_marker_sequential":
							var item1 = new mxCell('', new mxGeometry(0.5, 1, 15, 15), 'shape=parallelMarker;direction=south;part=1;');
							item1.geometry.offset = new mxPoint(iconX, -20);
							break;
						case "bpmn_marker_ad_hoc":
							var item1 = new mxCell('', new mxGeometry(0.5, 1, 15, 10), 'shape=mxgraph.bpmn.ad_hoc;strokeColor=none;flipH=1;part=1;fillColor=#000000');
							item1.geometry.offset = new mxPoint(iconX, -17);
							break;
						case "bpmn_marker_compensation":
							var item1 = new mxCell('', new mxGeometry(0.5, 1, 15, 11), 'shape=mxgraph.bpmn.compensation;part=1;');
							item1.geometry.offset = new mxPoint(iconX, -18);
							break;
					}
					item1.geometry.relative = true;
					item1.vertex = true;
					node.insert(item1);
					iconX += 20;
				}
			break;
			case "js:table":
				//TODO we need 2 passes to find the exact shift of columns/rows especially when there is rows inside rows
				//TODO Internal table strokes needs to match table strokeWidth and only be on one side
				//TODO code optimization
				styleMap["shape"] = "swimlane;collapsible=0;swimlaneLine=0";
				var tableObj = mlStyleObj["yjs:TableNodeStyle"] || mlStyleObj["demotablestyle:DemoTableStyle"];
				
				if (!tableObj && mlStyleObj["bpmn:PoolNodeStyle"])
				{
					tableObj = mlStyleObj["bpmn:PoolNodeStyle"]["yjs:TableNodeStyle"];
				}
				
//				console.log(tableObj);
				
				this.mapObject(tableObj, {
					"backgroundStyle.demotablestyle:TableBackgroundStyle": {
						"insetFill.yjs:SolidColorFill.color.yjs:Color.value": {key: "fillColor", mod: "color"},
						"tableBackgroundFill.yjs:SolidColorFill.color.yjs:Color.value": {key: "swimlaneFillColor", mod: "color"},
						"tableBackgroundStroke.yjs:Stroke":{
							"fill": {key: "strokeColor", mod: "color"},
							"thickness": "strokeWidth" 
						}
					},
					"backgroundStyle.yjs:ShapeNodeStyle.fill": {key: "fillColor", mod: "color"},
					"backgroundStyle.yjs:ShapeNodeStyle.fill.yjs:SolidColorFill.color": {key: "fillColor", mod: "color"}
				}, styleMap);
				
				//Lane fill color is the same as the fill color
				styleMap["swimlaneFillColor"] = styleMap["fillColor"];
				
				tableObj = tableObj["table"]["y:Table"];
				
				var x = 0, y = 0, xShift = {x: 0}, yShift = 0;
				var insets = tableObj["Insets"];
				
				if (insets)
				{
					insets = insets.split(',');
					
					if (insets[0] != "0")
					{
						styleMap["startSize"] = insets[0];
						xShift.x = parseFloat(insets[0]);
						//x += xShift.x;						
						styleMap["horizontal"] = "0";
					} 
					else if (insets[1] != "0")
					{
						styleMap["startSize"] = insets[1];
						yShift = parseFloat(insets[1]); 
						y += yShift;
					}
				}
				else
				{
					styleMap["startSize"] = "0";
				}
				
				var defRowStyle = {};
				
				var rowMapping = {
					"Insets": function(val, map)
					{
						map["startSize"] = val.split(',')[0];
					},
					"Style.bpmn:AlternatingLeafStripeStyle": {
						"evenLeafDescriptor.bpmn:StripeDescriptor": {
							"insetFill": {key: "evenFill", mod: "color"},
							"backgroundFill": {key: "evenLaneFill", mod: "color"}
						},
						"oddLeafDescriptor.bpmn:StripeDescriptor": {
							"insetFill": {key: "oddFill", mod: "color"},
							"backgroundFill": {key: "oddLaneFill", mod: "color"}
						}
						//parentDescriptor ??
						//TODO collect common types in a special mapping hash
					},
					"Style.yjs:NodeStyleStripeStyleAdapter":{
						"demotablestyle:DemoStripeStyle": {
							"stripeInsetFill.yjs:SolidColorFill.color.yjs:Color.value": {key: "fillColor", mod: "color"},
							"tableLineFill.yjs:SolidColorFill.color.yjs:Color.value": {key: "strokeColor", mod: "color"}
						},
						"yjs:ShapeNodeStyle": {
							"fill": {key: "swimlaneFillColor", mod: "color"}
						}
					},
					"Size": "height"
				};
				this.mapObject(tableObj["RowDefaults"], {
					"defaults": {
						"shape": "swimlane;collapsible=0;horizontal=0",
						"startSize": "0"
					},
					"y:StripeDefaults": rowMapping
				}, defRowStyle);

				var defColStyle = {};
				
				var colMapping = {
					"Insets": function(val, map)
					{
						map["startSize"] = val.split(',')[1];
					},
					"Style.bpmn:AlternatingLeafStripeStyle": {
						"evenLeafDescriptor.bpmn:StripeDescriptor": {
							"insetFill": {key: "evenFill", mod: "color"},
							"backgroundFill": {key: "evenLaneFill", mod: "color"}
						},
						"oddLeafDescriptor.bpmn:StripeDescriptor": {
							"insetFill": {key: "oddFill", mod: "color"},
							"backgroundFill": {key: "oddLaneFill", mod: "color"}
						}
						//parentDescriptor ??
						//TODO collect common types in a special mapping hash
					},
					"Style.yjs:NodeStyleStripeStyleAdapter":{
						"demotablestyle:DemoStripeStyle": {
							"stripeInsetFill.yjs:SolidColorFill.color.yjs:Color.value": {key: "fillColor", mod: "color"},
							"tableLineFill.yjs:SolidColorFill.color.yjs:Color.value": {key: "strokeColor", mod: "color"}
						},
						"yjs:ShapeNodeStyle": {
							"fill": {key: "swimlaneFillColor", mod: "color"}
						}
					},
					"Size": "width"
				};
				
				this.mapObject(tableObj["ColumnDefaults"], {
					"defaults": {
						"shape": "swimlane;collapsible=0",
						"startSize": "0",
						"fillColor": "none"
					},
					"y:StripeDefaults": colMapping
				}, defColStyle);

				var pGeo = node.geometry;
				
				var rows = tableObj["Rows"]["y:Row"];
				y += parseFloat(defColStyle["startSize"]);
				
				var maxX = xShift.x;
				var initX = xShift.x;
				xShift.lx = xShift.x;
				
				//TODO We need two passes to determine the header size!
				if (rows)
				{
					if (!(rows instanceof Array))
						rows = [rows];
					
					for (var i = 0; i < rows.length; i++)
					{
						xShift.x = initX;
						xShift.lx = initX;
						y = this.addRow(rows[i], node, (i & 1), y, xShift, rowMapping, defRowStyle);
						maxX = Math.max(xShift.x, maxX);
					}
				}

				var columns = tableObj["Columns"]["y:Column"];
				x = maxX;//parseFloat(defRowStyle["startSize"]);
				
				if (columns)
				{
					if (!(columns instanceof Array))
						columns = [columns];
					
					for (var i = 0; i < columns.length; i++)
					{
						x = this.addColumn(columns[i], node, (i & 1), x, yShift, colMapping, defColStyle);
					}
				}
				
			break;
			case "js:table2":
				styleMap["shape"] = "swimlane;collapsible=0;swimlaneLine=0";
//				console.log(mlStyleObj);
				var tmpMap = {};
				this.mapObject(mlStyleObj, {
					"y:TableNode": {
						"y:StyleProperties.y:Property": {
							"yed.table.section.color": {key: "secColor", mod: "color"},
							"yed.table.header.height": "headerH",
							"yed.table.header.color.main": {key: "headerColor", mod: "color"},
							"yed.table.header.color.alternating": {key: "headerColorAlt", mod: "color"},
							"yed.table.lane.color.main": {key: "laneColor", mod: "color"},
							"yed.table.lane.color.alternating": {key: "laneColorAlt", mod: "color"},
							"yed.table.lane.style": "laneStyle",
							"com.yworks.bpmn.type": "isHorz",
							"POOL_LANE_COLOR_ALTERNATING": {key: "laneColorAlt", mod: "color"},
							"POOL_LANE_COLOR_MAIN": {key: "laneColor", mod: "color"},
							"POOL_LANE_STYLE": "laneStyle",
							"POOL_HEADER_COLOR_MAIN": {key: "headerColor", mod: "color"},
							"POOL_HEADER_COLOR_ALTERNATING": {key: "headerColorAlt", mod: "color"},
							"POOL_TABLE_SECTION_COLOR": {key: "secColor", mod: "color"}
//							//Not Used!
//							"y.view.tabular.TableNodePainter.ALTERNATE_ROW_STYLE": {
//								"y:SimpleStyle": {
//									"fillColor": {key: "rowAltFillColor", mod: "color"},
//									"lineColor": {key: "rowAltLineColor", mod: "color"},
//									"lineType": "rowAltlineType",
//									"lineWidth": "rowAltlineWidth"
//								}
//							},
//							"y.view.tabular.TableNodePainter.ALTERNATE_COLUMN_STYLE": {
//								"y:SimpleStyle": {
//									"fillColor": {key: "colAltFillColor", mod: "color"},
//									"lineColor": {key: "colAltLineColor", mod: "color"},
//									"lineType": "colAltlineType",
//									"lineWidth": "colAltlineWidth"
//								}
//							}
						},
						"y:Table": {
							"y:DefaultColumnInsets.top": "colHHeight",
							"y:DefaultRowInsets.left": "rowHWidth",
							"y:Insets": {
								"top": "tblHHeight",
								"left": "tblHWidth"
							}
						}
					}
				}, tmpMap);

				styleMap["swimlaneFillColor"] = styleMap["fillColor"];
				
				var isHor = tmpMap["isHorz"] == "pool_type_lane_and_column"
					|| tmpMap["isHorz"] == "pool_type_empty"
					|| tmpMap["isHorz"] == "pool_type_lane";

				var th = 0, tw = 0;
				if (isHor)
				{
					tw = parseFloat(tmpMap["tblHWidth"]);
				}
				else
				{
					th = parseFloat(tmpMap["tblHHeight"]);
				}
				
				styleMap["startSize"] = th? th : tw;
				//Assumptions: There is always rows and cols in every table
				//Also all tables seems to be not rotated
				try 
				{
					var rows = mlStyleObj["y:TableNode"]["y:Table"]["y:Rows"]["y:Row"];
					var cols = mlStyleObj["y:TableNode"]["y:Table"]["y:Columns"]["y:Column"];
					
					var atts4Rows = tmpMap["laneStyle"] == "lane.style.rows" || tmpMap["laneStyle"] == "lane_style_rows";
					
					if (!(rows instanceof Array))
						rows = [rows];
					
					if (!(cols instanceof Array))
						cols = [cols];
					
					var rowStartSize = parseFloat(tmpMap["rowHWidth"]);
					for (var i = 0; i < rows.length; i++)
					{
						if (rows[i]["y:Insets"])
							rowStartSize = Math.max(rowStartSize, 
									parseFloat(rows[i]["y:Insets"]["left"]) + parseFloat(rows[i]["y:Insets"]["right"]));
					}
					
					var colStartSize = parseFloat(tmpMap["colHHeight"]);
					for (var i = 0; i < cols.length; i++)
					{
						if (cols[i]["y:Insets"])
							colStartSize = Math.max(colStartSize, 
									parseFloat(cols[i]["y:Insets"]["top"]) + parseFloat(cols[i]["y:Insets"]["bottom"]));
					}
					
					if (atts4Rows)
					{
						this.addTbl2Rows(node, rows, th, tw, rowStartSize, colStartSize, atts4Rows, tmpMap);
						this.addTbl2Cols(node, cols, th, tw, rowStartSize, colStartSize, atts4Rows, tmpMap);
					}
					else
					{
						this.addTbl2Cols(node, cols, th, tw, rowStartSize, colStartSize, atts4Rows, tmpMap);
						this.addTbl2Rows(node, rows, th, tw, rowStartSize, colStartSize, atts4Rows, tmpMap);
					}
				}
				catch(e)
				{
					//nothing!
				}
			break;
			case "js:relationship_big_entity":
				styleMap['shape'] = "swimlane;startSize=30;rounded=1;arcSize=5;collapsible=0";
				var fill = mlStyleObj["y:GenericNode"]["y:Fill"]; 
				
				if (fill) 
				{
					styleMap['fillColor'] = fill["color2"];
					styleMap['swimlaneFillColor'] = fill["color"];
				}
			break;
			case "js:relationship_attribute":
				if (styleMap["double"] == "1")
				{
					styleMap['shape'] = "doubleEllipse";
				}
				else
				{
					styleMap['shape'] = "ellipse";
				}
			break;
		}
		
		if (shape.indexOf("Shadow") > 0) 
		{
			styleMap["shadow"] = "1";
		}
	}
};

mxGraphMlCodec.prototype.addTbl2Rows = function(node, rows, th, tw, rowStartSize, colStartSize, atts4Rows, tmpMap) 
{
	var y = th + colStartSize; 
	var isBPMN = tmpMap["isHorz"] != null;
	
	for (var i = 0; i < rows.length; i++)
	{
		var odd = i & 1;
		var cell = new mxCell();
		cell.vertex = true;
		var rowStyle = {
			"shape": "swimlane;collapsible=0;horizontal=0",
			"startSize": rowStartSize,
			"fillColor": tmpMap["secColor"] || "none",
			"swimlaneLine": (isBPMN? "0" : "1")
		};
		
		if (parseFloat(rowStyle["startSize"]) == 0)
		{
			rowStyle["fillColor"] = "none";
			rowStyle["swimlaneLine"] = "0";
		}
		
		if (atts4Rows)
		{
			var fillColor = odd? tmpMap["headerColorAlt"] : tmpMap["headerColor"];
			rowStyle["swimlaneFillColor"] = odd? tmpMap["laneColorAlt"] : tmpMap["laneColor"];
			rowStyle["fillColor"] = fillColor? fillColor : rowStyle["swimlaneFillColor"];
		}
		
		var height = parseFloat(rows[i]["height"]);
		var dh = (isBPMN && i == 0)? colStartSize : 0 ;
		cell.geometry = new mxGeometry(tw, y - dh, node.geometry.width - tw, height + dh);
		y += height;
		
//		if (lblObj)
//			this.addLabels(cell, lblObj, rowStyle)
		
		cell.style = this.styleMap2Str(rowStyle);
		node.insert(cell);
	}	
};

mxGraphMlCodec.prototype.addTbl2Cols = function(node, cols, th, tw, rowStartSize, colStartSize, atts4Rows, tmpMap) 
{
	var x = rowStartSize + tw;
	var isBPMN = tmpMap["isHorz"] != null;
	
	for (var i = 0; i < cols.length; i++)
	{
		var odd = i & 1;
		var cell = new mxCell();
		cell.vertex = true;
		var colStyle = {
			"shape": "swimlane;collapsible=0",
			"startSize": colStartSize,
			"fillColor": tmpMap["secColor"] || "none",
			"swimlaneLine": (isBPMN? "0" : "1")
		};
		
		if (parseFloat(colStyle["startSize"]) == 0)
		{
			colStyle["fillColor"] = "none";
		}
		
		if (!atts4Rows)
		{
			var fillColor = odd? tmpMap["headerColorAlt"] : tmpMap["headerColor"];
			colStyle["swimlaneFillColor"] = odd? tmpMap["laneColorAlt"] : tmpMap["laneColor"];
			colStyle["fillColor"] = fillColor? fillColor : colStyle["swimlaneFillColor"];
		}
		
		var width = parseFloat(cols[i]["width"]);
		var dw = (isBPMN && i == 0)? rowStartSize : 0 ;
		cell.geometry = new mxGeometry(x - dw, th, width + dw, node.geometry.height - th);
		x += width;
		
//		if (lblObj)
//			this.addLabels(cell, lblObj, rowStyle)
		
		cell.style = this.styleMap2Str(colStyle);
		node.insert(cell);
	}
};

mxGraphMlCodec.prototype.addRow = function(row, parent, odd, y, xShift, rowMapping, defRowStyle)
{
	var cell = new mxCell();
	cell.vertex = true;
	var rowStyle = mxUtils.clone(defRowStyle);
	this.mapObject(row, rowMapping, rowStyle);
	
	if (odd)
	{
		if (rowStyle["oddFill"]) 
			rowStyle["fillColor"] = rowStyle["oddFill"];

		if (rowStyle["oddLaneFill"])
			rowStyle["swimlaneFillColor"] = rowStyle["oddLaneFill"];
	}
	else
	{
		if (rowStyle["evenFill"]) 
			rowStyle["fillColor"] = rowStyle["evenFill"];
		
		if (rowStyle["evenLaneFill"])
			rowStyle["swimlaneFillColor"] = rowStyle["evenLaneFill"];
	}
	
	var height = parseFloat(rowStyle["height"]);
	cell.geometry = new mxGeometry(xShift.lx, y, parent.geometry.width - xShift.lx, height);

	var lblObj = row["Labels"];
	
	if (lblObj)
		this.addLabels(cell, lblObj, rowStyle)
	
	cell.style = this.styleMap2Str(rowStyle);
	parent.insert(cell);
	
	var subRow = row["y:Row"];

	xShift.lx = 0;
	if (rowStyle["startSize"])
	{
		xShift.lx = parseFloat(rowStyle["startSize"]);
		xShift.x += xShift.lx;
	}
	
	var initX = xShift.x, maxX = xShift.x, initLx = xShift.lx;
	var subY = 0;
	if (subRow)
	{
		if (!(subRow instanceof Array))
			subRow = [subRow];
		
		for (var i = 0; i < subRow.length; i++)
		{
			xShift.x = initX;
			xShift.lx = initLx;
			subY = this.addRow(subRow[i], cell, (i & 1), subY, xShift, rowMapping, defRowStyle);
			maxX = Math.max(xShift.x, maxX) 
		}
	}
	xShift.x = maxX;
	height = Math.max(height, subY);
	cell.geometry.height = height;
	y += height;

	return y;
}

mxGraphMlCodec.prototype.addColumn = function(column, parent, odd, x, yShift, colMapping, defColStyle)
{
	var cell = new mxCell();
	cell.vertex = true;
	var colStyle = mxUtils.clone(defColStyle);
	this.mapObject(column, colMapping, colStyle);
	
	if (odd)
	{
		if (colStyle["oddFill"]) 
			colStyle["fillColor"] = colStyle["oddFill"];
		
		if (colStyle["oddLaneFill"])
			colStyle["swimlaneFillColor"] = colStyle["oddLaneFill"];
	}
	else
	{
		if (colStyle["evenFill"]) 
			colStyle["fillColor"] = colStyle["evenFill"];
		
		if (colStyle["evenLaneFill"])
			colStyle["swimlaneFillColor"] = colStyle["evenLaneFill"];
	}

	var width = parseFloat(colStyle["width"]);
	cell.geometry = new mxGeometry(x, yShift, width, parent.geometry.height - yShift);

	var lblObj = column["Labels"];
	
	if (lblObj)
		this.addLabels(cell, lblObj, colStyle)

	cell.style = this.styleMap2Str(colStyle);
	parent.insert(cell);
	
	var subCol = column["y:Column"];
	
	var subX = 0;
	if (subCol)
	{
		if (!(subCol instanceof Array))
			subCol = [subCol];
		
		for (var i = 0; i < subCol.length; i++)
		{
			subX = this.addColumn(subCol[i], cell, (i & 1), subX, yShift, colMapping, defColStyle);
		}
	}
	width = Math.max(width, subX);
	cell.geometry.width = width;
	x += width;
	return x;
}

mxGraphMlCodec.prototype.handleFixedRatio = function (node, styleMap)
{
	var shape = styleMap["shape"];
	var geo = node.geometry;
	
	if (shape && geo)
	{
		if (shape.indexOf(";aspect=fixed") > 0) 
		{
			
			var min = Math.min(geo.height, geo.width);
			
			if (min == geo.height) //fix coordinates
			{
				geo.x += (geo.width - min) / 2;
			}
			
			geo.height = min;
			geo.width = min;
		}
		else if (shape.indexOf(";rotation=90") > 0 || shape.indexOf(";rotation=-90") > 0 )
		{
			var h = geo.height;
			var w = geo.width;
			geo.height = w;
			geo.width = h;
			var diff = (h - w) / 2;
			geo.x -= diff;
			geo.y += diff;
		}
	}
};

mxGraphMlCodec.prototype.addNodeGeo = function (node, geoObj, dx, dy) 
{
	var geoRect = geoObj[mxGraphMlConstants.RECT];

	var x = 0, y = 0, w = 30, h = 30; //some node has no geometry, this is the default
	if (geoRect)
	{
		x = geoRect[mxGraphMlConstants.X];
		y = geoRect[mxGraphMlConstants.Y];
		w = geoRect[mxGraphMlConstants.WIDTH];
		h = geoRect[mxGraphMlConstants.HEIGHT];
	}
	else
	{
		x = geoObj[mxGraphMlConstants.X_L] || x;
		y = geoObj[mxGraphMlConstants.Y_L] || y;
		w = geoObj[mxGraphMlConstants.WIDTH_L] || w;
		h = geoObj[mxGraphMlConstants.HEIGHT_L] || h;
	}
	
	var geo = node.geometry;
	geo.x = parseFloat(x) - dx;
	geo.y = parseFloat(y) - dy;
	geo.width = parseFloat(w);
	geo.height = parseFloat(h);
};

//TODO handle other ports cases
mxGraphMlCodec.prototype.importEdge = function (edgeElement, graph, parent, dx, dy)
{
	var data = this.getDirectChildNamedElements(edgeElement, mxGraphMlConstants.DATA);
	var e;
	var id = edgeElement.getAttribute(mxGraphMlConstants.ID);
	var srcId = edgeElement.getAttribute(mxGraphMlConstants.EDGE_SOURCE);
	var trgId = edgeElement.getAttribute(mxGraphMlConstants.EDGE_TARGET);
	var srcPortId = edgeElement.getAttribute(mxGraphMlConstants.EDGE_SOURCE_PORT);
	var trgPortId = edgeElement.getAttribute(mxGraphMlConstants.EDGE_TARGET_PORT);
	
	var src = this.nodesMap[srcId];
	var trg = this.nodesMap[trgId];
	
	var edge = graph.insertEdge(parent, null, "", src.node, trg.node, "graphMLId=" + id);
	var style = {graphMlID: id};
	
	for (var i = 0; i < data.length; i++)
	{
		var d = data[i];
		var dataObj = this.dataElem2Obj(d);
		var desktopEdgeObj = dataObj["y:PolyLineEdge"] || dataObj["y:GenericEdge"] || 
							dataObj["y:ArcEdge"] || dataObj["y:BezierEdge"] || 
							dataObj["y:QuadCurveEdge"] || dataObj["y:SplineEdge"];
		
		if (dataObj.key == this.edgesKeys[mxGraphMlConstants.EDGE_GEOMETRY].key) 
		{
			this.addEdgeGeo(edge, dataObj, dx, dy);
		} 
		else if (dataObj.key == this.edgesKeys[mxGraphMlConstants.EDGE_STYLE].key) 
		{
//			console.log(dataObj);
			this.addEdgeStyle(edge, dataObj, style);
		}
		else if (dataObj.key == this.edgesKeys[mxGraphMlConstants.EDGE_LABELS].key) 
		{
			this.addLabels(edge, dataObj, style, graph);
		}
		else if (desktopEdgeObj)
		{
			this.addEdgeStyle(edge, dataObj, style);
			var absPoints = this.addEdgePath(edge, desktopEdgeObj["y:Path"], style, dx, dy);
			
			if (desktopEdgeObj["y:EdgeLabel"])
				this.addLabels(edge, desktopEdgeObj["y:EdgeLabel"], style, graph, absPoints);
			
			//special case for link edge
			//TODO link doesn't support arrow head types
			if (style["shape"] != null && style["shape"].indexOf("link") == 0)
			{
				style["width"] = style["strokeWidth"];
				style["strokeWidth"] = 1;
			}
		}
	}
	
	//handle simple ports (exit/entry[X/Y])
	if (src.ports && srcPortId)
	{
		var srcPort = src.ports[srcPortId];
		
		if (srcPort.pos)
		{
			style["exitX"] = srcPort.pos.x;
			style["exitY"] = srcPort.pos.y;
		}
	}

	if (trg.ports && trgPortId)
	{
		var trgPort = trg.ports[trgPortId];
		
		if (trgPort.pos)
		{
			style["entryX"] = trgPort.pos.x;
			style["entryY"] = trgPort.pos.y;
		}
	}

	edge.style = this.styleMap2Str(style);

	return edge;
};

mxGraphMlCodec.prototype.addEdgeGeo = function (edge, geoObj, dx, dy) 
{
	var list = geoObj[mxGraphMlConstants.Y_BEND];
	
	if (list)
	{
		var points = [];
		
		for (var i = 0; i < list.length; i++) {
			var pointStr = list[i][mxGraphMlConstants.LOCATION];
			
			if (pointStr) {
				var xy = pointStr.split(',');
				points.push(new mxPoint(parseFloat(xy[0]) - dx, parseFloat(xy[1]) - dy));
			}
		}
		
		edge.geometry.points = points;
	}
};

mxGraphMlCodec.prototype.addEdgePath = function (edge, pathObj, style, dx, dy) 
{
	var absPoints = [];
	if (pathObj)
	{
		var srcX = parseFloat(pathObj.sx), srcY = parseFloat(pathObj.sy),
				trgX = parseFloat(pathObj.tx), trgY = parseFloat(pathObj.ty);
		
		var srcGeo = edge.source.geometry;
		if (srcX != 0 || srcY != 0)
		{
			style["exitX"] = (srcX + srcGeo.width/2) / srcGeo.width;
			style["exitY"] = (srcY + srcGeo.height/2) / srcGeo.height;
			absPoints.push(new mxPoint(srcGeo.x + style["exitX"] * srcGeo.width - dx, srcGeo.y + style["exitY"] * srcGeo.height - dy));
		}
		else 
		{
			absPoints.push(new mxPoint(srcGeo.x + srcGeo.width/2 - dx, srcGeo.y + srcGeo.height/2 - dy));
		}

		var endP = null;
		var trgGeo = edge.target.geometry;
		if (trgX != 0 || trgY != 0)
		{
			style["entryX"] = (trgX + trgGeo.width/2) / trgGeo.width;
			style["entryY"] = (trgY + trgGeo.height/2) / trgGeo.height;
			endP = new mxPoint(trgGeo.x + style["entryX"] * trgGeo.width - dx, trgGeo.y + style["entryY"] * trgGeo.height - dy);
		}
		else 
		{
			endP = new mxPoint(trgGeo.x + trgGeo.width/2 - dx, trgGeo.y + trgGeo.height/2 - dy);
		}

		var list = pathObj["y:Point"];
		
		if (list)
		{
			if (!(list instanceof Array)) 
			{
				list = [list];
			}
			
			var points = [];
			
			for (var i = 0; i < list.length; i++) 
			{
				var p = new mxPoint(parseFloat(list[i].x) - dx, parseFloat(list[i].y) - dy)
				points.push(p);
				absPoints.push(p);
			}
			
			edge.geometry.points = points;
		}
		
		absPoints.push(endP);
	}
	return absPoints;
};

//TODO improve similarity handling
mxGraphMlCodec.prototype.addEdgeStyle = function (edge, styleObj, styleMap) 
{
	var dashStyleFn = function(val, map)
	{
		map["dashed"] = 1;
		//map["fixDash"] = 1;
		var pattern = null;
		switch(val)
		{
			case "DashDot":
				pattern = "3 1 1 1";
			break;
			case "Dot":
				pattern = "1 1";
			break;
			case "DashDotDot":
				pattern = "3 1 1 1 1 1";
			break;
			case "Dash":
				pattern = "3 1";
			break;
			default:
				pattern = val.replace(/0/g, '1');
		}
		
		if (pattern)
		{
			//Some patterns in graphML has only one number
			if (pattern.indexOf(" ") < 0) 
			{
				pattern = pattern + " " + pattern;
			}
			map["dashPattern"] = pattern;
		}
	};
	
	var desktopLineStyleFn = function(val, map)
	{
		if (val != "line")
			map["dashed"] = 1;
		
		var pattern = null;
		
		switch(val)
		{
			case "dashed":
				pattern = "3 1";
			break;
			case "dotted":
				pattern = "1 1";
			break;
			case "dashed_dotted":
				pattern = "3 2 1 2";
			break;	
		}
		
		if (pattern)
			map["dashPattern"] = pattern;
	};
	
	// can be mapping to WHITE => empty, BLACK => filled
	var endArrowFill = function(val, map)
	{
		map["endFill"] = (val == 'WHITE' || val.indexOf("white_") == 0 || val.indexOf("transparent_") == 0)? "0" : "1"; 
	};
	// can be mapping to WHITE => empty, BLACK => filled
	var startArrowFill = function(val, map)
	{
		map["startFill"] = (val == 'WHITE' || val.indexOf("white_") == 0 || val.indexOf("transparent_") == 0)? "0" : "1"; 
	};

	var startArrow = function(val, map)
	{
		map["startArrow"] = mxGraphMlArrowsMap[val] || "classic";
		startArrowFill(val, map);
	};
	
	var endArrow = function(val, map)
	{
		map["endArrow"] = mxGraphMlArrowsMap[val] || "classic";
		endArrowFill(val, map);
	}
	
	var desktopEdge = {
		"defaults" : 
		{
			"rounded": 0,
			"endArrow": "none"
		},
		"configuration": {key: "shape", mod: "shape"},
		"y:LineStyle": {
			"color": {key: "strokeColor", mod: "color"},
			"type": desktopLineStyleFn,
			"width": "strokeWidth"
		},
		"y:Arrows": {
			"source": startArrow,
			"target": endArrow
		},
		"y:BendStyle": {
			"smoothed": {key: "rounded", mod: "bool"}
		}
	};
	
	var arcEdgeStyle = mxUtils.clone(desktopEdge);
	arcEdgeStyle["defaults"]["curved"] = "1";
	
	this.mapObject(styleObj, {
		"yjs:PolylineEdgeStyle": {
			"defaults" : 
			{
				"endArrow": "none",
				"rounded": 0
			},
			"smoothingLength": function(val, map)
			{
				map["rounded"] = (val && parseFloat(val) > 0)? "1" : "0"; 
			},
			"stroke": {key: "strokeColor", mod: "color"},
			"stroke.yjs:Stroke":
			{
				"dashStyle": dashStyleFn,
				"dashStyle.yjs:DashStyle.dashes": dashStyleFn,
				"fill": {key: "strokeColor", mod: "color"},
				"fill.yjs:SolidColorFill.color": {key: "strokeColor", mod: "color"},
				//"lineCap": "", //??
				"thickness.sys:Double": "strokeWidth",
				"thickness": "strokeWidth"
			},
			"targetArrow": {key: "endArrow", mod: "arrow"},
			"targetArrow.yjs:Arrow": {
				"defaults" : 
				{
					"endArrow": "classic",
					"endFill": "1",
					"endSize": "6"
				},
//				cropLength: "", //??
				"fill": endArrowFill,
				"scale": {key: "endSize", mod: "scale", scale: 5},
//				stroke: "", //?
				"type": {key: "endArrow", mod: "arrow"}
			},
			"sourceArrow": {key: "startArrow", mod: "arrow"},
			"sourceArrow.yjs:Arrow": {
				"defaults" : 
				{
					"startArrow": "classic",
					"startFill": "1",
					"startSize": "6"
				},
//				cropLength: "", //??
				"fill": startArrowFill,
				"scale": {key: "startSize", mod: "scale", scale: 5},
//				stroke: "", //?
				"type": {key: "startArrow", mod: "arrow"}
			}
		},
		"y:PolyLineEdge": desktopEdge,
		"y:GenericEdge": desktopEdge,
		//We approximate all curved types with curve
		"y:ArcEdge": arcEdgeStyle,
		"y:BezierEdge": arcEdgeStyle,
		"y:QuadCurveEdge": arcEdgeStyle,
		"y:SplineEdge": arcEdgeStyle
	}, styleMap);
};

//TODO label offset
//TODO labels object is over swim lanes collapse button
mxGraphMlCodec.prototype.addLabels = function (node, lblObj, nodeStyle, graph, absPoints) 
{
	var lastChildIndex = node.getChildCount();
	var lblList = lblObj[mxGraphMlConstants.Y_LABEL] || lblObj;
	
	var lblTxts = [];
	var lblStyles = [];
	var lblLayouts = [];
	
	if (lblList)
	{
		if (!(lblList instanceof Array)) 
		{
			lblList = [lblList];
		}
		
		for (var i = 0; i < lblList.length; i++)
		{
			var lbl = lblList[i];
//			console.log(lbl);
			var styleMap = {};
			var txt = lbl[mxGraphMlConstants.TEXT] || lbl;
			
			if (txt) txt = txt["#text"];
			
			//layout
			var layout = lbl[mxGraphMlConstants.LAYOUTPARAMETER] || lbl || {};
			
			//style
			var fontStyleFn = function(val, map) 
			{
				if (val)
				{
					val = val.toUpperCase();
				}
				
				var style = map["fontStyle"] || 0;
				
				switch(val)
				{
					case "ITALIC":
						style = style | 2;
					break;
					case "BOLD":
						style = style | 1;
					break;
					case "UNDERLINE":
						style = style | 4;
					break;
				}
				map["fontStyle"] = style;
			};

			var underlineStyleFn = function(val, map) 
			{
				var style = map["fontStyle"] || 0;
				
				if (val == "true")
				{
					style = style | 4;
				}
				map["fontStyle"] = style;
			};

			this.mapObject(lbl, {
				"Style.yjs:DefaultLabelStyle":
					{
						"backgroundFill" : {key: "labelBackgroundColor", mod: "color"},
						"backgroundFill.yjs:SolidColorFill.color" : {key: "labelBackgroundColor", mod: "color"},
						"backgroundStroke" : {key: "labelBorderColor", mod: "color"},
						"backgroundStroke.yjs:Stroke.fill" : {key: "labelBorderColor", mod: "color"},
						"textFill": {key: "fontColor", mod: "color"},
						"textFill.yjs:SolidColorFill.color": {key: "fontColor", mod: "color"},
						"textSize": "fontSize",
						"horizontalTextAlignment": "align",
						"verticalTextAlignment": "verticalAlign",
						"wrapping": function(val, map) 
						{
							//TODO mxGraph has a single type of wrapping only
							if (val)
								map["whiteSpace"] = "wrap";
						},
						"font.yjs:Font": 
							{
								"fontFamily": "fontFamily",
								"fontSize": "fontSize",
								"fontStyle": fontStyleFn,
								"fontWeight": fontStyleFn,
								"textDecoration": fontStyleFn
							}
					},
				"Style.y:VoidLabelStyle": function (val, map)
					{
						map["VoidLbl"] = true;
					},
				//Desktop format
					//hasBackgroundColor="false" hasLineColor="false" hasText="false" height="4.0" iconTextGap="4" modelName="custom" visible="true" width="4.0" x="26.277050018310547" y="70.76200103759766">
				"alignment": "align",
				//"autoSizePolicy": "",//??
				"fontFamily": "fontFamily",
				"fontSize": "fontSize",
				"fontStyle": fontStyleFn,
				"underlinedText": underlineStyleFn,
				"horizontalTextPosition": "",//?? how this is compared to alignment?
				"textColor": {key: "fontColor", mod: "color"},
				"verticalTextPosition": "verticalAlign",
				"hasText": {key: "hasText", mod: "bool"},
				"rotationAngle": "rotation"
			}, styleMap);

			if (!styleMap["VoidLbl"] && styleMap["hasText"] != "0")
			{
				lblTxts.push(txt);
				lblStyles.push(styleMap);
				lblLayouts.push(layout);
			}
		}
	}
	
	//TODO Use the style map with defaults to change the style
	for (var i = 0; i < lblTxts.length; i++)
	{
		if (lblTxts[i])
		{
			if (lblLayouts[i] && lblLayouts[i]["bpmn:ParticipantParameter"])
				continue;
			
			lblTxts[i] = mxUtils.htmlEntities(lblTxts[i], false).replace(/\n/g, '<br/>');
			var geo = node.geometry;

			var lblCell = new mxCell(lblTxts[i], new mxGeometry(0, 0, geo.width, geo.height), 'text;html=1;spacing=0;' + this.styleMap2Str(lblStyles[i]));
			lblCell.vertex = true;
			node.insert(lblCell, lastChildIndex);
			var lGeo = lblCell.geometry;

//			console.log(lblTxts[i]);
//			console.log(lblLayouts[i]);
			
			if (lblLayouts[i]["y:RatioAnchoredLabelModelParameter"])
			{
				var strSize = mxUtils.getSizeForString(lblTxts[i], lblStyles[i]["fontSize"], lblStyles[i]["fontFamily"]);
				var offsetStr = lblLayouts[i]["y:RatioAnchoredLabelModelParameter"]["LayoutOffset"];
				
				if (offsetStr)
				{
					var parts = offsetStr.split(',');
					lGeo.x = parseFloat(parts[0]);
					lGeo.y = parseFloat(parts[1]);
					lGeo.width = strSize.width;
					lGeo.height = strSize.height;
					lblCell.style += ";spacingTop=-4;";
				}
				else
				{
					//TODO map there?
					var lblRatio = lblLayouts[i]["y:RatioAnchoredLabelModelParameter"]["LabelRatio"];
					var layoutRatio = lblLayouts[i]["y:RatioAnchoredLabelModelParameter"]["LayoutRatio"];
					
					lblCell.style += ";align=center;";
				}
			}
			else if (lblLayouts[i]["y:InteriorLabelModel"]) //TODO this is probably can be done by setting the value?
			{
				//TODO merge with next one if they are identical in all cases!
				switch (lblLayouts[i]["y:InteriorLabelModel"])
				{
					case "Center":
						lblCell.style += ";verticalAlign=middle;";
					break;
					case "North":
						lGeo.height = 1;
					break;
					case "West":
						lGeo.width = geo.height;
						lGeo.height = geo.width;
						//-90 rotation of origin
						lGeo.y = geo.height /2 - geo.width /2;
						lGeo.x = -lGeo.y;
						lblCell.style += ";rotation=-90";
					break;
				}
				lblCell.style += ";align=center;";
			}
			//TODO Spacing still need to be adjusted
			else if (lblLayouts[i]["y:StretchStripeLabelModel"] || lblLayouts[i]["y:StripeLabelModelParameter"])
			{
				//TODO merge with previous one if they are identical in all cases!
				var dir = lblLayouts[i]["y:StretchStripeLabelModel"] || lblLayouts[i]["y:StripeLabelModelParameter"]["Position"];
				switch (dir)
				{
					case "North":
						lGeo.height = 1;
					break;
					case "West":
						lGeo.width = geo.height;
						lGeo.height = geo.width;
						//-90 rotation of origin
						lGeo.y = geo.height /2 - geo.width /2;
						lGeo.x = -lGeo.y;
						lblCell.style += ";rotation=-90;";
					break;
				}
			}
			else if (lblLayouts[i]["bpmn:PoolHeaderLabelModel"])
			{
				//TODO merge with previous one if they are identical in all cases!
				switch (lblLayouts[i]["bpmn:PoolHeaderLabelModel"])
				{
					case "NORTH":
						lGeo.height = 1;
					break;
					case "WEST":
						lGeo.width = geo.height;
						lGeo.height = geo.width;
						//-90 rotation of origin
						lGeo.y = geo.height /2 - geo.width /2;
						lGeo.x = -lGeo.y;
						lblCell.style += ";rotation=-90;";
					break;
				}
				lblCell.style += ";align=center;";
			}
			else if (lblLayouts[i]["y:InteriorStretchLabelModelParameter"])
			{
				//TODO probably mapObject is needed in this method in general
				try {
					var insets = lblLayouts[i]["y:InteriorStretchLabelModelParameter"]["Model"]["y:InteriorStretchLabelModel"]["Insets"];
					//TODO how to map it?
				} catch(e) {
					//Ignore
				}
				lblCell.style += ";align=center;";
			}
			else if (lblLayouts[i]["y:ExteriorLabelModel"])
			{
				var lblPos;
				switch (lblLayouts[i]["y:ExteriorLabelModel"])
				{
					case "East":
						lblCell.style += ";labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=middle;";
					break;
					case "South":
						lblCell.style += ";labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;";
					break;
					case "North":
						lblCell.style += ";labelPosition=center;verticalLabelPosition=top;align=center;verticalAlign=bottom;"
					break;
					case "West":
						lblCell.style += ";labelPosition=left;verticalLabelPosition=middle;align=right;verticalAlign=middle;";
					break;
				}
			}
			else if (lblLayouts[i]["y:FreeEdgeLabelModelParameter"])
			{
				lGeo.relative = true;
				lGeo.adjustIt = true;
				var layout = lblLayouts[i]["y:FreeEdgeLabelModelParameter"];
				var ratio = layout["Ratio"];
				var distance = layout["Distance"];
				var angle = layout["Angle"];

				//The geometry is adjusted after finishing the graph import (in decode method)
				if (ratio)
				{
					lGeo.x = parseFloat(ratio);
				}
				
				if (distance)
				{
					lGeo.y = parseFloat(distance);
				}
				
				if (angle)
				{
					lblCell.style += ";rotation=" + (parseFloat(angle) * (180 / Math.PI));
				}
				
				lblCell.style += ";verticalAlign=middle;";
			}
			else if (lblLayouts[i]["y:EdgePathLabelModelParameter"])
			{
				lGeo.relative = true;
				var layout = lblLayouts[i]["y:EdgePathLabelModelParameter"];
				var side = layout["SideOfEdge"];
				var ratio = layout["SegmentRatio"];

				lGeo.x = ratio? (2 * parseFloat(ratio) - 1) : 0;

				//TODO this is an approximation, it needs to take into consideration the segment direction and label size
				if (side)
				{
					switch(side) 
					{
						case "RightOfEdge":
							lGeo.y = -15;
						break;
						case "LeftOfEdge":
							lGeo.y = 15;
						break;
					}
				}

				lblCell.style += ";verticalAlign=middle;";
				
			}
			else //Desktop format or edge
			{
				var lblX = parseFloat(lblLayouts[i]["x"]),
					lblY = parseFloat(lblLayouts[i]["y"]);
				
				if (lblLayouts[i]["width"]) lGeo.width = parseFloat(lblLayouts[i]["width"]);
				if (lblLayouts[i]["height"]) lGeo.height = parseFloat(lblLayouts[i]["height"]);

				if (node.edge) 
				{
					lGeo.relative = true;
					lGeo.x = 0;
					lGeo.y = 0;
					var dx = node.source.geometry.getCenterX() - node.target.geometry.getCenterX(); 
					var dy = node.source.geometry.getCenterY() - node.target.geometry.getCenterY();
					
					if (graph && absPoints && lblLayouts[i]["y:ModelParameter"] && lblLayouts[i]["y:ModelParameter"]["y:SmartEdgeLabelModelParameter"])
					{
						var layout = lblLayouts[i]["y:ModelParameter"]["y:SmartEdgeLabelModelParameter"];
						var angle = parseFloat(layout.angle), distance = parseFloat(layout.distance), distanceToCenter = layout.distanceToCenter == "true",
							position = layout.position, ratio = parseFloat(layout.ratio), segment = parseFloat(layout.segment);
						
						var eState = new mxCellState();
						eState.absolutePoints = absPoints;
						graph.view.updateEdgeBounds(eState);
						var sign = (position == "left"? 1 : -1);

						if (segment == -1 && angle == 6.283185307179586)
						{
							//TODO FIXME this case is still incorrect
							lGeo.offset = new mxPoint(Math.abs(ratio) < 1? eState.segments[0] * ratio : ratio, sign * distance);
						}
						else 
						{
							if (segment == -1) segment = 0;
							//get the edge cell state to get the segments
							var dist = 0;
							for (var k = 0; k < segment; k++)
							{
								dist += eState.segments[k];
							}
							
							dist += eState.segments[segment] * ratio;
							lGeo.x = 2 * (dist / eState.length) - 1;
							lGeo.y = ((position == "center"? 0 : distance) + lGeo.height/2 * sign * (Math.abs(dx) > Math.abs(dy)? 1 : -1)) * sign;
						}
					}
					else if (!isNaN(lblX) && !isNaN(lblY)) 
					{
						lGeo.offset = new mxPoint(lblX + dx/2 + (dx > 0? -lGeo.width : lGeo.width), lblY);
					}
				}
				else
				{
					lGeo.x = lblX || 0;
					lGeo.y = lblY || 0;
				}
			}
			
			if (lblStyles[i]["rotation"]) 
			{
				//TODO fix label coordinates after rotation 
				//console.log(lGeo, lblStyles[i]["rotation"]);
				if (lblStyles[i]["rotation"] == 270)
				{
					lGeo.x -= lGeo.height/2;
				}
			}
		}
	}
	return {lblTxts: lblTxts, lblStyles: lblStyles};
};


mxGraphMlCodec.prototype.processPage = function (graph, pageIndex)
{
    var codec = new mxCodec();
    var node = codec.encode(graph.getModel());
    node.setAttribute("style", "default-style2");
    var modelString = mxUtils.getXml(node);
    
    var output = "<diagram name=\"Page " + pageIndex + "\">";
    output += Graph.compress(modelString);
    output += "</diagram>";
    return output;

};

//These are the same as mxVsdxUtils functions, but added here to be self-dependent
/**
 * Returns a collection of direct child Elements that match the specified tag name
 * @param {*} parent the parent whose direct children will be processed
 * @param {string} name the child tag name to match
 * @return {*[]} a collection of matching Elements
 */
mxGraphMlCodec.prototype.getDirectChildNamedElements = function (parent, name) {
    var result = ([]);
    for (var child = parent.firstChild; child != null; child = child.nextSibling) {
        if ((child != null && (child.nodeType == 1)) && (name == child.nodeName)) {
            /* add */ result.push(child);
        }
    }
    ;
    return result;
};

mxGraphMlCodec.prototype.getDirectFirstChildNamedElements = function (parent, name) {
    for (var child = parent.firstChild; child != null; child = child.nextSibling) {
        if ((child != null && (child.nodeType == 1)) && (name == child.nodeName)) {
            return child;
        }
    }
    ;
    return null;
};

/**
 * Returns a collection of direct child Elements
 * @param {*} parent the parent whose direct children will be processed
 * @return {*[]} a collection of all child Elements
 */
mxGraphMlCodec.prototype.getDirectChildElements = function (parent) {
    var result = ([]);
    for (var child = parent.firstChild; child != null; child = child.nextSibling) {
        if (child != null && (child.nodeType == 1)) {
            /* add */ result.push(child);
        }
    }
    ;
    return result;
};
/**
 * Returns the first direct child Element
 * @param {*} parent the parent whose direct first child will be processed
 * @return {*} the first child Element
 */
mxGraphMlCodec.prototype.getDirectFirstChildElement = function (parent) {
    for (var child = parent.firstChild; child != null; child = child.nextSibling) {
        if (child != null && (child.nodeType == 1)) {
            return child;
        }
    }
    ;
    return null;
};

var mxGraphMlConverters = //TODO this code is taken from yworks.com. Is that OK?
{
	"orgchartconverters.linebreakconverter": function(e, t) {
		if (typeof e === "string") {
			var i = e;
			while (i.length > 20 && i.indexOf(" ") > -1)
				i = i.substring(0, i.lastIndexOf(" "));
			return t === "true" ? i : e.substring(i.length)
		}
		return ""
	},
	"orgchartconverters.borderconverter": function(e, t) {
		return typeof e === "boolean" ? e ? "#FFBB33" : "rgba(0,0,0,0)" : "#FFF"
	},
	"orgchartconverters.addhashconverter": function(e, t) {
		return typeof e === "string" ? typeof t === "string" ? "#" + e + t : "#" + e : e
	},
	"orgchartconverters.intermediateconverter": function(e, t) {
		return typeof e === "string" && e.length > 17 ? e.replace(/^(.)(\S*)(.*)/, "$1.$3") : e
	},
	"orgchartconverters.overviewconverter": function(e, t) {
		return typeof e === "string" && e.length > 0 ? e.replace(/^(.)(\S*)(.*)/, "$1.$3") : ""
	}
};

var mxGraphMlArrowsMap =
{
	"SIMPLE": "open",
	"TRIANGLE": "block",
	"DIAMOND": "diamond",
	"CIRCLE": "oval",
	"CROSS": "cross",
	"SHORT": "classicThin",
	"DEFAULT": "classic",
	"NONE": "none",
	//desktop
	"none": "none",
	"white_delta_bar": "block", //FIXME not a match
	"delta": "block",
	"standard": "classic",
	"diamond": "diamond",
	"white_diamond": "diamond",
	"white_delta": "block",
	"plain": "open",
	"skewed_dash": "dash",
	"concave": "openThin", //FIXME not exact match
	"transparent_circle": "oval",
	"crows_foot_many": "ERmany",
	"crows_foot_one": "ERone",
	"crows_foot_one_optional": "ERzeroToOne",
	"crows_foot_one_mandatory": "ERmandOne",
	"crows_foot_many_optional": "ERzeroToMany",
	"crows_foot_many_mandatory": "ERoneToMany",
	"white_circle": "oval",
	"t_shape": "ERone", //FIXME not a match
	"short": "classicThin",
	"convex": "", //FIXME not a match
	"cross": "cross"
	
};

var mxGraphMlShapesMap =
{
	"star5": "mxgraph.basic.star;flipV=1", //TODO This is not close enough!
	"star6": "mxgraph.basic.6_point_star",//;rotation=30", //TODO requires rotation!
	"star8": "mxgraph.basic.8_point_star",
	"sheared_rectangle": "parallelogram",
	"sheared_rectangle2": "parallelogram;flipH=1",
	"hexagon": "hexagon",
	"octagon": "mxgraph.basic.octagon",
	"ellipse": "ellipse",
	"round_rectangle": "rect;rounded=1;arcsize=30",
	"diamond": "rhombus",
	"fat_arrow": "step;perimeter=stepPerimeter",
	"fat_arrow2": "step;perimeter=stepPerimeter;flipH=1",
	"trapez": "trapezoid;perimeter=trapezoidPerimeter;flipV=1",
	"trapez2": "trapezoid;perimeter=trapezoidPerimeter",
	"triangle": "triangle",//;rotation=-90", //TODO requires rotation!
	"triangle2": "triangle",//;rotation=90", //TODO requires rotation!
	"rectangle": "rect",
	"rectangle3d": "", //TODO create this shape
	"roundrectangle": "rect;rounded=1;arcsize=30",
	"fatarrow": "step;perimeter=stepPerimeter",
	"fatarrow2": "step;perimeter=stepPerimeter;flipH=1",
	"parallelogram": "parallelogram",
	"parallelogram2": "parallelogram;flipH=1",
	"trapezoid2": "trapezoid;perimeter=trapezoidPerimeter;flipV=1",
	"trapezoid": "trapezoid;perimeter=trapezoidPerimeter",
	//Bevel TODO make them looks closer to yEd
	"bevelnode": "rect;glass=1;",
	"bevelnodewithshadow": "rect;glass=1;shadow=1",
	"bevelnode2": "rect;glass=1;rounded=1;arcsize=30",
	"bevelnode3": "rect;glass=1;rounded=1;arcsize=30;shadow=1",
	"shinyplatenode": "rect;glass=1",//;rotation=-90",//TODO requires rotation!
	"shinyplatenodewithshadow": "rect;glass=1;shadow=1",//;rotation=-90",//TODO requires rotation!
	"shinyplatenode2": "rect;glass=1;rounded=1;arcsize=30",//;rotation=-90",//TODO requires rotation!
	"shinyplatenode3": "rect;glass=1;rounded=1;arcsize=30;shadow=1",//;rotation=-90",//TODO requires rotation!
	//Table
//	"yed_table_node
	//flowchart
	"process": "mxgraph.flowchart.process",
	"decision": "mxgraph.flowchart.decision",
	"start1": "mxgraph.flowchart.start_1",
	"start2": "mxgraph.flowchart.start_2;aspect=fixed",
	"terminator": "mxgraph.flowchart.terminator",
	"cloud": "cloud",
	"data": "mxgraph.flowchart.data",
	"directdata": "mxgraph.flowchart.direct_data",
	"database": "mxgraph.flowchart.database",
	"document": "mxgraph.flowchart.document",
	"predefinedprocess": "mxgraph.flowchart.predefined_process",
	"storeddata": "mxgraph.flowchart.stored_data",
	"internalstorage": "mxgraph.flowchart.internal_storage",
	"sequentialdata": "mxgraph.flowchart.sequential_data;aspect=fixed",
	"manualinput": "mxgraph.flowchart.manual_input",
	"card": "card;size=10",
	"papertype": "mxgraph.flowchart.paper_tape",
	"delay": "mxgraph.flowchart.delay",
	"display": "mxgraph.flowchart.display",
	"manualoperation": "mxgraph.flowchart.manual_operation",
	"preparation": "mxgraph.flowchart.preparation",
	"looplimit": "mxgraph.flowchart.loop_limit",
	"looplimitend": "mxgraph.flowchart.loop_limit;flipV=1",
	"onpagereference": "mxgraph.flowchart.on-page_reference;aspect=fixed",
	"offpagereference": "mxgraph.flowchart.off-page_reference;aspect=fixed",
	"annotation": "mxgraph.flowchart.annotation_1", //TODO not similar!
	"usermessage": "mxgraph.arrows2.arrow;dy=0;dx=10;notch=0", //TODO requires rotation!
	"networkmessage": "mxgraph.arrows2.arrow;dy=0;dx=0;notch=10",
	//The same like above but with "com.yworks.flowchart." prefex. TODO should we just remove the prefex? 
	"com.yworks.flowchart.start1": "mxgraph.flowchart.start_1",
	"com.yworks.flowchart.start2": "mxgraph.flowchart.start_2;aspect=fixed",
	"com.yworks.flowchart.terminator": "mxgraph.flowchart.terminator",
	"com.yworks.flowchart.process": "mxgraph.flowchart.process",
	"com.yworks.flowchart.predefinedprocess": "mxgraph.flowchart.predefined_process",
	"com.yworks.flowchart.decision": "mxgraph.flowchart.decision",
	"com.yworks.flowchart.looplimit": "mxgraph.flowchart.loop_limit",
	"com.yworks.flowchart.looplimitend": "mxgraph.flowchart.loop_limit;flipV=1",
	"com.yworks.flowchart.document": "mxgraph.flowchart.document",
	"com.yworks.flowchart.data": "mxgraph.flowchart.data",
	"com.yworks.flowchart.directdata": "mxgraph.flowchart.direct_data",
	"com.yworks.flowchart.storeddata": "mxgraph.flowchart.stored_data",
	"com.yworks.flowchart.sequentialdata": "mxgraph.flowchart.sequential_data;aspect=fixed",
	"com.yworks.flowchart.database": "mxgraph.flowchart.database",
	"com.yworks.flowchart.internalstorage": "mxgraph.flowchart.internal_storage",
	"com.yworks.flowchart.manualinput": "mxgraph.flowchart.manual_input",
	"com.yworks.flowchart.card": "card;size=10",
	"com.yworks.flowchart.papertype": "mxgraph.flowchart.paper_tape",
	"com.yworks.flowchart.cloud": "cloud",
	"com.yworks.flowchart.delay": "mxgraph.flowchart.delay",
	"com.yworks.flowchart.display": "mxgraph.flowchart.display",
	"com.yworks.flowchart.manualoperation": "mxgraph.flowchart.manual_operation",
	"com.yworks.flowchart.preparation": "mxgraph.flowchart.preparation",
	"com.yworks.flowchart.onpagereference": "mxgraph.flowchart.on-page_reference;aspect=fixed",
	"com.yworks.flowchart.offpagereference": "mxgraph.flowchart.off-page_reference;aspect=fixed",
	"com.yworks.flowchart.usermessage": "mxgraph.arrows2.arrow;dy=0;dx=10;notch=0", //TODO requires rotation!
	"com.yworks.flowchart.networkmessage": "mxgraph.arrows2.arrow;dy=0;dx=0;notch=10",
	"com.yworks.flowchart.annotation": "mxgraph.flowchart.annotation_1", //TODO not similar!

	//icons (network)
	"database.svg": "mxgraph.networks.storage", //TODO not similar!
	"laptop.svg": "mxgraph.networks.laptop",//TODO not similar!
	"server.svg": "mxgraph.networks.server",//TODO not similar!
	"smartphone.svg": "mxgraph.networks.mobile",//TODO not similar! //TODO fixed aspect ratio
	"switch.svg": "mxgraph.networks.switch",//TODO not similar! //TODO fixed aspect ratio
	"wlan.svg": "mxgraph.networks.wireless_hub",//TODO not similar!
	"workstation.svg": "mxgraph.networks.pc",//TODO not similar!
	//bpmn
	"transaction": "ext;double=1;rounded=1",
	"sub_process": "ext;rounded=1",
	"call_activity": "ext;rounded=1;strokeWidth=3",
	//TODO two colors for stroke!
	"exclusive_with_marker": "mxgraph.bpmn.shape;perimeter=rhombusPerimeter;background=gateway;outline=none;symbol=exclusiveGw",  
	"event_based": "mxgraph.bpmn.shape;perimeter=rhombusPerimeter;background=gateway;outline=boundInt;symbol=multiple", 
	"parallel": "mxgraph.bpmn.shape;perimeter=rhombusPerimeter;background=gateway;outline=none;symbol=parallelGw",
	"inclusive": "mxgraph.bpmn.shape;perimeter=rhombusPerimeter;background=gateway;outline=end;symbol=general",
	"complex": "mxgraph.bpmn.shape;perimeter=rhombusPerimeter;background=gateway;outline=none;symbol=complexGw",
	"exclusive_event_based": "mxgraph.bpmn.shape;perimeter=rhombusPerimeter;background=gateway;outline=standard;symbol=multiple", 
	"parallel_event_based": "mxgraph.bpmn.shape;perimeter=rhombusPerimeter;background=gateway;outline=standard;symbol=parallelMultiple",
	//hexagon
	"calling_global_conversation": "hexagon;strokeWidth=4",
	//mxgraph.bpmn.shape;perimeter=ellipsePerimeter;symbol=general
	"message": "mxgraph.bpmn.shape;perimeter=ellipsePerimeter;symbol=message",
	"timer": "mxgraph.bpmn.shape;perimeter=ellipsePerimeter;symbol=timer",
	"escalation": "mxgraph.bpmn.shape;perimeter=ellipsePerimeter;symbol=escalation",
	"conditional": "mxgraph.bpmn.shape;perimeter=ellipsePerimeter;symbol=conditional",
	"link": "mxgraph.bpmn.shape;perimeter=ellipsePerimeter;symbol=link",
	"error": "mxgraph.bpmn.shape;perimeter=ellipsePerimeter;symbol=error",
	"cancel": "mxgraph.bpmn.shape;perimeter=ellipsePerimeter;symbol=cancel",
	"compensation": "mxgraph.bpmn.shape;perimeter=ellipsePerimeter;symbol=compensation",
	"signal": "mxgraph.bpmn.shape;perimeter=ellipsePerimeter;symbol=signal",
	"multiple": "mxgraph.bpmn.shape;perimeter=ellipsePerimeter;symbol=multiple",
	"parallel_multiple": "mxgraph.bpmn.shape;perimeter=ellipsePerimeter;symbol=parallelMultiple",
	"terminate": "mxgraph.bpmn.shape;perimeter=ellipsePerimeter;symbol=terminate",
	
//	"com.yworks.bpmn.pool
	"com.yworks.bpmn.activity.withshadow": "js:bpmnActivityShadow",
	"com.yworks.bpmn.activity": "js:bpmnActivity",
	"com.yworks.bpmn.gateway.withshadow": "mxgraph.bpmn.shape;perimeter=rhombusPerimeter;background=gateway;shadow=1",
	"com.yworks.bpmn.gateway": "mxgraph.bpmn.shape;perimeter=rhombusPerimeter;background=gateway",
	"com.yworks.bpmn.event.withshadow": "mxgraph.bpmn.shape;perimeter=ellipsePerimeter;shadow=1",
	"com.yworks.bpmn.event": "mxgraph.bpmn.shape;perimeter=ellipsePerimeter",
	"com.yworks.bpmn.conversation.withshadow": "hexagon;shadow=1",
	"com.yworks.bpmn.conversation": "hexagon",
	"com.yworks.bpmn.artifact.withshadow": "js:bpmnArtifactShadow",
	"com.yworks.bpmn.artifact": "js:bpmnArtifact",

	bpmnOutline: {
		"sub_process_interrupting": "eventInt",
		"sub_process_non_interrupting": "eventNonint",
		"catching": "catching",
		"boundary_interrupting": "boundInt",
		"boundary_non_interrupting": "boundNonint",
		"throwing": "throwing",
		"end": "end",
		"event_characteristic_start": "standard",
		"event_characteristic_end": "end",
		"event_characteristic_intermediate_catching": "catching",
		"event_characteristic_start_event_sub_process_interrupting": "eventInt",
		"event_characteristic_intermediate_boundary_interrupting": "boundInt"
	},
	bpmnSymbol: {
		"event_type_plain": "general",
		"event_type_message": "message",
		"event_type_timer": "timer",
		"event_type_escalation": "escalation",
		"event_type_conditional": "conditional",
		"event_type_link": "link",
		"event_type_error": "error",
		"event_type_cancel": "cancel",
		"event_type_compensation": "compensation",
		"event_type_signal": "signal",
		"event_type_multiple": "multiple",
		"event_type_parallel_multiple": "parallelMultiple",
		"event_type_terminate": "terminate",
		"gateway_type_plain": "",
		"gateway_type_data_based_exclusive": "exclusiveGw",
		"gateway_type_inclusive": "general;outline=end",
		"gateway_type_parallel": "parallelGw",
		"gateway_type_complex": "complexGw",
		"gateway_type_event_based_exclusive": "multiple;outline=catching",
		"gateway_type_event_based_exclusive_start_process": "multiple;outline=standard",
		"gateway_type_parallel_event_based_exclusive_start_process": "parallelMultiple;outline=standard",
		"conversation_type": "",
		"artifact_type_data_object": "js:bpmnDataObject",
		"artifact_type_annotation": "mxgraph.flowchart.annotation_1",
		"artifact_type_group": "rect;fillColor=none;dashed=1;dashPattern=3 1 1 1;collapsible=0;rounded=1",
		"artifact_type_data_store": "datastore",
		"artifact_type_reply_message": "message;strokeColor=#000000;fillColor=#A1A1A1",
		"artifact_type_request_message": "message",
		"connection_type_sequence_flow": "",
		"connection_type_default_flow": "",
		"connection_type_conditional_flow": "",
		"connection_type_association": "",
		"connection_type_directed_association": "",
		"connection_type_bidirected_association": "",
		"connection_type_message_flow": "",
		"connection_type_conversation_link": "",
		"connection_type_forked_conversation_link": "",
		"pool_type_lane_and_column": "",
		"pool_type_empty": "",
		"pool_type_lane": "",
		"pool_type_column": "",
		"activity_type": ""
	},
	//desktop entity relationship
	"com.yworks.entityrelationship.big_entity": "js:relationship_big_entity",
	"com.yworks.entityrelationship.small_entity" : "ext",
	"com.yworks.entityrelationship.relationship": "rhombus",
	"com.yworks.entityrelationship.attribute": "js:relationship_attribute",
	//SBGN
	"com.yworks.sbgn.unspecifiedentity": "ellipse",
	"com.yworks.sbgn.simplechemical": "ellipse",
	"com.yworks.sbgn.macromolecule": "ext;rounded=1",
	"com.yworks.sbgn.nucleicacidfeature": "", //TODO create this shape!
	"com.yworks.sbgn.perturbingagent": "", //TODO create this shape!
	"com.yworks.sbgn.phenotype": "hexagon;perimeter=hexagonPerimeter2;size=0.2",
	"com.yworks.sbgn.emptyset": "lineEllipse;line=vertical;perimeter=ellipsePerimeter",//;rotation=45", //TODO create this shape!
	"com.yworks.sbgn.submap": "",  //TODO create this shape!
	"com.yworks.sbgn.unitofinformation": "",  //TODO create this shape!
	"com.yworks.sbgn.statevariable": "mxgraph.flowchart.terminator",
	"com.yworks.sbgn.tag": "offPageConnector;size=0.25", //;rotation=90", //TODO create this shape without rotation!
	"com.yworks.sbgn.process": "rect",
	"com.yworks.sbgn.operator": "ellipse",

	//special edges
	"com.yworks.edge.framed": "link",
	
	//Male/Female icons (FIXME Not similar and unsafe as it refers to remote resources)
	"usericon_female1.svg": "image;image=https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-128.png",
	"usericon_female2.svg": "image;image=https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-128.png",
	"usericon_female3.svg": "image;image=https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-128.png",
	"usericon_female4.svg": "image;image=https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-128.png",
	"usericon_female5.svg": "image;image=https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-128.png",
	"usericon_male1.svg": "image;image=https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-128.png",
	"usericon_male2.svg": "image;image=https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-128.png",
	"usericon_male3.svg": "image;image=https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-128.png",
	"usericon_male4.svg": "image;image=https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-128.png",
	"usericon_male5.svg": "image;image=https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-128.png"
};

var mxGraphMlConstants =
{
	ID: "id",

	KEY_FOR: "for",

	KEY_NAME: "attr.name",

	KEY_TYPE: "attr.type",
	
	KEY_YTYPE: "yfiles.type",

	GRAPH: "graph",

	GRAPHML: "graphml",

	NODE: "node",

	EDGE: "edge",

	HYPEREDGE: "hyperedge",

	PORT: "port",

	ENDPOINT: "endpoint",

	KEY: "key",

	DATA: "data",

	ALL: "all",

	EDGE_SOURCE: "source",

	EDGE_SOURCE_PORT: "sourceport",

	EDGE_TARGET: "target",

	EDGE_TARGET_PORT: "targetport",

	EDGE_DIRECTED: "directed",

	EDGE_UNDIRECTED: "undirected",

	EDGE_DEFAULT: "edgedefault",

	PORT_NAME: "name",

	HEIGHT: "Height",

	WIDTH: "Width",

	X: "X",

	Y: "Y",

	HEIGHT_L: "height",

	WIDTH_L: "width",

	X_L: "x",

	Y_L: "y",

	JGRAPH: "jGraph:",

	GEOMETRY: "y:Geometry",

	FILL: "Fill",

	SHAPENODE: "y:ShapeNode",

	SHAPEEDGE: "ShapeEdge",

	JGRAPH_URL: "http://www.jgraph.com/",

	KEY_NODE_ID: "d0",

	KEY_NODE_NAME: "nodeData",

	KEY_EDGE_ID: "d1",

	KEY_EDGE_NAME: "edgeData",

	STYLE: "Style",

	SHAPE: "Shape",

	TYPE: "type",

	LABEL: "label",

	TEXT: "text",

	PROPERTIES: "properties",

	SOURCETARGET: "SourceTarget",
		
	RECT: "y:RectD",
	
	NODE_LABELS: "NodeLabels",
	
	NODE_LABEL: "y:NodeLabel",
	
	NODE_GEOMETRY: "NodeGeometry",
	
	USER_TAGS: "UserTags",

	NODE_STYLE: "NodeStyle",
	
	NODE_GRAPHICS: "nodegraphics",
	
	NODE_VIEW_STATE: "NodeViewState",
	
	EDGE_LABELS: "EdgeLabels",
	
	EDGE_GEOMETRY: "EdgeGeometry",
	
	EDGE_STYLE: "EdgeStyle",
	
	EDGE_VIEW_STATE: "EdgeViewState",
	
	PORT_LOCATION_PARAMETER: "PortLocationParameter",
	
	PORT_STYLE: "PortStyle",
	
	PORT_VIEW_STATE: "PortViewState",
	
	SHARED_DATA: "SharedData",
	
	Y_SHARED_DATA: "y:SharedData",
	
	X_KEY: "x:Key",
	
	GRAPHML_REFERENCE: "y:GraphMLReference",
	
	RESOURCE_KEY: "ResourceKey",
	
	Y_RESOURCES: "y:Resources",
	
	Y_RESOURCE: "y:Resource",
	
	REFID: "refid",
		
	X_LIST: "x:List",
	
	X_STATIC: "x:Static",
	
	Y_BEND: "y:Bend",
	
	LOCATION: "Location",
	
	Y_LABEL: "y:Label",
	
	LAYOUTPARAMETER: "LayoutParameter",
	
	YJS_DEFAULTLABELSTYLE: "yjs:DefaultLabelStyle",
	
	MEMBER: "Member"
};


EditorUi.prototype.doImportGraphML = function(xmlData, done, onerror)
{
	new mxGraphMlCodec().decode(xmlData, done, onerror);
};

