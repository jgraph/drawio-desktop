(function()
{
	Sidebar.prototype.addIBMPalette = function()
	{
		var d = 60;
		var dt = 'ibm ';
		var sb = this;
		var s = 'image;aspect=fixed;perimeter=ellipsePerimeter;html=1;align=center;shadow=0;dashed=0;fontColor=#4277BB;labelBackgroundColor=default;fontSize=12;spacingTop=3;image=img/lib/ibm/';
		
		// Adds IBM shapes
		this.setCurrentSearchEntryLibrary('ibm', 'ibmAnalytics');
		this.addIBMAnalyticsPalette(d, dt, sb, s);
		this.setCurrentSearchEntryLibrary('ibm', 'ibmApplications');
		this.addIBMApplicationsPalette(d, dt, sb, s);
		this.setCurrentSearchEntryLibrary('ibm', 'ibmBlockchain');
		this.addIBMBlockchainPalette(d, dt, sb, s);
		this.setCurrentSearchEntryLibrary('ibm', 'ibmData');
		this.addIBMDataPalette(d, dt, sb, s);
		this.setCurrentSearchEntryLibrary('ibm', 'ibmDevOps');
		this.addIBMDevOpsPalette(d, dt, sb, s);
		this.setCurrentSearchEntryLibrary('ibm', 'ibmInfrastructure');
		this.addIBMInfrastructurePalette(d, dt, sb, s);
		this.setCurrentSearchEntryLibrary('ibm', 'ibmManagement');
		this.addIBMManagementPalette(d, dt, sb, s);
		this.setCurrentSearchEntryLibrary('ibm', 'ibmMiscellaneous');
		this.addIBMMiscPalette(d, dt, sb, s);
		this.setCurrentSearchEntryLibrary('ibm', 'ibmSecurity');
		this.addIBMSecurityPalette(d, dt, sb, s);
		this.setCurrentSearchEntryLibrary('ibm', 'ibmSocial');
		this.addIBMSocialPalette(d, dt, sb, s);
		this.setCurrentSearchEntryLibrary('ibm', 'ibmUsers');
		this.addIBMUsersPalette(d, dt, sb, s);
		this.setCurrentSearchEntryLibrary('ibm', 'ibmVPC');
		this.addIBMVPCPalette(d, dt, sb, s);
		this.setCurrentSearchEntryLibrary('ibm', 'ibmBoxes');
		this.addIBMBoxesPalette(d, dt, sb, s);
		this.setCurrentSearchEntryLibrary('ibm', 'ibmConnectors');
		this.addIBMConnectorsPalette(d, dt, sb, s);
		this.setCurrentSearchEntryLibrary();
	};

	Sidebar.prototype.addIBMAnalyticsPalette = function(d, dt, sb, s)
	{
		s += 'analytics/';
		var gn = 'analytics ';
		
		var fns = [
			 this.createVertexTemplateEntry(s + 'analytics.svg;',
					 d, d, '', 'Analytics', false, null, this.getTagsForStencil(gn, '', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'data_integration.svg;',
					 d, d, '', 'Data Integration', false, null, this.getTagsForStencil(gn, 'data integration', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'data_repositories.svg;',
					 d, d, '', 'Data Repositories', false, null, this.getTagsForStencil(gn, 'data repositories', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'device_analytics.svg;',
					 d, d, '', 'Device Analytics', false, null, this.getTagsForStencil(gn, 'device analytics', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'streaming_computing.svg;',
					 d, d, '', 'Streaming Computing', false, null, this.getTagsForStencil(gn, 'streaming computing', dt).join(' '))
		];
			   	
   		this.addPalette('ibmAnalytics', 'IBM / Analytics', false, mxUtils.bind(this, function(content)
	    {
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addIBMApplicationsPalette = function(d, dt, sb, s)
	{
		s += 'applications/';
		var gn = 'applications ';
		
		var fns = [
			 this.createVertexTemplateEntry(s + 'actionable_insight.svg;',
					 d, d, '', 'Actionable Insight', false, null, this.getTagsForStencil(gn, 'actionable insight', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'annotate.svg;',
					 d, d, '', 'Annotate', false, null, this.getTagsForStencil(gn, 'annotate', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'api_developer_portal.svg;',
					 d, d, '', 'API Developer Portal', false, null, this.getTagsForStencil(gn, 'api developer portal', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'api_polyglot_runtimes.svg;',
					 d, d, '', 'API Polyglot Runtimes', false, null, this.getTagsForStencil(gn, 'api polyglot runtimes', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'app_server.svg;',
					 d, d, '', 'App Server', false, null, this.getTagsForStencil(gn, 'app server', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'application_logic.svg;',
					 d, d, '', 'Application Logic', false, null, this.getTagsForStencil(gn, 'application logic', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'automation_tools.svg;',
					 d, d, '', 'Automation Tools', false, null, this.getTagsForStencil(gn, 'automation tools', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'enterprise_applications.svg;',
					 d, d, '', 'Enterprise Applications', false, null, this.getTagsForStencil(gn, 'enterprise applications', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'index.svg;',
					 d, d, '', 'Index', false, null, this.getTagsForStencil(gn, 'index', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'iot_application.svg;',
					 d, d, '', 'IoT Application', false, null, this.getTagsForStencil(gn, 'iot application', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'microservice.svg;',
					 d * 1.37, d, '', 'Microservice', false, null, this.getTagsForStencil(gn, 'microservice', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'mobile_app.svg;',
					 d, d, '', 'Mobile App', false, null, this.getTagsForStencil(gn, 'mobile app', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'ontology.svg;',
					 d, d, '', 'Ontology', false, null, this.getTagsForStencil(gn, 'ontology', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'open_source_tools.svg;',
					 d, d, '', 'Open Source Tools', false, null, this.getTagsForStencil(gn, 'open source tools', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'runtime_services.svg;',
					 d, d, '', 'Runtime Services', false, null, this.getTagsForStencil(gn, 'runtime services', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'saas_applications.svg;',
					 d, d, '', 'SaaS Applications', false, null, this.getTagsForStencil(gn, 'saas applications', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'service_broker.svg;',
					 d, d, '', 'Service Broker', false, null, this.getTagsForStencil(gn, 'service broker', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'speech_to_text.svg;',
					 d, d, '', 'Speech to Text', false, null, this.getTagsForStencil(gn, 'speech to text', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'visual_recognition.svg;',
					 d, d, '', 'Visual Recognition', false, null, this.getTagsForStencil(gn, 'visual recognition', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'visualization.svg;',
					 d, d, '', 'Visualization', false, null, this.getTagsForStencil(gn, 'visualization', dt).join(' '))
		];
			   	
   		this.addPalette('ibmApplications', 'IBM / Applications', false, mxUtils.bind(this, function(content)
	    {
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addIBMBlockchainPalette = function(d, dt, sb, s)
	{
		s += 'blockchain/';
		var gn = 'blockchain';
		
		var fns = [
			 this.createVertexTemplateEntry(s + 'blockchain.svg;',
					 d, d, '', 'Blockchain', false, null, this.getTagsForStencil(gn, '', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'blockchain_developer.svg;',
					 d, d, '', 'Blockchain Developer', false, null, this.getTagsForStencil(gn, 'developer', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'certificate_authority.svg;',
					 d, d, '', 'Certificate Authority', false, null, this.getTagsForStencil(gn, 'certificate authority', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'client_application.svg;',
					 d, d, '', 'Client Application', false, null, this.getTagsForStencil(gn, 'client application', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'communication.svg;',
					 d, d, '', 'Communication', false, null, this.getTagsForStencil(gn, 'communication', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'consensus.svg;',
					 d, d, '', 'Consensus', false, null, this.getTagsForStencil(gn, 'communication', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'e_cert.svg;',
					 d, d, '', 'E-Cert', false, null, this.getTagsForStencil(gn, 'ecert e-cert', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'event.svg;',
					 d, d, '', 'Event', false, null, this.getTagsForStencil(gn, 'event', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'event_listener.svg;',
					 d, d, '', 'Event Listener', false, null, this.getTagsForStencil(gn, 'event listener', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'existing_enterprise_systems.svg;',
					 d, d, '', 'Existing Enterprise Systems', false, null, this.getTagsForStencil(gn, 'existing enterprise systems', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'hyperledger_fabric.svg;',
					 d, d, '', 'Hyperledger Fabric', false, null, this.getTagsForStencil(gn, 'hyperledger fabric', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'identity_access_manager.svg;',
					 d, d, '', 'Identity & Access Manager', false, null, this.getTagsForStencil(gn, 'identity access manager', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'key_management.svg;',
					 d, d, '', 'Key Management', false, null, this.getTagsForStencil(gn, 'key management', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'ledger.svg;',
					 d, d, '', 'Ledger', false, null, this.getTagsForStencil(gn, 'ledger', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'membership.svg;',
					 d, d, '', 'Membership', false, null, this.getTagsForStencil(gn, 'membership', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'membership_services_provider_api.svg;',
					 d, d, '', 'Membership Services Provider API', false, null, this.getTagsForStencil(gn, 'membership services provider api', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'message_bus.svg;',
					 d, d, '', 'Message Bus', false, null, this.getTagsForStencil(gn, 'message bus', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'node.svg;',
					 d, d, '', 'Node', false, null, this.getTagsForStencil(gn, 'node', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'services.svg;',
					 d, d, '', 'Services', false, null, this.getTagsForStencil(gn, 'services', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'smart_contract.svg;',
					 d, d, '', 'Smart Contract', false, null, this.getTagsForStencil(gn, 'smart contract', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'transaction_manager.svg;',
					 d, d, '', 'Transaction Manager', false, null, this.getTagsForStencil(gn, 'transaction manager', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'wallet.svg;',
					 d, d, '', 'Wallet', false, null, this.getTagsForStencil(gn, 'wallet', dt).join(' '))
		];
			   	
   		this.addPalette('ibmBlockchain', 'IBM / Blockchain', false, mxUtils.bind(this, function(content)
	    {
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addIBMDataPalette = function(d, dt, sb, s)
	{
		s += 'data/';
		var gn = 'data ';
		
		var fns = [
			 this.createVertexTemplateEntry(s + 'caches.svg;',
					 d, d, '', 'Caches', false, null, this.getTagsForStencil(gn, 'caches', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'conversation_trained_deployed.svg;',
					 d, d, '', 'Conversation (Trained \& Deployed)', false, null, this.getTagsForStencil(gn, 'conversation trained deployed', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'cloud.svg;',
					 d, d, '', 'Cloud', false, null, this.getTagsForStencil(gn, 'cloud', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'data_services.svg;',
					 d, d, '', 'Data Services', false, null, this.getTagsForStencil(gn, 'data services', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'data_sources.svg;',
					 d, d, '', 'Data Sources', false, null, this.getTagsForStencil(gn, 'data sources', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'device_identity_service.svg;',
					 d, d, '', 'Device Identity Service', false, null, this.getTagsForStencil(gn, 'device identity service', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'device_registry.svg;',
					 d, d, '', 'Device Registry', false, null, this.getTagsForStencil(gn, 'device registry', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'enterprise_data.svg;',
					 d, d, '', 'Enterprise Data', false, null, this.getTagsForStencil(gn, 'enterprise data', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'enterprise_user_directory.svg;',
					 d, d, '', 'Enterprise User Directory', false, null, this.getTagsForStencil(gn, 'enterprise user directory', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'file_repository.svg;',
					 d, d, '', 'File Repository', false, null, this.getTagsForStencil(gn, 'file repository', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'ground_truth.svg;',
					 d, d, '', 'Ground Truth', false, null, this.getTagsForStencil(gn, 'ground truth', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'model.svg;',
					 d, d, '', 'Model', false, null, this.getTagsForStencil(gn, 'model', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'tms_data_interface.svg;',
					 d, d, '', 'TMS Data Interface', false, null, this.getTagsForStencil(gn, 'tms data interface', dt).join(' '))
		];
			   	
   		this.addPalette('ibmData', 'IBM / Data', false, mxUtils.bind(this, function(content)
	    {
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addIBMDevOpsPalette = function(d, dt, sb, s)
	{
		s += 'devops/';
		var gn = 'devops ';
		
		var fns = [
			 this.createVertexTemplateEntry(s + 'artifact_management.svg;',
					 d, d, '', 'Artifact Management', false, null, this.getTagsForStencil(gn, 'artifact management', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'build_test.svg;',
					 d, d, '', 'Build \& Test', false, null, this.getTagsForStencil(gn, 'build test', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'code_editor.svg;',
					 d, d, '', 'Code Editor', false, null, this.getTagsForStencil(gn, 'code editor', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'collaborative_development.svg;',
					 d, d, '', 'Collaborative Development', false, null, this.getTagsForStencil(gn, 'collaborative development', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'configuration_management.svg;',
					 d, d, '', 'Configuration Management', false, null, this.getTagsForStencil(gn, 'configuration management', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'continuous_deploy.svg;',
					 d, d, '', 'Continuous Deploy', false, null, this.getTagsForStencil(gn, 'continuous deploy', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'continuous_testing.svg;',
					 d, d, '', 'Continuous Testing', false, null, this.getTagsForStencil(gn, 'continuous testing', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'devops.svg;',
					 d, d, '', 'DevOps', false, null, this.getTagsForStencil(gn, 'devops', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'provision.svg;',
					 d, d, '', 'Provision', false, null, this.getTagsForStencil(gn, 'provision', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'release_management.svg;',
					 d, d, '', 'Release Management', false, null, this.getTagsForStencil(gn, 'release management', dt).join(' '))
		];
			   	
   		this.addPalette('ibmDevOps', 'IBM / DevOps', false, mxUtils.bind(this, function(content)
	    {
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addIBMInfrastructurePalette = function(d, dt, sb, s)
	{
		s += 'infrastructure/';
		var gn = 'infrastructure ';
		
		var fns = [
			 this.createVertexTemplateEntry(s + 'channels.svg;',
					 d, d, '', 'Channels', false, null, this.getTagsForStencil(gn, 'channels', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'cloud_messaging.svg;',
					 d, d, '', 'Cloud Messaging', false, null, this.getTagsForStencil(gn, 'cloud messaging', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'dashboard.svg;',
					 d, d, '', 'Dashboard', false, null, this.getTagsForStencil(gn, 'dashboard', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'diagnostics.svg;',
					 d, d, '', 'Diagnostics', false, null, this.getTagsForStencil(gn, 'diagnostics', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'edge_services.svg;',
					 d, d, '', 'Edge Services', false, null, this.getTagsForStencil(gn, 'edge services', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'enterprise_messaging.svg;',
					 d, d, '', 'Enterprise Messaging', false, null, this.getTagsForStencil(gn, 'enterprise messaging', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'event_feed.svg;',
					 d, d, '', 'Event Feed', false, null, this.getTagsForStencil(gn, 'event feed', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'infrastructure_services.svg;',
					 d, d, '', 'Infrastructure Services', false, null, this.getTagsForStencil(gn, 'infrastructure services', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'interservice_communication.svg;',
					 d, d, '', 'Interservice Communication', false, null, this.getTagsForStencil(gn, 'interservice communication', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'load_balancing_routing.svg;',
					 d, d, '', 'Load Balancing / Routing', false, null, this.getTagsForStencil(gn, 'load balancing routing', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'microservices_mesh.svg;',
					 d, d, '', 'Microservices Mesh', false, null, this.getTagsForStencil(gn, 'microservices mesh', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'mobile_backend.svg;',
					 d, d, '', 'Mobile Backend', false, null, this.getTagsForStencil(gn, 'mobile backend', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'mobile_provider_network.svg;',
					 d, d, '', 'Mobile Provider Network', false, null, this.getTagsForStencil(gn, 'mobile provider network', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'monitoring.svg;',
					 d, d, '', 'Monitoring', false, null, this.getTagsForStencil(gn, 'monitoring', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'monitoring_logging.svg;',
					 d, d, '', 'Monitoring \& Logging', false, null, this.getTagsForStencil(gn, 'monitoring logging', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'peer_services.svg;',
					 d, d, '', 'Peer Services', false, null, this.getTagsForStencil(gn, 'peer services', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'service_discovery_configuration.svg;',
					 d, d, '', 'Service Discovery \& Configuration', false, null, this.getTagsForStencil(gn, 'service discovery configuration', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'transformation_connectivity.svg;',
					 d, d, '', 'Transformation \& Connectivity', false, null, this.getTagsForStencil(gn, 'transformation connectivity', dt).join(' '))
		];
			   	
   		this.addPalette('ibmInfrastructure', 'IBM / Infrastructure', false, mxUtils.bind(this, function(content)
	    {
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addIBMManagementPalette = function(d, dt, sb, s)
	{
		s += 'management/';
		var gn = 'management ';
		
		var fns = [
			 this.createVertexTemplateEntry(s + 'alert_notification.svg;',
					 d, d, '', 'Alert Notification', false, null, this.getTagsForStencil(gn, 'alert notification', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'api_management.svg;',
					 d, d, '', 'API Management', false, null, this.getTagsForStencil(gn, 'api management', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'cloud_management.svg;',
					 d, d, '', 'Cloud Management', false, null, this.getTagsForStencil(gn, 'cloud management', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'cluster_management.svg;',
					 d, d, '', 'Cluster Management', false, null, this.getTagsForStencil(gn, 'cluster management', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'content_management.svg;',
					 d, d, '', 'Content Management', false, null, this.getTagsForStencil(gn, 'content management', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'data_services.svg;',
					 d, d, '', 'Data Services', false, null, this.getTagsForStencil(gn, 'data services', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'device_management.svg;',
					 d, d, '', 'Device Management', false, null, this.getTagsForStencil(gn, 'device management', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'information_governance.svg;',
					 d, d, '', 'Information Governance', false, null, this.getTagsForStencil(gn, 'information governance', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'it_service_management.svg;',
					 d, d, '', 'IT Service Management', false, null, this.getTagsForStencil(gn, 'it service management information technology', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'management.svg;',
					 d, d, '', 'Management', false, null, this.getTagsForStencil(gn, 'management', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'monitoring_metrics.svg;',
					 d, d, '', 'Monitoring \& Metrics', false, null, this.getTagsForStencil(gn, 'monitoring metrics', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'process_management.svg;',
					 d, d, '', 'Process Management', false, null, this.getTagsForStencil(gn, 'process management', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'provider_cloud_portal_service.svg;',
					 d, d, '', 'Provider Cloud Portal Service', false, null, this.getTagsForStencil(gn, 'provider cloud portal service', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'push_notifications.svg;',
					 d, d, '', 'Push Notifications', false, null, this.getTagsForStencil(gn, 'push notifications', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'service_management_tools.svg;',
					 d, d, '', 'Service Management Tools', false, null, this.getTagsForStencil(gn, 'service management tools', dt).join(' '))
		];
			   	
   		this.addPalette('ibmManagement', 'IBM / Management', false, mxUtils.bind(this, function(content)
	    {
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addIBMMiscPalette = function(d, dt, sb, s)
	{
		s += 'miscellaneous/';
		var gn = 'miscellaneous ';
		
		var fns = [
			 this.createVertexTemplateEntry(s + 'bluemix.svg;',
					 d, d, '', 'Bluemix', false, null, this.getTagsForStencil(gn, 'bluemix', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'cloudant.svg;',
					 d, d, '', 'Cloudant', false, null, this.getTagsForStencil(gn, 'cloudant', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'cognitive_services.svg;',
					 d, d, '', 'Cognitive Services', false, null, this.getTagsForStencil(gn, 'cognitive services', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'ibm_containers.svg;',
					 d, d, '', 'IBM Containers', false, null, this.getTagsForStencil(gn, 'ibm containers', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'ibm_public_cloud.svg;',
					 d, d * 0.77, '', 'IBM Public Cloud', false, null, this.getTagsForStencil(gn, 'ibm public cloud', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'iot_cloud.svg;',
					 d, d * 0.77, '', 'IoT Cloud', false, null, this.getTagsForStencil(gn, 'iot cloud internet of things', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'microservices_application.svg;',
					 d, d, '', 'Microservices Application', false, null, this.getTagsForStencil(gn, 'microservices application', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'object_storage.svg;',
					 d, d, '', 'Object Storage', false, null, this.getTagsForStencil(gn, 'object storage', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'offline_capabilities.svg;',
					 d, d, '', 'Offline Capabilities', false, null, this.getTagsForStencil(gn, 'offline capabilities', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'openwhisk.svg;',
					 d, d, '', 'Openwhisk', false, null, this.getTagsForStencil(gn, 'openwhisk', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'peer_cloud.svg;',
					 d, d * 0.77, '', 'Peer Cloud', false, null, this.getTagsForStencil(gn, 'peer cloud', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'retrieve_rank.svg;',
					 d, d, '', 'Retrieve Rank', false, null, this.getTagsForStencil(gn, 'retrieve rank', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'scalable.svg;',
					 d, d, '', 'Scalable', false, null, this.getTagsForStencil(gn, 'scalable', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'text_to_speech.svg;',
					 d, d, '', 'Text to Speech', false, null, this.getTagsForStencil(gn, 'text to speech', dt).join(' '))
		];
			   	
   		this.addPalette('ibmMiscellaneous', 'IBM / Miscellaneous', false, mxUtils.bind(this, function(content)
	    {
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addIBMSecurityPalette = function(d, dt, sb, s)
	{
		s += 'security/';
		var gn = 'security ';
		
		var fns = [
			 this.createVertexTemplateEntry(s + 'api_security.svg;',
					 d, d, '', 'API Security', false, null, this.getTagsForStencil(gn, 'api security', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'blockchain_security_service.svg;',
					 d, d, '', 'Blockchain Security Service', false, null, this.getTagsForStencil(gn, 'blockchain security service', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'data_security.svg;',
					 d, d, '', 'Data Security', false, null, this.getTagsForStencil(gn, 'data security', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'firewall.svg;',
					 d, d, '', 'Firewall', false, null, this.getTagsForStencil(gn, 'firewall', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'gateway.svg;',
					 d, d, '', 'Gateway', false, null, this.getTagsForStencil(gn, 'gateway', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'governance_risk_compliance.svg;',
					 d, d, '', 'Governance, Risk \& Compliance', false, null, this.getTagsForStencil(gn, 'governance risk compliance', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'identity_access_management.svg;',
					 d, d, '', 'Identity \& Access Management', false, null, this.getTagsForStencil(gn, 'identity access management', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'identity_provider.svg;',
					 d, d, '', 'Identity Provider', false, null, this.getTagsForStencil(gn, 'identity provider', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'infrastructure_security.svg;',
					 d, d, '', 'Infrastructure Security', false, null, this.getTagsForStencil(gn, 'infrastructure security', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'physical_security.svg;',
					 d, d, '', 'Physical Security', false, null, this.getTagsForStencil(gn, 'physical security', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'security_monitoring_intelligence.svg;',
					 d, d, '', 'Security Monitoring \& Intelligence', false, null, this.getTagsForStencil(gn, 'security monitoring intelligence', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'security_services.svg;',
					 d, d, '', 'Security Services', false, null, this.getTagsForStencil(gn, 'security services', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'trustend_computing.svg;',
					 d, d, '', 'Trustend Computing', false, null, this.getTagsForStencil(gn, 'trustend computing', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'vpn.svg;',
					 d, d, '', 'VPN', false, null, this.getTagsForStencil(gn, 'vpn virtual private network', dt).join(' '))
		];
			   	
   		this.addPalette('ibmSecurity', 'IBM / Security', false, mxUtils.bind(this, function(content)
	    {
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addIBMSocialPalette = function(d, dt, sb, s)
	{
		s += 'social/';
		var gn = 'social ';
		
		var fns = [
			 this.createVertexTemplateEntry(s + 'communities.svg;',
					 d, d, '', 'Communities', false, null, this.getTagsForStencil(gn, 'communities', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'file_sync.svg;',
					 d, d, '', 'File Sync', false, null, this.getTagsForStencil(gn, 'file sync', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'live_collaboration.svg;',
					 d, d, '', 'Live Collaboration', false, null, this.getTagsForStencil(gn, 'live collaboration', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'messaging.svg;',
					 d, d, '', 'Messaging', false, null, this.getTagsForStencil(gn, 'messaging', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'networking.svg;',
					 d, d, '', 'Networking', false, null, this.getTagsForStencil(gn, 'networking', dt).join(' '))
		];
			   	
   		this.addPalette('ibmSocial', 'IBM / Social', false, mxUtils.bind(this, function(content)
	    {
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addIBMUsersPalette = function(d, dt, sb, s)
	{
		s += 'users/';
		var gn = 'users ';
		
		var fns = [
			 this.createVertexTemplateEntry(s + 'browser.svg;',
					 d, d, '', 'Browser', false, null, this.getTagsForStencil(gn, 'browser', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'device.svg;',
					 d, d, '', 'Device', false, null, this.getTagsForStencil(gn, 'device', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'integrated_digital_experiences.svg;',
					 d, d, '', 'Integrated Digital Experiences', false, null, this.getTagsForStencil(gn, 'integrated digital experiences', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'physical_entity.svg;',
					 d, d, '', 'Physical Entity', false, null, this.getTagsForStencil(gn, 'physical entity', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'sensor.svg;',
					 d, d, '', 'Sensor', false, null, this.getTagsForStencil(gn, 'sensor', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'user.svg;',
					 d, d, '', 'User', false, null, this.getTagsForStencil(gn, 'user', dt).join(' '))
		];
			   	
   		this.addPalette('ibmUsers', 'IBM / Users', false, mxUtils.bind(this, function(content)
	    {
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addIBMVPCPalette = function(d, dt, sb, s)
	{
		s += 'vpc/';
		var gn = 'vpc virtual private cloud ';
		
		var fns = [
			 this.createVertexTemplateEntry(s + 'Instance.svg;',
					 d, d, '', 'Instance', false, null, this.getTagsForStencil(gn, 'instance', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'LoadBalancer.svg;',
					 d, d, '', 'Load Balancer', false, null, this.getTagsForStencil(gn, 'load balancer', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'BlockStorage.svg;',
					 d, d, '', 'Block Storage', false, null, this.getTagsForStencil(gn, 'block storage', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'FloatingIP.svg;',
					 d, d, '', 'Floating IP', false, null, this.getTagsForStencil(gn, 'floating ip internet protocol', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'PublicGateway.svg;',
					 d, d, '', 'Public Gateway', false, null, this.getTagsForStencil(gn, 'public gateway', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'ObjectStorage.svg;',
					 d, d, '', 'Object Storage', false, null, this.getTagsForStencil(gn, 'object storage', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'VPNConnection.svg;',
					 d, d, '', 'VPN Connection', false, null, this.getTagsForStencil(gn, 'connection', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'VPNGateway.svg;',
					 d, d, '', 'VPN Gateway', false, null, this.getTagsForStencil(gn, 'gateway', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'DirectLink.svg;',
					 d, d, '', 'Direct Link', false, null, this.getTagsForStencil(gn, 'direct link', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'InternetServices2.svg;',
					 d, d, '', 'Internet Services', false, null, this.getTagsForStencil(gn, 'internet services', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'LoadBalancerPool.svg;',
					 d, d, '', 'Load Balancer Pool', false, null, this.getTagsForStencil(gn, 'load balancer pool', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'LoadBalancerListener.svg;',
					 d, d, '', 'Load Balancer Listener', false, null, this.getTagsForStencil(gn, 'load balancer listener', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'Rules.svg;',
					 d, d, '', 'Rules', false, null, this.getTagsForStencil(gn, 'load balancer listener', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'ImageService.svg;',
					 d, d, '', 'Image Service', false, null, this.getTagsForStencil(gn, 'image service', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'Key.svg;',
					 d, d, '', 'Key', false, null, this.getTagsForStencil(gn, 'key', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'VPNPolicy.svg;',
					 d, d, '', 'VPN Policy', false, null, this.getTagsForStencil(gn, 'policy', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'Router.svg;',
					 d, d, '', 'Router', false, null, this.getTagsForStencil(gn, 'router', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'Bridge.svg;',
					 d, d, '', 'Bridge', false, null, this.getTagsForStencil(gn, 'bridge', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'CloudServices.svg;',
					 d, d, '', 'Cloud Services', false, null, this.getTagsForStencil(gn, 'cloud services', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'Internet.svg;',
					 d, d, '', 'Internet', false, null, this.getTagsForStencil(gn, 'internet', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'Enterprise.svg;',
					 d, d, '', 'Data Center', false, null, this.getTagsForStencil(gn, 'dat acenter', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'Enterprise2.svg;',
					 d, d * 0.8, '', 'Enterprise', false, null, this.getTagsForStencil(gn, 'enterprise', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'PowerInstance.svg;',
					 d, d, '', 'Power Instance', false, null, this.getTagsForStencil(gn, 'power instance', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'TransitGateway.svg;',
					 d, d, '', 'Transit Gateway', false, null, this.getTagsForStencil(gn, 'transit gateway', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'BareMetalServer.svg;',
					 d, d, '', 'Bare Metal Server', false, null, this.getTagsForStencil(gn, 'bare metal server', dt).join(' '))
		];
			   	
   		this.addPalette('ibmVPC', 'IBM / VPC', false, mxUtils.bind(this, function(content)
	    {
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addIBMBoxesPalette = function(d, dt, sb, s)
	{
		s += 'boxes/';
		var gn = 'boxes box ';
		
		var fns = [
			 this.createVertexTemplateEntry(
					 'shape=mxgraph.ibm.box;prType=cloud;fontStyle=0;verticalAlign=top;align=left;spacingLeft=32;spacingTop=4;fillColor=none;rounded=0;whiteSpace=wrap;html=1;strokeColor=#4376BB;strokeWidth=3;dashed=0;container=1;spacing=-4;collapsible=0;expand=0;recursiveResize=0;',
					 200, 200, 'IBM Cloud', 'IBM Cloud', true, null, this.getTagsForStencil(gn, 'ibm cloud', dt).join(' ')),
			 this.createVertexTemplateEntry(
					 'shape=mxgraph.ibm.box;prType=vpc;fontStyle=0;verticalAlign=top;align=left;spacingLeft=32;spacingTop=4;fillColor=none;rounded=0;whiteSpace=wrap;html=1;strokeColor=#4376BB;strokeWidth=2;dashed=0;container=1;spacing=-4;collapsible=0;expand=0;recursiveResize=0;',
					 200, 200, 'VPC', 'VPC', true, null, this.getTagsForStencil(gn, 'vpc virtual private cloud', dt).join(' ')),
			 this.createVertexTemplateEntry(
					 'shape=mxgraph.ibm.box;prType=region;fontStyle=0;verticalAlign=top;align=left;spacingLeft=32;spacingTop=4;fillColor=none;rounded=0;whiteSpace=wrap;html=1;strokeColor=#919191;strokeWidth=2;dashed=0;container=1;spacing=-4;collapsible=0;expand=0;recursiveResize=0;',
					 200, 200, 'Region', 'Region', true, null, this.getTagsForStencil(gn, 'region', dt).join(' ')),
			 this.createVertexTemplateEntry(
					 'shape=mxgraph.ibm.box;prType=zone;fontStyle=0;verticalAlign=top;align=left;spacingLeft=32;spacingTop=4;fillColor=#E0E0E0;rounded=0;whiteSpace=wrap;html=1;strokeColor=#919191;strokeWidth=1;dashed=0;container=1;spacing=-4;collapsible=0;expand=0;recursiveResize=0;',
					 200, 200, 'Zone', 'Zone', true, null, this.getTagsForStencil(gn, 'zone', dt).join(' ')),
			 this.createVertexTemplateEntry(
					 'shape=mxgraph.ibm.box;prType=subnet;fontStyle=0;verticalAlign=top;align=left;spacingLeft=32;spacingTop=4;fillColor=#E6F0E2;rounded=0;whiteSpace=wrap;html=1;strokeColor=#00882B;strokeWidth=1;dashed=0;container=1;spacing=-4;collapsible=0;expand=0;recursiveResize=0;',
					 200, 200, 'Subnet:ACL', 'Subnet:ACL', true, null, this.getTagsForStencil(gn, 'subnet acl', dt).join(' ')),
			 this.createVertexTemplateEntry(
					 'fontStyle=0;verticalAlign=top;align=center;spacingTop=-2;fillColor=none;rounded=0;whiteSpace=wrap;html=1;strokeColor=#FF0000;strokeWidth=2;dashed=1;container=1;collapsible=0;expand=0;recursiveResize=0;',
					 200, 200, 'Security Group', 'Security Group', true, null, this.getTagsForStencil(gn, 'security group', dt).join(' ')),
			 this.createVertexTemplateEntry(
					 'fontStyle=0;verticalAlign=top;align=center;spacingTop=-2;fillColor=none;rounded=0;whiteSpace=wrap;html=1;strokeColor=#00882B;strokeWidth=2;dashed=1;container=1;collapsible=0;expand=0;recursiveResize=0;',
					 200, 200, 'Instance Group', 'Instance Group', true, null, this.getTagsForStencil(gn, 'instance group', dt).join(' ')),
			 this.createVertexTemplateEntry(
					 'fontStyle=0;verticalAlign=top;align=center;spacingTop=-2;fillColor=none;rounded=0;whiteSpace=wrap;html=1;strokeColor=#919191;strokeWidth=2;dashed=1;container=1;collapsible=0;expand=0;recursiveResize=0;',
					 200, 200, 'Resource Group', 'Resource Group', true, null, this.getTagsForStencil(gn, 'resource group', dt).join(' ')),
			 this.createVertexTemplateEntry(
					 'shape=mxgraph.ibm.box;prType=public;fontStyle=0;verticalAlign=top;align=left;spacingLeft=32;spacingTop=4;fillColor=none;rounded=0;whiteSpace=wrap;html=1;strokeColor=#4376BB;strokeWidth=3;dashed=0;container=1;spacing=-4;collapsible=0;expand=0;recursiveResize=0;',
					 200, 200, 'Public Network', 'Public Network', true, null, this.getTagsForStencil(gn, 'public network', dt).join(' ')),
			 this.createVertexTemplateEntry(
					 'shape=mxgraph.ibm.box;prType=enterprise;fontStyle=0;verticalAlign=top;align=left;spacingLeft=32;spacingTop=4;fillColor=none;rounded=0;whiteSpace=wrap;html=1;strokeColor=#4376BB;strokeWidth=3;dashed=0;container=1;spacing=-4;collapsible=0;expand=0;recursiveResize=0;',
					 200, 200, 'Enterprise Network', 'Enterprise Network', true, null, this.getTagsForStencil(gn, 'enterprise network', dt).join(' ')),
			 this.createVertexTemplateEntry(
					 'shape=mxgraph.ibm.box;prType=classic;fontStyle=0;verticalAlign=top;align=left;spacingLeft=32;spacingTop=4;fillColor=none;rounded=0;whiteSpace=wrap;html=1;strokeColor=#4376BB;strokeWidth=2;dashed=0;container=1;spacing=-4;collapsible=0;expand=0;recursiveResize=0;',
					 200, 200, 'Classic Infrastructure', 'Classic Infrastructure', true, null, this.getTagsForStencil(gn, 'classic infrastructure', dt).join(' ')),
			 this.createVertexTemplateEntry(
					 'fontStyle=0;verticalAlign=top;align=center;spacingTop=-2;fillColor=none;rounded=0;whiteSpace=wrap;html=1;strokeColor=#4376BB;strokeWidth=1;dashed=0;container=1;collapsible=0;expand=0;recursiveResize=0;',
					 200, 200, 'Cloud Services', 'Cloud Services', true, null, this.getTagsForStencil(gn, 'cloud services', dt).join(' '))
		];
			   	
   		this.addPalette('ibmBoxes', 'IBM / Boxes', false, mxUtils.bind(this, function(content)
	    {
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addIBMConnectorsPalette = function(d, dt, sb, s)
	{
		var gn = 'connectors ';
		
		var fns = [
		 	 this.createEdgeTemplateEntry('html=1;labelBackgroundColor=#ffffff;jettySize=auto;orthogonalLoop=1;strokeWidth=1;fontSize=14;endArrow=none;endFill=0;', 
					 d, d, '', 'Connector', null, dt + 'connector'),
		 	 this.createEdgeTemplateEntry('html=1;labelBackgroundColor=#ffffff;endArrow=classic;endFill=1;endSize=6;jettySize=auto;orthogonalLoop=1;strokeWidth=1;fontSize=14;', 
					 d, d, '', 'Connector (Single Arrow)', null, dt + 'connector single arrow'),
		 	 this.createEdgeTemplateEntry('html=1;labelBackgroundColor=#ffffff;startArrow=classic;startFill=1;startSize=6;endArrow=classic;endFill=1;endSize=6;jettySize=auto;orthogonalLoop=1;strokeWidth=1;fontSize=14;', 
					 d, d, '', 'Connector (Double Arrow)', null, dt + 'connector double arrow'),
		 	 this.createEdgeTemplateEntry('html=1;labelBackgroundColor=#ffffff;endArrow=none;endFill=0;jettySize=auto;orthogonalLoop=1;strokeWidth=1;dashed=1;fontSize=14;', 
					 d, d, '', 'Dashed Connector', null, dt + 'dashed connector'),
		 	 this.createEdgeTemplateEntry('html=1;labelBackgroundColor=#ffffff;startArrow=none;startFill=0;startSize=6;endArrow=classic;endFill=1;endSize=6;jettySize=auto;orthogonalLoop=1;strokeWidth=1;dashed=1;fontSize=14;', 
					 d, d, '', 'Dashed Connector (Single Arrow)', null, dt + 'dashed connector single arrow'),
		 	 this.createEdgeTemplateEntry('html=1;labelBackgroundColor=#ffffff;startArrow=classic;startFill=1;startSize=6;endArrow=classic;endFill=1;endSize=6;jettySize=auto;orthogonalLoop=1;strokeWidth=1;dashed=1;fontSize=14;', 
					 d, d, '', 'Dashed Connector (Double Arrow)', null, dt + 'dashed connector double arrow'),
		 	 this.createEdgeTemplateEntry('edgeStyle=elbowEdgeStyle;rounded=0;elbow=vertical;html=1;labelBackgroundColor=#ffffff;jettySize=auto;orthogonalLoop=1;strokeWidth=1;fontSize=14;endArrow=none;endFill=0;', 
					 d, d, '', 'Elbow Connector', null, dt + 'elbow connector'),
		 	 this.createEdgeTemplateEntry('edgeStyle=elbowEdgeStyle;rounded=0;elbow=vertical;html=1;labelBackgroundColor=#ffffff;endArrow=classic;endFill=1;endSize=6;jettySize=auto;orthogonalLoop=1;strokeWidth=1;fontSize=14;', 
					 d, d, '', 'Elbow Connector (Single Arrow)', null, dt + 'elbow connector single arrow'),
		 	 this.createEdgeTemplateEntry('edgeStyle=elbowEdgeStyle;rounded=0;elbow=vertical;html=1;labelBackgroundColor=#ffffff;startArrow=classic;startFill=1;startSize=6;endArrow=classic;endFill=1;endSize=6;jettySize=auto;orthogonalLoop=1;strokeWidth=1;fontSize=14;', 
		 			 d, d, '', 'Elbow Connector (Double Arrow)', null, dt + 'elbow connector double arrow')
		];
			   	
   		this.addPalette('ibmConnectors', 'IBM / Connectors', false, mxUtils.bind(this, function(content)
	    {
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
})();
