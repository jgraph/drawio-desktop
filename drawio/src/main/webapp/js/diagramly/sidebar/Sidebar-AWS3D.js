(function()
{
	// Adds AWS 3D shapes
	Sidebar.prototype.addAWS3DPalette = function()
	{
		var w = 100;
		var h = 100;
		var s = mxConstants.STYLE_VERTICAL_LABEL_POSITION + '=bottom;html=1;' + mxConstants.STYLE_VERTICAL_ALIGN + '=top;' + mxConstants.STYLE_STROKEWIDTH + '=1;align=center;outlineConnect=0;dashed=0;outlineConnect=0;shape=mxgraph.aws3d.';
		var gn = 'mxgraph.aws3d';
		var dt = 'aws 3d amazon web service';
		this.setCurrentSearchEntryLibrary('aws3d');

		this.addPaletteFunctions('aws3d', 'AWS 3D', false,
		[
			this.createVertexTemplateEntry(s + 'ami;aspect=fixed;fillColor=#E8CA45;strokeColor=#FFF215;', 
					w * 0.92, h * 0.6, '', 'AMI', null, null, this.getTagsForStencil(gn, 'ami', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'ami2;aspect=fixed;fillColor=#FF9900;strokeColor=#ffffff;', 
					w * 0.74, h * 0.5, '', 'AMI', null, null, this.getTagsForStencil(gn, 'ami', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'application;fillColor=#4286c5;strokeColor=#57A2D8;aspect=fixed;', 
					w * 0.62, h * 0.688, '', 'Application', null, null, this.getTagsForStencil(gn, 'application', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'application2;fillColor=#86E83A;strokeColor=#B0F373;aspect=fixed;', 
					w * 0.62, h * 0.53, '', 'Application', null, null, this.getTagsForStencil(gn, 'application', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'application_server;fillColor=#ECECEC;strokeColor=#5E5E5E;aspect=fixed;', 
					w * 1.23, h * 1.24, '', 'EC2 Instance', null, null, this.getTagsForStencil(gn, 'ec2 instance', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'client;aspect=fixed;strokeColor=none;fillColor=#777777;', 
					w * 0.6, h * 1.04, '', 'Client', null, null, this.getTagsForStencil(gn, 'client', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'cloudfront;fillColor=#ECECEC;strokeColor=#5E5E5E;aspect=fixed;', 
					w * 1.038, h * 1.698, '', 'CloudFront', null, null, this.getTagsForStencil(gn, 'cloudfront', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'file;aspect=fixed;strokeColor=#2d6195;fillColor=#ffffff;', 
					w * 0.308, h * 0.706, '', 'Content', null, null, this.getTagsForStencil(gn, 'content', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'customerGateway;fillColor=#ECECEC;strokeColor=#5E5E5E;aspect=fixed;', 
					w * 1.167, h * 1.028, '', 'Customer Gateway', null, null, this.getTagsForStencil(gn, 'customer gateway', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'dataCenter;strokeColor=#5E5E5E;aspect=fixed;', 
					w * 1.23, h * 1.42, '', 'Data Center', null, null, this.getTagsForStencil(gn, 'data center', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'dataServer;strokeColor=#5E5E5E;aspect=fixed;', 
					w * 1.23, h * 1.06, '', 'Data Server', null, null, this.getTagsForStencil(gn, 'data server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'decider;fillColor=#ECECEC;strokeColor=#5E5E5E;aspect=fixed;', 
					w * 0.74, h * 0.5, '', 'Decider', null, null, this.getTagsForStencil(gn, 'decider', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'dynamoDb;fillColor=#ECECEC;strokeColor=#5E5E5E;aspect=fixed;', 
					w * 1.815, h * 2.1, '', 'DynamoDB', null, null, this.getTagsForStencil(gn, 'dynamodb db database', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'ebs;fillColor=#ECECEC;strokeColor=#5E5E5E;aspect=fixed;', 
					w * 0.92, h * 0.6, '', 'EBS', null, null, this.getTagsForStencil(gn, 'ebs', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'ebs2;fillColor=#ECECEC;strokeColor=#5E5E5E;aspect=fixed;', 
					w * 0.92, h * 0.6, '', 'EBS', null, null, this.getTagsForStencil(gn, 'ebs', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'elasticBeanstalk;fillColor=#ECECEC;strokeColor=#5E5E5E;aspect=fixed;', 
					w * 1.82, h * 1.4, '', 'Elastic Beanstalk', null, null, this.getTagsForStencil(gn, 'elastic beanstalk', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'elasticLoadBalancing;fillColor=#ECECEC;strokeColor=#5E5E5E;aspect=fixed;', 
					w * 0.92, h * 0.8817, '', 'Elastic Load Balancing', null, null, this.getTagsForStencil(gn, 'elastic load balancing elb', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'elasticMapReduce;fillColor=#ECECEC;strokeColor=#5E5E5E;aspect=fixed;', 
					w * 1.23, h * 1.33, '', 'Elastic MapReduce', null, null, this.getTagsForStencil(gn, 'elastic mapreduce', dt).join(' ')),
					
		   	this.addEntry(dt + 'elasticache', function()
	   		{
			   	var bg1 = new mxCell('', new mxGeometry(70, 0, 123, 124), s + 'application_server;fillColor=#ECECEC;strokeColor=#5E5E5E;aspect=fixed;');
			   	bg1.vertex = true;
			   	var bg2 = new mxCell('', new mxGeometry(0, 40, 123, 124), s + 'application_server;fillColor=#ECECEC;strokeColor=#5E5E5E;aspect=fixed;');
			   	bg2.vertex = true;
			   	var bg3 = new mxCell('', new mxGeometry(140, 40, 123, 124), s + 'application_server;fillColor=#ECECEC;strokeColor=#5E5E5E;aspect=fixed;');
			   	bg3.vertex = true;
			   	var bg4 = new mxCell('', new mxGeometry(70, 80, 123, 124), s + 'application_server;fillColor=#ECECEC;strokeColor=#5E5E5E;aspect=fixed;');
			   	bg4.vertex = true;
				
		   		return sb.createVertexTemplateFromCells([bg1, bg2, bg3, bg4], 264, 204, 'Elasticache');
			}),
	
			this.createVertexTemplateEntry(s + 'email;aspect=fixed;strokeColor=#292929;', 
					w * 0.43, h * 0.57, '', 'Email', null, null, this.getTagsForStencil(gn, 'email', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'email_service;fillColor=#ECECEC;strokeColor=#5E5E5E;aspect=fixed;', 
					w * 1.51, h * 1.92, '', 'Email Service', null, null, this.getTagsForStencil(gn, 'email service', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'file;aspect=fixed;strokeColor=#292929;', 
					w * 0.308, h * 0.706, '', 'File', null, null, this.getTagsForStencil(gn, 'file', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'glacier;fillColor=#ECECEC;strokeColor=#5E5E5E;aspect=fixed;', 
					w * 1.81, h * 1.92, '', 'Glacier', null, null, this.getTagsForStencil(gn, 'glacier', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'image;strokeColor=none;fillColor=#777777;aspect=fixed;', 
					w * 0.5, h * 0.86, '', 'Image/Video', null, null, this.getTagsForStencil(gn, 'image video', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'internetGateway;fillColor=#ECECEC;strokeColor=#5E5E5E;aspect=fixed;', 
					w * 1.167, h * 1.028, '', 'Internet Gateway', null, null, this.getTagsForStencil(gn, 'internet gateway', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'lambda;fillColor=#ECECEC;strokeColor=#5E5E5E;aspect=fixed;', 
					w * 0.92, h * 1.095, '', 'Lambda', null, null, this.getTagsForStencil(gn, 'lambda', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'mobile_worker;aspect=fixed;strokeColor=none;fillColor=#777777;', 
					w * 0.36, h * 0.90, '', 'Mobile Worker', null, null, this.getTagsForStencil(gn, 'mobile worker', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'oracleDataCenter;fillColor=#ffffff;strokeColor=#5E5E5E;aspect=fixed;', 
					w * 1.23, h * 1.42, '', 'Oracle Data Center', null, null, this.getTagsForStencil(gn, 'oracle data center', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'oracleDbServer;fillColor=#ffffff;strokeColor=#5E5E5E;aspect=fixed;', 
					w * 1.23, h * 1.33, '', 'Oracle Database Server', null, null, this.getTagsForStencil(gn, 'oracle database server db', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'oracleServer;fillColor=#ECECEC;strokeColor=#5E5E5E;aspect=fixed;', 
					w * 1.23, h * 1.42, '', 'Oracle Server', null, null, this.getTagsForStencil(gn, 'oracle server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rds;fillColor=#ECECEC;strokeColor=#5E5E5E;aspect=fixed;', 
					w * 1.23, h * 1.33, '', 'RDS', null, null, this.getTagsForStencil(gn, 'rds', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rdsMaster;fillColor=#ECECEC;strokeColor=#5E5E5E;aspect=fixed;', 
					w * 1.23, h * 1.33, '', 'RDS Master', null, null, this.getTagsForStencil(gn, 'rds master', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rdsSlave;fillColor=#ECECEC;strokeColor=#5E5E5E;aspect=fixed;', 
					w * 1.23, h * 1.33, '', 'RDS Slave', null, null, this.getTagsForStencil(gn, 'rds slave', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'redshift;fillColor=#ECECEC;strokeColor=#5E5E5E;aspect=fixed;', 
					w * 1.50, h * 1.90, '', 'Redshift', null, null, this.getTagsForStencil(gn, 'redshift', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'route53;fillColor=#ECECEC;strokeColor=#5E5E5E;aspect=fixed;', 
					w * 1.1717, h * 1.344, '', 'Route 53', null, null, this.getTagsForStencil(gn, 'route', dt).join(' ')),
			this.createVertexTemplateEntry(s + 's3;fillColor=#ECECEC;strokeColor=#5E5E5E;aspect=fixed;', 
					w * 2.315, h * 2.39, '', 'S3', null, null, this.getTagsForStencil(gn, 's3', dt).join(' ')),
			this.createVertexTemplateEntry(s + 's3Bucket;fillColor=#4286c5;strokeColor=#57A2D8;aspect=fixed;', 
					w * 0.615, h * 0.638, '', 'S3 Bucket', null, null, this.getTagsForStencil(gn, 's3 bucket', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'searchEngine;fillColor=#ECECEC;strokeColor=#5E5E5E;aspect=fixed;', 
					w * 1.80, h * 1.92, '', 'Search Engine', null, null, this.getTagsForStencil(gn, 'search engine', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'secureConnection;fillColor=#000000;strokeColor=#ffffff;aspect=fixed;', 
					w * 0.57, h * 0.34, '', 'Secure Connection', null, null, this.getTagsForStencil(gn, 'secure connection', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'securityTokenService;fillColor=#ECECEC;strokeColor=#5E5E5E;aspect=fixed;', 
					w * 1.80, h * 1.92, '', 'Security Token Service', null, null, this.getTagsForStencil(gn, 'security token service', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'simpleDb;fillColor=#ECECEC;strokeColor=#5E5E5E;aspect=fixed;', 
					w * 1.23, h * 1.33, '', 'SimpleDB', null, null, this.getTagsForStencil(gn, 'simpledb simple db database', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'simpleDb2;fillColor=#ECECEC;strokeColor=#5E5E5E;aspect=fixed;', 
					w * 1.815, h * 1.926, '', 'SimpleDB', null, null, this.getTagsForStencil(gn, 'simpledb simple db database', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'snapshot;fillColor=#4286c5;strokeColor=#57A2D8;aspect=fixed;', 
					w * 0.92, h * 0.6, '', 'Snapshot', null, null, this.getTagsForStencil(gn, 'snapshot', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'instance;fillColor=#ECECEC;strokeColor=#5E5E5E;aspect=fixed;', 
					w * 1.23, h * 0.97, '', 'Spot Instance', null, null, this.getTagsForStencil(gn, 'spot instance', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'sqs;fillColor=#ECECEC;strokeColor=#5E5E5E;aspect=fixed;', 
					w * 1.84, h * 2.1275, '', 'SQS', null, null, this.getTagsForStencil(gn, 'sqs', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'end_user;strokeColor=none;fillColor=#777777;aspect=fixed;', 
					w * 0.49, h * 1.0046, '', 'User', null, null, this.getTagsForStencil(gn, 'user', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'vpcGateway;fillColor=#ECECEC;strokeColor=#5E5E5E;aspect=fixed;', 
					w * 1.167, h * 1.028, '', 'VPC Gateway', null, null, this.getTagsForStencil(gn, 'vpc gateway', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'worker;fillColor=#ECECEC;strokeColor=#5E5E5E;aspect=fixed;', 
					w * 0.74, h * 0.5, '', 'Worker', null, null, this.getTagsForStencil(gn, 'worker', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'workflowService;fillColor=#ECECEC;strokeColor=#5E5E5E;aspect=fixed;', 
					w * 1.822, h * 1.484, '', 'Workflow Service', null, null, this.getTagsForStencil(gn, 'workflow service', dt).join(' ')),

			this.createVertexTemplateEntry(s + 'arrowNE;fillColor=#000000;aspect=fixed;', 
					w * 0.455, h * 0.26, '', 'Arrow NE', null, null, this.getTagsForStencil(gn, 'arrow ne north east northeast', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'arrowSE;fillColor=#000000;aspect=fixed;', 
					w * 0.455, h * 0.26, '', 'Arrow SE', null, null, this.getTagsForStencil(gn, 'arrow ne north east northeast', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'arrowSW;fillColor=#000000;aspect=fixed;', 
					w * 0.455, h * 0.26, '', 'Arrow SW', null, null, this.getTagsForStencil(gn, 'arrow ne north east northeast', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'arrowNW;fillColor=#000000;aspect=fixed;', 
					w * 0.455, h * 0.26, '', 'Arrow NW', null, null, this.getTagsForStencil(gn, 'arrow ne north east northeast', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'arrowlessNE;fillColor=#000000;aspect=fixed;', 
					w * 0.316, h * 0.18, '', 'Arrowless NE', null, null, this.getTagsForStencil(gn, 'arrow ne north east northeast', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'dashedEdgeDouble2;strokeColor=#2D6195;aspect=fixed;', 
					w * 0.316, h * 0.18, '', 'Dashed Edge Double Arrow', null, null, this.getTagsForStencil(gn, 'arrow ne north east northeast', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'dashedArrowlessEdge2;strokeColor=#2D6195;aspect=fixed;', 
					w * 0.316, h * 0.18, '', 'Dashed Arrowless Edge', null, null, this.getTagsForStencil(gn, 'arrow ne north east northeast', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'dashedEdge2;strokeColor=#2D6195;aspect=fixed;', 
					w * 0.316, h * 0.18, '', 'Dashed Edge', null, null, this.getTagsForStencil(gn, 'arrow ne north east northeast', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'flatEdge2;strokeColor=none;fillColor=#F4B934;aspect=fixed;', 
					w * 0.632, h * 0.36, '', 'Flat Edge', null, null, this.getTagsForStencil(gn, 'arrow ne north east northeast', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'flatDoubleEdge2;strokeColor=none;fillColor=#F4B934;aspect=fixed;', 
					w * 2.528, h * 1.44, '', 'Flat Double Edge', null, null, this.getTagsForStencil(gn, 'arrow ne north east northeast', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'arrowhead2;fillColor=#000000;aspect=fixed;', 
					w * 0.19, h * 0.11, '', 'Arrowhead', null, null, this.getTagsForStencil(gn, 'arrowhead', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'edge2;strokeColor=#000000;aspect=fixed;', 
					w * 0.97, h * 1.074, '', 'Edge', null, null, this.getTagsForStencil(gn, 'edge', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'reference2;fillColor=#2d6195;strokeColor=none;aspect=fixed;', 
					w * 0.295, h * 0.195, '', 'Reference', null, null, this.getTagsForStencil(gn, 'reference', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'spot2;fillColor=#F4B934;strokeColor=none;aspect=fixed;', 
					w * 0.62, h * 0.36, '', 'Spot', null, null, this.getTagsForStencil(gn, 'spot', dt).join(' ')),
		 	this.createEdgeTemplateEntry('edgeStyle=isometricEdgeStyle;endArrow=none;html=1;', 50, 100, 'isometric edge', 'Isometric Edge 1'),
		 	this.createEdgeTemplateEntry('edgeStyle=isometricEdgeStyle;endArrow=none;html=1;elbow=vertical;', 50, 100, 'isometric edge', 'Isometric Edge 2')
		]);
		
		this.setCurrentSearchEntryLibrary();
	};
})();
