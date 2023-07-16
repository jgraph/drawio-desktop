/**
 * $Id: mxC4.js,v 1.5 2018/26/11 12:32:06 mate Exp $
 * Copyright (c) 2006-2018, JGraph Ltd
 */
//**********************************************************************************************************************************************************
// Person
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeC4Person(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxShapeC4Person, mxShape);

mxShapeC4Person.prototype.cst = {PERSONSHAPE : 'mxgraph.c4.person'};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeC4Person.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	var headSize = Math.min(w / 2, h / 3);
	var r = headSize / 2;
	
	c.ellipse(w * 0.5 - headSize * 0.5, 0, headSize, headSize);
	c.fillAndStroke();
	
	c.begin();
	c.moveTo(0, headSize * 0.8 + r);
	c.arcTo(r, r, 0, 0, 1, r, headSize * 0.8);
	c.lineTo(w - r, headSize * 0.8);
	c.arcTo(r, r, 0, 0, 1, w, headSize * 0.8 + r);
	c.lineTo(w, h - r);
	c.arcTo(r, r, 0, 0, 1, w - r, h);
	c.lineTo(r, h);
	c.arcTo(r, r, 0, 0, 1, 0, h -r);
	c.close();
	c.fillAndStroke();

	c.setShadow(false);
	
	c.ellipse(w * 0.5 - headSize * 0.5, 0, headSize, headSize);
	c.fillAndStroke();

};

mxShapeC4Person.prototype.getLabelMargins = function(rect)
{
	var headSize = Math.min(rect.width / 2, rect.height / 3);
		
	return new mxRectangle(0, headSize * 0.8, 0, 0);
};

mxCellRenderer.registerShape(mxShapeC4Person.prototype.cst.PERSONSHAPE, mxShapeC4Person);

//**********************************************************************************************************************************************************
// Person
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeC4Person2(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxShapeC4Person2, mxShape);

mxShapeC4Person2.prototype.cst = {PERSONSHAPE : 'mxgraph.c4.person2'};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeC4Person2.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	var headSize = Math.min(w * 0.45, h * 0.45);
	var r = headSize / 2;
	
	c.ellipse(w * 0.5 - headSize * 0.5, 0, headSize, headSize);
	c.fillAndStroke();
	
	c.begin();
	c.moveTo(0, headSize * 0.8 + r);
	c.arcTo(r, r, 0, 0, 1, r, headSize * 0.8);
	c.lineTo(w - r, headSize * 0.8);
	c.arcTo(r, r, 0, 0, 1, w, headSize * 0.8 + r);
	c.lineTo(w, h - r);
	c.arcTo(r, r, 0, 0, 1, w - r, h);
	c.lineTo(r, h);
	c.arcTo(r, r, 0, 0, 1, 0, h -r);
	c.close();
	c.fillAndStroke();

	c.setShadow(false);
	
	c.ellipse(w * 0.5 - headSize * 0.5, 0, headSize, headSize);
	c.fillAndStroke();

};

mxShapeC4Person2.prototype.getLabelMargins = function(rect)
{
	var headSize = Math.min(rect.width * 0.45, rect.height * 0.45);
		
	return new mxRectangle(0, headSize * 0.8, 0, 0);
};

mxCellRenderer.registerShape(mxShapeC4Person2.prototype.cst.PERSONSHAPE	, mxShapeC4Person2);

//**********************************************************************************************************************************************************
// Web Browser Container
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeC4WebBrowserContainer(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxShapeC4WebBrowserContainer, mxShape);

mxShapeC4WebBrowserContainer.prototype.cst = {WEB_BROWSER_CONTAINER_SHAPE : 'mxgraph.c4.webBrowserContainer'};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeC4WebBrowserContainer.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	var r = 8;
	
	c.begin();
	c.moveTo(0, r);
	c.arcTo(r, r, 0, 0, 1, r, 0);
	c.lineTo(w - r, 0);
	c.arcTo(r, r, 0, 0, 1, w, r);
	c.lineTo(w, h - r);
	c.arcTo(r, r, 0, 0, 1, w - r, h);
	c.lineTo(r, h);
	c.arcTo(r, r, 0, 0, 1, 0, h - r);
	c.close();
	c.fillAndStroke();

	c.setShadow(false);
	
	var ins = 5;
	var r2 = 3;
	var h2 = 12;
	
	if (w > (ins * 5 + h2 * 3) && h > (2 * h2 + 3 * ins))
	{
		c.setFillColor('#23A2D9');
		
		c.begin();
		c.moveTo(ins, ins + r2);
		c.arcTo(r2, r2, 0, 0, 1, ins + r2, ins);
		c.lineTo(w - 3 * h2 - 4 * ins - r2, ins);
		c.arcTo(r2, r2, 0, 0, 1, w - 3 * h2 - 4 * ins, ins + r2);
		c.lineTo(w - 3 * h2 - 4 * ins, ins + h2 - r2);
		c.arcTo(r2, r2, 0, 0, 1, w - 3 * h2 - 4 * ins - r2, ins + h2);
		c.lineTo(ins + r2, ins + h2);
		c.arcTo(r2, r2, 0, 0, 1, ins, ins + h2 - r2);
		c.close();
	
		c.moveTo(w - 3 * h2 - 3 * ins, ins + r2);
		c.arcTo(r2, r2, 0, 0, 1, w - 3 * h2 - 3 * ins + r2, ins);
		c.lineTo(w - 2 * h2 - 3 * ins - r2, ins);
		c.arcTo(r2, r2, 0, 0, 1, w - 2 * h2 - 3 * ins, ins + r2);
		c.lineTo(w - 2 * h2 - 3 * ins, ins + h2 - r2);
		c.arcTo(r2, r2, 0, 0, 1, w - 2 * h2 - 3 * ins - r2, ins + h2);
		c.lineTo(w - 3 * h2 - 3 * ins + r2, ins + h2);
		c.arcTo(r2, r2, 0, 0, 1, w - 3 * h2 - 3 * ins, ins + h2 - r2);
		c.close();
	
		c.moveTo(w - 2 * h2 - 2 * ins, ins + r2);
		c.arcTo(r2, r2, 0, 0, 1, w - 2 * h2 - 2 * ins + r2, ins);
		c.lineTo(w - h2 - 2 * ins - r2, ins);
		c.arcTo(r2, r2, 0, 0, 1, w - h2 - 2 * ins, ins + r2);
		c.lineTo(w - h2 - 2 * ins, ins + h2 - r2);
		c.arcTo(r2, r2, 0, 0, 1, w - h2 - 2 * ins - r2, ins + h2);
		c.lineTo(w - 2 * h2 - 2 * ins + r2, ins + h2);
		c.arcTo(r2, r2, 0, 0, 1, w - 2 * h2 - 2 * ins, ins + h2 - r2);
		c.close();
	
		c.moveTo(w - h2 - ins, ins + r2);
		c.arcTo(r2, r2, 0, 0, 1, w - h2 - ins + r2, ins);
		c.lineTo(w - ins - r2, ins);
		c.arcTo(r2, r2, 0, 0, 1, w - ins, ins + r2);
		c.lineTo(w - ins, ins + h2 - r2);
		c.arcTo(r2, r2, 0, 0, 1, w - ins - r2, ins + h2);
		c.lineTo(w - h2 - ins + r2, ins + h2);
		c.arcTo(r2, r2, 0, 0, 1, w - h2 - ins, ins + h2 - r2);
		c.close();

		c.moveTo(ins, h2 + 2 * ins + r);
		c.arcTo(r, r, 0, 0, 1, ins + r, h2 + 2 * ins);
		c.lineTo(w - r - ins, h2 + 2 * ins);
		c.arcTo(r, r, 0, 0, 1, w - ins, h2 + 2 * ins + r);
		c.lineTo(w - ins, h - r - ins);
		c.arcTo(r, r, 0, 0, 1, w - r - ins, h - ins);
		c.lineTo(ins + r, h - ins);
		c.arcTo(r, r, 0, 0, 1, ins, h - r - ins);
		c.close();
		c.fill();
		
		c.fill();
	}
};

mxCellRenderer.registerShape(mxShapeC4WebBrowserContainer.prototype.cst.WEB_BROWSER_CONTAINER_SHAPE, mxShapeC4WebBrowserContainer);

//**********************************************************************************************************************************************************
// Web Browser Container v2
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeC4WebBrowserContainer2(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxShapeC4WebBrowserContainer2, mxShape);

mxShapeC4WebBrowserContainer2.prototype.cst = {WEB_BROWSER_CONTAINER2_SHAPE : 'mxgraph.c4.webBrowserContainer2'};

mxShapeC4WebBrowserContainer2.prototype.customProperties = [
	{name: 'strokeColor2', dispName: 'Outline color', type: 'color', defVal: '#0E7DAD'}
];

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeC4WebBrowserContainer2.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	var r = 8;
	var fillColor = mxUtils.getValue(this.state.style, 'fillColor', '#ffffff');
	var strokeColor = mxUtils.getValue(this.state.style, 'strokeColor', '#000000');
	var strokeColor2 = mxUtils.getValue(this.state.style, 'strokeColor2', '#0E7DAD');

	c.setStrokeColor(strokeColor2);
	c.setFillColor(strokeColor);
	
	c.begin();
	c.moveTo(0, r);
	c.arcTo(r, r, 0, 0, 1, r, 0);
	c.lineTo(w - r, 0);
	c.arcTo(r, r, 0, 0, 1, w, r);
	c.lineTo(w, h - r);
	c.arcTo(r, r, 0, 0, 1, w - r, h);
	c.lineTo(r, h);
	c.arcTo(r, r, 0, 0, 1, 0, h - r);
	c.close();
	c.fillAndStroke();

	c.setShadow(false);
	
	var ins = 5;
	var r2 = 3;
	var h2 = 12;
	
	if (w > (ins * 5 + h2 * 3) && h > (2 * h2 + 3 * ins))
	{
		//set fill color to fill color
		c.setFillColor(fillColor);
		
		c.begin();
		c.moveTo(ins, ins + r2);
		c.arcTo(r2, r2, 0, 0, 1, ins + r2, ins);
		c.lineTo(w - 3 * h2 - 4 * ins - r2, ins);
		c.arcTo(r2, r2, 0, 0, 1, w - 3 * h2 - 4 * ins, ins + r2);
		c.lineTo(w - 3 * h2 - 4 * ins, ins + h2 - r2);
		c.arcTo(r2, r2, 0, 0, 1, w - 3 * h2 - 4 * ins - r2, ins + h2);
		c.lineTo(ins + r2, ins + h2);
		c.arcTo(r2, r2, 0, 0, 1, ins, ins + h2 - r2);
		c.close();
	
		c.moveTo(w - 3 * h2 - 3 * ins, ins + r2);
		c.arcTo(r2, r2, 0, 0, 1, w - 3 * h2 - 3 * ins + r2, ins);
		c.lineTo(w - 2 * h2 - 3 * ins - r2, ins);
		c.arcTo(r2, r2, 0, 0, 1, w - 2 * h2 - 3 * ins, ins + r2);
		c.lineTo(w - 2 * h2 - 3 * ins, ins + h2 - r2);
		c.arcTo(r2, r2, 0, 0, 1, w - 2 * h2 - 3 * ins - r2, ins + h2);
		c.lineTo(w - 3 * h2 - 3 * ins + r2, ins + h2);
		c.arcTo(r2, r2, 0, 0, 1, w - 3 * h2 - 3 * ins, ins + h2 - r2);
		c.close();
	
		c.moveTo(w - 2 * h2 - 2 * ins, ins + r2);
		c.arcTo(r2, r2, 0, 0, 1, w - 2 * h2 - 2 * ins + r2, ins);
		c.lineTo(w - h2 - 2 * ins - r2, ins);
		c.arcTo(r2, r2, 0, 0, 1, w - h2 - 2 * ins, ins + r2);
		c.lineTo(w - h2 - 2 * ins, ins + h2 - r2);
		c.arcTo(r2, r2, 0, 0, 1, w - h2 - 2 * ins - r2, ins + h2);
		c.lineTo(w - 2 * h2 - 2 * ins + r2, ins + h2);
		c.arcTo(r2, r2, 0, 0, 1, w - 2 * h2 - 2 * ins, ins + h2 - r2);
		c.close();
	
		c.moveTo(w - h2 - ins, ins + r2);
		c.arcTo(r2, r2, 0, 0, 1, w - h2 - ins + r2, ins);
		c.lineTo(w - ins - r2, ins);
		c.arcTo(r2, r2, 0, 0, 1, w - ins, ins + r2);
		c.lineTo(w - ins, ins + h2 - r2);
		c.arcTo(r2, r2, 0, 0, 1, w - ins - r2, ins + h2);
		c.lineTo(w - h2 - ins + r2, ins + h2);
		c.arcTo(r2, r2, 0, 0, 1, w - h2 - ins, ins + h2 - r2);
		c.close();

		c.moveTo(ins, h2 + 2 * ins + r);
		c.arcTo(r, r, 0, 0, 1, ins + r, h2 + 2 * ins);
		c.lineTo(w - r - ins, h2 + 2 * ins);
		c.arcTo(r, r, 0, 0, 1, w - ins, h2 + 2 * ins + r);
		c.lineTo(w - ins, h - r - ins);
		c.arcTo(r, r, 0, 0, 1, w - r - ins, h - ins);
		c.lineTo(ins + r, h - ins);
		c.arcTo(r, r, 0, 0, 1, ins, h - r - ins);
		c.close();
		c.fill();
		
		c.fill();
	}
};

mxCellRenderer.registerShape(mxShapeC4WebBrowserContainer2.prototype.cst.WEB_BROWSER_CONTAINER2_SHAPE, mxShapeC4WebBrowserContainer2);

