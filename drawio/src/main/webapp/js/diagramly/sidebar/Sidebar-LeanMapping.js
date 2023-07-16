(function()
{
	// Adds Lean Mapping shapes
	Sidebar.prototype.addLeanMappingPalette = function()
	{
		var w = 100;
		var h = 100;
		var s = mxConstants.STYLE_STROKEWIDTH + '=2;html=1;shape=mxgraph.lean_mapping.';
		var s2 = mxConstants.STYLE_VERTICAL_LABEL_POSITION + '=bottom;html=1;' + mxConstants.STYLE_VERTICAL_ALIGN + '=top;strokeWidth=2;shape=mxgraph.lean_mapping.';
		var sb = this;
		
		//default tags
		var dt = 'value stream lean mapping ';
		var gn = 'mxgraph.lean_mapping';
		this.setCurrentSearchEntryLibrary('lean_mapping');

		var fns =
		[
			this.createVertexTemplateEntry(s2 + 'boat_shipment;align=center;', w, h, '', 'Boat Shipment', null, null, this.getTagsForStencil(gn, 'boat_shipment', dt).join(' ')),
			this.addDataEntry(dt + 'data box', 60, 100, 'Data Box',
				'1ZXNbsIwEISfxlcUHJpy5afl0qoHKvWItmSJrTpxlGxJ0qfvmpgCAgSqWqQcIm1mPfbOd7BFOEnrWQG5erYxGhE+iHBSWEttldYTNEbIQMcinAopA/6EfDzT7W+6QQ4FZnSNQbaGNZhPbJVWKKkxXiipsB/4pmNSLEgRjhWlPOi0z2WpIHfr0jpxGXoGIVukkOc6S3oxECzebX1o8SdiQVifnXoj+ZFnaFOkouEllZ+Cu1EbLFCoE7V1BV6EshWSH+uOARcew2kk4RESZ3nd0tlHwwn45PHKZjTXX04cOiY5LDn+E67IA3Nh9RLMyOgkc7R0HLs99rFUShPO2eq2qRjmtajkr1DJPyA1OEnqpWukmkMiNwB3dwRuDLRUHQU3uB246AjcaA3adBRcdDtw95fv+Q4AG/4bMP7dPbqb3sGb/A0='),
		   	
			this.createVertexTemplateEntry(s + 'outside_sources;whiteSpace=wrap;align=center;', w, h * 0.7, 
					'<table cellpadding="5" cellspacing="0" style="font-size:1em;width:100%;height:100%;">' +
					'<tr><td height="50%"></td></tr>' +
					'<tr><td align="center" height="50%">XYZ Corp</td></tr></table>',
					'Customer/Supplier', null, null, this.getTagsForStencil(gn, 'outside_sources', dt).join(' ')),

			this.addEntry(dt + 'dedicated process manufacturing', function()
			{
				var bg = new mxCell('\nDescription', new mxGeometry(0, 0, 100, 70), s + 'manufacturing_process;fontSize=12;verticalAlign=middle;html=1;align=center;whiteSpace=wrap;');
			   	bg.vertex = true;
			   	var text1 = new mxCell('Process', new mxGeometry(0, 0, 100, 13), 'text;fontSize=12;spacingLeft=2;verticalAlign=top;html=1;align=center;spacingTop=-5;resizeWidth=1;whiteSpace=wrap;');
			   	text1.vertex = true;
			   	bg.insert(text1);

	   			return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Dedicated Process');
			}),
		   	
			this.createVertexTemplateEntry(s + 'manufacturing_process_shared;spacingTop=-5;align=center;whiteSpace=wrap;' + mxConstants.STYLE_VERTICAL_ALIGN + '=top;', w, h * 0.7, 
					'Process',
					'Shared Process', null, null, this.getTagsForStencil(gn, 'manufacturing_process_shared', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'work_cell;pointerEvents=1;', w * 0.7, h * 0.6, '', 'Workcell', null, null, this.getTagsForStencil(gn, 'work_cell', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'inventory_box;', w, h * 0.9, '', 'Inventory Box', null, null, this.getTagsForStencil(gn, 'inventory_box', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'push_arrow;', w, h * 0.3,'', 'Push Arrow', null, null, this.getTagsForStencil(gn, 'push_arrow', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'supermarket;', w * 0.6, h,'', 'Supermarket', null, null, this.getTagsForStencil(gn, 'supermarket', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'physical_pull;pointerEvents=1;', w, h,'', 'Material Pull', null, null, this.getTagsForStencil(gn, 'physical_pull', dt + 'circular arrow').join(' ')),
			this.createVertexTemplateEntry(s + 'fifo_lane;overflow=fill;' + mxConstants.STYLE_VERTICAL_ALIGN + '=top;align=center;', w, h * 0.5, 
					'<table cellpadding="0" cellspacing="0" style="font-size:1em;width:100%;height:100%;">' +
					'<tr><td height="0%">MAX=XX</td></tr>' +
					'<tr><td align="center" height="100%"></td></tr></table>',
					'FIFO Lane', null, null, this.getTagsForStencil(gn, 'fifo_lane', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'buffer_or_safety_stock;', w * 0.4, h,'', 'Safety Stock', null, null, this.getTagsForStencil(gn, 'buffer_or_safety_stock', dt).join(' ')),

			this.addEntry(this.getTagsForStencil(gn, 'truck_shipment', dt).join(' '), function()
			{
			   	var bg = new mxCell('', new mxGeometry(0, 0, 100, 100), s + 'truck_shipment;');
			   	bg.vertex = true;
			   	var text1 = new mxCell('2x per\nWeek', new mxGeometry(0, 0, 60, 80), 'text;fontSize=12;verticalAlign=middle;html=1;align=center;whiteSpace=wrap;');
			   	text1.vertex = true;
			   	bg.insert(text1);

	   			return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Truck Shipment');
			}),
		   	
		   	this.createVertexTemplateEntry(s + 'schedule;whiteSpace=wrap;align=center;', w, h * 0.7, 'Production\nControl', 'Production Control', null, null, this.getTagsForStencil(gn, 'schedule', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'schedule;whiteSpace=wrap;align=center;', w, h * 0.7, 'Other\nInformation', 'Other Information', null, null, this.getTagsForStencil(gn, 'schedule', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'go_see_production_scheduling;pointerEvents=1;', 92, 60, '', 'Go See Production Scheduling', null, null, this.getTagsForStencil(gn, 'go_see_production_scheduling', dt).join(' ')),

			this.addEntry(this.getTagsForStencil(gn, 'kaizen_lightening_burst', dt).join(' '), function()
			{
			   	var bg = new mxCell('', new mxGeometry(0, 0, 90, 40), s2 + 'kaizen_lightening_burst;');
			   	bg.vertex = true;
			   	var text1 = new mxCell('', new mxGeometry(8, 8, 74, 24), 'rect;fillColor=strokeColor;');
			   	text1.vertex = true;
			   	bg.insert(text1);

		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Kaizen Lightening Burst');
			}),
		   	
			this.createVertexTemplateEntry(s2 + 'kanban_post;', 50, 100, '', 'Kanban Post', null, null, this.getTagsForStencil(gn, 'kanban_post', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'load_leveling;', 100, 30, '', 'Load Leveling', null, null, this.getTagsForStencil(gn, 'load_leveling', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'move_by_forklift;', 92, 100, '', 'Move by Forklift', null, null, this.getTagsForStencil(gn, 'move_by_forklift', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'mrp_erp;whiteSpace=wrap;', 70, 100, '', 'MRP/ERP', null, null, this.getTagsForStencil(gn, 'mrp_erp', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'operator;', 100, 84, '', 'Operator', null, null, this.getTagsForStencil(gn, 'operator', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'quality_problem;fontSize=24;fontStyle=1;whiteSpace=wrap;align=center;', 80, 100, 'Q', 'Quality Problem', null, null, this.getTagsForStencil(gn, 'quality_problem', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'verbal;pointerEvents=1;', 50, 100, '', 'Verbal Information', null, null, this.getTagsForStencil(gn, 'verbal', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'fifo_sequence_flow;pointerEvents=1;fontStyle=0;fontSize=20;align=center;', w, h * 0.5, 'FIFO', 'FIFO Sequence', null, null, this.getTagsForStencil(gn, 'fifo_sequence_flow', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'production_kanban;overflow=fill;', w, h, 
					'<p style="font-size:2em;margin-right:35px;margin-top:13px;text-align:right">P</p>',
					'Production Kanban', null, null, this.getTagsForStencil(gn, 'production_kanban', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'withdrawal_kanban;overflow=fill;', w, h, 
					'<p style="font-size:2em;margin-right:35px;margin-top:13px;text-align:right">W</p>',
					'Withdrawal Kanban', null, null, this.getTagsForStencil(gn, 'withdrawal_kanban', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'signal_kanban;overflow=fill;', w, h * 0.9, 
					'<p style="font-size:2em;margin-right:35px;margin-top:4px;text-align:right">S</p>',
					'Signal Kanban', null, null, this.getTagsForStencil(gn, 'signal_kanban', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'sequenced_pull_ball;', w * 0.6, h * 0.6, '', 'Sequenced Pull Ball', null, null, this.getTagsForStencil(gn, 'sequenced_pull_ball', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'rail_shipment;', w, h * 0.3, '', 'Rail Shipment', null, null, this.getTagsForStencil(gn, 'rail_shipment', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'airplane_7;', 100, 45, '', 'Air Freight', null, null, this.getTagsForStencil(gn, 'airplane_7', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'warehouse;', w, h * 0.6, '', 'Warehouse', null, null, this.getTagsForStencil(gn, 'warehouse', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'timeline2;dx1=0;dy1=1;dx2=30;dy2=0;dx3=160;dy3=1;dx4=230;dy4=0;dx5=310;dy5=1;dy6=0;', w * 4, h * 0.4, '', 'Timeline', null, null, this.getTagsForStencil(gn, 'timeline', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'crossDock;', w, h * 0.8, '', 'Cross-Dock', null, null, this.getTagsForStencil(gn, 'crossDock', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'orders;overflow=fill;', w, h * 0.6, 
					'<table cellpadding="0" cellspacing="0" style="font-size:1.5em;width:100%;height:100%;">' +
					'<tr><td height="65%"></td></tr>' +
					'<tr><td align="center" height="35%">IN</td></tr></table>',
					'Orders', null, null, this.getTagsForStencil(gn, 'orders', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'batched_kanban;', w * 2, h * 0.8, '', 'Batched Kanban', null, null, this.getTagsForStencil(gn, 'batched_kanban', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'control_center;', w * 0.8, h * 0.8, '', 'Control Center', null, null, this.getTagsForStencil(gn, 'control_center', dt).join(' ')),
		    this.createEdgeTemplateEntry('shape=flexArrow;html=1;', 100, 100, '', 'Shipments', null, this.getTagsForStencil(gn, 'arrow', dt).join(' ')),
		    this.createEdgeTemplateEntry('shape=mxgraph.lean_mapping.manual_info_flow_edge;html=1;', 100, 100, 'Daily', 'Manual Information', null, this.getTagsForStencil(gn, 'manual_info_flow_edge', dt).join(' ')),
		    this.createEdgeTemplateEntry('shape=mxgraph.lean_mapping.electronic_info_flow_edge;html=1;', 100, 100, 'Monthly', 'Electronic Information', null, this.getTagsForStencil(gn, 'electronic_info_flow_edge', dt).join(' '))
		];
		
		this.addPalette('lean_mapping', 'Value Stream Mapping', false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
		
		this.setCurrentSearchEntryLibrary();
	};
	
})();
