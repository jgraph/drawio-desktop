(function()
{
	Sidebar.prototype.addAlliedTelesisPalette = function()
	{
		var d = 60;
		var dt = 'allied telesis';
		var sb = this;
		var s = 'image;points=[];aspect=fixed;html=1;align=center;shadow=0;dashed=0;image=img/lib/allied_telesis/';

		// Adds Allied Telesis shapes
		this.setCurrentSearchEntryLibrary('allied_telesis', 'allied_telesisBuildings');
		this.addAlliedTelesisBuildingsPalette(d, dt, sb, s);
		this.setCurrentSearchEntryLibrary('allied_telesis', 'allied_telesisComputer and Terminals');
		this.addAlliedTelesisComputerTerminalsPalette(d, dt, sb, s);
		this.setCurrentSearchEntryLibrary('allied_telesis', 'allied_telesisMedia Converters');
		this.addAlliedTelesisMediaConvertersPalette(d, dt, sb, s);
		this.setCurrentSearchEntryLibrary('allied_telesis', 'allied_telesisSecurity');
		this.addAlliedTelesisSecurityPalette(d, dt, sb, s);
		this.setCurrentSearchEntryLibrary('allied_telesis', 'allied_telesisStorage');
		this.addAlliedTelesisStoragePalette(d, dt, sb, s);
		this.setCurrentSearchEntryLibrary('allied_telesis', 'allied_telesisSwitch');
		this.addAlliedTelesisSwitchPalette(d, dt, sb, s);
		this.setCurrentSearchEntryLibrary('allied_telesis', 'allied_telesisWireless');
		this.addAlliedTelesisWirelessPalette(d, dt, sb, s);
		this.setCurrentSearchEntryLibrary();
	};

	Sidebar.prototype.addAlliedTelesisBuildingsPalette = function(d, dt, sb, s)
	{
		s += 'buildings/';
		var gn = 'buildings';
		
		var fns = [
			 this.createVertexTemplateEntry(s + 'Apartments.svg;',
					 d * 0.9, d * 1.75, '', 'Apartments', false, null, this.getTagsForStencil(gn, 'apartments', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'Building_Cluster.svg;',
					 d * 2.02, d * 1.85, '', 'Building Cluster', false, null, this.getTagsForStencil(gn, 'building cluster', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'Large_Building.svg;',
					 d * 1.25, d * 1.25, '', 'Large Building', false, null, this.getTagsForStencil(gn, 'large building', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'Long_Building.svg;',
					 d * 2.09, d * 2.16, '', 'Long Building', false, null, this.getTagsForStencil(gn, 'long building', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'Medium_Business_Building.svg;',
					 d * 0.91, d * 1.17, '', 'Medium Business Building', false, null, this.getTagsForStencil(gn, 'medium business building', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'School_Building.svg;',
					 d * 2.75, d * 2.78, '', 'School Building', false, null, this.getTagsForStencil(gn, 'school building', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'Secure_Building.svg;',
					 d * 2.72, d * 1.86, '', 'Secure Building', false, null, this.getTagsForStencil(gn, 'secure building', dt).join(' '))
		];
			   	
   		this.addPalette('allied_telesisBuildings', 'Allied Telesis / Buildings', false, mxUtils.bind(this, function(content)
	    {
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addAlliedTelesisComputerTerminalsPalette = function(d, dt, sb, s)
	{
		s += 'computer_and_terminals/';
		var gn = 'computer terminals';
		
		var fns = [
			 this.createVertexTemplateEntry(s + 'IP_TV.svg;',
					 d * 0.82, d * 0.84, '', 'IP TV', false, null, this.getTagsForStencil(gn, 'ip tv internet protocol television', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'Keypad.svg;',
					 d * 0.44, d * 0.8, '', 'Keypad', false, null, this.getTagsForStencil(gn, 'keypad', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'Laptop.svg;',
					 d * 0.7, d * 0.71, '', 'Laptop', false, null, this.getTagsForStencil(gn, 'laptop', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'Personal_Computer.svg;',
					 d * 0.76, d * 1.03, '', 'Personal Computer', false, null, this.getTagsForStencil(gn, 'personal computer', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'Personal_Computer_Wireless.svg;',
					 d * 1.05, d * 1.07, '', 'Personal Computer Wireless', false, null, this.getTagsForStencil(gn, 'personal computer wireless', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'Personal_Computer_with_Server.svg;',
					 d * 1.04, d * 1.04, '', 'Personal Computer with Server', false, null, this.getTagsForStencil(gn, 'Personal Computer Server', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'POS_keypad.svg;',
					 d * 0.62, d * 0.46, '', 'POS Keypad', false, null, this.getTagsForStencil(gn, 'pos keypad', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'POS_Printer.svg;',
					 d * 0.62, d * 0.54, '', 'POS Printer', false, null, this.getTagsForStencil(gn, 'pos printer', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'Server_Desktop.svg;',
					 d * 0.71, d * 0.90, '', 'Server Desktop', false, null, this.getTagsForStencil(gn, 'server desktop', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'Smartphone.svg;',
					 d * 0.33, d * 0.72, '', 'Smartphone', false, null, this.getTagsForStencil(gn, 'smartphone', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'Tablet.svg;',
					 d * 0.45, d * 0.95, '', 'Tablet', false, null, this.getTagsForStencil(gn, 'tablet', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'Tablet_Alternative.svg;',
					 d * 0.58, d * 0.8, '', 'Tablet Alternative', false, null, this.getTagsForStencil(gn, 'tablet alternative', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'Vdeo_Conference_Terminal.svg;',
					 d * 0.53, d * 0.75, '', 'Vdeo Conference Terminal', false, null, this.getTagsForStencil(gn, 'vdeo conference terminal', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'VOIP_IP_phone.svg;',
					 d * 0.5, d * 0.76, '', 'VOIP IP Phone', false, null, this.getTagsForStencil(gn, 'voip ip phone voice over internet protocol', dt).join(' '))
		];
			   	
   		this.addPalette('allied_telesisComputer and Terminals', 'Allied Telesis / Computer and Terminals', false, mxUtils.bind(this, function(content)
	    {
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addAlliedTelesisMediaConvertersPalette = function(d, dt, sb, s)
	{
		s += 'media_converters/';
		var gn = 'media converters';
		
		var fns = [
			 this.createVertexTemplateEntry(s + 'Industrial_Media_Converter.svg;',
					 d * 0.5, d * 0.95, '', 'Industrial Media Converter', false, null, this.getTagsForStencil(gn, 'industrial media converter', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'Industrial_Media_Converter_POE.svg;',
					 d * 0.5, d * 0.95, '', 'Industrial Media Converter POE', false, null, this.getTagsForStencil(gn, 'industrial media converter poe', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'Media_Converter_Modular.svg;',
					 d * 1.18, d * 0.91, '', 'Media Converter Modular', false, null, this.getTagsForStencil(gn, 'media converter modular', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'Media_Converter_Standalone.svg;',
					 d * 0.76, d * 0.62, '', 'Media Converter Standalone', false, null, this.getTagsForStencil(gn, 'media converter standalone', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'Media_Converter_Standalone_POE.svg;',
					 d * 0.76, d * 0.62, '', 'Media Converter Standalone POE', false, null, this.getTagsForStencil(gn, 'media converter standalone poe', dt).join(' '))
		];
			   	
   		this.addPalette('allied_telesisMedia Converters', 'Allied Telesis / Media Converters', false, mxUtils.bind(this, function(content)
	    {
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addAlliedTelesisSecurityPalette = function(d, dt, sb, s)
	{
		s += 'security/';
		var gn = 'security';
		
		var fns = [
			 this.createVertexTemplateEntry(s + 'DVS_Surveillance_Monitor.svg;',
					 d * 0.7, d * 1, '', 'DVS Surveillance Monitor', false, null, this.getTagsForStencil(gn, 'dvs surveillance monitor', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'EtherGRID.svg;',
					 d * 1.49, d * 1.08, '', 'EtherGRID', false, null, this.getTagsForStencil(gn, 'ethergrid', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'POE_DVS_Camera.svg;',
					 d * 0.85, d * 0.67, '', 'POE DVS Camera', false, null, this.getTagsForStencil(gn, 'poe dvs camera', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'POS.svg;',
					 d * 1.13, d * 1.2, '', 'POS', false, null, this.getTagsForStencil(gn, 'pos', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'Router_UTM.svg;',
					 d * 0.93, d * 0.66, '', 'Router UTM', false, null, this.getTagsForStencil(gn, 'router utm', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'Router_VPN.svg;',
					 d * 0.93, d * 0.66, '', 'Router VPN', false, null, this.getTagsForStencil(gn, 'router vpn', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'Surveillance_Camera_Ceiling.svg;',
					 d * 0.62, d * 0.59, '', 'Surveillance Camera Ceiling', false, null, this.getTagsForStencil(gn, 'surveillance camera ceiling', dt).join(' '))
		];
			   	
   		this.addPalette('allied_telesisSecurity', 'Allied Telesis / Security', false, mxUtils.bind(this, function(content)
	    {
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addAlliedTelesisStoragePalette = function(d, dt, sb, s)
	{
		s += 'storage/';
		var gn = 'storage';
		
		var fns = [
			 this.createVertexTemplateEntry(s + 'Datacenter_Server_Half_Rack_ToR.svg;',
					 d * 1.47, d * 1.91, '', 'Datacenter Server Half Rack ToR', false, null, this.getTagsForStencil(gn, 'datacenter server half rack tor', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'Datacenter_Server_Rack.svg;',
					 d * 1.47, d * 2.98, '', 'Datacenter Server Rack', false, null, this.getTagsForStencil(gn, 'datacenter server rack', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'Datacenter_Server_Rack_EoR.svg;',
					 d * 1.43, d * 2.89, '', 'Datacenter Server Rack EoR', false, null, this.getTagsForStencil(gn, 'datacenter server rack eor', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'Datacenter_Server_Rack_Storage_Unit_Small.svg;',
					 d * 1.29, d * 1.12, '', 'Datacenter Server Rack Storage Unit Small', false, null, this.getTagsForStencil(gn, 'datacenter server rack storage unit small', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'Datacenter_Server_Rack_ToR.svg;',
					 d * 1.47, d * 2.98, '', 'Datacenter Server Rack ToR', false, null, this.getTagsForStencil(gn, 'datacenter server rack tor', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'Datacenter_Server_Storage_Unit_Large.svg;',
					 d * 1.28, d * 1.32, '', 'Datacenter Server Storage Unit Large', false, null, this.getTagsForStencil(gn, 'datacenter server storage unit large', dt).join(' '))
		];
			   	
   		this.addPalette('allied_telesisStorage', 'Allied Telesis / Storage', false, mxUtils.bind(this, function(content)
	    {
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addAlliedTelesisSwitchPalette = function(d, dt, sb, s)
	{
		s += 'switch/';
		var gn = 'switch';
		
		var fns = [
			 this.createVertexTemplateEntry(s + 'Industrial_Ethernet_IE200.svg;',
					 d * 0.67, d * 0.94, '', 'Industrial Ethernet IE200', false, null, this.getTagsForStencil(gn, 'industrial ethernet ie200', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'Industrial_Ethernet_IE200_POE.svg;',
					 d * 0.67, d * 0.94, '', 'Industrial Ethernet IE200 POE', false, null, this.getTagsForStencil(gn, 'industrial ethernet ie200 poe', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'Industrial_Ethernet_IE300.svg;',
					 d * 1.16, d * 1.29, '', 'Industrial_Ethernet_IE300', false, null, this.getTagsForStencil(gn, 'industrial ethernet ie300', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'Modular_Switch_SBx8106.svg;',
					 d * 1.43, d * 1.23, '', 'Modular Switch SBx8106', false, null, this.getTagsForStencil(gn, 'modular switch sbx8106', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'Modular_Switch_SBx8112.svg;',
					 d * 1.49, d * 1.53, '', 'Modular Switch SBx8112', false, null, this.getTagsForStencil(gn, 'modular switch sbx8112', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'Modular_Switch_SXx908GEN2.svg;',
					 d * 1.3, d * 1.11, '', 'Modular Switch SXx908GEN2', false, null, this.getTagsForStencil(gn, 'modular switch sxx908gen2', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'Switch_24_port_L2.svg;',
					 d * 1.24, d * 0.85, '', 'Switch 24 port L2', false, null, this.getTagsForStencil(gn, 'switch 24 port l2', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'Switch_24_port_L2_POE.svg;',
					 d * 1.24, d * 0.85, '', 'Switch 24 port L2 POE', false, null, this.getTagsForStencil(gn, 'switch 24 port l2 poe', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'Switch_24_port_L3.svg;',
					 d * 1.24, d * 0.85, '', 'Switch 24 port L3', false, null, this.getTagsForStencil(gn, 'switch 24 port l3', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'Switch_24_port_L3_Alternative.svg;',
					 d * 1.3, d * 0.88, '', 'Switch 24 port L3 Alternative', false, null, this.getTagsForStencil(gn, 'switch 24 port l3 alternative', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'Switch_24_port_L3_POE.svg;',
					 d * 1.24, d * 0.85, '', 'Switch 24 port L3 POE', false, null, this.getTagsForStencil(gn, 'switch 24 port l3 poe', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'Switch_48_port_L2.svg;',
					 d * 1.3, d * 0.88, '', 'Switch 48 port L2', false, null, this.getTagsForStencil(gn, 'switch 48 port l2', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'Switch_48_port_L2_POE.svg;',
					 d * 1.3, d * 0.88, '', 'Switch 48 port L2 POE', false, null, this.getTagsForStencil(gn, 'switch 48 port l2 poe', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'Switch_48_port_L3.svg;',
					 d * 1.3, d * 0.88, '', 'Switch 48 port L3', false, null, this.getTagsForStencil(gn, 'switch 48 port l3', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'Switch_48_port_L3_POE.svg;',
					 d * 1.3, d * 0.88, '', 'Switch 48 port L3 POE', false, null, this.getTagsForStencil(gn, 'switch 48 port l3 poe', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'Switch_52_port_L3.svg;',
					 d * 1.3, d * 0.88, '', 'Switch 52 port L3', false, null, this.getTagsForStencil(gn, 'switch 52 port l3', dt).join(' '))
		];
			   	
   		this.addPalette('allied_telesisSwitch', 'Allied Telesis / Switch', false, mxUtils.bind(this, function(content)
	    {
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addAlliedTelesisWirelessPalette = function(d, dt, sb, s)
	{
		s += 'wireless/';
		var gn = 'wireless';
		
		var fns = [
			 this.createVertexTemplateEntry(s + 'Access_Point_Indoor.svg;',
					 d * 0.61, d * 0.91, '', 'Access Point Indoor', false, null, this.getTagsForStencil(gn, 'access point indoor', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'Access_Point_Outdoor.svg;',
					 d * 0.43, d * 1.66, '', 'Access Point Outdoor', false, null, this.getTagsForStencil(gn, 'access point outdoor', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'Laptop_Wireless.svg;',
					 d * 0.96, d * 0.79, '', 'Laptop Wireless', false, null, this.getTagsForStencil(gn, 'laptop wireless', dt).join(' '))
		];
			   	
   		this.addPalette('allied_telesisWireless', 'Allied Telesis / Wireless', false, mxUtils.bind(this, function(content)
	    {
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
})();
