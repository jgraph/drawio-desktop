(function()
{
	// Adds MSCAE shapes
	Sidebar.prototype.addMSCAEPalette = function()
	{
		var gn = 'mxgraph.mscae';
		var r = 100;
		var sb = this;
		var s = 'image;sketch=0;aspect=fixed;html=1;points=[];align=center;fontSize=12;image=img/lib/mscae/';
		
		this.setCurrentSearchEntryLibrary('mscae', 'mscaeCompanies');
		this.addMSCAECompaniesPalette(gn, r, sb, s);
		this.setCurrentSearchEntryLibrary('mscae', 'mscaeEnterpriseFlat');
		this.addMSCAEEnterpriseFlatPalette(gn, r, sb);
		this.setCurrentSearchEntryLibrary('mscae', 'mscaeIntuneFlat');
		this.addMSCAEIntuneFlatPalette(gn, r, sb);
		this.setCurrentSearchEntryLibrary('mscae', 'mscaeOMSFlat');
		this.addMSCAEOMSFlatPalette(gn, r, sb);
		this.setCurrentSearchEntryLibrary('mscae', 'mscaeSystem CenterFlat');
		this.addMSCAESystemCenterFlatPalette(gn, r, sb);
		this.setCurrentSearchEntryLibrary('mscae', 'mscaeAI and ML Service');
		this.addMSCAEAIandMLServicePalette(gn, r, sb, s);
		this.setCurrentSearchEntryLibrary('mscae', 'mscaeAnalytics Service');
		this.addMSCAEAnalyticsServicePalette(gn, r, sb, s);
		this.setCurrentSearchEntryLibrary('mscae', 'mscaeCompute Service');
		this.addMSCAEComputeServicePalette(gn, r, sb, s);
		this.setCurrentSearchEntryLibrary('mscae', 'mscaeCompute Service VM');
		this.addMSCAEComputeServiceVMPalette(gn, r, sb, s);
		this.setCurrentSearchEntryLibrary('mscae', 'mscaeContainer Service');
		this.addMSCAEContainerServiceVMPalette(gn, r, sb, s);
		this.setCurrentSearchEntryLibrary('mscae', 'mscaeDatabases Service');
		this.addMSCAEDatabasesServicePalette(gn, r, sb, s);
		this.setCurrentSearchEntryLibrary('mscae', 'mscaeDevOps Service');
		this.addMSCAEDevOpsServicePalette(gn, r, sb, s);
		this.setCurrentSearchEntryLibrary('mscae', 'mscaeGeneral Service');
		this.addMSCAEGeneralServicePalette(gn, r, sb, s);
		this.setCurrentSearchEntryLibrary('mscae', 'mscaeIdentity Service');
		this.addMSCAEIdentityServicePalette(gn, r, sb, s);
		this.setCurrentSearchEntryLibrary('mscae', 'mscaeIntegration Service');
		this.addMSCAEIntegrationServicePalette(gn, r, sb, s);
		this.setCurrentSearchEntryLibrary('mscae', 'mscaeInternet of Things Service');
		this.addMSCAEInternetOfThingsServicePalette(gn, r, sb, s);
		this.setCurrentSearchEntryLibrary('mscae', 'mscaeIntune Service');
		this.addMSCAEIntuneServicePalette(gn, r, sb, s);
		this.setCurrentSearchEntryLibrary('mscae', 'mscaeManagement and Governance Service');
		this.addMSCAEManagementGovernanceServicePalette(gn, r, sb, s);
		this.setCurrentSearchEntryLibrary('mscae', 'mscaeManagement and Governance Service Media');
		this.addMSCAEManagementGovernanceMediaServicePalette(gn, r, sb, s);
		this.setCurrentSearchEntryLibrary('mscae', 'mscaeMigrate Service');
		this.addMSCAEMigrateServicePalette(gn, r, sb, s);
		this.setCurrentSearchEntryLibrary('mscae', 'mscaeMixed Reality Service');
		this.addMSCAEMixedRealityServicePalette(gn, r, sb, s);
		this.setCurrentSearchEntryLibrary('mscae', 'mscaeMobile Service');
		this.addMSCAEMobileServicePalette(gn, r, sb, s);
		this.setCurrentSearchEntryLibrary('mscae', 'mscaeNetworking Service');
		this.addMSCAENetworkingServicePalette(gn, r, sb, s);
		this.setCurrentSearchEntryLibrary('mscae', 'mscaeOther Category Service');
		this.addMSCAEOtherCategoryServicePalette(gn, r, sb, s);
		this.setCurrentSearchEntryLibrary('mscae', 'mscaeSecurity Service');
		this.addMSCAESecurityServicePalette(gn, r, sb, s);
		this.setCurrentSearchEntryLibrary('mscae', 'mscaeStorage Service');
		this.addMSCAEStorageServicePalette(gn, r, sb, s);
		this.setCurrentSearchEntryLibrary('mscae', 'mscaeWeb Service');
		this.addMSCAEWebServicePalette(gn, r, sb, s);
		this.setCurrentSearchEntryLibrary();
	};

	Sidebar.prototype.addMSCAECompaniesPalette = function(gn, r, sb, s)
	{
		var dt = 'ms microsoft cloud enterprise company companies';
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'Cache_Redis_Product.svg;',
					r * 0.5, r * 0.42, '', 'Cache Redis Product Icon', null, null, this.getTagsForStencil(gn, 'azure cache redis product icon', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Databricks.svg;',
					r * 0.5, r * 0.48, '', 'Databricks', null, null, this.getTagsForStencil(gn, 'azure databricks', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'HDInsight.svg;',
					r * 0.5, r * 0.48, '', 'HDInsight', null, null, this.getTagsForStencil(gn, 'azure hdinsight', dt).join(' ')),
			this.createVertexTemplateEntry('sketch=0;shadow=0;dashed=0;html=1;strokeColor=none;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;shape=mxgraph.mscae.cloud.hockeyapp;fillColor=#0079D6;pointerEvents=1;',
					r * 0.5, r * 0.38, '', 'HockeyApp', null, null, this.getTagsForStencil(gn, 'azure hockey app hockeyapp', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'OpenShift.svg;',	
					r * 0.5, r * 0.46, '', 'OpenShift', null, null, this.getTagsForStencil(gn, 'azure open shift openshift', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Cloud_Cycle.svg;',	
					r * 0.5, r * 0.46, '', 'Cloud Cycle', null, null, this.getTagsForStencil(gn, 'cloud cycle', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Kubernetes.svg;',	
					r * 0.5, r * 0.48, '', 'Kubernetes', null, null, this.getTagsForStencil(gn, 'kubernetes', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'PluralSight_mono.svg;',	
					r * 0.5, r * 0.5, '', 'PluralSight Mono', null, null, this.getTagsForStencil(gn, 'pluralsight mono', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'DC_OS.svg;',	
					r * 0.4, r * 0.5, '', 'DC OS', null, null, this.getTagsForStencil(gn, 'dc os', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Docker.svg;',	
					r * 0.5, r * 0.41, '', 'Docker', null, null, this.getTagsForStencil(gn, 'docker', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'StackOverflow.svg;',	
					r * 0.4, r * 0.5, '', 'StackOverflow', null, null, this.getTagsForStencil(gn, 'stack overflow stackoverflow so', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'WebAppUmbraco.svg;',	
					r * 0.49, r * 0.5, '', 'WebAppUmbraco', null, null, this.getTagsForStencil(gn, 'webappumbraco webapp umbraco', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'WebAppWordPress.svg;',	
					r * 0.49, r * 0.5, '', 'WebAppWordPress', null, null, this.getTagsForStencil(gn, 'webappwordpress webapp wordpress', dt).join(' '))
		];
			
		this.addPalette('mscaeCompanies', 'CAE / Companies', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};

	Sidebar.prototype.addMSCAEEnterpriseFlatPalette = function(gn, r, sb)
	{
		var s = 'sketch=0;aspect=fixed;pointerEvents=1;shadow=0;dashed=0;html=1;strokeColor=none;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;fillColor=#00188D;shape=mxgraph.';
		var s2 = 'sketch=0;aspect=fixed;pointerEvents=1;shadow=0;dashed=0;html=1;strokeColor=none;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;shape=mxgraph.';
		var dt = 'ms microsoft cloud enterprise flat';
		
		var fns =
		[
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.d',
					r * 0.4, r * 0.5, '', 'Federation Services Proxy', null, null, this.getTagsForStencil(gn, 'active directory ad fs federation services proxy', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.ad_fs',
					r * 0.4, r * 0.5, '', 'Federation Services', null, null, this.getTagsForStencil(gn, 'active directory ad fs federation services', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.android_phone',
					r * 0.3, r * 0.5, '', 'Android Phone', null, null, this.getTagsForStencil(gn, 'android phone', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.application',
					r * 0.5, r * 0.34, '', 'Application', null, null, this.getTagsForStencil(gn, 'application', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.application_blank',
					r * 0.5, r * 0.43, '', 'Application (blank)', null, null, this.getTagsForStencil(gn, 'application blank', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.app_generic',
					r * 0.5, r * 0.39, '', 'Application (generic)', null, null, this.getTagsForStencil(gn, 'application generic', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.application_server',
					r * 0.43, r * 0.5, '', 'Application Server', null, null, this.getTagsForStencil(gn, 'application server', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.application_server2',
					r * 0.43, r * 0.5, '', 'Application Server', null, null, this.getTagsForStencil(gn, 'application server', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.pack',
					r * 0.5, r * 0.45, '', 'Pack', null, null, this.getTagsForStencil(gn, 'pack', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.backup_local',
					r * 0.49, r * 0.5, '', 'Backup (local)', null, null, this.getTagsForStencil(gn, 'backup local', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.backup_online',
					r * 0.5, r * 0.4, '', 'Backup (local)', null, null, this.getTagsForStencil(gn, 'backup local', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.calendar',
					r * 0.5, r * 0.41, '', 'Calendar', null, null, this.getTagsForStencil(gn, 'calendar', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'azure.certificate',
					r * 0.5, r * 0.4, '', 'Certificate', null, null, this.getTagsForStencil(gn, 'certificate', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.client_application',
					r * 0.5, r * 0.32, '', 'Client Application', null, null, this.getTagsForStencil(gn, 'client application', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'azure.cloud',
					r * 0.5, r * 0.32, '', 'Cloud', null, null, this.getTagsForStencil(gn, 'cloud', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.internet',
					r * 0.5, r * 0.31, '', 'Cloud', null, null, this.getTagsForStencil(gn, 'cloud', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.cluster_server',
					r * 0.4, r * 0.5, '', 'Cluster Server', null, null, this.getTagsForStencil(gn, 'cluster server', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.code_file',
					r * 0.49, r * 0.5, '', 'Code File', null, null, this.getTagsForStencil(gn, 'code file', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.connectors',
					r * 0.5, r * 0.34, '', 'Connectors', null, null, this.getTagsForStencil(gn, 'connectors', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.database_generic',
					r * 0.37, r * 0.5, '', 'Database (generic)', null, null, this.getTagsForStencil(gn, 'database generic', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.database_server',
					r * 0.38, r * 0.5, '', 'Database (server)', null, null, this.getTagsForStencil(gn, 'database server', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.database_synchronization',
					r * 0.39, r * 0.5, '', 'Database (synchronization)', null, null, this.getTagsForStencil(gn, 'database synchronization', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.device',
					r * 0.5, r * 0.26, '', 'Device', null, null, this.getTagsForStencil(gn, 'device', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.direct_access_feature',
					r * 0.5, r * 0.44, '', 'Direct Access (feature)', null, null, this.getTagsForStencil(gn, 'direct access feature', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'azure.code_file',
					r * 0.47, r * 0.5, '', 'Document DB file', null, null, this.getTagsForStencil(gn, 'documentdb document db database file', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.document',
					r * 0.4, r * 0.5, '', 'Document', null, null, this.getTagsForStencil(gn, 'document', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.domain_controller',
					r * 0.36, r * 0.5, '', 'Domain Controller', null, null, this.getTagsForStencil(gn, 'domain controller', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'azure.enterprise',
					r * 0.3, r * 0.5, '', 'Enterprise Building', null, null, this.getTagsForStencil(gn, 'enterprise building', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'azure.file',
					r * 0.47, r * 0.5, '', 'File (general)', null, null, this.getTagsForStencil(gn, 'file', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.filter',
					r * 0.5, r * 0.45, '', 'Filter', null, null, this.getTagsForStencil(gn, 'filter', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.firewall',
					r * 0.5, r * 0.44, '', 'Firewall', null, null, this.getTagsForStencil(gn, 'firewall', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.folder',
					r * 0.5, r * 0.43, '', 'Folder', null, null, this.getTagsForStencil(gn, 'folder', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.gateway',
					r * 0.5, r * 0.5, '', 'Gateway', null, null, this.getTagsForStencil(gn, 'gateway', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.general.graph',
					r * 0.5, r * 0.5, '', 'Graph', null, null, this.getTagsForStencil(gn, 'graph', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'azure.health_monitoring',
					r * 0.5, r * 0.42, '', 'Health Monitoring', null, null, this.getTagsForStencil(gn, 'health monitoring', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'azure.healthy',
					r * 0.5, r * 0.45, '', 'Healthy', null, null, this.getTagsForStencil(gn, 'healthy', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.import_generic',
					r * 0.4, r * 0.5, '', 'Import (generic)', null, null, this.getTagsForStencil(gn, 'import generic', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.internet_hollow',
					r * 0.5, r * 0.31, '', 'Internet (hollow)', null, null, this.getTagsForStencil(gn, 'internet hollow', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.internet',
					r * 0.5, r * 0.31, '', 'Internet', null, null, this.getTagsForStencil(gn, 'internet', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.key_permissions',
					r * 0.26, r * 0.5, '', 'Key, Permissions', null, null, this.getTagsForStencil(gn, 'key permissions', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.keyboard',
					r * 0.5, r * 0.3, '', 'Keyboard', null, null, this.getTagsForStencil(gn, 'keyboard', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'azure.laptop',
					r * 0.5, r * 0.3, '', 'Laptop', null, null, this.getTagsForStencil(gn, 'laptop', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'azure.load_balancer_generic',
					r * 0.37, r * 0.5, '', 'Load Balancer (generic)', null, null, this.getTagsForStencil(gn, 'load balancer generic', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.load_testing',
					r * 0.48, r * 0.5, '', 'Load Testing', null, null, this.getTagsForStencil(gn, 'load testing', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.lock_unlocked',
					r * 0.37, r * 0.5, '', 'Lock (unlocked)', null, null, this.getTagsForStencil(gn, 'lock unlocked unprotected accessible', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.lock',
					r * 0.39, r * 0.5, '', 'Lock, protected', null, null, this.getTagsForStencil(gn, 'lock protected', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.maintenance',
					r * 0.39, r * 0.5, '', 'Maintenance', null, null, this.getTagsForStencil(gn, 'maintenance', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.management_console;',
					r * 0.5, r * 0.34, '', 'Management Console', null, null, this.getTagsForStencil(gn, 'management console', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'azure.message2;',
					r * 0.5, r * 0.37, '', 'Message', null, null, this.getTagsForStencil(gn, 'message', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.monitor_running_apps',
					r * 0.5, r * 0.39, '', 'Monitor Running Apps', null, null, this.getTagsForStencil(gn, 'monitor running apps', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'azure.computer',
					r * 0.5, r * 0.45, '', 'Monitor', null, null, this.getTagsForStencil(gn, 'monitor computer', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.mouse',
					r * 0.3, r * 0.5, '', 'Mouse', null, null, this.getTagsForStencil(gn, 'mouse', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.network_card',
					r * 0.5, r * 0.35, '', 'Network Card', null, null, this.getTagsForStencil(gn, 'network card', dt).join(' ')),
			this.createVertexTemplateEntry(
					s2 + 'mscae.enterprise.not_allowed;fillColor=#EA1C24;',
					r * 0.5, r * 0.5, '', 'Not Allowed', null, null, this.getTagsForStencil(gn, 'not allowed', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.performance_monitor',
					r * 0.5, r * 0.36, '', 'Performance Monitor', null, null, this.getTagsForStencil(gn, 'performance monitor', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.performance',
					r * 0.5, r * 0.5, '', 'Performance', null, null, this.getTagsForStencil(gn, 'performance', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'azure.mobile',
					r * 0.35, r * 0.5, '', 'Mobile', null, null, this.getTagsForStencil(gn, 'mobile', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.plug_and_play',
					r * 0.4, r * 0.5, '', 'Plug and Play', null, null, this.getTagsForStencil(gn, 'plug and play', dt).join(' ')),
			this.createVertexTemplateEntry(
					s2 + 'mscae.other.powerpoint;fillColor=#DE5D24;',
					r * 0.5, r * 0.5, '', 'PowerPoint', null, null, this.getTagsForStencil(gn, 'powerpoint', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'azure.powershell_file',
					r * 0.47, r * 0.5, '', 'PowerShell file', null, null, this.getTagsForStencil(gn, 'powershell file', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.protocol_stack',
					r * 0.5, r * 0.34, '', 'Protocol Stack', null, null, this.getTagsForStencil(gn, 'protocol stack', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'azure.queue_generic',
					r * 0.5, r * 0.15, '', 'Queue Generic', null, null, this.getTagsForStencil(gn, 'queue generic', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.rms_connector',
					r * 0.38, r * 0.5, '', 'RMS Connector', null, null, this.getTagsForStencil(gn, 'rms connector', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.router',
					r * 0.5, r * 0.39, '', 'Router', null, null, this.getTagsForStencil(gn, 'router', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.router',
					r * 0.5, r * 0.39, '', 'Router', null, null, this.getTagsForStencil(gn, 'router', dt).join(' ')),
			this.createVertexTemplateEntry(
					s2 + 'azure.rdp_remoting_file;fillColor=#0078D7;',
					r * 0.48, r * 0.5, '', 'RPD Remoting file', null, null, this.getTagsForStencil(gn, 'rpd remoting file', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'azure.script_file',
					r * 0.47, r * 0.5, '', 'Script file', null, null, this.getTagsForStencil(gn, 'script file', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.secure_virtual_machine',
					r * 0.5, r * 0.38, '', 'Secure Virtual Machine', null, null, this.getTagsForStencil(gn, 'secure virtual machine', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'azure.server',
					r * 0.5, r * 0.15, '', 'Server (blade)', null, null, this.getTagsForStencil(gn, 'server', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.server_generic',
					r * 0.24, r * 0.5, '', 'Server (generic)', null, null, this.getTagsForStencil(gn, 'server generic', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.server_directory',
					r * 0.36, r * 0.5, '', 'Server Directory', null, null, this.getTagsForStencil(gn, 'server directory', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.server_farm',
					r * 0.5, r * 0.32, '', 'Server Farm', null, null, this.getTagsForStencil(gn, 'server farm', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'azure.server_rack',
					r * 0.5, r * 0.5, '', 'Server Rack', null, null, this.getTagsForStencil(gn, 'server rack', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.settings',
					r * 0.5, r * 0.5, '', 'Settings', null, null, this.getTagsForStencil(gn, 'settings', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.shared_folder',
					r * 0.43, r * 0.5, '', 'Shared Folder', null, null, this.getTagsForStencil(gn, 'shared folder', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.smartcard',
					r * 0.5, r * 0.32, '', 'Smartcard', null, null, this.getTagsForStencil(gn, 'smartcard', dt).join(' ')),
			this.createVertexTemplateEntry(
					s2 + 'azure.startup_task;fillColor=#0078D7;',
					r * 0.48, r * 0.5, '', 'Startup Task', null, null, this.getTagsForStencil(gn, 'startup task', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.storage',
					r * 0.5, r * 0.41, '', 'Storage', null, null, this.getTagsForStencil(gn, 'storage', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.table',
					r * 0.5, r * 0.5, '', 'Table', null, null, this.getTagsForStencil(gn, 'table', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'azure.tablet;',
					r * 0.5, r * 0.37, '', 'Tablet', null, null, this.getTagsForStencil(gn, 'tablet', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.tool;',
					r * 0.5, r * 0.45, '', 'Tool', null, null, this.getTagsForStencil(gn, 'tool', dt).join(' ')),
			this.createVertexTemplateEntry(
					s2 + 'mscae.enterprise.triggers;fillColor=#0078D7;',
					r * 0.47, r * 0.5, '', 'Triggers', null, null, this.getTagsForStencil(gn, 'triggers', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.general.tunnel',
					r * 0.5, r * 0.09, '', 'Tunnel', null, null, this.getTagsForStencil(gn, 'tunnel', dt).join(' ')),
			this.createVertexTemplateEntry(
					s2 + 'mscae.enterprise.udf_function;fillColor=#0078D7;',
					r * 0.47, r * 0.5, '', 'UDF Function', null, null, this.getTagsForStencil(gn, 'udf function', dt).join(' ')),
			this.createVertexTemplateEntry(
					s2 + 'mscae.enterprise.unhealthy;fillColor=#0078D7;',
					r * 0.5, r * 0.41, '', 'Unhealthy', null, null, this.getTagsForStencil(gn, 'unhealthy', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.unhealthy',
					r * 0.5, r * 0.41, '', 'Unhealthy', null, null, this.getTagsForStencil(gn, 'unhealthy', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.usb',
					r * 0.5, r * 0.23, '', 'USB', null, null, this.getTagsForStencil(gn, 'usb', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'azure.user',
					r * 0.47, r * 0.5, '', 'User (enterprise)', null, null, this.getTagsForStencil(gn, 'user', dt).join(' ')),
			this.createVertexTemplateEntry(
					s2 + 'mscae.enterprise.user_permissions;fillColor=#0078D7;',
					r * 0.47, r * 0.5, '', 'User permissions', null, null, this.getTagsForStencil(gn, 'user permissions', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.general.video',
					r * 0.49, r * 0.5, '', 'Video', null, null, this.getTagsForStencil(gn, 'video', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'azure.virtual_machine_feature',
					r * 0.5, r * 0.45, '', 'Virtual Machine', null, null, this.getTagsForStencil(gn, 'virtual machine', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.web_server',
					r * 0.38, r * 0.5, '', 'Web Server', null, null, this.getTagsForStencil(gn, 'web server', dt).join(' ')),
			this.createVertexTemplateEntry(
					s2 + 'mscae.enterprise.website_generic;fillColor=#7D7D7D;',
					r * 0.5, r * 0.44, '', 'Website (generic)', null, null, this.getTagsForStencil(gn, 'website generic', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.windows_server',
					r * 0.39, r * 0.5, '', 'Windows Server', null, null, this.getTagsForStencil(gn, 'windows server', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.wireless_connection',
					r * 0.42, r * 0.5, '', 'Wireless Connection', null, null, this.getTagsForStencil(gn, 'wireless connection', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.workstation_client',
					r * 0.5, r * 0.5, '', 'Workstation Client', null, null, this.getTagsForStencil(gn, 'workstation client', dt).join(' ')),
			this.createVertexTemplateEntry(
					s + 'mscae.enterprise.xml_web_service',
					r * 0.5, r * 0.5, '', 'XML Web Service', null, null, this.getTagsForStencil(gn, 'xml web service', dt).join(' '))
		];
			
		this.addPalette('mscaeEnterpriseFlat', 'CAE / Enterprise (flat)', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};

	Sidebar.prototype.addMSCAEIntuneFlatPalette = function(gn, r, sb)
	{
		var s = 'sketch=0;pointerEvents=1;shadow=0;dashed=0;html=1;strokeColor=none;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;fillColor=#505050;shape=mxgraph.mscae.intune.';
		var s2 = 'sketch=0;pointerEvents=1;shadow=0;dashed=0;html=1;strokeColor=none;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;fillColor=#505050;shape=mxgraph.mscae.';
		var dt = 'ms microsoft cloud enterprise intune';
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'account_portal',
					r * 0.43, r * 0.5, '', 'Account Portal', null, null, this.getTagsForStencil(gn, 'account portal', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'administration',
					r * 0.3, r * 0.5, '', 'Administration', null, null, this.getTagsForStencil(gn, 'administration', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'alerts',
					r * 0.5, r * 0.5, '', 'Alerts', null, null, this.getTagsForStencil(gn, 'alerts', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'apps',
					r * 0.5, r * 0.5, '', 'Apps', null, null, this.getTagsForStencil(gn, 'apps', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'certificate',
					r * 0.5, r * 0.49, '', 'Certificate (Compliance)', null, null, this.getTagsForStencil(gn, 'certificate compliance', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'client_software',
					r * 0.5, r * 0.45, '', 'Client Software Deployment Wizard', null, null, this.getTagsForStencil(gn, 'client software deployment wizard', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'company_portal',
					r * 0.5, r * 0.38, '', 'Company Portal', null, null, this.getTagsForStencil(gn, 'company portal', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'computer_inventory',
					r * 0.5, r * 0.45, '', 'Computer Inventory', null, null, this.getTagsForStencil(gn, 'computer inventory', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'conditional_access_exchange',
					r * 0.49, r * 0.5, '', 'Conditional Access (Exchange)', null, null, this.getTagsForStencil(gn, 'conditional access exchange', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'conditional_access_sharepoint',
					r * 0.44, r * 0.5, '', 'Conditional Access (Sharepoint)', null, null, this.getTagsForStencil(gn, 'conditional access sharepoint', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'connector',
					r * 0.5, r * 0.17, '', 'Connector', null, null, this.getTagsForStencil(gn, 'connector', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'dashboard',
					r * 0.5, r * 0.4, '', 'Dashboard', null, null, this.getTagsForStencil(gn, 'dashboard', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'data_migration_wizard',
					r * 0.5, r * 0.48, '', 'Data Migration Wizard', null, null, this.getTagsForStencil(gn, 'data migration wizard', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'detected_software',
					r * 0.5, r * 0.5, '', 'Detected Software', null, null, this.getTagsForStencil(gn, 'detected software', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'device_group',
					r * 0.5, r * 0.5, '', 'Device Group', null, null, this.getTagsForStencil(gn, 'device group', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'device_health',
					r * 0.5, r * 0.31, '', 'Device Health', null, null, this.getTagsForStencil(gn, 'device_health', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'device_history',
					r * 0.45, r * 0.5, '', 'Device History', null, null, this.getTagsForStencil(gn, 'device history', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'device_os',
					r * 0.49, r * 0.5, '', 'Device OS', null, null, this.getTagsForStencil(gn, 'device os operating system', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'end_protection',
					r * 0.48, r * 0.5, '', 'End Protection', null, null, this.getTagsForStencil(gn, 'end protection', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'exchange_connector',
					r * 0.5, r * 0.49, '', 'Exchange Connector', null, null, this.getTagsForStencil(gn, 'exchange connector', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'groups',
					r * 0.5, r * 0.48, '', 'Groups', null, null, this.getTagsForStencil(gn, 'groups', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'hybrid',
					r * 0.5, r * 0.39, '', 'Hybrid', null, null, this.getTagsForStencil(gn, 'hybrid', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'intune_certificate_profiles',
					r * 0.4, r * 0.5, '', 'Intune Certificate Profiles', null, null, this.getTagsForStencil(gn, 'certificate profiles', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'intune_connector',
					r * 0.82, r * 0.59, '', 'Intune Connector', null, null, this.getTagsForStencil(gn, 'intune connector', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'intune_email_profiles',
					r * 0.5, r * 0.5, '', 'Intune Email Profiles', null, null, this.getTagsForStencil(gn, 'email profiles', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'intune_managed_app',
					r * 0.5, r * 0.38, '', 'Intune Managed App', null, null, this.getTagsForStencil(gn, 'managed app application', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'intune_mobile_application_management',
					r * 0.49, r * 0.5, '', 'Intune Mobile Application Management', null, null, this.getTagsForStencil(gn, 'mobile app aplication management', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'intune_vpn_profiles',
					r * 0.42, r * 0.5, '', 'Intune VPN Profiles', null, null, this.getTagsForStencil(gn, 'vpn virtual private network profiles', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'intune_wifi_profiles',
					r * 0.43, r * 0.5, '', 'Intune WiFi Profiles', null, null, this.getTagsForStencil(gn, 'wifi profiles', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'inventory_license',
					r * 0.5, r * 0.48, '', 'Inventory License', null, null, this.getTagsForStencil(gn, 'inventory license', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'inventory_software',
					r * 0.5, r * 0.49, '', 'Inventory Software', null, null, this.getTagsForStencil(gn, 'inventory software', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'license_group',
					r * 0.5, r * 0.49, '', 'License Group', null, null, this.getTagsForStencil(gn, 'license group', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'license_installation',
					r * 0.5, r * 0.43, '', 'License Installation', null, null, this.getTagsForStencil(gn, 'license installation', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'microsoft_intune',
					r * 0.5, r * 0.4, '', 'MS Intune', null, null, this.getTagsForStencil(gn, 'microsoft', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'mobile_inventory',
					r * 0.44, r * 0.5, '', 'Mobile Inventory', null, null, this.getTagsForStencil(gn, 'mobile inventory', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'noncompliant_apps',
					r * 0.46, r * 0.5, '', 'Noncompliant Apps', null, null, this.getTagsForStencil(gn, 'noncompliant apps applications', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'policy',
					r * 0.5, r * 0.5, '', 'Policy', null, null, this.getTagsForStencil(gn, 'policy', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'protection',
					r * 0.48, r * 0.5, '', 'Protection', null, null, this.getTagsForStencil(gn, 'protection', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'reports',
					r * 0.46, r * 0.5, '', 'Reports', null, null, this.getTagsForStencil(gn, 'reports', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'enterprise.settings',
					r * 0.5, r * 0.5, '', 'Settings', null, null, this.getTagsForStencil(gn, 'settings', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'subscription_portal',
					r * 0.5, r * 0.5, '', 'Subscription Portal', null, null, this.getTagsForStencil(gn, 'subscription portal', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'terms_and_conditions',
					r * 0.37, r * 0.5, '', 'Terms and Conditions', null, null, this.getTagsForStencil(gn, 'terms and conditions', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'update',
					r * 0.48, r * 0.5, '', 'Update', null, null, this.getTagsForStencil(gn, 'update', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'user_group',
					r * 0.5, r * 0.37, '', 'User Group', null, null, this.getTagsForStencil(gn, 'user group', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'user_management',
					r * 0.5, r * 0.46, '', 'User Management', null, null, this.getTagsForStencil(gn, 'user management', dt).join(' '))
		];
			
		this.addPalette('mscaeIntuneFlat', 'CAE / Intune (flat)', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};
	
	Sidebar.prototype.addMSCAEOMSFlatPalette = function(gn, r, sb)
	{
		var s = 'sketch=0;pointerEvents=1;shadow=0;dashed=0;html=1;strokeColor=none;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;fillColor=#505050;shape=mxgraph.mscae.oms.';
		var dt = 'ms microsoft cloud enterprise oms';
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'alerts',
					r * 0.41, r * 0.5, '', 'Alerts', null, null, this.getTagsForStencil(gn, 'alerts', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'app_with_changes',
					r * 0.5, r * 0.32, '', 'App With Changes', null, null, this.getTagsForStencil(gn, 'app with changes', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'assessments',
					r * 0.47, r * 0.5, '', 'Assessments', null, null, this.getTagsForStencil(gn, 'assessments', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'capacity',
					r * 0.41, r * 0.5, '', 'Capacity', null, null, this.getTagsForStencil(gn, 'capacity', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'config_assessment',
					r * 0.5, r * 0.45, '', 'Config Assessment', null, null, this.getTagsForStencil(gn, 'config assessment', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'dashboard',
					r * 0.5, r * 0.41, '', 'Dashboard', null, null, this.getTagsForStencil(gn, 'dashboard', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'dependency_monitor',
					r * 0.5, r * 0.49, '', 'Dependency Monitor', null, null, this.getTagsForStencil(gn, 'dependency monitor', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'diagnostics',
					r * 0.5, r * 0.34, '', 'Diagnostics', null, null, this.getTagsForStencil(gn, 'diagnostics', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'jobs',
					r * 0.5, r * 0.5, '', 'Jobs', null, null, this.getTagsForStencil(gn, 'jobs', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'log_management',
					r * 0.41, r * 0.5, '', 'Log Management', null, null, this.getTagsForStencil(gn, 'log management', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'log_search',
					r * 0.5, r * 0.5, '', 'Log Search', null, null, this.getTagsForStencil(gn, 'log search', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'malware_assessment',
					r * 0.49, r * 0.5, '', 'Malware Assessment', null, null, this.getTagsForStencil(gn, 'malware assessment', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'overview',
					r * 0.5, r * 0.41, '', 'Overview', null, null, this.getTagsForStencil(gn, 'overview', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'security',
					r * 0.5, r * 0.5, '', 'Security', null, null, this.getTagsForStencil(gn, 'security', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'server_width_changes',
					r * 0.47, r * 0.5, '', 'Server Width Changes', null, null, this.getTagsForStencil(gn, 'server width changes', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'services',
					r * 0.49, r * 0.5, '', 'Services', null, null, this.getTagsForStencil(gn, 'services', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'solutions',
					r * 0.5, r * 0.49, '', 'Solutions', null, null, this.getTagsForStencil(gn, 'solutions', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'system_update',
					r * 0.5, r * 0.5, '', 'System Update', null, null, this.getTagsForStencil(gn, 'system update', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'track_changes',
					r * 0.42, r * 0.5, '', 'Track Changes', null, null, this.getTagsForStencil(gn, 'track changes', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'wire_data',
					r * 0.5, r * 0.5, '', 'Wire Data', null, null, this.getTagsForStencil(gn, 'wire data', dt).join(' '))
		];
			
		this.addPalette('mscaeOMSFlat', 'CAE / OMS (flat)', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};
	
	Sidebar.prototype.addMSCAESystemCenterFlatPalette = function(gn, r, sb)
	{
		var s = 'sketch=0;pointerEvents=1;shadow=0;dashed=0;html=1;strokeColor=none;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;fillColor=#515151;shape=mxgraph.mscae.system_center.';
		var s2 = 'sketch=0;pointerEvents=1;shadow=0;dashed=0;html=1;strokeColor=none;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;fillColor=#515151;shape=mxgraph.mscae.';
		var dt = 'ms microsoft cloud enterprise system center';
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'admin_console',
					r * 0.5, r * 0.36, '', 'Admin Console', null, null, this.getTagsForStencil(gn, 'admin console', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'enterprise.database_server',
					r * 0.38, r * 0.5, '', 'Central Administration Site', null, null, this.getTagsForStencil(gn, 'central administration site', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'central_administration_site_sql',
					r * 0.38, r * 0.5, '', 'Central Administration Site SQL', null, null, this.getTagsForStencil(gn, 'central administration site sql', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'cloud_distribution_point',
					r * 0.46, r * 0.5, '', 'Cloud Distribution Point', null, null, this.getTagsForStencil(gn, 'cloud distribution point', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'distribution_point',
					r * 0.44, r * 0.5, '', 'Distribution Point', null, null, this.getTagsForStencil(gn, 'distribution point', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'management_point',
					r * 0.48, r * 0.5, '', 'Management Point', null, null, this.getTagsForStencil(gn, 'management point', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'primary_site',
					r * 0.38, r * 0.5, '', 'Primary Site', null, null, this.getTagsForStencil(gn, 'primary site', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'roles',
					r * 0.42, r * 0.5, '', 'Roles', null, null, this.getTagsForStencil(gn, 'roles', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'secondary_site',
					r * 0.41, r * 0.5, '', 'Secondary Site', null, null, this.getTagsForStencil(gn, 'secondary site', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'software_update_point',
					r * 0.5, r * 0.43, '', 'Software Update Point', null, null, this.getTagsForStencil(gn, 'software update point', dt).join(' '))
		];
			
		this.addPalette('mscaeSystem CenterFlat', 'CAE / System Center (flat)', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};
	
	Sidebar.prototype.addMSCAEAIandMLServicePalette = function(gn, r, sb, s)
	{
		var dt = 'ms microsoft cloud enterprise ai ml service';
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'Batch_AI.svg;',
					r * 0.36, r * 0.5, '', 'Batch AI', null, null, this.getTagsForStencil(gn, 'batch ai', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Bot_Services.svg;',
					r * 0.5, r * 0.5, '', 'Bot Services', null, null, this.getTagsForStencil(gn, 'bot services', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Cognitive_Services.svg;',
					r * 0.5, r * 0.3, '', 'Cognitive Services', null, null, this.getTagsForStencil(gn, 'cognitive services', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Genomics_Accounts.svg;',
					r * 0.26, r * 0.5, '', 'Genomics Accounts', null, null, this.getTagsForStencil(gn, 'genomics accounts', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Machine_Learning_Service_Workspaces.svg;',
					r * 0.46, r * 0.5, '', 'Machine Learning Service Workspaces', null, null, this.getTagsForStencil(gn, 'machine learning service workspaces', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Machine_Learning_Studio_Web_Service_Plans.svg;',
					r * 0.5, r * 0.5, '', 'Machine Learning Studio Web Service Plans', null, null, this.getTagsForStencil(gn, 'machine learning studio web service plans', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Machine_Learning_Studio_Web_Services.svg;',
					r * 0.5, r * 0.5, '', 'Machine Learning Studio Web Services', null, null, this.getTagsForStencil(gn, 'machine learning studio web services', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Machine_Learning_Studio_Workspaces.svg;',
					r * 0.5, r * 0.5, '', 'Machine Learning Studio Workspaces', null, null, this.getTagsForStencil(gn, 'machine learning studio workspaces', dt).join(' '))
		];
			
		this.addPalette('mscaeAI and ML Service', 'CAE / AI and ML Service', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};
	
	Sidebar.prototype.addMSCAEAnalyticsServicePalette = function(gn, r, sb, s)
	{
		var dt = 'ms microsoft cloud enterprise analytics service';
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'Analysis_Services.svg;',
					r * 0.5, r * 0.39, '', 'Analysis Services', null, null, this.getTagsForStencil(gn, 'analysis services', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_Data_Explorer_Clusters.svg;',
					r * 0.5, r * 0.5, '', 'Azure Data Explorer Clusters', null, null, this.getTagsForStencil(gn, 'azure data explorer clusters', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Databricks.svg;',
					r * 0.5, r * 0.48, '', 'Databricks', null, null, this.getTagsForStencil(gn, 'azure databricks', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Data_Factory.svg;',
					r * 0.5, r * 0.5, '', 'Data Factories', null, null, this.getTagsForStencil(gn, 'data factory factories', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Data_Lake_Analytics.svg;',
					r * 0.5, r * 0.5, '', 'Data Lake Analytics', null, null, this.getTagsForStencil(gn, 'data lake analytics', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Data_Lake_Store.svg;',
					r * 0.5, r * 0.39, '', 'Data Lake Store', null, null, this.getTagsForStencil(gn, 'data lake store', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Event_Hub_Clusters.svg;',
					r * 0.5, r * 0.48, '', 'Event Hub Clusters', null, null, this.getTagsForStencil(gn, 'event hub clusters', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Event_Hubs.svg;',
					r * 0.48, r * 0.5, '', 'Event Hubs', null, null, this.getTagsForStencil(gn, 'event hubs', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'HDInsightClusters.svg;',
					r * 0.5, r * 0.49, '', 'HDInsight Clusters', null, null, this.getTagsForStencil(gn, 'hdinsight clusters', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Log_Analytics_Workspaces.svg;',
					r * 0.5, r * 0.5, '', 'Log Analytics Workspaces', null, null, this.getTagsForStencil(gn, 'log analytics workspaces', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Stream_Analytics.svg;',
					r * 0.5, r * 0.39, '', 'Stream Analytics', null, null, this.getTagsForStencil(gn, 'stream analytics', dt).join(' '))
		];
			
		this.addPalette('mscaeAnalytics Service', 'CAE / Analytics Service', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};
	
	Sidebar.prototype.addMSCAEComputeServicePalette = function(gn, r, sb, s)
	{
		var dt = 'ms microsoft cloud enterprise compute service';
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'Batch_Accounts.svg;',
					r * 0.5, r * 0.48, '', 'Batch Accounts', null, null, this.getTagsForStencil(gn, 'batch accounts', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Citrix_Virtual_Desktops_Essentials.svg;',
					r * 0.5, r * 0.5, '', 'Citrix Virtual Desktops Essentials', null, null, this.getTagsForStencil(gn, 'citrix virtual desktops essentials', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Cloud_Services_Classic.svg;',
					r * 0.5, r * 0.42, '', 'Cloud Services (classic)', null, null, this.getTagsForStencil(gn, 'cloud services classic', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Cloud_Service.svg;',
					r * 0.5, r * 0.42, '', 'Cloud Services', null, null, this.getTagsForStencil(gn, 'cloud services', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'CloudSimple_Virtual_Machines.svg;',
					r * 0.5, r * 0.32, '', 'CloudSimple Virtual Machines', null, null, this.getTagsForStencil(gn, 'cloudsimple virtual machines', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'MD_snapshot.svg;',
					r * 0.5, r * 0.42, '', 'Disk Snapshots', null, null, this.getTagsForStencil(gn, 'disk snapshots', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Discs.svg;',
					r * 0.5, r * 0.42, '', 'Disks', null, null, this.getTagsForStencil(gn, 'disks', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Functions.svg;',
					r * 0.5, r * 0.46, '', 'Function Apps', null, null, this.getTagsForStencil(gn, 'function apps', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'SAP_HANA_on_Azure.svg;',
					r * 0.5, r * 0.25, '', 'SAP HANA on Azure', null, null, this.getTagsForStencil(gn, 'sap hana on azure', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Service_Fabric.svg;',
					r * 0.5, r * 0.5, '', 'Service Fabric', null, null, this.getTagsForStencil(gn, 'service fabric', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'VM_Images.svg;',
					r * 0.5, r * 0.46, '', 'VM Images', null, null, this.getTagsForStencil(gn, 'vm virtual machine images', dt).join(' '))
		];
			
		this.addPalette('mscaeCompute Service', 'CAE / Compute Service', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};
	
	Sidebar.prototype.addMSCAEComputeServiceVMPalette = function(gn, r, sb, s)
	{
		var dt = 'ms microsoft cloud enterprise compute service vm virtual machine';
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'Virtual_Machines_Availability_Set.svg;',
					r * 0.5, r * 0.5, '', 'Availability Sets', null, null, this.getTagsForStencil(gn, 'availability sets', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Non_Azure_Machine.svg;',
					r * 0.31, r * 0.5, '', 'Non-Azure Machine', null, null, this.getTagsForStencil(gn, 'non azure machine', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'OS_Images_Classic.svg;',
					r * 0.5, r * 0.46, '', 'OS Images (classic)', null, null, this.getTagsForStencil(gn, 'os images classic', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Virtual_Machine_2.svg;',
					r * 0.5, r * 0.46, '', 'VM', null, null, this.getTagsForStencil(gn, '', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'VM_Scale_Set.svg;',
					r * 0.5, r * 0.5, '', 'VM Scale Sets', null, null, this.getTagsForStencil(gn, 'scale sets', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Virtual_Machine.svg;',
					r * 0.5, r * 0.46, '', 'VM', null, null, this.getTagsForStencil(gn, '', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'VM_Linux.svg;',
					r * 0.5, r * 0.46, '', 'VM (Linux)', null, null, this.getTagsForStencil(gn, 'linux', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'VM_Linux_Non_Azure.svg;',
					r * 0.5, r * 0.46, '', 'VM (Linux, Non-Azure)', null, null, this.getTagsForStencil(gn, 'linux non azure', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'VirtualMachineWindows.svg;',
					r * 0.5, r * 0.46, '', 'VM (Windows)', null, null, this.getTagsForStencil(gn, 'windows', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'VM_Windows_Non_Azure.svg;',
					r * 0.5, r * 0.46, '', 'VM (Windows, Non-Azure)', null, null, this.getTagsForStencil(gn, 'windows non azure', dt).join(' '))
		];
			
		this.addPalette('mscaeCompute Service VM', 'CAE / Compute Service VM', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};
	
	Sidebar.prototype.addMSCAEContainerServiceVMPalette = function(gn, r, sb, s)
	{
		var dt = 'ms microsoft cloud enterprise container service';
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'Container_Instances.svg;',
					r * 0.5, r * 0.5, '', 'Container Instances', null, null, this.getTagsForStencil(gn, 'container instances', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Container_Registries.svg;',
					r * 0.5, r * 0.43, '', 'Container Registries', null, null, this.getTagsForStencil(gn, 'container registries', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Kubernetes_Services.svg;',
					r * 0.5, r * 0.37, '', 'Kubernetes Services', null, null, this.getTagsForStencil(gn, 'kubernetes services', dt).join(' '))
		];
			
		this.addPalette('mscaeContainer Service', 'CAE / Container Service', false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addMSCAEDatabasesServicePalette = function(gn, r, sb, s)
	{
		var dt = 'ms microsoft cloud enterprise database databases db service';
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'Azure_Cache_for_Redis.svg;',
					r * 0.5, r * 0.5, '', 'Azure Cache for Redis', null, null, this.getTagsForStencil(gn, 'azure cache for redis', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Cache_including_Redis.svg;',
					r * 0.5, r * 0.5, '', 'Cache plus Redis', null, null, this.getTagsForStencil(gn, 'cache including plus redis', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'CosmosDB.svg;',
					r * 0.5, r * 0.5, '', 'CosmosDB', null, null, this.getTagsForStencil(gn, 'cosmosdb db database', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Database_General.svg;',
					r * 0.38, r * 0.5, '', 'Database (generic)', null, null, this.getTagsForStencil(gn, 'database generic', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'aspect=fixed;html=1;perimeter=none;align=center;shadow=0;dashed=0;fontSize=12;image=img/lib/mscae/Azure_Database_for_MariaDB_servers.svg;',
					r * 0.38, r * 0.5, '', 'Azure Database for MariaDB servers', null, null, this.getTagsForStencil(gn, 'azure database for mariadb servers', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_Database_for_MySQL_servers.svg;',
					r * 0.38, r * 0.5, '', 'Azure Database for MySQL servers', null, null, this.getTagsForStencil(gn, 'azure database db for mysql servers', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_Database_for_PostgreSQL_servers.svg;',
					r * 0.38, r * 0.5, '', 'Azure Database for PostgreSQL servers', null, null, this.getTagsForStencil(gn, 'azure database db for postgresql servers', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'SQL_DataWarehouse.svg;',
					r * 0.5, r * 0.48, '', 'Azure SQL DataWarehouse', null, null, this.getTagsForStencil(gn, 'azure sql datawarehouse', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'BlobBlock.svg;',
					r * 0.5, r * 0.42, '', 'Blob Storage', null, null, this.getTagsForStencil(gn, 'blob storage', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Data_Lake.svg;',
					r * 0.38, r * 0.5, '', 'Data Lake', null, null, this.getTagsForStencil(gn, 'data lake', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Elastic_Database_Pools.svg;',
					r * 0.5, r * 0.5, '', 'Elastic Database Pools', null, null, this.getTagsForStencil(gn, 'elastic database pools', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Elastic_Job_Agents.svg;',
					r * 0.42, r * 0.5, '', 'Elastic Job Agents', null, null, this.getTagsForStencil(gn, 'elastic job agents', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Managed_Databases.svg;',
					r * 0.47, r * 0.5, '', 'Managed Databases', null, null, this.getTagsForStencil(gn, 'managed databases', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'SQL_Database_generic.svg;',
					r * 0.38, r * 0.5, '', 'SQL Databases', null, null, this.getTagsForStencil(gn, 'sql databases', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'SQL_Managed_Instances.svg;',
					r * 0.38, r * 0.5, '', 'SQL Managed Instances', null, null, this.getTagsForStencil(gn, 'sql managed instances', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'dep/SQL_Server_Stretch_DB.svg;',
					r * 0.5, r * 0.5, '', 'SQL Server Stretch DB', null, null, this.getTagsForStencil(gn, 'sql server stretch db database', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'SQL_Servers.svg;',
					r * 0.5, r * 0.5, '', 'SQL Servers', null, null, this.getTagsForStencil(gn, 'sql servers', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Virtual_Clusters.svg;',
					r * 0.5, r * 0.48, '', 'Virtual Clusters', null, null, this.getTagsForStencil(gn, 'virtual clusters', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Virtual_Datacenter.svg;',
					r * 0.5, r * 0.5, '', 'Virtual Datacenter', null, null, this.getTagsForStencil(gn, 'virtual datacenter', dt).join(' '))
		];
			
		this.addPalette('mscaeDatabases Service', 'CAE / Databases Service', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};
	
	Sidebar.prototype.addMSCAEDevOpsServicePalette = function(gn, r, sb, s)
	{
		var dt = 'ms microsoft cloud enterprise devops service';
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'Application_Insights.svg;',
					r * 0.32, r * 0.5, '', 'Application Insights', null, null, this.getTagsForStencil(gn, 'application insights', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_Artifacts.svg;',
					r * 0.5, r * 0.5, '', 'Azure Artifacts', null, null, this.getTagsForStencil(gn, 'azure artifacts', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_Boards.svg;',
					r * 0.5, r * 0.5, '', 'Azure Boards', null, null, this.getTagsForStencil(gn, 'azure boards', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_DevOps.svg;',
					r * 0.5, r * 0.5, '', 'Azure DevOps', null, null, this.getTagsForStencil(gn, 'azure devops', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'DevTest_Labs.svg;',
					r * 0.5, r * 0.5, '', 'Azure DevTest Labs', null, null, this.getTagsForStencil(gn, 'azure devtest labs', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_Pipelines.svg;',
					r * 0.5, r * 0.5, '', 'Azure Pipelines', null, null, this.getTagsForStencil(gn, 'azure pipelines', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_Repos.svg;',
					r * 0.45, r * 0.5, '', 'Azure Repos', null, null, this.getTagsForStencil(gn, 'azure repos', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_Test_Plans.svg;',
					r * 0.45, r * 0.5, '', 'Azure Test Plans', null, null, this.getTagsForStencil(gn, 'azure test plans', dt).join(' '))
		];
			
		this.addPalette('mscaeDevOps Service', 'CAE / DevOps Service', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};
	
	Sidebar.prototype.addMSCAEGeneralServicePalette = function(gn, r, sb, s)
	{
		var dt = 'ms microsoft cloud enterprise general service';
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'Grid3x3.svg;',
					r * 0.5, r * 0.5, '', 'All Resources', null, null, this.getTagsForStencil(gn, 'all resources', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_Home.svg;',
					r * 0.5, r * 0.4, '', 'Azure Home', null, null, this.getTagsForStencil(gn, 'azure home', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Developer_Tools.svg;',
					r * 0.47, r * 0.5, '', 'Developer Tools', null, null, this.getTagsForStencil(gn, 'developer tools', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Support_2.svg;',
					r * 0.32, r * 0.5, '', 'Help, Support', null, null, this.getTagsForStencil(gn, 'help support', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Info_2.svg;',
					r * 0.5, r * 0.5, '', 'Information', null, null, this.getTagsForStencil(gn, 'info information', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Management_Groups.svg;',
					r * 0.5, r * 0.4, '', 'Management Groups', null, null, this.getTagsForStencil(gn, 'management groups', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Store_Marketplace.svg;',
					r * 0.44, r * 0.5, '', 'Marketplace', null, null, this.getTagsForStencil(gn, 'marketplace store', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Store_Marketplace.svg;',
					r * 0.44, r * 0.5, '', 'Marketplace', null, null, this.getTagsForStencil(gn, 'marketplace store', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Quick_Start_Center.svg;',
					r * 0.5, r * 0.5, '', 'Quick Start Center', null, null, this.getTagsForStencil(gn, 'quick start center', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Clock.svg;',
					r * 0.5, r * 0.5, '', 'Recent', null, null, this.getTagsForStencil(gn, 'clock recent', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Reservations.svg;',
					r * 0.5, r * 0.5, '', 'Reservations', null, null, this.getTagsForStencil(gn, 'reservations', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'ResourceGroup.svg;',
					r * 0.5, r * 0.4, '', 'Resource Groups', null, null, this.getTagsForStencil(gn, 'resource group groups', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'ServiceHealth.svg;',
					r * 0.5, r * 0.44, '', 'Service Health', null, null, this.getTagsForStencil(gn, 'service health', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Shared_Dashboard.svg;',
					r * 0.5, r * 0.41, '', 'Shared Dashboard', null, null, this.getTagsForStencil(gn, 'shared dashboard', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Key.svg;',
					r * 0.31, r * 0.5, '', 'Subscriptions', null, null, this.getTagsForStencil(gn, 'subscriptions key', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Support_Requests.svg;',
					r * 0.5, r * 0.46, '', 'Support Requests', null, null, this.getTagsForStencil(gn, 'support requests', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Tag.svg;',
					r * 0.5, r * 0.5, '', 'Tag', null, null, this.getTagsForStencil(gn, 'tag', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Tags.svg;',
					r * 0.42, r * 0.5, '', 'Tags', null, null, this.getTagsForStencil(gn, 'tags', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Templates.svg;',
					r * 0.44, r * 0.5, '', 'Templates', null, null, this.getTagsForStencil(gn, 'templates', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Two_User_Icon.svg;',
					r * 0.5, r * 0.5, '', 'Two User Icon', null, null, this.getTagsForStencil(gn, 'two user icon', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'User_Health_Icon.svg;',
					r * 0.46, r * 0.5, '', 'User Health Icon', null, null, this.getTagsForStencil(gn, 'user health icon', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Person.svg;',
					r * 0.37, r * 0.5, '', 'User', null, null, this.getTagsForStencil(gn, 'user person', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'User_Privacy.svg;',
					r * 0.36, r * 0.5, '', 'User Privacy', null, null, this.getTagsForStencil(gn, 'user privacy', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'User_Resource.svg;',
					r * 0.48, r * 0.5, '', 'User Resource', null, null, this.getTagsForStencil(gn, 'user resource', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Info.svg;',
					r * 0.5, r * 0.5, '', 'What\'s New', null, null, this.getTagsForStencil(gn, 'info whats new', dt).join(' '))
		];
			
		this.addPalette('mscaeGeneral Service', 'CAE / General Service', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};
	
	Sidebar.prototype.addMSCAEIdentityServicePalette = function(gn, r, sb, s)
	{
		var dt = 'ms microsoft cloud enterprise identity service';
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'Access_Review.svg;',
					r * 0.5, r * 0.5, '', 'Access Review', null, null, this.getTagsForStencil(gn, 'access review', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Active_Directory_Health_Monitoring.svg;',
					r * 0.5, r * 0.5, '', 'Active Directory Connect Health', null, null, this.getTagsForStencil(gn, 'active directory connect health', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Active_Directory.svg;',
					r * 0.5, r * 0.5, '', 'Active Directory', null, null, this.getTagsForStencil(gn, 'active directory', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'App_Registrations.svg;',
					r * 0.5, r * 0.5, '', 'App Registrations', null, null, this.getTagsForStencil(gn, 'app registrations', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_AD_B2C.svg;',
					r * 0.5, r * 0.46, '', 'Azure AD B2C', null, null, this.getTagsForStencil(gn, 'azure ad b2c', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_AD_Domain_Services.svg;',
					r * 0.5, r * 0.5, '', 'Azure AD Domain Services', null, null, this.getTagsForStencil(gn, 'azure ad domain services', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_AD_Identity_Protection.svg;',
					r * 0.5, r * 0.5, '', 'Azure AD Identity Protection', null, null, this.getTagsForStencil(gn, 'azure ad identity protection', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_AD_Privileged_Identity_Management.svg;',
					r * 0.5, r * 0.5, '', 'Azure AD Privileged Identity Management', null, null, this.getTagsForStencil(gn, 'azure ad privileged identity management', dt).join(' ')),
			this.createVertexTemplateEntry('sketch=0;aspect=fixed;shadow=0;dashed=0;html=1;strokeColor=none;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;shape=mxgraph.mscae.cloud.azure_rights_management_rms;fillColor=#58B4D9;',
					r * 0.42, r * 0.5, '', 'Azure Information Protection', null, null, this.getTagsForStencil(gn, 'azure information protection', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Security_Center.svg;',
					r * 0.36, r * 0.5, '', 'Conditional Access', null, null, this.getTagsForStencil(gn, 'conditional access security center', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Enterprise_Applications.svg;',
					r * 0.49, r * 0.5, '', 'Enterprise Applications', null, null, this.getTagsForStencil(gn, 'enterprise applications', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Identity_Governance.svg;',
					r * 0.5, r * 0.5, '', 'Identity Governance', null, null, this.getTagsForStencil(gn, 'identity governance', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Managed_Identities.svg;',
					r * 0.38, r * 0.5, '', 'Managed Identities', null, null, this.getTagsForStencil(gn, 'managed identities', dt).join(' '))
		];
			
		this.addPalette('mscaeIdentity Service', 'CAE / Identity Service', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};
	
	Sidebar.prototype.addMSCAEIntegrationServicePalette = function(gn, r, sb, s)
	{
		var dt = 'ms microsoft cloud enterprise integration service';
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'API_Management.svg;',
					r * 0.5, r * 0.42, '', 'API Management Service', null, null, this.getTagsForStencil(gn, 'api application programming interface management service', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'App_Configuration.svg;',
					r * 0.5, r * 0.49, '', 'App Configuration', null, null, this.getTagsForStencil(gn, 'app configuration', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_API_for_FHIR.svg;',
					r * 0.5, r * 0.5, '', 'Azure API for FHIR', null, null, this.getTagsForStencil(gn, 'azure api application programming interface for fhir', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Data_Catalog.svg;',
					r * 0.47, r * 0.5, '', 'Azure Data Catalog', null, null, this.getTagsForStencil(gn, 'azure data catalog', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Service_Bus_Relay.svg;',
					r * 0.5, r * 0.5, '', 'Azure Service Bus Relays', null, null, this.getTagsForStencil(gn, 'azure service bus relay relays', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Service_Bus_Relay.svg;',
					r * 0.5, r * 0.5, '', 'Azure Service Bus Relays', null, null, this.getTagsForStencil(gn, 'azure service bus relay relays', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Service_Bus.svg;',
					r * 0.5, r * 0.5, '', 'Azure Service Bus', null, null, this.getTagsForStencil(gn, 'azure service bus', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'StorSimple.svg;',
					r * 0.5, r * 0.45, '', 'Azure StorSimple Device Managers', null, null, this.getTagsForStencil(gn, 'azure storsimple device managers', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Event_Grid.svg;',
					r * 0.5, r * 0.5, '', 'Event Grid Domains and Subscriptions', null, null, this.getTagsForStencil(gn, 'event grid domains subscriptions', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Event_Grid_Topics.svg;',
					r * 0.5, r * 0.5, '', 'Event Grid Topics', null, null, this.getTagsForStencil(gn, 'event grid topics', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Event_Grid_Topics.svg;',
					r * 0.5, r * 0.5, '', 'Event Grid Topics', null, null, this.getTagsForStencil(gn, 'event grid topics', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Integration_Accounts.svg;',
					r * 0.5, r * 0.5, '', 'Integration Accounts', null, null, this.getTagsForStencil(gn, 'integration accounts', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Integration_Service_Environments.svg;',
					r * 0.5, r * 0.5, '', 'Integration Service Environments', null, null, this.getTagsForStencil(gn, 'integration service environments', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Logic_Apps_Custom_Connector.svg;',
					r * 0.5, r * 0.5, '', 'Logic Apps Custom Connector', null, null, this.getTagsForStencil(gn, 'logic apps custom connector', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Logic_Apps.svg;',
					r * 0.5, r * 0.39, '', 'Logic Apps', null, null, this.getTagsForStencil(gn, 'logic apps', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'SendGrid_Accounts.svg;',
					r * 0.5, r * 0.5, '', 'SendGrid Accounts', null, null, this.getTagsForStencil(gn, 'sendgrid accounts', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Service_Catalog_Managed_Application_Definitions.svg;',
					r * 0.47, r * 0.5, '', 'Service Catalog Managed Application Definitions', null, null, this.getTagsForStencil(gn, 'service catalog managed application definitions', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Software_as_a_Service.svg;',
					r * 0.5, r * 0.5, '', 'Software as a Service (SaaS)', null, null, this.getTagsForStencil(gn, 'software service saas', dt).join(' '))
		];
			
		this.addPalette('mscaeIntegration Service', 'CAE / Integration Service', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};
	
	Sidebar.prototype.addMSCAEInternetOfThingsServicePalette = function(gn, r, sb, s)
	{
		var dt = 'ms microsoft cloud enterprise iot internet of things';
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'Azure_Digital_Twins.svg;',
					r * 0.45, r * 0.5, '', 'Azure Digital Twins', null, null, this.getTagsForStencil(gn, 'azure digital twins', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_IoT_Hub_Security.svg;',
					r * 0.37, r * 0.5, '', 'Azure IoT Hub Security', null, null, this.getTagsForStencil(gn, 'azure hub security', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_IoT_Hub.svg;',
					r * 0.5, r * 0.5, '', 'Azure IoT Hub', null, null, this.getTagsForStencil(gn, 'azure hub', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_Maps.svg;',
					r * 0.39, r * 0.5, '', 'Azure Maps', null, null, this.getTagsForStencil(gn, 'azure maps', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_Sphere.svg;',
					r * 0.48, r * 0.5, '', 'Azure Sphere', null, null, this.getTagsForStencil(gn, 'azure sphere', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Device_Provisioning_Services.svg;',
					r * 0.48, r * 0.5, '', 'Device Provisioning Services', null, null, this.getTagsForStencil(gn, 'device provisioning services', dt).join(' ')),
			this.createVertexTemplateEntry('aspect=fixed;shadow=0;dashed=0;html=1;strokeColor=none;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;shape=mxgraph.mscae.cloud.central;fillColor=#0079D6;pointerEvents=1;',
					r * 0.44, r * 0.5, '', 'IoT Central Applications', null, null, this.getTagsForStencil(gn, 'central applications', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Time_Series_Insights_environments.svg;',
					r * 0.49, r * 0.5, '', 'Time Series Insights environments', null, null, this.getTagsForStencil(gn, 'time series insights environments', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Input.svg;',
					r * 0.5, r * 0.45, '', 'Time Series Insights Events Sources', null, null, this.getTagsForStencil(gn, 'time series insights events sources input', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Windows_10_IoT_Core_Services.svg;',
					r * 0.5, r * 0.5, '', 'Windows 10 IoT Core Services', null, null, this.getTagsForStencil(gn, 'windows 10 core services', dt).join(' '))
		];
			
		this.addPalette('mscaeInternet of Things Service', 'CAE / Internet of Things Service', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};
	
	Sidebar.prototype.addMSCAEIntuneServicePalette = function(gn, r, sb, s)
	{
		var dt = 'ms microsoft cloud enterprise intune service';
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'Client_Apps.svg;',
					r * 0.5, r * 0.5, '', 'Client Apps', null, null, this.getTagsForStencil(gn, 'client apps', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Dedicated_Event_Hub.svg;',
					r * 0.5, r * 0.48, '', 'Dedicated Event Hub', null, null, this.getTagsForStencil(gn, 'dedicated event hub', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Device_Compliance.svg;',
					r * 0.41, r * 0.5, '', 'Device Compliance', null, null, this.getTagsForStencil(gn, 'device compliance', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Device_Config.svg;',
					r * 0.44, r * 0.5, '', 'Device Config', null, null, this.getTagsForStencil(gn, 'device config', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Devices_Groups.svg;',
					r * 0.5, r * 0.5, '', 'Devices Groups', null, null, this.getTagsForStencil(gn, 'devices groups', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'eBooks.svg;',
					r * 0.5, r * 0.41, '', 'eBooks', null, null, this.getTagsForStencil(gn, 'ebooks', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Enrollment.svg;',
					r * 0.5, r * 0.5, '', 'Enrollment', null, null, this.getTagsForStencil(gn, 'enrollment', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Exchange_On_premises_Access.svg;',
					r * 0.29, r * 0.5, '', 'Exchange On-premises Access', null, null, this.getTagsForStencil(gn, 'exchange on premises access', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Intune_App_Protection.svg;',
					r * 0.5, r * 0.4, '', 'Intune App Protection', null, null, this.getTagsForStencil(gn, 'intune app protection', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Managed_Desktop.svg;',
					r * 0.5, r * 0.36, '', 'Managed Desktop', null, null, this.getTagsForStencil(gn, 'managed desktop', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Security_Baselines.svg;',
					r * 0.44, r * 0.5, '', 'Security Baselines', null, null, this.getTagsForStencil(gn, 'security baselines', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Software_Update.svg;',
					r * 0.5, r * 0.45, '', 'Software Update', null, null, this.getTagsForStencil(gn, 'software update', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Tools.svg;',
					r * 0.47, r * 0.5, '', 'Tools', null, null, this.getTagsForStencil(gn, 'tools', dt).join(' '))
		];
			
		this.addPalette('mscaeIntune Service', 'CAE / Intune Service', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};
	
	Sidebar.prototype.addMSCAEManagementGovernanceServicePalette = function(gn, r, sb, s)
	{
		var dt = 'ms microsoft cloud enterprise management and governance service';
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'Log.svg;',
					r * 0.45, r * 0.5, '', 'Activity Log', null, null, this.getTagsForStencil(gn, 'activity log', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Advisor.svg;',
					r * 0.5, r * 0.5, '', 'Advisor', null, null, this.getTagsForStencil(gn, 'advisor', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Notification.svg;',
					r * 0.5, r * 0.5, '', 'Alerts', null, null, this.getTagsForStencil(gn, 'notification alert alerts', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Automation.svg;',
					r * 0.5, r * 0.5, '', 'Automation Accounts', null, null, this.getTagsForStencil(gn, 'automation accounts', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Blueprints.svg;',
					r * 0.5, r * 0.48, '', 'Blueprints', null, null, this.getTagsForStencil(gn, 'blueprints', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'BillingHub.svg;',
					r * 0.5, r * 0.5, '', 'BillingHub', null, null, this.getTagsForStencil(gn, 'billinghub', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'LogDiagnostics.svg;',
					r * 0.45, r * 0.5, '', 'Diagnostic Settings', null, null, this.getTagsForStencil(gn, 'diagnostic settings log', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Free_Services.svg;',
					r * 0.5, r * 0.46, '', 'Free Services', null, null, this.getTagsForStencil(gn, 'free services', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Guest_Assignments.svg;',
					r * 0.44, r * 0.5, '', 'Guest Assignments', null, null, this.getTagsForStencil(gn, 'guest assignments', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Managed_Applications.svg;',
					r * 0.47, r * 0.5, '', 'Managed Applications', null, null, this.getTagsForStencil(gn, 'managed applications', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Chart.svg;',
					r * 0.5, r * 0.48, '', 'Metrics', null, null, this.getTagsForStencil(gn, 'metrics chart', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Monitor.svg;',
					r * 0.5, r * 0.5, '', 'Monitor', null, null, this.getTagsForStencil(gn, 'monitor', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Network_watcher.svg;',
					r * 0.5, r * 0.5, '', 'Network Watcher', null, null, this.getTagsForStencil(gn, 'network watcher', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Policy.svg;',
					r * 0.45, r * 0.5, '', 'Policy', null, null, this.getTagsForStencil(gn, 'policy', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Backup.svg;',
					r * 0.5, r * 0.42, '', 'Recovery Services Vault', null, null, this.getTagsForStencil(gn, 'recovery services vault backup', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Resource_Graph_Explorer.svg;',
					r * 0.49, r * 0.5, '', 'Resource Graph Explorer', null, null, this.getTagsForStencil(gn, 'resource graph explorer', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'SchedulerJobCollection.svg;',
					r * 0.5, r * 0.43, '', 'Scheduler Job Collections', null, null, this.getTagsForStencil(gn, 'scheduler job collection collections', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Solutions.svg;',
					r * 0.5, r * 0.5, '', 'Solutions', null, null, this.getTagsForStencil(gn, 'solutions', dt).join(' '))
		];
			
		this.addPalette('mscaeManagement and Governance Service', 'CAE / Management and Governance Service', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};
	
	Sidebar.prototype.addMSCAEManagementGovernanceMediaServicePalette = function(gn, r, sb, s)
	{
		var dt = 'ms microsoft cloud enterprise management and governance service media';
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'Azure_Media_Player.svg;',
					r * 0.45, r * 0.5, '', 'Azure Media Player', null, null, this.getTagsForStencil(gn, 'azure media player', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Content_Protection.svg;',
					r * 0.45, r * 0.5, '', 'Content Protection', null, null, this.getTagsForStencil(gn, 'content protection', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Media_Encoding.svg;',
					r * 0.43, r * 0.5, '', 'Media Encoding', null, null, this.getTagsForStencil(gn, 'media encoding', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Media_On_Demand.svg;',
					r * 0.5, r * 0.5, '', 'Media On Demand', null, null, this.getTagsForStencil(gn, 'media_on_demand', dt).join(' '))
		];
			
		this.addPalette('mscaeManagement and Governance Service Media', 'CAE / Management and Governance Service - Media', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};
	
	Sidebar.prototype.addMSCAEMigrateServicePalette = function(gn, r, sb, s)
	{
		var dt = 'ms microsoft cloud enterprise migrate service';
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'Azure_Database_Migration_Services.svg;',
					r * 0.5, r * 0.5, '', 'Azure Database Migration Services', null, null, this.getTagsForStencil(gn, 'azure database migration services', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Migration_Projects.svg;',
					r * 0.5, r * 0.32, '', 'Migration Projects', null, null, this.getTagsForStencil(gn, 'migration projects', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Backup.svg;',
					r * 0.5, r * 0.42, '', 'Recovery Services Vaults', null, null, this.getTagsForStencil(gn, 'recovery services vaults vault', dt).join(' '))
		];
			
		this.addPalette('mscaeMigrate Service', 'CAE / Migrate Service', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};
	
	Sidebar.prototype.addMSCAEMixedRealityServicePalette = function(gn, r, sb, s)
	{
		var dt = 'ms microsoft cloud enterprise mixed reality service';
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'Spatial_Anchor.svg;',
					r * 0.48, r * 0.5, '', 'Spatial Anchor', null, null, this.getTagsForStencil(gn, 'spatial anchor', dt).join(' '))
		];
			
		this.addPalette('mscaeMixed Reality Service', 'CAE / Mixed Reality Service', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};
	
	Sidebar.prototype.addMSCAEMobileServicePalette = function(gn, r, sb, s)
	{
		var dt = 'ms microsoft cloud enterprise mobile service';
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'App_Service_Mobile_App.svg;',
					r * 0.34, r * 0.5, '', 'Azure App Service - Mobile', null, null, this.getTagsForStencil(gn, 'azure app service mobile', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Mobile_Engagement.svg;',
					r * 0.34, r * 0.5, '', 'Azure Mobile Engagement', null, null, this.getTagsForStencil(gn, 'azure mobile engagement', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Notification_Hubs.svg;',
					r * 0.5, r * 0.5, '', 'Notification_Hubs', null, null, this.getTagsForStencil(gn, 'notification hubs', dt).join(' '))
		];
			
		this.addPalette('mscaeMobile Service', 'CAE / Mobile Service', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};
	
	Sidebar.prototype.addMSCAENetworkingServicePalette = function(gn, r, sb, s)
	{
		var dt = 'ms microsoft cloud enterprise networking service';
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'Application_Gateway.svg;',
					r * 0.5, r * 0.5, '', 'Application Gateway', null, null, this.getTagsForStencil(gn, 'application gateway', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Application_Security_Groups.svg;',
					r * 0.37, r * 0.5, '', 'Application Security Groups', null, null, this.getTagsForStencil(gn, 'application security groups', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_Firewall.svg;',
					r * 0.5, r * 0.5, '', 'Azure Firewall', null, null, this.getTagsForStencil(gn, 'azure firewall', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Content_Delivery_Network.svg;',
					r * 0.5, r * 0.23, '', 'CDN Profiles', null, null, this.getTagsForStencil(gn, 'cdn profiles content delivery network', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Connections.svg;',
					r * 0.5, r * 0.5, '', 'Connections', null, null, this.getTagsForStencil(gn, 'connections', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Connections.svg;',
					r * 0.5, r * 0.5, '', 'Connections', null, null, this.getTagsForStencil(gn, 'connections', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'DDOS_Protection_Plans.svg;',
					r * 0.37, r * 0.5, '', 'DDOS Protection Plans', null, null, this.getTagsForStencil(gn, 'ddos protection plans', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'DNS_Private_Zones.svg;',
					r * 0.5, r * 0.5, '', 'DNS Private Zones', null, null, this.getTagsForStencil(gn, 'dns domain name server private zones', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'DNS.svg;',
					r * 0.5, r * 0.5, '', 'DNS Zones', null, null, this.getTagsForStencil(gn, 'dns domain name server zones', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Express_Route.svg;',
					r * 0.5, r * 0.3, '', 'Express Route Circuits', null, null, this.getTagsForStencil(gn, 'express route circuits', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Front_Doors.svg;',
					r * 0.5, r * 0.44, '', 'Front Doors', null, null, this.getTagsForStencil(gn, 'front doors', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Load_Balancer_feature.svg;',
					r * 0.5, r * 0.5, '', 'Load Balancers', null, null, this.getTagsForStencil(gn, 'load balancer balancers', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Local_Network_Gateways.svg;',
					r * 0.5, r * 0.5, '', 'Local Network Gateways', null, null, this.getTagsForStencil(gn, 'local network gateways', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'NetworkInterfaceCard.svg;',
					r * 0.44, r * 0.5, '', 'Network Interface Card', null, null, this.getTagsForStencil(gn, 'network interface card', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Network_Security_Groups_Classic.svg;',
					r * 0.37, r * 0.5, '', 'Network Security Groups (Classic)', null, null, this.getTagsForStencil(gn, 'network security group classic', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Network_watcher.svg;',
					r * 0.5, r * 0.5, '', 'Network Watcher', null, null, this.getTagsForStencil(gn, 'network watcher', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'On_Premises_Data_Gateways.svg;',
					r * 0.5, r * 0.5, '', 'On-Premises Data Gateways', null, null, this.getTagsForStencil(gn, 'on premises data gateways', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'App_Service_IPAddress.svg;',
					r * 0.5, r * 0.42, '', 'Public IP Addresses', null, null, this.getTagsForStencil(gn, 'app service ip internet protocol address addresses', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'ClassicIPAddress.svg;',
					r * 0.5, r * 0.42, '', 'Reserved IP Addresses (Classic)', null, null, this.getTagsForStencil(gn, 'classic ip internet protocol address adresses', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Route_Filter.svg;',
					r * 0.5, r * 0.42, '', 'Route Filters', null, null, this.getTagsForStencil(gn, 'route filters', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'UserDefinedRoute.svg;',
					r * 0.5, r * 0.5, '', 'Route Tables', null, null, this.getTagsForStencil(gn, 'route tables', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Service_Endpoint_Policies.svg;',
					r * 0.49, r * 0.5, '', 'Service Endpoint Policies', null, null, this.getTagsForStencil(gn, 'service endpoint policies', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Traffic_Manager.svg;',
					r * 0.5, r * 0.5, '', 'Traffic Manager Profiles', null, null, this.getTagsForStencil(gn, 'traffic manager profiles', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Virtual_Network_Classic.svg;',
					r * 0.5, r * 0.28, '', 'Virtual Network (Classic)', null, null, this.getTagsForStencil(gn, 'virtual network classic', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'VPN_Gateway.svg;',
					r * 0.45, r * 0.5, '', 'Virtual Network Gateways', null, null, this.getTagsForStencil(gn, 'vpn gateway gateways virtual private network', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Virtual_Network.svg;',
					r * 0.5, r * 0.28, '', 'Virtual Networks', null, null, this.getTagsForStencil(gn, 'virtual network networks', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Virtual_WANs.svg;',
					r * 0.5, r * 0.5, '', 'Virtual WANs', null, null, this.getTagsForStencil(gn, 'virtual wans wan wide area network networks', dt).join(' '))
		];
			
		this.addPalette('mscaeNetworking Service', 'CAE / Networking Service', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};
	
	Sidebar.prototype.addMSCAEOtherCategoryServicePalette = function(gn, r, sb, s)
	{
		var dt = 'ms microsoft cloud enterprise other category service';
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'CloudSimple_Nodes.svg;',
					r * 0.49, r * 0.5, '', 'CloudSimple Nodes', null, null, this.getTagsForStencil(gn, 'cloudsimple nodes', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'CloudSimple_Services.svg;',
					r * 0.5, r * 0.5, '', 'CloudSimple Services', null, null, this.getTagsForStencil(gn, 'cloudsimple services', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'CloudSimple_Virtual_Machines.svg;',
					r * 0.5, r * 0.32, '', 'CloudSimple Virtual Machines', null, null, this.getTagsForStencil(gn, 'cloudsimple virtual machines', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Controllers.svg;',
					r * 0.5, r * 0.44, '', 'Controllers', null, null, this.getTagsForStencil(gn, 'controllers', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Customer_Lockbox.svg;',
					r * 0.47, r * 0.5, '', 'Customer Lockbox', null, null, this.getTagsForStencil(gn, 'customer lockbox', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Education.svg;',
					r * 0.5, r * 0.39, '', 'Education', null, null, this.getTagsForStencil(gn, 'education', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Image_Definitions.svg;',
					r * 0.5, r * 0.39, '', 'Image Definitions', null, null, this.getTagsForStencil(gn, 'image definitions', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Image_Versions.svg;',
					r * 0.5, r * 0.48, '', 'Image Versions', null, null, this.getTagsForStencil(gn, 'image versions', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Resource_Explorer.svg;',
					r * 0.5, r * 0.46, '', 'Resource Explorer', null, null, this.getTagsForStencil(gn, 'resource explorer', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Shared_Image_Galleries.svg;',
					r * 0.5, r * 0.5, '', 'Shared Image Galleries', null, null, this.getTagsForStencil(gn, 'shared image galleries', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Tenant_Status.svg;',
				r * 0.46, r * 0.5, '', 'Tenant Status', null, null, this.getTagsForStencil(gn, 'tenant status', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Web_App_Firewall.svg;',
					r * 0.5, r * 0.5, '', 'Web App Firewall', null, null, this.getTagsForStencil(gn, 'web app firewall', dt).join(' '))
		];
			
		this.addPalette('mscaeOther Category Service', 'CAE / Other Category Service', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};
	
	Sidebar.prototype.addMSCAESecurityServicePalette = function(gn, r, sb, s)
	{
		var dt = 'ms microsoft cloud enterprise security service';
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'Azure_Sentinel.svg;',
					r * 0.44, r * 0.5, '', 'Azure Sentinel', null, null, this.getTagsForStencil(gn, 'azure sentinel', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Key_Vaults.svg;',
					r * 0.48, r * 0.5, '', 'Key Vaults', null, null, this.getTagsForStencil(gn, 'key vaults', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Security_Center.svg;',
					r * 0.36, r * 0.5, '', 'Security Center', null, null, this.getTagsForStencil(gn, 'security center', dt).join(' '))
		];
			
		this.addPalette('mscaeSecurity Service', 'CAE / Security Service', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};
	
	Sidebar.prototype.addMSCAEStorageServicePalette = function(gn, r, sb, s)
	{
		var dt = 'ms microsoft cloud enterprise storage service';
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'Archive_Storage.svg;',
					r * 0.5, r * 0.48, '', 'Archive Storage', null, null, this.getTagsForStencil(gn, 'archive storage', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Azure_NetApp_files.svg;',
					r * 0.5, r * 0.42, '', 'Azure NetApp files', null, null, this.getTagsForStencil(gn, 'azure netapp files', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'StorSimple.svg;',
					r * 0.5, r * 0.45, '', 'StorSimple', null, null, this.getTagsForStencil(gn, 'storsimple', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'AzureFXTEdgeFiler.svg;',
					r * 0.5, r * 0.5, '', 'AzureFXTEdgeFiler', null, null, this.getTagsForStencil(gn, 'azurefxtedgefiler', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Blog_Storage.svg;',
					r * 0.5, r * 0.46, '', 'Blob Storage', null, null, this.getTagsForStencil(gn, 'blob storage', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Data_Box_Edge_Data_Box_Gateway.svg;',
					r * 0.5, r * 0.32, '', 'Data Box Edge - Data Box Gateway', null, null, this.getTagsForStencil(gn, 'data box edge data gateway', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Data_Box.svg;',
					r * 0.5, r * 0.47, '', 'Data Box / Import Export Storage', null, null, this.getTagsForStencil(gn, 'data box', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Data_Lake_Storage.svg;',
					r * 0.5, r * 0.46, '', 'Data Lake Storage', null, null, this.getTagsForStencil(gn, 'data lake storage', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'General_Storage.svg;',
					r * 0.5, r * 0.5, '', 'General Storage', null, null, this.getTagsForStencil(gn, 'general storage', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Queues_Storage.svg;',
					r * 0.5, r * 0.44, '', 'Queues Storage', null, null, this.getTagsForStencil(gn, 'queues storage', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'ClassicStorage.svg;',
					r * 0.5, r * 0.43, '', 'Classic Storage', null, null, this.getTagsForStencil(gn, 'classic storage', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Storage_Accounts.svg;',
					r * 0.5, r * 0.45, '', 'Storage Accounts', null, null, this.getTagsForStencil(gn, 'storage accounts', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Storage_Explorer.svg;',
					r * 0.5, r * 0.5, '', 'Storage Explorer', null, null, this.getTagsForStencil(gn, 'storage explorer', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Storage_sync_service.svg;',
					r * 0.5, r * 0.5, '', 'Storage Sync Services', null, null, this.getTagsForStencil(gn, 'storage sync services', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'StorSimple_Data_Managers.svg;',
					r * 0.37, r * 0.5, '', 'StorSimple Data Managers', null, null, this.getTagsForStencil(gn, 'storsimple data managers', dt).join(' ')),
			this.createVertexTemplateEntry('aspect=fixed;verticalLabelPosition=bottom;html=1;verticalAlign=top;align=center;strokeColor=none;fillColor=#00BEF2;shape=mxgraph.azure.storsimple;',
					r * 0.5, r * 0.45, '', 'StorSimple Device Managers', null, null, this.getTagsForStencil(gn, 'storsimple device managers', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'StorSimple_Data_Managers.svg;',
					r * 0.37, r * 0.5, '', 'StorSimple Data Managers', null, null, this.getTagsForStencil(gn, 'storsimple data managers', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Table_Storage.svg;',
					r * 0.5, r * 0.48, '', 'Table Storage', null, null, this.getTagsForStencil(gn, 'table storage', dt).join(' '))
		];
			
		this.addPalette('mscaeStorage Service', 'CAE / Storage Service', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};
	
	Sidebar.prototype.addMSCAEWebServicePalette = function(gn, r, sb, s)
	{
		var dt = 'ms microsoft cloud enterprise web service';
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'Connection.svg;',
					r * 0.5, r * 0.31, '', 'Connection', null, null, this.getTagsForStencil(gn, 'connection', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Certificate.svg;',
					r * 0.5, r * 0.42, '', 'App Service Certificates', null, null, this.getTagsForStencil(gn, 'app application certificates certificate', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'CustomDomain.svg;',
					r * 0.5, r * 0.42, '', 'App Service Domains', null, null, this.getTagsForStencil(gn, 'app service domain domains', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'App_Service.svg;',
					r * 0.5, r * 0.5, '', 'App Service Environments', null, null, this.getTagsForStencil(gn, 'app service environments', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'WebHosting.svg;',
					r * 0.5, r * 0.5, '', 'App Service Plans', null, null, this.getTagsForStencil(gn, 'app plans web hosting', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'App_Services.svg;',
					r * 0.5, r * 0.5, '', 'App Services', null, null, this.getTagsForStencil(gn, 'app services', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Media_Services.svg;',
					r * 0.44, r * 0.5, '', 'Azure Media Services', null, null, this.getTagsForStencil(gn, 'azure media services', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Search.svg;',
					r * 0.5, r * 0.5, '', 'Azure Search', null, null, this.getTagsForStencil(gn, 'azure search', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'Notification_Hubs.svg;',
					r * 0.5, r * 0.5, '', 'Notification Hub Namespaces', null, null, this.getTagsForStencil(gn, 'notification hub namespace namespaces', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'SignalR.svg;',
					r * 0.5, r * 0.5, '', 'SignalR', null, null, this.getTagsForStencil(gn, 'signalr', dt).join(' '))
		];
			
		this.addPalette('mscaeWeb Service', 'CAE / Web Service', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	}
})();
