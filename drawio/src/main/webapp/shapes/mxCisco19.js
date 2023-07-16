/**
 * $Id: mxCisco19.js,v 1.0 2019/12/10 13:05:39 mate Exp $
 * Copyright (c) 2006-2020, JGraph Ltd
 */

//**********************************************************************************************************************************************************
//rect
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeCisco19Rect(bounds, fill, stroke, strokewidth)
{
	mxShape.call(this);
	this.bounds = bounds;
	this.fill = fill;
	this.stroke = stroke;
	this.strokewidth = (strokewidth != null) ? strokewidth : 1;
};

/**
* Extends mxShape.
*/
mxUtils.extend(mxShapeCisco19Rect, mxShape);

mxShapeCisco19Rect.prototype.cst = {
		SHAPE_RECT : 'mxgraph.cisco19.rect'
};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeCisco19Rect.prototype.paintVertexShape = function(c, x, y, w, h)
{
	var prIcon = mxUtils.getValue(this.state.style, 'prIcon', 'l2_switch');
	
	var fillColor = mxUtils.getValue(this.state.style, 'fillColor', '#ffffff');
	var strokeColor = mxUtils.getValue(this.state.style, 'strokeColor', '#000000');

	var bgIcon = 'mxgraph.cisco19.bg1';
	var circleBg = ['router', 'csr_1000v', 'wireless_router', 'l3_modular3', 'ucs_express', 'router_with_voice', 'router_with_firewall', 'netflow_router', 'secure_router', 'ip_telephone_router', 'asr_9000', 'clock', 'vbond', 'vmanage', 'vsmart'];
	
	c.translate(x, y);

	if (['l2_modular', 'l3_modular', '6500_vss', 'nexus_9500', 'nexus_7k'].includes(prIcon)) // square with 1 hor rect on top
	{
		bgIcon = 'mxgraph.cisco19.bg2';
	}
	else if (['l2_switch_with_dual_supervisor', 'l3_switch_with_dual_supervisor'].includes(prIcon)) //square with 2 hor rects on top
	{
		bgIcon = 'mxgraph.cisco19.bg3';
	}
	else if (['l2_modular2'].includes(prIcon)) // vert 2 rects
	{
		bgIcon = 'mxgraph.cisco19.bg4';
	}
	else if (['l3_modular2', '6500_vss2', 'hypervisor', 'collab1'].includes(prIcon)) // vert rect
	{
		bgIcon = 'mxgraph.cisco19.bg5';
	}
	else if (circleBg.includes(prIcon)) // circle
	{
		c.begin();

		if (prIcon == 'wireless_router')
		{
			c.ellipse(0, h * 0.17, w, h * 0.83);
		}
		else
		{
			c.ellipse(0, 0, w, h);
		}

		c.fill();
	}
	else if (['content_router', 'router_with_firewall2', 'netflow_router2', 'nam_virtual_service_blade', 'ucs_5108_blade_chassis', 'storage', 'nexus_1kv_vsm', 'nexus_1k', 'nexus_1010', 'dual mode access point', 'wireless_lan_controller', 'primary_codec', 'virtual_desktop_service', 'video_gateway', 'video_analytics', 'telepresence_exchange', 'meeting_scheduling_and_management_server', 'content_recording_streaming_server', 'communications_manager', 'cisco_unified_presence_service', 'cisco_unified_contact_center_enterprise_and_hosted', 'h323', 'monitor', 'telepresence_endpoint_twin_data_display', 'operations_manager', 'transcoder', 'contact_center_express', 'ip_ip_gateway', 'shield', 'set_top', 'da_encoder', 'ad_encoder', 'da_decoder', 'ad_decoder', 'acs', 'email_security', 'vpn_concentrator', 'ssl_terminator', 'cisco_security_manager', 'web_security', 'nac_appliance', 'ironport', 'ips_ids', 'firewall', 'asa_5500', 'flow_collector', 'load_balancer', 'web_application_firewall', 'analysis_correlation', 'flow_analytics', 'virtual_private_network2', 'web_security_services', 'web_security_services2', 'virtual_private_network_connector'].includes(prIcon)) //hor. rect
	{
		bgIcon = 'mxgraph.cisco19.bg6';
	}
	else if (['asr_1000'].includes(prIcon)) //hexagon
	{
		bgIcon = 'mxgraph.cisco19.bg7';
	}
	else if (['fibre_channel_director_mds_9000', 'fibre_channel_fabric_switch'].includes(prIcon)) // square with 1 hor rect at the bottom
	{
		bgIcon = 'mxgraph.cisco19.bg8';
	}
	else if (['ucs_c_series_server'].includes(prIcon)) // narrow hor rect
	{
		bgIcon = 'mxgraph.cisco19.bg9';
	}
	else if (['aci'].includes(prIcon)) // background specific for ACI
	{
		var frame = mxStencilRegistry.getStencil('mxgraph.cisco19.acibg');
		frame.drawShape(c, this, w * 0.195, h * 0.195, w * 0.61, h * 0.61);
	}
	else if (['immersive_telepresence_endpoint'].includes(prIcon)) // extra wide rect
	{
		bgIcon = 'mxgraph.cisco19.bg10';
	}


	if (!circleBg.includes(prIcon) && prIcon != 'aci')
	{
		var frame = mxStencilRegistry.getStencil(bgIcon);

		if (frame != null)
		{
			frame.drawShape(c, this, 0, 0, w, h);
		}
	}

	c.setShadow(false);

	
	var prStencil = mxStencilRegistry.getStencil('mxgraph.cisco19.' + prIcon);

	c.setFillColor(strokeColor);
	
	if (prStencil != null)
	{
		prStencil.drawShape(c, this, 0, 0, w, h);
	}
};

mxCellRenderer.registerShape(mxShapeCisco19Rect.prototype.cst.SHAPE_RECT, mxShapeCisco19Rect);

mxShapeCisco19Rect.prototype.getConstraints = function(style, w, h)
{
	var constr = [];

	constr.push(new mxConnectionConstraint(new mxPoint(0.825, 0.5), false));
	constr.push(new mxConnectionConstraint(new mxPoint(0.175, 0.5), false));
	constr.push(new mxConnectionConstraint(new mxPoint(0.5, 0.16), false));
	constr.push(new mxConnectionConstraint(new mxPoint(0.5, 0.84), false));
	constr.push(new mxConnectionConstraint(new mxPoint(0.66, 0.17), false));
	constr.push(new mxConnectionConstraint(new mxPoint(0.66, 0.83), false));
	constr.push(new mxConnectionConstraint(new mxPoint(0.34, 0.17), false));
	constr.push(new mxConnectionConstraint(new mxPoint(0.34, 0.83), false));
	constr.push(new mxConnectionConstraint(new mxPoint(0.75, 0.33), false));
	constr.push(new mxConnectionConstraint(new mxPoint(0.75, 0.67), false));
	constr.push(new mxConnectionConstraint(new mxPoint(0.25, 0.33), false));
	constr.push(new mxConnectionConstraint(new mxPoint(0.25, 0.67), false));

	return (constr);
};

