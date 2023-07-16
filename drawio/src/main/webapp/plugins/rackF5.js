/**
 * $Id: mxF5.js,v 1.0 2018/05/03 13:10:37 mate Exp $
 * Copyright (c) 2006-2018, JGraph Ltd
 */
//**********************************************************************************************************************************************************
//Big-IP 1600
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxRackF5BigIp1600(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxRackF5BigIp1600, mxShape);

mxRackF5BigIp1600.prototype.cst = 
{
		SHAPE_BIG_IP_1600 : 'mxgraph.rackF5Shapes.big_ip_1600'
};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxRackF5BigIp1600.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);

	var hasEars = mxUtils.getValue(this.style, 'hasEars', '1');
	var isFront = mxUtils.getValue(this.style, 'isFront', '0');
	var isDC = mxUtils.getValue(this.style, 'isDC', '0');
	var psNum = parseInt(mxUtils.getValue(this.style, 'psNum', '2'));
	var stencilPath = mxUtils.getValue(this.style, 'path', 'img/lib/f5/');

	if (hasEars)
	{
		c.image(0, 0, w * 0.04, h, stencilPath + 'big_ip_5x00_ear.png', 0, 0, 0);
		c.image(w * 0.96, 0, w * 0.04, h, stencilPath + 'big_ip_5x00_ear.png', 0, 1, 0);
	}
	
	if (isFront)
	{
		c.image(w * 0.04, 0, w * 0.92, h, stencilPath + 'big_ip_1600_front.png', 0, 0, 0);
	}
	else
	{
		c.image(w * 0.04, 0, w * 0.92, h, stencilPath + 'big_ip_1600_back.png', 0, 0, 0);
	
		if (isDC)
		{
			if (psNum >= '1')
			{
				c.image(w * 0.425, h * 0.05, w * 0.244, h * 0.92, stencilPath + 'big_ip_4x00_dc.png', 0, 0, 0);
			}
			
			if (psNum >= '2')
			{
				c.image(w * 0.672, h * 0.05, w * 0.245, h * 0.92, stencilPath + 'big_ip_4x00_dc.png', 0, 0, 0);
			}
		}
		else
		{
			if (psNum >= '2')
			{
				c.image(w * 0.672, h * 0.05, w * 0.245, h * 0.92, stencilPath + 'big_ip_4x00_ac.png', 0, 0, 0);
			}
		}
	}
};

mxCellRenderer.registerShape(mxRackF5BigIp1600.prototype.cst.SHAPE_BIG_IP_1600, mxRackF5BigIp1600);

//**********************************************************************************************************************************************************
//Big-IP 2x00
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxRackF5BigIp2x00(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxRackF5BigIp2x00, mxShape);

mxRackF5BigIp2x00.prototype.cst = 
{
		SHAPE_BIG_IP_2x00 : 'mxgraph.rackF5Shapes.big_ip_2x00'
};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxRackF5BigIp2x00.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);

	var hasEars = mxUtils.getValue(this.style, 'hasEars', '1');
	var isFront = mxUtils.getValue(this.style, 'isFront', '0');
	var isDC = mxUtils.getValue(this.style, 'isDC', '0');
	var psNum = parseInt(mxUtils.getValue(this.style, 'psNum', '2'));
	var stencilPath = mxUtils.getValue(this.style, 'path', 'img/lib/f5/');

	if (hasEars)
	{
		c.image(0, 0, w * 0.04, h, stencilPath + 'big_ip_5x00_ear.png', 0, 0, 0);
		c.image(w * 0.96, 0, w * 0.04, h, stencilPath + 'big_ip_5x00_ear.png', 0, 1, 0);
	}
	
	if (isFront)
	{
		c.image(w * 0.04, 0, w * 0.92, h, stencilPath + 'big_ip_2x00_front.png', 0, 0, 0);
	}
	else
	{
		c.image(w * 0.04, 0, w * 0.92, h, stencilPath + 'big_ip_1600_back.png', 0, 0, 0);
	
		if (isDC)
		{
			if (psNum >= '1')
			{
				c.image(w * 0.425, h * 0.05, w * 0.244, h * 0.92, stencilPath + 'big_ip_4x00_dc.png', 0, 0, 0);
			}
			
			if (psNum >= '2')
			{
				c.image(w * 0.672, h * 0.05, w * 0.245, h * 0.92, stencilPath + 'big_ip_4x00_dc.png', 0, 0, 0);
			}
		}
		else
		{
			if (psNum >= '2')
			{
				c.image(w * 0.672, h * 0.05, w * 0.245, h * 0.92, stencilPath + 'big_ip_4x00_ac.png', 0, 0, 0);
			}
		}
	}
};

mxCellRenderer.registerShape(mxRackF5BigIp2x00.prototype.cst.SHAPE_BIG_IP_2x00, mxRackF5BigIp2x00);

//**********************************************************************************************************************************************************
//Big-IP 3600
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxRackF5BigIp3600(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxRackF5BigIp3600, mxShape);

mxRackF5BigIp3600.prototype.cst = 
{
		SHAPE_BIG_IP_3600 : 'mxgraph.rackF5Shapes.big_ip_3600'
};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxRackF5BigIp3600.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);

	var hasEars = mxUtils.getValue(this.style, 'hasEars', '1');
	var isFront = mxUtils.getValue(this.style, 'isFront', '0');
	var isDC = mxUtils.getValue(this.style, 'isDC', '0');
	var psNum = parseInt(mxUtils.getValue(this.style, 'psNum', '2'));
	var stencilPath = mxUtils.getValue(this.style, 'path', 'img/lib/f5/');

	if (hasEars)
	{
		c.image(0, 0, w * 0.04, h, stencilPath + 'big_ip_5x00_ear.png', 0, 0, 0);
		c.image(w * 0.96, 0, w * 0.04, h, stencilPath + 'big_ip_5x00_ear.png', 0, 1, 0);
	}
	
	if (isFront)
	{
		c.image(w * 0.04, 0, w * 0.92, h, stencilPath + 'big_ip_3600_front.png', 0, 0, 0);
	}
	else
	{
		c.image(w * 0.04, 0, w * 0.92, h, stencilPath + 'big_ip_1600_back.png', 0, 0, 0);
	
		if (isDC)
		{
			if (psNum >= '1')
			{
				c.image(w * 0.425, h * 0.05, w * 0.244, h * 0.92, stencilPath + 'big_ip_4x00_dc.png', 0, 0, 0);
			}
			
			if (psNum >= '2')
			{
				c.image(w * 0.672, h * 0.05, w * 0.245, h * 0.92, stencilPath + 'big_ip_4x00_dc.png', 0, 0, 0);
			}
		}
		else
		{
			if (psNum >= '2')
			{
				c.image(w * 0.672, h * 0.05, w * 0.245, h * 0.92, stencilPath + 'big_ip_4x00_ac.png', 0, 0, 0);
			}
		}
	}
};

mxCellRenderer.registerShape(mxRackF5BigIp3600.prototype.cst.SHAPE_BIG_IP_3600, mxRackF5BigIp3600);

//**********************************************************************************************************************************************************
//Big-IP 3900
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxRackF5BigIp3900(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxRackF5BigIp3900, mxShape);

mxRackF5BigIp3900.prototype.cst = 
{
		SHAPE_BIG_IP_3900 : 'mxgraph.rackF5Shapes.big_ip_3900'
};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxRackF5BigIp3900.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);

	var hasEars = mxUtils.getValue(this.style, 'hasEars', '1');
	var isFront = mxUtils.getValue(this.style, 'isFront', '0');
	var isDC = mxUtils.getValue(this.style, 'isDC', '0');
	var psNum = parseInt(mxUtils.getValue(this.style, 'psNum', '2'));
	var stencilPath = mxUtils.getValue(this.style, 'path', 'img/lib/f5/');

	if (hasEars)
	{
		c.image(0, 0, w * 0.04, h, stencilPath + 'big_ip_5x00_ear.png', 0, 0, 0);
		c.image(w * 0.96, 0, w * 0.04, h, stencilPath + 'big_ip_5x00_ear.png', 0, 1, 0);
	}
	
	if (isFront)
	{
		c.image(w * 0.04, 0, w * 0.92, h, stencilPath + 'big_ip_3900_front.png', 0, 0, 0);
	}
	else
	{
		c.image(w * 0.04, 0, w * 0.92, h, stencilPath + 'big_ip_1600_back.png', 0, 0, 0);
	
		if (isDC)
		{
			if (psNum >= '1')
			{
				c.image(w * 0.425, h * 0.05, w * 0.244, h * 0.92, stencilPath + 'big_ip_4x00_dc.png', 0, 0, 0);
			}
			
			if (psNum >= '2')
			{
				c.image(w * 0.672, h * 0.05, w * 0.245, h * 0.92, stencilPath + 'big_ip_4x00_dc.png', 0, 0, 0);
			}
		}
		else
		{
			if (psNum >= '2')
			{
				c.image(w * 0.672, h * 0.05, w * 0.245, h * 0.92, stencilPath + 'big_ip_4x00_ac.png', 0, 0, 0);
			}
		}
	}
};

mxCellRenderer.registerShape(mxRackF5BigIp3900.prototype.cst.SHAPE_BIG_IP_3900, mxRackF5BigIp3900);

//**********************************************************************************************************************************************************
//Big-IP 4x00
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxRackF5BigIp4x00(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxRackF5BigIp4x00, mxShape);

mxRackF5BigIp4x00.prototype.cst = 
{
		SHAPE_BIG_IP_4x00 : 'mxgraph.rackF5Shapes.big_ip_4x00'
};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxRackF5BigIp4x00.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);

	var hasEars = mxUtils.getValue(this.style, 'hasEars', '1');
	var isFront = mxUtils.getValue(this.style, 'isFront', '0');
	var isDC = mxUtils.getValue(this.style, 'isDC', '0');
	var psNum = parseInt(mxUtils.getValue(this.style, 'psNum', '2'));
	var stencilPath = mxUtils.getValue(this.style, 'path', 'img/lib/f5/');

	if (hasEars)
	{
		c.image(0, 0, w * 0.04, h, stencilPath + 'big_ip_5x00_ear.png', 0, 0, 0);
		c.image(w * 0.96, 0, w * 0.04, h, stencilPath + 'big_ip_5x00_ear.png', 0, 1, 0);
	}
	
	if (isFront)
	{
		c.image(w * 0.04, 0, w * 0.92, h, stencilPath + 'big_ip_4x00_front.png', 0, 0, 0);
	}
	else
	{
		c.image(w * 0.04, 0, w * 0.92, h, stencilPath + 'big_ip_1600_back.png', 0, 0, 0);
	
		if (isDC)
		{
			if (psNum >= '1')
			{
				c.image(w * 0.425, h * 0.05, w * 0.244, h * 0.92, stencilPath + 'big_ip_4x00_dc.png', 0, 0, 0);
			}
			
			if (psNum >= '2')
			{
				c.image(w * 0.672, h * 0.05, w * 0.245, h * 0.92, stencilPath + 'big_ip_4x00_dc.png', 0, 0, 0);
			}
		}
		else
		{
			if (psNum >= '2')
			{
				c.image(w * 0.672, h * 0.05, w * 0.245, h * 0.92, stencilPath + 'big_ip_4x00_ac.png', 0, 0, 0);
			}
		}
	}
};

mxCellRenderer.registerShape(mxRackF5BigIp4x00.prototype.cst.SHAPE_BIG_IP_4x00, mxRackF5BigIp4x00);

//**********************************************************************************************************************************************************
//Big-IP 5x00
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxRackF5BigIp5x00(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxRackF5BigIp5x00, mxShape);

mxRackF5BigIp5x00.prototype.cst = 
{
		SHAPE_BIG_IP_5x00 : 'mxgraph.rackF5Shapes.big_ip_5x00'
};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxRackF5BigIp5x00.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);

	var hasEars = mxUtils.getValue(this.style, 'hasEars', '1');
	var isFront = mxUtils.getValue(this.style, 'isFront', '0');
	var isDC = mxUtils.getValue(this.style, 'isDC', '0');
	var psNum = parseInt(mxUtils.getValue(this.style, 'psNum', '2'));
	var stencilPath = mxUtils.getValue(this.style, 'path', 'img/lib/f5/');

	if (hasEars)
	{
		c.image(0, 0, w * 0.04, h, stencilPath + 'big_ip_5x00_ear.png', 0, 0, 0);
		c.image(w * 0.96, 0, w * 0.04, h, stencilPath + 'big_ip_5x00_ear.png', 0, 1, 0);
	}
	
	if (isFront)
	{
		c.image(w * 0.04, 0, w * 0.92, h, stencilPath + 'big_ip_5x00_front.png', 0, 0, 0);
	}
	else
	{
		c.image(w * 0.04, 0, w * 0.92, h, stencilPath + 'big_ip_1600_back.png', 0, 0, 0);
	
		if (isDC)
		{
			if (psNum >= '1')
			{
				c.image(w * 0.425, h * 0.05, w * 0.244, h * 0.92, stencilPath + 'big_ip_4x00_dc.png', 0, 0, 0);
			}
			
			if (psNum >= '2')
			{
				c.image(w * 0.672, h * 0.05, w * 0.245, h * 0.92, stencilPath + 'big_ip_4x00_dc.png', 0, 0, 0);
			}
		}
		else
		{
			if (psNum >= '2')
			{
				c.image(w * 0.672, h * 0.05, w * 0.245, h * 0.92, stencilPath + 'big_ip_4x00_ac.png', 0, 0, 0);
			}
		}
	}
};

mxCellRenderer.registerShape(mxRackF5BigIp5x00.prototype.cst.SHAPE_BIG_IP_5x00, mxRackF5BigIp5x00);

//**********************************************************************************************************************************************************
//EM 4000
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxRackF5Em4000(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxRackF5Em4000, mxShape);

mxRackF5Em4000.prototype.cst = 
{
		SHAPE_EM_4000 : 'mxgraph.rackF5Shapes.em4000'
};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxRackF5Em4000.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);

	var hasEars = mxUtils.getValue(this.style, 'hasEars', '1');
	var isFront = mxUtils.getValue(this.style, 'isFront', '0');
	var isDC = mxUtils.getValue(this.style, 'isDC', '0');
	var psNum = parseInt(mxUtils.getValue(this.style, 'psNum', '2'));
	var stencilPath = mxUtils.getValue(this.style, 'path', 'img/lib/f5/');

	if (hasEars)
	{
		c.image(0, 0, w * 0.04, h, stencilPath + 'big_ip_5x00_ear.png', 0, 0, 0);
		c.image(w * 0.96, 0, w * 0.04, h, stencilPath + 'big_ip_5x00_ear.png', 0, 1, 0);
	}
	
	if (isFront)
	{
		c.image(w * 0.04, 0, w * 0.92, h, stencilPath + 'em_4000_front.png', 0, 0, 0);
	}
	else
	{
		c.image(w * 0.04, 0, w * 0.92, h, stencilPath + 'big_ip_1600_back.png', 0, 0, 0);
	
		if (isDC)
		{
			if (psNum >= '1')
			{
				c.image(w * 0.425, h * 0.05, w * 0.244, h * 0.92, stencilPath + 'big_ip_4x00_dc.png', 0, 0, 0);
			}
			
			if (psNum >= '2')
			{
				c.image(w * 0.672, h * 0.05, w * 0.245, h * 0.92, stencilPath + 'big_ip_4x00_dc.png', 0, 0, 0);
			}
		}
		else
		{
			if (psNum >= '2')
			{
				c.image(w * 0.672, h * 0.05, w * 0.245, h * 0.92, stencilPath + 'big_ip_4x00_ac.png', 0, 0, 0);
			}
		}
	}
};

mxCellRenderer.registerShape(mxRackF5Em4000.prototype.cst.SHAPE_EM_4000, mxRackF5Em4000);

//**********************************************************************************************************************************************************
//Big-IP 6900
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxRackF5BigIp6900(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxRackF5BigIp6900, mxShape);

mxRackF5BigIp6900.prototype.cst = 
{
		SHAPE_BIG_IP_6900 : 'mxgraph.rackF5Shapes.big_ip_6900'
};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxRackF5BigIp6900.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);

	var hasEars = mxUtils.getValue(this.style, 'hasEars', '1');
	var isFront = mxUtils.getValue(this.style, 'isFront', '0');
	var isDC = mxUtils.getValue(this.style, 'isDC', '0');
	var psNum = parseInt(mxUtils.getValue(this.style, 'psNum', '2'));
	var stencilPath = mxUtils.getValue(this.style, 'path', 'img/lib/f5/');

	if (hasEars)
	{
		c.image(0, 0, w * 0.04, h, stencilPath + 'big_ip_6900_ear.png', 0, 0, 0);
		c.image(w * 0.96, 0, w * 0.04, h, stencilPath + 'big_ip_6900_ear.png', 0, 1, 0);
	}
	
	if (isFront)
	{
		c.image(w * 0.04, 0, w * 0.92, h, stencilPath + 'big_ip_6900_front.png', 0, 0, 0);
	}
	else
	{
		c.image(w * 0.04, 0, w * 0.92, h, stencilPath + 'big_ip_6900_back.png', 0, 0, 0);
	
		if (isDC)
		{
			c.image(w * 0.046, h * 0.025, w * 0.176, h * 0.48, stencilPath + 'big_ip_6900_dc.png', 0, 0, 0);
			c.image(w * 0.227, h * 0.025, w * 0.176, h * 0.48, stencilPath + 'big_ip_6900_dc.png', 0, 0, 0);
		}
	}
};

mxCellRenderer.registerShape(mxRackF5BigIp6900.prototype.cst.SHAPE_BIG_IP_6900, mxRackF5BigIp6900);

//**********************************************************************************************************************************************************
//Big-IP 89x0
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxRackF5BigIp89x0(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxRackF5BigIp89x0, mxShape);

mxRackF5BigIp89x0.prototype.cst = 
{
		SHAPE_BIG_IP_89x0 : 'mxgraph.rackF5Shapes.big_ip_89x0'
};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxRackF5BigIp89x0.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);

	var hasEars = mxUtils.getValue(this.style, 'hasEars', '1');
	var isFront = mxUtils.getValue(this.style, 'isFront', '0');
	var isDC = mxUtils.getValue(this.style, 'isDC', '0');
	var psNum = parseInt(mxUtils.getValue(this.style, 'psNum', '2'));
	var stencilPath = mxUtils.getValue(this.style, 'path', 'img/lib/f5/');

	if (hasEars)
	{
		c.image(0, 0, w * 0.04, h, stencilPath + 'big_ip_6900_ear.png', 0, 0, 0);
		c.image(w * 0.96, 0, w * 0.04, h, stencilPath + 'big_ip_6900_ear.png', 0, 1, 0);
	}
	
	if (isFront)
	{
		c.image(w * 0.04, 0, w * 0.92, h, stencilPath + 'big_ip_89x0_front.png', 0, 0, 0);
	}
	else
	{
		c.image(w * 0.04, 0, w * 0.92, h, stencilPath + 'big_ip_6900_back.png', 0, 0, 0);
	
		if (isDC)
		{
			c.image(w * 0.046, h * 0.025, w * 0.176, h * 0.48, stencilPath + 'big_ip_6900_dc.png', 0, 0, 0);
			c.image(w * 0.227, h * 0.025, w * 0.176, h * 0.48, stencilPath + 'big_ip_6900_dc.png', 0, 0, 0);
		}
	}
};

mxCellRenderer.registerShape(mxRackF5BigIp89x0.prototype.cst.SHAPE_BIG_IP_89x0, mxRackF5BigIp89x0);

//**********************************************************************************************************************************************************
//Big-IP 7x00
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxRackF5BigIp7x00(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxRackF5BigIp7x00, mxShape);

mxRackF5BigIp7x00.prototype.cst = 
{
		SHAPE_BIG_IP_7x00 : 'mxgraph.rackF5Shapes.big_ip_7x00'
};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxRackF5BigIp7x00.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);

	var hasEars = mxUtils.getValue(this.style, 'hasEars', '1');
	var isFront = mxUtils.getValue(this.style, 'isFront', '0');
	var isDC = mxUtils.getValue(this.style, 'isDC', '0');
	var psNum = parseInt(mxUtils.getValue(this.style, 'psNum', '2'));
	var stencilPath = mxUtils.getValue(this.style, 'path', 'img/lib/f5/');

	if (hasEars)
	{
		c.image(0, 0, w * 0.04, h, stencilPath + 'big_ip_6900_ear.png', 0, 0, 0);
		c.image(w * 0.96, 0, w * 0.04, h, stencilPath + 'big_ip_6900_ear.png', 0, 1, 0);
	}
	
	if (isFront)
	{
		c.image(w * 0.04, 0, w * 0.92, h, stencilPath + 'big_ip_7x00_front.png', 0, 0, 0);
	}
	else
	{
		c.image(w * 0.04, 0, w * 0.92, h, stencilPath + 'big_ip_6900_back.png', 0, 0, 0);
	
		if (isDC)
		{
			c.image(w * 0.046, h * 0.025, w * 0.176, h * 0.48, stencilPath + 'big_ip_6900_dc.png', 0, 0, 0);
			c.image(w * 0.227, h * 0.025, w * 0.176, h * 0.48, stencilPath + 'big_ip_6900_dc.png', 0, 0, 0);
		}
	}
};

mxCellRenderer.registerShape(mxRackF5BigIp7x00.prototype.cst.SHAPE_BIG_IP_7x00, mxRackF5BigIp7x00);

//**********************************************************************************************************************************************************
//Big-IP 10x00
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxRackF5BigIp10x00(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxRackF5BigIp10x00, mxShape);

mxRackF5BigIp10x00.prototype.cst = 
{
		SHAPE_BIG_IP_10x00 : 'mxgraph.rackF5Shapes.big_ip_10x00'
};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxRackF5BigIp10x00.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);

	var hasEars = mxUtils.getValue(this.style, 'hasEars', '1');
	var isFront = mxUtils.getValue(this.style, 'isFront', '0');
	var isDC = mxUtils.getValue(this.style, 'isDC', '0');
	var psNum = parseInt(mxUtils.getValue(this.style, 'psNum', '2'));
	var stencilPath = mxUtils.getValue(this.style, 'path', 'img/lib/f5/');

	if (hasEars)
	{
		c.image(0, 0, w * 0.04, h, stencilPath + 'big_ip_6900_ear.png', 0, 0, 0);
		c.image(w * 0.96, 0, w * 0.04, h, stencilPath + 'big_ip_6900_ear.png', 0, 1, 0);
	}
	
	if (isFront)
	{
		c.image(w * 0.04, 0, w * 0.92, h, stencilPath + 'big_ip_10x00_front.png', 0, 0, 0);
	}
	else
	{
		c.image(w * 0.04, 0, w * 0.92, h, stencilPath + 'big_ip_6900_back.png', 0, 0, 0);
	
		if (isDC)
		{
			c.image(w * 0.046, h * 0.025, w * 0.176, h * 0.48, stencilPath + 'big_ip_6900_dc.png', 0, 0, 0);
			c.image(w * 0.227, h * 0.025, w * 0.176, h * 0.48, stencilPath + 'big_ip_6900_dc.png', 0, 0, 0);
		}
	}
};

mxCellRenderer.registerShape(mxRackF5BigIp10x00.prototype.cst.SHAPE_BIG_IP_10x00, mxRackF5BigIp10x00);

//**********************************************************************************************************************************************************
//Big-IP 110x0
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxRackF5BigIp110x0(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxRackF5BigIp110x0, mxShape);

mxRackF5BigIp110x0.prototype.cst = 
{
		SHAPE_BIG_IP_110x0 : 'mxgraph.rackF5Shapes.big_ip_110x0'
};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxRackF5BigIp110x0.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);

	var hasEars = mxUtils.getValue(this.style, 'hasEars', '1');
	var isFront = mxUtils.getValue(this.style, 'isFront', '0');
	var isDC = mxUtils.getValue(this.style, 'isDC', '0');
	var psNum = parseInt(mxUtils.getValue(this.style, 'psNum', '2'));
	var stencilPath = mxUtils.getValue(this.style, 'path', 'img/lib/f5/');

	if (hasEars)
	{
		c.image(0, h * 0.33, w * 0.04, h * 0.67, stencilPath + 'big_ip_6900_ear.png', 0, 0, 0);
		c.image(w * 0.96, h * 0.33, w * 0.04, h * 0.67, stencilPath + 'big_ip_6900_ear.png', 0, 1, 0);
	}
	
	if (isFront)
	{
		c.image(w * 0.04, 0, w * 0.92, h, stencilPath + 'big_ip_110x0_front.png', 0, 0, 0);
	}
	else
	{
		c.image(w * 0.04, 0, w * 0.92, h, stencilPath + 'big_ip_110x0_back.png', 0, 0, 0);
	
		if (isDC)
		{
			c.image(w * 0.085, h * 0.025, w * 0.177, h * 0.31, stencilPath + 'big_ip_6900_dc.png', 0, 0, 0);
			c.image(w * 0.271, h * 0.025, w * 0.179, h * 0.31, stencilPath + 'big_ip_6900_dc.png', 0, 0, 0);
		}
	}
};

mxCellRenderer.registerShape(mxRackF5BigIp110x0.prototype.cst.SHAPE_BIG_IP_110x0, mxRackF5BigIp110x0);

//**********************************************************************************************************************************************************
//Viprion 2400
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxRackF5Viprion2400(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxRackF5Viprion2400, mxShape);

mxRackF5Viprion2400.prototype.cst = 
{
		SHAPE_VIPRION_2400 : 'mxgraph.rackF5Shapes.viprion_2400'
};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxRackF5Viprion2400.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);

	var hasEars = mxUtils.getValue(this.style, 'hasEars', '1');
	var isFront = mxUtils.getValue(this.style, 'isFront', '0');
	var isDC = mxUtils.getValue(this.style, 'isDC', '0');
	var bladeNum = parseInt(mxUtils.getValue(this.style, 'bladeNum', '4'));
	var stencilPath = mxUtils.getValue(this.style, 'path', 'img/lib/f5/');

	if (hasEars)
	{
		c.image(0, 0, w * 0.04, h, stencilPath + 'viprion_2400_ear.png', 0, 0, 0);
		c.image(w * 0.96, 0, w * 0.04, h, stencilPath + 'viprion_2400_ear.png', 0, 1, 0);
	}
	
	if (isFront)
	{
		c.image(w * 0.04, 0, w * 0.92, h, stencilPath + 'viprion_2400_front.png', 0, 0, 0);
		
		if (isDC)
		{
			c.image(w * 0.178, h * 0.025, w * 0.301, h * 0.273, stencilPath + 'viprion_2400_dc.png', 0, 0, 0);
			c.image(w * 0.52, h * 0.025, w * 0.301, h * 0.273, stencilPath + 'viprion_2400_dc.png', 0, 0, 0);
		}

		if (bladeNum >= 1)
		{
			c.image(w * 0.052, h * 0.337, w * 0.45, h * 0.29, stencilPath + 'viprion_2400_blade.png', 0, 0, 0);
		}

		if (bladeNum >= 2)
		{
			c.image(w * 0.495, h * 0.337, w * 0.45, h * 0.29, stencilPath + 'viprion_2400_blade.png', 0, 0, 0);
		}

		if (bladeNum >= 3)
		{
			c.image(w * 0.052, h * 0.655, w * 0.45, h * 0.29, stencilPath + 'viprion_2400_blade.png', 0, 0, 0);
		}

		if (bladeNum >= 4)
		{
			c.image(w * 0.495, h * 0.655, w * 0.45, h * 0.29, stencilPath + 'viprion_2400_blade.png', 0, 0, 0);
		}
	}
	else
	{
		c.image(w * 0.04, 0, w * 0.92, h, stencilPath + 'viprion_2400_back.png', 0, 0, 0);
	}
};

mxCellRenderer.registerShape(mxRackF5Viprion2400.prototype.cst.SHAPE_VIPRION_2400, mxRackF5Viprion2400);

//**********************************************************************************************************************************************************
//Viprion 4400
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxRackF5Viprion4400(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxRackF5Viprion4400, mxShape);

mxRackF5Viprion4400.prototype.cst = 
{
		SHAPE_VIPRION_4400 : 'mxgraph.rackF5Shapes.viprion_4400'
};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxRackF5Viprion4400.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);

	var hasEars = mxUtils.getValue(this.style, 'hasEars', '1');
	var hasMask = mxUtils.getValue(this.style, 'hasMask', '1');
	var isFront = mxUtils.getValue(this.style, 'isFront', '0');
	var bladeType = mxUtils.getValue(this.style, 'bladeType', '0');
	var isDC = mxUtils.getValue(this.style, 'isDC', '0');
	var bladeNum = parseInt(mxUtils.getValue(this.style, 'bladeNum', '0'));
	var stencilPath = mxUtils.getValue(this.style, 'path', 'img/lib/f5/');

	if (hasEars)
	{
		c.image(0, 0, w * 0.04, h, stencilPath + 'viprion_4400_ear.png', 0, 0, 0);
		c.image(w * 0.96, 0, w * 0.04, h, stencilPath + 'viprion_4400_ear.png', 0, 1, 0);
	}
	
	if (isFront)
	{
		c.image(w * 0.04, 0, w * 0.92, h, stencilPath + 'viprion_4400_front_chassis.png', 0, 0, 0);
		
		if (hasMask)
		{
			c.image(w * 0.033, h * 0.005, w * 0.934, h * 0.282, stencilPath + 'viprion_4400_front.png', 0, 0, 0);
		}
		
		var bladeStr = stencilPath + 'viprion_4400_pb100_blade.png';
		
		if (bladeType == 1)
		{
			bladeStr = stencilPath + 'viprion_4400_pb200_blade.png';
		}
		else if (bladeType == 2)
		{
			bladeStr = stencilPath + 'viprion_4400_b4300_blade.png';
		}
		
		
		if (bladeNum >= 1)
		{
			c.image(w * 0.182, h * 0.3, w * 0.74, h * 0.145, bladeStr, 0, 0, 0);
		}

		if (bladeNum >= 2)
		{
			c.image(w * 0.182, h * 0.462, w * 0.74, h * 0.145, bladeStr, 0, 0, 0);
		}

		if (bladeNum >= 3)
		{
			c.image(w * 0.182, h * 0.625, w * 0.74, h * 0.145, bladeStr, 0, 0, 0);
		}

		if (bladeNum >= 4)
		{
			c.image(w * 0.182, h * 0.788, w * 0.74, h * 0.145, bladeStr, 0, 0, 0);
		}
	}
	else
	{
		if (isDC)
		{
			c.image(w * 0.04, 0, w * 0.92, h, stencilPath + 'viprion_4400_back_dc.png', 0, 0, 0);
		}
		else
		{
			c.image(w * 0.04, 0, w * 0.92, h, stencilPath + 'viprion_4400_back_ac.png', 0, 0, 0);
		}
	}
};

mxCellRenderer.registerShape(mxRackF5Viprion4400.prototype.cst.SHAPE_VIPRION_4400, mxRackF5Viprion4400);

//**********************************************************************************************************************************************************
//Viprion 4800
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxRackF5Viprion4800(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxRackF5Viprion4800, mxShape);

mxRackF5Viprion4800.prototype.cst = 
{
		SHAPE_VIPRION_4800 : 'mxgraph.rackF5Shapes.viprion_4800'
};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxRackF5Viprion4800.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);

	var hasEars = mxUtils.getValue(this.style, 'hasEars', '1');
	var isFront = mxUtils.getValue(this.style, 'isFront', '0');
	var bladeNum = parseInt(mxUtils.getValue(this.style, 'bladeNum', '0'));
	var stencilPath = mxUtils.getValue(this.style, 'path', 'img/lib/f5/');

	if (hasEars)
	{
		c.image(0, h * 0.09, w * 0.04, h * 0.8, stencilPath + 'viprion_4800_ear.png', 0, 0, 0);
		c.image(w * 0.96, h * 0.09, w * 0.04, h * 0.8, stencilPath + 'viprion_4800_ear.png', 0, 1, 0);
	}
	
	if (isFront)
	{
		c.image(w * 0.04, 0, w * 0.92, h, stencilPath + 'viprion_4800_front.png', 0, 0, 0);
		
		
		if (bladeNum >= 1)
		{
			c.image(w * 0.075, h * 0.245, w * 0.104, h * 0.516, stencilPath + 'viprion_4800_blade.png', 0, 0, 0);
		}

		if (bladeNum >= 2)
		{
			c.image(w * 0.182, h * 0.245, w * 0.104, h * 0.516, stencilPath + 'viprion_4800_blade.png', 0, 0, 0);
		}

		if (bladeNum >= 3)
		{
			c.image(w * 0.289, h * 0.245, w * 0.104, h * 0.516, stencilPath + 'viprion_4800_blade.png', 0, 0, 0);
		}

		if (bladeNum >= 4)
		{
			c.image(w * 0.396, h * 0.245, w * 0.104, h * 0.516, stencilPath + 'viprion_4800_blade.png', 0, 0, 0);
		}

		if (bladeNum >= 5)
		{
			c.image(w * 0.503, h * 0.245, w * 0.104, h * 0.516, stencilPath + 'viprion_4800_blade.png', 0, 0, 0);
		}

		if (bladeNum >= 6)
		{
			c.image(w * 0.61, h * 0.245, w * 0.104, h * 0.516, stencilPath + 'viprion_4800_blade.png', 0, 0, 0);
		}

		if (bladeNum >= 7)
		{
			c.image(w * 0.717, h * 0.245, w * 0.104, h * 0.516, stencilPath + 'viprion_4800_blade.png', 0, 0, 0);
		}

		if (bladeNum >= 8)
		{
			c.image(w * 0.824, h * 0.245, w * 0.104, h * 0.516, stencilPath + 'viprion_4800_blade.png', 0, 0, 0);
		}
	}
	else
	{
		c.image(w * 0.04, 0, w * 0.92, h, stencilPath + 'viprion_4800_back.png', 0, 0, 0);
	}
};

mxCellRenderer.registerShape(mxRackF5Viprion4800.prototype.cst.SHAPE_VIPRION_4800, mxRackF5Viprion4800);

//**********************************************************************************************************************************************************
//Big-IP i2000
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxRackF5BigIpi2000(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxRackF5BigIpi2000, mxShape);

mxRackF5BigIpi2000.prototype.cst = 
{
		SHAPE_BIG_IP_I2000 : 'mxgraph.rackF5Shapes.big_ip_i2000'
};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxRackF5BigIpi2000.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);

	var hasEars = mxUtils.getValue(this.style, 'hasEars', '1');
	var isFront = mxUtils.getValue(this.style, 'isFront', '0');
	var isDC = mxUtils.getValue(this.style, 'isDC', '0');
	var psNum = parseInt(mxUtils.getValue(this.style, 'psNum', '2'));
	var stencilPath = mxUtils.getValue(this.style, 'path', 'img/lib/f5/');

	if (hasEars)
	{
		c.image(0, 0, w * 0.04, h, stencilPath + 'big_ip_5x00_ear.png', 0, 0, 0);
		c.image(w * 0.96, 0, w * 0.04, h, stencilPath + 'big_ip_5x00_ear.png', 0, 1, 0);
	}
	
	if (isFront)
	{
		c.image(w * 0.04, 0, w * 0.92, h, stencilPath + 'big_ip_i2000_front.png', 0, 0, 0);
	}
	else
	{
		c.image(w * 0.04, 0, w * 0.92, h, stencilPath + 'big_ip_1600_back.png', 0, 0, 0);
	
		if (isDC)
		{
			if (psNum >= '1')
			{
				c.image(w * 0.425, h * 0.05, w * 0.244, h * 0.92, stencilPath + 'big_ip_4x00_dc.png', 0, 0, 0);
			}
			
			if (psNum >= '2')
			{
				c.image(w * 0.672, h * 0.05, w * 0.245, h * 0.92, stencilPath + 'big_ip_4x00_dc.png', 0, 0, 0);
			}
		}
		else
		{
			if (psNum >= '2')
			{
				c.image(w * 0.672, h * 0.05, w * 0.245, h * 0.92, stencilPath + 'big_ip_4x00_ac.png', 0, 0, 0);
			}
		}
	}
};

mxCellRenderer.registerShape(mxRackF5BigIpi2000.prototype.cst.SHAPE_BIG_IP_I2000, mxRackF5BigIpi2000);

//**********************************************************************************************************************************************************
//Big-IP i4000
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxRackF5BigIpi4000(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxRackF5BigIpi4000, mxShape);

mxRackF5BigIpi4000.prototype.cst = 
{
		SHAPE_BIG_IP_I4000 : 'mxgraph.rackF5Shapes.big_ip_i4000'
};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxRackF5BigIpi4000.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);

	var hasEars = mxUtils.getValue(this.style, 'hasEars', '1');
	var isFront = mxUtils.getValue(this.style, 'isFront', '0');
	var isDC = mxUtils.getValue(this.style, 'isDC', '0');
	var psNum = parseInt(mxUtils.getValue(this.style, 'psNum', '2'));
	var stencilPath = mxUtils.getValue(this.style, 'path', 'img/lib/f5/');

	if (hasEars)
	{
		c.image(0, 0, w * 0.04, h, stencilPath + 'big_ip_5x00_ear.png', 0, 0, 0);
		c.image(w * 0.96, 0, w * 0.04, h, stencilPath + 'big_ip_5x00_ear.png', 0, 1, 0);
	}
	
	if (isFront)
	{
		c.image(w * 0.04, 0, w * 0.92, h, stencilPath + 'big_ip_i4000_front.png', 0, 0, 0);
	}
	else
	{
		c.image(w * 0.04, 0, w * 0.92, h, stencilPath + 'big_ip_1600_back.png', 0, 0, 0);
	
		if (isDC)
		{
			if (psNum >= '1')
			{
				c.image(w * 0.425, h * 0.05, w * 0.244, h * 0.92, stencilPath + 'big_ip_4x00_dc.png', 0, 0, 0);
			}
			
			if (psNum >= '2')
			{
				c.image(w * 0.672, h * 0.05, w * 0.245, h * 0.92, stencilPath + 'big_ip_4x00_dc.png', 0, 0, 0);
			}
		}
		else
		{
			if (psNum >= '2')
			{
				c.image(w * 0.672, h * 0.05, w * 0.245, h * 0.92, stencilPath + 'big_ip_4x00_ac.png', 0, 0, 0);
			}
		}
	}
};

mxCellRenderer.registerShape(mxRackF5BigIpi4000.prototype.cst.SHAPE_BIG_IP_I4000, mxRackF5BigIpi4000);

//**********************************************************************************************************************************************************
//Big-IP i5000
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxRackF5BigIpi5000(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxRackF5BigIpi5000, mxShape);

mxRackF5BigIpi5000.prototype.cst = 
{
		SHAPE_BIG_IP_I5000 : 'mxgraph.rackF5Shapes.big_ip_i5000'
};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxRackF5BigIpi5000.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);

	var hasEars = mxUtils.getValue(this.style, 'hasEars', '1');
	var isFront = mxUtils.getValue(this.style, 'isFront', '0');
	var isDC = mxUtils.getValue(this.style, 'isDC', '0');
	var psNum = parseInt(mxUtils.getValue(this.style, 'psNum', '2'));
	var stencilPath = mxUtils.getValue(this.style, 'path', 'img/lib/f5/');

	if (hasEars)
	{
		c.image(0, 0, w * 0.04, h, stencilPath + 'big_ip_5x00_ear.png', 0, 0, 0);
		c.image(w * 0.96, 0, w * 0.04, h, stencilPath + 'big_ip_5x00_ear.png', 0, 1, 0);
	}
	
	if (isFront)
	{
		c.image(w * 0.04, 0, w * 0.92, h, stencilPath + 'big_ip_i5000_front.png', 0, 0, 0);
	}
	else
	{
		c.image(w * 0.04, 0, w * 0.92, h, stencilPath + 'big_ip_1600_back.png', 0, 0, 0);
	
		if (isDC)
		{
			if (psNum >= '1')
			{
				c.image(w * 0.425, h * 0.05, w * 0.244, h * 0.92, stencilPath + 'big_ip_4x00_dc.png', 0, 0, 0);
			}
			
			if (psNum >= '2')
			{
				c.image(w * 0.672, h * 0.05, w * 0.245, h * 0.92, stencilPath + 'big_ip_4x00_dc.png', 0, 0, 0);
			}
		}
		else
		{
			if (psNum >= '2')
			{
				c.image(w * 0.672, h * 0.05, w * 0.245, h * 0.92, stencilPath + 'big_ip_4x00_ac.png', 0, 0, 0);
			}
		}
	}
};

mxCellRenderer.registerShape(mxRackF5BigIpi5000.prototype.cst.SHAPE_BIG_IP_I5000, mxRackF5BigIpi5000);

//**********************************************************************************************************************************************************
//Big-IP i7000
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxRackF5BigIpi7000(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxRackF5BigIpi7000, mxShape);

mxRackF5BigIpi7000.prototype.cst = 
{
		SHAPE_BIG_IP_I7000 : 'mxgraph.rackF5Shapes.big_ip_i7000'
};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxRackF5BigIpi7000.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);

	var hasEars = mxUtils.getValue(this.style, 'hasEars', '1');
	var isFront = mxUtils.getValue(this.style, 'isFront', '0');
	var isDC = mxUtils.getValue(this.style, 'isDC', '0');
	var psNum = parseInt(mxUtils.getValue(this.style, 'psNum', '2'));
	var stencilPath = mxUtils.getValue(this.style, 'path', 'img/lib/f5/');

	if (hasEars)
	{
		c.image(0, 0, w * 0.04, h, stencilPath + 'big_ip_5x00_ear.png', 0, 0, 0);
		c.image(w * 0.96, 0, w * 0.04, h, stencilPath + 'big_ip_5x00_ear.png', 0, 1, 0);
	}
	
	if (isFront)
	{
		c.image(w * 0.04, 0, w * 0.92, h, stencilPath + 'big_ip_i7000_front.png', 0, 0, 0);
	}
	else
	{
		c.image(w * 0.04, 0, w * 0.92, h, stencilPath + 'big_ip_1600_back.png', 0, 0, 0);
	
		if (isDC)
		{
			if (psNum >= '1')
			{
				c.image(w * 0.425, h * 0.05, w * 0.244, h * 0.92, stencilPath + 'big_ip_4x00_dc.png', 0, 0, 0);
			}
			
			if (psNum >= '2')
			{
				c.image(w * 0.672, h * 0.05, w * 0.245, h * 0.92, stencilPath + 'big_ip_4x00_dc.png', 0, 0, 0);
			}
		}
		else
		{
			if (psNum >= '2')
			{
				c.image(w * 0.672, h * 0.05, w * 0.245, h * 0.92, stencilPath + 'big_ip_4x00_ac.png', 0, 0, 0);
			}
		}
	}
};

mxCellRenderer.registerShape(mxRackF5BigIpi7000.prototype.cst.SHAPE_BIG_IP_I7000, mxRackF5BigIpi7000);

//**********************************************************************************************************************************************************
//Big-IP i10000
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxRackF5BigIpi10000(bounds, fill, stroke, strokewidth)
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
mxUtils.extend(mxRackF5BigIpi10000, mxShape);

mxRackF5BigIpi10000.prototype.cst = 
{
		SHAPE_BIG_IP_I10000 : 'mxgraph.rackF5Shapes.big_ip_i10000'
};

/**
* Function: paintVertexShape
* 
* Paints the vertex shape.
*/
mxRackF5BigIpi10000.prototype.paintVertexShape = function(c, x, y, w, h)
{
	c.translate(x, y);

	var hasEars = mxUtils.getValue(this.style, 'hasEars', '1');
	var isFront = mxUtils.getValue(this.style, 'isFront', '0');
	var isDC = mxUtils.getValue(this.style, 'isDC', '0');
	var psNum = parseInt(mxUtils.getValue(this.style, 'psNum', '2'));
	var stencilPath = mxUtils.getValue(this.style, 'path', 'img/lib/f5/');

	if (hasEars)
	{
		c.image(0, 0, w * 0.04, h, stencilPath + 'big_ip_5x00_ear.png', 0, 0, 0);
		c.image(w * 0.96, 0, w * 0.04, h, stencilPath + 'big_ip_5x00_ear.png', 0, 1, 0);
	}
	
	if (isFront)
	{
		c.image(w * 0.04, 0, w * 0.92, h, stencilPath + 'big_ip_i10000_front.png', 0, 0, 0);
	}
	else
	{
		c.image(w * 0.04, 0, w * 0.92, h, stencilPath + 'big_ip_1600_back.png', 0, 0, 0);
	
		if (isDC)
		{
			if (psNum >= '1')
			{
				c.image(w * 0.425, h * 0.05, w * 0.244, h * 0.92, stencilPath + 'big_ip_4x00_dc.png', 0, 0, 0);
			}
			
			if (psNum >= '2')
			{
				c.image(w * 0.672, h * 0.05, w * 0.245, h * 0.92, stencilPath + 'big_ip_4x00_dc.png', 0, 0, 0);
			}
		}
		else
		{
			if (psNum >= '2')
			{
				c.image(w * 0.672, h * 0.05, w * 0.245, h * 0.92, stencilPath + 'big_ip_4x00_ac.png', 0, 0, 0);
			}
		}
	}
};

mxCellRenderer.registerShape(mxRackF5BigIpi10000.prototype.cst.SHAPE_BIG_IP_I10000, mxRackF5BigIpi10000);

/**
 * Order is relevant. Do not move to start of file!
 */
Draw.loadPlugin(function(ui)
{
	var w = 100;
	var h = 100;
	var stencilPath = "path=https://jgraph.github.io/drawio-libs/libs/f5/;";
	var s = stencilPath + 'strokeColor=#666666;html=1;labelPosition=right;align=left;spacingLeft=15;shadow=0;dashed=0;fillColor=#ffffff;outlineConnect=0;shape=mxgraph.rackF5Shapes.';
	
	var gn = 'mxgraph.rackF5Shapes';
	var dt = '';
	
	// Avoids having to bind all functions to "this"
	var sb = ui.sidebar;

	// Default tags
	var dt = 'rack f5 network ';
	
	var fns = [
		sb.createVertexTemplateEntry(stencilPath + 'shape=mxgraph.rackF5Shapes.big_ip_1600;hasEars=0;isFront=1;isDC=0;psNum=1;', 
				168, 16, '', 'Big-IP 1600', null, null, dt + 'big ip 1600'),
		sb.createVertexTemplateEntry(stencilPath + 'shape=mxgraph.rackF5Shapes.big_ip_1600;hasEars=1;isFront=0;isDC=1;psNum=2;', 
				168, 16, '', 'Big-IP 1600', null, null, dt + 'big ip 1600'),
		
		sb.createVertexTemplateEntry(stencilPath + 'shape=mxgraph.rackF5Shapes.big_ip_2x00;hasEars=0;isFront=1;isDC=0;psNum=1;', 
				168, 16, '', 'Big-IP 2x00', null, null, dt + 'big ip 2x00'),
		sb.createVertexTemplateEntry(stencilPath + 'shape=mxgraph.rackF5Shapes.big_ip_2x00;hasEars=1;isFront=0;isDC=1;psNum=2;', 
				168, 16, '', 'Big-IP 2x00', null, null, dt + 'big ip 2x00'),
		
		sb.createVertexTemplateEntry(stencilPath + 'shape=mxgraph.rackF5Shapes.big_ip_3600;hasEars=0;isFront=1;isDC=0;psNum=1;', 
				168, 16, '', 'Big-IP 3600', null, null, dt + 'big ip 3600'),
		sb.createVertexTemplateEntry(stencilPath + 'shape=mxgraph.rackF5Shapes.big_ip_3600;hasEars=1;isFront=0;isDC=1;psNum=2;', 
				168, 16, '', 'Big-IP 3600', null, null, dt + 'big ip 3600'),
		
		sb.createVertexTemplateEntry(stencilPath + 'shape=mxgraph.rackF5Shapes.big_ip_3900;hasEars=0;isFront=1;isDC=0;psNum=1;', 
				168, 16, '', 'Big-IP 3900', null, null, dt + 'big ip 3900'),
		sb.createVertexTemplateEntry(stencilPath + 'shape=mxgraph.rackF5Shapes.big_ip_3900;hasEars=1;isFront=0;isDC=1;psNum=2;', 
				168, 16, '', 'Big-IP 3900', null, null, dt + 'big ip 3900'),
		
		sb.createVertexTemplateEntry(stencilPath + 'shape=mxgraph.rackF5Shapes.big_ip_4x00;hasEars=0;isFront=1;isDC=0;psNum=1;', 
				168, 16, '', 'Big-IP 4x00', null, null, dt + 'big ip 4x00'),
		sb.createVertexTemplateEntry(stencilPath + 'shape=mxgraph.rackF5Shapes.big_ip_4x00;hasEars=1;isFront=0;isDC=1;psNum=2;', 
				168, 16, '', 'Big-IP 4x00', null, null, dt + 'big ip 4x00'),
		
		sb.createVertexTemplateEntry(stencilPath + 'shape=mxgraph.rackF5Shapes.big_ip_5x00;hasEars=0;isFront=1;isDC=0;psNum=1;', 
				168, 16, '', 'Big-IP 5x00', null, null, dt + 'big ip 5x00'),
		sb.createVertexTemplateEntry(stencilPath + 'shape=mxgraph.rackF5Shapes.big_ip_5x00;hasEars=1;isFront=0;isDC=1;psNum=2;', 
				168, 16, '', 'Big-IP 5x00', null, null, dt + 'big ip 5x00'),
		
		sb.createVertexTemplateEntry(stencilPath + 'shape=mxgraph.rackF5Shapes.em4000;hasEars=0;isFront=1;isDC=0;psNum=1;', 
				168, 16, '', 'EM 4000', null, null, dt + 'em 4000'),
		sb.createVertexTemplateEntry(stencilPath + 'shape=mxgraph.rackF5Shapes.em4000;hasEars=1;isFront=0;isDC=1;psNum=2;', 
				168, 16, '', 'EM 4000', null, null, dt + 'em 4000'),
		
		sb.createVertexTemplateEntry(stencilPath + 'shape=mxgraph.rackF5Shapes.big_ip_6900;hasEars=0;isFront=1;isDC=0;', 
				168, 32, '', 'Big-IP 6900', null, null, dt + 'big ip 6900'),
		sb.createVertexTemplateEntry(stencilPath + 'shape=mxgraph.rackF5Shapes.big_ip_6900;hasEars=1;isFront=0;isDC=1;', 
				168, 32, '', 'Big-IP 6900', null, null, dt + 'big ip 6900'),
		
		sb.createVertexTemplateEntry(stencilPath + 'shape=mxgraph.rackF5Shapes.big_ip_89x0;hasEars=0;isFront=1;isDC=0;', 
				168, 32, '', 'Big-IP 89x0', null, null, dt + 'big ip 89x0'),
		sb.createVertexTemplateEntry(stencilPath + 'shape=mxgraph.rackF5Shapes.big_ip_6900;hasEars=1;isFront=0;isDC=1;', 
				168, 32, '', 'Big-IP 89x0', null, null, dt + 'big ip 89x0'),
		
		sb.createVertexTemplateEntry(stencilPath + 'shape=mxgraph.rackF5Shapes.big_ip_7x00;hasEars=0;isFront=1;isDC=0;', 
				168, 32, '', 'Big-IP 7x00', null, null, dt + 'big ip 7x00'),
		sb.createVertexTemplateEntry(stencilPath + 'shape=mxgraph.rackF5Shapes.big_ip_7x00;hasEars=1;isFront=0;isDC=1;', 
				168, 32, '', 'Big-IP 7x00', null, null, dt + 'big ip 7x00'),
		
		sb.createVertexTemplateEntry(stencilPath + 'shape=mxgraph.rackF5Shapes.big_ip_10x00;hasEars=0;isFront=1;isDC=0;', 
				168, 32, '', 'Big-IP 10x00', null, null, dt + 'big ip 10x00'),
		sb.createVertexTemplateEntry(stencilPath + 'shape=mxgraph.rackF5Shapes.big_ip_10x00;hasEars=1;isFront=0;isDC=1;', 
				168, 32, '', 'Big-IP 10x00', null, null, dt + 'big ip 10x00'),
		
		sb.createVertexTemplateEntry(stencilPath + 'shape=mxgraph.rackF5Shapes.big_ip_110x0;hasEars=0;isFront=1;isDC=0;', 
				168, 48, '', 'Big-IP 110x0', null, null, dt + 'big ip 110x0'),
		sb.createVertexTemplateEntry(stencilPath + 'shape=mxgraph.rackF5Shapes.big_ip_110x0;hasEars=1;isFront=0;isDC=1;', 
				168, 48, '', 'Big-IP 110x0', null, null, dt + 'big ip 110x0'),
				
		sb.createVertexTemplateEntry(stencilPath + 'shape=mxgraph.rackF5Shapes.viprion_2400;hasEars=0;isFront=1;isDC=1;bladeNum=4;', 
				168, 64, '', 'VIPRION 2400', null, null, dt + 'viprion 2400'),
		sb.createVertexTemplateEntry(stencilPath + 'shape=mxgraph.rackF5Shapes.viprion_2400;hasEars=1;isFront=0;isDC=0;bladeNum=4;', 
				168, 64, '', 'VIPRION 2400', null, null, dt + 'viprion 2400'),
		
		sb.createVertexTemplateEntry(stencilPath + 'shape=mxgraph.rackF5Shapes.viprion_4400;hasMask=1;bladeType=0;hasEars=0;isFront=1;isDC=1;bladeNum=4;', 
				168, 112, '', 'VIPRION 4400', null, null, dt + 'viprion 4400'),
		sb.createVertexTemplateEntry(stencilPath + 'shape=mxgraph.rackF5Shapes.viprion_4400;hasMask=1;bladeType=0;hasEars=1;isFront=0;isDC=0;bladeNum=4;', 
				168, 112, '', 'VIPRION 4400', null, null, dt + 'viprion 4400'),
		
		sb.createVertexTemplateEntry(stencilPath + 'shape=mxgraph.rackF5Shapes.viprion_4800;hasEars=1;isFront=1;bladeNum=8;', 
				168, 224, '', 'VIPRION 4800', null, null, dt + 'viprion 4800'),
		sb.createVertexTemplateEntry(stencilPath + 'shape=mxgraph.rackF5Shapes.viprion_4800;hasEars=0;isFront=0;bladeNum=8;', 
				168, 224, '', 'VIPRION 4800', null, null, dt + 'viprion 4800'),
				
		sb.createVertexTemplateEntry(stencilPath + 'shape=mxgraph.rackF5Shapes.big_ip_i2000;hasEars=0;isFront=1;isDC=0;psNum=1;', 
				168, 16, '', 'Big-IP i2000', null, null, dt + 'big ip i2000'),
		sb.createVertexTemplateEntry(stencilPath + 'shape=mxgraph.rackF5Shapes.big_ip_i2000;hasEars=1;isFront=0;isDC=1;psNum=2;', 
				168, 16, '', 'Big-IP i2000', null, null, dt + 'big ip i2000'),
		
		sb.createVertexTemplateEntry(stencilPath + 'shape=mxgraph.rackF5Shapes.big_ip_i4000;hasEars=0;isFront=1;isDC=0;psNum=1;', 
				168, 16, '', 'Big-IP i4000', null, null, dt + 'big ip i4000'),
		sb.createVertexTemplateEntry(stencilPath + 'shape=mxgraph.rackF5Shapes.big_ip_i4000;hasEars=1;isFront=0;isDC=1;psNum=2;', 
				168, 16, '', 'Big-IP i4000', null, null, dt + 'big ip i4000'),
		
		sb.createVertexTemplateEntry(stencilPath + 'shape=mxgraph.rackF5Shapes.big_ip_i5000;hasEars=0;isFront=1;isDC=0;psNum=1;', 
				168, 16, '', 'Big-IP i5000', null, null, dt + 'big ip i5000'),
		sb.createVertexTemplateEntry(stencilPath + 'shape=mxgraph.rackF5Shapes.big_ip_i5000;hasEars=1;isFront=0;isDC=1;psNum=2;', 
				168, 16, '', 'Big-IP i5000', null, null, dt + 'big ip i5000'),
		
		sb.createVertexTemplateEntry(stencilPath + 'shape=mxgraph.rackF5Shapes.big_ip_i7000;hasEars=0;isFront=1;isDC=0;psNum=1;', 
				168, 16, '', 'Big-IP i7000', null, null, dt + 'big ip i7000'),
		sb.createVertexTemplateEntry(stencilPath + 'shape=mxgraph.rackF5Shapes.big_ip_i7000;hasEars=1;isFront=0;isDC=1;psNum=2;', 
				168, 16, '', 'Big-IP i7000', null, null, dt + 'big ip i7000'),

		sb.createVertexTemplateEntry(stencilPath + 'shape=mxgraph.rackF5Shapes.big_ip_i10000;hasEars=0;isFront=1;isDC=0;psNum=1;', 
				168, 16, '', 'Big-IP i10000', null, null, dt + 'big ip i10000'),
		sb.createVertexTemplateEntry(stencilPath + 'shape=mxgraph.rackF5Shapes.big_ip_i10000;hasEars=1;isFront=0;isDC=1;psNum=2;', 
				168, 16, '', 'Big-IP i10000', null, null, dt + 'big ip i10000')
	];

	ui.sidebar.addPaletteFunctions('rackF5Shapes', 'Rack / F5 v2', true, fns);

    // Collapses default sidebar entry and inserts this before
    var c = ui.sidebar.container;
    c.firstChild.click();
    c.insertBefore(c.lastChild, c.firstChild);
    c.insertBefore(c.lastChild, c.firstChild);
});
