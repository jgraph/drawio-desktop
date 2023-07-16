/**
 * $Id: mxKubernetes.js,v 1.5 2019/14/11 12:32:06 mate Exp $
 * Copyright (c) 2006-2020, JGraph Ltd
 */
//**********************************************************************************************************************************************************
// Kubernetes icon
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeKubernetesIcon(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxShapeKubernetesIcon, mxShape);

mxShapeKubernetesIcon.prototype.cst = {
		ICON : 'mxgraph.kubernetes.icon'
};

mxShapeKubernetesIcon.prototype.customProperties = [
	{name: 'prIcon', dispName: '', defVal: 'api', type: 'API', 
			enumList: [{val: 'c_c_m', dispName: 'C-C-M'},
					   {val: 'c_m', dispName: 'C-M'},
					   {val: 'c_role', dispName: 'C-Role'},
					   {val: 'cm', dispName: 'CM'},
					   {val: 'crb', dispName: 'CRB'},
					   {val: 'crd', dispName: 'CRD'},
					   {val: 'cronjob', dispName: 'Cronjob'},
					   {val: 'deploy', dispName: 'Deploy'},
					   {val: 'ds', dispName: 'DS'},
					   {val: 'ep', dispName: 'EP'},
					   {val: 'etcd', dispName: 'ETCD'},
					   {val: 'group', dispName: 'Group'},
					   {val: 'hpa', dispName: 'HPA'},
					   {val: 'ing', dispName: 'ING'},
					   {val: 'job', dispName: 'Job'},
					   {val: 'k_proxy', dispName: 'K-Proxy'},
					   {val: 'kubelet', dispName: 'Kubelet'},
					   {val: 'limits', dispName: 'Limits'},
					   {val: 'master', dispName: 'Master'},
					   {val: 'netpol', dispName: 'Netpol'},
					   {val: 'node', dispName: 'Node'},
					   {val: 'ns', dispName: 'NS'},
					   {val: 'pod', dispName: 'Pod'},
					   {val: 'psp', dispName: 'PSP'},
					   {val: 'pv', dispName: 'PV'},
					   {val: 'pvc', dispName: 'PVC'},
					   {val: 'quota', dispName: 'Quota'},
					   {val: 'rb', dispName: 'RB'},
					   {val: 'role', dispName: 'Role'},
					   {val: 'rs', dispName: 'RS'},
					   {val: 'sa', dispName: 'SA'},
					   {val: 'sc', dispName: 'SC'},
					   {val: 'sched', dispName: 'Sched'},
					   {val: 'secret', dispName: 'Secret'},
					   {val: 'sts', dispName: 'STS'},
					   {val: 'svc', dispName: 'SVC'},
					   {val: 'user', dispName: 'User'},
				       {val: 'vol', dispName: 'Vol'}]}
];


/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeKubernetesIcon.prototype.paintVertexShape = function(c, x, y, w, h)
{
	var prIcon = mxUtils.getValue(this.state.style, 'prIcon', '');
	
	var fillColor = mxUtils.getValue(this.state.style, 'fillColor', '#ffffff');
	var strokeColor = mxUtils.getValue(this.state.style, 'strokeColor', '#ffffff');

	c.translate(x, y);
	
	var frame = mxStencilRegistry.getStencil('mxgraph.kubernetes.frame');
	
	c.setFillColor(strokeColor);
	frame.drawShape(c, this, 0, 0, w, h);

	c.setFillColor(fillColor);
	frame.drawShape(c, this, w * 0.03, h * 0.03, w * 0.94, h * 0.94);
	
	var prStencil = mxStencilRegistry.getStencil('mxgraph.kubernetes.' + prIcon);
	
	if (prStencil != null)
	{
		c.setFillColor(strokeColor);
		prStencil.drawShape(c, this, w * 0.2, h * 0.2, w * 0.6, h * 0.6);
	}
};

mxCellRenderer.registerShape(mxShapeKubernetesIcon.prototype.cst.ICON, mxShapeKubernetesIcon);

mxShapeKubernetesIcon.prototype.getConstraints = function(style, w, h)
{
	var constr = [];
	var r = Math.min(h * 0.5, w * 0.5);
	
	constr.push(new mxConnectionConstraint(new mxPoint(0, 0.5), false));

	return (constr);
}

