(function()
{
	// Adds mockup shapes
	Sidebar.prototype.addAWS3Palette = function()
	{
		this.setCurrentSearchEntryLibrary('aws3', 'aws3Analytics');
		this.addAWS3AnalyticsPalette();
		this.setCurrentSearchEntryLibrary('aws3', 'aws3Application Services');
		this.addAWS3ApplicationServicesPalette();
		this.setCurrentSearchEntryLibrary('aws3', 'aws3Artificial Intelligence');
		this.addAWS3ArtificialIntelligencePalette();
		this.setCurrentSearchEntryLibrary('aws3', 'aws3Business Productivity');
		this.addAWS3BusinessProductivityPalette();
		this.setCurrentSearchEntryLibrary('aws3', 'aws3Compute');
		this.addAWS3ComputePalette();
		this.setCurrentSearchEntryLibrary('aws3', 'aws3Contact Center');
		this.addAWS3ContactCenterPalette();
		this.setCurrentSearchEntryLibrary('aws3', 'aws3Database');
		this.addAWS3DatabasePalette();
		this.setCurrentSearchEntryLibrary('aws3', 'aws3Desktop and App Streaming');
		this.addAWS3DesktopAndAppStreamingPalette();
		this.setCurrentSearchEntryLibrary('aws3', 'aws3Developer Tools');
		this.addAWS3DeveloperToolsPalette();
		this.setCurrentSearchEntryLibrary('aws3', 'aws3Game Development');
		this.addAWS3GameDevelopmentPalette();
		this.setCurrentSearchEntryLibrary('aws3', 'aws3General');
		this.addAWS3GeneralPalette();
		this.setCurrentSearchEntryLibrary('aws3', 'aws3Groups');
		this.addAWS3GroupsPalette();
		this.setCurrentSearchEntryLibrary('aws3', 'aws3Internet of Things');
		this.addAWS3InternetOfThingsPalette();
		this.setCurrentSearchEntryLibrary('aws3', 'aws3Management Tools');
		this.addAWS3ManagementToolsPalette();
		this.setCurrentSearchEntryLibrary('aws3', 'aws3Messaging');
		this.addAWS3MessagingPalette();
		this.setCurrentSearchEntryLibrary('aws3', 'aws3Migration');
		this.addAWS3MigrationPalette();
		this.setCurrentSearchEntryLibrary('aws3', 'aws3Mobile Services');
		this.addAWS3MobileServicesPalette();
		this.setCurrentSearchEntryLibrary('aws3', 'aws3Networking and Content Delivery');
		this.addAWS3NetworkAndContentDeliveryPalette();
		this.setCurrentSearchEntryLibrary('aws3', 'aws3On Demand Workforce');
		this.addAWS3OnDemandWorkforcePalette();
		this.setCurrentSearchEntryLibrary('aws3', 'aws3SDKs');
		this.addAWS3SDKPalette();
		this.setCurrentSearchEntryLibrary('aws3', 'aws3Security Identity and Compliance');
		this.addAWS3SecurityIdentityAndCompliancePalette();
		this.setCurrentSearchEntryLibrary('aws3', 'aws3Storage');
		this.addAWS3StoragePalette();
		this.setCurrentSearchEntryLibrary();
	};
	
	Sidebar.prototype.addAWS3AnalyticsPalette = function()
	{
		var sb = this;
		var n = 'outlineConnect=0;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.aws3.";
		var gn = 'mxgraph.aws3';
		var dt = 'aws amazon web service analytics';
		var s = 1.5; //scale
		
		this.addPaletteFunctions('aws3Analytics', 'AWS17 / Analytics', false,
		[
			 this.createVertexTemplateEntry(n + 'athena;fillColor=#F58534;gradientColor=none;',
					 s * 51, s * 51, '', 'Athena', null, null, this.getTagsForStencil(gn, 'athena', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'cloudsearch;fillColor=#F58534;gradientColor=none;',
					 s * 51, s * 62, '', 'CloudSearch', null, null, this.getTagsForStencil(gn, 'cloudsearch cloud search', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'elasticsearch_service;fillColor=#F58534;gradientColor=none;',
					 s * 45, s * 54, '', 'ElasticSearch Service', null, null, this.getTagsForStencil(gn, 'elasticsearch elastic search service', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'emr;fillColor=#F58534;gradientColor=none;',
					 s * 45, s * 54, '', 'EMR', null, null, this.getTagsForStencil(gn, 'emr', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'kinesis;fillColor=#F58534;gradientColor=none;',
					 s * 45, s * 54, '', 'Kinesis', null, null, this.getTagsForStencil(gn, 'kinesis', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'quicksight;fillColor=#00B7F4;gradientColor=none;',
					 s * 40, s * 40, '', 'QuickSight', null, null, this.getTagsForStencil(gn, 'quicksight quick sight', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'redshift;fillColor=#2E73B8;gradientColor=none;',
					 s * 45, s * 50, '', 'Redshift', null, null, this.getTagsForStencil(gn, 'redshift', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'data_pipeline;fillColor=#F58534;gradientColor=none;',
					 s * 45, s * 54, '', 'Data Pipeline', null, null, this.getTagsForStencil(gn, 'data pipeline', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'search_documents;fillColor=#F58534;gradientColor=none;',
					 s * 40, s * 42, '', 'Search Documents', null, null, this.getTagsForStencil(gn, 'search documents', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'emr_cluster;fillColor=#F58534;gradientColor=none;',
					 s * 37, s * 42, '', 'Cluster', null, null, this.getTagsForStencil(gn, 'emr cluster', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'emr_engine;fillColor=#F58534;gradientColor=none;',
					 s * 55, s * 40, '', 'EMR engine', null, null, this.getTagsForStencil(gn, 'emr engine', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'emr_engine_mapr_m3;fillColor=#F58534;gradientColor=none;',
					 s * 55, s * 40, '', 'EMR engine MapR M3', null, null, this.getTagsForStencil(gn, 'emr engine MapR M3', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'emr_engine_mapr_m5;fillColor=#F58534;gradientColor=none;',
					 s * 55, s * 40, '', 'EMR engine MapR M5', null, null, this.getTagsForStencil(gn, 'emr engine MapR M5', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'emr_engine_mapr_m7;fillColor=#F58534;gradientColor=none;',
					 s * 55, s * 40, '', 'EMR engine MapR M7', null, null, this.getTagsForStencil(gn, 'emr engine MapR M7', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'glue;fillColor=#F58534;gradientColor=none;',
					 s * 55, s * 66, '', 'Glue', null, null, this.getTagsForStencil(gn, 'glue', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'hdfs_cluster;fillColor=#F58534;gradientColor=none;',
					 s * 41, s * 42, '', 'HDFS Cluster', null, null, this.getTagsForStencil(gn, 'hdfs Cluster', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'kinesis_analytics;fillColor=#F58534;gradientColor=none;',
					 s * 49, s * 50, '', 'Kinesis Analytics', null, null, this.getTagsForStencil(gn, 'kinesis analytics', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'kinesis_enabled_app;fillColor=#F58534;gradientColor=none;',
					 s * 43, s * 45, '', 'Kinesis-enabled app', null, null, this.getTagsForStencil(gn, 'kinesis enabled app', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'kinesis_firehose;fillColor=#F58534;gradientColor=none;',
					 s * 40, s * 43, '', 'Kinesis Firehose', null, null, this.getTagsForStencil(gn, 'kinesis firehose', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'kinesis_streams;fillColor=#F58534;gradientColor=none;',
					 s * 40, s * 42, '', 'Kinesis Streams', null, null, this.getTagsForStencil(gn, 'kinesis streams', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'dense_compute_node;fillColor=#2E73B8;gradientColor=none;',
					 s * 37, s * 42, '', 'Dense Compute Node', null, null, this.getTagsForStencil(gn, 'dense compute node', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'dense_storage_node;fillColor=#2E73B8;gradientColor=none;',
					 s * 37, s * 42, '', 'Dense Storage Node', null, null, this.getTagsForStencil(gn, 'dense storage node', dt).join(' '))
		]);
	};
	
	Sidebar.prototype.addAWS3ApplicationServicesPalette = function()
	{
		var sb = this;
		var n = 'outlineConnect=0;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.aws3.";
		var gn = 'mxgraph.aws3';
		var dt = 'aws amazon web service app application services';
		var s = 1.5; //scale
		
		this.addPaletteFunctions('aws3Application Services', 'AWS17 / Application Services', false,
		[
			 this.createVertexTemplateEntry(n + 'elastic_transcoder;fillColor=#D9A741;gradientColor=none;',
					 s * 51, s * 62, '', 'Elastic Transcoder', null, null, this.getTagsForStencil(gn, 'elastic transcoder', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'api_gateway;fillColor=#D9A741;gradientColor=none;',
					 s * 51, s * 62, '', 'API Gateway', null, null, this.getTagsForStencil(gn, 'api gateway', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'step_functions;fillColor=#D9A741;gradientColor=none;',
					 s * 51, s * 62, '', 'Step Functions', null, null, this.getTagsForStencil(gn, 'step functions', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'swf;fillColor=#D9A741;gradientColor=none;',
					 s * 51, s * 62, '', 'SWF', null, null, this.getTagsForStencil(gn, 'swf', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'decider;fillColor=#D9A741;gradientColor=none;',
					 s * 41, s * 43, '', 'Decider', null, null, this.getTagsForStencil(gn, 'decider', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'worker;fillColor=#D9A741;gradientColor=none;',
					 s * 40, s * 42, '', 'Worker', null, null, this.getTagsForStencil(gn, 'worker', dt).join(' '))
		]);
	};
	
	Sidebar.prototype.addAWS3ArtificialIntelligencePalette = function()
	{
		var sb = this;
		var n = 'outlineConnect=0;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.aws3.";
		var gn = 'mxgraph.aws3';
		var dt = 'aws amazon web service ai artificial intelligence';
		var s = 1.5; //scale
		
		this.addPaletteFunctions('aws3Artificial Intelligence', 'AWS17 / Artificial Intelligence', false,
		[
			 this.createVertexTemplateEntry(n + 'lex;fillColor=#2E73B8;gradientColor=none;',
					 s * 51, s * 54, '', 'Lex', null, null, this.getTagsForStencil(gn, 'lex', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'machine_learning;fillColor=#2E73B8;gradientColor=none;',
					 s * 51, s * 62, '', 'Machine Learning', null, null, this.getTagsForStencil(gn, 'machine learning', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'polly;fillColor=#2E73B8;gradientColor=none;',
					 s * 51, s * 62, '', 'Polly', null, null, this.getTagsForStencil(gn, 'polly', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'rekognition;fillColor=#2E73B8;gradientColor=none;',
					 s * 51, s * 62, '', 'Rekognition', null, null, this.getTagsForStencil(gn, 'rekognition', dt).join(' '))
		]);
	};
	
	Sidebar.prototype.addAWS3BusinessProductivityPalette = function()
	{
		var sb = this;
		var n = 'outlineConnect=0;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.aws3.";
		var gn = 'mxgraph.aws3';
		var dt = 'aws amazon web service business productivity';
		var s = 1.5; //scale
		
		this.addPaletteFunctions('aws3Business Productivity', 'AWS17 / Business Productivity', false,
		[
			 this.createVertexTemplateEntry(n + 'chime;fillColor=#03B5BB;gradientColor=none;',
					 s * 66, s * 66, '', 'Chime', null, null, this.getTagsForStencil(gn, 'chime', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'workdocs;fillColor=#D16A28;gradientColor=#F58435;gradientDirection=north;',
					 s * 55, s * 63, '', 'WorkDocs', null, null, this.getTagsForStencil(gn, 'workdocs work docs documents', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'workmail;fillColor=#D16A28;gradientColor=#F58435;gradientDirection=north;',
					 s * 55, s * 63, '', 'WorkMail', null, null, this.getTagsForStencil(gn, 'workmail work mail', dt).join(' '))
		]);
	};
	
	Sidebar.prototype.addAWS3ComputePalette = function()
	{
		var sb = this;
		var n = 'outlineConnect=0;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.aws3.";
		var gn = 'mxgraph.aws3';
		var dt = 'aws amazon web service compute';
		var s = 1.5; //scale
		
		this.addPaletteFunctions('aws3Compute', 'AWS17 / Compute', false,
		[
		 
	 		 this.createVertexTemplateEntry(n + 'ami;fillColor=#F58534;gradientColor=none;',
	 				 s * 40, s * 42, '', 'AMI', null, null, this.getTagsForStencil(gn, 'ami', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'ec2;fillColor=#F58534;gradientColor=none;',
					 s * 51, s * 62, '', 'EC2', null, null, this.getTagsForStencil(gn, 'ec2', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'elastic_load_balancing;fillColor=#F58534;gradientColor=none;',
					 s * 51, s * 62, '', 'Elastic Load Balancing', null, null, this.getTagsForStencil(gn, 'elastic load balancing', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'auto_scaling;fillColor=#F58534;gradientColor=none;',
					 s * 53, s * 51, '', 'Auto Scaling', null, null, this.getTagsForStencil(gn, 'auto scaling', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'elastic_ip;fillColor=#F58534;gradientColor=none;',
					 s * 51, s * 14, '', 'Elastic IP', null, null, this.getTagsForStencil(gn, 'elastic ip', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'elastic_beanstalk;fillColor=#F58534;gradientColor=none;',
					 s * 45, s * 62, '', 'Elastic Beanstalk', null, null, this.getTagsForStencil(gn, 'elastic beanstalk', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'lambda;fillColor=#F58534;gradientColor=none;',
					 s * 51, s * 62, '', 'Lambda', null, null, this.getTagsForStencil(gn, 'lambda', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'ecs;fillColor=#F58534;gradientColor=none;',
					 s * 48, s * 45, '', 'ECS', null, null, this.getTagsForStencil(gn, 'ecs', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'db_on_instance;fillColor=#F58534;gradientColor=none;',
					 s * 40, s * 43, '', 'DB on Instance', null, null, this.getTagsForStencil(gn, 'db on instance database', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'instance;fillColor=#F58534;gradientColor=none;',
					 s * 40, s * 42, '', 'Instance', null, null, this.getTagsForStencil(gn, 'instance', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'lightsail;fillColor=#F58534;gradientColor=none;',
					 s * 51, s * 55, '', 'Lightsail', null, null, this.getTagsForStencil(gn, 'lightsail', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'endpoints;fillColor=#F58534;gradientColor=none;',
					 s * 46, s * 48, '', 'Endpoints', null, null, this.getTagsForStencil(gn, 'endpoints', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'instances;fillColor=#F58534;gradientColor=none;',
					 s * 40, s * 42, '', 'Instances', null, null, this.getTagsForStencil(gn, 'instances', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'elastic_network_interface;fillColor=#F58534;gradientColor=none;',
					 s * 46, s * 48, '', 'Elastic Network Interface', null, null, this.getTagsForStencil(gn, 'elastic network interface', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'internet_gateway;fillColor=#F58534;gradientColor=none;',
					 s * 46, s * 48, '', 'Internet Gateway', null, null, this.getTagsForStencil(gn, 'internet gateway', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'flow_logs;fillColor=#F58534;gradientColor=none;',
					 s * 46, s * 48, '', 'Flow Logs', null, null, this.getTagsForStencil(gn, 'flow logs', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'customer_gateway;fillColor=#F58534;gradientColor=none;',
					 s * 46, s * 48, '', 'Customer Gateway', null, null, this.getTagsForStencil(gn, 'customer gateway', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'instance_with_cloudwatch;fillColor=#F58534;gradientColor=none;',
					 s * 40, s * 42, '', 'Instance with CloudWatch', null, null, this.getTagsForStencil(gn, 'instance with cloudwatch', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'elastic_network_adapter;fillColor=#F58534;gradientColor=none;',
					 s * 50, s * 60, '', 'Elastic Network Adapter', null, null, this.getTagsForStencil(gn, 'elastic network adapter', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'optimized_instance;fillColor=#F58534;gradientColor=none;',
					 s * 40, s * 42, '', 'Optimized Instance', null, null, this.getTagsForStencil(gn, 'optimized instance', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'rescue;fillColor=#F58534;gradientColor=none;',
					 s * 42, s * 44, '', 'Rescue', null, null, this.getTagsForStencil(gn, 'rescue', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'spot_instance;fillColor=#F58534;gradientColor=none;',
					 s * 40, s * 42, '', 'Spot Instance', null, null, this.getTagsForStencil(gn, 'spot instance', dt).join(' ')),
					 
			 this.addEntry(dt + 'Spot Fleet', function()
             {
				var bg1 = new mxCell('', new mxGeometry(0, 30, 200, 200), 'rounded=1;fillColor=none;gradientColor=none;arcSize=10;dashed=1;');
				bg1.vertex = true;
				var bg2 = new mxCell('', new mxGeometry(20, 0, 43, 40), n + 'spot_instance;fillColor=#F58534;strokeColor=none;gradientColor=none;');
				bg2.vertex = true;
			    
			   	return sb.createVertexTemplateFromCells([bg1, bg2], 200, 230, 'Spot Fleet');
			 }),
			 
			 this.createVertexTemplateEntry(n + 'ecr;fillColor=#F58534;gradientColor=none;',
					 s * 46, s * 48, '', 'ECR', null, null, this.getTagsForStencil(gn, 'ecr', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'vpn_gateway;fillColor=#F58534;gradientColor=none;',
					 s * 46, s * 48, '', 'VPN Gateway', null, null, this.getTagsForStencil(gn, 'vpn gateway virtual private network', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'deployment;fillColor=#F58534;gradientColor=none;',
					 s * 37, s * 49, '', 'Deployment', null, null, this.getTagsForStencil(gn, 'deployment', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'vpn_connection;fillColor=#F58534;gradientColor=none;',
					 s * 39, s * 32, '', 'VPN Connection', null, null, this.getTagsForStencil(gn, 'vpn connection virtual private network', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'vpc_peering;fillColor=#F58534;gradientColor=none;',
					 s * 46, s * 48, '', 'VPC Peering', null, null, this.getTagsForStencil(gn, 'vpc peering virtual private cloud', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'application;fillColor=#F58534;gradientColor=none;',
					 s * 23, s * 43, '', 'Application', null, null, this.getTagsForStencil(gn, 'application', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'ec2_compute_container;fillColor=#F58534;gradientColor=none;',
					 s * 40, s * 23, '', 'EC2 Compute Container', null, null, this.getTagsForStencil(gn, 'ec2 compute container', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'ec2_compute_container_2;fillColor=#F58534;gradientColor=none;',
					 s * 40, s * 23, '', 'EC2 Compute Container', null, null, this.getTagsForStencil(gn, 'ec2 compute container', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'ec2_compute_container_3;fillColor=#F58534;gradientColor=none;',
					 s * 40, s * 23, '', 'EC2 Compute Container', null, null, this.getTagsForStencil(gn, 'ec2 compute container', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'vpc_nat_gateway;fillColor=#F58534;gradientColor=none;',
					 s * 46, s * 48, '', 'VPC NAT Gateway', null, null, this.getTagsForStencil(gn, 'vpc nat gateway virtual private cloud', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'ecr_registry;fillColor=#F58534;gradientColor=none;',
					 s * 38, s * 40, '', 'ECR Registry', null, null, this.getTagsForStencil(gn, 'ecr registry', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'batch;fillColor=#F58534;gradientColor=none;',
					 s * 51, s * 62, '', 'Batch', null, null, this.getTagsForStencil(gn, 'batch', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'router;fillColor=#F58534;gradientColor=none;',
					 s * 46, s * 48, '', 'Router', null, null, this.getTagsForStencil(gn, 'router', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'vpc;fillColor=#F58534;gradientColor=none;',
					 s * 45, s * 54, '', 'VPC', null, null, this.getTagsForStencil(gn, 'vpc virtual private cloud', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'network_access_controllist;fillColor=#F58534;gradientColor=none;',
					 s * 46, s * 48, '', 'Network Access Controllist', null, null, this.getTagsForStencil(gn, 'network access controllist', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'lambda_function;fillColor=#F58534;gradientColor=none;',
					 s * 46, s * 48, '', 'Lambda Function', null, null, this.getTagsForStencil(gn, 'lambda function', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'classic_load_balancer;fillColor=#F58534;gradientColor=none;',
					 s * 46, s * 48, '', 'Classic Load Balancer', null, null, this.getTagsForStencil(gn, 'classic load balancer', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'application_load_balancer;fillColor=#F58534;gradientColor=none;',
					 s * 46, s * 48, '', 'Application Load Balancer', null, null, this.getTagsForStencil(gn, 'application load balancer', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'x1_instance;fillColor=#F58534;gradientColor=none;',
					 s * 40, s * 42, '', 'X1 Instance', null, null, this.getTagsForStencil(gn, 'x1 instance', dt).join(' '))
		]);
	};
	
	Sidebar.prototype.addAWS3ContactCenterPalette = function()
	{
		var sb = this;
		var n = 'outlineConnect=0;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.aws3.";
		var gn = 'mxgraph.aws3';
		var dt = 'aws amazon web service contact center';
		var s = 1.5; //scale
		
		this.addPaletteFunctions('aws3Contact Center', 'AWS17 / Contact Center', false,
		[
			 this.createVertexTemplateEntry(n + 'connect;fillColor=#759C3E;gradientColor=none;',
					 s * 60, s * 46, '', 'Connect', null, null, this.getTagsForStencil(gn, 'connect', dt).join(' '))
		]);
	};
	
	Sidebar.prototype.addAWS3DatabasePalette = function()
	{
		var sb = this;
		var n = 'outlineConnect=0;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.aws3.";
		var gn = 'mxgraph.aws3';
		var dt = 'aws amazon web service db database';
		var s = 1.5; //scale
		
		this.addPaletteFunctions('aws3Database', 'AWS17 / Database', false,
		[
			 this.createVertexTemplateEntry(n + 'dynamo_db;fillColor=#2E73B8;gradientColor=none;',
					 s * 48, s * 54, '', 'Dynamo DB', null, null, this.getTagsForStencil(gn, 'dynamo', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'elasticache;fillColor=#2E73B8;gradientColor=none;',
					 s * 45, s * 54, '', 'ElastiCache', null, null, this.getTagsForStencil(gn, 'elasticache elastic cache', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'rds;fillColor=#2E73B8;gradientColor=none;',
					 s * 48, s * 54, '', 'RDS', null, null, this.getTagsForStencil(gn, 'rds', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'redshift;fillColor=#2E73B8;gradientColor=none;',
					 s * 45, s * 50, '', 'Redshift', null, null, this.getTagsForStencil(gn, 'redshift', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'redis;fillColor=#2E73B8;gradientColor=none;',
					 s * 40, s * 42, '', 'Redis', null, null, this.getTagsForStencil(gn, 'redis', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'rds_db_instance;fillColor=#2E73B8;gradientColor=none;',
					 s * 33, s * 44, '', 'RDS DB Instance', null, null, this.getTagsForStencil(gn, 'rds instance', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'rds_db_instance_read_replica;fillColor=#2E73B8;gradientColor=none;',
					 s * 33, s * 44, '', 'RDS DB Instance Read Replica', null, null, this.getTagsForStencil(gn, 'rds instance read replica', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'oracle_db_instance;fillColor=#2E73B8;gradientColor=none;',
					 s * 40, s * 43, '', 'Oracle DB Instance', null, null, this.getTagsForStencil(gn, 'oracle instance', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'piop;fillColor=#2E73B8;gradientColor=none;',
					 s * 40, s * 42, '', 'PIOP', null, null, this.getTagsForStencil(gn, 'piop', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'attribute;fillColor=#2E73B8;gradientColor=none;',
					 s * 42, s * 44, '', 'Attribute', null, null, this.getTagsForStencil(gn, 'attribute', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'attributes;fillColor=#2E73B8;gradientColor=none;',
					 s * 42, s * 44, '', 'Attributes', null, null, this.getTagsForStencil(gn, 'attributes', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'item;fillColor=#2E73B8;gradientColor=none;',
					 s * 42, s * 44, '', 'Item', null, null, this.getTagsForStencil(gn, 'item', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'global_secondary_index;fillColor=#2E73B8;gradientColor=none;',
					 s * 45, s * 44, '', 'Global Secondary Index', null, null, this.getTagsForStencil(gn, 'global secondary index', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'items;fillColor=#2E73B8;gradientColor=none;',
					 s * 42, s * 44, '', 'Items', null, null, this.getTagsForStencil(gn, 'items', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'db_accelerator;fillColor=#2E73B8;gradientColor=none;',
					 s * 48, s * 54, '', 'DB Accelerator', null, null, this.getTagsForStencil(gn, 'db database accelerator', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'table;fillColor=#2E73B8;gradientColor=none;',
					 s * 45, s * 44, '', 'Table', null, null, this.getTagsForStencil(gn, 'table', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'memcached;fillColor=#2E73B8;gradientColor=none;',
					 s * 40, s * 42, '', 'Memcached', null, null, this.getTagsForStencil(gn, 'memcached', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'mysql_db_instance;fillColor=#2E73B8;gradientColor=none;',
					 s * 40, s * 43, '', 'MySQL DB Instance', null, null, this.getTagsForStencil(gn, 'mysql instance my sql', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'rds_db_instance_standby_multi_az;fillColor=#2E73B8;gradientColor=none;',
					 s * 33, s * 44, '', 'RDS DB Instance standby (multi-AZ)', null, null, this.getTagsForStencil(gn, 'rds instance standby multi', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'cache_node;fillColor=#2E73B8;gradientColor=none;',
					 s * 40, s * 42, '', 'Cache Node', null, null, this.getTagsForStencil(gn, 'cache node', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'sql_master;fillColor=#2E73B8;gradientColor=none;',
					 s * 40, s * 43, '', 'SQL Master', null, null, this.getTagsForStencil(gn, 'sql master', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'sql_slave;fillColor=#2E73B8;gradientColor=none;',
					 s * 40, s * 43, '', 'SQL Slave', null, null, this.getTagsForStencil(gn, 'sql slave', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'ms_sql_instance_2;fillColor=#2E73B8;gradientColor=none;',
					 s * 40, s * 42, '', 'MS SQL Instance', null, null, this.getTagsForStencil(gn, 'ms sql instance', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'mysql_db_instance_2;fillColor=#2E73B8;gradientColor=none;',
					 s * 40, s * 42, '', 'MySQL DB Instance', null, null, this.getTagsForStencil(gn, 'mysql instance my sql', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'ms_sql_instance;fillColor=#2E73B8;gradientColor=none;',
					 s * 40, s * 43, '', 'MS SQL Instance', null, null, this.getTagsForStencil(gn, 'ms sql instance', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'oracle_db_instance_2;fillColor=#2E73B8;gradientColor=none;',
					 s * 40, s * 42, '', 'Oracle DB Instance', null, null, this.getTagsForStencil(gn, 'oracle instance', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'postgre_sql_instance;fillColor=#2E73B8;gradientColor=none;',
					 s * 40, s * 42, '', 'Postgre SQL Instance', null, null, this.getTagsForStencil(gn, 'postgre sql instance', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'dense_compute_node;fillColor=#2E73B8;gradientColor=none;',
					 s * 37, s * 42, '', 'Dense Compute Node', null, null, this.getTagsForStencil(gn, 'dense compute node', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'dense_storage_node;fillColor=#2E73B8;gradientColor=none;',
					 s * 37, s * 42, '', 'Dense Storage Node', null, null, this.getTagsForStencil(gn, 'dense storage node', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'database_migration_workflow_job;fillColor=#2E73B8;gradientColor=none;pointerEvents=1',
					 s * 31, s * 58, '', 'Database Migration Workflow/Job', null, null, this.getTagsForStencil(gn, 'database migration workflow job', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'database_migration_service;fillColor=#2E73B8;gradientColor=none;',
					 s * 48, s * 54, '', 'Database Migration Service', null, null, this.getTagsForStencil(gn, 'database migration service', dt).join(' '))
		]);
	};
	
	Sidebar.prototype.addAWS3DesktopAndAppStreamingPalette = function()
	{
		var sb = this;
		var n = 'outlineConnect=0;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.aws3.";
		var gn = 'mxgraph.aws3';
		var dt = 'aws amazon web service desktop app streaming application';
		var s = 1.5; //scale
		
		this.addPaletteFunctions('aws3Desktop and App Streaming', 'AWS17 / Desktop and App Streaming', false,
		[
			 this.createVertexTemplateEntry(n + 'appstream;fillColor=#D9A741;gradientColor=none;',
					 s * 51, s * 62, '', 'AppStream', null, null, this.getTagsForStencil(gn, 'appstream', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'workspaces;fillColor=#D16A28;gradientColor=#F58435;gradientDirection=north;',
					 s * 55, s * 63, '', 'WorkSpaces', null, null, this.getTagsForStencil(gn, 'workspaces work spaces', dt).join(' '))
		]);
	};
	
	Sidebar.prototype.addAWS3DeveloperToolsPalette = function()
	{
		var sb = this;
		var n = 'outlineConnect=0;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.aws3.";
		var gn = 'mxgraph.aws3';
		var dt = 'aws amazon web service dev developer tools';
		var s = 1.5; //scale

		this.addPaletteFunctions('aws3Developer Tools', 'AWS17 / Developer Tools', false,
		[
			 this.createVertexTemplateEntry(n + 'codecommit;fillColor=#759C3E;gradientColor=none;',
					 s * 51, s * 62, '', 'CodeCommit', null, null, this.getTagsForStencil(gn, 'codecommit code commit', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'codedeploy;fillColor=#759C3E;gradientColor=none;',
					 s * 45, s * 54, '', 'CodeDeploy', null, null, this.getTagsForStencil(gn, 'codedeploy code deploy', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'codepipeline;fillColor=#759C3E;gradientColor=none;',
					 s * 45, s * 54, '', 'CodePipeline', null, null, this.getTagsForStencil(gn, 'codepipeline code pipeline', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'codestar;fillColor=#759C3E;gradientColor=none;',
					 s * 45, s * 54, '', 'CodeStar', null, null, this.getTagsForStencil(gn, 'codestar code star', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'codebuild;fillColor=#759C3E;gradientColor=none;',
					 s * 51, s * 62, '', 'CodeBuild', null, null, this.getTagsForStencil(gn, 'codebuild code build', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'x_ray;fillColor=#759C3E;gradientColor=none;',
					 s * 51, s * 57, '', 'X-Ray', null, null, this.getTagsForStencil(gn, 'x ray', dt).join(' '))
		]);
	};
	
	Sidebar.prototype.addAWS3GameDevelopmentPalette = function()
	{
		var sb = this;
		var n = 'outlineConnect=0;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.aws3.";
		var gn = 'mxgraph.aws3';
		var dt = 'aws amazon web service game development';
		var s = 1.5; //scale
		
		this.addPaletteFunctions('aws3Game Development', 'AWS17 / Game Development', false,
		[
			 this.createVertexTemplateEntry(n + 'gamelift;fillColor=#AD688B;gradientColor=none;',
					 s * 47, s * 57, '', 'GameLift', null, null, this.getTagsForStencil(gn, 'gamelift game lift', dt).join(' '))
		]);
	};
	
	Sidebar.prototype.addAWS3GeneralPalette = function()
	{
		var sb = this;
		var n = 'outlineConnect=0;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.aws3.";
		var gn = 'mxgraph.aws3';
		var dt = 'aws amazon web service general';
		var s = 1.5; //scale
		
		this.addPaletteFunctions('aws3General', 'AWS17 / General', false,
		[
			 this.createVertexTemplateEntry(n + 'management_console;fillColor=#F58534;gradientColor=none;',
					 s * 42, s * 42, '', 'Management Console', null, null, this.getTagsForStencil(gn, 'management console', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'cloud_2;fillColor=#F58534;gradientColor=none;',
					 s * 50, s * 50, '', 'Cloud', null, null, this.getTagsForStencil(gn, 'cloud', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'forums;fillColor=#F58534;gradientColor=none;',
					 s * 57, s * 55, '', 'Forums', null, null, this.getTagsForStencil(gn, 'forums', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'virtual_private_cloud;fillColor=#F58534;gradientColor=none;',
					 s * 53, s * 36, '', 'Virtual Private Cloud', null, null, this.getTagsForStencil(gn, 'virtual private cloud vpc', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'management_console;fillColor=#D2D3D3;gradientColor=none;',
					 s * 42, s * 42, '', 'Client', null, null, this.getTagsForStencil(gn, 'client', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'mobile_client;fillColor=#D2D3D3;gradientColor=none;',
					 s * 27, s * 42, '', 'Mobile Client', null, null, this.getTagsForStencil(gn, 'mobile client', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'multimedia;fillColor=#D2D3D3;gradientColor=none;',
					 s * 44, s * 42, '', 'Multimedia', null, null, this.getTagsForStencil(gn, 'multimedia', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'user;fillColor=#D2D3D3;gradientColor=none;',
					 s * 30, s * 42, '', 'User', null, null, this.getTagsForStencil(gn, 'user', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'users;fillColor=#D2D3D3;gradientColor=none;',
					 s * 44, s * 42, '', 'Users', null, null, this.getTagsForStencil(gn, 'users', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'tape_storage;fillColor=#7D7C7C;gradientColor=none;',
					 s * 50, s * 26, '', 'Tape Storage', null, null, this.getTagsForStencil(gn, 'tape storage', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'corporate_data_center;fillColor=#7D7C7C;gradientColor=none;',
					 s * 31, s * 42, '', 'Corporate Data Center', null, null, this.getTagsForStencil(gn, 'corporate data center', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'traditional_server;fillColor=#7D7C7C;gradientColor=none;',
					 s * 31, s * 42, '', 'Traditional Server', null, null, this.getTagsForStencil(gn, 'traditional server', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'disk;fillColor=#7D7C7C;gradientColor=none;',
					 s * 41, s * 43, '', 'Disk', null, null, this.getTagsForStencil(gn, 'disk', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'generic_database;fillColor=#7D7C7C;gradientColor=none;',
					 s * 33, s * 43, '', 'Generic Database', null, null, this.getTagsForStencil(gn, 'generic database', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'internet;fillColor=#D2D3D3;gradientColor=none;',
					 s * 53, s * 53, '', 'Internet', null, null, this.getTagsForStencil(gn, 'internet', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'internet_2;fillColor=#D2D3D3;gradientColor=none;',
					 s * 53, s * 36, '', 'Internet', null, null, this.getTagsForStencil(gn, 'internet', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'internet_3;fillColor=#D2D3D3;gradientColor=none;',
					 s * 53, s * 36, '', 'Internet', null, null, this.getTagsForStencil(gn, 'internet', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'office_building;fillColor=#7D7C7C;gradientColor=none;',
					 s * 22, s * 53, '', 'Office Building', null, null, this.getTagsForStencil(gn, 'office building', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'saml_token;fillColor=#D2D3D3;gradientColor=none;',
					 s * 46, s * 48, '', 'SAML Token', null, null, this.getTagsForStencil(gn, 'saml token', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'ssl_padlock;fillColor=#D2D3D3;gradientColor=none;',
					 s * 42, s * 52, '', 'SSL Padlock', null, null, this.getTagsForStencil(gn, 'ssl padlock', dt).join(' '))
		]);
	};
	
	Sidebar.prototype.addAWS3GroupsPalette = function()
	{
		var sb = this;
		var n = 'dashed=0;html=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.aws3.";
		var gn = 'mxgraph.aws3';
		var dt = 'aws group amazon web service group groups';
		var s = 1.5; //scale
		
		this.addPaletteFunctions('aws3Groups', 'AWS17 / Groups', false,
		[
			 this.createVertexTemplateEntry('rounded=1;arcSize=10;dashed=1;fillColor=none;gradientColor=none;dashPattern=8 3 1 3;strokeWidth=2;',
					 s * 133, s * 133, '', 'Auto Scaling Group', null, null, this.getTagsForStencil(gn, 'auto scaling group', dt).join(' ')),
			 this.createVertexTemplateEntry('rounded=1;arcSize=10;dashed=1;strokeColor=#F59D56;fillColor=none;gradientColor=none;dashPattern=8 4;strokeWidth=2;',
					 s * 133, s * 133, '', 'Availability Zone', null, null, this.getTagsForStencil(gn, 'availability zone', dt).join(' ')),
			 this.createVertexTemplateEntry('rounded=1;arcSize=10;dashed=1;fillColor=none;gradientColor=none;dashPattern=1 1;strokeWidth=2;',
					 s * 133, s * 133, '', 'Region', null, null, this.getTagsForStencil(gn, 'region', dt).join(' ')),
			 this.createVertexTemplateEntry('rounded=1;arcSize=10;dashed=1;strokeColor=#ff0000;fillColor=none;gradientColor=none;dashPattern=8 4;strokeWidth=2;',
					 s * 133, s * 133, '', 'Security Group', null, null, this.getTagsForStencil(gn, 'security group', dt).join(' ')),
					 
				 this.addEntry(dt + 'elastic beanstalk container', function()
			 {
				var bg1 = new mxCell('', new mxGeometry(0, 20, 200, 200), 'rounded=1;arcSize=10;dashed=0;fillColor=none;gradientColor=none;strokeWidth=2;');
				bg1.vertex = true;
				var bg2 = new mxCell('', new mxGeometry(20, 0, 30, 41), n + 'elastic_beanstalk;fillColor=#F58536;gradientColor=none;dashed=0;');
				bg2.vertex = true;
			    
			   	return sb.createVertexTemplateFromCells([bg1, bg2], 200, 220, 'Elastic Beanstalk Container');
			 }),
			 
				 this.addEntry(dt + 'ec2 instance container', function()
			 {
				var bg1 = new mxCell('', new mxGeometry(0, 20, 200, 200), 'rounded=1;arcSize=10;dashed=0;fillColor=none;gradientColor=none;strokeWidth=2;');
				bg1.vertex = true;
				var bg2 = new mxCell('', new mxGeometry(20, 0, 40, 41), n + 'instance;fillColor=#F58536;gradientColor=none;dashed=0;');
				bg2.vertex = true;
			    
			   	return sb.createVertexTemplateFromCells([bg1, bg2], 200, 220, 'EC2 Instance Container');
			 }),
	
				 this.addEntry(dt + 'vpc subnet', function()
			 {
				var bg1 = new mxCell('', new mxGeometry(0, 20, 200, 200), 'rounded=1;arcSize=10;dashed=0;fillColor=none;gradientColor=none;strokeWidth=2;');
				bg1.vertex = true;
				var bg2 = new mxCell('', new mxGeometry(20, 0, 30, 35), n + 'permissions;fillColor=#D9A741;gradientColor=none;dashed=0;');
				bg2.vertex = true;
			    
			   	return sb.createVertexTemplateFromCells([bg1, bg2], 200, 220, 'VPC Subnet');
			 }),
			 
			 this.createVertexTemplateEntry('rounded=1;arcSize=10;strokeColor=none;fillColor=#DBDBDB;gradientColor=none;',
					 s * 133, s * 133, '', 'Server Contents', null, null, this.getTagsForStencil(gn, 'server contents', dt).join(' ')),
			 
			 this.addEntry(dt + 'virtual private cloud', function()
			 {
				var bg1 = new mxCell('', new mxGeometry(0, 20, 200, 200), 'rounded=1;arcSize=10;dashed=0;fillColor=none;gradientColor=none;strokeWidth=2;');
				bg1.vertex = true;
				var bg2 = new mxCell('', new mxGeometry(20, 0, 52, 36), n + 'virtual_private_cloud;fillColor=#F58536;gradientColor=none;dashed=0;');
				bg2.vertex = true;
			    
			   	return sb.createVertexTemplateFromCells([bg1, bg2], 200, 220, 'Virtual Private Cloud');
			 }),
	
			 this.addEntry(dt + 'cloud', function()
			 {
				var bg1 = new mxCell('', new mxGeometry(0, 20, 200, 200), 'rounded=1;arcSize=10;dashed=0;fillColor=none;gradientColor=none;strokeWidth=2;');
				bg1.vertex = true;
				var bg2 = new mxCell('', new mxGeometry(20, 0, 52, 36), n + 'cloud;fillColor=#F58536;gradientColor=none;dashed=0;');
				bg2.vertex = true;
			    
			   	return sb.createVertexTemplateFromCells([bg1, bg2], 200, 220, 'AWS Cloud');
			 }),
			 
			 this.addEntry(dt + 'corporate data center', function()
			 {
				var bg1 = new mxCell('', new mxGeometry(0, 20, 200, 200), 'rounded=1;arcSize=10;dashed=0;fillColor=none;gradientColor=none;strokeWidth=2;');
				bg1.vertex = true;
				var bg2 = new mxCell('', new mxGeometry(20, 0, 30, 42), n + 'corporate_data_center;fillColor=#7D7C7C;gradientColor=none;dashed=0;');
				bg2.vertex = true;
			    
			   	return sb.createVertexTemplateFromCells([bg1, bg2], 200, 220, 'Corporate Data Center');
			 })
		]);
	};

	Sidebar.prototype.addAWS3InternetOfThingsPalette = function()
	{
		var sb = this;
		var n = 'outlineConnect=0;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.aws3.";
		var gn = 'mxgraph.aws3';
		var dt = 'aws amazon web service iot internet of things';
		var s = 1.5; //scale
		
		this.addPaletteFunctions('aws3Internet of Things', 'AWS17 / Internet of Things', false,
		[
			 this.createVertexTemplateEntry(n + 'aws_iot;fillColor=#5294CF;gradientColor=none;',
					 s * 45, s * 54, '', 'AWS IoT', null, null, this.getTagsForStencil(gn, 'iot internet of things', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'greengrass;fillColor=#5294CF;gradientColor=none;',
					 s * 51, s * 62, '', 'Greengrass', null, null, this.getTagsForStencil(gn, 'greengrass', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'action;fillColor=#5294CF;gradientColor=none;',
					 s * 42, s * 43, '', 'Action', null, null, this.getTagsForStencil(gn, 'action', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'actuator;fillColor=#5294CF;gradientColor=none;',
					 s * 51, s * 60, '', 'Actuator', null, null, this.getTagsForStencil(gn, 'actuator', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'certificate;fillColor=#5294CF;gradientColor=none;',
					 s * 42, s * 57, '', 'Certificate', null, null, this.getTagsForStencil(gn, 'certificate', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'desired_state;fillColor=#5294CF;gradientColor=none;',
					 s * 40, s * 42, '', 'Desired State', null, null, this.getTagsForStencil(gn, 'desired state', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'hardware_board;fillColor=#5294CF;gradientColor=none;',
					 s * 56, s * 67, '', 'Hardware Board', null, null, this.getTagsForStencil(gn, 'hardware board', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'http_protocol;fillColor=#5294CF;gradientColor=none;',
					 s * 42, s * 44, '', 'HTTP Protocol', null, null, this.getTagsForStencil(gn, 'http protocol', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'http_2_protocol;fillColor=#5294CF;gradientColor=none;',
					 s * 42, s * 44, '', 'HTTP/2 Protocol', null, null, this.getTagsForStencil(gn, 'http 2 protocol', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'lambda_function;fillColor=#5294CF;gradientColor=none;',
					 s * 40, s * 42, '', 'Lambda Function', null, null, this.getTagsForStencil(gn, 'lambda function', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'mqtt_protocol;fillColor=#5294CF;gradientColor=none;',
					 s * 42, s * 44, '', 'MQTT Protocol', null, null, this.getTagsForStencil(gn, 'mqtt protocol', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'policy;fillColor=#5294CF;gradientColor=none;',
					 s * 37, s * 60, '', 'Policy', null, null, this.getTagsForStencil(gn, 'policy', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'reported_state;fillColor=#5294CF;gradientColor=none;',
					 s * 40, s * 42, '', 'Reported State', null, null, this.getTagsForStencil(gn, 'reported state', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'rule;fillColor=#5294CF;gradientColor=none;',
					 s * 33, s * 66, '', 'Rule', null, null, this.getTagsForStencil(gn, 'rule', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'sensor;fillColor=#5294CF;gradientColor=none;',
					 s * 51, s * 60, '', 'Sensor', null, null, this.getTagsForStencil(gn, 'sensor', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'servo;fillColor=#5294CF;gradientColor=none;',
					 s * 56, s * 40, '', 'Servo', null, null, this.getTagsForStencil(gn, 'servo', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'shadow;fillColor=#5294CF;gradientColor=none;',
					 s * 57, s * 61, '', 'Shadow', null, null, this.getTagsForStencil(gn, 'shadow', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'simulator;fillColor=#5294CF;gradientColor=none;',
					 s * 50, s * 52, '', 'Simulator', null, null, this.getTagsForStencil(gn, 'simulator', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'topic;fillColor=#5294CF;gradientColor=none;',
					 s * 33, s * 44, '', 'Topic', null, null, this.getTagsForStencil(gn, 'topic', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'bank;fillColor=#5294CF;gradientColor=none;',
					 s * 53, s * 53, '', 'Bank', null, null, this.getTagsForStencil(gn, 'bank', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'bicycle;fillColor=#5294CF;gradientColor=none;',
					 s * 53, s * 53, '', 'Bicycle', null, null, this.getTagsForStencil(gn, 'bicycle', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'camera;fillColor=#5294CF;gradientColor=none;',
					 s * 53, s * 53, '', 'Camera', null, null, this.getTagsForStencil(gn, 'camera', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'utility;fillColor=#5294CF;gradientColor=none;',
					 s * 53, s * 53, '', 'Utility', null, null, this.getTagsForStencil(gn, 'utility', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'cart;fillColor=#5294CF;gradientColor=none;',
					 s * 53, s * 53, '', 'Cart', null, null, this.getTagsForStencil(gn, 'cart', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'car;fillColor=#5294CF;gradientColor=none;',
					 s * 53, s * 53, '', 'Car', null, null, this.getTagsForStencil(gn, 'car', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'windfarm;fillColor=#5294CF;gradientColor=none;',
					 s * 53, s * 53, '', 'Windfarm', null, null, this.getTagsForStencil(gn, 'windfarm', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'house;fillColor=#5294CF;gradientColor=none;',
					 s * 53, s * 53, '', 'House', null, null, this.getTagsForStencil(gn, 'house', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'generic;fillColor=#5294CF;gradientColor=none;',
					 s * 53, s * 53, '', 'Generic', null, null, this.getTagsForStencil(gn, 'generic', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'factory;fillColor=#5294CF;gradientColor=none;',
					 s * 53, s * 53, '', 'Factory', null, null, this.getTagsForStencil(gn, 'factory', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'coffee_pot;fillColor=#5294CF;gradientColor=none;',
					 s * 53, s * 53, '', 'Coffee Pot', null, null, this.getTagsForStencil(gn, 'coffee pot', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'door_lock;fillColor=#5294CF;gradientColor=none;',
					 s * 53, s * 53, '', 'Door Lock', null, null, this.getTagsForStencil(gn, 'door lock', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'lightbulb;fillColor=#5294CF;gradientColor=none;',
					 s * 53, s * 53, '', 'Lightbulb', null, null, this.getTagsForStencil(gn, 'lightbulb', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'medical_emergency;fillColor=#5294CF;gradientColor=none;',
					 s * 53, s * 53, '', 'Medical Emergency', null, null, this.getTagsForStencil(gn, 'medical emergency', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'police_emergency;fillColor=#5294CF;gradientColor=none;',
					 s * 53, s * 53, '', 'Police Emergency', null, null, this.getTagsForStencil(gn, 'police emergency', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'thermostat;fillColor=#5294CF;gradientColor=none;',
					 s * 53, s * 53, '', 'Thermostat', null, null, this.getTagsForStencil(gn, 'thermostat', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'travel;fillColor=#5294CF;gradientColor=none;',
					 s * 53, s * 53, '', 'Travel', null, null, this.getTagsForStencil(gn, 'travel', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'echo;fillColor=#205B99;gradientColor=none;',
					 s * 27, s * 62, '', 'Echo', null, null, this.getTagsForStencil(gn, 'echo', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'alexa_skill;fillColor=#5294CF;gradientColor=none;',
					 s * 40, s * 42, '', 'Alexa Skill', null, null, this.getTagsForStencil(gn, 'alexa skill', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'alexa_smart_home_skill;fillColor=#5294CF;gradientColor=none;',
					 s * 60, s * 47, '', 'Alexa Smart Home Skill', null, null, this.getTagsForStencil(gn, 'alexa smart home skill', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'alexa_voice_service;fillColor=#5294CF;gradientColor=none;',
					 s * 40, s * 42, '', 'Alexa Voice Service', null, null, this.getTagsForStencil(gn, 'alexa voice service', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'alexa_enabled_device;fillColor=#5294CF;gradientColor=none;',
					 s * 53, s * 53, '', 'Alexa Enabled Device', null, null, this.getTagsForStencil(gn, 'alexa enabled device', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'fire_tv;fillColor=#5294CF;gradientColor=none;',
					 s * 50, s * 37, '', 'Fire TV', null, null, this.getTagsForStencil(gn, 'fire tv', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'fire_tv_stick;fillColor=#5294CF;gradientColor=none;',
					 s * 57, s * 22, '', 'Fire TV Stick', null, null, this.getTagsForStencil(gn, 'fire tv stick', dt).join(' '))
		]);
	};
	
	Sidebar.prototype.addAWS3ManagementToolsPalette = function()
	{
		var sb = this;
		var n = 'outlineConnect=0;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.aws3.";
		var gn = 'mxgraph.aws3';
		var dt = 'aws amazon web service management tools';
		var s = 1.5; //scale
		
		this.addPaletteFunctions('aws3Management Tools', 'AWS17 / Management Tools', false,
		[
			 this.createVertexTemplateEntry(n + 'cloudwatch;fillColor=#759C3E;gradientColor=none;',
					 s * 55, s * 62, '', 'CloudWatch', null, null, this.getTagsForStencil(gn, 'cloudwatch cloud watch', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'cloudformation;fillColor=#759C3E;gradientColor=none;',
					 s * 51, s * 62, '', 'CloudFormation', null, null, this.getTagsForStencil(gn, 'cloudformation cloud formation', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'cloudtrail;fillColor=#759C3E;gradientColor=none;',
					 s * 51, s * 62, '', 'CloudTrail', null, null, this.getTagsForStencil(gn, 'cloudtrail cloud trail', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'config;fillColor=#759C3E;gradientColor=none;',
					 s * 51, s * 62, '', 'Config', null, null, this.getTagsForStencil(gn, 'config', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'managed_services;fillColor=#759C3E;gradientColor=none;',
					 s * 51, s * 62, '', 'Managed Services', null, null, this.getTagsForStencil(gn, 'managed services', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'opsworks;fillColor=#759C3E;gradientColor=none;',
					 s * 51, s * 62, '', 'OpsWorks', null, null, this.getTagsForStencil(gn, 'opsworks ops works', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'service_catalog;fillColor=#759C3E;gradientColor=none;',
					 s * 51, s * 62, '', 'Service Catalog', null, null, this.getTagsForStencil(gn, 'service catalog', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'trusted_advisor;fillColor=#759C3E;gradientColor=none;',
					 s * 45, s * 54, '', 'Trusted Advisor', null, null, this.getTagsForStencil(gn, 'trusted advisor', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'alarm;fillColor=#759C3E;gradientColor=none;',
					 s * 36, s * 44, '', 'Alarm', null, null, this.getTagsForStencil(gn, 'alarm', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'event_time_based;fillColor=#759C3E;gradientColor=none;',
					 s * 42, s * 55, '', 'Event (Time Based)', null, null, this.getTagsForStencil(gn, 'event time based', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'event_event_based;fillColor=#759C3E;gradientColor=none;',
					 s * 40, s * 55, '', 'Event (Event Based)', null, null, this.getTagsForStencil(gn, 'event based', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'config_rule;fillColor=#759C3E;gradientColor=none;',
					 s * 37, s * 48, '', 'Config Rule', null, null, this.getTagsForStencil(gn, 'config rule', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'automation;fillColor=#759C3E;gradientColor=none;',
					 s * 52, s * 54, '', 'Automation', null, null, this.getTagsForStencil(gn, 'automation', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'documents;fillColor=#759C3E;gradientColor=none;',
					 s * 60, s * 67, '', 'Documents', null, null, this.getTagsForStencil(gn, 'documents', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'inventory;fillColor=#759C3E;gradientColor=none;',
					 s * 60, s * 70, '', 'Inventory', null, null, this.getTagsForStencil(gn, 'inventory', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'maintenance_window;fillColor=#759C3E;gradientColor=none;',
					 s * 50, s * 52, '', 'Maintenance Window', null, null, this.getTagsForStencil(gn, 'maintenance window', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'parameter_store;fillColor=#759C3E;gradientColor=none;',
					 s * 50, s * 68, '', 'Parameter Store', null, null, this.getTagsForStencil(gn, 'parameter store', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'patch_manager;fillColor=#759C3E;gradientColor=none;',
					 s * 57, s * 60, '', 'Patch Manager', null, null, this.getTagsForStencil(gn, 'patch manager', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'run_command;fillColor=#759C3E;gradientColor=none;',
					 s * 76, s * 55, '', 'Run Command', null, null, this.getTagsForStencil(gn, 'run command', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'state_manager;fillColor=#759C3E;gradientColor=none;',
					 s * 53, s * 55, '', 'State Manager', null, null, this.getTagsForStencil(gn, 'state manager', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'ec2_systems_manager;fillColor=#759C3E;gradientColor=none;',
					 s * 53, s * 55, '', 'EC2 Systems Manager', null, null, this.getTagsForStencil(gn, 'ec2 systems manager', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'stack_aws_cloudformation;fillColor=#759C3E;gradientColor=none;',
					 s * 49, s * 39, '', 'Stack AWS CloudFormation', null, null, this.getTagsForStencil(gn, 'stack cloudformation cloud formation', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'change_set;fillColor=#759C3E;gradientColor=none;',
					 s * 37, s * 43, '', 'Change Set', null, null, this.getTagsForStencil(gn, 'change set', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'template;fillColor=#759C3E;gradientColor=none;',
					 s * 37, s * 43, '', 'Template', null, null, this.getTagsForStencil(gn, 'template', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'apps;fillColor=#759C3E;gradientColor=none;',
					 s * 54, s * 53, '', 'Apps', null, null, this.getTagsForStencil(gn, 'apps', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'deployments;fillColor=#759C3E;gradientColor=none;',
					 s * 54, s * 51, '', 'Deployments', null, null, this.getTagsForStencil(gn, 'deployments', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'instances_2;fillColor=#759C3E;gradientColor=none;',
					 s * 54, s * 54, '', 'Instances', null, null, this.getTagsForStencil(gn, 'instances', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'layers;fillColor=#759C3E;gradientColor=none;',
					 s * 54, s * 53, '', 'Layers', null, null, this.getTagsForStencil(gn, 'layers', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'monitoring;fillColor=#759C3E;gradientColor=none;',
					 s * 54, s * 45, '', 'Monitoring', null, null, this.getTagsForStencil(gn, 'monitoring', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'permissions;fillColor=#759C3E;gradientColor=none;',
					 s * 45, s * 53, '', 'Permissions', null, null, this.getTagsForStencil(gn, 'permissions', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'resources;fillColor=#759C3E;gradientColor=none;',
					 s * 45, s * 53, '', 'Resources', null, null, this.getTagsForStencil(gn, 'resources', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'stack_aws_opsworks;fillColor=#759C3E;gradientColor=none;',
					 s * 53, s * 53, '', 'Stack AWS OpsWorks', null, null, this.getTagsForStencil(gn, 'stack opsworks ops works', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'checklist;fillColor=#759C3E;gradientColor=none;',
					 s * 37, s * 43, '', 'Checklist', null, null, this.getTagsForStencil(gn, 'checklist', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'checklist_cost;fillColor=#759C3E;gradientColor=none;',
					 s * 45, s * 50, '', 'Checklist Cost', null, null, this.getTagsForStencil(gn, 'checklist cost', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'checklist_fault_tolerance;fillColor=#759C3E;gradientColor=none;',
					 s * 38, s * 48, '', 'Checklist Fault Tolerance', null, null, this.getTagsForStencil(gn, 'checklist fault tolerance', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'checklist_performance;fillColor=#759C3E;gradientColor=none;',
					 s * 41, s * 49, '', 'Checklist Performance', null, null, this.getTagsForStencil(gn, 'checklist performance', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'checklist_security;fillColor=#759C3E;gradientColor=none;',
					 s * 36, s * 46, '', 'Checklist Security', null, null, this.getTagsForStencil(gn, 'checklist security', dt).join(' '))
		]);
	};
	
	Sidebar.prototype.addAWS3MessagingPalette = function()
	{
		var sb = this;
		var n = 'outlineConnect=0;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.aws3.";
		var gn = 'mxgraph.aws3';
		var dt = 'aws amazon web service messaging';
		var s = 1.5; //scale
		
		this.addPaletteFunctions('aws3Messaging', 'AWS17 / Messaging', false,
		[
			 this.createVertexTemplateEntry(n + 'pinpoint;fillColor=#AD688B;gradientColor=none;',
					 s * 51, s * 58, '', 'Pinpoint', null, null, this.getTagsForStencil(gn, 'pinpoint', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'ses;fillColor=#D9A741;gradientColor=none;',
					 s * 53, s * 62, '', 'SES', null, null, this.getTagsForStencil(gn, 'ses', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'sns;fillColor=#D9A741;gradientColor=none;',
					 s * 51, s * 51, '', 'SNS', null, null, this.getTagsForStencil(gn, 'sns', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'sqs;fillColor=#D9A741;gradientColor=none;',
					 s * 51, s * 62, '', 'SQS', null, null, this.getTagsForStencil(gn, 'sqs', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'email;fillColor=#D9A741;gradientColor=none;',
					 s * 54, s * 41, '', 'Email', null, null, this.getTagsForStencil(gn, 'email', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'message;fillColor=#D9A741;gradientColor=none;',
					 s * 28, s * 33, '', 'Message', null, null, this.getTagsForStencil(gn, 'message', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'queue;fillColor=#D9A741;gradientColor=none;',
					 s * 49, s * 32, '', 'Queue', null, null, this.getTagsForStencil(gn, 'queue', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'email_notification;fillColor=#D9A741;gradientColor=none;',
					 s * 67, s * 42, '', 'Email Notification', null, null, this.getTagsForStencil(gn, 'email notification', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'http_notification;fillColor=#D9A741;gradientColor=none;',
					 s * 67, s * 42, '', 'HTTP Notification', null, null, this.getTagsForStencil(gn, 'http notification', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'topic_2;fillColor=#D9A741;gradientColor=none;',
					 s * 62, s * 39, '', 'Topic', null, null, this.getTagsForStencil(gn, 'topic', dt).join(' '))
		]);
	};
	
	Sidebar.prototype.addAWS3MigrationPalette = function()
	{
		var sb = this;
		var n = 'outlineConnect=0;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.aws3.";
		var gn = 'mxgraph.aws3';
		var dt = 'aws amazon web service migration';
		var s = 1.5; //scale
		
		this.addPaletteFunctions('aws3Migration', 'AWS17 / Migration', false,
		[
			 this.createVertexTemplateEntry(n + 'snowball;fillColor=#E05243;gradientColor=none;',
					 s * 45, s * 54, '', 'Snowball', null, null, this.getTagsForStencil(gn, 'snowball', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'server_migration_service;fillColor=#5294CF;gradientColor=none;',
					 s * 51, s * 62, '', 'Server Migration Service', null, null, this.getTagsForStencil(gn, 'server migration service', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'import_export;fillColor=#E05243;gradientColor=none;',
					 s * 43, s * 42, '', 'Import/Export', null, null, this.getTagsForStencil(gn, 'Import Export', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'database_migration_service;fillColor=#5294CF;gradientColor=none;',
					 s * 48, s * 54, '', 'Database Migration Service', null, null, this.getTagsForStencil(gn, 'database migration service', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'database_migration_workflow_job;fillColor=#5294CF;gradientColor=none;pointerEvents=1',
					 s * 31, s * 58, '', 'Database Migration Workflow Job', null, null, this.getTagsForStencil(gn, 'database migration workflow job', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'application_discovery_service;fillColor=#5294CF;gradientColor=none;',
					 s * 51, s * 62, '', 'Application Discovery Service', null, null, this.getTagsForStencil(gn, 'application discovery service', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'migration_hub_2;fillColor=#ABABAB;gradientColor=none;pointerEvents=1',
					 s * 76, s * 81, '', 'Migration Hub', null, null, this.getTagsForStencil(gn, 'migration hub', dt).join(' '))
		]);
	};
	
	Sidebar.prototype.addAWS3MobileServicesPalette = function()
	{
		var sb = this;
		var n = 'outlineConnect=0;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.aws3.";
		var gn = 'mxgraph.aws3';
		var dt = 'aws amazon web service mobile services';
		var s = 1.5; //scale
		
		this.addPaletteFunctions('aws3Mobile Services', 'AWS17 / Mobile Services', false,
		[
			 this.createVertexTemplateEntry(n + 'api_gateway;fillColor=#D9A741;gradientColor=none;',
					 s * 51, s * 62, '', 'API Gateway', null, null, this.getTagsForStencil(gn, 'api gateway', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'cognito;fillColor=#AD688B;gradientColor=none;',
					 s * 51, s * 62, '', 'Cognito', null, null, this.getTagsForStencil(gn, 'cognito', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'mobile_analytics;fillColor=#AD688B;gradientColor=none;',
					 s * 60, s * 62, '', 'Mobile Analytics', null, null, this.getTagsForStencil(gn, 'mobile analytics', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'pinpoint;fillColor=#AD688B;gradientColor=none;',
					 s * 51, s * 58, '', 'Pinpoint', null, null, this.getTagsForStencil(gn, 'pinpoint', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'device_farm;fillColor=#AD688B;gradientColor=none;',
					 s * 51, s * 62, '', 'Device Farm', null, null, this.getTagsForStencil(gn, 'device farm', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'mobile_hub;fillColor=#AD688A;gradientColor=#F58435;gradientDirection=west;pointerEvents=1',
					 s * 50, s * 54, '', 'Mobile Hub', null, null, this.getTagsForStencil(gn, 'mobile hub', dt).join(' '))
		]);
	};
	
	Sidebar.prototype.addAWS3NetworkAndContentDeliveryPalette = function()
	{
		var sb = this;
		var n = 'outlineConnect=0;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.aws3.";
		var gn = 'mxgraph.aws3';
		var dt = 'aws amazon web service network and content delivery';
		var s = 1.5; //scale

		this.addPaletteFunctions('aws3Networking and Content Delivery', 'AWS17 / Network and Content Delivery', false,
		[
			 this.createVertexTemplateEntry(n + 'cloudfront;fillColor=#F58536;gradientColor=none;',
					 s * 51, s * 62, '', 'CloudFront', null, null, this.getTagsForStencil(gn, 'cloudfront cloud front', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'route_53;fillColor=#F58536;gradientColor=none;',
					 s * 47, s * 57, '', 'Route 53', null, null, this.getTagsForStencil(gn, 'route 53', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'vpc;fillColor=#F58536;gradientColor=none;',
					 s * 45, s * 54, '', 'VPC', null, null, this.getTagsForStencil(gn, 'vpc virtual private cloud', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'network_access_controllist;fillColor=#F58534;gradientColor=none;',
					 s * 46, s * 48, '', 'Network Access Controllist', null, null, this.getTagsForStencil(gn, 'network access controllist', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'elastic_load_balancing;fillColor=#F58536;gradientColor=none;',
					 s * 51, s * 62, '', 'Elastic Load Balancing', null, null, this.getTagsForStencil(gn, 'elastic load balancing', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'direct_connect;fillColor=#F58536;gradientColor=none;',
					 s * 45, s * 54, '', 'Direct Connect', null, null, this.getTagsForStencil(gn, 'direct connect', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'hosted_zone;fillColor=#F58536;gradientColor=none;',
					 s * 42, s * 43, '', 'Hosted Zone', null, null, this.getTagsForStencil(gn, 'hosted zone', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'route_table;fillColor=#F58536;gradientColor=none;',
					 s * 50, s * 46, '', 'Route Table', null, null, this.getTagsForStencil(gn, 'route table', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'customer_gateway;fillColor=#F58536;gradientColor=none;',
					 s * 46, s * 48, '', 'Customer Gateway', null, null, this.getTagsForStencil(gn, 'customer gateway', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'endpoints;fillColor=#F58536;gradientColor=none;',
					 s * 46, s * 48, '', 'Endpoints', null, null, this.getTagsForStencil(gn, 'endpoints', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'flow_logs;fillColor=#F58536;gradientColor=none;',
					 s * 46, s * 48, '', 'Flow Logs', null, null, this.getTagsForStencil(gn, 'flow logs', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'internet_gateway;fillColor=#F58536;gradientColor=none;',
					 s * 46, s * 48, '', 'Internet Gateway', null, null, this.getTagsForStencil(gn, 'internet gateway', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'router;fillColor=#F58536;gradientColor=none;',
					 s * 46, s * 48, '', 'Router', null, null, this.getTagsForStencil(gn, 'router', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'vpc_nat_gateway;fillColor=#F58536;gradientColor=none;',
					 s * 46, s * 48, '', 'VPC NAT Gateway', null, null, this.getTagsForStencil(gn, 'vpc nat gateway virtual private cloud', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'vpc_peering;fillColor=#F58536;gradientColor=none;',
					 s * 46, s * 48, '', 'VPC Peering', null, null, this.getTagsForStencil(gn, 'vpc peering virtual private cloud', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'vpn_connection;fillColor=#F58536;gradientColor=none;',
					 s * 39, s * 32, '', 'VPN Connection', null, null, this.getTagsForStencil(gn, 'vpn connection', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'vpn_gateway;fillColor=#F58536;gradientColor=none;',
					 s * 46, s * 48, '', 'VPN Gateway', null, null, this.getTagsForStencil(gn, 'vpn gateway', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'classic_load_balancer;fillColor=#F58536;gradientColor=none;',
					 s * 46, s * 48, '', 'Classic Load Balancer', null, null, this.getTagsForStencil(gn, 'classic load balancer', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'elastic_network_adapter;fillColor=#F58536;gradientColor=none;',
					 s * 50, s * 60, '', 'Elastic Network Adapter', null, null, this.getTagsForStencil(gn, 'elastic network adapter', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'elastic_network_interface;fillColor=#F58536;gradientColor=none;',
					 s * 46, s * 48, '', 'Elastic Network Interface', null, null, this.getTagsForStencil(gn, 'elastic network interface', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'application_load_balancer;fillColor=#F58536;gradientColor=none;',
					 s * 46, s * 48, '', 'Application Load Balancer', null, null, this.getTagsForStencil(gn, 'application load balancer', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'streaming_distribution;fillColor=#F58536;gradientColor=none;',
					 s * 46, s * 48, '', 'Streaming Distribution', null, null, this.getTagsForStencil(gn, 'streaming distribution', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'download_distribution;fillColor=#F58536;gradientColor=none;',
					 s * 46, s * 48, '', 'Download Distribution', null, null, this.getTagsForStencil(gn, 'download distribution', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'edge_location;fillColor=#F58536;gradientColor=none;',
					 s * 39, s * 43, '', 'Edge Location', null, null, this.getTagsForStencil(gn, 'edge location', dt).join(' '))
		]);
	};
	
	Sidebar.prototype.addAWS3OnDemandWorkforcePalette = function()
	{
		var sb = this;
		var n = 'outlineConnect=0;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.aws3.";
		var gn = 'mxgraph.aws3';
		var dt = 'aws amazon web service on demand workforce';
		var s = 1.5; //scale
		
		this.addPaletteFunctions('aws3On Demand Workforce', 'AWS17 / On-Demand Workforce', false,
		[
			 this.createVertexTemplateEntry(n + 'mechanical_turk;fillColor=#ACACAC;gradientColor=none;',
					 s * 45, s * 54, '', 'Mechanical Turk', null, null, this.getTagsForStencil(gn, 'mechanical turk', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'human_intelligence_tasks_hit;fillColor=#ACACAC;gradientColor=none;',
					 s * 35, s * 37, '', 'Human Intelligence Tasks HIT', null, null, this.getTagsForStencil(gn, 'human intelligence tasks hit', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'requester;fillColor=#ACACAC;gradientColor=none;',
					 s * 37, s * 43, '', 'Requester', null, null, this.getTagsForStencil(gn, 'requester', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'users;fillColor=#ACACAC;gradientColor=none;',
					 s * 44, s * 42, '', 'Workers', null, null, this.getTagsForStencil(gn, 'workers', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'assignment_task;fillColor=#ACACAC;gradientColor=none;',
					 s * 31, s * 42, '', 'Assignment/Task', null, null, this.getTagsForStencil(gn, 'assignment task', dt).join(' '))
		]);
	};
	
	Sidebar.prototype.addAWS3SDKPalette = function()
	{
		var sb = this;
		var n = 'outlineConnect=0;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.aws3.";
		var gn = 'mxgraph.aws3';
		var dt = 'aws amazon web service sdk software development kit';
		var s = 1.5; //scale
		
		this.addPaletteFunctions('aws3SDKs', 'AWS17 / SDK', false,
		[
			 this.createVertexTemplateEntry(n + 'android;fillColor=#96BF3D;gradientColor=none;',
					 s * 49, s * 56, '', 'Android', null, null, this.getTagsForStencil(gn, 'android', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'cli;fillColor=#444444;gradientColor=none;',
					 s * 48, s * 55, '', 'CLI', null, null, this.getTagsForStencil(gn, 'cli', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'toolkit_for_eclipse;fillColor=#342074;gradientColor=none;',
					 s * 47, s * 52, '', 'Toolkit for Eclipse', null, null, this.getTagsForStencil(gn, 'toolkit for eclipse', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'toolkit_for_visual_studio;fillColor=#53B1CB;gradientColor=none;',
					 s * 47, s * 52, '', 'Toolkit for Visual Studio', null, null, this.getTagsForStencil(gn, 'toolkit for visual studio', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'toolkit_for_windows_powershell;fillColor=#737373;gradientColor=none;',
					 s * 47, s * 52, '', 'Toolkit for Windows PowerShell', null, null, this.getTagsForStencil(gn, 'toolkit for windows powershell', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'android;fillColor=#CFCFCF;gradientColor=none;',
					 s * 49, s * 56, '', 'iOS', null, null, this.getTagsForStencil(gn, 'ios', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'android;fillColor=#AE1F23;gradientColor=none;',
					 s * 49, s * 56, '', 'Ruby', null, null, this.getTagsForStencil(gn, 'ruby', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'android;fillColor=#FFD44F;gradientColor=none;',
					 s * 49, s * 56, '', 'Python (boto)', null, null, this.getTagsForStencil(gn, 'python boto', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'android;fillColor=#5A69A4;gradientColor=none;',
					 s * 49, s * 56, '', 'PHP', null, null, this.getTagsForStencil(gn, 'php', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'android;fillColor=#115193;gradientColor=none;',
					 s * 49, s * 56, '', '.NET', null, null, this.getTagsForStencil(gn, 'dot net dotnet', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'android;fillColor=#205E00;gradientColor=none;',
					 s * 49, s * 56, '', 'JavaScript', null, null, this.getTagsForStencil(gn, 'js javascript', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'android;fillColor=#EE472A;gradientColor=none;',
					 s * 49, s * 56, '', 'Java', null, null, this.getTagsForStencil(gn, 'java', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'android;fillColor=#4090D7;gradientColor=none;',
					 s * 49, s * 56, '', 'Xamarin', null, null, this.getTagsForStencil(gn, 'xamarin', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'android;fillColor=#8CC64F;gradientColor=none;',
					 s * 49, s * 56, '', 'Node.js', null, null, this.getTagsForStencil(gn, 'node js nodejs', dt).join(' '))
		]);
	};
	
	Sidebar.prototype.addAWS3SecurityIdentityAndCompliancePalette = function()
	{
		var sb = this;
		var n = 'outlineConnect=0;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.aws3.";
		var gn = 'mxgraph.aws3';
		var dt = 'aws amazon web service security and identity compliance';
		var s = 1.5; //scale
		
		this.addPaletteFunctions('aws3Security Identity and Compliance', 'AWS17 / Security Identity and Compliance', false,
		[
			 this.createVertexTemplateEntry(n + 'inspector;fillColor=#759C3E;gradientColor=none;',
					 s * 45, s * 54, '', 'Inspector', null, null, this.getTagsForStencil(gn, 'inspector', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'macie;fillColor=#34BBC9;gradientColor=none;pointerEvents=1',
					 s * 89, s * 36, '', 'Macie', null, null, this.getTagsForStencil(gn, 'macie', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'artifact;fillColor=#759C3E;gradientColor=none;',
					 s * 50, s * 60, '', 'Artifact', null, null, this.getTagsForStencil(gn, 'artifact', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'certificate_manager;fillColor=#759C3E;gradientColor=none;',
					 s * 51, s * 41, '', 'Certificate Manager', null, null, this.getTagsForStencil(gn, 'certificate manager', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'cloudhsm;fillColor=#759C3E;gradientColor=none;',
					 s * 49, s * 56, '', 'CloudHSM', null, null, this.getTagsForStencil(gn, 'cloudhsm cloud hsm', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'directory_service;fillColor=#759C3E;gradientColor=none;',
					 s * 45, s * 54, '', 'Directory Service', null, null, this.getTagsForStencil(gn, 'directory service', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'iam;fillColor=#759C3E;gradientColor=none;',
					 s * 28, s * 54, '', 'IAM', null, null, this.getTagsForStencil(gn, 'iam', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'kms;fillColor=#759C3E;gradientColor=none;',
					 s * 51, s * 62, '', 'KMS', null, null, this.getTagsForStencil(gn, 'kms', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'shield;fillColor=#759C3E;gradientColor=none;',
					 s * 51, s * 47, '', 'Shield', null, null, this.getTagsForStencil(gn, 'shield', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'organizations;fillColor=#759C3E;gradientColor=none;',
					 s * 51, s * 62, '', 'Organizations', null, null, this.getTagsForStencil(gn, 'organizations', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'waf;fillColor=#759C3E;gradientColor=none;',
					 s * 51, s * 62, '', 'WAF', null, null, this.getTagsForStencil(gn, 'waf', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'agent;fillColor=#759C3E;gradientColor=none;',
					 s * 46, s * 48, '', 'Agent', null, null, this.getTagsForStencil(gn, 'agent', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'certificate_manager_2;fillColor=#759C3E;gradientColor=none;',
					 s * 49, s * 42, '', 'Certificate Manager', null, null, this.getTagsForStencil(gn, 'certificate manager', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'clouddirectory;fillColor=#759C3E;gradientColor=none;',
					 s * 68, s * 73, '', 'CloudDirectory', null, null, this.getTagsForStencil(gn, 'cloud directory', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'add_on;fillColor=#759C3E;gradientColor=none;',
					 s * 33, s * 18, '', 'Add-On', null, null, this.getTagsForStencil(gn, 'add on', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'sts;fillColor=#759C3E;gradientColor=none;',
					 s * 41, s * 23, '', 'STS', null, null, this.getTagsForStencil(gn, 'sts', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'sts_2;fillColor=#759C3E;gradientColor=none;',
					 s * 31, s * 40, '', 'STS', null, null, this.getTagsForStencil(gn, 'sts', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'data_encryption_key;fillColor=#7D7C7C;gradientColor=none;',
					 s * 31, s * 40, '', 'Data Encryption Key', null, null, this.getTagsForStencil(gn, 'data encryption key', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'encrypted_data;fillColor=#7D7C7C;gradientColor=none;',
					 s * 29, s * 37, '', 'Encrypted Data', null, null, this.getTagsForStencil(gn, 'encrypted data', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'long_term_security_credential;fillColor=#ffffff;gradientColor=none;',
					 s * 40, s * 32, '', 'Long Term Security Credential', null, null, this.getTagsForStencil(gn, 'long term security credential', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'mfa_token;fillColor=#7D7C7C;gradientColor=none;',
					 s * 41, s * 41, '', 'MFA Token', null, null, this.getTagsForStencil(gn, 'mfa token', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'permissions_2;fillColor=#D2D3D3;gradientColor=none;',
					 s * 31, s * 42, '', 'Permissions', null, null, this.getTagsForStencil(gn, 'permissions', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'role;fillColor=#759C3E;gradientColor=none;',
					 s * 63, s * 53, '', 'Role', null, null, this.getTagsForStencil(gn, 'role', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'temporary_security_credential;fillColor=#ffffff;gradientColor=none;',
					 s * 45, s * 40, '', 'Temporary Security Credential', null, null, this.getTagsForStencil(gn, 'temporary security credential', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'filtering_rule;fillColor=#759C3E;gradientColor=none;',
					 s * 46, s * 48, '', 'Filtering Rule', null, null, this.getTagsForStencil(gn, 'filtering rule', dt).join(' '))
		]);
	};
	
	Sidebar.prototype.addAWS3StoragePalette = function()
	{
		var sb = this;
		var n = 'outlineConnect=0;dashed=0;verticalLabelPosition=bottom;verticalAlign=top;align=center;html=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.aws3.";
		var gn = 'mxgraph.aws3';
		var dt = 'aws amazon web service storage';
		var s = 1.5; //scale
		
		this.addPaletteFunctions('aws3Storage', 'AWS17 / Storage', false,
		[
			 this.createVertexTemplateEntry(n + 's3;fillColor=#E05243;gradientColor=none;',
					 s * 51, s * 62, '', 'S3', null, null, this.getTagsForStencil(gn, 's3', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'glacier;fillColor=#E05243;gradientColor=none;',
					 s * 51, s * 62, '', 'Glacier', null, null, this.getTagsForStencil(gn, 'glacier', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'storage_gateway;fillColor=#E05243;gradientColor=none;',
					 s * 51, s * 62, '', 'Storage Gateway', null, null, this.getTagsForStencil(gn, 'storage gateway', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'efs;fillColor=#E05243;gradientColor=none;',
					 s * 51, s * 62, '', 'EFS', null, null, this.getTagsForStencil(gn, 'efs', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'archive;fillColor=#E05243;gradientColor=none;',
					 s * 38, s * 50, '', 'Archive', null, null, this.getTagsForStencil(gn, 'archive', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'vault;fillColor=#E05243;gradientColor=none;',
					 s * 36, s * 50, '', 'Vault', null, null, this.getTagsForStencil(gn, 'vault', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'bucket;fillColor=#E05243;gradientColor=none;',
					 s * 40, s * 41, '', 'Bucket', null, null, this.getTagsForStencil(gn, 'bucket', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'bucket_with_objects;fillColor=#E05243;gradientColor=none;',
					 s * 40, s * 41, '', 'Bucket with Objects', null, null, this.getTagsForStencil(gn, 'bucket with objects', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'object;fillColor=#E05243;gradientColor=none;',
					 s * 28, s * 30, '', 'Object', null, null, this.getTagsForStencil(gn, 'object', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'virtual_tape_library;fillColor=#E05243;gradientColor=none;',
					 s * 40, s * 49, '', 'Virtual Tape Library', null, null, this.getTagsForStencil(gn, 'virtual tape library', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'cached_volume;fillColor=#E05243;gradientColor=none;',
					 s * 40, s * 49, '', 'Cached Volume', null, null, this.getTagsForStencil(gn, 'cached volume', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'non_cached_volume;fillColor=#E05243;gradientColor=none;',
					 s * 40, s * 49, '', 'Non-Cached Volume', null, null, this.getTagsForStencil(gn, 'non cached volume', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'snapshot;fillColor=#E05243;gradientColor=none;',
					 s * 40, s * 49, '', 'Snapshot', null, null, this.getTagsForStencil(gn, 'snapshot', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'volume;fillColor=#E05243;gradientColor=none;',
					 s * 35, s * 50, '', 'Volume', null, null, this.getTagsForStencil(gn, 'volume', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'snowball;fillColor=#E05243;gradientColor=none;',
					 s * 45, s * 54, '', 'Snowball', null, null, this.getTagsForStencil(gn, 'snowball', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'efs_share;fillColor=#E05243;gradientColor=none;',
					 s * 46, s * 42, '', 'EFS Share', null, null, this.getTagsForStencil(gn, 'efs share', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'import_export;fillColor=#E05243;gradientColor=none;',
					 s * 43, s * 42, '', 'Import/Export', null, null, this.getTagsForStencil(gn, 'import export', dt).join(' ')),
			 this.createVertexTemplateEntry(n + 'volume;fillColor=#E05243;gradientColor=none;',
					 s * 35, s * 50, '', 'EBS', null, null, this.getTagsForStencil(gn, 'ebs', dt).join(' '))
		]);
	};
})();
