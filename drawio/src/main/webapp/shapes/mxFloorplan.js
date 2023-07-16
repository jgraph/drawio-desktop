/**
 * $Id: mxFloorplan.js,v 1.3 2014/02/17 17:05:39 mate Exp $
 * Copyright (c) 2006-2014, JGraph Ltd
 */

//**********************************************************************************************************************************************************
//Wall
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxFloorplanWall(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxFloorplanWall, mxShape);

mxFloorplanWall.prototype.cst = {
		WALL : 'mxgraph.floorplan.wall',
		WALL_THICKNESS : "wallThickness"
};

mxFloorplanWall.prototype.customProperties = [
	{name:'wallThickness', dispName:'Thickness', type:'float', min:0, defVal:10}
];

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxFloorplanWall.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	this.background(c, x, y, w, h);
};

mxFloorplanWall.prototype.background = function(c, x, y, w, h)
{
	var wallTh = parseFloat(mxUtils.getValue(this.style, mxFloorplanWall.prototype.cst.WALL_THICKNESS, '10'));
	c.rect(0, h * 0.5 - wallTh * 0.5, w, wallTh);
	c.fillAndStroke();
};

mxCellRenderer.registerShape(mxFloorplanWall.prototype.cst.WALL, mxFloorplanWall);

//**********************************************************************************************************************************************************
//Wall Corner
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxFloorplanWallCorner(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxFloorplanWallCorner, mxShape);

mxFloorplanWallCorner.prototype.cst = {
		WALL_CORNER : 'mxgraph.floorplan.wallCorner',
		WALL_THICKNESS : "wallThickness"
};

mxFloorplanWallCorner.prototype.customProperties = [
	{name:'wallThickness', dispName:'Thickness', type:'float', min:0, defVal:10}
];

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxFloorplanWallCorner.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	this.background(c, x, y, w, h);
};

mxFloorplanWallCorner.prototype.background = function(c, x, y, w, h)
{
	var wallTh = parseFloat(mxUtils.getValue(this.style, mxFloorplanWallCorner.prototype.cst.WALL_THICKNESS, '10'));

	c.begin();
	c.moveTo(0, h);
	c.lineTo(0, 0);
	c.lineTo(w, 0);
	c.lineTo(w, wallTh);
	c.lineTo(wallTh, wallTh);
	c.lineTo(wallTh, h);
	c.close();
	c.fillAndStroke();
};

mxCellRenderer.registerShape(mxFloorplanWallCorner.prototype.cst.WALL_CORNER, mxFloorplanWallCorner);

//**********************************************************************************************************************************************************
//Wall U
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxFloorplanWallU(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxFloorplanWallU, mxShape);

mxFloorplanWallU.prototype.cst = {
		WALL_U : 'mxgraph.floorplan.wallU',
		WALL_THICKNESS : "wallThickness"
};

mxFloorplanWallU.prototype.customProperties = [
	{name:'wallThickness', dispName:'Thickness', type:'float', min:0, defVal:10}
];

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxFloorplanWallU.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	this.background(c, x, y, w, h);
};

mxFloorplanWallU.prototype.background = function(c, x, y, w, h)
{
	var wallTh = parseFloat(mxUtils.getValue(this.style, mxFloorplanWallU.prototype.cst.WALL_THICKNESS, '10'));

	c.begin();
	c.moveTo(0, h);
	c.lineTo(0, 0);
	c.lineTo(w, 0);
	c.lineTo(w, h);
	c.lineTo(w - wallTh, h);
	c.lineTo(w - wallTh, wallTh);
	c.lineTo(wallTh, wallTh);
	c.lineTo(wallTh, h);
	c.close();
	c.fillAndStroke();
};

mxCellRenderer.registerShape(mxFloorplanWallU.prototype.cst.WALL_U, mxFloorplanWallU);

//**********************************************************************************************************************************************************
//Room
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxFloorplanRoom(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxFloorplanRoom, mxShape);

mxFloorplanRoom.prototype.cst = {
		ROOM : 'mxgraph.floorplan.room',
		WALL_THICKNESS : "wallThickness"
};

mxFloorplanRoom.prototype.customProperties = [
	{name:'wallThickness', dispName:'Thickness', type:'float', min:0, defVal:10}
];

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxFloorplanRoom.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	this.background(c, x, y, w, h);
};

mxFloorplanRoom.prototype.background = function(c, x, y, w, h)
{
	var wallTh = parseFloat(mxUtils.getValue(this.style, mxFloorplanRoom.prototype.cst.WALL_THICKNESS, '10'));

	c.begin();
	c.moveTo(0, h);
	c.lineTo(0, 0);
	c.lineTo(w, 0);
	c.lineTo(w, h);
	c.close();
	c.moveTo(wallTh, wallTh);
	c.lineTo(wallTh, h - wallTh);
	c.lineTo(w - wallTh, h - wallTh);
	c.lineTo(w - wallTh, wallTh);
	c.close();
	c.fillAndStroke();
};

mxCellRenderer.registerShape(mxFloorplanRoom.prototype.cst.ROOM, mxFloorplanRoom);

//**********************************************************************************************************************************************************
//Window
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxFloorplanWindow(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxFloorplanWindow, mxShape);

mxFloorplanWindow.prototype.cst = {
		WINDOW : 'mxgraph.floorplan.window',
		WALL_THICKNESS : "wallThickness"
};

mxFloorplanWindow.prototype.customProperties = [
	{name:'wallThickness', dispName:'Thickness', type:'float', min:0, defVal:10}
];

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxFloorplanWindow.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	this.background(c, x, y, w, h);
};

mxFloorplanWindow.prototype.background = function(c, x, y, w, h)
{
	var wallTh = parseFloat(mxUtils.getValue(this.style, mxFloorplanWindow.prototype.cst.WALL_THICKNESS, '10'));
	c.rect(0, h * 0.5 - wallTh * 0.5, w, wallTh);
	c.fillAndStroke();
	
	c.begin();
	c.moveTo(0, h * 0.5);
	c.lineTo(w, h * 0.5);
	c.stroke();
};

mxCellRenderer.registerShape(mxFloorplanWindow.prototype.cst.WINDOW, mxFloorplanWindow);

//**********************************************************************************************************************************************************
//Dimension
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxFloorplanDimension(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxFloorplanDimension, mxShape);

mxFloorplanDimension.prototype.cst = {
		DIMENSION : 'mxgraph.floorplan.dimension'
};

mxFloorplanDimension.prototype.customProperties = [
	{name:'wallThickness', dispName:'Thickness', type:'float', min:0, defVal:10}
];

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxFloorplanDimension.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	this.background(c, x, y, w, h);
};

mxFloorplanDimension.prototype.background = function(c, x, y, w, h)
{
	c.begin();
	c.moveTo(0, 20);
	c.lineTo(w, 20);
	c.moveTo(10, 15);
	c.lineTo(0, 20);
	c.lineTo(10, 25);
	c.moveTo(w - 10, 15);
	c.lineTo(w, 20);
	c.lineTo(w - 10, 25);
	c.moveTo(0, 15);
	c.lineTo(0, h);
	c.moveTo(w, 15);
	c.lineTo(w, h);
	c.stroke();
};

mxCellRenderer.registerShape(mxFloorplanDimension.prototype.cst.DIMENSION, mxFloorplanDimension);

//**********************************************************************************************************************************************************
//Dimension Bottom
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxFloorplanDimensionBottom(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxFloorplanDimensionBottom, mxShape);

mxFloorplanDimensionBottom.prototype.cst = {
		DIMENSION : 'mxgraph.floorplan.dimensionBottom'
};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxFloorplanDimensionBottom.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	this.background(c, x, y, w, h);
};

mxFloorplanDimensionBottom.prototype.background = function(c, x, y, w, h)
{
	c.begin();
	c.moveTo(0, h - 20);
	c.lineTo(w, h - 20);
	c.moveTo(10, h - 15);
	c.lineTo(0, h - 20);
	c.lineTo(10, h - 25);
	c.moveTo(w - 10, h - 15);
	c.lineTo(w, h - 20);
	c.lineTo(w - 10, h - 25);
	c.moveTo(0, h - 15);
	c.lineTo(0, 0);
	c.moveTo(w, h - 15);
	c.lineTo(w, 0);
	c.stroke();
};

mxCellRenderer.registerShape(mxFloorplanDimensionBottom.prototype.cst.DIMENSION, mxFloorplanDimensionBottom);

//**********************************************************************************************************************************************************
//Stairs
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxFloorplanStairs(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxFloorplanStairs, mxShape);

mxFloorplanStairs.prototype.cst = {
		STAIRS : 'mxgraph.floorplan.stairs'
};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxFloorplanStairs.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	var minW = Math.max(w, 50);
	this.background(c, x, y, minW, h);
};

mxFloorplanStairs.prototype.background = function(c, x, y, w, h)
{
	c.rect(0, 0, w, h);
	c.fillAndStroke();
	
	var step = 25;
	c.setShadow(false);
	
	c.begin();
	
	for (var i = 25; i < w; i = i + step)
	{
		c.moveTo(i, 0);
		c.lineTo(i, h);
	}
	
	c.stroke();
	
	c.begin();
	c.moveTo(0, h * 0.5);
	c.lineTo(w, h * 0.5);
	c.moveTo(w - step, 0);
	c.lineTo(w, h * 0.5);
	c.lineTo(w - step, h);
	c.stroke();
};

mxCellRenderer.registerShape(mxFloorplanStairs.prototype.cst.STAIRS, mxFloorplanStairs);

////**********************************************************************************************************************************************************
////Stairs Double
////**********************************************************************************************************************************************************
///**
//* Extends mxShape.
//*/
//function mxFloorplanStairsRest(bounds, fill, stroke, strokewidth)
//{
//	mxShape.call(this);
//	this.bounds = bounds;
//	this.fill = fill;
//	this.stroke = stroke;
//	this.strokewidth = (strokewidth != null) ? strokewidth : 1;
//};
//
///**
//* Extends mxShape.
//*/
//mxUtils.extend(mxFloorplanStairsRest, mxShape);
//
//mxFloorplanStairsRest.prototype.cst = {
//		STAIRS : 'mxgraph.floorplan.stairsRest'
//};
//
//
//
///**
//* Function: paintVertexShape
//* 
//* Paints the vertex shape.
//*/
//mxFloorplanStairsRest.prototype.paintVertexShape = function(c, x, y, w, h)
//{
//	c.translate(x, y);
//	var minW = Math.max(w, 50, h);
//	var minH = Math.min(w, h);
//	this.background(c, x, y, minW, h);
//};
//
//mxFloorplanStairsRest.prototype.background = function(c, x, y, w, h)
//{
//	c.rect(0, 0, w, h);
//	c.fillAndStroke();
//	
//	var step = 25;
//	c.setShadow(false);
//	
//	c.begin();
//	
//	for (var i = 25; i < w - h * 0.5; i = i + step)
//	{
//		c.moveTo(i, 0);
//		c.lineTo(i, h);
//	}
//	
//	c.stroke();
//	
//	c.begin();
//	c.moveTo(0, h * 0.5);
//	c.lineTo(w, h * 0.5);
//	
//	c.moveTo(w, 0);
//	c.lineTo(w - h * 0.5, h * 0.5);
//	c.lineTo(w, h);
//	
//	c.moveTo(w - h * 0.5, 0);
//	c.lineTo(w - h * 0.5, h);
//	
//	c.moveTo(0, h * 0.5);
//	c.lineTo(w, h * 0.5);
//	c.stroke();
//};
//
//mxCellRenderer.registerShape(mxFloorplanStairsRest.prototype.cst.STAIRS, mxFloorplanStairsRest);

//**********************************************************************************************************************************************************
//Stairs
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxFloorplanStairsRest(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxFloorplanStairsRest, mxShape);

mxFloorplanStairsRest.prototype.cst = {
		STAIRS : 'mxgraph.floorplan.stairsRest'
};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxFloorplanStairsRest.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	var minW = Math.max(w, 50, h);
	var minH = Math.min(w, h);
	this.background(c, x, y, minW, h);
};

mxFloorplanStairsRest.prototype.background = function(c, x, y, w, h)
{
	c.rect(0, 0, w, h);
	c.fillAndStroke();
	
	var step = 25;
	c.setShadow(false);
	
	c.begin();
	
	for (var i = 25; i < w - h * 0.5; i = i + step)
	{
		c.moveTo(i, 0);
		c.lineTo(i, h);
	}
	
	c.stroke();
	
	c.begin();
	c.moveTo(0, h * 0.5);
	c.lineTo(w, h * 0.5);
	
	c.moveTo(w, 0);
	c.lineTo(w - h * 0.5, h * 0.5);
	c.lineTo(w, h);
	
	c.moveTo(w - h * 0.5, 0);
	c.lineTo(w - h * 0.5, h);
	
	c.moveTo(0, h * 0.5);
	c.lineTo(w, h * 0.5);
	c.stroke();
};

mxCellRenderer.registerShape(mxFloorplanStairsRest.prototype.cst.STAIRS, mxFloorplanStairsRest);

//**********************************************************************************************************************************************************
//Door, Left
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxFloorplanDoorLeft(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxFloorplanDoorLeft, mxShape);

mxFloorplanDoorLeft.prototype.cst = {
		DOOR_LEFT : 'mxgraph.floorplan.doorLeft'
};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxFloorplanDoorLeft.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	this.background(c, x, y, w, h);
};

mxFloorplanDoorLeft.prototype.background = function(c, x, y, w, h)
{
		c.rect(0, 0, w, 5);
		c.fillAndStroke();
		
		c.begin();
		c.moveTo(w, 5);
		c.arcTo(w, w, 0, 0, 1, 0, 5 + w);
		c.lineTo(0, 5);
		c.stroke();
};

mxCellRenderer.registerShape(mxFloorplanDoorLeft.prototype.cst.DOOR_LEFT, mxFloorplanDoorLeft);

//**********************************************************************************************************************************************************
//Door, Right
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxFloorplanDoorRight(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxFloorplanDoorRight, mxShape);

mxFloorplanDoorRight.prototype.cst = {
		DOOR_RIGHT : 'mxgraph.floorplan.doorRight'
};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxFloorplanDoorRight.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	this.background(c, x, y, w, h);
};

mxFloorplanDoorRight.prototype.background = function(c, x, y, w, h)
{
		c.rect(0, 0, w, 5);
		c.fillAndStroke();
		
		c.begin();
		c.moveTo(0, 5);
		c.arcTo(w, w, 0, 0, 0, w, 5 + w);
		c.lineTo(w, 5);
		c.stroke();
};

mxCellRenderer.registerShape(mxFloorplanDoorRight.prototype.cst.DOOR_RIGHT, mxFloorplanDoorRight);

//**********************************************************************************************************************************************************
//Door, Double
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxFloorplanDoorDouble(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxFloorplanDoorDouble, mxShape);

mxFloorplanDoorDouble.prototype.cst = {
		DOOR_DOUBLE : 'mxgraph.floorplan.doorDouble'
};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxFloorplanDoorDouble.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	this.background(c, x, y, w, h);
};

mxFloorplanDoorDouble.prototype.background = function(c, x, y, w, h)
{
	var halfW = w * 0.5; 
	c.rect(0, 0, w, 5);
	c.fillAndStroke();
	
	c.begin();
	c.moveTo(halfW, 0);
	c.lineTo(halfW, 5);
	c.moveTo(halfW, 5);
	c.arcTo(halfW, halfW, 0, 0, 1, 0, 5 + halfW);
	c.lineTo(0, 5);
	c.moveTo(halfW, 5);
	c.arcTo(halfW, halfW, 0, 0, 0, w, 5 + halfW);
	c.lineTo(w, 5);
	c.stroke();
};

mxCellRenderer.registerShape(mxFloorplanDoorDouble.prototype.cst.DOOR_DOUBLE, mxFloorplanDoorDouble);

//**********************************************************************************************************************************************************
//Door, Uneven
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxFloorplanDoorUneven(bounds, fill, stroke, strokewidth)
{
	mxShape.call(this);
	this.bounds = bounds;
	this.fill = fill;
	this.stroke = stroke;
	this.strokewidth = (strokewidth != null) ? strokewidth : 1;
	this.dx = 0.3;
};

/**
* Extends mxShape.
*/
mxUtils.extend(mxFloorplanDoorUneven, mxShape);

mxFloorplanDoorUneven.prototype.customProperties = [
	{name: 'dx', dispName: 'Door size', type: 'float', min:0, max:1, defVal:0.3}
];

mxFloorplanDoorUneven.prototype.cst = {
		DOOR_UNEVEN : 'mxgraph.floorplan.doorUneven'
};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxFloorplanDoorUneven.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	this.background(c, x, y, w, h);
};

mxFloorplanDoorUneven.prototype.background = function(c, x, y, w, h)
{
	var dx = w * Math.max(0, Math.min(w, parseFloat(mxUtils.getValue(this.style, 'dx', this.dx))));
	
	c.rect(0, 0, w, 5);
	c.fillAndStroke();
	
	c.begin();
	c.moveTo(dx, 0);
	c.lineTo(dx, 5);
	c.arcTo(dx, dx, 0, 0, 1, 0, 5 + dx);
	c.lineTo(0, 5);
	c.moveTo(dx, 5);
	c.arcTo(w - dx, w - dx, 0, 0, 0, w, 5 + w - dx);
	c.lineTo(w, 5);
	c.stroke();
};

mxCellRenderer.registerShape(mxFloorplanDoorUneven.prototype.cst.DOOR_UNEVEN, mxFloorplanDoorUneven);

Graph.handleFactory[mxFloorplanDoorUneven.prototype.cst.DOOR_UNEVEN] = function(state)
{
	var handles = [Graph.createHandle(state, ['dx'], function(bounds)
			{
				var dx = Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.state.style, 'dx', this.dx))));

				return new mxPoint(bounds.x + dx * bounds.width, bounds.y + 5);
			}, function(bounds, pt)
			{
				this.state.style['dx'] = Math.round(100 * Math.max(0, Math.min(1, (pt.x - bounds.x) / bounds.width))) / 100;
			})];

	return handles;
}

//**********************************************************************************************************************************************************
//Door, Opposing
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxFloorplanDoorOpposing(bounds, fill, stroke, strokewidth)
{
	mxShape.call(this);
	this.bounds = bounds;
	this.fill = fill;
	this.stroke = stroke;
	this.strokewidth = (strokewidth != null) ? strokewidth : 1;
	this.dx = 0.3;
};

/**
* Extends mxShape.
*/
mxUtils.extend(mxFloorplanDoorOpposing, mxShape);

mxFloorplanDoorOpposing.prototype.customProperties = [
	{name: 'dx', dispName: 'Door size', type: 'float', min:0, max:1, defVal:0.3}
];

mxFloorplanDoorOpposing.prototype.cst = {
		DOOR_OPPOSING : 'mxgraph.floorplan.doorOpposing'
};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxFloorplanDoorOpposing.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	this.background(c, x, y, w, h);
};

mxFloorplanDoorOpposing.prototype.background = function(c, x, y, w, h)
{
	var dx = w * Math.max(0, Math.min(w, parseFloat(mxUtils.getValue(this.style, 'dx', this.dx))));
	
	c.rect(0, dx, w, 5);
	c.fillAndStroke();
	
	c.begin();
	c.moveTo(dx, dx);
	c.lineTo(dx, dx + 5);
	c.arcTo(dx, dx, 0, 0, 0, 0, 0);
	c.lineTo(0, dx);
	c.moveTo(dx, dx + 5);
	c.arcTo(w - dx, w - dx, 0, 0, 0, w, 5 + w);
	c.lineTo(w, dx + 5);
	c.stroke();
};

mxCellRenderer.registerShape(mxFloorplanDoorOpposing.prototype.cst.DOOR_OPPOSING, mxFloorplanDoorOpposing);

Graph.handleFactory[mxFloorplanDoorOpposing.prototype.cst.DOOR_OPPOSING] = function(state)
{
	var handles = [Graph.createHandle(state, ['dx'], function(bounds)
			{
				var dx = Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.state.style, 'dx', this.dx))));

				return new mxPoint(bounds.x + dx * bounds.width, bounds.y + 5);
			}, function(bounds, pt)
			{
				this.state.style['dx'] = Math.round(100 * Math.max(0, Math.min(1, (pt.x - bounds.x) / bounds.width))) / 100;
			})];

	return handles;
}

//**********************************************************************************************************************************************************
//Door, Revolving
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxFloorplanDoorRevolving(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxFloorplanDoorRevolving, mxShape);

mxFloorplanDoorRevolving.prototype.cst = {
		DOOR_REVOLVING : 'mxgraph.floorplan.doorRevolving'
};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxFloorplanDoorRevolving.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	this.background(c, x, y, w, h);
};

mxFloorplanDoorRevolving.prototype.background = function(c, x, y, w, h)
{
		var d = Math.min(w, h);
		c.rect((w - d) * 0.5 , h * 0.5 - 2.5, d, 5);
		c.fillAndStroke();

		c.rect(w * 0.5 - 2.5, (h - d) * 0.5, 5, d);
		c.fillAndStroke();
		
		c.begin();
		c.ellipse((w - d) * 0.5, (h - d) * 0.5, d, d);
		c.stroke();
};

mxCellRenderer.registerShape(mxFloorplanDoorRevolving.prototype.cst.DOOR_REVOLVING, mxFloorplanDoorRevolving);

//**********************************************************************************************************************************************************
//Door, Pocket
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxFloorplanDoorPocket(bounds, fill, stroke, strokewidth)
{
	mxShape.call(this);
	this.bounds = bounds;
	this.fill = fill;
	this.stroke = stroke;
	this.strokewidth = (strokewidth != null) ? strokewidth : 1;
	this.dx = 0.5;
};

/**
* Extends mxShape.
*/
mxUtils.extend(mxFloorplanDoorPocket, mxShape);

mxFloorplanDoorPocket.prototype.customProperties = [
	{name: 'dx', dispName: 'Door size', type: 'float', min:0, max:1, defVal:0.3}
];

mxFloorplanDoorPocket.prototype.cst = {
		DOOR_POCKET : 'mxgraph.floorplan.doorPocket'
};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxFloorplanDoorPocket.prototype.paintVertexShape = function(c, x, y, w, h)
{
	var dx = w * Math.max(0, Math.min(w, parseFloat(mxUtils.getValue(this.style, 'dx', this.dx))));
	
	c.translate(x, y);

	c.rect(dx, h * 0.5 - 5, 5, 10);
	c.fillAndStroke();

	c.rect(w - 5, h * 0.5 - 5, 5, 10);
	c.fillAndStroke();
	
	c.rect(0, h * 0.5 - 2.5, w - dx, 5);
	c.fillAndStroke();
};

mxCellRenderer.registerShape(mxFloorplanDoorPocket.prototype.cst.DOOR_POCKET, mxFloorplanDoorPocket);

Graph.handleFactory[mxFloorplanDoorPocket.prototype.cst.DOOR_POCKET] = function(state)
{
	var handles = [Graph.createHandle(state, ['dx'], function(bounds)
			{
				var dx = Math.max(0, Math.min(0.5, parseFloat(mxUtils.getValue(this.state.style, 'dx', this.dx))));

				return new mxPoint(bounds.x + dx * bounds.width, bounds.y + 5);
			}, function(bounds, pt)
			{
				this.state.style['dx'] = Math.round(100 * Math.max(0, Math.min(0.5, (pt.x - bounds.x) / bounds.width))) / 100;
			})];

	return handles;
}

//**********************************************************************************************************************************************************
//Door, Double Pocket
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxFloorplanDoorDoublePocket(bounds, fill, stroke, strokewidth)
{
	mxShape.call(this);
	this.bounds = bounds;
	this.fill = fill;
	this.stroke = stroke;
	this.strokewidth = (strokewidth != null) ? strokewidth : 1;
	this.dx = 0.5;
};

/**
* Extends mxShape.
*/
mxUtils.extend(mxFloorplanDoorDoublePocket, mxShape);

mxFloorplanDoorDoublePocket.prototype.customProperties = [
	{name: 'dx', dispName: 'Door size', type: 'float', min:0, max:1, defVal:0.3}
];

mxFloorplanDoorDoublePocket.prototype.cst = {
		DOOR_DOUBLE_POCKET : 'mxgraph.floorplan.doorDoublePocket'
};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxFloorplanDoorDoublePocket.prototype.paintVertexShape = function(c, x, y, w, h)
{
	var dx = w * Math.max(0, Math.min(w, parseFloat(mxUtils.getValue(this.style, 'dx', this.dx))));
	
	c.translate(x, y);

	c.rect(dx, h * 0.5 - 5, 5, 10);
	c.fillAndStroke();

	c.rect(w - dx - 5, h * 0.5 - 5, 5, 10);
	c.fillAndStroke();
	
	c.rect(0, h * 0.5 - 2.5, w * 0.5 - dx, 5);
	c.fillAndStroke();
	
	c.rect(w * 0.5 + dx, h * 0.5 - 2.5, w * 0.5 - dx, 5);
	c.fillAndStroke();
};

mxCellRenderer.registerShape(mxFloorplanDoorDoublePocket.prototype.cst.DOOR_DOUBLE_POCKET, mxFloorplanDoorDoublePocket);

Graph.handleFactory[mxFloorplanDoorDoublePocket.prototype.cst.DOOR_DOUBLE_POCKET] = function(state)
{
	var handles = [Graph.createHandle(state, ['dx'], function(bounds)
			{
				var dx = Math.max(0, Math.min(0.25, parseFloat(mxUtils.getValue(this.state.style, 'dx', this.dx))));

				return new mxPoint(bounds.x + dx * bounds.width, bounds.y + 5);
			}, function(bounds, pt)
			{
				this.state.style['dx'] = Math.round(100 * Math.max(0, Math.min(0.25, (pt.x - bounds.x) / bounds.width))) / 100;
			})];

	return handles;
}

//**********************************************************************************************************************************************************
//Door, By-Pass
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxFloorplanDoorBypass(bounds, fill, stroke, strokewidth)
{
	mxShape.call(this);
	this.bounds = bounds;
	this.fill = fill;
	this.stroke = stroke;
	this.strokewidth = (strokewidth != null) ? strokewidth : 1;
	this.dx = 0.5;
};

/**
* Extends mxShape.
*/
mxUtils.extend(mxFloorplanDoorBypass, mxShape);

mxFloorplanDoorBypass.prototype.customProperties = [
	{name: 'dx', dispName: 'Door size', type: 'float', min:0, max:1, defVal:0.3}
];

mxFloorplanDoorBypass.prototype.cst = {
		DOOR_BYPASS : 'mxgraph.floorplan.doorBypass'
};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxFloorplanDoorBypass.prototype.paintVertexShape = function(c, x, y, w, h)
{
	var dx = w * Math.max(0, Math.min(w, parseFloat(mxUtils.getValue(this.style, 'dx', this.dx))));
	
	c.translate(x, y);

	c.rect(0, h * 0.5 - 5, 5, 10);
	c.fillAndStroke();

	c.rect(w - 5, h * 0.5 - 5, 5, 10);
	c.fillAndStroke();
	
	c.rect(0, h * 0.5, w * 0.5, 5);
	c.fillAndStroke();

	c.rect(dx, h * 0.5 - 5, w * 0.5, 5);
	c.fillAndStroke();
};

mxCellRenderer.registerShape(mxFloorplanDoorBypass.prototype.cst.DOOR_BYPASS, mxFloorplanDoorBypass);

Graph.handleFactory[mxFloorplanDoorBypass.prototype.cst.DOOR_BYPASS] = function(state)
{
	var handles = [Graph.createHandle(state, ['dx'], function(bounds)
			{
				var dx = Math.max(0, Math.min(0.5, parseFloat(mxUtils.getValue(this.state.style, 'dx', this.dx))));

				return new mxPoint(bounds.x + dx * bounds.width, bounds.y + 5);
			}, function(bounds, pt)
			{
				this.state.style['dx'] = Math.round(100 * Math.max(0, Math.min(0.5, (pt.x - bounds.x) / bounds.width))) / 100;
			})];

	return handles;
}

//**********************************************************************************************************************************************************
//Door, Bi-fold
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxFloorplanDoorBifold(bounds, fill, stroke, strokewidth)
{
	mxShape.call(this);
	this.bounds = bounds;
	this.fill = fill;
	this.stroke = stroke;
	this.strokewidth = (strokewidth != null) ? strokewidth : 1;
	this.dx = 0.5;
};

/**
* Extends mxShape.
*/
mxUtils.extend(mxFloorplanDoorBifold, mxShape);

mxFloorplanDoorBifold.prototype.customProperties = [
	{name: 'dx', dispName: 'Door size', type: 'float', min:0, max:1, defVal:0.3}
];

mxFloorplanDoorBifold.prototype.cst = {
		DOOR_BIFOLD : 'mxgraph.floorplan.doorBifold'
};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxFloorplanDoorBifold.prototype.paintVertexShape = function(c, x, y, w, h)
{
	var dx = w * Math.max(0, Math.min(w, parseFloat(mxUtils.getValue(this.style, 'dx', this.dx))));
	var strokeWidth = parseFloat(mxUtils.getValue(this.style, 'strokeWidth', this.dx));
	
	c.translate(x, y);

	c.rect(0, h - 10, 5, 10);
	c.fillAndStroke();

	c.rect(w - 5, h - 10, 5, 10);
	c.fillAndStroke();
	
	c.setStrokeWidth(strokeWidth * 3);
	
	c.begin();
	c.moveTo(5, h - 10);
	c.lineTo(Math.max((dx - 10) * 0.5 + 5, 5), 0);
	c.lineTo(Math.max(dx, 5), h - 10);
	c.moveTo(w - 5, h - 10);
	c.lineTo(w - Math.max((dx - 10) * 0.5 + 5, 5), 0);
	c.lineTo(w - Math.max(dx, 5), h - 10);
	c.stroke();
};

mxCellRenderer.registerShape(mxFloorplanDoorBifold.prototype.cst.DOOR_BIFOLD, mxFloorplanDoorBifold);

Graph.handleFactory[mxFloorplanDoorBifold.prototype.cst.DOOR_BIFOLD] = function(state)
{
	var handles = [Graph.createHandle(state, ['dx'], function(bounds)
			{
				var dx = Math.max(0, Math.min(0.5, parseFloat(mxUtils.getValue(this.state.style, 'dx', this.dx))));

				return new mxPoint(bounds.x + dx * bounds.width, bounds.y + 5);
			}, function(bounds, pt)
			{
				this.state.style['dx'] = Math.round(100 * Math.max(0, Math.min(0.5, (pt.x - bounds.x) / bounds.width))) / 100;
			})];

	return handles;
}

//**********************************************************************************************************************************************************
//Door, Sliding Glass
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxFloorplanDoorSlidingGlass(bounds, fill, stroke, strokewidth)
{
	mxShape.call(this);
	this.bounds = bounds;
	this.fill = fill;
	this.stroke = stroke;
	this.strokewidth = (strokewidth != null) ? strokewidth : 1;
	this.dx = 0.5;
};

/**
* Extends mxShape.
*/
mxUtils.extend(mxFloorplanDoorSlidingGlass, mxShape);

mxFloorplanDoorSlidingGlass.prototype.customProperties = [
	{name: 'dx', dispName: 'Door size', type: 'float', min:0, max:1, defVal:0.3}
];

mxFloorplanDoorSlidingGlass.prototype.cst = {
		DOOR_SLIDING_GLASS : 'mxgraph.floorplan.doorSlidingGlass'
};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxFloorplanDoorSlidingGlass.prototype.paintVertexShape = function(c, x, y, w, h)
{
	var dx = w * Math.max(0, Math.min(w, parseFloat(mxUtils.getValue(this.style, 'dx', this.dx))));
	
	c.translate(x, y);

	c.rect(0, h * 0.5 - 5, 5, 10);
	c.fillAndStroke();

	c.rect(w - 5, h * 0.5 - 5, 5, 10);
	c.fillAndStroke();
	
	c.rect(0, h * 0.5, w * 0.5, 2);
	c.fillAndStroke();

	c.rect(dx, h * 0.5 - 2, w * 0.5, 2);
	c.fillAndStroke();
};

mxCellRenderer.registerShape(mxFloorplanDoorSlidingGlass.prototype.cst.DOOR_SLIDING_GLASS, mxFloorplanDoorSlidingGlass);

Graph.handleFactory[mxFloorplanDoorSlidingGlass.prototype.cst.DOOR_SLIDING_GLASS] = function(state)
{
	var handles = [Graph.createHandle(state, ['dx'], function(bounds)
			{
				var dx = Math.max(0, Math.min(0.5, parseFloat(mxUtils.getValue(this.state.style, 'dx', this.dx))));

				return new mxPoint(bounds.x + dx * bounds.width, bounds.y + 5);
			}, function(bounds, pt)
			{
				this.state.style['dx'] = Math.round(100 * Math.max(0, Math.min(0.5, (pt.x - bounds.x) / bounds.width))) / 100;
			})];

	return handles;
}

//**********************************************************************************************************************************************************
//Door, Overhead
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxFloorplanOverhead(bounds, fill, stroke, strokewidth)
{
	mxShape.call(this);
	this.bounds = bounds;
	this.fill = fill;
	this.stroke = stroke;
	this.strokewidth = (strokewidth != null) ? strokewidth : 1;
	this.dx = 0.5;
};

/**
* Extends mxShape.
*/
mxUtils.extend(mxFloorplanOverhead, mxShape);

mxFloorplanOverhead.prototype.cst = {
		DOOR_OVERHEAD : 'mxgraph.floorplan.doorOverhead'
};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxFloorplanOverhead.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);

	c.rect(0, h - 10, 5, 10);
	c.fillAndStroke();

	c.rect(w - 5, h - 10, 5, 10);
	c.fillAndStroke();
	
	c.rect(5, 0, w - 10, h - 5);
	c.fillAndStroke();

};

mxCellRenderer.registerShape(mxFloorplanOverhead.prototype.cst.DOOR_OVERHEAD, mxFloorplanOverhead);

//**********************************************************************************************************************************************************
//Opening
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxFloorplanOpening(bounds, fill, stroke, strokewidth)
{
	mxShape.call(this);
	this.bounds = bounds;
	this.fill = fill;
	this.stroke = stroke;
	this.strokewidth = (strokewidth != null) ? strokewidth : 1;
	this.dx = 0.5;
};

/**
* Extends mxShape.
*/
mxUtils.extend(mxFloorplanOpening, mxShape);

mxFloorplanOpening.prototype.cst = {
		OPENING : 'mxgraph.floorplan.opening'
};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxFloorplanOpening.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);

	c.rect(0, 0, 5, h);
	c.fillAndStroke();

	c.rect(w - 5, 0, 5, h);
	c.fillAndStroke();
	
};

mxCellRenderer.registerShape(mxFloorplanOpening.prototype.cst.OPENING, mxFloorplanOpening);

//**********************************************************************************************************************************************************
//Window, Glider
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxFloorplanWindowGlider(bounds, fill, stroke, strokewidth)
{
	mxShape.call(this);
	this.bounds = bounds;
	this.fill = fill;
	this.stroke = stroke;
	this.strokewidth = (strokewidth != null) ? strokewidth : 1;
	this.dx = 0.5;
};

/**
* Extends mxShape.
*/
mxUtils.extend(mxFloorplanWindowGlider, mxShape);

mxFloorplanWindowGlider.prototype.customProperties = [
	{name: 'dx', dispName: 'Window size', type: 'float', min:0, max:1, defVal:0.3}
];

mxFloorplanWindowGlider.prototype.cst = {
		WINDOW_GLIDER : 'mxgraph.floorplan.windowGlider'
};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxFloorplanWindowGlider.prototype.paintVertexShape = function(c, x, y, w, h)
{
	var dx = w * Math.max(0, Math.min(w, parseFloat(mxUtils.getValue(this.style, 'dx', this.dx))));
	
	c.translate(x, y);

	c.rect(0, h * 0.5 - 5, w, 10);
	c.fillAndStroke();

	c.rect(0, h * 0.5, w * 0.5, 1);
	c.fillAndStroke();

	c.rect(dx, h * 0.5 - 1, w * 0.5, 1);
	c.fillAndStroke();
};

mxCellRenderer.registerShape(mxFloorplanWindowGlider.prototype.cst.WINDOW_GLIDER, mxFloorplanWindowGlider);

Graph.handleFactory[mxFloorplanWindowGlider.prototype.cst.WINDOW_GLIDER] = function(state)
{
	var handles = [Graph.createHandle(state, ['dx'], function(bounds)
			{
				var dx = Math.max(0, Math.min(0.5, parseFloat(mxUtils.getValue(this.state.style, 'dx', this.dx))));

				return new mxPoint(bounds.x + dx * bounds.width, bounds.y + 5);
			}, function(bounds, pt)
			{
				this.state.style['dx'] = Math.round(100 * Math.max(0, Math.min(0.5, (pt.x - bounds.x) / bounds.width))) / 100;
			})];

	return handles;
}

//**********************************************************************************************************************************************************
//Window, Garden
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxFloorplanWindowGarden(bounds, fill, stroke, strokewidth)
{
	mxShape.call(this);
	this.bounds = bounds;
	this.fill = fill;
	this.stroke = stroke;
	this.strokewidth = (strokewidth != null) ? strokewidth : 1;
	this.windowPanes = 3;
};

/**
* Extends mxShape.
*/
mxUtils.extend(mxFloorplanWindowGarden, mxShape);

mxFloorplanWindowGarden.prototype.customProperties = [
	{name: 'windowPanes', dispName: 'Panes', type: 'int', min:0, max:20, defVal:3}
];

mxFloorplanWindowGarden.prototype.cst = {
		WINDOW_GARDEN : 'mxgraph.floorplan.windowGarden'
};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxFloorplanWindowGarden.prototype.paintVertexShape = function(c, x, y, w, h)
{
	var windowPanes = Math.min(mxUtils.getValue(this.style, 'windowPanes', this.windowPanes), 20);
	
	var d = 2;
	var paneW = (w - 14 - (windowPanes - 1) * d) / windowPanes;
	c.translate(x, y);

	c.rect(0, h - 10, 5, 10);
	c.fillAndStroke();
	c.rect(w  - 5, h - 10, 5, 10);
	c.fillAndStroke();

	c.begin();
	c.moveTo(5, h);
	c.lineTo(5, 0);
	c.lineTo(w - 5, 0);
	c.lineTo(w - 5, h);
	c.lineTo(w - 5 - d, h);
	c.lineTo(w - 5 - d, d);
	
	for (var i = 1; i < windowPanes; i++)
	{
		c.lineTo(w - 5 - d - i * paneW - (i - 1) * d, d);
		c.lineTo(w - 5 - d - i * paneW - (i - 1) * d, h);
		c.lineTo(w - 5 - 2 * d - (i - 1) * d - i * paneW, h);
		c.lineTo(w - 5 - 2 * d - (i - 1) * d - i * paneW, d);
	}
	
	c.lineTo(5 + d, d);
	c.lineTo(5 + d, h);
	c.close();
	c.fillAndStroke();
};

mxCellRenderer.registerShape(mxFloorplanWindowGarden.prototype.cst.WINDOW_GARDEN, mxFloorplanWindowGarden);

//**********************************************************************************************************************************************************
//Window, Bow
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxFloorplanWindowBow(bounds, fill, stroke, strokewidth)
{
	mxShape.call(this);
	this.bounds = bounds;
	this.fill = fill;
	this.stroke = stroke;
	this.strokewidth = (strokewidth != null) ? strokewidth : 1;
	this.windowPanes = 3;
};

/**
* Extends mxShape.
*/
mxUtils.extend(mxFloorplanWindowBow, mxShape);

mxFloorplanWindowBow.prototype.cst = {
		WINDOW_BOW : 'mxgraph.floorplan.windowBow'
};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxFloorplanWindowBow.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);

	var d = Math.min(w * 0.5, h);
	
	c.begin();
	c.moveTo(0, (h - d) * 0.5);
	c.lineTo(d, (h + d) * 0.5);
	c.lineTo(w - d, (h + d) * 0.5);
	c.lineTo(w, (h - d) * 0.5);
	c.stroke();
};

mxCellRenderer.registerShape(mxFloorplanWindowBow.prototype.cst.WINDOW_BOW, mxFloorplanWindowBow);

//**********************************************************************************************************************************************************
//Window, Bay
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxFloorplanWindowBay(bounds, fill, stroke, strokewidth)
{
	mxShape.call(this);
	this.bounds = bounds;
	this.fill = fill;
	this.stroke = stroke;
	this.strokewidth = (strokewidth != null) ? strokewidth : 1;
	this.windowPanes = 3;
};

/**
* Extends mxShape.
*/
mxUtils.extend(mxFloorplanWindowBay, mxShape);

mxFloorplanWindowBay.prototype.cst = {
		WINDOW_BAY : 'mxgraph.floorplan.windowBay'
};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxFloorplanWindowBay.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);

	var d = Math.min(w * 0.5, h);
	
	c.begin();
	c.moveTo(0, 0);
	c.lineTo(w * 0.15, h * 0.6);
	c.lineTo(w * 0.35, h);
	c.lineTo(w * 0.65, h);
	c.lineTo(w * 0.85, h * 0.6);
	c.lineTo(w, 0);
	c.stroke();
};

mxCellRenderer.registerShape(mxFloorplanWindowBay.prototype.cst.WINDOW_BAY, mxFloorplanWindowBay);

//**********************************************************************************************************************************************************
//Door, Accordion
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxFloorplanDoorAccordion(bounds, fill, stroke, strokewidth)
{
	mxShape.call(this);
	this.bounds = bounds;
	this.fill = fill;
	this.stroke = stroke;
	this.strokewidth = (strokewidth != null) ? strokewidth : 1;
	this.dx = 0.5;
};

/**
* Extends mxShape.
*/
mxUtils.extend(mxFloorplanDoorAccordion, mxShape);

mxFloorplanDoorAccordion.prototype.customProperties = [
	{name: 'dx', dispName: 'Door size', type: 'float', min:0, max:1, defVal:0.3}
];

mxFloorplanDoorAccordion.prototype.cst = {
		DOOR_ACCORDION : 'mxgraph.floorplan.doorAccordion'
};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxFloorplanDoorAccordion.prototype.paintVertexShape = function(c, x, y, w, h)
{
	var dx = w * Math.max(0, Math.min(w, parseFloat(mxUtils.getValue(this.style, 'dx', this.dx))));
	var dx = Math.max(5, dx);
	var dx = Math.min(w - 5, dx);
	
	var strokeWidth = parseFloat(mxUtils.getValue(this.style, 'strokeWidth', this.dx));
	
	c.translate(x, y);

	c.rect(0, h * 0.5 - 5, 5, 10);
	c.fillAndStroke();

	c.rect(w - 5, h * 0.5 - 5, 5, 10);
	c.fillAndStroke();
	
	c.setStrokeWidth(strokeWidth * 3);
	
	var l = dx - 5;
	
	c.begin();
	c.moveTo(5, h * 0.5);
	c.lineTo(5 + l * 0.1, 0);
	c.lineTo(5 + l * 0.3, h);
	c.lineTo(5 + l * 0.5, 0);
	c.lineTo(5 + l * 0.7, h);
	c.lineTo(5 + l * 0.9, 0);
	c.lineTo(5 + l, h * 0.5);
	c.stroke();
};

mxCellRenderer.registerShape(mxFloorplanDoorAccordion.prototype.cst.DOOR_ACCORDION, mxFloorplanDoorAccordion);

Graph.handleFactory[mxFloorplanDoorAccordion.prototype.cst.DOOR_ACCORDION] = function(state)
{
	var handles = [Graph.createHandle(state, ['dx'], function(bounds)
			{
				var dx = Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.state.style, 'dx', this.dx))));

				return new mxPoint(bounds.x + dx * bounds.width, bounds.y + 5);
			}, function(bounds, pt)
			{
				this.state.style['dx'] = Math.round(100 * Math.max(0, Math.min(1, (pt.x - bounds.x) / bounds.width))) / 100;
			})];

	return handles;
}

//**********************************************************************************************************************************************************
//Door, Double-action
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxFloorplanDoorDoubleAction(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxFloorplanDoorDoubleAction, mxShape);

mxFloorplanDoorDoubleAction.prototype.cst = {
		DOOR_DOUBLE_ACTION : 'mxgraph.floorplan.doorDoubleAction'
};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxFloorplanDoorDoubleAction.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	this.background(c, x, y, w, h);
};

mxFloorplanDoorDoubleAction.prototype.background = function(c, x, y, w, h)
{
		c.rect(0, h * 0.5 - 2.5, w, 5);
		c.fillAndStroke();
		
		c.begin();
		c.moveTo(w, h * 0.5 + 2.5);
		c.arcTo(w, w, 0, 0, 1, 0, h * 0.5 + 2.5 + w);
		c.lineTo(0, h * 0.5 + 2.5);
		c.stroke();

		c.setDashed(true);
		
		c.begin();
		c.moveTo(w, h * 0.5 - 2.5);
		c.arcTo(w, w, 0, 0, 0, 0, h * 0.5 - 2.5 - w);
		c.lineTo(0, h * 0.5 - 2.5);
		c.stroke();
};

mxCellRenderer.registerShape(mxFloorplanDoorDoubleAction.prototype.cst.DOOR_DOUBLE_ACTION, mxFloorplanDoorDoubleAction);

