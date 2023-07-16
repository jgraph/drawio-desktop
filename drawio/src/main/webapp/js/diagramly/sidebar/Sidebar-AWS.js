(function()
{
	// Adds mockup shapes
	Sidebar.prototype.addAWSPalette = function()
	{
		this.setCurrentSearchEntryLibrary('aws2', 'aws2Analytics');
		this.addAWSAnalyticsPalette();
		this.setCurrentSearchEntryLibrary('aws2', 'aws2Application Services');
		this.addAWSApplicationServicesPalette();
		this.setCurrentSearchEntryLibrary('aws2', 'aws2Compute');
		this.addAWSComputePalette();
		this.setCurrentSearchEntryLibrary('aws2', 'aws2Database');
		this.addAWSDatabasePalette();
		this.setCurrentSearchEntryLibrary('aws2', 'aws2Developer Tools');
		this.addAWSDeveloperToolsPalette();
		this.setCurrentSearchEntryLibrary('aws2', 'aws2Enterprise Applications');
		this.addAWSEnterpriseApplicationsPalette();
		this.setCurrentSearchEntryLibrary('aws2', 'aws2Game Development');
		this.addAWSGameDevelopmentPalette();
		this.setCurrentSearchEntryLibrary('aws2', 'aws2General');
		this.addAWSGeneralPalette();
		this.setCurrentSearchEntryLibrary('aws2', 'aws2Internet of Things');
		this.addAWSInternetOfThingsPalette();
		this.setCurrentSearchEntryLibrary('aws2', 'aws2Management Tools');
		this.addAWSManagementToolsPalette();
		this.setCurrentSearchEntryLibrary('aws2', 'aws2Mobile Services');
		this.addAWSMobileServicesPalette();
		this.setCurrentSearchEntryLibrary('aws2', 'aws2Networking');
		this.addAWSNetworkingPalette();
		this.setCurrentSearchEntryLibrary('aws2', 'aws2On-Demand Workforce');
		this.addAWSOnDemandWorkforcePalette();
		this.setCurrentSearchEntryLibrary('aws2', 'aws2SDKs');
		this.addAWSSDKPalette();
		this.setCurrentSearchEntryLibrary('aws2', 'aws2Security and Identity');
		this.addAWSSecurityAndIdentityPalette();
		this.setCurrentSearchEntryLibrary('aws2', 'aws2Storage and Content Delivery');
		this.addAWSStorageAndContentDeliveryPalette();
		this.setCurrentSearchEntryLibrary('aws2', 'aws2Groups');
		this.addAWSGroupPalette();
		this.setCurrentSearchEntryLibrary();
	};
	
	Sidebar.prototype.addAWSAnalyticsPalette = function()
	{
		var sb = this;
		var s = 'dashed=0;html=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.aws2.";
		var gn = 'mxgraph.aws.analytics';
		var dt = 'aws group amazon web service analytics';
		
		this.addPaletteFunctions('aws2Analytics', 'AWS / Analytics', false,
		[
		 this.createVertexTemplateEntry(s + 'analytics.data_pipeline;strokeColor=none;',
				 60, 72, '', 'Data Pipeline', null, null, this.getTagsForStencil(gn, 'data pipeline', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'analytics.elasticsearch;strokeColor=none;',
				 60, 72, '', 'ElasticSearch', null, null, this.getTagsForStencil(gn, 'elasticsearch', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'analytics.emr;strokeColor=none;',
				 60, 72, '', 'EMR', null, null, this.getTagsForStencil(gn, 'emr', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'compute_and_networking.emr_cluster;strokeColor=none;',
				 49, 55, '', 'EMR Cluster', null, null, this.getTagsForStencil(gn, 'emr cluster', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'compute_and_networking.emr_engine;strokeColor=none;',
				 74, 53, '', 'EMR Engine', null, null, this.getTagsForStencil(gn, 'emr engine', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'compute_and_networking.emr_hdfs_cluster;strokeColor=none;',
				 54, 56, '', 'EMR HDFS Cluster', null, null, this.getTagsForStencil(gn, 'emr hdfs cluster', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'compute_and_networking.emr_mapr_m3_engine;strokeColor=none;',
				 74, 53, '', 'EMR MapR M3 Engine', null, null, this.getTagsForStencil(gn, 'emr mapr m3 engine', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'compute_and_networking.emr_mapr_m5_engine;strokeColor=none;',
				 74, 53, '', 'EMR MapR M5 Engine', null, null, this.getTagsForStencil(gn, 'emr mapr m5 engine', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'compute_and_networking.emr_mapr_m7_engine;strokeColor=none;',
				 74, 53, '', 'EMR MapR M7 Engine', null, null, this.getTagsForStencil(gn, 'emr mapr m7 engine', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'analytics.kinesis;strokeColor=none;',
				 59, 72, '', 'Kinesis', null, null, this.getTagsForStencil(gn, 'kinesis', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'analytics.kinesis_analytics;strokeColor=none;',
				 66, 67, '', 'Kinesis Analytics', null, null, this.getTagsForStencil(gn, 'kinesis analytics', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'analytics.kinesis_enabledapp;strokeColor=none;',
				 58, 60, '', 'Kinesis EnabledApp', null, null, this.getTagsForStencil(gn, 'kinesis enabledapp enabled app', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'analytics.kinesis_firehose;strokeColor=none;',
				 53, 56, '', 'Kinesis Firehose', null, null, this.getTagsForStencil(gn, 'kinesis firehose', dt).join(' ')),

		 this.createVertexTemplateEntry(s + 'analytics.kinesis_streams;strokeColor=none;',
				 53, 56, '', 'Kinesis Streams', null, null, this.getTagsForStencil(gn, 'kinesis streams', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'analytics.machine_learning;strokeColor=none;',
				 60, 72, '', 'Machine Learning', null, null, this.getTagsForStencil(gn, 'machine learning', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'analytics.quicksight;strokeColor=none;',
				 60, 66, '', 'QuickSight', null, null, this.getTagsForStencil(gn, 'quicksight', dt).join(' '))
		]);
	};
	
	Sidebar.prototype.addAWSApplicationServicesPalette = function()
	{
		var sb = this;
		var s = 'dashed=0;html=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.aws2.";
		var gn = 'mxgraph.aws.applicationServices';
		var dt = 'aws group amazon web service application services';
		
		this.addPaletteFunctions('aws2Application Services', 'AWS / Application Services', false,
		[
		 this.createVertexTemplateEntry(s + 'app_services.api_gateway;strokeColor=none;',
				 60, 72, '', 'API Gateway', null, null, this.getTagsForStencil(gn, 'api gateway', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'app_services.appstream;strokeColor=none;',
				 59, 72, '', 'AppStream', null, null, this.getTagsForStencil(gn, 'appstream', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'app_services.cloudsearch;strokeColor=none;',
				 59, 72, '', 'CloudSearch', null, null, this.getTagsForStencil(gn, 'cloudsearch', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'app_services.cloudsearch_sdf_metadata;strokeColor=none;',
				 52, 56, '', 'CloudSearch SDF Metadata', null, null, this.getTagsForStencil(gn, 'cloudsearch sdf metadata', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'app_services.elastic_transcoder;strokeColor=none;',
				 59, 72, '', 'Elastic Transcoder', null, null, this.getTagsForStencil(gn, 'elastic transcoder', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'app_services.ses;strokeColor=none;',
				 61, 72, '', 'SES', null, null, this.getTagsForStencil(gn, 'ses', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'app_services.email;strokeColor=none;',
				 73, 54, '', 'SES Email', null, null, this.getTagsForStencil(gn, 'ses email', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'app_services.sqs;strokeColor=none;',
				 59, 72, '', 'SQS', null, null, this.getTagsForStencil(gn, 'sqs', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'app_services.sqs_message;strokeColor=none;',
				 37, 42, '', 'SQS Message', null, null, this.getTagsForStencil(gn, 'sqs message', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'app_services.sqs_queue;strokeColor=none;',
				 65, 42, '', 'SQS Queue', null, null, this.getTagsForStencil(gn, 'sqs queue', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'app_services.swf;strokeColor=none;',
				 59, 72, '', 'SWF', null, null, this.getTagsForStencil(gn, 'swf', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'app_services.swf_decider;strokeColor=none;',
				 55, 57, '', 'SWF Decider', null, null, this.getTagsForStencil(gn, 'swf decider', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'app_services.swf_worker;strokeColor=none;',
				 53, 56, '', 'SWF Worker', null, null, this.getTagsForStencil(gn, 'swf worker', dt).join(' '))
		]);
	};
	
	Sidebar.prototype.addAWSComputePalette = function()
	{
		var sb = this;
		var s = 'dashed=0;html=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.aws2.compute_and_networking.";
		var gn = 'mxgraph.aws.compute';
		var dt = 'aws group amazon web service compute';

		this.addPaletteFunctions('aws2Compute', 'AWS / Compute', false,
		[
		 this.createVertexTemplateEntry(s + 'auto_scaling;strokeColor=none;',
				 59, 57, '', 'Auto Scaling', null, null, this.getTagsForStencil(gn, 'auto scaling', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'ec2;strokeColor=none;',
				 59, 72, '', 'EC2', null, null, this.getTagsForStencil(gn, 'ec2', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'ec2_ami;strokeColor=none;',
				 53, 56, '', 'EC2 AMI', null, null, this.getTagsForStencil(gn, 'ec2 ami', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'ec2_cloudwatch;strokeColor=none;',
				 53, 56, '', 'EC2 CloudWatch', null, null, this.getTagsForStencil(gn, 'ec2 cloudwatch', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'ec2_db_on_instance;strokeColor=none;',
				 52, 56, '', 'EC2 DB On Instance', null, null, this.getTagsForStencil(gn, 'ec2 db on instance database', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'ec2_elastic_ip;strokeColor=none;',
				 67, 22, '', 'EC2 Elastic IP', null, null, this.getTagsForStencil(gn, 'ec2 elastic ip', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'ec2_instance;strokeColor=none;',
				 52, 56, '', 'EC2 Instance', null, null, this.getTagsForStencil(gn, 'ec2 instance', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'ec2_instances;strokeColor=none;',
				 50, 57, '', 'EC2 Instances', null, null, this.getTagsForStencil(gn, 'ec2 instances', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'ec2_optimized_instance;strokeColor=none;',
				 53, 56, '', 'EC2 Optimized Instance', null, null, this.getTagsForStencil(gn, 'ec2 optimized instance', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'ec2_spot_instance;strokeColor=none;',
				 53, 57, '', 'EC2 Spot Instance', null, null, this.getTagsForStencil(gn, 'ec2 spot instance', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'ec2_container_registry;strokeColor=none;',
				 61, 63, '', 'EC2 Container Registry', null, null, this.getTagsForStencil(gn, 'ec2 container registry', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'ec2_container_service;strokeColor=none;',
				 61, 63, '', 'EC2 Container Service', null, null, this.getTagsForStencil(gn, 'ec2 container service', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'elastic_beanstalk;strokeColor=none;',
				 59, 82, '', 'Elastic Beanstalk', null, null, this.getTagsForStencil(gn, 'elastic beanstalk', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'elastic_beanstalk_application;strokeColor=none;',
				 31, 57, '', 'Elastic Beanstalk Application', null, null, this.getTagsForStencil(gn, 'elastic beanstalk application', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'elastic_beanstalk_deployment;strokeColor=none;',
				 50, 66, '', 'Elastic Beanstalk Deployment', null, null, this.getTagsForStencil(gn, 'elastic beanstalk deployment', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'elastic_load_balancing_2;strokeColor=none;',
				 56, 58, '', 'Elastic Load Balancing', null, null, this.getTagsForStencil(gn, 'elastic load balancing', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'lambda;strokeColor=none;',
				 59, 72, '', 'Lambda', null, null, this.getTagsForStencil(gn, 'lambda', dt).join(' '))
		]);
	};
	
	Sidebar.prototype.addAWSDatabasePalette = function()
	{
		var sb = this;
		var s = 'dashed=0;html=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.aws2.";
		var gn = 'mxgraph.aws.database';
		var dt = 'aws group amazon web service database';
		
		this.addPaletteFunctions('aws2Database', 'AWS / Database', false,
		[
		 this.createVertexTemplateEntry(s + 'database.database_migration_service;strokeColor=none;',
				 64, 72, '', 'Database Migration Service', null, null, this.getTagsForStencil(gn, 'database migration service', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'database.dynamodb;strokeColor=none;',
				 59, 72, '', 'DynamoDB', null, null, this.getTagsForStencil(gn, 'dynamodb', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'database.dynamodb_attribute;strokeColor=none;',
				 54, 56, '', 'DynamoDB Attribute', null, null, this.getTagsForStencil(gn, 'dynamodb attribute', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'database.dynamodb_attributes;strokeColor=none;',
				 52, 56, '', 'DynamoDB Attributes', null, null, this.getTagsForStencil(gn, 'dynamodb attributes', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'database.dynamodb_global_secondary_indexes;strokeColor=none;',
				 53, 56, '', 'DynamoDB Global Secondary Index', null, null, this.getTagsForStencil(gn, 'dynamodb global secondary indexes', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'database.dynamodb_item;strokeColor=none;',
				 55, 56, '', 'DynamoDB Item', null, null, this.getTagsForStencil(gn, 'dynamodb item', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'database.dynamodb_items;strokeColor=none;',
				 52, 57, '', 'DynamoDB Items', null, null, this.getTagsForStencil(gn, 'dynamodb items', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'database.dynamodb_table;strokeColor=none;',
				 60, 56, '', 'DynamoDB Table', null, null, this.getTagsForStencil(gn, 'dynamodb table', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'database.elasticcache_memcache;strokeColor=none;',
				 52, 55, '', 'ElasticCache MemCache', null, null, this.getTagsForStencil(gn, 'elasticcache memcache', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'database.elasticcache;strokeColor=none;',
				 59, 72, '', 'ElasticCache', null, null, this.getTagsForStencil(gn, 'elasticcache', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'database.elasticcache_node;strokeColor=none;',
				 52, 55, '', 'ElasticCache Node', null, null, this.getTagsForStencil(gn, 'elasticcache node', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'database.elasticcache_redis;strokeColor=none;',
				 52, 55, '', 'ElasticCache Redis', null, null, this.getTagsForStencil(gn, 'elasticcache redis', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'database.rds;strokeColor=none;',
				 63, 72, '', 'RDS', null, null, this.getTagsForStencil(gn, 'rds', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'database.rds_db_instance;strokeColor=none;',
				 43, 56, '', 'RDS DB Instance', null, null, this.getTagsForStencil(gn, 'rds db instance', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'database.rds_instance_read_replica;strokeColor=none;',
				 43, 56, '', 'RDS Instance Read Replica', null, null, this.getTagsForStencil(gn, 'rds instance read replica', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'database.rds_instance_standby;strokeColor=none;',
				 43, 56, '', 'RDS Instance Standby', null, null, this.getTagsForStencil(gn, 'rds instance standby', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'database.rds_ms_sql_instance;strokeColor=none;',
				 52, 55, '', 'RDS MS SQL Instance', null, null, this.getTagsForStencil(gn, 'rds ms sql instance', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'database.rds_ms_sql_instance_2;strokeColor=none;',
				 52, 56, '', 'RDS MS SQL Instance', null, null, this.getTagsForStencil(gn, 'rds ms sql instance', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'database.rds_mysql_db_instance;strokeColor=none;',
				 52, 55, '', 'RDS MySQL Instance', null, null, this.getTagsForStencil(gn, 'rds mysql db instance', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'database.rds_mysql_db_instance_2;strokeColor=none;',
				 52, 56, '', 'RDS MySQL Instance', null, null, this.getTagsForStencil(gn, 'rds mysql db instance', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'database.rds_oracle_db_instance;strokeColor=none;',
				 52, 55, '', 'RDS Oracle Instance', null, null, this.getTagsForStencil(gn, 'rds oracle db instance', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'database.rds_oracle_db_instance_2;strokeColor=none;',
				 52, 56, '', 'RDS Oracle Instance', null, null, this.getTagsForStencil(gn, 'rds oracle db instance', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'database.rds_replica_sets_with_piop;strokeColor=none;',
				 53, 55, '', 'RDS PIOP', null, null, this.getTagsForStencil(gn, 'rds piop', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'database.rds_postgresql;strokeColor=none;',
				 52, 55, '', 'RDS PostgreSQL', null, null, this.getTagsForStencil(gn, 'rds postgresql', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'database.rds_mastersql;strokeColor=none;',
				 52, 56, '', 'RDS SQL Master', null, null, this.getTagsForStencil(gn, 'rds sql master', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'database.rds_slavesql;strokeColor=none;',
				 52, 56, '', 'RDS SQL Slave', null, null, this.getTagsForStencil(gn, 'rds sql slave', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'database.redshift;strokeColor=none;',
				 60, 66, '', 'Redshift', null, null, this.getTagsForStencil(gn, 'redshift', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'database.redshift_dense_compute_node;strokeColor=none;',
				 49, 55, '', 'Redshift Dense Compute Node', null, null, this.getTagsForStencil(gn, 'redshift dense compute node', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'database.redshift_dense_storage_node;strokeColor=none;',
				 49, 55, '', 'Redshift Dense Storage Node', null, null, this.getTagsForStencil(gn, 'redshift dense storage node', dt).join(' '))
		]);
	};
	
	Sidebar.prototype.addAWSDeveloperToolsPalette = function()
	{
		var sb = this;
		var s = 'dashed=0;html=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.aws2.";
		var gn = 'mxgraph.aws.developerTools';
		var dt = 'aws group amazon web service developer tools';
		
		this.addPaletteFunctions('aws2Developer Tools', 'AWS / Developer Tools', false,
		[
		 this.createVertexTemplateEntry(s + 'developer_tools.code_commit;strokeColor=none;',
				 68, 82, '', 'Code Commit', null, null, this.getTagsForStencil(gn, 'code commit', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'deployment_and_management.codedeploy;strokeColor=none;',
				 59, 72, '', 'Code Deploy', null, null, this.getTagsForStencil(gn, 'codedeploy', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'developer_tools.code_pipeline;strokeColor=none;',
				 60, 72, '', 'Code Pipeline', null, null, this.getTagsForStencil(gn, 'code pipeline', dt).join(' '))
		]);
	};
	
	Sidebar.prototype.addAWSEnterpriseApplicationsPalette = function()
	{
		var sb = this;
		var s = 'dashed=0;html=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.aws2.";
		var gn = 'mxgraph.aws.enterpriseApplications';
		var dt = 'aws group amazon web service enterprise applications';
		
		this.addPaletteFunctions('aws2Enterprise Applications', 'AWS / Enterprise Applications', false,
		[
		 this.createVertexTemplateEntry(s + 'enterprise_applications.workdocs;strokeColor=none;',
				 74, 85, '', 'WorkDocs', null, null, this.getTagsForStencil(gn, 'workdocs', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'enterprise_applications.workmail;strokeColor=none;',
				 74, 85, '', 'WorkMail', null, null, this.getTagsForStencil(gn, 'workmail', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'enterprise_applications.workspaces;strokeColor=none;',
				 74, 85, '', 'WorkSpaces', null, null, this.getTagsForStencil(gn, 'workspaces', dt).join(' '))
		]);
	};
	
	Sidebar.prototype.addAWSGameDevelopmentPalette = function()
	{
		var sb = this;
		var s = 'dashed=0;html=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.aws2.";
		var gn = 'mxgraph.aws.gameDevelopment';
		var dt = 'aws amazon web service game development';
		
		this.addPaletteFunctions('aws2Game Development', 'AWS / Game Development', false,
		[
		 this.createVertexTemplateEntry(s + 'game_development.gamelift;strokeColor=none;',
				 62, 75, '', 'GameLift', null, null, this.getTagsForStencil(gn, 'game lift', dt).join(' '))
		]);
	};
	
	Sidebar.prototype.addAWSGeneralPalette = function()
	{
		var sb = this;
		var s = 'dashed=0;html=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.aws2.";
		var gn = 'mxgraph.aws.general';
		var dt = 'aws amazon web service general';
		
		this.addPaletteFunctions('aws2General', 'AWS / General', false,
		[
		 this.createVertexTemplateEntry(s + 'non-service_specific.client;strokeColor=none;',
				 57, 57, '', 'Client', null, null, this.getTagsForStencil(gn, 'client', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'non-service_specific.cloud;strokeColor=none;',
				 70, 46, '', 'Cloud', null, null, this.getTagsForStencil(gn, 'cloud', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'non-service_specific.corporate_data_center;strokeColor=none;',
				 42, 57, '', 'Corporate Data Center', null, null, this.getTagsForStencil(gn, 'corporate data center', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'non-service_specific.disk;strokeColor=none;',
				 57, 57, '', 'Disk', null, null, this.getTagsForStencil(gn, 'disk', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'non-service_specific.forums;strokeColor=none;',
				 76, 73, '', 'Forums', null, null, this.getTagsForStencil(gn, 'forums', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'non-service_specific.generic_database;strokeColor=none;',
				 44, 57, '', 'Generic Database', null, null, this.getTagsForStencil(gn, 'generic database', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'non-service_specific.internet;strokeColor=none;',
				 70, 46, '', 'Internet', null, null, this.getTagsForStencil(gn, 'internet', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'non-service_specific.management_console;strokeColor=none;',
				 57, 57, '', 'Management Console', null, null, this.getTagsForStencil(gn, 'management console', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'non-service_specific.mobile_client;strokeColor=none;',
				 37, 57, '', 'Mobile Client', null, null, this.getTagsForStencil(gn, 'mobile client', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'non-service_specific.multimedia;strokeColor=none;',
				 59, 57, '', 'Multimedia', null, null, this.getTagsForStencil(gn, 'multimedia', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'non-service_specific.tape_storage;strokeColor=none;',
				 68, 38, '', 'Tape Storage', null, null, this.getTagsForStencil(gn, 'tape storage', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'non-service_specific.traditional_server;strokeColor=none;',
				 41, 56, '', 'Traditional Server', null, null, this.getTagsForStencil(gn, 'traditional server', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'non-service_specific.user;strokeColor=none;',
				 41, 56, '', 'User', null, null, this.getTagsForStencil(gn, 'user', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'non-service_specific.users;strokeColor=none;',
				 58, 56, '', 'Users', null, null, this.getTagsForStencil(gn, 'users', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'non-service_specific.virtual_private_cloud;strokeColor=none;',
				 70, 46, '', 'Virtual Private Cloud', null, null, this.getTagsForStencil(gn, 'vpc virtual private cloud', dt).join(' '))
		]);
	};
	
	Sidebar.prototype.addAWSInternetOfThingsPalette = function()
	{
		var sb = this;
		var s = 'dashed=0;html=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.aws2.internet_of_things.";
		var gn = 'mxgraph.aws.internetOfThings';
		var dt = 'aws group amazon web service internet of things iot';
		
		this.addPaletteFunctions('aws2Internet of Things', 'AWS / Internet of Things', false,
		[
		 this.createVertexTemplateEntry(s + 'action;strokeColor=none;',
				 55, 57, '', 'Action', null, null, this.getTagsForStencil(gn, 'action', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'actuator;strokeColor=none;',
				 68, 80, '', 'Actuator', null, null, this.getTagsForStencil(gn, 'actuator', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'aws-iot;strokeColor=none;',
				 60, 72, '', 'AWS IOT', null, null, this.getTagsForStencil(gn, 'aws iot', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'bank;strokeColor=none;',
				 71, 71, '', 'Bank', null, null, this.getTagsForStencil(gn, 'bank', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'bicycle;strokeColor=none;',
				 71, 71, '', 'Bicycle', null, null, this.getTagsForStencil(gn, 'bicycle', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'camera;strokeColor=none;',
				 71, 71, '', 'Camera', null, null, this.getTagsForStencil(gn, 'camera', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'car;strokeColor=none;',
				 71, 71, '', 'Car', null, null, this.getTagsForStencil(gn, 'car', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'cart;strokeColor=none;',
				 71, 71, '', 'Cart', null, null, this.getTagsForStencil(gn, 'cart', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'certificate;strokeColor=none;',
				 56, 77, '', 'Certificate', null, null, this.getTagsForStencil(gn, 'certificate', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'coffee_pot;strokeColor=none;',
				 71, 71, '', 'Coffee Pot', null, null, this.getTagsForStencil(gn, 'coffee pot', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'desired_state;strokeColor=none;',
				 53, 57, '', 'Desired State', null, null, this.getTagsForStencil(gn, 'desired_state', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'door_lock;strokeColor=none;',
				 71, 71, '', 'Door Lock', null, null, this.getTagsForStencil(gn, 'door lock', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'factory;strokeColor=none;',
				 71, 71, '', 'Factory', null, null, this.getTagsForStencil(gn, 'factory', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'generic_iot_thing;strokeColor=none;',
				 71, 71, '', 'Generic IOT Thing', null, null, this.getTagsForStencil(gn, 'generic iot thing', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'hardware_board;strokeColor=none;',
				 75, 87, '', 'Hardware Board', null, null, this.getTagsForStencil(gn, 'hardware_board', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'house;strokeColor=none;',
				 71, 71, '', 'House', null, null, this.getTagsForStencil(gn, 'house', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'http_protocol;strokeColor=none;',
				 56, 59, '', 'HTTP Protocol', null, null, this.getTagsForStencil(gn, 'http protocol', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'http2_protocol;strokeColor=none;',
				 56, 59, '', 'HTTP2 Protocol', null, null, this.getTagsForStencil(gn, 'http2 protocol', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'lightbulb;strokeColor=none;',
				 71, 71, '', 'Lightbulb', null, null, this.getTagsForStencil(gn, 'lightbulb', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'medical_emergency;strokeColor=none;',
				 71, 71, '', 'Medical Emergency', null, null, this.getTagsForStencil(gn, 'medical_emergency', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'mqtt_protocol;strokeColor=none;',
				 56, 59, '', 'MQTT Protocol', null, null, this.getTagsForStencil(gn, 'mqtt protocol', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'police_emergency;strokeColor=none;',
				 71, 71, '', 'Police Emergency', null, null, this.getTagsForStencil(gn, 'police_emergency', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'policy;strokeColor=none;',
				 49, 79, '', 'Policy', null, null, this.getTagsForStencil(gn, 'policy', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'reported_state;strokeColor=none;',
				 53, 57, '', 'Reported State', null, null, this.getTagsForStencil(gn, 'reported_state', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'rule;strokeColor=none;',
				 44, 87, '', 'Rule', null, null, this.getTagsForStencil(gn, 'rule', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'sensor;strokeColor=none;',
				 68, 80, '', 'Sensor', null, null, this.getTagsForStencil(gn, 'sensor', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'servo;strokeColor=none;',
				 75, 53, '', 'Servo', null, null, this.getTagsForStencil(gn, 'servo', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'shadow;strokeColor=none;',
				 75, 80, '', 'Shadow', null, null, this.getTagsForStencil(gn, 'shadow', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'simulator;strokeColor=none;',
				 67, 70, '', 'Simulator', null, null, this.getTagsForStencil(gn, 'simulator', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'thermostat;strokeColor=none;',
				 71, 71, '', 'Thermostat', null, null, this.getTagsForStencil(gn, 'thermostat', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'topic;strokeColor=none;',
				 44, 59, '', 'Topic', null, null, this.getTagsForStencil(gn, 'topic', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'travel;strokeColor=none;',
				 71, 71, '', 'Travel', null, null, this.getTagsForStencil(gn, 'travel', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'utility;strokeColor=none;',
				 71, 71, '', 'Utility', null, null, this.getTagsForStencil(gn, 'utility', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'windfarm;strokeColor=none;',
				 71, 71, '', 'Windfarm', null, null, this.getTagsForStencil(gn, 'windfarm', dt).join(' '))
		]);
	};
	
	Sidebar.prototype.addAWSManagementToolsPalette = function()
	{
		var sb = this;
		var s = 'dashed=0;html=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.aws2.";
		var gn = 'mxgraph.aws.managementTools';
		var dt = 'aws group amazon web service management tools';
		
		this.addPaletteFunctions('aws2Management Tools', 'AWS / Management Tools', false,
		[
		 this.createVertexTemplateEntry(s + 'deployment_and_management.cloudformation;strokeColor=none;',
				 59, 72, '', 'CloudFormation', null, null, this.getTagsForStencil(gn, 'cloudformation', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'deployment_and_management.cloudformation_stack;strokeColor=none;',
				 64, 49, '', 'CloudFormation Stack', null, null, this.getTagsForStencil(gn, 'cloudformation stack', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'deployment_and_management.cloudformation_template;strokeColor=none;',
				 48, 56, '', 'CloudFormation Template', null, null, this.getTagsForStencil(gn, 'cloudformation template', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'deployment_and_management.cloudtrail;strokeColor=none;',
				 59, 72, '', 'CloudTrail', null, null, this.getTagsForStencil(gn, 'cloudtrail', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'deployment_and_management.cloudwatch;strokeColor=none;',
				 63, 72, '', 'CloudWatch', null, null, this.getTagsForStencil(gn, 'cloudwatch', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'deployment_and_management.cloudwatch_alarm;strokeColor=none;',
				 48, 58, '', 'CloudWatch Alarm', null, null, this.getTagsForStencil(gn, 'cloudwatch alarm', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'administration_and_security.config;strokeColor=none;',
				 59, 72, '', 'Config', null, null, this.getTagsForStencil(gn, 'config', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'deployment_and_management.opsworks;strokeColor=none;',
				 59, 72, '', 'OpsWorks', null, null, this.getTagsForStencil(gn, 'opsworks', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'deployment_and_management.opsworks_apps;strokeColor=none;',
				 72, 72, '', 'OpsWorks Apps', null, null, this.getTagsForStencil(gn, 'opsworks apps', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'deployment_and_management.opsworks_deployments;strokeColor=none;',
				 72, 68, '', 'OpsWorks Deployments', null, null, this.getTagsForStencil(gn, 'opsworks deployments', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'deployment_and_management.opsworks_instances;strokeColor=none;',
				 72, 72, '', 'OpsWorks Instances', null, null, this.getTagsForStencil(gn, 'opsworks instances', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'deployment_and_management.opsworks_layers;strokeColor=none;',
				 72, 72, '', 'OpsWorks Layers', null, null, this.getTagsForStencil(gn, 'opsworks layers', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'deployment_and_management.opsworks_monitoring;strokeColor=none;',
				 72, 60, '', 'OpsWorks Monitoring', null, null, this.getTagsForStencil(gn, 'opsworks monitoring', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'deployment_and_management.opsworks_permissions;strokeColor=none;',
				 59, 72, '', 'OpsWorks Permissions', null, null, this.getTagsForStencil(gn, 'opsworks permissions', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'deployment_and_management.opsworks_resources;strokeColor=none;',
				 59, 72, '', 'OpsWorks Resources', null, null, this.getTagsForStencil(gn, 'opsworks resources', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'deployment_and_management.opsworks_stack;strokeColor=none;',
				 60, 70, '', 'OpsWorks Stack', null, null, this.getTagsForStencil(gn, 'opsworks stack', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'management_tools.service_catalog;strokeColor=none;',
				 60, 70, '', 'Service Catalog', null, null, this.getTagsForStencil(gn, 'service catalog', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'administration_and_security.trusted_advisor;strokeColor=none;',
				 60, 72, '', 'Trusted Advisor', null, null, this.getTagsForStencil(gn, 'trusted advisor', dt).join(' '))
		]);
	};
	
	Sidebar.prototype.addAWSMobileServicesPalette = function()
	{
		var sb = this;
		var s = 'dashed=0;html=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.aws2.";
		var gn = 'mxgraph.aws.mobileServices';
		var dt = 'aws group amazon web service mobile services';
		
		this.addPaletteFunctions('aws2Mobile Services', 'AWS / Mobile Services', false,
		[
		 this.createVertexTemplateEntry(s + 'mobile_services.aws_mobile_hub;strokeColor=none;',
				 83, 86, '', 'AWS Mobile Hub', null, null, this.getTagsForStencil(gn, 'aws mobile hub', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'mobile_services.cognito;strokeColor=none;',
				 59, 72, '', 'Cognito', null, null, this.getTagsForStencil(gn, 'cognito', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'mobile_services.device_farm;strokeColor=none;',
				 68, 82, '', 'Device Farm', null, null, this.getTagsForStencil(gn, 'device farm', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'mobile_services.mobile_analytics;strokeColor=none;',
				 70, 72, '', 'Mobile Analytics', null, null, this.getTagsForStencil(gn, 'mobile analytics', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'mobile_services.sns;strokeColor=none;',
				 69, 69, '', 'SNS', null, null, this.getTagsForStencil(gn, 'sns', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'mobile_services.sns_email_notification;strokeColor=none;',
				 90, 56, '', 'SNS Email Notification', null, null, this.getTagsForStencil(gn, 'sns email notification', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'mobile_services.sns_http_notification;strokeColor=none;',
				 90, 56, '', 'SNS HTTP Notification', null, null, this.getTagsForStencil(gn, 'sns http notification', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'mobile_services.sns_topic;strokeColor=none;',
				 90, 56, '', 'SNS Topic', null, null, this.getTagsForStencil(gn, 'sns topic', dt).join(' '))
		]);
	};
	
	Sidebar.prototype.addAWSNetworkingPalette = function()
	{
		var sb = this;
		var s = 'dashed=0;html=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.aws2.";
		var gn = 'mxgraph.aws.networking';
		var dt = 'aws group amazon web service networking';
		
		this.addPaletteFunctions('aws2Networking', 'AWS / Networking', false,
		[
		 this.createVertexTemplateEntry(s + 'compute_and_networking.aws_direct_connect;strokeColor=none;',
				 59, 72, '', 'Direct Connect', null, null, this.getTagsForStencil(gn, 'direct connect', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'compute_and_networking.route_53;strokeColor=none;',
				 59, 72, '', 'Route 53', null, null, this.getTagsForStencil(gn, 'route 53', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'compute_and_networking.route_53_hosted_zone;strokeColor=none;',
				 58, 56, '', 'Route 53 Hosted Zone', null, null, this.getTagsForStencil(gn, 'route 53 hosted zone', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'compute_and_networking.route_53_route_table;strokeColor=none;',
				 66, 61, '', 'Route 53 Table', null, null, this.getTagsForStencil(gn, 'route 53 table', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'compute_and_networking.vpc;strokeColor=none;',
				 59, 72, '', 'VPC', null, null, this.getTagsForStencil(gn, 'vpc virtual private cloud', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'networking.vpc_customer_gateway;strokeColor=none;',
				 61, 64, '', 'VPC Customer Gateway', null, null, this.getTagsForStencil(gn, 'vpc virtual private cloud customer gateway', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'networking.vpc_endpoints;strokeColor=none;',
				 61, 64, '', 'VPC Endpoints', null, null, this.getTagsForStencil(gn, 'vpc virtual private cloud endpoints', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'networking.vpc_flowlogs;strokeColor=none;',
				 61, 64, '', 'VPC Flowlogs', null, null, this.getTagsForStencil(gn, 'vpc virtual private cloud flowlogs', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'compute_and_networking.vpc_internet_gateway;strokeColor=none;',
				 55, 57, '', 'VPC Internet Gateway', null, null, this.getTagsForStencil(gn, 'vpc virtual private cloud internet gateway', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'compute_and_networking.vpc_peering;strokeColor=none;',
				 55, 57, '', 'VPC Peering', null, null, this.getTagsForStencil(gn, 'vpc virtual private cloud peering', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'networking.vpc_router;strokeColor=none;',
				 61, 64, '', 'VPC Router', null, null, this.getTagsForStencil(gn, 'vpc virtual private cloud router', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'compute_and_networking.vpc_vpn_connection;strokeColor=none;',
				 52, 41, '', 'VPC VPN Connection', null, null, this.getTagsForStencil(gn, 'vpc virtual private cloud vpn connection', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'compute_and_networking.vpc_vpn_gateway;strokeColor=none;',
				 55, 57, '', 'VPC VPN Gateway', null, null, this.getTagsForStencil(gn, 'vpc virtual private cloud vpn gateway', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'networking.vpcnat_gateway;strokeColor=none;',
				 61, 64, '', 'VPCNAT Gateway', null, null, this.getTagsForStencil(gn, 'vpc virtual private cloud vpcnat gateway', dt).join(' '))
		]);
	};
	
	Sidebar.prototype.addAWSOnDemandWorkforcePalette = function()
	{
		var sb = this;
		var s = 'dashed=0;html=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.aws2.";
		var gn = 'mxgraph.aws.on-demand_workforce';
		var dt = 'aws group amazon web service on demand workforce';
		
		this.addPaletteFunctions('aws2On-Demand Workforce', 'AWS / On-Demand Workforce', false,
		[
		 this.createVertexTemplateEntry(s + 'on-demand_workforce.mechanical_turk;strokeColor=none;',
				 60, 72, '', 'Mechanical Turk', null, null, this.getTagsForStencil(gn, 'mechanical turk', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'on-demand_workforce.mechanical_turk_assignment_task;strokeColor=none;',
				 41, 56, '', 'Mechanical Turk Assignment Task', null, null, this.getTagsForStencil(gn, 'mechanical turk assignment task', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'on-demand_workforce.mechanical_turk_human_intelligence_tasks;strokeColor=none;',
				 46, 50, '', 'Mechanical Turk Human Intelligence Task (HIT)', null, null, this.getTagsForStencil(gn, 'mechanical turk human intelligence task hit', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'on-demand_workforce.mechanical_turk_requester;strokeColor=none;',
				 49, 57, '', 'Mechanical Turk Requester', null, null, this.getTagsForStencil(gn, 'mechanical turk requester', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'on-demand_workforce.mechanical_turk_workers;strokeColor=none;',
				 59, 57, '', 'Mechanical Turk Workers', null, null, this.getTagsForStencil(gn, 'mechanical turk workers', dt).join(' '))
		]);
	};
	
	Sidebar.prototype.addAWSSDKPalette = function()
	{
		var sb = this;
		var s = 'dashed=0;html=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.aws2.";
		var gn = 'mxgraph.aws.sdks';
		var dt = 'aws group amazon web service sdk softvare development kit';
		
		this.addPaletteFunctions('aws2SDKs', 'AWS / SDKs', false,
		[
		 this.createVertexTemplateEntry(s + 'sdks.android;strokeColor=none;',
				 62, 72, '', 'Android', null, null, this.getTagsForStencil(gn, 'android', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'sdks.cli;strokeColor=none;',
				 62, 72, '', 'CLI', null, null, this.getTagsForStencil(gn, 'cli', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'sdks.aws_toolkit_for_eclipse;strokeColor=none;',
				 62, 72, '', 'Toolkit for Eclipse', null, null, this.getTagsForStencil(gn, 'toolkit eclipse', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'sdks.aws_toolkit_for_visual_studio;strokeColor=none;',
				 62, 72, '', 'Toolkit for Visual Studio', null, null, this.getTagsForStencil(gn, 'toolkit visual studio', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'sdks.tools_for_windows_powershell;strokeColor=none;',
				 62, 72, '', 'Tools for Windows PowerShell', null, null, this.getTagsForStencil(gn, 'tools windows powershell', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'sdks.ios;strokeColor=none;',
				 62, 72, '', 'iOS', null, null, this.getTagsForStencil(gn, 'ios', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'sdks.java;strokeColor=none;',
				 62, 72, '', 'Java', null, null, this.getTagsForStencil(gn, 'java', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'sdks.javascript;strokeColor=none;',
				 62, 72, '', 'JavaScript', null, null, this.getTagsForStencil(gn, 'javascript', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'sdks.net;strokeColor=none;',
				 62, 72, '', 'Net', null, null, this.getTagsForStencil(gn, 'net', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'sdks.nodejs;strokeColor=none;',
				 62, 72, '', 'NodeJS', null, null, this.getTagsForStencil(gn, 'nodejs', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'sdks.php;strokeColor=none;',
				 62, 72, '', 'PHP', null, null, this.getTagsForStencil(gn, 'php', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'sdks.python;strokeColor=none;',
				 62, 72, '', 'Python', null, null, this.getTagsForStencil(gn, 'python', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'sdks.ruby;strokeColor=none;',
				 62, 72, '', 'Ruby', null, null, this.getTagsForStencil(gn, 'ruby', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'sdks.xamarin;strokeColor=none;',
				 62, 72, '', 'Xamarin', null, null, this.getTagsForStencil(gn, 'xamarin', dt).join(' '))
		]);
	};
	
	Sidebar.prototype.addAWSSecurityAndIdentityPalette = function()
	{
		var sb = this;
		var s = 'dashed=0;html=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.aws2.";
		var gn = 'mxgraph.aws.securityAndIdentity';
		var dt = 'aws group amazon web service security identity';
		
		this.addPaletteFunctions('aws2Security and Identity', 'AWS / Security and Identity', false,
		[
		 this.createVertexTemplateEntry(s + 'security_and_identity.acm;strokeColor=none;',
				 68, 55, '', 'ACM', null, null, this.getTagsForStencil(gn, 'acm', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'security_and_identity.acm_certificate_manager;strokeColor=none;',
				 65, 56, '', 'ACM Certificate Manager', null, null, this.getTagsForStencil(gn, 'acm certificate manager', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'security_and_identity.service_catalog;strokeColor=none;',
				 68, 82, '', 'Inspector', null, null, this.getTagsForStencil(gn, 'service catalog', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'security_and_identity.cloud_hsm;strokeColor=none;',
				 60, 72, '', 'Cloud HSM', null, null, this.getTagsForStencil(gn, 'cloud hsm', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'security_and_identity.directory_service;strokeColor=none;',
				 60, 72, '', 'Directory Service', null, null, this.getTagsForStencil(gn, 'directory service', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'deployment_and_management.iam;strokeColor=none;',
				 37, 72, '', 'IAM', null, null, this.getTagsForStencil(gn, 'iam', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'deployment_and_management.iam_add-on;strokeColor=none;',
				 44, 24, '', 'IAM Add-on', null, null, this.getTagsForStencil(gn, 'iam addon add on', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'deployment_and_management.iam_sts;strokeColor=none;',
				 54, 31, '', 'IAM Security Token Service', null, null, this.getTagsForStencil(gn, 'iam sts security token service', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'deployment_and_management.iam_security_token_service;strokeColor=none;',
				 40, 55, '', 'IAM Security Token Service', null, null, this.getTagsForStencil(gn, 'iam sts security token service', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'deployment_and_management.iam_data_encryption_key;strokeColor=none;',
				 40, 53, '', 'IAM Data Encryption Key', null, null, this.getTagsForStencil(gn, 'iam data encryption key', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'deployment_and_management.iam_encrypted_data;strokeColor=none;',
				 38, 49, '', 'IAM Encrypted Data', null, null, this.getTagsForStencil(gn, 'iam encrypted data', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'deployment_and_management.iam_credentials;strokeColor=none;',
				 53, 39, '', 'IAM Long Term Security Credential', null, null, this.getTagsForStencil(gn, 'iam long term security credential', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'deployment_and_management.iam_mfa_token;strokeColor=none;',
				 53, 53, '', 'IAM MFA Token', null, null, this.getTagsForStencil(gn, 'iam mfa token', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'deployment_and_management.iam_permissions;strokeColor=none;',
				 42, 57, '', 'IAM Permissions', null, null, this.getTagsForStencil(gn, 'iam permissions', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'deployment_and_management.iam_roles;strokeColor=none;',
				 84, 72, '', 'IAM Role', null, null, this.getTagsForStencil(gn, 'iam role', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'deployment_and_management.iam_short_term_credentials;strokeColor=none;',
				 61, 49, '', 'IAM Temporary Security Credential', null, null, this.getTagsForStencil(gn, 'iam temporary security credential', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'security_and_identity.key_management_service;strokeColor=none;',
				 68, 82, '', 'Key Management Service', null, null, this.getTagsForStencil(gn, 'key management service', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'security_and_identity.webapp_firewall;strokeColor=none;',
				 68, 82, '', 'WebApp Firewall', null, null, this.getTagsForStencil(gn, 'webapp firewall', dt).join(' '))
		]);
	};
	
	Sidebar.prototype.addAWSStorageAndContentDeliveryPalette = function()
	{
		var sb = this;
		var s = 'dashed=0;html=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.aws2.";
		var gn = 'mxgraph.aws.storageAndContentDelivery';
		var dt = 'aws group amazon web service storage content delivery';
		
		this.addPaletteFunctions('aws2Storage and Content Delivery', 'AWS / Storage and Content Delivery', false,
		[
		 this.createVertexTemplateEntry(s + 'storage_and_content_delivery.cloudfront;strokeColor=none;',
				 59, 72, '', 'CloudFront', null, null, this.getTagsForStencil(gn, 'cloudfront', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'storage_and_content_delivery.cloudfront_download_distribution;strokeColor=none;',
				 55, 57, '', 'CloudFront Download Distribution', null, null, this.getTagsForStencil(gn, 'cloudfront download distribution', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'storage_and_content_delivery.cloudfront_edge_location;strokeColor=none;',
				 55, 57, '', 'CloudFront Edge Location', null, null, this.getTagsForStencil(gn, 'cloudfront edge location', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'storage_and_content_delivery.cloudfront_streaming_distribution;strokeColor=none;',
				 55, 57, '', 'CloudFront Streaming Distribution', null, null, this.getTagsForStencil(gn, 'cloudfront streaming distribution', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'storage_and_content_delivery.efs;strokeColor=none;',
				 60, 72, '', 'EFS', null, null, this.getTagsForStencil(gn, 'efs', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'storage_and_content_delivery.ebs;strokeColor=none;',
				 46, 66, '', 'Elastic Block Store', null, null, this.getTagsForStencil(gn, 'ebs elastic block store', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'storage_and_content_delivery.glacier;strokeColor=none;',
				 59, 71, '', 'Glacier', null, null, this.getTagsForStencil(gn, 'glacier', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'storage_and_content_delivery.glacier_archive;strokeColor=none;',
				 56, 66, '', 'Glacier Archive', null, null, this.getTagsForStencil(gn, 'glacier archive', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'storage_and_content_delivery.glacier_vault;strokeColor=none;',
				 46, 66, '', 'Glacier Vault', null, null, this.getTagsForStencil(gn, 'glacier vault', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'storage_and_content_delivery.aws_import_export;strokeColor=none;',
				 57, 56, '', 'Import Export', null, null, this.getTagsForStencil(gn, 'aws import export', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'storage_and_content_delivery.snowball;strokeColor=none;',
				 68, 82, '', 'Import Export Snowball', null, null, this.getTagsForStencil(gn, 'snowball', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'storage_and_content_delivery.s3;strokeColor=none;',
				 59, 72, '', 'S3', null, null, this.getTagsForStencil(gn, 's3', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'storage_and_content_delivery.s3_bucket;strokeColor=none;',
				 54, 56, '', 'S3 Bucket', null, null, this.getTagsForStencil(gn, 's3 bucket', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'storage_and_content_delivery.s3_bucket_with_objects;strokeColor=none;',
				 55, 56, '', 'S3 Bucket with Objects', null, null, this.getTagsForStencil(gn, 's3 bucket with objects', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'storage_and_content_delivery.s3_objects;strokeColor=none;',
				 37, 40, '', 'S3 Objects', null, null, this.getTagsForStencil(gn, 's3 objects', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'storage_and_content_delivery.ebs_snapshot;strokeColor=none;',
				 53, 65, '', 'Snapshot', null, null, this.getTagsForStencil(gn, 'snapshot', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'storage_and_content_delivery.aws_storage_gateway;strokeColor=none;',
				 59, 72, '', 'Storage Gateway', null, null, this.getTagsForStencil(gn, 'storage gateway', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'storage_and_content_delivery.storage_gateway_cached_volumn;strokeColor=none;',
				 52, 66, '', 'Storage Gateway Cached Volume', null, null, this.getTagsForStencil(gn, 'storage gateway cached volume', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'storage_and_content_delivery.storage_gateway_non-cached_volumn;strokeColor=none;',
				 52, 66, '', 'Storage Gateway Non-Cached Volume', null, null, this.getTagsForStencil(gn, 'storage gateway non cached volume', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'storage_and_content_delivery.storage_gateway_virtual_tape_library;strokeColor=none;',
				 52, 66, '', 'Storage Gateway Virtual Tape Library', null, null, this.getTagsForStencil(gn, 'storage gateway virtual tape library', dt).join(' ')),
		 this.createVertexTemplateEntry(s + 'storage_and_content_delivery.ebs_volume;strokeColor=none;',
				 46, 66, '', 'Volume', null, null, this.getTagsForStencil(gn, 'volume', dt).join(' '))
		]);
	};
	
	Sidebar.prototype.addAWSGroupPalette = function()
	{
		var sb = this;
		var s = 'dashed=0;html=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.aws.groups.";
		var gn = 'mxgraph.aws.groups';
		var dt = 'aws group amazon web service ';
		
		this.addPaletteFunctions('aws2Groups', 'AWS / Groups', false,
		[
			this.createVertexTemplateEntry(s + 'auto_scaling_group;fillColor=none;gradientColor=none;', 
					200, 200, '', 'Auto Scaling Group', null, null, this.getTagsForStencil(gn, 'auto_scaling_group', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'availability_zone;strokeColor=#f69721;fillColor=none;gradientColor=none;', 
					200, 200, '', 'Availability Zone', null, null, this.getTagsForStencil(gn, 'availability_zone', dt).join(' ')),
					
			this.addEntry(dt + 'cloud', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 30, 200, 200), s + 'rrect;fillColor=none;gradientColor=none;');
				bg1.vertex = true;
				var bg2 = new mxCell('', new mxGeometry(10, 0, 70, 40), s + 'aws_cloud_icon;strokeColor=none;fillColor=#F69721;gradientColor=none;');
				bg2.vertex = true;
			    
			   	return sb.createVertexTemplateFromCells([bg1, bg2], 200, 230, 'AWS Cloud');
			}),
									
			this.addEntry(dt + 'corporate data center', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 20, 200, 200), s + 'rrect;fillColor=none;gradientColor=none;');
				bg1.vertex = true;
				var bg2 = new mxCell('', new mxGeometry(20, 0, 30, 40), s + 'corporate_data_center_icon;strokeColor=none;fillColor=#6D6F70;gradientColor=none;');
				bg2.vertex = true;
			    
			   	return sb.createVertexTemplateFromCells([bg1, bg2], 200, 220, 'Corporate Data Center');
			}),
													
			this.addEntry(dt + 'ec2 instance content', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 20, 200, 200), s + 'rrect;fillColor=none;gradientColor=none;');
				bg1.vertex = true;
				var bg2 = new mxCell('', new mxGeometry(20, 0, 40, 40), s + 'rrect;strokeColor=none;fillColor=#F69721;gradientColor=none;');
				bg2.vertex = true;
			    
			   	return sb.createVertexTemplateFromCells([bg1, bg2], 200, 220, 'EC2 Instance Contents');
			}),
															
			this.addEntry(dt + 'EC2 Spot Fleet', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 30, 200, 200), s + 'rrect;fillColor=none;gradientColor=none;');
				bg1.vertex = true;
				var bg2 = new mxCell('', new mxGeometry(20, 0, 43, 40), s + 'ec2_spot_instance;strokeColor=none;gradientColor=none;');
				bg2.vertex = true;
			    
			   	return sb.createVertexTemplateFromCells([bg1, bg2], 200, 230, 'EC2 Spot Fleet');
			}),

			this.addEntry(dt + 'elastic beanstalk container', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 20, 200, 200), s + 'rrect;fillColor=none;gradientColor=none;');
				bg1.vertex = true;
				var bg2 = new mxCell('', new mxGeometry(20, 0, 40, 40), s + 'elastic_beanstalk_container_icon;strokeColor=none;fillColor=#2A6A35;gradientColor=none;');
				bg2.vertex = true;
			    
			   	return sb.createVertexTemplateFromCells([bg1, bg2], 200, 220, 'Elastic Beanstalk Container');
			}),
																	
			this.createVertexTemplateEntry(s + 'region;fillColor=none;gradientColor=none;', 
					200, 200, '', 'Region', null, null, this.getTagsForStencil(gn, 'region', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rrect;fillColor=none;gradientColor=none;', 
					200, 200, '', 'Security Group', null, null, this.getTagsForStencil(gn, 'security', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rrect;fillColor=#F2F2F2;gradientColor=none;', 
					200, 200, '', 'Server Contents', null, null, this.getTagsForStencil(gn, 'server content', dt).join(' ')),

			this.addEntry(dt + 'virtual private cloud', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 30, 200, 200), s + 'rrect;fillColor=none;gradientColor=none;');
				bg1.vertex = true;
				var bg2 = new mxCell('', new mxGeometry(10, 0, 70, 40), s + 'virtual_private_cloud_icon;strokeColor=none;fillColor=#282560;gradientColor=none;');
				bg2.vertex = true;
			    
			   	return sb.createVertexTemplateFromCells([bg1, bg2], 200, 230, 'Virtual Private Cloud');
			}),
										
			this.addEntry(dt + 'virtual private cloud subnet vpc', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 30, 200, 200), s + 'rrect;fillColor=none;gradientColor=none;');
				bg1.vertex = true;
				var bg2 = new mxCell('', new mxGeometry(20, 0, 40, 40), s + 'vpc_subnet_icon;strokeColor=none;fillColor=#282560;gradientColor=none;');
				bg2.vertex = true;
			    
			   	return sb.createVertexTemplateFromCells([bg1, bg2], 200, 230, 'VPC Subnet');
			})
		]);
	};
})();
