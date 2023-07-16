(function()
{
	// Adds Azure shapes
	Sidebar.prototype.addAzure2Palette = function()
	{
		var gn = 'mxgraph.azure2';
		var r = 400;
		var sb = this;
		var s = 'image;aspect=fixed;html=1;points=[];align=center;fontSize=12;image=img/lib/azure2/';
		
		this.setCurrentSearchEntryLibrary('azure2', 'azure2AI Machine Learning');
		this.addAzure2AIMachineLearningPalette(gn, r, sb, s + 'ai_machine_learning/');
		this.setCurrentSearchEntryLibrary('azure2', 'azure2Analytics');
		this.addAzure2AnalyticsPalette(gn, r, sb, s + 'analytics/');
		this.setCurrentSearchEntryLibrary('azure2', 'azure2App Services');
		this.addAzure2AppServicesPalette(gn, r, sb, s + 'app_services/');
		this.setCurrentSearchEntryLibrary('azure2', 'azure2Azure Ecosystem');
		this.addAzure2EcosystemPalette(gn, r, sb, s + 'azure_ecosystem/');
		this.setCurrentSearchEntryLibrary('azure2', 'azure2Azure Stack');
		this.addAzure2AzureStackPalette(gn, r, sb, s + 'azure_stack/');
		this.setCurrentSearchEntryLibrary('azure2', 'azure2Azure VMware Solution');
		this.addAzure2AzureVMwareSolutionPalette(gn, r, sb, s + 'azure_vmware_solution/');
		this.setCurrentSearchEntryLibrary('azure2', 'azure2Blockchain');
		this.addAzure2BlockchainPalette(gn, r, sb, s + 'blockchain/');
		this.setCurrentSearchEntryLibrary('azure2', 'azure2Compute');
		this.addAzure2ComputePalette(gn, r, sb, s + 'compute/');
		this.setCurrentSearchEntryLibrary('azure2', 'azure2Containers');
		this.addAzure2ContainersPalette(gn, r, sb, s + 'containers/');
		this.setCurrentSearchEntryLibrary('azure2', 'azure2CXP');
		this.addAzure2CXPPalette(gn, r, sb, s + 'cxp/');
		this.setCurrentSearchEntryLibrary('azure2', 'azure2Databases');
		this.addAzure2DatabasesPalette(gn, r, sb, s + 'databases/');
		this.setCurrentSearchEntryLibrary('azure2', 'azure2DevOps');
		this.addAzure2DevOpsPalette(gn, r, sb, s + 'devops/');
		this.setCurrentSearchEntryLibrary('azure2', 'azure2General');
		this.addAzure2GeneralPalette(gn, r, sb, s + 'general/');
		this.setCurrentSearchEntryLibrary('azure2', 'azure2Identity');
		this.addAzure2IdentityPalette(gn, r, sb, s + 'identity/');
		this.setCurrentSearchEntryLibrary('azure2', 'azure2Integration');
		this.addAzure2IntegrationPalette(gn, r, sb, s + 'integration/');
		this.setCurrentSearchEntryLibrary('azure2', 'azure2Internet of Things');
		this.addAzure2InternetOfThingsPalette(gn, r, sb, s + 'internet_of_things/');
		this.setCurrentSearchEntryLibrary('azure2', 'azure2Intune');
		this.addAzure2IntunePalette(gn, r, sb, s + 'intune/');
		this.setCurrentSearchEntryLibrary('azure2', 'azure2IoT');
		this.addAzure2IOTPalette(gn, r, sb, s + 'iot/');
		this.setCurrentSearchEntryLibrary('azure2', 'azure2Management Governance');
		this.addAzure2ManagementGovernancePalette(gn, r, sb, s + 'management_governance/');
		this.setCurrentSearchEntryLibrary('azure2', 'azure2Menu');
		this.addAzure2MenuPalette(gn, r, sb, s + 'menu/');
		this.setCurrentSearchEntryLibrary('azure2', 'azure2Migrate');
		this.addAzure2MigratePalette(gn, r, sb, s + 'migrate/');
		this.setCurrentSearchEntryLibrary('azure2', 'azure2Mixed Reality');
		this.addAzure2MixedRealityPalette(gn, r, sb, s + 'mixed_reality/');
		this.setCurrentSearchEntryLibrary('azure2', 'azure2Monitor');
		this.addAzure2MonitorPalette(gn, r, sb, s + 'monitor/');
		this.setCurrentSearchEntryLibrary('azure2', 'azure2Networking');
		this.addAzure2NetworkingPalette(gn, r, sb, s + 'networking/');
		this.setCurrentSearchEntryLibrary('azure2', 'azure2Other');
		this.addAzure2OtherPalette(gn, r, sb, s + 'other/');
		this.setCurrentSearchEntryLibrary('azure2', 'azure2Preview');
		this.addAzure2PreviewPalette(gn, r, sb, s + 'preview/');
		this.setCurrentSearchEntryLibrary('azure2', 'azure2Security');
		this.addAzure2SecurityPalette(gn, r, sb, s + 'security/');
		this.setCurrentSearchEntryLibrary('azure2', 'azure2Storage');
		this.addAzure2StoragePalette(gn, r, sb, s + 'storage/');
		this.setCurrentSearchEntryLibrary('azure2', 'azure2Web');
		this.addAzure2WebPalette(gn, r, sb, s + 'web/');
		this.setCurrentSearchEntryLibrary();
	};

	Sidebar.prototype.addAzure2AIMachineLearningPalette = function(gn, r, sb, s)
	{
		var dt = 'azure ai machine learning artificial intelligence ';
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'Azure_Applied_AI.svg;',
					r * 0.17, r * 0.13, '', 'Azure Applied AI', null, null, this.getTagsForStencil(gn, 'applied', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_Experimentation_Studio.svg;',
					r * 0.17, r * 0.14, '', 'Azure Experimentation Studio', null, null, this.getTagsForStencil(gn, 'experimentation studio', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_Object_Understanding.svg;',
					r * 0.17, r * 0.17, '', 'Azure Object Understanding', null, null, this.getTagsForStencil(gn, 'object understanding', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Batch_AI.svg;',
					r * 0.12, r * 0.17, '', 'Batch AI', null, null, this.getTagsForStencil(gn, 'batch', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Bot_Services.svg;',
					r * 0.17, r * 0.17, '', 'Bot Services', null, null, this.getTagsForStencil(gn, 'bot services', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Cognitive_Services.svg;',
					r * 0.17, r * 0.12, '', 'Cognitive Services', null, null, this.getTagsForStencil(gn, 'cognitive services', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Genomics.svg;',
					r * 0.09, r * 0.17, '', 'Genomics', null, null, this.getTagsForStencil(gn, 'genomics', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Language_Services.svg;',
					r * 0.17, r * 0.17, '', 'Language Services', null, null, this.getTagsForStencil(gn, 'language services', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Machine_Learning.svg;',
					r * 0.16, r * 0.17, '', 'Machine Learning', null, null, this.getTagsForStencil(gn, '', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Machine_Learning_Studio_Classic_Web_Services.svg;',
					r * 0.17, r * 0.17, '', 'Machine Learning Studio - Classic Web Services', null, null, this.getTagsForStencil(gn, 'studio classic web services', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Machine_Learning_Studio_Web_Service_Plans.svg;',
					r * 0.17, r * 0.17, '', 'Machine Learning Studio - Web Service Plans', null, null, this.getTagsForStencil(gn, 'studio web service plans', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Machine_Learning_Studio_Workspaces.svg;',
					r * 0.17, r * 0.17, '', 'Machine Learning Studio - Workspaces', null, null, this.getTagsForStencil(gn, 'studio workspaces', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Translator_Text.svg;',
					r * 0.17, r * 0.17, '', 'Translator Text', null, null, this.getTagsForStencil(gn, 'translator text', dt).join(' '))
		];
			
		this.addPalette('azure2AI Machine Learning', 'Azure / AI and Machine Learning', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};

	Sidebar.prototype.addAzure2AnalyticsPalette = function(gn, r, sb, s)
	{
		var dt = 'azure analytics ';
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'Analysis_Services.svg;',
					r * 0.1575, r * 0.12, '', 'Analysis Services', null, null, this.getTagsForStencil(gn, 'analysis services', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_Databricks.svg;',
					r * 0.157, r * 0.17, '', 'Azure Databricks', null, null, this.getTagsForStencil(gn, 'azure databricks', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_Synapse_Analytics.svg;',
					r * 0.15, r * 0.1725, '', 'Azure Synapse Analytics', null, null, this.getTagsForStencil(gn, 'synapse analytics', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_Workbooks.svg;',
					r * 0.17, r * 0.17, '', 'Azure Workbooks', null, null, this.getTagsForStencil(gn, 'workbooks', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Data_Lake_Analytics.svg;',
					r * 0.17, r * 0.17, '', 'Data Lake Analytics', null, null, this.getTagsForStencil(gn, 'data lake analytics', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Data_Lake_Store_Gen1.svg;',
					r * 0.16, r * 0.13, '', 'Data Lake Store Gen1', null, null, this.getTagsForStencil(gn, 'data lake store gen1', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Endpoint_Analytics.svg;',
					r * 0.17, r * 0.17, '', 'Endpoint Analytics', null, null, this.getTagsForStencil(gn, 'endpoint analytics', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Event_Hub_Clusters.svg;',
					r * 0.16, r * 0.13, '', 'Event Hub Clusters', null, null, this.getTagsForStencil(gn, 'event hub clusters', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Event_Hubs.svg;',
					r * 0.1675, r * 0.15, '', 'Event Hubs', null, null, this.getTagsForStencil(gn, 'event hubs', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'HD_Insight_Clusters.svg;',
					r * 0.1575, r * 0.155, '', 'HD Insight Clusters', null, null, this.getTagsForStencil(gn, 'hd insight clusters', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Log_Analytics_Workspaces.svg;',
					r * 0.16, r * 0.16, '', 'Log Analytics Workspaces', null, null, this.getTagsForStencil(gn, 'log analytics workspaces', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Stream_Analytics_Jobs.svg;',
					r * 0.17, r * 0.145, '', 'Stream Analytics Jobs', null, null, this.getTagsForStencil(gn, 'Stream_Analytics_Jobs', dt).join(' '))
		];
			
		this.addPalette('azure2Analytics', 'Azure / Analytics', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};

	Sidebar.prototype.addAzure2AppServicesPalette = function(gn, r, sb, s)
	{
		var dt = 'azure app services ';
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'API_Management_Services.svg;',
					r * 0.1625, r * 0.15, '', 'API Management Services', null, null, this.getTagsForStencil(gn, 'api application programming interface management services', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'App_Service_Certificates.svg;',
					r * 0.175, r * 0.16, '', 'App Service Certificates', null, null, this.getTagsForStencil(gn, 'app service certificates', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'App_Service_Domains.svg;',
					r * 0.1625, r * 0.13, '', 'App Service Domains', null, null, this.getTagsForStencil(gn, 'app service domains', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'App_Service_Environments.svg;',
					r * 0.16, r * 0.16, '', 'App Service Environments', null, null, this.getTagsForStencil(gn, 'app service environments', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'App_Service_Plans.svg;',
					r * 0.16, r * 0.16, '', 'App Service Plans', null, null, this.getTagsForStencil(gn, 'app service plans', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'App_Services.svg;',
					r * 0.16, r * 0.16, '', 'App Services', null, null, this.getTagsForStencil(gn, 'app services', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'CDN_Profiles.svg;',
					r * 0.17, r * 0.10, '', 'CDN Profiles', null, null, this.getTagsForStencil(gn, 'cdn profiles', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Notification_Hubs.svg;',
					r * 0.1675, r * 0.14, '', 'Notification Hubs', null, null, this.getTagsForStencil(gn, 'notification hubs', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Search_Services.svg;',
					r * 0.18, r * 0.13, '', 'Search Services', null, null, this.getTagsForStencil(gn, 'search services', dt).join(' '))
		];
			
		this.addPalette('azure2App Services', 'Azure / App Services', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};

	Sidebar.prototype.addAzure2EcosystemPalette = function(gn, r, sb, s)
	{
		var dt = 'azure ecosystem ';
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'Applens.svg;',
					r * 0.17, r * 0.17, '', 'Applens', null, null, this.getTagsForStencil(gn, 'applens', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_Hybrid_Center.svg;',
					r * 0.17, r * 0.12, '', 'Azure Hybrid Center', null, null, this.getTagsForStencil(gn, 'hybrid center', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Collaborative_Service.svg;',
					r * 0.17, r * 0.167, '', 'Collaborative Service', null, null, this.getTagsForStencil(gn, 'collaborative service', dt).join(' '))
		];
			
		this.addPalette('azure2Azure Ecosystem', 'Azure / Ecosystem', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};

	Sidebar.prototype.addAzure2AzureStackPalette = function(gn, r, sb, s)
	{
		var dt = 'azure stack ';
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'Azure_Stack.svg;',
					r * 0.155, r * 0.16, '', 'Azure Stack', null, null, this.getTagsForStencil(gn, 'azure stack', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Capacity.svg;',
					r * 0.1575, r * 0.17, '', 'Capacity', null, null, this.getTagsForStencil(gn, 'capacity', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Infrastructure_Backup.svg;',
					r * 0.15, r * 0.1725, '', 'Infrastructure Backup', null, null, this.getTagsForStencil(gn, 'infrastructure backup', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Multi_Tenancy.svg;',
					r * 0.17, r * 0.1625, '', 'Multi Tenancy', null, null, this.getTagsForStencil(gn, 'multi tenancy', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Offers.svg;',
					r * 0.1625, r * 0.16, '', 'Offers', null, null, this.getTagsForStencil(gn, 'offers', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Plans.svg;',
					r * 0.13, r * 0.16, '', 'Plans', null, null, this.getTagsForStencil(gn, 'plans', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Updates.svg;',
					r * 0.17, r * 0.1675, '', 'Updates', null, null, this.getTagsForStencil(gn, 'updates', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'User_Subscriptions.svg;',
					r * 0.17, r * 0.165, '', 'User Subscriptions', null, null, this.getTagsForStencil(gn, 'user subscriptions', dt).join(' '))
		];
			
		this.addPalette('azure2Azure Stack', 'Azure / Azure Stack', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};

	Sidebar.prototype.addAzure2AzureVMwareSolutionPalette = function(gn, r, sb, s)
	{
		var dt = 'azure vmware solution ';
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'AVS.svg;',
					r * 0.175, r * 0.14, '', 'AVS', null, null, this.getTagsForStencil(gn, 'avs', dt).join(' '))
		];
			
		this.addPalette('azure2Azure VMware Solution', 'Azure / VMware Solution', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};

	Sidebar.prototype.addAzure2BlockchainPalette = function(gn, r, sb, s)
	{
		var dt = 'azure blockchain ';
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'ABS_Member.svg;',
					r * 0.14, r * 0.1625, '', 'ABS Member', null, null, this.getTagsForStencil(gn, 'abs member', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_Blockchain_Service.svg;',
					r * 0.17, r * 0.17, '', 'Azure Blockchain Service', null, null, this.getTagsForStencil(gn, 'blockchain service', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_Token_Service.svg;',
					r * 0.1475, r * 0.17, '', 'Azure Token Service', null, null, this.getTagsForStencil(gn, 'token service', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Blockchain_Applications.svg;',
					r * 0.121, r * 0.17, '', 'Blockchain Applications', null, null, this.getTagsForStencil(gn, 'blockchain applications', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Consortium.svg;',
					r * 0.17, r * 0.17, '', 'Consortium', null, null, this.getTagsForStencil(gn, 'consortium', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Outbound_Connection.svg;',
					r * 0.1775, r * 0.16, '', 'Outbound Connection', null, null, this.getTagsForStencil(gn, 'outbound connection', dt).join(' '))
		];
			
		this.addPalette('azure2Blockchain', 'Azure / Blockchain', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};

	Sidebar.prototype.addAzure2ComputePalette = function(gn, r, sb, s)
	{
		var dt = 'azure compute ';
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'App_Services.svg;',
					r * 0.16, r * 0.16, '', 'App Services', null, null, this.getTagsForStencil(gn, 'app services', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Automanaged_VM.svg;',
					r * 0.17, r * 0.155, '', 'Automanaged VM', null, null, this.getTagsForStencil(gn, 'automanaged vm virtual machine', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Availability_Sets.svg;',
					r * 0.17, r * 0.17, '', 'Availability Sets', null, null, this.getTagsForStencil(gn, 'availability sets', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_Compute_Galleries.svg;',
					r * 0.17, r * 0.17, '', 'Azure Compute Galleries', null, null, this.getTagsForStencil(gn, 'compute galleries', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Batch_Accounts.svg;',
					r * 0.17, r * 0.16, '', 'Batch Accounts', null, null, this.getTagsForStencil(gn, 'batch accounts', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Cloud_Services_Classic.svg;',
					r * 0.18, r * 0.13, '', 'Cloud Services (Classic)', null, null, this.getTagsForStencil(gn, 'cloud services classic', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Container_Instances.svg;',
					r * 0.16, r * 0.17, '', 'Container Instances', null, null, this.getTagsForStencil(gn, 'container instances', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Container_Services_Deprecated.svg;',
					r * 0.17, r * 0.15, '', 'Container Services Deprecated', null, null, this.getTagsForStencil(gn, 'container services deprecated', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Disk_Encryption_Sets.svg;',
					r * 0.17, r * 0.17, '', 'Disk Encryption Sets', null, null, this.getTagsForStencil(gn, 'disk encryption sets', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Disks.svg;',
					r * 0.1425, r * 0.14, '', 'Disks', null, null, this.getTagsForStencil(gn, 'disks', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Disks_Classic.svg;',
					r * 0.1425, r * 0.14, '', 'Disks (Classic)', null, null, this.getTagsForStencil(gn, 'disks classic', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Disks_Snapshots.svg;',
					r * 0.17, r * 0.1775, '', 'Disks Snapshots', null, null, this.getTagsForStencil(gn, 'disks snapshots', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Function_Apps.svg;',
					r * 0.17, r * 0.15, '', 'Function Apps', null, null, this.getTagsForStencil(gn, 'function apps', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Host_Groups.svg;',
					r * 0.155, r * 0.17, '', 'Host Groups', null, null, this.getTagsForStencil(gn, 'host groups', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Hosts.svg;',
					r * 0.143, r * 0.17, '', 'Hosts', null, null, this.getTagsForStencil(gn, 'hosts', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Image_Definitions.svg;',
					r * 0.165, r * 0.16, '', 'Image Definitions', null, null, this.getTagsForStencil(gn, 'image definitions', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Image_Templates.svg;',
					r * 0.17, r * 0.15, '', 'Image Templates', null, null, this.getTagsForStencil(gn, 'image templates', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Image_Versions.svg;',
					r * 0.1675, r * 0.16, '', 'Image Versions', null, null, this.getTagsForStencil(gn, 'image versions', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Images.svg;',
					r * 0.1725, r * 0.16, '', 'Images', null, null, this.getTagsForStencil(gn, 'images', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Kubernetes_Services.svg;',
					r * 0.17, r * 0.15, '', 'Kubernetes Services', null, null, this.getTagsForStencil(gn, 'kubernetes services', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Maintenance_Configuration.svg;',
					r * 0.17, r * 0.16, '', 'Maintenance Configuration', null, null, this.getTagsForStencil(gn, 'maintenance configuration', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Managed_Service_Fabric.svg;',
					r * 0.17, r * 0.165, '', 'Managed Service Fabric', null, null, this.getTagsForStencil(gn, 'managed service fabric', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Mesh_Applications.svg;',
					r * 0.17, r * 0.17, '', 'Mesh Applications', null, null, this.getTagsForStencil(gn, 'mesh applications', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Metrics_Advisor.svg;',
					r * 0.137, r * 0.17, '', 'Metrics Advisor', null, null, this.getTagsForStencil(gn, 'metrics advisor', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'OS_Images_Classic.svg;',
					r * 0.1725, r * 0.16, '', 'OS Images (Classic)', null, null, this.getTagsForStencil(gn, 'os images classic', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Restore_Points.svg;',
					r * 0.17, r * 0.167, '', 'Restore Points', null, null, this.getTagsForStencil(gn, 'restore points', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Restore_Points_Collections.svg;',
					r * 0.17, r * 0.14, '', 'Restore Points Collections', null, null, this.getTagsForStencil(gn, 'restore points collections', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Service_Fabric_Clusters.svg;',
					r * 0.1675, r * 0.16, '', 'Service Fabric Clusters', null, null, this.getTagsForStencil(gn, 'service fabric clusters', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Shared_Image_Galleries.svg;',
					r * 0.16, r * 0.16, '', 'Shared Image Galleries', null, null, this.getTagsForStencil(gn, 'shared image galleries', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_Spring_Cloud.svg;',
					r * 0.17, r * 0.17, '', 'Spring Cloud', null, null, this.getTagsForStencil(gn, 'azure spring cloud', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Virtual_Machine.svg;',
					r * 0.1725, r * 0.16, '', 'Virtual Machine', null, null, this.getTagsForStencil(gn, 'virtual machine', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Virtual_Machines_Classic.svg;',
					r * 0.1725, r * 0.16, '', 'Virtual Machines (Classic)', null, null, this.getTagsForStencil(gn, 'virtual machines classic', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'VM_Images_Classic.svg;',
					r * 0.1725, r * 0.16, '', 'VM Images (Classic)', null, null, this.getTagsForStencil(gn, 'vm images classic', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'VM_Scale_Sets.svg;',
					r * 0.17, r * 0.17, '', 'VM Scale Sets', null, null, this.getTagsForStencil(gn, 'vm scale sets', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Workspaces.svg;',
					r * 0.1625, r * 0.14, '', 'Workspaces', null, null, this.getTagsForStencil(gn, 'workspaces', dt).join(' '))
		];
			
		this.addPalette('azure2Compute', 'Azure / Compute', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};

	Sidebar.prototype.addAzure2ContainersPalette = function(gn, r, sb, s)
	{
		var dt = 'azure containers ';
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'App_Services.svg;',
					r * 0.16, r * 0.16, '', 'App Services', null, null, this.getTagsForStencil(gn, 'app services', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Batch_Accounts.svg;',
					r * 0.17, r * 0.16, '', 'Batch Accounts', null, null, this.getTagsForStencil(gn, 'batch accounts', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Container_Instances.svg;',
					r * 0.16, r * 0.1725, '', 'Container Instances', null, null, this.getTagsForStencil(gn, 'container instances', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Container_Registries.svg;',
					r * 0.17, r * 0.1525, '', 'Container Registries', null, null, this.getTagsForStencil(gn, 'container registries', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Kubernetes_Services.svg;',
					r * 0.17, r * 0.15, '', 'Kubernetes Services', null, null, this.getTagsForStencil(gn, 'kubernetes services', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Service_Fabric_Clusters.svg;',
					r * 0.1675, r * 0.16, '', 'Service Fabric Clusters', null, null, this.getTagsForStencil(gn, 'service fabric clusters', dt).join(' '))
		];
			
		this.addPalette('azure2Containers', 'Azure / Containers', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};

	Sidebar.prototype.addAzure2CXPPalette = function(gn, r, sb, s)
	{
		var dt = 'azure cxp ';
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'Elixir.svg;',
					r * 0.1225, r * 0.17, '', 'Elixir', null, null, this.getTagsForStencil(gn, 'elixir', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Elixir_Purple.svg;',
					r * 0.1225, r * 0.17, '', 'Elixir Purple', null, null, this.getTagsForStencil(gn, 'elixir purple', dt).join(' '))
		];
			
		this.addPalette('azure2CXP', 'Azure / CXP', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};

	Sidebar.prototype.addAzure2DatabasesPalette = function(gn, r, sb, s)
	{
		var dt = 'azure database db ';
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'Azure_Cosmos_DB.svg;',
					r * 0.16, r * 0.16, '', 'Azure Cosmos DB', null, null, this.getTagsForStencil(gn, 'cosmos', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_Data_Explorer_Clusters.svg;',
					r * 0.17, r * 0.17, '', 'Azure Data Explorer Clusters', null, null, this.getTagsForStencil(gn, 'data explorer clusters', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_Database_MariaDB_Server.svg;',
					r * 0.12, r * 0.16, '', 'Azure Database MariaDB Server', null, null, this.getTagsForStencil(gn, 'mariadb server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_Database_Migration_Services.svg;',
					r * 0.16, r * 0.1725, '', 'Azure Database Migration Services', null, null, this.getTagsForStencil(gn, 'migration services', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_Database_MySQL_Server.svg;',
					r * 0.12, r * 0.16, '', 'Azure Database MySQL Server', null, null, this.getTagsForStencil(gn, 'mysql my sql server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_Database_PostgreSQL_Server.svg;',
					r * 0.12, r * 0.16, '', 'Azure Database PostgreSQL Server', null, null, this.getTagsForStencil(gn, 'postgresql sql server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_Database_PostgreSQL_Server_Group.svg;',
					r * 0.15, r * 0.17, '', 'Azure Database PostgreSQL Server Group', null, null, this.getTagsForStencil(gn, 'postgresql sql server group', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_Purview_Accounts.svg;',
					r * 0.17, r * 0.105, '', 'Azure Purview Accounts', null, null, this.getTagsForStencil(gn, 'azure purview accounts', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_SQL.svg;',
					r * 0.16, r * 0.115, '', 'Azure SQL', null, null, this.getTagsForStencil(gn, 'sql', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_SQL_Edge.svg;',
					r * 0.17, r * 0.17, '', 'Azure SQL Edge', null, null, this.getTagsForStencil(gn, 'sql edge', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_SQL_Server_Stretch_Databases.svg;',
					r * 0.16, r * 0.1625, '', 'Azure SQL Server Stretch Databases', null, null, this.getTagsForStencil(gn, 'sql server stretch', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_SQL_VM.svg;',
					r * 0.16, r * 0.15, '', 'Azure SQL VM', null, null, this.getTagsForStencil(gn, 'sql vm virtual machine', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_Synapse_Analytics.svg;',
					r * 0.15, r * 0.1725, '', 'Azure Synapse Analytics', null, null, this.getTagsForStencil(gn, 'synapse analytics', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Cache_Redis.svg;',
					r * 0.16, r * 0.13, '', 'Cache Redis', null, null, this.getTagsForStencil(gn, 'cache redis', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Data_Factory.svg;',
					r * 0.17, r * 0.17, '', 'Data Factory', null, null, this.getTagsForStencil(gn, 'data factory', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Elastic_Job_Agents.svg;',
					r * 0.16, r * 0.16, '', 'Elastic Job Agents', null, null, this.getTagsForStencil(gn, 'elastic job agents', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Instance_Pools.svg;',
					r * 0.1625, r * 0.16, '', 'Instance Pools', null, null, this.getTagsForStencil(gn, 'instance pools', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Managed_Database.svg;',
					r * 0.17, r * 0.16, '', 'Managed Database', null, null, this.getTagsForStencil(gn, 'managed', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'SQL_Data_Warehouses.svg;',
					r * 0.16, r * 0.1625, '', 'SQL Data Warehouses', null, null, this.getTagsForStencil(gn, 'sql data warehouses', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'SQL_Database.svg;',
					r * 0.12, r * 0.16, '', 'SQL Database', null, null, this.getTagsForStencil(gn, 'sql', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'SQL_Elastic_Pools.svg;',
					r * 0.17, r * 0.17, '', 'SQL Elastic Pools', null, null, this.getTagsForStencil(gn, 'sql elastic pools', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'SQL_Managed_Instance.svg;',
					r * 0.1625, r * 0.16, '', 'SQL Managed Instance', null, null, this.getTagsForStencil(gn, 'sql managed instance', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'SQL_Server.svg;',
					r * 0.17, r * 0.17, '', 'SQL Server', null, null, this.getTagsForStencil(gn, 'sql server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'SQL_Server_Registries.svg;',
					r * 0.17, r * 0.155, '', 'SQL Server Registries', null, null, this.getTagsForStencil(gn, 'sql server registries', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'SSIS_Lift_And_Shift_IR.svg;',
					r * 0.155, r * 0.17, '', 'SSIS Lift and Shift IR', null, null, this.getTagsForStencil(gn, 'ssis lift and shift ir', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Virtual_Clusters.svg;',
					r * 0.165, r * 0.16, '', 'Virtual Clusters', null, null, this.getTagsForStencil(gn, 'virtual clusters', dt).join(' '))
		];
			
		this.addPalette('azure2Databases', 'Azure / Databases', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};

	Sidebar.prototype.addAzure2DevOpsPalette = function(gn, r, sb, s)
	{
		var dt = 'azure devops ';
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'Application_Insights.svg;',
					r * 0.11, r * 0.1575, '', 'Application Insights', null, null, this.getTagsForStencil(gn, 'application insights', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_DevOps.svg;',
					r * 0.16, r * 0.16, '', 'Azure DevOps', null, null, this.getTagsForStencil(gn, 'devops', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'CloudTest.svg;',
					r * 0.147, r * 0.17, '', 'CloudTest', null, null, this.getTagsForStencil(gn, 'cloudtest cloud test', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'DevTest_Labs.svg;',
					r * 0.165, r * 0.16, '', 'DevTest Labs', null, null, this.getTagsForStencil(gn, 'devtest labs', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Lab_Services.svg;',
					r * 0.165, r * 0.16, '', 'Lab Services', null, null, this.getTagsForStencil(gn, 'lab services', dt).join(' '))
		];
			
		this.addPalette('azure2DevOps', 'Azure / DevOps', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};

	Sidebar.prototype.addAzure2GeneralPalette = function(gn, r, sb, s)
	{
		var dt = 'azure general ';
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'All_Resources.svg;',
					r * 0.16, r * 0.16, '', 'All Resources', null, null, this.getTagsForStencil(gn, 'all resources', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Backlog.svg;',
					r * 0.17, r * 0.15, '', 'Backlog', null, null, this.getTagsForStencil(gn, 'backlog', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Biz_Talk.svg;',
					r * 0.1725, r * 0.16, '', 'Biz Talk', null, null, this.getTagsForStencil(gn, 'biz talk', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Blob_Block.svg;',
					r * 0.1625, r * 0.13, '', 'Blob Block', null, null, this.getTagsForStencil(gn, 'blob block', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Blob_Page.svg;',
					r * 0.1625, r * 0.13, '', 'Blob Page', null, null, this.getTagsForStencil(gn, 'blob page', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Branch.svg;',
					r * 0.18, r * 0.18, '', 'Branch', null, null, this.getTagsForStencil(gn, 'branch', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Browser.svg;',
					r * 0.1625, r * 0.13, '', 'Browser', null, null, this.getTagsForStencil(gn, 'browser', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Bug.svg;',
					r * 0.1475, r * 0.16, '', 'Bug', null, null, this.getTagsForStencil(gn, 'bug', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Builds.svg;',
					r * 0.16, r * 0.16, '', 'Builds', null, null, this.getTagsForStencil(gn, 'builds', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Cache.svg;',
					r * 0.16, r * 0.16, '', 'Cache', null, null, this.getTagsForStencil(gn, 'cache', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Code.svg;',
					r * 0.16, r * 0.13, '', 'Code', null, null, this.getTagsForStencil(gn, 'code', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Commit.svg;',
					r * 0.18, r * 0.17, '', 'Commit', null, null, this.getTagsForStencil(gn, 'commit', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Controls.svg;',
					r * 0.14, r * 0.1725, '', 'Controls', null, null, this.getTagsForStencil(gn, 'controls', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Controls_Horizontal.svg;',
					r * 0.1725, r * 0.14, '', 'Controls Horizontal', null, null, this.getTagsForStencil(gn, 'controls horizontal', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Cost_Alerts.svg;',
					r * 0.1675, r * 0.14, '', 'Cost Alerts', null, null, this.getTagsForStencil(gn, 'cost alerts', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Cost_Analysis.svg;',
					r * 0.15, r * 0.175, '', 'Cost Analysis', null, null, this.getTagsForStencil(gn, 'cost analysis', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Cost_Budgets.svg;',
					r * 0.1675, r * 0.17, '', 'Cost Budgets', null, null, this.getTagsForStencil(gn, 'cost budgets', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Cost_Management.svg;',
					r * 0.1675, r * 0.15, '', 'Cost Management', null, null, this.getTagsForStencil(gn, 'cost management', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Cost_Management_and_Billing.svg;',
					r * 0.17, r * 0.17, '', 'Cost Management and Billing', null, null, this.getTagsForStencil(gn, 'cost management and billing', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Counter.svg;',
					r * 0.16, r * 0.13, '', 'Counter', null, null, this.getTagsForStencil(gn, 'counter', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Cubes.svg;',
					r * 0.1675, r * 0.17, '', 'Cubes', null, null, this.getTagsForStencil(gn, 'cubes', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Dashboard.svg;',
					r * 0.17, r * 0.12, '', 'Dashboard', null, null, this.getTagsForStencil(gn, 'dashboard', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Dev_Console.svg;',
					r * 0.1625, r * 0.13, '', 'Dev Console', null, null, this.getTagsForStencil(gn, 'dev console', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Download.svg;',
					r * 0.16, r * 0.1675, '', 'Download', null, null, this.getTagsForStencil(gn, 'download', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Error.svg;',
					r * 0.1775, r * 0.17, '', 'Error', null, null, this.getTagsForStencil(gn, 'error', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Extensions.svg;',
					r * 0.1625, r * 0.16, '', 'Extensions', null, null, this.getTagsForStencil(gn, 'extensions', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'File.svg;',
					r * 0.14, r * 0.1725, '', 'File', null, null, this.getTagsForStencil(gn, 'file', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Files.svg;',
					r * 0.16, r * 0.175, '', 'Files', null, null, this.getTagsForStencil(gn, 'files', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Folder_Blank.svg;',
					r * 0.1725, r * 0.14, '', 'Folder Blank', null, null, this.getTagsForStencil(gn, 'folder blank', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Folder_Website.svg;',
					r * 0.17, r * 0.14, '', 'Folder Website', null, null, this.getTagsForStencil(gn, 'folder website', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Free_Services.svg;',
					r * 0.17, r * 0.1575, '', 'Free Services', null, null, this.getTagsForStencil(gn, 'free services', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'FTP.svg;',
					r * 0.15, r * 0.12, '', 'FTP', null, null, this.getTagsForStencil(gn, 'ftp file transfer protocol', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Gear.svg;',
					r * 0.16, r * 0.16, '', 'Gear', null, null, this.getTagsForStencil(gn, 'gear', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Globe.svg;',
					r * 0.14, r * 0.165, '', 'Globe', null, null, this.getTagsForStencil(gn, 'globe', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Globe_Error.svg;',
					r * 0.14, r * 0.165, '', 'Globe Error', null, null, this.getTagsForStencil(gn, 'globe error', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Globe_Success.svg;',
					r * 0.14, r * 0.165, '', 'Globe Success', null, null, this.getTagsForStencil(gn, 'globe success', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Globe_Warning.svg;',
					r * 0.14, r * 0.165, '', 'Globe Warning', null, null, this.getTagsForStencil(gn, 'globe warning', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Guide.svg;',
					r * 0.17, r * 0.17, '', 'Guide', null, null, this.getTagsForStencil(gn, 'guide', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Heart.svg;',
					r * 0.16, r * 0.15, '', 'Heart', null, null, this.getTagsForStencil(gn, 'heart', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Help_and_Support.svg;',
					r * 0.14, r * 0.1725, '', 'Help and Support', null, null, this.getTagsForStencil(gn, 'help support', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Image.svg;',
					r * 0.16, r * 0.11, '', 'Image', null, null, this.getTagsForStencil(gn, 'image', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Information.svg;',
					r * 0.16, r * 0.16, '', 'Information', null, null, this.getTagsForStencil(gn, 'information', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Input_Output.svg;',
					r * 0.16, r * 0.1375, '', 'Input Output', null, null, this.getTagsForStencil(gn, 'input output', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Journey_Hub.svg;',
					r * 0.15, r * 0.1575, '', 'Journey Hub', null, null, this.getTagsForStencil(gn, 'journey hub', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Launch_Portal.svg;',
					r * 0.17, r * 0.1675, '', 'Launch Portal', null, null, this.getTagsForStencil(gn, 'launch portal', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Learn.svg;',
					r * 0.12, r * 0.175, '', 'Learn', null, null, this.getTagsForStencil(gn, 'learn', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Load_Test.svg;',
					r * 0.17, r * 0.165, '', 'Load Test', null, null, this.getTagsForStencil(gn, 'load test', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Location.svg;',
					r * 0.10, r * 0.1775, '', 'Location', null, null, this.getTagsForStencil(gn, 'location', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Log_Streaming.svg;',
					r * 0.14, r * 0.1675, '', 'Log Streaming', null, null, this.getTagsForStencil(gn, 'log streaming', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Management_Groups.svg;',
					r * 0.165, r * 0.16, '', 'Management Groups', null, null, this.getTagsForStencil(gn, 'management groups', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Management_Portal.svg;',
					r * 0.15, r * 0.12, '', 'Management Portal', null, null, this.getTagsForStencil(gn, 'management portal', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Marketplace.svg;',
					r * 0.14, r * 0.16, '', 'Marketplace', null, null, this.getTagsForStencil(gn, 'marketplace', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Media.svg;',
					r * 0.17, r * 0.17, '', 'Media', null, null, this.getTagsForStencil(gn, 'media', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Media_File.svg;',
					r * 0.13, r * 0.16, '', 'Media File', null, null, this.getTagsForStencil(gn, 'media file', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Mobile.svg;',
					r * 0.1, r * 0.1675, '', 'Mobile', null, null, this.getTagsForStencil(gn, 'mobile', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Mobile_Engagement.svg;',
					r * 0.1, r * 0.1675, '', 'Mobile Engagement', null, null, this.getTagsForStencil(gn, 'mobile engagement', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Module.svg;',
					r * 0.16, r * 0.16, '', 'Module', null, null, this.getTagsForStencil(gn, 'module', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Power.svg;',
					r * 0.11, r * 0.17, '', 'Power', null, null, this.getTagsForStencil(gn, 'power', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Power_Up.svg;',
					r * 0.17, r * 0.17, '', 'Power Up', null, null, this.getTagsForStencil(gn, 'power up', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Powershell.svg;',
					r * 0.1625, r * 0.13, '', 'Powershell', null, null, this.getTagsForStencil(gn, 'powershell', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Preview.svg;',
					r * 0.11, r * 0.16, '', 'Preview', null, null, this.getTagsForStencil(gn, 'preview', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Preview_Features.svg;',
					r * 0.17, r * 0.17, '', 'Preview Features', null, null, this.getTagsForStencil(gn, 'preview features', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Process_Explorer.svg;',
					r * 0.175, r * 0.17, '', 'Process Explorer', null, null, this.getTagsForStencil(gn, 'process explorer', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Production_Ready_Database.svg;',
					r * 0.12, r * 0.16, '', 'Production Ready Database', null, null, this.getTagsForStencil(gn, 'production ready database', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Quickstart_Center.svg;',
					r * 0.17, r * 0.17, '', 'Quickstart Center', null, null, this.getTagsForStencil(gn, 'quickstart center', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Recent.svg;',
					r * 0.17, r * 0.17, '', 'Recent', null, null, this.getTagsForStencil(gn, 'recent', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Reservations.svg;',
					r * 0.17, r * 0.17, '', 'Reservations', null, null, this.getTagsForStencil(gn, 'reservations', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Resource_Explorer.svg;',
					r * 0.17, r * 0.14, '', 'Resource Explorer', null, null, this.getTagsForStencil(gn, 'resource exporer', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Resource_Group_List.svg;',
					r * 0.17, r * 0.1675, '', 'Resource Group List', null, null, this.getTagsForStencil(gn, 'resource group list', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Resource_Groups.svg;',
					r * 0.17, r * 0.16, '', 'Resource Groups', null, null, this.getTagsForStencil(gn, 'resource groups', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Resource_Linked.svg;',
					r * 0.18, r * 0.18, '', 'Resource Linked', null, null, this.getTagsForStencil(gn, 'resource linked', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Scale.svg;',
					r * 0.15, r * 0.15, '', 'Scale', null, null, this.getTagsForStencil(gn, 'scale', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Scheduler.svg;',
					r * 0.17, r * 0.17, '', 'Scheduler', null, null, this.getTagsForStencil(gn, 'scheduler', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Search.svg;',
					r * 0.16, r * 0.1625, '', 'Search', null, null, this.getTagsForStencil(gn, 'search', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Search_Grid.svg;',
					r * 0.17, r * 0.1675, '', 'Search Grid', null, null, this.getTagsForStencil(gn, 'search grid', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Server_Farm.svg;',
					r * 0.16, r * 0.16, '', 'Server Farm', null, null, this.getTagsForStencil(gn, 'server farm', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Service_Bus.svg;',
					r * 0.175, r * 0.15, '', 'Service Bus', null, null, this.getTagsForStencil(gn, 'service bus', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Service_Health.svg;',
					r * 0.17, r * 0.16, '', 'Service Health', null, null, this.getTagsForStencil(gn, 'service health', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'SSD.svg;',
					r * 0.165, r * 0.15, '', 'SSD', null, null, this.getTagsForStencil(gn, 'ssd solid state drive', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Storage_Azure_Files.svg;',
					r * 0.16, r * 0.13, '', 'Storage Azure Files', null, null, this.getTagsForStencil(gn, 'storage files', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Storage_Container.svg;',
					r * 0.16, r * 0.13, '', 'Storage Container', null, null, this.getTagsForStencil(gn, 'storage container', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Storage_Queue.svg;',
					r * 0.16, r * 0.13, '', 'Storage Queue', null, null, this.getTagsForStencil(gn, 'storage queue', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Subscriptions.svg;',
					r * 0.11, r * 0.1775, '', 'Subscriptions', null, null, this.getTagsForStencil(gn, 'subscriptions', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Table.svg;',
					r * 0.16, r * 0.13, '', 'Table', null, null, this.getTagsForStencil(gn, 'table', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Tag.svg;',
					r * 0.17, r * 0.167, '', 'Tag', null, null, this.getTagsForStencil(gn, 'tag', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Tags.svg;',
					r * 0.15, r * 0.1625, '', 'Tags', null, null, this.getTagsForStencil(gn, 'tags', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Templates.svg;',
					r * 0.14, r * 0.17, '', 'Templates', null, null, this.getTagsForStencil(gn, 'templates', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'TFS_VC_Repository.svg;',
					r * 0.17, r * 0.17, '', 'TFS VC Repository', null, null, this.getTagsForStencil(gn, 'tfs vc repository', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Toolbox.svg;',
					r * 0.16, r * 0.14, '', 'Toolbox', null, null, this.getTagsForStencil(gn, 'toolbox', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Troubleshoot.svg;',
					r * 0.165, r * 0.17, '', 'Troubleshoot', null, null, this.getTagsForStencil(gn, 'troubleshoot', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Versions.svg;',
					r * 0.155, r * 0.15, '', 'Versions', null, null, this.getTagsForStencil(gn, 'versions', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Web_Slots.svg;',
					r * 0.145, r * 0.16, '', 'Web Slots', null, null, this.getTagsForStencil(gn, 'web slots', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Web_Test.svg;',
					r * 0.18, r * 0.18, '', 'Web Test', null, null, this.getTagsForStencil(gn, 'web test', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Website_Power.svg;',
					r * 0.17, r * 0.17, '', 'Website Power', null, null, this.getTagsForStencil(gn, 'website power', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Website_Staging.svg;',
					r * 0.16, r * 0.175, '', 'Website Staging', null, null, this.getTagsForStencil(gn, 'website staging', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Workbooks.svg;',
					r * 0.15, r * 0.1625, '', 'Workbooks', null, null, this.getTagsForStencil(gn, 'workbooks', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Workflow.svg;',
					r * 0.17, r * 0.175, '', 'Workflow', null, null, this.getTagsForStencil(gn, 'workflow', dt).join(' '))
		];
			
		this.addPalette('azure2General', 'Azure / General', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};

	Sidebar.prototype.addAzure2IdentityPalette = function(gn, r, sb, s)
	{
		var dt = 'azure identity ';
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'AAD_Licenses.svg;',
					r * 0.165, r * 0.17, '', 'AAD Licenses', null, null, this.getTagsForStencil(gn, 'aad licenses', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Active_Directory_Connect_Health.svg;',
					r * 0.1725, r * 0.16, '', 'Active Directory Connect Health', null, null, this.getTagsForStencil(gn, 'active directory connect health', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'App_Registrations.svg;',
					r * 0.1575, r * 0.16, '', 'App Registrations', null, null, this.getTagsForStencil(gn, 'app registrations', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_Active_Directory.svg;',
					r * 0.175, r * 0.16, '', 'Azure Active Directory', null, null, this.getTagsForStencil(gn, 'active directory', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_AD_B2C.svg;',
					r * 0.1725, r * 0.16, '', 'Azure AD B2C', null, null, this.getTagsForStencil(gn, 'ad b2c', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_AD_Domain_Services.svg;',
					r * 0.175, r * 0.16, '', 'Azure AD Domain Services', null, null, this.getTagsForStencil(gn, 'ad domain services', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_AD_Identity_Protection.svg;',
					r * 0.17, r * 0.155, '', 'Azure AD Identity Protection', null, null, this.getTagsForStencil(gn, 'ad identity protection', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_AD_Privilege_Identity_Management.svg;',
					r * 0.17, r * 0.17, '', 'Azure AD Privilege Identity Management', null, null, this.getTagsForStencil(gn, 'ad privilege identity management', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_Information_Protection.svg;',
					r * 0.128, r * 0.17, '', 'Azure Information Protection', null, null, this.getTagsForStencil(gn, 'information protection', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Custom_Azure_AD_Roles.svg;',
					r * 0.17, r * 0.17, '', 'Custom Azure AD Roles', null, null, this.getTagsForStencil(gn, 'custom azure ad roles', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Enterprise_Applications.svg;',
					r * 0.16, r * 0.16, '', 'Enterprise Applications', null, null, this.getTagsForStencil(gn, 'enterprise applications', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Groups.svg;',
					r * 0.17, r * 0.14, '', 'Groups', null, null, this.getTagsForStencil(gn, 'groups', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Identity_Governance.svg;',
					r * 0.16, r * 0.16, '', 'Identity Governance', null, null, this.getTagsForStencil(gn, 'identity governance', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Managed_Identities.svg;',
					r * 0.17, r * 0.165, '', 'Managed Identities', null, null, this.getTagsForStencil(gn, 'managed identities', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'PIM.svg;',
					r * 0.15, r * 0.17, '', 'PIM', null, null, this.getTagsForStencil(gn, 'pim privileged identity management', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Tenant_Properties.svg;',
					r * 0.17, r * 0.12, '', 'Tenant Properties', null, null, this.getTagsForStencil(gn, 'tenant properties', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Users.svg;',
					r * 0.16, r * 0.175, '', 'Users', null, null, this.getTagsForStencil(gn, 'users', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Verifiable_Credentials.svg;',
					r * 0.17, r * 0.17, '', 'Verifiable Credentials', null, null, this.getTagsForStencil(gn, 'verifiable credentials', dt).join(' '))
		];
			
		this.addPalette('azure2Identity', 'Azure / Identity', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};

	Sidebar.prototype.addAzure2IntegrationPalette = function(gn, r, sb, s)
	{
		var dt = 'azure integration ';
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'Azure_API_for_FHIR.svg;',
					r * 0.17, r * 0.163, '', 'Azure API for FHIR', null, null, this.getTagsForStencil(gn, 'api application programming interface for fhir', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'App_Configuration.svg;',
					r * 0.16, r * 0.17, '', 'App Configuration', null, null, this.getTagsForStencil(gn, 'app configuration application', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'API_Management_Services.svg;',
					r * 0.1625, r * 0.15, '', 'API Management Services', null, null, this.getTagsForStencil(gn, 'api application programming interface management services', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_Data_Catalog.svg;',
					r * 0.15, r * 0.1675, '', 'Azure Data Catalog', null, null, this.getTagsForStencil(gn, 'data catalog', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Event_Grid_Domains.svg;',
					r * 0.1675, r * 0.15, '', 'Event Grid Domains', null, null, this.getTagsForStencil(gn, 'event grid domains', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Event_Grid_Subscriptions.svg;',
					r * 0.1675, r * 0.15, '', 'Event Grid Subscriptions', null, null, this.getTagsForStencil(gn, 'event grid subscriptions', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Event_Grid_Topics.svg;',
					r * 0.1675, r * 0.15, '', 'Event Grid Topics', null, null, this.getTagsForStencil(gn, 'event grid topics', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Integration_Accounts.svg;',
					r * 0.16, r * 0.16, '', 'Integration Accounts', null, null, this.getTagsForStencil(gn, 'integration accounts', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Integration_Service_Environments.svg;',
					r * 0.17, r * 0.17, '', 'Integration Service Environments', null, null, this.getTagsForStencil(gn, 'integration service environments', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Logic_Apps.svg;',
					r * 0.1675, r * 0.13, '', 'Logic Apps', null, null, this.getTagsForStencil(gn, 'logic apps', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Logic_Apps_Custom_Connector.svg;',
					r * 0.17, r * 0.17, '', 'Logic Apps Custom Connector', null, null, this.getTagsForStencil(gn, 'logic apps custom connector', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Partner_Namespace.svg;',
					r * 0.17, r * 0.152, '', 'Partner Namespace', null, null, this.getTagsForStencil(gn, 'partner namespace', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Partner_Registration.svg;',
					r * 0.17, r * 0.158, '', 'Partner Registration', null, null, this.getTagsForStencil(gn, 'partner registration', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Partner_Topic.svg;',
					r * 0.17, r * 0.1525, '', 'Partner Topic', null, null, this.getTagsForStencil(gn, 'partner topic', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Relays.svg;',
					r * 0.1675, r * 0.15, '', 'Relays', null, null, this.getTagsForStencil(gn, 'relays', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'SendGrid_Accounts.svg;',
					r * 0.167, r * 0.17, '', 'SendGrid Accounts', null, null, this.getTagsForStencil(gn, 'sendgrid send grid accounts', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Service_Bus.svg;',
					r * 0.17, r * 0.15, '', 'Service Bus', null, null, this.getTagsForStencil(gn, 'service bus', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Software_as_a_Service.svg;',
					r * 0.16, r * 0.1325, '', 'Software as a Service', null, null, this.getTagsForStencil(gn, 'software service', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'SQL_Data_Warehouses.svg;',
					r * 0.16, r * 0.1625, '', 'SQL Data Warehouses', null, null, this.getTagsForStencil(gn, 'sql data warehouses', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'System_Topic.svg;',
					r * 0.17, r * 0.15, '', 'System Topic', null, null, this.getTagsForStencil(gn, 'system topic', dt).join(' '))
		];
			
		this.addPalette('azure2Integration', 'Azure / Integration', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};

	Sidebar.prototype.addAzure2InternetOfThingsPalette = function(gn, r, sb, s)
	{
		var dt = 'azure iot internet of things ';
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'Digital_Twins.svg;',
					r * 0.17, r * 0.1725, '', 'Digital Twins', null, null, this.getTagsForStencil(gn, 'digital twins', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Logic_Apps.svg;',
					r * 0.17, r * 0.17, '', 'Logic Apps', null, null, this.getTagsForStencil(gn, 'logic apps', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Time_Series_Insights_Access_Policies.svg;',
					r * 0.105, r * 0.17, '', 'Time Series Insights Access Policies', null, null, this.getTagsForStencil(gn, 'time series insights access policies', dt).join(' '))
		];
			
		this.addPalette('azure2Internet of Things', 'Azure / Internet of Things', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};

	Sidebar.prototype.addAzure2IntunePalette = function(gn, r, sb, s)
	{
		var dt = 'azure intune ';
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'Azure_AD_Roles_and_Administrators.svg;',
					r * 0.16, r * 0.16, '', 'Azure AD Roles and Administrators', null, null, this.getTagsForStencil(gn, 'ad roles administrators', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Client_Apps.svg;',
					r * 0.17, r * 0.17, '', 'Client Apps', null, null, this.getTagsForStencil(gn, 'client apps', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Device_Compliance.svg;',
					r * 0.155, r * 0.17, '', 'Device Compliance', null, null, this.getTagsForStencil(gn, 'device compliance', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Device_Configuration.svg;',
					r * 0.155, r * 0.17, '', 'Device Configuration', null, null, this.getTagsForStencil(gn, 'device configuration', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Device_Enrollment.svg;',
					r * 0.17, r * 0.151, '', 'Device Enrollment', null, null, this.getTagsForStencil(gn, 'device enrollment', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Device_Security_Apple.svg;',
					r * 0.17, r * 0.1725, '', 'Device Security Apple', null, null, this.getTagsForStencil(gn, 'device security apple', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Device_Security_Google.svg;',
					r * 0.17, r * 0.1725, '', 'Device Security Google', null, null, this.getTagsForStencil(gn, 'device security google', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Device_Security_Windows.svg;',
					r * 0.17, r * 0.17, '', 'Device Security Windows', null, null, this.getTagsForStencil(gn, 'device security windows', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Devices.svg;',
					r * 0.17, r * 0.15, '', 'Devices', null, null, this.getTagsForStencil(gn, 'devices', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'eBooks.svg;',
					r * 0.17, r * 0.15, '', 'eBooks', null, null, this.getTagsForStencil(gn, 'ebooks', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Exchange_Access.svg;',
					r * 0.14, r * 0.17, '', 'Exchange Access', null, null, this.getTagsForStencil(gn, 'exchange access', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Intune.svg;',
					r * 0.17, r * 0.155, '', 'Intune', null, null, this.getTagsForStencil(gn, 'intune', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Intune_For_Education.svg;',
					r * 0.17, r * 0.155, '', 'Intune for Education', null, null, this.getTagsForStencil(gn, 'intune for education', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Mindaro.svg;',
					r * 0.168, r * 0.17, '', 'Mindaro', null, null, this.getTagsForStencil(gn, 'mindaro', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Security_Baselines.svg;',
					r * 0.17, r * 0.17, '', 'Security Baselines', null, null, this.getTagsForStencil(gn, 'security baselines', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Software_Updates.svg;',
					r * 0.17, r * 0.15, '', 'Software Updates', null, null, this.getTagsForStencil(gn, 'software updates', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Tenant_Status.svg;',
					r * 0.16, r * 0.17, '', 'Tenant Status', null, null, this.getTagsForStencil(gn, 'tenant status', dt).join(' '))
		];
			
		this.addPalette('azure2Intune', 'Azure / Intune', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};

	Sidebar.prototype.addAzure2IOTPalette = function(gn, r, sb, s)
	{
		var dt = 'azure iot internet of things ';
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'Azure_Maps_Accounts.svg;',
					r * 0.17, r * 0.17, '', 'Azure Maps Accounts', null, null, this.getTagsForStencil(gn, 'maps accounts', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Device_Provisioning_Services.svg;',
					r * 0.16, r * 0.165, '', 'Device Provisioning Services', null, null, this.getTagsForStencil(gn, 'device provisioning services', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Digital_Twins.svg;',
					r * 0.17, r * 0.17, '', 'Digital Twins', null, null, this.getTagsForStencil(gn, 'digital twins', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Event_Hubs.svg;',
					r * 0.1675, r * 0.15, '', 'Event Hubs', null, null, this.getTagsForStencil(gn, 'event hubs', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Function_Apps.svg;',
					r * 0.17, r * 0.15, '', 'Function Apps', null, null, this.getTagsForStencil(gn, 'function apps', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Industrial_IoT.svg;',
					r * 0.157, r * 0.17, '', 'Industrial IoT', null, null, this.getTagsForStencil(gn, 'industrial', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'IoT_Central_Applications.svg;',
					r * 0.15, r * 0.1725, '', 'IoT Central Applications', null, null, this.getTagsForStencil(gn, 'central applications', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'IoT_Edge.svg;',
					r * 0.17, r * 0.17, '', 'IoT Edge', null, null, this.getTagsForStencil(gn, 'edge', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'IoT_Hub.svg;',
					r * 0.16, r * 0.16, '', 'IoT Hub', null, null, this.getTagsForStencil(gn, 'roles', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Logic_Apps.svg;',
					r * 0.1675, r * 0.13, '', 'Logic Apps', null, null, this.getTagsForStencil(gn, 'logic apps', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Notification_Hubs.svg;',
					r * 0.1675, r * 0.14, '', 'Notification Hubs', null, null, this.getTagsForStencil(gn, 'notification hubs', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Stream_Analytics_Jobs.svg;',
					r * 0.17, r * 0.145, '', 'Stream Analytics Jobs', null, null, this.getTagsForStencil(gn, 'stream analytics jobs', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Time_Series_Data_Sets.svg;',
					r * 0.128, r * 0.17, '', 'Time Series Data Sets', null, null, this.getTagsForStencil(gn, 'time series data sets', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Time_Series_Insights_Environments.svg;',
					r * 0.1675, r * 0.17, '', 'Time Series Insights Environments', null, null, this.getTagsForStencil(gn, 'time series insights environments', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Time_Series_Insights_Event_Sources.svg;',
					r * 0.1675, r * 0.17, '', 'Time Series Insights Event Sources', null, null, this.getTagsForStencil(gn, 'time series insights event sources', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Windows10_Core_Services.svg;',
					r * 0.17, r * 0.17, '', 'Windows10 Core Services', null, null, this.getTagsForStencil(gn, 'windows10 core services', dt).join(' '))
		];
			
		this.addPalette('azure2IoT', 'Azure / IoT', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};

	Sidebar.prototype.addAzure2ManagementGovernancePalette = function(gn, r, sb, s)
	{
		var dt = 'azure management governance ';
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'Activity_Log.svg;',
					r * 0.14, r * 0.1675, '', 'Activity Log', null, null, this.getTagsForStencil(gn, 'activity log', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Advisor.svg;',
					r * 0.165, r * 0.16, '', 'Advisor', null, null, this.getTagsForStencil(gn, 'advisor', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Alerts.svg;',
					r * 0.1675, r * 0.14, '', 'Alerts', null, null, this.getTagsForStencil(gn, 'alerts', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Application_Insights.svg;',
					r * 0.11, r * 0.1575, '', 'Application Insights', null, null, this.getTagsForStencil(gn, 'application insights', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Automation_Accounts.svg;',
					r * 0.17, r * 0.17, '', 'Automation Accounts', null, null, this.getTagsForStencil(gn, 'automation accounts', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_Arc.svg;',
					r * 0.1725, r * 0.13, '', 'Azure Arc', null, null, this.getTagsForStencil(gn, 'arc', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_Lighthouse.svg;',
					r * 0.1475, r * 0.17, '', 'Azure Lighthouse', null, null, this.getTagsForStencil(gn, 'lighthouse', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Blueprints.svg;',
					r * 0.1625, r * 0.16, '', 'Blueprints', null, null, this.getTagsForStencil(gn, 'blueprints', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Compliance.svg;',
					r * 0.13, r * 0.16, '', 'Compliance', null, null, this.getTagsForStencil(gn, 'compliance', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Cost_Management_and_Billing.svg;',
					r * 0.17, r * 0.17, '', 'Cost Management and Billing', null, null, this.getTagsForStencil(gn, 'cost management billing', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Customer_Lockbox_for_MS_Azure.svg;',
					r * 0.17, r * 0.166, '', 'Customer Lockbox for MS Azure', null, null, this.getTagsForStencil(gn, 'customer lockbox for ms azure', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Diagnostics_Settings.svg;',
					r * 0.14, r * 0.1675, '', 'Diagnostics Settings', null, null, this.getTagsForStencil(gn, 'diagnostics settings', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Education.svg;',
					r * 0.1675, r * 0.13, '', 'Education', null, null, this.getTagsForStencil(gn, 'education', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Log_Analytics_Workspaces.svg;',
					r * 0.16, r * 0.16, '', 'Log Analytics Workspaces', null, null, this.getTagsForStencil(gn, 'log analytics workspaces', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'MachinesAzureArc.svg;',
					r * 0.11, r * 0.17, '', 'MachinesAzureArc', null, null, this.getTagsForStencil(gn, 'machines arc', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Managed_Applications_Center.svg;',
					r * 0.17, r * 0.135, '', 'Managed Applications Center', null, null, this.getTagsForStencil(gn, 'managed applications center', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Managed_Desktop.svg;',
					r * 0.17, r * 0.158, '', 'Managed Desktop', null, null, this.getTagsForStencil(gn, 'managed desktop', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Metrics.svg;',
					r * 0.15, r * 0.1625, '', 'Metrics', null, null, this.getTagsForStencil(gn, 'metrics', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Monitor.svg;',
					r * 0.16, r * 0.16, '', 'Monitor', null, null, this.getTagsForStencil(gn, 'monitor', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'My_Customers.svg;',
					r * 0.1725, r * 0.14, '', 'My Customers', null, null, this.getTagsForStencil(gn, 'my customers', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Operation_Log_Classic.svg;',
					r * 0.14, r * 0.1675, '', 'Operation Log (Classic)', null, null, this.getTagsForStencil(gn, 'operation log classic', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Policy.svg;',
					r * 0.15, r * 0.16, '', 'Policy', null, null, this.getTagsForStencil(gn, 'policy', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Recovery_Services_Vaults.svg;',
					r * 0.1725, r * 0.15, '', 'Recovery Services Vaults', null, null, this.getTagsForStencil(gn, 'recovery services vaults', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Resource_Graph_Explorer.svg;',
					r * 0.1675, r * 0.16, '', 'Resource Graph Explorer', null, null, this.getTagsForStencil(gn, 'resource graph explorer', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Scheduler_Job_Collections.svg;',
					r * 0.17, r * 0.16, '', 'Scheduler Job Collections', null, null, this.getTagsForStencil(gn, 'scheduler job collections', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Service_Catalog_MAD.svg;',
					r * 0.14, r * 0.17, '', 'Service Catalog MAD', null, null, this.getTagsForStencil(gn, 'service catalog mad', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Service_Providers.svg;',
					r * 0.165, r * 0.17, '', 'Service Providers', null, null, this.getTagsForStencil(gn, 'service providers', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'solutions.svg;',
					r * 0.16, r * 0.16, '', 'Solutions', null, null, this.getTagsForStencil(gn, 'solutions', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Universal_Print.svg;',
					r * 0.17, r * 0.145, '', 'Universal Print', null, null, this.getTagsForStencil(gn, 'universal print', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'User_Privacy.svg;',
					r * 0.16, r * 0.17, '', 'User Privacy', null, null, this.getTagsForStencil(gn, 'user privacy', dt).join(' '))
		];
			
		this.addPalette('azure2Management Governance', 'Azure / Management Governance', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};

	Sidebar.prototype.addAzure2MenuPalette = function(gn, r, sb, s)
	{
		var dt = 'azure menu ';
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'Keys.svg;',
					r * 0.16, r * 0.17, '', 'Keys', null, null, this.getTagsForStencil(gn, 'keys', dt).join(' '))
		];
			
		this.addPalette('azure2Menu', 'Azure / Menu', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};

	Sidebar.prototype.addAzure2MigratePalette = function(gn, r, sb, s)
	{
		var dt = 'azure migrate ';
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'Azure_Migrate.svg;',
					r * 0.18, r * 0.11, '', 'Azure Migrate', null, null, this.getTagsForStencil(gn, 'migrate', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Cost_Management_and_Billing.svg;',
					r * 0.17, r * 0.17, '', 'Cost Management and Billing', null, null, this.getTagsForStencil(gn, 'cost management billing', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Data_Box.svg;',
					r * 0.1775, r * 0.17, '', 'Data Box', null, null, this.getTagsForStencil(gn, 'data box', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Data_Box_Edge.svg;',
					r * 0.1675, r * 0.12, '', 'Data Box Edge', null, null, this.getTagsForStencil(gn, 'data box edge', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Recovery_Services_Vaults.svg;',
					r * 0.1725, r * 0.15, '', 'Recovery Services Vaults', null, null, this.getTagsForStencil(gn, 'recovery services vaults', dt).join(' '))
		];
			
		this.addPalette('azure2Migrate', 'Azure / Migrate', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};

	Sidebar.prototype.addAzure2MixedRealityPalette = function(gn, r, sb, s)
	{
		var dt = 'azure mixed reality ';
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'Remote_Rendering.svg;',
					r * 0.17, r * 0.12, '', 'Remote Rendering', null, null, this.getTagsForStencil(gn, 'remote rendering', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Spatial_Anchor_Accounts.svg;',
					r * 0.167, r * 0.17, '', 'Spatial Anchor Accounts', null, null, this.getTagsForStencil(gn, 'spatial anchor accounts', dt).join(' '))
		];
			
		this.addPalette('azure2Mixed Reality', 'Azure / Mixed Reality', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};

	Sidebar.prototype.addAzure2MonitorPalette = function(gn, r, sb, s)
	{
		var dt = 'azure monitor ';
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'SAP_Azure_Monitor.svg;',
					r * 0.175, r * 0.14, '', 'SAP Azure Monitor', null, null, this.getTagsForStencil(gn, 'sap monitor', dt).join(' '))
		];
			
		this.addPalette('azure2Monitor', 'Azure / Monitor', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};

	Sidebar.prototype.addAzure2NetworkingPalette = function(gn, r, sb, s)
	{
		var dt = 'azure network networking ';
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'Application_Gateways.svg;',
					r * 0.16, r * 0.16, '', 'Application Gateways', null, null, this.getTagsForStencil(gn, 'application gateways', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_Firewall_Manager.svg;',
					r * 0.175, r * 0.15, '', 'Azure Firewall Manager', null, null, this.getTagsForStencil(gn, 'firewall manager', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Bastions.svg;',
					r * 0.145, r * 0.17, '', 'Bastions', null, null, this.getTagsForStencil(gn, 'bastions', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'CDN_Profiles.svg;',
					r * 0.17, r * 0.1, '', 'CDN Profiles', null, null, this.getTagsForStencil(gn, 'cdn profiles', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Connections.svg;',
					r * 0.17, r * 0.17, '', 'Connections', null, null, this.getTagsForStencil(gn, 'connections', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'DDoS_Protection_Plans.svg;',
					r * 0.14, r * 0.17, '', 'DDoS Protection Plans', null, null, this.getTagsForStencil(gn, 'ddos protection plans', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'DNS_Private_Resolver.svg;',
					r * 0.17, r * 0.15, '', 'DNS Private Resolver', null, null, this.getTagsForStencil(gn, 'dns private resolver', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'DNS_Zones.svg;',
					r * 0.16, r * 0.16, '', 'DNS Zones', null, null, this.getTagsForStencil(gn, 'dns domain name server zones', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'ExpressRoute_Circuits.svg;',
					r * 0.175, r * 0.16, '', 'ExpressRoute Circuits', null, null, this.getTagsForStencil(gn, 'expressroute circuits', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Firewalls.svg;',
					r * 0.1775, r * 0.15, '', 'Firewalls', null, null, this.getTagsForStencil(gn, 'firewalls', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Front_Doors.svg;',
					r * 0.17, r * 0.15, '', 'Front Doors', null, null, this.getTagsForStencil(gn, 'front doors', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'IP_Groups.svg;',
					r * 0.1675, r * 0.13, '', 'IP Groups', null, null, this.getTagsForStencil(gn, 'ip internet protocol groups', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Load_Balancer_Hub.svg;',
					r * 0.135, r * 0.17, '', 'Load Balancer Hub', null, null, this.getTagsForStencil(gn, 'load balancer hub', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Load_Balancers.svg;',
					r * 0.18, r * 0.18, '', 'Load Balancers', null, null, this.getTagsForStencil(gn, 'load balancers', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Local_Network_Gateways.svg;',
					r * 0.17, r * 0.17, '', 'Local Network Gateways', null, null, this.getTagsForStencil(gn, 'local network gateways', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'NAT.svg;',
					r * 0.17, r * 0.17, '', 'NAT', null, null, this.getTagsForStencil(gn, 'nat', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Network_Interfaces.svg;',
					r * 0.17, r * 0.15, '', 'Network Interfaces', null, null, this.getTagsForStencil(gn, 'network interfaces', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Network_Security_Groups.svg;',
					r * 0.14, r * 0.17, '', 'Network Security Groups', null, null, this.getTagsForStencil(gn, 'network security groups', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Network_Watcher.svg;',
					r * 0.16, r * 0.16, '', 'Network Watcher', null, null, this.getTagsForStencil(gn, 'network watcher', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'On_Premises_Data_Gateways.svg;',
					r * 0.17, r * 0.163, '', 'On Premises Data Gateways', null, null, this.getTagsForStencil(gn, 'on premises data gateways', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Private_Endpoint.svg;',
					r * 0.18, r * 0.165, '', 'Private Endpoint', null, null, this.getTagsForStencil(gn, 'private endpoint', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Private_Link.svg;',
					r * 0.18, r * 0.165, '', 'Private Link', null, null, this.getTagsForStencil(gn, 'private link', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Private_Link_Hub.svg;',
					r * 0.147, r * 0.17, '', 'Private Link Hub', null, null, this.getTagsForStencil(gn, 'private link hub', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Private_Link_Service.svg;',
					r * 0.1725, r * 0.1, '', 'Private Link Service', null, null, this.getTagsForStencil(gn, 'private link service', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Proximity_Placement_Groups.svg;',
					r * 0.18, r * 0.17, '', 'Proximity Placement Groups', null, null, this.getTagsForStencil(gn, 'proximity placement groups', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Public_IP_Addresses.svg;',
					r * 0.1625, r * 0.13, '', 'Public IP Addresses', null, null, this.getTagsForStencil(gn, 'public ip addresses', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Public_IP_Addresses_Classic.svg;',
					r * 0.16, r * 0.13, '', 'Public IP Addresses (Classic)', null, null, this.getTagsForStencil(gn, 'public ip internet protocol addresses classic', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Public_IP_Prefixes.svg;',
					r * 0.18, r * 0.14, '', 'Public IP Prefixes', null, null, this.getTagsForStencil(gn, 'public ip internet protocol prefixes', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Reserved_IP_Addresses_Classic.svg;',
					r * 0.17, r * 0.1375, '', 'Reserved IP Addresses (Classic)', null, null, this.getTagsForStencil(gn, 'reserved ip internet protocol addresses classic', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Resource_Management_Private_Link.svg;',
					r * 0.17, r * 0.165, '', 'Resource_Management_Private_Link', null, null, this.getTagsForStencil(gn, 'resource management private link', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Route_Filters.svg;',
					r * 0.1775, r * 0.11, '', 'Route Filters', null, null, this.getTagsForStencil(gn, 'route filters', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Route_Tables.svg;',
					r * 0.16, r * 0.155, '', 'Route Tables', null, null, this.getTagsForStencil(gn, 'route tables', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Service_Endpoint_Policies.svg;',
					r * 0.155, r * 0.16, '', 'Service Endpoint Policies', null, null, this.getTagsForStencil(gn, 'service endpoint policies', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Spot_VM.svg;',
					r * 0.17, r * 0.157, '', 'Spot VM', null, null, this.getTagsForStencil(gn, 'spot vm virtual machine', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Spot_VMSS.svg;',
					r * 0.17, r * 0.16, '', 'Spot VMSS', null, null, this.getTagsForStencil(gn, 'spot vmss virtual machine', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Traffic_Manager_Profiles.svg;',
					r * 0.17, r * 0.17, '', 'Traffic Manager Profiles', null, null, this.getTagsForStencil(gn, 'traffic manager profiles', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Virtual_Network_Gateways.svg;',
					r * 0.13, r * 0.1725, '', 'Virtual Network Gateways', null, null, this.getTagsForStencil(gn, 'virtual network gateways', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Virtual_Networks.svg;',
					r * 0.1675, r * 0.1, '', 'Virtual Networks', null, null, this.getTagsForStencil(gn, 'virtual networks', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Virtual_Networks_Classic.svg;',
					r * 0.1675, r * 0.1, '', 'Virtual Networks (Classic)', null, null, this.getTagsForStencil(gn, 'virtual networks classic', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Virtual_Router.svg;',
					r * 0.17, r * 0.17, '', 'Virtual Router', null, null, this.getTagsForStencil(gn, 'virtual router', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Virtual_WANs.svg;',
					r * 0.1625, r * 0.16, '', 'Virtual WANs', null, null, this.getTagsForStencil(gn, 'virtual wans wan wide area network', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Web_Application_Firewall_Policies_WAF.svg;',
					r * 0.17, r * 0.17, '', 'Web Application Firewall Policies (WAF)', null, null, this.getTagsForStencil(gn, 'web application firewall policies waf', dt).join(' '))
		];
			
		this.addPalette('azure2Networking', 'Azure / Networking', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};

	Sidebar.prototype.addAzure2OtherPalette = function(gn, r, sb, s)
	{
		var dt = 'azure other ';
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'ACS_Solutions_Builder.svg;',
					r * 0.17, r * 0.13, '', 'ACS_Solutions_Builder', null, null, this.getTagsForStencil(gn, 'acs solutions builder', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'API_Proxy.svg;',
					r * 0.17, r * 0.095, '', 'API Proxy', null, null, this.getTagsForStencil(gn, 'api application programming interface proxy', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Aquila.svg;',
					r * 0.17, r * 0.167, '', 'Aquila', null, null, this.getTagsForStencil(gn, 'aquila', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'AVS_VM.svg;',
					r * 0.17, r * 0.157, '', 'AVS VM', null, null, this.getTagsForStencil(gn, 'avs vm virtual machine', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_Backup_Center.svg;',
					r * 0.17, r * 0.155, '', 'Backup Center', null, null, this.getTagsForStencil(gn, 'backup center', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_Chaos_Studio.svg;',
					r * 0.17, r * 0.17, '', 'Azure Chaos Studio', null, null, this.getTagsForStencil(gn, 'chaos studio', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_Cloud_Shell.svg;',
					r * 0.17, r * 0.118, '', 'Azure Cloud Shell', null, null, this.getTagsForStencil(gn, 'cloud shell', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_Communication_Services.svg;',
					r * 0.17, r * 0.125, '', 'Azure Communication Services', null, null, this.getTagsForStencil(gn, 'communication services', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_Edge_Hardware_Center.svg;',
					r * 0.17, r * 0.17, '', 'Azure Edge Hardware Center', null, null, this.getTagsForStencil(gn, 'edge hardware center', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_HPC_Workbench.svg;',
					r * 0.139, r * 0.17, '', 'Azure HPC Workbench', null, null, this.getTagsForStencil(gn, 'hpc workbench', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_Load_Testing.svg;',
					r * 0.17, r * 0.163, '', 'Azure Load Testing', null, null, this.getTagsForStencil(gn, 'load testing', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_Monitor_Dashboard.svg;',
					r * 0.17, r * 0.158, '', 'Azure Monitor Dashboard', null, null, this.getTagsForStencil(gn, 'monitor dashboard', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_Network_Function_Manager.svg;',
					r * 0.15, r * 0.17, '', 'Azure Network Function Manager', null, null, this.getTagsForStencil(gn, 'network function manager', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_Network_Manager.svg;',
					r * 0.16, r * 0.17, '', 'Azure Network Manager', null, null, this.getTagsForStencil(gn, 'network manager', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_Orbital.svg;',
					r * 0.17, r * 0.17, '', 'Azure Orbital', null, null, this.getTagsForStencil(gn, 'orbital', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_Quotas.svg;',
					r * 0.17, r * 0.12, '', 'Azure Quotas', null, null, this.getTagsForStencil(gn, 'quotas', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_Sphere.svg;',
					r * 0.165, r * 0.17, '', 'Azure Sphere', null, null, this.getTagsForStencil(gn, 'sphere', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_Support_Center_Blue.svg;',
					r * 0.15, r * 0.17, '', 'Azure Support Center Blue', null, null, this.getTagsForStencil(gn, 'support center blue', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'AzureAttestation.svg;',
					r * 0.14, r * 0.17, '', 'AzureAttestation', null, null, this.getTagsForStencil(gn, 'azureattestation attestation', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azurite.svg;',
					r * 0.17, r * 0.165, '', 'Azurite', null, null, this.getTagsForStencil(gn, 'azurite', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Bare_Metal_Infrastructure.svg;',
					r * 0.17, r * 0.16, '', 'Bare Metal Infrastructure', null, null, this.getTagsForStencil(gn, 'bare metal infrastructure', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Ceres.svg;',
					r * 0.148, r * 0.17, '', 'Ceres', null, null, this.getTagsForStencil(gn, 'ceres', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Cloud_Services_(extended_support).svg;',
					r * 0.17, r * 0.145, '', 'Cloud Services (extended support)', null, null, this.getTagsForStencil(gn, 'cloud services extended support', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Compliance_Center.svg;',
					r * 0.17, r * 0.17, '', 'Compliance Center', null, null, this.getTagsForStencil(gn, 'compliance center', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Confidential_Ledger.svg;',
					r * 0.17, r * 0.17, '', 'Confidential_Ledger', null, null, this.getTagsForStencil(gn, 'confidential ledger', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Connected_Cache.svg;',
					r * 0.17, r * 0.14, '', 'Connected Cache', null, null, this.getTagsForStencil(gn, 'connected cache', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Connected_Vehicle_Platform.svg;',
					r * 0.17, r * 0.13, '', 'Connected Vehicle Platform', null, null, this.getTagsForStencil(gn, 'connected vehicle platform', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Container_App_Environments.svg;',
					r * 0.17, r * 0.17, '', 'Container App Environments', null, null, this.getTagsForStencil(gn, 'container app environments', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Custom_IP_Prefix.svg;',
					r * 0.17, r * 0.17, '', 'Custom IP Prefix', null, null, this.getTagsForStencil(gn, 'custom ip internet protocol prefix', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Dashboard_Hub.svg;',
					r * 0.17, r * 0.13, '', 'Dashboard Hub', null, null, this.getTagsForStencil(gn, 'dashboard hub', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Dedicated_HSM.svg;',
					r * 0.17, r * 0.155, '', 'Dedicated HSM', null, null, this.getTagsForStencil(gn, 'dedicated hsm', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Detonation.svg;',
					r * 0.155, r * 0.16, '', 'Detonation', null, null, this.getTagsForStencil(gn, 'detonation', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Device_Update_IoT_Hub.svg;',
					r * 0.15, r * 0.17, '', 'Device Update IoT Hub', null, null, this.getTagsForStencil(gn, 'device updateiot hub internet of things', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Disk_Pool.svg;',
					r * 0.17, r * 0.165, '', 'Disk Pool', null, null, this.getTagsForStencil(gn, 'disk pool', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Edge_Management.svg;',
					r * 0.165, r * 0.17, '', 'Edge Management', null, null, this.getTagsForStencil(gn, 'edge management', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Exchange_On_Premises_Access.svg;',
					r * 0.1, r * 0.17, '', 'Exchange On Premises Access', null, null, this.getTagsForStencil(gn, 'exchange on premises access', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'ExpressRoute_Direct.svg;',
					r * 0.17, r * 0.15, '', 'ExpressRoute Direct', null, null, this.getTagsForStencil(gn, 'expressroute express route direct', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Fiji.svg;',
					r * 0.135, r * 0.17, '', 'Fiji', null, null, this.getTagsForStencil(gn, 'fiji', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Grafana.svg;',
					r * 0.17, r * 0.132, '', 'Grafana', null, null, this.getTagsForStencil(gn, 'grafana', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Image_Definition.svg;',
					r * 0.17, r * 0.16, '', 'Image Definition', null, null, this.getTagsForStencil(gn, 'image definition', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Image_Version.svg;',
					r * 0.17, r * 0.17, '', 'Image Version', null, null, this.getTagsForStencil(gn, 'image version', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Instance_Pools.svg;',
					r * 0.1625, r * 0.16, '', 'Instance Pools', null, null, this.getTagsForStencil(gn, 'instance pools', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Internet_Analyzer_Profiles.svg;',
					r * 0.17, r * 0.16, '', 'Internet Analyzer Profiles', null, null, this.getTagsForStencil(gn, 'internet analyzer profiles', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Intune_Trends.svg;',
					r * 0.142, r * 0.17, '', 'Intune Trends', null, null, this.getTagsForStencil(gn, 'intune trends', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Load_Testing.svg;',
					r * 0.148, r * 0.17, '', 'Load Testing', null, null, this.getTagsForStencil(gn, 'load testing', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Local_Network_Gateways.svg;',
					r * 0.17, r * 0.17, '', 'Local Network Gateways', null, null, this.getTagsForStencil(gn, 'local network gateways', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Managed_Instance_Apache_Cassandra.svg;',
					r * 0.17, r * 0.17, '', 'Managed Instance Apache Cassandra', null, null, this.getTagsForStencil(gn, 'managed instance apache cassandra', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Marketplace_Management.svg;',
					r * 0.145, r * 0.17, '', 'Marketplace Management', null, null, this.getTagsForStencil(gn, 'marketplace management', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Mission_Landing_Zone.svg;',
					r * 0.17, r * 0.16, '', 'Mission Landing Zone', null, null, this.getTagsForStencil(gn, 'mission landing zone', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Modular_Data_Center.svg;',
					r * 0.17, r * 0.17, '', 'Modular Data Center', null, null, this.getTagsForStencil(gn, 'modular data center', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Open_Supply_Chain_Platform.svg;',
					r * 0.17, r * 0.17, '', 'Open Supply Chain Platform', null, null, this.getTagsForStencil(gn, 'open supply chain platform', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Peering_Service.svg;',
					r * 0.17, r * 0.1725, '', 'Peering Service', null, null, this.getTagsForStencil(gn, 'peering service', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Private_Mobile_Network.svg;',
					r * 0.17, r * 0.12, '', 'Private Mobile Network', null, null, this.getTagsForStencil(gn, 'private mobile network', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Reserved_Capacity.svg;',
					r * 0.145, r * 0.17, '', 'Reserved Capacity', null, null, this.getTagsForStencil(gn, 'reserved capacity', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Reserved_Capacity_Groups.svg;',
					r * 0.145, r * 0.17, '', 'Reserved Capacity Groups', null, null, this.getTagsForStencil(gn, 'reserved capacity groups', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Resource_Mover.svg;',
					r * 0.14, r * 0.17, '', 'Resource Mover', null, null, this.getTagsForStencil(gn, 'resource mover', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'RTOS.svg;',
					r * 0.17, r * 0.17, '', 'RTOS', null, null, this.getTagsForStencil(gn, 'rtos', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Savings_Plan.svg;',
					r * 0.17, r * 0.17, '', 'Savings Plan', null, null, this.getTagsForStencil(gn, 'savings plan', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Sonic_Dash.svg;',
					r * 0.155, r * 0.17, '', 'Sonic Dash', null, null, this.getTagsForStencil(gn, 'sonic dash', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'SSH_Keys.svg;',
					r * 0.17, r * 0.15, '', 'SSH Keys', null, null, this.getTagsForStencil(gn, 'ssh keys', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Storage_Tasks.svg;',
					r * 0.17, r * 0.17, '', 'Storage Tasks', null, null, this.getTagsForStencil(gn, 'storage tasks', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Template_Specs.svg;',
					r * 0.1425, r * 0.17, '', 'Template Specs', null, null, this.getTagsForStencil(gn, 'template specs', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Test_Base.svg;',
					r * 0.17, r * 0.12, '', 'Test Base', null, null, this.getTagsForStencil(gn, 'test base', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Universal_Print.svg;',
					r * 0.175, r * 0.15, '', 'Universal Print', null, null, this.getTagsForStencil(gn, 'universal print', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Update_Center.svg;',
					r * 0.17, r * 0.17, '', 'Update Center', null, null, this.getTagsForStencil(gn, 'update center', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'VM_Application_Definition.svg;',
					r * 0.17, r * 0.157, '', 'VM Application Definition', null, null, this.getTagsForStencil(gn, 'vm virtual machine application definition', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'VM_Application_Version.svg;',
					r * 0.17, r * 0.17, '', 'VM Application Version', null, null, this.getTagsForStencil(gn, 'vm virtual machine application version', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'WAC.svg;',
					r * 0.155, r * 0.17, '', 'WAC', null, null, this.getTagsForStencil(gn, 'wac windows admin center', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Web_App_Database.svg;',
					r * 0.17, r * 0.17, '', 'Web App Database', null, null, this.getTagsForStencil(gn, 'web app database', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Web_Jobs.svg;',
					r * 0.165, r * 0.17, '', 'Web Jobs', null, null, this.getTagsForStencil(gn, 'web jobs', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Windows_Notification_Services.svg;',
					r * 0.17, r * 0.17, '', 'Windows Notification Services', null, null, this.getTagsForStencil(gn, 'windows notification services', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Windows_Virtual_Desktop.svg;',
					r * 0.17, r * 0.17, '', 'Windows Virtual Desktop', null, null, this.getTagsForStencil(gn, 'windows virtual desktop', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Worker_Container_App.svg;',
					r * 0.17, r * 0.165, '', 'Worker Container App', null, null, this.getTagsForStencil(gn, 'worker container app', dt).join(' '))
		];
			
		this.addPalette('azure2Other', 'Azure / Other', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};

	Sidebar.prototype.addAzure2PreviewPalette = function(gn, r, sb, s)
	{
		var dt = 'azure preview ';
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'Azure_Cloud_Shell.svg;',
					r * 0.17, r * 0.12, '', 'Azure Cloud Shell', null, null, this.getTagsForStencil(gn, 'cloud shell', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_Sphere.svg;',
					r * 0.165, r * 0.17, '', 'Azure Sphere', null, null, this.getTagsForStencil(gn, 'sphere', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_Workbooks.svg;',
					r * 0.18, r * 0.18, '', 'Azure Workbooks', null, null, this.getTagsForStencil(gn, 'workbooks', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'IoT_Edge.svg;',
					r * 0.17, r * 0.1675, '', 'IoT Edge', null, null, this.getTagsForStencil(gn, 'iot internet of things edge', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Private_Link_Hub.svg;',
					r * 0.15, r * 0.1725, '', 'Private Link Hub', null, null, this.getTagsForStencil(gn, 'private link hub', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'RTOS.svg;',
					r * 0.17, r * 0.17, '', 'RTOS', null, null, this.getTagsForStencil(gn, 'rtos', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Static_Apps.svg;',
					r * 0.175, r * 0.14, '', 'Static Apps', null, null, this.getTagsForStencil(gn, 'static apps', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Time_Series_Data_Sets.svg;',
					r * 0.12, r * 0.16, '', 'Time Series Data Sets', null, null, this.getTagsForStencil(gn, 'time series data sets', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Web_Environment.svg;',
					r * 0.16, r * 0.165, '', 'Web Environment', null, null, this.getTagsForStencil(gn, 'web environment', dt).join(' '))
		];
			
		this.addPalette('azure2Preview', 'Azure / Preview', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};

	Sidebar.prototype.addAzure2SecurityPalette = function(gn, r, sb, s)
	{
		var dt = 'azure security ';
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'Application_Security_Groups.svg;',
					r * 0.14, r * 0.17, '', 'Application Security Groups', null, null, this.getTagsForStencil(gn, 'application security groups', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_Defender.svg;',
					r * 0.14, r * 0.17, '', 'Azure Defender', null, null, this.getTagsForStencil(gn, 'defender', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_Sentinel.svg;',
					r * 0.14, r * 0.17, '', 'Azure Sentinel', null, null, this.getTagsForStencil(gn, 'sentinel', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Conditional_Access.svg;',
					r * 0.14, r * 0.17, '', 'Conditional Access', null, null, this.getTagsForStencil(gn, 'conditional access', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Detonation.svg;',
					r * 0.165, r * 0.17, '', 'Detonation', null, null, this.getTagsForStencil(gn, 'detonation', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'ExtendedSecurityUpdates.svg;',
					r * 0.16, r * 0.175, '', 'Extended Security Updates', null, null, this.getTagsForStencil(gn, 'extended security updates', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Key_Vaults.svg;',
					r * 0.17, r * 0.17, '', 'Key Vaults', null, null, this.getTagsForStencil(gn, 'key vaults', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Keys.svg;',
					r * 0.18, r * 0.19, '', 'Keys', null, null, this.getTagsForStencil(gn, 'keys', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Security_Center.svg;',
					r * 0.14, r * 0.17, '', 'Security Center', null, null, this.getTagsForStencil(gn, 'security center', dt).join(' '))
		];
			
		this.addPalette('azure2Security', 'Azure / Security', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};

	Sidebar.prototype.addAzure2StoragePalette = function(gn, r, sb, s)
	{
		var dt = 'azure storage ';
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'Azure_Fileshare.svg;',
					r * 0.17, r * 0.17, '', 'Azure Fileshare', null, null, this.getTagsForStencil(gn, 'fileshare', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_HCP_Cache.svg;',
					r * 0.17, r * 0.1575, '', 'Azure HCP Cache', null, null, this.getTagsForStencil(gn, 'hcp cache', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_NetApp_Files.svg;',
					r * 0.1625, r * 0.13, '', 'Azure NetApp Files', null, null, this.getTagsForStencil(gn, 'netapp files', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_Stack_Edge.svg;',
					r * 0.17, r * 0.12, '', 'Azure Stack Edge', null, null, this.getTagsForStencil(gn, 'stack edge', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Data_Box.svg;',
					r * 0.1775, r * 0.17, '', 'Data Box', null, null, this.getTagsForStencil(gn, 'data box', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Data_Box_Edge.svg;',
					r * 0.1675, r * 0.12, '', 'Data Box Edge', null, null, this.getTagsForStencil(gn, 'data box edge', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Data_Lake_Storage_Gen1.svg;',
					r * 0.16, r * 0.13, '', 'Data Lake Storage Gen1', null, null, this.getTagsForStencil(gn, 'data lake storage gen1', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Data_Share_Invitations.svg;',
					r * 0.17, r * 0.112, '', 'Data Share Invitations', null, null, this.getTagsForStencil(gn, 'data share invitations', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Data_Shares.svg;',
					r * 0.16, r * 0.1375, '', 'Data Shares', null, null, this.getTagsForStencil(gn, 'data shares', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Import_Export_Jobs.svg;',
					r * 0.16, r * 0.1675, '', 'Import Export Jobs', null, null, this.getTagsForStencil(gn, 'import export jobs', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Recovery_Services_Vaults.svg;',
					r * 0.1725, r * 0.15, '', 'Recovery Services Vaults', null, null, this.getTagsForStencil(gn, 'recovery services vaults', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Storage_Accounts.svg;',
					r * 0.1625, r * 0.13, '', 'Storage Accounts', null, null, this.getTagsForStencil(gn, 'storage accounts', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Storage_Accounts_Classic.svg;',
					r * 0.1625, r * 0.13, '', 'Storage Accounts (Classic)', null, null, this.getTagsForStencil(gn, 'storage accounts classic', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Storage_Explorer.svg;',
					r * 0.146, r * 0.17, '', 'Storage Explorer', null, null, this.getTagsForStencil(gn, 'storage explorer', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Storage_Sync_Services.svg;',
					r * 0.18, r * 0.15, '', 'Storage Sync Services', null, null, this.getTagsForStencil(gn, 'storage sync services', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'StorSimple_Data_Managers.svg;',
					r * 0.12, r * 0.16, '', 'StorSimple Data Managers', null, null, this.getTagsForStencil(gn, 'storsimple data managers', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'StorSimple_Device_Managers.svg;',
					r * 0.175, r * 0.16, '', 'StorSimple Device Managers', null, null, this.getTagsForStencil(gn, 'storsimple device managers', dt).join(' '))
		];
			
		this.addPalette('azure2Storage', 'Azure / Storage', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};

	Sidebar.prototype.addAzure2WebPalette = function(gn, r, sb, s)
	{
		var dt = 'azure web ';
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'Azure_Media_Service.svg;',
					r * 0.17, r * 0.17, '', 'Azure Media Service', null, null, this.getTagsForStencil(gn, 'media service', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Notification_Hub_Namespaces.svg;',
					r * 0.1675, r * 0.14, '', 'Notification Hub Namespaces', null, null, this.getTagsForStencil(gn, 'notification hub namespaces', dt).join(' '))
		];
			
		this.addPalette('azure2Web', 'Azure / Web', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};

})();
