(function()
{
	// Adds P&ID shapes
	Sidebar.prototype.addPidPalette = function(pids, dir)
	{
		this.setCurrentSearchEntryLibrary('pid', 'pidInstruments');
		this.addPidInstrumentsPalette();
		this.setCurrentSearchEntryLibrary('pid', 'pidMisc');
		this.addPidMiscPalette();
		this.setCurrentSearchEntryLibrary('pid', 'pidValves');
		this.addPidValvesPalette();
		this.setCurrentSearchEntryLibrary('pid', 'pidCompressors');
		this.addPidCompressorsPalette();
		this.setCurrentSearchEntryLibrary('pid', 'pidEngines');
		this.addPidEnginesPalette();
		this.setCurrentSearchEntryLibrary('pid', 'pidFilters');
		this.addPidFiltersPalette();
		this.setCurrentSearchEntryLibrary('pid', 'pidFlow Sensors');
		this.addPidFlowSensorsPalette();
		this.setCurrentSearchEntryLibrary('pid', 'pidPiping');
		this.addPidPipingPalette();
		this.setCurrentSearchEntryLibrary('pid', 'pidCrushers Grinding');
		this.addPidCrushersGrindingPalette();
		this.setCurrentSearchEntryLibrary('pid', 'pidFittings');
		this.addPidFittingsPalette();
		this.setCurrentSearchEntryLibrary('pid', 'pidFittings');
		this.addPidSeparatorsPalette();
			
		var pidLibs = ['Instruments', 'Misc', 'Valves', 'Compressors', 'Engines', 'Filters', 'Flow Sensors', 'Piping', 'Crushers Grinding', 'Fittings', 'Separators'];
		
		for (var i = 0; i < pids.length; i++)
		{
			if (mxUtils.indexOf(pidLibs, pids[i]) < 0)
			{
				this.setCurrentSearchEntryLibrary('pid', 'pid' + pids[i]);
				this.addStencilPalette('pid' + pids[i], 'Proc. Eng. / ' + pids[i],
					dir + '/pid/' + pids[i].toLowerCase().replace(' ', '_') + '.xml',
					';html=1;pointerEvents=1;align=center;' + mxConstants.STYLE_VERTICAL_LABEL_POSITION + '=bottom;' + mxConstants.STYLE_VERTICAL_ALIGN + '=top;dashed=0;',	
					null, null, null, null, null, 'pid');
			}
		}
		
		this.setCurrentSearchEntryLibrary();
	}
	
	Sidebar.prototype.addPidInstrumentsPalette = function()
	{
		var s = 'html=1;outlineConnect=0;align=center;dashed=0;aspect=fixed;' + mxConstants.STYLE_SHAPE + "=mxgraph.pid2";
		var s2 = 'html=1;outlineConnect=0;align=center;dashed=0;' + mxConstants.STYLE_SHAPE + "=mxgraph.pid2";
		var gn = 'mxgraph.pid2inst';
		var dt = 'pid process instrumentation engineering instrument engineering ';

		this.addPaletteFunctions('pidInstruments', 'Proc. Eng. / Instruments', false,
		[
			this.createVertexTemplateEntry(s + 'inst.discInst;mounting=room',
					50, 50, '<table cellpadding="4" cellspacing="0" border="0" style="font-size:1em;width:100%;height:100%;">' +
		    		'<tr><td>TI</td></tr><tr><td>##</td></table> ', 'Discrete Instrument (control room)', null, null, this.getTagsForStencil(gn, 'discInst', dt + 'discrete control room').join(' ')),
			this.createVertexTemplateEntry(s + 'inst.discInst;mounting=field',
					50, 50, '<table cellpadding="4" cellspacing="0" border="0" style="font-size:1em;width:100%;height:100%;">' +
		    		'<tr><td>TI</td></tr><tr><td>##</td></table> ', 'Discrete Instrument (field)', null, null, this.getTagsForStencil(gn, 'discInst', dt + 'discrete field').join(' ')),
			this.createVertexTemplateEntry(s + 'inst.discInst;mounting=inaccessible',
					50, 50, '<table cellpadding="4" cellspacing="0" border="0" style="font-size:1em;width:100%;height:100%;">' +
		    		'<tr><td>TI</td></tr><tr><td>##</td></table> ', 'Discrete Instrument (inaccessible)', null, null, this.getTagsForStencil(gn, 'discInst', dt + 'discrete inaccessible').join(' ')),
			this.createVertexTemplateEntry(s + 'inst.discInst;mounting=local',
					50, 50, '<table cellpadding="4" cellspacing="0" border="0" style="font-size:1em;width:100%;height:100%;">' +
		    		'<tr><td>TI</td></tr><tr><td>##</td></table> ', 'Discrete Instrument (local panel)', null, null, this.getTagsForStencil(gn, 'discInst', dt + 'discrete local panel').join(' ')),

			this.createVertexTemplateEntry(s + 'inst.sharedCont;mounting=room',
					50, 50, '<table cellpadding="4" cellspacing="0" border="0" style="font-size:1em;width:100%;height:100%;">' +
		    		'<tr><td>TI</td></tr><tr><td>##</td></table> ', 'Shared Control/Display in DCS (control room)', null, null, this.getTagsForStencil(gn, 'sharedCont', dt + 'shared control display room').join(' ')),
			this.createVertexTemplateEntry(s + 'inst.sharedCont;mounting=field',
					50, 50, '<table cellpadding="4" cellspacing="0" border="0" style="font-size:1em;width:100%;height:100%;">' +
		    		'<tr><td>TI</td></tr><tr><td>##</td></table> ', 'Shared Control/Display in DCS (field)', null, null, this.getTagsForStencil(gn, 'sharedCont', dt + 'shared control display dcs field').join(' ')),
			this.createVertexTemplateEntry(s + 'inst.sharedCont;mounting=inaccessible',
					50, 50, '<table cellpadding="4" cellspacing="0" border="0" style="font-size:1em;width:100%;height:100%;">' +
		    		'<tr><td>TI</td></tr><tr><td>##</td></table> ', 'Shared Control/Display in DCS (inaccessible)', null, null, this.getTagsForStencil(gn, 'sharedCont', dt + 'shared control display dcs inaccessible').join(' ')),
			this.createVertexTemplateEntry(s + 'inst.sharedCont;mounting=local',
					50, 50, '<table cellpadding="4" cellspacing="0" border="0" style="font-size:1em;width:100%;height:100%;">' +
		    		'<tr><td>TI</td></tr><tr><td>##</td></table> ', 'Shared Control/Display in DCS (local panel)', null, null, this.getTagsForStencil(gn, 'sharedCont', dt + 'shared control display dcs local panel').join(' ')),

			this.createVertexTemplateEntry(s + 'inst.compFunc;mounting=room',
					50, 50, '<table cellpadding="4" cellspacing="0" border="0" style="font-size:1em;width:100%;height:100%;">' +
		    		'<tr><td>TI</td></tr><tr><td>##</td></table> ', 'Computer Function (control room)', null, null, this.getTagsForStencil(gn, 'compFunc', dt + 'computer function control room').join(' ')),
			this.createVertexTemplateEntry(s + 'inst.compFunc;mounting=field',
					50, 50, '<table cellpadding="4" cellspacing="0" border="0" style="font-size:1em;width:100%;height:100%;">' +
		    		'<tr><td>TI</td></tr><tr><td>##</td></table> ', 'Computer Function (field)', null, null, this.getTagsForStencil(gn, 'compFunc', dt + 'computer function field').join(' ')),
			this.createVertexTemplateEntry(s + 'inst.compFunc;mounting=inaccessible',
					50, 50, '<table cellpadding="4" cellspacing="0" border="0" style="font-size:1em;width:100%;height:100%;">' +
		    		'<tr><td>TI</td></tr><tr><td>##</td></table> ', 'Computer Function (inaccessible)', null, null, this.getTagsForStencil(gn, 'compFunc', dt + 'computer function inaccessible').join(' ')),
			this.createVertexTemplateEntry(s + 'inst.compFunc;mounting=local',
					50, 50, '<table cellpadding="4" cellspacing="0" border="0" style="font-size:1em;width:100%;height:100%;">' +
		    		'<tr><td>TI</td></tr><tr><td>##</td></table> ', 'Computer Function (local panel)', null, null, this.getTagsForStencil(gn, 'compFunc', dt + 'computer function local panel').join(' ')),

			this.createVertexTemplateEntry(s + 'inst.progLogCont;mounting=room',
					50, 50, '<table cellpadding="4" cellspacing="0" border="0" style="font-size:1em;width:100%;height:100%;">' +
		    		'<tr><td>TI</td></tr><tr><td>##</td></table> ', 'Programmable Logic Control (control room)', null, null, this.getTagsForStencil(gn, 'progLogCont', dt + 'programmable logic control plc room').join(' ')),
			this.createVertexTemplateEntry(s + 'inst.progLogCont;mounting=field',
					50, 50, '<table cellpadding="4" cellspacing="0" border="0" style="font-size:1em;width:100%;height:100%;">' +
		    		'<tr><td>TI</td></tr><tr><td>##</td></table> ', 'Programmable Logic Control (field)', null, null, this.getTagsForStencil(gn, 'progLogCont', dt + 'programmable logic control plc field').join(' ')),
			this.createVertexTemplateEntry(s + 'inst.progLogCont;mounting=inaccessible',
					50, 50, '<table cellpadding="4" cellspacing="0" border="0" style="font-size:1em;width:100%;height:100%;">' +
		    		'<tr><td>TI</td></tr><tr><td>##</td></table> ', 'Programmable Logic Control (inaccessible)', null, null, this.getTagsForStencil(gn, 'progLogCont', dt + 'programmable logic control plc inaccessible').join(' ')),
			this.createVertexTemplateEntry(s + 'inst.progLogCont;mounting=local',
					50, 50, '<table cellpadding="4" cellspacing="0" border="0" style="font-size:1em;width:100%;height:width;">' +
		    		'<tr><td>TI</td></tr><tr><td>##</td></table> ', 'Programmable Logic Control (local panel)', null, null, this.getTagsForStencil(gn, 'progLogCont', dt + 'programmable logic control plc local panel').join(' ')),

			this.createVertexTemplateEntry(s + 'inst.logic;mounting=room',
					50, 50, '<table cellpadding="4" cellspacing="0" border="0" style="font-size:1em;width:100%;height:100%;">' +
		    		'<tr><td>TI</td></tr><tr><td>##</td></table> ', 'Logic (control room)', null, null, this.getTagsForStencil(gn, 'logic', dt + 'control room').join(' ')),
			this.createVertexTemplateEntry(s + 'inst.logic;mounting=field',
					50, 50, '<table cellpadding="4" cellspacing="0" border="0" style="font-size:1em;width:100%;height:100%;">' +
		    		'<tr><td>TI</td></tr><tr><td>##</td></table> ', 'Logic (field)', null, null, this.getTagsForStencil(gn, 'logic', dt + 'field').join(' ')),
			this.createVertexTemplateEntry(s + 'inst.logic;mounting=inaccessible',
					50, 50, '<table cellpadding="4" cellspacing="0" border="0" style="font-size:1em;width:100%;height:100%;">' +
		    		'<tr><td>TI</td></tr><tr><td>##</td></table> ', 'Logic (inaccessible)', null, null, this.getTagsForStencil(gn, 'logic', dt + 'inaccessible').join(' ')),
			this.createVertexTemplateEntry(s + 'inst.logic;mounting=local',
					50, 50, '<table cellpadding="4" cellspacing="0" border="0" style="font-size:1em;width:100%;height:100%;">' +
		    		'<tr><td>TI</td></tr><tr><td>##</td></table> ', 'Logic (local panel)', null, null, this.getTagsForStencil(gn, 'logic', dt + 'local panel').join(' ')),

			this.createVertexTemplateEntry(s2 + 'inst.indicator;mounting=room;overflow=fill;indType=inst', 50, 100,  
					'<table cellpadding="0" cellspacing="0" style="font-size:1em;width:100%;height:100%;"><tr><td align="center" height="25">TI</td></tr><tr><td align="center" height="25">##</td></tr><tr><td align="center" valign="bottom"></td></tr></table>', 
					'Indicator (Instrument)', null, null, this.getTagsForStencil(gn, 'indicator', dt + 'indicator').join(' ')),
			this.createVertexTemplateEntry(s2 + 'inst.indicator;mounting=room;overflow=fill;indType=ctrl', 50, 100,  
					'<table cellpadding="0" cellspacing="0" style="font-size:1em;width:100%;height:100%;"><tr><td align="center" height="25">TI</td></tr><tr><td align="center" height="25">##</td></tr><tr><td align="center" valign="bottom"></td></tr></table>', 
					'Indicator (Control)', null, null, this.getTagsForStencil(gn, 'indicator', dt + 'indicator control').join(' ')),
			this.createVertexTemplateEntry(s2 + 'inst.indicator;mounting=room;overflow=fill;indType=func', 50, 100,  
					'<table cellpadding="0" cellspacing="0" style="font-size:1em;width:100%;height:100%;"><tr><td align="center" height="25">TI</td></tr><tr><td align="center" height="25">##</td></tr><tr><td align="center" valign="bottom"></td></tr></table>', 
					'Indicator (Function)', null, null, this.getTagsForStencil(gn, 'indicator', dt + 'indicator function').join(' ')),
			this.createVertexTemplateEntry(s2 + 'inst.indicator;mounting=room;overflow=fill;indType=plc', 50, 100,  
					'<table cellpadding="0" cellspacing="0" style="font-size:1em;width:100%;height:100%;"><tr><td align="center" height="25">TI</td></tr><tr><td align="center" height="25">##</td></tr><tr><td align="center" valign="bottom"></td></tr></table>', 
					'Indicator (PLC)', null, null, this.getTagsForStencil(gn, 'indicator', dt + 'indicator plc programmable logic control').join(' '))
		]);
	};
	
	Sidebar.prototype.addPidValvesPalette = function()
	{
		var s = 'dashed=0;outlineConnect=0;html=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.pid2";
		var sv = mxConstants.STYLE_VERTICAL_LABEL_POSITION + '=bottom;align=center;html=1;' + mxConstants.STYLE_VERTICAL_ALIGN + '=top;pointerEvents=1;dashed=0;' + mxConstants.STYLE_SHAPE + "=mxgraph.pid2valves.valve;valveType=";
		var s = mxConstants.STYLE_VERTICAL_LABEL_POSITION + '=bottom;align=center;html=1;' + mxConstants.STYLE_VERTICAL_ALIGN + '=top;pointerEvents=1;dashed=0;' + mxConstants.STYLE_SHAPE + "=mxgraph.pid2valves.";
		var gn = 'mxgraph.pid2valves';
		var dt = 'pid process instrumentation engineering ';

		this.addPaletteFunctions('pidValves', 'Proc. Eng. / Valves', false,
		[
			this.createVertexTemplateEntry(sv + 'gate', 100, 60, '', 'Gate Valve', null, null, this.getTagsForStencil(gn, 'valve', dt + 'gate').join(' ')),
			this.createVertexTemplateEntry(sv + 'gate;defState=closed', 100, 60, '', 'Normally Closed Gate Valve', null, null, this.getTagsForStencil(gn, 'valve', dt + 'normally closed nc gate').join(' ')),
			this.createVertexTemplateEntry(sv + 'ball', 100, 60, '', 'Ball Valve', null, null, this.getTagsForStencil(gn, 'valve', dt + 'ball').join(' ')),
			this.createVertexTemplateEntry(sv + 'ball;defState=closed', 100, 60, '', 'Normally Closed Ball Valve', null, null, this.getTagsForStencil(gn, 'valve', dt + 'normally closed nc ball').join(' ')),
			this.createVertexTemplateEntry(sv + 'globe', 100, 60, '', 'Globe Valve', null, null, this.getTagsForStencil(gn, 'valve', dt + 'globe').join(' ')),
			this.createVertexTemplateEntry(sv + 'butterfly', 100, 60, '', 'Butterfly Valve', null, null, this.getTagsForStencil(gn, 'valve', dt + 'butterfly').join(' ')),
			this.createVertexTemplateEntry(sv + 'check;', 100, 60, '', 'Check Valve', null, null, this.getTagsForStencil(gn, 'valve', dt + 'check').join(' ')),
			this.createVertexTemplateEntry(sv + 'plug', 100, 60, '', 'Plug Valve', null, null, this.getTagsForStencil(gn, 'valve', dt + 'plug').join(' ')),
			this.createVertexTemplateEntry(sv + 'needle', 100, 60, '', 'Needle Valve', null, null, this.getTagsForStencil(gn, 'valve', dt + 'needle').join(' ')),
			this.createVertexTemplateEntry(sv + 'selfDrain', 100, 60, '', 'Self Draining Valve', null, null, this.getTagsForStencil(gn, 'valve', dt + 'self draining').join(' ')),
			this.createVertexTemplateEntry(sv + 'gate;actuator=man', 100, 100, '', 'Gate Valve (Manual)', null, null, this.getTagsForStencil(gn, 'valve', dt + 'gate manual').join(' ')),
			this.createVertexTemplateEntry(sv + 'gate;actuator=diaph', 100, 100, '', 'Gate Valve (Diaphragm)', null, null, this.getTagsForStencil(gn, 'valve', dt + 'gate diaphragm').join(' ')),
			this.createVertexTemplateEntry(sv + 'gate;actuator=balDiaph', 100, 100, '', 'Gate Valve (Balanced Diaphragm)', null, null, this.getTagsForStencil(gn, 'valve', dt + 'gate balanced diaphragm').join(' ')),
			
			this.addEntry(dt + 'valve gate powered', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 100, 100), sv + 'gate;actuator=powered');
				bg1.vertex = true;
				var item1 = new mxCell('', new mxGeometry(32.5, 0, 35, 35), 'part=1;strokeColor=none;fillColor=none;fontStyle=1;fontSize=14;');
				item1.vertex = true;
				bg1.insert(item1);
			    
			   	return sb.createVertexTemplateFromCells([bg1], 100, 100, 'Gate Valve (Powered)');
			}),

			this.createVertexTemplateEntry(sv + 'gate;actuator=digital', 100, 100, '', 'Gate Valve (Digital)', null, null, this.getTagsForStencil(gn, 'valve', dt + 'gate digital').join(' ')),
			this.createVertexTemplateEntry(sv + 'gate;actuator=elHyd', 100, 100, '', 'Gate Valve (Electro-Hydraulic)', null, null, this.getTagsForStencil(gn, 'valve', dt + 'gate electro hydraulic').join(' ')),
			this.createVertexTemplateEntry(sv + 'gate;actuator=key', 100, 100, '', 'Gate Valve (Key)', null, null, this.getTagsForStencil(gn, 'valve', dt + 'gate key').join(' ')),
			this.createVertexTemplateEntry(sv + 'gate;actuator=motor', 100, 100, '', 'Gate Valve (Motor)', null, null, this.getTagsForStencil(gn, 'valve', dt + 'gate motor').join(' ')),
			this.createVertexTemplateEntry(sv + 'gate;actuator=pilot', 100, 100, '', 'Gate Valve (Pilot)', null, null, this.getTagsForStencil(gn, 'valve', dt + 'gate pilot').join(' ')),
			this.createVertexTemplateEntry(sv + 'gate;actuator=solenoid', 100, 100, '', 'Gate Valve (Solenoid)', null, null, this.getTagsForStencil(gn, 'valve', dt + 'gate solenoid').join(' ')),
			this.createVertexTemplateEntry(sv + 'gate;actuator=solenoidManRes', 100, 100, '', 'Gate Valve (Solenoid With Manual Reset)', null, null, this.getTagsForStencil(gn, 'valve', dt + 'gate solenoid manual reset').join(' ')),
			this.createVertexTemplateEntry(sv + 'gate;actuator=spring', 100, 100, '', 'Gate Valve (Spring)', null, null, this.getTagsForStencil(gn, 'valve', dt + 'gate spring').join(' ')),
			this.createVertexTemplateEntry(sv + 'gate;actuator=weight', 100, 100, '', 'Gate Valve (Weight)', null, null, this.getTagsForStencil(gn, 'valve', dt + 'gate weight').join(' ')),
			this.createVertexTemplateEntry(sv + 'gate;actuator=singActing', 100, 100, '', 'Gate Valve (Single Acting Cylinder)', null, null, this.getTagsForStencil(gn, 'valve', dt + 'gate single acting cylinder').join(' ')),
			this.createVertexTemplateEntry(sv + 'gate;actuator=dblActing', 100, 100, '', 'Gate Valve (Double Acting Cylinder)', null, null, this.getTagsForStencil(gn, 'valve', dt + 'gate double acting cylinder').join(' ')),
			this.createVertexTemplateEntry(sv + 'gate;actuator=angBlow', 100, 100, '', 'Angle Blowdown Valve', null, null, this.getTagsForStencil(gn, 'valve', dt + 'angle blowdown').join(' ')),
			this.createVertexTemplateEntry(s + 'blockBleedValve;actuator=none', 100, 130, '', 'Integrated Block and Bleed Valve', null, null, this.getTagsForStencil(gn, 'blockBleedValve', dt + 'integrated block bleed').join(' ')),
			this.createVertexTemplateEntry(s + 'blockBleedValve;actuator=man', 100, 170, '', 'Integrated Block and Bleed Valve (Manual)', null, null, this.getTagsForStencil(gn, 'blockBleedValve', dt + 'integrated block bleed manual').join(' ')),
			this.createVertexTemplateEntry(sv + 'angle;actuator=none', 100, 80, '', 'Angle Valve', null, null, this.getTagsForStencil(gn, 'valve', dt + 'angle').join(' ')),
			this.createVertexTemplateEntry(sv + 'angle;actuator=man', 100, 120, '', 'Angle Valve (Manual)', null, null, this.getTagsForStencil(gn, 'valve', dt + 'angle manual').join(' ')),
			this.createVertexTemplateEntry(sv + 'angleGlobe;actuator=none', 100, 80, '', 'Angle Globe Valve', null, null, this.getTagsForStencil(gn, 'valve', dt + 'angle globe').join(' ')),
			this.createVertexTemplateEntry(sv + 'angleGlobe;actuator=man', 100, 120, '', 'Angle Globe Valve (Manual)', null, null, this.getTagsForStencil(gn, 'valve', dt + 'angle globe manual').join(' ')),
			this.createVertexTemplateEntry(sv + 'threeWay;actuator=none', 100, 80, '', '3 Way Valve', null, null, this.getTagsForStencil(gn, 'valve', dt + 'three way').join(' ')),
			this.createVertexTemplateEntry(sv + 'threeWay;actuator=man', 100, 120, '', '3 Way Valve (Manual)', null, null, this.getTagsForStencil(gn, 'valve', dt + 'three way manual').join(' ')),
			this.createVertexTemplateEntry(s + 'autoRecircValve', 100, 60, '', 'Auto Recirculation Valve', null, null, this.getTagsForStencil(gn, 'blockBleedValve', dt + 'auto recirculation').join(' '))
		]);
	};
	
	Sidebar.prototype.addPidCompressorsPalette = function()
	{
		var s = mxConstants.STYLE_VERTICAL_LABEL_POSITION + '=bottom;outlineConnect=0;align=center;dashed=0;html=1;' + mxConstants.STYLE_VERTICAL_ALIGN + '=top;' + mxConstants.STYLE_SHAPE + "=mxgraph.pid.compressors.";
		var gn = 'mxgraph.pid.compressors';
		var dt = 'pid process instrumentation engineering ';
		
		this.addPaletteFunctions('pidCompressors', 'Proc. Eng. / Compressors', false,
		[
			this.createVertexTemplateEntry(s + 'ac_air_compressor', 100, 65, '', 'AC Air Compressor', null, null, this.getTagsForStencil(gn, 'ac_air_compressor', dt + '').join(' ')),
			this.createVertexTemplateEntry(s + 'centrifugal_compressor', 70, 70, '', 'Centrifugal Compressor', null, null, this.getTagsForStencil(gn, 'centrifugal_compressor', dt + '').join(' ')),
			this.createVertexTemplateEntry(mxConstants.STYLE_SHAPE + '=mxgraph.pid.compressors.centrifugal_compressor_-_turbine_driven;dashed=0;fontSize=8;html=1;overflow=fill;', 100, 70, 
				    '<table cellpadding="0" cellspacing="0" style="width:100%;height:100%;">' +
					'<tr style="height:25%;">' +
					'<td></td>' +
					'</tr>' +
					'<tr style="height:75%;">' +
					'<td align="left" style="padding-left:11%;width:100%">T</td>' +
					'</tr>' +
					'</table>',
					'Centrifugal Compressor - Turbine Driven', null, null, this.getTagsForStencil(gn, 'centrifugal_compressor_-_turbine_driven', dt + '').join(' ')),
			this.createVertexTemplateEntry(s + 'compressor', 100, 100, '', 'Compressor', null, null, this.getTagsForStencil(gn, 'compressor', dt + '').join(' ')),
			this.createVertexTemplateEntry(s + 'compressor_and_silencers;pointerEvents=1', 90, 80, '', 'Compressor and Silencers', null, null, this.getTagsForStencil(gn, 'compressor_and_silencers', dt + 'silencer').join(' ')),
			this.createVertexTemplateEntry(s + 'liquid_ring_compressor', 90, 90, '', 'Liquid Ring Compressor', null, null, this.getTagsForStencil(gn, 'liquid_ring_compressor', dt + '').join(' ')),
			this.createVertexTemplateEntry(s + 'reciprocating_compressor', 100, 40, '', 'Reciprocating Compressor', null, null, this.getTagsForStencil(gn, 'reciprocating_compressor', dt + '').join(' ')),
			this.createVertexTemplateEntry(s + 'reciprocating_compressor_2', 50, 65, '', 'Reciprocating Compressor 2', null, null, this.getTagsForStencil(gn, 'reciprocating_compressor_2', dt + '').join(' ')),
			this.createVertexTemplateEntry(s + 'rotary_compressor', 42, 91, '', 'Rotary Compressor', null, null, this.getTagsForStencil(gn, 'rotary_compressor', dt + '').join(' '))
		]);
	};
			
	Sidebar.prototype.addPidEnginesPalette = function()
	{
		var s = "dashed=0;outlineConnect=0;align=center;html=1;" + mxConstants.STYLE_SHAPE + "=mxgraph.pid.engines.";
		var sb = mxConstants.STYLE_VERTICAL_LABEL_POSITION + '=bottom;align=center;dashed=0;html=1;' + mxConstants.STYLE_VERTICAL_ALIGN + '=top;' + mxConstants.STYLE_SHAPE + "=mxgraph.pid.engines.";
		var gn = 'mxgraph.pid.engines';
		var dt = 'pid process instrumentation engine motor ';
		
		this.addPaletteFunctions('pidEngines', 'Proc. Eng. / Engines', false,
		[
			this.createVertexTemplateEntry(s + 'electric_motor;fontSize=45;', 100, 100, 'M', 'Electric Motor', null, null, this.getTagsForStencil(gn, 'electric_motor', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'electric_motor_(ac);fontSize=45;', 100, 100, 'M', 'Electric Motor (AC)', null, null, this.getTagsForStencil(gn, 'electric_motor_(ac)', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'electric_motor_(dc);fontSize=45;', 100, 100, 'M', 'Electric Motor (DC)', null, null, this.getTagsForStencil(gn, 'electric_motor_(dc)', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'gear;fontSize=45;', 100, 100, 'G', 'Gear', null, null, this.getTagsForStencil(gn, 'gear', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'generator;fontSize=45;', 100, 100, 'G', 'Generator', null, null, this.getTagsForStencil(gn, 'generator', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'generator_(ac);fontSize=45;', 100, 100, 'G', 'Generator (AC)', null, null, this.getTagsForStencil(gn, 'generator_(ac)', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'generator_(dc);fontSize=45;', 100, 100, 'G', 'Generator (DC)', null, null, this.getTagsForStencil(gn, 'generator_(dc)', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'turbine', 70, 100, '', 'Turbine', null, null, this.getTagsForStencil(gn, 'turbine', dt).join(' '))
		]);
	};
			
	Sidebar.prototype.addPidFiltersPalette = function()
	{
		var s = "html=1;dashed=0;outlineConnect=0;align=center;" + mxConstants.STYLE_SHAPE + "=mxgraph.pid.filters.";
		var sb = mxConstants.STYLE_VERTICAL_LABEL_POSITION + '=bottom;align=center;dashed=0;html=1;' + mxConstants.STYLE_VERTICAL_ALIGN + '=top;' + mxConstants.STYLE_SHAPE + "=mxgraph.pid.filters.";
		var gn = 'mxgraph.pid.filters';
		var dt = 'pid process instrumentation filter ';
		
		this.addPaletteFunctions('pidFilters', 'Proc. Eng. / Filters', false,
		[
			this.createVertexTemplateEntry(sb + 'filter;', 
					50, 50, '', 'Filter', null, null, this.getTagsForStencil(gn, 'filter', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'gas_filter;', 
					50, 100, '', 'Gas Filter', null, null, this.getTagsForStencil(gn, 'gas_filter', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'gas_filter_(bag,_candle,_cartridge);', 
					50, 100, '', 'Gas Filter (Bag, Candle, Cartridge)', null, null, this.getTagsForStencil(gn, 'gas_filter_(bag,_candle,_cartridge)', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'gas_filter_(belt,_roll);', 
					50, 100, '', 'Gas Filter (Belt, Roll)', null, null, this.getTagsForStencil(gn, 'gas_filter_(belt,_roll)', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'gas_filter_(fixed_bed);', 
					50, 100, '', 'Gas Filter (Fixed Bed)', null, null, this.getTagsForStencil(gn, 'gas_filter_(fixed_bed)', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'gas_filter_(hepa);', 
					50, 100, 'HEPA', 'Gas Filter (HEPA)', null, null, this.getTagsForStencil(gn, 'gas_filter_(hepa)', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'liquid_filter;', 
					50, 100, '', 'Liquid Filter', null, null, this.getTagsForStencil(gn, 'liquid_filter', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'liquid_Filter_(bag,_candle,_cartridge);', 
					50, 100, '', 'Liquid Filter (Bag, Candle, Cartridge)', null, null, this.getTagsForStencil(gn, 'liquid_Filter_(bag,_candle,_cartridge)', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'liquid_filter_(belt,_roll);', 
					50, 100, '', 'Liquid Filter (Belt, Roll)', null, null, this.getTagsForStencil(gn, 'liquid_filter_(belt,_roll)', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'liquid_filter_(biological);', 
					50, 100, 'BIO', 'Liquid Filter (Biological)', null, null, this.getTagsForStencil(gn, 'liquid_filter_(biological)', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'liquid_filter_(fixed_bed);', 
					50, 100, '', 'Liquid Filter (Fixed Bed)', null, null, this.getTagsForStencil(gn, 'liquid_filter_(fixed_bed)', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'liquid_filter_(ion_exchanger);', 
					50, 100, 'ION', 'Liquid Filter (Ion Exchanger)', null, null, this.getTagsForStencil(gn, 'liquid_filter_(ion_exchanger)', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'liquid_filter_(rotary,_drum_or_disc);', 
					50, 100, '', 'Liquid Filter (Rotary, Drum or Disc)', null, null, this.getTagsForStencil(gn, 'liquid_filter_(rotary,_drum_or_disc)', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'liquid_filter_(rotary,_drum_or_disc,_scraper);', 
					55, 100, '', 'Liquid Filter (Rotary, Drum or Disc, Scraper)', null, null, this.getTagsForStencil(gn, 'liquid_filter_(rotary,_drum_or_disc,_scraper)', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'press_filter;', 
					100, 50, '', 'Press Filter', null, null, this.getTagsForStencil(gn, 'press_filter', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'suction_filter;', 
					50, 100, '', 'Suction Filter', null, null, this.getTagsForStencil(gn, 'suction_filter', dt).join(' '))
		]);
	};
			
	Sidebar.prototype.addPidFlowSensorsPalette = function()
	{
		var s = mxConstants.STYLE_VERTICAL_LABEL_POSITION + '=bottom;align=center;outlineConnect=0;dashed=0;html=1;' + mxConstants.STYLE_VERTICAL_ALIGN + '=top;' + mxConstants.STYLE_SHAPE + "=mxgraph.pid.flow_sensors.";
		var gn = 'mxgraph.pid.flow_sensors';
		var dt = 'process instrumentation sensor ';
		
		this.addPaletteFunctions('pidFlow Sensors', 'Proc. Eng. / Flow Sensors', false,
		[
			this.createVertexTemplateEntry(s + 'averging_pitot_tube;', 
					50, 50, '', 'Averging Pitot Tube', null, null, this.getTagsForStencil(gn, 'averging_pitot_tube', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'coriolis;', 
					50, 50, '', 'Coriolis', null, null, this.getTagsForStencil(gn, 'coriolis', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'flow_nozzle;', 
					50, 25, '', 'Flow Nozzle', null, null, this.getTagsForStencil(gn, 'flow_nozzle', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'flume;pointerEvents=1;', 
					50, 50, '', 'Flume', null, null, this.getTagsForStencil(gn, 'flume', dt).join(' ')),
			this.createVertexTemplateEntry(mxConstants.STYLE_SHAPE + '=mxgraph.pid.flow_sensors.magnetic;dashed=0;align=center;html=1;fontSize=25;', 
					50, 50, 'M', 'Magnetic', null, null, this.getTagsForStencil(gn, 'magnetic', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'pitot_tube;', 
					50, 50, '', 'Pitot Tube', null, null, this.getTagsForStencil(gn, 'pitot_tube', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'positive_displacement;', 
					50, 30, '', 'Positive Displacement', null, null, this.getTagsForStencil(gn, 'positive_displacement', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'rotameter;', 
					75, 50, '', 'Rotameter', null, null, this.getTagsForStencil(gn, 'rotameter', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'target;', 
					50, 50, '', 'Target', null, null, this.getTagsForStencil(gn, 'target', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'turbine;', 
					50, 50, '', 'Turbine', null, null, this.getTagsForStencil(gn, 'turbine', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'ultrasonic;', 
					50, 50, '', 'Ultrasonic', null, null, this.getTagsForStencil(gn, 'ultrasonic', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'v-cone;', 
					50, 50, '', 'V-cone', null, null, this.getTagsForStencil(gn, 'v-cone', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'venturi;', 
					50, 40, '', 'Venturi', null, null, this.getTagsForStencil(gn, 'venturi', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'vortex;', 
					50, 50, '', 'Vortex', null, null, this.getTagsForStencil(gn, 'vortex', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'wedge;', 
					50, 50, '', 'Wedge', null, null, this.getTagsForStencil(gn, 'wedge', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'weir;', 
					50, 50, '', 'Weir', null, null, this.getTagsForStencil(gn, 'weir', dt).join(' '))
		]);
	};
			
	Sidebar.prototype.addPidPipingPalette = function()
	{
		var s = "html=1;dashed=0;outlineConnect=0;align=center;" + mxConstants.STYLE_SHAPE + "=mxgraph.pid.piping.";
		var sb = mxConstants.STYLE_VERTICAL_LABEL_POSITION + '=bottom;align=center;dashed=0;html=1;' + mxConstants.STYLE_VERTICAL_ALIGN + '=top;' + mxConstants.STYLE_SHAPE + "=mxgraph.pid.piping.";
		var gn = 'mxgraph.pid.piping';
		var dt = 'process instrumentation piping ';
		
		this.addPaletteFunctions('pidPiping', 'Proc. Eng. / Piping', false,
		[
			this.createVertexTemplateEntry(sb + 'basket_strainer;', 50, 45, '', 'Basket Strainer', null, null, this.getTagsForStencil(gn, 'basket_strainer', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'blank2;', 20, 60, '', 'Blank', null, null, this.getTagsForStencil(gn, 'blank', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'breather;', 50, 30, '', 'Breather', null, null, this.getTagsForStencil(gn, 'breather', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'cap;', 10, 20, '', 'Cap', null, null, this.getTagsForStencil(gn, 'cap', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'closed_figure_8_blind2;', 20, 80, '', 'Closed Figure 8 Blind', null, null, this.getTagsForStencil(gn, 'closed_figure_8_blind', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'concentric_reducer;', 20, 20, '', 'Concentric Reducer', null, null, this.getTagsForStencil(gn, 'concentric_reducer', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'cone_strainer;', 30, 30, '', 'Cone Strainer', null, null, this.getTagsForStencil(gn, 'cone_strainer', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'damper2;', 50, 20, '', 'Damper', null, null, this.getTagsForStencil(gn, 'damper', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'desuper_heater;', 50, 50, 'DS', 'Desuper Heater', null, null, this.getTagsForStencil(gn, 'desuper_heater', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'detonation_arrestor;', 50, 20, 'D', 'Detonation Arrestor', null, null, this.getTagsForStencil(gn, 'detonation_arrestor', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'diverter_valve;pointerEvents=1;', 50, 35, '', 'Diverter Valve', null, null, this.getTagsForStencil(gn, 'diverter_valve', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'double_flange;pointerEvents=1;', 5, 20, '', 'Double Flange', null, null, this.getTagsForStencil(gn, 'double_flange', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'duplex_strainer;', 50, 40, '', 'Duplex Strainer', null, null, this.getTagsForStencil(gn, 'duplex_strainer', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'eccentric_reducer;', 20, 15, '', 'Eccentric Reducer', null, null, this.getTagsForStencil(gn, 'eccentric_reducer', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'excess_flow_valve2;', 50, 25, '', 'Excess Flow Valve', null, null, this.getTagsForStencil(gn, 'excess_flow_valve', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'exhaust_head;', 50, 40, '', 'Exhaust Head', null, null, this.getTagsForStencil(gn, 'exhaust_head', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'expansion_joint;', 50, 20, '', 'Expansion Joint', null, null, this.getTagsForStencil(gn, 'expansion_joint', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'flame_arrestor;', 50, 20, 'F', 'Flame Arrestor', null, null, this.getTagsForStencil(gn, 'flame_arrestor', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'flange;pointerEvents=1;', 5, 20, '', 'Flange', null, null, this.getTagsForStencil(gn, 'flange', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'flange_in;pointerEvents=1;', 10, 20, '', 'Flange In', null, null, this.getTagsForStencil(gn, 'flange_in', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'flexible_hose;pointerEvents=1;', 50, 25, '', 'Flexible Hose', null, null, this.getTagsForStencil(gn, 'flexible_hose', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'hose_connection;pointerEvents=1;', 20, 20, '', 'Hose Connection', null, null, this.getTagsForStencil(gn, 'hose_connection', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'in-line_mixer;', 50, 10, '', 'In-Line Mixer', null, null, this.getTagsForStencil(gn, 'in-line_mixer', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'in-line_silencer;', 50, 20, 'S', 'In-Line Silencer', null, null, this.getTagsForStencil(gn, 'in-line_silencer', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'open_figure_8_blind2;', 20, 80, '', 'Open Figure 8 Blind', null, null, this.getTagsForStencil(gn, 'open_figure_8_blind', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'orifice_(quick_change);', 10, 50, '', 'Orifice (Quick Change)', null, null, this.getTagsForStencil(gn, 'orifice_(quick_change)', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'plug;', 10, 10, '', 'Plug', null, null, this.getTagsForStencil(gn, 'plug', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'pulsation_dampener;', 50, 150, '', 'Pulsation Dampener', null, null, this.getTagsForStencil(gn, 'pulsation_dampener', dt).join(' ')),
			this.createVertexTemplateEntry(mxConstants.STYLE_VERTICAL_ALIGN + '=bottom;pointerEvents=1;dashed=0;' + mxConstants.STYLE_SHAPE + '=mxgraph.pid.piping.removable_spool;html=1;overflow=fill;', 50, 30, 
					'<table cellpadding="0" cellspacing="0" style="width:100%;height:100%;">' +
					'<tr>' +
					'<td valign="bottom" align="center">RS</td>' +
					'</tr>' +
					'</table>',
					'Removable Spool', null, null, this.getTagsForStencil(gn, 'removable_spool', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'rotary_valve;pointerEvents=1;', 50, 20, '', 'Rotary Valve', null, null, this.getTagsForStencil(gn, 'rotary_valve', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'spacer;', 20, 60, '', 'Spacer', null, null, this.getTagsForStencil(gn, 'spacer', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'steam_trap;', 50, 50, 'T', 'Steam Trap', null, null, this.getTagsForStencil(gn, 'steam_trap', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 't-type_strainer;', 20, 35, '', 'T-Type Strainer', null, null, this.getTagsForStencil(gn, 't-type_strainer', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'temporary_strainer;', 30, 30, '', 'Temporary Strainer', null, null, this.getTagsForStencil(gn, 'temporary_strainer', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'vent_silencer;', 20, 80, 'S', 'Vent Silencer', null, null, this.getTagsForStencil(gn, 'vent_silencer', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'welded_connection2;', 50, 20, '', 'Welded Connection', null, null, this.getTagsForStencil(gn, 'welded_connection', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'y-type_strainer;pointerEvents=1;', 50, 35, '', 'Y-Type Strainer', null, null, this.getTagsForStencil(gn, 'y-type_strainer', dt).join(' '))
		]);
	};
			
	Sidebar.prototype.addPidCrushersGrindingPalette = function()
	{
		var s = "html=1;dashed=0;outlineConnect=0;align=center;" + mxConstants.STYLE_SHAPE + "=mxgraph.pid.crushers_grinding.";
		var sb = mxConstants.STYLE_VERTICAL_LABEL_POSITION + '=bottom;align=center;dashed=0;html=1;' + mxConstants.STYLE_VERTICAL_ALIGN + '=top;' + mxConstants.STYLE_SHAPE + "=mxgraph.pid.crushers_grinding.";
		var gn = 'mxgraph.pid.crushers_grinding';
		var dt = 'process instrumentation crushers grinding ';
		
		this.addPaletteFunctions('pidCrushers Grinding', 'Proc. Eng. / Crushers Grinding', false,
		[
			this.createVertexTemplateEntry(sb + 'crusher;', 100, 60, '', 'Crusher', null, null, this.getTagsForStencil(gn, 'crusher', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'crusher_(cone);', 100, 60, '', 'Crusher (Cone)', null, null, this.getTagsForStencil(gn, 'crusher cone', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'crusher_(hammer);', 100, 60, '', 'Crusher (Hammer)', null, null, this.getTagsForStencil(gn, 'crusher hammer', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'crusher_(impact);', 100, 60, '', 'Crusher (Impact)', null, null, this.getTagsForStencil(gn, 'crusher impact', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'crusher_(jaw);', 100, 60, '', 'Crusher (Jaw)', null, null, this.getTagsForStencil(gn, 'crusher jaw', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'crusher_(roller);', 100, 60, '', 'Crusher (Roller)', null, null, this.getTagsForStencil(gn, 'crusher roller', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'crushing,_grinding_machine;', 100, 60, '', 'Crushing, Grinding Machine', null, null, this.getTagsForStencil(gn, 'crushing grinding machine', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'mill,_pulverizer;', 100, 60, '', 'Mill, Pulverizer', null, null, this.getTagsForStencil(gn, 'mill pulverizer', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'mill,_pulverizer_(hammer);', 100, 60, '', 'Mill, Pulverizer (Hammer)', null, null, this.getTagsForStencil(gn, 'mill pulverizer hammer', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'mill,_pulverizer_(impact);', 100, 60, '', 'Mill, Pulverizer (Impact)', null, null, this.getTagsForStencil(gn, 'mill pulverizer impact', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'mill_(roller);', 100, 60, '', 'Mill (Roller)', null, null, this.getTagsForStencil(gn, 'mill roller', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'mill_(vibration)2;', 100, 60, '', 'Mill (Vibration)', null, null, this.getTagsForStencil(gn, 'mill vibration', dt).join(' '))
		]);
	};
			
	Sidebar.prototype.addPidFittingsPalette = function()
	{
		var s = "html=1;dashed=0;outlineConnect=0;align=center;" + mxConstants.STYLE_SHAPE + "=mxgraph.pid.fittings.";
		var sb = mxConstants.STYLE_VERTICAL_LABEL_POSITION + '=bottom;align=center;dashed=0;html=1;' + mxConstants.STYLE_VERTICAL_ALIGN + '=top;' + mxConstants.STYLE_SHAPE + "=mxgraph.pid.fittings.";
		var gn = 'mxgraph.pid.fittings';
		var dt = 'process instrumentation fittings ';
		
		this.addPaletteFunctions('pidFittings', 'Proc. Eng. / Fittings', false,
		[
			this.createVertexTemplateEntry(sb + 'blind_disc2;', 40, 140, '', 'Blind Disc', null, null, this.getTagsForStencil(gn, 'blind disc', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'breakthrough2;', 38, 100, '', 'Breakthrough', null, null, this.getTagsForStencil(gn, 'breakthrough', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'clamped_flange_coupling;', 50, 100, '', 'Clamped Flange Coupling', null, null, this.getTagsForStencil(gn, 'clamped flange coupling', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'compensator;', 40, 80, '', 'Compensator', null, null, this.getTagsForStencil(gn, 'compensator', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'coupling;', 50, 100, '', 'Coupling', null, null, this.getTagsForStencil(gn, 'coupling', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'flame_arrestor;', 100, 100, '', 'Flame Arrestor', null, null, this.getTagsForStencil(gn, 'flame arrestor', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'flame_arrestor_(detonation-proof);', 100, 100, '', 'Flame Arrestor (Detonation-Proof)', null, null, this.getTagsForStencil(gn, 'flame arrestor detonation proof', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'flame_arrestor_(explosion-proof);', 100, 100, '', 'Flame Arrestor (Explosion-Proof)', null, null, this.getTagsForStencil(gn, 'flame arrestor explosion proof)', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'flame_arrestor_(fire-resistant);', 100, 100, '', 'Flame Arrestor (Fire-Resistant)', null, null, this.getTagsForStencil(gn, 'flame arrestor fire resistant)', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'flame_arrestor_(fire-resistant,_detonation-proof);', 100, 100, '', 'Flame Arrestor (Fire-Resistant, Detonation-Proof)', null, null, this.getTagsForStencil(gn, 'flame arrestor fire resistant detonation proof)', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'flanged_connection;', 20, 50, '', 'Flanged Connection', null, null, this.getTagsForStencil(gn, 'flanged connection', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'flanged_dummy_cover;', 85, 50, '', 'Flanged Dummy Cover', null, null, this.getTagsForStencil(gn, 'flanged dummy cover', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'funnel;', 80, 140, '', 'Funnel', null, null, this.getTagsForStencil(gn, 'funnel', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'hose;', 180, 30, '', 'Hose', null, null, this.getTagsForStencil(gn, 'hose', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'injector;', 80, 40, '', 'Injector', null, null, this.getTagsForStencil(gn, 'injector', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'interchangeable_disc_(blind_disc)2;', 40, 140, '', 'Interchangeable Disc (Blind Disc)', null, null, this.getTagsForStencil(gn, 'interchangeable disc (blind disc)', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'interchangeable_disc_(open_disc_in_function)2;', 40, 140, '', 'Interchangeable Disc (Open Disc In Function)', null, null, this.getTagsForStencil(gn, 'interchangeable disc (open disc in function)', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'open_disc;', 40, 140, '', 'Open Disc', null, null, this.getTagsForStencil(gn, 'open disc', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'orifice_plate2;', 40, 140, '', 'Orifice Plate', null, null, this.getTagsForStencil(gn, 'orifice plate', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'reducer;', 70, 50, '', 'Reducer', null, null, this.getTagsForStencil(gn, 'reducer', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'rupture_disc;', 50, 100, '', 'Rupture Disc', null, null, this.getTagsForStencil(gn, 'rupture disc', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'self-operating_release_valve2;', 105, 105, '', 'Self-Operating Release Valve', null, null, this.getTagsForStencil(gn, 'self operating release valve', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'silencer;', 140, 100, '', 'Silencer', null, null, this.getTagsForStencil(gn, 'silencer', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'single_flange;', 5, 50, '', 'Single Flange', null, null, this.getTagsForStencil(gn, 'single flange', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'strainer;', 40, 80, '', 'Strainer', null, null, this.getTagsForStencil(gn, 'strainer', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'strainer_(cone);', 40, 80, '', 'Strainer (Cone)', null, null, this.getTagsForStencil(gn, 'strainer (cone)', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'vent;', 80, 140, '', 'Vent', null, null, this.getTagsForStencil(gn, 'vent', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'viewing_glass;', 100, 50, '', 'Viewing Glass', null, null, this.getTagsForStencil(gn, 'viewing glass', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'viewing_glass_(lighting);', 100, 100, '', 'Viewing Glass (Lighting)', null, null, this.getTagsForStencil(gn, 'viewing glass (lighting)', dt).join(' '))
		]);
	};
			
	Sidebar.prototype.addPidSeparatorsPalette = function()
	{
		var s = "html=1;dashed=0;outlineConnect=0;align=center;" + mxConstants.STYLE_SHAPE + "=mxgraph.pid.separators.";
		var sb = mxConstants.STYLE_VERTICAL_LABEL_POSITION + '=bottom;align=center;dashed=0;html=1;' + mxConstants.STYLE_VERTICAL_ALIGN + '=top;' + mxConstants.STYLE_SHAPE + "=mxgraph.pid.separators.";
		var gn = 'mxgraph.pid.fittings';
		var dt = 'process instrumentation separators separator ';
		
		this.addPaletteFunctions('pidSeparators', 'Proc. Eng. / Separators', false,
		[
			this.createVertexTemplateEntry(sb + 'gravity_separator,_settling_chamber2;', 80, 120, '', 'Gravity Separator, Settling Chamber', null, null, this.getTagsForStencil(gn, 'gravity settling chamber', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'impact_separator;', 80, 120, '', 'Impact Separator', null, null, this.getTagsForStencil(gn, 'impact', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'separator,_sifter2;', 80, 120, '', 'Separator, Sifter', null, null, this.getTagsForStencil(gn, 'sifter', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'separator_(cyclone)2;', 80, 120, '', 'Separator (Cyclone)', null, null, this.getTagsForStencil(gn, 'cyclone', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'separator_(electromagnetic);', 80, 120, '', 'Separator (Electromagnetic)', null, null, this.getTagsForStencil(gn, 'electromagnetic', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'separator_(electrostatic_precipitator);', 80, 120, '', 'Separator (Electrostatic Precipitator)', null, null, this.getTagsForStencil(gn, 'electrostatic precipitator', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'separator_(electrostatic_precipitator,_wet);', 80, 120, '', 'Separator (Electrostatic Precipitator, Wet)', null, null, this.getTagsForStencil(gn, 'electrostatic precipitator wet)', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'separator_(permanent_magnet)2;', 80, 120, '', 'Separator (Permanent Magnet)', null, null, this.getTagsForStencil(gn, 'permanent magnet', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'separator_(venturi_scrubber);', 80, 120, '', 'Separator (Venturi Scrubber)', null, null, this.getTagsForStencil(gn, 'venturi scrubber', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'separator_(wet_scrubber)2;', 80, 120, '', 'Separator (Wet Scrubber)', null, null, this.getTagsForStencil(gn, 'wet scrubber', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'solidifier_(closed);', 80, 120, '', 'Solidifier (Closed)', null, null, this.getTagsForStencil(gn, 'solidifier closed', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'solidifier_(open);', 80, 120, '', 'Solidifier (Open)', null, null, this.getTagsForStencil(gn, 'solidifier open', dt).join(' ')),
			this.createVertexTemplateEntry(sb + 'spray_scrubber;', 80, 120, '', 'Spray Scrubber', null, null, this.getTagsForStencil(gn, 'spray scrubber', dt).join(' '))
		]);
	};
			
	Sidebar.prototype.addPidMiscPalette = function()
	{
		var s = mxConstants.STYLE_VERTICAL_LABEL_POSITION + '=bottom;outlineConnect=0;align=center;dashed=0;html=1;' + mxConstants.STYLE_VERTICAL_ALIGN + '=top;' + mxConstants.STYLE_SHAPE + "=mxgraph.pid2";
		var s2 = mxConstants.STYLE_VERTICAL_LABEL_POSITION + '=bottom;outlineConnect=0;align=center;dashed=0;html=1;' + mxConstants.STYLE_VERTICAL_ALIGN + '=top;' + mxConstants.STYLE_SHAPE + "=mxgraph.pid.misc.";
		var s3 = mxConstants.STYLE_VERTICAL_LABEL_POSITION + '=bottom;outlineConnect=0;align=center;dashed=0;html=1;' + mxConstants.STYLE_VERTICAL_ALIGN + '=top;' + mxConstants.STYLE_SHAPE + "=mxgraph.pid2misc.";
		var gn = 'mxgraph.pid.misc';
		var dt = 'process instrumentation ';
		
		this.addPaletteFunctions('pidMisc', 'Proc. Eng. / Misc', false,
		[
			this.createVertexTemplateEntry(s + 'misc.fan;fanType=common', 
					50, 50, '', 'Fan', null, null, this.getTagsForStencil(gn, 'fan', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'misc.column;columnType=common', 
					50, 120, '', 'Column', null, null, this.getTagsForStencil(gn, 'column', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'misc.column;columnType=tray', 
					50, 120, '', 'Column (Tray)', null, null, this.getTagsForStencil(gn, 'column', dt + 'tray').join(' ')),
			this.createVertexTemplateEntry(s + 'misc.column;columnType=fixed', 
					50, 180, '', 'Column (Fixed Bed)', null, null, this.getTagsForStencil(gn, 'column', dt + 'fixed bed').join(' ')),
			this.createVertexTemplateEntry(s + 'misc.column;columnType=fluid', 
					50, 120, '', 'Column (Fluidized Bed)', null, null, this.getTagsForStencil(gn, 'column', dt + 'fluidized bed').join(' ')),
			this.createVertexTemplateEntry(s + 'misc.column;columnType=baffle', 
					50, 120, '', 'Column (Staggered Baffle Trays)', null, null, this.getTagsForStencil(gn, 'column', dt + 'staggered baffle tray').join(' ')),
			this.createVertexTemplateEntry(s + 'misc.column;columnType=bubble', 
					50, 120, '', 'Column (Bubble Cap Trays)', null, null, this.getTagsForStencil(gn, 'column', dt + 'bubble cap tray').join(' ')),
			this.createVertexTemplateEntry(s + 'misc.column;columnType=valve', 
					50, 120, '', 'Column (Valve Trays)', null, null, this.getTagsForStencil(gn, 'column', dt + 'valve tray').join(' ')),
			this.createVertexTemplateEntry(s + 'misc.column;columnType=nozzle', 
					50, 180, '', 'Column (Fixed Bed, Spray Nozzle)', null, null, this.getTagsForStencil(gn, 'column', dt + 'fixed bed spray nozzle').join(' ')),
			this.createVertexTemplateEntry(s + 'misc.conveyor', 
					200, 50, '', 'Conveyor', null, null, this.getTagsForStencil(gn, 'conveyor', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'aerator_with_sparger;', 
					35, 100, '', 'Aerator With Sparger', null, null, this.getTagsForStencil(gn, 'aerator_with_sparger', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'air_cooler;', 
					70, 20, '', 'Air Cooler', null, null, this.getTagsForStencil(gn, 'air_cooler', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'air_filter;', 
					40, 65, '', 'Air Filter', null, null, this.getTagsForStencil(gn, 'air_filter', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'air_separator;', 
					65.5, 106, '', 'Air Separator', null, null, this.getTagsForStencil(gn, 'air_separator', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'back_draft_damper2;', 
					62, 32, '', 'Back Draft Damper', null, null, this.getTagsForStencil(gn, 'back_draft_damper', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'bag_filling_machine2;', 
					80, 100, '', 'Bag Filling Machine', null, null, this.getTagsForStencil(gn, 'bag_filling_machine', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'belt_skimmer;', 
					70, 98, '', 'Belt Skimmer', null, null, this.getTagsForStencil(gn, 'belt_skimmer', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'bin;', 
					100, 65, '', 'Bin', null, null, this.getTagsForStencil(gn, 'bin', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'boiler_(dome);', 
					100, 120, '', 'Boiler (Dome)', null, null, this.getTagsForStencil(gn, 'boiler_(dome)', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'boiler_(dome,_hot_liquid);', 
					100, 120, '', 'Boiler (Dome, Hot Liquid)', null, null, this.getTagsForStencil(gn, 'boiler_(dome,_hot_liquid)', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'box_truck;', 
					120, 80, '', 'Box Truck', null, null, this.getTagsForStencil(gn, 'box_truck', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'bucket_elevator;', 
					65, 200, '', 'Bucket Elevator', null, null, this.getTagsForStencil(gn, 'bucket_elevator', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'chiller;', 
					155, 115, '', 'Chiller', null, null, this.getTagsForStencil(gn, 'chiller', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'combustion_chamber;', 
					130, 100, '', 'Combustion Chamber', null, null, this.getTagsForStencil(gn, 'combustion_chamber', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'conveyor2;', 
					200, 60, '', 'Conveyor', null, null, this.getTagsForStencil(gn, 'conveyor', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'conveyor_(belt);', 
					200, 50, '', 'Conveyor (Belt)', null, null, this.getTagsForStencil(gn, 'conveyor_(belt)', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'conveyor_(belt,_closed);', 
					240, 80, '', 'Conveyor (Belt, Closed)', null, null, this.getTagsForStencil(gn, 'conveyor_(belt,_closed)', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'conveyor_(belt,_closed,_reversible)2;', 
					240, 80, '', 'Conveyor (Belt, Closed, Reversible)', null, null, this.getTagsForStencil(gn, 'conveyor_(belt,_closed,_reversible)', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'conveyor_(chain,_closed);', 
					240, 80, '', 'Conveyor (Chain, Closed)', null, null, this.getTagsForStencil(gn, 'conveyor_(chain,_closed)', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'conveyor_(screw,_closed);', 
					220, 80, '', 'Conveyor (Screw, Closed)', null, null, this.getTagsForStencil(gn, 'conveyor_(screw,_closed)', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'conveyor_(vibrating,_closed)2;', 
					240, 80, '', 'Conveyor (Vibrating, Closed)', null, null, this.getTagsForStencil(gn, 'conveyor_(vibrating,_closed)', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'cooler;', 
					85, 90, '', 'Cooler', null, null, this.getTagsForStencil(gn, 'cooler', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'cooling_tower', 
					100, 120, '', 'Cooling Tower', null, null, this.getTagsForStencil(gn, 'cooling_tower', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'cooling_tower_(dry,_forced_draught);', 
					100, 120, '', 'Cooling Tower (Dry, Forced Draught)', null, null, this.getTagsForStencil(gn, 'cooling_tower_(dry,_forced_draught)', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'cooling_tower_(dry,_induced_draught);', 
					100, 120, '', 'Cooling Tower (Dry, Induced Draught)', null, null, this.getTagsForStencil(gn, 'cooling_tower_(dry,_induced_draught)', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'cooling_tower_(dry,_natural_draught);', 
					100, 120, '', 'Cooling Tower (Dry, Natural Draught)', null, null, this.getTagsForStencil(gn, 'cooling_tower_(dry,_natural_draught)', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'cooling_tower_(wet,_forced_draught);', 
					100, 120, '', 'Cooling Tower (Wet, Forced Draught)', null, null, this.getTagsForStencil(gn, 'cooling_tower_(wet,_forced_draught)', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'cooling_tower_(wet,_induced_draught);', 
					100, 120, '', 'Cooling Tower (Wet, Induced Draught)', null, null, this.getTagsForStencil(gn, 'cooling_tower_(wet,_induced_draught)', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'cooling_tower_(wet,_natural_draught);', 
					100, 120, '', 'Cooling Tower (Wet, Natural Draught)', null, null, this.getTagsForStencil(gn, 'cooling_tower_(wet,_natural_draught)', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'cooling_tower_(wet-dry,_natural_draught);', 
					100, 120, '', 'Cooling Tower (Wet-Dry, Natural Draught)', null, null, this.getTagsForStencil(gn, 'cooling_tower_(wet-dry,_natural_draught)', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'covered_gas_vent;pointerEvents=1;', 
					80, 100, '', 'Covered Gas Vent', null, null, this.getTagsForStencil(gn, 'covered_gas_vent', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'crane;', 
					100, 100, '', 'Crane', null, null, this.getTagsForStencil(gn, 'crane', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'curved_gas_vent;pointerEvents=1;', 
					30, 70, '', 'Curved Gas Vent', null, null, this.getTagsForStencil(gn, 'curved_gas_vent', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'cyclone;', 
					100, 80, '', 'Cyclone', null, null, this.getTagsForStencil(gn, 'cyclone', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'dryer;', 
					80, 100, '', 'Dryer', null, null, this.getTagsForStencil(gn, 'dryer', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'elevator_(bucket);', 
					160, 250, '', 'Elevator (Bucket)', null, null, this.getTagsForStencil(gn, 'elevator_(bucket)', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'elevator_(bucket,_z-form);', 
					430, 250, '', 'Elevator (Bucket, Z-Form)', null, null, this.getTagsForStencil(gn, 'elevator_(bucket,_z-form)', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'fan;', 
					100, 100, '', 'Fan', null, null, this.getTagsForStencil(gn, 'fan', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'fan_2;', 
					58, 8, '', 'Fan 2', null, null, this.getTagsForStencil(gn, 'fan_2', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'filter;', 
					100, 100, '', 'Filter', null, null, this.getTagsForStencil(gn, 'filter', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'filter_2;', 
					100, 100, '', 'Filter 2', null, null, this.getTagsForStencil(gn, 'filter_2', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'firing_system,_burner;', 
					100, 100, '', 'Firing System, Burner', null, null, this.getTagsForStencil(gn, 'firing_system,_burner', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'flame_arrestor;', 
					100, 40, '', 'Flame Arrestor', null, null, this.getTagsForStencil(gn, 'flame_arrestor', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'flexible_pipe;pointerEvents=1;', 
					60, 16, '', 'Flexible Pipe', null, null, this.getTagsForStencil(gn, 'flexible_pipe', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'forced_flow_air_cooler;', 
					70, 30, '', 'Forced Flow Air Cooler', null, null, this.getTagsForStencil(gn, 'forced_flow_air_cooler', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'forklift_(manual);', 
					140, 100, '', 'Forklift (Manual)', null, null, this.getTagsForStencil(gn, 'forklift_(manual)', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'forklift_(truck);', 
					140, 100, '', 'Forklift (Truck)', null, null, this.getTagsForStencil(gn, 'forklift_(truck)', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'funnel;pointerEvents=1;', 
					40, 80, '', 'Funnel', null, null, this.getTagsForStencil(gn, 'funnel', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'gas_flare;', 
					60, 100, '', 'Gas Flare', null, null, this.getTagsForStencil(gn, 'gas_flare', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'induced_flow_air_cooler;', 
					93, 30, '', 'Induced Flow Air Cooler', null, null, this.getTagsForStencil(gn, 'induced_flow_air_cooler', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'industrial_truck;pointerEvents=1;', 
					120, 20, '', 'Industrial Truck', null, null, this.getTagsForStencil(gn, 'industrial_truck', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'lift;', 
					100, 100, '', 'Lift', null, null, this.getTagsForStencil(gn, 'lift', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'loading_arm;pointerEvents=1;', 
					120, 80, '', 'Loading Arm', null, null, this.getTagsForStencil(gn, 'loading_arm', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'mixer;', 
					80, 100, '', 'Mixer', null, null, this.getTagsForStencil(gn, 'mixer', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'palletizer2;', 
					80, 100, '', 'Palletizer', null, null, this.getTagsForStencil(gn, 'palletizer', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'protective_palette_covering;', 
					80, 100, '', 'Protective Palette Covering', null, null, this.getTagsForStencil(gn, 'protective_palette_covering', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'roller_conveyor;', 
					160, 20, '', 'Roller Conveyor', null, null, this.getTagsForStencil(gn, 'roller_conveyor', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'rolling_bin;', 
					100, 65, '', 'Rolling Bin', null, null, this.getTagsForStencil(gn, 'rolling_bin', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'rotary_screen;', 
					100, 65, '', 'Rotary Screen', null, null, this.getTagsForStencil(gn, 'rotary_screen', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'screening_device,_sieve,_strainer;', 
					80, 120, '', 'Screening Device, Sieve, Strainer', null, null, this.getTagsForStencil(gn, 'screening_device,_sieve,_strainer', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'screening_device,_sieve,_strainer_(basket_reel);', 
					80, 180, '', 'Screening Device, Sieve, Strainer (Basket Reel)', null, null, this.getTagsForStencil(gn, 'screening_device,_sieve,_strainer_(basket_reel)', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'screening_device,_sieve,_strainer_(coarse_and_fine_screens);', 
					80, 120, '', 'Screening Device, Sieve, Strainer (Coarse and Fine Screens)', null, null, this.getTagsForStencil(gn, 'screening_device,_sieve,_strainer_(coarse_and_fine_screens)', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'screening_device,_sieve,_strainer_(coarse_rake);', 
					80, 120, '', 'Screening Device, Sieve, Strainer (Coarse Rake)', null, null, this.getTagsForStencil(gn, 'screening_device,_sieve,_strainer_(coarse_rake)', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'screening_device,_sieve,_strainer_(fine_rake);', 
					80, 120, '', 'Screening Device, Sieve, Strainer (Fine Rake)', null, null, this.getTagsForStencil(gn, 'screening_device,_sieve,_strainer_(fine_rake)', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'screening_device,_sieve,_strainer_(rotating_drum)', 
					80, 120, '', 'Screening Device, Sieve, Strainer (Rotating Drum)', null, null, this.getTagsForStencil(gn, 'screening_device,_sieve,_strainer_(rotating_drum)', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'screening_device,_sieve,_strainer_(vibrating)2;', 
					80, 120, '', 'Screening Device, Sieve, Strainer (Vibrating)', null, null, this.getTagsForStencil(gn, 'screening_device,_sieve,_strainer_(vibrating)', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'ship', 
					105, 60, '', 'Ship', null, null, this.getTagsForStencil(gn, 'ship', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'silencer;', 
					100, 30, '', 'Silencer', null, null, this.getTagsForStencil(gn, 'silencer', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'spraying_device;pointerEvents=1;', 
					60, 20, '', 'Spraying Device', null, null, this.getTagsForStencil(gn, 'spraying_device', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'spray_cooler;', 
					100, 120, '', 'Spray Cooler', null, null, this.getTagsForStencil(gn, 'spray_cooler', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'stack,_chimney;', 
					60, 100, '', 'Stack, Chimney', null, null, this.getTagsForStencil(gn, 'stack,_chimney', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'steam_trap2;', 
					53, 53, '', 'Steam Trap', null, null, this.getTagsForStencil(gn, 'steam_trap', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'tank_car,_tank_wagon;', 
					127, 80, '', 'Tank Car, Tank Wagon', null, null, this.getTagsForStencil(gn, 'tank_car,_tank_wagon', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'viewing_glass;', 
					80, 50, '', 'Viewing Glass', null, null, this.getTagsForStencil(gn, 'viewing_glass', dt).join(' '))
		]);
	};
})();
