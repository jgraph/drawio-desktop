(function()
{
	Sidebar.prototype.addGCP2Palette = function()
	{
		this.setCurrentSearchEntryLibrary('gcp2', 'gcp2Paths');
		this.addGCP2PathsPalette();
		this.setCurrentSearchEntryLibrary('gcp2', 'gcp2Zones');
		this.addGCP2ZonesPalette();
		this.setCurrentSearchEntryLibrary('gcp2', 'gcp2Service Cards');
		this.addGCP2ServiceCardsPalette();
		this.setCurrentSearchEntryLibrary('gcp2', 'gcp2User Device Cards');
		this.addGCP2UserDeviceCardsPalette();
		this.setCurrentSearchEntryLibrary('gcp2', 'gcp2Compute');
		this.addGCP2ComputePalette();
		this.setCurrentSearchEntryLibrary('gcp2', 'gcp2API Management');
		this.addGCP2APIManagementPalette();
		this.setCurrentSearchEntryLibrary('gcp2', 'gcp2Security');
		this.addGCP2SecurityPalette();
		this.setCurrentSearchEntryLibrary('gcp2', 'gcp2Data Analytics');
		this.addGCP2DataAnalyticsPalette();
		this.setCurrentSearchEntryLibrary('gcp2', 'gcp2Data Transfer');
		this.addGCP2DataTransferPalette();
		this.setCurrentSearchEntryLibrary('gcp2', 'gcp2Cloud AI');
		this.addGCP2CloudAIPalette();
		this.setCurrentSearchEntryLibrary('gcp2', 'gcp2Internet of Things');
		this.addGCP2InternetOfThingsPalette();
		this.setCurrentSearchEntryLibrary('gcp2', 'gcp2Databases');
		this.addGCP2DatabasesPalette();
		this.setCurrentSearchEntryLibrary('gcp2', 'gcp2Storage');
		this.addGCP2StoragePalette();
		this.setCurrentSearchEntryLibrary('gcp2', 'gcp2Management Tools');
		this.addGCP2ManagementToolsPalette();
		this.setCurrentSearchEntryLibrary('gcp2', 'gcp2Networking');
		this.addGCP2NetworkingPalette();
		this.setCurrentSearchEntryLibrary('gcp2', 'gcp2Developer Tools');
		this.addGCP2DeveloperToolsPalette();
		this.setCurrentSearchEntryLibrary('gcp2', 'gcp2Expanded Product Cards');
		this.addGCP2ExpandedProductCardsPalette();
		this.setCurrentSearchEntryLibrary('gcp2', 'gcp2Product Cards');
		this.addGCP2ProductCardsPalette();
		this.setCurrentSearchEntryLibrary('gcp2', 'gcp2General Icons');
		this.addGCP2GeneralIconsPalette();
		this.setCurrentSearchEntryLibrary('gcp2', 'gcp2Icons AI and Machine Learning');
		this.addGCP2IconsAIAndMachineLearningPalette();
		this.setCurrentSearchEntryLibrary('gcp2', 'gcp2Icons Compute');
		this.addGCP2IconsComputePalette();
		this.setCurrentSearchEntryLibrary('gcp2', 'gcp2Icons Data Analytics');
		this.addGCP2IconsDataAnalyticsPalette();
		this.setCurrentSearchEntryLibrary('gcp2', 'gcp2Icons Operations');
		this.addGCP2IconsOperationsPalette();
		this.setCurrentSearchEntryLibrary('gcp2', 'gcp2Icons Networking');
		this.addGCP2IconsNetworkingPalette();
		this.setCurrentSearchEntryLibrary('gcp2', 'gcp2Icons CI CD');
		this.addGCP2IconsCICDPalette();
		this.setCurrentSearchEntryLibrary('gcp2', 'gcp2Icons API Management');
		this.addGCP2IconsAPIManagementPalette();
		this.setCurrentSearchEntryLibrary('gcp2', 'gcp2Icons Internet of Things');
		this.addGCP2IconsInternetOfThingsPalette();
		this.setCurrentSearchEntryLibrary('gcp2', 'gcp2Icons Databases');
		this.addGCP2IconsDatabasesPalette();
		this.setCurrentSearchEntryLibrary('gcp2', 'gcp2Icons Storage');
		this.addGCP2IconsStoragePalette();
		this.setCurrentSearchEntryLibrary('gcp2', 'gcp2Icons Security');
		this.addGCP2IconsSecurityPalette();
		this.setCurrentSearchEntryLibrary('gcp2', 'gcp2Icons Migration');
		this.addGCP2IconsMigrationPalette();
		this.setCurrentSearchEntryLibrary('gcp2', 'gcp2Icons Hybrid and Multi Cloud');
		this.addGCP2IconsHybridAndMultiCloudPalette();
		this.setCurrentSearchEntryLibrary('gcp2', 'gcp2Icons Open Source Icons');
		this.addGCP2IconsOpenSourceIconsPalette();
		this.setCurrentSearchEntryLibrary();
	};
	
	Sidebar.prototype.addGCP2PathsPalette = function()
	{
		var s = 'edgeStyle=orthogonalEdgeStyle;fontSize=12;html=1;endArrow=blockThin;endFill=1;rounded=0;strokeWidth=2;endSize=4;startSize=4;';
		var dt = 'gcp google cloud platform path ';
		var fns = [];
		
		var fns = [
			this.createEdgeTemplateEntry(s + 'dashed=0;strokeColor=#4284F3;', 100, 0, '', 'Primary Path', null, dt + 'primary'),
			this.createEdgeTemplateEntry(s + 'dashed=1;dashPattern=1 3;strokeColor=#4284F3;', 100, 0, '', 'Optional Primary Path', null, dt + 'optional primary'),
			this.createEdgeTemplateEntry(s + 'dashed=0;strokeColor=#9E9E9E;', 100, 0, '', 'Secondary Path', null, dt + 'secondary'),
			this.createEdgeTemplateEntry(s + 'dashed=1;dashPattern=1 3;strokeColor=#9E9E9E;', 100, 0, '', 'Optional Secondary Path', null, dt + 'optional secondary'),
			this.createEdgeTemplateEntry(s + 'strokeColor=#34A853;dashed=0;', 100, 0, '', 'Success Status', null, dt + 'success status'),
			this.createEdgeTemplateEntry(s + 'strokeColor=#EA4335;dashed=0;', 100, 0, '', 'Failure Status', null, dt + 'failure status')
	 	];
		
		this.addPalette('gcp2Paths', 'GCP / Paths', false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addGCP2ZonesPalette = function()
	{
		var sb = this;
		var s = 'sketch=0;points=[[0,0,0],[0.25,0,0],[0.5,0,0],[0.75,0,0],[1,0,0],[1,0.25,0],[1,0.5,0],[1,0.75,0],[1,1,0],[0.75,1,0],[0.5,1,0],[0.25,1,0],[0,1,0],[0,0.75,0],[0,0.5,0],[0,0.25,0]];rounded=1;absoluteArcSize=1;arcSize=2;html=1;strokeColor=none;gradientColor=none;shadow=0;dashed=0;fontSize=12;fontColor=#9E9E9E;align=left;verticalAlign=top;spacing=10;spacingTop=-4;whiteSpace=wrap;';
		var dt = 'gcp google cloud platform zone ';
		var gn = 'mxgraph.gcp2.zones';
		var fns = [];
		
		var fns = [
		    this.createVertexTemplateEntry(s + '', 
		    		120, 70, 'User 1', 'User 1 (Default)', null, null, this.getTagsForStencil(gn, '', dt + 'user').join(' ')),
		    this.createVertexTemplateEntry(s + 'fillColor=#F3E5F5;', 
		    		120, 150, 'Infrastructure\nSystem', 'Infrastructure System', null, null, this.getTagsForStencil(gn, '', dt + 'infrastructure system').join(' ')),
		    this.createVertexTemplateEntry(s + 'fillColor=#EFEBE9;', 
		    		120, 200, 'colo / dc /\non-premises', 'colo / dc / on-premises', null, null, this.getTagsForStencil(gn, '', dt + 'colo dc on premises').join(' ')),
		    this.createVertexTemplateEntry(s + 'fillColor=#F1F8E9;', 
		    		120, 70, 'System 1', 'System 1', null, null, this.getTagsForStencil(gn, '', dt + 'system').join(' ')),
		    this.createVertexTemplateEntry(s + 'fillColor=#FFEBEE;', 
		    		120, 70, 'External SaaS\nProviders', 'External SaaS Providers', null, null, this.getTagsForStencil(gn, '', dt + 'external saas providers').join(' ')),
		    this.createVertexTemplateEntry(s + 'fillColor=#FFF8E1;', 
		    		120, 70, 'External Data\nSources', 'External Data Sources', null, null, this.getTagsForStencil(gn, '', dt + 'external data sources').join(' ')),
		    this.createVertexTemplateEntry(s + 'fillColor=#E0F2F1;', 
		    		120, 75, 'External\nInfrastructure\n3<sup>rd</sup> Party', 'External Infrastructure 3rd party', null, null, this.getTagsForStencil(gn, '', dt + 'external infrastructure 3rd party').join(' ')),
		    this.createVertexTemplateEntry(s + 'fillColor=#E1F5FE;', 
		    		120, 75, 'External\nInfrastructure\n1<sup>st</sup> Party', 'External Infrastructure 1st party', null, null, this.getTagsForStencil(gn, '', dt + 'external infrastructure 1st party').join(' ')),
		    		
			this.addEntry(dt + 'project cloud service provider', function()
		   	{
			    var bg = new mxCell('Project Zone / Cloud Service Provider', new mxGeometry(0, 0, 530, 490), s + 'fillColor=#F6F6F6;');
		    	bg.vertex = true;
		    	
			    var zone1Cell = new mxCell('Logical Grouping of Services / Instances', 
			    		new mxGeometry(0, 0, 250, 180), s + 'fillColor=#E3F2FD;');
			    zone1Cell.geometry.relative = true;
			    zone1Cell.geometry.offset = new mxPoint(10, 50);
			    zone1Cell.vertex = true;
		    	bg.insert(zone1Cell);
			    
			    var zone2Cell = new mxCell('Zone', 
			    		new mxGeometry(0, 0, 230, 120), s + 'fillColor=#FFF3E0;');
			    zone2Cell.geometry.relative = true;
			    zone2Cell.geometry.offset = new mxPoint(10, 50);
			    zone2Cell.vertex = true;
			    zone1Cell.insert(zone2Cell);
			    
			    var zone3Cell = new mxCell('SubNetwork', 
			    		new mxGeometry(0, 0, 210, 60), s + 'fillColor=#EDE7F6;');
			    zone3Cell.geometry.relative = true;
			    zone3Cell.geometry.offset = new mxPoint(10, 50);
			    zone3Cell.vertex = true;
			    zone2Cell.insert(zone3Cell);
			    
			    var zone4Cell = new mxCell('Kubernetes cluster', 
			    		new mxGeometry(0, 0, 250, 120), s + 'fillColor=#FCE4EC;');
			    zone4Cell.geometry.relative = true;
			    zone4Cell.geometry.offset = new mxPoint(10, 240);
			    zone4Cell.vertex = true;
		    	bg.insert(zone4Cell);
			    
			    var zone5Cell = new mxCell('pod', 
			    		new mxGeometry(0, 0, 210, 60), s + 'fillColor=#E8F5E9;');
			    zone5Cell.geometry.relative = true;
			    zone5Cell.geometry.offset = new mxPoint(10, 50);
			    zone5Cell.vertex = true;
			    zone4Cell.insert(zone5Cell);
			    
			    var zone6Cell = new mxCell('Account', 
			    		new mxGeometry(0, 0, 250, 60), s + 'fillColor=#E8EAF6;');
			    zone6Cell.geometry.relative = true;
			    zone6Cell.geometry.offset = new mxPoint(10, 370);
			    zone6Cell.vertex = true;
			    bg.insert(zone6Cell);
			    
			    var zone7Cell = new mxCell('Region', 
			    		new mxGeometry(0, 0, 250, 310), s + 'fillColor=#ECEFF1;');
			    zone7Cell.geometry.relative = true;
			    zone7Cell.geometry.offset = new mxPoint(270, 50);
			    zone7Cell.vertex = true;
		    	bg.insert(zone7Cell);
			    
			    var zone8Cell = new mxCell('Zone', 
			    		new mxGeometry(0, 0, 230, 250), s + 'fillColor=#FFF3E0;');
			    zone8Cell.geometry.relative = true;
			    zone8Cell.geometry.offset = new mxPoint(10, 50);
			    zone8Cell.vertex = true;
			    zone7Cell.insert(zone8Cell);
			    
			    var zone9Cell = new mxCell('Firewall', 
			    		new mxGeometry(0, 0, 210, 190), s + 'fillColor=#FBE9E7;');
			    zone9Cell.geometry.relative = true;
			    zone9Cell.geometry.offset = new mxPoint(10, 50);
			    zone9Cell.vertex = true;
			    zone8Cell.insert(zone9Cell);
			    
			    var zone10Cell = new mxCell('Instance Group', 
			    		new mxGeometry(0, 0, 190, 60), s + 'fillColor=#F9FBE7;');
			    zone10Cell.geometry.relative = true;
			    zone10Cell.geometry.offset = new mxPoint(10, 50);
			    zone10Cell.vertex = true;
			    zone9Cell.insert(zone10Cell);
			    
			    var zone11Cell = new mxCell('Replica Pool', 
			    		new mxGeometry(0, 0, 190, 60), s + 'fillColor=#E0F7FA;');
			    zone11Cell.geometry.relative = true;
			    zone11Cell.geometry.offset = new mxPoint(10, 120);
			    zone11Cell.vertex = true;
			    zone9Cell.insert(zone11Cell);
			    
			    var zone12Cell = new mxCell('Optional Component', 
			    		new mxGeometry(0, 0, 250, 60), 
			    		'rounded=1;absoluteArcSize=1;arcSize=2;html=1;strokeColor=none;gradientColor=none;shadow=0;dashed=1;strokeColor=#4284F3;fontSize=12;fontColor=#9E9E9E;align=left;verticalAlign=top;spacing=10;spacingTop=-4;fillColor=none;dashPattern=1 2;strokeWidth=2;');
			    zone12Cell.geometry.relative = true;
			    zone12Cell.geometry.offset = new mxPoint(270, 370);
			    zone12Cell.vertex = true;
			    bg.insert(zone12Cell);

			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Project Zone / Cloud Service Provider');
			}),
			
		    this.createVertexTemplateEntry('fillColor=#4DA1F5;strokeColor=none;shadow=1;gradientColor=none;fontSize=14;align=left;spacingLeft=50;fontColor=#ffffff;whiteSpace=wrap;html=1;', 
		    		1000, 40, 'Architecture: App Engine and Cloud Endpoints', 'Title bar', null, null, this.getTagsForStencil(gn, '', dt + 'title bar').join(' ')),
		    this.createVertexTemplateEntry('strokeColor=none;shadow=0;gradientColor=none;fontSize=11;align=left;spacing=10;fontColor=#;9E9E9E;verticalAlign=top;spacingTop=100;whiteSpace=wrap;html=1;',
		    		300, 350, 'Use this note to call out\nor clarify parts of a diagram', 'Note', null, null, this.getTagsForStencil(gn, '', dt + 'note').join(' ')),
		    		
			this.addEntry(dt + 'project', function()
		   	{
			    var bg = new mxCell('<b>Google </b>Cloud Platform', new mxGeometry(0, 0, 650, 350), 
			    		'fillColor=#F6F6F6;strokeColor=none;shadow=0;gradientColor=none;fontSize=14;align=left;spacing=10;fontColor=#717171;9E9E9E;verticalAlign=top;spacingTop=-4;fontStyle=0;spacingLeft=40;html=1;whiteSpace=wrap;');
		    	bg.vertex = true;
		    	
			    var zone1Cell = new mxCell('', 
			    		new mxGeometry(0, 0, 23, 20), 
			    		'shape=mxgraph.gcp2.google_cloud_platform;fillColor=#F6F6F6;strokeColor=none;shadow=0;gradientColor=none;');
			    zone1Cell.geometry.relative = true;
			    zone1Cell.geometry.offset = new mxPoint(20, 10);
			    zone1Cell.vertex = true;
		    	bg.insert(zone1Cell);

			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Project Zone');
			}),

			this.addEntry(dt + 'markers', function()
		   	{
				s = 'shape=ellipse;perimeter=ellipsePerimeter;strokeColor=#BDBDBD;strokeWidth=2;shadow=0;gradientColor=none;fontColor=#757575;align=center;html=1;fontStyle=1;spacingTop=-1;';
				
			    var icon1 = new mxCell('1', new mxGeometry(0, 0, 20, 20), s);
			    icon1.vertex = true;
			    var icon2 = new mxCell('2', new mxGeometry(40, 0, 20, 20), s);
			    icon2.vertex = true;
			    var icon3 = new mxCell('3', new mxGeometry(80, 0, 20, 20), s);
			    icon3.vertex = true;
			    var icon4 = new mxCell('4', new mxGeometry(120, 0, 20, 20), s);
			    icon4.vertex = true;
			    var icon5 = new mxCell('5', new mxGeometry(160, 0, 20, 20), s);
			    icon5.vertex = true;
			    var icon6 = new mxCell('6', new mxGeometry(200, 0, 20, 20), s);
			    icon6.vertex = true;
			    var icon7 = new mxCell('7', new mxGeometry(240, 0, 20, 20), s);
			    icon7.vertex = true;
			    var label1 = new mxCell('Markers to be used with the legend', new mxGeometry(0, 20, 260, 30), 
			    		'strokeColor=none;fillColor=none;fontColor=#757575;align=left;html=1;fontStyle=0;fontSize=11;');
			    label1.vertex = true;

			   	return sb.createVertexTemplateFromCells([icon1, icon2, icon3, icon4, icon5, icon6, icon7, label1], 260, 50, 'Markers');
			}),

			this.addEntry(dt + 'markers', function()
		   	{
				var s = 'strokeColor=none;fillColor=none;fontColor=#757575;align=left;html=1;fontStyle=0;spacingLeft=5;fontSize=11;verticalAlign=top;whiteSpace=wrap;spacingRight=5;';
				
			    var bg = new mxCell('', new mxGeometry(0, 0, 600, 70), 
	    			'strokeColor=#BDBDBD;strokeWidth=1;shadow=0;gradientColor=none;');
			    bg.vertex = true;
				
			    var label1 = new mxCell('1 Commit code', new mxGeometry(0, 0, 200, 30), s);
			    label1.geometry.relative = true;
			    label1.vertex = true;
			    bg.insert(label1);
			    
			    var label2 = new mxCell('2 Detect code change', new mxGeometry(0, 0, 200, 30), s);
			    label2.geometry.relative = true;
			    label2.geometry.offset = new mxPoint(0, 30);
			    label2.vertex = true;
			    bg.insert(label2);
			    
			    var label3 = new mxCell('3 Build immutable image', new mxGeometry(0, 0, 200, 30), s);
			    label3.geometry.relative = true;
			    label3.geometry.offset = new mxPoint(200, 0);
			    label3.vertex = true;
			    bg.insert(label3);
			    
			    var label4 = new mxCell('4 Launch test instance from image', new mxGeometry(0, 0, 200, 30), s);
			    label4.geometry.relative = true;
			    label4.geometry.offset = new mxPoint(200, 30);
			    label4.vertex = true;
			    bg.insert(label4);
			    
			    var label5 = new mxCell('5 Run tests', new mxGeometry(0, 0, 200, 30), s);
			    label5.geometry.relative = true;
			    label5.geometry.offset = new mxPoint(400, 0);
			    label5.vertex = true;
			    bg.insert(label5);
			    
			    var label6 = new mxCell('6 Perform rolling update of image to autoscaler', new mxGeometry(0, 0, 200, 30), s);
			    label6.geometry.relative = true;
			    label6.geometry.offset = new mxPoint(400, 30);
			    label6.vertex = true;
			    bg.insert(label6);
			    
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Markers');
			})
	 	];
		
		this.addPalette('gcp2Zones', 'GCP / Zones', false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addGCP2GeneralIconsPalette = function()
	{
		var sb = this;
		var s = 1;
		var n = 'sketch=0;html=1;aspect=fixed;strokeColor=none;shadow=0;fillColor=#3B8DF1;verticalAlign=top;labelPosition=center;verticalLabelPosition=bottom;shape=mxgraph.gcp2.';
		var dt = 'gcp google cloud platform general icons icon ';
		var gn = 'mxgraph.gcp2';
		var fns = [];
		
		var fns = [
		    this.createVertexTemplateEntry(n + 'biomedical_trio', 
		    		s * 100, s * 68, null, 'Biomedical Trio', null, null, this.getTagsForStencil(gn, '', dt + 'biomedical trio').join(' ')),
		    this.createVertexTemplateEntry(n + 'biomedical_beaker', 
		    		s * 69, s * 100, null, 'Biomedical Beaker', null, null, this.getTagsForStencil(gn, '', dt + 'biomedical beaker').join(' ')),
		    this.createVertexTemplateEntry(n + 'biomedical_test_tube', 
		    		s * 31, s * 100, null, 'Biomedical Test Tube', null, null, this.getTagsForStencil(gn, '', dt + 'biomedical test tube').join(' ')),
		    this.createVertexTemplateEntry(n + 'check_available', 
		    		s * 100, s * 87, null, 'Check Available', null, null, this.getTagsForStencil(gn, '', dt + 'check available').join(' ')),
		    this.createVertexTemplateEntry(n + 'cloud_monitoring', 
		    		s * 90, s * 100, null, 'Cloud Monitoring', null, null, this.getTagsForStencil(gn, '', dt + 'cloud monitoring').join(' ')),
		    this.createVertexTemplateEntry(n + 'repository', 
		    		s * 60, s * 100, null, 'Repository', null, null, this.getTagsForStencil(gn, '', dt + 'repository').join(' ')),
		    this.createVertexTemplateEntry(n + 'compute_engine_2', 
		    		s * 54, s * 100, null, 'Compute Engine', null, null, this.getTagsForStencil(gn, '', dt + 'compute engine').join(' ')),
		    this.createVertexTemplateEntry(n + 'capabilities', 
		    		s * 100, s * 76, null, 'Capabilities', null, null, this.getTagsForStencil(gn, '', dt + 'capabilities thumbs up gear').join(' ')),
		    this.createVertexTemplateEntry(n + 'globe_world', 
		    		s * 100, s * 95, null, 'World Network', null, null, this.getTagsForStencil(gn, '', dt + 'globe global world network upload anywhere').join(' ')),
		    this.createVertexTemplateEntry(n + 'process', 
		    		s * 84, s * 100, null, 'Process', null, null, this.getTagsForStencil(gn, '', dt + 'process').join(' ')),
		    this.createVertexTemplateEntry(n + 'arrow_cycle', 
		    		s * 100, s * 95, null, 'Arrow Cycle', null, null, this.getTagsForStencil(gn, '', dt + 'arrow cycle').join(' ')),
		    this.createVertexTemplateEntry(n + 'arrows_system', 
		    		s * 100, s * 95, null, 'Arrows System', null, null, this.getTagsForStencil(gn, '', dt + 'arrows system').join(' ')),
		    this.createVertexTemplateEntry(n + 'half_cloud', 
		    		s * 100, s * 50, null, 'Half Cloud', null, null, this.getTagsForStencil(gn, '', dt + 'half cloud').join(' ')),
		    this.createVertexTemplateEntry(n + 'cloud', 
		    		s * 100, s * 69, null, 'Cloud', null, null, this.getTagsForStencil(gn, '', dt + 'cloud').join(' ')),
		    this.createVertexTemplateEntry(n + 'speed', 
		    		s * 100, s * 57, null, 'Speed', null, null, this.getTagsForStencil(gn, '', dt + 'speed').join(' ')),
		    this.createVertexTemplateEntry(n + 'time_clock', 
		    		s * 86, s * 100, null, 'Overtime', null, null, this.getTagsForStencil(gn, '', dt + 'time clock frozen cold overtime').join(' ')),
		    this.createVertexTemplateEntry(n + 'loading', 
		    		s * 100, s * 100, null, 'Loading', null, null, this.getTagsForStencil(gn, '', dt + 'loading').join(' ')),
		    this.createVertexTemplateEntry(n + 'clock', 
		    		s * 100, s * 100, null, 'Clock', null, null, this.getTagsForStencil(gn, '', dt + 'clock').join(' ')),
		    this.createVertexTemplateEntry(n + 'check', 
		    		s * 100, s * 80, null, 'Check', null, null, this.getTagsForStencil(gn, '', dt + 'check').join(' ')),
		    this.createVertexTemplateEntry('sketch=0;html=1;aspect=fixed;strokeColor=none;shadow=0;align=center;fillColor=#F4AF20;verticalAlign=top;labelPosition=center;verticalLabelPosition=bottom;shape=mxgraph.gcp2.check', 
		    		s * 100, s * 80, null, 'Check (yellow)', null, null, this.getTagsForStencil(gn, '', dt + 'check').join(' ')),
		    this.createVertexTemplateEntry('sketch=0;html=1;aspect=fixed;strokeColor=none;shadow=0;align=center;fillColor=#2D9C5E;verticalAlign=top;labelPosition=center;verticalLabelPosition=bottom;shape=mxgraph.gcp2.check', 
		    		s * 100, s * 80, null, 'Check (green)', null, null, this.getTagsForStencil(gn, '', dt + 'check').join(' ')),
		    this.createVertexTemplateEntry(n + 'lock', 
		    		s * 78, s * 100, null, 'Lock', null, null, this.getTagsForStencil(gn, '', dt + 'lock').join(' ')),
		    this.createVertexTemplateEntry(n + 'cloud_security', 
		    		s * 100, s * 70, null, 'Cloud Security', null, null, this.getTagsForStencil(gn, '', dt + 'cloud security').join(' ')),
		    this.createVertexTemplateEntry(n + 'cloud_checkmark', 
		    		s * 100, s * 67, null, 'Cloud Checkmark', null, null, this.getTagsForStencil(gn, '', dt + 'cloud checkmark').join(' ')),
		    this.createVertexTemplateEntry(n + 'key', 
		    		s * 100, s * 47, null, 'Key', null, null, this.getTagsForStencil(gn, '', dt + 'key').join(' ')),
		    this.createVertexTemplateEntry(n + 'aspect_ratio', 
		    		s * 100, s * 92, null, 'Aspect Ratio', null, null, this.getTagsForStencil(gn, '', dt + 'aspect ratio').join(' ')),
		    this.createVertexTemplateEntry(n + 'scale', 
		    		s * 100, s * 92, null, 'Check', null, null, this.getTagsForStencil(gn, '', dt + 'check scale aspect ratio').join(' ')),
		    this.createVertexTemplateEntry(n + 'big_query', 
		    		s * 99, s * 100, null, 'Big Query', null, null, this.getTagsForStencil(gn, '', dt + 'big query').join(' ')),
		    this.createVertexTemplateEntry(n + 'search', 
		    		s * 99, s * 100, null, 'Search', null, null, this.getTagsForStencil(gn, '', dt + 'search').join(' ')),
		    this.createVertexTemplateEntry('sketch=0;html=1;aspect=fixed;strokeColor=none;shadow=0;align=center;fillColor=#2D9C5E;verticalAlign=top;labelPosition=center;verticalLabelPosition=bottom;shape=mxgraph.gcp2.search', 
		    		s * 99, s * 100, null, 'Search (green)', null, null, this.getTagsForStencil(gn, '', dt + 'search').join(' ')),
		    this.createVertexTemplateEntry(n + 'solution', 
		    		s * 99, s * 100, null, 'Solution', null, null, this.getTagsForStencil(gn, '', dt + 'solution').join(' ')),
		    this.createVertexTemplateEntry(n + 'visibility', 
		    		s * 100, s * 94, null, 'Visibility', null, null, this.getTagsForStencil(gn, '', dt + 'visibility').join(' ')),
		    this.createVertexTemplateEntry(n + 'anomaly_detection', 
		    		s * 78, s * 100, null, 'Anomaly Detection', null, null, this.getTagsForStencil(gn, '', dt + 'anomaly detection').join(' ')),
		    this.createVertexTemplateEntry(n + 'view_list', 
		    		s * 81, s * 100, null, 'View List', null, null, this.getTagsForStencil(gn, '', dt + 'view list').join(' ')),
		    this.createVertexTemplateEntry(n + 'connected', 
		    		s * 100, s * 72, null, 'Admin', null, null, this.getTagsForStencil(gn, '', dt + 'admin system connected').join(' ')),
		    this.createVertexTemplateEntry(n + 'cloud_server', 
		    		s * 100, s * 89, null, 'Cloud Server', null, null, this.getTagsForStencil(gn, '', dt + 'cloud server').join(' ')),
		    this.createVertexTemplateEntry(n + 'primary', 
		    		s * 100, s * 15, null, 'Primary', null, null, this.getTagsForStencil(gn, '', dt + 'primary').join(' ')),
		    this.createVertexTemplateEntry(n + 'monitor', 
		    		s * 100, s * 85, null, 'Monitor', null, null, this.getTagsForStencil(gn, '', dt + 'monitor save help').join(' ')),
		    this.createVertexTemplateEntry(n + 'monitor_2', 
		    		s * 100, s * 85, null, 'Monitor', null, null, this.getTagsForStencil(gn, '', dt + 'monitor').join(' ')),
		    this.createVertexTemplateEntry(n + 'website', 
		    		s * 100, s * 97, null, 'Website', null, null, this.getTagsForStencil(gn, '', dt + 'website').join(' ')),
		    this.createVertexTemplateEntry(n + 'safety', 
		    		s * 100, s * 96, null, 'Safety', null, null, this.getTagsForStencil(gn, '', dt + 'safety').join(' ')),
		    this.createVertexTemplateEntry(n + 'gear_load', 
		    		s * 100, s * 92, null, 'Gear Load', null, null, this.getTagsForStencil(gn, '', dt + 'gear load').join(' ')),
		    this.createVertexTemplateEntry(n + 'files', 
		    		s * 100, s * 97, null, 'Files', null, null, this.getTagsForStencil(gn, '', dt + 'files data sharing').join(' ')),
		    this.createVertexTemplateEntry(n + 'play_gear', 
		    		s * 100, s * 100, null, 'Play Gear', null, null, this.getTagsForStencil(gn, '', dt + 'play gear').join(' ')),
		    this.createVertexTemplateEntry(n + 'play_start', 
		    		s * 100, s * 100, null, 'Play Start', null, null, this.getTagsForStencil(gn, '', dt + 'play start').join(' ')),
		    this.createVertexTemplateEntry(n + 'replication_controller', 
		    		s * 100, s * 91, null, 'Replication Controller', null, null, this.getTagsForStencil(gn, '', dt + 'replication controller').join(' ')),
		    this.createVertexTemplateEntry(n + 'replication_controller_2', 
		    		s * 100, s * 91, null, 'Replication Controller', null, null, this.getTagsForStencil(gn, '', dt + 'replication controller').join(' ')),
		    this.createVertexTemplateEntry(n + 'replication_controller_3', 
		    		s * 100, s * 66, null, 'Replication Controller', null, null, this.getTagsForStencil(gn, '', dt + 'replication controller').join(' ')),
		    this.createVertexTemplateEntry(n + 'repository_2', 
		    		s * 94, s * 100, null, 'Repository', null, null, this.getTagsForStencil(gn, '', dt + 'repository upload swap').join(' ')),
		    this.createVertexTemplateEntry(n + 'repository_3', 
		    		s * 100, s * 100, null, 'Repository', null, null, this.getTagsForStencil(gn, '', dt + 'repository').join(' ')),
		    this.createVertexTemplateEntry(n + 'repository_primary', 
		    		s * 100, s * 100, null, 'Repository', null, null, this.getTagsForStencil(gn, '', dt + 'repository primary').join(' ')),
		    this.createVertexTemplateEntry(n + 'database_3', 
		    		s * 70, s * 100, null, 'Database', null, null, this.getTagsForStencil(gn, '', dt + 'database db files').join(' ')),
		    this.createVertexTemplateEntry(n + 'database_uploading', 
		    		s * 100, s * 84, null, 'Database Uploading', null, null, this.getTagsForStencil(gn, '', dt + 'database db uploading').join(' ')),
		    this.createVertexTemplateEntry(n + 'servers_stacked', 
		    		s * 100, s * 100, null, 'Servers Stacked', null, null, this.getTagsForStencil(gn, '', dt + 'servers stacked').join(' ')),
		    this.createVertexTemplateEntry(n + 'segments', 
		    		s * 100, s * 100, null, 'Segments', null, null, this.getTagsForStencil(gn, '', dt + 'segments').join(' ')),
		    this.createVertexTemplateEntry(n + 'segments_2', 
		    		s * 100, s * 92, null, 'Segments', null, null, this.getTagsForStencil(gn, '', dt + 'segments').join(' ')),
		    this.createVertexTemplateEntry(n + 'segments_overlap', 
		    		s * 100, s * 100, null, 'Segments Overlap', null, null, this.getTagsForStencil(gn, '', dt + 'segments overlap').join(' ')),
		    this.createVertexTemplateEntry(n + 'cost_savings', 
		    		s * 66, s * 100, null, 'Cost Savings', null, null, this.getTagsForStencil(gn, '', dt + 'cost savings').join(' ')),
		    this.createVertexTemplateEntry(n + 'enhance_ui', 
		    		s * 76, s * 100, null, 'Enhance UI', null, null, this.getTagsForStencil(gn, '', dt + 'enhance ui').join(' ')),
		    this.createVertexTemplateEntry(n + 'phone_android', 
		    		s * 56, s * 100, null, 'Phone', null, null, this.getTagsForStencil(gn, '', dt + 'phone android').join(' ')),
		    this.createVertexTemplateEntry(n + 'cost_arrows', 
		    		s * 76, s * 100, null, 'Cost Arrows', null, null, this.getTagsForStencil(gn, '', dt + 'cost arrows').join(' ')),
		    this.createVertexTemplateEntry(n + 'increase_cost_arrows', 
		    		s * 100, s * 92, null, 'Increase Cost Arrows', null, null, this.getTagsForStencil(gn, '', dt + 'increase cost arrows').join(' ')),
		    this.createVertexTemplateEntry(n + 'cost', 
		    		s * 85, s * 100, null, 'Cost File', null, null, this.getTagsForStencil(gn, '', dt + 'cost file').join(' ')),
		    this.createVertexTemplateEntry(n + 'database_2', 
		    		s * 78, s * 100, null, 'Database', null, null, this.getTagsForStencil(gn, '', dt + 'database db').join(' ')),
		    this.createVertexTemplateEntry(n + 'database_speed', 
		    		s * 69, s * 100, null, 'Database Speed', null, null, this.getTagsForStencil(gn, '', dt + 'database db speed').join(' ')),
		    this.createVertexTemplateEntry(n + 'data_access', 
		    		s * 93, s * 100, null, 'Data Access', null, null, this.getTagsForStencil(gn, '', dt + 'data access file gear').join(' ')),
		    this.createVertexTemplateEntry(n + 'database_cycle', 
		    		s * 100, s * 98, null, 'Database Cycle', null, null, this.getTagsForStencil(gn, '', dt + 'database db cycle').join(' ')),
		    this.createVertexTemplateEntry(n + 'data_increase', 
		    		s * 78, s * 100, null, 'Data Increase', null, null, this.getTagsForStencil(gn, '', dt + 'data increase').join(' ')),
		    this.createVertexTemplateEntry(n + 'data_storage_cost', 
		    		s * 78, s * 100, null, 'Data Storage Cost', null, null, this.getTagsForStencil(gn, '', dt + 'data storage cost').join(' ')),
		    this.createVertexTemplateEntry(n + 'gear', 
		    		s * 100, s * 100, null, 'Gear', null, null, this.getTagsForStencil(gn, '', dt + 'gear').join(' ')),
		    this.createVertexTemplateEntry(n + 'gear_chain', 
		    		s * 100, s * 100, null, 'Gear Chain', null, null, this.getTagsForStencil(gn, '', dt + 'gear chain').join(' ')),
		    this.createVertexTemplateEntry(n + 'bucket_scale', 
		    		s * 100, s * 81, null, 'Bucket Scale', null, null, this.getTagsForStencil(gn, '', dt + 'bucket scale').join(' ')),
		    this.createVertexTemplateEntry(n + 'a7_power', 
		    		s * 100, s * 100, null, 'A7 Power', null, null, this.getTagsForStencil(gn, '', dt + 'a7 power').join(' ')),
		    this.createVertexTemplateEntry(n + 'gear_arrow', 
		    		s * 100, s * 61, null, 'Gear Arrow', null, null, this.getTagsForStencil(gn, '', dt + 'gear arrow').join(' ')),
		    this.createVertexTemplateEntry(n + 'swap', 
		    		s * 100, s * 51, null, 'Swap', null, null, this.getTagsForStencil(gn, '', dt + 'swap').join(' ')),
		    this.createVertexTemplateEntry(n + 'save', 
		    		s * 100, s * 84, null, 'Save', null, null, this.getTagsForStencil(gn, '', dt + 'save').join(' ')),
		    this.createVertexTemplateEntry(n + 'social_media_time', 
		    		s * 97, s * 100, null, 'Social Media Time', null, null, this.getTagsForStencil(gn, '', dt + 'social media time').join(' ')),
		    this.createVertexTemplateEntry(n + 'tape_record', 
		    		s * 100, s * 71, null, 'Tape Record', null, null, this.getTagsForStencil(gn, '', dt + 'tape record').join(' ')),
		    this.createVertexTemplateEntry(n + 'folders', 
		    		s * 100, s * 85, null, 'Folders', null, null, this.getTagsForStencil(gn, '', dt + 'folders extensible').join(' ')),
		    this.createVertexTemplateEntry(n + 'maps_api', 
		    		s * 61, s * 100, null, 'Maps API', null, null, this.getTagsForStencil(gn, '', dt + 'maps api application programming interface').join(' ')),
		    this.createVertexTemplateEntry(n + 'enhance_ui_2', 
		    		s * 100, s * 91, null, 'Enhance UI', null, null, this.getTagsForStencil(gn, '', dt + 'enhance ui user interface').join(' ')),
		    this.createVertexTemplateEntry(n + 'certified_industry_standard', 
		    		s * 100, s * 78, null, 'Certified Industry Standard', null, null, this.getTagsForStencil(gn, '', dt + 'certified industry standard').join(' ')),
		    this.createVertexTemplateEntry(n + 'calculator', 
		    		s * 100, s * 74, null, 'Calculator', null, null, this.getTagsForStencil(gn, '', dt + 'calculator').join(' ')),
		    this.createVertexTemplateEntry(n + 'network', 
		    		s * 100, s * 100, null, 'Network', null, null, this.getTagsForStencil(gn, '', dt + 'network').join(' ')),
		    this.createVertexTemplateEntry(n + 'cloud_computer', 
		    		s * 100, s * 88, null, 'Cloud Computer', null, null, this.getTagsForStencil(gn, '', dt + 'cloud computer').join(' ')),
		    this.createVertexTemplateEntry(n + 'cloud_connected_insight', 
		    		s * 100, s * 91, null, 'Cloud Connected Insight', null, null, this.getTagsForStencil(gn, '', dt + 'cloud connected insight').join(' ')),
		    this.createVertexTemplateEntry(n + 'cloud_information', 
		    		s * 100, s * 79, null, 'Cloud Information Portable', null, null, this.getTagsForStencil(gn, '', dt + 'cloud information portable').join(' ')),
		    this.createVertexTemplateEntry(n + 'lifecycle', 
		    		s * 100, s * 100, null, 'Lifecycle', null, null, this.getTagsForStencil(gn, '', dt + 'lifecycle time folder loading').join(' ')),
		    this.createVertexTemplateEntry(n + 'thumbs_up', 
		    		s * 100, s * 100, null, 'Thumbs Up', null, null, this.getTagsForStencil(gn, '', dt + 'thumbs up').join(' ')),
		    this.createVertexTemplateEntry(n + 'loading_2', 
		    		s * 93, s * 100, null, 'Loading', null, null, this.getTagsForStencil(gn, '', dt + 'loading').join(' ')),
		    this.createVertexTemplateEntry(n + 'internet_connection', 
		    		s * 100, s * 83, null, 'Internet Connection', null, null, this.getTagsForStencil(gn, '', dt + 'internet connection').join(' ')),
		    this.createVertexTemplateEntry(n + 'check_scale', 
		    		s * 100, s * 75, null, 'Check Scale', null, null, this.getTagsForStencil(gn, '', dt + 'check scale').join(' ')),
		    this.createVertexTemplateEntry(n + 'load_balancing', 
		    		s * 100, s * 26, null, 'Load Balancing', null, null, this.getTagsForStencil(gn, '', dt + 'load balancing').join(' ')),
		    this.createVertexTemplateEntry(n + 'cloud_messaging', 
		    		s * 100, s * 64, null, 'Cloud Messaging', null, null, this.getTagsForStencil(gn, '', dt + 'cloud messaging').join(' ')),
		    this.createVertexTemplateEntry(n + 'memory_card', 
		    		s * 93, s * 100, null, 'Memory Card', null, null, this.getTagsForStencil(gn, '', dt + 'memory card').join(' ')),
		    this.createVertexTemplateEntry(n + 'admin_connected', 
		    		s * 100, s * 100, null, 'Admin Connected', null, null, this.getTagsForStencil(gn, '', dt + 'admin connected').join(' ')),
		    this.createVertexTemplateEntry('sketch=0;html=1;aspect=fixed;strokeColor=none;shadow=0;align=center;fillColor=#3B8DF1;verticalAlign=top;labelPosition=center;verticalLabelPosition=bottom;shape=ellipse', 
		    		s * 100, s * 100, null, 'Images Service', null, null, this.getTagsForStencil(gn, '', dt + 'images service').join(' ')),
		    this.createVertexTemplateEntry(n + 'task_queues_2', 
		    		s * 100, s * 61, null, 'Task Queues', null, null, this.getTagsForStencil(gn, '', dt + 'task queues').join(' ')),
		    this.createVertexTemplateEntry(n + 'systems_check', 
		    		s * 99, s * 100, null, 'Systems Check', null, null, this.getTagsForStencil(gn, '', dt + 'systems check').join(' ')),
		    this.createVertexTemplateEntry(n + 'google_network', 
		    		s * 100, s * 100, null, 'Google Network', null, null, this.getTagsForStencil(gn, '', dt + 'google network').join(' ')),
		    this.createVertexTemplateEntry(n + 'check_2', 
		    		s * 100, s * 100, null, 'Check', null, null, this.getTagsForStencil(gn, '', dt + 'check').join(' ')),
		    this.createVertexTemplateEntry(n + 'people_security_management', 
		    		s * 100, s * 100, null, 'People Security Management', null, null, this.getTagsForStencil(gn, '', dt + 'people security management').join(' ')),
		    this.createVertexTemplateEntry(n + 'search_api', 
		    		s * 100, s * 100, null, 'Search API', null, null, this.getTagsForStencil(gn, '', dt + 'search api application programming interface').join(' ')),
		    this.createVertexTemplateEntry(n + 'management_security', 
		    		s * 100, s * 100, null, 'Management Security', null, null, this.getTagsForStencil(gn, '', dt + 'management security').join(' ')),
		    this.createVertexTemplateEntry(n + 'loading_3', 
		    		s * 100, s * 100, null, 'Loading', null, null, this.getTagsForStencil(gn, '', dt + 'loading').join(' ')),
		    this.createVertexTemplateEntry(n + 'stacked_ownership', 
		    		s * 100, s * 100, null, 'Stacked Ownership', null, null, this.getTagsForStencil(gn, '', dt + 'stacked ownership').join(' ')),
		    this.createVertexTemplateEntry(n + 'vpn', 
		    		s * 100, s * 50, null, 'VPN', null, null, this.getTagsForStencil(gn, '', dt + 'vpn virtual private network').join(' ')),
		    this.createVertexTemplateEntry(n + 'node', 
		    		s * 80, s * 100, null, 'Node', null, null, this.getTagsForStencil(gn, '', dt + 'node').join(' ')),
		    this.createVertexTemplateEntry(n + 'service', 
		    		s * 70, s * 100, null, 'Service', null, null, this.getTagsForStencil(gn, '', dt + 'service').join(' ')),
		    this.createVertexTemplateEntry('sketch=0;html=1;aspect=fixed;strokeColor=none;shadow=0;align=center;fillColor=#2D9C5E;verticalAlign=top;labelPosition=center;verticalLabelPosition=bottom;shape=mxgraph.gcp2.external_data_center', 
		    		s * 77, s * 100, null, 'External Data Center', null, null, this.getTagsForStencil(gn, '', dt + 'external data center').join(' ')),
		    this.createVertexTemplateEntry('sketch=0;html=1;aspect=fixed;strokeColor=none;shadow=0;align=center;fillColor=#2D9C5E;verticalAlign=top;labelPosition=center;verticalLabelPosition=bottom;shape=mxgraph.gcp2.external_data_resource', 
		    		s * 79, s * 100, null, 'External Data Resource', null, null, this.getTagsForStencil(gn, '', dt + 'external data resource').join(' ')),
		    this.createVertexTemplateEntry('sketch=0;html=1;aspect=fixed;strokeColor=none;shadow=0;align=center;fillColor=#2D9C5E;verticalAlign=top;labelPosition=center;verticalLabelPosition=bottom;shape=mxgraph.gcp2.legacy_cloud', 
		    		s * 100, s * 69, null, 'Legacy Cloud', null, null, this.getTagsForStencil(gn, '', dt + 'legacy cloud').join(' ')),
		    this.createVertexTemplateEntry('sketch=0;html=1;aspect=fixed;strokeColor=none;shadow=0;align=center;fillColor=#2D9C5E;verticalAlign=top;labelPosition=center;verticalLabelPosition=bottom;shape=mxgraph.gcp2.legacy_cloud_2', 
		    		s * 100, s * 69, null, 'Legacy Cloud', null, null, this.getTagsForStencil(gn, '', dt + 'legacy cloud').join(' ')),
		    this.createVertexTemplateEntry(n + 'mem_instances', 
		    		s * 100, s * 87, null, 'Mem Instances', null, null, this.getTagsForStencil(gn, '', dt + 'mem instances').join(' '))
	 	];
		
		this.addPalette('gcp2General Icons', 'GCP / General Icons', false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addGCP2ServiceCardsPalette = function()
	{
		var dt = 'gcp google cloud platform service cards ';
		var fns = [];
		
		this.addGCP2ServiceCard('Gateway', 'gateway', 100, 44, dt + 'gateway', fns);
		this.addGCP2ServiceCard('Memcache', 'memcache', 110, 44, dt + 'memcache', fns);
		this.addGCP2ServiceCard('Logs API', 'logs_api', 100, 44, dt + 'logs api application programming interface', fns);
		this.addGCP2ServiceCard('Cluster', 'cluster', 90, 44, dt + 'cluster', fns);//TODO fix parser or source
		this.addGCP2ServiceCard('NAT', 'nat', 80, 44, dt + 'nat network address translation', fns);
		this.addGCP2ServiceCard('Squid Proxy', 'squid_proxy', 120, 44, dt + 'squid proxy', fns);
		this.addGCP2ServiceCard('Bucket', 'bucket', 100, 44, dt + 'bucket', fns);
		this.addGCP2ServiceCard('Service Discovery', 'service_discovery', 150, 44, dt + 'service discovery', fns);
		this.addGCP2ServiceCard('Task\nQueues', 'task_queues', 90, 44, dt + 'task queues', fns);
		this.addGCP2ServiceCard('Image\nServices', 'image_services', 100, 44, dt + 'image services', fns);
		this.addGCP2ServiceCard('Dedicated\nGame Server', 'dedicated_game_server', 120, 44, dt + 'dedicated game server', fns);
		this.addGCP2ServiceCard('Frontend\nPlatform Services', 'frontend_platform_services', 150, 44, dt + 'frontend platform services', fns);
		this.addGCP2ServiceCard('Google\nEdge POP', 'google_network_edge_cache', 110, 56, dt + 'google edge pop point of presence', fns);
		this.addGCP2ServiceCard('External\nPayment Form', 'external_payment_form', 130, 44, dt + 'external payment form', fns);
		this.addGCP2ServiceCard('Internal Payment\nAuthorization', 'internal_payment_authorization', 150, 44, dt + 'internal payment authorization', fns);
		this.addGCP2ServiceCard('VPN Gateway', 'gateway', 130, 44, dt + 'vpn gateway virtual private network', fns);
		this.addGCP2ServiceCard('Application\nSystem(s)', 'application_system', 110, 44, dt + 'application system systems', fns);
		this.addGCP2ServiceCard('Virtual\nFile System', 'virtual_file_system', 110, 44, dt + 'virtual file system', fns);
		this.addGCP2ServiceCard('CDN\nInterconnect', 'google_network_edge_cache', 120, 44, dt + 'cdn content delivery network interconnect', fns);
		this.addGCP2ServiceCard('Scheduled\nTasks', 'scheduled_tasks', 110, 44, dt + 'scheduled tasks', fns);
		this.addGCP2ServiceCard('HTTPS\nLoad Balancer', 'network_load_balancer', 130, 44, dt + 'https secure load balancer', fns);
		this.addGCP2ServiceCard('Persistent\nDisk Snapshot', 'persistent_disk_snapshot', 130, 44, dt + 'persistent disk snapshot', fns);
		this.addGCP2ServiceCard('Persistent\nDisk', 'persistent_disk_snapshot', 110, 44, dt + 'persistent disk', fns);
		this.addGCP2ServiceCard('Network\nLoad\nBalancer', 'network_load_balancer', 100, 56, dt + 'network load balancer', fns);
		this.addGCP2ServiceCard('Google\n Network W/\nEdge Cache', 'google_network_edge_cache', 120, 56, dt + 'google network witch edge cache', fns);
		this.addGCP2ServiceCard('Push\nNotification\nService', 'push_notification_service', 110, 56, dt + 'push notification service', fns);
		this.addGCP2ServiceCard('Blank One Line', 'blank', 140, 44, dt + 'blank one line', fns);

		fns.push(
			this.addEntry(dt + 'blank one line', function()
		   	{
			    var bg = new mxCell('Blank One Line', new mxGeometry(0, 0, 100, 44), 'dashed=0;strokeColor=#dddddd;shadow=1;strokeWidth=1;labelPosition=center;verticalLabelPosition=middle;align=left;verticalAlign=middle;spacingLeft=5;fontSize=12;whiteSpace=wrap;html=1;');
		    	bg.vertex = true;
		    	
			   	return sb.createVertexTemplateFromCells([bg], 100, 44, 'Blank One Line');
			})
		);

		this.addGCP2ServiceCard('Blank Two\n\& Three Line', 'blank', 120, 44, dt + 'blank two and three line', fns);

		fns.push(
			this.addEntry(dt + 'blank two and three line', function()
		   	{
			    var bg = new mxCell('Blank Two\n\& Three Line', new mxGeometry(0, 0, 90, 44), 'dashed=0;strokeColor=#dddddd;shadow=1;strokeWidth=1;labelPosition=center;verticalLabelPosition=middle;align=left;verticalAlign=middle;spacingLeft=5;fontSize=12;whiteSpace=wrap;');
		    	bg.vertex = true;
		    	
			   	return sb.createVertexTemplateFromCells([bg], 100, 44, 'Blank Two and Three Line');
			})
		);

		this.addPalette('gcp2Service Cards', 'GCP / Service Cards', false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addGCP2ComputePalette = function()
	{
		var dt = 'gcp google cloud platform compute ';
		var fns = [];
		
		fns.push(
			this.addEntry(dt + 'compute engine', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 130, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Compute\nEngine', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNNyA3aDZ2Nkg3eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik05IDBoMnY0SDl6TTUgMGgydjRINXptOCAwaDJ2NGgtMnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNOSAxNmgydjRIOXptLTQgMGgydjRINXptOCAwaDJ2NGgtMnptMy01VjloNHYyem0wIDR2LTJoNHYyem0wLThWNWg0djJ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTAgMTFWOWg0djJ6bTAgNHYtMmg0djJ6bTAtOFY1aDR2MnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMyAzdjE0aDE0VjN6bTEyIDEySDVWNWgxMHoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTAgMTBsLTMgM2g2eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMyA3bC0zIDMgMyAzeiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Compute Engine');
			})
		);

		fns.push(
			this.addEntry(dt + 'compute engine', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 170, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Compute Engine', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNNyA3aDZ2Nkg3eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik05IDBoMnY0SDl6TTUgMGgydjRINXptOCAwaDJ2NGgtMnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNOSAxNmgydjRIOXptLTQgMGgydjRINXptOCAwaDJ2NGgtMnptMy01VjloNHYyem0wIDR2LTJoNHYyem0wLThWNWg0djJ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTAgMTFWOWg0djJ6bTAgNHYtMmg0djJ6bTAtOFY1aDR2MnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMyAzdjE0aDE0VjN6bTEyIDEySDVWNWgxMHoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTAgMTBsLTMgM2g2eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMyA3bC0zIDMgMyAzeiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Compute Engine');
			})
		);

		fns.push(
			this.addEntry(dt + 'compute engine', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 178, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Compute Engine', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNNyA3aDZ2Nkg3eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik05IDBoMnY0SDl6TTUgMGgydjRINXptOCAwaDJ2NGgtMnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNOSAxNmgydjRIOXptLTQgMGgydjRINXptOCAwaDJ2NGgtMnptMy01VjloNHYyem0wIDR2LTJoNHYyem0wLThWNWg0djJ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTAgMTFWOWg0djJ6bTAgNHYtMmg0djJ6bTAtOFY1aDR2MnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMyAzdjE0aDE0VjN6bTEyIDEySDVWNWgxMHoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTAgMTBsLTMgM2g2eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMyA3bC0zIDMgMyAzeiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Compute Engine');
			})
		);

		fns.push(
			this.addEntry(dt + 'gpu', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 100, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('GPU', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNNyA3aDZ2Nkg3eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik05IDBoMnY0SDl6TTUgMGgydjRINXptOCAwaDJ2NGgtMnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNOSAxNmgydjRIOXptLTQgMGgydjRINXptOCAwaDJ2NGgtMnptMy01VjloNHYyem0wIDR2LTJoNHYyem0wLThWNWg0djJ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTAgMTFWOWg0djJ6bTAgNHYtMmg0djJ6bTAtOFY1aDR2MnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMyAzdjE0aDE0VjN6bTEyIDEySDVWNWgxMHoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTAgMTBsLTMgM2g2eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMyA3bC0zIDMgMyAzeiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'GPU');
			})
		);

		fns.push(
			this.addEntry(dt + 'gpu', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 110, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>GPU', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNNyA3aDZ2Nkg3eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik05IDBoMnY0SDl6TTUgMGgydjRINXptOCAwaDJ2NGgtMnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNOSAxNmgydjRIOXptLTQgMGgydjRINXptOCAwaDJ2NGgtMnptMy01VjloNHYyem0wIDR2LTJoNHYyem0wLThWNWg0djJ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTAgMTFWOWg0djJ6bTAgNHYtMmg0djJ6bTAtOFY1aDR2MnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMyAzdjE0aDE0VjN6bTEyIDEySDVWNWgxMHoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTAgMTBsLTMgM2g2eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMyA3bC0zIDMgMyAzeiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'GPU');
			})
		);

		fns.push(
			this.addEntry(dt + 'gpu', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 118, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>GPU', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNNyA3aDZ2Nkg3eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik05IDBoMnY0SDl6TTUgMGgydjRINXptOCAwaDJ2NGgtMnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNOSAxNmgydjRIOXptLTQgMGgydjRINXptOCAwaDJ2NGgtMnptMy01VjloNHYyem0wIDR2LTJoNHYyem0wLThWNWg0djJ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTAgMTFWOWg0djJ6bTAgNHYtMmg0djJ6bTAtOFY1aDR2MnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMyAzdjE0aDE0VjN6bTEyIDEySDVWNWgxMHoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTAgMTBsLTMgM2g2eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMyA3bC0zIDMgMyAzeiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'GPU');
			})
		);

		fns.push(
			this.addEntry(dt + 'app engine', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 120, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('App\nEngine', 
			    		new mxGeometry(0, 0, 30, 24), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE2LjAyMDAwMDQ1Nzc2MzY3MiIgZmlsbC1ydWxlPSJldmVub2RkIiB2aWV3Qm94PSI4Ljk0MDY5NjcxNjMwODU5NGUtOCAwIDIwIDE2LjAyMDAwMDQ1Nzc2MzY3MiI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJLnN0MXtmaWxsOiNhZWNiZmE7fSYjeGE7CS5zdDJ7ZmlsbDojNjY5ZGY2O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMi4zIDcuMjZsLTEuMjIgMS4yMkExLjcxIDEuNzEgMCAwIDEgMTAgMTEuNDlhMS43NCAxLjc0IDAgMCAxLTEuMzMtLjY0bC0xLjIyIDEuMjJhMy40MyAzLjQzIDAgMCAwIDUuOTg0LTEuMzgxQTMuNDMgMy40MyAwIDAgMCAxMi4zIDcuMjZ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTEwIDMuNTJhNi4yNSA2LjI1IDAgMCAwIDAgMTIuNSA2LjI1IDYuMjUgMCAwIDAgMC0xMi41bTAgMTAuNzRhNC40NSA0LjQ1IDAgMCAxLTMuMTU3LTcuNTk3QTQuNDUgNC40NSAwIDAgMSAxNC40NCA5LjgyIDQuNDQgNC40NCAwIDAgMSAxMCAxNC4yNiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xOS42MiA5LjE2bC0yLjU2LS44MWE3LjEgNy4xIDAgMCAxIC4xNyAxLjUzIDcuNjIgNy42MiAwIDAgMS0uMDggMS4wOGgyLjQ3YS40NC40NCAwIDAgMCAuMzgtLjQydi0xYS40NC40NCAwIDAgMC0uMzgtLjQyTTEwIDIuNzhhNy40OCA3LjQ4IDAgMCAxIDEuNS4xNUwxMC41OC4zOGMtLjA3LS4yMi0uMjEtLjM4LS40Mi0uMzhoLS4zOGEuNDUuNDUgMCAwIDAtLjQyLjM4bC0uOCAyLjU0QTcuNjQgNy42NCAwIDAgMSAxMCAyLjc4bS03LjIzIDcuMWE3LjEgNy4xIDAgMCAxIC4xNy0xLjUzbC0yLjU2LjgxYS40NC40NCAwIDAgMC0uMzguNDJ2MWEuNDQuNDQgMCAwIDAgLjM4LjQyaDIuNDdhNy42MiA3LjYyIDAgMCAxLS4wOC0xLjA4Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTEwIDcuMjZhMi41IDIuNSAwIDEgMCAwIDUgMi41IDIuNSAwIDEgMCAwLTV6bTAgMy43NWExLjI1IDEuMjUgMCAxIDEgMC0yLjUgMS4yNSAxLjI1IDAgMCAxIDEuMjUgMS4yNUExLjI1IDEuMjUgMCAwIDEgMTAgMTEuMDJ6Ii8+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 18);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'App Engine');
			})
		);

		fns.push(
			this.addEntry(dt + 'app engine', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 140, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>App Engine', 
			    		new mxGeometry(0, 0, 30, 24), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE2LjAyMDAwMDQ1Nzc2MzY3MiIgZmlsbC1ydWxlPSJldmVub2RkIiB2aWV3Qm94PSI4Ljk0MDY5NjcxNjMwODU5NGUtOCAwIDIwIDE2LjAyMDAwMDQ1Nzc2MzY3MiI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJLnN0MXtmaWxsOiNhZWNiZmE7fSYjeGE7CS5zdDJ7ZmlsbDojNjY5ZGY2O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMi4zIDcuMjZsLTEuMjIgMS4yMkExLjcxIDEuNzEgMCAwIDEgMTAgMTEuNDlhMS43NCAxLjc0IDAgMCAxLTEuMzMtLjY0bC0xLjIyIDEuMjJhMy40MyAzLjQzIDAgMCAwIDUuOTg0LTEuMzgxQTMuNDMgMy40MyAwIDAgMCAxMi4zIDcuMjZ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTEwIDMuNTJhNi4yNSA2LjI1IDAgMCAwIDAgMTIuNSA2LjI1IDYuMjUgMCAwIDAgMC0xMi41bTAgMTAuNzRhNC40NSA0LjQ1IDAgMCAxLTMuMTU3LTcuNTk3QTQuNDUgNC40NSAwIDAgMSAxNC40NCA5LjgyIDQuNDQgNC40NCAwIDAgMSAxMCAxNC4yNiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xOS42MiA5LjE2bC0yLjU2LS44MWE3LjEgNy4xIDAgMCAxIC4xNyAxLjUzIDcuNjIgNy42MiAwIDAgMS0uMDggMS4wOGgyLjQ3YS40NC40NCAwIDAgMCAuMzgtLjQydi0xYS40NC40NCAwIDAgMC0uMzgtLjQyTTEwIDIuNzhhNy40OCA3LjQ4IDAgMCAxIDEuNS4xNUwxMC41OC4zOGMtLjA3LS4yMi0uMjEtLjM4LS40Mi0uMzhoLS4zOGEuNDUuNDUgMCAwIDAtLjQyLjM4bC0uOCAyLjU0QTcuNjQgNy42NCAwIDAgMSAxMCAyLjc4bS03LjIzIDcuMWE3LjEgNy4xIDAgMCAxIC4xNy0xLjUzbC0yLjU2LjgxYS40NC40NCAwIDAgMC0uMzguNDJ2MWEuNDQuNDQgMCAwIDAgLjM4LjQyaDIuNDdhNy42MiA3LjYyIDAgMCAxLS4wOC0xLjA4Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTEwIDcuMjZhMi41IDIuNSAwIDEgMCAwIDUgMi41IDIuNSAwIDEgMCAwLTV6bTAgMy43NWExLjI1IDEuMjUgMCAxIDEgMC0yLjUgMS4yNSAxLjI1IDAgMCAxIDEuMjUgMS4yNUExLjI1IDEuMjUgMCAwIDEgMTAgMTEuMDJ6Ii8+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 18);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'App Engine');
			})
		);

		fns.push(
			this.addEntry(dt + 'app engine', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 148, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>App Engine', 
			    		new mxGeometry(0, 0, 30, 24), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE2LjAyMDAwMDQ1Nzc2MzY3MiIgZmlsbC1ydWxlPSJldmVub2RkIiB2aWV3Qm94PSI4Ljk0MDY5NjcxNjMwODU5NGUtOCAwIDIwIDE2LjAyMDAwMDQ1Nzc2MzY3MiI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJLnN0MXtmaWxsOiNhZWNiZmE7fSYjeGE7CS5zdDJ7ZmlsbDojNjY5ZGY2O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMi4zIDcuMjZsLTEuMjIgMS4yMkExLjcxIDEuNzEgMCAwIDEgMTAgMTEuNDlhMS43NCAxLjc0IDAgMCAxLTEuMzMtLjY0bC0xLjIyIDEuMjJhMy40MyAzLjQzIDAgMCAwIDUuOTg0LTEuMzgxQTMuNDMgMy40MyAwIDAgMCAxMi4zIDcuMjZ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTEwIDMuNTJhNi4yNSA2LjI1IDAgMCAwIDAgMTIuNSA2LjI1IDYuMjUgMCAwIDAgMC0xMi41bTAgMTAuNzRhNC40NSA0LjQ1IDAgMCAxLTMuMTU3LTcuNTk3QTQuNDUgNC40NSAwIDAgMSAxNC40NCA5LjgyIDQuNDQgNC40NCAwIDAgMSAxMCAxNC4yNiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xOS42MiA5LjE2bC0yLjU2LS44MWE3LjEgNy4xIDAgMCAxIC4xNyAxLjUzIDcuNjIgNy42MiAwIDAgMS0uMDggMS4wOGgyLjQ3YS40NC40NCAwIDAgMCAuMzgtLjQydi0xYS40NC40NCAwIDAgMC0uMzgtLjQyTTEwIDIuNzhhNy40OCA3LjQ4IDAgMCAxIDEuNS4xNUwxMC41OC4zOGMtLjA3LS4yMi0uMjEtLjM4LS40Mi0uMzhoLS4zOGEuNDUuNDUgMCAwIDAtLjQyLjM4bC0uOCAyLjU0QTcuNjQgNy42NCAwIDAgMSAxMCAyLjc4bS03LjIzIDcuMWE3LjEgNy4xIDAgMCAxIC4xNy0xLjUzbC0yLjU2LjgxYS40NC40NCAwIDAgMC0uMzguNDJ2MWEuNDQuNDQgMCAwIDAgLjM4LjQyaDIuNDdhNy42MiA3LjYyIDAgMCAxLS4wOC0xLjA4Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTEwIDcuMjZhMi41IDIuNSAwIDEgMCAwIDUgMi41IDIuNSAwIDEgMCAwLTV6bTAgMy43NWExLjI1IDEuMjUgMCAxIDEgMC0yLjUgMS4yNSAxLjI1IDAgMCAxIDEuMjUgMS4yNUExLjI1IDEuMjUgMCAwIDEgMTAgMTEuMDJ6Ii8+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 18);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'App Engine');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud functions', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 130, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Cloud\nFunctions', 
			    		new mxGeometry(0, 0, 30, 24), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE5Ljk4OTk5OTc3MTExODE2NCIgdmlld0JveD0iMCAwIDIwIDE5Ljk4OTk5OTc3MTExODE2NCI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJLnN0MXtmaWxsOiM2NjlkZjY7fSYjeGE7CS5zdDJ7ZmlsbDojYWVjYmZhO30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0zIDMuOTlMMCA2LjQydjcuMTNsMyAyLjQ0eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0zIDMuOTlsLTMgNCAzLTJ6bS0zIDhsMyA0di0yeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0wIDE1Ljk5bDQgNCAyLTItNi02em0uMDEtOEw1Ljk5IDJsLTItMkwwIDMuOTl6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTE3IDE2bDMtMi40MlY2LjQ0TDE3IDR6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTE3IDE2bDMtNC0zIDJ6bTMtOGwtMy00djJ6Ii8+JiN4YTsJPGcgY2xhc3M9InN0MiI+JiN4YTsJCTxwYXRoIGQ9Ik0yMCA0bC00LTQtMiAyIDYgNnptLS4wMSA4bC01Ljk4IDUuOTkgMiAyTDIwIDE2eiIvPiYjeGE7CQk8Y2lyY2xlIGN4PSI2IiBjeT0iOS45OSIgcj0iMSIvPiYjeGE7CQk8Y2lyY2xlIGN4PSIxMCIgY3k9IjkuOTkiIHI9IjEiLz4mI3hhOwkJPGNpcmNsZSBjeD0iMTMuOTkiIGN5PSI5Ljk5IiByPSIxIi8+JiN4YTsJPC9nPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 18);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Functions');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud functions', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 160, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Functions', 
			    		new mxGeometry(0, 0, 30, 24), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE5Ljk4OTk5OTc3MTExODE2NCIgdmlld0JveD0iMCAwIDIwIDE5Ljk4OTk5OTc3MTExODE2NCI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJLnN0MXtmaWxsOiM2NjlkZjY7fSYjeGE7CS5zdDJ7ZmlsbDojYWVjYmZhO30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0zIDMuOTlMMCA2LjQydjcuMTNsMyAyLjQ0eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0zIDMuOTlsLTMgNCAzLTJ6bS0zIDhsMyA0di0yeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0wIDE1Ljk5bDQgNCAyLTItNi02em0uMDEtOEw1Ljk5IDJsLTItMkwwIDMuOTl6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTE3IDE2bDMtMi40MlY2LjQ0TDE3IDR6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTE3IDE2bDMtNC0zIDJ6bTMtOGwtMy00djJ6Ii8+JiN4YTsJPGcgY2xhc3M9InN0MiI+JiN4YTsJCTxwYXRoIGQ9Ik0yMCA0bC00LTQtMiAyIDYgNnptLS4wMSA4bC01Ljk4IDUuOTkgMiAyTDIwIDE2eiIvPiYjeGE7CQk8Y2lyY2xlIGN4PSI2IiBjeT0iOS45OSIgcj0iMSIvPiYjeGE7CQk8Y2lyY2xlIGN4PSIxMCIgY3k9IjkuOTkiIHI9IjEiLz4mI3hhOwkJPGNpcmNsZSBjeD0iMTMuOTkiIGN5PSI5Ljk5IiByPSIxIi8+JiN4YTsJPC9nPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 18);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Functions');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud functions', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 168, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Functions', 
			    		new mxGeometry(0, 0, 30, 24), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE5Ljk4OTk5OTc3MTExODE2NCIgdmlld0JveD0iMCAwIDIwIDE5Ljk4OTk5OTc3MTExODE2NCI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJLnN0MXtmaWxsOiM2NjlkZjY7fSYjeGE7CS5zdDJ7ZmlsbDojYWVjYmZhO30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0zIDMuOTlMMCA2LjQydjcuMTNsMyAyLjQ0eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0zIDMuOTlsLTMgNCAzLTJ6bS0zIDhsMyA0di0yeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0wIDE1Ljk5bDQgNCAyLTItNi02em0uMDEtOEw1Ljk5IDJsLTItMkwwIDMuOTl6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTE3IDE2bDMtMi40MlY2LjQ0TDE3IDR6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTE3IDE2bDMtNC0zIDJ6bTMtOGwtMy00djJ6Ii8+JiN4YTsJPGcgY2xhc3M9InN0MiI+JiN4YTsJCTxwYXRoIGQ9Ik0yMCA0bC00LTQtMiAyIDYgNnptLS4wMSA4bC01Ljk4IDUuOTkgMiAyTDIwIDE2eiIvPiYjeGE7CQk8Y2lyY2xlIGN4PSI2IiBjeT0iOS45OSIgcj0iMSIvPiYjeGE7CQk8Y2lyY2xlIGN4PSIxMCIgY3k9IjkuOTkiIHI9IjEiLz4mI3hhOwkJPGNpcmNsZSBjeD0iMTMuOTkiIGN5PSI5Ljk5IiByPSIxIi8+JiN4YTsJPC9nPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 18);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Functions');
			})
		);

		fns.push(
			this.addEntry(dt + 'kubernetes engine', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 140, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Kubernetes\nEngine', 
			    		new mxGeometry(0, 0, 26, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjMyOS45MjU5OTcyMzE3OTM4IiBoZWlnaHQ9IjM3OC4yODQ5OTAzMTEyNzg4IiB2aWV3Qm94PSIwIDAgODcuMjkyOTk5MjY3NTc4MTIgMTAwLjA4Nzk5NzQzNjUyMzQ0Ij4mI3hhOzxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiNhZWNiZmE7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6IzQyODVmNDt9JiN4YTs8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00My43NTEgMEwwIDI1LjQ2NXYyLjU4OCA0Ni45Mmw0My43NTIgMjUuMTE1IDQzLjU0MS0yNS4xMjFWMjUuNDczem0yLjQzOCAxMS44NTNsMzIuMTAzIDE4Ljc4MlY2OS43N0w0My43MzkgODkuNzA1IDkgNjkuNzYyVjMwLjY0MWwzMi4xOS0xOC43MzZ2MTQuMTU0TDI0LjUwMyAzNi4xNTNsMTkuMTcyIDExLjUwMiAxOC44ODYtMTEuNTU0LTE2LjM3Mi0xMC4wMjR6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTIyLjAyNSA0MC40OTZsLjE2NiAxOS4xNDMtMTMuMjQ3IDcuMzN2Mi43NDJsMi42MzcgMS41MTQgMTIuNjQ4LTYuOTk5IDE2Ljk2MSAxMC42MDJWNTEuOTkzeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik02NS4zNDQgNDAuMjZMNDYuMTg5IDUxLjk3OXYyMi44NDdsMTYuODk5LTEwLjU3NiAxMi41MzkgNi45NzQgMi42MDktMS41MDV2LTIuNzY1bC0xMi43ODQtNy4xMTJ6Ii8+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(17, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Kubernetes Engine');
			})
		);

		fns.push(
			this.addEntry(dt + 'kubernetes engine', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 180, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Kubernetes Engine', 
			    		new mxGeometry(0, 0, 26, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjMyOS45MjU5OTcyMzE3OTM4IiBoZWlnaHQ9IjM3OC4yODQ5OTAzMTEyNzg4IiB2aWV3Qm94PSIwIDAgODcuMjkyOTk5MjY3NTc4MTIgMTAwLjA4Nzk5NzQzNjUyMzQ0Ij4mI3hhOzxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiNhZWNiZmE7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6IzQyODVmNDt9JiN4YTs8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00My43NTEgMEwwIDI1LjQ2NXYyLjU4OCA0Ni45Mmw0My43NTIgMjUuMTE1IDQzLjU0MS0yNS4xMjFWMjUuNDczem0yLjQzOCAxMS44NTNsMzIuMTAzIDE4Ljc4MlY2OS43N0w0My43MzkgODkuNzA1IDkgNjkuNzYyVjMwLjY0MWwzMi4xOS0xOC43MzZ2MTQuMTU0TDI0LjUwMyAzNi4xNTNsMTkuMTcyIDExLjUwMiAxOC44ODYtMTEuNTU0LTE2LjM3Mi0xMC4wMjR6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTIyLjAyNSA0MC40OTZsLjE2NiAxOS4xNDMtMTMuMjQ3IDcuMzN2Mi43NDJsMi42MzcgMS41MTQgMTIuNjQ4LTYuOTk5IDE2Ljk2MSAxMC42MDJWNTEuOTkzeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik02NS4zNDQgNDAuMjZMNDYuMTg5IDUxLjk3OXYyMi44NDdsMTYuODk5LTEwLjU3NiAxMi41MzkgNi45NzQgMi42MDktMS41MDV2LTIuNzY1bC0xMi43ODQtNy4xMTJ6Ii8+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(17, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Kubernetes Engine');
			})
		);

		fns.push(
			this.addEntry(dt + 'kubernetes engine', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 188, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Kubernetes Engine', 
			    		new mxGeometry(0, 0, 26, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjMyOS45MjU5OTcyMzE3OTM4IiBoZWlnaHQ9IjM3OC4yODQ5OTAzMTEyNzg4IiB2aWV3Qm94PSIwIDAgODcuMjkyOTk5MjY3NTc4MTIgMTAwLjA4Nzk5NzQzNjUyMzQ0Ij4mI3hhOzxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiNhZWNiZmE7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6IzQyODVmNDt9JiN4YTs8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00My43NTEgMEwwIDI1LjQ2NXYyLjU4OCA0Ni45Mmw0My43NTIgMjUuMTE1IDQzLjU0MS0yNS4xMjFWMjUuNDczem0yLjQzOCAxMS44NTNsMzIuMTAzIDE4Ljc4MlY2OS43N0w0My43MzkgODkuNzA1IDkgNjkuNzYyVjMwLjY0MWwzMi4xOS0xOC43MzZ2MTQuMTU0TDI0LjUwMyAzNi4xNTNsMTkuMTcyIDExLjUwMiAxOC44ODYtMTEuNTU0LTE2LjM3Mi0xMC4wMjR6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTIyLjAyNSA0MC40OTZsLjE2NiAxOS4xNDMtMTMuMjQ3IDcuMzN2Mi43NDJsMi42MzcgMS41MTQgMTIuNjQ4LTYuOTk5IDE2Ljk2MSAxMC42MDJWNTEuOTkzeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik02NS4zNDQgNDAuMjZMNDYuMTg5IDUxLjk3OXYyMi44NDdsMTYuODk5LTEwLjU3NiAxMi41MzkgNi45NzQgMi42MDktMS41MDV2LTIuNzY1bC0xMi43ODQtNy4xMTJ6Ii8+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(17, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Kubernetes Engine');
			})
		);

		fns.push(
			this.addEntry(dt + 'container optimized os operating sysyem', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 150, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Container-\nOptimized OS', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTEwIDBhMTAgMTAgMCAxIDAgMTAgMTBoMEExMCAxMCAwIDAgMCAxMCAwem0wIDE4YTggOCAwIDAgMS00LjE4LTEuMThsMy41OC0yLjA3aDB2LTQuNUw1LjUxIDh2NC41MmwyLjc1IDEuNTktMy40NiAyQTggOCAwIDAgMSA2LjA4IDN2NGgwTDEwIDkuMjggMTMuOSA3IDEwIDQuNzcgNy4yNCA2LjM2VjIuNDdhOCA4IDAgMCAxIDEwLjMxIDQuNyA4LjEgOC4xIDAgMCAxIC41MSAyLjgzdi4wN0wxNC40NiA4aDBsLTMuOSAyLjI2djQuNTFsMy45LTIuMjVWOS4zNGwzLjQ1IDJBOCA4IDAgMCAxIDEwIDE4eiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Container-Optimized OS');
			})
		);

		fns.push(
			this.addEntry(dt + 'container optimized os operating system', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 150, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Container-\nOptimized OS', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTEwIDBhMTAgMTAgMCAxIDAgMTAgMTBoMEExMCAxMCAwIDAgMCAxMCAwem0wIDE4YTggOCAwIDAgMS00LjE4LTEuMThsMy41OC0yLjA3aDB2LTQuNUw1LjUxIDh2NC41MmwyLjc1IDEuNTktMy40NiAyQTggOCAwIDAgMSA2LjA4IDN2NGgwTDEwIDkuMjggMTMuOSA3IDEwIDQuNzcgNy4yNCA2LjM2VjIuNDdhOCA4IDAgMCAxIDEwLjMxIDQuNyA4LjEgOC4xIDAgMCAxIC41MSAyLjgzdi4wN0wxNC40NiA4aDBsLTMuOSAyLjI2djQuNTFsMy45LTIuMjVWOS4zNGwzLjQ1IDJBOCA4IDAgMCAxIDEwIDE4eiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Container-Optimized OS');
			})
		);

		fns.push(
			this.addEntry(dt + 'container optimized os operating system', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 218, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Container-Optimized OS', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTEwIDBhMTAgMTAgMCAxIDAgMTAgMTBoMEExMCAxMCAwIDAgMCAxMCAwem0wIDE4YTggOCAwIDAgMS00LjE4LTEuMThsMy41OC0yLjA3aDB2LTQuNUw1LjUxIDh2NC41MmwyLjc1IDEuNTktMy40NiAyQTggOCAwIDAgMSA2LjA4IDN2NGgwTDEwIDkuMjggMTMuOSA3IDEwIDQuNzcgNy4yNCA2LjM2VjIuNDdhOCA4IDAgMCAxIDEwLjMxIDQuNyA4LjEgOC4xIDAgMCAxIC41MSAyLjgzdi4wN0wxNC40NiA4aDBsLTMuOSAyLjI2djQuNTFsMy45LTIuMjVWOS4zNGwzLjQ1IDJBOCA4IDAgMCAxIDEwIDE4eiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Container-Optimized OS');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud run', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 130, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Cloud Run', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjM2NS40NjQ5OTY3NzA0MjQ5MyIgaGVpZ2h0PSIzNzkuMjIyOTk0NDYzNTc3OTUiIHZpZXdCb3g9IjAgMCA5Ni42OTU5OTkxNDU1MDc4MSAxMDAuMzM1OTk4NTM1MTU2MjUiPiYjeGE7PHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJLnN0MXtmaWxsOiNhZWNiZmE7fSYjeGE7PC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMjkuNzk0IDEwMC4zMzZMNDYuOTIgNTAuMTY4aDQ5Ljc3NnpNMCA5OS42NzFsMTIuOTc2LTQ5LjUwMkgyOS4yMkwxNi44OTcgOTIuMDU0eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0yOS43OTQgMEw0Ni45MiA1MC4xNjhoNDkuNzc2ek0wIC42NjZsMTIuOTc2IDQ5LjUwMkgyOS4yMkwxNi44OTcgOC4yODN6Ii8+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Run');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud run', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 130, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Run', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjM2NS40NjQ5OTY3NzA0MjQ5MyIgaGVpZ2h0PSIzNzkuMjIyOTk0NDYzNTc3OTUiIHZpZXdCb3g9IjAgMCA5Ni42OTU5OTkxNDU1MDc4MSAxMDAuMzM1OTk4NTM1MTU2MjUiPiYjeGE7PHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJLnN0MXtmaWxsOiNhZWNiZmE7fSYjeGE7PC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMjkuNzk0IDEwMC4zMzZMNDYuOTIgNTAuMTY4aDQ5Ljc3NnpNMCA5OS42NzFsMTIuOTc2LTQ5LjUwMkgyOS4yMkwxNi44OTcgOTIuMDU0eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0yOS43OTQgMEw0Ni45MiA1MC4xNjhoNDkuNzc2ek0wIC42NjZsMTIuOTc2IDQ5LjUwMkgyOS4yMkwxNi44OTcgOC4yODN6Ii8+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Run');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud run', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 138, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Run', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjM2NS40NjQ5OTY3NzA0MjQ5MyIgaGVpZ2h0PSIzNzkuMjIyOTk0NDYzNTc3OTUiIHZpZXdCb3g9IjAgMCA5Ni42OTU5OTkxNDU1MDc4MSAxMDAuMzM1OTk4NTM1MTU2MjUiPiYjeGE7PHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJLnN0MXtmaWxsOiNhZWNiZmE7fSYjeGE7PC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMjkuNzk0IDEwMC4zMzZMNDYuOTIgNTAuMTY4aDQ5Ljc3NnpNMCA5OS42NzFsMTIuOTc2LTQ5LjUwMkgyOS4yMkwxNi44OTcgOTIuMDU0eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0yOS43OTQgMEw0Ni45MiA1MC4xNjhoNDkuNzc2ek0wIC42NjZsMTIuOTc2IDQ5LjUwMkgyOS4yMkwxNi44OTcgOC4yODN6Ii8+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Run');
			})
		);

		fns.push(
			this.addEntry(dt + 'gke on prem', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 150, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('GKE on-Prem', 
			    		new mxGeometry(0, 0, 29, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjQwMi4zNDMyMDA2ODM1OTM3NSIgaGVpZ2h0PSI0MTYuMDAyNTMyOTU4OTg0NCIgdmlld0JveD0iMCAwLjAwMDQ5OTk2Mzc2MDM3NTk3NjYgNDAyLjM0MzIwMDY4MzU5Mzc1IDQxNi4wMDI1MzI5NTg5ODQ0Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qxe2ZpbGw6IzY2OWRmNjt9JiN4YTsJLnN0MntmaWxsOiNhZWNiZmE7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTM2Ni4xNyA5Mi4wMDNjLTE5LjA1IDAtMzYgMTYuODItMzYgMzUuNzYgMCAxMi42MiA4LjQ2IDI1LjI0IDE5LjA1IDMxLjU1djE0Ny4zbC0xMTAuMDUgNjUuMjEgMTYuOTMgMjcuMzUgMTE4LjUxLTY5LjQyYzQuMjQtMi4xIDguNDctOC40MSA4LjQ3LTE0Ljczdi0xNTUuNjdjMTIuNzEtNi4zNSAxOS4wOS0xOC45MyAxOS4wOS0zMS41NSAyLjA4LTE4Ljk0LTE0Ljg1LTM1LjgtMzYtMzUuOHptLTM4LjExLTIzLjFMMjA5LjU1IDEuNTgzYy00LjI0LTIuMTEtMTAuNTktMi4xMS0xNi45MyAwTDU3LjE3IDc5LjQxM0EzNiAzNiAwIDAgMCAzNiA3My4xMDNjLTE5IDAtMzYgMTYuODMtMzYgMzUuNzZzMTYuOTMgMzUuNzcgMzYgMzUuNzcgMzYtMTYuODMgMzYtMzUuNzdsMTI5LjEtNzMuNjIgMTEwIDYzLjExem0tMTQzLjg5IDI3Ny42OHEtOS41MyAwLTE5IDYuMzFsLTExMC02My4xMXYtMTI2LjIyaC0zNHYxMzQuNjNjMCA2LjMyIDQuMjMgMTIuNjMgOC40NiAxNC43M2wxMTguNTQgNjUuMjF2Mi4xMWMwIDE4LjkzIDE2LjkzIDM1Ljc2IDM2IDM1Ljc2czM2LTE2LjgzIDM2LTM1Ljc2LTE3LTMzLjY2LTM2LTMzLjY2eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik05Ny4zOCAxMzYuMjEzbDEwNS44MiA1OC45MSAxMDMuNy01OC45MS0xMDMuNy02MXptLTYuMzUgNjcuMzJsMTEyLjE3IDYzLjExdi01MC40OWwtMTEyLjE3LTY1LjIxem0wIDYzLjExbDExMi4xNyA2NS4yMXYtNDQuMTdsLTExMi4xNy02NS4yMnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMjAzLjE3IDIxNi4xMjN2NTAuNTZsMTEyLjE2LTY1LjI5di01MC4zOXptOTItMjBhOC4xNiA4LjE2IDAgMSAxIDguMTYtOC4xNiA4LjE5IDguMTkgMCAwIDEtOC4xNiA4LjE2em0tOTIgOTEuNTJ2NDQuMTZsMTEyLjE2LTY1LjEydi00NC4xNnptOTItMjIuODhhOC4xNiA4LjE2IDAgMSAxIDguMTYtOC4xNiA4LjE5IDguMTkgMCAwIDEtOC4xNiA4LjE2eiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'GKE on-Prem');
			})
		);

		fns.push(
			this.addEntry(dt + 'gke on prem', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 150, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>GKE on-Prem', 
			    		new mxGeometry(0, 0, 29, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjQwMi4zNDMyMDA2ODM1OTM3NSIgaGVpZ2h0PSI0MTYuMDAyNTMyOTU4OTg0NCIgdmlld0JveD0iMCAwLjAwMDQ5OTk2Mzc2MDM3NTk3NjYgNDAyLjM0MzIwMDY4MzU5Mzc1IDQxNi4wMDI1MzI5NTg5ODQ0Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qxe2ZpbGw6IzY2OWRmNjt9JiN4YTsJLnN0MntmaWxsOiNhZWNiZmE7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTM2Ni4xNyA5Mi4wMDNjLTE5LjA1IDAtMzYgMTYuODItMzYgMzUuNzYgMCAxMi42MiA4LjQ2IDI1LjI0IDE5LjA1IDMxLjU1djE0Ny4zbC0xMTAuMDUgNjUuMjEgMTYuOTMgMjcuMzUgMTE4LjUxLTY5LjQyYzQuMjQtMi4xIDguNDctOC40MSA4LjQ3LTE0Ljczdi0xNTUuNjdjMTIuNzEtNi4zNSAxOS4wOS0xOC45MyAxOS4wOS0zMS41NSAyLjA4LTE4Ljk0LTE0Ljg1LTM1LjgtMzYtMzUuOHptLTM4LjExLTIzLjFMMjA5LjU1IDEuNTgzYy00LjI0LTIuMTEtMTAuNTktMi4xMS0xNi45MyAwTDU3LjE3IDc5LjQxM0EzNiAzNiAwIDAgMCAzNiA3My4xMDNjLTE5IDAtMzYgMTYuODMtMzYgMzUuNzZzMTYuOTMgMzUuNzcgMzYgMzUuNzcgMzYtMTYuODMgMzYtMzUuNzdsMTI5LjEtNzMuNjIgMTEwIDYzLjExem0tMTQzLjg5IDI3Ny42OHEtOS41MyAwLTE5IDYuMzFsLTExMC02My4xMXYtMTI2LjIyaC0zNHYxMzQuNjNjMCA2LjMyIDQuMjMgMTIuNjMgOC40NiAxNC43M2wxMTguNTQgNjUuMjF2Mi4xMWMwIDE4LjkzIDE2LjkzIDM1Ljc2IDM2IDM1Ljc2czM2LTE2LjgzIDM2LTM1Ljc2LTE3LTMzLjY2LTM2LTMzLjY2eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik05Ny4zOCAxMzYuMjEzbDEwNS44MiA1OC45MSAxMDMuNy01OC45MS0xMDMuNy02MXptLTYuMzUgNjcuMzJsMTEyLjE3IDYzLjExdi01MC40OWwtMTEyLjE3LTY1LjIxem0wIDYzLjExbDExMi4xNyA2NS4yMXYtNDQuMTdsLTExMi4xNy02NS4yMnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMjAzLjE3IDIxNi4xMjN2NTAuNTZsMTEyLjE2LTY1LjI5di01MC4zOXptOTItMjBhOC4xNiA4LjE2IDAgMSAxIDguMTYtOC4xNiA4LjE5IDguMTkgMCAwIDEtOC4xNiA4LjE2em0tOTIgOTEuNTJ2NDQuMTZsMTEyLjE2LTY1LjEydi00NC4xNnptOTItMjIuODhhOC4xNiA4LjE2IDAgMSAxIDguMTYtOC4xNiA4LjE5IDguMTkgMCAwIDEtOC4xNiA4LjE2eiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'GKE on-Prem');
			})
		);

		fns.push(
			this.addEntry(dt + 'gke on prem', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 158, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>GKE On-Prem', 
			    		new mxGeometry(0, 0, 29, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjQwMi4zNDMyMDA2ODM1OTM3NSIgaGVpZ2h0PSI0MTYuMDAyNTMyOTU4OTg0NCIgdmlld0JveD0iMCAwLjAwMDQ5OTk2Mzc2MDM3NTk3NjYgNDAyLjM0MzIwMDY4MzU5Mzc1IDQxNi4wMDI1MzI5NTg5ODQ0Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qxe2ZpbGw6IzY2OWRmNjt9JiN4YTsJLnN0MntmaWxsOiNhZWNiZmE7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTM2Ni4xNyA5Mi4wMDNjLTE5LjA1IDAtMzYgMTYuODItMzYgMzUuNzYgMCAxMi42MiA4LjQ2IDI1LjI0IDE5LjA1IDMxLjU1djE0Ny4zbC0xMTAuMDUgNjUuMjEgMTYuOTMgMjcuMzUgMTE4LjUxLTY5LjQyYzQuMjQtMi4xIDguNDctOC40MSA4LjQ3LTE0Ljczdi0xNTUuNjdjMTIuNzEtNi4zNSAxOS4wOS0xOC45MyAxOS4wOS0zMS41NSAyLjA4LTE4Ljk0LTE0Ljg1LTM1LjgtMzYtMzUuOHptLTM4LjExLTIzLjFMMjA5LjU1IDEuNTgzYy00LjI0LTIuMTEtMTAuNTktMi4xMS0xNi45MyAwTDU3LjE3IDc5LjQxM0EzNiAzNiAwIDAgMCAzNiA3My4xMDNjLTE5IDAtMzYgMTYuODMtMzYgMzUuNzZzMTYuOTMgMzUuNzcgMzYgMzUuNzcgMzYtMTYuODMgMzYtMzUuNzdsMTI5LjEtNzMuNjIgMTEwIDYzLjExem0tMTQzLjg5IDI3Ny42OHEtOS41MyAwLTE5IDYuMzFsLTExMC02My4xMXYtMTI2LjIyaC0zNHYxMzQuNjNjMCA2LjMyIDQuMjMgMTIuNjMgOC40NiAxNC43M2wxMTguNTQgNjUuMjF2Mi4xMWMwIDE4LjkzIDE2LjkzIDM1Ljc2IDM2IDM1Ljc2czM2LTE2LjgzIDM2LTM1Ljc2LTE3LTMzLjY2LTM2LTMzLjY2eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik05Ny4zOCAxMzYuMjEzbDEwNS44MiA1OC45MSAxMDMuNy01OC45MS0xMDMuNy02MXptLTYuMzUgNjcuMzJsMTEyLjE3IDYzLjExdi01MC40OWwtMTEyLjE3LTY1LjIxem0wIDYzLjExbDExMi4xNyA2NS4yMXYtNDQuMTdsLTExMi4xNy02NS4yMnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMjAzLjE3IDIxNi4xMjN2NTAuNTZsMTEyLjE2LTY1LjI5di01MC4zOXptOTItMjBhOC4xNiA4LjE2IDAgMSAxIDguMTYtOC4xNiA4LjE5IDguMTkgMCAwIDEtOC4xNiA4LjE2em0tOTIgOTEuNTJ2NDQuMTZsMTEyLjE2LTY1LjEydi00NC4xNnptOTItMjIuODhhOC4xNiA4LjE2IDAgMSAxIDguMTYtOC4xNiA4LjE5IDguMTkgMCAwIDEtOC4xNiA4LjE2eiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'GKE on-Prem');
			})
		);

		this.addPalette('gcp2Compute', 'GCP / Compute', false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addGCP2APIManagementPalette = function()
	{
		var dt = 'gcp google cloud platform api management ';
		var fns = [];
		
		fns.push(
			this.addEntry(dt + 'api analytics application programming interface', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 120, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('API\nAnalytics', 
			    		new mxGeometry(0, 0, 30, 14), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwLjAxMDAwMDIyODg4MTgzNiIgaGVpZ2h0PSI5LjQ5NDcyOTA0MjA1MzIyMyIgdmlld0JveD0iMC4wMDAyMDYzODQ1NjA0NDI1Mjk2MiAwIDIwLjAxMDAwMDIyODg4MTgzNiA5LjQ5NDcyOTA0MjA1MzIyMyI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJLnN0MXtmaWxsOiM2NjlkZjY7fSYjeGE7CS5zdDJ7ZmlsbDojYWVjYmZhO30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xLjQ3NiA4LjQzYTQuMzEgNC4zMSAwIDEgMSA2LjA3LS40IDMuNjggMy42OCAwIDAgMS0uMzkuNCA0LjMyIDQuMzIgMCAwIDEtNS42OCAwem01LjItNS4yYTMuMDcgMy4wNyAwIDEgMC0uNCA0LjMzIDMgMyAwIDAgMCAuNC0uNCAzLjA3IDMuMDcgMCAwIDAgMC0zLjkzem02LjE5IDUuMmE0LjMxIDQuMzEgMCAxIDEgNi4wNy0uNCAzLjc4IDMuNzggMCAwIDEtLjQuNCA0LjMxIDQuMzEgMCAwIDEtNS42NyAwem01LjItNS4yYTMuMDcgMy4wNyAwIDEgMC0uNCA0LjMzIDMgMyAwIDAgMCAuNC0uNCAzLjA4IDMuMDggMCAwIDAgMC0zLjkzeiIvPiYjeGE7CTxnIGNsYXNzPSJzdDEiPiYjeGE7CQk8Y2lyY2xlIGN4PSI0LjMxNiIgY3k9IjUuMTkiIHI9IjEuNjkiLz4mI3hhOwkJPGNpcmNsZSBjeD0iMTUuNjk2IiBjeT0iNS4xOSIgcj0iMS42OSIvPiYjeGE7CTwvZz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMTIuMzk2LjU2YS4zMS4zMSAwIDAgMC0uMTgtLjU2aC00LjQyYS4zMS4zMSAwIDAgMC0uMTguNTYgNS43MyA1LjczIDAgMCAxIDIuMTMgMi45Mi4yOC4yOCAwIDAgMCAuMzYuMTYuMjkuMjkgMCAwIDAgLjE3LS4xNyA1LjY3IDUuNjcgMCAwIDEgMi4xMi0yLjkxeiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 23);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'API Analytics');
			})
		);

		fns.push(
			this.addEntry(dt + 'api analytics application programming interface', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 150, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>API Analytics', 
			    		new mxGeometry(0, 0, 30, 14), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwLjAxMDAwMDIyODg4MTgzNiIgaGVpZ2h0PSI5LjQ5NDcyOTA0MjA1MzIyMyIgdmlld0JveD0iMC4wMDAyMDYzODQ1NjA0NDI1Mjk2MiAwIDIwLjAxMDAwMDIyODg4MTgzNiA5LjQ5NDcyOTA0MjA1MzIyMyI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJLnN0MXtmaWxsOiM2NjlkZjY7fSYjeGE7CS5zdDJ7ZmlsbDojYWVjYmZhO30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xLjQ3NiA4LjQzYTQuMzEgNC4zMSAwIDEgMSA2LjA3LS40IDMuNjggMy42OCAwIDAgMS0uMzkuNCA0LjMyIDQuMzIgMCAwIDEtNS42OCAwem01LjItNS4yYTMuMDcgMy4wNyAwIDEgMC0uNCA0LjMzIDMgMyAwIDAgMCAuNC0uNCAzLjA3IDMuMDcgMCAwIDAgMC0zLjkzem02LjE5IDUuMmE0LjMxIDQuMzEgMCAxIDEgNi4wNy0uNCAzLjc4IDMuNzggMCAwIDEtLjQuNCA0LjMxIDQuMzEgMCAwIDEtNS42NyAwem01LjItNS4yYTMuMDcgMy4wNyAwIDEgMC0uNCA0LjMzIDMgMyAwIDAgMCAuNC0uNCAzLjA4IDMuMDggMCAwIDAgMC0zLjkzeiIvPiYjeGE7CTxnIGNsYXNzPSJzdDEiPiYjeGE7CQk8Y2lyY2xlIGN4PSI0LjMxNiIgY3k9IjUuMTkiIHI9IjEuNjkiLz4mI3hhOwkJPGNpcmNsZSBjeD0iMTUuNjk2IiBjeT0iNS4xOSIgcj0iMS42OSIvPiYjeGE7CTwvZz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMTIuMzk2LjU2YS4zMS4zMSAwIDAgMC0uMTgtLjU2aC00LjQyYS4zMS4zMSAwIDAgMC0uMTguNTYgNS43MyA1LjczIDAgMCAxIDIuMTMgMi45Mi4yOC4yOCAwIDAgMCAuMzYuMTYuMjkuMjkgMCAwIDAgLjE3LS4xNyA1LjY3IDUuNjcgMCAwIDEgMi4xMi0yLjkxeiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 23);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'API Analytics');
			})
		);

		fns.push(
			this.addEntry(dt + 'api analytics application programming interface', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 158, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>API Analytics', 
			    		new mxGeometry(0, 0, 30, 14), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwLjAxMDAwMDIyODg4MTgzNiIgaGVpZ2h0PSI5LjQ5NDcyOTA0MjA1MzIyMyIgdmlld0JveD0iMC4wMDAyMDYzODQ1NjA0NDI1Mjk2MiAwIDIwLjAxMDAwMDIyODg4MTgzNiA5LjQ5NDcyOTA0MjA1MzIyMyI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJLnN0MXtmaWxsOiM2NjlkZjY7fSYjeGE7CS5zdDJ7ZmlsbDojYWVjYmZhO30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xLjQ3NiA4LjQzYTQuMzEgNC4zMSAwIDEgMSA2LjA3LS40IDMuNjggMy42OCAwIDAgMS0uMzkuNCA0LjMyIDQuMzIgMCAwIDEtNS42OCAwem01LjItNS4yYTMuMDcgMy4wNyAwIDEgMC0uNCA0LjMzIDMgMyAwIDAgMCAuNC0uNCAzLjA3IDMuMDcgMCAwIDAgMC0zLjkzem02LjE5IDUuMmE0LjMxIDQuMzEgMCAxIDEgNi4wNy0uNCAzLjc4IDMuNzggMCAwIDEtLjQuNCA0LjMxIDQuMzEgMCAwIDEtNS42NyAwem01LjItNS4yYTMuMDcgMy4wNyAwIDEgMC0uNCA0LjMzIDMgMyAwIDAgMCAuNC0uNCAzLjA4IDMuMDggMCAwIDAgMC0zLjkzeiIvPiYjeGE7CTxnIGNsYXNzPSJzdDEiPiYjeGE7CQk8Y2lyY2xlIGN4PSI0LjMxNiIgY3k9IjUuMTkiIHI9IjEuNjkiLz4mI3hhOwkJPGNpcmNsZSBjeD0iMTUuNjk2IiBjeT0iNS4xOSIgcj0iMS42OSIvPiYjeGE7CTwvZz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMTIuMzk2LjU2YS4zMS4zMSAwIDAgMC0uMTgtLjU2aC00LjQyYS4zMS4zMSAwIDAgMC0uMTguNTYgNS43MyA1LjczIDAgMCAxIDIuMTMgMi45Mi4yOC4yOCAwIDAgMCAuMzYuMTYuMjkuMjkgMCAwIDAgLjE3LS4xNyA1LjY3IDUuNjcgMCAwIDEgMi4xMi0yLjkxeiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 23);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'API Analytics');
			})
		);

		fns.push(
			this.addEntry(dt + 'apigee sense', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 110, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Apigee\nSense', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwLjAwMDMyOTk3MTMxMzQ3NyIgaGVpZ2h0PSIyMC4wMDAxNjQwMzE5ODI0MjIiIHZpZXdCb3g9Ii0wLjAwMDE2NDgyMzAwOTk4MTc3MzggLTAuMDAwMTY0ODgzMTA5MzkxNjY2OTUgMjAuMDAwMzI5OTcxMzEzNDc3IDIwLjAwMDE2NDAzMTk4MjQyMiI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNH0mI3hhOwkuc3Qxe2ZpbGw6IzY2OWRmNn0mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYX0mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xOS40MiA3bC0uMzUtLjA5TDE4IDYuNjRsLS4wOS0uMTljLS4wNS0uMDktLjA5LS4xOS0uMTQtLjI5bC0uMTQtLjI3LS4xNi0uMjgtLjE2LS4yNi0uMTctLjI2YTIuMzUgMi4zNSAwIDAgMC0uMTktLjI1bC0uMTktLjI1LS4yLS4yNC0uMi0uMjMtLjI2LS4yMi0uMjItLjIyLS4yNC0uMi0uMjMtLjItLjI1LS4xOS0uMjUtLjE5LS4yNi0uMTctLjI2LS4xNi0uMjgtLjE2LS4yNy0uMTQtLjI5LS4xNC0uMTktLjA4LS4yOS0xLjEyTDEzIC41OGEuNzguNzggMCAwIDAtLjc3LS41OEg3Ljc3QS43OC43OCAwIDAgMCA3IC41OGwtLjA5LjM1LS4yNyAxLjEyLS4xOS4wOC0uMjkuMTQtLjI3LjE0LS4yOC4xNi0uMjYuMTYtLjI2LjE3LS4yNS4xOS0uMjUuMTktLjI0LjItLjIzLjItLjIyLjIyLS4yMi4yMi0uMi4yNGEyLjIgMi4yIDAgMCAwLS4yLjIzYy0uMDcuMDgtLjEzLjE3LS4xOS4yNWEyLjM1IDIuMzUgMCAwIDAtLjE5LjI1bC0uMTcuMjYtLjE2LjI2LS4xNi4yOGMwIC4wOS0uMS4xOC0uMTQuMjdsLS4xNC4yOWMtLjA1LjA5LS4wNi4xMy0uMDguMTlsLTEuMTIuMjlMLjU4IDdhLjc4Ljc4IDAgMCAwLS41OC43N3Y0LjQ2YS43OC43OCAwIDAgMCAuNTguNzVsLjM1LjA5IDEuMTIuMjljMCAuMDYuMDYuMTIuMDguMTlzLjA5LjE5LjE0LjI5bC4xNC4yNy4xNi4yOC4xNi4yNi4xNy4yNmEyLjM1IDIuMzUgMCAwIDAgLjE5LjI1bC4xOS4yNWEyLjIgMi4yIDAgMCAwIC4yLjIzbC4yLjI0LjIyLjIyLjIyLjIyLjI0LjIuMjMuMi4yNS4xOS4yNS4xOS4yNi4xNy4yNi4xNi4yOC4xNi4yNy4xNC4yOS4xNC4xOS4wOC4yOSAxLjEyLjA5LjM1YS43OC43OCAwIDAgMCAuNzUuNThoNC40NmEuNzguNzggMCAwIDAgLjc1LS41OGwuMDktLjM1LjI5LTEuMDcuMTktLjA4LjI5LS4xNC4yNy0uMTQuMjgtLjE2LjI2LS4xNi4yNi0uMTcuMjUtLjE5LjI1LS4xOS4yNC0uMi4yMy0uMi4yMi0uMjIuMjItLjIyLjItLjI0YTIuMiAyLjIgMCAwIDAgLjItLjIzYy4wNy0uMDguMTMtLjE3LjE5LS4yNWEyLjM1IDIuMzUgMCAwIDAgLjE5LS4yNWwuMTctLjI2LjE2LS4yNi4xNi0uMjguMTQtLjI3LjE0LS4yOWMuMDUtLjA5LjA2LS4xMy4wOC0uMTlsMS4xMi0uMjkuMzUtLjA5YS43OC43OCAwIDAgMCAuNTgtLjc1VjcuNzdhLjc4Ljc4IDAgMCAwLS41OC0uNzd6TTEwIDE2LjY3QTYuNjYgNi42NiAwIDEgMSAxNi42NyAxMGE2LjUzIDYuNTMgMCAwIDEtLjE0IDEuMzNBNi42NCA2LjY0IDAgMCAxIDEwIDE2LjY3eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xMCA0Ljg4QTUuMTcgNS4xNyAwIDAgMCA4Ljg5IDVsLjI3IDEuMjNhMy44NiAzLjg2IDAgMSAxLTIuOTMgNC42MSA0IDQgMCAwIDEtLjA5LS44NEg0Ljg4QTUuMTIgNS4xMiAwIDEgMCAxMCA0Ljg4eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xMCA3LjQyYTIuNiAyLjYgMCAwIDAtLjU2LjA2bC4yNyAxLjI0YTEuMzIgMS4zMiAwIDEgMS0xIDEuNTcgMS40MyAxLjQzIDAgMCAxIDAtLjI5SDcuNDJBMi41OCAyLjU4IDAgMSAwIDEwIDcuNDJ6Ii8+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Apigee Sense');
			})
		);

		fns.push(
			this.addEntry(dt + 'apigee sense', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 150, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Apigee Sense', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwLjAwMDMyOTk3MTMxMzQ3NyIgaGVpZ2h0PSIyMC4wMDAxNjQwMzE5ODI0MjIiIHZpZXdCb3g9Ii0wLjAwMDE2NDgyMzAwOTk4MTc3MzggLTAuMDAwMTY0ODgzMTA5MzkxNjY2OTUgMjAuMDAwMzI5OTcxMzEzNDc3IDIwLjAwMDE2NDAzMTk4MjQyMiI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNH0mI3hhOwkuc3Qxe2ZpbGw6IzY2OWRmNn0mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYX0mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xOS40MiA3bC0uMzUtLjA5TDE4IDYuNjRsLS4wOS0uMTljLS4wNS0uMDktLjA5LS4xOS0uMTQtLjI5bC0uMTQtLjI3LS4xNi0uMjgtLjE2LS4yNi0uMTctLjI2YTIuMzUgMi4zNSAwIDAgMC0uMTktLjI1bC0uMTktLjI1LS4yLS4yNC0uMi0uMjMtLjI2LS4yMi0uMjItLjIyLS4yNC0uMi0uMjMtLjItLjI1LS4xOS0uMjUtLjE5LS4yNi0uMTctLjI2LS4xNi0uMjgtLjE2LS4yNy0uMTQtLjI5LS4xNC0uMTktLjA4LS4yOS0xLjEyTDEzIC41OGEuNzguNzggMCAwIDAtLjc3LS41OEg3Ljc3QS43OC43OCAwIDAgMCA3IC41OGwtLjA5LjM1LS4yNyAxLjEyLS4xOS4wOC0uMjkuMTQtLjI3LjE0LS4yOC4xNi0uMjYuMTYtLjI2LjE3LS4yNS4xOS0uMjUuMTktLjI0LjItLjIzLjItLjIyLjIyLS4yMi4yMi0uMi4yNGEyLjIgMi4yIDAgMCAwLS4yLjIzYy0uMDcuMDgtLjEzLjE3LS4xOS4yNWEyLjM1IDIuMzUgMCAwIDAtLjE5LjI1bC0uMTcuMjYtLjE2LjI2LS4xNi4yOGMwIC4wOS0uMS4xOC0uMTQuMjdsLS4xNC4yOWMtLjA1LjA5LS4wNi4xMy0uMDguMTlsLTEuMTIuMjlMLjU4IDdhLjc4Ljc4IDAgMCAwLS41OC43N3Y0LjQ2YS43OC43OCAwIDAgMCAuNTguNzVsLjM1LjA5IDEuMTIuMjljMCAuMDYuMDYuMTIuMDguMTlzLjA5LjE5LjE0LjI5bC4xNC4yNy4xNi4yOC4xNi4yNi4xNy4yNmEyLjM1IDIuMzUgMCAwIDAgLjE5LjI1bC4xOS4yNWEyLjIgMi4yIDAgMCAwIC4yLjIzbC4yLjI0LjIyLjIyLjIyLjIyLjI0LjIuMjMuMi4yNS4xOS4yNS4xOS4yNi4xNy4yNi4xNi4yOC4xNi4yNy4xNC4yOS4xNC4xOS4wOC4yOSAxLjEyLjA5LjM1YS43OC43OCAwIDAgMCAuNzUuNThoNC40NmEuNzguNzggMCAwIDAgLjc1LS41OGwuMDktLjM1LjI5LTEuMDcuMTktLjA4LjI5LS4xNC4yNy0uMTQuMjgtLjE2LjI2LS4xNi4yNi0uMTcuMjUtLjE5LjI1LS4xOS4yNC0uMi4yMy0uMi4yMi0uMjIuMjItLjIyLjItLjI0YTIuMiAyLjIgMCAwIDAgLjItLjIzYy4wNy0uMDguMTMtLjE3LjE5LS4yNWEyLjM1IDIuMzUgMCAwIDAgLjE5LS4yNWwuMTctLjI2LjE2LS4yNi4xNi0uMjguMTQtLjI3LjE0LS4yOWMuMDUtLjA5LjA2LS4xMy4wOC0uMTlsMS4xMi0uMjkuMzUtLjA5YS43OC43OCAwIDAgMCAuNTgtLjc1VjcuNzdhLjc4Ljc4IDAgMCAwLS41OC0uNzd6TTEwIDE2LjY3QTYuNjYgNi42NiAwIDEgMSAxNi42NyAxMGE2LjUzIDYuNTMgMCAwIDEtLjE0IDEuMzNBNi42NCA2LjY0IDAgMCAxIDEwIDE2LjY3eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xMCA0Ljg4QTUuMTcgNS4xNyAwIDAgMCA4Ljg5IDVsLjI3IDEuMjNhMy44NiAzLjg2IDAgMSAxLTIuOTMgNC42MSA0IDQgMCAwIDEtLjA5LS44NEg0Ljg4QTUuMTIgNS4xMiAwIDEgMCAxMCA0Ljg4eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xMCA3LjQyYTIuNiAyLjYgMCAwIDAtLjU2LjA2bC4yNyAxLjI0YTEuMzIgMS4zMiAwIDEgMS0xIDEuNTcgMS40MyAxLjQzIDAgMCAxIDAtLjI5SDcuNDJBMi41OCAyLjU4IDAgMSAwIDEwIDcuNDJ6Ii8+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Apigee Sense');
			})
		);

		fns.push(
			this.addEntry(dt + 'apigee sense', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 158, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Apigee Sense', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwLjAwMDMyOTk3MTMxMzQ3NyIgaGVpZ2h0PSIyMC4wMDAxNjQwMzE5ODI0MjIiIHZpZXdCb3g9Ii0wLjAwMDE2NDgyMzAwOTk4MTc3MzggLTAuMDAwMTY0ODgzMTA5MzkxNjY2OTUgMjAuMDAwMzI5OTcxMzEzNDc3IDIwLjAwMDE2NDAzMTk4MjQyMiI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNH0mI3hhOwkuc3Qxe2ZpbGw6IzY2OWRmNn0mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYX0mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xOS40MiA3bC0uMzUtLjA5TDE4IDYuNjRsLS4wOS0uMTljLS4wNS0uMDktLjA5LS4xOS0uMTQtLjI5bC0uMTQtLjI3LS4xNi0uMjgtLjE2LS4yNi0uMTctLjI2YTIuMzUgMi4zNSAwIDAgMC0uMTktLjI1bC0uMTktLjI1LS4yLS4yNC0uMi0uMjMtLjI2LS4yMi0uMjItLjIyLS4yNC0uMi0uMjMtLjItLjI1LS4xOS0uMjUtLjE5LS4yNi0uMTctLjI2LS4xNi0uMjgtLjE2LS4yNy0uMTQtLjI5LS4xNC0uMTktLjA4LS4yOS0xLjEyTDEzIC41OGEuNzguNzggMCAwIDAtLjc3LS41OEg3Ljc3QS43OC43OCAwIDAgMCA3IC41OGwtLjA5LjM1LS4yNyAxLjEyLS4xOS4wOC0uMjkuMTQtLjI3LjE0LS4yOC4xNi0uMjYuMTYtLjI2LjE3LS4yNS4xOS0uMjUuMTktLjI0LjItLjIzLjItLjIyLjIyLS4yMi4yMi0uMi4yNGEyLjIgMi4yIDAgMCAwLS4yLjIzYy0uMDcuMDgtLjEzLjE3LS4xOS4yNWEyLjM1IDIuMzUgMCAwIDAtLjE5LjI1bC0uMTcuMjYtLjE2LjI2LS4xNi4yOGMwIC4wOS0uMS4xOC0uMTQuMjdsLS4xNC4yOWMtLjA1LjA5LS4wNi4xMy0uMDguMTlsLTEuMTIuMjlMLjU4IDdhLjc4Ljc4IDAgMCAwLS41OC43N3Y0LjQ2YS43OC43OCAwIDAgMCAuNTguNzVsLjM1LjA5IDEuMTIuMjljMCAuMDYuMDYuMTIuMDguMTlzLjA5LjE5LjE0LjI5bC4xNC4yNy4xNi4yOC4xNi4yNi4xNy4yNmEyLjM1IDIuMzUgMCAwIDAgLjE5LjI1bC4xOS4yNWEyLjIgMi4yIDAgMCAwIC4yLjIzbC4yLjI0LjIyLjIyLjIyLjIyLjI0LjIuMjMuMi4yNS4xOS4yNS4xOS4yNi4xNy4yNi4xNi4yOC4xNi4yNy4xNC4yOS4xNC4xOS4wOC4yOSAxLjEyLjA5LjM1YS43OC43OCAwIDAgMCAuNzUuNThoNC40NmEuNzguNzggMCAwIDAgLjc1LS41OGwuMDktLjM1LjI5LTEuMDcuMTktLjA4LjI5LS4xNC4yNy0uMTQuMjgtLjE2LjI2LS4xNi4yNi0uMTcuMjUtLjE5LjI1LS4xOS4yNC0uMi4yMy0uMi4yMi0uMjIuMjItLjIyLjItLjI0YTIuMiAyLjIgMCAwIDAgLjItLjIzYy4wNy0uMDguMTMtLjE3LjE5LS4yNWEyLjM1IDIuMzUgMCAwIDAgLjE5LS4yNWwuMTctLjI2LjE2LS4yNi4xNi0uMjguMTQtLjI3LjE0LS4yOWMuMDUtLjA5LjA2LS4xMy4wOC0uMTlsMS4xMi0uMjkuMzUtLjA5YS43OC43OCAwIDAgMCAuNTgtLjc1VjcuNzdhLjc4Ljc4IDAgMCAwLS41OC0uNzd6TTEwIDE2LjY3QTYuNjYgNi42NiAwIDEgMSAxNi42NyAxMGE2LjUzIDYuNTMgMCAwIDEtLjE0IDEuMzNBNi42NCA2LjY0IDAgMCAxIDEwIDE2LjY3eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xMCA0Ljg4QTUuMTcgNS4xNyAwIDAgMCA4Ljg5IDVsLjI3IDEuMjNhMy44NiAzLjg2IDAgMSAxLTIuOTMgNC42MSA0IDQgMCAwIDEtLjA5LS44NEg0Ljg4QTUuMTIgNS4xMiAwIDEgMCAxMCA0Ljg4eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xMCA3LjQyYTIuNiAyLjYgMCAwIDAtLjU2LjA2bC4yNyAxLjI0YTEuMzIgMS4zMiAwIDEgMS0xIDEuNTcgMS40MyAxLjQzIDAgMCAxIDAtLjI5SDcuNDJBMi41OCAyLjU4IDAgMSAwIDEwIDcuNDJ6Ii8+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Apigee Sense');
			})
		);

		fns.push(
			this.addEntry(dt + 'api monetization application programming interface', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 140, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('API\nMonetization', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE4LjMwMDAwMTE0NDQwOTE4IiBoZWlnaHQ9IjE5LjgyNjUwNTY2MTAxMDc0MiIgdmlld0JveD0iLTguNzkxNTE5NjkwMDIxMjMyZS04IDAgMTguMzAwMDAxMTQ0NDA5MTggMTkuODI2NTA1NjYxMDEwNzQyIj4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0fSYjeGE7CS5zdDF7ZmlsbDojYWVjYmZhfSYjeGE7CS5zdDJ7ZmlsbDojNjY5ZGY2fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTMuMDEgMTguNDlhMS41MSAxLjUxIDAgMCAxLTMgMGgwdi00LjI4YTEuNTEgMS41MSAwIDEgMSAzIDB6bTUuMTMgMGExLjUxIDEuNTEgMCAwIDEtMyAwaDB2LTQuMjhhMS41MSAxLjUxIDAgMCAxIDMgMHptNS4wNiAwYTEuNTEgMS41MSAwIDAgMS0zIDB2LTQuMjhhMS41MSAxLjUxIDAgMCAxIDMgMHptNS4wOSAwYTEuNTEgMS41MSAwIDAgMS0zIDB2LTQuMjhhMS41MSAxLjUxIDAgMSAxIDMgMHoiLz4mI3hhOwk8Y2lyY2xlIGNsYXNzPSJzdDEiIGN4PSI2LjU5IiBjeT0iOS45NyIgcj0iMS41MSIvPiYjeGE7CTxjaXJjbGUgY2xhc3M9InN0MiIgY3g9IjExLjY5IiBjeT0iOS45NyIgcj0iMS41MSIvPiYjeGE7CTxjaXJjbGUgY2xhc3M9InN0MSIgY3g9IjExLjY5IiBjeT0iNS43NCIgcj0iMS41MSIvPiYjeGE7CTxnIGNsYXNzPSJzdDIiPiYjeGE7CQk8Y2lyY2xlIGN4PSIxNi43OCIgY3k9IjkuOTciIHI9IjEuNTEiLz4mI3hhOwkJPGNpcmNsZSBjeD0iMTYuNzgiIGN5PSI1Ljc0IiByPSIxLjUxIi8+JiN4YTsJPC9nPiYjeGE7CTxjaXJjbGUgY2xhc3M9InN0MSIgY3g9IjE2Ljc4IiBjeT0iMS41MSIgcj0iMS41MSIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'API Monetization');
			})
		);

		fns.push(
			this.addEntry(dt + 'api monetization application programming interface', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 170, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>API Monetization', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE4LjMwMDAwMTE0NDQwOTE4IiBoZWlnaHQ9IjE5LjgyNjUwNTY2MTAxMDc0MiIgdmlld0JveD0iLTguNzkxNTE5NjkwMDIxMjMyZS04IDAgMTguMzAwMDAxMTQ0NDA5MTggMTkuODI2NTA1NjYxMDEwNzQyIj4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0fSYjeGE7CS5zdDF7ZmlsbDojYWVjYmZhfSYjeGE7CS5zdDJ7ZmlsbDojNjY5ZGY2fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTMuMDEgMTguNDlhMS41MSAxLjUxIDAgMCAxLTMgMGgwdi00LjI4YTEuNTEgMS41MSAwIDEgMSAzIDB6bTUuMTMgMGExLjUxIDEuNTEgMCAwIDEtMyAwaDB2LTQuMjhhMS41MSAxLjUxIDAgMCAxIDMgMHptNS4wNiAwYTEuNTEgMS41MSAwIDAgMS0zIDB2LTQuMjhhMS41MSAxLjUxIDAgMCAxIDMgMHptNS4wOSAwYTEuNTEgMS41MSAwIDAgMS0zIDB2LTQuMjhhMS41MSAxLjUxIDAgMSAxIDMgMHoiLz4mI3hhOwk8Y2lyY2xlIGNsYXNzPSJzdDEiIGN4PSI2LjU5IiBjeT0iOS45NyIgcj0iMS41MSIvPiYjeGE7CTxjaXJjbGUgY2xhc3M9InN0MiIgY3g9IjExLjY5IiBjeT0iOS45NyIgcj0iMS41MSIvPiYjeGE7CTxjaXJjbGUgY2xhc3M9InN0MSIgY3g9IjExLjY5IiBjeT0iNS43NCIgcj0iMS41MSIvPiYjeGE7CTxnIGNsYXNzPSJzdDIiPiYjeGE7CQk8Y2lyY2xlIGN4PSIxNi43OCIgY3k9IjkuOTciIHI9IjEuNTEiLz4mI3hhOwkJPGNpcmNsZSBjeD0iMTYuNzgiIGN5PSI1Ljc0IiByPSIxLjUxIi8+JiN4YTsJPC9nPiYjeGE7CTxjaXJjbGUgY2xhc3M9InN0MSIgY3g9IjE2Ljc4IiBjeT0iMS41MSIgcj0iMS41MSIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'API Monetization');
			})
		);

		fns.push(
			this.addEntry(dt + 'api monetization application programming interface', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 178, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>API Monetization', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE4LjMwMDAwMTE0NDQwOTE4IiBoZWlnaHQ9IjE5LjgyNjUwNTY2MTAxMDc0MiIgdmlld0JveD0iLTguNzkxNTE5NjkwMDIxMjMyZS04IDAgMTguMzAwMDAxMTQ0NDA5MTggMTkuODI2NTA1NjYxMDEwNzQyIj4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0fSYjeGE7CS5zdDF7ZmlsbDojYWVjYmZhfSYjeGE7CS5zdDJ7ZmlsbDojNjY5ZGY2fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTMuMDEgMTguNDlhMS41MSAxLjUxIDAgMCAxLTMgMGgwdi00LjI4YTEuNTEgMS41MSAwIDEgMSAzIDB6bTUuMTMgMGExLjUxIDEuNTEgMCAwIDEtMyAwaDB2LTQuMjhhMS41MSAxLjUxIDAgMCAxIDMgMHptNS4wNiAwYTEuNTEgMS41MSAwIDAgMS0zIDB2LTQuMjhhMS41MSAxLjUxIDAgMCAxIDMgMHptNS4wOSAwYTEuNTEgMS41MSAwIDAgMS0zIDB2LTQuMjhhMS41MSAxLjUxIDAgMSAxIDMgMHoiLz4mI3hhOwk8Y2lyY2xlIGNsYXNzPSJzdDEiIGN4PSI2LjU5IiBjeT0iOS45NyIgcj0iMS41MSIvPiYjeGE7CTxjaXJjbGUgY2xhc3M9InN0MiIgY3g9IjExLjY5IiBjeT0iOS45NyIgcj0iMS41MSIvPiYjeGE7CTxjaXJjbGUgY2xhc3M9InN0MSIgY3g9IjExLjY5IiBjeT0iNS43NCIgcj0iMS41MSIvPiYjeGE7CTxnIGNsYXNzPSJzdDIiPiYjeGE7CQk8Y2lyY2xlIGN4PSIxNi43OCIgY3k9IjkuOTciIHI9IjEuNTEiLz4mI3hhOwkJPGNpcmNsZSBjeD0iMTYuNzgiIGN5PSI1Ljc0IiByPSIxLjUxIi8+JiN4YTsJPC9nPiYjeGE7CTxjaXJjbGUgY2xhc3M9InN0MSIgY3g9IjE2Ljc4IiBjeT0iMS41MSIgcj0iMS41MSIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'API Monetization');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud endpoints', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 130, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Cloud\nEndpoints', 
			    		new mxGeometry(0, 0, 30, 18), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE5Ljk1MDAwMDc2MjkzOTQ1MyIgaGVpZ2h0PSIxMiIgdmlld0JveD0iMCAwIDE5Ljk1MDAwMDc2MjkzOTQ1MyAxMiI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNH0mI3hhOwkuc3Qxe2ZpbGw6I2FlY2JmYX0mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik02IDZsMSAyaDZsMS0yLTEtMkg3eiIgZmlsbD0iIzQyODVmNCIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik03LjUxIDRIN0w2IDZoOGwtMS0yeiIgZmlsbD0iI2FlY2JmYSIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xNi45NyA2bDEuNS0yLjI1TDE2IDBoLTN6IiBmaWxsPSIjNDI4NWY0Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTE2Ljk3IDZoMEwxMyAxMmgzbDMuOTUtNi0xLjQ4LTIuMjV6IiBmaWxsPSIjYWVjYmZhIi8+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTIuOTggNmwtMS41IDIuMjVMMy45NSAxMmgzeiIgZmlsbD0iIzQyODVmNCIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0yLjk4IDZoMGwzLjk3LTZoLTNMMCA2bDEuNDggMi4yNXoiIGZpbGw9IiNhZWNiZmEiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 21);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Endpoints');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud endpoints', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 160, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Endpoints', 
			    		new mxGeometry(0, 0, 30, 18), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE5Ljk1MDAwMDc2MjkzOTQ1MyIgaGVpZ2h0PSIxMiIgdmlld0JveD0iMCAwIDE5Ljk1MDAwMDc2MjkzOTQ1MyAxMiI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNH0mI3hhOwkuc3Qxe2ZpbGw6I2FlY2JmYX0mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik02IDZsMSAyaDZsMS0yLTEtMkg3eiIgZmlsbD0iIzQyODVmNCIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik03LjUxIDRIN0w2IDZoOGwtMS0yeiIgZmlsbD0iI2FlY2JmYSIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xNi45NyA2bDEuNS0yLjI1TDE2IDBoLTN6IiBmaWxsPSIjNDI4NWY0Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTE2Ljk3IDZoMEwxMyAxMmgzbDMuOTUtNi0xLjQ4LTIuMjV6IiBmaWxsPSIjYWVjYmZhIi8+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTIuOTggNmwtMS41IDIuMjVMMy45NSAxMmgzeiIgZmlsbD0iIzQyODVmNCIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0yLjk4IDZoMGwzLjk3LTZoLTNMMCA2bDEuNDggMi4yNXoiIGZpbGw9IiNhZWNiZmEiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 21);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Endpoints');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud endpoints', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 168, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Endpoints', 
			    		new mxGeometry(0, 0, 30, 18), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE5Ljk1MDAwMDc2MjkzOTQ1MyIgaGVpZ2h0PSIxMiIgdmlld0JveD0iMCAwIDE5Ljk1MDAwMDc2MjkzOTQ1MyAxMiI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNH0mI3hhOwkuc3Qxe2ZpbGw6I2FlY2JmYX0mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik02IDZsMSAyaDZsMS0yLTEtMkg3eiIgZmlsbD0iIzQyODVmNCIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik03LjUxIDRIN0w2IDZoOGwtMS0yeiIgZmlsbD0iI2FlY2JmYSIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xNi45NyA2bDEuNS0yLjI1TDE2IDBoLTN6IiBmaWxsPSIjNDI4NWY0Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTE2Ljk3IDZoMEwxMyAxMmgzbDMuOTUtNi0xLjQ4LTIuMjV6IiBmaWxsPSIjYWVjYmZhIi8+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTIuOTggNmwtMS41IDIuMjVMMy45NSAxMmgzeiIgZmlsbD0iIzQyODVmNCIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0yLjk4IDZoMGwzLjk3LTZoLTNMMCA2bDEuNDggMi4yNXoiIGZpbGw9IiNhZWNiZmEiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 21);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Endpoints');
			})
		);

		fns.push(
			this.addEntry(dt + 'apigee platform', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 120, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Apigee\nPlatform', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwLjE4MDIzMTA5NDM2MDM1IiBoZWlnaHQ9IjIwLjE4MDIwODIwNjE3Njc1OCIgdmlld0JveD0iLTAuMDAwMTE1MTY1MTIzMTMzOTIwMTMgLTAuMDAwMTAzMzQ0NDkzMjU0NTUzNTMgMjAuMTgwMjMxMDk0MzYwMzUgMjAuMTgwMjA4MjA2MTc2NzU4Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNjY5ZGY2O2ZpbGwtcnVsZTpldmVub2RkfSYjeGE7CS5zdDF7ZmlsbC1ydWxlOmV2ZW5vZGQ7ZmlsbDojNDI4NWY0fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTMuMjkgMTAuMDlsMS4zMi0xLjMyLTEuNzktMS43OWEyLjk0IDIuOTQgMCAwIDEgMi4wOC01IDIuOTIgMi45MiAwIDAgMSAyLjA3Ljg2bDEuOCAxLjc5IDEuMzItMS4zNEw4LjMgMS41YTQuODEgNC44MSAwIDEgMC02LjggNi44em0xMy42IDBsLTEuMzIgMS4zMiAxLjc5IDEuOGEyLjk0IDIuOTQgMCAwIDEtNC4xNiA0LjE1bC0xLjc5LTEuNzktMS4zMiAxLjMyIDEuNzkgMS43OWE0LjgxIDQuODEgMCAxIDAgNi44LTYuOHoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNNi45OCAxNy4zNmEyLjk0IDIuOTQgMCAxIDEtNC4xNi00LjE2bDEuNzktMS43OSA0LjE2IDQuMTZ6bTYuMjMtMTQuNTRhMi45MyAyLjkzIDAgMCAxIDUgMi4wOCAzIDMgMCAwIDEtLjg2IDIuMDhsLTEuNzkgMS43OS00LjE1LTQuMTZ6bS0zLjEyIDEwLjQ2YTMuMiAzLjIgMCAwIDEtMy4xOS0zLjE5aDBhMy4yMSAzLjIxIDAgMCAxIDMuMTktMy4xOWgwYTMuMjEgMy4yMSAwIDAgMSAzLjE5IDMuMTloMGEzLjIgMy4yIDAgMCAxLTMuMTkgMy4xOXptNi44LTMuMTlsMS43OS0xLjc5QTQuODEgNC44MSAwIDAgMCAxNi41NzQuMTUzIDQuODEgNC44MSAwIDAgMCAxMS44OCAxLjVsLTEuNzkgMS43OS02LjggNi44LTEuNzkgMS43OWE0LjgxIDQuODEgMCAwIDAgMi4xMDYgOC4xNDdBNC44MSA0LjgxIDAgMCAwIDguMyAxOC42OGwxLjc5LTEuNzl6Ii8+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Apigee Platform');
			})
		);

		fns.push(
			this.addEntry(dt + 'apigee platform', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 160, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Apigee Platform', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwLjE4MDIzMTA5NDM2MDM1IiBoZWlnaHQ9IjIwLjE4MDIwODIwNjE3Njc1OCIgdmlld0JveD0iLTAuMDAwMTE1MTY1MTIzMTMzOTIwMTMgLTAuMDAwMTAzMzQ0NDkzMjU0NTUzNTMgMjAuMTgwMjMxMDk0MzYwMzUgMjAuMTgwMjA4MjA2MTc2NzU4Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNjY5ZGY2O2ZpbGwtcnVsZTpldmVub2RkfSYjeGE7CS5zdDF7ZmlsbC1ydWxlOmV2ZW5vZGQ7ZmlsbDojNDI4NWY0fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTMuMjkgMTAuMDlsMS4zMi0xLjMyLTEuNzktMS43OWEyLjk0IDIuOTQgMCAwIDEgMi4wOC01IDIuOTIgMi45MiAwIDAgMSAyLjA3Ljg2bDEuOCAxLjc5IDEuMzItMS4zNEw4LjMgMS41YTQuODEgNC44MSAwIDEgMC02LjggNi44em0xMy42IDBsLTEuMzIgMS4zMiAxLjc5IDEuOGEyLjk0IDIuOTQgMCAwIDEtNC4xNiA0LjE1bC0xLjc5LTEuNzktMS4zMiAxLjMyIDEuNzkgMS43OWE0LjgxIDQuODEgMCAxIDAgNi44LTYuOHoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNNi45OCAxNy4zNmEyLjk0IDIuOTQgMCAxIDEtNC4xNi00LjE2bDEuNzktMS43OSA0LjE2IDQuMTZ6bTYuMjMtMTQuNTRhMi45MyAyLjkzIDAgMCAxIDUgMi4wOCAzIDMgMCAwIDEtLjg2IDIuMDhsLTEuNzkgMS43OS00LjE1LTQuMTZ6bS0zLjEyIDEwLjQ2YTMuMiAzLjIgMCAwIDEtMy4xOS0zLjE5aDBhMy4yMSAzLjIxIDAgMCAxIDMuMTktMy4xOWgwYTMuMjEgMy4yMSAwIDAgMSAzLjE5IDMuMTloMGEzLjIgMy4yIDAgMCAxLTMuMTkgMy4xOXptNi44LTMuMTlsMS43OS0xLjc5QTQuODEgNC44MSAwIDAgMCAxNi41NzQuMTUzIDQuODEgNC44MSAwIDAgMCAxMS44OCAxLjVsLTEuNzkgMS43OS02LjggNi44LTEuNzkgMS43OWE0LjgxIDQuODEgMCAwIDAgMi4xMDYgOC4xNDdBNC44MSA0LjgxIDAgMCAwIDguMyAxOC42OGwxLjc5LTEuNzl6Ii8+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Apigee Platform');
			})
		);

		fns.push(
			this.addEntry(dt + 'apigee platform', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 168, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Apigee Platform', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwLjE4MDIzMTA5NDM2MDM1IiBoZWlnaHQ9IjIwLjE4MDIwODIwNjE3Njc1OCIgdmlld0JveD0iLTAuMDAwMTE1MTY1MTIzMTMzOTIwMTMgLTAuMDAwMTAzMzQ0NDkzMjU0NTUzNTMgMjAuMTgwMjMxMDk0MzYwMzUgMjAuMTgwMjA4MjA2MTc2NzU4Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNjY5ZGY2O2ZpbGwtcnVsZTpldmVub2RkfSYjeGE7CS5zdDF7ZmlsbC1ydWxlOmV2ZW5vZGQ7ZmlsbDojNDI4NWY0fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTMuMjkgMTAuMDlsMS4zMi0xLjMyLTEuNzktMS43OWEyLjk0IDIuOTQgMCAwIDEgMi4wOC01IDIuOTIgMi45MiAwIDAgMSAyLjA3Ljg2bDEuOCAxLjc5IDEuMzItMS4zNEw4LjMgMS41YTQuODEgNC44MSAwIDEgMC02LjggNi44em0xMy42IDBsLTEuMzIgMS4zMiAxLjc5IDEuOGEyLjk0IDIuOTQgMCAwIDEtNC4xNiA0LjE1bC0xLjc5LTEuNzktMS4zMiAxLjMyIDEuNzkgMS43OWE0LjgxIDQuODEgMCAxIDAgNi44LTYuOHoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNNi45OCAxNy4zNmEyLjk0IDIuOTQgMCAxIDEtNC4xNi00LjE2bDEuNzktMS43OSA0LjE2IDQuMTZ6bTYuMjMtMTQuNTRhMi45MyAyLjkzIDAgMCAxIDUgMi4wOCAzIDMgMCAwIDEtLjg2IDIuMDhsLTEuNzkgMS43OS00LjE1LTQuMTZ6bS0zLjEyIDEwLjQ2YTMuMiAzLjIgMCAwIDEtMy4xOS0zLjE5aDBhMy4yMSAzLjIxIDAgMCAxIDMuMTktMy4xOWgwYTMuMjEgMy4yMSAwIDAgMSAzLjE5IDMuMTloMGEzLjIgMy4yIDAgMCAxLTMuMTkgMy4xOXptNi44LTMuMTlsMS43OS0xLjc5QTQuODEgNC44MSAwIDAgMCAxNi41NzQuMTUzIDQuODEgNC44MSAwIDAgMCAxMS44OCAxLjVsLTEuNzkgMS43OS02LjggNi44LTEuNzkgMS43OWE0LjgxIDQuODEgMCAwIDAgMi4xMDYgOC4xNDdBNC44MSA0LjgxIDAgMCAwIDguMyAxOC42OGwxLjc5LTEuNzl6Ii8+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Apigee Platform');
			})
		);

		fns.push(
			this.addEntry(dt + 'developer portal', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 130, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Developer\nPortal', 
			    		new mxGeometry(0, 0, 30, 21), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE0LjE0MzAxOTY3NjIwODQ5NiIgdmlld0JveD0iMCAwLjAwMDQ4OTk2NjI0NTM2ODEyMzEgMjAgMTQuMTQzMDE5Njc2MjA4NDk2Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qxe2ZpbGw6IzY2OWRmNjt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTAgMS40NzJhNS41OSA1LjU5IDAgMCAxIDQgMS42bDEtMWE3LjA3IDcuMDcgMCAwIDAtMTAgMGgwbDEgMWE1LjU5IDUuNTkgMCAwIDEgNC0xLjZ6bTAgMTEuMmE1LjU5IDUuNTkgMCAwIDEtNC0xLjZsLTEgMWE3LjA3IDcuMDcgMCAwIDAgMTAgMGgwbC0xLTFhNS41OSA1LjU5IDAgMCAxLTQgMS42eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xMCAxMC4xNDJhMy4wNiAzLjA2IDAgMCAxLTMtMi4zNEgzLjExdjIuMzhMMCA3LjA3MmwzLjExLTMuMXYyLjM4SDdhMy4wNiAzLjA2IDAgMCAxIDMtMi4zNGgwYTMuMDYgMy4wNiAwIDAgMSAzIDIuMzRoMy45MXYtMi4zOUwyMCA3LjA3MmwtMy4xMSAzLjEydi0yLjM5SDEzYTMuMDYgMy4wNiAwIDAgMS0zIDIuMzR6bTAtNC42OGExLjYxIDEuNjEgMCAxIDAgMS42MSAxLjYxaDBBMS42MSAxLjYxIDAgMCAwIDEwIDUuNDYyeiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 19.5);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Developer Portal');
			})
		);

		fns.push(
			this.addEntry(dt + 'developer portal', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 170, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Developer Portal', 
			    		new mxGeometry(0, 0, 30, 21), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE0LjE0MzAxOTY3NjIwODQ5NiIgdmlld0JveD0iMCAwLjAwMDQ4OTk2NjI0NTM2ODEyMzEgMjAgMTQuMTQzMDE5Njc2MjA4NDk2Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qxe2ZpbGw6IzY2OWRmNjt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTAgMS40NzJhNS41OSA1LjU5IDAgMCAxIDQgMS42bDEtMWE3LjA3IDcuMDcgMCAwIDAtMTAgMGgwbDEgMWE1LjU5IDUuNTkgMCAwIDEgNC0xLjZ6bTAgMTEuMmE1LjU5IDUuNTkgMCAwIDEtNC0xLjZsLTEgMWE3LjA3IDcuMDcgMCAwIDAgMTAgMGgwbC0xLTFhNS41OSA1LjU5IDAgMCAxLTQgMS42eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xMCAxMC4xNDJhMy4wNiAzLjA2IDAgMCAxLTMtMi4zNEgzLjExdjIuMzhMMCA3LjA3MmwzLjExLTMuMXYyLjM4SDdhMy4wNiAzLjA2IDAgMCAxIDMtMi4zNGgwYTMuMDYgMy4wNiAwIDAgMSAzIDIuMzRoMy45MXYtMi4zOUwyMCA3LjA3MmwtMy4xMSAzLjEydi0yLjM5SDEzYTMuMDYgMy4wNiAwIDAgMS0zIDIuMzR6bTAtNC42OGExLjYxIDEuNjEgMCAxIDAgMS42MSAxLjYxaDBBMS42MSAxLjYxIDAgMCAwIDEwIDUuNDYyeiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 19.5);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Developer Portal');
			})
		);

		fns.push(
			this.addEntry(dt + 'developer portal', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 178, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Developer Portal', 
			    		new mxGeometry(0, 0, 30, 21), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE0LjE0MzAxOTY3NjIwODQ5NiIgdmlld0JveD0iMCAwLjAwMDQ4OTk2NjI0NTM2ODEyMzEgMjAgMTQuMTQzMDE5Njc2MjA4NDk2Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qxe2ZpbGw6IzY2OWRmNjt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTAgMS40NzJhNS41OSA1LjU5IDAgMCAxIDQgMS42bDEtMWE3LjA3IDcuMDcgMCAwIDAtMTAgMGgwbDEgMWE1LjU5IDUuNTkgMCAwIDEgNC0xLjZ6bTAgMTEuMmE1LjU5IDUuNTkgMCAwIDEtNC0xLjZsLTEgMWE3LjA3IDcuMDcgMCAwIDAgMTAgMGgwbC0xLTFhNS41OSA1LjU5IDAgMCAxLTQgMS42eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xMCAxMC4xNDJhMy4wNiAzLjA2IDAgMCAxLTMtMi4zNEgzLjExdjIuMzhMMCA3LjA3MmwzLjExLTMuMXYyLjM4SDdhMy4wNiAzLjA2IDAgMCAxIDMtMi4zNGgwYTMuMDYgMy4wNiAwIDAgMSAzIDIuMzRoMy45MXYtMi4zOUwyMCA3LjA3MmwtMy4xMSAzLjEydi0yLjM5SDEzYTMuMDYgMy4wNiAwIDAgMS0zIDIuMzR6bTAtNC42OGExLjYxIDEuNjEgMCAxIDAgMS42MSAxLjYxaDBBMS42MSAxLjYxIDAgMCAwIDEwIDUuNDYyeiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 19.5);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Developer Portal');
			})
		);

		this.addPalette('gcp2API Management', 'GCP / API Management', false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addGCP2SecurityPalette = function()
	{
		var dt = 'gcp google cloud platform security ';
		var fns = [];
		
		fns.push(
			this.addEntry(dt + 'cloud iam', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 110, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Cloud\nIAM', 
			    		new mxGeometry(0, 0, 24, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE2LjQyMDAwMDA3NjI5Mzk0NSIgaGVpZ2h0PSIyMC4wNDk5OTkyMzcwNjA1NDciIGZpbGwtcnVsZT0iZXZlbm9kZCIgdmlld0JveD0iMCAwIDE2LjQyMDAwMDA3NjI5Mzk0NSAyMC4wNDk5OTkyMzcwNjA1NDciPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik04LjIxIDBMMCAzLjQydjUuNjNjMCA1LjA2IDMuNSA5LjggOC4yMSAxMSA0LjcxLTEuMTUgOC4yMS01Ljg5IDguMjEtMTAuOTVWMy40MnptMCAzLjc5YTIuNjMgMi42MyAwIDAgMSAxLjAwNSA1LjA2QTIuNjMgMi42MyAwIDAgMSA2LjM1IDQuNTZhMi42MyAyLjYzIDAgMCAxIDEuODYtLjc3em00LjExIDExLjE1YTguNjQgOC42NCAwIDAgMS00LjExIDIuOTMgOC42NCA4LjY0IDAgMCAxLTQuMTEtMi45M3YtMi4yNWMwLTEuNjcgMi43NC0yLjUyIDQuMTEtMi41MnM0LjExLjg1IDQuMTEgMi41MnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNOC4yMSAwdjMuNzlhMi42MyAyLjYzIDAgMSAxIDAgNS4yNnYxLjEyYzEuMzcgMCA0LjExLjg1IDQuMTEgMi41MnYyLjI1YTguNjQgOC42NCAwIDAgMS00LjExIDIuOTNWMjBjNC43MS0xLjE1IDguMjEtNS44OSA4LjIxLTEwLjk1VjMuNDJ6Ii8+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(18, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud IAM');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud iam', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 130, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud IAM', 
			    		new mxGeometry(0, 0, 24, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE2LjQyMDAwMDA3NjI5Mzk0NSIgaGVpZ2h0PSIyMC4wNDk5OTkyMzcwNjA1NDciIGZpbGwtcnVsZT0iZXZlbm9kZCIgdmlld0JveD0iMCAwIDE2LjQyMDAwMDA3NjI5Mzk0NSAyMC4wNDk5OTkyMzcwNjA1NDciPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik04LjIxIDBMMCAzLjQydjUuNjNjMCA1LjA2IDMuNSA5LjggOC4yMSAxMSA0LjcxLTEuMTUgOC4yMS01Ljg5IDguMjEtMTAuOTVWMy40MnptMCAzLjc5YTIuNjMgMi42MyAwIDAgMSAxLjAwNSA1LjA2QTIuNjMgMi42MyAwIDAgMSA2LjM1IDQuNTZhMi42MyAyLjYzIDAgMCAxIDEuODYtLjc3em00LjExIDExLjE1YTguNjQgOC42NCAwIDAgMS00LjExIDIuOTMgOC42NCA4LjY0IDAgMCAxLTQuMTEtMi45M3YtMi4yNWMwLTEuNjcgMi43NC0yLjUyIDQuMTEtMi41MnM0LjExLjg1IDQuMTEgMi41MnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNOC4yMSAwdjMuNzlhMi42MyAyLjYzIDAgMSAxIDAgNS4yNnYxLjEyYzEuMzcgMCA0LjExLjg1IDQuMTEgMi41MnYyLjI1YTguNjQgOC42NCAwIDAgMS00LjExIDIuOTNWMjBjNC43MS0xLjE1IDguMjEtNS44OSA4LjIxLTEwLjk1VjMuNDJ6Ii8+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(18, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud IAM');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud iam', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 138, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud IAM', 
			    		new mxGeometry(0, 0, 24, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE2LjQyMDAwMDA3NjI5Mzk0NSIgaGVpZ2h0PSIyMC4wNDk5OTkyMzcwNjA1NDciIGZpbGwtcnVsZT0iZXZlbm9kZCIgdmlld0JveD0iMCAwIDE2LjQyMDAwMDA3NjI5Mzk0NSAyMC4wNDk5OTkyMzcwNjA1NDciPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik04LjIxIDBMMCAzLjQydjUuNjNjMCA1LjA2IDMuNSA5LjggOC4yMSAxMSA0LjcxLTEuMTUgOC4yMS01Ljg5IDguMjEtMTAuOTVWMy40MnptMCAzLjc5YTIuNjMgMi42MyAwIDAgMSAxLjAwNSA1LjA2QTIuNjMgMi42MyAwIDAgMSA2LjM1IDQuNTZhMi42MyAyLjYzIDAgMCAxIDEuODYtLjc3em00LjExIDExLjE1YTguNjQgOC42NCAwIDAgMS00LjExIDIuOTMgOC42NCA4LjY0IDAgMCAxLTQuMTEtMi45M3YtMi4yNWMwLTEuNjcgMi43NC0yLjUyIDQuMTEtMi41MnM0LjExLjg1IDQuMTEgMi41MnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNOC4yMSAwdjMuNzlhMi42MyAyLjYzIDAgMSAxIDAgNS4yNnYxLjEyYzEuMzcgMCA0LjExLjg1IDQuMTEgMi41MnYyLjI1YTguNjQgOC42NCAwIDAgMS00LjExIDIuOTNWMjBjNC43MS0xLjE1IDguMjEtNS44OSA4LjIxLTEwLjk1VjMuNDJ6Ii8+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(18, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud IAM');
			})
		);

		fns.push(
			this.addEntry(dt + 'beyondcorp beyond corp', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 140, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('BeyondCorp', 
			    		new mxGeometry(0, 0, 28, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE4LjgyMzUxNDkzODM1NDQ5MiIgaGVpZ2h0PSIyMC4wNzA1Mzc1NjcxMzg2NzIiIHZpZXdCb3g9IjAuMDAwMDExMzM3Nzc3MzIzMjA1OTU1IDAuMDAwMDg1NjY1MDQ0MDI1NTE4IDE4LjgyMzUxNDkzODM1NDQ5MiAyMC4wNzA1Mzc1NjcxMzg2NzIiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTE2LjkzIDQuOTc2YTEwLjQzIDEwLjQzIDAgMCAxLTEgLjkyIDguMDkgOC4wOSAwIDAgMS0xMC41MSAxMS44MWgxLjc1YTcuNTEgNy41MSAwIDAgMS0uODYtMS4zSDMuNzNhOC43NSA4Ljc1IDAgMCAxLTEtMS4xOWgzLjA2YTEwLjM4IDEwLjM4IDAgMCAxLS4zNy0xLjMxSDIuMDFhOCA4IDAgMCAxLS40Mi0xLjE5aDMuNTdjLS4wNy0uNDItLjExLS44NS0uMTQtMS4zSDEuMzZhNi41MSA2LjUxIDAgMCAxIDAtLjc3di0uNDNoMy42M2ExMS4zNCAxMS4zNCAwIDAgMSAuMDgtMS4zSDEuNWE4LjE2IDguMTYgMCAwIDEgLjM2LTEuMTloMy40YTkuNTIgOS41MiAwIDAgMSAuMzMtMS4zSDIuNTJhOCA4IDAgMCAxIC45LTEuMTloMi42MWE5LjIgOS4yIDAgMCAxIC43MS0xLjMxSDQuOTJhOC4wNiA4LjA2IDAgMCAxIDcuNzQtLjY5IDEwLjcgMTAuNyAwIDAgMCAxLjI5IDMuMTlzMi45My0xLjY3IDMuMzgtMy40NGEyLjQyIDIuNDIgMCAwIDAtNC42OC0xLjIzdi4wN2E5LjQxIDkuNDEgMCAxIDAgNi4xNyA4LjgyIDguNzEgOC43MSAwIDAgMC0xLjg5LTUuNjd6bS0zLjAxLTIuOTJhMS4xNCAxLjE0IDAgMSAxIC44MSAxLjM5aDBhMS4xMyAxLjEzIDAgMCAxLS44MS0xLjM5eiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(16, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'BeyondCorp');
			})
		);

		fns.push(
			this.addEntry(dt + 'beyondcorp beyond corp', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 140, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>BeyondCorp', 
			    		new mxGeometry(0, 0, 28, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE4LjgyMzUxNDkzODM1NDQ5MiIgaGVpZ2h0PSIyMC4wNzA1Mzc1NjcxMzg2NzIiIHZpZXdCb3g9IjAuMDAwMDExMzM3Nzc3MzIzMjA1OTU1IDAuMDAwMDg1NjY1MDQ0MDI1NTE4IDE4LjgyMzUxNDkzODM1NDQ5MiAyMC4wNzA1Mzc1NjcxMzg2NzIiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTE2LjkzIDQuOTc2YTEwLjQzIDEwLjQzIDAgMCAxLTEgLjkyIDguMDkgOC4wOSAwIDAgMS0xMC41MSAxMS44MWgxLjc1YTcuNTEgNy41MSAwIDAgMS0uODYtMS4zSDMuNzNhOC43NSA4Ljc1IDAgMCAxLTEtMS4xOWgzLjA2YTEwLjM4IDEwLjM4IDAgMCAxLS4zNy0xLjMxSDIuMDFhOCA4IDAgMCAxLS40Mi0xLjE5aDMuNTdjLS4wNy0uNDItLjExLS44NS0uMTQtMS4zSDEuMzZhNi41MSA2LjUxIDAgMCAxIDAtLjc3di0uNDNoMy42M2ExMS4zNCAxMS4zNCAwIDAgMSAuMDgtMS4zSDEuNWE4LjE2IDguMTYgMCAwIDEgLjM2LTEuMTloMy40YTkuNTIgOS41MiAwIDAgMSAuMzMtMS4zSDIuNTJhOCA4IDAgMCAxIC45LTEuMTloMi42MWE5LjIgOS4yIDAgMCAxIC43MS0xLjMxSDQuOTJhOC4wNiA4LjA2IDAgMCAxIDcuNzQtLjY5IDEwLjcgMTAuNyAwIDAgMCAxLjI5IDMuMTlzMi45My0xLjY3IDMuMzgtMy40NGEyLjQyIDIuNDIgMCAwIDAtNC42OC0xLjIzdi4wN2E5LjQxIDkuNDEgMCAxIDAgNi4xNyA4LjgyIDguNzEgOC43MSAwIDAgMC0xLjg5LTUuNjd6bS0zLjAxLTIuOTJhMS4xNCAxLjE0IDAgMSAxIC44MSAxLjM5aDBhMS4xMyAxLjEzIDAgMCAxLS44MS0xLjM5eiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(16, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'BeyondCorp');
			})
		);

		fns.push(
			this.addEntry(dt + 'beyondcorp beyond corp', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 148, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>BeyondCorp', 
			    		new mxGeometry(0, 0, 28, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE4LjgyMzUxNDkzODM1NDQ5MiIgaGVpZ2h0PSIyMC4wNzA1Mzc1NjcxMzg2NzIiIHZpZXdCb3g9IjAuMDAwMDExMzM3Nzc3MzIzMjA1OTU1IDAuMDAwMDg1NjY1MDQ0MDI1NTE4IDE4LjgyMzUxNDkzODM1NDQ5MiAyMC4wNzA1Mzc1NjcxMzg2NzIiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTE2LjkzIDQuOTc2YTEwLjQzIDEwLjQzIDAgMCAxLTEgLjkyIDguMDkgOC4wOSAwIDAgMS0xMC41MSAxMS44MWgxLjc1YTcuNTEgNy41MSAwIDAgMS0uODYtMS4zSDMuNzNhOC43NSA4Ljc1IDAgMCAxLTEtMS4xOWgzLjA2YTEwLjM4IDEwLjM4IDAgMCAxLS4zNy0xLjMxSDIuMDFhOCA4IDAgMCAxLS40Mi0xLjE5aDMuNTdjLS4wNy0uNDItLjExLS44NS0uMTQtMS4zSDEuMzZhNi41MSA2LjUxIDAgMCAxIDAtLjc3di0uNDNoMy42M2ExMS4zNCAxMS4zNCAwIDAgMSAuMDgtMS4zSDEuNWE4LjE2IDguMTYgMCAwIDEgLjM2LTEuMTloMy40YTkuNTIgOS41MiAwIDAgMSAuMzMtMS4zSDIuNTJhOCA4IDAgMCAxIC45LTEuMTloMi42MWE5LjIgOS4yIDAgMCAxIC43MS0xLjMxSDQuOTJhOC4wNiA4LjA2IDAgMCAxIDcuNzQtLjY5IDEwLjcgMTAuNyAwIDAgMCAxLjI5IDMuMTlzMi45My0xLjY3IDMuMzgtMy40NGEyLjQyIDIuNDIgMCAwIDAtNC42OC0xLjIzdi4wN2E5LjQxIDkuNDEgMCAxIDAgNi4xNyA4LjgyIDguNzEgOC43MSAwIDAgMC0xLjg5LTUuNjd6bS0zLjAxLTIuOTJhMS4xNCAxLjE0IDAgMSAxIC44MSAxLjM5aDBhMS4xMyAxLjEzIDAgMCAxLS44MS0xLjM5eiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(16, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'BeyondCorp');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud resource manager', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 160, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Cloud Resource\nManager', 
			    		new mxGeometry(0, 0, 24, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE2LjQyMDAwMDA3NjI5Mzk0NSIgaGVpZ2h0PSIyMC4wNDk5OTkyMzcwNjA1NDciIGZpbGwtcnVsZT0iZXZlbm9kZCIgdmlld0JveD0iMCAwIDE2LjQyMDAwMDA3NjI5Mzk0NSAyMC4wNDk5OTkyMzcwNjA1NDciPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik04LjIxIDBMMCAzLjQydjUuNjNjMCA1LjA2IDMuNSA5LjggOC4yMSAxMSA0LjcxLTEuMTUgOC4yMS01Ljg5IDguMjEtMTAuOTVWMy40MnptMCAzLjc5YTIuNjMgMi42MyAwIDAgMSAxLjAwNSA1LjA2QTIuNjMgMi42MyAwIDAgMSA2LjM1IDQuNTZhMi42MyAyLjYzIDAgMCAxIDEuODYtLjc3em00LjExIDExLjE1YTguNjQgOC42NCAwIDAgMS00LjExIDIuOTMgOC42NCA4LjY0IDAgMCAxLTQuMTEtMi45M3YtMi4yNWMwLTEuNjcgMi43NC0yLjUyIDQuMTEtMi41MnM0LjExLjg1IDQuMTEgMi41MnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNOC4yMSAwdjMuNzlhMi42MyAyLjYzIDAgMSAxIDAgNS4yNnYxLjEyYzEuMzcgMCA0LjExLjg1IDQuMTEgMi41MnYyLjI1YTguNjQgOC42NCAwIDAgMS00LjExIDIuOTNWMjBjNC43MS0xLjE1IDguMjEtNS44OSA4LjIxLTEwLjk1VjMuNDJ6Ii8+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(18, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Resource Manager');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud resource manager', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 210, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Resource Manager', 
			    		new mxGeometry(0, 0, 24, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE2LjQyMDAwMDA3NjI5Mzk0NSIgaGVpZ2h0PSIyMC4wNDk5OTkyMzcwNjA1NDciIGZpbGwtcnVsZT0iZXZlbm9kZCIgdmlld0JveD0iMCAwIDE2LjQyMDAwMDA3NjI5Mzk0NSAyMC4wNDk5OTkyMzcwNjA1NDciPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik04LjIxIDBMMCAzLjQydjUuNjNjMCA1LjA2IDMuNSA5LjggOC4yMSAxMSA0LjcxLTEuMTUgOC4yMS01Ljg5IDguMjEtMTAuOTVWMy40MnptMCAzLjc5YTIuNjMgMi42MyAwIDAgMSAxLjAwNSA1LjA2QTIuNjMgMi42MyAwIDAgMSA2LjM1IDQuNTZhMi42MyAyLjYzIDAgMCAxIDEuODYtLjc3em00LjExIDExLjE1YTguNjQgOC42NCAwIDAgMS00LjExIDIuOTMgOC42NCA4LjY0IDAgMCAxLTQuMTEtMi45M3YtMi4yNWMwLTEuNjcgMi43NC0yLjUyIDQuMTEtMi41MnM0LjExLjg1IDQuMTEgMi41MnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNOC4yMSAwdjMuNzlhMi42MyAyLjYzIDAgMSAxIDAgNS4yNnYxLjEyYzEuMzcgMCA0LjExLjg1IDQuMTEgMi41MnYyLjI1YTguNjQgOC42NCAwIDAgMS00LjExIDIuOTNWMjBjNC43MS0xLjE1IDguMjEtNS44OSA4LjIxLTEwLjk1VjMuNDJ6Ii8+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(18, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Resource Manager');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud resource manager', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 218, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Resource Manager', 
			    		new mxGeometry(0, 0, 24, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE2LjQyMDAwMDA3NjI5Mzk0NSIgaGVpZ2h0PSIyMC4wNDk5OTkyMzcwNjA1NDciIGZpbGwtcnVsZT0iZXZlbm9kZCIgdmlld0JveD0iMCAwIDE2LjQyMDAwMDA3NjI5Mzk0NSAyMC4wNDk5OTkyMzcwNjA1NDciPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik04LjIxIDBMMCAzLjQydjUuNjNjMCA1LjA2IDMuNSA5LjggOC4yMSAxMSA0LjcxLTEuMTUgOC4yMS01Ljg5IDguMjEtMTAuOTVWMy40MnptMCAzLjc5YTIuNjMgMi42MyAwIDAgMSAxLjAwNSA1LjA2QTIuNjMgMi42MyAwIDAgMSA2LjM1IDQuNTZhMi42MyAyLjYzIDAgMCAxIDEuODYtLjc3em00LjExIDExLjE1YTguNjQgOC42NCAwIDAgMS00LjExIDIuOTMgOC42NCA4LjY0IDAgMCAxLTQuMTEtMi45M3YtMi4yNWMwLTEuNjcgMi43NC0yLjUyIDQuMTEtMi41MnM0LjExLjg1IDQuMTEgMi41MnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNOC4yMSAwdjMuNzlhMi42MyAyLjYzIDAgMSAxIDAgNS4yNnYxLjEyYzEuMzcgMCA0LjExLjg1IDQuMTEgMi41MnYyLjI1YTguNjQgOC42NCAwIDAgMS00LjExIDIuOTNWMjBjNC43MS0xLjE1IDguMjEtNS44OSA4LjIxLTEwLjk1VjMuNDJ6Ii8+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(18, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Resource Manager');
			})
		);

		fns.push(
			this.addEntry(dt + 'data loss prevention api application programming interface', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 160, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Data Loss\nPrevention API', 
			    		new mxGeometry(0, 0, 30, 22), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwLjAwMTcxNjYxMzc2OTUzIiBoZWlnaHQ9IjE0Ljc5ODEzMTk0Mjc0OTAyMyIgdmlld0JveD0iLTIuOTgwMjMyMjM4NzY5NTMxMmUtOCAtMC4wMDAxMzEyMzc1Mzg4ODA2Njg1OCAyMC4wMDE3MTY2MTM3Njk1MyAxNC43OTgxMzE5NDI3NDkwMjMiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTIuODYuODM4YTUuNDggNS40OCAwIDAgMC03LjA2IDEuMDYgNS4zMSA1LjMxIDAgMCAwLTEuMzQgMy42IDUuNDkgNS40OSAwIDAgMCAyLjQxIDQuNTNsLS4xNy4yOC0uNTYuMTYtMi4wNiAzLjQ4IDEuNDguODUgMi4wNS0zLjQ4LS4xNi0uNjEuMTQtLjI2YTUuNDkgNS40OSAwIDAgMCA1LjI3LTkuNjF6bS0xLjkyIDguM2EzLjc5IDMuNzkgMCAxIDEgMi42Ni00LjY1aDBhMy44IDMuOCAwIDAgMS0yLjY2IDQuNjV6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTS4wNSA0LjE3OGwuMTMtMS4wN2gxLjE4di4zNUguNTJ2LjQ1YS42OC42OCAwIDAgMSAuNzkuMTEuNzguNzggMCAwIDEgLjE3LjUzLjc3Ljc3IDAgMCAxLS4wOS4zNi41My41MyAwIDAgMS0uMjQuMjUuNjUuNjUgMCAwIDEtLjM4LjA5LjczLjczIDAgMCAxLS4zNi0uMDguNjYuNjYgMCAwIDEtLjI2LS4yMS42My42MyAwIDAgMS0uMTUtLjMyaC40MmEuMjcuMjcgMCAwIDAgLjA5LjIuMjUuMjUgMCAwIDAgLjIuMDcuMjMuMjMgMCAwIDAgLjIyLS4xLjQzLjQzIDAgMCAwIC4wNy0uMjkuMzcuMzcgMCAwIDAtLjA5LS4yNy4zMy4zMyAwIDAgMC0uMjUtLjEuNDEuNDEgMCAwIDAtLjI0LjA4aDB6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTMuNDUgNS4yMThIM3YtMS42MWwtLjUxLjE1di0uMzZsLjg4LS4zMWgwek0xIDguMDU4SC41OXYtMS42MWwtLjUuMTV2LS4zNGwuOTEtLjMxaDB6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTMuODYgNy4xODhhMS4xMyAxLjEzIDAgMCAxLS4xOC42Ny43NC43NCAwIDAgMS0xIDBoMGExIDEgMCAwIDEtLjE5LS42NXYtLjM5YTEuMDYgMS4wNiAwIDAgMSAuMTgtLjY3LjczLjczIDAgMCAxIDEgMGgwYTEuMDggMS4wOCAwIDAgMSAuMTkuNjV6bS0uNDItLjQzYS44My44MyAwIDAgMC0uMDctLjM2LjI1LjI1IDAgMCAwLS4yMy0uMTIuMjQuMjQgMCAwIDAtLjIyLjExLjc1Ljc1IDAgMCAwLS4wNy4zNnYuNTFhLjg1Ljg1IDAgMCAwIC4wNy4zOS4yMy4yMyAwIDAgMCAuMjMuMTIuMjMuMjMgMCAwIDAgLjIyLS4xMi43Ny43NyAwIDAgMCAuMDctLjM3eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xNy4xMyA1LjEzOGgtLjQxdi0xLjYybC0uNTEuMTZ2LS4zNGwuODgtLjMyaDB6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTE4LjYyIDQuMDk4bC4xMy0xLjA3aDEuMTh2LjM3aC0uODRsLS4wOS40M2EuNjUuNjUgMCAwIDEgLjMxLS4wOC42My42MyAwIDAgMSAuNDguMTkuNzQuNzQgMCAwIDEgLjE3LjUyLjgxLjgxIDAgMCAxLS4wOS4zNy42LjYgMCAwIDEtLjI1LjI1Ljc5Ljc5IDAgMCAxLS4zOC4wOS44NS44NSAwIDAgMS0uMzUtLjA4LjYyLjYyIDAgMCAxLS4yNi0uMjIuNTguNTggMCAwIDEtLjEtLjMySDE5YS4zNS4zNSAwIDAgMCAuMS4yMS4yOS4yOSAwIDAgMCAuMi4wNy4yNi4yNiAwIDAgMCAuMjItLjEuNDQuNDQgMCAwIDAgLjA2LS4zMy40MS40MSAwIDAgMC0uMDktLjI4LjM0LjM0IDAgMCAwLS4yNS0uMDkuMzQuMzQgMCAwIDAtLjI0LjA3aDB6bS0xLjA4IDMuMDlhMS4xMyAxLjEzIDAgMCAxLS4xOC42Ny43NC43NCAwIDAgMS0xIDBoMGExIDEgMCAwIDEtLjE5LS42NXYtLjM5YTEuMDYgMS4wNiAwIDAgMSAuMTgtLjY3LjczLjczIDAgMCAxIDEgMGgwYTEuMDggMS4wOCAwIDAgMSAuMTkuNjV6bS0uNDItLjQzYS44My44MyAwIDAgMC0uMDctLjM4LjI1LjI1IDAgMCAwLS4yMy0uMTIuMjQuMjQgMCAwIDAtLjIyLjExLjc1Ljc1IDAgMCAwLS4wNy4zNnYuNTFhLjg1Ljg1IDAgMCAwIC4wNy4zOS4yMy4yMyAwIDAgMCAuMjMuMTIuMjMuMjMgMCAwIDAgLjIyLS4xMi45LjkgMCAwIDAgLjA3LS4zN3oiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMTguNjIgNy4wMThsLjEzLTEuMDdoMS4xOHYuMzVoLS44NGwtLjA1LjQ1YS42NS42NSAwIDAgMSAuMzEtLjA4LjYzLjYzIDAgMCAxIC40OC4xOS43OC43OCAwIDAgMSAuMTcuNTQuNzcuNzcgMCAwIDEtLjA5LjM2LjUxLjUxIDAgMCAxLS4yNS4yNS42OS42OSAwIDAgMS0uMzguMDkuNzIuNzIgMCAwIDEtLjM1LS4wOC41OS41OSAwIDAgMS0uMjYtLjIxLjYzLjYzIDAgMCAxLS4xLS4zMkgxOWEuMzIuMzIgMCAwIDAgLjEuMi4yNS4yNSAwIDAgMCAuMi4wNy4yMy4yMyAwIDAgMCAuMjItLjEuNDMuNDMgMCAwIDAgLjA4LS4yOS4zNy4zNyAwIDAgMC0uMDktLjI3LjMxLjMxIDAgMCAwLS4yNS0uMS4zNS4zNSAwIDAgMC0uMjQuMDhoMHoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNNy43MyA3LjUwOHYtLjk0YS44Ni44NiAwIDAgMSAuMzUtLjYyIDIuNDMgMi40MyAwIDAgMSAuODMtLjQzIDIuODcgMi44NyAwIDAgMSAyLjQyLjI4IDEuMDUgMS4wNSAwIDAgMSAuMjcuMi45LjkgMCAwIDEgLjMuNzV2Ljc2em0yLjA4LTIuNjFhMS4wOCAxLjA4IDAgMSAxIDEuMDgtMS4wN2gwYTEuMDkgMS4wOSAwIDAgMS0xLjA4IDEuMDd6Ii8+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 19);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Data Loss Prevention API');
			})
		);

		fns.push(
			this.addEntry(dt + 'data loss prevention api application programming interface', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 210, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Data Loss Prevention API', 
			    		new mxGeometry(0, 0, 30, 22), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwLjAwMTcxNjYxMzc2OTUzIiBoZWlnaHQ9IjE0Ljc5ODEzMTk0Mjc0OTAyMyIgdmlld0JveD0iLTIuOTgwMjMyMjM4NzY5NTMxMmUtOCAtMC4wMDAxMzEyMzc1Mzg4ODA2Njg1OCAyMC4wMDE3MTY2MTM3Njk1MyAxNC43OTgxMzE5NDI3NDkwMjMiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTIuODYuODM4YTUuNDggNS40OCAwIDAgMC03LjA2IDEuMDYgNS4zMSA1LjMxIDAgMCAwLTEuMzQgMy42IDUuNDkgNS40OSAwIDAgMCAyLjQxIDQuNTNsLS4xNy4yOC0uNTYuMTYtMi4wNiAzLjQ4IDEuNDguODUgMi4wNS0zLjQ4LS4xNi0uNjEuMTQtLjI2YTUuNDkgNS40OSAwIDAgMCA1LjI3LTkuNjF6bS0xLjkyIDguM2EzLjc5IDMuNzkgMCAxIDEgMi42Ni00LjY1aDBhMy44IDMuOCAwIDAgMS0yLjY2IDQuNjV6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTS4wNSA0LjE3OGwuMTMtMS4wN2gxLjE4di4zNUguNTJ2LjQ1YS42OC42OCAwIDAgMSAuNzkuMTEuNzguNzggMCAwIDEgLjE3LjUzLjc3Ljc3IDAgMCAxLS4wOS4zNi41My41MyAwIDAgMS0uMjQuMjUuNjUuNjUgMCAwIDEtLjM4LjA5LjczLjczIDAgMCAxLS4zNi0uMDguNjYuNjYgMCAwIDEtLjI2LS4yMS42My42MyAwIDAgMS0uMTUtLjMyaC40MmEuMjcuMjcgMCAwIDAgLjA5LjIuMjUuMjUgMCAwIDAgLjIuMDcuMjMuMjMgMCAwIDAgLjIyLS4xLjQzLjQzIDAgMCAwIC4wNy0uMjkuMzcuMzcgMCAwIDAtLjA5LS4yNy4zMy4zMyAwIDAgMC0uMjUtLjEuNDEuNDEgMCAwIDAtLjI0LjA4aDB6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTMuNDUgNS4yMThIM3YtMS42MWwtLjUxLjE1di0uMzZsLjg4LS4zMWgwek0xIDguMDU4SC41OXYtMS42MWwtLjUuMTV2LS4zNGwuOTEtLjMxaDB6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTMuODYgNy4xODhhMS4xMyAxLjEzIDAgMCAxLS4xOC42Ny43NC43NCAwIDAgMS0xIDBoMGExIDEgMCAwIDEtLjE5LS42NXYtLjM5YTEuMDYgMS4wNiAwIDAgMSAuMTgtLjY3LjczLjczIDAgMCAxIDEgMGgwYTEuMDggMS4wOCAwIDAgMSAuMTkuNjV6bS0uNDItLjQzYS44My44MyAwIDAgMC0uMDctLjM2LjI1LjI1IDAgMCAwLS4yMy0uMTIuMjQuMjQgMCAwIDAtLjIyLjExLjc1Ljc1IDAgMCAwLS4wNy4zNnYuNTFhLjg1Ljg1IDAgMCAwIC4wNy4zOS4yMy4yMyAwIDAgMCAuMjMuMTIuMjMuMjMgMCAwIDAgLjIyLS4xMi43Ny43NyAwIDAgMCAuMDctLjM3eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xNy4xMyA1LjEzOGgtLjQxdi0xLjYybC0uNTEuMTZ2LS4zNGwuODgtLjMyaDB6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTE4LjYyIDQuMDk4bC4xMy0xLjA3aDEuMTh2LjM3aC0uODRsLS4wOS40M2EuNjUuNjUgMCAwIDEgLjMxLS4wOC42My42MyAwIDAgMSAuNDguMTkuNzQuNzQgMCAwIDEgLjE3LjUyLjgxLjgxIDAgMCAxLS4wOS4zNy42LjYgMCAwIDEtLjI1LjI1Ljc5Ljc5IDAgMCAxLS4zOC4wOS44NS44NSAwIDAgMS0uMzUtLjA4LjYyLjYyIDAgMCAxLS4yNi0uMjIuNTguNTggMCAwIDEtLjEtLjMySDE5YS4zNS4zNSAwIDAgMCAuMS4yMS4yOS4yOSAwIDAgMCAuMi4wNy4yNi4yNiAwIDAgMCAuMjItLjEuNDQuNDQgMCAwIDAgLjA2LS4zMy40MS40MSAwIDAgMC0uMDktLjI4LjM0LjM0IDAgMCAwLS4yNS0uMDkuMzQuMzQgMCAwIDAtLjI0LjA3aDB6bS0xLjA4IDMuMDlhMS4xMyAxLjEzIDAgMCAxLS4xOC42Ny43NC43NCAwIDAgMS0xIDBoMGExIDEgMCAwIDEtLjE5LS42NXYtLjM5YTEuMDYgMS4wNiAwIDAgMSAuMTgtLjY3LjczLjczIDAgMCAxIDEgMGgwYTEuMDggMS4wOCAwIDAgMSAuMTkuNjV6bS0uNDItLjQzYS44My44MyAwIDAgMC0uMDctLjM4LjI1LjI1IDAgMCAwLS4yMy0uMTIuMjQuMjQgMCAwIDAtLjIyLjExLjc1Ljc1IDAgMCAwLS4wNy4zNnYuNTFhLjg1Ljg1IDAgMCAwIC4wNy4zOS4yMy4yMyAwIDAgMCAuMjMuMTIuMjMuMjMgMCAwIDAgLjIyLS4xMi45LjkgMCAwIDAgLjA3LS4zN3oiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMTguNjIgNy4wMThsLjEzLTEuMDdoMS4xOHYuMzVoLS44NGwtLjA1LjQ1YS42NS42NSAwIDAgMSAuMzEtLjA4LjYzLjYzIDAgMCAxIC40OC4xOS43OC43OCAwIDAgMSAuMTcuNTQuNzcuNzcgMCAwIDEtLjA5LjM2LjUxLjUxIDAgMCAxLS4yNS4yNS42OS42OSAwIDAgMS0uMzguMDkuNzIuNzIgMCAwIDEtLjM1LS4wOC41OS41OSAwIDAgMS0uMjYtLjIxLjYzLjYzIDAgMCAxLS4xLS4zMkgxOWEuMzIuMzIgMCAwIDAgLjEuMi4yNS4yNSAwIDAgMCAuMi4wNy4yMy4yMyAwIDAgMCAuMjItLjEuNDMuNDMgMCAwIDAgLjA4LS4yOS4zNy4zNyAwIDAgMC0uMDktLjI3LjMxLjMxIDAgMCAwLS4yNS0uMS4zNS4zNSAwIDAgMC0uMjQuMDhoMHoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNNy43MyA3LjUwOHYtLjk0YS44Ni44NiAwIDAgMSAuMzUtLjYyIDIuNDMgMi40MyAwIDAgMSAuODMtLjQzIDIuODcgMi44NyAwIDAgMSAyLjQyLjI4IDEuMDUgMS4wNSAwIDAgMSAuMjcuMi45LjkgMCAwIDEgLjMuNzV2Ljc2em0yLjA4LTIuNjFhMS4wOCAxLjA4IDAgMSAxIDEuMDgtMS4wN2gwYTEuMDkgMS4wOSAwIDAgMS0xLjA4IDEuMDd6Ii8+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 19);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Data Loss Prevention API');
			})
		);

		fns.push(
			this.addEntry(dt + 'data loss prevention api application programming interface', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 218, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Data Loss Prevention API', 
			    		new mxGeometry(0, 0, 30, 22), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwLjAwMTcxNjYxMzc2OTUzIiBoZWlnaHQ9IjE0Ljc5ODEzMTk0Mjc0OTAyMyIgdmlld0JveD0iLTIuOTgwMjMyMjM4NzY5NTMxMmUtOCAtMC4wMDAxMzEyMzc1Mzg4ODA2Njg1OCAyMC4wMDE3MTY2MTM3Njk1MyAxNC43OTgxMzE5NDI3NDkwMjMiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTIuODYuODM4YTUuNDggNS40OCAwIDAgMC03LjA2IDEuMDYgNS4zMSA1LjMxIDAgMCAwLTEuMzQgMy42IDUuNDkgNS40OSAwIDAgMCAyLjQxIDQuNTNsLS4xNy4yOC0uNTYuMTYtMi4wNiAzLjQ4IDEuNDguODUgMi4wNS0zLjQ4LS4xNi0uNjEuMTQtLjI2YTUuNDkgNS40OSAwIDAgMCA1LjI3LTkuNjF6bS0xLjkyIDguM2EzLjc5IDMuNzkgMCAxIDEgMi42Ni00LjY1aDBhMy44IDMuOCAwIDAgMS0yLjY2IDQuNjV6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTS4wNSA0LjE3OGwuMTMtMS4wN2gxLjE4di4zNUguNTJ2LjQ1YS42OC42OCAwIDAgMSAuNzkuMTEuNzguNzggMCAwIDEgLjE3LjUzLjc3Ljc3IDAgMCAxLS4wOS4zNi41My41MyAwIDAgMS0uMjQuMjUuNjUuNjUgMCAwIDEtLjM4LjA5LjczLjczIDAgMCAxLS4zNi0uMDguNjYuNjYgMCAwIDEtLjI2LS4yMS42My42MyAwIDAgMS0uMTUtLjMyaC40MmEuMjcuMjcgMCAwIDAgLjA5LjIuMjUuMjUgMCAwIDAgLjIuMDcuMjMuMjMgMCAwIDAgLjIyLS4xLjQzLjQzIDAgMCAwIC4wNy0uMjkuMzcuMzcgMCAwIDAtLjA5LS4yNy4zMy4zMyAwIDAgMC0uMjUtLjEuNDEuNDEgMCAwIDAtLjI0LjA4aDB6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTMuNDUgNS4yMThIM3YtMS42MWwtLjUxLjE1di0uMzZsLjg4LS4zMWgwek0xIDguMDU4SC41OXYtMS42MWwtLjUuMTV2LS4zNGwuOTEtLjMxaDB6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTMuODYgNy4xODhhMS4xMyAxLjEzIDAgMCAxLS4xOC42Ny43NC43NCAwIDAgMS0xIDBoMGExIDEgMCAwIDEtLjE5LS42NXYtLjM5YTEuMDYgMS4wNiAwIDAgMSAuMTgtLjY3LjczLjczIDAgMCAxIDEgMGgwYTEuMDggMS4wOCAwIDAgMSAuMTkuNjV6bS0uNDItLjQzYS44My44MyAwIDAgMC0uMDctLjM2LjI1LjI1IDAgMCAwLS4yMy0uMTIuMjQuMjQgMCAwIDAtLjIyLjExLjc1Ljc1IDAgMCAwLS4wNy4zNnYuNTFhLjg1Ljg1IDAgMCAwIC4wNy4zOS4yMy4yMyAwIDAgMCAuMjMuMTIuMjMuMjMgMCAwIDAgLjIyLS4xMi43Ny43NyAwIDAgMCAuMDctLjM3eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xNy4xMyA1LjEzOGgtLjQxdi0xLjYybC0uNTEuMTZ2LS4zNGwuODgtLjMyaDB6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTE4LjYyIDQuMDk4bC4xMy0xLjA3aDEuMTh2LjM3aC0uODRsLS4wOS40M2EuNjUuNjUgMCAwIDEgLjMxLS4wOC42My42MyAwIDAgMSAuNDguMTkuNzQuNzQgMCAwIDEgLjE3LjUyLjgxLjgxIDAgMCAxLS4wOS4zNy42LjYgMCAwIDEtLjI1LjI1Ljc5Ljc5IDAgMCAxLS4zOC4wOS44NS44NSAwIDAgMS0uMzUtLjA4LjYyLjYyIDAgMCAxLS4yNi0uMjIuNTguNTggMCAwIDEtLjEtLjMySDE5YS4zNS4zNSAwIDAgMCAuMS4yMS4yOS4yOSAwIDAgMCAuMi4wNy4yNi4yNiAwIDAgMCAuMjItLjEuNDQuNDQgMCAwIDAgLjA2LS4zMy40MS40MSAwIDAgMC0uMDktLjI4LjM0LjM0IDAgMCAwLS4yNS0uMDkuMzQuMzQgMCAwIDAtLjI0LjA3aDB6bS0xLjA4IDMuMDlhMS4xMyAxLjEzIDAgMCAxLS4xOC42Ny43NC43NCAwIDAgMS0xIDBoMGExIDEgMCAwIDEtLjE5LS42NXYtLjM5YTEuMDYgMS4wNiAwIDAgMSAuMTgtLjY3LjczLjczIDAgMCAxIDEgMGgwYTEuMDggMS4wOCAwIDAgMSAuMTkuNjV6bS0uNDItLjQzYS44My44MyAwIDAgMC0uMDctLjM4LjI1LjI1IDAgMCAwLS4yMy0uMTIuMjQuMjQgMCAwIDAtLjIyLjExLjc1Ljc1IDAgMCAwLS4wNy4zNnYuNTFhLjg1Ljg1IDAgMCAwIC4wNy4zOS4yMy4yMyAwIDAgMCAuMjMuMTIuMjMuMjMgMCAwIDAgLjIyLS4xMi45LjkgMCAwIDAgLjA3LS4zN3oiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMTguNjIgNy4wMThsLjEzLTEuMDdoMS4xOHYuMzVoLS44NGwtLjA1LjQ1YS42NS42NSAwIDAgMSAuMzEtLjA4LjYzLjYzIDAgMCAxIC40OC4xOS43OC43OCAwIDAgMSAuMTcuNTQuNzcuNzcgMCAwIDEtLjA5LjM2LjUxLjUxIDAgMCAxLS4yNS4yNS42OS42OSAwIDAgMS0uMzguMDkuNzIuNzIgMCAwIDEtLjM1LS4wOC41OS41OSAwIDAgMS0uMjYtLjIxLjYzLjYzIDAgMCAxLS4xLS4zMkgxOWEuMzIuMzIgMCAwIDAgLjEuMi4yNS4yNSAwIDAgMCAuMi4wNy4yMy4yMyAwIDAgMCAuMjItLjEuNDMuNDMgMCAwIDAgLjA4LS4yOS4zNy4zNyAwIDAgMC0uMDktLjI3LjMxLjMxIDAgMCAwLS4yNS0uMS4zNS4zNSAwIDAgMC0uMjQuMDhoMHoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNNy43MyA3LjUwOHYtLjk0YS44Ni44NiAwIDAgMSAuMzUtLjYyIDIuNDMgMi40MyAwIDAgMSAuODMtLjQzIDIuODcgMi44NyAwIDAgMSAyLjQyLjI4IDEuMDUgMS4wNSAwIDAgMSAuMjcuMi45LjkgMCAwIDEgLjMuNzV2Ljc2em0yLjA4LTIuNjFhMS4wOCAxLjA4IDAgMSAxIDEuMDgtMS4wN2gwYTEuMDkgMS4wOSAwIDAgMS0xLjA4IDEuMDd6Ii8+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 19);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Data Loss Prevention API');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud security scanner', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 150, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Cloud Security\nScanner', 
			    		new mxGeometry(0, 0, 30, 24), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE3LjI3OTk5ODc3OTI5Njg3NSIgdmlld0JveD0iMCAwIDIwIDE3LjI3OTk5ODc3OTI5Njg3NSI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJLnN0MXtmaWxsOiM2NjlkZjY7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPGNpcmNsZSBjbGFzcz0ic3QwIiBjeD0iOS40NCIgY3k9IjguMTQiIHI9IjIuOTciLz4mI3hhOwk8ZyBjbGFzcz0ic3QxIj4mI3hhOwkJPGNpcmNsZSBjeD0iMi4wMiIgY3k9IjcuNDMiIHI9IjIuMDIiLz4mI3hhOwkJPGNpcmNsZSBjeD0iMTIuNTIiIGN5PSIxNS4yNiIgcj0iMi4wMiIvPiYjeGE7CQk8cGF0aCBkPSJNMTcuNTcuODRBMi40MyAyLjQzIDAgMSAwIDIwIDMuMjcgMi40MyAyLjQzIDAgMCAwIDE3LjU3Ljg0em0wIDMuOGExLjM3IDEuMzcgMCAxIDEgMS4zNi0xLjM3aDBhMS4zNyAxLjM3IDAgMCAxLTEuMzYgMS4zN3oiLz4mI3hhOwkJPHBhdGggZD0iTTE2LjIgMy4zMkE4LjI5IDguMjkgMCAwIDAgMTEuMTQgMGwtLjI4IDEuMzRhNi45NSA2Ljk1IDAgMSAxLTguMjIgNS4zOCA2Ljg4IDYuODggMCAwIDEgMS44Ny0zLjQ3bC0xLTFhOC4zMSA4LjMxIDAgMSAwIDEzLjM4IDIuMiAxLjM2IDEuMzYgMCAwIDEtLjY5LTEuMTN6Ii8+JiN4YTsJPC9nPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 18);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Security Scanner');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud security scanner', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 200, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Security Scanner', 
			    		new mxGeometry(0, 0, 30, 24), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE3LjI3OTk5ODc3OTI5Njg3NSIgdmlld0JveD0iMCAwIDIwIDE3LjI3OTk5ODc3OTI5Njg3NSI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJLnN0MXtmaWxsOiM2NjlkZjY7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPGNpcmNsZSBjbGFzcz0ic3QwIiBjeD0iOS40NCIgY3k9IjguMTQiIHI9IjIuOTciLz4mI3hhOwk8ZyBjbGFzcz0ic3QxIj4mI3hhOwkJPGNpcmNsZSBjeD0iMi4wMiIgY3k9IjcuNDMiIHI9IjIuMDIiLz4mI3hhOwkJPGNpcmNsZSBjeD0iMTIuNTIiIGN5PSIxNS4yNiIgcj0iMi4wMiIvPiYjeGE7CQk8cGF0aCBkPSJNMTcuNTcuODRBMi40MyAyLjQzIDAgMSAwIDIwIDMuMjcgMi40MyAyLjQzIDAgMCAwIDE3LjU3Ljg0em0wIDMuOGExLjM3IDEuMzcgMCAxIDEgMS4zNi0xLjM3aDBhMS4zNyAxLjM3IDAgMCAxLTEuMzYgMS4zN3oiLz4mI3hhOwkJPHBhdGggZD0iTTE2LjIgMy4zMkE4LjI5IDguMjkgMCAwIDAgMTEuMTQgMGwtLjI4IDEuMzRhNi45NSA2Ljk1IDAgMSAxLTguMjIgNS4zOCA2Ljg4IDYuODggMCAwIDEgMS44Ny0zLjQ3bC0xLTFhOC4zMSA4LjMxIDAgMSAwIDEzLjM4IDIuMiAxLjM2IDEuMzYgMCAwIDEtLjY5LTEuMTN6Ii8+JiN4YTsJPC9nPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 18);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Security Scanner');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud security scanner', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 208, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Security Scanner', 
			    		new mxGeometry(0, 0, 30, 24), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE3LjI3OTk5ODc3OTI5Njg3NSIgdmlld0JveD0iMCAwIDIwIDE3LjI3OTk5ODc3OTI5Njg3NSI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJLnN0MXtmaWxsOiM2NjlkZjY7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPGNpcmNsZSBjbGFzcz0ic3QwIiBjeD0iOS40NCIgY3k9IjguMTQiIHI9IjIuOTciLz4mI3hhOwk8ZyBjbGFzcz0ic3QxIj4mI3hhOwkJPGNpcmNsZSBjeD0iMi4wMiIgY3k9IjcuNDMiIHI9IjIuMDIiLz4mI3hhOwkJPGNpcmNsZSBjeD0iMTIuNTIiIGN5PSIxNS4yNiIgcj0iMi4wMiIvPiYjeGE7CQk8cGF0aCBkPSJNMTcuNTcuODRBMi40MyAyLjQzIDAgMSAwIDIwIDMuMjcgMi40MyAyLjQzIDAgMCAwIDE3LjU3Ljg0em0wIDMuOGExLjM3IDEuMzcgMCAxIDEgMS4zNi0xLjM3aDBhMS4zNyAxLjM3IDAgMCAxLTEuMzYgMS4zN3oiLz4mI3hhOwkJPHBhdGggZD0iTTE2LjIgMy4zMkE4LjI5IDguMjkgMCAwIDAgMTEuMTQgMGwtLjI4IDEuMzRhNi45NSA2Ljk1IDAgMSAxLTguMjIgNS4zOCA2Ljg4IDYuODggMCAwIDEgMS44Ny0zLjQ3bC0xLTFhOC4zMSA4LjMxIDAgMSAwIDEzLjM4IDIuMiAxLjM2IDEuMzYgMCAwIDEtLjY5LTEuMTN6Ii8+JiN4YTsJPC9nPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 18);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Security Scanner');
			})
		);

		fns.push(
			this.addEntry(dt + 'key management service', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 170, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Key Management\nService', 
			    		new mxGeometry(0, 0, 24, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjMxMC43NzU2MDY1NDM4NjAyNSIgaGVpZ2h0PSIzNzcuOTUzMDI4ODM1NTI1NDYiIHZpZXdCb3g9Ii0wLjE0MDAwMDAwMDU5NjA0NjQ1IC0wLjQ2NzAwMDAwNzYyOTM5NDUzIDgyLjIyNTk5NzkyNDgwNDY5IDEwMC4wMDAwMDc2MjkzOTQ1MyI+JiN4YTs8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qxe2ZpbGw6IzY2OWRmNjt9JiN4YTsJLnN0MntmaWxsOiNmZmY7fSYjeGE7PC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDAuOTczLS40NjdsNDEuMTEzIDE3LjQ5M3YyOS42NTRjMCAyNy40MTgtMjQuNjA4IDUwLjgzNi00MS4xMTMgNTIuODUzeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik00MC45NzMtLjQ2N0wtLjE0IDE3LjAyNXYyOS42NTRjMCAyNy40MTggMjQuNjA4IDUwLjgzNiA0MS4xMTMgNTIuODUzeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik00MS4yNTMgMTYuNjA1Yy05LjU4NCAwLTE3LjQ0NSA3Ljg2Mi0xNy40NDUgMTcuNDQ1IDAgOC4wODQgNS41OTQgMTQuOTQyIDEzLjA5NiAxNi44OTF2OS40ODhoLTkuODY5djguNzAxaDkuODY5djUuMzc3aC02LjMxNXY4LjcwMWg2LjMxNXYyLjE5N2g4LjcwMVY1MC45NDFDNTMuMTA2IDQ4Ljk5MiA1OC43IDQyLjEzNCA1OC43IDM0LjA1YzAtOS41ODQtNy44NjMtMTcuNDQ1LTE3LjQ0Ny0xNy40NDV6bTAgOC42OTlBOC42OCA4LjY4IDAgMCAxIDUwIDM0LjA1YTguNjggOC42OCAwIDAgMS04Ljc0OCA4Ljc0NiA4LjY4IDguNjggMCAwIDEtOC43NDYtOC43NDYgOC42OCA4LjY4IDAgMCAxIDguNzQ2LTguNzQ2eiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(18, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Key Management Service');
			})
		);

		fns.push(
			this.addEntry(dt + 'key management service', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 210, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Key Management Service', 
			    		new mxGeometry(0, 0, 24, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjMxMC43NzU2MDY1NDM4NjAyNSIgaGVpZ2h0PSIzNzcuOTUzMDI4ODM1NTI1NDYiIHZpZXdCb3g9Ii0wLjE0MDAwMDAwMDU5NjA0NjQ1IC0wLjQ2NzAwMDAwNzYyOTM5NDUzIDgyLjIyNTk5NzkyNDgwNDY5IDEwMC4wMDAwMDc2MjkzOTQ1MyI+JiN4YTs8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qxe2ZpbGw6IzY2OWRmNjt9JiN4YTsJLnN0MntmaWxsOiNmZmY7fSYjeGE7PC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDAuOTczLS40NjdsNDEuMTEzIDE3LjQ5M3YyOS42NTRjMCAyNy40MTgtMjQuNjA4IDUwLjgzNi00MS4xMTMgNTIuODUzeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik00MC45NzMtLjQ2N0wtLjE0IDE3LjAyNXYyOS42NTRjMCAyNy40MTggMjQuNjA4IDUwLjgzNiA0MS4xMTMgNTIuODUzeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik00MS4yNTMgMTYuNjA1Yy05LjU4NCAwLTE3LjQ0NSA3Ljg2Mi0xNy40NDUgMTcuNDQ1IDAgOC4wODQgNS41OTQgMTQuOTQyIDEzLjA5NiAxNi44OTF2OS40ODhoLTkuODY5djguNzAxaDkuODY5djUuMzc3aC02LjMxNXY4LjcwMWg2LjMxNXYyLjE5N2g4LjcwMVY1MC45NDFDNTMuMTA2IDQ4Ljk5MiA1OC43IDQyLjEzNCA1OC43IDM0LjA1YzAtOS41ODQtNy44NjMtMTcuNDQ1LTE3LjQ0Ny0xNy40NDV6bTAgOC42OTlBOC42OCA4LjY4IDAgMCAxIDUwIDM0LjA1YTguNjggOC42OCAwIDAgMS04Ljc0OCA4Ljc0NiA4LjY4IDguNjggMCAwIDEtOC43NDYtOC43NDYgOC42OCA4LjY4IDAgMCAxIDguNzQ2LTguNzQ2eiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(18, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Key Management Service');
			})
		);

		fns.push(
			this.addEntry(dt + 'key management service', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 218, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Key Management Service', 
			    		new mxGeometry(0, 0, 24, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjMxMC43NzU2MDY1NDM4NjAyNSIgaGVpZ2h0PSIzNzcuOTUzMDI4ODM1NTI1NDYiIHZpZXdCb3g9Ii0wLjE0MDAwMDAwMDU5NjA0NjQ1IC0wLjQ2NzAwMDAwNzYyOTM5NDUzIDgyLjIyNTk5NzkyNDgwNDY5IDEwMC4wMDAwMDc2MjkzOTQ1MyI+JiN4YTs8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qxe2ZpbGw6IzY2OWRmNjt9JiN4YTsJLnN0MntmaWxsOiNmZmY7fSYjeGE7PC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDAuOTczLS40NjdsNDEuMTEzIDE3LjQ5M3YyOS42NTRjMCAyNy40MTgtMjQuNjA4IDUwLjgzNi00MS4xMTMgNTIuODUzeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik00MC45NzMtLjQ2N0wtLjE0IDE3LjAyNXYyOS42NTRjMCAyNy40MTggMjQuNjA4IDUwLjgzNiA0MS4xMTMgNTIuODUzeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik00MS4yNTMgMTYuNjA1Yy05LjU4NCAwLTE3LjQ0NSA3Ljg2Mi0xNy40NDUgMTcuNDQ1IDAgOC4wODQgNS41OTQgMTQuOTQyIDEzLjA5NiAxNi44OTF2OS40ODhoLTkuODY5djguNzAxaDkuODY5djUuMzc3aC02LjMxNXY4LjcwMWg2LjMxNXYyLjE5N2g4LjcwMVY1MC45NDFDNTMuMTA2IDQ4Ljk5MiA1OC43IDQyLjEzNCA1OC43IDM0LjA1YzAtOS41ODQtNy44NjMtMTcuNDQ1LTE3LjQ0Ny0xNy40NDV6bTAgOC42OTlBOC42OCA4LjY4IDAgMCAxIDUwIDM0LjA1YTguNjggOC42OCAwIDAgMS04Ljc0OCA4Ljc0NiA4LjY4IDguNjggMCAwIDEtOC43NDYtOC43NDYgOC42OCA4LjY4IDAgMCAxIDguNzQ2LTguNzQ2eiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(18, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Key Management Service');
			})
		);

		fns.push(
			this.addEntry(dt + 'identity aware proxy', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 150, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Identity-Aware\nProxy', 
			    		new mxGeometry(0, 0, 30, 15), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE5Ljk5IiBoZWlnaHQ9IjEwLjQxIiB2aWV3Qm94PSIwIDAgMTkuOTkgMTAuNDEiPiYjeGE7CTxwYXRoIGQ9Ik05Ljg0LjIxYTUuMSA1LjEgMCAxIDAgNS4xIDUuMWgwYTUuMSA1LjEgMCAwIDAtNS4xLTUuMXptMCA5LjA4YTQgNCAwIDEgMSA0LTRoMGE0IDQgMCAwIDEtNCA0LjAxeiIgZmlsbD0iIzQyODVmNCIvPiYjeGE7CTxwYXRoIGQ9Ik0xMS43NiA1LjkyYTIuMDkgMi4wOSAwIDAgMC0uMjgtLjIyIDMuMTEgMy4xMSAwIDAgMC0yLjYxLS4yOCAyLjMxIDIuMzEgMCAwIDAtLjg5LjQ3Ljg2Ljg2IDAgMCAwLS4zNy42NXYxaDQuNDd2LS44MmExIDEgMCAwIDAtLjMyLS44ek05Ljg0IDQuNzRhMS4xNiAxLjE2IDAgMSAwLTEuMTctMS4xNWgwYTEuMTcgMS4xNyAwIDAgMCAxLjE3IDEuMTV6IiBmaWxsPSIjNjY5ZGY2Ii8+JiN4YTsJPHBhdGggZD0iTTE2LjI5IDUuNmgyLjIxbC0uNzcuNzhoMS4wNGwxLjIyLTEuMjMtMS4yMi0xLjIyaC0xLjA0bC43Ny43N2gtMi4yMXoiIGZpbGw9IiNhZWNiZmEiLz4mI3hhOwk8cGF0aCBkPSJNMTcuODggMS43M1YwaC0xLjczbC0uNzMuNzRoMS4wOWwtLjk4Ljk3LjY0LjY0Ljk4LS45N3YxLjA5em0tMi40NiA3Ljk1bC43My43M2gxLjczVjguNjhsLS43My0uNzN2MS4wOWwtLjk4LS45Ny0uNjQuNjMuOTguOTh6TTEuMzQgMy44NkExLjM1IDEuMzUgMCAxIDAgMi43IDUuMjFhMS4zNSAxLjM1IDAgMCAwLTEuMzYtMS4zNXptMCAyLjFhLjc2Ljc2IDAgMSAxIC43Ni0uNzVoMGEuNzYuNzYgMCAwIDEtLjc2Ljc1eiIgZmlsbD0iIzY2OWRmNiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 22);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Identity-Aware Proxy');
			})
		);

		fns.push(
			this.addEntry(dt + 'identity aware proxy', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 190, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Identity-Aware Proxy', 
			    		new mxGeometry(0, 0, 30, 15), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE5Ljk5IiBoZWlnaHQ9IjEwLjQxIiB2aWV3Qm94PSIwIDAgMTkuOTkgMTAuNDEiPiYjeGE7CTxwYXRoIGQ9Ik05Ljg0LjIxYTUuMSA1LjEgMCAxIDAgNS4xIDUuMWgwYTUuMSA1LjEgMCAwIDAtNS4xLTUuMXptMCA5LjA4YTQgNCAwIDEgMSA0LTRoMGE0IDQgMCAwIDEtNCA0LjAxeiIgZmlsbD0iIzQyODVmNCIvPiYjeGE7CTxwYXRoIGQ9Ik0xMS43NiA1LjkyYTIuMDkgMi4wOSAwIDAgMC0uMjgtLjIyIDMuMTEgMy4xMSAwIDAgMC0yLjYxLS4yOCAyLjMxIDIuMzEgMCAwIDAtLjg5LjQ3Ljg2Ljg2IDAgMCAwLS4zNy42NXYxaDQuNDd2LS44MmExIDEgMCAwIDAtLjMyLS44ek05Ljg0IDQuNzRhMS4xNiAxLjE2IDAgMSAwLTEuMTctMS4xNWgwYTEuMTcgMS4xNyAwIDAgMCAxLjE3IDEuMTV6IiBmaWxsPSIjNjY5ZGY2Ii8+JiN4YTsJPHBhdGggZD0iTTE2LjI5IDUuNmgyLjIxbC0uNzcuNzhoMS4wNGwxLjIyLTEuMjMtMS4yMi0xLjIyaC0xLjA0bC43Ny43N2gtMi4yMXoiIGZpbGw9IiNhZWNiZmEiLz4mI3hhOwk8cGF0aCBkPSJNMTcuODggMS43M1YwaC0xLjczbC0uNzMuNzRoMS4wOWwtLjk4Ljk3LjY0LjY0Ljk4LS45N3YxLjA5em0tMi40NiA3Ljk1bC43My43M2gxLjczVjguNjhsLS43My0uNzN2MS4wOWwtLjk4LS45Ny0uNjQuNjMuOTguOTh6TTEuMzQgMy44NkExLjM1IDEuMzUgMCAxIDAgMi43IDUuMjFhMS4zNSAxLjM1IDAgMCAwLTEuMzYtMS4zNXptMCAyLjFhLjc2Ljc2IDAgMSAxIC43Ni0uNzVoMGEuNzYuNzYgMCAwIDEtLjc2Ljc1eiIgZmlsbD0iIzY2OWRmNiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 22);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Identity-Aware Proxy');
			})
		);

		fns.push(
			this.addEntry(dt + 'identity aware proxy', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 198, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Identity-Aware Proxy', 
			    		new mxGeometry(0, 0, 30, 15), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE5Ljk5IiBoZWlnaHQ9IjEwLjQxIiB2aWV3Qm94PSIwIDAgMTkuOTkgMTAuNDEiPiYjeGE7CTxwYXRoIGQ9Ik05Ljg0LjIxYTUuMSA1LjEgMCAxIDAgNS4xIDUuMWgwYTUuMSA1LjEgMCAwIDAtNS4xLTUuMXptMCA5LjA4YTQgNCAwIDEgMSA0LTRoMGE0IDQgMCAwIDEtNCA0LjAxeiIgZmlsbD0iIzQyODVmNCIvPiYjeGE7CTxwYXRoIGQ9Ik0xMS43NiA1LjkyYTIuMDkgMi4wOSAwIDAgMC0uMjgtLjIyIDMuMTEgMy4xMSAwIDAgMC0yLjYxLS4yOCAyLjMxIDIuMzEgMCAwIDAtLjg5LjQ3Ljg2Ljg2IDAgMCAwLS4zNy42NXYxaDQuNDd2LS44MmExIDEgMCAwIDAtLjMyLS44ek05Ljg0IDQuNzRhMS4xNiAxLjE2IDAgMSAwLTEuMTctMS4xNWgwYTEuMTcgMS4xNyAwIDAgMCAxLjE3IDEuMTV6IiBmaWxsPSIjNjY5ZGY2Ii8+JiN4YTsJPHBhdGggZD0iTTE2LjI5IDUuNmgyLjIxbC0uNzcuNzhoMS4wNGwxLjIyLTEuMjMtMS4yMi0xLjIyaC0xLjA0bC43Ny43N2gtMi4yMXoiIGZpbGw9IiNhZWNiZmEiLz4mI3hhOwk8cGF0aCBkPSJNMTcuODggMS43M1YwaC0xLjczbC0uNzMuNzRoMS4wOWwtLjk4Ljk3LjY0LjY0Ljk4LS45N3YxLjA5em0tMi40NiA3Ljk1bC43My43M2gxLjczVjguNjhsLS43My0uNzN2MS4wOWwtLjk4LS45Ny0uNjQuNjMuOTguOTh6TTEuMzQgMy44NkExLjM1IDEuMzUgMCAxIDAgMi43IDUuMjFhMS4zNSAxLjM1IDAgMCAwLTEuMzYtMS4zNXptMCAyLjFhLjc2Ljc2IDAgMSAxIC43Ni0uNzVoMGEuNzYuNzYgMCAwIDEtLjc2Ljc1eiIgZmlsbD0iIzY2OWRmNiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 22);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Identity-Aware Proxy');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud security command center', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 170, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Cloud Security\nCommand Center', 
			    		new mxGeometry(0, 0, 26, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE3LjE4MDAwMDMwNTE3NTc4IiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMTcuMTgwMDAwMzA1MTc1NzggMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik05LjkgNC44NWE1LjIzIDUuMjMgMCAwIDEgMy43NSAzLjc1aDMuNTNWMy4yNEw5LjkgMHpNMy41MiA4LjYxYTUuMjIgNS4yMiAwIDAgMSAzLjc1LTMuNzVWMEwwIDMuMjR2NS4zN3pNNy4yOCAxNWE1LjIzIDUuMjMgMCAwIDEtMy43NS0zLjc1SC4yMkExMiAxMiAwIDAgMCA3LjI4IDIwem02LjM4LTMuNzVBNS4yMyA1LjIzIDAgMCAxIDkuOTEgMTV2NWExMiAxMiAwIDAgMCA3LjA1LTguNzV6Ii8+JiN4YTsJPGNpcmNsZSBjbGFzcz0ic3QxIiBjeD0iOC41OSIgY3k9IjkuOTIiIHI9IjIuNjMiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(17, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Security Command Center');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud security command center', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 250, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Security Command Center', 
			    		new mxGeometry(0, 0, 26, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE3LjE4MDAwMDMwNTE3NTc4IiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMTcuMTgwMDAwMzA1MTc1NzggMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik05LjkgNC44NWE1LjIzIDUuMjMgMCAwIDEgMy43NSAzLjc1aDMuNTNWMy4yNEw5LjkgMHpNMy41MiA4LjYxYTUuMjIgNS4yMiAwIDAgMSAzLjc1LTMuNzVWMEwwIDMuMjR2NS4zN3pNNy4yOCAxNWE1LjIzIDUuMjMgMCAwIDEtMy43NS0zLjc1SC4yMkExMiAxMiAwIDAgMCA3LjI4IDIwem02LjM4LTMuNzVBNS4yMyA1LjIzIDAgMCAxIDkuOTEgMTV2NWExMiAxMiAwIDAgMCA3LjA1LTguNzV6Ii8+JiN4YTsJPGNpcmNsZSBjbGFzcz0ic3QxIiBjeD0iOC41OSIgY3k9IjkuOTIiIHI9IjIuNjMiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(17, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Security Command Center');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud security command center', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 258, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Security Command Center', 
			    		new mxGeometry(0, 0, 26, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE3LjE4MDAwMDMwNTE3NTc4IiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMTcuMTgwMDAwMzA1MTc1NzggMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik05LjkgNC44NWE1LjIzIDUuMjMgMCAwIDEgMy43NSAzLjc1aDMuNTNWMy4yNEw5LjkgMHpNMy41MiA4LjYxYTUuMjIgNS4yMiAwIDAgMSAzLjc1LTMuNzVWMEwwIDMuMjR2NS4zN3pNNy4yOCAxNWE1LjIzIDUuMjMgMCAwIDEtMy43NS0zLjc1SC4yMkExMiAxMiAwIDAgMCA3LjI4IDIwem02LjM4LTMuNzVBNS4yMyA1LjIzIDAgMCAxIDkuOTEgMTV2NWExMiAxMiAwIDAgMCA3LjA1LTguNzV6Ii8+JiN4YTsJPGNpcmNsZSBjbGFzcz0ic3QxIiBjeD0iOC41OSIgY3k9IjkuOTIiIHI9IjIuNjMiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(17, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Security Command Center');
			})
		);

		fns.push(
			this.addEntry(dt + 'security key enforcement', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 140, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Security Key\nEnforcement', 
			    		new mxGeometry(0, 0, 24, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE1LjcyMyIgaGVpZ2h0PSIxOS45ODYiIHZpZXdCb3g9IjAgMCAxNS43MjMgMTkuOTg2Ij4mI3hhOwk8cGF0aCBkPSJNMy42MzQgMTQuNTg2di0zLjc1YzAtLjE1LS4yOS0uMzQtLjQ5LS40M2E1LjQ2IDUuNDYgMCAxIDEgNy40NC02LjgzIDUuNCA1LjQgMCAwIDEtMi43MyA2Ljc5LjgyLjgyIDAgMCAwLS41NC45djguNzJoLTMuNjh2LTEuNzVILjAyNHYtMy42NXptMy42NC05LjExYTEuODIgMS44MiAwIDEgMC0zLjY0LS4wNiAxLjgzIDEuODMgMCAwIDAgMS44IDEuODVoMGExLjg0IDEuODQgMCAwIDAgMS44My0xLjc5eiIgZmlsbD0iIzQyODVmNCIvPiYjeGE7CTxwYXRoIGQ9Ik0xNS4zNzQgMy41NzZhNS40NCA1LjQ0IDAgMCAwLTYuMzItMy40NCA1LjQ0IDUuNDQgMCAwIDEgMS4xMyAxMC4yMy44NC44NCAwIDAgMC0uNTUuOXY4LjcyaDIuNDN2LTguNzFhLjgzLjgzIDAgMCAxIC41NS0uOSA1LjQgNS40IDAgMCAwIDIuNzYtNi44eiIgZmlsbD0iIzY2OWRmNiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(18, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Security Key Enforcement');
			})
		);

		fns.push(
			this.addEntry(dt + 'security key enforcement', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 210, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Security Key Enforcement', 
			    		new mxGeometry(0, 0, 24, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE1LjcyMyIgaGVpZ2h0PSIxOS45ODYiIHZpZXdCb3g9IjAgMCAxNS43MjMgMTkuOTg2Ij4mI3hhOwk8cGF0aCBkPSJNMy42MzQgMTQuNTg2di0zLjc1YzAtLjE1LS4yOS0uMzQtLjQ5LS40M2E1LjQ2IDUuNDYgMCAxIDEgNy40NC02LjgzIDUuNCA1LjQgMCAwIDEtMi43MyA2Ljc5LjgyLjgyIDAgMCAwLS41NC45djguNzJoLTMuNjh2LTEuNzVILjAyNHYtMy42NXptMy42NC05LjExYTEuODIgMS44MiAwIDEgMC0zLjY0LS4wNiAxLjgzIDEuODMgMCAwIDAgMS44IDEuODVoMGExLjg0IDEuODQgMCAwIDAgMS44My0xLjc5eiIgZmlsbD0iIzQyODVmNCIvPiYjeGE7CTxwYXRoIGQ9Ik0xNS4zNzQgMy41NzZhNS40NCA1LjQ0IDAgMCAwLTYuMzItMy40NCA1LjQ0IDUuNDQgMCAwIDEgMS4xMyAxMC4yMy44NC44NCAwIDAgMC0uNTUuOXY4LjcyaDIuNDN2LTguNzFhLjgzLjgzIDAgMCAxIC41NS0uOSA1LjQgNS40IDAgMCAwIDIuNzYtNi44eiIgZmlsbD0iIzY2OWRmNiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(18, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Security Key Enforcement');
			})
		);

		fns.push(
			this.addEntry(dt + 'security key enforcement', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 218, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Security Key Enforcement', 
			    		new mxGeometry(0, 0, 24, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE1LjcyMyIgaGVpZ2h0PSIxOS45ODYiIHZpZXdCb3g9IjAgMCAxNS43MjMgMTkuOTg2Ij4mI3hhOwk8cGF0aCBkPSJNMy42MzQgMTQuNTg2di0zLjc1YzAtLjE1LS4yOS0uMzQtLjQ5LS40M2E1LjQ2IDUuNDYgMCAxIDEgNy40NC02LjgzIDUuNCA1LjQgMCAwIDEtMi43MyA2Ljc5LjgyLjgyIDAgMCAwLS41NC45djguNzJoLTMuNjh2LTEuNzVILjAyNHYtMy42NXptMy42NC05LjExYTEuODIgMS44MiAwIDEgMC0zLjY0LS4wNiAxLjgzIDEuODMgMCAwIDAgMS44IDEuODVoMGExLjg0IDEuODQgMCAwIDAgMS44My0xLjc5eiIgZmlsbD0iIzQyODVmNCIvPiYjeGE7CTxwYXRoIGQ9Ik0xNS4zNzQgMy41NzZhNS40NCA1LjQ0IDAgMCAwLTYuMzItMy40NCA1LjQ0IDUuNDQgMCAwIDEgMS4xMyAxMC4yMy44NC44NCAwIDAgMC0uNTUuOXY4LjcyaDIuNDN2LTguNzFhLjgzLjgzIDAgMCAxIC41NS0uOSA1LjQgNS40IDAgMCAwIDIuNzYtNi44eiIgZmlsbD0iIzY2OWRmNiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(18, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Security Key Enforcement');
			})
		);

		this.addPalette('gcp2Security', 'GCP / Security', false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};

	Sidebar.prototype.addGCP2DataAnalyticsPalette = function()
	{
		var dt = 'gcp google cloud platform data analytics ';
		var fns = [];
		
		fns.push(
			this.addEntry(dt + 'bigquery big query', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 130, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('BigQuery', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwLjAwMTA0NTIyNzA1MDc4IiBoZWlnaHQ9IjIwLjAwMTA0NTIyNzA1MDc4IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHZpZXdCb3g9IjAgMCAyMC4wMDEwNDUyMjcwNTA3OCAyMC4wMDEwNDUyMjcwNTA3OCI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6I2FlY2JmYTt9JiN4YTsJLnN0MXtmaWxsOiM2NjlkZjY7fSYjeGE7CS5zdDJ7ZmlsbDojNDI4NWY0O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00LjczIDguODN2Mi42M2E0LjkxIDQuOTEgMCAwIDAgMS43MSAxLjc0VjguODN6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTcuODkgNi40MXY3LjUzQTcuNjIgNy42MiAwIDAgMCA5IDE0YTggOCAwIDAgMCAxIDBWNi40MXoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTEuNjQgOS44NnYzLjI5YTUgNSAwIDAgMCAxLjctMS44MlY5Ljg2eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xNS43NCAxNC4zMmwtMS40MiAxLjQyYS40Mi40MiAwIDAgMCAwIC42bDMuNTQgMy41NGEuNDIuNDIgMCAwIDAgLjU5IDBsMS40My0xLjQzYS40Mi40MiAwIDAgMCAwLS41OWwtMy41NC0zLjU0YS40Mi40MiAwIDAgMC0uNiAwIi8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTkgMGE5IDkgMCAxIDAgMCAxOEE5IDkgMCAxIDAgOSAwbTAgMTUuNjlhNi42OCA2LjY4IDAgMCAxIC4wMDctMTMuMzYgNi42OCA2LjY4IDAgMCAxIDQuNzI3IDExLjQwM0E2LjY4IDYuNjggMCAwIDEgOSAxNS42OSIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'BigQuery');
			})
		);

		fns.push(
			this.addEntry(dt + 'bigquery big query', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 130, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>BigQuery', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwLjAwMTA0NTIyNzA1MDc4IiBoZWlnaHQ9IjIwLjAwMTA0NTIyNzA1MDc4IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHZpZXdCb3g9IjAgMCAyMC4wMDEwNDUyMjcwNTA3OCAyMC4wMDEwNDUyMjcwNTA3OCI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6I2FlY2JmYTt9JiN4YTsJLnN0MXtmaWxsOiM2NjlkZjY7fSYjeGE7CS5zdDJ7ZmlsbDojNDI4NWY0O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00LjczIDguODN2Mi42M2E0LjkxIDQuOTEgMCAwIDAgMS43MSAxLjc0VjguODN6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTcuODkgNi40MXY3LjUzQTcuNjIgNy42MiAwIDAgMCA5IDE0YTggOCAwIDAgMCAxIDBWNi40MXoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTEuNjQgOS44NnYzLjI5YTUgNSAwIDAgMCAxLjctMS44MlY5Ljg2eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xNS43NCAxNC4zMmwtMS40MiAxLjQyYS40Mi40MiAwIDAgMCAwIC42bDMuNTQgMy41NGEuNDIuNDIgMCAwIDAgLjU5IDBsMS40My0xLjQzYS40Mi40MiAwIDAgMCAwLS41OWwtMy41NC0zLjU0YS40Mi40MiAwIDAgMC0uNiAwIi8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTkgMGE5IDkgMCAxIDAgMCAxOEE5IDkgMCAxIDAgOSAwbTAgMTUuNjlhNi42OCA2LjY4IDAgMCAxIC4wMDctMTMuMzYgNi42OCA2LjY4IDAgMCAxIDQuNzI3IDExLjQwM0E2LjY4IDYuNjggMCAwIDEgOSAxNS42OSIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'BigQuery');
			})
		);

		fns.push(
			this.addEntry(dt + 'bigquery big query', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 128, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>BigQuery', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwLjAwMTA0NTIyNzA1MDc4IiBoZWlnaHQ9IjIwLjAwMTA0NTIyNzA1MDc4IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHZpZXdCb3g9IjAgMCAyMC4wMDEwNDUyMjcwNTA3OCAyMC4wMDEwNDUyMjcwNTA3OCI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6I2FlY2JmYTt9JiN4YTsJLnN0MXtmaWxsOiM2NjlkZjY7fSYjeGE7CS5zdDJ7ZmlsbDojNDI4NWY0O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00LjczIDguODN2Mi42M2E0LjkxIDQuOTEgMCAwIDAgMS43MSAxLjc0VjguODN6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTcuODkgNi40MXY3LjUzQTcuNjIgNy42MiAwIDAgMCA5IDE0YTggOCAwIDAgMCAxIDBWNi40MXoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTEuNjQgOS44NnYzLjI5YTUgNSAwIDAgMCAxLjctMS44MlY5Ljg2eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xNS43NCAxNC4zMmwtMS40MiAxLjQyYS40Mi40MiAwIDAgMCAwIC42bDMuNTQgMy41NGEuNDIuNDIgMCAwIDAgLjU5IDBsMS40My0xLjQzYS40Mi40MiAwIDAgMCAwLS41OWwtMy41NC0zLjU0YS40Mi40MiAwIDAgMC0uNiAwIi8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTkgMGE5IDkgMCAxIDAgMCAxOEE5IDkgMCAxIDAgOSAwbTAgMTUuNjlhNi42OCA2LjY4IDAgMCAxIC4wMDctMTMuMzYgNi42OCA2LjY4IDAgMCAxIDQuNzI3IDExLjQwM0E2LjY4IDYuNjggMCAwIDEgOSAxNS42OSIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'BigQuery');
			})
		);

		fns.push(
			this.addEntry(dt + 'datalab', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 110, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Datalab', 
			    		new mxGeometry(0, 0, 20, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjI3MS44OTgxMDE4MDY2NDA2IiBoZWlnaHQ9IjQyMy4wMDQwMjgzMjAzMTI1IiB2aWV3Qm94PSIwLjAwMDQ2MTI3MDM2MzMwMjkwMTQgMCAyNzEuODk4MTAxODA2NjQwNiA0MjMuMDA0MDI4MzIwMzEyNSI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDtmaWxsLXJ1bGU6ZXZlbm9kZH0mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xOTcuMzc4IDE0NC43NzRhMy4xMSAzLjExIDAgMCAxIDMuMTA1IDIuOTM0bC4wMDUuMTc3djE3LjEwN2EzLjExIDMuMTEgMCAwIDEtMi45MzQgMy4xMDVsLS4xNzcuMDA1aC0xMi40NDF2MzAuNjQ5YzAgMS4yMjcuMjk3IDIuNDM1Ljg2MiAzLjUyMmwuMTYxLjI5MyA4My44OTUgMTQ0LjI2MmExNS4yNiAxNS4yNiAwIDAgMSAuMTgyIDE0LjkzNmwtLjE4Mi4zMjQtMzAuNDMxIDUzLjI4NmExNS4yNiAxNS4yNiAwIDAgMS0xMi44NjEgNy42MjZsLS4zNTUuMDA0SDQ1LjY5MmExNS4yNiAxNS4yNiAwIDAgMS0xMy4wMzUtNy4zMjRsLS4xODEtLjMwNS0zMC40MzEtNTMuMjg2YTE1LjI2IDE1LjI2IDAgMCAxLS4xODItMTQuOTM2bC4xODItLjMyNCA4My42NzQtMTQ0LjI2MmMuNjIxLTEuMDc3IDEuMTYtMi4yODkgMS4yMzQtMy41MjhsLjAwOS0uMjg3di0zMC42NDlINzQuNTJjLTEuNjU4IDAtMy4wMTQtMS4yOTktMy4xMDUtMi45MzRsLS4wMDUtLjE3NnYtMTcuMTA3YTMuMTEgMy4xMSAwIDAgMSAyLjkzNC0zLjEwNWwuMTc2LS4wMDV6bS0zNS43NjkgMjMuMzI3aC01MS4zMnYzNS40MDVjMCAyLjUzMS0uNjI4IDUuMDE4LTEuODI2IDcuMjQybC0uMjE3LjM5TDI4LjAzMyAzNTAuOWE3LjYzIDcuNjMgMCAwIDAtLjEzOSA3LjM3NWwuMTQxLjI1NSAyMC43NDEgMzUuOTIxYTcuNjMgNy42MyAwIDAgMCA2LjMyNyAzLjgxbC4yODEuMDA1aDI1LjU3MmwtMjIuNjA1LTM5LjE1M2MtMS4zMTQtMi4yNzYtMS4zNjEtNS4wNjItLjE0MS03LjM3NWwuMTQxLS4yNTUgMTkuNjc5LTM0LjA4NmgxNDYuNjA2TDIxMi45ODggMjk3LjFoLTU0LjI1OWwtOC44MjEtMTUuMjc4aDU0LjMxMmwtMTYuMzMzLTI4LjQ2aC01NC43OGwtOC44MjEtMTUuMjc4aDU0LjgzM2wtMTUuNDY1LTI2Ljk0NmExNS4yNyAxNS4yNyAwIDAgMS0yLjAzOS03LjE4NWwtLjAwNy0uNDQ2em03Mi44NDQgMTY2LjQwMWwtNTQuMTgxLjAwMSA4LjgyMSAxNS41NTJoNTQuMjg1ek0xMDQuOTIxIDc5Ljc5NWM4LjQyNyAwIDE1LjI1OSA2LjgzMyAxNS4yNTkgMTUuMjYxcy02LjgzMiAxNS4yNTktMTUuMjU5IDE1LjI1OS0xNS4yNTktNi44MzItMTUuMjU5LTE1LjI1OSA2LjgzMi0xNS4yNjEgMTUuMjU5LTE1LjI2MXptNTcuNTc1LTMyLjc0M2MxMi42NDIgMCAyMi44OSAxMC4yNDcgMjIuODkgMjIuODg5cy0xMC4yNDkgMjIuODg5LTIyLjg5IDIyLjg4OS0yMi44ODktMTAuMjQ5LTIyLjg4OS0yMi44ODkgMTAuMjQ3LTIyLjg4OSAyMi44ODktMjIuODg5ek0xMjcuODEgMGM4LjQyNyAwIDE1LjI2MSA2LjgzMyAxNS4yNjEgMTUuMjYxUzEzNi4yMzcgMzAuNTIgMTI3LjgxIDMwLjUycy0xNS4yNTktNi44MzItMTUuMjU5LTE1LjI1OVMxMTkuMzg0IDAgMTI3LjgxIDB6Ii8+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(20, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Datalab');
			})
		);

		fns.push(
			this.addEntry(dt + 'datalab', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 110, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Datalab', 
			    		new mxGeometry(0, 0, 20, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjI3MS44OTgxMDE4MDY2NDA2IiBoZWlnaHQ9IjQyMy4wMDQwMjgzMjAzMTI1IiB2aWV3Qm94PSIwLjAwMDQ2MTI3MDM2MzMwMjkwMTQgMCAyNzEuODk4MTAxODA2NjQwNiA0MjMuMDA0MDI4MzIwMzEyNSI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDtmaWxsLXJ1bGU6ZXZlbm9kZH0mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xOTcuMzc4IDE0NC43NzRhMy4xMSAzLjExIDAgMCAxIDMuMTA1IDIuOTM0bC4wMDUuMTc3djE3LjEwN2EzLjExIDMuMTEgMCAwIDEtMi45MzQgMy4xMDVsLS4xNzcuMDA1aC0xMi40NDF2MzAuNjQ5YzAgMS4yMjcuMjk3IDIuNDM1Ljg2MiAzLjUyMmwuMTYxLjI5MyA4My44OTUgMTQ0LjI2MmExNS4yNiAxNS4yNiAwIDAgMSAuMTgyIDE0LjkzNmwtLjE4Mi4zMjQtMzAuNDMxIDUzLjI4NmExNS4yNiAxNS4yNiAwIDAgMS0xMi44NjEgNy42MjZsLS4zNTUuMDA0SDQ1LjY5MmExNS4yNiAxNS4yNiAwIDAgMS0xMy4wMzUtNy4zMjRsLS4xODEtLjMwNS0zMC40MzEtNTMuMjg2YTE1LjI2IDE1LjI2IDAgMCAxLS4xODItMTQuOTM2bC4xODItLjMyNCA4My42NzQtMTQ0LjI2MmMuNjIxLTEuMDc3IDEuMTYtMi4yODkgMS4yMzQtMy41MjhsLjAwOS0uMjg3di0zMC42NDlINzQuNTJjLTEuNjU4IDAtMy4wMTQtMS4yOTktMy4xMDUtMi45MzRsLS4wMDUtLjE3NnYtMTcuMTA3YTMuMTEgMy4xMSAwIDAgMSAyLjkzNC0zLjEwNWwuMTc2LS4wMDV6bS0zNS43NjkgMjMuMzI3aC01MS4zMnYzNS40MDVjMCAyLjUzMS0uNjI4IDUuMDE4LTEuODI2IDcuMjQybC0uMjE3LjM5TDI4LjAzMyAzNTAuOWE3LjYzIDcuNjMgMCAwIDAtLjEzOSA3LjM3NWwuMTQxLjI1NSAyMC43NDEgMzUuOTIxYTcuNjMgNy42MyAwIDAgMCA2LjMyNyAzLjgxbC4yODEuMDA1aDI1LjU3MmwtMjIuNjA1LTM5LjE1M2MtMS4zMTQtMi4yNzYtMS4zNjEtNS4wNjItLjE0MS03LjM3NWwuMTQxLS4yNTUgMTkuNjc5LTM0LjA4NmgxNDYuNjA2TDIxMi45ODggMjk3LjFoLTU0LjI1OWwtOC44MjEtMTUuMjc4aDU0LjMxMmwtMTYuMzMzLTI4LjQ2aC01NC43OGwtOC44MjEtMTUuMjc4aDU0LjgzM2wtMTUuNDY1LTI2Ljk0NmExNS4yNyAxNS4yNyAwIDAgMS0yLjAzOS03LjE4NWwtLjAwNy0uNDQ2em03Mi44NDQgMTY2LjQwMWwtNTQuMTgxLjAwMSA4LjgyMSAxNS41NTJoNTQuMjg1ek0xMDQuOTIxIDc5Ljc5NWM4LjQyNyAwIDE1LjI1OSA2LjgzMyAxNS4yNTkgMTUuMjYxcy02LjgzMiAxNS4yNTktMTUuMjU5IDE1LjI1OS0xNS4yNTktNi44MzItMTUuMjU5LTE1LjI1OSA2LjgzMi0xNS4yNjEgMTUuMjU5LTE1LjI2MXptNTcuNTc1LTMyLjc0M2MxMi42NDIgMCAyMi44OSAxMC4yNDcgMjIuODkgMjIuODg5cy0xMC4yNDkgMjIuODg5LTIyLjg5IDIyLjg4OS0yMi44ODktMTAuMjQ5LTIyLjg4OS0yMi44ODkgMTAuMjQ3LTIyLjg4OSAyMi44ODktMjIuODg5ek0xMjcuODEgMGM4LjQyNyAwIDE1LjI2MSA2LjgzMyAxNS4yNjEgMTUuMjYxUzEzNi4yMzcgMzAuNTIgMTI3LjgxIDMwLjUycy0xNS4yNTktNi44MzItMTUuMjU5LTE1LjI1OVMxMTkuMzg0IDAgMTI3LjgxIDB6Ii8+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(20, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Datalab');
			})
		);

		fns.push(
			this.addEntry(dt + 'datalab', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 118, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Datalab', 
			    		new mxGeometry(0, 0, 20, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjI3MS44OTgxMDE4MDY2NDA2IiBoZWlnaHQ9IjQyMy4wMDQwMjgzMjAzMTI1IiB2aWV3Qm94PSIwLjAwMDQ2MTI3MDM2MzMwMjkwMTQgMCAyNzEuODk4MTAxODA2NjQwNiA0MjMuMDA0MDI4MzIwMzEyNSI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDtmaWxsLXJ1bGU6ZXZlbm9kZH0mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xOTcuMzc4IDE0NC43NzRhMy4xMSAzLjExIDAgMCAxIDMuMTA1IDIuOTM0bC4wMDUuMTc3djE3LjEwN2EzLjExIDMuMTEgMCAwIDEtMi45MzQgMy4xMDVsLS4xNzcuMDA1aC0xMi40NDF2MzAuNjQ5YzAgMS4yMjcuMjk3IDIuNDM1Ljg2MiAzLjUyMmwuMTYxLjI5MyA4My44OTUgMTQ0LjI2MmExNS4yNiAxNS4yNiAwIDAgMSAuMTgyIDE0LjkzNmwtLjE4Mi4zMjQtMzAuNDMxIDUzLjI4NmExNS4yNiAxNS4yNiAwIDAgMS0xMi44NjEgNy42MjZsLS4zNTUuMDA0SDQ1LjY5MmExNS4yNiAxNS4yNiAwIDAgMS0xMy4wMzUtNy4zMjRsLS4xODEtLjMwNS0zMC40MzEtNTMuMjg2YTE1LjI2IDE1LjI2IDAgMCAxLS4xODItMTQuOTM2bC4xODItLjMyNCA4My42NzQtMTQ0LjI2MmMuNjIxLTEuMDc3IDEuMTYtMi4yODkgMS4yMzQtMy41MjhsLjAwOS0uMjg3di0zMC42NDlINzQuNTJjLTEuNjU4IDAtMy4wMTQtMS4yOTktMy4xMDUtMi45MzRsLS4wMDUtLjE3NnYtMTcuMTA3YTMuMTEgMy4xMSAwIDAgMSAyLjkzNC0zLjEwNWwuMTc2LS4wMDV6bS0zNS43NjkgMjMuMzI3aC01MS4zMnYzNS40MDVjMCAyLjUzMS0uNjI4IDUuMDE4LTEuODI2IDcuMjQybC0uMjE3LjM5TDI4LjAzMyAzNTAuOWE3LjYzIDcuNjMgMCAwIDAtLjEzOSA3LjM3NWwuMTQxLjI1NSAyMC43NDEgMzUuOTIxYTcuNjMgNy42MyAwIDAgMCA2LjMyNyAzLjgxbC4yODEuMDA1aDI1LjU3MmwtMjIuNjA1LTM5LjE1M2MtMS4zMTQtMi4yNzYtMS4zNjEtNS4wNjItLjE0MS03LjM3NWwuMTQxLS4yNTUgMTkuNjc5LTM0LjA4NmgxNDYuNjA2TDIxMi45ODggMjk3LjFoLTU0LjI1OWwtOC44MjEtMTUuMjc4aDU0LjMxMmwtMTYuMzMzLTI4LjQ2aC01NC43OGwtOC44MjEtMTUuMjc4aDU0LjgzM2wtMTUuNDY1LTI2Ljk0NmExNS4yNyAxNS4yNyAwIDAgMS0yLjAzOS03LjE4NWwtLjAwNy0uNDQ2em03Mi44NDQgMTY2LjQwMWwtNTQuMTgxLjAwMSA4LjgyMSAxNS41NTJoNTQuMjg1ek0xMDQuOTIxIDc5Ljc5NWM4LjQyNyAwIDE1LjI1OSA2LjgzMyAxNS4yNTkgMTUuMjYxcy02LjgzMiAxNS4yNTktMTUuMjU5IDE1LjI1OS0xNS4yNTktNi44MzItMTUuMjU5LTE1LjI1OSA2LjgzMi0xNS4yNjEgMTUuMjU5LTE1LjI2MXptNTcuNTc1LTMyLjc0M2MxMi42NDIgMCAyMi44OSAxMC4yNDcgMjIuODkgMjIuODg5cy0xMC4yNDkgMjIuODg5LTIyLjg5IDIyLjg4OS0yMi44ODktMTAuMjQ5LTIyLjg4OS0yMi44ODkgMTAuMjQ3LTIyLjg4OSAyMi44ODktMjIuODg5ek0xMjcuODEgMGM4LjQyNyAwIDE1LjI2MSA2LjgzMyAxNS4yNjEgMTUuMjYxUzEzNi4yMzcgMzAuNTIgMTI3LjgxIDMwLjUycy0xNS4yNTktNi44MzItMTUuMjU5LTE1LjI1OVMxMTkuMzg0IDAgMTI3LjgxIDB6Ii8+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(20, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Datalab');
			})
		);

		fns.push(
			this.addEntry(dt + 'dataflow', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 120, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Dataflow', 
			    		new mxGeometry(0, 0, 22, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE0LjUxOTk5OTUwNDA4OTM1NSIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDE0LjUxOTk5OTUwNDA4OTM1NSAyMCI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGwtcnVsZTpldmVub2RkfSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJLnN0M3tmaWxsOiM0Mjg1ZjQ7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPGcgY2xhc3M9InN0MCI+JiN4YTsJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik03LjM3IDIuMDNsLTEuNzIuOTYgMS41MiAxLjUtLjAyIDEuNzMgMS4wMi4wMS4wMi0xLjczIDQuMjQgMi41Ni0uMDEgMS4wNyAxLjc3LjAzVjYuMTFMOS4wNSAzLjA0bC0uMjctLjk0eiIvPiYjeGE7CQk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNNy4zNiAyLjAzbC0xLjQyLjM1LS4yOS42MUwuMzkgNS45Mi4zNiA3Ljk3IDIuMTQgOGwuMDItMS4wNyA0LjMxLTIuNDUtLjAyIDEuNzMuODYuMDEuMDYtNC4xOXoiLz4mI3hhOwkJPGcgY2xhc3M9InN0MSI+JiN4YTsJCQk8cGF0aCBkPSJNNy4zNiAyLjAzTDMuOTUgMCAyLjIxLjk1bDMuNDQgMi4wNCAxLjcyLS45NnptLjcxIDExLjc2bC0xLjcyLS4wMi0uMDIgMS43Mi44MiAyLjQ4IDEuNDItLjEyLjI5LS44NSA1LjI3LTIuOTMuMDMtMi4wOS0xLjc5LS4wMi0uMDIgMS4xLTQuMyAyLjQ1eiIvPiYjeGE7CQkJPHBhdGggZD0iTTcuMTUgMTcuOTdsLTMuNDYgMS45NGgtLjA1bC0xLjY2LS45OSAzLjQ5LTEuOTYgMS42OCAxLjAxeiIvPiYjeGE7CQk8L2c+JiN4YTsJCTxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik0xMC44OC4wOWgtLjA1TDcuMzcgMi4wM2wxLjY4IDEuMDEgMy40OS0xLjk2ek0xMC42MiAyMGgtLjA1bC0zLjQyLTIuMDNoMCAwIDBsMS43Mi0uOTYgMy40NCAyLjA0eiIvPiYjeGE7CQk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNLjMzIDEzLjg5di0yaDEuNzZsLS4wMSAxLjA0IDQuMjUgMi41Ni4wMi0xLjcyLjg2LjAxLS4wNiA0LjE4LTEuNjgtMXoiLz4mI3hhOwk8L2c+JiN4YTsJPGNpcmNsZSBjbGFzcz0ic3QyIiBjeD0iMTMuMzgiIGN5PSIxMC4wNCIgcj0iMS4xNCIvPiYjeGE7CTxjaXJjbGUgY2xhc3M9InN0MiIgY3g9IjEuMTQiIGN5PSI5Ljg4IiByPSIxLjE0Ii8+JiN4YTsJPGNpcmNsZSBjbGFzcz0ic3QyIiBjeD0iNy4zMiIgY3k9IjcuOTkiIHI9IjEuMTQiLz4mI3hhOwk8Y2lyY2xlIGNsYXNzPSJzdDIiIGN4PSI3LjIzIiBjeT0iMTIiIHI9IjEuMTQiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(19, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Dataflow');
			})
		);

		fns.push(
			this.addEntry(dt + 'dataflow', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 120, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Dataflow', 
			    		new mxGeometry(0, 0, 22, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE0LjUxOTk5OTUwNDA4OTM1NSIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDE0LjUxOTk5OTUwNDA4OTM1NSAyMCI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGwtcnVsZTpldmVub2RkfSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJLnN0M3tmaWxsOiM0Mjg1ZjQ7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPGcgY2xhc3M9InN0MCI+JiN4YTsJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik03LjM3IDIuMDNsLTEuNzIuOTYgMS41MiAxLjUtLjAyIDEuNzMgMS4wMi4wMS4wMi0xLjczIDQuMjQgMi41Ni0uMDEgMS4wNyAxLjc3LjAzVjYuMTFMOS4wNSAzLjA0bC0uMjctLjk0eiIvPiYjeGE7CQk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNNy4zNiAyLjAzbC0xLjQyLjM1LS4yOS42MUwuMzkgNS45Mi4zNiA3Ljk3IDIuMTQgOGwuMDItMS4wNyA0LjMxLTIuNDUtLjAyIDEuNzMuODYuMDEuMDYtNC4xOXoiLz4mI3hhOwkJPGcgY2xhc3M9InN0MSI+JiN4YTsJCQk8cGF0aCBkPSJNNy4zNiAyLjAzTDMuOTUgMCAyLjIxLjk1bDMuNDQgMi4wNCAxLjcyLS45NnptLjcxIDExLjc2bC0xLjcyLS4wMi0uMDIgMS43Mi44MiAyLjQ4IDEuNDItLjEyLjI5LS44NSA1LjI3LTIuOTMuMDMtMi4wOS0xLjc5LS4wMi0uMDIgMS4xLTQuMyAyLjQ1eiIvPiYjeGE7CQkJPHBhdGggZD0iTTcuMTUgMTcuOTdsLTMuNDYgMS45NGgtLjA1bC0xLjY2LS45OSAzLjQ5LTEuOTYgMS42OCAxLjAxeiIvPiYjeGE7CQk8L2c+JiN4YTsJCTxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik0xMC44OC4wOWgtLjA1TDcuMzcgMi4wM2wxLjY4IDEuMDEgMy40OS0xLjk2ek0xMC42MiAyMGgtLjA1bC0zLjQyLTIuMDNoMCAwIDBsMS43Mi0uOTYgMy40NCAyLjA0eiIvPiYjeGE7CQk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNLjMzIDEzLjg5di0yaDEuNzZsLS4wMSAxLjA0IDQuMjUgMi41Ni4wMi0xLjcyLjg2LjAxLS4wNiA0LjE4LTEuNjgtMXoiLz4mI3hhOwk8L2c+JiN4YTsJPGNpcmNsZSBjbGFzcz0ic3QyIiBjeD0iMTMuMzgiIGN5PSIxMC4wNCIgcj0iMS4xNCIvPiYjeGE7CTxjaXJjbGUgY2xhc3M9InN0MiIgY3g9IjEuMTQiIGN5PSI5Ljg4IiByPSIxLjE0Ii8+JiN4YTsJPGNpcmNsZSBjbGFzcz0ic3QyIiBjeD0iNy4zMiIgY3k9IjcuOTkiIHI9IjEuMTQiLz4mI3hhOwk8Y2lyY2xlIGNsYXNzPSJzdDIiIGN4PSI3LjIzIiBjeT0iMTIiIHI9IjEuMTQiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(19, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Dataflow');
			})
		);

		fns.push(
			this.addEntry(dt + 'dataflow', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 128, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Dataflow', 
			    		new mxGeometry(0, 0, 22, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE0LjUxOTk5OTUwNDA4OTM1NSIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDE0LjUxOTk5OTUwNDA4OTM1NSAyMCI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGwtcnVsZTpldmVub2RkfSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJLnN0M3tmaWxsOiM0Mjg1ZjQ7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPGcgY2xhc3M9InN0MCI+JiN4YTsJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik03LjM3IDIuMDNsLTEuNzIuOTYgMS41MiAxLjUtLjAyIDEuNzMgMS4wMi4wMS4wMi0xLjczIDQuMjQgMi41Ni0uMDEgMS4wNyAxLjc3LjAzVjYuMTFMOS4wNSAzLjA0bC0uMjctLjk0eiIvPiYjeGE7CQk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNNy4zNiAyLjAzbC0xLjQyLjM1LS4yOS42MUwuMzkgNS45Mi4zNiA3Ljk3IDIuMTQgOGwuMDItMS4wNyA0LjMxLTIuNDUtLjAyIDEuNzMuODYuMDEuMDYtNC4xOXoiLz4mI3hhOwkJPGcgY2xhc3M9InN0MSI+JiN4YTsJCQk8cGF0aCBkPSJNNy4zNiAyLjAzTDMuOTUgMCAyLjIxLjk1bDMuNDQgMi4wNCAxLjcyLS45NnptLjcxIDExLjc2bC0xLjcyLS4wMi0uMDIgMS43Mi44MiAyLjQ4IDEuNDItLjEyLjI5LS44NSA1LjI3LTIuOTMuMDMtMi4wOS0xLjc5LS4wMi0uMDIgMS4xLTQuMyAyLjQ1eiIvPiYjeGE7CQkJPHBhdGggZD0iTTcuMTUgMTcuOTdsLTMuNDYgMS45NGgtLjA1bC0xLjY2LS45OSAzLjQ5LTEuOTYgMS42OCAxLjAxeiIvPiYjeGE7CQk8L2c+JiN4YTsJCTxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik0xMC44OC4wOWgtLjA1TDcuMzcgMi4wM2wxLjY4IDEuMDEgMy40OS0xLjk2ek0xMC42MiAyMGgtLjA1bC0zLjQyLTIuMDNoMCAwIDBsMS43Mi0uOTYgMy40NCAyLjA0eiIvPiYjeGE7CQk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNLjMzIDEzLjg5di0yaDEuNzZsLS4wMSAxLjA0IDQuMjUgMi41Ni4wMi0xLjcyLjg2LjAxLS4wNiA0LjE4LTEuNjgtMXoiLz4mI3hhOwk8L2c+JiN4YTsJPGNpcmNsZSBjbGFzcz0ic3QyIiBjeD0iMTMuMzgiIGN5PSIxMC4wNCIgcj0iMS4xNCIvPiYjeGE7CTxjaXJjbGUgY2xhc3M9InN0MiIgY3g9IjEuMTQiIGN5PSI5Ljg4IiByPSIxLjE0Ii8+JiN4YTsJPGNpcmNsZSBjbGFzcz0ic3QyIiBjeD0iNy4zMiIgY3k9IjcuOTkiIHI9IjEuMTQiLz4mI3hhOwk8Y2lyY2xlIGNsYXNzPSJzdDIiIGN4PSI3LjIzIiBjeT0iMTIiIHI9IjEuMTQiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(19, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Dataflow');
			})
		);

		fns.push(
			this.addEntry(dt + 'pub sub', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 120, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Pub/Sub', 
			    		new mxGeometry(0, 0, 27, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE4LjMxOTk5OTY5NDgyNDIyIiBoZWlnaHQ9IjIwLjAwMDAwMTkwNzM0ODYzMyIgdmlld0JveD0iMCAwIDE4LjMxOTk5OTY5NDgyNDIyIDIwLjAwMDAwMTkwNzM0ODYzMyI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzY2OWRmNjt9JiN4YTsJLnN0MXtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDJ7ZmlsbDojYWVjYmZhO30mI3hhOwk8L3N0eWxlPiYjeGE7CTxkZWZzPiYjeGE7CQk8ZmlsdGVyIGlkPSJBIiB4PSI0LjY0IiB5PSI0LjE5IiB3aWR0aD0iMTQuNzMiIGhlaWdodD0iMTIuNzYiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj4mI3hhOwkJCTxmZUZsb29kIGZsb29kLWNvbG9yPSIjZmZmIi8+JiN4YTsJCQk8ZmVCbGVuZCBpbj0iU291cmNlR3JhcGhpYyIvPiYjeGE7CQk8L2ZpbHRlcj4mI3hhOwkJPG1hc2sgaWQ9IkIiIHg9IjQuNjQiIHk9IjQuMTkiIHdpZHRoPSIxNC43MyIgaGVpZ2h0PSIxMi43NiIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSI+JiN4YTsJCQk8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyLjIzIiByPSIzLjU4IiBmaWx0ZXI9InVybCgjQSkiLz4mI3hhOwkJPC9tYXNrPiYjeGE7CTwvZGVmcz4mI3hhOwk8ZyBjbGFzcz0ic3QwIj4mI3hhOwkJPGNpcmNsZSBjeD0iMTYuMTMiIGN5PSI2LjIxIiByPSIxLjcyIi8+JiN4YTsJCTxjaXJjbGUgY3g9IjIuMTkiIGN5PSI2LjIxIiByPSIxLjcyIi8+JiN4YTsJCTxjaXJjbGUgY3g9IjkuMTYiIGN5PSIxOC4yOCIgcj0iMS43MiIvPiYjeGE7CTwvZz4mI3hhOwk8ZyBtYXNrPSJ1cmwoI0IpIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMi44NCAtMikiPiYjeGE7CQk8cGF0aCB0cmFuc2Zvcm09Im1hdHJpeCguNSAtLjg3IC44NyAuNSAtNC41OSAyMC41MykiIGQ9Ik0xNC42OSAxMC4yMmgxLjU5djguMDRoLTEuNTl6IiBjbGFzcz0ic3QxIi8+JiN4YTsJCTxwYXRoIHRyYW5zZm9ybT0icm90YXRlKDMzMCA4LjUyMyAxNC4yNDQpIiBkPSJNNC40OSAxMy40NWg4LjA0djEuNTlINC40OXoiIGNsYXNzPSJzdDEiLz4mI3hhOwkJPHBhdGggZD0iTTExLjIgNC4xOWgxLjU5djguMDRIMTEuMnoiIGNsYXNzPSJzdDEiLz4mI3hhOwk8L2c+JiN4YTsJPGcgY2xhc3M9InN0MiI+JiN4YTsJCTxjaXJjbGUgY3g9IjkuMTYiIGN5PSIxMC4yMyIgcj0iMi43OCIvPiYjeGE7CQk8Y2lyY2xlIGN4PSIyLjE5IiBjeT0iMTQuMjUiIHI9IjIuMTkiLz4mI3hhOwkJPGNpcmNsZSBjeD0iMTYuMTMiIGN5PSIxNC4yNSIgcj0iMi4xOSIvPiYjeGE7CQk8Y2lyY2xlIGN4PSI5LjE2IiBjeT0iMi4xOSIgcj0iMi4xOSIvPiYjeGE7CTwvZz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(16, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Pub/Sub');
			})
		);

		fns.push(
			this.addEntry(dt + 'pub sub', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 120, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Pub/Sub', 
			    		new mxGeometry(0, 0, 27, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE4LjMxOTk5OTY5NDgyNDIyIiBoZWlnaHQ9IjIwLjAwMDAwMTkwNzM0ODYzMyIgdmlld0JveD0iMCAwIDE4LjMxOTk5OTY5NDgyNDIyIDIwLjAwMDAwMTkwNzM0ODYzMyI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzY2OWRmNjt9JiN4YTsJLnN0MXtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDJ7ZmlsbDojYWVjYmZhO30mI3hhOwk8L3N0eWxlPiYjeGE7CTxkZWZzPiYjeGE7CQk8ZmlsdGVyIGlkPSJBIiB4PSI0LjY0IiB5PSI0LjE5IiB3aWR0aD0iMTQuNzMiIGhlaWdodD0iMTIuNzYiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj4mI3hhOwkJCTxmZUZsb29kIGZsb29kLWNvbG9yPSIjZmZmIi8+JiN4YTsJCQk8ZmVCbGVuZCBpbj0iU291cmNlR3JhcGhpYyIvPiYjeGE7CQk8L2ZpbHRlcj4mI3hhOwkJPG1hc2sgaWQ9IkIiIHg9IjQuNjQiIHk9IjQuMTkiIHdpZHRoPSIxNC43MyIgaGVpZ2h0PSIxMi43NiIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSI+JiN4YTsJCQk8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyLjIzIiByPSIzLjU4IiBmaWx0ZXI9InVybCgjQSkiLz4mI3hhOwkJPC9tYXNrPiYjeGE7CTwvZGVmcz4mI3hhOwk8ZyBjbGFzcz0ic3QwIj4mI3hhOwkJPGNpcmNsZSBjeD0iMTYuMTMiIGN5PSI2LjIxIiByPSIxLjcyIi8+JiN4YTsJCTxjaXJjbGUgY3g9IjIuMTkiIGN5PSI2LjIxIiByPSIxLjcyIi8+JiN4YTsJCTxjaXJjbGUgY3g9IjkuMTYiIGN5PSIxOC4yOCIgcj0iMS43MiIvPiYjeGE7CTwvZz4mI3hhOwk8ZyBtYXNrPSJ1cmwoI0IpIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMi44NCAtMikiPiYjeGE7CQk8cGF0aCB0cmFuc2Zvcm09Im1hdHJpeCguNSAtLjg3IC44NyAuNSAtNC41OSAyMC41MykiIGQ9Ik0xNC42OSAxMC4yMmgxLjU5djguMDRoLTEuNTl6IiBjbGFzcz0ic3QxIi8+JiN4YTsJCTxwYXRoIHRyYW5zZm9ybT0icm90YXRlKDMzMCA4LjUyMyAxNC4yNDQpIiBkPSJNNC40OSAxMy40NWg4LjA0djEuNTlINC40OXoiIGNsYXNzPSJzdDEiLz4mI3hhOwkJPHBhdGggZD0iTTExLjIgNC4xOWgxLjU5djguMDRIMTEuMnoiIGNsYXNzPSJzdDEiLz4mI3hhOwk8L2c+JiN4YTsJPGcgY2xhc3M9InN0MiI+JiN4YTsJCTxjaXJjbGUgY3g9IjkuMTYiIGN5PSIxMC4yMyIgcj0iMi43OCIvPiYjeGE7CQk8Y2lyY2xlIGN4PSIyLjE5IiBjeT0iMTQuMjUiIHI9IjIuMTkiLz4mI3hhOwkJPGNpcmNsZSBjeD0iMTYuMTMiIGN5PSIxNC4yNSIgcj0iMi4xOSIvPiYjeGE7CQk8Y2lyY2xlIGN4PSI5LjE2IiBjeT0iMi4xOSIgcj0iMi4xOSIvPiYjeGE7CTwvZz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(16, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Pub/Sub');
			})
		);

		fns.push(
			this.addEntry(dt + 'pub sub', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 128, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Pub/Sub', 
			    		new mxGeometry(0, 0, 27, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE4LjMxOTk5OTY5NDgyNDIyIiBoZWlnaHQ9IjIwLjAwMDAwMTkwNzM0ODYzMyIgdmlld0JveD0iMCAwIDE4LjMxOTk5OTY5NDgyNDIyIDIwLjAwMDAwMTkwNzM0ODYzMyI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzY2OWRmNjt9JiN4YTsJLnN0MXtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDJ7ZmlsbDojYWVjYmZhO30mI3hhOwk8L3N0eWxlPiYjeGE7CTxkZWZzPiYjeGE7CQk8ZmlsdGVyIGlkPSJBIiB4PSI0LjY0IiB5PSI0LjE5IiB3aWR0aD0iMTQuNzMiIGhlaWdodD0iMTIuNzYiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj4mI3hhOwkJCTxmZUZsb29kIGZsb29kLWNvbG9yPSIjZmZmIi8+JiN4YTsJCQk8ZmVCbGVuZCBpbj0iU291cmNlR3JhcGhpYyIvPiYjeGE7CQk8L2ZpbHRlcj4mI3hhOwkJPG1hc2sgaWQ9IkIiIHg9IjQuNjQiIHk9IjQuMTkiIHdpZHRoPSIxNC43MyIgaGVpZ2h0PSIxMi43NiIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSI+JiN4YTsJCQk8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyLjIzIiByPSIzLjU4IiBmaWx0ZXI9InVybCgjQSkiLz4mI3hhOwkJPC9tYXNrPiYjeGE7CTwvZGVmcz4mI3hhOwk8ZyBjbGFzcz0ic3QwIj4mI3hhOwkJPGNpcmNsZSBjeD0iMTYuMTMiIGN5PSI2LjIxIiByPSIxLjcyIi8+JiN4YTsJCTxjaXJjbGUgY3g9IjIuMTkiIGN5PSI2LjIxIiByPSIxLjcyIi8+JiN4YTsJCTxjaXJjbGUgY3g9IjkuMTYiIGN5PSIxOC4yOCIgcj0iMS43MiIvPiYjeGE7CTwvZz4mI3hhOwk8ZyBtYXNrPSJ1cmwoI0IpIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMi44NCAtMikiPiYjeGE7CQk8cGF0aCB0cmFuc2Zvcm09Im1hdHJpeCguNSAtLjg3IC44NyAuNSAtNC41OSAyMC41MykiIGQ9Ik0xNC42OSAxMC4yMmgxLjU5djguMDRoLTEuNTl6IiBjbGFzcz0ic3QxIi8+JiN4YTsJCTxwYXRoIHRyYW5zZm9ybT0icm90YXRlKDMzMCA4LjUyMyAxNC4yNDQpIiBkPSJNNC40OSAxMy40NWg4LjA0djEuNTlINC40OXoiIGNsYXNzPSJzdDEiLz4mI3hhOwkJPHBhdGggZD0iTTExLjIgNC4xOWgxLjU5djguMDRIMTEuMnoiIGNsYXNzPSJzdDEiLz4mI3hhOwk8L2c+JiN4YTsJPGcgY2xhc3M9InN0MiI+JiN4YTsJCTxjaXJjbGUgY3g9IjkuMTYiIGN5PSIxMC4yMyIgcj0iMi43OCIvPiYjeGE7CQk8Y2lyY2xlIGN4PSIyLjE5IiBjeT0iMTQuMjUiIHI9IjIuMTkiLz4mI3hhOwkJPGNpcmNsZSBjeD0iMTYuMTMiIGN5PSIxNC4yNSIgcj0iMi4xOSIvPiYjeGE7CQk8Y2lyY2xlIGN4PSI5LjE2IiBjeT0iMi4xOSIgcj0iMi4xOSIvPiYjeGE7CTwvZz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(16, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Pub/Sub');
			})
		);

		fns.push(
			this.addEntry(dt + 'dataproc', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 120, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Dataproc', 
			    		new mxGeometry(0, 0, 30, 28), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE5LjM2MzAxMjMxMzg0Mjc3MyIgaGVpZ2h0PSIxNy45NzU1MjY4MDk2OTIzODMiIHZpZXdCb3g9IjAuMDAwNTYwMDI1NjI2MzI3ODQyNSAwLjYxOTYyOTc0MDcxNTAyNjkgMTkuMzYzMDEyMzEzODQyNzczIDE3Ljk3NTUyNjgwOTY5MjM4MyI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGwtcnVsZTpldmVub2RkO30mI3hhOwkuc3Qxe2ZpbGw6I2FlY2JmYTt9JiN4YTsJLnN0MntmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDN7ZmlsbDojNjY5ZGY2O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxnIGNsYXNzPSJzdDAgc3QxIj4mI3hhOwkJPHBhdGggZD0iTTQuNjkgMTYuNGwxMC4xOS01Ljg5Ljk3IDEuNjktMTAuMTggNS44OHoiLz4mI3hhOwkJPHBhdGggZD0iTTcuNSA0LjR2MTAuMzVsLTEuODcgMS40MVY0LjR6Ii8+JiN4YTsJCTxwYXRoIGQ9Ik0xNy40OSAxMS4ybC0uOTcgMS42OC04Ljk2LTUuMTktLjI2LTIuMzZ6Ii8+JiN4YTsJPC9nPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAgc3QyIiBkPSJNMTIuMzkgOC4yNkw3LjMgNS4zM2wuMjYgMi4zNiAxLjUxLjg2YTQgNCAwIDAgMCAzLjMyLS4yOXoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIHN0MSIgZD0iTTYuMTMgNi4yOWgwYTMuNzggMy43OCAwIDAgMSA1LjE2NS01LjE2M0EzLjc4IDMuNzggMCAwIDEgOS40IDguMThhMy44IDMuOCAwIDAgMS0zLjI3LTEuODl6TTExIDMuNDlhMS44NCAxLjg0IDAgMCAwLTEuNTktLjkyQTEuODMgMS44MyAwIDAgMCA3LjU3IDQuNGExLjg0IDEuODQgMCAwIDAgMi43OTQgMS43MDZBMS44NCAxLjg0IDAgMCAwIDExLjI0IDQuNGExLjggMS44IDAgMCAwLS4yNC0uOTF6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MCBzdDIiIGQ9Ik01LjYzIDEwLjk0djUuMjJsMS44Ny0xLjQxdi0xLjYzYTMuMjkgMy4yOSAwIDAgMC0xLjg3LTIuMTh6bTUuNyAzLjg3bDQuNTItMi42MS0yLjIxLTEtMS4yNS44YTQuMjMgNC4yMyAwIDAgMC0xLjA2IDIuODZ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MCBzdDEiIGQ9Ik0uNTEgMTYuN2gwYTMuNzcgMy43NyAwIDAgMSAxLjM4LTUuMTYgMy43MiAzLjcyIDAgMCAxIDIuODYtLjM4QTMuNzggMy43OCAwIDEgMSAuNTEgMTYuN3ptNC44NS0yLjgxQTEuNzkgMS43OSAwIDAgMCA0LjI1IDEzYTEuODMgMS44MyAwIDAgMC0yLjA2IDIuNjloMGMuMzI5LjU2Ni45MzQuOTE0IDEuNTg5LjkxM2ExLjgzIDEuODMgMCAwIDAgMS41ODUtLjkyYy4zMjYtLjU2OC4zMjQtMS4yNjctLjAwNC0xLjgzM3ptNi45NyAyLjQ3aDBhMy43OSAzLjc5IDAgMCAxIDAtMy43NyAzLjc5IDMuNzkgMCAwIDEgNS4xNi0xLjM5IDMuNzggMy43OCAwIDAgMS0xLjg5IDcuMDQ0IDMuNzggMy43OCAwIDAgMS0zLjI3LTEuODg0em00Ljg2LTIuODFhMiAyIDAgMCAwLS42Ny0uNjcgMS44NSAxLjg1IDAgMCAwLTIuNTEuNjggMS44NiAxLjg2IDAgMCAwIDAgMS44MyAxLjgzIDEuODMgMCAwIDAgMi4wNy44NSAxLjgyIDEuODIgMCAwIDAgMS4xMS0uODUgMS44OCAxLjg4IDAgMCAwIDAtMS44NHoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIHN0MyIgZD0iTTcuNDkgMTQuMTVsLTIuOCAyLjI1IDIuODYtMS42NWE0LjA3IDQuMDcgMCAwIDAtLjA2LS42ek04LjE1IDhsLS41OS0zLjZ2My4yOWEzLjQ3IDMuNDcgMCAwIDAgLjU5LjI3em01LjE1IDMuNDdsMy4yMiAxLjQxLTIuODYtMS42NGExLjY5IDEuNjkgMCAwIDAtLjM2LjIzeiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 16);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Dataproc');
			})
		);

		fns.push(
			this.addEntry(dt + 'dataproc', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 120, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Dataproc', 
			    		new mxGeometry(0, 0, 30, 28), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE5LjM2MzAxMjMxMzg0Mjc3MyIgaGVpZ2h0PSIxNy45NzU1MjY4MDk2OTIzODMiIHZpZXdCb3g9IjAuMDAwNTYwMDI1NjI2MzI3ODQyNSAwLjYxOTYyOTc0MDcxNTAyNjkgMTkuMzYzMDEyMzEzODQyNzczIDE3Ljk3NTUyNjgwOTY5MjM4MyI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGwtcnVsZTpldmVub2RkO30mI3hhOwkuc3Qxe2ZpbGw6I2FlY2JmYTt9JiN4YTsJLnN0MntmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDN7ZmlsbDojNjY5ZGY2O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxnIGNsYXNzPSJzdDAgc3QxIj4mI3hhOwkJPHBhdGggZD0iTTQuNjkgMTYuNGwxMC4xOS01Ljg5Ljk3IDEuNjktMTAuMTggNS44OHoiLz4mI3hhOwkJPHBhdGggZD0iTTcuNSA0LjR2MTAuMzVsLTEuODcgMS40MVY0LjR6Ii8+JiN4YTsJCTxwYXRoIGQ9Ik0xNy40OSAxMS4ybC0uOTcgMS42OC04Ljk2LTUuMTktLjI2LTIuMzZ6Ii8+JiN4YTsJPC9nPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAgc3QyIiBkPSJNMTIuMzkgOC4yNkw3LjMgNS4zM2wuMjYgMi4zNiAxLjUxLjg2YTQgNCAwIDAgMCAzLjMyLS4yOXoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIHN0MSIgZD0iTTYuMTMgNi4yOWgwYTMuNzggMy43OCAwIDAgMSA1LjE2NS01LjE2M0EzLjc4IDMuNzggMCAwIDEgOS40IDguMThhMy44IDMuOCAwIDAgMS0zLjI3LTEuODl6TTExIDMuNDlhMS44NCAxLjg0IDAgMCAwLTEuNTktLjkyQTEuODMgMS44MyAwIDAgMCA3LjU3IDQuNGExLjg0IDEuODQgMCAwIDAgMi43OTQgMS43MDZBMS44NCAxLjg0IDAgMCAwIDExLjI0IDQuNGExLjggMS44IDAgMCAwLS4yNC0uOTF6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MCBzdDIiIGQ9Ik01LjYzIDEwLjk0djUuMjJsMS44Ny0xLjQxdi0xLjYzYTMuMjkgMy4yOSAwIDAgMC0xLjg3LTIuMTh6bTUuNyAzLjg3bDQuNTItMi42MS0yLjIxLTEtMS4yNS44YTQuMjMgNC4yMyAwIDAgMC0xLjA2IDIuODZ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MCBzdDEiIGQ9Ik0uNTEgMTYuN2gwYTMuNzcgMy43NyAwIDAgMSAxLjM4LTUuMTYgMy43MiAzLjcyIDAgMCAxIDIuODYtLjM4QTMuNzggMy43OCAwIDEgMSAuNTEgMTYuN3ptNC44NS0yLjgxQTEuNzkgMS43OSAwIDAgMCA0LjI1IDEzYTEuODMgMS44MyAwIDAgMC0yLjA2IDIuNjloMGMuMzI5LjU2Ni45MzQuOTE0IDEuNTg5LjkxM2ExLjgzIDEuODMgMCAwIDAgMS41ODUtLjkyYy4zMjYtLjU2OC4zMjQtMS4yNjctLjAwNC0xLjgzM3ptNi45NyAyLjQ3aDBhMy43OSAzLjc5IDAgMCAxIDAtMy43NyAzLjc5IDMuNzkgMCAwIDEgNS4xNi0xLjM5IDMuNzggMy43OCAwIDAgMS0xLjg5IDcuMDQ0IDMuNzggMy43OCAwIDAgMS0zLjI3LTEuODg0em00Ljg2LTIuODFhMiAyIDAgMCAwLS42Ny0uNjcgMS44NSAxLjg1IDAgMCAwLTIuNTEuNjggMS44NiAxLjg2IDAgMCAwIDAgMS44MyAxLjgzIDEuODMgMCAwIDAgMi4wNy44NSAxLjgyIDEuODIgMCAwIDAgMS4xMS0uODUgMS44OCAxLjg4IDAgMCAwIDAtMS44NHoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIHN0MyIgZD0iTTcuNDkgMTQuMTVsLTIuOCAyLjI1IDIuODYtMS42NWE0LjA3IDQuMDcgMCAwIDAtLjA2LS42ek04LjE1IDhsLS41OS0zLjZ2My4yOWEzLjQ3IDMuNDcgMCAwIDAgLjU5LjI3em01LjE1IDMuNDdsMy4yMiAxLjQxLTIuODYtMS42NGExLjY5IDEuNjkgMCAwIDAtLjM2LjIzeiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 16);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Dataproc');
			})
		);

		fns.push(
			this.addEntry(dt + 'dataproc', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 128, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Dataproc', 
			    		new mxGeometry(0, 0, 30, 28), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE5LjM2MzAxMjMxMzg0Mjc3MyIgaGVpZ2h0PSIxNy45NzU1MjY4MDk2OTIzODMiIHZpZXdCb3g9IjAuMDAwNTYwMDI1NjI2MzI3ODQyNSAwLjYxOTYyOTc0MDcxNTAyNjkgMTkuMzYzMDEyMzEzODQyNzczIDE3Ljk3NTUyNjgwOTY5MjM4MyI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGwtcnVsZTpldmVub2RkO30mI3hhOwkuc3Qxe2ZpbGw6I2FlY2JmYTt9JiN4YTsJLnN0MntmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDN7ZmlsbDojNjY5ZGY2O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxnIGNsYXNzPSJzdDAgc3QxIj4mI3hhOwkJPHBhdGggZD0iTTQuNjkgMTYuNGwxMC4xOS01Ljg5Ljk3IDEuNjktMTAuMTggNS44OHoiLz4mI3hhOwkJPHBhdGggZD0iTTcuNSA0LjR2MTAuMzVsLTEuODcgMS40MVY0LjR6Ii8+JiN4YTsJCTxwYXRoIGQ9Ik0xNy40OSAxMS4ybC0uOTcgMS42OC04Ljk2LTUuMTktLjI2LTIuMzZ6Ii8+JiN4YTsJPC9nPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAgc3QyIiBkPSJNMTIuMzkgOC4yNkw3LjMgNS4zM2wuMjYgMi4zNiAxLjUxLjg2YTQgNCAwIDAgMCAzLjMyLS4yOXoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIHN0MSIgZD0iTTYuMTMgNi4yOWgwYTMuNzggMy43OCAwIDAgMSA1LjE2NS01LjE2M0EzLjc4IDMuNzggMCAwIDEgOS40IDguMThhMy44IDMuOCAwIDAgMS0zLjI3LTEuODl6TTExIDMuNDlhMS44NCAxLjg0IDAgMCAwLTEuNTktLjkyQTEuODMgMS44MyAwIDAgMCA3LjU3IDQuNGExLjg0IDEuODQgMCAwIDAgMi43OTQgMS43MDZBMS44NCAxLjg0IDAgMCAwIDExLjI0IDQuNGExLjggMS44IDAgMCAwLS4yNC0uOTF6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MCBzdDIiIGQ9Ik01LjYzIDEwLjk0djUuMjJsMS44Ny0xLjQxdi0xLjYzYTMuMjkgMy4yOSAwIDAgMC0xLjg3LTIuMTh6bTUuNyAzLjg3bDQuNTItMi42MS0yLjIxLTEtMS4yNS44YTQuMjMgNC4yMyAwIDAgMC0xLjA2IDIuODZ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MCBzdDEiIGQ9Ik0uNTEgMTYuN2gwYTMuNzcgMy43NyAwIDAgMSAxLjM4LTUuMTYgMy43MiAzLjcyIDAgMCAxIDIuODYtLjM4QTMuNzggMy43OCAwIDEgMSAuNTEgMTYuN3ptNC44NS0yLjgxQTEuNzkgMS43OSAwIDAgMCA0LjI1IDEzYTEuODMgMS44MyAwIDAgMC0yLjA2IDIuNjloMGMuMzI5LjU2Ni45MzQuOTE0IDEuNTg5LjkxM2ExLjgzIDEuODMgMCAwIDAgMS41ODUtLjkyYy4zMjYtLjU2OC4zMjQtMS4yNjctLjAwNC0xLjgzM3ptNi45NyAyLjQ3aDBhMy43OSAzLjc5IDAgMCAxIDAtMy43NyAzLjc5IDMuNzkgMCAwIDEgNS4xNi0xLjM5IDMuNzggMy43OCAwIDAgMS0xLjg5IDcuMDQ0IDMuNzggMy43OCAwIDAgMS0zLjI3LTEuODg0em00Ljg2LTIuODFhMiAyIDAgMCAwLS42Ny0uNjcgMS44NSAxLjg1IDAgMCAwLTIuNTEuNjggMS44NiAxLjg2IDAgMCAwIDAgMS44MyAxLjgzIDEuODMgMCAwIDAgMi4wNy44NSAxLjgyIDEuODIgMCAwIDAgMS4xMS0uODUgMS44OCAxLjg4IDAgMCAwIDAtMS44NHoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIHN0MyIgZD0iTTcuNDkgMTQuMTVsLTIuOCAyLjI1IDIuODYtMS42NWE0LjA3IDQuMDcgMCAwIDAtLjA2LS42ek04LjE1IDhsLS41OS0zLjZ2My4yOWEzLjQ3IDMuNDcgMCAwIDAgLjU5LjI3em01LjE1IDMuNDdsMy4yMiAxLjQxLTIuODYtMS42NGExLjY5IDEuNjkgMCAwIDAtLjM2LjIzeiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 16);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Dataproc');
			})
		);

		fns.push(
			this.addEntry(dt + 'genomics', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 130, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Genomics', 
			    		new mxGeometry(0, 0, 30, 28), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE4LjYwMDAwMDM4MTQ2OTcyNyIgdmlld0JveD0iMCAwIDIwIDE4LjYwMDAwMDM4MTQ2OTcyNyI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6I2FlY2JmYTt9JiN4YTsJLnN0MXtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDJ7ZmlsbC1ydWxlOmV2ZW5vZGR9JiN4YTsJLnN0M3tmaWxsOiM2NjlkZjY7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPGNpcmNsZSBjeD0iMTAiIGN5PSI5LjMiIHI9IjEuNiIgY2xhc3M9InN0MCIvPiYjeGE7CTxwYXRoIGQ9Ik0xMi42OSA1LjhsLS43NC0uN0g1LjU4djEuNGg2LjM3eiIgY2xhc3M9InN0MSBzdDIiLz4mI3hhOwk8Y2lyY2xlIGN4PSI0LjgiIGN5PSI1LjgiIHI9IjEuMjMiIGNsYXNzPSJzdDMiLz4mI3hhOwk8Y2lyY2xlIGN4PSIxNS4yIiBjeT0iNS44IiByPSIxLjYiIGNsYXNzPSJzdDAiLz4mI3hhOwk8cGF0aCBkPSJNMTQuMzggMTMuNXYtMS40SDguMWwtLjc0LjcuNzQuN3oiIGNsYXNzPSJzdDEgc3QyIi8+JiN4YTsJPGNpcmNsZSBjeD0iNC44IiBjeT0iMTIuOCIgcj0iMS42IiBjbGFzcz0ic3QwIi8+JiN4YTsJPGNpcmNsZSBjeD0iMTUuMiIgY3k9IjEyLjgiIHI9IjEuMjMiIGNsYXNzPSJzdDMiLz4mI3hhOwk8cGF0aCBkPSJNMTUuNiAxLjZsLS43NC0uN0gyLjE4djEuNGgxMi42OHoiIGNsYXNzPSJzdDEgc3QyIi8+JiN4YTsJPGNpcmNsZSBjeD0iMS42IiBjeT0iMS42IiByPSIxLjIzIiBjbGFzcz0ic3QzIi8+JiN4YTsJPGNpcmNsZSBjeD0iMTguNCIgY3k9IjEuNiIgcj0iMS42IiBjbGFzcz0ic3QwIi8+JiN4YTsJPHBhdGggZD0iTTE3Ljg0IDE3Ljd2LTEuNEg1LjE0bC0uNzQuNy43NC43eiIgY2xhc3M9InN0MSBzdDIiLz4mI3hhOwk8Y2lyY2xlIGN4PSIxLjYiIGN5PSIxNyIgcj0iMS42IiBjbGFzcz0ic3QwIi8+JiN4YTsJPGNpcmNsZSBjeD0iMTguNCIgY3k9IjE3IiByPSIxLjIzIiBjbGFzcz0ic3QzIi8+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 16);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Genomics');
			})
		);

		fns.push(
			this.addEntry(dt + 'genomics', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 130, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Genomics', 
			    		new mxGeometry(0, 0, 30, 28), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE4LjYwMDAwMDM4MTQ2OTcyNyIgdmlld0JveD0iMCAwIDIwIDE4LjYwMDAwMDM4MTQ2OTcyNyI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6I2FlY2JmYTt9JiN4YTsJLnN0MXtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDJ7ZmlsbC1ydWxlOmV2ZW5vZGR9JiN4YTsJLnN0M3tmaWxsOiM2NjlkZjY7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPGNpcmNsZSBjeD0iMTAiIGN5PSI5LjMiIHI9IjEuNiIgY2xhc3M9InN0MCIvPiYjeGE7CTxwYXRoIGQ9Ik0xMi42OSA1LjhsLS43NC0uN0g1LjU4djEuNGg2LjM3eiIgY2xhc3M9InN0MSBzdDIiLz4mI3hhOwk8Y2lyY2xlIGN4PSI0LjgiIGN5PSI1LjgiIHI9IjEuMjMiIGNsYXNzPSJzdDMiLz4mI3hhOwk8Y2lyY2xlIGN4PSIxNS4yIiBjeT0iNS44IiByPSIxLjYiIGNsYXNzPSJzdDAiLz4mI3hhOwk8cGF0aCBkPSJNMTQuMzggMTMuNXYtMS40SDguMWwtLjc0LjcuNzQuN3oiIGNsYXNzPSJzdDEgc3QyIi8+JiN4YTsJPGNpcmNsZSBjeD0iNC44IiBjeT0iMTIuOCIgcj0iMS42IiBjbGFzcz0ic3QwIi8+JiN4YTsJPGNpcmNsZSBjeD0iMTUuMiIgY3k9IjEyLjgiIHI9IjEuMjMiIGNsYXNzPSJzdDMiLz4mI3hhOwk8cGF0aCBkPSJNMTUuNiAxLjZsLS43NC0uN0gyLjE4djEuNGgxMi42OHoiIGNsYXNzPSJzdDEgc3QyIi8+JiN4YTsJPGNpcmNsZSBjeD0iMS42IiBjeT0iMS42IiByPSIxLjIzIiBjbGFzcz0ic3QzIi8+JiN4YTsJPGNpcmNsZSBjeD0iMTguNCIgY3k9IjEuNiIgcj0iMS42IiBjbGFzcz0ic3QwIi8+JiN4YTsJPHBhdGggZD0iTTE3Ljg0IDE3Ljd2LTEuNEg1LjE0bC0uNzQuNy43NC43eiIgY2xhc3M9InN0MSBzdDIiLz4mI3hhOwk8Y2lyY2xlIGN4PSIxLjYiIGN5PSIxNyIgcj0iMS42IiBjbGFzcz0ic3QwIi8+JiN4YTsJPGNpcmNsZSBjeD0iMTguNCIgY3k9IjE3IiByPSIxLjIzIiBjbGFzcz0ic3QzIi8+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 16);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Genomics');
			})
		);

		fns.push(
			this.addEntry(dt + 'genomics', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 138, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Genomics', 
			    		new mxGeometry(0, 0, 30, 28), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE4LjYwMDAwMDM4MTQ2OTcyNyIgdmlld0JveD0iMCAwIDIwIDE4LjYwMDAwMDM4MTQ2OTcyNyI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6I2FlY2JmYTt9JiN4YTsJLnN0MXtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDJ7ZmlsbC1ydWxlOmV2ZW5vZGR9JiN4YTsJLnN0M3tmaWxsOiM2NjlkZjY7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPGNpcmNsZSBjeD0iMTAiIGN5PSI5LjMiIHI9IjEuNiIgY2xhc3M9InN0MCIvPiYjeGE7CTxwYXRoIGQ9Ik0xMi42OSA1LjhsLS43NC0uN0g1LjU4djEuNGg2LjM3eiIgY2xhc3M9InN0MSBzdDIiLz4mI3hhOwk8Y2lyY2xlIGN4PSI0LjgiIGN5PSI1LjgiIHI9IjEuMjMiIGNsYXNzPSJzdDMiLz4mI3hhOwk8Y2lyY2xlIGN4PSIxNS4yIiBjeT0iNS44IiByPSIxLjYiIGNsYXNzPSJzdDAiLz4mI3hhOwk8cGF0aCBkPSJNMTQuMzggMTMuNXYtMS40SDguMWwtLjc0LjcuNzQuN3oiIGNsYXNzPSJzdDEgc3QyIi8+JiN4YTsJPGNpcmNsZSBjeD0iNC44IiBjeT0iMTIuOCIgcj0iMS42IiBjbGFzcz0ic3QwIi8+JiN4YTsJPGNpcmNsZSBjeD0iMTUuMiIgY3k9IjEyLjgiIHI9IjEuMjMiIGNsYXNzPSJzdDMiLz4mI3hhOwk8cGF0aCBkPSJNMTUuNiAxLjZsLS43NC0uN0gyLjE4djEuNGgxMi42OHoiIGNsYXNzPSJzdDEgc3QyIi8+JiN4YTsJPGNpcmNsZSBjeD0iMS42IiBjeT0iMS42IiByPSIxLjIzIiBjbGFzcz0ic3QzIi8+JiN4YTsJPGNpcmNsZSBjeD0iMTguNCIgY3k9IjEuNiIgcj0iMS42IiBjbGFzcz0ic3QwIi8+JiN4YTsJPHBhdGggZD0iTTE3Ljg0IDE3Ljd2LTEuNEg1LjE0bC0uNzQuNy43NC43eiIgY2xhc3M9InN0MSBzdDIiLz4mI3hhOwk8Y2lyY2xlIGN4PSIxLjYiIGN5PSIxNyIgcj0iMS42IiBjbGFzcz0ic3QwIi8+JiN4YTsJPGNpcmNsZSBjeD0iMTguNCIgY3k9IjE3IiByPSIxLjIzIiBjbGFzcz0ic3QzIi8+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 16);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Genomics');
			})
		);

		fns.push(
			this.addEntry(dt + 'dataprep', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 120, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Dataprep', 
			    		new mxGeometry(0, 0, 30, 28), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE4LjI3OTk5ODc3OTI5Njg3NSIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMS4yNDYyOTA4MDM4OTEyNzAxZS04IDAgMTguMjc5OTk4Nzc5Mjk2ODc1IDIwIj4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNjY5ZGY2O2ZpbGwtcnVsZTpldmVub2RkfSYjeGE7CS5zdDF7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qye2ZpbGwtcnVsZTpldmVub2RkfSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTcuNjMgOWEuOTEuOTEgMCAxIDEtLjY0My4yNjdBLjkxLjkxIDAgMCAxIDcuNjMgOXptMC0uOGExLjcxIDEuNzEgMCAxIDAgMS43IDEuNzEgMS43IDEuNyAwIDAgMC0xLjctMS43MXpNMS43MiA5YS45MS45MSAwIDEgMS0uNjQzLjI2N0EuOTEuOTEgMCAwIDEgMS43MiA5em0wLS44YTEuNzEgMS43MSAwIDEgMCAxLjcgMS43MSAxLjcgMS43IDAgMCAwLTEuNy0xLjcxem0zLjA0IDYuMTFhLjkxLjkxIDAgMSAxIDAgMS44Mi45MS45MSAwIDEgMSAwLTEuODJ6bTAtLjc5YTEuNzEgMS43MSAwIDEgMCAxLjIuNSAxLjcgMS43IDAgMCAwLTEuMi0uNXptMC05LjczYS45MS45MSAwIDAgMS0uMDQgMS44MTkuOTEuOTEgMCAwIDEtLjktLjkwOS45Mi45MiAwIDAgMSAuOTQtLjkxem0wLS44YTEuNzEgMS43MSAwIDEgMCAxLjIuNUExLjcgMS43IDAgMCAwIDQuNzYgM3oiLz4mI3hhOwk8ZyBjbGFzcz0ic3QxIj4mI3hhOwkJPHBhdGggZD0iTTcuODEgMGgxLjY4djIwSDcuODF6Ii8+JiN4YTsJCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xMy40IDIuODdIOC44OWEuMzcuMzcgMCAwIDAtLjMuNHYyLjgyYS4zNi4zNiAwIDAgMCAuMy4zOWg0LjUxYS4zNi4zNiAwIDAgMCAuMzEtLjM5VjMuMjhhLjM3LjM3IDAgMCAwLS4zMS0uNDF6bTQuMzIgNS4yOUg5LjRjLS4zMSAwLS41Ni4xOC0uNTYuMzl2Mi44MmMwIC4yMi4yNS40LjU2LjRoOC4zMmMuMzEgMCAuNTYtLjE5LjU2LS40VjguNTVjMC0uMjItLjI1LS4zOS0uNTYtLjM5em0tNS45MSA1LjI4SDguMjhjLS4xMyAwLS4yMy4xOC0uMjMuMzl2Mi44MmMwIC4yMi4xLjM5LjIzLjM5aDMuNTNjLjEzIDAgLjI0LS4xOC4yNC0uMzl2LTIuODJjLS4wMS0uMjItLjExLS4zOS0uMjQtLjM5eiIvPiYjeGE7CTwvZz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 16);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Dataprep');
			})
		);

		fns.push(
			this.addEntry(dt + 'dataprep', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 120, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Dataprep', 
			    		new mxGeometry(0, 0, 30, 28), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE4LjI3OTk5ODc3OTI5Njg3NSIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMS4yNDYyOTA4MDM4OTEyNzAxZS04IDAgMTguMjc5OTk4Nzc5Mjk2ODc1IDIwIj4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNjY5ZGY2O2ZpbGwtcnVsZTpldmVub2RkfSYjeGE7CS5zdDF7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qye2ZpbGwtcnVsZTpldmVub2RkfSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTcuNjMgOWEuOTEuOTEgMCAxIDEtLjY0My4yNjdBLjkxLjkxIDAgMCAxIDcuNjMgOXptMC0uOGExLjcxIDEuNzEgMCAxIDAgMS43IDEuNzEgMS43IDEuNyAwIDAgMC0xLjctMS43MXpNMS43MiA5YS45MS45MSAwIDEgMS0uNjQzLjI2N0EuOTEuOTEgMCAwIDEgMS43MiA5em0wLS44YTEuNzEgMS43MSAwIDEgMCAxLjcgMS43MSAxLjcgMS43IDAgMCAwLTEuNy0xLjcxem0zLjA0IDYuMTFhLjkxLjkxIDAgMSAxIDAgMS44Mi45MS45MSAwIDEgMSAwLTEuODJ6bTAtLjc5YTEuNzEgMS43MSAwIDEgMCAxLjIuNSAxLjcgMS43IDAgMCAwLTEuMi0uNXptMC05LjczYS45MS45MSAwIDAgMS0uMDQgMS44MTkuOTEuOTEgMCAwIDEtLjktLjkwOS45Mi45MiAwIDAgMSAuOTQtLjkxem0wLS44YTEuNzEgMS43MSAwIDEgMCAxLjIuNUExLjcgMS43IDAgMCAwIDQuNzYgM3oiLz4mI3hhOwk8ZyBjbGFzcz0ic3QxIj4mI3hhOwkJPHBhdGggZD0iTTcuODEgMGgxLjY4djIwSDcuODF6Ii8+JiN4YTsJCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xMy40IDIuODdIOC44OWEuMzcuMzcgMCAwIDAtLjMuNHYyLjgyYS4zNi4zNiAwIDAgMCAuMy4zOWg0LjUxYS4zNi4zNiAwIDAgMCAuMzEtLjM5VjMuMjhhLjM3LjM3IDAgMCAwLS4zMS0uNDF6bTQuMzIgNS4yOUg5LjRjLS4zMSAwLS41Ni4xOC0uNTYuMzl2Mi44MmMwIC4yMi4yNS40LjU2LjRoOC4zMmMuMzEgMCAuNTYtLjE5LjU2LS40VjguNTVjMC0uMjItLjI1LS4zOS0uNTYtLjM5em0tNS45MSA1LjI4SDguMjhjLS4xMyAwLS4yMy4xOC0uMjMuMzl2Mi44MmMwIC4yMi4xLjM5LjIzLjM5aDMuNTNjLjEzIDAgLjI0LS4xOC4yNC0uMzl2LTIuODJjLS4wMS0uMjItLjExLS4zOS0uMjQtLjM5eiIvPiYjeGE7CTwvZz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 16);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Dataprep');
			})
		);

		fns.push(
			this.addEntry(dt + 'dataprep', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 128, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Dataprep', 
			    		new mxGeometry(0, 0, 30, 28), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE4LjI3OTk5ODc3OTI5Njg3NSIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMS4yNDYyOTA4MDM4OTEyNzAxZS04IDAgMTguMjc5OTk4Nzc5Mjk2ODc1IDIwIj4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNjY5ZGY2O2ZpbGwtcnVsZTpldmVub2RkfSYjeGE7CS5zdDF7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qye2ZpbGwtcnVsZTpldmVub2RkfSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTcuNjMgOWEuOTEuOTEgMCAxIDEtLjY0My4yNjdBLjkxLjkxIDAgMCAxIDcuNjMgOXptMC0uOGExLjcxIDEuNzEgMCAxIDAgMS43IDEuNzEgMS43IDEuNyAwIDAgMC0xLjctMS43MXpNMS43MiA5YS45MS45MSAwIDEgMS0uNjQzLjI2N0EuOTEuOTEgMCAwIDEgMS43MiA5em0wLS44YTEuNzEgMS43MSAwIDEgMCAxLjcgMS43MSAxLjcgMS43IDAgMCAwLTEuNy0xLjcxem0zLjA0IDYuMTFhLjkxLjkxIDAgMSAxIDAgMS44Mi45MS45MSAwIDEgMSAwLTEuODJ6bTAtLjc5YTEuNzEgMS43MSAwIDEgMCAxLjIuNSAxLjcgMS43IDAgMCAwLTEuMi0uNXptMC05LjczYS45MS45MSAwIDAgMS0uMDQgMS44MTkuOTEuOTEgMCAwIDEtLjktLjkwOS45Mi45MiAwIDAgMSAuOTQtLjkxem0wLS44YTEuNzEgMS43MSAwIDEgMCAxLjIuNUExLjcgMS43IDAgMCAwIDQuNzYgM3oiLz4mI3hhOwk8ZyBjbGFzcz0ic3QxIj4mI3hhOwkJPHBhdGggZD0iTTcuODEgMGgxLjY4djIwSDcuODF6Ii8+JiN4YTsJCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xMy40IDIuODdIOC44OWEuMzcuMzcgMCAwIDAtLjMuNHYyLjgyYS4zNi4zNiAwIDAgMCAuMy4zOWg0LjUxYS4zNi4zNiAwIDAgMCAuMzEtLjM5VjMuMjhhLjM3LjM3IDAgMCAwLS4zMS0uNDF6bTQuMzIgNS4yOUg5LjRjLS4zMSAwLS41Ni4xOC0uNTYuMzl2Mi44MmMwIC4yMi4yNS40LjU2LjRoOC4zMmMuMzEgMCAuNTYtLjE5LjU2LS40VjguNTVjMC0uMjItLjI1LS4zOS0uNTYtLjM5em0tNS45MSA1LjI4SDguMjhjLS4xMyAwLS4yMy4xOC0uMjMuMzl2Mi44MmMwIC4yMi4xLjM5LjIzLjM5aDMuNTNjLjEzIDAgLjI0LS4xOC4yNC0uMzl2LTIuODJjLS4wMS0uMjItLjExLS4zOS0uMjQtLjM5eiIvPiYjeGE7CTwvZz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 16);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Dataprep');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud composer', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 130, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Cloud\nComposer', 
			    		new mxGeometry(0, 0, 22, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE0LjY0MDAwMDM0MzMyMjc1NCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDE0LjY0MDAwMDM0MzMyMjc1NCAyMCI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6I2FlY2JmYTt9JiN4YTsJLnN0MXtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTAgMGgxNC42M3YzLjk0aC01LjN2NS4zM0g1LjM1VjMuOTZIMHoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMy45NSAxMC42N2g1LjM0VjIwSDUuMzV2LTUuMzVIMFY1LjM3aDMuOTV6TTE0LjY0IDIwSDEwLjdWNS4zNmgzLjk0eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0wIDE2LjA2aDMuOTJWMjBIMHoiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(19, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Composer');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud composer', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 160, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Composer', 
			    		new mxGeometry(0, 0, 22, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE0LjY0MDAwMDM0MzMyMjc1NCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDE0LjY0MDAwMDM0MzMyMjc1NCAyMCI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6I2FlY2JmYTt9JiN4YTsJLnN0MXtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTAgMGgxNC42M3YzLjk0aC01LjN2NS4zM0g1LjM1VjMuOTZIMHoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMy45NSAxMC42N2g1LjM0VjIwSDUuMzV2LTUuMzVIMFY1LjM3aDMuOTV6TTE0LjY0IDIwSDEwLjdWNS4zNmgzLjk0eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0wIDE2LjA2aDMuOTJWMjBIMHoiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(19, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Composer');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud composer', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 168, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Composer', 
			    		new mxGeometry(0, 0, 22, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE0LjY0MDAwMDM0MzMyMjc1NCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDE0LjY0MDAwMDM0MzMyMjc1NCAyMCI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6I2FlY2JmYTt9JiN4YTsJLnN0MXtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTAgMGgxNC42M3YzLjk0aC01LjN2NS4zM0g1LjM1VjMuOTZIMHoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMy45NSAxMC42N2g1LjM0VjIwSDUuMzV2LTUuMzVIMFY1LjM3aDMuOTV6TTE0LjY0IDIwSDEwLjdWNS4zNmgzLjk0eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0wIDE2LjA2aDMuOTJWMjBIMHoiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(19, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Composer');
			})
		);

		fns.push(
			this.addEntry(dt + 'data catalog', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 150, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Data Catalog', 
			    		new mxGeometry(0, 0, 30, 27), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjM3Ni4yNzQ4ODc3NTcyNjMyIiBoZWlnaHQ9IjMzOS42NzM1NDQyMTc3NjM4MyIgdmlld0JveD0iMC4xMTQwMDAwMDAwNTk2MDQ2NCAtMC4wOTAwMDAwMDM1NzYyNzg2OSA5OS41NTU5OTk3NTU4NTkzOCA4OS44NzE5OTQwMTg1NTQ2OSI+JiN4YTs8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qxe2ZpbGw6I2FlY2JmYTt9JiN4YTs8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik03Ny41MjMgNDMuMzk3bDEyLjg0NCA3LjU3MnYxNC43NjdsLTEyLjg0NCA2LjY4ek01MC4zMTItLjA5bDEyLjg0NCA3LjU3MnYxNC43NjdsLTEyLjg0NCA2LjY4ek0yMy4xIDQzLjM5N2wxMi44NDQgNy41NzJ2MTQuNzY3TDIzLjEgNzIuNDE3em02OS40Ny0uNTExbDcuMS0xMS4xNjktMTIuNjY2LTIxLjU5NEg3MC42NDR2OS41aDEwLjkxOWw2Ljk3NyAxMS44OTUtNC4yNTYgNi42OTR6bS03Ni45NzktNC42TDExLjMgMzEuNDg1bDcuMjY0LTExLjg2MWg5Ljk3OWwuMDk5LTkuNUgxMy4yNDFMLjExNCAzMS41NjFsMS41NzYgMi40OTggNS41MTUgOC43Mzl6bTEzLjY2MiAzOS40NDlsNy42MDMgMTIuMDQ3aDI1LjkwMmw3LjczMy0xMi4xNjQtOC4xNDMtNC44OTktNC44MDggNy41NjRINDIuMDk1bC00Ljc0LTcuNTExeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik03Ny41MjMgNDMuMzk3bC0xMi44NDQgNy41NzJ2MTQuNzY3bDEyLjg0NCA2LjY4ek01MC4zMTItLjA5TDM3LjQ2OCA3LjQ4MnYxNC43NjdsMTIuODQ0IDYuNjh6TTIzLjEgNDMuMzk3bC0xMi44NDQgNy41NzJ2MTQuNzY3bDEyLjg0NCA2LjY4eiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 16);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Data Catalog');
			})
		);

		fns.push(
			this.addEntry(dt + 'data catalog', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 150, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Data Catalog', 
			    		new mxGeometry(0, 0, 30, 27), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjM3Ni4yNzQ4ODc3NTcyNjMyIiBoZWlnaHQ9IjMzOS42NzM1NDQyMTc3NjM4MyIgdmlld0JveD0iMC4xMTQwMDAwMDAwNTk2MDQ2NCAtMC4wOTAwMDAwMDM1NzYyNzg2OSA5OS41NTU5OTk3NTU4NTkzOCA4OS44NzE5OTQwMTg1NTQ2OSI+JiN4YTs8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qxe2ZpbGw6I2FlY2JmYTt9JiN4YTs8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik03Ny41MjMgNDMuMzk3bDEyLjg0NCA3LjU3MnYxNC43NjdsLTEyLjg0NCA2LjY4ek01MC4zMTItLjA5bDEyLjg0NCA3LjU3MnYxNC43NjdsLTEyLjg0NCA2LjY4ek0yMy4xIDQzLjM5N2wxMi44NDQgNy41NzJ2MTQuNzY3TDIzLjEgNzIuNDE3em02OS40Ny0uNTExbDcuMS0xMS4xNjktMTIuNjY2LTIxLjU5NEg3MC42NDR2OS41aDEwLjkxOWw2Ljk3NyAxMS44OTUtNC4yNTYgNi42OTR6bS03Ni45NzktNC42TDExLjMgMzEuNDg1bDcuMjY0LTExLjg2MWg5Ljk3OWwuMDk5LTkuNUgxMy4yNDFMLjExNCAzMS41NjFsMS41NzYgMi40OTggNS41MTUgOC43Mzl6bTEzLjY2MiAzOS40NDlsNy42MDMgMTIuMDQ3aDI1LjkwMmw3LjczMy0xMi4xNjQtOC4xNDMtNC44OTktNC44MDggNy41NjRINDIuMDk1bC00Ljc0LTcuNTExeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik03Ny41MjMgNDMuMzk3bC0xMi44NDQgNy41NzJ2MTQuNzY3bDEyLjg0NCA2LjY4ek01MC4zMTItLjA5TDM3LjQ2OCA3LjQ4MnYxNC43NjdsMTIuODQ0IDYuNjh6TTIzLjEgNDMuMzk3bC0xMi44NDQgNy41NzJ2MTQuNzY3bDEyLjg0NCA2LjY4eiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 16);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Data Catalog');
			})
		);

		fns.push(
			this.addEntry(dt + 'data catalog', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 158, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Data Catalog', 
			    		new mxGeometry(0, 0, 30, 27), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjM3Ni4yNzQ4ODc3NTcyNjMyIiBoZWlnaHQ9IjMzOS42NzM1NDQyMTc3NjM4MyIgdmlld0JveD0iMC4xMTQwMDAwMDAwNTk2MDQ2NCAtMC4wOTAwMDAwMDM1NzYyNzg2OSA5OS41NTU5OTk3NTU4NTkzOCA4OS44NzE5OTQwMTg1NTQ2OSI+JiN4YTs8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qxe2ZpbGw6I2FlY2JmYTt9JiN4YTs8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik03Ny41MjMgNDMuMzk3bDEyLjg0NCA3LjU3MnYxNC43NjdsLTEyLjg0NCA2LjY4ek01MC4zMTItLjA5bDEyLjg0NCA3LjU3MnYxNC43NjdsLTEyLjg0NCA2LjY4ek0yMy4xIDQzLjM5N2wxMi44NDQgNy41NzJ2MTQuNzY3TDIzLjEgNzIuNDE3em02OS40Ny0uNTExbDcuMS0xMS4xNjktMTIuNjY2LTIxLjU5NEg3MC42NDR2OS41aDEwLjkxOWw2Ljk3NyAxMS44OTUtNC4yNTYgNi42OTR6bS03Ni45NzktNC42TDExLjMgMzEuNDg1bDcuMjY0LTExLjg2MWg5Ljk3OWwuMDk5LTkuNUgxMy4yNDFMLjExNCAzMS41NjFsMS41NzYgMi40OTggNS41MTUgOC43Mzl6bTEzLjY2MiAzOS40NDlsNy42MDMgMTIuMDQ3aDI1LjkwMmw3LjczMy0xMi4xNjQtOC4xNDMtNC44OTktNC44MDggNy41NjRINDIuMDk1bC00Ljc0LTcuNTExeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik03Ny41MjMgNDMuMzk3bC0xMi44NDQgNy41NzJ2MTQuNzY3bDEyLjg0NCA2LjY4ek01MC4zMTItLjA5TDM3LjQ2OCA3LjQ4MnYxNC43NjdsMTIuODQ0IDYuNjh6TTIzLjEgNDMuMzk3bC0xMi44NDQgNy41NzJ2MTQuNzY3bDEyLjg0NCA2LjY4eiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 16);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Data Catalog');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud data fusion', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 140, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Cloud\nData Fusion', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjM3Ny4wNDk2OTgzMjc3ODkyNiIgaGVpZ2h0PSIzNzcuMjkxNTcwNzE1Nzg5NzYiIHZpZXdCb3g9IjAuMTMxMDAwNTE4Nzk4ODI4MTIgLTAuMTIxMDAwMDA2Nzk0OTI5NSA5OS43NjEwMDE1ODY5MTQwNiA5OS44MjQ5OTY5NDgyNDIxOSI+JiN4YTs8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qxe2ZpbGw6IzQyODVmNDt9JiN4YTsJLnN0MntmaWxsOiNhZWNiZmE7fSYjeGE7PC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNODAuNTkzIDE5LjE4djIwLjE5OWgxOS4yOTlWOS41M2MwLTIuNTM3LS45NzktNC44NDYtMi41OC02LjU2OHptLTkuOTA4IDYxLjIyNUgxOS40MzFMMy40NSA5Ny4zMzdjMS42OTUgMS40NzQgMy45MDggMi4zNjcgNi4zMzEgMi4zNjdoNzAuNTU1YzIuODczIDAgNS40NTMtMS4yNTYgNy4yMjEtMy4yNDh6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTg3LjU3MyA5Ni40MzdjMS41MDEtMS43MDEgMi40MTMtMy45MzUgMi40MTMtNi4zODJWNjAuMjA0SDcwLjY4NXYyMC4yMDF6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTE5LjQzMSA4MC40MDVWMjkuMzRoMjAuNTc4VjEwLjA0SDkuNzgxYy01LjMzIDAtOS42NSA0LjMyMS05LjY1IDkuNjV2NzAuMzY1Yy4wMDEgMi45MDYgMS4yODYgNS41MTMgMy4zMiA3LjI4MXptNzcuODgtNzcuNDQzQzk1LjU1IDEuMDY2IDkzLjAzNi0uMTIgOTAuMjQ0LS4xMjFINTkuOTUxVjE5LjE4aDIwLjY0M3oiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Data Fusion');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud data fusion', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 170, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Data Fusion', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjM3Ny4wNDk2OTgzMjc3ODkyNiIgaGVpZ2h0PSIzNzcuMjkxNTcwNzE1Nzg5NzYiIHZpZXdCb3g9IjAuMTMxMDAwNTE4Nzk4ODI4MTIgLTAuMTIxMDAwMDA2Nzk0OTI5NSA5OS43NjEwMDE1ODY5MTQwNiA5OS44MjQ5OTY5NDgyNDIxOSI+JiN4YTs8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qxe2ZpbGw6IzQyODVmNDt9JiN4YTsJLnN0MntmaWxsOiNhZWNiZmE7fSYjeGE7PC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNODAuNTkzIDE5LjE4djIwLjE5OWgxOS4yOTlWOS41M2MwLTIuNTM3LS45NzktNC44NDYtMi41OC02LjU2OHptLTkuOTA4IDYxLjIyNUgxOS40MzFMMy40NSA5Ny4zMzdjMS42OTUgMS40NzQgMy45MDggMi4zNjcgNi4zMzEgMi4zNjdoNzAuNTU1YzIuODczIDAgNS40NTMtMS4yNTYgNy4yMjEtMy4yNDh6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTg3LjU3MyA5Ni40MzdjMS41MDEtMS43MDEgMi40MTMtMy45MzUgMi40MTMtNi4zODJWNjAuMjA0SDcwLjY4NXYyMC4yMDF6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTE5LjQzMSA4MC40MDVWMjkuMzRoMjAuNTc4VjEwLjA0SDkuNzgxYy01LjMzIDAtOS42NSA0LjMyMS05LjY1IDkuNjV2NzAuMzY1Yy4wMDEgMi45MDYgMS4yODYgNS41MTMgMy4zMiA3LjI4MXptNzcuODgtNzcuNDQzQzk1LjU1IDEuMDY2IDkzLjAzNi0uMTIgOTAuMjQ0LS4xMjFINTkuOTUxVjE5LjE4aDIwLjY0M3oiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Data Fusion');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud data fusion', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 178, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Data Fusion', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjM3Ny4wNDk2OTgzMjc3ODkyNiIgaGVpZ2h0PSIzNzcuMjkxNTcwNzE1Nzg5NzYiIHZpZXdCb3g9IjAuMTMxMDAwNTE4Nzk4ODI4MTIgLTAuMTIxMDAwMDA2Nzk0OTI5NSA5OS43NjEwMDE1ODY5MTQwNiA5OS44MjQ5OTY5NDgyNDIxOSI+JiN4YTs8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qxe2ZpbGw6IzQyODVmNDt9JiN4YTsJLnN0MntmaWxsOiNhZWNiZmE7fSYjeGE7PC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNODAuNTkzIDE5LjE4djIwLjE5OWgxOS4yOTlWOS41M2MwLTIuNTM3LS45NzktNC44NDYtMi41OC02LjU2OHptLTkuOTA4IDYxLjIyNUgxOS40MzFMMy40NSA5Ny4zMzdjMS42OTUgMS40NzQgMy45MDggMi4zNjcgNi4zMzEgMi4zNjdoNzAuNTU1YzIuODczIDAgNS40NTMtMS4yNTYgNy4yMjEtMy4yNDh6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTg3LjU3MyA5Ni40MzdjMS41MDEtMS43MDEgMi40MTMtMy45MzUgMi40MTMtNi4zODJWNjAuMjA0SDcwLjY4NXYyMC4yMDF6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTE5LjQzMSA4MC40MDVWMjkuMzRoMjAuNTc4VjEwLjA0SDkuNzgxYy01LjMzIDAtOS42NSA0LjMyMS05LjY1IDkuNjV2NzAuMzY1Yy4wMDEgMi45MDYgMS4yODYgNS41MTMgMy4zMiA3LjI4MXptNzcuODgtNzcuNDQzQzk1LjU1IDEuMDY2IDkzLjAzNi0uMTIgOTAuMjQ0LS4xMjFINTkuOTUxVjE5LjE4aDIwLjY0M3oiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Data Fusion');
			})
		);

		this.addPalette('gcp2Data Analytics', 'GCP / Data Analytics', false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addGCP2DataTransferPalette = function()
	{
		var dt = 'gcp google cloud platform data transfer ';
		var fns = [];
		
		fns.push(
			this.addEntry(dt + 'transfer appliance', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 130, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Transfer\nAppliance', 
			    		new mxGeometry(0, 0, 30, 16), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE5LjkzMzEzNDA3ODk3OTQ5MiIgaGVpZ2h0PSIxMC44NjAwMDA2MTAzNTE1NjIiIHZpZXdCb3g9IjAuMDAwMDI2NTAxNDY0MTYyNzIwMzY3IC0zLjgxMjY2MDA1NDMzNjQ0NzVlLTggMTkuOTMzMTM0MDc4OTc5NDkyIDEwLjg2MDAwMDYxMDM1MTU2MiI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJLnN0MXtmaWxsOiM2NjlkZjY7fSYjeGE7CS5zdDJ7ZmlsbDojYWVjYmZhO30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xOS41NjMgMEg3LjE5M2EuMzIuMzIgMCAwIDAtLjMyLjMzdjIuMTZhLjMyLjMyIDAgMCAwIC4zMi4zMmgxMi4zN2EuMzIuMzIgMCAwIDAgLjM3LS4zMlYuMzNhLjMyLjMyIDAgMCAwLS4zMS0uMzN6TTguNDIzIDIuMTRhLjcuNyAwIDEgMSAuNy0uN2gwYS43LjcgMCAwIDEtLjcuN3ptMTEuMTQgMS45SDcuMTkzYS4zMi4zMiAwIDAgMC0uMzIuMzJ2Mi4xNWEuMzIuMzIgMCAwIDAgLjMyLjMyaDEyLjM3YS4zMi4zMiAwIDAgMCAuMzItLjMyVjQuMzZhLjMyLjMyIDAgMCAwLS4zMi0uMzJ6TTguNDIzIDYuMThhLjcuNyAwIDEgMSAuNy0uN2gwYS43LjcgMCAwIDEtLjcuN3ptMTEuMTkgMS44N0g3LjI1M2EuMzIuMzIgMCAwIDAtLjMyLjMydjIuMTZhLjMyLjMyIDAgMCAwIC4zMi4zM2gxMi4zNmEuMzIuMzIgMCAwIDAgLjMyLS4zM1Y4LjM3YS4zMi4zMiAwIDAgMC0uMzItLjMyem0tMTEuMTQgMi4xM2EuNzEuNzEgMCAwIDEtLjctLjcxLjcxLjcxIDAgMCAxIDEuNDEgMCAuNzEuNzEgMCAwIDEtLjcxLjcxeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik00LjY3MyAzLjI5aC0yLjEzYS44MTIuODEyIDAgMCAxLS4yMS0xLjYxaDIuMzRhLjgxNS44MTUgMCAxIDEgLjI2IDEuNjF6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTQuNjczIDYuMjRILjg1M2EuODIuODIgMCAwIDEtLjIxLTEuNjJoNGEuODIzLjgyMyAwIDAgMSAuMjkgMS42MnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNNC42NzMgOS4xOGgtMi4xM2EuODEyLjgxMiAwIDAgMS0uMjEtMS42MWgyLjM0YS44MTUuODE1IDAgMCAxIC4yNiAxLjYxeiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 22);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Transfer Appliance');
			})
		);

		fns.push(
			this.addEntry(dt + 'transfer appliance', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 180, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Transfer Appliance', 
			    		new mxGeometry(0, 0, 30, 16), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE5LjkzMzEzNDA3ODk3OTQ5MiIgaGVpZ2h0PSIxMC44NjAwMDA2MTAzNTE1NjIiIHZpZXdCb3g9IjAuMDAwMDI2NTAxNDY0MTYyNzIwMzY3IC0zLjgxMjY2MDA1NDMzNjQ0NzVlLTggMTkuOTMzMTM0MDc4OTc5NDkyIDEwLjg2MDAwMDYxMDM1MTU2MiI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJLnN0MXtmaWxsOiM2NjlkZjY7fSYjeGE7CS5zdDJ7ZmlsbDojYWVjYmZhO30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xOS41NjMgMEg3LjE5M2EuMzIuMzIgMCAwIDAtLjMyLjMzdjIuMTZhLjMyLjMyIDAgMCAwIC4zMi4zMmgxMi4zN2EuMzIuMzIgMCAwIDAgLjM3LS4zMlYuMzNhLjMyLjMyIDAgMCAwLS4zMS0uMzN6TTguNDIzIDIuMTRhLjcuNyAwIDEgMSAuNy0uN2gwYS43LjcgMCAwIDEtLjcuN3ptMTEuMTQgMS45SDcuMTkzYS4zMi4zMiAwIDAgMC0uMzIuMzJ2Mi4xNWEuMzIuMzIgMCAwIDAgLjMyLjMyaDEyLjM3YS4zMi4zMiAwIDAgMCAuMzItLjMyVjQuMzZhLjMyLjMyIDAgMCAwLS4zMi0uMzJ6TTguNDIzIDYuMThhLjcuNyAwIDEgMSAuNy0uN2gwYS43LjcgMCAwIDEtLjcuN3ptMTEuMTkgMS44N0g3LjI1M2EuMzIuMzIgMCAwIDAtLjMyLjMydjIuMTZhLjMyLjMyIDAgMCAwIC4zMi4zM2gxMi4zNmEuMzIuMzIgMCAwIDAgLjMyLS4zM1Y4LjM3YS4zMi4zMiAwIDAgMC0uMzItLjMyem0tMTEuMTQgMi4xM2EuNzEuNzEgMCAwIDEtLjctLjcxLjcxLjcxIDAgMCAxIDEuNDEgMCAuNzEuNzEgMCAwIDEtLjcxLjcxeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik00LjY3MyAzLjI5aC0yLjEzYS44MTIuODEyIDAgMCAxLS4yMS0xLjYxaDIuMzRhLjgxNS44MTUgMCAxIDEgLjI2IDEuNjF6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTQuNjczIDYuMjRILjg1M2EuODIuODIgMCAwIDEtLjIxLTEuNjJoNGEuODIzLjgyMyAwIDAgMSAuMjkgMS42MnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNNC42NzMgOS4xOGgtMi4xM2EuODEyLjgxMiAwIDAgMS0uMjEtMS42MWgyLjM0YS44MTUuODE1IDAgMCAxIC4yNiAxLjYxeiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 22);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Transfer Appliance');
			})
		);

		fns.push(
			this.addEntry(dt + 'transfer appliance', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 188, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Transfer Appliance', 
			    		new mxGeometry(0, 0, 30, 16), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE5LjkzMzEzNDA3ODk3OTQ5MiIgaGVpZ2h0PSIxMC44NjAwMDA2MTAzNTE1NjIiIHZpZXdCb3g9IjAuMDAwMDI2NTAxNDY0MTYyNzIwMzY3IC0zLjgxMjY2MDA1NDMzNjQ0NzVlLTggMTkuOTMzMTM0MDc4OTc5NDkyIDEwLjg2MDAwMDYxMDM1MTU2MiI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJLnN0MXtmaWxsOiM2NjlkZjY7fSYjeGE7CS5zdDJ7ZmlsbDojYWVjYmZhO30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xOS41NjMgMEg3LjE5M2EuMzIuMzIgMCAwIDAtLjMyLjMzdjIuMTZhLjMyLjMyIDAgMCAwIC4zMi4zMmgxMi4zN2EuMzIuMzIgMCAwIDAgLjM3LS4zMlYuMzNhLjMyLjMyIDAgMCAwLS4zMS0uMzN6TTguNDIzIDIuMTRhLjcuNyAwIDEgMSAuNy0uN2gwYS43LjcgMCAwIDEtLjcuN3ptMTEuMTQgMS45SDcuMTkzYS4zMi4zMiAwIDAgMC0uMzIuMzJ2Mi4xNWEuMzIuMzIgMCAwIDAgLjMyLjMyaDEyLjM3YS4zMi4zMiAwIDAgMCAuMzItLjMyVjQuMzZhLjMyLjMyIDAgMCAwLS4zMi0uMzJ6TTguNDIzIDYuMThhLjcuNyAwIDEgMSAuNy0uN2gwYS43LjcgMCAwIDEtLjcuN3ptMTEuMTkgMS44N0g3LjI1M2EuMzIuMzIgMCAwIDAtLjMyLjMydjIuMTZhLjMyLjMyIDAgMCAwIC4zMi4zM2gxMi4zNmEuMzIuMzIgMCAwIDAgLjMyLS4zM1Y4LjM3YS4zMi4zMiAwIDAgMC0uMzItLjMyem0tMTEuMTQgMi4xM2EuNzEuNzEgMCAwIDEtLjctLjcxLjcxLjcxIDAgMCAxIDEuNDEgMCAuNzEuNzEgMCAwIDEtLjcxLjcxeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik00LjY3MyAzLjI5aC0yLjEzYS44MTIuODEyIDAgMCAxLS4yMS0xLjYxaDIuMzRhLjgxNS44MTUgMCAxIDEgLjI2IDEuNjF6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTQuNjczIDYuMjRILjg1M2EuODIuODIgMCAwIDEtLjIxLTEuNjJoNGEuODIzLjgyMyAwIDAgMSAuMjkgMS42MnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNNC42NzMgOS4xOGgtMi4xM2EuODEyLjgxMiAwIDAgMS0uMjEtMS42MWgyLjM0YS44MTUuODE1IDAgMCAxIC4yNiAxLjYxeiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 22);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Transfer Appliance');
			})
		);

		this.addPalette('gcp2Data Transfer', 'GCP / Data Transfer', false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addGCP2CloudAIPalette = function()
	{
		var dt = 'gcp google cloud platform ai artificial intelligence ';
		var fns = [];
		
		fns.push(
			this.addEntry(dt + 'cloud machine learning', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 160, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Cloud Machine\nLearning', 
			    		new mxGeometry(0, 0, 30, 27), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE3LjUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgdmlld0JveD0iMCAwIDIwIDE3LjUiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xOC45MSAxMC42M0wyMCA4Ljc1IDE3LjgyIDVoLTMuMDdsLTEuMDYtMS44NkgxMi41VjEuODhoMS45NGwxLjA2IDEuODdoMS41OUwxNC45IDBoLTQuMjd2NWgxLjczbC43MyAxLjI1aC0yLjQ2djIuNWgyLjI2bDEuMDUtMS44N2gyLjgxbC43MiAxLjI1aC0yLjhMMTMuNjIgMTBoLTIuOTl2NC4zOGgzLjRsLS43MiAxLjI1aC0yLjY4djEuODdoNC4yN2wzLjI4LTUuNjJoLTIuMDlsLS43MyAxLjI1SDEyLjV2LTEuMjVoMi4xNGwuNzQtMS4yNXoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMS4wOSAxMC42M0wwIDguNzUgMi4xOCA1aDMuMDdsMS4wNi0xLjg2SDcuNVYxLjg4SDUuNTZMNC41IDMuNzVIMi45MUw1LjEgMGg0LjI4djVINy42NGwtLjczIDEuMjVoMi40N3YyLjVINy4xMUw2LjA2IDYuODhIMy4yNWwtLjcyIDEuMjVoMi44TDYuMzggMTBoM3Y0LjM4SDUuOTdsLjcyIDEuMjVoMi42OXYxLjg3SDUuMWwtMy4yOC01LjYyaDIuMDlsLjczIDEuMjVINy41di0xLjI1SDUuMzZsLS43NC0xLjI1eiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 16);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Machine Learning');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud machine learning', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 210, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Machine Learning', 
			    		new mxGeometry(0, 0, 30, 27), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE3LjUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgdmlld0JveD0iMCAwIDIwIDE3LjUiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xOC45MSAxMC42M0wyMCA4Ljc1IDE3LjgyIDVoLTMuMDdsLTEuMDYtMS44NkgxMi41VjEuODhoMS45NGwxLjA2IDEuODdoMS41OUwxNC45IDBoLTQuMjd2NWgxLjczbC43MyAxLjI1aC0yLjQ2djIuNWgyLjI2bDEuMDUtMS44N2gyLjgxbC43MiAxLjI1aC0yLjhMMTMuNjIgMTBoLTIuOTl2NC4zOGgzLjRsLS43MiAxLjI1aC0yLjY4djEuODdoNC4yN2wzLjI4LTUuNjJoLTIuMDlsLS43MyAxLjI1SDEyLjV2LTEuMjVoMi4xNGwuNzQtMS4yNXoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMS4wOSAxMC42M0wwIDguNzUgMi4xOCA1aDMuMDdsMS4wNi0xLjg2SDcuNVYxLjg4SDUuNTZMNC41IDMuNzVIMi45MUw1LjEgMGg0LjI4djVINy42NGwtLjczIDEuMjVoMi40N3YyLjVINy4xMUw2LjA2IDYuODhIMy4yNWwtLjcyIDEuMjVoMi44TDYuMzggMTBoM3Y0LjM4SDUuOTdsLjcyIDEuMjVoMi42OXYxLjg3SDUuMWwtMy4yOC01LjYyaDIuMDlsLjczIDEuMjVINy41di0xLjI1SDUuMzZsLS43NC0xLjI1eiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 16);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Machine Learning');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud machine learning', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 218, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Machine Learning', 
			    		new mxGeometry(0, 0, 30, 27), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE3LjUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgdmlld0JveD0iMCAwIDIwIDE3LjUiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xOC45MSAxMC42M0wyMCA4Ljc1IDE3LjgyIDVoLTMuMDdsLTEuMDYtMS44NkgxMi41VjEuODhoMS45NGwxLjA2IDEuODdoMS41OUwxNC45IDBoLTQuMjd2NWgxLjczbC43MyAxLjI1aC0yLjQ2djIuNWgyLjI2bDEuMDUtMS44N2gyLjgxbC43MiAxLjI1aC0yLjhMMTMuNjIgMTBoLTIuOTl2NC4zOGgzLjRsLS43MiAxLjI1aC0yLjY4djEuODdoNC4yN2wzLjI4LTUuNjJoLTIuMDlsLS43MyAxLjI1SDEyLjV2LTEuMjVoMi4xNGwuNzQtMS4yNXoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMS4wOSAxMC42M0wwIDguNzUgMi4xOCA1aDMuMDdsMS4wNi0xLjg2SDcuNVYxLjg4SDUuNTZMNC41IDMuNzVIMi45MUw1LjEgMGg0LjI4djVINy42NGwtLjczIDEuMjVoMi40N3YyLjVINy4xMUw2LjA2IDYuODhIMy4yNWwtLjcyIDEuMjVoMi44TDYuMzggMTBoM3Y0LjM4SDUuOTdsLjcyIDEuMjVoMi42OXYxLjg3SDUuMWwtMy4yOC01LjYyaDIuMDlsLjczIDEuMjVINy41di0xLjI1SDUuMzZsLS43NC0xLjI1eiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 16);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Machine Learning');
			})
		);

		fns.push(
			this.addEntry(dt + 'natural language api application programming interface', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 150, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Natural\nLanguage API', 
			    		new mxGeometry(0, 0, 30, 24), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE2IiB2aWV3Qm94PSIwIDAgMjAgMTYiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM2NjlkZjY7fSYjeGE7CS5zdDF7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTUgMmgzdjEyaC0zdjJoMyAydi0yVjIgMGgtMi0zeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xOCAydjFsMi0xem0yIDEydi0xbC0yIDF6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTUgMTRIMlYyaDNWMEgyIDB2MiAxMiAyaDIgM3oiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMCAxNHYtMWwyIDF6TTIgMnYxTDAgMnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNNSA3aDEwdjJINXptMCAzaDEwdjJINXptMC02aDEwdjJINXoiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 18);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Natural Language API');
			})
		);

		fns.push(
			this.addEntry(dt + 'natural language api application programming interface', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 190, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Natural Language API', 
			    		new mxGeometry(0, 0, 30, 24), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE2IiB2aWV3Qm94PSIwIDAgMjAgMTYiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM2NjlkZjY7fSYjeGE7CS5zdDF7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTUgMmgzdjEyaC0zdjJoMyAydi0yVjIgMGgtMi0zeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xOCAydjFsMi0xem0yIDEydi0xbC0yIDF6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTUgMTRIMlYyaDNWMEgyIDB2MiAxMiAyaDIgM3oiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMCAxNHYtMWwyIDF6TTIgMnYxTDAgMnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNNSA3aDEwdjJINXptMCAzaDEwdjJINXptMC02aDEwdjJINXoiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 18);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Natural Language API');
			})
		);

		fns.push(
			this.addEntry(dt + 'natural language api application programming interface', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 198, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Natural Language API', 
			    		new mxGeometry(0, 0, 30, 24), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE2IiB2aWV3Qm94PSIwIDAgMjAgMTYiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM2NjlkZjY7fSYjeGE7CS5zdDF7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTUgMmgzdjEyaC0zdjJoMyAydi0yVjIgMGgtMi0zeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xOCAydjFsMi0xem0yIDEydi0xbC0yIDF6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTUgMTRIMlYyaDNWMEgyIDB2MiAxMiAyaDIgM3oiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMCAxNHYtMWwyIDF6TTIgMnYxTDAgMnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNNSA3aDEwdjJINXptMCAzaDEwdjJINXptMC02aDEwdjJINXoiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 18);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Natural Language API');
			})
		);

		fns.push(
			this.addEntry(dt + 'vision api application programming interface', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 110, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Vision\nAPI', 
			    		new mxGeometry(0, 0, 30, 24), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE2IiB2aWV3Qm94PSIwIDAgMjAgMTYiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM2NjlkZjY7fSYjeGE7CS5zdDF7ZmlsbDojYWVjYmZhO30mI3hhOwkuc3Qye2ZpbGw6IzQyODVmNDt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8ZyBjbGFzcz0ic3QwIj4mI3hhOwkJPHBhdGggZD0iTTEwIDE2TDAgOGg0bDYgNC45OXoiLz4mI3hhOwkJPHBhdGggZD0iTTIwIDhsLTEwIDh2LTMuMDFMMTYgOHoiLz4mI3hhOwk8L2c+JiN4YTsJPGcgY2xhc3M9InN0MSI+JiN4YTsJCTxwYXRoIGQ9Ik0xMCAzLjAxTDQgOEgwbDEwLTh6Ii8+JiN4YTsJCTxwYXRoIGQ9Ik0yMCA4TDEwIDB2My4wMUwxNiA4eiIvPiYjeGE7CTwvZz4mI3hhOwk8Y2lyY2xlIGNsYXNzPSJzdDIiIGN4PSIxMCIgY3k9IjgiIHI9IjIiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 18);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Vision API');
			})
		);

		fns.push(
			this.addEntry(dt + 'vision api application programming interface', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 130, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Vision API', 
			    		new mxGeometry(0, 0, 30, 24), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE2IiB2aWV3Qm94PSIwIDAgMjAgMTYiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM2NjlkZjY7fSYjeGE7CS5zdDF7ZmlsbDojYWVjYmZhO30mI3hhOwkuc3Qye2ZpbGw6IzQyODVmNDt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8ZyBjbGFzcz0ic3QwIj4mI3hhOwkJPHBhdGggZD0iTTEwIDE2TDAgOGg0bDYgNC45OXoiLz4mI3hhOwkJPHBhdGggZD0iTTIwIDhsLTEwIDh2LTMuMDFMMTYgOHoiLz4mI3hhOwk8L2c+JiN4YTsJPGcgY2xhc3M9InN0MSI+JiN4YTsJCTxwYXRoIGQ9Ik0xMCAzLjAxTDQgOEgwbDEwLTh6Ii8+JiN4YTsJCTxwYXRoIGQ9Ik0yMCA4TDEwIDB2My4wMUwxNiA4eiIvPiYjeGE7CTwvZz4mI3hhOwk8Y2lyY2xlIGNsYXNzPSJzdDIiIGN4PSIxMCIgY3k9IjgiIHI9IjIiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 18);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Vision API');
			})
		);

		fns.push(
			this.addEntry(dt + 'vision api application programming interface', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 138, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Vision API', 
			    		new mxGeometry(0, 0, 30, 24), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE2IiB2aWV3Qm94PSIwIDAgMjAgMTYiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM2NjlkZjY7fSYjeGE7CS5zdDF7ZmlsbDojYWVjYmZhO30mI3hhOwkuc3Qye2ZpbGw6IzQyODVmNDt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8ZyBjbGFzcz0ic3QwIj4mI3hhOwkJPHBhdGggZD0iTTEwIDE2TDAgOGg0bDYgNC45OXoiLz4mI3hhOwkJPHBhdGggZD0iTTIwIDhsLTEwIDh2LTMuMDFMMTYgOHoiLz4mI3hhOwk8L2c+JiN4YTsJPGcgY2xhc3M9InN0MSI+JiN4YTsJCTxwYXRoIGQ9Ik0xMCAzLjAxTDQgOEgwbDEwLTh6Ii8+JiN4YTsJCTxwYXRoIGQ9Ik0yMCA4TDEwIDB2My4wMUwxNiA4eiIvPiYjeGE7CTwvZz4mI3hhOwk8Y2lyY2xlIGNsYXNzPSJzdDIiIGN4PSIxMCIgY3k9IjgiIHI9IjIiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 18);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Vision API');
			})
		);

		fns.push(
			this.addEntry(dt + 'translation api application programming interface', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 130, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Translation\nAPI', 
			    		new mxGeometry(0, 0, 30, 27), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE4IiB2aWV3Qm94PSIwIDAgMjAgMTgiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O2ZpbGwtcnVsZTpldmVub2RkfSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTE1LjkxIDcuMmgtMS44MkwxMCAxOGgxLjgybDEtMi43aDQuMzJsMSAyLjdIMjB6bS0yLjM5IDYuM0wxNSA5LjZsMS40OCAzLjl6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTEwLjc5IDExLjc3TDguNDggOS41MWgwYTE1LjYyIDE1LjYyIDAgMCAwIDMuNC01LjkxaDIuNjdWMS44SDguMThWMEg2LjM2djEuOEgwdjEuNzloMTAuMTVhMTQuMDYgMTQuMDYgMCAwIDEtMi44OCA0LjgyIDE0LjU1IDE0LjU1IDAgMCAxLTIuMS0zSDMuMzVhMTYgMTYgMCAwIDAgMi43MSA0LjFMMS40NCAxNGwxLjI5IDEuMyA0LjU0LTQuNSAyLjgzIDIuOHoiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 16);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Translation API');
			})
		);

		fns.push(
			this.addEntry(dt + 'translation api application programming interface', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 160, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Translation API', 
			    		new mxGeometry(0, 0, 30, 27), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE4IiB2aWV3Qm94PSIwIDAgMjAgMTgiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O2ZpbGwtcnVsZTpldmVub2RkfSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTE1LjkxIDcuMmgtMS44MkwxMCAxOGgxLjgybDEtMi43aDQuMzJsMSAyLjdIMjB6bS0yLjM5IDYuM0wxNSA5LjZsMS40OCAzLjl6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTEwLjc5IDExLjc3TDguNDggOS41MWgwYTE1LjYyIDE1LjYyIDAgMCAwIDMuNC01LjkxaDIuNjdWMS44SDguMThWMEg2LjM2djEuOEgwdjEuNzloMTAuMTVhMTQuMDYgMTQuMDYgMCAwIDEtMi44OCA0LjgyIDE0LjU1IDE0LjU1IDAgMCAxLTIuMS0zSDMuMzVhMTYgMTYgMCAwIDAgMi43MSA0LjFMMS40NCAxNGwxLjI5IDEuMyA0LjU0LTQuNSAyLjgzIDIuOHoiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 16);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Translation API');
			})
		);

		fns.push(
			this.addEntry(dt + 'translation api application programming interface', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 168, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Translation API', 
			    		new mxGeometry(0, 0, 30, 27), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE4IiB2aWV3Qm94PSIwIDAgMjAgMTgiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O2ZpbGwtcnVsZTpldmVub2RkfSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTE1LjkxIDcuMmgtMS44MkwxMCAxOGgxLjgybDEtMi43aDQuMzJsMSAyLjdIMjB6bS0yLjM5IDYuM0wxNSA5LjZsMS40OCAzLjl6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTEwLjc5IDExLjc3TDguNDggOS41MWgwYTE1LjYyIDE1LjYyIDAgMCAwIDMuNC01LjkxaDIuNjdWMS44SDguMThWMEg2LjM2djEuOEgwdjEuNzloMTAuMTVhMTQuMDYgMTQuMDYgMCAwIDEtMi44OCA0LjgyIDE0LjU1IDE0LjU1IDAgMCAxLTIuMS0zSDMuMzVhMTYgMTYgMCAwIDAgMi43MSA0LjFMMS40NCAxNGwxLjI5IDEuMyA0LjU0LTQuNSAyLjgzIDIuOHoiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 16);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Translation API');
			})
		);

		fns.push(
			this.addEntry(dt + 'speech to text', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 150, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Speech-to-text', 
			    		new mxGeometry(0, 0, 27, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE4IiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMTggMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik04IDBoMnYyMEg4ek00IDZoMnY4SDR6bTggMGgydjhoLTJ6TTAgM2gydjE0SDB6bTE2IDBoMnYxNGgtMnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNOCAwaDJ2MTBIOHpNNCA2aDJ2NEg0em04IDBoMnY0aC0yek0wIDNoMnY3SDB6bTE2IDBoMnY3aC0yeiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(16, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Speech-to-text');
			})
		);

		fns.push(
			this.addEntry(dt + 'speech to text', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 150, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Speech-to-text', 
			    		new mxGeometry(0, 0, 27, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE4IiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMTggMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik04IDBoMnYyMEg4ek00IDZoMnY4SDR6bTggMGgydjhoLTJ6TTAgM2gydjE0SDB6bTE2IDBoMnYxNGgtMnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNOCAwaDJ2MTBIOHpNNCA2aDJ2NEg0em04IDBoMnY0aC0yek0wIDNoMnY3SDB6bTE2IDBoMnY3aC0yeiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(16, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Speech-to-text');
			})
		);

		fns.push(
			this.addEntry(dt + 'speech to text', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 158, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Speech-to-text', 
			    		new mxGeometry(0, 0, 27, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE4IiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMTggMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik04IDBoMnYyMEg4ek00IDZoMnY4SDR6bTggMGgydjhoLTJ6TTAgM2gydjE0SDB6bTE2IDBoMnYxNGgtMnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNOCAwaDJ2MTBIOHpNNCA2aDJ2NEg0em04IDBoMnY0aC0yek0wIDNoMnY3SDB6bTE2IDBoMnY3aC0yeiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(16, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Speech-to-text');
			})
		);

		fns.push(
			this.addEntry(dt + 'jobs api application programming interface', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 100, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Jobs\nAPI', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE5LjkyMTQ0MjAzMTg2MDM1IiBoZWlnaHQ9IjE5Ljc3ODMyMDMxMjUiIHZpZXdCb3g9Ii0wLjAwMDQ0MTU1NzE3NDc4MTMzNzQgMC4yNSAxOS45MjE0NDIwMzE4NjAzNSAxOS43NzgzMjAzMTI1Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qxe2ZpbGw6I2FlY2JmYTt9JiN4YTsJLnN0MntmaWxsLXJ1bGU6ZXZlbm9kZH0mI3hhOwkuc3Qze2ZpbGw6IzY2OWRmNjt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNC40NjEgMTYuMjRhMyAzIDAgMSAxIDAtNiAzIDMgMCAxIDEgMCA2em0zLjYzLS40YTQuNDMgNC40MyAwIDAgMC01LjA0OS02LjcxNEE0LjQzIDQuNDMgMCAwIDAgLjAxMSAxMy4zMmE0LjkxIDQuOTEgMCAwIDAgMCAuNjcgMy40MyAzLjQzIDAgMCAwIC4wOS40NGwuMDYuMjFhNC41OSA0LjU5IDAgMCAwIC4zNC43OSA0LjI0IDQuMjQgMCAwIDAgLjc2IDFsLjE1LjE1LjMzLjI3YTQuMTYgNC4xNiAwIDAgMCAuNzMuNDQgNC40NCA0LjQ0IDAgMCAwIDQuNTQtLjI5bDIuOTMgMi45M2EuMzMuMzMgMCAwIDAgLjQ3IDBsLjY2LS42NWEuMzMuMzMgMCAwIDAgMC0uNDd6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTkuODExIDE0LjU4YTUuNDEgNS40MSAwIDAgMCAuMi0xLjUxIDUuNTMgNS41MyAwIDAgMC01LjYxLTUuNDIgNS44MiA1LjgyIDAgMCAwLTEuOTIuMzVWMy44M2EuNjIuNjIgMCAwIDEgLjYyLS42MmgxNi4xOWEuNjMuNjMgMCAwIDEgLjYzLjYyVjE0YS42My42MyAwIDAgMS0uNjMuNjN6Ii8+JiN4YTsJPGcgY2xhc3M9InN0MiI+JiN4YTsJCTxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik0xMy41OTEgMy4yMVYxLjczaC00LjQ0djEuNDhoLTEuNDlWLjg3YS42My42MyAwIDAgMSAuNjMtLjYyaDYuMTZhLjYyLjYyIDAgMCAxIC42Mi42MnYyLjM0eiIvPiYjeGE7CQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTUuMDcxIDMuMjFoLTEuNDhsMS40OC0uNDd6bS01LjkzIDBoLTEuNDlsMS40OS0uNTR6Ii8+JiN4YTsJPC9nPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Jobs API');
			})
		);

		fns.push(
			this.addEntry(dt + 'jobs api application programming interface', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 120, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Jobs API', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE5LjkyMTQ0MjAzMTg2MDM1IiBoZWlnaHQ9IjE5Ljc3ODMyMDMxMjUiIHZpZXdCb3g9Ii0wLjAwMDQ0MTU1NzE3NDc4MTMzNzQgMC4yNSAxOS45MjE0NDIwMzE4NjAzNSAxOS43NzgzMjAzMTI1Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qxe2ZpbGw6I2FlY2JmYTt9JiN4YTsJLnN0MntmaWxsLXJ1bGU6ZXZlbm9kZH0mI3hhOwkuc3Qze2ZpbGw6IzY2OWRmNjt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNC40NjEgMTYuMjRhMyAzIDAgMSAxIDAtNiAzIDMgMCAxIDEgMCA2em0zLjYzLS40YTQuNDMgNC40MyAwIDAgMC01LjA0OS02LjcxNEE0LjQzIDQuNDMgMCAwIDAgLjAxMSAxMy4zMmE0LjkxIDQuOTEgMCAwIDAgMCAuNjcgMy40MyAzLjQzIDAgMCAwIC4wOS40NGwuMDYuMjFhNC41OSA0LjU5IDAgMCAwIC4zNC43OSA0LjI0IDQuMjQgMCAwIDAgLjc2IDFsLjE1LjE1LjMzLjI3YTQuMTYgNC4xNiAwIDAgMCAuNzMuNDQgNC40NCA0LjQ0IDAgMCAwIDQuNTQtLjI5bDIuOTMgMi45M2EuMzMuMzMgMCAwIDAgLjQ3IDBsLjY2LS42NWEuMzMuMzMgMCAwIDAgMC0uNDd6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTkuODExIDE0LjU4YTUuNDEgNS40MSAwIDAgMCAuMi0xLjUxIDUuNTMgNS41MyAwIDAgMC01LjYxLTUuNDIgNS44MiA1LjgyIDAgMCAwLTEuOTIuMzVWMy44M2EuNjIuNjIgMCAwIDEgLjYyLS42MmgxNi4xOWEuNjMuNjMgMCAwIDEgLjYzLjYyVjE0YS42My42MyAwIDAgMS0uNjMuNjN6Ii8+JiN4YTsJPGcgY2xhc3M9InN0MiI+JiN4YTsJCTxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik0xMy41OTEgMy4yMVYxLjczaC00LjQ0djEuNDhoLTEuNDlWLjg3YS42My42MyAwIDAgMSAuNjMtLjYyaDYuMTZhLjYyLjYyIDAgMCAxIC42Mi42MnYyLjM0eiIvPiYjeGE7CQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTUuMDcxIDMuMjFoLTEuNDhsMS40OC0uNDd6bS01LjkzIDBoLTEuNDlsMS40OS0uNTR6Ii8+JiN4YTsJPC9nPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Jobs API');
			})
		);

		fns.push(
			this.addEntry(dt + 'jobs api application programming interface', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 128, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Jobs API', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE5LjkyMTQ0MjAzMTg2MDM1IiBoZWlnaHQ9IjE5Ljc3ODMyMDMxMjUiIHZpZXdCb3g9Ii0wLjAwMDQ0MTU1NzE3NDc4MTMzNzQgMC4yNSAxOS45MjE0NDIwMzE4NjAzNSAxOS43NzgzMjAzMTI1Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qxe2ZpbGw6I2FlY2JmYTt9JiN4YTsJLnN0MntmaWxsLXJ1bGU6ZXZlbm9kZH0mI3hhOwkuc3Qze2ZpbGw6IzY2OWRmNjt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNC40NjEgMTYuMjRhMyAzIDAgMSAxIDAtNiAzIDMgMCAxIDEgMCA2em0zLjYzLS40YTQuNDMgNC40MyAwIDAgMC01LjA0OS02LjcxNEE0LjQzIDQuNDMgMCAwIDAgLjAxMSAxMy4zMmE0LjkxIDQuOTEgMCAwIDAgMCAuNjcgMy40MyAzLjQzIDAgMCAwIC4wOS40NGwuMDYuMjFhNC41OSA0LjU5IDAgMCAwIC4zNC43OSA0LjI0IDQuMjQgMCAwIDAgLjc2IDFsLjE1LjE1LjMzLjI3YTQuMTYgNC4xNiAwIDAgMCAuNzMuNDQgNC40NCA0LjQ0IDAgMCAwIDQuNTQtLjI5bDIuOTMgMi45M2EuMzMuMzMgMCAwIDAgLjQ3IDBsLjY2LS42NWEuMzMuMzMgMCAwIDAgMC0uNDd6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTkuODExIDE0LjU4YTUuNDEgNS40MSAwIDAgMCAuMi0xLjUxIDUuNTMgNS41MyAwIDAgMC01LjYxLTUuNDIgNS44MiA1LjgyIDAgMCAwLTEuOTIuMzVWMy44M2EuNjIuNjIgMCAwIDEgLjYyLS42MmgxNi4xOWEuNjMuNjMgMCAwIDEgLjYzLjYyVjE0YS42My42MyAwIDAgMS0uNjMuNjN6Ii8+JiN4YTsJPGcgY2xhc3M9InN0MiI+JiN4YTsJCTxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik0xMy41OTEgMy4yMVYxLjczaC00LjQ0djEuNDhoLTEuNDlWLjg3YS42My42MyAwIDAgMSAuNjMtLjYyaDYuMTZhLjYyLjYyIDAgMCAxIC42Mi42MnYyLjM0eiIvPiYjeGE7CQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTUuMDcxIDMuMjFoLTEuNDhsMS40OC0uNDd6bS01LjkzIDBoLTEuNDlsMS40OS0uNTR6Ii8+JiN4YTsJPC9nPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Jobs API');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud video intelligence api application programming interface', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 160, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Cloud Video\nIntelligence API', 
			    		new mxGeometry(0, 0, 30, 21), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE5Ljk4OTk5OTc3MTExODE2NCIgaGVpZ2h0PSIxNCIgdmlld0JveD0iMCAwIDE5Ljk4OTk5OTc3MTExODE2NCAxNCI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzY2OWRmNjt9JiN4YTsJLnN0MXtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTEwLjI3IDIuMzNoMi4wNXYxLjMzSDkuNEw3LjA3IDBIMHY0LjMzaDEuOTlMMy4yNSAyaDIuNTdsLjg2IDEuMzNINC4xMUwyLjg1IDUuNjZIMHYyLjU5aDIuODVsMS4yNiAyLjQxaDIuNTdMNS44MiAxMkgzLjI1TDEuOTkgOS42NkgwVjE0aDcuMDdsMi4zMy0zLjY3aDIuOTJ2MS4zM2gtMi4wNUw4LjggMTRoNS41MlY3LjY2SDcuOTFMNy4wOCA5SDUuMjRMNi41IDcgNS4yNCA1aDEuODRsLjggMS4zM2g2LjQ0VjBIOC44eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xNS45OSAxMC4xMWw0IDIuOTVWMS4xbC00IDIuOTF6Ii8+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 19);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Video Intelligence API');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud video intelligence api application programming interface', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 230, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Video Intelligence API', 
			    		new mxGeometry(0, 0, 30, 21), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE5Ljk4OTk5OTc3MTExODE2NCIgaGVpZ2h0PSIxNCIgdmlld0JveD0iMCAwIDE5Ljk4OTk5OTc3MTExODE2NCAxNCI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzY2OWRmNjt9JiN4YTsJLnN0MXtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTEwLjI3IDIuMzNoMi4wNXYxLjMzSDkuNEw3LjA3IDBIMHY0LjMzaDEuOTlMMy4yNSAyaDIuNTdsLjg2IDEuMzNINC4xMUwyLjg1IDUuNjZIMHYyLjU5aDIuODVsMS4yNiAyLjQxaDIuNTdMNS44MiAxMkgzLjI1TDEuOTkgOS42NkgwVjE0aDcuMDdsMi4zMy0zLjY3aDIuOTJ2MS4zM2gtMi4wNUw4LjggMTRoNS41MlY3LjY2SDcuOTFMNy4wOCA5SDUuMjRMNi41IDcgNS4yNCA1aDEuODRsLjggMS4zM2g2LjQ0VjBIOC44eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xNS45OSAxMC4xMWw0IDIuOTVWMS4xbC00IDIuOTF6Ii8+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 19);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Video Intelligence API');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud video intelligence api application programming interface', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 238, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Video Intelligence API', 
			    		new mxGeometry(0, 0, 30, 21), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE5Ljk4OTk5OTc3MTExODE2NCIgaGVpZ2h0PSIxNCIgdmlld0JveD0iMCAwIDE5Ljk4OTk5OTc3MTExODE2NCAxNCI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzY2OWRmNjt9JiN4YTsJLnN0MXtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTEwLjI3IDIuMzNoMi4wNXYxLjMzSDkuNEw3LjA3IDBIMHY0LjMzaDEuOTlMMy4yNSAyaDIuNTdsLjg2IDEuMzNINC4xMUwyLjg1IDUuNjZIMHYyLjU5aDIuODVsMS4yNiAyLjQxaDIuNTdMNS44MiAxMkgzLjI1TDEuOTkgOS42NkgwVjE0aDcuMDdsMi4zMy0zLjY3aDIuOTJ2MS4zM2gtMi4wNUw4LjggMTRoNS41MlY3LjY2SDcuOTFMNy4wOCA5SDUuMjRMNi41IDcgNS4yNCA1aDEuODRsLjggMS4zM2g2LjQ0VjBIOC44eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xNS45OSAxMC4xMWw0IDIuOTVWMS4xbC00IDIuOTF6Ii8+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 19);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Video Intelligence API');
			})
		);

		fns.push(
			this.addEntry(dt + 'advanced solutions lab', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 140, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Advanced\nSolutions Lab', 
			    		new mxGeometry(0, 0, 26, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE2Ljk3OTk5OTU0MjIzNjMyOCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDE2Ljk3OTk5OTU0MjIzNjMyOCAyMCI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzY2OWRmNjt9JiN4YTsJLnN0MXtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDJ7ZmlsbDojYWVjYmZhO30mI3hhOwk8L3N0eWxlPiYjeGE7CTxnIGNsYXNzPSJzdDAiPiYjeGE7CQk8cGF0aCBkPSJNOC40OSAxMC4yOUwuMjQgNS4zNSA4LjQ5LjU4bDguMjQgNC42N3pNMS43NiA1LjM2bDYuNzIgNCA2LjcyLTQuMTEtNi43MS0zLjc4eiIvPiYjeGE7CQk8cGF0aCBkPSJNOC40OSAxOS40NEwuMjEgMTMuODkgOC40OSA5LjNsOC4xNSA0LjY0em0tNi44LTUuNWw2LjggNC41NiA2LjctNC41LTYuNy0zLjgyeiIvPiYjeGE7CTwvZz4mI3hhOwk8ZyBjbGFzcz0ic3QxIj4mI3hhOwkJPHBhdGggZD0iTS42MTMgNS41MDJsLjY3NS0uMzcxIDcuNDc3IDEzLjYtLjY3NS4zNzF6Ii8+JiN4YTsJCTxwYXRoIGQ9Ik04LjE5NCAxOC44MjZsNy4zMDEtMTMuNTU5LjY3OC4zNjUtNy4zMDEgMTMuNTU5ek0uNzE2IDEzLjY4N0w4LjA5Ni45MDRsLjY2Ny4zODUtNy4zOCAxMi43ODN6Ii8+JiN4YTsJCTxwYXRoIGQ9Ik04LjE5NCAxLjIxNGwuNjY5LS4zODEgNy40MDUgMTIuOTg3LS42NjkuMzgxeiIvPiYjeGE7CQk8cGF0aCBkPSJNOC4xMy45NmguNzdWMTguOWgtLjc3ek0uNTUgNS40M2guNzd2OC42NkguNTV6bTE0Ljk3LS4wOWguNzdWMTRoLS43N3oiLz4mI3hhOwk8L2c+JiN4YTsJPGcgY2xhc3M9InN0MiI+JiN4YTsJCTxjaXJjbGUgY3g9IjguNTIiIGN5PSIxLjA3IiByPSIxLjA3Ii8+JiN4YTsJCTxjaXJjbGUgY3g9IjE1LjkxIiBjeT0iNS4zNCIgcj0iMS4wNyIvPiYjeGE7CQk8Y2lyY2xlIGN4PSIxLjA3IiBjeT0iNS4zNCIgcj0iMS4wNyIvPiYjeGE7CQk8Y2lyY2xlIGN4PSI4LjUyIiBjeT0iOS45MyIgcj0iMS42OCIvPiYjeGE7CQk8Y2lyY2xlIGN4PSIxNS45MSIgY3k9IjEzLjk0IiByPSIxLjA3Ii8+JiN4YTsJCTxjaXJjbGUgY3g9IjEuMDciIGN5PSIxMy45NCIgcj0iMS4wNyIvPiYjeGE7CQk8Y2lyY2xlIGN4PSI4LjUyIiBjeT0iMTguOTMiIHI9IjEuMDciLz4mI3hhOwkJPHBhdGggZD0iTTguNDkgMTAuMjlMLjI0IDUuMzUgOC40OS41OGw4LjI0IDQuNjd6TTEuNzYgNS4zNmw2LjcyIDQgNi43Mi00LjExLTYuNzEtMy43OHoiLz4mI3hhOwkJPHBhdGggZD0iTTguNDkgMTkuNDRMLjIxIDEzLjg5IDguNDkgOS4zbDguMTUgNC42NHptLTYuOC01LjVsNi44IDQuNTYgNi43LTQuNS02LjctMy44MnoiLz4mI3hhOwkJPHBhdGggZD0iTS42MTMgNS41MDJsLjY3NS0uMzcxIDcuNDc3IDEzLjYtLjY3NS4zNzF6Ii8+JiN4YTsJCTxwYXRoIGQ9Ik04LjE5NCAxOC44MjZsNy4zMDEtMTMuNTU5LjY3OC4zNjUtNy4zMDEgMTMuNTU5ek0uNzE2IDEzLjY4N0w4LjA5Ni45MDRsLjY2Ny4zODUtNy4zOCAxMi43ODN6Ii8+JiN4YTsJCTxwYXRoIGQ9Ik04LjE5NCAxLjIxNGwuNjY5LS4zODEgNy40MDUgMTIuOTg3LS42NjkuMzgxeiIvPiYjeGE7CQk8cGF0aCBkPSJNOC4xMy45NmguNzdWMTguOWgtLjc3ek0uNTUgNS40M2guNzd2OC42NkguNTV6bTE0Ljk3LS4wOWguNzdWMTRoLS43N3oiLz4mI3hhOwk8L2c+JiN4YTsJPGcgY2xhc3M9InN0MCI+JiN4YTsJCTxjaXJjbGUgY3g9IjguNTIiIGN5PSIxLjA3IiByPSIxLjA3Ii8+JiN4YTsJCTxjaXJjbGUgY3g9IjE1LjkxIiBjeT0iNS4zNCIgcj0iMS4wNyIvPiYjeGE7CQk8Y2lyY2xlIGN4PSIxLjA3IiBjeT0iNS4zNCIgcj0iMS4wNyIvPiYjeGE7CQk8Y2lyY2xlIGN4PSI4LjUyIiBjeT0iOS45MyIgcj0iMS42OCIvPiYjeGE7CQk8Y2lyY2xlIGN4PSIxNS45MSIgY3k9IjEzLjk0IiByPSIxLjA3Ii8+JiN4YTsJCTxjaXJjbGUgY3g9IjEuMDciIGN5PSIxMy45NCIgcj0iMS4wNyIvPiYjeGE7CQk8Y2lyY2xlIGN4PSI4LjUyIiBjeT0iMTguOTMiIHI9IjEuMDciLz4mI3hhOwk8L2c+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 19);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Advanced Solutions Lab');
			})
		);

		fns.push(
			this.addEntry(dt + 'advanced solutions lab', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 200, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Advanced Solutions Lab', 
			    		new mxGeometry(0, 0, 26, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE2Ljk3OTk5OTU0MjIzNjMyOCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDE2Ljk3OTk5OTU0MjIzNjMyOCAyMCI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzY2OWRmNjt9JiN4YTsJLnN0MXtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDJ7ZmlsbDojYWVjYmZhO30mI3hhOwk8L3N0eWxlPiYjeGE7CTxnIGNsYXNzPSJzdDAiPiYjeGE7CQk8cGF0aCBkPSJNOC40OSAxMC4yOUwuMjQgNS4zNSA4LjQ5LjU4bDguMjQgNC42N3pNMS43NiA1LjM2bDYuNzIgNCA2LjcyLTQuMTEtNi43MS0zLjc4eiIvPiYjeGE7CQk8cGF0aCBkPSJNOC40OSAxOS40NEwuMjEgMTMuODkgOC40OSA5LjNsOC4xNSA0LjY0em0tNi44LTUuNWw2LjggNC41NiA2LjctNC41LTYuNy0zLjgyeiIvPiYjeGE7CTwvZz4mI3hhOwk8ZyBjbGFzcz0ic3QxIj4mI3hhOwkJPHBhdGggZD0iTS42MTMgNS41MDJsLjY3NS0uMzcxIDcuNDc3IDEzLjYtLjY3NS4zNzF6Ii8+JiN4YTsJCTxwYXRoIGQ9Ik04LjE5NCAxOC44MjZsNy4zMDEtMTMuNTU5LjY3OC4zNjUtNy4zMDEgMTMuNTU5ek0uNzE2IDEzLjY4N0w4LjA5Ni45MDRsLjY2Ny4zODUtNy4zOCAxMi43ODN6Ii8+JiN4YTsJCTxwYXRoIGQ9Ik04LjE5NCAxLjIxNGwuNjY5LS4zODEgNy40MDUgMTIuOTg3LS42NjkuMzgxeiIvPiYjeGE7CQk8cGF0aCBkPSJNOC4xMy45NmguNzdWMTguOWgtLjc3ek0uNTUgNS40M2guNzd2OC42NkguNTV6bTE0Ljk3LS4wOWguNzdWMTRoLS43N3oiLz4mI3hhOwk8L2c+JiN4YTsJPGcgY2xhc3M9InN0MiI+JiN4YTsJCTxjaXJjbGUgY3g9IjguNTIiIGN5PSIxLjA3IiByPSIxLjA3Ii8+JiN4YTsJCTxjaXJjbGUgY3g9IjE1LjkxIiBjeT0iNS4zNCIgcj0iMS4wNyIvPiYjeGE7CQk8Y2lyY2xlIGN4PSIxLjA3IiBjeT0iNS4zNCIgcj0iMS4wNyIvPiYjeGE7CQk8Y2lyY2xlIGN4PSI4LjUyIiBjeT0iOS45MyIgcj0iMS42OCIvPiYjeGE7CQk8Y2lyY2xlIGN4PSIxNS45MSIgY3k9IjEzLjk0IiByPSIxLjA3Ii8+JiN4YTsJCTxjaXJjbGUgY3g9IjEuMDciIGN5PSIxMy45NCIgcj0iMS4wNyIvPiYjeGE7CQk8Y2lyY2xlIGN4PSI4LjUyIiBjeT0iMTguOTMiIHI9IjEuMDciLz4mI3hhOwkJPHBhdGggZD0iTTguNDkgMTAuMjlMLjI0IDUuMzUgOC40OS41OGw4LjI0IDQuNjd6TTEuNzYgNS4zNmw2LjcyIDQgNi43Mi00LjExLTYuNzEtMy43OHoiLz4mI3hhOwkJPHBhdGggZD0iTTguNDkgMTkuNDRMLjIxIDEzLjg5IDguNDkgOS4zbDguMTUgNC42NHptLTYuOC01LjVsNi44IDQuNTYgNi43LTQuNS02LjctMy44MnoiLz4mI3hhOwkJPHBhdGggZD0iTS42MTMgNS41MDJsLjY3NS0uMzcxIDcuNDc3IDEzLjYtLjY3NS4zNzF6Ii8+JiN4YTsJCTxwYXRoIGQ9Ik04LjE5NCAxOC44MjZsNy4zMDEtMTMuNTU5LjY3OC4zNjUtNy4zMDEgMTMuNTU5ek0uNzE2IDEzLjY4N0w4LjA5Ni45MDRsLjY2Ny4zODUtNy4zOCAxMi43ODN6Ii8+JiN4YTsJCTxwYXRoIGQ9Ik04LjE5NCAxLjIxNGwuNjY5LS4zODEgNy40MDUgMTIuOTg3LS42NjkuMzgxeiIvPiYjeGE7CQk8cGF0aCBkPSJNOC4xMy45NmguNzdWMTguOWgtLjc3ek0uNTUgNS40M2guNzd2OC42NkguNTV6bTE0Ljk3LS4wOWguNzdWMTRoLS43N3oiLz4mI3hhOwk8L2c+JiN4YTsJPGcgY2xhc3M9InN0MCI+JiN4YTsJCTxjaXJjbGUgY3g9IjguNTIiIGN5PSIxLjA3IiByPSIxLjA3Ii8+JiN4YTsJCTxjaXJjbGUgY3g9IjE1LjkxIiBjeT0iNS4zNCIgcj0iMS4wNyIvPiYjeGE7CQk8Y2lyY2xlIGN4PSIxLjA3IiBjeT0iNS4zNCIgcj0iMS4wNyIvPiYjeGE7CQk8Y2lyY2xlIGN4PSI4LjUyIiBjeT0iOS45MyIgcj0iMS42OCIvPiYjeGE7CQk8Y2lyY2xlIGN4PSIxNS45MSIgY3k9IjEzLjk0IiByPSIxLjA3Ii8+JiN4YTsJCTxjaXJjbGUgY3g9IjEuMDciIGN5PSIxMy45NCIgcj0iMS4wNyIvPiYjeGE7CQk8Y2lyY2xlIGN4PSI4LjUyIiBjeT0iMTguOTMiIHI9IjEuMDciLz4mI3hhOwk8L2c+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 19);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Advanced Solutions Lab');
			})
		);

		fns.push(
			this.addEntry(dt + 'advanced solutions lab', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 208, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Advanced Solutions Lab', 
			    		new mxGeometry(0, 0, 26, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE2Ljk3OTk5OTU0MjIzNjMyOCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDE2Ljk3OTk5OTU0MjIzNjMyOCAyMCI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzY2OWRmNjt9JiN4YTsJLnN0MXtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDJ7ZmlsbDojYWVjYmZhO30mI3hhOwk8L3N0eWxlPiYjeGE7CTxnIGNsYXNzPSJzdDAiPiYjeGE7CQk8cGF0aCBkPSJNOC40OSAxMC4yOUwuMjQgNS4zNSA4LjQ5LjU4bDguMjQgNC42N3pNMS43NiA1LjM2bDYuNzIgNCA2LjcyLTQuMTEtNi43MS0zLjc4eiIvPiYjeGE7CQk8cGF0aCBkPSJNOC40OSAxOS40NEwuMjEgMTMuODkgOC40OSA5LjNsOC4xNSA0LjY0em0tNi44LTUuNWw2LjggNC41NiA2LjctNC41LTYuNy0zLjgyeiIvPiYjeGE7CTwvZz4mI3hhOwk8ZyBjbGFzcz0ic3QxIj4mI3hhOwkJPHBhdGggZD0iTS42MTMgNS41MDJsLjY3NS0uMzcxIDcuNDc3IDEzLjYtLjY3NS4zNzF6Ii8+JiN4YTsJCTxwYXRoIGQ9Ik04LjE5NCAxOC44MjZsNy4zMDEtMTMuNTU5LjY3OC4zNjUtNy4zMDEgMTMuNTU5ek0uNzE2IDEzLjY4N0w4LjA5Ni45MDRsLjY2Ny4zODUtNy4zOCAxMi43ODN6Ii8+JiN4YTsJCTxwYXRoIGQ9Ik04LjE5NCAxLjIxNGwuNjY5LS4zODEgNy40MDUgMTIuOTg3LS42NjkuMzgxeiIvPiYjeGE7CQk8cGF0aCBkPSJNOC4xMy45NmguNzdWMTguOWgtLjc3ek0uNTUgNS40M2guNzd2OC42NkguNTV6bTE0Ljk3LS4wOWguNzdWMTRoLS43N3oiLz4mI3hhOwk8L2c+JiN4YTsJPGcgY2xhc3M9InN0MiI+JiN4YTsJCTxjaXJjbGUgY3g9IjguNTIiIGN5PSIxLjA3IiByPSIxLjA3Ii8+JiN4YTsJCTxjaXJjbGUgY3g9IjE1LjkxIiBjeT0iNS4zNCIgcj0iMS4wNyIvPiYjeGE7CQk8Y2lyY2xlIGN4PSIxLjA3IiBjeT0iNS4zNCIgcj0iMS4wNyIvPiYjeGE7CQk8Y2lyY2xlIGN4PSI4LjUyIiBjeT0iOS45MyIgcj0iMS42OCIvPiYjeGE7CQk8Y2lyY2xlIGN4PSIxNS45MSIgY3k9IjEzLjk0IiByPSIxLjA3Ii8+JiN4YTsJCTxjaXJjbGUgY3g9IjEuMDciIGN5PSIxMy45NCIgcj0iMS4wNyIvPiYjeGE7CQk8Y2lyY2xlIGN4PSI4LjUyIiBjeT0iMTguOTMiIHI9IjEuMDciLz4mI3hhOwkJPHBhdGggZD0iTTguNDkgMTAuMjlMLjI0IDUuMzUgOC40OS41OGw4LjI0IDQuNjd6TTEuNzYgNS4zNmw2LjcyIDQgNi43Mi00LjExLTYuNzEtMy43OHoiLz4mI3hhOwkJPHBhdGggZD0iTTguNDkgMTkuNDRMLjIxIDEzLjg5IDguNDkgOS4zbDguMTUgNC42NHptLTYuOC01LjVsNi44IDQuNTYgNi43LTQuNS02LjctMy44MnoiLz4mI3hhOwkJPHBhdGggZD0iTS42MTMgNS41MDJsLjY3NS0uMzcxIDcuNDc3IDEzLjYtLjY3NS4zNzF6Ii8+JiN4YTsJCTxwYXRoIGQ9Ik04LjE5NCAxOC44MjZsNy4zMDEtMTMuNTU5LjY3OC4zNjUtNy4zMDEgMTMuNTU5ek0uNzE2IDEzLjY4N0w4LjA5Ni45MDRsLjY2Ny4zODUtNy4zOCAxMi43ODN6Ii8+JiN4YTsJCTxwYXRoIGQ9Ik04LjE5NCAxLjIxNGwuNjY5LS4zODEgNy40MDUgMTIuOTg3LS42NjkuMzgxeiIvPiYjeGE7CQk8cGF0aCBkPSJNOC4xMy45NmguNzdWMTguOWgtLjc3ek0uNTUgNS40M2guNzd2OC42NkguNTV6bTE0Ljk3LS4wOWguNzdWMTRoLS43N3oiLz4mI3hhOwk8L2c+JiN4YTsJPGcgY2xhc3M9InN0MCI+JiN4YTsJCTxjaXJjbGUgY3g9IjguNTIiIGN5PSIxLjA3IiByPSIxLjA3Ii8+JiN4YTsJCTxjaXJjbGUgY3g9IjE1LjkxIiBjeT0iNS4zNCIgcj0iMS4wNyIvPiYjeGE7CQk8Y2lyY2xlIGN4PSIxLjA3IiBjeT0iNS4zNCIgcj0iMS4wNyIvPiYjeGE7CQk8Y2lyY2xlIGN4PSI4LjUyIiBjeT0iOS45MyIgcj0iMS42OCIvPiYjeGE7CQk8Y2lyY2xlIGN4PSIxNS45MSIgY3k9IjEzLjk0IiByPSIxLjA3Ii8+JiN4YTsJCTxjaXJjbGUgY3g9IjEuMDciIGN5PSIxMy45NCIgcj0iMS4wNyIvPiYjeGE7CQk8Y2lyY2xlIGN4PSI4LjUyIiBjeT0iMTguOTMiIHI9IjEuMDciLz4mI3hhOwk8L2c+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 19);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Advanced Solutions Lab');
			})
		);

		this.addPalette('gcp2Cloud AI', 'GCP / Cloud AI', false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addGCP2InternetOfThingsPalette = function()
	{
		var dt = 'gcp google cloud platform iot internet of things ';
		var fns = [];
		
		fns.push(
			this.addEntry(dt + 'iot core internet of things', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 120, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('IoT Core', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE5LjcwNjUzMTUyNDY1ODIwMyIgaGVpZ2h0PSIxOS45ODM4MjE4Njg4OTY0ODQiIGZpbGwtcnVsZT0iZXZlbm9kZCIgdmlld0JveD0iLTAuMDAwMjA5NTQ2OTY4MTA4MDQzMDcgMC4wMDAxNzcyNDA4Mjg2MzQyMzk3MyAxOS43MDY1MzE1MjQ2NTgyMDMgMTkuOTgzODIxODY4ODk2NDg0Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qxe2ZpbGw6IzY2OWRmNjt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTAuMzQ1IDEwLjM5NnYtNC40M2gwYTEuMTQgMS4xNCAwIDAgMC0uNS0yLjE2NCAxLjE0IDEuMTQgMCAwIDAtLjUgMi4xNjR2NC40MmgtNC4yN3YtMi44MmExLjE0IDEuMTQgMCAwIDAtLjUzLTIuMTUgMS4xNCAxLjE0IDAgMCAwLS41MiAyLjE1djIuODNoLS4yMmEzLjgyIDMuODIgMCAwIDEtMi43MjItNi40ODUgMy44MiAzLjgyIDAgMCAxIDQuMTIyLS44OTUgNS4yMiA1LjIyIDAgMCAxIDkuNDQtLjA1IDQgNCAwIDAgMSAxLjIzLS4yaDBhMy44MyAzLjgzIDAgMSAxIDAgNy42NmgtLjI1di0yLjg2YTEuMTQgMS4xNCAwIDAgMC0uNTMtMi4xNDkgMS4xNCAxLjE0IDAgMCAwLS41MyAyLjE0OXYyLjgzeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik01LjA3NSAxMy4zNTZhMiAyIDAgMCAxIDEuNTQgMiAyLjA3IDIuMDcgMCAwIDEtNC4xMS4zNTQgMi4wNyAyLjA3IDAgMCAxIDEuNTItMi4zNTR2LTIuOTZoMXptLS41MyAzYTEgMSAwIDEgMCAwLTIgMSAxIDAgMSAwIDAgMnptMTEuMDgtM2EyLjA3IDIuMDcgMCAwIDEtLjUzIDQuMDcxIDIuMDcgMi4wNyAwIDAgMS0uNTMtNC4wNzF2LTIuOTVoMS4wNnptLS41MyAzYTEgMSAwIDAgMCAuMzktMS45NCAxIDEgMCAwIDAtMS4yNjggMS4zMDcgMSAxIDAgMCAwIC44NzguNjMzem0tNC43NS0uNDNoMGEyLjA2IDIuMDYgMCAwIDEtLjUgNC4wNTggMi4wNiAyLjA2IDAgMCAxLS41LTQuMDU4di01LjVoMS4wNnptLS41NCAzYTEgMSAwIDAgMCAuNTUtMS44MzIgMSAxIDAgMCAwLTEuNDggMS4yMTIgMSAxIDAgMCAwIC45My42eiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'IoT Core');
			})
		);

		fns.push(
			this.addEntry(dt + 'iot core internet of things', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 120, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>IoT Core', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE5LjcwNjUzMTUyNDY1ODIwMyIgaGVpZ2h0PSIxOS45ODM4MjE4Njg4OTY0ODQiIGZpbGwtcnVsZT0iZXZlbm9kZCIgdmlld0JveD0iLTAuMDAwMjA5NTQ2OTY4MTA4MDQzMDcgMC4wMDAxNzcyNDA4Mjg2MzQyMzk3MyAxOS43MDY1MzE1MjQ2NTgyMDMgMTkuOTgzODIxODY4ODk2NDg0Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qxe2ZpbGw6IzY2OWRmNjt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTAuMzQ1IDEwLjM5NnYtNC40M2gwYTEuMTQgMS4xNCAwIDAgMC0uNS0yLjE2NCAxLjE0IDEuMTQgMCAwIDAtLjUgMi4xNjR2NC40MmgtNC4yN3YtMi44MmExLjE0IDEuMTQgMCAwIDAtLjUzLTIuMTUgMS4xNCAxLjE0IDAgMCAwLS41MiAyLjE1djIuODNoLS4yMmEzLjgyIDMuODIgMCAwIDEtMi43MjItNi40ODUgMy44MiAzLjgyIDAgMCAxIDQuMTIyLS44OTUgNS4yMiA1LjIyIDAgMCAxIDkuNDQtLjA1IDQgNCAwIDAgMSAxLjIzLS4yaDBhMy44MyAzLjgzIDAgMSAxIDAgNy42NmgtLjI1di0yLjg2YTEuMTQgMS4xNCAwIDAgMC0uNTMtMi4xNDkgMS4xNCAxLjE0IDAgMCAwLS41MyAyLjE0OXYyLjgzeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik01LjA3NSAxMy4zNTZhMiAyIDAgMCAxIDEuNTQgMiAyLjA3IDIuMDcgMCAwIDEtNC4xMS4zNTQgMi4wNyAyLjA3IDAgMCAxIDEuNTItMi4zNTR2LTIuOTZoMXptLS41MyAzYTEgMSAwIDEgMCAwLTIgMSAxIDAgMSAwIDAgMnptMTEuMDgtM2EyLjA3IDIuMDcgMCAwIDEtLjUzIDQuMDcxIDIuMDcgMi4wNyAwIDAgMS0uNTMtNC4wNzF2LTIuOTVoMS4wNnptLS41MyAzYTEgMSAwIDAgMCAuMzktMS45NCAxIDEgMCAwIDAtMS4yNjggMS4zMDcgMSAxIDAgMCAwIC44NzguNjMzem0tNC43NS0uNDNoMGEyLjA2IDIuMDYgMCAwIDEtLjUgNC4wNTggMi4wNiAyLjA2IDAgMCAxLS41LTQuMDU4di01LjVoMS4wNnptLS41NCAzYTEgMSAwIDAgMCAuNTUtMS44MzIgMSAxIDAgMCAwLTEuNDggMS4yMTIgMSAxIDAgMCAwIC45My42eiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'IoT Core');
			})
		);

		fns.push(
			this.addEntry(dt + 'iot core internet of things', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 128, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>IoT Core', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE5LjcwNjUzMTUyNDY1ODIwMyIgaGVpZ2h0PSIxOS45ODM4MjE4Njg4OTY0ODQiIGZpbGwtcnVsZT0iZXZlbm9kZCIgdmlld0JveD0iLTAuMDAwMjA5NTQ2OTY4MTA4MDQzMDcgMC4wMDAxNzcyNDA4Mjg2MzQyMzk3MyAxOS43MDY1MzE1MjQ2NTgyMDMgMTkuOTgzODIxODY4ODk2NDg0Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qxe2ZpbGw6IzY2OWRmNjt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTAuMzQ1IDEwLjM5NnYtNC40M2gwYTEuMTQgMS4xNCAwIDAgMC0uNS0yLjE2NCAxLjE0IDEuMTQgMCAwIDAtLjUgMi4xNjR2NC40MmgtNC4yN3YtMi44MmExLjE0IDEuMTQgMCAwIDAtLjUzLTIuMTUgMS4xNCAxLjE0IDAgMCAwLS41MiAyLjE1djIuODNoLS4yMmEzLjgyIDMuODIgMCAwIDEtMi43MjItNi40ODUgMy44MiAzLjgyIDAgMCAxIDQuMTIyLS44OTUgNS4yMiA1LjIyIDAgMCAxIDkuNDQtLjA1IDQgNCAwIDAgMSAxLjIzLS4yaDBhMy44MyAzLjgzIDAgMSAxIDAgNy42NmgtLjI1di0yLjg2YTEuMTQgMS4xNCAwIDAgMC0uNTMtMi4xNDkgMS4xNCAxLjE0IDAgMCAwLS41MyAyLjE0OXYyLjgzeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik01LjA3NSAxMy4zNTZhMiAyIDAgMCAxIDEuNTQgMiAyLjA3IDIuMDcgMCAwIDEtNC4xMS4zNTQgMi4wNyAyLjA3IDAgMCAxIDEuNTItMi4zNTR2LTIuOTZoMXptLS41MyAzYTEgMSAwIDEgMCAwLTIgMSAxIDAgMSAwIDAgMnptMTEuMDgtM2EyLjA3IDIuMDcgMCAwIDEtLjUzIDQuMDcxIDIuMDcgMi4wNyAwIDAgMS0uNTMtNC4wNzF2LTIuOTVoMS4wNnptLS41MyAzYTEgMSAwIDAgMCAuMzktMS45NCAxIDEgMCAwIDAtMS4yNjggMS4zMDcgMSAxIDAgMCAwIC44NzguNjMzem0tNC43NS0uNDNoMGEyLjA2IDIuMDYgMCAwIDEtLjUgNC4wNTggMi4wNiAyLjA2IDAgMCAxLS41LTQuMDU4di01LjVoMS4wNnptLS41NCAzYTEgMSAwIDAgMCAuNTUtMS44MzIgMSAxIDAgMCAwLTEuNDggMS4yMTIgMSAxIDAgMCAwIC45My42eiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'IoT Core');
			})
		);

		this.addPalette('gcp2Internet of Things', 'GCP / Internet of Things', false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addGCP2DatabasesPalette = function()
	{
		var dt = 'gcp google cloud platform databases ';
		var fns = [];
		
		fns.push(
			this.addEntry(dt + 'cloud sql', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 100, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Cloud\nSQL', 
			    		new mxGeometry(0, 0, 22, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE0LjY1OTk5OTg0NzQxMjExIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMTQuNjU5OTk5ODQ3NDEyMTEgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8c3R5bGU+JiN4YTsJCS5Ee2ZpbGwtcnVsZTpldmVub2RkfSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggZD0iTTcuMzMgMTUuMzV2LTMuMDFMMCA4LjQ0djMuMDF6bTAgNC42NXYtMy4wMUwwIDEzLjA5djMuMDF6IiBjbGFzcz0ic3QyIEQiLz4mI3hhOwk8cGF0aCBkPSJNMTQuNjYgOC40NGwtNy4zMyAzLjl2My4wMWw3LjMzLTMuOXptMCA0LjY1bC03LjMzIDMuOVYyMGw3LjMzLTMuOXoiIGNsYXNzPSJzdDEgRCIvPiYjeGE7CTxwYXRoIGQ9Ik03LjMzIDB2My4wMWw3LjMzIDMuOVYzLjl6IiBjbGFzcz0ic3QwIEQiLz4mI3hhOwk8cGF0aCBkPSJNMCA2LjkxbDcuMzMtMy45VjBMMCAzLjl6IiBjbGFzcz0iRCBzdDEiLz4mI3hhOwk8cGF0aCBkPSJNNy4zMyAxMC43OVY3Ljc3TDAgMy44N3YzLjAyeiIgY2xhc3M9IkQgc3QyIi8+JiN4YTsJPHBhdGggZD0iTTE0LjY2IDMuODdsLTcuMzMgMy45djMuMDJsNy4zMy0zLjl6IiBjbGFzcz0iRCBzdDEiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(19, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud SQL');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud sql', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 130, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud SQL', 
			    		new mxGeometry(0, 0, 22, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE0LjY1OTk5OTg0NzQxMjExIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMTQuNjU5OTk5ODQ3NDEyMTEgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8c3R5bGU+JiN4YTsJCS5Ee2ZpbGwtcnVsZTpldmVub2RkfSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggZD0iTTcuMzMgMTUuMzV2LTMuMDFMMCA4LjQ0djMuMDF6bTAgNC42NXYtMy4wMUwwIDEzLjA5djMuMDF6IiBjbGFzcz0ic3QyIEQiLz4mI3hhOwk8cGF0aCBkPSJNMTQuNjYgOC40NGwtNy4zMyAzLjl2My4wMWw3LjMzLTMuOXptMCA0LjY1bC03LjMzIDMuOVYyMGw3LjMzLTMuOXoiIGNsYXNzPSJzdDEgRCIvPiYjeGE7CTxwYXRoIGQ9Ik03LjMzIDB2My4wMWw3LjMzIDMuOVYzLjl6IiBjbGFzcz0ic3QwIEQiLz4mI3hhOwk8cGF0aCBkPSJNMCA2LjkxbDcuMzMtMy45VjBMMCAzLjl6IiBjbGFzcz0iRCBzdDEiLz4mI3hhOwk8cGF0aCBkPSJNNy4zMyAxMC43OVY3Ljc3TDAgMy44N3YzLjAyeiIgY2xhc3M9IkQgc3QyIi8+JiN4YTsJPHBhdGggZD0iTTE0LjY2IDMuODdsLTcuMzMgMy45djMuMDJsNy4zMy0zLjl6IiBjbGFzcz0iRCBzdDEiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(19, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud SQL');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud sql', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 138, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud SQL', 
			    		new mxGeometry(0, 0, 22, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE0LjY1OTk5OTg0NzQxMjExIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMTQuNjU5OTk5ODQ3NDEyMTEgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8c3R5bGU+JiN4YTsJCS5Ee2ZpbGwtcnVsZTpldmVub2RkfSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggZD0iTTcuMzMgMTUuMzV2LTMuMDFMMCA4LjQ0djMuMDF6bTAgNC42NXYtMy4wMUwwIDEzLjA5djMuMDF6IiBjbGFzcz0ic3QyIEQiLz4mI3hhOwk8cGF0aCBkPSJNMTQuNjYgOC40NGwtNy4zMyAzLjl2My4wMWw3LjMzLTMuOXptMCA0LjY1bC03LjMzIDMuOVYyMGw3LjMzLTMuOXoiIGNsYXNzPSJzdDEgRCIvPiYjeGE7CTxwYXRoIGQ9Ik03LjMzIDB2My4wMWw3LjMzIDMuOVYzLjl6IiBjbGFzcz0ic3QwIEQiLz4mI3hhOwk8cGF0aCBkPSJNMCA2LjkxbDcuMzMtMy45VjBMMCAzLjl6IiBjbGFzcz0iRCBzdDEiLz4mI3hhOwk8cGF0aCBkPSJNNy4zMyAxMC43OVY3Ljc3TDAgMy44N3YzLjAyeiIgY2xhc3M9IkQgc3QyIi8+JiN4YTsJPHBhdGggZD0iTTE0LjY2IDMuODdsLTcuMzMgMy45djMuMDJsNy4zMy0zLjl6IiBjbGFzcz0iRCBzdDEiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(19, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud SQL');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud bigtable', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 120, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Cloud\nBigtable', 
			    		new mxGeometry(0, 0, 27, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE3Ljk1Njk3Nzg0NDIzODI4IiBoZWlnaHQ9IjIwLjAwOTI1NjM2MjkxNTA0IiB2aWV3Qm94PSItMC4wMDA0MjE5NjUxMTY0MDIxMzQzIDAuMDAwMDc0Njk5NTIxMDY0NzU4MyAxNy45NTY5Nzc4NDQyMzgyOCAyMC4wMDkyNTYzNjI5MTUwNCI+JiN4YTsJPHN0eWxlPiYjeGE7CQkuc3Qwe2ZpbGw6IzY2OWRmNjt9JiN4YTsJCS5zdDF7ZmlsbDojYWVjYmZhO30mI3hhOwkJLnN0MntmaWxsOiM0Mjg1ZjQ7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPGcgZmlsbC1ydWxlPSJldmVub2RkIj4mI3hhOwkJPHBhdGggZD0iTTEzLjE5NiA0LjQ0N2wtNC4yMi0yLjUxYTIuODYgMi44NiAwIDAgMS0xLjI1LTEuNzFjMCAwIC4xNi0uMzIuMzgtLjJsNS4yNSAzLjFjLjYzLjM3LjI0IDIgLjI0IDJhLjc3Ljc3IDAgMCAwLS40LS42OHoiIGNsYXNzPSJzdDAiLz4mI3hhOwkJPHBhdGggZD0iTTE0LjQ2NiAxMC42ODdhLjM1LjM1IDAgMCAxLS4xNi4zM2wtMSAuNjh2LTcuOTVjMC0uMjcuMTctLjU2LS4wNi0uN2wuOTIuNjhhLjczLjczIDAgMCAxIC4zNS42NXoiIGNsYXNzPSJzdDEiLz4mI3hhOwkJPHBhdGggZD0iTTguOTc2IDExLjU5N2EuMzYuMzYgMCAwIDEtLjItLjA2bC0zLjQ2LTIuMDZ2LjlsMy42NiAyLjE4LjI5LS41N3MtLjIyLS4zOS0uMjktLjM5em0uMiAxLjhhLjM2LjM2IDAgMCAxLS40IDBsLTMuNDYtMi4wNnYuNjZhLjQyLjQyIDAgMCAwIC4xOS4zNWwzLjI4IDJhLjM3LjM3IDAgMCAwIC4zOCAwIDIgMiAwIDAgMCAuMi0uNTJsLS4xOS0uMzl6IiBjbGFzcz0ic3QwIi8+JiN4YTsJCTxwYXRoIGQ9Ik04Ljk3NiAxMC43MjdsMy42Ni0yLjE4di0uNDNhLjM5LjM5IDAgMCAwLS4xOS0uMzRsLTMuMjgtMmEuMzcuMzcgMCAwIDAtLjM4IDBsLTMuMjggMmEuNDEuNDEgMCAwIDAtLjE5LjM0di40M3oiIGNsYXNzPSJzdDEiLz4mI3hhOwkJPHBhdGggZD0iTTguOTc2IDkuODI3bC0zLjQ3LTIuMDVhLjQxLjQxIDAgMCAwLS4xOS4zNHYuNDNsMy42NiAyLjE4LjI4LS41NnoiIGNsYXNzPSJzdDAiLz4mI3hhOwkJPGcgY2xhc3M9InN0MiI+JiN4YTsJCQk8cGF0aCBkPSJNOC45NzYgMTEuNTk3djFsMy42Ni0yLjE4di0uOWwtMy40NiAyLjAyYS42NS42NSAwIDAgMS0uMi4wNnptLjIgMS44YS4zNi4zNiAwIDAgMS0uMi4wNnYuOWEuNS41IDAgMCAwIC4yMS0uMDVsMy4yOC0yYS4zOS4zOSAwIDAgMCAuMTktLjM1di0uNjZ6Ii8+JiN4YTsJCQk8cGF0aCBkPSJNMTIuNDQ2IDcuNzc3bC0zLjQ3IDIuMDV2LjlsMy42Ni0yLjE4di0uNDNhLjM5LjM5IDAgMCAwLS4xOS0uMzR6Ii8+JiN4YTsJCTwvZz4mI3hhOwkJPHBhdGggZD0iTTQuNzU2IDE1LjUyN2w0LjE1IDIuNDdhMi43MiAyLjcyIDAgMCAxIDEuMjggMS44LjE4LjE4IDAgMCAxLS4yOC4xOGwtNS40NS0zLjIzYy0uNTMtLjMyLS4wNy0xLjg4LS4wNy0xLjg4YS43Ny43NyAwIDAgMCAuMzcuNjZ6IiBjbGFzcz0ic3QwIi8+JiN4YTsJCTxwYXRoIGQ9Ik0zLjQ4NiAxNS43Mjd2LTYuNTZhLjQxLjQxIDAgMCAxIC4xOS0uMzNsMS0uNTl2Ny45MWMwIC4yNyAwIC42OS4yMS44M2wtMS4wNi0uNjZhLjc1Ljc1IDAgMCAxLS4zNC0uNnoiIGNsYXNzPSJzdDEiLz4mI3hhOwkJPHBhdGggZD0iTTcuMTM2IDMuNDU3YS43NS43NSAwIDAgMC0uNzQgMGwtNC4yIDIuNTRhMi42MyAyLjYzIDAgMCAxLTIuMDguMjYuMjMuMjMgMCAwIDEgMC0uNGMuMTgtLjA5IDYuMzItMy43NCA2LjMyLTMuNzQuMjMtLjE0Ljc0IDEuMzkuNzQgMS4zOXoiIGNsYXNzPSJzdDAiLz4mI3hhOwkJPHBhdGggZD0iTTcuMTI2IDIuMDc3bDUuMzIgMy4xNWEuMzcuMzcgMCAwIDEgLjIuMzF2MS4xOGwtNi42Ny0zLjk2YS43NS43NSAwIDAgMC0uNzQgMGwxLjE4LS42OWEuNzEuNzEgMCAwIDEgLjczIDB6IiBjbGFzcz0ic3QxIi8+JiN4YTsJCTxwYXRoIGQ9Ik0xMC43OTYgMTYuNDg3YS43My43MyAwIDAgMCAuNzQgMGw0LjItMi40OWEyLjYzIDIuNjMgMCAwIDEgMi4xLS4yNS4yMS4yMSAwIDAgMSAwIC4zOGwtNi4zMyAzLjc1Yy0uMjIuMTQtLjc0LTEuNC0uNzQtMS40eiIgY2xhc3M9InN0MCIvPiYjeGE7CQk8cGF0aCBkPSJNNS40ODYgMTQuNzQ3YS41Ni41NiAwIDAgMS0uMTctLjMzdi0xLjE2bDYuNjYgMy45M2EuNjkuNjkgMCAwIDAgLjczIDBsLTEuMTguN2EuNy43IDAgMCAxLS43NCAweiIgY2xhc3M9InN0MSIvPiYjeGE7CQk8cGF0aCBkPSJNMy4yMzYgNy44MDdhLjc2Ljc2IDAgMCAwLS4zNy42NXY1YTIuNzUgMi43NSAwIDAgMS0uODcgMiAuMTguMTggMCAwIDEtLjMtLjEzdi03LjU2YzAtLjI4IDEuNTQgMCAxLjU0IDB6IiBjbGFzcz0ic3QwIi8+JiN4YTsJCTxwYXRoIGQ9Ik02Ljc0NiA0LjUxN2EuMzQuMzQgMCAwIDEgLjM2IDBsMSAuNTktNi4wOCAzLjU2YS43Ny43NyAwIDAgMC0uMzcuNjZ2LTEuMzlhLjcyLjcyIDAgMCAxIC4zOC0uNjR6IiBjbGFzcz0ic3QxIi8+JiN4YTsJCTxwYXRoIGQ9Ik0xNS4xNDYgMTEuNDM3di01YTIuODEgMi44MSAwIDAgMSAuODQtMmMwIDAgLjMzLS4xMS4zMS4yMXMwIDcuMzcgMCA3LjM3Yy0uMzEuMzctMS42MSAwLTEuNjEgMGEuODEuODEgMCAwIDAgLjQ2LS41OHoiIGNsYXNzPSJzdDAiLz4mI3hhOwkJPHBhdGggZD0iTTE1Ljk3NiAxMi42MDdsLTQuNzQgMi44NWEuMzUuMzUgMCAwIDEtLjM3IDBsLTEtLjU3IDYuMTEtMy42N2EuNzcuNzcgMCAwIDAgLjM3LS42NnYxLjQ0Yy0uMDIuMjMtLjM3LjYxLS4zNy42MXoiIGNsYXNzPSJzdDEiLz4mI3hhOwk8L2c+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(16, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Bigtable');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud bigtable', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 150, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Bigtable', 
			    		new mxGeometry(0, 0, 27, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE3Ljk1Njk3Nzg0NDIzODI4IiBoZWlnaHQ9IjIwLjAwOTI1NjM2MjkxNTA0IiB2aWV3Qm94PSItMC4wMDA0MjE5NjUxMTY0MDIxMzQzIDAuMDAwMDc0Njk5NTIxMDY0NzU4MyAxNy45NTY5Nzc4NDQyMzgyOCAyMC4wMDkyNTYzNjI5MTUwNCI+JiN4YTsJPHN0eWxlPiYjeGE7CQkuc3Qwe2ZpbGw6IzY2OWRmNjt9JiN4YTsJCS5zdDF7ZmlsbDojYWVjYmZhO30mI3hhOwkJLnN0MntmaWxsOiM0Mjg1ZjQ7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPGcgZmlsbC1ydWxlPSJldmVub2RkIj4mI3hhOwkJPHBhdGggZD0iTTEzLjE5NiA0LjQ0N2wtNC4yMi0yLjUxYTIuODYgMi44NiAwIDAgMS0xLjI1LTEuNzFjMCAwIC4xNi0uMzIuMzgtLjJsNS4yNSAzLjFjLjYzLjM3LjI0IDIgLjI0IDJhLjc3Ljc3IDAgMCAwLS40LS42OHoiIGNsYXNzPSJzdDAiLz4mI3hhOwkJPHBhdGggZD0iTTE0LjQ2NiAxMC42ODdhLjM1LjM1IDAgMCAxLS4xNi4zM2wtMSAuNjh2LTcuOTVjMC0uMjcuMTctLjU2LS4wNi0uN2wuOTIuNjhhLjczLjczIDAgMCAxIC4zNS42NXoiIGNsYXNzPSJzdDEiLz4mI3hhOwkJPHBhdGggZD0iTTguOTc2IDExLjU5N2EuMzYuMzYgMCAwIDEtLjItLjA2bC0zLjQ2LTIuMDZ2LjlsMy42NiAyLjE4LjI5LS41N3MtLjIyLS4zOS0uMjktLjM5em0uMiAxLjhhLjM2LjM2IDAgMCAxLS40IDBsLTMuNDYtMi4wNnYuNjZhLjQyLjQyIDAgMCAwIC4xOS4zNWwzLjI4IDJhLjM3LjM3IDAgMCAwIC4zOCAwIDIgMiAwIDAgMCAuMi0uNTJsLS4xOS0uMzl6IiBjbGFzcz0ic3QwIi8+JiN4YTsJCTxwYXRoIGQ9Ik04Ljk3NiAxMC43MjdsMy42Ni0yLjE4di0uNDNhLjM5LjM5IDAgMCAwLS4xOS0uMzRsLTMuMjgtMmEuMzcuMzcgMCAwIDAtLjM4IDBsLTMuMjggMmEuNDEuNDEgMCAwIDAtLjE5LjM0di40M3oiIGNsYXNzPSJzdDEiLz4mI3hhOwkJPHBhdGggZD0iTTguOTc2IDkuODI3bC0zLjQ3LTIuMDVhLjQxLjQxIDAgMCAwLS4xOS4zNHYuNDNsMy42NiAyLjE4LjI4LS41NnoiIGNsYXNzPSJzdDAiLz4mI3hhOwkJPGcgY2xhc3M9InN0MiI+JiN4YTsJCQk8cGF0aCBkPSJNOC45NzYgMTEuNTk3djFsMy42Ni0yLjE4di0uOWwtMy40NiAyLjAyYS42NS42NSAwIDAgMS0uMi4wNnptLjIgMS44YS4zNi4zNiAwIDAgMS0uMi4wNnYuOWEuNS41IDAgMCAwIC4yMS0uMDVsMy4yOC0yYS4zOS4zOSAwIDAgMCAuMTktLjM1di0uNjZ6Ii8+JiN4YTsJCQk8cGF0aCBkPSJNMTIuNDQ2IDcuNzc3bC0zLjQ3IDIuMDV2LjlsMy42Ni0yLjE4di0uNDNhLjM5LjM5IDAgMCAwLS4xOS0uMzR6Ii8+JiN4YTsJCTwvZz4mI3hhOwkJPHBhdGggZD0iTTQuNzU2IDE1LjUyN2w0LjE1IDIuNDdhMi43MiAyLjcyIDAgMCAxIDEuMjggMS44LjE4LjE4IDAgMCAxLS4yOC4xOGwtNS40NS0zLjIzYy0uNTMtLjMyLS4wNy0xLjg4LS4wNy0xLjg4YS43Ny43NyAwIDAgMCAuMzcuNjZ6IiBjbGFzcz0ic3QwIi8+JiN4YTsJCTxwYXRoIGQ9Ik0zLjQ4NiAxNS43Mjd2LTYuNTZhLjQxLjQxIDAgMCAxIC4xOS0uMzNsMS0uNTl2Ny45MWMwIC4yNyAwIC42OS4yMS44M2wtMS4wNi0uNjZhLjc1Ljc1IDAgMCAxLS4zNC0uNnoiIGNsYXNzPSJzdDEiLz4mI3hhOwkJPHBhdGggZD0iTTcuMTM2IDMuNDU3YS43NS43NSAwIDAgMC0uNzQgMGwtNC4yIDIuNTRhMi42MyAyLjYzIDAgMCAxLTIuMDguMjYuMjMuMjMgMCAwIDEgMC0uNGMuMTgtLjA5IDYuMzItMy43NCA2LjMyLTMuNzQuMjMtLjE0Ljc0IDEuMzkuNzQgMS4zOXoiIGNsYXNzPSJzdDAiLz4mI3hhOwkJPHBhdGggZD0iTTcuMTI2IDIuMDc3bDUuMzIgMy4xNWEuMzcuMzcgMCAwIDEgLjIuMzF2MS4xOGwtNi42Ny0zLjk2YS43NS43NSAwIDAgMC0uNzQgMGwxLjE4LS42OWEuNzEuNzEgMCAwIDEgLjczIDB6IiBjbGFzcz0ic3QxIi8+JiN4YTsJCTxwYXRoIGQ9Ik0xMC43OTYgMTYuNDg3YS43My43MyAwIDAgMCAuNzQgMGw0LjItMi40OWEyLjYzIDIuNjMgMCAwIDEgMi4xLS4yNS4yMS4yMSAwIDAgMSAwIC4zOGwtNi4zMyAzLjc1Yy0uMjIuMTQtLjc0LTEuNC0uNzQtMS40eiIgY2xhc3M9InN0MCIvPiYjeGE7CQk8cGF0aCBkPSJNNS40ODYgMTQuNzQ3YS41Ni41NiAwIDAgMS0uMTctLjMzdi0xLjE2bDYuNjYgMy45M2EuNjkuNjkgMCAwIDAgLjczIDBsLTEuMTguN2EuNy43IDAgMCAxLS43NCAweiIgY2xhc3M9InN0MSIvPiYjeGE7CQk8cGF0aCBkPSJNMy4yMzYgNy44MDdhLjc2Ljc2IDAgMCAwLS4zNy42NXY1YTIuNzUgMi43NSAwIDAgMS0uODcgMiAuMTguMTggMCAwIDEtLjMtLjEzdi03LjU2YzAtLjI4IDEuNTQgMCAxLjU0IDB6IiBjbGFzcz0ic3QwIi8+JiN4YTsJCTxwYXRoIGQ9Ik02Ljc0NiA0LjUxN2EuMzQuMzQgMCAwIDEgLjM2IDBsMSAuNTktNi4wOCAzLjU2YS43Ny43NyAwIDAgMC0uMzcuNjZ2LTEuMzlhLjcyLjcyIDAgMCAxIC4zOC0uNjR6IiBjbGFzcz0ic3QxIi8+JiN4YTsJCTxwYXRoIGQ9Ik0xNS4xNDYgMTEuNDM3di01YTIuODEgMi44MSAwIDAgMSAuODQtMmMwIDAgLjMzLS4xMS4zMS4yMXMwIDcuMzcgMCA3LjM3Yy0uMzEuMzctMS42MSAwLTEuNjEgMGEuODEuODEgMCAwIDAgLjQ2LS41OHoiIGNsYXNzPSJzdDAiLz4mI3hhOwkJPHBhdGggZD0iTTE1Ljk3NiAxMi42MDdsLTQuNzQgMi44NWEuMzUuMzUgMCAwIDEtLjM3IDBsLTEtLjU3IDYuMTEtMy42N2EuNzcuNzcgMCAwIDAgLjM3LS42NnYxLjQ0Yy0uMDIuMjMtLjM3LjYxLS4zNy42MXoiIGNsYXNzPSJzdDEiLz4mI3hhOwk8L2c+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(16, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Bigtable');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud bigtable', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 158, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Bigtable', 
			    		new mxGeometry(0, 0, 27, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE3Ljk1Njk3Nzg0NDIzODI4IiBoZWlnaHQ9IjIwLjAwOTI1NjM2MjkxNTA0IiB2aWV3Qm94PSItMC4wMDA0MjE5NjUxMTY0MDIxMzQzIDAuMDAwMDc0Njk5NTIxMDY0NzU4MyAxNy45NTY5Nzc4NDQyMzgyOCAyMC4wMDkyNTYzNjI5MTUwNCI+JiN4YTsJPHN0eWxlPiYjeGE7CQkuc3Qwe2ZpbGw6IzY2OWRmNjt9JiN4YTsJCS5zdDF7ZmlsbDojYWVjYmZhO30mI3hhOwkJLnN0MntmaWxsOiM0Mjg1ZjQ7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPGcgZmlsbC1ydWxlPSJldmVub2RkIj4mI3hhOwkJPHBhdGggZD0iTTEzLjE5NiA0LjQ0N2wtNC4yMi0yLjUxYTIuODYgMi44NiAwIDAgMS0xLjI1LTEuNzFjMCAwIC4xNi0uMzIuMzgtLjJsNS4yNSAzLjFjLjYzLjM3LjI0IDIgLjI0IDJhLjc3Ljc3IDAgMCAwLS40LS42OHoiIGNsYXNzPSJzdDAiLz4mI3hhOwkJPHBhdGggZD0iTTE0LjQ2NiAxMC42ODdhLjM1LjM1IDAgMCAxLS4xNi4zM2wtMSAuNjh2LTcuOTVjMC0uMjcuMTctLjU2LS4wNi0uN2wuOTIuNjhhLjczLjczIDAgMCAxIC4zNS42NXoiIGNsYXNzPSJzdDEiLz4mI3hhOwkJPHBhdGggZD0iTTguOTc2IDExLjU5N2EuMzYuMzYgMCAwIDEtLjItLjA2bC0zLjQ2LTIuMDZ2LjlsMy42NiAyLjE4LjI5LS41N3MtLjIyLS4zOS0uMjktLjM5em0uMiAxLjhhLjM2LjM2IDAgMCAxLS40IDBsLTMuNDYtMi4wNnYuNjZhLjQyLjQyIDAgMCAwIC4xOS4zNWwzLjI4IDJhLjM3LjM3IDAgMCAwIC4zOCAwIDIgMiAwIDAgMCAuMi0uNTJsLS4xOS0uMzl6IiBjbGFzcz0ic3QwIi8+JiN4YTsJCTxwYXRoIGQ9Ik04Ljk3NiAxMC43MjdsMy42Ni0yLjE4di0uNDNhLjM5LjM5IDAgMCAwLS4xOS0uMzRsLTMuMjgtMmEuMzcuMzcgMCAwIDAtLjM4IDBsLTMuMjggMmEuNDEuNDEgMCAwIDAtLjE5LjM0di40M3oiIGNsYXNzPSJzdDEiLz4mI3hhOwkJPHBhdGggZD0iTTguOTc2IDkuODI3bC0zLjQ3LTIuMDVhLjQxLjQxIDAgMCAwLS4xOS4zNHYuNDNsMy42NiAyLjE4LjI4LS41NnoiIGNsYXNzPSJzdDAiLz4mI3hhOwkJPGcgY2xhc3M9InN0MiI+JiN4YTsJCQk8cGF0aCBkPSJNOC45NzYgMTEuNTk3djFsMy42Ni0yLjE4di0uOWwtMy40NiAyLjAyYS42NS42NSAwIDAgMS0uMi4wNnptLjIgMS44YS4zNi4zNiAwIDAgMS0uMi4wNnYuOWEuNS41IDAgMCAwIC4yMS0uMDVsMy4yOC0yYS4zOS4zOSAwIDAgMCAuMTktLjM1di0uNjZ6Ii8+JiN4YTsJCQk8cGF0aCBkPSJNMTIuNDQ2IDcuNzc3bC0zLjQ3IDIuMDV2LjlsMy42Ni0yLjE4di0uNDNhLjM5LjM5IDAgMCAwLS4xOS0uMzR6Ii8+JiN4YTsJCTwvZz4mI3hhOwkJPHBhdGggZD0iTTQuNzU2IDE1LjUyN2w0LjE1IDIuNDdhMi43MiAyLjcyIDAgMCAxIDEuMjggMS44LjE4LjE4IDAgMCAxLS4yOC4xOGwtNS40NS0zLjIzYy0uNTMtLjMyLS4wNy0xLjg4LS4wNy0xLjg4YS43Ny43NyAwIDAgMCAuMzcuNjZ6IiBjbGFzcz0ic3QwIi8+JiN4YTsJCTxwYXRoIGQ9Ik0zLjQ4NiAxNS43Mjd2LTYuNTZhLjQxLjQxIDAgMCAxIC4xOS0uMzNsMS0uNTl2Ny45MWMwIC4yNyAwIC42OS4yMS44M2wtMS4wNi0uNjZhLjc1Ljc1IDAgMCAxLS4zNC0uNnoiIGNsYXNzPSJzdDEiLz4mI3hhOwkJPHBhdGggZD0iTTcuMTM2IDMuNDU3YS43NS43NSAwIDAgMC0uNzQgMGwtNC4yIDIuNTRhMi42MyAyLjYzIDAgMCAxLTIuMDguMjYuMjMuMjMgMCAwIDEgMC0uNGMuMTgtLjA5IDYuMzItMy43NCA2LjMyLTMuNzQuMjMtLjE0Ljc0IDEuMzkuNzQgMS4zOXoiIGNsYXNzPSJzdDAiLz4mI3hhOwkJPHBhdGggZD0iTTcuMTI2IDIuMDc3bDUuMzIgMy4xNWEuMzcuMzcgMCAwIDEgLjIuMzF2MS4xOGwtNi42Ny0zLjk2YS43NS43NSAwIDAgMC0uNzQgMGwxLjE4LS42OWEuNzEuNzEgMCAwIDEgLjczIDB6IiBjbGFzcz0ic3QxIi8+JiN4YTsJCTxwYXRoIGQ9Ik0xMC43OTYgMTYuNDg3YS43My43MyAwIDAgMCAuNzQgMGw0LjItMi40OWEyLjYzIDIuNjMgMCAwIDEgMi4xLS4yNS4yMS4yMSAwIDAgMSAwIC4zOGwtNi4zMyAzLjc1Yy0uMjIuMTQtLjc0LTEuNC0uNzQtMS40eiIgY2xhc3M9InN0MCIvPiYjeGE7CQk8cGF0aCBkPSJNNS40ODYgMTQuNzQ3YS41Ni41NiAwIDAgMS0uMTctLjMzdi0xLjE2bDYuNjYgMy45M2EuNjkuNjkgMCAwIDAgLjczIDBsLTEuMTguN2EuNy43IDAgMCAxLS43NCAweiIgY2xhc3M9InN0MSIvPiYjeGE7CQk8cGF0aCBkPSJNMy4yMzYgNy44MDdhLjc2Ljc2IDAgMCAwLS4zNy42NXY1YTIuNzUgMi43NSAwIDAgMS0uODcgMiAuMTguMTggMCAwIDEtLjMtLjEzdi03LjU2YzAtLjI4IDEuNTQgMCAxLjU0IDB6IiBjbGFzcz0ic3QwIi8+JiN4YTsJCTxwYXRoIGQ9Ik02Ljc0NiA0LjUxN2EuMzQuMzQgMCAwIDEgLjM2IDBsMSAuNTktNi4wOCAzLjU2YS43Ny43NyAwIDAgMC0uMzcuNjZ2LTEuMzlhLjcyLjcyIDAgMCAxIC4zOC0uNjR6IiBjbGFzcz0ic3QxIi8+JiN4YTsJCTxwYXRoIGQ9Ik0xNS4xNDYgMTEuNDM3di01YTIuODEgMi44MSAwIDAgMSAuODQtMmMwIDAgLjMzLS4xMS4zMS4yMXMwIDcuMzcgMCA3LjM3Yy0uMzEuMzctMS42MSAwLTEuNjEgMGEuODEuODEgMCAwIDAgLjQ2LS41OHoiIGNsYXNzPSJzdDAiLz4mI3hhOwkJPHBhdGggZD0iTTE1Ljk3NiAxMi42MDdsLTQuNzQgMi44NWEuMzUuMzUgMCAwIDEtLjM3IDBsLTEtLjU3IDYuMTEtMy42N2EuNzcuNzcgMCAwIDAgLjM3LS42NnYxLjQ0Yy0uMDIuMjMtLjM3LjYxLS4zNy42MXoiIGNsYXNzPSJzdDEiLz4mI3hhOwk8L2c+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(16, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Bigtable');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud spanner', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 120, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Cloud\nSpanner', 
			    		new mxGeometry(0, 0, 30, 27), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE4LjQ1OTk5OTA4NDQ3MjY1NiIgZmlsbC1ydWxlPSJldmVub2RkIiB2aWV3Qm94PSIwIDAgMjAgMTguNDU5OTk5MDg0NDcyNjU2Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CQkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJCS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkJLnN0MntmaWxsOiNhZWNiZmE7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTguNjYgNS42M3Y0LjM2bC0zLjc3IDIuMTggMS4zNCAyLjMyTDEwIDEyLjMxbDMuNzcgMi4xOCAxLjM0LTIuMzItMy43Ny0yLjE4VjUuNjN6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTEwIDUuNjN2NS4xMmwtNC40NCAyLjU4LjY3IDEuMTZMMTAgMTIuMzFsMy43NyAyLjE4IDEuMzQtMi4zMi0zLjc3LTIuMThWNS42M3oiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNNi42MiA0Ljk1TDEwIDYuNzhWMy42N2wtMS4zNS0uNjJWMEw2LjYyIDEuMjJ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTEwIDYuNzhsMy4zOC0xLjgzVjEuMjJMMTEuMzUgMHYzLjA1TDEwIDMuNjd6bTYuMTQgNy41M2wtLjA4IDEuMzkgMi43IDEuNTMtMi4xOCAxLjItMy4yNC0xLjg3LjExLTMuODMgMy4yNy0yTDIwIDEyLjYxdjIuNDlsLTIuNjktMS41NXptLTEyLjI4IDBsLTEuMTctLjc2TDAgMTUuMXYtMi40OWwzLjIzLTEuODcgMy4yNyAyIC4xMSAzLjgzLTMuMTkgMS44OS0yLjE4LTEuMjMgMi43LTEuNTZ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTE2LjcyIDEwLjc1bC0zLjI3IDIuMDEgMi42OSAxLjU1IDEuMTYtLjc2TDIwIDE1LjFsLS4wNS0yLjQ5ek0zLjg2IDE0LjMxbDIuNjktMS41NS0zLjI3LTIuMDEtMy4yMyAxLjg2TDAgMTUuMWwyLjctMS41NXoiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 16);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Spanner');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud spanner', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 150, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Spanner', 
			    		new mxGeometry(0, 0, 30, 27), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE4LjQ1OTk5OTA4NDQ3MjY1NiIgZmlsbC1ydWxlPSJldmVub2RkIiB2aWV3Qm94PSIwIDAgMjAgMTguNDU5OTk5MDg0NDcyNjU2Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CQkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJCS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkJLnN0MntmaWxsOiNhZWNiZmE7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTguNjYgNS42M3Y0LjM2bC0zLjc3IDIuMTggMS4zNCAyLjMyTDEwIDEyLjMxbDMuNzcgMi4xOCAxLjM0LTIuMzItMy43Ny0yLjE4VjUuNjN6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTEwIDUuNjN2NS4xMmwtNC40NCAyLjU4LjY3IDEuMTZMMTAgMTIuMzFsMy43NyAyLjE4IDEuMzQtMi4zMi0zLjc3LTIuMThWNS42M3oiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNNi42MiA0Ljk1TDEwIDYuNzhWMy42N2wtMS4zNS0uNjJWMEw2LjYyIDEuMjJ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTEwIDYuNzhsMy4zOC0xLjgzVjEuMjJMMTEuMzUgMHYzLjA1TDEwIDMuNjd6bTYuMTQgNy41M2wtLjA4IDEuMzkgMi43IDEuNTMtMi4xOCAxLjItMy4yNC0xLjg3LjExLTMuODMgMy4yNy0yTDIwIDEyLjYxdjIuNDlsLTIuNjktMS41NXptLTEyLjI4IDBsLTEuMTctLjc2TDAgMTUuMXYtMi40OWwzLjIzLTEuODcgMy4yNyAyIC4xMSAzLjgzLTMuMTkgMS44OS0yLjE4LTEuMjMgMi43LTEuNTZ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTE2LjcyIDEwLjc1bC0zLjI3IDIuMDEgMi42OSAxLjU1IDEuMTYtLjc2TDIwIDE1LjFsLS4wNS0yLjQ5ek0zLjg2IDE0LjMxbDIuNjktMS41NS0zLjI3LTIuMDEtMy4yMyAxLjg2TDAgMTUuMWwyLjctMS41NXoiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 16);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Spanner');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud spanner', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 158, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Spanner', 
			    		new mxGeometry(0, 0, 30, 27), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE4LjQ1OTk5OTA4NDQ3MjY1NiIgZmlsbC1ydWxlPSJldmVub2RkIiB2aWV3Qm94PSIwIDAgMjAgMTguNDU5OTk5MDg0NDcyNjU2Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CQkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJCS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkJLnN0MntmaWxsOiNhZWNiZmE7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTguNjYgNS42M3Y0LjM2bC0zLjc3IDIuMTggMS4zNCAyLjMyTDEwIDEyLjMxbDMuNzcgMi4xOCAxLjM0LTIuMzItMy43Ny0yLjE4VjUuNjN6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTEwIDUuNjN2NS4xMmwtNC40NCAyLjU4LjY3IDEuMTZMMTAgMTIuMzFsMy43NyAyLjE4IDEuMzQtMi4zMi0zLjc3LTIuMThWNS42M3oiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNNi42MiA0Ljk1TDEwIDYuNzhWMy42N2wtMS4zNS0uNjJWMEw2LjYyIDEuMjJ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTEwIDYuNzhsMy4zOC0xLjgzVjEuMjJMMTEuMzUgMHYzLjA1TDEwIDMuNjd6bTYuMTQgNy41M2wtLjA4IDEuMzkgMi43IDEuNTMtMi4xOCAxLjItMy4yNC0xLjg3LjExLTMuODMgMy4yNy0yTDIwIDEyLjYxdjIuNDlsLTIuNjktMS41NXptLTEyLjI4IDBsLTEuMTctLjc2TDAgMTUuMXYtMi40OWwzLjIzLTEuODcgMy4yNyAyIC4xMSAzLjgzLTMuMTkgMS44OS0yLjE4LTEuMjMgMi43LTEuNTZ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTE2LjcyIDEwLjc1bC0zLjI3IDIuMDEgMi42OSAxLjU1IDEuMTYtLjc2TDIwIDE1LjFsLS4wNS0yLjQ5ek0zLjg2IDE0LjMxbDIuNjktMS41NS0zLjI3LTIuMDEtMy4yMyAxLjg2TDAgMTUuMWwyLjctMS41NXoiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 16);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Spanner');
			})
		);

		fns.push(
			this.addEntry(dt + 'memorystore', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 150, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Memorystore', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMCAxLjk0aDMuMzN2Mi41OEgwem0wIDQuNTFoMy4zM3YyLjU4SDB6bTAgNC41MmgzLjMzdjIuNThIMHptMCA0LjUxaDMuMzN2Mi41OEgwek0xNi42NyAxLjk0SDIwdjIuNThoLTMuMzN6bTAgNC41MUgyMHYyLjU4aC0zLjMzem0wIDQuNTJIMjB2Mi41OGgtMy4zM3ptMCA0LjUxSDIwdjIuNThoLTMuMzN6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTE2LjY3IDEuOTRsMi42NiAyLjU4aC0yLjY2em0wIDQuNTFsMi42NiAyLjU4aC0yLjY2em0wIDQuNTJsMi42NiAyLjU4aC0yLjY2em0wIDQuNTFsMi42NiAyLjU5aC0yLjY2eiIgZmlsbC1ydWxlPSJldmVub2RkIi8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTMuMzMgMjBoMTMuMzRWMEgzLjMzem02LTlINmw0LjY3LTcuNzRWOUgxNGwtNC42NyA3Ljc0eiIgZmlsbC1ydWxlPSJldmVub2RkIi8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTE0IDkuMDNoLTMuMzNWMGg2djIwSDkuMzN2LTMuMjN6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Memorystore');
			})
		);

		fns.push(
			this.addEntry(dt + 'memorystore', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 150, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Memorystore', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMCAxLjk0aDMuMzN2Mi41OEgwem0wIDQuNTFoMy4zM3YyLjU4SDB6bTAgNC41MmgzLjMzdjIuNThIMHptMCA0LjUxaDMuMzN2Mi41OEgwek0xNi42NyAxLjk0SDIwdjIuNThoLTMuMzN6bTAgNC41MUgyMHYyLjU4aC0zLjMzem0wIDQuNTJIMjB2Mi41OGgtMy4zM3ptMCA0LjUxSDIwdjIuNThoLTMuMzN6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTE2LjY3IDEuOTRsMi42NiAyLjU4aC0yLjY2em0wIDQuNTFsMi42NiAyLjU4aC0yLjY2em0wIDQuNTJsMi42NiAyLjU4aC0yLjY2em0wIDQuNTFsMi42NiAyLjU5aC0yLjY2eiIgZmlsbC1ydWxlPSJldmVub2RkIi8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTMuMzMgMjBoMTMuMzRWMEgzLjMzem02LTlINmw0LjY3LTcuNzRWOUgxNGwtNC42NyA3Ljc0eiIgZmlsbC1ydWxlPSJldmVub2RkIi8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTE0IDkuMDNoLTMuMzNWMGg2djIwSDkuMzN2LTMuMjN6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Memorystore');
			})
		);

		fns.push(
			this.addEntry(dt + 'memorystore', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 158, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Memorystore', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMCAxLjk0aDMuMzN2Mi41OEgwem0wIDQuNTFoMy4zM3YyLjU4SDB6bTAgNC41MmgzLjMzdjIuNThIMHptMCA0LjUxaDMuMzN2Mi41OEgwek0xNi42NyAxLjk0SDIwdjIuNThoLTMuMzN6bTAgNC41MUgyMHYyLjU4aC0zLjMzem0wIDQuNTJIMjB2Mi41OGgtMy4zM3ptMCA0LjUxSDIwdjIuNThoLTMuMzN6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTE2LjY3IDEuOTRsMi42NiAyLjU4aC0yLjY2em0wIDQuNTFsMi42NiAyLjU4aC0yLjY2em0wIDQuNTJsMi42NiAyLjU4aC0yLjY2em0wIDQuNTFsMi42NiAyLjU5aC0yLjY2eiIgZmlsbC1ydWxlPSJldmVub2RkIi8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTMuMzMgMjBoMTMuMzRWMEgzLjMzem02LTlINmw0LjY3LTcuNzRWOUgxNGwtNC42NyA3Ljc0eiIgZmlsbC1ydWxlPSJldmVub2RkIi8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTE0IDkuMDNoLTMuMzNWMGg2djIwSDkuMzN2LTMuMjN6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Memorystore');
			})
		);

		fns.push(
			this.addEntry(dt + 'firestore', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 120, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Firestore', 
			    		new mxGeometry(0, 0, 26, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjMyMy45MDU2MTAzOTg2NzUxNSIgaGVpZ2h0PSIzNzYuNDIyMjk0OTYzNjg0MDciIHZpZXdCb3g9Ii0wLjA5NzAwMDAwMjg2MTAyMjk1IDAuMjg3OTk5OTg3NjAyMjMzOSA4NS42OTk5OTY5NDgyNDIxOSA5OS41OTUwMDEyMjA3MDMxMiI+JiN4YTs8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojYWVjYmZhO30mI3hhOwkuc3Qxe2ZpbGw6IzY2OWRmNjt9JiN4YTsJLnN0MntmaWxsOiM0Mjg1ZjQ7fSYjeGE7PC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNLS4wOTcgNzUuODE1VjU1Ljg3NGw0Mi44NS0yMC4xODN2MTkuMDd6bTAtMzUuNDAzVjIwLjQ3MUw0Mi43NTMuMjg4djE5LjA3eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik04NS42MDMgNzUuODE1VjU1Ljg3NGwtNDIuODUtMjAuMTgzdjE5LjA3em0wLTM1LjQwM1YyMC40NzFMNDIuNzUzLjI4OHYxOS4wN3oiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNNDIuNzUzIDgwLjMxNGwxNi4yMTctNy41MjUgMjEuMDg0IDkuNzE3LTM3LjMwMSAxNy4zNzd6Ii8+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(17, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Firestore');
			})
		);

		fns.push(
			this.addEntry(dt + 'firestore', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 120, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Firestore', 
			    		new mxGeometry(0, 0, 26, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjMyMy45MDU2MTAzOTg2NzUxNSIgaGVpZ2h0PSIzNzYuNDIyMjk0OTYzNjg0MDciIHZpZXdCb3g9Ii0wLjA5NzAwMDAwMjg2MTAyMjk1IDAuMjg3OTk5OTg3NjAyMjMzOSA4NS42OTk5OTY5NDgyNDIxOSA5OS41OTUwMDEyMjA3MDMxMiI+JiN4YTs8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojYWVjYmZhO30mI3hhOwkuc3Qxe2ZpbGw6IzY2OWRmNjt9JiN4YTsJLnN0MntmaWxsOiM0Mjg1ZjQ7fSYjeGE7PC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNLS4wOTcgNzUuODE1VjU1Ljg3NGw0Mi44NS0yMC4xODN2MTkuMDd6bTAtMzUuNDAzVjIwLjQ3MUw0Mi43NTMuMjg4djE5LjA3eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik04NS42MDMgNzUuODE1VjU1Ljg3NGwtNDIuODUtMjAuMTgzdjE5LjA3em0wLTM1LjQwM1YyMC40NzFMNDIuNzUzLjI4OHYxOS4wN3oiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNNDIuNzUzIDgwLjMxNGwxNi4yMTctNy41MjUgMjEuMDg0IDkuNzE3LTM3LjMwMSAxNy4zNzd6Ii8+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(17, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Firestore');
			})
		);

		fns.push(
			this.addEntry(dt + 'firestore', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 128, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Firestore', 
			    		new mxGeometry(0, 0, 26, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjMyMy45MDU2MTAzOTg2NzUxNSIgaGVpZ2h0PSIzNzYuNDIyMjk0OTYzNjg0MDciIHZpZXdCb3g9Ii0wLjA5NzAwMDAwMjg2MTAyMjk1IDAuMjg3OTk5OTg3NjAyMjMzOSA4NS42OTk5OTY5NDgyNDIxOSA5OS41OTUwMDEyMjA3MDMxMiI+JiN4YTs8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojYWVjYmZhO30mI3hhOwkuc3Qxe2ZpbGw6IzY2OWRmNjt9JiN4YTsJLnN0MntmaWxsOiM0Mjg1ZjQ7fSYjeGE7PC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNLS4wOTcgNzUuODE1VjU1Ljg3NGw0Mi44NS0yMC4xODN2MTkuMDd6bTAtMzUuNDAzVjIwLjQ3MUw0Mi43NTMuMjg4djE5LjA3eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik04NS42MDMgNzUuODE1VjU1Ljg3NGwtNDIuODUtMjAuMTgzdjE5LjA3em0wLTM1LjQwM1YyMC40NzFMNDIuNzUzLjI4OHYxOS4wN3oiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNNDIuNzUzIDgwLjMxNGwxNi4yMTctNy41MjUgMjEuMDg0IDkuNzE3LTM3LjMwMSAxNy4zNzd6Ii8+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(17, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Firestore');
			})
		);

		fns.push(
			this.addEntry(dt + 'datastore', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 130, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Datastore', 
			    		new mxGeometry(0, 0, 30, 21), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjMwIiBoZWlnaHQ9IjIxIiB2aWV3Qm94PSIwIDAgMzAgMjEiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJLnN0M3tmaWxsOiNmZmY7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggZD0iTTAgMGwxLjUgMS41aDZMOSAweiIgY2xhc3M9InN0MiIvPiYjeGE7CTxwYXRoIGQ9Ik05IDlWMEw3LjUgMS41djZ6IiBjbGFzcz0ic3QxIi8+JiN4YTsJPHBhdGggZD0iTTAgOWwxLjUtMS41di02TDAgMHoiIGNsYXNzPSJzdDIiLz4mI3hhOwk8cGF0aCBkPSJNOSA5TDcuNSA3LjVoLTZMMCA5eiIgY2xhc3M9InN0MCIvPiYjeGE7CTxwYXRoIGQ9Ik0xLjUgMS41aDZ2NmgtNnoiIGNsYXNzPSJzdDIiLz4mI3hhOwk8cGF0aCBkPSJNMTAuNSAwTDEyIDEuNWg2TDE5LjUgMHoiIGNsYXNzPSJzdDAiLz4mI3hhOwk8cGF0aCBkPSJNMTkuNSA5VjBMMTggMS41djZ6IiBjbGFzcz0ic3QxIi8+JiN4YTsJPHBhdGggZD0iTTEwLjUgOUwxMiA3LjV2LTZMMTAuNSAweiIgY2xhc3M9InN0MCIvPiYjeGE7CTxwYXRoIGQ9Ik0xOS41IDlMMTggNy41aC02TDEwLjUgOXoiIGNsYXNzPSJzdDEiLz4mI3hhOwk8cGF0aCBkPSJNMTIgMS41aDZ2NmgtNnoiIGNsYXNzPSJzdDMiLz4mI3hhOwk8cGF0aCBkPSJNMjEgMGwxLjUgMS41aDZMMzAgMHoiIGNsYXNzPSJzdDAiLz4mI3hhOwk8cGF0aCBkPSJNMzAgOVYwbC0xLjUgMS41djZ6IiBjbGFzcz0ic3QxIi8+JiN4YTsJPHBhdGggZD0iTTIxIDlsMS41LTEuNXYtNkwyMSAweiIgY2xhc3M9InN0MCIvPiYjeGE7CTxwYXRoIGQ9Ik0zMCA5bC0xLjUtMS41aC02TDIxIDl6IiBjbGFzcz0ic3QxIi8+JiN4YTsJPHBhdGggZD0iTTIyLjUgMS41aDZ2NmgtNnoiIGNsYXNzPSJzdDMiLz4mI3hhOwk8cGF0aCBkPSJNMCAxMmwxLjUgMS41aDZMOSAxMnoiIGNsYXNzPSJzdDAiLz4mI3hhOwk8cGF0aCBkPSJNOSAyMXYtOWwtMS41IDEuNXY2eiIgY2xhc3M9InN0MSIvPiYjeGE7CTxwYXRoIGQ9Ik0wIDIxbDEuNS0xLjV2LTZMMCAxMnoiIGNsYXNzPSJzdDAiLz4mI3hhOwk8cGF0aCBkPSJNOSAyMWwtMS41LTEuNWgtNkwwIDIxeiIgY2xhc3M9InN0MSIvPiYjeGE7CTxwYXRoIGQ9Ik0xLjUgMTMuNWg2djZoLTZ6IiBjbGFzcz0ic3QzIi8+JiN4YTsJPHBhdGggZD0iTTEwLjUgMTJsMS41IDEuNWg2bDEuNS0xLjV6IiBjbGFzcz0ic3QyIi8+JiN4YTsJPHBhdGggZD0iTTE5LjUgMjF2LTlMMTggMTMuNXY2eiIgY2xhc3M9InN0MSIvPiYjeGE7CTxwYXRoIGQ9Ik0xMC41IDIxbDEuNS0xLjV2LTZMMTAuNSAxMnoiIGNsYXNzPSJzdDIiLz4mI3hhOwk8cGF0aCBkPSJNMTkuNSAyMUwxOCAxOS41aC02TDEwLjUgMjF6IiBjbGFzcz0ic3QwIi8+JiN4YTsJPHBhdGggZD0iTTEyIDEzLjVoNnY2aC02em05LTEuNWwxLjUgMS41aDZMMzAgMTJ6IiBjbGFzcz0ic3QyIi8+JiN4YTsJPHBhdGggZD0iTTMwIDIxdi05bC0xLjUgMS41djZ6IiBjbGFzcz0ic3QxIi8+JiN4YTsJPHBhdGggZD0iTTIxIDIxbDEuNS0xLjV2LTZMMjEgMTJ6IiBjbGFzcz0ic3QyIi8+JiN4YTsJPHBhdGggZD0iTTMwIDIxbC0xLjUtMS41aC02TDIxIDIxeiIgY2xhc3M9InN0MCIvPiYjeGE7CTxwYXRoIGQ9Ik0yMi41IDEzLjVoNnY2aC02eiIgY2xhc3M9InN0MiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 19);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Datastore');
			})
		);

		fns.push(
			this.addEntry(dt + 'datastore', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 130, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Datastore', 
			    		new mxGeometry(0, 0, 30, 21), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjMwIiBoZWlnaHQ9IjIxIiB2aWV3Qm94PSIwIDAgMzAgMjEiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJLnN0M3tmaWxsOiNmZmY7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggZD0iTTAgMGwxLjUgMS41aDZMOSAweiIgY2xhc3M9InN0MiIvPiYjeGE7CTxwYXRoIGQ9Ik05IDlWMEw3LjUgMS41djZ6IiBjbGFzcz0ic3QxIi8+JiN4YTsJPHBhdGggZD0iTTAgOWwxLjUtMS41di02TDAgMHoiIGNsYXNzPSJzdDIiLz4mI3hhOwk8cGF0aCBkPSJNOSA5TDcuNSA3LjVoLTZMMCA5eiIgY2xhc3M9InN0MCIvPiYjeGE7CTxwYXRoIGQ9Ik0xLjUgMS41aDZ2NmgtNnoiIGNsYXNzPSJzdDIiLz4mI3hhOwk8cGF0aCBkPSJNMTAuNSAwTDEyIDEuNWg2TDE5LjUgMHoiIGNsYXNzPSJzdDAiLz4mI3hhOwk8cGF0aCBkPSJNMTkuNSA5VjBMMTggMS41djZ6IiBjbGFzcz0ic3QxIi8+JiN4YTsJPHBhdGggZD0iTTEwLjUgOUwxMiA3LjV2LTZMMTAuNSAweiIgY2xhc3M9InN0MCIvPiYjeGE7CTxwYXRoIGQ9Ik0xOS41IDlMMTggNy41aC02TDEwLjUgOXoiIGNsYXNzPSJzdDEiLz4mI3hhOwk8cGF0aCBkPSJNMTIgMS41aDZ2NmgtNnoiIGNsYXNzPSJzdDMiLz4mI3hhOwk8cGF0aCBkPSJNMjEgMGwxLjUgMS41aDZMMzAgMHoiIGNsYXNzPSJzdDAiLz4mI3hhOwk8cGF0aCBkPSJNMzAgOVYwbC0xLjUgMS41djZ6IiBjbGFzcz0ic3QxIi8+JiN4YTsJPHBhdGggZD0iTTIxIDlsMS41LTEuNXYtNkwyMSAweiIgY2xhc3M9InN0MCIvPiYjeGE7CTxwYXRoIGQ9Ik0zMCA5bC0xLjUtMS41aC02TDIxIDl6IiBjbGFzcz0ic3QxIi8+JiN4YTsJPHBhdGggZD0iTTIyLjUgMS41aDZ2NmgtNnoiIGNsYXNzPSJzdDMiLz4mI3hhOwk8cGF0aCBkPSJNMCAxMmwxLjUgMS41aDZMOSAxMnoiIGNsYXNzPSJzdDAiLz4mI3hhOwk8cGF0aCBkPSJNOSAyMXYtOWwtMS41IDEuNXY2eiIgY2xhc3M9InN0MSIvPiYjeGE7CTxwYXRoIGQ9Ik0wIDIxbDEuNS0xLjV2LTZMMCAxMnoiIGNsYXNzPSJzdDAiLz4mI3hhOwk8cGF0aCBkPSJNOSAyMWwtMS41LTEuNWgtNkwwIDIxeiIgY2xhc3M9InN0MSIvPiYjeGE7CTxwYXRoIGQ9Ik0xLjUgMTMuNWg2djZoLTZ6IiBjbGFzcz0ic3QzIi8+JiN4YTsJPHBhdGggZD0iTTEwLjUgMTJsMS41IDEuNWg2bDEuNS0xLjV6IiBjbGFzcz0ic3QyIi8+JiN4YTsJPHBhdGggZD0iTTE5LjUgMjF2LTlMMTggMTMuNXY2eiIgY2xhc3M9InN0MSIvPiYjeGE7CTxwYXRoIGQ9Ik0xMC41IDIxbDEuNS0xLjV2LTZMMTAuNSAxMnoiIGNsYXNzPSJzdDIiLz4mI3hhOwk8cGF0aCBkPSJNMTkuNSAyMUwxOCAxOS41aC02TDEwLjUgMjF6IiBjbGFzcz0ic3QwIi8+JiN4YTsJPHBhdGggZD0iTTEyIDEzLjVoNnY2aC02em05LTEuNWwxLjUgMS41aDZMMzAgMTJ6IiBjbGFzcz0ic3QyIi8+JiN4YTsJPHBhdGggZD0iTTMwIDIxdi05bC0xLjUgMS41djZ6IiBjbGFzcz0ic3QxIi8+JiN4YTsJPHBhdGggZD0iTTIxIDIxbDEuNS0xLjV2LTZMMjEgMTJ6IiBjbGFzcz0ic3QyIi8+JiN4YTsJPHBhdGggZD0iTTMwIDIxbC0xLjUtMS41aC02TDIxIDIxeiIgY2xhc3M9InN0MCIvPiYjeGE7CTxwYXRoIGQ9Ik0yMi41IDEzLjVoNnY2aC02eiIgY2xhc3M9InN0MiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 19);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Datastore');
			})
		);

		fns.push(
			this.addEntry(dt + 'datastore', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 138, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Datastore', 
			    		new mxGeometry(0, 0, 30, 21), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjMwIiBoZWlnaHQ9IjIxIiB2aWV3Qm94PSIwIDAgMzAgMjEiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJLnN0M3tmaWxsOiNmZmY7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggZD0iTTAgMGwxLjUgMS41aDZMOSAweiIgY2xhc3M9InN0MiIvPiYjeGE7CTxwYXRoIGQ9Ik05IDlWMEw3LjUgMS41djZ6IiBjbGFzcz0ic3QxIi8+JiN4YTsJPHBhdGggZD0iTTAgOWwxLjUtMS41di02TDAgMHoiIGNsYXNzPSJzdDIiLz4mI3hhOwk8cGF0aCBkPSJNOSA5TDcuNSA3LjVoLTZMMCA5eiIgY2xhc3M9InN0MCIvPiYjeGE7CTxwYXRoIGQ9Ik0xLjUgMS41aDZ2NmgtNnoiIGNsYXNzPSJzdDIiLz4mI3hhOwk8cGF0aCBkPSJNMTAuNSAwTDEyIDEuNWg2TDE5LjUgMHoiIGNsYXNzPSJzdDAiLz4mI3hhOwk8cGF0aCBkPSJNMTkuNSA5VjBMMTggMS41djZ6IiBjbGFzcz0ic3QxIi8+JiN4YTsJPHBhdGggZD0iTTEwLjUgOUwxMiA3LjV2LTZMMTAuNSAweiIgY2xhc3M9InN0MCIvPiYjeGE7CTxwYXRoIGQ9Ik0xOS41IDlMMTggNy41aC02TDEwLjUgOXoiIGNsYXNzPSJzdDEiLz4mI3hhOwk8cGF0aCBkPSJNMTIgMS41aDZ2NmgtNnoiIGNsYXNzPSJzdDMiLz4mI3hhOwk8cGF0aCBkPSJNMjEgMGwxLjUgMS41aDZMMzAgMHoiIGNsYXNzPSJzdDAiLz4mI3hhOwk8cGF0aCBkPSJNMzAgOVYwbC0xLjUgMS41djZ6IiBjbGFzcz0ic3QxIi8+JiN4YTsJPHBhdGggZD0iTTIxIDlsMS41LTEuNXYtNkwyMSAweiIgY2xhc3M9InN0MCIvPiYjeGE7CTxwYXRoIGQ9Ik0zMCA5bC0xLjUtMS41aC02TDIxIDl6IiBjbGFzcz0ic3QxIi8+JiN4YTsJPHBhdGggZD0iTTIyLjUgMS41aDZ2NmgtNnoiIGNsYXNzPSJzdDMiLz4mI3hhOwk8cGF0aCBkPSJNMCAxMmwxLjUgMS41aDZMOSAxMnoiIGNsYXNzPSJzdDAiLz4mI3hhOwk8cGF0aCBkPSJNOSAyMXYtOWwtMS41IDEuNXY2eiIgY2xhc3M9InN0MSIvPiYjeGE7CTxwYXRoIGQ9Ik0wIDIxbDEuNS0xLjV2LTZMMCAxMnoiIGNsYXNzPSJzdDAiLz4mI3hhOwk8cGF0aCBkPSJNOSAyMWwtMS41LTEuNWgtNkwwIDIxeiIgY2xhc3M9InN0MSIvPiYjeGE7CTxwYXRoIGQ9Ik0xLjUgMTMuNWg2djZoLTZ6IiBjbGFzcz0ic3QzIi8+JiN4YTsJPHBhdGggZD0iTTEwLjUgMTJsMS41IDEuNWg2bDEuNS0xLjV6IiBjbGFzcz0ic3QyIi8+JiN4YTsJPHBhdGggZD0iTTE5LjUgMjF2LTlMMTggMTMuNXY2eiIgY2xhc3M9InN0MSIvPiYjeGE7CTxwYXRoIGQ9Ik0xMC41IDIxbDEuNS0xLjV2LTZMMTAuNSAxMnoiIGNsYXNzPSJzdDIiLz4mI3hhOwk8cGF0aCBkPSJNMTkuNSAyMUwxOCAxOS41aC02TDEwLjUgMjF6IiBjbGFzcz0ic3QwIi8+JiN4YTsJPHBhdGggZD0iTTEyIDEzLjVoNnY2aC02em05LTEuNWwxLjUgMS41aDZMMzAgMTJ6IiBjbGFzcz0ic3QyIi8+JiN4YTsJPHBhdGggZD0iTTMwIDIxdi05bC0xLjUgMS41djZ6IiBjbGFzcz0ic3QxIi8+JiN4YTsJPHBhdGggZD0iTTIxIDIxbDEuNS0xLjV2LTZMMjEgMTJ6IiBjbGFzcz0ic3QyIi8+JiN4YTsJPHBhdGggZD0iTTMwIDIxbC0xLjUtMS41aC02TDIxIDIxeiIgY2xhc3M9InN0MCIvPiYjeGE7CTxwYXRoIGQ9Ik0yMi41IDEzLjVoNnY2aC02eiIgY2xhc3M9InN0MiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 19);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Datastore');
			})
		);

		this.addPalette('gcp2Databases', 'GCP / Databases', false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addGCP2StoragePalette = function()
	{
		var dt = 'gcp google cloud platform storage ';
		var fns = [];
		
		fns.push(
			this.addEntry(dt + 'cloud storage', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 120, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Cloud\nStorage', 
			    		new mxGeometry(0, 0, 30, 24), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE2IiB2aWV3Qm94PSIwIDAgMjAgMTYiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJLnN0M3tmaWxsOiNmZmY7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTAgMGgyMHY3SDB6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTE4IDBoMnY3aC0yeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xOCA3bDItN2gtMnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMCAwaDJ2N0gweiIvPiYjeGE7CTxnIGNsYXNzPSJzdDMiPiYjeGE7CQk8cGF0aCBkPSJNNCAzaDZ2MUg0eiIvPiYjeGE7CQk8cmVjdCB4PSIxMyIgeT0iMiIgd2lkdGg9IjMiIGhlaWdodD0iMyIgcng9IjEuNSIvPiYjeGE7CTwvZz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMCA5aDIwdjdIMHoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTggOWgydjdoLTJ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTE4IDE2bDItN2gtMnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMCA5aDJ2N0gweiIvPiYjeGE7CTxnIGNsYXNzPSJzdDMiPiYjeGE7CQk8cGF0aCBkPSJNNCAxMmg2djFINHoiLz4mI3hhOwkJPHJlY3QgeD0iMTMiIHk9IjExIiB3aWR0aD0iMyIgaGVpZ2h0PSIzIiByeD0iMS41Ii8+JiN4YTsJPC9nPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 18);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Storage');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud storage', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 150, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Storage', 
			    		new mxGeometry(0, 0, 30, 24), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE2IiB2aWV3Qm94PSIwIDAgMjAgMTYiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJLnN0M3tmaWxsOiNmZmY7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTAgMGgyMHY3SDB6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTE4IDBoMnY3aC0yeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xOCA3bDItN2gtMnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMCAwaDJ2N0gweiIvPiYjeGE7CTxnIGNsYXNzPSJzdDMiPiYjeGE7CQk8cGF0aCBkPSJNNCAzaDZ2MUg0eiIvPiYjeGE7CQk8cmVjdCB4PSIxMyIgeT0iMiIgd2lkdGg9IjMiIGhlaWdodD0iMyIgcng9IjEuNSIvPiYjeGE7CTwvZz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMCA5aDIwdjdIMHoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTggOWgydjdoLTJ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTE4IDE2bDItN2gtMnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMCA5aDJ2N0gweiIvPiYjeGE7CTxnIGNsYXNzPSJzdDMiPiYjeGE7CQk8cGF0aCBkPSJNNCAxMmg2djFINHoiLz4mI3hhOwkJPHJlY3QgeD0iMTMiIHk9IjExIiB3aWR0aD0iMyIgaGVpZ2h0PSIzIiByeD0iMS41Ii8+JiN4YTsJPC9nPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 18);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Storage');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud storage', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 158, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Storage', 
			    		new mxGeometry(0, 0, 30, 24), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE2IiB2aWV3Qm94PSIwIDAgMjAgMTYiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJLnN0M3tmaWxsOiNmZmY7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTAgMGgyMHY3SDB6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTE4IDBoMnY3aC0yeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xOCA3bDItN2gtMnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMCAwaDJ2N0gweiIvPiYjeGE7CTxnIGNsYXNzPSJzdDMiPiYjeGE7CQk8cGF0aCBkPSJNNCAzaDZ2MUg0eiIvPiYjeGE7CQk8cmVjdCB4PSIxMyIgeT0iMiIgd2lkdGg9IjMiIGhlaWdodD0iMyIgcng9IjEuNSIvPiYjeGE7CTwvZz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMCA5aDIwdjdIMHoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTggOWgydjdoLTJ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTE4IDE2bDItN2gtMnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMCA5aDJ2N0gweiIvPiYjeGE7CTxnIGNsYXNzPSJzdDMiPiYjeGE7CQk8cGF0aCBkPSJNNCAxMmg2djFINHoiLz4mI3hhOwkJPHJlY3QgeD0iMTMiIHk9IjExIiB3aWR0aD0iMyIgaGVpZ2h0PSIzIiByeD0iMS41Ii8+JiN4YTsJPC9nPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 18);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Storage');
			})
		);

		fns.push(
			this.addEntry(dt + 'persistent disk', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 130, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Persistent\nDisk', 
			    		new mxGeometry(0, 0, 24, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE1Ljg0MDAwMDE1MjU4Nzg5IiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMTUuODQwMDAwMTUyNTg3ODkgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMCAxNi4yNVYyMGgxNS44NHYtOC4zM2gtMy43NXY0LjU4eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xNS44NCAzLjc1VjBIMHY4LjMzaDMuNzVWMy43NXoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMCAxMC40MnYzLjc1aDEwVjkuNThoNS44NFY1LjgzaC0xMHY0LjU5eiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(18, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Persistent Disk');
			})
		);

		fns.push(
			this.addEntry(dt + 'persistent disk', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 150, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Persistent Disk', 
			    		new mxGeometry(0, 0, 24, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE1Ljg0MDAwMDE1MjU4Nzg5IiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMTUuODQwMDAwMTUyNTg3ODkgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMCAxNi4yNVYyMGgxNS44NHYtOC4zM2gtMy43NXY0LjU4eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xNS44NCAzLjc1VjBIMHY4LjMzaDMuNzVWMy43NXoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMCAxMC40MnYzLjc1aDEwVjkuNThoNS44NFY1LjgzaC0xMHY0LjU5eiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(18, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Persistent Disk');
			})
		);

		fns.push(
			this.addEntry(dt + 'persistent disk', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 158, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Persistent Disk', 
			    		new mxGeometry(0, 0, 24, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE1Ljg0MDAwMDE1MjU4Nzg5IiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMTUuODQwMDAwMTUyNTg3ODkgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMCAxNi4yNVYyMGgxNS44NHYtOC4zM2gtMy43NXY0LjU4eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xNS44NCAzLjc1VjBIMHY4LjMzaDMuNzVWMy43NXoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMCAxMC40MnYzLjc1aDEwVjkuNThoNS44NFY1LjgzaC0xMHY0LjU5eiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(18, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Persistent Disk');
			})
		);

		fns.push(
			this.addEntry(dt + 'filestore', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 120, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Filestore', 
			    		new mxGeometry(0, 0, 30, 24), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE2IiB2aWV3Qm94PSIwIDAgMjAgMTYiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTIgMTBIOEw2IDhoOHoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMTYgMkg0bDEtMmgxMHptMyAzSDFsMS0yaDE2eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xNCA3bC0yIDNIOEw2IDdIMHY5aDIwVjd6Ii8+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 18);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Filestore');
			})
		);

		fns.push(
			this.addEntry(dt + 'filestore', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 120, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Filestore', 
			    		new mxGeometry(0, 0, 30, 24), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE2IiB2aWV3Qm94PSIwIDAgMjAgMTYiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTIgMTBIOEw2IDhoOHoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMTYgMkg0bDEtMmgxMHptMyAzSDFsMS0yaDE2eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xNCA3bC0yIDNIOEw2IDdIMHY5aDIwVjd6Ii8+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 18);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Filestore');
			})
		);

		fns.push(
			this.addEntry(dt + 'filestore', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 128, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Filestore', 
			    		new mxGeometry(0, 0, 30, 24), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE2IiB2aWV3Qm94PSIwIDAgMjAgMTYiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTIgMTBIOEw2IDhoOHoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMTYgMkg0bDEtMmgxMHptMyAzSDFsMS0yaDE2eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xNCA3bC0yIDNIOEw2IDdIMHY5aDIwVjd6Ii8+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 18);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Filestore');
			})
		);

		this.addPalette('gcp2Storage', 'GCP / Storage', false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addGCP2ManagementToolsPalette = function()
	{
		var dt = 'gcp google cloud platform management tools ';
		var fns = [];
		
		fns.push(
			this.addEntry(dt + 'stackdriver', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 140, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Stackdriver', 
			    		new mxGeometry(0, 0, 30, 26), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjQxNiIgaGVpZ2h0PSIzNjIuMjAwMDEyMjA3MDMxMjUiIHZpZXdCb3g9IjAgMCA0MTYgMzYyLjIwMDAxMjIwNzAzMTI1Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qxe2ZpbGw6IzY2OWRmNjt9JiN4YTsJLnN0MntmaWxsOiNhZWNiZmE7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTk2LjAzIDBMMCAxNjcuMTdoMTkwLjY3TDI4Ny45NCAweiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yODcuNTkgMzYyLjJsLTk1LjY4LTE2Ny4xN0gwTDk1LjY4IDM2Mi4yeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik00MTYgMTgxLjFMMzIwIDEzLjMxIDIyMy44OCAxODEuMSAzMjAgMzQ4Ljl6Ii8+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 17);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Stackdriver');
			})
		);

		fns.push(
			this.addEntry(dt + 'stackdriver', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 140, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Stackdriver', 
			    		new mxGeometry(0, 0, 30, 26), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjQxNiIgaGVpZ2h0PSIzNjIuMjAwMDEyMjA3MDMxMjUiIHZpZXdCb3g9IjAgMCA0MTYgMzYyLjIwMDAxMjIwNzAzMTI1Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qxe2ZpbGw6IzY2OWRmNjt9JiN4YTsJLnN0MntmaWxsOiNhZWNiZmE7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTk2LjAzIDBMMCAxNjcuMTdoMTkwLjY3TDI4Ny45NCAweiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yODcuNTkgMzYyLjJsLTk1LjY4LTE2Ny4xN0gwTDk1LjY4IDM2Mi4yeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik00MTYgMTgxLjFMMzIwIDEzLjMxIDIyMy44OCAxODEuMSAzMjAgMzQ4Ljl6Ii8+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 17);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Stackdriver');
			})
		);

		fns.push(
			this.addEntry(dt + 'stackdriver', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 148, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Stackdriver', 
			    		new mxGeometry(0, 0, 30, 26), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjQxNiIgaGVpZ2h0PSIzNjIuMjAwMDEyMjA3MDMxMjUiIHZpZXdCb3g9IjAgMCA0MTYgMzYyLjIwMDAxMjIwNzAzMTI1Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qxe2ZpbGw6IzY2OWRmNjt9JiN4YTsJLnN0MntmaWxsOiNhZWNiZmE7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTk2LjAzIDBMMCAxNjcuMTdoMTkwLjY3TDI4Ny45NCAweiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yODcuNTkgMzYyLjJsLTk1LjY4LTE2Ny4xN0gwTDk1LjY4IDM2Mi4yeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik00MTYgMTgxLjFMMzIwIDEzLjMxIDIyMy44OCAxODEuMSAzMjAgMzQ4Ljl6Ii8+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 17);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Stackdriver');
			})
		);

		fns.push(
			this.addEntry(dt + 'debugger', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 130, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Debugger', 
			    		new mxGeometry(0, 0, 24, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE2LjEyMDAwMDgzOTIzMzQiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAxNi4xMjAwMDA4MzkyMzM0IDIwIj4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qxe2ZpbGw6IzY2OWRmNjt9JiN4YTsJLnN0MntmaWxsOiNhZWNiZmE7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTEyLjEyIDJ2MmgydjJoMlYyek0wIDZoMi4xMlY0aDJWMmgtNHY0eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xNi4xMiA2VjJsLTIgMnYyem0tMiAzbC04IDExVjl6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTYuMTIgOC4xMmw0IDIuODgtNCA1LjAzeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xMC4xMiAwdjExaC04eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMi4xMiAxNmgydi0yaDJ2NGgtNHoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMi4xMiAxNnYtMmgtMnY0aDQuMTMtLjEzdi0yeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0yLjEyIDE2di0yaC0ydjR6Ii8+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(18, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Debugger');
			})
		);

		fns.push(
			this.addEntry(dt + 'debugger', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 130, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Debugger', 
			    		new mxGeometry(0, 0, 24, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE2LjEyMDAwMDgzOTIzMzQiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAxNi4xMjAwMDA4MzkyMzM0IDIwIj4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qxe2ZpbGw6IzY2OWRmNjt9JiN4YTsJLnN0MntmaWxsOiNhZWNiZmE7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTEyLjEyIDJ2MmgydjJoMlYyek0wIDZoMi4xMlY0aDJWMmgtNHY0eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xNi4xMiA2VjJsLTIgMnYyem0tMiAzbC04IDExVjl6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTYuMTIgOC4xMmw0IDIuODgtNCA1LjAzeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xMC4xMiAwdjExaC04eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMi4xMiAxNmgydi0yaDJ2NGgtNHoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMi4xMiAxNnYtMmgtMnY0aDQuMTMtLjEzdi0yeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0yLjEyIDE2di0yaC0ydjR6Ii8+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(18, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Debugger');
			})
		);

		fns.push(
			this.addEntry(dt + 'debugger', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 138, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Debugger', 
			    		new mxGeometry(0, 0, 24, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE2LjEyMDAwMDgzOTIzMzQiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAxNi4xMjAwMDA4MzkyMzM0IDIwIj4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qxe2ZpbGw6IzY2OWRmNjt9JiN4YTsJLnN0MntmaWxsOiNhZWNiZmE7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTEyLjEyIDJ2MmgydjJoMlYyek0wIDZoMi4xMlY0aDJWMmgtNHY0eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xNi4xMiA2VjJsLTIgMnYyem0tMiAzbC04IDExVjl6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTYuMTIgOC4xMmw0IDIuODgtNCA1LjAzeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xMC4xMiAwdjExaC04eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMi4xMiAxNmgydi0yaDJ2NGgtNHoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMi4xMiAxNnYtMmgtMnY0aDQuMTMtLjEzdi0yeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0yLjEyIDE2di0yaC0ydjR6Ii8+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(18, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Debugger');
			})
		);

		fns.push(
			this.addEntry(dt + 'monitoring', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 130, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Monitoring', 
			    		new mxGeometry(0, 0, 30, 21), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjEzLjUyOTk5OTczMjk3MTE5MSIgdmlld0JveD0iLTIuOTMyMDk3ODk3ODEyMDE0ZS05IC01LjI1ODAxNTA0MTgzNzk1NmUtMTUgMjAgMTMuNTI5OTk5NzMyOTcxMTkxIj4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qxe2ZpbGw6IzY2OWRmNjt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNOC44MyAxMC41OGgyLjMzdjIuNjRIOC44M3oiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTYuNDggOC42MWEuNTYuNTYgMCAwIDEtLjQtLjE3TDEyIDQuMjEgOS4yNiA3LjFhLjU3LjU3IDAgMCAxLS43Ni4wNUw2LjQyIDUuNDdsLTIuMiAyLjkyYS41Ni41NiAwIDAgMS0uNDUuMjJIMHYxLjcxYS43NS43NSAwIDAgMCAuNzQuNzVoMTguNTJhLjc1Ljc1IDAgMCAwIC43NC0uNzVWOC42MXoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMy41IDcuNWwyLjM4LTMuMTZhLjU1LjU1IDAgMCAxIC4zNy0uMjIuNjMuNjMgMCAwIDEgLjQyLjEybDIuMTIgMS43MiAyLjgtMi45NGEuNTQuNTQgMCAwIDEgLjQtLjE3aDBhLjU0LjU0IDAgMCAxIC40LjE3bDQuMzMgNC40OEgyMFYuNzRhLjc0Ljc0IDAgMCAwLS43NC0uNzRILjc0QS43NC43NCAwIDAgMCAwIC43NHY2LjgxeiIvPiYjeGE7CTxyZWN0IGNsYXNzPSJzdDAiIHg9IjYuNjciIHk9IjEyLjkyIiB3aWR0aD0iNi42NyIgaGVpZ2h0PSIuNjEiIHJ4PSIuMyIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 19);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Monitoring');
			})
		);

		fns.push(
			this.addEntry(dt + 'monitoring', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 130, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Monitoring', 
			    		new mxGeometry(0, 0, 30, 21), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjEzLjUyOTk5OTczMjk3MTE5MSIgdmlld0JveD0iLTIuOTMyMDk3ODk3ODEyMDE0ZS05IC01LjI1ODAxNTA0MTgzNzk1NmUtMTUgMjAgMTMuNTI5OTk5NzMyOTcxMTkxIj4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qxe2ZpbGw6IzY2OWRmNjt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNOC44MyAxMC41OGgyLjMzdjIuNjRIOC44M3oiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTYuNDggOC42MWEuNTYuNTYgMCAwIDEtLjQtLjE3TDEyIDQuMjEgOS4yNiA3LjFhLjU3LjU3IDAgMCAxLS43Ni4wNUw2LjQyIDUuNDdsLTIuMiAyLjkyYS41Ni41NiAwIDAgMS0uNDUuMjJIMHYxLjcxYS43NS43NSAwIDAgMCAuNzQuNzVoMTguNTJhLjc1Ljc1IDAgMCAwIC43NC0uNzVWOC42MXoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMy41IDcuNWwyLjM4LTMuMTZhLjU1LjU1IDAgMCAxIC4zNy0uMjIuNjMuNjMgMCAwIDEgLjQyLjEybDIuMTIgMS43MiAyLjgtMi45NGEuNTQuNTQgMCAwIDEgLjQtLjE3aDBhLjU0LjU0IDAgMCAxIC40LjE3bDQuMzMgNC40OEgyMFYuNzRhLjc0Ljc0IDAgMCAwLS43NC0uNzRILjc0QS43NC43NCAwIDAgMCAwIC43NHY2LjgxeiIvPiYjeGE7CTxyZWN0IGNsYXNzPSJzdDAiIHg9IjYuNjciIHk9IjEyLjkyIiB3aWR0aD0iNi42NyIgaGVpZ2h0PSIuNjEiIHJ4PSIuMyIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 19);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Monitoring');
			})
		);

		fns.push(
			this.addEntry(dt + 'monitoring', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 138, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Monitoring', 
			    		new mxGeometry(0, 0, 30, 21), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjEzLjUyOTk5OTczMjk3MTE5MSIgdmlld0JveD0iLTIuOTMyMDk3ODk3ODEyMDE0ZS05IC01LjI1ODAxNTA0MTgzNzk1NmUtMTUgMjAgMTMuNTI5OTk5NzMyOTcxMTkxIj4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qxe2ZpbGw6IzY2OWRmNjt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNOC44MyAxMC41OGgyLjMzdjIuNjRIOC44M3oiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTYuNDggOC42MWEuNTYuNTYgMCAwIDEtLjQtLjE3TDEyIDQuMjEgOS4yNiA3LjFhLjU3LjU3IDAgMCAxLS43Ni4wNUw2LjQyIDUuNDdsLTIuMiAyLjkyYS41Ni41NiAwIDAgMS0uNDUuMjJIMHYxLjcxYS43NS43NSAwIDAgMCAuNzQuNzVoMTguNTJhLjc1Ljc1IDAgMCAwIC43NC0uNzVWOC42MXoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMy41IDcuNWwyLjM4LTMuMTZhLjU1LjU1IDAgMCAxIC4zNy0uMjIuNjMuNjMgMCAwIDEgLjQyLjEybDIuMTIgMS43MiAyLjgtMi45NGEuNTQuNTQgMCAwIDEgLjQtLjE3aDBhLjU0LjU0IDAgMCAxIC40LjE3bDQuMzMgNC40OEgyMFYuNzRhLjc0Ljc0IDAgMCAwLS43NC0uNzRILjc0QS43NC43NCAwIDAgMCAwIC43NHY2LjgxeiIvPiYjeGE7CTxyZWN0IGNsYXNzPSJzdDAiIHg9IjYuNjciIHk9IjEyLjkyIiB3aWR0aD0iNi42NyIgaGVpZ2h0PSIuNjEiIHJ4PSIuMyIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 19);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Monitoring');
			})
		);

		fns.push(
			this.addEntry(dt + 'deployment manager', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 140, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Deployment\nManager', 
			    		new mxGeometry(0, 0, 30, 21), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjEzLjUyOTk5OTczMjk3MTE5MSIgdmlld0JveD0iLTIuOTMyMDk3ODk3ODEyMDE0ZS05IC01LjI1ODAxNTA0MTgzNzk1NmUtMTUgMjAgMTMuNTI5OTk5NzMyOTcxMTkxIj4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qxe2ZpbGw6IzY2OWRmNjt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNOC44MyAxMC41OGgyLjMzdjIuNjRIOC44M3oiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTYuNDggOC42MWEuNTYuNTYgMCAwIDEtLjQtLjE3TDEyIDQuMjEgOS4yNiA3LjFhLjU3LjU3IDAgMCAxLS43Ni4wNUw2LjQyIDUuNDdsLTIuMiAyLjkyYS41Ni41NiAwIDAgMS0uNDUuMjJIMHYxLjcxYS43NS43NSAwIDAgMCAuNzQuNzVoMTguNTJhLjc1Ljc1IDAgMCAwIC43NC0uNzVWOC42MXoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMy41IDcuNWwyLjM4LTMuMTZhLjU1LjU1IDAgMCAxIC4zNy0uMjIuNjMuNjMgMCAwIDEgLjQyLjEybDIuMTIgMS43MiAyLjgtMi45NGEuNTQuNTQgMCAwIDEgLjQtLjE3aDBhLjU0LjU0IDAgMCAxIC40LjE3bDQuMzMgNC40OEgyMFYuNzRhLjc0Ljc0IDAgMCAwLS43NC0uNzRILjc0QS43NC43NCAwIDAgMCAwIC43NHY2LjgxeiIvPiYjeGE7CTxyZWN0IGNsYXNzPSJzdDAiIHg9IjYuNjciIHk9IjEyLjkyIiB3aWR0aD0iNi42NyIgaGVpZ2h0PSIuNjEiIHJ4PSIuMyIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 19);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Deployment Manager');
			})
		);

		fns.push(
			this.addEntry(dt + 'deployment manager', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 190, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Deployment Manager', 
			    		new mxGeometry(0, 0, 30, 21), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjEzLjUyOTk5OTczMjk3MTE5MSIgdmlld0JveD0iLTIuOTMyMDk3ODk3ODEyMDE0ZS05IC01LjI1ODAxNTA0MTgzNzk1NmUtMTUgMjAgMTMuNTI5OTk5NzMyOTcxMTkxIj4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qxe2ZpbGw6IzY2OWRmNjt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNOC44MyAxMC41OGgyLjMzdjIuNjRIOC44M3oiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTYuNDggOC42MWEuNTYuNTYgMCAwIDEtLjQtLjE3TDEyIDQuMjEgOS4yNiA3LjFhLjU3LjU3IDAgMCAxLS43Ni4wNUw2LjQyIDUuNDdsLTIuMiAyLjkyYS41Ni41NiAwIDAgMS0uNDUuMjJIMHYxLjcxYS43NS43NSAwIDAgMCAuNzQuNzVoMTguNTJhLjc1Ljc1IDAgMCAwIC43NC0uNzVWOC42MXoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMy41IDcuNWwyLjM4LTMuMTZhLjU1LjU1IDAgMCAxIC4zNy0uMjIuNjMuNjMgMCAwIDEgLjQyLjEybDIuMTIgMS43MiAyLjgtMi45NGEuNTQuNTQgMCAwIDEgLjQtLjE3aDBhLjU0LjU0IDAgMCAxIC40LjE3bDQuMzMgNC40OEgyMFYuNzRhLjc0Ljc0IDAgMCAwLS43NC0uNzRILjc0QS43NC43NCAwIDAgMCAwIC43NHY2LjgxeiIvPiYjeGE7CTxyZWN0IGNsYXNzPSJzdDAiIHg9IjYuNjciIHk9IjEyLjkyIiB3aWR0aD0iNi42NyIgaGVpZ2h0PSIuNjEiIHJ4PSIuMyIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 19);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Deployment Manager');
			})
		);

		fns.push(
			this.addEntry(dt + 'deployment manager', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 198, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Deployment Manager', 
			    		new mxGeometry(0, 0, 30, 28), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjEzLjUyOTk5OTczMjk3MTE5MSIgdmlld0JveD0iLTIuOTMyMDk3ODk3ODEyMDE0ZS05IC01LjI1ODAxNTA0MTgzNzk1NmUtMTUgMjAgMTMuNTI5OTk5NzMyOTcxMTkxIj4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qxe2ZpbGw6IzY2OWRmNjt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNOC44MyAxMC41OGgyLjMzdjIuNjRIOC44M3oiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTYuNDggOC42MWEuNTYuNTYgMCAwIDEtLjQtLjE3TDEyIDQuMjEgOS4yNiA3LjFhLjU3LjU3IDAgMCAxLS43Ni4wNUw2LjQyIDUuNDdsLTIuMiAyLjkyYS41Ni41NiAwIDAgMS0uNDUuMjJIMHYxLjcxYS43NS43NSAwIDAgMCAuNzQuNzVoMTguNTJhLjc1Ljc1IDAgMCAwIC43NC0uNzVWOC42MXoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMy41IDcuNWwyLjM4LTMuMTZhLjU1LjU1IDAgMCAxIC4zNy0uMjIuNjMuNjMgMCAwIDEgLjQyLjEybDIuMTIgMS43MiAyLjgtMi45NGEuNTQuNTQgMCAwIDEgLjQtLjE3aDBhLjU0LjU0IDAgMCAxIC40LjE3bDQuMzMgNC40OEgyMFYuNzRhLjc0Ljc0IDAgMCAwLS43NC0uNzRILjc0QS43NC43NCAwIDAgMCAwIC43NHY2LjgxeiIvPiYjeGE7CTxyZWN0IGNsYXNzPSJzdDAiIHg9IjYuNjciIHk9IjEyLjkyIiB3aWR0aD0iNi42NyIgaGVpZ2h0PSIuNjEiIHJ4PSIuMyIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 16);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Deployment Manager');
			})
		);

		fns.push(
			this.addEntry(dt + 'logging', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 120, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Logging', 
			    		new mxGeometry(0, 0, 30, 28), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE5IiB2aWV3Qm94PSIwIDAgMjAgMTkiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8ZyBjbGFzcz0ic3QwIj4mI3hhOwkJPHBhdGggZD0iTTQgOWg0djJINHptLTIgN2g2djJIMnoiLz4mI3hhOwkJPHBhdGggZD0iTTQgNEgydjEyaDJ6Ii8+JiN4YTsJPC9nPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0yMCAxSDd2NGgxM3ptMCA3SDd2NGgxM3ptMCA3SDd2NGgxM3oiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNNiAwSDB2Nmg2eiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 16);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Logging');
			})
		);

		fns.push(
			this.addEntry(dt + 'logging', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 120, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Logging', 
			    		new mxGeometry(0, 0, 30, 28), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE5IiB2aWV3Qm94PSIwIDAgMjAgMTkiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8ZyBjbGFzcz0ic3QwIj4mI3hhOwkJPHBhdGggZD0iTTQgOWg0djJINHptLTIgN2g2djJIMnoiLz4mI3hhOwkJPHBhdGggZD0iTTQgNEgydjEyaDJ6Ii8+JiN4YTsJPC9nPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0yMCAxSDd2NGgxM3ptMCA3SDd2NGgxM3ptMCA3SDd2NGgxM3oiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNNiAwSDB2Nmg2eiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 16);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Logging');
			})
		);

		fns.push(
			this.addEntry(dt + 'logging', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 128, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Logging', 
			    		new mxGeometry(0, 0, 30, 28), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE5IiB2aWV3Qm94PSIwIDAgMjAgMTkiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8ZyBjbGFzcz0ic3QwIj4mI3hhOwkJPHBhdGggZD0iTTQgOWg0djJINHptLTIgN2g2djJIMnoiLz4mI3hhOwkJPHBhdGggZD0iTTQgNEgydjEyaDJ6Ii8+JiN4YTsJPC9nPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0yMCAxSDd2NGgxM3ptMCA3SDd2NGgxM3ptMCA3SDd2NGgxM3oiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNNiAwSDB2Nmg2eiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 16);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Logging');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud console', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 120, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Cloud\nConsole', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjQyNCIgaGVpZ2h0PSI0MjQiIHZpZXdCb3g9IjAgMCA0MjQgNDI0Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQgMHY0MjRIMFYwek0yMTIgOTcuODQ2Yy0zNy44ODQgMC03MC4xNjQgMjMuOTktODIuNDc4IDU3LjYwOGgwbC0zLjQwMy4wMDFjLTQyLjYzNCAwLTc3LjE5NiAzNC41NjItNzcuMTk2IDc3LjE5NnMzNC41NjIgNzcuMTk2IDc3LjE5NiA3Ny4xOTZoMCAxNzEuNzYzYzQyLjYzNCAwIDc3LjE5Ni0zNC41NjIgNzcuMTk2LTc3LjE5NnMtMzQuNTYyLTc3LjE5Ni03Ny4xOTYtNzcuMTk2aDBsLTMuNDAzLS4wMDFDMjgyLjE2NCAxMjEuODM3IDI0OS44ODQgOTcuODQ2IDIxMiA5Ny44NDZ6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Console');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud console', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 150, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Console', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjQyNCIgaGVpZ2h0PSI0MjQiIHZpZXdCb3g9IjAgMCA0MjQgNDI0Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQgMHY0MjRIMFYwek0yMTIgOTcuODQ2Yy0zNy44ODQgMC03MC4xNjQgMjMuOTktODIuNDc4IDU3LjYwOGgwbC0zLjQwMy4wMDFjLTQyLjYzNCAwLTc3LjE5NiAzNC41NjItNzcuMTk2IDc3LjE5NnMzNC41NjIgNzcuMTk2IDc3LjE5NiA3Ny4xOTZoMCAxNzEuNzYzYzQyLjYzNCAwIDc3LjE5Ni0zNC41NjIgNzcuMTk2LTc3LjE5NnMtMzQuNTYyLTc3LjE5Ni03Ny4xOTYtNzcuMTk2aDBsLTMuNDAzLS4wMDFDMjgyLjE2NCAxMjEuODM3IDI0OS44ODQgOTcuODQ2IDIxMiA5Ny44NDZ6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Console');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud console', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 158, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Console', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjQyNCIgaGVpZ2h0PSI0MjQiIHZpZXdCb3g9IjAgMCA0MjQgNDI0Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQgMHY0MjRIMFYwek0yMTIgOTcuODQ2Yy0zNy44ODQgMC03MC4xNjQgMjMuOTktODIuNDc4IDU3LjYwOGgwbC0zLjQwMy4wMDFjLTQyLjYzNCAwLTc3LjE5NiAzNC41NjItNzcuMTk2IDc3LjE5NnMzNC41NjIgNzcuMTk2IDc3LjE5NiA3Ny4xOTZoMCAxNzEuNzYzYzQyLjYzNCAwIDc3LjE5Ni0zNC41NjIgNzcuMTk2LTc3LjE5NnMtMzQuNTYyLTc3LjE5Ni03Ny4xOTYtNzcuMTk2aDBsLTMuNDAzLS4wMDFDMjgyLjE2NCAxMjEuODM3IDI0OS44ODQgOTcuODQ2IDIxMiA5Ny44NDZ6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Console');
			})
		);

		fns.push(
			this.addEntry(dt + 'error reporting', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 130, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Error\nReporting', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0wIDE1bDUgNWg1bC0yLjUtMi44Nkg2LjI1bC0zLjM5LTMuMzl2LTcuNWwzLjM5LTMuMzlINy41TDEwIDBINUwwIDV6TTEzLjc1IDIuODZsMy4zOSAzLjM5djcuNWwtMy4zOSAzLjM5SDEwTDEyLjUgMjBIMTVsNS01VjVsLTUtNWgtMi41TDEwIDIuODZ6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTAgMTBMNy41IDcuNSAxMCA1SDcuNUw1IDcuNXY1TDcuNSAxNUgxMGwtMi41LTIuNXptMi41IDBMMTAgMTIuNWwyLjUgMi41IDIuNS0yLjV2LTVMMTIuNSA1IDEwIDcuNXoiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Error Reporting');
			})
		);

		fns.push(
			this.addEntry(dt + 'error reporting', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 160, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Error Reporting', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0wIDE1bDUgNWg1bC0yLjUtMi44Nkg2LjI1bC0zLjM5LTMuMzl2LTcuNWwzLjM5LTMuMzlINy41TDEwIDBINUwwIDV6TTEzLjc1IDIuODZsMy4zOSAzLjM5djcuNWwtMy4zOSAzLjM5SDEwTDEyLjUgMjBIMTVsNS01VjVsLTUtNWgtMi41TDEwIDIuODZ6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTAgMTBMNy41IDcuNSAxMCA1SDcuNUw1IDcuNXY1TDcuNSAxNUgxMGwtMi41LTIuNXptMi41IDBMMTAgMTIuNWwyLjUgMi41IDIuNS0yLjV2LTVMMTIuNSA1IDEwIDcuNXoiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Error Reporting');
			})
		);

		fns.push(
			this.addEntry(dt + 'error reporting', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 168, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Error Reporting', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0wIDE1bDUgNWg1bC0yLjUtMi44Nkg2LjI1bC0zLjM5LTMuMzl2LTcuNWwzLjM5LTMuMzlINy41TDEwIDBINUwwIDV6TTEzLjc1IDIuODZsMy4zOSAzLjM5djcuNWwtMy4zOSAzLjM5SDEwTDEyLjUgMjBIMTVsNS01VjVsLTUtNWgtMi41TDEwIDIuODZ6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTAgMTBMNy41IDcuNSAxMCA1SDcuNUw1IDcuNXY1TDcuNSAxNUgxMGwtMi41LTIuNXptMi41IDBMMTAgMTIuNWwyLjUgMi41IDIuNS0yLjV2LTVMMTIuNSA1IDEwIDcuNXoiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Error Reporting');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud shell', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 110, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Cloud\nShell', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjQyNCIgaGVpZ2h0PSI0MjQiIHZpZXdCb3g9IjAgMCA0MjQgNDI0Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQgMHY0MjRIMFYwek0yMTIgOTcuODQ2Yy0zNy44ODQgMC03MC4xNjQgMjMuOTktODIuNDc4IDU3LjYwOGgwbC0zLjQwMy4wMDFjLTQyLjYzNCAwLTc3LjE5NiAzNC41NjItNzcuMTk2IDc3LjE5NnMzNC41NjIgNzcuMTk2IDc3LjE5NiA3Ny4xOTZoMCAxNzEuNzYzYzQyLjYzNCAwIDc3LjE5Ni0zNC41NjIgNzcuMTk2LTc3LjE5NnMtMzQuNTYyLTc3LjE5Ni03Ny4xOTYtNzcuMTk2aDBsLTMuNDAzLS4wMDFDMjgyLjE2NCAxMjEuODM3IDI0OS44ODQgOTcuODQ2IDIxMiA5Ny44NDZ6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Shell');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud shell', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 140, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Shell', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjQyNCIgaGVpZ2h0PSI0MjQiIHZpZXdCb3g9IjAgMCA0MjQgNDI0Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQgMHY0MjRIMFYwek0yMTIgOTcuODQ2Yy0zNy44ODQgMC03MC4xNjQgMjMuOTktODIuNDc4IDU3LjYwOGgwbC0zLjQwMy4wMDFjLTQyLjYzNCAwLTc3LjE5NiAzNC41NjItNzcuMTk2IDc3LjE5NnMzNC41NjIgNzcuMTk2IDc3LjE5NiA3Ny4xOTZoMCAxNzEuNzYzYzQyLjYzNCAwIDc3LjE5Ni0zNC41NjIgNzcuMTk2LTc3LjE5NnMtMzQuNTYyLTc3LjE5Ni03Ny4xOTYtNzcuMTk2aDBsLTMuNDAzLS4wMDFDMjgyLjE2NCAxMjEuODM3IDI0OS44ODQgOTcuODQ2IDIxMiA5Ny44NDZ6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Shell');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud shell', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 148, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Shell', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjQyNCIgaGVpZ2h0PSI0MjQiIHZpZXdCb3g9IjAgMCA0MjQgNDI0Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQgMHY0MjRIMFYwek0yMTIgOTcuODQ2Yy0zNy44ODQgMC03MC4xNjQgMjMuOTktODIuNDc4IDU3LjYwOGgwbC0zLjQwMy4wMDFjLTQyLjYzNCAwLTc3LjE5NiAzNC41NjItNzcuMTk2IDc3LjE5NnMzNC41NjIgNzcuMTk2IDc3LjE5NiA3Ny4xOTZoMCAxNzEuNzYzYzQyLjYzNCAwIDc3LjE5Ni0zNC41NjIgNzcuMTk2LTc3LjE5NnMtMzQuNTYyLTc3LjE5Ni03Ny4xOTYtNzcuMTk2aDBsLTMuNDAzLS4wMDFDMjgyLjE2NCAxMjEuODM3IDI0OS44ODQgOTcuODQ2IDIxMiA5Ny44NDZ6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Shell');
			})
		);

		fns.push(
			this.addEntry(dt + 'trace', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 110, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Trace', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yMCA4SDEwdjRoMTB6bTAgOEgxMHY0aDEweiIgZmlsbD0iIzQyODVmNCIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xMCAxNkg2djRoNHpNMCAwaDZ2NEgwem0wIDhoMTB2NEgweiIgZmlsbD0iIzY2OWRmNiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Trace');
			})
		);

		fns.push(
			this.addEntry(dt + 'trace', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 110, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Trace', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yMCA4SDEwdjRoMTB6bTAgOEgxMHY0aDEweiIgZmlsbD0iIzQyODVmNCIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xMCAxNkg2djRoNHpNMCAwaDZ2NEgwem0wIDhoMTB2NEgweiIgZmlsbD0iIzY2OWRmNiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Trace');
			})
		);

		fns.push(
			this.addEntry(dt + 'trace', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 118, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Trace', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yMCA4SDEwdjRoMTB6bTAgOEgxMHY0aDEweiIgZmlsbD0iIzQyODVmNCIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xMCAxNkg2djRoNHpNMCAwaDZ2NEgwem0wIDhoMTB2NEgweiIgZmlsbD0iIzY2OWRmNiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Trace');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud mobile app', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 130, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Cloud\nMobile App', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjQyNCIgaGVpZ2h0PSI0MjQiIHZpZXdCb3g9IjAgMCA0MjQgNDI0Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQgMHY0MjRIMFYwek0yMTIgOTcuODQ2Yy0zNy44ODQgMC03MC4xNjQgMjMuOTktODIuNDc4IDU3LjYwOGgwbC0zLjQwMy4wMDFjLTQyLjYzNCAwLTc3LjE5NiAzNC41NjItNzcuMTk2IDc3LjE5NnMzNC41NjIgNzcuMTk2IDc3LjE5NiA3Ny4xOTZoMCAxNzEuNzYzYzQyLjYzNCAwIDc3LjE5Ni0zNC41NjIgNzcuMTk2LTc3LjE5NnMtMzQuNTYyLTc3LjE5Ni03Ny4xOTYtNzcuMTk2aDBsLTMuNDAzLS4wMDFDMjgyLjE2NCAxMjEuODM3IDI0OS44ODQgOTcuODQ2IDIxMiA5Ny44NDZ6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Mobile App');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud mobile app', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 170, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Mobile App', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjQyNCIgaGVpZ2h0PSI0MjQiIHZpZXdCb3g9IjAgMCA0MjQgNDI0Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQgMHY0MjRIMFYwek0yMTIgOTcuODQ2Yy0zNy44ODQgMC03MC4xNjQgMjMuOTktODIuNDc4IDU3LjYwOGgwbC0zLjQwMy4wMDFjLTQyLjYzNCAwLTc3LjE5NiAzNC41NjItNzcuMTk2IDc3LjE5NnMzNC41NjIgNzcuMTk2IDc3LjE5NiA3Ny4xOTZoMCAxNzEuNzYzYzQyLjYzNCAwIDc3LjE5Ni0zNC41NjIgNzcuMTk2LTc3LjE5NnMtMzQuNTYyLTc3LjE5Ni03Ny4xOTYtNzcuMTk2aDBsLTMuNDAzLS4wMDFDMjgyLjE2NCAxMjEuODM3IDI0OS44ODQgOTcuODQ2IDIxMiA5Ny44NDZ6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Mobile App');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud mobile app', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 178, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Mobile App', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjQyNCIgaGVpZ2h0PSI0MjQiIHZpZXdCb3g9IjAgMCA0MjQgNDI0Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQgMHY0MjRIMFYwek0yMTIgOTcuODQ2Yy0zNy44ODQgMC03MC4xNjQgMjMuOTktODIuNDc4IDU3LjYwOGgwbC0zLjQwMy4wMDFjLTQyLjYzNCAwLTc3LjE5NiAzNC41NjItNzcuMTk2IDc3LjE5NnMzNC41NjIgNzcuMTk2IDc3LjE5NiA3Ny4xOTZoMCAxNzEuNzYzYzQyLjYzNCAwIDc3LjE5Ni0zNC41NjIgNzcuMTk2LTc3LjE5NnMtMzQuNTYyLTc3LjE5Ni03Ny4xOTYtNzcuMTk2aDBsLTMuNDAzLS4wMDFDMjgyLjE2NCAxMjEuODM3IDI0OS44ODQgOTcuODQ2IDIxMiA5Ny44NDZ6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Mobile App');
			})
		);

		fns.push(
			this.addEntry(dt + 'profiler', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 130, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Profiler', 
			    		new mxGeometry(0, 0, 26, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjMxNC44ODMzMTI4NTM1OTA3IiBoZWlnaHQ9IjM3Ny4zNTIwNjc2NDgzMTU0IiB2aWV3Qm94PSItMC41MDE5OTg5MDEzNjcxODc1IDAuMDEzMDAwMDAwMjY4MjIwOTAxIDgzLjMxMjk5NTkxMDY0NDUzIDk5Ljg0MTAwMzQxNzk2ODc1Ij4mI3hhOzxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiNhZWNiZmE7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOzwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTM5LjQ5OSAzOS42NzJ2MjAuMDI5TDIyLjk3MyA3MS42N2EyMC4yNCAyMC4yNCAwIDAgMCAzMC43ODIgMi41NTQgMjAuMjQgMjAuMjQgMCAwIDAgNS45MjgtMTQuMzEyYzAtMTEuMTU3LTkuMDI4LTIwLjIwOS0yMC4xODUtMjAuMjR6bS0xLjMwNC4wMzlsLS4wNDkuMDAzLjA0OS0uMDAzem0tLjk2LjA4OWEyMC4yNCAyMC4yNCAwIDAgMC0xNy41MyAxNS42NzNjMS45MzgtOC4zMDYgOS4xNjMtMTQuNjg0IDE3LjUzLTE1LjY3M3pNMTkuNjEyIDU1Ljg5MmwtLjA3Mi4zNTcuMDcyLS4zNTd6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTM5LjQ5OSA1OS43MDFMMjIuOTY2IDcxLjY3NmEyMC4xNSAyMC4xNSAwIDAgMS0zLjc3Mi0xMS43N2MwLTExLjE3OSA5LjUzOC0yMC4yNDEgMjAuMzA0LTIwLjI0MXptMzUuNTE1LTQ0LjY2NUw2Mi42MzIgMjcuNDc2Yy02LjU0OC00LjY5OS0xNC41NjQtNy40NzItMjMuMjA4LTcuNDcyLTIxLjk5MSAwLTM5LjkyNiAxNy45MzUtMzkuOTI2IDM5LjkyNnMxNy45MzUgMzkuOTI0IDM5LjkyNiAzOS45MjRTNzkuMzQ4IDgxLjkyIDc5LjM0OCA1OS45MjljMC05LjM5NC0zLjI3NC0xOC4wNDYtOC43MzctMjQuODc4bDEyLjItMTIuMjU0em0tMzUuNTkgMTQuOTY3YTI5Ljg1IDI5Ljg1IDAgMCAxIDI5LjkyNCAyOS45MjYgMjkuODUgMjkuODUgMCAwIDEtMjkuOTI0IDI5LjkyNEEyOS44NSAyOS44NSAwIDAgMSA5LjQ5OCA1OS45MjljMC0xNi41ODYgMTMuMzM5LTI5LjkyNiAyOS45MjYtMjkuOTI2ek02MC4xODUuMDEzTDE5LjU3Mi4wOGwuMDE2IDkuNSA0MC42MTMtLjA2NnoiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(17, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Profiler');
			})
		);

		fns.push(
			this.addEntry(dt + 'profiler', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 170, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Profiler', 
			    		new mxGeometry(0, 0, 26, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjMxNC44ODMzMTI4NTM1OTA3IiBoZWlnaHQ9IjM3Ny4zNTIwNjc2NDgzMTU0IiB2aWV3Qm94PSItMC41MDE5OTg5MDEzNjcxODc1IDAuMDEzMDAwMDAwMjY4MjIwOTAxIDgzLjMxMjk5NTkxMDY0NDUzIDk5Ljg0MTAwMzQxNzk2ODc1Ij4mI3hhOzxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiNhZWNiZmE7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOzwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTM5LjQ5OSAzOS42NzJ2MjAuMDI5TDIyLjk3MyA3MS42N2EyMC4yNCAyMC4yNCAwIDAgMCAzMC43ODIgMi41NTQgMjAuMjQgMjAuMjQgMCAwIDAgNS45MjgtMTQuMzEyYzAtMTEuMTU3LTkuMDI4LTIwLjIwOS0yMC4xODUtMjAuMjR6bS0xLjMwNC4wMzlsLS4wNDkuMDAzLjA0OS0uMDAzem0tLjk2LjA4OWEyMC4yNCAyMC4yNCAwIDAgMC0xNy41MyAxNS42NzNjMS45MzgtOC4zMDYgOS4xNjMtMTQuNjg0IDE3LjUzLTE1LjY3M3pNMTkuNjEyIDU1Ljg5MmwtLjA3Mi4zNTcuMDcyLS4zNTd6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTM5LjQ5OSA1OS43MDFMMjIuOTY2IDcxLjY3NmEyMC4xNSAyMC4xNSAwIDAgMS0zLjc3Mi0xMS43N2MwLTExLjE3OSA5LjUzOC0yMC4yNDEgMjAuMzA0LTIwLjI0MXptMzUuNTE1LTQ0LjY2NUw2Mi42MzIgMjcuNDc2Yy02LjU0OC00LjY5OS0xNC41NjQtNy40NzItMjMuMjA4LTcuNDcyLTIxLjk5MSAwLTM5LjkyNiAxNy45MzUtMzkuOTI2IDM5LjkyNnMxNy45MzUgMzkuOTI0IDM5LjkyNiAzOS45MjRTNzkuMzQ4IDgxLjkyIDc5LjM0OCA1OS45MjljMC05LjM5NC0zLjI3NC0xOC4wNDYtOC43MzctMjQuODc4bDEyLjItMTIuMjU0em0tMzUuNTkgMTQuOTY3YTI5Ljg1IDI5Ljg1IDAgMCAxIDI5LjkyNCAyOS45MjYgMjkuODUgMjkuODUgMCAwIDEtMjkuOTI0IDI5LjkyNEEyOS44NSAyOS44NSAwIDAgMSA5LjQ5OCA1OS45MjljMC0xNi41ODYgMTMuMzM5LTI5LjkyNiAyOS45MjYtMjkuOTI2ek02MC4xODUuMDEzTDE5LjU3Mi4wOGwuMDE2IDkuNSA0MC42MTMtLjA2NnoiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(17, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Profiler');
			})
		);

		fns.push(
			this.addEntry(dt + 'profiler', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 178, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Profiler', 
			    		new mxGeometry(0, 0, 26, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjMxNC44ODMzMTI4NTM1OTA3IiBoZWlnaHQ9IjM3Ny4zNTIwNjc2NDgzMTU0IiB2aWV3Qm94PSItMC41MDE5OTg5MDEzNjcxODc1IDAuMDEzMDAwMDAwMjY4MjIwOTAxIDgzLjMxMjk5NTkxMDY0NDUzIDk5Ljg0MTAwMzQxNzk2ODc1Ij4mI3hhOzxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiNhZWNiZmE7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOzwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTM5LjQ5OSAzOS42NzJ2MjAuMDI5TDIyLjk3MyA3MS42N2EyMC4yNCAyMC4yNCAwIDAgMCAzMC43ODIgMi41NTQgMjAuMjQgMjAuMjQgMCAwIDAgNS45MjgtMTQuMzEyYzAtMTEuMTU3LTkuMDI4LTIwLjIwOS0yMC4xODUtMjAuMjR6bS0xLjMwNC4wMzlsLS4wNDkuMDAzLjA0OS0uMDAzem0tLjk2LjA4OWEyMC4yNCAyMC4yNCAwIDAgMC0xNy41MyAxNS42NzNjMS45MzgtOC4zMDYgOS4xNjMtMTQuNjg0IDE3LjUzLTE1LjY3M3pNMTkuNjEyIDU1Ljg5MmwtLjA3Mi4zNTcuMDcyLS4zNTd6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTM5LjQ5OSA1OS43MDFMMjIuOTY2IDcxLjY3NmEyMC4xNSAyMC4xNSAwIDAgMS0zLjc3Mi0xMS43N2MwLTExLjE3OSA5LjUzOC0yMC4yNDEgMjAuMzA0LTIwLjI0MXptMzUuNTE1LTQ0LjY2NUw2Mi42MzIgMjcuNDc2Yy02LjU0OC00LjY5OS0xNC41NjQtNy40NzItMjMuMjA4LTcuNDcyLTIxLjk5MSAwLTM5LjkyNiAxNy45MzUtMzkuOTI2IDM5LjkyNnMxNy45MzUgMzkuOTI0IDM5LjkyNiAzOS45MjRTNzkuMzQ4IDgxLjkyIDc5LjM0OCA1OS45MjljMC05LjM5NC0zLjI3NC0xOC4wNDYtOC43MzctMjQuODc4bDEyLjItMTIuMjU0em0tMzUuNTkgMTQuOTY3YTI5Ljg1IDI5Ljg1IDAgMCAxIDI5LjkyNCAyOS45MjYgMjkuODUgMjkuODUgMCAwIDEtMjkuOTI0IDI5LjkyNEEyOS44NSAyOS44NSAwIDAgMSA5LjQ5OCA1OS45MjljMC0xNi41ODYgMTMuMzM5LTI5LjkyNiAyOS45MjYtMjkuOTI2ek02MC4xODUuMDEzTDE5LjU3Mi4wOGwuMDE2IDkuNSA0MC42MTMtLjA2NnoiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(17, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Profiler');
			})
		);

		fns.push(
			this.addEntry(dt + 'billing api application programming interface', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 110, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Billing\nAPI', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjQyNCIgaGVpZ2h0PSI0MjQiIHZpZXdCb3g9IjAgMCA0MjQgNDI0Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQgMHY0MjRIMFYwek0yMTIgOTcuODQ2Yy0zNy44ODQgMC03MC4xNjQgMjMuOTktODIuNDc4IDU3LjYwOGgwbC0zLjQwMy4wMDFjLTQyLjYzNCAwLTc3LjE5NiAzNC41NjItNzcuMTk2IDc3LjE5NnMzNC41NjIgNzcuMTk2IDc3LjE5NiA3Ny4xOTZoMCAxNzEuNzYzYzQyLjYzNCAwIDc3LjE5Ni0zNC41NjIgNzcuMTk2LTc3LjE5NnMtMzQuNTYyLTc3LjE5Ni03Ny4xOTYtNzcuMTk2aDBsLTMuNDAzLS4wMDFDMjgyLjE2NCAxMjEuODM3IDI0OS44ODQgOTcuODQ2IDIxMiA5Ny44NDZ6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Billing API');
			})
		);

		fns.push(
			this.addEntry(dt + 'billing api application programming interface', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 130, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Billing API', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjQyNCIgaGVpZ2h0PSI0MjQiIHZpZXdCb3g9IjAgMCA0MjQgNDI0Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQgMHY0MjRIMFYwek0yMTIgOTcuODQ2Yy0zNy44ODQgMC03MC4xNjQgMjMuOTktODIuNDc4IDU3LjYwOGgwbC0zLjQwMy4wMDFjLTQyLjYzNCAwLTc3LjE5NiAzNC41NjItNzcuMTk2IDc3LjE5NnMzNC41NjIgNzcuMTk2IDc3LjE5NiA3Ny4xOTZoMCAxNzEuNzYzYzQyLjYzNCAwIDc3LjE5Ni0zNC41NjIgNzcuMTk2LTc3LjE5NnMtMzQuNTYyLTc3LjE5Ni03Ny4xOTYtNzcuMTk2aDBsLTMuNDAzLS4wMDFDMjgyLjE2NCAxMjEuODM3IDI0OS44ODQgOTcuODQ2IDIxMiA5Ny44NDZ6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Billing API');
			})
		);

		fns.push(
			this.addEntry(dt + 'billing api application programming interface', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 138, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Billing API', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjQyNCIgaGVpZ2h0PSI0MjQiIHZpZXdCb3g9IjAgMCA0MjQgNDI0Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQgMHY0MjRIMFYwek0yMTIgOTcuODQ2Yy0zNy44ODQgMC03MC4xNjQgMjMuOTktODIuNDc4IDU3LjYwOGgwbC0zLjQwMy4wMDFjLTQyLjYzNCAwLTc3LjE5NiAzNC41NjItNzcuMTk2IDc3LjE5NnMzNC41NjIgNzcuMTk2IDc3LjE5NiA3Ny4xOTZoMCAxNzEuNzYzYzQyLjYzNCAwIDc3LjE5Ni0zNC41NjIgNzcuMTk2LTc3LjE5NnMtMzQuNTYyLTc3LjE5Ni03Ny4xOTYtNzcuMTk2aDBsLTMuNDAzLS4wMDFDMjgyLjE2NCAxMjEuODM3IDI0OS44ODQgOTcuODQ2IDIxMiA5Ny44NDZ6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Billing API');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud api apis application programming interface', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 110, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Cloud\nAPI', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTQuNDkgMTBMMTAgMTQuNDkgNS41MSAxMCAxMCA1LjUxek0xMCAxMi45MUwxMi45MSAxMCAxMCA3LjA5IDcuMDkgMTB6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTIwIDEwaC0yLjY1bC0zLjAyIDMuMDJoMi42NXoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMjAgMTBsLTMuMDItMy4wMmgtMi42NUwxNy4zNSAxMHpNMCAxMGgyLjY1bDMuMDItMy4wMkgzLjAyeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik01LjY3IDEzLjAyTDIuNjUgMTBIMGwzLjAyIDMuMDJ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTEwIDIuNjVWMEw2Ljk4IDMuMDJ2Mi42NXoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTMuMDIgNS42N1YzLjAyTDEwIDB2Mi42NXoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMTAgMjB2LTIuNjVsLTMuMDItMy4wMnYyLjY1eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xMy4wMiAxNi45OHYtMi42NUwxMCAxNy4zNVYyMHoiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud API');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud api apis application programming interface', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 130, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud API', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTQuNDkgMTBMMTAgMTQuNDkgNS41MSAxMCAxMCA1LjUxek0xMCAxMi45MUwxMi45MSAxMCAxMCA3LjA5IDcuMDkgMTB6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTIwIDEwaC0yLjY1bC0zLjAyIDMuMDJoMi42NXoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMjAgMTBsLTMuMDItMy4wMmgtMi42NUwxNy4zNSAxMHpNMCAxMGgyLjY1bDMuMDItMy4wMkgzLjAyeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik01LjY3IDEzLjAyTDIuNjUgMTBIMGwzLjAyIDMuMDJ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTEwIDIuNjVWMEw2Ljk4IDMuMDJ2Mi42NXoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTMuMDIgNS42N1YzLjAyTDEwIDB2Mi42NXoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMTAgMjB2LTIuNjVsLTMuMDItMy4wMnYyLjY1eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xMy4wMiAxNi45OHYtMi42NUwxMCAxNy4zNVYyMHoiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud API');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud api apis application programming interface', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 138, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud API', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTQuNDkgMTBMMTAgMTQuNDkgNS41MSAxMCAxMCA1LjUxek0xMCAxMi45MUwxMi45MSAxMCAxMCA3LjA5IDcuMDkgMTB6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTIwIDEwaC0yLjY1bC0zLjAyIDMuMDJoMi42NXoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMjAgMTBsLTMuMDItMy4wMmgtMi42NUwxNy4zNSAxMHpNMCAxMGgyLjY1bDMuMDItMy4wMkgzLjAyeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik01LjY3IDEzLjAyTDIuNjUgMTBIMGwzLjAyIDMuMDJ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTEwIDIuNjVWMEw2Ljk4IDMuMDJ2Mi42NXoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTMuMDIgNS42N1YzLjAyTDEwIDB2Mi42NXoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMTAgMjB2LTIuNjVsLTMuMDItMy4wMnYyLjY1eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xMy4wMiAxNi45OHYtMi42NUwxMCAxNy4zNVYyMHoiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud API');
			})
		);

		this.addPalette('gcp2Management Tools', 'GCP / Management Tools', false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addGCP2NetworkingPalette = function()
	{
		var dt = 'gcp google cloud platform networking ';
		var fns = [];
		
		fns.push(
			this.addEntry(dt + 'virtual private cloud', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 150, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Virtual\nPrivate Cloud', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMTQgMGg2djZoLTZ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTE3IDBoM3Y2aC0zeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xNCAxNGg2djZoLTZ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTE3IDE0aDN2NmgtM3oiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMCAwaDZ2NkgweiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0zIDBoM3Y2SDN6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTAgMTRoNnY2SDB6Ii8+JiN4YTsJPGcgY2xhc3M9InN0MSI+JiN4YTsJCTxwYXRoIGQ9Ik0zIDE0aDN2Nkgzek02IDJoOHYySDZ6Ii8+JiN4YTsJCTxwYXRoIGQ9Ik02IDE2aDh2Mkg2ek0xNiA2aDJ2OGgtMnpNMiA2aDJ2OEgyeiIvPiYjeGE7CTwvZz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMiA2aDJ2Mkgyem0xNCAwaDJ2MmgtMnpNNiAyaDJ2Mkg2em0wIDE0aDJ2Mkg2eiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Virtual Private Cloud');
			})
		);

		fns.push(
			this.addEntry(dt + 'virtual private cloud', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 180, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Virtual Private Cloud', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMTQgMGg2djZoLTZ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTE3IDBoM3Y2aC0zeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xNCAxNGg2djZoLTZ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTE3IDE0aDN2NmgtM3oiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMCAwaDZ2NkgweiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0zIDBoM3Y2SDN6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTAgMTRoNnY2SDB6Ii8+JiN4YTsJPGcgY2xhc3M9InN0MSI+JiN4YTsJCTxwYXRoIGQ9Ik0zIDE0aDN2Nkgzek02IDJoOHYySDZ6Ii8+JiN4YTsJCTxwYXRoIGQ9Ik02IDE2aDh2Mkg2ek0xNiA2aDJ2OGgtMnpNMiA2aDJ2OEgyeiIvPiYjeGE7CTwvZz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMiA2aDJ2Mkgyem0xNCAwaDJ2MmgtMnpNNiAyaDJ2Mkg2em0wIDE0aDJ2Mkg2eiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Virtual Private Cloud');
			})
		);

		fns.push(
			this.addEntry(dt + 'virtual private cloud', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 188, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Virtual Private Cloud', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMTQgMGg2djZoLTZ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTE3IDBoM3Y2aC0zeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xNCAxNGg2djZoLTZ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTE3IDE0aDN2NmgtM3oiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMCAwaDZ2NkgweiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0zIDBoM3Y2SDN6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTAgMTRoNnY2SDB6Ii8+JiN4YTsJPGcgY2xhc3M9InN0MSI+JiN4YTsJCTxwYXRoIGQ9Ik0zIDE0aDN2Nkgzek02IDJoOHYySDZ6Ii8+JiN4YTsJCTxwYXRoIGQ9Ik02IDE2aDh2Mkg2ek0xNiA2aDJ2OGgtMnpNMiA2aDJ2OEgyeiIvPiYjeGE7CTwvZz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMiA2aDJ2Mkgyem0xNCAwaDJ2MmgtMnpNNiAyaDJ2Mkg2em0wIDE0aDJ2Mkg2eiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Virtual Private Cloud');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud interconnect', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 140, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Cloud\nInterconnect', 
			    		new mxGeometry(0, 0, 30, 27), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE4IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHZpZXdCb3g9IjAgMCAyMCAxOCI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJLnN0MXtmaWxsOiM2NjlkZjY7fSYjeGE7CS5zdDJ7ZmlsbDojYWVjYmZhO30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00IDhIMHYyaDR6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTMgNGgxMHYxMEgzeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yMCA4aC00LjY3djJIMjB6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTE1IDJ2MTRINnYyaDExdi0yVjIgMEg2djJ6TTggNGg1djEwSDh6Ii8+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 16);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Interconnect');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud interconnect', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 180, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Interconnect', 
			    		new mxGeometry(0, 0, 30, 27), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE4IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHZpZXdCb3g9IjAgMCAyMCAxOCI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJLnN0MXtmaWxsOiM2NjlkZjY7fSYjeGE7CS5zdDJ7ZmlsbDojYWVjYmZhO30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00IDhIMHYyaDR6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTMgNGgxMHYxMEgzeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yMCA4aC00LjY3djJIMjB6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTE1IDJ2MTRINnYyaDExdi0yVjIgMEg2djJ6TTggNGg1djEwSDh6Ii8+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 16);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Interconnect');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud interconnect', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 188, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Interconnect', 
			    		new mxGeometry(0, 0, 30, 27), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE4IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHZpZXdCb3g9IjAgMCAyMCAxOCI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJLnN0MXtmaWxsOiM2NjlkZjY7fSYjeGE7CS5zdDJ7ZmlsbDojYWVjYmZhO30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00IDhIMHYyaDR6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTMgNGgxMHYxMEgzeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yMCA4aC00LjY3djJIMjB6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTE1IDJ2MTRINnYyaDExdi0yVjIgMEg2djJ6TTggNGg1djEwSDh6Ii8+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 16);
			    icon1.vertex = true;	
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Interconnect');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud load balancing', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 140, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Cloud Load\nBalancing', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTYgMTBoMnY0aC0yem0tNyAwaDJ2NEg5em0tNyAwaDJ2NEgyeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik05IDVoMnY0SDl6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTIgOWgxNnYySDJ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTQgMGgxMnY1SDR6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTEwIDBoNnY1aC02eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xNCAxNGg2djZoLTZ6TTAgMTRoNnY2SDB6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTMgMTRoM3Y2SDN6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTcgMTRoNnY2SDd6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTEwIDE0aDN2NmgtM3ptNyAwaDN2NmgtM3oiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Load Balancing');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud load balancing', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 190, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Load Balancing', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTYgMTBoMnY0aC0yem0tNyAwaDJ2NEg5em0tNyAwaDJ2NEgyeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik05IDVoMnY0SDl6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTIgOWgxNnYySDJ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTQgMGgxMnY1SDR6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTEwIDBoNnY1aC02eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xNCAxNGg2djZoLTZ6TTAgMTRoNnY2SDB6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTMgMTRoM3Y2SDN6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTcgMTRoNnY2SDd6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTEwIDE0aDN2NmgtM3ptNyAwaDN2NmgtM3oiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Load Balancing');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud load balancing', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 198, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Load Balancing', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTYgMTBoMnY0aC0yem0tNyAwaDJ2NEg5em0tNyAwaDJ2NEgyeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik05IDVoMnY0SDl6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTIgOWgxNnYySDJ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTQgMGgxMnY1SDR6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTEwIDBoNnY1aC02eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xNCAxNGg2djZoLTZ6TTAgMTRoNnY2SDB6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTMgMTRoM3Y2SDN6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTcgMTRoNnY2SDd6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTEwIDE0aDN2NmgtM3ptNyAwaDN2NmgtM3oiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;	
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Load Balancing');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud dns domain name server', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 110, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Cloud\nDNS', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJLnN0M3tmaWxsOiNmZmY7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTkgNmgydjEwSDl6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTIwIDE3SDB2MmgyMHoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMTIgMTZIOHY0aDR6TTAgMGgyMHY2SDB6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTEwIDBoMTB2NkgxMHoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QzIiBkPSJNMiAyaDJ2MkgyeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0wIDhoMjB2NkgweiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xMCA4aDEwdjZIMTB6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MyIgZD0iTTIgMTBoMnYySDJ6Ii8+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud DNS');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud dns domain name server', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 130, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud DNS', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJLnN0M3tmaWxsOiNmZmY7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTkgNmgydjEwSDl6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTIwIDE3SDB2MmgyMHoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMTIgMTZIOHY0aDR6TTAgMGgyMHY2SDB6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTEwIDBoMTB2NkgxMHoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QzIiBkPSJNMiAyaDJ2MkgyeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0wIDhoMjB2NkgweiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xMCA4aDEwdjZIMTB6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MyIgZD0iTTIgMTBoMnYySDJ6Ii8+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud DNS');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud dns domain name server', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 138, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud DNS', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJLnN0M3tmaWxsOiNmZmY7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTkgNmgydjEwSDl6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTIwIDE3SDB2MmgyMHoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMTIgMTZIOHY0aDR6TTAgMGgyMHY2SDB6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTEwIDBoMTB2NkgxMHoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QzIiBkPSJNMiAyaDJ2MkgyeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0wIDhoMjB2NkgweiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xMCA4aDEwdjZIMTB6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MyIgZD0iTTIgMTBoMnYySDJ6Ii8+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;	
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud DNS');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud cdn', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 110, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Cloud\nCDN', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTMuMTMgNS42M1YzLjIxTDEwIDB2Mi40MXptMy43NSA3LjVMMjAgMTBoLTIuNWwtMy4xMiAzLjEzem0tMTMuNzUgMEwwIDEwaDIuNWwzLjEzIDMuMTN6bTEwIDEuMjV2Mi40MUwxMCAyMHYtMi40MXoiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik02Ljg4IDUuNjNMMTAgMi40MVYwTDYuODggMy4yMXpNMTcuNSAxMEgyMGwtMy4xMi0zLjEyaC0yLjV6bS0xNSAwSDBsMy4xMy0zLjEyaDIuNXptNC4zOCA0LjM4TDEwIDE3LjU5VjIwbC0zLjEyLTMuMjF6bTAtNy41aDYuMjV2Ni4yNUg2Ljg4eiIgZmlsbC1ydWxlPSJldmVub2RkIi8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTYuODggMTMuMTNsNi4yNS02LjI1djYuMjV6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTAgMTBsMy4xMy0zLjEydjYuMjV6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud CDN');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud cdn', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 140, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud CDN', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTMuMTMgNS42M1YzLjIxTDEwIDB2Mi40MXptMy43NSA3LjVMMjAgMTBoLTIuNWwtMy4xMiAzLjEzem0tMTMuNzUgMEwwIDEwaDIuNWwzLjEzIDMuMTN6bTEwIDEuMjV2Mi40MUwxMCAyMHYtMi40MXoiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik02Ljg4IDUuNjNMMTAgMi40MVYwTDYuODggMy4yMXpNMTcuNSAxMEgyMGwtMy4xMi0zLjEyaC0yLjV6bS0xNSAwSDBsMy4xMy0zLjEyaDIuNXptNC4zOCA0LjM4TDEwIDE3LjU5VjIwbC0zLjEyLTMuMjF6bTAtNy41aDYuMjV2Ni4yNUg2Ljg4eiIgZmlsbC1ydWxlPSJldmVub2RkIi8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTYuODggMTMuMTNsNi4yNS02LjI1djYuMjV6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTAgMTBsMy4xMy0zLjEydjYuMjV6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud CDN');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud cdn', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 148, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud CDN', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTMuMTMgNS42M1YzLjIxTDEwIDB2Mi40MXptMy43NSA3LjVMMjAgMTBoLTIuNWwtMy4xMiAzLjEzem0tMTMuNzUgMEwwIDEwaDIuNWwzLjEzIDMuMTN6bTEwIDEuMjV2Mi40MUwxMCAyMHYtMi40MXoiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik02Ljg4IDUuNjNMMTAgMi40MVYwTDYuODggMy4yMXpNMTcuNSAxMEgyMGwtMy4xMi0zLjEyaC0yLjV6bS0xNSAwSDBsMy4xMy0zLjEyaDIuNXptNC4zOCA0LjM4TDEwIDE3LjU5VjIwbC0zLjEyLTMuMjF6bTAtNy41aDYuMjV2Ni4yNUg2Ljg4eiIgZmlsbC1ydWxlPSJldmVub2RkIi8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTYuODggMTMuMTNsNi4yNS02LjI1djYuMjV6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTAgMTBsMy4xMy0zLjEydjYuMjV6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;	
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud CDN');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud network', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 120, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Cloud\nNetwork', 
			    		new mxGeometry(0, 0, 30, 28), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTMuMTMgNS42M1YzLjIxTDEwIDB2Mi40MXptMy43NSA3LjVMMjAgMTBoLTIuNWwtMy4xMiAzLjEzem0tMTMuNzUgMEwwIDEwaDIuNWwzLjEzIDMuMTN6bTEwIDEuMjV2Mi40MUwxMCAyMHYtMi40MXoiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik02Ljg4IDUuNjNMMTAgMi40MVYwTDYuODggMy4yMXpNMTcuNSAxMEgyMGwtMy4xMi0zLjEyaC0yLjV6bS0xNSAwSDBsMy4xMy0zLjEyaDIuNXptNC4zOCA0LjM4TDEwIDE3LjU5VjIwbC0zLjEyLTMuMjF6bTAtNy41aDYuMjV2Ni4yNUg2Ljg4eiIgZmlsbC1ydWxlPSJldmVub2RkIi8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTYuODggMTMuMTNsNi4yNS02LjI1djYuMjV6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTAgMTBsMy4xMy0zLjEydjYuMjV6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 16);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Network');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud network', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 150, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Network', 
			    		new mxGeometry(0, 0, 30, 28), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTMuMTMgNS42M1YzLjIxTDEwIDB2Mi40MXptMy43NSA3LjVMMjAgMTBoLTIuNWwtMy4xMiAzLjEzem0tMTMuNzUgMEwwIDEwaDIuNWwzLjEzIDMuMTN6bTEwIDEuMjV2Mi40MUwxMCAyMHYtMi40MXoiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik02Ljg4IDUuNjNMMTAgMi40MVYwTDYuODggMy4yMXpNMTcuNSAxMEgyMGwtMy4xMi0zLjEyaC0yLjV6bS0xNSAwSDBsMy4xMy0zLjEyaDIuNXptNC4zOCA0LjM4TDEwIDE3LjU5VjIwbC0zLjEyLTMuMjF6bTAtNy41aDYuMjV2Ni4yNUg2Ljg4eiIgZmlsbC1ydWxlPSJldmVub2RkIi8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTYuODggMTMuMTNsNi4yNS02LjI1djYuMjV6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTAgMTBsMy4xMy0zLjEydjYuMjV6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 16);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Network');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud network', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 158, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Network', 
			    		new mxGeometry(0, 0, 30, 28), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTMuMTMgNS42M1YzLjIxTDEwIDB2Mi40MXptMy43NSA3LjVMMjAgMTBoLTIuNWwtMy4xMiAzLjEzem0tMTMuNzUgMEwwIDEwaDIuNWwzLjEzIDMuMTN6bTEwIDEuMjV2Mi40MUwxMCAyMHYtMi40MXoiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik02Ljg4IDUuNjNMMTAgMi40MVYwTDYuODggMy4yMXpNMTcuNSAxMEgyMGwtMy4xMi0zLjEyaC0yLjV6bS0xNSAwSDBsMy4xMy0zLjEyaDIuNXptNC4zOCA0LjM4TDEwIDE3LjU5VjIwbC0zLjEyLTMuMjF6bTAtNy41aDYuMjV2Ni4yNUg2Ljg4eiIgZmlsbC1ydWxlPSJldmVub2RkIi8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTYuODggMTMuMTNsNi4yNS02LjI1djYuMjV6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTAgMTBsMy4xMy0zLjEydjYuMjV6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 16);
			    icon1.vertex = true;	
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Network');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud external ip address internal protocol', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 150, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Cloud External\nIP Addresses', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE5Ljk5OTk5ODA5MjY1MTM2NyIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAtMi44NDIxNzA1NjE4NzU1NzQ1ZS0xNSAxOS45OTk5OTgwOTI2NTEzNjcgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xNS40OSAxMC40djYuN2EuNC40IDAgMCAxLS40LjRIMi45YS40LjQgMCAwIDEtLjQtLjRWNC45YS40LjQgMCAwIDEgLjQtLjRoNi43YS40LjQgMCAwIDAgLjQtLjRWMi40YS40LjQgMCAwIDAtLjQtLjRILjRhLjQuNCAwIDAgMC0uNC40djE3LjJhLjQuNCAwIDAgMCAuNC40aDE3LjJhLjQuNCAwIDAgMCAuNC0uNHYtOS4yYS40LjQgMCAwIDAtLjQtLjRoLTEuNzFhLjQuNCAwIDAgMC0uNC40eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMiAuNHY3LjJhLjQuNCAwIDAgMCAuNC40aDcuMmEuNC40IDAgMCAwIC40LS40Vi40YS40LjQgMCAwIDAtLjQtLjRoLTcuMmEuNC40IDAgMCAwLS40LjR6bTUuNiA0LjFoLTEuNzFhLjQuNCAwIDAgMS0uNC0uNFYyLjRhLjQuNCAwIDAgMSAuNC0uNGgxLjcxYS40LjQgMCAwIDEgLjQuNHYxLjdhLjQuNCAwIDAgMS0uNC40eiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud External IP Address');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud external ip address internet protocol', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 220, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud External IP Address', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE5Ljk5OTk5ODA5MjY1MTM2NyIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAtMi44NDIxNzA1NjE4NzU1NzQ1ZS0xNSAxOS45OTk5OTgwOTI2NTEzNjcgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xNS40OSAxMC40djYuN2EuNC40IDAgMCAxLS40LjRIMi45YS40LjQgMCAwIDEtLjQtLjRWNC45YS40LjQgMCAwIDEgLjQtLjRoNi43YS40LjQgMCAwIDAgLjQtLjRWMi40YS40LjQgMCAwIDAtLjQtLjRILjRhLjQuNCAwIDAgMC0uNC40djE3LjJhLjQuNCAwIDAgMCAuNC40aDE3LjJhLjQuNCAwIDAgMCAuNC0uNHYtOS4yYS40LjQgMCAwIDAtLjQtLjRoLTEuNzFhLjQuNCAwIDAgMC0uNC40eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMiAuNHY3LjJhLjQuNCAwIDAgMCAuNC40aDcuMmEuNC40IDAgMCAwIC40LS40Vi40YS40LjQgMCAwIDAtLjQtLjRoLTcuMmEuNC40IDAgMCAwLS40LjR6bTUuNiA0LjFoLTEuNzFhLjQuNCAwIDAgMS0uNC0uNFYyLjRhLjQuNCAwIDAgMSAuNC0uNGgxLjcxYS40LjQgMCAwIDEgLjQuNHYxLjdhLjQuNCAwIDAgMS0uNC40eiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud External IP Address');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud external ip address internet protocol', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 228, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud External IP Address', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE5Ljk5OTk5ODA5MjY1MTM2NyIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAtMi44NDIxNzA1NjE4NzU1NzQ1ZS0xNSAxOS45OTk5OTgwOTI2NTEzNjcgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xNS40OSAxMC40djYuN2EuNC40IDAgMCAxLS40LjRIMi45YS40LjQgMCAwIDEtLjQtLjRWNC45YS40LjQgMCAwIDEgLjQtLjRoNi43YS40LjQgMCAwIDAgLjQtLjRWMi40YS40LjQgMCAwIDAtLjQtLjRILjRhLjQuNCAwIDAgMC0uNC40djE3LjJhLjQuNCAwIDAgMCAuNC40aDE3LjJhLjQuNCAwIDAgMCAuNC0uNHYtOS4yYS40LjQgMCAwIDAtLjQtLjRoLTEuNzFhLjQuNCAwIDAgMC0uNC40eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMiAuNHY3LjJhLjQuNCAwIDAgMCAuNC40aDcuMmEuNC40IDAgMCAwIC40LS40Vi40YS40LjQgMCAwIDAtLjQtLjRoLTcuMmEuNC40IDAgMCAwLS40LjR6bTUuNiA0LjFoLTEuNzFhLjQuNCAwIDAgMS0uNC0uNFYyLjRhLjQuNCAwIDAgMSAuNC0uNGgxLjcxYS40LjQgMCAwIDEgLjQuNHYxLjdhLjQuNCAwIDAgMS0uNC40eiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;	
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud External IP Address');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud routes', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 110, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Cloud\nRoutes', 
			    		new mxGeometry(0, 0, 30, 28), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE5LjI5OTk5OTIzNzA2MDU0NyIgdmlld0JveD0iMCAwIDIwIDE5LjI5OTk5OTIzNzA2MDU0NyI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJLnN0MXtmaWxsOiM2NjlkZjY7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTIuNDMgNi4xSDBWMi42N2gzLjk0bDguNCAxMC40OWgyLjM0di0yLjcyTDIwIDE0Ljg3bC01LjMyIDQuNDN2LTIuNzFoLTMuODd6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTE0LjY4IDYuMTR2Mi43MkwyMCA0LjQzIDE0LjY4IDB2Mi43MWgtMy44N0w4LjMzIDUuODJsMi4xMyAyLjY3IDEuODgtMi4zNXpNMCAxMy4ydjMuNDNoMy45NGwyLjUyLTMuMTUtMi4xMy0yLjY3LTEuOSAyLjM5eiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 16);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Routes');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud routes', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 150, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Routes', 
			    		new mxGeometry(0, 0, 30, 28), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE5LjI5OTk5OTIzNzA2MDU0NyIgdmlld0JveD0iMCAwIDIwIDE5LjI5OTk5OTIzNzA2MDU0NyI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJLnN0MXtmaWxsOiM2NjlkZjY7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTIuNDMgNi4xSDBWMi42N2gzLjk0bDguNCAxMC40OWgyLjM0di0yLjcyTDIwIDE0Ljg3bC01LjMyIDQuNDN2LTIuNzFoLTMuODd6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTE0LjY4IDYuMTR2Mi43MkwyMCA0LjQzIDE0LjY4IDB2Mi43MWgtMy44N0w4LjMzIDUuODJsMi4xMyAyLjY3IDEuODgtMi4zNXpNMCAxMy4ydjMuNDNoMy45NGwyLjUyLTMuMTUtMi4xMy0yLjY3LTEuOSAyLjM5eiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 16);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Routes');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud routes', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 158, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Routes', 
			    		new mxGeometry(0, 0, 30, 28), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE5LjI5OTk5OTIzNzA2MDU0NyIgdmlld0JveD0iMCAwIDIwIDE5LjI5OTk5OTIzNzA2MDU0NyI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJLnN0MXtmaWxsOiM2NjlkZjY7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTIuNDMgNi4xSDBWMi42N2gzLjk0bDguNCAxMC40OWgyLjM0di0yLjcyTDIwIDE0Ljg3bC01LjMyIDQuNDN2LTIuNzFoLTMuODd6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTE0LjY4IDYuMTR2Mi43MkwyMCA0LjQzIDE0LjY4IDB2Mi43MWgtMy44N0w4LjMzIDUuODJsMi4xMyAyLjY3IDEuODgtMi4zNXpNMCAxMy4ydjMuNDNoMy45NGwyLjUyLTMuMTUtMi4xMy0yLjY3LTEuOSAyLjM5eiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 16);
			    icon1.vertex = true;	
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Routes');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud firewall rules', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 150, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Cloud\nFirewall Rules', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjNDI4NWY0IiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTAgMGg4Ljg5djIuMjJIMHptMCAxNy43OGg4Ljg5VjIwSDB6bTAtOC44OWg4Ljg5djIuMjJIMHpNMTEuMTEgMEgyMHYyLjIyaC04Ljg5em0wIDE3Ljc4SDIwVjIwaC04Ljg5em0wLTguODlIMjB2Mi4yMmgtOC44OXpNNS41NSA0LjQ0aDguODl2Mi4yMkg1LjU1em0wIDguODloOC44OXYyLjIySDUuNTV6TTAgNC40NGgzLjMzdjIuMjJIMHptMCA4Ljg5aDMuMzN2Mi4yMkgwem0xNi42Ny04Ljg5SDIwdjIuMjJoLTMuMzN6bTAgOC44OUgyMHYyLjIyaC0zLjMzeiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Firewall Rules');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud firewall rules', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 180, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Firewall Rules', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjNDI4NWY0IiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTAgMGg4Ljg5djIuMjJIMHptMCAxNy43OGg4Ljg5VjIwSDB6bTAtOC44OWg4Ljg5djIuMjJIMHpNMTEuMTEgMEgyMHYyLjIyaC04Ljg5em0wIDE3Ljc4SDIwVjIwaC04Ljg5em0wLTguODlIMjB2Mi4yMmgtOC44OXpNNS41NSA0LjQ0aDguODl2Mi4yMkg1LjU1em0wIDguODloOC44OXYyLjIySDUuNTV6TTAgNC40NGgzLjMzdjIuMjJIMHptMCA4Ljg5aDMuMzN2Mi4yMkgwem0xNi42Ny04Ljg5SDIwdjIuMjJoLTMuMzN6bTAgOC44OUgyMHYyLjIyaC0zLjMzeiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Firewall Rules');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud firewall rules', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 188, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Firewall Rules', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjNDI4NWY0IiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTAgMGg4Ljg5djIuMjJIMHptMCAxNy43OGg4Ljg5VjIwSDB6bTAtOC44OWg4Ljg5djIuMjJIMHpNMTEuMTEgMEgyMHYyLjIyaC04Ljg5em0wIDE3Ljc4SDIwVjIwaC04Ljg5em0wLTguODlIMjB2Mi4yMmgtOC44OXpNNS41NSA0LjQ0aDguODl2Mi4yMkg1LjU1em0wIDguODloOC44OXYyLjIySDUuNTV6TTAgNC40NGgzLjMzdjIuMjJIMHptMCA4Ljg5aDMuMzN2Mi4yMkgwem0xNi42Ny04Ljg5SDIwdjIuMjJoLTMuMzN6bTAgOC44OUgyMHYyLjIyaC0zLjMzeiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;	
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Firewall Rules');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud vpn virtual private network', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 100, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Cloud\nVPN', 
			    		new mxGeometry(0, 0, 27, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE3Ljk1MDAwMDc2MjkzOTQ1MyIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDE3Ljk1MDAwMDc2MjkzOTQ1MyAyMCI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJLnN0MXtmaWxsOiM2NjlkZjY7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPGcgY2xhc3M9InN0MSI+JiN4YTsJCTxwYXRoIGQ9Ik0xMS43IDkuMjhoNC4xOHYxLjM4SDExLjd6Ii8+JiN4YTsJCTxwYXRoIGQ9Ik0xNC45MiA0LjEyaDEuMzh2MTEuNzFoLTEuMzh6Ii8+JiN4YTsJPC9nPiYjeGE7CTxnIGNsYXNzPSJzdDAiPiYjeGE7CQk8cmVjdCB4PSIxMy4yNyIgeT0iMTUuMzIiIHdpZHRoPSI0LjY4IiBoZWlnaHQ9IjQuNjgiIHJ4PSIuMjgiLz4mI3hhOwkJPHJlY3QgeD0iMTMuMjciIHdpZHRoPSI0LjY4IiBoZWlnaHQ9IjQuNjgiIHJ4PSIuMjgiLz4mI3hhOwk8L2c+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTMuOTUgOS4yOGg0LjI4djEuMzhIMy45NXoiLz4mI3hhOwk8ZyBjbGFzcz0ic3QwIj4mI3hhOwkJPHJlY3QgeT0iNy42MyIgd2lkdGg9IjQuNjgiIGhlaWdodD0iNC42OCIgcng9Ii4yOCIvPiYjeGE7CQk8cGF0aCBkPSJNOS45NyAxMi4xN2EyLjIgMi4yIDAgMSAxIDAtNC40IDIuMiAyLjIgMCAwIDEgMi4yIDIuMiAyLjE5IDIuMTkgMCAwIDEtMi4yIDIuMnptMC0zLjU3YTEuMzggMS4zOCAwIDAgMC0xLjA1IDIuMzNBMS4zOCAxLjM4IDAgMCAwIDExLjMgMTBhMS4zNyAxLjM3IDAgMCAwLTEuMzMtMS40eiIvPiYjeGE7CTwvZz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(16, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud VPN');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud vpn virtual private network', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 130, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud VPN', 
			    		new mxGeometry(0, 0, 27, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE3Ljk1MDAwMDc2MjkzOTQ1MyIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDE3Ljk1MDAwMDc2MjkzOTQ1MyAyMCI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJLnN0MXtmaWxsOiM2NjlkZjY7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPGcgY2xhc3M9InN0MSI+JiN4YTsJCTxwYXRoIGQ9Ik0xMS43IDkuMjhoNC4xOHYxLjM4SDExLjd6Ii8+JiN4YTsJCTxwYXRoIGQ9Ik0xNC45MiA0LjEyaDEuMzh2MTEuNzFoLTEuMzh6Ii8+JiN4YTsJPC9nPiYjeGE7CTxnIGNsYXNzPSJzdDAiPiYjeGE7CQk8cmVjdCB4PSIxMy4yNyIgeT0iMTUuMzIiIHdpZHRoPSI0LjY4IiBoZWlnaHQ9IjQuNjgiIHJ4PSIuMjgiLz4mI3hhOwkJPHJlY3QgeD0iMTMuMjciIHdpZHRoPSI0LjY4IiBoZWlnaHQ9IjQuNjgiIHJ4PSIuMjgiLz4mI3hhOwk8L2c+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTMuOTUgOS4yOGg0LjI4djEuMzhIMy45NXoiLz4mI3hhOwk8ZyBjbGFzcz0ic3QwIj4mI3hhOwkJPHJlY3QgeT0iNy42MyIgd2lkdGg9IjQuNjgiIGhlaWdodD0iNC42OCIgcng9Ii4yOCIvPiYjeGE7CQk8cGF0aCBkPSJNOS45NyAxMi4xN2EyLjIgMi4yIDAgMSAxIDAtNC40IDIuMiAyLjIgMCAwIDEgMi4yIDIuMiAyLjE5IDIuMTkgMCAwIDEtMi4yIDIuMnptMC0zLjU3YTEuMzggMS4zOCAwIDAgMC0xLjA1IDIuMzNBMS4zOCAxLjM4IDAgMCAwIDExLjMgMTBhMS4zNyAxLjM3IDAgMCAwLTEuMzMtMS40eiIvPiYjeGE7CTwvZz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(16, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud VPN');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud vpn virtual private network', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 138, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud VPN', 
			    		new mxGeometry(0, 0, 27, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE3Ljk1MDAwMDc2MjkzOTQ1MyIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDE3Ljk1MDAwMDc2MjkzOTQ1MyAyMCI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJLnN0MXtmaWxsOiM2NjlkZjY7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPGcgY2xhc3M9InN0MSI+JiN4YTsJCTxwYXRoIGQ9Ik0xMS43IDkuMjhoNC4xOHYxLjM4SDExLjd6Ii8+JiN4YTsJCTxwYXRoIGQ9Ik0xNC45MiA0LjEyaDEuMzh2MTEuNzFoLTEuMzh6Ii8+JiN4YTsJPC9nPiYjeGE7CTxnIGNsYXNzPSJzdDAiPiYjeGE7CQk8cmVjdCB4PSIxMy4yNyIgeT0iMTUuMzIiIHdpZHRoPSI0LjY4IiBoZWlnaHQ9IjQuNjgiIHJ4PSIuMjgiLz4mI3hhOwkJPHJlY3QgeD0iMTMuMjciIHdpZHRoPSI0LjY4IiBoZWlnaHQ9IjQuNjgiIHJ4PSIuMjgiLz4mI3hhOwk8L2c+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTMuOTUgOS4yOGg0LjI4djEuMzhIMy45NXoiLz4mI3hhOwk8ZyBjbGFzcz0ic3QwIj4mI3hhOwkJPHJlY3QgeT0iNy42MyIgd2lkdGg9IjQuNjgiIGhlaWdodD0iNC42OCIgcng9Ii4yOCIvPiYjeGE7CQk8cGF0aCBkPSJNOS45NyAxMi4xN2EyLjIgMi4yIDAgMSAxIDAtNC40IDIuMiAyLjIgMCAwIDEgMi4yIDIuMiAyLjE5IDIuMTkgMCAwIDEtMi4yIDIuMnptMC0zLjU3YTEuMzggMS4zOCAwIDAgMC0xLjA1IDIuMzNBMS4zOCAxLjM4IDAgMCAwIDExLjMgMTBhMS4zNyAxLjM3IDAgMCAwLTEuMzMtMS40eiIvPiYjeGE7CTwvZz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(16, 15);
			    icon1.vertex = true;	
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud VPN');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud router', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 110, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Cloud\nRouter', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTE3IDEydjNsLTUtNSA1LTV2M2gzdjR6TTMgOEgwdjRoM3YzbDUtNS01LTV6bTkgN3YtM0g4djNINWw1IDUgNS01em0wLTEwdjNIOFY1SDVsNS01IDUgNXoiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Router');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud router', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 150, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Router', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTE3IDEydjNsLTUtNSA1LTV2M2gzdjR6TTMgOEgwdjRoM3YzbDUtNS01LTV6bTkgN3YtM0g4djNINWw1IDUgNS01em0wLTEwdjNIOFY1SDVsNS01IDUgNXoiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Router');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud router', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 158, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Router', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTE3IDEydjNsLTUtNSA1LTV2M2gzdjR6TTMgOEgwdjRoM3YzbDUtNS01LTV6bTkgN3YtM0g4djNINWw1IDUgNS01em0wLTEwdjNIOFY1SDVsNS01IDUgNXoiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;	
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Router');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud armor', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 110, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Cloud\nArmor', 
			    		new mxGeometry(0, 0, 26, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE2LjUwMDQzNDg3NTQ4ODI4IiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSItMC4wMDAzNjMwODkyNjA2NDUyMTA3NCAxLjE5MjA5Mjg5NTUwNzgxMjVlLTcgMTYuNTAwNDM0ODc1NDg4MjggMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM2NjlkZjY7fSYjeGE7CS5zdDF7ZmlsbDojYWVjYmZhO30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xMC40MiAxMi4wN2wxLjA0IDEuMDUtNS40NSA1LjQ4LTEuMDQtMS4wNXptLS44My00LjE5bDEuMDQgMS4wNS03LjM1IDcuMzktMS4wNC0xLjA1em0tNC4xNi0uODVsMS4wNCAxLjA1LTQuODggNC45LTEuMDQtMS4wNXoiLz4mI3hhOwk8ZyBjbGFzcz0ic3QwIj4mI3hhOwkJPHBhdGggZD0iTTguMjUgMS42MWw2Ljc4IDN2NC41NWE5LjcxIDkuNzEgMCAwIDEtNi43OCA5LjMyIDkuNyA5LjcgMCAwIDEtNi43OC05LjMxVjQuNjNsNi43OC0zbTAtMS42M0wwIDMuNjh2NS40OUExMS4xNyAxMS4xNyAwIDAgMCA4LjEgMjBoLjE1LjE1YTExLjE3IDExLjE3IDAgMCAwIDguMS0xMC43OFYzLjY4eiIvPiYjeGE7CQk8Y2lyY2xlIGN4PSIxMC45NCIgY3k9IjEyLjYyIiByPSIxLjQyIi8+JiN4YTsJCTxjaXJjbGUgY3g9IjEwLjEiIGN5PSI4LjQ1IiByPSIxLjQyIi8+JiN4YTsJCTxjaXJjbGUgY3g9IjUuOTQiIGN5PSI3LjYiIHI9IjEuNDIiLz4mI3hhOwk8L2c+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(17, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Armor');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud armor', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 140, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Armor', 
			    		new mxGeometry(0, 0, 26, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE2LjUwMDQzNDg3NTQ4ODI4IiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSItMC4wMDAzNjMwODkyNjA2NDUyMTA3NCAxLjE5MjA5Mjg5NTUwNzgxMjVlLTcgMTYuNTAwNDM0ODc1NDg4MjggMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM2NjlkZjY7fSYjeGE7CS5zdDF7ZmlsbDojYWVjYmZhO30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xMC40MiAxMi4wN2wxLjA0IDEuMDUtNS40NSA1LjQ4LTEuMDQtMS4wNXptLS44My00LjE5bDEuMDQgMS4wNS03LjM1IDcuMzktMS4wNC0xLjA1em0tNC4xNi0uODVsMS4wNCAxLjA1LTQuODggNC45LTEuMDQtMS4wNXoiLz4mI3hhOwk8ZyBjbGFzcz0ic3QwIj4mI3hhOwkJPHBhdGggZD0iTTguMjUgMS42MWw2Ljc4IDN2NC41NWE5LjcxIDkuNzEgMCAwIDEtNi43OCA5LjMyIDkuNyA5LjcgMCAwIDEtNi43OC05LjMxVjQuNjNsNi43OC0zbTAtMS42M0wwIDMuNjh2NS40OUExMS4xNyAxMS4xNyAwIDAgMCA4LjEgMjBoLjE1LjE1YTExLjE3IDExLjE3IDAgMCAwIDguMS0xMC43OFYzLjY4eiIvPiYjeGE7CQk8Y2lyY2xlIGN4PSIxMC45NCIgY3k9IjEyLjYyIiByPSIxLjQyIi8+JiN4YTsJCTxjaXJjbGUgY3g9IjEwLjEiIGN5PSI4LjQ1IiByPSIxLjQyIi8+JiN4YTsJCTxjaXJjbGUgY3g9IjUuOTQiIGN5PSI3LjYiIHI9IjEuNDIiLz4mI3hhOwk8L2c+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(17, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Armor');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud armor', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 148, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Armor', 
			    		new mxGeometry(0, 0, 26, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE2LjUwMDQzNDg3NTQ4ODI4IiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSItMC4wMDAzNjMwODkyNjA2NDUyMTA3NCAxLjE5MjA5Mjg5NTUwNzgxMjVlLTcgMTYuNTAwNDM0ODc1NDg4MjggMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM2NjlkZjY7fSYjeGE7CS5zdDF7ZmlsbDojYWVjYmZhO30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xMC40MiAxMi4wN2wxLjA0IDEuMDUtNS40NSA1LjQ4LTEuMDQtMS4wNXptLS44My00LjE5bDEuMDQgMS4wNS03LjM1IDcuMzktMS4wNC0xLjA1em0tNC4xNi0uODVsMS4wNCAxLjA1LTQuODggNC45LTEuMDQtMS4wNXoiLz4mI3hhOwk8ZyBjbGFzcz0ic3QwIj4mI3hhOwkJPHBhdGggZD0iTTguMjUgMS42MWw2Ljc4IDN2NC41NWE5LjcxIDkuNzEgMCAwIDEtNi43OCA5LjMyIDkuNyA5LjcgMCAwIDEtNi43OC05LjMxVjQuNjNsNi43OC0zbTAtMS42M0wwIDMuNjh2NS40OUExMS4xNyAxMS4xNyAwIDAgMCA4LjEgMjBoLjE1LjE1YTExLjE3IDExLjE3IDAgMCAwIDguMS0xMC43OFYzLjY4eiIvPiYjeGE7CQk8Y2lyY2xlIGN4PSIxMC45NCIgY3k9IjEyLjYyIiByPSIxLjQyIi8+JiN4YTsJCTxjaXJjbGUgY3g9IjEwLjEiIGN5PSI4LjQ1IiByPSIxLjQyIi8+JiN4YTsJCTxjaXJjbGUgY3g9IjUuOTQiIGN5PSI3LjYiIHI9IjEuNDIiLz4mI3hhOwk8L2c+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(17, 15);
			    icon1.vertex = true;	
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Armor');
			})
		);

		fns.push(
			this.addEntry(dt + 'standard network tier', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 140, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Standard\nNetwork Tier', 
			    		new mxGeometry(0, 0, 30, 15), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjQyNC4wMDEwMzc1OTc2NTYyNSIgaGVpZ2h0PSIyMTMuOTk4Mzk3ODI3MTQ4NDQiIHZpZXdCb3g9Ii0wLjAwMDAyMDQ4Mjg0MTEzNjk4MTczMyAwIDQyNC4wMDEwMzc1OTc2NTYyNSAyMTMuOTk4Mzk3ODI3MTQ4NDQiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTk5LjQzMSA0Ni44NTRsLjM3NC4yODkgMTA1Ljc1OCA4My4yMDhhNDIuMDggNDIuMDggMCAwIDEgNC43MTUtLjM4OWwuNzg5LS4wMTNjMTcuNDExLS4wMDQgMzMuMDE4IDEwLjc1OCAzOS4yMjMgMjcuMDQ5czEuNzIxIDM0LjcyNS0xMS4yNzEgNDYuMzMzYTQxLjkzIDQxLjkzIDAgMCAxLTQ3LjI1MyA1Ljk1NiA0Mi4wNCA0Mi4wNCAwIDAgMS0yMi40NDQtNDEuNTcxbC4wNTYtLjUxOS0uMDI2LS4wM0w4Ny43IDU4Ljk3NmMtOS40ODEtMTIuNTYyLS41NzUtMjEuNDg2IDExLjczLTEyLjEyM3ptMzA2LjgzOCAxMjcuNzI2YzkuNzkzIDAgMTcuNzMyIDcuOTQ5IDE3LjczMiAxNy43NTVzLTcuOTM5IDE3Ljc1NS0xNy43MzIgMTcuNzU1LTE3LjczMi03Ljk0OS0xNy43MzItMTcuNzU1IDcuOTM5LTE3Ljc1NSAxNy43MzItMTcuNzU1ek02MC4yNDEgNjguNzk3bDIwLjQyMyAyOC4zMmEyMTcuMTYgMjE3LjE2IDAgMCAwLTQ2LjkyIDk3LjM5OSAxNy4wNCAxNy4wNCAwIDAgMS0xMS4yODggMTIuOTYxYy01LjgyMyAxLjk2NC0xMi4yNTEuNjMzLTE2LjgxOS0zLjQ4MmExNy4wNiAxNy4wNiAwIDAgMS01LjIyOS0xNi4zOGM4LjgxNy00NC4zMDUgMjkuNDk5LTg1LjM3NiA1OS44MzMtMTE4LjgxN3ptMzIyLjc2MiA0MS4zMDhjOS43OTMgMCAxNy43MzIgNy45NDkgMTcuNzMyIDE3Ljc1NXMtNy45MzkgMTcuNzU1LTE3LjczMiAxNy43NTUtMTcuNzMyLTcuOTQ5LTE3LjczMi0xNy43NTUgNy45MzktMTcuNzU1IDE3LjczMi0xNy43NTV6bS00MS42MjgtNTUuMDk0YzkuNzkzIDAgMTcuNzMyIDcuOTQ5IDE3LjczMiAxNy43NTVzLTcuOTM5IDE3Ljc1NS0xNy43MzIgMTcuNzU1LTE3LjczMi03Ljk0OS0xNy43MzItMTcuNzU1IDcuOTM5LTE3Ljc1NSAxNy43MzItMTcuNzU1em0tNTcuNzkyLTM4Ljk3OWM5Ljc5MyAwIDE3LjczMiA3Ljk0OSAxNy43MzIgMTcuNzU1cy03LjkzOSAxNy43NTUtMTcuNzMyIDE3Ljc1NS0xNy43MzItNy45NDktMTcuNzMyLTE3Ljc1NSA3LjkzOS0xNy43NTUgMTcuNzMyLTE3Ljc1NXptLTEzMy4wNzQtNC4zMjdjOS43OTMgMCAxNy43MzIgNy45NDkgMTcuNzMyIDE3Ljc1NXMtNy45MzkgMTcuNzU1LTE3LjczMiAxNy43NTUtMTcuNzMyLTcuOTQ5LTE3LjczMi0xNy43NTUgNy45MzktMTcuNzU1IDE3LjczMi0xNy43NTV6TTIxNy4zNTcgMGM5Ljc5MyAwIDE3LjczMiA3Ljk0OSAxNy43MzIgMTcuNzU1UzIyNy4xNSAzNS41MSAyMTcuMzU3IDM1LjUxcy0xNy43MzItNy45NDktMTcuNzMyLTE3Ljc1NVMyMDcuNTY0IDAgMjE3LjM1NyAweiIgZmlsbD0iIzQyODVmNCIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 22);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Standard Network Tier');
			})
		);

		fns.push(
			this.addEntry(dt + 'standard network tier', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 190, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Standard Network Tier', 
			    		new mxGeometry(0, 0, 30, 15), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjQyNC4wMDEwMzc1OTc2NTYyNSIgaGVpZ2h0PSIyMTMuOTk4Mzk3ODI3MTQ4NDQiIHZpZXdCb3g9Ii0wLjAwMDAyMDQ4Mjg0MTEzNjk4MTczMyAwIDQyNC4wMDEwMzc1OTc2NTYyNSAyMTMuOTk4Mzk3ODI3MTQ4NDQiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTk5LjQzMSA0Ni44NTRsLjM3NC4yODkgMTA1Ljc1OCA4My4yMDhhNDIuMDggNDIuMDggMCAwIDEgNC43MTUtLjM4OWwuNzg5LS4wMTNjMTcuNDExLS4wMDQgMzMuMDE4IDEwLjc1OCAzOS4yMjMgMjcuMDQ5czEuNzIxIDM0LjcyNS0xMS4yNzEgNDYuMzMzYTQxLjkzIDQxLjkzIDAgMCAxLTQ3LjI1MyA1Ljk1NiA0Mi4wNCA0Mi4wNCAwIDAgMS0yMi40NDQtNDEuNTcxbC4wNTYtLjUxOS0uMDI2LS4wM0w4Ny43IDU4Ljk3NmMtOS40ODEtMTIuNTYyLS41NzUtMjEuNDg2IDExLjczLTEyLjEyM3ptMzA2LjgzOCAxMjcuNzI2YzkuNzkzIDAgMTcuNzMyIDcuOTQ5IDE3LjczMiAxNy43NTVzLTcuOTM5IDE3Ljc1NS0xNy43MzIgMTcuNzU1LTE3LjczMi03Ljk0OS0xNy43MzItMTcuNzU1IDcuOTM5LTE3Ljc1NSAxNy43MzItMTcuNzU1ek02MC4yNDEgNjguNzk3bDIwLjQyMyAyOC4zMmEyMTcuMTYgMjE3LjE2IDAgMCAwLTQ2LjkyIDk3LjM5OSAxNy4wNCAxNy4wNCAwIDAgMS0xMS4yODggMTIuOTYxYy01LjgyMyAxLjk2NC0xMi4yNTEuNjMzLTE2LjgxOS0zLjQ4MmExNy4wNiAxNy4wNiAwIDAgMS01LjIyOS0xNi4zOGM4LjgxNy00NC4zMDUgMjkuNDk5LTg1LjM3NiA1OS44MzMtMTE4LjgxN3ptMzIyLjc2MiA0MS4zMDhjOS43OTMgMCAxNy43MzIgNy45NDkgMTcuNzMyIDE3Ljc1NXMtNy45MzkgMTcuNzU1LTE3LjczMiAxNy43NTUtMTcuNzMyLTcuOTQ5LTE3LjczMi0xNy43NTUgNy45MzktMTcuNzU1IDE3LjczMi0xNy43NTV6bS00MS42MjgtNTUuMDk0YzkuNzkzIDAgMTcuNzMyIDcuOTQ5IDE3LjczMiAxNy43NTVzLTcuOTM5IDE3Ljc1NS0xNy43MzIgMTcuNzU1LTE3LjczMi03Ljk0OS0xNy43MzItMTcuNzU1IDcuOTM5LTE3Ljc1NSAxNy43MzItMTcuNzU1em0tNTcuNzkyLTM4Ljk3OWM5Ljc5MyAwIDE3LjczMiA3Ljk0OSAxNy43MzIgMTcuNzU1cy03LjkzOSAxNy43NTUtMTcuNzMyIDE3Ljc1NS0xNy43MzItNy45NDktMTcuNzMyLTE3Ljc1NSA3LjkzOS0xNy43NTUgMTcuNzMyLTE3Ljc1NXptLTEzMy4wNzQtNC4zMjdjOS43OTMgMCAxNy43MzIgNy45NDkgMTcuNzMyIDE3Ljc1NXMtNy45MzkgMTcuNzU1LTE3LjczMiAxNy43NTUtMTcuNzMyLTcuOTQ5LTE3LjczMi0xNy43NTUgNy45MzktMTcuNzU1IDE3LjczMi0xNy43NTV6TTIxNy4zNTcgMGM5Ljc5MyAwIDE3LjczMiA3Ljk0OSAxNy43MzIgMTcuNzU1UzIyNy4xNSAzNS41MSAyMTcuMzU3IDM1LjUxcy0xNy43MzItNy45NDktMTcuNzMyLTE3Ljc1NVMyMDcuNTY0IDAgMjE3LjM1NyAweiIgZmlsbD0iIzQyODVmNCIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 22);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Standard Network Tier');
			})
		);

		fns.push(
			this.addEntry(dt + 'standard network tier', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 198, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Standard Network Tier', 
			    		new mxGeometry(0, 0, 30, 15), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjQyNC4wMDEwMzc1OTc2NTYyNSIgaGVpZ2h0PSIyMTMuOTk4Mzk3ODI3MTQ4NDQiIHZpZXdCb3g9Ii0wLjAwMDAyMDQ4Mjg0MTEzNjk4MTczMyAwIDQyNC4wMDEwMzc1OTc2NTYyNSAyMTMuOTk4Mzk3ODI3MTQ4NDQiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTk5LjQzMSA0Ni44NTRsLjM3NC4yODkgMTA1Ljc1OCA4My4yMDhhNDIuMDggNDIuMDggMCAwIDEgNC43MTUtLjM4OWwuNzg5LS4wMTNjMTcuNDExLS4wMDQgMzMuMDE4IDEwLjc1OCAzOS4yMjMgMjcuMDQ5czEuNzIxIDM0LjcyNS0xMS4yNzEgNDYuMzMzYTQxLjkzIDQxLjkzIDAgMCAxLTQ3LjI1MyA1Ljk1NiA0Mi4wNCA0Mi4wNCAwIDAgMS0yMi40NDQtNDEuNTcxbC4wNTYtLjUxOS0uMDI2LS4wM0w4Ny43IDU4Ljk3NmMtOS40ODEtMTIuNTYyLS41NzUtMjEuNDg2IDExLjczLTEyLjEyM3ptMzA2LjgzOCAxMjcuNzI2YzkuNzkzIDAgMTcuNzMyIDcuOTQ5IDE3LjczMiAxNy43NTVzLTcuOTM5IDE3Ljc1NS0xNy43MzIgMTcuNzU1LTE3LjczMi03Ljk0OS0xNy43MzItMTcuNzU1IDcuOTM5LTE3Ljc1NSAxNy43MzItMTcuNzU1ek02MC4yNDEgNjguNzk3bDIwLjQyMyAyOC4zMmEyMTcuMTYgMjE3LjE2IDAgMCAwLTQ2LjkyIDk3LjM5OSAxNy4wNCAxNy4wNCAwIDAgMS0xMS4yODggMTIuOTYxYy01LjgyMyAxLjk2NC0xMi4yNTEuNjMzLTE2LjgxOS0zLjQ4MmExNy4wNiAxNy4wNiAwIDAgMS01LjIyOS0xNi4zOGM4LjgxNy00NC4zMDUgMjkuNDk5LTg1LjM3NiA1OS44MzMtMTE4LjgxN3ptMzIyLjc2MiA0MS4zMDhjOS43OTMgMCAxNy43MzIgNy45NDkgMTcuNzMyIDE3Ljc1NXMtNy45MzkgMTcuNzU1LTE3LjczMiAxNy43NTUtMTcuNzMyLTcuOTQ5LTE3LjczMi0xNy43NTUgNy45MzktMTcuNzU1IDE3LjczMi0xNy43NTV6bS00MS42MjgtNTUuMDk0YzkuNzkzIDAgMTcuNzMyIDcuOTQ5IDE3LjczMiAxNy43NTVzLTcuOTM5IDE3Ljc1NS0xNy43MzIgMTcuNzU1LTE3LjczMi03Ljk0OS0xNy43MzItMTcuNzU1IDcuOTM5LTE3Ljc1NSAxNy43MzItMTcuNzU1em0tNTcuNzkyLTM4Ljk3OWM5Ljc5MyAwIDE3LjczMiA3Ljk0OSAxNy43MzIgMTcuNzU1cy03LjkzOSAxNy43NTUtMTcuNzMyIDE3Ljc1NS0xNy43MzItNy45NDktMTcuNzMyLTE3Ljc1NSA3LjkzOS0xNy43NTUgMTcuNzMyLTE3Ljc1NXptLTEzMy4wNzQtNC4zMjdjOS43OTMgMCAxNy43MzIgNy45NDkgMTcuNzMyIDE3Ljc1NXMtNy45MzkgMTcuNzU1LTE3LjczMiAxNy43NTUtMTcuNzMyLTcuOTQ5LTE3LjczMi0xNy43NTUgNy45MzktMTcuNzU1IDE3LjczMi0xNy43NTV6TTIxNy4zNTcgMGM5Ljc5MyAwIDE3LjczMiA3Ljk0OSAxNy43MzIgMTcuNzU1UzIyNy4xNSAzNS41MSAyMTcuMzU3IDM1LjUxcy0xNy43MzItNy45NDktMTcuNzMyLTE3Ljc1NVMyMDcuNTY0IDAgMjE3LjM1NyAweiIgZmlsbD0iIzQyODVmNCIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 22);
			    icon1.vertex = true;	
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Standard Network Tier');
			})
		);

		fns.push(
			this.addEntry(dt + 'premium network tier', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 140, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Premium\nNetwork Tier', 
			    		new mxGeometry(0, 0, 30, 15), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwLjAyODAxODk1MTQxNjAxNiIgaGVpZ2h0PSIxMC4wMTk3MzA1Njc5MzIxMjkiIHZpZXdCb3g9Ii0wLjAwMDAxOTc3MjAwNTU0MzkyNzY2MiAwIDIwLjAyODAxODk1MTQxNjAxNiAxMC4wMTk3MzA1Njc5MzIxMjkiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTYuMjU4IDIuMjRBOS42MSA5LjYxIDAgMCAwIDEwLjEwOCAwQzUuMjY4IDAgMS4xMzggMy42NS4wMjggOC45YS44MS44MSAwIDEgMCAxLjU4LjM1aDBjLjk1LTQuNTEgNC40Mi03LjY1IDguNS03LjY1YTcuODYgNy44NiAwIDAgMSA0LjQ1IDEuNHptLjQ0IDEuMjlsLTUuODggMi42M2gwYTIgMiAwIDEgMCAxLjEzIDIuNTggMS44MyAxLjgzIDAgMCAwIC4xMi0uNDYuMS4xIDAgMCAwIC4wNSAwbDUtNGMuNTktLjU0LjI3LTEuMDYtLjQyLS43NXoiLz4mI3hhOwk8Y2lyY2xlIGNsYXNzPSJzdDEiIGN4PSIxOC4wNjgiIGN5PSI1Ljk5IiByPSIuODQiLz4mI3hhOwk8Y2lyY2xlIGNsYXNzPSJzdDIiIGN4PSIxOS4xODgiIGN5PSI5LjA0IiByPSIuODQiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 22);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Premium Network Tier');
			})
		);

		fns.push(
			this.addEntry(dt + 'premium network tier', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 190, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Premium Network Tier', 
			    		new mxGeometry(0, 0, 30, 15), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwLjAyODAxODk1MTQxNjAxNiIgaGVpZ2h0PSIxMC4wMTk3MzA1Njc5MzIxMjkiIHZpZXdCb3g9Ii0wLjAwMDAxOTc3MjAwNTU0MzkyNzY2MiAwIDIwLjAyODAxODk1MTQxNjAxNiAxMC4wMTk3MzA1Njc5MzIxMjkiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTYuMjU4IDIuMjRBOS42MSA5LjYxIDAgMCAwIDEwLjEwOCAwQzUuMjY4IDAgMS4xMzggMy42NS4wMjggOC45YS44MS44MSAwIDEgMCAxLjU4LjM1aDBjLjk1LTQuNTEgNC40Mi03LjY1IDguNS03LjY1YTcuODYgNy44NiAwIDAgMSA0LjQ1IDEuNHptLjQ0IDEuMjlsLTUuODggMi42M2gwYTIgMiAwIDEgMCAxLjEzIDIuNTggMS44MyAxLjgzIDAgMCAwIC4xMi0uNDYuMS4xIDAgMCAwIC4wNSAwbDUtNGMuNTktLjU0LjI3LTEuMDYtLjQyLS43NXoiLz4mI3hhOwk8Y2lyY2xlIGNsYXNzPSJzdDEiIGN4PSIxOC4wNjgiIGN5PSI1Ljk5IiByPSIuODQiLz4mI3hhOwk8Y2lyY2xlIGNsYXNzPSJzdDIiIGN4PSIxOS4xODgiIGN5PSI5LjA0IiByPSIuODQiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 22);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Premium Network Tier');
			})
		);

		fns.push(
			this.addEntry(dt + 'premium network tier', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 198, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Premium Network Tier', 
			    		new mxGeometry(0, 0, 30, 15), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwLjAyODAxODk1MTQxNjAxNiIgaGVpZ2h0PSIxMC4wMTk3MzA1Njc5MzIxMjkiIHZpZXdCb3g9Ii0wLjAwMDAxOTc3MjAwNTU0MzkyNzY2MiAwIDIwLjAyODAxODk1MTQxNjAxNiAxMC4wMTk3MzA1Njc5MzIxMjkiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTYuMjU4IDIuMjRBOS42MSA5LjYxIDAgMCAwIDEwLjEwOCAwQzUuMjY4IDAgMS4xMzggMy42NS4wMjggOC45YS44MS44MSAwIDEgMCAxLjU4LjM1aDBjLjk1LTQuNTEgNC40Mi03LjY1IDguNS03LjY1YTcuODYgNy44NiAwIDAgMSA0LjQ1IDEuNHptLjQ0IDEuMjlsLTUuODggMi42M2gwYTIgMiAwIDEgMCAxLjEzIDIuNTggMS44MyAxLjgzIDAgMCAwIC4xMi0uNDYuMS4xIDAgMCAwIC4wNSAwbDUtNGMuNTktLjU0LjI3LTEuMDYtLjQyLS43NXoiLz4mI3hhOwk8Y2lyY2xlIGNsYXNzPSJzdDEiIGN4PSIxOC4wNjgiIGN5PSI1Ljk5IiByPSIuODQiLz4mI3hhOwk8Y2lyY2xlIGNsYXNzPSJzdDIiIGN4PSIxOS4xODgiIGN5PSI5LjA0IiByPSIuODQiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 22);
			    icon1.vertex = true;	
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Premium Network Tier');
			})
		);

		fns.push(
			this.addEntry(dt + 'partner interconnect', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 140, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Partner\nInterconnect', 
			    		new mxGeometry(0, 0, 30, 21), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjEzLjUxOTk5OTUwNDA4OTM1NSIgdmlld0JveD0iMCAtMi4wNjA1NzM0NTA4OTU1MTA2ZS0xNSAyMCAxMy41MTk5OTk1MDQwODkzNTUiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNOS4xOSAxLjYyaDEuNjJ2MTAuMjdIOS4xOXoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMCA1Ljk1aDIuN3YxLjYySDB6Ii8+JiN4YTsJPHJlY3QgY2xhc3M9InN0MCIgeD0iMi40MyIgeT0iMy41MiIgd2lkdGg9IjQuODYiIGhlaWdodD0iNi40OSIgcng9Ii4yNCIvPiYjeGE7CTxnIGNsYXNzPSJzdDEiPiYjeGE7CQk8cGF0aCBkPSJNOS4xOSAxLjYyaDEuNjJ2MTAuMjdIOS4xOXptOC4xMSA0LjMzSDIwdjEuNjJoLTIuN3oiLz4mI3hhOwkJPHBhdGggZD0iTTQuNTkgMTEuOXYxLjMzYS4yOS4yOSAwIDAgMCAuMjkuMjloMTAuMjRhLjI5LjI5IDAgMCAwIC4yOS0uMjloMFYxMS45ek0xNS4xMiAwSDQuODhhLjI5LjI5IDAgMCAwLS4yOS4yOWgwdjEuMzNoMTAuODJWLjI5YS4yOS4yOSAwIDAgMC0uMjktLjI5eiIvPiYjeGE7CTwvZz4mI3hhOwk8cmVjdCBjbGFzcz0ic3QwIiB4PSIxMi43IiB5PSIzLjUyIiB3aWR0aD0iNC44NiIgaGVpZ2h0PSI2LjQ5IiByeD0iLjI0Ii8+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 19);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Partner Interconnect');
			})
		);

		fns.push(
			this.addEntry(dt + 'partner interconnect', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 180, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Partner Interconnect', 
			    		new mxGeometry(0, 0, 30, 21), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjEzLjUxOTk5OTUwNDA4OTM1NSIgdmlld0JveD0iMCAtMi4wNjA1NzM0NTA4OTU1MTA2ZS0xNSAyMCAxMy41MTk5OTk1MDQwODkzNTUiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNOS4xOSAxLjYyaDEuNjJ2MTAuMjdIOS4xOXoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMCA1Ljk1aDIuN3YxLjYySDB6Ii8+JiN4YTsJPHJlY3QgY2xhc3M9InN0MCIgeD0iMi40MyIgeT0iMy41MiIgd2lkdGg9IjQuODYiIGhlaWdodD0iNi40OSIgcng9Ii4yNCIvPiYjeGE7CTxnIGNsYXNzPSJzdDEiPiYjeGE7CQk8cGF0aCBkPSJNOS4xOSAxLjYyaDEuNjJ2MTAuMjdIOS4xOXptOC4xMSA0LjMzSDIwdjEuNjJoLTIuN3oiLz4mI3hhOwkJPHBhdGggZD0iTTQuNTkgMTEuOXYxLjMzYS4yOS4yOSAwIDAgMCAuMjkuMjloMTAuMjRhLjI5LjI5IDAgMCAwIC4yOS0uMjloMFYxMS45ek0xNS4xMiAwSDQuODhhLjI5LjI5IDAgMCAwLS4yOS4yOWgwdjEuMzNoMTAuODJWLjI5YS4yOS4yOSAwIDAgMC0uMjktLjI5eiIvPiYjeGE7CTwvZz4mI3hhOwk8cmVjdCBjbGFzcz0ic3QwIiB4PSIxMi43IiB5PSIzLjUyIiB3aWR0aD0iNC44NiIgaGVpZ2h0PSI2LjQ5IiByeD0iLjI0Ii8+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 19);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Partner Interconnect');
			})
		);

		fns.push(
			this.addEntry(dt + 'partner interconnect', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 188, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Partner Interconnect', 
			    		new mxGeometry(0, 0, 30, 21), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjEzLjUxOTk5OTUwNDA4OTM1NSIgdmlld0JveD0iMCAtMi4wNjA1NzM0NTA4OTU1MTA2ZS0xNSAyMCAxMy41MTk5OTk1MDQwODkzNTUiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNOS4xOSAxLjYyaDEuNjJ2MTAuMjdIOS4xOXoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMCA1Ljk1aDIuN3YxLjYySDB6Ii8+JiN4YTsJPHJlY3QgY2xhc3M9InN0MCIgeD0iMi40MyIgeT0iMy41MiIgd2lkdGg9IjQuODYiIGhlaWdodD0iNi40OSIgcng9Ii4yNCIvPiYjeGE7CTxnIGNsYXNzPSJzdDEiPiYjeGE7CQk8cGF0aCBkPSJNOS4xOSAxLjYyaDEuNjJ2MTAuMjdIOS4xOXptOC4xMSA0LjMzSDIwdjEuNjJoLTIuN3oiLz4mI3hhOwkJPHBhdGggZD0iTTQuNTkgMTEuOXYxLjMzYS4yOS4yOSAwIDAgMCAuMjkuMjloMTAuMjRhLjI5LjI5IDAgMCAwIC4yOS0uMjloMFYxMS45ek0xNS4xMiAwSDQuODhhLjI5LjI5IDAgMCAwLS4yOS4yOWgwdjEuMzNoMTAuODJWLjI5YS4yOS4yOSAwIDAgMC0uMjktLjI5eiIvPiYjeGE7CTwvZz4mI3hhOwk8cmVjdCBjbGFzcz0ic3QwIiB4PSIxMi43IiB5PSIzLjUyIiB3aWR0aD0iNC44NiIgaGVpZ2h0PSI2LjQ5IiByeD0iLjI0Ii8+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 19);
			    icon1.vertex = true;	
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Partner Interconnect');
			})
		);

		this.addPalette('gcp2Networking', 'GCP / Networking', false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addGCP2DeveloperToolsPalette = function()
	{
		var dt = 'gcp google cloud platform dev developer tools ';
		var fns = [];
		
		fns.push(
			this.addEntry(dt + 'cloud sdk software development kit', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 110, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Cloud\nSDK', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjQyNCIgaGVpZ2h0PSI0MjQiIHZpZXdCb3g9IjAgMCA0MjQgNDI0Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQgMHY0MjRIMFYwek0yMTIgOTcuODQ2Yy0zNy44ODQgMC03MC4xNjQgMjMuOTktODIuNDc4IDU3LjYwOGgwbC0zLjQwMy4wMDFjLTQyLjYzNCAwLTc3LjE5NiAzNC41NjItNzcuMTk2IDc3LjE5NnMzNC41NjIgNzcuMTk2IDc3LjE5NiA3Ny4xOTZoMCAxNzEuNzYzYzQyLjYzNCAwIDc3LjE5Ni0zNC41NjIgNzcuMTk2LTc3LjE5NnMtMzQuNTYyLTc3LjE5Ni03Ny4xOTYtNzcuMTk2aDBsLTMuNDAzLS4wMDFDMjgyLjE2NCAxMjEuODM3IDI0OS44ODQgOTcuODQ2IDIxMiA5Ny44NDZ6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud SDK');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud sdk software development kit', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 140, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud SDK', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjQyNCIgaGVpZ2h0PSI0MjQiIHZpZXdCb3g9IjAgMCA0MjQgNDI0Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQgMHY0MjRIMFYwek0yMTIgOTcuODQ2Yy0zNy44ODQgMC03MC4xNjQgMjMuOTktODIuNDc4IDU3LjYwOGgwbC0zLjQwMy4wMDFjLTQyLjYzNCAwLTc3LjE5NiAzNC41NjItNzcuMTk2IDc3LjE5NnMzNC41NjIgNzcuMTk2IDc3LjE5NiA3Ny4xOTZoMCAxNzEuNzYzYzQyLjYzNCAwIDc3LjE5Ni0zNC41NjIgNzcuMTk2LTc3LjE5NnMtMzQuNTYyLTc3LjE5Ni03Ny4xOTYtNzcuMTk2aDBsLTMuNDAzLS4wMDFDMjgyLjE2NCAxMjEuODM3IDI0OS44ODQgOTcuODQ2IDIxMiA5Ny44NDZ6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud SDK');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud sdk software development kit', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 148, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud SDK', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjQyNCIgaGVpZ2h0PSI0MjQiIHZpZXdCb3g9IjAgMCA0MjQgNDI0Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQgMHY0MjRIMFYwek0yMTIgOTcuODQ2Yy0zNy44ODQgMC03MC4xNjQgMjMuOTktODIuNDc4IDU3LjYwOGgwbC0zLjQwMy4wMDFjLTQyLjYzNCAwLTc3LjE5NiAzNC41NjItNzcuMTk2IDc3LjE5NnMzNC41NjIgNzcuMTk2IDc3LjE5NiA3Ny4xOTZoMCAxNzEuNzYzYzQyLjYzNCAwIDc3LjE5Ni0zNC41NjIgNzcuMTk2LTc3LjE5NnMtMzQuNTYyLTc3LjE5Ni03Ny4xOTYtNzcuMTk2aDBsLTMuNDAzLS4wMDFDMjgyLjE2NCAxMjEuODM3IDI0OS44ODQgOTcuODQ2IDIxMiA5Ny44NDZ6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;	
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud SDK');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud build', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 110, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Cloud\nBuild', 
			    		new mxGeometry(0, 0, 26, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE3LjMyOTk5OTkyMzcwNjA1NSIgaGVpZ2h0PSIxOS42MTAwMDA2MTAzNTE1NjIiIHZpZXdCb3g9IjAgMCAxNy4zMjk5OTk5MjM3MDYwNTUgMTkuNjEwMDAwNjEwMzUxNTYyIj4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qxe2ZpbGw6IzY2OWRmNjt9JiN4YTsJLnN0MntmaWxsOiNhZWNiZmE7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTEyLjE4IDcuOThMMTEgNy4yOWwtMy41MiA2LjEgMS4xOC42OCAzLjUyLTIuMDN6IiBmaWxsPSIjNDI4NWY0Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTYuMzIgMTIuNzJsMy41My02LjA5LTEuMTktLjY5LTMuNTIgMi4wNHY0LjA2eiIgZmlsbD0iIzY2OWRmNiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0zLjc1IDcuOThMMCA1LjgxdjkuMmw3Ljk3IDQuNnYtNC4zM2wtNC4yMi0yLjQ0em05LjEzLTEuMmwzLjc2LTIuMTdMOC42NiAwIC42OCA0LjYxbDMuNzYgMi4xNyA0LjIyLTIuNDR6TTkuMzUgMTkuNjFsNy45OC00LjZ2LTkuMmwtMy43NiAyLjE3djQuODZsLTQuMjIgMi40NHoiIGZpbGw9IiNhZWNiZmEiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(17, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Build');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud build', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 140, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Build', 
			    		new mxGeometry(0, 0, 26, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE3LjMyOTk5OTkyMzcwNjA1NSIgaGVpZ2h0PSIxOS42MTAwMDA2MTAzNTE1NjIiIHZpZXdCb3g9IjAgMCAxNy4zMjk5OTk5MjM3MDYwNTUgMTkuNjEwMDAwNjEwMzUxNTYyIj4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qxe2ZpbGw6IzY2OWRmNjt9JiN4YTsJLnN0MntmaWxsOiNhZWNiZmE7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTEyLjE4IDcuOThMMTEgNy4yOWwtMy41MiA2LjEgMS4xOC42OCAzLjUyLTIuMDN6IiBmaWxsPSIjNDI4NWY0Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTYuMzIgMTIuNzJsMy41My02LjA5LTEuMTktLjY5LTMuNTIgMi4wNHY0LjA2eiIgZmlsbD0iIzY2OWRmNiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0zLjc1IDcuOThMMCA1LjgxdjkuMmw3Ljk3IDQuNnYtNC4zM2wtNC4yMi0yLjQ0em05LjEzLTEuMmwzLjc2LTIuMTdMOC42NiAwIC42OCA0LjYxbDMuNzYgMi4xNyA0LjIyLTIuNDR6TTkuMzUgMTkuNjFsNy45OC00LjZ2LTkuMmwtMy43NiAyLjE3djQuODZsLTQuMjIgMi40NHoiIGZpbGw9IiNhZWNiZmEiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(17, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Build');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud build', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 148, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Build', 
			    		new mxGeometry(0, 0, 26, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE3LjMyOTk5OTkyMzcwNjA1NSIgaGVpZ2h0PSIxOS42MTAwMDA2MTAzNTE1NjIiIHZpZXdCb3g9IjAgMCAxNy4zMjk5OTk5MjM3MDYwNTUgMTkuNjEwMDAwNjEwMzUxNTYyIj4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qxe2ZpbGw6IzY2OWRmNjt9JiN4YTsJLnN0MntmaWxsOiNhZWNiZmE7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTEyLjE4IDcuOThMMTEgNy4yOWwtMy41MiA2LjEgMS4xOC42OCAzLjUyLTIuMDN6IiBmaWxsPSIjNDI4NWY0Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTYuMzIgMTIuNzJsMy41My02LjA5LTEuMTktLjY5LTMuNTIgMi4wNHY0LjA2eiIgZmlsbD0iIzY2OWRmNiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0zLjc1IDcuOThMMCA1LjgxdjkuMmw3Ljk3IDQuNnYtNC4zM2wtNC4yMi0yLjQ0em05LjEzLTEuMmwzLjc2LTIuMTdMOC42NiAwIC42OCA0LjYxbDMuNzYgMi4xNyA0LjIyLTIuNDR6TTkuMzUgMTkuNjFsNy45OC00LjZ2LTkuMmwtMy43NiAyLjE3djQuODZsLTQuMjIgMi40NHoiIGZpbGw9IiNhZWNiZmEiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(17, 15);
			    icon1.vertex = true;	
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Build');
			})
		);

		fns.push(
			this.addEntry(dt + 'gradle app engine plugin', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 160, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Gradle App\nEnginge Plugin', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjQyNCIgaGVpZ2h0PSI0MjQiIHZpZXdCb3g9IjAgMCA0MjQgNDI0Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQgMHY0MjRIMFYwek0yMTIgOTcuODQ2Yy0zNy44ODQgMC03MC4xNjQgMjMuOTktODIuNDc4IDU3LjYwOGgwbC0zLjQwMy4wMDFjLTQyLjYzNCAwLTc3LjE5NiAzNC41NjItNzcuMTk2IDc3LjE5NnMzNC41NjIgNzcuMTk2IDc3LjE5NiA3Ny4xOTZoMCAxNzEuNzYzYzQyLjYzNCAwIDc3LjE5Ni0zNC41NjIgNzcuMTk2LTc3LjE5NnMtMzQuNTYyLTc3LjE5Ni03Ny4xOTYtNzcuMTk2aDBsLTMuNDAzLS4wMDFDMjgyLjE2NCAxMjEuODM3IDI0OS44ODQgOTcuODQ2IDIxMiA5Ny44NDZ6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Gradle App Enginge Plugin');
			})
		);

		fns.push(
			this.addEntry(dt + 'gradle app engine plugin', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 220, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Gradle App Enginge Plugin', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjQyNCIgaGVpZ2h0PSI0MjQiIHZpZXdCb3g9IjAgMCA0MjQgNDI0Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQgMHY0MjRIMFYwek0yMTIgOTcuODQ2Yy0zNy44ODQgMC03MC4xNjQgMjMuOTktODIuNDc4IDU3LjYwOGgwbC0zLjQwMy4wMDFjLTQyLjYzNCAwLTc3LjE5NiAzNC41NjItNzcuMTk2IDc3LjE5NnMzNC41NjIgNzcuMTk2IDc3LjE5NiA3Ny4xOTZoMCAxNzEuNzYzYzQyLjYzNCAwIDc3LjE5Ni0zNC41NjIgNzcuMTk2LTc3LjE5NnMtMzQuNTYyLTc3LjE5Ni03Ny4xOTYtNzcuMTk2aDBsLTMuNDAzLS4wMDFDMjgyLjE2NCAxMjEuODM3IDI0OS44ODQgOTcuODQ2IDIxMiA5Ny44NDZ6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Gradle App Enginge Plugin');
			})
		);

		fns.push(
			this.addEntry(dt + 'gradle app engine plugin', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 228, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Gradle App Enginge Plugin', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjQyNCIgaGVpZ2h0PSI0MjQiIHZpZXdCb3g9IjAgMCA0MjQgNDI0Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQgMHY0MjRIMFYwek0yMTIgOTcuODQ2Yy0zNy44ODQgMC03MC4xNjQgMjMuOTktODIuNDc4IDU3LjYwOGgwbC0zLjQwMy4wMDFjLTQyLjYzNCAwLTc3LjE5NiAzNC41NjItNzcuMTk2IDc3LjE5NnMzNC41NjIgNzcuMTk2IDc3LjE5NiA3Ny4xOTZoMCAxNzEuNzYzYzQyLjYzNCAwIDc3LjE5Ni0zNC41NjIgNzcuMTk2LTc3LjE5NnMtMzQuNTYyLTc3LjE5Ni03Ny4xOTYtNzcuMTk2aDBsLTMuNDAzLS4wMDFDMjgyLjE2NCAxMjEuODM3IDI0OS44ODQgOTcuODQ2IDIxMiA5Ny44NDZ6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;	
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Gradle App Enginge Plugin');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud tools for visual studio', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 160, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Cloud Tools for\nVisual Studio', 
			    		new mxGeometry(0, 0, 30, 16), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjExLjI1OTk5OTI3NTIwNzUyIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHZpZXdCb3g9IjAgMCAyMCAxMS4yNTk5OTkyNzUyMDc1MiI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJLnN0MXtmaWxsOiM2NjlkZjY7fSYjeGE7CS5zdDJ7ZmlsbDojYWVjYmZhO30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik00LjY4IDEuNDJIMi40MkwwIDUuNjdsMi40MiA0LjI2aDIuMjZMMi4yNyA1LjY3eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0wIDUuNjdsMS4xMSAxLjk3IDEuNDYtMS40NS0uMy0uNTJ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTEzIDBINy4xMkwzLjgxIDUuNjNsMy4zMSA1LjU5SDEzbDMuMjktNS41OXptLTIuOTMgOC4zNmEyLjY0IDIuNjQgMCAxIDEgMi42Ni0yLjY0IDIuNjUgMi42NSAwIDAgMS0yLjY2IDIuNjR6TTIuNDIgMS40MkwwIDUuNjlsMS4xMSAxLjk3IDEuMTYtMS45NyAyLjQxLTQuMjd6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTEzIC4wOGgwbC0xLjcgMy4zM2EyLjY2IDIuNjYgMCAwIDEtMS4yNSA1IDIuNjIgMi42MiAwIDAgMS0xLjE4LS4yN2wtMS43NSAzLjEySDEzbDMuMjktNS42M3ptMi4zMiA5Ljg1aDIuMjdMMjAgNS42N2wtMi40MS00LjI1aC0yLjI3bDIuNDEgNC4yNXoiPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yMCA1LjY3TDE4Ljg5IDMuN2wtMS40NiAxLjQ2LjMuNTF6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTE3LjU5IDkuOTNMMjAgNS42NWwtMS4xMS0xLjk3LTEuMTYgMS45Ny0yLjQxIDQuMjh6Ii8+JiN4YTs8L3BhdGg+PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 22);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Tools for Visual Studio');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud tools for visual studio', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 230, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Tools for Visual Studio', 
			    		new mxGeometry(0, 0, 30, 16), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjExLjI1OTk5OTI3NTIwNzUyIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHZpZXdCb3g9IjAgMCAyMCAxMS4yNTk5OTkyNzUyMDc1MiI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJLnN0MXtmaWxsOiM2NjlkZjY7fSYjeGE7CS5zdDJ7ZmlsbDojYWVjYmZhO30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik00LjY4IDEuNDJIMi40MkwwIDUuNjdsMi40MiA0LjI2aDIuMjZMMi4yNyA1LjY3eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0wIDUuNjdsMS4xMSAxLjk3IDEuNDYtMS40NS0uMy0uNTJ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTEzIDBINy4xMkwzLjgxIDUuNjNsMy4zMSA1LjU5SDEzbDMuMjktNS41OXptLTIuOTMgOC4zNmEyLjY0IDIuNjQgMCAxIDEgMi42Ni0yLjY0IDIuNjUgMi42NSAwIDAgMS0yLjY2IDIuNjR6TTIuNDIgMS40MkwwIDUuNjlsMS4xMSAxLjk3IDEuMTYtMS45NyAyLjQxLTQuMjd6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTEzIC4wOGgwbC0xLjcgMy4zM2EyLjY2IDIuNjYgMCAwIDEtMS4yNSA1IDIuNjIgMi42MiAwIDAgMS0xLjE4LS4yN2wtMS43NSAzLjEySDEzbDMuMjktNS42M3ptMi4zMiA5Ljg1aDIuMjdMMjAgNS42N2wtMi40MS00LjI1aC0yLjI3bDIuNDEgNC4yNXoiPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yMCA1LjY3TDE4Ljg5IDMuN2wtMS40NiAxLjQ2LjMuNTF6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTE3LjU5IDkuOTNMMjAgNS42NWwtMS4xMS0xLjk3LTEuMTYgMS45Ny0yLjQxIDQuMjh6Ii8+JiN4YTs8L3BhdGg+PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 22);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Tools for Visual Studio');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud tools for visual studio', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 238, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Tools for Visual Studio', 
			    		new mxGeometry(0, 0, 30, 16), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjExLjI1OTk5OTI3NTIwNzUyIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHZpZXdCb3g9IjAgMCAyMCAxMS4yNTk5OTkyNzUyMDc1MiI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJLnN0MXtmaWxsOiM2NjlkZjY7fSYjeGE7CS5zdDJ7ZmlsbDojYWVjYmZhO30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik00LjY4IDEuNDJIMi40MkwwIDUuNjdsMi40MiA0LjI2aDIuMjZMMi4yNyA1LjY3eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0wIDUuNjdsMS4xMSAxLjk3IDEuNDYtMS40NS0uMy0uNTJ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTEzIDBINy4xMkwzLjgxIDUuNjNsMy4zMSA1LjU5SDEzbDMuMjktNS41OXptLTIuOTMgOC4zNmEyLjY0IDIuNjQgMCAxIDEgMi42Ni0yLjY0IDIuNjUgMi42NSAwIDAgMS0yLjY2IDIuNjR6TTIuNDIgMS40MkwwIDUuNjlsMS4xMSAxLjk3IDEuMTYtMS45NyAyLjQxLTQuMjd6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTEzIC4wOGgwbC0xLjcgMy4zM2EyLjY2IDIuNjYgMCAwIDEtMS4yNSA1IDIuNjIgMi42MiAwIDAgMS0xLjE4LS4yN2wtMS43NSAzLjEySDEzbDMuMjktNS42M3ptMi4zMiA5Ljg1aDIuMjdMMjAgNS42N2wtMi40MS00LjI1aC0yLjI3bDIuNDEgNC4yNXoiPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yMCA1LjY3TDE4Ljg5IDMuN2wtMS40NiAxLjQ2LjMuNTF6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTE3LjU5IDkuOTNMMjAgNS42NWwtMS4xMS0xLjk3LTEuMTYgMS45Ny0yLjQxIDQuMjh6Ii8+JiN4YTs8L3BhdGg+PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 22);
			    icon1.vertex = true;	
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Tools for Visual Studio');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud source repositories', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 150, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Cloud Source\nRepositories', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjQyNCIgaGVpZ2h0PSI0MjQiIHZpZXdCb3g9IjAgMCA0MjQgNDI0Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQgMHY0MjRIMFYwek0yMTIgOTcuODQ2Yy0zNy44ODQgMC03MC4xNjQgMjMuOTktODIuNDc4IDU3LjYwOGgwbC0zLjQwMy4wMDFjLTQyLjYzNCAwLTc3LjE5NiAzNC41NjItNzcuMTk2IDc3LjE5NnMzNC41NjIgNzcuMTk2IDc3LjE5NiA3Ny4xOTZoMCAxNzEuNzYzYzQyLjYzNCAwIDc3LjE5Ni0zNC41NjIgNzcuMTk2LTc3LjE5NnMtMzQuNTYyLTc3LjE5Ni03Ny4xOTYtNzcuMTk2aDBsLTMuNDAzLS4wMDFDMjgyLjE2NCAxMjEuODM3IDI0OS44ODQgOTcuODQ2IDIxMiA5Ny44NDZ6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Source Repositories');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud source repositories', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 220, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Source Repositories', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjQyNCIgaGVpZ2h0PSI0MjQiIHZpZXdCb3g9IjAgMCA0MjQgNDI0Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQgMHY0MjRIMFYwek0yMTIgOTcuODQ2Yy0zNy44ODQgMC03MC4xNjQgMjMuOTktODIuNDc4IDU3LjYwOGgwbC0zLjQwMy4wMDFjLTQyLjYzNCAwLTc3LjE5NiAzNC41NjItNzcuMTk2IDc3LjE5NnMzNC41NjIgNzcuMTk2IDc3LjE5NiA3Ny4xOTZoMCAxNzEuNzYzYzQyLjYzNCAwIDc3LjE5Ni0zNC41NjIgNzcuMTk2LTc3LjE5NnMtMzQuNTYyLTc3LjE5Ni03Ny4xOTYtNzcuMTk2aDBsLTMuNDAzLS4wMDFDMjgyLjE2NCAxMjEuODM3IDI0OS44ODQgOTcuODQ2IDIxMiA5Ny44NDZ6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Source Repositories');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud source repositories', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 228, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Source Repositories', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjQyNCIgaGVpZ2h0PSI0MjQiIHZpZXdCb3g9IjAgMCA0MjQgNDI0Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQgMHY0MjRIMFYwek0yMTIgOTcuODQ2Yy0zNy44ODQgMC03MC4xNjQgMjMuOTktODIuNDc4IDU3LjYwOGgwbC0zLjQwMy4wMDFjLTQyLjYzNCAwLTc3LjE5NiAzNC41NjItNzcuMTk2IDc3LjE5NnMzNC41NjIgNzcuMTk2IDc3LjE5NiA3Ny4xOTZoMCAxNzEuNzYzYzQyLjYzNCAwIDc3LjE5Ni0zNC41NjIgNzcuMTk2LTc3LjE5NnMtMzQuNTYyLTc3LjE5Ni03Ny4xOTYtNzcuMTk2aDBsLTMuNDAzLS4wMDFDMjgyLjE2NCAxMjEuODM3IDI0OS44ODQgOTcuODQ2IDIxMiA5Ny44NDZ6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;	
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Source Repositories');
			})
		);

		fns.push(
			this.addEntry(dt + 'maven app engine plugin', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 150, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Maven App\nEngine Plugin', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjQyNCIgaGVpZ2h0PSI0MjQiIHZpZXdCb3g9IjAgMCA0MjQgNDI0Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQgMHY0MjRIMFYwek0yMTIgOTcuODQ2Yy0zNy44ODQgMC03MC4xNjQgMjMuOTktODIuNDc4IDU3LjYwOGgwbC0zLjQwMy4wMDFjLTQyLjYzNCAwLTc3LjE5NiAzNC41NjItNzcuMTk2IDc3LjE5NnMzNC41NjIgNzcuMTk2IDc3LjE5NiA3Ny4xOTZoMCAxNzEuNzYzYzQyLjYzNCAwIDc3LjE5Ni0zNC41NjIgNzcuMTk2LTc3LjE5NnMtMzQuNTYyLTc3LjE5Ni03Ny4xOTYtNzcuMTk2aDBsLTMuNDAzLS4wMDFDMjgyLjE2NCAxMjEuODM3IDI0OS44ODQgOTcuODQ2IDIxMiA5Ny44NDZ6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Maven App Engine Plugin');
			})
		);

		fns.push(
			this.addEntry(dt + 'maven app engine plugin', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 210, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Maven App Engine Plugin', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjQyNCIgaGVpZ2h0PSI0MjQiIHZpZXdCb3g9IjAgMCA0MjQgNDI0Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQgMHY0MjRIMFYwek0yMTIgOTcuODQ2Yy0zNy44ODQgMC03MC4xNjQgMjMuOTktODIuNDc4IDU3LjYwOGgwbC0zLjQwMy4wMDFjLTQyLjYzNCAwLTc3LjE5NiAzNC41NjItNzcuMTk2IDc3LjE5NnMzNC41NjIgNzcuMTk2IDc3LjE5NiA3Ny4xOTZoMCAxNzEuNzYzYzQyLjYzNCAwIDc3LjE5Ni0zNC41NjIgNzcuMTk2LTc3LjE5NnMtMzQuNTYyLTc3LjE5Ni03Ny4xOTYtNzcuMTk2aDBsLTMuNDAzLS4wMDFDMjgyLjE2NCAxMjEuODM3IDI0OS44ODQgOTcuODQ2IDIxMiA5Ny44NDZ6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Maven App Engine Plugin');
			})
		);

		fns.push(
			this.addEntry(dt + 'maven app engine plugin', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 218, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Maven App Engine Plugin', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjQyNCIgaGVpZ2h0PSI0MjQiIHZpZXdCb3g9IjAgMCA0MjQgNDI0Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQgMHY0MjRIMFYwek0yMTIgOTcuODQ2Yy0zNy44ODQgMC03MC4xNjQgMjMuOTktODIuNDc4IDU3LjYwOGgwbC0zLjQwMy4wMDFjLTQyLjYzNCAwLTc3LjE5NiAzNC41NjItNzcuMTk2IDc3LjE5NnMzNC41NjIgNzcuMTk2IDc3LjE5NiA3Ny4xOTZoMCAxNzEuNzYzYzQyLjYzNCAwIDc3LjE5Ni0zNC41NjIgNzcuMTk2LTc3LjE5NnMtMzQuNTYyLTc3LjE5Ni03Ny4xOTYtNzcuMTk2aDBsLTMuNDAzLS4wMDFDMjgyLjE2NCAxMjEuODM3IDI0OS44ODQgOTcuODQ2IDIxMiA5Ny44NDZ6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;	
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Maven App Engine Plugin');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud tools for eclipse', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 140, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Cloud Tools\nfor Eclipse', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjQyNCIgaGVpZ2h0PSI0MjQiIHZpZXdCb3g9IjAgMCA0MjQgNDI0Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQgMHY0MjRIMFYwek0yMTIgOTcuODQ2Yy0zNy44ODQgMC03MC4xNjQgMjMuOTktODIuNDc4IDU3LjYwOGgwbC0zLjQwMy4wMDFjLTQyLjYzNCAwLTc3LjE5NiAzNC41NjItNzcuMTk2IDc3LjE5NnMzNC41NjIgNzcuMTk2IDc3LjE5NiA3Ny4xOTZoMCAxNzEuNzYzYzQyLjYzNCAwIDc3LjE5Ni0zNC41NjIgNzcuMTk2LTc3LjE5NnMtMzQuNTYyLTc3LjE5Ni03Ny4xOTYtNzcuMTk2aDBsLTMuNDAzLS4wMDFDMjgyLjE2NCAxMjEuODM3IDI0OS44ODQgOTcuODQ2IDIxMiA5Ny44NDZ6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Tools for Eclipse');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud tools for eclipse', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 200, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Tools for Eclipse', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjQyNCIgaGVpZ2h0PSI0MjQiIHZpZXdCb3g9IjAgMCA0MjQgNDI0Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQgMHY0MjRIMFYwek0yMTIgOTcuODQ2Yy0zNy44ODQgMC03MC4xNjQgMjMuOTktODIuNDc4IDU3LjYwOGgwbC0zLjQwMy4wMDFjLTQyLjYzNCAwLTc3LjE5NiAzNC41NjItNzcuMTk2IDc3LjE5NnMzNC41NjIgNzcuMTk2IDc3LjE5NiA3Ny4xOTZoMCAxNzEuNzYzYzQyLjYzNCAwIDc3LjE5Ni0zNC41NjIgNzcuMTk2LTc3LjE5NnMtMzQuNTYyLTc3LjE5Ni03Ny4xOTYtNzcuMTk2aDBsLTMuNDAzLS4wMDFDMjgyLjE2NCAxMjEuODM3IDI0OS44ODQgOTcuODQ2IDIxMiA5Ny44NDZ6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Tools for Eclipse');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud tools for eclipse', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 208, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Tools for Eclipse', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjQyNCIgaGVpZ2h0PSI0MjQiIHZpZXdCb3g9IjAgMCA0MjQgNDI0Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQgMHY0MjRIMFYwek0yMTIgOTcuODQ2Yy0zNy44ODQgMC03MC4xNjQgMjMuOTktODIuNDc4IDU3LjYwOGgwbC0zLjQwMy4wMDFjLTQyLjYzNCAwLTc3LjE5NiAzNC41NjItNzcuMTk2IDc3LjE5NnMzNC41NjIgNzcuMTk2IDc3LjE5NiA3Ny4xOTZoMCAxNzEuNzYzYzQyLjYzNCAwIDc3LjE5Ni0zNC41NjIgNzcuMTk2LTc3LjE5NnMtMzQuNTYyLTc3LjE5Ni03Ny4xOTYtNzcuMTk2aDBsLTMuNDAzLS4wMDFDMjgyLjE2NCAxMjEuODM3IDI0OS44ODQgOTcuODQ2IDIxMiA5Ny44NDZ6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;	
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Tools for Eclipse');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud tools for intellij', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 140, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Cloud Tools\nfor IntelliJ', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjQyNCIgaGVpZ2h0PSI0MjQiIHZpZXdCb3g9IjAgMCA0MjQgNDI0Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQgMHY0MjRIMFYwek0yMTIgOTcuODQ2Yy0zNy44ODQgMC03MC4xNjQgMjMuOTktODIuNDc4IDU3LjYwOGgwbC0zLjQwMy4wMDFjLTQyLjYzNCAwLTc3LjE5NiAzNC41NjItNzcuMTk2IDc3LjE5NnMzNC41NjIgNzcuMTk2IDc3LjE5NiA3Ny4xOTZoMCAxNzEuNzYzYzQyLjYzNCAwIDc3LjE5Ni0zNC41NjIgNzcuMTk2LTc3LjE5NnMtMzQuNTYyLTc3LjE5Ni03Ny4xOTYtNzcuMTk2aDBsLTMuNDAzLS4wMDFDMjgyLjE2NCAxMjEuODM3IDI0OS44ODQgOTcuODQ2IDIxMiA5Ny44NDZ6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Tools for IntelliJ');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud tools for intellij', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 190, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Tools for IntelliJ', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjQyNCIgaGVpZ2h0PSI0MjQiIHZpZXdCb3g9IjAgMCA0MjQgNDI0Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQgMHY0MjRIMFYwek0yMTIgOTcuODQ2Yy0zNy44ODQgMC03MC4xNjQgMjMuOTktODIuNDc4IDU3LjYwOGgwbC0zLjQwMy4wMDFjLTQyLjYzNCAwLTc3LjE5NiAzNC41NjItNzcuMTk2IDc3LjE5NnMzNC41NjIgNzcuMTk2IDc3LjE5NiA3Ny4xOTZoMCAxNzEuNzYzYzQyLjYzNCAwIDc3LjE5Ni0zNC41NjIgNzcuMTk2LTc3LjE5NnMtMzQuNTYyLTc3LjE5Ni03Ny4xOTYtNzcuMTk2aDBsLTMuNDAzLS4wMDFDMjgyLjE2NCAxMjEuODM3IDI0OS44ODQgOTcuODQ2IDIxMiA5Ny44NDZ6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Tools for IntelliJ');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud tools for intellij', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 198, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Tools for IntelliJ', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjQyNCIgaGVpZ2h0PSI0MjQiIHZpZXdCb3g9IjAgMCA0MjQgNDI0Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQgMHY0MjRIMFYwek0yMTIgOTcuODQ2Yy0zNy44ODQgMC03MC4xNjQgMjMuOTktODIuNDc4IDU3LjYwOGgwbC0zLjQwMy4wMDFjLTQyLjYzNCAwLTc3LjE5NiAzNC41NjItNzcuMTk2IDc3LjE5NnMzNC41NjIgNzcuMTk2IDc3LjE5NiA3Ny4xOTZoMCAxNzEuNzYzYzQyLjYzNCAwIDc3LjE5Ni0zNC41NjIgNzcuMTk2LTc3LjE5NnMtMzQuNTYyLTc3LjE5Ni03Ny4xOTYtNzcuMTk2aDBsLTMuNDAzLS4wMDFDMjgyLjE2NCAxMjEuODM3IDI0OS44ODQgOTcuODQ2IDIxMiA5Ny44NDZ6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;	
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Tools for IntelliJ');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud test lab', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 120, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Cloud\nTest Lab', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjQyNCIgaGVpZ2h0PSI0MjQiIHZpZXdCb3g9IjAgMCA0MjQgNDI0Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQgMHY0MjRIMFYwek0yMTIgOTcuODQ2Yy0zNy44ODQgMC03MC4xNjQgMjMuOTktODIuNDc4IDU3LjYwOGgwbC0zLjQwMy4wMDFjLTQyLjYzNCAwLTc3LjE5NiAzNC41NjItNzcuMTk2IDc3LjE5NnMzNC41NjIgNzcuMTk2IDc3LjE5NiA3Ny4xOTZoMCAxNzEuNzYzYzQyLjYzNCAwIDc3LjE5Ni0zNC41NjIgNzcuMTk2LTc3LjE5NnMtMzQuNTYyLTc3LjE5Ni03Ny4xOTYtNzcuMTk2aDBsLTMuNDAzLS4wMDFDMjgyLjE2NCAxMjEuODM3IDI0OS44ODQgOTcuODQ2IDIxMiA5Ny44NDZ6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Test Lab');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud test lab', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 160, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Test Lab', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjQyNCIgaGVpZ2h0PSI0MjQiIHZpZXdCb3g9IjAgMCA0MjQgNDI0Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQgMHY0MjRIMFYwek0yMTIgOTcuODQ2Yy0zNy44ODQgMC03MC4xNjQgMjMuOTktODIuNDc4IDU3LjYwOGgwbC0zLjQwMy4wMDFjLTQyLjYzNCAwLTc3LjE5NiAzNC41NjItNzcuMTk2IDc3LjE5NnMzNC41NjIgNzcuMTk2IDc3LjE5NiA3Ny4xOTZoMCAxNzEuNzYzYzQyLjYzNCAwIDc3LjE5Ni0zNC41NjIgNzcuMTk2LTc3LjE5NnMtMzQuNTYyLTc3LjE5Ni03Ny4xOTYtNzcuMTk2aDBsLTMuNDAzLS4wMDFDMjgyLjE2NCAxMjEuODM3IDI0OS44ODQgOTcuODQ2IDIxMiA5Ny44NDZ6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Test Lab');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud test lab', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 168, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Test Lab', 
			    		new mxGeometry(0, 0, 30, 30), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjQyNCIgaGVpZ2h0PSI0MjQiIHZpZXdCb3g9IjAgMCA0MjQgNDI0Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQgMHY0MjRIMFYwek0yMTIgOTcuODQ2Yy0zNy44ODQgMC03MC4xNjQgMjMuOTktODIuNDc4IDU3LjYwOGgwbC0zLjQwMy4wMDFjLTQyLjYzNCAwLTc3LjE5NiAzNC41NjItNzcuMTk2IDc3LjE5NnMzNC41NjIgNzcuMTk2IDc3LjE5NiA3Ny4xOTZoMCAxNzEuNzYzYzQyLjYzNCAwIDc3LjE5Ni0zNC41NjIgNzcuMTk2LTc3LjE5NnMtMzQuNTYyLTc3LjE5Ni03Ny4xOTYtNzcuMTk2aDBsLTMuNDAzLS4wMDFDMjgyLjE2NCAxMjEuODM3IDI0OS44ODQgOTcuODQ2IDIxMiA5Ny44NDZ6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 15);
			    icon1.vertex = true;	
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Test Lab');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud tools for powershell', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 150, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Cloud Tools for\nPowerShell', 
			    		new mxGeometry(0, 0, 30, 16), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjExLjI1OTk5OTI3NTIwNzUyIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHZpZXdCb3g9IjAgMCAyMCAxMS4yNTk5OTkyNzUyMDc1MiI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJLnN0MXtmaWxsOiM2NjlkZjY7fSYjeGE7CS5zdDJ7ZmlsbDojYWVjYmZhO30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik00LjY4IDEuNDJIMi40MkwwIDUuNjdsMi40MiA0LjI2aDIuMjZMMi4yNyA1LjY3eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0wIDUuNjdsMS4xMSAxLjk3IDEuNDYtMS40NS0uMy0uNTJ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTEzIDBINy4xMkwzLjgxIDUuNjNsMy4zMSA1LjU5SDEzbDMuMjktNS41OXptLTIuOTMgOC4zNmEyLjY0IDIuNjQgMCAxIDEgMi42Ni0yLjY0IDIuNjUgMi42NSAwIDAgMS0yLjY2IDIuNjR6TTIuNDIgMS40MkwwIDUuNjlsMS4xMSAxLjk3IDEuMTYtMS45NyAyLjQxLTQuMjd6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTEzIC4wOGgwbC0xLjcgMy4zM2EyLjY2IDIuNjYgMCAwIDEtMS4yNSA1IDIuNjIgMi42MiAwIDAgMS0xLjE4LS4yN2wtMS43NSAzLjEySDEzbDMuMjktNS42M3ptMi4zMiA5Ljg1aDIuMjdMMjAgNS42N2wtMi40MS00LjI1aC0yLjI3bDIuNDEgNC4yNXoiPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yMCA1LjY3TDE4Ljg5IDMuN2wtMS40NiAxLjQ2LjMuNTF6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTE3LjU5IDkuOTNMMjAgNS42NWwtMS4xMS0xLjk3LTEuMTYgMS45Ny0yLjQxIDQuMjh6Ii8+JiN4YTs8L3BhdGg+PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 22);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Tools for PowerShell');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud tools for powershell', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 220, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Tools for PowerShell', 
			    		new mxGeometry(0, 0, 30, 16), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjExLjI1OTk5OTI3NTIwNzUyIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHZpZXdCb3g9IjAgMCAyMCAxMS4yNTk5OTkyNzUyMDc1MiI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJLnN0MXtmaWxsOiM2NjlkZjY7fSYjeGE7CS5zdDJ7ZmlsbDojYWVjYmZhO30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik00LjY4IDEuNDJIMi40MkwwIDUuNjdsMi40MiA0LjI2aDIuMjZMMi4yNyA1LjY3eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0wIDUuNjdsMS4xMSAxLjk3IDEuNDYtMS40NS0uMy0uNTJ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTEzIDBINy4xMkwzLjgxIDUuNjNsMy4zMSA1LjU5SDEzbDMuMjktNS41OXptLTIuOTMgOC4zNmEyLjY0IDIuNjQgMCAxIDEgMi42Ni0yLjY0IDIuNjUgMi42NSAwIDAgMS0yLjY2IDIuNjR6TTIuNDIgMS40MkwwIDUuNjlsMS4xMSAxLjk3IDEuMTYtMS45NyAyLjQxLTQuMjd6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTEzIC4wOGgwbC0xLjcgMy4zM2EyLjY2IDIuNjYgMCAwIDEtMS4yNSA1IDIuNjIgMi42MiAwIDAgMS0xLjE4LS4yN2wtMS43NSAzLjEySDEzbDMuMjktNS42M3ptMi4zMiA5Ljg1aDIuMjdMMjAgNS42N2wtMi40MS00LjI1aC0yLjI3bDIuNDEgNC4yNXoiPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yMCA1LjY3TDE4Ljg5IDMuN2wtMS40NiAxLjQ2LjMuNTF6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTE3LjU5IDkuOTNMMjAgNS42NWwtMS4xMS0xLjk3LTEuMTYgMS45Ny0yLjQxIDQuMjh6Ii8+JiN4YTs8L3BhdGg+PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 22);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Tools for PowerShell');
			})
		);

		fns.push(
			this.addEntry(dt + 'cloud tools for powershell', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 228, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Tools for PowerShell', 
			    		new mxGeometry(0, 0, 30, 16), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjExLjI1OTk5OTI3NTIwNzUyIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHZpZXdCb3g9IjAgMCAyMCAxMS4yNTk5OTkyNzUyMDc1MiI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJLnN0MXtmaWxsOiM2NjlkZjY7fSYjeGE7CS5zdDJ7ZmlsbDojYWVjYmZhO30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik00LjY4IDEuNDJIMi40MkwwIDUuNjdsMi40MiA0LjI2aDIuMjZMMi4yNyA1LjY3eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0wIDUuNjdsMS4xMSAxLjk3IDEuNDYtMS40NS0uMy0uNTJ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTEzIDBINy4xMkwzLjgxIDUuNjNsMy4zMSA1LjU5SDEzbDMuMjktNS41OXptLTIuOTMgOC4zNmEyLjY0IDIuNjQgMCAxIDEgMi42Ni0yLjY0IDIuNjUgMi42NSAwIDAgMS0yLjY2IDIuNjR6TTIuNDIgMS40MkwwIDUuNjlsMS4xMSAxLjk3IDEuMTYtMS45NyAyLjQxLTQuMjd6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTEzIC4wOGgwbC0xLjcgMy4zM2EyLjY2IDIuNjYgMCAwIDEtMS4yNSA1IDIuNjIgMi42MiAwIDAgMS0xLjE4LS4yN2wtMS43NSAzLjEySDEzbDMuMjktNS42M3ptMi4zMiA5Ljg1aDIuMjdMMjAgNS42N2wtMi40MS00LjI1aC0yLjI3bDIuNDEgNC4yNXoiPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yMCA1LjY3TDE4Ljg5IDMuN2wtMS40NiAxLjQ2LjMuNTF6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTE3LjU5IDkuOTNMMjAgNS42NWwtMS4xMS0xLjk3LTEuMTYgMS45Ny0yLjQxIDQuMjh6Ii8+JiN4YTs8L3BhdGg+PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 22);
			    icon1.vertex = true;	
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Tools for PowerShell');
			})
		);

		fns.push(
			this.addEntry(dt + 'ide plugins integrated development environment', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 140, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('IDE Plugins', 
			    		new mxGeometry(0, 0, 30, 16), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjExLjI1OTk5OTI3NTIwNzUyIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHZpZXdCb3g9IjAgMCAyMCAxMS4yNTk5OTkyNzUyMDc1MiI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJLnN0MXtmaWxsOiM2NjlkZjY7fSYjeGE7CS5zdDJ7ZmlsbDojYWVjYmZhO30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik00LjY4IDEuNDJIMi40MkwwIDUuNjdsMi40MiA0LjI2aDIuMjZMMi4yNyA1LjY3eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0wIDUuNjdsMS4xMSAxLjk3IDEuNDYtMS40NS0uMy0uNTJ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTEzIDBINy4xMkwzLjgxIDUuNjNsMy4zMSA1LjU5SDEzbDMuMjktNS41OXptLTIuOTMgOC4zNmEyLjY0IDIuNjQgMCAxIDEgMi42Ni0yLjY0IDIuNjUgMi42NSAwIDAgMS0yLjY2IDIuNjR6TTIuNDIgMS40MkwwIDUuNjlsMS4xMSAxLjk3IDEuMTYtMS45NyAyLjQxLTQuMjd6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTEzIC4wOGgwbC0xLjcgMy4zM2EyLjY2IDIuNjYgMCAwIDEtMS4yNSA1IDIuNjIgMi42MiAwIDAgMS0xLjE4LS4yN2wtMS43NSAzLjEySDEzbDMuMjktNS42M3ptMi4zMiA5Ljg1aDIuMjdMMjAgNS42N2wtMi40MS00LjI1aC0yLjI3bDIuNDEgNC4yNXoiPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yMCA1LjY3TDE4Ljg5IDMuN2wtMS40NiAxLjQ2LjMuNTF6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTE3LjU5IDkuOTNMMjAgNS42NWwtMS4xMS0xLjk3LTEuMTYgMS45Ny0yLjQxIDQuMjh6Ii8+JiN4YTs8L3BhdGg+PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 22);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'IDE Plugins');
			})
		);

		fns.push(
			this.addEntry(dt + 'ide plugins integrated development environment', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 140, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>IDE Plugins', 
			    		new mxGeometry(0, 0, 30, 16), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjExLjI1OTk5OTI3NTIwNzUyIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHZpZXdCb3g9IjAgMCAyMCAxMS4yNTk5OTkyNzUyMDc1MiI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJLnN0MXtmaWxsOiM2NjlkZjY7fSYjeGE7CS5zdDJ7ZmlsbDojYWVjYmZhO30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik00LjY4IDEuNDJIMi40MkwwIDUuNjdsMi40MiA0LjI2aDIuMjZMMi4yNyA1LjY3eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0wIDUuNjdsMS4xMSAxLjk3IDEuNDYtMS40NS0uMy0uNTJ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTEzIDBINy4xMkwzLjgxIDUuNjNsMy4zMSA1LjU5SDEzbDMuMjktNS41OXptLTIuOTMgOC4zNmEyLjY0IDIuNjQgMCAxIDEgMi42Ni0yLjY0IDIuNjUgMi42NSAwIDAgMS0yLjY2IDIuNjR6TTIuNDIgMS40MkwwIDUuNjlsMS4xMSAxLjk3IDEuMTYtMS45NyAyLjQxLTQuMjd6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTEzIC4wOGgwbC0xLjcgMy4zM2EyLjY2IDIuNjYgMCAwIDEtMS4yNSA1IDIuNjIgMi42MiAwIDAgMS0xLjE4LS4yN2wtMS43NSAzLjEySDEzbDMuMjktNS42M3ptMi4zMiA5Ljg1aDIuMjdMMjAgNS42N2wtMi40MS00LjI1aC0yLjI3bDIuNDEgNC4yNXoiPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yMCA1LjY3TDE4Ljg5IDMuN2wtMS40NiAxLjQ2LjMuNTF6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTE3LjU5IDkuOTNMMjAgNS42NWwtMS4xMS0xLjk3LTEuMTYgMS45Ny0yLjQxIDQuMjh6Ii8+JiN4YTs8L3BhdGg+PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 22);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'IDE Plugins');
			})
		);

		fns.push(
			this.addEntry(dt + 'ide plugins integrated development environment', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 148, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>IDE Plugins', 
			    		new mxGeometry(0, 0, 30, 16), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjExLjI1OTk5OTI3NTIwNzUyIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHZpZXdCb3g9IjAgMCAyMCAxMS4yNTk5OTkyNzUyMDc1MiI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJLnN0MXtmaWxsOiM2NjlkZjY7fSYjeGE7CS5zdDJ7ZmlsbDojYWVjYmZhO30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik00LjY4IDEuNDJIMi40MkwwIDUuNjdsMi40MiA0LjI2aDIuMjZMMi4yNyA1LjY3eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0wIDUuNjdsMS4xMSAxLjk3IDEuNDYtMS40NS0uMy0uNTJ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTEzIDBINy4xMkwzLjgxIDUuNjNsMy4zMSA1LjU5SDEzbDMuMjktNS41OXptLTIuOTMgOC4zNmEyLjY0IDIuNjQgMCAxIDEgMi42Ni0yLjY0IDIuNjUgMi42NSAwIDAgMS0yLjY2IDIuNjR6TTIuNDIgMS40MkwwIDUuNjlsMS4xMSAxLjk3IDEuMTYtMS45NyAyLjQxLTQuMjd6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTEzIC4wOGgwbC0xLjcgMy4zM2EyLjY2IDIuNjYgMCAwIDEtMS4yNSA1IDIuNjIgMi42MiAwIDAgMS0xLjE4LS4yN2wtMS43NSAzLjEySDEzbDMuMjktNS42M3ptMi4zMiA5Ljg1aDIuMjdMMjAgNS42N2wtMi40MS00LjI1aC0yLjI3bDIuNDEgNC4yNXoiPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yMCA1LjY3TDE4Ljg5IDMuN2wtMS40NiAxLjQ2LjMuNTF6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTE3LjU5IDkuOTNMMjAgNS42NWwtMS4xMS0xLjk3LTEuMTYgMS45Ny0yLjQxIDQuMjh6Ii8+JiN4YTs8L3BhdGg+PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 22);
			    icon1.vertex = true;	
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'IDE Plugins');
			})
		);

		fns.push(
			this.addEntry(dt + 'artifact registry', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 130, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('Artifact\nRegistry', 
			    		new mxGeometry(0, 0, 30, 27), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIxLjk5OTAwMDU0OTMxNjQwNiIgaGVpZ2h0PSIyMC4zOTM5OTkwOTk3MzE0NDUiIHZpZXdCb3g9IjAgMCAyMS45OTkwMDA1NDkzMTY0MDYgMjAuMzkzOTk5MDk5NzMxNDQ1Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O2ZpbGwtcnVsZTpldmVub2RkfSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTUgMHYyLjQ1OEwxLjk5OSA0LjE5N3YxMi4wMUw1IDE3LjkzOHYyLjQ1NmwtNS0yLjg4N1YyLjg4NnptMTIgMGw0Ljk5OSAyLjg4NnYxNC42MjFMMTcgMjAuMzk0di0yLjQ1NmwzLTEuNzMxVjQuMTk3bC0zLTEuNzM5em0tNi4wMTYgNi42NzNsMi45NDctMS42NDYtMi45NDctMS42NDYtMi45NDcgMS42NDZ6bTMuMjY4LTEuMDk2bC0yLjg3MSAxLjY3OHYzLjI4N2wyLjg3MS0xLjY3NnpNNy43NzMgOC44NjZsMi44NzEgMS42NzRWNy4yNTZMNy43NzMgNS41Nzd6bS0uMjEyIDMuODc4bDIuODItMS42NDYtMi44Mi0xLjY0Ni0yLjgyIDEuNjQ2em0zLjEzMi0xLjA5OGwtMi44NzEgMS42Nzh2My4yODdsMi44NzEtMS42NzZ6bS02LjI2NCAzLjI4OUw3LjMgMTYuNjA5di0zLjI4NWwtMi44NzEtMS42Nzl6bTEwLjAyOS0yLjE5MWwyLjgyLTEuNjQ2LTIuODItMS42NDYtMi44MiAxLjY0NnptMy4xMzItMS4wOThsLTIuODcxIDEuNjc4djMuMjg3bDIuODcxLTEuNjc2em0tNi4yNjQgMy4yODlsMi44NzEgMS42NzR2LTMuMjg1bC0yLjg3MS0xLjY3OXoiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 16);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Artifact Registry');
			})
		);

		fns.push(
			this.addEntry(dt + 'artifact registry', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 170, 60), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Artifact Registry', 
			    		new mxGeometry(0, 0, 30, 27), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIxLjk5OTAwMDU0OTMxNjQwNiIgaGVpZ2h0PSIyMC4zOTM5OTkwOTk3MzE0NDUiIHZpZXdCb3g9IjAgMCAyMS45OTkwMDA1NDkzMTY0MDYgMjAuMzkzOTk5MDk5NzMxNDQ1Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O2ZpbGwtcnVsZTpldmVub2RkfSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTUgMHYyLjQ1OEwxLjk5OSA0LjE5N3YxMi4wMUw1IDE3LjkzOHYyLjQ1NmwtNS0yLjg4N1YyLjg4NnptMTIgMGw0Ljk5OSAyLjg4NnYxNC42MjFMMTcgMjAuMzk0di0yLjQ1NmwzLTEuNzMxVjQuMTk3bC0zLTEuNzM5em0tNi4wMTYgNi42NzNsMi45NDctMS42NDYtMi45NDctMS42NDYtMi45NDcgMS42NDZ6bTMuMjY4LTEuMDk2bC0yLjg3MSAxLjY3OHYzLjI4N2wyLjg3MS0xLjY3NnpNNy43NzMgOC44NjZsMi44NzEgMS42NzRWNy4yNTZMNy43NzMgNS41Nzd6bS0uMjEyIDMuODc4bDIuODItMS42NDYtMi44Mi0xLjY0Ni0yLjgyIDEuNjQ2em0zLjEzMi0xLjA5OGwtMi44NzEgMS42Nzh2My4yODdsMi44NzEtMS42NzZ6bS02LjI2NCAzLjI4OUw3LjMgMTYuNjA5di0zLjI4NWwtMi44NzEtMS42Nzl6bTEwLjAyOS0yLjE5MWwyLjgyLTEuNjQ2LTIuODItMS42NDYtMi44MiAxLjY0NnptMy4xMzItMS4wOThsLTIuODcxIDEuNjc4djMuMjg3bDIuODcxLTEuNjc2em0tNi4yNjQgMy4yODlsMi44NzEgMS42NzR2LTMuMjg1bC0yLjg3MS0xLjY3OXoiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 16);
			    icon1.vertex = true;
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Artifact Registry');
			})
		);

		fns.push(
			this.addEntry(dt + 'artifact registry', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 178, 68), 
			    		'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Artifact Registry', 
			    		new mxGeometry(0, 0, 30, 27), 
			    		'editableCssRules=.*;html=1;fontColor=#999999;shape=image;verticalLabelPosition=middle;labelBackgroundColor=#ffffff;verticalAlign=middle;labelPosition=right;align=left;spacingLeft=20;part=1;points=[];imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIxLjk5OTAwMDU0OTMxNjQwNiIgaGVpZ2h0PSIyMC4zOTM5OTkwOTk3MzE0NDUiIHZpZXdCb3g9IjAgMCAyMS45OTkwMDA1NDkzMTY0MDYgMjAuMzkzOTk5MDk5NzMxNDQ1Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O2ZpbGwtcnVsZTpldmVub2RkfSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTUgMHYyLjQ1OEwxLjk5OSA0LjE5N3YxMi4wMUw1IDE3LjkzOHYyLjQ1NmwtNS0yLjg4N1YyLjg4NnptMTIgMGw0Ljk5OSAyLjg4NnYxNC42MjFMMTcgMjAuMzk0di0yLjQ1NmwzLTEuNzMxVjQuMTk3bC0zLTEuNzM5em0tNi4wMTYgNi42NzNsMi45NDctMS42NDYtMi45NDctMS42NDYtMi45NDcgMS42NDZ6bTMuMjY4LTEuMDk2bC0yLjg3MSAxLjY3OHYzLjI4N2wyLjg3MS0xLjY3NnpNNy43NzMgOC44NjZsMi44NzEgMS42NzRWNy4yNTZMNy43NzMgNS41Nzd6bS0uMjEyIDMuODc4bDIuODItMS42NDYtMi44Mi0xLjY0Ni0yLjgyIDEuNjQ2em0zLjEzMi0xLjA5OGwtMi44NzEgMS42Nzh2My4yODdsMi44NzEtMS42NzZ6bS02LjI2NCAzLjI4OUw3LjMgMTYuNjA5di0zLjI4NWwtMi44NzEtMS42Nzl6bTEwLjAyOS0yLjE5MWwyLjgyLTEuNjQ2LTIuODItMS42NDYtMi44MiAxLjY0NnptMy4xMzItMS4wOThsLTIuODcxIDEuNjc4djMuMjg3bDIuODcxLTEuNjc2em0tNi4yNjQgMy4yODlsMi44NzEgMS42NzR2LTMuMjg1bC0yLjg3MS0xLjY3OXoiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(15, 16);
			    icon1.vertex = true;	
		    	bg.insert(icon1);
	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Artifact Registry');
			})
		);

		this.addPalette('gcp2Developer Tools', 'GCP / Developer Tools', false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addGCP2ExpandedProductCardsPalette = function()
	{
		var fns = [];
		var dt = 'gcp google cloud platform expanded product cards ';
		var sb = this;

		fns.push(
			this.addEntry('gcp google cloud platform expanded product cards compute engine ', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 150, 70), 'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Compute Engine<hr><font style="font-size: 11px">Attribute Name</font>', 
			    		new mxGeometry(0, 0, 42, 42), 'sketch=0;dashed=0;connectable=0;html=1;part=1;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=top;spacingLeft=5;fontColor=#999999;fontSize=12;spacingTop=-8;shape=image;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNNyA3aDZ2Nkg3eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik05IDBoMnY0SDl6TTUgMGgydjRINXptOCAwaDJ2NGgtMnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNOSAxNmgydjRIOXptLTQgMGgydjRINXptOCAwaDJ2NGgtMnptMy01VjloNHYyem0wIDR2LTJoNHYyem0wLThWNWg0djJ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTAgMTFWOWg0djJ6bTAgNHYtMmg0djJ6bTAtOFY1aDR2MnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMyAzdjE0aDE0VjN6bTEyIDEySDVWNWgxMHoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTAgMTBsLTMgM2g2eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMyA3bC0zIDMgMyAzeiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(5, 7);
		    	icon1.vertex = true;
		    	bg.insert(icon1);
		    	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Compute Engine');
			})
		);
		
		fns.push(
			this.addEntry('gcp google cloud platform expanded product cards compute engine ', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 158, 78), 'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;');
		    	bg.vertex = true;
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Compute Engine<hr><font style="font-size: 11px">Attribute Name</font>', 
			    		new mxGeometry(0, 0, 42, 42), 'sketch=0;dashed=0;connectable=0;html=1;part=1;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=top;spacingLeft=5;fontColor=#999999;fontSize=12;spacingTop=-8;shape=image;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNNyA3aDZ2Nkg3eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik05IDBoMnY0SDl6TTUgMGgydjRINXptOCAwaDJ2NGgtMnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNOSAxNmgydjRIOXptLTQgMGgydjRINXptOCAwaDJ2NGgtMnptMy01VjloNHYyem0wIDR2LTJoNHYyem0wLThWNWg0djJ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTAgMTFWOWg0djJ6bTAgNHYtMmg0djJ6bTAtOFY1aDR2MnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMyAzdjE0aDE0VjN6bTEyIDEySDVWNWgxMHoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTAgMTBsLTMgM2g2eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMyA3bC0zIDMgMyAzeiIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(5, 7);
		    	icon1.vertex = true;
		    	bg.insert(icon1);
		    	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Compute Engine');
			})			
		);

		fns.push(
			this.addEntry('gcp google cloud platform expanded product cards bigquery ', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 140, 70), 'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>BigQuery<hr><font style="font-size: 11px">Attribute Name</font>', 
			    		new mxGeometry(0, 0, 42, 42), 'sketch=0;dashed=0;connectable=0;html=1;part=1;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=top;spacingLeft=5;fontColor=#999999;fontSize=12;spacingTop=-8;shape=image;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwLjAwMTA0NTIyNzA1MDc4IiBoZWlnaHQ9IjIwLjAwMTA0NTIyNzA1MDc4IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHZpZXdCb3g9IjAgMCAyMC4wMDEwNDUyMjcwNTA3OCAyMC4wMDEwNDUyMjcwNTA3OCI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6I2FlY2JmYTt9JiN4YTsJLnN0MXtmaWxsOiM2NjlkZjY7fSYjeGE7CS5zdDJ7ZmlsbDojNDI4NWY0O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00LjczIDguODN2Mi42M2E0LjkxIDQuOTEgMCAwIDAgMS43MSAxLjc0VjguODN6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTcuODkgNi40MXY3LjUzQTcuNjIgNy42MiAwIDAgMCA5IDE0YTggOCAwIDAgMCAxIDBWNi40MXoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTEuNjQgOS44NnYzLjI5YTUgNSAwIDAgMCAxLjctMS44MlY5Ljg2eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xNS43NCAxNC4zMmwtMS40MiAxLjQyYS40Mi40MiAwIDAgMCAwIC42bDMuNTQgMy41NGEuNDIuNDIgMCAwIDAgLjU5IDBsMS40My0xLjQzYS40Mi40MiAwIDAgMCAwLS41OWwtMy41NC0zLjU0YS40Mi40MiAwIDAgMC0uNiAwIi8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTkgMGE5IDkgMCAxIDAgMCAxOEE5IDkgMCAxIDAgOSAwbTAgMTUuNjlhNi42OCA2LjY4IDAgMCAxIC4wMDctMTMuMzYgNi42OCA2LjY4IDAgMCAxIDQuNzI3IDExLjQwM0E2LjY4IDYuNjggMCAwIDEgOSAxNS42OSIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(5, 7);
		    	icon1.vertex = true;
		    	bg.insert(icon1);
		    	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'BigQuery');
			})
		);
		
		fns.push(
			this.addEntry('gcp google cloud platform expanded product cards bigquery ', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 148, 78), 'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;');
		    	bg.vertex = true;
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>BigQuery<hr><font style="font-size: 11px">Attribute Name</font>', 
			    		new mxGeometry(0, 0, 42, 42), 'sketch=0;dashed=0;connectable=0;html=1;part=1;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=top;spacingLeft=5;fontColor=#999999;fontSize=12;spacingTop=-8;shape=image;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwLjAwMTA0NTIyNzA1MDc4IiBoZWlnaHQ9IjIwLjAwMTA0NTIyNzA1MDc4IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHZpZXdCb3g9IjAgMCAyMC4wMDEwNDUyMjcwNTA3OCAyMC4wMDEwNDUyMjcwNTA3OCI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6I2FlY2JmYTt9JiN4YTsJLnN0MXtmaWxsOiM2NjlkZjY7fSYjeGE7CS5zdDJ7ZmlsbDojNDI4NWY0O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00LjczIDguODN2Mi42M2E0LjkxIDQuOTEgMCAwIDAgMS43MSAxLjc0VjguODN6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTcuODkgNi40MXY3LjUzQTcuNjIgNy42MiAwIDAgMCA5IDE0YTggOCAwIDAgMCAxIDBWNi40MXoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTEuNjQgOS44NnYzLjI5YTUgNSAwIDAgMCAxLjctMS44MlY5Ljg2eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xNS43NCAxNC4zMmwtMS40MiAxLjQyYS40Mi40MiAwIDAgMCAwIC42bDMuNTQgMy41NGEuNDIuNDIgMCAwIDAgLjU5IDBsMS40My0xLjQzYS40Mi40MiAwIDAgMCAwLS41OWwtMy41NC0zLjU0YS40Mi40MiAwIDAgMC0uNiAwIi8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTkgMGE5IDkgMCAxIDAgMCAxOEE5IDkgMCAxIDAgOSAwbTAgMTUuNjlhNi42OCA2LjY4IDAgMCAxIC4wMDctMTMuMzYgNi42OCA2LjY4IDAgMCAxIDQuNzI3IDExLjQwM0E2LjY4IDYuNjggMCAwIDEgOSAxNS42OSIvPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(5, 7);
		    	icon1.vertex = true;
		    	bg.insert(icon1);
		    	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'BigQuery');
			})			
		);

		fns.push(
			this.addEntry('gcp google cloud platform expanded product cards app engine ', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 140, 70), 'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>App Engine<hr><font style="font-size: 11px">Attribute Name</font>', 
			    		new mxGeometry(0, 0, 42, 42), 'sketch=0;dashed=0;connectable=0;html=1;part=1;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=top;spacingLeft=5;fontColor=#999999;fontSize=12;spacingTop=-8;shape=image;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE2LjAyMDAwMDQ1Nzc2MzY3MiIgZmlsbC1ydWxlPSJldmVub2RkIiB2aWV3Qm94PSI4Ljk0MDY5NjcxNjMwODU5NGUtOCAwIDIwIDE2LjAyMDAwMDQ1Nzc2MzY3MiI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJLnN0MXtmaWxsOiNhZWNiZmE7fSYjeGE7CS5zdDJ7ZmlsbDojNjY5ZGY2O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMi4zIDcuMjZsLTEuMjIgMS4yMkExLjcxIDEuNzEgMCAwIDEgMTAgMTEuNDlhMS43NCAxLjc0IDAgMCAxLTEuMzMtLjY0bC0xLjIyIDEuMjJhMy40MyAzLjQzIDAgMCAwIDUuOTg0LTEuMzgxQTMuNDMgMy40MyAwIDAgMCAxMi4zIDcuMjZ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTEwIDMuNTJhNi4yNSA2LjI1IDAgMCAwIDAgMTIuNSA2LjI1IDYuMjUgMCAwIDAgMC0xMi41bTAgMTAuNzRhNC40NSA0LjQ1IDAgMCAxLTMuMTU3LTcuNTk3QTQuNDUgNC40NSAwIDAgMSAxNC40NCA5LjgyIDQuNDQgNC40NCAwIDAgMSAxMCAxNC4yNiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xOS42MiA5LjE2bC0yLjU2LS44MWE3LjEgNy4xIDAgMCAxIC4xNyAxLjUzIDcuNjIgNy42MiAwIDAgMS0uMDggMS4wOGgyLjQ3YS40NC40NCAwIDAgMCAuMzgtLjQydi0xYS40NC40NCAwIDAgMC0uMzgtLjQyTTEwIDIuNzhhNy40OCA3LjQ4IDAgMCAxIDEuNS4xNUwxMC41OC4zOGMtLjA3LS4yMi0uMjEtLjM4LS40Mi0uMzhoLS4zOGEuNDUuNDUgMCAwIDAtLjQyLjM4bC0uOCAyLjU0QTcuNjQgNy42NCAwIDAgMSAxMCAyLjc4bS03LjIzIDcuMWE3LjEgNy4xIDAgMCAxIC4xNy0xLjUzbC0yLjU2LjgxYS40NC40NCAwIDAgMC0uMzguNDJ2MWEuNDQuNDQgMCAwIDAgLjM4LjQyaDIuNDdhNy42MiA3LjYyIDAgMCAxLS4wOC0xLjA4Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTEwIDcuMjZhMi41IDIuNSAwIDEgMCAwIDUgMi41IDIuNSAwIDEgMCAwLTV6bTAgMy43NWExLjI1IDEuMjUgMCAxIDEgMC0yLjUgMS4yNSAxLjI1IDAgMCAxIDEuMjUgMS4yNUExLjI1IDEuMjUgMCAwIDEgMTAgMTEuMDJ6Ii8+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(5, 7);
		    	icon1.vertex = true;
		    	bg.insert(icon1);
		    	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'App Engine');
			})
		);
		
		fns.push(
			this.addEntry('gcp google cloud platform expanded product cards app engine ', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 148, 78), 'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;');
		    	bg.vertex = true;
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>App Engine<hr><font style="font-size: 11px">Attribute Name</font>', 
			    		new mxGeometry(0, 0, 42, 42), 'sketch=0;dashed=0;connectable=0;html=1;part=1;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=top;spacingLeft=5;fontColor=#999999;fontSize=12;spacingTop=-8;shape=image;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE2LjAyMDAwMDQ1Nzc2MzY3MiIgZmlsbC1ydWxlPSJldmVub2RkIiB2aWV3Qm94PSI4Ljk0MDY5NjcxNjMwODU5NGUtOCAwIDIwIDE2LjAyMDAwMDQ1Nzc2MzY3MiI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJLnN0MXtmaWxsOiNhZWNiZmE7fSYjeGE7CS5zdDJ7ZmlsbDojNjY5ZGY2O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMi4zIDcuMjZsLTEuMjIgMS4yMkExLjcxIDEuNzEgMCAwIDEgMTAgMTEuNDlhMS43NCAxLjc0IDAgMCAxLTEuMzMtLjY0bC0xLjIyIDEuMjJhMy40MyAzLjQzIDAgMCAwIDUuOTg0LTEuMzgxQTMuNDMgMy40MyAwIDAgMCAxMi4zIDcuMjZ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTEwIDMuNTJhNi4yNSA2LjI1IDAgMCAwIDAgMTIuNSA2LjI1IDYuMjUgMCAwIDAgMC0xMi41bTAgMTAuNzRhNC40NSA0LjQ1IDAgMCAxLTMuMTU3LTcuNTk3QTQuNDUgNC40NSAwIDAgMSAxNC40NCA5LjgyIDQuNDQgNC40NCAwIDAgMSAxMCAxNC4yNiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xOS42MiA5LjE2bC0yLjU2LS44MWE3LjEgNy4xIDAgMCAxIC4xNyAxLjUzIDcuNjIgNy42MiAwIDAgMS0uMDggMS4wOGgyLjQ3YS40NC40NCAwIDAgMCAuMzgtLjQydi0xYS40NC40NCAwIDAgMC0uMzgtLjQyTTEwIDIuNzhhNy40OCA3LjQ4IDAgMCAxIDEuNS4xNUwxMC41OC4zOGMtLjA3LS4yMi0uMjEtLjM4LS40Mi0uMzhoLS4zOGEuNDUuNDUgMCAwIDAtLjQyLjM4bC0uOCAyLjU0QTcuNjQgNy42NCAwIDAgMSAxMCAyLjc4bS03LjIzIDcuMWE3LjEgNy4xIDAgMCAxIC4xNy0xLjUzbC0yLjU2LjgxYS40NC40NCAwIDAgMC0uMzguNDJ2MWEuNDQuNDQgMCAwIDAgLjM4LjQyaDIuNDdhNy42MiA3LjYyIDAgMCAxLS4wOC0xLjA4Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTEwIDcuMjZhMi41IDIuNSAwIDEgMCAwIDUgMi41IDIuNSAwIDEgMCAwLTV6bTAgMy43NWExLjI1IDEuMjUgMCAxIDEgMC0yLjUgMS4yNSAxLjI1IDAgMCAxIDEuMjUgMS4yNUExLjI1IDEuMjUgMCAwIDEgMTAgMTEuMDJ6Ii8+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(5, 7);
		    	icon1.vertex = true;
		    	bg.insert(icon1);
		    	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'App Engine');
			})			
		);

		fns.push(
			this.addEntry('gcp google cloud platform expanded product cards dataflow ', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 140, 70), 'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Dataflow<hr><font style="font-size: 11px">Attribute Name</font>', 
			    		new mxGeometry(0, 0, 42, 42), 'sketch=0;dashed=0;connectable=0;html=1;part=1;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=top;spacingLeft=5;fontColor=#999999;fontSize=12;spacingTop=-8;shape=image;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE0LjUxOTk5OTUwNDA4OTM1NSIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDE0LjUxOTk5OTUwNDA4OTM1NSAyMCI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGwtcnVsZTpldmVub2RkfSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJLnN0M3tmaWxsOiM0Mjg1ZjQ7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPGcgY2xhc3M9InN0MCI+JiN4YTsJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik03LjM3IDIuMDNsLTEuNzIuOTYgMS41MiAxLjUtLjAyIDEuNzMgMS4wMi4wMS4wMi0xLjczIDQuMjQgMi41Ni0uMDEgMS4wNyAxLjc3LjAzVjYuMTFMOS4wNSAzLjA0bC0uMjctLjk0eiIvPiYjeGE7CQk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNNy4zNiAyLjAzbC0xLjQyLjM1LS4yOS42MUwuMzkgNS45Mi4zNiA3Ljk3IDIuMTQgOGwuMDItMS4wNyA0LjMxLTIuNDUtLjAyIDEuNzMuODYuMDEuMDYtNC4xOXoiLz4mI3hhOwkJPGcgY2xhc3M9InN0MSI+JiN4YTsJCQk8cGF0aCBkPSJNNy4zNiAyLjAzTDMuOTUgMCAyLjIxLjk1bDMuNDQgMi4wNCAxLjcyLS45NnptLjcxIDExLjc2bC0xLjcyLS4wMi0uMDIgMS43Mi44MiAyLjQ4IDEuNDItLjEyLjI5LS44NSA1LjI3LTIuOTMuMDMtMi4wOS0xLjc5LS4wMi0uMDIgMS4xLTQuMyAyLjQ1eiIvPiYjeGE7CQkJPHBhdGggZD0iTTcuMTUgMTcuOTdsLTMuNDYgMS45NGgtLjA1bC0xLjY2LS45OSAzLjQ5LTEuOTYgMS42OCAxLjAxeiIvPiYjeGE7CQk8L2c+JiN4YTsJCTxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik0xMC44OC4wOWgtLjA1TDcuMzcgMi4wM2wxLjY4IDEuMDEgMy40OS0xLjk2ek0xMC42MiAyMGgtLjA1bC0zLjQyLTIuMDNoMCAwIDBsMS43Mi0uOTYgMy40NCAyLjA0eiIvPiYjeGE7CQk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNLjMzIDEzLjg5di0yaDEuNzZsLS4wMSAxLjA0IDQuMjUgMi41Ni4wMi0xLjcyLjg2LjAxLS4wNiA0LjE4LTEuNjgtMXoiLz4mI3hhOwk8L2c+JiN4YTsJPGNpcmNsZSBjbGFzcz0ic3QyIiBjeD0iMTMuMzgiIGN5PSIxMC4wNCIgcj0iMS4xNCIvPiYjeGE7CTxjaXJjbGUgY2xhc3M9InN0MiIgY3g9IjEuMTQiIGN5PSI5Ljg4IiByPSIxLjE0Ii8+JiN4YTsJPGNpcmNsZSBjbGFzcz0ic3QyIiBjeD0iNy4zMiIgY3k9IjcuOTkiIHI9IjEuMTQiLz4mI3hhOwk8Y2lyY2xlIGNsYXNzPSJzdDIiIGN4PSI3LjIzIiBjeT0iMTIiIHI9IjEuMTQiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(5, 7);
		    	icon1.vertex = true;
		    	bg.insert(icon1);
		    	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Dataflow');
			})
		);
		
		fns.push(
			this.addEntry('gcp google cloud platform expanded product cards dataflow ', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 148, 78), 'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;');
		    	bg.vertex = true;
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Dataflow<hr><font style="font-size: 11px">Attribute Name</font>', 
			    		new mxGeometry(0, 0, 42, 42), 'sketch=0;dashed=0;connectable=0;html=1;part=1;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=top;spacingLeft=5;fontColor=#999999;fontSize=12;spacingTop=-8;shape=image;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE0LjUxOTk5OTUwNDA4OTM1NSIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDE0LjUxOTk5OTUwNDA4OTM1NSAyMCI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGwtcnVsZTpldmVub2RkfSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJLnN0M3tmaWxsOiM0Mjg1ZjQ7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPGcgY2xhc3M9InN0MCI+JiN4YTsJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik03LjM3IDIuMDNsLTEuNzIuOTYgMS41MiAxLjUtLjAyIDEuNzMgMS4wMi4wMS4wMi0xLjczIDQuMjQgMi41Ni0uMDEgMS4wNyAxLjc3LjAzVjYuMTFMOS4wNSAzLjA0bC0uMjctLjk0eiIvPiYjeGE7CQk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNNy4zNiAyLjAzbC0xLjQyLjM1LS4yOS42MUwuMzkgNS45Mi4zNiA3Ljk3IDIuMTQgOGwuMDItMS4wNyA0LjMxLTIuNDUtLjAyIDEuNzMuODYuMDEuMDYtNC4xOXoiLz4mI3hhOwkJPGcgY2xhc3M9InN0MSI+JiN4YTsJCQk8cGF0aCBkPSJNNy4zNiAyLjAzTDMuOTUgMCAyLjIxLjk1bDMuNDQgMi4wNCAxLjcyLS45NnptLjcxIDExLjc2bC0xLjcyLS4wMi0uMDIgMS43Mi44MiAyLjQ4IDEuNDItLjEyLjI5LS44NSA1LjI3LTIuOTMuMDMtMi4wOS0xLjc5LS4wMi0uMDIgMS4xLTQuMyAyLjQ1eiIvPiYjeGE7CQkJPHBhdGggZD0iTTcuMTUgMTcuOTdsLTMuNDYgMS45NGgtLjA1bC0xLjY2LS45OSAzLjQ5LTEuOTYgMS42OCAxLjAxeiIvPiYjeGE7CQk8L2c+JiN4YTsJCTxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik0xMC44OC4wOWgtLjA1TDcuMzcgMi4wM2wxLjY4IDEuMDEgMy40OS0xLjk2ek0xMC42MiAyMGgtLjA1bC0zLjQyLTIuMDNoMCAwIDBsMS43Mi0uOTYgMy40NCAyLjA0eiIvPiYjeGE7CQk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNLjMzIDEzLjg5di0yaDEuNzZsLS4wMSAxLjA0IDQuMjUgMi41Ni4wMi0xLjcyLjg2LjAxLS4wNiA0LjE4LTEuNjgtMXoiLz4mI3hhOwk8L2c+JiN4YTsJPGNpcmNsZSBjbGFzcz0ic3QyIiBjeD0iMTMuMzgiIGN5PSIxMC4wNCIgcj0iMS4xNCIvPiYjeGE7CTxjaXJjbGUgY2xhc3M9InN0MiIgY3g9IjEuMTQiIGN5PSI5Ljg4IiByPSIxLjE0Ii8+JiN4YTsJPGNpcmNsZSBjbGFzcz0ic3QyIiBjeD0iNy4zMiIgY3k9IjcuOTkiIHI9IjEuMTQiLz4mI3hhOwk8Y2lyY2xlIGNsYXNzPSJzdDIiIGN4PSI3LjIzIiBjeT0iMTIiIHI9IjEuMTQiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(5, 7);
		    	icon1.vertex = true;
		    	bg.insert(icon1);
		    	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Dataflow');
			})			
		);

		fns.push(
			this.addEntry('gcp google cloud platform expanded product cards kubernetes engine ', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 170, 70), 'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Kubernetes Engine<hr><font style="font-size: 11px">Attribute Name</font>', 
			    		new mxGeometry(0, 0, 42, 42), 'sketch=0;dashed=0;connectable=0;html=1;part=1;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=top;spacingLeft=5;fontColor=#999999;fontSize=12;spacingTop=-8;shape=image;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjMyOS45MjU5OTcyMzE3OTM4IiBoZWlnaHQ9IjM3OC4yODQ5OTAzMTEyNzg4IiB2aWV3Qm94PSIwIDAgODcuMjkyOTk5MjY3NTc4MTIgMTAwLjA4Nzk5NzQzNjUyMzQ0Ij4mI3hhOzxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiNhZWNiZmE7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6IzQyODVmNDt9JiN4YTs8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00My43NTEgMEwwIDI1LjQ2NXYyLjU4OCA0Ni45Mmw0My43NTIgMjUuMTE1IDQzLjU0MS0yNS4xMjFWMjUuNDczem0yLjQzOCAxMS44NTNsMzIuMTAzIDE4Ljc4MlY2OS43N0w0My43MzkgODkuNzA1IDkgNjkuNzYyVjMwLjY0MWwzMi4xOS0xOC43MzZ2MTQuMTU0TDI0LjUwMyAzNi4xNTNsMTkuMTcyIDExLjUwMiAxOC44ODYtMTEuNTU0LTE2LjM3Mi0xMC4wMjR6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTIyLjAyNSA0MC40OTZsLjE2NiAxOS4xNDMtMTMuMjQ3IDcuMzN2Mi43NDJsMi42MzcgMS41MTQgMTIuNjQ4LTYuOTk5IDE2Ljk2MSAxMC42MDJWNTEuOTkzeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik02NS4zNDQgNDAuMjZMNDYuMTg5IDUxLjk3OXYyMi44NDdsMTYuODk5LTEwLjU3NiAxMi41MzkgNi45NzQgMi42MDktMS41MDV2LTIuNzY1bC0xMi43ODQtNy4xMTJ6Ii8+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(5, 7);
		    	icon1.vertex = true;
		    	bg.insert(icon1);
		    	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Kubernetes Engine');
			})
		);
		
		fns.push(
			this.addEntry('gcp google cloud platform expanded product cards kubernetes engine ', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 178, 78), 'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;');
		    	bg.vertex = true;
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Kubernetes Engine<hr><font style="font-size: 11px">Attribute Name</font>', 
			    		new mxGeometry(0, 0, 42, 42), 'sketch=0;dashed=0;connectable=0;html=1;part=1;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=top;spacingLeft=5;fontColor=#999999;fontSize=12;spacingTop=-8;shape=image;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjMyOS45MjU5OTcyMzE3OTM4IiBoZWlnaHQ9IjM3OC4yODQ5OTAzMTEyNzg4IiB2aWV3Qm94PSIwIDAgODcuMjkyOTk5MjY3NTc4MTIgMTAwLjA4Nzk5NzQzNjUyMzQ0Ij4mI3hhOzxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiNhZWNiZmE7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6IzQyODVmNDt9JiN4YTs8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00My43NTEgMEwwIDI1LjQ2NXYyLjU4OCA0Ni45Mmw0My43NTIgMjUuMTE1IDQzLjU0MS0yNS4xMjFWMjUuNDczem0yLjQzOCAxMS44NTNsMzIuMTAzIDE4Ljc4MlY2OS43N0w0My43MzkgODkuNzA1IDkgNjkuNzYyVjMwLjY0MWwzMi4xOS0xOC43MzZ2MTQuMTU0TDI0LjUwMyAzNi4xNTNsMTkuMTcyIDExLjUwMiAxOC44ODYtMTEuNTU0LTE2LjM3Mi0xMC4wMjR6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTIyLjAyNSA0MC40OTZsLjE2NiAxOS4xNDMtMTMuMjQ3IDcuMzN2Mi43NDJsMi42MzcgMS41MTQgMTIuNjQ4LTYuOTk5IDE2Ljk2MSAxMC42MDJWNTEuOTkzeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik02NS4zNDQgNDAuMjZMNDYuMTg5IDUxLjk3OXYyMi44NDdsMTYuODk5LTEwLjU3NiAxMi41MzkgNi45NzQgMi42MDktMS41MDV2LTIuNzY1bC0xMi43ODQtNy4xMTJ6Ii8+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(5, 7);
		    	icon1.vertex = true;
		    	bg.insert(icon1);
		    	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Kubernetes Engine');
			})			
		);

		fns.push(
			this.addEntry('gcp google cloud platform expanded product cards cloud storage ', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 140, 70), 'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Storage<hr><font style="font-size: 11px">Attribute Name</font>', 
			    		new mxGeometry(0, 0, 42, 42), 'sketch=0;dashed=0;connectable=0;html=1;part=1;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=top;spacingLeft=5;fontColor=#999999;fontSize=12;spacingTop=-8;shape=image;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE2IiB2aWV3Qm94PSIwIDAgMjAgMTYiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJLnN0M3tmaWxsOiNmZmY7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTAgMGgyMHY3SDB6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTE4IDBoMnY3aC0yeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xOCA3bDItN2gtMnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMCAwaDJ2N0gweiIvPiYjeGE7CTxnIGNsYXNzPSJzdDMiPiYjeGE7CQk8cGF0aCBkPSJNNCAzaDZ2MUg0eiIvPiYjeGE7CQk8cmVjdCB4PSIxMyIgeT0iMiIgd2lkdGg9IjMiIGhlaWdodD0iMyIgcng9IjEuNSIvPiYjeGE7CTwvZz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMCA5aDIwdjdIMHoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTggOWgydjdoLTJ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTE4IDE2bDItN2gtMnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMCA5aDJ2N0gweiIvPiYjeGE7CTxnIGNsYXNzPSJzdDMiPiYjeGE7CQk8cGF0aCBkPSJNNCAxMmg2djFINHoiLz4mI3hhOwkJPHJlY3QgeD0iMTMiIHk9IjExIiB3aWR0aD0iMyIgaGVpZ2h0PSIzIiByeD0iMS41Ii8+JiN4YTsJPC9nPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(5, 7);
		    	icon1.vertex = true;
		    	bg.insert(icon1);
		    	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Storage');
			})
		);
		
		fns.push(
			this.addEntry('gcp google cloud platform expanded product cards cloud storage ', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 148, 78), 'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;');
		    	bg.vertex = true;
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Storage<hr><font style="font-size: 11px">Attribute Name</font>', 
			    		new mxGeometry(0, 0, 42, 42), 'sketch=0;dashed=0;connectable=0;html=1;part=1;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=top;spacingLeft=5;fontColor=#999999;fontSize=12;spacingTop=-8;shape=image;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE2IiB2aWV3Qm94PSIwIDAgMjAgMTYiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJLnN0M3tmaWxsOiNmZmY7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTAgMGgyMHY3SDB6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTE4IDBoMnY3aC0yeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xOCA3bDItN2gtMnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMCAwaDJ2N0gweiIvPiYjeGE7CTxnIGNsYXNzPSJzdDMiPiYjeGE7CQk8cGF0aCBkPSJNNCAzaDZ2MUg0eiIvPiYjeGE7CQk8cmVjdCB4PSIxMyIgeT0iMiIgd2lkdGg9IjMiIGhlaWdodD0iMyIgcng9IjEuNSIvPiYjeGE7CTwvZz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMCA5aDIwdjdIMHoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTggOWgydjdoLTJ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTE4IDE2bDItN2gtMnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMCA5aDJ2N0gweiIvPiYjeGE7CTxnIGNsYXNzPSJzdDMiPiYjeGE7CQk8cGF0aCBkPSJNNCAxMmg2djFINHoiLz4mI3hhOwkJPHJlY3QgeD0iMTMiIHk9IjExIiB3aWR0aD0iMyIgaGVpZ2h0PSIzIiByeD0iMS41Ii8+JiN4YTsJPC9nPiYjeGE7PC9zdmc+;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(5, 7);
		    	icon1.vertex = true;
		    	bg.insert(icon1);
		    	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Storage');
			})			
		);

		fns.push(
			this.addEntry('gcp google cloud platform expanded product cards cloud bigtable ', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 140, 70), 'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Bigtable<hr><font style="font-size: 11px">Attribute Name</font>', 
			    		new mxGeometry(0, 0, 42, 42), 'sketch=0;dashed=0;connectable=0;html=1;part=1;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=top;spacingLeft=5;fontColor=#999999;fontSize=12;spacingTop=-8;shape=image;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE3Ljk1Njk3Nzg0NDIzODI4IiBoZWlnaHQ9IjIwLjAwOTI1NjM2MjkxNTA0IiB2aWV3Qm94PSItMC4wMDA0MjE5NjUxMTY0MDIxMzQzIDAuMDAwMDc0Njk5NTIxMDY0NzU4MyAxNy45NTY5Nzc4NDQyMzgyOCAyMC4wMDkyNTYzNjI5MTUwNCI+JiN4YTsJPHN0eWxlPiYjeGE7CQkuc3Qwe2ZpbGw6IzY2OWRmNjt9JiN4YTsJCS5zdDF7ZmlsbDojYWVjYmZhO30mI3hhOwkJLnN0MntmaWxsOiM0Mjg1ZjQ7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPGcgZmlsbC1ydWxlPSJldmVub2RkIj4mI3hhOwkJPHBhdGggZD0iTTEzLjE5NiA0LjQ0N2wtNC4yMi0yLjUxYTIuODYgMi44NiAwIDAgMS0xLjI1LTEuNzFjMCAwIC4xNi0uMzIuMzgtLjJsNS4yNSAzLjFjLjYzLjM3LjI0IDIgLjI0IDJhLjc3Ljc3IDAgMCAwLS40LS42OHoiIGNsYXNzPSJzdDAiLz4mI3hhOwkJPHBhdGggZD0iTTE0LjQ2NiAxMC42ODdhLjM1LjM1IDAgMCAxLS4xNi4zM2wtMSAuNjh2LTcuOTVjMC0uMjcuMTctLjU2LS4wNi0uN2wuOTIuNjhhLjczLjczIDAgMCAxIC4zNS42NXoiIGNsYXNzPSJzdDEiLz4mI3hhOwkJPHBhdGggZD0iTTguOTc2IDExLjU5N2EuMzYuMzYgMCAwIDEtLjItLjA2bC0zLjQ2LTIuMDZ2LjlsMy42NiAyLjE4LjI5LS41N3MtLjIyLS4zOS0uMjktLjM5em0uMiAxLjhhLjM2LjM2IDAgMCAxLS40IDBsLTMuNDYtMi4wNnYuNjZhLjQyLjQyIDAgMCAwIC4xOS4zNWwzLjI4IDJhLjM3LjM3IDAgMCAwIC4zOCAwIDIgMiAwIDAgMCAuMi0uNTJsLS4xOS0uMzl6IiBjbGFzcz0ic3QwIi8+JiN4YTsJCTxwYXRoIGQ9Ik04Ljk3NiAxMC43MjdsMy42Ni0yLjE4di0uNDNhLjM5LjM5IDAgMCAwLS4xOS0uMzRsLTMuMjgtMmEuMzcuMzcgMCAwIDAtLjM4IDBsLTMuMjggMmEuNDEuNDEgMCAwIDAtLjE5LjM0di40M3oiIGNsYXNzPSJzdDEiLz4mI3hhOwkJPHBhdGggZD0iTTguOTc2IDkuODI3bC0zLjQ3LTIuMDVhLjQxLjQxIDAgMCAwLS4xOS4zNHYuNDNsMy42NiAyLjE4LjI4LS41NnoiIGNsYXNzPSJzdDAiLz4mI3hhOwkJPGcgY2xhc3M9InN0MiI+JiN4YTsJCQk8cGF0aCBkPSJNOC45NzYgMTEuNTk3djFsMy42Ni0yLjE4di0uOWwtMy40NiAyLjAyYS42NS42NSAwIDAgMS0uMi4wNnptLjIgMS44YS4zNi4zNiAwIDAgMS0uMi4wNnYuOWEuNS41IDAgMCAwIC4yMS0uMDVsMy4yOC0yYS4zOS4zOSAwIDAgMCAuMTktLjM1di0uNjZ6Ii8+JiN4YTsJCQk8cGF0aCBkPSJNMTIuNDQ2IDcuNzc3bC0zLjQ3IDIuMDV2LjlsMy42Ni0yLjE4di0uNDNhLjM5LjM5IDAgMCAwLS4xOS0uMzR6Ii8+JiN4YTsJCTwvZz4mI3hhOwkJPHBhdGggZD0iTTQuNzU2IDE1LjUyN2w0LjE1IDIuNDdhMi43MiAyLjcyIDAgMCAxIDEuMjggMS44LjE4LjE4IDAgMCAxLS4yOC4xOGwtNS40NS0zLjIzYy0uNTMtLjMyLS4wNy0xLjg4LS4wNy0xLjg4YS43Ny43NyAwIDAgMCAuMzcuNjZ6IiBjbGFzcz0ic3QwIi8+JiN4YTsJCTxwYXRoIGQ9Ik0zLjQ4NiAxNS43Mjd2LTYuNTZhLjQxLjQxIDAgMCAxIC4xOS0uMzNsMS0uNTl2Ny45MWMwIC4yNyAwIC42OS4yMS44M2wtMS4wNi0uNjZhLjc1Ljc1IDAgMCAxLS4zNC0uNnoiIGNsYXNzPSJzdDEiLz4mI3hhOwkJPHBhdGggZD0iTTcuMTM2IDMuNDU3YS43NS43NSAwIDAgMC0uNzQgMGwtNC4yIDIuNTRhMi42MyAyLjYzIDAgMCAxLTIuMDguMjYuMjMuMjMgMCAwIDEgMC0uNGMuMTgtLjA5IDYuMzItMy43NCA2LjMyLTMuNzQuMjMtLjE0Ljc0IDEuMzkuNzQgMS4zOXoiIGNsYXNzPSJzdDAiLz4mI3hhOwkJPHBhdGggZD0iTTcuMTI2IDIuMDc3bDUuMzIgMy4xNWEuMzcuMzcgMCAwIDEgLjIuMzF2MS4xOGwtNi42Ny0zLjk2YS43NS43NSAwIDAgMC0uNzQgMGwxLjE4LS42OWEuNzEuNzEgMCAwIDEgLjczIDB6IiBjbGFzcz0ic3QxIi8+JiN4YTsJCTxwYXRoIGQ9Ik0xMC43OTYgMTYuNDg3YS43My43MyAwIDAgMCAuNzQgMGw0LjItMi40OWEyLjYzIDIuNjMgMCAwIDEgMi4xLS4yNS4yMS4yMSAwIDAgMSAwIC4zOGwtNi4zMyAzLjc1Yy0uMjIuMTQtLjc0LTEuNC0uNzQtMS40eiIgY2xhc3M9InN0MCIvPiYjeGE7CQk8cGF0aCBkPSJNNS40ODYgMTQuNzQ3YS41Ni41NiAwIDAgMS0uMTctLjMzdi0xLjE2bDYuNjYgMy45M2EuNjkuNjkgMCAwIDAgLjczIDBsLTEuMTguN2EuNy43IDAgMCAxLS43NCAweiIgY2xhc3M9InN0MSIvPiYjeGE7CQk8cGF0aCBkPSJNMy4yMzYgNy44MDdhLjc2Ljc2IDAgMCAwLS4zNy42NXY1YTIuNzUgMi43NSAwIDAgMS0uODcgMiAuMTguMTggMCAwIDEtLjMtLjEzdi03LjU2YzAtLjI4IDEuNTQgMCAxLjU0IDB6IiBjbGFzcz0ic3QwIi8+JiN4YTsJCTxwYXRoIGQ9Ik02Ljc0NiA0LjUxN2EuMzQuMzQgMCAwIDEgLjM2IDBsMSAuNTktNi4wOCAzLjU2YS43Ny43NyAwIDAgMC0uMzcuNjZ2LTEuMzlhLjcyLjcyIDAgMCAxIC4zOC0uNjR6IiBjbGFzcz0ic3QxIi8+JiN4YTsJCTxwYXRoIGQ9Ik0xNS4xNDYgMTEuNDM3di01YTIuODEgMi44MSAwIDAgMSAuODQtMmMwIDAgLjMzLS4xMS4zMS4yMXMwIDcuMzcgMCA3LjM3Yy0uMzEuMzctMS42MSAwLTEuNjEgMGEuODEuODEgMCAwIDAgLjQ2LS41OHoiIGNsYXNzPSJzdDAiLz4mI3hhOwkJPHBhdGggZD0iTTE1Ljk3NiAxMi42MDdsLTQuNzQgMi44NWEuMzUuMzUgMCAwIDEtLjM3IDBsLTEtLjU3IDYuMTEtMy42N2EuNzcuNzcgMCAwIDAgLjM3LS42NnYxLjQ0Yy0uMDIuMjMtLjM3LjYxLS4zNy42MXoiIGNsYXNzPSJzdDEiLz4mI3hhOwk8L2c+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(5, 7);
		    	icon1.vertex = true;
		    	bg.insert(icon1);
		    	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Bigtable');
			})
		);
		
		fns.push(
			this.addEntry('gcp google cloud platform expanded product cards cloud bigtable ', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 148, 78), 'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;');
		    	bg.vertex = true;
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Bigtable<hr><font style="font-size: 11px">Attribute Name</font>', 
			    		new mxGeometry(0, 0, 42, 42), 'sketch=0;dashed=0;connectable=0;html=1;part=1;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=top;spacingLeft=5;fontColor=#999999;fontSize=12;spacingTop=-8;shape=image;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE3Ljk1Njk3Nzg0NDIzODI4IiBoZWlnaHQ9IjIwLjAwOTI1NjM2MjkxNTA0IiB2aWV3Qm94PSItMC4wMDA0MjE5NjUxMTY0MDIxMzQzIDAuMDAwMDc0Njk5NTIxMDY0NzU4MyAxNy45NTY5Nzc4NDQyMzgyOCAyMC4wMDkyNTYzNjI5MTUwNCI+JiN4YTsJPHN0eWxlPiYjeGE7CQkuc3Qwe2ZpbGw6IzY2OWRmNjt9JiN4YTsJCS5zdDF7ZmlsbDojYWVjYmZhO30mI3hhOwkJLnN0MntmaWxsOiM0Mjg1ZjQ7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPGcgZmlsbC1ydWxlPSJldmVub2RkIj4mI3hhOwkJPHBhdGggZD0iTTEzLjE5NiA0LjQ0N2wtNC4yMi0yLjUxYTIuODYgMi44NiAwIDAgMS0xLjI1LTEuNzFjMCAwIC4xNi0uMzIuMzgtLjJsNS4yNSAzLjFjLjYzLjM3LjI0IDIgLjI0IDJhLjc3Ljc3IDAgMCAwLS40LS42OHoiIGNsYXNzPSJzdDAiLz4mI3hhOwkJPHBhdGggZD0iTTE0LjQ2NiAxMC42ODdhLjM1LjM1IDAgMCAxLS4xNi4zM2wtMSAuNjh2LTcuOTVjMC0uMjcuMTctLjU2LS4wNi0uN2wuOTIuNjhhLjczLjczIDAgMCAxIC4zNS42NXoiIGNsYXNzPSJzdDEiLz4mI3hhOwkJPHBhdGggZD0iTTguOTc2IDExLjU5N2EuMzYuMzYgMCAwIDEtLjItLjA2bC0zLjQ2LTIuMDZ2LjlsMy42NiAyLjE4LjI5LS41N3MtLjIyLS4zOS0uMjktLjM5em0uMiAxLjhhLjM2LjM2IDAgMCAxLS40IDBsLTMuNDYtMi4wNnYuNjZhLjQyLjQyIDAgMCAwIC4xOS4zNWwzLjI4IDJhLjM3LjM3IDAgMCAwIC4zOCAwIDIgMiAwIDAgMCAuMi0uNTJsLS4xOS0uMzl6IiBjbGFzcz0ic3QwIi8+JiN4YTsJCTxwYXRoIGQ9Ik04Ljk3NiAxMC43MjdsMy42Ni0yLjE4di0uNDNhLjM5LjM5IDAgMCAwLS4xOS0uMzRsLTMuMjgtMmEuMzcuMzcgMCAwIDAtLjM4IDBsLTMuMjggMmEuNDEuNDEgMCAwIDAtLjE5LjM0di40M3oiIGNsYXNzPSJzdDEiLz4mI3hhOwkJPHBhdGggZD0iTTguOTc2IDkuODI3bC0zLjQ3LTIuMDVhLjQxLjQxIDAgMCAwLS4xOS4zNHYuNDNsMy42NiAyLjE4LjI4LS41NnoiIGNsYXNzPSJzdDAiLz4mI3hhOwkJPGcgY2xhc3M9InN0MiI+JiN4YTsJCQk8cGF0aCBkPSJNOC45NzYgMTEuNTk3djFsMy42Ni0yLjE4di0uOWwtMy40NiAyLjAyYS42NS42NSAwIDAgMS0uMi4wNnptLjIgMS44YS4zNi4zNiAwIDAgMS0uMi4wNnYuOWEuNS41IDAgMCAwIC4yMS0uMDVsMy4yOC0yYS4zOS4zOSAwIDAgMCAuMTktLjM1di0uNjZ6Ii8+JiN4YTsJCQk8cGF0aCBkPSJNMTIuNDQ2IDcuNzc3bC0zLjQ3IDIuMDV2LjlsMy42Ni0yLjE4di0uNDNhLjM5LjM5IDAgMCAwLS4xOS0uMzR6Ii8+JiN4YTsJCTwvZz4mI3hhOwkJPHBhdGggZD0iTTQuNzU2IDE1LjUyN2w0LjE1IDIuNDdhMi43MiAyLjcyIDAgMCAxIDEuMjggMS44LjE4LjE4IDAgMCAxLS4yOC4xOGwtNS40NS0zLjIzYy0uNTMtLjMyLS4wNy0xLjg4LS4wNy0xLjg4YS43Ny43NyAwIDAgMCAuMzcuNjZ6IiBjbGFzcz0ic3QwIi8+JiN4YTsJCTxwYXRoIGQ9Ik0zLjQ4NiAxNS43Mjd2LTYuNTZhLjQxLjQxIDAgMCAxIC4xOS0uMzNsMS0uNTl2Ny45MWMwIC4yNyAwIC42OS4yMS44M2wtMS4wNi0uNjZhLjc1Ljc1IDAgMCAxLS4zNC0uNnoiIGNsYXNzPSJzdDEiLz4mI3hhOwkJPHBhdGggZD0iTTcuMTM2IDMuNDU3YS43NS43NSAwIDAgMC0uNzQgMGwtNC4yIDIuNTRhMi42MyAyLjYzIDAgMCAxLTIuMDguMjYuMjMuMjMgMCAwIDEgMC0uNGMuMTgtLjA5IDYuMzItMy43NCA2LjMyLTMuNzQuMjMtLjE0Ljc0IDEuMzkuNzQgMS4zOXoiIGNsYXNzPSJzdDAiLz4mI3hhOwkJPHBhdGggZD0iTTcuMTI2IDIuMDc3bDUuMzIgMy4xNWEuMzcuMzcgMCAwIDEgLjIuMzF2MS4xOGwtNi42Ny0zLjk2YS43NS43NSAwIDAgMC0uNzQgMGwxLjE4LS42OWEuNzEuNzEgMCAwIDEgLjczIDB6IiBjbGFzcz0ic3QxIi8+JiN4YTsJCTxwYXRoIGQ9Ik0xMC43OTYgMTYuNDg3YS43My43MyAwIDAgMCAuNzQgMGw0LjItMi40OWEyLjYzIDIuNjMgMCAwIDEgMi4xLS4yNS4yMS4yMSAwIDAgMSAwIC4zOGwtNi4zMyAzLjc1Yy0uMjIuMTQtLjc0LTEuNC0uNzQtMS40eiIgY2xhc3M9InN0MCIvPiYjeGE7CQk8cGF0aCBkPSJNNS40ODYgMTQuNzQ3YS41Ni41NiAwIDAgMS0uMTctLjMzdi0xLjE2bDYuNjYgMy45M2EuNjkuNjkgMCAwIDAgLjczIDBsLTEuMTguN2EuNy43IDAgMCAxLS43NCAweiIgY2xhc3M9InN0MSIvPiYjeGE7CQk8cGF0aCBkPSJNMy4yMzYgNy44MDdhLjc2Ljc2IDAgMCAwLS4zNy42NXY1YTIuNzUgMi43NSAwIDAgMS0uODcgMiAuMTguMTggMCAwIDEtLjMtLjEzdi03LjU2YzAtLjI4IDEuNTQgMCAxLjU0IDB6IiBjbGFzcz0ic3QwIi8+JiN4YTsJCTxwYXRoIGQ9Ik02Ljc0NiA0LjUxN2EuMzQuMzQgMCAwIDEgLjM2IDBsMSAuNTktNi4wOCAzLjU2YS43Ny43NyAwIDAgMC0uMzcuNjZ2LTEuMzlhLjcyLjcyIDAgMCAxIC4zOC0uNjR6IiBjbGFzcz0ic3QxIi8+JiN4YTsJCTxwYXRoIGQ9Ik0xNS4xNDYgMTEuNDM3di01YTIuODEgMi44MSAwIDAgMSAuODQtMmMwIDAgLjMzLS4xMS4zMS4yMXMwIDcuMzcgMCA3LjM3Yy0uMzEuMzctMS42MSAwLTEuNjEgMGEuODEuODEgMCAwIDAgLjQ2LS41OHoiIGNsYXNzPSJzdDAiLz4mI3hhOwkJPHBhdGggZD0iTTE1Ljk3NiAxMi42MDdsLTQuNzQgMi44NWEuMzUuMzUgMCAwIDEtLjM3IDBsLTEtLjU3IDYuMTEtMy42N2EuNzcuNzcgMCAwIDAgLjM3LS42NnYxLjQ0Yy0uMDIuMjMtLjM3LjYxLS4zNy42MXoiIGNsYXNzPSJzdDEiLz4mI3hhOwk8L2c+JiN4YTs8L3N2Zz4=;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(5, 7);
		    	icon1.vertex = true;
		    	bg.insert(icon1);
		    	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Bigtable');
			})			
		);

		fns.push(
			this.addEntry('gcp google cloud platform expanded product cards cloud pub sub ', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 140, 70), 'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Pub/Sub<hr><font style="font-size: 11px">Attribute Name</font>', 
			    		new mxGeometry(0, 0, 42, 42), 'sketch=0;dashed=0;connectable=0;html=1;part=1;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=top;spacingLeft=5;fontColor=#999999;fontSize=12;spacingTop=-8;shape=image;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE4LjMxOTk5OTY5NDgyNDIyIiBoZWlnaHQ9IjIwLjAwMDAwMTkwNzM0ODYzMyIgdmlld0JveD0iMCAwIDE4LjMxOTk5OTY5NDgyNDIyIDIwLjAwMDAwMTkwNzM0ODYzMyI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzY2OWRmNjt9JiN4YTsJLnN0MXtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDJ7ZmlsbDojYWVjYmZhO30mI3hhOwk8L3N0eWxlPiYjeGE7CTxkZWZzPiYjeGE7CQk8ZmlsdGVyIGlkPSJBIiB4PSI0LjY0IiB5PSI0LjE5IiB3aWR0aD0iMTQuNzMiIGhlaWdodD0iMTIuNzYiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj4mI3hhOwkJCTxmZUZsb29kIGZsb29kLWNvbG9yPSIjZmZmIi8+JiN4YTsJCQk8ZmVCbGVuZCBpbj0iU291cmNlR3JhcGhpYyIvPiYjeGE7CQk8L2ZpbHRlcj4mI3hhOwkJPG1hc2sgaWQ9IkIiIHg9IjQuNjQiIHk9IjQuMTkiIHdpZHRoPSIxNC43MyIgaGVpZ2h0PSIxMi43NiIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSI+JiN4YTsJCQk8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyLjIzIiByPSIzLjU4IiBmaWx0ZXI9InVybCgjQSkiLz4mI3hhOwkJPC9tYXNrPiYjeGE7CTwvZGVmcz4mI3hhOwk8ZyBjbGFzcz0ic3QwIj4mI3hhOwkJPGNpcmNsZSBjeD0iMTYuMTMiIGN5PSI2LjIxIiByPSIxLjcyIi8+JiN4YTsJCTxjaXJjbGUgY3g9IjIuMTkiIGN5PSI2LjIxIiByPSIxLjcyIi8+JiN4YTsJCTxjaXJjbGUgY3g9IjkuMTYiIGN5PSIxOC4yOCIgcj0iMS43MiIvPiYjeGE7CTwvZz4mI3hhOwk8ZyBtYXNrPSJ1cmwoI0IpIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMi44NCAtMikiPiYjeGE7CQk8cGF0aCB0cmFuc2Zvcm09Im1hdHJpeCguNSAtLjg3IC44NyAuNSAtNC41OSAyMC41MykiIGQ9Ik0xNC42OSAxMC4yMmgxLjU5djguMDRoLTEuNTl6IiBjbGFzcz0ic3QxIi8+JiN4YTsJCTxwYXRoIHRyYW5zZm9ybT0icm90YXRlKDMzMCA4LjUyMyAxNC4yNDQpIiBkPSJNNC40OSAxMy40NWg4LjA0djEuNTlINC40OXoiIGNsYXNzPSJzdDEiLz4mI3hhOwkJPHBhdGggZD0iTTExLjIgNC4xOWgxLjU5djguMDRIMTEuMnoiIGNsYXNzPSJzdDEiLz4mI3hhOwk8L2c+JiN4YTsJPGcgY2xhc3M9InN0MiI+JiN4YTsJCTxjaXJjbGUgY3g9IjkuMTYiIGN5PSIxMC4yMyIgcj0iMi43OCIvPiYjeGE7CQk8Y2lyY2xlIGN4PSIyLjE5IiBjeT0iMTQuMjUiIHI9IjIuMTkiLz4mI3hhOwkJPGNpcmNsZSBjeD0iMTYuMTMiIGN5PSIxNC4yNSIgcj0iMi4xOSIvPiYjeGE7CQk8Y2lyY2xlIGN4PSI5LjE2IiBjeT0iMi4xOSIgcj0iMi4xOSIvPiYjeGE7CTwvZz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(5, 7);
		    	icon1.vertex = true;
		    	bg.insert(icon1);
		    	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Pub/Sub');
			})
		);
		
		fns.push(
			this.addEntry('gcp google cloud platform expanded product cards cloud pub sub ', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 148, 78), 'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;');
		    	bg.vertex = true;
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud Pub/Sub<hr><font style="font-size: 11px">Attribute Name</font>', 
			    		new mxGeometry(0, 0, 42, 42), 'sketch=0;dashed=0;connectable=0;html=1;part=1;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=top;spacingLeft=5;fontColor=#999999;fontSize=12;spacingTop=-8;shape=image;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE4LjMxOTk5OTY5NDgyNDIyIiBoZWlnaHQ9IjIwLjAwMDAwMTkwNzM0ODYzMyIgdmlld0JveD0iMCAwIDE4LjMxOTk5OTY5NDgyNDIyIDIwLjAwMDAwMTkwNzM0ODYzMyI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzY2OWRmNjt9JiN4YTsJLnN0MXtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDJ7ZmlsbDojYWVjYmZhO30mI3hhOwk8L3N0eWxlPiYjeGE7CTxkZWZzPiYjeGE7CQk8ZmlsdGVyIGlkPSJBIiB4PSI0LjY0IiB5PSI0LjE5IiB3aWR0aD0iMTQuNzMiIGhlaWdodD0iMTIuNzYiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj4mI3hhOwkJCTxmZUZsb29kIGZsb29kLWNvbG9yPSIjZmZmIi8+JiN4YTsJCQk8ZmVCbGVuZCBpbj0iU291cmNlR3JhcGhpYyIvPiYjeGE7CQk8L2ZpbHRlcj4mI3hhOwkJPG1hc2sgaWQ9IkIiIHg9IjQuNjQiIHk9IjQuMTkiIHdpZHRoPSIxNC43MyIgaGVpZ2h0PSIxMi43NiIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSI+JiN4YTsJCQk8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyLjIzIiByPSIzLjU4IiBmaWx0ZXI9InVybCgjQSkiLz4mI3hhOwkJPC9tYXNrPiYjeGE7CTwvZGVmcz4mI3hhOwk8ZyBjbGFzcz0ic3QwIj4mI3hhOwkJPGNpcmNsZSBjeD0iMTYuMTMiIGN5PSI2LjIxIiByPSIxLjcyIi8+JiN4YTsJCTxjaXJjbGUgY3g9IjIuMTkiIGN5PSI2LjIxIiByPSIxLjcyIi8+JiN4YTsJCTxjaXJjbGUgY3g9IjkuMTYiIGN5PSIxOC4yOCIgcj0iMS43MiIvPiYjeGE7CTwvZz4mI3hhOwk8ZyBtYXNrPSJ1cmwoI0IpIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMi44NCAtMikiPiYjeGE7CQk8cGF0aCB0cmFuc2Zvcm09Im1hdHJpeCguNSAtLjg3IC44NyAuNSAtNC41OSAyMC41MykiIGQ9Ik0xNC42OSAxMC4yMmgxLjU5djguMDRoLTEuNTl6IiBjbGFzcz0ic3QxIi8+JiN4YTsJCTxwYXRoIHRyYW5zZm9ybT0icm90YXRlKDMzMCA4LjUyMyAxNC4yNDQpIiBkPSJNNC40OSAxMy40NWg4LjA0djEuNTlINC40OXoiIGNsYXNzPSJzdDEiLz4mI3hhOwkJPHBhdGggZD0iTTExLjIgNC4xOWgxLjU5djguMDRIMTEuMnoiIGNsYXNzPSJzdDEiLz4mI3hhOwk8L2c+JiN4YTsJPGcgY2xhc3M9InN0MiI+JiN4YTsJCTxjaXJjbGUgY3g9IjkuMTYiIGN5PSIxMC4yMyIgcj0iMi43OCIvPiYjeGE7CQk8Y2lyY2xlIGN4PSIyLjE5IiBjeT0iMTQuMjUiIHI9IjIuMTkiLz4mI3hhOwkJPGNpcmNsZSBjeD0iMTYuMTMiIGN5PSIxNC4yNSIgcj0iMi4xOSIvPiYjeGE7CQk8Y2lyY2xlIGN4PSI5LjE2IiBjeT0iMi4xOSIgcj0iMi4xOSIvPiYjeGE7CTwvZz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(5, 7);
		    	icon1.vertex = true;
		    	bg.insert(icon1);
		    	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud Pub/Sub');
			})			
		);

		fns.push(
			this.addEntry('gcp google cloud platform expanded product cards cloud sql ', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 140, 70), 'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud SQL<hr><font style="font-size: 11px">Attribute Name</font>', 
			    		new mxGeometry(0, 0, 42, 42), 'sketch=0;dashed=0;connectable=0;html=1;part=1;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=top;spacingLeft=5;fontColor=#999999;fontSize=12;spacingTop=-8;shape=image;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE0LjY1OTk5OTg0NzQxMjExIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMTQuNjU5OTk5ODQ3NDEyMTEgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8c3R5bGU+JiN4YTsJCS5Ee2ZpbGwtcnVsZTpldmVub2RkfSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggZD0iTTcuMzMgMTUuMzV2LTMuMDFMMCA4LjQ0djMuMDF6bTAgNC42NXYtMy4wMUwwIDEzLjA5djMuMDF6IiBjbGFzcz0ic3QyIEQiLz4mI3hhOwk8cGF0aCBkPSJNMTQuNjYgOC40NGwtNy4zMyAzLjl2My4wMWw3LjMzLTMuOXptMCA0LjY1bC03LjMzIDMuOVYyMGw3LjMzLTMuOXoiIGNsYXNzPSJzdDEgRCIvPiYjeGE7CTxwYXRoIGQ9Ik03LjMzIDB2My4wMWw3LjMzIDMuOVYzLjl6IiBjbGFzcz0ic3QwIEQiLz4mI3hhOwk8cGF0aCBkPSJNMCA2LjkxbDcuMzMtMy45VjBMMCAzLjl6IiBjbGFzcz0iRCBzdDEiLz4mI3hhOwk8cGF0aCBkPSJNNy4zMyAxMC43OVY3Ljc3TDAgMy44N3YzLjAyeiIgY2xhc3M9IkQgc3QyIi8+JiN4YTsJPHBhdGggZD0iTTE0LjY2IDMuODdsLTcuMzMgMy45djMuMDJsNy4zMy0zLjl6IiBjbGFzcz0iRCBzdDEiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(5, 7);
		    	icon1.vertex = true;
		    	bg.insert(icon1);
		    	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud SQL');
			})
		);
		
		fns.push(
			this.addEntry('gcp google cloud platform expanded product cards cloud sql ', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 148, 78), 'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;');
		    	bg.vertex = true;
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>Cloud SQL<hr><font style="font-size: 11px">Attribute Name</font>', 
			    		new mxGeometry(0, 0, 42, 42), 'sketch=0;dashed=0;connectable=0;html=1;part=1;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=top;spacingLeft=5;fontColor=#999999;fontSize=12;spacingTop=-8;shape=image;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE0LjY1OTk5OTg0NzQxMjExIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMTQuNjU5OTk5ODQ3NDEyMTEgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8c3R5bGU+JiN4YTsJCS5Ee2ZpbGwtcnVsZTpldmVub2RkfSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggZD0iTTcuMzMgMTUuMzV2LTMuMDFMMCA4LjQ0djMuMDF6bTAgNC42NXYtMy4wMUwwIDEzLjA5djMuMDF6IiBjbGFzcz0ic3QyIEQiLz4mI3hhOwk8cGF0aCBkPSJNMTQuNjYgOC40NGwtNy4zMyAzLjl2My4wMWw3LjMzLTMuOXptMCA0LjY1bC03LjMzIDMuOVYyMGw3LjMzLTMuOXoiIGNsYXNzPSJzdDEgRCIvPiYjeGE7CTxwYXRoIGQ9Ik03LjMzIDB2My4wMWw3LjMzIDMuOVYzLjl6IiBjbGFzcz0ic3QwIEQiLz4mI3hhOwk8cGF0aCBkPSJNMCA2LjkxbDcuMzMtMy45VjBMMCAzLjl6IiBjbGFzcz0iRCBzdDEiLz4mI3hhOwk8cGF0aCBkPSJNNy4zMyAxMC43OVY3Ljc3TDAgMy44N3YzLjAyeiIgY2xhc3M9IkQgc3QyIi8+JiN4YTsJPHBhdGggZD0iTTE0LjY2IDMuODdsLTcuMzMgMy45djMuMDJsNy4zMy0zLjl6IiBjbGFzcz0iRCBzdDEiLz4mI3hhOzwvc3ZnPg==;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(5, 7);
		    	icon1.vertex = true;
		    	bg.insert(icon1);
		    	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Cloud SQL');
			})			
		);

		this.addGCP2ExpandedMachineCard('App Engine', 'app_engine_icon', 1, 0.84, '10GB PD', '1', 'modifiers_standard_machine', '1', 'modifiers_storage', '1', 'modifiers_autoscaling', 150, dt + 'app engine machine', fns);
		this.addGCP2ExpandedMachineCard('Cloud Dataflow', 'cloud_dataflow_icon', 0.72, 1, '10GB PD', '1', 'modifiers_standard_machine', '1', 'modifiers_storage', '1', 'modifiers_autoscaling', 150, dt + 'app engine machine', fns);
		this.addGCP2ExpandedMachineCard('Kubernetes Engine', 'container_engine_icon', 0.88, 1, '10GB PD', '1', 'modifiers_standard_machine', '1', 'modifiers_storage', '1', 'modifiers_autoscaling', 150, dt + 'app engine machine', fns);
		this.addGCP2ExpandedMachineCard('Cloud Dataproc', 'cloud_dataproc_icon', 1, 0.92, '10GB PD', '1', 'modifiers_standard_machine', '1', 'modifiers_storage', '1', 'modifiers_autoscaling', 150, dt + 'app engine machine', fns);
		this.addGCP2ExpandedMachineCard('Compute Engine', 'compute_engine_icon', 1, 1, '10GB PD', '1', 'modifiers_standard_machine', '1', 'modifiers_storage', '1', 'modifiers_autoscaling', 150, dt + 'app engine machine', fns);
		
		this.addPalette('gcp2Expanded Product Cards', 'GCP / Expanded Product Cards', false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addGCP2UserDeviceCardsPalette = function()
	{
		var dt = 'gcp google cloud platform user and device cards ';
		var fns = [];

		this.addGCP2UserDeviceCard('Application', 'application', 1, 0.8, 0, dt + 'application', fns);
		this.addGCP2UserDeviceCard('Beacon', 'beacon', 0.73, 1, 0, dt + 'beacon', fns);
		this.addGCP2UserDeviceCard('Circuit-Board', 'circuit_board', 1, 0.9, 15, dt + 'circuit board', fns);
		this.addGCP2UserDeviceCard('Database', 'database', 1, 0.9, 0, dt + 'database db', fns);
		this.addGCP2UserDeviceCard('Desktop', 'desktop', 1, 0.9, 0, dt + 'desktop', fns);
		this.addGCP2UserDeviceCard('Desktop and Mobile', 'desktop_and_mobile', 1, 0.66, 15, dt + 'desktop and mobile', fns);
		this.addGCP2UserDeviceCard('Game', 'game', 1, 0.54, 0, dt + 'game', fns);
		this.addGCP2UserDeviceCard('Gateway', 'gateway_icon', 1, 0.44, 0, dt + 'gateway icon', fns);
		this.addGCP2UserDeviceCard('Laptop', 'laptop', 1, 0.66, 0, dt + 'laptop', fns);
		this.addGCP2UserDeviceCard('Lightbulb', 'lightbulb', 0.7, 1, 0, dt + 'lighbulb', fns);
		this.addGCP2UserDeviceCard('List', 'list', 0.89, 1, 0, dt + 'list', fns);
		this.addGCP2UserDeviceCard('Live', 'live', 0.74, 1, 0, dt + 'live', fns);
		this.addGCP2UserDeviceCard('Local-Compute', 'compute_engine_icon', 1, 0.89, 15, dt + 'local compute', fns);
		this.addGCP2UserDeviceCard('Mobile Devices', 'mobile_devices', 1, 0.73, 15, dt + 'mobile devices', fns);
		this.addGCP2UserDeviceCard('Payment', 'payment', 1, 0.8, 0, dt + 'payment', fns);
		this.addGCP2UserDeviceCard('Phone', 'phone', 0.64, 1, 0, dt + 'phone', fns);
		this.addGCP2UserDeviceCard('Record', 'record', 1, 0.66, 0, dt + 'record', fns);
		this.addGCP2UserDeviceCard('Report', 'report', 1, 1, 0, dt + 'report', fns);
		this.addGCP2UserDeviceCard('Retail', 'retail', 1, 0.89, 0, dt + 'retail', fns);
		this.addGCP2UserDeviceCard('Speaker', 'speaker', 0.7, 1, 0, dt + 'speaker', fns);
		this.addGCP2UserDeviceCard('Storage', 'storage', 1, 0.8, 0, dt + 'storage', fns);
		this.addGCP2UserDeviceCard('Stream', 'stream', 1, 0.82, 0, dt + 'stream', fns);
		this.addGCP2UserDeviceCard('Users', 'users', 1, 0.63, 0, dt + 'users', fns);
		this.addGCP2UserDeviceCard('Webcam', 'webcam', 0.5, 1, 0, dt + 'webcam', fns);
		
		this.addPalette('gcp2User Device Cards', 'GCP / User and Device Cards', false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	
	Sidebar.prototype.addGCP2ProductCardsPalette = function()
	{
		var dt = 'gcp google cloud platform product ';
		var fns = [];
		
		this.addGCP2ProductCardSet('Kubernetes', 'kubernetes_logo', 1, 0.97, 130, 130, dt + 'kubernetes', fns);
		this.addGCP2ProductCardSet('TensorFlow', 'tensorflow_logo', 0.94, 1, 130, 130, dt + 'tensorflow', fns);
		this.addGCP2ProductCardSet('Forseti\nSecurity', 'forseti_logo', 0.98, 1, 110, 150, dt + 'forseti', fns);
		this.addGCP2ProductCardSet('Istio', 'istio_logo', 0.67, 1, 80, 90, dt + 'forseti', fns);
		this.addGCP2ProductCardSet('Firebase', 'firebase', 0.72, 1, 100, 100, dt + 'firebase', fns);
		this.addGCP2ProductCardSet('Fastly', 'fastly', 1, 0.39, 100, 100, dt + 'fastly', fns);
		this.addGCP2ProductCardSet('AdMob', 'admob', 1, 1, 110, 110, dt + 'admob', fns);
		this.addGCP2ProductCardSet('Google Play\nGame Services', 'google_play_game_service', 1, 0.69, 150, 220, dt + 'google play game services', fns);
		this.addGCP2ProductCardSet('Campaign\nManager', 'campaign_manager', 1, 1, 120, 170, dt + 'campaign manager', fns);
		this.addGCP2ProductCardSet('Google\nAnalytics', 'google_analytics', 1, 1, 120, 160, dt + 'google analytics', fns);
		this.addGCP2ProductCardSet('Google\nAds', 'google_ads', 1, 1, 100, 130, dt + 'google ads', fns);
		this.addGCP2ProductCardSet('Avere Physical\nAppliance', 'avere', 1, 0.33, 150, 200, dt + 'avere physical appliance', fns);
		this.addGCP2ProductCardSet('Google\nAnalytics 360', 'google_analytics_360', 1, 0.98, 140, 180, dt + 'google analytics 360', fns);
		this.addGCP2ProductCardSet('Google Ad\nManager', 'google_ad_manager', 1, 1, 120, 170, dt + 'google ad manager', fns);

		this.addPalette('gcp2Product Cards', 'GCP / Product Cards', false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addGCP2IconsAIAndMachineLearningPalette = function()
	{
		var sb = this;
		var s = 1;
		var n = 'sketch=0;html=1;verticalAlign=top;labelPosition=center;verticalLabelPosition=bottom;align=center;spacingTop=-6;fontSize=11;fontStyle=1;fontColor=#999999;shape=image;aspect=fixed;imageAspect=0;';
		var dt = 'gcp google cloud platform icons icon compute ';
		var gn = 'mxgraph.gcp2';
		var fns = [];
		
		var fns = [
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJzdmc1IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAyMzkuNzA4MjUgMjc0Ljg2MzI4IiBoZWlnaHQ9IjI3NC44NjMyOG1tIiB3aWR0aD0iMjM5LjcwODI1bW0iPiYjeGE7ICAmI3hhOyAgPGRlZnMgaWQ9ImRlZnMyIi8+JiN4YTsgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC02Ni42ODYzNjEsNjAuMjU5NzY2KSIgaWQ9ImxheWVyMSI+JiN4YTsgICAgPGcgc3R5bGU9Im9wYWNpdHk6MC45OSIgaWQ9InBhdGg4NjkiLz4mI3hhOyAgICA8ZyBzdHlsZT0ib3BhY2l0eTowLjk5IiBpZD0icGF0aDg2OS0yIi8+JiN4YTsgICAgPGcgc3R5bGU9Im9wYWNpdHk6MC45OSIgaWQ9InBhdGg4NjktMyIvPiYjeGE7ICAgIDxnIHN0eWxlPSJvcGFjaXR5OjAuOTkiIGlkPSJwYXRoODY5LTEiLz4mI3hhOyAgICA8ZyBzdHlsZT0ib3BhY2l0eTowLjk5IiBpZD0icGF0aDg2OS04Ii8+JiN4YTsgICAgPGcgc3R5bGU9Im9wYWNpdHk6MC45OSIgaWQ9InBhdGg4NzEiPiYjeGE7ICAgICAgPHBhdGggaWQ9InBhdGgzMzU3IiBkPSJtIDc3LjE4Njc3NSwxMTAuODgyNTIgOTQuMjM5Njk1LDY5Ljc0NTc1IiBzdHlsZT0iY29sb3I6IzAwMDAwMDtmaWxsOiMwMDgwMDA7c3Ryb2tlLXdpZHRoOjIxO3N0cm9rZS1saW5lY2FwOnJvdW5kOy1pbmtzY2FwZS1zdHJva2U6bm9uZSIvPiYjeGE7ICAgIDwvZz4mI3hhOyAgICA8ZyBzdHlsZT0ib3BhY2l0eTowLjk5IiBpZD0icGF0aDg3MyIvPiYjeGE7ICAgIDxwYXRoIGQ9Im0gMTUzLjA4MTIsMTA5LjAzNTY4IGMgMCw2LjEyMDQ3IC00Ljk2MTYyLDExLjA4MjA5IC0xMS4wODIwOSwxMS4wODIwOSAtNi4xMjA0NywwIC0xMS4wODIwOCwtNC45NjE2MiAtMTEuMDgyMDgsLTExLjA4MjA5IDAsLTYuMTIwNDYgNC45NjE2MiwtMTEuMDgyMDgyIDExLjA4MjA4LC0xMS4wODIwODcgNi4xMjA0NywtMTBlLTcgMTEuMDgyMDksNC45NjE2MTcgMTEuMDgyMDksMTEuMDgyMDg3IHogbSAwLC05Mi41MTMzODEgYyAwLDYuMTIwNDY5IC00Ljk2MTYyLDExLjA4MjA5IC0xMS4wODIwOSwxMS4wODIwODkgLTYuMTIwNDcsLTVlLTYgLTExLjA4MjA4LC00Ljk2MTYyNCAtMTEuMDgyMDgsLTExLjA4MjA4OSAwLC02LjEyMDQ2NSA0Ljk2MTYxLC0xMS4wODIwODQ2IDExLjA4MjA4LC0xMS4wODIwODk2IDYuMTIwNDcsLTZlLTcgMTEuMDgyMDksNC45NjE2MjA2IDExLjA4MjA5LDExLjA4MjA4OTYgeiBtIDAsLTMyLjkyMTY4MyBjIDAsNi4xMjA0NjkgLTQuOTYxNjIsMTEuMDgyMDkwNSAtMTEuMDgyMDksMTEuMDgyMDg5OSAtNi4xMjA0NywtNWUtNiAtMTEuMDgyMDgsLTQuOTYxNjIzOSAtMTEuMDgyMDgsLTExLjA4MjA4OTkgMCwtNi4xMjA0NjUgNC45NjE2MSwtMTEuMDgyMDg0IDExLjA4MjA4LC0xMS4wODIwODkgNi4xMjA0NywtMTBlLTcgMTEuMDgyMDksNC45NjE2MiAxMS4wODIwOSwxMS4wODIwODkgeiBNIDEwOC43NDE4MSw3Ni43MTgwMSBjIDAsNi4xMjA0NjkgLTQuOTYxNjIsMTEuMDgyMDg5IC0xMS4wODIwODksMTEuMDgyMDg5IC02LjEyMDQ2OSwwIC0xMS4wODIwODksLTQuOTYxNjIgLTExLjA4MjA4OSwtMTEuMDgyMDg5IDAsLTYuMTIwNDY5IDQuOTYxNjIsLTExLjA4MjA4OSAxMS4wODIwODksLTExLjA4MjA4OSA2LjEyMDQ2OSwwIDExLjA4MjA4OSw0Ljk2MTYyIDExLjA4MjA4OSwxMS4wODIwODkgeiBtIDAsLTMyLjY4MDYyNiBjIDAsNi4xMjA0NjkgLTQuOTYxNjIsMTEuMDgyMDg5IC0xMS4wODIwODksMTEuMDgyMDg5IC02LjEyMDQ2OSwwIC0xMS4wODIwODksLTQuOTYxNjIgLTExLjA4MjA4OSwtMTEuMDgyMDg5IDAsLTYuMTIwNDY5IDQuOTYxNjIsLTExLjA4MjA4OSAxMS4wODIwODksLTExLjA4MjA4OSA2LjEyMDQ2OSwwIDExLjA4MjA4OSw0Ljk2MTYyIDExLjA4MjA4OSwxMS4wODIwODkgeiBtIDAsLTMyLjY3ODI0MyBjIDAsNi4xMjA0NjkgLTQuOTYxNjIsMTEuMDgyMDkgLTExLjA4MjA4OSwxMS4wODIwOSAtNi4xMjA0NjksMCAtMTEuMDgyMDksLTQuOTYxNjIxIC0xMS4wODIwODksLTExLjA4MjA5IDAsLTYuMTIwNDY4OCA0Ljk2MTYyLC0xMS4wODIwODkwNyAxMS4wODIwODksLTExLjA4MjA4OTA3IDYuMTIwNDY5LDAgMTEuMDgyMDg5LDQuOTYxNjIwMjcgMTEuMDgyMDg5LDExLjA4MjA4OTA3IHogTSAxNDIsMzcuNzc5Mjk3IGMgLTUuNzk4OTksMCAtMTAuNSw0LjcwMTAxIC0xMC41LDEwLjUgdiAyOC45OTQxNCBjIDAsNS43OTg5OSA0LjcwMTAxLDEwLjUgMTAuNSwxMC41IDUuNzk4OTksMCAxMC41LC00LjcwMTAxIDEwLjUsLTEwLjUgdiAtMjguOTk0MTQgYyAwLC01Ljc5ODk5IC00LjcwMTAxLC0xMC41IC0xMC41LC0xMC41IHogbSAtOC45ZS00LDEwLjUwMDM3NyBWIDc3LjI3MzY5MSBNIDk3LjY2MDE1NiwtNjAuMjU5NzY2IGMgLTUuNzk4OTksMCAtMTAuNSw0LjcwMTAxIC0xMC41LDEwLjUgdiAyOC45OTQxNDEgYyAwLDUuNzk4OTkgNC43MDEwMSwxMC41IDEwLjUsMTAuNSA1Ljc5ODk5NCwyZS02IDEwLjUwMDAwNCwtNC43MDEwMDkgMTAuNTAwMDA0LC0xMC41IHYgLTI4Ljk5NDE0MSBjIDAsLTUuNzk4OTkxIC00LjcwMTAxLC0xMC41MDAwMDIgLTEwLjUwMDAwNCwtMTAuNSB6IG0gLTQuMzVlLTQsMTAuNDk5NzY1IHYgMjguOTk0MDE3IE0gNzUuNjM0NzY2LDEwMC40OTgwNSBjIC0yLjc1NDE5MSwwLjQxMTQ4IC01LjIzMjExOSwxLjkwMDIxIC02Ljg4ODY3Miw0LjEzODY3IC0zLjQ0ODg3NCw0LjY2MTU3IC0yLjQ2NjAyNCwxMS4yMzYzNSAyLjE5NTMxMiwxNC42ODU1NSBsIDk0LjIzODI4NCw2OS43NDYwOSAxMi43ODYwNCwtMTYuNjY2NTkgLTk0LjUzMjEzNiwtNjkuOTU4NDEgYyAtMi4yMzg2OTksLTEuNjU3MTYgLTUuMDQ0MTAxLC0yLjM1NjkzIC03Ljc5ODgyOCwtMS45NDUzMSB6IiBzdHlsZT0iY29sb3I6IzAwMDAwMDtvcGFjaXR5OjAuOTk7ZmlsbDojYjVjYmY5O2ZpbGwtb3BhY2l0eToxO3N0cm9rZS13aWR0aDoyMTtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7LWlua3NjYXBlLXN0cm9rZTpub25lIiBpZD0icGF0aDE4NDAtNSIvPiYjeGE7ICAgIDxwYXRoIGQ9Im0gMTk3LjM5Mjc2LDE0MS45NzM2NiBjIDAsNi4xMjA0NyAtNC45NjE2MiwxMS4wODIwOSAtMTEuMDgyMDksMTEuMDgyMDkgLTYuMTIwNDcsMCAtMTEuMDgyMDksLTQuOTYxNjIgLTExLjA4MjA5LC0xMS4wODIwOSAwLC02LjEyMDQ3IDQuOTYxNjIsLTExLjA4MjA5IDExLjA4MjA5LC0xMS4wODIwOSA2LjEyMDQ3LDAgMTEuMDgyMDksNC45NjE2MiAxMS4wODIwOSwxMS4wODIwOSB6IG0gMCwtOTIuNzI1NTg2IGMgMCw2LjEyMDQ2OSAtNC45NjE2MiwxMS4wODIwOSAtMTEuMDgyMDksMTEuMDgyMDg5IC02LjEyMDQ3LDFlLTYgLTExLjA4MjA5LC00Ljk2MTYyIC0xMS4wODIwOSwtMTEuMDgyMDg5IDAsLTYuMTIwNDcgNC45NjE2MiwtMTEuMDgyMDkxIDExLjA4MjA5LC0xMS4wODIwOSA2LjEyMDQ3LC0xZS02IDExLjA4MjA5LDQuOTYxNjIgMTEuMDgyMDksMTEuMDgyMDkgeiBtIDAsLTMyLjg1NDQ1OCBjIDAsNi4xMjA0NjkgLTQuOTYxNjIsMTEuMDgyMDkgLTExLjA4MjA5LDExLjA4MjA4OSAtNi4xMjA0NywxMGUtNyAtMTEuMDgyMDksLTQuOTYxNjIgLTExLjA4MjA5LC0xMS4wODIwODkgMCwtNi4xMjA0NjkgNC45NjE2MiwtMTEuMDgyMDkwMyAxMS4wODIwOSwtMTEuMDgyMDg5NyA2LjEyMDQ3LC02ZS03IDExLjA4MjA5LDQuOTYxNjIwNyAxMS4wODIwOSwxMS4wODIwODk3IHogbSAxMDAuMDI5MTEsODQuMDA2Nzc0IGMgLTIuNzU1MTcsLTAuNDA1MDA0IC01LjU1ODM4LDAuMzAxMDcgLTcuNzkyOTYsMS45NjI4OSBsIC05NC43NDYxLDcwLjQzNzUgMTIuNTI5MywxNi44NTM1MiA5NC43NDYwOSwtNzAuNDM3NSBjIDQuNjU0MTIsLTMuNDU5NzggNS42MjIxNSwtMTAuMDM3NDggMi4xNjIxMSwtMTQuNjkxNDEgLTEuNjYxMzYsLTIuMjM1NTMgLTQuMTQyODcsLTMuNzE5MzcgLTYuODk4NDQsLTQuMTI1IHogTSAxODYuMzEwNTUsNzAuODY3MTg3IGMgLTUuNzk4OTksMCAtMTAuNSw0LjcwMTAxIC0xMC41LDEwLjUgdiAyOC45OTQxNDMgYyAwLDUuNzk4OTkgNC43MDEwMSwxMC41IDEwLjUsMTAuNSA1Ljc5ODk5LDAgMTAuNSwtNC43MDEwMSAxMC41LC0xMC41IFYgODEuMzY3MTg3IGMgMCwtNS43OTg5OSAtNC43MDEwMSwtMTAuNSAtMTAuNSwtMTAuNSB6IG0gMS4yZS00LDEwLjUwMDgyNyB2IDI4Ljk5NDAxNiIgc3R5bGU9ImNvbG9yOiMwMDAwMDA7b3BhY2l0eTowLjk5O2ZpbGw6Izc2OWVmNTtmaWxsLW9wYWNpdHk6MTtzdHJva2Utd2lkdGg6MjE7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kOy1pbmtzY2FwZS1zdHJva2U6bm9uZSIgaWQ9InBhdGgxODQwLTMiLz4mI3hhOyAgICA8cGF0aCBkPSJtIDE4Ni4zNDU3LDE3MC42ODE2NCBjIC0xMi4wNDU3LDAgLTIxLjk2MDkzLDkuOTE1MjQgLTIxLjk2MDkzLDIxLjk2MDk0IDAsMTIuMDQ1NyA5LjkxNTIzLDIxLjk2MDk0IDIxLjk2MDkzLDIxLjk2MDk0IDEyLjA0NTcsMCAyMS45NjA5NCwtOS45MTUyNCAyMS45NjA5NCwtMjEuOTYwOTQgMCwtMTIuMDQ1NyAtOS45MTUyNCwtMjEuOTYwOTQgLTIxLjk2MDk0LC0yMS45NjA5NCB6IG0gMCwxNCBjIDQuNDc5NTUsMCA3Ljk2MDk0LDMuNDgxMzkgNy45NjA5NCw3Ljk2MDk0IDAsNC40Nzk1NSAtMy40ODEzOSw3Ljk2MDk0IC03Ljk2MDk0LDcuOTYwOTQgLTQuNDc5NTQsMCAtNy45NjA5MywtMy40ODEzOSAtNy45NjA5MywtNy45NjA5NCAwLC00LjQ3OTU1IDMuNDgxMzksLTcuOTYwOTQgNy45NjA5MywtNy45NjA5NCB6IE0gMjg2LjE2MTM3LDc2Ljc5MTAwOCBBIDExLjA4MjA4OSwxMS4wODIwODkgMCAwIDEgMjc1LjA3OTI4LDg3Ljg3MzA5NyAxMS4wODIwODksMTEuMDgyMDg5IDAgMCAxIDI2My45OTcyLDc2Ljc5MTAwOCAxMS4wODIwODksMTEuMDgyMDg5IDAgMCAxIDI3NS4wNzkyOCw2NS43MDg5MTkgMTEuMDgyMDg5LDExLjA4MjA4OSAwIDAgMSAyODYuMTYxMzcsNzYuNzkxMDA4IFogbSAwLC0zMy4xNDU0MzUgYSAxMS4wODIwODksMTEuMDgyMDg5IDAgMCAxIC0xMS4wODIwOSwxMS4wODIwODkgMTEuMDgyMDg5LDExLjA4MjA4OSAwIDAgMSAtMTEuMDgyMDgsLTExLjA4MjA4OSAxMS4wODIwODksMTEuMDgyMDg5IDAgMCAxIDExLjA4MjA4LC0xMS4wODIwOSAxMS4wODIwODksMTEuMDgyMDg5IDAgMCAxIDExLjA4MjA5LDExLjA4MjA5IHogbSAwLC05Mi40NjgyMjQgYSAxMS4wODIwODksMTEuMDgyMDg5IDAgMCAxIC0xMS4wODIwOSwxMS4wODIwOSAxMS4wODIwODksMTEuMDgyMDg5IDAgMCAxIC0xMS4wODIwOCwtMTEuMDgyMDkgMTEuMDgyMDg5LDExLjA4MjA4OSAwIDAgMSAxMS4wODIwOCwtMTEuMDgyMDg5IDExLjA4MjA4OSwxMS4wODIwODkgMCAwIDEgMTEuMDgyMDksMTEuMDgyMDg5IHogbSAtNDQuMjEzNjIsMzIuNTU3NzE2IGEgMTEuMDgyMDg5LDExLjA4MjA4OSAwIDAgMSAtMTEuMDgyMDksMTEuMDgyMDg5OSAxMS4wODIwODksMTEuMDgyMDg5IDAgMCAxIC0xMS4wODIwOSwtMTEuMDgyMDg5OSAxMS4wODIwODksMTEuMDgyMDg5IDAgMCAxIDExLjA4MjA5LC0xMS4wODIwODkgMTEuMDgyMDg5LDExLjA4MjA4OSAwIDAgMSAxMS4wODIwOSwxMS4wODIwODkgeiBtIDAsOTIuNTM1NDQzIGEgMTEuMDgyMDg5LDExLjA4MjA4OSAwIDAgMSAtMTEuMDgyMDksMTEuMDgyMDg5IDExLjA4MjA4OSwxMS4wODIwODkgMCAwIDEgLTExLjA4MjA5LC0xMS4wODIwODkgMTEuMDgyMDg5LDExLjA4MjA4OSAwIDAgMSAxMS4wODIwOSwtMTEuMDgyMDkgMTEuMDgyMDg5LDExLjA4MjA4OSAwIDAgMSAxMS4wODIwOSwxMS4wODIwOSB6IG0gMCwzMi44ODIzMTIgYSAxMS4wODIwODksMTEuMDgyMDg5IDAgMCAxIC0xMS4wODIwOSwxMS4wODIwOSAxMS4wODIwODksMTEuMDgyMDg5IDAgMCAxIC0xMS4wODIwOSwtMTEuMDgyMDkgMTEuMDgyMDg5LDExLjA4MjA4OSAwIDAgMSAxMS4wODIwOSwtMTEuMDgyMDkzIDExLjA4MjA4OSwxMS4wODIwODkgMCAwIDEgMTEuMDgyMDksMTEuMDgyMDkzIHogbSAzMy4xMzIzMywtMTM2LjU4ODM2NyBhIDEwLjUsMTAuNSAwIDAgMCAtMTAuNSwxMC41IHYgMjguOTk0MTQxIGEgMTAuNSwxMC41IDAgMCAwIDEwLjUsMTAuNSAxMC41LDEwLjUgMCAwIDAgMTAuNSwtMTAuNSB2IC0yOC45OTQxNDEgYSAxMC41LDEwLjUgMCAwIDAgLTEwLjUsLTEwLjUgeiBtIC04ZS00LDEwLjUwMDc1OSBWIDEyLjA1OTIyOSBNIDIzMC44NjUyMyw1LjI0MDIzNDQgYSAxMC41LDEwLjUgMCAwIDAgLTEwLjUsMTAuNDk5OTk5NiB2IDI4Ljk5NDE0MSBhIDEwLjUsMTAuNSAwIDAgMCAxMC41LDEwLjUgMTAuNSwxMC41IDAgMCAwIDEwLjUsLTEwLjUgViAxNS43NDAyMzQgYSAxMC41LDEwLjUgMCAwIDAgLTEwLjUsLTEwLjQ5OTk5OTYgeiBtIDQuMmUtNCwxMC40OTk0MzA2IHYgMjguOTk0MDE3IiBzdHlsZT0iY29sb3I6IzAwMDAwMDtvcGFjaXR5OjAuOTk7ZmlsbDojNTk4NmYyO2ZpbGwtb3BhY2l0eToxO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDstaW5rc2NhcGUtc3Ryb2tlOm5vbmUiIGlkPSJwYXRoMTg0MC04Ii8+JiN4YTsgIDwvZz4mI3hhOzwvc3ZnPg==;', 
		    		s * 37, s * 42, 'Vertex AI', null, null, null, this.getTagsForStencil(gn, '', dt + 'ai platform artificial intelligence').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE4IiB2aWV3Qm94PSIwIDAgMjAgMTgiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O2ZpbGwtb3BhY2l0eTouOH0mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTtmaWxsLW9wYWNpdHk6LjZ9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNOS4xNyA1LjE0bDEuNjYtMi41N0w5LjE1IDBINUwwIDguNThsMi41IDUuMTQgNS04LjU4eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xNC4xNyA1LjE0bDEuNjYtMi41N0wxNC4xNyAwaC0zLjM0bDEuNjcgMi41Ny0xLjY3IDIuNTd6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTEwLjgzIDEyLjg2bC0xLjY2IDIuNTdMMTAuODUgMThIMTVsNS04LjU4LTIuNS01LjE0LTUgOC41OHoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNOS4xNyAxMi44Nkg1LjgzbC0xLjY2IDIuNTdMNS44MyAxOGgzLjM0TDcuNSAxNS40M3oiLz4mI3hhOzwvc3ZnPg==;', 
		    		s * 42, s * 38, 'AutoML', null, null, null, this.getTagsForStencil(gn, '', dt + 'automl').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjM4MC41MTE5Nzg1NDYzNTQ0NCIgaGVpZ2h0PSIyNzQuOTI5OTg3NzczNzYyNTUiIHZpZXdCb3g9IjAgMCAxMDAuNjc2OTk0MzIzNzMwNDcgNzIuNzQxOTk2NzY1MTM2NzIiPiYjeGE7PHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTs8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0zNy41NyA0NC43MjRoMjUuNDc3djUuNDY5SDM3LjU3em0wLTEwLjE0NmgyNS40Nzd2NS40NjlIMzcuNTd6bTAtMTAuMTQ2aDI1LjQ3N3Y1LjQ2OUgzNy41N3ptNTMuNTIgMi4yNzhsOS41ODcgMTMuMTQzLTIzLjc4MiAzMi44ODlIMjkuMDdsLTQuNzQxLTYuNTY4IDQuODExLTYuNTYxaDM4LjEwMXpNOS41ODcgNDYuMDMyTDAgMzIuODg5IDIzLjc4MiAwaDQ3LjgyNWw0Ljc0MSA2LjU2OC00LjgxMSA2LjU2MUgzMy40Mzd6Ii8+JiN4YTs8L3N2Zz4=;', 
		    		s * 42, s * 34, 'AutoML Natural\nLanguage', null, null, null, this.getTagsForStencil(gn, '', dt + 'automl natural language').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjM4MC42MzY0OTE2NzUyNjI0NSIgaGVpZ2h0PSIyNzUuNjgyNTM0NzQ5ODYxMTMiIHZpZXdCb3g9Ii0wLjM2OTAwMDAxNzY0Mjk3NDg1IDAgMTAwLjcxMDAwNjcxMzg2NzE5IDcyLjk0MTAwMTg5MjA4OTg0Ij4mI3hhOzxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojYWVjYmZhO30mI3hhOwkuc3Qye2ZpbGw6IzY2OWRmNjt9JiN4YTs8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMDAuMzQxIDQwLjA4TDc2LjQ0IDcyLjk0MWwtNDcuNjkyLS4wNy00Ljg0Ni02LjY1OSA0Ljg4MS02LjU4OSAzOC4xMDUuMDcgMjMuNzY1LTMyLjg0NXpNLS4zNjkgMzIuODYxTDIzLjUzMiAwbDQ3LjY5Mi4wNyA0Ljg0NiA2LjY1OS00Ljg4MSA2LjU4OS0zOC4xMDUtLjA3TDkuMzE5IDQ2LjA5M3oiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMzYuMjQgNDMuNzUyVjI3LjU3NmwxNy4xMTcgOC4wMTh2MTYuOTc4eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik01OC4wMTEgNDEuNjk1di04LjgybC05Ljk1My00LjYzN3YtNy45ODNsMTcuMTE3IDguMTIzdjE3LjAxM3oiLz4mI3hhOzwvc3ZnPg==;', 
		    		s * 42, s * 34, 'AutoML\nTables', null, null, null, this.getTagsForStencil(gn, '', dt + 'automl tables').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjM4MC42MzY0OTE2NzUyNjI0NSIgaGVpZ2h0PSIyNzUuNjgyNTM0NzQ5ODYxMTMiIHZpZXdCb3g9Ii0wLjM2OTAwMDAxNzY0Mjk3NDg1IDAgMTAwLjcxMDAwNjcxMzg2NzE5IDcyLjk0MTAwMTg5MjA4OTg0Ij4mI3hhOzxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTs8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMDAuMzQxIDQwLjA4TDc2LjQ0IDcyLjk0MWwtNDcuNjkyLS4wNy00Ljg0Ni02LjY1OSA0Ljg4MS02LjU4OSAzOC4xMDUuMDcgMjMuNzY1LTMyLjg0NXpNLS4zNjkgMzIuODYxTDIzLjUzMiAwbDQ3LjY5Mi4wNyA0Ljg0NiA2LjY1OS00Ljg4MSA2LjU4OS0zOC4xMDUtLjA3TDkuMzE5IDQ2LjA5M3oiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMzMuOTc0IDI5Ljg3N3YtNC4wNjFoMTIuODk5di00LjYzN2g1LjUyNnY0LjYzN2gxMy4zMTd2NC4wNjF6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTYzLjg2OCA1MS43N2MtNC40NTItLjY4Mi05LjQ4MS0yLjk1NS0xMy43MzYtNS45NjEtNC4wNjUgMi41MzItOC41ODIgNC43NDEtMTMuOTQ1IDYuMzQ1bC0zLjEwMy00LjAwOWM0Ljc2NS0xLjA2MSA5LjIzNy0yLjk5NSAxMy4wNzMtNS41NDMtMi41NDQtMi41NDMtNC43MjktNS4zNTQtNi4zNDUtOC40NTRoNi4xMDFjMS4xNDYgMS45ODcgMi41NjMgMy42NTMgNC4wNzkgNS4xNzcgMS43NTgtMS41OSAzLjAyOC0zLjMwOSA0LjA0NC01LjE3N2g2LjIwNWMtMS40MzIgMi44ODktMy4yMTggNS43MDItNi4zMSA4LjMxNWEzNS43NyAzNS43NyAwIDAgMCAxMi43NiA1LjEyNXoiLz4mI3hhOzwvc3ZnPg==;', 
		    		s * 42, s * 34, 'AutoML\nTranslation', null, null, null, this.getTagsForStencil(gn, '', dt + 'automl translation').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjM4MC42MzY0OTE2NzUyNjI0NSIgaGVpZ2h0PSIyNzUuNjgyNTM0NzQ5ODYxMTMiIHZpZXdCb3g9Ii0wLjM2OTAwMDAxNzY0Mjk3NDg1IDAgMTAwLjcxMDAwNjcxMzg2NzE5IDcyLjk0MTAwMTg5MjA4OTg0Ij4mI3hhOzxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojYWVjYmZhO30mI3hhOwkuc3Qye2ZpbGw6IzY2OWRmNjt9JiN4YTs8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMDAuMzQxIDQwLjA4TDc2LjQ0IDcyLjk0MWwtNDcuNjkyLS4wNy00Ljg0Ni02LjY1OSA0Ljg4MS02LjU4OSAzOC4xMDUuMDcgMjMuNzY1LTMyLjg0NXpNLS4zNjkgMzIuODYxTDIzLjUzMiAwbDQ3LjY5Mi4wNyA0Ljg0NiA2LjY1OS00Ljg4MSA2LjU4OS0zOC4xMDUtLjA3TDkuMzE5IDQ2LjA5M3oiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMzIuNjUxIDQ1Ljg4OFYyNi44ODJoOC45MzZsNC41NzMgNS43MzEgNi4wMjcuMDQ5di0zLjAwN0g0OC40NGwtMi4xNjktMi43NzNoMTAuMTU2djguMTcySDQzLjk2NmwtMS44MjQtMi42MDFoLTQuNjU5bDIuODk3IDQuMDA2LTIuODk3IDMuODdoNC42NTlsMS44MjQtMi44MWgxMi40NjF2OC4zNjlINDYuMjcxbDIuMTY5LTIuNzYxaDMuNzQ3di0yLjk0Nkg0Ni4xNmwtNC41NzMgNS43MDd6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTY3LjM4NyA0NC42MzNsLTYuNjM4LTQuMDA4di04LjMxOGw2LjYzOC0zLjkwOXoiLz4mI3hhOzwvc3ZnPg==;', 
		    		s * 42, s * 34, 'AutoML Video\nIntelligence', null, null, null, this.getTagsForStencil(gn, '', dt + 'automl video intelligence').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjM3OS4yNTY5MTM2MjgxNTg1NCIgaGVpZ2h0PSIyNzEuOTY3NzQwMjY0MjUzMyIgdmlld0JveD0iLTAuMTQ0OTk5OTk1ODI3Njc0ODcgMC4wMTEwMDAwMDA4NzE3MTc5MyAxMDAuMzQ0OTkzNTkxMzA4NiA3MS45NTgwMDAxODMxMDU0NyI+JiN4YTs8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qxe2ZpbGw6IzY2OWRmNjt9JiN4YTs8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMDAuMiAzOS40ODNMNzYuNDI4IDcxLjk2OUgyOC44NjVsLTQuNzgzLTYuNTgyIDQuNzgzLTYuNDIyaDM4LjAxM0w5MC42MyAyNi40MzJ6TS0uMTQ1IDMyLjQ5OEwyMy42MjcuMDExSDcxLjE5bDQuNzgzIDYuNTgyLTQuNzgzIDYuNDIySDMzLjE3N0w5LjQyNSA0NS41NDl6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTMzLjAzNCA0My4xMjJsMTAuMDctMTQuMDIzaDI0LjAybC05Ljc4OSAxNC4wMjN6Ii8+JiN4YTs8L3N2Zz4=;', 
		    		s * 42, s * 34, 'AutoML\nVision', null, null, null, this.getTagsForStencil(gn, '', dt + 'automl vision').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjM3NS41MDQwMTg5MTYxMTE2IiBoZWlnaHQ9IjM3Ni40MTEwMTA4NDIxNTg5MyIgdmlld0JveD0iMCAwIDk5LjM1MjAwNTAwNDg4MjgxIDk5LjU5MjAwMjg2ODY1MjM0Ij4mI3hhOzxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM2NjlkZjY7fSYjeGE7CS5zdDF7ZmlsbDojYWVjYmZhO30mI3hhOzwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTcwLjc2MyA0OS43ODZhMzAuOTkgMzAuOTkgMCAwIDAtNC40OTkuNDQydjI3LjA3OGgxMXYtMjYuOTdsLTIuNjg2LS4zOTFjLTEuMjc5LS4xMzEtMi41NC0uMTg2LTMuODE1LS4xNTl6bS0xNS41ODcgMy43NjZsLTQuNDcxIDEuODcxLS4wMTYuMDA2LS4wMTYuMDA4LTYuNDk4IDIuNTIydjMwLjg4NGgxMXptMzMuMTc2LjEwNHY0NS45MzZoMTFWNTguMTk4Yy00LjEzOC0xLjc5OC03Ljc4My0zLjMyNS0xMS00LjU0MXpNMCA1My43Njh2MjMuNTM5aDExVjU4LjAxMmMtMy40MzYtMS4xMjYtNy4wNTItMi41NTItMTEtNC4yNDR6bTMzLjA4OCA2Ljg2Yy0zLjcwNS40NzItNy4zMjUuNDc4LTExIC4wMDd2MzguOTU3aDExeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0wIDB2NDEuNzM0YzQuMTA1IDEuODE5IDcuNzQgMy4zNSAxMSA0LjU3MlYwem02Ni4yNjQgMHYzOS4xNTRjMy4xNzgtLjQxMiA2LjI4Mi0uNDczIDkuNDM0LS4xNS41MjMuMDUzIDEuMDQ0LjExOSAxLjU2Ni4xOTFWMHpNNDQuMTc2IDExLjUzOHYzNC42OTRsMi4xMzctLjg5NWMzLjE0LTEuMzc5IDYuMDY5LTIuNTM5IDguODYzLTMuNDl2LTMwLjMxek0yMi4wODggMjIuMjg1djI3LjIzYy4wMTEuMDAyLjAyMi4wMDQuMDMzLjAwNiAzLjc3NC42NCA3LjIxNS43MDcgMTAuOTY3LjA4VjIyLjI4NXptNjYuMjY0IDB2MTkuNjQxYzMuMzg4IDEuMTQ0IDcuMDE1IDIuNTk3IDExIDQuMjlWMjIuMjg1eiIvPiYjeGE7PC9zdmc+;', 
		    		s * 42, s * 42, 'Cloud\nInference API', null, null, null, this.getTagsForStencil(gn, '', dt + 'cloud inference api application programming interface').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE5LjkyMTQ0MjAzMTg2MDM1IiBoZWlnaHQ9IjE5Ljc3ODMyMDMxMjUiIHZpZXdCb3g9Ii0wLjAwMDQ0MTU1NzE3NDc4MTMzNzQgMC4yNSAxOS45MjE0NDIwMzE4NjAzNSAxOS43NzgzMjAzMTI1Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qxe2ZpbGw6I2FlY2JmYTt9JiN4YTsJLnN0MntmaWxsLXJ1bGU6ZXZlbm9kZH0mI3hhOwkuc3Qze2ZpbGw6IzY2OWRmNjt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNC40NjEgMTYuMjRhMyAzIDAgMSAxIDAtNiAzIDMgMCAxIDEgMCA2em0zLjYzLS40YTQuNDMgNC40MyAwIDAgMC01LjA0OS02LjcxNEE0LjQzIDQuNDMgMCAwIDAgLjAxMSAxMy4zMmE0LjkxIDQuOTEgMCAwIDAgMCAuNjcgMy40MyAzLjQzIDAgMCAwIC4wOS40NGwuMDYuMjFhNC41OSA0LjU5IDAgMCAwIC4zNC43OSA0LjI0IDQuMjQgMCAwIDAgLjc2IDFsLjE1LjE1LjMzLjI3YTQuMTYgNC4xNiAwIDAgMCAuNzMuNDQgNC40NCA0LjQ0IDAgMCAwIDQuNTQtLjI5bDIuOTMgMi45M2EuMzMuMzMgMCAwIDAgLjQ3IDBsLjY2LS42NWEuMzMuMzMgMCAwIDAgMC0uNDd6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTkuODExIDE0LjU4YTUuNDEgNS40MSAwIDAgMCAuMi0xLjUxIDUuNTMgNS41MyAwIDAgMC01LjYxLTUuNDIgNS44MiA1LjgyIDAgMCAwLTEuOTIuMzVWMy44M2EuNjIuNjIgMCAwIDEgLjYyLS42MmgxNi4xOWEuNjMuNjMgMCAwIDEgLjYzLjYyVjE0YS42My42MyAwIDAgMS0uNjMuNjN6Ii8+JiN4YTsJPGcgY2xhc3M9InN0MiI+JiN4YTsJCTxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik0xMy41OTEgMy4yMVYxLjczaC00LjQ0djEuNDhoLTEuNDlWLjg3YS42My42MyAwIDAgMSAuNjMtLjYyaDYuMTZhLjYyLjYyIDAgMCAxIC42Mi42MnYyLjM0eiIvPiYjeGE7CQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTUuMDcxIDMuMjFoLTEuNDhsMS40OC0uNDd6bS01LjkzIDBoLTEuNDlsMS40OS0uNTR6Ii8+JiN4YTsJPC9nPiYjeGE7PC9zdmc+;', 
		    		s * 42, s * 42, 'Cloud\nTalent Solutions', null, null, null, this.getTagsForStencil(gn, '', dt + 'cloud talent solution solutions').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE2IiB2aWV3Qm94PSIwIDAgMjAgMTYiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM2NjlkZjY7fSYjeGE7CS5zdDF7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTUgMmgzdjEyaC0zdjJoMyAydi0yVjIgMGgtMi0zeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xOCAydjFsMi0xem0yIDEydi0xbC0yIDF6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTUgMTRIMlYyaDNWMEgyIDB2MiAxMiAyaDIgM3oiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMCAxNHYtMWwyIDF6TTIgMnYxTDAgMnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNNSA3aDEwdjJINXptMCAzaDEwdjJINXptMC02aDEwdjJINXoiLz4mI3hhOzwvc3ZnPg==;', 
		    		s * 42, s * 34, 'Cloud Natural\nLanguage API', null, null, null, this.getTagsForStencil(gn, '', dt + 'cloud natural language api').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE4IiBoZWlnaHQ9IjE4IiB2aWV3Qm94PSIwIDAgMTggMTgiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxnIGNsYXNzPSJzdDAiIGZpbGw9IiM0Mjg1ZjQiPiYjeGE7CQk8cGF0aCBkPSJNMy40OCA2LjYyYS4zNy4zNyAwIDAgMS0uMzU4LS41MzMuMzcuMzcgMCAwIDEgLjMwOC0uMjA3bDIuMy0uMzJhLjM3LjM3IDAgMCAxIC40Mi4zMi4zOC4zOCAwIDAgMS0uMzIuNDNsLTIuMy4zMXoiLz4mI3hhOwkJPHBhdGggZD0iTTYuMjk5IDYuMjkybC4yMzMtLjcxMyA0LjE0NSAxLjM1Mi0uMjMzLjcxM3oiLz4mI3hhOwkJPHBhdGggZD0iTTYuMTggNi4xNmgtLjExYS4zNy4zNyAwIDAgMS0uMjQtLjQ2bC44My0yLjg0YS4zNy4zNyAwIDAgMSAuNDYtLjI0LjM2LjM2IDAgMCAxIC4yNi40NWwtLjg0IDIuODFhLjM4LjM4IDAgMCAxLS4zNi4yOHptNS4xMyAxLjRBLjM2LjM2IDAgMCAxIDExIDdsMS42Ny00LjIzYS4zOC4zOCAwIDAgMSAuNDctLjE4LjM4LjM4IDAgMCAxIC4yMy40NWwtMS42OCA0LjI0YS4zOS4zOSAwIDAgMS0uMzguMjh6Ii8+JiN4YTsJCTxwYXRoIGQ9Ik0yLjY2OSAxMy42MDRMNi42IDEwLjQ2NWwuNDY4LjU4Ni0zLjkzMSAzLjEzOXpNMTUuMDUgOC42MWwtLjMuNjgtMy42My0xLjU4LjI5LS42OXptLS4zMSA1LjQ4bC0uNTIuNTQtMy4yMy0zLjA0LjUyLS41NXpNNS43ODggNi4xMTNsLjczNS0uMTQ5LjgwOCAzLjk3OS0uNzM1LjE0OXoiLz4mI3hhOwkJPHBhdGggZD0iTTExLjU2IDcuNTZsLTQuMSAzLjYtLjUtLjU2IDQuMS0zLjZ6Ii8+JiN4YTsJCTxwYXRoIGQ9Ik0xMS43NCA3LjNsLS4yNSAzLjk3LS43NC0uMDUuMjQtMy45N3oiLz4mI3hhOwkJPGNpcmNsZSBjeD0iNy4wMSIgY3k9IjEwLjgyIiByPSIxLjM2Ii8+JiN4YTsJCTxjaXJjbGUgY3g9IjExLjM3IiBjeT0iNy4zNiIgcj0iMS42MSIvPiYjeGE7CQk8Y2lyY2xlIGN4PSIxMS4zNiIgY3k9IjExLjU0IiByPSIuODQiLz4mI3hhOwkJPGNpcmNsZSBjeD0iNi4wNCIgY3k9IjUuNjciIHI9Ii45OSIvPiYjeGE7CTwvZz4mI3hhOwk8ZyBjbGFzcz0ic3QxIiBmaWxsPSIjNjY5ZGY2Ij4mI3hhOwkJPHBhdGggZD0iTTggNGgyVjBIOHptNCAwaDJWMGgtMnpNNCA0aDJWMEg0em00IDE0aDJ2LTRIOHoiLz4mI3hhOwkJPHBhdGggZD0iTTEyIDE4aDJ2LTRoLTJ6bS04IDBoMnYtNEg0em0tNC04aDRWOEgwem0wLTRoNFY0SDB6Ii8+JiN4YTsJCTxwYXRoIGQ9Ik0wIDE0aDR2LTJIMHptMTQtNGg0VjhoLTR6bTAtNGg0VjRoLTR6bTAgOGg0di0yaC00eiIvPiYjeGE7CQk8cGF0aCBkPSJNMTUgMkgzYTEgMSAwIDAgMC0xIDF2MTJhMSAxIDAgMCAwIDEgMWgxMmExIDEgMCAwIDAgMS0xVjNhMSAxIDAgMCAwLTEtMXptLTEgMTEuNDdhLjUzLjUzIDAgMCAxLS41My41M0g0LjUzYS41My41MyAwIDAgMS0uNTMtLjUzVjQuNTNBLjUzLjUzIDAgMCAxIDQuNTMgNGg4Ljk0YS41My41MyAwIDAgMSAuNTMuNTN6Ii8+JiN4YTsJPC9nPiYjeGE7PC9zdmc+;', 
		    		s * 42, s * 42, 'Cloud\nTPU', null, null, null, this.getTagsForStencil(gn, '', dt + 'cloud tpu').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE4IiB2aWV3Qm94PSIwIDAgMjAgMTgiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O2ZpbGwtcnVsZTpldmVub2RkfSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTE1LjkxIDcuMmgtMS44MkwxMCAxOGgxLjgybDEtMi43aDQuMzJsMSAyLjdIMjB6bS0yLjM5IDYuM0wxNSA5LjZsMS40OCAzLjl6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTEwLjc5IDExLjc3TDguNDggOS41MWgwYTE1LjYyIDE1LjYyIDAgMCAwIDMuNC01LjkxaDIuNjdWMS44SDguMThWMEg2LjM2djEuOEgwdjEuNzloMTAuMTVhMTQuMDYgMTQuMDYgMCAwIDEtMi44OCA0LjgyIDE0LjU1IDE0LjU1IDAgMCAxLTIuMS0zSDMuMzVhMTYgMTYgMCAwIDAgMi43MSA0LjFMMS40NCAxNGwxLjI5IDEuMyA0LjU0LTQuNSAyLjgzIDIuOHoiLz4mI3hhOzwvc3ZnPg==;', 
		    		s * 42, s * 38, 'Cloud\nTranslation API', null, null, null, this.getTagsForStencil(gn, '', dt + 'cloud translation api application programming interface').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE2IiB2aWV3Qm94PSIwIDAgMjAgMTYiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM2NjlkZjY7fSYjeGE7CS5zdDF7ZmlsbDojYWVjYmZhO30mI3hhOwkuc3Qye2ZpbGw6IzQyODVmNDt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8ZyBjbGFzcz0ic3QwIj4mI3hhOwkJPHBhdGggZD0iTTEwIDE2TDAgOGg0bDYgNC45OXoiLz4mI3hhOwkJPHBhdGggZD0iTTIwIDhsLTEwIDh2LTMuMDFMMTYgOHoiLz4mI3hhOwk8L2c+JiN4YTsJPGcgY2xhc3M9InN0MSI+JiN4YTsJCTxwYXRoIGQ9Ik0xMCAzLjAxTDQgOEgwbDEwLTh6Ii8+JiN4YTsJCTxwYXRoIGQ9Ik0yMCA4TDEwIDB2My4wMUwxNiA4eiIvPiYjeGE7CTwvZz4mI3hhOwk8Y2lyY2xlIGNsYXNzPSJzdDIiIGN4PSIxMCIgY3k9IjgiIHI9IjIiLz4mI3hhOzwvc3ZnPg==;', 
		    		s * 42, s * 34, 'Cloud\nVision API', null, null, null, this.getTagsForStencil(gn, '', dt + 'cloud translation api application programming interface').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjM3Ny42MDkwNzg2ODcyMTAwNiIgaGVpZ2h0PSIzMDYuMjk2NTE2MDQzNTQ3NzQiIHZpZXdCb3g9IjAuMDE5MDAwMDAxMjUxNjk3NTQgMC4yMzIwMDAwMDgyMjU0NDA5OCA5OS45MDkwMDQyMTE0MjU3OCA4MS4wNDEwMDAzNjYyMTA5NCI+JiN4YTs8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qxe2ZpbGw6I2FlY2JmYTt9JiN4YTsJLnN0MntmaWxsOiM0Mjg1ZjQ7fSYjeGE7PC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMjUuMTgzLjIzMkw3LjM1MyAzNy4zNjYuMDQ4IDM3LjMzbC0uMDI5IDYgMjkuNDkyLjE0NmMxLjA4NiA2LjE1IDYuNDk5IDEwLjg3NiAxMi45NDQgMTAuODc2IDcuMjE4IDAgMTMuMTQ0LTUuOTI3IDEzLjE0NC0xMy4xNDRzLTUuOTI3LTEzLjE0NS0xMy4xNDQtMTMuMTQ1Yy01LjkyNCAwLTEwLjk3NiAzLjk5My0xMi41OTcgOS40MTVsLTEyLjU0NC0uMDYyTDMwLjg0NSA5LjIzMmgzMC4xMjl2LTlIMjUuMTgzem0xNy4yNzEgMzQuODNhNi4wOSA2LjA5IDAgMCAxIDYuMTQ1IDYuMTQ1IDYuMDkgNi4wOSAwIDAgMS02LjE0NSA2LjE0NGMtMi42MTYgMC00LjgwOS0xLjU3My01LjcwNi0zLjg0bDMuMjE0LjAxNi4wMjktNi0yLjQ3My0uMDEyYzEuMTEyLTEuNDk2IDIuODk2LTIuNDUzIDQuOTM2LTIuNDUzek0xNy44ODIgNDUuNzExbC04LjA4NiAzLjk1MSAxNS40NDEgMzEuNjExaDM1LjczNnYtOUgzMC44NThMMTcuODgyIDQ1LjcxMXoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNNjAuOTc0IDgxLjI3M2gzOC45NTRWNjAuOTIyaC05LjAwM3YxMS4zNTJINjAuOTc0em0wLTcyLjA0MWgyOS45NTF2MTEuNzU1aDkuMDAzVi4yMzJINjAuOTc0eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik03NS43OTYgMjAuOTg3djguOTk5aDI0LjEzMnYtOC45OTl6TTYxLjExIDM1LjkyOHY5aDM4LjgxN3YtOXpNNzEuMjc0IDUxLjkxdjkuMDEyaDI4LjY1M1Y1MS45MXoiLz4mI3hhOzwvc3ZnPg==;', 
		    		s * 42, s * 34, 'Data\nLabeling', null, null, null, this.getTagsForStencil(gn, '', dt + 'data labeling').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE4IiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMTggMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik04IDBoMnYyMEg4ek00IDZoMnY4SDR6bTggMGgydjhoLTJ6TTAgM2gydjE0SDB6bTE2IDBoMnYxNGgtMnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNOCAwaDJ2MTBIOHpNNCA2aDJ2NEg0em04IDBoMnY0aC0yek0wIDNoMnY3SDB6bTE2IDBoMnY3aC0yeiIvPiYjeGE7PC9zdmc+;', 
		    		s * 38, s * 42, 'Speech-to-Text', null, null, null, this.getTagsForStencil(gn, '', dt + 'speech to text').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwLjAwMDQ2MzQ4NTcxNzc3MyIgaGVpZ2h0PSIxNi42MzE1MTU1MDI5Mjk2ODgiIHZpZXdCb3g9IjAgMC4wMDAyNDE0MDk2NTI1MTcxNzcxNiAyMC4wMDA0NjM0ODU3MTc3NzMgMTYuNjMxNTE1NTAyOTI5Njg4Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qxe2ZpbGw6IzQyODVmNDt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNLjAxIDMuMzA2aDYuNjR2MS42N0guMDF6bS0uMDEgMTBoMCA5LjE3di0xLjY3SDB6bTAtNC4xN2g0LjE4SDEwbC0xLjY3LTEuNjZIMi41MSAweiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xMCA1LjM4NmEuNDIuNDIgMCAwIDEgLjQyLS4zNi40MS40MSAwIDAgMSAuNDEuMzZ2OS4xOGEyLjA5IDIuMDkgMCAwIDAgMi42MSAyIDIuMTYgMi4xNiAwIDAgMCAxLjU2LTIuMTFWMi4wNjZhLjQuNCAwIDAgMSAuMTktLjQuNDEuNDEgMCAwIDEgLjQ1IDAgLjQuNCAwIDAgMSAuMTkuNHY5LjE2YTIuMDcgMi4wNyAwIDAgMCAuODEgMS42NCAyIDIgMCAwIDAgMS44LjM3IDIuMTYgMi4xNiAwIDAgMCAxLjU2LTIuMTJ2LTIuOGgtMS42N3YyLjkyYS40LjQgMCAwIDEtLjE5LjQuNDEuNDEgMCAwIDEtLjQ1IDAgLjQuNCAwIDAgMS0uMTktLjR2LTkuMTdhMi4wOSAyLjA5IDAgMCAwLTIuNjEtMiAyLjE2IDIuMTYgMCAwIDAtMS41NiAyLjEzdjEyLjM3YS40LjQgMCAwIDEtLjE5LjQuNDEuNDEgMCAwIDEtLjQ1IDAgLjQuNCAwIDAgMS0uMTktLjR2LTkuMTdhMi4wNyAyLjA3IDAgMCAwLTQuMTEtLjM2IDIuNCAyLjQgMCAwIDAtLjA1LjQ2djJMMTAgOS4xMzZ6Ii8+JiN4YTs8L3N2Zz4=;', 
		    		s * 42, s * 36, 'Text-to-Speech', null, null, null, this.getTagsForStencil(gn, '', dt + 'text to speech').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE5Ljk4OTk5OTc3MTExODE2NCIgaGVpZ2h0PSIxNCIgdmlld0JveD0iMCAwIDE5Ljk4OTk5OTc3MTExODE2NCAxNCI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzY2OWRmNjt9JiN4YTsJLnN0MXtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTEwLjI3IDIuMzNoMi4wNXYxLjMzSDkuNEw3LjA3IDBIMHY0LjMzaDEuOTlMMy4yNSAyaDIuNTdsLjg2IDEuMzNINC4xMUwyLjg1IDUuNjZIMHYyLjU5aDIuODVsMS4yNiAyLjQxaDIuNTdMNS44MiAxMkgzLjI1TDEuOTkgOS42NkgwVjE0aDcuMDdsMi4zMy0zLjY3aDIuOTJ2MS4zM2gtMi4wNUw4LjggMTRoNS41MlY3LjY2SDcuOTFMNy4wOCA5SDUuMjRMNi41IDcgNS4yNCA1aDEuODRsLjggMS4zM2g2LjQ0VjBIOC44eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xNS45OSAxMC4xMWw0IDIuOTVWMS4xbC00IDIuOTF6Ii8+JiN4YTs8L3N2Zz4=;', 
		    		s * 42, s * 29, 'Video\nIntelligence API', null, null, null, this.getTagsForStencil(gn, '', dt + 'video intelligence api application programming interface').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJzdmcyNDYzMyIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMjA4LjcxMzM2IDI1OC45NjYwOSIgaGVpZ2h0PSIyNTguOTY2MDltbSIgd2lkdGg9IjIwOC43MTMzNm1tIj4mI3hhOyAgJiN4YTsgIDxkZWZzIGlkPSJkZWZzMjQ2MzAiLz4mI3hhOyAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTMuMzk0NjI0OCwtMTcuODEwMjgyKSIgaWQ9ImxheWVyMSI+JiN4YTsgICAgPHBhdGggdHJhbnNmb3JtPSJzY2FsZSgwLjI2NDU4MzMzKSIgZD0ibSAxMTIuNDcwNyw2Ny4zMTQ0NTMgYyAtNTguMzI5NTUyLDAgLTk5LjY0MDYyMiw0MS4wMzc2NDcgLTk5LjY0MDYyMiwxMDYuODUxNTY3IHYgNzc0LjE4NzUgYyAwLDU2LjMxMzc4IDQzLjI2NjU5Niw5Ny43MzA0OCAxMDEuMjc3MzQyLDk3LjczMDQ4IEggNDEwLjA5OTYxIFYgOTQ3LjUwNTg2IEggMTA5LjM4MjgxIFYgMTYzLjIxODc1IGggMzAwLjcxNjggViA2Ny4zMTQ0NTMgWiBtIDQ3MS43MjA3MSwyOC43NzczNDQgYSA2OS44ODQ0ODksNjkuODg0NDg5IDAgMCAwIC02OS44ODQ3Nyw2OS44ODQ3NjMgNjkuODg0NDg5LDY5Ljg4NDQ4OSAwIDAgMCA0OS4wNjQ0NSw2Ni43MDExNyB2IDc2Ljg4ODY4IGMgMCwzMi4xNzM1NCAtMy4wMDI0OSw1NC4yMDgzNiAtOS4wMDU4Niw2NC4zNDc2NSAtNi4wMDMzNiwxMC4xMzkzIC0xNC4wMTI0MiwxNS4yOTY4OCAtNDIuMjM4MjgsMTUuMjk2ODggaCAtNDkuMTQyNTcgdiAzOS45OTQxNCBoIDQ5LjE0MjU3IGMgMzUuMzA1MSwwIDYyLjkxMzc2LC0xMS43MTI1MiA3Ni42NTIzNSwtMzQuOTE2MDIgMTMuNzM4NTgsLTIzLjIwMzU1IDE0LjU5Mzc1LC01MC45ODc2OCAxNC41OTM3NSwtODQuNzIyNjUgViAyMzMuMTM0NzcgQSA2OS44ODQ0ODksNjkuODg0NDg5IDAgMCAwIDY1NC4wNzQyMiwxNjUuOTc2NTYgNjkuODg0NDg5LDY5Ljg4NDQ4OSAwIDAgMCA1ODQuMTkxNDEsOTYuMDkxNzk3IFogTSAyMDkuMTA3NDIsMzU5Ljc5Njg4IHYgOTYuNjM2NzEgaCAyMDAuOTE3OTcgdiAtOTYuNjM2NzEgeiBtIDUyMi42Nzc3NCwyOC42OTMzNSBhIDY5Ljg4NDQ4OSw2OS44ODQ0ODkgMCAwIDAgLTY5Ljg4NDc3LDY5Ljg4NDc3IDY5Ljg4NDQ4OSw2OS44ODQ0ODkgMCAwIDAgNDQuNTMzMiw2NS4xMTkxNCBjIC0wLjgyMjcyLDI4LjAzMTA0IC04LjIxNjMsNDAuMDcxOTggLTIwLjgxODM2LDQ4LjQ3NjU2IC0xMy4zODU1Myw4LjkyNzE3IC0zNy43MTQ3NCwxMy4zOTg0NCAtNzEuMjc5MjksMTMuMzk4NDQgSCA0NjMuNjY0MDYgdiAzOS45OTQxNCBoIDE1MC42NzE4OCBjIDM2LjUyOTQzLDAgNjguMjkxOTIsLTMuMzI0MjMgOTMuNDY4NzUsLTIwLjExNTIzIDIzLjMyMzQ4LC0xNS41NTQ5NiAzNi42MzkxNywtNDIuOTc3MzEgMzguNDc0NjEsLTc4LjU0MTAyIEEgNjkuODg0NDg5LDY5Ljg4NDQ4OSAwIDAgMCA4MDEuNjY3OTcsNDU4LjM3NSA2OS44ODQ0ODksNjkuODg0NDg5IDAgMCAwIDczMS43ODUxNiwzODguNDkwMjMgWiBNIDIwOS4xMDc0Miw1NTYuNDgyNDIgdiA5Ni42MzY3MiBoIDIwMC45MTc5NyB2IC05Ni42MzY3MiB6IG0gMCwxOTYuNjg3NSB2IDk2LjYzNjcyIGggMjAwLjkxNzk3IHYgLTk2LjYzNjcyIHogbSAyNTQuOTc2NTYsMjcuNTQ2ODggdiAzOS45OTQxNCBoIDk4LjU5OTYxIGMgMzIuMzE0MjUsMCA1NS40NDQxMiwyLjUyNzk1IDY2LjIzMDQ3LDguMDAxOTUgNS4zOTMxNiwyLjczNzAyIDguMDg0ODgsNS4zNTUzMiAxMC41NDI5NywxMC4yMzI0MiAyLjQ1ODA5LDQuODc3MTQgNC40MDYyNSwxMi43Nzc2OCA0LjQwNjI1LDI1LjAzMTI1IHYgMTkuODE4MzYgYSA2OS44ODQ0ODksNjkuODg0NDg5IDAgMCAwIC00OS43MjI2Niw2Ni44OTY0OSA2OS44ODQ0ODksNjkuODg0NDg5IDAgMCAwIDY5Ljg4NDc3LDY5Ljg4NDc5IDY5Ljg4NDQ4OSw2OS44ODQ0ODkgMCAwIDAgNjkuODg0NzcsLTY5Ljg4NDc5IDY5Ljg4NDQ4OSw2OS44ODQ0ODkgMCAwIDAgLTUwLjA0NDkzLC02Ni45ODI0MyB2IC0xOS43MzI0MiBjIDAsLTE2LjM2ODgzIC0yLjQ2MjIsLTMwLjY4NTUgLTguNjg3NSwtNDMuMDM3MTEgLTYuMjI1MjYsLTEyLjM1MTYxIC0xNi40OTAxNywtMjEuOTczMDIgLTI4LjE2MjExLC0yNy44OTY0OCBDIDYyMy42NzE3NSw3ODEuMTk2MDggNTk2LjIxNjcsNzgwLjcxNjggNTYyLjY4MzU5LDc4MC43MTY4IFoiIHN0eWxlPSJjb2xvcjojMDAwMDAwO29wYWNpdHk6MTtmaWxsOiM1OTg2ZjI7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlLXdpZHRoOjM5Ljk5OTk7LWlua3NjYXBlLXN0cm9rZTpub25lIiBpZD0icGF0aDI0NzYyIi8+JiN4YTsgIDwvZz4mI3hhOzwvc3ZnPg==;', 
		    		s * 34, s * 42, 'Document AI', null, null, null, this.getTagsForStencil(gn, '', dt + 'document ai artificial intelligence').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJzdmcyNDYzMyIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMzE4Ljg3MDk3IDI1NC42NzY0MyIgaGVpZ2h0PSIyNTQuNjc2NDRtbSIgd2lkdGg9IjMxOC44NzA5N21tIj4mI3hhOyAgJiN4YTsgIDxkZWZzIGlkPSJkZWZzMjQ2MzAiLz4mI3hhOyAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTAuMTk0MzAzNDIsLTUuNDMxMTkyOSkiIGlkPSJsYXllcjEiPiYjeGE7ICAgIDxwYXRoIHRyYW5zZm9ybT0ibWF0cml4KDAuMjY0NTgzMzMsMCwwLDAuMjY0NTgzMzMsMy4zOTQ2MjQ4LDE3LjgxMDI4MikiIGQ9Ik0gNTkwLjAzNTE2LC00Ni43ODcxMDkgLTEyLjA5NTcwMyw0MzUuMTk3MjcgSCAxMTkzLjA4NTkgWiIgc3R5bGU9Im9wYWNpdHk6MTtmaWxsOiNiNWNiZjk7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjAuOTk5OTk5cHg7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW9wYWNpdHk6MSIgaWQ9InBhdGgxMDYyIi8+JiN4YTsgICAgPHBhdGggdHJhbnNmb3JtPSJtYXRyaXgoMC4yNjQ1ODMzMywwLDAsMC4yNjQ1ODMzMywzLjM5NDYyNDgsMTcuODEwMjgyKSIgZD0iTSAtMTIuMDk1NzAzLDQzNS4xOTcyNyA1OTAuNDk0MTQsOTE1Ljc2OTUzIDExOTMuMDg1OSw0MzUuMTk3MjcgWiIgc3R5bGU9Im9wYWNpdHk6MTtmaWxsOiM3NjllZjU7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjcuNDI2Nzc7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLW9wYWNpdHk6MSIgaWQ9InBhdGgxMDY0Ii8+JiN4YTsgICAgPHBhdGggaWQ9InBhdGgyMjU5IiBkPSJtIDE1OS4yMDg4OCw5OC41MTk1NjcgYyAxOS4wNjkwNSwwIDM0LjI1OTkyLDE1LjE5MDg3MyAzNC4yNTk5MiwzNC4yNTk5MjMgMCwxOS4wNjkwNSAtMTUuMTkwODcsMzQuMjU5NDEgLTM0LjI1OTkyLDM0LjI1OTQxIC0xOS4wNjkwNCwwIC0zNC4yNTk5MiwtMTUuMTkwMzYgLTM0LjI1OTkyLC0zNC4yNTk0MSAwLC0xOS4wNjkwNSAxNS4xOTA4NywtMzQuMjU5OTIzIDM0LjI1OTkyLC0zNC4yNTk5MjMgeiIgc3R5bGU9ImNvbG9yOiMwMDAwMDA7b3BhY2l0eToxO2ZpbGw6IzU5ODZmMjtmaWxsLW9wYWNpdHk6MTtzdHJva2Utd2lkdGg6MTtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7LWlua3NjYXBlLXN0cm9rZTpub25lIi8+JiN4YTsgICAgPHBhdGggZD0ibSAyMjEuNjUyMzcsMjEwLjY0Mzk5IC0yOC45MzM2NSwtMjkuMDcyMTMgYyAtOS41NDkyMyw2LjU5MzE1IC0yMS4xMDA1MiwxMC40NjcwNiAtMzMuNTEwMDgsMTAuNDY3MDYgLTMyLjUyMDk3LDAgLTU5LjE2MDg2LC0yNi41ODMxNiAtNTkuMjU3MzU3LC01OS4wODI3IC0xLjhlLTQsLTAuMDU5IC0wLjAwMywtMC4xMTc2NiAtMC4wMDMsLTAuMTc2NzMgMCwtMzIuNTgwMDQgMjYuNjc5Mzg3LC01OS4yNTk5NDcgNTkuMjU5NDM3LC01OS4yNTk5NDcgMzIuNTgwMDUsMCA1OS4yNTk5NSwyNi42Nzk5MDcgNTkuMjU5OTUsNTkuMjU5OTQ3IDAsMC4wNTkyIC0wLjAwMywwLjExNzYyIC0wLjAwMywwLjE3NjczIC0wLjAzNDYsMTEuNjE5OTggLTMuNDYwNDgsMjIuNDgzNDcgLTkuMzM3NDEsMzEuNjQ2MTMgbCAzMS4wODc1MSwzMS4yMzY4NiB6IE0gMTU5LjIwODY0LDk4LjUxOTU2NyBjIC0xOS4wNjkwNSwwIC0zNC4yNTk5MiwxNS4xOTA4NzMgLTM0LjI1OTkyLDM0LjI1OTkyMyAwLDE5LjA2OTA1IDE1LjE5MDg3LDM0LjI1OTQxIDM0LjI1OTkyLDM0LjI1OTQxIDE5LjA2OTA1LDAgMzQuMjU5OTEsLTE1LjE5MDM2IDM0LjI1OTkxLC0zNC4yNTk0MSAwLC0xOS4wNjkwNSAtMTUuMTkwODYsLTM0LjI1OTkyMyAtMzQuMjU5OTEsLTM0LjI1OTkyMyB6IiBzdHlsZT0iZmlsbDojZmZmZmZmO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTpub25lO3N0cm9rZS13aWR0aDowLjI2NDU4M3B4O3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1vcGFjaXR5OjEiIGlkPSJwYXRoMTA2Mi03Ii8+JiN4YTsgIDwvZz4mI3hhOzwvc3ZnPg==;', 
		    		s * 42, s * 34, 'Visual\nInspection AI', null, null, null, this.getTagsForStencil(gn, '', dt + 'visual inspection ai artificial intelligence').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJzdmcyNDYzMyIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMjYzLjMwODg0IDI1OC4xNDg4IiBoZWlnaHQ9IjI1OC4xNDg4bW0iIHdpZHRoPSIyNjMuMzA4ODRtbSI+JiN4YTsgICYjeGE7ICA8ZGVmcyBpZD0iZGVmczI0NjMwIi8+JiN4YTsgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xOC41Mjk4OTgsMC4wNDIwNzMyNSkiIGlkPSJsYXllcjEiPiYjeGE7ICAgIDxwYXRoIHRyYW5zZm9ybT0ibWF0cml4KDAuMjY0NTgzMzMsMCwwLDAuMjY0NTgzMzMsMC4xOTQzMDM0Miw1LjQzMTE5MjkpIiBkPSJtIDI0Ny4wNTI3MywtMjAuNjgxNjQxIC0xNDAuNTU4NTksMi4yMjg1MTYgYyAtMjAuODY5MjAyLDAuMzMxOTYgLTM3LjUxODcwNywxNy41MTc0NzQzOCAtMzcuMTg5NDUyLDM4LjM4NjcxOSAwLjMyNzY5MywyMC44NzIyNzMgMTcuNTE0NDczLDM3LjUyNjUwMSAzOC4zODY3MjIsMzcuMTk3MjY1IGwgMTE1Ljg2NTIzLC0xLjg0NTcwMyAxODcuMjIwNyw0MDkuNDI5Njg0IC02Mi42NjA5MSwxMjQuOTM5NDkgYyAtMjIuNzEyODIsNDcuMzAyODQgOC4xOTM3MSwxMTAuNjgxNjEgNjYuNDg1OTcsMTEwLjY4MTYxIGwgNTc0LjUzMDQxLDEuMTczODMgYyAyMC44NzM0OSwwLjAzNjUgMzcuODI0NDksLTE2Ljg1NTA0IDM3Ljg2MTI5LC0zNy43Mjg1MiAwLjAzNywtMjAuODcwNDMgLTE2Ljg1MDIsLTM3LjgyMDE2IC0zNy43MjA2NiwtMzcuODYxMzMgbCAtNTcxLjU5NTcxLC0xLjA2MjUgNTguNjM0NzcsLTEyMi4wMDk3NiAzNjguOTc2NTYsLTAuODE4MzYgYyAxMy42Mjg1NSwtMC4wMjk4IDI2LjE4NTgsLTcuMzkzOTEgMzIuODY1MjQsLTE5LjI3MzQ0IGwgMTgxLjQ3NDYsLTMyMi45MzU1NSBjIDEwLjIyNzUsLTE4LjE5NzI3IDMuNzY2MiwtNDEuMjQwMTQgLTE0LjQzMTYsLTUxLjQ2Njc5IC04LjczOTMsLTQuOTEwMDggLTE5LjA3MTIsLTYuMTQ3MyAtMjguNzIyNywtMy40Mzk0NiAtOS42NTA0LDIuNzA1OTkgLTE3LjgzMDg2LDkuMTM0MyAtMjIuNzQyMTgsMTcuODcxMSBMIDgyMy4wNjI1LDQyNi40OTAyMyA0NzYuNzY5NTMsNDI3LjI1NTg2IDI4Mi4wMjE0OCwxLjM4ODY3MTkgQyAyNzUuNzc5MywtMTIuMjU2OTQxIDI2Mi4wNTY0NSwtMjAuOTE4MDMgMjQ3LjA1MjczLC0yMC42ODE2NDEgWiIgc3R5bGU9ImNvbG9yOiMwMDAwMDA7b3BhY2l0eToxO2ZpbGw6IzU5ODZmMjtmaWxsLW9wYWNpdHk6MTtzdHJva2Utd2lkdGg6My43Nzk1MztzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7LWlua3NjYXBlLXN0cm9rZTpub25lIiBpZD0icGF0aDE2MTAyIi8+JiN4YTsgICAgPHBhdGggaWQ9InJlY3QxNzc2MyIgZD0ibSAxMjMuMjY2LDQxLjM3NjY1OSBoIDIyLjM0NjA3IGMgMi4yODkyMywwIDQuMTMyMiwxLjg0Mjk2MiA0LjEzMjIsNC4xMzIyMDIgdiA2Mi4wNjgzMjkgaCAtMTYuNjM5NyBMIDExOS4xMzM4LDc2LjM0MjA3OSBWIDQ1LjUwODg2MSBjIDAsLTIuMjg5MjQgMS44NDI5NiwtNC4xMzIyMDIgNC4xMzIyLC00LjEzMjIwMiB6IiBzdHlsZT0iY29sb3I6IzAwMDAwMDtvcGFjaXR5OjE7ZmlsbDojYjVjYmY5O2ZpbGwtb3BhY2l0eToxO3N0cm9rZS13aWR0aDoyMDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7LWlua3NjYXBlLXN0cm9rZTpub25lIi8+JiN4YTsgICAgPHBhdGggaWQ9InJlY3QxNzc2My01IiBkPSJtIDE2NC40OTE5OCwyNy4xMDYwMDkgaCAyMS40NjEwOSBjIDIuNjk3OSwwIDQuODY5ODUsMi4xNzE5NTEgNC44Njk4NSw0Ljg2OTg0NSBWIDEwNy41NzcxOSBIIDE1OS42MjIxMyBWIDMxLjk3NTg1NCBjIDAsLTIuNjk3ODk0IDIuMTcxOTUsLTQuODY5ODQ1IDQuODY5ODUsLTQuODY5ODQ1IHoiIHN0eWxlPSJjb2xvcjojMDAwMDAwO29wYWNpdHk6MTtmaWxsOiM3NjllZjU7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlLXdpZHRoOjIwO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDstaW5rc2NhcGUtc3Ryb2tlOm5vbmUiLz4mI3hhOyAgICA8cGF0aCBpZD0icmVjdDE3NzYzLTMiIGQ9Im0gMjA1LjUwMTk2LDAuMzQ1MDg2NjMgaCAyMS4xMDEzMiBjIDIuODUyMDYsMCA1LjE0ODEyLDIuMjk2MDYyNzcgNS4xNDgxMiw1LjE0ODEyMjc3IFYgNzEuODc3OTMxIEwgMjExLjc5ODY1LDEwNy41NzcxOSBIIDIwMC4zNTM4NCBWIDUuNDkzMjA5NCBjIDAsLTIuODUyMDYgMi4yOTYwNiwtNS4xNDgxMjI3NyA1LjE0ODEyLC01LjE0ODEyMjc3IHoiIHN0eWxlPSJjb2xvcjojMDAwMDAwO29wYWNpdHk6MTtmaWxsOiM1OTg2ZjI7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlLXdpZHRoOjIwO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDstaW5rc2NhcGUtc3Ryb2tlOm5vbmUiLz4mI3hhOyAgICA8cGF0aCB0cmFuc2Zvcm09Im1hdHJpeCgwLjI2NDU4MzMzLDAsMCwwLjI2NDU4MzMzLDAuMTk0MzAzNDIsNS40MzExOTI5KSIgZD0ibSA4OTAuMjUxOTUsNzU2Ljc3NTM5IGEgOTguODY0OTg2LDk4Ljg2NDk4NiAwIDAgMCAtOTguODY1MjMsOTguODY1MjMgOTguODY0OTg2LDk4Ljg2NDk4NiAwIDAgMCA5OC44NjUyMyw5OC44NjUyNCA5OC44NjQ5ODYsOTguODY0OTg2IDAgMCAwIDk4Ljg2NTI0LC05OC44NjUyNCA5OC44NjQ5ODYsOTguODY0OTg2IDAgMCAwIC05OC44NjUyNCwtOTguODY1MjMgeiBtIC00ODkuNTMzMiwwLjQ4ODI4IGEgOTguODY0OTg2LDk4Ljg2NDk4NiAwIDAgMCAtOTguODY1MjMsOTguODY1MjQgOTguODY0OTg2LDk4Ljg2NDk4NiAwIDAgMCA5OC44NjUyMyw5OC44NjUyMyA5OC44NjQ5ODYsOTguODY0OTg2IDAgMCAwIDk4Ljg2NTIzLC05OC44NjUyMyA5OC44NjQ5ODYsOTguODY0OTg2IDAgMCAwIC05OC44NjUyMywtOTguODY1MjQgeiIgc3R5bGU9Im9wYWNpdHk6MTtmaWxsOiM3NjllZjU7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjc1LjU5MDY7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lIiBpZD0icGF0aDE3OTY3Ii8+JiN4YTsgIDwvZz4mI3hhOzwvc3ZnPg==;', 
		    		s * 42, s * 41, 'Retail API', null, null, null, this.getTagsForStencil(gn, '', dt + 'retail api application programming interface').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjM3Ny42ODQ2NTY1OTk1Nzg4MyIgaGVpZ2h0PSIzMzguNTIwNDc5NDMzNDQ2MiIgdmlld0JveD0iMC4wNjUwMDAwMDUwNjYzOTQ4IDAuNDc5OTk5NTQyMjM2MzI4MSA5OS45MjkwMDA4NTQ0OTIxOSA4OS41NjcwMDEzNDI3NzM0NCI+JiN4YTs8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojYWVjYmZhO30mI3hhOwkuc3Qxe2ZpbGw6IzY2OWRmNjt9JiN4YTsJLnN0MntmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDN7ZmlsbDojZmZmO30mI3hhOzwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTU5LjU1NCAzNS42MmgzMC45NFY5Ljk4bDkuNS05LjVoLTQ5Ljk0djQ0LjY0em0yOS45ODEgNTQuNDI3VjUzLjYzNWwtOS41IDkuNXYxNy40MTJ6bS01MC4xMjggMFY1My42MzVsLTkuNSA5LjV2MTcuNDEyem0wLTQ0LjU3OVY5LjA1NmwtOS41IDkuNXYxNy40MTJ6IiBmaWxsPSIjYWVjYmZhIi8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTk5Ljk5NCA0NS4xMlYuNDhsLTkuNSA5LjV2MjUuNjR6bS00OS44IDQ0LjkyN2gzOS4zNDJsLTkuNS05LjVINTkuNjkzem0tNTAuMTI4IDBoMzkuMzQybC05LjUtOS41SDkuNTY1em0wLTQ0LjU3OWgzOS4zNDJsLTkuNS05LjVIOS41NjV6IiBmaWxsPSIjNjY5ZGY2Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTUwLjA1NCA0NS4xMmg0OS45NGwtOS41LTkuNWgtMzAuOTR6bTkuNjM5IDM1LjQyN1Y2My4xMzVoMjAuMzQybDkuNS05LjVINTAuMTkzdjM2LjQxMnptLTUwLjEyOCAwVjYzLjEzNWgyMC4zNDJsOS41LTkuNUguMDY1djM2LjQxMnptMC00NC41NzlWMTguNTU2aDIwLjM0Mmw5LjUtOS41SC4wNjV2MzYuNDEyeiIgZmlsbD0iIzQyODVmNCIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik04Mi42ODUgMTQuMTk4bC0xMC4yNjcgOS4yMDgtNC43ODUtNC4zNS00LjExMiAzLjY3IDguOTMgNy44ODYgMTQuMTgyLTEyLjcyNnoiIGZpbGw9IiNmZmYiLz4mI3hhOzwvc3ZnPg==;', 
		    		s * 42, s * 38, 'Recommendations\nAI', null, null, null, this.getTagsForStencil(gn, '', dt + 'recommendations ai').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE3LjUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgdmlld0JveD0iMCAwIDIwIDE3LjUiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xOC45MSAxMC42M0wyMCA4Ljc1IDE3LjgyIDVoLTMuMDdsLTEuMDYtMS44NkgxMi41VjEuODhoMS45NGwxLjA2IDEuODdoMS41OUwxNC45IDBoLTQuMjd2NWgxLjczbC43MyAxLjI1aC0yLjQ2djIuNWgyLjI2bDEuMDUtMS44N2gyLjgxbC43MiAxLjI1aC0yLjhMMTMuNjIgMTBoLTIuOTl2NC4zOGgzLjRsLS43MiAxLjI1aC0yLjY4djEuODdoNC4yN2wzLjI4LTUuNjJoLTIuMDlsLS43MyAxLjI1SDEyLjV2LTEuMjVoMi4xNGwuNzQtMS4yNXoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMS4wOSAxMC42M0wwIDguNzUgMi4xOCA1aDMuMDdsMS4wNi0xLjg2SDcuNVYxLjg4SDUuNTZMNC41IDMuNzVIMi45MUw1LjEgMGg0LjI4djVINy42NGwtLjczIDEuMjVoMi40N3YyLjVINy4xMUw2LjA2IDYuODhIMy4yNWwtLjcyIDEuMjVoMi44TDYuMzggMTBoM3Y0LjM4SDUuOTdsLjcyIDEuMjVoMi42OXYxLjg3SDUuMWwtMy4yOC01LjYyaDIuMDlsLjczIDEuMjVINy41di0xLjI1SDUuMzZsLS43NC0xLjI1eiIvPiYjeGE7PC9zdmc+;', 
		    		s * 42, s * 38, 'Cloud AI', null, null, null, this.getTagsForStencil(gn, '', dt + 'cloud ai artificial intelligence').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJzdmc0Njc2OCIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMjA5LjI1MjM1IDI3Ni4yMDM1NSIgaGVpZ2h0PSIyNzYuMjAzNTVtbSIgd2lkdGg9IjIwOS4yNTIzNW1tIj4mI3hhOyAgJiN4YTsgIDxkZWZzIGlkPSJkZWZzNDY3NjUiLz4mI3hhOyAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEuNTA3ODU5NSwtOS43NzkzNzgzKSIgaWQ9ImxheWVyMSI+JiN4YTsgICAgPHBhdGggZD0ibSAxNjMuNTk1NTcsMTE2LjE0MjAyIDQ3LjE2NDY1LDI4LjAyNDMyIHYgNDQuNjM2NjcgYyAwLDcuOTYwNyAtMy40MjYyMSwxMi40MDk0NiAtOS4yNDUxNSwxNi4zMjM0NCBMIDY3LjE5MzQ2OSwyODQuMDUxNiBjIC01LjUxNDE1MywzLjU4NCAtOS4zNzkzMjUsMS45MjYyMSAtOS4zNzkzMjUsLTIuODgzMDkgViAyMzMuNTczODggTCAxNjMuNTk1NTcsMTcwLjc0NjExIFogTSA2Mi42MjEzNTIsODcuNjg0MzM5IFYgMzEuOTI0NjEgTCA5NS4zNDA0NjUsMTMuMDAwOTczIGMgNy41MTQzMTUsLTQuNjAxODcxNyAxNS4wOTIwNzUsLTQuMDk5MzAzNiAyMS42MDg0NDUsMC4zOTczOTkgbCA4MS4zODgxNSw0Ny4xMjgzOCBjIDkuODcwMDUsNS42MDQwNTkgMTIuMzU2MzksMTAuNTc3OTI4IDEyLjQyMzE2LDIwLjA3OTI3OCBWIDEyNS40MjIyIEwgMTA1LjU5Njc4LDYzLjEyNjk0NSBaIE0gNDIuOTAzMjA4LDIyNC4wNTAxIDEzLjI4OTg4MywyMDYuODU5OTIgQyA2LjE0MjIzOTgsMjAyLjQ2OTU1IDEuNTE2NzgwMSwxOTkuNzUwMTcgMS41MTY3ODAxLDE4Ny42NDczNyBWIDgzLjYzOTU5MiBDIDEuMzk4NjksNzQuMDk4NDc5IDIuMzAzMDU2OSw2OC41MDEzMjkgMTMuNDM0MzM4LDYxLjk3MTMwNCBMIDQ3LjIzNjg2Nyw0Mi4xODA5MzMgViAxNzEuMTc5NDggbCA0My4wNDc2NjYsMjQuNzAxODQgeiIgc3R5bGU9Im9wYWNpdHk6MTtmaWxsOiM1OTg2ZjI7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjAuMjY0NTgzcHg7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW9wYWNpdHk6MSIgaWQ9InBhdGg0NjkwNiIvPiYjeGE7ICA8L2c+JiN4YTs8L3N2Zz4=;', 
		    		s * 32, s * 42, 'Contact\nCenter AI', null, null, null, this.getTagsForStencil(gn, '', dt + 'contact center ai artificial intelligence').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJzdmc2MjQ2IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxNDIuMzY1NzQgMTg1LjQwMDQ1IiBoZWlnaHQ9IjE4NS40MDA0NW1tIiB3aWR0aD0iMTQyLjM2NTc0bW0iPiYjeGE7ICAmI3hhOyAgPGRlZnMgaWQ9ImRlZnM2MjQzIi8+JiN4YTsgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0zNy40NTI3MTEsLTU1LjAxNDgzOCkiIGlkPSJsYXllcjEiPiYjeGE7ICAgIDxwYXRoIGlkPSJwYXRoNjM3OSIgZD0iTSA3NS42NTQ0NzYsMjA0Ljc3MjcgNDUuMTMwNTE3LDE4Ni43OTU0IGMgLTUuODQwMzQ1LC0zLjMxMzMyIC03LjM5NjkxMiwtNS45MjE4NCAtNy4zOTY5MTIsLTEzLjk1MTE0IGwgLTAuMjgwODk0LC02Ny4yMjc2MiBjIDAsLTkuMzA5NTUgMi42NTc3MywtMTEuOTA5ODY4IDguODAxMzg3LC0xNS45MTczOTggTCAxMDIuODA3Nyw1Ni4zNjYzMjkgYyAyLjkzMjI5LC0xLjUzNTAwMSA4LjY2MjA2LC0yLjEyMTEzNyAxMi4xNzIxMiwwLjE4NzI2NCBsIDU2LjQ2NjYyLDMzLjM3ODM1MSBjIDYuNTQxMzYsMy42ODA5NTMgOC4zNzIwMSw2LjY5Mzg4MyA4LjM3MjAxLDE0Ljk4MTA4NiBsIC0wLjI4NzU1LDY4Ljk4MTE0IGMgLTAuMTcxNzEsNi4xMzYxNCAtMi4xOTk1NCw5LjgwODQyIC03LjExNjAxLDEyLjkwNzg4IGwgLTg5LjU1MDc2OCw1Mi4zMzM1MSBjIC0zLjk4NjEzMSwyLjczMDI0IC03LjAyMjM4MiwwLjgzODE3IC03LjAyMjM4MiwtMy4yNzcxMSB6IiBzdHlsZT0ib3BhY2l0eToxO2ZpbGw6IzQyODVmNDtmaWxsLW9wYWNpdHk6MTtzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MC4yNjQ1ODNweDtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2Utb3BhY2l0eToxIi8+JiN4YTsgICAgPHBhdGggZD0ibSA5OC41MDA2MjksMTc0LjkwNDE2IGEgMTAuMTEyMjMyLDEwLjExMjIzMiAwIDAgMSAtMTAuMTEyMjMyLDEwLjExMjIzIDEwLjExMjIzMiwxMC4xMTIyMzIgMCAwIDEgLTEwLjExMjIzMiwtMTAuMTEyMjMgMTAuMTEyMjMyLDEwLjExMjIzMiAwIDAgMSAxMC4xMTIyMzIsLTEwLjExMjIzIDEwLjExMjIzMiwxMC4xMTIyMzIgMCAwIDEgMTAuMTEyMjMyLDEwLjExMjIzIHogbSA2Mi41NDYwNDEsLTM1Ljk1NDYxIGEgMTAuMTEyMjMyLDEwLjExMjIzMiAwIDAgMSAtMTAuMTEyMjQsMTAuMTEyMjQgMTAuMTEyMjMyLDEwLjExMjIzMiAwIDAgMSAtMTAuMTEyMjMsLTEwLjExMjI0IDEwLjExMjIzMiwxMC4xMTIyMzIgMCAwIDEgMTAuMTEyMjMsLTEwLjExMjIzIDEwLjExMjIzMiwxMC4xMTIyMzIgMCAwIDEgMTAuMTEyMjQsMTAuMTEyMjMgeiBtIC0zMC4xNDk0NCwtMC4zNzQ1MiBhIDIxLjUzNTMwOSwyMS41MzUzMDkgMCAwIDEgLTIxLjUzNTMxLDIxLjUzNTMxIDIxLjUzNTMwOSwyMS41MzUzMDkgMCAwIDEgLTIxLjUzNTMwNiwtMjEuNTM1MzEgMjEuNTM1MzA5LDIxLjUzNTMwOSAwIDAgMSAyMS41MzUzMDYsLTIxLjUzNTMxIDIxLjUzNTMwOSwyMS41MzUzMDkgMCAwIDEgMjEuNTM1MzEsMjEuNTM1MzEgeiBNIDk4LjMxMzM2NiwxMDIuNjIwNDIgQSAxMC4xMTIyMzIsMTAuMTEyMjMyIDAgMCAxIDg4LjIwMTEzNCwxMTIuNzMyNjUgMTAuMTEyMjMyLDEwLjExMjIzMiAwIDAgMSA3OC4wODg5MDIsMTAyLjYyMDQyIDEwLjExMjIzMiwxMC4xMTIyMzIgMCAwIDEgODguMjAxMTM0LDkyLjUwODE5IDEwLjExMjIzMiwxMC4xMTIyMzIgMCAwIDEgOTguMzEzMzY2LDEwMi42MjA0MiBaIG0gNDYuNDQwNTQ0LDUxLjI0Mjg2IGEgNSw1IDAgMCAwIC0zLDIuMzc2OTUgYyAtNy45MzcwOCwxNC4yNTY2NiAtMTYuNzMzNDIsMTguNTQ2IC0zMy43NTE5NiwxOS41NzgxMyBhIDUsNSAwIDAgMCAtNC42ODc1LDUuMjk0OTIgNSw1IDAgMCAwIDUuMjkyOTcsNC42ODc1IGMgMTguODQyMDUsLTEuMTQyNzIgMzIuNjM3MzgsLTguMDg1MDUgNDEuODg0NzcsLTI0LjY5NTMxIGEgNSw1IDAgMCAwIC0xLjkzNzUsLTYuODAwNzggNSw1IDAgMCAwIC0zLjgwMDc4LC0wLjQ0MTQxIHogTSAxMDcuNzQyMTksOTIuMzYzMjgxIGEgNSw1IDAgMCAwIC00Ljg0NzY2LDUuMTQ2NDg1IDUsNSAwIDAgMCA1LjE0ODQ0LDQuODQ3NjU0IGMgMTYuMzA5NzgsLTAuNDg5OTEgMjQuNTAwMTYsNC44NjU4NSAzNC4xMDc0MiwxOC45NTExNyBhIDUsNSAwIDAgMCA2Ljk0OTIyLDEuMzE0NDYgNSw1IDAgMCAwIDEuMzEyNSwtNi45NDkyMiBDIDEzOS43NzU0MywxMDAuMDc5MjggMTI2Ljc0NDUzLDkxLjc5MjQ5MyAxMDcuNzQyMTksOTIuMzYzMjgxIFogTSA3Mi4wODAwNzgsMTEyLjI3NTM5IGEgNSw1IDAgMCAwIC0yLjkyNTc4MSwyLjQ2NjggYyAtOC42NzU5NzgsMTYuNzY0NzIgLTkuNzg0Nzk2LDMyLjE2NzM0IC0wLjI2MTcxOSw0OC42MjEwOSBhIDUsNSAwIDAgMCA2LjgzMjAzMSwxLjgyNDIyIDUsNSAwIDAgMCAxLjgyMjI2NiwtNi44MzIwMyBjIC04LjE3MzY5NSwtMTQuMTIyMzIgLTcuMzQ4MDQzLC0yMy44NzUzMyAwLjQ4ODI4MSwtMzkuMDE3NTggYSA1LDUgMCAwIDAgLTIuMTQyNTc4LC02LjczODI4IDUsNSAwIDAgMCAtMy44MTI1LC0wLjMyNDIyIHoiIHN0eWxlPSJjb2xvcjojMDAwMDAwO29wYWNpdHk6MTtmaWxsOiNmZmZmZmY7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlLXdpZHRoOjIwO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDstaW5rc2NhcGUtc3Ryb2tlOm5vbmUiIGlkPSJwYXRoNjQwNy0yIi8+JiN4YTsgIDwvZz4mI3hhOzwvc3ZnPg==;', 
		    		s * 32, s * 42, 'Contact Center\nAI Platform', null, null, null, this.getTagsForStencil(gn, '', dt + 'contact center ai artificial intelligence platform').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE2LjAwMDAwNzYyOTM5NDUzIiBoZWlnaHQ9IjE5LjgzNjQ5NDQ0NTgwMDc4IiB2aWV3Qm94PSItMC4wMDAwMDY3MzA4MDY0ODk5NDA3MzMgMC4wMDAzMTcxNzE4ODUzOTkxNDc4NyAxNi4wMDAwMDc2MjkzOTQ1MyAxOS44MzY0OTQ0NDU4MDA3OCI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJLnN0MXtmaWxsOiM2NjlkZjY7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTggOS45NzFsLTgtNHY2Ljc2YS40OS40OSAwIDAgMCAuMTkuMzlsNC42NCAyLjc1YS4zMi4zMiAwIDAgMSAuMTcuMjl2My41MWEuMTcuMTcgMCAwIDAgLjI2LjE0bDEwLjUxLTYuNjlhLjUuNSAwIDAgMCAuMjMtLjQydi02LjczeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik04IDcuOTcxbDgtNEw4LjEyLjAzMWEuMjUuMjUgMCAwIDAtLjI0IDBMMCAzLjk3MXoiLz4mI3hhOzwvc3ZnPg==;', 
		    		s * 34, s * 42, 'Dialogflow\nEnterprise Edition', null, null, null, this.getTagsForStencil(gn, '', dt + 'dialogflow enterprise edition').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJzdmcxNzUwNCIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMTM5LjUyMjcyIDE4My42MDg4NCIgaGVpZ2h0PSIxODMuNjA4ODRtbSIgd2lkdGg9IjEzOS41MjI3Mm1tIj4mI3hhOyAgJiN4YTsgIDxkZWZzIGlkPSJkZWZzMTc1MDEiLz4mI3hhOyAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM1Ljg0NDkwNSwtNTUuNTYzODk1KSIgaWQ9ImxheWVyMSI+JiN4YTsgICAgPHBhdGggaWQ9InBhdGgxNzY1OCIgZD0iTSA3Mi45MDAzNzcsMjAzLjU0MjE4IDQyLjkzNDMwNCwxODYuMTU4OCBjIC00Ljg3OTA1OCwtMy41NjYxMiAtNy4wODkzOTksLTQuMjA5MzQgLTcuMDg5Mzk5LC0xMy43NDM5MSB2IC03MC4xNDYyNyBjIDAsLTUuNTU3OTcxIDEuMzc2MTMxLC04Ljg1NjM0MyA3LjIwMjk5MSwtMTEuOTg0ODY4IEwgOTguNjUxODcxLDU3LjQzNTA2MyBjIDMuOTE5MTA5LC0xLjg5NDE0MSA5LjQ3MDE3OSwtMi45NzU3NzkgMTMuNjgzNTM5LC0wLjEzMjQxNSBsIDU2Ljk1MDg0LDMzLjMzMjkxMiBjIDQuNTY1NDgsMy40NjgzMjEgNS45NjA5OSw2Ljc5NzUwOCA2LjA4MTM3LDEyLjE1ODgzIHYgNzEuMzQxODkgYyAwLDYuNDIwMDQgLTEuODkyMTksOS4yODg3MSAtNS41OTMyNCwxMS4wNzY3OCBsIC04OC44NTM3OTYsNTIuNDc5MjMgYyAtNS42NTc1NywzLjIxMTE3IC03LjgxMjMwOCwwLjc2MDM2IC04LjAyMDIwNywtMy4xNzAxNiB6IiBzdHlsZT0ib3BhY2l0eToxO2ZpbGw6IzQyODVmNDtmaWxsLW9wYWNpdHk6MTtzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MC4yNjQ1ODNweDtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2Utb3BhY2l0eToxIi8+JiN4YTsgICAgPHBhdGggZD0ibSAxMTcuNjE5MTQsMTM3LjM5MDYyIHYgMzIuOTI1NzkgaCAyMS4yMzI0MiB2IC05IGggLTEyLjIzMjQyIHYgLTE0LjkyNTc5IGggMTIuMjMyNDIgdiAtOSB6IE0gMTA2LjA5Mzc1LDkyLjk4NjMyOCBjIC0yMS4wMTQ5MDUsMCAtMzkuMTg3NSwxNi42NjQ1MDIgLTM5LjE4NzUsMzUuODM1OTQyIHYgMjkuODIyMjYgbCAwLjAwMiwwLjAzNzEgYyAwLjA1MjIxLDMuMTY1NTEgMS4xMjA0NDEsNi4yNzIyNiAzLjI4NzEwOSw4LjY0NDUzIDIuMTY2NjY5LDIuMzcyMjcgNS40NjU2MTQsMy44Mzc4OSA5LjAxNzU3OSwzLjgzNzg5IEggOTMuNzMwNDY5IFYgMTM3LjYzMjgxIEggNzUuOTA2MjUgdiAtOC44MTA1NCBjIDAsLTEzLjE5NTA4IDE0LjA2OTI1NCwtMjYuODM1OTQgMzAuMTg3NSwtMjYuODM1OTQgMTYuNjE2MzIsMCAyOS40OTIxOSwxNC40NDUzNiAyOS40OTIxOSwyNi4yODMyIHYgNDYuMjUzOTEgaCAtMjUuODczMDUgdiA5IGggMzQuODczMDUgdiAtNTUuMjUzOTEgYyAwLC0xNy44NTA2MSAtMTYuODczNDUsLTM1LjI4MzIwMiAtMzguNDkyMTksLTM1LjI4MzIwMiB6IG0gLTMwLjE4NzUsNTMuNjQ2NDgyIGggOC44MjQyMTkgdiAxNS41MzEyNSBoIC01LjUxNzU3OCBjIC0xLjMwMTEzLDAgLTEuODY4NDQ2LC0wLjM1Mzc2IC0yLjM3MzA0NywtMC45MDYyNSAtMC41MDQ2MDIsLTAuNTUyNDggLTAuOTEyOTYsLTEuNDczNDYgLTAuOTMzNTk0LC0yLjcyNDYxIHoiIHN0eWxlPSJjb2xvcjojMDAwMDAwO29wYWNpdHk6MTtmaWxsOiNmZmZmZmY7LWlua3NjYXBlLXN0cm9rZTpub25lIiBpZD0icGF0aDE5NjU1Ii8+JiN4YTsgIDwvZz4mI3hhOzwvc3ZnPg==;', 
		    		s * 32, s * 42, 'Agent Assist', null, null, null, this.getTagsForStencil(gn, '', dt + 'agent assist').join(' ')),

		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjM2Mi4yMjI0NzgzNzUzNTMxNSIgaGVpZ2h0PSIzNzcuMzU5NDg0NzI1NTkyNSIgdmlld0JveD0iNjcuMzQ3OTk5NTcyNzUzOSAxMDguNjg4MDAzNTQwMDM5MDYgOTUuODM4MDA1MDY1OTE3OTcgOTkuODQzMDAyMzE5MzM1OTQiPiYjeGE7PHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzY2OWRmNjt9JiN4YTsJLnN0MXtmaWxsOiNhZWNiZmE7fSYjeGE7CS5zdDJ7ZmlsbDojNDI4NWY0O30mI3hhOzwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTk2LjE5OSAxNzMuODAxdjI1Ljk5bDE5LjE4MSA4Ljc0di0yNS45MjZ6bTQuNzcxIDguNjYybDkuNjczIDQuNDA4djEyLjk4NWwtOS42NzMtNC4zNzV6bS00Ljc3MS0zOC45Njl2MjEuNjg2bDE5LjE4MSA4LjczMnYtMjEuNjg0bC00LjczNy0yLjA5NXYxNS4wNmwtOS42NzMtNC4zOTV2LTE1LjE3ek02Ny4zNDggMTMwLjMydjU2LjU1bDE5LjExNCA4Ljc4M3YtNTYuNjU4bC00LjczNC0yLjEyN3Y0OS45MDhsLTkuNTUzLTQuMzgxVjEzMi40OXoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNOTYuMTE2IDExNy4zMTZsMTkuMjY0LTguNjI4IDQ3LjgwNiAyMS43NjMtMTguNzkgOC42MzJ6bTE5LjI2NCAzNC45MTJsLTE5LjE4MS04Ljc0NiAxOS4xODEtOC43MzkgMTkuMjE1IDguNzU5ek04Ni40NjIgMTM5LjA2bC0xOS4xMTQtOC43NDYgMTkuMTE0LTguNzM5IDE5LjM2MiA4Ljc1OXoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMTQ0LjM5NiAxNjAuNjEzdi0yMS41M2wxOC43OS04LjYzMnYyMS42NTd6TTExNS4zOCAxODIuNTNsNDcuODA2LTIxLjcxMnYyNS45MDRsLTQ3LjgwNiAyMS42MjZ6bTAtOC42MTh2LTIxLjY4NGwxOS4yMTUtOC43MzJ2MjEuNTQ1eiIvPiYjeGE7PC9zdmc+;', 
		    		s * 40, s * 42, 'AI Hub', null, null, null, this.getTagsForStencil(gn, '', dt + 'ai hub artificial intelligence').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE2Ljk3OTk5OTU0MjIzNjMyOCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDE2Ljk3OTk5OTU0MjIzNjMyOCAyMCI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzY2OWRmNjt9JiN4YTsJLnN0MXtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDJ7ZmlsbDojYWVjYmZhO30mI3hhOwk8L3N0eWxlPiYjeGE7CTxnIGNsYXNzPSJzdDAiPiYjeGE7CQk8cGF0aCBkPSJNOC40OSAxMC4yOUwuMjQgNS4zNSA4LjQ5LjU4bDguMjQgNC42N3pNMS43NiA1LjM2bDYuNzIgNCA2LjcyLTQuMTEtNi43MS0zLjc4eiIvPiYjeGE7CQk8cGF0aCBkPSJNOC40OSAxOS40NEwuMjEgMTMuODkgOC40OSA5LjNsOC4xNSA0LjY0em0tNi44LTUuNWw2LjggNC41NiA2LjctNC41LTYuNy0zLjgyeiIvPiYjeGE7CTwvZz4mI3hhOwk8ZyBjbGFzcz0ic3QxIj4mI3hhOwkJPHBhdGggZD0iTS42MTMgNS41MDJsLjY3NS0uMzcxIDcuNDc3IDEzLjYtLjY3NS4zNzF6Ii8+JiN4YTsJCTxwYXRoIGQ9Ik04LjE5NCAxOC44MjZsNy4zMDEtMTMuNTU5LjY3OC4zNjUtNy4zMDEgMTMuNTU5ek0uNzE2IDEzLjY4N0w4LjA5Ni45MDRsLjY2Ny4zODUtNy4zOCAxMi43ODN6Ii8+JiN4YTsJCTxwYXRoIGQ9Ik04LjE5NCAxLjIxNGwuNjY5LS4zODEgNy40MDUgMTIuOTg3LS42NjkuMzgxeiIvPiYjeGE7CQk8cGF0aCBkPSJNOC4xMy45NmguNzdWMTguOWgtLjc3ek0uNTUgNS40M2guNzd2OC42NkguNTV6bTE0Ljk3LS4wOWguNzdWMTRoLS43N3oiLz4mI3hhOwk8L2c+JiN4YTsJPGcgY2xhc3M9InN0MiI+JiN4YTsJCTxjaXJjbGUgY3g9IjguNTIiIGN5PSIxLjA3IiByPSIxLjA3Ii8+JiN4YTsJCTxjaXJjbGUgY3g9IjE1LjkxIiBjeT0iNS4zNCIgcj0iMS4wNyIvPiYjeGE7CQk8Y2lyY2xlIGN4PSIxLjA3IiBjeT0iNS4zNCIgcj0iMS4wNyIvPiYjeGE7CQk8Y2lyY2xlIGN4PSI4LjUyIiBjeT0iOS45MyIgcj0iMS42OCIvPiYjeGE7CQk8Y2lyY2xlIGN4PSIxNS45MSIgY3k9IjEzLjk0IiByPSIxLjA3Ii8+JiN4YTsJCTxjaXJjbGUgY3g9IjEuMDciIGN5PSIxMy45NCIgcj0iMS4wNyIvPiYjeGE7CQk8Y2lyY2xlIGN4PSI4LjUyIiBjeT0iMTguOTMiIHI9IjEuMDciLz4mI3hhOwkJPHBhdGggZD0iTTguNDkgMTAuMjlMLjI0IDUuMzUgOC40OS41OGw4LjI0IDQuNjd6TTEuNzYgNS4zNmw2LjcyIDQgNi43Mi00LjExLTYuNzEtMy43OHoiLz4mI3hhOwkJPHBhdGggZD0iTTguNDkgMTkuNDRMLjIxIDEzLjg5IDguNDkgOS4zbDguMTUgNC42NHptLTYuOC01LjVsNi44IDQuNTYgNi43LTQuNS02LjctMy44MnoiLz4mI3hhOwkJPHBhdGggZD0iTS42MTMgNS41MDJsLjY3NS0uMzcxIDcuNDc3IDEzLjYtLjY3NS4zNzF6Ii8+JiN4YTsJCTxwYXRoIGQ9Ik04LjE5NCAxOC44MjZsNy4zMDEtMTMuNTU5LjY3OC4zNjUtNy4zMDEgMTMuNTU5ek0uNzE2IDEzLjY4N0w4LjA5Ni45MDRsLjY2Ny4zODUtNy4zOCAxMi43ODN6Ii8+JiN4YTsJCTxwYXRoIGQ9Ik04LjE5NCAxLjIxNGwuNjY5LS4zODEgNy40MDUgMTIuOTg3LS42NjkuMzgxeiIvPiYjeGE7CQk8cGF0aCBkPSJNOC4xMy45NmguNzdWMTguOWgtLjc3ek0uNTUgNS40M2guNzd2OC42NkguNTV6bTE0Ljk3LS4wOWguNzdWMTRoLS43N3oiLz4mI3hhOwk8L2c+JiN4YTsJPGcgY2xhc3M9InN0MCI+JiN4YTsJCTxjaXJjbGUgY3g9IjguNTIiIGN5PSIxLjA3IiByPSIxLjA3Ii8+JiN4YTsJCTxjaXJjbGUgY3g9IjE1LjkxIiBjeT0iNS4zNCIgcj0iMS4wNyIvPiYjeGE7CQk8Y2lyY2xlIGN4PSIxLjA3IiBjeT0iNS4zNCIgcj0iMS4wNyIvPiYjeGE7CQk8Y2lyY2xlIGN4PSI4LjUyIiBjeT0iOS45MyIgcj0iMS42OCIvPiYjeGE7CQk8Y2lyY2xlIGN4PSIxNS45MSIgY3k9IjEzLjk0IiByPSIxLjA3Ii8+JiN4YTsJCTxjaXJjbGUgY3g9IjEuMDciIGN5PSIxMy45NCIgcj0iMS4wNyIvPiYjeGE7CQk8Y2lyY2xlIGN4PSI4LjUyIiBjeT0iMTguOTMiIHI9IjEuMDciLz4mI3hhOwk8L2c+JiN4YTs8L3N2Zz4=;', 
		    		s * 36, s * 42, 'Advanced\nSolutions Lab', null, null, null, this.getTagsForStencil(gn, '', dt + 'advanced solutions lab').join(' '))
	 	];
		
		this.addPalette('gcp2Icons AI and Machine Learning', 'GCP Icons / AI and Machine Learning', false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addGCP2IconsComputePalette = function()
	{
		var sb = this;
		var s = 1;
		var n = 'sketch=0;html=1;verticalAlign=top;labelPosition=center;verticalLabelPosition=bottom;align=center;spacingTop=-6;fontSize=11;fontStyle=1;fontColor=#999999;shape=image;aspect=fixed;imageAspect=0;';
		var dt = 'gcp google cloud platform icons icon compute ';
		var gn = 'mxgraph.gcp2';
		var fns = [];
		
		var fns = [
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNNyA3aDZ2Nkg3eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik05IDBoMnY0SDl6TTUgMGgydjRINXptOCAwaDJ2NGgtMnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNOSAxNmgydjRIOXptLTQgMGgydjRINXptOCAwaDJ2NGgtMnptMy01VjloNHYyem0wIDR2LTJoNHYyem0wLThWNWg0djJ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTAgMTFWOWg0djJ6bTAgNHYtMmg0djJ6bTAtOFY1aDR2MnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMyAzdjE0aDE0VjN6bTEyIDEySDVWNWgxMHoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTAgMTBsLTMgM2g2eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMyA3bC0zIDMgMyAzeiIvPiYjeGE7PC9zdmc+;', 
		    		s * 42, s * 42, 'Compute\nEngine', null, null, null, this.getTagsForStencil(gn, '', dt + 'compute engine').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE5Ljk4OTk5OTc3MTExODE2NCIgdmlld0JveD0iMCAwIDIwIDE5Ljk4OTk5OTc3MTExODE2NCI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJLnN0MXtmaWxsOiM2NjlkZjY7fSYjeGE7CS5zdDJ7ZmlsbDojYWVjYmZhO30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0zIDMuOTlMMCA2LjQydjcuMTNsMyAyLjQ0eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0zIDMuOTlsLTMgNCAzLTJ6bS0zIDhsMyA0di0yeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0wIDE1Ljk5bDQgNCAyLTItNi02em0uMDEtOEw1Ljk5IDJsLTItMkwwIDMuOTl6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTE3IDE2bDMtMi40MlY2LjQ0TDE3IDR6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTE3IDE2bDMtNC0zIDJ6bTMtOGwtMy00djJ6Ii8+JiN4YTsJPGcgY2xhc3M9InN0MiI+JiN4YTsJCTxwYXRoIGQ9Ik0yMCA0bC00LTQtMiAyIDYgNnptLS4wMSA4bC01Ljk4IDUuOTkgMiAyTDIwIDE2eiIvPiYjeGE7CQk8Y2lyY2xlIGN4PSI2IiBjeT0iOS45OSIgcj0iMSIvPiYjeGE7CQk8Y2lyY2xlIGN4PSIxMCIgY3k9IjkuOTkiIHI9IjEiLz4mI3hhOwkJPGNpcmNsZSBjeD0iMTMuOTkiIGN5PSI5Ljk5IiByPSIxIi8+JiN4YTsJPC9nPiYjeGE7PC9zdmc+;', 
		    		s * 42, s * 34, 'Cloud\nFunctions', null, null, null, this.getTagsForStencil(gn, '', dt + 'cloud functions').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjM2NS40NjQ5OTY3NzA0MjQ5MyIgaGVpZ2h0PSIzNzkuMjIyOTk0NDYzNTc3OTUiIHZpZXdCb3g9IjAgMCA5Ni42OTU5OTkxNDU1MDc4MSAxMDAuMzM1OTk4NTM1MTU2MjUiPiYjeGE7PHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJLnN0MXtmaWxsOiNhZWNiZmE7fSYjeGE7PC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMjkuNzk0IDEwMC4zMzZMNDYuOTIgNTAuMTY4aDQ5Ljc3NnpNMCA5OS42NzFsMTIuOTc2LTQ5LjUwMkgyOS4yMkwxNi44OTcgOTIuMDU0eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0yOS43OTQgMEw0Ni45MiA1MC4xNjhoNDkuNzc2ek0wIC42NjZsMTIuOTc2IDQ5LjUwMkgyOS4yMkwxNi44OTcgOC4yODN6Ii8+JiN4YTs8L3N2Zz4=;', 
		    		s * 42, s * 42, 'Cloud\nRun', null, null, null, this.getTagsForStencil(gn, '', dt + 'cloud run').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE2LjAyMDAwMDQ1Nzc2MzY3MiIgZmlsbC1ydWxlPSJldmVub2RkIiB2aWV3Qm94PSI4Ljk0MDY5NjcxNjMwODU5NGUtOCAwIDIwIDE2LjAyMDAwMDQ1Nzc2MzY3MiI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJLnN0MXtmaWxsOiNhZWNiZmE7fSYjeGE7CS5zdDJ7ZmlsbDojNjY5ZGY2O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMi4zIDcuMjZsLTEuMjIgMS4yMkExLjcxIDEuNzEgMCAwIDEgMTAgMTEuNDlhMS43NCAxLjc0IDAgMCAxLTEuMzMtLjY0bC0xLjIyIDEuMjJhMy40MyAzLjQzIDAgMCAwIDUuOTg0LTEuMzgxQTMuNDMgMy40MyAwIDAgMCAxMi4zIDcuMjZ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTEwIDMuNTJhNi4yNSA2LjI1IDAgMCAwIDAgMTIuNSA2LjI1IDYuMjUgMCAwIDAgMC0xMi41bTAgMTAuNzRhNC40NSA0LjQ1IDAgMCAxLTMuMTU3LTcuNTk3QTQuNDUgNC40NSAwIDAgMSAxNC40NCA5LjgyIDQuNDQgNC40NCAwIDAgMSAxMCAxNC4yNiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xOS42MiA5LjE2bC0yLjU2LS44MWE3LjEgNy4xIDAgMCAxIC4xNyAxLjUzIDcuNjIgNy42MiAwIDAgMS0uMDggMS4wOGgyLjQ3YS40NC40NCAwIDAgMCAuMzgtLjQydi0xYS40NC40NCAwIDAgMC0uMzgtLjQyTTEwIDIuNzhhNy40OCA3LjQ4IDAgMCAxIDEuNS4xNUwxMC41OC4zOGMtLjA3LS4yMi0uMjEtLjM4LS40Mi0uMzhoLS4zOGEuNDUuNDUgMCAwIDAtLjQyLjM4bC0uOCAyLjU0QTcuNjQgNy42NCAwIDAgMSAxMCAyLjc4bS03LjIzIDcuMWE3LjEgNy4xIDAgMCAxIC4xNy0xLjUzbC0yLjU2LjgxYS40NC40NCAwIDAgMC0uMzguNDJ2MWEuNDQuNDQgMCAwIDAgLjM4LjQyaDIuNDdhNy42MiA3LjYyIDAgMCAxLS4wOC0xLjA4Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTEwIDcuMjZhMi41IDIuNSAwIDEgMCAwIDUgMi41IDIuNSAwIDEgMCAwLTV6bTAgMy43NWExLjI1IDEuMjUgMCAxIDEgMC0yLjUgMS4yNSAxLjI1IDAgMCAxIDEuMjUgMS4yNUExLjI1IDEuMjUgMCAwIDEgMTAgMTEuMDJ6Ii8+JiN4YTs8L3N2Zz4=;', 
		    		s * 42, s * 34, 'App Engine', null, null, null, this.getTagsForStencil(gn, '', dt + 'app engine').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjMyOS45MjU5OTcyMzE3OTM4IiBoZWlnaHQ9IjM3OC4yODQ5OTAzMTEyNzg4IiB2aWV3Qm94PSIwIDAgODcuMjkyOTk5MjY3NTc4MTIgMTAwLjA4Nzk5NzQzNjUyMzQ0Ij4mI3hhOzxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiNhZWNiZmE7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6IzQyODVmNDt9JiN4YTs8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00My43NTEgMEwwIDI1LjQ2NXYyLjU4OCA0Ni45Mmw0My43NTIgMjUuMTE1IDQzLjU0MS0yNS4xMjFWMjUuNDczem0yLjQzOCAxMS44NTNsMzIuMTAzIDE4Ljc4MlY2OS43N0w0My43MzkgODkuNzA1IDkgNjkuNzYyVjMwLjY0MWwzMi4xOS0xOC43MzZ2MTQuMTU0TDI0LjUwMyAzNi4xNTNsMTkuMTcyIDExLjUwMiAxOC44ODYtMTEuNTU0LTE2LjM3Mi0xMC4wMjR6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTIyLjAyNSA0MC40OTZsLjE2NiAxOS4xNDMtMTMuMjQ3IDcuMzN2Mi43NDJsMi42MzcgMS41MTQgMTIuNjQ4LTYuOTk5IDE2Ljk2MSAxMC42MDJWNTEuOTkzeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik02NS4zNDQgNDAuMjZMNDYuMTg5IDUxLjk3OXYyMi44NDdsMTYuODk5LTEwLjU3NiAxMi41MzkgNi45NzQgMi42MDktMS41MDV2LTIuNzY1bC0xMi43ODQtNy4xMTJ6Ii8+JiN4YTs8L3N2Zz4=;', 
		    		s * 37, s * 42, 'Google Kubernetes\nEngine', null, null, null, this.getTagsForStencil(gn, '', dt + 'google kubernetes engine').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJzdmc2NDI3IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxMzkuMzMxMjQgMTM5LjUxODAyIiBoZWlnaHQ9IjEzOS41MTgwMm1tIiB3aWR0aD0iMTM5LjMzMTI0bW0iPiYjeGE7ICAmI3hhOyAgPGRlZnMgaWQ9ImRlZnM2NDI0Ii8+JiN4YTsgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0zNy42MzI4MTYsLTYwLjY3MzM5MikiIGlkPSJsYXllcjEiPiYjeGE7ICAgIDxwYXRoIGlkPSJwYXRoNjU4NCIgZD0ibSA2NS4yNjEzNDksODkuNDE4MzQ1IDI4LjY1MTMyNCwyZS02IC0wLjE4NzI2MywtMjguNzQ0OTU1IGggODMuMDUxMzkgbCAwLjE4NzI2LDgzLjE0NTAxOCAtMjguNTU3NywwLjA5MzYgdiAyOC41NTc3IEggNjUuNDQ4NjEyIFoiIHN0eWxlPSJvcGFjaXR5OjE7ZmlsbDojNDI4NWY0O2ZpbGwtb3BhY2l0eToxO3N0cm9rZTpub25lO3N0cm9rZS13aWR0aDowLjI2NDU4M3B4O3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1vcGFjaXR5OjEiLz4mI3hhOyAgICA8cGF0aCBkPSJtIDcyLjg0NTY5OCwxMjkuNzY3NTggYyAtMTkuNDA1NDYxLDAgLTM1LjIxMjg4MiwxNS44MDU0NyAtMzUuMjEyODgyLDM1LjIxMDk0IDAsMTkuNDA1NDYgMTUuODA3NDIxLDM1LjIxMjg5IDM1LjIxMjg4MiwzNS4yMTI4OSAxOS40MDU0NjgsMCAzNS4yMTA5NDIsLTE1LjgwNzQzIDM1LjIxMDk0MiwtMzUuMjEyODkgMCwtMTkuNDA1NDcgLTE1LjgwNTQ3NCwtMzUuMjEwOTQgLTM1LjIxMDk0MiwtMzUuMjEwOTQgeiBNIDEwNS44OTA2Myw3Mi45Nzg1MTYgViAxMDEuNTM1MTYgSCA3Ny4yMzgyODUgdiA2IDUzLjIzODI4IGggNTguODE2NDA1IHYgLTI4LjgzNzg5IGggMjguOTQzMzYgbCAtMC4xMTcxOSwtNTguOTU3MDM0IHogbSAxMiwxMiBoIDM1LjAxMzY3IGwgMC4wNzAzLDM0Ljk1NzAzNCBoIC0yOC45MTk5MiB2IDI4LjgzNzg5IEggODkuMjM4Mjc5IHYgLTM1LjIzODI4IGggMjguNjUyMzUxIHoiIHN0eWxlPSJjb2xvcjojMDAwMDAwO29wYWNpdHk6MTtmaWxsOiNmZmZmZmY7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kOy1pbmtzY2FwZS1zdHJva2U6bm9uZSIgaWQ9InBhdGg2NTQ5Ii8+JiN4YTsgICAgPHBhdGggaWQ9InBhdGg3MTgwIiBkPSJtIDcyLjg0NTcwMywxMzYuNzY3NTggYyAxNS42MjIzODgsMCAyOC4yMTA5MzcsMTIuNTg4NTUgMjguMjEwOTM3LDI4LjIxMDk0IDAsMTUuNjIyMzggLTEyLjU4ODU0OSwyOC4yMTI4OSAtMjguMjEwOTM3LDI4LjIxMjg5IC0xNS42MjIzODcsMCAtMjguMjEyODkxLC0xMi41OTA1MSAtMjguMjEyODkxLC0yOC4yMTI4OSAwLC0xNS42MjIzOSAxMi41OTA1MDQsLTI4LjIxMDk0IDI4LjIxMjg5MSwtMjguMjEwOTQgeiIgc3R5bGU9ImNvbG9yOiMwMDAwMDA7b3BhY2l0eToxO2ZpbGw6IzQyODVmNDtmaWxsLW9wYWNpdHk6MTtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7LWlua3NjYXBlLXN0cm9rZTpub25lIi8+JiN4YTsgICAgPHBhdGggaWQ9InBhdGgxMjQ2MCIgZD0ibSA3Mi41MTk1MzEsMTQ4Ljg3NSAtNC40ODA0NjksNC40Mjk2OSA5LjA5NTcwNCw5LjIwMzEyIEggNTYuNjg1NTQ3IHYgNi4yOTg4MyBoIDIwLjQyMTg3NSBsIC05LjA2MjUsOS4xMjEwOSA0LjQ2ODc1LDQuNDM5NDYgMTYuNTk3NjU2LC0xNi43MDMxMyB6IiBzdHlsZT0iY29sb3I6IzAwMDAwMDtvcGFjaXR5OjE7ZmlsbDojZmZmZmZmO2ZpbGwtb3BhY2l0eToxOy1pbmtzY2FwZS1zdHJva2U6bm9uZSIvPiYjeGE7ICA8L2c+JiN4YTs8L3N2Zz4=;', 
		    		s * 42, s * 42, 'Google Cloud\nVMware Engine', null, null, null, this.getTagsForStencil(gn, '', dt + 'google cloud vmware engine').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJzdmcyNzk1MiIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMTcwLjIyMjY5IDE3OS40NDAwOCIgaGVpZ2h0PSIxNzkuNDQwMDhtbSIgd2lkdGg9IjE3MC4yMjI2OW1tIj4mI3hhOyAgJiN4YTsgIDxkZWZzIGlkPSJkZWZzMjc5NDkiLz4mI3hhOyAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTI2LjAyOTQxOSwtNTAuNTE5NTMpIiBpZD0ibGF5ZXIxIj4mI3hhOyAgICA8cGF0aCBkPSJNIDY5MS4zODg2Nyw1MzUuMDAxOTUgNDIwLjM5ODQ0LDgwNi42NjQwNiAxNDkuNDIzODMsNTM1LjY4OTQ1IDEyMy43NzE0OCw1NjEuMzQ3NjYgMjE0LjQ3ODUyLDY1Mi4wNTQ2OSA5OC4zNzg5MDYsNzA5LjE4MzU5IDQyMS44MzAwOCw4NjkuMTM4NjcgNzQxLjc0MDIzLDcwOC40NzQ2MSA2MjYuMDM5MDYsNjUxLjg4MjgxIDcxNy4wNzAzMSw1NjAuNjI1IFogTSA0MjAuMzk4NjMsMTkwLjkzOTk2IDEzNS43MzA4MSw0NzUuNjAwNDEgMTQ4LjUyMzYyLDQ4OC40MzAxMyA0MjAuMzk4NjMsNzYxLjA0MzMgNzA1Ljg0MTU2LDQ3NS42MDA0MSBaIG0gMC4wMzAyLDUxLjI3NDYxIEwgNjU0LjQ5Mzg0LDQ3NS42MzczIDQyMC40Mjg4Nyw3MDkuNjk0OSAxODcuMDEzNTIsNDc1LjYyOTkzIFoiIHRyYW5zZm9ybT0ic2NhbGUoMC4yNjQ1ODMzMykiIHN0eWxlPSJjb2xvcjojMDAwMDAwO29wYWNpdHk6MTtmaWxsOiM0Mjg1ZjQ7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlLXdpZHRoOjMuNzc5NTM7LWlua3NjYXBlLXN0cm9rZTpub25lIiBpZD0icGF0aDI4MDkyIi8+JiN4YTsgIDwvZz4mI3hhOzwvc3ZnPg==;', 
		    		s * 40, s * 42, 'Bare Metal\nSolution', null, null, null, this.getTagsForStencil(gn, '', dt + 'bare metal solution').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTEzLjMzIDB2Mi4zOGgtMi4xNlYwSDguODN2Mi4zOEg2LjY3VjBINC4yOXYyLjM4YTIgMiAwIDAgMC0xLjkxIDEuOTFIMHYyLjM4aDIuMzh2Mi4xNEgwdjIuMzhoMi4zOHYyLjE0SDB2Mi4zOGgyLjM4YTIgMiAwIDAgMCAxLjkxIDEuOTFWMjBoMi4zOHYtMi4zOGgyLjE2VjIwaDIuMzR2LTIuMzhoMi4xNlYyMGgyLjM4di0yLjM4YTIgMiAwIDAgMCAxLjkxLTEuOTFIMjB2LTIuMzhoLTIuMzh2LTIuMTRIMjBWOC44MWgtMi4zOFY2LjY3SDIwVjQuMjloLTIuMzhhMiAyIDAgMCAwLTEuOTEtMS45MVYwem0xLjUzIDE1LjI0SDUuMTRhLjM4LjM4IDAgMCAxLS4zOC0uMzhWNS4xNGEuMzguMzggMCAwIDEgLjM4LS4zOGg5LjcyYS4zOC4zOCAwIDAgMSAuMzguMzh2OS43MmEuMzguMzggMCAwIDEtLjM4LjM4em0tMi4wNy02LjEybC0zLjUgNC44NnYtMy42M0g3LjIybDMuNjEtNC44MXYzLjU4eiIvPiYjeGE7PC9zdmc+;', 
		    		s * 42, s * 42, 'Cloud GPUs', null, null, null, this.getTagsForStencil(gn, '', dt + 'gpu graphics processing unit').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWxuczp2PSJodHRwczovL3ZlY3RhLmlvL25hbm8iIHdpZHRoPSIxOS41MSIgaGVpZ2h0PSIxOS41IiB2aWV3Qm94PSIwIDAgMTkuNTEgMTkuNSI+JiN4YTsJPHBhdGggZD0iTTE3LjI2IDE3LjgxaC0uN3YtMS41aC43YS43Ni43NiAwIDAgMCAuNzUtLjc1di00LjMxYS43Ni43NiAwIDAgMC0uNzUtLjc1aC0zLjYxVjloMy42MWEyLjI1IDIuMjUgMCAwIDEgMi4yNSAyLjI1djQuMzFhMi4yNSAyLjI1IDAgMCAxLTIuMjUgMi4yNXptLTcuOTUgMGgtNC45di0xLjVoNC45eiIgZmlsbD0iIzQyODVmNCIvPiYjeGE7CTxwYXRoIGZpbGw9IiM2NjlkZjYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTUuODggMTAuNUgyLjI2QTIuMjUgMi4yNSAwIDAgMSAuMDEgOC4yNVYzLjk0YTIuMjUgMi4yNSAwIDAgMSAyLjI1LTIuMjVoMXYxLjVoLTFhLjc1Ljc1IDAgMCAwLS43NS43NXY0LjMxYS43Ni43NiAwIDAgMCAuNzUuNzVoMy42MnoiLz4mI3hhOwk8cGF0aCBmaWxsPSIjNDI4NWY0IiBkPSJNMTUuMDYgMy4xOUg5LjU4di0xLjVoNS40OHoiLz4mI3hhOwk8cGF0aCBmaWxsPSIjYWVjYmZhIiBkPSJNNi4zOSAxLjY5Vi4xOWgtM2ExLjEzIDEuMTMgMCAwIDAtMS4xMyAxLjEydjIuMjVhMS4xMyAxLjEzIDAgMCAwIDEuMTMgMS4xM2gzdi0xLjVIMy43NnYtMS41eiIvPiYjeGE7CTxwYXRoIGZpbGw9IiM2NjlkZjYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTEwLjUxIDEuMzF2Mi4yNWExLjEzIDEuMTMgMCAwIDEtMS4xMiAxLjEzaC0zdi0xLjVoMi42MnYtMS41SDYuMzlWLjE5aDNhMS4xMiAxLjEyIDAgMCAxIDEuMTIgMS4xMnoiLz4mI3hhOwk8cGF0aCBmaWxsPSIjYWVjYmZhIiBkPSJNMTcuMDcgNC44OGEyLjQ0IDIuNDQgMCAxIDEgMi40NC0yLjQ0IDIuNDUgMi40NSAwIDAgMS0yLjQ0IDIuNDR6bTAtMy4zOGEuOTQuOTQgMCAxIDAgLjk0Ljk0Ljk0Ljk0IDAgMCAwLS45NC0uOTR6Ii8+JiN4YTsJPHVzZSB4bGluazpocmVmPSIjQiIgZmlsbD0iIzlhYTBhNiIvPiYjeGE7CTxnIGZpbGw9IiNhZWNiZmEiPiYjeGE7CQk8dXNlIHhsaW5rOmhyZWY9IiNCIi8+JiN4YTsJCTxwYXRoIGQ9Ik0xMy4xMiAxNi4zMnYtMS41aC0zQTEuMTMgMS4xMyAwIDAgMCA5IDE1Ljk1djIuMjVhMS4xMiAxLjEyIDAgMCAwIDEuMTIgMS4xMmgzdi0xLjVIMTAuNXYtMS41eiIvPiYjeGE7CTwvZz4mI3hhOwk8cGF0aCBmaWxsPSIjNjY5ZGY2IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNy4yNSAxNS45NXYyLjI1YTEuMTMgMS4xMyAwIDAgMS0xLjEzIDEuMTJoLTN2LTEuNWgyLjY0di0xLjVoLTIuNjR2LTEuNWgzYTEuMTQgMS4xNCAwIDAgMSAxLjEzIDEuMTN6Ii8+JiN4YTsJPHBhdGggZmlsbD0iI2FlY2JmYSIgZD0iTTkuNzYgOVY3LjVoLTNhMS4xMyAxLjEzIDAgMCAwLTEuMTMgMS4xMnYyLjI1QTEuMTMgMS4xMyAwIDAgMCA2Ljc2IDEyaDN2LTEuNUg3LjEzVjl6Ii8+JiN4YTsJPHBhdGggZmlsbD0iIzY2OWRmNiIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMTMuODggOC42MnYyLjI1QTEuMTMgMS4xMyAwIDAgMSAxMi43NiAxMmgtM3YtMS41aDIuNjJWOUg5Ljc2VjcuNWgzYTEuMTIgMS4xMiAwIDAgMSAxLjEyIDEuMTJ6Ii8+JiN4YTsJPGRlZnM+JiN4YTsJCTxwYXRoIGlkPSJCIiBkPSJNMi40NSAxOS41YTIuNDQgMi40NCAwIDEgMSAyLjQzLTIuNDQgMi40NCAyLjQ0IDAgMCAxLTIuNDMgMi40NHptMC0zLjM4YS45NC45NCAwIDEgMCAuOTMuOTQuOTQuOTQgMCAwIDAtLjkzLS45NHoiLz4mI3hhOwk8L2RlZnM+JiN4YTs8L3N2Zz4=;', 
		    		s * 42, s * 42, 'Workflows', null, null, null, this.getTagsForStencil(gn, '', dt + 'workflows').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJzdmcxNzg1MSIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMTIxLjU4NzkxIDEzMy42NzU5MyIgaGVpZ2h0PSIxMzMuNjc1OTNtbSIgd2lkdGg9IjEyMS41ODc5MW1tIj4mI3hhOyAgJiN4YTsgIDxkZWZzIGlkPSJkZWZzMTc4NDgiLz4mI3hhOyAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTQ4LjI5MDk0NywtODQuMjY5Njk5KSIgaWQ9ImxheWVyMSI+JiN4YTsgICAgPHJlY3QgeT0iODQuMjY5Njk5IiB4PSI0OC4yOTA5NDciIGhlaWdodD0iMzUuMDE3MTg5IiB3aWR0aD0iOTguMTc0NTc2IiBpZD0icmVjdDE3OTg4IiBzdHlsZT0ib3BhY2l0eToxO2ZpbGw6I2FlY2JmYTtmaWxsLW9wYWNpdHk6MTtzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MTM7c3Ryb2tlLWxpbmVqb2luOnJvdW5kIi8+JiN4YTsgICAgPHBhdGggZD0ibSAxMzIuNTE0NCwxMDEuNzc4MjkgYSAzLjA0MzAzMjksMy4wNDMwMzI5IDAgMCAxIC0zLjA0MzAzLDMuMDQzMDMgMy4wNDMwMzI5LDMuMDQzMDMyOSAwIDAgMSAtMy4wNDMwNCwtMy4wNDMwMyAzLjA0MzAzMjksMy4wNDMwMzI5IDAgMCAxIDMuMDQzMDQsLTMuMDQzMDI2IDMuMDQzMDMyOSwzLjA0MzAzMjkgMCAwIDEgMy4wNDMwMywzLjA0MzAyNiB6IE0gNjIuNzU4MzI1LDk5LjI3ODI5NCB2IDQuOTk5OTk2IGggMzUuOTU1MDc4IHYgLTQuOTk5OTk2IHoiIHN0eWxlPSJjb2xvcjojMDAwMDAwO2ZpbGw6I2ZmZmZmZjtzdHJva2Utd2lkdGg6NC45OTk5OTtzdHJva2UtbGluZWpvaW46cm91bmQ7LWlua3NjYXBlLXN0cm9rZTpub25lIiBpZD0icGF0aDE4NjY4Ii8+JiN4YTsgICAgPHJlY3QgeT0iMTI5LjkyMTU3IiB4PSI0OC4yOTA5NDciIGhlaWdodD0iMzUuMDE3MTg5IiB3aWR0aD0iOTguMTc0NTc2IiBpZD0icmVjdDE3OTg4LTgiIHN0eWxlPSJvcGFjaXR5OjE7ZmlsbDojNjY5ZGY2O2ZpbGwtb3BhY2l0eToxO3N0cm9rZTpub25lO3N0cm9rZS13aWR0aDoxMztzdHJva2UtbGluZWpvaW46cm91bmQiLz4mI3hhOyAgICA8cGF0aCBpZD0icGF0aDE4OTk1IiBkPSJtIDYyLjc1ODMyNSwxNDQuOTMwMTcgdiA0Ljk5OTk5IGggMzUuOTU1MDc4IHYgLTQuOTk5OTkgeiIgc3R5bGU9ImNvbG9yOiMwMDAwMDA7ZmlsbDojZmZmZmZmO3N0cm9rZS13aWR0aDo0Ljk5OTk5O3N0cm9rZS1saW5lam9pbjpyb3VuZDstaW5rc2NhcGUtc3Ryb2tlOm5vbmUiLz4mI3hhOyAgICA8cmVjdCB5PSIxNzUuNTczNDQiIHg9IjQ4LjI5MDk0NyIgaGVpZ2h0PSIzNS4wMTcxODkiIHdpZHRoPSI5OC4xNzQ1NzYiIGlkPSJyZWN0MTc5ODgtMSIgc3R5bGU9Im9wYWNpdHk6MTtmaWxsOiM0Mjg1ZjQ7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjEzO3N0cm9rZS1saW5lam9pbjpyb3VuZCIvPiYjeGE7ICAgIDxwYXRoIGlkPSJwYXRoMTg5OTkiIGQ9Im0gNjIuNzU4MzI1LDE5MC41ODIwNCB2IDQuOTk5OTkgaCAzNS45NTUwNzggdiAtNC45OTk5OSB6IiBzdHlsZT0iY29sb3I6IzAwMDAwMDtmaWxsOiNmZmZmZmY7c3Ryb2tlLXdpZHRoOjQuOTk5OTk7c3Ryb2tlLWxpbmVqb2luOnJvdW5kOy1pbmtzY2FwZS1zdHJva2U6bm9uZSIvPiYjeGE7ICAgIDxjaXJjbGUgcj0iMzcuNTI5NzM5IiBjeT0iMTgwLjQxNTg5IiBjeD0iMTMyLjM0OTEyIiBpZD0icGF0aDE5MTIxLTkiIHN0eWxlPSJvcGFjaXR5OjE7ZmlsbDojZmZmZmZmO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTpub25lO3N0cm9rZS13aWR0aDo1LjIxMzE7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lIi8+JiN4YTsgICAgPHBhdGggdHJhbnNmb3JtPSJzY2FsZSgwLjI2NDU4MzMzKSIgZD0ibSA1MDAuMjE4NzUsNTY4LjIyODUyIGMgLTYyLjY4MjA3LDAgLTExMy42NTgxNyw1MC45NzYxMyAtMTEzLjY1ODIsMTEzLjY1ODIgMCw2Mi42ODIwNiA1MC45NzYxMywxMTMuNjYwMTUgMTEzLjY1ODIsMTEzLjY2MDE2IDYyLjY4MjA3LDAgMTEzLjY2MDE5LC01MC45NzgxIDExMy42NjAxNiwtMTEzLjY2MDE2IDAsLTYyLjY4MjA3IC01MC45NzgwOSwtMTEzLjY1ODIgLTExMy42NjAxNiwtMTEzLjY1ODIgeiBtIC05LjQ0OTIyLDE4LjMwNDY4IHYgODUuOTA2MjUgaCAtMzAuMTQyNTggYyAxLjAxNDU4LC0yNC41OTk1OCA1LjkyMDM5LC00Ni42MTIxMSAxMy4wMDk3NywtNjIuNDk2MDkgMy45OTMwNywtOC45NDY3MSA4LjY3ODI5LC0xNS45MDY5NCAxMy4zNDU3LC0yMC4zMzAwOCAxLjI4NzA3LC0xLjIxOTcyIDIuNTQ3MjQsLTIuMjM3MTggMy43ODcxMSwtMy4wODAwOCB6IG0gMTguODk4NDQsMC4wMDQgYyAxLjIzNzM2LDAuODQyMjEgMi40OTQwNSwxLjg1ODE5IDMuNzc5MywzLjA3NjE3IDQuNjY3NDEsNC40MjMxNCA5LjM2MDQsMTEuMzgzMzcgMTMuMzUzNTEsMjAuMzMwMDggNy4wODkzOCwxNS44ODM5OCAxMS45OTcxNCwzNy44OTY1MSAxMy4wMTE3Miw2Mi40OTYwOSBoIC0zMC4xNDQ1MyB6IG0gMjIuNjE5MTQsMi4xMjg5MSBjIDM1Ljg2NTU4LDEyLjI5Nzg5IDYyLjMxODUsNDQuNjY4OTMgNjYuMDIxNDgsODMuNzczNDMgaCAtNDMuMzY1MjMgYyAtMC45OTgwMSwtMjYuNDUyNzMgLTYuMTUwMjMsLTUwLjMxNTM3IC0xNC4zMzc4OSwtNjguNjYwMTUgLTIuNDgzNzgsLTUuNTY0OTYgLTUuMjQ3NDgsLTEwLjYzMDI5IC04LjMxODM2LC0xNS4xMTMyOCB6IG0gLTY0LjE0MjU4LDAuMDAyIGMgLTMuMDY4MjcsNC40ODI0NCAtNS44MjkxMyw5LjU0NzI5IC04LjMxMjUsMTUuMTExMzMgLTguMTg3NjYsMTguMzQ0NzggLTEzLjMzNzkzLDQyLjIwNzQzIC0xNC4zMzU5NCw2OC42NjAxNSBoIC00My4zNjcxOCBjIDMuNzAyODEsLTM5LjEwMjM4IDMwLjE1MzAxLC03MS40NzIwNyA2Ni4wMTU2MiwtODMuNzcxNDggeiBtIC02Ni4wMTU2MiwxMDIuNjY3OTcgaCA0My4zNjcxOCBjIDAuOTk4MDEsMjYuNDUxNDUgNi4xNDgyOCw1MC4zMDc1NiAxNC4zMzU5NCw2OC42NTIzNCAyLjQ4NDI3LDUuNTY2MDYgNS4yNDY4LDEwLjYzMzUxIDguMzE2NDEsMTUuMTE5MTQgLTM1Ljg2Mzk2LC0xMi4yOTgzNCAtNjIuMzE2MTEsLTQ0LjY2ODQ4IC02Ni4wMTk1MywtODMuNzcxNDggeiBtIDU4LjQ5ODA0LDAgaCAzMC4xNDI1OCB2IDg1LjkwNDI5IGMgLTEuMjM5ODcsLTAuODQyODkgLTIuNTAwMDQsLTEuODYwMzUgLTMuNzg3MTEsLTMuMDgwMDcgLTQuNjY3NDEsLTQuNDIzMTUgLTkuMzUyNTksLTExLjM4MTQyIC0xMy4zNDU3LC0yMC4zMjgxMyAtNy4wODkxOSwtMTUuODgzNTYgLTExLjk5NTAxLC0zNy44OTczMiAtMTMuMDA5NzcsLTYyLjQ5NjA5IHogbSA0OS4wNDEwMiwwIGggMzAuMTQ0NTMgYyAtMS4wMTQ3NiwyNC41OTg3NyAtNS45MjI1Myw0Ni42MTI1MyAtMTMuMDExNzIsNjIuNDk2MDkgLTMuOTkzMTEsOC45NDY3MSAtOC42ODYxLDE1LjkwNDk4IC0xMy4zNTM1MSwyMC4zMjgxMyAtMS4yODUyNSwxLjIxNzk4IC0yLjU0MTk0LDIuMjMzOTYgLTMuNzc5MywzLjA3NjE3IHogbSA0NS4yNzUzOSwwIGggNDMuMzY1MjMgYyAtMy43MDM1OSwzOS4xMDUxMiAtMzAuMTU4NDYsNzEuNDc2NiAtNjYuMDI1MzksODMuNzczNDQgMy4wNzIyMiwtNC40ODYxOSA1LjgzNzU5LC05LjU1NDEyIDguMzIyMjcsLTE1LjEyMTEgOC4xODc2NiwtMTguMzQ0NzggMTMuMzM5ODgsLTQyLjIwMDg4IDE0LjMzNzg5LC02OC42NTIzNCB6IiBzdHlsZT0iY29sb3I6IzAwMDAwMDtvcGFjaXR5OjE7ZmlsbDojNDI4NWY0O2ZpbGwtb3BhY2l0eToxO3N0cm9rZS13aWR0aDozLjc3OTUzO3N0cm9rZS1saW5lam9pbjpyb3VuZDstaW5rc2NhcGUtc3Ryb2tlOm5vbmUiIGlkPSJwYXRoMTkxMjEiLz4mI3hhOyAgPC9nPiYjeGE7PC9zdmc+;', 
		    		s * 38, s * 42, 'Distributed\nCloud', null, null, null, this.getTagsForStencil(gn, '', dt + 'distributed cloud').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTEwIDBhMTAgMTAgMCAxIDAgMTAgMTBoMEExMCAxMCAwIDAgMCAxMCAwem0wIDE4YTggOCAwIDAgMS00LjE4LTEuMThsMy41OC0yLjA3aDB2LTQuNUw1LjUxIDh2NC41MmwyLjc1IDEuNTktMy40NiAyQTggOCAwIDAgMSA2LjA4IDN2NGgwTDEwIDkuMjggMTMuOSA3IDEwIDQuNzcgNy4yNCA2LjM2VjIuNDdhOCA4IDAgMCAxIDEwLjMxIDQuNyA4LjEgOC4xIDAgMCAxIC41MSAyLjgzdi4wN0wxNC40NiA4aDBsLTMuOSAyLjI2djQuNTFsMy45LTIuMjVWOS4zNGwzLjQ1IDJBOCA4IDAgMCAxIDEwIDE4eiIvPiYjeGE7PC9zdmc+;', 
		    		s * 42, s * 42, 'Container-\nOptimized OS', null, null, null, this.getTagsForStencil(gn, '', dt + 'container optimized os operating system').join(' ')),

		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjQwMi4zNDMyMDA2ODM1OTM3NSIgaGVpZ2h0PSI0MTYuMDAyNTMyOTU4OTg0NCIgdmlld0JveD0iMCAwLjAwMDQ5OTk2Mzc2MDM3NTk3NjYgNDAyLjM0MzIwMDY4MzU5Mzc1IDQxNi4wMDI1MzI5NTg5ODQ0Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qxe2ZpbGw6IzY2OWRmNjt9JiN4YTsJLnN0MntmaWxsOiNhZWNiZmE7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTM2Ni4xNyA5Mi4wMDNjLTE5LjA1IDAtMzYgMTYuODItMzYgMzUuNzYgMCAxMi42MiA4LjQ2IDI1LjI0IDE5LjA1IDMxLjU1djE0Ny4zbC0xMTAuMDUgNjUuMjEgMTYuOTMgMjcuMzUgMTE4LjUxLTY5LjQyYzQuMjQtMi4xIDguNDctOC40MSA4LjQ3LTE0Ljczdi0xNTUuNjdjMTIuNzEtNi4zNSAxOS4wOS0xOC45MyAxOS4wOS0zMS41NSAyLjA4LTE4Ljk0LTE0Ljg1LTM1LjgtMzYtMzUuOHptLTM4LjExLTIzLjFMMjA5LjU1IDEuNTgzYy00LjI0LTIuMTEtMTAuNTktMi4xMS0xNi45MyAwTDU3LjE3IDc5LjQxM0EzNiAzNiAwIDAgMCAzNiA3My4xMDNjLTE5IDAtMzYgMTYuODMtMzYgMzUuNzZzMTYuOTMgMzUuNzcgMzYgMzUuNzcgMzYtMTYuODMgMzYtMzUuNzdsMTI5LjEtNzMuNjIgMTEwIDYzLjExem0tMTQzLjg5IDI3Ny42OHEtOS41MyAwLTE5IDYuMzFsLTExMC02My4xMXYtMTI2LjIyaC0zNHYxMzQuNjNjMCA2LjMyIDQuMjMgMTIuNjMgOC40NiAxNC43M2wxMTguNTQgNjUuMjF2Mi4xMWMwIDE4LjkzIDE2LjkzIDM1Ljc2IDM2IDM1Ljc2czM2LTE2LjgzIDM2LTM1Ljc2LTE3LTMzLjY2LTM2LTMzLjY2eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik05Ny4zOCAxMzYuMjEzbDEwNS44MiA1OC45MSAxMDMuNy01OC45MS0xMDMuNy02MXptLTYuMzUgNjcuMzJsMTEyLjE3IDYzLjExdi01MC40OWwtMTEyLjE3LTY1LjIxem0wIDYzLjExbDExMi4xNyA2NS4yMXYtNDQuMTdsLTExMi4xNy02NS4yMnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMjAzLjE3IDIxNi4xMjN2NTAuNTZsMTEyLjE2LTY1LjI5di01MC4zOXptOTItMjBhOC4xNiA4LjE2IDAgMSAxIDguMTYtOC4xNiA4LjE5IDguMTkgMCAwIDEtOC4xNiA4LjE2em0tOTIgOTEuNTJ2NDQuMTZsMTEyLjE2LTY1LjEydi00NC4xNnptOTItMjIuODhhOC4xNiA4LjE2IDAgMSAxIDguMTYtOC4xNiA4LjE5IDguMTkgMCAwIDEtOC4xNiA4LjE2eiIvPiYjeGE7PC9zdmc+;', 
		    		s * 40, s * 42, 'GKE On-Prem', null, null, null, this.getTagsForStencil(gn, '', dt + 'gke on-prem').join(' '))
	 	];
		
		this.addPalette('gcp2Icons Compute', 'GCP Icons / Compute', false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addGCP2IconsDataAnalyticsPalette = function()
	{
		var sb = this;
		var s = 1;
		var n = 'sketch=0;html=1;verticalAlign=top;labelPosition=center;verticalLabelPosition=bottom;align=center;spacingTop=-6;fontSize=11;fontStyle=1;fontColor=#999999;shape=image;aspect=fixed;imageAspect=0;';
		var dt = 'gcp google cloud platform icons icon compute ';
		var gn = 'mxgraph.gcp2';
		var fns = [];
		
		var fns = [
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwLjAwMTA0NTIyNzA1MDc4IiBoZWlnaHQ9IjIwLjAwMTA0NTIyNzA1MDc4IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHZpZXdCb3g9IjAgMCAyMC4wMDEwNDUyMjcwNTA3OCAyMC4wMDEwNDUyMjcwNTA3OCI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6I2FlY2JmYTt9JiN4YTsJLnN0MXtmaWxsOiM2NjlkZjY7fSYjeGE7CS5zdDJ7ZmlsbDojNDI4NWY0O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00LjczIDguODN2Mi42M2E0LjkxIDQuOTEgMCAwIDAgMS43MSAxLjc0VjguODN6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTcuODkgNi40MXY3LjUzQTcuNjIgNy42MiAwIDAgMCA5IDE0YTggOCAwIDAgMCAxIDBWNi40MXoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTEuNjQgOS44NnYzLjI5YTUgNSAwIDAgMCAxLjctMS44MlY5Ljg2eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xNS43NCAxNC4zMmwtMS40MiAxLjQyYS40Mi40MiAwIDAgMCAwIC42bDMuNTQgMy41NGEuNDIuNDIgMCAwIDAgLjU5IDBsMS40My0xLjQzYS40Mi40MiAwIDAgMCAwLS41OWwtMy41NC0zLjU0YS40Mi40MiAwIDAgMC0uNiAwIi8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTkgMGE5IDkgMCAxIDAgMCAxOEE5IDkgMCAxIDAgOSAwbTAgMTUuNjlhNi42OCA2LjY4IDAgMCAxIC4wMDctMTMuMzYgNi42OCA2LjY4IDAgMCAxIDQuNzI3IDExLjQwM0E2LjY4IDYuNjggMCAwIDEgOSAxNS42OSIvPiYjeGE7PC9zdmc+;', 
		    		s * 42, s * 42, 'BigQuery', null, null, null, this.getTagsForStencil(gn, '', dt + 'bigquery').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE0LjY0MDAwMDM0MzMyMjc1NCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDE0LjY0MDAwMDM0MzMyMjc1NCAyMCI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6I2FlY2JmYTt9JiN4YTsJLnN0MXtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTAgMGgxNC42M3YzLjk0aC01LjN2NS4zM0g1LjM1VjMuOTZIMHoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMy45NSAxMC42N2g1LjM0VjIwSDUuMzV2LTUuMzVIMFY1LjM3aDMuOTV6TTE0LjY0IDIwSDEwLjdWNS4zNmgzLjk0eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0wIDE2LjA2aDMuOTJWMjBIMHoiLz4mI3hhOzwvc3ZnPg==;', 
		    		s * 32, s * 42, 'Cloud\nComposer', null, null, null, this.getTagsForStencil(gn, '', dt + 'cloud composer').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjM3Ny4wNDk2OTgzMjc3ODkyNiIgaGVpZ2h0PSIzNzcuMjkxNTcwNzE1Nzg5NzYiIHZpZXdCb3g9IjAuMTMxMDAwNTE4Nzk4ODI4MTIgLTAuMTIxMDAwMDA2Nzk0OTI5NSA5OS43NjEwMDE1ODY5MTQwNiA5OS44MjQ5OTY5NDgyNDIxOSI+JiN4YTs8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qxe2ZpbGw6IzQyODVmNDt9JiN4YTsJLnN0MntmaWxsOiNhZWNiZmE7fSYjeGE7PC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNODAuNTkzIDE5LjE4djIwLjE5OWgxOS4yOTlWOS41M2MwLTIuNTM3LS45NzktNC44NDYtMi41OC02LjU2OHptLTkuOTA4IDYxLjIyNUgxOS40MzFMMy40NSA5Ny4zMzdjMS42OTUgMS40NzQgMy45MDggMi4zNjcgNi4zMzEgMi4zNjdoNzAuNTU1YzIuODczIDAgNS40NTMtMS4yNTYgNy4yMjEtMy4yNDh6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTg3LjU3MyA5Ni40MzdjMS41MDEtMS43MDEgMi40MTMtMy45MzUgMi40MTMtNi4zODJWNjAuMjA0SDcwLjY4NXYyMC4yMDF6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTE5LjQzMSA4MC40MDVWMjkuMzRoMjAuNTc4VjEwLjA0SDkuNzgxYy01LjMzIDAtOS42NSA0LjMyMS05LjY1IDkuNjV2NzAuMzY1Yy4wMDEgMi45MDYgMS4yODYgNS41MTMgMy4zMiA3LjI4MXptNzcuODgtNzcuNDQzQzk1LjU1IDEuMDY2IDkzLjAzNi0uMTIgOTAuMjQ0LS4xMjFINTkuOTUxVjE5LjE4aDIwLjY0M3oiLz4mI3hhOzwvc3ZnPg==;', 
		    		s * 42, s * 42, 'Cloud Data\nFusion', null, null, null, this.getTagsForStencil(gn, '', dt + 'cloud data fusion').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjM3Ni4yNzQ4ODc3NTcyNjMyIiBoZWlnaHQ9IjMzOS42NzM1NDQyMTc3NjM4MyIgdmlld0JveD0iMC4xMTQwMDAwMDAwNTk2MDQ2NCAtMC4wOTAwMDAwMDM1NzYyNzg2OSA5OS41NTU5OTk3NTU4NTkzOCA4OS44NzE5OTQwMTg1NTQ2OSI+JiN4YTs8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qxe2ZpbGw6I2FlY2JmYTt9JiN4YTs8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik03Ny41MjMgNDMuMzk3bDEyLjg0NCA3LjU3MnYxNC43NjdsLTEyLjg0NCA2LjY4ek01MC4zMTItLjA5bDEyLjg0NCA3LjU3MnYxNC43NjdsLTEyLjg0NCA2LjY4ek0yMy4xIDQzLjM5N2wxMi44NDQgNy41NzJ2MTQuNzY3TDIzLjEgNzIuNDE3em02OS40Ny0uNTExbDcuMS0xMS4xNjktMTIuNjY2LTIxLjU5NEg3MC42NDR2OS41aDEwLjkxOWw2Ljk3NyAxMS44OTUtNC4yNTYgNi42OTR6bS03Ni45NzktNC42TDExLjMgMzEuNDg1bDcuMjY0LTExLjg2MWg5Ljk3OWwuMDk5LTkuNUgxMy4yNDFMLjExNCAzMS41NjFsMS41NzYgMi40OTggNS41MTUgOC43Mzl6bTEzLjY2MiAzOS40NDlsNy42MDMgMTIuMDQ3aDI1LjkwMmw3LjczMy0xMi4xNjQtOC4xNDMtNC44OTktNC44MDggNy41NjRINDIuMDk1bC00Ljc0LTcuNTExeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik03Ny41MjMgNDMuMzk3bC0xMi44NDQgNy41NzJ2MTQuNzY3bDEyLjg0NCA2LjY4ek01MC4zMTItLjA5TDM3LjQ2OCA3LjQ4MnYxNC43NjdsMTIuODQ0IDYuNjh6TTIzLjEgNDMuMzk3bC0xMi44NDQgNy41NzJ2MTQuNzY3bDEyLjg0NCA2LjY4eiIvPiYjeGE7PC9zdmc+;', 
		    		s * 42, s * 42, 'Data\nCatalog', null, null, null, this.getTagsForStencil(gn, '', dt + 'data catalog').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE0LjUxOTk5OTUwNDA4OTM1NSIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDE0LjUxOTk5OTUwNDA4OTM1NSAyMCI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGwtcnVsZTpldmVub2RkfSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJLnN0M3tmaWxsOiM0Mjg1ZjQ7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPGcgY2xhc3M9InN0MCI+JiN4YTsJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik03LjM3IDIuMDNsLTEuNzIuOTYgMS41MiAxLjUtLjAyIDEuNzMgMS4wMi4wMS4wMi0xLjczIDQuMjQgMi41Ni0uMDEgMS4wNyAxLjc3LjAzVjYuMTFMOS4wNSAzLjA0bC0uMjctLjk0eiIvPiYjeGE7CQk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNNy4zNiAyLjAzbC0xLjQyLjM1LS4yOS42MUwuMzkgNS45Mi4zNiA3Ljk3IDIuMTQgOGwuMDItMS4wNyA0LjMxLTIuNDUtLjAyIDEuNzMuODYuMDEuMDYtNC4xOXoiLz4mI3hhOwkJPGcgY2xhc3M9InN0MSI+JiN4YTsJCQk8cGF0aCBkPSJNNy4zNiAyLjAzTDMuOTUgMCAyLjIxLjk1bDMuNDQgMi4wNCAxLjcyLS45NnptLjcxIDExLjc2bC0xLjcyLS4wMi0uMDIgMS43Mi44MiAyLjQ4IDEuNDItLjEyLjI5LS44NSA1LjI3LTIuOTMuMDMtMi4wOS0xLjc5LS4wMi0uMDIgMS4xLTQuMyAyLjQ1eiIvPiYjeGE7CQkJPHBhdGggZD0iTTcuMTUgMTcuOTdsLTMuNDYgMS45NGgtLjA1bC0xLjY2LS45OSAzLjQ5LTEuOTYgMS42OCAxLjAxeiIvPiYjeGE7CQk8L2c+JiN4YTsJCTxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik0xMC44OC4wOWgtLjA1TDcuMzcgMi4wM2wxLjY4IDEuMDEgMy40OS0xLjk2ek0xMC42MiAyMGgtLjA1bC0zLjQyLTIuMDNoMCAwIDBsMS43Mi0uOTYgMy40NCAyLjA0eiIvPiYjeGE7CQk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNLjMzIDEzLjg5di0yaDEuNzZsLS4wMSAxLjA0IDQuMjUgMi41Ni4wMi0xLjcyLjg2LjAxLS4wNiA0LjE4LTEuNjgtMXoiLz4mI3hhOwk8L2c+JiN4YTsJPGNpcmNsZSBjbGFzcz0ic3QyIiBjeD0iMTMuMzgiIGN5PSIxMC4wNCIgcj0iMS4xNCIvPiYjeGE7CTxjaXJjbGUgY2xhc3M9InN0MiIgY3g9IjEuMTQiIGN5PSI5Ljg4IiByPSIxLjE0Ii8+JiN4YTsJPGNpcmNsZSBjbGFzcz0ic3QyIiBjeD0iNy4zMiIgY3k9IjcuOTkiIHI9IjEuMTQiLz4mI3hhOwk8Y2lyY2xlIGNsYXNzPSJzdDIiIGN4PSI3LjIzIiBjeT0iMTIiIHI9IjEuMTQiLz4mI3hhOzwvc3ZnPg==;', 
		    		s * 31, s * 42, 'Dataflow', null, null, null, this.getTagsForStencil(gn, '', dt + 'dataflow').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE4LjI3OTk5ODc3OTI5Njg3NSIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMS4yNDYyOTA4MDM4OTEyNzAxZS04IDAgMTguMjc5OTk4Nzc5Mjk2ODc1IDIwIj4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNjY5ZGY2O2ZpbGwtcnVsZTpldmVub2RkfSYjeGE7CS5zdDF7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qye2ZpbGwtcnVsZTpldmVub2RkfSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTcuNjMgOWEuOTEuOTEgMCAxIDEtLjY0My4yNjdBLjkxLjkxIDAgMCAxIDcuNjMgOXptMC0uOGExLjcxIDEuNzEgMCAxIDAgMS43IDEuNzEgMS43IDEuNyAwIDAgMC0xLjctMS43MXpNMS43MiA5YS45MS45MSAwIDEgMS0uNjQzLjI2N0EuOTEuOTEgMCAwIDEgMS43MiA5em0wLS44YTEuNzEgMS43MSAwIDEgMCAxLjcgMS43MSAxLjcgMS43IDAgMCAwLTEuNy0xLjcxem0zLjA0IDYuMTFhLjkxLjkxIDAgMSAxIDAgMS44Mi45MS45MSAwIDEgMSAwLTEuODJ6bTAtLjc5YTEuNzEgMS43MSAwIDEgMCAxLjIuNSAxLjcgMS43IDAgMCAwLTEuMi0uNXptMC05LjczYS45MS45MSAwIDAgMS0uMDQgMS44MTkuOTEuOTEgMCAwIDEtLjktLjkwOS45Mi45MiAwIDAgMSAuOTQtLjkxem0wLS44YTEuNzEgMS43MSAwIDEgMCAxLjIuNUExLjcgMS43IDAgMCAwIDQuNzYgM3oiLz4mI3hhOwk8ZyBjbGFzcz0ic3QxIj4mI3hhOwkJPHBhdGggZD0iTTcuODEgMGgxLjY4djIwSDcuODF6Ii8+JiN4YTsJCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xMy40IDIuODdIOC44OWEuMzcuMzcgMCAwIDAtLjMuNHYyLjgyYS4zNi4zNiAwIDAgMCAuMy4zOWg0LjUxYS4zNi4zNiAwIDAgMCAuMzEtLjM5VjMuMjhhLjM3LjM3IDAgMCAwLS4zMS0uNDF6bTQuMzIgNS4yOUg5LjRjLS4zMSAwLS41Ni4xOC0uNTYuMzl2Mi44MmMwIC4yMi4yNS40LjU2LjRoOC4zMmMuMzEgMCAuNTYtLjE5LjU2LS40VjguNTVjMC0uMjItLjI1LS4zOS0uNTYtLjM5em0tNS45MSA1LjI4SDguMjhjLS4xMyAwLS4yMy4xOC0uMjMuMzl2Mi44MmMwIC4yMi4xLjM5LjIzLjM5aDMuNTNjLjEzIDAgLjI0LS4xOC4yNC0uMzl2LTIuODJjLS4wMS0uMjItLjExLS4zOS0uMjQtLjM5eiIvPiYjeGE7CTwvZz4mI3hhOzwvc3ZnPg==;', 
		    		s * 38, s * 42, 'Dataprep by Trifacta', null, null, null, this.getTagsForStencil(gn, '', dt + 'dataprep').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE5LjM2MzAxMjMxMzg0Mjc3MyIgaGVpZ2h0PSIxNy45NzU1MjY4MDk2OTIzODMiIHZpZXdCb3g9IjAuMDAwNTYwMDI1NjI2MzI3ODQyNSAwLjYxOTYyOTc0MDcxNTAyNjkgMTkuMzYzMDEyMzEzODQyNzczIDE3Ljk3NTUyNjgwOTY5MjM4MyI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGwtcnVsZTpldmVub2RkO30mI3hhOwkuc3Qxe2ZpbGw6I2FlY2JmYTt9JiN4YTsJLnN0MntmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDN7ZmlsbDojNjY5ZGY2O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxnIGNsYXNzPSJzdDAgc3QxIj4mI3hhOwkJPHBhdGggZD0iTTQuNjkgMTYuNGwxMC4xOS01Ljg5Ljk3IDEuNjktMTAuMTggNS44OHoiLz4mI3hhOwkJPHBhdGggZD0iTTcuNSA0LjR2MTAuMzVsLTEuODcgMS40MVY0LjR6Ii8+JiN4YTsJCTxwYXRoIGQ9Ik0xNy40OSAxMS4ybC0uOTcgMS42OC04Ljk2LTUuMTktLjI2LTIuMzZ6Ii8+JiN4YTsJPC9nPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAgc3QyIiBkPSJNMTIuMzkgOC4yNkw3LjMgNS4zM2wuMjYgMi4zNiAxLjUxLjg2YTQgNCAwIDAgMCAzLjMyLS4yOXoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIHN0MSIgZD0iTTYuMTMgNi4yOWgwYTMuNzggMy43OCAwIDAgMSA1LjE2NS01LjE2M0EzLjc4IDMuNzggMCAwIDEgOS40IDguMThhMy44IDMuOCAwIDAgMS0zLjI3LTEuODl6TTExIDMuNDlhMS44NCAxLjg0IDAgMCAwLTEuNTktLjkyQTEuODMgMS44MyAwIDAgMCA3LjU3IDQuNGExLjg0IDEuODQgMCAwIDAgMi43OTQgMS43MDZBMS44NCAxLjg0IDAgMCAwIDExLjI0IDQuNGExLjggMS44IDAgMCAwLS4yNC0uOTF6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MCBzdDIiIGQ9Ik01LjYzIDEwLjk0djUuMjJsMS44Ny0xLjQxdi0xLjYzYTMuMjkgMy4yOSAwIDAgMC0xLjg3LTIuMTh6bTUuNyAzLjg3bDQuNTItMi42MS0yLjIxLTEtMS4yNS44YTQuMjMgNC4yMyAwIDAgMC0xLjA2IDIuODZ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MCBzdDEiIGQ9Ik0uNTEgMTYuN2gwYTMuNzcgMy43NyAwIDAgMSAxLjM4LTUuMTYgMy43MiAzLjcyIDAgMCAxIDIuODYtLjM4QTMuNzggMy43OCAwIDEgMSAuNTEgMTYuN3ptNC44NS0yLjgxQTEuNzkgMS43OSAwIDAgMCA0LjI1IDEzYTEuODMgMS44MyAwIDAgMC0yLjA2IDIuNjloMGMuMzI5LjU2Ni45MzQuOTE0IDEuNTg5LjkxM2ExLjgzIDEuODMgMCAwIDAgMS41ODUtLjkyYy4zMjYtLjU2OC4zMjQtMS4yNjctLjAwNC0xLjgzM3ptNi45NyAyLjQ3aDBhMy43OSAzLjc5IDAgMCAxIDAtMy43NyAzLjc5IDMuNzkgMCAwIDEgNS4xNi0xLjM5IDMuNzggMy43OCAwIDAgMS0xLjg5IDcuMDQ0IDMuNzggMy43OCAwIDAgMS0zLjI3LTEuODg0em00Ljg2LTIuODFhMiAyIDAgMCAwLS42Ny0uNjcgMS44NSAxLjg1IDAgMCAwLTIuNTEuNjggMS44NiAxLjg2IDAgMCAwIDAgMS44MyAxLjgzIDEuODMgMCAwIDAgMi4wNy44NSAxLjgyIDEuODIgMCAwIDAgMS4xMS0uODUgMS44OCAxLjg4IDAgMCAwIDAtMS44NHoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIHN0MyIgZD0iTTcuNDkgMTQuMTVsLTIuOCAyLjI1IDIuODYtMS42NWE0LjA3IDQuMDcgMCAwIDAtLjA2LS42ek04LjE1IDhsLS41OS0zLjZ2My4yOWEzLjQ3IDMuNDcgMCAwIDAgLjU5LjI3em01LjE1IDMuNDdsMy4yMiAxLjQxLTIuODYtMS42NGExLjY5IDEuNjkgMCAwIDAtLjM2LjIzeiIvPiYjeGE7PC9zdmc+;', 
		    		s * 42, s * 40, 'Dataproc', null, null, null, this.getTagsForStencil(gn, '', dt + 'dataproc').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE4LjYwMDAwMDM4MTQ2OTcyNyIgdmlld0JveD0iMCAwIDIwIDE4LjYwMDAwMDM4MTQ2OTcyNyI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6I2FlY2JmYTt9JiN4YTsJLnN0MXtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDJ7ZmlsbC1ydWxlOmV2ZW5vZGR9JiN4YTsJLnN0M3tmaWxsOiM2NjlkZjY7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPGNpcmNsZSBjeD0iMTAiIGN5PSI5LjMiIHI9IjEuNiIgY2xhc3M9InN0MCIvPiYjeGE7CTxwYXRoIGQ9Ik0xMi42OSA1LjhsLS43NC0uN0g1LjU4djEuNGg2LjM3eiIgY2xhc3M9InN0MSBzdDIiLz4mI3hhOwk8Y2lyY2xlIGN4PSI0LjgiIGN5PSI1LjgiIHI9IjEuMjMiIGNsYXNzPSJzdDMiLz4mI3hhOwk8Y2lyY2xlIGN4PSIxNS4yIiBjeT0iNS44IiByPSIxLjYiIGNsYXNzPSJzdDAiLz4mI3hhOwk8cGF0aCBkPSJNMTQuMzggMTMuNXYtMS40SDguMWwtLjc0LjcuNzQuN3oiIGNsYXNzPSJzdDEgc3QyIi8+JiN4YTsJPGNpcmNsZSBjeD0iNC44IiBjeT0iMTIuOCIgcj0iMS42IiBjbGFzcz0ic3QwIi8+JiN4YTsJPGNpcmNsZSBjeD0iMTUuMiIgY3k9IjEyLjgiIHI9IjEuMjMiIGNsYXNzPSJzdDMiLz4mI3hhOwk8cGF0aCBkPSJNMTUuNiAxLjZsLS43NC0uN0gyLjE4djEuNGgxMi42OHoiIGNsYXNzPSJzdDEgc3QyIi8+JiN4YTsJPGNpcmNsZSBjeD0iMS42IiBjeT0iMS42IiByPSIxLjIzIiBjbGFzcz0ic3QzIi8+JiN4YTsJPGNpcmNsZSBjeD0iMTguNCIgY3k9IjEuNiIgcj0iMS42IiBjbGFzcz0ic3QwIi8+JiN4YTsJPHBhdGggZD0iTTE3Ljg0IDE3Ljd2LTEuNEg1LjE0bC0uNzQuNy43NC43eiIgY2xhc3M9InN0MSBzdDIiLz4mI3hhOwk8Y2lyY2xlIGN4PSIxLjYiIGN5PSIxNyIgcj0iMS42IiBjbGFzcz0ic3QwIi8+JiN4YTsJPGNpcmNsZSBjeD0iMTguNCIgY3k9IjE3IiByPSIxLjIzIiBjbGFzcz0ic3QzIi8+JiN4YTs8L3N2Zz4=;', 
		    		s * 42, s * 40, 'Life Sciences', null, null, null, this.getTagsForStencil(gn, '', dt + 'genomics').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE4LjMxOTk5OTY5NDgyNDIyIiBoZWlnaHQ9IjIwLjAwMDAwMTkwNzM0ODYzMyIgdmlld0JveD0iMCAwIDE4LjMxOTk5OTY5NDgyNDIyIDIwLjAwMDAwMTkwNzM0ODYzMyI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzY2OWRmNjt9JiN4YTsJLnN0MXtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDJ7ZmlsbDojYWVjYmZhO30mI3hhOwk8L3N0eWxlPiYjeGE7CTxkZWZzPiYjeGE7CQk8ZmlsdGVyIGlkPSJBIiB4PSI0LjY0IiB5PSI0LjE5IiB3aWR0aD0iMTQuNzMiIGhlaWdodD0iMTIuNzYiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj4mI3hhOwkJCTxmZUZsb29kIGZsb29kLWNvbG9yPSIjZmZmIi8+JiN4YTsJCQk8ZmVCbGVuZCBpbj0iU291cmNlR3JhcGhpYyIvPiYjeGE7CQk8L2ZpbHRlcj4mI3hhOwkJPG1hc2sgaWQ9IkIiIHg9IjQuNjQiIHk9IjQuMTkiIHdpZHRoPSIxNC43MyIgaGVpZ2h0PSIxMi43NiIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSI+JiN4YTsJCQk8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyLjIzIiByPSIzLjU4IiBmaWx0ZXI9InVybCgjQSkiLz4mI3hhOwkJPC9tYXNrPiYjeGE7CTwvZGVmcz4mI3hhOwk8ZyBjbGFzcz0ic3QwIj4mI3hhOwkJPGNpcmNsZSBjeD0iMTYuMTMiIGN5PSI2LjIxIiByPSIxLjcyIi8+JiN4YTsJCTxjaXJjbGUgY3g9IjIuMTkiIGN5PSI2LjIxIiByPSIxLjcyIi8+JiN4YTsJCTxjaXJjbGUgY3g9IjkuMTYiIGN5PSIxOC4yOCIgcj0iMS43MiIvPiYjeGE7CTwvZz4mI3hhOwk8ZyBtYXNrPSJ1cmwoI0IpIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMi44NCAtMikiPiYjeGE7CQk8cGF0aCB0cmFuc2Zvcm09Im1hdHJpeCguNSAtLjg3IC44NyAuNSAtNC41OSAyMC41MykiIGQ9Ik0xNC42OSAxMC4yMmgxLjU5djguMDRoLTEuNTl6IiBjbGFzcz0ic3QxIi8+JiN4YTsJCTxwYXRoIHRyYW5zZm9ybT0icm90YXRlKDMzMCA4LjUyMyAxNC4yNDQpIiBkPSJNNC40OSAxMy40NWg4LjA0djEuNTlINC40OXoiIGNsYXNzPSJzdDEiLz4mI3hhOwkJPHBhdGggZD0iTTExLjIgNC4xOWgxLjU5djguMDRIMTEuMnoiIGNsYXNzPSJzdDEiLz4mI3hhOwk8L2c+JiN4YTsJPGcgY2xhc3M9InN0MiI+JiN4YTsJCTxjaXJjbGUgY3g9IjkuMTYiIGN5PSIxMC4yMyIgcj0iMi43OCIvPiYjeGE7CQk8Y2lyY2xlIGN4PSIyLjE5IiBjeT0iMTQuMjUiIHI9IjIuMTkiLz4mI3hhOwkJPGNpcmNsZSBjeD0iMTYuMTMiIGN5PSIxNC4yNSIgcj0iMi4xOSIvPiYjeGE7CQk8Y2lyY2xlIGN4PSI5LjE2IiBjeT0iMi4xOSIgcj0iMi4xOSIvPiYjeGE7CTwvZz4mI3hhOzwvc3ZnPg==;', 
		    		s * 38, s * 42, 'Pub/Sub', null, null, null, this.getTagsForStencil(gn, '', dt + 'pub sub').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJzdmczMjM0NyIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMjY1LjgzODA0IDI0NS4zMDU1NCIgaGVpZ2h0PSIyNDUuMzA1NTRtbSIgd2lkdGg9IjI2NS44MzgwNG1tIj4mI3hhOyAgJiN4YTsgIDxkZWZzIGlkPSJkZWZzMzIzNDQiLz4mI3hhOyAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjYuMDAxOTQ1LC0yNC45MTAzOTEpIiBpZD0ibGF5ZXIxIj4mI3hhOyAgICA8cGF0aCBkPSJtIDQyLjE3OTY4NywzMy45Nzg1MTYgYyAtMC42NDE1MDMsMC4wMTg2IC0xLjI4NjQ4NywwLjAzODggLTEuOTM1MzIzLDAuMDU5OTIgMi4wMTg1ODUsOC44ODg3MiAyLjQ1ODk0MSwxNi40NTc5NjYgLTAuMDk3MzMsMjYuMDYyNzY0IDEyLjI5MTAzNywtMC4zNDA5NzUgMTkuMjU0OTQyLC0wLjQ0NTY3MyAyNi44NzQ0NDksMi45Mzc4NjYgbCAwLjAxOTUzLDAuMDA3OCAwLjAxOTUzLDAuMDA5OCBjIDYuMzEwNzgzLDIuNzc3OTA4IDE0LjMyNzI4NSwxMi42MDI0NyAyMS44NjcxODcsMjYuMTcxODc1IDcuNTM5OTAzLDEzLjU2OTM5OSAxNC43MTAwOCwyOS44NzM2NzkgMjQuMDc4MTMsNDMuNjQwNjE5IGwgMC4yOTEwMiwwLjQyNzczIDAuMzIyMjYsMC40MDIzNSBjIDkuODM1NCwxMi4yMzgxNSAyMy40ODA0MiwyMi43MDczNiA0OS4wODIzOCwyNi45Njg4MSAtMi4wODM5NiwtOS41MDI2NSAtMi4yMTQ2NywtMTYuMjA1NzYgLTAuMDQwOSwtMjYuMjk3OTIgLTE3LjE1OTg5LC0zLjAxOTUgLTIwLjk5MjI3LC03LjMxNTc2IC0yOC40MDg2NCwtMTYuNTMyMjQgQyAxMjcuMDIwNSwxMDcuMDkyODMgMTE5Ljg5NjEzLDkxLjQyODc1MiAxMTEuNjU2MjUsNzYuNTk5NjA5IDEwMy4zMjUyNyw2MS42MDY1MTYgOTMuOTU5MzUxLDQ2LjQ5OTg0MSA3Ny41NTI3MzQsMzkuMjY5NTMxIDY1LjMzNTEzMSwzMy44NDk2MzIgNTQuMzg3OTc1LDMzLjYyNDUwMyA0Mi4xNzk2ODcsMzMuOTc4NTE2IFogTSAyMzkuODM2MSwxNDcuMjkzNSBhIDI3LjU3ODE5NywyNy41NzgxOTcgMCAwIDEgLTI3LjU3ODIsMjcuNTc4MiAyNy41NzgxOTcsMjcuNTc4MTk3IDAgMCAxIC0yNy41NzgxOSwtMjcuNTc4MiAyNy41NzgxOTcsMjcuNTc4MTk3IDAgMCAxIDI3LjU3ODE5LC0yNy41NzgxOSAyNy41NzgxOTcsMjcuNTc4MTk3IDAgMCAxIDI3LjU3ODIsMjcuNTc4MTkgeiBNIDE4LjA0NjY0MSwyNDguMzU3ODggQSAyMS44NTgwNjEsMjEuODU4MDYxIDAgMCAxIC0zLjgxMTQxOTUsMjcwLjIxNTk0IDIxLjg1ODA2MSwyMS44NTgwNjEgMCAwIDEgLTI1LjY2OTQ4LDI0OC4zNTc4OCAyMS44NTgwNjEsMjEuODU4MDYxIDAgMCAxIC0zLjgxMTQxOTUsMjI2LjQ5OTgyIDIxLjg1ODA2MSwyMS44NTgwNjEgMCAwIDEgMTguMDQ2NjQxLDI0OC4zNTc4OCBaIE0gMTcuNzc4MjYzLDQ2Ljc2ODQ1MiBBIDIxLjg1ODA2MSwyMS44NTgwNjEgMCAwIDEgLTQuMDc5Nzk3Nyw2OC42MjY1MTMgMjEuODU4MDYxLDIxLjg1ODA2MSAwIDAgMSAtMjUuOTM3ODU5LDQ2Ljc2ODQ1MiAyMS44NTgwNjEsMjEuODU4MDYxIDAgMCAxIC00LjA3OTc5NzcsMjQuOTEwMzkxIDIxLjg1ODA2MSwyMS44NTgwNjEgMCAwIDEgMTcuNzc4MjYzLDQ2Ljc2ODQ1MiBaIE0gMTcuNzE0MTc2LDE0Ny42NTM3OSBBIDIxLjg1ODA2MSwyMS44NTgwNjEgMCAwIDEgLTQuMTQzODg0NywxNjkuNTExODUgMjEuODU4MDYxLDIxLjg1ODA2MSAwIDAgMSAtMjYuMDAxOTQ1LDE0Ny42NTM3OSAyMS44NTgwNjEsMjEuODU4MDYxIDAgMCAxIC00LjE0Mzg4NDcsMTI1Ljc5NTczIDIxLjg1ODA2MSwyMS44NTgwNjEgMCAwIDEgMTcuNzE0MTc2LDE0Ny42NTM3OSBaIiBzdHlsZT0iY29sb3I6IzAwMDAwMDtvcGFjaXR5OjE7ZmlsbDojMzM1YmJiO2ZpbGwtb3BhY2l0eToxOy1pbmtzY2FwZS1zdHJva2U6bm9uZSIgaWQ9InBhdGgzMjg5NyIvPiYjeGE7ICAgIDxwYXRoIGQ9Im0gMTEyLjk3NzA4LDE2NS4zNDI3IGMgLTUuMDc0Niw3LjY0NjM0IC05LjMyODY3LDE0LjY3MzE5IC0xMi41MTQxOSwyMC45MTkwMiBsIC0wLjEyNSwwLjI0NjA5IC0wLjExNTIzLDAuMjUxOTYgYyAtOS4yMTU2NzYsMjAuMTM4MDEgLTE5LjUyMjQ5MSwzNi41ODk1NiAtMjkuODI4MTI5LDQzLjMwMDc4IC0xMy4xNjMxNTYsNi44NjM1MyAtMTkuODk5MzY4LDUuNTEzMDEgLTMwLjM2NDgxNSw0Ljk2MTA2IDMuMTk2MDQ0LDExLjgwNjMzIDIuNDQ0NTA2LDE5LjExMDMxIDAuMTQyNDQ4LDI2LjA1MzIxIDkuNTc3ODUsMC41MzIzNiAyNC45Mjg4MzksMS4yNzQ0MiA0Mi45NTA4ODMsLTguMzA3MjQgbCAwLjQyNzczNCwtMC4yMjY1NiAwLjQxMDE1NiwtMC4yNTk3NyBDIDEwMi44MjIzLDI0MC4zNjc4IDExMy43ODE1MiwyMTkuNTM4OTEgMTIzLjYyNSwxOTguMDc2MTcgYyAyLjYwNjk3LC01LjExMTQ2IDYuNjc0NTEsLTExLjg1MTUgMTEuNzEsLTE5LjM5NDg0IC05LjA3NDY4LC0zLjA3Nzk1IC0xNi45NDA4MSwtOC42MDk4NiAtMjIuMzU3OTIsLTEzLjMzODYzIHogbSAtNzIuODE4NSwtNC42MTUzOSA0Ni41MTQ0NzMsMC4wMTgxIDguOTkxMTU4LC0xMy4yODE0MiAtOC40MTMyODIsLTEyLjcxODM2IC00Ny4wOTI0MDYsLTAuMDE4MyBjIDIuODEzNDc4LDcuMzYzOTggMi4yMjQ4MjIsMTkuNjM5MTEgNS43ZS01LDI2IHoiIHN0eWxlPSJjb2xvcjojMDAwMDAwO29wYWNpdHk6MTtmaWxsOiM3NjllZjU7ZmlsbC1vcGFjaXR5OjE7LWlua3NjYXBlLXN0cm9rZTpub25lIiBpZD0icGF0aDMyOTAxIi8+JiN4YTsgIDwvZz4mI3hhOzwvc3ZnPg==;', 
		    		s * 42, s * 39, 'Datastream', null, null, null, this.getTagsForStencil(gn, '', dt + 'datastream').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJzdmc0OTI3MSIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMjMwLjY5NTA0IDI4Ny43MTg3NSIgaGVpZ2h0PSIyODcuNzE4NzVtbSIgd2lkdGg9IjIzMC42OTUwNG1tIj4mI3hhOyAgJiN4YTsgIDxkZWZzIGlkPSJkZWZzNDkyNjgiLz4mI3hhOyAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoOS4xMDA2ODA4LC00LjY1ODY4MikiIGlkPSJsYXllcjEiPiYjeGE7ICAgIDxwYXRoIGQ9Im0gOTQuMjE3NjgzLDIzNy4wMzY1NSBoIDI0LjIxOTU5NyB2IDEwLjE4NzcyIEggOTQuMjE3NjgzIFogbSAyNC4yMTk1OTcsLTExNC43OTEzIHYgMTAuMDc1NzYgSCA5NC4yMTc2ODMgdiAtMTAuMDc1NzYgeiBtIDAsLTIzLjkzODA2IEggOTQuMjE3NjgzIFYgNzguMjkzMjQzIGggMjQuMjE5NTk3IHoiIHN0eWxlPSJvcGFjaXR5OjE7ZmlsbDojNTk4NmYyO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTpub25lO3N0cm9rZS13aWR0aDowLjI2NDU4M3B4O3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1vcGFjaXR5OjEiIGlkPSJwYXRoNDk0MTciLz4mI3hhOyAgICA8cGF0aCBkPSJtIDExOC40MzcyOCwyNDcuMjI0MjcgdiAzMy43OTAwMiBsIC0xMi4xMTgyMiwxMS4zNjMxNSAtMTIuMTAxMzc3LC0xMS4zNjMxNSB2IC0zMy43OTAwMiB6IG0gMCwtMTE0LjkwMzI2IFYgMjEzLjM2MzIgSCA5NC4yMTc2ODMgdiAtODEuMDQyMTkgeiBtIDAsLTM0LjAxMzgyIEggOTQuMjE3NjgzIHYgLTkuNTUwNTg0IGMgOS43ODY1NjcsMi41ODMxOTkgMTQuOTk0MjQ3LDIuMzczODcxIDI0LjIxOTU5NywwIHogTSA2Ny44MDkzNDgsNDMuMjM1OTMzIGMgMCwtMjAuNjA4NzI2IDE3LjcxNDU1MSwtMzguNTc3MjUxIDM4LjYxODA2MiwtMzguNTc3MjUxIDIyLjkzMzU2LDAgMzguMzAyMjMsMjAuNDQyNDE0IDM4LjMwMjIzLDM4LjU3NzI1MSB6IiBzdHlsZT0ib3BhY2l0eToxO2ZpbGw6I2I1Y2JmOTtmaWxsLW9wYWNpdHk6MTtzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MC4yNjQ1ODNweDtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2Utb3BhY2l0eToxIiBpZD0icGF0aDQ5NDE5Ii8+JiN4YTsgICAgPHBhdGggZD0ibSAxMTguNDM3MjgsMTc5LjYxNDM5IGggMTYuNjI4MzggYyAxMC4zNjkwNCwwIDE2LjkwMTI3LDguNzEzOTYgMTYuOTAxMjcsMTYuODQ0NzUgMCw5LjE1MjU4IC03LjM5MTA3LDE2LjkwNDA2IC0xNi43NTY4MSwxNi45MDQwNiBIIDc3LjM0MzM5NSB2IC0xNi43MTU3OSBsIC00Ny44NzQ1MjQsMjguNTQwMjcgNDcuODc0NTI0LDI4LjkyNTM4IHYgLTE3LjA3NjUxIGggNTYuMTYyMjk1IGMgMjQuMDEyOSwwIDQwLjMxMzI3LC0xOS43NzQxIDQwLjMxMzI3LC00MC4xOTc4NiAwLC0yMS44MTIxNCAtMTcuMDk3MDQsLTQwLjkyMDkzIC0zOC4yNDc3LC00MC45MjA5MyBoIC0xNy4xMzM5OCB6IG0gLTQxLjA5Mzg4NSwwIEggMjkuNjEzMzI2IGMgLTIxLjY0OTA3NSwwIC0zOC43MTQwMDY4LC0yMC4yMTY3OSAtMzguNzE0MDA2OCwtNDAuOTM3MzUgMCwtMjIuMDcyNzEgMTcuNjU3NDczMSwtNDAuMzY5ODUgNDEuNDU4NjU2OCwtNDAuMzY5ODUgSCAxNzMuNDkwNzUgViA4MS4zMjgzMDYgbCA0OC4xMDM2MSwyOC43NDY1OTQgLTQ4LjEwMzYxLDI5LjE3OTk2IFYgMTIyLjI0NTI1IEggMzMuMDgwMjUxIGMgLTkuNzk4NzI2LDAgLTE2LjYxMjM1Miw3LjgxMzIyIC0xNi42MTIzNTIsMTYuMTQyODkgMCw5LjEwMzg0IDYuOTg1Nzc2LDE3LjUyOTYyIDE2LjMyNzY5NiwxNy41Mjk2MiBoIDQ0LjU0NzggeiBNIDE0NC43Mjk2NCw0My4yMzU5MzMgYyAwLDI2Ljg0Mjg2MSAtMjQuMTU4NDQsMzguNzM4MTY5IC0zOC44NjIzNSwzOC43MzgxNjkgLTE5LjAwODczMSwwIC0zOC4wNTc5NDIsLTE2LjY3MTk2NCAtMzguMDU3OTQyLC0zOC43MzgxNjkgeiIgc3R5bGU9Im9wYWNpdHk6MTtmaWxsOiM3NjllZjU7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjAuMjY0NTgzcHg7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW9wYWNpdHk6MSIgaWQ9InBhdGg0OTQyMyIvPiYjeGE7ICA8L2c+JiN4YTs8L3N2Zz4=;', 
		    		s * 34, s * 42, 'Healthcare API', null, null, null, this.getTagsForStencil(gn, '', dt + 'healthcare api application programming interface').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJzdmc4OTgwMSIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMjA4LjA1NjU1IDMzNC42MTMxNiIgaGVpZ2h0PSIzMzQuNjEzMTZtbSIgd2lkdGg9IjIwOC4wNTY1NW1tIj4mI3hhOyAgJiN4YTsgIDxkZWZzIGlkPSJkZWZzODk3OTgiLz4mI3hhOyAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTQuMjQ2MjUyNCwxNS42NzE5MTEpIiBpZD0ibGF5ZXIxIj4mI3hhOyAgICA8cGF0aCBpZD0icGF0aDkxODAyIiB0cmFuc2Zvcm09InNjYWxlKDAuMjY0NTgzMzMpIiBkPSJtIDQwOS4yMjI2Niw0MTkuMDk5NjEgYyAtMzYuNjA4MTEsMCAtNzIuMDc2NjcsNS4wNzUzIC0xMDUuNzUzOTEsMTQuNTMxMjUgbCA0OS4wMzUxNiwxMjAuMDQxMDIgYyAxOC4yNjE3MiwtMy45Mzg5OSAzNy4yMjE5NiwtNi4wNjgzNiA1Ni43MTg3NSwtNi4wNjgzNiAxNDYuOTM1MTQsMCAyNjQuNjc3NzMsMTE3LjczNDc3IDI2NC42Nzc3MywyNjQuNjY5OTIgMCwxNDYuOTM1MTQgLTExNy43NDI1OSwyNjQuNjY5OTYgLTI2NC42Nzc3MywyNjQuNjY5OTYgLTE0Ni45MzUxNiwwIC0yNjQuNjY5OTEsLTExNy43MzQ4MiAtMjY0LjY2OTkzLC0yNjQuNjY5OTYgMCwtOTkuMTg3NjMgNTMuNjg5ODMsLTE4NS4wMDU5NiAxMzMuNzU1ODYsLTIzMC4zNDc2NiBMIDIyOS42MjY5NSw0NjIuNzUgQyAxMDMuMDI0Nyw1MjguMjI0NzQgMTYuMDQ4ODI3LDY2MC41MDUyMyAxNi4wNDg4MjgsODEyLjI3MzQ0IGMgMi4zZS01LDIxNi4zODM3NiAxNzYuNzkwMDYyLDM5My4xNzM4NiAzOTMuMTczODMyLDM5My4xNzM4NiAyMTYuMzgzNzMsMCAzOTMuMTgxNjQsLTE3Ni43OTAxIDM5My4xODE2NCwtMzkzLjE3Mzg2IDNlLTUsLTIxNi4zODM3OCAtMTc2Ljc5Nzg3LC0zOTMuMTczODMgLTM5My4xODE2NCwtMzkzLjE3MzgzIHoiIHN0eWxlPSJjb2xvcjojMDAwMDAwO29wYWNpdHk6MTtmaWxsOiM1OTg2ZjI7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlLXdpZHRoOjMuNzc5NTM7c3Ryb2tlLWxpbmVqb2luOnJvdW5kOy1pbmtzY2FwZS1zdHJva2U6bm9uZSIvPiYjeGE7ICAgIDxwYXRoIGQ9Im0gMTg5Ljk0MzM2LDg2LjI1IGMgLTk1LjEzMDMzMSwwIC0xNzMuMTc5Njg4LDc4LjA1NTIyIC0xNzMuMTc5Njg4LDE3My4xODU1NSAtNmUtNiw5NS4xMzAzMyA3OC4wNDkzNTMsMTczLjE3OTY4IDE3My4xNzk2ODgsMTczLjE3OTY4IDkuMDE2MTgsMCAxNy44NzU4LC0wLjcwODMyIDI2LjUzMzIsLTIuMDU4NTkgbCAtMzQuODI4MTIsLTg1LjI2NTYyIGMgLTQ0LjE1NzMsLTQuMDg2NjkgLTc3Ljk1NTA4LC00MC41MDcwNSAtNzcuOTU1MDgsLTg1Ljg1NTQ3IDAsLTQ4LjE1MDM5IDM4LjA5OTYyLC04Ni4yNTU4NiA4Ni4yNSwtODYuMjU1ODYgMTMuMTU5NzcsMCAyNS41NTg4OCwyLjg2MjQ2IDM2LjY0NDUzLDcuOTgyNDIgbCA2NC41NTQ2OSwtNjEuOTE5OTIgQyAyNjIuNjA4MzcsOTguNTMzOTEgMjI3LjYyOTI5LDg2LjI1IDE4OS45NDMzNiw4Ni4yNSBaIG0gMTM4Ljg4ODY3LDcwLjE2MjExIC02My40Mjc3Myw2MC44MzU5NCBjIDYuODc2MzgsMTIuNDI2NzggMTAuNzg5MDYsMjYuNzg4MTUgMTAuNzg5MDYsNDIuMTg3NSAwLDIxLjc2NzEyIC03LjgwNDE1LDQxLjQ2NTQgLTIwLjc4NTE2LDU2LjUzMzIgbCAzNC41MjM0NCw4NC41MTk1MyBjIDQ0LjE3Mzg3LC0zMS40ODc1MSA3My4xOTE0MSwtODMuMDc4OTIgNzMuMTkxNDEsLTE0MS4wNTI3MyAwLC0zOC40ODM1NSAtMTIuNzgyLC03NC4xNjUzMiAtMzQuMjkxMDIsLTEwMy4wMjM0NCB6IiB0cmFuc2Zvcm09InNjYWxlKDAuMjY0NTgzMzMpIiBzdHlsZT0iY29sb3I6IzAwMDAwMDtvcGFjaXR5OjE7ZmlsbDojNmY5OGY0O2ZpbGwtb3BhY2l0eToxO3N0cm9rZS13aWR0aDozLjc3OTUzO3N0cm9rZS1saW5lam9pbjpyb3VuZDstaW5rc2NhcGUtc3Ryb2tlOm5vbmUiIGlkPSJwYXRoOTE3OTgiLz4mI3hhOyAgICA8cGF0aCBpZD0icGF0aDg5OTI4IiB0cmFuc2Zvcm09InNjYWxlKDAuMjY0NTgzMzMpIiBkPSJtIDQwNi4xMzY3MiwtNTkuMjMyNDIyIGMgLTU4LjgxNTQ3LDhlLTYgLTEwNy4xMDM1Miw0OC4yODgwNDUgLTEwNy4xMDM1MiwxMDcuMTAzNTE2IDAsMTguNDk0NDUxIDQuNzgxMDEsMzUuOTQ1MDE3IDEzLjE1NjI1LDUxLjE4MzU5NCBsIDQ0LjMxMjUsLTQyLjUwMzkwNyBjIC0wLjQ3NTY3LC0yLjgyMDc3NSAtMC43NzUzOSwtNS43MDc1NjQgLTAuNzc1MzksLTguNjc5Njg3IDAsLTI4LjE3NjM4IDIyLjIzMzc4LC01MC40MTAxNTI1IDUwLjQxMDE2LC01MC40MTAxNTY1IDI4LjE3NjM4LC00ZS02IDUwLjQxMDE1LDIyLjIzMzc3MDUgNTAuNDEwMTYsNTAuNDEwMTU2NSAwLDI4LjE3NjM4MSAtMjIuMjMzNzgsNTAuNDEyMTEzIC01MC40MTAxNiw1MC40MTIxMDkgLTUuMDY4NjksLTEwZS03IC05LjkzNDE3LC0wLjc0NTYzMSAtMTQuNTIzNDQsLTIuMDg5ODQ0IGwgLTQzLjM2MTMzLDQxLjU5MTgwMSBjIDE2LjczMjIzLDEwLjg0Nzk1IDM2LjYxMTIzLDE3LjE4OTQ1IDU3Ljg4NDc3LDE3LjE4OTQ1IDU4LjgxNTQ5LDEwZS02IDEwNy4xMDM1MSwtNDguMjg4MDQgMTA3LjEwMzUxLC0xMDcuMTAzNTE2IDAsLTU4LjgxNTQ4MyAtNDguMjg4MDIsLTEwNy4xMDM1MjMgLTEwNy4xMDM1MSwtMTA3LjEwMzUxNiB6IiBzdHlsZT0iY29sb3I6IzAwMDAwMDtvcGFjaXR5OjE7ZmlsbDojZDZlM2ZiO2ZpbGwtb3BhY2l0eToxO3N0cm9rZS13aWR0aDozLjc3OTUzO3N0cm9rZS1saW5lam9pbjpyb3VuZDstaW5rc2NhcGUtc3Ryb2tlOm5vbmUiLz4mI3hhOyAgPC9nPiYjeGE7PC9zdmc+;', 
		    		s * 26, s * 42, 'Looker', null, null, null, this.getTagsForStencil(gn, '', dt + 'looker').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJzdmcxMDczNDEiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDI3NS45ODY2OSAyNTIuNDI5NTMiIGhlaWdodD0iMjUyLjQyOTUzbW0iIHdpZHRoPSIyNzUuOTg2NjltbSI+JiN4YTsgICYjeGE7ICA8ZGVmcyBpZD0iZGVmczEwNzMzOCIvPiYjeGE7ICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzMi40NTE1MzMsLTIwLjk0NjAxKSIgaWQ9ImxheWVyMSI+JiN4YTsgICAgPHBhdGggZD0ibSAxMDEuNjgwMDksMjczLjM3NTU0IGMgLTE2LjQ1MjEyLDAgLTMwLjkxMzQyMiwtMTQuMTc3MzIgLTMwLjkxMzQyMiwtMzQuMjM1OSAwLC0xOS4xNzQ5OSAxNS4xNTE1MjIsLTMzLjY1ODA3IDMzLjUxMzYxMiwtMzMuNjU4MDcgaCAxMDQuODc0NTEgdiA2Ny44OTM5NyB6IE0gLTEuNTM4MTA0NiwxODEuODUzMzYgYyAtMTYuNDUyMTI2NCwwIC0zMC45MTM0Mjg0LC0xNC4xNzczMiAtMzAuOTEzNDI4NCwtMzQuMjM1ODkgMCwtMTkuMTc1IDE1LjE1MTUxOSwtMzMuNjU4MDggMzMuNTEzNjE4NCwtMzMuNjU4MDggSCAxMDUuOTM2NiB2IDY3Ljg5Mzk3IHogTSAxMDEuNjgwMSw4OC44Mzk5OCBjIC0xNi40NTIxMzEsMCAtMzAuOTEzNDMzLC0xNC4xNzczMTcgLTMwLjkxMzQzMywtMzQuMjM1ODk1IDAsLTE5LjE3NDk5NCAxNS4xNTE1MTksLTMzLjY1ODA3NSAzMy41MTM2MjMsLTMzLjY1ODA3NSBIIDIwOS4xNTQ4IHYgNjcuODkzOTcgeiIgc3R5bGU9Im9wYWNpdHk6MTtmaWxsOiM3NjllZjU7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjAuMjY0NTgzcHg7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW9wYWNpdHk6MSIgaWQ9InBhdGgxMDc2MTAtMyIvPiYjeGE7ICAgIDxwYXRoIGQ9Im0gMjQzLjUzNTE1LDIzOS40Mjg1NSBjIDAsMTguOTg3NzUgLTE1LjM5MjYxLDMzLjk0Njk5IC0zNC4zODAzNiwzMy45NDY5OSAtMTguOTg3NzQsMCAtMzQuMzgwMzQsLTE0Ljk1OTI0IC0zNC4zODAzNCwtMzMuOTQ2OTkgMCwtMTguOTg3NzQgMTUuMzkyNiwtMzMuOTQ2OTggMzQuMzgwMzQsLTMzLjk0Njk4IDE4Ljk4Nzc1LC0xZS01IDM0LjM4MDM2LDE0Ljk1OTI0IDM0LjM4MDM2LDMzLjk0Njk4IHogTSAxNDAuMzE2OTYsMTQ3LjkwNjM4IGMgMCwxOC45ODc3NCAtMTUuMzkyNjEsMzMuOTQ2OTkgLTM0LjM4MDM2LDMzLjk0Njk4IC0xOC45ODc3NDUsMCAtMzQuMzgwMzU1LC0xNC45NTkyNCAtMzQuMzgwMzU1LC0zMy45NDY5OCAwLC0xOC45ODc3NSAxNS4zOTI2MSwtMzMuOTQ2OTkgMzQuMzgwMzU1LC0zMy45NDY5OSAxOC45ODc3NSwwIDM0LjM4MDM2LDE0Ljk1OTI0IDM0LjM4MDM2LDMzLjk0Njk5IHogTSAyNDMuNTM1MTUsNTQuODkyOTk0IGMgMCwxOC45ODc3NDcgLTE1LjM5MjYxLDMzLjk0Njk5IC0zNC4zODAzNiwzMy45NDY5ODYgLTE4Ljk4Nzc0LC0xMGUtNyAtMzQuMzgwMzQsLTE0Ljk1OTI0MyAtMzQuMzgwMzQsLTMzLjk0Njk4NiAwLC0xOC45ODc3NDMgMTUuMzkyNiwtMzMuOTQ2OTgzIDM0LjM4MDM0LC0zMy45NDY5ODQgMTguOTg3NzUsLTVlLTYgMzQuMzgwMzYsMTQuOTU5MjM3IDM0LjM4MDM2LDMzLjk0Njk4NCB6IiBzdHlsZT0ib3BhY2l0eToxO2ZpbGw6IzQwNzVlNjtmaWxsLW9wYWNpdHk6MTtzdHJva2Utd2lkdGg6MjE7c3Ryb2tlLWxpbmVqb2luOnJvdW5kIiBpZD0icGF0aDEwNzYzNC00Ii8+JiN4YTsgIDwvZz4mI3hhOzwvc3ZnPg==;', 
		    		s * 42, s * 38, 'Google\nData Studio', null, null, null, this.getTagsForStencil(gn, '', dt + 'google data studio').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJzdmcxMTkyNDEiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDI2NS4yMzA0NyAyODcuNzcxNDgiIGhlaWdodD0iMjg3Ljc3MTQ4bW0iIHdpZHRoPSIyNjUuMjMwNDdtbSI+JiN4YTsgICYjeGE7ICA8ZGVmcyBpZD0iZGVmczExOTIzOCIvPiYjeGE7ICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNS41NDQ5MjIsLTUuNzEyODkwNikiIGlkPSJsYXllcjEiPiYjeGE7ICAgIDxwYXRoIGQ9Im0gMjExLjAwMzkxLDE4OS44NzMwNSBjIC0xNS43NDAzMSwwIC0yOC42ODM2LDEyLjk0MzI5IC0yOC42ODM2LDI4LjY4MzU5IDAsMTUuNzQwMzEgMTIuOTQzMjksMjguNjgxNjQgMjguNjgzNiwyOC42ODE2NCAxNS43NDAzLDAgMjguNjgxNjQsLTEyLjk0MTMzIDI4LjY4MTY0LC0yOC42ODE2NCAwLC0xNS43NDAzIC0xMi45NDEzNCwtMjguNjgzNTkgLTI4LjY4MTY0LC0yOC42ODM1OSB6IE0gMy4wMzMyMDMxLDUxLjQ0OTIxOSBjIC0xNS42ODMyMDUxLDAgLTI4LjU3ODEyNTEsMTIuODk0OTIgLTI4LjU3ODEyNTEsMjguNTc4MTI1IDRlLTYsMTUuNjgzMjAyIDEyLjg5NDkyMywyOC41ODAwNzYgMjguNTc4MTI1MSwyOC41ODAwNzYgMTUuNjgzMjAxOSwwIDI4LjU4MDA3MzksLTEyLjg5Njg3NCAyOC41ODAwNzc5LC0yOC41ODAwNzYgMCwtMTUuNjgzMjA1IC0xMi44OTY4NzMsLTI4LjU3ODEyNSAtMjguNTgwMDc3OSwtMjguNTc4MTI1IHogTSAxMDcuNzcxNDgsNS43MTI4OTA2IDQ1LjU4Mzk4NCw0Mi4zODY3MTkgNTcuMjY3NTc4LDYyLjE5OTIxOSA5Ni40NDMzNTksMzkuMDk1NzAzIFYgMTI4LjI1MzkxIEwgMjQuOTE5OTIyLDgwLjAyNzM0NCAxMi4wNjA1NDcsOTkuMDk3NjU2IDg2LjY3NTc4MSwxNDkuNDA4MiAxMy45OTQxNDEsMTk4LjIwMTE3IFYgMTMyLjU5NTcgSCAtOS4wMDU4NTk0IHYgOTAuOTUzMTMgbCAxMTcuMTA1NDY5NCw2OS45MzU1NCA1OS42Nzc3MywtMzUuOTc0NiAtMTEuODc1LC0xOS42OTcyNyAtMzYuNDU4OTgsMjEuOTc2NTYgdiAtODguMjg3MTEgbCA3MC4wMDk3Niw0Ny4yMDUwOCAxMi44NTc0MywtMTkuMDcwMzEgLTc0LjQzMTY0LC01MC4xODc1IDczLjkxMDE1LC00OS42MTcxODkgdiA2Ni41ODAwNzkgaCAyMyBWIDc0LjkxNDA2MiBaIG0gMTEuNjcxODgsMzMuNjIzMDQ2NCA2OS43NSw0MS4yNDgwNDcgLTY5Ljc1LDQ2LjgyNjE3NiB6IE0gOTYuNDQzMzU5LDE3MC41NTQ2OSB2IDg5LjE3OTY4IEwgMjYuMTQyNTc4LDIxNy43NSBaIiBzdHlsZT0iY29sb3I6IzAwMDAwMDtvcGFjaXR5OjE7ZmlsbDojNTk4NmYyO2ZpbGwtb3BhY2l0eToxO3N0cm9rZS1saW5lam9pbjpyb3VuZDstaW5rc2NhcGUtc3Ryb2tlOm5vbmUiIGlkPSJwYXRoMTE5NDA3LTQiLz4mI3hhOyAgICA8cGF0aCBkPSJtIDMuMDMzMTk3Niw2OC40NDkyMTkgYyA2LjQ5NTczNjcsMCAxMS41ODAwODM0LDUuMDgyMzkzIDExLjU4MDA4MzQsMTEuNTc4MTI1IDAsNi40OTU3MzEgLTUuMDg0MzQ2NywxMS41ODAwNzggLTExLjU4MDA4MzQsMTEuNTgwMDc4IC02LjQ5NTcyNjcsMCAtMTEuNTc4MTIzNCwtNS4wODQzNDcgLTExLjU3ODEyMzQsLTExLjU4MDA3OCAwLC02LjQ5NTczMiA1LjA4MjM5NjcsLTExLjU3ODEyNSAxMS41NzgxMjM0LC0xMS41NzgxMjUgeiBNIDIxMS4wMDM5MSwyMDYuODczMDUgYyA2LjU1MjgzLDAgMTEuNjgxNjQsNS4xMzA3NiAxMS42ODE2NCwxMS42ODM1OSAwLDYuNTUyODMgLTUuMTI4ODEsMTEuNjgxNjQgLTExLjY4MTY0LDExLjY4MTY0IC02LjU1Mjg0LDAgLTExLjY4MzYsLTUuMTI4ODEgLTExLjY4MzYsLTExLjY4MTY0IDAsLTYuNTUyODMgNS4xMzA3NiwtMTEuNjgzNTkgMTEuNjgzNiwtMTEuNjgzNTkgeiBNIDEwNy43NjM2Nyw5OC41NTQ2ODcgYyAtMjcuNzcyNTc4LDNlLTYgLTUwLjUyMzQzMywyMi43NTA4NjMgLTUwLjUyMzQzMyw1MC41MjM0MzMgMCwyNy43NzI1OCAyMi43NTA4NTUsNTAuNTIxNDkgNTAuNTIzNDMzLDUwLjUyMTQ5IDI3Ljc3MjU4LDAgNTAuNTIzNDQsLTIyLjc0ODkxIDUwLjUyMzQ0LC01MC41MjE0OSAwLC0yNy43NzI1NyAtMjIuNzUwODYsLTUwLjUyMzQzNyAtNTAuNTIzNDQsLTUwLjUyMzQzMyB6IiBzdHlsZT0iY29sb3I6IzAwMDAwMDtvcGFjaXR5OjE7ZmlsbDojZmZmZmZmO2ZpbGwtb3BhY2l0eToxO3N0cm9rZS1saW5lam9pbjpyb3VuZDstaW5rc2NhcGUtc3Ryb2tlOm5vbmUiIGlkPSJwYXRoMTM3Mjg5Ii8+JiN4YTsgICAgPHBhdGggaWQ9InBhdGgxMjAyMDMiIGQ9Im0gMTA3Ljc2MzY3LDEyMC41NTQ2OSBjIDE1Ljg4MjkxLC0xMGUtNiAyOC41MjM0NCwxMi42NDA1MyAyOC41MjM0NCwyOC41MjM0MyAwLDE1Ljg4MjkxIC0xMi42NDA1MywyOC41MjE0OSAtMjguNTIzNDQsMjguNTIxNDkgLTE1Ljg4MjkwNCwwIC0yOC41MjM0MzgsLTEyLjYzODU4IC0yOC41MjM0MzgsLTI4LjUyMTQ5IDAsLTE1Ljg4MjkgMTIuNjQwNTM0LC0yOC41MjM0MyAyOC41MjM0MzgsLTI4LjUyMzQzIHoiIHN0eWxlPSJjb2xvcjojMDAwMDAwO29wYWNpdHk6MTtmaWxsOiM1OTg2ZjI7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlLWxpbmVqb2luOnJvdW5kOy1pbmtzY2FwZS1zdHJva2U6bm9uZSIvPiYjeGE7ICA8L2c+JiN4YTs8L3N2Zz4=;', 
		    		s * 39, s * 42, 'Dataplex', null, null, null, this.getTagsForStencil(gn, '', dt + 'dataplex').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJzdmc4MjciIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDQ4NS4xMTczNCAzNjcuNzkxNSIgaGVpZ2h0PSIzNjcuNzkxNW1tIiB3aWR0aD0iNDg1LjExNzM0bW0iPiYjeGE7ICAmI3hhOyAgPGRlZnMgaWQ9ImRlZnM4MjQiLz4mI3hhOyAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTMzLjcyMDcsMzAuMjkzMjQxKSIgaWQ9ImxheWVyMSI+JiN4YTsgICAgPHBhdGggaWQ9InBhdGgxMDI1IiBkPSJtIDM3LjU4OTg0NCwtMTguNSBjIC05NC4zOTIzMjUsMmUtNiAtMTcxLjMxMDU0NCw3Ni45MTYyNjkgLTE3MS4zMTA1NDQsMTcxLjMwODU5IDAsOTQuMzkyMzIgNzYuOTE4MjIzLDE3MS4zMTA1NSAxNzEuMzEwNTQ0LDE3MS4zMTA1NSA5NC4zOTIzMTYsMCAxNzEuMzA4NTg2LC03Ni45MTgyMyAxNzEuMzA4NTk2LC0xNzEuMzEwNTUgMCwtOTQuMzkyMzIxIC03Ni45MTYyNywtMTcxLjMwODU4NiAtMTcxLjMwODU5NiwtMTcxLjMwODU5IHogbSAwLDM3IGMgNzQuMzk2MDU2LDNlLTYgMTM0LjMwODU5Niw1OS45MTI1MzMgMTM0LjMwODU5NiwxMzQuMzA4NTkgLTFlLTUsNzQuMzk2MDYgLTU5LjkxMjU0LDEzNC4zMTA1NSAtMTM0LjMwODU5NiwxMzQuMzEwNTUgLTc0LjM5NjA1OCwwIC0xMzQuMzEwNTQyLC01OS45MTQ0OSAtMTM0LjMxMDU0NywtMTM0LjMxMDU1IDAsLTc0LjM5NjA1NyA1OS45MTQ0ODYsLTEzNC4zMDg1ODggMTM0LjMxMDU0NywtMTM0LjMwODU5IHoiIHN0eWxlPSJjb2xvcjojMDAwMDAwO29wYWNpdHk6MTtmaWxsOiNiNWNiZjk7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlLWxpbmVqb2luOnJvdW5kOy1pbmtzY2FwZS1zdHJva2U6bm9uZSIvPiYjeGE7ICAgIDxwYXRoIHRyYW5zZm9ybT0ic2NhbGUoMC4yNjQ1ODMzMykiIGQ9Im0gLTEwNi41NTA3OCwyMzEuNjczODMgYyAtNzIuODc3MDQsMCAtMTMyLjc2OTUzLDU5Ljg5MjQ5IC0xMzIuNzY5NTMsMTMyLjc2OTUzIC0xZS01LDcyLjg3NzAzIDU5Ljg5MjQ5LDEzMi43NjM2NyAxMzIuNzY5NTMsMTMyLjc2MzY3IDMyLjc5OTYyNCwwIDYyLjk2NTA4NSwtMTIuMTM1MTIgODYuMjI2NTYxLC0zMi4xMjEwOSBMIDcwLjY2NjAxNiw1MTcuNjI1IDEwOC40NjI4OSw0NTIuMTYyMTEgMjAuODU5Mzc1LDQwMS41ODAwOCBjIDMuNDc3ODQxLC0xMS44MDI2MiA1LjM1MzUxNiwtMjQuMjY1MjYgNS4zNTM1MTYsLTM3LjEzNjcyIDAsLTcyLjg3NzA0IC01OS44ODY2MjksLTEzMi43Njk1MyAtMTMyLjc2MzY3MSwtMTMyLjc2OTUzIHogbSAwLDc1LjU4OTg0IGMgMzIuMDI0OTE1LDAgNTcuMTczODI3LDI1LjE1NDc3IDU3LjE3MzgyNyw1Ny4xNzk2OSAwLDMyLjAyNDkyIC0yNS4xNDg5MDksNTcuMTczODMgLTU3LjE3MzgyNyw1Ny4xNzM4MyAtMzIuMDI0OTIsMCAtNTcuMTc5NjksLTI1LjE0ODkxIC01Ny4xNzk2OSwtNTcuMTczODMgMCwtMzIuMDI0OTIgMjUuMTU0NzcsLTU3LjE3OTY5IDU3LjE3OTY5LC01Ny4xNzk2OSB6IiBzdHlsZT0iY29sb3I6IzAwMDAwMDtvcGFjaXR5OjE7ZmlsbDojNzY5ZWY1O2ZpbGwtb3BhY2l0eToxO3N0cm9rZS13aWR0aDozLjc3OTUzO3N0cm9rZS1saW5lam9pbjpyb3VuZDstaW5rc2NhcGUtc3Ryb2tlOm5vbmUiIGlkPSJwYXRoMTEwMyIvPiYjeGE7ICAgIDxwYXRoIHRyYW5zZm9ybT0ic2NhbGUoMC4yNjQ1ODMzMykiIGQ9Im0gMTE0NS44MjgxLC0xMTQuNDk0MTQgYSAxODAuNDExNTgsMTgwLjQxMTU4IDAgMCAwIC0xODAuNDEwMTMsMTgwLjQxMjEwOSAxODAuNDExNTgsMTgwLjQxMTU4IDAgMCAwIDIuMDExNzIsMjYuODc1IEwgNDIxLjE2MjExLDQwMC42NTYyNSBBIDIzNy42NTgzMywyMzcuNjU4MzMgMCAwIDAgMjY1Ljk4NDM4LDM0Mi45NzY1NiAyMzcuNjU4MzMsMjM3LjY1ODMzIDAgMCAwIDI4LjMyNjE3Miw1ODAuNjM0NzcgMjM3LjY1ODMzLDIzNy42NTgzMyAwIDAgMCAyNjUuOTg0MzgsODE4LjI5NDkyIDIzNy42NTgzMywyMzcuNjU4MzMgMCAwIDAgNDE3LjY1MDM5LDc2My40NDMzNiBsIDU1My4xNTgyLDMxMS40Mzc1NCBhIDE3OS4zNTE3NiwxNzkuMzUxNzYgMCAwIDAgLTEuMzk4NDMsMjEuMzQ5NiAxNzkuMzUxNzYsMTc5LjM1MTc2IDAgMCAwIDE3OS4zNTE1NCwxNzkuMzUzNSAxNzkuMzUxNzYsMTc5LjM1MTc2IDAgMCAwIDE3OS4zNTE2LC0xNzkuMzUzNSAxNzkuMzUxNzYsMTc5LjM1MTc2IDAgMCAwIC0xNzkuMzUxNiwtMTc5LjM1MTU5IDE3OS4zNTE3NiwxNzkuMzUxNzYgMCAwIDAgLTEwOC40NTksMzYuNjQ0NTMgTCA0OTQuMzA2NjQsNjQ2LjEyMzA1IEEgMjM3LjY1ODMzLDIzNy42NTgzMyAwIDAgMCA1MDMuNjQyNTgsNTgwLjYzNDc3IDIzNy42NTgzMywyMzcuNjU4MzMgMCAwIDAgNDk1LjU2ODM2LDUxOS4yNSBMIDEwNDAuNDE0MSwyMTIuMTg1NTUgYSAxODAuNDExNTgsMTgwLjQxMTU4IDAgMCAwIDEwNS40MTQsMzQuMTQ0NTMgMTgwLjQxMTU4LDE4MC40MTE1OCAwIDAgMCAxODAuNDEyMSwtMTgwLjQxMjExMSAxODAuNDExNTgsMTgwLjQxMTU4IDAgMCAwIC0xODAuNDEyMSwtMTgwLjQxMjEwOSB6IiBzdHlsZT0iY29sb3I6IzAwMDAwMDtvcGFjaXR5OjE7ZmlsbDojNTk4NmYyO2ZpbGwtb3BhY2l0eToxO3N0cm9rZS13aWR0aDo4Ni45MjkxO3N0cm9rZS1saW5lam9pbjpyb3VuZDstaW5rc2NhcGUtc3Ryb2tlOm5vbmUiIGlkPSJwYXRoMTA5MyIvPiYjeGE7ICA8L2c+JiN4YTs8L3N2Zz4=;', 
		    		s * 42, s * 32, 'Analytics Hub', null, null, null, this.getTagsForStencil(gn, '', dt + 'analytics hub').join(' ')),

		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjI3MS44OTgxMDE4MDY2NDA2IiBoZWlnaHQ9IjQyMy4wMDQwMjgzMjAzMTI1IiB2aWV3Qm94PSIwLjAwMDQ2MTI3MDM2MzMwMjkwMTQgMCAyNzEuODk4MTAxODA2NjQwNiA0MjMuMDA0MDI4MzIwMzEyNSI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDtmaWxsLXJ1bGU6ZXZlbm9kZH0mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xOTcuMzc4IDE0NC43NzRhMy4xMSAzLjExIDAgMCAxIDMuMTA1IDIuOTM0bC4wMDUuMTc3djE3LjEwN2EzLjExIDMuMTEgMCAwIDEtMi45MzQgMy4xMDVsLS4xNzcuMDA1aC0xMi40NDF2MzAuNjQ5YzAgMS4yMjcuMjk3IDIuNDM1Ljg2MiAzLjUyMmwuMTYxLjI5MyA4My44OTUgMTQ0LjI2MmExNS4yNiAxNS4yNiAwIDAgMSAuMTgyIDE0LjkzNmwtLjE4Mi4zMjQtMzAuNDMxIDUzLjI4NmExNS4yNiAxNS4yNiAwIDAgMS0xMi44NjEgNy42MjZsLS4zNTUuMDA0SDQ1LjY5MmExNS4yNiAxNS4yNiAwIDAgMS0xMy4wMzUtNy4zMjRsLS4xODEtLjMwNS0zMC40MzEtNTMuMjg2YTE1LjI2IDE1LjI2IDAgMCAxLS4xODItMTQuOTM2bC4xODItLjMyNCA4My42NzQtMTQ0LjI2MmMuNjIxLTEuMDc3IDEuMTYtMi4yODkgMS4yMzQtMy41MjhsLjAwOS0uMjg3di0zMC42NDlINzQuNTJjLTEuNjU4IDAtMy4wMTQtMS4yOTktMy4xMDUtMi45MzRsLS4wMDUtLjE3NnYtMTcuMTA3YTMuMTEgMy4xMSAwIDAgMSAyLjkzNC0zLjEwNWwuMTc2LS4wMDV6bS0zNS43NjkgMjMuMzI3aC01MS4zMnYzNS40MDVjMCAyLjUzMS0uNjI4IDUuMDE4LTEuODI2IDcuMjQybC0uMjE3LjM5TDI4LjAzMyAzNTAuOWE3LjYzIDcuNjMgMCAwIDAtLjEzOSA3LjM3NWwuMTQxLjI1NSAyMC43NDEgMzUuOTIxYTcuNjMgNy42MyAwIDAgMCA2LjMyNyAzLjgxbC4yODEuMDA1aDI1LjU3MmwtMjIuNjA1LTM5LjE1M2MtMS4zMTQtMi4yNzYtMS4zNjEtNS4wNjItLjE0MS03LjM3NWwuMTQxLS4yNTUgMTkuNjc5LTM0LjA4NmgxNDYuNjA2TDIxMi45ODggMjk3LjFoLTU0LjI1OWwtOC44MjEtMTUuMjc4aDU0LjMxMmwtMTYuMzMzLTI4LjQ2aC01NC43OGwtOC44MjEtMTUuMjc4aDU0LjgzM2wtMTUuNDY1LTI2Ljk0NmExNS4yNyAxNS4yNyAwIDAgMS0yLjAzOS03LjE4NWwtLjAwNy0uNDQ2em03Mi44NDQgMTY2LjQwMWwtNTQuMTgxLjAwMSA4LjgyMSAxNS41NTJoNTQuMjg1ek0xMDQuOTIxIDc5Ljc5NWM4LjQyNyAwIDE1LjI1OSA2LjgzMyAxNS4yNTkgMTUuMjYxcy02LjgzMiAxNS4yNTktMTUuMjU5IDE1LjI1OS0xNS4yNTktNi44MzItMTUuMjU5LTE1LjI1OSA2LjgzMi0xNS4yNjEgMTUuMjU5LTE1LjI2MXptNTcuNTc1LTMyLjc0M2MxMi42NDIgMCAyMi44OSAxMC4yNDcgMjIuODkgMjIuODg5cy0xMC4yNDkgMjIuODg5LTIyLjg5IDIyLjg4OS0yMi44ODktMTAuMjQ5LTIyLjg4OS0yMi44ODkgMTAuMjQ3LTIyLjg4OSAyMi44ODktMjIuODg5ek0xMjcuODEgMGM4LjQyNyAwIDE1LjI2MSA2LjgzMyAxNS4yNjEgMTUuMjYxUzEzNi4yMzcgMzAuNTIgMTI3LjgxIDMwLjUycy0xNS4yNTktNi44MzItMTUuMjU5LTE1LjI1OVMxMTkuMzg0IDAgMTI3LjgxIDB6Ii8+JiN4YTs8L3N2Zz4=;', 
		    		s * 28, s * 42, 'Datalab', null, null, null, this.getTagsForStencil(gn, '', dt + 'datalab').join(' '))
	 	];
		
		this.addPalette('gcp2Icons Data Analytics', 'GCP Icons / Analytics', false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addGCP2IconsOperationsPalette = function()
	{
		var sb = this;
		var s = 1;
		var n = 'sketch=0;html=1;verticalAlign=top;labelPosition=center;verticalLabelPosition=bottom;align=center;spacingTop=-6;fontSize=11;fontStyle=1;fontColor=#999999;shape=image;aspect=fixed;imageAspect=0;';
		var dt = 'gcp google cloud platform icons icon compute ';
		var gn = 'mxgraph.gcp2';
		var fns = [];
		
		var fns = [
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTQuNDkgMTBMMTAgMTQuNDkgNS41MSAxMCAxMCA1LjUxek0xMCAxMi45MUwxMi45MSAxMCAxMCA3LjA5IDcuMDkgMTB6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTIwIDEwaC0yLjY1bC0zLjAyIDMuMDJoMi42NXoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMjAgMTBsLTMuMDItMy4wMmgtMi42NUwxNy4zNSAxMHpNMCAxMGgyLjY1bDMuMDItMy4wMkgzLjAyeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik01LjY3IDEzLjAyTDIuNjUgMTBIMGwzLjAyIDMuMDJ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTEwIDIuNjVWMEw2Ljk4IDMuMDJ2Mi42NXoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTMuMDIgNS42N1YzLjAyTDEwIDB2Mi42NXoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMTAgMjB2LTIuNjVsLTMuMDItMy4wMnYyLjY1eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xMy4wMiAxNi45OHYtMi42NUwxMCAxNy4zNVYyMHoiLz4mI3hhOzwvc3ZnPg==;', 
		    		s * 42, s * 42, 'Cloud\nAPIs', null, null, null, this.getTagsForStencil(gn, '', dt + 'cloud apis application programming interfaces').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJzdmcxMzc4NyIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMzA3LjA0ODY4IDIwOC43ODQ5NyIgaGVpZ2h0PSIyMDguNzg0OTdtbSIgd2lkdGg9IjMwNy4wNDg2OG1tIj4mI3hhOyAgJiN4YTsgIDxkZWZzIGlkPSJkZWZzMTM3ODQiLz4mI3hhOyAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDkuNDM4MzE2LC00NC45NDM5MjQpIiBpZD0ibGF5ZXIxIj4mI3hhOyAgICA8cGF0aCBpZD0icGF0aDE0OTY1IiBkPSJNIDEwNC41OTExOSwyNTMuNzI4OSBIIC0zMi42ODY0ODkgYyAtOS4yODA1MTIsMCAtMTYuNzUxODI3LC03LjQ3MTMyIC0xNi43NTE4MjcsLTE2Ljc1MTgzIFYgNjEuNjk1NzUxIGMgMCwtOS4yODA1MTIgNy40NzEzMTUsLTE2Ljc1MTgyNyAxNi43NTE4MjcsLTE2Ljc1MTgyNyBIIDEwNC41OTExOSBaIiBzdHlsZT0ib3BhY2l0eToxO2ZpbGw6IzhkYTVlNTtmaWxsLW9wYWNpdHk6MTtzdHJva2Utd2lkdGg6MjA7c3Ryb2tlLWxpbmVqb2luOnJvdW5kIi8+JiN4YTsgICAgPHBhdGggaWQ9InJlY3QxMzkyOSIgZD0ibSAxMDQuNTk2NzgsNDQuOTQzOTI0IGggMTM2LjI2MTc1IGMgOS4yODA1MSwwIDE2Ljc1MTgzLDcuNDcxMzE1IDE2Ljc1MTgzLDE2Ljc1MTgyNyBWIDIzNi45NzcwNyBjIDAsOS4yODA1MSAtNy40NzEzMiwxNi43NTE4MyAtMTYuNzUxODMsMTYuNzUxODMgSCAxMDQuNTk2NzggWiIgc3R5bGU9Im9wYWNpdHk6MTtmaWxsOiM2ODg2ZGQ7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlLXdpZHRoOjIwO3N0cm9rZS1saW5lam9pbjpyb3VuZCIvPiYjeGE7ICAgIDxwYXRoIGlkPSJwYXRoMzIzOTYiIGQ9Ik0gMTA0LjU5MTE5LDEwOC4xNTQzMyBIIC00OS4wMjk3MzkgViA3NS4xNzg5MzIgSCAxMDQuNTkxMTkgWiIgc3R5bGU9Im9wYWNpdHk6MTtmaWxsOiM2ODg2ZGQ7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlLXdpZHRoOjIwO3N0cm9rZS1saW5lam9pbjpyb3VuZCIvPiYjeGE7ICAgIDxwYXRoIGlkPSJyZWN0MTM5OTciIGQ9Ik0gMTA0LjU5MTE5LDc1LjE3ODkzMiBIIDI1Ny41NDYzMSBWIDEwOC4xNTQzMyBIIDEwNC41OTExOSBaIiBzdHlsZT0ib3BhY2l0eToxO2ZpbGw6IzQ2NjlkNDtmaWxsLW9wYWNpdHk6MTtzdHJva2Utd2lkdGg6MjA7c3Ryb2tlLWxpbmVqb2luOnJvdW5kIi8+JiN4YTsgICAgPHJlY3QgeT0iMTg1Ljk3NDUyIiB4PSItMjAuMjg4ODUzIiBoZWlnaHQ9IjQwLjIzOTIzMSIgd2lkdGg9IjU5LjgwMTU1NiIgaWQ9InJlY3QxNDAwMyIgc3R5bGU9Im9wYWNpdHk6MTtmaWxsOiM2ODg2ZGQ7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjIwO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZSIvPiYjeGE7ICAgIDxwYXRoIGQ9Im0gMTk2LjcxOTc0LDE5My42ODcxIGggMjUuNDgwNzUgdiAyNS40MzExNyBoIC0yNS40ODA3NSB6IG0gLTM4LjA4Mzg4LDAgaCAyNS40ODA3NSB2IDI1LjQzMTE3IGggLTI1LjQ4MDc1IHogbSAtMzguMDgzODksMCBoIDI1LjQ4MDc1IHYgMjUuNDMxMTcgSCAxMjAuNTUxOTcgWiBNIC0yMi4yNjc2NzMsMTI3LjQ3NzMzIEggMjMxLjY2NTUxIHYgMzMuOTEyMjQgSCAtMjIuMjY3NjczIFoiIHN0eWxlPSJvcGFjaXR5OjE7ZmlsbDojZmZmZmZmO2ZpbGwtb3BhY2l0eToxO3N0cm9rZS13aWR0aDoyMDtzdHJva2UtbGluZWpvaW46cm91bmQiIGlkPSJyZWN0MTQwMDUtOCIvPiYjeGE7ICA8L2c+JiN4YTs8L3N2Zz4=;', 
		    		s * 42, s * 29, 'Cloud Billing API', null, null, null, this.getTagsForStencil(gn, '', dt + 'cloud billing api application programming interface').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjQyNCIgaGVpZ2h0PSI0MjQiIHZpZXdCb3g9IjAgMCA0MjQgNDI0Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQgMHY0MjRIMFYwek0yMTIgOTcuODQ2Yy0zNy44ODQgMC03MC4xNjQgMjMuOTktODIuNDc4IDU3LjYwOGgwbC0zLjQwMy4wMDFjLTQyLjYzNCAwLTc3LjE5NiAzNC41NjItNzcuMTk2IDc3LjE5NnMzNC41NjIgNzcuMTk2IDc3LjE5NiA3Ny4xOTZoMCAxNzEuNzYzYzQyLjYzNCAwIDc3LjE5Ni0zNC41NjIgNzcuMTk2LTc3LjE5NnMtMzQuNTYyLTc3LjE5Ni03Ny4xOTYtNzcuMTk2aDBsLTMuNDAzLS4wMDFDMjgyLjE2NCAxMjEuODM3IDI0OS44ODQgOTcuODQ2IDIxMiA5Ny44NDZ6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOzwvc3ZnPg==;', 
		    		s * 42, s * 42, 'Cloud Console', null, null, null, this.getTagsForStencil(gn, '', dt + 'cloud console').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE4Ljk1MDAwMDc2MjkzOTQ1MyIgdmlld0JveD0iMCAwIDIwIDE4Ljk1MDAwMDc2MjkzOTQ1MyI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJLnN0MXtmaWxsOiM2NjlkZjY7fSYjeGE7CS5zdDJ7ZmlsbDojYWVjYmZhO30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik04IDEzLjk1aDR2NEg4eiIvPiYjeGE7CTxnIGZpbGwtcnVsZT0iZXZlbm9kZCI+JiN4YTsJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xMS42NSA0LjQ3TDE3IDkuOFY3Ljc5bC00LjM0LTQuMzN6Ii8+JiN4YTsJCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMi42NiAzLjQ2bDEuMDEgMS4wMXYyLjAxbC0yLjAyLTIuMDF6Ii8+JiN4YTsJCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xMi42NiAzLjQ2bDEuMDEgMS4wMS00LjczIDQuNzItMS4wMS0xLjAxeiIvPiYjeGE7CQk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNNy4xIDUuMzNsMi44NSAyLjg1LTEuMDEgMS4wMS0yLjg2LTIuODV6Ii8+JiN4YTsJCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik03LjEgNS4zM2wuOTguOTh2Mi4wMmwtMi0xLjk5eiIvPiYjeGE7CQk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNNy4wNyA1LjNMMyA5LjM2djEuNThoLjQ0bDQuNjQtNC42M3oiLz4mI3hhOwkJPHBhdGggY2xhc3M9InN0MSIgZD0iTTIwIDFhMS4yNCAxLjI0IDAgMCAwLTEtMUgxYTEuMjQgMS4yNCAwIDAgMC0xIDF2MTIuOTVhMS4xOSAxLjE5IDAgMCAwIDEgMWgxOGExLjE5IDEuMTkgMCAwIDAgMS0xem0tMiAxMS45NUgydi0xMWgxNnptLTEyIDZjMC0uNjkuMzEtMSAxLTFoNmMuNjkgMCAxIC4zMSAxIDF6Ii8+JiN4YTsJPC9nPiYjeGE7PC9zdmc+;', 
		    		s * 42, s * 40, 'Cloud Deployment\nManager', null, null, null, this.getTagsForStencil(gn, '', dt + 'cloud deployment manager').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE5IiB2aWV3Qm94PSIwIDAgMjAgMTkiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8ZyBjbGFzcz0ic3QwIj4mI3hhOwkJPHBhdGggZD0iTTQgOWg0djJINHptLTIgN2g2djJIMnoiLz4mI3hhOwkJPHBhdGggZD0iTTQgNEgydjEyaDJ6Ii8+JiN4YTsJPC9nPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0yMCAxSDd2NGgxM3ptMCA3SDd2NGgxM3ptMCA3SDd2NGgxM3oiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNNiAwSDB2Nmg2eiIvPiYjeGE7PC9zdmc+;', 
		    		s * 42, s * 40, 'Cloud\nLogging', null, null, null, this.getTagsForStencil(gn, '', dt + 'cloud logging').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjQyNCIgaGVpZ2h0PSI0MjQiIHZpZXdCb3g9IjAgMCA0MjQgNDI0Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQgMHY0MjRIMFYwek0yMTIgOTcuODQ2Yy0zNy44ODQgMC03MC4xNjQgMjMuOTktODIuNDc4IDU3LjYwOGgwbC0zLjQwMy4wMDFjLTQyLjYzNCAwLTc3LjE5NiAzNC41NjItNzcuMTk2IDc3LjE5NnMzNC41NjIgNzcuMTk2IDc3LjE5NiA3Ny4xOTZoMCAxNzEuNzYzYzQyLjYzNCAwIDc3LjE5Ni0zNC41NjIgNzcuMTk2LTc3LjE5NnMtMzQuNTYyLTc3LjE5Ni03Ny4xOTYtNzcuMTk2aDBsLTMuNDAzLS4wMDFDMjgyLjE2NCAxMjEuODM3IDI0OS44ODQgOTcuODQ2IDIxMiA5Ny44NDZ6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOzwvc3ZnPg==;', 
		    		s * 42, s * 42, 'Google Cloud App', null, null, null, this.getTagsForStencil(gn, '', dt + 'google cloud app').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjEzLjUyOTk5OTczMjk3MTE5MSIgdmlld0JveD0iLTIuOTMyMDk3ODk3ODEyMDE0ZS05IC01LjI1ODAxNTA0MTgzNzk1NmUtMTUgMjAgMTMuNTI5OTk5NzMyOTcxMTkxIj4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qxe2ZpbGw6IzY2OWRmNjt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNOC44MyAxMC41OGgyLjMzdjIuNjRIOC44M3oiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTYuNDggOC42MWEuNTYuNTYgMCAwIDEtLjQtLjE3TDEyIDQuMjEgOS4yNiA3LjFhLjU3LjU3IDAgMCAxLS43Ni4wNUw2LjQyIDUuNDdsLTIuMiAyLjkyYS41Ni41NiAwIDAgMS0uNDUuMjJIMHYxLjcxYS43NS43NSAwIDAgMCAuNzQuNzVoMTguNTJhLjc1Ljc1IDAgMCAwIC43NC0uNzVWOC42MXoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMy41IDcuNWwyLjM4LTMuMTZhLjU1LjU1IDAgMCAxIC4zNy0uMjIuNjMuNjMgMCAwIDEgLjQyLjEybDIuMTIgMS43MiAyLjgtMi45NGEuNTQuNTQgMCAwIDEgLjQtLjE3aDBhLjU0LjU0IDAgMCAxIC40LjE3bDQuMzMgNC40OEgyMFYuNzRhLjc0Ljc0IDAgMCAwLS43NC0uNzRILjc0QS43NC43NCAwIDAgMCAwIC43NHY2LjgxeiIvPiYjeGE7CTxyZWN0IGNsYXNzPSJzdDAiIHg9IjYuNjciIHk9IjEyLjkyIiB3aWR0aD0iNi42NyIgaGVpZ2h0PSIuNjEiIHJ4PSIuMyIvPiYjeGE7PC9zdmc+;', 
		    		s * 42, s * 29, 'Cloud\nMonitoring', null, null, null, this.getTagsForStencil(gn, '', dt + 'cloud monitoring').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjM3NS44NTAyODQ2NDQwODg3MyIgaGVpZ2h0PSIzNTMuODA1Nzc3NDY3NzY5NyIgdmlld0JveD0iMC4yNTU5OTk1NjUxMjQ1MTE3IDAuNDI2MDAwMDI4ODQ4NjQ4MDcgOTkuNDQzNjU2OTIxMzg2NzIgOTMuNjExMDAwMDYxMDM1MTYiPiYjeGE7PHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6I2FlY2JmYTt9JiN4YTsJLnN0MXtmaWxsOiNmZmY7fSYjeGE7CS5zdDJ7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qze2ZpbGw6IzY2OWRmNjt9JiN4YTs8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik04LjU0NCA3MS45MjhjLTQuODE1IDAtOC4yODgtMy44ODktOC4yODgtOC4zMjdWNy45ODNDLjI1NyA0LjY1IDQuMDcyLjQyNiA3LjQ5NS40MjZoODMuOTUyYzQuNzA1IDAgOC4yNTIgMy4zNzkgOC4yNTIgOC4xNzR2NTEuNDk1Yy4wNDcgNy41OTUtMi40NyAxMS44MzQtOS4wMTIgMTEuODM0eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0yOC4wNDYgNTcuMTV2LTkuOTIybDMxLjg4Mi0xMy44OTEtMzEuODgyLTEzLjY5MlY5LjI2MWw0NS44MDYgMTguOTg0djkuNzl6bTI1LjIzNSAzLjY3MXYtMTAuNTVoMjAuMDc1djEwLjU1eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik00MC4wMyA4My41MjRWNzEuOTI4aDIwLjI5NXYxMS41OTZ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MyIgZD0iTTY5Ljg3MyA4My41MjR2MTAuNTEzSDMwLjFWODMuNTI0eiIvPiYjeGE7PC9zdmc+;', 
		    		s * 42, s * 40, 'Cloud\nShell', null, null, null, this.getTagsForStencil(gn, '', dt + 'cloud shell').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJzdmc0MzQxMyIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMjQxLjgzMTM4IDI0MS44MTIwNyIgaGVpZ2h0PSIyNDEuODEyMDdtbSIgd2lkdGg9IjI0MS44MzEzOG1tIj4mI3hhOyAgJiN4YTsgIDxkZWZzIGlkPSJkZWZzNDM0MTAiLz4mI3hhOyAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNi43ODkzOTY4LC0xOS45OTY3NTQpIiBpZD0ibGF5ZXIxIj4mI3hhOyAgICA8cGF0aCBkPSJNIDE5LjY0NTkxNCwxNDEuODU1MDYgSCAyMjQuMTk0NTUgTSAyMTMuMjE1OTUsNDIuMTgwOTM0IDI2LjU3OTc2NiwyMzEuMTI4NCBNIDI2LjAwMTk0NSw1My43MzczNTQgMjA1LjcwNDI4LDIzMy40Mzk2OSIgc3R5bGU9Im9wYWNpdHk6MTtmaWxsOm5vbmU7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOiM0NjY5ZDQ7c3Ryb2tlLXdpZHRoOjE1O3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1vcGFjaXR5OjEiIGlkPSJwYXRoNDM5OTMiLz4mI3hhOyAgICA8cmVjdCByeT0iMCIgcng9IjAiIHk9Ijk4LjUxODQ4NiIgeD0iNzEuMzYwOTAxIiBoZWlnaHQ9Ijg2LjA5NTMyOSIgd2lkdGg9Ijg2LjA5NTMyOSIgaWQ9InJlY3Q0MzUzNi0xIiBzdHlsZT0ib3BhY2l0eToxO2ZpbGw6IzhkYTVlNTtmaWxsLW9wYWNpdHk6MTtzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MzIuNzQ3MztzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmUiLz4mI3hhOyAgICA8cGF0aCBkPSJtIDE4Mi40NjAyNywyMDkuMjI3MTIgaCA1Mi41ODE3MSB2IDUyLjU4MTcxIGggLTUyLjU4MTcxIHogbSAwLC05NC42MTUxOSBoIDUyLjU4MTcxIHYgNTIuNTgxNzEgaCAtNTIuNTgxNzEgeiBtIDAsLTk0LjYxNTE3NiBoIDUyLjU4MTcxIFYgNzIuNTc4NDY1IEggMTgyLjQ2MDI3IFogTSAtNi43ODkzOTY4LDIwOS4yMjcxMiBIIDQ1Ljc5MjMxNCB2IDUyLjU4MTcxIEggLTYuNzg5Mzk2OCBaIG0gNWUtNywtOTQuNjE1MTkgSCA0NS43OTIzMTUgdiA1Mi41ODE3MSBIIC02Ljc4OTM5NjMgWiBtIDAsLTk0LjYxNTE3NiBIIDQ1Ljc5MjMxNSBWIDcyLjU3ODQ2NSBIIC02Ljc4OTM5NjMgWiIgc3R5bGU9Im9wYWNpdHk6MTtmaWxsOiM2ODg2ZGQ7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlLXdpZHRoOjIwO3N0cm9rZS1saW5lam9pbjpyb3VuZCIgaWQ9InJlY3Q0MzUzNi01Ii8+JiN4YTsgIDwvZz4mI3hhOzwvc3ZnPg==;', 
		    		s * 42, s * 42, 'Cloud\nDebugger', null, null, null, this.getTagsForStencil(gn, '', dt + 'cloud debugger').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0wIDE1bDUgNWg1bC0yLjUtMi44Nkg2LjI1bC0zLjM5LTMuMzl2LTcuNWwzLjM5LTMuMzlINy41TDEwIDBINUwwIDV6TTEzLjc1IDIuODZsMy4zOSAzLjM5djcuNWwtMy4zOSAzLjM5SDEwTDEyLjUgMjBIMTVsNS01VjVsLTUtNWgtMi41TDEwIDIuODZ6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTAgMTBMNy41IDcuNSAxMCA1SDcuNUw1IDcuNXY1TDcuNSAxNUgxMGwtMi41LTIuNXptMi41IDBMMTAgMTIuNWwyLjUgMi41IDIuNS0yLjV2LTVMMTIuNSA1IDEwIDcuNXoiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPiYjeGE7PC9zdmc+;', 
		    		s * 42, s * 42, 'Error\nReporting', null, null, null, this.getTagsForStencil(gn, '', dt + 'error reporting').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjMxNC44ODMzMTI4NTM1OTA3IiBoZWlnaHQ9IjM3Ny4zNTIwNjc2NDgzMTU0IiB2aWV3Qm94PSItMC41MDE5OTg5MDEzNjcxODc1IDAuMDEzMDAwMDAwMjY4MjIwOTAxIDgzLjMxMjk5NTkxMDY0NDUzIDk5Ljg0MTAwMzQxNzk2ODc1Ij4mI3hhOzxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiNhZWNiZmE7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOzwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTM5LjQ5OSAzOS42NzJ2MjAuMDI5TDIyLjk3MyA3MS42N2EyMC4yNCAyMC4yNCAwIDAgMCAzMC43ODIgMi41NTQgMjAuMjQgMjAuMjQgMCAwIDAgNS45MjgtMTQuMzEyYzAtMTEuMTU3LTkuMDI4LTIwLjIwOS0yMC4xODUtMjAuMjR6bS0xLjMwNC4wMzlsLS4wNDkuMDAzLjA0OS0uMDAzem0tLjk2LjA4OWEyMC4yNCAyMC4yNCAwIDAgMC0xNy41MyAxNS42NzNjMS45MzgtOC4zMDYgOS4xNjMtMTQuNjg0IDE3LjUzLTE1LjY3M3pNMTkuNjEyIDU1Ljg5MmwtLjA3Mi4zNTcuMDcyLS4zNTd6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTM5LjQ5OSA1OS43MDFMMjIuOTY2IDcxLjY3NmEyMC4xNSAyMC4xNSAwIDAgMS0zLjc3Mi0xMS43N2MwLTExLjE3OSA5LjUzOC0yMC4yNDEgMjAuMzA0LTIwLjI0MXptMzUuNTE1LTQ0LjY2NUw2Mi42MzIgMjcuNDc2Yy02LjU0OC00LjY5OS0xNC41NjQtNy40NzItMjMuMjA4LTcuNDcyLTIxLjk5MSAwLTM5LjkyNiAxNy45MzUtMzkuOTI2IDM5LjkyNnMxNy45MzUgMzkuOTI0IDM5LjkyNiAzOS45MjRTNzkuMzQ4IDgxLjkyIDc5LjM0OCA1OS45MjljMC05LjM5NC0zLjI3NC0xOC4wNDYtOC43MzctMjQuODc4bDEyLjItMTIuMjU0em0tMzUuNTkgMTQuOTY3YTI5Ljg1IDI5Ljg1IDAgMCAxIDI5LjkyNCAyOS45MjYgMjkuODUgMjkuODUgMCAwIDEtMjkuOTI0IDI5LjkyNEEyOS44NSAyOS44NSAwIDAgMSA5LjQ5OCA1OS45MjljMC0xNi41ODYgMTMuMzM5LTI5LjkyNiAyOS45MjYtMjkuOTI2ek02MC4xODUuMDEzTDE5LjU3Mi4wOGwuMDE2IDkuNSA0MC42MTMtLjA2NnoiLz4mI3hhOzwvc3ZnPg==;', 
		    		s * 36, s * 42, 'Cloud Profiler', null, null, null, this.getTagsForStencil(gn, '', dt + 'cloud profiler').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yMCA4SDEwdjRoMTB6bTAgOEgxMHY0aDEweiIgZmlsbD0iIzQyODVmNCIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xMCAxNkg2djRoNHpNMCAwaDZ2NEgwem0wIDhoMTB2NEgweiIgZmlsbD0iIzY2OWRmNiIvPiYjeGE7PC9zdmc+;', 
		    		s * 42, s * 42, 'Cloud Trace', null, null, null, this.getTagsForStencil(gn, '', dt + 'cloud trace').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJzdmc2ODU4MSIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMjM2LjQzMzk0IDI1My4zMDQ0MSIgaGVpZ2h0PSIyNTMuMzA0NDFtbSIgd2lkdGg9IjIzNi40MzM5NG1tIj4mI3hhOyAgJiN4YTsgIDxkZWZzIGlkPSJkZWZzNjg1NzgiLz4mI3hhOyAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTcuNjIzNTQxLC0xNy45ODI1NTIpIiBpZD0ibGF5ZXIxIj4mI3hhOyAgICA8cGF0aCBpZD0icGF0aDY4NzE1IiBkPSJtIC0xNy42MjM1NDEsMTI5LjE0Mjk5IDg0LjUwNjMyMiw0Ni44MDM1MSB2IDk1LjM0MDQ3IGwgLTQwLjE1ODU2LC0yMC41MTI2NSB2IC01Mi41ODE3MSBsIC00NC4zNDc3NjIsLTIyLjI0NjEyIHoiIHN0eWxlPSJvcGFjaXR5OjE7ZmlsbDojYjVjYmY5O2ZpbGwtb3BhY2l0eToxO3N0cm9rZTpub25lO3N0cm9rZS13aWR0aDowLjI2NDU4M3B4O3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1vcGFjaXR5OjEiLz4mI3hhOyAgICA8cGF0aCBpZD0icGF0aDY4NzE3IiBkPSJNIDM0LjAyMTMzOSw3NC4yOTk1NjkgMTM4LjM4ODEzLDEzNC44MDE1MyBWIDI1Ni4xNDM5NCBMIDkwLjUyODEyNiwyMzAuMDcxOSBWIDE2My4wNDQ2NiBMIDM0LjAyMTMzOSwxMzAuNTg3NTUgWiIgc3R5bGU9Im9wYWNpdHk6MTtmaWxsOiM3NjllZjU7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjAuMjY0NTgzcHg7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW9wYWNpdHk6MSIvPiYjeGE7ICAgIDxwYXRoIGlkPSJwYXRoNjg3MTkiIGQ9Ik0gOTIuODg4OTc4LDgxLjQwMjY2IFYgMTcuOTgyNTUyIEwgMjE4LjgxMDQsOTIuNTkxNTY0IFYgMjM1LjI4NDMyIGwgLTU3Ljk5MjQxLC0zNC43ODA0MyB2IC03Ny40OTgxMiB6IiBzdHlsZT0ib3BhY2l0eToxO2ZpbGw6IzU5ODZmMjtmaWxsLW9wYWNpdHk6MTtzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MC4yNjQ1ODNweDtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2Utb3BhY2l0eToxIi8+JiN4YTsgIDwvZz4mI3hhOzwvc3ZnPg==;', 
		    		s * 39, s * 42, 'Cloud Deploy', null, null, null, this.getTagsForStencil(gn, '', dt + 'cloud deploy').join(' ')),

		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjM3My4xMTQ5NzU3NzgxNzE2NCIgaGVpZ2h0PSIzODMuMTM4MDM1MDYzOTUxOCIgdmlld0JveD0iMCAwIDk4LjcxOTk5MzU5MTMwODYgMTAxLjM3MjAwOTI3NzM0Mzc1Ij4mI3hhOzxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7PC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNjguMTk1IDBjLTUuMDExIDAtOS4wNzQgNC4wNjItOS4wNzQgOS4wNzMuMDAyLjc3OS4xMDUgMS41NTUuMzA1IDIuMzA4TDQ5LjMwNSAyMS41ODdsLTkuODExLTkuNTk3Yy4yNjItLjg1OS4zOTYtMS43NTEuMzk2LTIuNjQ5IDAtMi40MDctLjk1Ni00LjcxNS0yLjY1OC02LjQxNlMzMy4yMjMuMjY3IDMwLjgxNi4yNjdzLTQuNzE1Ljk1Ni02LjQxNiAyLjY1OC0yLjY1OCA0LjAxLTIuNjU4IDYuNDE2Ljk1NiA0LjcxNSAyLjY1OCA2LjQxNiA0LjAxIDIuNjU4IDYuNDE2IDIuNjU4Yy4yOTktLjAwMi41OTgtLjAxOC44OTUtLjA1bDEwLjU1MyAxMC4zMjMtMTQuNjIxIDE0Ljc0Mi05LjQ1Ni05Ljc4OGMuMTQ0LS42NDUuMjE2LTEuMzAzLjIxNy0xLjk2NCAwLTUuMDExLTQuMDYyLTkuMDc0LTkuMDczLTkuMDc0LTIuNDA3IDAtNC43MTUuOTU2LTYuNDE2IDIuNjU4Uy4yNTcgMjkuMjczLjI1NyAzMS42NzlzLjk1NiA0LjcxNSAyLjY1OCA2LjQxNiA0LjAxIDIuNjU4IDYuNDE2IDIuNjU4Yy41NTktLjAwMiAxLjExNi0uMDU2IDEuNjY2LS4xNjFsMzEuMDM3IDMyLjEyNi0xMC4wODggMTAuNDA1Yy0uMzgxLS4wNDktLjc2NS0uMDczLTEuMTQ5LS4wNzMtMi40MDcgMC00LjcxNS45NTYtNi40MTYgMi42NThzLTIuNjU4IDQuMDEtMi42NTggNi40MTYuOTU2IDQuNzE1IDIuNjU4IDYuNDE2IDQuMDEgMi42NTggNi40MTYgMi42NTggNC43MTUtLjk1NiA2LjQxNi0yLjY1OCAyLjY1OC00LjAxIDIuNjU4LTYuNDE2YzAtLjgzMS0uMTE1LTEuNjU3LS4zNC0yLjQ1N2wyNi4zMjUtMjcuMTUtNy4xOC02Ljk2My05LjY3NyA5Ljk4MS0xNC40MDYtMTQuOTEgMzIuMzAxLTMyLjU3M2MuNDMxLjA2My44NjYuMDk1IDEuMzAyLjA5NiAyLjQwNyAwIDQuNzE1LS45NTYgNi40MTYtMi42NThzMi42NTgtNC4wMSAyLjY1OC02LjQxNkM3Ny4yNjkgNC4wNjIgNzMuMjA2IDAgNjguMTk1IDB6bTIxLjQ1MSAyMi40NDFjLTIuNDA3IDAtNC43MTUuOTU2LTYuNDE2IDIuNjU4cy0yLjY1OCA0LjAxLTIuNjU4IDYuNDE2Yy4wMDIuNTkzLjA2MiAxLjE4My4xNzkgMS43NjRMNzAuNTA0IDQzLjUzNmwtOS42NTYtOS45MzctNy4xNzQgNi45NjlMODAuNDk1IDY4LjE3Yy0uMTEuNTYyLS4xNjYgMS4xMzQtLjE2OCAxLjcwNyAwIDIuNDA3Ljk1NiA0LjcxNSAyLjY1OCA2LjQxNnM0LjAxIDIuNjU4IDYuNDE2IDIuNjU4YzUuMDExIDAgOS4wNzMtNC4wNjMgOS4wNzMtOS4wNzRzLTQuMDYyLTkuMDc0LTkuMDczLTkuMDc0Yy0uNjQ1LjAwMS0xLjI4OC4wNzEtMS45MTguMjA4bC0xMC4wMS0xMC4zMDRMODcuNzgxIDQwLjM5Yy42MTMuMTMgMS4yMzguMTk3IDEuODY1LjE5OCAyLjQwNyAwIDQuNzE1LS45NTYgNi40MTYtMi42NThzMi42NTgtNC4wMSAyLjY1OC02LjQxNi0uOTU2LTQuNzE1LTIuNjU4LTYuNDE2LTQuMDEtMi42NTgtNi40MTYtMi42NTh6bS03My41MzQgMzMuMjJsLTUuMDgxIDUuMjU3Yy0uNjQzLS4xNDItMS4yOTktLjIxNC0xLjk1Ny0uMjE0LTIuNDA3IDAtNC43MTUuOTU2LTYuNDE2IDIuNjU4UzAgNjcuMzcxIDAgNjkuNzc3cy45NTYgNC43MTUgMi42NTggNi40MTYgNC4wMSAyLjY1OCA2LjQxNiAyLjY1OCA0LjcxNS0uOTU2IDYuNDE2LTIuNjU4IDIuNjU4LTQuMDEgMi42NTgtNi40MTZjMC0uNTYxLS4wNTItMS4xMjEtLjE1Ni0xLjY3Mmw1LjMxLTUuNDkyem00NC4yMjMgMjEuNzZsLTYuODkzIDcuMjQ0IDUuNTE1IDUuMjQ5Yy0uMjE0Ljc3Ny0uMzIzIDEuNTc4LS4zMjUgMi4zODQgMCAyLjQwNy45NTYgNC43MTUgMi42NTggNi40MTZzNC4wMSAyLjY1OCA2LjQxNiAyLjY1OCA0LjcxNS0uOTU2IDYuNDE2LTIuNjU4IDIuNjU4LTQuMDEgMi42NTgtNi40MTYtLjk1Ni00LjcxNS0yLjY1OC02LjQxNi00LjAxLTIuNjU4LTYuNDE2LTIuNjU4Yy0uMzk3LjAwMi0uNzk0LjAyOS0xLjE4Ny4wODN6Ii8+JiN4YTs8L3N2Zz4=;', 
		    		s * 42, s * 42, 'Anthos Service\nMesh', null, null, null, this.getTagsForStencil(gn, '', dt + 'anthos service mesh').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjQyNCIgaGVpZ2h0PSI0MjQiIHZpZXdCb3g9IjAgMCA0MjQgNDI0Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQgMHY0MjRIMFYwek0yMTIgOTcuODQ2Yy0zNy44ODQgMC03MC4xNjQgMjMuOTktODIuNDc4IDU3LjYwOGgwbC0zLjQwMy4wMDFjLTQyLjYzNCAwLTc3LjE5NiAzNC41NjItNzcuMTk2IDc3LjE5NnMzNC41NjIgNzcuMTk2IDc3LjE5NiA3Ny4xOTZoMCAxNzEuNzYzYzQyLjYzNCAwIDc3LjE5Ni0zNC41NjIgNzcuMTk2LTc3LjE5NnMtMzQuNTYyLTc3LjE5Ni03Ny4xOTYtNzcuMTk2aDBsLTMuNDAzLS4wMDFDMjgyLjE2NCAxMjEuODM3IDI0OS44ODQgOTcuODQ2IDIxMiA5Ny44NDZ6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOzwvc3ZnPg==;', 
		    		s * 42, s * 42, 'Cloud\nConsole', null, null, null, this.getTagsForStencil(gn, '', dt + 'cloud console').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE2LjEyMDAwMDgzOTIzMzQiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAxNi4xMjAwMDA4MzkyMzM0IDIwIj4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qxe2ZpbGw6IzY2OWRmNjt9JiN4YTsJLnN0MntmaWxsOiNhZWNiZmE7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTEyLjEyIDJ2MmgydjJoMlYyek0wIDZoMi4xMlY0aDJWMmgtNHY0eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xNi4xMiA2VjJsLTIgMnYyem0tMiAzbC04IDExVjl6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTYuMTIgOC4xMmw0IDIuODgtNCA1LjAzeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xMC4xMiAwdjExaC04eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMi4xMiAxNmgydi0yaDJ2NGgtNHoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMi4xMiAxNnYtMmgtMnY0aDQuMTMtLjEzdi0yeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0yLjEyIDE2di0yaC0ydjR6Ii8+JiN4YTs8L3N2Zz4=;', 
		    		s * 34, s * 42, 'Debugger', null, null, null, this.getTagsForStencil(gn, '', dt + 'debugger').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjQxNiIgaGVpZ2h0PSIzNjIuMjAwMDEyMjA3MDMxMjUiIHZpZXdCb3g9IjAgMCA0MTYgMzYyLjIwMDAxMjIwNzAzMTI1Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qxe2ZpbGw6IzY2OWRmNjt9JiN4YTsJLnN0MntmaWxsOiNhZWNiZmE7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTk2LjAzIDBMMCAxNjcuMTdoMTkwLjY3TDI4Ny45NCAweiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yODcuNTkgMzYyLjJsLTk1LjY4LTE2Ny4xN0gwTDk1LjY4IDM2Mi4yeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik00MTYgMTgxLjFMMzIwIDEzLjMxIDIyMy44OCAxODEuMSAzMjAgMzQ4Ljl6Ii8+JiN4YTs8L3N2Zz4=;', 
		    		s * 42, s * 36, 'Stackdriver', null, null, null, this.getTagsForStencil(gn, '', dt + 'stackdriver').join(' '))
	 	];
		
		this.addPalette('gcp2Icons Operations', 'GCP Icons / Operations', false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addGCP2IconsNetworkingPalette = function()
	{
		var sb = this;
		var s = 1;
		var n = 'sketch=0;html=1;verticalAlign=top;labelPosition=center;verticalLabelPosition=bottom;align=center;spacingTop=-6;fontSize=11;fontStyle=1;fontColor=#999999;shape=image;aspect=fixed;imageAspect=0;';
		var dt = 'gcp google cloud platform icons icon networking ';
		var gn = 'mxgraph.gcp2';
		var fns = [];
		
		var fns = [
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE2LjUwMDQzNDg3NTQ4ODI4IiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSItMC4wMDAzNjMwODkyNjA2NDUyMTA3NCAxLjE5MjA5Mjg5NTUwNzgxMjVlLTcgMTYuNTAwNDM0ODc1NDg4MjggMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM2NjlkZjY7fSYjeGE7CS5zdDF7ZmlsbDojYWVjYmZhO30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xMC40MiAxMi4wN2wxLjA0IDEuMDUtNS40NSA1LjQ4LTEuMDQtMS4wNXptLS44My00LjE5bDEuMDQgMS4wNS03LjM1IDcuMzktMS4wNC0xLjA1em0tNC4xNi0uODVsMS4wNCAxLjA1LTQuODggNC45LTEuMDQtMS4wNXoiLz4mI3hhOwk8ZyBjbGFzcz0ic3QwIj4mI3hhOwkJPHBhdGggZD0iTTguMjUgMS42MWw2Ljc4IDN2NC41NWE5LjcxIDkuNzEgMCAwIDEtNi43OCA5LjMyIDkuNyA5LjcgMCAwIDEtNi43OC05LjMxVjQuNjNsNi43OC0zbTAtMS42M0wwIDMuNjh2NS40OUExMS4xNyAxMS4xNyAwIDAgMCA4LjEgMjBoLjE1LjE1YTExLjE3IDExLjE3IDAgMCAwIDguMS0xMC43OFYzLjY4eiIvPiYjeGE7CQk8Y2lyY2xlIGN4PSIxMC45NCIgY3k9IjEyLjYyIiByPSIxLjQyIi8+JiN4YTsJCTxjaXJjbGUgY3g9IjEwLjEiIGN5PSI4LjQ1IiByPSIxLjQyIi8+JiN4YTsJCTxjaXJjbGUgY3g9IjUuOTQiIGN5PSI3LjYiIHI9IjEuNDIiLz4mI3hhOwk8L2c+JiN4YTs8L3N2Zz4=;', 
		    		s * 36, s * 42, 'Cloud\nArmor', null, null, null, this.getTagsForStencil(gn, '', dt + 'cloud armor').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTMuMTMgNS42M1YzLjIxTDEwIDB2Mi40MXptMy43NSA3LjVMMjAgMTBoLTIuNWwtMy4xMiAzLjEzem0tMTMuNzUgMEwwIDEwaDIuNWwzLjEzIDMuMTN6bTEwIDEuMjV2Mi40MUwxMCAyMHYtMi40MXoiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik02Ljg4IDUuNjNMMTAgMi40MVYwTDYuODggMy4yMXpNMTcuNSAxMEgyMGwtMy4xMi0zLjEyaC0yLjV6bS0xNSAwSDBsMy4xMy0zLjEyaDIuNXptNC4zOCA0LjM4TDEwIDE3LjU5VjIwbC0zLjEyLTMuMjF6bTAtNy41aDYuMjV2Ni4yNUg2Ljg4eiIgZmlsbC1ydWxlPSJldmVub2RkIi8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTYuODggMTMuMTNsNi4yNS02LjI1djYuMjV6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTAgMTBsMy4xMy0zLjEydjYuMjV6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOzwvc3ZnPg==;', 
		    		s * 42, s * 42, 'Cloud\nCDN', null, null, null, this.getTagsForStencil(gn, '', dt + 'cloud cdn content domain network').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJLnN0M3tmaWxsOiNmZmY7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTkgNmgydjEwSDl6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTIwIDE3SDB2MmgyMHoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMTIgMTZIOHY0aDR6TTAgMGgyMHY2SDB6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTEwIDBoMTB2NkgxMHoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QzIiBkPSJNMiAyaDJ2MkgyeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0wIDhoMjB2NkgweiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xMCA4aDEwdjZIMTB6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MyIgZD0iTTIgMTBoMnYySDJ6Ii8+JiN4YTs8L3N2Zz4=;', 
		    		s * 42, s * 42, 'Cloud\nDNS', null, null, null, this.getTagsForStencil(gn, '', dt + 'cloud dns domain name server').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE5Ljk5OTk5ODA5MjY1MTM2NyIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAtMi44NDIxNzA1NjE4NzU1NzQ1ZS0xNSAxOS45OTk5OTgwOTI2NTEzNjcgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xNS40OSAxMC40djYuN2EuNC40IDAgMCAxLS40LjRIMi45YS40LjQgMCAwIDEtLjQtLjRWNC45YS40LjQgMCAwIDEgLjQtLjRoNi43YS40LjQgMCAwIDAgLjQtLjRWMi40YS40LjQgMCAwIDAtLjQtLjRILjRhLjQuNCAwIDAgMC0uNC40djE3LjJhLjQuNCAwIDAgMCAuNC40aDE3LjJhLjQuNCAwIDAgMCAuNC0uNHYtOS4yYS40LjQgMCAwIDAtLjQtLjRoLTEuNzFhLjQuNCAwIDAgMC0uNC40eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMiAuNHY3LjJhLjQuNCAwIDAgMCAuNC40aDcuMmEuNC40IDAgMCAwIC40LS40Vi40YS40LjQgMCAwIDAtLjQtLjRoLTcuMmEuNC40IDAgMCAwLS40LjR6bTUuNiA0LjFoLTEuNzFhLjQuNCAwIDAgMS0uNC0uNFYyLjRhLjQuNCAwIDAgMSAuNC0uNGgxLjcxYS40LjQgMCAwIDEgLjQuNHYxLjdhLjQuNCAwIDAgMS0uNC40eiIvPiYjeGE7PC9zdmc+;', 
		    		s * 42, s * 42, 'Cloud External\nIP Addresses', null, null, null, this.getTagsForStencil(gn, '', dt + 'cloud external ip addresses internet protocol').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjNDI4NWY0IiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTAgMGg4Ljg5djIuMjJIMHptMCAxNy43OGg4Ljg5VjIwSDB6bTAtOC44OWg4Ljg5djIuMjJIMHpNMTEuMTEgMEgyMHYyLjIyaC04Ljg5em0wIDE3Ljc4SDIwVjIwaC04Ljg5em0wLTguODlIMjB2Mi4yMmgtOC44OXpNNS41NSA0LjQ0aDguODl2Mi4yMkg1LjU1em0wIDguODloOC44OXYyLjIySDUuNTV6TTAgNC40NGgzLjMzdjIuMjJIMHptMCA4Ljg5aDMuMzN2Mi4yMkgwem0xNi42Ny04Ljg5SDIwdjIuMjJoLTMuMzN6bTAgOC44OUgyMHYyLjIyaC0zLjMzeiIvPiYjeGE7PC9zdmc+;', 
		    		s * 42, s * 42, 'Cloud Firewall\nRules', null, null, null, this.getTagsForStencil(gn, '', dt + 'cloud firewall rules').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE4IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHZpZXdCb3g9IjAgMCAyMCAxOCI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJLnN0MXtmaWxsOiM2NjlkZjY7fSYjeGE7CS5zdDJ7ZmlsbDojYWVjYmZhO30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00IDhIMHYyaDR6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTMgNGgxMHYxMEgzeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yMCA4aC00LjY3djJIMjB6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTE1IDJ2MTRINnYyaDExdi0yVjIgMEg2djJ6TTggNGg1djEwSDh6Ii8+JiN4YTs8L3N2Zz4=;', 
		    		s * 42, s * 38, 'Cloud\nInterconnect', null, null, null, this.getTagsForStencil(gn, '', dt + 'cloud interconnect').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTYgMTBoMnY0aC0yem0tNyAwaDJ2NEg5em0tNyAwaDJ2NEgyeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik05IDVoMnY0SDl6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTIgOWgxNnYySDJ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTQgMGgxMnY1SDR6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTEwIDBoNnY1aC02eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xNCAxNGg2djZoLTZ6TTAgMTRoNnY2SDB6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTMgMTRoM3Y2SDN6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTcgMTRoNnY2SDd6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTEwIDE0aDN2NmgtM3ptNyAwaDN2NmgtM3oiLz4mI3hhOzwvc3ZnPg==;', 
		    		s * 42, s * 42, 'Cloud Load\nBalancing', null, null, null, this.getTagsForStencil(gn, '', dt + 'cloud load balancing').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5OS45OTczMDIyMDQ4OTI5NiIgaGVpZ2h0PSI5Ny44ODA4NTM5MDQyOTYzMyIgdmlld0JveD0iLTAuMDQ1Nzc2MzY3MTg3NSAxLjA4Nzc4ODU4MTg0ODE0NDUgOTkuOTk3Mjk5MTk0MzM1OTQgOTcuODgwODQ0MTE2MjEwOTQiIHZlcnNpb249IjEuMSIgaWQ9InN2ZzUiIGlua3NjYXBlOnZlcnNpb249IjEuMSAoYzY4ZTIyYzM4NywgMjAyMS0wNS0yMykiIHNvZGlwb2RpOmRvY25hbWU9ImNsb3VkX25hdC5zdmciPiYjeGE7ICA8c29kaXBvZGk6bmFtZWR2aWV3IGlkPSJuYW1lZHZpZXc3IiBwYWdlY29sb3I9IiNmZmZmZmYiIGJvcmRlcmNvbG9yPSIjNjY2NjY2IiBib3JkZXJvcGFjaXR5PSIxLjAiIGlua3NjYXBlOnBhZ2VzaGFkb3c9IjIiIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwLjAiIGlua3NjYXBlOnBhZ2VjaGVja2VyYm9hcmQ9IjAiIGlua3NjYXBlOmRvY3VtZW50LXVuaXRzPSJtbSIgc2hvd2dyaWQ9ImZhbHNlIiBpbmtzY2FwZTp6b29tPSIwLjU3OTMzNzQ0IiBpbmtzY2FwZTpjeD0iLTQyLjI4OTY4OSIgaW5rc2NhcGU6Y3k9IjI1NC42MDExOSIgaW5rc2NhcGU6d2luZG93LXdpZHRoPSIxOTIwIiBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSIxMDE3IiBpbmtzY2FwZTp3aW5kb3cteD0iLTgiIGlua3NjYXBlOndpbmRvdy15PSItOCIgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMSIgaW5rc2NhcGU6Y3VycmVudC1sYXllcj0ibGF5ZXIxIiBmaXQtbWFyZ2luLXRvcD0iMCIgZml0LW1hcmdpbi1sZWZ0PSIwIiBmaXQtbWFyZ2luLXJpZ2h0PSIwIiBmaXQtbWFyZ2luLWJvdHRvbT0iMCIvPiYjeGE7ICA8ZGVmcyBpZD0iZGVmczIiLz4mI3hhOyAgPGcgaW5rc2NhcGU6bGFiZWw9IkxheWVyIDEiIGlua3NjYXBlOmdyb3VwbW9kZT0ibGF5ZXIiIGlkPSJsYXllcjEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI1OC42MTk3NSwxNi42Njc3MTUpIj4mI3hhOyAgICA8cGF0aCBpZD0icGF0aDE3MzYyIiBzdHlsZT0ib3BhY2l0eToxO2ZpbGw6IzQyODVmNDtmaWxsLW9wYWNpdHk6MTtzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MC45OTk5OTlweDtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2Utb3BhY2l0eToxIiBkPSJNIDE0MS40MTc5Nyw0LjExMTMyODEgMTI0LjQwMjM0LDI0LjM3NSBjIDU3Ljg5NTM3LDQ4LjYxNjQyNiA4My40MTQwNyw5Ni4wNjQ2NyA4My40MTQwNywxNjMuOTQzMzYgMCw3Mi4zMTIyOCAtMzYuMTA3MzEsMTI0LjgyOTc3IC04Mi4wMTk1MywxNjYuMDQ4ODMgbCAxNy42Nzk2OCwxOS42ODc1IGMgNDkuMjAyOTksLTQ0LjE3MzQyIDkwLjc5Njg4LC0xMDQuNDk4MzcgOTAuNzk2ODgsLTE4NS43MzYzMyAwLC03NC44ODE1MiAtMzEuMTU5NDEsLTEzMi4zOTkwMjIgLTkyLjg1NTQ3LC0xODQuMjA3MDMxOSB6IE0gOTYuNTU2NjQxLDc1Ljg4NDc2NiBWIDEwMi4zNDE4IEggMTY2LjQ4MzA1IEMgMTYyLjM5Mjc0LDk0LjU1NDQyIDE1OC40NTE0Myw4Ni44NDE1NDIgMTQ4LjAyMjMzLDc1Ljg4NDc2NiBaIE0gMzE3Ljc3OTMsMjAyLjMwNjY0IHYgMzIuMjkyOTcgbCA1OS45OTAyMywtNDUuNTE3NTggLTU5Ljk5MDIzLC00NS41MTc1OCB2IDMyLjI4NTE2IGggLTY0LjQ3NDYxIHYgMjYuNDU3MDMgeiBNIDUwLjA1ODU5NCwxNzUuODQ5NjEgdiAyNi40NTcwMyBIIDE4Ny4yODEyNSBjIDEuMTU3NDUsLTguMDQ3MzcgMS4yODIzMSwtMTYuNzgzMTUgMCwtMjYuNDU3MDMgeiBtIDQ3LjAzNzEwOSwxMDAuMDQ2ODcgdiAyNi40NTcwNCBoIDUwLjY4MjY3NyBjIDguMDE2NTcsLTguMDE0NjYgMTQuNDYxNjksLTE2LjgxNTA0IDE5LjIyMzU3LC0yNi40NTcwNCB6IiB0cmFuc2Zvcm09Im1hdHJpeCgwLjI2NDU4MzMzLDAsMCwwLjI2NDU4MzMzLC0yNTguNjE5NzUsLTE2LjY2NzcxNSkiIHNvZGlwb2RpOm5vZGV0eXBlcz0iY2NzY2NzY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjIi8+JiN4YTsgICAgPHBhdGggaWQ9InBhdGgxNjI3MS03IiBzdHlsZT0iY29sb3I6IzAwMDAwMDtvcGFjaXR5OjE7ZmlsbDojNjY5ZGY2O3N0cm9rZS1saW5lam9pbjpyb3VuZDstaW5rc2NhcGUtc3Ryb2tlOm5vbmU7ZmlsbC1vcGFjaXR5OjEiIGQ9Im0gLTIzNy45NTQwOCw1MS45MDU2ODYgYyAtNC4zNDYzLDEwZS03IC03LjkyMzgyLDMuNTc3NTIxIC03LjkyMzgyLDcuOTIzODI4IDAsNC4zNDYzMDcgMy41Nzc1Miw3LjkyMzgyOCA3LjkyMzgyLDcuOTIzODI4IDQuMzQ2MzEsMCA3LjkyMzgzLC0zLjU3NzUyMSA3LjkyMzgzLC03LjkyMzgyOCAwLC00LjM0NjMwNyAtMy41Nzc1MiwtNy45MjM4MjcgLTcuOTIzODMsLTcuOTIzODI4IHogbSAwLDUgYyAxLjY0NDExLDAgMi45MjM4MywxLjI3OTcxOCAyLjkyMzgzLDIuOTIzODI4IDAsMS42NDQxMSAtMS4yNzk3MiwyLjkyMzgyOCAtMi45MjM4MywyLjkyMzgyOCAtMS42NDQxMSwwIC0yLjkyMzgyLC0xLjI3OTcxOCAtMi45MjM4MiwtMi45MjM4MjggMCwtMS42NDQxMSAxLjI3OTcxLC0yLjkyMzgyOCAyLjkyMzgyLC0yLjkyMzgyOCB6IG0gLTEyLjc4NzYxLC0zMS40ODg1OTMgYyAtNC4zNDYzLDEwZS03IC03LjkyMzgyLDMuNTc3NTIxIC03LjkyMzgyLDcuOTIzODI4IDAsNC4zNDYzMDcgMy41Nzc1Miw3LjkyMzgyOCA3LjkyMzgyLDcuOTIzODI4IDQuMzQ2MzEsMCA3LjkyMzgzLC0zLjU3NzUyMSA3LjkyMzgzLC03LjkyMzgyOCAwLC00LjM0NjMwNyAtMy41Nzc1MiwtNy45MjM4MjcgLTcuOTIzODMsLTcuOTIzODI4IHogbSAwLDUgYyAxLjY0NDExLDAgMi45MjM4MywxLjI3OTcxOCAyLjkyMzgzLDIuOTIzODI4IDAsMS42NDQxMSAtMS4yNzk3MiwyLjkyMzgyOCAtMi45MjM4MywyLjkyMzgyOCAtMS42NDQxMSwwIC0yLjkyMzgyLC0xLjI3OTcxOCAtMi45MjM4MiwtMi45MjM4MjggMCwtMS42NDQxMSAxLjI3OTcxLC0yLjkyMzgyOCAyLjkyMzgyLC0yLjkyMzgyOCB6IG0gMTIuNjE2NTIsLTMxLjQzMTQ5MjkgYyAtNC4zNDYzLDZlLTcgLTcuOTIzODIsMy41Nzc1MjA4IC03LjkyMzgyLDcuOTIzODI4MSAwLDQuMzQ2MzA2OCAzLjU3NzUyLDcuOTIzODI3OCA3LjkyMzgyLDcuOTIzODI3OCA0LjM0NjMxLDAgNy45MjM4MywtMy41Nzc1MjEgNy45MjM4MywtNy45MjM4Mjc4IDAsLTQuMzQ2MzA3MyAtMy41Nzc1MiwtNy45MjM4Mjc1IC03LjkyMzgzLC03LjkyMzgyODEgeiBtIDAsNSBjIDEuNjQ0MTEsMmUtNyAyLjkyMzgzLDEuMjc5NzE4NCAyLjkyMzgzLDIuOTIzODI4MSAwLDEuNjQ0MTA5NiAtMS4yNzk3MiwyLjkyMzgyNzkgLTIuOTIzODMsMi45MjM4Mjc5IC0xLjY0NDExLDAgLTIuOTIzODIsLTEuMjc5NzE4MyAtMi45MjM4MiwtMi45MjM4Mjc5IDAsLTEuNjQ0MTA5NyAxLjI3OTcxLC0yLjkyMzgyNzkgMi45MjM4MiwtMi45MjM4MjgxIHoiLz4mI3hhOyAgPC9nPiYjeGE7PC9zdmc+;', 
		    		s * 42, s * 42, 'Cloud\nNAT', null, null, null, this.getTagsForStencil(gn, '', dt + 'cloud nat').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE4Ljc1OTk5ODMyMTUzMzIwMyIgdmlld0JveD0iMCAwIDIwIDE4Ljc1OTk5ODMyMTUzMzIwMyI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJLnN0MXtmaWxsOiM2NjlkZjY7fSYjeGE7CS5zdDJ7ZmlsbDojYWVjYmZhO30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xMC42MiAxNi40NUw0LjMgMTAuMzFsLTEuMzYuNzcgNi41OSA2LjUyem01LjA3LTcuNjNsMS43OC0uMzgtNi45LTdMOS40OCAyLjZ6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNOS4zOCAyLjUxaDEuMjV2NUg5LjM4em0wIDkuMzdoMS4yNXY1SDkuMzh6Ii8+JiN4YTsJPGcgY2xhc3M9InN0MiI+JiN4YTsJCTxjaXJjbGUgY3g9IjEwIiBjeT0iMS44OCIgcj0iMS44OCIvPiYjeGE7CQk8Y2lyY2xlIGN4PSIxMCIgY3k9IjE2Ljg4IiByPSIxLjg4Ii8+JiN4YTsJPC9nPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xOS4zNyAxMC42M0g0LjNMLjY2IDguNzZoMTUuMDd6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOwk8ZyBjbGFzcz0ic3QyIj4mI3hhOwkJPGNpcmNsZSBjeD0iMi41IiBjeT0iOS42OSIgcj0iMi41Ii8+JiN4YTsJCTxjaXJjbGUgY3g9IjE3LjUiIGN5PSI5LjY5IiByPSIyLjUiLz4mI3hhOwk8L2c+JiN4YTs8L3N2Zz4=;', 
		    		s * 42, s * 40, 'Cloud\nNetwork', null, null, null, this.getTagsForStencil(gn, '', dt + 'cloud network').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE5LjI5OTk5OTIzNzA2MDU0NyIgdmlld0JveD0iMCAwIDIwIDE5LjI5OTk5OTIzNzA2MDU0NyI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJLnN0MXtmaWxsOiM2NjlkZjY7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTIuNDMgNi4xSDBWMi42N2gzLjk0bDguNCAxMC40OWgyLjM0di0yLjcyTDIwIDE0Ljg3bC01LjMyIDQuNDN2LTIuNzFoLTMuODd6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTE0LjY4IDYuMTR2Mi43MkwyMCA0LjQzIDE0LjY4IDB2Mi43MWgtMy44N0w4LjMzIDUuODJsMi4xMyAyLjY3IDEuODgtMi4zNXpNMCAxMy4ydjMuNDNoMy45NGwyLjUyLTMuMTUtMi4xMy0yLjY3LTEuOSAyLjM5eiIvPiYjeGE7PC9zdmc+;', 
		    		s * 42, s * 40, 'Cloud\nRoutes', null, null, null, this.getTagsForStencil(gn, '', dt + 'cloud routes').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTE3IDEydjNsLTUtNSA1LTV2M2gzdjR6TTMgOEgwdjRoM3YzbDUtNS01LTV6bTkgN3YtM0g4djNINWw1IDUgNS01em0wLTEwdjNIOFY1SDVsNS01IDUgNXoiLz4mI3hhOzwvc3ZnPg==;', 
		    		s * 42, s * 42, 'Cloud\nRouter', null, null, null, this.getTagsForStencil(gn, '', dt + 'cloud router').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE3Ljk1MDAwMDc2MjkzOTQ1MyIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDE3Ljk1MDAwMDc2MjkzOTQ1MyAyMCI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJLnN0MXtmaWxsOiM2NjlkZjY7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPGcgY2xhc3M9InN0MSI+JiN4YTsJCTxwYXRoIGQ9Ik0xMS43IDkuMjhoNC4xOHYxLjM4SDExLjd6Ii8+JiN4YTsJCTxwYXRoIGQ9Ik0xNC45MiA0LjEyaDEuMzh2MTEuNzFoLTEuMzh6Ii8+JiN4YTsJPC9nPiYjeGE7CTxnIGNsYXNzPSJzdDAiPiYjeGE7CQk8cmVjdCB4PSIxMy4yNyIgeT0iMTUuMzIiIHdpZHRoPSI0LjY4IiBoZWlnaHQ9IjQuNjgiIHJ4PSIuMjgiLz4mI3hhOwkJPHJlY3QgeD0iMTMuMjciIHdpZHRoPSI0LjY4IiBoZWlnaHQ9IjQuNjgiIHJ4PSIuMjgiLz4mI3hhOwk8L2c+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTMuOTUgOS4yOGg0LjI4djEuMzhIMy45NXoiLz4mI3hhOwk8ZyBjbGFzcz0ic3QwIj4mI3hhOwkJPHJlY3QgeT0iNy42MyIgd2lkdGg9IjQuNjgiIGhlaWdodD0iNC42OCIgcng9Ii4yOCIvPiYjeGE7CQk8cGF0aCBkPSJNOS45NyAxMi4xN2EyLjIgMi4yIDAgMSAxIDAtNC40IDIuMiAyLjIgMCAwIDEgMi4yIDIuMiAyLjE5IDIuMTkgMCAwIDEtMi4yIDIuMnptMC0zLjU3YTEuMzggMS4zOCAwIDAgMC0xLjA1IDIuMzNBMS4zOCAxLjM4IDAgMCAwIDExLjMgMTBhMS4zNyAxLjM3IDAgMCAwLTEuMzMtMS40eiIvPiYjeGE7CTwvZz4mI3hhOzwvc3ZnPg==;', 
		    		s * 42, s * 42, 'Cloud\nVPN', null, null, null, this.getTagsForStencil(gn, '', dt + 'cloud vpn virtual private network').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjEzLjUxOTk5OTUwNDA4OTM1NSIgdmlld0JveD0iMCAtMi4wNjA1NzM0NTA4OTU1MTA2ZS0xNSAyMCAxMy41MTk5OTk1MDQwODkzNTUiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNOS4xOSAxLjYyaDEuNjJ2MTAuMjdIOS4xOXoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMCA1Ljk1aDIuN3YxLjYySDB6Ii8+JiN4YTsJPHJlY3QgY2xhc3M9InN0MCIgeD0iMi40MyIgeT0iMy41MiIgd2lkdGg9IjQuODYiIGhlaWdodD0iNi40OSIgcng9Ii4yNCIvPiYjeGE7CTxnIGNsYXNzPSJzdDEiPiYjeGE7CQk8cGF0aCBkPSJNOS4xOSAxLjYyaDEuNjJ2MTAuMjdIOS4xOXptOC4xMSA0LjMzSDIwdjEuNjJoLTIuN3oiLz4mI3hhOwkJPHBhdGggZD0iTTQuNTkgMTEuOXYxLjMzYS4yOS4yOSAwIDAgMCAuMjkuMjloMTAuMjRhLjI5LjI5IDAgMCAwIC4yOS0uMjloMFYxMS45ek0xNS4xMiAwSDQuODhhLjI5LjI5IDAgMCAwLS4yOS4yOWgwdjEuMzNoMTAuODJWLjI5YS4yOS4yOSAwIDAgMC0uMjktLjI5eiIvPiYjeGE7CTwvZz4mI3hhOwk8cmVjdCBjbGFzcz0ic3QwIiB4PSIxMi43IiB5PSIzLjUyIiB3aWR0aD0iNC44NiIgaGVpZ2h0PSI2LjQ5IiByeD0iLjI0Ii8+JiN4YTs8L3N2Zz4=;', 
		    		s * 42, s * 29, 'Partner\nInterconnect', null, null, null, this.getTagsForStencil(gn, '', dt + 'partner interconnect').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwLjAyODAxODk1MTQxNjAxNiIgaGVpZ2h0PSIxMC4wMTk3MzA1Njc5MzIxMjkiIHZpZXdCb3g9Ii0wLjAwMDAxOTc3MjAwNTU0MzkyNzY2MiAwIDIwLjAyODAxODk1MTQxNjAxNiAxMC4wMTk3MzA1Njc5MzIxMjkiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTYuMjU4IDIuMjRBOS42MSA5LjYxIDAgMCAwIDEwLjEwOCAwQzUuMjY4IDAgMS4xMzggMy42NS4wMjggOC45YS44MS44MSAwIDEgMCAxLjU4LjM1aDBjLjk1LTQuNTEgNC40Mi03LjY1IDguNS03LjY1YTcuODYgNy44NiAwIDAgMSA0LjQ1IDEuNHptLjQ0IDEuMjlsLTUuODggMi42M2gwYTIgMiAwIDEgMCAxLjEzIDIuNTggMS44MyAxLjgzIDAgMCAwIC4xMi0uNDYuMS4xIDAgMCAwIC4wNSAwbDUtNGMuNTktLjU0LjI3LTEuMDYtLjQyLS43NXoiLz4mI3hhOwk8Y2lyY2xlIGNsYXNzPSJzdDEiIGN4PSIxOC4wNjgiIGN5PSI1Ljk5IiByPSIuODQiLz4mI3hhOwk8Y2lyY2xlIGNsYXNzPSJzdDIiIGN4PSIxOS4xODgiIGN5PSI5LjA0IiByPSIuODQiLz4mI3hhOzwvc3ZnPg==;', 
		    		s * 42, s * 21, 'Premium\nNetwork Tier', null, null, null, this.getTagsForStencil(gn, '', dt + 'premium network tier').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjQyNC4wMDEwMzc1OTc2NTYyNSIgaGVpZ2h0PSIyMTMuOTk4Mzk3ODI3MTQ4NDQiIHZpZXdCb3g9Ii0wLjAwMDAyMDQ4Mjg0MTEzNjk4MTczMyAwIDQyNC4wMDEwMzc1OTc2NTYyNSAyMTMuOTk4Mzk3ODI3MTQ4NDQiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTk5LjQzMSA0Ni44NTRsLjM3NC4yODkgMTA1Ljc1OCA4My4yMDhhNDIuMDggNDIuMDggMCAwIDEgNC43MTUtLjM4OWwuNzg5LS4wMTNjMTcuNDExLS4wMDQgMzMuMDE4IDEwLjc1OCAzOS4yMjMgMjcuMDQ5czEuNzIxIDM0LjcyNS0xMS4yNzEgNDYuMzMzYTQxLjkzIDQxLjkzIDAgMCAxLTQ3LjI1MyA1Ljk1NiA0Mi4wNCA0Mi4wNCAwIDAgMS0yMi40NDQtNDEuNTcxbC4wNTYtLjUxOS0uMDI2LS4wM0w4Ny43IDU4Ljk3NmMtOS40ODEtMTIuNTYyLS41NzUtMjEuNDg2IDExLjczLTEyLjEyM3ptMzA2LjgzOCAxMjcuNzI2YzkuNzkzIDAgMTcuNzMyIDcuOTQ5IDE3LjczMiAxNy43NTVzLTcuOTM5IDE3Ljc1NS0xNy43MzIgMTcuNzU1LTE3LjczMi03Ljk0OS0xNy43MzItMTcuNzU1IDcuOTM5LTE3Ljc1NSAxNy43MzItMTcuNzU1ek02MC4yNDEgNjguNzk3bDIwLjQyMyAyOC4zMmEyMTcuMTYgMjE3LjE2IDAgMCAwLTQ2LjkyIDk3LjM5OSAxNy4wNCAxNy4wNCAwIDAgMS0xMS4yODggMTIuOTYxYy01LjgyMyAxLjk2NC0xMi4yNTEuNjMzLTE2LjgxOS0zLjQ4MmExNy4wNiAxNy4wNiAwIDAgMS01LjIyOS0xNi4zOGM4LjgxNy00NC4zMDUgMjkuNDk5LTg1LjM3NiA1OS44MzMtMTE4LjgxN3ptMzIyLjc2MiA0MS4zMDhjOS43OTMgMCAxNy43MzIgNy45NDkgMTcuNzMyIDE3Ljc1NXMtNy45MzkgMTcuNzU1LTE3LjczMiAxNy43NTUtMTcuNzMyLTcuOTQ5LTE3LjczMi0xNy43NTUgNy45MzktMTcuNzU1IDE3LjczMi0xNy43NTV6bS00MS42MjgtNTUuMDk0YzkuNzkzIDAgMTcuNzMyIDcuOTQ5IDE3LjczMiAxNy43NTVzLTcuOTM5IDE3Ljc1NS0xNy43MzIgMTcuNzU1LTE3LjczMi03Ljk0OS0xNy43MzItMTcuNzU1IDcuOTM5LTE3Ljc1NSAxNy43MzItMTcuNzU1em0tNTcuNzkyLTM4Ljk3OWM5Ljc5MyAwIDE3LjczMiA3Ljk0OSAxNy43MzIgMTcuNzU1cy03LjkzOSAxNy43NTUtMTcuNzMyIDE3Ljc1NS0xNy43MzItNy45NDktMTcuNzMyLTE3Ljc1NSA3LjkzOS0xNy43NTUgMTcuNzMyLTE3Ljc1NXptLTEzMy4wNzQtNC4zMjdjOS43OTMgMCAxNy43MzIgNy45NDkgMTcuNzMyIDE3Ljc1NXMtNy45MzkgMTcuNzU1LTE3LjczMiAxNy43NTUtMTcuNzMyLTcuOTQ5LTE3LjczMi0xNy43NTUgNy45MzktMTcuNzU1IDE3LjczMi0xNy43NTV6TTIxNy4zNTcgMGM5Ljc5MyAwIDE3LjczMiA3Ljk0OSAxNy43MzIgMTcuNzU1UzIyNy4xNSAzNS41MSAyMTcuMzU3IDM1LjUxcy0xNy43MzItNy45NDktMTcuNzMyLTE3Ljc1NVMyMDcuNTY0IDAgMjE3LjM1NyAweiIgZmlsbD0iIzQyODVmNCIvPiYjeGE7PC9zdmc+;', 
		    		s * 42, s * 21, 'Standard\nNetwork Tier', null, null, null, this.getTagsForStencil(gn, '', dt + 'standard network tier').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjM3OC45OTYwMDM2OTA5NDU4IiBoZWlnaHQ9IjM3My40ODg4MDkyODIxODgyNCIgdmlld0JveD0iMCAwIDEwMC4yNzYwMDA5NzY1NjI1IDk4LjgxOTAwNzg3MzUzNTE2Ij4mI3hhOzxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTs8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xNC42MTQgMjQuNzc1TDAgMzQuNzA5bDE0LjYxNCA5LjkzM1YzOS45NWMzLjU0NSAxLjQwMyA3LjcwNCAzLjY1OSAxMS4yMjYgNi44NDggNS4yMjQgNC43MyA5LjIzNSAxMS4yIDkuMjM1IDIwLjk2NXYxMS41MzJoMTBWNjcuNzYyYzAtMTIuNjQ0LTUuNjcxLTIyLjE3NS0xMi41MjMtMjguMzc5LTUuOTI5LTUuMzY4LTEyLjU5Mi04LjQ3LTE3LjkzNy0xMC4wMjR6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTU0Ljg4NiAxOC41NTR2NjYuMDIxaC00LjUzNWwxMC4xOSAxNC4yNDQgMTAuMTktMTQuMjQ0aC01Ljg0NlYxOC41NTR6TTM5Ljk2MSAwbC05LjcwNSAxMy45NThoNC44MTl2NjUuMzM2aDEwVjEzLjk1N2g0LjU5MXoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNNTQuODg2IDE4LjU1NHYxMi45YzAgMTMuNDY0IDYuNzE5IDIzLjE0OCAxNC4wNTIgMjkuMTI1IDUuOTI1IDQuODI5IDEyLjE0NiA3LjUxIDE2LjQxNCA4Ljg3NnY0LjcyMmwxNC45MjQtOS41NzEtMTQuOTI0LTkuNTcxdjMuNzI1Yy0zLjA0My0xLjI3OC02Ljc3LTMuMjIxLTEwLjA5OC01LjkzMy01LjY5OC00LjY0NC0xMC4zNjktMTEuMTEtMTAuMzY5LTIxLjM3M3YtMTIuOXoiLz4mI3hhOzwvc3ZnPg==;', 
		    		s * 42, s * 42, 'Traffic\nDirector', null, null, null, this.getTagsForStencil(gn, '', dt + 'traffic director').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMTQgMGg2djZoLTZ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTE3IDBoM3Y2aC0zeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xNCAxNGg2djZoLTZ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTE3IDE0aDN2NmgtM3oiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMCAwaDZ2NkgweiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0zIDBoM3Y2SDN6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTAgMTRoNnY2SDB6Ii8+JiN4YTsJPGcgY2xhc3M9InN0MSI+JiN4YTsJCTxwYXRoIGQ9Ik0zIDE0aDN2Nkgzek02IDJoOHYySDZ6Ii8+JiN4YTsJCTxwYXRoIGQ9Ik02IDE2aDh2Mkg2ek0xNiA2aDJ2OGgtMnpNMiA2aDJ2OEgyeiIvPiYjeGE7CTwvZz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMiA2aDJ2Mkgyem0xNCAwaDJ2MmgtMnpNNiAyaDJ2Mkg2em0wIDE0aDJ2Mkg2eiIvPiYjeGE7PC9zdmc+;', 
		    		s * 42, s * 42, 'Virtual\nPrivate Cloud', null, null, null, this.getTagsForStencil(gn, '', dt + 'virtual private cloud').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJzdmc4MTMzMSIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgNDM2LjcxNzAxIDM5OS43NTMzNiIgaGVpZ2h0PSIzOTkuNzUzMzZtbSIgd2lkdGg9IjQzNi43MTcwMW1tIj4mI3hhOyAgJiN4YTsgIDxkZWZzIGlkPSJkZWZzODEzMjgiLz4mI3hhOyAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTExLjg3MDE3LDUxLjExNjc3NykiIGlkPSJsYXllcjEiPiYjeGE7ICAgIDxwYXRoIHRyYW5zZm9ybT0ic2NhbGUoMC4yNjQ1ODMzMykiIGQ9Ik0gMzkyLjQ2MDk0LC0xOTMuMTk3MjcgQSAxNTEuMjE4MzQsMTUxLjIxODM0IDAgMCAwIDI0MS4yNDIxOSwtNDEuOTc4NTE2IDE1MS4yMTgzNCwxNTEuMjE4MzQgMCAwIDAgMzkyLjQ2MDk0LDEwOS4yNDAyMyAxNTEuMjE4MzQsMTUxLjIxODM0IDAgMCAwIDU0My42Nzk2OSwtNDEuOTc4NTE2IDE1MS4yMTgzNCwxNTEuMjE4MzQgMCAwIDAgMzkyLjQ2MDk0LC0xOTMuMTk3MjcgWiBNIDkwNy4yMTg3NSwtMzEuNjk5MjE5IEEgMTUxLjIxODM0LDE1MS4yMTgzNCAwIDAgMCA3NjQuNTUyNzMsNjkuNzA3MDMxIEggNjQ5LjM1NTQ3IEEgNTEuMDI4NzI0LDUxLjAyODcyNCAwIDAgMCA2MDUuMjc3MzQsOTUuMDI3MzQ0IEwgNTEyLjk4MjQyLDI1My4yNTU4NiBIIDI3Mi40NTExNyBMIDE4MC4xNTQzLDk1LjAyNzM0NCBBIDUxLjAyODcyNCw1MS4wMjg3MjQgMCAwIDAgMTM2LjA3ODEyLDY5LjcwNzAzMSBIIDIxLjkyMTg3NSBBIDE1MS4yMTgzNCwxNTEuMjE4MzQgMCAwIDAgLTEyMC40ODgyOCwtMzAuNjgzNTk0IDE1MS4yMTgzNCwxNTEuMjE4MzQgMCAwIDAgLTI3MS43MDcwMywxMjAuNTMzMiAxNTEuMjE4MzQsMTUxLjIxODM0IDAgMCAwIC0xMjAuNDg4MjgsMjcxLjc1MTk1IDE1MS4yMTgzNCwxNTEuMjE4MzQgMCAwIDAgMjEuNjg1NTQ3LDE3MS43NTM5MSBIIDEwNi43NzE0OCBMIDE4Mi4xNDI1OCwzMDAuOTY2OCA2Mi4wMzEyNSw1MDYuNTQ0OTIgSCAtMTI4LjgxODM2IEEgMTUxLjIxODM0LDE1MS4yMTgzNCAwIDAgMCAtMjcxLjU5NzY2LDQwNC44MTQ0NSAxNTEuMjE4MzQsMTUxLjIxODM0IDAgMCAwIC00MjIuODE2NDEsNTU2LjAzMzIgMTUxLjIxODM0LDE1MS4yMTgzNCAwIDAgMCAtMjcxLjU5NzY2LDcwNy4yNTE5NSAxNTEuMjE4MzQsMTUxLjIxODM0IDAgMCAwIC0xMjkuODkyNTgsNjA4LjU5MTggSCA2NC43MDcwMzEgTCAxODMuNzA1MDgsODE3Ljc1MzkxIDEwNi43NzE0OCw5NDkuNjQyNTggSCAyMy42OTMzNTkgQSAxNTEuMjE4MzQsMTUxLjIxODM0IDAgMCAwIC0xMTkuNzg1MTYsODQ1LjkxNDA2IDE1MS4yMTgzNCwxNTEuMjE4MzQgMCAwIDAgLTI3MS4wMDM5MSw5OTcuMTMyODEgMTUxLjIxODM0LDE1MS4yMTgzNCAwIDAgMCAtMTE5Ljc4NTE2LDExNDguMzUxNiAxNTEuMjE4MzQsMTUxLjIxODM0IDAgMCAwIDIxLjIyMDcwMywxMDUxLjY5MTQgSCAxMzYuMDc4MTIgYSA1MS4wMjg3MjQsNTEuMDI4NzI0IDAgMCAwIDQ0LjA3NjE4LC0yNS4zMTI1IEwgMjc0Ljg2OTE0LDg2NC4wMDM5MSBIIDUxMC41NjI1IGwgOTQuNzE0ODQsMTYyLjM3NDk5IGEgNTEuMDI4NzI0LDUxLjAyODcyNCAwIDAgMCA0NC4wNzgxMywyNS4zMTI1IGggMTE2LjI1MzkxIGEgMTUxLjIxODM0LDE1MS4yMTgzNCAwIDAgMCAxNDEuMzQ1Nyw5Ny42Mjg5IEEgMTUxLjIxODM0LDE1MS4yMTgzNCAwIDAgMCAxMDU4LjE3MTksOTk4LjEwMTU2IDE1MS4yMTgzNCwxNTEuMjE4MzQgMCAwIDAgOTA2Ljk1NTA4LDg0Ni44ODQ3NyAxNTEuMjE4MzQsMTUxLjIxODM0IDAgMCAwIDc2My44MTQ0NSw5NDkuNjQyNTggSCA2NzguNjYyMTEgTCA2MDAuNzI0NjEsODE2LjAzNTE2IDcyNC4zMzM5OCw2MDguNTkxOCBIIDkzNC4xMzI4MSBBIDE1MS4yMTgzNCwxNTEuMjE4MzQgMCAwIDAgMTA3Ni41NDg4LDcwOS4yNzkzIDE1MS4yMTgzNCwxNTEuMjE4MzQgMCAwIDAgMTIyNy43Njc2LDU1OC4wNjI1IDE1MS4yMTgzNCwxNTEuMjE4MzQgMCAwIDAgMTA3Ni41NDg4LDQwNi44NDM3NSAxNTEuMjE4MzQsMTUxLjIxODM0IDAgMCAwIDkzNC40Nzg1Miw1MDYuNTQ0OTIgSCA3MjcuMTM0NzcgTCA2MDIuMzM3ODksMzAyLjU5OTYxIDY3OC42NjIxMSwxNzEuNzUzOTEgaCA4Ni43MzgyOCBBIDE1MS4yMTgzNCwxNTEuMjE4MzQgMCAwIDAgOTA3LjIxODc1LDI3MC43MzgyOCAxNTEuMjE4MzQsMTUxLjIxODM0IDAgMCAwIDEwNTguNDM3NSwxMTkuNTE5NTMgMTUxLjIxODM0LDE1MS4yMTgzNCAwIDAgMCA5MDcuMjE4NzUsLTMxLjY5OTIxOSBaIE0gMzkzLjM2NTIzLDEwMTUuMjQ0MSBhIDE1MS4yMTgzNCwxNTEuMjE4MzQgMCAwIDAgLTE1MS4yMTg3NSwxNTEuMjE4OCAxNTEuMjE4MzQsMTUxLjIxODM0IDAgMCAwIDE1MS4yMTg3NSwxNTEuMjE4NyAxNTEuMjE4MzQsMTUxLjIxODM0IDAgMCAwIDE1MS4yMTg3NSwtMTUxLjIxODcgMTUxLjIxODM0LDE1MS4yMTgzNCAwIDAgMCAtMTUxLjIxODc1LC0xNTEuMjE4OCB6IiBzdHlsZT0iY29sb3I6IzAwMDAwMDtmaWxsOiM1OTg2ZjI7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlLXdpZHRoOjU2LjY5Mjk7c3Ryb2tlLWxpbmVqb2luOnJvdW5kOy1pbmtzY2FwZS1zdHJva2U6bm9uZSIgaWQ9InBhdGg4MTQ1NCIvPiYjeGE7ICA8L2c+JiN4YTs8L3N2Zz4=;', 
		    		s * 42, s * 38, 'Network\nIntelligence', null, null, null, this.getTagsForStencil(gn, '', dt + 'network intelligence').join(' '))
	 	];
		
		this.addPalette('gcp2Icons Networking', 'GCP Icons / Networking', false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addGCP2IconsCICDPalette = function()
	{
		var sb = this;
		var s = 1;
		var n = 'sketch=0;html=1;verticalAlign=top;labelPosition=center;verticalLabelPosition=bottom;align=center;spacingTop=-6;fontSize=11;fontStyle=1;fontColor=#999999;shape=image;aspect=fixed;imageAspect=0;';
		var dt = 'gcp google cloud platform icons icon developer tools ';
		var gn = 'mxgraph.gcp2';
		var fns = [];
		
		var fns = [
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE3LjMyOTk5OTkyMzcwNjA1NSIgaGVpZ2h0PSIxOS42MTAwMDA2MTAzNTE1NjIiIHZpZXdCb3g9IjAgMCAxNy4zMjk5OTk5MjM3MDYwNTUgMTkuNjEwMDAwNjEwMzUxNTYyIj4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qxe2ZpbGw6IzY2OWRmNjt9JiN4YTsJLnN0MntmaWxsOiNhZWNiZmE7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTEyLjE4IDcuOThMMTEgNy4yOWwtMy41MiA2LjEgMS4xOC42OCAzLjUyLTIuMDN6IiBmaWxsPSIjNDI4NWY0Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTYuMzIgMTIuNzJsMy41My02LjA5LTEuMTktLjY5LTMuNTIgMi4wNHY0LjA2eiIgZmlsbD0iIzY2OWRmNiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0zLjc1IDcuOThMMCA1LjgxdjkuMmw3Ljk3IDQuNnYtNC4zM2wtNC4yMi0yLjQ0em05LjEzLTEuMmwzLjc2LTIuMTdMOC42NiAwIC42OCA0LjYxbDMuNzYgMi4xNyA0LjIyLTIuNDR6TTkuMzUgMTkuNjFsNy45OC00LjZ2LTkuMmwtMy43NiAyLjE3djQuODZsLTQuMjIgMi40NHoiIGZpbGw9IiNhZWNiZmEiLz4mI3hhOzwvc3ZnPg==;', 
		    		s * 36, s * 42, 'Cloud\nBuild', null, null, null, this.getTagsForStencil(gn, '', dt + 'cloud build').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjM4My41NTc5Nzc2MjM2MzQ3IiBoZWlnaHQ9IjI1Mi40NzIyMzIwMDk5MzQwNiIgdmlld0JveD0iMCAwIDEwMS40ODI5OTQwNzk1ODk4NCA2Ni44MDAwMDMwNTE3NTc4MSI+JiN4YTs8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qxe2ZpbGw6IzY2OWRmNjt9JiN4YTsJLnN0MntmaWxsOiNhZWNiZmE7fSYjeGE7PC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNjguMTQgMzUuMTUzbDE1LjgyNCAxNS44MjRMNjguMTQgNjYuOCA1Mi4zMTYgNTAuOTc3em0tMzUuMDk0IDBMNDguODcgNTAuOTc3IDMzLjA0NiA2Ni44IDE3LjIyMiA1MC45Nzd6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTg1LjY1OSAxNy42MzNsMTUuODI0IDE1LjgyNC0xNS44MjQgMTUuODI0LTE1LjgyNC0xNS44MjR6bS02OS44MzUgMGwxNS44MjQgMTUuODI0LTE1LjgyNCAxNS44MjRMMCAzMy40NTd6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTY4LjE0IDBsMTUuODI0IDE1LjgyNEw2OC4xNCAzMS42NDcgNTIuMzE2IDE1LjgyM3pNMzMuMDQ2IDBMNDguODcgMTUuODIzIDMzLjA0NiAzMS42NDcgMTcuMjIyIDE1LjgyM3oiLz4mI3hhOzwvc3ZnPg==;', 
		    		s * 42, s * 27, 'Cloud\nCode', null, null, null, this.getTagsForStencil(gn, '', dt + 'cloud code').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjQyNCIgaGVpZ2h0PSI0MjQiIHZpZXdCb3g9IjAgMCA0MjQgNDI0Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQgMHY0MjRIMFYwek0yMTIgOTcuODQ2Yy0zNy44ODQgMC03MC4xNjQgMjMuOTktODIuNDc4IDU3LjYwOGgwbC0zLjQwMy4wMDFjLTQyLjYzNCAwLTc3LjE5NiAzNC41NjItNzcuMTk2IDc3LjE5NnMzNC41NjIgNzcuMTk2IDc3LjE5NiA3Ny4xOTZoMCAxNzEuNzYzYzQyLjYzNCAwIDc3LjE5Ni0zNC41NjIgNzcuMTk2LTc3LjE5NnMtMzQuNTYyLTc3LjE5Ni03Ny4xOTYtNzcuMTk2aDBsLTMuNDAzLS4wMDFDMjgyLjE2NCAxMjEuODM3IDI0OS44ODQgOTcuODQ2IDIxMiA5Ny44NDZ6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOzwvc3ZnPg==;', 
		    		s * 42, s * 42, 'Cloud Code\nfor IntelliJ', null, null, null, this.getTagsForStencil(gn, '', dt + 'cloud code for intellij').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjM2MC4zMDM3NjY4NjA4MzYzIiBoZWlnaHQ9IjM3OC4wNTExNTgwNzc0MDg4IiB2aWV3Qm94PSItMC4wMDAxNjI0MjExNDM2MTM3NTU3IC0wLjAwMDEwMDAwNTk0OTIwNzExNTkyIDk1LjMzMDI2MTIzMDQ2ODc1IDEwMC4wMjYxMDAxNTg2OTE0Ij4mI3hhOzxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojYWVjYmZhO30mI3hhOwkuc3Qye2ZpbGw6IzY2OWRmNjt9JiN4YTs8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik03OS45NzEgNzcuNzE1bC03LjM1OSA3LjQ4OCA4LjYzOSA4LjQ5IDcuMzU5LTcuNDg4em0tNjUuMDk2LjA2MWwtOC42NDEgOC40OTIgNy4zNjEgNy40ODggOC42MzktOC40OXoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNNzkuNTUzLjIyMWE1LjI1IDUuMjUgMCAwIDAtMy42NiA4Ljk4NEw4Ni4zODkgMTkuNThhNS4yNSA1LjI1IDAgMCAwIDguOTQxLTMuNzY1IDUuMjUgNS4yNSAwIDAgMC0xLjU2LTMuNzA0TDgzLjI3NSAxLjczOEE1LjI1IDUuMjUgMCAwIDAgNzkuNTUzLjIyMXpNMTUuOTE2IDBhNS4yNSA1LjI1IDAgMCAwLTMuNzIzIDEuNTE2TDEuNjk5IDExLjg5MWE1LjI1IDUuMjUgMCAwIDAtLjA0MyA3LjQyNCA1LjI1IDUuMjUgMCAwIDAgNy40MjQuMDQzTDE5LjU3NiA4Ljk4MkE1LjI1IDUuMjUgMCAwIDAgMTUuOTE2IDB6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTQ4LjEzOCAyNi4yNGMxMy4zNDcgMCAyNS40MzIgMTEuMTM2IDI1LjMxIDI2LjQ4MSAwIDE1LjExLTEyLjI2NyAyNS42NzMtMjUuMTg5IDI1LjY3My0xMS4xNDkgMC0xOC4zMTctNS4xNzEtMjEuOTYtMTAuNzM4bDIxLjgzOS0xNS4wOTd6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTgxLjI1IDkzLjY5M2w0LjY2NCA0LjU4NmE1LjI1IDUuMjUgMCAxIDAgNy4zNjEtNy40OWwtNC42NjYtNC41ODR6TTYuMjM0IDg2LjI2OEwxLjU3IDkwLjg1MWE1LjI1IDUuMjUgMCAwIDAtLjA2NSA3LjQyNCA1LjI1IDUuMjUgMCAwIDAgNy40MjQuMDY0bDQuNjY2LTQuNTg0ek00Ny4zNzEgNS41NzhDMjEuMzQ5IDUuNTc4LjE0NiAyNi43NzkuMTQ2IDUyLjgwMXMyMS4yMDMgNDcuMjI1IDQ3LjIyNSA0Ny4yMjUgNDcuMjI1LTIxLjIwMyA0Ny4yMjUtNDcuMjI1UzczLjM5MyA1LjU3OCA0Ny4zNzEgNS41Nzh6bTAgMTBhMzcuMTUgMzcuMTUgMCAwIDEgMzcuMjI1IDM3LjIyM2MwIDIwLjYxNy0xNi42MDcgMzcuMjI1LTM3LjIyNSAzNy4yMjVTMTAuMTQ2IDczLjQxOCAxMC4xNDYgNTIuODAxYTM3LjE1IDM3LjE1IDAgMCAxIDM3LjIyNS0zNy4yMjN6Ii8+JiN4YTs8L3N2Zz4=;', 
		    		s * 40, s * 42, 'Cloud\nScheduler', null, null, null, this.getTagsForStencil(gn, '', dt + 'cloud scheduler').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjQyNCIgaGVpZ2h0PSI0MjQiIHZpZXdCb3g9IjAgMCA0MjQgNDI0Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQgMHY0MjRIMFYwek0yMTIgOTcuODQ2Yy0zNy44ODQgMC03MC4xNjQgMjMuOTktODIuNDc4IDU3LjYwOGgwbC0zLjQwMy4wMDFjLTQyLjYzNCAwLTc3LjE5NiAzNC41NjItNzcuMTk2IDc3LjE5NnMzNC41NjIgNzcuMTk2IDc3LjE5NiA3Ny4xOTZoMCAxNzEuNzYzYzQyLjYzNCAwIDc3LjE5Ni0zNC41NjIgNzcuMTk2LTc3LjE5NnMtMzQuNTYyLTc3LjE5Ni03Ny4xOTYtNzcuMTk2aDBsLTMuNDAzLS4wMDFDMjgyLjE2NCAxMjEuODM3IDI0OS44ODQgOTcuODQ2IDIxMiA5Ny44NDZ6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOzwvc3ZnPg==;', 
		    		s * 42, s * 42, 'Cloud\nSDK', null, null, null, this.getTagsForStencil(gn, '', dt + 'cloud sdk software development kit').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjQyNCIgaGVpZ2h0PSI0MjQiIHZpZXdCb3g9IjAgMCA0MjQgNDI0Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQgMHY0MjRIMFYwek0yMTIgOTcuODQ2Yy0zNy44ODQgMC03MC4xNjQgMjMuOTktODIuNDc4IDU3LjYwOGgwbC0zLjQwMy4wMDFjLTQyLjYzNCAwLTc3LjE5NiAzNC41NjItNzcuMTk2IDc3LjE5NnMzNC41NjIgNzcuMTk2IDc3LjE5NiA3Ny4xOTZoMCAxNzEuNzYzYzQyLjYzNCAwIDc3LjE5Ni0zNC41NjIgNzcuMTk2LTc3LjE5NnMtMzQuNTYyLTc3LjE5Ni03Ny4xOTYtNzcuMTk2aDBsLTMuNDAzLS4wMDFDMjgyLjE2NCAxMjEuODM3IDI0OS44ODQgOTcuODQ2IDIxMiA5Ny44NDZ6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOzwvc3ZnPg==;', 
		    		s * 42, s * 42, 'Cloud Source\nRepositories', null, null, null, this.getTagsForStencil(gn, '', dt + 'cloud source repositories').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjM3Ni4zNDk5ODYzODk2NDkzNiIgaGVpZ2h0PSIzMDcuNjg0MDE3OTkzMzY5MjUiIHZpZXdCb3g9IjAgMCA5OS41NzU5OTYzOTg5MjU3OCA4MS40MDgwMDQ3NjA3NDIxOSI+JiN4YTs8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qxe2ZpbGw6IzQyODVmNDt9JiN4YTs8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0wIDB2NDAuODc1aDEwVjB6bTIyLjM5NCAwdjQwLjg3NWgxMFYwem0yMi4zOTQgMHY0MC44NzVoMTBWMHptMjIuMzk0IDB2NDAuODc1aDEwVjB6bTIyLjM5NCAwdjQwLjg3NWgxMFYweiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik04OS41NzYgNDAuODc1djQwLjUzM2gxMFY0MC44NzV6bS0yMi4zOTQgMHY0MC41MzNoMTBWNDAuODc1em0tMjIuMzk0IDB2NDAuNTMzaDEwVjQwLjg3NXptLTIyLjM5NCAwdjQwLjUzM2gxMFY0MC44NzV6TTAgNDAuODc1djQwLjUzM2gxMFY0MC44NzV6Ii8+JiN4YTs8L3N2Zz4=;', 
		    		s * 42, s * 34, 'Cloud\nTasks', null, null, null, this.getTagsForStencil(gn, '', dt + 'cloud tasks').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAuMTE2NjExNjcwNjgwMSIgaGVpZ2h0PSIxMDAuMDMyNDk0OTc4MDAwMzciIHZpZXdCb3g9Ii0wLjA2OTI3NDkwMjM0Mzc1IC0wLjA4MDczNDI1MjkyOTY4NzUgMTAwLjExNjYwNzY2NjAxNTYyIDEwMC4wMzI0ODU5NjE5MTQwNiIgdmVyc2lvbj0iMS4xIiBpZD0ic3ZnNSIgaW5rc2NhcGU6dmVyc2lvbj0iMS4xIChjNjhlMjJjMzg3LCAyMDIxLTA1LTIzKSIgc29kaXBvZGk6ZG9jbmFtZT0iY2xvdWRfdGVzdF9sYWIuc3ZnIj4mI3hhOyAgPHNvZGlwb2RpOm5hbWVkdmlldyBpZD0ibmFtZWR2aWV3NyIgcGFnZWNvbG9yPSIjZmZmZmZmIiBib3JkZXJjb2xvcj0iIzY2NjY2NiIgYm9yZGVyb3BhY2l0eT0iMS4wIiBpbmtzY2FwZTpwYWdlc2hhZG93PSIyIiBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMC4wIiBpbmtzY2FwZTpwYWdlY2hlY2tlcmJvYXJkPSIwIiBpbmtzY2FwZTpkb2N1bWVudC11bml0cz0ibW0iIHNob3dncmlkPSJmYWxzZSIgaW5rc2NhcGU6em9vbT0iMS4xNTg2NzQ5IiBpbmtzY2FwZTpjeD0iMzczLjI3MTIyIiBpbmtzY2FwZTpjeT0iMjI0LjgyNTc4IiBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjE5MjAiIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9IjEwMTciIGlua3NjYXBlOndpbmRvdy14PSItOCIgaW5rc2NhcGU6d2luZG93LXk9Ii04IiBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIxIiBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJsYXllcjEiIGZpdC1tYXJnaW4tdG9wPSIwIiBmaXQtbWFyZ2luLWxlZnQ9IjAiIGZpdC1tYXJnaW4tcmlnaHQ9IjAiIGZpdC1tYXJnaW4tYm90dG9tPSIwIi8+JiN4YTsgIDxkZWZzIGlkPSJkZWZzMiIvPiYjeGE7ICA8ZyBpbmtzY2FwZTpsYWJlbD0iTGF5ZXIgMSIgaW5rc2NhcGU6Z3JvdXBtb2RlPSJsYXllciIgaWQ9ImxheWVyMSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzAzLjQ2MjEzLDMwLjIyODM5NykiPiYjeGE7ICAgIDxwYXRoIGlkPSJwYXRoMTc3OTYtMTciIHN0eWxlPSJvcGFjaXR5OjE7ZmlsbDojNDI4NWY0O3N0cm9rZS13aWR0aDoxMDtzdHJva2UtbGluZWpvaW46cm91bmQ7ZmlsbC1vcGFjaXR5OjEiIGQ9Im0gLTI0MC44OTA4OCw1Ny4zMjMyMDggYSAxMi40MDAxNTQsMTIuNDAwMTU0IDAgMCAxIC0xMi40MDAxNSwxMi40MDAxNTQgMTIuNDAwMTU0LDEyLjQwMDE1NCAwIDAgMSAtMTIuNDAwMTUsLTEyLjQwMDE1NCAxMi40MDAxNTQsMTIuNDAwMTU0IDAgMCAxIDEyLjQwMDE1LC0xMi40MDAxNTQgMTIuNDAwMTU0LDEyLjQwMDE1NCAwIDAgMSAxMi40MDAxNSwxMi40MDAxNTQgeiBNIC0yNzguNzMxMSwxOS42NjYwNjEgYSAxMi40MDAxNTQsMTIuNDAwMTU0IDAgMCAxIC0xMi40MDAxNiwxMi40MDAxNTUgMTIuNDAwMTU0LDEyLjQwMDE1NCAwIDAgMSAtMTIuNDAwMTUsLTEyLjQwMDE1NSAxMi40MDAxNTQsMTIuNDAwMTU0IDAgMCAxIDEyLjQwMDE1LC0xMi40MDAxNTM3IDEyLjQwMDE1NCwxMi40MDAxNTQgMCAwIDEgMTIuNDAwMTYsMTIuNDAwMTUzNyB6IG0gMzcuODQwMjIsMCBhIDEyLjQwMDE1NCwxMi40MDAxNTQgMCAwIDEgLTEyLjQwMDE1LDEyLjQwMDE1NSAxMi40MDAxNTQsMTIuNDAwMTU0IDAgMCAxIC0xMi40MDAxNSwtMTIuNDAwMTU1IDEyLjQwMDE1NCwxMi40MDAxNTQgMCAwIDEgMTIuNDAwMTUsLTEyLjQwMDE1MzcgMTIuNDAwMTU0LDEyLjQwMDE1NCAwIDAgMSAxMi40MDAxNSwxMi40MDAxNTM3IHogbSAzNy40NzYwOSwtMzcuNTc1MDM5IGEgMTIuNDAwMTU0LDEyLjQwMDE1NCAwIDAgMSAtMTIuNDAwMTUsMTIuNDAwMTU0NiAxMi40MDAxNTQsMTIuNDAwMTU0IDAgMCAxIC0xMi40MDAxNiwtMTIuNDAwMTU0NiAxMi40MDAxNTQsMTIuNDAwMTU0IDAgMCAxIDEyLjQwMDE2LC0xMi40MDAxNTQgMTIuNDAwMTU0LDEyLjQwMDE1NCAwIDAgMSAxMi40MDAxNSwxMi40MDAxNTQgeiBtIC0xMi4zOTk2NiwyNS4zNjIxMDMgYyAtNi43MTU0MywwIC0xMi4yMTI4OSw1LjQ5NzQ2NCAtMTIuMjEyODksMTIuMjEyODkxIDAsNi43MTU0MjYgNS40OTc0NiwxMi4yMTI4OSAxMi4yMTI4OSwxMi4yMTI4OSA2LjcxNTQyLDAgMTIuMjEyODksLTUuNDk3NDY0IDEyLjIxMjg5LC0xMi4yMTI4OSAwLC02LjcxNTQyNyAtNS40OTc0NywtMTIuMjEyODkxIC0xMi4yMTI4OSwtMTIuMjEyODkxIHogbSAwLDUgYyA0LjAxMzIzLDAgNy4yMTI4OSwzLjE5OTY2MiA3LjIxMjg5LDcuMjEyODkxIDAsNC4wMTMyMjggLTMuMTk5NjYsNy4yMTI4OSAtNy4yMTI4OSw3LjIxMjg5IC00LjAxMzIzLDAgLTcuMjEyODksLTMuMTk5NjYyIC03LjIxMjg5LC03LjIxMjg5IDAsLTQuMDEzMjI5IDMuMTk5NjYsLTcuMjEyODkxIDcuMjEyODksLTcuMjEyODkxIHogbSAwLDMyLjY1NjI1IGMgLTYuNzE1NDMsMCAtMTIuMjEyODksNS40OTc0NjQgLTEyLjIxMjg5LDEyLjIxMjg5MSAwLDYuNzE1NDI2IDUuNDk3NDYsMTIuMjE0ODQzIDEyLjIxMjg5LDEyLjIxNDg0MyA2LjcxNTQyLDAgMTIuMjEyODksLTUuNDk5NDE3IDEyLjIxMjg5LC0xMi4yMTQ4NDMgMCwtNi43MTU0MjcgLTUuNDk3NDcsLTEyLjIxMjg5MSAtMTIuMjEyODksLTEyLjIxMjg5MSB6IG0gMCw1IGMgNC4wMTMyMywwIDcuMjEyODksMy4xOTk2NjIgNy4yMTI4OSw3LjIxMjg5MSAwLDQuMDEzMjI4IC0zLjE5OTY2LDcuMjE0ODQzIC03LjIxMjg5LDcuMjE0ODQzIC00LjAxMzIzLDAgLTcuMjEyODksLTMuMjAxNjE1IC03LjIxMjg5LC03LjIxNDg0MyAwLC00LjAxMzIyOSAzLjE5OTY2LC03LjIxMjg5MSA3LjIxMjg5LC03LjIxMjg5MSB6IG0gLTc1LjMxNjQxLC01IGMgLTYuNzE1NDMsMCAtMTIuMjEyODksNS40OTc0NjQgLTEyLjIxMjg5LDEyLjIxMjg5MSAwLDYuNzE1NDI2IDUuNDk3NDYsMTIuMjE0ODQzIDEyLjIxMjg5LDEyLjIxNDg0MyA2LjcxNTQzLDAgMTIuMjEyODksLTUuNDk5NDE3IDEyLjIxMjg5LC0xMi4yMTQ4NDMgMCwtNi43MTU0MjcgLTUuNDk3NDYsLTEyLjIxMjg5MSAtMTIuMjEyODksLTEyLjIxMjg5MSB6IG0gMCw1IGMgNC4wMTMyMywwIDcuMjEyODksMy4xOTk2NjIgNy4yMTI4OSw3LjIxMjg5MSAwLDQuMDEzMjI4IC0zLjE5OTY2LDcuMjE0ODQzIC03LjIxMjg5LDcuMjE0ODQzIC00LjAxMzIzLDAgLTcuMjEyODksLTMuMjAxNjE1IC03LjIxMjg5LC03LjIxNDg0MyAwLC00LjAxMzIyOSAzLjE5OTY2LC03LjIxMjg5MSA3LjIxMjg5LC03LjIxMjg5MSB6IG0gMCwtODAuMjMwNDY5IGMgLTYuNzE1NDMsMCAtMTIuMjEyODksNS40OTc0NjQgLTEyLjIxMjg5LDEyLjIxMjg5MSAwLDYuNzE1NDI2IDUuNDk3NDYsMTIuMjEyODkwNSAxMi4yMTI4OSwxMi4yMTI4OTA1IDYuNzE1NDMsMCAxMi4yMTI4OSwtNS40OTc0NjQ1IDEyLjIxMjg5LC0xMi4yMTI4OTA1IDAsLTYuNzE1NDI3IC01LjQ5NzQ2LC0xMi4yMTI4OTEgLTEyLjIxMjg5LC0xMi4yMTI4OTEgeiBtIDAsNSBjIDQuMDEzMjMsMCA3LjIxMjg5LDMuMTk5NjYyIDcuMjEyODksNy4yMTI4OTEgMCw0LjAxMzIyOSAtMy4xOTk2Niw3LjIxMjg5IC03LjIxMjg5LDcuMjEyODkgLTQuMDEzMjMsMCAtNy4yMTI4OSwtMy4xOTk2NjEgLTcuMjEyODksLTcuMjEyODkgMCwtNC4wMTMyMjkgMy4xOTk2NiwtNy4yMTI4OTEgNy4yMTI4OSwtNy4yMTI4OTEgeiBtIDM3LjgzOTg0LC01IGMgLTYuNzE1NDIsMCAtMTIuMjEyODksNS40OTc0NjQgLTEyLjIxMjg5LDEyLjIxMjg5MSAwLDYuNzE1NDI2IDUuNDk3NDcsMTIuMjEyODkwNSAxMi4yMTI4OSwxMi4yMTI4OTA1IDYuNzE1NDMsMCAxMi4yMTI5LC01LjQ5NzQ2NDUgMTIuMjEyOSwtMTIuMjEyODkwNSAwLC02LjcxNTQyNyAtNS40OTc0NywtMTIuMjEyODkxIC0xMi4yMTI5LC0xMi4yMTI4OTEgeiBtIDAsNSBjIDQuMDEzMjMsMCA3LjIxMjksMy4xOTk2NjIgNy4yMTI5LDcuMjEyODkxIDAsNC4wMTMyMjkgLTMuMTk5NjcsNy4yMTI4OSAtNy4yMTI5LDcuMjEyODkgLTQuMDEzMjIsMCAtNy4yMTI4OSwtMy4xOeditableCssRules=.*;shape=image;verticalLabelPosition=bottom;labelBackgroundColor=#ffffff;verticalAlign=top;aspect=fixed;imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjM3OC4zOTE0MTUzMjk4OTUiIGhlaWdodD0iMzc4LjA3Mzc3NjA3MzI4MTMiIHZpZXdCb3g9Ii0wLjA2OTAwMDI0NDE0MDYyNSAtMC4wODA5OTkzNzQzODk2NDg0NCAxMDAuMTE1OTk3MzE0NDUzMTIgMTAwLjAzMjAwNTMxMDA1ODYiPiYjeGE7PHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTs8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik02Mi41NzEgODcuNTUxYzAgNi44NDgtNS41NTIgMTIuNC0xMi40IDEyLjRzLTEyLjQtNS41NTItMTIuNC0xMi40IDUuNTUyLTEyLjQgMTIuNC0xMi40IDEyLjQgNS41NTIgMTIuNCAxMi40em0tMzcuODQtMzcuNjU3YTEyLjQgMTIuNCAwIDAgMS0xMi40IDEyLjRjLTYuODQ4IDAtMTIuNC01LjU1Mi0xMi40LTEyLjRzNS41NTItMTIuNCAxMi40LTEyLjRhMTIuNCAxMi40IDAgMCAxIDEyLjQgMTIuNHptMzcuODQgMGMwIDYuODQ4LTUuNTUyIDEyLjQtMTIuNCAxMi40cy0xMi40LTUuNTUyLTEyLjQtMTIuNCA1LjU1Mi0xMi40IDEyLjQtMTIuNCAxMi40IDUuNTUyIDEyLjQgMTIuNHptMzcuNDc2LTM3LjU3NWMwIDYuODQ4LTUuNTUyIDEyLjQtMTIuNCAxMi40YTEyLjQgMTIuNCAwIDAgMS0xMi40LTEyLjQgMTIuNCAxMi40IDAgMCAxIDEyLjQtMTIuNGM2Ljg0OCAwIDEyLjQgNS41NTIgMTIuNCAxMi40em0tMTIuNCAyNS4zNjJjLTYuNzE1IDAtMTIuMjEzIDUuNDk3LTEyLjIxMyAxMi4yMTNzNS40OTcgMTIuMjEzIDEyLjIxMyAxMi4yMTNTOTkuODYgNTYuNjA5IDk5Ljg2IDQ5Ljg5NHMtNS40OTctMTIuMjEzLTEyLjIxMy0xMi4yMTN6bTAgNWM0LjAxMyAwIDcuMjEzIDMuMiA3LjIxMyA3LjIxM3MtMy4yIDcuMjEzLTcuMjEzIDcuMjEzLTcuMjEzLTMuMi03LjIxMy03LjIxMyAzLjItNy4yMTMgNy4yMTMtNy4yMTN6bTAgMzIuNjU2Yy02LjcxNSAwLTEyLjIxMyA1LjQ5Ny0xMi4yMTMgMTIuMjEzczUuNDk3IDEyLjIxNSAxMi4yMTMgMTIuMjE1Uzk5Ljg2IDk0LjI2NiA5OS44NiA4Ny41NXMtNS40OTctMTIuMjEzLTEyLjIxMy0xMi4yMTN6bTAgNWM0LjAxMyAwIDcuMjEzIDMuMiA3LjIxMyA3LjIxM3MtMy4yIDcuMjE1LTcuMjEzIDcuMjE1LTcuMjEzLTMuMjAyLTcuMjEzLTcuMjE1IDMuMi03LjIxMyA3LjIxMy03LjIxM3ptLTc1LjMxNi01QzUuNjE2IDc1LjMzNy4xMTggODAuODM1LjExOCA4Ny41NXM1LjQ5NyAxMi4yMTUgMTIuMjEzIDEyLjIxNSAxMi4yMTMtNS40OTkgMTIuMjEzLTEyLjIxNS01LjQ5Ny0xMi4yMTMtMTIuMjEzLTEyLjIxM3ptMCA1YzQuMDEzIDAgNy4yMTMgMy4yIDcuMjEzIDcuMjEzcy0zLjIgNy4yMTUtNy4yMTMgNy4yMTUtNy4yMTMtMy4yMDItNy4yMTMtNy4yMTUgMy4yLTcuMjEzIDcuMjEzLTcuMjEzem0wLTgwLjIzQzUuNjE2LjEwNy4xMTggNS42MDQuMTE4IDEyLjMyczUuNDk3IDEyLjIxMyAxMi4yMTMgMTIuMjEzIDEyLjIxMy01LjQ5NyAxMi4yMTMtMTIuMjEzUzE5LjA0Ny4xMDcgMTIuMzMxLjEwN3ptMCA1YzQuMDEzIDAgNy4yMTMgMy4yIDcuMjEzIDcuMjEzcy0zLjIgNy4yMTMtNy4yMTMgNy4yMTMtNy4yMTMtMy4yLTcuMjEzLTcuMjEzIDMuMi03LjIxMyA3LjIxMy03LjIxM3ptMzcuODQtNWMtNi43MTUgMC0xMi4yMTMgNS40OTctMTIuMjEzIDEyLjIxM3M1LjQ5NyAxMi4yMTMgMTIuMjEzIDEyLjIxMyAxMi4yMTMtNS40OTcgMTIuMjEzLTEyLjIxM1M1Ni44ODYuMTA3IDUwLjE3MS4xMDd6bTAgNWM0LjAxMyAwIDcuMjEzIDMuMiA3LjIxMyA3LjIxM3MtMy4yIDcuMjEzLTcuMjEzIDcuMjEzLTcuMjEzLTMuMi03LjIxMy03LjIxMyAzLjItNy4yMTMgNy4yMTMtNy4yMTN6Ii8+JiN4YTs8L3N2Zz4=;Tk2NjEgLTcuMjEyODksLTcuMjEyODkgMCwtNC4wMTMyMjkgMy4xOTk2NywtNy4yMTI4OTEgNy4yMTI4OSwtNy4yMTI4OTEgeiIvPiYjeGE7ICA8L2c+JiN4YTs8L3N2Zz4=;', 
		    		s * 42, s * 42, 'Cloud\nTest Lab', null, null, null, this.getTagsForStencil(gn, '', dt + 'cloud test lab').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjQyNCIgaGVpZ2h0PSI0MjQiIHZpZXdCb3g9IjAgMCA0MjQgNDI0Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQgMHY0MjRIMFYwek0yMTIgOTcuODQ2Yy0zNy44ODQgMC03MC4xNjQgMjMuOTktODIuNDc4IDU3LjYwOGgwbC0zLjQwMy4wMDFjLTQyLjYzNCAwLTc3LjE5NiAzNC41NjItNzcuMTk2IDc3LjE5NnMzNC41NjIgNzcuMTk2IDc3LjE5NiA3Ny4xOTZoMCAxNzEuNzYzYzQyLjYzNCAwIDc3LjE5Ni0zNC41NjIgNzcuMTk2LTc3LjE5NnMtMzQuNTYyLTc3LjE5Ni03Ny4xOTYtNzcuMTk2aDBsLTMuNDAzLS4wMDFDMjgyLjE2NCAxMjEuODM3IDI0OS44ODQgOTcuODQ2IDIxMiA5Ny44NDZ6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOzwvc3ZnPg==;', 
		    		s * 42, s * 42, 'Cloud Tools\nfor Eclipse', null, null, null, this.getTagsForStencil(gn, '', dt + 'cloud tools for eclipse').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjM3Ny4xNTkzMDIxNjAyNjMwNSIgaGVpZ2h0PSIzMzYuMTYyNDk5MDAzMzEwOCIgdmlld0JveD0iLTAuMDU4MDAwMDA1NzgxNjUwNTQgMC4xMTI5OTk5OTgwMzMwNDY3MiA5OS43OTAwMDA5MTU1MjczNCA4OC45NDMwMDA3OTM0NTcwMyI+JiN4YTs8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qxe2ZpbGw6I2FlY2JmYTt9JiN4YTsJLnN0MntmaWxsOiM0Mjg1ZjQ7fSYjeGE7PC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNTMuMjQzIDYyLjA5VjQ3LjA5NGwxMy4yMDEgOC40MTZ2MTUuMDM4em0tMzMuMDIxIDBWNDcuMDk0bDEzLjIwMSA4LjQxNnYxNS4wMzh6bTE2LjUxMS0zMi4yODVWMTQuODFsMTMuMjAxIDguNDE2djE1LjAzOHptNjIuOTk5IDMzLjk2VjI1LjQwM2wtOS41NjItMS44ODR2NDIuMTMxem0tOTkuNzg4IDBWMjUuNDAzbDkuNTYyLTEuODg0djQyLjEzMXoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNNTMuMTg1IDQ3LjA5NGwxMy4yNTgtOC4yODcgMTMuMDE2IDguMjM0LTEzLjAxNiA4LjQ2OXptLTMzLjAyMSAwbDEzLjI1OC04LjI4NyAxMy4wMTYgOC4yMzQtMTMuMDE2IDguNDY5ek0zNi42NzUgMTQuODFsMTMuMjU4LTguMjg3IDEzLjAxNiA4LjIzNC0xMy4wMTYgOC40Njl6bTYzLjA1NiA0OC45NTZ2MTIuMjE3TDc3LjAxIDg5LjA1NVY3Ny43NTJ6bTAtMzguMzYzVjEzLjE4Nkw3Ny4wMS4xMTN2MTEuMzAzek0tLjA1OCA2My43NjZ2MTIuMjE3bDIyLjcyMSAxMy4wNzNWNzcuNzUyem0wLTM4LjM2M1YxMy4xODZMMjIuNjYzLjExM3YxMS4zMDN6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTY2LjQ0NCA3MC41NDdWNTUuNTFsMTMuMDE2LTguNDY5djE1LjR6bS0zMy4wMjEgMFY1NS41MWwxMy4wMTYtOC40Njl2MTUuNHptMTYuNTExLTMyLjI4NVYyMy4yMjVsMTMuMDE2LTguNDY5djE1LjR6bTQ5Ljc5OCAyNS41MDNsLTkuNTYyIDUuODh2LTMuOTk2em0wLTM4LjM2M2wtOS41NjItNS44OHYzLjk5NnpNLS4wNTggNjMuNzY2bDkuNTYyIDUuODh2LTMuOTk2em0wLTM4LjM2M2w5LjU2Mi01Ljg4djMuOTk2eiIvPiYjeGE7PC9zdmc+;', 
		    		s * 42, s * 42, 'Container\nRegistry', null, null, null, this.getTagsForStencil(gn, '', dt + 'container registry').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjQyNCIgaGVpZ2h0PSI0MjQiIHZpZXdCb3g9IjAgMCA0MjQgNDI0Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQgMHY0MjRIMFYwek0yMTIgOTcuODQ2Yy0zNy44ODQgMC03MC4xNjQgMjMuOTktODIuNDc4IDU3LjYwOGgwbC0zLjQwMy4wMDFjLTQyLjYzNCAwLTc3LjE5NiAzNC41NjItNzcuMTk2IDc3LjE5NnMzNC41NjIgNzcuMTk2IDc3LjE5NiA3Ny4xOTZoMCAxNzEuNzYzYzQyLjYzNCAwIDc3LjE5Ni0zNC41NjIgNzcuMTk2LTc3LjE5NnMtMzQuNTYyLTc3LjE5Ni03Ny4xOTYtNzcuMTk2aDBsLTMuNDAzLS4wMDFDMjgyLjE2NCAxMjEuODM3IDI0OS44ODQgOTcuODQ2IDIxMiA5Ny44NDZ6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOzwvc3ZnPg==;', 
		    		s * 42, s * 42, 'Gradle App\nEngine Plugin', null, null, null, this.getTagsForStencil(gn, '', dt + 'gradle app engine plugin').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjExLjI1OTk5OTI3NTIwNzUyIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHZpZXdCb3g9IjAgMCAyMCAxMS4yNTk5OTkyNzUyMDc1MiI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJLnN0MXtmaWxsOiM2NjlkZjY7fSYjeGE7CS5zdDJ7ZmlsbDojYWVjYmZhO30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik00LjY4IDEuNDJIMi40MkwwIDUuNjdsMi40MiA0LjI2aDIuMjZMMi4yNyA1LjY3eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0wIDUuNjdsMS4xMSAxLjk3IDEuNDYtMS40NS0uMy0uNTJ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTEzIDBINy4xMkwzLjgxIDUuNjNsMy4zMSA1LjU5SDEzbDMuMjktNS41OXptLTIuOTMgOC4zNmEyLjY0IDIuNjQgMCAxIDEgMi42Ni0yLjY0IDIuNjUgMi42NSAwIDAgMS0yLjY2IDIuNjR6TTIuNDIgMS40MkwwIDUuNjlsMS4xMSAxLjk3IDEuMTYtMS45NyAyLjQxLTQuMjd6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTEzIC4wOGgwbC0xLjcgMy4zM2EyLjY2IDIuNjYgMCAwIDEtMS4yNSA1IDIuNjIgMi42MiAwIDAgMS0xLjE4LS4yN2wtMS43NSAzLjEySDEzbDMuMjktNS42M3ptMi4zMiA5Ljg1aDIuMjdMMjAgNS42N2wtMi40MS00LjI1aC0yLjI3bDIuNDEgNC4yNXoiPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yMCA1LjY3TDE4Ljg5IDMuN2wtMS40NiAxLjQ2LjMuNTF6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTE3LjU5IDkuOTNMMjAgNS42NWwtMS4xMS0xLjk3LTEuMTYgMS45Ny0yLjQxIDQuMjh6Ii8+JiN4YTs8L3BhdGg+PC9zdmc+;', 
		    		s * 42, s * 23, 'IDE Plugins', null, null, null, this.getTagsForStencil(gn, '', dt + 'ide plugins integrated development environment').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjQyNCIgaGVpZ2h0PSI0MjQiIHZpZXdCb3g9IjAgMCA0MjQgNDI0Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQgMHY0MjRIMFYwek0yMTIgOTcuODQ2Yy0zNy44ODQgMC03MC4xNjQgMjMuOTktODIuNDc4IDU3LjYwOGgwbC0zLjQwMy4wMDFjLTQyLjYzNCAwLTc3LjE5NiAzNC41NjItNzcuMTk2IDc3LjE5NnMzNC41NjIgNzcuMTk2IDc3LjE5NiA3Ny4xOTZoMCAxNzEuNzYzYzQyLjYzNCAwIDc3LjE5Ni0zNC41NjIgNzcuMTk2LTc3LjE5NnMtMzQuNTYyLTc3LjE5Ni03Ny4xOTYtNzcuMTk2aDBsLTMuNDAzLS4wMDFDMjgyLjE2NCAxMjEuODM3IDI0OS44ODQgOTcuODQ2IDIxMiA5Ny44NDZ6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOzwvc3ZnPg==;', 
		    		s * 42, s * 42, 'Maven App\nEngine Plugin', null, null, null, this.getTagsForStencil(gn, '', dt + 'maven app engine plugin').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjExLjI1OTk5OTI3NTIwNzUyIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHZpZXdCb3g9IjAgMCAyMCAxMS4yNTk5OTkyNzUyMDc1MiI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJLnN0MXtmaWxsOiM2NjlkZjY7fSYjeGE7CS5zdDJ7ZmlsbDojYWVjYmZhO30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik00LjY4IDEuNDJIMi40MkwwIDUuNjdsMi40MiA0LjI2aDIuMjZMMi4yNyA1LjY3eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0wIDUuNjdsMS4xMSAxLjk3IDEuNDYtMS40NS0uMy0uNTJ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTEzIDBINy4xMkwzLjgxIDUuNjNsMy4zMSA1LjU5SDEzbDMuMjktNS41OXptLTIuOTMgOC4zNmEyLjY0IDIuNjQgMCAxIDEgMi42Ni0yLjY0IDIuNjUgMi42NSAwIDAgMS0yLjY2IDIuNjR6TTIuNDIgMS40MkwwIDUuNjlsMS4xMSAxLjk3IDEuMTYtMS45NyAyLjQxLTQuMjd6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTEzIC4wOGgwbC0xLjcgMy4zM2EyLjY2IDIuNjYgMCAwIDEtMS4yNSA1IDIuNjIgMi42MiAwIDAgMS0xLjE4LS4yN2wtMS43NSAzLjEySDEzbDMuMjktNS42M3ptMi4zMiA5Ljg1aDIuMjdMMjAgNS42N2wtMi40MS00LjI1aC0yLjI3bDIuNDEgNC4yNXoiPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yMCA1LjY3TDE4Ljg5IDMuN2wtMS40NiAxLjQ2LjMuNTF6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTE3LjU5IDkuOTNMMjAgNS42NWwtMS4xMS0xLjk3LTEuMTYgMS45Ny0yLjQxIDQuMjh6Ii8+JiN4YTs8L3BhdGg+PC9zdmc+;', 
		    		s * 42, s * 23, 'Tools for\nPowerShell', null, null, null, this.getTagsForStencil(gn, '', dt + 'tools for powershell').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjExLjI1OTk5OTI3NTIwNzUyIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHZpZXdCb3g9IjAgMCAyMCAxMS4yNTk5OTkyNzUyMDc1MiI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJLnN0MXtmaWxsOiM2NjlkZjY7fSYjeGE7CS5zdDJ7ZmlsbDojYWVjYmZhO30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik00LjY4IDEuNDJIMi40MkwwIDUuNjdsMi40MiA0LjI2aDIuMjZMMi4yNyA1LjY3eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0wIDUuNjdsMS4xMSAxLjk3IDEuNDYtMS40NS0uMy0uNTJ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTEzIDBINy4xMkwzLjgxIDUuNjNsMy4zMSA1LjU5SDEzbDMuMjktNS41OXptLTIuOTMgOC4zNmEyLjY0IDIuNjQgMCAxIDEgMi42Ni0yLjY0IDIuNjUgMi42NSAwIDAgMS0yLjY2IDIuNjR6TTIuNDIgMS40MkwwIDUuNjlsMS4xMSAxLjk3IDEuMTYtMS45NyAyLjQxLTQuMjd6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTEzIC4wOGgwbC0xLjcgMy4zM2EyLjY2IDIuNjYgMCAwIDEtMS4yNSA1IDIuNjIgMi42MiAwIDAgMS0xLjE4LS4yN2wtMS43NSAzLjEySDEzbDMuMjktNS42M3ptMi4zMiA5Ljg1aDIuMjdMMjAgNS42N2wtMi40MS00LjI1aC0yLjI3bDIuNDEgNC4yNXoiPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yMCA1LjY3TDE4Ljg5IDMuN2wtMS40NiAxLjQ2LjMuNTF6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTE3LjU5IDkuOTNMMjAgNS42NWwtMS4xMS0xLjk3LTEuMTYgMS45Ny0yLjQxIDQuMjh6Ii8+JiN4YTs8L3BhdGg+PC9zdmc+;', 
		    		s * 42, s * 23, 'Tools for\nVisual Studio', null, null, null, this.getTagsForStencil(gn, '', dt + 'tools for visual studio').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJzdmc4MjciIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDIwNS41MTIyOCAxODAuNTE4MjUiIGhlaWdodD0iMTgwLjUxODI1bW0iIHdpZHRoPSIyMDUuNTEyMjhtbSI+JiN4YTsgICYjeGE7ICA8ZGVmcyBpZD0iZGVmczgyNCIvPiYjeGE7ICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNC42MDIwNzI4LC01Ni43NjcxMjYpIiBpZD0ibGF5ZXIxIj4mI3hhOyAgICA8cGF0aCBkPSJtIDE0Mi4zMDMzMiwyMDIuNTM2NzUgMjYuNjMwNzgsLTE0Ljc0MDkzIHYgLTI5LjExOTQ4IGwgLTI2LjYzMDc4LDE0Ljg2ODYzIHogbSAtNC44MzQ4OSwwIC0yNi42MzA3OCwtMTQuNzQwOTMgdiAtMjkuMTE5NDggbCAyNi42MzA3OCwxNC44Njg2MyB6IG0gLTI3LjM3NTc4LC01My4zNDI2NCAyNi42MzA3NywtMTQuNzQwOTMgViAxMDUuMzMzNyBsIC0yNi42MzA3NywxNC44Njg2MyB6IG0gLTQuODM0OSwwIC0yNi42MzA3NzcsLTE0Ljc0MDkzIFYgMTA1LjMzMzcgbCAyNi42MzA3NzcsMTQuODY4NjMgeiBtIC0yNy4zNzU3ODgsNTMuMzQyNjQgMjYuNjMwNzc4LC0xNC43NDA5MyB2IC0yOS4xMTk0OCBsIC0yNi42MzA3NzgsMTQuODY4NjMgeiBtIC00LjgzNDg5MywwIC0yNi42MzA3NzksLTE0Ljc0MDkzIHYgLTI5LjExOTQ4IGwgMjYuNjMwNzc5LDE0Ljg2ODYzIHogTSAyMTAuMTE0MzYsMTg1LjQ1NzQzIFYgMTA4LjU1NzM1IEwgMTg5LjY4MTczLDk2LjcxMDk4MSBWIDE5Ny4zMjgwMiBaIG0gLTIwNS41MTIyODcyLDAgViAxMDguNTU3MzUgTCAyNS4wMzQ2OTYsOTYuNzEwOTgxIFYgMTk3LjMyODAyIFoiIHN0eWxlPSJvcGFjaXR5OjE7ZmlsbDojMzM2N2Q2O2ZpbGwtb3BhY2l0eToxO3N0cm9rZTpub25lO3N0cm9rZS13aWR0aDowLjI2NDU4M3B4O3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1vcGFjaXR5OjEiIGlkPSJwYXRoOTY3LTAtNiIvPiYjeGE7ICAgIDxwYXRoIGQ9Im0gMTM5Ljc5MjI1LDE2OC4yODM3OSAtMjYuMDI5NjQsLTE0LjUxMjkzIDI2LjAyOTY0LC0xNC40MTkzIDI2LjIxNjg5LDE0LjQxOTMgeiBNIDEwNy41ODE1NywxMTQuOTQxMTUgODEuNTUxOTM0LDEwMC40MjgyMiAxMDcuNTgxNTcsODYuMDA4OTE4IDEzMy43OTg0NiwxMDAuNDI4MjIgWiBtIC0zMi4yMTA2ODUsNTMuMzQyNjQgLTI2LjAyOTYzNCwtMTQuNTEyOTMgMjYuMDI5NjM0LC0xNC40MTkzIDI2LjIxNjg5NSwxNC40MTkzIHogbSA4Ni43OTQ3MDUsNjkuMDAxNTkgNDcuOTQ4NzcsLTI3Ljc4NzQ2IHYgLTI0LjA0MDQ5IGwgLTQ3Ljk0ODc3LDI3Ljg1ODIyIHogTSAyMTAuMTE0MzYsODQuNTUyNTU3IDE2Mi4xNjU1OSw1Ni43NjcxMjYgdiAyMy45NjU5MjEgbCA0Ny45NDg3NywyNy44MjQzMDMgeiBNIDUyLjU1MDgzNSwyMzcuMjg1MzggNC42MDIwNzI4LDIwOS40OTc5MiBWIDE4NS40NTc0MyBMIDUyLjU1MDgzNSwyMTMuMzE1NjUgWiBNIDQuNjAyMDcyOCw4NC41NTI1NTcgNTIuNTUwODM1LDU2Ljc2NzEyNiBWIDgwLjczMzA0NyBMIDQuNjAyMDcyOCwxMDguNTU3MzUgWiIgc3R5bGU9Im9wYWNpdHk6MTtmaWxsOiM1Yzg1ZGU7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjAuMjY0NTgzcHg7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW9wYWNpdHk6MSIgaWQ9InBhdGg5NjktOCIvPiYjeGE7ICA8L2c+JiN4YTs8L3N2Zz4=;', 
		    		s * 42, s * 37, 'Artifact\nRegistry', null, null, null, this.getTagsForStencil(gn, '', dt + 'artifact registry').join(' '))
	 	];
		
		this.addPalette('gcp2Icons CI CD', 'GCP Icons / CI/CD', false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addGCP2IconsAPIManagementPalette = function()
	{
		var sb = this;
		var s = 1;
		var n = 'sketch=0;html=1;verticalAlign=top;labelPosition=center;verticalLabelPosition=bottom;align=center;spacingTop=-6;fontSize=11;fontStyle=1;fontColor=#999999;shape=image;aspect=fixed;imageAspect=0;';
		var dt = 'gcp google cloud platform icons icon api management application programming interface ';
		var gn = 'mxgraph.gcp2';
		var fns = [];
		
		var fns = [
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwLjAxMDAwMDIyODg4MTgzNiIgaGVpZ2h0PSI5LjQ5NDcyOTA0MjA1MzIyMyIgdmlld0JveD0iMC4wMDAyMDYzODQ1NjA0NDI1Mjk2MiAwIDIwLjAxMDAwMDIyODg4MTgzNiA5LjQ5NDcyOTA0MjA1MzIyMyI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJLnN0MXtmaWxsOiM2NjlkZjY7fSYjeGE7CS5zdDJ7ZmlsbDojYWVjYmZhO30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xLjQ3NiA4LjQzYTQuMzEgNC4zMSAwIDEgMSA2LjA3LS40IDMuNjggMy42OCAwIDAgMS0uMzkuNCA0LjMyIDQuMzIgMCAwIDEtNS42OCAwem01LjItNS4yYTMuMDcgMy4wNyAwIDEgMC0uNCA0LjMzIDMgMyAwIDAgMCAuNC0uNCAzLjA3IDMuMDcgMCAwIDAgMC0zLjkzem02LjE5IDUuMmE0LjMxIDQuMzEgMCAxIDEgNi4wNy0uNCAzLjc4IDMuNzggMCAwIDEtLjQuNCA0LjMxIDQuMzEgMCAwIDEtNS42NyAwem01LjItNS4yYTMuMDcgMy4wNyAwIDEgMC0uNCA0LjMzIDMgMyAwIDAgMCAuNC0uNCAzLjA4IDMuMDggMCAwIDAgMC0zLjkzeiIvPiYjeGE7CTxnIGNsYXNzPSJzdDEiPiYjeGE7CQk8Y2lyY2xlIGN4PSI0LjMxNiIgY3k9IjUuMTkiIHI9IjEuNjkiLz4mI3hhOwkJPGNpcmNsZSBjeD0iMTUuNjk2IiBjeT0iNS4xOSIgcj0iMS42OSIvPiYjeGE7CTwvZz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMTIuMzk2LjU2YS4zMS4zMSAwIDAgMC0uMTgtLjU2aC00LjQyYS4zMS4zMSAwIDAgMC0uMTguNTYgNS43MyA1LjczIDAgMCAxIDIuMTMgMi45Mi4yOC4yOCAwIDAgMCAuMzYuMTYuMjkuMjkgMCAwIDAgLjE3LS4xNyA1LjY3IDUuNjcgMCAwIDEgMi4xMi0yLjkxeiIvPiYjeGE7PC9zdmc+;', 
		    		s * 42, s * 19, 'API Analytics', null, null, null, this.getTagsForStencil(gn, '', dt + 'api analytics application programming interface').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE4LjMwMDAwMTE0NDQwOTE4IiBoZWlnaHQ9IjE5LjgyNjUwNTY2MTAxMDc0MiIgdmlld0JveD0iLTguNzkxNTE5NjkwMDIxMjMyZS04IDAgMTguMzAwMDAxMTQ0NDA5MTggMTkuODI2NTA1NjYxMDEwNzQyIj4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0fSYjeGE7CS5zdDF7ZmlsbDojYWVjYmZhfSYjeGE7CS5zdDJ7ZmlsbDojNjY5ZGY2fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTMuMDEgMTguNDlhMS41MSAxLjUxIDAgMCAxLTMgMGgwdi00LjI4YTEuNTEgMS41MSAwIDEgMSAzIDB6bTUuMTMgMGExLjUxIDEuNTEgMCAwIDEtMyAwaDB2LTQuMjhhMS41MSAxLjUxIDAgMCAxIDMgMHptNS4wNiAwYTEuNTEgMS41MSAwIDAgMS0zIDB2LTQuMjhhMS41MSAxLjUxIDAgMCAxIDMgMHptNS4wOSAwYTEuNTEgMS41MSAwIDAgMS0zIDB2LTQuMjhhMS41MSAxLjUxIDAgMSAxIDMgMHoiLz4mI3hhOwk8Y2lyY2xlIGNsYXNzPSJzdDEiIGN4PSI2LjU5IiBjeT0iOS45NyIgcj0iMS41MSIvPiYjeGE7CTxjaXJjbGUgY2xhc3M9InN0MiIgY3g9IjExLjY5IiBjeT0iOS45NyIgcj0iMS41MSIvPiYjeGE7CTxjaXJjbGUgY2xhc3M9InN0MSIgY3g9IjExLjY5IiBjeT0iNS43NCIgcj0iMS41MSIvPiYjeGE7CTxnIGNsYXNzPSJzdDIiPiYjeGE7CQk8Y2lyY2xlIGN4PSIxNi43OCIgY3k9IjkuOTciIHI9IjEuNTEiLz4mI3hhOwkJPGNpcmNsZSBjeD0iMTYuNzgiIGN5PSI1Ljc0IiByPSIxLjUxIi8+JiN4YTsJPC9nPiYjeGE7CTxjaXJjbGUgY2xhc3M9InN0MSIgY3g9IjE2Ljc4IiBjeT0iMS41MSIgcj0iMS41MSIvPiYjeGE7PC9zdmc+;', 
		    		s * 42, s * 42, 'API\nMonetization', null, null, null, this.getTagsForStencil(gn, '', dt + 'api monetization application programming interface').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwLjE4MDIzMTA5NDM2MDM1IiBoZWlnaHQ9IjIwLjE4MDIwODIwNjE3Njc1OCIgdmlld0JveD0iLTAuMDAwMTE1MTY1MTIzMTMzOTIwMTMgLTAuMDAwMTAzMzQ0NDkzMjU0NTUzNTMgMjAuMTgwMjMxMDk0MzYwMzUgMjAuMTgwMjA4MjA2MTc2NzU4Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNjY5ZGY2O2ZpbGwtcnVsZTpldmVub2RkfSYjeGE7CS5zdDF7ZmlsbC1ydWxlOmV2ZW5vZGQ7ZmlsbDojNDI4NWY0fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTMuMjkgMTAuMDlsMS4zMi0xLjMyLTEuNzktMS43OWEyLjk0IDIuOTQgMCAwIDEgMi4wOC01IDIuOTIgMi45MiAwIDAgMSAyLjA3Ljg2bDEuOCAxLjc5IDEuMzItMS4zNEw4LjMgMS41YTQuODEgNC44MSAwIDEgMC02LjggNi44em0xMy42IDBsLTEuMzIgMS4zMiAxLjc5IDEuOGEyLjk0IDIuOTQgMCAwIDEtNC4xNiA0LjE1bC0xLjc5LTEuNzktMS4zMiAxLjMyIDEuNzkgMS43OWE0LjgxIDQuODEgMCAxIDAgNi44LTYuOHoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNNi45OCAxNy4zNmEyLjk0IDIuOTQgMCAxIDEtNC4xNi00LjE2bDEuNzktMS43OSA0LjE2IDQuMTZ6bTYuMjMtMTQuNTRhMi45MyAyLjkzIDAgMCAxIDUgMi4wOCAzIDMgMCAwIDEtLjg2IDIuMDhsLTEuNzkgMS43OS00LjE1LTQuMTZ6bS0zLjEyIDEwLjQ2YTMuMiAzLjIgMCAwIDEtMy4xOS0zLjE5aDBhMy4yMSAzLjIxIDAgMCAxIDMuMTktMy4xOWgwYTMuMjEgMy4yMSAwIDAgMSAzLjE5IDMuMTloMGEzLjIgMy4yIDAgMCAxLTMuMTkgMy4xOXptNi44LTMuMTlsMS43OS0xLjc5QTQuODEgNC44MSAwIDAgMCAxNi41NzQuMTUzIDQuODEgNC44MSAwIDAgMCAxMS44OCAxLjVsLTEuNzkgMS43OS02LjggNi44LTEuNzkgMS43OWE0LjgxIDQuODEgMCAwIDAgMi4xMDYgOC4xNDdBNC44MSA0LjgxIDAgMCAwIDguMyAxOC42OGwxLjc5LTEuNzl6Ii8+JiN4YTs8L3N2Zz4=;', 
		    		s * 42, s * 42, 'Apigee API\nPlatform', null, null, null, this.getTagsForStencil(gn, '', dt + 'apigee api platform application programming interface').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwLjAwMDMyOTk3MTMxMzQ3NyIgaGVpZ2h0PSIyMC4wMDAxNjQwMzE5ODI0MjIiIHZpZXdCb3g9Ii0wLjAwMDE2NDgyMzAwOTk4MTc3MzggLTAuMDAwMTY0ODgzMTA5MzkxNjY2OTUgMjAuMDAwMzI5OTcxMzEzNDc3IDIwLjAwMDE2NDAzMTk4MjQyMiI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNH0mI3hhOwkuc3Qxe2ZpbGw6IzY2OWRmNn0mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYX0mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xOS40MiA3bC0uMzUtLjA5TDE4IDYuNjRsLS4wOS0uMTljLS4wNS0uMDktLjA5LS4xOS0uMTQtLjI5bC0uMTQtLjI3LS4xNi0uMjgtLjE2LS4yNi0uMTctLjI2YTIuMzUgMi4zNSAwIDAgMC0uMTktLjI1bC0uMTktLjI1LS4yLS4yNC0uMi0uMjMtLjI2LS4yMi0uMjItLjIyLS4yNC0uMi0uMjMtLjItLjI1LS4xOS0uMjUtLjE5LS4yNi0uMTctLjI2LS4xNi0uMjgtLjE2LS4yNy0uMTQtLjI5LS4xNC0uMTktLjA4LS4yOS0xLjEyTDEzIC41OGEuNzguNzggMCAwIDAtLjc3LS41OEg3Ljc3QS43OC43OCAwIDAgMCA3IC41OGwtLjA5LjM1LS4yNyAxLjEyLS4xOS4wOC0uMjkuMTQtLjI3LjE0LS4yOC4xNi0uMjYuMTYtLjI2LjE3LS4yNS4xOS0uMjUuMTktLjI0LjItLjIzLjItLjIyLjIyLS4yMi4yMi0uMi4yNGEyLjIgMi4yIDAgMCAwLS4yLjIzYy0uMDcuMDgtLjEzLjE3LS4xOS4yNWEyLjM1IDIuMzUgMCAwIDAtLjE5LjI1bC0uMTcuMjYtLjE2LjI2LS4xNi4yOGMwIC4wOS0uMS4xOC0uMTQuMjdsLS4xNC4yOWMtLjA1LjA5LS4wNi4xMy0uMDguMTlsLTEuMTIuMjlMLjU4IDdhLjc4Ljc4IDAgMCAwLS41OC43N3Y0LjQ2YS43OC43OCAwIDAgMCAuNTguNzVsLjM1LjA5IDEuMTIuMjljMCAuMDYuMDYuMTIuMDguMTlzLjA5LjE5LjE0LjI5bC4xNC4yNy4xNi4yOC4xNi4yNi4xNy4yNmEyLjM1IDIuMzUgMCAwIDAgLjE5LjI1bC4xOS4yNWEyLjIgMi4yIDAgMCAwIC4yLjIzbC4yLjI0LjIyLjIyLjIyLjIyLjI0LjIuMjMuMi4yNS4xOS4yNS4xOS4yNi4xNy4yNi4xNi4yOC4xNi4yNy4xNC4yOS4xNC4xOS4wOC4yOSAxLjEyLjA5LjM1YS43OC43OCAwIDAgMCAuNzUuNThoNC40NmEuNzguNzggMCAwIDAgLjc1LS41OGwuMDktLjM1LjI5LTEuMDcuMTktLjA4LjI5LS4xNC4yNy0uMTQuMjgtLjE2LjI2LS4xNi4yNi0uMTcuMjUtLjE5LjI1LS4xOS4yNC0uMi4yMy0uMi4yMi0uMjIuMjItLjIyLjItLjI0YTIuMiAyLjIgMCAwIDAgLjItLjIzYy4wNy0uMDguMTMtLjE3LjE5LS4yNWEyLjM1IDIuMzUgMCAwIDAgLjE5LS4yNWwuMTctLjI2LjE2LS4yNi4xNi0uMjguMTQtLjI3LjE0LS4yOWMuMDUtLjA5LjA2LS4xMy4wOC0uMTlsMS4xMi0uMjkuMzUtLjA5YS43OC43OCAwIDAgMCAuNTgtLjc1VjcuNzdhLjc4Ljc4IDAgMCAwLS41OC0uNzd6TTEwIDE2LjY3QTYuNjYgNi42NiAwIDEgMSAxNi42NyAxMGE2LjUzIDYuNTMgMCAwIDEtLjE0IDEuMzNBNi42NCA2LjY0IDAgMCAxIDEwIDE2LjY3eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xMCA0Ljg4QTUuMTcgNS4xNyAwIDAgMCA4Ljg5IDVsLjI3IDEuMjNhMy44NiAzLjg2IDAgMSAxLTIuOTMgNC42MSA0IDQgMCAwIDEtLjA5LS44NEg0Ljg4QTUuMTIgNS4xMiAwIDEgMCAxMCA0Ljg4eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xMCA3LjQyYTIuNiAyLjYgMCAwIDAtLjU2LjA2bC4yNyAxLjI0YTEuMzIgMS4zMiAwIDEgMS0xIDEuNTcgMS40MyAxLjQzIDAgMCAxIDAtLjI5SDcuNDJBMi41OCAyLjU4IDAgMSAwIDEwIDcuNDJ6Ii8+JiN4YTs8L3N2Zz4=;', 
		    		s * 42, s * 42, 'Apigee\nSense', null, null, null, this.getTagsForStencil(gn, '', dt + 'apigee sense').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE5Ljk1MDAwMDc2MjkzOTQ1MyIgaGVpZ2h0PSIxMiIgdmlld0JveD0iMCAwIDE5Ljk1MDAwMDc2MjkzOTQ1MyAxMiI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNH0mI3hhOwkuc3Qxe2ZpbGw6I2FlY2JmYX0mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik02IDZsMSAyaDZsMS0yLTEtMkg3eiIgZmlsbD0iIzQyODVmNCIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik03LjUxIDRIN0w2IDZoOGwtMS0yeiIgZmlsbD0iI2FlY2JmYSIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xNi45NyA2bDEuNS0yLjI1TDE2IDBoLTN6IiBmaWxsPSIjNDI4NWY0Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTE2Ljk3IDZoMEwxMyAxMmgzbDMuOTUtNi0xLjQ4LTIuMjV6IiBmaWxsPSIjYWVjYmZhIi8+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTIuOTggNmwtMS41IDIuMjVMMy45NSAxMmgzeiIgZmlsbD0iIzQyODVmNCIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0yLjk4IDZoMGwzLjk3LTZoLTNMMCA2bDEuNDggMi4yNXoiIGZpbGw9IiNhZWNiZmEiLz4mI3hhOzwvc3ZnPg==;', 
		    		s * 42, s * 25, 'Cloud\nEndpoints', null, null, null, this.getTagsForStencil(gn, '', dt + 'cloud endpoints').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE0LjE0MzAxOTY3NjIwODQ5NiIgdmlld0JveD0iMCAwLjAwMDQ4OTk2NjI0NTM2ODEyMzEgMjAgMTQuMTQzMDE5Njc2MjA4NDk2Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qxe2ZpbGw6IzY2OWRmNjt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTAgMS40NzJhNS41OSA1LjU5IDAgMCAxIDQgMS42bDEtMWE3LjA3IDcuMDcgMCAwIDAtMTAgMGgwbDEgMWE1LjU5IDUuNTkgMCAwIDEgNC0xLjZ6bTAgMTEuMmE1LjU5IDUuNTkgMCAwIDEtNC0xLjZsLTEgMWE3LjA3IDcuMDcgMCAwIDAgMTAgMGgwbC0xLTFhNS41OSA1LjU5IDAgMCAxLTQgMS42eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xMCAxMC4xNDJhMy4wNiAzLjA2IDAgMCAxLTMtMi4zNEgzLjExdjIuMzhMMCA3LjA3MmwzLjExLTMuMXYyLjM4SDdhMy4wNiAzLjA2IDAgMCAxIDMtMi4zNGgwYTMuMDYgMy4wNiAwIDAgMSAzIDIuMzRoMy45MXYtMi4zOUwyMCA3LjA3MmwtMy4xMSAzLjEydi0yLjM5SDEzYTMuMDYgMy4wNiAwIDAgMS0zIDIuMzR6bTAtNC42OGExLjYxIDEuNjEgMCAxIDAgMS42MSAxLjYxaDBBMS42MSAxLjYxIDAgMCAwIDEwIDUuNDYyeiIvPiYjeGE7PC9zdmc+;', 
		    		s * 42, s * 29, 'Developer\nPortal', null, null, null, this.getTagsForStencil(gn, '', dt + 'developer portal').join(' '))
	 	];
		
		this.addPalette('gcp2Icons API Management', 'GCP Icons / API Management', false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addGCP2IconsInternetOfThingsPalette = function()
	{
		var sb = this;
		var s = 1;
		var n = 'sketch=0;html=1;verticalAlign=top;labelPosition=center;verticalLabelPosition=bottom;align=center;spacingTop=-6;fontSize=11;fontStyle=1;fontColor=#999999;shape=image;aspect=fixed;imageAspect=0;';
		var dt = 'gcp google cloud platform icons icon iot internet of things ';
		var gn = 'mxgraph.gcp2';
		var fns = [];
		
		var fns = [
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE5LjcwNjUzMTUyNDY1ODIwMyIgaGVpZ2h0PSIxOS45ODM4MjE4Njg4OTY0ODQiIGZpbGwtcnVsZT0iZXZlbm9kZCIgdmlld0JveD0iLTAuMDAwMjA5NTQ2OTY4MTA4MDQzMDcgMC4wMDAxNzcyNDA4Mjg2MzQyMzk3MyAxOS43MDY1MzE1MjQ2NTgyMDMgMTkuOTgzODIxODY4ODk2NDg0Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qxe2ZpbGw6IzY2OWRmNjt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTAuMzQ1IDEwLjM5NnYtNC40M2gwYTEuMTQgMS4xNCAwIDAgMC0uNS0yLjE2NCAxLjE0IDEuMTQgMCAwIDAtLjUgMi4xNjR2NC40MmgtNC4yN3YtMi44MmExLjE0IDEuMTQgMCAwIDAtLjUzLTIuMTUgMS4xNCAxLjE0IDAgMCAwLS41MiAyLjE1djIuODNoLS4yMmEzLjgyIDMuODIgMCAwIDEtMi43MjItNi40ODUgMy44MiAzLjgyIDAgMCAxIDQuMTIyLS44OTUgNS4yMiA1LjIyIDAgMCAxIDkuNDQtLjA1IDQgNCAwIDAgMSAxLjIzLS4yaDBhMy44MyAzLjgzIDAgMSAxIDAgNy42NmgtLjI1di0yLjg2YTEuMTQgMS4xNCAwIDAgMC0uNTMtMi4xNDkgMS4xNCAxLjE0IDAgMCAwLS41MyAyLjE0OXYyLjgzeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik01LjA3NSAxMy4zNTZhMiAyIDAgMCAxIDEuNTQgMiAyLjA3IDIuMDcgMCAwIDEtNC4xMS4zNTQgMi4wNyAyLjA3IDAgMCAxIDEuNTItMi4zNTR2LTIuOTZoMXptLS41MyAzYTEgMSAwIDEgMCAwLTIgMSAxIDAgMSAwIDAgMnptMTEuMDgtM2EyLjA3IDIuMDcgMCAwIDEtLjUzIDQuMDcxIDIuMDcgMi4wNyAwIDAgMS0uNTMtNC4wNzF2LTIuOTVoMS4wNnptLS41MyAzYTEgMSAwIDAgMCAuMzktMS45NCAxIDEgMCAwIDAtMS4yNjggMS4zMDcgMSAxIDAgMCAwIC44NzguNjMzem0tNC43NS0uNDNoMGEyLjA2IDIuMDYgMCAwIDEtLjUgNC4wNTggMi4wNiAyLjA2IDAgMCAxLS41LTQuMDU4di01LjVoMS4wNnptLS41NCAzYTEgMSAwIDAgMCAuNTUtMS44MzIgMSAxIDAgMCAwLTEuNDggMS4yMTIgMSAxIDAgMCAwIC45My42eiIvPiYjeGE7PC9zdmc+;', 
		    		s * 42, s * 42, 'Cloud\nIoT Core', null, null, null, this.getTagsForStencil(gn, '', dt + 'cloud iot core internet of things').join(' '))
	 	];
		
		this.addPalette('gcp2Icons Internet of Things', 'GCP Icons / Internet of Things', false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addGCP2IconsDatabasesPalette = function()
	{
		var sb = this;
		var s = 1;
		var n = 'sketch=0;html=1;verticalAlign=top;labelPosition=center;verticalLabelPosition=bottom;align=center;spacingTop=-6;fontSize=11;fontStyle=1;fontColor=#999999;shape=image;aspect=fixed;imageAspect=0;';
		var dt = 'gcp google cloud platform icons icon databases ';
		var gn = 'mxgraph.gcp2';
		var fns = [];
		
		var fns = [
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE3Ljk1Njk3Nzg0NDIzODI4IiBoZWlnaHQ9IjIwLjAwOTI1NjM2MjkxNTA0IiB2aWV3Qm94PSItMC4wMDA0MjE5NjUxMTY0MDIxMzQzIDAuMDAwMDc0Njk5NTIxMDY0NzU4MyAxNy45NTY5Nzc4NDQyMzgyOCAyMC4wMDkyNTYzNjI5MTUwNCI+JiN4YTsJPHN0eWxlPiYjeGE7CQkuc3Qwe2ZpbGw6IzY2OWRmNjt9JiN4YTsJCS5zdDF7ZmlsbDojYWVjYmZhO30mI3hhOwkJLnN0MntmaWxsOiM0Mjg1ZjQ7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPGcgZmlsbC1ydWxlPSJldmVub2RkIj4mI3hhOwkJPHBhdGggZD0iTTEzLjE5NiA0LjQ0N2wtNC4yMi0yLjUxYTIuODYgMi44NiAwIDAgMS0xLjI1LTEuNzFjMCAwIC4xNi0uMzIuMzgtLjJsNS4yNSAzLjFjLjYzLjM3LjI0IDIgLjI0IDJhLjc3Ljc3IDAgMCAwLS40LS42OHoiIGNsYXNzPSJzdDAiLz4mI3hhOwkJPHBhdGggZD0iTTE0LjQ2NiAxMC42ODdhLjM1LjM1IDAgMCAxLS4xNi4zM2wtMSAuNjh2LTcuOTVjMC0uMjcuMTctLjU2LS4wNi0uN2wuOTIuNjhhLjczLjczIDAgMCAxIC4zNS42NXoiIGNsYXNzPSJzdDEiLz4mI3hhOwkJPHBhdGggZD0iTTguOTc2IDExLjU5N2EuMzYuMzYgMCAwIDEtLjItLjA2bC0zLjQ2LTIuMDZ2LjlsMy42NiAyLjE4LjI5LS41N3MtLjIyLS4zOS0uMjktLjM5em0uMiAxLjhhLjM2LjM2IDAgMCAxLS40IDBsLTMuNDYtMi4wNnYuNjZhLjQyLjQyIDAgMCAwIC4xOS4zNWwzLjI4IDJhLjM3LjM3IDAgMCAwIC4zOCAwIDIgMiAwIDAgMCAuMi0uNTJsLS4xOS0uMzl6IiBjbGFzcz0ic3QwIi8+JiN4YTsJCTxwYXRoIGQ9Ik04Ljk3NiAxMC43MjdsMy42Ni0yLjE4di0uNDNhLjM5LjM5IDAgMCAwLS4xOS0uMzRsLTMuMjgtMmEuMzcuMzcgMCAwIDAtLjM4IDBsLTMuMjggMmEuNDEuNDEgMCAwIDAtLjE5LjM0di40M3oiIGNsYXNzPSJzdDEiLz4mI3hhOwkJPHBhdGggZD0iTTguOTc2IDkuODI3bC0zLjQ3LTIuMDVhLjQxLjQxIDAgMCAwLS4xOS4zNHYuNDNsMy42NiAyLjE4LjI4LS41NnoiIGNsYXNzPSJzdDAiLz4mI3hhOwkJPGcgY2xhc3M9InN0MiI+JiN4YTsJCQk8cGF0aCBkPSJNOC45NzYgMTEuNTk3djFsMy42Ni0yLjE4di0uOWwtMy40NiAyLjAyYS42NS42NSAwIDAgMS0uMi4wNnptLjIgMS44YS4zNi4zNiAwIDAgMS0uMi4wNnYuOWEuNS41IDAgMCAwIC4yMS0uMDVsMy4yOC0yYS4zOS4zOSAwIDAgMCAuMTktLjM1di0uNjZ6Ii8+JiN4YTsJCQk8cGF0aCBkPSJNMTIuNDQ2IDcuNzc3bC0zLjQ3IDIuMDV2LjlsMy42Ni0yLjE4di0uNDNhLjM5LjM5IDAgMCAwLS4xOS0uMzR6Ii8+JiN4YTsJCTwvZz4mI3hhOwkJPHBhdGggZD0iTTQuNzU2IDE1LjUyN2w0LjE1IDIuNDdhMi43MiAyLjcyIDAgMCAxIDEuMjggMS44LjE4LjE4IDAgMCAxLS4yOC4xOGwtNS40NS0zLjIzYy0uNTMtLjMyLS4wNy0xLjg4LS4wNy0xLjg4YS43Ny43NyAwIDAgMCAuMzcuNjZ6IiBjbGFzcz0ic3QwIi8+JiN4YTsJCTxwYXRoIGQ9Ik0zLjQ4NiAxNS43Mjd2LTYuNTZhLjQxLjQxIDAgMCAxIC4xOS0uMzNsMS0uNTl2Ny45MWMwIC4yNyAwIC42OS4yMS44M2wtMS4wNi0uNjZhLjc1Ljc1IDAgMCAxLS4zNC0uNnoiIGNsYXNzPSJzdDEiLz4mI3hhOwkJPHBhdGggZD0iTTcuMTM2IDMuNDU3YS43NS43NSAwIDAgMC0uNzQgMGwtNC4yIDIuNTRhMi42MyAyLjYzIDAgMCAxLTIuMDguMjYuMjMuMjMgMCAwIDEgMC0uNGMuMTgtLjA5IDYuMzItMy43NCA2LjMyLTMuNzQuMjMtLjE0Ljc0IDEuMzkuNzQgMS4zOXoiIGNsYXNzPSJzdDAiLz4mI3hhOwkJPHBhdGggZD0iTTcuMTI2IDIuMDc3bDUuMzIgMy4xNWEuMzcuMzcgMCAwIDEgLjIuMzF2MS4xOGwtNi42Ny0zLjk2YS43NS43NSAwIDAgMC0uNzQgMGwxLjE4LS42OWEuNzEuNzEgMCAwIDEgLjczIDB6IiBjbGFzcz0ic3QxIi8+JiN4YTsJCTxwYXRoIGQ9Ik0xMC43OTYgMTYuNDg3YS43My43MyAwIDAgMCAuNzQgMGw0LjItMi40OWEyLjYzIDIuNjMgMCAwIDEgMi4xLS4yNS4yMS4yMSAwIDAgMSAwIC4zOGwtNi4zMyAzLjc1Yy0uMjIuMTQtLjc0LTEuNC0uNzQtMS40eiIgY2xhc3M9InN0MCIvPiYjeGE7CQk8cGF0aCBkPSJNNS40ODYgMTQuNzQ3YS41Ni41NiAwIDAgMS0uMTctLjMzdi0xLjE2bDYuNjYgMy45M2EuNjkuNjkgMCAwIDAgLjczIDBsLTEuMTguN2EuNy43IDAgMCAxLS43NCAweiIgY2xhc3M9InN0MSIvPiYjeGE7CQk8cGF0aCBkPSJNMy4yMzYgNy44MDdhLjc2Ljc2IDAgMCAwLS4zNy42NXY1YTIuNzUgMi43NSAwIDAgMS0uODcgMiAuMTguMTggMCAwIDEtLjMtLjEzdi03LjU2YzAtLjI4IDEuNTQgMCAxLjU0IDB6IiBjbGFzcz0ic3QwIi8+JiN4YTsJCTxwYXRoIGQ9Ik02Ljc0NiA0LjUxN2EuMzQuMzQgMCAwIDEgLjM2IDBsMSAuNTktNi4wOCAzLjU2YS43Ny43NyAwIDAgMC0uMzcuNjZ2LTEuMzlhLjcyLjcyIDAgMCAxIC4zOC0uNjR6IiBjbGFzcz0ic3QxIi8+JiN4YTsJCTxwYXRoIGQ9Ik0xNS4xNDYgMTEuNDM3di01YTIuODEgMi44MSAwIDAgMSAuODQtMmMwIDAgLjMzLS4xMS4zMS4yMXMwIDcuMzcgMCA3LjM3Yy0uMzEuMzctMS42MSAwLTEuNjEgMGEuODEuODEgMCAwIDAgLjQ2LS41OHoiIGNsYXNzPSJzdDAiLz4mI3hhOwkJPHBhdGggZD0iTTE1Ljk3NiAxMi42MDdsLTQuNzQgMi44NWEuMzUuMzUgMCAwIDEtLjM3IDBsLTEtLjU3IDYuMTEtMy42N2EuNzcuNzcgMCAwIDAgLjM3LS42NnYxLjQ0Yy0uMDIuMjMtLjM3LjYxLS4zNy42MXoiIGNsYXNzPSJzdDEiLz4mI3hhOwk8L2c+JiN4YTs8L3N2Zz4=;', 
		    		s * 38, s * 42, 'Cloud\nBigtable', null, null, null, this.getTagsForStencil(gn, '', dt + 'cloud bigtable').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE4LjQ1OTk5OTA4NDQ3MjY1NiIgZmlsbC1ydWxlPSJldmVub2RkIiB2aWV3Qm94PSIwIDAgMjAgMTguNDU5OTk5MDg0NDcyNjU2Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CQkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJCS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkJLnN0MntmaWxsOiNhZWNiZmE7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTguNjYgNS42M3Y0LjM2bC0zLjc3IDIuMTggMS4zNCAyLjMyTDEwIDEyLjMxbDMuNzcgMi4xOCAxLjM0LTIuMzItMy43Ny0yLjE4VjUuNjN6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTEwIDUuNjN2NS4xMmwtNC40NCAyLjU4LjY3IDEuMTZMMTAgMTIuMzFsMy43NyAyLjE4IDEuMzQtMi4zMi0zLjc3LTIuMThWNS42M3oiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNNi42MiA0Ljk1TDEwIDYuNzhWMy42N2wtMS4zNS0uNjJWMEw2LjYyIDEuMjJ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTEwIDYuNzhsMy4zOC0xLjgzVjEuMjJMMTEuMzUgMHYzLjA1TDEwIDMuNjd6bTYuMTQgNy41M2wtLjA4IDEuMzkgMi43IDEuNTMtMi4xOCAxLjItMy4yNC0xLjg3LjExLTMuODMgMy4yNy0yTDIwIDEyLjYxdjIuNDlsLTIuNjktMS41NXptLTEyLjI4IDBsLTEuMTctLjc2TDAgMTUuMXYtMi40OWwzLjIzLTEuODcgMy4yNyAyIC4xMSAzLjgzLTMuMTkgMS44OS0yLjE4LTEuMjMgMi43LTEuNTZ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTE2LjcyIDEwLjc1bC0zLjI3IDIuMDEgMi42OSAxLjU1IDEuMTYtLjc2TDIwIDE1LjFsLS4wNS0yLjQ5ek0zLjg2IDE0LjMxbDIuNjktMS41NS0zLjI3LTIuMDEtMy4yMyAxLjg2TDAgMTUuMWwyLjctMS41NXoiLz4mI3hhOzwvc3ZnPg==;', 
		    		s * 42, s * 38, 'Cloud\nSpanner', null, null, null, this.getTagsForStencil(gn, '', dt + 'cloud spanner').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE0LjY1OTk5OTg0NzQxMjExIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMTQuNjU5OTk5ODQ3NDEyMTEgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8c3R5bGU+JiN4YTsJCS5Ee2ZpbGwtcnVsZTpldmVub2RkfSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggZD0iTTcuMzMgMTUuMzV2LTMuMDFMMCA4LjQ0djMuMDF6bTAgNC42NXYtMy4wMUwwIDEzLjA5djMuMDF6IiBjbGFzcz0ic3QyIEQiLz4mI3hhOwk8cGF0aCBkPSJNMTQuNjYgOC40NGwtNy4zMyAzLjl2My4wMWw3LjMzLTMuOXptMCA0LjY1bC03LjMzIDMuOVYyMGw3LjMzLTMuOXoiIGNsYXNzPSJzdDEgRCIvPiYjeGE7CTxwYXRoIGQ9Ik03LjMzIDB2My4wMWw3LjMzIDMuOVYzLjl6IiBjbGFzcz0ic3QwIEQiLz4mI3hhOwk8cGF0aCBkPSJNMCA2LjkxbDcuMzMtMy45VjBMMCAzLjl6IiBjbGFzcz0iRCBzdDEiLz4mI3hhOwk8cGF0aCBkPSJNNy4zMyAxMC43OVY3Ljc3TDAgMy44N3YzLjAyeiIgY2xhc3M9IkQgc3QyIi8+JiN4YTsJPHBhdGggZD0iTTE0LjY2IDMuODdsLTcuMzMgMy45djMuMDJsNy4zMy0zLjl6IiBjbGFzcz0iRCBzdDEiLz4mI3hhOzwvc3ZnPg==;', 
		    		s * 32, s * 42, 'Cloud\nSQL', null, null, null, this.getTagsForStencil(gn, '', dt + 'cloud sql').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjMwIiBoZWlnaHQ9IjIxIiB2aWV3Qm94PSIwIDAgMzAgMjEiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJLnN0M3tmaWxsOiNmZmY7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggZD0iTTAgMGwxLjUgMS41aDZMOSAweiIgY2xhc3M9InN0MiIvPiYjeGE7CTxwYXRoIGQ9Ik05IDlWMEw3LjUgMS41djZ6IiBjbGFzcz0ic3QxIi8+JiN4YTsJPHBhdGggZD0iTTAgOWwxLjUtMS41di02TDAgMHoiIGNsYXNzPSJzdDIiLz4mI3hhOwk8cGF0aCBkPSJNOSA5TDcuNSA3LjVoLTZMMCA5eiIgY2xhc3M9InN0MCIvPiYjeGE7CTxwYXRoIGQ9Ik0xLjUgMS41aDZ2NmgtNnoiIGNsYXNzPSJzdDIiLz4mI3hhOwk8cGF0aCBkPSJNMTAuNSAwTDEyIDEuNWg2TDE5LjUgMHoiIGNsYXNzPSJzdDAiLz4mI3hhOwk8cGF0aCBkPSJNMTkuNSA5VjBMMTggMS41djZ6IiBjbGFzcz0ic3QxIi8+JiN4YTsJPHBhdGggZD0iTTEwLjUgOUwxMiA3LjV2LTZMMTAuNSAweiIgY2xhc3M9InN0MCIvPiYjeGE7CTxwYXRoIGQ9Ik0xOS41IDlMMTggNy41aC02TDEwLjUgOXoiIGNsYXNzPSJzdDEiLz4mI3hhOwk8cGF0aCBkPSJNMTIgMS41aDZ2NmgtNnoiIGNsYXNzPSJzdDMiLz4mI3hhOwk8cGF0aCBkPSJNMjEgMGwxLjUgMS41aDZMMzAgMHoiIGNsYXNzPSJzdDAiLz4mI3hhOwk8cGF0aCBkPSJNMzAgOVYwbC0xLjUgMS41djZ6IiBjbGFzcz0ic3QxIi8+JiN4YTsJPHBhdGggZD0iTTIxIDlsMS41LTEuNXYtNkwyMSAweiIgY2xhc3M9InN0MCIvPiYjeGE7CTxwYXRoIGQ9Ik0zMCA5bC0xLjUtMS41aC02TDIxIDl6IiBjbGFzcz0ic3QxIi8+JiN4YTsJPHBhdGggZD0iTTIyLjUgMS41aDZ2NmgtNnoiIGNsYXNzPSJzdDMiLz4mI3hhOwk8cGF0aCBkPSJNMCAxMmwxLjUgMS41aDZMOSAxMnoiIGNsYXNzPSJzdDAiLz4mI3hhOwk8cGF0aCBkPSJNOSAyMXYtOWwtMS41IDEuNXY2eiIgY2xhc3M9InN0MSIvPiYjeGE7CTxwYXRoIGQ9Ik0wIDIxbDEuNS0xLjV2LTZMMCAxMnoiIGNsYXNzPSJzdDAiLz4mI3hhOwk8cGF0aCBkPSJNOSAyMWwtMS41LTEuNWgtNkwwIDIxeiIgY2xhc3M9InN0MSIvPiYjeGE7CTxwYXRoIGQ9Ik0xLjUgMTMuNWg2djZoLTZ6IiBjbGFzcz0ic3QzIi8+JiN4YTsJPHBhdGggZD0iTTEwLjUgMTJsMS41IDEuNWg2bDEuNS0xLjV6IiBjbGFzcz0ic3QyIi8+JiN4YTsJPHBhdGggZD0iTTE5LjUgMjF2LTlMMTggMTMuNXY2eiIgY2xhc3M9InN0MSIvPiYjeGE7CTxwYXRoIGQ9Ik0xMC41IDIxbDEuNS0xLjV2LTZMMTAuNSAxMnoiIGNsYXNzPSJzdDIiLz4mI3hhOwk8cGF0aCBkPSJNMTkuNSAyMUwxOCAxOS41aC02TDEwLjUgMjF6IiBjbGFzcz0ic3QwIi8+JiN4YTsJPHBhdGggZD0iTTEyIDEzLjVoNnY2aC02em05LTEuNWwxLjUgMS41aDZMMzAgMTJ6IiBjbGFzcz0ic3QyIi8+JiN4YTsJPHBhdGggZD0iTTMwIDIxdi05bC0xLjUgMS41djZ6IiBjbGFzcz0ic3QxIi8+JiN4YTsJPHBhdGggZD0iTTIxIDIxbDEuNS0xLjV2LTZMMjEgMTJ6IiBjbGFzcz0ic3QyIi8+JiN4YTsJPHBhdGggZD0iTTMwIDIxbC0xLjUtMS41aC02TDIxIDIxeiIgY2xhc3M9InN0MCIvPiYjeGE7CTxwYXRoIGQ9Ik0yMi41IDEzLjVoNnY2aC02eiIgY2xhc3M9InN0MiIvPiYjeGE7PC9zdmc+;', 
		    		s * 42, s * 29, 'Datastore', null, null, null, this.getTagsForStencil(gn, '', dt + 'datastore').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjMyMy45MDU2MTAzOTg2NzUxNSIgaGVpZ2h0PSIzNzYuNDIyMjk0OTYzNjg0MDciIHZpZXdCb3g9Ii0wLjA5NzAwMDAwMjg2MTAyMjk1IDAuMjg3OTk5OTg3NjAyMjMzOSA4NS42OTk5OTY5NDgyNDIxOSA5OS41OTUwMDEyMjA3MDMxMiI+JiN4YTs8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojYWVjYmZhO30mI3hhOwkuc3Qxe2ZpbGw6IzY2OWRmNjt9JiN4YTsJLnN0MntmaWxsOiM0Mjg1ZjQ7fSYjeGE7PC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNLS4wOTcgNzUuODE1VjU1Ljg3NGw0Mi44NS0yMC4xODN2MTkuMDd6bTAtMzUuNDAzVjIwLjQ3MUw0Mi43NTMuMjg4djE5LjA3eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik04NS42MDMgNzUuODE1VjU1Ljg3NGwtNDIuODUtMjAuMTgzdjE5LjA3em0wLTM1LjQwM1YyMC40NzFMNDIuNzUzLjI4OHYxOS4wN3oiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNNDIuNzUzIDgwLjMxNGwxNi4yMTctNy41MjUgMjEuMDg0IDkuNzE3LTM3LjMwMSAxNy4zNzd6Ii8+JiN4YTs8L3N2Zz4=;', 
		    		s * 36, s * 42, 'Firestore', null, null, null, this.getTagsForStencil(gn, '', dt + 'firestore').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMjAgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMCAxLjk0aDMuMzN2Mi41OEgwem0wIDQuNTFoMy4zM3YyLjU4SDB6bTAgNC41MmgzLjMzdjIuNThIMHptMCA0LjUxaDMuMzN2Mi41OEgwek0xNi42NyAxLjk0SDIwdjIuNThoLTMuMzN6bTAgNC41MUgyMHYyLjU4aC0zLjMzem0wIDQuNTJIMjB2Mi41OGgtMy4zM3ptMCA0LjUxSDIwdjIuNThoLTMuMzN6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTE2LjY3IDEuOTRsMi42NiAyLjU4aC0yLjY2em0wIDQuNTFsMi42NiAyLjU4aC0yLjY2em0wIDQuNTJsMi42NiAyLjU4aC0yLjY2em0wIDQuNTFsMi42NiAyLjU5aC0yLjY2eiIgZmlsbC1ydWxlPSJldmVub2RkIi8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTMuMzMgMjBoMTMuMzRWMEgzLjMzem02LTlINmw0LjY3LTcuNzRWOUgxNGwtNC42NyA3Ljc0eiIgZmlsbC1ydWxlPSJldmVub2RkIi8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTE0IDkuMDNoLTMuMzNWMGg2djIwSDkuMzN2LTMuMjN6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4mI3hhOzwvc3ZnPg==;', 
		    		s * 42, s * 42, 'Memorystore', null, null, null, this.getTagsForStencil(gn, '', dt + 'memorystore').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwLjAwMTA0NTIyNzA1MDc4IiBoZWlnaHQ9IjIwLjAwMTA0NTIyNzA1MDc4IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHZpZXdCb3g9IjAgMCAyMC4wMDEwNDUyMjcwNTA3OCAyMC4wMDEwNDUyMjcwNTA3OCI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6I2FlY2JmYTt9JiN4YTsJLnN0MXtmaWxsOiM2NjlkZjY7fSYjeGE7CS5zdDJ7ZmlsbDojNDI4NWY0O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00LjczIDguODN2Mi42M2E0LjkxIDQuOTEgMCAwIDAgMS43MSAxLjc0VjguODN6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTcuODkgNi40MXY3LjUzQTcuNjIgNy42MiAwIDAgMCA5IDE0YTggOCAwIDAgMCAxIDBWNi40MXoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTEuNjQgOS44NnYzLjI5YTUgNSAwIDAgMCAxLjctMS44MlY5Ljg2eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xNS43NCAxNC4zMmwtMS40MiAxLjQyYS40Mi40MiAwIDAgMCAwIC42bDMuNTQgMy41NGEuNDIuNDIgMCAwIDAgLjU5IDBsMS40My0xLjQzYS40Mi40MiAwIDAgMCAwLS41OWwtMy41NC0zLjU0YS40Mi40MiAwIDAgMC0uNiAwIi8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTkgMGE5IDkgMCAxIDAgMCAxOEE5IDkgMCAxIDAgOSAwbTAgMTUuNjlhNi42OCA2LjY4IDAgMCAxIC4wMDctMTMuMzYgNi42OCA2LjY4IDAgMCAxIDQuNzI3IDExLjQwM0E2LjY4IDYuNjggMCAwIDEgOSAxNS42OSIvPiYjeGE7PC9zdmc+;', 
		    		s * 42, s * 42, 'BigQuery', null, null, null, this.getTagsForStencil(gn, '', dt + 'bigquery').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJzdmc4NzUzMSIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMjg0LjM1MTYyIDMwMi42MTMwNyIgaGVpZ2h0PSIzMDIuNjEzMDdtbSIgd2lkdGg9IjI4NC4zNTE2Mm1tIj4mI3hhOyAgJiN4YTsgIDxkZWZzIGlkPSJkZWZzODc1MjgiLz4mI3hhOyAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzUuNzQwNDUzLDMuMDI1MTM4NCkiIGlkPSJsYXllcjEiPiYjeGE7ICAgIDxwYXRoIGQ9Ik0gNDAxLjQ3ODUyLC0xMS40MzM1OTQgLTEzMC4xMjEwOSwyNTYuODMwMDggLTU0Ljg4NjcxOSwzMDMuNTM3MTEgNDAxLjUzMTI1LDczLjIwNzAzMSA4MzUuMjEyODksMjkxLjM4NjcyIDkyMy43MTQ4NCwyNTEuMjk0OTIgWiBNIC0xMzUuMDgyMDMsMzQyLjcxNjggdiA1MjcuMzA0NjggbCAyMS40Mjk2OSwxMC4yOTEwMiA1MjQuNzA1MDcsMjUxLjk4ODMgNTI4LjU4MDA4LC0yNjIuNjMyODMgViAzNjguNTY2NDEgbCAtNzUuNTg5ODQsMzQuMjQwMjMgViA4MjIuODIyMjcgTCA0MTAuNDg0MzgsMTA0OC4xNjk5IC01OS40OTAyMzQsODIyLjQ3NDYxIFYgMzg5LjY0NjQ4IFogbSAxNTIuODc4OTA1LDk0LjkxMjExIHYgMzEzLjYyOTQxIGwgNzUuNTkxNzk3LDM3LjEyNjE0IFYgNDg0LjU1ODU5IFogbSA3NTAuNDI5Njg1LDguNTgyMDMgLTc1LjU5MTc5LDM0LjI0MjE4IHYgMzIyLjU1MzYzIGwgNzUuNTkxNzksLTQ3Ljg3MTU1IHoiIHRyYW5zZm9ybT0ic2NhbGUoMC4yNjQ1ODMzMykiIHN0eWxlPSJjb2xvcjojMDAwMDAwO29wYWNpdHk6MTtmaWxsOiM1OTg2ZjI7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlLXdpZHRoOjMuNzc5NTM7LWlua3NjYXBlLXN0cm9rZTpub25lIiBpZD0icGF0aDExMzIiLz4mI3hhOyAgICA8cGF0aCBpZD0icGF0aDExMzQiIGQ9Im0gMTU2LjQ1ODQsMTY4Ljc2NTA2IC00OS42MTUyNCwyNi43NzIwNSAtNTUuMzkyMzE0LC0yNS4yNjA4OCB2IDIxLjkxNTk2IGwgNTUuMzkyMzE0LDI1Ljc1NTA4IDQ5LjYxNTI0LC0yNy4wMTY3MSB6IiBzdHlsZT0iY29sb3I6IzAwMDAwMDtvcGFjaXR5OjE7ZmlsbDojNzY5ZWY1O2ZpbGwtb3BhY2l0eToxOy1pbmtzY2FwZS1zdHJva2U6bm9uZSIvPiYjeGE7ICAgIDxwYXRoIGQ9Ik0gNTEuNDUwODQ2LDEyMi44MzQyMiAxMDYuODQzMTYsOTMuNTg1NjE0IDE1Ni40NTg0LDEyMi44MzQyMiB2IDIwLjQ3ODYyIEwgMTA2Ljg0MzE2LDE3MC42NDY3MSA1MS40NTA4NDYsMTQzLjMxMjg0IFogTSAxMDUuNDkwMiw0NC4xNTgwMjYgMTAuMjA2MDk1LDk1LjY2MzQxIDI5Ljc4MjE2MSwxMDcuODE2NjcgMTA1LjMzNTY5LDY2Ljk3Njc4OCAxNjcuMTU2MiwxMDEuNDc5MDggMTg5LjgwNzAyLDkxLjIxODIwNCBaIiBzdHlsZT0ib3BhY2l0eToxO2ZpbGw6I2I1Y2JmOTtmaWxsLW9wYWNpdHk6MTtzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MjA7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLW9wYWNpdHk6MSIgaWQ9InBhdGgxMTM2Ii8+JiN4YTsgIDwvZz4mI3hhOzwvc3ZnPg==;', 
		    		s * 39, s * 42, 'AlloyDB', null, null, null, this.getTagsForStencil(gn, '', dt + 'alloydb alloy database').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJzdmcyMjQxOCIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMTYzLjMzMzk3IDE2My4xNDQ1MyIgaGVpZ2h0PSIxNjMuMTQ0NTNtbSIgd2lkdGg9IjE2My4zMzM5N21tIj4mI3hhOyAgJiN4YTsgIDxkZWZzIGlkPSJkZWZzMjI0MTUiLz4mI3hhOyAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTI0LjAyMzIwNSwtNjYuOTkyOTY2KSIgaWQ9ImxheWVyMSI+JiN4YTsgICAgPHBhdGggZD0ibSAyNC4wMjMyMDUsMTIyLjM3NjczIHYgLTIwLjk3MzUxIGwgNTkuNzM2NTAxLDMzLjg5NDcgdiAyMS42Mjg5NCB6IG0gMCwzNi41MTM2NCB2IC0yMS42ODEwMyBsIDU5LjczNjUwMSwzNC44MTIyIHYgMjEuMzkzNDggeiBtIDAsMzYuNTAzMDggdiAtMjEuNjU4MzEgbCA1OS43MzY1MDEsMzQuNzI1MjIgdiAyMS42NzcxNCB6IiBzdHlsZT0ib3BhY2l0eToxO2ZpbGw6I2FlY2JmYTtmaWxsLW9wYWNpdHk6MTtzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MC4yNjQ1ODNweDtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2Utb3BhY2l0eToxIiBpZD0icGF0aDIyNzM5Ii8+JiN4YTsgICAgPHBhdGggZD0iTSAxMTAuMjA0NiwxMDUuMTQ4NDggODMuNzU5NzA2LDg5LjYyMzYyNCBWIDY2Ljk5Mjk2NiBsIDQ2LjIwMTIwNCwyNi42Mzg4MTIgeiBtIDMyLjExNTcsLTMuNjUxNjQgMjQuMTEwMTgsMC4wOTM2IFYgOTAuMjYxMDM0IGwgMjAuOTI2NywyMC45NzM1MTYgLTIwLjkyNjcsMjAuOTczNTIgdiAtMTEuMzI5NDUgaCAtMjAuNzM5NDQgbCAtNjEuOTMxMzM0LDM2LjA0ODI0IHYgLTIxLjYyODk0IHogbSAtNTguNTYwNTk0LDkxLjkxODE4IHYgLTIxLjM5MzQ4IGwgNTguNzc5OTk0LC0zNC4xMzEzIDE3LjI1MTkzLDAuMDY4MiB2IDE5LjU2NDMzIGwgLTE0LjM0MDc0LC0wLjA0MzUgeiBtIDU4LjUyNjUxNCwtMTguNjYyMSB2IDIxLjU4NjI2IEwgODMuNzU5NzA2LDIzMC4xMzc1IHYgLTIxLjY3NzE0IHoiIHN0eWxlPSJvcGFjaXR5OjE7ZmlsbDojNjY5ZGY2O2ZpbGwtb3BhY2l0eToxO3N0cm9rZTpub25lO3N0cm9rZS13aWR0aDowLjI2NDU4M3B4O3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1vcGFjaXR5OjEiIGlkPSJwYXRoMjI3NDMiLz4mI3hhOyAgICA8cGF0aCBpZD0icGF0aDIyNzQ1IiBkPSJNIDgzLjc1OTcwNiw2Ni45OTI5NjYgViA4OS42MjM2MjQgTCA0My45MjkzNjcsMTEyLjY0NTY5IDI0LjAyMzIwNSwxMDEuNDAzMjIgWiIgc3R5bGU9Im9wYWNpdHk6MTtmaWxsOiM0Mjg1ZjQ7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjAuMjY0NTgzcHg7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW9wYWNpdHk6MSIvPiYjeGE7ICA8L2c+JiN4YTs8L3N2Zz4=;', 
		    		s * 42, s * 42, 'Database Migration\nService', null, null, null, this.getTagsForStencil(gn, '', dt + 'database migration service').join(' '))
	 	];
		
		this.addPalette('gcp2Icons Databases', 'GCP Icons / Databases', false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addGCP2IconsStoragePalette = function()
	{
		var sb = this;
		var s = 1;
		var n = 'sketch=0;html=1;verticalAlign=top;labelPosition=center;verticalLabelPosition=bottom;align=center;spacingTop=-6;fontSize=11;fontStyle=1;fontColor=#999999;shape=image;aspect=fixed;imageAspect=0;';
		var dt = 'gcp google cloud platform icons icon storage ';
		var gn = 'mxgraph.gcp2';
		var fns = [];
		
		var fns = [
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE2IiB2aWV3Qm94PSIwIDAgMjAgMTYiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJLnN0M3tmaWxsOiNmZmY7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTAgMGgyMHY3SDB6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTE4IDBoMnY3aC0yeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xOCA3bDItN2gtMnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMCAwaDJ2N0gweiIvPiYjeGE7CTxnIGNsYXNzPSJzdDMiPiYjeGE7CQk8cGF0aCBkPSJNNCAzaDZ2MUg0eiIvPiYjeGE7CQk8cmVjdCB4PSIxMyIgeT0iMiIgd2lkdGg9IjMiIGhlaWdodD0iMyIgcng9IjEuNSIvPiYjeGE7CTwvZz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMCA5aDIwdjdIMHoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTggOWgydjdoLTJ6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTE4IDE2bDItN2gtMnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMCA5aDJ2N0gweiIvPiYjeGE7CTxnIGNsYXNzPSJzdDMiPiYjeGE7CQk8cGF0aCBkPSJNNCAxMmg2djFINHoiLz4mI3hhOwkJPHJlY3QgeD0iMTMiIHk9IjExIiB3aWR0aD0iMyIgaGVpZ2h0PSIzIiByeD0iMS41Ii8+JiN4YTsJPC9nPiYjeGE7PC9zdmc+;', 
		    		s * 42, s * 34, 'Cloud\nStorage', null, null, null, this.getTagsForStencil(gn, '', dt + 'cloud storage').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE2IiB2aWV3Qm94PSIwIDAgMjAgMTYiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTIgMTBIOEw2IDhoOHoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMTYgMkg0bDEtMmgxMHptMyAzSDFsMS0yaDE2eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xNCA3bC0yIDNIOEw2IDdIMHY5aDIwVjd6Ii8+JiN4YTs8L3N2Zz4=;', 
		    		s * 42, s * 34, 'Filestore', null, null, null, this.getTagsForStencil(gn, '', dt + 'filestore').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE1Ljg0MDAwMDE1MjU4Nzg5IiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMTUuODQwMDAwMTUyNTg3ODkgMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMCAxNi4yNVYyMGgxNS44NHYtOC4zM2gtMy43NXY0LjU4eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xNS44NCAzLjc1VjBIMHY4LjMzaDMuNzVWMy43NXoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMCAxMC40MnYzLjc1aDEwVjkuNThoNS44NFY1LjgzaC0xMHY0LjU5eiIvPiYjeGE7PC9zdmc+;', 
		    		s * 34, s * 42, 'Persistent\nDisk', null, null, null, this.getTagsForStencil(gn, '', dt + 'persistent disk').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJzdmczNjAwOCIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMTIxLjI1MDg4IDEwMC4wNjkyMyIgaGVpZ2h0PSIxMDAuMDY5MjNtbSIgd2lkdGg9IjEyMS4yNTA4OG1tIj4mI3hhOyAgJiN4YTsgIDxkZWZzIGlkPSJkZWZzMzYwMDUiLz4mI3hhOyAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTQ2LjIyMTU4LC05OC4zMzc4OCkiIGlkPSJsYXllcjEiPiYjeGE7ICAgIDxwYXRoIGQ9Im0gNzkuNjMyOTE4LDE0Ni45MDY4OSA2Ljc2MTM0NSw2LjY3NDAxIC0xNC4xNjk0MiwxNC4yODQ0IGggNDcuMDI4OTA3IHYgOS41MDAyIEggNzIuMjI0ODQzIGwgMTQuMjA4NjkyLDE0LjMzNjU5IC02LjczMDMzOSw2LjcwNTAyIC0yNS41NjYzOTQsLTI1LjY2NDA3IHogbSA2Mi4zNDM0MzIsLTIzLjcxOTU4IC02Ljc2MTM1LDYuNjc0MDEgMTQuMTY5NDIsMTQuMjg0NCBoIC00Ny4wMjg5MSB2IDkuNTAwMTkgaCA0Ny4wMjg5MSBsIC0xNC4yMDg2OSwxNC4zMzY2IDYuNzMwMzMsNi43MDUwMiAyNS41NjY0LC0yNS42NjQwNyB6IiBzdHlsZT0iY29sb3I6IzAwMDAwMDtvcGFjaXR5OjE7ZmlsbDojNDI4NWY0O2ZpbGwtb3BhY2l0eToxO3N0cm9rZS13aWR0aDoxOy1pbmtzY2FwZS1zdHJva2U6bm9uZSIgaWQ9InBhdGgzNjE0Mi02Ii8+JiN4YTsgICAgPHBhdGggaWQ9InBhdGgzNjE0NiIgZD0ibSAxMDUuMzM1OTQsOTguMzM3ODkxIGMgLTExLjEyNjE1NywtMC4wMDg1IC0xOS43MDYxNTEsNC45OTk5MjkgLTI1LjQ3ODUxOCwxMS4xNTQyOTkgLTQuODYwMjQ5LDUuMTgxODkgLTcuODUwMDUzLDExLjAzNjc3IC05LjY2MDE1NiwxNS45OTIxOSAtNy45MTYyNCwxLjUyOTA1IC0xNC45NzI2NTksNS44MzI0NCAtMTkuMDk5NjEsMTIuMTAxNTYgbCAtMC4wODIwMywwLjEyNSAtMC4wNzQyMiwwLjEyODkgYyAtMy44NTQxNTcsNi43NDA3NCAtNS4wNjQ5NTksMTIuNDUwODYgLTQuNjM4NjcyLDE3LjI5MTAyIDAuMjM0MDk5LDIuNjU4MDIgMC44OTI4Nyw0Ljk0NSAxLjYyNTExOCw2Ljk0OTk5IGwgNy45ODk2ODcsLTYuNjU1NTggYyAtMC4wNjcxMiwtMC4zNzM1IC0wLjExODQ2OCwtMC43NDg2NSAtMC4xNTE5MTQsLTEuMTI4NCAtMC4yNDI0LC0yLjc1MjI5IDAuMjUzNjU4LC02LjExNTY3IDMuMzMwMDc4LC0xMS41NTY2NCAyLjgwMDQzMiwtNC4xODk2NSA4Ljg1Mjc1NiwtNy44NjkzMyAxNS4xMDM1MTYsLTguNDIxODcgbCAzLjIwODk4NCwtMC4yODMyIDAuOTIzODI4LC0zLjA4NTk0IGMgMS4yNTQ5ODEsLTQuMTkwMDIgNC4wNDA3NTksLTEwLjI1NDYyIDguNDUzMTI1LC0xNC45NTg5OSA0LjQxMjM2NiwtNC43MDQzNiAxMC4xNzYxMywtOC4xNTg3NSAxOC41NTA3ODQsLTguMTUyMzQgeiIgc3R5bGU9ImNvbG9yOiMwMDAwMDA7b3BhY2l0eToxO2ZpbGw6I2FlY2JmYTtmaWxsLW9wYWNpdHk6MTstaW5rc2NhcGUtc3Ryb2tlOm5vbmUiLz4mI3hhOyAgICA8cGF0aCBpZD0icGF0aDM2MTQ4IiBkPSJtIDEwNS4zMzU5NCw5OC4zMzc4OTEgdiA5LjQ5OTk5OSBjIDkuNDA2OTksMCAxNi40NDYyOSwzLjY2MzUyIDIzLjU2OTA1LDEzLjkzMDExIGwgNi45OTQyOCwtNi41MzY0NSBDIDEyNy42MDIxOCwxMDMuOTc3ODYgMTE3LjE5MzcxLDk4LjMzNzg5MSAxMDUuMzM1OTQsOTguMzM3ODkxIFoiIHN0eWxlPSJjb2xvcjojMDAwMDAwO29wYWNpdHk6MTtmaWxsOiM2NjlkZjY7ZmlsbC1vcGFjaXR5OjE7LWlua3NjYXBlLXN0cm9rZTpub25lIi8+JiN4YTsgIDwvZz4mI3hhOzwvc3ZnPg==;', 
		    		s * 42, s * 35, 'Data Transfer', null, null, null, this.getTagsForStencil(gn, '', dt + 'data transfer').join(' '))
	 	];
		
		this.addPalette('gcp2Icons Storage', 'GCP Icons / Storage', false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addGCP2IconsSecurityPalette = function()
	{
		var sb = this;
		var s = 1;
		var n = 'sketch=0;html=1;verticalAlign=top;labelPosition=center;verticalLabelPosition=bottom;align=center;spacingTop=-6;fontSize=11;fontStyle=1;fontColor=#999999;shape=image;aspect=fixed;imageAspect=0;';
		var dt = 'gcp google cloud platform icons icon security ';
		var gn = 'mxgraph.gcp2';
		var fns = [];
		
		var fns = [
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE2LjQyMDAwMDA3NjI5Mzk0NSIgaGVpZ2h0PSIyMC4wNDk5OTkyMzcwNjA1NDciIGZpbGwtcnVsZT0iZXZlbm9kZCIgdmlld0JveD0iMCAwIDE2LjQyMDAwMDA3NjI5Mzk0NSAyMC4wNDk5OTkyMzcwNjA1NDciPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik04LjIxIDBMMCAzLjQydjUuNjNjMCA1LjA2IDMuNSA5LjggOC4yMSAxMSA0LjcxLTEuMTUgOC4yMS01Ljg5IDguMjEtMTAuOTVWMy40MnptMCAzLjc5YTIuNjMgMi42MyAwIDAgMSAxLjAwNSA1LjA2QTIuNjMgMi42MyAwIDAgMSA2LjM1IDQuNTZhMi42MyAyLjYzIDAgMCAxIDEuODYtLjc3em00LjExIDExLjE1YTguNjQgOC42NCAwIDAgMS00LjExIDIuOTMgOC42NCA4LjY0IDAgMCAxLTQuMTEtMi45M3YtMi4yNWMwLTEuNjcgMi43NC0yLjUyIDQuMTEtMi41MnM0LjExLjg1IDQuMTEgMi41MnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNOC4yMSAwdjMuNzlhMi42MyAyLjYzIDAgMSAxIDAgNS4yNnYxLjEyYzEuMzcgMCA0LjExLjg1IDQuMTEgMi41MnYyLjI1YTguNjQgOC42NCAwIDAgMS00LjExIDIuOTNWMjBjNC43MS0xLjE1IDguMjEtNS44OSA4LjIxLTEwLjk1VjMuNDJ6Ii8+JiN4YTs8L3N2Zz4=;', 
		    		s * 34, s * 42, 'Cloud\nIAM', null, null, null, this.getTagsForStencil(gn, '', dt + 'cloud iam').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE2LjQyMDAwMDA3NjI5Mzk0NSIgaGVpZ2h0PSIyMC4wNDk5OTkyMzcwNjA1NDciIGZpbGwtcnVsZT0iZXZlbm9kZCIgdmlld0JveD0iMCAwIDE2LjQyMDAwMDA3NjI5Mzk0NSAyMC4wNDk5OTkyMzcwNjA1NDciPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik04LjIxIDBMMCAzLjQydjUuNjNjMCA1LjA2IDMuNSA5LjggOC4yMSAxMSA0LjcxLTEuMTUgOC4yMS01Ljg5IDguMjEtMTAuOTVWMy40MnptMCAzLjc5YTIuNjMgMi42MyAwIDAgMSAxLjAwNSA1LjA2QTIuNjMgMi42MyAwIDAgMSA2LjM1IDQuNTZhMi42MyAyLjYzIDAgMCAxIDEuODYtLjc3em00LjExIDExLjE1YTguNjQgOC42NCAwIDAgMS00LjExIDIuOTMgOC42NCA4LjY0IDAgMCAxLTQuMTEtMi45M3YtMi4yNWMwLTEuNjcgMi43NC0yLjUyIDQuMTEtMi41MnM0LjExLjg1IDQuMTEgMi41MnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNOC4yMSAwdjMuNzlhMi42MyAyLjYzIDAgMSAxIDAgNS4yNnYxLjEyYzEuMzcgMCA0LjExLjg1IDQuMTEgMi41MnYyLjI1YTguNjQgOC42NCAwIDAgMS00LjExIDIuOTNWMjBjNC43MS0xLjE1IDguMjEtNS44OSA4LjIxLTEwLjk1VjMuNDJ6Ii8+JiN4YTs8L3N2Zz4=;', 
		    		s * 34, s * 42, 'Cloud Resource\nManager', null, null, null, this.getTagsForStencil(gn, '', dt + 'cloud resource manager').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE3LjI3OTk5ODc3OTI5Njg3NSIgdmlld0JveD0iMCAwIDIwIDE3LjI3OTk5ODc3OTI5Njg3NSI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJLnN0MXtmaWxsOiM2NjlkZjY7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPGNpcmNsZSBjbGFzcz0ic3QwIiBjeD0iOS40NCIgY3k9IjguMTQiIHI9IjIuOTciLz4mI3hhOwk8ZyBjbGFzcz0ic3QxIj4mI3hhOwkJPGNpcmNsZSBjeD0iMi4wMiIgY3k9IjcuNDMiIHI9IjIuMDIiLz4mI3hhOwkJPGNpcmNsZSBjeD0iMTIuNTIiIGN5PSIxNS4yNiIgcj0iMi4wMiIvPiYjeGE7CQk8cGF0aCBkPSJNMTcuNTcuODRBMi40MyAyLjQzIDAgMSAwIDIwIDMuMjcgMi40MyAyLjQzIDAgMCAwIDE3LjU3Ljg0em0wIDMuOGExLjM3IDEuMzcgMCAxIDEgMS4zNi0xLjM3aDBhMS4zNyAxLjM3IDAgMCAxLTEuMzYgMS4zN3oiLz4mI3hhOwkJPHBhdGggZD0iTTE2LjIgMy4zMkE4LjI5IDguMjkgMCAwIDAgMTEuMTQgMGwtLjI4IDEuMzRhNi45NSA2Ljk1IDAgMSAxLTguMjIgNS4zOCA2Ljg4IDYuODggMCAwIDEgMS44Ny0zLjQ3bC0xLTFhOC4zMSA4LjMxIDAgMSAwIDEzLjM4IDIuMiAxLjM2IDEuMzYgMCAwIDEtLjY5LTEuMTN6Ii8+JiN4YTsJPC9nPiYjeGE7PC9zdmc+;', 
		    		s * 42, s * 36, 'Web Security\nScanner', null, null, null, this.getTagsForStencil(gn, '', dt + 'web security scanner').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjMxMC43NzU2MDY1NDM4NjAyNSIgaGVpZ2h0PSIzNzcuOTUzMDI4ODM1NTI1NDYiIHZpZXdCb3g9Ii0wLjE0MDAwMDAwMDU5NjA0NjQ1IC0wLjQ2NzAwMDAwNzYyOTM5NDUzIDgyLjIyNTk5NzkyNDgwNDY5IDEwMC4wMDAwMDc2MjkzOTQ1MyI+JiN4YTs8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qxe2ZpbGw6IzY2OWRmNjt9JiN4YTsJLnN0MntmaWxsOiNmZmY7fSYjeGE7PC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDAuOTczLS40NjdsNDEuMTEzIDE3LjQ5M3YyOS42NTRjMCAyNy40MTgtMjQuNjA4IDUwLjgzNi00MS4xMTMgNTIuODUzeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik00MC45NzMtLjQ2N0wtLjE0IDE3LjAyNXYyOS42NTRjMCAyNy40MTggMjQuNjA4IDUwLjgzNiA0MS4xMTMgNTIuODUzeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik00MS4yNTMgMTYuNjA1Yy05LjU4NCAwLTE3LjQ0NSA3Ljg2Mi0xNy40NDUgMTcuNDQ1IDAgOC4wODQgNS41OTQgMTQuOTQyIDEzLjA5NiAxNi44OTF2OS40ODhoLTkuODY5djguNzAxaDkuODY5djUuMzc3aC02LjMxNXY4LjcwMWg2LjMxNXYyLjE5N2g4LjcwMVY1MC45NDFDNTMuMTA2IDQ4Ljk5MiA1OC43IDQyLjEzNCA1OC43IDM0LjA1YzAtOS41ODQtNy44NjMtMTcuNDQ1LTE3LjQ0Ny0xNy40NDV6bTAgOC42OTlBOC42OCA4LjY4IDAgMCAxIDUwIDM0LjA1YTguNjggOC42OCAwIDAgMS04Ljc0OCA4Ljc0NiA4LjY4IDguNjggMCAwIDEtOC43NDYtOC43NDYgOC42OCA4LjY4IDAgMCAxIDguNzQ2LTguNzQ2eiIvPiYjeGE7PC9zdmc+;', 
		    		s * 34, s * 42, 'Cloud Key\nManagement', null, null, null, this.getTagsForStencil(gn, '', dt + 'cloud key management').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE3LjE4MDAwMDMwNTE3NTc4IiBoZWlnaHQ9IjIwIiB2aWV3Qm94PSIwIDAgMTcuMTgwMDAwMzA1MTc1NzggMjAiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik05LjkgNC44NWE1LjIzIDUuMjMgMCAwIDEgMy43NSAzLjc1aDMuNTNWMy4yNEw5LjkgMHpNMy41MiA4LjYxYTUuMjIgNS4yMiAwIDAgMSAzLjc1LTMuNzVWMEwwIDMuMjR2NS4zN3pNNy4yOCAxNWE1LjIzIDUuMjMgMCAwIDEtMy43NS0zLjc1SC4yMkExMiAxMiAwIDAgMCA3LjI4IDIwem02LjM4LTMuNzVBNS4yMyA1LjIzIDAgMCAxIDkuOTEgMTV2NWExMiAxMiAwIDAgMCA3LjA1LTguNzV6Ii8+JiN4YTsJPGNpcmNsZSBjbGFzcz0ic3QxIiBjeD0iOC41OSIgY3k9IjkuOTIiIHI9IjIuNjMiLz4mI3hhOzwvc3ZnPg==;', 
		    		s * 36, s * 42, 'Security\nCommand Center', null, null, null, this.getTagsForStencil(gn, '', dt + 'security command center').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJzdmc5NjI2MCIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMTE3Ljg5NTk1IDE1Mi4yMDc1MyIgaGVpZ2h0PSIxNTIuMjA3NTNtbSIgd2lkdGg9IjExNy44OTU5NW1tIj4mI3hhOyAgJiN4YTsgIDxkZWZzIGlkPSJkZWZzOTYyNTciLz4mI3hhOyAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTQ1LjI3MzMxNywtNzEuNTI1NTk3KSIgaWQ9ImxheWVyMSI+JiN4YTsgICAgPHBhdGggaWQ9InJlY3Q5NjM3OCIgZD0iTSA0NS4yNzMzMTcsNzEuNTI1NTk3IEggMTYzLjE2NTA2IFYgMTAxLjg3MzMzIEggNDUuMjczMzE3IFoiIHN0eWxlPSJjb2xvcjojMDAwMDAwO29wYWNpdHk6MTtmaWxsOiM0Mjg1ZjQ7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlLXdpZHRoOjEzO3N0cm9rZS1saW5lam9pbjpyb3VuZDstaW5rc2NhcGUtc3Ryb2tlOm5vbmUiLz4mI3hhOyAgICA8cGF0aCBpZD0icGF0aDk2NTAxIiBkPSJtIDQ1LjI3MzMxNywxNjUuNTIwMjEgdiAtNjMuNjQ2ODggbCAzMC4zOTQxNjgsMTguOTU4NDggdiAyNS41MTQ2NiB6IiBzdHlsZT0iY29sb3I6IzAwMDAwMDtvcGFjaXR5OjE7ZmlsbDojMzRhODUzO2ZpbGwtb3BhY2l0eToxO3N0cm9rZS13aWR0aDowLjI2NDU4M3B4Oy1pbmtzY2FwZS1zdHJva2U6bm9uZSIvPiYjeGE7ICAgIDxwYXRoIGlkPSJwYXRoOTY1MDMiIGQ9Im0gNTIuMTI1NDc2LDE5MS4xNjM5NiBjIC00Ljc5NDMxOCwtMi45NzM0IC02Ljg1MjE1OSwtNi40NjQyNiAtNi44NTIxNTksLTExLjUyNTMyIHYgLTE0LjExODQzIGwgMzAuMzk0MTY4LC0xOS4xNzM3NCB2IDU5LjUxMTAyIHoiIHN0eWxlPSJjb2xvcjojMDAwMDAwO29wYWNpdHk6MTtmaWxsOiNmYmJjMDU7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlLXdpZHRoOjAuMjY0NTgzcHg7LWlua3NjYXBlLXN0cm9rZTpub25lIi8+JiN4YTsgICAgPHBhdGggaWQ9InBhdGg5NjUwNSIgZD0ibSAxNjMuMTY1MDYsMTUxLjA5ODI4IHYgMjguMzQ3MDIgYyAwLjEwNTA0LDQuOTY5NjkgLTEuNzU1MzksOC4zNDE2IC01Ljc3MDA3LDExLjA5NTM2IGwgLTUzLjA0MjQsMzMuMTkyNDcgLTI4LjY4NTEwNSwtMTcuODc1NjQgeiIgc3R5bGU9ImNvbG9yOiMwMDAwMDA7b3BhY2l0eToxO2ZpbGw6I2VhNDMzNTtmaWxsLW9wYWNpdHk6MTtzdHJva2Utd2lkdGg6MC4yNjQ1ODNweDstaW5rc2NhcGUtc3Ryb2tlOm5vbmUiLz4mI3hhOyAgPC9nPiYjeGE7PC9zdmc+;', 
		    		s * 33, s * 42, 'Chronicle', null, null, null, this.getTagsForStencil(gn, '', dt + 'chronicle').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwLjAwMTcxNjYxMzc2OTUzIiBoZWlnaHQ9IjE0Ljc5ODEzMTk0Mjc0OTAyMyIgdmlld0JveD0iLTIuOTgwMjMyMjM4NzY5NTMxMmUtOCAtMC4wMDAxMzEyMzc1Mzg4ODA2Njg1OCAyMC4wMDE3MTY2MTM3Njk1MyAxNC43OTgxMzE5NDI3NDkwMjMiPiYjeGE7CTxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTIuODYuODM4YTUuNDggNS40OCAwIDAgMC03LjA2IDEuMDYgNS4zMSA1LjMxIDAgMCAwLTEuMzQgMy42IDUuNDkgNS40OSAwIDAgMCAyLjQxIDQuNTNsLS4xNy4yOC0uNTYuMTYtMi4wNiAzLjQ4IDEuNDguODUgMi4wNS0zLjQ4LS4xNi0uNjEuMTQtLjI2YTUuNDkgNS40OSAwIDAgMCA1LjI3LTkuNjF6bS0xLjkyIDguM2EzLjc5IDMuNzkgMCAxIDEgMi42Ni00LjY1aDBhMy44IDMuOCAwIDAgMS0yLjY2IDQuNjV6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTS4wNSA0LjE3OGwuMTMtMS4wN2gxLjE4di4zNUguNTJ2LjQ1YS42OC42OCAwIDAgMSAuNzkuMTEuNzguNzggMCAwIDEgLjE3LjUzLjc3Ljc3IDAgMCAxLS4wOS4zNi41My41MyAwIDAgMS0uMjQuMjUuNjUuNjUgMCAwIDEtLjM4LjA5LjczLjczIDAgMCAxLS4zNi0uMDguNjYuNjYgMCAwIDEtLjI2LS4yMS42My42MyAwIDAgMS0uMTUtLjMyaC40MmEuMjcuMjcgMCAwIDAgLjA5LjIuMjUuMjUgMCAwIDAgLjIuMDcuMjMuMjMgMCAwIDAgLjIyLS4xLjQzLjQzIDAgMCAwIC4wNy0uMjkuMzcuMzcgMCAwIDAtLjA5LS4yNy4zMy4zMyAwIDAgMC0uMjUtLjEuNDEuNDEgMCAwIDAtLjI0LjA4aDB6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTMuNDUgNS4yMThIM3YtMS42MWwtLjUxLjE1di0uMzZsLjg4LS4zMWgwek0xIDguMDU4SC41OXYtMS42MWwtLjUuMTV2LS4zNGwuOTEtLjMxaDB6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTMuODYgNy4xODhhMS4xMyAxLjEzIDAgMCAxLS4xOC42Ny43NC43NCAwIDAgMS0xIDBoMGExIDEgMCAwIDEtLjE5LS42NXYtLjM5YTEuMDYgMS4wNiAwIDAgMSAuMTgtLjY3LjczLjczIDAgMCAxIDEgMGgwYTEuMDggMS4wOCAwIDAgMSAuMTkuNjV6bS0uNDItLjQzYS44My44MyAwIDAgMC0uMDctLjM2LjI1LjI1IDAgMCAwLS4yMy0uMTIuMjQuMjQgMCAwIDAtLjIyLjExLjc1Ljc1IDAgMCAwLS4wNy4zNnYuNTFhLjg1Ljg1IDAgMCAwIC4wNy4zOS4yMy4yMyAwIDAgMCAuMjMuMTIuMjMuMjMgMCAwIDAgLjIyLS4xMi43Ny43NyAwIDAgMCAuMDctLjM3eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xNy4xMyA1LjEzOGgtLjQxdi0xLjYybC0uNTEuMTZ2LS4zNGwuODgtLjMyaDB6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTE4LjYyIDQuMDk4bC4xMy0xLjA3aDEuMTh2LjM3aC0uODRsLS4wOS40M2EuNjUuNjUgMCAwIDEgLjMxLS4wOC42My42MyAwIDAgMSAuNDguMTkuNzQuNzQgMCAwIDEgLjE3LjUyLjgxLjgxIDAgMCAxLS4wOS4zNy42LjYgMCAwIDEtLjI1LjI1Ljc5Ljc5IDAgMCAxLS4zOC4wOS44NS44NSAwIDAgMS0uMzUtLjA4LjYyLjYyIDAgMCAxLS4yNi0uMjIuNTguNTggMCAwIDEtLjEtLjMySDE5YS4zNS4zNSAwIDAgMCAuMS4yMS4yOS4yOSAwIDAgMCAuMi4wNy4yNi4yNiAwIDAgMCAuMjItLjEuNDQuNDQgMCAwIDAgLjA2LS4zMy40MS40MSAwIDAgMC0uMDktLjI4LjM0LjM0IDAgMCAwLS4yNS0uMDkuMzQuMzQgMCAwIDAtLjI0LjA3aDB6bS0xLjA4IDMuMDlhMS4xMyAxLjEzIDAgMCAxLS4xOC42Ny43NC43NCAwIDAgMS0xIDBoMGExIDEgMCAwIDEtLjE5LS42NXYtLjM5YTEuMDYgMS4wNiAwIDAgMSAuMTgtLjY3LjczLjczIDAgMCAxIDEgMGgwYTEuMDggMS4wOCAwIDAgMSAuMTkuNjV6bS0uNDItLjQzYS44My44MyAwIDAgMC0uMDctLjM4LjI1LjI1IDAgMCAwLS4yMy0uMTIuMjQuMjQgMCAwIDAtLjIyLjExLjc1Ljc1IDAgMCAwLS4wNy4zNnYuNTFhLjg1Ljg1IDAgMCAwIC4wNy4zOS4yMy4yMyAwIDAgMCAuMjMuMTIuMjMuMjMgMCAwIDAgLjIyLS4xMi45LjkgMCAwIDAgLjA3LS4zN3oiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMTguNjIgNy4wMThsLjEzLTEuMDdoMS4xOHYuMzVoLS44NGwtLjA1LjQ1YS42NS42NSAwIDAgMSAuMzEtLjA4LjYzLjYzIDAgMCAxIC40OC4xOS43OC43OCAwIDAgMSAuMTcuNTQuNzcuNzcgMCAwIDEtLjA5LjM2LjUxLjUxIDAgMCAxLS4yNS4yNS42OS42OSAwIDAgMS0uMzguMDkuNzIuNzIgMCAwIDEtLjM1LS4wOC41OS41OSAwIDAgMS0uMjYtLjIxLjYzLjYzIDAgMCAxLS4xLS4zMkgxOWEuMzIuMzIgMCAwIDAgLjEuMi4yNS4yNSAwIDAgMCAuMi4wNy4yMy4yMyAwIDAgMCAuMjItLjEuNDMuNDMgMCAwIDAgLjA4LS4yOS4zNy4zNyAwIDAgMC0uMDktLjI3LjMxLjMxIDAgMCAwLS4yNS0uMS4zNS4zNSAwIDAgMC0uMjQuMDhoMHoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNNy43MyA3LjUwOHYtLjk0YS44Ni44NiAwIDAgMSAuMzUtLjYyIDIuNDMgMi40MyAwIDAgMSAuODMtLjQzIDIuODcgMi44NyAwIDAgMSAyLjQyLjI4IDEuMDUgMS4wNSAwIDAgMSAuMjcuMi45LjkgMCAwIDEgLjMuNzV2Ljc2em0yLjA4LTIuNjFhMS4wOCAxLjA4IDAgMSAxIDEuMDgtMS4wN2gwYTEuMDkgMS4wOSAwIDAgMS0xLjA4IDEuMDd6Ii8+JiN4YTs8L3N2Zz4=;', 
		    		s * 42, s * 32, 'Data Loss\nPrevention API', null, null, null, this.getTagsForStencil(gn, '', dt + 'data loss prevention api application programming interface').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJzdmcxMDk4NTgiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDE0Ni4zNjkxNCAxNjUuOTY0ODQiIGhlaWdodD0iMTY1Ljk2NDg0bW0iIHdpZHRoPSIxNDYuMzY5MTRtbSI+JiN4YTsgICYjeGE7ICA8ZGVmcyBpZD0iZGVmczEwOTg1NSIvPiYjeGE7ICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMzIuODI0MjE5LC02Ny41NTg1OTQpIiBpZD0ibGF5ZXIxIj4mI3hhOyAgICA8cGF0aCBpZD0icGF0aDExMDE2NCIgZD0ibSA5Ny43NTE1NzYsNzcuOTAxNjM5IDcyLjI4MzczNCw4OC41NzU2NjEgLTcyLjI4MzczNSw1OC42MTM0OSAxMGUtNywtMTQ3LjE4OTE1MSIgc3R5bGU9ImNvbG9yOiMwMDAwMDA7b3BhY2l0eToxO2ZpbGw6IzY2OWRmNjtmaWxsLW9wYWNpdHk6MTtzdHJva2Utd2lkdGg6MC4yNjQ1ODNweDstaW5rc2NhcGUtc3Ryb2tlOm5vbmUiLz4mI3hhOyAgICA8cGF0aCBpZD0icGF0aDExNTU3MSIgZD0iTSA5Ny42NzE4NzUsMjMzLjUyMzQ0IDE3OS4xOTMzNiwxNjcuNDE5OTIgOTcuNzAxMTcyLDY3LjU1ODU5NCA5Ny44MDI3MzMsODguMjQ2MDk0IDE2MC44NzY5NSwxNjUuNTM1MTYgOTcuODMyMDMxLDIxNi42NTgyIFoiIHN0eWxlPSJjb2xvcjojMDAwMDAwO29wYWNpdHk6MTtmaWxsOiM0Mjg1ZjQ7ZmlsbC1vcGFjaXR5OjE7LWlua3NjYXBlLXN0cm9rZTpub25lIi8+JiN4YTsgICAgPHBhdGggZD0ibSA5Ny43MDExNzIsNjcuNTU4NTk0IC0zNC4yMzgyODEsNDIuNzk4ODI2IDEwLjE1MDM5LDguMTIxMSAyNC4xODk0NTMsLTMwLjIzMjQyNiB6IG0gMC4xMzA4NTksMTQ5LjA5OTYwNiAtMjIuMTA3NDIyLC0xOC42MzQ3NiAtOC4zNzg5MDYsOS45Mzk0NSAzMC4zMjYxNzIsMjUuNTYwNTUgeiIgc3R5bGU9ImNvbG9yOiMwMDAwMDA7b3BhY2l0eToxO2ZpbGw6IzY2OWRmNjtmaWxsLW9wYWNpdHk6MTstaW5rc2NhcGUtc3Ryb2tlOm5vbmUiIGlkPSJwYXRoMTEwMTYyIi8+JiN4YTsgICAgPHBhdGggZD0ibSA1Ny4xMTUyMzQsMTY4LjAyNzM0IGMgLTEzLjMyMTI5MiwwIC0yNC4yOTEwMTYsMTAuOTcxNjggLTI0LjI5MTAxNSwyNC4yOTI5NyAtMTBlLTcsMTMuMzIxMjkgMTAuOTY5NzIzLDI0LjI5MTAyIDI0LjI5MTAxNSwyNC4yOTEwMiAxMy4zMjEyOTIsMCAyNC4yOTI5NywtMTAuOTY5NzMgMjQuMjkyOTY5LC0yNC4yOTEwMiAxMGUtNywtMTMuMzIxMjkgLTEwLjk3MTY3NywtMjQuMjkyOTcgLTI0LjI5Mjk2OSwtMjQuMjkyOTcgeiBtIDAsMTYgYyA0LjY3NDI1OSwwIDguMjkyOTY5LDMuNjE4NzEgOC4yOTI5NjksOC4yOTI5NyAwLDQuNjc0MjYgLTMuNjE4NzEsOC4yOTEwMiAtOC4yOTI5NjksOC4yOTEwMiAtNC42NzQyNTgsMCAtOC4yOTEwMTYsLTMuNjE2NzYgLTguMjkxMDE1LC04LjI5MTAyIC0xMGUtNywtNC42NzQyNiAzLjYxNjc1NywtOC4yOTI5NyA4LjI5MTAxNSwtOC4yOTI5NyB6IG0gMCwtODEuOTE2MDEgYyAtMTMuMzIxMjkyLDAgLTI0LjI5MTAxNiwxMC45Njk3MiAtMjQuMjkxMDE1LDI0LjI5MTAxIC0xMGUtNywxMy4zMjEzIDEwLjk2OTcyMywyNC4yOTI5NyAyNC4yOTEwMTUsMjQuMjkyOTcgMTMuMzIxMjkyLDAgMjQuMjkyOTcsLTEwLjk3MTY3IDI0LjI5Mjk2OSwtMjQuMjkyOTcgMTBlLTcsLTEzLjMyMTI5IC0xMC45NzE2NzcsLTI0LjI5MTAxIC0yNC4yOTI5NjksLTI0LjI5MTAxIHogbSAwLDE2IGMgNC42NzQyNTksMCA4LjI5Mjk2OSwzLjYxNjc2IDguMjkyOTY5LDguMjkxMDEgMCw0LjY3NDI2IC0zLjYxODcxLDguMjkyOTcgLTguMjkyOTY5LDguMjkyOTcgLTQuNjc0MjU4LDAgLTguMjkxMDE2LC0zLjYxODcxIC04LjI5MTAxNSwtOC4yOTI5NyAtMTBlLTcsLTQuNjc0MjUgMy42MTY3NTcsLTguMjkxMDEgOC4yOTEwMTUsLTguMjkxMDEgeiIgc3R5bGU9ImNvbG9yOiMwMDAwMDA7b3BhY2l0eToxO2ZpbGw6I2FlY2JmYTtmaWxsLW9wYWNpdHk6MTtzdHJva2UtbGluZWpvaW46cm91bmQ7LWlua3NjYXBlLXN0cm9rZTpub25lIiBpZD0icGF0aDEwOTk4MS03Ii8+JiN4YTsgIDwvZz4mI3hhOzwvc3ZnPg==;', 
		    		s * 37, s * 42, 'Managed MS Ad', null, null, null, this.getTagsForStencil(gn, '', dt + 'managed ms ad advertisement').join(' '))
	 	];
		
		this.addPalette('gcp2Icons Security', 'GCP Icons / Security', false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addGCP2IconsMigrationPalette = function()
	{
		var sb = this;
		var s = 1;
		var n = 'sketch=0;html=1;verticalAlign=top;labelPosition=center;verticalLabelPosition=bottom;align=center;spacingTop=-6;fontSize=11;fontStyle=1;fontColor=#999999;shape=image;aspect=fixed;imageAspect=0;';
		var dt = 'gcp google cloud platform icons icon security ';
		var gn = 'mxgraph.gcp2';
		var fns = [];
		
		var fns = [
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE5LjkzMzEzNDA3ODk3OTQ5MiIgaGVpZ2h0PSIxMC44NjAwMDA2MTAzNTE1NjIiIHZpZXdCb3g9IjAuMDAwMDI2NTAxNDY0MTYyNzIwMzY3IC0zLjgxMjY2MDA1NDMzNjQ0NzVlLTggMTkuOTMzMTM0MDc4OTc5NDkyIDEwLjg2MDAwMDYxMDM1MTU2MiI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6IzQyODVmNDt9JiN4YTsJLnN0MXtmaWxsOiM2NjlkZjY7fSYjeGE7CS5zdDJ7ZmlsbDojYWVjYmZhO30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xOS41NjMgMEg3LjE5M2EuMzIuMzIgMCAwIDAtLjMyLjMzdjIuMTZhLjMyLjMyIDAgMCAwIC4zMi4zMmgxMi4zN2EuMzIuMzIgMCAwIDAgLjM3LS4zMlYuMzNhLjMyLjMyIDAgMCAwLS4zMS0uMzN6TTguNDIzIDIuMTRhLjcuNyAwIDEgMSAuNy0uN2gwYS43LjcgMCAwIDEtLjcuN3ptMTEuMTQgMS45SDcuMTkzYS4zMi4zMiAwIDAgMC0uMzIuMzJ2Mi4xNWEuMzIuMzIgMCAwIDAgLjMyLjMyaDEyLjM3YS4zMi4zMiAwIDAgMCAuMzItLjMyVjQuMzZhLjMyLjMyIDAgMCAwLS4zMi0uMzJ6TTguNDIzIDYuMThhLjcuNyAwIDEgMSAuNy0uN2gwYS43LjcgMCAwIDEtLjcuN3ptMTEuMTkgMS44N0g3LjI1M2EuMzIuMzIgMCAwIDAtLjMyLjMydjIuMTZhLjMyLjMyIDAgMCAwIC4zMi4zM2gxMi4zNmEuMzIuMzIgMCAwIDAgLjMyLS4zM1Y4LjM3YS4zMi4zMiAwIDAgMC0uMzItLjMyem0tMTEuMTQgMi4xM2EuNzEuNzEgMCAwIDEtLjctLjcxLjcxLjcxIDAgMCAxIDEuNDEgMCAuNzEuNzEgMCAwIDEtLjcxLjcxeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik00LjY3MyAzLjI5aC0yLjEzYS44MTIuODEyIDAgMCAxLS4yMS0xLjYxaDIuMzRhLjgxNS44MTUgMCAxIDEgLjI2IDEuNjF6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTQuNjczIDYuMjRILjg1M2EuODIuODIgMCAwIDEtLjIxLTEuNjJoNGEuODIzLjgyMyAwIDAgMSAuMjkgMS42MnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNNC42NzMgOS4xOGgtMi4xM2EuODEyLjgxMiAwIDAgMS0uMjEtMS42MWgyLjM0YS44MTUuODE1IDAgMCAxIC4yNiAxLjYxeiIvPiYjeGE7PC9zdmc+;', 
		    		s * 42, s * 23, 'Transfer\nAppliance', null, null, null, this.getTagsForStencil(gn, '', dt + 'transfer appliance').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJzdmcxMjg2OTQiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDE2NC42MDYyOCAxNjMuMTgzNTUiIGhlaWdodD0iMTYzLjE4MzU1bW0iIHdpZHRoPSIxNjQuNjA2MjhtbSI+JiN4YTsgICYjeGE7ICA8ZGVmcyBpZD0iZGVmczEyODY5MSIvPiYjeGE7ICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjIuODEzNTk0LC02Ny4zMzgwMDgpIiBpZD0ibGF5ZXIxIj4mI3hhOyAgICA8cGF0aCBpZD0icmVjdDEyODg1MCIgZD0iTSA4Mi4yODI4MzEsNjcuMzM4MDA4IFYgODYuMTMyNzI3IEggNjguOTEyMDcyIEEgNi4wMDA1OTk5LDYuMDAwNTk5OSAwIDAgMCA2Mi45MTE5Miw5Mi4xMzI4NzYgViAxMDQuNzMyNjIgSCA0NC4xODMzNSB2IDEwLjk5OTg1IGggMTguNzI4NTcgdiAxNy4yNDM5MSBIIDQ0LjE4MzM1IHYgMTEuMDAwMzYgaCAxOC43Mjg1NyB2IDcuNTI2NjcgYSAzOS41MTI2MDcsMzkuNTEyNjA3IDAgMCAwIC0wLjU4NjAwOSwtMC4wMDcgMzkuNTEyNjA3LDM5LjUxMjYwNyAwIDAgMCAtMzkuNTEyMzE3LDM5LjUxMjgzIDM5LjUxMjYwNywzOS41MTI2MDcgMCAwIDAgMzkuNTEyMzE3LDM5LjUxMjMyIDM5LjUxMjYwNywzOS41MTI2MDcgMCAwIDAgMzkuNTEyODI5LC0zOS41MTIzMiAzOS41MTI2MDcsMzkuNTEyNjA3IDAgMCAwIC0wLjAwOSwtMC43NDE1NiBoIDguOTk0OCB2IDE4LjQ3NjkxIGggMTAuOTk5ODUgdiAtMTguNDc2OTEgaCAxNy4yMDEwMSB2IDE4LjQ3NjkxIGggMTEuMDAwMzcgViAxOTAuMjY3NjggSCAxNjIuODg3IGEgNi4wMDA1OTk5LDYuMDAwNTk5OSAwIDAgMCA1Ljk5OTYzLC01Ljk5OTYzIHYgLTExLjk1OTQ4IGggMTguNTMzMjQgViAxNjEuMzA4NSBoIC0xOC41MzMyNCB2IC0xNy4zMzE3NiBoIDE4LjUzMzI0IHYgLTExLjAwMDM2IGggLTE4LjUzMzI0IHYgLTE3LjI0MzkxIGggMTguNTMzMjQgViAxMDQuNzMyNjIgSCAxNjguODg2MzMgViA5Mi4xMzI4NzYgQSA2LjAwMDU5OTksNi4wMDA1OTk5IDAgMCAwIDE2Mi44ODY3LDg2LjEzMjcyNyBIIDE1MC4wMjU0NyBWIDY3LjMzODAwOCBIIDEzOS4wMjUxIFYgODYuMTMyNzI3IEggMTIxLjgyNDA5IFYgNjcuMzM4MDA4IEggMTEwLjgyNDI0IFYgODYuMTMyNzI3IEggOTMuMjgzMTk1IFYgNjcuMzM4MDA4IFoiIHN0eWxlPSJjb2xvcjojMDAwMDAwO29wYWNpdHk6MTtmaWxsOiM0Mjg1ZjQ7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlLXdpZHRoOjE7c3Ryb2tlLWxpbmVqb2luOnJvdW5kOy1pbmtzY2FwZS1zdHJva2U6bm9uZSIvPiYjeGE7ICAgIDxwYXRoIGQ9Im0gNjEuMjMyNDIyLDE2Ny45Mjc3MyAtNy42ODU1NDcsNy44NzExIDEwLjg1MTU2MiwxMC41OTE3OSBIIDM4LjQ0MzM1OSB2IDExIGggMjYuMzg4NjcyIGwgLTExLjM3NSwxMS42MjY5NiA3Ljg2NTIzNSw3LjY5MTQgMjQuMzY1MjM0LC0yNC45MDgyIHogbSAxMy42Nzk4LC02OS43OTQ3MDQgSCAxNTYuODg2NTUgViAxNzguMjY3NjcgSCA5OS43MjU2OTYgQSAzOS41MTI2MDcsMzkuNTEyNjA3IDAgMCAwIDc0LjkxMjIyMiwxNTMuNTU3NTUgWiIgc3R5bGU9ImNvbG9yOiMwMDAwMDA7b3BhY2l0eToxO2ZpbGw6I2ZmZmZmZjtmaWxsLW9wYWNpdHk6MTstaW5rc2NhcGUtc3Ryb2tlOm5vbmUiIGlkPSJwYXRoMTI5MDEwIi8+JiN4YTsgICAgPHBhdGggaWQ9InBhdGgxNDA4NDAiIGQ9Im0gOTUuNjU5Mjc3LDExOC43MjUwNSB2IDM5LjY5OTkgaCA0MC44MjMzNDMgdiAtMzkuNjk5OSB6IiBzdHlsZT0iY29sb3I6IzAwMDAwMDtvcGFjaXR5OjE7ZmlsbDojNDI4NWY0O2ZpbGwtb3BhY2l0eToxO3N0cm9rZS13aWR0aDoxO3N0cm9rZS1saW5lam9pbjpyb3VuZDstaW5rc2NhcGUtc3Ryb2tlOm5vbmUiLz4mI3hhOyAgPC9nPiYjeGE7PC9zdmc+;', 
		    		s * 42, s * 42, 'Migrate for\nCompute Engine', null, null, null, this.getTagsForStencil(gn, '', dt + 'migrate for compute engine').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJzdmc4MjciIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDE1Ni4wODM1IDE0OS4wNjI3NCIgaGVpZ2h0PSIxNDkuMDYyNzRtbSIgd2lkdGg9IjE1Ni4wODM1bW0iPiYjeGE7ICAmI3hhOyAgPGRlZnMgaWQ9ImRlZnM4MjQiLz4mI3hhOyAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTI5LjAyNTYxNywtNzMuNDA2MzcyKSIgaWQ9ImxheWVyMSI+JiN4YTsgICAgPHBhdGggaWQ9InBhdGgxMDQxIiB0cmFuc2Zvcm09InNjYWxlKDAuMjY0NTgzMzMpIiBkPSJNIDQxNy42MDc0MiwyNzcuNDQxNDEgMjQxLjM0MTgsNTgxLjgxMjUgYSAxMjkuNTIxNSwxMjkuNTIxNSAwIDAgMCAtMi4xMTcxOSwtMC4wMjczIDEyOS41MjE1LDEyOS41MjE1IDAgMCAwIC0xMjkuNTIxNDksMTI5LjUyMTQ4IDEyOS41MjE1LDEyOS41MjE1IDAgMCAwIDEyOS41MjE0OSwxMjkuNTIxNDggMTI5LjUyMTUsMTI5LjUyMTUgMCAwIDAgMTE3LjQyMzgzLC03NC45OTQxNCBIIDY2MC4zNDc2NiA2OTkuNjI1IFoiIHN0eWxlPSJjb2xvcjojMDAwMDAwO29wYWNpdHk6MTtmaWxsOiM0Mjg1ZjQ7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlLXdpZHRoOjMuNzc5NTM7LWlua3NjYXBlLXN0cm9rZTpub25lIi8+JiN4YTsgICAgPHBhdGggdHJhbnNmb3JtPSJzY2FsZSgwLjI2NDU4MzMzKSIgZD0iTSA0MTcuNTU2NjQsMzY4LjAzOTA2IDI4OC4xOTkyMiw1OTEuNDA0MyBhIDEyOS41MjE1LDEyOS41MjE1IDAgMCAxIDMuNjQ2NDgsMS41NTg1OSBMIDQxOC4zNjEzMyw0NjYuMDc4MTIgNTUyLjU3MjI3LDYwMS44NTkzOCBaIG0gMC42NjQwNiwxNjIuNDE2MDIgLTg4LjIxNjc5LDg4LjQ3MjY1IGEgMTI5LjUyMTUsMTI5LjUyMTUgMCAwIDEgMTguMzc4OSwyMi42Njc5NyBsIDYwLjc2NTYzLC0yNi43NzM0MyA5LjE4MzU5LC00LjA0NDkzIDE0MS40MDIzNSw2Mi44NDU3MSB6IG0gLTE4MC45OTYwOSwxMDkuODM1OTQgLTIwLjA4NTk0LDIwLjAwMzkgNDEuMjIwNzEsNDEuMzkwNjMgaCAtOTMuNDQxNDEgdiAyOC4zNDU3IGggOTMuNjAzNTEgbCAtNDEuNzA3MDMsNDIuMTg3NSAyMC4xNTgyMSwxOS45MzE2NCA3NS40NjY3OSwtNzYuMzI4MTIgeiBNIDQxOC4yNSw2NjAuMzc2OTUgMzY1LjcyMDcsNjgzLjUxOTUzIGEgMTI5LjUyMTUsMTI5LjUyMTUgMCAwIDEgMy4wMjUzOSwyNy43ODcxMSAxMjkuNTIxNSwxMjkuNTIxNSAwIDAgMSAtMC4zNDE3OSw5LjE3MzgzIGggMTg1LjA4MjAzIHoiIHN0eWxlPSJjb2xvcjojMDAwMDAwO29wYWNpdHk6MTtmaWxsOiNmZmZmZmY7c3Ryb2tlLXdpZHRoOjMuNzc5NTM7LWlua3NjYXBlLXN0cm9rZTpub25lIiBpZD0icGF0aDQzMjciLz4mI3hhOyAgPC9nPiYjeGE7PC9zdmc+;', 
		    		s * 42, s * 40, 'Migrate to\nContainers', null, null, null, this.getTagsForStencil(gn, '', dt + 'migrate to containers').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJzdmcyMjQxOCIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMTYzLjMzMzk3IDE2My4xNDQ1MyIgaGVpZ2h0PSIxNjMuMTQ0NTNtbSIgd2lkdGg9IjE2My4zMzM5N21tIj4mI3hhOyAgJiN4YTsgIDxkZWZzIGlkPSJkZWZzMjI0MTUiLz4mI3hhOyAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTI0LjAyMzIwNSwtNjYuOTkyOTY2KSIgaWQ9ImxheWVyMSI+JiN4YTsgICAgPHBhdGggZD0ibSAyNC4wMjMyMDUsMTIyLjM3NjczIHYgLTIwLjk3MzUxIGwgNTkuNzM2NTAxLDMzLjg5NDcgdiAyMS42Mjg5NCB6IG0gMCwzNi41MTM2NCB2IC0yMS42ODEwMyBsIDU5LjczNjUwMSwzNC44MTIyIHYgMjEuMzkzNDggeiBtIDAsMzYuNTAzMDggdiAtMjEuNjU4MzEgbCA1OS43MzY1MDEsMzQuNzI1MjIgdiAyMS42NzcxNCB6IiBzdHlsZT0ib3BhY2l0eToxO2ZpbGw6I2FlY2JmYTtmaWxsLW9wYWNpdHk6MTtzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MC4yNjQ1ODNweDtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2Utb3BhY2l0eToxIiBpZD0icGF0aDIyNzM5Ii8+JiN4YTsgICAgPHBhdGggZD0iTSAxMTAuMjA0NiwxMDUuMTQ4NDggODMuNzU5NzA2LDg5LjYyMzYyNCBWIDY2Ljk5Mjk2NiBsIDQ2LjIwMTIwNCwyNi42Mzg4MTIgeiBtIDMyLjExNTcsLTMuNjUxNjQgMjQuMTEwMTgsMC4wOTM2IFYgOTAuMjYxMDM0IGwgMjAuOTI2NywyMC45NzM1MTYgLTIwLjkyNjcsMjAuOTczNTIgdiAtMTEuMzI5NDUgaCAtMjAuNzM5NDQgbCAtNjEuOTMxMzM0LDM2LjA0ODI0IHYgLTIxLjYyODk0IHogbSAtNTguNTYwNTk0LDkxLjkxODE4IHYgLTIxLjM5MzQ4IGwgNTguNzc5OTk0LC0zNC4xMzEzIDE3LjI1MTkzLDAuMDY4MiB2IDE5LjU2NDMzIGwgLTE0LjM0MDc0LC0wLjA0MzUgeiBtIDU4LjUyNjUxNCwtMTguNjYyMSB2IDIxLjU4NjI2IEwgODMuNzU5NzA2LDIzMC4xMzc1IHYgLTIxLjY3NzE0IHoiIHN0eWxlPSJvcGFjaXR5OjE7ZmlsbDojNjY5ZGY2O2ZpbGwtb3BhY2l0eToxO3N0cm9rZTpub25lO3N0cm9rZS13aWR0aDowLjI2NDU4M3B4O3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1vcGFjaXR5OjEiIGlkPSJwYXRoMjI3NDMiLz4mI3hhOyAgICA8cGF0aCBpZD0icGF0aDIyNzQ1IiBkPSJNIDgzLjc1OTcwNiw2Ni45OTI5NjYgViA4OS42MjM2MjQgTCA0My45MjkzNjcsMTEyLjY0NTY5IDI0LjAyMzIwNSwxMDEuNDAzMjIgWiIgc3R5bGU9Im9wYWNpdHk6MTtmaWxsOiM0Mjg1ZjQ7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjAuMjY0NTgzcHg7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW9wYWNpdHk6MSIvPiYjeGE7ICA8L2c+JiN4YTs8L3N2Zz4=;', 
		    		s * 42, s * 42, 'Database Migration\nService', null, null, null, this.getTagsForStencil(gn, '', dt + 'database migration service').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJzdmc4MjI5IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxMjkuNzMwNjUgMTM3LjAzODU5IiBoZWlnaHQ9IjEzNy4wMzg1OW1tIiB3aWR0aD0iMTI5LjczMDY1bW0iPiYjeGE7ICAmI3hhOyAgPGRlZnMgaWQ9ImRlZnM4MjI2Ii8+JiN4YTsgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC00My4wNDM0MTEsLTc5Ljc3NDI3MikiIGlkPSJsYXllcjEiPiYjeGE7ICAgIDxwYXRoIGQ9Im0gOTMuMzU0MjMsMTY5Ljk3OTkzIHYgLTE4LjE0ODUxIGwgLTUwLjMxMDgxOSwzMi40NjY4MiA1MC4zMTA4MTksMzIuNTE0NjIgdiAtMTguMDU0ODcgaCA2My43NDk0NCBjIDQuNDY2ODksMCA3LjM2MTA5LC0zLjA0Njg5IDcuNDgwMTYsLTcuMTE2OTkgdiAtMTQuODI5ODQgYyAwLC0zLjIwNDQ0IC0yLjcxNzcsLTYuODMxMjMgLTYuOTQ0NjUsLTYuODMxMjMgeiBNIDEyMi40NjMyNSw5Ny45MjI3NzkgViA3OS43NzQyNzIgbCA1MC4zMTA4MiwzMi40NjY4MTggLTUwLjMxMDgyLDMyLjUxNDYyIFYgMTI2LjcwMDg0IEggNTguNzEzODA5IGMgLTQuNDY2ODg4LDAgLTcuMzYxMDg4LC0zLjA0Njg5IC03LjQ4MDE1NywtNy4xMTY5OSB2IC0xNC44Mjk4NCBjIDAsLTMuMjA0NDQgMi43MTc2OTksLTYuODMxMjMxIDYuOTQ0NjUxLC02LjgzMTIzMSB6IiBzdHlsZT0ib3BhY2l0eToxO2ZpbGw6IzQyODVmNDtmaWxsLW9wYWNpdHk6MTtzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MC4yNjQ1ODNweDtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2Utb3BhY2l0eToxIiBpZD0icGF0aDgzNjMtMiIvPiYjeGE7ICA8L2c+JiN4YTs8L3N2Zz4=;', 
		    		s * 40, s * 42, 'Storage Transfer\nService', null, null, null, this.getTagsForStencil(gn, '', dt + 'storage transfer service').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJzdmczNjAwOCIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMTIxLjI1MDg4IDEwMC4wNjkyMyIgaGVpZ2h0PSIxMDAuMDY5MjNtbSIgd2lkdGg9IjEyMS4yNTA4OG1tIj4mI3hhOyAgJiN4YTsgIDxkZWZzIGlkPSJkZWZzMzYwMDUiLz4mI3hhOyAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTQ2LjIyMTU4LC05OC4zMzc4OCkiIGlkPSJsYXllcjEiPiYjeGE7ICAgIDxwYXRoIGQ9Im0gNzkuNjMyOTE4LDE0Ni45MDY4OSA2Ljc2MTM0NSw2LjY3NDAxIC0xNC4xNjk0MiwxNC4yODQ0IGggNDcuMDI4OTA3IHYgOS41MDAyIEggNzIuMjI0ODQzIGwgMTQuMjA4NjkyLDE0LjMzNjU5IC02LjczMDMzOSw2LjcwNTAyIC0yNS41NjYzOTQsLTI1LjY2NDA3IHogbSA2Mi4zNDM0MzIsLTIzLjcxOTU4IC02Ljc2MTM1LDYuNjc0MDEgMTQuMTY5NDIsMTQuMjg0NCBoIC00Ny4wMjg5MSB2IDkuNTAwMTkgaCA0Ny4wMjg5MSBsIC0xNC4yMDg2OSwxNC4zMzY2IDYuNzMwMzMsNi43MDUwMiAyNS41NjY0LC0yNS42NjQwNyB6IiBzdHlsZT0iY29sb3I6IzAwMDAwMDtvcGFjaXR5OjE7ZmlsbDojNDI4NWY0O2ZpbGwtb3BhY2l0eToxO3N0cm9rZS13aWR0aDoxOy1pbmtzY2FwZS1zdHJva2U6bm9uZSIgaWQ9InBhdGgzNjE0Mi02Ii8+JiN4YTsgICAgPHBhdGggaWQ9InBhdGgzNjE0NiIgZD0ibSAxMDUuMzM1OTQsOTguMzM3ODkxIGMgLTExLjEyNjE1NywtMC4wMDg1IC0xOS43MDYxNTEsNC45OTk5MjkgLTI1LjQ3ODUxOCwxMS4xNTQyOTkgLTQuODYwMjQ5LDUuMTgxODkgLTcuODUwMDUzLDExLjAzNjc3IC05LjY2MDE1NiwxNS45OTIxOSAtNy45MTYyNCwxLjUyOTA1IC0xNC45NzI2NTksNS44MzI0NCAtMTkuMDk5NjEsMTIuMTAxNTYgbCAtMC4wODIwMywwLjEyNSAtMC4wNzQyMiwwLjEyODkgYyAtMy44NTQxNTcsNi43NDA3NCAtNS4wNjQ5NTksMTIuNDUwODYgLTQuNjM4NjcyLDE3LjI5MTAyIDAuMjM0MDk5LDIuNjU4MDIgMC44OTI4Nyw0Ljk0NSAxLjYyNTExOCw2Ljk0OTk5IGwgNy45ODk2ODcsLTYuNjU1NTggYyAtMC4wNjcxMiwtMC4zNzM1IC0wLjExODQ2OCwtMC43NDg2NSAtMC4xNTE5MTQsLTEuMTI4NCAtMC4yNDI0LC0yLjc1MjI5IDAuMjUzNjU4LC02LjExNTY3IDMuMzMwMDc4LC0xMS41NTY2NCAyLjgwMDQzMiwtNC4xODk2NSA4Ljg1Mjc1NiwtNy44NjkzMyAxNS4xMDM1MTYsLTguNDIxODcgbCAzLjIwODk4NCwtMC4yODMyIDAuOTIzODI4LC0zLjA4NTk0IGMgMS4yNTQ5ODEsLTQuMTkwMDIgNC4wNDA3NTksLTEwLjI1NDYyIDguNDUzMTI1LC0xNC45NTg5OSA0LjQxMjM2NiwtNC43MDQzNiAxMC4xNzYxMywtOC4xNTg3NSAxOC41NTA3ODQsLTguMTUyMzQgeiIgc3R5bGU9ImNvbG9yOiMwMDAwMDA7b3BhY2l0eToxO2ZpbGw6I2FlY2JmYTtmaWxsLW9wYWNpdHk6MTstaW5rc2NhcGUtc3Ryb2tlOm5vbmUiLz4mI3hhOyAgICA8cGF0aCBpZD0icGF0aDM2MTQ4IiBkPSJtIDEwNS4zMzU5NCw5OC4zMzc4OTEgdiA5LjQ5OTk5OSBjIDkuNDA2OTksMCAxNi40NDYyOSwzLjY2MzUyIDIzLjU2OTA1LDEzLjkzMDExIGwgNi45OTQyOCwtNi41MzY0NSBDIDEyNy42MDIxOCwxMDMuOTc3ODYgMTE3LjE5MzcxLDk4LjMzNzg5MSAxMDUuMzM1OTQsOTguMzM3ODkxIFoiIHN0eWxlPSJjb2xvcjojMDAwMDAwO29wYWNpdHk6MTtmaWxsOiM2NjlkZjY7ZmlsbC1vcGFjaXR5OjE7LWlua3NjYXBlLXN0cm9rZTpub25lIi8+JiN4YTsgIDwvZz4mI3hhOzwvc3ZnPg==;', 
		    		s * 42, s * 35, 'Cloud Data\nTransfer', null, null, null, this.getTagsForStencil(gn, '', dt + 'cloud data transfer').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjIwLjAwMTA0NTIyNzA1MDc4IiBoZWlnaHQ9IjIwLjAwMTA0NTIyNzA1MDc4IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHZpZXdCb3g9IjAgMCAyMC4wMDEwNDUyMjcwNTA3OCAyMC4wMDEwNDUyMjcwNTA3OCI+JiN4YTsJPHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6I2FlY2JmYTt9JiN4YTsJLnN0MXtmaWxsOiM2NjlkZjY7fSYjeGE7CS5zdDJ7ZmlsbDojNDI4NWY0O30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00LjczIDguODN2Mi42M2E0LjkxIDQuOTEgMCAwIDAgMS43MSAxLjc0VjguODN6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTcuODkgNi40MXY3LjUzQTcuNjIgNy42MiAwIDAgMCA5IDE0YTggOCAwIDAgMCAxIDBWNi40MXoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTEuNjQgOS44NnYzLjI5YTUgNSAwIDAgMCAxLjctMS44MlY5Ljg2eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xNS43NCAxNC4zMmwtMS40MiAxLjQyYS40Mi40MiAwIDAgMCAwIC42bDMuNTQgMy41NGEuNDIuNDIgMCAwIDAgLjU5IDBsMS40My0xLjQzYS40Mi40MiAwIDAgMCAwLS41OWwtMy41NC0zLjU0YS40Mi40MiAwIDAgMC0uNiAwIi8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTkgMGE5IDkgMCAxIDAgMCAxOEE5IDkgMCAxIDAgOSAwbTAgMTUuNjlhNi42OCA2LjY4IDAgMCAxIC4wMDctMTMuMzYgNi42OCA2LjY4IDAgMCAxIDQuNzI3IDExLjQwM0E2LjY4IDYuNjggMCAwIDEgOSAxNS42OSIvPiYjeGE7PC9zdmc+;', 
		    		s * 42, s * 42, 'BigQuery Data\nTransfer Service', null, null, null, this.getTagsForStencil(gn, '', dt + 'bigquery data transfer service').join(' '))

	 	];
		
		this.addPalette('gcp2Icons Migration', 'GCP Icons / Migration', false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addGCP2IconsHybridAndMultiCloudPalette = function()
	{
		var sb = this;
		var s = 1;
		var n = 'sketch=0;html=1;verticalAlign=top;labelPosition=center;verticalLabelPosition=bottom;align=center;spacingTop=-6;fontSize=11;fontStyle=1;fontColor=#999999;shape=image;aspect=fixed;imageAspect=0;';
		var dt = 'gcp google cloud platform icons icon security ';
		var gn = 'mxgraph.gcp2';
		var fns = [];
		
		var fns = [
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjM3OC45OTYwMDM2OTA5NDU4IiBoZWlnaHQ9IjM3My40ODg4MDkyODIxODgyNCIgdmlld0JveD0iMCAwIDEwMC4yNzYwMDA5NzY1NjI1IDk4LjgxOTAwNzg3MzUzNTE2Ij4mI3hhOzxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+JiN4YTsJLnN0MHtmaWxsOiM0Mjg1ZjQ7fSYjeGE7CS5zdDF7ZmlsbDojNjY5ZGY2O30mI3hhOwkuc3Qye2ZpbGw6I2FlY2JmYTt9JiN4YTs8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xNC42MTQgMjQuNzc1TDAgMzQuNzA5bDE0LjYxNCA5LjkzM1YzOS45NWMzLjU0NSAxLjQwMyA3LjcwNCAzLjY1OSAxMS4yMjYgNi44NDggNS4yMjQgNC43MyA5LjIzNSAxMS4yIDkuMjM1IDIwLjk2NXYxMS41MzJoMTBWNjcuNzYyYzAtMTIuNjQ0LTUuNjcxLTIyLjE3NS0xMi41MjMtMjguMzc5LTUuOTI5LTUuMzY4LTEyLjU5Mi04LjQ3LTE3LjkzNy0xMC4wMjR6Ii8+JiN4YTsJPHBhdGggY2xhc3M9InN0MSIgZD0iTTU0Ljg4NiAxOC41NTR2NjYuMDIxaC00LjUzNWwxMC4xOSAxNC4yNDQgMTAuMTktMTQuMjQ0aC01Ljg0NlYxOC41NTR6TTM5Ljk2MSAwbC05LjcwNSAxMy45NThoNC44MTl2NjUuMzM2aDEwVjEzLjk1N2g0LjU5MXoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNNTQuODg2IDE4LjU1NHYxMi45YzAgMTMuNDY0IDYuNzE5IDIzLjE0OCAxNC4wNTIgMjkuMTI1IDUuOTI1IDQuODI5IDEyLjE0NiA3LjUxIDE2LjQxNCA4Ljg3NnY0LjcyMmwxNC45MjQtOS41NzEtMTQuOTI0LTkuNTcxdjMuNzI1Yy0zLjA0My0xLjI3OC02Ljc3LTMuMjIxLTEwLjA5OC01LjkzMy01LjY5OC00LjY0NC0xMC4zNjktMTEuMTEtMTAuMzY5LTIxLjM3M3YtMTIuOXoiLz4mI3hhOzwvc3ZnPg==;', 
		    		s * 42, s * 42, 'Traffic\nDirector', null, null, null, this.getTagsForStencil(gn, '', dt + 'traffic director').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJzdmc1MzkzNyIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMTUxLjQ4MDQ3IDEzMS4zMDQ2OSIgaGVpZ2h0PSIxMzEuMzA0NjltbSIgd2lkdGg9IjE1MS40ODA0N21tIj4mI3hhOyAgJiN4YTsgIDxkZWZzIGlkPSJkZWZzNTM5MzQiLz4mI3hhOyAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTMwLjc2NzU3OCwtODQuMDg3ODkxKSIgaWQ9ImxheWVyMSI+JiN4YTsgICAgPHBhdGggaWQ9InBhdGg1NDA3OCIgZD0ibSAxMDYuODY1MjMsODQuMDg3ODkxIC03Ni4wOTc2NTIsMTMxLjMwNDY4OSAxMC40NDkyMTksLTAuMDMxMiAxNDEuMDMxMjUzLC0wLjQyOTY5IHogbSAtMC4wMzEyLDIzLjk4NDM3OSA1NC42ODc1LDk0LjkyMTg3IC0xMDkuODk0NTI3LDAuMzM1OTQgeiIgc3R5bGU9ImNvbG9yOiMwMDAwMDA7ZmlsbDojZmViYzAwOy1pbmtzY2FwZS1zdHJva2U6bm9uZSIvPiYjeGE7ICAgIDxwYXRoIGlkPSJwYXRoNTQwODAiIGQ9Im0gMTA2Ljg1NzQyLDEzNC44Mzc4OSAtNjkuOTE0MDYxLDcwLjI5MTAyIDguNTA3ODEzLDguNDYyODkgNjEuMzkwNjI4LC02MS43MjI2NiA2MC43ODEyNSw2MS4zMTgzNiA4LjUyMzQzLC04LjQ0NzI3IHoiIHN0eWxlPSJjb2xvcjojMDAwMDAwO2ZpbGw6I2VmNDczNjstaW5rc2NhcGUtc3Ryb2tlOm5vbmUiLz4mI3hhOyAgICA8cGF0aCBpZD0icGF0aDg3NTk4IiBkPSJtIDE3MS44NjcxOSwyMDIuOTYyODkgLTEzMC42ODc1MDMsMC4zOTg0NCAwLjAzNzExLDEyIDEzMC42ODc1MDMsLTAuMzk4NDQgeiIgc3R5bGU9ImNvbG9yOiMwMDAwMDA7ZmlsbDojMDA4MDAwOy1pbmtzY2FwZS1zdHJva2U6bm9uZSIvPiYjeGE7ICAgIDxwYXRoIGlkPSJwYXRoNzk2NzkiIGQ9Im0gMTA2Ljg0NTcsMTczLjIxMjg5IC02OS44OTY0OTQsMzEuNTA2NzYgLTYuMTgxNjI4LDEwLjY3MjkzIDExLjY4ODY4MSwtMC4wMzEyIDY0LjM5OTIxMSwtMjguOTkyMTkgNjMuNzMxMzgsMjguNTkyNTEgMTEuNjYxMiwtMC4wMyAtNi4xMDE1NywtMTAuNTkzODcgeiIgc3R5bGU9ImNvbG9yOiMwMDAwMDA7b3BhY2l0eToxO2ZpbGw6IzNjODRmODstaW5rc2NhcGUtc3Ryb2tlOm5vbmUiLz4mI3hhOyAgPC9nPiYjeGE7PC9zdmc+;', 
		    		s * 42, s * 36, 'Anthos', null, null, null, this.getTagsForStencil(gn, '', dt + 'anthos').join(' ')),
		    this.createVertexTemplateEntry(n + 'imageAspect=0;image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjQwMi4zNDMyMDA2ODM1OTM3NSIgaGVpZ2h0PSI0MTYuMDAyNTMyOTU4OTg0NCIgdmlld0JveD0iMCAwLjAwMDQ5OTk2Mzc2MDM3NTk3NjYgNDAyLjM0MzIwMDY4MzU5Mzc1IDQxNi4wMDI1MzI5NTg5ODQ0Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qxe2ZpbGw6IzY2OWRmNjt9JiN4YTsJLnN0MntmaWxsOiNhZWNiZmE7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTM2Ni4xNyA5Mi4wMDNjLTE5LjA1IDAtMzYgMTYuODItMzYgMzUuNzYgMCAxMi42MiA4LjQ2IDI1LjI0IDE5LjA1IDMxLjU1djE0Ny4zbC0xMTAuMDUgNjUuMjEgMTYuOTMgMjcuMzUgMTE4LjUxLTY5LjQyYzQuMjQtMi4xIDguNDctOC40MSA4LjQ3LTE0Ljczdi0xNTUuNjdjMTIuNzEtNi4zNSAxOS4wOS0xOC45MyAxOS4wOS0zMS41NSAyLjA4LTE4Ljk0LTE0Ljg1LTM1LjgtMzYtMzUuOHptLTM4LjExLTIzLjFMMjA5LjU1IDEuNTgzYy00LjI0LTIuMTEtMTAuNTktMi4xMS0xNi45MyAwTDU3LjE3IDc5LjQxM0EzNiAzNiAwIDAgMCAzNiA3My4xMDNjLTE5IDAtMzYgMTYuODMtMzYgMzUuNzZzMTYuOTMgMzUuNzcgMzYgMzUuNzcgMzYtMTYuODMgMzYtMzUuNzdsMTI5LjEtNzMuNjIgMTEwIDYzLjExem0tMTQzLjg5IDI3Ny42OHEtOS41MyAwLTE5IDYuMzFsLTExMC02My4xMXYtMTI2LjIyaC0zNHYxMzQuNjNjMCA2LjMyIDQuMjMgMTIuNjMgOC40NiAxNC43M2wxMTguNTQgNjUuMjF2Mi4xMWMwIDE4LjkzIDE2LjkzIDM1Ljc2IDM2IDM1Ljc2czM2LTE2LjgzIDM2LTM1Ljc2LTE3LTMzLjY2LTM2LTMzLjY2eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik05Ny4zOCAxMzYuMjEzbDEwNS44MiA1OC45MSAxMDMuNy01OC45MS0xMDMuNy02MXptLTYuMzUgNjcuMzJsMTEyLjE3IDYzLjExdi01MC40OWwtMTEyLjE3LTY1LjIxem0wIDYzLjExbDExMi4xNyA2NS4yMXYtNDQuMTdsLTExMi4xNy02NS4yMnoiLz4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMjAzLjE3IDIxNi4xMjN2NTAuNTZsMTEyLjE2LTY1LjI5di01MC4zOXptOTItMjBhOC4xNiA4LjE2IDAgMSAxIDguMTYtOC4xNiA4LjE5IDguMTkgMCAwIDEtOC4xNiA4LjE2em0tOTIgOTEuNTJ2NDQuMTZsMTEyLjE2LTY1LjEydi00NC4xNnptOTItMjIuODhhOC4xNiA4LjE2IDAgMSAxIDguMTYtOC4xNiA4LjE5IDguMTkgMCAwIDEtOC4xNiA4LjE2eiIvPiYjeGE7PC9zdmc+;', 
		    		s * 40, s * 42, 'Anthos Clusters', null, null, null, this.getTagsForStencil(gn, '', dt + 'anthos clusters').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJzdmc4OTYzNCIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMTI4Ljk4NjQzIDEzMi4yMDY5MSIgaGVpZ2h0PSIxMzIuMjA2OTFtbSIgd2lkdGg9IjEyOC45ODY0M21tIj4mI3hhOyAgJiN4YTsgIDxkZWZzIGlkPSJkZWZzODk2MzEiLz4mI3hhOyAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTQyLjM0MzE1MSwtODAuNzIwMTM1KSIgaWQ9ImxheWVyMSI+JiN4YTsgICAgPHBhdGggdHJhbnNmb3JtPSJzY2FsZSgwLjI2NDU4MzMzKSIgZD0ibSAzMTAuNzI0NjEsMzA1LjA4Mzk4IGEgNDMuMTAyNzA0LDQzLjEwMjcwNCAwIDAgMCAtNDMuMTAzNTIsNDMuMTAxNTcgNDMuMTAyNzA0LDQzLjEwMjcwNCAwIDAgMCA0My4xMDM1Miw0My4xMDM1MSA0My4xMDI3MDQsNDMuMTAyNzA0IDAgMCAwIDMuNzM0MzcsLTAuMTY2MDEgbCA1My4yNDAyNCw1NC43NzkyOSAtNzEuNTQ0OTIsNzMuNTA5NzcgLTQ5LjcyNjU3LC01MS41OTc2NiBhIDQzLjEwMjcwNCw0My4xMDI3MDQgMCAwIDAgMC43NjU2MywtOC4wNzIyNiA0My4xMDI3MDQsNDMuMTAyNzA0IDAgMCAwIC00My4xMDM1MiwtNDMuMTAxNTcgNDMuMTAyNzA0LDQzLjEwMjcwNCAwIDAgMCAtNDMuMTAxNTYsNDMuMTAxNTcgNDMuMTAyNzA0LDQzLjEwMjcwNCAwIDAgMCA0My4xMDE1Niw0My4xMDM1MSA0My4xMDI3MDQsNDMuMTAyNzA0IDAgMCAwIDcuMjY1NjMsLTAuNjIxMDkgbCAxNTYuNDc2NTYsMTYyLjM1OTM3IC01Mi44NTc0Miw1NC4xMTMyOSBhIDQzLjEwMjcwNCw0My4xMDI3MDQgMCAwIDAgLTMuOTA2MjUsLTAuMTc5NjkgNDMuMTAyNzA0LDQzLjEwMjcwNCAwIDAgMCAtNDMuMTAxNTYsNDMuMTAxNTYgNDMuMTAyNzA0LDQzLjEwMjcwNCAwIDAgMCA0My4xMDE1Niw0My4xMDM1MiA0My4xMDI3MDQsNDMuMTAyNzA0IDAgMCAwIDQzLjEwMzUyLC00My4xMDM1MiA0My4xMDI3MDQsNDMuMTAyNzA0IDAgMCAwIC0xLjQ4NjMzLC0xMS4yMTA5NCBMIDQ4Ni4xMTkxNCw2MTMuODEyNSA0NTAuOTY2OCw1NzkuNDc4NTIgNDAyLjE3OTY5LDYyOS40MTYwMiAzMzAuMjczNDQsNTU0LjgwODU5IDQ4OS42ODc1LDM5MS4wMzEyNSBhIDQzLjEwMjcwNCw0My4xMDI3MDQgMCAwIDAgNy4wNjgzNiwwLjYwMzUyIDQzLjEwMjcwNCw0My4xMDI3MDQgMCAwIDAgNDMuMTAzNTIsLTQzLjEwMTU3IDQzLjEwMjcwNCw0My4xMDI3MDQgMCAwIDAgLTQzLjEwMzUyLC00My4xMDM1MSA0My4xMDI3MDQsNDMuMTAyNzA0IDAgMCAwIC00My4xMDE1Niw0My4xMDM1MSA0My4xMDI3MDQsNDMuMTAyNzA0IDAgMCAwIDAuODIyMjYsOC4yMjQ2MSBsIC01Mi40ODgyOCw1My45MjU3OCAtNDkuNjg5NDUsLTUxLjEzMDg2IGEgNDMuMTAyNzA0LDQzLjEwMjcwNCAwIDAgMCAxLjUyOTI5LC0xMS4zNjcxOCA0My4xMDI3MDQsNDMuMTAyNzA0IDAgMCAwIC00My4xMDM1MSwtNDMuMTAxNTcgeiBtIDI5My43MTg3NSwxMTEuNzc5MyBhIDQzLjEwMjcwNCw0My4xMDI3MDQgMCAwIDAgLTQzLjEwMzUyLDQzLjEwMTU2IDQzLjEwMjcwNCw0My4xMDI3MDQgMCAwIDAgMC4zMjgxMyw1LjA1ODYgbCAtNTMuMDMzMiw1NC44OTA2MiAtNDkuNDg4MjksLTUwLjIxMDk0IC0zNC45OTgwNCwzNC40ODgyOSAxMzcuMzM3ODksMTM5LjM0NzY1IEEgNDMuMTAyNzA0LDQzLjEwMjcwNCAwIDAgMCA1NjAuOTk2MDksNjUwIDQzLjEwMjcwNCw0My4xMDI3MDQgMCAwIDAgNjA0LjA5OTYxLDY5My4xMDM1MiA0My4xMDI3MDQsNDMuMTAyNzA0IDAgMCAwIDY0Ny4yMDMxMiw2NTAgYSA0My4xMDI3MDQsNDMuMTAyNzA0IDAgMCAwIC00My4xMDM1MSwtNDMuMTAxNTYgNDMuMTAyNzA0LDQzLjEwMjcwNCAwIDAgMCAtOC44MTI1LDAuOTMzNTkgbCAtNTIuMTUwMzksLTUyLjkxNDA2IDUxLjI1NTg2LC01My4wNTQ2OSBhIDQzLjEwMjcwNCw0My4xMDI3MDQgMCAwIDAgMTAuMDUwNzgsMS4yMDUwOCA0My4xMDI3MDQsNDMuMTAyNzA0IDAgMCAwIDQzLjEwMTU2LC00My4xMDM1MiA0My4xMDI3MDQsNDMuMTAyNzA0IDAgMCAwIC00My4xMDE1NiwtNDMuMTAxNTYgeiBtIC0zNjYuMTc3NzQsMTYxLjU5NTcgLTI3LjQwODIsMjkuMzI4MTMgYSA0My4xMDI3MDQsNDMuMTAyNzA0IDAgMCAwIC03LjcxODc1LC0wLjY5NzI3IDQzLjEwMjcwNCw0My4xMDI3MDQgMCAwIDAgLTQzLjEwMTU2LDQzLjEwMzUyIDQzLjEwMjcwNCw0My4xMDI3MDQgMCAwIDAgNDMuMTAxNTYsNDMuMTAxNTYgNDMuMTAyNzA0LDQzLjEwMjcwNCAwIDAgMCA0My4xMDM1MiwtNDMuMTAxNTYgNDMuMTAyNzA0LDQzLjEwMjcwNCAwIDAgMCAtMC42NzM4MywtNy41ODM5OCBsIDI4LjU5NTcsLTMwLjYwNTQ3IHogbSAyMjEuODEwNTUsMTA5LjQ2NjggLTM1LjQzOTQ1LDM0LjAyMzQ0IDI5LjAyNTM5LDMwLjIzNjMzIGEgNDMuMTAyNzA0LDQzLjEwMjcwNCAwIDAgMCAtMS4wNTg1OSw5LjQ3NDYxIDQzLjEwMjcwNCw0My4xMDI3MDQgMCAwIDAgNDMuMTAxNTYsNDMuMTAzNTEgNDMuMTAyNzA0LDQzLjEwMjcwNCAwIDAgMCA0My4xMDM1MSwtNDMuMTAzNTEgNDMuMTAyNzA0LDQzLjEwMjcwNCAwIDAgMCAtNDMuMTAzNTEsLTQzLjEwMTU3IDQzLjEwMjcwNCw0My4xMDI3MDQgMCAwIDAgLTUuODI2MTcsMC40MTQwNyB6IiBzdHlsZT0iY29sb3I6IzAwMDAwMDtvcGFjaXR5OjE7ZmlsbDojNDI4NWY0O2ZpbGwtb3BhY2l0eToxO3N0cm9rZS13aWR0aDo0NS4zNTQzO3N0cm9rZS1saW5lam9pbjpyb3VuZDstaW5rc2NhcGUtc3Ryb2tlOm5vbmUiIGlkPSJwYXRoODk3NTciLz4mI3hhOyAgPC9nPiYjeGE7PC9zdmc+;', 
		    		s * 41, s * 42, 'Anthos Service\nMesh', null, null, null, this.getTagsForStencil(gn, '', dt + 'anthos service mesh').join(' ')),

		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjQxNiIgaGVpZ2h0PSIzNjIuMjAwMDEyMjA3MDMxMjUiIHZpZXdCb3g9IjAgMCA0MTYgMzYyLjIwMDAxMjIwNzAzMTI1Ij4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOwkuc3Qxe2ZpbGw6IzY2OWRmNjt9JiN4YTsJLnN0MntmaWxsOiNhZWNiZmE7fSYjeGE7CTwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MiIgZD0iTTk2LjAzIDBMMCAxNjcuMTdoMTkwLjY3TDI4Ny45NCAweiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yODcuNTkgMzYyLjJsLTk1LjY4LTE2Ny4xN0gwTDk1LjY4IDM2Mi4yeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik00MTYgMTgxLjFMMzIwIDEzLjMxIDIyMy44OCAxODEuMSAzMjAgMzQ4Ljl6Ii8+JiN4YTs8L3N2Zz4=;', 
		    		s * 42, s * 36, 'Stackdriver', null, null, null, this.getTagsForStencil(gn, '', dt + 'stackdriver').join(' '))
	 	];
		
		this.addPalette('gcp2Icons Hybrid and Multi Cloud', 'GCP Icons / Hybrid and Multi Cloud', false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addGCP2IconsOpenSourceIconsPalette = function()
	{
		var sb = this;
		var s = 1;
		var n = 'sketch=0;html=1;verticalAlign=top;labelPosition=center;verticalLabelPosition=bottom;align=center;spacingTop=-6;fontSize=11;fontStyle=1;fontColor=#999999;shape=image;aspect=fixed;imageAspect=0;';
		var dt = 'gcp google cloud platform icons icon security ';
		var gn = 'mxgraph.gcp2';
		var fns = [];
		
		var fns = [
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjcwMi44NDYzMTM0NzY1NjI1IiBoZWlnaHQ9IjY4MS45NjcxMDIwNTA3ODEyIiB2aWV3Qm94PSIxMC4wMDEwMjYxNTM1NjQ0NTMgMTAuMDAwOTMzNjQ3MTU1NzYyIDcwMi44NDYzMTM0NzY1NjI1IDY4MS45NjcxMDIwNTA3ODEyIj4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojMzI2Y2U1O30mI3hhOwkuc3Qxe2ZpbGw6I2ZmZjt9JiN4YTsJPC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMzU4Ljk4NyAxMC4wNmMtNi4yMTMuMzEzLTEyLjMwMSAxLjg1NC0xNy45MDYgNC41MzFMOTYuNzM3IDEzMS4zNDJjLTEyLjgxMSA2LjExOC0yMi4xMTYgMTcuNjg5LTI1LjI4MSAzMS40MzhsLTYwLjI4MSAyNjIuMjVjLTIuODEyIDEyLjIwNy0uNTI0IDI1LjAyNCA2LjM0NCAzNS41MzFhNDYuMzUgNDYuMzUgMCAwIDAgMi42NTYgMy42ODhsMTY5LjEyNSAyMTAuMjgxYzguODY4IDExLjAyMiAyMi4zMTMgMTcuNDQgMzYuNTMxIDE3LjQzOGwyNzEuMjE5LS4wNjJjMTQuMjEyLjAxIDI3LjY1Ny02LjM5NiAzNi41MzEtMTcuNDA2bDE2OS4wNjMtMjEwLjMxM2M4Ljg3My0xMS4wMjggMTIuMTk3LTI1LjQ2NCA5LjAzMS0zOS4yMTlsLTYwLjM3NS0yNjIuMjVjLTMuMTY1LTEzLjc0OC0xMi40Ny0yNS4zMTktMjUuMjgxLTMxLjQzN0wzODEuNjQzIDE0LjU5MmMtNy4wNS0zLjM2OC0xNC44NDEtNC45MjYtMjIuNjU2LTQuNTMxeiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEgc3QyIiBkPSJNMzYxLjQwOCA5OS4zMDhjLTguMDc3LjAwMS0xNC42MjYgNy4yNzYtMTQuNjI1IDE2LjI1IDAgLjEzOC4wMjguMjY5LjAzMS40MDYtLjAxMiAxLjIxOS0uMDcxIDIuNjg4LS4wMzEgMy43NS4xOTMgNS4xNzYgMS4zMjEgOS4xMzcgMiAxMy45MDYgMS4yMyAxMC4yMDcgMi4yNjEgMTguNjY3IDEuNjI1IDI2LjUzMS0uNjE5IDIuOTY1LTIuODAzIDUuNjc3LTQuNzUgNy41NjNsLS4zNDQgNi4xODhjLTguNzc3LjcyNy0xNy42MTIgMi4wNTktMjYuNDM3IDQuMDYzLTM3Ljk3NSA4LjYyMi03MC42NyAyOC4xODMtOTUuNTYyIDU0LjU5NC0xLjYxNS0xLjEwMi00LjQ0MS0zLjEyOS01LjI4MS0zLjc1LTIuNjExLjM1My01LjI1IDEuMTU4LTguNjg3LS44NDQtNi41NDUtNC40MDYtMTIuNTA2LTEwLjQ4Ny0xOS43MTktMTcuODEyLTMuMzA1LTMuNTA0LTUuNjk4LTYuODQxLTkuNjI1LTEwLjIxOS0uODkyLS43NjctMi4yNTMtMS44MDUtMy4yNS0yLjU5NC0zLjA3LTIuNDQ4LTYuNjkxLTMuNzI0LTEwLjE4Ny0zLjg0NC00LjQ5Ni0uMTU0LTguODI0IDEuNjA0LTExLjY1NiA1LjE1Ni01LjAzNSA2LjMxNS0zLjQyMyAxNS45NjggMy41OTQgMjEuNTYzLjA3MS4wNTcuMTQ3LjEwMS4yMTkuMTU2Ljk2NC43ODIgMi4xNDUgMS43ODMgMy4wMzEgMi40MzggNC4xNjcgMy4wNzcgNy45NzMgNC42NTEgMTIuMTI1IDcuMDk0IDguNzQ3IDUuNDAyIDE1Ljk5OCA5Ljg4MSAyMS43NSAxNS4yODEgMi4yNDYgMi4zOTQgMi42MzkgNi42MTMgMi45MzggOC40MzhsNC42ODggNC4xODhjLTI1LjA5MyAzNy43NjQtMzYuNzA3IDg0LjQwOS0yOS44NDQgMTMxLjkzOGwtNi4xMjUgMS43ODFjLTEuNjE0IDIuMDg1LTMuODk1IDUuMzY1LTYuMjgxIDYuMzQ0LTcuNTI1IDIuMzctMTUuOTk0IDMuMjQxLTI2LjIxOSA0LjMxMy00LjguMzk5LTguOTQyLjE2MS0xNC4wMzEgMS4xMjUtMS4xMi4yMTItMi42ODEuNjE5LTMuOTA2LjkwNi0uMDQzLjAwOS0uMDgyLjAyMi0uMTI1LjAzMS0uMDY3LjAxNS0uMTU1LjA0OC0uMjE5LjA2My04LjYyIDIuMDgzLTE0LjE1OCAxMC4wMDYtMTIuMzc1IDE3LjgxM3MxMC4yMDMgMTIuNTU3IDE4Ljg3NSAxMC42ODhjLjA2My0uMDE0LjE1NC0uMDE3LjIxOS0uMDMxLjA5OC0uMDIyLjE4NC0uMDcuMjgxLS4wOTQgMS4yMDktLjI2NSAyLjcyNC0uNTYxIDMuNzgxLS44NDQgNS4wMDMtMS4zNCA4LjYyNy0zLjMwOCAxMy4xMjUtNS4wMzEgOS42NzctMy40NzEgMTcuNjkyLTYuMzcgMjUuNS03LjUgMy4yNjEtLjI1NSA2LjY5NyAyLjAxMiA4LjQwNiAyLjk2OWw2LjM3NS0xLjA5NGMxNC42NyA0NS40ODMgNDUuNDE0IDgyLjI0NSA4NC4zNDQgMTA1LjMxMmwtMi42NTYgNi4zNzVjLjk1NyAyLjQ3NSAyLjAxMyA1LjgyNSAxLjMgOC4yNjktMi44MzkgNy4zNjEtNy43MDEgMTUuMTMxLTEzLjIzOCAyMy43OTMtMi42ODEgNC4wMDItNS40MjUgNy4xMDgtNy44NDQgMTEuNjg4LS41NzkgMS4wOTYtMS4zMTYgMi43NzktMS44NzUgMy45MzgtMy43NTkgOC4wNDItMS4wMDIgMTcuMzA1IDYuMjE5IDIwLjc4MSA3LjI2NiAzLjQ5OCAxNi4yODQtLjE5MSAyMC4xODctOC4yNS4wMDYtLjAxMS4wMjYtLjAyLjAzMS0uMDMxcy0uMDA0LS4wMjMgMC0uMDMxYy41NTYtMS4xNDMgMS4zNDQtMi42NDQgMS44MTMtMy43MTkgMi4wNzItNC43NDcgMi43NjItOC44MTUgNC4yMTktMTMuNDA2IDMuODctOS43MiA1Ljk5Ni0xOS45MTkgMTEuMzIzLTI2LjI3NCAxLjQ1OS0xLjc0IDMuODM3LTIuNDA5IDYuMzAyLTMuMDdsMy4zMTMtNmMzMy45MzggMTMuMDI3IDcxLjkyNyAxNi41MjIgMTA5Ljg3NSA3LjkwNmExODkuNzcgMTg5Ljc3IDAgMCAwIDI1LjA5NC03LjU2MmwzLjEyNSA1LjYyNWMyLjUwNi44MTUgNS4yNCAxLjIzNiA3LjQ2OSA0LjUzMSAzLjk4NSA2LjgwOSA2LjcxMSAxNC44NjQgMTAuMDMxIDI0LjU5NCAxLjQ1NyA0LjU5MSAyLjE3OCA4LjY1OSA0LjI1IDEzLjQwNi40NzIgMS4wODIgMS4yNTYgMi42MDUgMS44MTMgMy43NSAzLjg5NSA4LjA4NSAxMi45NDIgMTEuNzg3IDIwLjIxOSA4LjI4MSA3LjIxOS0zLjQ3OCA5Ljk4LTEyLjc0IDYuMjE5LTIwLjc4MWwtMS45MDYtMy45MzdjLTIuNDE5LTQuNTgtNS4xNjMtNy42NTQtNy44NDQtMTEuNjU2LTUuNTM3LTguNjYyLTEwLjEzLTE1Ljg1OC0xMi45NjktMjMuMjE5LTEuMTg3LTMuNzk3LjItNi4xNTggMS4xMjUtOC42MjUtLjU1NC0uNjM1LTEuNzM5LTQuMjItMi40MzctNS45MDYgNDAuNDU3LTIzLjg4OCA3MC4yOTktNjIuMDIxIDg0LjMxMy0xMDYuMDYyIDEuODkyLjI5NyA1LjE4Mi44NzkgNi4yNSAxLjA5NCAyLjItMS40NTEgNC4yMjItMy4zNDQgOC4xODgtMy4wMzEgNy44MDggMS4xMjkgMTUuODIzIDQuMDMgMjUuNSA3LjUgNC40OTggMS43MjMgOC4xMjIgMy43MjMgMTMuMTI1IDUuMDYzIDEuMDU3LjI4MyAyLjU3Mi41NDcgMy43ODEuODEzLjA5Ny4wMjQuMTgzLjA3MS4yODEuMDk0LjA2NS4wMTUuMTU2LjAxNy4yMTkuMDMxIDguNjcyIDEuODY3IDE3LjA5NC0yLjg3OSAxOC44NzUtMTAuNjg3cy0zLjc1NC0xNS43MzItMTIuMzc1LTE3LjgxMmMtMS4yNTQtLjI4NS0zLjAzMi0uNzY5LTQuMjUtMS01LjA4OS0uOTY0LTkuMjMxLS43MjYtMTQuMDMxLTEuMTI1LTEwLjIyNS0xLjA3MS0xOC42OTMtMS45NDMtMjYuMjE5LTQuMzEyLTMuMDY4LTEuMTktNS4yNTEtNC44NDEtNi4zMTMtNi4zNDRsLTUuOTA2LTEuNzE5YzMuMDYyLTIyLjE1NCAyLjIzNy00NS4yMTEtMy4wNjItNjguMjgxLTUuMzQ4LTIzLjI4NS0xNC44LTQ0LjU4MS0yNy40MDYtNjMuMzQ0bDUuMTg4LTQuNjU2Yy4yMzctMi42MjQuMDMzLTUuMzc2IDIuNzUtOC4yODEgNS43NTEtNS40MDEgMTMuMDAzLTkuODc5IDIxLjc1LTE1LjI4MSA0LjE1Mi0yLjQ0MyA3Ljk5LTQuMDE3IDEyLjE1Ni03LjA5NC45NDItLjY5NiAyLjIyOS0xLjc5OCAzLjIxOS0yLjU5NCA3LjAxNS01LjU5NiA4LjYzMS0xNS4yNDggMy41OTQtMjEuNTYycy0xNC43OTctNi45MDktMjEuODEyLTEuMzEyYy0uOTk5Ljc5MS0yLjM1NCAxLjgyMy0zLjI1IDIuNTk0LTMuOTI3IDMuMzc4LTYuMzUxIDYuNzE0LTkuNjU2IDEwLjIxOS03LjIxMiA3LjMyNi0xMy4xNzQgMTMuNDM4LTE5LjcxOSAxNy44NDQtMi44MzYgMS42NTEtNi45OSAxLjA4LTguODc1Ljk2OWwtNS41NjIgMy45NjljLTMxLjcxOS0zMy4yNjEtNzQuOTA1LTU0LjUyNS0xMjEuNDA2LTU4LjY1NmwtLjM0NC02LjUzMWMtMS45MDQtMS44MjItNC4yMDMtMy4zNzctNC43ODEtNy4zMTItLjYzNi03Ljg2NC40MjYtMTYuMzI1IDEuNjU2LTI2LjUzMS42NzktNC43NjkgMS44MDctOC43MyAyLTEzLjkwNi4wNDQtMS4xNzctLjAyNi0yLjg4NC0uMDMxLTQuMTU2LS4wMDEtOC45NzQtNi41NDgtMTYuMjUxLTE0LjYyNS0xNi4yNXptLTE4LjMxMiAxMTMuNDM4bC00LjM0NCA3Ni43MTktLjMxMi4xNTZjLS4yOTEgNi44NjMtNS45NCAxMi4zNDQtMTIuODc1IDEyLjM0NGExMi44MiAxMi44MiAwIDAgMS03LjU5NC0yLjQ2OWwtLjEyNS4wNjMtNjIuOTA2LTQ0LjU5NGMxOS4zMzQtMTkuMDExIDQ0LjA2My0zMy4wNiA3Mi41NjItMzkuNTMxIDUuMjA2LTEuMTgyIDEwLjQxLTIuMDU5IDE1LjU5NC0yLjY4N3ptMzYuNjU2IDBjMzMuMjczIDQuMDkyIDY0LjA0NSAxOS4xNTkgODcuNjI1IDQyLjI1bC02Mi41IDQ0LjMxMy0uMjE5LS4wOTRhMTIuOTEgMTIuOTEgMCAwIDEtMTcuNjg3LTIuMzc1Yy0xLjc3MS0yLjIyMS0yLjcwMS00LjgzMi0yLjgxMi03LjQ2OWwtLjA2Mi0uMDMxek0yMzIuMTI2IDI4My42Mmw1Ny40MzcgNTEuMzc1LS4wNjIuMzEzYTEyLjg4IDEyLjg4IDAgMCAxIDEuNjI1IDE3Ljc1IDEyLjg5IDEyLjg5IDAgMCAxLTYuNjg3IDQuNDA2bC0uMDYyLjI1LTczLjYyNSAyMS4yNWMtMy43NDctMzQuMjY1IDQuMzI5LTY3LjU3NCAyMS4zNzUtOTUuMzQ0em0yNTguMTU2LjAzMWM4LjUzNCAxMy44MzMgMTQuOTk3IDI5LjI4MiAxOC44NDQgNDYuMDMxIDMuODAxIDE2LjU0OCA0Ljc1NSAzMy4wNjcgMy4xODggNDkuMDMxbC03NC0yMS4zMTItLjA2Mi0uMzEyYy02LjYyNy0xLjgxMS0xMC42OTktOC41NTItOS4xNTYtMTUuMzEyLjYzMi0yLjc3IDIuMTAyLTUuMTEzIDQuMDk0LTYuODQ0bC0uMDMxLS4xNTYgNTcuMTI1LTUxLjEyNXptLTE0MC42NTYgNTUuMzEzaDIzLjUzMWwxNC42MjUgMTguMjgxLTUuMjUgMjIuODEzLTIxLjEyNSAxMC4xNTYtMjEuMTg3LTEwLjE4Ny01LjI1LTIyLjgxMnptNzUuNDM4IDYyLjU2M2ExMi44MyAxMi44MyAwIDAgMSAyLjk2OS4yMTlsLjEyNS0uMTU2IDc2LjE1NiAxMi44NzVjLTExLjE0NiAzMS4zMTMtMzIuNDczIDU4LjQ0LTYwLjk2OSA3Ni41OTRsLTI5LjU2Mi03MS40MDYuMDk0LS4xMjVjLTIuNzE2LTYuMzEuMDAyLTEzLjcxIDYuMjUtMTYuNzE5IDEuNi0uNzcgMy4yNzEtMS4xOTcgNC45MzgtMS4yODF6bS0xMjcuOTA2LjMxM2ExMi45IDEyLjkgMCAwIDEgMTIuMzc1IDEwLjAzMSAxMi43NyAxMi43NyAwIDAgMS0uNzE5IDcuOTM4bC4yMTkuMjgxLTI5LjI1IDcwLjY4OGMtMjcuMzQ3LTE3LjU0OS00OS4xMjktNDMuODI0LTYwLjc4MS03Ni4wNjJsNzUuNS0xMi44MTIuMTI1LjE1NmMuODQ1LS4xNTUgMS43MDEtLjIzIDIuNTMxLS4yMTl6bTYzLjc4MSAzMC45NjljMi4wMjQtLjA3NCA0LjA3OS4zNDEgNi4wMzEgMS4yODEgMi41NiAxLjIzMyA0LjUzNyAzLjE3MyA1Ljc4MSA1LjVoLjI4MWwzNy4yMTkgNjcuMjVjLTQuODMgMS42MTktOS43OTYgMy4wMDMtMTQuODc1IDQuMTU2LTI4LjQ2NSA2LjQ2My01Ni44MzkgNC41MDUtODIuNTMxLTQuMjVsMzcuMTI1LTY3LjEyNWguMDYzYTEyLjkxIDEyLjkxIDAgMCAxIDEwLjkwNi02LjgxMnoiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIuMjUiLz4mI3hhOzwvc3ZnPg==;', 
		    		s * 42, s * 40, 'Kubernetes', null, null, null, this.getTagsForStencil(gn, '', dt + 'kubernetes').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjM0Ni4zMDMyMTgzOTM3OTEiIGhlaWdodD0iMzc5LjE5NjAwODk5NjY3Mjk2IiB2aWV3Qm94PSIwIDAgOTEuNjI1OTk5NDUwNjgzNiAxMDAuMzI5MDAyMzgwMzcxMSI+JiN4YTs8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDI4NWY0O30mI3hhOzwvc3R5bGU+JiN4YTsJPHBhdGggY2xhc3M9InN0MCIgZD0iTTQ3LjcyOSAxMDAuMzI5VjBsNDMuODk3IDI1LjAyNXYyMS41NjJsLTI2LjgtMTUuMzQxdjExLjk1bDEzLjIxMyA2Ljg3NnYxOS4xNzdsLTEzLjIxMy03LjcxN3YyOS4wNDZ6TTAgMjUuMDI1TDQzLjQ2MyAwdjEwMC4zMjlsLTE2Ljc1Ni05Ljc1MnYtNTkuMzNMMCA0Ni41ODd6Ii8+JiN4YTs8L3N2Zz4=;', 
		    		s * 38, s * 42, 'TensorFlow', null, null, null, this.getTagsForStencil(gn, '', dt + 'tensorflow').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjM2Ny4xMTQyMjUzOTM0NjQyIiBoZWlnaHQ9IjM3Ny4wNTUxMjc1Mzc1NjM3NSIgdmlld0JveD0iMC4wMDA1NTk4NjY0MjgzNzUyNDQxIC0wLjAwMDUwMzU0MDAzOTA2MjUgOTcuMTMyMzI0MjE4NzUgOTkuNzYyNTA0NTc3NjM2NzIiPiYjeGE7PHN0eWxlIHR5cGU9InRleHQvY3NzIj4mI3hhOwkuc3Qwe2ZpbGw6I2ZmYzUwYzt9JiN4YTsJLnN0MXtmaWxsOiMwMDY5YTY7fSYjeGE7PC9zdHlsZT4mI3hhOwk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNLjg4NiAzOC43MjVDLS42NTMgMzUuMzIyLjEzOCAxOS4wNzQuODM5IDE3LjMwNCAxMS45NCA4LjQ3OSAyNy4xMjMtLjEzMSA0OS40MTcuMDAxYzE3LjIwMyAwIDM2LjYwNCA4LjQ1MSA0Ni42MjEgMTcuMTM3IDEuMTY5IDQuODM0IDEuNDEgMTQuMzk5LjY4NCAyMS42ODEtMTEuNzM3LTEyLjAwMS0yOC40NjYtMTkuNDYtNDguMDI5LTE5LjQ2LTIwLjk3OCAwLTM4LjM3MiA5LjEyMy00Ny44MDcgMTkuMzY2eiIvPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0yLjQ3NiA0OC4yMmM5LjQ1LTEwLjkzMSAyNi40NTgtMjAuNTggNDYuMzA0LTIwLjU4IDE5LjQzOSAwIDM4LjMzNCAxMC4xMDcgNDYuMTY0IDIwLjkwNy0xLjI0NyA0LjY1NS0zLjc3NSAxMS4wNDItNS40MjYgMTQuNzMzLTEwLjY2NC0xNC4zODQtMjcuMjkyLTIxLjM3Mi00MS4zMzYtMjEuMzcyLTExLjAwNC41NDUtMTkuMzA0IDEuMjQ2LTMwLjkyMSAxMi4xNiA1Ljc2OCAyMS4wNCAyOC4xMzIgMzUuMTI4IDQxLjIyNyA0MC43MjEtMi45MDcgMS43MjEtNi40ODMgMy40OS0xMC4wODIgNC45NzMtMjQuMDItOS4yNTUtNDEuMTgtMjguMzgxLTQ1LjkzLTUxLjU0M3oiLz4mI3hhOzwvc3ZnPg==;', 
		    		s * 40, s * 42, 'Forseti\nSecurity', null, null, null, this.getTagsForStencil(gn, '', dt + 'forseti security').join(' ')),
		    this.createVertexTemplateEntry(n + 'image=data:image/svg+xml,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnY9Imh0dHBzOi8vdmVjdGEuaW8vbmFubyIgd2lkdGg9IjE2MCIgaGVpZ2h0PSIyNDAiIHZpZXdCb3g9IjAgMCAxNjAgMjQwIj4mI3hhOwk8c3R5bGUgdHlwZT0idGV4dC9jc3MiPiYjeGE7CS5zdDB7ZmlsbDojNDY2YmIwO30mI3hhOwk8L3N0eWxlPiYjeGE7CTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik02MCAyNDBMMCAyMTBoMTYwem0wLTE2MEwwIDIwMGw2MC0xMHpNNzAgMHYxOTBsOTAgMTB6Ii8+JiN4YTs8L3N2Zz4=;', 
		    		s * 27, s * 42, 'Istio', null, null, null, this.getTagsForStencil(gn, '', dt + 'istio').join(' '))
	 	];
		
		this.addPalette('gcp2Icons Open Source Icons', 'GCP Icons / Open Source Icons', false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addGCP2CardSet = function(label, icon, w1, w2, dt, fns)
	{
		var sb = this;
		var s = 'sketch=0;dashed=0;connectable=0;html=1;fillColor=#5184F3;strokeColor=none;' + mxConstants.STYLE_SHAPE + '=mxgraph.gcp2.hexIcon;prIcon=';
		var label1 = label.replace('\n', ' ');
		var label1 = label1.replace('- ', '-');

		fns.push(
			this.addEntry(dt, function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, w1, 60), 'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
			    var icon1 = new mxCell(label, new mxGeometry(0, 0.5, 44, 39), s + icon + ';part=1;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=middle;spacingLeft=5;fontColor=#999999;fontSize=12;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(5, -19.5);
		    	icon1.vertex = true;
		    	bg.insert(icon1);
		    	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, label1);
			})
		);
		
		fns.push(
			this.addEntry(dt, function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, w2, 60), 'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>' + label1, new mxGeometry(0, 0.5, 44, 39), s + icon + ';part=1;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=middle;spacingLeft=5;fontColor=#999999;fontSize=12;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(5, -19.5);
		    	icon1.vertex = true;
		    	bg.insert(icon1);
		    	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, label1);
			})			
		);
			
		fns.push(
			this.addEntry(dt, function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, w2 + 8, 68), 'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;');
		    	bg.vertex = true;
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>' + label1, new mxGeometry(0, 0.5, 44, 39), s + icon + ';part=1;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=middle;spacingLeft=5;fontColor=#999999;fontSize=12;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(5, -19.5);
		    	icon1.vertex = true;
		    	bg.insert(icon1);
		    	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, label1);
			})
		);
	};
	
	Sidebar.prototype.addGCP2ProductCardSet = function(label, icon, scaleX, scaleY, w1, w2, dt, fns)
	{
		var sb = this;
		var s = 'sketch=0;dashed=0;connectable=0;html=1;fillColor=#5184F3;strokeColor=none;' + mxConstants.STYLE_SHAPE + '=mxgraph.gcp2.';
		var label1 = label.replace('\n', ' ');
		var label1 = label1.replace('- ', '-');

		fns.push(
			this.addEntry(dt, function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, w1, 60), 'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
			    var icon1 = new mxCell(label, new mxGeometry(0, 0, 45 * scaleX, 45 * scaleY), s + icon + ';part=1;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=middle;spacingLeft=5;fontColor=#999999;fontSize=12;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(5, 7 + (1 - scaleY) * 22.5);
		    	icon1.vertex = true;

		    	bg.insert(icon1);
		    	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, label1);
			})
		);
		
		fns.push(
			this.addEntry(dt, function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, w2, 60), 'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>' + label1, new mxGeometry(0, 0, 45 * scaleX, 45 * scaleY), s + icon + ';part=1;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=middle;spacingLeft=5;fontColor=#999999;fontSize=12;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(5, 7 + (1 - scaleY) * 22.5);
		    	icon1.vertex = true;
		    	bg.insert(icon1);
		    	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, label1);
			})			
		);
			
		fns.push(
			this.addEntry(dt, function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, w2 + 8, 68), 'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;');
		    	bg.vertex = true;
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>' + label1, new mxGeometry(0, 0, 45 * scaleX, 45 * scaleY), s + icon + ';part=1;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=middle;spacingLeft=5;fontColor=#999999;fontSize=12;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(5, 7 + (1 - scaleY) * 22.5);
		    	icon1.vertex = true;
		    	bg.insert(icon1);
		    	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, label1);
			})
		);
	};
	
	Sidebar.prototype.addGCP2ServiceCard = function(label, icon, w, h, dt, fns)
	{
		var sb = this;
		var s = 'sketch=0;dashed=0;connectable=0;html=1;fillColor=#757575;strokeColor=none;' + mxConstants.STYLE_SHAPE + '=mxgraph.gcp2.';
		var label1 = label.replace('\n', ' ');
		var label1 = label1.replace('- ', '-');

		fns.push(
			this.addEntry(dt, function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, w, h), 'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
			    var icon1 = new mxCell(label, new mxGeometry(0, 0.5, 32, 32), s + icon + ';part=1;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=middle;spacingLeft=5;fontSize=12;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(5, -16);
		    	icon1.vertex = true;
		    	bg.insert(icon1);
		    	
			   	return sb.createVertexTemplateFromCells([bg], w, h, label1);
			})
		);
	};
	
	Sidebar.prototype.addGCP2ExpandedProductCardSet = function(label, icon, w, dt, fns)
	{
		var sb = this;
		var s = 'sketch=0;dashed=0;connectable=0;html=1;fillColor=#5184F3;strokeColor=none;' + mxConstants.STYLE_SHAPE + '=mxgraph.gcp2.';
		var label1 = label.replace('\n', ' ');
		var label1 = label1.replace('- ', '-');

		fns.push(
			this.addEntry(dt, function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, w, 70), 'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>' + label1 + '<hr><font style="font-size: 11px">Attribute Name</font>', 
			    		new mxGeometry(0, 0, 44, 39), s + icon + ';part=1;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=top;spacingLeft=5;fontColor=#999999;fontSize=12;spacingTop=-8;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(5, 7);
		    	icon1.vertex = true;
		    	bg.insert(icon1);
		    	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, label1);
			})
		);
		
		fns.push(
			this.addEntry(dt, function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, w + 8, 78), 'shape=mxgraph.gcp2.doubleRect;strokeColor=#dddddd;shadow=1;strokeWidth=1;');
		    	bg.vertex = true;
			    var icon1 = new mxCell('<font color="#000000">Name</font><br>' + label1 + '<hr><font style="font-size: 11px">Attribute Name</font>', 
			    		new mxGeometry(0, 0, 44, 39), s + icon + ';part=1;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=top;spacingLeft=5;fontColor=#999999;fontSize=12;spacingTop=-8;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(5, 7);
		    	icon1.vertex = true;
		    	bg.insert(icon1);
		    	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, label1);
			})			
		);
	};

	Sidebar.prototype.addGCP2ExpandedMachineCard = function(label, mainIcon, aspectX, aspectY, capacityLabel, machineNum1, machineIcon, machineNum2, storageIcon, storageNum, additionalModifierIcon, w, dt, fns)
	{
		var sb = this;
		var s = 'sketch=0;dashed=0;connectable=0;html=1;fillColor=#757575;strokeColor=none;' + mxConstants.STYLE_SHAPE + '=mxgraph.gcp2.';
		var label1 = label.replace('\n', ' ');
		var label1 = label1.replace('- ', '-');

		fns.push(
			this.addEntry(dt, function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, w, 95), 'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
		    	bg.vertex = true;
		    	
			    var mainTitleCell = new mxCell('<font color="#000000">' + label1 + '</font><hr>' + capacityLabel, 
			    		new mxGeometry(0, 0, w, 50), 'text;part=1;html=1;align=left;verticalAlign=top;spacingLeft=35;fontColor=#999999;fontSize=11;resizeWidth=1;');
			    mainTitleCell.geometry.relative = true;
			    mainTitleCell.vertex = true;
		    	bg.insert(mainTitleCell);
			    
			    var mainIconCell = new mxCell('', 
			    		new mxGeometry(0, 0, 25 * aspectX, 25 * aspectY), s + mainIcon + ';part=1;');
			    mainIconCell.geometry.relative = true;
			    mainIconCell.geometry.offset = new mxPoint(4 + 12.5 * (1 - aspectX), 6 + 12.5 * (1 - aspectY));
			    mainIconCell.vertex = true;
		    	bg.insert(mainIconCell);
			    
			    var machineCell = new mxCell('', 
			    		new mxGeometry(0, 0, 20, 20), s + machineIcon + ';part=1;');
			    machineCell.geometry.relative = true;
			    machineCell.geometry.offset = new mxPoint(35, 55);
			    machineCell.vertex = true;
		    	bg.insert(machineCell);
			    
			    var machineNum1Cell = new mxCell(machineNum1, 
			    		new mxGeometry(0, 0, 18, 18), 'sketch=0;rounded=1;arcSize=50;part=1;fillColor=#3B8CF0;strokeColor=none;html=1;fontColor=#ffffff;spacingTop=-2;');
			    machineNum1Cell.geometry.relative = true;
			    machineNum1Cell.geometry.offset = new mxPoint(24, 69);
			    machineNum1Cell.vertex = true;
		    	bg.insert(machineNum1Cell);
			    
			    var machineNum2Cell = new mxCell(machineNum2, 
			    		new mxGeometry(0, 0, 18, 18), 'sketch=0;rounded=1;arcSize=50;part=1;fillColor=#3B8CF0;strokeColor=none;html=1;fontColor=#ffffff;spacingTop=-2;');
			    machineNum2Cell.geometry.relative = true;
			    machineNum2Cell.geometry.offset = new mxPoint(50, 69);
			    machineNum2Cell.vertex = true;
		    	bg.insert(machineNum2Cell);
			    
			    var storageCell = new mxCell('', 
			    		new mxGeometry(0, 0, 20, 18), s + storageIcon + ';part=1;');
			    storageCell.geometry.relative = true;
			    storageCell.geometry.offset = new mxPoint(75, 56);
			    storageCell.vertex = true;
		    	bg.insert(storageCell);
			    
			    var storageNumCell = new mxCell(storageNum, 
			    		new mxGeometry(0, 0, 18, 18), 'sketch=0;rounded=1;arcSize=50;part=1;fillColor=#3B8CF0;strokeColor=none;html=1;fontColor=#ffffff;spacingTop=-2;');
			    storageNumCell.geometry.relative = true;
			    storageNumCell.geometry.offset = new mxPoint(88, 69);
			    storageNumCell.vertex = true;
		    	bg.insert(storageNumCell);
			    
			    var additionalModifierCell = new mxCell('', 
			    		new mxGeometry(0, 0, 20, 20), s + additionalModifierIcon + ';part=1;');
			    additionalModifierCell.geometry.relative = true;
			    additionalModifierCell.geometry.offset = new mxPoint(115, 55);
			    additionalModifierCell.vertex = true;
		    	bg.insert(additionalModifierCell);
		    	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, label1);
			})
		);
		
		fns.push(
				this.addEntry(dt, function()
			   	{
				    var bg = new mxCell('', new mxGeometry(0, 0, w, 95), 'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;');
			    	bg.vertex = true;
			    	
				    var mainTitleCell = new mxCell('<font color="#000000">' + label1 + '</font><hr>' + capacityLabel, 
				    		new mxGeometry(0, 0, w, 50), 'text;connectable=0;part=1;html=1;align=left;verticalAlign=top;spacingLeft=35;fontColor=#999999;fontSize=11;resizeWidth=1;');
				    mainTitleCell.geometry.relative = true;
				    mainTitleCell.vertex = true;
			    	bg.insert(mainTitleCell);
				    
				    var mainIconCell = new mxCell('', 
				    		new mxGeometry(0, 0, 25 * aspectX, 25 * aspectY), s + mainIcon + ';part=1;');
				    mainIconCell.geometry.relative = true;
				    mainIconCell.geometry.offset = new mxPoint(4 + 12.5 * (1 - aspectX), 6 + 12.5 * (1 - aspectY));
				    mainIconCell.vertex = true;
			    	bg.insert(mainIconCell);
				    
				    var machineCell = new mxCell('', 
				    		new mxGeometry(0, 0, 20, 20), s + machineIcon + ';part=1;');
				    machineCell.geometry.relative = true;
				    machineCell.geometry.offset = new mxPoint(35, 55);
				    machineCell.vertex = true;
			    	bg.insert(machineCell);
				    
				    var machineNum1Cell = new mxCell(machineNum1, 
				    		new mxGeometry(0, 0, 18, 18), 'sketch=0;connectable=0;rounded=1;arcSize=50;part=1;fillColor=#3B8CF0;strokeColor=none;html=1;fontColor=#ffffff;spacingTop=-2;');
				    machineNum1Cell.geometry.relative = true;
				    machineNum1Cell.geometry.offset = new mxPoint(24, 69);
				    machineNum1Cell.vertex = true;
			    	bg.insert(machineNum1Cell);
				    
				    var machineNum2Cell = new mxCell(machineNum2, 
				    		new mxGeometry(0, 0, 18, 18), 'sketch=0;connectable=0;rounded=1;arcSize=50;part=1;fillColor=#3B8CF0;strokeColor=none;html=1;fontColor=#ffffff;spacingTop=-2;');
				    machineNum2Cell.geometry.relative = true;
				    machineNum2Cell.geometry.offset = new mxPoint(50, 69);
				    machineNum2Cell.vertex = true;
			    	bg.insert(machineNum2Cell);
				    
				    var storageCell = new mxCell('', 
				    		new mxGeometry(0, 0, 20, 18), s + storageIcon + ';part=1;');
				    storageCell.geometry.relative = true;
				    storageCell.geometry.offset = new mxPoint(75, 56);
				    storageCell.vertex = true;
			    	bg.insert(storageCell);
				    
				    var storageNumCell = new mxCell('123', 
				    		new mxGeometry(0, 0, 25, 18), 'sketch=0;connectable=0;rounded=1;arcSize=50;part=1;fillColor=#3B8CF0;strokeColor=none;html=1;fontColor=#ffffff;spacingTop=-2;');
				    storageNumCell.geometry.relative = true;
				    storageNumCell.geometry.offset = new mxPoint(81, 69);
				    storageNumCell.vertex = true;
			    	bg.insert(storageNumCell);
				    
				    var additionalModifierCell = new mxCell('', 
				    		new mxGeometry(0, 0, 20, 20), s + additionalModifierIcon + ';part=1;');
				    additionalModifierCell.geometry.relative = true;
				    additionalModifierCell.geometry.offset = new mxPoint(115, 55);
				    additionalModifierCell.vertex = true;
			    	bg.insert(additionalModifierCell);
			    	
				   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, label1);
				})
			);
	};

	Sidebar.prototype.addGCP2UserDeviceCard = function(label, icon, scaleX, scaleY, h1, dt, fns)
	{
		var sb = this;
		var s = 'sketch=0;dashed=0;connectable=0;html=1;fillColor=#757575;strokeColor=none;' + mxConstants.STYLE_SHAPE + '=mxgraph.gcp2.';
		var label1 = label.replace('\n', ' ');
		var label1 = label1.replace('- ', '-');

		fns.push(
			this.addEntry(dt, function()
		   	{
			    var bg = new mxCell(label, new mxGeometry(0, 0, 70, 85  + h1), 
			    		'strokeColor=#dddddd;shadow=1;strokeWidth=1;rounded=1;absoluteArcSize=1;arcSize=2;labelPosition=center;verticalLabelPosition=middle;align=center;verticalAlign=bottom;spacingLeft=0;fontColor=#999999;fontSize=12;whiteSpace=wrap;spacingBottom=2;html=1;');
		    	bg.vertex = true;
			    var icon1 = new mxCell('', new mxGeometry(0.5, 0, 50 * scaleX, 50 * scaleY), s + icon + ';part=1;');
			    icon1.geometry.relative = true;
			    icon1.geometry.offset = new mxPoint(- scaleX * 25, 10 + (1 - scaleY) * 25);
		    	icon1.vertex = true;
		    	bg.insert(icon1);
		    	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, label1);
			})
		);
	};
})();
