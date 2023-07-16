(function()
{
	Sidebar.prototype.addVeeamPalette = function()
	{
//		this.setCurrentSearchEntryLibrary('veeam', 'veeamData Center');
		this.addVeeamDataCenterPalette();
//		this.setCurrentSearchEntryLibrary('veeam', 'veeamMisc');
		this.addVeeamMiscPalette();
//		this.setCurrentSearchEntryLibrary('veeam', 'veeamSoftware');
		this.addVeeamSoftwarePalette();
//		this.setCurrentSearchEntryLibrary('veeam', 'veeamStorage');
		this.addVeeamStoragePalette();
//		this.setCurrentSearchEntryLibrary('veeam', 'veeamUsersStatus');
		this.addVeeamUsersStatusPalette();
//		this.setCurrentSearchEntryLibrary('veeam', 'veeamVASComponents');
		this.addVeeamVASComponentsPalette();
//		this.setCurrentSearchEntryLibrary('veeam', 'veeamBackup Replication');
		this.addVeeamBackupReplicationPalette();
//		this.setCurrentSearchEntryLibrary('veeam', 'veeamProducts');
		this.addVeeamProductsPalette();
//		this.setCurrentSearchEntryLibrary('veeam', 'veeamVMs and Tape');
		this.addVeeamVMsTapePalette();
		this.setCurrentSearchEntryLibrary('veeam2', 'veeam23D');
		this.addVeeam3DPalette();
		this.setCurrentSearchEntryLibrary();
	};
	
	Sidebar.prototype.addVeeamDataCenterPalette = function()
	{
		var sn = 'pointerEvents=1;shadow=0;dashed=0;html=1;strokeColor=none;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam.2d.';
		var s = 'pointerEvents=1;shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#4495D1;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam.2d.';
		var s2 = 'pointerEvents=1;shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#EF8F21;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam.2d.';
		var s3 = 'pointerEvents=1;shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#4495D1;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam.';
		var s4 = 'pointerEvents=1;shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#EF8F21;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam.';

		// Space savers
		var sb = this;
		var gn = 'mxgraph.veeam.data_center';
		var dt = 'veeam vmware virtual machine data center';
		
		var w = 4.0;
		var h = 4.0;
		
		var fns =
		[
			this.createVertexTemplateEntry(s3 + 'hyper_v_vmware_host;',
					w * 27, h * 26, '', 'VMware/Hyper-V Host', null, null, this.getTagsForStencil(gn, 'hyper vmware host', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'hyper_v_host;',
					w * 27, h * 26, '', 'Hyper-V Host', null, null, this.getTagsForStencil(gn, 'hyper host', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'vmware_host;',
					w * 27, h * 26, '', 'VMware Host', null, null, this.getTagsForStencil(gn, 'vmware host', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'virtual_host;',
					w * 27, h * 26, '', 'Virtual Host', null, null, this.getTagsForStencil(gn, 'virtual host', dt).join(' ')),
			this.createVertexTemplateEntry(s4 + 'production_site;',
					w * 11.2, h * 11.2, '', 'Production Site', null, null, this.getTagsForStencil(gn, 'production site', dt).join(' ')),
			this.createVertexTemplateEntry(s4 + 'dr_site;',
					w * 11.2, h * 11.2, '', 'DR Site', null, null, this.getTagsForStencil(gn, 'dr site', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'esx_esxi;',
					w * 8.3, h * 12.7, '', 'Physical Server', null, null, this.getTagsForStencil(gn, 'esx esxi', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'server;',
					w * 17.9, h * 4.7, '', 'Server', null, null, this.getTagsForStencil(gn, 'esx esxi', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'server_stack;',
					w * 14.3, h * 12.4, '', 'Server stack', null, null, this.getTagsForStencil(gn, 'server stack', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'data_center;',
					w * 19, h * 12.5, '', 'Data center', null, null, this.getTagsForStencil(gn, 'data center', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'cluster;',
					w * 25.7, h * 12.3, '', 'Cluster', null, null, this.getTagsForStencil(gn, 'cluster', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'controller;',
					w * 11.2, h * 11.2, '', 'Controller', null, null, this.getTagsForStencil(gn, 'controller', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'cpu;',
					w * 11.2, h * 11.2, '', 'CPU', null, null, this.getTagsForStencil(gn, 'cpu', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'cpu_socket;',
					w * 11.2, h * 11.2, '', 'CPU socket', null, null, this.getTagsForStencil(gn, 'cpu socket', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'cloud_gateway;',
					w * 11.2, h * 11.2, '', 'Gateway', null, null, this.getTagsForStencil(gn, 'cloud gateway', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'laptop;',
					w * 14.6, h * 11, '', 'Laptop', null, null, this.getTagsForStencil(gn, 'laptop', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'monitor;',
					w * 10.8, h * 11.9, '', 'Monitor', null, null, this.getTagsForStencil(gn, 'monitor', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'proxy;',
					w * 11.2, h * 11.2, '', 'Proxy', null, null, this.getTagsForStencil(gn, 'proxy', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'proxy_appliance;',
					w * 11.2, h * 11.2, '', 'Proxy Appliance', null, null, this.getTagsForStencil(gn, 'proxy appliance', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'ram;',
					w * 12.1, h * 6.3, '', 'RAM', null, null, this.getTagsForStencil(gn, 'ram random access memory', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'raid_controller;',
					w * 10.5, h * 7.3, '', 'RAID controller', null, null, this.getTagsForStencil(gn, 'raid controller', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'sd_card;',
					w * 8.1, h * 9.7, '', 'SD card', null, null, this.getTagsForStencil(gn, 'sd card', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'workstation;',
					w * 19.1, h * 12.8, '', 'Workstation', null, null, this.getTagsForStencil(gn, 'workstation', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'wan_accelerator;',
					w * 11.2, h * 11.2, '', 'WAN Accelerator', null, null, this.getTagsForStencil(gn, 'wan accelerator wireless area network', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'usb;',
					w * 13.2, h * 4.6, '', 'USB', null, null, this.getTagsForStencil(gn, 'usb', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'network_card;',
					w * 10.7, h * 7.5, '', 'Network Card', null, null, this.getTagsForStencil(gn, 'network card', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'switch;',
					w * 16, h * 2.7, '', 'Network Switch', null, null, this.getTagsForStencil(gn, 'network switch', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'service_vnic;',
					w * 14.2, h * 13.5, '', 'Service vNIC', null, null, this.getTagsForStencil(gn, 'service vnic', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'virtual_switch;',
					w * 11.2, h * 11.2, '', 'Virtual Switch', null, null, this.getTagsForStencil(gn, 'switch', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'vnic;',
					w * 11.2, h * 11.2, '', 'vNIC', null, null, this.getTagsForStencil(gn, 'vnic', dt).join(' '))
					
		];
			
		this.addPalette('veeamData Center', 'Veeam / Data Center', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};

	Sidebar.prototype.addVeeamMiscPalette = function()
	{
		var sn = 'shadow=0;dashed=0;html=1;strokeColor=none;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam.2d.';
		var s = 'shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#4495D1;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam.2d.';
		var s2 = 'shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#EF8F21;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam.2d.';
		var s3 = 'shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#4495D1;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam.';
		var s4 = 'shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#EF8F21;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam.';

		// Space savers
		var sb = this;
		var gn = 'mxgraph.veeam.misc';
		var dt = 'veeam vmware virtual machine misc miscellaneous';
		
		var w = 4.0;
		var h = 4.0;
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'alarm;',
					w * 13.2, h * 9.4, '', 'Alarm', null, null, this.getTagsForStencil(gn, 'alarm', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'building;',
					w * 15.8, h * 13.8, '', 'Building', null, null, this.getTagsForStencil(gn, 'building', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'cloud;',
					w * 14.7, h * 10.4, '', 'Cloud', null, null, this.getTagsForStencil(gn, 'cloud', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'checked_doc;',
					w * 12.7, h * 15.4, '', 'Checked doc', null, null, this.getTagsForStencil(gn, 'checked doc document', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'download;',
					w * 11.2, h * 11.2, '', 'Download', null, null, this.getTagsForStencil(gn, 'download', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'dns;',
					w * 11.2, h * 11.2, '', 'DNS', null, null, this.getTagsForStencil(gn, 'dns domain name server', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'encryption_key;',
					w * 9.2, h * 12.7, '', 'Encryption key', null, null, this.getTagsForStencil(gn, 'dns domain name server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'file;',
					w * 9.2, h * 12.7, '', 'File', null, null, this.getTagsForStencil(gn, 'file', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'folder;',
					w * 13.8, h * 12.8, '', 'Folder', null, null, this.getTagsForStencil(gn, 'folder', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'globe;',
					w * 11.2, h * 11.2, '', 'Globe', null, null, this.getTagsForStencil(gn, 'globe', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'iso;',
					w * 9.2, h * 12.7, '', 'ISO', null, null, this.getTagsForStencil(gn, 'iso international standard organization', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'letter;',
					w * 11.6, h * 8.7, '', 'Letter', null, null, this.getTagsForStencil(gn, 'letter', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'library;',
					w * 12, h * 9.2, '', 'Library', null, null, this.getTagsForStencil(gn, 'library', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'license;',
					w * 12.7, h * 14.1, '', 'License', null, null, this.getTagsForStencil(gn, 'license', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'magnifying_glass;pointerEvents=1;',
					w * 13.8, h * 13.6, '', 'Magnifying Glass', null, null, this.getTagsForStencil(gn, 'magnifying glass', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'script;',
					w * 11.2, h * 11.2, '', 'Script', null, null, this.getTagsForStencil(gn, 'script', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'search;',
					w * 11.2, h * 11.2, '', 'Search', null, null, this.getTagsForStencil(gn, 'search', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'smb;pointerEvents=1;',
					w * 20, h * 14.1, '', 'SMB', null, null, this.getTagsForStencil(gn, 'smb', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'tasks;',
					w * 9.2, h * 12.7, '', 'Tasks', null, null, this.getTagsForStencil(gn, 'tasks', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'table;',
					w * 12.7, h * 12.7, '', 'Table', null, null, this.getTagsForStencil(gn, 'table', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'time;',
					w * 11.2, h * 11.2, '', 'Time', null, null, this.getTagsForStencil(gn, 'time', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'resource_pool;',
					w * 11.2, h * 11.2, '', 'Part', null, null, this.getTagsForStencil(gn, 'resource pool', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'private_key;',
					w * 13.9, h * 12.7, '', 'Private Key', null, null, this.getTagsForStencil(gn, 'private key', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'report;',
					w * 9.2, h * 12.7, '', 'Report', null, null, this.getTagsForStencil(gn, 'report', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'privilege;',
					w * 15.1, h * 14.5, '', 'Policy', null, null, this.getTagsForStencil(gn, 'policy', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'restore;pointerEvents=1;',
					w * 11.2, h * 11.2, '', 'Restore', null, null, this.getTagsForStencil(gn, 'restore', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'role;',
					w * 9.2, h * 12.7, '', 'Role', null, null, this.getTagsForStencil(gn, 'role', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'transportation;',
					w * 13.8, h * 9.6, '', 'Transportation', null, null, this.getTagsForStencil(gn, 'transportation', dt).join(' '))
		];
			
		this.addPalette('veeamMisc', 'Veeam / Miscellaneous', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};

	Sidebar.prototype.addVeeamSoftwarePalette = function()
	{
		var sn = 'shadow=0;dashed=0;html=1;strokeColor=none;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam.2d.';
		var s = 'shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#4495D1;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam.2d.';
		var s2 = 'shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#EF8F21;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam.2d.';
		var s3 = 'shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#4495D1;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam.';
		var s4 = 'shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#EF8F21;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam.';

		// Space savers
		var sb = this;
		var gn = 'mxgraph.veeam.software';
		var dt = 'veeam vmware virtual machine software';
		
		var w = 4.0;
		var h = 4.0;
		
		var fns =
		[
			this.createVertexTemplateEntry('pointerEvents=1;shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#07B152;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam.veeam_logo;',
					w * 27.4, h * 4.8, '', 'Veeam logo', null, null, this.getTagsForStencil(gn, 'veeam logo', dt).join(' ')),
			this.createVertexTemplateEntry(s4 + 'active_directory;',
					w * 11.2, h * 11.2, '', 'Active Directory', null, null, this.getTagsForStencil(gn, 'active directory', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'agent;pointerEvents=1;',
					w * 11.2, h * 11.2, '', 'Agent', null, null, this.getTagsForStencil(gn, 'agent', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'automated_testing;',
					w * 11.2, h * 11.2, '', 'Automated Testing', null, null, this.getTagsForStencil(gn, 'automated testing', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'backup_browser;',
					w * 11.2, h * 11.2, '', 'Backup Browser', null, null, this.getTagsForStencil(gn, 'backup browser', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'data_mover;pointerEvents=1;',
					w * 11.2, h * 11.2, '', 'Data Mover', null, null, this.getTagsForStencil(gn, 'data mover', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'database;',
					w * 15.7, h * 13.5, '', 'Database', null, null, this.getTagsForStencil(gn, 'database db', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'deduplication;',
					w * 11.2, h * 11.2, '', 'Deduplication', null, null, this.getTagsForStencil(gn, 'deduplication', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'failover_plan;',
					w * 9.6, h * 13.6, '', 'Failover plan', null, null, this.getTagsForStencil(gn, 'failover plan', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'file_system_browser;',
					w * 11.2, h * 11.2, '', 'File System Browser', null, null, this.getTagsForStencil(gn, 'file system browser', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'failover_protective_snapshot;',
					w * 11.2, h * 11.2, '', 'Failover Protection', null, null, this.getTagsForStencil(gn, 'failover protection', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'interface;',
					w * 11.2, h * 11.2, '', 'Interface', null, null, this.getTagsForStencil(gn, 'interface', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'monitoring_console;',
					w * 11.2, h * 11.2, '', 'Monitoring Console', null, null, this.getTagsForStencil(gn, 'monitoring console', dt).join(' ')),
			this.createVertexTemplateEntry(s4 + 'linux;',
					w * 11.2, h * 11.2, '', 'Linux', null, null, this.getTagsForStencil(gn, 'linux', dt).join(' ')),
			this.createVertexTemplateEntry(s4 + 'ms_sharepoint;',
					w * 11.2, h * 11.2, '', 'MS SharePoint', null, null, this.getTagsForStencil(gn, 'sharepoint', dt).join(' ')),
			this.createVertexTemplateEntry(s4 + 'ms_sql;',
					w * 11.2, h * 11.2, '', 'MS SQL', null, null, this.getTagsForStencil(gn, 'sql', dt).join(' ')),
			this.createVertexTemplateEntry(s4 + 'ms_exchange;',
					w * 11.2, h * 11.2, '', 'MS Exchange', null, null, this.getTagsForStencil(gn, 'exchange', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'ms_exchange_items;',
					w * 20.4, h * 17.3, '', 'MS Exchange items', null, null, this.getTagsForStencil(gn, 'exchange items', dt).join(' ')),
			this.createVertexTemplateEntry(s4 + 'ms_office;',
					w * 11.2, h * 11.2, '', 'MS Office', null, null, this.getTagsForStencil(gn, 'office', dt).join(' ')),
			this.createVertexTemplateEntry(s4 + 'ms_outlook;',
					w * 11.2, h * 11.2, '', 'MS Outlook', null, null, this.getTagsForStencil(gn, 'outlook', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'web_console;',
					w * 11.2, h * 11.2, '', 'Web Console', null, null, this.getTagsForStencil(gn, 'web console', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'vpn;',
					w * 13.5, h * 9.5, '', 'VPN', null, null, this.getTagsForStencil(gn, 'vpn virtual private network', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'service;',
					w * 8.3, h * 8.3, '', 'Service', null, null, this.getTagsForStencil(gn, 'service', dt).join(' ')),
			this.createVertexTemplateEntry('shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#75B4DB;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam.volume_shadow_copy;',
					w * 14.3, h * 14.3, '', 'Volume shadow copy', null, null, this.getTagsForStencil(gn, 'volume shadow copy', dt).join(' ')),
			this.createVertexTemplateEntry(s4 + 'ms_windows;',
					w * 11.2, h * 11.2, '', 'MS Windows', null, null, this.getTagsForStencil(gn, 'windows', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'powershell_extension;',
					w * 11.2, h * 11.2, '', 'PowerShell Extension', null, null, this.getTagsForStencil(gn, 'powershell extension', dt).join(' ')),
			this.createVertexTemplateEntry(s4 + 'vcloud_director',
					w * 11.2, h * 11.2, '', 'vCloud Director', null, null, this.getTagsForStencil(gn, 'vcloud director virtual cloud', dt).join(' ')),
			this.createVertexTemplateEntry(s4 + 'vsphere',
					w * 11.2, h * 11.2, '', 'vSphere', null, null, this.getTagsForStencil(gn, 'vsphere virtual sphere', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'web_ui;',
					w * 11.2, h * 11.2, '', 'Web UI', null, null, this.getTagsForStencil(gn, 'web ui user interface', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'transport_service;pointerEvents=1;',
					w * 11.2, h * 11.2, '', 'Transport Service', null, null, this.getTagsForStencil(gn, 'transport service', dt).join(' '))
		];
			
		this.addPalette('veeamSoftware', 'Veeam / Software', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};

	Sidebar.prototype.addVeeamStoragePalette = function()
	{
		var sn = 'shadow=0;dashed=0;html=1;strokeColor=none;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam.2d.';
		var s = 'shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#4495D1;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam.2d.';
		var s2 = 'shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#EF8F21;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam.2d.';
		var s3 = 'shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#4495D1;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam.';
		var s4 = 'shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#EF8F21;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam.';

		// Space savers
		var sb = this;
		var gn = 'mxgraph.veeam.storage';
		var dt = 'veeam vmware virtual machine storage';
		
		var w = 4.0;
		var h = 4.0;
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'backup_repository;',
					w * 13.5, h * 12.5, '', 'Backup Repository', null, null, this.getTagsForStencil(gn, 'backup repository', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'remote_repository;',
					w * 11.9, h * 11.6, '', 'Remote Repository', null, null, this.getTagsForStencil(gn, 'remote repository', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'shared_folder;',
					w * 13.8, h * 16, '', 'Shared Folder', null, null, this.getTagsForStencil(gn, 'shared folder', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'datastore;',
					w * 11.1, h * 11.3, '', 'Datastore', null, null, this.getTagsForStencil(gn, 'datastore', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'snapshot;',
					w * 13.9, h * 12.2, '', 'Snapshot', null, null, this.getTagsForStencil(gn, 'snapshot', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'storage_cluster;',
					w * 13.9, h * 14, '', 'Storage Cluster', null, null, this.getTagsForStencil(gn, 'storage cluster', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'datastore_volume;',
					w * 15.8, h * 4.2, '', 'Data Volume', null, null, this.getTagsForStencil(gn, 'data volume', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'physical_storage;',
					w * 14.8, h * 5, '', 'Physical Storage', null, null, this.getTagsForStencil(gn, 'physical storage', dt).join(' ')),
			this.createVertexTemplateEntry('shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#75B4DB;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam.2d.datastore;',
					w * 10.8, h * 11.1, '', 'Datastore', null, null, this.getTagsForStencil(gn, 'datastore', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'full_datastore;',
					w * 10.8, h * 11.1, '', 'Full Datastore', null, null, this.getTagsForStencil(gn, 'full datastore', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'medium_datastore;',
					w * 10.8, h * 11.1, '', 'Medium Datastore', null, null, this.getTagsForStencil(gn, 'medium datastore', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'free_datastore;',
					w * 10.8, h * 11.1, '', 'Free Datastore', null, null, this.getTagsForStencil(gn, 'free datastore', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'remote_storage;',
					w * 11.6, h * 11.6, '', 'Remote Storage', null, null, this.getTagsForStencil(gn, 'remote storage', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'vm_backup;',
					w * 14.3, h * 13.3, '', 'VM Backup', null, null, this.getTagsForStencil(gn, 'vm backup', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'lost_space;',
					w * 10.8, h * 11.1, '', 'Lost Space', null, null, this.getTagsForStencil(gn, 'lost space', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'hard_drive;',
					w * 10, h * 12, '', 'Hard Drive', null, null, this.getTagsForStencil(gn, 'hard drive', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'disk_partition;',
					w * 14.3, h * 14.3, '', 'Disk partition', null, null, this.getTagsForStencil(gn, 'disk partition', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'local_disk;',
					w * 14.3, h * 14.2, '', 'Local disk', null, null, this.getTagsForStencil(gn, 'local disk', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'audio_file;',
					w * 9.2, h * 12.7, '', 'Audio file', null, null, this.getTagsForStencil(gn, 'audio file', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'backup_file;',
					w * 14.4, h * 13.3, '', 'Backup file', null, null, this.getTagsForStencil(gn, 'audio file', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'data_file;',
					w * 11.8, h * 15.2, '', 'Data file', null, null, this.getTagsForStencil(gn, 'data file', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'google_document;',
					w * 9.2, h * 12.7, '', 'Google document', null, null, this.getTagsForStencil(gn, 'google document', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'video_file;',
					w * 9.2, h * 12.7, '', 'Video file', null, null, this.getTagsForStencil(gn, 'video file', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'vsb_file;',
					w * 9.2, h * 12.7, '', 'VSB file', null, null, this.getTagsForStencil(gn, 'vsb file', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'windows_repository;',
					w * 13.3, h * 12.3, '', 'Windows Repository', null, null, this.getTagsForStencil(gn, 'windows repository', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'linux_repository;',
					w * 13.4, h * 12.4, '', 'Linux Repository', null, null, this.getTagsForStencil(gn, 'linux repository', dt).join(' '))
		];
			
		this.addPalette('veeamStorage', 'Veeam / Storage', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};

	Sidebar.prototype.addVeeamUsersStatusPalette = function()
	{
		var sn = 'shadow=0;dashed=0;html=1;strokeColor=none;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam.2d.';
		var s = 'shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#4495D1;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam.2d.';
		var s2 = 'shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#EF8F21;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam.2d.';
		var s3 = 'shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#4495D1;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam.';
		var s4 = 'shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#EF8F21;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam.';

		// Space savers
		var sb = this;
		var gn = 'mxgraph.veeam.storage';
		var dt = 'veeam vmware virtual machine users status';
		
		var w = 4.0;
		var h = 4.0;
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'user;',
					w * 8, h * 14.5, '', 'User', null, null, this.getTagsForStencil(gn, 'user', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'group;',
					w * 13.4, h * 15.1, '', 'User Group', null, null, this.getTagsForStencil(gn, 'user group', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'company_user;',
					w * 11.1, h * 12.2, '', 'Company User', null, null, this.getTagsForStencil(gn, 'company user', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'company_owner;',
					w * 11.1, h * 12.2, '', 'Company Owner', null, null, this.getTagsForStencil(gn, 'company owner', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'portal_admin;',
					w * 11.1, h * 12.2, '', 'Portal Admin', null, null, this.getTagsForStencil(gn, 'portal admin', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'company_administrator;',
					w * 11.1, h * 12.2, '', 'Company Administrator', null, null, this.getTagsForStencil(gn, 'company administrator', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'alert;',
					w * 8.3, h * 8.3, '', 'Alert', null, null, this.getTagsForStencil(gn, 'alert', dt).join(' ')),
			this.createVertexTemplateEntry(s4 + 'zipped;pointerEvents=1;',
					w * 1.7, h * 14.3, '', 'Zipped', null, null, this.getTagsForStencil(gn, 'zipped', dt).join(' ')),
			this.createVertexTemplateEntry(s4 + 'shared;',
					w * 11.5, h * 6.2, '', 'Shared', null, null, this.getTagsForStencil(gn, 'shared', dt).join(' ')),
			this.createVertexTemplateEntry(s4 + 'checked;',
					w * 9, h * 9, '', 'Checked', null, null, this.getTagsForStencil(gn, 'checked', dt).join(' ')),
			this.createVertexTemplateEntry(s4 + 'eject;',
					w * 9, h * 9, '', 'Eject', null, null, this.getTagsForStencil(gn, 'eject', dt).join(' ')),
			this.createVertexTemplateEntry(s4 + 'recording;',
					w * 9, h * 9, '', 'Recording', null, null, this.getTagsForStencil(gn, 'recording', dt).join(' ')),
			this.createVertexTemplateEntry(s4 + 'powered;',
					w * 9, h * 9, '', 'Powered', null, null, this.getTagsForStencil(gn, 'powered', dt).join(' ')),
			this.createVertexTemplateEntry(s4 + 'failed;',
					w * 9, h * 9, '', 'Failed', null, null, this.getTagsForStencil(gn, 'failed', dt).join(' ')),
			this.createVertexTemplateEntry(s4 + 'paused;',
					w * 9, h * 9, '', 'Paused', null, null, this.getTagsForStencil(gn, 'paused', dt).join(' ')),
			this.createVertexTemplateEntry(s4 + 'unavailable;',
					w * 9, h * 9, '', 'Unavailable', null, null, this.getTagsForStencil(gn, 'unavailable', dt).join(' ')),
			this.createVertexTemplateEntry(s4 + 'active;',
					w * 9, h * 9, '', 'Active', null, null, this.getTagsForStencil(gn, 'active', dt).join(' ')),
			this.createVertexTemplateEntry(s4 + 'delayed;',
					w * 9, h * 9, '', 'Delayed', null, null, this.getTagsForStencil(gn, 'delayed', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'restore;pointerEvents=1;',
					w * 7.8, h * 7.4, '', 'Restore', null, null, this.getTagsForStencil(gn, 'restore', dt).join(' ')),
			this.createVertexTemplateEntry(s4 + 'locked;',
					w * 7.6, h * 8.6, '', 'Locked', null, null, this.getTagsForStencil(gn, 'locked', dt).join(' ')),
			this.createVertexTemplateEntry(s4 + 'unlocked;',
					w * 10.4, h * 8.7, '', 'Unlocked', null, null, this.getTagsForStencil(gn, 'unlocked', dt).join(' '))
		];
			
		this.addPalette('veeamUsersStatus', 'Veeam / Users and Status', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};

	Sidebar.prototype.addVeeamVASComponentsPalette = function()
	{
		var sn = 'shadow=0;dashed=0;html=1;strokeColor=none;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam.2d.';
		var s = 'shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#4495D1;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam.2d.';
		var s2 = 'shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#EF8F21;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam.2d.';
		var s3 = 'shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#4495D1;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam.';
		var s4 = 'shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#EF8F21;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam.';

		// Space savers
		var sb = this;
		var gn = 'mxgraph.veeam.vascomponent';
		var dt = 'veeam vmware virtual machine vas availability suite component';
		
		var w = 4.0;
		var h = 4.0;
		
		var fns =
		[
			this.createVertexTemplateEntry(s3 + 'database_server;',
					w * 19, h * 18, '', 'Database Server', null, null, this.getTagsForStencil(gn, 'database server', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'gateway_server;',
					w * 19, h * 18, '', 'Gateway Server', null, null, this.getTagsForStencil(gn, 'gateway server', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'mount_server;',
					w * 19, h * 18, '', 'Mount Server', null, null, this.getTagsForStencil(gn, 'mount server', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'proxy_server;',
					w * 19, h * 18, '', 'Proxy Server', null, null, this.getTagsForStencil(gn, 'proxy server', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'repository_server;',
					w * 19, h * 18, '', 'Repository Server', null, null, this.getTagsForStencil(gn, 'repository server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'veeam_backup_search_server;',
					w * 19, h * 18, '', 'Search Server', null, null, this.getTagsForStencil(gn, 'backup search server', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'tape_server;',
					w * 19, h * 18, '', 'Tape Server', null, null, this.getTagsForStencil(gn, 'tape server', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'vsphere_server;',
					w * 19, h * 18, '', 'vSphere Server', null, null, this.getTagsForStencil(gn, 'vsphere server', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'windows_linux_server;',
					w * 19, h * 18, '', 'Windows Linux Server', null, null, this.getTagsForStencil(gn, 'windows linux server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'veeam_backup_and_replication_server;',
					w * 19, h * 18, '', 'Backup and Replication Server', null, null, this.getTagsForStencil(gn, 'backup and replication server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'veeam_backup_enterprise_manager_server;',
					w * 19, h * 18, '', 'Backup Enterprise Manager Server', null, null, this.getTagsForStencil(gn, 'backup enterprise manager server', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'one_server;',
					w * 19, h * 18, '', 'ONE Server', null, null, this.getTagsForStencil(gn, 'one server', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'veeam_explorer_for_active_directory;',
					w * 11.2, h * 11.2, '', 'Explorer for Active Directory', null, null, this.getTagsForStencil(gn, 'explorer for active directory', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'veeam_explorer_for_exchange;',
					w * 11.2, h * 11.2, '', 'Explorer for Exchange', null, null, this.getTagsForStencil(gn, 'explorer for exchange', dt).join(' ')),
			this.createVertexTemplateEntry(s4 + 'explorer_for_oracle;',
					w * 11.2, h * 11.2, '', 'Explorer for Oracle', null, null, this.getTagsForStencil(gn, 'explorer for oracle', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'veeam_explorer_for_sharepoint;',
					w * 11.2, h * 11.2, '', 'Explorer for SharePoint', null, null, this.getTagsForStencil(gn, 'explorer for sharepoint', dt).join(' ')),
			this.createVertexTemplateEntry(s4 + 'explorer_for_storage_snapshots;',
					w * 11.2, h * 11.2, '', 'Explorer for Storage Snapshots', null, null, this.getTagsForStencil(gn, 'explorer for storage snapshots', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'veeam_explorer_for_sql;',
					w * 11.2, h * 11.2, '', 'Explorer for SQL', null, null, this.getTagsForStencil(gn, 'explorer for sql', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'veeam_availability_suite;',
					w * 11.2, h * 11.2, '', 'Availability Suite', null, null, this.getTagsForStencil(gn, 'availability suite', dt).join(' ')),
			this.createVertexTemplateEntry(s4 + 'backup_replication;',
					w * 11.2, h * 11.2, '', 'Backup and Replication', null, null, this.getTagsForStencil(gn, 'backup and replication', dt).join(' ')),
			this.createVertexTemplateEntry(s4 + 'enterprise_manager;',
					w * 11.2, h * 11.2, '', 'Enterprise Manager', null, null, this.getTagsForStencil(gn, 'enterprise manager', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'linux_repository;',
					w * 12.2, h * 11.2, '', 'Linux Repository', null, null, this.getTagsForStencil(gn, 'linux repository', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'windows_repository;',
					w * 12.2, h * 11.2, '', 'Windows Repository', null, null, this.getTagsForStencil(gn, 'windows repository', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'flr_helper_appliance;',
					w * 12.4, h * 12.5, '', 'FLR Helper Appliance', null, null, this.getTagsForStencil(gn, 'flr helper appliance', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'one_client;',
					w * 22.7, h * 15.4, '', 'ONE client', null, null, this.getTagsForStencil(gn, 'one client', dt).join(' '))
		];
			
		this.addPalette('veeamVASComponents', 'Veeam / Availability Suite components', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};

	Sidebar.prototype.addVeeamBackupReplicationPalette = function()
	{
		var sn = 'shadow=0;dashed=0;html=1;strokeColor=none;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam.2d.';
		var s = 'shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#4495D1;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam.2d.';
		var s2 = 'shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#EF8F21;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam.2d.';
		var s3 = 'shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#4495D1;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam.';
		var s4 = 'shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#EF8F21;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam.';

		// Space savers
		var sb = this;
		var gn = 'mxgraph.veeam.backup_replication';
		var dt = 'veeam vmware virtual machine backup replication';
		
		var w = 4.0;
		var h = 4.0;
		
		var fns =
		[
			this.createVertexTemplateEntry(s2 + 'built_in_wan_acceleration;',
					w * 11.2, h * 11.2, '', 'Built-in WAN Acceleration', null, null, this.getTagsForStencil(gn, 'built in wan acceleration wireless area network', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + '1_click_failover_orchestration;',
					w * 11.2, h * 11.2, '', '1 Click Failover Orchestration', null, null, this.getTagsForStencil(gn, 'one click failover orchestration', dt).join(' ')),
			this.createVertexTemplateEntry(s4 + 'advanced_refs_integration;',
					w * 11.2, h * 11.2, '', 'Advanced ReFS integration', null, null, this.getTagsForStencil(gn, 'advanced refs integration', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'assisted_failover_and_failback;',
					w * 11.2, h * 11.2, '', 'Assisted Failover and Failback', null, null, this.getTagsForStencil(gn, 'assisted failover and failback', dt).join(' ')),
			this.createVertexTemplateEntry(s4 + 'chargeback_and_billing_capabilities;',
					w * 11.2, h * 11.2, '', 'Chargeback and billing capabilities', null, null, this.getTagsForStencil(gn, 'chargeback and billing capabilities', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'veeam_cloud_connect;',
					w * 11.2, h * 11.2, '', 'Cloud Connect', null, null, this.getTagsForStencil(gn, 'cloud connect', dt).join(' ')),
			this.createVertexTemplateEntry(s4 + 'built_in_management_for_agents;',
					w * 11.2, h * 11.2, '', 'Built-in Management for agents', null, null, this.getTagsForStencil(gn, 'built in management for agents', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'disaster_recovery;',
					w * 11.2, h * 11.2, '', 'Disaster Recovery', null, null, this.getTagsForStencil(gn, 'disaster recovery', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'emc_data_domain_boost;',
					w * 11.2, h * 11.2, '', 'Dell EMC Data Domain Boost', null, null, this.getTagsForStencil(gn, 'emc data domain boost', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'end_to_end_encryption;',
					w * 11.2, h * 11.2, '', 'End-to-end Encryption', null, null, this.getTagsForStencil(gn, 'end to end encryption', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'backup_from_storage_snapshots;',
					w * 11.2, h * 11.2, '', 'Backup from Storage Snapshots', null, null, this.getTagsForStencil(gn, 'backup from storage snapshots', dt).join(' ')),
			this.createVertexTemplateEntry(s4 + 'direct_restore_to_ms_azure;',
					w * 11.2, h * 11.2, '', 'Direct Restore to MS Azure', null, null, this.getTagsForStencil(gn, 'direct restore to ms azure', dt).join(' ')),
			this.createVertexTemplateEntry(s4 + 'draas_enhancements;',
					w * 11.2, h * 11.2, '', 'DRaaS Enhancements', null, null, this.getTagsForStencil(gn, 'draas enhancements', dt).join(' ')),
			this.createVertexTemplateEntry(s4 + 'full_ms_integration;',
					w * 11.2, h * 11.2, '', 'Full MS Integration', null, null, this.getTagsForStencil(gn, 'full ms integration', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'native_tape_support;',
					w * 11.2, h * 11.2, '', 'Native Tape Support', null, null, this.getTagsForStencil(gn, 'native tape support', dt).join(' ')),
			this.createVertexTemplateEntry(s4 + 'enterprise_scalability_enhancements;',
					w * 11.2, h * 11.2, '', 'Enterprise scalability enhancements', null, null, this.getTagsForStencil(gn, 'enterprise scalability enhancements', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'on_demand_sandbox;',
					w * 11.2, h * 11.2, '', 'On Demand Sandbox', null, null, this.getTagsForStencil(gn, 'on demand sandbox', dt).join(' ')),
			this.createVertexTemplateEntry(s4 + 'nas_backup;',
					w * 11.2, h * 11.2, '', 'NAS Backup', null, null, this.getTagsForStencil(gn, 'nas backup', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'quick_migration;',
					w * 11.2, h * 11.2, '', 'Quick Migration', null, null, this.getTagsForStencil(gn, 'quick migration', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'replication_from_a_backup;',
					w * 11.2, h * 11.2, '', 'Replication from a Backup', null, null, this.getTagsForStencil(gn, 'replication from a backup', dt).join(' ')),
			this.createVertexTemplateEntry(s4 + 'primary_storage_integration;',
					w * 11.2, h * 11.2, '', 'Primary Storage integration', null, null, this.getTagsForStencil(gn, 'primary storage integration', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'sure_replica;',
					w * 11.2, h * 11.2, '', 'Sure Replica', null, null, this.getTagsForStencil(gn, 'sure replica', dt).join(' ')),
			this.createVertexTemplateEntry(s4 + 'archive_tier;',
					w * 11.2, h * 11.2, '', 'Archive Tier', null, null, this.getTagsForStencil(gn, 'archive tier', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'restore_data_from_the_vm_backup;',
					w * 11.2, h * 11.2, '', 'Restore Data from VM Backup', null, null, this.getTagsForStencil(gn, 'restore data from vm backup', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'scheduled_backups;',
					w * 11.2, h * 11.2, '', 'Scheduled Backups', null, null, this.getTagsForStencil(gn, 'Scheduled Backups', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'restful_apis;',
					w * 11.2, h * 11.2, '', 'RESTful API', null, null, this.getTagsForStencil(gn, 'restful apis api', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'self_service_recovery;',
					w * 11.2, h * 11.2, '', 'Self-Service Recovery', null, null, this.getTagsForStencil(gn, 'self service recovery', dt).join(' ')),
			this.createVertexTemplateEntry(s4 + 'reporting;',
					w * 11.2, h * 11.2, '', 'Reporting', null, null, this.getTagsForStencil(gn, 'reporting', dt).join(' ')),
			this.createVertexTemplateEntry(s4 + 'continuous_data_protection;',
					w * 11.2, h * 11.2, '', 'Continuous Data Protection', null, null, this.getTagsForStencil(gn, 'continuous data protection', dt).join(' ')),
			this.createVertexTemplateEntry(s4 + 'vcloud_director_support;',
					w * 11.2, h * 11.2, '', 'vCloud Director Support', null, null, this.getTagsForStencil(gn, 'vcloud director support', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'virtual_lab;',
					w * 11.2, h * 11.2, '', 'Virtual Lab', null, null, this.getTagsForStencil(gn, 'virtual lab', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'sure_backup;',
					w * 11.2, h * 11.2, '', 'SureBackup', null, null, this.getTagsForStencil(gn, 'sure backup', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'scale_out_repository;',
					w * 16.2, h * 14.3, '', 'Scale Out Repository', null, null, this.getTagsForStencil(gn, 'scale out repository', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'veeamzip;',
					w * 11.2, h * 11.2, '', 'VeeamZIP', null, null, this.getTagsForStencil(gn, 'veeamzip zip', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'veeam_explorer;',
					w * 11.2, h * 11.2, '', 'Veeam Explorer', null, null, this.getTagsForStencil(gn, 'explorer', dt).join(' '))
		];
			
		this.addPalette('veeamBackup Replication', 'Veeam / Backup and Replication', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};

	Sidebar.prototype.addVeeamProductsPalette = function()
	{
		var sn = 'shadow=0;dashed=0;html=1;strokeColor=none;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam.2d.';
		var s = 'shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#4495D1;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam.2d.';
		var s2 = 'shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#EF8F21;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam.2d.';
		var s3 = 'shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#4495D1;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam.';
		var s4 = 'shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#EF8F21;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam.';

		// Space savers
		var sb = this;
		var gn = 'mxgraph.veeam.products';
		var dt = 'veeam vmware virtual machine products';
		
		var w = 4.0;
		var h = 4.0;
		
		var fns =
		[
			this.createVertexTemplateEntry('pointerEvents=1;shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#07B152;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam.veeam_logo;',
					w * 27.4, h * 4.8, '', 'Veeam logo', null, null, this.getTagsForStencil(gn, 'veeam logo', dt).join(' ')),
			this.createVertexTemplateEntry(s4 + 'backup_replication;',
					w * 11.2, h * 11.2, '', 'Backup and Replication', null, null, this.getTagsForStencil(gn, 'backup and replication', dt).join(' ')),
			this.createVertexTemplateEntry(s4 + 'enterprise_manager;',
					w * 11.2, h * 11.2, '', 'Enterprise Manager', null, null, this.getTagsForStencil(gn, 'enterprise manager', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'veeam_availability_suite;',
					w * 11.2, h * 11.2, '', 'Availability Suite', null, null, this.getTagsForStencil(gn, 'availability suite', dt).join(' ')),
			this.createVertexTemplateEntry(s4 + 'availability_console;',
					w * 11.2, h * 11.2, '', 'Availability Console', null, null, this.getTagsForStencil(gn, 'availability console', dt).join(' ')),
			this.createVertexTemplateEntry(s4 + 'availability_orchestrator;',
					w * 11.2, h * 11.2, '', 'Availability Orchestrator', null, null, this.getTagsForStencil(gn, 'availability orchestrator', dt).join(' ')),
			this.createVertexTemplateEntry(s4 + 'agents;',
					w * 11.2, h * 11.2, '', 'Agents', null, null, this.getTagsForStencil(gn, 'agents', dt).join(' ')),
			this.createVertexTemplateEntry(s4 + 'powered_network;',
					w * 11.2, h * 11.2, '', 'Powered Network', null, null, this.getTagsForStencil(gn, 'powered network', dt).join(' ')),
			this.createVertexTemplateEntry(s4 + 'backup_for_office_365;',
					w * 11.2, h * 11.2, '', 'Backup for Office 365', null, null, this.getTagsForStencil(gn, 'backup for office 365', dt).join(' ')),
			this.createVertexTemplateEntry(s4 + 'endpoint_backup;',
					w * 11.2, h * 11.2, '', 'Endpoint Backup', null, null, this.getTagsForStencil(gn, 'endpoint backup', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'veeam_one_monitor;',
					w * 11.2, h * 11.2, '', 'ONE Monitor', null, null, this.getTagsForStencil(gn, 'one monitor', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'veeam_one_reporter;',
					w * 11.2, h * 11.2, '', 'ONE Reporter', null, null, this.getTagsForStencil(gn, 'one reporter', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'veeam_one_business_view;',
					w * 11.2, h * 11.2, '', 'ONE (Business View)', null, null, this.getTagsForStencil(gn, 'one business view', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'veeam_one_server;',
					w * 11.2, h * 11.2, '', 'ONE Server', null, null, this.getTagsForStencil(gn, 'one server', dt).join(' '))
		];
			
		this.addPalette('veeamProducts', 'Veeam / Products', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};

	Sidebar.prototype.addVeeamVMsTapePalette = function()
	{
		var sn = 'shadow=0;dashed=0;html=1;strokeColor=none;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam.2d.';
		var s = 'shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#4495D1;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam.2d.';
		var s2 = 'shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#EF8F21;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam.2d.';
		var s3 = 'shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#4495D1;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam.';
		var s4 = 'shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#EF8F21;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam.';

		// Space savers
		var sb = this;
		var gn = 'mxgraph.veeam.vmstape';
		var dt = 'veeam vmware virtual machine vm tape';
		
		var w = 4.0;
		var h = 4.0;
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'virtual_machine;',
					w * 11.2, h * 11, '', 'Virtual Machine', null, null, this.getTagsForStencil(gn, '', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'vm_checked;',
					w * 13.5, h * 13, '', 'VM Checked', null, null, this.getTagsForStencil(gn, 'checked', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'vm_running;',
					w * 13.5, h * 13, '', 'VM Started', null, null, this.getTagsForStencil(gn, 'vm started', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'vm_locked;',
					w * 13.9, h * 13, '', 'VM Locked', null, null, this.getTagsForStencil(gn, 'vm locked', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'vm_paused;',
					w * 13.5, h * 13, '', 'VM Paused', null, null, this.getTagsForStencil(gn, 'vm paused', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'vm_failed;',
					w * 13.5, h * 13, '', 'VM Failed', null, null, this.getTagsForStencil(gn, 'vm failed', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'vm_kernel;',
					w * 13.5, h * 13, '', 'VM Kernel', null, null, this.getTagsForStencil(gn, 'vm kernel', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'vm_windows;',
					w * 14.3, h * 13.8, '', 'VM Windows', null, null, this.getTagsForStencil(gn, 'vm windows', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'vm_linux;',
					w * 14.3, h * 13.8, '', 'VM Linux', null, null, this.getTagsForStencil(gn, 'vm linux', dt).join(' ')),
			this.createVertexTemplateEntry('shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#A2C6E0;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam.vm_snapshot;',
					w * 15.2, h * 14.6, '', 'VM Snapshot', null, null, this.getTagsForStencil(gn, 'vm snapshot', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'vapp;',
					w * 11.2, h * 11, '', 'vApp', null, null, this.getTagsForStencil(gn, 'vapp', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'tape;',
					w * 15.5, h * 8.4, '', 'Tape', null, null, this.getTagsForStencil(gn, 'tape', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'tape_device;',
					w * 26.3, h * 26.5, '', 'Tape Device', null, null, this.getTagsForStencil(gn, 'tape device', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'tape_library;',
					w * 24.2, h * 24.5, '', 'Tape Library', null, null, this.getTagsForStencil(gn, 'tape library', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'tape_writing_device;',
					w * 20.6, h * 10.9, '', 'Tape writing device', null, null, this.getTagsForStencil(gn, 'tape writing device', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'media_pool;',
					w * 18.6, h * 17.9, '', 'Media pool', null, null, this.getTagsForStencil(gn, 'media pool', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'unknown_tape;',
					w * 16.8, h * 15.6, '', 'Unknown tape', null, null, this.getTagsForStencil(gn, 'unknown tape', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'tape_ejecting;',
					w * 18.9, h * 12.4, '', 'Tape eject', null, null, this.getTagsForStencil(gn, 'tape eject', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'tape_locked;',
					w * 17.6, h * 10, '', 'Tape locked', null, null, this.getTagsForStencil(gn, 'tape locked', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'tape_licensed;',
					w * 18.8, h * 11.1, '', 'Tape Licensed', null, null, this.getTagsForStencil(gn, 'tape licensed', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'tape_recording;',
					w * 17.8, h * 11.8, '', 'Tape Recording', null, null, this.getTagsForStencil(gn, 'tape recording', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'tape_checked;',
					w * 18.8, h * 11.4, '', 'Tape Checked', null, null, this.getTagsForStencil(gn, 'tape checked', dt).join(' '))
		];
			
		this.addPalette('veeamVMs and Tape', 'Veeam / VMs and Tape', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};

	Sidebar.prototype.addVeeam3DPalette = function()
	{
		var sn = 'shadow=0;dashed=0;html=1;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam.3d.';
		var s = 'shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#4495D1;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam.3d.';
		var s2 = 'shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#EF8F21;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam.3d.';

		// Space savers
		var sb = this;
		var gn = 'mxgraph.veeam.3d';
		var dt = 'veeam 3d vmware virtual machine ';
		
		var w = 2.0;
		var h = 2.0;
		
		var fns =
		[
			this.createVertexTemplateEntry(sn + '1ftvm;',
					w * 34, h * 31, '', '1FTVM', null, null, this.getTagsForStencil(gn, '1ftvm', dt).join(' ')),
			this.createVertexTemplateEntry(sn + '1ftvm_error;',
					w * 34, h * 31, '', '1FTVM Error', null, null, this.getTagsForStencil(gn, '1ftvm error', dt).join(' ')),
			this.createVertexTemplateEntry(sn + '1ftvm_running;',
					w * 34, h * 31, '', '1FTVM Running', null, null, this.getTagsForStencil(gn, '1ftvm running', dt).join(' ')),
			this.createVertexTemplateEntry(sn + '1ftvm_unavailable;',
					w * 34, h * 31, '', '1FTVM Unavailable', null, null, this.getTagsForStencil(gn, '1ftvm unavailable', dt).join(' ')),
			this.createVertexTemplateEntry(sn + '1ftvm_warning;',
					w * 34, h * 31, '', '1FTVM Warning', null, null, this.getTagsForStencil(gn, '1ftvm warning', dt).join(' ')),
			this.createVertexTemplateEntry(sn + '2ftvm;',
					w * 34, h * 31, '', '2FTVM', null, null, this.getTagsForStencil(gn, '2ftvm', dt).join(' ')),
			this.createVertexTemplateEntry(sn + '2ftvm_error;',
					w * 34, h * 31, '', '2FTVM Error', null, null, this.getTagsForStencil(gn, '2ftvm error', dt).join(' ')),
			this.createVertexTemplateEntry(sn + '2ftvm_running;',
					w * 34, h * 31, '', '2FTVM Running', null, null, this.getTagsForStencil(gn, '2ftvm running', dt).join(' ')),
			this.createVertexTemplateEntry(sn + '2ftvm_unavailable;',
					w * 34, h * 31, '', '2FTVM Unavailable', null, null, this.getTagsForStencil(gn, '2ftvm unavailable', dt).join(' ')),
			this.createVertexTemplateEntry(sn + '2ftvm_warning;',
					w * 34, h * 31, '', '2FTVM Warning', null, null, this.getTagsForStencil(gn, '2ftvm warning', dt).join(' ')),
			this.createVertexTemplateEntry(sn + 'backup_repository;',
					w * 31, h * 31, '', 'Backup Repository', null, null, this.getTagsForStencil(gn, 'backup repository', dt).join(' ')),
			this.createVertexTemplateEntry(sn + 'backup_repository_2;',
					w * 31, h * 31, '', 'Backup Repository', null, null, this.getTagsForStencil(gn, 'backup repository', dt).join(' ')),
			this.createVertexTemplateEntry(sn + 'cd;',
					w * 34, h * 13, '', 'CD', null, null, this.getTagsForStencil(gn, 'cd', dt).join(' ')),
			this.createVertexTemplateEntry(sn + 'database;',
					w * 29, h * 31, '', 'Database', null, null, this.getTagsForStencil(gn, 'database', dt).join(' ')),
			this.createVertexTemplateEntry(sn + 'datastore;',
					w * 22, h * 30, '', 'Datastore', null, null, this.getTagsForStencil(gn, 'datastore', dt).join(' ')),
			this.createVertexTemplateEntry(sn + 'datastore_snapshot;',
					w * 27, h * 17, '', 'Datastore Snapshot', null, null, this.getTagsForStencil(gn, 'datastore snapshot', dt).join(' ')),
			this.createVertexTemplateEntry(sn + 'datastore_volume;',
					w * 27, h * 17, '', 'Datastore Volume', null, null, this.getTagsForStencil(gn, 'datastore volume', dt).join(' ')),
			this.createVertexTemplateEntry(sn + 'esx_esxi;',
					w * 19, h * 26, '', 'ESX ESXi', null, null, this.getTagsForStencil(gn, 'esx esxi', dt).join(' ')),
			this.createVertexTemplateEntry(sn + 'failover_protective_snapshot;',
					w * 23, h * 23, '', 'Failover Protective Snapshot', null, null, this.getTagsForStencil(gn, 'failover protective snapshot', dt).join(' ')),
			this.createVertexTemplateEntry(sn + 'failover_protective_snapshot_locked;',
					w * 28, h * 23, '', 'Failover Protective Snapshot Locked', null, null, this.getTagsForStencil(gn, 'failover protective snapshot locked', dt).join(' ')),
			this.createVertexTemplateEntry(sn + 'failover_protective_snapshot_running;',
					w * 29, h * 23, '', 'Failover Protective Snapshot Running', null, null, this.getTagsForStencil(gn, 'failover protective snapshot running', dt).join(' ')),
			this.createVertexTemplateEntry(sn + 'free_datastore;',
					w * 22, h * 30, '', 'Free Datastore', null, null, this.getTagsForStencil(gn, 'free datastore', dt).join(' ')),
			this.createVertexTemplateEntry(sn + 'full_datastore;',
					w * 22, h * 30, '', 'Full Datastore', null, null, this.getTagsForStencil(gn, 'full datastore', dt).join(' ')),
			this.createVertexTemplateEntry(sn + 'hard_drive;fillColor=#637D8A;gradientColor=#324752;strokeColor=none;',
					w * 31, h * 14, '', 'Hard Drive', null, null, this.getTagsForStencil(gn, 'hard drive', dt).join(' ')),
			this.createVertexTemplateEntry(sn + 'hyper_v_host;',
					w * 55, h * 49, '', 'Hyper-V Host', null, null, this.getTagsForStencil(gn, 'hyper-v host', dt).join(' ')),
			this.createVertexTemplateEntry(sn + 'lost_space;',
					w * 22, h * 30, '', 'Lost Space', null, null, this.getTagsForStencil(gn, 'lost space', dt).join(' ')),
			this.createVertexTemplateEntry(sn + 'lun;',
					w * 36, h * 20, '', 'LUN', null, null, this.getTagsForStencil(gn, 'lun', dt).join(' ')),
			this.createVertexTemplateEntry(sn + 'medium_datastore;',
					w * 22, h * 30, '', 'Medium Datastore', null, null, this.getTagsForStencil(gn, 'medium datastore', dt).join(' ')),
			this.createVertexTemplateEntry(sn + 'network_card;',
					w * 19, h * 20, '', 'Network Card', null, null, this.getTagsForStencil(gn, 'network card', dt).join(' ')),
			this.createVertexTemplateEntry(sn + 'physical_storage;',
					w * 54, h * 30, '', 'Physical Storage', null, null, this.getTagsForStencil(gn, 'physical_storage', dt).join(' ')),
			this.createVertexTemplateEntry(sn + 'proxy;',
					w * 23, h * 23, '', 'Proxy', null, null, this.getTagsForStencil(gn, 'proxy', dt).join(' ')),
			this.createVertexTemplateEntry(sn + 'proxy_appliance;',
					w * 23, h * 23, '', 'Proxy Appliance', null, null, this.getTagsForStencil(gn, 'proxy appliance', dt).join(' ')),
			this.createVertexTemplateEntry(sn + 'remote_site;',
					w * 23, h * 30, '', 'Remote Site', null, null, this.getTagsForStencil(gn, 'remote site', dt).join(' ')),
			this.createVertexTemplateEntry(sn + 'remote_storage;',
					w * 26, h * 31, '', 'Remote Storage', null, null, this.getTagsForStencil(gn, 'remote storage', dt).join(' ')),
			this.createVertexTemplateEntry(sn + 'resource_pool;',
					w * 28, h * 16, '', 'Resource Pool', null, null, this.getTagsForStencil(gn, 'resource pool', dt).join(' ')),
			this.createVertexTemplateEntry(sn + 'service_vnic;',
					w * 36, h * 32, '', 'Service vNIC', null, null, this.getTagsForStencil(gn, 'service vnic', dt).join(' ')),
			this.createVertexTemplateEntry(sn + 'switch;',
					w * 55, h * 29, '', 'Switch', null, null, this.getTagsForStencil(gn, 'switch', dt).join(' ')),
			this.createVertexTemplateEntry(sn + 'tape;',
					w * 29, h * 29, '', 'Tape', null, null, this.getTagsForStencil(gn, 'tape', dt).join(' ')),
			this.createVertexTemplateEntry(sn + 'tape_checked;',
					w * 35, h * 29, '', 'Tape Checked', null, null, this.getTagsForStencil(gn, 'tape checked', dt).join(' ')),
			this.createVertexTemplateEntry(sn + 'tape_ejecting;',
					w * 35, h * 29, '', 'Tape Ejecting', null, null, this.getTagsForStencil(gn, 'tape ejecting', dt).join(' ')),
			this.createVertexTemplateEntry(sn + 'tape_library;',
					w * 31, h * 37, '', 'Tape Library', null, null, this.getTagsForStencil(gn, 'tape library', dt).join(' ')),
			this.createVertexTemplateEntry(sn + 'tape_licensed;',
					w * 35, h * 29, '', 'Tape Licensed', null, null, this.getTagsForStencil(gn, 'tape licensed', dt).join(' ')),
			this.createVertexTemplateEntry(sn + 'tape_recording;',
					w * 35, h * 29, '', 'Tape Recording', null, null, this.getTagsForStencil(gn, 'tape recording', dt).join(' ')),
			this.createVertexTemplateEntry(sn + 'tape_server;',
					w * 23, h * 23, '', 'Tape Server', null, null, this.getTagsForStencil(gn, 'tape server', dt).join(' ')),
			this.createVertexTemplateEntry(sn + 'vapp;',
					w * 46, h * 31, '', 'vApp', null, null, this.getTagsForStencil(gn, 'vapp', dt).join(' ')),
			this.createVertexTemplateEntry(sn + 'vapp_started;',
					w * 46, h * 31, '', 'vApp Started', null, null, this.getTagsForStencil(gn, 'vapp started', dt).join(' ')),
			this.createVertexTemplateEntry(sn + 'veeam_availability_suite;',
					w * 23, h * 23, '', 'Veeam Availability Suite', null, null, this.getTagsForStencil(gn, 'veeam availability suite', dt).join(' ')),
			this.createVertexTemplateEntry(sn + 'veeam_backup_and_replication_server;',
					w * 23, h * 23, '', 'Veeam Backup and Replication Server', null, null, this.getTagsForStencil(gn, 'veeam backup and replication server', dt).join(' ')),
			this.createVertexTemplateEntry(sn + 'veeam_backup_enterprise_manager_server;',
					w * 23, h * 23, '', 'Veeam Backup Enterprise Manager Server', null, null, this.getTagsForStencil(gn, 'veeam backup enterprise manager server', dt).join(' ')),
			this.createVertexTemplateEntry(sn + 'veeam_backup_search_server;',
					w * 23, h * 23, '', 'Veeam Backup Search Server', null, null, this.getTagsForStencil(gn, 'veeam backup search server', dt).join(' ')),
			this.createVertexTemplateEntry(sn + 'veeam_one_business_view;',
					w * 23, h * 23, '', 'Veeam ONE Business View', null, null, this.getTagsForStencil(gn, 'veeam one business view', dt).join(' ')),
			this.createVertexTemplateEntry(sn + 'veeam_one_monitor;',
					w * 23, h * 23, '', 'Veeam ONE Monitor', null, null, this.getTagsForStencil(gn, 'veeam one monitor', dt).join(' ')),
			this.createVertexTemplateEntry(sn + 'veeam_one_reporter;',
					w * 23, h * 23, '', 'Veeam ONE Reporter', null, null, this.getTagsForStencil(gn, 'veeam one reporter', dt).join(' ')),
			this.createVertexTemplateEntry(sn + 'veeam_one_server;',
					w * 23, h * 23, '', 'Veeam ONE Server', null, null, this.getTagsForStencil(gn, 'veeam one server', dt).join(' ')),
			this.createVertexTemplateEntry(sn + 'virtual_machine;',
					w * 23, h * 23, '', 'Virtual Machine', null, null, this.getTagsForStencil(gn, 'virtual machine', dt).join(' ')),
			this.createVertexTemplateEntry(sn + 'vmware_host;',
					w * 55, h * 49, '', 'VMware Host', null, null, this.getTagsForStencil(gn, 'vmware host', dt).join(' ')),
			this.createVertexTemplateEntry(sn + 'vm_failed;',
					w * 28, h * 23, '', 'VM Failed', null, null, this.getTagsForStencil(gn, 'vm failed', dt).join(' ')),
			this.createVertexTemplateEntry(sn + 'vm_linux;',
					w * 23, h * 30, '', 'VM Linux', null, null, this.getTagsForStencil(gn, 'vm linux', dt).join(' ')),
			this.createVertexTemplateEntry(sn + 'vm_no_network;',
					w * 29, h * 23, '', 'VM No Network', null, null, this.getTagsForStencil(gn, 'vm no network', dt).join(' ')),
			this.createVertexTemplateEntry(sn + 'vm_problem;',
					w * 28, h * 23, '', 'VM Problem', null, null, this.getTagsForStencil(gn, 'vm problem', dt).join(' ')),
			this.createVertexTemplateEntry(sn + 'vm_running;',
					w * 28, h * 23, '', 'VM Running', null, null, this.getTagsForStencil(gn, 'vm running', dt).join(' ')),
			this.createVertexTemplateEntry(sn + 'vm_saved_state;',
					w * 29, h * 24, '', 'VM Saved State', null, null, this.getTagsForStencil(gn, 'vm saved state', dt).join(' ')),
			this.createVertexTemplateEntry(sn + 'vm_windows;',
					w * 23, h * 30, '', 'VM Windows', null, null, this.getTagsForStencil(gn, 'vm windows', dt).join(' ')),
			this.createVertexTemplateEntry(sn + 'vnic;',
					w * 31, h * 31, '', 'vNIC', null, null, this.getTagsForStencil(gn, 'vnic', dt).join(' ')),
			this.createVertexTemplateEntry(sn + 'wan_accelerator;',
					w * 23, h * 23, '', 'WAN Accelerator', null, null, this.getTagsForStencil(gn, 'wan accelerator', dt).join(' ')),
			this.createVertexTemplateEntry(sn + 'workstation;',
					w * 38, h * 31, '', 'Workstation', null, null, this.getTagsForStencil(gn, 'workstation', dt).join(' '))
		];
			
		this.addPalette('veeam3D', 'Veeam / 3D', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};
})();
