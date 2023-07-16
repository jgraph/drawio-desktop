/**
 * $Id: mxBpmnShape2.js,v 1.6 2013/12/20 09:54:28 mate Exp $
 * Copyright (c) 2006-2010, JGraph Ltd
 */
/**
 * Class: mxBpmnShape (DEPRECATED)
 *
 * Extends <mxShape> to implement an cylinder shape. If a
 * custom shape with one filled area and an overlay path is
 * needed, then this shape's <redrawPath> should be overridden.
 * This shape is registered under <mxConstants.SHAPE_CYLINDER>
 * in <mxCellRenderer>.
 * 
 * Constructor: mxBpmnShape
 *
 * Constructs a new cylinder shape.
 * 
 * Parameters:
 * 
 * bounds - <mxRectangle> that defines the bounds. This is stored in
 * <mxShape.bounds>.
 * fill - String that defines the fill color. This is stored in <fill>.
 * stroke - String that defines the stroke color. This is stored in <stroke>.
 * strokewidth - Optional integer that defines the stroke width. Default is
 * 1. This is stored in <strokewidth>.
 */
function mxBpmnShape(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxBpmnShape, mxShape);

mxBpmnShape.prototype.customProperties = [
	{name: 'symbol', dispName: 'Event', type: 'enum', defVal:'general', 
		enumList: [{val: 'general', dispName: 'General'}, 
				   {val: 'message', dispName: 'Message'}, 
				   {val: 'timer', dispName: 'Timer'}, 
				   {val: 'escalation', dispName: 'Escalation'}, 
				   {val: 'conditional', dispName: 'Conditional'}, 
				   {val: 'link', dispName: 'Link'}, 
				   {val: 'error', dispName: 'Error'}, 
				   {val: 'cancel', dispName: 'Cancel'}, 
				   {val: 'compensation', dispName: 'Compensation'}, 
				   {val: 'signal', dispName: 'Signal'}, 
				   {val: 'multiple', dispName: 'Multiple'}, 
				   {val: 'parallelMultiple', dispName: 'Parallel Multiple'}, 
				   {val: 'terminate', dispName: 'Terminate'}, 
				   {val: 'exclusiveGw', dispName: 'Exclusive Gw'}, 
				   {val: 'parallelGw', dispName: 'Parallel Gw'}, 
				   {val: 'complexGw', dispName: 'Complex Gw'}]
	},
	{name: 'outline', dispName: 'Event Type', type: 'enum', defVal:'standard', 
		enumList: [{val: 'standard', dispName: 'Standard'}, 
				   {val: 'eventInt', dispName: 'Interrupting'}, 
				   {val: 'eventNonint', dispName: 'Non-Interrupting'}, 
				   {val: 'catching', dispName: 'Catching'}, 
				   {val: 'boundInt', dispName: 'Bound Interrupting'}, 
				   {val: 'boundNonint', dispName: 'Bound Non-Interrupting'}, 
				   {val: 'throwing', dispName: 'Throwing'}, 
				   {val: 'end', dispName: 'End'}, 
				   {val: 'none', dispName: 'None'}]
	},
	{name: 'background', dispName: 'Background', type: 'enum', defVal:'none',
		enumList: [{val: 'gateway', dispName: 'Gateway'}, 
				   {val: 'none', dispName: 'None'}]
}];

mxBpmnShape.prototype.eventTypeEnum = { 
		START_STANDARD : 'standard', 
		EVENT_SP_INT : 'eventInt', 
		EVENT_SP_NONINT : 'eventNonint',
		CATCHING : 'catching',
		BOUND_INT : 'boundInt',
		BOUND_NONINT : 'boundNonint',
		THROWING : 'throwing',
		END : 'end',
		NONE : 'none',
		GATEWAY : 'gateway'};

mxBpmnShape.prototype.eventEnum = { 
		GENERAL 		: 'general', 
		MESSAGE 		: 'message', 
		TIMER 			: 'timer', 
		ESCALATION 		: 'escalation', 
		CONDITIONAL 	: 'conditional', 
		LINK 			: 'link', 
		ERROR			: 'error', 
		CANCEL			: 'cancel', 
		COMPENSATION 	: 'compensation', 
		SIGNAL 			: 'signal', 
		MULTIPLE		: 'multiple', 
		PAR_MULTI		: 'parallelMultiple', 
		TERMINATE		: 'terminate',
		GW_EXCLUSIVE 	: 'exclusiveGw',
		GW_PARALLEL		: 'parallelGw',
		GW_COMPLEX		: 'complexGw'};

mxBpmnShape.prototype.miscEnum = {
		OUTLINE			: 'outline',
		BACKGROUND		: 'background',
		SYMBOL			: 'symbol',
		GATEWAY			: 'gateway'};

/**
 * Function: paintVertexShape
 * 
 * Paints the vertex shape.
 */
mxBpmnShape.prototype.paintVertexShape = function(c, x, y, w, h)
{
	this.redrawPath(c, x, y, w, h, mxBpmnShape.prototype.miscEnum.BACKGROUND);
	var bg = mxUtils.getValue(this.style, mxBpmnShape.prototype.miscEnum.BACKGROUND, mxBpmnShape.prototype.eventTypeEnum.NONE);

	if (bg === mxBpmnShape.prototype.eventTypeEnum.GATEWAY)
	{
		c.setShadow(false);
	}

	this.redrawPath(c, x, y, w, h, mxBpmnShape.prototype.miscEnum.OUTLINE);
	this.redrawPath(c, x, y, w, h, mxBpmnShape.prototype.miscEnum.SYMBOL);
}

/**
 * Function: redrawPath
 *
 * Draws the path for this shape.
 */
mxBpmnShape.prototype.redrawPath = function(c, x, y, w, h, layer)
{
	var bg = mxUtils.getValue(this.style, mxBpmnShape.prototype.miscEnum.BACKGROUND, mxBpmnShape.prototype.eventTypeEnum.NONE);

	if (layer == mxBpmnShape.prototype.miscEnum.BACKGROUND)
	{
		if (bg != null)
		{
			var f = this.backgrounds[bg];

			if (f != null)
			{
				c.translate(x, y);
				f.call(this, c, x, y, w, h, layer);
			}
		}
	}
	else if (layer == mxBpmnShape.prototype.miscEnum.OUTLINE)
	{
		if (bg === mxBpmnShape.prototype.eventTypeEnum.GATEWAY)
		{
			c.translate(w / 4, h / 4);
			h /= 2;
			w /= 2;
			
			//add rhombus connections here
			this.constraints = [
			                                      new mxConnectionConstraint(new mxPoint(0.5, 0), true),
			                                      new mxConnectionConstraint(new mxPoint(0.5, 1), true),
			                                      new mxConnectionConstraint(new mxPoint(0, 0.5), true),
			                                      new mxConnectionConstraint(new mxPoint(1, 0.5), true),
			                                      new mxConnectionConstraint(new mxPoint(0.25, 0.25), false),
			                                      new mxConnectionConstraint(new mxPoint(0.25, 0.75), false),
			                                      new mxConnectionConstraint(new mxPoint(0.75, 0.25), false),
			                                      new mxConnectionConstraint(new mxPoint(0.75, 0.75), false)
			                                      ];
		}
		else
		{
			//add ellipse connections here
			this.constraints = [
			                                      new mxConnectionConstraint(new mxPoint(0.5, 0), true),
			                                      new mxConnectionConstraint(new mxPoint(0.5, 1), true),
			                                      new mxConnectionConstraint(new mxPoint(0, 0.5), true),
			                                      new mxConnectionConstraint(new mxPoint(1, 0.5), true),
			                                      new mxConnectionConstraint(new mxPoint(0.145, 0.145), false),
			                                      new mxConnectionConstraint(new mxPoint(0.145, 0.855), false),
			                                      new mxConnectionConstraint(new mxPoint(0.855, 0.145), false),
			                                      new mxConnectionConstraint(new mxPoint(0.855, 0.855), false)
			                                      ];
		}

		var o = mxUtils.getValue(this.style, mxBpmnShape.prototype.miscEnum.OUTLINE, mxBpmnShape.prototype.eventTypeEnum.NONE);

		if (o != null)
		{
			var f = this.outlines[o];

			if (f != null)
			{
				f.call(this, c, x, y, w, h, bg === mxBpmnShape.prototype.eventTypeEnum.GATEWAY);
			}
		}
	}
	else if (layer == mxBpmnShape.prototype.miscEnum.SYMBOL)
	{
		if (bg === mxBpmnShape.prototype.eventTypeEnum.GATEWAY)
		{
			h /= 2;
			w /= 2;
		}

		var s = mxUtils.getValue(this.style, mxBpmnShape.prototype.miscEnum.SYMBOL, null);

		if (s != null)
		{
			var f = this.symbols[s];

			if (f != null)
			{
				var strokeColor = c.state.strokeColor;
				var fillColor = c.state.fillColor;
				var o = mxUtils.getValue(this.style, mxBpmnShape.prototype.miscEnum.OUTLINE, mxBpmnShape.prototype.eventTypeEnum.NONE);

				if (s === mxBpmnShape.prototype.eventEnum.MESSAGE)
				{
					c.translate(w * 0.15, h * 0.3);
					w = w * 0.7;
					h = h * 0.4;
				}
				else if (s === mxBpmnShape.prototype.eventEnum.TIMER)
				{
					c.translate(w * 0.11, h * 0.11);
					w = w * 0.78;
					h = h * 0.78;
				}
				else if (s === mxBpmnShape.prototype.eventEnum.ESCALATION)
				{
					c.translate(w * 0.19, h * 0.15);
					w = w * 0.62;
					h = h * 0.57;
				}
				else if (s === mxBpmnShape.prototype.eventEnum.CONDITIONAL)
				{
					c.translate(w * 0.3, h * 0.16);
					w = w * 0.4;
					h = h * 0.68;
				}
				else if (s === mxBpmnShape.prototype.eventEnum.LINK)
				{
					c.translate(w * 0.27, h * 0.33);
					w = w * 0.46;
					h = h * 0.34;
				}
				else if (s === mxBpmnShape.prototype.eventEnum.ERROR)
				{
					c.translate(w * 0.212, h * 0.243);
					w = w * 0.58;
					h = h * 0.507;
				}
				else if (s === mxBpmnShape.prototype.eventEnum.CANCEL)
				{
					c.translate(w * 0.22, h * 0.22);
					w = w * 0.56;
					h = h * 0.56;
				}
				else if (s === mxBpmnShape.prototype.eventEnum.COMPENSATION)
				{
					c.translate(w * 0.28, h * 0.35);
					w = w * 0.44;
					h = h * 0.3;
				}
				else if (s === mxBpmnShape.prototype.eventEnum.SIGNAL)
				{
					c.translate(w * 0.19, h * 0.15);
					w = w * 0.62;
					h = h * 0.57;
				}
				else if (s === mxBpmnShape.prototype.eventEnum.MULTIPLE)
				{
					c.translate(w * 0.2, h * 0.19);
					w = w * 0.6;
					h = h * 0.565;
				}
				else if (s === mxBpmnShape.prototype.eventEnum.PAR_MULTI)
				{
					c.translate(w * 0.2, h * 0.2);
					w = w * 0.6;
					h = h * 0.6;
				}
				else if (s === mxBpmnShape.prototype.eventEnum.TERMINATE)
				{
					c.translate(w * 0.05, h * 0.05);
					w = w * 0.9;
					h = h * 0.9;
				}
				else if (s === mxBpmnShape.prototype.eventEnum.GW_EXCLUSIVE)
				{
					c.translate(w * 0.12, 0);
					w = w * 0.76;
				}
				
				var isInverse = false;
				
				if (s === 'star')
				{
					c.setFillColor(strokeColor);
				}
				else if (o === mxBpmnShape.prototype.eventTypeEnum.THROWING || o === mxBpmnShape.prototype.eventTypeEnum.END)
				{
					c.setStrokeColor(fillColor);
					c.setFillColor(strokeColor);
					isInverse = true;
				}

				f.call(this, c, x, y, w, h, layer, isInverse);
				
				if (s === 'star')
				{
					c.setFillColor(fillColor);
				}
				else if (o === mxBpmnShape.prototype.eventTypeEnum.THROWING || o === mxBpmnShape.prototype.eventTypeEnum.END)
				{
					c.setStrokeColor(strokeColor);
					c.setFillColor(fillColor);
				}
			}
		}
	}
};

//Contains all possible backgrounds
mxBpmnShape.prototype.backgrounds = {
		'none': function(c, x, y, w, h)
		{
		},
		'gateway': function(c, x, y, w, h)
		{
			c.begin();
			c.moveTo(w / 2, 0);
			c.lineTo(w, h / 2);
			c.lineTo(w / 2, h);
			c.lineTo(0, h / 2);
			c.close();
			c.fillAndStroke();
		}
};

//Contains all possible outlines
mxBpmnShape.prototype.outlines = {
		'none' : function(c, x, y, w, h, isGateway)
		{
			if (!isGateway)
			{
				c.setShadow(false);
			}
		},
		'standard': function(c, x, y, w, h, isGateway)
		{
			c.ellipse(0, 0, w, h);
			c.fillAndStroke();

			if (!isGateway)
			{
				c.setShadow(false);
			}
		},
		'eventInt': function(c, x, y, w, h, isGateway)
		{
			c.ellipse(0, 0, w, h);
			c.fillAndStroke();

			if (!isGateway)
			{
				c.setShadow(false);
			}
		},
		'eventNonint': function(c, x, y, w, h, isGateway)
		{
			var dashed = c.state.dashed;
			c.setDashed(true);
			c.ellipse(0, 0, w, h);
			c.fillAndStroke();
			c.setDashed(dashed);

			if (!isGateway)
			{
				c.setShadow(false);
			}

		},
		'catching': function(c, x, y, w, h, isGateway)
		{
			c.ellipse(0, 0, w, h);
			c.fillAndStroke();

			if (!isGateway)
			{
				c.setShadow(false);
			}

			var inset = 2;
			c.ellipse(inset, inset, w - 2 *inset, h - 2 * inset);
			c.stroke();
		},
		'boundInt': function(c, x, y, w, h, isGateway)
		{
			c.ellipse(0, 0, w, h);
			c.fillAndStroke();

			if (!isGateway)
			{
				c.setShadow(false);
			}
			var inset = 2;
			c.ellipse(inset, inset, w - 2 *inset, h - 2 * inset);
			c.stroke();
		},
		'boundNonint': function(c, x, y, w, h, isGateway)
		{
			var dashed = c.state.dashed;
			c.setDashed(true);
			c.ellipse(0, 0, w, h);
			c.fillAndStroke();

			if (!isGateway)
			{
				c.setShadow(false);
			}

			var inset = 2;
			c.ellipse(inset, inset, w - 2 *inset, h - 2 * inset);
			c.stroke();
			c.setDashed(dashed);
		},
		'throwing': function(c, x, y, w, h, isGateway)
		{
			c.ellipse(0, 0, w, h);
			c.fillAndStroke();

			if (!isGateway)
			{
				c.setShadow(false);
			}

			var inset = 2;
			c.ellipse(w * 0.02 + inset, h * 0.02 + inset, w * 0.96 - 2 *inset, h * 0.96 - 2 * inset);
			c.stroke();
		},
		'end': function(c, x, y, w, h, isGateway)
		{
			var sw = c.state.strokeWidth;
			c.setStrokeWidth(sw * 3);
			c.ellipse(0, 0, w, h);
			c.fillAndStroke();
			c.setStrokeWidth(sw);

			if (!isGateway)
			{
				c.setShadow(false);
			}
		}
};

//Contains all possible symbols
mxBpmnShape.prototype.symbols = {
		'general' : function(c, x, y, w, h)
		{
		},
		'message': function(c, x, y, w, h, layer, isInverse)
		{
			c.rect(0, 0, w, h);
			c.fillAndStroke();

			var fc = mxUtils.getValue(this.style, "fillColor", "none");

			if (fc === 'none')
			{
				if (isInverse)
				{
					c.setStrokeColor('#ffffff');
				}
			}
			
			c.begin();
			c.moveTo(0, 0);
			c.lineTo(w * 0.5, h * 0.5);
			c.lineTo(w, 0);
			c.stroke();
		},
		'timer' : function(c, x, y, w, h)
		{
			c.ellipse(0, 0, w, h);
			c.fillAndStroke();

			c.begin();
			c.moveTo(w * 0.5, 0);
			c.lineTo(w * 0.5, h * 0.0642);
			c.moveTo(w * 0.7484, h * 0.0654);
			c.lineTo(w * 0.7126, h * 0.1281);
			c.moveTo(w * 0.93, h * 0.2471);
			c.lineTo(w * 0.8673, h * 0.2854);
			c.moveTo(w, h * 0.5);
			c.lineTo(w * 0.9338, h * 0.5);
			c.moveTo(w * 0.93, h * 0.7509);
			c.lineTo(w * 0.8673, h * 0.7126);
			c.moveTo(w * 0.7484, h * 0.9326);
			c.lineTo(w * 0.7126, h * 0.8699);
			c.moveTo(w * 0.5, h * 0.9338);
			c.lineTo(w * 0.5, h);
			c.moveTo(w * 0.2496, h * 0.9325);
			c.lineTo(w * 0.2854, h * 0.8699);
			c.moveTo(w * 0.068, h * 0.7509);
			c.lineTo(w * 0.1307, h * 0.7126);
			c.moveTo(0, h * 0.5);
			c.lineTo(w * 0.0642, h * 0.5);
			c.moveTo(w * 0.068, h * 0.2471);
			c.lineTo(w * 0.1307, h * 0.2854);
			c.moveTo(w * 0.2496, h * 0.0654);
			c.lineTo(w * 0.2854, h * 0.1281);
			c.moveTo(w * 0.5246, h * 0.0706);
			c.lineTo(w * 0.5, h * 0.5);
			c.lineTo(w * 0.7804, h * 0.5118);	
			c.stroke();
		},
		'escalation' : function(c, x, y, w, h)
		{
			c.begin();
			c.moveTo(0, h);
			c.lineTo(w * 0.5, 0);
			c.lineTo(w, h);
			c.lineTo(w * 0.5, h * 0.5);
			c.close();
			c.fillAndStroke();
		},
		'conditional' : function(c, x, y, w, h)
		{
			c.rect(0, 0, w, h);
			c.fillAndStroke();
			c.begin();
			c.moveTo(0, h * 0.1027);
			c.lineTo(w * 0.798, h * 0.1027);
			c.moveTo(0, h * 0.3669);
			c.lineTo(w * 0.798, h * 0.3669);
			c.moveTo(0, h * 0.6311);
			c.lineTo(w * 0.798, h * 0.6311);
			c.moveTo(0, h * 0.8953);
			c.lineTo(w * 0.798, h * 0.8953);
			c.stroke();
		},
		'link' : function(c, x, y, w, h)
		{
			c.begin();
			c.moveTo(0, h * 0.76);
			c.lineTo(0, h * 0.24);
			c.lineTo(w * 0.63, h * 0.24);
			c.lineTo(w * 0.63, 0);
			c.lineTo(w, h * 0.5);
			c.lineTo(w * 0.63, h);
			c.lineTo(w * 0.63, h * 0.76);
			c.close();
			c.fillAndStroke();
		},
		'error' : function(c, x, y, w, h, layer, isInverse)
		{
			c.begin();
			c.moveTo(0, h);
			c.lineTo(w * 0.3287, h * 0.123);
			c.lineTo(w * 0.6194, h * 0.6342);
			c.lineTo(w, 0);
			c.lineTo(w * 0.6625, h * 0.939);
			c.lineTo(w * 0.3717, h * 0.5064);
			c.close();
			if(isInverse)
			{
				c.fill();
			}
			else
			{
				c.fillAndStroke();
			}
		},
		'cancel' : function(c, x, y, w, h)
		{
			c.begin();
			c.moveTo(w * 0.1051, 0);
			c.lineTo(w * 0.5, h * 0.3738);
			c.lineTo(w * 0.8909, 0);
			c.lineTo(w, h * 0.1054);
			c.lineTo(w * 0.623, h * 0.5);
			c.lineTo(w, h * 0.8926);
			c.lineTo(w * 0.8909, h);
			c.lineTo(w * 0.5, h * 0.6242);
			c.lineTo(w * 0.1051, h);
			c.lineTo(0, h * 0.8926);
			c.lineTo(w * 0.373, h * 0.5);
			c.lineTo(0, h * 0.1054);
			c.close();
			c.fillAndStroke();
		},
		'compensation' : function(c, x, y, w, h)
		{
			c.begin();
			c.moveTo(0, h * 0.5);
			c.lineTo(w * 0.5, 0);
			c.lineTo(w * 0.5, h);
			c.close();
			c.moveTo(w * 0.5, h * 0.5);
			c.lineTo(w, 0);
			c.lineTo(w, h);
			c.close();
			c.fillAndStroke();
		},
		'signal' : function(c, x, y, w, h)
		{
			c.begin();
			c.moveTo(0, h);
			c.lineTo(w * 0.5, 0);
			c.lineTo(w, h);
			c.close();
			c.fillAndStroke();
		},
		'multiple' : function(c, x, y, w, h)
		{
			c.begin();
			c.moveTo(0, h * 0.39);
			c.lineTo(w * 0.5, 0);
			c.lineTo(w, h * 0.39);
			c.lineTo(w * 0.815, h);
			c.lineTo(w * 0.185, h);
			c.close();
			c.fillAndStroke();
		},
		'parallelMultiple' : function(c, x, y, w, h)
		{
			c.begin();
			c.moveTo(w * 0.38, 0);
			c.lineTo(w * 0.62, 0);
			c.lineTo(w * 0.62, h * 0.38);
			c.lineTo(w, h * 0.38);
			c.lineTo(w, h * 0.62);
			c.lineTo(w * 0.62, h * 0.62);
			c.lineTo(w * 0.62, h);
			c.lineTo(w * 0.38, h);
			c.lineTo(w * 0.38, h * 0.62);
			c.lineTo(0, h * 0.62);
			c.lineTo(0, h * 0.38);
			c.lineTo(w * 0.38, h * 0.38);
			c.close();
			c.fillAndStroke();
		},
		'terminate' : function(c, x, y, w, h)
		{
			c.ellipse(0, 0, w, h);
			c.fillAndStroke();
		},
		'exclusiveGw' : function(c, x, y, w, h)
		{
			var strokeColor = c.state.strokeColor;
			var fillColor = c.state.fillColor;
			c.setStrokeColor(fillColor);
			c.setFillColor(strokeColor);

			c.begin();
			c.moveTo(w * 0.105, 0);
			c.lineTo(w * 0.5, h * 0.38);
			c.lineTo(w * 0.895, h * 0);
			c.lineTo(w, h * 0.11);
			c.lineTo(w * 0.6172, h * 0.5);
			c.lineTo(w, h * 0.89);
			c.lineTo(w * 0.895, h);
			c.lineTo(w * 0.5, h * 0.62);
			c.lineTo(w * 0.105, h);
			c.lineTo(0, h * 0.89);
			c.lineTo(w * 0.3808, h * 0.5);
			c.lineTo(0, h * 0.11);
			c.close();
			c.fillAndStroke();

			c.setStrokeColor(strokeColor);
			c.setFillColor(fillColor);

		},
		'parallelGw' : function(c, x, y, w, h)
		{
			var strokeColor = c.state.strokeColor;
			var fillColor = c.state.fillColor;
			c.setStrokeColor(fillColor);
			c.setFillColor(strokeColor);

			c.begin();
			c.moveTo(w * 0.38, 0);
			c.lineTo(w * 0.62, 0);
			c.lineTo(w * 0.62, h * 0.38);
			c.lineTo(w, h * 0.38);
			c.lineTo(w, h * 0.62);
			c.lineTo(w * 0.62, h * 0.62);
			c.lineTo(w * 0.62, h);
			c.lineTo(w * 0.38, h);
			c.lineTo(w * 0.38, h * 0.62);
			c.lineTo(0, h * 0.62);
			c.lineTo(0, h * 0.38);
			c.lineTo(w * 0.38, h * 0.38);
			c.close();
			c.fillAndStroke();

			c.setStrokeColor(strokeColor);
			c.setFillColor(fillColor);
		},
		'complexGw' : function(c, x, y, w, h)
		{
			var strokeColor = c.state.strokeColor;
			var fillColor = c.state.fillColor;
			c.setStrokeColor(fillColor);
			c.setFillColor(strokeColor);

			c.begin();
			c.moveTo(0, h * 0.44);
			c.lineTo(w * 0.36, h * 0.44);
			c.lineTo(w * 0.1, h * 0.18);
			c.lineTo(w * 0.18, h * 0.1);
			c.lineTo(w * 0.44, h * 0.36);
			c.lineTo(w * 0.44, 0);
			c.lineTo(w * 0.56, 0);
			c.lineTo(w * 0.56, h * 0.36);
			c.lineTo(w * 0.82, h * 0.1);
			c.lineTo(w * 0.90, h * 0.18);
			c.lineTo(w * 0.64, h * 0.44);
			c.lineTo(w, h * 0.44);
			c.lineTo(w, h * 0.56);
			c.lineTo(w * 0.64, h * 0.56);
			c.lineTo(w * 0.9, h * 0.82);
			c.lineTo(w * 0.82, h * 0.9);
			c.lineTo(w * 0.56, h * 0.64);
			c.lineTo(w * 0.56, h);
			c.lineTo(w * 0.44, h);
			c.lineTo(w * 0.44, h * 0.64);
			c.lineTo(w * 0.18, h * 0.9);
			c.lineTo(w * 0.1, h * 0.82);
			c.lineTo(w * 0.36, h * 0.56);
			c.lineTo(0, h * 0.56);
			c.close();
			c.fillAndStroke();

			c.setStrokeColor(strokeColor);
			c.setFillColor(fillColor);
		},
		'star': function(c, x, y, w, h)
		{
			c.translate(w / 5, h / 6);
			h *= 2 / 3;
			w *= 3 / 5;
			
			c.begin();
			c.moveTo(0, h / 4);
			c.lineTo(w / 3, h / 4);
			c.lineTo(w / 2, 0);
			c.lineTo(2 * w / 3, h / 4);
			c.lineTo(w, h / 4);
			c.lineTo(5 * w / 6, h / 2);
			c.lineTo(w, 3 * h / 4);
			c.lineTo(2 * w / 3, 3 * h / 4);
			c.lineTo(w / 2, h);
			c.lineTo(w / 3, 3 * h / 4);
			c.lineTo(0, 3 * h / 4);
			c.lineTo(w / 6, h / 2);
			c.close();
			c.fillAndStroke();
		}
};

mxCellRenderer.registerShape('mxgraph.bpmn.shape', mxBpmnShape);

//**********************************************************************************************************************************************************
//Send / Receive marker
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeBpmn2SendMarker(bounds, fill, stroke, strokewidth)
{
	mxShape.call(this);
	this.bounds = bounds;
	this.fill = fill;
	this.stroke = stroke;
	this.strokewidth = (strokewidth != null) ? strokewidth : 1;
	this.dy = 0.5;
	this.dx = 0.5;
	this.notch = 0;
};

/**
* Extends mxShape.
*/
mxUtils.extend(mxShapeBpmn2SendMarker, mxActor);

mxShapeBpmn2SendMarker.prototype.cst = {
		SEND : 'mxgraph.bpmn.sendMarker'
};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeBpmn2SendMarker.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);

	c.rect(0, 0, w, h);
	c.fillAndStroke();
	
	c.setShadow(false);

	c.begin();
	c.moveTo(0,0);
	c.lineTo(w * 0.5, h * 0.5);
	c.lineTo(w, 0);
	c.stroke();
};

mxCellRenderer.registerShape(mxShapeBpmn2SendMarker.prototype.cst.SEND, mxShapeBpmn2SendMarker);


// BPMN event shape
function mxShapeBpmnEvent(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxShapeBpmnEvent, mxShape);

mxShapeBpmnEvent.prototype.eventTypeEnum = { 
		START_STANDARD : 'standard', 
		EVENT_SP_INT : 'eventInt', 
		EVENT_SP_NONINT : 'eventNonint',
		CATCHING : 'catching',
		BOUND_INT : 'boundInt',
		BOUND_NONINT : 'boundNonint',
		THROWING : 'throwing',
		END : 'end',
		NONE : 'none'};

mxShapeBpmnEvent.prototype.eventEnum = { 
		GENERAL 		: 'general', 
		MESSAGE 		: 'message', 
		TIMER 			: 'timer', 
		ESCALATION 		: 'escalation', 
		CONDITIONAL 	: 'conditional', 
		LINK 			: 'link', 
		ERROR			: 'error', 
		CANCEL			: 'cancel', 
		COMPENSATION 	: 'compensation', 
		SIGNAL 			: 'signal', 
		MULTIPLE		: 'multiple', 
		PAR_MULTI		: 'parallelMultiple', 
		TERMINATE		: 'terminate'};

mxShapeBpmnEvent.prototype.miscEnum = {
		OUTLINE			: 'outline',
		SYMBOL			: 'symbol'};

mxShapeBpmnEvent.prototype.customProperties = [
	{name: mxShapeBpmnEvent.prototype.miscEnum.SYMBOL, dispName: 'Event', type: 'enum', defVal:mxShapeBpmnEvent.prototype.eventEnum.GENERAL, 
		enumList: [{val: mxShapeBpmnEvent.prototype.eventEnum.GENERAL, dispName: 'General'}, 
			   	   {val: mxShapeBpmnEvent.prototype.eventEnum.MESSAGE, dispName: 'Message'}, 
				   {val: mxShapeBpmnEvent.prototype.eventEnum.TIMER, dispName: 'Timer'}, 
				   {val: mxShapeBpmnEvent.prototype.eventEnum.ESCALATION, dispName: 'Escalation'}, 
				   {val: mxShapeBpmnEvent.prototype.eventEnum.CONDITIONAL, dispName: 'Conditional'}, 
				   {val: mxShapeBpmnEvent.prototype.eventEnum.LINK, dispName: 'Link'}, 
				   {val: mxShapeBpmnEvent.prototype.eventEnum.ERROR, dispName: 'Error'}, 
				   {val: mxShapeBpmnEvent.prototype.eventEnum.CANCEL, dispName: 'Cancel'}, 
				   {val: mxShapeBpmnEvent.prototype.eventEnum.COMPENSATION, dispName: 'Compensation'}, 
				   {val: mxShapeBpmnEvent.prototype.eventEnum.SIGNAL, dispName: 'Signal'}, 
				   {val: mxShapeBpmnEvent.prototype.eventEnum.MULTIPLE, dispName: 'Multiple'}, 
				   {val: mxShapeBpmnEvent.prototype.eventEnum.PAR_MULTI, dispName: 'Parallel Multiple'}, 
				   {val: mxShapeBpmnEvent.prototype.eventEnum.TERMINATE, dispName: 'Terminate'}]
	},
	{name: mxShapeBpmnEvent.prototype.miscEnum.OUTLINE, dispName: 'Event Type', type: 'enum', defVal:mxShapeBpmnEvent.prototype.eventTypeEnum.START_STANDARD, 
		enumList: [{val: mxShapeBpmnEvent.prototype.eventTypeEnum.START_STANDARD, dispName: 'Standard'}, 
				   {val: mxShapeBpmnEvent.prototype.eventTypeEnum.EVENT_SP_INT, dispName: 'Interrupting'}, 
				   {val: mxShapeBpmnEvent.prototype.eventTypeEnum.EVENT_SP_NONINT, dispName: 'Non-Interrupting'}, 
				   {val: mxShapeBpmnEvent.prototype.eventTypeEnum.CATCHING, dispName: 'Catching'}, 
				   {val: mxShapeBpmnEvent.prototype.eventTypeEnum.BOUND_INT, dispName: 'Bound Interrupting'}, 
				   {val: mxShapeBpmnEvent.prototype.eventTypeEnum.BOUND_NONINT, dispName: 'Bound Non-Interrupting'}, 
				   {val: mxShapeBpmnEvent.prototype.eventTypeEnum.THROWING, dispName: 'Throwing'}, 
				   {val: mxShapeBpmnEvent.prototype.eventTypeEnum.END, dispName: 'End'}, 
				   {val: mxShapeBpmnEvent.prototype.eventTypeEnum.NONE, dispName: 'None'}]
}];

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeBpmnEvent.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);
	this.strictDrawShape(c, 0, 0, w, h, null);
}

mxShapeBpmnEvent.prototype.strictDrawShape = function(c, x, y, w, h, outline, symbol)
{
	// draw event outline
	if (outline == null)
	{
		outline = mxUtils.getValue(this.style, this.miscEnum.OUTLINE, this.eventTypeEnum.NONE);
	}

	if (outline != null)
	{
		var f = mxShapeBpmnEvent.prototype.outlines[outline];

		if (f != null)
		{
			c.translate(x,y);
			f.call(this, c, x, y, w, h);
		}
	}
	
	// draw event symbol
	if (symbol == null)
	{
		symbol = mxUtils.getValue(this.style, this.miscEnum.SYMBOL, null);
	}

	if (symbol != null)
	{
		var f = mxShapeBpmnEvent.prototype.symbols[symbol];

		if (f != null)
		{
			var strokeColor = c.state.strokeColor;
			var fillColor = c.state.fillColor;

			if (symbol === this.eventEnum.MESSAGE)
			{
				c.translate(w * 0.15, h * 0.3);
				w = w * 0.7;
				h = h * 0.4;
			}
			else if (symbol === this.eventEnum.TIMER)
			{
				c.translate(w * 0.11, h * 0.11);
				w = w * 0.78;
				h = h * 0.78;
			}
			else if (symbol === this.eventEnum.ESCALATION)
			{
				c.translate(w * 0.19, h * 0.15);
				w = w * 0.62;
				h = h * 0.57;
			}
			else if (symbol === this.eventEnum.CONDITIONAL)
			{
				c.translate(w * 0.3, h * 0.16);
				w = w * 0.4;
				h = h * 0.68;
			}
			else if (symbol === this.eventEnum.LINK)
			{
				c.translate(w * 0.27, h * 0.33);
				w = w * 0.46;
				h = h * 0.34;
			}
			else if (symbol === this.eventEnum.ERROR)
			{
				c.translate(w * 0.212, h * 0.243);
				w = w * 0.58;
				h = h * 0.507;
			}
			else if (symbol === this.eventEnum.CANCEL)
			{
				c.translate(w * 0.22, h * 0.22);
				w = w * 0.56;
				h = h * 0.56;
			}
			else if (symbol === this.eventEnum.COMPENSATION)
			{
				c.translate(w * 0.28, h * 0.35);
				w = w * 0.44;
				h = h * 0.3;
			}
			else if (symbol === this.eventEnum.SIGNAL)
			{
				c.translate(w * 0.19, h * 0.15);
				w = w * 0.62;
				h = h * 0.57;
			}
			else if (symbol === this.eventEnum.MULTIPLE)
			{
				c.translate(w * 0.2, h * 0.19);
				w = w * 0.6;
				h = h * 0.565;
			}
			else if (symbol === this.eventEnum.PAR_MULTI)
			{
				c.translate(w * 0.2, h * 0.2);
				w = w * 0.6;
				h = h * 0.6;
			}
			else if (symbol === this.eventEnum.TERMINATE)
			{
				c.translate(w * 0.05, h * 0.05);
				w = w * 0.9;
				h = h * 0.9;
			}
			else if (symbol === this.eventEnum.GW_EXCLUSIVE)
			{
				c.translate(w * 0.12, 0);
				w = w * 0.76;
			}
			
			var isInverse = false;
			
			if (symbol === 'star')
			{
				c.setFillColor(strokeColor);
			}
			else if (outline === this.eventTypeEnum.THROWING || outline === this.eventTypeEnum.END)
			{
				c.setStrokeColor(fillColor);
				c.setFillColor(strokeColor);
				isInverse = true;
			}

			f.call(this, c, x, y, w, h, isInverse);
			
			if (symbol === 'star')
			{
				c.setFillColor(fillColor);
			}
			else if (outline === this.eventTypeEnum.THROWING || outline === this.eventTypeEnum.END)
			{
				c.setStrokeColor(strokeColor);
				c.setFillColor(fillColor);
			}
		}
	}
}

//Contains all possible outlines
mxShapeBpmnEvent.prototype.outlines = {
		'none' : function(c, x, y, w, h)
		{
				c.setShadow(false);
		},
		'standard': function(c, x, y, w, h)
		{
			c.ellipse(0, 0, w, h);
			c.fillAndStroke();

			c.setShadow(false);
		},
		'eventInt': function(c, x, y, w, h)
		{
			c.ellipse(0, 0, w, h);
			c.fillAndStroke();

			c.setShadow(false);
		},
		'eventNonint': function(c, x, y, w, h)
		{
			var dashed = c.state.dashed;
			c.setDashed(true);
			c.ellipse(0, 0, w, h);
			c.fillAndStroke();
			c.setDashed(dashed);

			c.setShadow(false);
		},
		'catching': function(c, x, y, w, h)
		{
			c.ellipse(0, 0, w, h);
			c.fillAndStroke();

			c.setShadow(false);

			var inset = 2;
			c.ellipse(inset, inset, w - 2 *inset, h - 2 * inset);
			c.stroke();
		},
		'boundInt': function(c, x, y, w, h)
		{
			c.ellipse(0, 0, w, h);
			c.fillAndStroke();

			c.setShadow(false);
			
			var inset = 2;
			c.ellipse(inset, inset, w - 2 *inset, h - 2 * inset);
			c.stroke();
		},
		'boundNonint': function(c, x, y, w, h)
		{
			var dashed = c.state.dashed;
			c.setDashed(true);
			c.ellipse(0, 0, w, h);
			c.fillAndStroke();

			c.setShadow(false);

			var inset = 2;
			c.ellipse(inset, inset, w - 2 *inset, h - 2 * inset);
			c.stroke();
			c.setDashed(dashed);
		},
		'throwing': function(c, x, y, w, h)
		{
			c.ellipse(0, 0, w, h);
			c.fillAndStroke();

			c.setShadow(false);

			var inset = 2;
			c.ellipse(w * 0.02 + inset, h * 0.02 + inset, w * 0.96 - 2 *inset, h * 0.96 - 2 * inset);
			c.stroke();
		},
		'end': function(c, x, y, w, h)
		{
			var sw = c.state.strokeWidth;
			c.setStrokeWidth(sw * 3);
			c.ellipse(0, 0, w, h);
			c.fillAndStroke();
			c.setStrokeWidth(sw);

			c.setShadow(false);
		}
};

//Contains all possible symbols
mxShapeBpmnEvent.prototype.symbols = {
		'general' : function(c, x, y, w, h, isInverse)
		{
		},
		'message': function(c, x, y, w, h, isInverse)
		{
			c.rect(0, 0, w, h);
			c.fillAndStroke();

			var fc = mxUtils.getValue(this.style, "fillColor", "none");

			if (fc === 'none')
			{
				if (isInverse)
				{
					c.setStrokeColor('#ffffff');
				}
			}
			
			c.begin();
			c.moveTo(0, 0);
			c.lineTo(w * 0.5, h * 0.5);
			c.lineTo(w, 0);
			c.stroke();
		},
		'timer' : function(c, x, y, w, h, isInverse)
		{
			c.ellipse(0, 0, w, h);
			c.fillAndStroke();

			c.begin();
			c.moveTo(w * 0.5, 0);
			c.lineTo(w * 0.5, h * 0.0642);
			c.moveTo(w * 0.7484, h * 0.0654);
			c.lineTo(w * 0.7126, h * 0.1281);
			c.moveTo(w * 0.93, h * 0.2471);
			c.lineTo(w * 0.8673, h * 0.2854);
			c.moveTo(w, h * 0.5);
			c.lineTo(w * 0.9338, h * 0.5);
			c.moveTo(w * 0.93, h * 0.7509);
			c.lineTo(w * 0.8673, h * 0.7126);
			c.moveTo(w * 0.7484, h * 0.9326);
			c.lineTo(w * 0.7126, h * 0.8699);
			c.moveTo(w * 0.5, h * 0.9338);
			c.lineTo(w * 0.5, h);
			c.moveTo(w * 0.2496, h * 0.9325);
			c.lineTo(w * 0.2854, h * 0.8699);
			c.moveTo(w * 0.068, h * 0.7509);
			c.lineTo(w * 0.1307, h * 0.7126);
			c.moveTo(0, h * 0.5);
			c.lineTo(w * 0.0642, h * 0.5);
			c.moveTo(w * 0.068, h * 0.2471);
			c.lineTo(w * 0.1307, h * 0.2854);
			c.moveTo(w * 0.2496, h * 0.0654);
			c.lineTo(w * 0.2854, h * 0.1281);
			c.moveTo(w * 0.5246, h * 0.0706);
			c.lineTo(w * 0.5, h * 0.5);
			c.lineTo(w * 0.7804, h * 0.5118);	
			c.stroke();
		},
		'escalation' : function(c, x, y, w, h, isInverse)
		{
			c.setMiterLimit(6);
			c.begin();
			c.moveTo(0, h);
			c.lineTo(w * 0.5, 0);
			c.lineTo(w, h);
			c.lineTo(w * 0.5, h * 0.5);
			c.close();
			
			if (isInverse)
			{
				c.fill();
			}
			else
			{
				c.fillAndStroke();
			}
		},
		'conditional' : function(c, x, y, w, h, isInverse)
		{
			c.rect(0, 0, w, h);
			c.fillAndStroke();
			c.begin();
			c.moveTo(0, h * 0.1027);
			c.lineTo(w * 0.798, h * 0.1027);
			c.moveTo(0, h * 0.3669);
			c.lineTo(w * 0.798, h * 0.3669);
			c.moveTo(0, h * 0.6311);
			c.lineTo(w * 0.798, h * 0.6311);
			c.moveTo(0, h * 0.8953);
			c.lineTo(w * 0.798, h * 0.8953);
			c.stroke();
		},
		'link' : function(c, x, y, w, h, isInverse)
		{
			c.begin();
			c.moveTo(0, h * 0.76);
			c.lineTo(0, h * 0.24);
			c.lineTo(w * 0.63, h * 0.24);
			c.lineTo(w * 0.63, 0);
			c.lineTo(w, h * 0.5);
			c.lineTo(w * 0.63, h);
			c.lineTo(w * 0.63, h * 0.76);
			c.close();
			
			isInverse ? c.fill() : c.fillAndStroke();
		},
		'error' : function(c, x, y, w, h, isInverse)
		{
			c.setMiterLimit(7);
			c.begin();
			c.moveTo(0, h);
			c.lineTo(w * 0.3287, h * 0.123);
			c.lineTo(w * 0.6194, h * 0.6342);
			c.lineTo(w, 0);
			c.lineTo(w * 0.6625, h * 0.939);
			c.lineTo(w * 0.3717, h * 0.5064);
			c.close();
			
			isInverse ? c.fill() : c.fillAndStroke();
		},
		'cancel' : function(c, x, y, w, h, isInverse)
		{
			c.begin();
			c.moveTo(w * 0.1051, 0);
			c.lineTo(w * 0.5, h * 0.3738);
			c.lineTo(w * 0.8909, 0);
			c.lineTo(w, h * 0.1054);
			c.lineTo(w * 0.623, h * 0.5);
			c.lineTo(w, h * 0.8926);
			c.lineTo(w * 0.8909, h);
			c.lineTo(w * 0.5, h * 0.6242);
			c.lineTo(w * 0.1051, h);
			c.lineTo(0, h * 0.8926);
			c.lineTo(w * 0.373, h * 0.5);
			c.lineTo(0, h * 0.1054);
			c.close();
			
			isInverse ? c.fill() : c.fillAndStroke();
		},
		'compensation' : function(c, x, y, w, h, isInverse)
		{
			c.setMiterLimit(1);
			c.begin();
			c.moveTo(0, h * 0.5);
			c.lineTo(w * 0.5, 0);
			c.lineTo(w * 0.5, h);
			c.close();
			c.moveTo(w * 0.5, h * 0.5);
			c.lineTo(w, 0);
			c.lineTo(w, h);
			c.close();
			
			isInverse ? c.fill() : c.fillAndStroke();
		},
		'signal' : function(c, x, y, w, h, isInverse)
		{
			c.begin();
			c.moveTo(0, h);
			c.lineTo(w * 0.5, 0);
			c.lineTo(w, h);
			c.close();
			
			isInverse ? c.fill() : c.fillAndStroke();
		},
		'multiple' : function(c, x, y, w, h, isInverse)
		{
			c.begin();
			c.moveTo(0, h * 0.39);
			c.lineTo(w * 0.5, 0);
			c.lineTo(w, h * 0.39);
			c.lineTo(w * 0.815, h);
			c.lineTo(w * 0.185, h);
			c.close();
			
			isInverse ? c.fill() : c.fillAndStroke();
		},
		'parallelMultiple' : function(c, x, y, w, h, isInverse)
		{
			c.begin();
			c.moveTo(w * 0.38, 0);
			c.lineTo(w * 0.62, 0);
			c.lineTo(w * 0.62, h * 0.38);
			c.lineTo(w, h * 0.38);
			c.lineTo(w, h * 0.62);
			c.lineTo(w * 0.62, h * 0.62);
			c.lineTo(w * 0.62, h);
			c.lineTo(w * 0.38, h);
			c.lineTo(w * 0.38, h * 0.62);
			c.lineTo(0, h * 0.62);
			c.lineTo(0, h * 0.38);
			c.lineTo(w * 0.38, h * 0.38);
			c.close();
			
			isInverse ? c.fill() : c.fillAndStroke();
		},
		'terminate' : function(c, x, y, w, h, isInverse)
		{
			c.ellipse(0, 0, w, h);
			c.fillAndStroke();
		},
		'star': function(c, x, y, w, h, isInverse)
		{
			c.translate(w / 5, h / 6);
			h *= 2 / 3;
			w *= 3 / 5;
			
			c.begin();
			c.moveTo(0, h / 4);
			c.lineTo(w / 3, h / 4);
			c.lineTo(w / 2, 0);
			c.lineTo(2 * w / 3, h / 4);
			c.lineTo(w, h / 4);
			c.lineTo(5 * w / 6, h / 2);
			c.lineTo(w, 3 * h / 4);
			c.lineTo(2 * w / 3, 3 * h / 4);
			c.lineTo(w / 2, h);
			c.lineTo(w / 3, 3 * h / 4);
			c.lineTo(0, 3 * h / 4);
			c.lineTo(w / 6, h / 2);
			c.close();
			c.fillAndStroke();
		}
};

mxCellRenderer.registerShape('mxgraph.bpmn.event', mxShapeBpmnEvent);

//BPMN gateway shape
function mxShapeBpmnGateway(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxShapeBpmnGateway, mxShape);

mxShapeBpmnGateway.prototype.customProperties = mxShapeBpmnEvent.prototype.customProperties;
mxShapeBpmnGateway.prototype.eventTypeEnum = mxShapeBpmnEvent.prototype.eventTypeEnum; 
mxShapeBpmnGateway.prototype.eventEnum = mxShapeBpmnEvent.prototype.eventEnum; 
mxShapeBpmnGateway.prototype.miscEnum = mxShapeBpmnEvent.prototype.miscEnum;

mxShapeBpmnGateway.prototype.customProperties = mxShapeBpmnGateway.prototype.customProperties.concat(
	{name: 'gwType', dispName: 'Gateway type', type: 'enum', defVal:'event', 
		enumList: [{val: 'event', dispName: 'Event-based'}, 
				   {val: 'exclusive', dispName: 'Exclusive'}, 
				   {val: 'parallel', dispName: 'Parallel'}, 
				   {val: 'complex', dispName: 'Complex'}]});

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeBpmnGateway.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);

	c.begin();
	c.moveTo(w * 0.5, 0);
	c.lineTo(w, h * 0.5);
	c.lineTo(w * 0.5, h);
	c.lineTo(0, h * 0.5);
	c.close();
	c.fillAndStroke();

	c.setShadow(false);
	
	var symbolW = w * 0.6;
	var symbolH = h * 0.6;
	
	var gwType = mxUtils.getValue(this.style, 'gwType', 'event');
	var outline = mxUtils.getValue(this.style, 'outline', 'none');
	var symbol = mxUtils.getValue(this.style, 'symbol', 'standard');
	var tmpW = w * 0.5;
	var tmpH = h * 0.5;
	
	if (gwType === 'event' && outline !== null && outline !== 'none')
	{
		mxShapeBpmnEvent.prototype.strictDrawShape.call(this, c, (w - symbolW) * 0.5, (h - symbolH) * 0.5, symbolW, symbolH, outline, symbol);
	}
	else if (gwType == 'exclusive')
	{
		c.translate(w * 0.31, h * 0.25);
		tmpW = tmpW * 0.76;
		var strokeColor = c.state.strokeColor;
		var fillColor = c.state.fillColor;
		c.setFillColor(strokeColor);

		c.begin();
		c.moveTo(tmpW * 0.105, 0);
		c.lineTo(tmpW * 0.5, tmpH * 0.38);
		c.lineTo(tmpW * 0.895, tmpH * 0);
		c.lineTo(tmpW, tmpH * 0.11);
		c.lineTo(tmpW * 0.6172, tmpH * 0.5);
		c.lineTo(tmpW, tmpH * 0.89);
		c.lineTo(tmpW * 0.895, tmpH);
		c.lineTo(tmpW * 0.5, tmpH * 0.62);
		c.lineTo(tmpW * 0.105, tmpH);
		c.lineTo(0, tmpH * 0.89);
		c.lineTo(tmpW * 0.3808, tmpH * 0.5);
		c.lineTo(0, tmpH * 0.11);
		c.close();
		c.fillAndStroke();

		c.setFillColor(fillColor);
		c.translate(-tmpW * 0.12, 0);
	}
	else if (gwType == 'parallel')
	{
		c.translate(w * 0.25, h * 0.25);
		var strokeColor = c.state.strokeColor;
		var fillColor = c.state.fillColor;
		c.setFillColor(strokeColor);

		c.begin();
		c.moveTo(tmpW * 0.38, 0);
		c.lineTo(tmpW * 0.62, 0);
		c.lineTo(tmpW * 0.62, tmpH * 0.38);
		c.lineTo(tmpW, tmpH * 0.38);
		c.lineTo(tmpW, tmpH * 0.62);
		c.lineTo(tmpW * 0.62, tmpH * 0.62);
		c.lineTo(tmpW * 0.62, tmpH);
		c.lineTo(tmpW * 0.38, tmpH);
		c.lineTo(tmpW * 0.38, tmpH * 0.62);
		c.lineTo(0, tmpH * 0.62);
		c.lineTo(0, tmpH * 0.38);
		c.lineTo(tmpW * 0.38, tmpH * 0.38);
		c.close();
		c.fillAndStroke();

		c.setFillColor(fillColor);
	}
	else if (gwType == 'complex')
	{
		c.translate(w * 0.25, h * 0.25);
		var strokeColor = c.state.strokeColor;
		var fillColor = c.state.fillColor;
		c.setFillColor(strokeColor);

		c.begin();
		c.moveTo(0, tmpH * 0.44);
		c.lineTo(tmpW * 0.36, tmpH * 0.44);
		c.lineTo(tmpW * 0.1, tmpH * 0.18);
		c.lineTo(tmpW * 0.18, tmpH * 0.1);
		c.lineTo(tmpW * 0.44, tmpH * 0.36);
		c.lineTo(tmpW * 0.44, 0);
		c.lineTo(tmpW * 0.56, 0);
		c.lineTo(tmpW * 0.56, tmpH * 0.36);
		c.lineTo(tmpW * 0.82, tmpH * 0.1);
		c.lineTo(tmpW * 0.90, tmpH * 0.18);
		c.lineTo(tmpW * 0.64, tmpH * 0.44);
		c.lineTo(tmpW, tmpH * 0.44);
		c.lineTo(tmpW, tmpH * 0.56);
		c.lineTo(tmpW * 0.64, tmpH * 0.56);
		c.lineTo(tmpW * 0.9, tmpH * 0.82);
		c.lineTo(tmpW * 0.82, tmpH * 0.9);
		c.lineTo(tmpW * 0.56, tmpH * 0.64);
		c.lineTo(tmpW * 0.56, tmpH);
		c.lineTo(tmpW * 0.44, tmpH);
		c.lineTo(tmpW * 0.44, tmpH * 0.64);
		c.lineTo(tmpW * 0.18, tmpH * 0.9);
		c.lineTo(tmpW * 0.1, tmpH * 0.82);
		c.lineTo(tmpW * 0.36, tmpH * 0.56);
		c.lineTo(0, tmpH * 0.56);
		c.close();
		c.fillAndStroke();

		c.setFillColor(fillColor);
	}
}

mxCellRenderer.registerShape('mxgraph.bpmn.gateway2', mxShapeBpmnGateway);

//**********************************************************************************************************************************************************
//Task
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeBpmn2Task(bounds, fill, stroke, strokewidth)
{
	mxCellRenderer.prototype.getShape('mxgraph.basic.rect').call(this);
	this.bounds = bounds;
	this.fill = fill;
	this.stroke = stroke;
	this.strokewidth = (strokewidth != null) ? strokewidth : 1;
	this.dy = 0.5;
	this.dx = 0.5;
	this.notch = 0;
};

/**
* Extends mxShape.
*/
mxUtils.extend(mxShapeBpmn2Task, mxCellRenderer.prototype.getShape('mxgraph.basic.rect'));

mxShapeBpmn2Task.prototype.customProperties = [
	{name: 'bpmnShapeType', dispName: 'Type', defVal: 'task', type: 'enum', 
		enumList: [{val: 'task', dispName: 'Task'}, 
				   {val: 'transaction', dispName: 'Transaction'}, 
				   {val: 'call', dispName: 'Call'}, 
				   {val: 'subprocess', dispName: 'Sub-Process'}]}, 
	{name: 'taskMarker', dispName: 'Task Marker', defVal: 'abstract', type: 'enum', 
		enumList: [{val: 'abstract', dispName: 'Abstract'}, 
				   {val: 'service', dispName: 'Service'}, 
				   {val: 'send', dispName: 'Send'}, 
				   {val: 'receive', dispName: 'Receive'}, 
				   {val: 'user', dispName: 'User'},
				   
				   {val: 'nime', dispName: 'Non-Interrupting Message Event'}, 
				   
				   {val: 'manual', dispName: 'Manual'}, 
				   {val: 'businessRule', dispName: 'Business Rule'}, 
				   {val: 'script', dispName: 'Script'}]}, 
	{name: 'isLoopSub', dispName: 'Subprocess', type: 'bool'}, 
	{name: 'isLoopStandard', dispName: 'Standard Loop', type: 'bool'}, 
	{name: 'isLoopMultiParallel', dispName: 'Multi-Instance Parallel Loop', type: 'bool'}, 
	{name: 'isLoopMultiSeq', dispName: 'Multi-Instance Sequential Loop', type: 'bool'}, 
	{name: 'isLoopComp', dispName: 'Compensation Loop', type: 'bool'},
	{name: 'isAdHoc', dispName: 'Ad Hoc', type: 'bool'}
];

mxShapeBpmn2Task.prototype.customProperties = mxShapeBpmn2Task.prototype.customProperties.concat(mxShapeBpmnEvent.prototype.customProperties);
mxShapeBpmn2Task.prototype.customProperties = mxShapeBpmn2Task.prototype.customProperties.concat(mxCellRenderer.prototype.getShape('mxgraph.basic.rect').prototype.customProperties);

mxShapeBpmn2Task.prototype.eventTypeEnum = mxShapeBpmnEvent.prototype.eventTypeEnum; 
mxShapeBpmn2Task.prototype.eventEnum = mxShapeBpmnEvent.prototype.eventEnum; 
mxShapeBpmn2Task.prototype.miscEnum = mxShapeBpmnEvent.prototype.miscEnum;

mxShapeBpmn2Task.prototype.cst = {
		TASK : 'mxgraph.bpmn.task'
};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeBpmn2Task.prototype.paintVertexShape = function(c, x, y, w, h)
{
	var bpmnShapeType = mxUtils.getValue(this.style, 'bpmnShapeType', 'task');
	var taskMarker = mxUtils.getValue(this.style, 'taskMarker', 'abstract');
	var strokeWidth = mxUtils.getValue(this.style, 'strokeWidth', 1);
	var dashed = mxUtils.getValue(this.style, 'dashed', false);
	var inset = mxUtils.getValue(this.style, 'indent', 3);
	var offsetY = 14;
	var rectOutline = mxUtils.getValue(this.style, 'rectOutline', 'single');
	
	c.translate(x, y);

	var superShape = mxCellRenderer.prototype.getShape('mxgraph.basic.rect');
	
	var overrideStyles = {};
	
	if (bpmnShapeType == 'transaction')
	{
		offsetY += inset;
		overrideStyles.rectOutline = 'double';
		overrideStyles.indent = 3;
	}
	else if (bpmnShapeType == 'subprocess')
	{
		overrideStyles.dashed = true;
	}
	else if (bpmnShapeType == 'call')
	{
		overrideStyles.strokeWidth = 4;
	}
	
	superShape.prototype.strictDrawShape.call(this, c, 0, 0, w, h, overrideStyles);

	c.setStrokeWidth(strokeWidth);
	c.setDashed(dashed);
	
	if (bpmnShapeType == 'call')
	{
		c.setStrokeWidth(strokeWidth);
	}

	c.setDashed(false);
	c.setShadow(false);

	var isLoopSub = mxUtils.getValue(this.style, 'isLoopSub', false);
	var isLoopStandard = mxUtils.getValue(this.style, 'isLoopStandard', false);
	var isLoopMultiParallel = mxUtils.getValue(this.style, 'isLoopMultiParallel', false);
	var isLoopMultiSeq = mxUtils.getValue(this.style, 'isLoopMultiSeq', false);
	var isLoopComp = mxUtils.getValue(this.style, 'isLoopComp', false);
	var isAdHoc = mxUtils.getValue(this.style, 'isAdHoc', false);

	var loopnum = 0;
	
	if (isLoopStandard) loopnum++;
	if (isLoopMultiParallel) loopnum++;
	if (isLoopMultiSeq) loopnum++;
	if (isLoopComp) loopnum++;
	if (isLoopSub) loopnum++;
	if (isAdHoc) loopnum++;
	
	var iconSpaceX = 14;
	var currXOffset = - iconSpaceX * loopnum * 0.5;
	
	if (isLoopStandard)
	{
		var stencil = mxStencilRegistry.getStencil('mxgraph.bpmn.loop');
		
		if (stencil != null)
		{
			stencil.drawShape(c, this, w * 0.5 + currXOffset + 1, h - offsetY + 1, 12, 12);
			currXOffset += iconSpaceX;
		}
	}
	
	if (isLoopMultiParallel)
	{
		c.translate(w * 0.5 + currXOffset + 1, h - offsetY + 1);
		
		c.begin();
		c.moveTo(2.4, 0);
		c.lineTo(2.4, 12);
		c.moveTo(6, 0);
		c.lineTo(6, 12);
		c.moveTo(9.6, 0);
		c.lineTo(9.6, 12);
		c.stroke();
		
		c.translate(- w * 0.5 - currXOffset - 1, offsetY - 1 - h);
		currXOffset += iconSpaceX;
	}
	
	if (isLoopMultiSeq)
	{
		c.translate(w * 0.5 + currXOffset + 1, h - offsetY + 1);
		
		c.begin();
		c.moveTo(0, 2.4);
		c.lineTo(12, 2.4);
		c.moveTo(0, 6);
		c.lineTo(12, 6);
		c.moveTo(0, 9.6);
		c.lineTo(12, 9.6);
		c.stroke();
		
		c.translate(- w * 0.5 - currXOffset - 1, offsetY - 1 - h);
		currXOffset += iconSpaceX;
	}
	
	if (isLoopComp)
	{
		var stencil = mxStencilRegistry.getStencil('mxgraph.bpmn.compensation');
		
		if (stencil != null)
		{
			stencil.drawShape(c, this, w * 0.5 + currXOffset, h - offsetY + 1, 14, 12);
			currXOffset += iconSpaceX;
		}
	}
	
	if (isLoopSub)
	{
		c.translate(w * 0.5 + currXOffset, h - offsetY);
		
		c.rect(0, 0, 14, 14);
		c.stroke();
		
		c.begin();
		c.moveTo(4, 7);
		c.lineTo(10, 7);
		c.moveTo(7, 4);
		c.lineTo(7, 10);
		c.stroke();
		
		c.translate(- w * 0.5 - currXOffset, offsetY - h);
		currXOffset += iconSpaceX;
	}
	
	if (isAdHoc)
	{
		var stencil = mxStencilRegistry.getStencil('mxgraph.bpmn.ad_hoc');
		
		if (stencil != null)
		{
			var strokeColor = mxUtils.getValue(this.style, 'strokeColor', '#000000');
			var fillColor = mxUtils.getValue(this.style, 'fillColor', '#ffffff');
			
			c.setStrokeColor('none');
			c.setFillColor(strokeColor);
			
			stencil.drawShape(c, this, w * 0.5 + currXOffset + 1, h - offsetY + 4, 12, 6);
			currXOffset += iconSpaceX;
			
			c.setStrokeColor(strokeColor);
			c.setFillColor(fillColor);
		}
	}
	
	switch (taskMarker) {
		case 'abstract':
			break;
		case 'service':
		
			c.setFillColor(mxUtils.getValue(this.style, 'fillColor', '#ffffff'));
			
			var stencil = mxStencilRegistry.getStencil('mxgraph.bpmn.service_task');
			
			if (stencil != null)
			{
				stencil.drawShape(c, this, 2, 2, 16, 16);
			}
			
			break;
		case 'send':
			var strokeColor = mxUtils.getValue(this.style, 'strokeColor', '#000000');
			var fillColor = mxUtils.getValue(this.style, 'fillColor', '#ffffff');
			
			c.setStrokeColor(fillColor);
			c.setFillColor(strokeColor);
			
			mxShapeBpmn2SendMarker.prototype.paintVertexShape(c, 4, 4, 18, 13);
			
			break;
		case 'receive':
			
			mxShapeBpmn2SendMarker.prototype.paintVertexShape(c, 4, 4, 18, 13);
			
			break;
		case 'user':
			var stencil = mxStencilRegistry.getStencil('mxgraph.bpmn.user_task');
			
			if (stencil != null)
			{
				stencil.drawShape(c, this, 2, 2, 16, 16);
			}
			
			break;
		case 'manual':
			var stencil = mxStencilRegistry.getStencil('mxgraph.bpmn.manual_task');
			
			if (stencil != null)
			{
				stencil.drawShape(c, this, 3, 3, 18, 14);
			}
			
			break;
		case 'businessRule':
			var stencil = mxStencilRegistry.getStencil('mxgraph.bpmn.business_rule_task');
			
			if (stencil != null)
			{
				stencil.drawShape(c, this, 4, 4, 18, 14);
			}
			
			break;
		case 'script':
			var stencil = mxStencilRegistry.getStencil('mxgraph.bpmn.script_task');
			
			if (stencil != null)
			{
				stencil.drawShape(c, this, 3, 3, 19, 18);
			}
			
			break;
	}

	var symbolW = 20;
	var symbolH = 20;
	
	var outline = mxUtils.getValue(this.style, 'outline', 'none');
	var symbol = mxUtils.getValue(this.style, 'symbol', 'standard');
	
	mxShapeBpmnEvent.prototype.strictDrawShape.call(this, c, 0, 0, symbolW, symbolH, outline, symbol);

};

mxCellRenderer.registerShape(mxShapeBpmn2Task.prototype.cst.TASK, mxShapeBpmn2Task);

//**********************************************************************************************************************************************************
//Data
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeBpmn2Data(bounds, fill, stroke, strokewidth)
{
	mxCellRenderer.prototype.getShape('note').call(this);
	this.bounds = bounds;
	this.fill = fill;
	this.stroke = stroke;
	this.strokewidth = (strokewidth != null) ? strokewidth : 1;
	this.dy = 0.5;
	this.dx = 0.5;
	this.notch = 0;
};

/**
* Extends mxShape.
*/
mxUtils.extend(mxShapeBpmn2Data, mxCellRenderer.prototype.getShape('note'));

mxShapeBpmn2Data.prototype.cst = {
		DATA : 'mxgraph.bpmn.data'
};

mxShapeBpmn2Data.prototype.customProperties = [
	{name: 'bpmnTransferType', dispName: 'Transfer Type', defVal: 'none', type: 'enum', 
		enumList: [{val: 'none', dispName: 'None'}, 
				   {val: 'input', dispName: 'Input'}, 
				   {val: 'output', dispName: 'Output'}]}, 
	{name: 'isCollection', dispName: 'Collection', type: 'bool'}
];

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeBpmn2Data.prototype.paintVertexShape = function(c, x, y, w, h)
{
	var superShape = mxCellRenderer.prototype.getShape('note');
	superShape.prototype.paintVertexShape.call(this, c, x, y, w, h);

	var trType = mxUtils.getValue(this.style, 'bpmnTransferType', 'none');
	var isColl = mxUtils.getValue(this.style, 'isCollection', false);
	c.setShadow(false);
	
	if (trType === 'input' || trType === 'output')
	{
		var arrX = 3;
		var arrY = 3;
		var arrW = 14;
		var arrH = 12;
		
		c.translate(arrX, arrY);
		c.begin();
		c.moveTo(0, arrH * 0.3);
		c.lineTo(arrW * 0.55, arrH * 0.3);
		c.lineTo(arrW * 0.55, 0);
		c.lineTo(arrW, arrH * 0.5);
		c.lineTo(arrW * 0.55, arrH);
		c.lineTo(arrW * 0.55, arrH * 0.7);
		c.lineTo(0, arrH * 0.7);
		c.close();
		c.translate(-arrX, -arrY);
		
		if (trType === 'input')
		{
			c.stroke();
		}
		else
		{
			var fillColor = mxUtils.getValue(this.style, 'fillColor', '#ffffff');
			var strokeColor = mxUtils.getValue(this.style, 'strokeColor', '#000000');
			
			c.setFillColor(strokeColor);
			c.fillAndStroke();
			c.setFillColor(fillColor);
		}
	}
	
	if (isColl)
	{
		c.translate(w * 0.5 - 6, h - 12);
		
		c.begin();
		c.moveTo(2.4, 0);
		c.lineTo(2.4, 12);
		c.moveTo(6, 0);
		c.lineTo(6, 12);
		c.moveTo(9.6, 0);
		c.lineTo(9.6, 12);
		c.stroke();
		
		c.translate( - w * 0.5 + 6, - h + 12);
	}
};

mxCellRenderer.registerShape(mxShapeBpmn2Data.prototype.cst.DATA, mxShapeBpmn2Data);

Graph.handleFactory[mxShapeBpmn2Data.prototype.cst.DATA] = Graph.handleFactory['note'];

//**********************************************************************************************************************************************************
//Swimlane
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeBpmn2Swimlane(bounds, fill, stroke, strokewidth)
{
	mxCellRenderer.prototype.getShape('note').call(this);
	this.bounds = bounds;
	this.fill = fill;
	this.stroke = stroke;
	this.strokewidth = (strokewidth != null) ? strokewidth : 1;
	this.dy = 0.5;
	this.dx = 0.5;
	this.notch = 0;
};

/**
* Extends mxShape.
*/
mxUtils.extend(mxShapeBpmn2Swimlane, mxSwimlane);

mxShapeBpmn2Swimlane.prototype.cst = {
		SWIMLANE : 'mxgraph.bpmn.swimlane'
};

mxShapeBpmn2Swimlane.prototype.customProperties = [
	{name: 'isCollection', dispName: 'Collection', type: 'bool'}
];

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeBpmn2Swimlane.prototype.paintVertexShape = function(c, x, y, w, h)
{
	mxSwimlane.prototype.paintVertexShape.call(this, c, x, y, w, h);

	var isColl = mxUtils.getValue(this.style, 'isCollection', false);
	c.setShadow(false);
	
	if (isColl)
	{
		c.translate(w * 0.5 - 6, h - 12);
		
		c.begin();
		c.moveTo(2.4, 0);
		c.lineTo(2.4, 12);
		c.moveTo(6, 0);
		c.lineTo(6, 12);
		c.moveTo(9.6, 0);
		c.lineTo(9.6, 12);
		c.stroke();
		
		c.translate( - w * 0.5 + 6, - h + 12);
	}
};

mxCellRenderer.registerShape(mxShapeBpmn2Swimlane.prototype.cst.SWIMLANE, mxShapeBpmn2Swimlane);

Graph.handleFactory[mxShapeBpmn2Swimlane.prototype.cst.SWIMLANE] = Graph.handleFactory['swimlane'];

//**********************************************************************************************************************************************************
//Conversation
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeBpmn2Conversation(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxShapeBpmn2Conversation, mxHexagon);

mxShapeBpmn2Conversation.prototype.customProperties = [
	{name: 'bpmnConversationType', dispName: 'Type', defVal: 'conv', type: 'enum', 
		enumList: [{val: 'conv', dispName: 'Conversation'}, 
				   {val: 'call', dispName: 'Call'}]}, 
	{name: 'isLoopSub', dispName: 'Subprocess', type: 'bool'} 

];

mxShapeBpmn2Conversation.prototype.cst = {
		CONVERSATION : 'mxgraph.bpmn.conversation'
};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxShapeBpmn2Conversation.prototype.paintVertexShape = function(c, x, y, w, h)
{
	var bpmnConvType = mxUtils.getValue(this.style, 'bpmnConversationType', 'conv');
	var strokeWidth = mxUtils.getValue(this.style, 'strokeWidth', 1);
	
	if (bpmnConvType == 'call')
	{
		c.setStrokeWidth(strokeWidth * 4);
	}

	c.translate(x, y);
	
	c.begin();
	c.moveTo(0, h * 0.5);
	c.lineTo(w * 0.25, 0);
	c.lineTo(w * 0.75, 0);
	c.lineTo(w, h * 0.5);
	c.lineTo(w * 0.75, h);
	c.lineTo(w * 0.25, h);
	c.close();
	c.fillAndStroke();

	if (bpmnConvType == 'call')
	{
		c.setStrokeWidth(strokeWidth);
	}

	var isLoopSub = mxUtils.getValue(this.style, 'isLoopSub', false);

	if (isLoopSub)
	{
		c.translate(w * 0.5 - 7, h - 14);
		
		c.rect(0, 0, 14, 14);
		c.stroke();
		
		c.begin();
		c.moveTo(4, 7);
		c.lineTo(10, 7);
		c.moveTo(7, 4);
		c.lineTo(7, 10);
		c.stroke();
	}
};

mxCellRenderer.registerShape(mxShapeBpmn2Conversation.prototype.cst.CONVERSATION, mxShapeBpmn2Conversation);
