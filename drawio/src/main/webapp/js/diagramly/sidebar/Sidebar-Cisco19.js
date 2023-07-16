(function()
{
	// Adds Cisco Safe stencils
	Sidebar.prototype.addCisco19Palette = function()
	{
		var sc = "sketch=0;points=[[0.015,0.015,0],[0.985,0.015,0],[0.985,0.985,0],[0.015,0.985,0],[0.25,0,0],[0.5,0,0],[0.75,0,0],[1,0.25,0],[1,0.5,0],[1,0.75,0],[0.75,1,0],[0.5,1,0],[0.25,1,0],[0,0.75,0],[0,0.5,0],[0,0.25,0]];";
		var s = sc + mxConstants.STYLE_VERTICAL_LABEL_POSITION + '=bottom;html=1;' + mxConstants.STYLE_VERTICAL_ALIGN + '=top;aspect=fixed;align=center;' + 
			'pointerEvents=1;shape=mxgraph.cisco19.';
		var s2 = "sketch=0;points=[[0.5,0,0],[1,0.5,0],[0.5,1,0],[0,0.5,0],[0.145,0.145,0],[0.8555,0.145,0],[0.855,0.8555,0],[0.145,0.855,0]];" + 
			mxConstants.STYLE_VERTICAL_LABEL_POSITION + '=bottom;html=1;' + mxConstants.STYLE_VERTICAL_ALIGN + '=top;aspect=fixed;align=center;' + 
			'pointerEvents=1;shape=mxgraph.cisco19.';
		var s3 = mxConstants.STYLE_VERTICAL_LABEL_POSITION + '=bottom;sketch=0;html=1;' + mxConstants.STYLE_VERTICAL_ALIGN + '=top;aspect=fixed;align=center;' + 
			'pointerEvents=1;shape=mxgraph.cisco19.';
		
		this.setCurrentSearchEntryLibrary('cisco19', 'cisco19LAN Switching');
		this.addCisco19LANSwitchingPalette(s, s2, s3);
		this.setCurrentSearchEntryLibrary('cisco19', 'cisco19Routing WAN');
		this.addCisco19RoutingWANPalette(s, s2, s3);
		this.setCurrentSearchEntryLibrary('cisco19', 'cisco19Network Management');
		this.addCisco19NetworkManagementPalette(s, s2, s3);
		this.setCurrentSearchEntryLibrary('cisco19', 'cisco19Data Center');
		this.addCisco19DataCenterPalette(s, s2, s3);
		this.setCurrentSearchEntryLibrary('cisco19', 'cisco19Wireless LAN');
		this.addCisco19WirelessLANPalette(s, s2, s3);
		this.setCurrentSearchEntryLibrary('cisco19', 'cisco19Collaboration');
		this.addCisco19CollaborationPalette(s, s2, s3);
		this.setCurrentSearchEntryLibrary('cisco19', 'cisco19Security Clouds Connectors');
		this.addCisco19SecurityCloudsAndConnectorsPalette(s, s2, s3);
		this.setCurrentSearchEntryLibrary('cisco19', 'cisco19Endpoint Client Device Icons');
		this.addCisco19EndpointClientDeviceIconsPalette(s, s2, s3);
		this.setCurrentSearchEntryLibrary('cisco19', 'cisco19DNA SD Access');
		this.addCisco19DNASDAccessPalette(s, s2, s3);
		this.setCurrentSearchEntryLibrary('cisco19', 'cisco19SD WAN Viptela');
		this.addCisco19SDWANViptelaPalette(s, s2, s3);
		this.setCurrentSearchEntryLibrary('cisco19', 'cisco19ETA Stealthwatch');
		this.addCisco19StealthwatchPalette(s, s2, s3);
		this.setCurrentSearchEntryLibrary('cisco19', 'cisco19SAFE');
		this.addCisco19SafePalette(s, s2, s3);
		this.setCurrentSearchEntryLibrary();
	};
	
	Sidebar.prototype.addCisco19LANSwitchingPalette = function(s, s2, s3)
	{
		var w = 50;
		var h = 50;
		var gn = 'mxgraph.cisco19';
		var dt = 'cisco lan switching local area network';

		this.addPaletteFunctions('cisco19LAN Switching', 'Cisco 19 / LAN Switching', false,
		[
			this.createVertexTemplateEntry(s + 'rect;prIcon=l2_switch;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h, '', 'L2 Switch', null, null, this.getTagsForStencil(gn, 'l2 switch', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=l3_switch;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h, '', 'L3 Switch', null, null, this.getTagsForStencil(gn, 'l3 switch', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=l2_modular;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h * 1.46, '', 'L2 Modular', null, null, this.getTagsForStencil(gn, 'l2 modular', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=l3_modular;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h * 1.46, '', 'L3 Modular', null, null, this.getTagsForStencil(gn, 'l3 modular', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=6500_vss;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h * 1.46, '', '6500 VSS', null, null, this.getTagsForStencil(gn, '6500 vss', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=l2_switch_with_dual_supervisor;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h * 1.9, '', 'L2 Switch with Dual Supervisor', null, null, this.getTagsForStencil(gn, 'l2 switch with dual supervisor', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=l3_switch_with_dual_supervisor;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h * 1.9, '', 'L3 Switch with Dual Supervisor', null, null, this.getTagsForStencil(gn, 'l3 switch with dual supervisor', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=l2_modular2;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h * 2.05, '', 'L2 Modular', null, null, this.getTagsForStencil(gn, 'l2 modular', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=l3_modular2;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h * 1.3, '', 'L3 Modular', null, null, this.getTagsForStencil(gn, 'l3 modular', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=6500_vss2;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h * 1.3, '', 'L3 Modular', null, null, this.getTagsForStencil(gn, 'l3 modular', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=secure_catalyst_switch_color;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h, '', 'Secure Catalyst Switch (color)', null, null, this.getTagsForStencil(gn, 'secure catalyst switch color', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=secure_catalyst_switch_subdued;fillColor=#FAFAFA;strokeColor=#6696AB;', 
					w, h, '', 'Secure Catalyst Switch (subdued)', null, null, this.getTagsForStencil(gn, 'secure catalyst switch subdued', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=secure_switch;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h, '', 'Secure Switch (color)', null, null, this.getTagsForStencil(gn, 'secure switch color', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=secure_switch;fillColor=#FAFAFA;strokeColor=#6696AB;', 
					w, h, '', 'Secure Switch (subdued)', null, null, this.getTagsForStencil(gn, 'secure switch subdued', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=workgroup_switch;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h, '', 'Workgroup Switch (color)', null, null, this.getTagsForStencil(gn, 'workgroup switch color', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=workgroup_switch;fillColor=#FAFAFA;strokeColor=#6696AB;', 
					w, h, '', 'Workgroup Switch (subdued)', null, null, this.getTagsForStencil(gn, 'workgroup switch subdued', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=secure_catalyst_switch_color3;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h, '', 'Secure Catalyst Switch (color)', null, null, this.getTagsForStencil(gn, 'secure catalyst switch color', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=secure_catalyst_switch_color2;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h, '', 'Secure Catalyst Switch (color)', null, null, this.getTagsForStencil(gn, 'secure catalyst switch color', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=secure_catalyst_switch_subdued2;fillColor=#FAFAFA;strokeColor=#6696AB;', 
					w, h, '', 'Secure Catalyst Switch (subdued)', null, null, this.getTagsForStencil(gn, 'secure catalyst switch subdued', dt).join(' '))
		]);
	};
	
	Sidebar.prototype.addCisco19RoutingWANPalette = function(s, s2, s3)
	{
		var w = 50;
		var h = 50;
		var gn = 'mxgraph.cisco19';
		var dt = 'cisco routing wan wide area network';

		this.addPaletteFunctions('cisco19Routing WAN', 'Cisco 19 / Routing WAN', false,
		[
			this.createVertexTemplateEntry(s2 + 'rect;prIcon=router;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h, '', 'Router', null, null, this.getTagsForStencil(gn, 'router', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'rect;prIcon=csr_1000v;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h, '', 'CSR1000v', null, null, this.getTagsForStencil(gn, 'csr1000v', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'rect;prIcon=wireless_router;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h * 1.2, '', 'Wireless Router', null, null, this.getTagsForStencil(gn, 'wireless router', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'rect;prIcon=l3_modular3;fillColor=#FAFAFA;strokeColor=#C1272D;', 
					w, h, '', 'L3 Modular', null, null, this.getTagsForStencil(gn, 'l3 modular', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'rect;prIcon=ucs_express;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h, '', 'UCS Express', null, null, this.getTagsForStencil(gn, 'ucs express', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'rect;prIcon=router_with_voice;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h, '', 'Router with Voice', null, null, this.getTagsForStencil(gn, 'router with voice', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'rect;prIcon=router_with_firewall;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h, '', 'Router with Firewall', null, null, this.getTagsForStencil(gn, 'router with firewall', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'rect;prIcon=netflow_router;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h, '', 'NetFlow Router', null, null, this.getTagsForStencil(gn, 'netflow router', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'rect;prIcon=secure_router;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h, '', 'Secure Router (color)', null, null, this.getTagsForStencil(gn, 'secure router color', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'rect;prIcon=secure_router;fillColor=#FAFAFA;strokeColor=#6696AB;', 
					w, h, '', 'Secure Router (subdued)', null, null, this.getTagsForStencil(gn, 'secure router subdued', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'rect;prIcon=ip_telephone_router;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h, '', 'IP Telephone Router', null, null, this.getTagsForStencil(gn, 'ip telephone router internet protocol', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=content_router;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.28, h, '', 'Content Router', null, null, this.getTagsForStencil(gn, 'content router', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=service_ready_engine;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h, '', 'Cisco Service Ready Engine', null, null, this.getTagsForStencil(gn, 'service ready engine', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=cisco_15800;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h, '', 'Cisco 15800', null, null, this.getTagsForStencil(gn, '15800', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=appnav;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h, '', 'AppNav', null, null, this.getTagsForStencil(gn, 'appnav', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=router_with_firewall2;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.28, h, '', 'Router with Firewall', null, null, this.getTagsForStencil(gn, 'router with firewall', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=netflow_router2;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.28, h, '', 'NetFlow Router', null, null, this.getTagsForStencil(gn, 'netflow router', dt).join(' ')),
			this.createVertexTemplateEntry('points=[[0.5,0,0],[1,0.5,0],[0.5,1,0],[0,0.5,0],[0.25,0,0],[0.75,0,0],[0.25,1,0],[0.75,1,0],[0.125,0.25,0],[0.875,0.25,0],[0.875,0.75,0],[0.125,0.75,0]];' + s3 + 'rect;prIcon=asr_1000;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.14, h, '', 'ASR 1000', null, null, this.getTagsForStencil(gn, 'asr 1000', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'rect;prIcon=asr_9000;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h, '', 'ASR 9000', null, null, this.getTagsForStencil(gn, 'asr 9000', dt).join(' '))
		]);
	};
	
	Sidebar.prototype.addCisco19NetworkManagementPalette = function(s, s2, s3)
	{
		var w = 50;
		var h = 50;
		var gn = 'mxgraph.cisco19';
		var dt = 'cisco network management';

		this.addPaletteFunctions('cisco19Network Management', 'Cisco 19 / Network Management', false,
		[
			this.createVertexTemplateEntry(s + 'rect;prIcon=net_mgmt_appliance;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h, '', 'Net Mgmt. Appliance', null, null, this.getTagsForStencil(gn, 'net management appliance mgmt', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=nam_virtual_service_blade;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.28, h, '', 'NAM Virtual Service Blade', null, null, this.getTagsForStencil(gn, 'nam virtual service blade', dt).join(' '))
		]);
	};
	
	Sidebar.prototype.addCisco19DataCenterPalette = function(s, s2, s3)
	{
		var w = 50;
		var h = 50;
		var gn = 'mxgraph.cisco19';
		var dt = 'cisco data center';

		this.addPaletteFunctions('cisco19Data Center', 'Cisco 19 / Data Center', false,
		[
			this.createVertexTemplateEntry(s + 'rect;prIcon=nexus_9300;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h, '', 'Nexus 9300', null, null, this.getTagsForStencil(gn, 'nexus 9300', dt).join(' ')),
			this.createVertexTemplateEntry('points=[[0.015,0.015,0],[0.25,0,0],[0.5,0,0],[0.75,0,0],[0.985,0.015,0],[1,0.22,0],[1,0.44,0],[1,0.67,0],[0.985,0.89,0],[0,0.22,0],[0,0.44,0],[0,0.67,0],[0.015,0.89,0],[0.25,0.91,0],[0.5,0.91,0],[0.785,0.955,0]];' + s3 + 'x509_certificate;fillColor=#005073;strokeColor=none;', 
					w, h * 0.95, '', 'x.509 Certificate', null, null, this.getTagsForStencil(gn, 'x509 certificate', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=hypervisor;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h * 1.3, '', 'Hypervisor', null, null, this.getTagsForStencil(gn, 'hypervisor', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=nexus_9500;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h * 1.46, '', 'Nexus 9500', null, null, this.getTagsForStencil(gn, 'nexus 9500', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=fabric_interconnect;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h, '', 'Fabric Interconnect', null, null, this.getTagsForStencil(gn, 'fabric interconnect', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=fibre_channel_director_mds_9000;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h * 1.46, '', 'Fibre Channel Director MDS 9000', null, null, this.getTagsForStencil(gn, 'fibre channel director mds 9000', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=virtual_matrix_switch;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h, '', 'Virtual Matrix Switch', null, null, this.getTagsForStencil(gn, 'virtual matrix switch', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=ucs_c_series_server;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.2, h * 0.5, '', 'UCS C-Series Server', null, null, this.getTagsForStencil(gn, 'ucs c series server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=nexus_5k_with_integrated_vsm;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h, '', 'Nexus 5K with Integrated VSM', null, null, this.getTagsForStencil(gn, 'nexus 5k with integrated vsm', dt).join(' ')),
			this.createVertexTemplateEntry('points=[[0.5,0,0],[1,0.5,0],[0.5,1,0],[0,0.5,0],[0.305,0.305,0],[0.695,0.305,0],[0.7,0.7,0],[0.3,0.7,0]];' + s3 + 'rect;prIcon=aci;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h, '', 'ACI', null, null, this.getTagsForStencil(gn, 'aci', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'vts;fillColor=#005073;strokeColor=none;', 
					w, h, '', 'VTS', null, null, this.getTagsForStencil(gn, 'vts', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=ucs_5108_blade_chassis;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.28, h, '', 'UCS 5108 Blade Chassis', null, null, this.getTagsForStencil(gn, 'ucs 5108 blade chassis', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=storage;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.28, h, '', 'Storage', null, null, this.getTagsForStencil(gn, 'storage', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=ups;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h, '', 'UPS', null, null, this.getTagsForStencil(gn, 'ups', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=rps;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h, '', 'RPS', null, null, this.getTagsForStencil(gn, 'rps', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=nexus_2000_10ge;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h, '', 'Nexus 2000 10GE', null, null, this.getTagsForStencil(gn, 'nexus 2000 10ge', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=blade_server;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h, '', 'Blade Server (color)', null, null, this.getTagsForStencil(gn, 'blade server color', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=blade_server;fillColor=#FAFAFA;strokeColor=#6696AB;', 
					w, h, '', 'Blade Server (subdued)', null, null, this.getTagsForStencil(gn, 'blade server subdued', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=nexus_5k;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h, '', 'Nexus 5k', null, null, this.getTagsForStencil(gn, 'nexus 5k', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=nexus_4k;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h, '', 'Nexus 4k', null, null, this.getTagsForStencil(gn, 'nexus 4k', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=nexus_3k;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h, '', 'Nexus 3k', null, null, this.getTagsForStencil(gn, 'nexus 3k', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=nexus_2k;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h, '', 'Nexus 2k', null, null, this.getTagsForStencil(gn, 'nexus 2k', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=nexus_1kv_vsm;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.28, h, '', 'Nexus 1KV VSM', null, null, this.getTagsForStencil(gn, 'nexus 1kv vsm', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=nexus_1k;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.28, h, '', 'Nexus 1k', null, null, this.getTagsForStencil(gn, 'nexus 1k', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=layer3_nexus_5k_switch;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h, '', 'Layer 3 Nexus 5k Switch', null, null, this.getTagsForStencil(gn, 'layer3 nexus 5k switch', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=nexus_1010;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.28, h, '', 'Nexus 1010', null, null, this.getTagsForStencil(gn, 'nexus 1010', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=nexus_7k;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h * 1.46, '', 'Nexus 7k', null, null, this.getTagsForStencil(gn, 'nexus 7k', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=fibre_channel_fabric_switch;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h * 1.46, '', 'Fibre Channel Fabric Switch', null, null, this.getTagsForStencil(gn, 'fibre channel fabric switch', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=database_relational;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h, '', 'Database Relational', null, null, this.getTagsForStencil(gn, 'database relational', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'server;fillColor=#005073;strokeColor=none;', 
					w * 0.55, h, '', 'Server', null, null, this.getTagsForStencil(gn, 'server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'dns_server;fillColor=#005073;strokeColor=none;', 
					w * 0.55, h, '', 'DNS Server', null, null, this.getTagsForStencil(gn, 'dns domain name server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'secure_server;fillColor=#005073;strokeColor=none;', 
					w * 0.55, h, '', 'Secure Server', null, null, this.getTagsForStencil(gn, 'secure server', dt).join(' '))
		]);
	};
	
	Sidebar.prototype.addCisco19WirelessLANPalette = function(s, s2, s3)
	{
		var w = 50;
		var h = 50;
		var gn = 'mxgraph.cisco19';
		var dt = 'cisco wireless lan local area network';

		this.addPaletteFunctions('cisco19Wireless LAN', 'Cisco 19 / Wireless LAN', false,
		[
			this.createVertexTemplateEntry('points=[[0,0.58,0],[0.09,0.58,0],[0.36,0.39,0],[0.64,0.195,0],[0.91,0,0],[1,0,0],[1,0.25,0],[1,0.5,0],[1,0.75,0],[1,1,0],[0,1,0],[0.09,1,0],[0.36,1,0],[0.64,1,0],[0.91,1,0],[0,0.79,0]];' + s3 + 'wifi_indicator;fillColor=#005073;strokeColor=none;', 
					w, h, '', 'WiFi Indicator', null, null, this.getTagsForStencil(gn, 'wifi indicator', dt).join(' ')),
			this.createVertexTemplateEntry('points=[[0.005,0.09,0],[0.08,0,0],[0.76,0.25,0],[1,0.92,0],[0.91,0.995,0],[0.57,0.995,0],[0.045,0.955,0],[0.005,0.43,0]];' + s3 + '3g_4g_indicator;fillColor=#005073;strokeColor=none;', 
					w, h, '', '3G/4G Indicator', null, null, this.getTagsForStencil(gn, '3g 4g indicator', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=dual_mode_access_point;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.28, h, '', 'Dual Mode Access Point', null, null, this.getTagsForStencil(gn, 'dual mode access point', dt).join(' ')),
			this.createVertexTemplateEntry('points=[[0.03,0.36,0],[0.18,0,0],[0.5,0.34,0],[0.82,0,0],[0.97,0.36,0],[1,0.67,0],[0.975,0.975,0],[0.5,1,0],[0.025,0.975,0],[0,0.67,0]];' + s3 + 'wireless_access_point;fillColor=#005073;strokeColor=none;', 
					w, h, '', 'Wireless Acess Point', null, null, this.getTagsForStencil(gn, 'access point', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=wireless_location_appliance;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h, '', 'Wireless Location Appliance', null, null, this.getTagsForStencil(gn, 'location appliance', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=wireless_lan_controller;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.28, h, '', 'Wireless LAN Controller', null, null, this.getTagsForStencil(gn, 'controller', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'wireless_bridge;fillColor=#005073;strokeColor=none;', 
					w * 1.28, h, '', 'Wireless Bridge', null, null, this.getTagsForStencil(gn, 'bridge', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=mesh_access_point;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.28, h, '', 'Mesh Access Point', null, null, this.getTagsForStencil(gn, 'mesh access point', dt).join(' '))
		]);
	};
	
	Sidebar.prototype.addCisco19CollaborationPalette = function(s, s2, s3)
	{
		var w = 50;
		var h = 50;
		var gn = 'mxgraph.cisco19';
		var dt = 'cisco collaboration';

		this.addPaletteFunctions('cisco19Collaboration', 'Cisco 19 / Collaboration', false,
		[
			this.createVertexTemplateEntry(s + 'rect;prIcon=video_call_server;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h, '', 'Video Call Server', null, null, this.getTagsForStencil(gn, 'video call server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=primary_codec;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.28, h, '', 'Primary Codec', null, null, this.getTagsForStencil(gn, 'primary codec', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=secondary_codec;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.28, h, '', 'Secondary Codec', null, null, this.getTagsForStencil(gn, 'secondary codec', dt).join(' ')),
			this.createVertexTemplateEntry('points=[[0.13,0.225,0],[0.5,0,0],[0.87,0.225,0],[0.885,0.5,0],[0.985,0.99,0],[0.5,1,0],[0.015,0.99,0],[0.115,0.5,0]];' + s3 + 'laptop_video_client;fillColor=#005073;strokeColor=none;', 
					w, h * 0.85, '', 'Laptop Video Client', null, null, this.getTagsForStencil(gn, 'laptop video client', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=immersive_telepresence_endpoint;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 2.3, h, '', 'Immersive Telepresence Endpoint', null, null, this.getTagsForStencil(gn, 'immersive telepresence endpoint', dt).join(' ')),
			this.createVertexTemplateEntry('points=[[0,0,0],[0.25,0,0],[0.5,0,0],[0.75,0,0],[1,0,0],[1,0.4,0],[1,0.8,0],[0.815,1,0],[0.5,1,0],[0.185,1,0],[0,0.8,0],[0,0.4,0]];' + s3 + 'hdtv;fillColor=#005073;strokeColor=none;', 
					w * 1.2, h, '', 'HDTV', null, null, this.getTagsForStencil(gn, 'hdtv', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=virtual_desktop_service;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.28, h, '', 'Virtual Desktop Service', null, null, this.getTagsForStencil(gn, 'virtual desktop service', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=video_gateway;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.28, h, '', 'Video Gateway', null, null, this.getTagsForStencil(gn, 'video gateway', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=telepresence_endpoint;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h, '', 'Telepresence Endpoint', null, null, this.getTagsForStencil(gn, 'telepresence endpoint', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=collab1;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h * 1.3, '', 'Collaboration', null, null, this.getTagsForStencil(gn, '', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=video_analytics;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.28, h, '', 'Video Analytics', null, null, this.getTagsForStencil(gn, 'video analytics', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=telepresence_exchange;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.28, h, '', 'Telepresence Exchange', null, null, this.getTagsForStencil(gn, 'telepresence exchange', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=meeting_scheduling_and_management_server;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.28, h, '', 'Meeting Scheduling and Management Server', null, null, this.getTagsForStencil(gn, 'meeting scheduling and management server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=multipoint_meeting_server;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h, '', 'Multipoint Meeting Server', null, null, this.getTagsForStencil(gn, 'multipoint meeting server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=content_recording_streaming_server;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.28, h, '', 'Content Recording / Streaming Server', null, null, this.getTagsForStencil(gn, 'content recording streaming server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=communications_manager;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.28, h, '', 'Communications Manager', null, null, this.getTagsForStencil(gn, 'communications manager', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=cisco_unified_presence_service;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.28, h, '', 'Cisco Unified Presence Service', null, null, this.getTagsForStencil(gn, 'cisco unified presence service', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=cisco_unified_contact_center_enterprise_and_hosted;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.28, h, '', 'Cisco Unified Contact Center Enterprise and Hosted', null, null, this.getTagsForStencil(gn, 'cisco unified contact center enterprise and hosted', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=h323;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.28, h, '', 'H.323', null, null, this.getTagsForStencil(gn, 'h323', dt).join(' ')),
			this.createVertexTemplateEntry('points=[[0.015,0.015,0],[0.5,0,0],[0.985,0.015,0],[1,0.22,0],[0.985,0.43,0],[0.73,0.85,0],[0.5,1,0],[0.285,0.85,0],[0.015,0.43,0],[0,0.22,0]];' + s3 + 'surveillance_camera;fillColor=#005073;strokeColor=none;', 
					w * 1.28, h, '', 'Surveillance Camera', null, null, this.getTagsForStencil(gn, 'surveillance camera', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=monitor;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.28, h, '', 'Monitor', null, null, this.getTagsForStencil(gn, 'monitor', dt).join(' ')),
			this.createVertexTemplateEntry('points=[[0.13,0.225,0],[0.5,0,0],[0.87,0.225,0],[0.885,0.5,0],[0.985,0.99,0],[0.5,1,0],[0.015,0.99,0],[0.115,0.5,0]];' + s3 + 'upc_unified_personal_communicator;fillColor=#005073;strokeColor=none;', 
					w, h * 0.85, '', 'UPC Unified Personal Communicator', null, null, this.getTagsForStencil(gn, 'upc unified personal communicator', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=telepresence_endpoint_twin_data_display;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.28, h, '', 'Telepresence Endpoint (twin data display)', null, null, this.getTagsForStencil(gn, 'telepresence endpoint twin data display', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=operations_manager;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.28, h, '', 'Operations Manager', null, null, this.getTagsForStencil(gn, 'operations manager', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=transcoder;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.28, h, '', 'Transcoder', null, null, this.getTagsForStencil(gn, 'transcoder', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=contact_center_express;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.28, h, '', 'Contact Center Express', null, null, this.getTagsForStencil(gn, 'contact center express', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=media_server;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.28, h, '', 'Media Server', null, null, this.getTagsForStencil(gn, 'media server', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=ip_ip_gateway;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.28, h, '', 'IP IP Gateway', null, null, this.getTagsForStencil(gn, 'ip gateway', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'webex', 
					w, h, '', 'WebEx', null, null, this.getTagsForStencil(gn, 'webex', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'rect;prIcon=clock;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h, '', 'Clock', null, null, this.getTagsForStencil(gn, 'clock', dt).join(' ')),
			this.createVertexTemplateEntry('points=[[0.5,0,0],[0.75,0.37,0],[0.96,0.735,0],[0.5,1,0],[0.045,0.73,0],[0.25,0.37,0]];' + s3 + 'phone_polycom;fillColor=#005073;strokeColor=none;', 
					w * 0.95, h, '', 'Phone Polycom', null, null, this.getTagsForStencil(gn, 'phone polycom', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=unity;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h, '', 'Unity', null, null, this.getTagsForStencil(gn, 'unity', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=shield;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.28, h, '', 'Shield', null, null, this.getTagsForStencil(gn, 'shield', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=cisco_meetingplace_express;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.28, h, '', 'Cisco MeetingPlace Express', null, null, this.getTagsForStencil(gn, 'meetingplace express', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=set_top;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.28, h, '', 'Set Top', null, null, this.getTagsForStencil(gn, 'set top', dt).join(' ')),
			this.createVertexTemplateEntry('points=[[0.59,0,0],[0.87,0.015,0],[0.88,0.3,0],[0.99,0.99,0],[0.5,1,0],[0.01,0.99,0],[0.075,0.5,0],[0.17,0.115,0]];' + s3 + 'ip_phone;fillColor=#005073;strokeColor=none;', 
					w * 1.15, h, '', 'IP Phone', null, null, this.getTagsForStencil(gn, 'ip phone internet protocol', dt).join(' ')),
			this.createVertexTemplateEntry('points=[[0,0.5,0],[0.19,0.02,0],[0.59,0,0],[0.985,0.02,0],[1,0.5,0],[0.985,0.98,0],[0.59,1,0],[0.19,0.98,0]];' + s3 + 'camera;fillColor=#005073;strokeColor=none;', 
					w * 1.8, h, '', 'Camera', null, null, this.getTagsForStencil(gn, 'camera', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=da_encoder;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.28, h, '', 'DA Encoder', null, null, this.getTagsForStencil(gn, 'da encoder analog digital', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=ad_encoder;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.28, h, '', 'AD Encoder', null, null, this.getTagsForStencil(gn, 'ad encoder analog digital', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=da_decoder;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.28, h, '', 'DA Decoder', null, null, this.getTagsForStencil(gn, 'da decoder analog digital', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=ad_decoder;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.28, h, '', 'AD Decoder', null, null, this.getTagsForStencil(gn, 'ad decoder analog digital', dt).join(' ')),
			this.createVertexTemplateEntry('points=[[0.13,0.24,0],[0.5,0.2,0],[0.62,0,0],[0.87,0.24,0],[0.95,0.55,0],[0.96,0.95,0],[0.5,1,0],[0.04,0.95,0],[0.05,0.55,0]];' + s3 + 'joystick_keyboard;fillColor=#005073;strokeColor=none;', 
					w * 1.8, h, '', 'Joystick Keyboard', null, null, this.getTagsForStencil(gn, 'joystick keyboard', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=collab2;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.28, h, '', 'Collaboration', null, null, this.getTagsForStencil(gn, 'collaboration', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=collab3;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.28, h, '', 'Collaboration', null, null, this.getTagsForStencil(gn, 'collaboration', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=collab4;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.28, h, '', 'Collaboration', null, null, this.getTagsForStencil(gn, 'collaboration', dt).join(' '))
		]);
	};
	
	Sidebar.prototype.addCisco19SecurityCloudsAndConnectorsPalette = function(s, s2, s3)
	{
		var w = 50;
		var h = 50;
		var gn = 'mxgraph.cisco19';
		var dt = 'cisco security clouds connectors';
		var sCloud = 'points=[[0,0.64,0],[0.2,0.15,0],[0.4,0.01,0],[0.79,0.25,0],[1,0.65,0],[0.8,0.86,0],[0.41,1,0],[0.16,0.86,0]];';
		
		this.addPaletteFunctions('cisco19Security Clouds Connectors', 'Cisco 19 / Security, Clouds and Connectors', false,
		[
			this.createVertexTemplateEntry(s + 'rect;prIcon=acs;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.28, h, '', 'ACS', null, null, this.getTagsForStencil(gn, 'acs', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=ise;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h, '', 'ISE', null, null, this.getTagsForStencil(gn, 'ise', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=email_security;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.28, h, '', 'Email Security', null, null, this.getTagsForStencil(gn, 'email security', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=vpn_concentrator;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.28, h, '', 'VPN Concentrator', null, null, this.getTagsForStencil(gn, 'vpn concentrator virtual private network', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=ssl_terminator;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.28, h, '', 'SSL Terminator', null, null, this.getTagsForStencil(gn, 'ssl terminator', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=cisco_security_manager;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.28, h, '', 'Cisco Security Manager', null, null, this.getTagsForStencil(gn, 'cisco security manager', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=web_security;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.28, h, '', 'Web Security', null, null, this.getTagsForStencil(gn, 'web security', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=nac_appliance;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.28, h, '', 'NAC Appliance', null, null, this.getTagsForStencil(gn, 'nac appliance', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=ironport;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.28, h, '', 'Ironport', null, null, this.getTagsForStencil(gn, 'ironport', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=ips_ids;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.28, h, '', 'IPS/IDS', null, null, this.getTagsForStencil(gn, 'ips ids', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=firewall;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.28, h, '', 'Firewall', null, null, this.getTagsForStencil(gn, 'firewall', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=asa_5500;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.28, h, '', 'ASA 5500', null, null, this.getTagsForStencil(gn, 'asa 5500', dt).join(' ')),
			this.createVertexTemplateEntry('points=[[0.5,0,0],[0.765,0.48,0],[0.99,0.98,0],[0.5,1,0],[0.01,0.98,0],[0.235,0.48,0]];' + s3 + 'ldap;fillColor=#005073;strokeColor=none;', 
					w, h * 0.85, '', 'LDAP', null, null, this.getTagsForStencil(gn, 'ldap', dt).join(' ')),
			this.createVertexTemplateEntry('points=[[0,0.5,0],[0.24,0,0],[0.5,0.28,0],[0.995,0.475,0],[0.5,0.72,0],[0.24,1,0]];' + s3 + 'key;fillColor=#005073;strokeColor=none;', 
					w, h * 0.45, '', 'Key', null, null, this.getTagsForStencil(gn, 'key', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'lock;fillColor=#005073;strokeColor=none;', 
					w, h, '', 'Lock', null, null, this.getTagsForStencil(gn, 'lock', dt).join(' ')),
			this.createVertexTemplateEntry(sCloud + s3 + 'cloud;fillColor=#6B6B6B;strokeColor=none;', 
					w, h * 0.6, '', 'Cloud', null, null, this.getTagsForStencil(gn, 'cloud', dt).join(' ')),
			this.createVertexTemplateEntry(sCloud + s3 + 'cloud;fillColor=#A6A6A6;strokeColor=none;', 
					w, h * 0.6, '', 'Cloud', null, null, this.getTagsForStencil(gn, 'cloud', dt).join(' ')),
			this.createVertexTemplateEntry(sCloud + s3 + 'cloud;fillColor=#FABD66;strokeColor=none;', 
					w, h * 0.6, '', 'Cloud', null, null, this.getTagsForStencil(gn, 'cloud', dt).join(' ')),
			this.createVertexTemplateEntry(sCloud + s3 + 'cloud;fillColor=#186180;strokeColor=none;', 
					w, h * 0.6, '', 'Cloud', null, null, this.getTagsForStencil(gn, 'cloud', dt).join(' ')),
			this.createVertexTemplateEntry(sCloud + s3 + 'cloud2;fillColor=#FFE9AA;strokeColor=none;', 
					w, h * 0.6, '', 'Cloud', null, null, this.getTagsForStencil(gn, 'cloud', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=security_management;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h, '', 'Security Management (color)', null, null, this.getTagsForStencil(gn, 'security management color', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=security_management;fillColor=#FAFAFA;strokeColor=#6696AB;', 
					w, h, '', 'Security Management (subdued)', null, null, this.getTagsForStencil(gn, 'security management subdued', dt).join(' ')),
			this.createVertexTemplateEntry('points=[[0.13,0.02,0],[0.5,0,0],[0.87,0.02,0],[0.885,0.4,0],[0.985,0.985,0],[0.5,1,0],[0.015,0.985,0],[0.115,0.4,0]];' + s3 + 'secure_endpoints;fillColor=#005073;strokeColor=none;', 
					w, h * 0.7, '', 'Secure Endpoint (laptop)', null, null, this.getTagsForStencil(gn, 'secure endpoints laptop', dt).join(' '))
		]);
	};
	
	Sidebar.prototype.addCisco19EndpointClientDeviceIconsPalette = function(s, s2, s3)
	{
		var w = 50;
		var h = 50;
		var gn = 'mxgraph.cisco19';
		var dt = 'cisco endpoint client device icons';

		this.addPaletteFunctions('cisco19Endpoint Client Device Icons', 'Cisco 19 / Endpoint Client and Device Icons', false,
		[
			this.createVertexTemplateEntry('points=[[0.03,0.03,0],[0.5,0,0],[0.97,0.03,0],[1,0.4,0],[0.97,0.745,0],[0.5,1,0],[0.03,0.745,0],[0,0.4,0]];' + s3 + 'workstation;fillColor=#005073;strokeColor=none;', 
					w, h * 0.8, '', 'Workstation', null, null, this.getTagsForStencil(gn, 'workstation', dt).join(' ')),
			this.createVertexTemplateEntry('points=[[0.13,0.02,0],[0.5,0,0],[0.87,0.02,0],[0.885,0.4,0],[0.985,0.985,0],[0.5,1,0],[0.015,0.985,0],[0.115,0.4,0]];' + s3 + 'laptop;fillColor=#005073;strokeColor=none;', 
					w, h * 0.7, '', 'Laptop', null, null, this.getTagsForStencil(gn, 'laptop', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'handheld;fillColor=#005073;strokeColor=none;', 
					w * 0.75, h, '', 'Handheld', null, null, this.getTagsForStencil(gn, 'handheld', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'cell_phone;fillColor=#005073;strokeColor=none;', 
					w * 0.5, h, '', 'Cell Phone', null, null, this.getTagsForStencil(gn, 'cell phone', dt).join(' ')),
			this.createVertexTemplateEntry('points=[[0.015,0.14,0],[0.5,0,0],[0.985,0.14,0],[1,0.57,0],[0.99,0.98,0],[0.5,1,0],[0.01,0.98,0],[0,0.57,0]];' + s3 + 'tablet;fillColor=#005073;strokeColor=none;', 
					w, h * 0.8, '', 'Tablet', null, null, this.getTagsForStencil(gn, 'tablet', dt).join(' ')),
			this.createVertexTemplateEntry('points=[[0.22,0.185,0],[0.5,0,0],[0.78,0.185,0],[0.975,0.49,0],[1,0.73,0],[0.975,0.97,0],[0.5,1,0],[0.025,0.97,0],[0,0.73,0],[0.025,0.49,0]];' + s3 + 'printer;fillColor=#005073;strokeColor=none;', 
					w, h * 0.9, '', 'Printer', null, null, this.getTagsForStencil(gn, 'printer', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'pos;fillColor=#005073;strokeColor=none;', 
					w * 1.28, h, '', 'POS', null, null, this.getTagsForStencil(gn, 'pos', dt).join(' ')),
			this.createVertexTemplateEntry('points=[[0.115,0.05,0],[0.335,0,0],[0.98,0.52,0],[1,0.71,0],[0.68,1,0],[0.065,0.76,0],[0,0.33,0],[0.68,0.33,0]];' + s3 + 'home_office;fillColor=#005073;strokeColor=none;', 
					w, h, '', 'Home Office', null, null, this.getTagsForStencil(gn, 'home office', dt).join(' ')),
			this.createVertexTemplateEntry('points=[[0.35,0,0],[0.98,0.51,0],[1,0.71,0],[0.67,1,0],[0,0.795,0],[0,0.65,0]];' + s3 + 'user;fillColor=#005073;strokeColor=none;', 
					w, h, '', 'User', null, null, this.getTagsForStencil(gn, 'user', dt).join(' ')),
			this.createVertexTemplateEntry('points=[[0.02,0.015,0],[0.5,0,0],[0.98,0.015,0],[1,0.38,0],[0.895,0.98,0],[0.5,1,0],[0.105,0.98,0],[0,0.38,0]];' + s3 + 'secure_endpoint_pc;fillColor=#005073;strokeColor=none;', 
					w, h * 0.8, '', 'Secure Endpoint (PC)', null, null, this.getTagsForStencil(gn, 'secure endpoints pc', dt).join(' ')),
			this.createVertexTemplateEntry('points=[[0.13,0.02,0],[0.5,0,0],[0.87,0.02,0],[0.885,0.4,0],[0.985,0.985,0],[0.5,1,0],[0.015,0.985,0],[0.115,0.4,0]];' + s3 + 'secure_endpoints;fillColor=#005073;strokeColor=none;', 
					w, h * 0.7, '', 'Secure Endpoint (laptop)', null, null, this.getTagsForStencil(gn, 'secure endpoints laptop', dt).join(' ')),
			this.createVertexTemplateEntry('points=[[0.5,0,0],[1,0.34,0],[1,1],[0.75,1,0],[0.5,1,0],[0.25,1,0],[0,1,0],[0,0.34,0],[1,0.67,0],[0,0.67,0],[0.325,0,0],[0.675,0,0]];' + s3 + 'data_center;fillColor=#005073;strokeColor=none;', 
					w * 2, h * 1.4, '', 'Data Center', null, null, this.getTagsForStencil(gn, 'data center', dt).join(' ')),
			this.createVertexTemplateEntry('points=[[0,0,0],[0.25,0,0],[0.5,0,0],[0.75,0,0],[1,0,0],[1,0.25,0],[1,0.5,0],[1,0.75,0],[1,1,0],[0.75,1,0],[0.5,1,0],[0.25,1,0],[0,1,0],[0,0.75,0],[0,0.5,0],[0,0.25,0]];' + s3 + 'branch;fillColor=#005073;strokeColor=none;', 
					w, h, '', 'Branch', null, null, this.getTagsForStencil(gn, 'branch', dt).join(' '))
		]);
	};
	
	Sidebar.prototype.addCisco19DNASDAccessPalette = function(s, s2, s3)
	{
		var w = 50;
		var h = 50;
		var gn = 'mxgraph.cisco19';
		var dt = 'cisco dna sd access';

		this.addPaletteFunctions('cisco19DNA SD Access', 'Cisco 19 / DNA/SD-Access', false,
		[
			this.createVertexTemplateEntry(s + 'rect;prIcon=cisco_dna_center;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h, '', 'Cisco DNA Center', null, null, this.getTagsForStencil(gn, 'dna center', dt).join(' ')),
			this.createVertexTemplateEntry('points=[[0.5,0.37,0],[1,0.09,0],[1,0.9,0],[0,0.08,0],[0,0.91,0],[0.5,0.61,0],[0.045,0.5,0],[0.96,0.5,0]];' + s3 + 'cisco_dna;fillColor=#005073;strokeColor=none;', 
					w, h * 0.6, '', 'Cisco DNA', null, null, this.getTagsForStencil(gn, 'dna', dt).join(' '))
		]);
	};
	
	Sidebar.prototype.addCisco19SDWANViptelaPalette = function(s, s2, s3)
	{
		var w = 50;
		var h = 50;
		var gn = 'mxgraph.cisco19';
		var dt = 'cisco sd wan viptela wide area network';

		this.addPaletteFunctions('cisco19SD WAN Viptela', 'Cisco 19 / SD-WAN and Viptela', false,
		[
			this.createVertexTemplateEntry(s2 + 'rect;prIcon=vbond;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h, '', 'vBond', null, null, this.getTagsForStencil(gn, 'vbond', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'rect;prIcon=vmanage;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h, '', 'vManage', null, null, this.getTagsForStencil(gn, 'vmanage', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'rect;prIcon=vsmart;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h, '', 'vSmart', null, null, this.getTagsForStencil(gn, 'vsmart', dt).join(' '))
		]);
	};
	
	Sidebar.prototype.addCisco19StealthwatchPalette = function(s, s2, s3)
	{
		var w = 50;
		var h = 50;
		var gn = 'mxgraph.cisco19';
		var dt = 'cisco stealthwatch';

		this.addPaletteFunctions('cisco19ETA Stealthwatch', 'Cisco 19 / ETA/Stealthwatch', false,
		[
			this.createVertexTemplateEntry(s + 'rect;prIcon=flow_collector;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.28, h, '', 'Flow Collector', null, null, this.getTagsForStencil(gn, 'flow collector', dt).join(' ')),
			this.createVertexTemplateEntry('points=[[0.03,0.03,0],[0.5,0,0],[0.97,0.03,0],[1,0.4,0],[0.97,0.745,0],[0.5,1,0],[0.03,0.745,0],[0,0.4,0]];' + s3 + 'stealthwatch_management_console_smc;fillColor=#005073;strokeColor=none;', 
					w, h * 0.8, '', 'Stealthwatch Management Console (SMC)', null, null, this.getTagsForStencil(gn, 'stealthwatch management console smc', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=cognitive;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.28, h, '', 'Cognitive', null, null, this.getTagsForStencil(gn, 'cognitive', dt).join(' '))
		]);
	};
	
	Sidebar.prototype.addCisco19SafePalette = function(s, s2, s3)
	{
		var w = 50;
		var h = 50;
		var gn = 'mxgraph.cisco19';
		var dt = 'cisco stealthwatch';

		this.addPaletteFunctions('cisco19SAFE', 'Cisco 19 / SAFE', false,
		[
			this.createVertexTemplateEntry(s + 'rect;prIcon=next_generation_intrusion_prevention_system;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h, '', 'Next Generation Intrusion Prevention System', null, null, this.getTagsForStencil(gn, 'next generation prevention system', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=access_control_and_trustsec;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h, '', 'Access Control and TrustSec', null, null, this.getTagsForStencil(gn, 'access control and trustsec', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=load_balancer;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.28, h, '', 'Load Balancer', null, null, this.getTagsForStencil(gn, 'load balancer', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=anomaly_detection;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h, '', 'Anomaly Detection', null, null, this.getTagsForStencil(gn, 'anomaly detection', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=web_reputation_filtering;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h, '', 'Web Reputation / Filtering', null, null, this.getTagsForStencil(gn, 'web reputation filtering', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=avc_application_visibility_control;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h, '', 'AVC-Application Visibility Control', null, null, this.getTagsForStencil(gn, 'avc application visibility control', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=anti_malware2;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h, '', 'Anti-Malware', null, null, this.getTagsForStencil(gn, 'anti malware', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=web_application_firewall;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.28, h, '', 'Web Application Firewall', null, null, this.getTagsForStencil(gn, 'web application firewall', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=policy_configuration;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h, '', 'Policy / Configuration', null, null, this.getTagsForStencil(gn, 'policy configuration', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=analysis_correlation;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.28, h, '', 'Analysis / Correlation', null, null, this.getTagsForStencil(gn, 'analysis correlation', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=flow_analytics;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.28, h, '', 'Flow Analytics', null, null, this.getTagsForStencil(gn, 'flow analytics', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=virtual_private_network;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h, '', 'Virtual Private Network', null, null, this.getTagsForStencil(gn, 'virtual private network vpn', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=web_reputation_filtering_2;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h, '', 'Web Reputation / Filtering', null, null, this.getTagsForStencil(gn, 'web reputation filtering', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=avc_application_visibility_control2;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h, '', 'AVC-Application Visibility Control', null, null, this.getTagsForStencil(gn, 'avc application visibility control', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=flow_analytics2;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h, '', 'Flow Analytics', null, null, this.getTagsForStencil(gn, 'flow analytics', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=virtual_private_network2;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.28, h, '', 'Virtual Private Network', null, null, this.getTagsForStencil(gn, 'virtual private network', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=web_security_services;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.28, h, '', 'Web Security Services', null, null, this.getTagsForStencil(gn, 'web security services', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=web_security_services2;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.28, h, '', 'Web Security Services', null, null, this.getTagsForStencil(gn, 'web security services', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=posture_assessment;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h, '', 'Posture Assessment', null, null, this.getTagsForStencil(gn, 'posture assessment', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=anti_malware;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h, '', 'Anti-Malware', null, null, this.getTagsForStencil(gn, 'anti malware', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=wireless_intrusion_prevention;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h, '', 'Wireless Intrusion Prevention', null, null, this.getTagsForStencil(gn, 'wireless intrusion prevention', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=host_based_security;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h, '', 'Host Based Security', null, null, this.getTagsForStencil(gn, 'host based security', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=monitoring;fillColor=#FAFAFA;strokeColor=#005073;', 
					w, h, '', 'Monitoring', null, null, this.getTagsForStencil(gn, 'monitoring', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=virtual_private_network_connector;fillColor=#FAFAFA;strokeColor=#005073;', 
					w * 1.28, h, '', 'Virtual Private Network Connector', null, null, this.getTagsForStencil(gn, 'connector', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rect;prIcon=threat_intelligence;fillColor=#FAFAFA;strokeColor=#005073;',
					w, h, '', 'Monitoring', null, null, this.getTagsForStencil(gn, 'monitoring', dt).join(' '))
		]);
	};
	
})();
