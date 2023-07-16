(function()
{
	// Adds mockup shapes
	Sidebar.prototype.addAWS4bPalette = function()
	{
		var s = 1;
		var w = 80 * s;
		var h = 100 * s;
		var w2 = 60 * s;
		var n = 'sketch=0;outlineConnect=0;fontColor=#232F3E;gradientColor=none;strokeColor=#ffffff;fillColor=#232F3E;dashed=0;verticalLabelPosition=middle;verticalAlign=bottom;align=center;html=1;whiteSpace=wrap;fontSize=10;fontStyle=1;spacing=3;' + mxConstants.STYLE_SHAPE + "=mxgraph.aws4.";
		var n2 = 'sketch=0;outlineConnect=0;fontColor=#232F3E;gradientColor=none;strokeColor=#232F3E;fillColor=#ffffff;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;fontSize=12;fontStyle=0;aspect=fixed;' + mxConstants.STYLE_SHAPE + "=mxgraph.aws4.";
		var n3 = 'sketch=0;outlineConnect=0;gradientColor=none;fontColor=#545B64;strokeColor=none;fillColor=#879196;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;fontSize=12;fontStyle=0;aspect=fixed;' + mxConstants.STYLE_SHAPE + "=mxgraph.aws4.";
		var n4 = 'sketch=0;outlineConnect=0;gradientColor=none;html=1;whiteSpace=wrap;fontSize=12;fontStyle=0;' + mxConstants.STYLE_SHAPE + "=mxgraph.aws4.";
		var gn = 'mxgraph.aws4';
		var sb = this;

		this.setCurrentSearchEntryLibrary('aws4b', 'aws4bArrows');
		this.addAWS4bArrowsPalette(gn, sb);
		this.setCurrentSearchEntryLibrary('aws4b', 'aws4bGeneral Resources');
		this.addAWS4bGeneralResourcesPalette(w, h, w2, n, n2, gn, sb);
		this.setCurrentSearchEntryLibrary('aws4b', 'aws4bIllustrations');
		this.addAWS4bIllustrationsPalette(n3, gn, sb);
		this.setCurrentSearchEntryLibrary('aws4b', 'aws4bGroups Light');
		this.addAWS4bGroupsLightPalette(n4, gn, sb);
		this.setCurrentSearchEntryLibrary('aws4b', 'aws4bGroups Dark');
		this.addAWS4bGroupsDarkPalette(n4, gn, sb);
		this.setCurrentSearchEntryLibrary('aws4b', 'aws4bAnalytics');
		this.addAWS4bAnalyticsPalette(w, h, w2, n, n2, gn, sb);
		this.setCurrentSearchEntryLibrary('aws4b', 'aws4bApplication Integration');
		this.addAWS4bApplicationIntegrationPalette(w, h, w2, n, n2, gn, sb);
		this.setCurrentSearchEntryLibrary('aws4b', 'aws4bAR VR');
		this.addAWS4bARVRPalette(w, h, w2, n, n2, gn, sb);
		this.setCurrentSearchEntryLibrary('aws4b', 'aws4bCost Management');
		this.addAWS4bCostManagementPalette(w, h, w2, n, n2, gn, sb);
		this.setCurrentSearchEntryLibrary('aws4b', 'aws4bBusiness Productivity');
		this.addAWS4bBusinessProductivityPalette(w, h, w2, n, n2, gn, sb);
		this.setCurrentSearchEntryLibrary('aws4b', 'aws4bCompute');
		this.addAWS4bComputePalette(w, h, w2, n, n2, gn, sb);
		this.setCurrentSearchEntryLibrary('aws4b', 'aws4bCustomer Engagement');
		this.addAWS4bCustomerEngagementPalette(w, h, w2, n, n2, gn, sb);
		this.setCurrentSearchEntryLibrary('aws4b', 'aws4bDatabase');
		this.addAWS4bDatabasePalette(w, h, w2, n, n2, gn, sb);
		this.setCurrentSearchEntryLibrary('aws4b', 'aws4bDesktop App Streaming');
		this.addAWS4bDesktopAppStreamingPalette(w, h, w2, n, n2, gn, sb);
		this.setCurrentSearchEntryLibrary('aws4b', 'aws4bDeveloper Tools');
		this.addAWS4bDeveloperToolsPalette(w, h, w2, n, n2, gn, sb);
		this.setCurrentSearchEntryLibrary('aws4b', 'aws4bGame Development');
		this.addAWS4bGameDevelopmentPalette(w, h, w2, n, n2, gn, sb);
		this.setCurrentSearchEntryLibrary('aws4b', 'aws4bInternet of Things');
		this.addAWS4bInternetOfThingsPalette(w, h, w2, n, n2, gn, sb);
		this.setCurrentSearchEntryLibrary('aws4b', 'aws4bIoT Things');
		this.addAWS4bIOTThingsPalette(w, h, w2, n, n2, gn, sb);
		this.setCurrentSearchEntryLibrary('aws4b', 'aws4bIoT Resources');
		this.addAWS4bIOTResourcesPalette(w, h, w2, n, n2, gn, sb);
		this.setCurrentSearchEntryLibrary('aws4b', 'aws4bMachine Learning');
		this.addAWS4bMachineLearningPalette(w, h, w2, n, n2, gn, sb);
		this.setCurrentSearchEntryLibrary('aws4b', 'aws4bManagement Tools');
		this.addAWS4bManagementToolsPalette(w, h, w2, n, n2, gn, sb);
		this.setCurrentSearchEntryLibrary('aws4b', 'aws4bMedia Services');
		this.addAWS4bMediaServicesPalette(w, h, w2, n, n2, gn, sb);
		this.setCurrentSearchEntryLibrary('aws4b', 'aws4bMigration');
		this.addAWS4bMigrationPalette(w, h, w2, n, n2, gn, sb);
		this.setCurrentSearchEntryLibrary('aws4b', 'aws4bMobile Services');
		this.addAWS4bMobileServicesPalette(w, h, w2, n, n2, gn, sb);
		this.setCurrentSearchEntryLibrary('aws4b', 'aws4bNetwork Content Delivery');
		this.addAWS4bNetworkContentDeliveryPalette(w, h, w2, n, n2, gn, sb);
		this.setCurrentSearchEntryLibrary('aws4b', 'aws4bSecurity Identity Compliance');
		this.addAWS4bSecurityIdentityCompliancePalette(w, h, w2, n, n2, gn, sb);
		this.setCurrentSearchEntryLibrary('aws4b', 'aws4bStorage');
		this.addAWS4bStoragePalette(w, h, w2, n, n2, gn, sb);
		this.setCurrentSearchEntryLibrary();
	};
	
	Sidebar.prototype.addAWS4bArrowsPalette = function(gn, sb)
	{
		var dt = 'aws amazon web service arrows arrow ';
		
		this.addPaletteFunctions('aws4bArrows', 'AWS18 / Arrows', false,
		[
			this.createEdgeTemplateEntry('edgeStyle=orthogonalEdgeStyle;html=1;endArrow=none;elbow=vertical;startArrow=block;startFill=1;strokeColor=#545B64;rounded=0;', 
					100, 0, '', 'Default (left)', null, this.getTagsForStencil(gn, '', dt + 'default left').join(' ')),
			this.createEdgeTemplateEntry('edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;elbow=vertical;startArrow=none;endFill=1;strokeColor=#545B64;rounded=0;', 
					100, 0, '', 'Default (left)', null, this.getTagsForStencil(gn, '', dt + 'default left').join(' ')),
			this.createEdgeTemplateEntry('edgeStyle=orthogonalEdgeStyle;html=1;endArrow=block;elbow=vertical;startArrow=block;startFill=1;endFill=1;strokeColor=#545B64;rounded=0;', 
					100, 0, '', 'Default (double)', null, this.getTagsForStencil(gn, '', dt + 'default double').join(' ')),
			this.createEdgeTemplateEntry('edgeStyle=orthogonalEdgeStyle;html=1;endArrow=none;elbow=vertical;startArrow=openThin;startFill=0;strokeColor=#545B64;rounded=0;', 
					100, 0, '', 'Open (thin, left)', null, this.getTagsForStencil(gn, '', dt + 'open thin left').join(' ')),
			this.createEdgeTemplateEntry('edgeStyle=orthogonalEdgeStyle;html=1;endArrow=openThin;elbow=vertical;startArrow=none;endFill=0;strokeColor=#545B64;rounded=0;', 
					100, 0, '', 'Open (thin, left)', null, this.getTagsForStencil(gn, '', dt + 'open thin left').join(' ')),
			this.createEdgeTemplateEntry('edgeStyle=orthogonalEdgeStyle;html=1;endArrow=openThin;elbow=vertical;startArrow=openThin;startFill=0;endFill=0;strokeColor=#545B64;rounded=0;', 
					100, 0, '', 'Open (thin, double)', null, this.getTagsForStencil(gn, '', dt + 'open thin double').join(' ')),
			this.createEdgeTemplateEntry('edgeStyle=orthogonalEdgeStyle;html=1;endArrow=none;elbow=vertical;startArrow=open;startFill=0;strokeColor=#545B64;rounded=0;', 
					100, 0, '', 'Open (left)', null, this.getTagsForStencil(gn, '', dt + 'open left').join(' ')),
			this.createEdgeTemplateEntry('edgeStyle=orthogonalEdgeStyle;html=1;endArrow=open;elbow=vertical;startArrow=none;endFill=0;strokeColor=#545B64;rounded=0;', 
					100, 0, '', 'Open (left)', null, this.getTagsForStencil(gn, '', dt + 'open left').join(' ')),
			this.createEdgeTemplateEntry('edgeStyle=orthogonalEdgeStyle;html=1;endArrow=open;elbow=vertical;startArrow=open;startFill=0;endFill=0;strokeColor=#545B64;rounded=0;', 
					100, 0, '', 'Open (double)', null, this.getTagsForStencil(gn, '', dt + 'open double').join(' '))
		]);
	};

	Sidebar.prototype.addAWS4bGeneralResourcesPalette = function(w, h, w2, n, n2, gn, sb)
	{
		var dt = 'aws amazon web service general resources ';
		
		this.addPaletteFunctions('aws4bGeneral Resources', 'AWS18 / General Resources', false,
		[
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.aws_cloud;',
					 w2, w2, 'AWS Cloud', null, null, null, this.getTagsForStencil(gn, 'cloud', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.client;',
					 w2, w2, 'Client', null, null, null, this.getTagsForStencil(gn, 'client', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.corporate_data_center;',
					 w2, w2, 'Corporate\ndata center', null, null, null, this.getTagsForStencil(gn, 'corporate data center', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.disk;',
					 w2, w2, 'Disk', null, null, null, this.getTagsForStencil(gn, 'disk', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.forums;',
					 w2, w2, 'Forums', null, null, null, this.getTagsForStencil(gn, 'forums', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.generic_database;',
					 w2, w2, 'Generic\ndatabase', null, null, null, this.getTagsForStencil(gn, 'generic databas', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.internet;',
					 w2, w2, 'Internet', null, null, null, this.getTagsForStencil(gn, 'internet', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.internet_alt1;',
					 w2, w2, 'Internet alt1', null, null, null, this.getTagsForStencil(gn, 'internet alternative', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.internet_alt2;',
					 w2, w2, 'Internet alt2', null, null, null, this.getTagsForStencil(gn, 'internet alternative', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.mobile_client;',
					 w2, w2, 'Mobile client', null, null, null, this.getTagsForStencil(gn, 'mobile client', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.multimedia;',
					 w2, w2, 'Multimedia', null, null, null, this.getTagsForStencil(gn, 'multimedia', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.office_building;',
					 w2, w2, 'Office building', null, null, null, this.getTagsForStencil(gn, 'office building', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.saml_token;',
					 w2, w2, 'SAML token', null, null, null, this.getTagsForStencil(gn, 'saml token', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.ssl_padlock;',
					 w2, w2, 'SSL padlock', null, null, null, this.getTagsForStencil(gn, 'ssl padlock', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.tape_storage;',
					 w2, w2, 'Tape storage', null, null, null, this.getTagsForStencil(gn, 'tape storage', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.traditional_server;',
					 w2, w2, 'Traditional\nserver', null, null, null, this.getTagsForStencil(gn, 'traditional server', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.user;',
					 w2, w2, 'User', null, null, null, this.getTagsForStencil(gn, 'user', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.users;',
					 w2, w2, 'Users', null, null, null, this.getTagsForStencil(gn, 'users', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.virtual_private_cloud;',
					 w2, w2, 'Virtual private\ncloud', null, null, null, this.getTagsForStencil(gn, 'virtual private cloud vpc', dt).join(' '))
		]);
	};

	Sidebar.prototype.addAWS4bIllustrationsPalette = function(n3, gn, sb)
	{
		var dt = 'aws amazon web service illustrations ';
		
		this.addPaletteFunctions('aws4bIllustrations', 'AWS18 / Illustrations', false,
		[
			 this.createVertexTemplateEntry(n3 + 'illustration_users;pointerEvents=1',
					 100, 100, 'users', null, null, null, this.getTagsForStencil(gn, 'users', dt).join(' ')),
			 this.createVertexTemplateEntry(n3 + 'illustration_notification;pointerEvents=1',
					 100, 81, 'notification', null, null, null, this.getTagsForStencil(gn, 'users', dt).join(' ')),
			 this.createVertexTemplateEntry(n3 + 'illustration_devices;pointerEvents=1',
					 100, 73, 'devices', null, null, null, this.getTagsForStencil(gn, 'devices', dt).join(' ')),
			 this.createVertexTemplateEntry(n3 + 'illustration_desktop;pointerEvents=1',
					 100, 91, 'desktop', null, null, null, this.getTagsForStencil(gn, 'desktop', dt).join(' ')),
			 this.createVertexTemplateEntry(n3 + 'illustration_office_building;pointerEvents=1',
					 100, 71, 'office building', null, null, null, this.getTagsForStencil(gn, 'office building', dt).join(' '))
		]);
	};

	Sidebar.prototype.addAWS4bGroupsLightPalette = function(n4, gn, sb)
	{
		var dt = 'aws amazon web service groups group light ';
		
		this.addPaletteFunctions('aws4bGroups Light', 'AWS18 / Groups (light)', false,
		[
			 this.createVertexTemplateEntry(n4 + 'group;grIcon=' + gn + '.group_aws_cloud;strokeColor=#AAB7B8;fillColor=none;verticalAlign=top;align=left;spacingLeft=30;fontColor=#AAB7B8;dashed=0;',
					 130, 130, 'AWS Cloud', 'AWS Cloud', null, null, this.getTagsForStencil(gn, 'cloud', dt).join(' ')),
			 this.createVertexTemplateEntry(n4 + 'group;grIcon=' + gn + '.group_region;strokeColor=#879196;fillColor=none;verticalAlign=top;align=left;spacingLeft=30;fontColor=#879196;dashed=1;',
					 130, 130, 'Region', 'Region', null, null, this.getTagsForStencil(gn, 'region', dt).join(' ')),
			 this.createVertexTemplateEntry(n4 + 'group;grIcon=' + gn + '.group_vpc;strokeColor=#879196;fillColor=none;verticalAlign=top;align=left;spacingLeft=30;fontColor=#879196;dashed=0;',
					 130, 130, 'VPC', 'VPC', null, null, this.getTagsForStencil(gn, 'vpc virtual private cloud', dt).join(' ')),
			 this.createVertexTemplateEntry(n4 + 'group;grIcon=' + gn + '.group_availability_zone;strokeColor=#545B64;fillColor=none;verticalAlign=top;align=left;spacingLeft=30;fontColor=#545B64;dashed=1;',
					 130, 130, 'Availability zone', 'Availability zone', null, null, this.getTagsForStencil(gn, 'availability zone', dt).join(' ')),
			 this.createVertexTemplateEntry(n4 + 'group;grIcon=' + gn + '.group_subnet;strokeColor=#879196;fillColor=none;verticalAlign=top;align=left;spacingLeft=30;fontColor=#879196;dashed=0;',
					 130, 130, 'Subnet', 'Subnet', null, null, this.getTagsForStencil(gn, 'subnet', dt).join(' ')),
			 this.createVertexTemplateEntry(n4 + 'group;grIcon=' + gn + '.group_on_premise;strokeColor=#AAB7B8;fillColor=none;verticalAlign=top;align=left;spacingLeft=30;fontColor=#AAB7B8;dashed=0;',
					 130, 130, 'On-Premise', 'On-Premise', null, null, this.getTagsForStencil(gn, 'on premise', dt).join(' ')),
			 this.createVertexTemplateEntry(n4 + 'groupCenter;grIcon=' + gn + '.group_auto_scaling_group;grStroke=0;strokeColor=#879196;fillColor=#ECEFEF;verticalAlign=top;align=center;fontColor=#879196;dashed=0;spacingTop=25;',
					 130, 130, 'Auto Scaling Group', 'Auto Scaling Group', null, null, this.getTagsForStencil(gn, 'auto scaling', dt).join(' ')),
			 this.createVertexTemplateEntry(n4 + 'groupCenter;grIcon=' + gn + '.group_elastic_load_balancing;grStroke=1;strokeColor=#007DBC;fillColor=none;verticalAlign=top;align=center;fontColor=#007DBC;dashed=0;spacingTop=25;',
					 130, 130, 'Elastic Load Balancing', 'Elastic Load Balancing', null, null, this.getTagsForStencil(gn, 'elastic load balancing', dt).join(' ')),
			 this.createVertexTemplateEntry('outlineConnect=0;gradientColor=none;html=1;whiteSpace=wrap;fontSize=12;fontStyle=0;strokeColor=#879196;fillColor=none;verticalAlign=top;align=center;fontColor=#879196;dashed=1;spacingTop=3;',
					 130, 130, 'Generic Group', 'Generic Group', null, null, this.getTagsForStencil(gn, 'generic', dt).join(' ')),
			 this.createVertexTemplateEntry('outlineConnect=0;gradientColor=none;html=1;whiteSpace=wrap;fontSize=12;fontStyle=0;strokeColor=#FF9900;fillColor=none;verticalAlign=top;align=center;fontColor=#FF9900;dashed=0;spacingTop=3;',
					 130, 130, 'Highlight', 'Highlight', null, null, this.getTagsForStencil(gn, 'highlight', dt).join(' ')),
			 this.createVertexTemplateEntry(n4 + 'group;grIcon=' + gn + '.group_aws_step_functions_workflow;strokeColor=#545B64;fillColor=none;verticalAlign=top;align=left;spacingLeft=30;fontColor=#545B64;dashed=0;',
					 130, 130, 'AWS Step Functions workflow', 'AWS Step Functions workflow', null, null, this.getTagsForStencil(gn, 'step functions workflow', dt).join(' ')),
			 this.createVertexTemplateEntry(n4 + 'group;grIcon=' + gn + '.group_spot_fleet;strokeColor=#232F3E;fillColor=none;verticalAlign=top;align=left;spacingLeft=30;fontColor=#232F3E;dashed=0;',
					 130, 130, 'Spot Fleet', 'Spot Fleet', null, null, this.getTagsForStencil(gn, 'spot fleet', dt).join(' '))
		]);
	};

	Sidebar.prototype.addAWS4bGroupsDarkPalette = function(n4, gn, sb)
	{
		var dt = 'aws amazon web service groups group dark ';
		
		this.addPaletteFunctions('aws4bGroups Dark', 'AWS18 / Groups (dark)', false,
		[
			 this.createVertexTemplateEntry(n4 + 'group;grIcon=' + gn + '.group_aws_cloud;strokeColor=#858B94;fillColor=none;verticalAlign=top;align=left;spacingLeft=30;fontColor=#858B94;dashed=0;',
					 130, 130, 'AWS Cloud', 'AWS Cloud', null, null, this.getTagsForStencil(gn, 'cloud', dt).join(' ')),
			 this.createVertexTemplateEntry(n4 + 'group;grIcon=' + gn + '.group_region;strokeColor=#B6BABF;fillColor=none;verticalAlign=top;align=left;spacingLeft=30;fontColor=#B6BABF;dashed=1;',
					 130, 130, 'Region', 'Region', null, null, this.getTagsForStencil(gn, 'region', dt).join(' ')),
			 this.createVertexTemplateEntry(n4 + 'group;grIcon=' + gn + '.group_vpc;strokeColor=#B6BABF;fillColor=none;verticalAlign=top;align=left;spacingLeft=30;fontColor=#B6BABF;dashed=0;',
					 130, 130, 'VPC', 'VPC', null, null, this.getTagsForStencil(gn, 'vpc virtual private cloud', dt).join(' ')),
			 this.createVertexTemplateEntry(n4 + 'group;grIcon=' + gn + '.group_availability_zone;strokeColor=#E8E8E8;fillColor=none;verticalAlign=top;align=left;spacingLeft=30;fontColor=#E8E8E8;dashed=1;',
					 130, 130, 'Availability zone', 'Availability zone', null, null, this.getTagsForStencil(gn, 'availability zone', dt).join(' ')),
			 this.createVertexTemplateEntry(n4 + 'group;grIcon=' + gn + '.group_subnet;strokeColor=#E8E8E8;fillColor=none;verticalAlign=top;align=left;spacingLeft=30;fontColor=#E8E8E8;dashed=0;',
					 130, 130, 'Subnet', 'Subnet', null, null, this.getTagsForStencil(gn, 'subnet', dt).join(' ')),
			 this.createVertexTemplateEntry(n4 + 'group;grIcon=' + gn + '.group_on_premise;strokeColor=#858B94;fillColor=none;verticalAlign=top;align=left;spacingLeft=30;fontColor=#858B94;dashed=0;',
					 130, 130, 'On-Premise', 'On-Premise', null, null, this.getTagsForStencil(gn, 'on premise', dt).join(' ')),
			 this.createVertexTemplateEntry(n4 + 'groupCenter;grIcon=' + gn + '.group_auto_scaling_group;grStroke=0;strokeColor=#B6BABF;fillColor=#47515E;verticalAlign=top;align=center;fontColor=#B6BABF;dashed=0;spacingTop=25;',
					 130, 130, 'Auto Scaling Group', 'Auto Scaling Group', null, null, this.getTagsForStencil(gn, 'auto scaling', dt).join(' ')),
			 this.createVertexTemplateEntry(n4 + 'groupCenter;grIcon=' + gn + '.group_elastic_load_balancing;grStroke=1;strokeColor=#00A1C9;fillColor=none;verticalAlign=top;align=center;fontColor=#00A1C9;dashed=0;spacingTop=25;',
					 130, 130, 'Elastic Load Balancing', 'Elastic Load Balancing', null, null, this.getTagsForStencil(gn, 'elastic load balancing', dt).join(' ')),
			 this.createVertexTemplateEntry('outlineConnect=0;gradientColor=none;html=1;whiteSpace=wrap;fontSize=12;fontStyle=0;strokeColor=#858B94;fillColor=none;verticalAlign=top;align=center;fontColor=#858B94;dashed=1;spacingTop=3;',
					 130, 130, 'Generic Group', 'Generic Group', null, null, this.getTagsForStencil(gn, 'generic', dt).join(' ')),
			 this.createVertexTemplateEntry('outlineConnect=0;gradientColor=none;html=1;whiteSpace=wrap;fontSize=12;fontStyle=0;strokeColor=#FF9900;fillColor=none;verticalAlign=top;align=center;fontColor=#FF9900;dashed=0;spacingTop=3;',
					 130, 130, 'Highlight', 'Highlight', null, null, this.getTagsForStencil(gn, 'highlight', dt).join(' ')),
			 this.createVertexTemplateEntry(n4 + 'group;grIcon=' + gn + '.group_aws_step_functions_workflow;strokeColor=#E8E8E8;fillColor=none;verticalAlign=top;align=left;spacingLeft=30;fontColor=#E8E8E8;dashed=0;',
					 130, 130, 'AWS Step Functions workflow', 'AWS Step Functions workflow', null, null, this.getTagsForStencil(gn, 'step functions workflow', dt).join(' ')),
			 this.createVertexTemplateEntry(n4 + 'group;grIcon=' + gn + '.group_spot_fleet;strokeColor=#FFFFFF;fillColor=none;verticalAlign=top;align=left;spacingLeft=30;fontColor=#FFFFFF;dashed=0;',
					 130, 130, 'Spot Fleet', 'Spot Fleet', null, null, this.getTagsForStencil(gn, 'spot fleet', dt).join(' '))
		]);
	};

	Sidebar.prototype.addAWS4bAnalyticsPalette = function(w, h, w2, n, n2, gn, sb)
	{
		var dt = 'aws amazon web service analytics ';
		
		this.addPaletteFunctions('aws4bAnalytics', 'AWS18 / Analytics', false,
		[
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.athena;',
					 w, h + 10, 'Amazon Athena', null, null, null, this.getTagsForStencil(gn, 'athena', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.cloudsearch;',
					 w, h + 10, 'Amazon CloudSearch', null, null, null, this.getTagsForStencil(gn, 'cloudsearch cloud search', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.emr;',
					 w, h, 'Amazon EMR', null, null, null, this.getTagsForStencil(gn, 'emr', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.elasticsearch_service;',
					 w, h + 20, 'Amazon Elasticsearch Service', null, null, null, this.getTagsForStencil(gn, 'elasticsearch elastic search service', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.kinesis;',
					 w, h + 10, 'Amazon Kinesis', null, null, null, this.getTagsForStencil(gn, 'kinesis', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.kinesis_data_analytics;',
					 w, h + 20, 'Amazon Kinesis Data Analytics', null, null, null, this.getTagsForStencil(gn, 'kinesis data analytics', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.kinesis_data_firehose;',
					 w, h + 20, 'Amazon Kinesis Data Firehose', null, null, null, this.getTagsForStencil(gn, 'kinesis data firehose', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.kinesis_data_streams;',
					 w, h + 20, 'Amazon Kinesis Data Streams', null, null, null, this.getTagsForStencil(gn, 'kinesis data streams', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.kinesis_video_streams;',
					 w, h + 20, 'Amazon Kinesis Video Streams', null, null, null, this.getTagsForStencil(gn, 'kinesis video streams', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.redshift;',
					 w, h + 10, 'Amazon Redshift', null, null, null, this.getTagsForStencil(gn, 'redshift', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.quicksight;',
					 w, h + 10, 'Amazon QuickSight', null, null, null, this.getTagsForStencil(gn, 'quicksight quick sight', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.data_pipeline;',
					 w, h + 10, 'AWS Data Pipeline', null, null, null, this.getTagsForStencil(gn, 'data pipeline', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.glue;',
					 w, h, 'AWS Glue', null, null, null, this.getTagsForStencil(gn, 'glue', dt).join(' ')),
					 
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.search_documents;',
					 w2, w2, 'Search\ndocuments', null, null, null, this.getTagsForStencil(gn, 'search documents', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.cluster;',
					 w2, w2, 'Cluster', null, null, null, this.getTagsForStencil(gn, 'cluster', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.hdfs_cluster;',
					 w2, w2, 'HDFS cluster', null, null, null, this.getTagsForStencil(gn, 'hdfs cluster', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.emr_engine;',
					 w2, w2, 'EMR engine', null, null, null, this.getTagsForStencil(gn, 'emr engine', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.emr_engine_mapr_m3;',
					 w2, w2, 'EMR engine\nMapR M3', null, null, null, this.getTagsForStencil(gn, 'emr engine mapr m3', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.emr_engine_mapr_m5;',
					 w2, w2, 'EMR engine\nMapR M5', null, null, null, this.getTagsForStencil(gn, 'emr engine mapr m5', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.emr_engine_mapr_m7;',
					 w2, w2, 'EMR engine\nMapR M7', null, null, null, this.getTagsForStencil(gn, 'emr engine mapr m7', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.dense_compute_node;',
					 w2, w2, 'Dense\ncompute Node', null, null, null, this.getTagsForStencil(gn, 'dense compute node', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.dense_storage_node;',
					 w2, w2, 'Dense\nstorage Node', null, null, null, this.getTagsForStencil(gn, 'dense storage node', dt).join(' '))
		]);
	};

	Sidebar.prototype.addAWS4bApplicationIntegrationPalette = function(w, h, w2, n, n2, gn, sb)
	{
		var dt = 'aws amazon web service application integration ';
		
		this.addPaletteFunctions('aws4bApplication Integration', 'AWS18 / Application Integration', false,
		[
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.step_functions;',
					 w, h + 10, 'AWS Step Functions', null, null, null, this.getTagsForStencil(gn, 'step functions', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.mq;',
					 w, h, 'Amazon MQ', null, null, null, this.getTagsForStencil(gn, 'mq', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.sns;',
					 w, h, 'Amazon SNS', null, null, null, this.getTagsForStencil(gn, 'sns', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.sqs;',
					 w, h, 'Amazon SQS', null, null, null, this.getTagsForStencil(gn, 'sqs', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.appsync;',
					 w, h, 'AWS AppSync', null, null, null, this.getTagsForStencil(gn, 'appsync', dt).join(' ')),
					 
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.email_notification;',
					 w2, w2, 'Email\nnotification', null, null, null, this.getTagsForStencil(gn, 'email notification', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.http_notification;',
					 w2, w2, 'HTTP\nnotification', null, null, null, this.getTagsForStencil(gn, 'http notification', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.topic;',
					 w2, w2, 'Topic', null, null, null, this.getTagsForStencil(gn, 'topic', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.message;',
					 w2, w2, 'Message', null, null, null, this.getTagsForStencil(gn, 'message', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.queue;',
					 w2, w2, 'Queue', null, null, null, this.getTagsForStencil(gn, 'queue', dt).join(' '))
		]);
	};

	Sidebar.prototype.addAWS4bARVRPalette = function(w, h, w2, n, n2, gn, sb)
	{
		var dt = 'aws amazon web service ar vr augmented virtual reality';
		
		this.addPaletteFunctions('aws4bAR VR', 'AWS18 / AR & VR', false,
		[
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.sumerian;',
					 w, h + 10, 'Amazon Sumerian', null, null, null, this.getTagsForStencil(gn, 'sumerian', dt).join(' '))
		]);
	};

	Sidebar.prototype.addAWS4bCostManagementPalette = function(w, h, w2, n, n2, gn, sb)
	{
		var dt = 'aws amazon web service cost management ';
		
		this.addPaletteFunctions('aws4bCost Management', 'AWS18 / Cost Management', false,
		[
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.cost_explorer;',
					 w, h + 10, 'AWS Cost Explorer', null, null, null, this.getTagsForStencil(gn, 'cost explorer', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.budgets;',
					 w, h, 'AWS Budgets', null, null, null, this.getTagsForStencil(gn, 'budgets', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.cost_and_usage_report;',
					 w, h + 10, 'AWS Cost and Usage Report', null, null, null, this.getTagsForStencil(gn, 'cost usage report', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.reserved_instance_reporting;',
					 w, h + 20, 'Reserved Instance Reporting', null, null, null, this.getTagsForStencil(gn, 'reserved instance reporting', dt).join(' '))
		]);
	};

	Sidebar.prototype.addAWS4bBusinessProductivityPalette = function(w, h, w2, n, n2, gn, sb)
	{
		var dt = 'aws amazon web service business productivity ';
		
		this.addPaletteFunctions('aws4bBusiness Productivity', 'AWS18 / Business Productivity', false,
		[
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.alexa_for_business;',
					 w, h + 10, 'Alexa for Business', null, null, null, this.getTagsForStencil(gn, 'alexa for business', dt).join(' '))
		]);
	};

	Sidebar.prototype.addAWS4bComputePalette = function(w, h, w2, n, n2, gn, sb)
	{
		var dt = 'aws amazon web service compute ';
		
		this.addPaletteFunctions('aws4bCompute', 'AWS18 / Compute', false,
		[
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.ec2;',
					 w, h, 'Amazon EC2', null, null, null, this.getTagsForStencil(gn, 'ec2', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.ecr;',
					 w, h, 'Amazon ECR', null, null, null, this.getTagsForStencil(gn, 'ecr', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.ecs;',
					 w, h, 'Amazon ECS', null, null, null, this.getTagsForStencil(gn, 'ecs', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.eks;',
					 w, h, 'Amazon EKS', null, null, null, this.getTagsForStencil(gn, 'eks', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.lightsail;',
					 w, h + 10, 'Amazon Lightsail', null, null, null, this.getTagsForStencil(gn, 'lightsail', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.batch;',
					 w, h, 'AWS Batch', null, null, null, this.getTagsForStencil(gn, 'batch', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.elastic_beanstalk;',
					 w, h + 10, 'AWS Elastic Beanstalk', null, null, null, this.getTagsForStencil(gn, 'elastic beanstalk', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.fargate;',
					 w, h, 'AWS Fargate', null, null, null, this.getTagsForStencil(gn, 'fargate', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.lambda;',
					 w, h, 'AWS Lambda', null, null, null, this.getTagsForStencil(gn, 'lambda', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.serverless_application_repository;',
					 w, h + 35, 'AWS Serverless Application Repository', null, null, null, this.getTagsForStencil(gn, 'serverless application repository', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.elastic_load_balancing;',
					 w, h + 10, 'Elastic Load Balancing', null, null, null, this.getTagsForStencil(gn, 'elastic load balancing', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.application_load_balancer;',
					 w, h + 10, 'Application Load Balancer', null, null, null, this.getTagsForStencil(gn, 'application load balancer', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.classic_load_balancer;',
					 w, h + 10, 'Classic Load Balancer', null, null, null, this.getTagsForStencil(gn, 'classic load balancer', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.network_load_balancer;',
					 w, h + 10, 'Network Load Balancer', null, null, null, this.getTagsForStencil(gn, 'network load balancer', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.vmware_cloud_on_aws;',
					 w, h + 10, 'VMware Cloud on AWS', null, null, null, this.getTagsForStencil(gn, 'vmware cloud on', dt).join(' ')),
					 
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.ami;',
					 w2, w2, 'AMI', null, null, null, this.getTagsForStencil(gn, 'ami', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.auto_scaling;',
					 w2, w2, 'Auto Scaling', null, null, null, this.getTagsForStencil(gn, 'auto scaling', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.db_on_instance;',
					 w2, w2, 'DB on\nInstance', null, null, null, this.getTagsForStencil(gn, 'db on instance database', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.elastic_ip_address;',
					 w2, w2, 'Elastic IP\nAddress', null, null, null, this.getTagsForStencil(gn, 'elastic ip address internet protocol', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.instance_with_cloudwatch;',
					 w2, w2, 'Instance with\nCloudWatch', null, null, null, this.getTagsForStencil(gn, 'instance with cloudwatch', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.instance;',
					 w2, w2, 'Instance', null, null, null, this.getTagsForStencil(gn, 'instance', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.instances;',
					 w2, w2, 'Instances', null, null, null, this.getTagsForStencil(gn, 'instances', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.optimized_instance;',
					 w2, w2, 'Optimized\nInstance', null, null, null, this.getTagsForStencil(gn, 'optimized_instance', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.rescue;',
					 w2, w2, 'Rescue', null, null, null, this.getTagsForStencil(gn, 'rescue', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.spot_instance;',
					 w2, w2, 'Spot Instance', null, null, null, this.getTagsForStencil(gn, 'spot instance', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.x1_instance;',
					 w2, w2, 'X1 Instance', null, null, null, this.getTagsForStencil(gn, 'x1 instance', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.registry;',
					 w2, w2, 'Registry', null, null, null, this.getTagsForStencil(gn, 'registry', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.container_1;',
					 w2, w2, 'Container 1', null, null, null, this.getTagsForStencil(gn, 'container', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.container_2;',
					 w2, w2, 'Container 2', null, null, null, this.getTagsForStencil(gn, 'container', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.container_3;',
					 w2, w2, 'Container 3', null, null, null, this.getTagsForStencil(gn, 'container', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.application;',
					 w2, w2, 'Application', null, null, null, this.getTagsForStencil(gn, 'application', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.deployment;',
					 w2, w2, 'Deployment', null, null, null, this.getTagsForStencil(gn, 'deployment', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.lambda_function;',
					 w2, w2, 'Lambda\nFunction', null, null, null, this.getTagsForStencil(gn, 'lambda function', dt).join(' '))
		]);
	};

	Sidebar.prototype.addAWS4bCustomerEngagementPalette = function(w, h, w2, n, n2, gn, sb)
	{
		var dt = 'aws amazon web service customer engagement ';
		
		this.addPaletteFunctions('aws4bCustomer Engagement', 'AWS18 / Customer Engagement', false,
		[
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.connect;',
					 w, h + 10, 'Amazon Connect', null, null, null, this.getTagsForStencil(gn, 'connect', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.pinpoint;',
					 w, h + 10, 'Amazon Pinpoint', null, null, null, this.getTagsForStencil(gn, 'pinpoint', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.simple_email_service;',
					 w, h + 10, 'Amazon Simple Email Service', null, null, null, this.getTagsForStencil(gn, 'simple email service', dt).join(' ')),
					 
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.email;',
					 w2, w2, 'Email', null, null, null, this.getTagsForStencil(gn, 'email', dt).join(' '))
		]);
	};

	Sidebar.prototype.addAWS4bDatabasePalette = function(w, h, w2, n, n2, gn, sb)
	{
		var dt = 'aws amazon web service db database ';
		
		this.addPaletteFunctions('aws4bDatabase', 'AWS18 / Database', false,
		[
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.aurora;',
					 w, h + 10, 'Amazon\nAurora', null, null, null, this.getTagsForStencil(gn, 'aurora', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.dynamodb;',
					 w, h + 10, 'Amazon DynamoDB', null, null, null, this.getTagsForStencil(gn, 'dynamodb', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.elasticache;',
					 w, h + 10, 'Amazon ElastiCache', null, null, null, this.getTagsForStencil(gn, 'elasticache', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.elasticache_for_memcached;',
					 w, h + 20, 'Amazon ElastiCache for Memcached', null, null, null, this.getTagsForStencil(gn, 'elasticache for memcached', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.elasticache_for_redis;',
					 w, h + 20, 'Amazon ElastiCache for Redis', null, null, null, this.getTagsForStencil(gn, 'elasticache for redis', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.neptune;',
					 w, h + 10, 'Amazon Neptune', null, null, null, this.getTagsForStencil(gn, 'neptune', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.rds;',
					 w, h, 'Amazon RDS', null, null, null, this.getTagsForStencil(gn, 'rds', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.redshift;',
					 w, h + 10, 'Amazon Redshift', null, null, null, this.getTagsForStencil(gn, 'redshift', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.database_migration_service;',
					 w, h + 20, 'AWS Database Migration Service', null, null, null, this.getTagsForStencil(gn, 'db database migration service', dt).join(' ')),
					 
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.attribute;',
					 w2, w2, 'Attribute', null, null, null, this.getTagsForStencil(gn, 'attribute', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.attributes;',
					 w2, w2, 'Attributes', null, null, null, this.getTagsForStencil(gn, 'attributes', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.item;',
					 w2, w2, 'Item', null, null, null, this.getTagsForStencil(gn, 'item', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.items;',
					 w2, w2, 'Items', null, null, null, this.getTagsForStencil(gn, 'items', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.global_secondary_index;',
					 w2, w2, 'Global\nsecondary\nindex', null, null, null, this.getTagsForStencil(gn, 'global secondary index', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.table;',
					 w2, w2, 'Table', null, null, null, this.getTagsForStencil(gn, 'table', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.cache_node;',
					 w2, w2, 'Cache node', null, null, null, this.getTagsForStencil(gn, 'cache node', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.db_instance;',
					 w2, w2, 'DB instance', null, null, null, this.getTagsForStencil(gn, 'db instance', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.db_instance_standby;',
					 w2, w2, 'DB instance\nstandby', null, null, null, this.getTagsForStencil(gn, 'db instance standby', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.db_instance_read_replica;',
					 w2, w2, 'DB instance\nread replica', null, null, null, this.getTagsForStencil(gn, 'db instance read replica', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.piop;',
					 w2, w2, 'PIOP', null, null, null, this.getTagsForStencil(gn, 'piop', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.ms_sql_instance;',
					 w2, w2, 'MS SQL\ninstance', null, null, null, this.getTagsForStencil(gn, 'ms sql instance', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.ms_sql_instance_alternate;',
					 w2, w2, 'MS SQL\ninstance\nalternate', null, null, null, this.getTagsForStencil(gn, 'ms sql instance', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.mysql_db_instance;',
					 w2, w2, 'MySQL DB \ninstance', null, null, null, this.getTagsForStencil(gn, 'mysql db database instance', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.mysql_db_instance_alternate;',
					 w2, w2, 'MySQL DB \ninstance\nalternate', null, null, null, this.getTagsForStencil(gn, 'mysql db database instance alternate', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.oracle_db_instance;',
					 w2, w2, 'Oracle DB \ninstance', null, null, null, this.getTagsForStencil(gn, 'oracle db database instance', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.oracle_db_instance_alternate;',
					 w2, w2, 'Oracle DB \ninstance\nalternate', null, null, null, this.getTagsForStencil(gn, 'oracle db database instance alternate', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.sql_primary;',
					 w2, w2, 'SQL primary', null, null, null, this.getTagsForStencil(gn, 'sql primary', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.sql_replica;',
					 w2, w2, 'SQL replica', null, null, null, this.getTagsForStencil(gn, 'sql replica', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.postgresql_instance;',
					 w2, w2, 'PostgreSQL\ninstance', null, null, null, this.getTagsForStencil(gn, 'postresql instance', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.dense_compute_node;',
					 w2, w2, 'Dense\ncompute node', null, null, null, this.getTagsForStencil(gn, 'dense compute node', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.dense_storage_node;',
					 w2, w2, 'Dense\nstorage node', null, null, null, this.getTagsForStencil(gn, 'dense storage node', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.database_migration_workflow_job;',
					 w2, w2, 'Database\nmigration\nworkflow/job', null, null, null, this.getTagsForStencil(gn, 'database migration workflow job', dt).join(' '))
		]);
	};

	Sidebar.prototype.addAWS4bDesktopAppStreamingPalette = function(w, h, w2, n, n2, gn, sb)
	{
		var dt = 'aws amazon web service db database ';
		
		this.addPaletteFunctions('aws4bDesktop App Streaming', 'AWS18 / Desktop & App Streaming', false,
		[
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.appstream_20;',
					 w, h + 10, 'Amazon AppStream 2.0', null, null, null, this.getTagsForStencil(gn, 'appstream', dt).join(' '))
		]);
	};

	Sidebar.prototype.addAWS4bDeveloperToolsPalette = function(w, h, w2, n, n2, gn, sb)
	{
		var dt = 'aws amazon web service dev developer tools ';
		
		this.addPaletteFunctions('aws4bDeveloper Tools', 'AWS18 / Developer Tools', false,
		[
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.codestar;',
					 w, h, 'AWS CodeStar', null, null, null, this.getTagsForStencil(gn, 'codestar', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.cloud9;',
					 w, h, 'AWS Cloud9', null, null, null, this.getTagsForStencil(gn, 'cloud9', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.codebuild;',
					 w, h + 10, 'AWS CodeBuild', null, null, null, this.getTagsForStencil(gn, 'codebuild', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.codecommit;',
					 w, h + 10, 'AWS CodeCommit', null, null, null, this.getTagsForStencil(gn, 'codecommit', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.codedeploy;',
					 w, h + 10, 'AWS CodeDeploy', null, null, null, this.getTagsForStencil(gn, 'codedeploy', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.codepipeline;',
					 w, h + 10, 'AWS CodePipeline', null, null, null, this.getTagsForStencil(gn, 'codepipeline', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.command_line_interface;',
					 w, h + 20, 'AWS\nCommand Line Interface', null, null, null, this.getTagsForStencil(gn, 'command line interface', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.tools_and_sdks;',
					 w, h + 10, 'AWS Tools and SDKs', null, null, null, this.getTagsForStencil(gn, 'tools and sdks software development kit', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.xray;',
					 w, h, 'AWS X-Ray', null, null, null, this.getTagsForStencil(gn, 'ray xray', dt).join(' '))
		]);
	};

	Sidebar.prototype.addAWS4bGameDevelopmentPalette = function(w, h, w2, n, n2, gn, sb)
	{
		var dt = 'aws amazon web service game development ';
		
		this.addPaletteFunctions('aws4bGame Development', 'AWS18 / Game Development', false,
		[
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.gamelift;',
					 w, h + 10, 'Amazon GameLift', null, null, null, this.getTagsForStencil(gn, 'gamelift', dt).join(' '))
		]);
	};

	Sidebar.prototype.addAWS4bInternetOfThingsPalette = function(w, h, w2, n, n2, gn, sb)
	{
		var dt = 'aws amazon web service internet of things iot ';
		
		this.addPaletteFunctions('aws4bInternet of Things', 'AWS18 / Internet of Things', false,
		[
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.iot_core;',
					 w, h + 10, 'Amazon IoT Core', null, null, null, this.getTagsForStencil(gn, 'core', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.freertos;',
					 w, h + 10, 'Amazon FreeRTOS', null, null, null, this.getTagsForStencil(gn, 'freertos free rtos', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.greengrass;',
					 w, h + 10, 'AWS Greengrass', null, null, null, this.getTagsForStencil(gn, 'greengrass', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.iot_1click;',
					 w, h + 10, 'AWS IoT\n1-Click', null, null, null, this.getTagsForStencil(gn, '1click one click', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.iot_analytics;',
					 w, h + 10, 'AWS IoT Analytics', null, null, null, this.getTagsForStencil(gn, 'analytics', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.iot_button;',
					 w, h + 10, 'AWS IoT Button', null, null, null, this.getTagsForStencil(gn, 'button', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.iot_device_defender;',
					 w, h + 20, 'AWS IoT Device Defender', null, null, null, this.getTagsForStencil(gn, 'device defender', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.iot_device_management;',
					 w, h + 20, 'AWS IoT Device Management', null, null, null, this.getTagsForStencil(gn, 'device management', dt).join(' '))
		]);
	};

	Sidebar.prototype.addAWS4bIOTThingsPalette = function(w, h, w2, n, n2, gn, sb)
	{
		var dt = 'aws amazon web service internet of things iot ';
		
		this.addPaletteFunctions('aws4bIoT Things', 'AWS18 / IoT Things', false,
		[
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.bank;',
					 w2, w2, 'Bank', null, null, null, this.getTagsForStencil(gn, 'bank', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.bycicle;',
					 w2, w2, 'Bycicle', null, null, null, this.getTagsForStencil(gn, 'bycicle', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.camera;',
					 w2, w2, 'Camera', null, null, null, this.getTagsForStencil(gn, 'camera', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.car;',
					 w2, w2, 'Car', null, null, null, this.getTagsForStencil(gn, 'car', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.cart;',
					 w2, w2, 'Cart', null, null, null, this.getTagsForStencil(gn, 'cart', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.coffee_pot;',
					 w2, w2, 'Coffee Pot', null, null, null, this.getTagsForStencil(gn, 'coffee pot', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.door_lock;',
					 w2, w2, 'Door Lock', null, null, null, this.getTagsForStencil(gn, 'door lock', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.factory;',
					 w2, w2, 'Factory', null, null, null, this.getTagsForStencil(gn, 'factory', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.generic;',
					 w2, w2, 'Generic', null, null, null, this.getTagsForStencil(gn, 'generic', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.house;',
					 w2, w2, 'House', null, null, null, this.getTagsForStencil(gn, 'house', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.lightbulb;',
					 w2, w2, 'Lightbulb', null, null, null, this.getTagsForStencil(gn, 'lightbulb', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.medical_emergency;',
					 w2, w2, 'Medical\nEmergency', null, null, null, this.getTagsForStencil(gn, 'medical emergency', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.police_emergency;',
					 w2, w2, 'Police\nEmergency', null, null, null, this.getTagsForStencil(gn, 'police emergency', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.thermostat;',
					 w2, w2, 'Thermostat', null, null, null, this.getTagsForStencil(gn, 'thermostat', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.travel;',
					 w2, w2, 'Travel', null, null, null, this.getTagsForStencil(gn, 'travel', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.utility;',
					 w2, w2, 'Utility', null, null, null, this.getTagsForStencil(gn, 'utility', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.windfarm;',
					 w2, w2, 'Windfarm', null, null, null, this.getTagsForStencil(gn, 'windfarm', dt).join(' '))
		]);
	};

	Sidebar.prototype.addAWS4bIOTResourcesPalette = function(w, h, w2, n, n2, gn, sb)
	{
		var dt = 'aws amazon web service internet of things iot resources ';
		
		this.addPaletteFunctions('aws4bIoT Resources', 'AWS18 / IoT Resources', false,
		[
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.action;',
					 w2, w2, 'Action', null, null, null, this.getTagsForStencil(gn, 'action', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.actuator;',
					 w2, w2, 'Actuator', null, null, null, this.getTagsForStencil(gn, 'actuator', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.alexa_enabled_device;',
					 w2, w2, 'Alexa enabled\ndevice', null, null, null, this.getTagsForStencil(gn, 'alexa enabled device', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.alexa_skill;',
					 w2, w2, 'Alexa skill', null, null, null, this.getTagsForStencil(gn, 'alexa skill', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.alexa_smart_home_skill;',
					 w2, w2, 'Alexa smart\nhome skill', null, null, null, this.getTagsForStencil(gn, 'alexa smart home skill', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.alexa_voice_service;',
					 w2, w2, 'Alexa voice\nservice', null, null, null, this.getTagsForStencil(gn, 'alexa voice service', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.certificate_manager;',
					 w2, w2, 'Certificate\nmanager', null, null, null, this.getTagsForStencil(gn, 'certificate manager', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.desired_state;',
					 w2, w2, 'Desired state', null, null, null, this.getTagsForStencil(gn, 'desired state', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.echo;',
					 w2, w2, 'Echo', null, null, null, this.getTagsForStencil(gn, 'echo', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.firetv_stick;',
					 w2, w2, 'FireTV stick', null, null, null, this.getTagsForStencil(gn, 'firetv fire tv stick', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.firetv;',
					 w2, w2, 'FireTV', null, null, null, this.getTagsForStencil(gn, 'firetv fire tv', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.hardware_board;',
					 w2, w2, 'Hardware\nboard', null, null, null, this.getTagsForStencil(gn, 'hardware board', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.http2_protocol;',
					 w2, w2, 'HTTP/2\nprotocol', null, null, null, this.getTagsForStencil(gn, 'http2 protocol', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.http_protocol;',
					 w2, w2, 'HTTP\nprotocol', null, null, null, this.getTagsForStencil(gn, 'http protocol', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.lambda_function;',
					 w2, w2, 'Lambda Function', null, null, null, this.getTagsForStencil(gn, 'lambda function', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.mqtt_protocol;',
					 w2, w2, 'MQTT\nprotocol', null, null, null, this.getTagsForStencil(gn, 'mqtt protocol', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.policy;',
					 w2, w2, 'Policy', null, null, null, this.getTagsForStencil(gn, 'policy', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.reported_state;',
					 w2, w2, 'Reported\nstate', null, null, null, this.getTagsForStencil(gn, 'reported state', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.rule;',
					 w2, w2, 'Rule', null, null, null, this.getTagsForStencil(gn, 'rule', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.sensor;',
					 w2, w2, 'Sensor', null, null, null, this.getTagsForStencil(gn, 'sensor', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.servo;',
					 w2, w2, 'Servo', null, null, null, this.getTagsForStencil(gn, 'servo', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.shadow;',
					 w2, w2, 'Shadow', null, null, null, this.getTagsForStencil(gn, 'shadow', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.simulator;',
					 w2, w2, 'Simulator', null, null, null, this.getTagsForStencil(gn, 'simulator', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.topic_2;',
					 w2, w2, 'Topic', null, null, null, this.getTagsForStencil(gn, 'topic', dt).join(' '))
		]);
	};

	Sidebar.prototype.addAWS4bMachineLearningPalette = function(w, h, w2, n, n2, gn, sb)
	{
		var dt = 'aws amazon web service machine learning ';
		
		this.addPaletteFunctions('aws4bMachine Learning', 'AWS18 / Machine Learning', false,
		[
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.sagemaker;',
					 w, h + 10, 'Amazon SageMaker', null, null, null, this.getTagsForStencil(gn, 'sagemaker', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.comprehend;',
					 w, h + 10, 'Amazon Comprehend', null, null, null, this.getTagsForStencil(gn, 'comprehend', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.lex;',
					 w, h, 'Amazon Lex', null, null, null, this.getTagsForStencil(gn, 'lex', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.polly;',
					 w, h, 'Amazon Polly', null, null, null, this.getTagsForStencil(gn, 'polly', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.rekognition;',
					 w, h + 10, 'Amazon Rekognition', null, null, null, this.getTagsForStencil(gn, 'rekognition', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.rekognition_image;',
					 w, h + 20, 'Amazon Rekognition Image', null, null, null, this.getTagsForStencil(gn, 'rekognition image', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.rekognition_video;',
					 w, h + 20, 'Amazon Rekognition Video', null, null, null, this.getTagsForStencil(gn, 'rekognition video', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.translate;',
					 w, h + 10, 'Amazon Translate', null, null, null, this.getTagsForStencil(gn, 'translate', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.transcribe;',
					 w, h + 10, 'Amazon Transcribe', null, null, null, this.getTagsForStencil(gn, 'transcribe', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.deep_learning_amis;',
					 w, h + 10, 'AWS Deep Learning AMIs', null, null, null, this.getTagsForStencil(gn, 'deep learning amis', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.deeplens;',
					 w, h, 'AWS DeepLens', null, null, null, this.getTagsForStencil(gn, 'deeplens', dt).join(' '))
		]);
	};

	Sidebar.prototype.addAWS4bManagementToolsPalette = function(w, h, w2, n, n2, gn, sb)
	{
		var dt = 'aws amazon web service management tools ';
		
		this.addPaletteFunctions('aws4bManagement Tools', 'AWS18 / Management Tools', false,
		[
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.cloudwatch;',
					 w, h + 10, 'Amazon CloudWatch', null, null, null, this.getTagsForStencil(gn, 'cloudwatch', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.autoscaling;',
					 w, h + 10, 'AWS Auto Scaling', null, null, null, this.getTagsForStencil(gn, 'auto scaling', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.cloudformation;',
					 w, h + 10, 'AWS CloudFormation', null, null, null, this.getTagsForStencil(gn, 'cloudformation', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.cloudtrail;',
					 w, h + 10, 'AWS\nCloudTrail', null, null, null, this.getTagsForStencil(gn, 'cloudtrail', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.command_line_interface;',
					 w, h + 20, 'AWS\nCommand Line Interface', null, null, null, this.getTagsForStencil(gn, 'command line interface', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.config;',
					 w, h, 'AWS Config', null, null, null, this.getTagsForStencil(gn, 'config', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.management_console;',
					 w, h + 20, 'AWS Management Console', null, null, null, this.getTagsForStencil(gn, 'management console', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.managed_services;',
					 w, h + 10, 'AWS Managed Services', null, null, null, this.getTagsForStencil(gn, 'managed services', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.opsworks;',
					 w, h + 10, 'AWS OpsWorks', null, null, null, this.getTagsForStencil(gn, 'opsworks', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.service_catalog;',
					 w, h + 10, 'AWS Service Catalog', null, null, null, this.getTagsForStencil(gn, 'service catalog', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.personal_health_dashboard;',
					 w, h + 20, 'AWS Personal Health Dashboard', null, null, null, this.getTagsForStencil(gn, 'personal health dashboard', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.systems_manager;',
					 w, h + 10, 'AWS Systems Manager', null, null, null, this.getTagsForStencil(gn, 'systems manager', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.trusted_advisor;',
					 w, h + 10, 'AWS Trusted Advisor', null, null, null, this.getTagsForStencil(gn, 'trusted advisor', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.marketplace;',
					 w, h + 10, 'AWS Marketplace', null, null, null, this.getTagsForStencil(gn, 'marketplace', dt).join(' ')),
					 
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.alarm;',
					 w2, w2, 'Alarm', null, null, null, this.getTagsForStencil(gn, 'alarm', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.event_event_based;',
					 w2, w2, 'Event (event-\nbased)', null, null, null, this.getTagsForStencil(gn, 'event event based', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.event_time_based;',
					 w2, w2, 'Event (time-\nbased)', null, null, null, this.getTagsForStencil(gn, 'event time based', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.rule_2;',
					 w2, w2, 'Rule', null, null, null, this.getTagsForStencil(gn, 'rule', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.change_set;',
					 w2, w2, 'Change set', null, null, null, this.getTagsForStencil(gn, 'change set', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.stack;',
					 w2, w2, 'Stack', null, null, null, this.getTagsForStencil(gn, 'stack', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.template;',
					 w2, w2, 'Template', null, null, null, this.getTagsForStencil(gn, 'template', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.apps;',
					 w2, w2, 'Apps', null, null, null, this.getTagsForStencil(gn, 'apps', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.deployments;',
					 w2, w2, 'Deployments', null, null, null, this.getTagsForStencil(gn, 'deployments', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.instances_2;',
					 w2, w2, 'Instances', null, null, null, this.getTagsForStencil(gn, 'instances', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.layers;',
					 w2, w2, 'Layers', null, null, null, this.getTagsForStencil(gn, 'layers', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.monitoring;',
					 w2, w2, 'Monitoring', null, null, null, this.getTagsForStencil(gn, 'monitoring', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.permissions;',
					 w2, w2, 'Permissions', null, null, null, this.getTagsForStencil(gn, 'permissions', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.resources;',
					 w2, w2, 'Resources', null, null, null, this.getTagsForStencil(gn, 'resources', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.stack2;',
					 w2, w2, 'Stack2', null, null, null, this.getTagsForStencil(gn, 'stack stack2', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.automation;',
					 w2, w2, 'Automation', null, null, null, this.getTagsForStencil(gn, 'automation', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.documents;',
					 w2, w2, 'Documents', null, null, null, this.getTagsForStencil(gn, 'documents', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.inventory;',
					 w2, w2, 'Inventory', null, null, null, this.getTagsForStencil(gn, 'inventory', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.maintenance_windows;',
					 w2, w2, 'Maintenance\nwindows', null, null, null, this.getTagsForStencil(gn, 'maintenance windows', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.parameter_store;',
					 w2, w2, 'Parameter\nStore', null, null, null, this.getTagsForStencil(gn, 'parameter store', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.patch_manager;',
					 w2, w2, 'Patch\nmanager', null, null, null, this.getTagsForStencil(gn, 'patch manager', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.patch_manager;',
					 w2, w2, 'Patch\nmanager', null, null, null, this.getTagsForStencil(gn, 'patch manager', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.run_command;',
					 w2, w2, 'Run\ncommand', null, null, null, this.getTagsForStencil(gn, 'run command', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.state_manager;',
					 w2, w2, 'State\nmanager', null, null, null, this.getTagsForStencil(gn, 'state manager', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.checklist_cost;',
					 w2, w2, 'Checklist cost', null, null, null, this.getTagsForStencil(gn, 'checklist cost', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.checklist_fault_tolerant;',
					 w2, w2, 'Checklist fault\ntolerant', null, null, null, this.getTagsForStencil(gn, 'checklist fault tolerant', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.checklist_performance;',
					 w2, w2, 'Checklist\nperformance', null, null, null, this.getTagsForStencil(gn, 'checklist performance', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.checklist_security;',
					 w2, w2, 'Checklist\nsecurity', null, null, null, this.getTagsForStencil(gn, 'checklist security', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.checklist;',
					 w2, w2, 'Checklist', null, null, null, this.getTagsForStencil(gn, 'checklist', dt).join(' '))
		]);
	};

	Sidebar.prototype.addAWS4bMediaServicesPalette = function(w, h, w2, n, n2, gn, sb)
	{
		var dt = 'aws amazon web service media services ';
		
		this.addPaletteFunctions('aws4bMedia Services', 'AWS18 / Media Services', false,
		[
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.elastic_transcoder;',
					 w, h + 10, 'Amazon Elastic Transcoder', null, null, null, this.getTagsForStencil(gn, 'elastic transcoder', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.kinesis_video_streams;',
					 w, h + 20, 'Amazon Kinesis Video Streams', null, null, null, this.getTagsForStencil(gn, 'kinesis video streams', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.elemental_mediaconvert;',
					 w, h + 10, 'AWS Elemental MediaConvert', null, null, null, this.getTagsForStencil(gn, 'elemental mediaconvert', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.elemental_medialive;',
					 w, h + 10, 'AWS Elemental MediaLive', null, null, null, this.getTagsForStencil(gn, 'elemental medialive', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.elemental_mediapackage;',
					 w, h + 10, 'AWS Elemental MediaPackage', null, null, null, this.getTagsForStencil(gn, 'elemental mediapackage', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.elemental_mediastore;',
					 w, h + 10, 'AWS Elemental MediaStore', null, null, null, this.getTagsForStencil(gn, 'elemental mediastore', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.elemental_mediatailor;',
					 w, h + 10, 'AWS Elemental MediaTailor', null, null, null, this.getTagsForStencil(gn, 'elemental mediatailor', dt).join(' '))
		]);
	};

	Sidebar.prototype.addAWS4bMigrationPalette = function(w, h, w2, n, n2, gn, sb)
	{
		var dt = 'aws amazon web service migration ';
		
		this.addPaletteFunctions('aws4bMigration', 'AWS18 / Migration', false,
		[
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.migration_hub;',
					 w, h + 10, 'AWS Migration Hub', null, null, null, this.getTagsForStencil(gn, 'migration hub', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.application_discovery_service;',
					 w, h + 35, 'AWS Application Discovery Service', null, null, null, this.getTagsForStencil(gn, 'application discovery service', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.database_migration_service;',
					 w, h + 20, 'AWS Database Migration Service', null, null, null, this.getTagsForStencil(gn, 'db database migration service', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.server_migration_service;',
					 w, h + 20, 'AWS Server Migration Service', null, null, null, this.getTagsForStencil(gn, 'server migration service', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.snowball;',
					 w, h, 'AWS Snowball', null, null, null, this.getTagsForStencil(gn, 'snowball', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.snowball_edge;',
					 w, h + 10, 'AWS Snowball Edge', null, null, null, this.getTagsForStencil(gn, 'snowball edge', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.snowmobile;',
					 w, h + 10, 'AWS Snowmobile', null, null, null, this.getTagsForStencil(gn, 'snowmobile', dt).join(' '))
		]);
	};

	Sidebar.prototype.addAWS4bMobileServicesPalette = function(w, h, w2, n, n2, gn, sb)
	{
		var dt = 'aws amazon web service mobile services ';
		
		this.addPaletteFunctions('aws4bMobile Services', 'AWS18 / Mobile Services', false,
		[
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.appsync;',
					 w, h, 'AWS AppSync', null, null, null, this.getTagsForStencil(gn, 'appsync', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.api_gateway;',
					 w, h + 10, 'Amazon API Gateway', null, null, null, this.getTagsForStencil(gn, 'api gateway application programming interface', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.device_farm;',
					 w, h + 10, 'AWS Device Farm', null, null, null, this.getTagsForStencil(gn, 'device farm', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.mobile_hub;',
					 w, h + 10, 'AWS Mobile Hub', null, null, null, this.getTagsForStencil(gn, 'mobile hub', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.pinpoint;',
					 w, h + 10, 'Amazon Pinpoint', null, null, null, this.getTagsForStencil(gn, 'pinpoint', dt).join(' '))
		]);
	};

	Sidebar.prototype.addAWS4bNetworkContentDeliveryPalette = function(w, h, w2, n, n2, gn, sb)
	{
		var dt = 'aws amazon web service netowrk content delivery ';
		
		this.addPaletteFunctions('aws4bNetwork Content Delivery', 'AWS18 / Network & Content Delivery', false,
		[
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.vpc;',
					 w, h, 'Amazon VPC', null, null, null, this.getTagsForStencil(gn, 'vpc virtual private cloud', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.api_gateway;',
					 w, h + 10, 'Amazon API Gateway', null, null, null, this.getTagsForStencil(gn, 'api application programming interface gateway', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.cloudfront;',
					 w, h + 10, 'Amazon Cloudfront', null, null, null, this.getTagsForStencil(gn, 'cloudfront', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.privatelink;',
					 w, h + 10, 'AWS PrivateLink', null, null, null, this.getTagsForStencil(gn, 'privatelink', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.route_53;',
					 w, h + 10, 'Amazon Route 53', null, null, null, this.getTagsForStencil(gn, 'route 53', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.direct_connect;',
					 w, h + 10, 'AWS Direct Connect', null, null, null, this.getTagsForStencil(gn, 'direct connect', dt).join(' ')),
					 
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.customer_gateway;',
					 w2, w2, 'Customer\ngateway', null, null, null, this.getTagsForStencil(gn, 'customer gateway', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.elastic_network_adapter;',
					 w2, w2, 'Elastic\nnetwork\nadapter', null, null, null, this.getTagsForStencil(gn, 'elastic network adapter', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.elastic_network_interface;',
					 w2, w2, 'Elastic\nnetwork\ninterface', null, null, null, this.getTagsForStencil(gn, 'elastic network interface', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.endpoints;',
					 w2, w2, 'Endpoints', null, null, null, this.getTagsForStencil(gn, 'endpoints', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.flow_logs;',
					 w2, w2, 'Flow logs', null, null, null, this.getTagsForStencil(gn, 'flow logs', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.internet_gateway;',
					 w2, w2, 'Internet\ngateway', null, null, null, this.getTagsForStencil(gn, 'internet gateway', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.nat_gateway;',
					 w2, w2, 'NAT gateway', null, null, null, this.getTagsForStencil(gn, 'nat gateway', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.network_access_control_list;',
					 w2, w2, 'Network\naccess\ncontrol list', null, null, null, this.getTagsForStencil(gn, 'network access control list', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.peering;',
					 w2, w2, 'Peering', null, null, null, this.getTagsForStencil(gn, 'peering', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.router;',
					 w2, w2, 'Router', null, null, null, this.getTagsForStencil(gn, 'router', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.vpn_connection;',
					 w2, w2, 'VPN\nConnection', null, null, null, this.getTagsForStencil(gn, 'vpn virtual private network connection', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.vpn_gateway;',
					 w2, w2, 'VPN Gateway', null, null, null, this.getTagsForStencil(gn, 'vpn virtual private network gateway', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.download_distribution;',
					 w2, w2, 'Download\ndistribution', null, null, null, this.getTagsForStencil(gn, 'download distribution', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.edge_location;',
					 w2, w2, 'Edge location', null, null, null, this.getTagsForStencil(gn, 'edge location', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.streaming_distribution;',
					 w2, w2, 'Streaming\ndistribution', null, null, null, this.getTagsForStencil(gn, 'streaming distribution', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.hosted_zone;',
					 w2, w2, 'Hosted zone', null, null, null, this.getTagsForStencil(gn, 'hosted zone', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.route_table;',
					 w2, w2, 'Route table', null, null, null, this.getTagsForStencil(gn, 'route table', dt).join(' '))
		]);
	};

	Sidebar.prototype.addAWS4bSecurityIdentityCompliancePalette = function(w, h, w2, n, n2, gn, sb)
	{
		var dt = 'aws amazon web service security identity compliance ';
		
		this.addPaletteFunctions('aws4bSecurity Identity Compliance', 'AWS18 / Security, Identity & Compliance', false,
		[
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.identity_and_access_management;',
					 w, h + 20, 'AWS Identity and Access Management', null, null, null, this.getTagsForStencil(gn, 'identity and access management', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.cognito;',
					 w, h + 10, 'Amazon Cognito', null, null, null, this.getTagsForStencil(gn, 'cognito', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.guardduty;',
					 w, h + 10, 'Amazon GuardDuty', null, null, null, this.getTagsForStencil(gn, 'guard duty guardduty', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.inspector;',
					 w, h + 10, 'Amazon Inspector', null, null, null, this.getTagsForStencil(gn, 'inspector', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.artifact;',
					 w, h, 'AWS Artifact', null, null, null, this.getTagsForStencil(gn, 'artifact', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.certificate_manager_3;',
					 w, h + 10, 'AWS Certificate Manager', null, null, null, this.getTagsForStencil(gn, 'certificate manager', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.cloudhsm;',
					 w, h + 10, 'AWS CloudHSM', null, null, null, this.getTagsForStencil(gn, 'cloudhsm', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.directory_service;',
					 w, h + 10, 'AWS Directory Service', null, null, null, this.getTagsForStencil(gn, 'directory service', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.firewall_manager;',
					 w, h + 10, 'AWS Firewall Manager', null, null, null, this.getTagsForStencil(gn, 'firewall manager', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.key_management_service;',
					 w, h + 20, 'AWS Key Management Service', null, null, null, this.getTagsForStencil(gn, 'key management service', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.secrets_manager;',
					 w, h + 10, 'AWS Secrets Manager', null, null, null, this.getTagsForStencil(gn, 'secrets manager', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.shield;',
					 w, h, 'AWS Shield', null, null, null, this.getTagsForStencil(gn, 'shield', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.single_sign_on;',
					 w, h + 10, 'AWS Single Sign-On', null, null, null, this.getTagsForStencil(gn, 'single sign on', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.waf;',
					 w, h, 'AWS WAF', null, null, null, this.getTagsForStencil(gn, 'waf', dt).join(' ')),
					 
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.addon;',
					 w2, w2, 'Add-on', null, null, null, this.getTagsForStencil(gn, 'addon add on', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.sts;',
					 w2, w2, 'AWS STS', null, null, null, this.getTagsForStencil(gn, 'sts', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.sts_alternate;',
					 w2, w2, 'AWS STS\n(alternate)', null, null, null, this.getTagsForStencil(gn, 'sts alternate', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.data_encryption_key;',
					 w2, w2, 'Data\nencryption\nkey', null, null, null, this.getTagsForStencil(gn, 'data encryption key', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.encrypted_data;',
					 w2, w2, 'Encrypted\ndata', null, null, null, this.getTagsForStencil(gn, 'encrypted data', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.long_term_security_credential;',
					 w2, w2, 'Long-term\nsecurity\ncredential', null, null, null, this.getTagsForStencil(gn, 'long term security credential', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.mfa_token;',
					 w2, w2, 'MFA Token', null, null, null, this.getTagsForStencil(gn, 'mfa token', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.permissions;',
					 w2, w2, 'Permissions', null, null, null, this.getTagsForStencil(gn, 'permissions', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.role;',
					 w2, w2, 'Role', null, null, null, this.getTagsForStencil(gn, 'role', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.temporary_security_credential;',
					 w2, w2, 'Temporary\nsecurity\ncredential', null, null, null, this.getTagsForStencil(gn, 'temporary security credential', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.agent;',
					 w2, w2, 'Agent', null, null, null, this.getTagsForStencil(gn, 'agent', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.certificate_manager_2;',
					 w2, w2, 'Certificate\nmanager', null, null, null, this.getTagsForStencil(gn, 'certificate manager', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.filtering_rule;',
					 w2, w2, 'Filtering rule', null, null, null, this.getTagsForStencil(gn, 'filtering rule', dt).join(' '))
		]);
	};

	Sidebar.prototype.addAWS4bStoragePalette = function(w, h, w2, n, n2, gn, sb)
	{
		var dt = 'aws amazon web service storage ';
		
		this.addPaletteFunctions('aws4bStorage', 'AWS18 / Storage', false,
		[
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.s3;',
					 w, h, 'Amazon S3', null, null, null, this.getTagsForStencil(gn, 's3', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.elastic_block_store;',
					 w, h + 10, 'Amazon Elastic Block Store', null, null, null, this.getTagsForStencil(gn, 'elastic block store', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.elastic_file_system;',
					 w, h + 10, 'Amazon Elastic File System', null, null, null, this.getTagsForStencil(gn, 'elastic file system', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.glacier;',
					 w, h + 10, 'Amazon Glacier', null, null, null, this.getTagsForStencil(gn, 'glacier', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.snowball;',
					 w, h, 'AWS Snowball', null, null, null, this.getTagsForStencil(gn, 'snowball', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.snowball_edge;',
					 w, h + 10, 'AWS Snowball Edge', null, null, null, this.getTagsForStencil(gn, 'snowball edge', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.snowmobile;',
					 w, h + 10, 'AWS Snowmobile', null, null, null, this.getTagsForStencil(gn, 'snowmobile', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'productIcon;prIcon=' + gn + '.storage_gateway;',
					 w, h + 10, 'AWS Storage Gateway', null, null, null, this.getTagsForStencil(gn, 'storage gateway', dt).join(' ')),
					 
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.bucket;',
					 w2, w2, 'Bucket', null, null, null, this.getTagsForStencil(gn, 'bucket', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.snapshot;',
					 w2, w2, 'Snapshot', null, null, null, this.getTagsForStencil(gn, 'snapshot', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.bucket_with_objects;',
					 w2, w2, 'Bucket with\nobjects', null, null, null, this.getTagsForStencil(gn, 'bucket with objects', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.volume;',
					 w2, w2, 'Volume', null, null, null, this.getTagsForStencil(gn, 'volume', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.object;',
					 w2, w2, 'Object', null, null, null, this.getTagsForStencil(gn, 'object', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.archive;',
					 w2, w2, 'Archive', null, null, null, this.getTagsForStencil(gn, 'archive', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.vault;',
					 w2, w2, 'Vault', null, null, null, this.getTagsForStencil(gn, 'vault', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.import_export;',
					 w2, w2, 'Import/Export', null, null, null, this.getTagsForStencil(gn, 'import export', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.cached_volume;',
					 w2, w2, 'Cached\nvolume', null, null, null, this.getTagsForStencil(gn, 'cached volume', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.non_cached_volume;',
					 w2, w2, 'Non-Cached\nvolume', null, null, null, this.getTagsForStencil(gn, 'non cached volume', dt).join(' ')),
			 this.createVertexTemplateEntry(n2 + 'resourceIcon;resIcon=' + gn + '.virtual_tape_library;',
					 w2, w2, 'Virtual tape\nlibrary', null, null, null, this.getTagsForStencil(gn, 'virtual tape library vtl', dt).join(' '))
		]);
	};
})();
