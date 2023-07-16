/**
 * $Id: mxElectrical.js,v 1.0 2016/10/25 17:05:39 mate Exp $
 * Copyright (c) 2006-2016, JGraph Ltd
 */

//**********************************************************************************************************************************************************
//Test Point
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeElectricalTestPoint(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxShapeElectricalTestPoint, mxShape);

mxShapeElectricalTestPoint.prototype.cst = {
		SHAPE_TEST_POINT : 'mxgraph.electrical.transmission.testPoint'
};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeElectricalTestPoint.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	var strokeColor = mxUtils.getValue(this.style, mxConstants.STYLE_STROKECOLOR, '#000000');

	var size = Math.min(w, h); 
	
	c.setFillColor(strokeColor);
	c.begin();
	c.ellipse(w * 0.5 - size / 2, 0, size, size);
	c.fillAndStroke();
	
	if (h > w)
	{
		c.begin();
		c.moveTo(w * 0.5, size);
		c.lineTo(w * 0.5, h);
		c.stroke();
	}
};

mxCellRenderer.registerShape(mxShapeElectricalTestPoint.prototype.cst.SHAPE_TEST_POINT, mxShapeElectricalTestPoint);

mxShapeElectricalTestPoint.prototype.constraints = [
	new mxConnectionConstraint(new mxPoint(0.5, 0), true),
	new mxConnectionConstraint(new mxPoint(0.5, 1), true)
	];

//**********************************************************************************************************************************************************
//Straight Bus
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeElectricalStraightBus(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxShapeElectricalStraightBus, mxShape);

mxShapeElectricalStraightBus.prototype.cst = {
		SHAPE_STRAIGHT_BUS : 'mxgraph.electrical.transmission.straightBus'
};



/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeElectricalStraightBus.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);

	var x1 = w * 0.2;
	var y1 = 0;
	
	if (w > h)
	{
		y1 = h * 0.5;
	}
	else
	{
		y1 = w / 2;
	}
	
	c.begin();
	c.moveTo(w - x1, 0);
	c.lineTo(w - x1, h - y1);
	c.lineTo(w, h - y1);
	c.lineTo(w * 0.5, h);
	c.lineTo(0, h - y1);
	c.lineTo(x1, h - y1);
	c.lineTo(x1, 0);
	c.fillAndStroke();
};

mxCellRenderer.registerShape(mxShapeElectricalStraightBus.prototype.cst.SHAPE_STRAIGHT_BUS, mxShapeElectricalStraightBus);

mxShapeElectricalStraightBus.prototype.constraints = [
	new mxConnectionConstraint(new mxPoint(0.5, 0), true),
	new mxConnectionConstraint(new mxPoint(0.5, 1), true)
	];

//**********************************************************************************************************************************************************
//Two-Line Bus Elbow
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeElectricalTwoLineBusElbow(bounds, fill, stroke, strokewidth)
{
	mxShape.call(this);
	this.bounds = bounds;
	this.fill = fill;
	this.stroke = stroke;
	this.strokewidth = (strokewidth != null) ? strokewidth : 1;
	this.notch = 0;
};

/**
* Extends mxShape.
*/
mxUtils.extend(mxShapeElectricalTwoLineBusElbow, mxShape);

mxShapeElectricalTwoLineBusElbow.prototype.cst = {
		SHAPE_TWO_LINE_BUS_ELBOW : 'mxgraph.electrical.transmission.twoLineBusElbow'
};

mxShapeElectricalTwoLineBusElbow.prototype.customProperties = [
	{name:'notch', dispName:'Spacing', type:'float', min:0, defVal:25}
];

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeElectricalTwoLineBusElbow.prototype.paintVertexShape = function(c, x, y, w, h)
{
	var notch = Math.max(0, Math.min(w, parseFloat(mxUtils.getValue(this.style, 'notch', this.notch))));

	c.translate(x, y);

	c.begin();
	c.moveTo(0, h);
	c.lineTo(w, h);
	c.lineTo(w, 0);
	c.stroke();
	
	var wn = Math.min(w, notch);
	var hn = Math.min(h, notch);
	
	c.begin();
	c.moveTo(0, h - hn);
	c.lineTo(w - wn, h - hn);
	c.lineTo(w - wn, 0);
	c.stroke();
};

mxCellRenderer.registerShape(mxShapeElectricalTwoLineBusElbow.prototype.cst.SHAPE_TWO_LINE_BUS_ELBOW, mxShapeElectricalTwoLineBusElbow);

mxShapeElectricalTwoLineBusElbow.prototype.constraints = null;

Graph.handleFactory[mxShapeElectricalTwoLineBusElbow.prototype.cst.SHAPE_TWO_LINE_BUS_ELBOW] = function(state)
{
	var handles = [Graph.createHandle(state, ['notch'], function(bounds)
	{
		var notch = Math.max(Math.min(bounds.height, parseFloat(mxUtils.getValue(this.state.style, 'notch', this.notch))), 0);

		return new mxPoint(bounds.x + bounds.width / 4, bounds.y + bounds.height - notch);
	}, function(bounds, pt)
	{
		this.state.style['notch'] = Math.round(0.2 * Math.max(0, bounds.width - pt.y + bounds.y)) / 0.2;
	})];
			
	return handles;

}

//**********************************************************************************************************************************************************
//Three-Line Bus Elbow
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeElectricalThreeLineBusElbow(bounds, fill, stroke, strokewidth)
{
	mxShape.call(this);
	this.bounds = bounds;
	this.fill = fill;
	this.stroke = stroke;
	this.strokewidth = (strokewidth != null) ? strokewidth : 1;
	this.notch = 0;
};

/**
* Extends mxShape.
*/
mxUtils.extend(mxShapeElectricalThreeLineBusElbow, mxShape);

mxShapeElectricalThreeLineBusElbow.prototype.cst = {
		SHAPE_THREE_LINE_BUS_ELBOW : 'mxgraph.electrical.transmission.threeLineBusElbow'
};

mxShapeElectricalThreeLineBusElbow.prototype.customProperties = [
	{name:'notch', dispName:'Spacing', type:'float', min:0, defVal:30}
];

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeElectricalThreeLineBusElbow.prototype.paintVertexShape = function(c, x, y, w, h)
{
	var notch = Math.max(0, Math.min(w, parseFloat(mxUtils.getValue(this.style, 'notch', this.notch))));

	c.translate(x, y);

	c.begin();
	c.moveTo(0, h);
	c.lineTo(w, h);
	c.lineTo(w, 0);
	c.stroke();
	
	var wn = Math.min(w, notch);
	var hn = Math.min(h, notch);
	
	c.begin();
	c.moveTo(0, h - hn);
	c.lineTo(w - wn, h - hn);
	c.lineTo(w - wn, 0);
	c.stroke();
	
	c.begin();
	c.moveTo(0, h - hn / 2);
	c.lineTo(w - wn / 2, h - hn / 2);
	c.lineTo(w - wn / 2, 0);
	c.stroke();
};

mxCellRenderer.registerShape(mxShapeElectricalThreeLineBusElbow.prototype.cst.SHAPE_THREE_LINE_BUS_ELBOW, mxShapeElectricalThreeLineBusElbow);

mxShapeElectricalThreeLineBusElbow.prototype.constraints = null;

Graph.handleFactory[mxShapeElectricalThreeLineBusElbow.prototype.cst.SHAPE_THREE_LINE_BUS_ELBOW] = function(state)
{
	var handles = [Graph.createHandle(state, ['notch'], function(bounds)
	{
		var notch = Math.max(Math.min(bounds.height, parseFloat(mxUtils.getValue(this.state.style, 'notch', this.notch))), 0);

		return new mxPoint(bounds.x + bounds.width / 4, bounds.y + bounds.height - notch);
	}, function(bounds, pt)
	{
		this.state.style['notch'] = Math.round(0.2 * Math.max(0, bounds.width - pt.y + bounds.y)) / 0.2;
	})];
			
	return handles;
}

//**********************************************************************************************************************************************************
//Four-Line Bus Elbow
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeElectricalFourLineBusElbow(bounds, fill, stroke, strokewidth)
{
	mxShape.call(this);
	this.bounds = bounds;
	this.fill = fill;
	this.stroke = stroke;
	this.strokewidth = (strokewidth != null) ? strokewidth : 1;
	this.notch = 0;
};

/**
* Extends mxShape.
*/
mxUtils.extend(mxShapeElectricalFourLineBusElbow, mxShape);

mxShapeElectricalFourLineBusElbow.prototype.cst = {
		SHAPE_FOUR_LINE_BUS_ELBOW : 'mxgraph.electrical.transmission.fourLineBusElbow'
};

mxShapeElectricalFourLineBusElbow.prototype.customProperties = [
	{name:'notch', dispName:'Spacing', type:'float', min:0, defVal:75}
];

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeElectricalFourLineBusElbow.prototype.paintVertexShape = function(c, x, y, w, h)
{
	var notch = Math.max(0, Math.min(w, parseFloat(mxUtils.getValue(this.style, 'notch', this.notch))));

	c.translate(x, y);

	c.begin();
	c.moveTo(0, h);
	c.lineTo(w, h);
	c.lineTo(w, 0);
	c.stroke();
	
	var wn = Math.min(w, notch);
	var hn = Math.min(h, notch);
	
	c.begin();
	c.moveTo(0, h - hn);
	c.lineTo(w - wn, h - hn);
	c.lineTo(w - wn, 0);
	c.stroke();
	
	c.begin();
	c.moveTo(0, h - hn / 3);
	c.lineTo(w - wn / 3, h - hn / 3);
	c.lineTo(w - wn / 3, 0);
	c.stroke();
	
	c.begin();
	c.moveTo(0, h - hn * 2 / 3);
	c.lineTo(w - wn * 2 / 3, h - hn * 2 / 3);
	c.lineTo(w - wn * 2 / 3, 0);
	c.stroke();
};

mxCellRenderer.registerShape(mxShapeElectricalFourLineBusElbow.prototype.cst.SHAPE_FOUR_LINE_BUS_ELBOW, mxShapeElectricalFourLineBusElbow);

mxShapeElectricalFourLineBusElbow.prototype.constraints = null;

Graph.handleFactory[mxShapeElectricalFourLineBusElbow.prototype.cst.SHAPE_FOUR_LINE_BUS_ELBOW] = function(state)
{
	var handles = [Graph.createHandle(state, ['notch'], function(bounds)
	{
		var notch = Math.max(Math.min(bounds.height, parseFloat(mxUtils.getValue(this.state.style, 'notch', this.notch))), 0);

		return new mxPoint(bounds.x + bounds.width / 4, bounds.y + bounds.height - notch);
	}, function(bounds, pt)
	{
		this.state.style['notch'] = Math.round(0.2 * Math.max(0, bounds.width - pt.y + bounds.y)) / 0.2;
	})];
			
	return handles;
}

//**********************************************************************************************************************************************************
//Four-Line Bus Elbow
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeElectricalEightLineBusElbow(bounds, fill, stroke, strokewidth)
{
	mxShape.call(this);
	this.bounds = bounds;
	this.fill = fill;
	this.stroke = stroke;
	this.strokewidth = (strokewidth != null) ? strokewidth : 1;
	this.notch = 0;
};

/**
* Extends mxShape.
*/
mxUtils.extend(mxShapeElectricalEightLineBusElbow, mxShape);

mxShapeElectricalEightLineBusElbow.prototype.cst = {
		SHAPE_EIGHT_LINE_BUS_ELBOW : 'mxgraph.electrical.transmission.eightLineBusElbow'
};

mxShapeElectricalEightLineBusElbow.prototype.customProperties = [
	{name:'notch', dispName:'Spacing', type:'float', min:0, defVal:180}
];

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeElectricalEightLineBusElbow.prototype.paintVertexShape = function(c, x, y, w, h)
{
	var notch = Math.max(0, Math.min(w, parseFloat(mxUtils.getValue(this.style, 'notch', this.notch))));

	c.translate(x, y);

	c.begin();
	c.moveTo(0, h);
	c.lineTo(w, h);
	c.lineTo(w, 0);
	c.stroke();
	
	var wn = Math.min(w, notch);
	var hn = Math.min(h, notch);
	
	c.begin();
	c.moveTo(0, h - hn);
	c.lineTo(w - wn, h - hn);
	c.lineTo(w - wn, 0);
	c.stroke();
	
	c.begin();
	c.moveTo(0, h - hn / 7);
	c.lineTo(w - wn / 7, h - hn / 7);
	c.lineTo(w - wn / 7, 0);
	c.stroke();
	
	c.begin();
	c.moveTo(0, h - hn * 2 / 7);
	c.lineTo(w - wn * 2 / 7, h - hn * 2 / 7);
	c.lineTo(w - wn * 2 / 7, 0);
	c.stroke();
	
	c.begin();
	c.moveTo(0, h - hn * 3 / 7);
	c.lineTo(w - wn * 3 / 7, h - hn * 3 / 7);
	c.lineTo(w - wn * 3 / 7, 0);
	c.stroke();
	
	c.begin();
	c.moveTo(0, h - hn * 4 / 7);
	c.lineTo(w - wn * 4 / 7, h - hn * 4 / 7);
	c.lineTo(w - wn * 4 / 7, 0);
	c.stroke();
	
	c.begin();
	c.moveTo(0, h - hn * 5 / 7);
	c.lineTo(w - wn * 5 / 7, h - hn * 5 / 7);
	c.lineTo(w - wn * 5 / 7, 0);
	c.stroke();
	
	c.begin();
	c.moveTo(0, h - hn * 6 / 7);
	c.lineTo(w - wn * 6 / 7, h - hn * 6 / 7);
	c.lineTo(w - wn * 6 / 7, 0);
	c.stroke();
	
};

mxCellRenderer.registerShape(mxShapeElectricalEightLineBusElbow.prototype.cst.SHAPE_EIGHT_LINE_BUS_ELBOW, mxShapeElectricalEightLineBusElbow);

mxShapeElectricalEightLineBusElbow.prototype.constraints = null;

Graph.handleFactory[mxShapeElectricalEightLineBusElbow.prototype.cst.SHAPE_EIGHT_LINE_BUS_ELBOW] = function(state)
{
	var handles = [Graph.createHandle(state, ['notch'], function(bounds)
	{
		var notch = Math.max(Math.min(bounds.height, parseFloat(mxUtils.getValue(this.state.style, 'notch', this.notch))), 0);

		return new mxPoint(bounds.x + bounds.width / 4, bounds.y + bounds.height - notch);
	}, function(bounds, pt)
	{
		this.state.style['notch'] = Math.round(0.2 * Math.max(0, bounds.width - pt.y + bounds.y)) / 0.2;
	})];
			
	return handles;
}

//**********************************************************************************************************************************************************
//Logic Gate
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeElectricalLogicGate(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxShapeElectricalLogicGate, mxShape);

mxShapeElectricalLogicGate.prototype.cst = {
		SHAPE_LOGIC_GATE : 'mxgraph.electrical.logic_gates.logic_gate'
};

mxShapeElectricalLogicGate.prototype.customProperties = [
	{name: 'operation', dispName: 'Operation', type: 'enum', defVal:'and',
		enumList:[
			{val:'and', dispName:'And'},
			{val:'or', dispName:'Or'},
			{val:'xor', dispName:'Xor'}
		]},
	{name: 'numInputs', dispName: 'Inputs', type: 'int', min:2, defVal:2},
	{name: 'negating', dispName: 'Negating', type: 'bool', defVal:0}
];

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeElectricalLogicGate.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	var numInputs = parseInt(mxUtils.getValue(this.style, 'numInputs', '2'));
	var spacing = h / numInputs;
	var currH = spacing * 0.5;

	c.begin();
	c.moveTo(w * 0.8, h * 0.5);
	c.lineTo(w, h * 0.5);

	var operation = mxUtils.getValue(this.style, 'operation', 'and');

	for (var i = 0; i < numInputs; i++)
	{
		c.moveTo(0, currH);
		
		if (operation == 'and')
		{
			c.lineTo(w * 0.2, currH);
		}
		else
		{
			c.lineTo(w * 0.23, currH);
		}
		
		currH = currH + spacing;
	}

	c.stroke();


	switch(operation) {
	  case 'xor':
			c.begin();
			c.moveTo(w * 0.1, 0);
			c.arcTo(w * 0.6, h, 0, 0, 1, w * 0.1, h);
			c.stroke();
			//no break operation needed, XOR needs to draw an OR shape too
	  case 'or':
			c.begin();
			c.moveTo(w * 0.4, 0);
			c.arcTo(w * 0.45, h * 0.83, 0, 0, 1, w * 0.8, h * 0.5);
			c.arcTo(w * 0.45, h * 0.83, 0, 0, 1, w * 0.4, h);
			c.lineTo(w * 0.15, h);
			c.arcTo(w * 0.6, h, 0, 0, 0, w * 0.15, 0);
			c.close();
			c.fillAndStroke();
	    break;
	  default:
			c.begin();
			c.moveTo(w * 0.2, 0);
			c.lineTo(w * 0.5, 0);
			c.arcTo(w * 0.3, h * 0.5, 0, 0, 1, w * 0.5, h);
			c.lineTo(w * 0.2, h);
			c.close();
			c.fillAndStroke();
	};
	
	var negating = mxUtils.getValue(this.style, 'negating', '0');

	if (negating == '1')
	{
		var negSize;
		
		if(this.style.negSize)
		{
			var tmpSize = parseFloat(mxUtils.getValue(this.style, 'negSize', '0.13'));
			negSize = Math.min(w * tmpSize * 0.5, h * tmpSize);
		}
		else
		{
			negSize = Math.min(w * 0.04, h * 0.07);
		}
		
		c.begin();
		c.ellipse(w * 0.8, h * 0.5 - negSize * 0.5, negSize, negSize);
		c.fillAndStroke();
	}
};

mxCellRenderer.registerShape(mxShapeElectricalLogicGate.prototype.cst.SHAPE_LOGIC_GATE, mxShapeElectricalLogicGate);

mxShapeElectricalLogicGate.prototype.getConstraints = function(style)
{
	var constr = [new mxConnectionConstraint(new mxPoint(1, 0.5), false)];
	
	var numInputs = parseInt(mxUtils.getValue(style, 'numInputs', '2'));
	var spacing = 1 / numInputs;
	var currH = spacing * 0.5;

	for (var i = 0; i < numInputs; i++)
	{
		constr.push(new mxConnectionConstraint(new mxPoint(0, currH), false));
		currH = currH + spacing;
	}

	return (constr);
}

//**********************************************************************************************************************************************************
//Buffer
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeElectricalBuffer(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxShapeElectricalBuffer, mxShape);

mxShapeElectricalBuffer.prototype.cst = {
		SHAPE_BUFFER2 : 'mxgraph.electrical.logic_gates.buffer2'
};

mxShapeElectricalBuffer.prototype.customProperties = [
	{name: 'negating', dispName: 'Negating', type: 'bool', defVal:0}
];

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeElectricalBuffer.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);

	c.begin();
	c.moveTo(0, h * 0.5);
	c.lineTo(w * 0.2, h * 0.5);
	c.moveTo(w * 0.8, h * 0.5);
	c.lineTo(w, h * 0.5);
	c.stroke();
	
	c.begin();
	c.moveTo(w * 0.2, 0);
	c.lineTo(w * 0.8, h * 0.5);
	c.lineTo(w * 0.2, h);
	c.close();
	c.fillAndStroke();
	
	var negating = mxUtils.getValue(this.style, 'negating', '0');

	if (negating == '1')
	{
		var negSize = Math.min(w * 0.04, h * 0.07);
		c.begin();
		c.ellipse(w * 0.8, h * 0.5 - negSize * 0.5, negSize, negSize);
		c.fillAndStroke();
	}
};

mxCellRenderer.registerShape(mxShapeElectricalBuffer.prototype.cst.SHAPE_BUFFER2, mxShapeElectricalBuffer);

mxShapeElectricalBuffer.prototype.constraints = [
    new mxConnectionConstraint(new mxPoint(0, 0.5), true),
    new mxConnectionConstraint(new mxPoint(1, 0.5), true)
    ];

//**********************************************************************************************************************************************************
//Dual In-Line IC
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeElectricalDualInLineIC(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxShapeElectricalDualInLineIC, mxShape);

mxShapeElectricalDualInLineIC.prototype.cst = {
		SHAPE_DUAL_INLINE_IC : 'mxgraph.electrical.logic_gates.dual_inline_ic'
};

mxShapeElectricalDualInLineIC.prototype.customProperties = [
	{name: 'pinStyle', dispName: 'Pin Style', type: 'enum', defVal:'line',
		enumList:[
			{val:'line', dispName:'Line'},
			{val:'square', dispName:'Square'}
		]},
	{name: 'startPin', dispName: 'Starting Pin', type: 'enum', defVal:'n',
		enumList:[
			{val:'n', dispName:'N'},
			{val:'e', dispName:'E'},
			{val:'s', dispName:'S'},
			{val:'w', dispName:'W'}
		]},
	{name: 'pinSpacing', dispName: 'Pin Spacing', type: 'float', min:1, defVal:20},
	{name: 'pinLabelType', dispName: 'Pin Label Type', type: 'enum', defVal:'gen',
		enumList:[
			{val:'gen', dispName:'Generated'},
			{val:'cust', dispName:'Custom'}
		]},
	{name: 'labelCount', dispName: 'Number of Labels', type: 'int', defVal: 20, dependentProps: ['labelNames']},
	{name: 'labelNames', dispName: 'Label Names', type: 'staticArr', subType: 'string', sizeProperty: 'labelCount', subDefVal: 'a'}
];

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeElectricalDualInLineIC.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	var fontColor = mxUtils.getValue(this.style, 'fontColor', '#000000');
	c.setFontColor(fontColor);
	var startPin = mxUtils.getValue(this.style, 'startPin', 'n');
	var pinLabelType = mxUtils.getValue(this.style, 'pinLabelType', 'gen');
	var labelNames = decodeURIComponent(mxUtils.getValue(this.style, 'labelNames', '').toString()).split(',');

	c.begin();
	
	if (startPin == 'n' || startPin == 's')
	{
		c.rect(10, 0, w - 20, h);
	}
	else
	{
		c.rect(0, 10, w, h - 20);
	}

	c.fillAndStroke();

	var pinSpacing = parseFloat(mxUtils.getValue(this.style, 'pinSpacing', '20'));
	var pinStyle = mxUtils.getValue(this.style, 'pinStyle', 'line');
	var fontSize = parseFloat(mxUtils.getValue(this.style, 'fontSize', '12'));
	
	if (startPin == 'n' || startPin == 's')
	{
		var pinsOne = parseInt(h / pinSpacing);
	}
	else
	{
		var pinsOne = parseInt(w / pinSpacing);
	}
	
	if (pinStyle == 'line')
	{
		c.setFontSize(fontSize * 0.8);
		var pinCount = 1;
		var currH = pinSpacing * 0.5;
		
		c.begin();
		
		if (startPin == 'n' || startPin == 's')
		{
			while (pinCount * pinSpacing <= h)
			{
				c.moveTo(0, currH);
				c.lineTo(10, currH);
				c.moveTo(w - 10, currH);
				c.lineTo(w, currH);
		
				if (startPin == 'n')
				{
					var currPinNum = pinCount;
				}
				else
				{
					var currPinNum = pinsOne + pinCount;
				}

				if (pinLabelType == 'gen')
				{
					c.text(20, currH, 0, 0, currPinNum.toString(), mxConstants.ALIGN_LEFT, mxConstants.ALIGN_MIDDLE, 0, null, 0, 0, 0);
				}
				else if (currPinNum - 1 < labelNames.length)
				{
					c.text(20, currH, 0, 0, labelNames[currPinNum - 1].toString(), mxConstants.ALIGN_LEFT, mxConstants.ALIGN_MIDDLE, 0, null, 0, 0, 0);
				}
				
				if (startPin == 'n')
				{
					var pc2 = 2 * pinsOne - pinCount + 1;
				}
				else
				{
					var pc2 = pinsOne - pinCount + 1;
				}
				
				if (pinLabelType == 'gen')
				{
					c.text(w - 20, currH, 0, 0, pc2.toString(), mxConstants.ALIGN_RIGHT, mxConstants.ALIGN_MIDDLE, 0, null, 0, 0, 0);
				}
				else if (pc2 - 1 < labelNames.length)
				{
					c.text(w - 20, currH, 0, 0, labelNames[pc2 - 1].toString(), mxConstants.ALIGN_RIGHT, mxConstants.ALIGN_MIDDLE, 0, null, 0, 0, 0);
				}
				
				currH = currH + pinSpacing;
				pinCount++;
			}
		}
		else
		{
			while (pinCount * pinSpacing <= w)
			{
				c.moveTo(currH, 0);
				c.lineTo(currH, 10);
				c.moveTo(currH, h - 10);
				c.lineTo(currH, h);
		
				if (startPin == 'e')
				{
					var currPinNum = pinsOne - pinCount + 1;
				}
				else
				{
					var currPinNum = 2 * pinsOne - pinCount + 1;
				}
				
				if (pinLabelType == 'gen')
				{
					c.text(currH, 20, 0, 0, currPinNum.toString(), mxConstants.ALIGN_CENTER, mxConstants.ALIGN_MIDDLE, 0, null, 0, 0, 0);
				}
				else if (currPinNum - 1 < labelNames.length)
				{
					c.text(currH, 20, 0, 0, labelNames[currPinNum - 1].toString(), mxConstants.ALIGN_CENTER, mxConstants.ALIGN_MIDDLE, 0, null, 0, 0, 0);
				}
				
				if (startPin == 'e')
				{
					var pc2 = pinsOne + pinCount;
				}
				else
				{
					var pc2 = pinCount;
				}
				
				if (pinLabelType == 'gen')
				{
					c.text(currH, h - 20, 0, 0, pc2.toString(), mxConstants.ALIGN_CENTER, mxConstants.ALIGN_MIDDLE, 0, null, 0, 0, 0);
				}
				else if (pc2 - 1 < labelNames.length)
				{
					c.text(currH, h - 20, 0, 0, labelNames[pc2 - 1].toString(), mxConstants.ALIGN_CENTER, mxConstants.ALIGN_MIDDLE, 0, null, 0, 0, 0);
				}
				
				currH = currH + pinSpacing;
				pinCount++;
			}
		}
		
		c.stroke();
	}
	else
	{
		c.setFontSize(fontSize * 0.5);
		var pinCount = 1;
		var currH = pinSpacing * 0.5;

		if (startPin == 'n' || startPin == 's')
		{
			while (pinCount * pinSpacing <= h)
			{
				c.begin();
				c.rect(0, currH - pinSpacing * 0.25, 10, pinSpacing * 0.5);
				c.fillAndStroke();

				c.begin();
				c.rect(w - 10, currH - pinSpacing * 0.25, 10, pinSpacing * 0.5);
				c.fillAndStroke();
				
				if (startPin == 'n')
				{
					var currPinNum = pinCount;
				}
				else
				{
					var currPinNum = pinsOne + pinCount;
				}

				if (pinLabelType == 'gen')
				{
					c.text(5, currH + 1, 0, 0, currPinNum.toString(), mxConstants.ALIGN_CENTER, mxConstants.ALIGN_MIDDLE, 0, null, 0, 0, 0);
				}
				else if (currPinNum - 1 < labelNames.length)
				{
					c.text(5, currH + 1, 0, 0, labelNames[currPinNum - 1].toString(), mxConstants.ALIGN_CENTER, mxConstants.ALIGN_MIDDLE, 0, null, 0, 0, 0);
				}
				
				if (startPin == 'n')
				{
					var pc2 = 2 * pinsOne - pinCount + 1;
				}
				else
				{
					var pc2 = pinsOne - pinCount + 1;
				}
				
				if (pinLabelType == 'gen')
				{
					c.text(w - 5, currH + 1, 0, 0, pc2.toString(), mxConstants.ALIGN_CENTER, mxConstants.ALIGN_MIDDLE, 0, null, 0, 0, 0);
				}
				else if (pc2 - 1 < labelNames.length)
				{
					c.text(w - 5, currH + 1, 0, 0, labelNames[pc2 - 1].toString(), mxConstants.ALIGN_CENTER, mxConstants.ALIGN_MIDDLE, 0, null, 0, 0, 0);
				}

				currH = currH + pinSpacing;
				pinCount++;
			}
		}
		else
		{
			while (pinCount * pinSpacing <= w)
			{
				c.begin();
				c.rect(currH - pinSpacing * 0.25, 0, pinSpacing * 0.5, 10);
				c.fillAndStroke();

				c.begin();
				c.rect(currH - pinSpacing * 0.25, h - 10, pinSpacing * 0.5, 10);
				c.fillAndStroke();
				
				if (startPin == 'e')
				{
					var currPinNum = pinsOne - pinCount + 1;
				}
				else
				{
					var currPinNum = 2 * pinsOne - pinCount + 1;
				}

				if (pinLabelType == 'gen')
				{
					c.text(currH, 5, 0, 0, currPinNum.toString(), mxConstants.ALIGN_CENTER, mxConstants.ALIGN_MIDDLE, 0, null, 0, 0, 0);
				}
				else if (currPinNum - 1 < labelNames.length)
				{
					c.text(currH, 5, 0, 0, labelNames[currPinNum - 1].toString(), mxConstants.ALIGN_CENTER, mxConstants.ALIGN_MIDDLE, 0, null, 0, 0, 0);
				}
				
				if (startPin == 'e')
				{
					var pc2 = pinsOne + pinCount;
				}
				else
				{
					var pc2 = pinCount;
				}
				
				if (pinLabelType == 'gen')
				{
					c.text(currH, h - 5, 0, 0, pc2.toString(), mxConstants.ALIGN_CENTER, mxConstants.ALIGN_MIDDLE, 0, null, 0, 0, 0);
				}
				else if (pc2 - 1 < labelNames.length)
				{
					c.text(currH, h - 5, 0, 0, labelNames[pc2 - 1].toString(), mxConstants.ALIGN_CENTER, mxConstants.ALIGN_MIDDLE, 0, null, 0, 0, 0);
				}

				currH = currH + pinSpacing;
				pinCount++;
			}
		}
		
	}
	
	c.setShadow(false);
	
	c.begin();
	
	switch(startPin) {
	  case 'e':
			if (h > 40)
			{
				c.moveTo(w, h * 0.5 - 10);
				c.arcTo(12, 12, 0, 0, 0, w, h * 0.5 + 10);
			}
	    break;
	  case 's':
			if (w > 40)
			{
				c.moveTo(w * 0.5 - 10, h);
				c.arcTo(12, 12, 0, 0, 1, w * 0.5 + 10, h);
			}
	    break;
	  case 'w':
			if (h > 40)
			{
				c.moveTo(0, h * 0.5 - 10);
				c.arcTo(12, 12, 0, 0, 1, 0, h * 0.5 + 10);
			}
	    break;
	  default:
			if (w > 40)
			{
				c.moveTo(w * 0.5 - 10, 0);
				c.arcTo(12, 12, 0, 0, 0, w * 0.5 + 10, 0);
			}
	}
	
	c.stroke();
};

mxCellRenderer.registerShape(mxShapeElectricalDualInLineIC.prototype.cst.SHAPE_DUAL_INLINE_IC, mxShapeElectricalDualInLineIC);

mxShapeElectricalDualInLineIC.prototype.getConstraints = function(style, w, h)
{
	var constr = [];

	var pinSpacing = parseFloat(mxUtils.getValue(this.style, 'pinSpacing', '20'));
	var startPin = mxUtils.getValue(this.style, 'startPin', 'n');
	var pinCount = 1;
	var currH = pinSpacing * 0.5;
	var pinsOne = parseInt(h / pinSpacing);
	
	if (startPin == 'n' || startPin == 's')
	{
		while (pinCount * pinSpacing <= h)
		{
			constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, 0, currH));
			constr.push(new mxConnectionConstraint(new mxPoint(1, 0), false, null, 0, currH));
			currH = currH + pinSpacing;
			pinCount++;
		}
	}
	else
	{
		while (pinCount * pinSpacing <= w)
		{
			constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, currH, 0));
			constr.push(new mxConnectionConstraint(new mxPoint(0, 1), false, null, currH, 0));
			currH = currH + pinSpacing;
			pinCount++;
		}
	}
	
	return (constr);
}

//**********************************************************************************************************************************************************
//Quad Flat Package IC
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeElectricalQFPIC(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxShapeElectricalQFPIC, mxShape);

mxShapeElectricalQFPIC.prototype.cst = {
		SHAPE_QFP_IC : 'mxgraph.electrical.logic_gates.qfp_ic'
};

mxShapeElectricalQFPIC.prototype.customProperties = [
	{name: 'pinStyle', dispName: 'Pin Style', type: 'enum', defVal:'line',
		enumList:[
			{val:'line', dispName:'Line'},
			{val:'square', dispName:'Square'}
		]},
	{name: 'startPin', dispName: 'Starting Pin', type: 'enum', defVal:'sw',
		enumList:[
			{val:'sw', dispName:'SW'},
			{val:'nw', dispName:'NW'},
			{val:'ne', dispName:'NE'},
			{val:'se', dispName:'SE'}
		]},
	{name: 'pinSpacing', dispName: 'Pin Spacing', type: 'float', min:1, defVal:20},
	{name: 'pinLabelType', dispName: 'Pin Label Type', type: 'enum', defVal:'gen',
		enumList:[
			{val:'gen', dispName:'Generated'},
			{val:'cust', dispName:'Custom'}
		]},
	{name: 'labelCount', dispName: 'Number of Labels', type: 'int', defVal: 40, dependentProps: ['labelNames']},
	{name: 'labelNames', dispName: 'Label Names', type: 'staticArr', subType: 'string', sizeProperty: 'labelCount', subDefVal: 'a'}
];

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeElectricalQFPIC.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	
	c.begin();
	c.moveTo(15, 10);
	c.lineTo(w - 15, 10);
	c.lineTo(w - 10, 15);
	c.lineTo(w - 10, h - 15);
	c.lineTo(w - 15, h - 10);
	c.lineTo(15, h - 10);
	c.lineTo(10, h - 15);
	c.lineTo(10, 15);
	c.close();
	c.fillAndStroke();

	var pinSpacing = parseFloat(mxUtils.getValue(this.style, 'pinSpacing', '20'));
	var pinStyle = mxUtils.getValue(this.style, 'pinStyle', 'line');
	var pinLabelType = mxUtils.getValue(this.style, 'pinLabelType', 'gen');
	var labelNames = decodeURIComponent(mxUtils.getValue(this.style, 'labelNames', '').toString()).split(',');
	var fontSize = parseFloat(mxUtils.getValue(this.style, 'fontSize', '12'));
	var fontColor = mxUtils.getValue(this.style, 'fontColor', '#000000');
	c.setFontColor(fontColor);
	var startPin = mxUtils.getValue(this.style, 'startPin', 'sw');
	
	if (pinStyle == 'line')
	{
		c.setFontSize(fontSize * 0.8);
		var pinCount = 1;
		var currH = pinSpacing * 0.5 + 20;
		
		c.begin();
		
		var pinsVOne = parseInt((h - pinSpacing - 40) / pinSpacing) + 1;
		var pinsHOne = parseInt((w - pinSpacing - 40) / pinSpacing) + 1;
		
		while (currH <= h - pinSpacing * 0.5 - 20)
		{
			c.moveTo(0, currH);
			c.lineTo(10, currH);
			c.moveTo(w - 10, currH);
			c.lineTo(w, currH);
			
			//west pins
			switch(startPin) {
			  case 'nw':
					var currPinNum = pinCount;
			    break;
			  case 'ne':
					var currPinNum = pinsHOne + pinCount;
			    break;
			  case 'se':
					var currPinNum = pinsVOne + pinsHOne + pinCount;
			    break;
			  default:
					var currPinNum = pinsVOne + 2 * pinsHOne + pinCount;
			}

			if (pinLabelType == 'gen')
			{
				c.text(20, currH, 0, 0, currPinNum.toString(), mxConstants.ALIGN_CENTER, mxConstants.ALIGN_MIDDLE, 0, null, 0, 0, 0);
			}
			else if (currPinNum - 1 < labelNames.length)
			{
				c.text(20, currH, 0, 0, labelNames[currPinNum - 1].toString(), mxConstants.ALIGN_CENTER, mxConstants.ALIGN_MIDDLE, 0, null, 0, 0, 0);
			}
			
			//east pins
			switch(startPin) {
			  case 'nw':
					var pc2 = pinsHOne + 2 * pinsVOne - pinCount + 1;
			    break;
			  case 'ne':
					var pc2 = 2 * pinsHOne + 2 * pinsVOne - pinCount + 1;
			    break;
			  case 'se':
					var pc2 = pinsVOne - pinCount + 1;
			    break;
			  default:
					var pc2 = pinsHOne + pinsVOne - pinCount + 1;
			}

			if (pinLabelType == 'gen')
			{
				c.text(w - 20, currH, 0, 0, pc2.toString(), mxConstants.ALIGN_CENTER, mxConstants.ALIGN_MIDDLE, 0, null, 0, 0, 0);
			}
			else if (pc2 - 1 < labelNames.length)
			{
				c.text(w - 20, currH, 0, 0, labelNames[pc2 - 1].toString(), mxConstants.ALIGN_CENTER, mxConstants.ALIGN_MIDDLE, 0, null, 0, 0, 0);
			}
			
			currH = currH + pinSpacing;
			pinCount++;
		}
		
		var pinCount = 1;
		var currH = pinSpacing * 0.5 + 20;
		
		while (currH <= w - pinSpacing * 0.5 - 20)
		{
			c.moveTo(currH, 0);
			c.lineTo(currH, 10);
			c.moveTo(currH, h - 10);
			c.lineTo(currH, h);
			
			//south pins
			switch(startPin) {
			  case 'nw':
					var currPinNum = pinsVOne + pinCount;
			    break;
			  case 'ne':
					var currPinNum = pinsVOne + pinsHOne + pinCount;
			    break;
			  case 'se':
					var currPinNum = 2 * pinsVOne + pinsHOne + pinCount;
			    break;
			  default:
					var currPinNum = pinCount;
			}
			
			if (pinLabelType == 'gen')
			{
				c.text(currH, h - 20, 0, 0, currPinNum.toString(), mxConstants.ALIGN_CENTER, mxConstants.ALIGN_MIDDLE, 0, null, 0, 0, 0);
			}
			else if (currPinNum - 1 < labelNames.length)
			{
				c.text(currH, h - 20, 0, 0, labelNames[currPinNum - 1].toString(), mxConstants.ALIGN_CENTER, mxConstants.ALIGN_MIDDLE, 0, null, 0, 0, 0);
			}

			//north pins
			switch(startPin) {
			  case 'nw':
					var pc2 = 2 * pinsHOne + 2 * pinsVOne - pinCount + 1;
			    break;
			  case 'ne':
					var pc2 = pinsHOne - pinCount + 1;
			    break;
			  case 'se':
					var pc2 = pinsHOne + pinsVOne - pinCount + 1;
			    break;
			  default:
					var pc2 = 2 * pinsHOne + pinsVOne - pinCount + 1;
			}
			
			if (pinLabelType == 'gen')
			{
				c.text(currH, 20, 0, 0, pc2.toString(), mxConstants.ALIGN_CENTER, mxConstants.ALIGN_MIDDLE, 0, null, 0, 0, 0);
			}
			else if (pc2 - 1 < labelNames.length)
			{
				c.text(currH, 20, 0, 0, labelNames[pc2 - 1].toString(), mxConstants.ALIGN_CENTER, mxConstants.ALIGN_MIDDLE, 0, null, 0, 0, 0);
			}
			
			currH = currH + pinSpacing;
			pinCount++;
		}
		
		c.stroke();
	}
	else
	{
		c.setFontSize(fontSize * 0.5);
		var pinCount = 1;
		var currH = pinSpacing * 0.5 + 20;
		var pinsVOne = parseInt((h - pinSpacing - 40) / pinSpacing) + 1;
		var pinsHOne = parseInt((w - pinSpacing - 40) / pinSpacing) + 1;
		
		while (currH <= h - pinSpacing * 0.5 - 20)
		{
			c.begin();
			c.rect(0, currH - pinSpacing * 0.25, 10, pinSpacing * 0.5);
			c.fillAndStroke();

			c.begin();
			c.rect(w - 10, currH - pinSpacing * 0.25, 10, pinSpacing * 0.5);
			c.fillAndStroke();
			
			//west pins
			switch(startPin) {
			  case 'nw':
					var currPinNum = pinCount;
			    break;
			  case 'ne':
					var currPinNum = pinsHOne + pinCount;
			    break;
			  case 'se':
					var currPinNum = pinsVOne + pinsHOne + pinCount;
			    break;
			  default:
					var currPinNum = pinsVOne + 2 * pinsHOne + pinCount;
			}

			if (pinLabelType == 'gen')
			{
				c.text(5, currH + 1, 0, 0, currPinNum.toString(), mxConstants.ALIGN_CENTER, mxConstants.ALIGN_MIDDLE, 0, null, 0, 0, 0);
			}
			else if (currPinNum - 1 < labelNames.length)
			{
				c.text(5, currH + 1, 0, 0, labelNames[currPinNum - 1].toString(), mxConstants.ALIGN_CENTER, mxConstants.ALIGN_MIDDLE, 0, null, 0, 0, 0);
			}
			
			//east pins
			switch(startPin) {
			  case 'nw':
					var pc2 = pinsHOne + 2 * pinsVOne - pinCount + 1;
			    break;
			  case 'ne':
					var pc2 = 2 * pinsHOne + 2 * pinsVOne - pinCount + 1;
			    break;
			  case 'se':
					var pc2 = pinsVOne - pinCount + 1;
			    break;
			  default:
					var pc2 = pinsHOne + pinsVOne - pinCount + 1;
			}

			if (pinLabelType == 'gen')
			{
				c.text(w - 5, currH + 1, 0, 0, pc2.toString(), mxConstants.ALIGN_CENTER, mxConstants.ALIGN_MIDDLE, 0, null, 0, 0, 0);
			}
			else if (pc2 - 1 < labelNames.length)
			{
				c.text(w - 5, currH + 1, 0, 0, labelNames[pc2 - 1].toString(), mxConstants.ALIGN_CENTER, mxConstants.ALIGN_MIDDLE, 0, null, 0, 0, 0);
			}

			currH = currH + pinSpacing;
			pinCount++;
		}
		
		var pinCount = 1;
		var currH = pinSpacing * 0.5 + 20;
		
		while (currH <= w - pinSpacing * 0.5 - 20)
		{
			c.begin();
			c.rect(currH - pinSpacing * 0.25, 0, pinSpacing * 0.5, 10);
			c.fillAndStroke();

			c.begin();
			c.rect(currH - pinSpacing * 0.25, h - 10, pinSpacing * 0.5, 10);
			c.fillAndStroke();
			
			//south pins
			switch(startPin) {
			  case 'nw':
					var currPinNum = pinsVOne + pinCount;
			    break;
			  case 'ne':
					var currPinNum = pinsVOne + pinsHOne + pinCount;
			    break;
			  case 'se':
					var currPinNum = 2 * pinsVOne + pinsHOne + pinCount;
			    break;
			  default:
					var currPinNum = pinCount;
			}
			
			if (pinLabelType == 'gen')
			{
				c.text(currH, h - 4, 0, 0, currPinNum.toString(), mxConstants.ALIGN_CENTER, mxConstants.ALIGN_MIDDLE, 0, null, 0, 0, 0);
			}
			else if (currPinNum - 1 < labelNames.length)
			{
				c.text(currH, h - 4, 0, 0, labelNames[currPinNum - 1].toString(), mxConstants.ALIGN_CENTER, mxConstants.ALIGN_MIDDLE, 0, null, 0, 0, 0);
			}

			//north pins
			switch(startPin) {
			  case 'nw':
					var pc2 = 2 * pinsHOne + 2 * pinsVOne - pinCount + 1;
			    break;
			  case 'ne':
					var pc2 = pinsHOne - pinCount + 1;
			    break;
			  case 'se':
					var pc2 = pinsHOne + pinsVOne - pinCount + 1;
			    break;
			  default:
					var pc2 = 2 * pinsHOne + pinsVOne - pinCount + 1;
			}
			
			if (pinLabelType == 'gen')
			{
				c.text(currH, 6, 0, 0, pc2.toString(), mxConstants.ALIGN_CENTER, mxConstants.ALIGN_MIDDLE, 0, null, 0, 0, 0);
			}
			else if (pc2 - 1 < labelNames.length)
			{
				c.text(currH, 6, 0, 0, labelNames[pc2 - 1].toString(), mxConstants.ALIGN_CENTER, mxConstants.ALIGN_MIDDLE, 0, null, 0, 0, 0);
			}

			currH = currH + pinSpacing;
			pinCount++;
		}
	}
	
	c.setShadow(false);
	
	if (w > 40)
	{
		c.setFillColor(mxUtils.getValue(this.style, 'strokeColor', '#000000'));

		c.begin();
		
		switch(startPin) {
		  case 'nw':
				c.ellipse(15, 15, 10, 10);
		    break;
		  case 'ne':
				c.ellipse(w - 25, 15, 10, 10);
		    break;
		  case 'se':
				c.ellipse(w - 25, h - 25, 10, 10);
		    break;
		  default:
				c.ellipse(15, h - 25, 10, 10);
		}
		
		c.fillAndStroke();
	}
};

mxCellRenderer.registerShape(mxShapeElectricalQFPIC.prototype.cst.SHAPE_QFP_IC, mxShapeElectricalQFPIC);

mxShapeElectricalQFPIC.prototype.getConstraints = function(style, w, h)
{
	var constr = [];

	var pinSpacing = parseFloat(mxUtils.getValue(this.style, 'pinSpacing', '20'));
	var currH = pinSpacing * 0.5 + 20;
	
	while (currH <= h - pinSpacing * 0.5 - 20)
	{
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, 0, currH));
		constr.push(new mxConnectionConstraint(new mxPoint(1, 0), false, null, 0, currH));
		currH = currH + pinSpacing;
	}
	
	var currH = pinSpacing * 0.5 + 20;
	
	while (currH <= w - pinSpacing * 0.5 - 20)
	{
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, currH, 0));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 1), false, null, currH, 0));
		currH = currH + pinSpacing;
	}
	
	
	return (constr);
}

//**********************************************************************************************************************************************************
//Mux
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeElectricalMux(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxShapeElectricalMux, mxShape);

mxShapeElectricalMux.prototype.cst = {
		SHAPE_MUX : 'mxgraph.electrical.abstract.mux2'
};

mxShapeElectricalMux.prototype.customProperties = [
	{name: 'operation', dispName: 'Operation', type: 'enum', defVal:'mux',
		enumList:[
			{val:'mux', dispName:'Mux'},
			{val:'demux', dispName:'Demux'}
		]},
	{name: 'selectorPins', dispName: 'Selector Pins', type: 'int', min:1, max:8, defVal:1},
];

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeElectricalMux.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	var selectorPins = parseInt(mxUtils.getValue(this.style, 'selectorPins', '1'));
	var operation = mxUtils.getValue(this.style, 'operation', 'mux');
	var fontSize = parseFloat(mxUtils.getValue(this.style, 'fontSize', '12'));
	c.setFontSize(fontSize * 0.5);
	var fontColor = mxUtils.getValue(this.style, 'fontColor', '#000000');
	c.setFontColor(fontColor);
	var dir = mxUtils.getValue(this.style, 'direction', 'east');
	var txtRot = 0;
	
	switch(dir)
	{
		case 'south' :
			txtRot = 270;
			break;
		case 'west' :
			txtRot = 180;
			break;
		case 'north' :
			txtRot = 90;
			break;
	}
		
	switch(operation) 
	{
	  case 'demux':
			c.begin();
			c.moveTo(w - 10, 0);
			c.lineTo(10, h * 0.1);
			c.lineTo(10, h * 0.9 - 10);
			c.lineTo(w - 10, h - 10);
			c.close();
			c.fillAndStroke();
	    break;
	  default:
			c.begin();
			c.moveTo(10, 0);
			c.lineTo(w - 10, h * 0.1);
			c.lineTo(w - 10, h * 0.9 - 10);
			c.lineTo(10, h - 10);
			c.close();
			c.fillAndStroke();
	};
	
	var numInputs = 1;
	var numOutputs = 1;
	
	if (operation == 'mux')
	{
		numInputs = Math.pow(2, selectorPins);
		var spacing = (h - 16) / numInputs;
	}
	else
	{
		numOutputs = Math.pow(2, selectorPins);
		var spacing = (h - 16) / numOutputs;
	}
	
	var currH = 3 + spacing * 0.5;
	
	c.begin();
	
	if (numInputs == 1)
	{
		c.moveTo(0, (h - 10) * 0.5);
		c.lineTo(10, (h - 10) * 0.5);
	}
	else
	{
		for (var i = 0; i < numInputs; i++)
		{
			c.moveTo(0, currH);
			c.lineTo(10, currH);
			c.text(14, currH + 1, 0, 0, '' + i.toString(), mxConstants.ALIGN_CENTER, mxConstants.ALIGN_MIDDLE, 0, null, 0, 0, txtRot);
			currH = currH + spacing;
		}
	}

	if (numOutputs == 1)
	{
		c.moveTo(w - 10, (h - 10) * 0.5);
		c.lineTo(w, (h - 10) * 0.5);
	}
	else
	{
		for (var i = 0; i < numOutputs; i++)
		{
			c.moveTo(w - 10, currH);
			c.lineTo(w, currH);
			c.text(w - 14, currH + 1, 0, 0, '' + i.toString(), mxConstants.ALIGN_CENTER, mxConstants.ALIGN_MIDDLE, 0, null, 0, 0, txtRot);
			currH = currH + spacing;
		}
	}

	var spacing = (w - 20) / selectorPins;
	var currW = 10 + spacing * 0.5;
	
	for (var i = 0; i < selectorPins; i++)
	{
		if (operation == 'mux')
		{
			c.moveTo(currW, h - 10 - (currW - 10) / (w - 20) * h * 0.1);
		}
		else
		{
			c.moveTo(currW, h - 10 - (w - currW - 10) / (w - 20) * h * 0.1);
		}

		c.lineTo(currW, h);

		c.text(currW + 5, h -4, 0, 0, 'S' + (selectorPins - i - 1).toString(), mxConstants.ALIGN_CENTER, mxConstants.ALIGN_MIDDLE, 0, null, 0, 0, txtRot);
		currW = currW + spacing;
	}

	c.stroke();
};

mxCellRenderer.registerShape(mxShapeElectricalMux.prototype.cst.SHAPE_MUX, mxShapeElectricalMux);

mxShapeElectricalMux.prototype.getConstraints = function(style, w, h)
{
	var constr = [];
	var pinRange = (h - 16) / h;
	var selectorPins = parseInt(mxUtils.getValue(this.style, 'selectorPins', '1'));
	var operation = mxUtils.getValue(this.style, 'operation', 'mux');
	
	var numInputs = 1;
	var numOutputs = 1;
	
	if (operation == 'mux')
	{
		numInputs = Math.pow(2, selectorPins);
		var spacing = pinRange / numInputs;
	}
	else
	{
		numOutputs = Math.pow(2, selectorPins);
		var spacing = pinRange / numOutputs;
	}
	
	var currH = spacing * 0.5;
	
	if (numInputs == 1)
	{
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0.5 * (h - 10) / h), false, 0, 0));
	}
	else
	{
		for (var i = 0; i < numInputs; i++)
		{
			constr.push(new mxConnectionConstraint(new mxPoint(0, currH), false, null, 0, 3));
			currH = currH + spacing;
		}
	}

	if (numOutputs == 1)
	{
		constr.push(new mxConnectionConstraint(new mxPoint(1, 0.5), false, null, 0, -5));
	}
	else
	{
		for (var i = 0; i < numOutputs; i++)
		{
			constr.push(new mxConnectionConstraint(new mxPoint(1, currH), false, null, 0, 3));
			currH = currH + spacing;
		}
	}

	var spacing = (w - 20) / (w * selectorPins);
	var currW = spacing * 0.5;
	
	for (var i = 0; i < selectorPins; i++)
	{
		constr.push(new mxConnectionConstraint(new mxPoint(currW, 1), false, null, 10, 0));
		currW = currW + spacing;
	}

	return (constr);
}

//**********************************************************************************************************************************************************
//Battery stack
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeElectricalBatteryStack(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxShapeElectricalBatteryStack, mxShape);

mxShapeElectricalBatteryStack.prototype.cst = {
		SHAPE_BATTERY_STACK : 'mxgraph.electrical.miscellaneous.batteryStack'
};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeElectricalBatteryStack.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);

	var bw = h * 0.3;
	var strokeColor = mxUtils.getValue(this.style, mxConstants.STYLE_STROKECOLOR, '#000000');
	var dashed = mxUtils.getValue(this.style, mxConstants.STYLE_DASHED, '0');
	
	var bNum = Math.floor((w - 20) / bw);
	var startX = (w - bNum * bw) * 0.5;

	if (bNum > 0)
	{
		c.begin();
		c.moveTo(0, h * 0.5);
		c.lineTo(startX + bw * 0.2, h * 0.5);
		c.moveTo(w - startX - bw * 0.2, h * 0.5);
		c.lineTo(w, h * 0.5);
		c.stroke();
		
		var currX = startX;
		c.setFillColor(strokeColor);
		
		for (var i = 0; i < bNum; i++)
		{
			c.rect(currX + bw * 0.2, h * 0.25, bw * 0.2, h * 0.5);
			c.fillAndStroke();
			
			c.begin();
			c.moveTo(currX + bw * 0.8, 0);
			c.lineTo(currX + bw * 0.8, h);
			c.stroke();
			
			if (i > 0)
			{
				c.setDashed('1');
				c.begin();
				c.moveTo(currX - bw * 0.2, h * 0.5);
				c.lineTo(currX + bw * 0.2, h * 0.5);
				c.stroke();
				c.setDashed(dashed);
			}
			
			currX = currX + bw;
		}
	}
};

mxCellRenderer.registerShape(mxShapeElectricalBatteryStack.prototype.cst.SHAPE_BATTERY_STACK, mxShapeElectricalBatteryStack);

mxShapeElectricalBatteryStack.prototype.constraints = [
    new mxConnectionConstraint(new mxPoint(0, 0.5), true),
    new mxConnectionConstraint(new mxPoint(1, 0.5), true)
    ];

//**********************************************************************************************************************************************************
//DC Source 3 v2
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeElectricalDCSource3_v2(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxShapeElectricalDCSource3_v2, mxShape);

mxShapeElectricalDCSource3_v2.prototype.cst = {
		SHAPE_DC_SOURCE_3_V2 : 'mxgraph.electrical.signal_sources.dc_source_3_v2'
};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeElectricalDCSource3_v2.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	
	var ss = Math.max(3, Math.min(h, w) * 0.05); // half of symbol size
	var i = 3; //indent
	c.ellipse(0, 0, w, h);
	c.fillAndStroke();
	
	c.begin();
	c.moveTo(w * 0.5 - ss, h * 0.05 + i);
	c.lineTo(w * 0.5 + ss, h * 0.05 + i);
	c.moveTo(w * 0.5, h * 0.05 - ss + i);
	c.lineTo(w * 0.5, h * 0.05 + ss + i);
	c.moveTo(w * 0.5 - ss, h * 0.95 - i);
	c.lineTo(w * 0.5 + ss, h * 0.95 - i);
	c.stroke();
};

mxCellRenderer.registerShape(mxShapeElectricalDCSource3_v2.prototype.cst.SHAPE_DC_SOURCE_3_V2, mxShapeElectricalDCSource3_v2);

mxShapeElectricalDCSource3_v2.prototype.constraints = [
  new mxConnectionConstraint(new mxPoint(0.5, 0), true),
  new mxConnectionConstraint(new mxPoint(0.5, 1), true)
  ];

//**********************************************************************************************************************************************************
//Source
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeElectricalSource(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxShapeElectricalSource, mxShape);

mxShapeElectricalSource.prototype.cst = {
		SHAPE_SOURCE : 'mxgraph.electrical.signal_sources.source'
};

mxShapeElectricalSource.prototype.customProperties = [
	{name: 'elSourceType', dispName: 'Source Type', type: 'enum', defVal: 'independent',
		enumList: [{val: 'independent', dispName: 'Independent'}, 
			       {val: 'dependent', dispName: 'Dependent'}]
	},
	{name: 'elSignalType', dispName: 'Signal Type', type: 'enum', defVal: 'ac',
		enumList: [{val: 'ac', dispName: 'AC'}, 
	       	   {val: 'none', dispName: 'None'},
	       	   {val: 'square', dispName: 'Square'},
	       	   {val: 'triangular', dispName: 'Triangular'},
	       	   {val: 'sawtooth', dispName: 'Sawtooth'},
	       	   {val: 'noise', dispName: 'Noise'},
	       	   {val: 'ideal', dispName: 'Ideal'},
	       	   {val: 'expSquib', dispName: 'Explosive Squib'},
	       	   {val: 'pulse', dispName: 'Pulse'},
	       	   {val: 'invPulse', dispName: 'Inverse Pulse'},
	       	   {val: 'chopSquare', dispName: 'Chopped Square'},
	       	   {val: 'stepOn', dispName: 'Step On'},
	       	   {val: 'stepOff', dispName: 'Step Off'},
	       	   {val: 'dc1', dispName: 'DC Horizontal'},
		       {val: 'dc2', dispName: 'DC Vertical'},
		       {val: 'dc3', dispName: 'DC Plus minus'}]
	}
];

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeElectricalSource.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	
	var sourceType = mxUtils.getValue(this.style, 'elSourceType', 'independent');
	var signalType = mxUtils.getValue(this.style, 'elSignalType', 'none');

	switch (sourceType)
	{
		case "independent" :
				c.ellipse(0, 0, w, h);
				c.fillAndStroke();
			break;
		case "dependent" :
				c.begin();
				c.moveTo(0, h * 0.5);
				c.lineTo(w * 0.5, 0);
				c.lineTo(w, h * 0.5);
				c.lineTo(w * 0.5, h);
				c.lineTo(0, h * 0.5);
				c.close();
				c.fillAndStroke();
			break;
	}
	
	switch (signalType)
	{
		case "ac" :
				c.begin();
				c.moveTo(w * 0.3, h * 0.5);
				c.quadTo(w * 0.34, h * 0.35, w * 0.4, h * 0.35);
				c.quadTo(w * 0.46, h * 0.35, w * 0.5, h * 0.5);
				c.quadTo(w * 0.53, h * 0.65, w * 0.6, h * 0.65);
				c.quadTo(w * 0.66, h * 0.65, w * 0.7, h * 0.5);
				c.stroke();
			break;
		case "square" :
				c.begin();
				c.moveTo(w * 0.3, h * 0.5);
				c.lineTo(w * 0.3, h * 0.35);
				c.lineTo(w * 0.5, h * 0.35);
				c.lineTo(w * 0.5, h * 0.65);
				c.lineTo(w * 0.7, h * 0.65);
				c.lineTo(w * 0.7, h * 0.5);
				c.stroke();
			break;
		case "triangular" :
				c.begin();
				c.moveTo(w * 0.3, h * 0.65);
				c.lineTo(w * 0.4, h * 0.35);
				c.lineTo(w * 0.5, h * 0.65);
				c.lineTo(w * 0.6, h * 0.35);
				c.lineTo(w * 0.7, h * 0.65);
				c.stroke();
			break;
		case "sawtooth" :
				c.begin();
				c.moveTo(w * 0.24, h * 0.65);
				c.lineTo(w * 0.42, h * 0.35);
				c.lineTo(w * 0.42, h * 0.65);
				c.lineTo(w * 0.58, h * 0.35);
				c.lineTo(w * 0.58, h * 0.65);
				c.lineTo(w * 0.76, h * 0.35);
				c.lineTo(w * 0.76, h * 0.65);
				c.stroke();
			break;
		case "noise" :
				c.begin();
				c.moveTo(w * 0.5, h * 0.17);
				c.lineTo(w * 0.5, h * 0.5);
				c.moveTo(w * 0.18, h * 0.42);
				c.lineTo(w * 0.5, h * 0.5);
				c.moveTo(w * 0.32, h * 0.78);
				c.lineTo(w * 0.5, h * 0.5);
				c.moveTo(w * 0.82, h * 0.42);
				c.lineTo(w * 0.5, h * 0.5);
				c.moveTo(w * 0.68, h * 0.78);
				c.lineTo(w * 0.5, h * 0.5);
				c.stroke();
			break;
		case "ideal" :
				c.begin();
				c.moveTo(0, h * 0.5);
				c.lineTo(w, h * 0.5);
				c.stroke();
			break;
		case "expSquib" :
				c.ellipse(0, h * 0.43, w * 0.14, h * 0.14);
				c.stroke();
				c.ellipse(w * 0.86, h * 0.43, w * 0.14, h * 0.14);
				c.stroke();
				c.begin();
				c.moveTo(w * 0.83, h * 0.63);
				c.lineTo(w * 0.73, h * 0.73);
				c.lineTo(w * 0.27, h * 0.27);
				c.lineTo(w * 0.17, h * 0.37);
				c.stroke();
				c.begin();

				var strokeColor = mxUtils.getValue(this.style, mxConstants.STYLE_STROKECOLOR, '#000000');
				c.setFillColor(strokeColor);
				
				c.moveTo(w * 0.2, h * 0.25);
				c.lineTo(w * 0.13, h * 0.4);
				c.lineTo(w * 0.28, h * 0.33);
				c.close();
				c.fillAndStroke();
			break;
		case "pulse" :
				c.begin();
				c.moveTo(w * 0.3, h * 0.65);
				c.lineTo(w * 0.4, h * 0.65);
				c.lineTo(w * 0.4, h * 0.35);
				c.lineTo(w * 0.6, h * 0.35);
				c.lineTo(w * 0.6, h * 0.65);
				c.lineTo(w * 0.7, h * 0.65);
				c.stroke();
			break;
		case "invPulse" :
				c.begin();
				c.moveTo(w * 0.3, h * 0.35);
				c.lineTo(w * 0.4, h * 0.35);
				c.lineTo(w * 0.4, h * 0.65);
				c.lineTo(w * 0.6, h * 0.65);
				c.lineTo(w * 0.6, h * 0.35);
				c.lineTo(w * 0.7, h * 0.35);
				c.stroke();
			break;
		case "chopSquare" :
				c.begin();
				c.moveTo(w * 0.3, h * 0.5);
				c.lineTo(w * 0.33, h * 0.35);
				c.lineTo(w * 0.47, h * 0.35);
				c.lineTo(w * 0.53, h * 0.65);
				c.lineTo(w * 0.67, h * 0.65);
				c.lineTo(w * 0.7, h * 0.5);
				c.stroke();
			break;
		case "stepOn" :
				c.begin();
				c.moveTo(w * 0.3, h * 0.65);
				c.lineTo(w * 0.5, h * 0.65);
				c.lineTo(w * 0.5, h * 0.35);
				c.lineTo(w * 0.7, h * 0.35);
				c.stroke();
			break;
		case "stepOff" :
				c.begin();
				c.moveTo(w * 0.3, h * 0.35);
				c.lineTo(w * 0.5, h * 0.35);
				c.lineTo(w * 0.5, h * 0.65);
				c.lineTo(w * 0.7, h * 0.65);
				c.stroke();
			break;
		case "dc1" :
				c.begin();
				c.moveTo(w * 0.17, h * 0.5);
				c.lineTo(w * 0.83, h * 0.5);
				c.moveTo(w * 0.67, h * 0.42);
				c.lineTo(w * 0.83, h * 0.5);
				c.lineTo(w * 0.67, h * 0.58);
				c.stroke();
			break;
		case "dc2" :
				c.begin();
				c.moveTo(w * 0.5, h * 0.17);
				c.lineTo(w * 0.5, h * 0.83);
				c.moveTo(w * 0.42, h * 0.67);
				c.lineTo(w * 0.5, h * 0.83);
				c.lineTo(w * 0.58, h * 0.67);
				c.stroke();
			break;
		case "dc3" :
				var ss = Math.max(3, Math.min(h, w) * 0.05); // half of symbol size
				var i = 3; //indent
				
				if (sourceType == 'dependent')
				{
					i += 3;
				}
				
				c.begin();
				c.moveTo(w * 0.5 - ss, h * 0.05 + i);
				c.lineTo(w * 0.5 + ss, h * 0.05 + i);
				c.moveTo(w * 0.5, h * 0.05 - ss + i);
				c.lineTo(w * 0.5, h * 0.05 + ss + i);
				c.moveTo(w * 0.5 - ss, h * 0.95 - i);
				c.lineTo(w * 0.5 + ss, h * 0.95 - i);
				c.stroke();
			break;
	}
};

mxCellRenderer.registerShape(mxShapeElectricalSource.prototype.cst.SHAPE_SOURCE, mxShapeElectricalSource);

//**********************************************************************************************************************************************************
// Two way switch
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeElectricalTwoWaySwitch(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxShapeElectricalTwoWaySwitch, mxShape);

mxShapeElectricalTwoWaySwitch.prototype.cst = {
		SHAPE_TWO_WAY_SWITCH : 'mxgraph.electrical.electro-mechanical.twoWaySwitch'
};

mxShapeElectricalTwoWaySwitch.prototype.customProperties = [
	{name: 'elSwitchState', dispName: 'Switch State', type: 'int', min:1, defVal: '1'}
];

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeElectricalTwoWaySwitch.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	var switchState = mxUtils.getValue(this.style, 'elSwitchState', '1');
	
	c.begin();

	c.moveTo(0, 0.5 * h);
	c.lineTo(0.2 * w, 0.5 * h);
	
	c.moveTo(0.8 * w, 0.88 * h);
	c.lineTo(w, 0.88 * h);

	c.moveTo(0.8 * w, 0.12 * h);
	c.lineTo(w, 0.12 * h);

	if (switchState == '2')
	{
		c.moveTo(0.28 * w, 0.48 * h);
		c.lineTo(0.72 * w, 0.15 * h);
	}
	else
	{
		c.moveTo(0.28 * w, 0.52 * h);
		c.lineTo(0.72 * w, 0.85 * h);
	}

	c.stroke();
	
	c.ellipse(0.72 * w, 0.77 * h, 0.08 * w, 0.23 * h);
	c.fillAndStroke();
	c.ellipse(0.72 * w, 0, 0.08 * w, 0.23 * h);
	c.fillAndStroke();
	c.ellipse(0.2 * w, 0.385 * h, 0.08 * w, 0.23 * h);
	c.fillAndStroke();
};

mxCellRenderer.registerShape(mxShapeElectricalTwoWaySwitch.prototype.cst.SHAPE_TWO_WAY_SWITCH, mxShapeElectricalTwoWaySwitch);

mxShapeElectricalTwoWaySwitch.prototype.constraints = [
	  new mxConnectionConstraint(new mxPoint(1, 0.12), true),
	  new mxConnectionConstraint(new mxPoint(0, 0.5), true),
	  new mxConnectionConstraint(new mxPoint(1, 0.88), true)
	  ];

//**********************************************************************************************************************************************************
// Pushbutton
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeElectricalPushbutton(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxShapeElectricalPushbutton, mxShape);

mxShapeElectricalPushbutton.prototype.cst = {
		SHAPE_PUSHBUTTON : 'mxgraph.electrical.electro-mechanical.pushbutton'
};

mxShapeElectricalPushbutton.prototype.customProperties = [
	{name: 'elSwitchState', dispName: 'Switch State', type: 'enum', defVal: 'on',
		enumList:[
			{val:'on', dispName:'On'},
			{val:'off', dispName:'Off'}
		]}
];

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeElectricalPushbutton.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	var switchState = mxUtils.getValue(this.style, 'elSwitchState', 'on');

	c.begin();

	c.moveTo(0, 0.8 * h);
	c.lineTo(0.2 * w, 0.8 * h);
	c.moveTo(0.8 * w, 0.8 * h);
	c.lineTo(w, 0.8 * h);

	if (switchState == 'off')
	{
		c.moveTo(0.5 * w, 0.5 * h);
		c.lineTo(0.5 * w, 0);
		c.moveTo(0.46 * w, 0);
		c.lineTo(0.54 * w, 0);
		c.moveTo(0.2 * w, 0.5 * h);
		c.lineTo(0.8 * w, 0.5 * h);
	}
	else
	{
		c.moveTo(0.5 * w, h);
		c.lineTo(0.5 * w, 0.5 * h);
		c.moveTo(0.46 * w, 0.5 * h);
		c.lineTo(0.54 * w, 0.5 * h);
		c.moveTo(0.2 * w, h);
		c.lineTo(0.8 * w, h);
	}

	c.stroke();
	
	c.ellipse(0.72 * w, 0.65 * h, 0.08 * w, 0.3 * h);
	c.fillAndStroke();
	c.ellipse(0.2 * w, 0.65 * h, 0.08 * w, 0.3 * h);
	c.fillAndStroke();
};

mxCellRenderer.registerShape(mxShapeElectricalPushbutton.prototype.cst.SHAPE_PUSHBUTTON, mxShapeElectricalPushbutton);

mxShapeElectricalPushbutton.prototype.constraints = [
	  new mxConnectionConstraint(new mxPoint(0, 0.8), true),
	  new mxConnectionConstraint(new mxPoint(1, 0.8), true)
	  ];

//**********************************************************************************************************************************************************
// Single switch
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeElectricalSingleSwitch(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxShapeElectricalSingleSwitch, mxShape);

mxShapeElectricalSingleSwitch.prototype.cst = {
		SHAPE_SINGLE_SWITCH : 'mxgraph.electrical.electro-mechanical.singleSwitch'
};

mxShapeElectricalSingleSwitch.prototype.customProperties = [
	{name: 'elSwitchState', dispName: 'Switch State', type: 'enum', defVal: 'on',
		enumList:[
			{val:'on', dispName:'On'},
			{val:'off', dispName:'Off'}
		]}
];

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeElectricalSingleSwitch.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	var switchState = mxUtils.getValue(this.style, 'elSwitchState', 'on');

	c.begin();

	c.moveTo(0, 0.8 * h);
	c.lineTo(0.2 * w, 0.8 * h);
	c.moveTo(0.8 * w, 0.8 * h);
	c.lineTo(w, 0.8 * h);

	if (switchState == 'off')
	{
		c.moveTo(0.28 * w, 0.75 * h);
		c.lineTo(0.76 * w, 0);
	}
	else
	{
		c.moveTo(0.2 * w, 0.8 * h);
		c.lineTo(0.8 * w, 0.8 * h);
	}

	c.stroke();
	
	c.ellipse(0.72 * w, 0.65 * h, 0.08 * w, 0.3 * h);
	c.fillAndStroke();
	c.ellipse(0.2 * w, 0.65 * h, 0.08 * w, 0.3 * h);
	c.fillAndStroke();
};

mxCellRenderer.registerShape(mxShapeElectricalSingleSwitch.prototype.cst.SHAPE_SINGLE_SWITCH, mxShapeElectricalSingleSwitch);

mxShapeElectricalSingleSwitch.prototype.constraints = [
	  new mxConnectionConstraint(new mxPoint(0, 0.8), true),
	  new mxConnectionConstraint(new mxPoint(1, 0.8), true)
	  ];

//**********************************************************************************************************************************************************
// Switch disconnector
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeElectricalSwitchDisconnector(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxShapeElectricalSwitchDisconnector, mxShape);

mxShapeElectricalSwitchDisconnector.prototype.cst = {
		SHAPE_SWITCH_DISCONNECTOR : 'mxgraph.electrical.electro-mechanical.switchDisconnector'
};

mxShapeElectricalSwitchDisconnector.prototype.customProperties = [
	{name: 'elSwitchState', dispName: 'Switch State', type: 'enum', defVal: 'on',
		enumList:[
			{val:'on', dispName:'On'},
			{val:'off', dispName:'Off'}
		]}
];

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeElectricalSwitchDisconnector.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	var switchState = mxUtils.getValue(this.style, 'elSwitchState', 'on');

	c.begin();

	c.moveTo(0.8 * w, 0.84 * h);
	c.lineTo(w, 0.84 * h);
	c.moveTo(0.8 * w, 0.68 * h);
	c.lineTo(0.8 * w, h);
	c.moveTo(0, 0.84 * h);
	c.lineTo(0.24 * w, 0.84 * h);

	if (switchState == 'off')
	{
		c.lineTo(0.76 * w, 0);
	}
	else
	{
		c.lineTo(0.8 * w, 0.84 * h);
	}

	c.stroke();
	
	c.ellipse(0.72 * w, 0.68 * h, 0.08 * w, 0.32 * h);
	c.fillAndStroke();
};

mxCellRenderer.registerShape(mxShapeElectricalSwitchDisconnector.prototype.cst.SHAPE_SWITCH_DISCONNECTOR, mxShapeElectricalSwitchDisconnector);

mxShapeElectricalSwitchDisconnector.prototype.constraints = [
	  new mxConnectionConstraint(new mxPoint(0, 0.84), true),
	  new mxConnectionConstraint(new mxPoint(1, 0.84), true)
	  ];

//**********************************************************************************************************************************************************
// Fuse 2
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeElectricalFuse2(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxShapeElectricalFuse2, mxShape);

mxShapeElectricalFuse2.prototype.cst = {
		SHAPE_FUSE2 : 'mxgraph.electrical.electro-mechanical.fuse2'
};

mxShapeElectricalFuse2.prototype.customProperties = [
	{name: 'elSwitchState', dispName: 'Switch State', type: 'enum', defVal: 'on',
		enumList:[
			{val:'on', dispName:'On'},
			{val:'off', dispName:'Off'}
		]}
];

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeElectricalFuse2.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	var switchState = mxUtils.getValue(this.style, 'elSwitchState', 'on');

	c.begin();

	c.moveTo(0.8 * w, 0.8 * h);
	c.lineTo(w, 0.8 * h);
	c.moveTo(0, 0.8 * h);
	c.lineTo(0.25 * w, 0.8 * h);

	if (switchState == 'off')
	{
		c.lineTo(0.76 * w, 0);
		
		c.moveTo(0.348 * w, 0.47 * h);
		c.lineTo(0.563 * w, 0.13 * h);
		c.lineTo(0.603 * w, 0.46 * h);
		c.lineTo(0.387 * w, 0.78 * h);
		c.close();
	}
	else
	{
		c.lineTo(0.8 * w, 0.8 * h);

		c.moveTo(0.38 * w, 0.6 * h);
		c.lineTo(0.62 * w, 0.6 * h);
		c.lineTo(0.62 * w, h);
		c.lineTo(0.38 * w, h);
		c.close();
	}

	c.stroke();
};

mxCellRenderer.registerShape(mxShapeElectricalFuse2.prototype.cst.SHAPE_FUSE2, mxShapeElectricalFuse2);

mxShapeElectricalFuse2.prototype.constraints = [
	  new mxConnectionConstraint(new mxPoint(0, 0.8), true),
	  new mxConnectionConstraint(new mxPoint(1, 0.8), true)
	  ];

//**********************************************************************************************************************************************************
// Liquid Level Actuated Switch
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeElectricalLiquidLevelActuatedSwitch(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxShapeElectricalLiquidLevelActuatedSwitch, mxShape);

mxShapeElectricalLiquidLevelActuatedSwitch.prototype.cst = {
		SHAPE_LIQUID_LEVEL_ACTUATED_SWITCH : 'mxgraph.electrical.electro-mechanical.liquidLevelActuatedSwitch'
};

mxShapeElectricalLiquidLevelActuatedSwitch.prototype.customProperties = [
	{name: 'elSwitchState', dispName: 'Switch State', type: 'enum', defVal: 'on',
		enumList:[
			{val:'on', dispName:'On'},
			{val:'off', dispName:'Off'}
		]}
];

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeElectricalLiquidLevelActuatedSwitch.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	var switchState = mxUtils.getValue(this.style, 'elSwitchState', 'on');

	c.begin();

	c.moveTo(0.8 * w, 0.27 * h);
	c.lineTo(w, 0.27 * h);
	c.moveTo(0, 0.27 * h);
	c.lineTo(0.2 * w, 0.27 * h);

	if (switchState == 'off')
	{
		c.moveTo(0.24 * w, 0);
		c.lineTo(0.76 * w, 0);
		c.moveTo(0.5 * w, 0);
		c.lineTo(0.5 * w, 0.47 * h);
		c.stroke();

		c.ellipse(0.45 * w, 0.47 * h, 0.1 * w, 0.26 * h);
		c.fillAndStroke();
	}
	else
	{
		c.moveTo(0.28 * w, 0.27 * h);
		c.lineTo(0.72 * w, 0.27 * h);
		c.moveTo(0.5 * w, 0.27 * h);
		c.lineTo(0.5 * w, 0.74 * h);
		c.stroke();

		c.ellipse(0.45 * w, 0.74 * h, 0.1 * w, 0.26 * h);
		c.fillAndStroke();
	}


	c.ellipse(0.2 * w, 0.17 * h, 0.08 * w, 0.2 * h);
	c.fillAndStroke();

	c.ellipse(0.72 * w, 0.17 * h, 0.08 * w, 0.2 * h);
	c.fillAndStroke();
};

mxCellRenderer.registerShape(mxShapeElectricalLiquidLevelActuatedSwitch.prototype.cst.SHAPE_LIQUID_LEVEL_ACTUATED_SWITCH, mxShapeElectricalLiquidLevelActuatedSwitch);

mxShapeElectricalLiquidLevelActuatedSwitch.prototype.constraints = [
	  new mxConnectionConstraint(new mxPoint(0, 0.27), true),
	  new mxConnectionConstraint(new mxPoint(1, 0.27), true)
	  ];

//**********************************************************************************************************************************************************
// Liquid Level Actuated Switch 2
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeElectricalLiquidLevelActuatedSwitch2(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxShapeElectricalLiquidLevelActuatedSwitch2, mxShape);

mxShapeElectricalLiquidLevelActuatedSwitch2.prototype.cst = {
		SHAPE_LIQUID_LEVEL_ACTUATED_SWITCH_2 : 'mxgraph.electrical.electro-mechanical.liquidLevelActuatedSwitch2'
};

mxShapeElectricalLiquidLevelActuatedSwitch2.prototype.customProperties = [
	{name: 'elSwitchState', dispName: 'Switch State', type: 'enum', defVal: 'on',
		enumList:[
			{val:'on', dispName:'On'},
			{val:'off', dispName:'Off'}
		]}
];

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeElectricalLiquidLevelActuatedSwitch2.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	var switchState = mxUtils.getValue(this.style, 'elSwitchState', 'on');

	c.begin();

	c.moveTo(0.76 * w, h);
	c.lineTo(w, h);
	c.moveTo(0, h);
	c.lineTo(0.24 * w, h);

	if (switchState == 'off')
	{
		c.lineTo(0.76 * w, 0.5 * h);
		c.moveTo(0.42 * w, 0);
		c.lineTo(0.58 * w, 0);
		c.lineTo(0.58 * w, 0.4 * h);
		c.lineTo(0.42 * w, 0.4 * h);
		c.close();
		c.moveTo(0.46 * w, 0.22 * h);
		c.arcTo(0.05 * w, 0.1 * h, 0, 0, 1, 0.54 * w, 0.22 * h);
		c.arcTo(0.05 * w, 0.1 * h, 0, 0, 1, 0.46 * w, 0.22 * h);
		c.close();
		c.moveTo(0.5 * w, 0.1 * h);
		c.lineTo(0.5 * w, 0.17 * h);
		c.moveTo(0.5 * w, 0.4 * h);
		c.lineTo(0.5 * w, 0.55 * h);
		c.moveTo(0.5 * w, 0.63 * h);
		c.lineTo(0.5 * w, 0.75 * h);
		c.stroke();
	}
	else
	{
		c.lineTo(0.76 * w, h);
		c.moveTo(0.42 * w, 0.25 * h);
		c.lineTo(0.58 * w, 0.25 * h);
		c.lineTo(0.58 * w, 0.65 * h);
		c.lineTo(0.42 * w, 0.65 * h);
		c.close();
		c.moveTo(0.46 * w, 0.47 * h);
		c.arcTo(0.05 * w, 0.1 * h, 0, 0, 1, 0.54 * w, 0.47 * h);
		c.arcTo(0.05 * w, 0.1 * h, 0, 0, 1, 0.46 * w, 0.47 * h);
		c.close();
		c.moveTo(0.5 * w, 0.35 * h);
		c.lineTo(0.5 * w, 0.42 * h);
		c.moveTo(0.5 * w, 0.65 * h);
		c.lineTo(0.5 * w, 0.8 * h);
		c.moveTo(0.5 * w, 0.88 * h);
		c.lineTo(0.5 * w, h);
		c.stroke();
		c.stroke();
	}
};

mxCellRenderer.registerShape(mxShapeElectricalLiquidLevelActuatedSwitch2.prototype.cst.SHAPE_LIQUID_LEVEL_ACTUATED_SWITCH_2, mxShapeElectricalLiquidLevelActuatedSwitch2);

mxShapeElectricalLiquidLevelActuatedSwitch2.prototype.constraints = [
	  new mxConnectionConstraint(new mxPoint(0, 1), true),
	  new mxConnectionConstraint(new mxPoint(1, 1), true)
	  ];

//**********************************************************************************************************************************************************
// Gas Flow Actuated Switch
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeElectricalGasFlowActuatedSwitch(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxShapeElectricalGasFlowActuatedSwitch, mxShape);

mxShapeElectricalGasFlowActuatedSwitch.prototype.cst = {
		SHAPE_GAS_FLOW_ACTUATED_SWITCH : 'mxgraph.electrical.electro-mechanical.gasFlowActuatedSwitch'
};

mxShapeElectricalGasFlowActuatedSwitch.prototype.customProperties = [
	{name: 'elSwitchState', dispName: 'Switch State', type: 'enum', defVal: 'on',
		enumList:[
			{val:'on', dispName:'On'},
			{val:'off', dispName:'Off'}
		]}
];

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeElectricalGasFlowActuatedSwitch.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	var switchState = mxUtils.getValue(this.style, 'elSwitchState', 'on');

	c.begin();

	c.moveTo(0.76 * w, h);
	c.lineTo(w, h);
	c.moveTo(0, h);
	c.lineTo(0.24 * w, h);

	if (switchState == 'off')
	{
		c.lineTo(0.76 * w, 0.5 * h);
		c.moveTo(0.42 * w, 0);
		c.lineTo(0.58 * w, 0);
		c.lineTo(0.58 * w, 0.4 * h);
		c.lineTo(0.42 * w, 0.4 * h);
		c.close();
		
		c.moveTo(0.54 * w, 0.34 * h);
		c.lineTo(0.54 * w, 0.09 * h);
		c.lineTo(0.46 * w, 0.09 * h);
		c.lineTo(0.46 * w, 0.26 * h);
		c.lineTo(0.54 * w, 0.26 * h);
		c.moveTo(0.5 * w, 0.4 * h);
		c.lineTo(0.5 * w, 0.55 * h);
		c.moveTo(0.5 * w, 0.63 * h);
		c.lineTo(0.5 * w, 0.75 * h);
		c.stroke();
		
		c.ellipse(0.475 * w, 0.165 * h, 0.025 * w, 0.06 * h);
		c.stroke();
	}
	else
	{
		c.lineTo(0.76 * w, h);
		c.moveTo(0.42 * w, 0.25 * h);
		c.lineTo(0.58 * w, 0.25 * h);
		c.lineTo(0.58 * w, 0.65 * h);
		c.lineTo(0.42 * w, 0.65 * h);
		c.close();
		
		c.moveTo(0.54 * w, 0.59 * h);
		c.lineTo(0.54 * w, 0.34 * h);
		c.lineTo(0.46 * w, 0.34 * h);
		c.lineTo(0.46 * w, 0.51 * h);
		c.lineTo(0.54 * w, 0.51 * h);
		c.moveTo(0.5 * w, 0.65 * h);
		c.lineTo(0.5 * w, 0.80 * h);
		c.moveTo(0.5 * w, 0.88 * h);
		c.lineTo(0.5 * w, h);
		c.stroke();
		
		c.ellipse(0.475 * w, 0.415 * h, 0.025 * w, 0.06 * h);
		c.stroke();
	}
};

mxCellRenderer.registerShape(mxShapeElectricalGasFlowActuatedSwitch.prototype.cst.SHAPE_GAS_FLOW_ACTUATED_SWITCH, mxShapeElectricalGasFlowActuatedSwitch);

mxShapeElectricalGasFlowActuatedSwitch.prototype.constraints = [
	  new mxConnectionConstraint(new mxPoint(0, 1), true),
	  new mxConnectionConstraint(new mxPoint(1, 1), true)
	  ];

//**********************************************************************************************************************************************************
// Flow Actuated Switch
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeElectricalFlowActuatedSwitch(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxShapeElectricalFlowActuatedSwitch, mxShape);

mxShapeElectricalFlowActuatedSwitch.prototype.cst = {
		SHAPE_FLOW_ACTUATED_SWITCH : 'mxgraph.electrical.electro-mechanical.flowActuatedSwitch'
};

mxShapeElectricalFlowActuatedSwitch.prototype.customProperties = [
	{name: 'elSwitchState', dispName: 'Switch State', type: 'enum', defVal: 'on',
		enumList:[
			{val:'on', dispName:'On'},
			{val:'off', dispName:'Off'}
		]}
];

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeElectricalFlowActuatedSwitch.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	var switchState = mxUtils.getValue(this.style, 'elSwitchState', 'on');

	c.begin();

	c.moveTo(0.8 * w, 0.1 * h);
	c.lineTo(w, 0.1 * h);
	c.moveTo(0, 0.1 * h);
	c.lineTo(0.2 * w, 0.1 * h);

	if (switchState == 'off')
	{
		c.moveTo(0.28 * w, 0.13 * h);
		c.lineTo(0.76 * w, 0.61 * h);
		c.moveTo(0.5 * w, 0.35 * h);
		c.lineTo(0.5 * w, h);
		c.lineTo(0.6 * w, h);
		c.lineTo(0.5 * w, 0.68 * h);
	}
	else
	{
		c.moveTo(0.28 * w, 0.1 * h);
		c.lineTo(0.72 * w, 0.1 * h);
		c.moveTo(0.5 * w, 0.1 * h);
		c.lineTo(0.5 * w, 0.85 * h);
		c.lineTo(0.6 * w, 0.85 * h);
		c.lineTo(0.5 * w, 0.53 * h);
	}

	c.stroke();
	
	c.ellipse(0.2 * w, 0, 0.08 * w, 0.2 * h);
	c.stroke();

	c.ellipse(0.72 * w, 0, 0.08 * w, 0.2 * h);
	c.stroke();
};

mxCellRenderer.registerShape(mxShapeElectricalFlowActuatedSwitch.prototype.cst.SHAPE_FLOW_ACTUATED_SWITCH, mxShapeElectricalFlowActuatedSwitch);

mxShapeElectricalFlowActuatedSwitch.prototype.constraints = [
	new mxConnectionConstraint(new mxPoint(0, 0.27), true),
  	new mxConnectionConstraint(new mxPoint(1, 0.27), true)
	];

//**********************************************************************************************************************************************************
// Pressure Actuated Switch
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeElectricalPressureActuatedSwitch(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxShapeElectricalPressureActuatedSwitch, mxShape);

mxShapeElectricalPressureActuatedSwitch.prototype.cst = {
		SHAPE_PRESSURE_ACTUATED_SWITCH : 'mxgraph.electrical.electro-mechanical.pressureActuatedSwitch'
};

mxShapeElectricalPressureActuatedSwitch.prototype.customProperties = [
	{name: 'elSwitchState', dispName: 'Switch State', type: 'enum', defVal: 'on',
		enumList:[
			{val:'on', dispName:'On'},
			{val:'off', dispName:'Off'}
		]}
];

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeElectricalPressureActuatedSwitch.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	var switchState = mxUtils.getValue(this.style, 'elSwitchState', 'on');

	c.begin();

	c.moveTo(0.8 * w, 0.1 * h);
	c.lineTo(w, 0.1 * h);
	c.moveTo(0, 0.1 * h);
	c.lineTo(0.2 * w, 0.1 * h);

	if (switchState == 'off')
	{
		c.moveTo(0.28 * w, 0.13 * h);
		c.lineTo(0.76 * w, 0.61 * h);
		c.moveTo(0.5 * w, 0.35 * h);
		c.lineTo(0.5 * w, 0.74 * h);
		c.moveTo(0.39 * w, h);
		c.arcTo(0.11 * w, 0.26 * h, 0, 0, 1, 0.5 * w, 0.74 * h);
		c.arcTo(0.11 * w, 0.26 * h, 0, 0, 1, 0.61 * w, h);
		c.close();
	}
	else
	{
		c.moveTo(0.28 * w, 0.1 * h);
		c.lineTo(0.72 * w, 0.1 * h);
		c.moveTo(0.5 * w, 0.1 * h);
		c.lineTo(0.5 * w, 0.49 * h);
		c.moveTo(0.39 * w, 0.75 * h);
		c.arcTo(0.11 * w, 0.26 * h, 0, 0, 1, 0.5 * w, 0.49 * h);
		c.arcTo(0.11 * w, 0.26 * h, 0, 0, 1, 0.61 * w, 0.75 * h);
		c.close();
	}

	c.stroke();
	
	c.ellipse(0.2 * w, 0, 0.08 * w, 0.2 * h);
	c.stroke();

	c.ellipse(0.72 * w, 0, 0.08 * w, 0.2 * h);
	c.stroke();
};

mxCellRenderer.registerShape(mxShapeElectricalPressureActuatedSwitch.prototype.cst.SHAPE_PRESSURE_ACTUATED_SWITCH, mxShapeElectricalPressureActuatedSwitch);

mxShapeElectricalPressureActuatedSwitch.prototype.constraints = [
	new mxConnectionConstraint(new mxPoint(0, 0.1), true),
	new mxConnectionConstraint(new mxPoint(1, 0.1), true)
	];

//**********************************************************************************************************************************************************
// Temperature Actuated Switch
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeElectricalTemperatureActuatedSwitch(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxShapeElectricalTemperatureActuatedSwitch, mxShape);

mxShapeElectricalTemperatureActuatedSwitch.prototype.cst = {
		SHAPE_TEMPERATURE_ACTUATED_SWITCH : 'mxgraph.electrical.electro-mechanical.temperatureActuatedSwitch'
};

mxShapeElectricalTemperatureActuatedSwitch.prototype.customProperties = [
	{name: 'elSwitchState', dispName: 'Switch State', type: 'enum', defVal: 'on',
		enumList:[
			{val:'on', dispName:'On'},
			{val:'off', dispName:'Off'}
		]}
];

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeElectricalTemperatureActuatedSwitch.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	var switchState = mxUtils.getValue(this.style, 'elSwitchState', 'on');

	c.begin();

	c.moveTo(0.8 * w, 0.1 * h);
	c.lineTo(w, 0.1 * h);
	c.moveTo(0, 0.1 * h);
	c.lineTo(0.2 * w, 0.1 * h);

	if (switchState == 'off')
	{
		c.moveTo(0.28 * w, 0.13 * h);
		c.lineTo(0.76 * w, 0.61 * h);
		c.moveTo(0.5 * w, 0.35 * h);
		c.lineTo(0.5 * w, 0.64 * h);
		c.lineTo(0.57 * w, 0.64 * h);
		c.lineTo(0.57 * w, 0.81 * h);
		c.lineTo(0.5 * w, 0.81 * h);
		c.lineTo(0.5 * w, h);
	}
	else
	{
		c.moveTo(0.28 * w, 0.1 * h);
		c.lineTo(0.72 * w, 0.1 * h);
		c.moveTo(0.5 * w, 0.1 * h);
		c.lineTo(0.5 * w, 0.39 * h);
		c.lineTo(0.57 * w, 0.39 * h);
		c.lineTo(0.57 * w, 0.56 * h);
		c.lineTo(0.5 * w, 0.56 * h);
		c.lineTo(0.5 * w, 0.75 * h);
	}

	c.stroke();
	
	c.ellipse(0.2 * w, 0, 0.08 * w, 0.2 * h);
	c.stroke();

	c.ellipse(0.72 * w, 0, 0.08 * w, 0.2 * h);
	c.stroke();
};

mxCellRenderer.registerShape(mxShapeElectricalTemperatureActuatedSwitch.prototype.cst.SHAPE_TEMPERATURE_ACTUATED_SWITCH, mxShapeElectricalTemperatureActuatedSwitch);

mxShapeElectricalTemperatureActuatedSwitch.prototype.constraints = [
	new mxConnectionConstraint(new mxPoint(0, 0.1), true),
	new mxConnectionConstraint(new mxPoint(1, 0.1), true)
	];

//**********************************************************************************************************************************************************
// Safety Interlock Switch
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeElectricalSafetyInterlockSwitch(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxShapeElectricalSafetyInterlockSwitch, mxShape);

mxShapeElectricalSafetyInterlockSwitch.prototype.cst = {
		SHAPE_SAFETY_INTERLOCK_SWITCH : 'mxgraph.electrical.electro-mechanical.safetyInterlockSwitch'
};

mxShapeElectricalSafetyInterlockSwitch.prototype.customProperties = [
	{name: 'elSwitchState', dispName: 'Switch State', type: 'enum', defVal: 'on',
		enumList:[
			{val:'on', dispName:'On'},
			{val:'off', dispName:'Off'}
		]}
];

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeElectricalSafetyInterlockSwitch.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	var switchState = mxUtils.getValue(this.style, 'elSwitchState', 'on');

	c.begin();

	c.moveTo(0.8 * w, 0.34 * h);
	c.lineTo(w, 0.34 * h);
	c.moveTo(0, 0.34 * h);
	c.lineTo(0.2 * w, 0.34 * h);

	if (switchState == 'off')
	{
		c.moveTo(0.25 * w, 0);
		c.lineTo(0.75 * w, 0);
		c.lineTo(0.5 * w, 0.81 * h);
		c.close();
	}
	else
	{
		c.moveTo(0.25 * w, 0.19 * h);
		c.lineTo(0.75 * w, 0.19 * h);
		c.lineTo(0.5 * w, h);
		c.close();
	}

	c.stroke();
	
	c.ellipse(0.2 * w, 0.27 * h, 0.08 * w, 0.14 * h);
	c.stroke();

	c.ellipse(0.72 * w, 0.27 * h, 0.08 * w, 0.14 * h);
	c.stroke();
};

mxCellRenderer.registerShape(mxShapeElectricalSafetyInterlockSwitch.prototype.cst.SHAPE_SAFETY_INTERLOCK_SWITCH, mxShapeElectricalSafetyInterlockSwitch);

mxShapeElectricalSafetyInterlockSwitch.prototype.constraints = [
	new mxConnectionConstraint(new mxPoint(0, 0.35), true),
	new mxConnectionConstraint(new mxPoint(1, 0.35), true)
	];

//**********************************************************************************************************************************************************
// Temperature Switch
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeElectricalTemperatureSwitch(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxShapeElectricalTemperatureSwitch, mxShape);

mxShapeElectricalTemperatureSwitch.prototype.cst = {
		SHAPE_TEMPERATURE_SWITCH : 'mxgraph.electrical.electro-mechanical.temperatureSwitch'
};

mxShapeElectricalTemperatureSwitch.prototype.customProperties = [
	{name: 'elSwitchState', dispName: 'Switch State', type: 'enum', defVal: 'on',
		enumList:[
			{val:'on', dispName:'On'},
			{val:'off', dispName:'Off'}
		]}
];

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeElectricalTemperatureSwitch.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	var switchState = mxUtils.getValue(this.style, 'elSwitchState', 'on');

	c.begin();
	c.moveTo(0.76 * w, h);
	c.lineTo(w, h);
	c.moveTo(0, h);
	c.lineTo(0.24 * w, h);

	if (switchState == 'off')
	{
		c.lineTo(0.76 * w, 0.1 * h);
	}
	else
	{
		c.lineTo(0.76 * w, h);
	}

	c.stroke();
	
	c.ellipse(0.43 * w, 0, 0.1 * w, 0.22 * h);
	c.fillAndStroke();
	c.begin();
	c.moveTo(0.48 * w, 0);
	c.lineTo(0.48 * w, 0.22 * h);
	c.stroke();
};

mxCellRenderer.registerShape(mxShapeElectricalTemperatureSwitch.prototype.cst.SHAPE_TEMPERATURE_SWITCH, mxShapeElectricalTemperatureSwitch);

mxShapeElectricalTemperatureSwitch.prototype.constraints = [
	new mxConnectionConstraint(new mxPoint(0, 1), true),
	new mxConnectionConstraint(new mxPoint(1, 1), true)
	];
	
//**********************************************************************************************************************************************************
// Thermostat2
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeElectricalThermostat2(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxShapeElectricalThermostat2, mxShape);

mxShapeElectricalThermostat2.prototype.cst = {
		SHAPE_THERMOSTAT2 : 'mxgraph.electrical.electro-mechanical.thermostat2'
};

mxShapeElectricalThermostat2.prototype.customProperties = [
	{name: 'elSwitchState', dispName: 'Switch State', type: 'enum', defVal: 'on',
		enumList:[
			{val:'on', dispName:'On'},
			{val:'off', dispName:'Off'}
		]}
];

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeElectricalThermostat2.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	var switchState = mxUtils.getValue(this.style, 'elSwitchState', 'on');

	c.begin();
	c.moveTo(0.8 * w, 0.86 * h);
	c.lineTo(w, 0.86 * h);
	c.moveTo(0, 0.86 * h);	
	c.lineTo(0.2 * w, 0.86 * h);

	if (switchState == 'off')
	{
		c.moveTo(0.28 * w, 0.82 * h);
		c.lineTo(0.76 * w, 0.2 * h);
	}
	else
	{
		c.moveTo(0.28 * w, 0.86 * h);
		c.lineTo(0.72 * w, 0.85 * h);
	}

	c.stroke();
	c.ellipse(0.2 * w, 0.72 * h, 0.08 * w, 0.28 * h);
	c.fillAndStroke();
	c.ellipse(0.72 * w, 0.72 * h, 0.08 * w, 0.28 * h);
	c.fillAndStroke();
	c.text(0.5 * w, 0.2 * h, 0, 0, 'tº', mxConstants.ALIGN_CENTER, mxConstants.ALIGN_MIDDLE, 0, null, 0, 0, 0);
};

mxCellRenderer.registerShape(mxShapeElectricalThermostat2.prototype.cst.SHAPE_THERMOSTAT2, mxShapeElectricalThermostat2);

mxShapeElectricalThermostat2.prototype.constraints = [
	new mxConnectionConstraint(new mxPoint(0, 1), true),
	new mxConnectionConstraint(new mxPoint(1, 1), true)
	];

//**********************************************************************************************************************************************************
// Limit Switch 2
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeElectricalLimitSwitch2(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxShapeElectricalLimitSwitch2, mxShape);

mxShapeElectricalLimitSwitch2.prototype.cst = {
		SHAPE_LIMIT_SWITCH2 : 'mxgraph.electrical.electro-mechanical.limitSwitch2'
};

mxShapeElectricalLimitSwitch2.prototype.customProperties = [
	{name: 'elSwitchState', dispName: 'Switch State', type: 'enum', defVal: 'on',
		enumList:[
			{val:'on', dispName:'On'},
			{val:'off', dispName:'Off'}
		]}
];

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeElectricalLimitSwitch2.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	var switchState = mxUtils.getValue(this.style, 'elSwitchState', 'on');

	c.begin();
	c.moveTo(0.8 * w, 0.84 * h);
	c.lineTo(w, 0.84 * h);
	c.moveTo(0, 0.84 * h);	
	c.lineTo(0.2 * w, 0.84 * h);

	if (switchState == 'off')
	{
		c.moveTo(0.28 * w, 0.8 * h);
		c.lineTo(0.76 * w, 0);
		c.moveTo(0.46 * w, 0.5 * h);
		c.lineTo(0.545 * w, 0.07 * h);
		c.lineTo(0.57 * w, 0.3 * h);
	}
	else
	{
		c.moveTo(0.28 * w, 0.84 * h);
		c.lineTo(0.72 * w, 0.84 * h);
		c.moveTo(0.47 * w, 0.84 * h);
		c.lineTo(0.58 * w, 0.57 * h);
		c.lineTo(0.58 * w, 0.84 * h);
	}

	c.stroke();
	c.ellipse(0.2 * w, 0.68 * h, 0.08 * w, 0.32 * h);
	c.fillAndStroke();
	c.ellipse(0.72 * w, 0.68 * h, 0.08 * w, 0.32 * h);
	c.fillAndStroke();
};

mxCellRenderer.registerShape(mxShapeElectricalLimitSwitch2.prototype.cst.SHAPE_LIMIT_SWITCH2, mxShapeElectricalLimitSwitch2);

mxShapeElectricalLimitSwitch2.prototype.constraints = [
	new mxConnectionConstraint(new mxPoint(0, 1), true),
	new mxConnectionConstraint(new mxPoint(1, 1), true)
	];

//**********************************************************************************************************************************************************
// Circuit Breaker 2
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeElectricalCircuitBreaker2(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxShapeElectricalCircuitBreaker2, mxShape);

mxShapeElectricalCircuitBreaker2.prototype.cst = {
		SHAPE_CIRCUIT_BREAKER2 : 'mxgraph.electrical.electro-mechanical.circuitBreaker2'
};

mxShapeElectricalCircuitBreaker2.prototype.customProperties = [
	{name: 'elSwitchState', dispName: 'Switch State', type: 'enum', defVal: 'on',
		enumList:[
			{val:'on', dispName:'On'},
			{val:'off', dispName:'Off'}
		]}
];

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeElectricalCircuitBreaker2.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	var switchState = mxUtils.getValue(this.style, 'elSwitchState', 'on');

	c.begin();
	c.moveTo(0.8 * w, 0.8 * h);
	c.lineTo(w, 0.8 * h);
	c.moveTo(0.75 * w, 0.6 * h);
	c.lineTo(0.85 * w, h);
	c.moveTo(0.85 * w, 0.6 * h);
	c.lineTo(0.75 * w, h);
	c.moveTo(0, 0.8 * h);	
	c.lineTo(0.24 * w, 0.8 * h);

	if (switchState == 'off')
	{
		c.lineTo(0.76 * w, 0);
	}
	else
	{
		c.lineTo(0.8 * w, 0.8 * h);
	}

	c.stroke();
};

mxCellRenderer.registerShape(mxShapeElectricalCircuitBreaker2.prototype.cst.SHAPE_CIRCUIT_BREAKER2, mxShapeElectricalCircuitBreaker2);

mxShapeElectricalCircuitBreaker2.prototype.constraints = [
	new mxConnectionConstraint(new mxPoint(0, 0.8), true),
	new mxConnectionConstraint(new mxPoint(1, 0.8), true)
	];

//**********************************************************************************************************************************************************
// Selector Switch - 3 Position 2
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeElectricalSelectorSwitch3Position2(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxShapeElectricalSelectorSwitch3Position2, mxShape);

mxShapeElectricalSelectorSwitch3Position2.prototype.cst = {
		SHAPE_SELECTOR_SWITCH_3_POSITION : 'mxgraph.electrical.electro-mechanical.selectorSwitch3Position2'
};

mxShapeElectricalSelectorSwitch3Position2.prototype.customProperties = [
	{name: 'elSwitchState', dispName: 'Switch State', type: 'int', min:1, max:3, defVal: '1',}
];

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeElectricalSelectorSwitch3Position2.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	var switchState = mxUtils.getValue(this.style, 'elSwitchState', '1');
	var strokeColor = mxUtils.getValue(this.style, 'strokeColor', '#000000');

	c.begin();
	c.moveTo(0, 0.5 * h);
	c.lineTo(0.2 * w, 0.5 * h);
	c.moveTo(0.68 * w, 0.06 * h);
	c.lineTo(w, 0.06 * h);
	c.moveTo(0.75 * w, 0.5 * h);
	c.lineTo(w, 0.5 * h);
	c.moveTo(0.68 * w, 0.94 * h);
	c.lineTo(w, 0.94 * h);
	c.stroke();
	c.ellipse(0.2 * w, 0.435 * h, 0.08 * w, 0.13 * h);
	c.fillAndStroke();
	c.ellipse(0.6 * w, 0, 0.08 * w, 0.13 * h);
	c.fillAndStroke();
	c.ellipse(0.67 * w, 0.435 * h, 0.08 * w, 0.13 * h);
	c.fillAndStroke();
	c.ellipse(0.6 * w, 0.87 * h, 0.08 * w, 0.13 * h);
	c.fillAndStroke();
	c.setFillColor(strokeColor);
	
	if (switchState == '1')
	{
		c.begin();
		c.moveTo(0.27 * w, 0.47 * h);
		c.lineTo(0.59 * w, 0.12 * h);
		c.stroke();
		c.begin();
		c.moveTo(0.52 * w, 0.12 * h);
		c.lineTo(0.61 * w, 0.095 * h);
		c.lineTo(0.565 * w, 0.22 * h);
		c.close();
		c.fill();
	}
	else if (switchState == '2')
	{
		c.begin();
		c.moveTo(0.28 * w, 0.5 * h);
		c.lineTo(0.64 * w, 0.5 * h);
		c.stroke();
		c.begin();
		c.moveTo(0.59 * w, 0.44 * h);
		c.lineTo(0.67 * w, 0.5 * h);
		c.lineTo(0.59 * w, 0.56 * h);
		c.close();
		c.fill();
	}
	else
	{
		c.begin();
		c.moveTo(0.27 * w, 0.53 * h);
		c.lineTo(0.59 * w, 0.88 * h);
		c.stroke();
		c.begin();
		c.moveTo(0.52 * w, 0.88 * h);
		c.lineTo(0.61 * w, 0.905 * h);
		c.lineTo(0.565 * w, 0.78 * h);
		c.close();
		c.fill();
	}
};

mxCellRenderer.registerShape(mxShapeElectricalSelectorSwitch3Position2.prototype.cst.SHAPE_SELECTOR_SWITCH_3_POSITION, mxShapeElectricalSelectorSwitch3Position2);

mxShapeElectricalSelectorSwitch3Position2.prototype.constraints = [
	new mxConnectionConstraint(new mxPoint(0, 0.8), true),
	new mxConnectionConstraint(new mxPoint(1, 0.8), true)
	];

//**********************************************************************************************************************************************************
// Selector Switch - 4 Position 2
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeElectricalSelectorSwitch4Position2(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxShapeElectricalSelectorSwitch4Position2, mxShape);

mxShapeElectricalSelectorSwitch4Position2.prototype.cst = {
		SHAPE_SELECTOR_SWITCH_4_POSITION : 'mxgraph.electrical.electro-mechanical.selectorSwitch4Position2'
};

mxShapeElectricalSelectorSwitch4Position2.prototype.customProperties = [
	{name: 'elSwitchState', dispName: 'Switch State', type: 'int', min:1, max:4, defVal: '1',}
];

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeElectricalSelectorSwitch4Position2.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	var switchState = mxUtils.getValue(this.style, 'elSwitchState', '1');
	var strokeColor = mxUtils.getValue(this.style, 'strokeColor', '#000000');

	c.begin();
	c.moveTo(0, 0.5 * h);
	c.lineTo(0.2 * w, 0.5 * h);
	c.moveTo(0.68 * w, 0.045 * h);
	c.lineTo(w, 0.045 * h);
	c.moveTo(0.8 * w, 0.35 * h);
	c.lineTo(w, 0.35 * h);
	c.moveTo(0.8 * w, 0.65 * h);
	c.lineTo(w, 0.65 * h);
	c.moveTo(0.68 * w, 0.955 * h);
	c.lineTo(w, 0.955 * h);
	c.stroke();
	c.ellipse(0.2 * w, 0.455 * h, 0.08 * w, 0.09 * h);
	c.fillAndStroke();
	c.ellipse(0.6 * w, 0, 0.08 * w, 0.09 * h);
	c.fillAndStroke();
	c.ellipse(0.72 * w, 0.305 * h, 0.08 * w, 0.09 * h);
	c.fillAndStroke();
	c.ellipse(0.72 * w, 0.605 * h, 0.08 * w, 0.09 * h);
	c.fillAndStroke();
	c.ellipse(0.6 * w, 0.91 * h, 0.08 * w, 0.09 * h);
	c.fillAndStroke();
	c.setFillColor(strokeColor);
	
	if (switchState == '1')
	{
		c.begin();
		c.moveTo(0.27 * w, 0.47 * h);
		c.lineTo(0.58 * w, 0.11 * h);
		c.stroke();
		c.begin();
		c.moveTo(0.515 * w, 0.115 * h);
		c.lineTo(0.61 * w, 0.08 * h);
		c.lineTo(0.58 * w, 0.18 * h);
		c.close();
		c.fill();
	}
	else if (switchState == '2')
	{
		c.begin();
		c.moveTo(0.28 * w, 0.485 * h);
		c.lineTo(0.69 * w, 0.37 * h);
		c.stroke();
		c.begin();
		c.moveTo(0.62 * w, 0.34 * h);
		c.lineTo(0.72 * w, 0.36 * h);
		c.lineTo(0.64 * w, 0.43 * h);
		c.close();
		c.fill();
	}
	else if (switchState == '3')
	{
		c.begin();
		c.moveTo(0.28 * w, 0.515 * h);
		c.lineTo(0.69 * w, 0.63 * h);
		c.stroke();
		c.begin();
		c.moveTo(0.62 * w, 0.66 * h);
		c.lineTo(0.72 * w, 0.64 * h);
		c.lineTo(0.64 * w, 0.57 * h);
		c.close();
		c.fill();
	}
	else
	{
		c.begin();
		c.moveTo(0.27 * w, 0.53 * h);
		c.lineTo(0.58 * w, 0.89 * h);
		c.stroke();
		c.begin();
		c.moveTo(0.515 * w, 0.885 * h);
		c.lineTo(0.61 * w, 0.92 * h);
		c.lineTo(0.58 * w, 0.82 * h);
		c.close();
		c.fill();
	}
};

mxCellRenderer.registerShape(mxShapeElectricalSelectorSwitch4Position2.prototype.cst.SHAPE_SELECTOR_SWITCH_4_POSITION, mxShapeElectricalSelectorSwitch4Position2);

mxShapeElectricalSelectorSwitch4Position2.prototype.constraints = [
	new mxConnectionConstraint(new mxPoint(0, 0.8), true),
	new mxConnectionConstraint(new mxPoint(1, 0.8), true)
	];

//**********************************************************************************************************************************************************
// Selector Switch - 6 Position 2
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeElectricalSelectorSwitch6Position2(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxShapeElectricalSelectorSwitch6Position2, mxShape);

mxShapeElectricalSelectorSwitch6Position2.prototype.cst = {
		SHAPE_SELECTOR_SWITCH_6_POSITION : 'mxgraph.electrical.electro-mechanical.selectorSwitch6Position2'
};

mxShapeElectricalSelectorSwitch6Position2.prototype.customProperties = [
	{name: 'elSwitchState', dispName: 'Switch State', type: 'int', min:1, max:6, defVal: '1',}
];

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeElectricalSelectorSwitch6Position2.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	var switchState = mxUtils.getValue(this.style, 'elSwitchState', '1');
	var strokeColor = mxUtils.getValue(this.style, 'strokeColor', '#000000');

	c.begin();
	c.moveTo(0, 0.5 * h);
	c.lineTo(0.2 * w, 0.5 * h);
	c.moveTo(0.39 * w, 0.03 * h);
	c.lineTo(w, 0.03 * h);
	c.moveTo(0.68 * w, 0.22 * h);
	c.lineTo(w, 0.22 * h);
	c.moveTo(0.8 * w, 0.405 * h);
	c.lineTo(w, 0.405 * h);
	c.moveTo(0.8 * w, 0.595 * h);
	c.lineTo(w, 0.595 * h);
	c.moveTo(0.68 * w, 0.78 * h);
	c.lineTo(w, 0.78 * h);
	c.moveTo(0.39 * w, 0.97 * h);
	c.lineTo(w, 0.97 * h);
	c.stroke();
	c.ellipse(0.2 * w, 0.47 * h, 0.08 * w, 0.06 * h);
	c.fillAndStroke();
	c.ellipse(0.31 * w, 0, 0.08 * w, 0.06 * h);
	c.fillAndStroke();
	c.ellipse(0.6 * w, 0.19 * h, 0.08 * w, 0.06 * h);
	c.fillAndStroke();
	c.ellipse(0.72 * w, 0.375 * h, 0.08 * w, 0.06 * h);
	c.fillAndStroke();
	c.ellipse(0.72 * w, 0.565 * h, 0.08 * w, 0.06 * h);
	c.fillAndStroke();
	c.ellipse(0.6 * w, 0.75 * h, 0.08 * w, 0.06 * h);
	c.fillAndStroke();
	c.ellipse(0.31 * w, 0.94 * h, 0.08 * w, 0.06 * h);
	c.fillAndStroke();
	c.setFillColor(strokeColor);
	
	if (switchState == '1')
	{
		c.begin();
		c.moveTo(0.25 * w, 0.47 * h);
		c.lineTo(0.34 * w, 0.08 * h);
		c.stroke();
		c.begin();
		c.moveTo(0.29 * w, 0.115 * h);
		c.lineTo(0.34 * w, 0.06 * h);
		c.lineTo(0.37 * w, 0.12 * h);
		c.close();
		c.fill();
	}
	else if (switchState == '2')
	{
		c.begin();
		c.moveTo(0.27 * w, 0.48 * h);
		c.lineTo(0.595 * w, 0.25 * h);
		c.stroke();
		c.begin();
		c.moveTo(0.52 * w, 0.265 * h);
		c.lineTo(0.61 * w, 0.24 * h);
		c.lineTo(0.58 * w, 0.302 * h);
		c.close();
		c.fill();
	}
	else if (switchState == '3')
	{
		c.begin();
		c.moveTo(0.28 * w, 0.495 * h);
		c.lineTo(0.69 * w, 0.42 * h);
		c.stroke();
		c.begin();
		c.moveTo(0.63 * w, 0.405 * h);
		c.lineTo(0.72 * w, 0.415 * h);
		c.lineTo(0.65 * w, 0.455 * h);
		c.close();
		c.fill();
	}
	else if (switchState == '4')
	{
		c.begin();
		c.moveTo(0.28 * w, 0.505 * h);
		c.lineTo(0.69 * w, 0.58 * h);
		c.stroke();
		c.begin();
		c.moveTo(0.63 * w, 0.595 * h);
		c.lineTo(0.72 * w, 0.585 * h);
		c.lineTo(0.65 * w, 0.545 * h);
		c.close();
		c.fill();
	}
	else if (switchState == '5')
	{
		c.begin();
		c.moveTo(0.27 * w, 0.52 * h);
		c.lineTo(0.595 * w, 0.75 * h);
		c.stroke();
		c.begin();
		c.moveTo(0.52 * w, 0.735 * h);
		c.lineTo(0.61 * w, 0.76 * h);
		c.lineTo(0.58 * w, 0.698 * h);
		c.close();
		c.fill();
	}
	else
	{
		c.begin();
		c.moveTo(0.25 * w, 0.53 * h);
		c.lineTo(0.34 * w, 0.92 * h);
		c.stroke();
		c.begin();
		c.moveTo(0.29 * w, 0.885 * h);
		c.lineTo(0.34 * w, 0.94 * h);
		c.lineTo(0.37 * w, 0.88 * h);
		c.close();
		c.fill();
	}
};

mxCellRenderer.registerShape(mxShapeElectricalSelectorSwitch6Position2.prototype.cst.SHAPE_SELECTOR_SWITCH_6_POSITION, mxShapeElectricalSelectorSwitch6Position2);

mxShapeElectricalSelectorSwitch6Position2.prototype.constraints = [
	new mxConnectionConstraint(new mxPoint(0, 0.5), true),
	new mxConnectionConstraint(new mxPoint(1, 0.03), true),
	new mxConnectionConstraint(new mxPoint(1, 0.22), true),
	new mxConnectionConstraint(new mxPoint(1, 0.405), true),
	new mxConnectionConstraint(new mxPoint(1, 0.595), true),
	new mxConnectionConstraint(new mxPoint(1, 0.78), true),
	new mxConnectionConstraint(new mxPoint(1, 0.97), true)
	];

//**********************************************************************************************************************************************************
// Shorting Selector Switch 2
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeElectricalShortingSelectorSwitch2(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxShapeElectricalShortingSelectorSwitch2, mxShape);

mxShapeElectricalShortingSelectorSwitch2.prototype.cst = {
		SHAPE_SHORTING_SELECTOR_SWITCH_2 : 'mxgraph.electrical.electro-mechanical.shortingSelectorSwitch2'
};

mxShapeElectricalShortingSelectorSwitch2.prototype.customProperties = [
	{name: 'elSwitchState', dispName: 'Switch State', type: 'int', min:1, max:4, defVal: '1',}
];

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeElectricalShortingSelectorSwitch2.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	var switchState = mxUtils.getValue(this.style, 'elSwitchState', '1');
	var strokeColor = mxUtils.getValue(this.style, 'strokeColor', '#000000');

	c.begin();
	c.moveTo(0, 0.5 * h);
	c.lineTo(0.25 * w, 0.5 * h);
	c.stroke();
	c.ellipse(0.25 * w, 0.455 * h, 0.1 * w, 0.09 * h);
	c.fillAndStroke();
	c.ellipse(0.75 * w, 0, 0.1 * w, 0.09 * h);
	c.fillAndStroke();
	c.ellipse(0.9 * w, 0.305 * h, 0.1 * w, 0.09 * h);
	c.fillAndStroke();
	c.ellipse(0.9 * w, 0.605 * h, 0.1 * w, 0.09 * h);
	c.fillAndStroke();
	c.ellipse(0.75 * w, 0.91 * h, 0.1 * w, 0.09 * h);
	c.fillAndStroke();

	if (switchState == '1')
	{
		c.begin();
		c.moveTo(0.33 * w, 0.47 * h);
		c.lineTo(0.72 * w, 0.12 * h);
		c.stroke();
		c.begin();
		c.moveTo(0.617 * w, 0.044 * h);
		c.arcTo(0.21 * w, 0.17 *  h, 0, 0, 1, 0.818 * w, 0.182 * h);
		c.lineTo(0.766 * w, 0.198 * h);
		c.arcTo(0.15 * w, 0.13 *  h, 0, 0, 0, 0.617 * w, 0.092 * h);
		c.close();
		c.fillAndStroke();
	}
	else if (switchState == '2')
	{
		c.begin();
		c.moveTo(0.34 * w, 0.49 * h);
		c.lineTo(0.83 * w, 0.375 * h);
		c.stroke();
		c.begin();
		c.moveTo(0.791 * w, 0.263 * h);
		c.arcTo(0.24 * w, 0.2 *  h, 0, 0, 1, 0.889 * w, 0.474 * h);
		c.lineTo(0.837 * w, 0.465 * h);
		c.arcTo(0.16 * w, 0.14 *  h, 0, 0, 0, 0.767 * w, 0.303 * h);
		c.close();
		c.fillAndStroke();
	}
	else if (switchState == '3')
	{
		c.begin();
		c.moveTo(0.34 * w, 0.51 * h);
		c.lineTo(0.83 * w, 0.625 * h);
		c.stroke();
		c.begin();
		c.moveTo(0.791 * w, 0.737 * h);
		c.arcTo(0.24 * w, 0.2 *  h, 0, 0, 0, 0.889 * w, 0.526 * h);
		c.lineTo(0.837 * w, 0.535 * h);
		c.arcTo(0.16 * w, 0.14 *  h, 0, 0, 1, 0.767 * w, 0.697 * h);
		c.close();
		c.fillAndStroke();
	}
	else
	{
		c.begin();
		c.moveTo(0.33 * w, 0.53 * h);
		c.lineTo(0.72 * w, 0.88 * h);
		c.stroke();
		c.begin();
		c.moveTo(0.617 * w, 0.956 * h);
		c.arcTo(0.21 * w, 0.17 *  h, 0, 0, 0, 0.818 * w, 0.818 * h);
		c.lineTo(0.766 * w, 0.802 * h);
		c.arcTo(0.15 * w, 0.13 *  h, 0, 0, 1, 0.617 * w, 0.908 * h);
		c.close();
		c.fillAndStroke();
	}
};

mxCellRenderer.registerShape(mxShapeElectricalShortingSelectorSwitch2.prototype.cst.SHAPE_SHORTING_SELECTOR_SWITCH_2, mxShapeElectricalShortingSelectorSwitch2);

mxShapeElectricalShortingSelectorSwitch2.prototype.constraints = [
	  new mxConnectionConstraint(new mxPoint(0, 0.5), true)
	  ];

//**********************************************************************************************************************************************************
// Proximity Limit Switch 2
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeElectricalProximityLimitSwitch2(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxShapeElectricalProximityLimitSwitch2, mxShape);

mxShapeElectricalProximityLimitSwitch2.prototype.cst = {
		SHAPE_PROXIMITY_LIMIT_SWITCH_2 : 'mxgraph.electrical.electro-mechanical.proximityLimitSwitch2'
};

mxShapeElectricalProximityLimitSwitch2.prototype.customProperties = [
	{name: 'elSwitchState', dispName: 'Switch State', type: 'enum', defVal: 'on',
		enumList:[
			{val:'on', dispName:'On'},
			{val:'off', dispName:'Off'}
		]}
];

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeElectricalProximityLimitSwitch2.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	var switchState = mxUtils.getValue(this.style, 'elSwitchState', 'on');

	c.begin();
	c.moveTo(0, 0.5 * h);
	c.lineTo(0.2 * w, 0.5 * h);
	c.moveTo(0.8 * w, 0.5 * h);
	c.lineTo(w, 0.5 * h);
	c.moveTo(0.13 * w, 0.5 * h);
	c.lineTo(0.5 * w, 0);
	c.lineTo(0.87 * w, 0.5 * h);
	c.lineTo(0.5 * w, h);
	c.close();
	c.stroke();
	
	if (switchState == 'off')
	{
		c.begin();
		c.moveTo(0.755 * w, 0.355 * h);
		c.lineTo(0.22 * w, 0.5 * h);
		c.lineTo(0.625 * w, 0.61 * h);
		c.lineTo(0.72 * w, 0.36 * h);
		c.stroke();
	}
	else
	{
		c.begin();
		c.moveTo(0.76 * w, 0.43 * h);
		c.lineTo(0.235 * w, 0.5 * h);
		c.lineTo(0.615 * w, 0.66 * h);
		c.lineTo(0.72 * w, 0.44 * h);
		c.stroke();
	}

	c.ellipse(0.2 * w, 0.445 * h, 0.08 * w, 0.11 * h);
	c.fillAndStroke();
	c.ellipse(0.72 * w, 0.445 * h, 0.08 * w, 0.11 * h);
	c.fillAndStroke();
};

mxCellRenderer.registerShape(mxShapeElectricalProximityLimitSwitch2.prototype.cst.SHAPE_PROXIMITY_LIMIT_SWITCH_2, mxShapeElectricalProximityLimitSwitch2);

mxShapeElectricalProximityLimitSwitch2.prototype.constraints = [
	  new mxConnectionConstraint(new mxPoint(0, 0.5), true),
	  new mxConnectionConstraint(new mxPoint(1, 0.5), true)
	  ];

//**********************************************************************************************************************************************************
// Inertia Switch 2
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeElectricalInertiaSwitch2(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxShapeElectricalInertiaSwitch2, mxShape);

mxShapeElectricalInertiaSwitch2.prototype.cst = {
		SHAPE_INERTIA_SWITCH_2 : 'mxgraph.electrical.electro-mechanical.inertiaSwitch2'
};

mxShapeElectricalInertiaSwitch2.prototype.customProperties = [
	{name: 'elSwitchState', dispName: 'Switch State', type: 'enum', defVal: 'on',
		enumList:[
			{val:'on', dispName:'On'},
			{val:'off', dispName:'Off'}
		]}
];

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeElectricalInertiaSwitch2.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	var switchState = mxUtils.getValue(this.style, 'elSwitchState', 'on');

	c.begin();
	c.moveTo(0, 0.85 * h);
	c.lineTo(0.2 * w, 0.85 * h);
	c.moveTo(0.8 * w, 0.85 * h);
	c.lineTo(w, 0.85 * h);
	c.stroke();
	
	if (switchState == 'off')
	{
		c.begin();
		c.moveTo(0.28 * w, 0.79 * h);
		c.lineTo(0.76 * w, 0);
		c.moveTo(0.493 * w, 0.45 * h);
		c.lineTo(0.493 * w, 0.26 * h);
		c.lineTo(0.43 * w, 0.26 * h);
		c.stroke();
		c.ellipse(0.35 * w, 0.1 * h, 0.08 * w, 0.3 * h);
		c.fillAndStroke();
	}
	else
	{
		c.begin();
		c.moveTo(0.28 * w, 0.85 * h);
		c.lineTo(0.76 * w, 0.85 * h);
		c.moveTo(0.51 * w, 0.85 * h);
		c.lineTo(0.51 * w, 0.26 * h);
		c.lineTo(0.43 * w, 0.26 * h);
		c.stroke();
		c.ellipse(0.35 * w, 0.1 * h, 0.08 * w, 0.3 * h);
		c.fillAndStroke();
	}

	c.ellipse(0.2 * w, 0.7 * h, 0.08 * w, 0.3 * h);
	c.fillAndStroke();
	c.ellipse(0.72 * w, 0.7 * h, 0.08 * w, 0.3 * h);
	c.fillAndStroke();
};

mxCellRenderer.registerShape(mxShapeElectricalInertiaSwitch2.prototype.cst.SHAPE_INERTIA_SWITCH_2, mxShapeElectricalInertiaSwitch2);

mxShapeElectricalInertiaSwitch2.prototype.constraints = [
	new mxConnectionConstraint(new mxPoint(0, 0.85), true),
	new mxConnectionConstraint(new mxPoint(1, 0.85), true)
	];

//**********************************************************************************************************************************************************
// Pushbutton Break 2
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeElectricalPushbuttonBreak2(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxShapeElectricalPushbuttonBreak2, mxShape);

mxShapeElectricalPushbuttonBreak2.prototype.cst = {
		SHAPE_PUSHBUTTON_BREAK_2 : 'mxgraph.electrical.electro-mechanical.pushbuttonBreak2'
};

mxShapeElectricalPushbuttonBreak2.prototype.customProperties = [
	{name: 'elSwitchState', dispName: 'Switch State', type: 'enum', defVal: 'on',
		enumList:[
			{val:'on', dispName:'On'},
			{val:'off', dispName:'Off'}
		]}
];

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeElectricalPushbuttonBreak2.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	var switchState = mxUtils.getValue(this.style, 'elSwitchState', 'on');

	c.begin();
	c.moveTo(0, 0.8 * h);
	c.lineTo(0.2 * w, 0.8 * h);
	c.moveTo(0.8 * w, 0.8 * h);
	c.lineTo(w, 0.8 * h);
	c.stroke();
	
	if (switchState == 'off')
	{
		c.begin();
		c.moveTo(0.24 * w, h);
		c.lineTo(0.76 * w, h);
		c.moveTo(0.5 * w, h);
		c.lineTo(0.5 * w, 0.1 * h);
		c.stroke();
	}
	else
	{
		c.begin();
		c.moveTo(0.24 * w, 0.9 * h);
		c.lineTo(0.76 * w, 0.9 * h);
		c.moveTo(0.5 * w, 0.9 * h);
		c.lineTo(0.5 * w, 0);
		c.stroke();
	}

	c.ellipse(0.2 * w, 0.725 * h, 0.08 * w, 0.15 * h);
	c.fillAndStroke();
	c.ellipse(0.72 * w, 0.725 * h, 0.08 * w, 0.15 * h);
	c.fillAndStroke();
};

mxCellRenderer.registerShape(mxShapeElectricalPushbuttonBreak2.prototype.cst.SHAPE_PUSHBUTTON_BREAK_2, mxShapeElectricalPushbuttonBreak2);

mxShapeElectricalPushbuttonBreak2.prototype.constraints = [
	new mxConnectionConstraint(new mxPoint(0, 0.8), true),
	new mxConnectionConstraint(new mxPoint(1, 0.8), true)
	];

//**********************************************************************************************************************************************************
// Manual Switch 2
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeElectricalManualSwitch2(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxShapeElectricalManualSwitch2, mxShape);

mxShapeElectricalManualSwitch2.prototype.cst = {
		SHAPE_MANUAL_SWITCH_2 : 'mxgraph.electrical.electro-mechanical.manualSwitch2'
};

mxShapeElectricalManualSwitch2.prototype.customProperties = [
	{name: 'elSwitchState', dispName: 'Switch State', type: 'enum', defVal: 'on',
		enumList:[
			{val:'on', dispName:'On'},
			{val:'off', dispName:'Off'}
		]}
];

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeElectricalManualSwitch2.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	var switchState = mxUtils.getValue(this.style, 'elSwitchState', 'on');

	c.begin();
	c.moveTo(0.8 * w, h);
	c.lineTo(w, h);
	c.moveTo(0, h);
	c.lineTo(0.25 * w, h);
	
	if (switchState == 'off')
	{
		c.lineTo(0.76 * w, 0.1 * h);
		c.moveTo(0.49 * w, 0);
		c.lineTo(0.49 * w, 0.2 * h);
		c.moveTo(0.49 * w, 0.3 * h);
		c.lineTo(0.49 * w, 0.55 * h);
		c.moveTo(0.41 * w, 0);
		c.lineTo(0.57 * w, 0);
	}
	else
	{
		c.lineTo(0.8 * w, h);
		c.moveTo(0.49 * w, 0.45 * h);
		c.lineTo(0.49 * w, 0.65 * h);
		c.moveTo(0.49 * w, 0.75 * h);
		c.lineTo(0.49 * w, h);
		c.moveTo(0.41 * w, 0.45 * h);
		c.lineTo(0.57 * w, 0.45 * h);
	}
	
	c.stroke();
};

mxCellRenderer.registerShape(mxShapeElectricalManualSwitch2.prototype.cst.SHAPE_MANUAL_SWITCH_2, mxShapeElectricalManualSwitch2);

mxShapeElectricalManualSwitch2.prototype.constraints = [
	new mxConnectionConstraint(new mxPoint(0, 0.8), true),
	new mxConnectionConstraint(new mxPoint(1, 0.8), true)
	];

//**********************************************************************************************************************************************************
// Two Way Contact 2
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeElectricalTwoWayContact2(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxShapeElectricalTwoWayContact2, mxShape);

mxShapeElectricalTwoWayContact2.prototype.cst = {
		SHAPE_TWO_WAY_CONTACT_2 : 'mxgraph.electrical.electro-mechanical.twoWayContact2'
};

mxShapeElectricalTwoWayContact2.prototype.customProperties = [
	{name: 'elSwitchState', dispName: 'Switch State', type: 'enum', defVal: 'neutral',
		enumList:[
			{val:'1', dispName:'1'},
			{val:'neutral', dispName:'Neutral'},
			{val:'2', dispName:'2'}
		]}
];

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeElectricalTwoWayContact2.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	var switchState = mxUtils.getValue(this.style, 'elSwitchState', 'neutral');

	c.begin();
	c.moveTo(0, 0.5 * h);
	c.lineTo(0.21 * w, 0.5 * h);
	c.moveTo(0.67 * w, 0);
	c.lineTo(w, 0);
	c.moveTo(0.67 * w, h);
	c.lineTo(w, h);
	
	if (switchState == '1')
	{
		c.moveTo(0.28 * w, 0.46 * h);
		c.lineTo(0.67 * w, 0);
	}
	else if (switchState == '2')
	{
		c.moveTo(0.28 * w, 0.54 * h);
		c.lineTo(0.67 * w, h);
	}
	else
	{
		c.moveTo(0.28 * w, 0.5 * h);
		c.lineTo(0.67 * w, 0.5 * h);
	}
	
	c.stroke();
	c.ellipse(0.2 * w, 0.4 * h, 0.08 * w, 0.2 * h);
	c.fillAndStroke();
};

mxCellRenderer.registerShape(mxShapeElectricalTwoWayContact2.prototype.cst.SHAPE_TWO_WAY_CONTACT_2, mxShapeElectricalTwoWayContact2);

mxShapeElectricalTwoWayContact2.prototype.constraints = [
	new mxConnectionConstraint(new mxPoint(0, 0.5), true),
	new mxConnectionConstraint(new mxPoint(1, 0), true),
	new mxConnectionConstraint(new mxPoint(1, 1), true)
	];

//**********************************************************************************************************************************************************
// Passing Make-Contact 2
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeElectricalPassingMakeContact2(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxShapeElectricalPassingMakeContact2, mxShape);

mxShapeElectricalPassingMakeContact2.prototype.cst = {
		SHAPE_PASSING_MAKE_CONTACT_2 : 'mxgraph.electrical.electro-mechanical.passingMakeContact2'
};

mxShapeElectricalPassingMakeContact2.prototype.customProperties = [
	{name: 'elSwitchState', dispName: 'Switch State', type: 'enum', defVal: 'on',
		enumList:[
			{val:'on', dispName:'On'},
			{val:'off', dispName:'Off'}
		]}
];

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeElectricalPassingMakeContact2.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	var switchState = mxUtils.getValue(this.style, 'elSwitchState', 'neutral');

	c.begin();
	c.moveTo(w, 0.7 * h);
	c.lineTo(0.77 * w, 0.7 * h);
	c.lineTo(0.93 * w, h);
	c.moveTo(0, 0.7 * h);
	c.lineTo(0.25 * w, 0.7 * h);
	
	if (switchState == 'off')
	{
		c.lineTo(0.76 * w, 0);
	}
	else
	{
		c.lineTo(0.76 * w, 0.7 * h);
	}
	
	c.stroke();
};

mxCellRenderer.registerShape(mxShapeElectricalPassingMakeContact2.prototype.cst.SHAPE_PASSING_MAKE_CONTACT_2, mxShapeElectricalPassingMakeContact2);

mxShapeElectricalPassingMakeContact2.prototype.constraints = [
	new mxConnectionConstraint(new mxPoint(0, 0.7), true),
	new mxConnectionConstraint(new mxPoint(1, 0.7), true)
	];

//**********************************************************************************************************************************************************
// DPST 2
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeElectricalDPST2(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxShapeElectricalDPST2, mxShape);

mxShapeElectricalDPST2.prototype.cst = {
		SHAPE_DPST_2 : 'mxgraph.electrical.electro-mechanical.dpst2'
};

mxShapeElectricalDPST2.prototype.customProperties = [
	{name: 'elSwitchState', dispName: 'Switch State', type: 'enum', defVal: 'on',
		enumList:[
			{val:'on', dispName:'On'},
			{val:'off', dispName:'Off'}
		]}
];

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeElectricalDPST2.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	var switchState = mxUtils.getValue(this.style, 'elSwitchState', 'neutral');

	c.begin();
	c.moveTo(0, 0.4 * h);
	c.lineTo(0.2 * w, 0.4 * h);
	c.moveTo(0.8 * w, 0.4 * h);
	c.lineTo(w, 0.4 * h);
	c.moveTo(0, 0.92 * h);
	c.lineTo(0.2 * w, 0.92 * h);
	c.moveTo(0.8 * w, 0.92 * h);
	c.lineTo(w, 0.92 * h);
	
	if (switchState == 'off')
	{
		c.moveTo(0.28 * w, 0.38 * h);
		c.lineTo(0.76 * w, 0);
		c.moveTo(0.28 * w, 0.9 * h);
		c.lineTo(0.76 * w, 0.52 * h);
		c.moveTo(0.5 * w, 0.2 * h);
		c.lineTo(0.5 * w, 0.33 * h);
		c.moveTo(0.5 * w, 0.38 * h);
		c.lineTo(0.5 * w, 0.51 * h);
		c.moveTo(0.5 * w, 0.56 * h);
		c.lineTo(0.5 * w, 0.69 * h);
	}
	else
	{
		c.moveTo(0.28 * w, 0.4 * h);
		c.lineTo(0.72 * w, 0.4 * h);
		c.moveTo(0.28 * w, 0.92 * h);
		c.lineTo(0.72 * w, 0.92 * h);
		c.moveTo(0.5 * w, 0.4 * h);
		c.lineTo(0.5 * w, 0.53 * h);
		c.moveTo(0.5 * w, 0.58 * h);
		c.lineTo(0.5 * w, 0.71 * h);
		c.moveTo(0.5 * w, 0.76 * h);
		c.lineTo(0.5 * w, 0.89 * h);
	}
	
	c.stroke();
	c.ellipse(0.2 * w, 0.325 * h, 0.08 * w, 0.15 * h);
	c.fillAndStroke();
	c.ellipse(0.2 * w, 0.845 * h, 0.08 * w, 0.15 * h);
	c.fillAndStroke();
	c.ellipse(0.72 * w, 0.325 * h, 0.08 * w, 0.15 * h);
	c.fillAndStroke();
	c.ellipse(0.72 * w, 0.845 * h, 0.08 * w, 0.15 * h);
	c.fillAndStroke();
};

mxCellRenderer.registerShape(mxShapeElectricalDPST2.prototype.cst.SHAPE_DPST_2, mxShapeElectricalDPST2);

mxShapeElectricalDPST2.prototype.constraints = [
	new mxConnectionConstraint(new mxPoint(0, 0.4), true),
	new mxConnectionConstraint(new mxPoint(0, 0.92), true),
	new mxConnectionConstraint(new mxPoint(1, 0.4), true),
	new mxConnectionConstraint(new mxPoint(1, 0.92), true)
	];

//**********************************************************************************************************************************************************
// Spring Return Switch 3
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeElectricalSpringReturn3(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxShapeElectricalSpringReturn3, mxShape);

mxShapeElectricalSpringReturn3.prototype.cst = {
		SHAPE_SPRING_RETURN_3 : 'mxgraph.electrical.electro-mechanical.springReturn3'
};

mxShapeElectricalSpringReturn3.prototype.customProperties = [
	{name: 'elSwitchState', dispName: 'Switch State', type: 'enum', defVal: 'on',
		enumList:[
			{val:'on', dispName:'On'},
			{val:'off', dispName:'Off'}
		]}
];

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeElectricalSpringReturn3.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	var switchState = mxUtils.getValue(this.style, 'elSwitchState', 'neutral');

	c.begin();
	c.moveTo(0, 0.62 * h);
	c.lineTo(0.21 * w, 0.62 * h);
	c.stroke();

	if (switchState == 'off')
	{
		c.begin();
		c.moveTo(0.28 * w, 0.57 * h);
		c.lineTo(0.76 * w, 0);
		c.moveTo(w, 0.62 * h);
		c.lineTo(0.625 * w, 0.62 * h);
		c.lineTo(0.695 * w, 0.31 * h);
		c.lineTo(0.765 * w, 0.62 * h);
		c.fillAndStroke();
	}
	else
	{
		c.begin();
		c.moveTo(0.28 * w, 0.64 * h);
		c.lineTo(0.76 * w, h);
		c.moveTo(w, 0.62 * h);
		c.lineTo(0.625 * w, 0.62 * h);
		c.lineTo(0.695 * w, 0.93 * h);
		c.lineTo(0.765 * w, 0.62 * h);
		c.fillAndStroke();
	}
	
	c.ellipse(0.205 * w, 0.5 * h, 0.08 * w, 0.24 * h);
	c.fillAndStroke();
};

mxCellRenderer.registerShape(mxShapeElectricalSpringReturn3.prototype.cst.SHAPE_SPRING_RETURN_3, mxShapeElectricalSpringReturn3);

mxShapeElectricalSpringReturn3.prototype.constraints = [
	new mxConnectionConstraint(new mxPoint(0, 0.62), true),
	new mxConnectionConstraint(new mxPoint(1, 0.62), true)
	];

//**********************************************************************************************************************************************************
// Limit Switch
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeElectricalLimitSwitch(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxShapeElectricalLimitSwitch, mxShape);

mxShapeElectricalLimitSwitch.prototype.cst = {
		SHAPE_LIMIT_SWITCH : 'mxgraph.electrical.electro-mechanical.limitSwitch'
};

mxShapeElectricalLimitSwitch.prototype.customProperties = [
	{name: 'elSwitchState', dispName: 'Switch State', type: 'enum', defVal: 'on',
		enumList:[
			{val:'on', dispName:'On'},
			{val:'off', dispName:'Off'}
		]}
];

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeElectricalLimitSwitch.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	var switchState = mxUtils.getValue(this.style, 'elSwitchState', 'neutral');

	c.begin();
	c.moveTo(0, 0.16 * h);
	c.lineTo(0.2 * w, 0.16 * h);
	c.moveTo(0.8 * w, 0.16 * h);
	c.lineTo(w, 0.16 * h);
	c.stroke();

	if (switchState == 'off')
	{
		c.begin();
		c.moveTo(0.725 * w, 0.75 * h);
		c.lineTo(0.24 * w, 0.16 * h);
		c.lineTo(0.515 * w, h);
		c.lineTo(0.69 * w, 0.72 * h);
		c.fillAndStroke();
	}
	else
	{
		c.begin();
		c.moveTo(0.76 * w, 0);
		c.lineTo(0.24 * w, 0.16 * h);
		c.lineTo(0.615 * w, 0.52 * h);
		c.lineTo(0.72 * w, 0.02 * h);
		c.fillAndStroke();
	}
	
	c.ellipse(0.2 * w, 0.04 * h, 0.08 * w, 0.24 * h);
	c.fillAndStroke();
	c.ellipse(0.72 * w, 0.04 * h, 0.08 * w, 0.24 * h);
	c.fillAndStroke();
};

mxCellRenderer.registerShape(mxShapeElectricalLimitSwitch.prototype.cst.SHAPE_LIMIT_SWITCH, mxShapeElectricalLimitSwitch);

mxShapeElectricalLimitSwitch.prototype.constraints = [
	new mxConnectionConstraint(new mxPoint(0, 0.16), true),
	new mxConnectionConstraint(new mxPoint(1, 0.16), true)
	];

//**********************************************************************************************************************************************************
// DPDT 3
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeElectricalDPDT3(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxShapeElectricalDPDT3, mxShape);

mxShapeElectricalDPDT3.prototype.cst = {
		SHAPE_DPDT_3 : 'mxgraph.electrical.electro-mechanical.dpdt3'
};

mxShapeElectricalDPDT3.prototype.customProperties = [
	{name: 'elSwitchState', dispName: 'Switch State', type: 'enum', defVal: '1',
		enumList:[
			{val:'1', dispName:'1'},
			{val:'2', dispName:'2'}
		]}
];

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeElectricalDPDT3.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	var switchState = mxUtils.getValue(this.style, 'elSwitchState', 'neutral');

	c.begin();
	c.moveTo(0, 0.23 * h);
	c.lineTo(0.27 * w, 0.23 * h);
	c.moveTo(0, 0.79 * h);
	c.lineTo(0.27 * w, 0.79 * h);
	c.moveTo(0.74 * w, 0.05 * h);
	c.lineTo(w, 0.05 * h);
	c.moveTo(0.74 * w, 0.39 * h);
	c.lineTo(w, 0.39 * h);
	c.moveTo(0.74 * w, 0.61 * h);
	c.lineTo(w, 0.61 * h);
	c.moveTo(0.74 * w, 0.95 * h);
	c.lineTo(w, 0.95 * h);

	if (switchState == '1')
	{
		c.moveTo(0.37	 * w, 0.215 * h);
		c.lineTo(0.69 * w, 0.105 * h);
		c.moveTo(0.37	 * w, 0.775 * h);
		c.lineTo(0.69 * w, 0.665 * h);
		c.moveTo(0.515 * w, 0.17 * h);
		c.lineTo(0.515 * w, 0.245 * h);
		c.moveTo(0.515 * w, 0.28 * h);
		c.lineTo(0.515 * w, 0.355 * h);
		c.moveTo(0.515 * w, 0.39 * h);
		c.lineTo(0.515 * w, 0.465 * h);
		c.moveTo(0.515 * w, 0.5 * h);
		c.lineTo(0.515 * w, 0.575 * h);
		c.moveTo(0.515 * w, 0.61 * h);
		c.lineTo(0.515 * w, 0.685 * h);
	}
	else
	{
		c.moveTo(0.37	 * w, 0.245 * h);
		c.lineTo(0.69 * w, 0.335 * h);
		c.moveTo(0.37	 * w, 0.805 * h);
		c.lineTo(0.69 * w, 0.895 * h);
		c.moveTo(0.515 * w, 0.29 * h);
		c.lineTo(0.515 * w, 0.365 * h);
		c.moveTo(0.515 * w, 0.4 * h);
		c.lineTo(0.515 * w, 0.475 * h);
		c.moveTo(0.515 * w, 0.51 * h);
		c.lineTo(0.515 * w, 0.585 * h);
		c.moveTo(0.515 * w, 0.62 * h);
		c.lineTo(0.515 * w, 0.695 * h);
		c.moveTo(0.515 * w, 0.73 * h);
		c.lineTo(0.515 * w, 0.805 * h);
	}
	
	c.stroke();
	c.ellipse(0.265 * w, 0.18 * h, 0.105 * w, 0.095 * h);
	c.fillAndStroke();
	c.ellipse(0.265 * w, 0.745 * h, 0.105 * w, 0.095 * h);
	c.fillAndStroke();
	c.ellipse(0.635 * w, 0, 0.105 * w, 0.095 * h);
	c.fillAndStroke();
	c.ellipse(0.635 * w, 0.345 * h, 0.105 * w, 0.095 * h);
	c.fillAndStroke();
	c.ellipse(0.635 * w, 0.56 * h, 0.105 * w, 0.095 * h);
	c.fillAndStroke();
	c.ellipse(0.635 * w, 0.905 * h, 0.105 * w, 0.095 * h);
	c.fillAndStroke();
};

mxCellRenderer.registerShape(mxShapeElectricalDPDT3.prototype.cst.SHAPE_DPDT_3, mxShapeElectricalDPDT3);

mxShapeElectricalDPDT3.prototype.constraints = [
	new mxConnectionConstraint(new mxPoint(0, 0.23), true),
	new mxConnectionConstraint(new mxPoint(0, 0.79), true),
	new mxConnectionConstraint(new mxPoint(1, 0.05), true),
	new mxConnectionConstraint(new mxPoint(1, 0.39), true),
	new mxConnectionConstraint(new mxPoint(1, 0.61), true),
	new mxConnectionConstraint(new mxPoint(1, 0.95), true)
	];

//**********************************************************************************************************************************************************
// Two Position Switch 2
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeElectricalTwoPositionSwitch2(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxShapeElectricalTwoPositionSwitch2, mxShape);

mxShapeElectricalTwoPositionSwitch2.prototype.cst = {
		SHAPE_TWO_POSITION_SWITCH_2 : 'mxgraph.electrical.electro-mechanical.twoPositionSwitch2'
};

mxShapeElectricalTwoPositionSwitch2.prototype.customProperties = [
	{name: 'elSwitchState', dispName: 'Switch State', type: 'enum', defVal: '1',
		enumList:[
			{val:'1', dispName:'1'},
			{val:'2', dispName:'2'}
		]}
];

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeElectricalTwoPositionSwitch2.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	var switchState = mxUtils.getValue(this.style, 'elSwitchState', '1');

	c.begin();
	c.moveTo(0, 0.5 * h);
	c.lineTo(0.2 * w, 0.5 * h);
	c.moveTo(0.8 * w, 0.5 * h);
	c.lineTo(w, 0.5 * h);
	c.moveTo(0.5 * w, 0);
	c.lineTo(0.5 * w, 0.18 * h);
	c.moveTo(0.5 * w, 0.82 * h);
	c.lineTo(0.5 * w, h);
	c.moveTo(0.63 * w, 0.145 * h);
	c.arcTo(0.2 * w, 0.22 * h, 0, 0, 1, 0.835 * w, 0.36 * h);
	
	if (switchState == '1')
	{
		c.moveTo(0.24 * w, 0.5 * h);
		c.arcTo(0.27 * w, 0.27 * h, 0, 0, 1, 0.5 * w, 0.78 * h);
		c.moveTo(0.76 * w, 0.5 * h);
		c.arcTo(0.27 * w, 0.27 * h, 0, 0, 1, 0.5 * w, 0.22 * h);
		c.moveTo(0.39 * w, 0.56 * h);
		c.lineTo(0.55 * w, 0.39 * h);
		c.moveTo(0.39 * w, 0.56 * h);
		c.lineTo(0.55 * w, 0.39 * h);
		c.moveTo(0.61 * w, 0.44 * h);
		c.lineTo(0.45 * w, 0.61 * h);
		c.moveTo(0.61 * w, 0.44 * h);
		c.lineTo(0.45 * w, 0.61 * h);
	}
	else
	{
		c.moveTo(0.76 * w, 0.5 * h);
		c.arcTo(0.27 * w, 0.27 * h, 0, 0, 0, 0.5 * w, 0.78 * h);
		c.moveTo(0.24 * w, 0.5 * h);
		c.arcTo(0.27 * w, 0.27 * h, 0, 0, 0, 0.5 * w, 0.22 * h);
		c.moveTo(0.61 * w, 0.56 * h);
		c.lineTo(0.45 * w, 0.39 * h);
		c.moveTo(0.61 * w, 0.56 * h);
		c.lineTo(0.45 * w, 0.39 * h);
		c.moveTo(0.39 * w, 0.44 * h);
		c.lineTo(0.55 * w, 0.61 * h);
		c.moveTo(0.39 * w, 0.44 * h);
		c.lineTo(0.55 * w, 0.61 * h);
	}
	
	c.stroke();
	c.ellipse(0.2 * w, 0.4575 * h, 0.08 * w, 0.085 * h);
	c.fillAndStroke();
	c.ellipse(0.72 * w, 0.4575 * h, 0.08 * w, 0.085 * h);
	c.fillAndStroke();
	c.ellipse(0.46 * w, 0.18 * h, 0.08 * w, 0.085 * h);
	c.fillAndStroke();
	c.ellipse(0.46 * w, 0.735 * h, 0.08 * w, 0.085 * h);
	c.fillAndStroke();
	var strokeColor = mxUtils.getValue(this.style, mxConstants.STYLE_STROKECOLOR, '#000000');
	c.setFillColor(strokeColor);
	c.begin();
	c.moveTo(0.633 * w, 0.1 * h);
	c.lineTo(0.633 * w, 0.185 * h);
	c.lineTo(0.56 * w, 0.1425 * h);
	c.close();
	c.moveTo(0.795 * w, 0.355 * h);
	c.lineTo(0.875 * w, 0.355 * h);
	c.lineTo(0.835 * w, 0.435 * h);
	c.close();
	c.fillAndStroke();
};

mxCellRenderer.registerShape(mxShapeElectricalTwoPositionSwitch2.prototype.cst.SHAPE_TWO_POSITION_SWITCH_2, mxShapeElectricalTwoPositionSwitch2);

mxShapeElectricalTwoPositionSwitch2.prototype.constraints = [
	new mxConnectionConstraint(new mxPoint(0, 0.5), true),
	new mxConnectionConstraint(new mxPoint(1, 0.5), true),
	new mxConnectionConstraint(new mxPoint(0.5, 0), true),
	new mxConnectionConstraint(new mxPoint(0.5, 1), true)
	];

//**********************************************************************************************************************************************************
// Three Position Switch 2
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeElectricalThreePositionSwitch2(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxShapeElectricalThreePositionSwitch2, mxShape);

mxShapeElectricalThreePositionSwitch2.prototype.cst = {
		SHAPE_THREE_POSITION_SWITCH_2 : 'mxgraph.electrical.electro-mechanical.threePositionSwitch2'
};

mxShapeElectricalThreePositionSwitch2.prototype.customProperties = [
	{name: 'elSwitchState', dispName: 'Switch State', type: 'enum', defVal: '1',
		enumList:[
			{val:'1', dispName:'1'},
			{val:'2', dispName:'2'},
			{val:'3', dispName:'3'}
		]}
];

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeElectricalThreePositionSwitch2.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	var switchState = mxUtils.getValue(this.style, 'elSwitchState', '1');

	c.begin();
	c.moveTo(0.5 * w, 0);
	c.lineTo(0.5 * w, 0.2 * h);
	c.moveTo(0, h);
	c.lineTo(0.215 * w, 0.825 * h);
	c.moveTo(w, h);
	c.lineTo(0.785 * w, 0.825 * h);
	c.moveTo(0.12 * w, 0.62 * h);
	c.arcTo(0.38 * w, 0.38 * h, 0, 0, 1, 0.31 * w, 0.26 * h);
	
	if (switchState == '1')
	{
		c.moveTo(0.5 * w, 0.26 * h);
		c.arcTo(0.65 * w, 0.65 * h, 0, 0, 1, 0.25 * w, 0.79 * h);
	}
	else if (switchState == '2')
	{
		c.moveTo(0.5 * w, 0.26 * h);
		c.arcTo(0.65 * w, 0.65 * h, 0, 0, 0, 0.75 * w, 0.79 * h);
	}
	else
	{
		c.moveTo(0.25 * w, 0.79 * h);
		c.arcTo(0.5 * w, 0.5 * h, 0, 0, 1, 0.75 * w, 0.79 * h);
	}
	
	c.stroke();
	c.ellipse(0.2 * w, 0.74 * h, 0.1 * w, 0.1 * h);
	c.fillAndStroke();
	c.ellipse(0.45 * w, 0.21 * h, 0.1 * w, 0.1 * h);
	c.fillAndStroke();
	c.ellipse(0.7 * w, 0.74 * h, 0.1 * w, 0.1 * h);
	c.fillAndStroke();
	var strokeColor = mxUtils.getValue(this.style, mxConstants.STYLE_STROKECOLOR, '#000000');
	c.setFillColor(strokeColor);
	c.begin();
	c.moveTo(0.285 * w, 0.215 * h);
	c.lineTo(0.39 * w, 0.2 * h);
	c.lineTo(0.345 * w, 0.295 * h);
	c.close();
	c.moveTo(0.07 * w, 0.63 * h);
	c.lineTo(0.18 * w, 0.61 * h);
	c.lineTo(0.14 * w, 0.71 * h);
	c.close();
	c.fillAndStroke();
};

mxCellRenderer.registerShape(mxShapeElectricalThreePositionSwitch2.prototype.cst.SHAPE_THREE_POSITION_SWITCH_2, mxShapeElectricalThreePositionSwitch2);

mxShapeElectricalThreePositionSwitch2.prototype.constraints = [
	new mxConnectionConstraint(new mxPoint(0.5, 0), true),
	new mxConnectionConstraint(new mxPoint(0, 1), true),
	new mxConnectionConstraint(new mxPoint(1, 1), true)
	];

//**********************************************************************************************************************************************************
// Four Position Switch 2
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeElectricalFourPositionSwitch2(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxShapeElectricalFourPositionSwitch2, mxShape);

mxShapeElectricalFourPositionSwitch2.prototype.cst = {
		SHAPE_FOUR_POSITION_SWITCH_2 : 'mxgraph.electrical.electro-mechanical.fourPositionSwitch2'
};

mxShapeElectricalFourPositionSwitch2.prototype.customProperties = [
	{name: 'elSwitchState', dispName: 'Switch State', type: 'enum', defVal: '1',
		enumList:[
			{val:'1', dispName:'1'},
			{val:'2', dispName:'2'},
			{val:'3', dispName:'3'},
			{val:'4', dispName:'4'}
		]}
];

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeElectricalFourPositionSwitch2.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	var switchState = mxUtils.getValue(this.style, 'elSwitchState', '1');

	c.begin();
	c.moveTo(0, 0.5 * h);
	c.lineTo(0.2 * w, 0.5 * h);
	c.moveTo(0.8 * w, 0.5 * h);
	c.lineTo(w, 0.5 * h);
	c.moveTo(0.5 * w, 0);
	c.lineTo(0.5 * w, 0.18 * h);
	c.moveTo(0.5 * w, 0.82 * h);
	c.lineTo(0.5 * w, h);
	c.moveTo(0.37 * w, 0.145 * h);
	c.arcTo(0.2 * w, 0.22 * h, 0, 0, 0, 0.165 * w, 0.36 * h);
	
	if (switchState == '1')
	{
		c.moveTo(0.32 * w, 0.7 * h);
		c.arcTo(0.25 * w, 0.25 * h, 0, 0, 1, 0.68 * w, 0.7 * h);
		c.moveTo(0.32 * w, 0.3 * h);
		c.arcTo(0.25 * w, 0.25 * h, 0, 0, 0, 0.68 * w, 0.3 * h);
		c.moveTo(0.46 * w, 0.37 * h);
		c.lineTo(0.46 * w, 0.63 * h);
		c.moveTo(0.54 * w, 0.37 * h);
		c.lineTo(0.54 * w, 0.63 * h);
		c.moveTo(0.28 * w, 0.5 * h);
		c.lineTo(0.72 * w, 0.5 * h);
	}
	else if (switchState == '2')
	{
		c.moveTo(0.24 * w, 0.5 * h);
		c.arcTo(0.27 * w, 0.27 * h, 0, 0, 1, 0.5 * w, 0.78 * h);
		c.moveTo(0.76 * w, 0.5 * h);
		c.arcTo(0.27 * w, 0.27 * h, 0, 0, 1, 0.5 * w, 0.22 * h);
		c.moveTo(0.39 * w, 0.56 * h);
		c.lineTo(0.55 * w, 0.39 * h);
		c.moveTo(0.39 * w, 0.56 * h);
		c.lineTo(0.55 * w, 0.39 * h);
		c.moveTo(0.61 * w, 0.44 * h);
		c.lineTo(0.45 * w, 0.61 * h);
		c.moveTo(0.61 * w, 0.44 * h);
		c.lineTo(0.45 * w, 0.61 * h);
		c.moveTo(0.32 * w, 0.32 * h);
		c.lineTo(0.68 * w, 0.68 * h);
	}
	else if (switchState == '3')
	{
		c.moveTo(0.7 * w, 0.32 * h);
		c.arcTo(0.25 * w, 0.25 * h, 0, 0, 0, 0.7 * w, 0.68 * h);
		c.moveTo(0.3 * w, 0.32 * h);
		c.arcTo(0.25 * w, 0.25 * h, 0, 0, 1, 0.3 * w, 0.68 * h);
		c.moveTo(0.37 * w, 0.46 * h);
		c.lineTo(0.63 * w, 0.46 * h);
		c.moveTo(0.37 * w, 0.54 * h);
		c.lineTo(0.63 * w, 0.54 * h);
		c.moveTo(0.5 * w, 0.26 * h);
		c.lineTo(0.5 * w, 0.74 * h);
	}
	else
	{
		c.moveTo(0.76 * w, 0.5 * h);
		c.arcTo(0.27 * w, 0.27 * h, 0, 0, 0, 0.5 * w, 0.78 * h);
		c.moveTo(0.24 * w, 0.5 * h);
		c.arcTo(0.27 * w, 0.27 * h, 0, 0, 0, 0.5 * w, 0.22 * h);
		c.moveTo(0.61 * w, 0.56 * h);
		c.lineTo(0.45 * w, 0.39 * h);
		c.moveTo(0.61 * w, 0.56 * h);
		c.lineTo(0.45 * w, 0.39 * h);
		c.moveTo(0.39 * w, 0.44 * h);
		c.lineTo(0.55 * w, 0.61 * h);
		c.moveTo(0.39 * w, 0.44 * h);
		c.lineTo(0.55 * w, 0.61 * h);
		c.moveTo(0.68 * w, 0.32 * h);
		c.lineTo(0.32 * w, 0.68 * h);
	}
	
	c.stroke();
	c.ellipse(0.2 * w, 0.4575 * h, 0.08 * w, 0.085 * h);
	c.fillAndStroke();
	c.ellipse(0.72 * w, 0.4575 * h, 0.08 * w, 0.085 * h);
	c.fillAndStroke();
	c.ellipse(0.46 * w, 0.18 * h, 0.08 * w, 0.085 * h);
	c.fillAndStroke();
	c.ellipse(0.46 * w, 0.735 * h, 0.08 * w, 0.085 * h);
	c.fillAndStroke();
	var strokeColor = mxUtils.getValue(this.style, mxConstants.STYLE_STROKECOLOR, '#000000');
	c.setFillColor(strokeColor);
	c.begin();
	c.moveTo(0.367 * w, 0.1 * h);
	c.lineTo(0.367 * w, 0.185 * h);
	c.lineTo(0.44 * w, 0.1425 * h);
	c.close();
	c.moveTo(0.205 * w, 0.355 * h);
	c.lineTo(0.125 * w, 0.355 * h);
	c.lineTo(0.165 * w, 0.435 * h);
	c.close();
	c.fillAndStroke();
};

mxCellRenderer.registerShape(mxShapeElectricalFourPositionSwitch2.prototype.cst.SHAPE_FOUR_POSITION_SWITCH_2, mxShapeElectricalFourPositionSwitch2);

mxShapeElectricalFourPositionSwitch2.prototype.constraints = [
	new mxConnectionConstraint(new mxPoint(0, 0.5), true),
	new mxConnectionConstraint(new mxPoint(1, 0.5), true),
	new mxConnectionConstraint(new mxPoint(0.5, 0), true),
	new mxConnectionConstraint(new mxPoint(0.5, 1), true)
	];

//**********************************************************************************************************************************************************
// Pushubutton Make Switch 2
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeElectricalPushbuttonMakeSwitch2(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxShapeElectricalPushbuttonMakeSwitch2, mxShape);

mxShapeElectricalPushbuttonMakeSwitch2.prototype.cst = {
		SHAPE_PUSHBUTTON_MAKE_SWITCH_2 : 'mxgraph.electrical.electro-mechanical.pushbuttonMakeSwitch2'
};

mxShapeElectricalPushbuttonMakeSwitch2.prototype.customProperties = [
	{name: 'elSwitchState', dispName: 'Switch State', type: 'enum', defVal: '1',
		enumList:[
			{val:'1', dispName:'1'},
			{val:'2', dispName:'2'}
		]}
];

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeElectricalPushbuttonMakeSwitch2.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	var switchState = mxUtils.getValue(this.style, 'elSwitchState', '1');

	c.begin();
	c.moveTo(0, 0.94 * h);
	c.lineTo(0.2 * w, 0.94 * h);
	c.moveTo(0.8 * w, 0.94 * h);
	c.lineTo(w, 0.94 * h);
	
	if (switchState == '1')
	{
		c.moveTo(0.5 * w, 0);
		c.lineTo(0.5 * w, 0.8 * h);
		c.moveTo(0.24 * w, 0.8 * h);
		c.lineTo(0.76 * w, 0.8 * h);
	}
	else
	{
		c.moveTo(0.5 * w, 0.07 * h);
		c.lineTo(0.5 * w, 0.87 * h);
		c.moveTo(0.24 * w, 0.87 * h);
		c.lineTo(0.76 * w, 0.87 * h);
	}
	
	c.stroke();
	c.ellipse(0.2 * w, 0.88 * h, 0.08 * w, 0.12 * h);
	c.fillAndStroke();
	c.ellipse(0.72 * w, 0.88 * h, 0.08 * w, 0.12 * h);
	c.fillAndStroke();
};

mxCellRenderer.registerShape(mxShapeElectricalPushbuttonMakeSwitch2.prototype.cst.SHAPE_PUSHBUTTON_MAKE_SWITCH_2, mxShapeElectricalPushbuttonMakeSwitch2);

mxShapeElectricalPushbuttonMakeSwitch2.prototype.constraints = [
	new mxConnectionConstraint(new mxPoint(0, 0.94), true),
	new mxConnectionConstraint(new mxPoint(1, 0.94), true)
	];

//**********************************************************************************************************************************************************
// Pushubutton Two-Circuit Switch 2
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeElectricalPushbuttonTwoCircuitSwitch2(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxShapeElectricalPushbuttonTwoCircuitSwitch2, mxShape);

mxShapeElectricalPushbuttonTwoCircuitSwitch2.prototype.cst = {
		SHAPE_PUSHBUTTON_TWO_CIRCUIT_SWITCH_2 : 'mxgraph.electrical.electro-mechanical.pushbuttonTwoCircuitSwitch2'
};

mxShapeElectricalPushbuttonTwoCircuitSwitch2.prototype.customProperties = [
	{name: 'elSwitchState', dispName: 'Switch State', type: 'enum', defVal: '1',
		enumList:[
			{val:'1', dispName:'1'},
			{val:'2', dispName:'2'}
		]}
];

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeElectricalPushbuttonTwoCircuitSwitch2.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	var switchState = mxUtils.getValue(this.style, 'elSwitchState', '1');

	c.begin();
	c.moveTo(0, 0.68 * h);
	c.lineTo(0.2 * w, 0.68 * h);
	c.moveTo(0.8 * w, 0.68 * h);
	c.lineTo(w, 0.68 * h);
	c.moveTo(0, 0.96 * h);
	c.lineTo(0.2 * w, 0.96 * h);
	c.moveTo(0.8 * w, 0.96 * h);
	c.lineTo(w, 0.96 * h);
	
	if (switchState == '1')
	{
		c.moveTo(0.5 * w, 0);
		c.lineTo(0.5 * w, 0.73 * h);
		c.moveTo(0.24 * w, 0.73 * h);
		c.lineTo(0.76 * w, 0.73 * h);
	}
	else
	{
		c.moveTo(0.5 * w, 0.18 * h);
		c.lineTo(0.5 * w, 0.91 * h);
		c.moveTo(0.24 * w, 0.91 * h);
		c.lineTo(0.76 * w, 0.91 * h);
	}
	
	c.stroke();
	c.ellipse(0.2 * w, 0.92 * h, 0.08 * w, 0.08 * h);
	c.fillAndStroke();
	c.ellipse(0.72 * w, 0.92 * h, 0.08 * w, 0.08 * h);
	c.fillAndStroke();
	c.ellipse(0.2 * w, 0.64 * h, 0.08 * w, 0.08 * h);
	c.fillAndStroke();
	c.ellipse(0.72 * w, 0.64 * h, 0.08 * w, 0.08 * h);
	c.fillAndStroke();
};

mxCellRenderer.registerShape(mxShapeElectricalPushbuttonTwoCircuitSwitch2.prototype.cst.SHAPE_PUSHBUTTON_TWO_CIRCUIT_SWITCH_2, mxShapeElectricalPushbuttonTwoCircuitSwitch2);

mxShapeElectricalPushbuttonTwoCircuitSwitch2.prototype.constraints = [
	new mxConnectionConstraint(new mxPoint(0, 0.68), true),
	new mxConnectionConstraint(new mxPoint(1, 0.68), true),
	new mxConnectionConstraint(new mxPoint(0, 0.96), true),
	new mxConnectionConstraint(new mxPoint(1, 0.96), true)
	];

//**********************************************************************************************************************************************************
// Time Delay Switch
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeElectricalTimeDelaySwitch(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxShapeElectricalTimeDelaySwitch, mxShape);

mxShapeElectricalTimeDelaySwitch.prototype.cst = {
		SHAPE_TIME_DELAY_SWITCH : 'mxgraph.electrical.electro-mechanical.timeDelaySwitch'
};

mxShapeElectricalTimeDelaySwitch.prototype.customProperties = [
	{name: 'elSwitchState', dispName: 'Switch State', type: 'enum', defVal: 'on',
		enumList:[
			{val:'on', dispName:'On'},
			{val:'off', dispName:'Off'}
		]}
];

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeElectricalTimeDelaySwitch.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	var switchState = mxUtils.getValue(this.style, 'elSwitchState', 'off');

	c.begin();
	c.moveTo(0, 0.13 * h);
	c.lineTo(0.2 * w, 0.13 * h);
	c.moveTo(0.8 * w, 0.13 * h);
	c.lineTo(w, 0.13 * h);
	
	if (switchState == 'off')
	{
		c.moveTo(0.5 * w, 0.37 * h);
		c.lineTo(0.5 * w, 0.83 * h);
		c.moveTo(0.28 * w, 0.16 * h);
		c.lineTo(0.76 * w, 0.62 * h);
		c.moveTo(0.44 * w, h);
		c.lineTo(0.5 * w, 0.83 * h);
		c.lineTo(0.56 * w, h);
	}
	else
	{
		c.moveTo(0.5 * w, 0.04 * h);
		c.lineTo(0.5 * w, 0.5 * h);
		c.moveTo(0.28 * w, 0.09 * h);
		c.lineTo(0.76 * w, 0);
		c.moveTo(0.44 * w, 0.67 * h);
		c.lineTo(0.5 * w, 0.5 * h);
		c.lineTo(0.56 * w, 0.67 * h);
	}
	
	c.stroke();
	c.ellipse(0.2 * w, 0.03 * h, 0.08 * w, 0.19 * h);
	c.fillAndStroke();
	c.ellipse(0.72 * w, 0.03 * h, 0.08 * w, 0.19 * h);
	c.fillAndStroke();
};

mxCellRenderer.registerShape(mxShapeElectricalTimeDelaySwitch.prototype.cst.SHAPE_TIME_DELAY_SWITCH, mxShapeElectricalTimeDelaySwitch);

mxShapeElectricalTimeDelaySwitch.prototype.constraints = [
	new mxConnectionConstraint(new mxPoint(0, 0.13), true),
	new mxConnectionConstraint(new mxPoint(1, 0.13), true)
	];

//**********************************************************************************************************************************************************
// Time Delay Switch 2
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeElectricalTimeDelaySwitch2(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxShapeElectricalTimeDelaySwitch2, mxShape);

mxShapeElectricalTimeDelaySwitch2.prototype.cst = {
		SHAPE_TIME_DELAY_SWITCH2 : 'mxgraph.electrical.electro-mechanical.timeDelaySwitch2'
};

mxShapeElectricalTimeDelaySwitch2.prototype.customProperties = [
	{name: 'elSwitchState', dispName: 'Switch State', type: 'enum', defVal: 'on',
		enumList:[
			{val:'on', dispName:'On'},
			{val:'off', dispName:'Off'}
		]}
];

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeElectricalTimeDelaySwitch2.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	var switchState = mxUtils.getValue(this.style, 'elSwitchState', 'off');

	c.begin();
	c.moveTo(0, 0.45 * h);
	c.lineTo(0.23 * w, 0.45 * h);
	
	if (switchState == 'off')
	{
		c.lineTo(0.75 * w, 0);
		c.moveTo(w, 0.45 * h);
		c.lineTo(0.8 * w, 0.45 * h);
		c.moveTo(0.465 * w, 0.25 * h);
		c.lineTo(0.465 * w, 0.76 * h);
		c.moveTo(0.535 * w, 0.19 * h);
		c.lineTo(0.535 * w, 0.76 * h);
		c.moveTo(0.4 * w, 0.89 * h);
		c.arcTo(0.11 * w, 0.25 * h, 0, 0, 1, 0.6 * w, 0.89 * h);
	}
	else
	{
		c.lineTo(0.73 * w, 0.25 * h);
		c.moveTo(w, 0.45 * h);
		c.lineTo(0.67 * w, 0.45 * h);
		c.lineTo(0.67 * w, 0.16 * h);
		c.moveTo(0.465 * w, 0.36 * h);
		c.lineTo(0.465 * w, 0.87 * h);
		c.moveTo(0.535 * w, 0.33 * h);
		c.lineTo(0.535 * w, 0.87 * h);
		c.moveTo(0.4 * w, h);
		c.arcTo(0.11 * w, 0.25 * h, 0, 0, 1, 0.6 * w, h);
	}
	
	c.stroke();
};

mxCellRenderer.registerShape(mxShapeElectricalTimeDelaySwitch2.prototype.cst.SHAPE_TIME_DELAY_SWITCH2, mxShapeElectricalTimeDelaySwitch2);

mxShapeElectricalTimeDelaySwitch2.prototype.constraints = [
	new mxConnectionConstraint(new mxPoint(0, 0.45), true),
	new mxConnectionConstraint(new mxPoint(1, 0.45), true)
	];

//**********************************************************************************************************************************************************
// Isolator Switch 2
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeElectricalIsolatorSwitch2(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxShapeElectricalIsolatorSwitch2, mxShape);

mxShapeElectricalIsolatorSwitch2.prototype.cst = {
		SHAPE_ISOLATOR_SWITCH2 : 'mxgraph.electrical.electro-mechanical.isolatorSwitch2'
};

mxShapeElectricalIsolatorSwitch2.prototype.customProperties = [
	{name: 'elSwitchState', dispName: 'Switch State', type: 'enum', defVal: 'on',
		enumList:[
			{val:'on', dispName:'On'},
			{val:'off', dispName:'Off'}
		]}
];

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeElectricalIsolatorSwitch2.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	var switchState = mxUtils.getValue(this.style, 'elSwitchState', 'off');

	c.begin();
	c.moveTo(w, 0.8 * h);
	c.lineTo(0.8 * w, 0.8 * h);
	c.moveTo(0.8 * w, 0.6 * h);
	c.lineTo(0.8 * w, h);
	c.moveTo(0, 0.8 * h);
	c.lineTo(0.23 * w, 0.8 * h);
	
	if (switchState == 'off')
	{
		c.lineTo(0.75 * w, 0);
	}
	else
	{
		c.lineTo(0.8 * w, 0.8 * h);
	}
	
	c.stroke();
};

mxCellRenderer.registerShape(mxShapeElectricalIsolatorSwitch2.prototype.cst.SHAPE_ISOLATOR_SWITCH2, mxShapeElectricalIsolatorSwitch2);

mxShapeElectricalIsolatorSwitch2.prototype.constraints = [
	new mxConnectionConstraint(new mxPoint(0, 0.8), true),
	new mxConnectionConstraint(new mxPoint(1, 0.8), true)
	];

//**********************************************************************************************************************************************************
// Isolator Switch 2
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeElectricalChangeoverContactSwitch2(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxShapeElectricalChangeoverContactSwitch2, mxShape);

mxShapeElectricalChangeoverContactSwitch2.prototype.cst = {
		SHAPE_CHANGEOVER_CONTACT_SWITCH2 : 'mxgraph.electrical.electro-mechanical.changeoverContactSwitch2'
};

mxShapeElectricalChangeoverContactSwitch2.prototype.customProperties = [
	{name: 'elSwitchState', dispName: 'Switch State', type: 'enum', defVal: '1',
		enumList:[
			{val:'1', dispName:'1'},
			{val:'2', dispName:'2'}
		]}
];

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeElectricalChangeoverContactSwitch2.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	var switchState = mxUtils.getValue(this.style, 'elSwitchState', '1');

	c.begin();
	c.moveTo(0, h);
	c.lineTo(0.25 * w, h);
	
	if (switchState == '1')
	{
		c.lineTo(0.76 * w, 0.2 * h);
		c.moveTo(w, 0);
		c.lineTo(0.67 * w, 0);
		c.lineTo(0.67 * w, 0.5 * h);
		c.moveTo(w, h);
		c.lineTo(0.8 * w, h);
	}
	else
	{
		c.lineTo(0.77 * w, 0.6 * h);
		c.moveTo(w, h);
		c.lineTo(0.67 * w, h);
		c.lineTo(0.67 * w, 0.5 * h);
		c.moveTo(w, 0);
		c.lineTo(0.8 * w, 0);
	}
	
	c.stroke();
};

mxCellRenderer.registerShape(mxShapeElectricalChangeoverContactSwitch2.prototype.cst.SHAPE_CHANGEOVER_CONTACT_SWITCH2, mxShapeElectricalChangeoverContactSwitch2);

mxShapeElectricalChangeoverContactSwitch2.prototype.constraints = [
	new mxConnectionConstraint(new mxPoint(0, 0.8), true),
	new mxConnectionConstraint(new mxPoint(0, 0.8), true),
	new mxConnectionConstraint(new mxPoint(1, 0.8), true)
	];

//**********************************************************************************************************************************************************
// Reed Switch 2
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeElectricalReedSwitch2(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxShapeElectricalReedSwitch2, mxShape);

mxShapeElectricalReedSwitch2.prototype.cst = {
		SHAPE_REED_SWITCH2 : 'mxgraph.electrical.electro-mechanical.reedSwitch2'
};

mxShapeElectricalReedSwitch2.prototype.customProperties = [
	{name: 'elSwitchState', dispName: 'Switch State', type: 'enum', defVal: 'on',
		enumList:[
			{val:'on', dispName:'On'},
			{val:'off', dispName:'Off'}
		]}
];

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeElectricalReedSwitch2.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	var switchState = mxUtils.getValue(this.style, 'elSwitchState', 'off');

	c.begin();
	c.moveTo(0.69 * w, 0);
	c.arcTo(0.13 * w, 0.5 * h, 0, 0, 1, 0.82 * w, 0.5 * h);
	c.arcTo(0.13 * w, 0.5 * h, 0, 0, 1, 0.69 * w, h);
	c.lineTo(0.31 * w, h);
	c.arcTo(0.13 * w, 0.5 * h, 0, 0, 1, 0.18 * w, 0.5 * h);
	c.arcTo(0.13 * w, 0.5 * h, 0, 0, 1, 0.31 * w, 0);
	c.close();
	c.fillAndStroke();

	c.begin();
	c.moveTo(w, 0.5 * h);
	c.lineTo(0.65 * w, 0.5 * h);
	c.moveTo(0, 0.5 * h);
	c.lineTo(0.35 * w, 0.5 * h);
	
	if (switchState == 'on')
	{
		c.lineTo(0.65 * w, 0.5 * h);
	}
	else
	{
		c.lineTo(0.65 * w, 0.25 * h);
	}
	
	c.stroke();
};

mxCellRenderer.registerShape(mxShapeElectricalReedSwitch2.prototype.cst.SHAPE_REED_SWITCH2, mxShapeElectricalReedSwitch2);

mxShapeElectricalReedSwitch2.prototype.constraints = [
	new mxConnectionConstraint(new mxPoint(0, 0.5), true),
	new mxConnectionConstraint(new mxPoint(1, 0.5), true)
	];

