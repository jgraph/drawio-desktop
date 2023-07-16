var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/* Generated from Java with JSweet 2.0.0-rc1 - http://www.jsweet.org */
var com;
(function (com) {
    var mxgraph;
    (function (mxgraph) {
        var io;
        (function (io) {
            /**
             * Parses a .vsdx XML diagram file and imports it in the given graph.<br/>
             * @class
             */
            var mxVsdxCodec = (function () {
                function mxVsdxCodec(editorUi) {
                    this.RESPONSE_END = "</mxfile>";
                    this.RESPONSE_DIAGRAM_START = "";
                    this.RESPONSE_DIAGRAM_END = "</diagram>";
                    this.RESPONSE_HEADER = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><mxfile>";
                    
                    /**
                     * Stores the vertexes imported.
                     */
                    this.vertexMap = ({});
                    /**
                     * Stores the shapes that represent Edges.
                     */
                    this.edgeShapeMap = ({});
                    /**
                     * Stores the shapes that represent Vertexes.
                     */
                    this.vertexShapeMap = ({});
                    /**
                     * Stores the parents of the shapes imported.
                     */
                    this.parentsMap = ({});
                    
                    this.layerNames = [];
                    /**
                     * Set to true if you want to display spline debug data
                     */
                    this.debugPaths = false;
                    this.vsdxModel = null;
                    this.editorUi = editorUi;
					this.shapeIndexShift = 0;
                }
                mxVsdxCodec.vsdxPlaceholder_$LI$ = function ()
                {
                		if (mxVsdxCodec.vsdxPlaceholder == null)
                		{
                			var tmp = "dmlzaW8=";
                			mxVsdxCodec.vsdxPlaceholder = (window.atob) ? atob(tmp) : Base64.decode(tmp, true);
                		}

                		return mxVsdxCodec.vsdxPlaceholder;
                };
                
                mxVsdxCodec.parsererrorNS_$LI$ = function ()
                {
					mxVsdxCodec.parsererrorNS = mxConstants.NS_XHTML;
	
//            		if (mxVsdxCodec.parsererrorNS == null)
//            		{
//            			mxVsdxCodec.parsererrorNS = "";
//            			
//            			if (window.DOMParser) 
//            			{
//	            			var parser = new DOMParser();
//	            			
//	            			try
//	            			{
//	            				mxVsdxCodec.parsererrorNS = parser.parseFromString('<', 'text/xml').getElementsByTagName("parsererror")[0].namespaceURI;
//	            			}
//	            			catch(e)
//	            			{
//	            				//ignore! IE11 throw an exception on XML syntax error
//	            			}
//            			}
//        			}

            		return mxVsdxCodec.parsererrorNS;
                };
                
                mxVsdxCodec.parseXml = function (xml) 
                {
                	try
                	{
                		var doc = mxUtils.parseXml(xml);
                		
                		if (doc.getElementsByTagNameNS(mxVsdxCodec.parsererrorNS, 'parsererror').length > 0)
                		{
                			return null;
                		}
                		else
            			{
                			return doc;
            			}
                	}
                	catch (e) 
                	{
                		//IE11 throw an exception on XML syntax error
                		return null; 
                	}
                };
                
                //TODO Optimize this function
                mxVsdxCodec.decodeUTF16LE = function ( binaryStr ) 
                {
                    var cp = "";
                    for( var i = 0; i < binaryStr.length; i+=2) 
                    {
                        cp += String.fromCharCode( 
                             binaryStr.charCodeAt(i) |
                            ( binaryStr.charCodeAt(i+1) << 8 )
                        );
                    }

                    return cp ;
                }
                
                mxVsdxCodec.prototype.scaleGraph = function(graph, scale) 
                {
                    if (scale !== 1) {
                        var model = graph.getModel();
                        {
                            for (var id in model.cells) {
                                var c = model.cells[id];
                                {
                                    var geo = model.getGeometry(c);
                                    if (geo != null) {
                                        this.scaleRect(geo, scale);
                                        this.scaleRect(geo.alternateBounds, scale);
                                        if (model.isEdge(c)) {
                                        	this.scalePoint(geo.sourcePoint, scale);
                                        	this.scalePoint(geo.targetPoint, scale);
                                        	this.scalePoint(geo.offset, scale);
                                            var points = geo.points;
                                            if (points != null) {
                                                for (var index125 = 0; index125 < points.length; index125++) {
                                                    var p = points[index125];
                                                    {
                                                    	this.scalePoint(p, scale);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                };
                
                mxVsdxCodec.incorrectXMLReqExp = [
                	{
                		regExp: /\&(?!amp;|lt;|gt;|quot;|#)/g,
                		repl: '&amp;'
                	}
                ];
                
                /**
                 * Parses the input VSDX format and uses the information to populate
                 * the specified graph.
                 * @param docs All XML documents contained in the VSDX source file
                 * @throws IOException
                 * @throws ParserConfigurationException
                 * @throws SAXException
                 * @throws TransformerException
                 * @param {Array} data
                 * @param {string} charset
                 * @return {string}
                 */
                //FIXME TODO add charset support
                mxVsdxCodec.prototype.decodeVsdx = function (file, callback, charset, onerror) {
                    var _this = this;
                    var docData = ({});
                    var mediaData = ({});

                    var allDone = function () 
                    {
	                    var path = mxVsdxCodec.vsdxPlaceholder + "/document.xml";
	                    var rootDoc = (function (m, k) { return m[k] ? m[k] : null; })(docData, path);
	                    var rootChild = rootDoc.firstChild;
	                    while (rootChild != null && !(rootChild.nodeType == 1)) {
	                    	rootChild = rootChild.nextSibling;
	                    }
	                    ;
	                    if (rootChild != null && (rootChild.nodeType == 1)) {
	                        _this.importNodes(rootDoc, rootChild, path, docData);
	                    }
	                    else {
	                        return null;
	                    }
	                    _this.vsdxModel = new com.mxgraph.io.vsdx.mxVsdxModel(rootDoc, docData, mediaData);
	                    var pages = _this.vsdxModel.getPages();
	                    var xmlBuilder = { str: _this.RESPONSE_HEADER, toString: function () { return this.str; } };
	                    {
	                        var array122 = (function (m) { if (m.entries == null)
	                            m.entries = []; return m.entries; })(pages);
	                        var _loop_1 = function (index121, remaining) {
	                            var entry = array122[index121];
	                            {
	                                var page_1 = entry.getValue();
	                                //As per many requests, include all pages in the output
	                                //if (!page_1.isBackground()) 
	                                {
	                                    var graph_1 = this_1.createMxGraph();
	                                    graph_1.getModel().beginUpdate();
	                                    this_1.importPage(page_1, graph_1, graph_1.getDefaultParent(), true);
	                                    this_1.scaleGraph(graph_1, page_1.getPageScale() / page_1.getDrawingScale());
	                                    graph_1.getModel().endUpdate();

	                                    this_1.postImportPage(page_1, graph_1, function()
	                                    {
	                                    	this_1.sanitiseGraph(graph_1);
		                                    /* append */ (function (sb) { return sb.str = sb.str.concat(_this.RESPONSE_DIAGRAM_START); })(xmlBuilder);
		                                    /* append */ (function (sb) { return sb.str = sb.str.concat(_this.processPage(graph_1, page_1)); })(xmlBuilder);
		                                    /* append */ (function (sb) { return sb.str = sb.str.concat(_this.RESPONSE_DIAGRAM_END); })(xmlBuilder);
		                                    
		                                    if (index121 < array122.length - 1)
		                                	{
		    	                            	_loop_1(index121 + 1, remaining);
		                                	}
		    	                            else
		                                	{
		    	                            	remaining();
		                                	}
	                                    });
	                                }
	                            }
	                        };
	                        var this_1 = _this;
	                        
	                        if (array122.length > 0)
                        	{
	                        	_loop_1(0, remaining);
                        	}
	                        else
	                        {
	                        	remaining();
	                        }
	                    }
	                    
	                    function remaining()
	                    {
		                    /* append */ (function (sb) { return sb.str = sb.str.concat(_this.RESPONSE_END); })(xmlBuilder);
		                    var dateAfter = new Date();
	                       	//console.log("File processed in " + (dateAfter - dateBefore) + "ms");
		                    //console.log(xmlBuilder.str);
		                    if (callback) 
		                    {
	                     		callback(xmlBuilder.str);
		                    }
	                    }
                    };

                    var dateBefore = new Date();
                    var filesCount = 0;
                    var processedFiles = 0;
                    
                    var doneCheck = function() 
                    {
	                    	if (processedFiles == filesCount) 
	                    	{
	                    		var dateAfter = new Date();
		                         //console.log(processedFiles + " File extracted in " + (dateAfter - dateBefore) + "ms");
		                     	try
		                    	{
		                     		allDone();
		                    	}
		                    	catch(e)
		                    	{
		                    		console.log(e);
		                    		
		                    		if (onerror != null) 
		                    		{
		                    			onerror(e);
		                    		}
		                    		else
		                    		{
		                    			callback("");
		                    		}
		                    	}

	                    	}
                    };
                    
                    JSZip.loadAsync(file)                                   
                    .then(function(zip) 
                    {
                    	if (Object.keys(zip.files).length == 0)
                    	{
                    		if (onerror != null)
                    		{
                    			onerror();
                    		}
                    	}
                    	else
                    	{
	                        var dateAfter = new Date();
	                       	//console.log(" (loaded in " + (dateAfter - dateBefore) + "ms)");
	                       	
	                        zip.forEach(function (relativePath, zipEntry) 
	                        {  
	        					var filename = zipEntry.name;
	                        	var name = filename.toLowerCase();
	        					var nameLen = name.length;
	                            if (name.indexOf('.xml') == nameLen - 4 || name.indexOf('.rels') == nameLen - 5) //xml files
	                            {
	                            	filesCount++;
	        	                    zipEntry.async("string").then(function (str) 
	        	                  	{
        	                    		if (!(str.length === 0)) {
	        	    						//UTF-8 BOM causes exception while parsing, so remove it
	        	    						//TODO is the text encoding will be correct or string must be re-read as UTF-8?
	                                        if (str.charCodeAt(0) == 65279)
                                        	{
	                                            str = str.substring(1);
                                        	}
	                                        
	                                        var doc = mxVsdxCodec.parseXml(str);
	                                        
	                                        if (doc == null) 
	                                        {
	                                        	if (str.charCodeAt(1) === 0 && str.charCodeAt(3) === 0 && str.charCodeAt(5) === 0)
                                        		{
	                                        		doc = mxVsdxCodec.parseXml(mxVsdxCodec.decodeUTF16LE(str));
                                        		}
	                                        	else
                                        		{
	                                        		for (var r = 0; r < mxVsdxCodec.incorrectXMLReqExp.length; r++)
                                        			{
	                                        			if (mxVsdxCodec.incorrectXMLReqExp[r].regExp.test(str))
                                        				{
	                                        				str = str.replace(mxVsdxCodec.incorrectXMLReqExp[r].regExp, mxVsdxCodec.incorrectXMLReqExp[r].repl);
                                        				}
                                        			}
	                                        		
	                                        		doc = mxVsdxCodec.parseXml(str);
                                        		}
	                                        	//TODO add any other non-standard encoding that may be needed 
	                                        }
	                                        
	                                        if (doc != null)
                                        	{
		                                        doc.vsdxFileName = filename;
		                                        /* put */ (docData[filename] = doc);
                                        	}
	                                    }
		        	                    	processedFiles++;
		
		        	                    	doneCheck();
	        	                   	});
	                            }
	                            else if (name.indexOf(mxVsdxCodec.vsdxPlaceholder + "/media") === 0)//binary files
	                           	{
	                            	filesCount++;
	                            	if ((function (str, searchString) { var pos = str.length - searchString.length; var lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(name, ".emf")) 
	                            	{
                            			var emfDone = function()
                            			{
                            				processedFiles++;
                            				
		        	                    	doneCheck();
                            			}
                            			
	                            		if (JSZip.support.blob && window.EMF_CONVERT_URL) 
	                            		{
	                            			zipEntry.async("blob").then(function (emfBlob)
			           	                  	{
	                            				//send to emf conversion service
	                        					var formData = new FormData();
	                        					formData.append('img', emfBlob, name);
	                        					formData.append('inputformat', 'emf');
	                        					formData.append('outputformat', 'png');
	                        					
	                        					var xhr = new XMLHttpRequest();
	                        					xhr.open('POST', EMF_CONVERT_URL);
	                        					xhr.responseType = 'blob';
	                        					_this.editorUi.addRemoteServiceSecurityCheck(xhr);
	                        					
	                        					xhr.onreadystatechange = mxUtils.bind(this, function()
	                        					{
	                        						if (xhr.readyState == 4)
	                        						{	
	                        							if (xhr.status >= 200 && xhr.status <= 299)
	                        							{
	                        								try
	                        								{
	                        									var reader = new FileReader();
	                        									reader.readAsDataURL(xhr.response); 
	                        									reader.onloadend = function() 
	                        									{
	                        										var dataPos = reader.result.indexOf(',') + 1;
	                        									    mediaData[filename] = reader.result.substr(dataPos);
		                        									emfDone();
	                        									}
	                        								}
	                        								catch (e)
	                        								{
	                        									console.log(e);
	                        									emfDone();
	                        								}
	                        							}
	                        							else
	                        							{
	                        								emfDone();
	                        							}
	                        						}
	                        					});
	                        					
	                        					xhr.send(formData);
			           	                  	});
	                            		}
	                            		else
                            			{
	                            			emfDone();
                            			}
	                            	}
	                            	else if ((function (str, searchString) { var pos = str.length - searchString.length; var lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(name, ".bmp")) {
	                            		if (JSZip.support.uint8array) 
	                            		{
			                            	zipEntry.async("uint8array").then(function (bmpData) 
			           	                  	{
			                            		var bitmap = new BmpDecoder(bmpData);
			                            		
			                            		var c = document.createElement("canvas");
			                            		c.width = bitmap.width;
			                              	  	c.height = bitmap.height;
			                            		var ctx = c.getContext("2d");
			                            		ctx.putImageData(bitmap.imageData, 0, 0);
			                            		var jpgData = c.toDataURL("image/jpeg");
	                                            /* put */ (mediaData[filename] = jpgData.substr(23)); //23 is the length of "data:image/jpeg;base64,"
	
			        	                    	processedFiles++;
			        	                    	doneCheck();
			           	                   	});
	                            		}
	                            	}
	                            	else
	                            	{
		                            	zipEntry.async("base64").then(function (base64Str) 
		           	                  	{
	//	                                    if ((function (str, searchString) { var pos = str.length - searchString.length; var lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(name, ".bmp")) {
	//	                                        try 
	//	                                        {
	//	    	                            		//convert BMP files to PNG
	//		                                    	var bmpImg = new Image();
	//		                                        
	//		                                        bmpImg.onload = function() {
	//		                                            var c = document.createElement("canvas");
	//		                                            c.width = bmpImg.width;
	//		                                            c.height = bmpImg.height;
	//		                                            var ctx = c.getContext("2d");
	//		                                            ctx.drawImage(bmpImg, 0, 0);
	//		                                            var jpgData = c.toDataURL("image/jpeg");
	//		                                            
	//		                                            /* put */ (mediaData[filename] = jpgData.substr(23)); //23 is the length of "data:image/jpeg;base64,"
	//		                                            
	//		                                            processedFiles++;
	//		                                            doneCheck();
	//		                                        };
	//	
	//		                                        bmpImg.src = "data:image/bmp;base64," + base64Str;
	//	                                        }
	//	                                        catch (e) {} //conversion failed. Nothing can be done!
	//	                                    }
	//	                                    else 
	//	                                    {
			                                    /* put */ (mediaData[filename] = base64Str);
			                                	
			        	                    	processedFiles++;
			        	                    	doneCheck();
	//	                                    }
		           	                   	});
	                            	}
	                           	}
	                        });
                    	}
                    }, function (e) {
                    		//console.log("Error!" + e.message);
                    		if (onerror != null)
                    		{
                    			onerror(e);
                    		}
                    });                    
                };
                mxVsdxCodec.prototype.createMxGraph = function () {
                    var graph = new Graph();
                    graph.setExtendParents(false);
                    graph.setExtendParentsOnAdd(false);
                    graph.setConstrainChildren(false);
                    graph.setHtmlLabels(true);
                    graph.getModel().maintainEdgeParent = false;
                    return graph;
                };
                mxVsdxCodec.prototype.processPage = function (graph, page) {
                    var codec = new mxCodec();
                    var node = codec.encode(graph.getModel());
                    node.setAttribute("style", "default-style2");
                    var modelString = mxUtils.getXml(node);
                    
                    var output = "";
                    if (page != null) {
                        //var pageName_1 = org.apache.commons.lang3.StringEscapeUtils.escapeXml11(page.getPageName());
                    	//TODO FIXME htmlEntities is not exactly as escapeXml11 but close
                        var pageName_1 = mxUtils.htmlEntities(page.getPageName()) + (page.isBackground()? ' (Background)' : '');
                        var pageNameU = mxUtils.htmlEntities(page.getPageNameU());
                        output += '<diagram name="' + pageName_1 + '" id="' + pageNameU.replace(/\s/g, '_') + '">';
                    }
                    
                    output += Graph.compress(modelString);
                    return output;
                };
                /**
                 * Scale a point in place
                 *
                 * @param {mxPoint} p point to scale in place
                 * @param {number} scale scale
                 * @return {mxPoint} scaled point
                 * @private
                 */
                /*private*/ mxVsdxCodec.prototype.scalePoint = function (p, scale) {
                    if (p != null) {
                        p.x = (p.x * scale);
                        p.y = (p.y * scale);
                    }
                    return p;
                };
                /**
                 * Scale a rectangle in place
                 *
                 * @param {mxRectangle} rect rectangle to scale in place
                 * @param {number} scale scale
                 * @return {mxRectangle} scaled rectangle
                 * @private
                 */
                /*private*/ mxVsdxCodec.prototype.scaleRect = function (rect, scale) {
                    if (rect != null) {
                        rect.x = (rect.x * scale);
                        rect.y = (rect.y * scale);
                        rect.height = (rect.height * scale);
                        rect.width = (rect.width * scale);
                    }
                    return rect;
                };
                /**
                 *
                 * @param {*} rootDoc
                 * @param {*} currentNode
                 * @param {string} path
                 * @param {*} docData
                 * @private
                 */
                /*private*/ mxVsdxCodec.prototype.importNodes = function (rootDoc, currentNode, path, docData) {
                    var lastSlash = path.lastIndexOf("/");
                    var dir = path;
                    var fileName = path;
                    if (lastSlash !== -1) {
                        dir = path.substring(0, lastSlash);
                        fileName = path.substring(lastSlash + 1, path.length);
                    }
                    else {
                        return;
                    }
                    var relsPath = dir + "/_rels/" + fileName + ".rels";
                    var relsDoc = (function (m, k) { return m[k] ? m[k] : null; })(docData, relsPath);
                    if (relsDoc == null) {
                        return;
                    }
                    var rels = relsDoc.getElementsByTagName("Relationship");
                    var relMap = ({});
                    for (var i = 0; i < rels.length; i++) {
                        var currElem = rels.item(i);
                        var id = currElem.getAttribute("Id");
                        var target = currElem.getAttribute("Target");
                        /* put */ (relMap[id] = target);
                    }
                    ;
                    var relList = currentNode.getElementsByTagName("Rel");
                    for (var i = 0; i < relList.length; i++) {
                        var rel = relList.item(i);
                        var pathSuffix = (function (m, k) { return m[k] ? m[k] : null; })(relMap, rel.getAttribute("r:id"));
                        var target = dir + "/" + pathSuffix;
                        if (target != null) {
                            var childDoc = (function (m, k) { return m[k] ? m[k] : null; })(docData, target);
                            if (childDoc != null) {
                                var parent_1 = rel.parentNode;
                                var rootChild = childDoc.firstChild;
                                while (rootChild != null && !(rootChild.nodeType == 1)) {
                                	rootChild = rootChild.nextSibling;
                                }
                                ;
                                if (rootChild != null && (rootChild.nodeType == 1)) {
                                    var importNode = rootChild.firstChild;
                                    while ((importNode != null)) {
                                        if (importNode != null && importNode.nodeType == 1) {
                                            var newNode = parent_1.appendChild(rootDoc.importNode(importNode, true));
                                            var pathTmp = target;
                                            this.importNodes(rootDoc, newNode, pathTmp, docData);
                                        }
                                        importNode = importNode.nextSibling;
                                    }
                                    ;
                                }
                            }
                        }
                    }
                    ;
                };

                mxVsdxCodec.prototype.layerIndexToNames = function (indexes)
                {
                    var names = [];
                    
                    if (indexes)
                    {
                        for (var i = 0; i < indexes.length; i++)
                        {
                            var layer = parseInt(indexes[i]);

                            if (layer < this.layerNames.length)
                            {
                                names.push(this.layerNames[layer]);
                            }
                        }
                    }

                    return names.length > 0? names : [mxResources.get('background')]; // Add all non-layer members to Background tag
                };

                /**
                 * Imports a page of the document with the actual pageHeight.<br/>
                 * In .vdx, the Y-coordinate grows upward from the bottom of the page.<br/>
                 * The page height is used for calculating the correct position in mxGraph using
                 * this formula: mxGraph_Y_Coord = PageHeight - VSDX_Y_Coord.
                 * @param {com.mxgraph.io.vsdx.mxVsdxPage} page Actual page Element to be imported
                 * @param {mxGraph} graph Graph where the parsed graph is included.
                 * @param {*} parent The parent of the elements to be imported.
                 * @return {number}
                 */
                mxVsdxCodec.prototype.importPage = function (page, graph, parent, noSanitize) 
                {
                	//BackPages can include another backPage, so it is recursive
                	var backPage = page.getBackPage();
                    
                	if (backPage != null) 
                    {
                        graph.getModel().setValue(graph.getDefaultParent(), page.getPageName());
                        var backCell = new mxCell(backPage.getPageName());
                        graph.addCell(backCell, graph.getModel().getRoot(), 0, null, null);
                        this.importPage(backPage, graph, graph.getDefaultParent());
                    }
                	
                	//TODO KNOWN ISSUE: VSDX layers are virtual grouping where parts of a group can be members of a layers while the remaining group members belong to another layer
                	//					This cannot be done in draw.io currently
                	//					Also, layers should NOT affect cells order. So, as a best effort solution, layers should be orders such that the cells order is maintained
                	
                	//add page layers
                	var layers = page.getLayers();
                    var shapes = page.getShapes();
                    var hiddenTags = [];

                    console.log('layers', layers);
					
                    for (var k = 0; k < layers.length; k++)
                    {
                        var layer = layers[k];
                        // Tags cannot have spaces
                        var layerName = layer.Name.replace(/\s/g, '_');
                        this.layerNames.push(layerName);

                        if (layer.Visible == 0)
                        {
                            hiddenTags.push(layerName);
                        }

                        // Lock is not supported for tags
                        if (layer.Lock == 1)
                        {
                            //layerCell.setStyle("locked=1;");
                        }
                    }

                	//add shapes
                    var entries = (function (a) { var i = 0; return { next: function () { return i < a.length ? a[i++] : null; }, hasNext: function () { return i < a.length; } }; })(/* entrySet */ (function (m) { if (m.entries == null)
                        m.entries = []; return m.entries; })(shapes));
                    var pageHeight = page.getPageDimensions().y;
                    var pageId = page.getId();

                    while ((entries.hasNext())) 
                    {
                        var entry = entries.next();
                        var shape = entry.getValue();
                        var newCell = this.addShape(graph, shape, parent, pageId, pageHeight);
                        // Map layers to draw.io tags which allows muliple layers(tags) per cell
                        var layers = this.layerIndexToNames(shape.layerMember);

                        // Edges are not available here yet
                        if (newCell != null && layers != null)
                        {
                            graph.addTagsForCells([newCell], layers);
                        }
                    };

                    var connects = page.getConnects();
                    var entries2 = (function (a) { var i = 0; return { next: function () { return i < a.length ? a[i++] : null; }, hasNext: function () { return i < a.length; } }; })(/* entrySet */ (function (m) { if (m.entries == null)
                        m.entries = []; return m.entries; })(connects));
                    while ((entries2.hasNext())) {
                        var entry = entries2.next();
                        var edgeId = this.addConnectedEdge(graph, entry.getValue(), pageId, pageHeight);
                        if (edgeId != null) {
                            /* remove */ (function (m, k) { if (m.entries == null)
                                m.entries = []; for (var i = 0; i < m.entries.length; i++)
                                if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                    return m.entries.splice(i, 1)[0];
                                } })(this.edgeShapeMap, edgeId);
                        }
                    }
                    ;
                    var it = (function (a) { var i = 0; return { next: function () { return i < a.length ? a[i++] : null; }, hasNext: function () { return i < a.length; } }; })(/* entrySet */ (function (m) { if (m.entries == null)
                        m.entries = []; return m.entries; })(this.edgeShapeMap));
                    while ((it.hasNext())) {
                        var edgeShapeEntry = it.next();
                        if (edgeShapeEntry.getKey().getPageNumber() === pageId) {
                            var edge = this.addUnconnectedEdge(graph, /* get */ (function (m, k) { if (m.entries == null)
                                m.entries = []; for (var i = 0; i < m.entries.length; i++)
                                if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                    return m.entries[i].value;
                                } return null; })(this.parentsMap, edgeShapeEntry.getKey()), edgeShapeEntry.getValue(), pageHeight);
                            
                            var layers = this.layerIndexToNames(edgeShapeEntry.getValue().layerMember);
                            
                            if (layers != null)
                            {
                                graph.addTagsForCells([edge], layers);
                            }
                        }
                    };

                    // Now after all used tags are found, add remaining ones and set visibility
                    if (this.layerNames.length > 0)
                    {
                        var tags = graph.getAllTags();
                        var emptyTags = false;
	
                        for (var i = 0; i < this.layerNames.length; i++)
                        {
                            if (mxUtils.indexOf(tags, this.layerNames[i]) < 0)
                            {
                                emptyTags = true;
                                break;
                            }
                        }

                        // Cannot add tags without cells. Add a dummy cell
                        if (emptyTags)
                        {
                            var dummyCell = graph.insertVertex(parent, null, null, 0, 0, 0, 0);
                            graph.addTagsForCells([dummyCell], this.layerNames);
                            dummyCell.setVisible(false);
                        }
                        
                        graph.setHiddenTags(hiddenTags);
                    }

                    if (!noSanitize)
                    {
                        this.sanitiseGraph(graph);
                    }

                    return pageHeight;
                };
                
                /**
                 * This function is for doing any async processing needed after importing a page
                 */
                mxVsdxCodec.prototype.postImportPage = function(page, graph, callback)
                {
                	try
                	{
                		var me = this;
                		var toCropImgs = [];
	                	
                        function checkShapes(shapes)
                        {
                            if (shapes != null)
                            {
                                shapes = shapes.entries || [];

                                for (var i = 0; i < shapes.length; i++)
                                {
                                    var shape = shapes[i].value || {};
                                    
                                    if (shape.toBeCroppedImg)
                                    {
                                        toCropImgs.push(shape);
                                    }

                                    checkShapes(shape.getChildShapes());
                                }
                            }
                        }

                        checkShapes(page.getShapes());

	                	if (toCropImgs.length > 0)
                		{
	                		function cropImage(index, callback)
	                		{
	                			function next()
	                			{
	                				if (index < toCropImgs.length - 1)
	                				{
		                				cropImage(index + 1, callback);
	                				}
		                			else
	                				{
		                				callback();
	                				}
	                			};
	                			
	                			var shape = toCropImgs[index];
	                			var imgInfo = shape.toBeCroppedImg;
	                			
	                			var cell = (function (m, k) { if (m.entries == null)
	                                m.entries = []; for (var i = 0; i < m.entries.length; i++)
	                                if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
	                                    return m.entries[i].value;
	                                } return null; })(me.vertexMap, new com.mxgraph.io.vsdx.ShapePageId(page.Id, shape.Id));
	                            
	                			var img = new Image();
	                			
	                			img.onload = function()
	                			{
	                				var data = imgInfo.iData;
                                    var type = imgInfo.iType;
                                    
	                				try
		                			{
                                        //TODO There is still some minor inaccuracy in width/height
                                        var scaleX = img.width / imgInfo.imgWidth;
                                        var scaleY = img.height / imgInfo.imgHeight;
		                				var offsetX = (-imgInfo.imgOffsetX) * scaleX;
		                				var offsetY = (imgInfo.imgHeight - imgInfo.height + imgInfo.imgOffsetY) * scaleY;
		                			    var c = document.createElement("canvas");
		                			    c.width = imgInfo.width * scaleX;
		                              	c.height = imgInfo.height * scaleY;
                                        var ctx = c.getContext("2d");
                                        ctx.fillStyle = "#FFFFFF";
                                        ctx.fillRect(0, 0, c.width, c.height);
                                        ctx.drawImage(img, offsetX, offsetY, c.width, c.height, 0, 0, c.width, c.height);
		                            	var jpgData = c.toDataURL("image/jpeg");
	                                    data = jpgData.substr(23); //23 is the length of "data:image/jpeg;base64,"
                                        type = 'jpg';
		                			}
	                				catch(e) 
	                				{
	                					console.log(e);
	                				}
	                				
	                				cell.style += ';image=data:image/' + type + ',' + data;
	                			    next();
	                			};
	                			
	                			img.src = 'data:image/' + imgInfo.iType + ';base64,' + imgInfo.iData;

	                			img.onerror = function()
	                			{
	                				cell.style += ';image=data:image/' + imgInfo.iType + ',' + imgInfo.iData;
	                				next();
	                			}
	                		};
	                		
	                		cropImage(0, callback);
                		}
	                	else
                		{
	                		callback();
	                	}
                	}
                	catch(e)
                	{
                        console.log(e);
                        callback();
                	}
                };
                
                /**
                 * Adds a vertex to the graph if 'shape' is a vertex or add the shape to edgeShapeMap if it is an edge.
                 * This method doesn't import sub-shapes of 'shape'.
                 * @param {mxGraph} graph Graph where the parsed graph is included.
                 * @param shp Shape to be imported.
                 * @param {number} parentHeight Height of the parent cell.
                 * @return {mxCell} the new vertex added. null if 'shape' is not a vertex.
                 * @param {com.mxgraph.io.vsdx.VsdxShape} shape
                 * @param {*} parent
                 * @param {number} pageId
                 */
                mxVsdxCodec.prototype.addShape = function (graph, shape, parent, pageId, parentHeight) {
                    shape.parentHeight = parentHeight;
                    var type = com.mxgraph.io.vsdx.VsdxShape.getType(shape.getShape());
                    if (type != null && ((function (o1, o2) { if (o1 && o1.equals) {
                        return o1.equals(o2);
                    }
                    else {
                        return o1 === o2;
                    } })(type, com.mxgraph.io.vsdx.mxVsdxConstants.TYPE_SHAPE) || (function (o1, o2) { if (o1 && o1.equals) {
                        return o1.equals(o2);
                    }
                    else {
                        return o1 === o2;
                    } })(type, com.mxgraph.io.vsdx.mxVsdxConstants.TYPE_GROUP) || (function (o1, o2) { if (o1 && o1.equals) {
                        return o1.equals(o2);
                    }
                    else {
                        return o1 === o2;
                    } })(type, com.mxgraph.io.vsdx.mxVsdxConstants.FOREIGN))) {
                        var id = shape.getId();
                        if (shape.isVertex()) {
                            var v1 = null;
                            if (shape.isGroup()) {
                                v1 = this.addGroup(graph, shape, parent, pageId, parentHeight);
                            }
                            else {
                                v1 = this.addVertex(graph, shape, parent, pageId, parentHeight);
                            }
                            /* put */ (function (m, k, v) { if (m.entries == null)
                                m.entries = []; for (var i = 0; i < m.entries.length; i++)
                                if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                    m.entries[i].value = v;
                                    return;
                                } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(this.vertexShapeMap, new com.mxgraph.io.vsdx.ShapePageId(pageId, id), shape);
                            
                            var lnkObj = shape.getHyperlink();
                            
                            if (lnkObj.extLink)
                            {
                            	graph.setLinkForCell(v1, lnkObj.extLink);
                            }
                            else if (lnkObj.pageLink)
                        	{
                            	graph.setLinkForCell(v1, 'data:page/id,' + lnkObj.pageLink.replace(/\s/g, '_'));
                        	}
                            
							// Add Shape properties
							var props = shape.getProperties();
							
							for (var i = 0; i < props.length; i++)
							{
								try
								{
									graph.setAttributeForCell(v1, props[i].key, props[i].val);	
								}
								catch(e)
								{
									console.log('Attribute: "', props[i].key, '" with value "', props[i].val, '" not allowed in HTML');
								}
							}
							
                            return v1;
                        }
                        else {
                            shape.setShapeIndex(graph.getModel().getChildCount(parent));
                            /* put */ (function (m, k, v) { if (m.entries == null)
                                m.entries = []; for (var i = 0; i < m.entries.length; i++)
                                if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                    m.entries[i].value = v;
                                    return;
                                } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(this.edgeShapeMap, new com.mxgraph.io.vsdx.ShapePageId(pageId, id), shape);
                            /* put */ (function (m, k, v) { if (m.entries == null)
                                m.entries = []; for (var i = 0; i < m.entries.length; i++)
                                if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                    m.entries[i].value = v;
                                    return;
                                } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(this.parentsMap, new com.mxgraph.io.vsdx.ShapePageId(pageId, id), parent);
                        }
                    }
                    return null;
                };
                /**
                 * Adds a group to the graph.
                 * The sub-shapes of a complex shape are processed like part of the shape.
                 * @param {mxGraph} graph Graph where the parsed graph is included.
                 * @param {*} parent Parent cell of the shape.
                 * @param {number} parentHeight Height of the parent cell of the shape.
                 * @return {mxCell} Cell added to the graph.
                 * @param {com.mxgraph.io.vsdx.VsdxShape} shape
                 * @param {number} pageId
                 */
                mxVsdxCodec.prototype.addGroup = function (graph, shape, parent, pageId, parentHeight) {
                    var d = shape.getDimensions();
                    var master = shape.getMaster();
                    var styleMap = shape.getStyleFromShape();
                    var geomList = shape.getGeomList();
                    if (geomList.isNoFill()) {
                        /* put */ (styleMap[mxConstants.STYLE_FILLCOLOR] = "none");
                        /* put */ (styleMap[mxConstants.STYLE_GRADIENTCOLOR] = "none");
                    }
                    if (geomList.isNoLine()) {
                        /* put */ (styleMap[mxConstants.STYLE_STROKECOLOR] = "none");
                    }
                    /* put */ (styleMap["html"] = "1");
                    /* put */ (styleMap[mxConstants.STYLE_WHITE_SPACE] = "wrap");
                    var style = com.mxgraph.io.vsdx.mxVsdxUtils.getStyleString(styleMap, "=");
                    var group = null;
                    var children = shape.getChildShapes();
                    var hasChildren = children != null && (function (m) { if (m.entries == null)
                        m.entries = []; return m.entries.length; })(children) > 0;
                    var subLabel = shape.isDisplacedLabel() || shape.isRotatedLabel() || hasChildren;
                    var o = shape.getOriginPoint(parentHeight, true);
                    if (subLabel) {
                        group = graph.insertVertex(parent, null, null, Math.floor(Math.round(o.x * 100) / 100), Math.floor(Math.round(o.y * 100) / 100), Math.floor(Math.round(d.x * 100) / 100), Math.floor(Math.round(d.y * 100) / 100), style);
                    }
                    else {
                        var textLabel = shape.getTextLabel();
                        group = graph.insertVertex(parent, null, textLabel, Math.floor(Math.round(o.x * 100) / 100), Math.floor(Math.round(o.y * 100) / 100), Math.floor(Math.round(d.x * 100) / 100), Math.floor(Math.round(d.y * 100) / 100), style);
                    }
                    var potH = group.geometry.height;
                    var entries = (function (a) { var i = 0; return { next: function () { return i < a.length ? a[i++] : null; }, hasNext: function () { return i < a.length; } }; })(/* entrySet */ (function (m) { if (m.entries == null)
                        m.entries = []; return m.entries; })(children));
                    while ((entries.hasNext())) {
                        var entry = entries.next();
                        var subShape = entry.getValue();
                        var Id = subShape.getId();
                        if (subShape.isVertex()) {
                            var type = com.mxgraph.io.vsdx.VsdxShape.getType(subShape.getShape());
                            if (type != null && ((function (o1, o2) { if (o1 && o1.equals) {
                                return o1.equals(o2);
                            }
                            else {
                                return o1 === o2;
                            } })(type, com.mxgraph.io.vsdx.mxVsdxConstants.TYPE_SHAPE) || (function (o1, o2) { if (o1 && o1.equals) {
                                return o1.equals(o2);
                            }
                            else {
                                return o1 === o2;
                            } })(type, com.mxgraph.io.vsdx.mxVsdxConstants.TYPE_GROUP) || (function (o1, o2) { if (o1 && o1.equals) {
                                return o1.equals(o2);
                            }
                            else {
                                return o1 === o2;
                            } })(type, com.mxgraph.io.vsdx.mxVsdxConstants.FOREIGN))) {
                                if (subShape.isVertex()) {
                                    subShape.propagateRotation(shape.getRotation());
                                    var tmpV;
                                    if (subShape.isGroup()) {
                                        tmpV = this.addGroup(graph, subShape, group, pageId, d.y);
                                    }
                                    else {
                                        tmpV = this.addVertex(graph, subShape, group, pageId, d.y);
                                    }

                                    if (tmpV && tmpV.geometry)
                                    {
                                        potH = Math.max(tmpV.geometry.height, potH);
                                    }
                                }
                            }
                            if (master == null) {
                                /* put */ (function (m, k, v) { if (m.entries == null)
                                    m.entries = []; for (var i = 0; i < m.entries.length; i++)
                                    if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                        m.entries[i].value = v;
                                        return;
                                    } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(this.vertexShapeMap, new com.mxgraph.io.vsdx.ShapePageId(pageId, Id), subShape);
                            }
                        }
                        else {
                            if (master == null) {
                                /* put */ (function (m, k, v) { if (m.entries == null)
                                    m.entries = []; for (var i = 0; i < m.entries.length; i++)
                                    if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                        m.entries[i].value = v;
                                        return;
                                    } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(this.edgeShapeMap, new com.mxgraph.io.vsdx.ShapePageId(pageId, Id), subShape);
                                /* put */ (function (m, k, v) { if (m.entries == null)
                                    m.entries = []; for (var i = 0; i < m.entries.length; i++)
                                    if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                        m.entries[i].value = v;
                                        return;
                                    } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(this.parentsMap, new com.mxgraph.io.vsdx.ShapePageId(pageId, Id), group);
                            }
                            else {
                                this.addUnconnectedEdge(graph, group, subShape, parentHeight);
                            }
                        }
                    }
                    ;
                    if (group.children && group.geometry.height == 0 && potH > 0) 
                    {
                        group.geometry.height = potH;

                        for (var i = 0; i < group.children.length; i++)
                        {
                            var child = group.children[i];
                            if (child.geometry)
                            {
                                child.geometry.y += potH;
                            }
                        }
                    }
                    if (subLabel) {
                        shape.createLabelSubShape(graph, group);
                    }
                    var rotation = shape.getRotation();
                    if (rotation !== 0) {
                        var pgeo = group.getGeometry();
                        var hw = pgeo.width / 2;
                        var hh = pgeo.height / 2;
                        for (var i = 0; i < group.getChildCount(); i++) {
                            var child = group.getChildAt(i);
                            com.mxgraph.online.Utils.rotatedGeometry(child.getGeometry(), rotation, hw, hh);
                        }
                        ;
                    }
                    
                    /* put */ (function (m, k, v) { if (m.entries == null)
                    m.entries = []; for (var i = 0; i < m.entries.length; i++)
                    if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                        m.entries[i].value = v;
                        return;
                    } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(this.vertexMap, new com.mxgraph.io.vsdx.ShapePageId(pageId, shape.getId()), group);
                    
                    return group;
                };
                mxVsdxCodec.rotatedEdgePoint = function (pt, rotation, cx, cy) {
                    rotation = (function (x) { return x * Math.PI / 180; })(rotation);
                    var cos = Math.cos(rotation);
                    var sin = Math.sin(rotation);
                    var x = pt.x - cx;
                    var y = pt.y - cy;
                    var x1 = x * cos - y * sin;
                    var y1 = y * cos + x * sin;
                    pt.x = (Math.round(x1 + cx));
                    pt.y = (Math.round(y1 + cy));
                };
                /**
                 * Adds a simple shape to the graph
                 * @param {mxGraph} graph Graph where the parsed graph is included.
                 * @param {*} parent Parent cell of the shape.
                 * @param {number} parentHeight Height of the parent cell of the shape.
                 * @return {mxCell} Cell added to the graph.
                 * @param {com.mxgraph.io.vsdx.VsdxShape} shape
                 * @param {number} pageId
                 */
                mxVsdxCodec.prototype.addVertex = function (graph, shape, parent, pageId, parentHeight) {
                    var textLabel = "";
                    var hasSubLabel = shape.isDisplacedLabel() || shape.isRotatedLabel();
                    if (!hasSubLabel) {
                        textLabel = shape.getTextLabel();
                    }
                    var dimensions = shape.getDimensions();
                    var styleMap = shape.getStyleFromShape();
                    /* put */ (styleMap["html"] = "1");
                    var geomExists = styleMap.hasOwnProperty(mxConstants.STYLE_SHAPE) || styleMap.hasOwnProperty("stencil");
                    if (!styleMap.hasOwnProperty(mxConstants.STYLE_FILLCOLOR) || !geomExists) {
                        /* put */ (styleMap[mxConstants.STYLE_FILLCOLOR] = "none");
                    }
                    if (!geomExists) {
                        /* put */ (styleMap[mxConstants.STYLE_STROKECOLOR] = "none");
                    }
                    if (!styleMap.hasOwnProperty(mxConstants.STYLE_GRADIENTCOLOR) || !geomExists) {
                        /* put */ (styleMap[mxConstants.STYLE_GRADIENTCOLOR] = "none");
                    }
                    /* put */ (styleMap[mxConstants.STYLE_WHITE_SPACE] = "wrap");
                    var coordinates = shape.getOriginPoint(parentHeight, true);
                    if (geomExists || textLabel != null) {
                        var style = com.mxgraph.io.vsdx.mxVsdxUtils.getStyleString(styleMap, "=");
                        var v1 = null;
                        if (hasSubLabel) {
                            v1 = graph.insertVertex(parent, null, null, Math.floor(Math.round(coordinates.x * 100) / 100), Math.floor(Math.round(coordinates.y * 100) / 100), Math.floor(Math.round(dimensions.x * 100) / 100), Math.floor(Math.round(dimensions.y * 100) / 100), style);
                        }
                        else {
                            v1 = graph.insertVertex(parent, null, textLabel, Math.floor(Math.round(coordinates.x * 100) / 100), Math.floor(Math.round(coordinates.y * 100) / 100), Math.floor(Math.round(dimensions.x * 100) / 100), Math.floor(Math.round(dimensions.y * 100) / 100), style);
                        }
                        /* put */ (function (m, k, v) { if (m.entries == null)
                            m.entries = []; for (var i = 0; i < m.entries.length; i++)
                            if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                m.entries[i].value = v;
                                return;
                            } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(this.vertexMap, new com.mxgraph.io.vsdx.ShapePageId(pageId, shape.getId()), v1);
                        shape.setLabelOffset(v1, style);
                        if (hasSubLabel) {
                            shape.createLabelSubShape(graph, v1);
                        }
                        return v1;
                    }
                    return null;
                };
                
                
                mxVsdxCodec.calculateAbsolutePoint = function (cell) 
                {
                    var x = 0, y = 0;
                    while (cell != null)
                    {
                        var geo = cell.geometry;

                        if (geo != null) 
                        {
                            x += geo.x;
                            y += geo.y;                
                        }
                        cell = cell.parent;
                    }

                    return new mxPoint(x, y);
                }
                
				mxVsdxCodec.prototype.processEdgeGeo = function (edgeShape, edge) 
				{
					//Detect Line jumps (best effots)
					try
					{
						var rows = edgeShape.geomList.geomList[0].rows;
						
						for (var i = 0; i < rows.length; i++)
						{
							if (rows[i] instanceof com.mxgraph.io.vsdx.geometry.ArcTo)
							{
								edge.style += 'jumpStyle=arc;';
								break;
							}
						}
						
						//Handle NURBS
						for (var i = 0; i < rows.length; i++)
						{
							if (rows[i] instanceof com.mxgraph.io.vsdx.geometry.NURBSTo)
							{
								//TODO HAndle NURBS points (convert to curved edge with these points)
								//var str = rows[i].handle({}, edgeShape);
							}
						}
					}
					catch(e){} //Ignore
				};
				
                /**
                 * Adds a connected edge to the graph.
                 * These edged are the referenced in one Connect element at least.
                 * @param {mxGraph} graph graph Graph where the parsed graph is included.
                 * @param {com.mxgraph.io.vsdx.mxVsdxConnect} connect Connect Element that references an edge shape and the source vertex.
                 * @param {number} pageId
                 * @param {number} pageHeight
                 * @return {com.mxgraph.io.vsdx.ShapePageId}
                 */
                mxVsdxCodec.prototype.addConnectedEdge = function (graph, connect, pageId, pageHeight) {
                    var fromSheet = connect.getFromSheet();
                    var edgeId = new com.mxgraph.io.vsdx.ShapePageId(pageId, fromSheet);
                    var edgeShape = (function (m, k) { if (m.entries == null)
                        m.entries = []; for (var i = 0; i < m.entries.length; i++)
                        if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                            return m.entries[i].value;
                        } return null; })(this.edgeShapeMap, edgeId);
                    if (edgeShape == null) {
                        return null;
                    }
                    var parent = (function (m, k) { if (m.entries == null)
                        m.entries = []; for (var i = 0; i < m.entries.length; i++)
                        if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                            return m.entries[i].value;
                        } return null; })(this.parentsMap, new com.mxgraph.io.vsdx.ShapePageId(pageId, edgeShape.getId()));
                    var parentHeight = pageHeight;
                    if (parent != null) {
                        var parentGeo = graph.getModel().getGeometry(parent);
                        if (parentGeo != null) {
                            parentHeight = parentGeo.height;
                        }
                    }
                    var beginXY = edgeShape.getStartXY(parentHeight);
                    var endXY = edgeShape.getEndXY(parentHeight);
                    var points = edgeShape.getRoutingPoints(parentHeight, beginXY, edgeShape.getRotation());
                    this.rotateChildEdge(graph.getModel(), parent, beginXY, endXY, points);
                    var fromConstraint = null;
                    var sourceSheet = connect.getSourceToSheet();
                    var source = sourceSheet != null ? (function (m, k) { if (m.entries == null)
                        m.entries = []; for (var i = 0; i < m.entries.length; i++)
                        if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                            return m.entries[i].value;
                        } return null; })(this.vertexMap, new com.mxgraph.io.vsdx.ShapePageId(pageId, sourceSheet)) : null;
                    
                    var removeFirstPt = true;
					//Treat source with zero height/width as null since constraint calc will be invalid
                    if (source == null || source.geometry.width == 0 || source.geometry.height == 0) 
                    {
                        source = graph.insertVertex(parent, null, null, Math.floor(Math.round(beginXY.x * 100) / 100), Math.floor(Math.round(beginXY.y * 100) / 100), 0, 0);
                    }
                    else if (source.style && source.style.indexOf(';rotation=') == -1)
            		{
                        var absOriginFrom = mxVsdxCodec.calculateAbsolutePoint(source);
                        var absBeginXY = mxVsdxCodec.calculateAbsolutePoint(parent);
                        var srcGeo = source.geometry;
                        fromConstraint = new mxPoint(
                                (absBeginXY.x + beginXY.x - absOriginFrom.x)
                                        / srcGeo.width,
                                (absBeginXY.y + beginXY.y - absOriginFrom.y)
                                        / srcGeo.height);
                        //TODO fromConstraint rotation support
            		}
                    else
                	{
                    	removeFirstPt = false;
                	}
                    
                    var toConstraint = null;
                    var toSheet = connect.getTargetToSheet();
                    var target = toSheet != null ? (function (m, k) { if (m.entries == null)
                        m.entries = []; for (var i = 0; i < m.entries.length; i++)
                        if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                            return m.entries[i].value;
                        } return null; })(this.vertexMap, new com.mxgraph.io.vsdx.ShapePageId(pageId, toSheet)) : null;
                    
                    var removeLastPt = true;
					//Treat target with zero height/width as null since constraint calc will be invalid
                    if (target == null || target.geometry.width == 0 || target.geometry.height == 0) 
                    {
                        target = graph.insertVertex(parent, null, null, Math.floor(Math.round(endXY.x * 100) / 100), Math.floor(Math.round(endXY.y * 100) / 100), 0, 0);
                    }
                    else if (target.style && target.style.indexOf(';rotation=') == -1)
            		{
                        var absOriginTo = mxVsdxCodec.calculateAbsolutePoint(target);
                        var absEndXY = mxVsdxCodec.calculateAbsolutePoint(parent);
                        var trgGeo = target.geometry;
                        toConstraint = new mxPoint(
                                (absEndXY.x + endXY.x - absOriginTo.x)
                                        / trgGeo.width,
                                (absEndXY.y + endXY.y - absOriginTo.y)
                                        / trgGeo.height);
                        //TODO toConstraint rotation support
            		}
                    else 
                    {
                    	removeLastPt = false;
                    }
                    
                    var styleMap = edgeShape.getStyleFromEdgeShape(parentHeight);
                    var edge;
                    var rotation = edgeShape.getRotation();
                    if (rotation !== 0) {
                        edge = graph.insertEdge(parent, null, null, source, target, com.mxgraph.io.vsdx.mxVsdxUtils.getStyleString(styleMap, "="));
                        var label = edgeShape.createLabelSubShape(graph, edge);
                        if (label != null) {
                            label.setStyle(label.getStyle() + ";rotation=" + (rotation > 60 && rotation < 240 ? (rotation + 180) % 360 : rotation));
                            var geo = label.getGeometry();
                            geo.x = (0);
                            geo.y = (0);
                            geo.relative = (true);
                            geo.offset = (new mxPoint(-geo.width / 2, -geo.height / 2));
                        }
                    }
                    else {
                        edge = graph.insertEdge(parent, null, edgeShape.getTextLabel(true), source, target, com.mxgraph.io.vsdx.mxVsdxUtils.getStyleString(styleMap, "="));
                        var lblOffset = edgeShape.getLblEdgeOffset(graph.getView(), points);
                        edge.getGeometry().offset = (lblOffset);
                        
                        //add entry/exit points when edge, src, and trg are not rotated
                        if (fromConstraint != null)
            			{
            				graph.setConnectionConstraint(edge, source, true,
            						new mxConnectionConstraint(fromConstraint, false));
            			}
                        
                        if (removeFirstPt)
                    	{
	                        points.shift();
                    	}
                        
            			if (toConstraint != null)
            			{
            				graph.setConnectionConstraint(edge, target, false,
            						new mxConnectionConstraint(toConstraint, false));
            			}
            			
            			if (removeLastPt)
        				{
	        				points.pop();
                        }
                    }
                    var edgeGeometry = graph.getModel().getGeometry(edge);
                    
                    //when source.parent != target.parent the front end will change the edge parent to parent 1 but waypoints are not corrected
                    if (source.parent != target.parent && parent != null && parent.id != 1 && source.parent.id == 1)
                	{
                    	var accX = 0;
                    	var accY = 0;
                    	
                    	var prnt = parent;
                    	
                    	do 
                    	{
                        	var prntGeo = prnt.geometry;
                        	
                            if (prntGeo != null) 
                            {
                            	accX += prntGeo.x;
                            	accY += prntGeo.y;
                            }
                            prnt = prnt.parent;
                    	}
                    	while(prnt != null);
                    	
                    	edge.parent = source.parent;
                    	
                    	for (var i = 0; i < points.length; i++)
                		{
                    		points[i].x += accX;
                    		points[i].y += accY;
                		}
                	}
                    
                    edgeGeometry.points = (points);
                    if (styleMap.hasOwnProperty("curved") && (function (o1, o2) { if (o1 && o1.equals) {
                        return o1.equals(o2);
                    }
                    else {
                        return o1 === o2;
                    } })(/* get */ (function (m, k) { return m[k] ? m[k] : null; })(styleMap, "curved"), "1")) {
                        edgeGeometry = graph.getModel().getGeometry(edge);
                        var pointList = edgeShape.getControlPoints(parentHeight);
                        edgeGeometry.points = (pointList);
                    }

					this.processEdgeGeo(edgeShape, edge) ;

                    var layers = this.layerIndexToNames(edgeShape.layerMember);
                            
                    if (layers != null)
                    {
                        graph.addTagsForCells([edge], layers);
                    }

                    return edgeId;
                };
                /**
                 * Adds a new edge not connected to any vertex to the graph.
                 * @param {mxGraph} graph Graph where the parsed graph is included.
                 * @param {*} parent Parent cell of the edge to be imported.
                 * @param {com.mxgraph.io.vsdx.VsdxShape} edgeShape Shape Element that represents an edge.
                 * @return {*} The new edge added.
                 * @param {number} pageHeight
                 */
                mxVsdxCodec.prototype.addUnconnectedEdge = function (graph, parent, edgeShape, pageHeight) {
                    var parentHeight = pageHeight;
                    if (parent != null) {
                        var parentGeometry = graph.getModel().getGeometry(parent);
                        if (parentGeometry != null) {
                            parentHeight = parentGeometry.height;
                        }
                    }
                    var beginXY = edgeShape.getStartXY(parentHeight);
                    var endXY = edgeShape.getEndXY(parentHeight);
                    var styleMap = edgeShape.getStyleFromEdgeShape(parentHeight);
                    var edge;
                    var points = edgeShape.getRoutingPoints(parentHeight, beginXY, edgeShape.getRotation());
                    var rotation = edgeShape.getRotation();
                    if (rotation !== 0) {
                        if (edgeShape.getShapeIndex() === 0) {
                            edge = graph.insertEdge(parent, null, null, null, null, com.mxgraph.io.vsdx.mxVsdxUtils.getStyleString(styleMap, "="));
                        }
                        else {
                            edge = graph.createEdge(parent, null, null, null, null, com.mxgraph.io.vsdx.mxVsdxUtils.getStyleString(styleMap, "="));
                            edge = graph.addEdge(edge, parent, null, null, edgeShape.getShapeIndex() + this.shapeIndexShift++);
                        }
                        var label = edgeShape.createLabelSubShape(graph, edge);
                        if (label != null) {
                            label.setStyle(label.getStyle() + ";rotation=" + (rotation > 60 && rotation < 240 ? (rotation + 180) % 360 : rotation));
                            var geo = label.getGeometry();
                            geo.x = (0);
                            geo.y = (0);
                            geo.relative = (true);
                            geo.offset = (new mxPoint(-geo.width / 2, -geo.height / 2));
                        }
                    }
                    else {
                        if (edgeShape.getShapeIndex() === 0) {
                            edge = graph.insertEdge(parent, null, edgeShape.getTextLabel(true), null, null, com.mxgraph.io.vsdx.mxVsdxUtils.getStyleString(styleMap, "="));
                        }
                        else {
                            edge = graph.createEdge(parent, null, edgeShape.getTextLabel(true), null, null, com.mxgraph.io.vsdx.mxVsdxUtils.getStyleString(styleMap, "="));
                            edge = graph.addEdge(edge, parent, null, null, edgeShape.getShapeIndex() + this.shapeIndexShift++);
                        }
                        var lblOffset = edgeShape.getLblEdgeOffset(graph.getView(), points);
                        edge.getGeometry().offset = (lblOffset);
                    }
                    this.rotateChildEdge(graph.getModel(), parent, beginXY, endXY, points);
                    var edgeGeometry = graph.getModel().getGeometry(edge);
                    //remove begin/end points from points array
                    points.pop();
                    points.shift();
                    edgeGeometry.points = (points);
                    edgeGeometry.setTerminalPoint(beginXY, true);
                    edgeGeometry.setTerminalPoint(endXY, false);
                    if (styleMap.hasOwnProperty("curved") && (function (o1, o2) { if (o1 && o1.equals) {
                        return o1.equals(o2);
                    }
                    else {
                        return o1 === o2;
                    } })(/* get */ (function (m, k) { return m[k] ? m[k] : null; })(styleMap, "curved"), "1")) {
                        edgeGeometry = graph.getModel().getGeometry(edge);
                        var pointList = edgeShape.getControlPoints(parentHeight);
                        edgeGeometry.points = (pointList);
                    }

					this.processEdgeGeo(edgeShape, edge) ;

                    return edge;
                };
                mxVsdxCodec.prototype.rotateChildEdge = function (model, parent, beginXY, endXY, points) {
                    if (parent != null) {
                        var pgeo = model.getGeometry(parent);
                        var pStyle = model.getStyle(parent);
                        if (pgeo != null && pStyle != null) {
                            var pos = pStyle.indexOf("rotation=");
                            if (pos > -1) {
                                var pRotation = parseFloat(pStyle.substring(pos + 9, pStyle.indexOf(';', pos)));
                                var hw = pgeo.width / 2;
                                var hh = pgeo.height / 2;
                                mxVsdxCodec.rotatedEdgePoint(beginXY, pRotation, hw, hh);
                                mxVsdxCodec.rotatedEdgePoint(endXY, pRotation, hw, hh);
                                for (var index126 = 0; index126 < points.length; index126++) {
                                    var p = points[index126];
                                    {
                                        mxVsdxCodec.rotatedEdgePoint(p, pRotation, hw, hh);
                                    }
                                }
                            }
                        }
                    }
                };
                /**
                 * Post processes groups to remove leaf vertices that render nothing
                 * @param group
                 * @param {mxGraph} graph
                 */
                mxVsdxCodec.prototype.sanitiseGraph = function (graph) {
                    var root = graph.getModel().getRoot();
                    this.sanitiseCell(graph, root);
                };
                /*private*/ mxVsdxCodec.prototype.sanitiseCell = function (graph, cell) {
                    var model = graph.getModel();
                    var childCount = model.getChildCount(cell);
                    var removeList = ([]);
                    for (var i = 0; i < childCount; i++) {
                        var child = model.getChildAt(cell, i);
                        var remove = this.sanitiseCell(graph, child);
                        if (remove) {
                            /* add */ (removeList.push(child));
                        }
                    }
                    ;
                    for (var index127 = 0; index127 < removeList.length; index127++) {
                        var removeChild = removeList[index127];
                        {
                            model.remove(removeChild);
                        }
                    }
                    
                    //Check for -ve width/height cells and correct it
                    var geo = cell.geometry;
                    
                    if (geo != null)
                	{
                    	if (geo.height < 0)
                		{
                    		geo.height = Math.abs(geo.height);
                    		geo.y -= geo.height;
                    		cell.style += ';flipV=1;';
                		}

                    	if (geo.width < 0)
                		{
                    		geo.width = Math.abs(geo.width);
                    		geo.x -= geo.width;
                    		cell.style += ';flipH=1;';
                		}
                	}
                    
                    if (childCount > 0) {
                        childCount = model.getChildCount(cell);
                    }
                    var value = new String(model.getValue(cell)).toString();
                    var style = model.getStyle(cell);
                    if (childCount === 0 && model.isVertex(cell)) {
                        if ((model.getValue(cell) == null || (value.length === 0)) && (style != null) && (style.indexOf(mxConstants.STYLE_FILLCOLOR + "=none") != -1) && (style.indexOf(mxConstants.STYLE_STROKECOLOR + "=none") != -1) && (style.indexOf("image=") == -1)) {
                            return true;
                        }
                    }
                    return false;
                };
                return mxVsdxCodec;
            }());
            io.mxVsdxCodec = mxVsdxCodec;
            mxVsdxCodec["__class"] = "com.mxgraph.io.mxVsdxCodec";
        })(io = mxgraph.io || (mxgraph.io = {}));
    })(mxgraph = com.mxgraph || (com.mxgraph = {}));
})(com || (com = {}));
(function (com) {
    var mxgraph;
    (function (mxgraph) {
        var io;
        (function (io) {
            var mxVssxCodec = (function (_super) {
                __extends(mxVssxCodec, _super);
                function mxVssxCodec(editorUi) {
                    var _this = _super.call(this) || this;
                    _this.RESPONSE_END = "";
                    _this.RESPONSE_DIAGRAM_START = "";
                    _this.RESPONSE_DIAGRAM_END = "";
                    _this.RESPONSE_HEADER = "";
                    _this.editorUi = editorUi;
                    return _this;
                }
                mxVssxCodec.prototype.decodeVssx = function (file, callback, charset, onerror) {
                	var _this = this;
                    var library = { str: "<mxlibrary>[", toString: function () { return this.str; } };
                    this.decodeVsdx(file, function(shapesInPages) 
            		{
                        /* append */ (function (sb) { return sb.str = sb.str.concat(shapesInPages); })(library);
                        var masterShapes = _this.vsdxModel.getMasterShapes();
                        var page = (function (a) { var i = 0; return { next: function () { return i < a.length ? a[i++] : null; }, hasNext: function () { return i < a.length; } }; })(/* values */ (function (m) { var r = []; if (m.entries == null)
                            m.entries = []; for (var i = 0; i < m.entries.length; i++)
                            r.push(m.entries[i].value); return r; })(_this.vsdxModel.getPages())).next();
                        if (masterShapes != null) {
                            var shapes_1 = { str: "", toString: function () { return this.str; } };
                            var comma_1 = (shapesInPages.length === 0) ? "" : ",";
                            {
                                var array129 = (function (obj) { return Object.keys(obj).map(function (key) { return obj[key]; }); })(masterShapes);
                                var _loop_1 = function (index128) {
                                    var master = array129[index128];
                                    {
                                        var shapeGraph = this_1.createMxGraph();
                                        
                                        var scale = 1;
                                        
                                        if (master.pageSheet != null)
                                    	{
                                        	 var dScaleV = 1, pScaleV = 1;
                                        	 var dScale = master.pageSheet["DrawingScale"];
                                             
                                        	 if (dScale != null) 
                                             {
                                        		 dScaleV = parseFloat(dScale.getAttribute("V")) || 1;
                                             }
                                             
                                        	 var pScale = master.pageSheet["PageScale"];
                                             
                                        	 if (pScale != null) 
                                             {
                                        		 pScaleV = parseFloat(pScale.getAttribute("V")) || 1;
                                             }
                                        	 
                                        	 scale = pScaleV / dScaleV;
                                    	}

                                        var hasCells = false;
                                        
                                        for (var chI = 0; master.firstLevelShapes != null && chI < master.firstLevelShapes.length; chI++)
                                        {
	                                        var shapeElem = master.firstLevelShapes[chI].getShape();
	                                        var shape = new com.mxgraph.io.vsdx.VsdxShape(page, shapeElem, !page.isEdge(shapeElem), masterShapes, null, this_1.vsdxModel);
	
	                                        var cell = null;
	                                        if (shape.isVertex()) {
	                                            /* clear */ this_1.edgeShapeMap.entries = [];
	                                            /* clear */ this_1.parentsMap.entries = [];
	                                            cell = this_1.addShape(shapeGraph, shape, shapeGraph.getDefaultParent(), 0, 1169);
	                                            {
	                                                var array131 = (function (m) { if (m.entries == null)
	                                                    m.entries = []; return m.entries; })(this_1.edgeShapeMap);
	                                                for (var index130 = 0; index130 < array131.length; index130++) {
	                                                    var edgeEntry = array131[index130];
	                                                    {
	                                                        var parent_1 = (function (m, k) { if (m.entries == null)
	                                                            m.entries = []; for (var i = 0; i < m.entries.length; i++)
	                                                            if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
	                                                                return m.entries[i].value;
	                                                            } return null; })(this_1.parentsMap, edgeEntry.getKey());
	                                                        this_1.addUnconnectedEdge(shapeGraph, parent_1, edgeEntry.getValue(), 1169);
	                                                    }
	                                                }
	                                            }
	                                        }
	                                        else {
	                                            cell = this_1.addUnconnectedEdge(shapeGraph, null, shape, 1169);
	                                        }
	                                        
	                                        hasCells |= (cell != null);
                                        }
                                        
                                        if (hasCells) 
                                        {
                                        	this_1.scaleGraph(shapeGraph, scale);
                                        	var size = this_1.normalizeGraph(shapeGraph);
                                            this_1.sanitiseGraph(shapeGraph);
                                            if (shapeGraph.getModel().getChildCount(shapeGraph.getDefaultParent()) === 0)
                                                return "continue";
                                            /* append */ (function (sb) { return sb.str = sb.str.concat(comma_1); })(shapes_1);
                                            /* append */ (function (sb) { return sb.str = sb.str.concat("{\"xml\":\""); })(shapes_1);
                                            var shapeXML_1 = _super.prototype.processPage.call(this_1, shapeGraph, null);
                                            /* append */ (function (sb) { return sb.str = sb.str.concat(shapeXML_1); })(shapes_1);
                                            /* append */ (function (sb) { return sb.str = sb.str.concat("\",\"w\":"); })(shapes_1);
                                            /* append */ (function (sb) { return sb.str = sb.str.concat(size.width); })(shapes_1);
                                            /* append */ (function (sb) { return sb.str = sb.str.concat(",\"h\":"); })(shapes_1);
                                            /* append */ (function (sb) { return sb.str = sb.str.concat(size.height); })(shapes_1);
                                            /* append */ (function (sb) { return sb.str = sb.str.concat(",\"title\":"); })(shapes_1);
                                            var shapeName_1 = master.getName();
                                            if (shapeName_1 == null)
                                        	{
                                            	shapeName_1 = "";
                                        	}
                                            shapeName_1 = mxUtils.htmlEntities(JSON.stringify(shapeName_1));
                                            /* append */ (function (sb) { return sb.str = sb.str.concat(shapeName_1); })(shapes_1);
                                            /* append */ (function (sb) { return sb.str = sb.str.concat("}"); })(shapes_1);
                                            comma_1 = ",";
                                        }
                                    }
                                };
                                var this_1 = _this;
                                for (var index128 = 0; index128 < array129.length; index128++) {
                                    _loop_1(index128);
                                }
                            }
                            /* append */ (function (sb) { return sb.str = sb.str.concat(shapes_1); })(library);
                        }
                        /* append */ (function (sb) { return sb.str = sb.str.concat("]</mxlibrary>"); })(library);
                        if (callback)
                    	{
	                    	try
	                    	{
	                    		callback(library.str);
	                    	}
	                    	catch(e)
	                    	{
	                    		if (onerror != null) 
	                    		{
	                    			onerror(e);
	                    		}
	                    		else
	                    		{
	                    			callback("");
	                    		}
	                    	}
                    	}
                    }, charset);
                };
                mxVssxCodec.prototype.normalizeGeo = function (cell) {
                    var geo = cell.getGeometry();
                    geo.x = (0);
                    geo.y = (0);
                    var srcP = geo.sourcePoint;
                    if (cell.isEdge() && srcP != null) {
                        this.transPoint(geo.targetPoint, srcP);
                        this.transPoint(geo.offset, srcP);
                        var points = geo.points;
                        if (points != null) {
                            for (var index132 = 0; index132 < points.length; index132++) {
                                var p = points[index132];
                                {
                                    this.transPoint(p, srcP);
                                }
                            }
                        }
                        this.transPoint(srcP, srcP);
                    }
                    return geo;
                };
                
                mxVssxCodec.prototype.normalizeGraph = function (graph) 
                {
                	//Find minX/Y, maxX/Y
                	var minX, minY, maxX, maxY;

                	function getDimMinMax(pt)
                	{
                		if (pt != null)
                		{
                			if (minX == null)
	            			{
	                			minX = pt.x; minY = pt.y; maxX = pt.x + (pt.width || 0); maxY = pt.y + (pt.height || 0);
	            			}
	                		else
                			{
	                			minX = Math.min(pt.x, minX);
	                			minY = Math.min(pt.y, minY);
	                			maxX = Math.max(pt.x + (pt.width || 0), maxX);
	                			maxY = Math.max(pt.y + (pt.height || 0), maxY);
                			}
                		}
                	};
                	
                	for (var id in graph.model.cells)
            		{
                		var cell = graph.model.cells[id];
                		var geo = cell.geometry;
                		
                		if (geo != null && cell.parent.id == 1)
                		{
                			if (cell.vertex)
                			{
                				getDimMinMax(geo);
                			}
                			else
            				{
                				getDimMinMax(geo.sourcePoint);
							    getDimMinMax(geo.targetPoint);
							    var points = geo.points;
							    
							    for (var i = 0; points != null && i < points.length; i++) 
								{
							        getDimMinMax(points[i]);   
							    }
            				}
                		}
            		}
                	
                	//Remove minX, minY from all geo and fix edges also
                	var srcP = {x: minX, y: minY};
                	
                	for (var id in graph.model.cells)
            		{
                		var cell = graph.model.cells[id];
                		var geo = cell.geometry;
                		
                		if (geo != null && cell.parent.id == 1)
                		{
	                		geo.x -= minX;
	                		geo.y -= minY;
                	
	                		if (cell.isEdge())
	            			{
		                        this.transPoint(geo.sourcePoint, srcP);
	                			this.transPoint(geo.targetPoint, srcP);
		                        this.transPoint(geo.offset, srcP);
		                        var points = geo.points;
		                        
	                            for (var i = 0; points != null && i < points.length; i++) 
	                            {
	                                this.transPoint(points[i], srcP);
	                            }
	            			}
                		}
            		}

                	return {width: maxX - minX, height: maxY - minY}
                };
                
                mxVssxCodec.prototype.transPoint = function (p, srcP) {
                    if (p != null) {
                        p.x = (p.x - srcP.x);
                        p.y = (p.y - srcP.y);
                    }
                };
                /**
                 *
                 * @param {com.mxgraph.io.mxGraph} graph
                 * @param {com.mxgraph.io.vsdx.mxVsdxPage} page
                 * @return {string}
                 */
                mxVssxCodec.prototype.processPage = function (graph, page) {
                    var model = graph.getModel();
                    var shapes = { str: "", toString: function () { return this.str; } };
                    var comma = "";
                    {
                    	var this_2 = this;
                        for (var id in model.cells) {
                            var c = model.cells[id];
                            {
                                if (graph.getDefaultParent() === model.getParent(c)) {
                                    /* append */ (function (sb) { return sb.str = sb.str.concat(comma); })(shapes);
                                    /* append */ (function (sb) { return sb.str = sb.str.concat("{\"xml\":\""); })(shapes);
                                    var shapeGraph = this_2.createMxGraph();
                                    shapeGraph.addCell(c);
                                    this_2.sanitiseGraph(shapeGraph);
                                    if (shapeGraph.getModel().getChildCount(shapeGraph.getDefaultParent()) === 0)
                                        return "continue";
                                    var geo_2 = this_2.normalizeGeo(c);
                                    var shapeXML_2 = _super.prototype.processPage.call(this_2, shapeGraph, null);
                                    /* append */ (function (sb) { return sb.str = sb.str.concat(shapeXML_2); })(shapes);
                                    /* append */ (function (sb) { return sb.str = sb.str.concat("\",\"w\":"); })(shapes);
                                    /* append */ (function (sb) { return sb.str = sb.str.concat(geo_2.width); })(shapes);
                                    /* append */ (function (sb) { return sb.str = sb.str.concat(",\"h\":"); })(shapes);
                                    /* append */ (function (sb) { return sb.str = sb.str.concat(geo_2.height); })(shapes);
                                    /* append */ (function (sb) { return sb.str = sb.str.concat(",\"title\":\""); })(shapes);
                                    var style = model.getStyle(c);
                                    var name_1 = "";
                                    if (style != null) {
                                        var p = style.indexOf(com.mxgraph.io.vsdx.mxVsdxConstants.VSDX_ID);
                                        if (p >= 0) {
                                            p += com.mxgraph.io.vsdx.mxVsdxConstants.VSDX_ID.length + 1;
                                            var id = parseInt(style.substring(p, style.indexOf(";", p)));
                                            var vsdxShape = (function (m, k) { if (m.entries == null)
                                                m.entries = []; for (var i = 0; i < m.entries.length; i++)
                                                if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                                    return m.entries[i].value;
                                                } return null; })(this_2.vertexShapeMap, new com.mxgraph.io.vsdx.ShapePageId(page.getId(), id));
                                            if (vsdxShape != null)
                                                name_1 = vsdxShape.getName();
                                        }
                                    }
                                    /* append */ (function (sb) { return sb.str = sb.str.concat(name_1); })(shapes);
                                    /* append */ (function (sb) { return sb.str = sb.str.concat("\"}"); })(shapes);
                                    comma = ",";
                                }
                            }
                        };
                    }
                    if (shapes.str.length > 0)
                        this.RESPONSE_DIAGRAM_START = ",";
                    else
                        this.RESPONSE_DIAGRAM_START = "";
                    return shapes.str;
                };
                return mxVssxCodec;
            }(com.mxgraph.io.mxVsdxCodec));
            io.mxVssxCodec = mxVssxCodec;
            mxVssxCodec["__class"] = "com.mxgraph.io.mxVssxCodec";
        })(io = mxgraph.io || (mxgraph.io = {}));
    })(mxgraph = com.mxgraph || (com.mxgraph = {}));
})(com || (com = {}));
(function (com) {
    var mxgraph;
    (function (mxgraph) {
        var io;
        (function (io) {
            var vsdx;
            (function (vsdx) {
                var geometry;
                (function (geometry) {
                    var Row = (function () {
                        function Row(index, x, y) {
                            this.x = null;
                            this.y = null;
                            this.a = null;
                            this.b = null;
                            this.c = null;
                            this.d = null;
                            this.formulaA = null;
                            this.formulaE = null;
                            this.index = 0;
                            this.index = index;
                            this.x = x;
                            this.y = y;
                        }
                        Row.prototype.getX = function () {
                            return this.x;
                        };
                        Row.prototype.getY = function () {
                            return this.y;
                        };
                        Row.prototype.getA = function () {
                            return this.a;
                        };
                        Row.prototype.getB = function () {
                            return this.b;
                        };
                        Row.prototype.getC = function () {
                            return this.c;
                        };
                        Row.prototype.getD = function () {
                            return this.d;
                        };
                        Row.prototype.getFormulaA = function () {
                            return this.formulaA;
                        };
                        Row.prototype.getFormulaE = function () {
                            return this.formulaE;
                        };
                        Row.prototype.getIndex = function () {
                            return this.index;
                        };
                        return Row;
                    }());
                    geometry.Row = Row;
                    Row["__class"] = "com.mxgraph.io.vsdx.geometry.Row";
                })(geometry = vsdx.geometry || (vsdx.geometry = {}));
            })(vsdx = io.vsdx || (io.vsdx = {}));
        })(io = mxgraph.io || (mxgraph.io = {}));
    })(mxgraph = com.mxgraph || (com.mxgraph = {}));
})(com || (com = {}));
(function (com) {
    var mxgraph;
    (function (mxgraph) {
        var io;
        (function (io) {
            var vsdx;
            (function (vsdx) {
                var geometry;
                (function (geometry) {
                    var RowFactory = (function () {
                        function RowFactory() {
                        }
                        /*private*/ RowFactory.getIndex = function (elem) {
                            try {
                                return parseInt(elem.getAttribute("IX")) || 1;
                            }
                            catch (e) {
                                return 1;
                            }
                            ;
                        };
                        /*private*/ RowFactory.getDoubleVal = function (val) {
                            try {
                                if (val != null && !(val.length === 0)) {
                                    var fVal = parseFloat(val);
                                    
                                    if (isFinite(fVal))
                                    	return fVal;
                                }
                            }
                            catch (e) {
                            }
                            ;
                            return null;
                        };
                        RowFactory.getRowObj = function (elem, pRows) {
                            var rowType = elem.getAttribute("T");
                            var index = RowFactory.getIndex(elem);
                            var del = elem.getAttribute("Del");
                            if (!(function (o1, o2) { if (o1 && o1.equals) {
                                return o1.equals(o2);
                            }
                            else {
                                return o1 === o2;
                            } })(del, "1")) {
                                var parentObj = null;
                                if (index <= pRows.length) {
                                    parentObj = pRows[index - 1];
                                }
                                var x = null;
                                var y = null;
                                var a = null;
                                var b = null;
                                var c = null;
                                var d = null;
                                var formulaE = null;
                                var formulaA = null;
                                if (parentObj != null) {
                                    x = parentObj.x;
                                    y = parentObj.y;
                                    a = parentObj.getA();
                                    b = parentObj.getB();
                                    c = parentObj.getC();
                                    d = parentObj.getD();
                                    formulaA = parentObj.getFormulaA();
                                    formulaE = parentObj.getFormulaE();
                                }
                                var cells = com.mxgraph.io.vsdx.mxVsdxUtils.getDirectChildElements(elem);
                                for (var index121 = 0; index121 < cells.length; index121++) {
                                    var cell = cells[index121];
                                    {
                                        var name_1 = cell.getAttribute("N");
                                        var val = cell.getAttribute("V");
                                        switch ((name_1)) {
                                            case "X":
                                                x = RowFactory.getDoubleVal(val);
                                                break;
                                            case "Y":
                                                y = RowFactory.getDoubleVal(val);
                                                break;
                                            case "A":
                                                a = RowFactory.getDoubleVal(val);
                                                formulaA = cell.getAttribute("V");
                                                break;
                                            case "B":
                                                b = RowFactory.getDoubleVal(val);
                                                break;
                                            case "C":
                                                c = RowFactory.getDoubleVal(val);
                                                break;
                                            case "D":
                                                d = RowFactory.getDoubleVal(val);
                                                break;
                                            case "E":
                                                formulaE = val;
                                                break;
                                        }
                                    }
                                }
                                switch ((rowType)) {
                                    case "MoveTo":
                                        return new com.mxgraph.io.vsdx.geometry.MoveTo(index, x, y);
                                    case "LineTo":
                                        return new com.mxgraph.io.vsdx.geometry.LineTo(index, x, y);
                                    case "ArcTo":
                                        return new com.mxgraph.io.vsdx.geometry.ArcTo(index, x, y, a);
                                    case "Ellipse":
                                        return new com.mxgraph.io.vsdx.geometry.Ellipse(index, x, y, a, b, c, d);
                                    case "EllipticalArcTo":
                                        return new com.mxgraph.io.vsdx.geometry.EllipticalArcTo(index, x, y, a, b, c, d);
                                    case "InfiniteLine":
                                        return new com.mxgraph.io.vsdx.geometry.InfiniteLine(index, x, y, a, b);
                                    case "NURBSTo":
                                        return new com.mxgraph.io.vsdx.geometry.NURBSTo(index, x, y, a, b, c, d, formulaE);
                                    case "PolylineTo":
                                        return new com.mxgraph.io.vsdx.geometry.PolylineTo(index, x, y, formulaA);
                                    case "RelCubBezTo":
                                        return new com.mxgraph.io.vsdx.geometry.RelCubBezTo(index, x, y, a, b, c, d);
                                    case "RelEllipticalArcTo":
                                        return new com.mxgraph.io.vsdx.geometry.RelEllipticalArcTo(index, x, y, a, b, c, d);
                                    case "RelLineTo":
                                        return new com.mxgraph.io.vsdx.geometry.RelLineTo(index, x, y);
                                    case "RelMoveTo":
                                        return new com.mxgraph.io.vsdx.geometry.RelMoveTo(index, x, y);
                                    case "RelQuadBezTo":
                                        return new com.mxgraph.io.vsdx.geometry.RelQuadBezTo(index, x, y, a, b);
                                    case "SplineKnot":
                                        return new com.mxgraph.io.vsdx.geometry.SplineKnot(index, x, y, a);
                                    case "SplineStart":
                                        return new com.mxgraph.io.vsdx.geometry.SplineStart(index, x, y, a, b, c, d);
                                }
                            }
                            return new com.mxgraph.io.vsdx.geometry.DelRow(index);
                        };
                        return RowFactory;
                    }());
                    geometry.RowFactory = RowFactory;
                    RowFactory["__class"] = "com.mxgraph.io.vsdx.geometry.RowFactory";
                })(geometry = vsdx.geometry || (vsdx.geometry = {}));
            })(vsdx = io.vsdx || (io.vsdx = {}));
        })(io = mxgraph.io || (mxgraph.io = {}));
    })(mxgraph = com.mxgraph || (com.mxgraph = {}));
})(com || (com = {}));
(function (com) {
    var mxgraph;
    (function (mxgraph) {
        var io;
        (function (io) {
            var vsdx;
            (function (vsdx) {
                /**
                 * This is a singleton class that stores various global properties to document.<br/>
                 * The properties are:
                 * <ul>
                 * <li>
                 * document's colors
                 * </li>
                 * <li>
                 * document's fonts
                 * </li>
                 * <li>
                 * default text style
                 * </li>
                 * <li>
                 * default line style
                 * </li>
                 * <li>
                 * default fill style
                 * </li>
                 * </ul>
                 * @class
                 */
                var mxPropertiesManager = (function () {
                    function mxPropertiesManager() {
                        /**
                         * Map with the document's colors.<br/>
                         * The key is the index number and the value is the hex representation of the color.
                         */
                        /*private*/ this.colorElementMap = ({});
                        /**
                         * Map with the document's fonts.<br/>
                         * The key is the ID and the value is the name of the font.
                         */
                        /*private*/ this.fontElementMap = ({});
                    }
                    mxPropertiesManager.__static_initialize = function () { if (!mxPropertiesManager.__static_initialized) {
                        mxPropertiesManager.__static_initialized = true;
                        mxPropertiesManager.__static_initializer_0();
                    } };
                    mxPropertiesManager.defaultColors_$LI$ = function () { mxPropertiesManager.__static_initialize(); if (mxPropertiesManager.defaultColors == null)
                        mxPropertiesManager.defaultColors = ({}); return mxPropertiesManager.defaultColors; };
                    ;
                    mxPropertiesManager.__static_initializer_0 = function () {
                        /* put */ (mxPropertiesManager.defaultColors_$LI$()["0"] = "#000000");
                        /* put */ (mxPropertiesManager.defaultColors_$LI$()["1"] = "#FFFFFF");
                        /* put */ (mxPropertiesManager.defaultColors_$LI$()["2"] = "#FF0000");
                        /* put */ (mxPropertiesManager.defaultColors_$LI$()["3"] = "#00FF00");
                        /* put */ (mxPropertiesManager.defaultColors_$LI$()["4"] = "#0000FF");
                        /* put */ (mxPropertiesManager.defaultColors_$LI$()["5"] = "#FFFF00");
                        /* put */ (mxPropertiesManager.defaultColors_$LI$()["6"] = "#FF00FF");
                        /* put */ (mxPropertiesManager.defaultColors_$LI$()["7"] = "#00FFFF");
                        /* put */ (mxPropertiesManager.defaultColors_$LI$()["8"] = "#800000");
                        /* put */ (mxPropertiesManager.defaultColors_$LI$()["9"] = "#008000");
                        /* put */ (mxPropertiesManager.defaultColors_$LI$()["10"] = "#000080");
                        /* put */ (mxPropertiesManager.defaultColors_$LI$()["11"] = "#808000");
                        /* put */ (mxPropertiesManager.defaultColors_$LI$()["12"] = "#800080");
                        /* put */ (mxPropertiesManager.defaultColors_$LI$()["13"] = "#008080");
                        /* put */ (mxPropertiesManager.defaultColors_$LI$()["14"] = "#C0C0C0");
                        /* put */ (mxPropertiesManager.defaultColors_$LI$()["15"] = "#E6E6E6");
                        /* put */ (mxPropertiesManager.defaultColors_$LI$()["16"] = "#CDCDCD");
                        /* put */ (mxPropertiesManager.defaultColors_$LI$()["17"] = "#B3B3B3");
                        /* put */ (mxPropertiesManager.defaultColors_$LI$()["18"] = "#9A9A9A");
                        /* put */ (mxPropertiesManager.defaultColors_$LI$()["19"] = "#808080");
                        /* put */ (mxPropertiesManager.defaultColors_$LI$()["20"] = "#666666");
                        /* put */ (mxPropertiesManager.defaultColors_$LI$()["21"] = "#4D4D4D");
                        /* put */ (mxPropertiesManager.defaultColors_$LI$()["22"] = "#333333");
                        /* put */ (mxPropertiesManager.defaultColors_$LI$()["23"] = "#1A1A1A");
                    };
                    /**
                     * Loads the properties of the document.
                     * @param doc Document with the properties.
                     * @param {*} elem
                     * @param {com.mxgraph.io.vsdx.mxVsdxModel} model
                     */
                    mxPropertiesManager.prototype.initialise = function (elem, model) {
                        if (elem != null) {
                            var vdxColors = elem.getElementsByTagName(com.mxgraph.io.vsdx.mxVsdxConstants.COLORS);
                            if (vdxColors.length > 0) {
                                var colors = vdxColors.item(0);
                                var colorList = colors.getElementsByTagName(com.mxgraph.io.vsdx.mxVsdxConstants.COLOR_ENTRY);
                                var colorLength = colorList.length;
                                for (var i = 0; i < colorLength; i++) {
                                    var color = colorList.item(i);
                                    var colorId = color.getAttribute(com.mxgraph.io.vsdx.mxVsdxConstants.INDEX);
                                    var colorValue = color.getAttribute(com.mxgraph.io.vsdx.mxVsdxConstants.RGB);
                                    /* put */ (this.colorElementMap[colorId] = colorValue);
                                }
                                ;
                            }
                            var vdxFonts = elem.getElementsByTagName(com.mxgraph.io.vsdx.mxVsdxConstants.FACE_NAMES);
                            if (vdxFonts.length > 0) {
                                var fonts = vdxFonts.item(0);
                                var fontList = fonts.getElementsByTagName(com.mxgraph.io.vsdx.mxVsdxConstants.FACE_NAME);
                                var fontLength = fontList.length;
                                for (var i = 0; i < fontLength; i++) {
                                    var font = fontList.item(i);
                                    var fontId = font.getAttribute(com.mxgraph.io.vsdx.mxVsdxConstants.ID);
                                    var fontValue = font.getAttribute(com.mxgraph.io.vsdx.mxVsdxConstants.FONT_NAME);
                                    /* put */ (this.fontElementMap[fontId] = fontValue);
                                }
                                ;
                            }
                        }
                    };
                    /**
                     * Returns the color of index indicated in 'ix'.
                     * @param {string} ix Index of the color.
                     * @return {string} Hexadecimal representation of the color.
                     */
                    mxPropertiesManager.prototype.getColor = function (ix) {
                        var color = (function (m, k) { return m[k] ? m[k] : null; })(this.colorElementMap, ix);
                        if (color == null) {
                            color = (function (m, k) { return m[k] ? m[k] : null; })(mxPropertiesManager.defaultColors_$LI$(), ix);
                            if (color == null) {
                                return "";
                            }
                        }
                        return color;
                    };
                    /**
                     * Returns the font of id indicated in 'id'
                     * @param {string} id font's ID
                     * @return {string} Name of the font.
                     */
                    mxPropertiesManager.prototype.getFont = function (id) {
                        var font = (function (m, k) { return m[k] ? m[k] : null; })(this.fontElementMap, id);
                        if (font == null) {
                            return "";
                        }
                        else {
                            return font;
                        }
                    };
                    return mxPropertiesManager;
                }());
                mxPropertiesManager.__static_initialized = false;
                vsdx.mxPropertiesManager = mxPropertiesManager;
                mxPropertiesManager["__class"] = "com.mxgraph.io.vsdx.mxPropertiesManager";
            })(vsdx = io.vsdx || (io.vsdx = {}));
        })(io = mxgraph.io || (mxgraph.io = {}));
    })(mxgraph = com.mxgraph || (com.mxgraph = {}));
})(com || (com = {}));
(function (com) {
    var mxgraph;
    (function (mxgraph) {
        var io;
        (function (io) {
            var vsdx;
            (function (vsdx) {
                /**
                 * Wrapper for connect element
                 * See https://msdn.microsoft.com/en-us/library/office/ff768299%28v=office.14%29.aspx
                 * @param {*} connectElem
                 * @class
                 */
                var mxVsdxConnect = (function () {
                    function mxVsdxConnect(connectElem) {
                        /**
                         * ID of edge
                         */
                        this.fromSheet = null;
                        /**
                         * ID of source
                         */
                        this.sourceToSheet = null;
                        /**
                         * Where connection is made to source
                         */
                        this.sourceToPart = -1;
                        /**
                         * ID of target
                         */
                        this.targetToSheet = null;
                        /**
                         * Where connection is made to target
                         */
                        this.targetToPart = -1;
                        this.fromCell = null;
                        this.endShape = null;
                        var fromSheet = connectElem.getAttribute(com.mxgraph.io.vsdx.mxVsdxConstants.FROM_SHEET);
                        this.fromSheet = (fromSheet != null && !(fromSheet.length === 0)) ? parseFloat(fromSheet) : -1;
                        var fromCell = connectElem.getAttribute(com.mxgraph.io.vsdx.mxVsdxConstants.FROM_CELL);
                        this.addFromCell(connectElem, fromCell);
                    }
                    mxVsdxConnect.prototype.addFromCell = function (connectElem, fromCell) {
                        var toSheet = connectElem.getAttribute(com.mxgraph.io.vsdx.mxVsdxConstants.TO_SHEET);
                        var source = true;
                        if (fromCell != null && (function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(fromCell, com.mxgraph.io.vsdx.mxVsdxConstants.BEGIN_X)) {
                            this.sourceToSheet = (toSheet != null && !(toSheet.length === 0)) ? parseFloat(toSheet) : -1;
                            source = true;
                        }
                        else if (fromCell != null && (function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(fromCell, com.mxgraph.io.vsdx.mxVsdxConstants.END_X)) {
                            this.targetToSheet = (toSheet != null && !(toSheet.length === 0)) ? parseFloat(toSheet) : -1;
                            source = false;
                        }
                        else if (this.sourceToSheet == null) {
                            this.sourceToSheet = (toSheet != null && !(toSheet.length === 0)) ? parseFloat(toSheet) : -1;
                            source = true;
                        }
                        else if (this.targetToSheet == null) {
                            this.targetToSheet = (toSheet != null && !(toSheet.length === 0)) ? parseFloat(toSheet) : -1;
                            source = false;
                        }
                        this.findToPart(connectElem, source);
                    };
                    mxVsdxConnect.prototype.findToPart = function (connectElem, source) {
                        var toPartString = connectElem.getAttribute(com.mxgraph.io.vsdx.mxVsdxConstants.TO_PART);
                        var toPart = (toPartString != null && !(toPartString.length === 0)) ? parseFloat(toPartString) : -1;
                        if (source) {
                            this.sourceToPart = toPart;
                        }
                        else {
                            this.targetToPart = toPart;
                        }
                    };
                    mxVsdxConnect.prototype.getFromSheet = function () {
                        return this.fromSheet;
                    };
                    mxVsdxConnect.prototype.getSourceToSheet = function () {
                        return this.sourceToSheet;
                    };
                    mxVsdxConnect.prototype.getTargetToSheet = function () {
                        return this.targetToSheet;
                    };
                    mxVsdxConnect.prototype.getSourceToPart = function () {
                        return this.sourceToPart;
                    };
                    mxVsdxConnect.prototype.getTargetToPart = function () {
                        return this.targetToPart;
                    };
                    /**
                     *
                     * @param {*} connectElem
                     */
                    mxVsdxConnect.prototype.addConnect = function (connectElem) {
                        this.endShape = connectElem;
                        var fromCell = connectElem.getAttribute(com.mxgraph.io.vsdx.mxVsdxConstants.FROM_CELL);
                        this.addFromCell(connectElem, fromCell);
                    };
                    return mxVsdxConnect;
                }());
                vsdx.mxVsdxConnect = mxVsdxConnect;
                mxVsdxConnect["__class"] = "com.mxgraph.io.vsdx.mxVsdxConnect";
            })(vsdx = io.vsdx || (io.vsdx = {}));
        })(io = mxgraph.io || (mxgraph.io = {}));
    })(mxgraph = com.mxgraph || (com.mxgraph = {}));
})(com || (com = {}));
(function (com) {
    var mxgraph;
    (function (mxgraph) {
        var io;
        (function (io) {
            var vsdx;
            (function (vsdx) {
                /**
                 * This class contains constants used in the Import of .vdx documents.
                 * @class
                 */
                var mxVsdxConstants = (function () {
                    function mxVsdxConstants() {
                    }
                    mxVsdxConstants.SET_VALUES_$LI$ = function () { if (mxVsdxConstants.SET_VALUES == null)
                        mxVsdxConstants.SET_VALUES = ["a", "b"]; return mxVsdxConstants.SET_VALUES; };
                    ;
                    mxVsdxConstants.MY_SET_$LI$ = function () { if (mxVsdxConstants.MY_SET == null)
                        mxVsdxConstants.MY_SET = (mxVsdxConstants.SET_VALUES_$LI$().slice(0).slice(0)); return mxVsdxConstants.MY_SET; };
                    ;
                    return mxVsdxConstants;
                }());
                mxVsdxConstants.ANGLE = "Angle";
                mxVsdxConstants.ARC_TO = "ArcTo";
                mxVsdxConstants.BACKGROUND = "Background";
                mxVsdxConstants.BACK_PAGE = "BackPage";
                mxVsdxConstants.BEGIN_ARROW = "BeginArrow";
                mxVsdxConstants.BEGIN_ARROW_SIZE = "BeginArrowSize";
                mxVsdxConstants.BEGIN_X = "BeginX";
                mxVsdxConstants.BEGIN_Y = "BeginY";
                mxVsdxConstants.BOTTOM_MARGIN = "BottomMargin";
                mxVsdxConstants.BULLET = "Bullet";
                mxVsdxConstants.CASE = "Case";
                mxVsdxConstants.CHARACTER = "Character";
                mxVsdxConstants.COLOR = "Color";
                mxVsdxConstants.COLOR_ENTRY = "ColorEntry";
                mxVsdxConstants.COLORS = "Colors";
                /**
                 * Specifies the color transparency used for characters in a text run.
                 * The value is normalized such that a value of 1 corresponds to 100 percent.
                 * A value of zero specifies that the color is completely opaque;
                 * a value of one specifies that the color is completely transparent.
                 */
                mxVsdxConstants.COLOR_TRANS = "ColorTrans";
                mxVsdxConstants.CONNECT = "Connect";
                mxVsdxConstants.CONNECTS = "Connects";
                mxVsdxConstants.CONNECTION = "Connection";
                mxVsdxConstants.CONTROL = "Control";
                mxVsdxConstants.DELETED = "Del";
                mxVsdxConstants.DOCUMENT_SHEET = "DocumentSheet";
                mxVsdxConstants.ELLIPSE = "Ellipse";
                mxVsdxConstants.ELLIPTICAL_ARC_TO = "EllipticalArcTo";
                mxVsdxConstants.END_ARROW = "EndArrow";
                mxVsdxConstants.END_ARROW_SIZE = "EndArrowSize";
                mxVsdxConstants.END_X = "EndX";
                mxVsdxConstants.END_Y = "EndY";
                mxVsdxConstants.FACE_NAME = "FaceName";
                mxVsdxConstants.FACE_NAMES = "FaceNames";
                mxVsdxConstants.FALSE = "0";
                mxVsdxConstants.FILL = "Fill";
                mxVsdxConstants.FILL_BKGND = "FillBkgnd";
                mxVsdxConstants.FILL_BKGND_TRANS = "FillBkgndTrans";
                mxVsdxConstants.FILL_FOREGND = "FillForegnd";
                mxVsdxConstants.FILL_FOREGND_TRANS = "FillForegndTrans";
                mxVsdxConstants.FILL_PATTERN = "FillPattern";
                mxVsdxConstants.FILL_STYLE = "FillStyle";
                mxVsdxConstants.FILL_GRADIENT_ENABLED = "FillGradientEnabled";
                mxVsdxConstants.FLAGS = "Flags";
                mxVsdxConstants.FLIP_X = "FlipX";
                mxVsdxConstants.FLIP_Y = "FlipY";
                mxVsdxConstants.FONT = "Font";
                mxVsdxConstants.FONT_NAME = "Name";
                mxVsdxConstants.FOREIGN = "Foreign";
                mxVsdxConstants.FROM_CELL = "FromCell";
                mxVsdxConstants.FROM_SHEET = "FromSheet";
                mxVsdxConstants.GEOM = "Geom";
                mxVsdxConstants.HEIGHT = "Height";
                mxVsdxConstants.HORIZONTAL_ALIGN = "HorzAlign";
                mxVsdxConstants.ID = "ID";
                mxVsdxConstants.INDENT_FIRST = "IndFirst";
                mxVsdxConstants.INDENT_LEFT = "IndLeft";
                mxVsdxConstants.INDENT_RIGHT = "IndRight";
                mxVsdxConstants.INDEX = "IX";
                mxVsdxConstants.LEFT_MARGIN = "LeftMargin";
                mxVsdxConstants.LETTER_SPACE = "Letterspace";
                mxVsdxConstants.LINE = "Line";
                mxVsdxConstants.LINE_COLOR = "LineColor";
                mxVsdxConstants.LINE_COLOR_TRANS = "LineColorTrans";
                mxVsdxConstants.LINE_PATTERN = "LinePattern";
                mxVsdxConstants.LINE_STYLE = "LineStyle";
                mxVsdxConstants.LINE_TO = "LineTo";
                mxVsdxConstants.LINE_WEIGHT = "LineWeight";
                mxVsdxConstants.LOC_PIN_X = "LocPinX";
                mxVsdxConstants.LOC_PIN_Y = "LocPinY";
                mxVsdxConstants.MASTER = "Master";
                mxVsdxConstants.MASTER_SHAPE = "MasterShape";
                mxVsdxConstants.MASTERS = "Masters";
                mxVsdxConstants.MOVE_TO = "MoveTo";
                mxVsdxConstants.NAME = "Name";
                mxVsdxConstants.NAME_U = "NameU";
                mxVsdxConstants.NO_LINE = "NoLine";
                mxVsdxConstants.NURBS_TO = "NURBSTo";
                mxVsdxConstants.PAGE = "Page";
                mxVsdxConstants.PAGE_HEIGHT = "PageHeight";
                mxVsdxConstants.PAGE_WIDTH = "PageWidth";
                mxVsdxConstants.PAGES = "Pages";
                mxVsdxConstants.PARAGRAPH = "Paragraph";
                mxVsdxConstants.PIN_X = "PinX";
                mxVsdxConstants.PIN_Y = "PinY";
                mxVsdxConstants.POS = "Pos";
                mxVsdxConstants.RGB = "RGB";
                mxVsdxConstants.RIGHT_MARGIN = "RightMargin";
                mxVsdxConstants.ROUNDING = "Rounding";
                mxVsdxConstants.RTL_TEXT = "RTLText";
                mxVsdxConstants.SIZE = "Size";
                mxVsdxConstants.SHAPE = "Shape";
                mxVsdxConstants.SHAPES = "Shapes";
                mxVsdxConstants.SHAPE_SHDW_SHOW = "ShapeShdwShow";
                mxVsdxConstants.SHDW_PATTERN = "ShdwPattern";
                mxVsdxConstants.SPACE_AFTER = "SpAfter";
                mxVsdxConstants.SPACE_BEFORE = "SpBefore";
                mxVsdxConstants.SPACE_LINE = "SpLine";
                mxVsdxConstants.STRIKETHRU = "Strikethru";
                mxVsdxConstants.STYLE = "Style";
                mxVsdxConstants.STYLE_SHEET = "StyleSheet";
                mxVsdxConstants.STYLE_SHEETS = "StyleSheets";
                mxVsdxConstants.TEXT = "Text";
                mxVsdxConstants.TEXT_BKGND = "TextBkgnd";
                mxVsdxConstants.TEXT_BLOCK = "TextBlock";
                mxVsdxConstants.TEXT_STYLE = "TextStyle";
                mxVsdxConstants.TO_PART = "ToPart";
                mxVsdxConstants.TO_SHEET = "ToSheet";
                mxVsdxConstants.TOP_MARGIN = "TopMargin";
                mxVsdxConstants.TRUE = "1";
                mxVsdxConstants.TXT_ANGLE = "TxtAngle";
                mxVsdxConstants.TXT_HEIGHT = "TxtHeight";
                mxVsdxConstants.TXT_LOC_PIN_X = "TxtLocPinX";
                mxVsdxConstants.TXT_LOC_PIN_Y = "TxtLocPinY";
                mxVsdxConstants.TXT_PIN_X = "TxtPinX";
                mxVsdxConstants.TXT_PIN_Y = "TxtPinY";
                mxVsdxConstants.TXT_WIDTH = "TxtWidth";
                mxVsdxConstants.TYPE = "Type";
                mxVsdxConstants.TYPE_GROUP = "Group";
                mxVsdxConstants.TYPE_SHAPE = "Shape";
                mxVsdxConstants.UNIQUE_ID = "UniqueID";
                mxVsdxConstants.VERTICAL_ALIGN = "VerticalAlign";
                mxVsdxConstants.WIDTH = "Width";
                mxVsdxConstants.X_CON = "XCon";
                mxVsdxConstants.X_DYN = "XDyn";
                mxVsdxConstants.X = "X";
                mxVsdxConstants.Y_CON = "YCon";
                mxVsdxConstants.Y_DYN = "YDyn";
                mxVsdxConstants.Y = "Y";
                mxVsdxConstants.HIDE_TEXT = "HideText";
                mxVsdxConstants.VSDX_ID = "vsdxID";
                mxVsdxConstants.CONNECT_TO_PART_WHOLE_SHAPE = 3;
                vsdx.mxVsdxConstants = mxVsdxConstants;
                mxVsdxConstants["__class"] = "com.mxgraph.io.vsdx.mxVsdxConstants";
            })(vsdx = io.vsdx || (io.vsdx = {}));
        })(io = mxgraph.io || (mxgraph.io = {}));
    })(mxgraph = com.mxgraph || (com.mxgraph = {}));
})(com || (com = {}));
(function (com) {
    var mxgraph;
    (function (mxgraph) {
        var io;
        (function (io) {
            var vsdx;
            (function (vsdx) {
                var mxVsdxGeometry = (function () {
                    function mxVsdxGeometry(elem, parentGeo) {
                        var _this = this;
                        /*private*/ this.noFill = false;
                        /*private*/ this.noLine = false;
                        /*private*/ this.noShow = false;
                        /*private*/ this.noSnap = false;
                        /*private*/ this.noQuickDrag = false;
                        /*private*/ this.rows = null;
                        if (((elem != null && elem.nodeType == 1) || elem === null) && ((parentGeo != null && (parentGeo instanceof Array)) || parentGeo === null)) {
                            var __args = Array.prototype.slice.call(arguments);
                            this.index = 0;
                            this.noFill = false;
                            this.noLine = false;
                            this.noShow = false;
                            this.noSnap = false;
                            this.noQuickDrag = false;
                            this.rows = null;
                            this.index = 0;
                            (function () {
                                _this.index = _this.getIndex$org_w3c_dom_Element(elem);
                                if (parentGeo != null && _this.index < parentGeo.length) {
                                    _this.inheritGeo(/* get */ parentGeo[_this.index]);
                                }
                                _this.processGeoElem(elem);
                            })();
                        }
                        else if (((elem != null && (elem.nodeType == 1)) || elem === null) && parentGeo === undefined) {
                            var __args = Array.prototype.slice.call(arguments);
                            this.index = 0;
                            this.noFill = false;
                            this.noLine = false;
                            this.noShow = false;
                            this.noSnap = false;
                            this.noQuickDrag = false;
                            this.rows = null;
                            this.index = 0;
                            (function () {
                                _this.index = _this.getIndex$org_w3c_dom_Element(elem);
                                _this.processGeoElem(elem);
                            })();
                        }
                        else
                            throw new Error('invalid overload');
                    }
                    mxVsdxGeometry.prototype.getIndex$org_w3c_dom_Element = function (elem) {
                        try {
                            return parseInt(elem.getAttribute("IX")) || 0;
                        }
                        catch (e) {
                            return 0;
                        }
                        ;
                    };
                    mxVsdxGeometry.prototype.getIndex = function (elem) {
                        if (((elem != null && (elem.nodeType == 1)) || elem === null)) {
                            return this.getIndex$org_w3c_dom_Element(elem);
                        }
                        else if (elem === undefined) {
                            return this.getIndex$();
                        }
                        else
                            throw new Error('invalid overload');
                    };
                    /*private*/ mxVsdxGeometry.prototype.processGeoElem = function (elem) {
                        var cellElems = com.mxgraph.io.vsdx.mxVsdxUtils.getDirectChildNamedElements(elem, "Cell");
                        var rowElems = com.mxgraph.io.vsdx.mxVsdxUtils.getDirectChildNamedElements(elem, "Row");
                        if (this.rows == null) {
                            this.rows = ([]);
                            for (var i = 0; i < rowElems.length; i++) {
                                /* add */ (this.rows.push(null));
                            }
                            ;
                        }
                        for (var index122 = 0; index122 < cellElems.length; index122++) {
                            var cellElem = cellElems[index122];
                            {
                                var name_2 = cellElem.getAttribute("N");
                                var val = cellElem.getAttribute("V");
                                switch ((name_2)) {
                                    case "NoFill":
                                        this.noFill = (function (o1, o2) { if (o1 && o1.equals) {
                                            return o1.equals(o2);
                                        }
                                        else {
                                            return o1 === o2;
                                        } })("1", val);
                                        break;
                                    case "NoLine":
                                        this.noLine = (function (o1, o2) { if (o1 && o1.equals) {
                                            return o1.equals(o2);
                                        }
                                        else {
                                            return o1 === o2;
                                        } })("1", val);
                                        break;
                                    case "NoShow":
                                        this.noShow = (function (o1, o2) { if (o1 && o1.equals) {
                                            return o1.equals(o2);
                                        }
                                        else {
                                            return o1 === o2;
                                        } })("1", val);
                                        break;
                                    case "NoSnap":
                                        this.noSnap = (function (o1, o2) { if (o1 && o1.equals) {
                                            return o1.equals(o2);
                                        }
                                        else {
                                            return o1 === o2;
                                        } })("1", val);
                                        break;
                                    case "NoQuickDrag":
                                        this.noQuickDrag = (function (o1, o2) { if (o1 && o1.equals) {
                                            return o1.equals(o2);
                                        }
                                        else {
                                            return o1 === o2;
                                        } })("1", val);
                                        break;
                                }
                            }
                        }
                        var rowsLen = this.rows.length;
                        var sortNeeded = false;
                        for (var index123 = 0; index123 < rowElems.length; index123++) {
                            var rowElem = rowElems[index123];
                            {
                                var row = com.mxgraph.io.vsdx.geometry.RowFactory.getRowObj(rowElem, this.rows);
                                if (row.getIndex() > rowsLen) {
                                    /* add */ (this.rows.push(row));
                                    sortNeeded = true;
                                }
                                else {
                                    /* set */ (this.rows[row.getIndex() - 1] = row);
                                }
                            }
                        }
                        if (sortNeeded) {
                            /* sort */ (function (l, c) { if (c.compare)
                                l.sort(function (e1, e2) { return c.compare(e1, e2); });
                            else
                                l.sort(c); })(this.rows, new mxVsdxGeometry.mxVsdxGeometry$0(this));
                        }
                    };
                    /*private*/ mxVsdxGeometry.prototype.inheritGeo = function (parent) {
                        this.noFill = parent.noFill;
                        this.noLine = parent.noLine;
                        this.noShow = parent.noShow;
                        this.noSnap = parent.noSnap;
                        this.noQuickDrag = parent.noQuickDrag;
                        this.rows = ([]);
                        /* addAll */ (function (l1, l2) { return l1.push.apply(l1, l2); })(this.rows, parent.rows);
                    };
                    mxVsdxGeometry.prototype.getIndex$ = function () {
                        return this.index;
                    };
                    mxVsdxGeometry.prototype.isNoFill = function () {
                        return this.noFill;
                    };
                    mxVsdxGeometry.prototype.isNoLine = function () {
                        return this.noLine;
                    };
                    mxVsdxGeometry.prototype.isNoShow = function () {
                        return this.noShow;
                    };
                    mxVsdxGeometry.prototype.isNoSnap = function () {
                        return this.noSnap;
                    };
                    mxVsdxGeometry.prototype.isNoQuickDrag = function () {
                        return this.noQuickDrag;
                    };
                    mxVsdxGeometry.prototype.getRows = function () {
                        return this.rows;
                    };
                    mxVsdxGeometry.prototype.getPathXML = function (p, shape) {
                        if (this.noShow)
                            return "";
                        var geomElemParsed = { str: "", toString: function () { return this.str; } };
                        var _loop_1 = function (index124) {
                            var row = this_1.rows[index124];
                            {
                                /* append */ 
                            	(function (sb) 
                                {
                            		//Some files has null rows
                                	return sb.str = sb.str.concat(row != null? row.handle(p, shape) : ''); 
                                })(geomElemParsed);
                            }
                        };
                        var this_1 = this;
                        for (var index124 = 0; index124 < this.rows.length; index124++) {
                            _loop_1(index124);
                        }
                        return geomElemParsed.str;
                    };
                    return mxVsdxGeometry;
                }());
                vsdx.mxVsdxGeometry = mxVsdxGeometry;
                mxVsdxGeometry["__class"] = "com.mxgraph.io.vsdx.mxVsdxGeometry";
                (function (mxVsdxGeometry) {
                    var mxVsdxGeometry$0 = (function () {
                        function mxVsdxGeometry$0(__parent) {
                            this.__parent = __parent;
                        }
                        /**
                         *
                         * @param {com.mxgraph.io.vsdx.geometry.Row} r1
                         * @param {com.mxgraph.io.vsdx.geometry.Row} r2
                         * @return {number}
                         */
                        mxVsdxGeometry$0.prototype.compare = function (r1, r2) {
                        	//Some files has null rows
                        	var r1i = r1 != null? r1.getIndex() : 0;
                        	var r2i = r2 != null? r2.getIndex() : 0;
                        	
                            return r1i - r2i;
                        };
                        return mxVsdxGeometry$0;
                    }());
                    mxVsdxGeometry.mxVsdxGeometry$0 = mxVsdxGeometry$0;
                    mxVsdxGeometry$0["__interfaces"] = ["java.util.Comparator"];
                })(mxVsdxGeometry = vsdx.mxVsdxGeometry || (vsdx.mxVsdxGeometry = {}));
            })(vsdx = io.vsdx || (io.vsdx = {}));
        })(io = mxgraph.io || (mxgraph.io = {}));
    })(mxgraph = com.mxgraph || (com.mxgraph = {}));
})(com || (com = {}));
(function (com) {
    var mxgraph;
    (function (mxgraph) {
        var io;
        (function (io) {
            var vsdx;
            (function (vsdx) {
                var mxVsdxGeometryList = (function () {
                    function mxVsdxGeometryList(parentGeoList) {
                        /*private*/ this.geomList = ([]);
                        /*private*/ this.parentGeomList = null;
                        /*private*/ this.sortNeeded = false;
                        if (parentGeoList != null) {
                            this.parentGeomList = parentGeoList.geomList;
                            /* addAll */ (function (l1, l2) { return l1.push.apply(l1, l2); })(this.geomList, parentGeoList.geomList);
                        }
                    }
                    mxVsdxGeometryList.prototype.addGeometry = function (geoElem) {
                        var geo = new com.mxgraph.io.vsdx.mxVsdxGeometry(geoElem, this.parentGeomList);
                        if (geo.getIndex() < this.geomList.length) {
                            /* set */ (this.geomList[geo.getIndex()] = geo);
                        }
                        else {
                            /* add */ (this.geomList.push(geo));
                            this.sortNeeded = true;
                        }
                    };
                    /*private*/ mxVsdxGeometryList.prototype.sort = function () {
                        if (this.sortNeeded) {
                            /* sort */ (function (l, c) { if (c.compare)
                                l.sort(function (e1, e2) { return c.compare(e1, e2); });
                            else
                                l.sort(c); })(this.geomList, new mxVsdxGeometryList.mxVsdxGeometryList$0(this));
                            this.sortNeeded = false;
                        }
                    };
                    mxVsdxGeometryList.prototype.isNoShow = function () {
                        for (var index125 = 0; index125 < this.geomList.length; index125++) {
                            var geo = this.geomList[index125];
                            {
                                if (!geo.isNoShow())
                                    return false;
                            }
                        }
                        return true;
                    };
                    mxVsdxGeometryList.prototype.isNoFill = function () {
                        for (var index126 = 0; index126 < this.geomList.length; index126++) {
                            var geo = this.geomList[index126];
                            {
                                if (!(geo.isNoShow() || geo.isNoFill()))
                                    return false;
                            }
                        }
                        return true;
                    };
                    mxVsdxGeometryList.prototype.isNoLine = function () {
                        for (var index127 = 0; index127 < this.geomList.length; index127++) {
                            var geo = this.geomList[index127];
                            {
                                if (!(geo.isNoShow() || geo.isNoLine()))
                                    return false;
                            }
                        }
                        return true;
                    };
                    mxVsdxGeometryList.prototype.hasGeom = function () {
                        return !(this.geomList.length == 0);
                    };
                    
                    mxVsdxGeometryList.prototype.getGeoCount = function () {
                    	var count = 0;
                		
                		for (var i = 0; i < this.geomList.length; i++) 
                		{
                			if (!this.geomList[i].isNoShow()) 
                				count++;
                		}
                		
                		return count;
                	};
                    /*private*/ mxVsdxGeometryList.prototype.rotatedPoint = function (pt, cos, sin) {
                        var x1 = pt.x * cos - pt.y * sin;
                        var y1 = pt.y * cos + pt.x * sin;
                        pt.x = (x1);
                        pt.y = (y1);
                    };
                    /**
                     * Returns the list of routing points of a edge shape.
                     * @param {number} parentHeight Height of the parent of the shape.
                     * @return {mxPoint[]} List of mxPoint that represents the routing points.
                     * @param {mxPoint} startPoint
                     * @param {number} rotation
                     */
                    mxVsdxGeometryList.prototype.getRoutingPoints = function (parentHeight, startPoint, rotation) {
                        this.sort();
                        var points = ([]);
                        /* add */ (points.push(startPoint.clone()));
                        var offsetX = 0;
                        var offsetY = 0;
                        for (var index128 = 0; index128 < this.geomList.length; index128++) {
                            var geo = this.geomList[index128];
                            {
                                if (!geo.isNoShow()) {
                                    var rows = geo.getRows();
                                    for (var index129 = 0; index129 < rows.length; index129++) {
                                        var row = rows[index129];
                                        {
                                            //FIXME We don't support a moveTo inside the edge path
                                        	if (index129 == 0 && row != null && row instanceof com.mxgraph.io.vsdx.geometry.MoveTo) {
                                                offsetX = row.x != null ? row.x : 0;
                                                offsetY = row.y != null ? row.y : 0;
                                            }
                                            else if (row != null && row instanceof com.mxgraph.io.vsdx.geometry.LineTo) {
                                                var x = row.x != null ? row.x : 0;
                                                var y = row.y != null ? row.y : 0;
                                                var p = new mxPoint(x, y);
                                                if (rotation !== 0) {
                                                    rotation = (function (x) { return x * Math.PI / 180; })(360 - rotation);
                                                    this.rotatedPoint(p, Math.cos(rotation), Math.sin(rotation));
                                                }
                                                x = (p.x - offsetX) * com.mxgraph.io.vsdx.mxVsdxUtils.conversionFactor_$LI$();
                                                x += startPoint.x;
                                                y = ((p.y - offsetY) * com.mxgraph.io.vsdx.mxVsdxUtils.conversionFactor_$LI$()) * -1;
                                                y += startPoint.y;
                                                x = Math.round(x * 100.0) / 100.0;
                                                y = Math.round(y * 100.0) / 100.0;
                                                p.x = (x);
                                                p.y = (y);
                                                /* add */ (points.push(p));
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        return points;
                    };
                    mxVsdxGeometryList.prototype.getShapeXML = function (shape) {
                        var p = new mxPoint(0, 0);
                        var parsedGeom = { str: "<shape strokewidth=\"inherit\"><foreground>", toString: function () { return this.str; } };
                        var initSize = parsedGeom.str.length;
                        var lastGeoStyle = -1;
                        lastGeoStyle = this.processGeo(shape, p, parsedGeom, lastGeoStyle, true);
                        lastGeoStyle = this.processGeo(shape, p, parsedGeom, lastGeoStyle, false);
                        if (parsedGeom.str.length === initSize) {
                            return "";
                        }
                        else {
                            this.closePath(parsedGeom, lastGeoStyle);
                        }
                        /* append */ (function (sb) { return sb.str = sb.str.concat("</foreground></shape>"); })(parsedGeom);
						
						//If the geomertry has no move, it will cause errors in SVG. So, ignore this shape 
						//A path with no move in the beginning is invalid
						//https://www.w3.org/TR/SVG11/paths.html#PathDataMovetoCommands
						//https://stackoverflow.com/questions/56275231/do-all-svg-paths-have-to-start-with-a-move
						//TODO Find a faster technique, then enable this
						/*if (parsedGeom.str.indexOf('<move') < 0)
						{
							return '';
						}*/
						
                        return parsedGeom.str;
                    };
                    /*private*/ mxVsdxGeometryList.prototype.processGeo = function (shape, p, parsedGeom, lastGeoStyle, withFill) {
                    	var rounding = shape.getRounding();
                    	var roundingStr = '';
                        
                        if (rounding > 0)
                    	{
                        	roundingStr = ' rounded="1" arcSize="' + (rounding * com.mxgraph.io.vsdx.mxVsdxUtils.conversionFactor) + '" ';
                    	}
                        
                        var _loop_2 = function (index130) {
                            var geo = this_2.geomList[index130];
                            {
                                if (withFill === geo.isNoFill())
                                    return "continue";
                                var str_1 = geo.getPathXML(p, shape);
                                if (!(str_1.length === 0)) {
                                    var geoStyle = this_2.getGeoStyle(geo);
                                    if (lastGeoStyle === -1) {
                                        /* append */ (function (sb) { return sb.str = sb.str.concat("<path" + roundingStr + ">"); })(parsedGeom);
                                        /* append */ (function (sb) { return sb.str = sb.str.concat(str_1); })(parsedGeom);
                                    }
                                    else if (lastGeoStyle !== geoStyle) {
                                        this_2.closePath(parsedGeom, lastGeoStyle);
                                        /* append */ (function (sb) { return sb.str = sb.str.concat("<path" + roundingStr + ">"); })(parsedGeom);
                                        /* append */ (function (sb) { return sb.str = sb.str.concat(str_1); })(parsedGeom);
                                    }
                                    else {
                                        /* append */ (function (sb) { return sb.str = sb.str.concat(str_1); })(parsedGeom);
                                    }
                                    lastGeoStyle = geoStyle;
                                }
                            }
                        };
                        var this_2 = this;
                        for (var index130 = 0; index130 < this.geomList.length; index130++) {
                            _loop_2(index130);
                        }
                        return lastGeoStyle;
                    };
                    /*private*/ mxVsdxGeometryList.prototype.getGeoStyle = function (geo) {
                        var geoStyle = 0;
                        if (!geo.isNoLine() && !geo.isNoFill()) {
                            geoStyle = 1;
                        }
                        else if (!geo.isNoFill()) {
                            geoStyle = 2;
                        }
                        else if (!geo.isNoLine()) {
                            geoStyle = 3;
                        }
                        return geoStyle;
                    };
                    /*private*/ mxVsdxGeometryList.prototype.closePath = function (parsedGeom, geoStyle) {
                        /* append */ (function (sb) { return sb.str = sb.str.concat("</path>"); })(parsedGeom);
                        if (geoStyle === 1) {
                            /* append */ (function (sb) { return sb.str = sb.str.concat("<fillstroke/>"); })(parsedGeom);
                        }
                        else if (geoStyle === 2) {
                            /* append */ (function (sb) { return sb.str = sb.str.concat("<fill/>"); })(parsedGeom);
                        }
                        else if (geoStyle === 3) {
                            /* append */ (function (sb) { return sb.str = sb.str.concat("<stroke/>"); })(parsedGeom);
                        }
                    };
                    return mxVsdxGeometryList;
                }());
                vsdx.mxVsdxGeometryList = mxVsdxGeometryList;
                mxVsdxGeometryList["__class"] = "com.mxgraph.io.vsdx.mxVsdxGeometryList";
                (function (mxVsdxGeometryList) {
                    var mxVsdxGeometryList$0 = (function () {
                        function mxVsdxGeometryList$0(__parent) {
                            this.__parent = __parent;
                        }
                        /**
                         *
                         * @param {com.mxgraph.io.vsdx.mxVsdxGeometry} g1
                         * @param {com.mxgraph.io.vsdx.mxVsdxGeometry} g2
                         * @return {number}
                         */
                        mxVsdxGeometryList$0.prototype.compare = function (g1, g2) {
                            return g1.getIndex() - g2.getIndex();
                        };
                        return mxVsdxGeometryList$0;
                    }());
                    mxVsdxGeometryList.mxVsdxGeometryList$0 = mxVsdxGeometryList$0;
                    mxVsdxGeometryList$0["__interfaces"] = ["java.util.Comparator"];
                })(mxVsdxGeometryList = vsdx.mxVsdxGeometryList || (vsdx.mxVsdxGeometryList = {}));
            })(vsdx = io.vsdx || (io.vsdx = {}));
        })(io = mxgraph.io || (mxgraph.io = {}));
    })(mxgraph = com.mxgraph || (com.mxgraph = {}));
})(com || (com = {}));
(function (com) {
    var mxgraph;
    (function (mxgraph) {
        var io;
        (function (io) {
            var vsdx;
            (function (vsdx) {
                /**
                 * Create a new instance of mxMasterElement and retrieves all the shapes contained
                 * in the Master element.
                 * @param {*} m Master Element to be wrapped.
                 * @param {com.mxgraph.io.vsdx.mxVsdxModel} model
                 * @class
                 */
                var mxVsdxMaster = (function () {
                    function mxVsdxMaster(m, model) {
                        /**
                         * Unique ID of the element within its parent element
                         */
                        this.Id = null;
                        this.masterShape = null;
                        this.childShapes = ({});
                        this.master = null;
                        this.master = m;
                        this.Id = m.getAttribute(com.mxgraph.io.vsdx.mxVsdxConstants.ID) || "";
                        this.processMasterShapes(model);
                    }
                    /**
                     * Retrieves and wraps all the shapes contained in the 'shape' param.<br/>
                     * This method is recursive, it retrieves the subshapes of the shapes too.
                     * @param shape Shape from which the subshapes are retrieved.
                     * @return {void} Map with the shapes wrapped in instances of mxMasterShape.
                     * @param {com.mxgraph.io.vsdx.mxVsdxModel} model
                     */
                    mxVsdxMaster.prototype.processMasterShapes = function (model) {
                        var child = this.master.firstChild;
                        while ((child != null)) {
                            if ((child != null && (child.nodeType == 1)) && (function (o1, o2) { if (o1 && o1.equals) {
                                return o1.equals(o2);
                            }
                            else {
                                return o1 === o2;
                            } })(child.nodeName, "Rel")) {
                                var relElem = model.getRelationship(child.getAttribute("r:id"), com.mxgraph.io.mxVsdxCodec.vsdxPlaceholder + "/masters/_rels/masters.xml.rels");
                                var target = relElem.getAttribute("Target");
                                var type = relElem.getAttribute("Type");
                                var masterDoc = null;
                                if (type != null && (function (str, searchString) { var pos = str.length - searchString.length; var lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(type, "master")) {
                                    masterDoc = model.getXmlDoc(com.mxgraph.io.mxVsdxCodec.vsdxPlaceholder + "/masters/" + target);
                                }
                                if (masterDoc != null) {
                                    var masterChild = masterDoc.firstChild;
                                    while ((masterChild != null)) {
                                        if ((masterChild != null && (masterChild.nodeType == 1)) && (function (o1, o2) { if (o1 && o1.equals) {
                                            return o1.equals(o2);
                                        }
                                        else {
                                            return o1 === o2;
                                        } })(masterChild.nodeName, "MasterContents")) {
                                            this.processMasterShape(masterChild, model);
                                            break;
                                        }
                                        masterChild = masterChild.nextSibling;
                                    }
                                    ;
                                }
                            } 
                            else if (child.nodeType == 1 && child.nodeName == "PageSheet")
                        	{
                            	this.pageSheet = {};
                            	var cells = com.mxgraph.io.vsdx.mxVsdxUtils.getDirectChildNamedElements(child, "Cell");
                                
                            	for (var i = 0; i < cells.length; i++) 
                                {
                                    this.pageSheet[cells[i].getAttribute("N")] = cells[i];
                                }
                        	}
                            child = child.nextSibling;
                        }
                        ;
                    };
                    /**
                     * Retrieves and wraps all the shapes contained in the 'shape' param.<br/>
                     * This method is recursive, it retrieves the subshapes of the shapes too.
                     * @param shape Shape from which the subshapes are retrieved.
                     * @return {void} Map with the shapes wrapped in instances of mxMasterShape.
                     * @param {*} shapeElem
                     * @param {com.mxgraph.io.vsdx.mxVsdxModel} model
                     */
                    mxVsdxMaster.prototype.processMasterShape = function (shapeElem, model, internal) 
                    {
                    	if (!internal) 
                		{
                    		this.firstLevelShapes = [];
                		}
                    	
                        var shapeChild = shapeElem.firstChild;
                        while ((shapeChild != null)) {
                            if ((shapeChild != null && (shapeChild.nodeType == 1)) && (function (o1, o2) { if (o1 && o1.equals) {
                                return o1.equals(o2);
                            }
                            else {
                                return o1 === o2;
                            } })(shapeChild.nodeName, "Shapes")) {
                                var shapesChild = shapeChild.firstChild;
                                while ((shapesChild != null)) {
                                    if ((shapesChild != null && (shapesChild.nodeType == 1)) && (function (o1, o2) { if (o1 && o1.equals) {
                                        return o1.equals(o2);
                                    }
                                    else {
                                        return o1 === o2;
                                    } })(shapesChild.nodeName, "Shape")) {
                                        var shape = shapesChild;
                                        var shapeId = shape.getAttribute("ID");
                                        var masterShape = new com.mxgraph.io.vsdx.Shape(shape, model);
                                        this.masterShape = (this.masterShape == null) ? masterShape : this.masterShape;
                                        /* put */ (this.childShapes[shapeId] = masterShape);
                                        
                                        if (!internal) 
                                		{
                                    		this.firstLevelShapes.push(masterShape);
                                		}
                                        
                                        this.processMasterShape(shape, model, true);
                                    }
                                    shapesChild = shapesChild.nextSibling;
                                }
                                ;
                            }
                            else if (shapeChild != null && shapeChild.nodeType == 1 && shapeChild.nodeName == "Connects") 
                            {
                            	this.connects = {};
                                var connectsChild = shapeChild.firstChild;
                                
                                while (connectsChild != null) 
                                {
                                    if (connectsChild != null && connectsChild.nodeType == 1 && connectsChild.nodeName == "Connect") 
                                    {
                                        var connectElem = connectsChild;
                                        var connect = new com.mxgraph.io.vsdx.mxVsdxConnect(connectElem);
                                        this.connects[connect.getFromSheet()] = connect;
                                    }
                                    
                                    connectsChild = connectsChild.nextSibling;
                                }
                            }
                            
                            shapeChild = shapeChild.nextSibling;
                        }
                        ;
                    };
                    /**
                     * Returns the first shape in the Master
                     * @return {com.mxgraph.io.vsdx.Shape} First shape in the Master wrapped in a instance of mxMasterShape
                     */
                    mxVsdxMaster.prototype.getMasterShape = function () {
                        return this.masterShape;
                    };
                    /**
                     * Returns the shape in the master element with ID = 'id'.
                     * @param {string} id Shape's ID
                     * @return {com.mxgraph.io.vsdx.Shape} The shape in the master element with ID = 'id' wrapped in a instance of mxMasterShape
                     */
                    mxVsdxMaster.prototype.getSubShape = function (id) {
                        return (function (m, k) { return m[k] ? m[k] : null; })(this.childShapes, id);
                    };
                    /**
                     * Returns the NameU attribute.
                     * @return {string} Value of the NameU attribute.
                     */
                    mxVsdxMaster.prototype.getNameU = function () {
                        return this.master.getAttribute("NameU") || "";
                    };
                    /**
                     * Returns the NameU attribute.
                     * @return {string} Value of the NameU attribute.
                     */
                    mxVsdxMaster.prototype.getName = function () {
                        return this.master.getAttribute("Name") || "";
                    };
                    /**
                     * Returns the UniqueID attribute.
                     * @return {string} Value of the UniqueID attribute.
                     */
                    mxVsdxMaster.prototype.getUniqueID = function () {
                        var uniqueID = "";
                        if (this.master.hasAttribute("UniqueID")) {
                            uniqueID = this.master.getAttribute("UniqueID");
                        }
                        return uniqueID;
                    };
                    mxVsdxMaster.prototype.getId = function () {
                        return this.Id;
                    };
                    mxVsdxMaster.prototype.getMasterElement = function () {
                        return this.master;
                    };
                    return mxVsdxMaster;
                }());
                vsdx.mxVsdxMaster = mxVsdxMaster;
                mxVsdxMaster["__class"] = "com.mxgraph.io.vsdx.mxVsdxMaster";
            })(vsdx = io.vsdx || (io.vsdx = {}));
        })(io = mxgraph.io || (mxgraph.io = {}));
    })(mxgraph = com.mxgraph || (com.mxgraph = {}));
})(com || (com = {}));
(function (com) {
    var mxgraph;
    (function (mxgraph) {
        var io;
        (function (io) {
            var vsdx;
            (function (vsdx) {
                /**
                 *
                 * A model representing vsdx files. As well as being a programmatic model, the XML DOMs of the unzipped
                 * files are held to enable round-tripping
                 * @param {*} doc
                 * @param {*} docData
                 * @param {*} mediaData
                 * @class
                 */
                var mxVsdxModel = (function () {
                    function mxVsdxModel(doc, docData, mediaData) {
                        /**
                         * A map of Documents created by reading the XML files, indexed by the path to those files
                         */
                        this.xmlDocs = null;
                        /**
                         * Collection of media files encoded in Base64, indexed by the path to those files
                         */
                        this.media = null;
                        /**
                         * Map of page objects indexed by their ID.
                         */
                        this.pages = null;
                        /**
                         * Map of master objects indexed by their ID. Before you think you're being clever by making
                         * the index an Integer as for pages, don't, there are reasons.
                         */
                        this.masters = ({});
                        /**
                         * Map stylesheets indexed by their ID
                         */
                        this.stylesheets = ({});
                        /**
                         * Map themes indexed by their index
                         */
                        this.themes = ({});
                        this.rootElement = null;
                        this.pm = null;
                        this.xmlDocs = docData;
                        this.media = mediaData;
                        var childNode = doc.firstChild;
                        while ((childNode != null)) {
                            if ((childNode != null && (childNode.nodeType == 1)) && (function (o1, o2) { if (o1 && o1.equals) {
                                return o1.equals(o2);
                            }
                            else {
                                return o1 === o2;
                            } })(childNode.tagName.toLowerCase(), com.mxgraph.io.mxVsdxCodec.vsdxPlaceholder + "document")) {
                                this.rootElement = childNode;
                                break;
                            }
                            childNode = childNode.nextSibling;
                        }
                        ;
                        this.pm = new com.mxgraph.io.vsdx.mxPropertiesManager();
                        this.pm.initialise(this.rootElement, this);
                        this.initStylesheets();
                        this.initThemes();
                        this.initMasters();
                        this.initPages();
                    }
                    /**
                     * Initialize theme objects from the XML files
                     * @private
                     */
                    /*private*/ mxVsdxModel.prototype.initThemes = function () {
                        if (this.xmlDocs != null) {
                            var more = true;
                            var index = 1;
                            while ((more)) {
                                var path = com.mxgraph.io.mxVsdxCodec.vsdxPlaceholder + "/theme/theme" + index + ".xml";
                                var themeDoc = (function (m, k) { return m[k] ? m[k] : null; })(this.xmlDocs, path);
                                if (themeDoc != null) {
                                    var child = themeDoc.firstChild;
                                    while ((child != null)) {
                                        if ((child != null && (child.nodeType == 1)) && (function (o1, o2) { if (o1 && o1.equals) {
                                            return o1.equals(o2);
                                        }
                                        else {
                                            return o1 === o2;
                                        } })(child.tagName, "a:theme")) {
                                            var theme_1 = new com.mxgraph.io.vsdx.mxVsdxTheme(child);
                                            if (theme_1.getThemeIndex() < 0) {
                                                theme_1.processTheme();
                                            }
                                            var existingTheme = (function (m, k) { if (m.entries == null)
                                                m.entries = []; for (var i = 0; i < m.entries.length; i++)
                                                if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                                    return m.entries[i].value;
                                                } return null; })(this.themes, theme_1.getThemeIndex());
                                            if (existingTheme == null || !existingTheme.isPure()) {
                                                /* put */ (function (m, k, v) { if (m.entries == null)
                                                    m.entries = []; for (var i = 0; i < m.entries.length; i++)
                                                    if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                                        m.entries[i].value = v;
                                                        return;
                                                    } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(this.themes, theme_1.getThemeIndex(), theme_1);
                                            }
                                            break;
                                        }
                                        child = child.nextSibling;
                                    }
                                    ;
                                    index++;
                                }
                                else {
                                    more = false;
                                }
                            }
                            ;
                        }
                    };
                    /**
                     * Load the map with the stylesheets elements in the document.<br/>
                     * The masters are wrapped for instances of mxStyleSheet.
                     * @param doc Document with the stylesheets.
                     */
                    mxVsdxModel.prototype.initStylesheets = function () {
                        var vdxSheets = this.rootElement.getElementsByTagName(com.mxgraph.io.vsdx.mxVsdxConstants.STYLE_SHEETS);
                        if (vdxSheets.length > 0) {
                            var sheets_1 = vdxSheets.item(0);
                            var sheetList = sheets_1.getElementsByTagName(com.mxgraph.io.vsdx.mxVsdxConstants.STYLE_SHEET);
                            var sheetLength = sheetList.length;
                            for (var i = 0; i < sheetLength; i++) {
                                var sheet = sheetList.item(i);
                                var sheetId = sheet.getAttribute(com.mxgraph.io.vsdx.mxVsdxConstants.ID);
                                var sheetElement = new com.mxgraph.io.vsdx.Style(sheet, this);
                                /* put */ (this.stylesheets[sheetId] = sheetElement);
                            }
                            ;
                        }
                        var sheets = (function (obj) { return Object.keys(obj).map(function (key) { return obj[key]; }); })(this.stylesheets);
                        var iter = (function (a) { var i = 0; return { next: function () { return i < a.length ? a[i++] : null; }, hasNext: function () { return i < a.length; } }; })(sheets);
                        while ((iter.hasNext())) {
                            var sheet = iter.next();
                            sheet.stylesheetRefs(this);
                        }
                        ;
                    };
                    /**
                     * Initialize master objects from the XML files
                     */
                    mxVsdxModel.prototype.initMasters = function () {
                        if (this.xmlDocs != null) {
                            var path = com.mxgraph.io.mxVsdxCodec.vsdxPlaceholder + "/masters/masters.xml";
                            var masterDoc = (function (m, k) { return m[k] ? m[k] : null; })(this.xmlDocs, path);
                            if (masterDoc != null) {
                                var child = masterDoc.firstChild;
                                while ((child != null)) {
                                    if ((child != null && (child.nodeType == 1)) && (function (o1, o2) { if (o1 && o1.equals) {
                                        return o1.equals(o2);
                                    }
                                    else {
                                        return o1 === o2;
                                    } })(child.tagName, com.mxgraph.io.vsdx.mxVsdxConstants.MASTERS)) {
                                        var grandChild = child.firstChild;
                                        while ((grandChild != null)) {
                                            if ((grandChild != null && (grandChild.nodeType == 1)) && (function (o1, o2) { if (o1 && o1.equals) {
                                                return o1.equals(o2);
                                            }
                                            else {
                                                return o1 === o2;
                                            } })(grandChild.tagName, "Master")) {
                                                var masterElement = grandChild;
                                                var master = new com.mxgraph.io.vsdx.mxVsdxMaster(masterElement, this);
                                                /* put */ (this.masters[master.getId()] = master);
                                            }
                                            grandChild = grandChild.nextSibling;
                                        }
                                        ;
                                        break;
                                    }
                                    child = child.nextSibling;
                                }
                                ;
                            }
                        }
                    };
                    /**
                     * Initialize page objects from the XML files
                     */
                    mxVsdxModel.prototype.initPages = function () {
                        if (this.xmlDocs != null) {
                            var path = com.mxgraph.io.mxVsdxCodec.vsdxPlaceholder + "/pages/pages.xml";
                            var pageDoc = (function (m, k) { return m[k] ? m[k] : null; })(this.xmlDocs, path);
                            if (pageDoc != null) {
                                var child = pageDoc.firstChild;
                                while ((child != null)) {
                                    if ((child != null && (child.nodeType == 1)) && (function (o1, o2) { if (o1 && o1.equals) {
                                        return o1.equals(o2);
                                    }
                                    else {
                                        return o1 === o2;
                                    } })(child.tagName, com.mxgraph.io.vsdx.mxVsdxConstants.PAGES)) {
                                        var pages = child;
                                        var pageList = pages.getElementsByTagName(com.mxgraph.io.vsdx.mxVsdxConstants.PAGE);
                                        if (pageList != null && pageList.length > 0) {
                                            this.pages = ({});
                                            var backgroundMap = ({});
                                            var pageListLen = pageList.length;
                                            for (var i = 0; i < pageListLen; i++) {
                                                var pageEle = pageList.item(i);
                                                var page = this.createPage(pageEle);
                                                if (page.isBackground()) {
                                                    /* put */ (function (m, k, v) { if (m.entries == null)
                                                        m.entries = []; for (var i_1 = 0; i_1 < m.entries.length; i_1++)
                                                        if (m.entries[i_1].key.equals != null && m.entries[i_1].key.equals(k) || m.entries[i_1].key === k) {
                                                            m.entries[i_1].value = v;
                                                            return;
                                                        } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(backgroundMap, page.getId(), page);
                                                }
                                                /* put */ (function (m, k, v) { if (m.entries == null)
                                                    m.entries = []; for (var i_2 = 0; i_2 < m.entries.length; i_2++)
                                                    if (m.entries[i_2].key.equals != null && m.entries[i_2].key.equals(k) || m.entries[i_2].key === k) {
                                                        m.entries[i_2].value = v;
                                                        return;
                                                    } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(this.pages, page.getId(), page);
                                            }
                                            ;
                                            {
                                                var array132 = (function (m) { if (m.entries == null)
                                                    m.entries = []; return m.entries; })(this.pages);
                                                for (var index131 = 0; index131 < array132.length; index131++) {
                                                    var entry = array132[index131];
                                                    {
                                                        var page = entry.getValue();
                                                        var backId = page.getBackPageId();
                                                        if (backId != null) {
                                                            var background = (function (m, k) { if (m.entries == null)
                                                                m.entries = []; for (var i = 0; i < m.entries.length; i++)
                                                                if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                                                    return m.entries[i].value;
                                                                } return null; })(backgroundMap, backId);
                                                            page.setBackPage(background);
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        break;
                                    }
                                    child = child.nextSibling;
                                }
                                ;
                            }
                        }
                    };
                    mxVsdxModel.prototype.getPages = function () {
                        return this.pages;
                    };
                    mxVsdxModel.prototype.getThemes = function () {
                        return this.themes;
                    };
                    
                    mxVsdxModel.prototype.getDefaultTheme = function () 
                    {
                        if (this.defaultTheme == null && this.themes.entries != null && this.themes.entries.length > 0)
                        {
                            this.defaultTheme = this.themes.entries[0].getValue();
                        }

                        return this.defaultTheme;
                    };
                    
                    mxVsdxModel.prototype.getRelationship = function (rid, path) {
                        var relsDoc = (function (m, k) { return m[k] ? m[k] : null; })(this.xmlDocs, path);
                        if (relsDoc == null || rid == null || (rid.length === 0)) {
                            return null;
                        }
                        var rels = relsDoc.getElementsByTagName("Relationship");
                        for (var i = 0; i < rels.length; i++) {
                            var currElem = rels.item(i);
                            var id = currElem.getAttribute("Id");
                            if ((function (o1, o2) { if (o1 && o1.equals) {
                                return o1.equals(o2);
                            }
                            else {
                                return o1 === o2;
                            } })(id, rid)) {
                                return currElem;
                            }
                        }
                        ;
                        return null;
                    };
                    mxVsdxModel.prototype.getMaster = function (masterId) {
                        return (function (m, k) { return m[k] ? m[k] : null; })(this.masters, masterId);
                    };
                    mxVsdxModel.prototype.createPage = function (pageEle) {
                        return new com.mxgraph.io.vsdx.mxVsdxPage(pageEle, this);
                    };
                    mxVsdxModel.prototype.getPropertiesManager = function () {
                        return this.pm;
                    };
                    mxVsdxModel.prototype.setPropertiesManager = function (pm) {
                        this.pm = pm;
                    };
                    mxVsdxModel.prototype.getMasterShapes = function () {
                        return this.masters;
                    };
                    mxVsdxModel.prototype.setMasterShapes = function (mm) {
                        this.masters = mm;
                    };
                    /**
                     * Returns the wrapper of the stylesheet element with id indicated by 'id'
                     * @param {string} id StyleSheet's ID.
                     * @return {com.mxgraph.io.vsdx.Style} StyleSheet element with id = 'id' wrapped in an instance of mxStyleSheet.
                     */
                    mxVsdxModel.prototype.getStylesheet = function (id) {
                        return (function (m, k) { return m[k] ? m[k] : null; })(this.stylesheets, id);
                    };
                    mxVsdxModel.prototype.getXmlDoc = function (path) {
                        return (function (m, k) { return m[k] ? m[k] : null; })(this.xmlDocs, path);
                    };
                    mxVsdxModel.prototype.getMedia = function (path) {
                        return (function (m, k) { return m[k] ? m[k] : null; })(this.media, path);
                    };
                    return mxVsdxModel;
                }());
                vsdx.mxVsdxModel = mxVsdxModel;
                mxVsdxModel["__class"] = "com.mxgraph.io.vsdx.mxVsdxModel";
            })(vsdx = io.vsdx || (io.vsdx = {}));
        })(io = mxgraph.io || (mxgraph.io = {}));
    })(mxgraph = com.mxgraph || (com.mxgraph = {}));
})(com || (com = {}));
(function (com) {
    var mxgraph;
    (function (mxgraph) {
        var io;
        (function (io) {
            var vsdx;
            (function (vsdx) {
                var mxVsdxPage = (function () {
                    function mxVsdxPage(pageElem, model) {
                        /**
                         * Unique ID of the element within its parent element
                         */
                        this.Id = null;
                        /**
                         * Name of the page taken from the "name" attribute of the page element
                         */
                        this.pageName = null;
                        this.__isBackground = false;
                        this.backPageId = null;
                        this.backPage = null;
                        this.pageElement = null;
                        this.pageSheet = null;
                        this.model = null;
                        this.shapes = ({});
                        this.connects = ({});
                        this.connectsMap = {};
                        this.cellElements = ({});
                        this.model = model;
                        this.pageElement = pageElem;
                        this.layers = [];
                        var backGround = pageElem.getAttribute(com.mxgraph.io.vsdx.mxVsdxConstants.BACKGROUND);
                        this.__isBackground = (backGround != null && (function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(backGround, com.mxgraph.io.vsdx.mxVsdxConstants.TRUE)) ? true : false;
                        var back = pageElem.getAttribute(com.mxgraph.io.vsdx.mxVsdxConstants.BACK_PAGE);
                        if (back != null && back.length > 0) {
                            this.backPageId = parseFloat(back);
                        }
                        this.Id = parseFloat(pageElem.getAttribute(com.mxgraph.io.vsdx.mxVsdxConstants.ID));
                        this.pageName = pageElem.getAttribute(com.mxgraph.io.vsdx.mxVsdxConstants.NAME) || "";
						this.pageNameU = pageElem.getAttribute(com.mxgraph.io.vsdx.mxVsdxConstants.NAME_U) || this.pageName;

                        var pageSheets = com.mxgraph.io.vsdx.mxVsdxUtils.getDirectChildNamedElements(pageElem, "PageSheet");
                        if (pageSheets.length > 0) {
                            var pageSheet = pageSheets[0];
                            var cells = com.mxgraph.io.vsdx.mxVsdxUtils.getDirectChildNamedElements(pageSheet, "Cell");
                            for (var index133 = 0; index133 < cells.length; index133++) {
                                var cellElem = cells[index133];
                                {
                                    var n = cellElem.getAttribute("N");
                                    /* put */ (this.cellElements[n] = cellElem);
                                }
                            }
                            
                            var sections = com.mxgraph.io.vsdx.mxVsdxUtils.getDirectChildNamedElements(pageSheet, "Section");
                            for (var i134 = 0; i134 < sections.length; i134++) 
                            {
                            	var secElem = sections[i134];
                            	var n = secElem.getAttribute("N");
                            	
                            	if (n == "Layer")
                        		{
                            		 var layers = com.mxgraph.io.vsdx.mxVsdxUtils.getDirectChildNamedElements(secElem, "Row");
                            		 
                            		 for (var i135 = 0; i135 < layers.length; i135++)
                        			 {
                            			 var layerAtts = com.mxgraph.io.vsdx.mxVsdxUtils.getDirectChildNamedElements(layers[i135], "Cell");
                            			 var layerObj = {};
                            			 
                            			 for (var i136 = 0; i136 < layerAtts.length; i136++)
                            			 {
                            				 layerObj[layerAtts[i136].getAttribute("N")] = layerAtts[i136].getAttribute("V");
                            			 }

                                         if (layerObj.Name == null)
                                         {
                                            layerObj.Name = 'Layer ' + i135;
                                         }
                                         
                            			 this.layers[parseInt(layers[i135].getAttribute("IX"))] = layerObj;
                        			 }
                        		}
                            }
                        }
                        this.parseNodes(pageElem, model, "pages");
                    }
                    /**
                     * Parses the child nodes of the given element
                     * @param {*} pageElem the parent whose children to parse
                     * @param {com.mxgraph.io.vsdx.mxVsdxModel} model the model of the vsdx file
                     * @param {string} pageName page information is split across pages.xml and pageX.xml where X is any number. We have to know which we're currently parsing to use the correct relationships file.
                     */
                    mxVsdxPage.prototype.parseNodes = function (pageElem, model, pageName) {
                        var pageChild = pageElem.firstChild;
                        // Parse connects first as it is needed in shapes types
                        while ((pageChild != null)) {
                            if (pageChild != null && (pageChild.nodeType == 1)) {
                                var pageChildElem = pageChild;
                                var childName = pageChildElem.nodeName;
                                if ((function (o1, o2) { if (o1 && o1.equals) {
                                    return o1.equals(o2);
                                }
                                else {
                                    return o1 === o2;
                                } })(childName, "Connects")) {
                                    var connectList = pageChildElem.getElementsByTagName(com.mxgraph.io.vsdx.mxVsdxConstants.CONNECT);
                                    var connectNode = (connectList != null && connectList.length > 0) ? connectList.item(0) : null;
                                    while ((connectNode != null)) {
                                        if (connectNode != null && (connectNode.nodeType == 1)) {
                                            var connectElem = connectNode;
                                            var connect = new com.mxgraph.io.vsdx.mxVsdxConnect(connectElem);
                                            var fromSheet = connect.getFromSheet();
                                            this.connectsMap[fromSheet] = true;
                                            var previousConnect = (fromSheet != null && fromSheet > -1) ? (function (m, k) { if (m.entries == null)
                                                m.entries = []; for (var i = 0; i < m.entries.length; i++)
                                                if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                                    return m.entries[i].value;
                                                } return null; })(this.connects, fromSheet) : null;
                                            if (previousConnect != null) {
                                                previousConnect.addConnect(connectElem);
                                            }
                                            else {
                                                /* put */ (function (m, k, v) { if (m.entries == null)
                                                    m.entries = []; for (var i = 0; i < m.entries.length; i++)
                                                    if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                                        m.entries[i].value = v;
                                                        return;
                                                    } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(this.connects, connect.getFromSheet(), connect);
                                            }
                                        }
                                        connectNode = connectNode.nextSibling;
                                    }
                                    ;
                                }
                            }
                            pageChild = pageChild.nextSibling;
                        }
                        ;

                        pageChild = pageElem.firstChild;
                        while ((pageChild != null)) {
                            if (pageChild != null && (pageChild.nodeType == 1)) {
                                var pageChildElem = pageChild;
                                var childName = pageChildElem.nodeName;
                                if ((function (o1, o2) { if (o1 && o1.equals) {
                                    return o1.equals(o2);
                                }
                                else {
                                    return o1 === o2;
                                } })(childName, "Rel")) {
                                    this.resolveRel(pageChildElem, model, pageName);
                                }
                                else if ((function (o1, o2) { if (o1 && o1.equals) {
                                    return o1.equals(o2);
                                }
                                else {
                                    return o1 === o2;
                                } })(childName, "Shapes")) {
                                    this.shapes = this.parseShapes(pageChildElem, null, false);
                                }
                                else if ((function (o1, o2) { if (o1 && o1.equals) {
                                    return o1.equals(o2);
                                }
                                else {
                                    return o1 === o2;
                                } })(childName, "PageSheet")) {
                                    this.pageSheet = pageChildElem;
                                }
                            }
                            pageChild = pageChild.nextSibling;
                        }
                        ;
                    };
                    /**
                     *
                     * @param {*} relNode
                     * @param {com.mxgraph.io.vsdx.mxVsdxModel} model
                     * @param {string} pageName
                     */
                    mxVsdxPage.prototype.resolveRel = function (relNode, model, pageName) {
                        var relElem = model.getRelationship(relNode.getAttribute("r:id"), com.mxgraph.io.mxVsdxCodec.vsdxPlaceholder + "/pages/_rels/" + pageName + ".xml.rels");
                        var target = relElem.getAttribute("Target");
                        var type = relElem.getAttribute("Type");
                        if ((function (str, searchString) { var pos = str.length - searchString.length; var lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(/* valueOf */ new String(type).toString(), "page")) {
                            var pageDoc = null;
                            if (type != null && (function (str, searchString) { var pos = str.length - searchString.length; var lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(type, "page")) {
                                pageDoc = model.getXmlDoc(com.mxgraph.io.mxVsdxCodec.vsdxPlaceholder + "/pages/" + target);
                            }
                            if (pageDoc != null) {
                                var child = pageDoc.firstChild;
                                while ((child != null)) {
                                    if ((child != null && (child.nodeType == 1)) && (function (o1, o2) { if (o1 && o1.equals) {
                                        return o1.equals(o2);
                                    }
                                    else {
                                        return o1 === o2;
                                    } })(child.tagName, "PageContents")) {
                                        var index = target.indexOf('.');
                                        if (index !== -1) {
                                            this.parseNodes(child, model, target.substring(0, index));
                                        }
                                        break;
                                    }
                                    child = child.nextSibling;
                                }
                                ;
                            }
                        }
                    };
                    mxVsdxPage.prototype.parseShapes = function (shapesElement, master, recurse) {
                        var shapes = ({});
                        var shapeList = shapesElement.getElementsByTagName(com.mxgraph.io.vsdx.mxVsdxConstants.SHAPE);
                        var shapeNode = (shapeList != null && shapeList.length > 0) ? shapeList.item(0) : null;
                        while ((shapeNode != null)) {
                            if (shapeNode != null && (shapeNode.nodeType == 1)) {
                                var shapeElem = shapeNode;
                                var masterTmp = master;
                                if (masterTmp == null) {
                                    var masterId = shapeElem.getAttribute(com.mxgraph.io.vsdx.mxVsdxConstants.MASTER);
                                    if (masterId != null && !(function (o1, o2) { if (o1 && o1.equals) {
                                        return o1.equals(o2);
                                    }
                                    else {
                                        return o1 === o2;
                                    } })(masterId, "")) {
                                        masterTmp = this.model.getMaster(masterId);
                                    }
                                }
                                var isEdge = this.isEdge(shapeElem);
                                if (!isEdge && masterTmp != null) {
                                    var masterId = shapeElem.getAttribute(com.mxgraph.io.vsdx.mxVsdxConstants.MASTER_SHAPE);
                                    var elem = masterTmp.getMasterElement();
                                    if (masterId != null && !(function (o1, o2) { if (o1 && o1.equals) {
                                        return o1.equals(o2);
                                    }
                                    else {
                                        return o1 === o2;
                                    } })(masterId, "")) {
                                    	var subShape = masterTmp.getSubShape(masterId)
                                    	//Some files has non-existing master sub-shapes
                                        elem = subShape != null? subShape.getShape() : elem;
                                    }
                                    isEdge = this.isEdge(elem);
                                }
                                var shape = this.createCell(shapeElem, !isEdge, masterTmp);
                                /* put */ (function (m, k, v) { if (m.entries == null)
                                    m.entries = []; for (var i = 0; i < m.entries.length; i++)
                                    if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                        m.entries[i].value = v;
                                        return;
                                    } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(shapes, shape.getId(), shape);
                            }
                            shapeNode = shapeNode.nextSibling;
                        }
                        ;
                        return shapes;
                    };
                    mxVsdxPage.prototype.createCell = function (shapeElem, vertex, masterTmp) {
                        return new com.mxgraph.io.vsdx.VsdxShape(this, shapeElem, vertex, this.model.getMasterShapes(), masterTmp, this.model);
                    };
                    mxVsdxPage.prototype.isEdge = function (shape) {
                        if (shape != null) {
                            var children = shape.childNodes;
                            if (children != null) {
                                var childNode = children.item(0);
                                while ((childNode != null)) {
                                    if (childNode != null && (childNode.nodeType == 1)) {
                                        var childElem = childNode;
                                        if ((function (o1, o2) { if (o1 && o1.equals) {
                                            return o1.equals(o2);
                                        }
                                        else {
                                            return o1 === o2;
                                        } })(childElem.nodeName, "Cell")) {
                                            var n = childElem.getAttribute("N");
                                            if ((function (o1, o2) { if (o1 && o1.equals) {
                                                return o1.equals(o2);
                                            }
                                            else {
                                                return o1 === o2;
                                            } })(n, "BeginX") || (function (o1, o2) { if (o1 && o1.equals) {
                                                return o1.equals(o2);
                                            }
                                            else {
                                                return o1 === o2;
                                            } })(n, "BeginY") || (function (o1, o2) { if (o1 && o1.equals) {
                                                return o1.equals(o2);
                                            }
                                            else {
                                                return o1 === o2;
                                            } })(n, "EndY") || (function (o1, o2) { if (o1 && o1.equals) {
                                                return o1.equals(o2);
                                            }
                                            else {
                                                return o1 === o2;
                                            } })(n, "EndX")) {
                                                return true;
                                            }
                                        }
                                    }
                                    childNode = childNode.nextSibling;
                                }
                                ;
                            }
                        }
                        return false;
                    };
                    /**
                     * Returns the width and height of a Page expressed as an mxPoint.
                     * @return {mxPoint} mxPoint that represents the dimensions of the page
                     */
                    mxVsdxPage.prototype.getPageDimensions = function () {
                        var pageH = 0;
                        var pageW = 0;
                        var height = (function (m, k) { return m[k] ? m[k] : null; })(this.cellElements, "PageHeight");
                        var width = (function (m, k) { return m[k] ? m[k] : null; })(this.cellElements, "PageWidth");
                        if (height != null) {
                            pageH = parseFloat(height.getAttribute("V")) * com.mxgraph.io.vsdx.mxVsdxUtils.conversionFactor_$LI$();
                            pageH = Math.round(pageH * 100.0) / 100.0;
                        }
                        if (width != null) {
                            pageW = parseFloat(width.getAttribute("V")) * com.mxgraph.io.vsdx.mxVsdxUtils.conversionFactor_$LI$();
                            pageW = Math.round(pageW * 100.0) / 100.0;
                        }
                        return new mxPoint(pageW, pageH);
                    };
                    /**
                     * Returns the drawing scale attribute of this page
                     * @return {number} the DrawingScale
                     */
                    mxVsdxPage.prototype.getDrawingScale = function () {
                        var scale = (function (m, k) { return m[k] ? m[k] : null; })(this.cellElements, "DrawingScale");
                        if (scale != null) {
                            return parseFloat(scale.getAttribute("V")) * com.mxgraph.io.vsdx.mxVsdxUtils.conversionFactor_$LI$();
                        }
                        return 1;
                    };
                    /**
                     * Returns the page scale attribute of this page
                     * @return {number} the PageScale
                     */
                    mxVsdxPage.prototype.getPageScale = function () {
                        var scale = (function (m, k) { return m[k] ? m[k] : null; })(this.cellElements, "PageScale");
                        if (scale != null) {
                            return parseFloat(scale.getAttribute("V")) * com.mxgraph.io.vsdx.mxVsdxUtils.conversionFactor_$LI$();
                        }
                        return 1;
                    };
                    mxVsdxPage.prototype.getCellValue = function (cellName) {
                        var cell = (function (m, k) { return m[k] ? m[k] : null; })(this.cellElements, cellName);
                        if (cell != null) {
                            return cell.getAttribute("V") || "";
                        }
                        return null;
                    };
                    mxVsdxPage.prototype.getCellIntValue = function (cellName, defVal) {
                        var val = this.getCellValue(cellName);
                        if (val != null) {
                            return parseInt(val);
                        }
                        return defVal;
                    };
                    /**
                     * Returns the ID of the page
                     * @return {number} the ID of the page
                     */
                    mxVsdxPage.prototype.getId = function () {
                        return this.Id;
                    };
                    mxVsdxPage.prototype.getPageName = function () {
                        return this.pageName;
                    };
                    mxVsdxPage.prototype.getPageNameU = function () {
                        return this.pageNameU;
                    };
                    mxVsdxPage.prototype.getShapes = function () {
                        return this.shapes;
                    };
                    mxVsdxPage.prototype.getLayers = function () {
                        return this.layers;
                    };
                    mxVsdxPage.prototype.getConnects = function () {
                        return this.connects;
                    };
                    mxVsdxPage.prototype.isBackground = function () {
                        return this.__isBackground;
                    };
                    /**
                     * Returns the background page ID, if any
                     * @return {number} the ID of any background page or null for no background page
                     */
                    mxVsdxPage.prototype.getBackPageId = function () {
                        return this.backPageId;
                    };
                    mxVsdxPage.prototype.setBackPage = function (page) {
                        this.backPage = page;
                    };
                    mxVsdxPage.prototype.getBackPage = function () {
                        return this.backPage;
                    };
                    return mxVsdxPage;
                }());
                vsdx.mxVsdxPage = mxVsdxPage;
                mxVsdxPage["__class"] = "com.mxgraph.io.vsdx.mxVsdxPage";
            })(vsdx = io.vsdx || (io.vsdx = {}));
        })(io = mxgraph.io || (mxgraph.io = {}));
    })(mxgraph = com.mxgraph || (com.mxgraph = {}));
})(com || (com = {}));
(function (com) {
    var mxgraph;
    (function (mxgraph) {
        var io;
        (function (io) {
            var vsdx;
            (function (vsdx) {
                var mxVsdxTheme = (function () {
                    function mxVsdxTheme(theme) {
                        /*private*/ this.themeIndex = -1;
                        /*private*/ this.themeVariant = 0;
                        /*private*/ this.baseColors = ({});
                        /*private*/ this.variantsColors = (function (dims) { var allocate = function (dims) { if (dims.length == 0) {
                            return undefined;
                        }
                        else {
                            var array = [];
                            for (var i = 0; i < dims[0]; i++) {
                                array.push(allocate(dims.slice(1)));
                            }
                            return array;
                        } }; return allocate(dims); })([4, 7]);
                        /*private*/ this.isMonotoneVariant = new Array(4);
                        /*private*/ this.defaultClr = new com.mxgraph.io.vsdx.theme.Color(255, 255, 255);
                        /*private*/ this.defaultLineClr = new com.mxgraph.io.vsdx.theme.Color(0, 0, 0);
                        /*private*/ this.defaultLineStyle = new com.mxgraph.io.vsdx.theme.LineStyle();
                        /*private*/ this.fillStyles = ([]);
                        /*private*/ this.connFillStyles = ([]);
                        /*private*/ this.lineStyles = ([]);
                        /*private*/ this.connLineStyles = ([]);
                        /*private*/ this.lineStylesExt = ([]);
                        /*private*/ this.connLineStylesExt = ([]);
                        /*private*/ this.connFontColors = ([]);
                        /*private*/ this.connFontStyles = ([]);
                        /*private*/ this.fontColors = ([]);
                        /*private*/ this.fontStyles = ([]);
                        /*private*/ this.variantEmbellishment = [0, 0, 0, 0];
                        /*private*/ this.variantFillIdx = (function (dims) { var allocate = function (dims) { if (dims.length == 0) {
                            return 0;
                        }
                        else {
                            var array = [];
                            for (var i = 0; i < dims[0]; i++) {
                                array.push(allocate(dims.slice(1)));
                            }
                            return array;
                        } }; return allocate(dims); })([4, 4]);
                        /*private*/ this.variantLineIdx = (function (dims) { var allocate = function (dims) { if (dims.length == 0) {
                            return 0;
                        }
                        else {
                            var array = [];
                            for (var i = 0; i < dims[0]; i++) {
                                array.push(allocate(dims.slice(1)));
                            }
                            return array;
                        } }; return allocate(dims); })([4, 4]);
                        /*private*/ this.variantEffectIdx = (function (dims) { var allocate = function (dims) { if (dims.length == 0) {
                            return 0;
                        }
                        else {
                            var array = [];
                            for (var i = 0; i < dims[0]; i++) {
                                array.push(allocate(dims.slice(1)));
                            }
                            return array;
                        } }; return allocate(dims); })([4, 4]);
                        /*private*/ this.variantFontIdx = (function (dims) { var allocate = function (dims) { if (dims.length == 0) {
                            return 0;
                        }
                        else {
                            var array = [];
                            for (var i = 0; i < dims[0]; i++) {
                                array.push(allocate(dims.slice(1)));
                            }
                            return array;
                        } }; return allocate(dims); })([4, 4]);
                        /*private*/ this.isProcessed = false;
                        /*private*/ this.__isPure = true;
                        this.theme = null;
                        this.bkgndColor = null;
                        this.name = null;
                        this.theme = theme;
                        this.name = theme.getAttribute("name") || "";
                        var themeId = (function (m, k) { return m[k] ? m[k] : null; })(mxVsdxTheme.themesIds_$LI$(), this.name);
                        if (themeId != null) {
                            this.themeIndex = themeId;
                        }
                    }
                    mxVsdxTheme.__static_initialize = function () { if (!mxVsdxTheme.__static_initialized) {
                        mxVsdxTheme.__static_initialized = true;
                        mxVsdxTheme.__static_initializer_0();
                        mxVsdxTheme.__static_initializer_1();
                    } };
                    mxVsdxTheme.themesIds_$LI$ = function () { mxVsdxTheme.__static_initialize(); if (mxVsdxTheme.themesIds == null)
                        mxVsdxTheme.themesIds = ({}); return mxVsdxTheme.themesIds; };
                    ;
                    mxVsdxTheme.__static_initializer_0 = function () {
                        /* put */ (mxVsdxTheme.themesIds_$LI$()["Office"] = 33);
                        /* put */ (mxVsdxTheme.themesIds_$LI$()["Linear"] = 34);
                        /* put */ (mxVsdxTheme.themesIds_$LI$()["Zephyr"] = 35);
                        /* put */ (mxVsdxTheme.themesIds_$LI$()["Integral"] = 36);
                        /* put */ (mxVsdxTheme.themesIds_$LI$()["Simple"] = 37);
                        /* put */ (mxVsdxTheme.themesIds_$LI$()["Whisp"] = 38);
                        /* put */ (mxVsdxTheme.themesIds_$LI$()["Daybreak"] = 39);
                        /* put */ (mxVsdxTheme.themesIds_$LI$()["Parallel"] = 40);
                        /* put */ (mxVsdxTheme.themesIds_$LI$()["Sequence"] = 41);
                        /* put */ (mxVsdxTheme.themesIds_$LI$()["Slice"] = 42);
                        /* put */ (mxVsdxTheme.themesIds_$LI$()["Ion"] = 43);
                        /* put */ (mxVsdxTheme.themesIds_$LI$()["Retrospect"] = 44);
                        /* put */ (mxVsdxTheme.themesIds_$LI$()["Organic"] = 45);
                        /* put */ (mxVsdxTheme.themesIds_$LI$()["Bubble"] = 46);
                        /* put */ (mxVsdxTheme.themesIds_$LI$()["Clouds"] = 47);
                        /* put */ (mxVsdxTheme.themesIds_$LI$()["Gemstone"] = 48);
                        /* put */ (mxVsdxTheme.themesIds_$LI$()["Lines"] = 49);
                        /* put */ (mxVsdxTheme.themesIds_$LI$()["Facet"] = 50);
                        /* put */ (mxVsdxTheme.themesIds_$LI$()["Prominence"] = 51);
                        /* put */ (mxVsdxTheme.themesIds_$LI$()["Smoke"] = 52);
                        /* put */ (mxVsdxTheme.themesIds_$LI$()["Radiance"] = 53);
                        /* put */ (mxVsdxTheme.themesIds_$LI$()["Shade"] = 54);
                        /* put */ (mxVsdxTheme.themesIds_$LI$()["Pencil"] = 55);
                        /* put */ (mxVsdxTheme.themesIds_$LI$()["Pen"] = 56);
                        /* put */ (mxVsdxTheme.themesIds_$LI$()["Marker"] = 57);
                        /* put */ (mxVsdxTheme.themesIds_$LI$()["Whiteboard"] = 58);
                    };
                    mxVsdxTheme.colorIds_$LI$ = function () { mxVsdxTheme.__static_initialize(); if (mxVsdxTheme.colorIds == null)
                        mxVsdxTheme.colorIds = ({}); return mxVsdxTheme.colorIds; };
                    ;
                    mxVsdxTheme.__static_initializer_1 = function () {
                        /* put */ (function (m, k, v) { if (m.entries == null)
                            m.entries = []; for (var i = 0; i < m.entries.length; i++)
                            if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                m.entries[i].value = v;
                                return;
                            } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(mxVsdxTheme.colorIds_$LI$(), 0, "dk1");
                        /* put */ (function (m, k, v) { if (m.entries == null)
                            m.entries = []; for (var i = 0; i < m.entries.length; i++)
                            if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                m.entries[i].value = v;
                                return;
                            } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(mxVsdxTheme.colorIds_$LI$(), 1, "lt1");
                        /* put */ (function (m, k, v) { if (m.entries == null)
                            m.entries = []; for (var i = 0; i < m.entries.length; i++)
                            if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                m.entries[i].value = v;
                                return;
                            } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(mxVsdxTheme.colorIds_$LI$(), 2, "accent1");
                        /* put */ (function (m, k, v) { if (m.entries == null)
                            m.entries = []; for (var i = 0; i < m.entries.length; i++)
                            if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                m.entries[i].value = v;
                                return;
                            } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(mxVsdxTheme.colorIds_$LI$(), 3, "accent2");
                        /* put */ (function (m, k, v) { if (m.entries == null)
                            m.entries = []; for (var i = 0; i < m.entries.length; i++)
                            if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                m.entries[i].value = v;
                                return;
                            } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(mxVsdxTheme.colorIds_$LI$(), 4, "accent3");
                        /* put */ (function (m, k, v) { if (m.entries == null)
                            m.entries = []; for (var i = 0; i < m.entries.length; i++)
                            if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                m.entries[i].value = v;
                                return;
                            } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(mxVsdxTheme.colorIds_$LI$(), 5, "accent4");
                        /* put */ (function (m, k, v) { if (m.entries == null)
                            m.entries = []; for (var i = 0; i < m.entries.length; i++)
                            if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                m.entries[i].value = v;
                                return;
                            } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(mxVsdxTheme.colorIds_$LI$(), 6, "accent5");
                        /* put */ (function (m, k, v) { if (m.entries == null)
                            m.entries = []; for (var i = 0; i < m.entries.length; i++)
                            if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                m.entries[i].value = v;
                                return;
                            } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(mxVsdxTheme.colorIds_$LI$(), 7, "accent6");
                    };
                    mxVsdxTheme.prototype.getThemeIndex = function () {
                        return this.themeIndex;
                    };
                    mxVsdxTheme.prototype.setVariant = function (variant) {
                        this.themeVariant = variant;
                    };
                    mxVsdxTheme.prototype.isPure = function () {
                        return this.__isPure;
                    };
                    mxVsdxTheme.prototype.processTheme = function () {
                        if (this.isProcessed)
                            return;
                        try {
                            var child = this.theme.firstChild;
                            while ((child != null)) {
                                if ((child != null && (child.nodeType == 1)) && (function (o1, o2) { if (o1 && o1.equals) {
                                    return o1.equals(o2);
                                }
                                else {
                                    return o1 === o2;
                                } })(child.nodeName, "a:themeElements")) {
                                    var child2 = child.firstChild;
                                    while ((child2 != null)) {
                                        if (child2 != null && (child2.nodeType == 1)) {
                                            var elem = child2;
                                            var nodeName = elem.nodeName;
                                            if ((function (o1, o2) { if (o1 && o1.equals) {
                                                return o1.equals(o2);
                                            }
                                            else {
                                                return o1 === o2;
                                            } })(nodeName, "a:clrScheme")) {
                                                if (!(function (o1, o2) { if (o1 && o1.equals) {
                                                    return o1.equals(o2);
                                                }
                                                else {
                                                    return o1 === o2;
                                                } })(this.name, elem.getAttribute("name"))) {
                                                    this.__isPure = false;
                                                }
                                                this.processColors(elem);
                                            }
                                            else if ((function (o1, o2) { if (o1 && o1.equals) {
                                                return o1.equals(o2);
                                            }
                                            else {
                                                return o1 === o2;
                                            } })(nodeName, "a:fontScheme")) {
                                                if (!(function (o1, o2) { if (o1 && o1.equals) {
                                                    return o1.equals(o2);
                                                }
                                                else {
                                                    return o1 === o2;
                                                } })(this.name, elem.getAttribute("name"))) {
                                                    this.__isPure = false;
                                                }
                                                this.processFonts(elem);
                                            }
                                            else if ((function (o1, o2) { if (o1 && o1.equals) {
                                                return o1.equals(o2);
                                            }
                                            else {
                                                return o1 === o2;
                                            } })(nodeName, "a:fmtScheme")) {
                                                if (!(function (o1, o2) { if (o1 && o1.equals) {
                                                    return o1.equals(o2);
                                                }
                                                else {
                                                    return o1 === o2;
                                                } })(this.name, elem.getAttribute("name"))) {
                                                    this.__isPure = false;
                                                }
                                                this.processFormats(elem);
                                            }
                                            else if ((function (o1, o2) { if (o1 && o1.equals) {
                                                return o1.equals(o2);
                                            }
                                            else {
                                                return o1 === o2;
                                            } })(nodeName, "a:extLst")) {
                                                this.processExtras(elem);
                                            }
                                        }
                                        child2 = child2.nextSibling;
                                    }
                                    ;
                                }
                                child = child.nextSibling;
                            }
                            ;
                        }
                        catch (e) {
                           // console.error(e.message, e);
                        }
                        ;
                        this.isProcessed = true;
                    };
                    /*private*/ mxVsdxTheme.prototype.processExtras = function (element) {
                        var exts = com.mxgraph.io.vsdx.mxVsdxUtils.getDirectChildElements(element);
                        for (var index134 = 0; index134 < exts.length; index134++) {
                            var ext = exts[index134];
                            {
                                var vt = com.mxgraph.io.vsdx.mxVsdxUtils.getDirectFirstChildElement(ext);
                                switch ((vt.nodeName)) {
                                    case "vt:fmtConnectorScheme":
                                        if (!(function (o1, o2) { if (o1 && o1.equals) {
                                            return o1.equals(o2);
                                        }
                                        else {
                                            return o1 === o2;
                                        } })(this.name, vt.getAttribute("name"))) {
                                            this.__isPure = false;
                                        }
                                        var connSchemes = com.mxgraph.io.vsdx.mxVsdxUtils.getDirectChildElements(vt);
                                        for (var index135 = 0; index135 < connSchemes.length; index135++) {
                                            var scheme = connSchemes[index135];
                                            {
                                                var name_3 = scheme.nodeName;
                                                switch ((name_3)) {
                                                    case "a:fillStyleLst":
                                                        var fillStyleElems = com.mxgraph.io.vsdx.mxVsdxUtils.getDirectChildElements(scheme);
                                                        for (var index136 = 0; index136 < fillStyleElems.length; index136++) {
                                                            var fillStyle = fillStyleElems[index136];
                                                            {
                                                                /* add */ (this.connFillStyles.push(com.mxgraph.io.vsdx.theme.FillStyleFactory.getFillStyle(fillStyle)));
                                                            }
                                                        }
                                                        break;
                                                    case "a:lnStyleLst":
                                                        var lineStyleElems = com.mxgraph.io.vsdx.mxVsdxUtils.getDirectChildElements(scheme);
                                                        for (var index137 = 0; index137 < lineStyleElems.length; index137++) {
                                                            var lineStyle = lineStyleElems[index137];
                                                            {
                                                                /* add */ (this.connLineStyles.push(new com.mxgraph.io.vsdx.theme.LineStyle(lineStyle)));
                                                            }
                                                        }
                                                        break;
                                                }
                                            }
                                        }
                                        break;
                                    case "vt:lineStyles":
                                        var styles = com.mxgraph.io.vsdx.mxVsdxUtils.getDirectChildElements(vt);
                                        for (var index138 = 0; index138 < styles.length; index138++) {
                                            var style = styles[index138];
                                            {
                                                var name_4 = style.nodeName;
                                                switch ((name_4)) {
                                                    case "vt:fmtConnectorSchemeLineStyles":
                                                        var connStylesElems = com.mxgraph.io.vsdx.mxVsdxUtils.getDirectChildElements(style);
                                                        for (var index139 = 0; index139 < connStylesElems.length; index139++) {
                                                            var connStyle = connStylesElems[index139];
                                                            {
                                                                /* add */ (this.connLineStylesExt.push(new com.mxgraph.io.vsdx.theme.LineStyleExt(connStyle)));
                                                            }
                                                        }
                                                        break;
                                                    case "vt:fmtSchemeLineStyles":
                                                        var schemeStyleElems = com.mxgraph.io.vsdx.mxVsdxUtils.getDirectChildElements(style);
                                                        for (var index140 = 0; index140 < schemeStyleElems.length; index140++) {
                                                            var schemeStyle = schemeStyleElems[index140];
                                                            {
                                                                /* add */ (this.lineStylesExt.push(new com.mxgraph.io.vsdx.theme.LineStyleExt(schemeStyle)));
                                                            }
                                                        }
                                                        break;
                                                }
                                            }
                                        }
                                        break;
                                    case "vt:fontStylesGroup":
                                        var fontStyleElems = com.mxgraph.io.vsdx.mxVsdxUtils.getDirectChildElements(vt);
                                        for (var index141 = 0; index141 < fontStyleElems.length; index141++) {
                                            var fontStyle = fontStyleElems[index141];
                                            {
                                                var name_5 = fontStyle.nodeName;
                                                switch ((name_5)) {
                                                    case "vt:connectorFontStyles":
                                                        this.fillFontStyles(fontStyle, this.connFontColors, this.connFontStyles);
                                                        break;
                                                    case "vt:fontStyles":
                                                        this.fillFontStyles(fontStyle, this.fontColors, this.fontStyles);
                                                        break;
                                                }
                                            }
                                        }
                                        break;
                                    case "vt:variationStyleSchemeLst":
                                        var varStyleSchemes = com.mxgraph.io.vsdx.mxVsdxUtils.getDirectChildElements(vt);
                                        var i = 0;
                                        for (var index142 = 0; index142 < varStyleSchemes.length; index142++) {
                                            var varStyleScheme = varStyleSchemes[index142];
                                            {
                                                this.variantEmbellishment[i] = com.mxgraph.io.vsdx.mxVsdxUtils.getIntAttr$org_w3c_dom_Element$java_lang_String(varStyleScheme, "embellishment");
                                                var varStyles = com.mxgraph.io.vsdx.mxVsdxUtils.getDirectChildElements(varStyleScheme);
                                                var j = 0;
                                                for (var index143 = 0; index143 < varStyles.length; index143++) {
                                                    var varStyle = varStyles[index143];
                                                    {
                                                        this.variantFillIdx[i][j] = com.mxgraph.io.vsdx.mxVsdxUtils.getIntAttr$org_w3c_dom_Element$java_lang_String(varStyle, "fillIdx");
                                                        this.variantLineIdx[i][j] = com.mxgraph.io.vsdx.mxVsdxUtils.getIntAttr$org_w3c_dom_Element$java_lang_String(varStyle, "lineIdx");
                                                        this.variantEffectIdx[i][j] = com.mxgraph.io.vsdx.mxVsdxUtils.getIntAttr$org_w3c_dom_Element$java_lang_String(varStyle, "effectIdx");
                                                        this.variantFontIdx[i][j] = com.mxgraph.io.vsdx.mxVsdxUtils.getIntAttr$org_w3c_dom_Element$java_lang_String(varStyle, "fontIdx");
                                                        j++;
                                                    }
                                                }
                                                i++;
                                            }
                                        }
                                        break;
                                }
                            }
                        }
                    };
                    /*private*/ mxVsdxTheme.prototype.fillFontStyles = function (fontStyle, fontColors, fontStyles) {
                        var fontProps = com.mxgraph.io.vsdx.mxVsdxUtils.getDirectChildElements(fontStyle);
                        for (var index144 = 0; index144 < fontProps.length; index144++) {
                            var fontProp = fontProps[index144];
                            {
                                /* add */ (fontStyles.push(com.mxgraph.io.vsdx.mxVsdxUtils.getIntAttr$org_w3c_dom_Element$java_lang_String(fontProp, "style")));
                                var color = com.mxgraph.io.vsdx.mxVsdxUtils.getDirectFirstChildElement(fontProp);
                                if (color != null)
                                    (fontColors.push(com.mxgraph.io.vsdx.theme.OoxmlColorFactory.getOoxmlColor(com.mxgraph.io.vsdx.mxVsdxUtils.getDirectFirstChildElement(color))));
                            }
                        }
                    };
                    /*private*/ mxVsdxTheme.prototype.processFormats = function (element) {
                        var styles = com.mxgraph.io.vsdx.mxVsdxUtils.getDirectChildElements(element);
                        for (var index145 = 0; index145 < styles.length; index145++) {
                            var style = styles[index145];
                            {
                                var name_6 = style.nodeName;
                                switch ((name_6)) {
                                    case "a:fillStyleLst":
                                        var fillStyleElems = com.mxgraph.io.vsdx.mxVsdxUtils.getDirectChildElements(style);
                                        for (var index146 = 0; index146 < fillStyleElems.length; index146++) {
                                            var fillStyle = fillStyleElems[index146];
                                            {
                                                /* add */ (this.fillStyles.push(com.mxgraph.io.vsdx.theme.FillStyleFactory.getFillStyle(fillStyle)));
                                            }
                                        }
                                        break;
                                    case "a:lnStyleLst":
                                        var lineStyleElems = com.mxgraph.io.vsdx.mxVsdxUtils.getDirectChildElements(style);
                                        for (var index147 = 0; index147 < lineStyleElems.length; index147++) {
                                            var lineStyle = lineStyleElems[index147];
                                            {
                                                /* add */ (this.lineStyles.push(new com.mxgraph.io.vsdx.theme.LineStyle(lineStyle)));
                                            }
                                        }
                                        break;
                                    case "a:effectStyleLst":
                                        break;
                                    case "a:bgFillStyleLst":
                                        break;
                                }
                            }
                        }
                    };
                    /*private*/ mxVsdxTheme.prototype.processFonts = function (element) {
                    };
                    /*private*/ mxVsdxTheme.prototype.processColors = function (element) {
                        var child = element.firstChild;
                        while ((child != null)) {
                            if (child != null && (child.nodeType == 1)) {
                                var elem = child;
                                var nodeName = elem.nodeName;
                                var children = com.mxgraph.io.vsdx.mxVsdxUtils.getDirectChildElements(elem);
                                if ((function (o1, o2) { if (o1 && o1.equals) {
                                    return o1.equals(o2);
                                }
                                else {
                                    return o1 === o2;
                                } })(nodeName, "a:extLst")) {
                                    if (children.length === 3) {
                                        if (this.themeIndex < 0) {
                                            this.extractThemeIndex(/* get */ children[0]);
                                        }
                                        this.addBkgndColor(/* get */ children[1]);
                                        this.addVariantColors(/* get */ children[2]);
                                    }
                                }
                                else {
                                    var clrName = nodeName.substring(2);
                                    if (children.length > 0) {
                                        this.addBasicColor(clrName, /* get */ children[0]);
                                    }
                                }
                            }
                            child = child.nextSibling;
                        }
                        ;
                    };
                    /*private*/ mxVsdxTheme.prototype.addVariantColors = function (element) {
                        var parent = com.mxgraph.io.vsdx.mxVsdxUtils.getDirectFirstChildElement(element);
                        if (parent != null) {
                            var variants = com.mxgraph.io.vsdx.mxVsdxUtils.getDirectChildElements(parent);
                            var i = 0;
                            for (var index148 = 0; index148 < variants.length; index148++) {
                                var variant = variants[index148];
                                {
                                    this.addVariantColorsSet(i++, variant);
                                }
                            }
                        }
                    };
                    /*private*/ mxVsdxTheme.prototype.addVariantColorsSet = function (index, variant) {
                        var colors = com.mxgraph.io.vsdx.mxVsdxUtils.getDirectChildElements(variant);
                        this.isMonotoneVariant[index] = variant.hasAttribute("monotone");
                        for (var index149 = 0; index149 < colors.length; index149++) {
                            var color = colors[index149];
                            {
                                var name_7 = color.nodeName;
                                switch ((name_7)) {
                                    case "vt:varColor1":
                                        this.variantsColors[index][0] = com.mxgraph.io.vsdx.theme.OoxmlColorFactory.getOoxmlColor(com.mxgraph.io.vsdx.mxVsdxUtils.getDirectFirstChildElement(color));
                                        break;
                                    case "vt:varColor2":
                                        this.variantsColors[index][1] = com.mxgraph.io.vsdx.theme.OoxmlColorFactory.getOoxmlColor(com.mxgraph.io.vsdx.mxVsdxUtils.getDirectFirstChildElement(color));
                                        break;
                                    case "vt:varColor3":
                                        this.variantsColors[index][2] = com.mxgraph.io.vsdx.theme.OoxmlColorFactory.getOoxmlColor(com.mxgraph.io.vsdx.mxVsdxUtils.getDirectFirstChildElement(color));
                                        break;
                                    case "vt:varColor4":
                                        this.variantsColors[index][3] = com.mxgraph.io.vsdx.theme.OoxmlColorFactory.getOoxmlColor(com.mxgraph.io.vsdx.mxVsdxUtils.getDirectFirstChildElement(color));
                                        break;
                                    case "vt:varColor5":
                                        this.variantsColors[index][4] = com.mxgraph.io.vsdx.theme.OoxmlColorFactory.getOoxmlColor(com.mxgraph.io.vsdx.mxVsdxUtils.getDirectFirstChildElement(color));
                                        break;
                                    case "vt:varColor6":
                                        this.variantsColors[index][5] = com.mxgraph.io.vsdx.theme.OoxmlColorFactory.getOoxmlColor(com.mxgraph.io.vsdx.mxVsdxUtils.getDirectFirstChildElement(color));
                                        break;
                                    case "vt:varColor7":
                                        this.variantsColors[index][6] = com.mxgraph.io.vsdx.theme.OoxmlColorFactory.getOoxmlColor(com.mxgraph.io.vsdx.mxVsdxUtils.getDirectFirstChildElement(color));
                                        break;
                                }
                            }
                        }
                    };
                    /*private*/ mxVsdxTheme.prototype.addBkgndColor = function (element) {
                        var elem = com.mxgraph.io.vsdx.mxVsdxUtils.getDirectFirstChildElement(element);
                        if (elem != null) {
                            this.bkgndColor = com.mxgraph.io.vsdx.theme.OoxmlColorFactory.getOoxmlColor(com.mxgraph.io.vsdx.mxVsdxUtils.getDirectFirstChildElement(elem));
                        }
                    };
                    /*private*/ mxVsdxTheme.prototype.extractThemeIndex = function (element) {
                        var elem = com.mxgraph.io.vsdx.mxVsdxUtils.getDirectFirstChildElement(element);
                        if (elem != null) {
                            this.themeIndex = parseInt(elem.getAttribute("schemeEnum"));
                        }
                    };
                    /*private*/ mxVsdxTheme.prototype.addBasicColor = function (clrName, element) {
                        /* put */ (this.baseColors[clrName] = com.mxgraph.io.vsdx.theme.OoxmlColorFactory.getOoxmlColor(element));
                    };
                    mxVsdxTheme.prototype.getSchemeColor = function (val) {
                        this.processTheme();
                        var color = (function (m, k) { return m[k] ? m[k] : null; })(this.baseColors, val);
                        return color != null ? color.getColor$com_mxgraph_io_vsdx_mxVsdxTheme(this) : this.defaultClr;
                    };
                    mxVsdxTheme.prototype.getStyleColor = function (styleColor) {
                        this.processTheme();
                        if (styleColor < 8) {
                            var color = (function (m, k) { return m[k] ? m[k] : null; })(this.baseColors, /* get */ (function (m, k) { if (m.entries == null)
                                m.entries = []; for (var i = 0; i < m.entries.length; i++)
                                if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                    return m.entries[i].value;
                                } return null; })(mxVsdxTheme.colorIds_$LI$(), styleColor));
                            if (color != null) {
                                return color.getColor$com_mxgraph_io_vsdx_mxVsdxTheme(this);
                            }
                        }
                        else if (styleColor === 8) {
                            if (this.bkgndColor != null) {
                                return this.bkgndColor.getColor$com_mxgraph_io_vsdx_mxVsdxTheme(this);
                            }
                        }
                        else {
                            var color = null;
                            var clrIndex = 0;
                            if (styleColor >= 200) {
                                clrIndex = styleColor - 200;
                            }
                            else if (styleColor >= 100) {
                                clrIndex = styleColor - 100;
                            }
                            if (clrIndex >= 0 && clrIndex <= 6) {
                                color = this.variantsColors[this.themeVariant][clrIndex];
                            }
                            if (color != null) {
                                return color.getColor$com_mxgraph_io_vsdx_mxVsdxTheme(this);
                            }
                        }
                        return this.defaultClr;
                    };
                    mxVsdxTheme.prototype.getFillGraientColor = function (quickStyleVals) {
                        return this.getFillColor$com_mxgraph_io_vsdx_theme_QuickStyleVals$boolean(quickStyleVals, true);
                    };
                    mxVsdxTheme.prototype.getFillColor$com_mxgraph_io_vsdx_theme_QuickStyleVals = function (quickStyleVals) {
                        return this.getFillColor$com_mxgraph_io_vsdx_theme_QuickStyleVals$boolean(quickStyleVals, false);
                    };
                    mxVsdxTheme.prototype.getFillColor$com_mxgraph_io_vsdx_theme_QuickStyleVals$boolean = function (quickStyleVals, getGradient) {
                        this.processTheme();
                        var fillColorStyle = quickStyleVals.getQuickStyleFillColor();
                        var fillStyle = null;
                        switch ((quickStyleVals.getQuickStyleFillMatrix())) {
                            case 1:
                            case 2:
                            case 3:
                            case 4:
                            case 5:
                            case 6:
                                fillStyle = this.fillStyles[quickStyleVals.getQuickStyleFillMatrix() - 1];
                                break;
                            case 100:
                            case 101:
                            case 102:
                            case 103:
                                if (this.isMonotoneVariant[this.themeVariant])
                                    fillColorStyle = 100;
                                var index = quickStyleVals.getQuickStyleFillMatrix() - 100;
                                fillStyle = this.fillStyles[this.variantFillIdx[this.themeVariant][index] - 1];
                                break;
                        }
                        var retColor;
                        if (fillStyle != null) {
                            if (getGradient) {
                                retColor = (fillStyle != null && fillStyle instanceof com.mxgraph.io.vsdx.theme.GradFill) ? fillStyle.applyStyle(fillColorStyle, this).getGradientClr() : null;
                            }
                            else {
                                retColor = fillStyle.applyStyle(fillColorStyle, this);
                            }
                        }
                        else {
                            if (getGradient) {
                                retColor = null;
                            }
                            else {
                                retColor = this.getStyleColor(fillColorStyle);
                            }
                        }
                        var styleVariation = quickStyleVals.getQuickStyleVariation();
                        
                        //TODO This is the best efforts of interpreting the documentation and also this article https://visualsignals.typepad.co.uk/vislog/2013/05/visio-2013-themes-in-the-shapesheet-part-2.html
                        if (retColor != null && (styleVariation & 8) > 0) 
                        {
                        	var bkgHSLClr = this.getStyleColor(8).toHsl();
                        	var lineClr = this.getLineColor$com_mxgraph_io_vsdx_theme_QuickStyleVals(quickStyleVals);
                        	var lineHSLClr = lineClr.toHsl();
                            var fillHSLClr = retColor.toHsl();
                            
                            
                            if (Math.abs(bkgHSLClr.getLum() - fillHSLClr.getLum()) >= 0.1666) 
                            {
                            	//nothing
                            }
                            else if (bkgHSLClr.getLum() <= 0.7292) 
                            {
                            	retColor = new com.mxgraph.io.vsdx.theme.Color(255, 255, 255);
                            }
                            else if (Math.abs(bkgHSLClr.getLum() - lineHSLClr.getLum()) > Math.abs(bkgHSLClr.getLum() - fillHSLClr.getLum()))
                        	{
                            	retColor = lineClr;
                        	}
                        }
                        return retColor;
                    };
                    mxVsdxTheme.prototype.getFillColor = function (quickStyleVals, getGradient) {
                        if (((quickStyleVals != null && quickStyleVals instanceof com.mxgraph.io.vsdx.theme.QuickStyleVals) || quickStyleVals === null) && ((typeof getGradient === 'boolean') || getGradient === null)) {
                            return this.getFillColor$com_mxgraph_io_vsdx_theme_QuickStyleVals$boolean(quickStyleVals, getGradient);
                        }
                        else if (((quickStyleVals != null && quickStyleVals instanceof com.mxgraph.io.vsdx.theme.QuickStyleVals) || quickStyleVals === null) && getGradient === undefined) {
                            return this.getFillColor$com_mxgraph_io_vsdx_theme_QuickStyleVals(quickStyleVals);
                        }
                        else
                            throw new Error('invalid overload');
                    };
                    /*private*/ mxVsdxTheme.prototype.getLineStyle = function (quickStyleLineMatrix, lineStyles) {
                        this.processTheme();
                        var lineStyle = null;
                        switch ((quickStyleLineMatrix)) {
                            case 1:
                            case 2:
                            case 3:
                            case 4:
                            case 5:
                            case 6:
                                lineStyle = lineStyles[quickStyleLineMatrix - 1];
                                break;
                            case 100:
                            case 101:
                            case 102:
                            case 103:
                                var index = quickStyleLineMatrix - 100;
                                if (lineStyles === this.lineStyles) {
                                    lineStyle = this.lineStyles[this.variantLineIdx[this.themeVariant][index] - 1];
                                }
                                else {
                                    lineStyle = this.defaultLineStyle;
                                }
                                break;
                        }
                        return lineStyle;
                    };
                    /*private*/ mxVsdxTheme.prototype.getLineStyleExt = function (quickStyleLineMatrix, lineStylesExt) {
                        this.processTheme();
                        var lineStyleExt = null;
                        switch ((quickStyleLineMatrix)) {
                            case 0:
                            case 1:
                            case 2:
                            case 3:
                            case 4:
                            case 5:
                            case 6:
                                lineStyleExt = lineStylesExt[quickStyleLineMatrix];
                                break;
                        }
                        return lineStyleExt;
                    };
                    mxVsdxTheme.prototype.getLineColor$com_mxgraph_io_vsdx_theme_QuickStyleVals$java_util_ArrayList = function (quickStyleVals, lineStyles) {
                        this.processTheme();
                        var lineColorStyle = quickStyleVals.getQuickStyleLineColor();
                        var lineStyle = this.getLineStyle(quickStyleVals.getQuickStyleLineMatrix(), lineStyles);
                        switch ((quickStyleVals.getQuickStyleLineMatrix())) {
                            case 100:
                            case 101:
                            case 102:
                            case 103:
                                if (this.isMonotoneVariant[this.themeVariant])
                                    lineColorStyle = 100;
                                break;
                        }
                        var lineClr;
                        if (lineStyle != null) {
                            lineClr = lineStyle.getLineColor(lineColorStyle, this);
                        }
                        else {
                            lineClr = this.getStyleColor(lineColorStyle);
                        }
                        var styleVariation = quickStyleVals.getQuickStyleVariation();
                        
                        //TODO This is the best efforts of interpreting the documentation and also this article https://visualsignals.typepad.co.uk/vislog/2013/05/visio-2013-themes-in-the-shapesheet-part-2.html
                        if ((styleVariation & 4) > 0) 
                        {
                        	var bkgHSLClr = this.getStyleColor(8).toHsl();
                        	var fillColor = this.getFillColor$com_mxgraph_io_vsdx_theme_QuickStyleVals(quickStyleVals);
                            var fillHSLClr = fillColor.toHsl();
                            var lineHSLClr = lineClr.toHsl();
                            
                            if (Math.abs(bkgHSLClr.getLum() - lineHSLClr.getLum()) >= 0.1666) 
                            {
                            	//nothing
                            }
                            else if (bkgHSLClr.getLum() <= 0.7292) 
                            {
                            	lineClr = new com.mxgraph.io.vsdx.theme.Color(255, 255, 255);
                            }
                            else if (Math.abs(bkgHSLClr.getLum() - fillHSLClr.getLum()) > Math.abs(bkgHSLClr.getLum() - lineHSLClr.getLum()))
                        	{
                            	lineClr = fillColor;
                        	}
                        }
                        return lineClr;
                    };
                    mxVsdxTheme.prototype.getLineColor = function (quickStyleVals, lineStyles) {
                        if (((quickStyleVals != null && quickStyleVals instanceof com.mxgraph.io.vsdx.theme.QuickStyleVals) || quickStyleVals === null) && ((lineStyles != null && (lineStyles instanceof Array)) || lineStyles === null)) {
                            return this.getLineColor$com_mxgraph_io_vsdx_theme_QuickStyleVals$java_util_ArrayList(quickStyleVals, lineStyles);
                        }
                        else if (((quickStyleVals != null && quickStyleVals instanceof com.mxgraph.io.vsdx.theme.QuickStyleVals) || quickStyleVals === null) && lineStyles === undefined) {
                            return this.getLineColor$com_mxgraph_io_vsdx_theme_QuickStyleVals(quickStyleVals);
                        }
                        else
                            throw new Error('invalid overload');
                    };
                    mxVsdxTheme.prototype.getLineColor$com_mxgraph_io_vsdx_theme_QuickStyleVals = function (quickStyleVals) {
                        return this.getLineColor$com_mxgraph_io_vsdx_theme_QuickStyleVals$java_util_ArrayList(quickStyleVals, this.lineStyles);
                    };
                    mxVsdxTheme.prototype.getConnLineColor = function (quickStyleVals) {
                        return this.getLineColor$com_mxgraph_io_vsdx_theme_QuickStyleVals$java_util_ArrayList(quickStyleVals, this.connLineStyles);
                    };
                    mxVsdxTheme.prototype.getDefaultLineClr = function () {
                        return this.defaultLineClr;
                    };
                    mxVsdxTheme.prototype.isLineDashed$com_mxgraph_io_vsdx_theme_QuickStyleVals$java_util_ArrayList$java_util_ArrayList = function (quickStyleVals, lineStylesExt, lineStyles) {
                        var lineStyleExt = this.getLineStyleExt(quickStyleVals.getQuickStyleLineMatrix(), lineStylesExt);
                        if (lineStyleExt != null) {
                            return lineStyleExt.isDashed();
                        }
                        else {
                            var lineStyle = this.getLineStyle(quickStyleVals.getQuickStyleLineMatrix(), lineStyles);
                            return lineStyle != null ? lineStyle.isDashed() : false;
                        }
                    };
                    mxVsdxTheme.prototype.isLineDashed = function (quickStyleVals, lineStylesExt, lineStyles) {
                        if (((quickStyleVals != null && quickStyleVals instanceof com.mxgraph.io.vsdx.theme.QuickStyleVals) || quickStyleVals === null) && ((lineStylesExt != null && (lineStylesExt instanceof Array)) || lineStylesExt === null) && ((lineStyles != null && (lineStyles instanceof Array)) || lineStyles === null)) {
                            return this.isLineDashed$com_mxgraph_io_vsdx_theme_QuickStyleVals$java_util_ArrayList$java_util_ArrayList(quickStyleVals, lineStylesExt, lineStyles);
                        }
                        else if (((quickStyleVals != null && quickStyleVals instanceof com.mxgraph.io.vsdx.theme.QuickStyleVals) || quickStyleVals === null) && lineStylesExt === undefined && lineStyles === undefined) {
                            return this.isLineDashed$com_mxgraph_io_vsdx_theme_QuickStyleVals(quickStyleVals);
                        }
                        else
                            throw new Error('invalid overload');
                    };
                    mxVsdxTheme.prototype.isLineDashed$com_mxgraph_io_vsdx_theme_QuickStyleVals = function (quickStyleVals) {
                        return this.isLineDashed$com_mxgraph_io_vsdx_theme_QuickStyleVals$java_util_ArrayList$java_util_ArrayList(quickStyleVals, this.lineStylesExt, this.lineStyles);
                    };
                    mxVsdxTheme.prototype.isConnLineDashed = function (quickStyleVals) {
                        return this.isLineDashed$com_mxgraph_io_vsdx_theme_QuickStyleVals$java_util_ArrayList$java_util_ArrayList(quickStyleVals, this.connLineStylesExt, this.connLineStyles);
                    };
                    mxVsdxTheme.prototype.getLineDashPattern$com_mxgraph_io_vsdx_theme_QuickStyleVals$java_util_ArrayList$java_util_ArrayList = function (quickStyleVals, lineStylesExt, lineStyles) {
                        var lineStyleExt = this.getLineStyleExt(quickStyleVals.getQuickStyleLineMatrix(), lineStylesExt);
                        if (lineStyleExt != null) {
                            return lineStyleExt.getLineDashPattern();
                        }
                        else {
                            var lineStyle = this.getLineStyle(quickStyleVals.getQuickStyleLineMatrix(), lineStyles);
                            return lineStyle != null ? lineStyle.getLineDashPattern() : null;
                        }
                    };
                    mxVsdxTheme.prototype.getLineDashPattern = function (quickStyleVals, lineStylesExt, lineStyles) {
                        if (((quickStyleVals != null && quickStyleVals instanceof com.mxgraph.io.vsdx.theme.QuickStyleVals) || quickStyleVals === null) && ((lineStylesExt != null && (lineStylesExt instanceof Array)) || lineStylesExt === null) && ((lineStyles != null && (lineStyles instanceof Array)) || lineStyles === null)) {
                            return this.getLineDashPattern$com_mxgraph_io_vsdx_theme_QuickStyleVals$java_util_ArrayList$java_util_ArrayList(quickStyleVals, lineStylesExt, lineStyles);
                        }
                        else if (((quickStyleVals != null && quickStyleVals instanceof com.mxgraph.io.vsdx.theme.QuickStyleVals) || quickStyleVals === null) && lineStylesExt === undefined && lineStyles === undefined) {
                            return this.getLineDashPattern$com_mxgraph_io_vsdx_theme_QuickStyleVals(quickStyleVals);
                        }
                        else
                            throw new Error('invalid overload');
                    };
                    mxVsdxTheme.prototype.getLineDashPattern$com_mxgraph_io_vsdx_theme_QuickStyleVals = function (quickStyleVals) {
                        return this.getLineDashPattern$com_mxgraph_io_vsdx_theme_QuickStyleVals$java_util_ArrayList$java_util_ArrayList(quickStyleVals, this.lineStylesExt, this.lineStyles);
                    };
                    mxVsdxTheme.prototype.getConnLineDashPattern = function (quickStyleVals) {
                        return this.getLineDashPattern$com_mxgraph_io_vsdx_theme_QuickStyleVals$java_util_ArrayList$java_util_ArrayList(quickStyleVals, this.connLineStylesExt, this.connLineStyles);
                    };
                    /*private*/ mxVsdxTheme.prototype.getArrowSize = function (quickStyleVals, isStart, lineStylesExt, lineStyles) {
                        var lineStyleExt = this.getLineStyleExt(quickStyleVals.getQuickStyleLineMatrix(), lineStylesExt);
                        if (lineStyleExt != null) {
                            return isStart ? lineStyleExt.getStartSize() : lineStyleExt.getEndSize();
                        }
                        else {
                            var lineStyle = this.getLineStyle(quickStyleVals.getQuickStyleLineMatrix(), lineStyles);
                            return lineStyle != null ? (isStart ? lineStyle.getStartSize() : lineStyle.getEndSize()) : 4;
                        }
                    };
                    mxVsdxTheme.prototype.getStartSize = function (quickStyleVals) {
                        return this.getArrowSize(quickStyleVals, true, this.lineStylesExt, this.lineStyles);
                    };
                    mxVsdxTheme.prototype.getConnStartSize = function (quickStyleVals) {
                        return this.getArrowSize(quickStyleVals, true, this.connLineStylesExt, this.connLineStyles);
                    };
                    mxVsdxTheme.prototype.getEndSize = function (quickStyleVals) {
                        return this.getArrowSize(quickStyleVals, false, this.lineStylesExt, this.lineStyles);
                    };
                    mxVsdxTheme.prototype.getConnEndSize = function (quickStyleVals) {
                        return this.getArrowSize(quickStyleVals, false, this.connLineStylesExt, this.connLineStyles);
                    };
                    mxVsdxTheme.prototype.getFontColor$com_mxgraph_io_vsdx_theme_QuickStyleVals$java_util_ArrayList = function (quickStyleVals, fontColors) {
                        this.processTheme();
                        var fontColorStyle = quickStyleVals.getQuickStyleFontColor();
                        var fontColor = null;
                        switch ((quickStyleVals.getQuickStyleFontMatrix())) {
                            case 1:
                            case 2:
                            case 3:
                            case 4:
                            case 5:
                            case 6:
                                fontColor = fontColors[quickStyleVals.getQuickStyleFontMatrix() - 1];
                                break;
                            case 100:
                            case 101:
                            case 102:
                            case 103:
                                if (this.isMonotoneVariant[this.themeVariant])
                                    fontColorStyle = 100;
                                var index = quickStyleVals.getQuickStyleFontMatrix() - 100;
                                if (fontColors !== this.fontColors) {
                                    fontColor = (function (m, k) { return m[k] ? m[k] : null; })(this.baseColors, "dk1");
                                }
                                else {
                                    fontColor = fontColors[this.variantFontIdx[this.themeVariant][index] - 1];
                                }
                                break;
                        }
                        var txtColor;
                        if (fontColor != null) {
                            txtColor = fontColor.getColor$int$com_mxgraph_io_vsdx_mxVsdxTheme(fontColorStyle, this);
                        }
                        else {
                            txtColor = this.getStyleColor(fontColorStyle);
                        }
                        var styleVariation = quickStyleVals.getQuickStyleVariation();
                        
                        //TODO This is the best efforts of interpreting the documentation and also this article https://visualsignals.typepad.co.uk/vislog/2013/05/visio-2013-themes-in-the-shapesheet-part-2.html
                        if ((styleVariation & 2) > 0) 
                        {
                        	var bkgHSLClr = this.getStyleColor(8).toHsl();
                        	var txtHSLClr = txtColor.toHsl();
                        	var fillColor = this.getFillColor$com_mxgraph_io_vsdx_theme_QuickStyleVals(quickStyleVals);
                            var fillHSLClr = fillColor.toHsl();
                            var lineClr = this.getLineColor$com_mxgraph_io_vsdx_theme_QuickStyleVals(quickStyleVals);
                            var lineHSLClr = lineClr.toHsl();
                            
                            if (Math.abs(bkgHSLClr.getLum() - txtHSLClr.getLum()) >= 0.1666) 
                            {
                            	//nothing
                            }
                            else if (bkgHSLClr.getLum() <= 0.7292) 
                            {
                            	txtColor = new com.mxgraph.io.vsdx.theme.Color(255, 255, 255);
                            }
                            else
                        	{
                            	var lineDiff = Math.abs(bkgHSLClr.getLum() - lineHSLClr.getLum());
                            	var fillDiff = Math.abs(bkgHSLClr.getLum() - fillHSLClr.getLum());
                            	var txtDiff = Math.abs(bkgHSLClr.getLum() - txtHSLClr.getLum());
                            	var max = Math.max(lineDiff, fillDiff, txtDiff);
                            	
                            	if (max == lineDiff)
                        		{
                            		txtColor = lineClr;
                        		}
                            	else if (max == fillDiff)
                        		{
                            		txtColor = fillColor;
                        		}
                        	}
                        }
                        
                        return txtColor;
                    };
                    mxVsdxTheme.prototype.getFontColor = function (quickStyleVals, fontColors) {
                        if (((quickStyleVals != null && quickStyleVals instanceof com.mxgraph.io.vsdx.theme.QuickStyleVals) || quickStyleVals === null) && ((fontColors != null && (fontColors instanceof Array)) || fontColors === null)) {
                            return this.getFontColor$com_mxgraph_io_vsdx_theme_QuickStyleVals$java_util_ArrayList(quickStyleVals, fontColors);
                        }
                        else if (((quickStyleVals != null && quickStyleVals instanceof com.mxgraph.io.vsdx.theme.QuickStyleVals) || quickStyleVals === null) && fontColors === undefined) {
                            return this.getFontColor$com_mxgraph_io_vsdx_theme_QuickStyleVals(quickStyleVals);
                        }
                        else
                            throw new Error('invalid overload');
                    };
                    mxVsdxTheme.prototype.getFontColor$com_mxgraph_io_vsdx_theme_QuickStyleVals = function (quickStyleVals) {
                        return this.getFontColor$com_mxgraph_io_vsdx_theme_QuickStyleVals$java_util_ArrayList(quickStyleVals, this.fontColors);
                    };
                    mxVsdxTheme.prototype.getConnFontColor = function (quickStyleVals) {
                        return this.getFontColor$com_mxgraph_io_vsdx_theme_QuickStyleVals$java_util_ArrayList(quickStyleVals, this.connFontColors);
                    };
                    /*private*/ mxVsdxTheme.prototype.getArrowType = function (quickStyleVals, isStart, lineStylesExt, lineStyles) {
                        var lineStyleExt = this.getLineStyleExt(quickStyleVals.getQuickStyleLineMatrix(), lineStylesExt);
                        if (lineStyleExt != null) {
                            return isStart ? lineStyleExt.getStart() : lineStyleExt.getEnd();
                        }
                        else {
                            var lineStyle = this.getLineStyle(quickStyleVals.getQuickStyleLineMatrix(), lineStyles);
                            return lineStyle != null ? (isStart ? lineStyle.getStart() : lineStyle.getEnd()) : 0;
                        }
                    };
                    mxVsdxTheme.prototype.getEdgeMarker = function (isStart, quickStyleVals) {
                        return this.getArrowType(quickStyleVals, isStart, this.lineStylesExt, this.lineStyles);
                    };
                    mxVsdxTheme.prototype.getConnEdgeMarker = function (isStart, quickStyleVals) {
                        return this.getArrowType(quickStyleVals, isStart, this.connLineStylesExt, this.connLineStyles);
                    };
                    mxVsdxTheme.prototype.getLineWidth$com_mxgraph_io_vsdx_theme_QuickStyleVals$java_util_ArrayList = function (quickStyleVals, lineStyles) {
                        var lineStyle = this.getLineStyle(quickStyleVals.getQuickStyleLineMatrix(), lineStyles);
                        return lineStyle != null ? lineStyle.getLineWidth() : 0;
                    };
                    mxVsdxTheme.prototype.getLineWidth = function (quickStyleVals, lineStyles) {
                        if (((quickStyleVals != null && quickStyleVals instanceof com.mxgraph.io.vsdx.theme.QuickStyleVals) || quickStyleVals === null) && ((lineStyles != null && (lineStyles instanceof Array)) || lineStyles === null)) {
                            return this.getLineWidth$com_mxgraph_io_vsdx_theme_QuickStyleVals$java_util_ArrayList(quickStyleVals, lineStyles);
                        }
                        else if (((quickStyleVals != null && quickStyleVals instanceof com.mxgraph.io.vsdx.theme.QuickStyleVals) || quickStyleVals === null) && lineStyles === undefined) {
                            return this.getLineWidth$com_mxgraph_io_vsdx_theme_QuickStyleVals(quickStyleVals);
                        }
                        else
                            throw new Error('invalid overload');
                    };
                    mxVsdxTheme.prototype.getLineWidth$com_mxgraph_io_vsdx_theme_QuickStyleVals = function (quickStyleVals) {
                        return this.getLineWidth$com_mxgraph_io_vsdx_theme_QuickStyleVals$java_util_ArrayList(quickStyleVals, this.lineStyles);
                    };
                    mxVsdxTheme.prototype.getConnLineWidth = function (quickStyleVals) {
                        return this.getLineWidth$com_mxgraph_io_vsdx_theme_QuickStyleVals$java_util_ArrayList(quickStyleVals, this.connLineStyles);
                    };
                    return mxVsdxTheme;
                }());
                mxVsdxTheme.__static_initialized = false;
                vsdx.mxVsdxTheme = mxVsdxTheme;
                mxVsdxTheme["__class"] = "com.mxgraph.io.vsdx.mxVsdxTheme";
            })(vsdx = io.vsdx || (io.vsdx = {}));
        })(io = mxgraph.io || (mxgraph.io = {}));
    })(mxgraph = com.mxgraph || (com.mxgraph = {}));
})(com || (com = {}));
(function (com) {
    var mxgraph;
    (function (mxgraph) {
        var io;
        (function (io) {
            var vsdx;
            (function (vsdx) {
                /**
                 * General utilities for .vdx format support
                 * @class
                 */
                var mxVsdxUtils = (function () {
                    function mxVsdxUtils() {
                    }
                    mxVsdxUtils.conversionFactor_$LI$ = function () { if (mxVsdxUtils.conversionFactor == null)
                        mxVsdxUtils.conversionFactor = mxVsdxUtils.screenCoordinatesPerCm * mxVsdxUtils.CENTIMETERS_PER_INCHES; return mxVsdxUtils.conversionFactor; };
                    ;
                    /**
                     * Returns a collection of direct child Elements that match the specified tag name
                     * @param {*} parent the parent whose direct children will be processed
                     * @param {string} name the child tag name to match
                     * @return {*[]} a collection of matching Elements
                     */
                    mxVsdxUtils.getDirectChildNamedElements = function (parent, name) {
                        var result = ([]);
                        for (var child = parent.firstChild; child != null; child = child.nextSibling) {
                            if ((child != null && (child.nodeType == 1)) && (function (o1, o2) { if (o1 && o1.equals) {
                                return o1.equals(o2);
                            }
                            else {
                                return o1 === o2;
                            } })(name, child.nodeName)) {
                                /* add */ (result.push(child));
                            }
                        }
                        ;
                        return result;
                    };
                    /**
                     * Returns a collection of direct child Elements
                     * @param {*} parent the parent whose direct children will be processed
                     * @return {*[]} a collection of all child Elements
                     */
                    mxVsdxUtils.getDirectChildElements = function (parent) {
                        var result = ([]);
                        for (var child = parent.firstChild; child != null; child = child.nextSibling) {
                            if (child != null && (child.nodeType == 1)) {
                                /* add */ (result.push(child));
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
                    mxVsdxUtils.getDirectFirstChildElement = function (parent) {
                        for (var child = parent.firstChild; child != null; child = child.nextSibling) {
                            if (child != null && (child.nodeType == 1)) {
                                return child;
                            }
                        }
                        ;
                        return null;
                    };
                    mxVsdxUtils.getIntAttr$org_w3c_dom_Element$java_lang_String$int = function (elem, attName, defVal) {
                        try {
                            var val = elem.getAttribute(attName);
                            if (val != null) {
                                return parseInt(val);
                            }
                        }
                        catch (e) {
                        }
                        ;
                        return defVal;
                    };
                    /**
                     * Return the value of an integer attribute or the default value
                     * @param {*} elem Element
                     * @param {string} attName Attribute name
                     * @param {number} defVal default value
                     * @return {number} the parsed attribute value or the default value
                     */
                    mxVsdxUtils.getIntAttr = function (elem, attName, defVal) {
                        if (((elem != null && (elem.nodeType == 1)) || elem === null) && ((typeof attName === 'string') || attName === null) && ((typeof defVal === 'number') || defVal === null)) {
                            return com.mxgraph.io.vsdx.mxVsdxUtils.getIntAttr$org_w3c_dom_Element$java_lang_String$int(elem, attName, defVal);
                        }
                        else if (((elem != null && (elem.nodeType == 1)) || elem === null) && ((typeof attName === 'string') || attName === null) && defVal === undefined) {
                            return com.mxgraph.io.vsdx.mxVsdxUtils.getIntAttr$org_w3c_dom_Element$java_lang_String(elem, attName);
                        }
                        else
                            throw new Error('invalid overload');
                    };
                    mxVsdxUtils.getIntAttr$org_w3c_dom_Element$java_lang_String = function (elem, attName) {
                        return mxVsdxUtils.getIntAttr$org_w3c_dom_Element$java_lang_String$int(elem, attName, 0);
                    };
                    /**
                     * Returns the string that represents the content of a given style map.
                     * @param {*} styleMap Map with the styles values
                     * @return {string} string that represents the style.
                     * @param {string} asig
                     */
                    mxVsdxUtils.getStyleString = function (styleMap, asig) {
                        var style = "";
                        var it = (function (a) { var i = 0; return { next: function () { return i < a.length ? a[i++] : null; }, hasNext: function () { return i < a.length; } }; })(/* values */ (function (obj) { return Object.keys(obj).map(function (key) { return obj[key]; }); })(styleMap));
                        var kit = (function (a) { var i = 0; return { next: function () { return i < a.length ? a[i++] : null; }, hasNext: function () { return i < a.length; } }; })(/* keySet */ Object.keys(styleMap));
                        while ((kit.hasNext())) {
                            var key = kit.next();
                            var value = it.next();
                            if (!(function (o1, o2) { if (o1 && o1.equals) {
                                return o1.equals(o2);
                            }
                            else {
                                return o1 === o2;
                            } })(key, mxConstants.STYLE_SHAPE) || (!(function (str, searchString, position) {
                                if (position === void 0) { position = 0; }
                                return str.substr(position, searchString.length) === searchString;
                            })(/* get */ (function (m, k) { return m[k] ? m[k] : null; })(styleMap, key), "image") && !(function (str, searchString, position) {
                                if (position === void 0) { position = 0; }
                                return str.substr(position, searchString.length) === searchString;
                            })(/* get */ (function (m, k) { return m[k] ? m[k] : null; })(styleMap, key), "rounded="))) {
                                try {
                                    style = style + key + asig;
                                }
                                catch (e) {
                                	//console.error("mxVsdxUtils.getStyleString," + e + ",style.length=" + style.length + ",key.length=" + key.length + ",asig.length=" + asig.length);
                                }
                                ;
                            }
                            style = style + value + ";";
                        }
                        ;
                        return style;
                    };
                    /**
                     * Returns a text surrounded by tags html.
                     * @param {string} text Text to be surrounded.
                     * @param {string} tag Name of the tag.
                     * @return {string} &lt tag &gt text &lt /tag &gt
                     */
                    mxVsdxUtils.surroundByTags = function (text, tag, style) {
                        return "<" + tag + (style? ' style="' + style + '"' : '') + ">" + text + "</" + tag + ">";
                    };
                    /**
                     * Converts the ampersand, quote, prime, less-than and greater-than
                     * characters to their corresponding HTML entities in the given string.
                     *
                     * Note: this is the same method of mxUtils but we cannot use it as it is not compatible with google app engine
                     * @param {string} text
                     * @return {string}
                     */
                    mxVsdxUtils.htmlEntities = function (text) {
                        return text.replace(new RegExp("&", 'g'), "&amp;").replace(new RegExp("\"", 'g'), "&quot;").replace(new RegExp("\'", 'g'), "&prime;").replace(new RegExp("<", 'g'), "&lt;").replace(new RegExp(">", 'g'), "&gt;");
                    };
                    /**
                     * Converts the initial letter  of each word in text to uppercase
                     * @param {string} text Text to be transformed.
                     * @return {string} Text with initial capitals.
                     */
                    mxVsdxUtils.toInitialCapital = function (text) {
                        var words = text.split(" ");
                        var ret = "";
                        for (var index150 = 0; index150 < words.length; index150++) {
                            var word = words[index150];
                            {
                                var begin = word.substring(0, 1);
                                word = word.substring(1);
                                begin = begin.toUpperCase();
                                ret += begin + word;
                            }
                        }
                        return ret.substring(0, ret.length);
                    };
                    /**
                     * Trnsforms each lower case letter in text to small capital.
                     * @param {string} text Text to be transformed.
                     * @param {string} size Size of the original text.
                     * @return {string} Text in small capitals.
                     */
                    mxVsdxUtils.toSmallCaps = function (text, size) {
                        var ret = "";
                        if (!(function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(size, ret)) {
                            var a = 'a';
                            var z = 'z';
                            var letters = (text).split('');
                            for (var index151 = 0; index151 < letters.length; index151++) {
                                var c = letters[index151];
                                {
                                    if ((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(c) >= (function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(a) && (function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(c) <= (function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(z)) {
                                        var s = new String(c).toString();
                                        s = s.toUpperCase();
                                        ret += "<font style=\"font-size:" + parseFloat(size) / 1.28 + "px\">" + s + "</font>";
                                    }
                                    else {
                                        ret += c;
                                    }
                                }
                            }
                        }
                        else {
                            ret = text;
                        }
                        return ret;
                    };
                    /**
                     * Create a style map from a String with style definitions.
                     * @param {string} style Definition of the style.
                     * @param {string} asig Asignation simbol used in 'style'.
                     * @return {*} Map with the style properties.
                     */
                    mxVsdxUtils.getStyleMap = function (style, asig) {
                        var styleMap = ({});
                        var entries = style.split(";");
                        for (var index152 = 0; index152 < entries.length; index152++) {
                            var entry = entries[index152];
                            {
                                var index = entry.indexOf(asig);
                                var key = entry.substring(0, index);
                                var value = entry.substring(index + 1);
                                /* put */ (styleMap[key] = value);
                            }
                        }
                        return styleMap;
                    };
                    mxVsdxUtils.isInsideTriangle = function (x, y, ax, ay, bx, by, cx, cy) {
						function sign (p1x, p1y, p2x, p2y, p3x, p3y)
						{
						    return (p1x - p3x) * (p2y - p3y) - (p2x - p3x) * (p1y - p3y);
						}

					    var d1 = sign(x, y, ax, ay, bx, by);
					    var d2 = sign(x, y, bx, by, cx, cy);
					    var d3 = sign(x, y, cx, cy, ax, ay);
					
					    var has_neg = (d1 < 0) || (d2 < 0) || (d3 < 0);
					    var has_pos = (d1 > 0) || (d2 > 0) || (d3 > 0);
					
					    return !(has_neg && has_pos);
                    };
                    return mxVsdxUtils;
                }());
                mxVsdxUtils.screenCoordinatesPerCm = 40;
                mxVsdxUtils.CENTIMETERS_PER_INCHES = 2.54;
                vsdx.mxVsdxUtils = mxVsdxUtils;
                mxVsdxUtils["__class"] = "com.mxgraph.io.vsdx.mxVsdxUtils";
            })(vsdx = io.vsdx || (io.vsdx = {}));
        })(io = mxgraph.io || (mxgraph.io = {}));
    })(mxgraph = com.mxgraph || (com.mxgraph = {}));
})(com || (com = {}));
(function (com) {
    var mxgraph;
    (function (mxgraph) {
        var io;
        (function (io) {
            var vsdx;
            (function (vsdx) {
                /**
                 * Represents a single formatted section of text
                 * @param {string} val
                 * @param {string} ch
                 * @param {string} pg
                 * @param {string} field
                 * @class
                 */
                var Paragraph = (function () {
                    function Paragraph(val, ch, pg, field) {
                        this.values = null;
                        this.charIndices = null;
                        this.fields = null;
                        this.paraIndex = null;
                        this.values = ([]);
                        /* add */ (this.values.push(val));
                        this.charIndices = ([]);
                        /* add */ (this.charIndices.push(ch));
                        this.fields = ([]);
                        /* add */ (this.fields.push(field));
                        this.paraIndex = pg;
                    }
                    Paragraph.prototype.addText = function (val, ch, field) {
                        /* add */ (this.values.push(val));
                        /* add */ (this.charIndices.push(ch));
                        /* add */ (this.fields.push(field));
                    };
                    Paragraph.prototype.getParagraphIndex = function () {
                        return this.paraIndex;
                    };
                    Paragraph.prototype.getValue = function (index) {
                        return this.values[index];
                    };
                    Paragraph.prototype.numValues = function () {
                        return this.values.length;
                    };
                    Paragraph.prototype.getChar = function (index) {
                        return this.charIndices[index];
                    };
                    Paragraph.prototype.getField = function (index) {
                        return this.fields[index];
                    };
                    return Paragraph;
                }());
                vsdx.Paragraph = Paragraph;
                Paragraph["__class"] = "com.mxgraph.io.vsdx.Paragraph";
            })(vsdx = io.vsdx || (io.vsdx = {}));
        })(io = mxgraph.io || (mxgraph.io = {}));
    })(mxgraph = com.mxgraph || (com.mxgraph = {}));
})(com || (com = {}));
(function (com) {
    var mxgraph;
    (function (mxgraph) {
        var io;
        (function (io) {
            var vsdx;
            (function (vsdx) {
                /**
                 * Constructs a new Section
                 * @param {*} elem the Element to wrap
                 * @class
                 */
                var Section = (function () {
                    function Section(elem) {
                        /**
                         * The section element
                         */
                        this.elem = null;
                        this.elem = elem;
                    }
                    /**
                     * Return the specified cell by key by row index, if it exists
                     * @param {string} index the row index to search
                     * @param {string} cellKey the name of the Cell to search for
                     * @return {*} the Element of the specified Cell, if null if it doesn't exist
                     */
                    Section.prototype.getIndexedCell = function (index, cellKey) {
                        var rows = com.mxgraph.io.vsdx.mxVsdxUtils.getDirectChildNamedElements(this.elem, "Row");
                        for (var i = 0; i < rows.length; i++) {
                            var row = rows[i];
                            var n = row.getAttribute("IX");
                            if ((function (o1, o2) { if (o1 && o1.equals) {
                                return o1.equals(o2);
                            }
                            else {
                                return o1 === o2;
                            } })(n, index) || index == null) {
                                var cells = com.mxgraph.io.vsdx.mxVsdxUtils.getDirectChildNamedElements(row, "Cell");
                                for (var j = 0; j < cells.length; j++) {
                                    var cell = cells[j];
                                    n = cell.getAttribute("N");
                                    if ((function (o1, o2) { if (o1 && o1.equals) {
                                        return o1.equals(o2);
                                    }
                                    else {
                                        return o1 === o2;
                                    } })(n, cellKey)) {
                                        return cell;
                                    }
                                }
                                ;
                            }
                        }
                        ;
                        return null;
                    };
                    return Section;
                }());
                vsdx.Section = Section;
                Section["__class"] = "com.mxgraph.io.vsdx.Section";
            })(vsdx = io.vsdx || (io.vsdx = {}));
        })(io = mxgraph.io || (mxgraph.io = {}));
    })(mxgraph = com.mxgraph || (com.mxgraph = {}));
})(com || (com = {}));
(function (com) {
    var mxgraph;
    (function (mxgraph) {
        var io;
        (function (io) {
            var vsdx;
            (function (vsdx) {
                /**
                 * Wraps the page and shape ID within that page to create a unique ID
                 * @param {number} pageNumber
                 * @param {number} Id
                 * @class
                 */
                var ShapePageId = (function () {
                    function ShapePageId(pageNumber, Id) {
                        this.pageNumber = 0;
                        this.Id = 0;
                        this.pageNumber = pageNumber;
                        this.Id = Id;
                    }
                    ShapePageId.prototype.getId = function () {
                        return this.Id;
                    };
                    ShapePageId.prototype.getPageNumber = function () {
                        return this.pageNumber;
                    };
                    /**
                     *
                     * @param {*} obj
                     * @return {boolean}
                     */
                    ShapePageId.prototype.equals = function (obj) {
                        if (obj == null || this.constructor !== obj.constructor) {
                            return false;
                        }
                        var other = obj;
                        if (this.pageNumber !== other.pageNumber || this.Id !== other.Id) {
                            return false;
                        }
                        return true;
                    };
                    /**
                     *
                     * @return {number}
                     */
                    ShapePageId.prototype.hashCode = function () {
                        return 100000 * this.pageNumber + this.Id;
                    };
                    return ShapePageId;
                }());
                vsdx.ShapePageId = ShapePageId;
                ShapePageId["__class"] = "com.mxgraph.io.vsdx.ShapePageId";
            })(vsdx = io.vsdx || (io.vsdx = {}));
        })(io = mxgraph.io || (mxgraph.io = {}));
    })(mxgraph = com.mxgraph || (com.mxgraph = {}));
})(com || (com = {}));
(function (com) {
    var mxgraph;
    (function (mxgraph) {
        var io;
        (function (io) {
            var vsdx;
            (function (vsdx) {
                var theme;
                (function (theme) {
                    var Color = (function () {
                        function Color(red, green, blue) {
                            this.red = 0;
                            this.green = 0;
                            this.blue = 0;
                            this.gradientClr = null;
                            this.red = red;
                            this.green = green;
                            this.blue = blue;
                        }
                        Color.NONE_$LI$ = function () { if (Color.NONE == null)
                            Color.NONE = new Color(-1, -1, -1); return Color.NONE; };
                        ;
                        Color.prototype.getRed = function () {
                            return this.red;
                        };
                        Color.prototype.setRed = function (red) {
                            this.red = red;
                        };
                        Color.prototype.getGreen = function () {
                            return this.green;
                        };
                        Color.prototype.setGreen = function (green) {
                            this.green = green;
                        };
                        Color.prototype.getBlue = function () {
                            return this.blue;
                        };
                        Color.prototype.setBlue = function (blue) {
                            this.blue = blue;
                        };
                        Color.prototype.toHsl = function () {
                            var r = this.getRed() / 255.0;
                            var g = this.getGreen() / 255.0;
                            var b = this.getBlue() / 255.0;
                            var max = Math.max(r, Math.max(g, b));
                            var min = Math.min(r, Math.min(g, b));
                            var l = (max + min) / 2.0;
                            var h;
                            var s;
                            if (max === min) {
                                h = s = 0;
                            }
                            else {
                                var d = max - min;
                                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                                if (max === r) {
                                    h = (g - b) / d + (g < b ? 6 : 0);
                                }
                                else if (max === g) {
                                    h = (b - r) / d + 2;
                                }
                                else {
                                    h = (r - g) / d + 4;
                                }
                                h /= 6;
                            }
                            return new com.mxgraph.io.vsdx.theme.HSLColor(h, s, l);
                        };
                        Color.prototype.toHsv = function () {
                            var r = this.getRed() / 255.0;
                            var g = this.getGreen() / 255.0;
                            var b = this.getBlue() / 255.0;
                            var max = Math.max(r, Math.max(g, b));
                            var min = Math.min(r, Math.min(g, b));
                            var h;
                            var s;
                            var v = max;
                            var d = max - min;
                            s = max === 0 ? 0 : d / max;
                            if (max === min) {
                                h = 0;
                            }
                            else {
                                if (max === r) {
                                    h = (g - b) / d + (g < b ? 6 : 0);
                                }
                                else if (max === g) {
                                    h = (b - r) / d + 2;
                                }
                                else {
                                    h = (r - g) / d + 4;
                                }
                                h /= 6;
                            }
                            return new com.mxgraph.io.vsdx.theme.HSVColor(h, s, v);
                        };
                        Color.decodeColorHex = function (hex) {
                            var color = parseInt(hex, 16);
                            return new Color((color >> 16) & 255, (color >> 8) & 255, color & 255);
                        };
                        Color.prototype.toHexStr = function () {
                        	var r = this.red.toString(16);
                        	r = r.length == 1 ? '0' + r : r;
                        	var g = this.green.toString(16);
                        	g = g.length == 1 ? '0' + g : g;
                        	var b = this.blue.toString(16);
                        	b = b.length == 1 ? '0' + b : b;
                        	
                            return "#" + r + g + b;
                        };
                        Color.prototype.getGradientClr = function () {
                            return this.gradientClr;
                        };
                        Color.prototype.setGradientClr = function (gradientClr) {
                            this.gradientClr = gradientClr;
                        };
                        return Color;
                    }());
                    theme.Color = Color;
                    Color["__class"] = "com.mxgraph.io.vsdx.theme.Color";
                })(theme = vsdx.theme || (vsdx.theme = {}));
            })(vsdx = io.vsdx || (io.vsdx = {}));
        })(io = mxgraph.io || (mxgraph.io = {}));
    })(mxgraph = com.mxgraph || (com.mxgraph = {}));
})(com || (com = {}));
(function (com) {
    var mxgraph;
    (function (mxgraph) {
        var io;
        (function (io) {
            var vsdx;
            (function (vsdx) {
                var theme;
                (function (theme) {
                    var FillStyleFactory = (function () {
                        function FillStyleFactory() {
                        }
                        FillStyleFactory.getFillStyle = function (fillStyle) {
                            var fillObj = null;
                            switch ((fillStyle.nodeName)) {
                                case "a:solidFill":
                                    fillObj = new com.mxgraph.io.vsdx.theme.SolidFillStyle(com.mxgraph.io.vsdx.theme.OoxmlColorFactory.getOoxmlColor(com.mxgraph.io.vsdx.mxVsdxUtils.getDirectFirstChildElement(fillStyle)));
                                    break;
                                case "a:noFill":
                                    fillObj = new com.mxgraph.io.vsdx.theme.NoFillStyle();
                                    break;
                                case "a:gradFill":
                                    fillObj = new com.mxgraph.io.vsdx.theme.GradFill(fillStyle);
                                    break;
                                case "a:blipFill":
                                    break;
                                case "a:pattFill":
                                    break;
                                case "a:grpFill":
                                    break;
                            }
                            return fillObj;
                        };
                        return FillStyleFactory;
                    }());
                    theme.FillStyleFactory = FillStyleFactory;
                    FillStyleFactory["__class"] = "com.mxgraph.io.vsdx.theme.FillStyleFactory";
                })(theme = vsdx.theme || (vsdx.theme = {}));
            })(vsdx = io.vsdx || (io.vsdx = {}));
        })(io = mxgraph.io || (mxgraph.io = {}));
    })(mxgraph = com.mxgraph || (com.mxgraph = {}));
})(com || (com = {}));
(function (com) {
    var mxgraph;
    (function (mxgraph) {
        var io;
        (function (io) {
            var vsdx;
            (function (vsdx) {
                var theme;
                (function (theme_2) {
                    var GradFill = (function () {
                        function GradFill(elem) {
                            /*private*/ this.color1 = null;
                            /*private*/ this.color2 = null;
                            var gsLst = com.mxgraph.io.vsdx.mxVsdxUtils.getDirectChildNamedElements(elem, "a:gsLst");
                            if (gsLst.length > 0) {
                                var gs = com.mxgraph.io.vsdx.mxVsdxUtils.getDirectChildElements(/* get */ gsLst[0]);
                                if (gs.length >= 2) {
                                    this.color2 = com.mxgraph.io.vsdx.theme.OoxmlColorFactory.getOoxmlColor(com.mxgraph.io.vsdx.mxVsdxUtils.getDirectFirstChildElement(/* get */ gs[0]));
                                    this.color1 = com.mxgraph.io.vsdx.theme.OoxmlColorFactory.getOoxmlColor(com.mxgraph.io.vsdx.mxVsdxUtils.getDirectFirstChildElement(/* get */ gs[gs.length - 1]));
                                }
                            }
                            if (this.color1 == null) {
                                this.color1 = this.color2 = new com.mxgraph.io.vsdx.theme.SrgbClr("FFFFFF");
                            }
                        }
                        /**
                         *
                         * @param {number} styleValue
                         * @param {com.mxgraph.io.vsdx.mxVsdxTheme} theme
                         * @return {com.mxgraph.io.vsdx.theme.Color}
                         */
                        GradFill.prototype.applyStyle = function (styleValue, theme) {
                            var color = this.color1.getColor$int$com_mxgraph_io_vsdx_mxVsdxTheme(styleValue, theme);
                            color.setGradientClr(this.color2.getColor$int$com_mxgraph_io_vsdx_mxVsdxTheme(styleValue, theme));
                            return color;
                        };
                        return GradFill;
                    }());
                    theme_2.GradFill = GradFill;
                    GradFill["__class"] = "com.mxgraph.io.vsdx.theme.GradFill";
                    GradFill["__interfaces"] = ["com.mxgraph.io.vsdx.theme.FillStyle"];
                })(theme = vsdx.theme || (vsdx.theme = {}));
            })(vsdx = io.vsdx || (io.vsdx = {}));
        })(io = mxgraph.io || (mxgraph.io = {}));
    })(mxgraph = com.mxgraph || (com.mxgraph = {}));
})(com || (com = {}));
(function (com) {
    var mxgraph;
    (function (mxgraph) {
        var io;
        (function (io) {
            var vsdx;
            (function (vsdx) {
                var theme;
                (function (theme) {
                    var HSLColor = (function () {
                        function HSLColor(hue, sat, lum) {
                            this.hue = 0;
                            this.sat = 0;
                            this.lum = 0;
                            this.hue = hue;
                            this.sat = sat;
                            this.lum = lum;
                        }
                        HSLColor.prototype.getHue = function () {
                            return this.hue;
                        };
                        HSLColor.prototype.setHue = function (hue) {
                            this.hue = hue;
                        };
                        HSLColor.prototype.getSat = function () {
                            return this.sat;
                        };
                        HSLColor.prototype.setSat = function (sat) {
                            this.sat = sat;
                        };
                        HSLColor.prototype.getLum = function () {
                            return this.lum;
                        };
                        HSLColor.prototype.setLum = function (lum) {
                            this.lum = lum;
                        };
                        /*private*/ HSLColor.prototype.hue2rgb = function (p, q, t) {
                            if (t < 0)
                                t += 1;
                            if (t > 1)
                                t -= 1;
                            if (t < 1 / 6.0)
                                return p + (q - p) * 6 * t;
                            if (t < 0.5)
                                return q;
                            if (t < 2 / 3.0)
                                return p + (q - p) * (2 / 3.0 - t) * 6;
                            return p;
                        };
                        HSLColor.prototype.toRgb = function () {
                            var r;
                            var g;
                            var b;
                            var h = this.hue;
                            var s = this.sat;
                            var l = this.lum;
                            if (s === 0) {
                                r = g = b = l;
                            }
                            else {
                                var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                                var p = 2 * l - q;
                                r = this.hue2rgb(p, q, h + 1 / 3.0);
                                g = this.hue2rgb(p, q, h);
                                b = this.hue2rgb(p, q, h - 1 / 3.0);
                            }
                            return new com.mxgraph.io.vsdx.theme.Color(((r * 255) | 0), ((g * 255) | 0), ((b * 255) | 0));
                        };
                        /*private*/ HSLColor.prototype.clamp01 = function (val) {
                            return Math.min(1, Math.max(0, val));
                        };
                        HSLColor.prototype.tint = function (amount) {
                            this.lum *= (1 + (amount / 100.0));
                            this.lum = this.clamp01(this.lum);
                            return this;
                        };
                        HSLColor.prototype.shade = function (amount) {
                            this.lum *= amount / 100.0;
                            this.lum = this.clamp01(this.lum);
                            return this;
                        };
                        HSLColor.prototype.satMod = function (amount) {
                            this.sat *= amount / 100.0;
                            this.sat = this.clamp01(this.sat);
                            return this;
                        };
                        HSLColor.prototype.lumMod = function (amount) {
                            this.lum *= amount / 100.0;
                            this.lum = this.clamp01(this.lum);
                            return this;
                        };
                        return HSLColor;
                    }());
                    theme.HSLColor = HSLColor;
                    HSLColor["__class"] = "com.mxgraph.io.vsdx.theme.HSLColor";
                })(theme = vsdx.theme || (vsdx.theme = {}));
            })(vsdx = io.vsdx || (io.vsdx = {}));
        })(io = mxgraph.io || (mxgraph.io = {}));
    })(mxgraph = com.mxgraph || (com.mxgraph = {}));
})(com || (com = {}));
(function (com) {
    var mxgraph;
    (function (mxgraph) {
        var io;
        (function (io) {
            var vsdx;
            (function (vsdx) {
                var theme;
                (function (theme) {
                    var HSVColor = (function () {
                        function HSVColor(h, s, v) {
                            this.h = 0;
                            this.s = 0;
                            this.v = 0;
                            this.h = h;
                            this.s = s;
                            this.v = v;
                        }
                        HSVColor.prototype.toRgb = function () {
                            var h = this.h * 6;
                            var s = this.s;
                            var l = this.v;
                            var i = Math.floor(h);
                            var f = h - i;
                            var p = this.v * (1 - s);
                            var q = this.v * (1 - f * s);
                            var t = this.v * (1 - (1 - f) * s);
                            var mod = (i | 0) % 6;
                            var rArr = [this.v, q, p, p, t, this.v];
                            var gArr = [t, this.v, this.v, q, p, p];
                            var bArr = [p, p, t, this.v, this.v, q];
                            var r = rArr[mod];
                            var g = gArr[mod];
                            var b = bArr[mod];
                            return new com.mxgraph.io.vsdx.theme.Color(((r * 255) | 0), ((g * 255) | 0), ((b * 255) | 0));
                        };
                        /*private*/ HSVColor.prototype.clamp01 = function (val) {
                            return Math.min(1, Math.max(0, val));
                        };
                        HSVColor.prototype.tint = function (amount) {
                            this.v *= (1 + (amount / 100.0));
                            this.v = this.clamp01(this.v);
                            return this;
                        };
                        HSVColor.prototype.shade = function (amount) {
                            this.v *= amount / 100.0;
                            this.v = this.clamp01(this.v);
                            return this;
                        };
                        HSVColor.prototype.satMod = function (amount) {
                            this.s *= amount / 100.0;
                            this.s = this.clamp01(this.s);
                            return this;
                        };
                        HSVColor.prototype.lumMod = function (amount) {
                            this.v *= amount / 100.0;
                            this.v = this.clamp01(this.v);
                            return this;
                        };
                        HSVColor.prototype.hueMod = function (amount) {
                            this.h *= amount / 100.0;
                            this.h = this.clamp01(this.h);
                            return this;
                        };
                        return HSVColor;
                    }());
                    theme.HSVColor = HSVColor;
                    HSVColor["__class"] = "com.mxgraph.io.vsdx.theme.HSVColor";
                })(theme = vsdx.theme || (vsdx.theme = {}));
            })(vsdx = io.vsdx || (io.vsdx = {}));
        })(io = mxgraph.io || (mxgraph.io = {}));
    })(mxgraph = com.mxgraph || (com.mxgraph = {}));
})(com || (com = {}));
(function (com) {
    var mxgraph;
    (function (mxgraph) {
        var io;
        (function (io) {
            var vsdx;
            (function (vsdx) {
                var theme;
                (function (theme_3) {
                    var LineStyle = (function () {
                        function LineStyle(elem) {
                            var _this = this;
                            /*private*/ this.isLineDashed = false;
                            /*private*/ this.lineDashPattern = ([]);
                            /*private*/ this.isRoundJoin = false;
                            /*private*/ this.isBevelJoin = false;
                            /*private*/ this.isMiterJoin = false;
                            if (((elem != null && (elem.nodeType == 1)) || elem === null)) {
                                var __args = Array.prototype.slice.call(arguments);
                                this.lineWidth = 0;
                                this.lineCap = null;
                                this.lineComp = null;
                                this.fillStyle = null;
                                this.headEndType = null;
                                this.headEndWidth = 0;
                                this.headEndLen = 0;
                                this.tailEndType = null;
                                this.tailEndWidth = 0;
                                this.tailEndLen = 0;
                                this.isLineDashed = false;
                                this.lineDashPattern = ([]);
                                this.isRoundJoin = false;
                                this.isBevelJoin = false;
                                this.isMiterJoin = false;
                                this.lineWidth = 0;
                                this.lineCap = null;
                                this.lineComp = null;
                                this.fillStyle = null;
                                this.headEndType = null;
                                this.headEndWidth = 0;
                                this.headEndLen = 0;
                                this.tailEndType = null;
                                this.tailEndWidth = 0;
                                this.tailEndLen = 0;
                                (function () {
                                    _this.lineWidth = com.mxgraph.io.vsdx.mxVsdxUtils.getIntAttr$org_w3c_dom_Element$java_lang_String(elem, "w");
                                    var lineCapAtt = elem.getAttribute("cap");
                                    if (lineCapAtt != null) {
                                        switch ((lineCapAtt)) {
                                            case "rnd":
                                                _this.lineCap = LineStyle.LineCapType.ROUND;
                                                break;
                                            case "sq":
                                                _this.lineCap = LineStyle.LineCapType.SQUARE;
                                                break;
                                            case "flat":
                                                _this.lineCap = LineStyle.LineCapType.FLAT;
                                                break;
                                        }
                                    }
                                    var lineCompAtt = elem.getAttribute("cmpd");
                                    if (lineCompAtt != null) {
                                        switch ((lineCompAtt)) {
                                            case "sng":
                                                _this.lineComp = LineStyle.CompoundLineType.SINGLE;
                                                break;
                                            case "dbl":
                                                _this.lineComp = LineStyle.CompoundLineType.DOUBLE;
                                                break;
                                            case "thickThin":
                                                _this.lineComp = LineStyle.CompoundLineType.THICK_THIN_DOUBLE;
                                                break;
                                            case "thinThick":
                                                _this.lineComp = LineStyle.CompoundLineType.THIN_THICK_DOUBLE;
                                                break;
                                            case "tri":
                                                _this.lineComp = LineStyle.CompoundLineType.THIN_THICK_THIN_TRIPLE;
                                                break;
                                        }
                                    }
                                    var subElems = com.mxgraph.io.vsdx.mxVsdxUtils.getDirectChildElements(elem);
                                    for (var index153 = 0; index153 < subElems.length; index153++) {
                                        var subElem = subElems[index153];
                                        {
                                            var name_8 = subElem.nodeName;
                                            switch ((name_8)) {
                                                case "a:noFill":
                                                case "a:solidFill":
                                                case "a:gradFill":
                                                case "a:pattFill":
                                                    _this.fillStyle = com.mxgraph.io.vsdx.theme.FillStyleFactory.getFillStyle(subElem);
                                                    break;
                                                case "a:prstDash":
                                                    var val = subElem.getAttribute("val");
                                                    _this.isLineDashed = true;
                                                    switch ((val)) {
                                                        case "solid":
                                                            _this.isLineDashed = false;
                                                            break;
                                                        case "sysDot":
                                                        case "dot":
                                                            /* add */ (_this.lineDashPattern.push(1.0));
                                                            /* add */ (_this.lineDashPattern.push(4.0));
                                                            break;
                                                        case "sysDash":
                                                        case "dash":
                                                            break;
                                                        case "lgDash":
                                                            /* add */ (_this.lineDashPattern.push(12.0));
                                                            /* add */ (_this.lineDashPattern.push(4.0));
                                                            break;
                                                        case "sysDashDot":
                                                        case "dashDot":
                                                            /* add */ (_this.lineDashPattern.push(8.0));
                                                            /* add */ (_this.lineDashPattern.push(4.0));
                                                            /* add */ (_this.lineDashPattern.push(1.0));
                                                            /* add */ (_this.lineDashPattern.push(4.0));
                                                            break;
                                                        case "lgDashDot":
                                                            /* add */ (_this.lineDashPattern.push(12.0));
                                                            /* add */ (_this.lineDashPattern.push(4.0));
                                                            /* add */ (_this.lineDashPattern.push(1.0));
                                                            /* add */ (_this.lineDashPattern.push(4.0));
                                                            break;
                                                        case "sysDashDotDot":
                                                        case "lgDashDotDot":
                                                            /* add */ (_this.lineDashPattern.push(12.0));
                                                            /* add */ (_this.lineDashPattern.push(4.0));
                                                            /* add */ (_this.lineDashPattern.push(1.0));
                                                            /* add */ (_this.lineDashPattern.push(4.0));
                                                            /* add */ (_this.lineDashPattern.push(1.0));
                                                            /* add */ (_this.lineDashPattern.push(4.0));
                                                            break;
                                                    }
                                                    break;
                                                case "a:custDash":
                                                    _this.isLineDashed = true;
                                                    var dsElems = com.mxgraph.io.vsdx.mxVsdxUtils.getDirectChildNamedElements(subElem, "a:ds");
                                                    for (var index154 = 0; index154 < dsElems.length; index154++) {
                                                        var dsElem = dsElems[index154];
                                                        {
                                                            var dashLen = com.mxgraph.io.vsdx.mxVsdxUtils.getIntAttr$org_w3c_dom_Element$java_lang_String(dsElem, "d");
                                                            var spaceLen = com.mxgraph.io.vsdx.mxVsdxUtils.getIntAttr$org_w3c_dom_Element$java_lang_String(dsElem, "sp");
                                                            /* add */ (_this.lineDashPattern.push(dashLen / 10000.0));
                                                            /* add */ (_this.lineDashPattern.push(spaceLen / 10000.0));
                                                        }
                                                    }
                                                    break;
                                                case "a:round":
                                                    _this.isRoundJoin = true;
                                                    break;
                                                case "a:bevel":
                                                    _this.isBevelJoin = true;
                                                    break;
                                                case "a:miter":
                                                    var limit = com.mxgraph.io.vsdx.mxVsdxUtils.getIntAttr$org_w3c_dom_Element$java_lang_String(subElem, "lim");
                                                    _this.isMiterJoin = true;
                                                    break;
                                                case "a:headEnd":
                                                    _this.headEndType = _this.getLineEndType(subElem);
                                                    _this.headEndWidth = com.mxgraph.io.vsdx.mxVsdxUtils.getIntAttr$org_w3c_dom_Element$java_lang_String(subElem, "w");
                                                    _this.headEndLen = com.mxgraph.io.vsdx.mxVsdxUtils.getIntAttr$org_w3c_dom_Element$java_lang_String(subElem, "len");
                                                    break;
                                                case "a:tailEnd":
                                                    _this.tailEndType = _this.getLineEndType(subElem);
                                                    _this.tailEndWidth = com.mxgraph.io.vsdx.mxVsdxUtils.getIntAttr$org_w3c_dom_Element$java_lang_String(subElem, "w");
                                                    _this.tailEndLen = com.mxgraph.io.vsdx.mxVsdxUtils.getIntAttr$org_w3c_dom_Element$java_lang_String(subElem, "len");
                                                    break;
                                                case "a:extLst":
                                                    break;
                                            }
                                        }
                                    }
                                })();
                            }
                            else if (elem === undefined) {
                                var __args = Array.prototype.slice.call(arguments);
                                this.lineWidth = 0;
                                this.lineCap = null;
                                this.lineComp = null;
                                this.fillStyle = null;
                                this.headEndType = null;
                                this.headEndWidth = 0;
                                this.headEndLen = 0;
                                this.tailEndType = null;
                                this.tailEndWidth = 0;
                                this.tailEndLen = 0;
                                this.isLineDashed = false;
                                this.lineDashPattern = ([]);
                                this.isRoundJoin = false;
                                this.isBevelJoin = false;
                                this.isMiterJoin = false;
                                this.lineWidth = 0;
                                this.lineCap = null;
                                this.lineComp = null;
                                this.fillStyle = null;
                                this.headEndType = null;
                                this.headEndWidth = 0;
                                this.headEndLen = 0;
                                this.tailEndType = null;
                                this.tailEndWidth = 0;
                                this.tailEndLen = 0;
                            }
                            else
                                throw new Error('invalid overload');
                        }
                        LineStyle.prototype.getLineEndType = function (subElem) {
                            var type = subElem.getAttribute("type");
                            var endType = null;
                            switch ((type)) {
                                case "none":
                                    endType = LineStyle.LineEndType.NONE;
                                    break;
                                case "triangle":
                                    endType = LineStyle.LineEndType.TRIANGLE;
                                    break;
                                case "stealth":
                                    endType = LineStyle.LineEndType.STEALTH;
                                    break;
                                case "diamond":
                                    endType = LineStyle.LineEndType.DIAMOND;
                                    break;
                                case "oval":
                                    endType = LineStyle.LineEndType.OVAL;
                                    break;
                                case "arrow":
                                    endType = LineStyle.LineEndType.ARROW;
                                    break;
                            }
                            return endType;
                        };
                        LineStyle.prototype.getLineColor = function (lineColorStyle, theme) {
                            if (this.fillStyle != null)
                                return this.fillStyle.applyStyle(lineColorStyle, theme);
                            else
                                return theme.getDefaultLineClr();
                        };
                        LineStyle.prototype.isDashed = function () {
                            return this.isLineDashed;
                        };
                        LineStyle.prototype.getLineDashPattern = function () {
                            return this.lineDashPattern;
                        };
                        LineStyle.prototype.getStartSize = function () {
                            return 4;
                        };
                        LineStyle.prototype.getEndSize = function () {
                            return 4;
                        };
                        LineStyle.prototype.getStart = function () {
                            return 0;
                        };
                        LineStyle.prototype.getEnd = function () {
                            return 0;
                        };
                        LineStyle.prototype.getLineWidth = function () {
                            return this.lineWidth;
                        };
                        return LineStyle;
                    }());
                    theme_3.LineStyle = LineStyle;
                    LineStyle["__class"] = "com.mxgraph.io.vsdx.theme.LineStyle";
                    (function (LineStyle) {
                        var LineCapType;
                        (function (LineCapType) {
                            LineCapType[LineCapType["ROUND"] = 0] = "ROUND";
                            LineCapType[LineCapType["SQUARE"] = 1] = "SQUARE";
                            LineCapType[LineCapType["FLAT"] = 2] = "FLAT";
                        })(LineCapType = LineStyle.LineCapType || (LineStyle.LineCapType = {}));
                        var CompoundLineType;
                        (function (CompoundLineType) {
                            CompoundLineType[CompoundLineType["SINGLE"] = 0] = "SINGLE";
                            CompoundLineType[CompoundLineType["DOUBLE"] = 1] = "DOUBLE";
                            CompoundLineType[CompoundLineType["THICK_THIN_DOUBLE"] = 2] = "THICK_THIN_DOUBLE";
                            CompoundLineType[CompoundLineType["THIN_THICK_DOUBLE"] = 3] = "THIN_THICK_DOUBLE";
                            CompoundLineType[CompoundLineType["THIN_THICK_THIN_TRIPLE"] = 4] = "THIN_THICK_THIN_TRIPLE";
                        })(CompoundLineType = LineStyle.CompoundLineType || (LineStyle.CompoundLineType = {}));
                        var LineEndType;
                        (function (LineEndType) {
                            LineEndType[LineEndType["NONE"] = 0] = "NONE";
                            LineEndType[LineEndType["TRIANGLE"] = 1] = "TRIANGLE";
                            LineEndType[LineEndType["STEALTH"] = 2] = "STEALTH";
                            LineEndType[LineEndType["DIAMOND"] = 3] = "DIAMOND";
                            LineEndType[LineEndType["OVAL"] = 4] = "OVAL";
                            LineEndType[LineEndType["ARROW"] = 5] = "ARROW";
                        })(LineEndType = LineStyle.LineEndType || (LineStyle.LineEndType = {}));
                    })(LineStyle = theme_3.LineStyle || (theme_3.LineStyle = {}));
                })(theme = vsdx.theme || (vsdx.theme = {}));
            })(vsdx = io.vsdx || (io.vsdx = {}));
        })(io = mxgraph.io || (mxgraph.io = {}));
    })(mxgraph = com.mxgraph || (com.mxgraph = {}));
})(com || (com = {}));
(function (com) {
    var mxgraph;
    (function (mxgraph) {
        var io;
        (function (io) {
            var vsdx;
            (function (vsdx) {
                var theme;
                (function (theme) {
                    var LineStyleExt = (function () {
                        function LineStyleExt(elem) {
                            /*private*/ this.rndg = 0;
                            /*private*/ this.start = 0;
                            /*private*/ this.startSize = 0;
                            /*private*/ this.end = 0;
                            /*private*/ this.endSize = 0;
                            /*private*/ this.pattern = 0;
                            this.lineDashPattern = null;
                            var lineEx = com.mxgraph.io.vsdx.mxVsdxUtils.getDirectFirstChildElement(elem);
                            this.rndg = com.mxgraph.io.vsdx.mxVsdxUtils.getIntAttr$org_w3c_dom_Element$java_lang_String(lineEx, "rndg");
                            this.start = com.mxgraph.io.vsdx.mxVsdxUtils.getIntAttr$org_w3c_dom_Element$java_lang_String(lineEx, "start");
                            this.startSize = com.mxgraph.io.vsdx.mxVsdxUtils.getIntAttr$org_w3c_dom_Element$java_lang_String(lineEx, "startSize");
                            this.end = com.mxgraph.io.vsdx.mxVsdxUtils.getIntAttr$org_w3c_dom_Element$java_lang_String(lineEx, "end");
                            this.endSize = com.mxgraph.io.vsdx.mxVsdxUtils.getIntAttr$org_w3c_dom_Element$java_lang_String(lineEx, "endSize");
                            this.pattern = com.mxgraph.io.vsdx.mxVsdxUtils.getIntAttr$org_w3c_dom_Element$java_lang_String(lineEx, "pattern");
                            this.lineDashPattern = com.mxgraph.io.vsdx.Style.getLineDashPattern(this.pattern);
                        }
                        LineStyleExt.prototype.getRndg = function () {
                            return this.rndg;
                        };
                        LineStyleExt.prototype.getStart = function () {
                            return this.start;
                        };
                        LineStyleExt.prototype.getStartSize = function () {
                            return this.startSize;
                        };
                        LineStyleExt.prototype.getEnd = function () {
                            return this.end;
                        };
                        LineStyleExt.prototype.getEndSize = function () {
                            return this.endSize;
                        };
                        LineStyleExt.prototype.isDashed = function () {
                            return this.pattern > 1;
                        };
                        LineStyleExt.prototype.getLineDashPattern = function () {
                            return this.lineDashPattern;
                        };
                        return LineStyleExt;
                    }());
                    theme.LineStyleExt = LineStyleExt;
                    LineStyleExt["__class"] = "com.mxgraph.io.vsdx.theme.LineStyleExt";
                })(theme = vsdx.theme || (vsdx.theme = {}));
            })(vsdx = io.vsdx || (io.vsdx = {}));
        })(io = mxgraph.io || (mxgraph.io = {}));
    })(mxgraph = com.mxgraph || (com.mxgraph = {}));
})(com || (com = {}));
(function (com) {
    var mxgraph;
    (function (mxgraph) {
        var io;
        (function (io) {
            var vsdx;
            (function (vsdx) {
                var theme;
                (function (theme_4) {
                    var NoFillStyle = (function () {
                        function NoFillStyle() {
                        }
                        /**
                         *
                         * @param {number} styleValue
                         * @param {com.mxgraph.io.vsdx.mxVsdxTheme} theme
                         * @return {com.mxgraph.io.vsdx.theme.Color}
                         */
                        NoFillStyle.prototype.applyStyle = function (styleValue, theme) {
                            return com.mxgraph.io.vsdx.theme.Color.NONE_$LI$();
                        };
                        return NoFillStyle;
                    }());
                    theme_4.NoFillStyle = NoFillStyle;
                    NoFillStyle["__class"] = "com.mxgraph.io.vsdx.theme.NoFillStyle";
                    NoFillStyle["__interfaces"] = ["com.mxgraph.io.vsdx.theme.FillStyle"];
                })(theme = vsdx.theme || (vsdx.theme = {}));
            })(vsdx = io.vsdx || (io.vsdx = {}));
        })(io = mxgraph.io || (mxgraph.io = {}));
    })(mxgraph = com.mxgraph || (com.mxgraph = {}));
})(com || (com = {}));
(function (com) {
    var mxgraph;
    (function (mxgraph) {
        var io;
        (function (io) {
            var vsdx;
            (function (vsdx) {
                var theme;
                (function (theme_5) {
                    var OoxmlColor = (function () {
                        function OoxmlColor() {
                            /*private*/ this.tint = 0;
                            /*private*/ this.shade = 0;
                            /*private*/ this.comp = 0;
                            /*private*/ this.inv = 0;
                            /*private*/ this.gray = 0;
                            /*private*/ this.alpha = 0;
                            /*private*/ this.alphaOff = 0;
                            /*private*/ this.alphaMod = 0;
                            /*private*/ this.hue = 0;
                            /*private*/ this.hueOff = 0;
                            /*private*/ this.hueMod = 0;
                            /*private*/ this.sat = 0;
                            /*private*/ this.satOff = 0;
                            /*private*/ this.satMod = 0;
                            /*private*/ this.lum = 0;
                            /*private*/ this.lumOff = 0;
                            /*private*/ this.lumMod = 0;
                            /*private*/ this.red = 0;
                            /*private*/ this.redOff = 0;
                            /*private*/ this.redMod = 0;
                            /*private*/ this.green = 0;
                            /*private*/ this.greenOff = 0;
                            /*private*/ this.greenMod = 0;
                            /*private*/ this.blue = 0;
                            /*private*/ this.blueOff = 0;
                            /*private*/ this.blueMod = 0;
                            /*private*/ this.gamma = 0;
                            /*private*/ this.invGamma = 0;
                            this.isDynamic = false;
                            this.isInitialized = false;
                            this.hasEffects = false;
                            this.color = null;
                        }
                        OoxmlColor.prototype.calcColor = function (styleColor, theme) {
                            if (this.hasEffects) {
                                var hsvColor = this.color.toHsv();
                                if (this.tint !== 0) {
                                    hsvColor.tint(this.tint);
                                }
                                if (this.shade !== 0) {
                                    hsvColor.shade(this.shade);
                                }
                                if (this.satMod !== 0) {
                                    hsvColor.satMod(this.satMod);
                                }
                                if (this.lumMod !== 0) {
                                    hsvColor.lumMod(this.lumMod);
                                }
                                if (this.hueMod !== 0) {
                                    hsvColor.hueMod(this.hueMod);
                                }
                                this.color = hsvColor.toRgb();
                            }
                        };
                        OoxmlColor.prototype.getColor$int$com_mxgraph_io_vsdx_mxVsdxTheme = function (styleColor, theme) {
                            if (this.isDynamic || !this.isInitialized) {
                                this.calcColor(styleColor, theme);
                                this.isInitialized = true;
                            }
                            return this.color;
                        };
                        OoxmlColor.prototype.getColor = function (styleColor, theme) {
                            if (((typeof styleColor === 'number') || styleColor === null) && ((theme != null && theme instanceof com.mxgraph.io.vsdx.mxVsdxTheme) || theme === null)) {
                                return this.getColor$int$com_mxgraph_io_vsdx_mxVsdxTheme(styleColor, theme);
                            }
                            else if (((styleColor != null && styleColor instanceof com.mxgraph.io.vsdx.mxVsdxTheme) || styleColor === null) && theme === undefined) {
                                return this.getColor$com_mxgraph_io_vsdx_mxVsdxTheme(styleColor);
                            }
                            else
                                throw new Error('invalid overload');
                        };
                        OoxmlColor.prototype.getColor$com_mxgraph_io_vsdx_mxVsdxTheme = function (theme) {
                            return this.getColor$int$com_mxgraph_io_vsdx_mxVsdxTheme(-1, theme);
                        };
                        OoxmlColor.prototype.setTint = function (tint) {
                            this.tint = tint;
                            this.hasEffects = true;
                        };
                        OoxmlColor.prototype.setShade = function (shade) {
                            this.shade = shade;
                            this.hasEffects = true;
                        };
                        OoxmlColor.prototype.setComp = function (comp) {
                            this.comp = comp;
                            this.hasEffects = true;
                        };
                        OoxmlColor.prototype.setInv = function (inv) {
                            this.inv = inv;
                            this.hasEffects = true;
                        };
                        OoxmlColor.prototype.setGray = function (gray) {
                            this.gray = gray;
                            this.hasEffects = true;
                        };
                        OoxmlColor.prototype.setAlpha = function (alpha) {
                            this.alpha = alpha;
                            this.hasEffects = true;
                        };
                        OoxmlColor.prototype.setAlphaOff = function (alphaOff) {
                            this.alphaOff = alphaOff;
                            this.hasEffects = true;
                        };
                        OoxmlColor.prototype.setAlphaMod = function (alphaMod) {
                            this.alphaMod = alphaMod;
                            this.hasEffects = true;
                        };
                        OoxmlColor.prototype.setHue = function (hue) {
                            this.hue = hue;
                            this.hasEffects = true;
                        };
                        OoxmlColor.prototype.setHueOff = function (hueOff) {
                            this.hueOff = hueOff;
                            this.hasEffects = true;
                        };
                        OoxmlColor.prototype.setHueMod = function (hueMod) {
                            this.hueMod = hueMod;
                            this.hasEffects = true;
                        };
                        OoxmlColor.prototype.setSat = function (sat) {
                            this.sat = sat;
                            this.hasEffects = true;
                        };
                        OoxmlColor.prototype.setSatOff = function (satOff) {
                            this.satOff = satOff;
                            this.hasEffects = true;
                        };
                        OoxmlColor.prototype.setSatMod = function (satMod) {
                            this.satMod = satMod;
                            this.hasEffects = true;
                        };
                        OoxmlColor.prototype.setLum = function (lum) {
                            this.lum = lum;
                            this.hasEffects = true;
                        };
                        OoxmlColor.prototype.setLumOff = function (lumOff) {
                            this.lumOff = lumOff;
                            this.hasEffects = true;
                        };
                        OoxmlColor.prototype.setLumMod = function (lumMod) {
                            this.lumMod = lumMod;
                            this.hasEffects = true;
                        };
                        OoxmlColor.prototype.setRed = function (red) {
                            this.red = red;
                            this.hasEffects = true;
                        };
                        OoxmlColor.prototype.setRedOff = function (redOff) {
                            this.redOff = redOff;
                            this.hasEffects = true;
                        };
                        OoxmlColor.prototype.setRedMod = function (redMod) {
                            this.redMod = redMod;
                            this.hasEffects = true;
                        };
                        OoxmlColor.prototype.setGreen = function (green) {
                            this.green = green;
                            this.hasEffects = true;
                        };
                        OoxmlColor.prototype.setGreenOff = function (greenOff) {
                            this.greenOff = greenOff;
                            this.hasEffects = true;
                        };
                        OoxmlColor.prototype.setGreenMod = function (greenMod) {
                            this.greenMod = greenMod;
                            this.hasEffects = true;
                        };
                        OoxmlColor.prototype.setBlue = function (blue) {
                            this.blue = blue;
                            this.hasEffects = true;
                        };
                        OoxmlColor.prototype.setBlueOff = function (blueOff) {
                            this.blueOff = blueOff;
                            this.hasEffects = true;
                        };
                        OoxmlColor.prototype.setBlueMod = function (blueMod) {
                            this.blueMod = blueMod;
                            this.hasEffects = true;
                        };
                        OoxmlColor.prototype.setGamma = function (gamma) {
                            this.gamma = gamma;
                            this.hasEffects = true;
                        };
                        OoxmlColor.prototype.setInvGamma = function (invGamma) {
                            this.invGamma = invGamma;
                            this.hasEffects = true;
                        };
                        return OoxmlColor;
                    }());
                    theme_5.OoxmlColor = OoxmlColor;
                    OoxmlColor["__class"] = "com.mxgraph.io.vsdx.theme.OoxmlColor";
                })(theme = vsdx.theme || (vsdx.theme = {}));
            })(vsdx = io.vsdx || (io.vsdx = {}));
        })(io = mxgraph.io || (mxgraph.io = {}));
    })(mxgraph = com.mxgraph || (com.mxgraph = {}));
})(com || (com = {}));
(function (com) {
    var mxgraph;
    (function (mxgraph) {
        var io;
        (function (io) {
            var vsdx;
            (function (vsdx) {
                var theme;
                (function (theme) {
                    var OoxmlColorFactory = (function () {
                        function OoxmlColorFactory() {
                        }
                        OoxmlColorFactory.getOoxmlColor = function (element) {
                            var color = null;
                            var nodeName = element.nodeName;
                            switch ((nodeName)) {
                                case "a:scrgbClr":
                                    color = new com.mxgraph.io.vsdx.theme.ScrgbClr(/* parseInt */ parseInt(element.getAttribute("r")), /* parseInt */ parseInt(element.getAttribute("g")), /* parseInt */ parseInt(element.getAttribute("b")));
                                    break;
                                case "a:srgbClr":
                                    color = new com.mxgraph.io.vsdx.theme.SrgbClr(element.getAttribute("val"));
                                    break;
                                case "a:hslClr":
                                    color = new com.mxgraph.io.vsdx.theme.HslClr(/* parseInt */ parseInt(element.getAttribute("hue")), /* parseInt */ parseInt(element.getAttribute("sat")), /* parseInt */ parseInt(element.getAttribute("lum")));
                                    break;
                                case "a:sysClr":
                                    color = new com.mxgraph.io.vsdx.theme.SysClr(element.getAttribute("val"), element.getAttribute("lastClr"));
                                    break;
                                case "a:schemeClr":
                                    color = new com.mxgraph.io.vsdx.theme.SchemeClr(element.getAttribute("val"));
                                    break;
                                case "a:prstClr":
                                    color = new com.mxgraph.io.vsdx.theme.SrgbClr(element.getAttribute("val"));
                                    break;
                            }
                            var effects = com.mxgraph.io.vsdx.mxVsdxUtils.getDirectChildElements(element);
                            for (var index155 = 0; index155 < effects.length; index155++) {
                                var effect = effects[index155];
                                {
                                    var effVal = (parseInt(effect.getAttribute("val")) / 1000 | 0);
                                    var effName = effect.nodeName;
                                    switch ((effName)) {
                                        case "a:tint":
                                            color.setTint(effVal);
                                            break;
                                        case "a:shade":
                                            color.setShade(effVal);
                                            break;
                                        case "a:satMod":
                                            color.setSatMod(effVal);
                                            break;
                                        case "a:lumMod":
                                            color.setLumMod(effVal);
                                            break;
                                        case "a:hueMod":
                                            color.setHueMod(effVal);
                                            break;
                                    }
                                }
                            }
                            return color;
                        };
                        return OoxmlColorFactory;
                    }());
                    theme.OoxmlColorFactory = OoxmlColorFactory;
                    OoxmlColorFactory["__class"] = "com.mxgraph.io.vsdx.theme.OoxmlColorFactory";
                })(theme = vsdx.theme || (vsdx.theme = {}));
            })(vsdx = io.vsdx || (io.vsdx = {}));
        })(io = mxgraph.io || (mxgraph.io = {}));
    })(mxgraph = com.mxgraph || (com.mxgraph = {}));
})(com || (com = {}));
(function (com) {
    var mxgraph;
    (function (mxgraph) {
        var io;
        (function (io) {
            var vsdx;
            (function (vsdx) {
                var theme;
                (function (theme) {
                    var QuickStyleVals = (function () {
                        function QuickStyleVals(quickStyleEffectsMatrix, quickStyleFillColor, quickStyleFillMatrix, quickStyleFontColor, quickStyleFontMatrix, quickStyleLineColor, quickStyleLineMatrix, quickStyleShadowColor, quickStyleType, quickStyleVariation) {
                            this.quickStyleEffectsMatrix = 0;
                            this.quickStyleFillColor = 0;
                            this.quickStyleFillMatrix = 0;
                            this.quickStyleFontColor = 0;
                            this.quickStyleFontMatrix = 0;
                            this.quickStyleLineColor = 0;
                            this.quickStyleLineMatrix = 0;
                            this.quickStyleShadowColor = 0;
                            this.quickStyleType = 0;
                            this.quickStyleVariation = 0;
                            this.quickStyleEffectsMatrix = quickStyleEffectsMatrix;
                            this.quickStyleFillColor = quickStyleFillColor;
                            this.quickStyleFillMatrix = quickStyleFillMatrix;
                            this.quickStyleFontColor = quickStyleFontColor;
                            this.quickStyleFontMatrix = quickStyleFontMatrix;
                            this.quickStyleLineColor = quickStyleLineColor;
                            this.quickStyleLineMatrix = quickStyleLineMatrix;
                            this.quickStyleShadowColor = quickStyleShadowColor;
                            this.quickStyleType = quickStyleType;
                            this.quickStyleVariation = quickStyleVariation;
                        }
                        QuickStyleVals.prototype.getQuickStyleEffectsMatrix = function () {
                            return this.quickStyleEffectsMatrix;
                        };
                        QuickStyleVals.prototype.getQuickStyleFillColor = function () {
                            return this.quickStyleFillColor;
                        };
                        QuickStyleVals.prototype.getQuickStyleFillMatrix = function () {
                            return this.quickStyleFillMatrix;
                        };
                        QuickStyleVals.prototype.getQuickStyleFontColor = function () {
                            return this.quickStyleFontColor;
                        };
                        QuickStyleVals.prototype.getQuickStyleFontMatrix = function () {
                            return this.quickStyleFontMatrix;
                        };
                        QuickStyleVals.prototype.getQuickStyleLineColor = function () {
                            return this.quickStyleLineColor;
                        };
                        QuickStyleVals.prototype.getQuickStyleLineMatrix = function () {
                            return this.quickStyleLineMatrix;
                        };
                        QuickStyleVals.prototype.getQuickStyleShadowColor = function () {
                            return this.quickStyleShadowColor;
                        };
                        QuickStyleVals.prototype.getQuickStyleType = function () {
                            return this.quickStyleType;
                        };
                        QuickStyleVals.prototype.getQuickStyleVariation = function () {
                            return this.quickStyleVariation;
                        };
                        QuickStyleVals.prototype.setQuickStyleEffectsMatrix = function (quickStyleEffectsMatrix) {
                            this.quickStyleEffectsMatrix = quickStyleEffectsMatrix;
                        };
                        QuickStyleVals.prototype.setQuickStyleFillColor = function (quickStyleFillColor) {
                            this.quickStyleFillColor = quickStyleFillColor;
                        };
                        QuickStyleVals.prototype.setQuickStyleFillMatrix = function (quickStyleFillMatrix) {
                            this.quickStyleFillMatrix = quickStyleFillMatrix;
                        };
                        QuickStyleVals.prototype.setQuickStyleFontColor = function (quickStyleFontColor) {
                            this.quickStyleFontColor = quickStyleFontColor;
                        };
                        QuickStyleVals.prototype.setQuickStyleFontMatrix = function (quickStyleFontMatrix) {
                            this.quickStyleFontMatrix = quickStyleFontMatrix;
                        };
                        QuickStyleVals.prototype.setQuickStyleLineColor = function (quickStyleLineColor) {
                            this.quickStyleLineColor = quickStyleLineColor;
                        };
                        QuickStyleVals.prototype.setQuickStyleLineMatrix = function (quickStyleLineMatrix) {
                            this.quickStyleLineMatrix = quickStyleLineMatrix;
                        };
                        QuickStyleVals.prototype.setQuickStyleShadowColor = function (quickStyleShadowColor) {
                            this.quickStyleShadowColor = quickStyleShadowColor;
                        };
                        QuickStyleVals.prototype.setQuickStyleType = function (quickStyleType) {
                            this.quickStyleType = quickStyleType;
                        };
                        QuickStyleVals.prototype.setQuickStyleVariation = function (quickStyleVariation) {
                            this.quickStyleVariation = quickStyleVariation;
                        };
                        return QuickStyleVals;
                    }());
                    theme.QuickStyleVals = QuickStyleVals;
                    QuickStyleVals["__class"] = "com.mxgraph.io.vsdx.theme.QuickStyleVals";
                })(theme = vsdx.theme || (vsdx.theme = {}));
            })(vsdx = io.vsdx || (io.vsdx = {}));
        })(io = mxgraph.io || (mxgraph.io = {}));
    })(mxgraph = com.mxgraph || (com.mxgraph = {}));
})(com || (com = {}));
(function (com) {
    var mxgraph;
    (function (mxgraph) {
        var io;
        (function (io) {
            var vsdx;
            (function (vsdx) {
                var theme;
                (function (theme_6) {
                    var SolidFillStyle = (function () {
                        function SolidFillStyle(color) {
                            this.color = null;
                            this.color = color;
                        }
                        /**
                         *
                         * @param {number} styleValue
                         * @param {com.mxgraph.io.vsdx.mxVsdxTheme} theme
                         * @return {com.mxgraph.io.vsdx.theme.Color}
                         */
                        SolidFillStyle.prototype.applyStyle = function (styleValue, theme) {
                            return this.color.getColor$int$com_mxgraph_io_vsdx_mxVsdxTheme(styleValue, theme);
                        };
                        return SolidFillStyle;
                    }());
                    theme_6.SolidFillStyle = SolidFillStyle;
                    SolidFillStyle["__class"] = "com.mxgraph.io.vsdx.theme.SolidFillStyle";
                    SolidFillStyle["__interfaces"] = ["com.mxgraph.io.vsdx.theme.FillStyle"];
                })(theme = vsdx.theme || (vsdx.theme = {}));
            })(vsdx = io.vsdx || (io.vsdx = {}));
        })(io = mxgraph.io || (mxgraph.io = {}));
    })(mxgraph = com.mxgraph || (com.mxgraph = {}));
})(com || (com = {}));
(function (com) {
    var mxgraph;
    (function (mxgraph) {
        var online;
        (function (online) {
            var Constants = (function () {
                function Constants() {
                }
                Constants.MAX_AREA_$LI$ = function () { if (Constants.MAX_AREA == null)
                    Constants.MAX_AREA = 10000 * 10000; return Constants.MAX_AREA; };
                ;
                return Constants;
            }());
            /**
             * Maximum size (in bytes) for request payloads. Default is 52428800 (50MB).
             */
            Constants.MAX_REQUEST_SIZE = 52428800;
            /**
             * The domain where legacy images are stored.
             */
            Constants.IMAGE_DOMAIN = "http://img.diagramly.com/";
            online.Constants = Constants;
            Constants["__class"] = "com.mxgraph.online.Constants";
        })(online = mxgraph.online || (mxgraph.online = {}));
    })(mxgraph = com.mxgraph || (com.mxgraph = {}));
})(com || (com = {}));
(function (com) {
    var mxgraph;
    (function (mxgraph) {
        var online;
        (function (online) {
            /**
             *
             * String/byte array encoding/manipulation utilities
             * @class
             */
            var Utils = (function () {
                function Utils() {
                }
                /**
                 * Rotates the given point by the given cos and sin.
                 * @param {mxPoint} pt
                 * @param {number} cos
                 * @param {number} sin
                 * @param {mxPoint} c
                 * @return {mxPoint}
                 */
                Utils.getRotatedPoint = function (pt, cos, sin, c) {
                    var x = pt.x - c.x;
                    var y = pt.y - c.y;
                    var x1 = x * cos - y * sin;
                    var y1 = y * cos + x * sin;
                    return new mxPoint(x1 + c.x, y1 + c.y);
                };
                /**
                 * Rotates the given geometry (in place) by the given rotation (in degrees).
                 * @param {mxGeometry} geo
                 * @param {number} rotation
                 * @param {number} cx
                 * @param {number} cy
                 */
                Utils.rotatedGeometry = function (geo, rotation, cx, cy) {
                    rotation = (function (x) { return x * Math.PI / 180; })(rotation);
                    var cos = Math.cos(rotation);
                    var sin = Math.sin(rotation);
                    var x = geo.getCenterX() - cx;
                    var y = geo.getCenterY() - cy;
                    var x1 = x * cos - y * sin;
                    var y1 = y * cos + x * sin;
                    geo.x = (Math.round(x1 + cx - geo.width / 2));
                    geo.y = (Math.round(y1 + cy - geo.height / 2));
                };
                return Utils;
            }());
            /**
             *
             */
            Utils.CHARSET_FOR_URL_ENCODING = "ISO-8859-1";
            online.Utils = Utils;
            Utils["__class"] = "com.mxgraph.online.Utils";
        })(online = mxgraph.online || (mxgraph.online = {}));
    })(mxgraph = com.mxgraph || (com.mxgraph = {}));
})(com || (com = {}));
(function (com) {
    var mxgraph;
    (function (mxgraph) {
        var io;
        (function (io) {
            var vsdx;
            (function (vsdx) {
                var geometry;
                (function (geometry) {
                    var ArcTo = (function (_super) {
                        __extends(ArcTo, _super);
                        function ArcTo(index, x, y, a) {
                            var _this = _super.call(this, index, x, y) || this;
                            _this.a = a;
                            return _this;
                        }
                        /**
                         *
                         * @param {mxPoint} p
                         * @param {com.mxgraph.io.vsdx.Shape} shape
                         * @return {string}
                         */
                        ArcTo.prototype.handle = function (p, shape) {
                            if (this.x != null && this.y != null && this.a != null) {
                                var h = shape.getHeight();
                                var w = shape.getWidth();
                                var x0 = Math.floor(Math.round(shape.getLastX() * w) / 100);
                                var y0 = Math.floor(Math.round(shape.getLastY() * h) / 100);
                                var x = this.x * com.mxgraph.io.vsdx.mxVsdxUtils.conversionFactor_$LI$();
                                var y = this.y * com.mxgraph.io.vsdx.mxVsdxUtils.conversionFactor_$LI$();
                                y = h - y;
                                var a = this.a * com.mxgraph.io.vsdx.mxVsdxUtils.conversionFactor_$LI$();
                                var dx = Math.abs(x - x0);
                                var dy = Math.abs(y - y0);
                                var rx = (a * 0.5) + (dx * dx + dy * dy) / (8.0 * a);
                                var ry = rx;
                                var r0 = Math.abs(rx);
                                rx = rx * 100 / w;
                                ry = ry * 100 / h;
                                x = x * 100 / w;
                                y = y * 100 / h;
                                rx = Math.round(rx * 100.0) / 100.0;
                                ry = Math.round(ry * 100.0) / 100.0;
                                x = Math.round(x * 100.0) / 100.0;
                                y = Math.round(y * 100.0) / 100.0;
                                a = Math.round(a * 100.0) / 100.0;
                                rx = Math.abs(rx);
                                ry = Math.abs(ry);
                                var sf = (a < 0) ? "1" : "0";
                                var laf = (r0 < Math.abs(a)) ? "1" : "0";
                                shape.setLastX(x);
                                shape.setLastY(y);
                                return "<arc rx=\"" + new String(rx).toString() + "\" ry=\"" + new String(ry).toString() + "\" x=\"" + new String(x).toString() + "\" y=\"" + new String(y).toString() + "\" x-axis-rotation=\"0\" large-arc-flag=\"" + laf + "\" sweep-flag=\"" + sf + "\"/>";
                            }
                            return "";
                        };
                        return ArcTo;
                    }(com.mxgraph.io.vsdx.geometry.Row));
                    geometry.ArcTo = ArcTo;
                    ArcTo["__class"] = "com.mxgraph.io.vsdx.geometry.ArcTo";
                })(geometry = vsdx.geometry || (vsdx.geometry = {}));
            })(vsdx = io.vsdx || (io.vsdx = {}));
        })(io = mxgraph.io || (mxgraph.io = {}));
    })(mxgraph = com.mxgraph || (com.mxgraph = {}));
})(com || (com = {}));
(function (com) {
    var mxgraph;
    (function (mxgraph) {
        var io;
        (function (io) {
            var vsdx;
            (function (vsdx) {
                var geometry;
                (function (geometry) {
                    var DelRow = (function (_super) {
                        __extends(DelRow, _super);
                        function DelRow(index) {
                            return _super.call(this, index, null, null) || this;
                        }
                        /**
                         *
                         * @param {mxPoint} p
                         * @param {com.mxgraph.io.vsdx.Shape} shape
                         * @return {string}
                         */
                        DelRow.prototype.handle = function (p, shape) {
                            return "";
                        };
                        return DelRow;
                    }(com.mxgraph.io.vsdx.geometry.Row));
                    geometry.DelRow = DelRow;
                    DelRow["__class"] = "com.mxgraph.io.vsdx.geometry.DelRow";
                })(geometry = vsdx.geometry || (vsdx.geometry = {}));
            })(vsdx = io.vsdx || (io.vsdx = {}));
        })(io = mxgraph.io || (mxgraph.io = {}));
    })(mxgraph = com.mxgraph || (com.mxgraph = {}));
})(com || (com = {}));
(function (com) {
    var mxgraph;
    (function (mxgraph) {
        var io;
        (function (io) {
            var vsdx;
            (function (vsdx) {
                var geometry;
                (function (geometry) {
                    var Ellipse = (function (_super) {
                        __extends(Ellipse, _super);
                        function Ellipse(index, x, y, a, b, c, d) {
                            var _this = _super.call(this, index, x, y) || this;
                            _this.a = a;
                            _this.b = b;
                            _this.c = c;
                            _this.d = d;
                            return _this;
                        }
                        /**
                         *
                         * @param {mxPoint} p
                         * @param {com.mxgraph.io.vsdx.Shape} shape
                         * @return {string}
                         */
                        Ellipse.prototype.handle = function (p, shape) {
                            if (this.x != null && this.y != null && this.a != null && this.b != null && this.c != null && this.d != null) {
                                var h = shape.getHeight();
                                var w = shape.getWidth();
                                var x = this.x * com.mxgraph.io.vsdx.mxVsdxUtils.conversionFactor_$LI$();
                                var y = this.y * com.mxgraph.io.vsdx.mxVsdxUtils.conversionFactor_$LI$();
                                y = h - y;
                                var a = this.a * com.mxgraph.io.vsdx.mxVsdxUtils.conversionFactor_$LI$();
                                var b = this.b * com.mxgraph.io.vsdx.mxVsdxUtils.conversionFactor_$LI$();
                                b = h - b;
                                var c = this.c * com.mxgraph.io.vsdx.mxVsdxUtils.conversionFactor_$LI$();
                                var d = this.d * com.mxgraph.io.vsdx.mxVsdxUtils.conversionFactor_$LI$();
                                d = h - d;
                                var dx1 = Math.abs(a - x);
                                var dy1 = Math.abs(b - y);
                                var r1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
                                var dx2 = Math.abs(c - x);
                                var dy2 = Math.abs(d - y);
                                var r2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
                                var newX = x * 100 / w;
                                var newY = y * 100 / h;
                                var newW = (r1 * 100 / w) / 2;
                                var newH = (r2 * 100 / h) / 2;
                                newH = Math.round(newH * 100.0) / 100.0;
                                newW = Math.round(newW * 100.0) / 100.0;
                                var newX1 = Math.round((newX - 2 * newW) * 100.0) / 100.0;
                                var newX2 = Math.round((newX + 2 * newW) * 100.0) / 100.0;
                                newY = Math.round(newY * 100.0) / 100.0;
                                return "<move x=\"" + new String(newX1).toString() + "\" y=\"" + new String(newY).toString() + "\"/><arc rx=\"" + new String(newW).toString() + "\" ry=\"" + new String(newH).toString() + "\" x=\"" + new String(newX2).toString() + "\" y=\"" + new String(newY).toString() + "\" x-axis-rotation=\"0\" large-arc-flag=\"1\" sweep-flag=\"0\"/><arc rx=\"" + new String(newW).toString() + "\" ry=\"" + new String(newH).toString() + "\" x=\"" + new String(newX1).toString() + "\" y=\"" + new String(newY).toString() + "\" x-axis-rotation=\"0\" large-arc-flag=\"1\" sweep-flag=\"0\"/>";
                            }
                            return "";
                        };
                        return Ellipse;
                    }(com.mxgraph.io.vsdx.geometry.Row));
                    geometry.Ellipse = Ellipse;
                    Ellipse["__class"] = "com.mxgraph.io.vsdx.geometry.Ellipse";
                })(geometry = vsdx.geometry || (vsdx.geometry = {}));
            })(vsdx = io.vsdx || (io.vsdx = {}));
        })(io = mxgraph.io || (mxgraph.io = {}));
    })(mxgraph = com.mxgraph || (com.mxgraph = {}));
})(com || (com = {}));
(function (com) {
    var mxgraph;
    (function (mxgraph) {
        var io;
        (function (io) {
            var vsdx;
            (function (vsdx) {
                var geometry;
                (function (geometry) {
                    var EllipticalArcTo = (function (_super) {
                        __extends(EllipticalArcTo, _super);
                        function EllipticalArcTo(index, x, y, a, b, c, d) {
                            var _this = _super.call(this, index, x, y) || this;
                            _this.a = a;
                            _this.b = b;
                            _this.c = c;
                            _this.d = d;
                            return _this;
                        }
                        /**
                         *
                         * @param {mxPoint} p
                         * @param {com.mxgraph.io.vsdx.Shape} shape
                         * @return {string}
                         */
                        EllipticalArcTo.prototype.handle = function (p, shape) {
                            if (this.x != null && this.y != null && this.a != null && this.b != null && this.c != null && this.d != null) {
                                var h = shape.getHeight();
                                var w = shape.getWidth();
                                var x = this.x * com.mxgraph.io.vsdx.mxVsdxUtils.conversionFactor_$LI$();
                                var y = this.y * com.mxgraph.io.vsdx.mxVsdxUtils.conversionFactor_$LI$();
                                y = h - y;
                                var a = this.a * com.mxgraph.io.vsdx.mxVsdxUtils.conversionFactor_$LI$();
                                var b = this.b * com.mxgraph.io.vsdx.mxVsdxUtils.conversionFactor_$LI$();
                                var c = this.c;
                                var d = this.d;
                                x = x * 100.0 / w;
                                y = y * 100.0 / h;
                                var x1 = shape.getLastX() * w / 100.0;
                                var y1 = shape.getLastY() * h / 100.0;
                                var x2 = x * w / 100.0;
                                var y2 = y * h / 100.0;
                                var x3 = a;
                                var y3 = h - b;
                                var ang = -c;
                                var p1x = Math.sqrt(x1 * x1 + y1 * y1) * Math.cos(Math.atan2(y1, x1) - ang);
                                var p1y = Math.sqrt(x1 * x1 + y1 * y1) * Math.sin(Math.atan2(y1, x1) - ang);
                                var p2x = Math.sqrt(x2 * x2 + y2 * y2) * Math.cos(Math.atan2(y2, x2) - ang);
                                var p2y = Math.sqrt(x2 * x2 + y2 * y2) * Math.sin(Math.atan2(y2, x2) - ang);
                                var p3x = Math.sqrt(x3 * x3 + y3 * y3) * Math.cos(Math.atan2(y3, x3) - ang);
                                var p3y = Math.sqrt(x3 * x3 + y3 * y3) * Math.sin(Math.atan2(y3, x3) - ang);
                                var p0x = ((p1x - p2x) * (p1x + p2x) * (p2y - p3y) - (p2x - p3x) * (p2x + p3x) * (p1y - p2y) + d * d * (p1y - p2y) * (p2y - p3y) * (p1y - p3y)) / (2 * ((p1x - p2x) * (p2y - p3y) - (p2x - p3x) * (p1y - p2y)));
                                var p0y = ((p1x - p2x) * (p2x - p3x) * (p1x - p3x) / (d * d) + (p2x - p3x) * (p1y - p2y) * (p1y + p2y) - (p1x - p2x) * (p2y - p3y) * (p2y + p3y)) / (2 * ((p2x - p3x) * (p1y - p2y) - (p1x - p2x) * (p2y - p3y)));
                                var newX = Math.sqrt(p0x * p0x + p0y * p0y) * Math.cos(Math.atan2(p0y, p0x) + ang);
                                var newY = Math.sqrt(p0x * p0x + p0y * p0y) * Math.sin(Math.atan2(p0y, p0x) + ang);
                                newX = newX * w / 100.0;
                                newY = newY * h / 100.0;
                                var dx = p1x - p0x;
                                var dy = p1y - p0y;
                                var rx = Math.sqrt(dx * dx + dy * dy * d * d);
                                var ry = rx / d;
                                var rot = (function (x) { return x * 180 / Math.PI; })(ang);
                                rx = rx * 100.0 / w;
                                ry = ry * 100.0 / h;
                                x = Math.round(x * 100.0) / 100.0;
                                y = Math.round(y * 100.0) / 100.0;
                                rx = Math.round(rx * 100.0) / 100.0;
                                ry = Math.round(ry * 100.0) / 100.0;
                                rot = Math.round(rot * 100.0) / 100.0;
                                var sweep = (x2 - x1) * (y3 - y1) - (y2 - y1) * (x3 - x1);
                                var sf = (sweep > 0) ? "0" : "1";
                                var laf = "0";
                                if (com.mxgraph.io.vsdx.mxVsdxUtils.isInsideTriangle(p0x, p0y, p1x, p1y, p2x, p2y, p3x, p3y)) // && this.isReflexAngle(p0x, p0y, p1x, p1y, p2x, p2y, p3x, p3y)) { //Inside triangle works alone in all test cases so far 
								{
                                    laf = "1";
                                }
                                shape.setLastX(x);
                                shape.setLastY(y);
                                return "<arc rx=\"" + new String(rx).toString() + "\" ry=\"" + new String(ry).toString() + "\" x=\"" + new String(x).toString() + "\" y=\"" + new String(y).toString() + "\" x-axis-rotation=\"" + new String(rot).toString() + "\" large-arc-flag=\"" + laf + "\" sweep-flag=\"" + sf + "\"/>";
                            }
                            return "";
                        };
                        /**
                         * @param {number} x0 y0 center point of ellipse containing the arc
                         * @param {number} x1 y1 starting point of the arc
                         * @param {number} x2 y2 endpoint of the arc
                         * @param {number} x3 y3 control point
                         * @return {boolean} true if the start to end angle that contains the control point is a reflex angle
                         * @param {number} y0
                         * @param {number} y1
                         * @param {number} y2
                         * @param {number} y3
                         */
                        EllipticalArcTo.prototype.isReflexAngle = function (x0, y0, x1, y1, x2, y2, x3, y3) {
                            x1 = x1 - x0;
                            y1 = y1 - y0;
                            x2 = x2 - x0;
                            y2 = y2 - y0;
                            x2 = x3 - x0;
                            y3 = y3 - y0;
                            x0 = 0;
                            y0 = 0;
                            var aStart = (function (x) { return x * 180 / Math.PI; })(Math.atan2(y1, x1) - Math.atan2(y0, x0));
                            var aEnd = (function (x) { return x * 180 / Math.PI; })(Math.atan2(y2, x2) - Math.atan2(y0, x0));
                            var aCP = (function (x) { return x * 180 / Math.PI; })(Math.atan2(y3, x3) - Math.atan2(y0, x0));
                            aStart = (aStart - aCP) % 360;
                            aEnd = (aEnd - aCP) % 360;
                            if (aStart > 180) {
                                aStart = aStart - 360;
                            }
                            else if (aStart < -180) {
                                aStart = aStart + 360;
                            }
                            if (aEnd > 180) {
                                aEnd = aEnd - 360;
                            }
                            else if (aEnd < -180) {
                                aEnd = aEnd + 360;
                            }
                            if ((aStart > 0 && aEnd < 0) || (aStart < 0 && aEnd > 0)) {
                                if (Math.abs(aStart - aEnd) > 180) {
                                    return true;
                                }
                            }
                            return false;
                        };
                        return EllipticalArcTo;
                    }(com.mxgraph.io.vsdx.geometry.Row));
                    geometry.EllipticalArcTo = EllipticalArcTo;
                    EllipticalArcTo["__class"] = "com.mxgraph.io.vsdx.geometry.EllipticalArcTo";
                })(geometry = vsdx.geometry || (vsdx.geometry = {}));
            })(vsdx = io.vsdx || (io.vsdx = {}));
        })(io = mxgraph.io || (mxgraph.io = {}));
    })(mxgraph = com.mxgraph || (com.mxgraph = {}));
})(com || (com = {}));
(function (com) {
    var mxgraph;
    (function (mxgraph) {
        var io;
        (function (io) {
            var vsdx;
            (function (vsdx) {
                var geometry;
                (function (geometry) {
                    var InfiniteLine = (function (_super) {
                        __extends(InfiniteLine, _super);
                        function InfiniteLine(index, x, y, a, b) {
                            var _this = _super.call(this, index, x, y) || this;
                            _this.a = a;
                            _this.b = b;
                            return _this;
                        }
                        /**
                         *
                         * @param {mxPoint} p
                         * @param {com.mxgraph.io.vsdx.Shape} shape
                         * @return {string}
                         */
                        InfiniteLine.prototype.handle = function (p, shape) {
                            return "";
                        };
                        return InfiniteLine;
                    }(com.mxgraph.io.vsdx.geometry.Row));
                    geometry.InfiniteLine = InfiniteLine;
                    InfiniteLine["__class"] = "com.mxgraph.io.vsdx.geometry.InfiniteLine";
                })(geometry = vsdx.geometry || (vsdx.geometry = {}));
            })(vsdx = io.vsdx || (io.vsdx = {}));
        })(io = mxgraph.io || (mxgraph.io = {}));
    })(mxgraph = com.mxgraph || (com.mxgraph = {}));
})(com || (com = {}));
(function (com) {
    var mxgraph;
    (function (mxgraph) {
        var io;
        (function (io) {
            var vsdx;
            (function (vsdx) {
                var geometry;
                (function (geometry) {
                    var LineTo = (function (_super) {
                        __extends(LineTo, _super);
                        function LineTo(index, x, y) {
                            return _super.call(this, index, x, y) || this;
                        }
                        /**
                         *
                         * @param {mxPoint} p
                         * @param {com.mxgraph.io.vsdx.Shape} shape
                         * @return {string}
                         */
                        LineTo.prototype.handle = function (p, shape) {
                            var x = p.x;
                            var y = p.y;
                            var h = shape.getHeight();
                            var w = shape.getWidth();
                            if (this.x != null && this.y != null) {
                                x = this.x * com.mxgraph.io.vsdx.mxVsdxUtils.conversionFactor_$LI$();
                                y = this.y * com.mxgraph.io.vsdx.mxVsdxUtils.conversionFactor_$LI$();
                            }
                            x = x * 100.0 / w;
                            y = y * 100.0 / h;
                            y = 100 - y;
                            x = Math.round(x * 100.0) / 100.0;
                            y = Math.round(y * 100.0) / 100.0;
                            p.x = (x);
                            p.y = (y);
                            shape.setLastX(x);
                            shape.setLastY(y);
                            return "<line x=\"" + new String(x).toString() + "\" y=\"" + new String(y).toString() + "\"/>";
                        };
                        return LineTo;
                    }(com.mxgraph.io.vsdx.geometry.Row));
                    geometry.LineTo = LineTo;
                    LineTo["__class"] = "com.mxgraph.io.vsdx.geometry.LineTo";
                })(geometry = vsdx.geometry || (vsdx.geometry = {}));
            })(vsdx = io.vsdx || (io.vsdx = {}));
        })(io = mxgraph.io || (mxgraph.io = {}));
    })(mxgraph = com.mxgraph || (com.mxgraph = {}));
})(com || (com = {}));
(function (com) {
    var mxgraph;
    (function (mxgraph) {
        var io;
        (function (io) {
            var vsdx;
            (function (vsdx) {
                var geometry;
                (function (geometry) {
                    var MoveTo = (function (_super) {
                        __extends(MoveTo, _super);
                        function MoveTo(index, x, y) {
                            return _super.call(this, index, x, y) || this;
                        }
                        /**
                         *
                         * @param {mxPoint} p
                         * @param {com.mxgraph.io.vsdx.Shape} shape
                         * @return {string}
                         */
                        MoveTo.prototype.handle = function (p, shape) {
                            var x = p.x;
                            var y = p.y;
                            var h = shape.getHeight();
                            var w = shape.getWidth();
                            if (this.x != null && this.y != null) {
                                x = this.x * com.mxgraph.io.vsdx.mxVsdxUtils.conversionFactor_$LI$();
                                y = this.y * com.mxgraph.io.vsdx.mxVsdxUtils.conversionFactor_$LI$();
                            }
                            x = x * 100.0 / w;
                            y = y * 100.0 / h;
                            y = 100 - y;
                            x = Math.round(x * 100.0) / 100.0;
                            y = Math.round(y * 100.0) / 100.0;
                            p.x = (x);
                            p.y = (y);
                            shape.setLastX(x);
                            shape.setLastY(y);
                            shape.setLastMoveX(x);
                            shape.setLastMoveY(y);
                            return "<move x=\"" + new String(x).toString() + "\" y=\"" + new String(y).toString() + "\"/>";
                        };
                        return MoveTo;
                    }(com.mxgraph.io.vsdx.geometry.Row));
                    geometry.MoveTo = MoveTo;
                    MoveTo["__class"] = "com.mxgraph.io.vsdx.geometry.MoveTo";
                })(geometry = vsdx.geometry || (vsdx.geometry = {}));
            })(vsdx = io.vsdx || (io.vsdx = {}));
        })(io = mxgraph.io || (mxgraph.io = {}));
    })(mxgraph = com.mxgraph || (com.mxgraph = {}));
})(com || (com = {}));
(function (com) {
    var mxgraph;
    (function (mxgraph) {
        var io;
        (function (io) {
            var vsdx;
            (function (vsdx) {
                var geometry;
                (function (geometry) {
                    var NURBSTo = (function (_super) {
                        __extends(NURBSTo, _super);
                        function NURBSTo(index, x, y, a, b, c, d, e) {
                            var _this = _super.call(this, index, x, y) || this;
                            _this.a = a;
                            _this.b = b;
                            _this.c = c;
                            _this.d = d;
                            _this.formulaE = e;
                            return _this;
                        }
                        /**
                         * Helper class for geometry
                         * @param {mxPoint} p
                         * @param {com.mxgraph.io.vsdx.Shape} shape
                         * @return {string}
                         */
                        NURBSTo.prototype.handle = function (p, shape) {
                            if (this.x != null && this.y != null && this.formulaE != null) {
                                var h = shape.getHeight();
                                var w = shape.getWidth();
                                var x = this.x * com.mxgraph.io.vsdx.mxVsdxUtils.conversionFactor_$LI$();
                                var y = this.y * com.mxgraph.io.vsdx.mxVsdxUtils.conversionFactor_$LI$();
                                var eValue = this.formulaE.split("NURBS(").join("");
                                eValue = eValue.split(")").join("");
                                var nurbs = new NURBSTo.Nurbs(this, eValue, w, h);
                                if (nurbs.getSize() >= 2) {
                                    var x1 = nurbs.getX(0);
                                    var y1 = nurbs.getY(0);
                                    var x2 = nurbs.getX(1);
                                    var y2 = nurbs.getY(1);
                                    y = y * 100.0 / h;
                                    x = x * 100.0 / w;
                                    y = 100 - y;
                                    x = Math.round(x * 100.0) / 100.0;
                                    y = Math.round(y * 100.0) / 100.0;
                                    x1 = Math.round(x1 * 100.0) / 100.0;
                                    y1 = Math.round(y1 * 100.0) / 100.0;
                                    x2 = Math.round(x2 * 100.0) / 100.0;
                                    y2 = Math.round(y2 * 100.0) / 100.0;
                                    shape.setLastX(x);
                                    shape.setLastY(y);
                                    if (nurbs.getDegree() === 3 && nurbs.isOrderedByThree(this.getA())) {
                                        var cp1 = ([]);
                                        var cp2 = ([]);
                                        var nut = ([]);
                                        var nurbsize = nurbs.getSize();
                                        for (var i = 0; i < nurbsize - 1; i = i + 3) {
                                            /* add */ (cp1.push(new mxPoint(nurbs.getX(i), nurbs.getY(i))));
                                            /* add */ (cp2.push(new mxPoint(nurbs.getX(i + 1), nurbs.getY(i + 1))));
                                            if (i < nurbsize - 2) {
                                                /* add */ (nut.push(new mxPoint(nurbs.getX(i + 2), nurbs.getY(i + 2))));
                                            }
                                            else {
                                                /* add */ (nut.push(new mxPoint(x, y)));
                                            }
                                        }
                                        ;
                                        var result = "";
                                        for (var i = 0; i < cp1.length; i++) {
                                            result += "<curve x1=\"" + cp1[i].x + "\" y1=\"" + cp1[i].y + "\" x2=\"" + cp2[i].x + "\" y2=\"" + cp2[i].y + "\" x3=\"" + nut[i].x + "\" y3=\"" + nut[i].y + "\"/>\n";
                                        }
                                        ;
                                        return result;
                                    }
                                    else {
                                        return "<curve x1=\"" + new String(x1).toString() + "\" y1=\"" + new String(y1).toString() + "\" x2=\"" + new String(x2).toString() + "\" y2=\"" + new String(y2).toString() + "\" x3=\"" + new String(x).toString() + "\" y3=\"" + new String(y).toString() + "\"/>";
                                    }
                                }
                            }
                            return "";
                        };
                        return NURBSTo;
                    }(com.mxgraph.io.vsdx.geometry.Row));
                    geometry.NURBSTo = NURBSTo;
                    NURBSTo["__class"] = "com.mxgraph.io.vsdx.geometry.NURBSTo";
                    (function (NURBSTo) {
                        /**
                         * Holds the NURBS array that is part of the VSDX NURBSTo element, together with some helper functions
                         * @param {string} s
                         * @param {number} w
                         * @param {number} h
                         * @class
                         */
                        var Nurbs = (function () {
                            function Nurbs(__parent, s, w, h) {
                                this.__parent = __parent;
                                this.nurbsValues = ([]);
                                var n = s.split(/\s*,\s*/).slice(0);
                                for (var i = 0; i < n.length; i++) {
                                    if ((i > 3) && (i % 4 === 0)) {
                                        /* add */ (this.nurbsValues.push(/* parseDouble */ parseFloat(/* get */ n[i]) * 100.0));
                                    }
                                    else if ((i > 3) && (i % 4 === 1)) {
                                        /* add */ (this.nurbsValues.push(100 - parseFloat(/* get */ n[i]) * 100.0));
                                    }
                                    else {
                                        /* add */ (this.nurbsValues.push(/* parseDouble */ parseFloat(/* get */ n[i])));
                                    }
                                }
                                ;
                            }
                            /**
                             * @param {number} lastKnot the last knot outside of the nurbs string. Obtain it with this.getA()
                             * @return {boolean} true if knots are ordered by sets of 3
                             */
                            Nurbs.prototype.isOrderedByThree = function (lastKnot) {
                                for (var i = 0; i + 2 < (this.getSize()); i = i + 3) {
                                    var k_1 = Math.round(this.getKnot((i)) * 100.0) / 100.0;
                                    var k1_1 = Math.round(this.getKnot((i + 1)) * 100.0) / 100.0;
                                    var k2 = Math.round(this.getKnot((i + 2)) * 100.0) / 100.0;
                                    if (k_1 !== k1_1 || k_1 !== k2 || k1_1 !== k2) {
                                        return false;
                                    }
                                }
                                ;
                                var k = Math.round(this.getKnot((this.getSize() - 2)) * 10.0) / 10.0;
                                var k1 = Math.round(this.getKnot((this.getSize() - 1)) * 10.0) / 10.0;
                                var lk = Math.round(lastKnot * 10.0) / 10.0;
                                if (k !== k1 || k !== lk || k1 !== lk) {
                                    return false;
                                }
                                return true;
                            };
                            /**
                             * @return {number} number of points, not including the last one (which is outside of the nurbs string)
                             */
                            Nurbs.prototype.getSize = function () {
                                return (((this.nurbsValues.length / 4 | 0)) - 1);
                            };
                            /**
                             * @return {number} last knot (element knotLast)
                             */
                            Nurbs.prototype.getKnotLast = function () {
                                return this.nurbsValues[0];
                            };
                            /**
                             * @return {number} degree of the NURBS (element degree)
                             */
                            Nurbs.prototype.getDegree = function () {
                                return this.nurbsValues[1];
                            };
                            /**
                             * @return {number} 0 if X is relative, otherwise X is in the coordinate system of the shape (element xType)
                             */
                            Nurbs.prototype.getXType = function () {
                                return this.nurbsValues[2];
                            };
                            /**
                             * @return {number} 0 if Y is relative, otherwise Y is in the coordinate system of the shape (element yType)
                             */
                            Nurbs.prototype.getYType = function () {
                                return this.nurbsValues[3];
                            };
                            /**
                             * @return {number} the i-th X coordinate
                             * @param {number} i
                             */
                            Nurbs.prototype.getX = function (i) {
                                return this.nurbsValues[(i + 1) * 4];
                            };
                            /**
                             * @return {number} the i-th Y coordinate
                             * @param {number} i
                             */
                            Nurbs.prototype.getY = function (i) {
                                return this.nurbsValues[(i + 1) * 4 + 1];
                            };
                            /**
                             * @return {number} the i-th knot
                             * @param {number} i
                             */
                            Nurbs.prototype.getKnot = function (i) {
                                return this.nurbsValues[(i + 1) * 4 + 2];
                            };
                            /**
                             * @return {number} the i-th weight
                             * @param {number} i
                             */
                            Nurbs.prototype.getWeight = function (i) {
                                return this.nurbsValues[(i + 1) * 4 + 3];
                            };
                            return Nurbs;
                        }());
                        NURBSTo.Nurbs = Nurbs;
                        Nurbs["__class"] = "com.mxgraph.io.vsdx.geometry.NURBSTo.Nurbs";
                    })(NURBSTo = geometry.NURBSTo || (geometry.NURBSTo = {}));
                })(geometry = vsdx.geometry || (vsdx.geometry = {}));
            })(vsdx = io.vsdx || (io.vsdx = {}));
        })(io = mxgraph.io || (mxgraph.io = {}));
    })(mxgraph = com.mxgraph || (com.mxgraph = {}));
})(com || (com = {}));
(function (com) {
    var mxgraph;
    (function (mxgraph) {
        var io;
        (function (io) {
            var vsdx;
            (function (vsdx) {
                var geometry;
                (function (geometry) {
                    var PolylineTo = (function (_super) {
                        __extends(PolylineTo, _super);
                        function PolylineTo(index, x, y, a) {
                            var _this = _super.call(this, index, x, y) || this;
                            _this.formulaA = a;
                            return _this;
                        }
                        /**
                         *
                         * @param {mxPoint} p
                         * @param {com.mxgraph.io.vsdx.Shape} shape
                         * @return {string}
                         */
                        PolylineTo.prototype.handle = function (p, shape) {
                            var result = "";
                            if (this.x != null && this.y != null && this.formulaA != null) {
                                var h = shape.getHeight();
                                var w = shape.getWidth();
                                var x = this.x * com.mxgraph.io.vsdx.mxVsdxUtils.conversionFactor_$LI$();
                                var y = this.y * com.mxgraph.io.vsdx.mxVsdxUtils.conversionFactor_$LI$();
                                x = x * 100.0 / w;
                                y = y * 100.0 / h;
                                y = 100 - y;
                                x = Math.round(x * 100.0) / 100.0;
                                y = Math.round(y * 100.0) / 100.0;
                                var aValue = this.formulaA.replace(new RegExp("\\s", 'g'), "").toLowerCase().replace(new RegExp("polyline\\(", 'g'), "").replace(new RegExp("\\)", 'g'), "");
                                if ((function (o1, o2) { if (o1 && o1.equals) {
                                    return o1.equals(o2);
                                }
                                else {
                                    return o1 === o2;
                                } })(aValue, "inh")) {
                                    throw Object.defineProperty(new Error(), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.IllegalArgumentException', 'java.lang.Exception'] });
                                }
                                var polyEntriesList = (aValue.split(",").slice(0).slice(0));
                                var xRel = parseFloat(/* remove */ polyEntriesList.splice(0, 1));
                                var yRel = parseFloat(/* remove */ polyEntriesList.splice(0, 1));
                                var currX = 0;
                                var currY = 0;
                                while ((polyEntriesList.length > 0)) {
                                    currX = parseFloat(/* remove */ polyEntriesList.splice(0, 1)) * com.mxgraph.io.vsdx.mxVsdxUtils.conversionFactor_$LI$();
                                    currY = parseFloat(/* remove */ polyEntriesList.splice(0, 1)) * com.mxgraph.io.vsdx.mxVsdxUtils.conversionFactor_$LI$();
                                    if (xRel === 1) {
                                        currX = currX * 100.0 / w;
                                    }
                                    if (xRel === 1) {
                                        currY = currY * 100.0 / h;
                                    }
                                    currY = 100 - currY;
                                    currX = Math.round(currX * 100.0) / 100.0;
                                    currY = Math.round(currY * 100.0) / 100.0;
                                    shape.setLastX(currX);
                                    shape.setLastY(currY);
                                    result += "<line x=\"" + new String(currX).toString() + "\" y=\"" + new String(currY).toString() + "\"/>";
                                }
                                ;
                                result += "<line x=\"" + new String(x).toString() + "\" y=\"" + new String(y).toString() + "\"/>";
                                if (shape.getLastMoveX() === x && shape.getLastMoveY() === y) {
                                    result += "<close/>";
                                }
                            }
                            return result;
                        };
                        return PolylineTo;
                    }(com.mxgraph.io.vsdx.geometry.Row));
                    geometry.PolylineTo = PolylineTo;
                    PolylineTo["__class"] = "com.mxgraph.io.vsdx.geometry.PolylineTo";
                })(geometry = vsdx.geometry || (vsdx.geometry = {}));
            })(vsdx = io.vsdx || (io.vsdx = {}));
        })(io = mxgraph.io || (mxgraph.io = {}));
    })(mxgraph = com.mxgraph || (com.mxgraph = {}));
})(com || (com = {}));
(function (com) {
    var mxgraph;
    (function (mxgraph) {
        var io;
        (function (io) {
            var vsdx;
            (function (vsdx) {
                var geometry;
                (function (geometry) {
                    var RelCubBezTo = (function (_super) {
                        __extends(RelCubBezTo, _super);
                        function RelCubBezTo(index, x, y, a, b, c, d) {
                            var _this = _super.call(this, index, x, y) || this;
                            _this.a = a;
                            _this.b = b;
                            _this.c = c;
                            _this.d = d;
                            return _this;
                        }
                        /**
                         *
                         * @param {mxPoint} p
                         * @param {com.mxgraph.io.vsdx.Shape} shape
                         * @return {string}
                         */
                        RelCubBezTo.prototype.handle = function (p, shape) {
                            if (this.x != null && this.y != null && this.a != null && this.b != null && this.c != null && this.d != null) {
                                var x = this.x * 100;
                                var y = 100 - this.y * 100;
                                var x1 = this.a * 100.0;
                                var y1 = 100 - this.b * 100.0;
                                var x2 = this.c * 100.0;
                                var y2 = 100 - this.d * 100.0;
                                x = Math.round(x * 100.0) / 100.0;
                                y = Math.round(y * 100.0) / 100.0;
                                x1 = Math.round(x1 * 100.0) / 100.0;
                                y1 = Math.round(y1 * 100.0) / 100.0;
                                x2 = Math.round(x2 * 100.0) / 100.0;
                                y2 = Math.round(y2 * 100.0) / 100.0;
                                shape.setLastX(x);
                                shape.setLastY(y);
                                return "<curve x1=\"" + new String(x1).toString() + "\" y1=\"" + new String(y1).toString() + "\" x2=\"" + new String(x2).toString() + "\" y2=\"" + new String(y2).toString() + "\" x3=\"" + new String(x).toString() + "\" y3=\"" + new String(y).toString() + "\"/>";
                            }
                            return "";
                        };
                        return RelCubBezTo;
                    }(com.mxgraph.io.vsdx.geometry.Row));
                    geometry.RelCubBezTo = RelCubBezTo;
                    RelCubBezTo["__class"] = "com.mxgraph.io.vsdx.geometry.RelCubBezTo";
                })(geometry = vsdx.geometry || (vsdx.geometry = {}));
            })(vsdx = io.vsdx || (io.vsdx = {}));
        })(io = mxgraph.io || (mxgraph.io = {}));
    })(mxgraph = com.mxgraph || (com.mxgraph = {}));
})(com || (com = {}));
(function (com) {
    var mxgraph;
    (function (mxgraph) {
        var io;
        (function (io) {
            var vsdx;
            (function (vsdx) {
                var geometry;
                (function (geometry) {
                    var RelLineTo = (function (_super) {
                        __extends(RelLineTo, _super);
                        function RelLineTo(index, x, y) {
                            return _super.call(this, index, x, y) || this;
                        }
                        /**
                         *
                         * @param {mxPoint} p
                         * @param {com.mxgraph.io.vsdx.Shape} shape
                         * @return {string}
                         */
                        RelLineTo.prototype.handle = function (p, shape) {
                            var x = p.x;
                            var y = p.y;
                            if (this.x != null && this.y != null) {
                                x = this.x * 100;
                                y = 100 - this.y * 100;
                            }
                            x = Math.round(x * 100.0) / 100.0;
                            y = Math.round(y * 100.0) / 100.0;
                            p.x = (x);
                            p.y = (y);
                            shape.setLastX(x);
                            shape.setLastY(y);
                            return "<line x=\"" + new String(x).toString() + "\" y=\"" + new String(y).toString() + "\"/>";
                        };
                        return RelLineTo;
                    }(com.mxgraph.io.vsdx.geometry.Row));
                    geometry.RelLineTo = RelLineTo;
                    RelLineTo["__class"] = "com.mxgraph.io.vsdx.geometry.RelLineTo";
                })(geometry = vsdx.geometry || (vsdx.geometry = {}));
            })(vsdx = io.vsdx || (io.vsdx = {}));
        })(io = mxgraph.io || (mxgraph.io = {}));
    })(mxgraph = com.mxgraph || (com.mxgraph = {}));
})(com || (com = {}));
(function (com) {
    var mxgraph;
    (function (mxgraph) {
        var io;
        (function (io) {
            var vsdx;
            (function (vsdx) {
                var geometry;
                (function (geometry) {
                    var RelMoveTo = (function (_super) {
                        __extends(RelMoveTo, _super);
                        function RelMoveTo(index, x, y) {
                            return _super.call(this, index, x, y) || this;
                        }
                        /**
                         *
                         * @param {mxPoint} p
                         * @param {com.mxgraph.io.vsdx.Shape} shape
                         * @return {string}
                         */
                        RelMoveTo.prototype.handle = function (p, shape) {
                            var x = p.x;
                            var y = p.y;
                            if (this.x != null && this.y != null) {
                                x = this.x * 100;
                                y = 100 - this.y * 100;
                            }
                            x = Math.round(x * 100.0) / 100.0;
                            y = Math.round(y * 100.0) / 100.0;
                            p.x = (x);
                            p.y = (y);
                            shape.setLastX(x);
                            shape.setLastY(y);
                            shape.setLastMoveX(x);
                            shape.setLastMoveY(y);
                            return "<move x=\"" + new String(x).toString() + "\" y=\"" + new String(y).toString() + "\"/>";
                        };
                        return RelMoveTo;
                    }(com.mxgraph.io.vsdx.geometry.Row));
                    geometry.RelMoveTo = RelMoveTo;
                    RelMoveTo["__class"] = "com.mxgraph.io.vsdx.geometry.RelMoveTo";
                })(geometry = vsdx.geometry || (vsdx.geometry = {}));
            })(vsdx = io.vsdx || (io.vsdx = {}));
        })(io = mxgraph.io || (mxgraph.io = {}));
    })(mxgraph = com.mxgraph || (com.mxgraph = {}));
})(com || (com = {}));
(function (com) {
    var mxgraph;
    (function (mxgraph) {
        var io;
        (function (io) {
            var vsdx;
            (function (vsdx) {
                var geometry;
                (function (geometry) {
                    var RelQuadBezTo = (function (_super) {
                        __extends(RelQuadBezTo, _super);
                        function RelQuadBezTo(index, x, y, a, b) {
                            var _this = _super.call(this, index, x, y) || this;
                            _this.a = a;
                            _this.b = b;
                            return _this;
                        }
                        /**
                         *
                         * @param {mxPoint} p
                         * @param {com.mxgraph.io.vsdx.Shape} shape
                         * @return {string}
                         */
                        RelQuadBezTo.prototype.handle = function (p, shape) {
                            if (this.x != null && this.y != null && this.a != null && this.b != null) {
                                var x = this.x * 100;
                                var y = 100 - this.y * 100;
                                var x1 = this.a * 100.0;
                                var y1 = 100 - this.b * 100.0;
                                x = Math.round(x * 100.0) / 100.0;
                                y = Math.round(y * 100.0) / 100.0;
                                x1 = Math.round(x1 * 100.0) / 100.0;
                                y1 = Math.round(y1 * 100.0) / 100.0;
                                shape.setLastX(x);
                                shape.setLastY(y);
                                return "<quad x1=\"" + new String(x1).toString() + "\" y1=\"" + new String(y1).toString() + "\" x2=\"" + new String(x).toString() + "\" y2=\"" + new String(y).toString() + "\"/>";
                            }
                            return "";
                        };
                        return RelQuadBezTo;
                    }(com.mxgraph.io.vsdx.geometry.Row));
                    geometry.RelQuadBezTo = RelQuadBezTo;
                    RelQuadBezTo["__class"] = "com.mxgraph.io.vsdx.geometry.RelQuadBezTo";
                })(geometry = vsdx.geometry || (vsdx.geometry = {}));
            })(vsdx = io.vsdx || (io.vsdx = {}));
        })(io = mxgraph.io || (mxgraph.io = {}));
    })(mxgraph = com.mxgraph || (com.mxgraph = {}));
})(com || (com = {}));
(function (com) {
    var mxgraph;
    (function (mxgraph) {
        var io;
        (function (io) {
            var vsdx;
            (function (vsdx) {
                var geometry;
                (function (geometry) {
                    var SplineKnot = (function (_super) {
                        __extends(SplineKnot, _super);
                        function SplineKnot(index, x, y, a) {
                            var _this = _super.call(this, index, x, y) || this;
                            _this.a = a;
                            return _this;
                        }
                        /**
                         *
                         * @param {mxPoint} p
                         * @param {com.mxgraph.io.vsdx.Shape} shape
                         * @return {string}
                         */
                        SplineKnot.prototype.handle = function (p, shape) {
                            if (this.x != null && this.y != null && this.a != null) {
                                var x = this.x * com.mxgraph.io.vsdx.mxVsdxUtils.conversionFactor_$LI$();
                                var y = this.y * com.mxgraph.io.vsdx.mxVsdxUtils.conversionFactor_$LI$();
                                var a = this.a;
                                var knot = a;
                                y = 100 - y;
                                x = Math.round(x * 100.0) / 100.0;
                                y = Math.round(y * 100.0) / 100.0;
                                knot = Math.round(knot * 100.0) / 100.0;
                                shape.setLastX(x);
                                shape.setLastY(y);
                            }
                            return "";
                        };
                        return SplineKnot;
                    }(com.mxgraph.io.vsdx.geometry.Row));
                    geometry.SplineKnot = SplineKnot;
                    SplineKnot["__class"] = "com.mxgraph.io.vsdx.geometry.SplineKnot";
                })(geometry = vsdx.geometry || (vsdx.geometry = {}));
            })(vsdx = io.vsdx || (io.vsdx = {}));
        })(io = mxgraph.io || (mxgraph.io = {}));
    })(mxgraph = com.mxgraph || (com.mxgraph = {}));
})(com || (com = {}));
(function (com) {
    var mxgraph;
    (function (mxgraph) {
        var io;
        (function (io) {
            var vsdx;
            (function (vsdx) {
                var geometry;
                (function (geometry) {
                    var SplineStart = (function (_super) {
                        __extends(SplineStart, _super);
                        function SplineStart(index, x, y, a, b, c, d) {
                            var _this = _super.call(this, index, x, y) || this;
                            _this.a = a;
                            _this.b = b;
                            _this.c = c;
                            _this.d = d;
                            return _this;
                        }
                        /**
                         *
                         * @param {mxPoint} p
                         * @param {com.mxgraph.io.vsdx.Shape} shape
                         * @return {string}
                         */
                        SplineStart.prototype.handle = function (p, shape) {
                            if (this.x != null && this.y != null && this.a != null && this.b != null && this.c != null && this.d != null) {
                                var h = shape.getHeight();
                                var w = shape.getWidth();
                                var x = this.x * com.mxgraph.io.vsdx.mxVsdxUtils.conversionFactor_$LI$();
                                var y = this.y * com.mxgraph.io.vsdx.mxVsdxUtils.conversionFactor_$LI$();
                                var c = this.c;
                                var d = (this.d | 0);
                                var lastKnot = c;
                                shape.setLastKnot(lastKnot);
                                var degree = d;
                                y = 100 - y;
                                x = Math.round(x * 100.0) / 100.0;
                                y = Math.round(y * 100.0) / 100.0;
                                lastKnot = Math.round(lastKnot * 100.0) / 100.0;
                                var x0 = shape.getLastX() * w / 100.0;
                                var y0 = shape.getLastY() * h / 100.0;
                                shape.setLastX(x);
                                shape.setLastY(y);
                                return "<curve ";
                            }
                            return "";
                        };
                        return SplineStart;
                    }(com.mxgraph.io.vsdx.geometry.Row));
                    geometry.SplineStart = SplineStart;
                    SplineStart["__class"] = "com.mxgraph.io.vsdx.geometry.SplineStart";
                })(geometry = vsdx.geometry || (vsdx.geometry = {}));
            })(vsdx = io.vsdx || (io.vsdx = {}));
        })(io = mxgraph.io || (mxgraph.io = {}));
    })(mxgraph = com.mxgraph || (com.mxgraph = {}));
})(com || (com = {}));
(function (com) {
    var mxgraph;
    (function (mxgraph) {
        var io;
        (function (io) {
            var vsdx;
            (function (vsdx) {
                /**
                 * Create a new instance of mxGeneralShape
                 * @param {*} shape Shape Element to be wrapped.
                 * @param {com.mxgraph.io.vsdx.mxVsdxModel} model
                 * @class
                 */
                var Style = (function () {
                    function Style(shape, model) {
                        this.cellElements = ({});
                        this.sections = ({});
                        /**
                         * Mapping of line,text and fill styles to the style parents
                         */
                        this.styleParents = ({});
                        this.shape = null;
                        this.Id = null;
                        this.pm = null;
                        this.style = null;
                        this.shape = shape;
                        this.pm = model.getPropertiesManager();
                        var Id = shape.getAttribute(com.mxgraph.io.vsdx.mxVsdxConstants.ID);
                        try {
                            this.Id = (Id != null && !(Id.length === 0)) ? parseFloat(Id) : -1;
                        }
                        catch (e) {
                            this.Id = -1;
                        }
                        ;
                        this.cacheCells(model);
                        this.stylesheetRefs(model);
                    }
                    Style.__static_initialize = function () { if (!Style.__static_initialized) {
                        Style.__static_initialized = true;
                        Style.__static_initializer_0();
                        Style.__static_initializer_1();
                    } };
                    Style.styleTypes_$LI$ = function () { Style.__static_initialize(); if (Style.styleTypes == null)
                        Style.styleTypes = ({}); return Style.styleTypes; };
                    ;
                    Style.__static_initializer_0 = function () {
                        /* put */ (Style.styleTypes_$LI$()[com.mxgraph.io.vsdx.mxVsdxConstants.FILL] = com.mxgraph.io.vsdx.mxVsdxConstants.FILL_STYLE);
                        /* put */ (Style.styleTypes_$LI$()[com.mxgraph.io.vsdx.mxVsdxConstants.FILL_BKGND] = com.mxgraph.io.vsdx.mxVsdxConstants.FILL_STYLE);
                        /* put */ (Style.styleTypes_$LI$()[com.mxgraph.io.vsdx.mxVsdxConstants.FILL_BKGND_TRANS] = com.mxgraph.io.vsdx.mxVsdxConstants.FILL_STYLE);
                        /* put */ (Style.styleTypes_$LI$()[com.mxgraph.io.vsdx.mxVsdxConstants.FILL_FOREGND] = com.mxgraph.io.vsdx.mxVsdxConstants.FILL_STYLE);
                        /* put */ (Style.styleTypes_$LI$()[com.mxgraph.io.vsdx.mxVsdxConstants.FILL_FOREGND_TRANS] = com.mxgraph.io.vsdx.mxVsdxConstants.FILL_STYLE);
                        /* put */ (Style.styleTypes_$LI$()[com.mxgraph.io.vsdx.mxVsdxConstants.FILL_PATTERN] = com.mxgraph.io.vsdx.mxVsdxConstants.FILL_STYLE);
                        /* put */ (Style.styleTypes_$LI$()[com.mxgraph.io.vsdx.mxVsdxConstants.SHDW_PATTERN] = com.mxgraph.io.vsdx.mxVsdxConstants.FILL_STYLE);
                        /* put */ (Style.styleTypes_$LI$()[com.mxgraph.io.vsdx.mxVsdxConstants.FILL_STYLE] = com.mxgraph.io.vsdx.mxVsdxConstants.FILL_STYLE);
                        /* put */ (Style.styleTypes_$LI$()["QuickStyleFillColor"] = com.mxgraph.io.vsdx.mxVsdxConstants.FILL_STYLE);
                        /* put */ (Style.styleTypes_$LI$()["QuickStyleFillMatrix"] = com.mxgraph.io.vsdx.mxVsdxConstants.FILL_STYLE);
                        /* put */ (Style.styleTypes_$LI$()[com.mxgraph.io.vsdx.mxVsdxConstants.BEGIN_ARROW] = com.mxgraph.io.vsdx.mxVsdxConstants.LINE_STYLE);
                        /* put */ (Style.styleTypes_$LI$()[com.mxgraph.io.vsdx.mxVsdxConstants.END_ARROW] = com.mxgraph.io.vsdx.mxVsdxConstants.LINE_STYLE);
                        /* put */ (Style.styleTypes_$LI$()[com.mxgraph.io.vsdx.mxVsdxConstants.LINE_PATTERN] = com.mxgraph.io.vsdx.mxVsdxConstants.LINE_STYLE);
                        /* put */ (Style.styleTypes_$LI$()[com.mxgraph.io.vsdx.mxVsdxConstants.LINE_COLOR] = com.mxgraph.io.vsdx.mxVsdxConstants.LINE_STYLE);
                        /* put */ (Style.styleTypes_$LI$()[com.mxgraph.io.vsdx.mxVsdxConstants.LINE_COLOR_TRANS] = com.mxgraph.io.vsdx.mxVsdxConstants.LINE_STYLE);
                        /* put */ (Style.styleTypes_$LI$()[com.mxgraph.io.vsdx.mxVsdxConstants.LINE_WEIGHT] = com.mxgraph.io.vsdx.mxVsdxConstants.LINE_STYLE);
                        /* put */ (Style.styleTypes_$LI$()["QuickStyleLineColor"] = com.mxgraph.io.vsdx.mxVsdxConstants.LINE_STYLE);
                        /* put */ (Style.styleTypes_$LI$()["QuickStyleLineMatrix"] = com.mxgraph.io.vsdx.mxVsdxConstants.LINE_STYLE);
                        /* put */ (Style.styleTypes_$LI$()[com.mxgraph.io.vsdx.mxVsdxConstants.BEGIN_ARROW_SIZE] = com.mxgraph.io.vsdx.mxVsdxConstants.LINE_STYLE);
                        /* put */ (Style.styleTypes_$LI$()[com.mxgraph.io.vsdx.mxVsdxConstants.END_ARROW_SIZE] = com.mxgraph.io.vsdx.mxVsdxConstants.LINE_STYLE);
                        /* put */ (Style.styleTypes_$LI$()[com.mxgraph.io.vsdx.mxVsdxConstants.TEXT_BKGND] = com.mxgraph.io.vsdx.mxVsdxConstants.TEXT_STYLE);
                        /* put */ (Style.styleTypes_$LI$()[com.mxgraph.io.vsdx.mxVsdxConstants.BOTTOM_MARGIN] = com.mxgraph.io.vsdx.mxVsdxConstants.TEXT_STYLE);
                        /* put */ (Style.styleTypes_$LI$()[com.mxgraph.io.vsdx.mxVsdxConstants.LEFT_MARGIN] = com.mxgraph.io.vsdx.mxVsdxConstants.TEXT_STYLE);
                        /* put */ (Style.styleTypes_$LI$()[com.mxgraph.io.vsdx.mxVsdxConstants.RIGHT_MARGIN] = com.mxgraph.io.vsdx.mxVsdxConstants.TEXT_STYLE);
                        /* put */ (Style.styleTypes_$LI$()[com.mxgraph.io.vsdx.mxVsdxConstants.TOP_MARGIN] = com.mxgraph.io.vsdx.mxVsdxConstants.TEXT_STYLE);
                        /* put */ (Style.styleTypes_$LI$()[com.mxgraph.io.vsdx.mxVsdxConstants.PARAGRAPH] = com.mxgraph.io.vsdx.mxVsdxConstants.TEXT_STYLE);
                        /* put */ (Style.styleTypes_$LI$()[com.mxgraph.io.vsdx.mxVsdxConstants.CHARACTER] = com.mxgraph.io.vsdx.mxVsdxConstants.TEXT_STYLE);
                        /* put */ (Style.styleTypes_$LI$()["QuickStyleFontColor"] = com.mxgraph.io.vsdx.mxVsdxConstants.TEXT_STYLE);
                        /* put */ (Style.styleTypes_$LI$()["QuickStyleFontMatrix"] = com.mxgraph.io.vsdx.mxVsdxConstants.TEXT_STYLE);
                    };
                    Style.prototype.getTheme = function () {
                        return null;
                    };
                    Style.prototype.getQuickStyleVals = function () {
                        return null;
                    };
                    Style.prototype.isVertex = function () {
                        return false;
                    };
                    Style.prototype.styleDebug = function (debug) {
                        if (Style.vsdxStyleDebug) {
                            console.info(debug);
                        }
                    };
                    Style.prototype.stylesheetRefs = function (model) {
                        /* put */ (this.styleParents[com.mxgraph.io.vsdx.mxVsdxConstants.FILL_STYLE] = model.getStylesheet(this.shape.getAttribute(com.mxgraph.io.vsdx.mxVsdxConstants.FILL_STYLE)));
                        /* put */ (this.styleParents[com.mxgraph.io.vsdx.mxVsdxConstants.LINE_STYLE] = model.getStylesheet(this.shape.getAttribute(com.mxgraph.io.vsdx.mxVsdxConstants.LINE_STYLE)));
                        /* put */ (this.styleParents[com.mxgraph.io.vsdx.mxVsdxConstants.TEXT_STYLE] = model.getStylesheet(this.shape.getAttribute(com.mxgraph.io.vsdx.mxVsdxConstants.TEXT_STYLE)));
                        var style = model.getStylesheet("0");
                        this.style = style;
                    };
                    /**
                     * Checks if the shape Element has a children with tag name = 'tag'.
                     * @param tag Name of the Element to be found.
                     * @return {void} Returns <code>true</code> if the shape Element has a children with tag name = 'tag'
                     * @param {com.mxgraph.io.vsdx.mxVsdxModel} model
                     */
                    Style.prototype.cacheCells = function (model) {
                        if (this.shape != null) {
                            var children = this.shape.childNodes;
                            if (children != null) {
                                var childNode = children.item(0);
                                while ((childNode != null)) {
                                    if (childNode != null && (childNode.nodeType == 1)) {
                                        this.parseShapeElem(childNode, model);
                                    }
                                    childNode = childNode.nextSibling;
                                }
                                ;
                            }
                        }
                    };
                    /**
                     * Caches the specified element
                     * @param {*} elem the element to cache
                     * @param {com.mxgraph.io.vsdx.mxVsdxModel} model
                     */
                    Style.prototype.parseShapeElem = function (elem, model) {
                        var childName = elem.nodeName;
                        if ((function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(childName, "Cell")) {
                            /* put */ (this.cellElements[elem.getAttribute("N")] = elem);
                        }
                        else if ((function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(childName, "Section")) {
                            this.parseSection(elem);
                        }
                    };
                    /**
                     * Caches the specific section element
                     * @param {*} elem the element to cache
                     */
                    Style.prototype.parseSection = function (elem) {
                        var sect = new com.mxgraph.io.vsdx.Section(elem);
                        /* put */ (this.sections[elem.getAttribute("N")] = sect);
                    };
                    /**
                     * Checks if the 'primary' Element has a child with tag name = 'tag'.
                     * @param {string} tag Name of the Element to be found.
                     * @return {boolean} Returns <code>true</code> if the 'primary' Element has a child with tag name = 'tag'.
                     * @param {string} nodeName
                     */
                    Style.prototype.hasProperty = function (nodeName, tag) {
                        return this.cellElements.hasOwnProperty(tag);
                    };
                    /**
                     * Returns the value of the element
                     * @param {*} elem The element whose value is to be found
                     * @param {string} defaultValue the value to return if there is no value attribute
                     * @return {string} String value of the element, or the default value if no value found
                     */
                    Style.prototype.getValue = function (elem, defaultValue) {
                        if (elem != null) {
                            return elem.getAttribute("V") || "";
                        }
                        return defaultValue;
                    };
                    /**
                     * Returns the value of the element as a double
                     * @param elem The element whose value is to be found
                     * @param {number} defaultValue the value to return if there is no value attribute
                     * @return {number} double value of the element, or the default value if no value found
                     * @param {*} cell
                     */
                    Style.prototype.getValueAsDouble = function (cell, defaultValue) {
                        if (cell != null) {
                            var value = cell.getAttribute("V");
                            if (value != null) {
                                if ((function (o1, o2) { if (o1 && o1.equals) {
                                    return o1.equals(o2);
                                }
                                else {
                                    return o1 === o2;
                                } })(value, "Themed")) {
                                    return 0;
                                }
                                try {
                                    var parsedValue = parseFloat(value);
                                    var units = cell.getAttribute("U");
                                    if ((function (o1, o2) { if (o1 && o1.equals) {
                                        return o1.equals(o2);
                                    }
                                    else {
                                        return o1 === o2;
                                    } })(units, "PT")) {
                                        parsedValue = parsedValue * com.mxgraph.io.vsdx.mxVsdxUtils.conversionFactor_$LI$();
                                    }
                                    return Math.round(parsedValue * 100.0) / 100.0;
                                }
                                catch (e) {
                                    //console.error(e.message, e);
                                }
                                ;
                            }
                        }
                        return defaultValue;
                    };
                    Style.prototype.getScreenNumericalValue$org_w3c_dom_Element$double = function (cell, defaultValue) {
                        if (cell != null) {
                            var value = cell.getAttribute("V");
                            if (value != null) {
                                try {
                                    var parsedValue = parseFloat(value);
                                    return this.getScreenNumericalValue$double(parsedValue);
                                }
                                catch (e) {
                                    //console.error(e.message, e);
                                }
                                ;
                            }
                        }
                        return defaultValue;
                    };
                    /**
                     * Returns the value of the element as a double
                     * @param elem The element whose value is to be found
                     * @param {number} defaultValue the value to return if there is no value attribute
                     * @return {number} double value of the element, or the default value if no value found
                     * @param {*} cell
                     */
                    Style.prototype.getScreenNumericalValue = function (cell, defaultValue) {
                        if (((cell != null && (cell.nodeType == 1)) || cell === null) && ((typeof defaultValue === 'number') || defaultValue === null)) {
                            return this.getScreenNumericalValue$org_w3c_dom_Element$double(cell, defaultValue);
                        }
                        else if (((typeof cell === 'number') || cell === null) && defaultValue === undefined) {
                            return this.getScreenNumericalValue$double(cell);
                        }
                        else
                            throw new Error('invalid overload');
                    };
                    Style.prototype.getScreenNumericalValue$double = function (val) {
                        var conVal = val * com.mxgraph.io.vsdx.mxVsdxUtils.conversionFactor_$LI$();
                        return conVal;
                    };
                    /**
                     * Returns the value of the attribute of the element with tag name = 'tag' in the children
                     * of the shape element<br/>
                     * @param {string} tag Name of the Element to be found.
                     * @return {string} Numerical value of the element.
                     * @param {string} attribute
                     * @param {string} defaultValue
                     */
                    Style.prototype.getAttribute = function (tag, attribute, defaultValue) {
                        var result = defaultValue;
                        var cell = (function (m, k) { return m[k] ? m[k] : null; })(this.cellElements, tag);
                        if (cell != null) {
                            result = cell.getAttribute(attribute) || "";
                        }
                        return result;
                    };
                    Style.prototype.getChildValues = function (parent, requiredValues) {
                        var result = ({});
                        var child = parent.firstChild;
                        while ((child != null)) {
                            if (child != null && (child.nodeType == 1)) {
                                var childElem = child;
                                var childName = childElem.nodeName;
                                var name_9 = null;
                                var nodeValue = null;
                                if ((function (o1, o2) { if (o1 && o1.equals) {
                                    return o1.equals(o2);
                                }
                                else {
                                    return o1 === o2;
                                } })(childName, "Cell")) {
                                    name_9 = childElem.getAttribute("N") || "";
                                    nodeValue = childElem.getAttribute("V") || "";
                                }
                                else {
                                    name_9 = childElem.nodeName;
                                    nodeValue = childElem.textContent;
                                }
                                if (requiredValues != null) {
                                    var nodeOverride = (function (m, k) { return m[k] ? m[k] : null; })(requiredValues, name_9);
                                    if (nodeOverride != null) {
                                        nodeValue = childElem.getAttribute(nodeOverride) || "";
                                    }
                                }
                                /* put */ (result[name_9] = nodeValue);
                            }
                            child = child.nextSibling;
                        }
                        ;
                        return result;
                    };
                    Style.prototype.getCellElement$java_lang_String$java_lang_String$java_lang_String = function (cellKey, index, sectKey) {
                        var sect = (function (m, k) { return m[k] ? m[k] : null; })(this.sections, sectKey);
                        var elem = null;
                        var inherit = false;
                        if (sect != null) {
                            elem = sect.getIndexedCell(index, cellKey);
                        }
                        if (elem != null) {
                            var form = elem.getAttribute("F");
                            var value = elem.getAttribute("V");
                            if (form != null && value != null) {
                                if ((function (o1, o2) { if (o1 && o1.equals) {
                                    return o1.equals(o2);
                                }
                                else {
                                    return o1 === o2;
                                } })(form, "Inh") && (function (o1, o2) { if (o1 && o1.equals) {
                                    return o1.equals(o2);
                                }
                                else {
                                    return o1 === o2;
                                } })(value, "Themed")) {
                                    inherit = true;
                                }
                                else if ((function (o1, o2) { if (o1 && o1.equals) {
                                    return o1.equals(o2);
                                }
                                else {
                                    return o1 === o2;
                                } })(form, "THEMEVAL()") && (function (o1, o2) { if (o1 && o1.equals) {
                                    return o1.equals(o2);
                                }
                                else {
                                    return o1 === o2;
                                } })(value, "Themed") && this.style != null) {
                                    if ((function (o1, o2) { if (o1 && o1.equals) {
                                        return o1.equals(o2);
                                    }
                                    else {
                                        return o1 === o2;
                                    } })(com.mxgraph.io.vsdx.mxVsdxConstants.COLOR, cellKey))
                                        return elem;
                                    var themeElem = this.style.getCellElement$java_lang_String$java_lang_String$java_lang_String(cellKey, index, sectKey);
                                    if (themeElem != null) {
                                        return themeElem;
                                    }
                                }
                            }
                        }
                        if (elem == null || inherit) {
                            var styleType = (function (m, k) { return m[k] ? m[k] : null; })(Style.styleTypes_$LI$(), sectKey);
                            var parentStyle = (function (m, k) { return m[k] ? m[k] : null; })(this.styleParents, styleType);
                            if (parentStyle != null) {
                                var parentElem = parentStyle.getCellElement$java_lang_String$java_lang_String$java_lang_String(cellKey, index, sectKey);
                                if (parentElem != null) {
                                    return parentElem;
                                }
                            }
                        }
                        return elem;
                    };
                    Style.prototype.getCellElement = function (cellKey, index, sectKey) {
                        if (((typeof cellKey === 'string') || cellKey === null) && ((typeof index === 'string') || index === null) && ((typeof sectKey === 'string') || sectKey === null)) {
                            return this.getCellElement$java_lang_String$java_lang_String$java_lang_String(cellKey, index, sectKey);
                        }
                        else if (((typeof cellKey === 'string') || cellKey === null) && index === undefined && sectKey === undefined) {
                            return this.getCellElement$java_lang_String(cellKey);
                        }
                        else
                            throw new Error('invalid overload');
                    };
                    Style.prototype.getCellElement$java_lang_String = function (key) {
                        var elem = (function (m, k) { return m[k] ? m[k] : null; })(this.cellElements, key);
                        var inherit = false;
                        if (elem != null) {
                            var form = elem.getAttribute("F");
                            var value = elem.getAttribute("V");
                            if (form != null && value != null) {
                                if ((function (o1, o2) { if (o1 && o1.equals) {
                                    return o1.equals(o2);
                                }
                                else {
                                    return o1 === o2;
                                } })(form, "Inh") && (function (o1, o2) { if (o1 && o1.equals) {
                                    return o1.equals(o2);
                                }
                                else {
                                    return o1 === o2;
                                } })(value, "Themed")) {
                                    inherit = true;
                                }
                                else if (form.indexOf("THEMEVAL()") != -1 && (function (o1, o2) { if (o1 && o1.equals) {
                                    return o1.equals(o2);
                                }
                                else {
                                    return o1 === o2;
                                } })(value, "Themed") && this.style != null) {
                                    if ((function (o1, o2) { if (o1 && o1.equals) {
                                        return o1.equals(o2);
                                    }
                                    else {
                                        return o1 === o2;
                                    } })("FillForegnd", key) || (function (o1, o2) { if (o1 && o1.equals) {
                                        return o1.equals(o2);
                                    }
                                    else {
                                        return o1 === o2;
                                    } })(com.mxgraph.io.vsdx.mxVsdxConstants.LINE_COLOR, key) || (function (o1, o2) { if (o1 && o1.equals) {
                                        return o1.equals(o2);
                                    }
                                    else {
                                        return o1 === o2;
                                    } })(com.mxgraph.io.vsdx.mxVsdxConstants.LINE_PATTERN, key) || (function (o1, o2) { if (o1 && o1.equals) {
                                        return o1.equals(o2);
                                    }
                                    else {
                                        return o1 === o2;
                                    } })(com.mxgraph.io.vsdx.mxVsdxConstants.BEGIN_ARROW_SIZE, key) || (function (o1, o2) { if (o1 && o1.equals) {
                                        return o1.equals(o2);
                                    }
                                    else {
                                        return o1 === o2;
                                    } })(com.mxgraph.io.vsdx.mxVsdxConstants.END_ARROW_SIZE, key) || (function (o1, o2) { if (o1 && o1.equals) {
                                        return o1.equals(o2);
                                    }
                                    else {
                                        return o1 === o2;
                                    } })(com.mxgraph.io.vsdx.mxVsdxConstants.BEGIN_ARROW, key) || (function (o1, o2) { if (o1 && o1.equals) {
                                        return o1.equals(o2);
                                    }
                                    else {
                                        return o1 === o2;
                                    } })(com.mxgraph.io.vsdx.mxVsdxConstants.END_ARROW, key) || (function (o1, o2) { if (o1 && o1.equals) {
                                        return o1.equals(o2);
                                    }
                                    else {
                                        return o1 === o2;
                                    } })(com.mxgraph.io.vsdx.mxVsdxConstants.LINE_WEIGHT, key))
                                        return elem;
                                    var themeElem = this.style.getCellElement$java_lang_String(key);
                                    if (themeElem != null) {
                                        return themeElem;
                                    }
                                }
                            }
                        }
                        if (elem == null || inherit) {
                            var styleType = (function (m, k) { return m[k] ? m[k] : null; })(Style.styleTypes_$LI$(), key);
                            var parentStyle = (function (m, k) { return m[k] ? m[k] : null; })(this.styleParents, styleType);
                            if (parentStyle != null) {
                                var parentElem = parentStyle.getCellElement$java_lang_String(key);
                                if (parentElem != null) {
                                    return parentElem;
                                }
                            }
                        }
                        return elem;
                    };
                    /**
                     * Returns the line color.<br/>
                     * The property may to be defined in master shape or line stylesheet.<br/>
                     * @return {string} hexadecimal representation of the color.
                     */
                    Style.prototype.getStrokeColor = function () {
                        var color = "";
                        if ((function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(this.getValue(this.getCellElement$java_lang_String(com.mxgraph.io.vsdx.mxVsdxConstants.LINE_PATTERN), "1"), "0")) {
                            color = "none";
                        }
                        else {
                            color = this.getColor(this.getCellElement$java_lang_String(com.mxgraph.io.vsdx.mxVsdxConstants.LINE_COLOR));
                            if ((function (o1, o2) { if (o1 && o1.equals) {
                                return o1.equals(o2);
                            }
                            else {
                                return o1 === o2;
                            } })("Themed", color)) {
                                var theme_7 = this.getTheme();
                                if (theme_7 != null) {
                                    var colorObj = this.isVertex() ? theme_7.getLineColor$com_mxgraph_io_vsdx_theme_QuickStyleVals(this.getQuickStyleVals()) : theme_7.getConnLineColor(this.getQuickStyleVals());
                                    color = colorObj.toHexStr();
                                }
                                else {
                                    color = "";
                                }
                            }
                        }
                        return color;
                    };
                    /**
                     * Returns the shape's color.
                     * The property may to be defined in master shape or fill stylesheet.
                     * If the color is the background or the fore color, it depends on the pattern.
                     * For simple gradients and solid, returns the fore color, else return the
                     * background color.
                     * @return {string} hexadecimal representation of the color.
                     */
                    Style.prototype.getFillColor = function () {
                        var fillGradientEnabled = this.getValue(this.getCellElement$java_lang_String(com.mxgraph.io.vsdx.mxVsdxConstants.FILL_GRADIENT_ENABLED), "0");
                        if ((function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })("1", fillGradientEnabled)) {
                            var fillGradient = (function (m, k) { return m[k] ? m[k] : null; })(this.sections, "FillGradient");
                            if (fillGradient != null) {
                                var color = this.getColor(fillGradient.getIndexedCell("0", "GradientStopColor"));
                                if (color != null && !(color.length === 0))
                                    return color;
                            }
                        }
                        var fillForeColor = this.getColor(this.getCellElement$java_lang_String(com.mxgraph.io.vsdx.mxVsdxConstants.FILL_FOREGND));
                        if ((function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })("Themed", fillForeColor)) {
                            var theme_8 = this.getTheme();
                            if (theme_8 != null) {
                                var color = theme_8.getFillColor$com_mxgraph_io_vsdx_theme_QuickStyleVals(this.getQuickStyleVals());
                                fillForeColor = color.toHexStr();
                            }
                            else {
                                fillForeColor = "#FFFFFF";
                            }
                        }
                        var fillPattern = this.getValue(this.getCellElement$java_lang_String(com.mxgraph.io.vsdx.mxVsdxConstants.FILL_PATTERN), "0");
                        if (fillPattern != null && (function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(fillPattern, "0")) {
                            return "none";
                        }
                        else {
                            return fillForeColor;
                        }
                    };
                    Style.prototype.getColor = function (elem) {
                        var color = this.getValue(elem, "");
                        if (!(function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })("Themed", color) && !(function (str, searchString, position) {
                            if (position === void 0) { position = 0; }
                            return str.substr(position, searchString.length) === searchString;
                        })(color, "#")) {
                            color = this.pm.getColor(color);
                        }
                        return color;
                    };
                    /**
                     * The TextBkgnd cell can have any value from 0 through 24, or 255. The values 0 and 255 (visTxtBlklOpaque) both indicate a transparent text background.
                     * To enter a custom color, use the RGB or HSL function plus one—for example, RGB(255,127,255)+1. The value of a custom color is its RGB color, and RGB(r, g, b)+1,
                     * rather than a number, will be shown in the ShapeSheet window. When used in numeric operations, custom colors have values of 25 and above.
                     * You can set the transparency of the text background color in the TextBkgndTrans cell.
                     * @param {*} elem
                     * @return {string}
                     */
                    Style.prototype.getTextBkgndColor = function (elem) {
                        var color = this.getValue(elem, "");
                        if (!(function (str, searchString, position) {
                            if (position === void 0) { position = 0; }
                            return str.substr(position, searchString.length) === searchString;
                        })(color, "#")) {
                            if ((function (o1, o2) { if (o1 && o1.equals) {
                                return o1.equals(o2);
                            }
                            else {
                                return o1 === o2;
                            } })(color, "0") || (function (o1, o2) { if (o1 && o1.equals) {
                                return o1.equals(o2);
                            }
                            else {
                                return o1 === o2;
                            } })(color, "255") || (color.length === 0)) {
                                return "none";
                            }
                            return this.pm.getColor(/* valueOf */ new String(/* parseInt */ parseInt(color) - 1).toString());
                        }
                        return color;
                    };
                    /**
                     * Returns the line weight of the shape in pixels
                     * @return {number} Numerical value of the LineWeight element.
                     */
                    Style.prototype.getLineWeight = function () {
                        return this.getScreenNumericalValue$org_w3c_dom_Element$double(this.getCellElement$java_lang_String(com.mxgraph.io.vsdx.mxVsdxConstants.LINE_WEIGHT), 0);
                    };
                    /**
                     * Returns the level of transparency of the Shape.
                     * @return {number} double in range (opaque = 0)..(100 = transparent)
                     */
                    Style.prototype.getStrokeTransparency = function () {
                        return this.getValueAsDouble(this.getCellElement$java_lang_String(com.mxgraph.io.vsdx.mxVsdxConstants.LINE_COLOR_TRANS), 0);
                    };
                    /**
                     * Returns the NameU attribute.
                     * @return {string} Value of the NameU attribute.
                     */
                    Style.prototype.getNameU = function () {
                        return this.shape.getAttribute(com.mxgraph.io.vsdx.mxVsdxConstants.NAME_U) || "";
                    };
                    /**
                     * Returns the Name attribute.
                     * @return {string} Value of the Name attribute (Human readable name).
                     */
                    Style.prototype.getName = function () {
                        return this.shape.getAttribute(com.mxgraph.io.vsdx.mxVsdxConstants.NAME) || "";
                    };
                    /**
                     * Returns the UniqueID attribute.
                     * @return {string} Value of the UniqueID attribute.
                     */
                    Style.prototype.getUniqueID = function () {
                        return this.shape.getAttribute(com.mxgraph.io.vsdx.mxVsdxConstants.UNIQUE_ID) || "";
                    };
                    /**
                     * Returns the value of the Id attribute.
                     * @return {number} Value of the Id attribute.
                     */
                    Style.prototype.getId = function () {
                        return this.Id;
                    };
                    /**
                     * Returns the color of one text fragment
                     * @param charIX IX attribute of Char element
                     * @return {string} Text color in hexadecimal representation.
                     * @param {string} index
                     */
                    Style.prototype.getTextColor = function (index) {
                        var colorElem = this.getCellElement$java_lang_String$java_lang_String$java_lang_String(com.mxgraph.io.vsdx.mxVsdxConstants.COLOR, index, com.mxgraph.io.vsdx.mxVsdxConstants.CHARACTER);
                        var color = this.getValue(colorElem, "#000000");
                        if ((function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })("Themed", color)) {
                            var theme_9 = this.getTheme();
                            if (theme_9 != null) {
                                var colorObj = this.isVertex() ? theme_9.getFontColor$com_mxgraph_io_vsdx_theme_QuickStyleVals(this.getQuickStyleVals()) : theme_9.getConnFontColor(this.getQuickStyleVals());
                                color = colorObj.toHexStr();
                            }
                            else {
                                color = "#000000";
                            }
                        }
                        else if (!(function (str, searchString, position) {
                            if (position === void 0) { position = 0; }
                            return str.substr(position, searchString.length) === searchString;
                        })(color, "#")) {
                            color = this.pm.getColor(color);
                        }
                        return color;
                    };
                    /**
                     * Returns the top margin of text in pixels.
                     * @return {number} Numerical value of the TopMargin element
                     */
                    Style.prototype.getTextTopMargin = function () {
                        return this.getScreenNumericalValue$org_w3c_dom_Element$double(this.getCellElement$java_lang_String(com.mxgraph.io.vsdx.mxVsdxConstants.TOP_MARGIN), 0);
                    };
                    /**
                     * Returns the bottom margin of text in pixels.
                     * @return {number} Numerical value of the BottomMargin element.
                     */
                    Style.prototype.getTextBottomMargin = function () {
                        return this.getScreenNumericalValue$org_w3c_dom_Element$double(this.getCellElement$java_lang_String(com.mxgraph.io.vsdx.mxVsdxConstants.BOTTOM_MARGIN), 0);
                    };
                    /**
                     * Returns the left margin of text in pixels.
                     * @return {number} Numerical value of the LeftMargin element.
                     */
                    Style.prototype.getTextLeftMargin = function () {
                        return this.getScreenNumericalValue$org_w3c_dom_Element$double(this.getCellElement$java_lang_String(com.mxgraph.io.vsdx.mxVsdxConstants.LEFT_MARGIN), 0);
                    };
                    /**
                     * Returns the right margin of text in pixels.
                     * @return {number} Numerical value of the RightMargin element.
                     */
                    Style.prototype.getTextRightMargin = function () {
                        return this.getScreenNumericalValue$org_w3c_dom_Element$double(this.getCellElement$java_lang_String(com.mxgraph.io.vsdx.mxVsdxConstants.RIGHT_MARGIN), 0);
                    };
                    /**
                     * Returns the style of one text fragment.
                     * @param charIX IX attribute of Char element
                     * @return {string} String value of the Style element.
                     * @param {string} index
                     */
                    Style.prototype.getTextStyle = function (index) {
                        var styleElem = this.getCellElement$java_lang_String$java_lang_String$java_lang_String(com.mxgraph.io.vsdx.mxVsdxConstants.STYLE, index, com.mxgraph.io.vsdx.mxVsdxConstants.CHARACTER);
                        return this.getValue(styleElem, "");
                    };
                    /**
                     * Returns the font of one text fragment
                     * @param charIX IX attribute of Char element
                     * @return {string} Name of the font.
                     * @param {string} index
                     */
                    Style.prototype.getTextFont = function (index) {
                        var fontElem = this.getCellElement$java_lang_String$java_lang_String$java_lang_String(com.mxgraph.io.vsdx.mxVsdxConstants.FONT, index, com.mxgraph.io.vsdx.mxVsdxConstants.CHARACTER);
                        return this.getValue(fontElem, "");
                    };
                    /**
                     * Returns the position of one text fragment
                     * @param charIX IX attribute of Char element
                     * @return {string} Integer value of the Pos element.
                     * @param {string} index
                     */
                    Style.prototype.getTextPos = function (index) {
                        var posElem = this.getCellElement$java_lang_String$java_lang_String$java_lang_String(com.mxgraph.io.vsdx.mxVsdxConstants.POS, index, com.mxgraph.io.vsdx.mxVsdxConstants.CHARACTER);
                        return this.getValue(posElem, "");
                    };
                    /**
                     * Checks if one text fragment is Strikethru
                     * @param charIX IX attribute of Char element
                     * @return {boolean} Returns <code>true</code> if one text fragment is Strikethru
                     * @param {string} index
                     */
                    Style.prototype.getTextStrike = function (index) {
                        var strikeElem = this.getCellElement$java_lang_String$java_lang_String$java_lang_String(com.mxgraph.io.vsdx.mxVsdxConstants.STRIKETHRU, index, com.mxgraph.io.vsdx.mxVsdxConstants.CHARACTER);
                        return (function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(this.getValue(strikeElem, ""), "1");
                    };
                    /**
                     * Returns the case property of one text fragment
                     * @param charIX IX attribute of Char element
                     * @return {string} Integer value of the Case element
                     * @param {string} index
                     */
                    Style.prototype.getTextCase = function (index) {
                        var caseElem = this.getCellElement$java_lang_String$java_lang_String$java_lang_String(com.mxgraph.io.vsdx.mxVsdxConstants.CASE, index, com.mxgraph.io.vsdx.mxVsdxConstants.CHARACTER);
                        return this.getValue(caseElem, "");
                    };
                    /**
                     * Returns the horizontal align property of a paragraph
                     * @param {string} index IX attribute of Para element
                     * @param {boolean} html whether to return the html values or mxGraph values
                     * @return {string} String value of the HorizontalAlign element.
                     */
                    Style.prototype.getHorizontalAlign = function (index, html) {
                        var ret = "center";
                        var horAlign = this.getCellElement$java_lang_String$java_lang_String$java_lang_String(com.mxgraph.io.vsdx.mxVsdxConstants.HORIZONTAL_ALIGN, index, com.mxgraph.io.vsdx.mxVsdxConstants.PARAGRAPH);
                        var align = this.getValue(horAlign, "");
                        switch ((align)) {
                            case "0":
                                ret = html ? "left" : mxConstants.ALIGN_LEFT;
                                break;
                            case "2":
                                ret = html ? "right" : mxConstants.ALIGN_RIGHT;
                                break;
                            case "3":
                            case "4":
                                ret = html ? "justify" : mxConstants.ALIGN_CENTER;
                                break;
                            default:
                                ret = html ? "center" : mxConstants.ALIGN_CENTER;
                        }
                        return ret;
                    };
                    /**
                     * Returns the first indent of one paragraph in pixels.
                     * @param paraIX IX attribute of Para element
                     * @return {string} String representation of the numerical value of the IndentFirst element.
                     * @param {string} index
                     */
                    Style.prototype.getIndentFirst = function (index) {
                        var indentFirstElem = this.getCellElement$java_lang_String$java_lang_String$java_lang_String(com.mxgraph.io.vsdx.mxVsdxConstants.INDENT_FIRST, index, com.mxgraph.io.vsdx.mxVsdxConstants.PARAGRAPH);
                        return new String(this.getScreenNumericalValue$org_w3c_dom_Element$double(indentFirstElem, 0)).toString();
                    };
                    /**
                     * Returns the indent to left of one paragraph
                     * @param paraIX IX attribute of Para element
                     * @return {string} String representation of the numerical value of the IndentLeft element.
                     * @param {string} index
                     */
                    Style.prototype.getIndentLeft = function (index) {
                        var indentLeftElem = this.getCellElement$java_lang_String$java_lang_String$java_lang_String(com.mxgraph.io.vsdx.mxVsdxConstants.INDENT_LEFT, index, com.mxgraph.io.vsdx.mxVsdxConstants.PARAGRAPH);
                        return new String((Math.round(this.getScreenNumericalValue$org_w3c_dom_Element$double(indentLeftElem, 0)) | 0)).toString();
                    };
                    /**
                     * Returns the indent to right of one paragraph
                     * @param paraIX IX attribute of Para element
                     * @return {string} String representation of the numerical value of the IndentRight element.
                     * @param {string} index
                     */
                    Style.prototype.getIndentRight = function (index) {
                        var indentRightElem = this.getCellElement$java_lang_String$java_lang_String$java_lang_String(com.mxgraph.io.vsdx.mxVsdxConstants.INDENT_RIGHT, index, com.mxgraph.io.vsdx.mxVsdxConstants.PARAGRAPH);
                        return new String((Math.round(this.getScreenNumericalValue$org_w3c_dom_Element$double(indentRightElem, 0)) | 0)).toString();
                    };
                    /**
                     * Returns the space before one paragraph.
                     * @param paraIX IX attribute of Para element
                     * @return {string} String representation of the numerical value of the SpBefore element.
                     * @param {string} index
                     */
                    Style.prototype.getSpBefore = function (index) {
                        var spBeforeElem = this.getCellElement$java_lang_String$java_lang_String$java_lang_String(com.mxgraph.io.vsdx.mxVsdxConstants.SPACE_BEFORE, index, com.mxgraph.io.vsdx.mxVsdxConstants.PARAGRAPH);
                        return new String((Math.round(this.getScreenNumericalValue$org_w3c_dom_Element$double(spBeforeElem, 0)) | 0)).toString();
                    };
                    /**
                     * Returns the space after one paragraph
                     * @param paraIX IX attribute of Para element
                     * @return {string} String representation of the numerical value of the SpAfter element.
                     * @param {string} index
                     */
                    Style.prototype.getSpAfter = function (index) {
                        var spAfterElem = this.getCellElement$java_lang_String$java_lang_String$java_lang_String(com.mxgraph.io.vsdx.mxVsdxConstants.SPACE_AFTER, index, com.mxgraph.io.vsdx.mxVsdxConstants.PARAGRAPH);
                        return new String((Math.round(this.getScreenNumericalValue$org_w3c_dom_Element$double(spAfterElem, 0)) | 0)).toString();
                    };
                    /**
                     * Returns the space between lines in one paragraph.
                     * @param paraIX IX attribute of Para element.
                     * @return {number} Double representation of the value of the SpLine element.
                     * @param {string} index
                     */
                    Style.prototype.getSpLine = function (index) {
                        var spLineElem = this.getCellElement$java_lang_String$java_lang_String$java_lang_String(com.mxgraph.io.vsdx.mxVsdxConstants.SPACE_LINE, index, com.mxgraph.io.vsdx.mxVsdxConstants.PARAGRAPH);
                        var val = this.getValue(spLineElem, "");
                        if (!(function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(val, "")) {
                            return parseFloat(val);
                        }
                        return 0;
                    };
                    /**
                     * Returns the flags of one paragraph.
                     * @param paraIX IX attribute of Para element.
                     * @return {string} String value of the Flags element.
                     * @param {string} index
                     */
                    Style.prototype.getFlags = function (index) {
                        var flagsElem = this.getCellElement$java_lang_String$java_lang_String$java_lang_String(com.mxgraph.io.vsdx.mxVsdxConstants.FLAGS, index, com.mxgraph.io.vsdx.mxVsdxConstants.PARAGRAPH);
                        return this.getValue(flagsElem, "0");
                    };
                    /**
                     * Returns the space between characters in one text fragment.
                     * @param paraIX IX attribute of Para element.
                     * @return {string} String representation of the numerical value of the Letterspace element.
                     * @param {string} index
                     */
                    Style.prototype.getLetterSpace = function (index) {
                        var letterSpaceElem = this.getCellElement$java_lang_String$java_lang_String$java_lang_String(com.mxgraph.io.vsdx.mxVsdxConstants.LETTER_SPACE, index, com.mxgraph.io.vsdx.mxVsdxConstants.PARAGRAPH);
                        return new String(this.getScreenNumericalValue$org_w3c_dom_Element$double(letterSpaceElem, 0)).toString();
                    };
                    /**
                     * Returns the bullet element value.
                     * @param paraIX IX attribute of Para element.
                     * @return {string} String value of the Bullet element.
                     * @param {string} index
                     */
                    Style.prototype.getBullet = function (index) {
                        var bulletElem = this.getCellElement$java_lang_String$java_lang_String$java_lang_String(com.mxgraph.io.vsdx.mxVsdxConstants.BULLET, index, com.mxgraph.io.vsdx.mxVsdxConstants.PARAGRAPH);
                        return this.getValue(bulletElem, "0");
                    };
                    Style.prototype.getShape = function () {
                        return this.shape;
                    };
                    Style.prototype.setShape = function (shape) {
                        this.shape = shape;
                    };
                    Style.lineDashPatterns_$LI$ = function () { Style.__static_initialize(); if (Style.lineDashPatterns == null)
                        Style.lineDashPatterns = ([]); return Style.lineDashPatterns; };
                    ;
                    Style.__static_initializer_1 = function () {
                        /* add */ (Style.lineDashPatterns_$LI$().push([]));
                        /* add */ (Style.lineDashPatterns_$LI$().push([]));
                        /* add */ (Style.lineDashPatterns_$LI$().push([]));
                        var lineDashPattern = ([]);
                        /* add */ (lineDashPattern.push(Style.DOT));
                        /* add */ (lineDashPattern.push(Style.SPACE));
                        /* add */ (Style.lineDashPatterns_$LI$().push(lineDashPattern));
                        lineDashPattern = ([]);
                        /* add */ (lineDashPattern.push(Style.DASH));
                        /* add */ (lineDashPattern.push(Style.SPACE));
                        /* add */ (lineDashPattern.push(Style.DOT));
                        /* add */ (lineDashPattern.push(Style.SPACE));
                        /* add */ (Style.lineDashPatterns_$LI$().push(lineDashPattern));
                        lineDashPattern = ([]);
                        /* add */ (lineDashPattern.push(Style.DASH));
                        /* add */ (lineDashPattern.push(Style.SPACE));
                        /* add */ (lineDashPattern.push(Style.DOT));
                        /* add */ (lineDashPattern.push(Style.SPACE));
                        /* add */ (lineDashPattern.push(Style.DOT));
                        /* add */ (lineDashPattern.push(Style.SPACE));
                        /* add */ (Style.lineDashPatterns_$LI$().push(lineDashPattern));
                        lineDashPattern = ([]);
                        /* add */ (lineDashPattern.push(Style.DASH));
                        /* add */ (lineDashPattern.push(Style.SPACE));
                        /* add */ (lineDashPattern.push(Style.DASH));
                        /* add */ (lineDashPattern.push(Style.SPACE));
                        /* add */ (lineDashPattern.push(Style.DOT));
                        /* add */ (lineDashPattern.push(Style.SPACE));
                        /* add */ (Style.lineDashPatterns_$LI$().push(lineDashPattern));
                        lineDashPattern = ([]);
                        /* add */ (lineDashPattern.push(Style.LONG_DASH));
                        /* add */ (lineDashPattern.push(Style.SPACE));
                        /* add */ (lineDashPattern.push(Style.SHORT_DASH));
                        /* add */ (lineDashPattern.push(Style.SPACE));
                        /* add */ (Style.lineDashPatterns_$LI$().push(lineDashPattern));
                        lineDashPattern = ([]);
                        /* add */ (lineDashPattern.push(Style.LONG_DASH));
                        /* add */ (lineDashPattern.push(Style.SPACE));
                        /* add */ (lineDashPattern.push(Style.SHORT_DASH));
                        /* add */ (lineDashPattern.push(Style.SPACE));
                        /* add */ (lineDashPattern.push(Style.SHORT_DASH));
                        /* add */ (lineDashPattern.push(Style.SPACE));
                        /* add */ (Style.lineDashPatterns_$LI$().push(lineDashPattern));
                        lineDashPattern = ([]);
                        /* add */ (lineDashPattern.push(Style.SHORT_DASH));
                        /* add */ (lineDashPattern.push(Style.SHORT_SPACE));
                        /* add */ (Style.lineDashPatterns_$LI$().push(lineDashPattern));
                        lineDashPattern = ([]);
                        /* add */ (lineDashPattern.push(Style.DOT));
                        /* add */ (lineDashPattern.push(Style.SHORT_SPACE));
                        /* add */ (Style.lineDashPatterns_$LI$().push(lineDashPattern));
                        lineDashPattern = ([]);
                        /* add */ (lineDashPattern.push(Style.SHORT_DASH));
                        /* add */ (lineDashPattern.push(Style.SHORT_SPACE));
                        /* add */ (lineDashPattern.push(Style.DOT));
                        /* add */ (lineDashPattern.push(Style.SHORT_SPACE));
                        /* add */ (Style.lineDashPatterns_$LI$().push(lineDashPattern));
                        lineDashPattern = ([]);
                        /* add */ (lineDashPattern.push(Style.SHORT_DASH));
                        /* add */ (lineDashPattern.push(Style.SHORT_SPACE));
                        /* add */ (lineDashPattern.push(Style.DOT));
                        /* add */ (lineDashPattern.push(Style.SHORT_SPACE));
                        /* add */ (lineDashPattern.push(Style.DOT));
                        /* add */ (lineDashPattern.push(Style.SHORT_SPACE));
                        /* add */ (Style.lineDashPatterns_$LI$().push(lineDashPattern));
                        lineDashPattern = ([]);
                        /* add */ (lineDashPattern.push(Style.SHORT_DASH));
                        /* add */ (lineDashPattern.push(Style.SHORT_SPACE));
                        /* add */ (lineDashPattern.push(Style.SHORT_DASH));
                        /* add */ (lineDashPattern.push(Style.SHORT_SPACE));
                        /* add */ (lineDashPattern.push(Style.DOT));
                        /* add */ (lineDashPattern.push(Style.SHORT_SPACE));
                        /* add */ (Style.lineDashPatterns_$LI$().push(lineDashPattern));
                        lineDashPattern = ([]);
                        /* add */ (lineDashPattern.push(Style.DASH));
                        /* add */ (lineDashPattern.push(Style.SHORT_SPACE));
                        /* add */ (lineDashPattern.push(Style.SHORT_DASH));
                        /* add */ (lineDashPattern.push(Style.SHORT_SPACE));
                        /* add */ (Style.lineDashPatterns_$LI$().push(lineDashPattern));
                        lineDashPattern = ([]);
                        /* add */ (lineDashPattern.push(Style.DASH));
                        /* add */ (lineDashPattern.push(Style.SHORT_SPACE));
                        /* add */ (lineDashPattern.push(Style.SHORT_DASH));
                        /* add */ (lineDashPattern.push(Style.SHORT_SPACE));
                        /* add */ (lineDashPattern.push(Style.SHORT_DASH));
                        /* add */ (lineDashPattern.push(Style.SHORT_SPACE));
                        /* add */ (Style.lineDashPatterns_$LI$().push(lineDashPattern));
                        lineDashPattern = ([]);
                        /* add */ (lineDashPattern.push(Style.LONG_DASH));
                        /* add */ (lineDashPattern.push(Style.LONG_SPACE));
                        /* add */ (Style.lineDashPatterns_$LI$().push(lineDashPattern));
                        lineDashPattern = ([]);
                        /* add */ (lineDashPattern.push(Style.DOT));
                        /* add */ (lineDashPattern.push(Style.LONG_SPACE));
                        /* add */ (Style.lineDashPatterns_$LI$().push(lineDashPattern));
                        lineDashPattern = ([]);
                        /* add */ (lineDashPattern.push(Style.LONG_DASH));
                        /* add */ (lineDashPattern.push(Style.LONG_SPACE));
                        /* add */ (lineDashPattern.push(Style.DOT));
                        /* add */ (lineDashPattern.push(Style.LONG_SPACE));
                        /* add */ (Style.lineDashPatterns_$LI$().push(lineDashPattern));
                        lineDashPattern = ([]);
                        /* add */ (lineDashPattern.push(Style.LONG_DASH));
                        /* add */ (lineDashPattern.push(Style.LONG_SPACE));
                        /* add */ (lineDashPattern.push(Style.DOT));
                        /* add */ (lineDashPattern.push(Style.LONG_SPACE));
                        /* add */ (lineDashPattern.push(Style.DOT));
                        /* add */ (lineDashPattern.push(Style.LONG_SPACE));
                        /* add */ (Style.lineDashPatterns_$LI$().push(lineDashPattern));
                        lineDashPattern = ([]);
                        /* add */ (lineDashPattern.push(Style.LONG_DASH));
                        /* add */ (lineDashPattern.push(Style.LONG_SPACE));
                        /* add */ (lineDashPattern.push(Style.LONG_DASH));
                        /* add */ (lineDashPattern.push(Style.LONG_SPACE));
                        /* add */ (lineDashPattern.push(Style.DOT));
                        /* add */ (lineDashPattern.push(Style.LONG_SPACE));
                        /* add */ (Style.lineDashPatterns_$LI$().push(lineDashPattern));
                        lineDashPattern = ([]);
                        /* add */ (lineDashPattern.push(Style.XLONG_DASH));
                        /* add */ (lineDashPattern.push(Style.LONG_SPACE));
                        /* add */ (lineDashPattern.push(Style.DASH));
                        /* add */ (lineDashPattern.push(Style.LONG_SPACE));
                        /* add */ (Style.lineDashPatterns_$LI$().push(lineDashPattern));
                        lineDashPattern = ([]);
                        /* add */ (lineDashPattern.push(Style.XLONG_DASH));
                        /* add */ (lineDashPattern.push(Style.LONG_SPACE));
                        /* add */ (lineDashPattern.push(Style.DASH));
                        /* add */ (lineDashPattern.push(Style.LONG_SPACE));
                        /* add */ (lineDashPattern.push(Style.DASH));
                        /* add */ (lineDashPattern.push(Style.LONG_SPACE));
                        /* add */ (Style.lineDashPatterns_$LI$().push(lineDashPattern));
                        lineDashPattern = ([]);
                        /* add */ (lineDashPattern.push(Style.XSHORT_DASH));
                        /* add */ (lineDashPattern.push(Style.SHORT_SPACE));
                        /* add */ (Style.lineDashPatterns_$LI$().push(lineDashPattern));
                    };
                    Style.getLineDashPattern = function (pattern) {
                        if (pattern >= 0 && pattern <= 23)
                            return Style.lineDashPatterns_$LI$()[pattern];
                        else
                            return Style.lineDashPatterns_$LI$()[0];
                    };
                    return Style;
                }());
                Style.__static_initialized = false;
                Style.vsdxStyleDebug = false;
                Style.SPACE = 4.0;
                Style.SHORT_SPACE = 2.0;
                Style.LONG_SPACE = 6.0;
                Style.DOT = 1.0;
                Style.DASH = 8.0;
                Style.LONG_DASH = 12.0;
                Style.SHORT_DASH = 4.0;
                Style.XLONG_DASH = 20.0;
                Style.XSHORT_DASH = 2.0;
                vsdx.Style = Style;
                Style["__class"] = "com.mxgraph.io.vsdx.Style";
            })(vsdx = io.vsdx || (io.vsdx = {}));
        })(io = mxgraph.io || (mxgraph.io = {}));
    })(mxgraph = com.mxgraph || (com.mxgraph = {}));
})(com || (com = {}));
(function (com) {
    var mxgraph;
    (function (mxgraph) {
        var io;
        (function (io) {
            var vsdx;
            (function (vsdx) {
                var theme;
                (function (theme) {
                    var HslClr = (function (_super) {
                        __extends(HslClr, _super);
                        function HslClr(hue, sat, lum) {
                            var _this = _super.call(this) || this;
                            _this.__com_mxgraph_io_vsdx_theme_HslClr_hue = 0;
                            _this.__com_mxgraph_io_vsdx_theme_HslClr_sat = 0;
                            _this.__com_mxgraph_io_vsdx_theme_HslClr_lum = 0;
                            _this.__com_mxgraph_io_vsdx_theme_HslClr_hue = hue / 360.0;
                            _this.__com_mxgraph_io_vsdx_theme_HslClr_sat = sat / 100.0;
                            _this.__com_mxgraph_io_vsdx_theme_HslClr_lum = lum / 100.0;
                            _this.color = new com.mxgraph.io.vsdx.theme.HSLColor(hue, sat, lum).toRgb();
                            return _this;
                        }
                        return HslClr;
                    }(com.mxgraph.io.vsdx.theme.OoxmlColor));
                    theme.HslClr = HslClr;
                    HslClr["__class"] = "com.mxgraph.io.vsdx.theme.HslClr";
                })(theme = vsdx.theme || (vsdx.theme = {}));
            })(vsdx = io.vsdx || (io.vsdx = {}));
        })(io = mxgraph.io || (mxgraph.io = {}));
    })(mxgraph = com.mxgraph || (com.mxgraph = {}));
})(com || (com = {}));
(function (com) {
    var mxgraph;
    (function (mxgraph) {
        var io;
        (function (io) {
            var vsdx;
            (function (vsdx) {
                var theme;
                (function (theme) {
                    var PrstClr = (function (_super) {
                        __extends(PrstClr, _super);
                        function PrstClr(val) {
                            var _this = _super.call(this) || this;
                            _this.val = null;
                            _this.val = val;
                            _this.color = new com.mxgraph.io.vsdx.theme.Color(255, 255, 255);
                            return _this;
                        }
                        return PrstClr;
                    }(com.mxgraph.io.vsdx.theme.OoxmlColor));
                    theme.PrstClr = PrstClr;
                    PrstClr["__class"] = "com.mxgraph.io.vsdx.theme.PrstClr";
                })(theme = vsdx.theme || (vsdx.theme = {}));
            })(vsdx = io.vsdx || (io.vsdx = {}));
        })(io = mxgraph.io || (mxgraph.io = {}));
    })(mxgraph = com.mxgraph || (com.mxgraph = {}));
})(com || (com = {}));
(function (com) {
    var mxgraph;
    (function (mxgraph) {
        var io;
        (function (io) {
            var vsdx;
            (function (vsdx) {
                var theme;
                (function (theme_10) {
                    var SchemeClr = (function (_super) {
                        __extends(SchemeClr, _super);
                        function SchemeClr(val) {
                            var _this = _super.call(this) || this;
                            _this.val = null;
                            _this.isDynamic = true;
                            _this.val = val;
                            return _this;
                        }
                        SchemeClr.prototype.calcColor = function (styleColor, theme) {
                            if (!(function (o1, o2) { if (o1 && o1.equals) {
                                return o1.equals(o2);
                            }
                            else {
                                return o1 === o2;
                            } })("phClr", this.val)) {
                                this.color = theme.getSchemeColor(this.val);
                                this.isDynamic = false;
                            }
                            else {
                                this.color = theme.getStyleColor(styleColor);
                            }
                            _super.prototype.calcColor.call(this, styleColor, theme);
                        };
                        return SchemeClr;
                    }(com.mxgraph.io.vsdx.theme.OoxmlColor));
                    theme_10.SchemeClr = SchemeClr;
                    SchemeClr["__class"] = "com.mxgraph.io.vsdx.theme.SchemeClr";
                })(theme = vsdx.theme || (vsdx.theme = {}));
            })(vsdx = io.vsdx || (io.vsdx = {}));
        })(io = mxgraph.io || (mxgraph.io = {}));
    })(mxgraph = com.mxgraph || (com.mxgraph = {}));
})(com || (com = {}));
(function (com) {
    var mxgraph;
    (function (mxgraph) {
        var io;
        (function (io) {
            var vsdx;
            (function (vsdx) {
                var theme;
                (function (theme) {
                    var ScrgbClr = (function (_super) {
                        __extends(ScrgbClr, _super);
                        function ScrgbClr(r, g, b) {
                            var _this = _super.call(this) || this;
                            _this.r = 0;
                            _this.g = 0;
                            _this.b = 0;
                            _this.r = r;
                            _this.g = g;
                            _this.b = b;
                            _this.color = new com.mxgraph.io.vsdx.theme.Color(r, g, b);
                            return _this;
                        }
                        return ScrgbClr;
                    }(com.mxgraph.io.vsdx.theme.OoxmlColor));
                    theme.ScrgbClr = ScrgbClr;
                    ScrgbClr["__class"] = "com.mxgraph.io.vsdx.theme.ScrgbClr";
                })(theme = vsdx.theme || (vsdx.theme = {}));
            })(vsdx = io.vsdx || (io.vsdx = {}));
        })(io = mxgraph.io || (mxgraph.io = {}));
    })(mxgraph = com.mxgraph || (com.mxgraph = {}));
})(com || (com = {}));
(function (com) {
    var mxgraph;
    (function (mxgraph) {
        var io;
        (function (io) {
            var vsdx;
            (function (vsdx) {
                var theme;
                (function (theme) {
                    var SrgbClr = (function (_super) {
                        __extends(SrgbClr, _super);
                        function SrgbClr(hexVal) {
                            var _this = _super.call(this) || this;
                            _this.hexVal = null;
                            _this.hexVal = hexVal;
                            _this.color = com.mxgraph.io.vsdx.theme.Color.decodeColorHex(hexVal);
                            return _this;
                        }
                        return SrgbClr;
                    }(com.mxgraph.io.vsdx.theme.OoxmlColor));
                    theme.SrgbClr = SrgbClr;
                    SrgbClr["__class"] = "com.mxgraph.io.vsdx.theme.SrgbClr";
                })(theme = vsdx.theme || (vsdx.theme = {}));
            })(vsdx = io.vsdx || (io.vsdx = {}));
        })(io = mxgraph.io || (mxgraph.io = {}));
    })(mxgraph = com.mxgraph || (com.mxgraph = {}));
})(com || (com = {}));
(function (com) {
    var mxgraph;
    (function (mxgraph) {
        var io;
        (function (io) {
            var vsdx;
            (function (vsdx) {
                var theme;
                (function (theme) {
                    var SysClr = (function (_super) {
                        __extends(SysClr, _super);
                        function SysClr(val, lastClr) {
                            var _this = _super.call(this) || this;
                            _this.val = null;
                            _this.lastClr = null;
                            _this.val = val;
                            _this.lastClr = lastClr;
                            var hexVal = lastClr;
                            if (hexVal == null) {
                                switch ((val)) {
                                    case "windowText":
                                        hexVal = "000000";
                                        break;
                                    case "window":
                                        hexVal = "FFFFFF";
                                        break;
                                    default:
                                        hexVal = "FFFFFF";
                                }
                            }
                            _this.color = com.mxgraph.io.vsdx.theme.Color.decodeColorHex(hexVal);
                            return _this;
                        }
                        return SysClr;
                    }(com.mxgraph.io.vsdx.theme.OoxmlColor));
                    theme.SysClr = SysClr;
                    SysClr["__class"] = "com.mxgraph.io.vsdx.theme.SysClr";
                })(theme = vsdx.theme || (vsdx.theme = {}));
            })(vsdx = io.vsdx || (io.vsdx = {}));
        })(io = mxgraph.io || (mxgraph.io = {}));
    })(mxgraph = com.mxgraph || (com.mxgraph = {}));
})(com || (com = {}));
(function (com) {
    var mxgraph;
    (function (mxgraph) {
        var io;
        (function (io) {
            var vsdx;
            (function (vsdx) {
                var geometry;
                (function (geometry) {
                    var RelEllipticalArcTo = (function (_super) {
                        __extends(RelEllipticalArcTo, _super);
                        function RelEllipticalArcTo(index, x, y, a, b, c, d) {
                            return _super.call(this, index, x, y, a, b, c, d) || this;
                        }
                        /**
                         *
                         * @param {mxPoint} p
                         * @param {com.mxgraph.io.vsdx.Shape} shape
                         * @return {string}
                         */
                        RelEllipticalArcTo.prototype.handle = function (p, shape) {
                            if (this.x != null && this.y != null && this.a != null && this.b != null && this.c != null && this.d != null) {
                                var h = shape.getHeight() / com.mxgraph.io.vsdx.mxVsdxUtils.conversionFactor_$LI$();
                                var w = shape.getWidth() / com.mxgraph.io.vsdx.mxVsdxUtils.conversionFactor_$LI$();
                                this.x *= w;
                                this.y *= h;
                                this.a *= w;
                                this.b *= h;
                            }
                            return _super.prototype.handle.call(this, p, shape);
                        };
                        return RelEllipticalArcTo;
                    }(com.mxgraph.io.vsdx.geometry.EllipticalArcTo));
                    geometry.RelEllipticalArcTo = RelEllipticalArcTo;
                    RelEllipticalArcTo["__class"] = "com.mxgraph.io.vsdx.geometry.RelEllipticalArcTo";
                })(geometry = vsdx.geometry || (vsdx.geometry = {}));
            })(vsdx = io.vsdx || (io.vsdx = {}));
        })(io = mxgraph.io || (mxgraph.io = {}));
    })(mxgraph = com.mxgraph || (com.mxgraph = {}));
})(com || (com = {}));
(function (com) {
    var mxgraph;
    (function (mxgraph) {
        var io;
        (function (io) {
            var vsdx;
            (function (vsdx) {
                var Shape = (function (_super) {
                    __extends(Shape, _super);
                    function Shape(shape, model) {
                    	//BUG in JSweet, fields default values and explicit assignments are not the same (defaults are before super() and assignments are after)!
                    	var _this = this;
                    	
                        _this.text = null;
                        _this.fields = null;
                        _this.geom = null;
                        _this.imageData = null;
                        _this.theme = null;
                        _this.quickStyleVals = null;
                        
                        _this = _super.call(this, shape, model) || this;
                        
                        /**
                         * List of paragraphs in this shape
                         */
                        _this.paragraphs = null;
                        /**
                         * mxGraph cell style map
                         */
                        _this.styleMap = ({});
                        /**
                         * Width of shape
                         */
                        _this.width = 0;
                        /**
                         * Height of shape
                         */
                        _this.height = 0;
                        /**
                         * Cumulative rotation of shape, including parents
                         */
                        _this.rotation = 0;
                        _this.lastX = 0;
                        _this.lastY = 0;
                        _this.lastMoveX = 0;
                        _this.lastMoveY = 0;
                        _this.lastKnot = -1;
                        _this.geomList = null;
                        _this.geomListProcessed = false;
                        _this.themeVariant = 0;
                        /**
                         * Last cp IX referenced in the Text Element.
                         */
                        _this.cp = "0";
                        /**
                         * Last pp IX referenced in the Text Element.
                         */
                        _this.pp = "0";
                        /**
                         * Last tp IX referenced in the Text Element.
                         */
                        _this.tp = "0";
                        /**
                         * Last fld IX referenced in the Text Element.
                         */
                        _this.fld = "0";
                        
                        _this.width = _this.getScreenNumericalValue$org_w3c_dom_Element$double(/* get */ (function (m, k) { return m[k] ? m[k] : null; })(_this.cellElements, com.mxgraph.io.vsdx.mxVsdxConstants.WIDTH), 0);
                        _this.height = _this.getScreenNumericalValue$org_w3c_dom_Element$double(/* get */ (function (m, k) { return m[k] ? m[k] : null; })(_this.cellElements, com.mxgraph.io.vsdx.mxVsdxConstants.HEIGHT), 0);
                        return _this;
                    }
                    Shape.UNICODE_LINE_SEP_$LI$ = function () 
                    {
                    	if (Shape.UNICODE_LINE_SEP == null)
                		{
                    		Shape.ERROR_IMAGE = "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8IS0tIENyZWF0ZWQgd2l0aCBJbmtzY2FwZSAoaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvKSAtLT4NCjxzdmcNCiAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyINCiAgIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiDQogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiDQogICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIg0KICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIg0KICAgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIg0KICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiDQogICB3aWR0aD0iMjUwIg0KICAgaGVpZ2h0PSIyNTAiDQogICBpZD0ic3ZnMzMxOSINCiAgIHNvZGlwb2RpOnZlcnNpb249IjAuMzIiDQogICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjQ2Ig0KICAgdmVyc2lvbj0iMS4wIg0KICAgc29kaXBvZGk6ZG9jbmFtZT0ibm9waG90b19pLnN2ZyINCiAgIGlua3NjYXBlOm91dHB1dF9leHRlbnNpb249Im9yZy5pbmtzY2FwZS5vdXRwdXQuc3ZnLmlua3NjYXBlIj4NCiAgPGRlZnMNCiAgICAgaWQ9ImRlZnMzMzIxIj4NCiAgICA8aW5rc2NhcGU6cGVyc3BlY3RpdmUNCiAgICAgICBzb2RpcG9kaTp0eXBlPSJpbmtzY2FwZTpwZXJzcDNkIg0KICAgICAgIGlua3NjYXBlOnZwX3g9IjAgOiA1MjYuMTgxMDkgOiAxIg0KICAgICAgIGlua3NjYXBlOnZwX3k9IjAgOiAxMDAwIDogMCINCiAgICAgICBpbmtzY2FwZTp2cF96PSI3NDQuMDk0NDggOiA1MjYuMTgxMDkgOiAxIg0KICAgICAgIGlua3NjYXBlOnBlcnNwM2Qtb3JpZ2luPSIzNzIuMDQ3MjQgOiAzNTAuNzg3MzkgOiAxIg0KICAgICAgIGlkPSJwZXJzcGVjdGl2ZTMzMjciIC8+DQogICAgPGlua3NjYXBlOnBlcnNwZWN0aXZlDQogICAgICAgaWQ9InBlcnNwZWN0aXZlMzM0MiINCiAgICAgICBpbmtzY2FwZTpwZXJzcDNkLW9yaWdpbj0iMzcyLjA0NzI0IDogMzUwLjc4NzM5IDogMSINCiAgICAgICBpbmtzY2FwZTp2cF96PSI3NDQuMDk0NDggOiA1MjYuMTgxMDkgOiAxIg0KICAgICAgIGlua3NjYXBlOnZwX3k9IjAgOiAxMDAwIDogMCINCiAgICAgICBpbmtzY2FwZTp2cF94PSIwIDogNTI2LjE4MTA5IDogMSINCiAgICAgICBzb2RpcG9kaTp0eXBlPSJpbmtzY2FwZTpwZXJzcDNkIiAvPg0KICA8L2RlZnM+DQogIDxzb2RpcG9kaTpuYW1lZHZpZXcNCiAgICAgaWQ9ImJhc2UiDQogICAgIHBhZ2Vjb2xvcj0iI2ZmZmZmZiINCiAgICAgYm9yZGVyY29sb3I9IiM2NjY2NjYiDQogICAgIGJvcmRlcm9wYWNpdHk9IjEuMCINCiAgICAgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAuMCINCiAgICAgaW5rc2NhcGU6cGFnZXNoYWRvdz0iMiINCiAgICAgaW5rc2NhcGU6em9vbT0iMi4yNDI5NDI3Ig0KICAgICBpbmtzY2FwZTpjeD0iMTIxLjk3NjQ4Ig0KICAgICBpbmtzY2FwZTpjeT0iMTIyLjQ0MTk4Ig0KICAgICBpbmtzY2FwZTpkb2N1bWVudC11bml0cz0icHgiDQogICAgIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9ImxheWVyMSINCiAgICAgc2hvd2dyaWQ9ImZhbHNlIg0KICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjE2NjQiDQogICAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9Ijg0NCINCiAgICAgaW5rc2NhcGU6d2luZG93LXg9Ii0zIg0KICAgICBpbmtzY2FwZTp3aW5kb3cteT0iLTE4IiAvPg0KICA8bWV0YWRhdGENCiAgICAgaWQ9Im1ldGFkYXRhMzMyNCI+DQogICAgPHJkZjpSREY+DQogICAgICA8Y2M6V29yaw0KICAgICAgICAgcmRmOmFib3V0PSIiPg0KICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD4NCiAgICAgICAgPGRjOnR5cGUNCiAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz4NCiAgICAgICAgPGRjOnRpdGxlPkZvdG9ncmFmaWVydmVyYm90PC9kYzp0aXRsZT4NCiAgICAgICAgPGRjOmRhdGU+MjAwOC0wNi0yOTwvZGM6ZGF0ZT4NCiAgICAgICAgPGRjOmNyZWF0b3I+DQogICAgICAgICAgPGNjOkFnZW50Pg0KICAgICAgICAgICAgPGRjOnRpdGxlPlRvcnJzdGVuIFNrb21wPC9kYzp0aXRsZT4NCiAgICAgICAgICA8L2NjOkFnZW50Pg0KICAgICAgICA8L2RjOmNyZWF0b3I+DQogICAgICAgIDxkYzpyaWdodHM+DQogICAgICAgICAgPGNjOkFnZW50Pg0KICAgICAgICAgICAgPGRjOnRpdGxlPlRvcnN0ZW4gU2tvbXA8L2RjOnRpdGxlPg0KICAgICAgICAgIDwvY2M6QWdlbnQ+DQogICAgICAgIDwvZGM6cmlnaHRzPg0KICAgICAgICA8ZGM6cHVibGlzaGVyPg0KICAgICAgICAgIDxjYzpBZ2VudD4NCiAgICAgICAgICAgIDxkYzp0aXRsZT5Ub3JzdGVuIFNrb21wPC9kYzp0aXRsZT4NCiAgICAgICAgICA8L2NjOkFnZW50Pg0KICAgICAgICA8L2RjOnB1Ymxpc2hlcj4NCiAgICAgICAgPGRjOmxhbmd1YWdlPmRlX0RFPC9kYzpsYW5ndWFnZT4NCiAgICAgICAgPGRjOnN1YmplY3Q+DQogICAgICAgICAgPHJkZjpCYWc+DQogICAgICAgICAgICA8cmRmOmxpPlBpa3RvZ3JhbW07IEZvdG9ncmFmaWVydmVyYm90PC9yZGY6bGk+DQogICAgICAgICAgPC9yZGY6QmFnPg0KICAgICAgICA8L2RjOnN1YmplY3Q+DQogICAgICAgIDxkYzpkZXNjcmlwdGlvbj5Gb3RvZ3JhZmllcnZlcmJvdCBhbHMgUGlrdG9ncmFtbSA8L2RjOmRlc2NyaXB0aW9uPg0KICAgICAgICA8Y2M6bGljZW5zZQ0KICAgICAgICAgICByZGY6cmVzb3VyY2U9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL2xpY2Vuc2VzL3B1YmxpY2RvbWFpbi8iIC8+DQogICAgICA8L2NjOldvcms+DQogICAgICA8Y2M6TGljZW5zZQ0KICAgICAgICAgcmRmOmFib3V0PSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9saWNlbnNlcy9wdWJsaWNkb21haW4vIj4NCiAgICAgICAgPGNjOnBlcm1pdHMNCiAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyNSZXByb2R1Y3Rpb24iIC8+DQogICAgICAgIDxjYzpwZXJtaXRzDQogICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjRGlzdHJpYnV0aW9uIiAvPg0KICAgICAgICA8Y2M6cGVybWl0cw0KICAgICAgICAgICByZGY6cmVzb3VyY2U9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zI0Rlcml2YXRpdmVXb3JrcyIgLz4NCiAgICAgIDwvY2M6TGljZW5zZT4NCiAgICA8L3JkZjpSREY+DQogIDwvbWV0YWRhdGE+DQogIDxnDQogICAgIGlua3NjYXBlOmxhYmVsPSJFYmVuZSAxIg0KICAgICBpbmtzY2FwZTpncm91cG1vZGU9ImxheWVyIg0KICAgICBpZD0ibGF5ZXIxIj4NCiAgICA8cGF0aA0KICAgICAgIHN0eWxlPSJmaWxsOiMwMDAwMDA7ZmlsbC1vcGFjaXR5OjEiDQogICAgICAgZD0iTSAxNjQuNTMxMjUgNjIuNjg3NSBDIDE2Mi43OTExNSA2Mi42ODc1MDEgMTYxLjM3NSA2NC4wNzI0MTYgMTYxLjM3NSA2NS44MTI1IEwgMTYxLjM3NSA2OC43NSBMIDM4LjM3NSA2OC43NSBDIDM1LjA5MjI5OCA2OC43NDk5OTkgMzIuNDY4NzUgNzEuMzczNTQ4IDMyLjQ2ODc1IDc0LjY1NjI1IEwgMzIuNDY4NzUgMTgxLjM3NSBDIDMyLjQ2ODc1IDE4NC42NTc3IDM1LjA5MjMwNyAxODcuMzEyNTEgMzguMzc1IDE4Ny4zMTI1IEwgMjExLjYyNSAxODcuMzEyNSBDIDIxNC45MDc2OSAxODcuMzEyNSAyMTcuNTMxMjcgMTg0LjY1NzcgMjE3LjUzMTI1IDE4MS4zNzUgTCAyMTcuNTMxMjUgNzQuNjU2MjUgQyAyMTcuNTMxMjUgNzEuMzczNTUxIDIxNC45MDc2OCA2OC43NSAyMTEuNjI1IDY4Ljc1IEwgMjAyLjA2MjUgNjguNzUgTCAyMDIuMDYyNSA2NS44MTI1IEMgMjAyLjA2MjUgNjQuMDcyNDEgMjAwLjY0NjM1IDYyLjY4NzUgMTk4LjkwNjI1IDYyLjY4NzUgTCAxNjQuNTMxMjUgNjIuNjg3NSB6IE0gNDYuODEyNSA3OCBMIDg4LjY1NjI1IDc4IEMgOTAuMzk2MzQyIDc4IDkxLjgxMjUgNzkuMzg0OTA3IDkxLjgxMjUgODEuMTI1IEwgOTEuODEyNSA5Ni4zMTI1IEMgOTEuODEyNSA5OC4wNTI1OTIgOTAuMzk2MzQzIDk5LjQzNzUgODguNjU2MjUgOTkuNDM3NSBMIDQ2LjgxMjUgOTkuNDM3NSBDIDQ1LjA3MjQwOCA5OS40Mzc1IDQzLjY4NzUgOTguMDUyNTkzIDQzLjY4NzUgOTYuMzEyNSBMIDQzLjY4NzUgODEuMTI1IEMgNDMuNjg3NSA3OS4zODQ5MDggNDUuMDcyNDA3IDc4IDQ2LjgxMjUgNzggeiBNIDE0NiA4OC4yMTg3NSBDIDE2Ny43MzQ3NSA4OC4yMTg3NTMgMTg1LjM3NSAxMDYuMTUwNzEgMTg1LjM3NSAxMjguMjUgQyAxODUuMzc0OTkgMTUwLjM0OTI4IDE2Ny43MzQ3NCAxNjguMjgxMjUgMTQ2IDE2OC4yODEyNSBDIDEyNC4yNjUyNyAxNjguMjgxMjYgMTA2LjYyNSAxNTAuMzQ5MjkgMTA2LjYyNSAxMjguMjUgQyAxMDYuNjI1IDEwNi4xNTA3MSAxMjQuMjY1MjYgODguMjE4NzUgMTQ2IDg4LjIxODc1IHogTSAxNDYgOTEuNzE4NzUgQyAxMjYuMTY1NTcgOTEuNzE4NzUgMTEwLjA2MjUgMTA4LjA4Mjg5IDExMC4wNjI1IDEyOC4yNSBDIDExMC4wNjI1IDE0OC40MTcxMSAxMjYuMTY1NTcgMTY0Ljc4MTI2IDE0NiAxNjQuNzgxMjUgQyAxNjUuODM0NDMgMTY0Ljc4MTI1IDE4MS45Mzc1IDE0OC40MTcxIDE4MS45Mzc1IDEyOC4yNSBDIDE4MS45Mzc1IDEwOC4wODI4OSAxNjUuODM0NDMgOTEuNzE4NzUgMTQ2IDkxLjcxODc1IHogTSAxNDYgOTYuNTkzNzUgQyAxNjMuMTc3NjggOTYuNTkzNzUyIDE3Ny4xMjUgMTEwLjc4NDIgMTc3LjEyNSAxMjguMjUgQyAxNzcuMTI0OTkgMTQ1LjcxNTggMTYzLjE3NzY5IDE1OS44NzUgMTQ2IDE1OS44NzUgQyAxMjguODIyMzEgMTU5Ljg3NSAxMTQuODc1IDE0NS43MTU4IDExNC44NzUgMTI4LjI1IEMgMTE0Ljg3NSAxMTAuNzg0MTkgMTI4LjgyMjMxIDk2LjU5Mzc1IDE0NiA5Ni41OTM3NSB6IE0gMTc2LjUgMTcyLjcxODc1IEwgMjA2LjE4NzUgMTcyLjcxODc1IEMgMjA3LjQyMTM4IDE3Mi43MTg3NSAyMDguNDA2MjUgMTczLjEyNzgzIDIwOC40MDYyNSAxNzMuNjI1IEwgMjA4LjQwNjI1IDE3Ny45Njg3NSBDIDIwOC40MDYyNSAxNzguNDY1OTIgMjA3LjQyMTM4IDE3OC44NDM3NSAyMDYuMTg3NSAxNzguODQzNzUgTCAxNzYuNSAxNzguODQzNzUgQyAxNzUuMjY2MTEgMTc4Ljg0Mzc1IDE3NC4yODEyNSAxNzguNDY1OTIgMTc0LjI4MTI1IDE3Ny45Njg3NSBMIDE3NC4yODEyNSAxNzMuNjI1IEMgMTc0LjI4MTI1IDE3My4xMjc4MyAxNzUuMjY2MTIgMTcyLjcxODc1IDE3Ni41IDE3Mi43MTg3NSB6ICINCiAgICAgICBpZD0icmVjdDMyMDkiIC8+DQogICAgPHBhdGgNCiAgICAgICBzdHlsZT0iZmlsbDojYzQyNjFkO2ZpbGwtb3BhY2l0eToxIg0KICAgICAgIGQ9Ik0gMjAgMCBDIDE4LjU1OTkzOCAwIDE3LjE2NDc0NyAwLjE1MDk4NjY2IDE1LjgxMjUgMC40Mzc1IEMgMTUuMjEwMjkxIDAuNTY1MTk1NzggMTQuNjExOTEzIDAuNzI2MjExMjYgMTQuMDMxMjUgMC45MDYyNSBDIDEzLjU1NDc3MyAxLjA1Mzk4NTIgMTMuMDg1MzQ5IDEuMjI0ODUzNiAxMi42MjUgMS40MDYyNSBDIDEyLjMyODc2NiAxLjUyMzA3MzkgMTIuMDM5MDMzIDEuNjUwOTE4MiAxMS43NSAxLjc4MTI1IEMgMTEuMzQ3Mjc4IDEuOTYyMzU5OCAxMC45NTA0MDYgMi4xMzc0MTY1IDEwLjU2MjUgMi4zNDM3NSBDIDEwLjUyMTU1NSAyLjM2NTU2ODggMTAuNDc4MjczIDIuMzg0MTU1NSAxMC40Mzc1IDIuNDA2MjUgQyAxMC40MTY5MzQgMi40MTczNzU0IDEwLjM5NTUyMiAyLjQyNjMwNDkgMTAuMzc1IDIuNDM3NSBDIDkuODMyNjg2MSAyLjczMzM0NDYgOS4zMjI2NDQ4IDMuMDYzMjQ1MiA4LjgxMjUgMy40MDYyNSBDIDguMjgzMTIyMSAzLjc2MjE4NjUgNy43NzI3NzI4IDQuMTU4OTIwOSA3LjI4MTI1IDQuNTYyNSBDIDcuMjc1MDU1IDQuNTY3NTg2NiA3LjI1NjE4ODggNC41NTc0MDYxIDcuMjUgNC41NjI1IEMgNy4yMzg1NDc5IDQuNTcxOTQzNCA3LjIzMDE4MDYgNC41ODQyODE2IDcuMjE4NzUgNC41OTM3NSBDIDcuMTA0NzM1MiA0LjY4ODAxNTkgNi45ODY4NTA3IDQuNzc4MjY4NyA2Ljg3NSA0Ljg3NSBDIDYuNTE1NzAyMSA1LjE4NjQyNjQgNi4xNzk3OTA5IDUuNTA3NzA5MSA1Ljg0Mzc1IDUuODQzNzUgQyA1LjQwNDQwMjUgNi4yODE4MDc4IDQuOTkwNzQ0OSA2Ljc0MTM1NTQgNC41OTM3NSA3LjIxODc1IEMgNC41NzkwMDg2IDcuMjM2NTQ2MiA0LjU3NzE4MDYgNy4yNjM0MDE1IDQuNTYyNSA3LjI4MTI1IEMgMy43Njc0ODk4IDguMjQzOTE4MSAzLjA0MjI3MjEgOS4yNzE4NzA1IDIuNDM3NSAxMC4zNzUgQyAyLjQyNjIyMzIgMTAuMzk1NjM1IDIuNDE3NDU2MSAxMC40MTY4MiAyLjQwNjI1IDEwLjQzNzUgQyAyLjEwODM5MDggMTAuOTg1MzQ4IDEuODQwMjIzMyAxMS41NDcyMTQgMS41OTM3NSAxMi4xMjUgQyAxLjU3NTU4NjUgMTIuMTY3NjY1IDEuNTQ5MTI1NSAxMi4yMDcxODIgMS41MzEyNSAxMi4yNSBDIDEuMjg3NzEzMSAxMi44MzI0MzMgMS4wOTQ2NzU0IDEzLjQyMTgyMiAwLjkwNjI1IDE0LjAzMTI1IEMgMC43Mjk2MzAxNCAxNC42MDI0OTUgMC41NjMwOTYzNCAxNS4xODg4MjggMC40Mzc1IDE1Ljc4MTI1IEMgMC4xNDY5MTQwNCAxNy4xNDI1NzggLTQuMzkwNjEzM2UtMTggMTguNTQ5NDY2IDAgMjAgTCAwIDIzMCBDIDAgMjQxLjA4IDguOTIgMjUwIDIwIDI1MCBMIDIzMCAyNTAgQyAyMzEuNDQwMDYgMjUwIDIzMi44MzUyNSAyNDkuODQ5MDEgMjM0LjE4NzUgMjQ5LjU2MjUgQyAyMzQuNzg5MDMgMjQ5LjQzNDk3IDIzNS4zODg2NiAyNDkuMjczODEgMjM1Ljk2ODc1IDI0OS4wOTM3NSBDIDIzNi40NDQ3NiAyNDguOTQ2IDIzNi45MTUwNSAyNDguNzc1MjYgMjM3LjM3NSAyNDguNTkzNzUgQyAyMzcuNjcxMjMgMjQ4LjQ3NjkzIDIzNy45NjA5NyAyNDguMzQ5MDggMjM4LjI1IDI0OC4yMTg3NSBDIDIzOC4yNzk4MSAyNDguMjA1MzEgMjM4LjMxNDAyIDI0OC4yMDEwOSAyMzguMzQzNzUgMjQ4LjE4NzUgQyAyMzguNzU4MzYgMjQ3Ljk5ODMgMjM5LjE2Mzc0IDI0Ny44MDk4MSAyMzkuNTYyNSAyNDcuNTkzNzUgQyAyMzkuNTgzMTggMjQ3LjU4MjU0IDIzOS42MDQzNiAyNDcuNTczNzggMjM5LjYyNSAyNDcuNTYyNSBDIDI0MC4xNjkyNSAyNDcuMjY1MTIgMjQwLjY3NTU4IDI0Ni45Mzg3MyAyNDEuMTg3NSAyNDYuNTkzNzUgQyAyNDEuNjY4NzggMjQ2LjI2OTQxIDI0Mi4xNDM1OSAyNDUuOTI2MzkgMjQyLjU5Mzc1IDI0NS41NjI1IEMgMjQyLjY0NDc0IDI0NS41MjEyOCAyNDIuNjk5NDMgMjQ1LjQ3OTIxIDI0Mi43NSAyNDUuNDM3NSBDIDI0Mi44NzY1MSAyNDUuMzMzMTggMjQzLjAwMTE1IDI0NS4yMzIzNSAyNDMuMTI1IDI0NS4xMjUgQyAyNDMuNDgyNjUgMjQ0LjgxNTM4IDI0My44MjE1NSAyNDQuNDkwMTkgMjQ0LjE1NjI1IDI0NC4xNTYyNSBDIDI0NC40OTIyOSAyNDMuODIwMjEgMjQ0LjgxMzU3IDI0My40ODQzIDI0NS4xMjUgMjQzLjEyNSBDIDI0NS4yMzE2NyAyNDMuMDAyMzQgMjQ1LjMzMzgxIDI0Mi44NzUyNyAyNDUuNDM3NSAyNDIuNzUgQyAyNDUuNDQyNzYgMjQyLjc0MzYyIDI0NS40MzIyNSAyNDIuNzI1MTMgMjQ1LjQzNzUgMjQyLjcxODc1IEMgMjQ1Ljg0MjQ5IDI0Mi4yMjgzIDI0Ni4yMzY0IDI0MS43MTU3NiAyNDYuNTkzNzUgMjQxLjE4NzUgQyAyNDYuOTM4MTIgMjQwLjY3ODQzIDI0Ny4yNjUzNiAyNDAuMTY2MjIgMjQ3LjU2MjUgMjM5LjYyNSBDIDI0Ny41NzM2MyAyMzkuNjA0NzIgMjQ3LjU4MjY4IDIzOS41ODI4MiAyNDcuNTkzNzUgMjM5LjU2MjUgQyAyNDcuODkxOTcgMjM5LjAxNDggMjQ4LjE1OTMxIDIzOC40NTIzOSAyNDguNDA2MjUgMjM3Ljg3NSBDIDI0OC40MTU1NCAyMzcuODUzMjggMjQ4LjQyODI5IDIzNy44MzQyNiAyNDguNDM3NSAyMzcuODEyNSBDIDI0OC40NDY0NCAyMzcuNzkxMjkgMjQ4LjQ1OTg4IDIzNy43NzEyNSAyNDguNDY4NzUgMjM3Ljc1IEMgMjQ4LjcwOTkyIDIzNy4xNzQ3NiAyNDguOTA2MjggMjM2LjU3MDA4IDI0OS4wOTM3NSAyMzUuOTY4NzUgQyAyNDkuMjczNzUgMjM1LjM5MTM3IDI0OS40MzQ2OCAyMzQuODE3NTQgMjQ5LjU2MjUgMjM0LjIxODc1IEMgMjQ5Ljg1MzA5IDIzMi44NTc0MiAyNTAgMjMxLjQ1MDUzIDI1MCAyMzAgTCAyNTAgMjAgQyAyNTAgOC45MiAyNDEuMDggLTMuMzUzNzk4N2UtMTcgMjMwIDAgTCAyMCAwIHogTSAzNC43ODEyNSAxOS40MDYyNSBMIDIyNS40Njg3NSAxOS40MDYyNSBDIDIyOC4zMDk0NiAxOS40MDYyNSAyMzAuNTkzNzUgMjEuNjkwNTQ0IDIzMC41OTM3NSAyNC41MzEyNSBMIDIzMC41OTM3NSAyMTUuMjUgTCAzNC43ODEyNSAxOS40MDYyNSB6IE0gMTkuNDA2MjUgMzQuNzUgTCAyMTUuMjE4NzUgMjMwLjU5Mzc1IEwgMjQuNTMxMjUgMjMwLjU5Mzc1IEMgMjEuNjkwNTQ0IDIzMC41OTM3NiAxOS40MDYyNSAyMjguMzA5NDYgMTkuNDA2MjUgMjI1LjQ2ODc1IEwgMTkuNDA2MjUgMzQuNzUgeiAiDQogICAgICAgaWQ9InBhdGgzMTk2IiAvPg0KICA8L2c+DQo8L3N2Zz4NCg==";
                    		Shape.UNICODE_LINE_SEP = String.fromCharCode(8232);//[String.fromCharCode(226), String.fromCharCode(128), String.fromCharCode(168)].join('');
                		}
                		return Shape.UNICODE_LINE_SEP;
            		};
                    ;
                    Shape.prototype.setThemeAndVariant = function (theme, themeVariant) {
                        this.theme = theme;
                        this.themeVariant = themeVariant;
                    };
                    Shape.prototype.getTheme = function () {
                        if (this.theme != null) {
                            this.theme.setVariant(this.themeVariant);
                        }
                        return this.theme;
                    };
                    Shape.prototype.getQuickStyleVals = function () {
                        return this.quickStyleVals;
                    };
                    Shape.prototype.processGeomList = function (parentGeoList) {
                        if (!this.geomListProcessed) {
                            this.geomList = new com.mxgraph.io.vsdx.mxVsdxGeometryList(parentGeoList);
                            if (this.geom != null) {
                                for (var index156 = 0; index156 < this.geom.length; index156++) {
                                    var geoElem = this.geom[index156];
                                    {
                                        this.geomList.addGeometry(geoElem);
                                    }
                                }
                            }
                            this.geomListProcessed = true;
                        }
                    };
                    /**
                     * Caches the specified element
                     * @param {*} elem the element to cache
                     * @param {com.mxgraph.io.vsdx.mxVsdxModel} model
                     */
                    Shape.prototype.parseShapeElem = function (elem, model) {
                        _super.prototype.parseShapeElem.call(this, elem, model);
                        var childName = elem.nodeName;
                        if ((function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(childName, "ForeignData")) 
                        {
                        	function getForeignRel(elem, filename)
                        	{
                        		var fdChild = elem.firstChild;
                                
                                while (fdChild != null) 
                                {
                                    if (fdChild.nodeType == 1) 
                                    {
                                        var fdElem = fdChild;
                                        var grandchildName = fdElem.nodeName;
                                        
                                        if (grandchildName.toLowerCase() == "rel") 
                                        {
                                            var rid = fdElem.getAttribute("r:id");
                                            
                                            if (rid != null && !(rid.length === 0)) 
                                            {
                                                var index = filename.lastIndexOf('/');
                                                var pre = "";
                                                var post = "";
                                                
                                                try 
                                                {
                                                    pre = filename.substring(0, index);
                                                    post = filename.substring(index, filename.length);
                                                }
                                                catch (e) 
                                                {
                                                    return;
                                                }
                                                
                                                var relElem = model.getRelationship(rid, pre + "/_rels" + post + ".rels");
                                                
                                                if (relElem != null) 
                                                {
                                                    var target = relElem.getAttribute("Target") || "";
                                                    var type = relElem.getAttribute("Type");
                                                    index = target.lastIndexOf('/');
                                                    
                                                    try 
                                                    {
                                                        target = target.substring(index + 1, target.length);
                                                    }
                                                    catch (e) 
                                                    {
                                                        return;
                                                    }
                                                    
                                                    return {type: type, target: target};
                                                }
                                                
                                                return;
                                            }
                                        }
                                    }
                                    fdChild = fdChild.nextSibling;
                                }
                            }
                            
                            var filename = elem.ownerDocument.vsdxFileName; //was getDocumentURI()
                            var iType = elem.getAttribute("ForeignType");
                            var compression = elem.getAttribute("CompressionType") || "";
                            var typeTarget = null;

                            if ((function (o1, o2) { if (o1 && o1.equals) {
                                return o1.equals(o2);
                            }
                            else {
                                return o1 === o2;
                            } })(iType, "Bitmap")) {
                                compression = compression.toLowerCase();
                            }
                            else if ((function (o1, o2) { if (o1 && o1.equals) {
                                return o1.equals(o2);
                            }
                            else {
                                return o1 === o2;
                            } })(iType, "MetaFile")) {
                                compression = "png"; //we convert emf files to png
                            }
                            else if ((function (o1, o2) { if (o1 && o1.equals) {
                                return o1.equals(o2);
                            }
                            else {
                                return o1 === o2;
                            } })(iType, "Enhanced Metafile") || (function (o1, o2) { if (o1 && o1.equals) {
                                return o1.equals(o2);
                            }
                            else {
                                return o1 === o2;
                            } })(iType, "EnhMetaFile")) {
                                compression = "png"; //we convert emf files to png
                            }
                            else if (iType == "Object") //This is a very basic support for embedded visio objects by looking for associated image
                            {
                                typeTarget = getForeignRel(elem, filename);

                                if (typeTarget.type.indexOf('/oleObject') > 0)
                                {
                                    var relElem = model.getRelationship("rId1", "visio/embeddings/_rels/" + typeTarget.target + ".rels");
                                    
                                    if (relElem != null) 
                                    {
                                        var target = relElem.getAttribute("Target");
                                        var type = relElem.getAttribute("Type");
                                        
                                        try 
                                        {
                                            var index = target.lastIndexOf('/');
                                            target = target.substring(index + 1, target.length);
                                        }
                                        catch (e) 
                                        {
                                            return;
                                        }
                                        
                                        compression = "png";
                                        typeTarget = {type: type, target: target};
                                    }
                                    else
                                    {
                                        return;
                                    }
                                }
                            }
                            else {
                                return;
                            }

                            if (typeTarget == null)
                            {
                                typeTarget = getForeignRel(elem, filename);
                            }

                            var type = typeTarget.type, target = typeTarget.target;

                            if (type != null && (function (str, searchString) { var pos = str.length - searchString.length; var lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(type, "image")) 
                            {
                                this.imageData = ({});
                                var iData = model.getMedia(com.mxgraph.io.mxVsdxCodec.vsdxPlaceholder + "/media/" + target);
                                if (!iData)
                                {
                                    /* put */ (this.imageData["iData"] = Shape.ERROR_IMAGE);
                                    /* put */ (this.imageData["iType"] = 'svg+xml');
                                }
                                else
                                {
                                    /* put */ (this.imageData["iData"] = iData);
                                    if ((function (str, searchString) { var pos = str.length - searchString.length; var lastIndex = str.indexOf(searchString, pos); return lastIndex !== -1 && lastIndex === pos; })(target.toLowerCase(), ".bmp")) {
                                        compression = "jpg";
                                    }
                                    /* put */ (this.imageData["iType"] = compression);
                                }
                            }
                        }
                        else if ((function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(childName, com.mxgraph.io.vsdx.mxVsdxConstants.TEXT)) {
                            this.text = elem;
                        }
                    };
                    /**
                     * Caches the specific section element
                     * @param {*} elem the element to cache
                     */
                    Shape.prototype.parseSection = function (elem) {
                        var n = elem.getAttribute("N");
                        if ((function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(n, "Geometry")) {
                            if (this.geom == null) {
                                this.geom = ([]);
                            }
                            /* add */ (this.geom.push(elem));
                        }
                        else if ((function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(n, "Field")) {
                            var rows = com.mxgraph.io.vsdx.mxVsdxUtils.getDirectChildNamedElements(elem, "Row");
                            for (var index157 = 0; index157 < rows.length; index157++) {
                                var row = rows[index157];
                                {
                                    var ix = row.getAttribute("IX") || "";
                                    if (!(ix.length === 0)) {
                                        if (this.fields == null) {
                                            this.fields = ({});
                                        }
                                        var del = row.getAttribute("Del");
                                        if ((function (o1, o2) { if (o1 && o1.equals) {
                                            return o1.equals(o2);
                                        }
                                        else {
                                            return o1 === o2;
                                        } })("1", del)) {
                                            /* put */ (this.fields[ix] = "");
                                            continue;
                                        }
                                        var cells = com.mxgraph.io.vsdx.mxVsdxUtils.getDirectChildNamedElements(row, "Cell");
                                        var value = "";
                                        var format = "";
                                        var calendar = "";
                                        var type = "";
                                        for (var index158 = 0; index158 < cells.length; index158++) {
                                            var cell = cells[index158];
                                            {
                                                n = cell.getAttribute("N");
                                                var v = cell.getAttribute("V") || cell.textContent || "";
                                                switch ((n)) {
                                                    case "Value":
                                                        value = v;
                                                        break;
                                                    case "Format":
                                                        format = v;
                                                        break;
                                                    case "Calendar":
                                                        calendar = v;
                                                        break;
                                                    case "Type":
                                                        type = v;
                                                        break;
                                                }
                                            }
                                        }
                                        if (format == 'esc(0)')
                                        {
                                            this.fields[ix] = value;
                                        }
                                        else if (!(value.length === 0)) {
                                            try {
                                            	//Date can be in string date format or a number
                                            	var date = isNaN(value)? new Date(value) : new Date(Shape.VSDX_START_TIME + Math.floor((parseFloat(value) * 24 * 60 * 60 * 1000)));

												if (format == 'c')
												{
													if (date.getHours() + date.getMinutes() + date.getSeconds() + date.getMilliseconds() == 0)
													{
														format = 'm/d/yyyy';
													}
													else
													{
														format = 'm/d/yyyy h:MM:ss tt';															
													}
												}
												else if (format == 'ddddd')
												{
													format = 'm/d/yyyy';
												}
												else if (format == 'dddddd')
												{
													format = 'dddd, mmmm dd, yyyy';
												}
												else if (format == 'C')
												{
													format = 'dddd, mmmm dd, yyyy h:MM:ss tt';
												}
												else if (format == 'T')
												{
													format = 'h:MM:ss tt';
												}
												else
												{
                                                	//Our date format function swaps M/m meaning
                                                	format = format.replace(/am\/pm/g, 'tt').replace(/m/g, '@').replace(/M/g, 'm').replace(/@/g, 'M');
                                                }

                                               	value = Graph.prototype.formatDate(date, /* replaceAll */ 'UTC:' + format.replace(new RegExp("\\{|\\}", 'g'), ""));
                                            }
                                            catch (e) {
                                            }
                                            ;
                                            /* put */ (this.fields[ix] = value);
                                        }
                                    }
                                }
                            }
                        }
                        else {
                            _super.prototype.parseSection.call(this, elem);
                        }
                    };
                    /**
                     *
                     * @return {string} mxGraph stencil XML or null or there is no displayed geometry
                     */
                    Shape.prototype.parseGeom = function () {
                        if (!this.hasGeomList()) {
                            return "";
                        }
                        return this.geomList.getShapeXML(this);
                    };
                    /**
                     * Returns the value of the Text element.
                     * @return {string} Value of the Text element.
                     */
                    Shape.prototype.getText = function () {
                        return this.text != null ? this.text.textContent : null;
                    };
                    /**
                     * Returns the children Nodes of Text.
                     * @return {*} List with the children of the Text element.
                     */
                    Shape.prototype.getTextChildren = function () {
                        return this.text != null ? this.text.childNodes : null;
                    };
                    /**
                     * Returns the value of the width element in pixels.
                     * @return {number} Numerical value of the width element.
                     */
                    Shape.prototype.getWidth = function () {
                        if (this.width < 1 && this.childShapes != null)
                        {
                            try
                            {
                                for (var i = 0; i < this.childShapes.entries.length; i++)
                                {
                                    var c = this.childShapes.entries[i].value;
                                    this.width = Math.max(c.width, this.width);
                                }
                            }
                            catch(e){}
                        }

                        return this.width === 0 && this.height > 0 ? 1 : this.width;
                    };
                    /**
                     * Returns the value of the height element in pixels.
                     * @return {number} Numerical value of the height element.
                     */
                    Shape.prototype.getHeight = function () {
                        if (this.height < 1 && this.childShapes != null)
                        {
                            try
                            {
                                for (var i = 0; i < this.childShapes.entries.length; i++)
                                {
                                    var c = this.childShapes.entries[i].value;
                                    this.height = Math.max(c.height, this.height);
                                }
                            }
                            catch(e){}
                        }

                        return this.height === 0 && this.width > 0 ? 1 : this.height;
                    };
                    /**
                     * Returns the value of the rotation.
                     * @return {number} Numerical value of the rotation
                     */
                    Shape.prototype.getRotation = function () {
                        return this.rotation;
                    };
                    /**
                     * Returns the style map of this shape
                     * @return {*} the style map
                     */
                    Shape.prototype.getStyleMap = function () {
                        return this.styleMap;
                    };
                    /**
                     * Returns whether or not this shape has a geometry defined, locally
                     * or inherited
                     * @return {boolean} whether the shape has a geometry
                     */
                    Shape.prototype.hasGeom = function () {
                        return !(this.geom == null || (this.geom.length == 0));
                    };
                    /**
                     * Returns whether or not this shape or its master has a geometry defined
                     * @return {boolean} whether the shape has a geometry
                     */
                    Shape.prototype.hasGeomList = function () {
                        return this.geomList != null && this.geomList.hasGeom();
                    };
                    
                    /**
                     * Check if the paragraph is a list and return the list with its style
                     * @param {string} pp Reference to a Para element
                     * @return {string} the opening tag of the list with style or null if no list is found
                     */
                    Shape.prototype.getPPList = function (pp) 
                    {
                    	var ul = null;
                    	
                        if (pp != '') 
                        {
                            var bullet = this.getBullet(pp);
                            
                            if (bullet != '0') 
                            {
                            	ul = '<ul style="margin: 0;list-style-type: ' + (bullet == '4'? 'square' : 'disc') + '">';
                            }
                        }
                        
                        return ul;
                    };
                    
                    /**
                     * Returns the paragraph formated according the properties in the last
                     * Para element referenced.
                     * @param {string} para Paragraph to be formated
                     * @return {string} Formated paragraph.
                     */
                    Shape.prototype.getTextParagraphFormated = function (para) {
                        var ret = "";
                        var styleMap = ({});
                        /* put */ (styleMap["text-align"] = this.getHorizontalAlign(this.pp, true));
                        /* put */ (styleMap["margin-left"] = this.getIndentLeft(this.pp));
                        /* put */ (styleMap["margin-right"] = this.getIndentRight(this.pp));
                        /* put */ (styleMap["margin-top"] = this.getSpBefore(this.pp) + "px");
                        /* put */ (styleMap["margin-bottom"] = this.getSpAfter(this.pp) + "px");
                        /* put */ (styleMap["text-indent"] = this.getIndentFirst(this.pp));
                        /* put */ (styleMap["vertical-align"] = this.getAlignVertical());
                        /* put */ (styleMap["direction"] = this.getTextDirection(this.pp));
                        ret += this.insertAttributes(para, styleMap);
                        return ret;
                    };
                    /**
                     * Returns the text formated according the properties in the last
                     * Char element referenced.
                     * @param {string} text Text to be formated
                     * @return {string} Formated text.
                     */
                    Shape.prototype.getTextCharFormated = function (text) {
                        var ret = "";
                        var color = "color:" + this.getTextColor(this.cp) + ";";
                        var size = "font-size:" + (parseFloat(this.getTextSize(this.cp))) + "px;";
                        var font = "font-family:" + this.getTextFont(this.cp) + ";";
                        var direction = "direction:" + this.getRtlText(this.cp) + ";";
                        var space = "letter-spacing:" + (parseFloat(this.getLetterSpace(this.cp)) / 0.71) + "px;";
                        var lineHeight = "line-height:" + this.getSpcLine(this.pp);
                        var opacity = ";opacity:" + this.getTextOpacity(this.cp);
                        var pos = this.getTextPos(this.cp);
                        var tCase = this.getTextCase(this.cp);
                        if ((function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(tCase, "1")) {
                            text = text.toUpperCase();
                        }
                        else if ((function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(tCase, "2")) {
                            text = com.mxgraph.io.vsdx.mxVsdxUtils.toInitialCapital(text);
                        }
                        if ((function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(pos, "1")) {
                            text = com.mxgraph.io.vsdx.mxVsdxUtils.surroundByTags(text, "sup");
                        }
                        else if ((function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(pos, "2")) {
                            text = com.mxgraph.io.vsdx.mxVsdxUtils.surroundByTags(text, "sub");
                        }
                        text = this.isBold(this.cp) ? com.mxgraph.io.vsdx.mxVsdxUtils.surroundByTags(text, "b") : text;
                        text = this.isItalic(this.cp) ? com.mxgraph.io.vsdx.mxVsdxUtils.surroundByTags(text, "i") : text;
                        text = this.isUnderline(this.cp) ? com.mxgraph.io.vsdx.mxVsdxUtils.surroundByTags(text, "u") : text;
                        text = this.getTextStrike(this.cp) ? com.mxgraph.io.vsdx.mxVsdxUtils.surroundByTags(text, "s") : text;
                        text = this.isSmallCaps(this.cp) ? com.mxgraph.io.vsdx.mxVsdxUtils.toSmallCaps(text, this.getTextSize(this.cp)) : text;
                        ret += "<font style=\"" + size + font + color + direction + space + lineHeight + opacity + "\">" + text + "</font>";
                        return ret;
                    };
                    /**
                     * Returns the direction of the text. It may be right to left or left to right.<br/>
                     * This property may to be founded in the shape, master shape, stylesheet or
                     * default style-sheet.
                     * @param {string} index Index of the Para element that contains the Flags element.
                     * @return {string} The direction of the text.
                     */
                    Shape.prototype.getTextDirection = function (index) {
                        var direction = this.getFlags(index);
                        if ((function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(direction, "0")) {
                            direction = "ltr";
                        }
                        else if ((function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(direction, "1")) {
                            direction = "rtl";
                        }
                        return direction;
                    };
                    /**
                     * Returns the space between lines in a paragraph.<br/>
                     * This property may to be founded in the shape, master shape, stylesheet or
                     * default style-sheet.
                     * @param {string} index Index of the Para element that contains the SpLine element.
                     * @return {string} The space between lines n pixels.
                     */
                    Shape.prototype.getSpcLine = function (index) {
                        var ret = "0";
                        var isPercent = false;
                        var space = this.getSpLine(index);
                        if (space > 0) {
                            space = space * com.mxgraph.io.vsdx.mxVsdxUtils.conversionFactor_$LI$();
                        }
                        else if (space === 0) {
                            space = 100;
                            isPercent = true;
                        }
                        else {
                            space = Math.abs(space) * 100;
                            isPercent = true;
                        }
                        ret = new String(space).toString();
                        ret += isPercent ? "%" : "px";
                        return ret;
                    };
                    /**
                     * Returns the space before a paragraph.<br/>
                     * This property may to be founded in the shape, master shape, stylesheet or
                     * default style-sheet.
                     * @param {string} index Index of the Para element that contains the SpBefore element.
                     * @return {string} The space before the paragraph in pixels.
                     */
                    Shape.prototype.getSpcBefore = function (index) {
                        return this.getSpBefore(index);
                    };
                    /**
                     * Inserts the style attributes contained in attr into the text.<br/>
                     * The text must be surrounded by tags html.
                     * @param {string} text Text where the attributes must be inserted.
                     * @param {*} attr Map with the attributes.
                     * @return {string} Text with the attributes applied like style.
                     */
                    Shape.prototype.insertAttributes = function (text, attr) {
                        if (text.indexOf(">") != -1) {
                            var i = text.indexOf(">");
                            var tail = text.substring(i);
                            var head = text.substring(0, i);
                            var style = " style=\"" + com.mxgraph.io.vsdx.mxVsdxUtils.getStyleString(attr, ":") + "\"";
                            return head + style + tail;
                        }
                        return text;
                    };
                    /**
                     * Returns the direction of the text. It may be right to left or left to right.<br/>
                     * This property may to be founded in the shape, master shape, stylesheet or
                     * default stylesheet.
                     * @param {string} index Index of the Char element that contains the RTLText element.
                     * @return {string} Direction of the text.
                     */
                    Shape.prototype.getRtlText = function (index) {
                        var rtlElem = this.getCellElement$java_lang_String$java_lang_String$java_lang_String(com.mxgraph.io.vsdx.mxVsdxConstants.RTL_TEXT, index, com.mxgraph.io.vsdx.mxVsdxConstants.PARAGRAPH);
                        var direction = this.getValue(rtlElem, "ltr");
                        if ((function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(direction, "0")) {
                            direction = "ltr";
                        }
                        else if ((function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(direction, "1")) {
                            direction = "rtl";
                        }
                        return direction;
                    };
                    /**
                     * Checks if the style property of the Char element of index = 'index'
                     * indicates bold.<br/>
                     * This property may to be founded in the shape, master shape, stylesheet or
                     * default stylesheet.
                     * @param {string} index Index of the Char element that contains the Style element.
                     * @return {boolean} Returns <code>true</code> if the style property of the Char element of
                     * index = 'index' indicates bold.
                     */
                    Shape.prototype.isBold = function (index) {
                        var isBold = false;
                        var style = this.getTextStyle(index);
                        if (!(function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(style, "")) {
                            if ((function (o1, o2) { if (o1 && o1.equals) {
                                return o1.equals(o2);
                            }
                            else {
                                return o1 === o2;
                            } })(style.toLowerCase(), "themed")) {
                            }
                            else {
                                var value = parseInt(style);
                                isBold = ((value & 1) === 1);
                            }
                        }
                        return isBold;
                    };
                    /**
                     * Checks if the style property of the Char element of index = 'index'
                     * indicates italic.<br/>
                     * This property may to be founded in the shape, master shape, stylesheet or
                     * default stylesheet.
                     * @param {string} index Index of the Char element that contains the Style element.
                     * @return {boolean} Returns <code>true</code> if the style property of the Char element of
                     * index = 'index' indicates italic.
                     */
                    Shape.prototype.isItalic = function (index) {
                        var isItalic = false;
                        var style = this.getTextStyle(index);
                        if (!(function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(style, "")) {
                            if ((function (o1, o2) { if (o1 && o1.equals) {
                                return o1.equals(o2);
                            }
                            else {
                                return o1 === o2;
                            } })(style.toLowerCase(), "themed")) {
                            }
                            else {
                                var value = parseInt(style);
                                isItalic = ((value & 2) === 2);
                            }
                        }
                        return isItalic;
                    };
                    /**
                     * Checks if the style property of the Char element of index = 'index'
                     * indicates underline.<br/>
                     * This property may to be founded in the shape, master shape, stylesheet or
                     * default stylesheet.
                     * @param {string} index Index of the Char element that contains the Style element.
                     * @return {boolean} Returns <code>true</code> if the style property of the Char element of
                     * index = 'index' indicates underline.
                     */
                    Shape.prototype.isUnderline = function (index) {
                        var isUnderline = false;
                        var style = this.getTextStyle(index);
                        if (!(function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(style, "")) {
                            if ((function (o1, o2) { if (o1 && o1.equals) {
                                return o1.equals(o2);
                            }
                            else {
                                return o1 === o2;
                            } })(style.toLowerCase(), "themed")) {
                            }
                            else {
                                var value = parseInt(style);
                                isUnderline = ((value & 4) === 4);
                            }
                        }
                        return isUnderline;
                    };
                    /**
                     * Checks if the style property of the Char element of index = 'index'
                     * indicates small caps.<br/>
                     * This property may to be founded in the shape, master shape, stylesheet or
                     * default stylesheet.
                     * @param {string} index Index of the Char element that contains the Style element.
                     * @return {boolean} Returns <code>true</code> if the style property of the Char element of
                     * index = 'index' indicates small caps.
                     */
                    Shape.prototype.isSmallCaps = function (index) {
                        var isSmallCaps = false;
                        var style = this.getTextStyle(index);
                        if (!(function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(style, "")) {
                            if ((function (o1, o2) { if (o1 && o1.equals) {
                                return o1.equals(o2);
                            }
                            else {
                                return o1 === o2;
                            } })(style.toLowerCase(), "themed")) {
                            }
                            else {
                                var value = parseInt(style);
                                isSmallCaps = ((value & 8) === 8);
                            }
                        }
                        return isSmallCaps;
                    };
                    Shape.prototype.getTextOpacity = function (index) {
                        var colorTrans = this.getCellElement$java_lang_String$java_lang_String$java_lang_String(com.mxgraph.io.vsdx.mxVsdxConstants.COLOR_TRANS, index, com.mxgraph.io.vsdx.mxVsdxConstants.CHARACTER);
                        var trans = this.getValue(colorTrans, "0");
                        var result = "1";
                        if (trans != null && !(trans.length === 0)) {
                            var tmp = 1.0 - parseFloat(trans);
                            result = new String(tmp).toString();
                        }
                        return result;
                    };
                    /**
                     * Returns the actual text size defined by the Char element referenced in cp.<br/>
                     * This property may to be founded in the shape, master shape, stylesheet or
                     * default stylesheet.
                     * @param {string} index Index of the Char element that contains the Size element.
                     * @return {string} Returns the size of the font in pixels.
                     */
                    Shape.prototype.getTextSize = function (index) {
                        var sizeElem = this.getCellElement$java_lang_String$java_lang_String$java_lang_String(com.mxgraph.io.vsdx.mxVsdxConstants.SIZE, index, com.mxgraph.io.vsdx.mxVsdxConstants.CHARACTER);
                        var size = this.getScreenNumericalValue$org_w3c_dom_Element$double(sizeElem, 12);
                        return ('' + (Math.round(size * 100) / 100));
                    };
                    /**
                     * Returns the vertical align of the label.<br/>
                     * The property may to be defined in master shape or text stylesheet.<br/>
                     * @return {string} Vertical align (bottom, middle and top)
                     */
                    Shape.prototype.getAlignVertical = function () {
                        var vertical = mxConstants.ALIGN_MIDDLE;
                        var align = parseInt(this.getValue(this.getCellElement$java_lang_String(com.mxgraph.io.vsdx.mxVsdxConstants.VERTICAL_ALIGN), "1"));
                        if (align === 0) {
                            vertical = mxConstants.ALIGN_TOP;
                        }
                        else if (align === 2) {
                            vertical = mxConstants.ALIGN_BOTTOM;
                        }
                        return vertical;
                    };
                    Shape.prototype.getGeomList = function () {
                        return this.geomList;
                    };
                    Shape.prototype.getLastX = function () {
                        return this.lastX;
                    };
                    Shape.prototype.getLastY = function () {
                        return this.lastY;
                    };
                    Shape.prototype.getLastMoveX = function () {
                        return this.lastMoveX;
                    };
                    Shape.prototype.getLastMoveY = function () {
                        return this.lastMoveY;
                    };
                    Shape.prototype.getLastKnot = function () {
                        return this.lastKnot;
                    };
                    Shape.prototype.setLastX = function (lastX) {
                        this.lastX = lastX;
                    };
                    Shape.prototype.setLastY = function (lastY) {
                        this.lastY = lastY;
                    };
                    Shape.prototype.setLastMoveX = function (lastMoveX) {
                        this.lastMoveX = lastMoveX;
                    };
                    Shape.prototype.setLastMoveY = function (lastMoveY) {
                        this.lastMoveY = lastMoveY;
                    };
                    Shape.prototype.setLastKnot = function (lastKnot) {
                        this.lastKnot = lastKnot;
                    };

                    Shape.prototype.getConnections = function () 
                    {
						var connections = [];

                    	if (this.sections && this.sections['Connection'])
                    	{
                            var h = this.getHeight(), w = this.getWidth();
	                    	var rows = com.mxgraph.io.vsdx.mxVsdxUtils.getDirectChildNamedElements(this.sections['Connection'].elem, "Row");

	                    	for (var i = 0; i < rows.length; i++)
	                    	{
								var cells = com.mxgraph.io.vsdx.mxVsdxUtils.getDirectChildElements(rows[i]);
                                var x, y;

                        		for (var j = 0; j < cells.length; j++)
                    			{
                            		var cell = cells[j];
									var cn = cell.getAttribute("N");
                                    var val = this.getScreenNumericalValue$org_w3c_dom_Element$double(cell, 0);
                        			
                        			if (cn == 'X')
                        			{
                            			x = mxUtils.format(val / w);
                        			}
                                    else if (cn == 'Y')
                                    {
                                        y = mxUtils.format(1 - val / h);
                                    }
                        		}

                                if (x != null && y != null)
                                {
                                    connections.push({x: x, y: y});
                                }
		                    }
                    	}

                        if (connections.length == 0 && this.master && this.master.masterShape)
                        {
                            connections = this.master.masterShape.getConnections();
                        }

						return connections;
                    };

                    return Shape;
                }(com.mxgraph.io.vsdx.Style));
                Shape.VSDX_START_TIME = new Date('1899-12-30T00:00:00Z').getTime();
                vsdx.Shape = Shape;
                Shape["__class"] = "com.mxgraph.io.vsdx.Shape";
            })(vsdx = io.vsdx || (io.vsdx = {}));
        })(io = mxgraph.io || (mxgraph.io = {}));
    })(mxgraph = com.mxgraph || (com.mxgraph = {}));
})(com || (com = {}));
(function (com) {
    var mxgraph;
    (function (mxgraph) {
        var io;
        (function (io) {
            var vsdx;
            (function (vsdx) {
                /**
                 * Create a new instance of mxVdxShape.
                 * This method get the references to the master element, master shape
                 * and stylesheet.
                 * @param {*} shape
                 * @param {com.mxgraph.io.vsdx.mxVsdxPage} page
                 * @param {boolean} vertex
                 * @param {*} masters
                 * @param {com.mxgraph.io.vsdx.mxVsdxMaster} master
                 * @param {com.mxgraph.io.vsdx.mxVsdxModel} model
                 * @class
                 * @extends com.mxgraph.io.vsdx.Shape
                 */
                var VsdxShape = (function (_super) {
                    __extends(VsdxShape, _super);
                    function VsdxShape(page, shape, vertex, masters, master, model) {
                    	//BUG in JSweet, fields default values and explicit assignments are not the same (defaults are before super() and assignments are after)!
                    	var _this = this;

                        _this.masterShape = null;
                        _this.master = null;
                        _this.parentHeight = 0;

                        _this = _super.call(this, shape, model) || this;
                        
                        /**
                         * Whether or not to assume HTML labels
                         */
                        _this.htmlLabels = true;
                        /**
                         * If the shape is a sub shape, this is a reference to its root shape, otherwise null
                         */
                        _this.rootShape = _this;
                        /**
                         * The prefix of the shape name
                         */
                        _this.shapeName = null;
                        /**
                         * Shape index
                         */
                        _this.shapeIndex = 0;
                        /**
                         * Whether this cell is a vertex
                         */
                        _this.vertex = true;
                        _this.childShapes = ({});
                        
                        
                        var masterId = _this.getMasterId();
                        var masterShapeLocal = _this.getShapeMasterId();
                        if (masterId != null) {
                            _this.master = (function (m, k) { return m[k] ? m[k] : null; })(masters, masterId);
                        }
                        else {
                            _this.master = master;
                        }
                        if (_this.master != null) {
                            if (masterId == null && masterShapeLocal != null) {
                                _this.masterShape = _this.master.getSubShape(masterShapeLocal);
                            }
                            else {
                                _this.masterShape = _this.master.getMasterShape();
                            }
                        }
                        var name = _this.getNameU();
                        var index = name.lastIndexOf(".");
                        if (index !== -1) {
                            name = name.substring(0, index);
                        }
                        _this.shapeName = name;
                        var shapesList = shape.getElementsByTagName(com.mxgraph.io.vsdx.mxVsdxConstants.SHAPES);
                        if (shapesList != null && shapesList.length > 0) {
                            var shapesElement = shapesList.item(0);
                            _this.childShapes = page.parseShapes(shapesElement, _this.master, false);
                        }
                        var rotation = _this.calcRotation();
                        _this.rotation = rotation * 100 / 100;
                        _this.rotation = _this.rotation % 360.0;
                        var themeIndex = page.getCellIntValue("ThemeIndex", -100);
                        if (themeIndex === -100) {
                            themeIndex = parseInt(_this.getValue(_this.getCellElement$java_lang_String("ThemeIndex"), "0"));
                        }
                        var theme = (function (m, k) { if (m.entries == null)
                            m.entries = []; for (var i = 0; i < m.entries.length; i++)
                            if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                return m.entries[i].value;
                            } return null; })(model.getThemes(), themeIndex);
                        if (theme == null) {
                            theme = model.getDefaultTheme();
                        }
                        var variant = page.getCellIntValue("VariationColorIndex", 0);
                        _this.setThemeAndVariant(theme, variant);
                        {
                            var array161 = (function (m) { if (m.entries == null)
                                m.entries = []; return m.entries; })(_this.childShapes);
                            for (var index160 = 0; index160 < array161.length; index160++) {
                                var entry = array161[index160];
                                {
                                    var childShape = entry.getValue();
                                    childShape.setRootShape(_this);
                                    if (childShape.theme == null) {
                                        childShape.setThemeAndVariant(theme, variant);
                                    }
                                }
                            }
                        }
                        _this.quickStyleVals = new com.mxgraph.io.vsdx.theme.QuickStyleVals(/* parseInt */ parseInt(_this.getValue(_this.getCellElement$java_lang_String("QuickStyleEffectsMatrix"), "0")), /* parseInt */ parseInt(_this.getValue(_this.getCellElement$java_lang_String("QuickStyleFillColor"), "1")), /* parseInt */ parseInt(_this.getValue(_this.getCellElement$java_lang_String("QuickStyleFillMatrix"), "0")), /* parseInt */ parseInt(_this.getValue(_this.getCellElement$java_lang_String("QuickStyleFontColor"), "1")), /* parseInt */ parseInt(_this.getValue(_this.getCellElement$java_lang_String("QuickStyleFontMatrix"), "0")), /* parseInt */ parseInt(_this.getValue(_this.getCellElement$java_lang_String("QuickStyleLineColor"), "1")), /* parseInt */ parseInt(_this.getValue(_this.getCellElement$java_lang_String("QuickStyleLineMatrix"), "0")), /* parseInt */ parseInt(_this.getValue(_this.getCellElement$java_lang_String("QuickStyleShadowColor"), "1")), /* parseInt */ parseInt(_this.getValue(_this.getCellElement$java_lang_String("QuickStyleType"), "0")), /* parseInt */ parseInt(_this.getValue(_this.getCellElement$java_lang_String("QuickStyleVariation"), "0")));
                        if (_this.masterShape != null) {
                            _this.masterShape.processGeomList(null);
                            _this.processGeomList(_this.masterShape.getGeomList());
                            if (_this.width === 0)
                                _this.width = _this.getScreenNumericalValue$org_w3c_dom_Element$double(_this.getCellElement$java_lang_String(com.mxgraph.io.vsdx.mxVsdxConstants.WIDTH), 0);
                            if (_this.height === 0)
                                _this.height = _this.getScreenNumericalValue$org_w3c_dom_Element$double(_this.getCellElement$java_lang_String(com.mxgraph.io.vsdx.mxVsdxConstants.HEIGHT), 0);
                        }
                        else {
                            _this.processGeomList(null);
                        }

                        // TODO It's hard to detect edges that should be treated like vertexes whhen they are groups and have child shapes.
                        // TODO Check this again if more complains are received or if we can have an edge group
                        _this.vertex = vertex || (!page.connectsMap[_this.Id] && (_this.childShapes != null && !(function (m) { if (m.entries == null)
                            m.entries = []; return m.entries.length == 0; })(_this.childShapes)) || (_this.geomList != null && (!_this.geomList.isNoFill()  || _this.geomList.getGeoCount() > 1)));
                        _this.layerMember = _this.getValue(_this.getCellElement$java_lang_String("LayerMember"));
                        
                        if (_this.layerMember)
                    	{
                        	 _this.layerMember =  _this.layerMember.split(';');
                    	}
                        
                        return _this;
                    }
                    VsdxShape.__static_initialize = function () { if (!VsdxShape.__static_initialized) {
                        VsdxShape.__static_initialized = true;
                        VsdxShape.__static_initializer_0();
                    } };
                    VsdxShape.OFFSET_ARRAY_$LI$ = function () { VsdxShape.__static_initialize(); if (VsdxShape.OFFSET_ARRAY == null)
                        VsdxShape.OFFSET_ARRAY = (["Organizational unit", "Domain 3D"].slice(0).slice(0)); return VsdxShape.OFFSET_ARRAY; };
                    ;
                    VsdxShape.arrowSizes_$LI$ = function () { VsdxShape.__static_initialize(); if (VsdxShape.arrowSizes == null)
                        VsdxShape.arrowSizes = [2, 3, 5, 7, 9, 22, 45]; return VsdxShape.arrowSizes; };
                    ;
                    VsdxShape.arrowTypes_$LI$ = function () { VsdxShape.__static_initialize(); return VsdxShape.arrowTypes; };
                    ;
                    VsdxShape.__static_initializer_0 = function () {
//            			mxResources.add("/js/vsdx/resources/edgeNameU");
//            			mxResources.add("/js/vsdx/resources/nameU");
                        VsdxShape.arrowTypes = ({});
                        /* put */ (function (m, k, v) { if (m.entries == null)
                            m.entries = []; for (var i = 0; i < m.entries.length; i++)
                            if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                m.entries[i].value = v;
                                return;
                            } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(VsdxShape.arrowTypes_$LI$(), 0, mxConstants.NONE);
                        /* put */ (function (m, k, v) { if (m.entries == null)
                            m.entries = []; for (var i = 0; i < m.entries.length; i++)
                            if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                m.entries[i].value = v;
                                return;
                            } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(VsdxShape.arrowTypes_$LI$(), 1, mxConstants.ARROW_OPEN);
                        /* put */ (function (m, k, v) { if (m.entries == null)
                            m.entries = []; for (var i = 0; i < m.entries.length; i++)
                            if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                m.entries[i].value = v;
                                return;
                            } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(VsdxShape.arrowTypes_$LI$(), 2, "blockThin");
                        /* put */ (function (m, k, v) { if (m.entries == null)
                            m.entries = []; for (var i = 0; i < m.entries.length; i++)
                            if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                m.entries[i].value = v;
                                return;
                            } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(VsdxShape.arrowTypes_$LI$(), 3, mxConstants.ARROW_OPEN);
                        /* put */ (function (m, k, v) { if (m.entries == null)
                            m.entries = []; for (var i = 0; i < m.entries.length; i++)
                            if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                m.entries[i].value = v;
                                return;
                            } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(VsdxShape.arrowTypes_$LI$(), 4, mxConstants.ARROW_BLOCK);
                        /* put */ (function (m, k, v) { if (m.entries == null)
                            m.entries = []; for (var i = 0; i < m.entries.length; i++)
                            if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                m.entries[i].value = v;
                                return;
                            } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(VsdxShape.arrowTypes_$LI$(), 5, mxConstants.ARROW_CLASSIC);
                        /* put */ (function (m, k, v) { if (m.entries == null)
                            m.entries = []; for (var i = 0; i < m.entries.length; i++)
                            if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                m.entries[i].value = v;
                                return;
                            } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(VsdxShape.arrowTypes_$LI$(), 10, mxConstants.ARROW_OVAL);
                        /* put */ (function (m, k, v) { if (m.entries == null)
                            m.entries = []; for (var i = 0; i < m.entries.length; i++)
                            if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                m.entries[i].value = v;
                                return;
                            } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(VsdxShape.arrowTypes_$LI$(), 13, mxConstants.ARROW_BLOCK);
                        /* put */ (function (m, k, v) { if (m.entries == null)
                            m.entries = []; for (var i = 0; i < m.entries.length; i++)
                            if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                m.entries[i].value = v;
                                return;
                            } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(VsdxShape.arrowTypes_$LI$(), 14, VsdxShape.ARROW_NO_FILL_MARKER + mxConstants.ARROW_BLOCK);
                        /* put */ (function (m, k, v) { if (m.entries == null)
                            m.entries = []; for (var i = 0; i < m.entries.length; i++)
                            if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                m.entries[i].value = v;
                                return;
                            } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(VsdxShape.arrowTypes_$LI$(), 17, VsdxShape.ARROW_NO_FILL_MARKER + mxConstants.ARROW_CLASSIC);
                        /* put */ (function (m, k, v) { if (m.entries == null)
                            m.entries = []; for (var i = 0; i < m.entries.length; i++)
                            if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                m.entries[i].value = v;
                                return;
                            } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(VsdxShape.arrowTypes_$LI$(), 20, VsdxShape.ARROW_NO_FILL_MARKER + mxConstants.ARROW_OVAL);
                        /* put */ (function (m, k, v) { if (m.entries == null)
                            m.entries = []; for (var i = 0; i < m.entries.length; i++)
                            if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                m.entries[i].value = v;
                                return;
                            } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(VsdxShape.arrowTypes_$LI$(), 22, VsdxShape.ARROW_NO_FILL_MARKER + "diamond");
                        /* put */ (function (m, k, v) { if (m.entries == null)
                            m.entries = []; for (var i = 0; i < m.entries.length; i++)
                            if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                m.entries[i].value = v;
                                return;
                            } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(VsdxShape.arrowTypes_$LI$(), 23, "dash");
                        /* put */ (function (m, k, v) { if (m.entries == null)
                            m.entries = []; for (var i = 0; i < m.entries.length; i++)
                            if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                m.entries[i].value = v;
                                return;
                            } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(VsdxShape.arrowTypes_$LI$(), 24, "ERone");
                        /* put */ (function (m, k, v) { if (m.entries == null)
                            m.entries = []; for (var i = 0; i < m.entries.length; i++)
                            if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                m.entries[i].value = v;
                                return;
                            } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(VsdxShape.arrowTypes_$LI$(), 25, "ERmandOne");
                        /* put */ (function (m, k, v) { if (m.entries == null)
                            m.entries = []; for (var i = 0; i < m.entries.length; i++)
                            if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                m.entries[i].value = v;
                                return;
                            } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(VsdxShape.arrowTypes_$LI$(), 27, "ERmany");
                        /* put */ (function (m, k, v) { if (m.entries == null)
                            m.entries = []; for (var i = 0; i < m.entries.length; i++)
                            if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                m.entries[i].value = v;
                                return;
                            } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(VsdxShape.arrowTypes_$LI$(), 28, "ERoneToMany");
                        /* put */ (function (m, k, v) { if (m.entries == null)
                            m.entries = []; for (var i = 0; i < m.entries.length; i++)
                            if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                m.entries[i].value = v;
                                return;
                            } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(VsdxShape.arrowTypes_$LI$(), 29, "ERzeroToMany");
                        /* put */ (function (m, k, v) { if (m.entries == null)
                            m.entries = []; for (var i = 0; i < m.entries.length; i++)
                            if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                m.entries[i].value = v;
                                return;
                            } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(VsdxShape.arrowTypes_$LI$(), 30, "ERzeroToOne");
                        /* put */ (function (m, k, v) { if (m.entries == null)
                            m.entries = []; for (var i = 0; i < m.entries.length; i++)
                            if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                m.entries[i].value = v;
                                return;
                            } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(VsdxShape.arrowTypes_$LI$(), 6, mxConstants.ARROW_BLOCK);
                        /* put */ (function (m, k, v) { if (m.entries == null)
                            m.entries = []; for (var i = 0; i < m.entries.length; i++)
                            if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                m.entries[i].value = v;
                                return;
                            } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(VsdxShape.arrowTypes_$LI$(), 7, mxConstants.ARROW_OPEN);
                        /* put */ (function (m, k, v) { if (m.entries == null)
                            m.entries = []; for (var i = 0; i < m.entries.length; i++)
                            if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                m.entries[i].value = v;
                                return;
                            } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(VsdxShape.arrowTypes_$LI$(), 8, mxConstants.ARROW_CLASSIC);
                        /* put */ (function (m, k, v) { if (m.entries == null)
                            m.entries = []; for (var i = 0; i < m.entries.length; i++)
                            if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                m.entries[i].value = v;
                                return;
                            } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(VsdxShape.arrowTypes_$LI$(), 9, "openAsync");
                        /* put */ (function (m, k, v) { if (m.entries == null)
                            m.entries = []; for (var i = 0; i < m.entries.length; i++)
                            if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                m.entries[i].value = v;
                                return;
                            } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(VsdxShape.arrowTypes_$LI$(), 11, "diamond");
                        /* put */ (function (m, k, v) { if (m.entries == null)
                            m.entries = []; for (var i = 0; i < m.entries.length; i++)
                            if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                m.entries[i].value = v;
                                return;
                            } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(VsdxShape.arrowTypes_$LI$(), 12, mxConstants.ARROW_OPEN);
                        /* put */ (function (m, k, v) { if (m.entries == null)
                            m.entries = []; for (var i = 0; i < m.entries.length; i++)
                            if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                m.entries[i].value = v;
                                return;
                            } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(VsdxShape.arrowTypes_$LI$(), 15, VsdxShape.ARROW_NO_FILL_MARKER + mxConstants.ARROW_BLOCK);
                        /* put */ (function (m, k, v) { if (m.entries == null)
                            m.entries = []; for (var i = 0; i < m.entries.length; i++)
                            if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                m.entries[i].value = v;
                                return;
                            } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(VsdxShape.arrowTypes_$LI$(), 16, VsdxShape.ARROW_NO_FILL_MARKER + mxConstants.ARROW_BLOCK);
                        /* put */ (function (m, k, v) { if (m.entries == null)
                            m.entries = []; for (var i = 0; i < m.entries.length; i++)
                            if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                m.entries[i].value = v;
                                return;
                            } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(VsdxShape.arrowTypes_$LI$(), 18, VsdxShape.ARROW_NO_FILL_MARKER + mxConstants.ARROW_BLOCK);
                        /* put */ (function (m, k, v) { if (m.entries == null)
                            m.entries = []; for (var i = 0; i < m.entries.length; i++)
                            if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                m.entries[i].value = v;
                                return;
                            } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(VsdxShape.arrowTypes_$LI$(), 19, VsdxShape.ARROW_NO_FILL_MARKER + mxConstants.ARROW_CLASSIC);
                        /* put */ (function (m, k, v) { if (m.entries == null)
                            m.entries = []; for (var i = 0; i < m.entries.length; i++)
                            if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                m.entries[i].value = v;
                                return;
                            } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(VsdxShape.arrowTypes_$LI$(), 21, VsdxShape.ARROW_NO_FILL_MARKER + "diamond");
                        /* put */ (function (m, k, v) { if (m.entries == null)
                            m.entries = []; for (var i = 0; i < m.entries.length; i++)
                            if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                m.entries[i].value = v;
                                return;
                            } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(VsdxShape.arrowTypes_$LI$(), 26, "ERmandOne");
                        /* put */ (function (m, k, v) { if (m.entries == null)
                            m.entries = []; for (var i = 0; i < m.entries.length; i++)
                            if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                m.entries[i].value = v;
                                return;
                            } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(VsdxShape.arrowTypes_$LI$(), 31, VsdxShape.ARROW_NO_FILL_MARKER + mxConstants.ARROW_OVAL);
                        /* put */ (function (m, k, v) { if (m.entries == null)
                            m.entries = []; for (var i = 0; i < m.entries.length; i++)
                            if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                m.entries[i].value = v;
                                return;
                            } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(VsdxShape.arrowTypes_$LI$(), 32, VsdxShape.ARROW_NO_FILL_MARKER + mxConstants.ARROW_OVAL);
                        /* put */ (function (m, k, v) { if (m.entries == null)
                            m.entries = []; for (var i = 0; i < m.entries.length; i++)
                            if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                m.entries[i].value = v;
                                return;
                            } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(VsdxShape.arrowTypes_$LI$(), 33, VsdxShape.ARROW_NO_FILL_MARKER + mxConstants.ARROW_OVAL);
                        /* put */ (function (m, k, v) { if (m.entries == null)
                            m.entries = []; for (var i = 0; i < m.entries.length; i++)
                            if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                m.entries[i].value = v;
                                return;
                            } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(VsdxShape.arrowTypes_$LI$(), 34, VsdxShape.ARROW_NO_FILL_MARKER + mxConstants.ARROW_OVAL);
                        /* put */ (function (m, k, v) { if (m.entries == null)
                            m.entries = []; for (var i = 0; i < m.entries.length; i++)
                            if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                m.entries[i].value = v;
                                return;
                            } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(VsdxShape.arrowTypes_$LI$(), 35, mxConstants.ARROW_OVAL);
                        /* put */ (function (m, k, v) { if (m.entries == null)
                            m.entries = []; for (var i = 0; i < m.entries.length; i++)
                            if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                m.entries[i].value = v;
                                return;
                            } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(VsdxShape.arrowTypes_$LI$(), 36, mxConstants.ARROW_OVAL);
                        /* put */ (function (m, k, v) { if (m.entries == null)
                            m.entries = []; for (var i = 0; i < m.entries.length; i++)
                            if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                m.entries[i].value = v;
                                return;
                            } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(VsdxShape.arrowTypes_$LI$(), 37, mxConstants.ARROW_OVAL);
                        /* put */ (function (m, k, v) { if (m.entries == null)
                            m.entries = []; for (var i = 0; i < m.entries.length; i++)
                            if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                m.entries[i].value = v;
                                return;
                            } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(VsdxShape.arrowTypes_$LI$(), 38, mxConstants.ARROW_OVAL);
                        /* put */ (function (m, k, v) { if (m.entries == null)
                            m.entries = []; for (var i = 0; i < m.entries.length; i++)
                            if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                m.entries[i].value = v;
                                return;
                            } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(VsdxShape.arrowTypes_$LI$(), 39, mxConstants.ARROW_BLOCK);
                        /* put */ (function (m, k, v) { if (m.entries == null)
                            m.entries = []; for (var i = 0; i < m.entries.length; i++)
                            if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                m.entries[i].value = v;
                                return;
                            } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(VsdxShape.arrowTypes_$LI$(), 40, VsdxShape.ARROW_NO_FILL_MARKER + mxConstants.ARROW_BLOCK);
                        /* put */ (function (m, k, v) { if (m.entries == null)
                            m.entries = []; for (var i = 0; i < m.entries.length; i++)
                            if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                m.entries[i].value = v;
                                return;
                            } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(VsdxShape.arrowTypes_$LI$(), 41, VsdxShape.ARROW_NO_FILL_MARKER + mxConstants.ARROW_OVAL);
                        /* put */ (function (m, k, v) { if (m.entries == null)
                            m.entries = []; for (var i = 0; i < m.entries.length; i++)
                            if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                m.entries[i].value = v;
                                return;
                            } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(VsdxShape.arrowTypes_$LI$(), 42, mxConstants.ARROW_OVAL);
                        /* put */ (function (m, k, v) { if (m.entries == null)
                            m.entries = []; for (var i = 0; i < m.entries.length; i++)
                            if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                m.entries[i].value = v;
                                return;
                            } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(VsdxShape.arrowTypes_$LI$(), 43, mxConstants.ARROW_OPEN);
                        /* put */ (function (m, k, v) { if (m.entries == null)
                            m.entries = []; for (var i = 0; i < m.entries.length; i++)
                            if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                m.entries[i].value = v;
                                return;
                            } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(VsdxShape.arrowTypes_$LI$(), 44, mxConstants.ARROW_OPEN);
                        /* put */ (function (m, k, v) { if (m.entries == null)
                            m.entries = []; for (var i = 0; i < m.entries.length; i++)
                            if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                m.entries[i].value = v;
                                return;
                            } m.entries.push({ key: k, value: v, getKey: function () { return this.key; }, getValue: function () { return this.value; } }); })(VsdxShape.arrowTypes_$LI$(), 45, mxConstants.ARROW_OPEN);
                    };
                    VsdxShape.__com_mxgraph_io_vsdx_VsdxShape_LOGGER_$LI$ = function () { VsdxShape.__static_initialize(); if (VsdxShape.__com_mxgraph_io_vsdx_VsdxShape_LOGGER == null)
                        VsdxShape.__com_mxgraph_io_vsdx_VsdxShape_LOGGER = {}; return VsdxShape.__com_mxgraph_io_vsdx_VsdxShape_LOGGER; };
                    ;
                    /**
                     * Locates the first entry for the specified attribute string in the shape hierarchy.
                     * The order is to look locally, then delegate the request to the master shape
                     * if it doesn't exist locally
                     * @param {string} key The key of the shape to find
                     * @return {*} the Element that first resolves to that shape key or null or none is found
                     */
                    VsdxShape.prototype.getShapeNode = function (key) {
                        var elem = (function (m, k) { return m[k] ? m[k] : null; })(this.cellElements, key);
                        if (elem == null && this.masterShape != null) {
                            return this.masterShape.getCellElement$java_lang_String(key);
                        }
                        return elem;
                    };
                    /**
                     * Returns the value of the Text element.<br/>
                     * If the shape has no text, it is obtained from the master shape.
                     * @return {string} Text label of the shape.
                     */
                    VsdxShape.prototype.getTextLabel = function (noOverflow) {
                        var hideText = this.getValue(this.getCellElement$java_lang_String(com.mxgraph.io.vsdx.mxVsdxConstants.HIDE_TEXT), "0");
                        if ((function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })("1", hideText)) {
                            return null;
                        }
                        var txtChildren = this.getTextChildren();
                        if (txtChildren == null && this.masterShape != null) {
                            txtChildren = this.masterShape.getTextChildren();
                        }
                        if (this.htmlLabels) {
                            if (txtChildren != null) {
                                /* put */ (this.styleMap[mxConstants.STYLE_VERTICAL_ALIGN] = this.getAlignVertical());
                                /* put */ (this.styleMap[mxConstants.STYLE_ALIGN] = this.getHorizontalAlign("0", false));
                                if (!noOverflow)
                                {
                                    this.styleMap['overflow'] = 'width';
                                }
                                return this.getHtmlTextContent(txtChildren);
                            }
                        }
                        else {
                            var text = this.getText();
                            if (text == null && this.masterShape != null) {
                                return this.masterShape.getText();
                            }
                            else {
                                return text;
                            }
                        }
                        return null;
                    };
                    /*private*/ VsdxShape.prototype.getIndex = function (elem) {
                        var ix = elem.getAttribute("IX") || "";
                        return (ix.length === 0) ? "0" : ix;
                    };
                    /**
                     * Initialises the text labels
                     * @param {*} children the text Elements
                     */
                    VsdxShape.prototype.initLabels = function (children) {
                        this.paragraphs = ({});
                        var ch = null;
                        var pg = null;
                        var fld = null;
                        for (var index = 0; index < children.length; index++) {
                            var value = null;
                            var node = children.item(index);
                            var nodeName = node.nodeName;
                            switch ((nodeName)) {
                                case "cp":
                                    {
                                        var elem = node;
                                        ch = this.getIndex(elem);
                                    }
                                    ;
                                    break;
                                case "tp":
                                    {
                                        var elem = node;
                                        this.getIndex(elem);
                                    }
                                    ;
                                    break;
                                case "pp":
                                    {
                                        var elem = node;
                                        pg = this.getIndex(elem);
                                    }
                                    ;
                                    break;
                                case "fld":
                                    {
                                        var elem = node;
                                        fld = this.getIndex(elem);
                                        break;
                                    }
                                    ;
                                case "#text":
                                    {
                                        value = node.textContent;
                                        var para = (function (m, k) { return m[k] ? m[k] : null; })(this.paragraphs, pg);
                                        if (para == null) {
                                            para = new com.mxgraph.io.vsdx.Paragraph(value, ch, pg, fld);
                                            /* put */ (this.paragraphs[pg] = para);
                                        }
                                        else {
                                            para.addText(value, ch, fld);
                                        }
                                    }
                                    ;
                            }
                        }
                        ;
                    };
                    /**
                     *
                     * @param {string} index
                     * @return
                     * @return {string}
                     */
                    VsdxShape.prototype.createHybridLabel = function (index) {
                        var para = (function (m, k) { return m[k] ? m[k] : null; })(this.paragraphs, index);
                        /* put */ (this.styleMap[mxConstants.STYLE_ALIGN] = this.getHorizontalAlign(index, false));
                        /* put */ (this.styleMap[mxConstants.STYLE_SPACING_LEFT] = this.getIndentLeft(index));
                        /* put */ (this.styleMap[mxConstants.STYLE_SPACING_RIGHT] = this.getIndentRight(index));
                        /* put */ (this.styleMap[mxConstants.STYLE_SPACING_TOP] = this.getSpBefore(index));
                        /* put */ (this.styleMap[mxConstants.STYLE_SPACING_BOTTOM] = this.getSpAfter(index));
                        /* put */ (this.styleMap[mxConstants.STYLE_VERTICAL_ALIGN] = this.getAlignVertical());
                        /* put */ (this.styleMap["fontColor"] = this.getTextColor(index));
                        /* put */ (this.styleMap["fontSize"] = this.getTextSize(index));
                        /* put */ (this.styleMap["fontFamily"] = this.getTextFont(index));
                        var fontStyle = this.isBold(index) ? mxConstants.FONT_BOLD : 0;
                        fontStyle |= this.isItalic(index) ? mxConstants.FONT_ITALIC : 0;
                        fontStyle |= this.isUnderline(index) ? mxConstants.FONT_UNDERLINE : 0;
                        /* put */ (this.styleMap["fontStyle"] = new String(fontStyle).toString());
                        var numValues = para.numValues();
                        var result = null;
                        for (var i = 0; i < numValues; i++) {
                            var value = para.getValue(i);
                            if ((value.length === 0) && this.fields != null) {
                                var fieldIx = para.getField(i);
                                if (fieldIx != null) {
                                    value = (function (m, k) { return m[k] ? m[k] : null; })(this.fields, fieldIx);
                                    if (value == null && this.masterShape != null && this.masterShape.fields != null) {
                                        value = (function (m, k) { return m[k] ? m[k] : null; })(this.masterShape.fields, fieldIx);
                                    }
                                }
                            }
                            if (value != null) {
                                result = result == null ? value : result + value;
                            }
                        }
                        ;
                        return result;
                    };
                    /**
                     * Returns the text contained in the shape formated with tags html.<br/>
                     * @return {string} Text content in html.
                     * @param {*} txtChildren
                     */
                    VsdxShape.prototype.getHtmlTextContent = function (txtChildren) {
                    	var ret = "";
                        var first = true;
                        var ulMode = false;
                        var ulModeFirst = false; 
                        
                    	function processLblTxt(text) 
                        {
                            text = com.mxgraph.io.vsdx.mxVsdxUtils.htmlEntities(text);
                            
                            if (ulModeFirst)
                        	{
                            	text = '<li>' + text;
                            	ulModeFirst = false;
                        	}
                            
                            if (ulMode)
                        	{
                        		var entries = text.split('\n');
                                
                                if (!entries[entries.length - 1]) 
                                {
                                	entries.pop();
                                	ulModeFirst = true; 
                                }
                                
                                text = entries.join('</li><li>');
                        	}
                            else
                        	{
                            	text = text.replace(new RegExp('\n', 'g'), '<br/>').replace(new RegExp(com.mxgraph.io.vsdx.Shape.UNICODE_LINE_SEP, 'g'), '<br/>');
                        	}
                            
                            return this.getTextCharFormated(text);
                        };

                        if (txtChildren != null && txtChildren.length > 0) {
                            for (var index = 0; index < txtChildren.length; index++) {
                                var node = txtChildren.item(index);
                                if ((function (o1, o2) { if (o1 && o1.equals) {
                                    return o1.equals(o2);
                                }
                                else {
                                    return o1 === o2;
                                } })(node.nodeName, "cp")) {
                                    var elem = node;
                                    this.cp = this.getIndex(elem);
                                }
                                else if ((function (o1, o2) { if (o1 && o1.equals) {
                                    return o1.equals(o2);
                                }
                                else {
                                    return o1 === o2;
                                } })(node.nodeName, "tp")) {
                                    var elem = node;
                                    this.tp = this.getIndex(elem);
                                }
                                else if ((function (o1, o2) { if (o1 && o1.equals) {
                                    return o1.equals(o2);
                                }
                                else {
                                    return o1 === o2;
                                } })(node.nodeName, "pp")) 
                                {
                                    var elem = node;
                                    this.pp = this.getIndex(elem);

                                    if (ulMode)
                                	{
                                    	//TODO closing li is wrongly placed after font (and other tags (e.g, b, i))
                                    	ret += '</li></ul>';
                                	}
                                    
                                    if (first) 
                                    {
                                        first = false;
                                    }
                                    else 
                                    {
                                        ret += "</p>";
                                    }
                                    
                                    var para = "<p>";
                                    ret += this.getTextParagraphFormated(para);
                                    
                                    var ul = this.getPPList(this.pp);
                                    
                                    ulMode = ul != null;
                                    ulModeFirst = ulMode; 
                                    ret += ulMode? ul : '';
                                }
                                else if ((function (o1, o2) { if (o1 && o1.equals) {
                                    return o1.equals(o2);
                                }
                                else {
                                    return o1 === o2;
                                } })(node.nodeName, "fld")) {
                                    var elem = node;
                                    this.fld = this.getIndex(elem);
                                    var text = null;
                                    if (this.fields != null) {
                                        text = (function (m, k) { return m[k] ? m[k] : null; })(this.fields, this.fld);
                                    }
                                    if (text == null && this.masterShape != null && this.masterShape.fields != null) {
                                        text = (function (m, k) { return m[k] ? m[k] : null; })(this.masterShape.fields, this.fld);
                                    }
                                    if (text != null)
                                        ret += processLblTxt.call(this, text);
                                }
                                else if ((function (o1, o2) { if (o1 && o1.equals) {
                                    return o1.equals(o2);
                                }
                                else {
                                    return o1 === o2;
                                } })(node.nodeName, "#text")) {
                                    var text = node.textContent;
                                    ret += processLblTxt.call(this, text);
                                }
                            }
                        }
                        
                        if (ulMode)
                    	{
                        	//TODO closing li is wrongly placed after font (and other tags (e.g, b, i))
                        	ret += '</li></ul>';
                    	}
                        
                        var end = first ? "" : "</p>";
                        ret += end;
                        return com.mxgraph.io.vsdx.mxVsdxUtils.surroundByTags(ret, "div", "font-size: 1px");
                    };
                    
                    /**
                     * Checks if a nameU is for big connectors.
                     * @param {string} nameU NameU attribute.
                     * @return {boolean} Returns <code>true</code> if a nameU is for big connectors.
                     */
                    VsdxShape.prototype.isConnectorBigNameU = function (nameU) {
                        return (function (str, searchString, position) {
                            if (position === void 0) { position = 0; }
                            return str.substr(position, searchString.length) === searchString;
                        })(nameU, "60 degree single") || (function (str, searchString, position) {
                            if (position === void 0) { position = 0; }
                            return str.substr(position, searchString.length) === searchString;
                        })(nameU, "45 degree single") || (function (str, searchString, position) {
                            if (position === void 0) { position = 0; }
                            return str.substr(position, searchString.length) === searchString;
                        })(nameU, "45 degree double") || (function (str, searchString, position) {
                            if (position === void 0) { position = 0; }
                            return str.substr(position, searchString.length) === searchString;
                        })(nameU, "60 degree double") || (function (str, searchString, position) {
                            if (position === void 0) { position = 0; }
                            return str.substr(position, searchString.length) === searchString;
                        })(nameU, "45 degree  tail") || (function (str, searchString, position) {
                            if (position === void 0) { position = 0; }
                            return str.substr(position, searchString.length) === searchString;
                        })(nameU, "60 degree  tail") || (function (str, searchString, position) {
                            if (position === void 0) { position = 0; }
                            return str.substr(position, searchString.length) === searchString;
                        })(nameU, "45 degree tail") || (function (str, searchString, position) {
                            if (position === void 0) { position = 0; }
                            return str.substr(position, searchString.length) === searchString;
                        })(nameU, "60 degree tail") || (function (str, searchString, position) {
                            if (position === void 0) { position = 0; }
                            return str.substr(position, searchString.length) === searchString;
                        })(nameU, "Flexi-arrow 2") || (function (str, searchString, position) {
                            if (position === void 0) { position = 0; }
                            return str.substr(position, searchString.length) === searchString;
                        })(nameU, "Flexi-arrow 1") || (function (str, searchString, position) {
                            if (position === void 0) { position = 0; }
                            return str.substr(position, searchString.length) === searchString;
                        })(nameU, "Flexi-arrow 3") || (function (str, searchString, position) {
                            if (position === void 0) { position = 0; }
                            return str.substr(position, searchString.length) === searchString;
                        })(nameU, "Double flexi-arrow") || (function (str, searchString, position) {
                            if (position === void 0) { position = 0; }
                            return str.substr(position, searchString.length) === searchString;
                        })(nameU, "Fancy arrow");
                    };
                    /**
                     * Checks if the shape represents a vertex.
                     * @return {boolean} Returns <code>true</code> if the shape represents a vertex.
                     */
                    VsdxShape.prototype.isVertex = function () {
                        return this.vertex;
                    };
                    /**
                     * Returns the coordinates of the top left corner of the Shape.
                     * When a coordinate is not found, it is taken from masterShape.
                     * @param {number} parentHeight Height of the parent cell of the shape.
                     * @param {boolean} rotation whether to allow for cell rotation
                     * @return {mxPoint} mxPoint that represents the coordinates
                     */
                    VsdxShape.prototype.getOriginPoint = function (parentHeight, rotation) {
                        var px = this.getPinX();
                        var py = this.getPinY();
                        var lpy = this.getLocPinY();
                        var lpx = this.getLocPinX();
                        var w = this.getScreenNumericalValue$org_w3c_dom_Element$double(this.getShapeNode(com.mxgraph.io.vsdx.mxVsdxConstants.WIDTH), 0);
                        var h = this.getScreenNumericalValue$org_w3c_dom_Element$double(this.getShapeNode(com.mxgraph.io.vsdx.mxVsdxConstants.HEIGHT), 0);
                        var x = px - lpx;
                        var y = parentHeight - ((py) + (h - lpy));
                        if (rotation && (lpy !== h / 2 || lpx !== w / 2)) {
                            if (this.rotation !== 0) {
                                var vecX = w / 2 - lpx;
                                var vecY = lpy - h / 2;
                                var cos = Math.cos(/* toRadians */ (function (x) { return x * Math.PI / 180; })(360 - this.rotation));
                                var sin = Math.sin(/* toRadians */ (function (x) { return x * Math.PI / 180; })(360 - this.rotation));
                                return new mxPoint(x + vecX - (vecX * cos - vecY * sin), (vecX * sin + vecY * cos) + y - vecY);
                            }
                        }
                        return new mxPoint(x, y);
                    };
                    /**
                     * Returns the width and height of the Shape expressed like an mxPoint.<br/>
                     * x = width<br/>
                     * y = height<br/>
                     * When a dimension is not found, it is taken from masterShape.
                     * @return {mxPoint} mxPoint that represents the dimensions of the shape.
                     */
                    VsdxShape.prototype.getDimensions = function () {
                        var w = this.getScreenNumericalValue$org_w3c_dom_Element$double(this.getShapeNode(com.mxgraph.io.vsdx.mxVsdxConstants.WIDTH), 0);
                        var h = this.getScreenNumericalValue$org_w3c_dom_Element$double(this.getShapeNode(com.mxgraph.io.vsdx.mxVsdxConstants.HEIGHT), 0);
                        return new mxPoint(w === 0 && h > 0 ? 1 : w, h === 0 && w > 0 ? 1 : h);
                    };
                    /**
                     * Returns the value of the pinX element.
                     * @return {number} The shape pinX element
                     */
                    VsdxShape.prototype.getPinX = function () {
                        return this.getScreenNumericalValue$org_w3c_dom_Element$double(this.getShapeNode(com.mxgraph.io.vsdx.mxVsdxConstants.PIN_X), 0);
                    };
                    /**
                     * Returns the value of the pinY element in pixels.
                     * @return {number} Numerical value of the pinY element.
                     */
                    VsdxShape.prototype.getPinY = function () {
                        return this.getScreenNumericalValue$org_w3c_dom_Element$double(this.getShapeNode(com.mxgraph.io.vsdx.mxVsdxConstants.PIN_Y), 0);
                    };
                    /**
                     * Returns the value of the locPinX element in pixels.
                     * @return {number} Numerical value of the pinY element.
                     */
                    VsdxShape.prototype.getLocPinX = function () {
                        return this.getScreenNumericalValue$org_w3c_dom_Element$double(this.getShapeNode(com.mxgraph.io.vsdx.mxVsdxConstants.LOC_PIN_X), 0);
                    };
                    /**
                     * Returns the value of the locPinY element in pixels.
                     * @return {number} Numerical value of the locPinY element.
                     */
                    VsdxShape.prototype.getLocPinY = function () {
                        return this.getScreenNumericalValue$org_w3c_dom_Element$double(this.getShapeNode(com.mxgraph.io.vsdx.mxVsdxConstants.LOC_PIN_Y), 0);
                    };
                    /**
                     * Returns the opacity of the Shape.<br/>
                     * @return {number} Double in the range of (transparent = 0)..(100 = opaque)
                     * @param {string} key
                     * @private
                     */
                    /*private*/ VsdxShape.prototype.getOpacity = function (key) {
                        var opacity = 100;
                        if (this.isGroup()) {
                            opacity = 0;
                        }
                        opacity = this.getValueAsDouble(this.getCellElement$java_lang_String(key), 0);
                        opacity = 100 - opacity * 100;
                        opacity = Math.max(opacity, 0);
                        opacity = Math.min(opacity, 100);
                        return opacity;
                    };
                    /**
                     * Returns the background color for apply in the gradient.<br/>
                     * If no gradient must be applicated, returns an empty string.
                     * @return {string} hexadecimal representation of the color.
                     * @private
                     */
                    /*private*/ VsdxShape.prototype.getGradient = function () {
                        var fillGradientEnabled = this.getValue(this.getCellElement$java_lang_String(com.mxgraph.io.vsdx.mxVsdxConstants.FILL_GRADIENT_ENABLED), "0");
                        if ((function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })("1", fillGradientEnabled)) {
                            var fillGradient = (function (m, k) { return m[k] ? m[k] : null; })(this.sections, "FillGradient");
                            if (fillGradient != null) {
                                var rows = com.mxgraph.io.vsdx.mxVsdxUtils.getDirectChildNamedElements(fillGradient.elem, "Row");
                                var color = this.getColor(fillGradient.getIndexedCell(/* get */ rows[rows.length - 1].getAttribute("IX"), "GradientStopColor"));
                                if (color != null && !(color.length === 0))
                                    return color;
                            }
                        }
                        var gradient = "";
                        var fillPattern = this.getValue(this.getCellElement$java_lang_String(com.mxgraph.io.vsdx.mxVsdxConstants.FILL_PATTERN), "0");
                        if (parseInt(fillPattern) >= 25) {
                            gradient = this.getColor(this.getCellElement$java_lang_String(com.mxgraph.io.vsdx.mxVsdxConstants.FILL_BKGND));
                        }
                        else {
                            var theme_11 = this.getTheme();
                            if (theme_11 != null) {
                                var gradColor = theme_11.getFillGraientColor(this.getQuickStyleVals());
                                if (gradColor != null)
                                    gradient = gradColor.toHexStr();
                            }
                        }
                        return gradient;
                    };
                    /**
                     * Returns the direction of the gradient.<br/>
                     * If no gradient has to be applied, returns an empty string.
                     * @return {string} Direction.(east, west, north or south)
                     * @private
                     */
                    /*private*/ VsdxShape.prototype.getGradientDirection = function () {
                        var direction = "";
                        var fillPattern = this.getValue(this.getCellElement$java_lang_String(com.mxgraph.io.vsdx.mxVsdxConstants.FILL_PATTERN), "0");
                        if ((function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(fillPattern, "25")) {
                            direction = mxConstants.DIRECTION_EAST;
                        }
                        else if ((function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(fillPattern, "27")) {
                            direction = mxConstants.DIRECTION_WEST;
                        }
                        else if ((function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(fillPattern, "28")) {
                            direction = mxConstants.DIRECTION_SOUTH;
                        }
                        else if ((function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(fillPattern, "30")) {
                            direction = mxConstants.DIRECTION_NORTH;
                        }
                        return direction;
                    };
                    /**
                     * Returns the rotation of the shape.<br/>
                     * @return {number} Rotation of the shape in degrees.
                     */
                    VsdxShape.prototype.calcRotation = function () {
                        var rotation = parseFloat(this.getValue(this.getCellElement$java_lang_String(com.mxgraph.io.vsdx.mxVsdxConstants.ANGLE), "0"));
                        rotation = (function (x) { return x * 180 / Math.PI; })(rotation);
                        rotation = rotation % 360;
                        rotation = rotation * 100 / 100;
                        return 360 - rotation;
                    };
                    /**
                     * Used to pass in a parents rotation to the child
                     * @param {number} parentRotation the rotation of the parent
                     */
                    VsdxShape.prototype.propagateRotation = function (parentRotation) {
                        this.rotation += parentRotation;
                        this.rotation %= 360;
                        this.rotation = this.rotation * 100 / 100;
                    };
                    /**
                     * Returns the top spacing of the label in pixels.<br/>
                     * The property may to be defined in master shape or text stylesheet.<br/>
                     * @return {number} Top spacing in double precision.
                     */
                    VsdxShape.prototype.getTopSpacing = function () {
                        var topMargin = this.getTextTopMargin();
                        topMargin = (topMargin / 2 - 2.8) * 100 / 100;
                        return topMargin;
                    };
                    /**
                     * Returns the bottom spacing of the label in pixels.<br/>
                     * The property may to be defined in master shape or text stylesheet.<br/>
                     * @return {number} Bottom spacing in double precision.
                     */
                    VsdxShape.prototype.getBottomSpacing = function () {
                        var bottomMargin = this.getTextBottomMargin();
                        bottomMargin = (bottomMargin / 2 - 2.8) * 100 / 100;
                        return bottomMargin;
                    };
                    /**
                     * Returns the left spacing of the label in pixels.<br/>
                     * The property may to be defined in master shape or text stylesheet.<br/>
                     * @return {number} Left spacing in double precision.
                     */
                    VsdxShape.prototype.getLeftSpacing = function () {
                        var leftMargin = this.getTextLeftMargin();
                        leftMargin = (leftMargin / 2 - 2.8) * 100 / 100;
                        return leftMargin;
                    };
                    /**
                     * Returns the right spacing of the label in pixels.<br/>
                     * The property may to be defined in master shape or text stylesheet.<br/>
                     * @return {number} Right spacing in double precision.
                     */
                    VsdxShape.prototype.getRightSpacing = function () {
                        var rightMargin = this.getTextRightMargin();
                        rightMargin = (rightMargin / 2 - 2.8) * 100 / 100;
                        return rightMargin;
                    };
                    /**
                     * Checks if the label must be rotated.<br/>
                     * The property may to be defined in master shape or text stylesheet.<br/>
                     * @return {boolean} Returns <code>true<code/> if the label should remain horizontal.
                     */
                    VsdxShape.prototype.getLabelRotation = function () {
                        var hor = true;
                        var rotation = this.calcRotation();
                        var angle = parseFloat(this.getValue(this.getCellElement$java_lang_String(com.mxgraph.io.vsdx.mxVsdxConstants.TXT_ANGLE), "0"));
                        angle = (function (x) { return x * 180 / Math.PI; })(angle);
                        angle = angle - rotation;
                        if (!(Math.abs(angle) < 45 || Math.abs(angle) > 270)) {
                            hor = false;
                        }
                        return hor;
                    };
                    
                    /**
                     * Get hyperlink address or subaddress
                     */
                    VsdxShape.prototype.getHyperlink = function () 
                    {
                    	var addressElem = this.getCellElement$java_lang_String$java_lang_String$java_lang_String('Address', null, 'Hyperlink');
                    	var extLink = this.getValue(addressElem, '');
                    	
                    	var subAddressElem = this.getCellElement$java_lang_String$java_lang_String$java_lang_String('SubAddress', null, 'Hyperlink');
                    	var pageLink = this.getValue(subAddressElem, '');

                    	return {extLink: extLink, pageLink: pageLink};
                    };

                    VsdxShape.prototype.getProperties = function () 
                    {
						var props = [];

                    	if (this.sections && this.sections['Property'])
                    	{
	                    	var rows = com.mxgraph.io.vsdx.mxVsdxUtils.getDirectChildNamedElements(this.sections['Property'].elem, "Row");

	                    	for (var i = 0; i < rows.length; i++)
	                    	{
			                    var row = rows[i];
                            	var n = row.getAttribute("N");
                            	
								var cells = com.mxgraph.io.vsdx.mxVsdxUtils.getDirectChildElements(row);

                        		for (var j = 0; j < cells.length; j++)
                    			{
                            		var cell = cells[j];
									var cn = cell.getAttribute("N");
                        			 
                        			if (cn == 'Value')
                        			{
                            			props.push({key: n, val: cell.getAttribute("V")});
                            			break;
                        			}
                        		}
		                    }
                    	}

						return props;
                    };

                    /**
                     * Analyzes the shape and returns a string with the style.
                     * @return {*} style read from the shape.
                     */
                    VsdxShape.prototype.getStyleFromShape = function () {
                        /* put */ (this.styleMap[com.mxgraph.io.vsdx.mxVsdxConstants.VSDX_ID] = this.getId().toString());
                        this.rotation = Math.round(this.rotation);
                        if (this.rotation !== 0) {
                            /* put */ (this.styleMap[mxConstants.STYLE_ROTATION] = ('' + (this.rotation)));
                        }
                        var fillcolor = this.getFillColor();
                        if (!(function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(fillcolor, "")) {
                            /* put */ (this.styleMap[mxConstants.STYLE_FILLCOLOR] = fillcolor);
                        }
                        else {
                            /* put */ (this.styleMap[mxConstants.STYLE_FILLCOLOR] = "none");
                        }
                        var id = this.getId();
                        this.styleDebug("ID = " + id + " , Fill Color = " + fillcolor);
                        var gradient = this.getGradient();
                        if (!(function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(gradient, "")) {
                            /* put */ (this.styleMap[mxConstants.STYLE_GRADIENTCOLOR] = gradient);
                            var gradientDirection = this.getGradientDirection();
                            if (!(function (o1, o2) { if (o1 && o1.equals) {
                                return o1.equals(o2);
                            }
                            else {
                                return o1 === o2;
                            } })(gradientDirection, "") && !(function (o1, o2) { if (o1 && o1.equals) {
                                return o1.equals(o2);
                            }
                            else {
                                return o1 === o2;
                            } })(gradientDirection, mxConstants.DIRECTION_SOUTH)) {
                                /* put */ (this.styleMap[mxConstants.STYLE_GRADIENT_DIRECTION] = gradientDirection);
                            }
                        }
                        else {
                            /* put */ (this.styleMap[mxConstants.STYLE_GRADIENTCOLOR] = "none");
                        }
                        var opacity = this.getOpacity(com.mxgraph.io.vsdx.mxVsdxConstants.FILL_FOREGND_TRANS);
                        if (opacity < 100) {
                            /* put */ (this.styleMap[mxConstants.STYLE_FILL_OPACITY] = ('' + (opacity)));
                        }
                        opacity = this.getOpacity(com.mxgraph.io.vsdx.mxVsdxConstants.LINE_COLOR_TRANS);
                        if (opacity < 100) {
                            /* put */ (this.styleMap[mxConstants.STYLE_STROKE_OPACITY] = ('' + (opacity)));
                        }
                        var form = this.getForm();
                        if (form.hasOwnProperty(mxConstants.STYLE_SHAPE) && ((function (str, searchString, position) {
                            if (position === void 0) { position = 0; }
                            return str.substr(position, searchString.length) === searchString;
                        })(/* get */ (function (m, k) { return m[k] ? m[k] : null; })(form, mxConstants.STYLE_SHAPE), "image;"))) {
                            /* put */ (this.styleMap[mxConstants.STYLE_WHITE_SPACE] = "wrap");
                        }
                        
                        //this.styleMap.putAll(form);
                        for (var key in form)
                    	{
                        	this.styleMap[key] = form[key];
                    	}
                        
                        if (this.isDashed()) {
                            /* put */ (this.styleMap[mxConstants.STYLE_DASHED] = "1");
                            var dashPattern = this.getDashPattern();
                            if (dashPattern != null) {
                                /* put */ (this.styleMap[mxConstants.STYLE_DASH_PATTERN] = dashPattern);
                            }
                        }
                        var color = this.getStrokeColor();
                        var tr = this.getStrokeTransparency();
                        this.styleDebug("ID = " + id + " , Color = " + color + " , stroke transparency = " + tr);
                        if (!(function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(color, "") && tr !== 1) {
                            /* put */ (this.styleMap[mxConstants.STYLE_STROKECOLOR] = color);
                        }
                        else {
                        }
                        var lWeight = (Math.round(this.getLineWidth()) | 0);
                        if (lWeight !== 1) {
                            /* put */ (this.styleMap[mxConstants.STYLE_STROKEWIDTH] = ('' + (lWeight)));
                        }
                        if (this.isShadow()) {
                            /* put */ (this.styleMap[mxConstants.STYLE_SHADOW] = com.mxgraph.io.vsdx.mxVsdxConstants.TRUE);
                        }
                        var topMargin = (Math.round(this.getTopSpacing()) | 0);
                        if (topMargin !== 0) {
                            /* put */ (this.styleMap[mxConstants.STYLE_SPACING_TOP] = ('' + (topMargin)));
                        }
                        var bottomMargin = (Math.round(this.getBottomSpacing()) | 0);
                        if (bottomMargin !== 0) {
                            /* put */ (this.styleMap[mxConstants.STYLE_SPACING_BOTTOM] = ('' + (bottomMargin)));
                        }
                        var leftMargin = (Math.round(this.getLeftSpacing()) | 0);
                        if (leftMargin !== 0) {
                            /* put */ (this.styleMap[mxConstants.STYLE_SPACING_LEFT] = ('' + (leftMargin)));
                        }
                        var rightMargin = (Math.round(this.getRightSpacing()) | 0);
                        if (rightMargin !== 0) {
                            /* put */ (this.styleMap[mxConstants.STYLE_SPACING_RIGHT] = ('' + (rightMargin)));
                        }
                        var direction = this.getDirection(form);
                        if (direction !== mxConstants.DIRECTION_EAST) {
                            /* put */ (this.styleMap[mxConstants.STYLE_DIRECTION] = direction);
                        }
                        var flibX = this.getValue(this.getCellElement$java_lang_String(com.mxgraph.io.vsdx.mxVsdxConstants.FLIP_X), "0");
                        var flibY = this.getValue(this.getCellElement$java_lang_String(com.mxgraph.io.vsdx.mxVsdxConstants.FLIP_Y), "0");
                        if ((function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })("1", flibX)) {
                            /* put */ (this.styleMap[mxConstants.STYLE_FLIPH] = "1");
                        }
                        if ((function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })("1", flibY)) {
                            /* put */ (this.styleMap[mxConstants.STYLE_FLIPV] = "1");
                        }

                        //Connection points
                        try
                        {
                            var connections = this.getConnections();
                            var cPoints = [];

                            for (var i = 0; i < connections.length; i++)
                            {
                                //TODO Does vsdx connections points needs dx/dy?
                                cPoints.push('[' + connections[i].x + ',' + connections[i].y + ',0]');
                            }

                            this.styleMap['points'] = '[' + cPoints.join(',') + ']';
                        }
                        catch(e)
                        {
                            console.log(e);
                        }

                        this.resolveCommonStyles();
                        return this.styleMap;
                    };
                    /*private*/ VsdxShape.prototype.getDashPattern = function () {
                        var pattern = null;
                        var linePattern = this.getValue(this.getCellElement$java_lang_String(com.mxgraph.io.vsdx.mxVsdxConstants.LINE_PATTERN), "0");
                        if ((function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(linePattern, "Themed")) {
                            var theme_12 = this.getTheme();
                            if (theme_12 != null) {
                                pattern = this.isVertex() ? theme_12.getLineDashPattern$com_mxgraph_io_vsdx_theme_QuickStyleVals(this.getQuickStyleVals()) : theme_12.getConnLineDashPattern(this.getQuickStyleVals());
                            }
                        }
                        else {
                            pattern = vsdx.Style.getLineDashPattern(/* parseInt */ parseInt(linePattern));
                        }
                        if (pattern != null && !(pattern.length == 0)) {
                            var str = { str: "", toString: function () { return this.str; } };
                            var _loop_4 = function (index162) {
                                var len = pattern[index162];
                                {
                                    /* append */ (function (sb) { return sb.str = sb.str.concat(len.toFixed(2) + " "); })(str);
                                }
                            };
                            for (var index162 = 0; index162 < pattern.length; index162++) {
                                _loop_4(index162);
                            }
                            return str.str.trim();
                        }
                        return null;
                    };
                    /**
                     * Checks if the lines of the shape are dashed.<br/>
                     * The property may to be defined in master shape or line stylesheet.<br/>
                     * @return {boolean} Returns <code>true</code> if the lines of the shape are dashed.
                     */
                    VsdxShape.prototype.isDashed = function () {
                        var linePattern = this.getValue(this.getCellElement$java_lang_String(com.mxgraph.io.vsdx.mxVsdxConstants.LINE_PATTERN), "0");
                        if ((function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(linePattern, "Themed")) {
                            var theme_13 = this.getTheme();
                            if (theme_13 != null) {
                                return this.isVertex() ? theme_13.isLineDashed$com_mxgraph_io_vsdx_theme_QuickStyleVals(this.getQuickStyleVals()) : theme_13.isConnLineDashed(this.getQuickStyleVals());
                            }
                        }
                        else if (!((function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(linePattern, "0") || (function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(linePattern, "1"))) {
                            return true;
                        }
                        return false;
                    };
                    /**
                     * Returns the line width.<br/>
                     * The property may to be defined in master shape or line stylesheet.<br/>
                     * @return {number} Line width in pixels.
                     */
                    VsdxShape.prototype.getLineWidth = function () {
                        var lineWeight = this.getValue(this.getCellElement$java_lang_String(com.mxgraph.io.vsdx.mxVsdxConstants.LINE_WEIGHT), "1");
                        var lWeight = 1;
                        try {
                            if ((function (o1, o2) { if (o1 && o1.equals) {
                                return o1.equals(o2);
                            }
                            else {
                                return o1 === o2;
                            } })(lineWeight, "Themed")) {
                                var theme_14 = this.getTheme();
                                if (theme_14 != null) {
                                    lWeight = (this.isVertex() ? theme_14.getLineWidth$com_mxgraph_io_vsdx_theme_QuickStyleVals(this.getQuickStyleVals()) : theme_14.getConnLineWidth(this.getQuickStyleVals())) / 10000.0;
                                }
                            }
                            else {
                                lWeight = parseFloat(lineWeight);
                                lWeight = this.getScreenNumericalValue$double(lWeight);
                            }
                        }
                        catch (e) {
                        }
                        ;
                        if (lWeight < 1) {
                            lWeight *= 2;
                        }
                        return lWeight;
                    };
                    /**
                     * Returns the start arrow size.<br/>
                     * The property may to be defined in master shape or line stylesheet.<br/>
                     * Determines the value in pixels of each arrow size category in .vdx.
                     * @return {number} Size in pixels.
                     */
                    VsdxShape.prototype.getStartArrowSize = function () {
                        var baSize = this.getValue(this.getCellElement$java_lang_String(com.mxgraph.io.vsdx.mxVsdxConstants.BEGIN_ARROW_SIZE), "4");
                        try {
                            var size = 4;
                            if ((function (o1, o2) { if (o1 && o1.equals) {
                                return o1.equals(o2);
                            }
                            else {
                                return o1 === o2;
                            } })(baSize, "Themed")) {
                                var theme_15 = this.getTheme();
                                if (theme_15 != null) {
                                    size = this.isVertex() ? theme_15.getStartSize(this.getQuickStyleVals()) : theme_15.getConnStartSize(this.getQuickStyleVals());
                                }
                            }
                            else {
                                size = parseFloat(baSize);
                            }
                            return VsdxShape.arrowSizes_$LI$()[size];
                        }
                        catch (e) {
                        }
                        ;
                        return 4;
                    };
                    /**
                     * Returns the end arrow size.<br/>
                     * The property may to be defined in master shape or line stylesheet.<br/>
                     * Determines the value in pixels of each arrow size category in .vdx.
                     * @return {number} Size in pixels.
                     */
                    VsdxShape.prototype.getFinalArrowSize = function () {
                        var eaSize = this.getValue(this.getCellElement$java_lang_String(com.mxgraph.io.vsdx.mxVsdxConstants.END_ARROW_SIZE), "4");
                        try {
                            var size = 4;
                            if ((function (o1, o2) { if (o1 && o1.equals) {
                                return o1.equals(o2);
                            }
                            else {
                                return o1 === o2;
                            } })(eaSize, "Themed")) {
                                var theme_16 = this.getTheme();
                                if (theme_16 != null) {
                                    size = this.isVertex() ? theme_16.getEndSize(this.getQuickStyleVals()) : theme_16.getConnEndSize(this.getQuickStyleVals());
                                }
                            }
                            else {
                                size = parseFloat(eaSize);
                            }
                            return VsdxShape.arrowSizes_$LI$()[size];
                        }
                        catch (e) {
                        }
                        ;
                        return 4;
                    };
                    /**
                     * Returns whether the cell is Rounded.<br/>
                     * The property may to be defined in master shape or line stylesheet.<br/>
                     * @return {boolean} Returns <code>true</code> if the cell is Rounded.
                     */
                    VsdxShape.prototype.getRounding = function () {
                        var val = this.getValue(this.getCellElement$java_lang_String(com.mxgraph.io.vsdx.mxVsdxConstants.ROUNDING), "0");
                        if ((function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })("Themed", val)) {
                            val = "0";
                        }
                        return parseFloat(val);
                    };
                    /**
                     * Return if the line has shadow.<br/>
                     * The property may to be defined in master shape or line stylesheet.<br/>
                     * @return {boolean} Returns <code>mxVdxConstants.TRUE</code> if the line has shadow.
                     */
                    VsdxShape.prototype.isShadow = function () {
                        var shdw = this.getValue(this.getCellElement$java_lang_String(com.mxgraph.io.vsdx.mxVsdxConstants.SHDW_PATTERN), "0");
                        if ((function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(shdw, "Themed")) {
                        }
                        else if (!(function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(shdw, "0")) {
                            return true;
                        }
                        return false;
                    };
                    VsdxShape.prototype.getEdgeStyle$java_util_Map = function (edgeShape) {
                        var result = ({});
                        var edgeName = (function (m, k) { return m[k] ? m[k] : null; })(edgeShape, mxConstants.STYLE_SHAPE);
                        if ((function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(edgeName, "mxgraph.lean_mapping.electronic_info_flow_edge")) {
                            /* put */ (result[mxConstants.STYLE_EDGE] = mxConstants.NONE);
                            return result;
                        }
                        else {
                            /* put */ (result[mxConstants.STYLE_EDGE] = mxConstants.EDGESTYLE_ELBOW);
                            return result;
                        }
                    };
                    /**
                     * Returns the style of the edge. (Orthogonal or straight)
                     * @return {*} Edge Style.
                     * @param {*} edgeShape
                     */
                    VsdxShape.prototype.getEdgeStyle = function (edgeShape) {
                        if (((edgeShape != null && (edgeShape instanceof Object)) || edgeShape === null)) {
                            return this.getEdgeStyle$java_util_Map(edgeShape);
                        }
                        else if (edgeShape === undefined) {
                            return this.getEdgeStyle$();
                        }
                        else
                            throw new Error('invalid overload');
                    };
                    /**
                     * Returns the master's Id of the Shape.
                     * @return {string} Master's ID of the shape, null if has not a master.
                     */
                    VsdxShape.prototype.getMasterId = function () {
                        if (this.shape.hasAttribute(com.mxgraph.io.vsdx.mxVsdxConstants.MASTER)) {
                            return this.shape.getAttribute(com.mxgraph.io.vsdx.mxVsdxConstants.MASTER);
                        }
                        else {
                            return null;
                        }
                    };
                    /**
                     * Returns the masterShape's Id of the shape.
                     * @return {string} Master Shape's ID of the shape, null if has not a master shape.
                     */
                    VsdxShape.prototype.getShapeMasterId = function () {
                        if (this.shape.hasAttribute(com.mxgraph.io.vsdx.mxVsdxConstants.MASTER_SHAPE)) {
                            return this.shape.getAttribute(com.mxgraph.io.vsdx.mxVsdxConstants.MASTER_SHAPE);
                        }
                        else {
                            return null;
                        }
                    };
                    /**
                     * Checks if a shape contains other shapes inside.
                     * @return {boolean} Returns <code>true</code> if a shape contains other shapes inside.
                     */
                    VsdxShape.prototype.isGroup = function () {
                        return (function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(this.shape.getAttribute("Type"), "Group");
                    };
                    /**
                     * Checks if a shape contains other shapes inside.
                     * @return {string} Returns <code>true</code> if a shape contains other shapes inside.
                     * @param {*} shape
                     */
                    VsdxShape.getType = function (shape) {
                        return shape.getAttribute("Type");
                    };
                    VsdxShape.prototype.getMaster = function () {
                        return this.master;
                    };
                    /**
                     * Returns the NameU attribute.
                     * @return {string} Value of the NameU attribute.
                     */
                    VsdxShape.prototype.getNameU = function () {
                        var result = this.shape.getAttribute(com.mxgraph.io.vsdx.mxVsdxConstants.NAME_U) || "";
                        if ((result == null || (function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(result, "")) && this.masterShape != null) {
                            result = this.masterShape.getNameU();
                        }
                        return result;
                    };
                    /**
                     * Returns the Name attribute.
                     * @return {string} Value of the Name attribute (Human readable name).
                     */
                    VsdxShape.prototype.getName = function () {
                        var result = this.shape.getAttribute(com.mxgraph.io.vsdx.mxVsdxConstants.NAME);
                        if ((result == null || (function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(result, "")) && this.masterShape != null) {
                            result = this.masterShape.getName();
                        }
                        return result;
                    };
                    /**
                     * Returns the master name of the shape
                     * @return {string} Master name of the shape
                     */
                    VsdxShape.prototype.getMasterName = function () {
                        return this.shapeName;
                    };
                    VsdxShape.prototype.setLabelOffset = function (vertex, style) {
                        var nameU = "";
                        var masterNameU = "";
                        if (this.shape.hasAttribute(com.mxgraph.io.vsdx.mxVsdxConstants.NAME_U)) {
                            nameU = this.shape.getAttribute(com.mxgraph.io.vsdx.mxVsdxConstants.NAME_U);
                        }
                        if (this.getMaster() != null && this.getMaster().getMasterElement() != null) {
                            if (this.getMaster().getMasterElement().hasAttribute(com.mxgraph.io.vsdx.mxVsdxConstants.NAME_U)) {
                                masterNameU = this.getMaster().getMasterElement().getAttribute(com.mxgraph.io.vsdx.mxVsdxConstants.NAME_U);
                            }
                        }
                        if ((function (str, searchString, position) {
                            if (position === void 0) { position = 0; }
                            return str.substr(position, searchString.length) === searchString;
                        })(nameU, "Organizational unit") || (function (str, searchString, position) {
                            if (position === void 0) { position = 0; }
                            return str.substr(position, searchString.length) === searchString;
                        })(masterNameU, "Organizational unit")) {
                            var control = this.shape.getElementsByTagName(com.mxgraph.io.vsdx.mxVsdxConstants.CONTROL).item(0);
                            var xEl = null;
                            var xS = "0.0";
                            var yEl = null;
                            var yS = "-0.4";
                            if (control != null) {
                                xEl = control.getElementsByTagName(com.mxgraph.io.vsdx.mxVsdxConstants.X).item(0);
                                if (xEl.hasAttribute("F")) {
                                    xS = xEl.getAttribute("F");
                                }
                                else {
                                    xS = xEl.textContent;
                                }
                                yEl = control.getElementsByTagName(com.mxgraph.io.vsdx.mxVsdxConstants.Y).item(0);
                                if (yEl.hasAttribute("F")) {
                                    yS = yEl.getAttribute("F");
                                }
                                else {
                                    yS = yEl.textContent;
                                }
                            }
                            var geometry_3 = vertex.getGeometry();
                            xS = xS.split("Width/2+").join("");
                            xS = xS.split("DL").join("");
                            yS = yS.split("Height*").join("");
                            if ((function (o1, o2) { if (o1 && o1.equals) {
                                return o1.equals(o2);
                            }
                            else {
                                return o1 === o2;
                            } })(xS, "Inh")) {
                                xS = "0.0";
                            }
                            if ((function (o1, o2) { if (o1 && o1.equals) {
                                return o1.equals(o2);
                            }
                            else {
                                return o1 === o2;
                            } })(yS, "Inh")) {
                                yS = "-0.4";
                            }
                            if (yS.indexOf("txtHeight") != -1) {
                                yS = "-0.4";
                            }
                            var styleArray = style.split(";");
                            var tabHeight = "";
                            for (var i = 0; i < styleArray.length; i++) {
                                var currStyle = styleArray[i];
                                currStyle = currStyle.trim();
                                if ((function (str, searchString, position) {
                                    if (position === void 0) { position = 0; }
                                    return str.substr(position, searchString.length) === searchString;
                                })(currStyle, "tabHeight=")) {
                                    tabHeight = currStyle.split("tabHeight=").join("");
                                }
                            }
                            ;
                            if ((function (o1, o2) { if (o1 && o1.equals) {
                                return o1.equals(o2);
                            }
                            else {
                                return o1 === o2;
                            } })(tabHeight, "")) {
                                tabHeight = "20";
                            }
                            var tH = parseFloat(tabHeight);
                            var x = parseFloat(xS);
                            var y = parseFloat(yS);
                            var h = geometry_3.height;
                            var xFinal = geometry_3.width * 0.1 + x * 100;
                            var yFinal = h - h * y - tH / 2;
                            var offset = new mxPoint(xFinal, yFinal);
                            vertex.getGeometry().offset = (offset);
                        }
                        else if ((function (str, searchString, position) {
                            if (position === void 0) { position = 0; }
                            return str.substr(position, searchString.length) === searchString;
                        })(nameU, "Domain 3D") || (function (str, searchString, position) {
                            if (position === void 0) { position = 0; }
                            return str.substr(position, searchString.length) === searchString;
                        })(masterNameU, "Domain 3D")) {
                            var control = this.shape.getElementsByTagName(com.mxgraph.io.vsdx.mxVsdxConstants.CONTROL).item(0);
                            var xEl = null;
                            var xS = "0.0";
                            var yEl = null;
                            var yS = "-0.4";
                            if (control != null) {
                                xEl = control.getElementsByTagName(com.mxgraph.io.vsdx.mxVsdxConstants.X).item(0);
                                xS = xEl.getAttribute("F") || "";
                                yEl = control.getElementsByTagName(com.mxgraph.io.vsdx.mxVsdxConstants.Y).item(0);
                                yS = yEl.getAttribute("F") || "";
                            }
                            var geometry_4 = vertex.getGeometry();
                            xS = xS.split("Width/2+").join("");
                            xS = xS.split("DL").join("");
                            yS = yS.split("Height*").join("");
                            if ((function (o1, o2) { if (o1 && o1.equals) {
                                return o1.equals(o2);
                            }
                            else {
                                return o1 === o2;
                            } })(xS, "Inh") || (function (o1, o2) { if (o1 && o1.equals) {
                                return o1.equals(o2);
                            }
                            else {
                                return o1 === o2;
                            } })(xS, "")) {
                                xS = "0.0";
                            }
                            if ((function (o1, o2) { if (o1 && o1.equals) {
                                return o1.equals(o2);
                            }
                            else {
                                return o1 === o2;
                            } })(yS, "Inh") || (function (o1, o2) { if (o1 && o1.equals) {
                                return o1.equals(o2);
                            }
                            else {
                                return o1 === o2;
                            } })(yS, "")) {
                                yS = "-0.4";
                            }
                            if (yS.indexOf("txtHeight") != -1) {
                                yS = "-0.4";
                            }
                            var x = parseFloat(xS);
                            var y = parseFloat(yS);
                            var h = geometry_4.height;
                            var xFinal = geometry_4.width * 0.1 + x * 100;
                            var yFinal = h - h * y;
                            var offset = new mxPoint(xFinal, yFinal);
                            vertex.getGeometry().offset = (offset);
                        }
                    };
                    /**
                     * Returns the constant that represents the Shape.
                     * @return {*} String that represent the form.
                     */
                    VsdxShape.prototype.getForm = function () {
                        var result = ({});
//                        this.styleDebug("Looking to match shape = " + this.shapeName);
//                        if (this.shapeName != null && !(function (o1, o2) { if (o1 && o1.equals) {
//                            return o1.equals(o2);
//                        }
//                        else {
//                            return o1 === o2;
//                        } })(this.shapeName, "") && VsdxShape.USE_SHAPE_MATCH) {
//                            var trans = mxResources.get(this.shapeName);
//                            if (trans != null && !(function (o1, o2) { if (o1 && o1.equals) {
//                                return o1.equals(o2);
//                            }
//                            else {
//                                return o1 === o2;
//                            } })(trans, "")) {
//                                this.styleDebug("Translation = " + trans);
//                                /* put */ (result[mxConstants.STYLE_SHAPE] = trans);
//                                return result;
//                            }
//                        }
                        if (this.isVertex()) {
                            try {
                                var type = VsdxShape.getType(this.getShape());
                                this.styleDebug("shape type = " + type);
                                if (this.imageData != null || ((function (o1, o2) { if (o1 && o1.equals) {
                                    return o1.equals(o2);
                                }
                                else {
                                    return o1 === o2;
                                } })(com.mxgraph.io.vsdx.mxVsdxConstants.FOREIGN, type) && this.masterShape != null && this.masterShape.imageData != null)) {
                                    var imageData = this.imageData != null ? this.imageData : this.masterShape.imageData;
                                    /* put */ (result["shape"] = "image");
                                    /* put */ (result["aspect"] = "fixed");
                                    var iType = (function (m, k) { return m[k] ? m[k] : null; })(imageData, "iType");
                                    var iData = (function (m, k) { return m[k] ? m[k] : null; })(imageData, "iData");
                                    
                                    var imgOffsetX = parseFloat(this.getValue(this.getCellElement$java_lang_String('ImgOffsetX'), "0"));
                                    var imgOffsetY = parseFloat(this.getValue(this.getCellElement$java_lang_String('ImgOffsetY'), "0"));
                                    var imgWidth = parseFloat(this.getValue(this.getCellElement$java_lang_String('ImgWidth'), "0"));
                                    var imgHeight = parseFloat(this.getValue(this.getCellElement$java_lang_String('ImgHeight'), "0"));
                                    var width = parseFloat(this.getValue(this.getCellElement$java_lang_String('Width'), "0"));
                                    var height = parseFloat(this.getValue(this.getCellElement$java_lang_String('Height'), "0"));
                                    
                                    if (imgOffsetX != 0 || imgOffsetY != 0 ||
                                        imgWidth != width || imgHeight != height)
                                	{
                                    	this.toBeCroppedImg = {
                                			imgOffsetX: imgOffsetX, 
                                			imgOffsetY: imgOffsetY, 
                                			imgWidth: imgWidth, 
                                			imgHeight: imgHeight,
                                			width: width,
                                			height: height,
                                			iType: iType,
                            				iData: iData
                                    	};
                                	}
                                    else
                                    {
                                    	/* put */ (result["image"] = "data:image/" + iType + "," + iData);
                                    }
                                    
                                    return result;
                                }
                                var parsedGeom = this.parseGeom();
                                if ((function (o1, o2) { if (o1 && o1.equals) {
                                    return o1.equals(o2);
                                }
                                else {
                                    return o1 === o2;
                                } })(parsedGeom, "")) {
                                    this.styleDebug("No geom found");
                                    return result;
                                }
                                
                                var enc = Graph.compress(parsedGeom);
                                /* put */ (result[mxConstants.STYLE_SHAPE] = "stencil(" + enc + ")");
                            }
                            catch (e) {
                                //console.error(e.message, e);
                            }
                            ;
                        }
                        else {
                            return this.getEdgeStyle();
                        }
                        return result;
                    };
                    /**
                     * Checks if a shape may to be imported like an Off page reference.
                     * @return {boolean} Returns <code>true</code> if a shape may to be imported like an Off page reference.
                     */
                    VsdxShape.prototype.isOff_page_reference = function () {
                        var name = this.getNameU();
                        if ((function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(name, "Off-page reference") || (function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(name, "Lined/Shaded process")) {
                            return true;
                        }
                        return false;
                    };
                    /**
                     * Checks if a shape may to be imported like an External process.
                     * @return {boolean} Returns <code>true</code> if a shape may to be imported like an External process.
                     */
                    VsdxShape.prototype.isExternal_process = function () {
                        return ((function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(this.shapeName, "External process"));
                    };
                    /**
                     * Returns the direction of the shape.
                     * @param {*} form Form of the shape.
                     * @return {string} Direction(south, north, east and south)
                     */
                    VsdxShape.prototype.getDirection = function (form) {
                        var offsetS = mxResources.get("mxOffset" + this.shapeName);
                        if (offsetS == null || (function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(offsetS, "0") || (function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(offsetS, "")) {
                            return mxConstants.DIRECTION_EAST;
                        }
                        else if ((function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(offsetS, "1")) {
                            return mxConstants.DIRECTION_SOUTH;
                        }
                        else if ((function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(offsetS, "2")) {
                            return mxConstants.DIRECTION_WEST;
                        }
                        else if ((function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(offsetS, "3")) {
                            return mxConstants.DIRECTION_NORTH;
                        }
                        return mxConstants.DIRECTION_EAST;
                    };
                    /**
                     * Checks if a shape may to be imported like a Sub-process.
                     * This method is approximated.
                     * @return {boolean} Returns <code>true</code> if a shape may to be imported like a
                     * Sub-process.
                     */
                    VsdxShape.prototype.isSubproces = function () {
                        return (function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(this.shapeName, "Subproces");
                    };
                    VsdxShape.prototype.getEdgeStyle$ = function () {
                        var result = ({});
                        /* put */ (result["edgeStyle"] = "none");
                        return result;
                    };
                    VsdxShape.prototype.getChildShapes = function () {
                        return this.childShapes;
                    };
                    VsdxShape.prototype.setChildShapes = function (childShapes) {
                        this.childShapes = childShapes;
                    };
                    VsdxShape.prototype.isDisplacedLabel = function () {
                        var txtPinXF = this.getAttribute(com.mxgraph.io.vsdx.mxVsdxConstants.TXT_PIN_X, "F", "");
                        var txtPinYF = this.getAttribute(com.mxgraph.io.vsdx.mxVsdxConstants.TXT_PIN_Y, "F", "");
                        var txtWidthF = this.getAttribute(com.mxgraph.io.vsdx.mxVsdxConstants.TXT_WIDTH, "F", "");
                        var txtHeightF = this.getAttribute(com.mxgraph.io.vsdx.mxVsdxConstants.TXT_HEIGHT, "F", "");
                        if (this.masterShape != null) {
                            if (txtPinXF === "" || (function (o1, o2) { if (o1 && o1.equals) {
                                return o1.equals(o2);
                            }
                            else {
                                return o1 === o2;
                            } })(txtPinXF.toLowerCase(), "inh")) {
                                txtPinXF = this.masterShape.getAttribute(com.mxgraph.io.vsdx.mxVsdxConstants.TXT_PIN_X, "F", "");
                            }
                            if (txtPinYF === "" || (function (o1, o2) { if (o1 && o1.equals) {
                                return o1.equals(o2);
                            }
                            else {
                                return o1 === o2;
                            } })(txtPinYF.toLowerCase(), "inh")) {
                                txtPinYF = this.masterShape.getAttribute(com.mxgraph.io.vsdx.mxVsdxConstants.TXT_PIN_Y, "F", "");
                            }
                            if (txtWidthF === "" || (function (o1, o2) { if (o1 && o1.equals) {
                                return o1.equals(o2);
                            }
                            else {
                                return o1 === o2;
                            } })(txtWidthF.toLowerCase(), "inh")) {
                                txtWidthF = this.masterShape.getAttribute(com.mxgraph.io.vsdx.mxVsdxConstants.TXT_WIDTH, "F", "");
                            }
                            if (txtHeightF === "" || (function (o1, o2) { if (o1 && o1.equals) {
                                return o1.equals(o2);
                            }
                            else {
                                return o1 === o2;
                            } })(txtHeightF.toLowerCase(), "inh")) {
                                txtHeightF = this.masterShape.getAttribute(com.mxgraph.io.vsdx.mxVsdxConstants.TXT_HEIGHT, "F", "");
                            }
                        }
                        if ((function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(txtPinXF.toLowerCase(), "width*0.5") && (function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(txtPinYF.toLowerCase(), "height*0.5") && (function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(txtWidthF.toLowerCase(), "width*1") && (function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(txtHeightF.toLowerCase(), "height*1")) {
                            return false;
                        }
                        else if ((function (str, searchString, position) {
                            if (position === void 0) { position = 0; }
                            return str.substr(position, searchString.length) === searchString;
                        })(txtPinXF.toLowerCase(), "width*") && (function (str, searchString, position) {
                            if (position === void 0) { position = 0; }
                            return str.substr(position, searchString.length) === searchString;
                        })(txtPinYF.toLowerCase(), "height*") && (function (str, searchString, position) {
                            if (position === void 0) { position = 0; }
                            return str.substr(position, searchString.length) === searchString;
                        })(txtWidthF.toLowerCase(), "width*") && (function (str, searchString, position) {
                            if (position === void 0) { position = 0; }
                            return str.substr(position, searchString.length) === searchString;
                        })(txtHeightF.toLowerCase(), "height*")) {
                            return true;
                        }
                        else if ((function (str, searchString, position) {
                            if (position === void 0) { position = 0; }
                            return str.substr(position, searchString.length) === searchString;
                        })(txtPinXF.toLowerCase(), "controls.row_") || (function (str, searchString, position) {
                            if (position === void 0) { position = 0; }
                            return str.substr(position, searchString.length) === searchString;
                        })(txtPinYF.toLowerCase(), "controls.row_")) {
                            return true;
                        }
                        return false;
                    };
                    
                    VsdxShape.prototype.isVerticalLabel = function ()
                    {
                    	var txtDir = this.getAttribute('TextDirection', 'V', '');
                    	
                    	if (!txtDir && this.masterShape != null)
                		{
                    		txtDir = this.masterShape.getAttribute('TextDirection', 'V', '');
                		}
                    	
                    	return txtDir == '1';
                    };
                    
                    VsdxShape.prototype.isRotatedLabel = function () 
                    {
                    	if (this.isVerticalLabel()) 
                    	{
                    		return true;
                    	}
                    		
                        var txtAngleValue = this.getAttribute(com.mxgraph.io.vsdx.mxVsdxConstants.TXT_ANGLE, "V", "");
                        if (this.masterShape != null) {
                            if ((function (o1, o2) { if (o1 && o1.equals) {
                                return o1.equals(o2);
                            }
                            else {
                                return o1 === o2;
                            } })(txtAngleValue, "")) {
                                txtAngleValue = this.masterShape.getAttribute(com.mxgraph.io.vsdx.mxVsdxConstants.TXT_ANGLE, "V", "");
                            }
                        }
                        if (!(function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(txtAngleValue, "0") && !(function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(txtAngleValue, "0.0") && !(function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(txtAngleValue, "")) {
                            return true;
                        }
                        return false;
                    };
                    VsdxShape.prototype.setRootShape = function (shape) {
                        this.rootShape = shape;
                    };
                    VsdxShape.prototype.getRootShape = function () {
                        return this.rootShape;
                    };
                    /**
                     * Returns the coordinates of the begin point of an Edge Shape.
                     * @param {number} parentHeight Height of the parent of the shape.
                     * @return {mxPoint} mxPoint that represents the coordinates.
                     */
                    VsdxShape.prototype.getStartXY = function (parentHeight) {
                        var startX = Math.floor(Math.round(this.getScreenNumericalValue$org_w3c_dom_Element$double(this.getCellElement$java_lang_String(com.mxgraph.io.vsdx.mxVsdxConstants.BEGIN_X), 0) * 100) / 100);
                        var startY = Math.floor(Math.round((parentHeight - this.getScreenNumericalValue$org_w3c_dom_Element$double(this.getCellElement$java_lang_String(com.mxgraph.io.vsdx.mxVsdxConstants.BEGIN_Y), 0)) * 100) / 100);
                        return new mxPoint(startX, startY);
                    };
                    /**
                     * Returns the coordinates of the end point of an Edge Shape.
                     * @param {number} parentHeight Height of the parent of the shape.
                     * @return {mxPoint} mxPoint that represents the coordinates.
                     */
                    VsdxShape.prototype.getEndXY = function (parentHeight) {
                        var endX = Math.floor(Math.round(this.getScreenNumericalValue$org_w3c_dom_Element$double(this.getCellElement$java_lang_String(com.mxgraph.io.vsdx.mxVsdxConstants.END_X), 0) * 100) / 100);
                        var endY = Math.floor(Math.round((parentHeight - this.getScreenNumericalValue$org_w3c_dom_Element$double(this.getCellElement$java_lang_String(com.mxgraph.io.vsdx.mxVsdxConstants.END_Y), 0)) * 100) / 100);
                        return new mxPoint(endX, endY);
                    };
                    /**
                     * Returns the list of routing points of a edge shape.
                     * @param {number} parentHeight Height of the parent of the shape.
                     * @return {mxPoint[]} List of mxPoint that represents the routing points.
                     * @param {mxPoint} startPoint
                     * @param {number} rotation
                     */
                    VsdxShape.prototype.getRoutingPoints = function (parentHeight, startPoint, rotation) {
                        if (this.geomList != null) {
                            return this.geomList.getRoutingPoints(parentHeight, startPoint, rotation);
                        }
                        return null;
                    };
                    /**
                     * Returns the list of control points of a edge shape.
                     * @param {number} parentHeight Height of the parent of the shape.
                     * @return {mxPoint[]} List of mxPoint that represents the control points.
                     */
                    VsdxShape.prototype.getControlPoints = function (parentHeight) {
                        var startXY = this.getStartXY(parentHeight);
                        var endXY = this.getEndXY(parentHeight);
                        var pointList = ([]);
                        if (this.shape != null) {
                            var geomList = this.shape.getElementsByTagName(com.mxgraph.io.vsdx.mxVsdxConstants.GEOM);
                            if (geomList.length > 0) {
                                var firstGeom = geomList.item(0);
                                var firstNURBS = firstGeom.getElementsByTagName(com.mxgraph.io.vsdx.mxVsdxConstants.NURBS_TO).item(0);
                                var firstE = firstNURBS.getElementsByTagName("E").item(0);
                                if (firstE != null) {
                                    var f = firstE.getAttribute("F") || "";
                                    f = f.replace(new RegExp("NURBS\\(", 'g'), "");
                                    f = f.replace(new RegExp("\\)", 'g'), "");
                                    f = f.replace(new RegExp(",", 'g'), " ");
                                    f = f.replace(new RegExp("\\s\\s", 'g'), " ");
                                    var pointsS = f.split(" ");
                                    var pointsRaw = (function (s) { var a = []; while (s-- > 0)
                                        a.push(0); return a; })(pointsS.length);
                                    for (var i = 0; i < pointsS.length; i++) {
                                        pointsRaw[i] = parseFloat(pointsS[i]);
                                    }
                                    ;
                                    for (var i = 2; i + 4 < pointsS.length; i = i + 4) {
                                        var currPoint = new mxPoint();
                                        var rawX = pointsRaw[i + 2];
                                        var rawY = pointsRaw[i + 3];
                                        var width = Math.abs(endXY.x - startXY.x);
                                        var widthFixed = Math.min(100, width);
                                        var heightFixed = 100;
                                        var finalX = 0;
                                        finalX = startXY.x + widthFixed * rawX;
                                        currPoint.x = (Math.floor(Math.round(finalX * 100) / 100));
                                        currPoint.y = (Math.floor(Math.round((startXY.y - heightFixed * rawY) * 100) / 100));
                                        /* add */ (pointList.push(currPoint));
                                    }
                                    ;
                                    return pointList;
                                }
                                else {
                                    return null;
                                }
                            }
                        }
                        return null;
                    };
                    /**
                     * Analyzes a edge shape and returns a string with the style.
                     * @return {*} style read from the edge shape.
                     * @param {number} parentHeight
                     */
                    VsdxShape.prototype.getStyleFromEdgeShape = function (parentHeight) {
                        /* put */ (this.styleMap[com.mxgraph.io.vsdx.mxVsdxConstants.VSDX_ID] = this.getId().toString());
                        var edgeShape = this.getForm();
                        if (edgeShape != null && !(function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(edgeShape, "")) {
                        	//this.styleMap.putAll(edgeShape);
                            for (var key in edgeShape)
                        	{
                            	this.styleMap[key] = edgeShape[key];
                        	}
                        }
                        if (this.isDashed()) {
                            /* put */ (this.styleMap[mxConstants.STYLE_DASHED] = "1");
                            var dashPattern = this.getDashPattern();
                            if (dashPattern != null) {
                                /* put */ (this.styleMap[mxConstants.STYLE_DASH_PATTERN] = dashPattern);
                            }
                        }
                        var startArrow = this.getEdgeMarker(true);
                        if (startArrow != null) {
                            if ((function (str, searchString, position) {
                                if (position === void 0) { position = 0; }
                                return str.substr(position, searchString.length) === searchString;
                            })(startArrow, VsdxShape.ARROW_NO_FILL_MARKER)) {
                                startArrow = startArrow.substring(VsdxShape.ARROW_NO_FILL_MARKER.length);
                                /* put */ (this.styleMap[mxConstants.STYLE_STARTFILL] = "0");
                            }
                            /* put */ (this.styleMap[mxConstants.STYLE_STARTARROW] = startArrow);
                        }
                        var endArrow = this.getEdgeMarker(false);
                        if (endArrow != null) {
                            if ((function (str, searchString, position) {
                                if (position === void 0) { position = 0; }
                                return str.substr(position, searchString.length) === searchString;
                            })(endArrow, VsdxShape.ARROW_NO_FILL_MARKER)) {
                                endArrow = endArrow.substring(VsdxShape.ARROW_NO_FILL_MARKER.length);
                                /* put */ (this.styleMap[mxConstants.STYLE_ENDFILL] = "0");
                            }
                            /* put */ (this.styleMap[mxConstants.STYLE_ENDARROW] = endArrow);
                        }
                        var saSize = (Math.round(this.getStartArrowSize()) | 0);
                        if (saSize !== 6) {
                            /* put */ (this.styleMap[mxConstants.STYLE_STARTSIZE] = ('' + (saSize)));
                        }
                        var faSize = (Math.round(this.getFinalArrowSize()) | 0);
                        if (faSize !== 6) {
                            /* put */ (this.styleMap[mxConstants.STYLE_ENDSIZE] = ('' + (faSize)));
                        }
                        var lWeight = (Math.round(this.getLineWidth()) | 0);
                        if (lWeight !== 1.0) {
                            /* put */ (this.styleMap[mxConstants.STYLE_STROKEWIDTH] = ('' + (lWeight)));
                        }
                        var color = this.getStrokeColor();
                        if (!(function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(color, "")) {
                            /* put */ (this.styleMap[mxConstants.STYLE_STROKECOLOR] = color);
                        }
                        if (this.isShadow()) {
                            /* put */ (this.styleMap[mxConstants.STYLE_SHADOW] = com.mxgraph.io.vsdx.mxVsdxConstants.TRUE);
                        }
                        if (this.isConnectorBigNameU(this.getNameU())) {
                            /* put */ (this.styleMap[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_ARROW);
                            var fillcolor = this.getFillColor();
                            if (!(function (o1, o2) { if (o1 && o1.equals) {
                                return o1.equals(o2);
                            }
                            else {
                                return o1 === o2;
                            } })(fillcolor, "")) {
                                /* put */ (this.styleMap[mxConstants.STYLE_FILLCOLOR] = fillcolor);
                            }
                        }
                        var topMargin = (Math.round(this.getTopSpacing()) | 0);
                        /* put */ (this.styleMap[mxConstants.STYLE_SPACING_TOP] = ('' + (topMargin)));
                        var bottomMargin = (Math.round(this.getBottomSpacing()) | 0);
                        /* put */ (this.styleMap[mxConstants.STYLE_SPACING_BOTTOM] = ('' + (bottomMargin)));
                        var leftMargin = (Math.round(this.getLeftSpacing()) | 0);
                        /* put */ (this.styleMap[mxConstants.STYLE_SPACING_LEFT] = ('' + (leftMargin)));
                        var rightMargin = (Math.round(this.getRightSpacing()) | 0);
                        /* put */ (this.styleMap[mxConstants.STYLE_SPACING_RIGHT] = ('' + (rightMargin)));
                        var verticalAlign = this.getAlignVertical();
                        /* put */ (this.styleMap[mxConstants.STYLE_VERTICAL_ALIGN] = verticalAlign);
                        /* put */ (this.styleMap["html"] = "1");
                        this.resolveCommonStyles();
                        return this.styleMap;
                    };
                    /**
                     * Analyzes a edge shape and returns a string with the style.
                     * @return {*} style read from the edge shape.
                     */
                    VsdxShape.prototype.resolveCommonStyles = function () {
                        var lbkgnd = this.getTextBkgndColor(this.getCellElement$java_lang_String(com.mxgraph.io.vsdx.mxVsdxConstants.TEXT_BKGND));
                        if (!(function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(lbkgnd, "")) {
                        	var isFullyTransparent = this.getValue(this.getCellElement$java_lang_String('TextBkgndTrans'), '0') == '1';
                        	
                        	if (!isFullyTransparent)
                        	{
                        		/* put */ (this.styleMap[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = lbkgnd);
                        	}
                        }
                        /* put */ (this.styleMap[mxConstants.STYLE_ROUNDED] = this.getRounding() > 0 ? com.mxgraph.io.vsdx.mxVsdxConstants.TRUE : com.mxgraph.io.vsdx.mxVsdxConstants.FALSE);
                        return this.styleMap;
                    };
                    /**
                     * Returns the arrow of the line.
                     * @return {string} Type of arrow.
                     * @param {boolean} start
                     */
                    VsdxShape.prototype.getEdgeMarker = function (start) {
                        var marker = this.getValue(this.getCellElement$java_lang_String(start ? com.mxgraph.io.vsdx.mxVsdxConstants.BEGIN_ARROW : com.mxgraph.io.vsdx.mxVsdxConstants.END_ARROW), "0");
                        var val = 0;
                        try {
                            if ((function (o1, o2) { if (o1 && o1.equals) {
                                return o1.equals(o2);
                            }
                            else {
                                return o1 === o2;
                            } })(marker, "Themed")) {
                                var theme_17 = this.getTheme();
                                if (theme_17 != null) {
                                    val = this.isVertex() ? theme_17.getEdgeMarker(start, this.getQuickStyleVals()) : theme_17.getConnEdgeMarker(start, this.getQuickStyleVals());
                                }
                            }
                            else {
                                val = parseInt(marker);
                            }
                        }
                        catch (e) {
                        }
                        ;
                        var type = (function (m, k) { if (m.entries == null)
                            m.entries = []; for (var i = 0; i < m.entries.length; i++)
                            if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                return m.entries[i].value;
                            } return null; })(VsdxShape.arrowTypes_$LI$(), val);
                        if (val > 0 && type == null) {
                            type = (function (m, k) { if (m.entries == null)
                                m.entries = []; for (var i = 0; i < m.entries.length; i++)
                                if (m.entries[i].key.equals != null && m.entries[i].key.equals(k) || m.entries[i].key === k) {
                                    return m.entries[i].value;
                                } return null; })(VsdxShape.arrowTypes_$LI$(), 1);
                        }
                        return type;
                    };
                    VsdxShape.prototype.getCellElement$java_lang_String = function (key) {
                        var elem = _super.prototype.getCellElement$java_lang_String.call(this, key);
                        if (elem == null && this.masterShape != null) {
                            return this.masterShape.getCellElement$java_lang_String(key);
                        }
                        return elem;
                    };
                    VsdxShape.prototype.getCellElement$java_lang_String$java_lang_String$java_lang_String = function (cellKey, index, sectKey) {
                        var elem = _super.prototype.getCellElement$java_lang_String$java_lang_String$java_lang_String.call(this, cellKey, index, sectKey);
                        if (elem == null && this.masterShape != null) {
                            return this.masterShape.getCellElement$java_lang_String$java_lang_String$java_lang_String(cellKey, index, sectKey);
                        }
                        return elem;
                    };
                    VsdxShape.prototype.getCellElement = function (cellKey, index, sectKey) {
                        if (((typeof cellKey === 'string') || cellKey === null) && ((typeof index === 'string') || index === null) && ((typeof sectKey === 'string') || sectKey === null)) {
                            return this.getCellElement$java_lang_String$java_lang_String$java_lang_String(cellKey, index, sectKey);
                        }
                        else if (((typeof cellKey === 'string') || cellKey === null) && index === undefined && sectKey === undefined) {
                            return this.getCellElement$java_lang_String(cellKey);
                        }
                        else
                            throw new Error('invalid overload');
                    };
                    /**
                     * Creates a sub shape for <b>shape</b> that contains the label. Used internally, when the label is positioned by an anchor.
                     * @param graph
                     * @param shape the shape we want to create the label for
                     * @param {mxCell} parent
                     * @param parentHeight
                     * @return {mxCell} label sub-shape
                     */
                    VsdxShape.prototype.createLabelSubShape = function (graph, parent) {
                        var txtWV = this.getScreenNumericalValue$org_w3c_dom_Element$double(this.getShapeNode(com.mxgraph.io.vsdx.mxVsdxConstants.TXT_WIDTH), this.getWidth());
                        var txtHV = this.getScreenNumericalValue$org_w3c_dom_Element$double(this.getShapeNode(com.mxgraph.io.vsdx.mxVsdxConstants.TXT_HEIGHT), this.getHeight());
                        var txtLocPinXV = this.getScreenNumericalValue$org_w3c_dom_Element$double(this.getShapeNode(com.mxgraph.io.vsdx.mxVsdxConstants.TXT_LOC_PIN_X), txtWV / 2.0);
                        var txtLocPinYV = this.getScreenNumericalValue$org_w3c_dom_Element$double(this.getShapeNode(com.mxgraph.io.vsdx.mxVsdxConstants.TXT_LOC_PIN_Y), txtHV / 2.0);
                        var txtPinXV = this.getScreenNumericalValue$org_w3c_dom_Element$double(this.getShapeNode(com.mxgraph.io.vsdx.mxVsdxConstants.TXT_PIN_X), txtLocPinXV);
                        var txtPinYV = this.getScreenNumericalValue$org_w3c_dom_Element$double(this.getShapeNode(com.mxgraph.io.vsdx.mxVsdxConstants.TXT_PIN_Y), txtLocPinYV);
                        var txtAngleV = this.getValueAsDouble(this.getShapeNode(com.mxgraph.io.vsdx.mxVsdxConstants.TXT_ANGLE), 0);
                        var textLabel = this.getTextLabel(txtWV < 1 || txtHV < 1);
                        if (textLabel != null && !(textLabel.length === 0)) {
                        	var styleMap = mxUtils.clone(this.getStyleMap()) || {};
                            /* put */ (styleMap[mxConstants.STYLE_FILLCOLOR] = mxConstants.NONE);
                            /* put */ (styleMap[mxConstants.STYLE_STROKECOLOR] = mxConstants.NONE);
                            /* put */ (styleMap[mxConstants.STYLE_GRADIENTCOLOR] = mxConstants.NONE);
                            if (!styleMap.hasOwnProperty("align"))
                                (styleMap["align"] = "center");
                            if (!styleMap.hasOwnProperty("verticalAlign"))
                                (styleMap["verticalAlign"] = "middle");
                            if (!styleMap.hasOwnProperty("whiteSpace"))
                                (styleMap["whiteSpace"] = "wrap");
                            /* remove */ delete styleMap["shape"];
                            /* remove */ delete styleMap["image"];
                            
                            if (this.isVerticalLabel())
                        	{
                            	txtAngleV += Math.PI + 0.01; //TODO Added 0.01 since we don't override the parent rotation if labRot is zero. Why?
                            	styleMap['horizontal'] = '0';
                        	}
                            
                            var rotation = this.getRotation();
                            if (txtAngleV !== 0) {
                                var labRot = 360 - (function (x) { return x * 180 / Math.PI; })(txtAngleV);
                                labRot = Math.round(((labRot + rotation) % 360.0) * 100.0) / 100.0;
                                if (labRot !== 0.0) {
                                    /* put */ (styleMap["rotation"] = ('' + (labRot)));
                                }
                            }
                            var style = "text;" + com.mxgraph.io.vsdx.mxVsdxUtils.getStyleString(styleMap, "=");
                            var y = parent.getGeometry().height - (txtPinYV + txtHV - txtLocPinYV);
                            var x = txtPinXV - txtLocPinXV;
                            if (rotation > 0) {
                                var tmpGeo = new mxGeometry(x, y, txtWV, txtHV);
                                var pgeo = parent.getGeometry();
                                var hw = pgeo.width / 2;
                                var hh = pgeo.height / 2;
                                com.mxgraph.online.Utils.rotatedGeometry(tmpGeo, rotation, hw, hh);
                                x = tmpGeo.x;
                                y = tmpGeo.y;
                            }
                            var v1 = graph.insertVertex(parent, null, textLabel,
                    				Math.round(x * 100) / 100, Math.round(y * 100) / 100,
                    				Math.round(txtWV * 100) / 100, Math.round(txtHV * 100) / 100,
                    				style + ";html=1;");
                            return v1;
                        }
                        return null;
                    };
                    VsdxShape.prototype.getLblEdgeOffset = function (view, points) {
                        if (points != null && points.length > 1) {
                			//find mxGraph label offset
                			var state = new mxCellState();
                			state.absolutePoints = (points);
                			view.updateEdgeBounds(state);
                			var mxOffset = view.getPoint(state);
                            var p0 = points[0];
                            var pe = points[points.length - 1];
                            var txtWV = this.getScreenNumericalValue$org_w3c_dom_Element$double(this.getShapeNode(com.mxgraph.io.vsdx.mxVsdxConstants.TXT_WIDTH), this.getWidth());
                            var txtHV = this.getScreenNumericalValue$org_w3c_dom_Element$double(this.getShapeNode(com.mxgraph.io.vsdx.mxVsdxConstants.TXT_HEIGHT), this.getHeight());
                            var txtLocPinXV = this.getScreenNumericalValue$org_w3c_dom_Element$double(this.getShapeNode(com.mxgraph.io.vsdx.mxVsdxConstants.TXT_LOC_PIN_X), 0);
                            var txtLocPinYV = this.getScreenNumericalValue$org_w3c_dom_Element$double(this.getShapeNode(com.mxgraph.io.vsdx.mxVsdxConstants.TXT_LOC_PIN_Y), 0);
                            var txtPinXV = this.getScreenNumericalValue$org_w3c_dom_Element$double(this.getShapeNode(com.mxgraph.io.vsdx.mxVsdxConstants.TXT_PIN_X), 0);
                            var txtPinYV = this.getScreenNumericalValue$org_w3c_dom_Element$double(this.getShapeNode(com.mxgraph.io.vsdx.mxVsdxConstants.TXT_PIN_Y), 0);
                            var y = (this.getHeight() - (p0.y - pe.y)) / 2 + p0.y - mxOffset.y - (txtPinYV - txtLocPinYV + txtHV / 2);
                            var x = txtPinXV - txtLocPinXV + txtWV / 2 + (p0.x - mxOffset.x);
                			//FIXME one file has txtPinX/Y values extremely high which cause draw.io to hang
                			//			<Cell N='TxtPinX' V='-1.651384506429589E199' F='SETATREF(Controls.TextPosition)'/>
                			//			<Cell N='TxtPinY' V='1.183491078740126E185' F='SETATREF(Controls.TextPosition.Y)'/>
                            if (Math.abs(x) > 1.0E11)
                                return null;
                            return new mxPoint(Math.floor(Math.round(x * 100) / 100), Math.floor(Math.round(y * 100) / 100));
                        }
                        else {
                            return null;
                        }
                    };
                    VsdxShape.prototype.getShapeIndex = function () {
                        return this.shapeIndex;
                    };
                    VsdxShape.prototype.setShapeIndex = function (shapeIndex) {
                        this.shapeIndex = shapeIndex;
                    };
                    return VsdxShape;
                }(com.mxgraph.io.vsdx.Shape));
                VsdxShape.__static_initialized = false;
                VsdxShape.ARROW_NO_FILL_MARKER = "0";
                /**
                 * Number of d.p. to round non-integers to
                 */
                VsdxShape.maxDp = 2;
                //TODO FIXME In online, matching fails which gives better results! 
                VsdxShape.USE_SHAPE_MATCH = false;
                VsdxShape.stencilTemplate = "<shape h=\"htemplate\" w=\"wtemplate\" aspect=\"variable\" strokewidth=\"inherit\"><connections></connections><background></background><foreground></foreground></shape>";
                vsdx.VsdxShape = VsdxShape;
                VsdxShape["__class"] = "com.mxgraph.io.vsdx.VsdxShape";
            })(vsdx = io.vsdx || (io.vsdx = {}));
        })(io = mxgraph.io || (mxgraph.io = {}));
    })(mxgraph = com.mxgraph || (com.mxgraph = {}));
})(com || (com = {}));
var com;
(function (com) {
    var mxgraph;
    (function (mxgraph) {
        var online;
        (function (online) {
            /**
             * A very fast and memory efficient class to encode and decode to and from BASE64 in full accordance
             * with RFC 2045.<br><br>
             * On Windows XP sp1 with 1.4.2_04 and later ;), this encoder and decoder is about 10 times faster
             * on small arrays (10 - 1000 bytes) and 2-3 times as fast on larger arrays (10000 - 1000000 bytes)
             * compared to <code>sun.misc.Encoder()/Decoder()</code>.<br><br>
             *
             * On byte arrays the encoder is about 20% faster than Jakarta Commons Base64 Codec for encode and
             * about 50% faster for decoding large arrays. This implementation is about twice as fast on very small
             * arrays (&lt 30 bytes). If source/destination is a <code>String</code> this
             * version is about three times as fast due to the fact that the Commons Codec result has to be recoded
             * to a <code>String</code> from <code>byte[]</code>, which is very expensive.<br><br>
             *
             * This encode/decode algorithm doesn't create any temporary arrays as many other codecs do, it only
             * allocates the resulting array. This produces less garbage and it is possible to handle arrays twice
             * as large as algorithms that create a temporary array. (E.g. Jakarta Commons Codec). It is unknown
             * whether Sun's <code>sun.misc.Encoder()/Decoder()</code> produce temporary arrays but since performance
             * is quite low it probably does.<br><br>
             *
             * The encoder produces the same output as the Sun one except that the Sun's encoder appends
             * a trailing line separator if the last character isn't a pad. Unclear why but it only adds to the
             * length and is probably a side effect. Both are in conformance with RFC 2045 though.<br>
             * Commons codec seem to always att a trailing line separator.<br><br>
             *
             * <b>Note!</b>
             * The encode/decode method pairs (types) come in three versions with the <b>exact</b> same algorithm and
             * thus a lot of code redundancy. This is to not create any temporary arrays for transcoding to/from different
             * format types. The methods not used can simply be commented out.<br><br>
             *
             * There is also a "fast" version of all decode methods that works the same way as the normal ones, but
             * har a few demands on the decoded input. Normally though, these fast verions should be used if the source if
             * the input is known and it hasn't bee tampered with.<br><br>
             *
             * If you find the code useful or you find a bug, please send me a note at base64 @ miginfocom . com.
             *
             * Licence (BSD):
             * ==============
             *
             * Copyright (c) 2004, Mikael Grev, MiG InfoCom AB. (base64 @ miginfocom . com)
             * All rights reserved.
             *
             * Redistribution and use in source and binary forms, with or without modification,
             * are permitted provided that the following conditions are met:
             * Redistributions of source code must retain the above copyright notice, this list
             * of conditions and the following disclaimer.
             * Redistributions in binary form must reproduce the above copyright notice, this
             * list of conditions and the following disclaimer in the documentation and/or other
             * materials provided with the distribution.
             * Neither the name of the MiG InfoCom AB nor the names of its contributors may be
             * used to endorse or promote products derived from this software without specific
             * prior written permission.
             *
             * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
             * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
             * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
             * IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
             * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
             * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
             * OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
             * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
             * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY
             * OF SUCH DAMAGE.
             *
             * @version 2.2
             * @author Mikael Grev
             * Date: 2004-aug-02
             * Time: 11:31:11
             * @class
             */
            var mxBase64 = (function () {
                function mxBase64() {
                }
                mxBase64.__static_initialize = function () { if (!mxBase64.__static_initialized) {
                    mxBase64.__static_initialized = true;
                    mxBase64.__static_initializer_0();
                } };
                mxBase64.CA_$LI$ = function () { mxBase64.__static_initialize(); if (mxBase64.CA == null)
                    mxBase64.CA = ("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/").split(''); return mxBase64.CA; };
                ;
                mxBase64.IA_$LI$ = function () { mxBase64.__static_initialize(); if (mxBase64.IA == null)
                    mxBase64.IA = (function (s) { var a = []; while (s-- > 0)
                        a.push(0); return a; })(256); return mxBase64.IA; };
                ;
                mxBase64.__static_initializer_0 = function () {
                    /* fill */ (function (a, v) { for (var i = 0; i < a.length; i++)
                        a[i] = v; })(mxBase64.IA_$LI$(), -1);
                    for (var i = 0, iS = mxBase64.CA_$LI$().length; i < iS; i++)
                        mxBase64.IA_$LI$()[(mxBase64.CA_$LI$()[i]).charCodeAt(0)] = i;
                    mxBase64.IA_$LI$()[('=').charCodeAt(0)] = 0;
                };
                /**
                 * Encodes a raw byte array into a BASE64 <code>char[]</code> representation i accordance with RFC 2045.
                 * @param {Array} sArr The bytes to convert. If <code>null</code> or length 0 an empty array will be returned.
                 * @param {boolean} lineSep Optional "\r\n" after 76 characters, unless end of file.<br>
                 * No line separator will be in breach of RFC 2045 which specifies max 76 per line but will be a
                 * little faster.
                 * @return {Array} A BASE64 encoded array. Never <code>null</code>.
                 */
                mxBase64.encodeToChar = function (sArr, start, lineSep) {
                    var sLen = sArr != null ? sArr.length - start : 0;
                    if (sLen === 0)
                        return new Array(0);
                    var eLen = ((sLen / 3 | 0)) * 3;
                    var cCnt = (((sLen - 1) / 3 | 0) + 1) << 2;
                    var dLen = cCnt + (lineSep ? ((cCnt - 1) / 76 | 0) << 1 : 0);
                    var dArr = new Array(dLen);
                    for (var s = start, d = 0, cc = 0; s < eLen + start;) {
                        var i = (sArr[s++] & 255) << 16 | (sArr[s++] & 255) << 8 | (sArr[s++] & 255);
                        dArr[d++] = mxBase64.CA_$LI$()[(i >>> 18) & 63];
                        dArr[d++] = mxBase64.CA_$LI$()[(i >>> 12) & 63];
                        dArr[d++] = mxBase64.CA_$LI$()[(i >>> 6) & 63];
                        dArr[d++] = mxBase64.CA_$LI$()[i & 63];
                        if (lineSep && ++cc === 19 && d < dLen - 2) {
                            dArr[d++] = '\r';
                            dArr[d++] = '\n';
                            cc = 0;
                        }
                    }
                    ;
                    var left = sLen - eLen;
                    if (left > 0) {
                        var i = ((sArr[eLen + start] & 255) << 10) | (left === 2 ? ((sArr[sLen + start - 1] & 255) << 2) : 0);
                        dArr[dLen - 4] = mxBase64.CA_$LI$()[i >> 12];
                        dArr[dLen - 3] = mxBase64.CA_$LI$()[(i >>> 6) & 63];
                        dArr[dLen - 2] = left === 2 ? mxBase64.CA_$LI$()[i & 63] : '=';
                        dArr[dLen - 1] = '=';
                    }
                    return dArr;
                };
                mxBase64.decode$char_A = function (sArr) {
                    var sLen = sArr != null ? sArr.length : 0;
                    if (sLen === 0)
                        return [];
                    var sepCnt = 0;
                    for (var i = 0; i < sLen; i++)
                        if (mxBase64.IA_$LI$()[(sArr[i]).charCodeAt(0)] < 0)
                            sepCnt++;
                    ;
                    if ((sLen - sepCnt) % 4 !== 0)
                        return null;
                    var pad = 0;
                    for (var i = sLen; i > 1 && mxBase64.IA_$LI$()[(sArr[--i]).charCodeAt(0)] <= 0;)
                        if ((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(sArr[i]) == '='.charCodeAt(0))
                            pad++;
                    ;
                    var len = ((sLen - sepCnt) * 6 >> 3) - pad;
                    var dArr = (function (s) { var a = []; while (s-- > 0)
                        a.push(0); return a; })(len);
                    for (var s = 0, d = 0; d < len;) {
                        var i = 0;
                        for (var j = 0; j < 4; j++) {
                            var c = mxBase64.IA_$LI$()[(sArr[s++]).charCodeAt(0)];
                            if (c >= 0)
                                i |= c << (18 - j * 6);
                            else
                                j--;
                        }
                        ;
                        dArr[d++] = ((i >> 16) | 0);
                        if (d < len) {
                            dArr[d++] = ((i >> 8) | 0);
                            if (d < len)
                                dArr[d++] = (i | 0);
                        }
                    }
                    ;
                    return dArr;
                };
                /**
                 * Decodes a BASE64 encoded char array. All illegal characters will be ignored and can handle both arrays with
                 * and without line separators.
                 * @param {Array} sArr The source array. <code>null</code> or length 0 will return an empty array.
                 * @return {Array} The decoded array of bytes. May be of length 0. Will be <code>null</code> if the legal characters
                 * (including '=') isn't divideable by 4.  (I.e. definitely corrupted).
                 */
                mxBase64.decode = function (sArr) {
                    if (((sArr != null && sArr instanceof Array && (sArr.length == 0 || sArr[0] == null || (typeof sArr[0] === 'string'))) || sArr === null)) {
                        return com.mxgraph.online.mxBase64.decode$char_A(sArr);
                    }
                    else if (((sArr != null && sArr instanceof Array && (sArr.length == 0 || sArr[0] == null || (typeof sArr[0] === 'number'))) || sArr === null)) {
                        return com.mxgraph.online.mxBase64.decode$byte_A(sArr);
                    }
                    else if (((typeof sArr === 'string') || sArr === null)) {
                        return com.mxgraph.online.mxBase64.decode$java_lang_String(sArr);
                    }
                    else
                        throw new Error('invalid overload');
                };
                mxBase64.decodeFast$char_A = function (sArr) {
                    var sLen = sArr.length;
                    if (sLen === 0)
                        return [];
                    var sIx = 0;
                    var eIx = sLen - 1;
                    while ((sIx < eIx && mxBase64.IA_$LI$()[(sArr[sIx]).charCodeAt(0)] < 0))
                        sIx++;
                    while ((eIx > 0 && mxBase64.IA_$LI$()[(sArr[eIx]).charCodeAt(0)] < 0))
                        eIx--;
                    var pad = (function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(sArr[eIx]) == '='.charCodeAt(0) ? ((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(sArr[eIx - 1]) == '='.charCodeAt(0) ? 2 : 1) : 0;
                    var cCnt = eIx - sIx + 1;
                    var sepCnt = sLen > 76 ? ((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(sArr[76]) == '\r'.charCodeAt(0) ? (cCnt / 78 | 0) : 0) << 1 : 0;
                    var len = ((cCnt - sepCnt) * 6 >> 3) - pad;
                    var dArr = (function (s) { var a = []; while (s-- > 0)
                        a.push(0); return a; })(len);
                    var d = 0;
                    for (var cc = 0, eLen = ((len / 3 | 0)) * 3; d < eLen;) {
                        var i = mxBase64.IA_$LI$()[(sArr[sIx++]).charCodeAt(0)] << 18 | mxBase64.IA_$LI$()[(sArr[sIx++]).charCodeAt(0)] << 12 | mxBase64.IA_$LI$()[(sArr[sIx++]).charCodeAt(0)] << 6 | mxBase64.IA_$LI$()[(sArr[sIx++]).charCodeAt(0)];
                        dArr[d++] = ((i >> 16) | 0);
                        dArr[d++] = ((i >> 8) | 0);
                        dArr[d++] = (i | 0);
                        if (sepCnt > 0 && ++cc === 19) {
                            sIx += 2;
                            cc = 0;
                        }
                    }
                    ;
                    if (d < len) {
                        var i = 0;
                        for (var j = 0; sIx <= eIx - pad; j++)
                            i |= mxBase64.IA_$LI$()[(sArr[sIx++]).charCodeAt(0)] << (18 - j * 6);
                        for (var r = 16; d < len; r -= 8)
                            dArr[d++] = ((i >> r) | 0);
                    }
                    return dArr;
                };
                /**
                 * Decodes a BASE64 encoded char array that is known to be resonably well formatted. The method is about twice as
                 * fast as {@link #decode(char[])}. The preconditions are:<br>
                 * + The array must have a line length of 76 chars OR no line separators at all (one line).<br>
                 * + Line separator must be "\r\n", as specified in RFC 2045
                 * + The array must not contain illegal characters within the encoded string<br>
                 * + The array CAN have illegal characters at the beginning and end, those will be dealt with appropriately.<br>
                 * @param {Array} sArr The source array. Length 0 will return an empty array. <code>null</code> will throw an exception.
                 * @return {Array} The decoded array of bytes. May be of length 0.
                 */
                mxBase64.decodeFast = function (sArr) {
                    if (((sArr != null && sArr instanceof Array && (sArr.length == 0 || sArr[0] == null || (typeof sArr[0] === 'string'))) || sArr === null)) {
                        return com.mxgraph.online.mxBase64.decodeFast$char_A(sArr);
                    }
                    else if (((sArr != null && sArr instanceof Array && (sArr.length == 0 || sArr[0] == null || (typeof sArr[0] === 'number'))) || sArr === null)) {
                        return com.mxgraph.online.mxBase64.decodeFast$byte_A(sArr);
                    }
                    else if (((typeof sArr === 'string') || sArr === null)) {
                        return com.mxgraph.online.mxBase64.decodeFast$java_lang_String(sArr);
                    }
                    else
                        throw new Error('invalid overload');
                };
                /**
                 * Encodes a raw byte array into a BASE64 <code>byte[]</code> representation i accordance with RFC 2045.
                 * @param {Array} sArr The bytes to convert. If <code>null</code> or length 0 an empty array will be returned.
                 * @param {boolean} lineSep Optional "\r\n" after 76 characters, unless end of file.<br>
                 * No line separator will be in breach of RFC 2045 which specifies max 76 per line but will be a
                 * little faster.
                 * @return {Array} A BASE64 encoded array. Never <code>null</code>.
                 */
                mxBase64.encodeToByte = function (sArr, lineSep) {
                    var sLen = sArr != null ? sArr.length : 0;
                    if (sLen === 0)
                        return [];
                    var eLen = ((sLen / 3 | 0)) * 3;
                    var cCnt = (((sLen - 1) / 3 | 0) + 1) << 2;
                    var dLen = cCnt + (lineSep ? ((cCnt - 1) / 76 | 0) << 1 : 0);
                    var dArr = (function (s) { var a = []; while (s-- > 0)
                        a.push(0); return a; })(dLen);
                    for (var s = 0, d = 0, cc = 0; s < eLen;) {
                        var i = (sArr[s++] & 255) << 16 | (sArr[s++] & 255) << 8 | (sArr[s++] & 255);
                        dArr[d++] = (mxBase64.CA_$LI$()[(i >>> 18) & 63]).charCodeAt(0);
                        dArr[d++] = (mxBase64.CA_$LI$()[(i >>> 12) & 63]).charCodeAt(0);
                        dArr[d++] = (mxBase64.CA_$LI$()[(i >>> 6) & 63]).charCodeAt(0);
                        dArr[d++] = (mxBase64.CA_$LI$()[i & 63]).charCodeAt(0);
                        if (lineSep && ++cc === 19 && d < dLen - 2) {
                            dArr[d++] = ('\r').charCodeAt(0);
                            dArr[d++] = ('\n').charCodeAt(0);
                            cc = 0;
                        }
                    }
                    ;
                    var left = sLen - eLen;
                    if (left > 0) {
                        var i = ((sArr[eLen] & 255) << 10) | (left === 2 ? ((sArr[sLen - 1] & 255) << 2) : 0);
                        dArr[dLen - 4] = (mxBase64.CA_$LI$()[i >> 12]).charCodeAt(0);
                        dArr[dLen - 3] = (mxBase64.CA_$LI$()[(i >>> 6) & 63]).charCodeAt(0);
                        dArr[dLen - 2] = left === 2 ? (mxBase64.CA_$LI$()[i & 63]).charCodeAt(0) : ('=').charCodeAt(0);
                        dArr[dLen - 1] = ('=').charCodeAt(0);
                    }
                    return dArr;
                };
                mxBase64.decode$byte_A = function (sArr) {
                    var sLen = sArr.length;
                    var sepCnt = 0;
                    for (var i = 0; i < sLen; i++)
                        if (mxBase64.IA_$LI$()[sArr[i] & 255] < 0)
                            sepCnt++;
                    ;
                    if ((sLen - sepCnt) % 4 !== 0)
                        return null;
                    var pad = 0;
                    for (var i = sLen; i > 1 && mxBase64.IA_$LI$()[sArr[--i] & 255] <= 0;)
                        if (sArr[i] == '='.charCodeAt(0))
                            pad++;
                    ;
                    var len = ((sLen - sepCnt) * 6 >> 3) - pad;
                    var dArr = (function (s) { var a = []; while (s-- > 0)
                        a.push(0); return a; })(len);
                    for (var s = 0, d = 0; d < len;) {
                        var i = 0;
                        for (var j = 0; j < 4; j++) {
                            var c = mxBase64.IA_$LI$()[sArr[s++] & 255];
                            if (c >= 0)
                                i |= c << (18 - j * 6);
                            else
                                j--;
                        }
                        ;
                        dArr[d++] = ((i >> 16) | 0);
                        if (d < len) {
                            dArr[d++] = ((i >> 8) | 0);
                            if (d < len)
                                dArr[d++] = (i | 0);
                        }
                    }
                    ;
                    return dArr;
                };
                mxBase64.decodeFast$byte_A = function (sArr) {
                    var sLen = sArr.length;
                    if (sLen === 0)
                        return [];
                    var sIx = 0;
                    var eIx = sLen - 1;
                    while ((sIx < eIx && mxBase64.IA_$LI$()[sArr[sIx] & 255] < 0))
                        sIx++;
                    while ((eIx > 0 && mxBase64.IA_$LI$()[sArr[eIx] & 255] < 0))
                        eIx--;
                    var pad = sArr[eIx] == '='.charCodeAt(0) ? (sArr[eIx - 1] == '='.charCodeAt(0) ? 2 : 1) : 0;
                    var cCnt = eIx - sIx + 1;
                    var sepCnt = sLen > 76 ? (sArr[76] == '\r'.charCodeAt(0) ? (cCnt / 78 | 0) : 0) << 1 : 0;
                    var len = ((cCnt - sepCnt) * 6 >> 3) - pad;
                    var dArr = (function (s) { var a = []; while (s-- > 0)
                        a.push(0); return a; })(len);
                    var d = 0;
                    for (var cc = 0, eLen = ((len / 3 | 0)) * 3; d < eLen;) {
                        var i = mxBase64.IA_$LI$()[sArr[sIx++]] << 18 | mxBase64.IA_$LI$()[sArr[sIx++]] << 12 | mxBase64.IA_$LI$()[sArr[sIx++]] << 6 | mxBase64.IA_$LI$()[sArr[sIx++]];
                        dArr[d++] = ((i >> 16) | 0);
                        dArr[d++] = ((i >> 8) | 0);
                        dArr[d++] = (i | 0);
                        if (sepCnt > 0 && ++cc === 19) {
                            sIx += 2;
                            cc = 0;
                        }
                    }
                    ;
                    if (d < len) {
                        var i = 0;
                        for (var j = 0; sIx <= eIx - pad; j++)
                            i |= mxBase64.IA_$LI$()[sArr[sIx++]] << (18 - j * 6);
                        for (var r = 16; d < len; r -= 8)
                            dArr[d++] = ((i >> r) | 0);
                    }
                    return dArr;
                };
                /**
                 * Encodes a raw byte array into a BASE64 <code>String</code> representation i accordance with RFC 2045.
                 * @param {Array} sArr The bytes to convert. If <code>null</code> or length 0 an empty array will be returned.
                 * @param {boolean} lineSep Optional "\r\n" after 76 characters, unless end of file.<br>
                 * No line separator will be in breach of RFC 2045 which specifies max 76 per line but will be a
                 * little faster.
                 * @return {string} A BASE64 encoded array. Never <code>null</code>.
                 */
                mxBase64.encodeToString = function (sArr, start, lineSep) {
                    return mxBase64.encodeToChar(sArr, start, lineSep).join('');
                };
                mxBase64.decode$java_lang_String = function (str) {
                    var sLen = str != null ? str.length : 0;
                    if (sLen === 0)
                        return [];
                    var sepCnt = 0;
                    for (var i = 0; i < sLen; i++)
                        if (mxBase64.IA_$LI$()[(str.charAt(i)).charCodeAt(0)] < 0)
                            sepCnt++;
                    ;
                    if ((sLen - sepCnt) % 4 !== 0)
                        return null;
                    var pad = 0;
                    for (var i = sLen; i > 1 && mxBase64.IA_$LI$()[(str.charAt(--i)).charCodeAt(0)] <= 0;)
                        if ((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(str.charAt(i)) == '='.charCodeAt(0))
                            pad++;
                    ;
                    var len = ((sLen - sepCnt) * 6 >> 3) - pad;
                    var dArr = (function (s) { var a = []; while (s-- > 0)
                        a.push(0); return a; })(len);
                    for (var s = 0, d = 0; d < len;) {
                        var i = 0;
                        for (var j = 0; j < 4; j++) {
                            var c = mxBase64.IA_$LI$()[(str.charAt(s++)).charCodeAt(0)];
                            if (c >= 0)
                                i |= c << (18 - j * 6);
                            else
                                j--;
                        }
                        ;
                        dArr[d++] = ((i >> 16) | 0);
                        if (d < len) {
                            dArr[d++] = ((i >> 8) | 0);
                            if (d < len)
                                dArr[d++] = (i | 0);
                        }
                    }
                    ;
                    return dArr;
                };
                mxBase64.decodeFast$java_lang_String = function (s) {
                    var sLen = s.length;
                    if (sLen === 0)
                        return [];
                    var sIx = 0;
                    var eIx = sLen - 1;
                    while ((sIx < eIx && mxBase64.IA_$LI$()[(function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(s.charAt(sIx)) & 255] < 0))
                        sIx++;
                    while ((eIx > 0 && mxBase64.IA_$LI$()[(function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(s.charAt(eIx)) & 255] < 0))
                        eIx--;
                    var pad = (function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(s.charAt(eIx)) == '='.charCodeAt(0) ? ((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(s.charAt(eIx - 1)) == '='.charCodeAt(0) ? 2 : 1) : 0;
                    var cCnt = eIx - sIx + 1;
                    var sepCnt = sLen > 76 ? ((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(s.charAt(76)) == '\r'.charCodeAt(0) ? (cCnt / 78 | 0) : 0) << 1 : 0;
                    var len = ((cCnt - sepCnt) * 6 >> 3) - pad;
                    var dArr = (function (s) { var a = []; while (s-- > 0)
                        a.push(0); return a; })(len);
                    var d = 0;
                    for (var cc = 0, eLen = ((len / 3 | 0)) * 3; d < eLen;) {
                        var i = mxBase64.IA_$LI$()[(s.charAt(sIx++)).charCodeAt(0)] << 18 | mxBase64.IA_$LI$()[(s.charAt(sIx++)).charCodeAt(0)] << 12 | mxBase64.IA_$LI$()[(s.charAt(sIx++)).charCodeAt(0)] << 6 | mxBase64.IA_$LI$()[(s.charAt(sIx++)).charCodeAt(0)];
                        dArr[d++] = ((i >> 16) | 0);
                        dArr[d++] = ((i >> 8) | 0);
                        dArr[d++] = (i | 0);
                        if (sepCnt > 0 && ++cc === 19) {
                            sIx += 2;
                            cc = 0;
                        }
                    }
                    ;
                    if (d < len) {
                        var i = 0;
                        for (var j = 0; sIx <= eIx - pad; j++)
                            i |= mxBase64.IA_$LI$()[(s.charAt(sIx++)).charCodeAt(0)] << (18 - j * 6);
                        for (var r = 16; d < len; r -= 8)
                            dArr[d++] = ((i >> r) | 0);
                    }
                    return dArr;
                };
                return mxBase64;
            }());
            mxBase64.__static_initialized = false;
            online.mxBase64 = mxBase64;
            mxBase64["__class"] = "com.mxgraph.online.mxBase64";
        })(online = mxgraph.online || (mxgraph.online = {}));
    })(mxgraph = com.mxgraph || (com.mxgraph = {}));
})(com || (com = {}));
com.mxgraph.online.mxBase64.IA_$LI$();
com.mxgraph.online.mxBase64.CA_$LI$();
com.mxgraph.online.mxBase64.__static_initialize();
com.mxgraph.io.vsdx.VsdxShape.__com_mxgraph_io_vsdx_VsdxShape_LOGGER_$LI$();
com.mxgraph.io.vsdx.VsdxShape.arrowTypes_$LI$();
com.mxgraph.io.vsdx.VsdxShape.arrowSizes_$LI$();
com.mxgraph.io.vsdx.VsdxShape.OFFSET_ARRAY_$LI$();
com.mxgraph.io.vsdx.VsdxShape.__static_initialize();
com.mxgraph.io.vsdx.Shape.UNICODE_LINE_SEP_$LI$();
com.mxgraph.io.vsdx.Style.lineDashPatterns_$LI$();
com.mxgraph.io.vsdx.Style.styleTypes_$LI$();
com.mxgraph.io.vsdx.Style.__static_initialize();
com.mxgraph.online.Constants.MAX_AREA_$LI$();
com.mxgraph.io.vsdx.theme.Color.NONE_$LI$();
com.mxgraph.io.vsdx.mxVsdxUtils.conversionFactor_$LI$();
com.mxgraph.io.vsdx.mxVsdxTheme.colorIds_$LI$();
com.mxgraph.io.vsdx.mxVsdxTheme.themesIds_$LI$();
com.mxgraph.io.vsdx.mxVsdxTheme.__static_initialize();
com.mxgraph.io.vsdx.mxVsdxConstants.MY_SET_$LI$();
com.mxgraph.io.vsdx.mxVsdxConstants.SET_VALUES_$LI$();
com.mxgraph.io.vsdx.mxPropertiesManager.defaultColors_$LI$();
com.mxgraph.io.vsdx.mxPropertiesManager.__static_initialize();
com.mxgraph.io.mxVsdxCodec.vsdxPlaceholder_$LI$();
com.mxgraph.io.mxVsdxCodec.parsererrorNS_$LI$();

EditorUi.prototype.doImportVisio = function(file, done, onerror, filename)
{
	filename = filename || file.name;
	
	if (filename != null && /(\.vs(x|sx?))($|\?)/i.test(filename))
	{
		new com.mxgraph.io.mxVssxCodec(this).decodeVssx(file, done, null, onerror);
	}
	else
	{
		new com.mxgraph.io.mxVsdxCodec(this).decodeVsdx(file, done, null, onerror);
	}
};
