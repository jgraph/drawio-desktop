(function()
{
	// Adds ArchiMate v3.0 shapes
	Sidebar.prototype.addArchimate3Palette = function()
	{
		this.setCurrentSearchEntryLibrary('archimate3', 'archimate3Application');
		this.addArchimate3ApplicationPalette();
		this.setCurrentSearchEntryLibrary('archimate3', 'archimate3Business');
		this.addArchimate3BusinessPalette();
		this.setCurrentSearchEntryLibrary('archimate3', 'archimate3Composite');
		this.addArchimate3CompositePalette();
		this.setCurrentSearchEntryLibrary('archimate3', 'archimate3Implementation and Migration');
		this.addArchimate3ImplementationAndMigrationPalette();
		this.setCurrentSearchEntryLibrary('archimate3', 'archimate3Motivation');
		this.addArchimate3MotivationPalette();
		this.setCurrentSearchEntryLibrary('archimate3', 'archimate3Physical');
		this.addArchimate3PhysicalPalette();
		this.setCurrentSearchEntryLibrary('archimate3', 'archimate3Relationships');
		this.addArchimate3RelationshipsPalette();
		this.setCurrentSearchEntryLibrary('archimate3', 'archimate3Strategy');
		this.addArchimate3StrategyPalette();
		this.setCurrentSearchEntryLibrary('archimate3', 'archimate3Technology');
		this.addArchimate3TechnologyPalette();
		this.setCurrentSearchEntryLibrary();
	};
	
	Sidebar.prototype.addArchimate3ApplicationPalette = function()
	{
		var am2 = 'html=1;outlineConnect=0;whiteSpace=wrap;fillColor=#99ffff;shape=mxgraph.archimate3.';

		// Space savers
		var sb = this;
		var gn = 'mxgraph.archimate3';
		var dt = 'archimate application layer ';
		
		var w = 1.0;
		var h = 1.0;
		
		var fns =
		[
			this.createVertexTemplateEntry(am2 + 'application;appType=comp;archiType=square;', 
					w * 150, h * 75, '', 'Application Component', null, null, this.getTagsForStencil(gn, '', dt + 'component').join(' ')),
			this.createVertexTemplateEntry(am2 + 'component;', 
					w * 70, h * 75, '', 'Component', null, null, this.getTagsForStencil(gn, '', dt + 'component').join(' ')),
			this.createVertexTemplateEntry(am2 + 'application;appType=collab;archiType=square;', 
					w * 150, h * 75, '', 'Application Collaboration', null, null, this.getTagsForStencil(gn, '', dt + 'collaboration').join(' ')),
			this.createVertexTemplateEntry(am2 + 'collaboration;', 
					w * 60, h * 35, '', 'Collaboration', null, null, this.getTagsForStencil(gn, '', dt + 'collaboration').join(' ')),
			this.createVertexTemplateEntry(am2 + 'application;appType=interface;archiType=square;', 
					w * 150, h * 75, '', 'Application Interface', null, null, this.getTagsForStencil(gn, '', dt + 'component').join(' ')),
			this.createVertexTemplateEntry(am2 + 'interface;', 
					w * 70, h * 35, '', 'Interface', null, null, this.getTagsForStencil(gn, '', dt + 'interface').join(' ')),
			this.createVertexTemplateEntry(am2 + 'application;appType=proc;archiType=rounded;', 
					w * 150, h * 75, '', 'Application Process', null, null, this.getTagsForStencil(gn, '', dt + 'process').join(' ')),
			this.createVertexTemplateEntry(am2 + 'process;', 
					w * 150, h * 75, '', 'Process', null, null, this.getTagsForStencil(gn, '', dt + 'process').join(' ')),
			this.createVertexTemplateEntry(am2 + 'application;appType=func;archiType=rounded;', 
					w * 150, h * 75, '', 'Application Function', null, null, this.getTagsForStencil(gn, '', dt + 'function').join(' ')),
			this.createVertexTemplateEntry(am2 + 'function;', 
					w * 75, h * 75, '', 'Function', null, null, this.getTagsForStencil(gn, '', dt + 'function').join(' ')),
			this.createVertexTemplateEntry(am2 + 'application;appType=interaction;archiType=rounded;', 
					w * 150, h * 75, '', 'Application Interaction', null, null, this.getTagsForStencil(gn, '', dt + 'interaction').join(' ')),
			this.createVertexTemplateEntry(am2 + 'interaction;', 
					w * 75, h * 75, '', 'Interaction', null, null, this.getTagsForStencil(gn, '', dt + 'interaction').join(' ')),
			this.createVertexTemplateEntry(am2 + 'application;appType=serv;archiType=rounded', 
					w * 150, h * 75, '', 'Application Service', null, null, this.getTagsForStencil(gn, '', dt + 'service').join(' ')),
			this.createVertexTemplateEntry(am2 + 'service;', 
					w * 60, h * 35, '', 'Service', null, null, this.getTagsForStencil(gn, '', dt + 'service').join(' ')),
			this.createVertexTemplateEntry(am2 + 'application;appType=event;archiType=rounded', 
					w * 150, h * 75, '', 'Application Event', null, null, this.getTagsForStencil(gn, '', dt + 'event').join(' ')),
			this.createVertexTemplateEntry(am2 + 'event;', 
					w * 60, h * 35, '', 'Event', null, null, this.getTagsForStencil(gn, '', dt + 'event').join(' ')),
			this.createVertexTemplateEntry(am2 + 'businessObject;overflow=fill', 
					w * 150, h * 75, '<table cellpadding="0" cellspacing="0" style="font-size:1em;width:100%;height:100%;"><tr style="height:20px;"><td align="center"></td></tr><tr><td align="left" valign="top" style="padding:4px;"></td></tr></table>', 
					'Data Object', null, null, this.getTagsForStencil(gn, '', dt + 'data object').join(' '))
		];
			
		this.addPalette('archimate3Application', 'Archimate 3.0 / Application', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};

	Sidebar.prototype.addArchimate3BusinessPalette = function()
	{
		var am2 = 'html=1;outlineConnect=0;whiteSpace=wrap;fillColor=#ffff99;shape=mxgraph.archimate3.';
		var am3 = 'html=1;outlineConnect=0;whiteSpace=wrap;fillColor=#ffff99;verticalLabelPosition=bottom;verticalAlign=top;align=center;shape=mxgraph.archimate3.';

		// Space savers
		var sb = this;
		var gn = 'mxgraph.archimate3';
		var dt = 'archimate business layer ';
		
		var w = 1.0;
		var h = 1.0;
		
		var fns =
		[
			this.createVertexTemplateEntry(am2 + 'application;appType=actor;archiType=square;', 
					w * 150, h * 75, '', 'Business Actor', null, null, this.getTagsForStencil(gn, '', dt + 'actor').join(' ')),
			this.createVertexTemplateEntry(am3 + 'actor;', 
					w * 50, h * 95, '', 'Actor', null, null, this.getTagsForStencil(gn, '', dt + 'actor').join(' ')),
			this.createVertexTemplateEntry(am2 + 'application;appType=role;archiType=square;', 
					w * 150, h * 75, '', 'Business Role', null, null, this.getTagsForStencil(gn, '', dt + 'role').join(' ')),
			this.createVertexTemplateEntry(am2 + 'role;', 
					w * 85, h * 50, '', 'Role', null, null, this.getTagsForStencil(gn, '', dt + 'role').join(' ')),
			this.createVertexTemplateEntry(am2 + 'application;appType=collab;archiType=square;', 
					w * 150, h * 75, '', 'Business Collaboration', null, null, this.getTagsForStencil(gn, '', dt + 'collaboration').join(' ')),
			this.createVertexTemplateEntry(am2 + 'collaboration;', 
					w * 60, h * 35, '', 'Collaboration', null, null, this.getTagsForStencil(gn, '', dt + 'collaboration').join(' ')),
			this.createVertexTemplateEntry(am2 + 'application;appType=interface;archiType=square;', 
					w * 150, h * 75, '', 'Business Interface', null, null, this.getTagsForStencil(gn, '', dt + 'component').join(' ')),
			this.createVertexTemplateEntry(am2 + 'interface;', 
					w * 70, h * 35, '', 'Interface', null, null, this.getTagsForStencil(gn, '', dt + 'interface').join(' ')),
			this.createVertexTemplateEntry(am2 + 'application;appType=proc;archiType=rounded;', 
					w * 150, h * 75, '', 'Business Process', null, null, this.getTagsForStencil(gn, '', dt + 'process').join(' ')),
			this.createVertexTemplateEntry(am2 + 'process;', 
					w * 150, h * 75, '', 'Process', null, null, this.getTagsForStencil(gn, '', dt + 'process').join(' ')),
			this.createVertexTemplateEntry(am2 + 'application;appType=func;archiType=rounded;', 
					w * 150, h * 75, '', 'Business Function', null, null, this.getTagsForStencil(gn, '', dt + 'function').join(' ')),
			this.createVertexTemplateEntry(am2 + 'function;', 
					w * 75, h * 75, '', 'Function', null, null, this.getTagsForStencil(gn, '', dt + 'function').join(' ')),
			this.createVertexTemplateEntry(am2 + 'application;appType=interaction;archiType=rounded;', 
					w * 150, h * 75, '', 'Business Interaction', null, null, this.getTagsForStencil(gn, '', dt + 'interaction').join(' ')),
			this.createVertexTemplateEntry(am2 + 'interaction;', 
					w * 75, h * 75, '', 'Interaction', null, null, this.getTagsForStencil(gn, '', dt + 'interaction').join(' ')),
			this.createVertexTemplateEntry(am2 + 'application;appType=serv;archiType=rounded;', 
					w * 150, h * 75, '', 'Business Service', null, null, this.getTagsForStencil(gn, '', dt + 'service').join(' ')),
			this.createVertexTemplateEntry(am2 + 'service;', 
					w * 60, h * 35, '', 'Service', null, null, this.getTagsForStencil(gn, '', dt + 'service').join(' ')),
			this.createVertexTemplateEntry(am2 + 'application;appType=event;archiType=rounded;', 
					w * 150, h * 75, '', 'Application Event', null, null, this.getTagsForStencil(gn, '', dt + 'event').join(' ')),
			this.createVertexTemplateEntry(am2 + 'event;', 
					w * 60, h * 35, '', 'Event', null, null, this.getTagsForStencil(gn, '', dt + 'event').join(' ')),
			this.createVertexTemplateEntry(am2 + 'businessObject;overflow=fill;', 
					w * 150, h * 75, '<table cellpadding="0" cellspacing="0" style="font-size:1em;width:100%;height:100%;"><tr style="height:20px;"><td align="center"></td></tr><tr><td align="left" valign="top" style="padding:4px;"></td></tr></table>', 
					'Business Object', null, null, this.getTagsForStencil(gn, '', dt + 'data object').join(' ')),
			this.createVertexTemplateEntry(am2 + 'contract;', 
					w * 150, h * 75, '', 'Contract', null, null, this.getTagsForStencil(gn, '', dt + 'contract').join(' ')),
			this.createVertexTemplateEntry(am2 + 'product;', 
					w * 150, h * 75, '', 'Product', null, null, this.getTagsForStencil(gn, '', dt + 'product').join(' ')),
			this.createVertexTemplateEntry(am2 + 'representation;', 
					w * 150, h * 90, '', 'Representation', null, null, this.getTagsForStencil(gn, '', dt + 'representation').join(' '))
		];
			
		this.addPalette('archimate3Business', 'Archimate 3.0 / Business', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};

	Sidebar.prototype.addArchimate3CompositePalette = function()
	{
		var am2 = 'html=1;outlineConnect=0;whiteSpace=wrap;fillColor=#FFB973;shape=mxgraph.archimate3.';

		// Space savers
		var sb = this;
		var gn = 'mxgraph.archimate3';
		var dt = 'archimate composite element ';
		
		var w = 1.0;
		var h = 1.0;
		
		var fns =
		[
			this.createVertexTemplateEntry(am2 + 'application;appType=location;archiType=square;', 
					w * 150, h * 75, '', 'Location', null, null, this.getTagsForStencil(gn, '', dt + 'location').join(' ')),
			this.createVertexTemplateEntry('shape=folder;spacingTop=10;tabWidth=100;tabHeight=25;tabPosition=left;html=1;dashed=1;', 
					w * 150, h * 105, '', 'Group', null, null, this.getTagsForStencil(gn, '', dt + 'actor').join(' '))
		];
			
		this.addPalette('archimate3Composite', 'Archimate 3.0 / Composite', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};
	
	Sidebar.prototype.addArchimate3ImplementationAndMigrationPalette = function()
	{
		var am2 = 'html=1;outlineConnect=0;whiteSpace=wrap;fillColor=#FFE0E0;shape=mxgraph.archimate3.';
		var am3 = 'html=1;outlineConnect=0;whiteSpace=wrap;fillColor=#E0FFE0;shape=mxgraph.archimate3.';

		// Space savers
		var sb = this;
		var gn = 'mxgraph.archimate3';
		var dt = 'archimate implementation migration element ';
		
		var w = 1.0;
		var h = 1.0;
		
		var fns =
		[
			this.createVertexTemplateEntry(am2 + 'application;archiType=rounded;', 
					w * 150, h * 75, '', 'Work Package', null, null, this.getTagsForStencil(gn, '', dt + 'work package').join(' ')),
			this.createVertexTemplateEntry(am2 + 'application;appType=event;archiType=rounded;', 
					w * 150, h * 75, '', 'Implementation Event', null, null, this.getTagsForStencil(gn, '', dt + 'implementation event').join(' ')),
			this.createVertexTemplateEntry(am2 + 'event;', 
					w * 60, h * 35, '', 'Event', null, null, this.getTagsForStencil(gn, '', dt + 'event').join(' ')),
			this.createVertexTemplateEntry(am2 + 'deliverable;', 
					w * 150, h * 60, '', 'Deliverable', null, null, this.getTagsForStencil(gn, '', dt + 'deliverable').join(' ')),
			this.createVertexTemplateEntry(am3 + 'tech;techType=plateau;', 
					w * 150, h * 75, '', 'Plateau', null, null, this.getTagsForStencil(gn, '', dt + 'plateau').join(' ')),
			this.createVertexTemplateEntry(am3 + 'gap;', 
					w * 150, h * 60, '', 'Gap', null, null, this.getTagsForStencil(gn, '', dt + 'gap').join(' '))
		];
			
		this.addPalette('archimate3Implementation and Migration', 'Archimate 3.0 / Implementation and Migration', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};
	
	Sidebar.prototype.addArchimate3MotivationPalette = function()
	{
		var am2 = 'html=1;outlineConnect=0;whiteSpace=wrap;fillColor=#CCCCFF;shape=mxgraph.archimate3.';

		// Space savers
		var sb = this;
		var gn = 'mxgraph.archimate3';
		var dt = 'archimate implementation motivation element ';
		
		var w = 1.0;
		var h = 1.0;
		
		var fns =
		[
			this.createVertexTemplateEntry(am2 + 'application;appType=role;archiType=oct;', 
					w * 150, h * 75, '', 'Stakeholder', null, null, this.getTagsForStencil(gn, '', dt + 'stakeholder').join(' ')),
			this.createVertexTemplateEntry(am2 + 'application;appType=driver;archiType=oct;', 
					w * 150, h * 75, '', 'Driver', null, null, this.getTagsForStencil(gn, '', dt + 'driver').join(' ')),
			this.createVertexTemplateEntry(am2 + 'application;appType=assess;archiType=oct;', 
					w * 150, h * 75, '', 'Assesment', null, null, this.getTagsForStencil(gn, '', dt + 'assessment').join(' ')),
			this.createVertexTemplateEntry('shape=ellipse;html=1;whiteSpace=wrap;fillColor=#CCCCFF;perimeter=ellipsePerimeter;', 
					w * 150, h * 75, '', 'Value', null, null, this.getTagsForStencil(gn, '', dt + 'value').join(' ')),
			this.createVertexTemplateEntry('shape=cloud;html=1;whiteSpace=wrap;fillColor=#CCCCFF;', 
					w * 150, h * 75, '', 'Meaning', null, null, this.getTagsForStencil(gn, '', dt + 'meaning').join(' ')),
			this.createVertexTemplateEntry(am2 + 'application;appType=goal;archiType=oct;', 
					w * 150, h * 75, '', 'Goal', null, null, this.getTagsForStencil(gn, '', dt + 'goal').join(' ')),
			this.createVertexTemplateEntry(am2 + 'application;appType=outcome;archiType=oct;', 
					w * 150, h * 75, '', 'Outcome', null, null, this.getTagsForStencil(gn, '', dt + 'outcome').join(' ')),
			this.createVertexTemplateEntry(am2 + 'application;appType=principle;archiType=oct;', 
					w * 150, h * 75, '', 'Principle', null, null, this.getTagsForStencil(gn, '', dt + 'principle').join(' ')),
			this.createVertexTemplateEntry(am2 + 'application;appType=requirement;archiType=oct;', 
					w * 150, h * 75, '', 'Requirement', null, null, this.getTagsForStencil(gn, '', dt + 'requirement').join(' ')),
			this.createVertexTemplateEntry(am2 + 'requirement;', 
					w * 100, h * 50, '', 'Requirement', null, null, this.getTagsForStencil(gn, '', dt + 'requirement').join(' ')),
			this.createVertexTemplateEntry(am2 + 'application;appType=constraint;archiType=oct;', 
					w * 150, h * 75, '', 'Constraint', null, null, this.getTagsForStencil(gn, '', dt + 'constraint').join(' ')),
			this.createVertexTemplateEntry(am2 + 'constraint;', 
					w * 100, h * 50, '', 'Constraint', null, null, this.getTagsForStencil(gn, '', dt + 'constraint').join(' '))
		];
			
		this.addPalette('archimate3Motivation', 'Archimate 3.0 / Motivation', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};
	
	Sidebar.prototype.addArchimate3PhysicalPalette = function()
	{
		var am2 = 'html=1;outlineConnect=0;whiteSpace=wrap;fillColor=#AFFFAF;shape=mxgraph.archimate3.';

		// Space savers
		var sb = this;
		var gn = 'mxgraph.archimate3';
		var dt = 'archimate physical element ';
		
		var w = 1.0;
		var h = 1.0;
		
		var fns =
		[
			this.createVertexTemplateEntry(am2 + 'tech;techType=facility;', 
					w * 150, h * 75, '', 'Facility', null, null, this.getTagsForStencil(gn, '', dt + 'facility').join(' ')),
			this.createVertexTemplateEntry(am2 + 'tech;techType=equipment;', 
					w * 150, h * 75, '', 'Equipment', null, null, this.getTagsForStencil(gn, '', dt + 'equipment').join(' ')),
			this.createVertexTemplateEntry(am2 + 'application;appType=material;archiType=square;', 
					w * 150, h * 75, '', 'Material', null, null, this.getTagsForStencil(gn, '', dt + 'material').join(' ')),
			this.createVertexTemplateEntry(am2 + 'application;appType=distribution;archiType=square;', 
					w * 150, h * 75, '', 'Distribution Network', null, null, this.getTagsForStencil(gn, '', dt + 'distribution').join(' ')),
			this.createVertexTemplateEntry(am2 + 'distribution;', 
					w * 90, h * 40, '', 'Distribution Network', null, null, this.getTagsForStencil(gn, '', dt + 'distribution').join(' '))
		];
			
		this.addPalette('archimate3Physical', 'Archimate 3.0 / Physical', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};
	
	Sidebar.prototype.addArchimate3RelationshipsPalette = function()
	{
		// Space savers
		var sb = this;
		var gn = 'mxgraph.archimate3';
		var dt = 'archimate relationship ';
		
		var w = 1.0;
		var h = 1.0;
		
		var fns =
		[
			this.createEdgeTemplateEntry('html=1;endArrow=diamondThin;endFill=1;edgeStyle=elbowEdgeStyle;elbow=vertical;endSize=10;',
					w * 160, 0, '', 'Composition', null, this.getTagsForStencil(gn, '', dt + 'composition').join(' ')),
			this.createEdgeTemplateEntry('html=1;endArrow=diamondThin;endFill=0;edgeStyle=elbowEdgeStyle;elbow=vertical;endSize=10;',
					w * 160, 0, '', 'Aggregation', null, this.getTagsForStencil(gn, '', dt + 'aggregation').join(' ')),
			this.createEdgeTemplateEntry('endArrow=block;html=1;endFill=1;startArrow=oval;startFill=1;edgeStyle=elbowEdgeStyle;elbow=vertical;',
					w * 160, 0, '', 'Assignment', null, this.getTagsForStencil(gn, '', dt + 'assignment').join(' ')),
			this.createEdgeTemplateEntry('edgeStyle=elbowEdgeStyle;html=1;endArrow=block;elbow=vertical;endFill=0;dashed=1;',
					w * 160, 0, '', 'Realization', null, this.getTagsForStencil(gn, '', dt + 'realization').join(' ')),
			this.createEdgeTemplateEntry('edgeStyle=elbowEdgeStyle;html=1;endArrow=open;elbow=vertical;endFill=1;',
					w * 160, 0, '', 'Serving', null, this.getTagsForStencil(gn, '', dt + 'serving').join(' ')),
			this.createEdgeTemplateEntry('edgeStyle=elbowEdgeStyle;html=1;endArrow=none;elbow=vertical;dashed=1;startFill=0;dashPattern=1 4;',
					w * 160, 0, '', 'Access', null, this.getTagsForStencil(gn, '', dt + 'access').join(' ')),
			this.createEdgeTemplateEntry('edgeStyle=elbowEdgeStyle;html=1;endArrow=open;elbow=vertical;endFill=0;dashed=1;startArrow=open;startFill=0;dashPattern=1 4;',
					w * 160, 0, '', 'Access', null, this.getTagsForStencil(gn, '', dt + 'access').join(' ')),
			this.createEdgeTemplateEntry('edgeStyle=elbowEdgeStyle;html=1;endArrow=open;elbow=vertical;endFill=0;dashed=1;dashPattern=1 4;',
					w * 160, 0, '', 'Access', null, this.getTagsForStencil(gn, '', dt + 'access').join(' ')),
					
			this.addEntry('uml influence', function()
			{
				var edge = new mxCell('+/-', new mxGeometry(0, 0, 0, 0), 'edgeStyle=elbowEdgeStyle;html=1;endArrow=open;elbow=vertical;endFill=0;dashed=1;dashPattern=6 4;');
				edge.geometry.setTerminalPoint(new mxPoint(0, 0), true);
				edge.geometry.setTerminalPoint(new mxPoint(160, 0), false);
				edge.geometry.relative = true;
				edge.geometry.x = 1;
				edge.geometry.y = 10;
				edge.edge = true;
			
				return sb.createEdgeTemplateFromCells([edge], 160, 0, 'Influence');
			}),
					
			this.createEdgeTemplateEntry('edgeStyle=elbowEdgeStyle;html=1;endArrow=block;dashed=0;elbow=vertical;endFill=1;',
					w * 160, 0, '', 'Triggering', null, this.getTagsForStencil(gn, '', dt + 'triggering').join(' ')),
			this.createEdgeTemplateEntry('edgeStyle=elbowEdgeStyle;html=1;endArrow=block;dashed=1;elbow=vertical;endFill=1;dashPattern=6 4;',
					w * 160, 0, '', 'Flow', null, this.getTagsForStencil(gn, '', dt + 'flow').join(' ')),
			this.createEdgeTemplateEntry('endArrow=block;html=1;endFill=0;edgeStyle=elbowEdgeStyle;elbow=vertical;',
					w * 160, 0, '', 'Specialization', null, this.getTagsForStencil(gn, '', dt + 'specialization').join(' ')),
			this.createEdgeTemplateEntry('edgeStyle=elbowEdgeStyle;html=1;endArrow=none;elbow=vertical;',
					w * 160, 0, '', 'Association', null, this.getTagsForStencil(gn, '', dt + 'association').join(' ')),
			this.createVertexTemplateEntry('ellipse;html=1;verticalLabelPosition=bottom;labelBackgroundColor=#ffffff;verticalAlign=top;fillColor=strokeColor', 
					10, 10, '', 'And Junction', null, this.getTagsForStencil(gn, '', dt + 'junction').join(' ')),
			this.createVertexTemplateEntry('ellipse;html=1;verticalLabelPosition=bottom;labelBackgroundColor=#ffffff;verticalAlign=top;fillColor=#ffffff', 
					10, 10, '', 'Or Junction', null, this.getTagsForStencil(gn, '', dt + 'junction').join(' '))
		];
			
		this.addPalette('archimate3Relationships', 'Archimate 3.0 / Relationships', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};
	
	Sidebar.prototype.addArchimate3StrategyPalette = function()
	{
		var am2 = 'html=1;outlineConnect=0;whiteSpace=wrap;fillColor=#F5DEAA;shape=mxgraph.archimate3.';

		// Space savers
		var sb = this;
		var gn = 'mxgraph.archimate3';
		var dt = 'archimate strategy ';
		
		var w = 1.0;
		var h = 1.0;
		
		var fns =
		[
			this.createVertexTemplateEntry(am2 + 'application;appType=resource;archiType=square;', 
					w * 150, h * 75, '', 'Resource', null, null, this.getTagsForStencil(gn, '', dt + 'resource').join(' ')),
			this.createVertexTemplateEntry(am2 + 'application;appType=capability;archiType=rounded;', 
					w * 150, h * 75, '', 'Capability', null, null, this.getTagsForStencil(gn, '', dt + 'capability').join(' ')),
			this.createVertexTemplateEntry(am2 + 'application;appType=course;archiType=rounded;', 
					w * 150, h * 75, '', 'Course of Action', null, null, this.getTagsForStencil(gn, '', dt + 'course action').join(' '))
		];
			
		this.addPalette('archimate3Strategy', 'Archimate 3.0 / Strategy', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};
	
	Sidebar.prototype.addArchimate3TechnologyPalette = function()
	{
		var am2 = 'html=1;outlineConnect=0;whiteSpace=wrap;fillColor=#AFFFAF;shape=mxgraph.archimate3.';

		// Space savers
		var sb = this;
		var gn = 'mxgraph.archimate3';
		var dt = 'archimate technology ';
		
		var w = 1.0;
		var h = 1.0;
		
		var fns =
		[
			this.createVertexTemplateEntry(am2 + 'application;appType=node;archiType=square;', 
					w * 150, h * 75, '', 'Node', null, null, this.getTagsForStencil(gn, '', dt + 'node').join(' ')),
			this.createVertexTemplateEntry(am2 + 'node;', 
					w * 100, h * 60, '', 'Node', null, null, this.getTagsForStencil(gn, '', dt + 'node').join(' ')),
			this.createVertexTemplateEntry(am2 + 'tech;techType=device;', 
					w * 150, h * 75, '', 'Device', null, null, this.getTagsForStencil(gn, '', dt + 'device').join(' ')),
			this.createVertexTemplateEntry(am2 + 'device;', 
					w * 80, h * 65, '', 'Device', null, null, this.getTagsForStencil(gn, '', dt + 'device').join(' ')),
			this.createVertexTemplateEntry(am2 + 'application;appType=sysSw;archiType=square;', 
					w * 150, h * 75, '', 'System Software', null, null, this.getTagsForStencil(gn, '', dt + 'system software').join(' ')),
			this.createVertexTemplateEntry(am2 + 'tech;techType=sysSw;', 
					w * 120, h * 75, '', 'System Software', null, null, this.getTagsForStencil(gn, '', dt + 'system software').join(' ')),
			this.createVertexTemplateEntry(am2 + 'application;appType=collab;archiType=square;', 
					w * 150, h * 75, '', 'Technology Collaboration', null, null, this.getTagsForStencil(gn, '', dt + 'collaboration').join(' ')),
			this.createVertexTemplateEntry(am2 + 'collaboration;', 
					w * 60, h * 35, '', 'Collaboration', null, null, this.getTagsForStencil(gn, '', dt + 'collaboration').join(' ')),
			this.createVertexTemplateEntry(am2 + 'application;appType=interface;archiType=square;', 
					w * 150, h * 75, '', 'Technology Interface', null, null, this.getTagsForStencil(gn, '', dt + 'component').join(' ')),
			this.createVertexTemplateEntry(am2 + 'interface;', 
					w * 70, h * 35, '', 'Interface', null, null, this.getTagsForStencil(gn, '', dt + 'interface').join(' ')),
			this.createVertexTemplateEntry(am2 + 'application;appType=proc;archiType=rounded;', 
					w * 150, h * 75, '', 'Technology Process', null, null, this.getTagsForStencil(gn, '', dt + 'process').join(' ')),
			this.createVertexTemplateEntry(am2 + 'process;', 
					w * 150, h * 75, '', 'Process', null, null, this.getTagsForStencil(gn, '', dt + 'process').join(' ')),
			this.createVertexTemplateEntry(am2 + 'application;appType=func;archiType=rounded;', 
					w * 150, h * 75, '', 'Technology Function', null, null, this.getTagsForStencil(gn, '', dt + 'function').join(' ')),
			this.createVertexTemplateEntry(am2 + 'function;', 
					w * 75, h * 75, '', 'Function', null, null, this.getTagsForStencil(gn, '', dt + 'function').join(' ')),
			this.createVertexTemplateEntry(am2 + 'application;appType=interaction;archiType=rounded;', 
					w * 150, h * 75, '', 'Technology Interaction', null, null, this.getTagsForStencil(gn, '', dt + 'interaction').join(' ')),
			this.createVertexTemplateEntry(am2 + 'interaction;', 
					w * 75, h * 75, '', 'Interaction', null, null, this.getTagsForStencil(gn, '', dt + 'interaction').join(' ')),
			this.createVertexTemplateEntry(am2 + 'application;appType=serv;archiType=rounded', 
					w * 150, h * 75, '', 'Technology Service', null, null, this.getTagsForStencil(gn, '', dt + 'service').join(' ')),
			this.createVertexTemplateEntry(am2 + 'service;', 
					w * 60, h * 35, '', 'Service', null, null, this.getTagsForStencil(gn, '', dt + 'service').join(' ')),
			this.createVertexTemplateEntry(am2 + 'application;appType=event;archiType=rounded', 
					w * 150, h * 75, '', 'Technology Event', null, null, this.getTagsForStencil(gn, '', dt + 'event').join(' ')),
			this.createVertexTemplateEntry(am2 + 'event;', 
					w * 60, h * 35, '', 'Event', null, null, this.getTagsForStencil(gn, '', dt + 'event').join(' ')),
			this.createVertexTemplateEntry(am2 + 'application;appType=artifact;archiType=square;', 
					w * 150, h * 75, '', 'Technology Artifact', null, null, this.getTagsForStencil(gn, '', dt + 'artifact').join(' ')),
			this.createVertexTemplateEntry(am2 + 'artifact;', 
					w * 50, h * 75, '', 'Artifact', null, null, this.getTagsForStencil(gn, '', dt + 'artifact').join(' ')),
			this.createVertexTemplateEntry(am2 + 'application;appType=netw;archiType=square;', 
					w * 150, h * 75, '', 'Communication Network', null, null, this.getTagsForStencil(gn, '', dt + 'communication network').join(' ')),
			this.createVertexTemplateEntry(am2 + 'commNetw;strokeWidth=6;', 
					w * 100, h * 30, '', 'Communication Network', null, null, this.getTagsForStencil(gn, '', dt + 'communication network').join(' ')),
			this.createVertexTemplateEntry(am2 + 'application;appType=path;archiType=square;', 
					w * 150, h * 75, '', 'Path', null, null, this.getTagsForStencil(gn, '', dt + 'communication network').join(' ')),
			this.createVertexTemplateEntry(am2 + 'path;strokeWidth=6;', 
					w * 100, h * 30, '', 'Path', null, null, this.getTagsForStencil(gn, '', dt + 'path').join(' '))
		];
			
		this.addPalette('archimate3Technology', 'Archimate 3.0 / Technology', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};
})();
