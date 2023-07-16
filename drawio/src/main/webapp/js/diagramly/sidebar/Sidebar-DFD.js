(function()
{
	Sidebar.prototype.addDFDPalette = function()
	{
		var w = 100;
		var h = 100;
		var s = 'html=1;dashed=0;whiteSpace=wrap;shape=mxgraph.dfd.';
		var s2 = mxConstants.STYLE_VERTICAL_LABEL_POSITION + '=bottom;' + mxConstants.STYLE_VERTICAL_ALIGN + '=top;html=1;strokeWidth=2;shape=mxgraph.dfd.';
		var s3 = mxConstants.STYLE_VERTICAL_LABEL_POSITION + '=bottom;' + mxConstants.STYLE_VERTICAL_ALIGN + '=top;html=1;strokeWidth=2;shape=';
		var gn = 'mxgraph.flowchart';
		var dt = 'dfd data flow diagram ';
		this.setCurrentSearchEntryLibrary('dfd');
		
		this.addPaletteFunctions('dfd', 'Data Flow Diagram', false,
		[
			this.createVertexTemplateEntry(s + 'start', w * 0.8, h * 0.3, '', 'Start / End', null, null, this.getTagsForStencil(gn, 'start end', dt).join(' ')),
			this.createVertexTemplateEntry('html=1;dashed=0;whiteSpace=wrap;', w, h * 0.5, '', 'Activity / Process / Entity / External Interactor', null, null, this.getTagsForStencil(gn, 'activity process entity external interactor', dt).join(' ')),
			this.createVertexTemplateEntry('shape=rhombus;html=1;dashed=0;whiteSpace=wrap;perimeter=rhombusPerimeter;', w * 0.6, h * 0.5, '', 'Decision / Entity Relationship', null, null, this.getTagsForStencil(gn, 'decision entity relationship', dt).join(' ')),
			this.createVertexTemplateEntry('shape=ellipse;html=1;dashed=0;whiteSpace=wrap;aspect=fixed;perimeter=ellipsePerimeter;', w * 0.3, h * 0.3, '', 'Reference', null, null, this.getTagsForStencil(gn, 'reference', dt).join(' ')),
			this.createVertexTemplateEntry('shape=parallelogram;perimeter=parallelogramPerimeter;whiteSpace=wrap;html=1;dashed=0;', w, h * 0.5, '', 'Product / Result', null, null, this.getTagsForStencil(gn, 'product result', dt).join(' ')),
			this.createVertexTemplateEntry('shape=manualInput;whiteSpace=wrap;html=1;dashed=0;size=15;', w, h * 0.5, '', 'Order / Command', null, null, this.getTagsForStencil(gn, 'order command', dt).join(' ')),
			this.createVertexTemplateEntry('shape=document;whiteSpace=wrap;html=1;boundedLbl=1;dashed=0;flipH=1;', w, h * 0.7, '', 'Information / Data Carrier / SOP', null, null, this.getTagsForStencil(gn, 'information data carrier sop', dt).join(' ')),
			this.createVertexTemplateEntry('triangle;whiteSpace=wrap;html=1;dashed=0;direction=south;', w * 0.6, h * 0.6, '', 'Information/Data Carrier/SOP / Stop State', null, null, this.getTagsForStencil(gn, 'information data carrier sop', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'archive', w * 0.6, h * 0.6, '', 'Final Report / Archive', null, null, this.getTagsForStencil(gn, 'final report archive', dt).join(' ')),
			this.createVertexTemplateEntry('shape=hexagon;perimeter=hexagonPerimeter2;whiteSpace=wrap;html=1;size=0.25', w, h * 0.5, '', 'Check', null, null, this.getTagsForStencil(gn, 'check', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'check2', w, h * 0.5, '', 'Check 2', null, null, this.getTagsForStencil(gn, 'check', dt).join(' ')),
			this.createVertexTemplateEntry('shape=ellipse;html=1;dashed=0;whiteSpace=wrap;perimeter=ellipsePerimeter;', w * 0.3, h * 0.3, '', 'Data Process', null, null, this.getTagsForStencil(gn, 'data process', dt).join(' ')),
			this.createVertexTemplateEntry('shape=ellipse;html=1;dashed=0;whiteSpace=wrap;aspect=fixed;perimeter=ellipsePerimeter;', w * 0.6, h * 0.6, '', 'Data Process / State', null, null, this.getTagsForStencil(gn, 'data process', dt).join(' ')),
			this.createVertexTemplateEntry('ellipse;shape=doubleEllipse;html=1;dashed=0;whiteSpace=wrap;aspect=fixed;', w * 0.6, h * 0.6, '', 'Multiple Process / Start State / Multi State', null, null, this.getTagsForStencil(gn, 'multiple process start state multi', dt).join(' ')),
			this.createVertexTemplateEntry('shape=ellipse;html=1;dashed=0;whiteSpace=wrap;aspect=fixed;strokeWidth=5;perimeter=ellipsePerimeter;', w * 0.6, h * 0.6, '', 'Stop State', null, null, this.getTagsForStencil(gn, 'stop state', dt).join(' ')),
			this.createVertexTemplateEntry('html=1;dashed=0;whiteSpace=wrap;shape=partialRectangle;right=0;left=0;', w, h * 0.3, '', 'Data Store', null, null, this.getTagsForStencil(gn, 'data store', dt).join(' ')),
			this.createVertexTemplateEntry('html=1;dashed=0;whiteSpace=wrap;shape=partialRectangle;right=0;', w, h * 0.3, '', 'Data Store', null, null, this.getTagsForStencil(gn, 'data store', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'dataStoreID;align=left;spacingLeft=3;points=[[0,0],[0.5,0],[1,0],[0,0.5],[1,0.5],[0,1],[0.5,1],[1,1]];', w, h * 0.3, '', 'Data Store with ID', null, null, this.getTagsForStencil(gn, 'data store with id identification', dt).join(' ')),
			this.createVertexTemplateEntry('swimlane;fontStyle=0;childLayout=stackLayout;horizontal=1;startSize=20;fillColor=#ffffff;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=0;marginBottom=0;swimlaneFillColor=#ffffff;', w, h * 0.5, '', 'Entity', null, null, this.getTagsForStencil(gn, 'entity', dt).join(' ')),
			this.createVertexTemplateEntry('shape=cloud;whiteSpace=wrap;html=1;', w * 1.2, h * 1.2, '', 'Object', null, null, this.getTagsForStencil(gn, 'object', dt).join(' ')),
			this.createVertexTemplateEntry('shape=ellipse;html=1;dashed=0;whiteSpace=wrap;perimeter=ellipsePerimeter;', w, h * 0.5, '', 'Oval Process', null, null, this.getTagsForStencil(gn, 'oval process', dt).join(' ')),
			this.createVertexTemplateEntry('shape=cylinder;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;', w * 0.6, h * 0.8, '', 'Data Store', null, null, this.getTagsForStencil(gn, 'data store', dt).join(' ')),

			this.addEntry(dt + 'external entity', function()
	   		{
			   	var bg = new mxCell('', new mxGeometry(0, 0, w, h), s + 'externalEntity');
			   	bg.vertex = true;
			   	var item1 = new mxCell('Id', new mxGeometry(0, 0, 20, 20), 'autosize=1;part=1;resizable=0;strokeColor=inherit;fillColor=inherit;gradientColor=inherit;');
			   	item1.geometry.relative = true;
			   	item1.geometry.offset = new mxPoint(15, 15);
			   	item1.vertex = true;
			   	bg.insert(item1);
				
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'External Entity');
			}),
		    
			this.createVertexTemplateEntry(s + 'loop', w * 0.8, h * 0.3, '', 'Loop', null, null, this.getTagsForStencil(gn, 'loop', dt).join(' ')),

		 	this.createEdgeTemplateEntry('endArrow=classic;html=1;', w * 0.5, h * 0.5, '', 'Directional Connector', null, dt + 'directional directed')
		]);
		
		this.setCurrentSearchEntryLibrary();
	};
})();
