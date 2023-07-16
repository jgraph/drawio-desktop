/**
 * $Id: mxCiscoSafe.js,v 1.0 2020/14/05 13:05:39 mate Exp $
 * Copyright (c) 2006-2020, JGraph Ltd
 */

//**********************************************************************************************************************************************************
//Composite Icon
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeCiscoSafeCompositeIcon(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxShapeCiscoSafeCompositeIcon, mxShape);

mxShapeCiscoSafeCompositeIcon.prototype.cst = {
		SHAPE_COMPOSITE_ICON : 'mxgraph.cisco_safe.compositeIcon'
};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeCiscoSafeCompositeIcon.prototype.paintVertexShape = function(c, x, y, w, h)
{
	var strokeColor = mxUtils.getValue(this.state.style, 'strokeColor', 'none');
	var bgColor = mxUtils.getValue(this.state.style, 'bgColor', '#C2E0AE');
	var fillColor = mxUtils.getValue(this.state.style, 'fillColor', 'none');
	var shadow = mxUtils.getValue(this.state.style, 'shadow', false);
	var opacity = parseFloat(mxUtils.getValue(this.state.style, 'opacity', false));
	
	c.translate(x, y);
	
	var bgIcon = mxUtils.getValue(this.state.style, 'bgIcon', '');
	var prIcon = mxUtils.getValue(this.state.style, 'resIcon', '');
	stencil = mxStencilRegistry.getStencil(prIcon);

	if (stencil != null && bgIcon != 'mxgraph.cisco_safe.architecture.generic_appliance')
	{
		stencil.drawShape(c, this, 0, 0, w, h);
	}
	
	c.setFillColor(strokeColor);
	c.setStrokeColor('none');
	c.setShadow(false);
	
	
	if (bgIcon == 'ellipse')
	{
		c.begin();
		
		(w < 100) ? c.ellipse(w * 0.01, h * 0.01, w * 0.98, h * 0.98) : c.ellipse(1, 1, w - 2, h - 2);
		
		c.fill();
	}
	else if (bgIcon == 'threat1')
	{
		c.begin();
		c.ellipse(w * 0.18, h * 0.16, w * 0.66, h * 0.65);
		c.fill();
	}
	else if (bgIcon == 'threat2')
	{
		c.begin();
		c.ellipse(w * 0.01, h * 0.01, w * 0.98, h * 0.6);
		c.fill();
	}
	else if (bgIcon == 'threat3')
	{
		c.begin();
		c.ellipse(w * 0.18, h * 0.2, w * 0.64, h * 0.79);
		c.fill();
	}
	else if (bgIcon == 'threat4')
	{
		c.begin();
		c.ellipse(w * 0.09, h * 0.03, w * 0.82, h * 0.77);
		c.fill();
	}
	else if (bgIcon == 'threat5')
	{
		c.begin();
		c.ellipse(w * 0.16, h * 0.01, w * 0.67, h * 0.72);
		c.fill();
	}
	else if (bgIcon == 'mxgraph.cisco_safe.architecture.generic_appliance')
	{
		c.setShadow(shadow);
		c.setFillColor(bgColor);
		
		c.begin();
		c.moveTo(0, h * 0.3);
		c.arcTo(w * 0.3, h * 0.3, 0, 0, 1, w * 0.3, 0);
		c.lineTo(w * 0.7, 0);
		c.arcTo(w * 0.3, h * 0.3, 0, 0, 1, w, h * 0.3);
		c.lineTo(w, h * 0.7);
		c.arcTo(w * 0.3, h * 0.3, 0, 0, 1, w * 0.7, h);
		c.lineTo(w * 0.3, h);
		c.arcTo(w * 0.3, h * 0.3, 0, 0, 1, 0, h * 0.7);
		c.close();
		c.fill();
		
		c.setShadow(false);

		c.setFillColor(strokeColor);

		var stencil = mxStencilRegistry.getStencil(bgIcon);
		
		if (stencil != null)
		{
			stencil.drawShape(c, this, w * 0.26, h * 0.26, w * 0.48, h * 0.48)
		}
		
		c.setAlpha(0.5);
		c.setFillColor('#ffffff');
		
		c.ellipse(w * 0.105, h * 0.48, w * 0.04, h * 0.04);
		c.fill();
		c.ellipse(w * 0.855, h * 0.48, w * 0.04, h * 0.04);
		c.fill();
		c.ellipse(w * 0.48, h * 0.105, w * 0.04, h * 0.04);
		c.fill();
		c.ellipse(w * 0.48, h * 0.855, w * 0.04, h * 0.04);
		c.fill();
		
		c.ellipse(w * 0.17, h * 0.17, w * 0.04, h * 0.04);
		c.fill();
		c.ellipse(w * 0.79, h * 0.17, w * 0.04, h * 0.04);
		c.fill();
		c.ellipse(w * 0.79, h * 0.79, w * 0.04, h * 0.04);
		c.fill();
		c.ellipse(w * 0.17, h * 0.79, w * 0.04, h * 0.04);
		c.fill();
		
		c.setAlpha(opacity / 100);

	}
	else
	{
		var stencil = mxStencilRegistry.getStencil(bgIcon);
		
		if (stencil != null)
		{
			(w < 100) ? stencil.drawShape(c, this, w * 0.01, h * 0.01, w * 0.98, h * 0.98) : stencil.drawShape(c, this, 1, 1, w - 2, h - 2);
		}
	}

	stencil = mxStencilRegistry.getStencil(prIcon);

	if (stencil != null )
	{
		c.setFillColor(fillColor);
		
		if (bgIcon == 'mxgraph.cisco_safe.architecture.generic_appliance')
		{
			stencil.drawShape(c, this, w * 0.25, h * 0.25, w * 0.5, h * 0.5)
		}
		else
		{
			stencil.drawShape(c, this, 0, 0, w, h);
		}
	}

};

mxCellRenderer.registerShape(mxShapeCiscoSafeCompositeIcon.prototype.cst.SHAPE_COMPOSITE_ICON, mxShapeCiscoSafeCompositeIcon);