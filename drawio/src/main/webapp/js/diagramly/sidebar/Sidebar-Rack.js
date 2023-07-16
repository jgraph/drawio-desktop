(function()
{
	Sidebar.prototype.addRackPalette = function(rack, dir)
	{
		for (var i = 0; i < rack.length; i++)
		{
			if (rack[i].toLowerCase() === 'general')
			{
				this.setCurrentSearchEntryLibrary('rack', 'rackGeneral');
				this.addRackGeneralPalette();
			}
			else if (rack[i].toLowerCase() === 'f5')
			{
				this.setCurrentSearchEntryLibrary('rack', 'rackF5');
				this.addRackF5Palette();
			}
			else if (rack[i].toLowerCase() === 'dell')
			{
				this.setCurrentSearchEntryLibrary('rack', 'rackDell');
				this.addRackDellPalette();
			}
            else if (rack[i].toLowerCase() === 'hpe aruba gateways controllers')
            {
                this.addRackHPEArubaGatewaysControllersPalette();
            }
            else if (rack[i].toLowerCase() === 'hpe aruba security')
            {
                this.addRackHPEArubaSecurityPalette();
            }
            else if (rack[i].toLowerCase() === 'hpe aruba switches')
            {
                this.addRackHPEArubaSwitchesPalette();
            }
            else
			{
				this.setCurrentSearchEntryLibrary('rack', 'rack' + rack[i]);
				this.addStencilPalette('rack' + rack[i], 'Rack / ' + rack[i],
					dir + '/rack/' + rack[i].toLowerCase() + '.xml',
					';html=1;labelPosition=right;align=left;spacingLeft=15;dashed=0;shadow=0;fillColor=#ffffff;',	
					null, null, null, null, null, 'rack');
			}
		}
		
		this.setCurrentSearchEntryLibrary();
	}
	
	// Adds Rack shapes
	Sidebar.prototype.addRackGeneralPalette = function()
	{
		var s = 'strokeColor=#666666;html=1;verticalLabelPosition=bottom;labelBackgroundColor=#ffffff;verticalAlign=top;outlineConnect=0;shadow=0;dashed=0;';
		var sr = 'strokeColor=#666666;html=1;labelPosition=right;align=left;spacingLeft=15;shadow=0;dashed=0;outlineConnect=0;';
		
		//default tags
		var dt = 'rack equipment general ';
		
		this.addPaletteFunctions('rackGeneral', 'Rack / General', false,
		[
			this.createVertexTemplateEntry(s + 'shape=mxgraph.rackGeneral.rackCabinet3;fillColor2=#f4f4f4;container=1;collapsible=0;childLayout=rack;allowGaps=1;marginLeft=9;marginRight=9;marginTop=21;marginBottom=22;textColor=#666666;numDisp=off;', 180, 219, '', 'Rack Cabinet', null, null, dt + 'cabinet'),
			this.createVertexTemplateEntry(s + 'shape=mxgraph.rackGeneral.rackCabinet3;fillColor2=#f4f4f4;container=1;collapsible=0;childLayout=rack;allowGaps=1;marginLeft=33;marginRight=9;marginTop=21;marginBottom=22;textColor=#666666;numDisp=ascend;', 204, 219, '', 'Numbered Rack Cabinet', null, null, dt + 'cabinet numbered'),
			this.createVertexTemplateEntry(sr + 'text;', 160, 15, '', 'Spacing', null, null, dt + 'spacing'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rackGeneral.plate;fillColor=#e8e8e8;', 160, 15, '', 'Cover Plate', null, null, dt + 'cover plate'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.general.1u_rack_server;', 160, 15, '', 'Server', null, null, dt + 'server'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rackGeneral.horCableDuct;', 160, 15, '', 'Horizontal Cable Duct', null, null, dt + 'horizontal cable duct'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rackGeneral.horRoutingBank;', 160, 20, '', 'Horizontal Routing Bank', null, null, dt + 'horizontal routing bank'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rackGeneral.neatPatch;', 160, 30, '', 'Neat-Patch', null, null, dt + 'neat patch'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rackGeneral.shelf;container=1;collapsible=0', 160, 15, '', 'Shelf', null, null, dt + 'shelf'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rackGeneral.channelBase;', 200, 30, '', 'Channel Base', null, null, dt + 'channel base'),
			this.createVertexTemplateEntry('shape=mxgraph.rackGeneral.cabinetLeg;html=1;shadow=0;dashed=0;fillColor=#444444;strokeColor=#444444;verticalLabelPosition=bottom;labelBackgroundColor=#ffffff;verticalAlign=top;', 50, 50, '', 'Cabinet Leg', null, null, dt + 'cabinet leg support'),

			//stencils
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.general.cat5e_enhanced_patch_panel_48_ports;', 160, 30, '', 'CAT5e Enhanced Patch Panel 48 ports', null, null, dt + 'cat5e enhanced patch panel port'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.general.cat5e_rack_mount_patch_panel_24_ports;', 160, 15, '', 'CAT5e Rack Mount Patch Panel 24 ports', null, null, dt + 'cat5e mount patch panel port'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.general.cat5e_rack_mount_patch_panel_96_ports;', 160, 60, '', 'CAT5e Rack Mount Patch Panel 96 ports', null, null, dt + 'cat5e mount patch panel port'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.general.hub;', 160, 30, '', 'Hub', null, null, dt + 'hub'),
			this.createVertexTemplateEntry(s + 'shape=mxgraph.rack.general.server_1;', 73, 150, '', 'Server 1', null, null, dt + 'server'),
			this.createVertexTemplateEntry(s + 'shape=mxgraph.rack.general.server_2;', 73, 150, '', 'Server 2', null, null, dt + 'server'),
			this.createVertexTemplateEntry(s + 'shape=mxgraph.rack.general.server_3;', 73, 150, '', 'Server 3', null, null, dt + 'server'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.general.switches_1;', 160, 30, '', 'Switches 1', null, null, dt + 'server'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.general.switches_2;', 160, 30, '', 'Switches 2', null, null, dt + 'server')
		]);
		
		this.setCurrentSearchEntryLibrary();
	};
	
	Sidebar.prototype.addRackF5Palette = function()
	{
		var sr = 'strokeColor=#666666;html=1;labelPosition=right;align=left;spacingLeft=15;shadow=0;dashed=0;outlineConnect=0;';
		
		//default tags
		var dt = 'rack equipment f5 ';

		this.addPaletteFunctions('rackF5', 'Rack / F5', false,
		[
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.f5.arx_500;', 168, 20, '', 'ARX 500', null, null, dt + 'arx'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.f5.arx_1000;', 168, 40, '', 'ARX 1000', null, null, dt + 'arx'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.f5.arx_1500;', 168, 20, '', 'ARX 1500', null, null, dt + 'arx'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.f5.arx_2000;', 168, 40, '', 'ARX 2000', null, null, dt + 'arx'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.f5.arx_2500;', 168, 20, '', 'ARX 2500', null, null, dt + 'arx'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.f5.arx_4000;', 168, 60, '', 'ARX 4000', null, null, dt + 'arx'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.f5.arx_5000;', 168, 20, '', 'ARX 5000', null, null, dt + 'arx'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.f5.arx_6000;', 168, 240, '', 'ARX 6000', null, null, dt + 'arx'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.f5.big_ip_1600;', 168, 20, '', 'BIG-IP 1600', null, null, dt + 'big ip'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.f5.big_ip_2x00;', 168, 20, '', 'BIG-IP 2x00', null, null, dt + 'big ip'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.f5.big_ip_3600;', 168, 20, '', 'BIG-IP 3600', null, null, dt + 'big ip'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.f5.big_ip_3900;', 168, 20, '', 'BIG-IP 3900', null, null, dt + 'big ip'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.f5.big_ip_4x00;', 168, 20, '', 'BIG-IP 4x00', null, null, dt + 'big ip'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.f5.big_ip_5x00;', 168, 20, '', 'BIG-IP 5x00', null, null, dt + 'big ip'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.f5.big_ip_6900;', 168, 40, '', 'BIG-IP 6900', null, null, dt + 'big ip'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.f5.big_ip_89x0;', 168, 40, '', 'BIG-IP 89x0', null, null, dt + 'big ip'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.f5.big_ip_7x00;', 168, 40, '', 'BIG-IP 7x00', null, null, dt + 'big ip'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.f5.big_ip_10x00;', 168, 40, '', 'BIG-IP 10x00', null, null, dt + 'big ip'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.f5.big_ip_110x0;', 168, 60, '', 'BIG-IP 110x0', null, null, dt + 'big ip'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.f5.em_4000;', 168, 20, '', 'EM 4000', null, null, dt + 'big ip'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.f5.firepass_1200;', 168, 20, '', 'FirePass 1200', null, null, dt + 'big ip'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.f5.firepass_4100;', 168, 40, '', 'FirePass 4100', null, null, dt + 'big ip'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.f5.viprion_2400;', 168, 60, '', 'VIPRION 2400', null, null, dt + 'big ip'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.f5.viprion_4400;', 168, 120, '', 'VIPRION 4400', null, null, dt + 'big ip'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.f5.viprion_4800;', 168, 320, '', 'VIPRION 4800', null, null, dt + 'big ip')
		]);
		
		this.setCurrentSearchEntryLibrary();
	};
	
	Sidebar.prototype.addRackDellPalette = function()
	{
		var sr = 'strokeColor=#666666;html=1;labelPosition=right;align=left;spacingLeft=15;shadow=0;dashed=0;outlineConnect=0;';
		
		//default tags
		var dt = 'rack equipment dell ';

		this.addPaletteFunctions('rackDell', 'Rack / Dell', false,
		[
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.dell.dell_poweredge_1u;', 162, 15, '', 'PowerEdge 1U', null, null, dt + 'poweredge 1u'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.dell.dell_poweredge_2u;', 162, 30, '', 'PowerEdge 2U', null, null, dt + 'poweredge 2u'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.dell.dell_poweredge_4u;', 162, 60, '', 'PowerEdge 4U', null, null, dt + 'poweredge 4u'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.dell.power_strip;', 162, 15, '', 'Power Strip', null, null, dt + 'power strip'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.dell.poweredge_630;', 162, 15, '', 'PowerEdge 630', null, null, dt + 'poweredge 630'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.dell.poweredge_c4140;', 162, 15, '', 'PowerEdge C4140', null, null, dt + 'poweredge c4140'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.dell.poweredge_m1000e_enclosure;', 162, 150, '', 'PowerEdge M1000e Enclosure', null, null, dt + 'poweredge m1000e enclosure'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.dell.poweredge_m420;', 20, 37, '', 'PowerEdge M420', null, null, dt + 'poweredge m420'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.dell.poweredge_m520;', 20, 37, '', 'PowerEdge M520', null, null, dt + 'poweredge m520'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.dell.poweredge_m610x;', 20, 37, '', 'PowerEdge M610x', null, null, dt + 'poweredge m610x'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.dell.poweredge_m620;', 20, 37, '', 'PowerEdge M620', null, null, dt + 'poweredge m620'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.dell.poweredge_m820;', 20, 143, '', 'PowerEdge M820', null, null, dt + 'poweredge m820'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.dell.poweredge_m915;', 20, 143, '', 'PowerEdge M915', null, null, dt + 'poweredge m820'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.dell.poweredge_r240;', 162, 15, '', 'PowerEdge R240', null, null, dt + 'poweredge r240'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.dell.poweredge_r340;', 162, 15, '', 'PowerEdge R340', null, null, dt + 'poweredge r340'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.dell.poweredge_r440;', 162, 15, '', 'PowerEdge R440', null, null, dt + 'poweredge r440'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.dell.poweredge_r540;', 162, 27, '', 'PowerEdge R540', null, null, dt + 'poweredge r540'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.dell.poweredge_r640;', 162, 15, '', 'PowerEdge R640', null, null, dt + 'poweredge r640'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.dell.poweredge_r6415;', 162, 15, '', 'PowerEdge R6415', null, null, dt + 'poweredge r6415'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.dell.poweredge_r6515;', 162, 15, '', 'PowerEdge R6515', null, null, dt + 'poweredge r6515'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.dell.poweredge_r6525;', 162, 15, '', 'PowerEdge R6525', null, null, dt + 'poweredge r6525'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.dell.poweredge_r730;', 162, 30, '', 'PowerEdge R730', null, null, dt + 'poweredge r730'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.dell.poweredge_r730xd;', 162, 30, '', 'PowerEdge R730xd', null, null, dt + 'poweredge r730xd'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.dell.poweredge_r740;', 162, 30, '', 'PowerEdge R740', null, null, dt + 'poweredge r740'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.dell.poweredge_r740xd;', 162, 30, '', 'PowerEdge R740xd', null, null, dt + 'poweredge r740xd'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.dell.poweredge_r740xd2;', 162, 30, '', 'PowerEdge R740xd2', null, null, dt + 'poweredge r740xd2'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.dell.poweredge_r7415;', 162, 30, '', 'PowerEdge R7415', null, null, dt + 'poweredge r7415'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.dell.poweredge_r7425;', 162, 30, '', 'PowerEdge R7425', null, null, dt + 'poweredge r7425'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.dell.poweredge_r7515;', 162, 30, '', 'PowerEdge R7515', null, null, dt + 'poweredge r7515'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.dell.poweredge_r840;', 162, 30, '', 'PowerEdge R840', null, null, dt + 'poweredge r840'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.dell.poweredge_r940;', 162, 45, '', 'PowerEdge R940', null, null, dt + 'poweredge r940'),
			this.createVertexTemplateEntry(sr + 'shape=mxgraph.rack.dell.poweredge_xr2;', 162, 15, '', 'PowerEdge XR2', null, null, dt + 'poweredge xr2')
		]);
		
		this.setCurrentSearchEntryLibrary();
	};
	
    Sidebar.prototype.addRackHPEArubaGatewaysControllersPalette = function()
    {
        var s = 'html=1;verticalLabelPosition=bottom;verticalAlign=top;outlineConnect=0;shadow=0;dashed=0;shape=mxgraph.rack.hpe_aruba.gateways_controllers.';
        
        //default tags
        var dt = 'rack equipment hpe hp aruba hewlett packard enterprise gateway controller ';
        
        this.addPaletteFunctions('rackHPE Aruba Gateways Controllers', 'Rack / HPE Aruba / Gateways and Controllers', false,
        [
            this.createVertexTemplateEntry(s + 'aruba_7010_mobility_controller_front;', 142, 15, '', 'Aruba 7010 Mobility Controller (front)', null, null, dt + '7010 mobility front'),
            this.createVertexTemplateEntry(s + 'aruba_7010_mobility_controller_rear;', 142, 15, '', 'Aruba 7010 Mobility Controller (rear)', null, null, dt + '7010 mobility rear'),
            this.createVertexTemplateEntry(s + 'aruba_7024_mobility_controller_front;', 142, 15, '', 'Aruba 7024 Mobility Controller (front)', null, null, dt + '7024 mobility front'),
            this.createVertexTemplateEntry(s + 'aruba_7024_mobility_controller_rear;', 142, 15, '', 'Aruba 7024 Mobility Controller (rear)', null, null, dt + '7024 mobility rear'),
            this.createVertexTemplateEntry(s + 'aruba_7030_mobility_controller_front;', 142, 15, '', 'Aruba 7030 Mobility Controller (front)', null, null, dt + '7030 mobility front'),
            this.createVertexTemplateEntry(s + 'aruba_7030_mobility_controller_rear;', 142, 15, '', 'Aruba 7030 Mobility Controller (rear)', null, null, dt + '7030 mobility rear'),
            this.createVertexTemplateEntry(s + 'aruba_7205_mobility_controller_front;', 142, 15, '', 'Aruba 7205 Mobility Controller (front)', null, null, dt + '7205 mobility front'),
            this.createVertexTemplateEntry(s + 'aruba_7205_mobility_controller_rear;', 142, 15, '', 'Aruba 7205 Mobility Controller (rear)', null, null, dt + '7205 mobility rear'),
            this.createVertexTemplateEntry(s + 'aruba_7210_mobility_controller_front;', 142, 15, '', 'Aruba 7210 Mobility Controller (front)', null, null, dt + '7210 mobility front'),
            this.createVertexTemplateEntry(s + 'aruba_7210_mobility_controller_rear;', 142, 15, '', 'Aruba 7210 Mobility Controller (rear)', null, null, dt + '7210 mobility rear'),
            this.createVertexTemplateEntry(s + 'aruba_7220_mobility_controller_front;', 142, 15, '', 'Aruba 7220 Mobility Controller (front)', null, null, dt + '7220 mobility front'),
            this.createVertexTemplateEntry(s + 'aruba_7220_mobility_controller_rear;', 142, 15, '', 'Aruba 7220 Mobility Controller (rear)', null, null, dt + '7220 mobility rear'),
            this.createVertexTemplateEntry(s + 'aruba_7240_mobility_controller_front;', 142, 15, '', 'Aruba 7240 Mobility Controller (front)', null, null, dt + '7240 mobility front'),
            this.createVertexTemplateEntry(s + 'aruba_7240_mobility_controller_rear;', 142, 15, '', 'Aruba 7240 Mobility Controller (rear)', null, null, dt + '7240 mobility rear'),
            this.createVertexTemplateEntry(s + 'aruba_7280_mobility_controller_front;', 142, 15, '', 'Aruba 7280 Mobility Controller (front)', null, null, dt + '7280 mobility front'),
            this.createVertexTemplateEntry(s + 'aruba_7280_mobility_controller_rear;', 142, 15, '', 'Aruba 7280 Mobility Controller (rear)', null, null, dt + '7280 mobility rear'),
            this.createVertexTemplateEntry(s + 'aruba_9004_4_port_gbe_gateway_front;', 71, 15, '', 'Aruba 9004 4-Port GbE Gateway (back)', null, null, dt + '9004 port gbe front'),
            this.createVertexTemplateEntry(s + 'aruba_9004_4_port_gbe_gateway_back;', 71, 15, '', 'Aruba 9004 4-Port GbE Gateway (front)', null, null, dt + '9004 port gbe back'),
            this.createVertexTemplateEntry(s + 'aruba_9004_dual_rackmount;', 142, 15, '', 'Aruba 9004 dual rackmount', null, null, dt + '9004 dual rackmount'),
            this.createVertexTemplateEntry(s + 'aruba_9012_10_port_gbe_gateway_front;', 142, 15, '', 'Aruba 9012 10-Port GbE Gateway (front)', null, null, dt + '9012 10 port gbe front'),
            this.createVertexTemplateEntry(s + 'aruba_9012_10_port_gbe_gateway_back;', 142, 15, '', 'Aruba 9012 10-Port GbE Gateway (back)', null, null, dt + '9012 10 port gbe back'),
            this.createVertexTemplateEntry(s + 'aruba_clearpass_c1000_front;', 142, 15, '', 'Aruba ClearPass C1000 (front)', null, null, dt + 'clearpass c1000 front'),
            this.createVertexTemplateEntry(s + 'aruba_mobility_master_10k_front;', 142, 15, '', 'Aruba Mobility Master 10k (front)', null, null, dt + 'mobility master 10k front'),
            this.createVertexTemplateEntry(s + 'aruba_mobility_master_10k_rear;', 142, 15, '', 'Aruba Mobility Master 10k (rear)', null, null, dt + 'mobility master 10k rear'),
            this.createVertexTemplateEntry(s + 'aruba_mobility_master_1k_front;', 142, 15, '', 'Aruba Mobility Master 1k (front)', null, null, dt + 'mobility master 1k front'),
            this.createVertexTemplateEntry(s + 'aruba_mobility_master_1k_rear;', 142, 15, '', 'Aruba Mobility Master 1k (rear)', null, null, dt + 'mobility master 1k rear'),
            this.createVertexTemplateEntry(s + 'aruba_mobility_master_5k_front;', 142, 15, '', 'Aruba Mobility Master 5k (front)', null, null, dt + 'mobility master 5k front'),
            this.createVertexTemplateEntry(s + 'aruba_mobility_master_5k_rear;', 142, 15, '', 'Aruba Mobility Master 5k (rear)', null, null, dt + 'mobility master 5k rear')
        ]);
    };
    
    Sidebar.prototype.addRackHPEArubaSecurityPalette = function()
    {
        var s = 'html=1;verticalLabelPosition=bottom;verticalAlign=top;outlineConnect=0;shadow=0;dashed=0;shape=mxgraph.rack.hpe_aruba.security.';
        
        //default tags
        var dt = 'rack equipment hpe hp hewlett packard enterprise aruba security clearpass ';
        
        this.addPaletteFunctions('rackHPE Aruba Security', 'Rack / HPE Aruba / Security', false,
        [
            this.createVertexTemplateEntry(s + 'aruba_clearpass_c1000_front;', 142, 15, '', 'Aruba ClearPass C1000 (front)', null, null, dt + 'c1000 front'),
            this.createVertexTemplateEntry(s + 'aruba_clearpass_c1000_rear;', 142, 15, '', 'Aruba ClearPass C1000 (rear)', null, null, dt + 'c1000 rear'),
            this.createVertexTemplateEntry(s + 'aruba_clearpass_c2000_front;', 142, 15, '', 'Aruba ClearPass C2000 (front)', null, null, dt + 'c2000 front'),
            this.createVertexTemplateEntry(s + 'aruba_clearpass_c2000_rear;', 142, 15, '', 'Aruba ClearPass C2000 (rear)', null, null, dt + 'c2000 rear'),
            this.createVertexTemplateEntry(s + 'aruba_clearpass_c3000_front;', 142, 15, '', 'Aruba ClearPass C3000 (front)', null, null, dt + 'c3000 front'),
            this.createVertexTemplateEntry(s + 'aruba_clearpass_c3000_rear;', 142, 15, '', 'Aruba ClearPass C3000 (rear)', null, null, dt + 'c3000 rear'),
            this.createVertexTemplateEntry(s + 'direct_qsfp;', 11, 5.7, '', 'Direct QSFP', null, null, dt + 'direct qsfp')
        ]);
    };
    
    Sidebar.prototype.addRackHPEArubaSwitchesPalette = function()
    {
        var s = 'html=1;verticalLabelPosition=bottom;verticalAlign=top;outlineConnect=0;shadow=0;dashed=0;shape=mxgraph.rack.hpe_aruba.switches.';
        
        //default tags
        var dt = 'rack equipment hpe hp hewlett packard enterprise aruba ';
        
        this.addPaletteFunctions('rackHPE Aruba Switches', 'Rack / HPE Aruba / Switches', false,
        [
            this.createVertexTemplateEntry(s + 'direct_qsfp;', 11, 5.7, '', 'Direct QSFP', null, null, dt + 'direct qsfp'),
            this.createVertexTemplateEntry(s + 'direct_sfp;', 11, 8, '', 'Direct SFP', null, null, dt + 'direct sfp'),
            this.createVertexTemplateEntry(s + 'fibre_qsfp;', 20, 5.7, '', 'Fibre QSFP', null, null, dt + 'fibre qsfp'),
            this.createVertexTemplateEntry(s + 'j9772a_2530_48g_poeplus_switch;', 142, 15, '', 'J9772A 2530-48G PoE+ Switch', null, null, dt + 'j9772a 2530 48g poeplus switch'),
            this.createVertexTemplateEntry(s + 'j9773a_2530_24g_poeplus_switch;', 142, 15, '', 'J9773A 2530-24G PoE+ Switch', null, null, dt + 'j9773a 2530 24g poeplus switch'),
            this.createVertexTemplateEntry(s + 'j9774a_2530_8g_poeplus_front;', 87, 15, '', 'J9774A 2530-8G PoE+ (front)', null, null, dt + 'j9774a 2530 8g poeplus front'),
            this.createVertexTemplateEntry(s + 'j9774a_2530_8g_poeplus_rear;', 87, 15, '', 'J9774A 2530-8G PoEplus (rear)', null, null, dt + 'j9774a 2530 8g poeplus rear'),
            this.createVertexTemplateEntry(s + 'j9775a_2530_48g_switch;', 142, 15, '', 'J9775A 2530-48G Switch', null, null, dt + 'j9775a 2530 48g switch'),
            this.createVertexTemplateEntry(s + 'j9776a_2530_24g_switch;', 142, 15, '', 'J9776A 2530-24G Switch', null, null, dt + 'j9776a 2530 24g switch'),
            this.createVertexTemplateEntry(s + 'j9777a_2530_8g_front;', 87, 15, '', 'J9777A 2530-8G (front)', null, null, dt + 'j9777a 2530 8g front'),
            this.createVertexTemplateEntry(s + 'j9777a_2530_8g_rear;', 87, 15, '', 'J9777A 2530-8G (rear)', null, null, dt + 'j9777a 2530 8g rear'),
            this.createVertexTemplateEntry(s + 'j9778a_2530_48_poeplus_front;', 142, 15, '', 'J9778A 2530-48 PoE+ (front)', null, null, dt + 'j9778a 2530 48 poeplus front'),
            this.createVertexTemplateEntry(s + 'j9780a_2530_8_poeplus_front;', 142, 15, '', 'J9780A 2530-8 PoE+ (front)', null, null, dt + 'j9780a 2530 poeplus front'),
            this.createVertexTemplateEntry(s + 'j9780a_2530_8_poeplus_rear;', 142, 15, '', 'J9780A 2530-8 PoE+ (rear)', null, null, dt + 'j9780a 2530 poeplus rear'),
            this.createVertexTemplateEntry(s + 'j9781a_2530_48_front;', 142, 15, '', 'J9781A 2530-48 (front)', null, null, dt + 'j9781a 2530 48 front'),
            this.createVertexTemplateEntry(s + 'j9782a_2530_24_front;', 142, 15, '', 'J9782A 2530-24 (front)', null, null, dt + 'j9782a 2530 24 front'),
            this.createVertexTemplateEntry(s + 'j9821a_540r_zl2_switch_rear;', 142, 56, '', 'J9821A 540R zl2 Switch (rear)', null, null, dt + 'j9821a 540r zl2 switch rear'),
            this.createVertexTemplateEntry(s + 'j9822a_5412r_zl2_switch;', 142, 98, '', 'J9822A 5412R zl2 Switch', null, null, dt + 'j9822a 5412r zl2 switch'),
            this.createVertexTemplateEntry(s + 'j9822a_5412r_zl2_switch_rear;', 142, 98, '', 'J9822A 5412R zl2 Switch (rear)', null, null, dt + 'j9822a 5412r zl2 switch rear'),
            this.createVertexTemplateEntry(s + 'j9827a_5400r_management_module;', 98, 15, '', 'J9827A 5400R Management Module', null, null, dt + 'j9827a 5400r management module'),
            this.createVertexTemplateEntry(s + 'j9828a_5400r_700w_poeplus_zl2_power_supply;', 63, 43, '', 'J9828A 5400R 700W PoE+ zl2 Power Supply', null, null, dt + 'j9828a 5400r 700w poeplus zl2 power supply'),
            this.createVertexTemplateEntry(s + 'j9829a_5400r_1100w_poeplus_zl2_power_supply;', 63, 43, '', 'J9829A 5400R 1100W PoE+ zl2 Power Supply', null, null, dt + 'j9829a 5400r 1100w poeplus zl2 power supply'),
            this.createVertexTemplateEntry(s + 'j9830b_5400r_2750w_poeplus_zl2_power_supply;', 63, 43, '', 'J9830B 5400R 2750W PoE+ zl2 Power Supply', null, null, dt + 'j9830b 5400r 2750w poeplus zl2 power supply'),
            this.createVertexTemplateEntry(s + 'j9831a_5406r_zl2_switch_fan_tray;', 15, 53, '', 'J9831A 5406R zl2 Switch Fan Tray', null, null, dt + 'j9831a 5406r zl2 switch fan tray'),
            this.createVertexTemplateEntry(s + 'j9832a_5412r_zl2_switch_fan_tray;', 15, 96, '', 'J9832A 5412R zl2 Switch Fan Tray', null, null, dt + 'j9832a 5412r zl2 switch fan tray'),
            this.createVertexTemplateEntry(s + 'j9840a_msm_775zl_v2_zl_module;', 75, 15, '', 'J9840A MSM 775zl v2 zl Module', null, null, dt + 'j9840a msm 775zl v2 zl module'),
            this.createVertexTemplateEntry(s + 'j9850a_5406r_zl2_switch_rear;', 142, 55, '', 'J9850A 5406R zl2 Switch (rear)', null, null, dt + 'j9850a 5406r zl2 switch rear'),
            this.createVertexTemplateEntry(s + 'j9850a_540r_zl2_switch;', 142, 55, '', 'J9850A 540R zl2 Switch', null, null, dt + 'j9850a 540r zl2 switch'),
            this.createVertexTemplateEntry(s + 'j9851a_5412r_zl2_switch;', 142, 98, '', 'J9851A 5412R zl2 Switch', null, null, dt + 'j9851a 5412r zl2 switch'),
            this.createVertexTemplateEntry(s + 'j9851a_5412r_zl2_switch_rear;', 142, 98, '', 'J9851A 5412R zl2 Switch (rear)', null, null, dt + 'j9851a 5412r zl2 switch rear'),
            this.createVertexTemplateEntry(s + 'j9853a_2530_48g_poeplus_2sfpplus_switch;', 142, 15, '', 'J9853A 2530-48G PoE+ 2SFP+ Switch', null, null, dt + 'j9853a 2530 48g poeplus 2sfpplus switch'),
            this.createVertexTemplateEntry(s + 'j9854a_2530_24g_poeplus_2sfpplus_switch;', 142, 15, '', 'J9854A 2530-24G PoE+ 2SFP+ Switch', null, null, dt + 'j9854a 2530 24g poeplus 2sfpplus Switch'),
            this.createVertexTemplateEntry(s + 'j9855a_2530_48g_2sfpplus_switch;', 142, 15, '', 'J9855A 2530-48G 2SFP+ Switch', null, null, dt + 'j9855a 2530 48g 2sfpplus switch'),
            this.createVertexTemplateEntry(s + 'j9856a_2530_24g_2sfpplus_switch;', 142, 15, '', 'J9856A 2530-24G 2SFP+ Switch', null, null, dt + 'j9856a 2530 24g 2sfpplus switch'),
            this.createVertexTemplateEntry(s + 'j9857a_adv_svcs_v2_zl_module;', 75, 15, '', 'J9857A Adv Svcs v2 zl Module', null, null, dt + 'j9857a adv svcs v2 zl module'),
            this.createVertexTemplateEntry(s + 'j9858a_adv_svcs_v2_zl_module;', 75, 15, '', 'J9858A Adv Svcs v2 zl Module', null, null, dt + 'j9858a adv svcs v2 zl module'),
            this.createVertexTemplateEntry(s + 'j993a_8_port_1g_10gbe_sfpplus_with_macsec_v3_zl2_module;', 75, 15, '', 'J993A 8-port 1G 10GbE SFP+ with MACsec v3 zl2 Module', null, null, dt + 'j993a 8 port 1g 10gbe sfpplus with macsec v3 zl2 module'),
            this.createVertexTemplateEntry(s + 'j9986a_24p_gigt_module;', 75, 15, '', 'J9986A 24p GigT Module', null, null, dt + 'j9986a 24p gigt module'),
            this.createVertexTemplateEntry(s + 'j9987a_24_port_10_100_1000base_t_with_macsec_v3_zl2_module;', 75, 15, '', 'J9987A 24-port 10/100/1000BASE-T with MACsec v3 zl2 Module', null, null, dt + 'j9987a 24 port 10 100 1000base with macsec v3 zl2 module'),
            this.createVertexTemplateEntry(s + 'j9988a_24_port_1gbe_sfp_with_magsec_v3_zl2_module;', 75, 15, '', 'J9988A 24-port 1GbE SFP with MAGsec v3 zl2 Module', null, null, dt + 'j9988A 24 port 1gbe sfp with magsec v3 zl2 module'),
            this.createVertexTemplateEntry(s + 'j9989a_12_port_10_100_1000base_t_poeplus_and_12_port_1gbe_sfp_with_macsec_v3_zl2_module;', 75, 15, '', 'J9989A 12-port 10/100/1000BASE-T PoE+ and 12-port 1GbE SFP with MACsec v3 zl2 Module', null, null, dt + 'j9989a 12 port 10 100 1000base poeplus and 12 port 1gbe sfp with macsec v3 zl2 module'),
            this.createVertexTemplateEntry(s + 'j9990a_20p_gigt_4p_sfpplus_module;', 75, 15, '', 'J9990A 20p GigT 4p SFP+ Module', null, null, dt + 'j9990a 20p gigt 4p sfpplus module'),
            this.createVertexTemplateEntry(s + 'j9991a_20_port_10_100_1000base_t_poeplus_and_4_port_1_2.5_5_10gbase_t_poeplus_with_macsec_v3_zl2_module;', 75, 15, '', 'J9991A 20-port 10/100/1000BASE-T PoE+ and 4 port 1/2.5/5/10GBASE-T PoE+ with MACsec v3 zl2 Module', null, null, dt + 'j9991a 20 port 10 100 1000base poeplus and port 2.5 10gbase poeplus with macsec v3 zl2 module'),
            this.createVertexTemplateEntry(s + 'j9992a_20_port_10_100_1000base_t_poeplus_and_1_port_40gbe_qsfpplus_withmacsec_v3_zl2_module;', 75, 15, '', 'J9992A 20-port 10/100/1000BASE-T PoE+ and 1-port 40GbE QSFP+ with MACsec v3 zl2 Module', null, null, dt + 'j9992a 20 port 10 100 1000base poeplus and port 40gbe qsfpplus withmacsec v3 zl2 module'),
            this.createVertexTemplateEntry(s + 'j9995a_8p_smart_rate_poeplus_module;', 75, 15, '', 'J9995A 8p Smart Rate PoE+ Module', null, null, dt + 'j9995a 8p smart rate poeplus module'),
            this.createVertexTemplateEntry(s + 'j9996a_2_port_40gbe_qsfpplus_with_macsec_v3_zl2_module;', 75, 15, '', 'J9996A 2-port 40GbE QSFP+ with MACsec v3 zl2 Module', null, null, dt + 'j9996a port 40gbe qsfpplus with macsec v3 zl2 module'),
            this.createVertexTemplateEntry(s + 'jl070a_2530_8_poeplus_internal_ps_switch;', 82, 15, '', 'JL070A 2530-8 PoE+ Internal PS Switch', null, null, dt + 'jL070a 2530 poeplus internal ps switch'),
            this.createVertexTemplateEntry(s + 'jl071a_hpe_aruba_3810m_24_port_gt_1_slot_switch;', 142, 15, '', 'JL071A HPE Aruba 3810M 24-port GT 1-slot Switch', null, null, dt + 'jl071a 3810m 24 port gt slot switch'),
            this.createVertexTemplateEntry(s + 'jl071a_hpe_aruba_3810m_24_port_gt_1_slot_switch_rear;', 142, 15, '', 'JL071A HPE Aruba 3810M 24-port GT 1-slot Switch (rear)', null, null, dt + 'jl071a 3810m 24 port gt slot switch rear'),
            this.createVertexTemplateEntry(s + 'jl072a_hpe_aruba_3810m_48_port_gt_1_slot_switch;', 142, 15, '', 'JL072A HPE Aruba 3810M 48-port GT 1-slot Switch', null, null, dt + 'jl072a hpe aruba 3810m 48 port gt slot switch'),
            this.createVertexTemplateEntry(s + 'jl072a_hpe_aruba_3810m_48_port_gt_1_slot_switch_rear;', 142, 15, '', 'JL072A HPE Aruba 3810M 48-port GT 1-slot Switch (rear)', null, null, dt + 'jl072a 3810m 48 port gt slot switch rear'),
            this.createVertexTemplateEntry(s + 'jl073a_hpe_aruba_3810m_24_port_gt_poeplus_1_slot_switch;', 142, 15, '', 'JL073A HPE Aruba 3810M 24-port GT PoEplus 1-slot Switch', null, null, dt + 'jl073a 3810m 24 port gt poeplus slot switch'),
            this.createVertexTemplateEntry(s + 'jl073a_hpe_aruba_3810m_24_port_gt_poeplus_1_slot_switch_rear;', 142, 15, '', 'JL073A HPE Aruba 3810M 24-port GT PoE 1-slot Switch (rear)', null, null, dt + 'jl073a 3810m 24 port gt poeplus slot switch rear'),
            this.createVertexTemplateEntry(s + 'jl074a_hpe_aruba_3810m_48_port_gt_poeplus_1_slot_switch;', 142, 15, '', 'JL074A HPE Aruba 3810M 48-port GT PoE+ 1-slot Switch', null, null, dt + 'jl074a 3810m 48 port gt poeplus slot switch'),
            this.createVertexTemplateEntry(s + 'jl075a_hpe_aruba_3810m_16_port_sfpplus_2_slot_switch;', 142, 15, '', 'JL075A HPE Aruba 3810M 16-port SFP+ 2-slot Switch', null, null, dt + 'jl075a 3810m 16 port sfpplus slot switch'),
            this.createVertexTemplateEntry(s + 'jl075a_hpe_aruba_3810m_16_port_sfpplus_2_slot_switch_rear;', 142, 15, '', 'JL075A HPE Aruba 3810M 16-port SFP+ 2-slot Switch (rear)', null, null, dt + 'jl075a 3810m 16 port sfpplus slot switch rear'),
            this.createVertexTemplateEntry(s + 'jl076a_hpe_aruba_3810m_40_port_gt_poeplus_8_port_1_2_5_5_10gbase_t_poeplus_1_slot_switch;', 142, 15, '', 'JL076A HPE Aruba 3810M 40-port GT PoE+ 8-port 1/2.5/5/10GBASE-T PoE+ 1-slot Switch', null, null, dt + 'jl076a 3810m 40 port gt poeplus port 10gbase poeplus slot switch'),
            this.createVertexTemplateEntry(s + 'jl076a_hpe_aruba_3810m_40_port_gt_poeplus_8_port_1_2_5_5_10gbase_t_poeplus_1_slot_switch_rear;', 142, 15, '', 'JL076A HPE Aruba 3810M 40-port GT PoE+ 8-port 1/2.5/5/10GBASE-T PoE+ 1-slot Switch (rear)', null, null, dt + 'jl076a 3810m 40 port gt poeplus port 10gbase poeplus slot switch rear'),
            this.createVertexTemplateEntry(s + 'jl079a3810m_2930m_2_port_40gbe_qsfpplus_module;', 41, 15, '', 'JL079A3810M 2930M 2-port 40GbE QSFP+ Module', null, null, dt + 'jl079a3810m 2930m port 40gbe qsfpplus module'),
            this.createVertexTemplateEntry(s + 'jl081a_3810m_2930m_4_1_2_5_5_10_gbe_hpe_smart_rate_module;', 41, 15, '', 'JL081A 3810M 2930M 4 1/2.5/5/10 GbE HPE Smart Rate Module', null, null, dt + 'jl081a 3810m 2930m 10 gbe smart rate module'),
            this.createVertexTemplateEntry(s + 'jl083a_3810m_2930m_4_port_10gbe_sfpplus_module;', 41, 15, '', 'JL083A 3810M 2930M 4-port 10GbE SFP+ Module', null, null, dt + 'jl083a 3810m 2930m port 10gbe sfpplus module'),
            this.createVertexTemplateEntry(s + 'jl084a_3810m_2930m_4_port_stacking_module;', 82, 15, '', 'JL084A 3810M 2930M 4-port Stacking Module', null, null, dt + 'jl084a 3810m 2930m port stacking module'),
            this.createVertexTemplateEntry(s + 'jl085a_aruba_6300m_psu_module;', 27, 13, '', 'JL085A Aruba 6300M PSU Module', null, null, dt + 'jl085a 6300m psu module'),
            this.createVertexTemplateEntry(s + 'jl086a_aruba_6300m_psu_module;', 27, 13, '', 'JL086A Aruba 6300M PSU Module', null, null, dt + 'jl086a 6300m psu module'),
            this.createVertexTemplateEntry(s + 'jl087a_3810m_2930m_1_port_40gbe_qsfpplus_module;', 41, 15, '', 'JL087A 3810M 2930M 1-port 40GbE QSFP+ Module', null, null, dt + 'jl087a 3810m 2930m port 40gbe qsfpplus module'),
            this.createVertexTemplateEntry(s + 'jl087a_aruba_6300m_psu_module;', 27, 15, '', 'JL087A Aruba 6300M PSU Module', null, null, dt + 'jl087a 6300m psu module'),
            this.createVertexTemplateEntry(s + 'jl253a_aruba_2930f_24g_4sfpplus_switch;', 142, 15, '', 'JL253A Aruba 2930F-24G 4SFP+ switch', null, null, dt + 'jl253a 2930f 24g 4sfpplus switch'),
            this.createVertexTemplateEntry(s + 'jl254a_aruba_2930f_48g_4sfpplus_switch;', 142, 15, '', 'JL254A Aruba 2930F-48G 4SFP+ switch', null, null, dt + 'jl254a 2930f 48g 4sfpplus switch'),
            this.createVertexTemplateEntry(s + 'jl255a_aruba_2930f_24g_poeplus_4sfpplus_switch;', 142, 15, '', 'JL255A Aruba 2930F-24G PoE+ 4SFP+ switch', null, null, dt + 'jl255a 2930f 24g poeplus 4sfpplus switch'),
            this.createVertexTemplateEntry(s + 'jl256a_aruba_2930f_48g_poeplus_4sfpplus_switch;', 142, 15, '', 'JL256A Aruba 2930F-48G PoE+ 4SFP+ switch', null, null, dt + 'jl256a 2930f 48g poeplus 4sfpplus switch'),
            this.createVertexTemplateEntry(s + 'jl258a_aruba_2930f_8g_poeplus_2sfpplus_rear;', 82, 15, '', 'JL258A Aruba 2930F-8G PoE+ 2SFP+ (rear)', null, null, dt + 'jl258a 2930f 8g poeplus 2sfpplus rear'),
            this.createVertexTemplateEntry(s + 'jl258a_aruba_2930f_8g_poeplus_2sfpplus_switch;', 82, 15, '', 'JL258A Aruba 2930F-8G PoE+ 2SFP+ switch', null, null, dt + 'jl258a 2930f 8g poeplus 2sfpplus switch'),
            this.createVertexTemplateEntry(s + 'jl258a_aruba_2930f_8g_poeplus_2sfpplus_switch_rear;', 82, 15, '', 'JL258A Aruba 2930F-8G PoE+ 2SFP+ switch (rear)', null, null, dt + 'jl258a 2930f 8g poeplus 2sfpplus switch rear'),
            this.createVertexTemplateEntry(s + 'jl259a_aruba_2930f_24g_4sfp_switch;', 142, 15, '', 'JL259A Aruba 2930F-24G 4SFP switch', null, null, dt + 'jl259a 2930f 24g 4sfp switch'),
            this.createVertexTemplateEntry(s + 'jl260a_aruba_2930f_48g_4sfp_switch;', 142, 15, '', 'JL260A Aruba 2930F-48G 4SFP switch', null, null, dt + 'jl260a 2930f 48g 4sfp switch'),
            this.createVertexTemplateEntry(s + 'jl261a_aruba_2930f_24g_poeplus_4sfp_switch;', 142, 15, '', 'JL261A Aruba 2930F-24G PoE+ 4SFP switch', null, null, dt + 'jl261a 2930f 24g poeplus 4sfp switch'),
            this.createVertexTemplateEntry(s + 'jl262a_aruba_2930f_48g_poeplus_4sfp_switch;', 142, 15, '', 'JL262A Aruba 2930F-48G PoE+ 4SFP switch', null, null, dt + 'jl262a 2930f 48g poeplus 4sfp switch'),
            this.createVertexTemplateEntry(s + 'jl263a_aruba_2930f_24g_poeplus_4sfpplus_taa_switch;', 142, 15, '', 'JL263A Aruba 2930F-24G PoE+ 4SFP+ TAA Switch', null, null, dt + 'jl263a 2930f 24g poeplus 4sfpplus taa switch'),
            this.createVertexTemplateEntry(s + 'jl264a_aruba_2930f_48g_poeplus_4sfpplus_taa_switch;', 142, 15, '', 'JL264A Aruba 2930F-48G PoE+ 4SFP+ TAA switch', null, null, dt + 'jl264a 2930f 48g poeplus 4sfpplus taa switch'),
            this.createVertexTemplateEntry(s + 'jl319a_aruba_2930m_24g_1_slot_switch;', 142, 15, '', 'JL319A Aruba 2930M-24G 1-slot Switch', null, null, dt + 'jl319a 2930m 24g slot switch'),
            this.createVertexTemplateEntry(s + 'jl319a_aruba_2930m_24g_1_slot_switch_rear;', 142, 15, '', 'JL319A Aruba 2930M-24G 1-slot Switch (rear)', null, null, dt + 'jl319a 2930m 24g slot switch rear'),
            this.createVertexTemplateEntry(s + 'jl320a_aruba_2930m_24g_poeplus_1_slot_switch;', 142, 15, '', 'JL320A Aruba 2930M-24G PoE+ 1-slot Switch', null, null, dt + 'jl320a 2930m 24g poeplus slot switch'),
            this.createVertexTemplateEntry(s + 'jl320a_aruba_2930m_24g_poeplus_1_slot_switch_rear;', 142, 15, '', 'JL320A Aruba 2930M-24G PoE+ 1-slot Switch (rear)', null, null, dt + 'jl320a 2930m 24g poeplus slot switch rear'),
            this.createVertexTemplateEntry(s + 'jl321a_aruba_2930m_48g_1_slot_switch;', 142, 15, '', 'JL321A Aruba 2930M-48G 1-slot Switch', null, null, dt + 'jl321a 2930m 48g slot switch'),
            this.createVertexTemplateEntry(s + 'jl321a_aruba_2930m_48g_1_slot_switch_rear;', 142, 15, '', 'JL321A Aruba 2930M-48G 1-slot Switch (rear)', null, null, dt + 'jl321a 2930m 48g slot switch rear'),
            this.createVertexTemplateEntry(s + 'jl322a_aruba_2930m_48g_poeplus_1_slot_switch;', 142, 15, '', 'JL322A Aruba 2930M-48G PoE+ 1-slot Switch', null, null, dt + 'jl322a 2930m 48g poeplus slot switch'),
            this.createVertexTemplateEntry(s + 'jl322a_aruba_2930m_48g_poeplus_1_slot_switch_rear;', 142, 15, '', 'JL322A Aruba 2930M-48G PoE+ 1-slot Switch (rear)', null, null, dt + 'jl322a 2930m 48g poeplus slot switch rear'),
            this.createVertexTemplateEntry(s + 'jl323a_aruba_2930m_40g_8_smart_rate_poeplus_1_slot_switch;', 142, 15, '', 'JL323A Aruba 2930M-40G 8 Smart Rate PoE+ 1-slot Switch', null, null, dt + 'jl323a 2930m 40g smart rate poeplus slot switch'),
            this.createVertexTemplateEntry(s + 'jl324a_aruba_2930m_24_smart_rate_poeplus_1_slot_switch;', 142, 15, '', 'JL324A Aruba 2930M-24 Smart Rate PoE+ 1-slot Switch', null, null, dt + 'jl324a 2930m 24 smart rate poeplus slot switch'),
            this.createVertexTemplateEntry(s + 'jl325a_2930m_2_port_stacking_module;', 23, 10, '', 'JL325A 2930M 2-port Stacking Module', null, null, dt + 'jl325a 2930m port stacking module'),
            this.createVertexTemplateEntry(s + 'jl354a_aruba_2540_24g_4sfpplus_switch;', 142, 15, '', 'JL354A Aruba 2540-24G 4SFP+ switch', null, null, dt + 'jl354a 2540 24g 4sfpplus switch'),
            this.createVertexTemplateEntry(s + 'jl355a_aruba_2540_48g_4sfpplus_switch;', 142, 15, '', 'JL355A Aruba 2540-48G 4SFP Switch', null, null, dt + 'jl355a 2540 48g 4sfpplus switch'),
            this.createVertexTemplateEntry(s + 'jl356a_aruba_2540_24g_poeplus_4sfpplus_switch;', 142, 15, '', 'JL356A Aruba 2540-24G PoE+ 4SFP+ Switch', null, null, dt + 'jl356a 2540 24g poeplus 4sfpplus switch'),
            this.createVertexTemplateEntry(s + 'jl357a_aruba_2540_48g_poeplus_4sfpplus_switch;', 142, 15, '', 'JL357A Aruba 2540-48G PoE+ 4SFP+ Switch', null, null, dt + 'jl357a 2540 48g poeplus 4sfpplus switch'),
            this.createVertexTemplateEntry(s + 'jl363a_32p_sfpplus_adv;', 14, 107, '', 'JL363A-32P SFP+ Adv', null, null, dt + 'jl363a 32p sfpplus adv'),
            this.createVertexTemplateEntry(s + 'jl365a_8p_qsfpplus_adv;', 14, 107, '', 'JL365A-8P QSFP+ Adv', null, null, dt + 'jl365a 8p qsfpplus adv'),
            this.createVertexTemplateEntry(s + 'jl366a_6p_qsfp28_adv;', 14, 107, '', 'JL366A-6P QSFP28 Adv', null, null, dt + 'jl366a 6p qsfpP28 adv'),
            this.createVertexTemplateEntry(s + 'jl368a_aruba_8400_mgmt_mod;', 14, 122, '', 'JL368A Aruba 8400 Mgmt Mod', null, null, dt + 'jl368a 8400 mgmt management mod'),
            this.createVertexTemplateEntry(s + 'jl369a_aruba_8400_x731_fan_tray;', 142, 27, '', 'JL369A Aruba 8400 X731 Fan tray', null, null, dt + 'jl369a 8400 x731 Fan tray'),
            this.createVertexTemplateEntry(s + 'jl370a_aruba_8400_fan_for_x731_fan_tray;', 20, 23, '', 'JL370A Aruba 8400 Fan for X731 Fan tray', null, null, dt + 'jl370a 8400 fan for x731 fan tray'),
            this.createVertexTemplateEntry(s + 'jl371a_aruba8400_fan_tray_and_6_fans_bundle;', 142, 27, '', 'JL371A Aruba 8400 Fan tray and 6 fans bundle', null, null, dt + 'jl371a 8400 fan tray and fans bundle'),
            this.createVertexTemplateEntry(s + 'jl375a_aruba_8400_front;', 142, 112, '', 'JL375A Aruba 8400 (front)', null, null, dt + 'jl375a 8400 front'),
            this.createVertexTemplateEntry(s + 'jl375a_aruba_8400_rear;', 142, 112, '', 'JL375A Aruba 8400 (rear)', null, null, dt + 'jl375a 8400 rear'),
            this.createVertexTemplateEntry(s + 'jl375a_aruba_8400_rear_empty;', 142, 112, '', 'JL375A Aruba 8400 (rear, empty)', null, null, dt + 'jl375a 8400 rear empty'),
            this.createVertexTemplateEntry(s + 'jl376a_aruba_8400_front;', 142, 112, '', 'JL376A Aruba 8400 (front)', null, null, dt + 'jl376a 8400 front'),
            this.createVertexTemplateEntry(s + 'jl376a_aruba_8400_rear;', 142, 112, '', 'JL376A Aruba 8400 (rear)', null, null, dt + 'jl376a 8400 rear'),
            this.createVertexTemplateEntry(s + 'jl376a_aruba_8400_rear_empty;', 142, 112, '', 'JL376A Aruba 8400 (rear, empty)', null, null, dt + 'jl376a 8400 rear empty'),
            this.createVertexTemplateEntry(s + 'jl479a_aruba_8320_48p_10g_sfp_sfpplus_and_6p_40g_qsfpplus_5_fan_2_ps_switch_bundle;', 142, 15, '', 'JL479A Aruba 8320-48p 10G SFP SFP+ and 6p 40G QSFP+ 5 fan 2 PS Switch Bundle', null, null, dt + 'jl479a 8320 48p 10g sfp sfpplus and 6p 40g qsfpplus fan ps switch bundle'),
            this.createVertexTemplateEntry(s + 'jl479a_aruba_8320_48p_10g_sfp_sfpplus_and_6p_40g_qsfpplus_5_fan_2_ps_switch_bundle_rear;', 142, 15, '', 'JL479A Aruba 8320 48p 10G SFP SFP+ and 6p 40G QSFP+ 5 fan 2 PS Switch Bundle (rear)', null, null, dt + 'jl479a 8320 48p 10g sfp sfpplus and 6p 40g qsfpplus fan ps switch bundle rear'),
            this.createVertexTemplateEntry(s + 'jl557a_aruba_2930f_48g_poeplus_4sfp_740w_switch;', 142, 15, '', 'JL557A Aruba 2930F-48G PoE+ 4SFP 740W Switch', null, null, dt + 'jl557a 2930f 48g poeplus 4sfp 740w switch'),
            this.createVertexTemplateEntry(s + 'jl557a_aruba_2930f_48g_poeplus_4sfp_740w_switch_rear;', 142, 15, '', 'JL557A Aruba 2930F-48G PoE+ 4SFP 740W Switch (rear)', null, null, dt + 'jl557a 2930f 48g poeplus 4sfp 740w switch rear'),
            this.createVertexTemplateEntry(s + 'jl558a_aruba_2930f_48g_poeplus_4sfpplus_740w_switch;', 142, 15, '', 'JL558A Aruba 2930F-48G PoE+ 4SFP+ 740W Switch', null, null, dt + 'jl558a 2930f 48g poeplus 4sfpplus 740w switch'),
            this.createVertexTemplateEntry(s + 'jl558a_aruba_2930f_48g_poeplus_4sfpplus_740w_switch_rear;', 142, 15, '', 'JL558A Aruba 2930F-48G PoE+ 4SFP+ 740W Switch (rear)', null, null, dt + 'jl558a 2930f 48g poeplus 4sfpplus 740w switch rear'),
            this.createVertexTemplateEntry(s + 'jl559a_aruba_2930f_48g_poeplus_4sfpplus_740w_taa_switch;', 142, 15, '', 'JL559A Aruba 2930F-48G PoE+ 4SFP+ 740W TAA switch', null, null, dt + 'jl559a 2930f 48g poeplus 4sfpplus 740w taa switch'),
            this.createVertexTemplateEntry(s + 'jl559a_aruba_2930f_48g_poeplus_4sfpplus_740w_taa_switch_rear;', 142, 15, '', 'JL559A Aruba 2930F-48G PoE+ 4SFP+ 740W TAA switch (rear)', null, null, dt + 'jl559a 2930f 48g poeplus 4sfpplus 740w taa switch rear'),
            this.createVertexTemplateEntry(s + 'jl579a_aruba_8320_32p_40g_qsfpplus_5_fans_2_ps_switch_bundle;', 142, 15, '', 'JL579A Aruba 8320-32p-40G QSFP+ 5 fans 2 PS Switch Bundle', null, null, dt + 'jl579a 8320 32p 40g qsfpplus fans ps switch bundle'),
            this.createVertexTemplateEntry(s + 'jl579a_aruba_8320_32p_40g_qsfpplus_5_fans_2_ps_switch_bundle_rear;', 142, 15, '', 'JL579A Aruba 8320-32p-40G QSFP+ 5 fans 2 PS Switch Bundle (rear)', null, null, dt + 'jl579a 8320 32p 40g qsfpplus fans ps switch bundle rear'),
            this.createVertexTemplateEntry(s + 'jl581a_aruba_8320_48p_1g_10gbase_t_and_6p_40g_qsfpplus_5_fans_2_ps_switch_bundle;', 142, 15, '', 'JL581A Aruba 8320-48p-1G 10GBASE-T and 6p 40G QSFP+ 5 fans 2 PS Switch Bundle', null, null, dt + 'jl581a 8320 48p 1g 10gbase and 6p 40g qsfpplus fans ps switch bundle'),
            this.createVertexTemplateEntry(s + 'jl581a_aruba_8320_48p_1g_10gbase_t_and_6p_40g_qsfpplus_5_fans_2_ps_switch_bundle_rear;', 142, 15, '', 'JL581A Aruba 8320-48p-1G 10GBASE-T and 6p 40G QSFP+ 5 fans 2 PS Switch Bundle (rear)', null, null, dt + 'jl581a 8320 48p 1g 10gbase and 6p 40g qsfpplus fans ps switch bundle rear'),
            this.createVertexTemplateEntry(s + 'jl624a_aruba_8325_32y8c_f2b_front;', 142, 15, '', 'JL624A Aruba 8325 32Y8C F2B (front)', null, null, dt + 'jl624a 8325 32y8c f2b front'),
            this.createVertexTemplateEntry(s + 'jl624a_aruba_8325_32y8c_f2b_rear;', 142, 15, '', 'JL624A Aruba 8325 32Y8C F2B (rear)', null, null, dt + 'jl624a 8325 32y8c f2b rear'),
            this.createVertexTemplateEntry(s + 'jl625a_aruba_8325_32y_8c_b2f_front;', 142, 15, '', 'JL625A Aruba 8325 32Y 8C B2F (front)', null, null, dt + 'jl625a 8325 32y 8c b2f front'),
            this.createVertexTemplateEntry(s + 'jl625a_aruba_8325_32y_8c_b2f_rear;', 142, 15, '', 'JL625A Aruba 8325 32Y 8C B2F (rear)', null, null, dt + 'jl625a 8325 32y 8c b2f rear'),
            this.createVertexTemplateEntry(s + 'jl626a_aruba_8325_32c_f2b_front;', 142, 15, '', 'JL626A Aruba 8325 32C F2B (front)', null, null, dt + 'jl626a 8325 32c f2b front'),
            this.createVertexTemplateEntry(s + 'jl626a_aruba_8325_32c_f2b_rear;', 142, 15, '', 'JL626A Aruba 8325 32C F2B (rear)', null, null, dt + 'jl626a 8325 32c f2b rear'),
            this.createVertexTemplateEntry(s + 'jl627a_aruba_8325_32c_b2f_front;', 142, 15, '', 'JL627A Aruba 8325 32C B2F (front)', null, null, dt + 'jl627a 8325 32c b2f front'),
            this.createVertexTemplateEntry(s + 'jl627a_aruba_8325_32c_b2f_rear;', 142, 15, '', 'JL627A Aruba 8325 32C B2F (rear)', null, null, dt + 'jl627a 8325 32c b2f rear'),
            this.createVertexTemplateEntry(s + 'jl658a_aruba_6300m_24_port_sfpplus_and_4_port_sfp56_switch;', 142, 15, '', 'JL658A Aruba 6300M 24-port SFP+ and 4 port SFP56 Switch', null, null, dt + 'jl658a 6300m 24 port sfpplus and port sfp56 switch'),
            this.createVertexTemplateEntry(s + 'jl658a_aruba_6300m_24_port_sfpplus_and_4_port_sfp56_switch_rear;', 142, 15, '', 'JL658A Aruba 6300M 24-port SFP+ and 4 port SFP56 Switch (rear)', null, null, dt + 'jl658a 6300m 24 port sfpplus and port sfp56 switch rear'),
            this.createVertexTemplateEntry(s + 'jl659a_aruba_6300m_48_port_hpe_smart_rate_1_2_5_5gbe_class_6_poe_and_4_port_switch;', 142, 15, '', 'JL659A Aruba 6300M 48-port HPE Smart Rate 1/2.5/5GbE Class 6 PoE and 4-port Switch', null, null, dt + 'jl659a a6300m 48 port smart rate 5gbe class poe and port switch'),
            this.createVertexTemplateEntry(s + 'jl659a_aruba_6300m_48_port_hpe_smart_rate_1_2_5_5gbe_class_6_poe_and_4_port_switch_rear;', 142, 15, '', 'JL659A Aruba 6300M 48-port HPE Smart Rate 1/2.5/5GbE Class 6 PoE and 4-port Switch (rear)', null, null, dt + 'jl659a 6300m 48 port smart rate 5gbe class poe and port switch rear'),
            this.createVertexTemplateEntry(s + 'jl660a_aruba_6300m_24_port_hpe_smart_rate_1_2_5_5_gbe_class_6_poe_and_4_port_switch;', 142, 15, '', 'JL660A Aruba 6300M 24-port HPE Smart Rate 1/2.5/5 GbE Class 6 PoE and 4-port switch', null, null, dt + 'jl660a 6300m 24 port smart rate gbe class poe and port switch'),
            this.createVertexTemplateEntry(s + 'jl660a_aruba_6300m_24_port_hpe_smart_rate_1_2_5_5_gbe_class_6_poe_and_4_port_switch_rear;', 142, 15, '', 'JL660A Aruba 6300M 24-port HPE Smart Rate 1/2.5/5 GbE Class 6 PoE and 4-port switch (rear)', null, null, dt + 'jl660a 6300m 24 port smart rate 1 2 5 5 gbe class 6 poe and 4 port switch rear'),
            this.createVertexTemplateEntry(s + 'jl661a_aruba_6300m_48_port_1gbe_class_4_poe_and_4_port_sfp56_switch;', 142, 15, '', 'JL661A Aruba 6300M 48-port 1GbE Class 4 PoE and 4-port SFP56 Switch', null, null, dt + 'jl661a 6300m 48 port 1gbe class poe and port sfp56 switch'),
            this.createVertexTemplateEntry(s + 'jl661a_aruba_6300m_48_port_1gbe_class_4_poe_and_4_port_sfp56_switch_rear;', 142, 15, '', 'JL661A Aruba 6300M 48-port 1GbE Class 4 PoE and 4-port SFP56 Switch (rear)', null, null, dt + 'jl661a 6300m 48 port 1gbe class poe and port sfp56 switch rear'),
            this.createVertexTemplateEntry(s + 'jl662a_aruba_6300m_24_port_1gbe_class_4_poe_4_port_sfp56_switch;', 142, 15, '', 'JL662A Aruba 6300M 24-port 1GbE Class 4 PoE 4-port SFP56 Switch', null, null, dt + 'jlJL662a 6300m 24 port 1gbe class poe port sfp56 switch'),
            this.createVertexTemplateEntry(s + 'jl662a_aruba_6300m_24_port_1gbe_class_4_poe_4_port_sfp56_switch_rear;', 142, 15, '', 'JL662A Aruba 6300M 24-port 1GbE Class 4 PoE 4-port SFP56 Switch (rear)', null, null, dt + 'jl662a 6300m 24 port 1gbe class poe port sfp56 switch rear'),
            this.createVertexTemplateEntry(s + 'jl663a_aruba_6300m_48_port_1gbe_and_4_port_sfp56_switch;', 142, 15, '', 'JL663A Aruba 6300M 48-port 1GbE and 4-port SFP56 Switch', null, null, dt + 'jl663a 6300m 48 port 1gbe and port sfp56 switch'),
            this.createVertexTemplateEntry(s + 'jl663a_aruba_6300m_48_port_1gbe_and_4_port_sfp56_switch_rear;', 142, 15, '', 'JL663A Aruba 6300M 48-port 1GbE and 4-port SFP56 Switch (rear)', null, null, dt + 'jl663a 6300m 48 port 1gbe and port sfp56 switch rear'),
            this.createVertexTemplateEntry(s + 'jl664a_aruba_6300m_24_port_1gbe_and_4_port_sfp56_switch;', 142, 15, '', 'JL664A Aruba 6300M 24-port 1GbE and 4-port SFP56 Switch', null, null, dt + 'jl664a 6300m 24 port 1gbe and port sfp56 switch'),
            this.createVertexTemplateEntry(s + 'jl664a_aruba_6300m_24_port_1gbe_and_4_port_sfp56_switch_rear;', 142, 15, '', 'JL664A Aruba 6300M 24-port 1GbE and 4-port SFP56 Switch (rear)', null, null, dt + 'jl664a 6300m 24 port 1gbe and port sfp56 Switch rear'),
            this.createVertexTemplateEntry(s + 'jl665a_aruba_6300f_48_port_1gbe_class_4_poe_and_4_port_sfp56_switch;', 142, 15, '', 'JL665A Aruba 6300F 48-port 1GbE Class 4 PoE and 4-port SFP56 Switch', null, null, dt + 'jl665a 6300f 48 port 1gbe class poe and port sfp56 switch'),
            this.createVertexTemplateEntry(s + 'jl665a_aruba_6300f_48_port_1gbe_class_4_poe_and_4_port_sfp56_switch_rear;', 142, 15, '', 'JL665A Aruba 6300F 48-port 1GbE Class 4 PoE and 4-port SFP56 Switch (rear)', null, null, dt + 'jl665a 6300f 48 port 1gbe class poe and port sfp56 switch rear'),
            this.createVertexTemplateEntry(s + 'jl666a_aruba_6300f_24_port_1gbe_class_4_poe_and_4_port_sfp56_switch;', 142, 15, '', 'JL666A Aruba 6300F 24-port 1GbE Class 4 PoE and 4-port SFP56 Switch', null, null, dt + 'jl666a 6300f 24 port 1gbe class poe and port sfp56 switch'),
            this.createVertexTemplateEntry(s + 'jl666a_aruba_6300f_24_port_1gbe_class_4_poe_and_4_port_sfp56_switch_rear;', 142, 15, '', 'JL666A Aruba 6300F 24-port 1GbE Class 4 PoE and 4-port SFP56 Switch (rear)', null, null, dt + 'jl666a 6300f 24 port 1gbe class poe and port sfp56 switch rear'),
            this.createVertexTemplateEntry(s + 'jl667a_aruba_6300f_48_port_1gbe_and_4_port_sfp56_switch;', 142, 15, '', 'JL667A Aruba 6300F 48-port 1GbE and 4-port SFP56 Switch', null, null, dt + 'jl667a 6300f 48 port 1gbe and port sfp56 switch'),
            this.createVertexTemplateEntry(s + 'jl667a_aruba_6300f_48_port_1gbe_and_4_port_sfp56_switch_rear;', 142, 15, '', 'JL667A Aruba 6300F 48-port 1GbE and 4-port SFP56 Switch (rear)', null, null, dt + 'jl667a 6300f 48 port 1gbe and port sfp56 switch rear'),
            this.createVertexTemplateEntry(s + 'jl668a_aruba_6300f_24_port_1gbe_and_4_port_sfp56_rear;', 142, 15, '', 'JL668A aruba 6300F 24-port 1GbE and 4-port SFP56 (rear)', null, null, dt + 'jl668a 6300f 24 port 1gbe and port sfp56 rear'),
            this.createVertexTemplateEntry(s + 'jl668a_aruba_6300f_24_port_1gbe_and_4_port_sfp56_switch;', 142, 15, '', 'JL668A Aruba 6300F 24-port 1GbE and 4-port SFP56 Switch', null, null, dt + 'jl668a 6300f 24 port 1gbe and port sfp56 switch'),
            this.createVertexTemplateEntry(s + 'jl669_aruba_6300m_fan_module;', 41, 13, '', 'JL669 Aruba 6300M Fan Module', null, null, dt + 'jl669 6300m fan module'),
            this.createVertexTemplateEntry(s + 'jl670a_aruba_6300m_psu_module;', 27, 13, '', 'JL670A Aruba 6300M PSU Module', null, null, dt + 'jl670a 6300m psu module'),
            this.createVertexTemplateEntry(s + 'jl687a_aruba_8400x_32y_32p_1_10_25g_sfp_sfpplus_sfp28_module;', 14, 107, '', 'JL687A Aruba 8400X 32Y 32p 1/10/25G SFP SFP+ SFP28 Module', null, null, dt + 'jl687a 8400x 32y 32p 10 25g sfp sfpplus sfp28 module'),
            this.createVertexTemplateEntry(s + 'jl693a_aruba_12g_poeplus_2g_2sfpplus_switch;', 82, 15, '', 'JL693A Aruba 12G PoE+ 2G 2SFP+ Switch', null, null, dt + 'jl693a 12g poeplus 2G 2sfpplus switch'),
            this.createVertexTemplateEntry(s + 'jl693a_aruba_12g_poeplus_2g_2sfpplus_switch_rear;', 82, 15, '', 'JL693A Aruba 12G PoE+ 2G 2SFP+ Switch (rear)', null, null, dt + 'jl693a 12g poeplus 2g 2sfpplus switch rear'),
            this.createVertexTemplateEntry(s + 'jl724a_aruba_6200f_24_port_1gbe_and_4_port_sfpplus_switch;', 142, 15, '', 'JL724A Aruba 6200F 24-port 1GbE and 4-port SFP+ switch', null, null, dt + 'jl724a 6200f 24 port 1gbe and port sfpplus switch'),
            this.createVertexTemplateEntry(s + 'jl724a_aruba_6200f_24_port_1gbe_and_4_port_sfpplus_switch_rear;', 142, 15, '', 'JL724A Aruba 6200F 24-port 1GbE and 4-port SFP+ switch (rear)', null, null, dt + 'jl724a 6200f 24 port 1gbe and port sfpplus switch rear'),
            this.createVertexTemplateEntry(s + 'jl725a_aruba_6200f_24_port_1gbe_class_4_poe_and_4_port_sfpplus_370w_switch;', 142, 15, '', 'JL725A Aruba 6200F 24-port 1GbE Class 4 PoE and 4-port SFP+ 370W Switch', null, null, dt + 'jl725a 6200f 24 port 1gbe class poe and port sfpplus 370w switch'),
            this.createVertexTemplateEntry(s + 'jl725a_aruba_6200f_24_port_1gbe_class_4_poe_and_4_port_sfpplus_370w_switch_rear;', 142, 15, '', 'JL725A Aruba 6200F 24-port 1GbE Class 4 PoE and 4-port SFP+ 370W Switch (rear)', null, null, dt + 'jl725a 6200f 24 port 1gbe class poe and port sfpplus 370w switch rear'),
            this.createVertexTemplateEntry(s + 'jl726a_aruba_6200f_48_port_1gbe_and_4_port_sfpplus_switch;', 142, 15, '', 'JL726A Aruba 6200F 48-port 1GbE and 4-port SFP+ Switch', null, null, dt + 'jl726a 6200f 48 port 1gbe and port sfpplus switch'),
            this.createVertexTemplateEntry(s + 'jl726a_aruba_6200f_48_port_1gbe_and_4_port_sfpplus_switch_rear;', 142, 15, '', 'JL726A Aruba 6200F 48-port 1GbE and 4-port SFP+ Switch (rear)', null, null, dt + 'jl726a 6200f 48 port 1gbe and port sfpplus switch rear'),
            this.createVertexTemplateEntry(s + 'jl727a_aruba_6200f_48_port_1gbe_class_4_poe_and_4_port_sfpplus_370w_switch;', 142, 15, '', 'JL727A Aruba 6200F 48-port 1GbE Class 4 PoE and 4-port SFP+ 370W Switch', null, null, dt + 'jl727a 6200f 48 port 1gbe class poe and port sfpplus 370w switch'),
            this.createVertexTemplateEntry(s + 'jl727a_aruba_6200f_48_port_1gbe_class_4_poe_and_4_port_sfpplus_370w_switch_rear;', 142, 15, '', 'JL727A Aruba 6200F 48-port 1GbE Class 4 PoE and 4-port SFP+ 370W Switch (rear)', null, null, dt + 'jl727a 6200f 48 port 1gbe class poe and port sfpplus 370w switch rear'),
            this.createVertexTemplateEntry(s + 'jl728a_aruba_6200f_48_port_1gbe_class_4_poe_and_4_port_sfpplus_740w_switch;', 142, 15, '', 'JL728A Aruba 6200F 48-port 1GbE Class 4 PoE and 4-port SFP+ 740W Switch', null, null, dt + 'jl728a 6200f 48 port 1gbe class poe and port sfpplus 740w switch'),
            this.createVertexTemplateEntry(s + 'jl728a_aruba_6200f_48_port_1gbe_class_4_poe_and_4_port_sfpplus_740w_switch_rear;', 142, 15, '', 'JL728A Aruba 6200F 48-port 1GbE Class 4 PoE and 4-port SFP+ 740W Switch (rear)', null, null, dt + 'jl728a 6200f 48 port 1gbe class poe and port sfpplus 740w switch rear'),
            this.createVertexTemplateEntry(s + 'jl9826a_5412r_92g_poeplus_4sfp_zl2_switch;', 142, 98, '', 'JL9826A 5412R 92G PoE+ 4SFP zl2 Switch', null, null, dt + 'jl9826a 5412r 92g poeplus 4sfp zl2 switch'),
            this.createVertexTemplateEntry(s + 'lc_sfp;', 17, 6, '', 'LC SFP', null, null, dt + 'lc sfp'),
            this.createVertexTemplateEntry(s + 'r0x26a_aruba_cx_6400_switch;', 142, 98, '', 'R0X26A Aruba CX 6400 Switch', null, null, dt + 'r0X26a cx 6400 switch'),
            this.createVertexTemplateEntry(s + 'r0x26a_aruba_cx_6405_switch_rear;', 142, 98, '', 'R0X26A Aruba CX 6405 Switch (rear)', null, null, dt + 'r0X26a cx 6405 switch rear'),
            this.createVertexTemplateEntry(s + 'r0x27a_aruba_cx_6410_switch;', 142, 169, '', 'R0X27A Aruba CX 6410 Switch', null, null, dt + 'r0X27a cx 6410 switch'),
            this.createVertexTemplateEntry(s + 'r0x27a_aruba_cx_6410_switch_rear;', 142, 169, '', 'R0X27A Aruba CX 6410 Switch (rear)', null, null, dt + 'r0X27a cx 6410 switch rear'),
            this.createVertexTemplateEntry(s + 'r0x31a_aruba_6400_management_module;', 142, 15, '', 'R0X31A Aruba 6400 Management Module', null, null, dt + 'r0X31a 6400 management module'),
            this.createVertexTemplateEntry(s + 'r0x35a_aruba_6400_1800w_ps_w_c16;', 41, 20, '', 'R0X35A Aruba 6400 1800W PS w/C16', null, null, dt + 'r0x35a 6400 1800w ps c16'),
            this.createVertexTemplateEntry(s + 'r0x36a_aruba_6400_3000w_ps_w_c20;', 41, 20, '', 'R0X36A Aruba 6400 3000W PS w/C20', null, null, dt + 'r0x36a 6400 3000w ps c20'),
            this.createVertexTemplateEntry(s + 'r0x38a_aruba_6400_48p_1gbe_cls4_poe_module;', 142, 15, '', 'R0X38A Aruba 6400-48p 1GbE CLS4 PoE Module', null, null, dt + 'r0x38a 6400 48p 1gbe cls4 poe module'),
            this.createVertexTemplateEntry(s + 'r0x39a_aruba_6400_48p_1gbe_cls4_poe_4sfp56_module;', 142, 15, '', 'R0X39A Aruba 6400-48p 1GbE CLS4 PoE 4SFP56 Module', null, null, dt + 'r0x39a 6400 48p 1gbe cls4 poe 4sfp56 module'),
            this.createVertexTemplateEntry(s + 'r0x40a_aruba_6400_48p_1gbe_cls6_poe_4sfp56_module;', 142, 15, '', 'R0X40A Aruba 6400-48p 1GbE CLS6 PoE 4SFP56 Module', null, null, dt + 'r0x40a 6400 48p 1gbe cls6 poe 4sfp56 module'),
            this.createVertexTemplateEntry(s + 'r0x41a_aruba_6400_48p_smart_rate_cls6_poe_4sfp56_module;', 142, 15, '', 'R0X41A Aruba 6400-48p Smart Rate CSL6 PoE 4SFP56 Module', null, null, dt + 'r0x41a 6400 48p smart rate csl6 poe 4sfp56 module'),
            this.createVertexTemplateEntry(s + 'r0x42a_aruba_6400_24p_10gt_4sfp56_module;', 142, 15, '', 'R0X42A Aruba 6400-24p 10GT 4SFP56 Module', null, null, dt + 'r0x42a 6400 24p 10gt 4sfp56 module'),
            this.createVertexTemplateEntry(s + 'r0x43a_aruba_6400_24p_sfp_4sfp56_module;', 142, 15, '', 'R0X43A Aruba 6400-24p SFP 4SFP56 Module', null, null, dt + 'r0x43a 6400 24p sfp 4sfp56 module'),
            this.createVertexTemplateEntry(s + 'r0x44_aruba_6400_48p_10g_25g_sfp28_module;', 142, 15, '', 'R0X44 Aruba 6400-48p 10G/25G SFP28 Module', null, null, dt + 'r0x44 6400 48p 10g 25g sfp28 module'),
            this.createVertexTemplateEntry(s + 'r0x45a_aruba_6400_12p_40g_100g_qsfp28_module;', 142, 15, '', 'R0X45A Aruba 6400-12p 40G/100G QSFP28 Module', null, null, dt + 'r0x45a 6400 12p 40g 100g qsfp28 module'),
            this.createVertexTemplateEntry(s + 'rj45_sfp;', 8, 6, '', 'rj45 SFP', null, null, dt + 'rj45 sfp'),
            this.createVertexTemplateEntry(s + 'rj45_sfp_alt;', 5, 4, '', 'rj45 SFP alt', null, null, dt + 'rj45 sfp alt alternative'),
            this.createVertexTemplateEntry(s + 'rom67a_aruba_2930m_48p_poe_class_6_switch;', 142, 15, '', 'ROM67A Aruba 2930M-48p PoE class 6 switch', null, null, dt + 'rom67a 2930m 48p poe class switch'),
            this.createVertexTemplateEntry(s + 'rom67a_aruba_2930m_poe_class_6_switch_rear;', 142, 15, '', 'ROM67A Aruba 2930M PoE class 6 switch (rear)', null, null, dt + 'rom67a 2930m poe class switch rear'),
            this.createVertexTemplateEntry(s + 'rom68a_aruba_2930m_24p_poe_class_6_switch;', 142, 15, '', 'ROM68A Aruba 2930M-24p PoE class 6 switch', null, null, dt + 'rom68a 2930m 24p poe class switch'),
            this.createVertexTemplateEntry(s + 'rom68a_aruba_2930m_24p_poe_class_6_switch_rear;', 142, 15, '', 'ROM68A Aruba 2930M-24p PoE class 6 switch (rear)', null, null, dt + 'rom68a 2930m 24p poe class switch rear')
        ]);
    };
    	
})();
