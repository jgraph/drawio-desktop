(function()
{
	Sidebar.prototype.addVeeam2Palette = function()
	{
		this.setCurrentSearchEntryLibrary('veeam2', 'veeam2Auxiliary');
		this.addVeeam2AuxiliaryPalette();
		this.setCurrentSearchEntryLibrary('veeam2', 'veeam2Data Center');
		this.addVeeam2DataCenterPalette();
		this.setCurrentSearchEntryLibrary('veeam2', 'veeam2Features');
		this.addVeeam2FeaturesPalette();
		this.setCurrentSearchEntryLibrary('veeam2', 'veeam2General');
		this.addVeeam2GeneralPalette();
		this.setCurrentSearchEntryLibrary('veeam2', 'veeam2Products and Components');
		this.addVeeam2ProductsComponentsPalette();
		this.setCurrentSearchEntryLibrary('veeam2', 'veeam2Software');
		this.addVeeam2SoftwarePalette();
		this.setCurrentSearchEntryLibrary('veeam2', 'veeam2States');
		this.addVeeam2StatesPalette();
		this.setCurrentSearchEntryLibrary('veeam2', 'veeam2Storage');
		this.addVeeam2StoragePalette();
		this.setCurrentSearchEntryLibrary('veeam2', 'veeam23D');
		this.addVeeam23DPalette();
		this.setCurrentSearchEntryLibrary();
	};
	
	Sidebar.prototype.addVeeam2AuxiliaryPalette = function()
	{
		// Space savers
		var sb = this;
		var gn = 'mxgraph.veeam2';
		var dt = 'veeam vmware virtual machine auxiliary';
		
		var w = 100;
		var h = 100;
		
		var fns =
		[
			this.createVertexTemplateEntry('pointerEvents=1;shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#13B24B;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam2.veeam_logo;',
					w * 1.36, h * 0.24, '', 'Veeam logo', null, null, this.getTagsForStencil(gn, 'logo', dt).join(' ')),
			this.createVertexTemplateEntry('align=left;verticalAlign=middle;fontFamily=Tahoma;strokeColor=#ECECEC;strokeWidth=2;html=1;whiteSpace=wrap;spacing=6;fontStyle=0',
					w * 1.5, h * 1.1, 'Please use Tahome font family, not less than 9 pt\n\nABCDEFGHIJKLM\nabcdefghijklm\n0123456789', 'Font', null, null, this.getTagsForStencil(gn, 'font', dt).join(' ')),
			this.createVertexTemplateEntry('align=left;verticalAlign=middle;fontFamily=Tahoma;fillColor=#005f4b;strokeColor=none;fontColor=#ffffff;strokeWidth=2;html=1;whiteSpace=wrap;spacing=6;fontStyle=0',
					w * 1.5, h * 1.1, 'Veeam Sapphire\n\nR: 0\nG: 95\nB: 75\n\n #005f4b', 'Veeam Sapphire', null, null, this.getTagsForStencil(gn, 'sapphite', dt).join(' ')),
			this.createVertexTemplateEntry('align=left;verticalAlign=middle;fontFamily=Tahoma;fillColor=#df8c42;strokeColor=none;fontColor=#ffffff;strokeWidth=2;html=1;whiteSpace=wrap;spacing=6;fontStyle=0',
					w * 1.5, h * 1.1, 'Orange\n\nR: 223\nG: 140\nB: 66\n\n #df8c42', 'Veeam Sapphire', null, null, this.getTagsForStencil(gn, 'orange', dt).join(' ')),
			this.createVertexTemplateEntry('align=left;verticalAlign=middle;fontFamily=Tahoma;fillColor=#d9d9d9;strokeColor=none;fontColor=#ffffff;strokeWidth=2;html=1;whiteSpace=wrap;spacing=6;fontStyle=0',
					w * 1.5, h * 1.1, 'Grey 2\n\nR: 217\nG: 217\nB: 217\n\n #d9d9d9', 'Grey 2', null, null, this.getTagsForStencil(gn, 'grey', dt).join(' ')),
			this.createVertexTemplateEntry('triangle;whiteSpace=wrap;html=1;gradientColor=#D3D3D3;strokeColor=none;gradientDirection=east;',
					w * 0.4, h * 1.6, '', 'Inclusion', null, null, this.getTagsForStencil(gn, 'inclusion', dt).join(' ')),
			this.createVertexTemplateEntry('rounded=0;whiteSpace=wrap;html=1;fillColor=none;strokeColor=#d3d3d3;strokeWidth=2;',
					w * 1.5, h * 1.1, '', 'Frame (grey 2)', null, null, this.getTagsForStencil(gn, 'grey frame', dt).join(' ')),
			this.createVertexTemplateEntry('rounded=0;whiteSpace=wrap;html=1;fillColor=none;strokeColor=#00B336;strokeWidth=2;',
					w * 1.5, h * 1.1, '', 'Frame (topaz)', null, null, this.getTagsForStencil(gn, 'topaz frame', dt).join(' ')),
		 	this.createEdgeTemplateEntry('edgeStyle=none;rounded=0;html=1;entryX=0;entryY=0.5;jettySize=auto;orthogonalLoop=1;strokeColor=#00B336;strokeWidth=2;fontColor=#000000;jumpStyle=none;endArrow=block;endFill=1;startArrow=block;startFill=1;', w, 0, 
		 			'',	'Connector (topaz)', null, dt + 'connector topaz'),
		 	this.createEdgeTemplateEntry('edgeStyle=none;rounded=0;html=1;entryX=0;entryY=0.5;jettySize=auto;orthogonalLoop=1;strokeColor=#404040;strokeWidth=2;fontColor=#000000;jumpStyle=none;endArrow=block;endFill=1;startArrow=block;startFill=1;', w, 0, 
		 			'',	'Connector (grey 3)', null, dt + 'connector grey'),
		 	this.createEdgeTemplateEntry('edgeStyle=none;rounded=0;html=1;entryX=0;entryY=0.5;jettySize=auto;orthogonalLoop=1;strokeColor=#D9D9D9;strokeWidth=2;fontColor=#000000;jumpStyle=none;endArrow=oval;endFill=1;startArrow=oval;startFill=1;', w, 0, 
		 			'',	'Connector (grey 2)', null, dt + 'connector grey'),
		 	this.createEdgeTemplateEntry('edgeStyle=none;rounded=0;html=1;entryX=0;entryY=0.5;jettySize=auto;orthogonalLoop=1;strokeColor=#00B336;strokeWidth=2;fontColor=#000000;jumpStyle=none;endArrow=oval;endFill=1;startArrow=oval;startFill=1;', w, 0, 
		 			'',	'Connector #2 (topaz)', null, dt + 'connector topaz'),
		 	this.createEdgeTemplateEntry('edgeStyle=none;rounded=0;html=1;entryX=0;entryY=0.5;jettySize=auto;orthogonalLoop=1;strokeColor=#404040;strokeWidth=2;fontColor=#000000;jumpStyle=none;endArrow=block;endFill=1;startArrow=none;', w, 0, 
		 			'',	'Arrow (grey 3)', null, dt + 'arrow grey'),
		 	this.createEdgeTemplateEntry('edgeStyle=none;rounded=0;html=1;entryX=0;entryY=0.5;jettySize=auto;orthogonalLoop=1;strokeColor=#00B336;strokeWidth=2;fontColor=#000000;jumpStyle=none;endArrow=block;endFill=1;startArrow=none;', w, 0, 
		 			'',	'Arrow (topaz)', null, dt + 'arrow topaz'),
		 	this.createEdgeTemplateEntry('edgeStyle=none;rounded=0;html=1;entryX=0;entryY=0.5;jettySize=auto;orthogonalLoop=1;strokeColor=#00B336;strokeWidth=2;fontColor=#000000;jumpStyle=none;endArrow=none;endFill=0;startArrow=none;dashed=1;', w, 0, 
		 			'',	'Dotted line (topaz)', null, dt + 'dotted line topaz'),
		 	this.createEdgeTemplateEntry('edgeStyle=none;rounded=0;html=1;entryX=0;entryY=0.5;jettySize=auto;orthogonalLoop=1;strokeColor=#404040;strokeWidth=2;fontColor=#000000;jumpStyle=none;endArrow=none;endFill=0;startArrow=none;dashed=1;', w, 0, 
		 			'',	'Dotted line (grey 3)', null, dt + 'dotted line grey'),
			this.createVertexTemplateEntry('ellipse;whiteSpace=wrap;html=1;aspect=fixed;strokeWidth=2;fontFamily=Tahoma;spacingBottom=4;spacingRight=2;strokeColor=#d3d3d3;',
					w * 0.2, h * 0.2, '1', 'Number one', null, null, this.getTagsForStencil(gn, 'number one', dt).join(' ')),
			this.createVertexTemplateEntry('ellipse;whiteSpace=wrap;html=1;aspect=fixed;strokeWidth=2;fontFamily=Tahoma;spacingBottom=4;spacingRight=2;strokeColor=#d3d3d3;',
					w * 0.2, h * 0.2, '2', 'Number two', null, null, this.getTagsForStencil(gn, 'number two', dt).join(' ')),
			this.createVertexTemplateEntry('ellipse;whiteSpace=wrap;html=1;aspect=fixed;strokeWidth=2;fontFamily=Tahoma;spacingBottom=4;spacingRight=2;strokeColor=#d3d3d3;',
					w * 0.2, h * 0.2, '3', 'Number three', null, null, this.getTagsForStencil(gn, 'number three', dt).join(' ')),
			this.createVertexTemplateEntry('ellipse;whiteSpace=wrap;html=1;aspect=fixed;strokeWidth=2;fontFamily=Tahoma;spacingBottom=4;spacingRight=2;strokeColor=#d3d3d3;',
					w * 0.2, h * 0.2, '4', 'Number four', null, null, this.getTagsForStencil(gn, 'number four', dt).join(' ')),
			this.createVertexTemplateEntry('ellipse;whiteSpace=wrap;html=1;aspect=fixed;strokeWidth=2;fontFamily=Tahoma;spacingBottom=4;spacingRight=2;strokeColor=#d3d3d3;',
					w * 0.2, h * 0.2, '5', 'Number five', null, null, this.getTagsForStencil(gn, 'number five', dt).join(' ')),
			this.createVertexTemplateEntry('ellipse;whiteSpace=wrap;html=1;aspect=fixed;strokeWidth=2;fontFamily=Tahoma;spacingBottom=4;spacingRight=2;strokeColor=#d3d3d3;',
					w * 0.2, h * 0.2, '6', 'Number six', null, null, this.getTagsForStencil(gn, 'number six', dt).join(' ')),
			this.createVertexTemplateEntry('ellipse;whiteSpace=wrap;html=1;aspect=fixed;strokeWidth=2;fontFamily=Tahoma;spacingBottom=4;spacingRight=2;strokeColor=#d3d3d3;',
					w * 0.2, h * 0.2, '7', 'Number seven', null, null, this.getTagsForStencil(gn, 'number seven', dt).join(' ')),
			this.createVertexTemplateEntry('ellipse;whiteSpace=wrap;html=1;aspect=fixed;strokeWidth=2;fontFamily=Tahoma;spacingBottom=4;spacingRight=2;strokeColor=#d3d3d3;',
					w * 0.2, h * 0.2, '8', 'Number eight', null, null, this.getTagsForStencil(gn, 'number eight', dt).join(' ')),
			this.createVertexTemplateEntry('ellipse;whiteSpace=wrap;html=1;aspect=fixed;strokeWidth=2;fontFamily=Tahoma;spacingBottom=4;spacingRight=2;strokeColor=#d3d3d3;',
					w * 0.2, h * 0.2, '9', 'Number nine', null, null, this.getTagsForStencil(gn, 'number nine', dt).join(' '))
		];
			
		this.addPalette('veeam2Auxiliary', 'Veeam / Auxiliary', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};

	Sidebar.prototype.addVeeam2DataCenterPalette = function()
	{
		var s = 'sketch=0;pointerEvents=1;shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#005F4B;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam2.';
		var s2 = 'sketch=0;pointerEvents=1;shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#DF8C42;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam2.';
		
		// Space savers
		var sb = this;
		var gn = 'mxgraph.veeam2';
		var dt = 'veeam vm vmware virtual machine data center';
		
		var w = 100;
		var h = 100;
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'datacenter;',
					w * 0.83, h * 0.53, '', 'Datacenter', null, null, this.getTagsForStencil(gn, 'datacenter', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'cloud;',
					w * 0.4, h * 0.25, '', 'Cloud', null, null, this.getTagsForStencil(gn, 'cloud', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'azure;',
					w * 0.34, h * 0.34, '', 'Azure', null, null, this.getTagsForStencil(gn, 'azure', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'aws;',
					w * 0.34, h * 0.34, '', 'AWS', null, null, this.getTagsForStencil(gn, 'aws', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'server;',
					w * 0.23, h * 0.39, '', 'Server', null, null, this.getTagsForStencil(gn, 'server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'server_cluster;',
					w * 0.56, h * 0.28, '', 'Server Cluster', null, null, this.getTagsForStencil(gn, 'server cluster', dt).join(' ')),
			this.createVertexTemplateEntry(s + '1u_server;',
					w * 0.4, h * 0.11, '', '1U Server', null, null, this.getTagsForStencil(gn, '1u one unit server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'server_stack;',
					w * 0.4, h * 0.4, '', 'Server Stack', null, null, this.getTagsForStencil(gn, 'server stack', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'monitor;',
					w * 0.51, h * 0.4, '', 'Monitor', null, null, this.getTagsForStencil(gn, 'monitor', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'laptop;',
					w * 0.48, h * 0.28, '', 'Laptop', null, null, this.getTagsForStencil(gn, 'laptop', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'workstation;',
					w * 0.38, h * 0.28, '', 'Workstation', null, null, this.getTagsForStencil(gn, 'workstation', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'virtual_host;',
					w * 0.82, h * 0.79, '', 'Virtual Host', null, null, this.getTagsForStencil(gn, 'virtual host', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'esxi_host;',
					w * 0.82, h * 0.79, '', 'ESXi Host', null, null, this.getTagsForStencil(gn, 'esxi host', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'hyper_v_host;',
					w * 0.82, h * 0.79, '', 'Hyper-V Host', null, null, this.getTagsForStencil(gn, 'hyper hyperv host', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'ahv_host;',
					w * 0.82, h * 0.79, '', 'AHV Host', null, null, this.getTagsForStencil(gn, 'ahv host', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'esxi_hyper_v_ahv_host;',
					w * 0.82, h * 0.79, '', 'ESXi/Hyper-V/AHV Host', null, null, this.getTagsForStencil(gn, 'esxi hyper hyperv ahv host', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'esxi_hyper_v_host;',
					w * 0.82, h * 0.79, '', 'ESXi/Hyper-V Host', null, null, this.getTagsForStencil(gn, 'esxi hyper hyperv host', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'cpu;',
					w * 0.28, h * 0.28, '', 'CPU', null, null, this.getTagsForStencil(gn, 'cpu central processing unit', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'cpu_socket;',
					w * 0.28, h * 0.28, '', 'CPU Socket', null, null, this.getTagsForStencil(gn, 'cpu socket central processing unit', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'ram;',
					w * 0.4, h * 0.19, '', 'RAM', null, null, this.getTagsForStencil(gn, 'ram random access memory', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'hdd;',
					w * 0.28, h * 0.35, '', 'HDD', null, null, this.getTagsForStencil(gn, 'hdd hard disk drive', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'network_card;',
					w * 0.38, h * 0.27, '', 'Network Card', null, null, this.getTagsForStencil(gn, 'network card', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'hardware_controller;',
					w * 0.38, h * 0.28, '', 'Hardware Controller', null, null, this.getTagsForStencil(gn, 'hardware controller', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'physical_switch;',
					w * 0.53, h * 0.15, '', 'Physical Switch', null, null, this.getTagsForStencil(gn, 'physical switch', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'vmware_vswitch;',
					w * 0.4, h * 0.11, '', 'VMware vSwitch', null, null, this.getTagsForStencil(gn, 'vswitch', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'usb_drive;',
					w * 0.4, h * 0.17, '', 'USB Drive', null, null, this.getTagsForStencil(gn, 'usb drive', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'sd_card;',
					w * 0.23, h * 0.28, '', 'SD Card', null, null, this.getTagsForStencil(gn, 'sd card', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'virtual_machine;',
					w * 0.28, h * 0.28, '', 'Virtual Machine', null, null, this.getTagsForStencil(gn, '', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'vm_snapshot;',
					w * 0.38, h * 0.38, '', 'VM Snapshot', null, null, this.getTagsForStencil(gn, 'vnapshot', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'vm_with_a_snapshot;',
					w * 0.42, h * 0.42, '', 'VM with a Snapshot', null, null, this.getTagsForStencil(gn, 'with vnapshot', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'vm_checked;',
					w * 0.36, h * 0.36, '', 'VM Checked', null, null, this.getTagsForStencil(gn, 'checked', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'vm_failed;',
					w * 0.36, h * 0.36, '', 'VM Failed', null, null, this.getTagsForStencil(gn, 'failed', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'vm_turn_on_off;',
					w * 0.36, h * 0.36, '', 'VM turn on/off', null, null, this.getTagsForStencil(gn, 'turn on off', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'vm_paused_saved_state;',
					w * 0.36, h * 0.36, '', 'VM paused/saved state', null, null, this.getTagsForStencil(gn, 'paused saved state', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'vm_locked;',
					w * 0.36, h * 0.36, '', 'VM locked', null, null, this.getTagsForStencil(gn, 'locked', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'vm_running;',
					w * 0.36, h * 0.36, '', 'VM running', null, null, this.getTagsForStencil(gn, 'running', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'linux_vm;',
					w * 0.36, h * 0.36, '', 'Linux VM', null, null, this.getTagsForStencil(gn, 'linux', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'windows_vm;',
					w * 0.36, h * 0.36, '', 'Windows VM', null, null, this.getTagsForStencil(gn, 'windows', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'vapp;',
					w * 0.28, h * 0.28, '', 'vApp', null, null, this.getTagsForStencil(gn, 'vapp', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'vapp_running;',
					w * 0.36, h * 0.36, '', 'vApp Running', null, null, this.getTagsForStencil(gn, 'vapp running', dt).join(' '))
		];
			
		this.addPalette('veeam2Data Center', 'Veeam / Data Center', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};

	Sidebar.prototype.addVeeam2FeaturesPalette = function()
	{
		var s2 = 'sketch=0;pointerEvents=1;shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#DF8C42;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam2.';
		
		// Space savers
		var sb = this;
		var gn = 'mxgraph.veeam2';
		var dt = 'veeam vm vmware virtual machine features';
		
		var w = 100;
		var h = 100;
		
		var fns =
		[
			this.createVertexTemplateEntry('pointerEvents=1;shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#13B24B;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam2.veeam_logo;',
					w * 1.36, h * 0.24, '', 'Veeam logo', null, null, this.getTagsForStencil(gn, 'logo', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'backup_from_storage_snapshots;',
					w * 0.34, h * 0.34, '', 'Backup from Storage Snapshots', null, null, this.getTagsForStencil(gn, 'backup from storage snapshots', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'cdp;',
					w * 0.34, h * 0.34, '', 'CDP', null, null, this.getTagsForStencil(gn, 'cdp', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'datalabs;',
					w * 0.34, h * 0.34, '', 'Datalabs', null, null, this.getTagsForStencil(gn, 'datalabs', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'failover;',
					w * 0.34, h * 0.34, '', 'Failover', null, null, this.getTagsForStencil(gn, 'failover', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'instant_vm_recovery;',
					w * 0.34, h * 0.34, '', 'Instant VM recovery', null, null, this.getTagsForStencil(gn, 'instant recovery', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'nas_backup;',
					w * 0.34, h * 0.34, '', 'NAS Backup', null, null, this.getTagsForStencil(gn, 'nas backup', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'object_storage_support;',
					w * 0.34, h * 0.34, '', 'Object Storage Support', null, null, this.getTagsForStencil(gn, 'object storage support', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'on_demand_sandbox;',
					w * 0.34, h * 0.34, '', 'On-demand Sandbox', null, null, this.getTagsForStencil(gn, 'on demand sandbox', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'restful_api;',
					w * 0.34, h * 0.34, '', 'RESTful API', null, null, this.getTagsForStencil(gn, 'restful api application programming interface', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'scale_out_backup_repository2;',
					w * 0.34, h * 0.34, '', 'Scale-out Backup Repository', null, null, this.getTagsForStencil(gn, 'scale out backup repository', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'scheduled_backups;',
					w * 0.34, h * 0.34, '', 'Scheduled Backups', null, null, this.getTagsForStencil(gn, 'scheduled backups', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'surebackup;',
					w * 0.34, h * 0.34, '', 'SureBackup', null, null, this.getTagsForStencil(gn, 'surebackup', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'surereplica;',
					w * 0.34, h * 0.34, '', 'SureReplica', null, null, this.getTagsForStencil(gn, 'surereplica', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'vbr_console;',
					w * 0.34, h * 0.34, '', 'VBR console', null, null, this.getTagsForStencil(gn, 'vbr console', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'veeam_cloud_connect;',
					w * 0.34, h * 0.34, '', 'Veeam Cloud Connect', null, null, this.getTagsForStencil(gn, 'cloud connect', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'veeam_cloud_mobility;',
					w * 0.34, h * 0.34, '', 'Veeam Cloud Mobility', null, null, this.getTagsForStencil(gn, 'cloud mobility', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'veeamzip;',
					w * 0.34, h * 0.34, '', 'VeeamZIP', null, null, this.getTagsForStencil(gn, 'veeamzip zip', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'veeam_explorers;',
					w * 0.34, h * 0.34, '', 'Veeam Explorers', null, null, this.getTagsForStencil(gn, 'veeam explorers', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'universal_storage_api;',
					w * 0.34, h * 0.34, '', 'Universal Storage API', null, null, this.getTagsForStencil(gn, 'universal storage api application programming interface', dt).join(' '))
		];
			
		this.addPalette('veeam2Features', 'Veeam / Features', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};

	Sidebar.prototype.addVeeam2GeneralPalette = function()
	{
		var s = 'sketch=0;pointerEvents=1;shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#005F4B;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam2.';
		
		// Space savers
		var sb = this;
		var gn = 'mxgraph.veeam2';
		var dt = 'veeam vm vmware virtual machine general';
		
		var w = 100;
		var h = 100;
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'enterprise_business;',
					w * 0.38, h * 0.33, '', 'Enterprise (business)', null, null, this.getTagsForStencil(gn, 'enterprise business', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'smb_business;',
					w * 0.38, h * 0.27, '', 'SMB (business)', null, null, this.getTagsForStencil(gn, 'smb business', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'automation;',
					w * 0.28, h * 0.28, '', 'Automation', null, null, this.getTagsForStencil(gn, 'automation', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'service_application;',
					w * 0.28, h * 0.28, '', 'Service Application', null, null, this.getTagsForStencil(gn, 'service application', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'cloud;',
					w * 0.4, h * 0.25, '', 'Cloud', null, null, this.getTagsForStencil(gn, 'cloud', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'database;',
					w * 0.23, h * 0.28, '', 'Database', null, null, this.getTagsForStencil(gn, 'database', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'report;',
					w * 0.28, h * 0.39, '', 'Report', null, null, this.getTagsForStencil(gn, 'report', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'task_list;',
					w * 0.28, h * 0.39, '', 'Task List', null, null, this.getTagsForStencil(gn, 'task list', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'dr_plan;',
					w * 0.28, h * 0.42, '', 'DR Plan', null, null, this.getTagsForStencil(gn, 'dr plan', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'folder;',
					w * 0.28, h * 0.24, '', 'Folder', null, null, this.getTagsForStencil(gn, 'folder', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'file;',
					w * 0.28, h * 0.39, '', 'File', null, null, this.getTagsForStencil(gn, 'file', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'audio_file;',
					w * 0.28, h * 0.39, '', 'Audio File', null, null, this.getTagsForStencil(gn, 'audio file', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'data_file;',
					w * 0.28, h * 0.39, '', 'Data File', null, null, this.getTagsForStencil(gn, 'data file', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'iso_file;',
					w * 0.28, h * 0.39, '', 'ISO File', null, null, this.getTagsForStencil(gn, 'iso file', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'metadata_file;',
					w * 0.28, h * 0.39, '', 'Metadata File', null, null, this.getTagsForStencil(gn, 'metadata file', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'license_file;',
					w * 0.28, h * 0.39, '', 'License File', null, null, this.getTagsForStencil(gn, 'license file', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'video_file;',
					w * 0.28, h * 0.39, '', 'Video File', null, null, this.getTagsForStencil(gn, 'video file', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'alarm;',
					w * 0.28, h * 0.28, '', 'Alarm', null, null, this.getTagsForStencil(gn, 'alarm', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'backup_browser;',
					w * 0.28, h * 0.28, '', 'Backup Browser', null, null, this.getTagsForStencil(gn, 'backup browser', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'calendar;',
					w * 0.28, h * 0.28, '', 'Calendar', null, null, this.getTagsForStencil(gn, 'calendar', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'command_line;',
					w * 0.28, h * 0.28, '', 'Command Line', null, null, this.getTagsForStencil(gn, 'command line', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'cd;',
					w * 0.28, h * 0.28, '', 'CD', null, null, this.getTagsForStencil(gn, 'cd compact disc', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'controller;',
					w * 0.28, h * 0.28, '', 'Controller', null, null, this.getTagsForStencil(gn, 'controller', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'deduplication;',
					w * 0.28, h * 0.28, '', 'Deduplication', null, null, this.getTagsForStencil(gn, 'deduplication', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'download;',
					w * 0.28, h * 0.28, '', 'Download', null, null, this.getTagsForStencil(gn, 'download', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'dns;',
					w * 0.28, h * 0.28, '', 'DNS', null, null, this.getTagsForStencil(gn, 'dns domain name store', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'globe;',
					w * 0.28, h * 0.28, '', 'Globe', null, null, this.getTagsForStencil(gn, 'globe', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'key;',
					w * 0.28, h * 0.28, '', 'Key', null, null, this.getTagsForStencil(gn, 'key', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'encryption_key;',
					w * 0.36, h * 0.36, '', 'Encryption Key', null, null, this.getTagsForStencil(gn, 'encryption key', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'letter;',
					w * 0.28, h * 0.2, '', 'Letter', null, null, this.getTagsForStencil(gn, 'letter', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'exchange_objects;',
					w * 0.28, h * 0.28, '', 'Exchange objects', null, null, this.getTagsForStencil(gn, 'exchange objects', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'magnifying_glass;',
					w * 0.28, h * 0.28, '', 'Magnifying Glass', null, null, this.getTagsForStencil(gn, 'magnifying glass', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'restore;',
					w * 0.28, h * 0.28, '', 'Restore', null, null, this.getTagsForStencil(gn, 'restore', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'role;',
					w * 0.28, h * 0.39, '', 'Role', null, null, this.getTagsForStencil(gn, 'role', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'interface_console;',
					w * 0.28, h * 0.28, '', 'Interface / Console', null, null, this.getTagsForStencil(gn, 'interface console', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'monitoring_console;',
					w * 0.28, h * 0.28, '', 'Monitoring Console', null, null, this.getTagsForStencil(gn, 'monitoring console', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'web_console;',
					w * 0.28, h * 0.28, '', 'Web Console', null, null, this.getTagsForStencil(gn, 'web console', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'file_browser;',
					w * 0.28, h * 0.28, '', 'File Browser', null, null, this.getTagsForStencil(gn, 'file browser', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'table;',
					w * 0.28, h * 0.28, '', 'Table', null, null, this.getTagsForStencil(gn, 'table', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'time_clocks;',
					w * 0.28, h * 0.28, '', 'Time / Clocks', null, null, this.getTagsForStencil(gn, 'time clocks', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'tag;',
					w * 0.28, h * 0.28, '', 'Tag', null, null, this.getTagsForStencil(gn, 'tag', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'transport;',
					w * 0.38, h * 0.23, '', 'Transport', null, null, this.getTagsForStencil(gn, 'transport', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'vpn;',
					w * 0.28, h * 0.28, '', 'VPN', null, null, this.getTagsForStencil(gn, 'vpn virtual private network', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'user;',
					w * 0.28, h * 0.28, '', 'User', null, null, this.getTagsForStencil(gn, 'user', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'user_group;',
					w * 0.28, h * 0.28, '', 'User Group', null, null, this.getTagsForStencil(gn, 'user group', dt).join(' '))
		];
			
		this.addPalette('veeam2General', 'Veeam / General', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};

	Sidebar.prototype.addVeeam2ProductsComponentsPalette = function()
	{
		var s = 'sketch=0;pointerEvents=1;shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#005F4B;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam2.';
		var s2 = 'sketch=0;pointerEvents=1;shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#DF8C42;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam2.';
		
		// Space savers
		var sb = this;
		var gn = 'mxgraph.veeam2';
		var dt = 'veeam vm vmware virtual machine products and components';
		
		var w = 100;
		var h = 100;
		
		var fns =
		[
			this.createVertexTemplateEntry('pointerEvents=1;shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#13B24B;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam2.veeam_logo;',
					w * 1.36, h * 0.24, '', 'Veeam logo', null, null, this.getTagsForStencil(gn, 'logo', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'veeam_availability_suite;',
					w * 0.34, h * 0.34, '', 'Veeam Availability Suite', null, null, this.getTagsForStencil(gn, 'availability suite', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'vas_server;',
					w * 0.4, h * 0.52, '', 'VAS server', null, null, this.getTagsForStencil(gn, 'vas server', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'veeam_backup_replication;',
					w * 0.34, h * 0.34, '', 'Veeam Backup & Replication', null, null, this.getTagsForStencil(gn, 'backup and replication', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'vbr_server;',
					w * 0.4, h * 0.52, '', 'VBR server', null, null, this.getTagsForStencil(gn, 'vbr server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'proxy_server;',
					w * 0.4, h * 0.52, '', 'Proxy Server', null, null, this.getTagsForStencil(gn, 'proxy server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'repository_server;',
					w * 0.4, h * 0.52, '', 'Repository Server', null, null, this.getTagsForStencil(gn, 'repository server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'mount_server;',
					w * 0.4, h * 0.52, '', 'Mount Server', null, null, this.getTagsForStencil(gn, 'mount server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'tape_server;',
					w * 0.4, h * 0.52, '', 'Tape Server', null, null, this.getTagsForStencil(gn, 'tape server', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'veeam_backup_enterprise_manager;',
					w * 0.34, h * 0.34, '', 'Veeam Backup Enterprise Manager', null, null, this.getTagsForStencil(gn, 'backup enterprise manager', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'vbem_server;',
					w * 0.4, h * 0.52, '', 'VBEM Server', null, null, this.getTagsForStencil(gn, 'vbem server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'search_server;',
					w * 0.4, h * 0.52, '', 'Search Server', null, null, this.getTagsForStencil(gn, 'search server', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'veeam_cloud_connect;',
					w * 0.34, h * 0.34, '', 'Veeam Cloud Connect', null, null, this.getTagsForStencil(gn, 'cloud connect', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'veeam_one;',
					w * 0.34, h * 0.34, '', 'Veeam ONE', null, null, this.getTagsForStencil(gn, 'one', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'one_server;',
					w * 0.4, h * 0.52, '', 'ONE Server', null, null, this.getTagsForStencil(gn, 'one server', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'veeam_one_reporter;',
					w * 0.34, h * 0.34, '', 'Veeam ONE Reporter', null, null, this.getTagsForStencil(gn, 'one reporter', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'veeam_agents;',
					w * 0.34, h * 0.34, '', 'Veeam Agents', null, null, this.getTagsForStencil(gn, 'agents', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'server_with_veeam_agent;',
					w * 0.4, h * 0.52, '', 'Server with Veeam Agent', null, null, this.getTagsForStencil(gn, 'server with agent', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'veeam_agent_for_windows;',
					w * 0.34, h * 0.34, '', 'Veeam Agent for Windows', null, null, this.getTagsForStencil(gn, 'agent for windows', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'veeam_agent_for_linux;',
					w * 0.34, h * 0.34, '', 'Veeam Agent for Linux', null, null, this.getTagsForStencil(gn, 'agent for linux', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'veeam_agent_for_oracle_solaris;',
					w * 0.34, h * 0.34, '', 'Veeam Agent for Oracle Solaris', null, null, this.getTagsForStencil(gn, 'agent for oracle solaris', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'veeam_agent_for_ibm_aix;',
					w * 0.34, h * 0.34, '', 'Veeam Agent for IBM AIX', null, null, this.getTagsForStencil(gn, 'agent for ibm aix', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'veeam_explorer_for_exchange;',
					w * 0.34, h * 0.34, '', 'Veeam Explorer for Exchange', null, null, this.getTagsForStencil(gn, 'explorer for exchange', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'veeam_explorer_for_active_directory;',
					w * 0.34, h * 0.34, '', 'Veeam Explorer for Active Directory', null, null, this.getTagsForStencil(gn, 'explorer for active directory', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'veeam_explorer_for_oracle;',
					w * 0.34, h * 0.34, '', 'Veeam Explorer for Oracle', null, null, this.getTagsForStencil(gn, 'explorer for oracle', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'veeam_explorer_for_onedrive;',
					w * 0.34, h * 0.34, '', 'Veeam Explorer for OneDrive', null, null, this.getTagsForStencil(gn, 'explorer for onedrive', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'veeam_explorer_for_storage_snapshots;',
					w * 0.34, h * 0.34, '', 'Veeam Explorer for Storage Snapshots', null, null, this.getTagsForStencil(gn, 'explorer for storage snapshots', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'veeam_explorer_for_sql;',
					w * 0.34, h * 0.34, '', 'Veeam Explorer for SQL', null, null, this.getTagsForStencil(gn, 'explorer for sql', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'veeam_explorer_for_sharepoint;',
					w * 0.34, h * 0.34, '', 'Veeam Explorer for SharePoint', null, null, this.getTagsForStencil(gn, 'explorer for sharepoint', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'veeam_plugin_for_oracle_rman;',
					w * 0.34, h * 0.34, '', 'Veeam Plugin for Oracle RMAN', null, null, this.getTagsForStencil(gn, 'plugin for oracle rman', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'veeam_plugin_for_sap_hana;',
					w * 0.34, h * 0.34, '', 'Veeam Plugin for SAP HANA', null, null, this.getTagsForStencil(gn, 'plugin for sap hana', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'veeam_plugin_for_sap_on_oracle;',
					w * 0.34, h * 0.34, '', 'Veeam Plugin for SAP on Oracle', null, null, this.getTagsForStencil(gn, 'plugin for sap on oracle', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'veeam_backup_for_office_365;',
					w * 0.34, h * 0.34, '', 'Veeam Backup for Office 365', null, null, this.getTagsForStencil(gn, 'plugin for office 365', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'vbo_server;',
					w * 0.4, h * 0.52, '', 'VBO Server', null, null, this.getTagsForStencil(gn, 'vbo server', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'veeam_mp;',
					w * 0.34, h * 0.34, '', 'Veeam MP', null, null, this.getTagsForStencil(gn, 'mp', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'veeam_pn;',
					w * 0.34, h * 0.34, '', 'Veeam PN', null, null, this.getTagsForStencil(gn, 'pn', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'vpn_server;',
					w * 0.4, h * 0.52, '', 'VPN Server', null, null, this.getTagsForStencil(gn, 'vpn server', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'veeam_availability_orchestrator;',
					w * 0.34, h * 0.34, '', 'Veeam Availability Orchestrator', null, null, this.getTagsForStencil(gn, 'availability orchestrator', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'vao_server;',
					w * 0.4, h * 0.52, '', 'VAO Server', null, null, this.getTagsForStencil(gn, 'vao server', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'veeam_service_provider_console;',
					w * 0.34, h * 0.34, '', 'Veeam Service Provider Console', null, null, this.getTagsForStencil(gn, 'service provider console', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'vspc_server;',
					w * 0.4, h * 0.52, '', 'VSPC Server', null, null, this.getTagsForStencil(gn, 'vspc server', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'agent;',
					w * 0.21, h * 0.21, '', 'Agent', null, null, this.getTagsForStencil(gn, 'agent', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'transport_service;',
					w * 0.21, h * 0.21, '', 'Transport Service', null, null, this.getTagsForStencil(gn, 'transport service', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'data_mover;',
					w * 0.21, h * 0.21, '', 'Data Mover', null, null, this.getTagsForStencil(gn, 'data mover', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'veeam_proxy;',
					w * 0.21, h * 0.21, '', 'Veeam Proxy', null, null, this.getTagsForStencil(gn, 'veeam proxy', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'wan_accelerator;',
					w * 0.21, h * 0.21, '', 'WAN Accelerator', null, null, this.getTagsForStencil(gn, 'wan accelerator wide area network', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'flr_helper_appliance;',
					w * 0.21, h * 0.21, '', 'FLR Helper Appliance', null, null, this.getTagsForStencil(gn, 'flr helper appliance', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'network_proxy;',
					w * 0.28, h * 0.28, '', 'Network Proxy', null, null, this.getTagsForStencil(gn, 'network proxy', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'veeam_repository;',
					w * 0.37, h * 0.38, '', 'Veeam Repository', null, null, this.getTagsForStencil(gn, 'repository', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'windows_repository;',
					w * 0.37, h * 0.38, '', 'Windows Repository', null, null, this.getTagsForStencil(gn, 'windows repository', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'linux_repository;',
					w * 0.37, h * 0.38, '', 'Linux Repository', null, null, this.getTagsForStencil(gn, 'linux repository', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'cloud_repository;',
					w * 0.37, h * 0.38, '', 'Cloud Repository', null, null, this.getTagsForStencil(gn, 'cloud repository', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'scale_out_backup_repository;',
					w * 0.37, h * 0.38, '', 'Scale-Out Backup Repository', null, null, this.getTagsForStencil(gn, 'scale out backup repository', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'vbo_repository;',
					w * 0.37, h * 0.38, '', 'VBO Repository', null, null, this.getTagsForStencil(gn, 'vbo repository', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'vbr_repository;',
					w * 0.37, h * 0.38, '', 'VBR Repository', null, null, this.getTagsForStencil(gn, 'vbr repository', dt).join(' '))
		];
			
		this.addPalette('veeam2Products and Components', 'Veeam / Products and Components', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};

	Sidebar.prototype.addVeeam2SoftwarePalette = function()
	{
		var s = 'sketch=0;pointerEvents=1;shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#005F4B;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam2.';
		var s2 = 'sketch=0;pointerEvents=1;shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#DF8C42;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam2.';
		
		// Space savers
		var sb = this;
		var gn = 'mxgraph.veeam2';
		var dt = 'veeam vm vmware virtual machine software';
		
		var w = 100;
		var h = 100;
		
		var fns =
		[
			this.createVertexTemplateEntry(s2 + 'antivirus;',
					w * 0.34, h * 0.34, '', 'Antivirus', null, null, this.getTagsForStencil(gn, 'antivirus', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'firewall;',
					w * 0.34, h * 0.34, '', 'Firewall', null, null, this.getTagsForStencil(gn, 'firewall', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'application;',
					w * 0.34, h * 0.34, '', 'Application', null, null, this.getTagsForStencil(gn, 'application', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'linux;',
					w * 0.34, h * 0.34, '', 'Linux', null, null, this.getTagsForStencil(gn, 'linux', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'linux_server;',
					w * 0.4, h * 0.52, '', 'Linux Server', null, null, this.getTagsForStencil(gn, 'linux server', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'microsoft_active_directory;',
					w * 0.34, h * 0.34, '', 'Microsoft Active Directory', null, null, this.getTagsForStencil(gn, 'microsoft ms active directory', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'domain_controller;',
					w * 0.4, h * 0.52, '', 'Domain Controller', null, null, this.getTagsForStencil(gn, 'domain controller', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'microsoft_exchange;',
					w * 0.34, h * 0.34, '', 'Microsoft Exchange', null, null, this.getTagsForStencil(gn, 'microsoft ms exchange', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'exchange_server;',
					w * 0.4, h * 0.52, '', 'Exchange Server', null, null, this.getTagsForStencil(gn, 'exchange server', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'microsoft_scom;',
					w * 0.34, h * 0.34, '', 'Microsoft SCOM', null, null, this.getTagsForStencil(gn, 'microsoft ms scom', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'microsoft_scvmm;',
					w * 0.34, h * 0.34, '', 'Microsoft SCVMM', null, null, this.getTagsForStencil(gn, 'microsoft ms scvmm', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'microsoft_sharepoint;',
					w * 0.34, h * 0.34, '', 'Microsoft SharePoint', null, null, this.getTagsForStencil(gn, 'microsoft ms sharepoint', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'sharepoint_server;',
					w * 0.4, h * 0.52, '', 'Sharepoint Server', null, null, this.getTagsForStencil(gn, 'sharepoint server', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'microsoft_sql;',
					w * 0.34, h * 0.34, '', 'Microsoft SQL', null, null, this.getTagsForStencil(gn, 'microsoft ms sql', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'sql_server;',
					w * 0.4, h * 0.52, '', 'SQL Server', null, null, this.getTagsForStencil(gn, 'sql server', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'microsoft_teams;',
					w * 0.34, h * 0.34, '', 'Microsoft Teams', null, null, this.getTagsForStencil(gn, 'microsoft ms teams', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'microsoft_windows;',
					w * 0.34, h * 0.34, '', 'Microsoft Windows', null, null, this.getTagsForStencil(gn, 'microsoft ms windows', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'windows_server;',
					w * 0.4, h * 0.52, '', 'Windows Server', null, null, this.getTagsForStencil(gn, 'windows server', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'microsoft_onedrive;',
					w * 0.34, h * 0.34, '', 'Microsoft OneDrive', null, null, this.getTagsForStencil(gn, 'microsoft ms onedrive', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'microsoft_outlook;',
					w * 0.34, h * 0.34, '', 'Microsoft Outlook', null, null, this.getTagsForStencil(gn, 'microsoft ms outlook', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'microsoft_office;',
					w * 0.34, h * 0.34, '', 'Microsoft Office', null, null, this.getTagsForStencil(gn, 'microsoft ms office', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'power_shell;',
					w * 0.34, h * 0.34, '', 'PowerShell', null, null, this.getTagsForStencil(gn, 'powershell', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'oracle_rman;',
					w * 0.34, h * 0.34, '', 'Oracle RMAN', null, null, this.getTagsForStencil(gn, 'oracle rman', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'sap_brtools;',
					w * 0.34, h * 0.34, '', 'SAP BRTools', null, null, this.getTagsForStencil(gn, 'sap brtools', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'sap_hana;',
					w * 0.34, h * 0.34, '', 'SAP HANA', null, null, this.getTagsForStencil(gn, 'sap hana', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'nutanix;',
					w * 0.34, h * 0.34, '', 'Nutanix', null, null, this.getTagsForStencil(gn, 'nutanix', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'server_nutanix;',
					w * 0.4, h * 0.52, '', 'Server Nutanix', null, null, this.getTagsForStencil(gn, 'server nutanix', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'vmware_vcloud_director;',
					w * 0.34, h * 0.34, '', 'VMware vCloud Director', null, null, this.getTagsForStencil(gn, 'vmware vcloud director', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'vcloud_director_server;',
					w * 0.4, h * 0.52, '', 'vCloud Director Server', null, null, this.getTagsForStencil(gn, 'vcloud director server', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'vmware_vsphere;',
					w * 0.34, h * 0.34, '', 'VMware vSphere', null, null, this.getTagsForStencil(gn, 'vmware vsphere', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'vcenter_server;',
					w * 0.4, h * 0.52, '', 'vCenter Server', null, null, this.getTagsForStencil(gn, 'vcenter server', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'database2;',
					w * 0.34, h * 0.34, '', 'Database', null, null, this.getTagsForStencil(gn, 'database db', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'database_server;',
					w * 0.4, h * 0.52, '', 'Database Server', null, null, this.getTagsForStencil(gn, 'database server db', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'microsoft_sql_db;',
					w * 0.34, h * 0.34, '', 'Microsoft SQL DB', null, null, this.getTagsForStencil(gn, 'microsoft sql db database', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'oracle_db;',
					w * 0.34, h * 0.34, '', 'Oracle DB', null, null, this.getTagsForStencil(gn, 'oracle db database', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'sap_hana_db;',
					w * 0.34, h * 0.34, '', 'SAP HANA DB', null, null, this.getTagsForStencil(gn, 'sap hana db database', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'open_vpn;',
					w * 0.34, h * 0.34, '', 'OpenVPN', null, null, this.getTagsForStencil(gn, 'openvpn open vpn virtual private network', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'wireguard;',
					w * 0.34, h * 0.34, '', 'WireGuard', null, null, this.getTagsForStencil(gn, 'wireguard', dt).join(' '))
		];
			
		this.addPalette('veeam2Software', 'Veeam / Software', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};

	Sidebar.prototype.addVeeam2StatesPalette = function()
	{
		var s2 = 'sketch=0;pointerEvents=1;shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#DF8C42;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam2.';
		
		// Space savers
		var sb = this;
		var gn = 'mxgraph.veeam2';
		var dt = 'veeam vm vmware virtual machine states';
		
		var w = 100;
		var h = 100;
		
		var fns =
		[
			this.createVertexTemplateEntry(s2 + 'turn_on_off;',
					w * 0.21, h * 0.21, '', 'Turn on / off', null, null, this.getTagsForStencil(gn, 'turn on off', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'running_playing;',
					w * 0.21, h * 0.21, '', 'Running / Playing', null, null, this.getTagsForStencil(gn, 'running playing', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'critical;',
					w * 0.21, h * 0.21, '', 'Critical', null, null, this.getTagsForStencil(gn, 'critical', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'failed;',
					w * 0.21, h * 0.21, '', 'Failed', null, null, this.getTagsForStencil(gn, 'failed', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'unavailable;',
					w * 0.21, h * 0.21, '', 'Unavailable', null, null, this.getTagsForStencil(gn, 'unavailable', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'paused;',
					w * 0.21, h * 0.21, '', 'Paused / saved', null, null, this.getTagsForStencil(gn, 'paused', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'zipped;',
					w * 0.21, h * 0.21, '', 'Zipped', null, null, this.getTagsForStencil(gn, 'zipped', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'recording;',
					w * 0.21, h * 0.21, '', 'Recording', null, null, this.getTagsForStencil(gn, 'recording', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'locked;',
					w * 0.21, h * 0.21, '', 'Locked', null, null, this.getTagsForStencil(gn, 'locked', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'unlocked;',
					w * 0.21, h * 0.21, '', 'Unlocked', null, null, this.getTagsForStencil(gn, 'unlocked', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'encrypted;',
					w * 0.21, h * 0.21, '', 'encrypted', null, null, this.getTagsForStencil(gn, 'enrypted', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'delayed;',
					w * 0.21, h * 0.21, '', 'Delayed', null, null, this.getTagsForStencil(gn, 'delayed', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'restored;',
					w * 0.21, h * 0.21, '', 'Restored', null, null, this.getTagsForStencil(gn, 'restored', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'exported;',
					w * 0.21, h * 0.21, '', 'Exported', null, null, this.getTagsForStencil(gn, 'exported', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'ejected;',
					w * 0.21, h * 0.21, '', 'Ejected', null, null, this.getTagsForStencil(gn, 'ejected', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'instant;',
					w * 0.21, h * 0.21, '', 'Instant', null, null, this.getTagsForStencil(gn, 'instant', dt).join(' '))
		];
			
		this.addPalette('veeam2States', 'Veeam / States', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};

	Sidebar.prototype.addVeeam2StoragePalette = function()
	{
		var s = 'sketch=0;pointerEvents=1;shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#005F4B;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam2.';
		var s2 = 'sketch=0;pointerEvents=1;shadow=0;dashed=0;html=1;strokeColor=none;fillColor=#DF8C42;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam2.';
		
		// Space savers
		var sb = this;
		var gn = 'mxgraph.veeam2';
		var dt = 'veeam vm vmware virtual machine storage';
		
		var w = 100;
		var h = 100;
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'object_storage;',
					w * 0.28, h * 0.28, '', 'Object Storage', null, null, this.getTagsForStencil(gn, 'object storage', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'azure_blob;',
					w * 0.34, h * 0.34, '', 'Azure Blob', null, null, this.getTagsForStencil(gn, 'azure blob', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'aws_s3;',
					w * 0.34, h * 0.34, '', 'AWS S3', null, null, this.getTagsForStencil(gn, 'aws s3', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'ibm_object_storage;',
					w * 0.34, h * 0.34, '', 'IBM Object Storage', null, null, this.getTagsForStencil(gn, 'ibm object storage', dt).join(' ')),
			this.createVertexTemplateEntry(s + 's3_compatible;',
					w * 0.28, h * 0.28, '', 'S3-compatible', null, null, this.getTagsForStencil(gn, 's3 compatible', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'vmware_vsan;',
					w * 0.34, h * 0.34, '', 'VMware vSAN', null, null, this.getTagsForStencil(gn, 'vmware vsan', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'nas;',
					w * 0.28, h * 0.28, '', 'NAS', null, null, this.getTagsForStencil(gn, 'nas', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'shared_folder;',
					w * 0.28, h * 0.24, '', 'Shared Folder', null, null, this.getTagsForStencil(gn, 'shared folder', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'folder;',
					w * 0.28, h * 0.24, '', 'Folder', null, null, this.getTagsForStencil(gn, 'folder', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'datastore_empty;',
					w * 0.28, h * 0.35, '', 'Datastore empty', null, null, this.getTagsForStencil(gn, 'datastore empty', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'datastore_33_full;',
					w * 0.28, h * 0.35, '', 'Datastore 33% full', null, null, this.getTagsForStencil(gn, 'datastore 33 percentage third full 33%', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'datastore_66_full;',
					w * 0.28, h * 0.35, '', 'Datastore 66% full', null, null, this.getTagsForStencil(gn, 'datastore 66 percentage two thirds full 66%', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'datastore;',
					w * 0.28, h * 0.35, '', 'Datastore', null, null, this.getTagsForStencil(gn, 'datastore', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'sd_card;',
					w * 0.23, h * 0.28, '', 'SD Card', null, null, this.getTagsForStencil(gn, 'sd card', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'storage;',
					w * 0.4, h * 0.11, '', 'Storage', null, null, this.getTagsForStencil(gn, 'storage', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'storage_snapshot;',
					w * 0.4, h * 0.11, '', 'Storage Snapshot', null, null, this.getTagsForStencil(gn, 'storage snapshot', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'storage_with_snapshot;',
					w * 0.43, h * 0.15, '', 'Storage with Snapshot', null, null, this.getTagsForStencil(gn, 'storage with snapshot', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'storage_stack;',
					w * 0.4, h * 0.4, '', 'Storage Stack', null, null, this.getTagsForStencil(gn, 'storage stack', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'deduplicating_storage;',
					w * 0.4, h * 0.11, '', 'Deduplicating Storage', null, null, this.getTagsForStencil(gn, 'deduplicating storage', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'data_volume;',
					w * 0.4, h * 0.11, '', 'Data Volume', null, null, this.getTagsForStencil(gn, 'data volume', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'data_volume_snapshot;',
					w * 0.4, h * 0.11, '', 'Data Volume Snapshot', null, null, this.getTagsForStencil(gn, 'data volume snapshot', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'data_volume_with_snapshot;',
					w * 0.43, h * 0.15, '', 'Data Volume with Snapshot', null, null, this.getTagsForStencil(gn, 'data volume with snapshot', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'file;',
					w * 0.28, h * 0.39, '', 'File', null, null, this.getTagsForStencil(gn, 'file', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'backup_file;',
					w * 0.28, h * 0.39, '', 'Backup file', null, null, this.getTagsForStencil(gn, 'backup file', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'veeam_full_backup;',
					w * 0.28, h * 0.39, '', 'Veeam Full Backup', null, null, this.getTagsForStencil(gn, 'full backup', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'veeam_incremental_backup;',
					w * 0.28, h * 0.39, '', 'Veeam Incremental Backup', null, null, this.getTagsForStencil(gn, 'incremental backup', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'veeam_reversed_incremental_backup;',
					w * 0.28, h * 0.39, '', 'Veeam Reversed Incremental Backup', null, null, this.getTagsForStencil(gn, 'reversed incremental backup', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'veeam_backup_chain_metadata;',
					w * 0.28, h * 0.39, '', 'Veeam Backup Chain Metadata', null, null, this.getTagsForStencil(gn, 'backup chain metadata', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'vbr_configuration_backup;',
					w * 0.28, h * 0.39, '', 'VBR Configuration Backup', null, null, this.getTagsForStencil(gn, 'vbr configuration backup', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'vbr_transaction_log_backup;',
					w * 0.28, h * 0.39, '', 'VBR Transaction Log Backup', null, null, this.getTagsForStencil(gn, 'vbr transaction log backup', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'tape;',
					w * 0.38, h * 0.22, '', 'Tape', null, null, this.getTagsForStencil(gn, 'tape', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'tape_checkout;',
					w * 0.46, h * 0.30, '', 'Tape Checkout', null, null, this.getTagsForStencil(gn, 'tape checkout', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'tape_encrypted;',
					w * 0.46, h * 0.30, '', 'Tape Encrypted', null, null, this.getTagsForStencil(gn, 'tape encrypted', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'tape_locked;',
					w * 0.46, h * 0.30, '', 'Tape Locked', null, null, this.getTagsForStencil(gn, 'tape locked', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'tape_recording;',
					w * 0.46, h * 0.30, '', 'Tape Recording', null, null, this.getTagsForStencil(gn, 'tape recording', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'tape_media_pool;',
					w * 0.28, h * 0.24, '', 'Tape Media Pool', null, null, this.getTagsForStencil(gn, 'tape media pool', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'tape_library;',
					w * 0.28, h * 0.35, '', 'Tape Library', null, null, this.getTagsForStencil(gn, 'tape library', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'tape_writing_device;',
					w * 0.38, h * 0.14, '', 'Tape Writing Device', null, null, this.getTagsForStencil(gn, 'tape writing device', dt).join(' '))
		];
			
		this.addPalette('veeam2Storage', 'Veeam / Storage', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};

	Sidebar.prototype.addVeeam23DPalette = function()
	{
		var sn = 'sketch=0;shadow=0;dashed=0;html=1;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;shape=mxgraph.veeam.3d.';

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
			
		this.addPalette('veeam23D', 'Veeam / 3D', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};
})();
