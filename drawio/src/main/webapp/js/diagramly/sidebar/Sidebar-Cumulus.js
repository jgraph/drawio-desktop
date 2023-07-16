(function()
{
	Sidebar.prototype.addCumulusPalette = function()
	{
		var sc = 2;
		var dt = 'cumulus';
		var sb = this;
		var s = 'image;aspect=fixed;perimeter=ellipsePerimeter;html=1;align=center;fontSize=12;verticalAlign=top;fontColor=#364149;shadow=0;dashed=0;image=img/lib/cumulus/';
		this.setCurrentSearchEntryLibrary('cumulus');

		// Adds Cumulus shapes
		var gn = ' ';
		
		var fns = [
			 this.createVertexTemplateEntry(s + 'switch_bare_metal_empty.svg;',
					 sc * 48, sc * 12, '', 'Switch - Bare Metal (empty)', false, null, this.getTagsForStencil(gn, 'switch bare metal empty', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'switch_cumulus_linux.svg;',
					 sc * 48, sc * 12, '', 'Switch - Cumulus Linux', false, null, this.getTagsForStencil(gn, 'switch cumulus linux', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'switch_out_of_band.svg;',
					 sc * 48, sc * 12, '', 'Switch - Out of Band', false, null, this.getTagsForStencil(gn, 'switch_out_of_band', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'switch_voyager.svg;',
					 sc * 48, sc * 12, '', 'Switch Voyager', false, null, this.getTagsForStencil(gn, 'switch voyager', dt).join(' ')),
					 
			 this.createVertexTemplateEntry(s + 'cumulus_linux_icon.svg;',
					 sc * 48, sc * 48, '', 'Linux Icon', false, null, this.getTagsForStencil(gn, 'cumulus linux icon', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'cumulus_netq_icon.svg;',
					 sc * 48, sc * 48, '', 'NetQ Icon', false, null, this.getTagsForStencil(gn, '', dt).join(' ')),

			 this.createVertexTemplateEntry(s + 'rack_bare_metal.svg;',
					 sc * 48, sc * 57, '', 'Rack Bare Metal', false, null, this.getTagsForStencil(gn, 'rack bare metal', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'rack_cumulus_linux.svg;',
					 sc * 48, sc * 57, '', 'Rack Cumulus Linux', false, null, this.getTagsForStencil(gn, 'rack linux', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'rack_out_of_band.svg;',
					 sc * 48, sc * 57, '', 'Rack Out of Band', false, null, this.getTagsForStencil(gn, 'rack out of band', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'rack_voyager.svg;',
					 sc * 48, sc * 57, '', 'Rack Voyager', false, null, this.getTagsForStencil(gn, 'rack voyager', dt).join(' ')),
					 
			 this.createVertexTemplateEntry(s + 'server_bare_metal.svg;',
					 sc * 48, sc * 10, '', 'Server - Bare Metal', false, null, this.getTagsForStencil(gn, 'server bare metal', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'chassis_bare_metal_empty.svg;',
					 sc * 53, sc * 36, '', 'Chassis - Bare Metal Empty', false, null, this.getTagsForStencil(gn, 'chassis bare metal empty', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'chassis_cumulus_linux.svg;',
					 sc * 53, sc * 36, '', 'Chassis - Cumulus Linux', false, null, this.getTagsForStencil(gn, 'chassis linux', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'netq_chassis.svg;',
					 sc * 53, sc * 36, '', 'NetQ Chassis', false, null, this.getTagsForStencil(gn, 'netq chassis', dt).join(' ')),
					 
			 this.createEdgeTemplateEntry('endArrow=block;html=1;startArrow=block;startFill=1;endFill=1;', sc * 50, sc * 50, '', 'Unspecified', null, dt + 'unspecified'),
			 this.createEdgeTemplateEntry('endArrow=block;html=1;startArrow=block;startFill=1;endFill=1;strokeColor=#EB4770;', sc * 50, sc * 50, '', '1G', null, dt + '1g'),
			 this.createEdgeTemplateEntry('endArrow=block;html=1;startArrow=block;startFill=1;endFill=1;strokeColor=#FB9F41;', sc * 50, sc * 50, '', '10G', null, dt + '10g'),
			 this.createEdgeTemplateEntry('endArrow=block;html=1;startArrow=block;startFill=1;endFill=1;strokeColor=#FCC548;', sc * 50, sc * 50, '', '25G', null, dt + '25g'),
			 this.createEdgeTemplateEntry('endArrow=block;html=1;startArrow=block;startFill=1;endFill=1;strokeColor=#83CA73;', sc * 50, sc * 50, '', '40G', null, dt + '40g'),
			 this.createEdgeTemplateEntry('endArrow=block;html=1;startArrow=block;startFill=1;endFill=1;strokeColor=#2EAB6D;', sc * 50, sc * 50, '', '100G', null, dt + '100g'),
			 this.createEdgeTemplateEntry('endArrow=block;html=1;startArrow=block;startFill=1;endFill=1;strokeColor=#4EFDC0;', sc * 50, sc * 50, '', 'OOB / RMP', null, dt + 'oob rmp'),
			 
			 this.createEdgeTemplateEntry('endArrow=block;html=1;startArrow=block;startFill=1;endFill=1;strokeColor=#EB4770;dashed=1;dashPattern=5 5;', sc * 50, sc * 50, '', 'Virtual', null, dt + 'virtual'),
			 this.createEdgeTemplateEntry('endArrow=block;html=1;startArrow=block;startFill=1;endFill=1;strokeColor=#FB9F41;dashed=1;dashPattern=5 5;', sc * 50, sc * 50, '', 'Virtual', null, dt + 'virtual'),
			 this.createEdgeTemplateEntry('endArrow=block;html=1;startArrow=block;startFill=1;endFill=1;strokeColor=#FCC548;dashed=1;dashPattern=5 5;', sc * 50, sc * 50, '', 'Virtual', null, dt + 'virtual'),
			 this.createEdgeTemplateEntry('endArrow=block;html=1;startArrow=block;startFill=1;endFill=1;strokeColor=#83CA73;dashed=1;dashPattern=5 5;', sc * 50, sc * 50, '', 'Virtual', null, dt + 'virtual'),
			 this.createEdgeTemplateEntry('endArrow=block;html=1;startArrow=block;startFill=1;endFill=1;strokeColor=#2EAB6D;dashed=1;dashPattern=5 5;', sc * 50, sc * 50, '', 'Virtual', null, dt + 'virtual'),
			 this.createEdgeTemplateEntry('endArrow=block;html=1;startArrow=block;startFill=1;endFill=1;strokeColor=#4EFDC0;dashed=1;dashPattern=5 5;', sc * 50, sc * 50, '', 'Virtual', null, dt + 'virtual'),

			 this.createVertexTemplateEntry(s + 'netq_agent.svg;',
					 sc * 9, sc * 9, '', 'NetQ Agent', false, null, this.getTagsForStencil(gn, 'netq agent', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'netq_telemetry_server.svg;',
					 sc * 48, sc * 12, '', 'NetQ Telemetry Server', false, null, this.getTagsForStencil(gn, 'netq telemetry server', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'netq_server.svg;',
					 sc * 48, sc * 10, '', 'NetQ Server', false, null, this.getTagsForStencil(gn, 'netq server', dt).join(' ')),

			 this.createVertexTemplateEntry(
					 'image;aspect=fixed;perimeter=ellipsePerimeter;html=1;align=center;shadow=0;dashed=0;image=img/lib/cumulus/internet.svg;labelPosition=center;verticalLabelPosition=middle;verticalAlign=middle;fontSize=14;fontColor=#36424A;whiteSpace=wrap;',
					 sc * 137, sc * 49, 'Internet', 'Internet', true, null, this.getTagsForStencil(gn, 'internet', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'container.svg;',
					 sc * 45, sc * 40, '', 'Container', true, null, this.getTagsForStencil(gn, 'container', dt).join(' ')),
					 
  			 this.addEntry(dt + 'pbr switch', function()
		   	 {
			    var cell1 = new mxCell('swp51', new mxGeometry(0, 0, sc * 30, sc * 12), 'rounded=0;whiteSpace=wrap;html=1;fillColor=#FB9F41;strokeColor=none;fontColor=#FFFFFF;whiteSpace=wrap;');
			    cell1.vertex = true;
			    var cell2 = new mxCell('PBR', new mxGeometry(sc * 30, 0, sc * 30, sc * 12), 'text;verticalAlign=middle;align=center;fontColor=#FB9F41;fontStyle=1;html=1;whiteSpace=wrap;');
			    cell2.vertex = true;
			    
			   	return sb.createVertexTemplateFromCells([cell1, cell2], sc * 60, sc * 12, 'Package Diagram');
		   	 }),				

			 this.createVertexTemplateEntry(s + 'ddos_server.svg;',
					 sc * 48, sc * 10, '192.168.0.32', 'DDos Server', true, null, this.getTagsForStencil(gn, 'ddos server', dt).join(' ')),
			 this.createVertexTemplateEntry(s + 'switch.svg;',
					 sc * 48, sc * 10, '', 'Switch', true, null, this.getTagsForStencil(gn, 'switch', dt).join(' ')),

			 this.createVertexTemplateEntry(s + 'limed_spruce.svg;',
					 sc * 150, sc * 34, '', 'Limed Spruce', false, null, this.getTagsForStencil(gn, 'limed spruce', dt).join(' ')),
					 
			 this.createVertexTemplateEntry('fillColor=#36424A;strokeColor=none;whiteSpace=wrap;html=1;',
					 sc * 25, sc * 25, '', 'Limited Spruce', true, null, this.getTagsForStencil(gn, 'color limited spruce', dt).join(' ')),
			 this.createVertexTemplateEntry('fillColor=#515D68;strokeColor=none;whiteSpace=wrap;html=1;',
					 sc * 25, sc * 25, '', 'Nevada', true, null, this.getTagsForStencil(gn, 'color nevada', dt).join(' ')),
			 this.createVertexTemplateEntry('fillColor=#6E7B86;strokeColor=none;whiteSpace=wrap;html=1;',
					 sc * 25, sc * 25, '', 'Rolling Stone', true, null, this.getTagsForStencil(gn, 'color rolling stone', dt).join(' ')),
			 this.createVertexTemplateEntry('fillColor=#8C9AA6;strokeColor=none;whiteSpace=wrap;html=1;',
					 sc * 25, sc * 25, '', 'Gray Chateau', true, null, this.getTagsForStencil(gn, 'color gray chateau', dt).join(' ')),
			 this.createVertexTemplateEntry('fillColor=#AEB8C3;strokeColor=none;whiteSpace=wrap;html=1;',
					 sc * 25, sc * 25, '', 'Cadet Blue', true, null, this.getTagsForStencil(gn, 'color cadet blue', dt).join(' ')),
			 this.createVertexTemplateEntry('fillColor=#D2D6DF;strokeColor=none;whiteSpace=wrap;html=1;',
					 sc * 25, sc * 25, '', 'Heather', true, null, this.getTagsForStencil(gn, 'color heather', dt).join(' ')),
			 this.createVertexTemplateEntry('fillColor=#EAEDF2;strokeColor=none;whiteSpace=wrap;html=1;',
					 sc * 25, sc * 25, '', 'Athens Gray', true, null, this.getTagsForStencil(gn, 'color athens gray', dt).join(' ')),
			 this.createVertexTemplateEntry('fillColor=#7CCC6C;strokeColor=none;whiteSpace=wrap;html=1;',
					 sc * 25, sc * 25, '', 'Mantis', true, null, this.getTagsForStencil(gn, 'color mantis', dt).join(' ')),
			 this.createVertexTemplateEntry('fillColor=#4BC05B;strokeColor=none;whiteSpace=wrap;html=1;',
					 sc * 25, sc * 25, '', 'Fern', true, null, this.getTagsForStencil(gn, 'color fern', dt).join(' ')),
			 this.createVertexTemplateEntry('fillColor=#00AD69;strokeColor=none;whiteSpace=wrap;html=1;',
					 sc * 25, sc * 25, '', 'Jade', true, null, this.getTagsForStencil(gn, 'color jade', dt).join(' ')),
			 this.createVertexTemplateEntry('fillColor=#009271;strokeColor=none;whiteSpace=wrap;html=1;',
					 sc * 25, sc * 25, '', 'Observatory', true, null, this.getTagsForStencil(gn, 'color observatory', dt).join(' ')),
			 this.createVertexTemplateEntry('fillColor=#FFC82E;strokeColor=none;whiteSpace=wrap;html=1;',
					 sc * 25, sc * 25, '', 'Energy Jellow', true, null, this.getTagsForStencil(gn, 'color energy jellow', dt).join(' ')),
			 this.createVertexTemplateEntry('fillColor=#FFA12D;strokeColor=none;whiteSpace=wrap;html=1;',
					 sc * 25, sc * 25, '', 'Neon Carrot', true, null, this.getTagsForStencil(gn, 'color neon carrot', dt).join(' ')),
			 this.createVertexTemplateEntry('fillColor=#F1446F;strokeColor=none;whiteSpace=wrap;html=1;',
					 sc * 25, sc * 25, '', 'Radical Red', true, null, this.getTagsForStencil(gn, 'color radical red', dt).join(' ')),
			 this.createVertexTemplateEntry('fillColor=#83389B;strokeColor=none;whiteSpace=wrap;html=1;',
					 sc * 25, sc * 25, '', 'Rarity', true, null, this.getTagsForStencil(gn, 'color rarity', dt).join(' ')),
			 this.createVertexTemplateEntry('fillColor=#1EB5BD;strokeColor=none;whiteSpace=wrap;html=1;',
					 sc * 25, sc * 25, '', 'Seagull', true, null, this.getTagsForStencil(gn, 'color seagull', dt).join(' ')),
			 this.createVertexTemplateEntry('fillColor=#78CDD1;strokeColor=none;whiteSpace=wrap;html=1;',
					 sc * 25, sc * 25, '', 'Half Baked', true, null, this.getTagsForStencil(gn, 'color half baked', dt).join(' '))
		];
			   	
   		this.addPalette('cumulus', 'Cumulus', false, mxUtils.bind(this, function(content)
	    {
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
   		
		this.setCurrentSearchEntryLibrary();
	};
})();
