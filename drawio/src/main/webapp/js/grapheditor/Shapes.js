/**
 * Copyright (c) 2006-2015, JGraph Ltd
 */

/**
 * Registers shapes.
 */
(function()
{
	function TableLineShape(line, stroke, strokewidth)
	{
		mxShape.call(this);
		this.line = line;
		this.stroke = stroke;
		this.strokewidth = (strokewidth != null) ? strokewidth : 1;
		this.updateBoundsFromLine();
	};

	/**
	 * Extends mxShape.
	 */
	mxUtils.extend(TableLineShape, mxShape);

	/**
	 * Function: paintVertexShape
	 * 
	 * Redirects to redrawPath for subclasses to work.
	 */
	TableLineShape.prototype.updateBoundsFromLine = function()
	{
		var box = null;

		if (this.line != null)
		{
			for (var i = 0; i < this.line.length; i++)
			{
				var curr = this.line[i];

				if (curr != null)
				{
					var temp = new mxRectangle(curr.x, curr.y,
						this.strokewidth, this.strokewidth);

					if (box == null)
					{
						box = temp;
					}
					else
					{
						box.add(temp);
					}
				}
			}
		}

		this.bounds = (box != null) ? box : new mxRectangle();
	};

	/**
	 * Function: paintVertexShape
	 * 
	 * Redirects to redrawPath for subclasses to work.
	 */
	TableLineShape.prototype.paintVertexShape = function(c, x, y, w, h)
	{
		this.paintTableLine(c, this.line, 0, 0);
	};

	/**
	 * Function: paintTableLine
	 * 
	 * Redirects to redrawPath for subclasses to work.
	 */
	TableLineShape.prototype.paintTableLine = function(c, line, dx, dy)
	{
		if (line != null)
		{
			var last = null;
			c.begin();

			for (var i = 0; i < line.length; i++)
			{
				var curr = line[i];

				if (curr != null)
				{
					if (last == null)
					{
						c.moveTo(curr.x + dx, curr.y + dy);
					}
					else if (last != null)
					{
						c.lineTo(curr.x + dx, curr.y + dy);
					}
				}

				last = curr;
			}

			c.end();
			c.stroke();
		}
	};

	/**
	 * Function: intersectsRectangle
	 * 
	 * Returns true if the shape intersects the given rectangle.
	 */
	TableLineShape.prototype.intersectsRectangle = function(rect)
	{
		var result = false;

		if (mxShape.prototype.intersectsRectangle.apply(this, arguments))
		{
			if (this.line != null)
			{
				var last = null;
	
				for (var i = 0; i < this.line.length && !result; i++)
				{
					var curr = this.line[i];
	
					if (curr != null && last != null)
					{
						result = mxUtils.rectangleIntersectsSegment(rect, last, curr);
					}
	
					last = curr;
				}
			}
		}

		return result;
	};

	mxCellRenderer.registerShape('tableLine', TableLineShape);

	// LATER: Use this to implement striping
	function paintTableBackground(state, c, x, y, w, h, r)
	{
		if (state != null)
		{
			var graph = state.view.graph;
			var start = graph.getActualStartSize(state.cell, true);
			var rows = graph.model.getChildCells(state.cell, true);
			
			if (rows.length > 0)
			{
				var events = false;
				
				if (this.style != null)
				{
					events = mxUtils.getValue(this.style, mxConstants.STYLE_POINTER_EVENTS, '1') == '1';
				}
				
				if (!events)
				{
					c.pointerEvents = false;
				}
				
				var evenRowColor = mxUtils.getValue(state.style,
					'evenRowColor', mxConstants.NONE);
				var oddRowColor = mxUtils.getValue(state.style,
					'oddRowColor', mxConstants.NONE);
				var evenColColor = mxUtils.getValue(state.style,
					'evenColumnColor', mxConstants.NONE);
				var oddColColor = mxUtils.getValue(state.style,
					'oddColumnColor', mxConstants.NONE);
				var cols = graph.model.getChildCells(rows[0], true);
				
				// Paints column backgrounds
				for (var i = 0; i < cols.length; i++)
				{
					var clr = (mxUtils.mod(i, 2) == 1) ? evenColColor : oddColColor;
					var geo = graph.getCellGeometry(cols[i]);
					
					if (geo != null && clr != mxConstants.NONE)
					{
						c.setFillColor(clr);
						c.begin();
						c.moveTo(x + geo.x, y + start.y);
						
						if (r > 0 && i == cols.length - 1)
						{
							c.lineTo(x + geo.x + geo.width - r, y);
							c.quadTo(x + geo.x + geo.width, y, x + geo.x + geo.width, y + r);
							c.lineTo(x + geo.x + geo.width, y + h - r);
							c.quadTo(x + geo.x + geo.width, y + h, x + geo.x + geo.width - r, y + h);
						}
						else
						{
							c.lineTo(x + geo.x + geo.width, y + start.y);
							c.lineTo(x + geo.x + geo.width, y + h - start.height);
						}
						
						c.lineTo(x + geo.x, y + h);
						c.close();
						c.fill();
					}
				}
				
				// Paints row backgrounds
				for (var i = 0; i < rows.length; i++)
				{
					var clr = (mxUtils.mod(i, 2) == 1) ? evenRowColor : oddRowColor;
					var geo = graph.getCellGeometry(rows[i]);
	
					if (geo != null && clr != mxConstants.NONE)
					{
						var b = (i == rows.length - 1) ? y + h : y + geo.y + geo.height;
						c.setFillColor(clr);
						
						c.begin();
						c.moveTo(x + start.x, y + geo.y);
						c.lineTo(x + w - start.width, y + geo.y);
						
						if (r > 0 && i == rows.length - 1)
						{
							c.lineTo(x + w, b - r);
							c.quadTo(x + w, b, x + w - r, b);
							c.lineTo(x + r, b);
							c.quadTo(x, b, x, b - r);
						}
						else
						{
							c.lineTo(x + w - start.width, b);
							c.lineTo(x + start.x, b);
						}
						
						c.close();
						c.fill();
					}
				}
			}
		}
	};

	// Table Shape
	function TableShape()
	{
		mxSwimlane.call(this);
	};
	
	mxUtils.extend(TableShape, mxSwimlane);

	TableShape.prototype.getLabelBounds = function(rect)
	{
		var start = this.getTitleSize();
		
		if (start == 0)
		{
			return mxShape.prototype.getLabelBounds.apply(this, arguments);
		}
		else
		{
			return mxSwimlane.prototype.getLabelBounds.apply(this, arguments);
		}
	};
	
	TableShape.prototype.paintVertexShape = function(c, x, y, w, h)
	{
		// LATER: Split background to add striping, paint rows and cells
		//paintTableBackground(this.state, c, x, y, w, h);
		var collapsed = (this.state != null) ? this.state.view.graph.
			isCellCollapsed(this.state.cell) : false;
		var horizontal = this.isHorizontal();
		var start = this.getTitleSize();
		
		if (start == 0 || this.outline)
		{
			PartialRectangleShape.prototype.paintVertexShape.apply(this, arguments);
		}
		else
		{
			mxSwimlane.prototype.paintVertexShape.apply(this, arguments);
			c.translate(-x, -y);
		}

		if (!collapsed && !this.outline &&
			((horizontal && start < h) ||
			(!horizontal && start < w)))
		{
			this.paintForeground(c, x, y, w, h);
		}
	};

	TableShape.prototype.paintForeground = function(c, x, y, w, h)
	{
		if (this.state != null)
		{
			var flipH = this.flipH;
			var flipV = this.flipV;
			
			if (this.direction == mxConstants.DIRECTION_NORTH || this.direction == mxConstants.DIRECTION_SOUTH)
			{
				var tmp = flipH;
				flipH = flipV;
				flipV = tmp;
			}
			
			// Negative transform to avoid save/restore
			c.rotate(-this.getShapeRotation(), flipH, flipV, x + w / 2, y + h / 2);
			
			s = this.scale;
			x = this.bounds.x / s;
			y = this.bounds.y / s;
			w = this.bounds.width / s;
			h = this.bounds.height / s;
			this.paintTableForeground(c, x, y, w, h);
		}
	};

	TableShape.prototype.paintTableForeground = function(c, x, y, w, h)
	{
		var lines = this.state.view.graph.getTableLines(this.state.cell,
			mxUtils.getValue(this.state.style, 'rowLines', '1') != '0',
			mxUtils.getValue(this.state.style, 'columnLines', '1') != '0');

		for (var i = 0; i < lines.length; i++)
		{
			TableLineShape.prototype.paintTableLine(c, lines[i], x, y);
		}
	}
	
	TableShape.prototype.configurePointerEvents = function(c)
	{
		var start = this.getTitleSize();

		if (start == 0)
		{
			c.pointerEvents = false;
		}
		else
		{
			mxSwimlane.prototype.configurePointerEvents.apply(this, arguments);
		}
	};

	mxCellRenderer.registerShape('table', TableShape);

	// Table Row Shape
	function TableRowShape()
	{
		TableShape.call(this);
	};
	
	mxUtils.extend(TableRowShape, TableShape);

	TableRowShape.prototype.paintForeground = function()
	{
		// overridden to do nothing
	};
	
	mxCellRenderer.registerShape('tableRow', TableRowShape);

	// Cube Shape, supports size style
	function CubeShape()
	{
		mxCylinder.call(this);
	};

	mxUtils.extend(CubeShape, mxCylinder);

	CubeShape.prototype.size = 20;

	CubeShape.prototype.darkOpacity = 0;

	CubeShape.prototype.darkOpacity2 = 0;
	
	CubeShape.prototype.paintVertexShape = function(c, x, y, w, h)
	{
		var s = Math.max(0, Math.min(w, Math.min(h, parseFloat(mxUtils.getValue(this.style, 'size', this.size)))));
		var op = Math.max(-1, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'darkOpacity', this.darkOpacity))));
		var op2 = Math.max(-1, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'darkOpacity2', this.darkOpacity2))));
		c.translate(x, y);
		
		c.begin();
		c.moveTo(0, 0);
		c.lineTo(w - s, 0);
		c.lineTo(w, s);
		c.lineTo(w, h);
		c.lineTo(s, h);
		c.lineTo(0, h - s);
		c.lineTo(0, 0);
		c.close();
		c.end();
		c.fillAndStroke();
		
		if (!this.outline)
		{
			c.setShadow(false);
	
			if (op != 0)
			{
				c.setFillAlpha(Math.abs(op));
				c.setFillColor((op < 0) ? '#FFFFFF' : '#000000');
				c.begin();
				c.moveTo(0, 0);
				c.lineTo(w - s, 0);
				c.lineTo(w, s);
				c.lineTo(s, s);
				c.close();
				c.fill();
			}

			if (op2 != 0)
			{
				c.setFillAlpha(Math.abs(op2));
				c.setFillColor((op2 < 0) ? '#FFFFFF' : '#000000');
				c.begin();
				c.moveTo(0, 0);
				c.lineTo(s, s);
				c.lineTo(s, h);
				c.lineTo(0, h - s);
				c.close();
				c.fill();
			}
			
			c.begin();
			c.moveTo(s, h);
			c.lineTo(s, s);
			c.lineTo(0, 0);
			c.moveTo(s, s);
			c.lineTo(w, s);
			c.end();
			c.stroke();
		}
	};

	CubeShape.prototype.getLabelMargins = function(rect)
	{
		if (mxUtils.getValue(this.style, 'boundedLbl', false))
		{
			var s = parseFloat(mxUtils.getValue(this.style, 'size', this.size)) * this.scale;
			
			return new mxRectangle(s, s, 0, 0);
		}
		
		return null;
	};
	
	mxCellRenderer.registerShape('cube', CubeShape);
	
	var tan30 = Math.tan(mxUtils.toRadians(30));

	var tan30Dx = (0.5 - tan30) / 2;

	mxCellRenderer.registerShape('isoRectangle', IsoRectangleShape);
	
	// Wire Shape
	function WireShape()
	{
		mxConnector.call(this);
	};

	mxUtils.extend(WireShape, mxConnector);

	WireShape.prototype.paintEdgeShape = function(c, pts)
	{
		// The indirection via functions for markers is needed in
		// order to apply the offsets before painting the line and
		// paint the markers after painting the line.
		var sourceMarker = this.createMarker(c, pts, true);
		var targetMarker = this.createMarker(c, pts, false);

		// Paints base line without dash pattern
		c.setDashed(false);
		mxPolyline.prototype.paintEdgeShape.apply(this, arguments);
		
		// Paints dashed line with dash pattern and fill color
		if (this.isDashed != null)
		{
			c.setDashed(this.isDashed, (this.style != null) ?
				mxUtils.getValue(this.style, mxConstants.STYLE_FIX_DASH, false) == 1 : false);
		}

		c.setShadow(false);
		c.setStrokeColor(this.fill);
		mxPolyline.prototype.paintEdgeShape.apply(this, arguments);

		// Paints markers with stroke color
		c.setStrokeColor(this.stroke);
		c.setFillColor(this.stroke);
		c.setDashed(false);
		
		if (sourceMarker != null)
		{
			sourceMarker();
		}
		
		if (targetMarker != null)
		{
			targetMarker();
		}
	};

	mxCellRenderer.registerShape('wire', WireShape);
	
	// Cube Shape, supports size style
	function WaypointShape()
	{
		mxCylinder.call(this);
	};

	mxUtils.extend(WaypointShape, mxCylinder);

	WaypointShape.prototype.size = 6;
	
	WaypointShape.prototype.paintVertexShape = function(c, x, y, w, h)
	{
		c.setFillColor(this.stroke);
		var s = Math.max(0, parseFloat(mxUtils.getValue(this.style, 'size', this.size)) - 2) + 2 * this.strokewidth;
		c.ellipse(x + (w - s) * 0.5, y + (h - s) * 0.5, s, s);
		c.fill();
		
		c.setFillColor(mxConstants.NONE);
		c.rect(x, y, w, h);
		c.fill();
	};

	mxCellRenderer.registerShape('waypoint', WaypointShape);
	
	// Cube Shape, supports size style
	function IsoRectangleShape()
	{
		mxActor.call(this);
	};

	mxUtils.extend(IsoRectangleShape, mxActor);

	IsoRectangleShape.prototype.size = 20;

	IsoRectangleShape.prototype.redrawPath = function(path, x, y, w, h)
	{
		var m = Math.min(w, h / tan30);

		path.translate((w - m) / 2, (h - m) / 2 + m / 4);
		path.moveTo(0, 0.25 * m);
		path.lineTo(0.5 * m, m * tan30Dx);
		path.lineTo(m, 0.25 * m);
		path.lineTo(0.5 * m, (0.5 - tan30Dx) * m);
		path.lineTo(0, 0.25 * m);
		path.close();
		path.end();
	};

	mxCellRenderer.registerShape('isoRectangle', IsoRectangleShape);

	// Cube Shape, supports size style
	function IsoCubeShape()
	{
		mxCylinder.call(this);
	};

	mxUtils.extend(IsoCubeShape, mxCylinder);

	IsoCubeShape.prototype.size = 20;

	IsoCubeShape.prototype.redrawPath = function(path, x, y, w, h, isForeground)
	{
		var m = Math.min(w, h / (0.5 + tan30));

		if (isForeground)
		{
			path.moveTo(0, 0.25 * m);
			path.lineTo(0.5 * m, (0.5 - tan30Dx) * m);
			path.lineTo(m, 0.25 * m);
			path.moveTo(0.5 * m, (0.5 - tan30Dx) * m);
			path.lineTo(0.5 * m, (1 - tan30Dx) * m);
			path.end();
		}
		else
		{
			path.translate((w - m) / 2, (h - m) / 2);
			path.moveTo(0, 0.25 * m);
			path.lineTo(0.5 * m, m * tan30Dx);
			path.lineTo(m, 0.25 * m);
			path.lineTo(m, 0.75 * m);
			path.lineTo(0.5 * m, (1 - tan30Dx) * m);
			path.lineTo(0, 0.75 * m);
			path.close();
			path.end();
		}
	};

	mxCellRenderer.registerShape('isoCube', IsoCubeShape);

	// DataStore Shape, supports size style
	function DataStoreShape()
	{
		mxCylinder.call(this);
	};

	mxUtils.extend(DataStoreShape, mxCylinder);

	DataStoreShape.prototype.redrawPath = function(c, x, y, w, h, isForeground)
	{
		var dy = Math.min(h / 2, Math.round(h / 8) + this.strokewidth - 1);
		
		if ((isForeground && this.fill != null) || (!isForeground && this.fill == null))
		{
			c.moveTo(0, dy);
			c.curveTo(0, 2 * dy, w, 2 * dy, w, dy);
			
			// Needs separate shapes for correct hit-detection
			if (!isForeground)
			{
				c.stroke();
				c.begin();
			}
			
			c.translate(0, dy / 2);
			c.moveTo(0, dy);
			c.curveTo(0, 2 * dy, w, 2 * dy, w, dy);
			
			// Needs separate shapes for correct hit-detection
			if (!isForeground)
			{
				c.stroke();
				c.begin();
			}
			
			c.translate(0, dy / 2);
			c.moveTo(0, dy);
			c.curveTo(0, 2 * dy, w, 2 * dy, w, dy);
			
			// Needs separate shapes for correct hit-detection
			if (!isForeground)
			{
				c.stroke();
				c.begin();
			}
			
			c.translate(0, -dy);
		}
		
		if (!isForeground)
		{
			c.moveTo(0, dy);
			c.curveTo(0, -dy / 3, w, -dy / 3, w, dy);
			c.lineTo(w, h - dy);
			c.curveTo(w, h + dy / 3, 0, h + dy / 3, 0, h - dy);
			c.close();
		}
	};

	DataStoreShape.prototype.getLabelMargins = function(rect)
	{
		return new mxRectangle(0, 2.5 * Math.min(rect.height / 2,
			Math.round(rect.height / 8) + this.strokewidth - 1), 0, 0);
	}

	mxCellRenderer.registerShape('datastore', DataStoreShape);

	// Note Shape, supports size style
	function NoteShape()
	{
		mxCylinder.call(this);
	};

	mxUtils.extend(NoteShape, mxCylinder);

	NoteShape.prototype.size = 30;

	NoteShape.prototype.darkOpacity = 0;
	
	NoteShape.prototype.paintVertexShape = function(c, x, y, w, h)
	{
		var s = Math.max(0, Math.min(w, Math.min(h, parseFloat(mxUtils.getValue(this.style, 'size', this.size)))));
		var op = Math.max(-1, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'darkOpacity', this.darkOpacity))));
		c.translate(x, y);
		
		c.begin();
		c.moveTo(0, 0);
		c.lineTo(w - s, 0);
		c.lineTo(w, s);
		c.lineTo(w, h);
		c.lineTo(0, h);
		c.lineTo(0, 0);
		c.close();
		c.end();
		c.fillAndStroke();
		
		if (!this.outline)
		{
			c.setShadow(false);
	
			if (op != 0)
			{
				c.setFillAlpha(Math.abs(op));
				c.setFillColor((op < 0) ? '#FFFFFF' : '#000000');
				c.begin();
				c.moveTo(w - s, 0);
				c.lineTo(w - s, s);
				c.lineTo(w, s);
				c.close();
				c.fill();
			}
			
			c.begin();
			c.moveTo(w - s, 0);
			c.lineTo(w - s, s);
			c.lineTo(w, s);
			c.end();
			c.stroke();
		}
	};

	mxCellRenderer.registerShape('note', NoteShape);

	// Note Shape, supports size style
	function NoteShape2()
	{
		NoteShape.call(this);
	};
	mxUtils.extend(NoteShape2, NoteShape);
	
	mxCellRenderer.registerShape('note2', NoteShape2);

	NoteShape2.prototype.getLabelMargins = function(rect)
	{
		if (mxUtils.getValue(this.style, 'boundedLbl', false))
		{
			var size = mxUtils.getValue(this.style, 'size', 15);
			
			return new mxRectangle(0, Math.min(rect.height * this.scale, size * this.scale), 0, 0);
		}
		
		return null;
	};

	// Flexible cube Shape
	function IsoCubeShape2()
	{
		mxShape.call(this);
	};

	mxUtils.extend(IsoCubeShape2, mxShape);

	IsoCubeShape2.prototype.isoAngle = 15;
	
	IsoCubeShape2.prototype.paintVertexShape = function(c, x, y, w, h)
	{
		var isoAngle = Math.max(0.01, Math.min(94, parseFloat(mxUtils.getValue(this.style, 'isoAngle', this.isoAngle)))) * Math.PI / 200 ;
		var isoH = Math.min(w * Math.tan(isoAngle), h * 0.5);

		c.translate(x,y);
		
		c.begin();
		c.moveTo(w * 0.5, 0);
		c.lineTo(w, isoH);
		c.lineTo(w, h - isoH);
		c.lineTo(w * 0.5, h);
		c.lineTo(0, h - isoH);
		c.lineTo(0, isoH);
		c.close();
		c.fillAndStroke();
		
		c.setShadow(false);
		
		c.begin();
		c.moveTo(0, isoH);
		c.lineTo(w * 0.5, 2 * isoH);
		c.lineTo(w, isoH);
		c.moveTo(w * 0.5, 2 * isoH);
		c.lineTo(w * 0.5, h);
		c.stroke();
	};
	
	mxCellRenderer.registerShape('isoCube2', IsoCubeShape2);
	
	// (LEGACY) Flexible cylinder Shape
	function CylinderShape()
	{
		mxShape.call(this);
	};
	
	mxUtils.extend(CylinderShape, mxShape);
	
	CylinderShape.prototype.size = 15;
	
	CylinderShape.prototype.paintVertexShape = function(c, x, y, w, h)
	{
		var size = Math.max(0, Math.min(h * 0.5, parseFloat(mxUtils.getValue(this.style, 'size', this.size))));

		c.translate(x,y);

		if (size == 0)
		{
			c.rect(0, 0, w, h);
			c.fillAndStroke();
		}
		else
		{
			c.begin();
			c.moveTo(0, size);
			c.arcTo(w * 0.5, size, 0, 0, 1, w * 0.5, 0);
			c.arcTo(w * 0.5, size, 0, 0, 1, w, size);
			c.lineTo(w, h - size);
			c.arcTo(w * 0.5, size, 0, 0, 1, w * 0.5, h);
			c.arcTo(w * 0.5, size, 0, 0, 1, 0, h - size);
			c.close();
			c.fillAndStroke();
			
			c.setShadow(false);
			
			c.begin();
			c.moveTo(w, size);
			c.arcTo(w * 0.5, size, 0, 0, 1, w * 0.5, 2 * size);
			c.arcTo(w * 0.5, size, 0, 0, 1, 0, size);
			c.stroke();
		}
	};
	
	mxCellRenderer.registerShape('cylinder2', CylinderShape);
	
	// Flexible cylinder3 Shape with offset label
	function CylinderShape3(bounds, fill, stroke, strokewidth)
	{
		mxShape.call(this);
		this.bounds = bounds;
		this.fill = fill;
		this.stroke = stroke;
		this.strokewidth = (strokewidth != null) ? strokewidth : 1;
	};
	
	mxUtils.extend(CylinderShape3, mxCylinder);

	CylinderShape3.prototype.size = 15;
	
	CylinderShape3.prototype.paintVertexShape = function(c, x, y, w, h)
	{
		var size = Math.max(0, Math.min(h * 0.5, parseFloat(mxUtils.getValue(this.style, 'size', this.size))));
		var lid = mxUtils.getValue(this.style, 'lid', true);

		c.translate(x,y);

		if (size == 0)
		{
			c.rect(0, 0, w, h);
			c.fillAndStroke();
		}
		else
		{
			c.begin();
			
			if (lid)
			{
				c.moveTo(0, size);
				c.arcTo(w * 0.5, size, 0, 0, 1, w * 0.5, 0);
				c.arcTo(w * 0.5, size, 0, 0, 1, w, size);
			}
			else
			{
				c.moveTo(0, 0);
				c.arcTo(w * 0.5, size, 0, 0, 0, w * 0.5, size);
				c.arcTo(w * 0.5, size, 0, 0, 0, w, 0);
			}

			c.lineTo(w, h - size);
			c.arcTo(w * 0.5, size, 0, 0, 1, w * 0.5, h);
			c.arcTo(w * 0.5, size, 0, 0, 1, 0, h - size);
			c.close();
			c.fillAndStroke();
			
			c.setShadow(false);
			
			if (lid)
			{
				c.begin();
				c.moveTo(w, size);
				c.arcTo(w * 0.5, size, 0, 0, 1, w * 0.5, 2 * size);
				c.arcTo(w * 0.5, size, 0, 0, 1, 0, size);
				c.stroke();
			}
		}
	};

	mxCellRenderer.registerShape('cylinder3', CylinderShape3);
	
	// Switch Shape, supports size style
	function SwitchShape()
	{
		mxActor.call(this);
	};

	mxUtils.extend(SwitchShape, mxActor);

	SwitchShape.prototype.redrawPath = function(c, x, y, w, h)
	{
		var curve = 0.5;
		c.moveTo(0, 0);
		c.quadTo(w / 2, h * curve,  w, 0);
		c.quadTo(w * (1 - curve), h / 2, w, h);
		c.quadTo(w / 2, h * (1 - curve), 0, h);
		c.quadTo(w * curve, h / 2, 0, 0);
		c.end();
	};

	mxCellRenderer.registerShape('switch', SwitchShape);

	// Folder Shape, supports tabWidth, tabHeight styles
	function FolderShape()
	{
		mxCylinder.call(this);
	};

	mxUtils.extend(FolderShape, mxCylinder);

	FolderShape.prototype.tabWidth = 60;

	FolderShape.prototype.tabHeight = 20;

	FolderShape.prototype.tabPosition = 'right';

	FolderShape.prototype.arcSize = 0.1;
	
	FolderShape.prototype.paintVertexShape = function(c, x, y, w, h)
	{
		c.translate(x, y);
		
		var dx = Math.max(0, Math.min(w, parseFloat(mxUtils.getValue(this.style, 'tabWidth', this.tabWidth))));
		var dy = Math.max(0, Math.min(h, parseFloat(mxUtils.getValue(this.style, 'tabHeight', this.tabHeight))));
		var tp = mxUtils.getValue(this.style, 'tabPosition', this.tabPosition);
		var rounded = mxUtils.getValue(this.style, 'rounded', false);
		var absArcSize = mxUtils.getValue(this.style, 'absoluteArcSize', false);
		var arcSize = parseFloat(mxUtils.getValue(this.style, 'arcSize', this.arcSize));
		
		if (!absArcSize)
		{
			arcSize = Math.min(w, h) * arcSize;
		}
		
		arcSize = Math.min(arcSize, w * 0.5, (h - dy) * 0.5);
		
		dx = Math.max(dx, arcSize);
		dx = Math.min(w - arcSize, dx);
			
		if (!rounded)
		{
			arcSize = 0;
		}
		
		c.begin();
		
		if (tp == 'left')
		{
			c.moveTo(Math.max(arcSize, 0), dy);
			c.lineTo(Math.max(arcSize, 0), 0);
			c.lineTo(dx, 0);
			c.lineTo(dx, dy);
		}
		// Right is default
		else
		{
			c.moveTo(w - dx, dy);
			c.lineTo(w - dx, 0);
			c.lineTo(w - Math.max(arcSize, 0), 0);
			c.lineTo(w - Math.max(arcSize, 0), dy);
		}
		
		if (rounded)
		{
			c.moveTo(0, arcSize + dy);
			c.arcTo(arcSize, arcSize, 0, 0, 1, arcSize, dy);
			c.lineTo(w - arcSize, dy);
			c.arcTo(arcSize, arcSize, 0, 0, 1, w, arcSize + dy);
			c.lineTo(w, h - arcSize);
			c.arcTo(arcSize, arcSize, 0, 0, 1, w - arcSize, h);
			c.lineTo(arcSize, h);
			c.arcTo(arcSize, arcSize, 0, 0, 1, 0, h - arcSize);
		}
		else
		{
			c.moveTo(0, dy);
			c.lineTo(w, dy);
			c.lineTo(w, h);
			c.lineTo(0, h);
		}
		
		c.close();
		c.fillAndStroke();
		
		c.setShadow(false);
	
		var sym = mxUtils.getValue(this.style, 'folderSymbol', null);
		
		if (sym == 'triangle')
		{
			c.begin();
			c.moveTo(w - 30, dy + 20);
			c.lineTo(w - 20, dy + 10);
			c.lineTo(w - 10, dy + 20);
			c.close();
			c.stroke();
		}
	};

	mxCellRenderer.registerShape('folder', FolderShape);

	FolderShape.prototype.getLabelMargins = function(rect)
	{
		if (mxUtils.getValue(this.style, 'boundedLbl', false))
		{
			var sizeY = mxUtils.getValue(this.style, 'tabHeight', 15) * this.scale;

			if (mxUtils.getValue(this.style, 'labelInHeader', false))
			{
				var sizeX = mxUtils.getValue(this.style, 'tabWidth', 15) * this.scale;
				var sizeY = mxUtils.getValue(this.style, 'tabHeight', 15) * this.scale;
				var rounded = mxUtils.getValue(this.style, 'rounded', false);
				var absArcSize = mxUtils.getValue(this.style, 'absoluteArcSize', false);
				var arcSize = parseFloat(mxUtils.getValue(this.style, 'arcSize', this.arcSize));
				
				if (!absArcSize)
				{
					arcSize = Math.min(rect.width, rect.height) * arcSize;
				}
				
				arcSize = Math.min(arcSize, rect.width * 0.5, (rect.height - sizeY) * 0.5);
					
				if (!rounded)
				{
					arcSize = 0;
				}

				if (mxUtils.getValue(this.style, 'tabPosition', this.tabPosition) == 'left')
				{
					return new mxRectangle(arcSize, 0, Math.min(rect.width, rect.width - sizeX), Math.min(rect.height, rect.height - sizeY));
				}
				else
				{
					return new mxRectangle(Math.min(rect.width, rect.width - sizeX), 0, arcSize, Math.min(rect.height, rect.height - sizeY));
				}
			}
			else
			{
				return new mxRectangle(0, Math.min(rect.height, sizeY), 0, 0);
			}
		}
		
		return null;
	};
		
	//**********************************************************************************************************************************************************
	//UML State shape
	//**********************************************************************************************************************************************************
	function UMLStateShape()
	{
		mxCylinder.call(this);
	};

	mxUtils.extend(UMLStateShape, mxCylinder);

	UMLStateShape.prototype.arcSize = 0.1;

	UMLStateShape.prototype.paintVertexShape = function(c, x, y, w, h)
	{
		c.translate(x, y);
		
		var rounded = mxUtils.getValue(this.style, 'rounded', false);
		var absArcSize = mxUtils.getValue(this.style, 'absoluteArcSize', false);
		var arcSize = parseFloat(mxUtils.getValue(this.style, 'arcSize', this.arcSize));
		var connPoint = mxUtils.getValue(this.style, 'umlStateConnection', null);
		
		if (!absArcSize)
		{
			arcSize = Math.min(w, h) * arcSize;
		}
		
		arcSize = Math.min(arcSize, w * 0.5, h * 0.5);
		
		if (!rounded)
		{
			arcSize = 0;
		}
		
		var dx = 0;
		
		if (connPoint != null)
		{
			dx = 10;
		}
		
		c.begin();
		c.moveTo(dx, arcSize);
		c.arcTo(arcSize, arcSize, 0, 0, 1, dx + arcSize, 0);
		c.lineTo(w - arcSize, 0);
		c.arcTo(arcSize, arcSize, 0, 0, 1, w, arcSize);
		c.lineTo(w, h - arcSize);
		c.arcTo(arcSize, arcSize, 0, 0, 1, w - arcSize, h);
		c.lineTo(dx + arcSize, h);
		c.arcTo(arcSize, arcSize, 0, 0, 1, dx, h - arcSize);
		c.close();
		c.fillAndStroke();
		
		c.setShadow(false);

		var sym = mxUtils.getValue(this.style, 'umlStateSymbol', null);
		
		if (sym == 'collapseState')
		{
			c.roundrect(w - 40, h - 20, 10, 10, 3, 3);
			c.stroke();
			c.roundrect(w - 20, h - 20, 10, 10, 3, 3);
			c.stroke();
			c.begin();
			c.moveTo(w - 30, h - 15);
			c.lineTo(w - 20, h - 15);
			c.stroke();
		}

		if (connPoint == 'connPointRefEntry')
		{
			c.ellipse(0, h * 0.5 - 10, 20, 20);
			c.fillAndStroke();
		}
		else if (connPoint == 'connPointRefExit')
		{
			c.ellipse(0, h * 0.5 - 10, 20, 20);
			c.fillAndStroke();
			
			c.begin();
			c.moveTo(5, h * 0.5 - 5);
			c.lineTo(15, h * 0.5 + 5);
			c.moveTo(15, h * 0.5 - 5);
			c.lineTo(5, h * 0.5 + 5);
			c.stroke();
		}
	};

	UMLStateShape.prototype.getLabelMargins = function(rect)
	{
		if (mxUtils.getValue(this.style, 'boundedLbl', false))
		{
			var connPoint = mxUtils.getValue(this.style, 'umlStateConnection', null);
			
			if (connPoint != null)
			{
				return new mxRectangle(10 * this.scale, 0, 0, 0);
			}
		}
		
		return null;
	};

	mxCellRenderer.registerShape('umlState', UMLStateShape);

	// Card shape
	function CardShape()
	{
		mxActor.call(this);
	};

	mxUtils.extend(CardShape, mxActor);

	CardShape.prototype.size = 30;

	CardShape.prototype.isRoundable = function()
	{
		return true;
	};

	CardShape.prototype.redrawPath = function(c, x, y, w, h)
	{
		var s = Math.max(0, Math.min(w, Math.min(h, parseFloat(mxUtils.getValue(this.style, 'size', this.size)))));
		var arcSize = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2;
		this.addPoints(c, [new mxPoint(s, 0), new mxPoint(w, 0), new mxPoint(w, h), new mxPoint(0, h), new mxPoint(0, s)],
				this.isRounded, arcSize, true);
		c.end();
	};

	mxCellRenderer.registerShape('card', CardShape);

	// Tape shape
	function TapeShape()
	{
		mxActor.call(this);
	};

	mxUtils.extend(TapeShape, mxActor);

	TapeShape.prototype.size = 0.4;

	TapeShape.prototype.redrawPath = function(c, x, y, w, h)
	{
		var dy = h * Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'size', this.size))));
		var fy = 1.4;
		
		c.moveTo(0, dy / 2);
		c.quadTo(w / 4, dy * fy, w / 2, dy / 2);
		c.quadTo(w * 3 / 4, dy * (1 - fy), w, dy / 2);
		c.lineTo(w, h - dy / 2);
		c.quadTo(w * 3 / 4, h - dy * fy, w / 2, h - dy / 2);
		c.quadTo(w / 4, h - dy * (1 - fy), 0, h - dy / 2);
		c.lineTo(0, dy / 2);
		c.close();
		c.end();
	};
	
	TapeShape.prototype.getLabelBounds = function(rect)
	{
		if (mxUtils.getValue(this.style, 'boundedLbl', false))
		{
			var size = mxUtils.getValue(this.style, 'size', this.size);			
			var w = rect.width;
			var h = rect.height;
			
			if (this.direction == null ||
					this.direction == mxConstants.DIRECTION_EAST ||
					this.direction == mxConstants.DIRECTION_WEST)
			{
				var dy = h * size;
				
				return new mxRectangle(rect.x, rect.y + dy, w, h - 2 * dy);
			}
			else
			{
				var dx = w * size;
				
				return new mxRectangle(rect.x + dx, rect.y, w - 2 * dx, h);
			}
		}
		
		return rect;
	};
	
	mxCellRenderer.registerShape('tape', TapeShape);

	// Document shape
	function DocumentShape()
	{
		mxActor.call(this);
	};

	mxUtils.extend(DocumentShape, mxActor);

	DocumentShape.prototype.size = 0.3;

	DocumentShape.prototype.getLabelMargins = function(rect)
	{
		if (mxUtils.getValue(this.style, 'boundedLbl', false))
		{
			return new mxRectangle(0, 0, 0, parseFloat(mxUtils.getValue(
				this.style, 'size', this.size)) * rect.height);
		}
		
		return null;
	};

	DocumentShape.prototype.redrawPath = function(c, x, y, w, h)
	{
		var dy = h * Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'size', this.size))));
		var fy = 1.4;
		
		c.moveTo(0, 0);
		c.lineTo(w, 0);
		c.lineTo(w, h - dy / 2);
		c.quadTo(w * 3 / 4, h - dy * fy, w / 2, h - dy / 2);
		c.quadTo(w / 4, h - dy * (1 - fy), 0, h - dy / 2);
		c.lineTo(0, dy / 2);
		c.close();
		c.end();
	};

	mxCellRenderer.registerShape('document', DocumentShape);

	var cylinderGetCylinderSize = mxCylinder.prototype.getCylinderSize;
	
	mxCylinder.prototype.getCylinderSize = function(x, y, w, h)
	{
		var size = mxUtils.getValue(this.style, 'size');
		
		if (size != null)
		{
			return h * Math.max(0, Math.min(1, size));
		}
		else
		{
			return cylinderGetCylinderSize.apply(this, arguments);
		}
	};
	
	mxCylinder.prototype.getLabelMargins = function(rect)
	{
		if (mxUtils.getValue(this.style, 'boundedLbl', false))
		{
			var size = mxUtils.getValue(this.style, 'size', 0.15) * 2;
			
			return new mxRectangle(0, Math.min(this.maxHeight * this.scale, rect.height * size), 0, 0);
		}
		
		return null;
	};

	CylinderShape3.prototype.getLabelMargins = function(rect)
	{
		if (mxUtils.getValue(this.style, 'boundedLbl', false))
		{
			var size = mxUtils.getValue(this.style, 'size', 15);
			
			if (!mxUtils.getValue(this.style, 'lid', true))
			{
				size /= 2;
			}
			
			return new mxRectangle(0, Math.min(rect.height * this.scale, size * 2 * this.scale), 0, Math.max(0, size * 0.3 * this.scale));
		}
		
		return null;
	};

	FolderShape.prototype.getLabelMargins = function(rect)
	{
		if (mxUtils.getValue(this.style, 'boundedLbl', false))
		{
			var sizeY = mxUtils.getValue(this.style, 'tabHeight', 15) * this.scale;

			if (mxUtils.getValue(this.style, 'labelInHeader', false))
			{
				var sizeX = mxUtils.getValue(this.style, 'tabWidth', 15) * this.scale;
				var sizeY = mxUtils.getValue(this.style, 'tabHeight', 15) * this.scale;
				var rounded = mxUtils.getValue(this.style, 'rounded', false);
				var absArcSize = mxUtils.getValue(this.style, 'absoluteArcSize', false);
				var arcSize = parseFloat(mxUtils.getValue(this.style, 'arcSize', this.arcSize));
				
				if (!absArcSize)
				{
					arcSize = Math.min(rect.width, rect.height) * arcSize;
				}
				
				arcSize = Math.min(arcSize, rect.width * 0.5, (rect.height - sizeY) * 0.5);
					
				if (!rounded)
				{
					arcSize = 0;
				}
	
				if (mxUtils.getValue(this.style, 'tabPosition', this.tabPosition) == 'left')
				{
					return new mxRectangle(arcSize, 0, Math.min(rect.width, rect.width - sizeX), Math.min(rect.height, rect.height - sizeY));
				}
				else
				{
					return new mxRectangle(Math.min(rect.width, rect.width - sizeX), 0, arcSize, Math.min(rect.height, rect.height - sizeY));
				}
			}
			else
			{
				return new mxRectangle(0, Math.min(rect.height, sizeY), 0, 0);
			}
		}
		
		return null;
	};

	UMLStateShape.prototype.getLabelMargins = function(rect)
	{
		if (mxUtils.getValue(this.style, 'boundedLbl', false))
		{
			var connPoint = mxUtils.getValue(this.style, 'umlStateConnection', null);
			
			if (connPoint != null)
			{
				return new mxRectangle(10 * this.scale, 0, 0, 0);
			}
		}
		
		return null;
	};

	NoteShape2.prototype.getLabelMargins = function(rect)
	{
		if (mxUtils.getValue(this.style, 'boundedLbl', false))
		{
			var size = mxUtils.getValue(this.style, 'size', 15);
			
			return new mxRectangle(0, Math.min(rect.height * this.scale, size * this.scale), 0, Math.max(0, size * this.scale));
		}
		
		return null;
	};

	// Parallelogram shape
	function ParallelogramShape()
	{
		mxActor.call(this);
	};

	mxUtils.extend(ParallelogramShape, mxActor);

	ParallelogramShape.prototype.size = 0.2;

	ParallelogramShape.prototype.fixedSize = 20;

	ParallelogramShape.prototype.isRoundable = function()
	{
		return true;
	};

	ParallelogramShape.prototype.redrawPath = function(c, x, y, w, h)
	{
		var fixed = mxUtils.getValue(this.style, 'fixedSize', '0') != '0';

		var dx = (fixed) ? Math.max(0, Math.min(w, parseFloat(mxUtils.getValue(this.style, 'size', this.fixedSize)))) : w * Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'size', this.size))));
		var arcSize = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2;
		this.addPoints(c, [new mxPoint(0, h), new mxPoint(dx, 0), new mxPoint(w, 0), new mxPoint(w - dx, h)],
				this.isRounded, arcSize, true);
		c.end();
	};

	mxCellRenderer.registerShape('parallelogram', ParallelogramShape);

	// Trapezoid shape
	function TrapezoidShape()
	{
		mxActor.call(this);
	};

	mxUtils.extend(TrapezoidShape, mxActor);

	TrapezoidShape.prototype.size = 0.2;

	TrapezoidShape.prototype.fixedSize = 20;

	TrapezoidShape.prototype.isRoundable = function()
	{
		return true;
	};

	TrapezoidShape.prototype.redrawPath = function(c, x, y, w, h)
	{
		
		var fixed = mxUtils.getValue(this.style, 'fixedSize', '0') != '0';

		var dx = (fixed) ? Math.max(0, Math.min(w * 0.5, parseFloat(mxUtils.getValue(this.style, 'size', this.fixedSize)))) : w * Math.max(0, Math.min(0.5, parseFloat(mxUtils.getValue(this.style, 'size', this.size))));
		var arcSize = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2;
		this.addPoints(c, [new mxPoint(0, h), new mxPoint(dx, 0), new mxPoint(w - dx, 0), new mxPoint(w, h)],
				this.isRounded, arcSize, true);
	};

	mxCellRenderer.registerShape('trapezoid', TrapezoidShape);

	// Curly Bracket shape
	function CurlyBracketShape()
	{
		mxActor.call(this);
	};

	mxUtils.extend(CurlyBracketShape, mxActor);

	CurlyBracketShape.prototype.size = 0.5;

	CurlyBracketShape.prototype.redrawPath = function(c, x, y, w, h)
	{
		c.setFillColor(null);
		var s = w * Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'size', this.size))));
		var arcSize = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2;
		this.addPoints(c, [new mxPoint(w, 0), new mxPoint(s, 0), new mxPoint(s, h / 2),
		                   new mxPoint(0, h / 2), new mxPoint(s, h / 2), new mxPoint(s, h),
		                   new mxPoint(w, h)], this.isRounded, arcSize, false);
		c.end();
	};

	mxCellRenderer.registerShape('curlyBracket', CurlyBracketShape);

	// Parallel marker shape
	function ParallelMarkerShape()
	{
		mxActor.call(this);
	};
	mxUtils.extend(ParallelMarkerShape, mxActor);
	ParallelMarkerShape.prototype.redrawPath = function(c, x, y, w, h)
	{
		c.setStrokeWidth(1);
		c.setFillColor(this.stroke);
		var w2 = w / 5;
		c.rect(0, 0, w2, h);
		c.fillAndStroke();
		c.rect(2 * w2, 0, w2, h);
		c.fillAndStroke();
		c.rect(4 * w2, 0, w2, h);
		c.fillAndStroke();
	};

	mxCellRenderer.registerShape('parallelMarker', ParallelMarkerShape);

	/**
	 * Adds handJiggle style (jiggle=n sets jiggle)
	 */
	function HandJiggle(canvas, defaultVariation)
	{
		this.canvas = canvas;
		
		// Avoids "spikes" in the output
		this.canvas.setLineJoin('round');
		this.canvas.setLineCap('round');
		
		this.defaultVariation = defaultVariation;
		
		this.originalLineTo = this.canvas.lineTo;
		this.canvas.lineTo = mxUtils.bind(this, HandJiggle.prototype.lineTo);
		
		this.originalMoveTo = this.canvas.moveTo;
		this.canvas.moveTo = mxUtils.bind(this, HandJiggle.prototype.moveTo);
		
		this.originalClose = this.canvas.close;
		this.canvas.close = mxUtils.bind(this, HandJiggle.prototype.close);
		
		this.originalQuadTo = this.canvas.quadTo;
		this.canvas.quadTo = mxUtils.bind(this, HandJiggle.prototype.quadTo);
		
		this.originalCurveTo = this.canvas.curveTo;
		this.canvas.curveTo = mxUtils.bind(this, HandJiggle.prototype.curveTo);
		
		this.originalArcTo = this.canvas.arcTo;
		this.canvas.arcTo = mxUtils.bind(this, HandJiggle.prototype.arcTo);
	};
	
	HandJiggle.prototype.moveTo = function(endX, endY)
	{
		this.originalMoveTo.apply(this.canvas, arguments);
		this.lastX = endX;
		this.lastY = endY;
		this.firstX = endX;
		this.firstY = endY;
	};
	
	HandJiggle.prototype.close = function()
	{
		if (this.firstX != null && this.firstY != null)
		{
			this.lineTo(this.firstX, this.firstY);
			this.originalClose.apply(this.canvas, arguments);
		}
		
		this.originalClose.apply(this.canvas, arguments);
	};
	
	HandJiggle.prototype.quadTo = function(x1, y1, x2, y2)
	{
		this.originalQuadTo.apply(this.canvas, arguments);
		this.lastX = x2;
		this.lastY = y2;
	};
	
	HandJiggle.prototype.curveTo = function(x1, y1, x2, y2, x3, y3)
	{
		this.originalCurveTo.apply(this.canvas, arguments);
		this.lastX = x3;
		this.lastY = y3;
	};
	
	HandJiggle.prototype.arcTo = function(rx, ry, angle, largeArcFlag, sweepFlag, x, y)
	{
		this.originalArcTo.apply(this.canvas, arguments);
		this.lastX = x;
		this.lastY = y;
	};

	HandJiggle.prototype.lineTo = function(endX, endY)
	{
		// LATER: Check why this.canvas.lastX cannot be used
		if (this.lastX != null && this.lastY != null)
		{
			var dx = Math.abs(endX - this.lastX);
			var dy = Math.abs(endY - this.lastY);
			var dist = Math.sqrt(dx * dx + dy * dy);
			
			if (dist < 2)
			{
				this.originalLineTo.apply(this.canvas, arguments);
				this.lastX = endX;
				this.lastY = endY;
				
				return;
			}
	
			var segs = Math.round(dist / 10);
			var variation = this.defaultVariation;
			
			if (segs < 5)
			{
				segs = 5;
				variation /= 3;
			}
			
			function sign(x)
			{
			    return typeof x === 'number' ? x ? x < 0 ? -1 : 1 : x === x ? 0 : NaN : NaN;
			}
	
			var stepX = sign(endX - this.lastX) * dx / segs;
			var stepY = sign(endY - this.lastY) * dy / segs;
	
			var fx = dx / dist;
			var fy = dy / dist;
	
			for (var s = 0; s < segs; s++)
			{
				var x = stepX * s + this.lastX;
				var y = stepY * s + this.lastY;
	
				var offset = (Math.random() - 0.5) * variation;
				this.originalLineTo.call(this.canvas, x - offset * fy, y - offset * fx);
			}
			
			this.originalLineTo.call(this.canvas, endX, endY);
			this.lastX = endX;
			this.lastY = endY;
		}
		else
		{
			this.originalLineTo.apply(this.canvas, arguments);
			this.lastX = endX;
			this.lastY = endY;
		}
	};
	
	HandJiggle.prototype.destroy = function()
	{
		 this.canvas.lineTo = this.originalLineTo;
		 this.canvas.moveTo = this.originalMoveTo;
		 this.canvas.close = this.originalClose;
		 this.canvas.quadTo = this.originalQuadTo;
		 this.canvas.curveTo = this.originalCurveTo;
		 this.canvas.arcTo = this.originalArcTo;
	};
	
	// Installs hand jiggle for comic and sketch style
	var shapeBeforePaint = mxShape.prototype.beforePaint;
	mxShape.prototype.beforePaint = function(c)
	{
		shapeBeforePaint.apply(this, arguments);
		
		if (c.handJiggle == null)
		{
			c.handJiggle = this.createHandJiggle(c);
		}
	};
	
	var shapeAfterPaint = mxShape.prototype.afterPaint;
	mxShape.prototype.afterPaint = function(c)
	{
		shapeAfterPaint.apply(this, arguments);
		
		if (c.handJiggle != null)
		{
			c.handJiggle.destroy();
			delete c.handJiggle;
		}
	};
		
	// Returns a new HandJiggle canvas
	mxShape.prototype.createComicCanvas = function(c)
	{
		return new HandJiggle(c, mxUtils.getValue(this.style, 'jiggle', Editor.sketchDefaultJiggle));
	};
	
	// Overrides to avoid call to rect
	mxShape.prototype.createHandJiggle = function(c)
	{
		if (!this.outline && this.style != null && mxUtils.getValue(this.style, 'comic', '0') != '0')
		{
			return this.createComicCanvas(c);
		}
		
		return null;
	};
	
	// Overrides to avoid call to rect
	var mxRectangleShapeIsHtmlAllowed0 = mxRectangleShape.prototype.isHtmlAllowed;
	mxRectangleShape.prototype.isHtmlAllowed = function()
	{
		return !this.outline && (this.style == null || (mxUtils.getValue(this.style, 'comic', '0') == '0' &&
			mxUtils.getValue(this.style, 'sketch', (urlParams['rough'] == '1') ? '1' : '0') == '0')) &&
			mxRectangleShapeIsHtmlAllowed0.apply(this, arguments);
	};
	
	var mxRectangleShapePaintBackground0 = mxRectangleShape.prototype.paintBackground;
	mxRectangleShape.prototype.paintBackground = function(c, x, y, w, h)
	{
		if (c.handJiggle == null || c.handJiggle.constructor != HandJiggle)
		{
			mxRectangleShapePaintBackground0.apply(this, arguments);
		}
		else
		{
			var events = true;

			if (this.style != null)
			{
				events = mxUtils.getValue(this.style, mxConstants.STYLE_POINTER_EVENTS, '1') == '1';		
			}

			if (events || (this.fill != null && this.fill != mxConstants.NONE) ||
				(this.stroke != null && this.stroke != mxConstants.NONE))
			{
				if (!events && (this.fill == null || this.fill == mxConstants.NONE))
				{
					c.pointerEvents = false;
				}

				c.begin();

				if (this.isRounded)
				{
					var r = 0;

					if (mxUtils.getValue(this.style, mxConstants.STYLE_ABSOLUTE_ARCSIZE, 0) == '1')
					{
						r = Math.min(w / 2, Math.min(h / 2, mxUtils.getValue(this.style,
							mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2));
					}
					else
					{
						var f = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE,
							mxConstants.RECTANGLE_ROUNDING_FACTOR * 100) / 100;
						r = Math.min(w * f, h * f);
					}

					c.moveTo(x + r, y);
					c.lineTo(x + w - r, y);
					c.quadTo(x + w, y, x + w, y + r);
					c.lineTo(x + w, y + h - r);
					c.quadTo(x + w, y + h, x + w - r, y + h);
					c.lineTo(x + r, y + h);
					c.quadTo(x, y + h, x, y + h - r);
					c.lineTo(x, y + r);
					c.quadTo(x, y, x + r, y);
				}
				else
				{
					c.moveTo(x, y);
					c.lineTo(x + w, y);
					c.lineTo(x + w, y + h);
					c.lineTo(x, y + h);
					c.lineTo(x, y);
				}

				// LATER: Check if close is needed here
				c.close();
				c.end();

				c.fillAndStroke();
			}			
		}
	};
	// End of hand jiggle integration
	
	// Process Shape
	function ProcessShape()
	{
		mxRectangleShape.call(this);
	};

	mxUtils.extend(ProcessShape, mxRectangleShape);

	ProcessShape.prototype.size = 0.1;

	ProcessShape.prototype.fixedSize = false;
	
	ProcessShape.prototype.isHtmlAllowed = function()
	{
		return false;
	};
	ProcessShape.prototype.getLabelBounds = function(rect)
	{
		if (mxUtils.getValue(this.state.style, mxConstants.STYLE_HORIZONTAL, true) ==
			(this.direction == null ||
			this.direction == mxConstants.DIRECTION_EAST ||
			this.direction == mxConstants.DIRECTION_WEST))
		{
			var w = rect.width;
			var h = rect.height;
			var r = new mxRectangle(rect.x, rect.y, w, h);
	
			var inset = w * Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'size', this.size))));
	
			if (this.isRounded)
			{
				var f = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE,
					mxConstants.RECTANGLE_ROUNDING_FACTOR * 100) / 100;
				inset = Math.max(inset, Math.min(w * f, h * f));
			}
			
			r.x += Math.round(inset);
			r.width -= Math.round(2 * inset);
			
			return r;
		}
		
		return rect;
	};

	ProcessShape.prototype.paintForeground = function(c, x, y, w, h)
	{
		var isFixedSize = mxUtils.getValue(this.style, 'fixedSize', this.fixedSize);
		var inset = parseFloat(mxUtils.getValue(this.style, 'size', this.size));
		
		if (isFixedSize)
		{
			inset = Math.max(0, Math.min(w, inset));
		}
		else
		{
			inset = w * Math.max(0, Math.min(1, inset));
		}
	
		if (this.isRounded)
		{
			var f = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE,
				mxConstants.RECTANGLE_ROUNDING_FACTOR * 100) / 100;
			inset = Math.max(inset, Math.min(w * f, h * f));
		}
		
		// Crisp rendering of inner lines
		inset = Math.round(inset);
		
		c.begin();
		c.moveTo(x + inset, y);
		c.lineTo(x + inset, y + h);
		c.moveTo(x + w - inset, y);
		c.lineTo(x + w - inset, y + h);
		c.end();
		c.stroke();
		mxRectangleShape.prototype.paintForeground.apply(this, arguments);
	};

	mxCellRenderer.registerShape('process', ProcessShape);
	//Register the same shape with another name for backwards compatibility
	mxCellRenderer.registerShape('process2', ProcessShape);
	
	// Transparent Shape
	function TransparentShape()
	{
		mxRectangleShape.call(this);
	};

	mxUtils.extend(TransparentShape, mxRectangleShape);

	TransparentShape.prototype.paintBackground = function(c, x, y, w, h)
	{
		c.setFillColor(mxConstants.NONE);
		c.rect(x, y, w, h);
		c.fill();
	};

	TransparentShape.prototype.paintForeground = function(c, x, y, w, h) 	{ };

	mxCellRenderer.registerShape('transparent', TransparentShape);

	// Callout shape
	function CalloutShape()
	{
		mxActor.call(this);
	};

	mxUtils.extend(CalloutShape, mxHexagon);

	CalloutShape.prototype.size = 30;

	CalloutShape.prototype.position = 0.5;

	CalloutShape.prototype.position2 = 0.5;

	CalloutShape.prototype.base = 20;

	CalloutShape.prototype.getLabelMargins = function()
	{
		return new mxRectangle(0, 0, 0, parseFloat(mxUtils.getValue(
			this.style, 'size', this.size)) * this.scale);
	};

	CalloutShape.prototype.isRoundable = function()
	{
		return true;
	};

	CalloutShape.prototype.redrawPath = function(c, x, y, w, h)
	{
		var arcSize = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2;
		var s = Math.max(0, Math.min(h, parseFloat(mxUtils.getValue(this.style, 'size', this.size))));
		var dx = w * Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'position', this.position))));
		var dx2 = w * Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'position2', this.position2))));
		var base = Math.max(0, Math.min(w, parseFloat(mxUtils.getValue(this.style, 'base', this.base))));
		
		this.addPoints(c, [new mxPoint(0, 0), new mxPoint(w, 0), new mxPoint(w, h - s),
			new mxPoint(Math.min(w, dx + base), h - s), new mxPoint(dx2, h),
			new mxPoint(Math.max(0, dx), h - s), new mxPoint(0, h - s)],
			this.isRounded, arcSize, true, [4]);
	};

	mxCellRenderer.registerShape('callout', CalloutShape);

	// Step shape
	function StepShape()
	{
		mxActor.call(this);
	};

	mxUtils.extend(StepShape, mxActor);

	StepShape.prototype.size = 0.2;

	StepShape.prototype.fixedSize = 20;

	StepShape.prototype.isRoundable = function()
	{
		return true;
	};

	StepShape.prototype.redrawPath = function(c, x, y, w, h)
	{
		var fixed = mxUtils.getValue(this.style, 'fixedSize', '0') != '0';
		var s = (fixed) ? Math.max(0, Math.min(w, parseFloat(mxUtils.getValue(this.style, 'size', this.fixedSize)))) :
			w * Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'size', this.size))));
		var arcSize = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2;
		this.addPoints(c, [new mxPoint(0, 0), new mxPoint(w - s, 0), new mxPoint(w, h / 2), new mxPoint(w - s, h),
		                   new mxPoint(0, h), new mxPoint(s, h / 2)], this.isRounded, arcSize, true);
		c.end();
	};

	mxCellRenderer.registerShape('step', StepShape);

	// Hexagon shape
	function HexagonShape()
	{
		mxActor.call(this);
	};

	mxUtils.extend(HexagonShape, mxHexagon);

	HexagonShape.prototype.size = 0.25;

	HexagonShape.prototype.fixedSize = 20;

	HexagonShape.prototype.isRoundable = function()
	{
		return true;
	};
	HexagonShape.prototype.redrawPath = function(c, x, y, w, h)
	{
		var fixed = mxUtils.getValue(this.style, 'fixedSize', '0') != '0';
		var s = (fixed) ? Math.max(0, Math.min(w * 0.5, parseFloat(mxUtils.getValue(this.style, 'size', this.fixedSize)))) :
			w * Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'size', this.size))));
		var arcSize = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2;
		this.addPoints(c, [new mxPoint(s, 0), new mxPoint(w - s, 0), new mxPoint(w, 0.5 * h), new mxPoint(w - s, h),
		                   new mxPoint(s, h), new mxPoint(0, 0.5 * h)], this.isRounded, arcSize, true);
	};

	mxCellRenderer.registerShape('hexagon', HexagonShape);

	// Plus Shape
	function PlusShape()
	{
		mxRectangleShape.call(this);
	};

	mxUtils.extend(PlusShape, mxRectangleShape);

	PlusShape.prototype.isHtmlAllowed = function()
	{
		return false;
	};

	PlusShape.prototype.paintForeground = function(c, x, y, w, h)
	{
		var border = Math.min(w / 5, h / 5) + 1;
		
		c.begin();
		c.moveTo(x + w / 2, y + border);
		c.lineTo(x + w / 2, y + h - border);
		c.moveTo(x + border, y + h / 2);
		c.lineTo(x + w - border, y + h / 2);
		c.end();
		c.stroke();
		mxRectangleShape.prototype.paintForeground.apply(this, arguments);
	};

	mxCellRenderer.registerShape('plus', PlusShape);
	
	// Overrides painting of rhombus shape to allow for double style
	var mxRhombusPaintVertexShape = mxRhombus.prototype.paintVertexShape;
	mxRhombus.prototype.getLabelBounds = function(rect)
	{
		if (this.style['double'] == 1)
		{
			var margin = (Math.max(2, this.strokewidth + 1) * 2 + parseFloat(
				this.style[mxConstants.STYLE_MARGIN] || 0)) * this.scale;
		
			return new mxRectangle(rect.x + margin, rect.y + margin,
				rect.width - 2 * margin, rect.height - 2 * margin);
		}
		
		return rect;
	};
	mxRhombus.prototype.paintVertexShape = function(c, x, y, w, h)
	{
		mxRhombusPaintVertexShape.apply(this, arguments);

		if (!this.outline && this.style['double'] == 1)
		{
			var margin = Math.max(2, this.strokewidth + 1) * 2 +
				parseFloat(this.style[mxConstants.STYLE_MARGIN] || 0);
			x += margin;
			y += margin;
			w -= 2 * margin;
			h -= 2 * margin;
			
			if (w > 0 && h > 0)
			{
				c.setShadow(false);
				
				// Workaround for closure compiler bug where the lines with x and y above
				// are removed if arguments is used as second argument in call below.
				mxRhombusPaintVertexShape.apply(this, [c, x, y, w, h]);
			}
		}
	};

	// CompositeShape
	function ExtendedShape()
	{
		mxRectangleShape.call(this);
	};

	mxUtils.extend(ExtendedShape, mxRectangleShape);

	ExtendedShape.prototype.isHtmlAllowed = function()
	{
		return false;
	};
	ExtendedShape.prototype.getLabelBounds = function(rect)
	{
		if (this.style['double'] == 1)
		{
			var margin = (Math.max(2, this.strokewidth + 1) + parseFloat(
				this.style[mxConstants.STYLE_MARGIN] || 0)) * this.scale;
		
			return new mxRectangle(rect.x + margin, rect.y + margin,
				rect.width - 2 * margin, rect.height - 2 * margin);
		}
		
		return rect;
	};
	
	ExtendedShape.prototype.paintForeground = function(c, x, y, w, h)
	{
		if (this.style != null)
		{
			if (!this.outline && this.style['double'] == 1)
			{
				var margin = Math.max(2, this.strokewidth + 1) + parseFloat(this.style[mxConstants.STYLE_MARGIN] || 0);
				x += margin;
				y += margin;
				w -= 2 * margin;
				h -= 2 * margin;
				
				if (w > 0 && h > 0)
				{
					mxRectangleShape.prototype.paintBackground.apply(this, arguments);
				}
			}
			
			c.setDashed(false);
			
			// Draws the symbols defined in the style. The symbols are
			// numbered from 1...n. Possible postfixes are align,
			// verticalAlign, spacing, arcSpacing, width, height
			var counter = 0;
			var shape = null;
			
			do
			{
				shape = mxCellRenderer.defaultShapes[this.style['symbol' + counter]];
				
				if (shape != null)
				{
					var align = this.style['symbol' + counter + 'Align'];
					var valign = this.style['symbol' + counter + 'VerticalAlign'];
					var width = this.style['symbol' + counter + 'Width'];
					var height = this.style['symbol' + counter + 'Height'];
					var spacing = this.style['symbol' + counter + 'Spacing'] || 0;
					var vspacing = this.style['symbol' + counter + 'VSpacing'] || spacing;
					var arcspacing = this.style['symbol' + counter + 'ArcSpacing'];
					
					if (arcspacing != null)
					{
						var arcSize = this.getArcSize(w + this.strokewidth, h + this.strokewidth) * arcspacing;
						spacing += arcSize;
						vspacing += arcSize;
					}
					
					var x2 = x;
					var y2 = y;
					
					if (align == mxConstants.ALIGN_CENTER)
					{
						x2 += (w - width) / 2;
					}
					else if (align == mxConstants.ALIGN_RIGHT)
					{
						x2 += w - width - spacing;
					}
					else
					{
						x2 += spacing;
					}
					
					if (valign == mxConstants.ALIGN_MIDDLE)
					{
						y2 += (h - height) / 2;
					}
					else if (valign == mxConstants.ALIGN_BOTTOM)
					{
						y2 += h - height - vspacing;
					}
					else
					{
						y2 += vspacing;
					}
					
					c.save();
					
					// Small hack to pass style along into subshape
					var tmp = new shape();
					// TODO: Clone style and override settings (eg. strokewidth)
					tmp.style = this.style;
					shape.prototype.paintVertexShape.call(tmp, c, x2, y2, width, height);
					c.restore();
				}
				
				counter++;
			}
			while (shape != null);
		}
		
		// Paints glass effect
		mxRectangleShape.prototype.paintForeground.apply(this, arguments);
	};

	mxCellRenderer.registerShape('ext', ExtendedShape);
	
	// Tape Shape, supports size style
	function MessageShape()
	{
		mxCylinder.call(this);
	};

	mxUtils.extend(MessageShape, mxCylinder);

	MessageShape.prototype.redrawPath = function(path, x, y, w, h, isForeground)
	{
		if (isForeground)
		{
			path.moveTo(0, 0);
			path.lineTo(w / 2, h / 2);
			path.lineTo(w, 0);
			path.end();
		}
		else
		{
			path.moveTo(0, 0);
			path.lineTo(w, 0);
			path.lineTo(w, h);
			path.lineTo(0, h);
			path.close();
		}
	};

	mxCellRenderer.registerShape('message', MessageShape);
	
	// UML Actor Shape
	function UmlActorShape()
	{
		mxShape.call(this);
	};

	mxUtils.extend(UmlActorShape, mxShape);

	UmlActorShape.prototype.paintBackground = function(c, x, y, w, h)
	{
		c.translate(x, y);

		// Head
		c.ellipse(w / 4, 0, w / 2, h / 4);
		c.fillAndStroke();

		c.begin();
		c.moveTo(w / 2, h / 4);
		c.lineTo(w / 2, 2 * h / 3);
		
		// Arms
		c.moveTo(w / 2, h / 3);
		c.lineTo(0, h / 3);
		c.moveTo(w / 2, h / 3);
		c.lineTo(w, h / 3);
		
		// Legs
		c.moveTo(w / 2, 2 * h / 3);
		c.lineTo(0, h);
		c.moveTo(w / 2, 2 * h / 3);
		c.lineTo(w, h);
		c.end();
		
		c.stroke();
	};

	// Replaces existing actor shape
	mxCellRenderer.registerShape('umlActor', UmlActorShape);
	
	////////////// UML Boundary Shape ///////////////
	function UmlBoundaryShape()
	{
		mxShape.call(this);
	};
	mxUtils.extend(UmlBoundaryShape, mxShape);

	UmlBoundaryShape.prototype.getLabelMargins = function(rect)
	{
		return new mxRectangle(rect.width / 6, 0, 0, 0);
	};

	UmlBoundaryShape.prototype.paintBackground = function(c, x, y, w, h)
	{
		c.translate(x, y);
		
		// Base line
		c.begin();
		c.moveTo(0, h / 4);
		c.lineTo(0, h * 3 / 4);
		c.end();
		c.stroke();
		
		// Horizontal line
		c.begin();
		c.moveTo(0, h / 2);
		c.lineTo(w / 6, h / 2);
		c.end();
		c.stroke();
		
		// Circle
		c.ellipse(w / 6, 0, w * 5 / 6, h);
		c.fillAndStroke();
	};

	mxCellRenderer.registerShape('umlBoundary', UmlBoundaryShape);

	// UML Entity Shape
	function UmlEntityShape()
	{
		mxEllipse.call(this);
	};

	mxUtils.extend(UmlEntityShape, mxEllipse);

	UmlEntityShape.prototype.paintVertexShape = function(c, x, y, w, h)
	{
		mxEllipse.prototype.paintVertexShape.apply(this, arguments);
		
		c.begin();
		c.moveTo(x + w / 8, y + h);
		c.lineTo(x + w * 7 / 8, y + h);
		c.end();
		c.stroke();
	};

	mxCellRenderer.registerShape('umlEntity', UmlEntityShape);

	// UML Destroy Shape
	function UmlDestroyShape()
	{
		mxShape.call(this);
	};

	mxUtils.extend(UmlDestroyShape, mxShape);

	UmlDestroyShape.prototype.paintVertexShape = function(c, x, y, w, h)
	{
		c.translate(x, y);

		c.begin();
		c.moveTo(w, 0);
		c.lineTo(0, h);
		c.moveTo(0, 0);
		c.lineTo(w, h);
		c.end();
		c.stroke();
	};

	mxCellRenderer.registerShape('umlDestroy', UmlDestroyShape);
	
	// UML Control Shape
	function UmlControlShape()
	{
		mxShape.call(this);
	};

	mxUtils.extend(UmlControlShape, mxShape);

	UmlControlShape.prototype.getLabelBounds = function(rect)
	{
		return new mxRectangle(rect.x, rect.y + rect.height / 8, rect.width, rect.height * 7 / 8);
	};

	UmlControlShape.prototype.paintBackground = function(c, x, y, w, h)
	{
		c.translate(x, y);

		// Upper line
		c.begin();
		c.moveTo(w * 3 / 8, h / 8 * 1.1);
		c.lineTo(w * 5 / 8, 0);
		c.end();
		c.stroke();
		
		// Circle
		c.ellipse(0, h / 8, w, h * 7 / 8);
		c.fillAndStroke();
	};
	UmlControlShape.prototype.paintForeground = function(c, x, y, w, h)
	{
		// Lower line
		c.begin();
		c.moveTo(w * 3 / 8, h / 8 * 1.1);
		c.lineTo(w * 5 / 8, h / 4);
		c.end();
		c.stroke();
	};

	// Replaces existing actor shape
	mxCellRenderer.registerShape('umlControl', UmlControlShape);

	// UML Lifeline Shape
	function UmlLifeline()
	{
		mxRectangleShape.call(this);
	};

	mxUtils.extend(UmlLifeline, mxRectangleShape);

	UmlLifeline.prototype.size = 40;

	UmlLifeline.prototype.isHtmlAllowed = function()
	{
		return false;
	};

	UmlLifeline.prototype.getLabelBounds = function(rect)
	{
		var size = Math.max(0, Math.min(rect.height, parseFloat(
			mxUtils.getValue(this.style, 'size', this.size)) * this.scale));
		
		return new mxRectangle(rect.x, rect.y, rect.width, size);
	};

	UmlLifeline.prototype.paintBackground = function(c, x, y, w, h)
	{
		var size = Math.max(0, Math.min(h, parseFloat(mxUtils.getValue(this.style, 'size', this.size))));
		var participant = mxUtils.getValue(this.style, 'participant');
		
		if (participant == null || this.state == null)
		{
			mxRectangleShape.prototype.paintBackground.call(this, c, x, y, w, size);
		}
		else
		{
			var ctor = this.state.view.graph.cellRenderer.getShape(participant);
			
			if (ctor != null && ctor != UmlLifeline)
			{
				var shape = new ctor();
				shape.apply(this.state);
				c.save();
				shape.paintVertexShape(c, x, y, w, size);
				c.restore();
			}
		}
		
		if (size < h)
		{
			c.setDashed(mxUtils.getValue(this.style, 'lifelineDashed', '1') == '1');
			c.begin();
			c.moveTo(x + w / 2, y + size);
			c.lineTo(x + w / 2, y + h);
			c.end();
			c.stroke();
		}
	};
	UmlLifeline.prototype.paintForeground = function(c, x, y, w, h)
	{
		var size = Math.max(0, Math.min(h, parseFloat(mxUtils.getValue(this.style, 'size', this.size))));
		mxRectangleShape.prototype.paintForeground.call(this, c, x, y, w, Math.min(h, size));
	};

	mxCellRenderer.registerShape('umlLifeline', UmlLifeline);
	
	// UML Frame Shape
	function UmlFrame()
	{
		mxShape.call(this);
	};

	mxUtils.extend(UmlFrame, mxShape);
	
	UmlFrame.prototype.width = 60;

	UmlFrame.prototype.height = 30;

	UmlFrame.prototype.corner = 10;

	UmlFrame.prototype.configurePointerEvents = function(c)
	{
		var bg = mxUtils.getValue(this.style, mxConstants.STYLE_SWIMLANE_FILLCOLOR, mxConstants.NONE);

		if (this.style != null && (bg == null ||
			bg == mxConstants.NONE || this.opacity == 0 ||
			this.fillOpacity == 0) && mxUtils.getValue(this.style,
			mxConstants.STYLE_POINTER_EVENTS, '1') == '0')
		{
			c.pointerEvents = false;
		}
	};

	UmlFrame.prototype.getLabelMargins = function(rect)
	{
		return new mxRectangle(0, 0,
			rect.width - (parseFloat(mxUtils.getValue(this.style, 'width', this.width) * this.scale)),
			rect.height - (parseFloat(mxUtils.getValue(this.style, 'height', this.height) * this.scale)));
	};

	UmlFrame.prototype.paintBackground = function(c, x, y, w, h)
	{
		var co = this.corner;
		var w0 = Math.min(w, Math.max(co, parseFloat(mxUtils.getValue(this.style, 'width', this.width))));
		var h0 = Math.min(h, Math.max(co * 1.5, parseFloat(mxUtils.getValue(this.style, 'height', this.height))));
		var bg = mxUtils.getValue(this.style, mxConstants.STYLE_SWIMLANE_FILLCOLOR, mxConstants.NONE);
		
		if (bg != mxConstants.NONE)
		{
			c.setFillColor(bg);
			c.rect(x, y, w, h);
			c.fill();
		}
		
		if (this.fill != null && this.fill != mxConstants.NONE && this.gradient && this.gradient != mxConstants.NONE)
		{
			var b = this.getGradientBounds(c, x, y, w, h);
			c.setGradient(this.fill, this.gradient, x, y, w, h, this.gradientDirection);
		}
		else
		{
			c.setFillColor(this.fill);
		}

		// Label part handles events
		c.pointerEvents = true;

		c.begin();
		c.moveTo(x, y);
		c.lineTo(x + w0, y);
		c.lineTo(x + w0, y + Math.max(0, h0 - co * 1.5));
		c.lineTo(x + Math.max(0, w0 - co), y + h0);
		c.lineTo(x, y + h0);
		c.close();
		c.fillAndStroke();

		this.configurePointerEvents(c);
		
		c.begin();
		c.moveTo(x + w0, y);
		c.lineTo(x + w, y);
		c.lineTo(x + w, y + h);
		c.lineTo(x, y + h);
		c.lineTo(x, y + h0);
		c.stroke();
	};

	mxCellRenderer.registerShape('umlFrame', UmlFrame);
		
	mxPerimeter.CenterPerimeter = function (bounds, vertex, next, orthogonal)
	{
		return new mxPoint(bounds.getCenterX(), bounds.getCenterY());
	};
	
	mxStyleRegistry.putValue('centerPerimeter', mxPerimeter.CenterPerimeter);
	
	mxPerimeter.LifelinePerimeter = function (bounds, vertex, next, orthogonal)
	{
		var size = UmlLifeline.prototype.size;
		
		if (vertex != null)
		{
			size = mxUtils.getValue(vertex.style, 'size', size) * vertex.view.scale;
		}
		
		var sw = (parseFloat(vertex.style[mxConstants.STYLE_STROKEWIDTH] || 1) * vertex.view.scale / 2) - 1;

		if (next.x < bounds.getCenterX())
		{
			sw += 1;
			sw *= -1;
		}
		
		return new mxPoint(bounds.getCenterX() + sw, Math.min(bounds.y + bounds.height,
				Math.max(bounds.y + size, next.y)));
	};
	
	mxStyleRegistry.putValue('lifelinePerimeter', mxPerimeter.LifelinePerimeter);
	
	mxPerimeter.OrthogonalPerimeter = function (bounds, vertex, next, orthogonal)
	{
		orthogonal = true;
		
		return mxPerimeter.RectanglePerimeter.apply(this, arguments);
	};
	
	mxStyleRegistry.putValue('orthogonalPerimeter', mxPerimeter.OrthogonalPerimeter);

	mxPerimeter.BackbonePerimeter = function (bounds, vertex, next, orthogonal)
	{
		var sw = (parseFloat(vertex.style[mxConstants.STYLE_STROKEWIDTH] || 1) * vertex.view.scale / 2) - 1;
		
		if (vertex.style['backboneSize'] != null)
		{
			sw += (parseFloat(vertex.style['backboneSize']) * vertex.view.scale / 2) - 1;
		}
		
		if (vertex.style[mxConstants.STYLE_DIRECTION] == 'south' ||
			vertex.style[mxConstants.STYLE_DIRECTION] == 'north')
		{
			if (next.x < bounds.getCenterX())
			{
				sw += 1;
				sw *= -1;
			}
			
			return new mxPoint(bounds.getCenterX() + sw, Math.min(bounds.y + bounds.height,
					Math.max(bounds.y, next.y)));
		}
		else
		{
			if (next.y < bounds.getCenterY())
			{
				sw += 1;
				sw *= -1;
			}
			
			return new mxPoint(Math.min(bounds.x + bounds.width, Math.max(bounds.x, next.x)),
				bounds.getCenterY() + sw);
		}
	};
	
	mxStyleRegistry.putValue('backbonePerimeter', mxPerimeter.BackbonePerimeter);

	// Callout Perimeter
	mxPerimeter.CalloutPerimeter = function (bounds, vertex, next, orthogonal)
	{
		return mxPerimeter.RectanglePerimeter(mxUtils.getDirectedBounds(bounds, new mxRectangle(0, 0, 0,
			Math.max(0, Math.min(bounds.height, parseFloat(mxUtils.getValue(vertex.style, 'size',
			CalloutShape.prototype.size)) * vertex.view.scale))),
			vertex.style), vertex, next, orthogonal);
	};
	
	mxStyleRegistry.putValue('calloutPerimeter', mxPerimeter.CalloutPerimeter);
	
	// Parallelogram Perimeter
	mxPerimeter.ParallelogramPerimeter = function (bounds, vertex, next, orthogonal)
	{
		var fixed = mxUtils.getValue(vertex.style, 'fixedSize', '0') != '0';
		var size = (fixed) ? ParallelogramShape.prototype.fixedSize : ParallelogramShape.prototype.size;
		
		if (vertex != null)
		{
			size = mxUtils.getValue(vertex.style, 'size', size);
		}
		
		if (fixed)
		{
			size *= vertex.view.scale;
		}
		
		var x = bounds.x;
		var y = bounds.y;
		var w = bounds.width;
		var h = bounds.height;

		var direction = (vertex != null) ? mxUtils.getValue(
			vertex.style, mxConstants.STYLE_DIRECTION,
			mxConstants.DIRECTION_EAST) : mxConstants.DIRECTION_EAST;
		var vertical = direction == mxConstants.DIRECTION_NORTH ||
			direction == mxConstants.DIRECTION_SOUTH;
		var points;
		
		if (vertical)
		{
			var dy = (fixed) ? Math.max(0, Math.min(h, size)) : h * Math.max(0, Math.min(1, size));
			points = [new mxPoint(x, y), new mxPoint(x + w, y + dy),
						new mxPoint(x + w, y + h), new mxPoint(x, y + h - dy), new mxPoint(x, y)];
		}
		else
		{
			var dx = (fixed) ? Math.max(0, Math.min(w * 0.5, size)) : w * Math.max(0, Math.min(1, size));
			points = [new mxPoint(x + dx, y), new mxPoint(x + w, y),
							new mxPoint(x + w - dx, y + h), new mxPoint(x, y + h), new mxPoint(x + dx, y)];
		}	
		
		var cx = bounds.getCenterX();
		var cy = bounds.getCenterY();
		
		var p1 = new mxPoint(cx, cy);
		
		if (orthogonal)
		{
			if (next.x < x || next.x > x + w)
			{
				p1.y = next.y;
			}
			else
			{
				p1.x = next.x;
			}
		}
		
		return mxUtils.getPerimeterPoint(points, p1, next);
	};
	
	mxStyleRegistry.putValue('parallelogramPerimeter', mxPerimeter.ParallelogramPerimeter);
	
	// Trapezoid Perimeter
	mxPerimeter.TrapezoidPerimeter = function (bounds, vertex, next, orthogonal)
	{
		var fixed = mxUtils.getValue(vertex.style, 'fixedSize', '0') != '0';
		var size = (fixed) ? TrapezoidShape.prototype.fixedSize : TrapezoidShape.prototype.size;
		
		if (vertex != null)
		{
			size = mxUtils.getValue(vertex.style, 'size', size);
		}
		
		if (fixed)
		{
			size *= vertex.view.scale;
		}
		
		var x = bounds.x;
		var y = bounds.y;
		var w = bounds.width;
		var h = bounds.height;

		var direction = (vertex != null) ? mxUtils.getValue(
				vertex.style, mxConstants.STYLE_DIRECTION,
				mxConstants.DIRECTION_EAST) : mxConstants.DIRECTION_EAST;
		var points = [];
		
		if (direction == mxConstants.DIRECTION_EAST)
		{
			var dx = (fixed) ? Math.max(0, Math.min(w * 0.5, size)) : w * Math.max(0, Math.min(1, size));
			points = [new mxPoint(x + dx, y), new mxPoint(x + w - dx, y),
						new mxPoint(x + w, y + h), new mxPoint(x, y + h), new mxPoint(x + dx, y)];
		}
		else if (direction == mxConstants.DIRECTION_WEST)
		{
			var dx = (fixed) ? Math.max(0, Math.min(w, size)) : w * Math.max(0, Math.min(1, size));
			points = [new mxPoint(x, y), new mxPoint(x + w, y),
						new mxPoint(x + w - dx, y + h), new mxPoint(x + dx, y + h), new mxPoint(x, y)];
		}
		else if (direction == mxConstants.DIRECTION_NORTH)
		{
			var dy = (fixed) ? Math.max(0, Math.min(h, size)) : h * Math.max(0, Math.min(1, size));
			points = [new mxPoint(x, y + dy), new mxPoint(x + w, y),
						new mxPoint(x + w, y + h), new mxPoint(x, y + h - dy), new mxPoint(x, y + dy)];
		}
		else
		{
			var dy = (fixed) ? Math.max(0, Math.min(h, size)) : h * Math.max(0, Math.min(1, size));
			points = [new mxPoint(x, y), new mxPoint(x + w, y + dy),
						new mxPoint(x + w, y + h - dy), new mxPoint(x, y + h), new mxPoint(x, y)];
		}		

		var cx = bounds.getCenterX();
		var cy = bounds.getCenterY();
		
		var p1 = new mxPoint(cx, cy);
		
		if (orthogonal)
		{
			if (next.x < x || next.x > x + w)
			{
				p1.y = next.y;
			}
			else
			{
				p1.x = next.x;
			}
		}

		return mxUtils.getPerimeterPoint(points, p1, next);
	};
	
	mxStyleRegistry.putValue('trapezoidPerimeter', mxPerimeter.TrapezoidPerimeter);
	
	// Step Perimeter
	mxPerimeter.StepPerimeter = function (bounds, vertex, next, orthogonal)
	{
		var fixed = mxUtils.getValue(vertex.style, 'fixedSize', '0') != '0';
		var size = (fixed) ? StepShape.prototype.fixedSize : StepShape.prototype.size;
		
		if (vertex != null)
		{
			size = mxUtils.getValue(vertex.style, 'size', size);
		}
		
		if (fixed)
		{
			size *= vertex.view.scale;
		}
		
		var x = bounds.x;
		var y = bounds.y;
		var w = bounds.width;
		var h = bounds.height;

		var cx = bounds.getCenterX();
		var cy = bounds.getCenterY();
		
		var direction = (vertex != null) ? mxUtils.getValue(
				vertex.style, mxConstants.STYLE_DIRECTION,
				mxConstants.DIRECTION_EAST) : mxConstants.DIRECTION_EAST;
		var points;
		
		if (direction == mxConstants.DIRECTION_EAST)
		{
			var dx = (fixed) ? Math.max(0, Math.min(w, size)) : w * Math.max(0, Math.min(1, size));
			points = [new mxPoint(x, y), new mxPoint(x + w - dx, y), new mxPoint(x + w, cy),
							new mxPoint(x + w - dx, y + h), new mxPoint(x, y + h),
							new mxPoint(x + dx, cy), new mxPoint(x, y)];
		}
		else if (direction == mxConstants.DIRECTION_WEST)
		{
			var dx = (fixed) ? Math.max(0, Math.min(w, size)) : w * Math.max(0, Math.min(1, size));
			points = [new mxPoint(x + dx, y), new mxPoint(x + w, y), new mxPoint(x + w - dx, cy),
							new mxPoint(x + w, y + h), new mxPoint(x + dx, y + h),
							new mxPoint(x, cy), new mxPoint(x + dx, y)];
		}
		else if (direction == mxConstants.DIRECTION_NORTH)
		{
			var dy = (fixed) ? Math.max(0, Math.min(h, size)) : h * Math.max(0, Math.min(1, size));
			points = [new mxPoint(x, y + dy), new mxPoint(cx, y), new mxPoint(x + w, y + dy),
							new mxPoint(x + w, y + h), new mxPoint(cx, y + h - dy),
							new mxPoint(x, y + h), new mxPoint(x, y + dy)];
		}
		else
		{
			var dy = (fixed) ? Math.max(0, Math.min(h, size)) : h * Math.max(0, Math.min(1, size));
			points = [new mxPoint(x, y), new mxPoint(cx, y + dy), new mxPoint(x + w, y),
							new mxPoint(x + w, y + h - dy), new mxPoint(cx, y + h),
							new mxPoint(x, y + h - dy), new mxPoint(x, y)];
		}		
		
		var p1 = new mxPoint(cx, cy);
		
		if (orthogonal)
		{
			if (next.x < x || next.x > x + w)
			{
				p1.y = next.y;
			}
			else
			{
				p1.x = next.x;
			}
		}
		
		return mxUtils.getPerimeterPoint(points, p1, next);
	};
	
	mxStyleRegistry.putValue('stepPerimeter', mxPerimeter.StepPerimeter);
	
	// Hexagon Perimeter 2 (keep existing one)
	mxPerimeter.HexagonPerimeter2 = function (bounds, vertex, next, orthogonal)
	{
		var fixed = mxUtils.getValue(vertex.style, 'fixedSize', '0') != '0';
		var size = (fixed) ? HexagonShape.prototype.fixedSize : HexagonShape.prototype.size;
		
		if (vertex != null)
		{
			size = mxUtils.getValue(vertex.style, 'size', size);
		}
		
		if (fixed)
		{
			size *= vertex.view.scale;
		}
		
		var x = bounds.x;
		var y = bounds.y;
		var w = bounds.width;
		var h = bounds.height;

		var cx = bounds.getCenterX();
		var cy = bounds.getCenterY();
		
		var direction = (vertex != null) ? mxUtils.getValue(
			vertex.style, mxConstants.STYLE_DIRECTION,
			mxConstants.DIRECTION_EAST) : mxConstants.DIRECTION_EAST;
		var vertical = direction == mxConstants.DIRECTION_NORTH ||
			direction == mxConstants.DIRECTION_SOUTH;
		var points;
		
		if (vertical)
		{
			var dy = (fixed) ? Math.max(0, Math.min(h, size)) : h * Math.max(0, Math.min(1, size));
			points = [new mxPoint(cx, y), new mxPoint(x + w, y + dy), new mxPoint(x + w, y + h - dy),
							new mxPoint(cx, y + h), new mxPoint(x, y + h - dy),
							new mxPoint(x, y + dy), new mxPoint(cx, y)];
		}
		else
		{
			var dx = (fixed) ? Math.max(0, Math.min(w, size)) : w * Math.max(0, Math.min(1, size));
			points = [new mxPoint(x + dx, y), new mxPoint(x + w - dx, y), new mxPoint(x + w, cy),
						new mxPoint(x + w - dx, y + h), new mxPoint(x + dx, y + h),
						new mxPoint(x, cy), new mxPoint(x + dx, y)];
		}		

		var p1 = new mxPoint(cx, cy);
		
		if (orthogonal)
		{
			if (next.x < x || next.x > x + w)
			{
				p1.y = next.y;
			}
			else
			{
				p1.x = next.x;
			}
		}
		
		return mxUtils.getPerimeterPoint(points, p1, next);
	};
	
	mxStyleRegistry.putValue('hexagonPerimeter2', mxPerimeter.HexagonPerimeter2);
	
	// Provided Interface Shape (aka Lollipop)
	function LollipopShape()
	{
		mxShape.call(this);
	};

	mxUtils.extend(LollipopShape, mxShape);

	LollipopShape.prototype.size = 10;

	LollipopShape.prototype.paintBackground = function(c, x, y, w, h)
	{
		var sz = parseFloat(mxUtils.getValue(this.style, 'size', this.size));
		c.translate(x, y);
		
		c.ellipse((w - sz) / 2, 0, sz, sz);
		c.fillAndStroke();

		c.begin();
		c.moveTo(w / 2, sz);
		c.lineTo(w / 2, h);
		c.end();
		c.stroke();
	};

	mxCellRenderer.registerShape('lollipop', LollipopShape);

	// Required Interface Shape
	function RequiresShape()
	{
		mxShape.call(this);
	};

	mxUtils.extend(RequiresShape, mxShape);

	RequiresShape.prototype.size = 10;

	RequiresShape.prototype.inset = 2;

	RequiresShape.prototype.paintBackground = function(c, x, y, w, h)
	{
		var sz = parseFloat(mxUtils.getValue(this.style, 'size', this.size));
		var inset = parseFloat(mxUtils.getValue(this.style, 'inset', this.inset)) + this.strokewidth;
		c.translate(x, y);

		c.begin();
		c.moveTo(w / 2, sz + inset);
		c.lineTo(w / 2, h);
		c.end();
		c.stroke();
		
		c.begin();
		c.moveTo((w - sz) / 2 - inset, sz / 2);
		c.quadTo((w - sz) / 2 - inset, sz + inset, w / 2, sz + inset);
		c.quadTo((w + sz) / 2 + inset, sz + inset, (w + sz) / 2 + inset, sz / 2);
		c.end();
		c.stroke();
	};

	mxCellRenderer.registerShape('requires', RequiresShape);

	// Required Interface Shape
	function RequiredInterfaceShape()
	{
		mxShape.call(this);
	};

	mxUtils.extend(RequiredInterfaceShape, mxShape);
	
	RequiredInterfaceShape.prototype.paintBackground = function(c, x, y, w, h)
	{
		c.translate(x, y);

		c.begin();
		c.moveTo(0, 0);
		c.quadTo(w, 0, w, h / 2);
		c.quadTo(w, h, 0, h);
		c.end();
		c.stroke();
	};

	mxCellRenderer.registerShape('requiredInterface', RequiredInterfaceShape);

	// Provided and Required Interface Shape
	function ProvidedRequiredInterfaceShape()
	{
		mxShape.call(this);
	};

	mxUtils.extend(ProvidedRequiredInterfaceShape, mxShape);

	ProvidedRequiredInterfaceShape.prototype.inset = 2;

	ProvidedRequiredInterfaceShape.prototype.paintBackground = function(c, x, y, w, h)
	{
		var inset = parseFloat(mxUtils.getValue(this.style, 'inset', this.inset)) + this.strokewidth;
		c.translate(x, y);

		c.ellipse(0, inset, w - 2 * inset, h - 2 * inset);
		c.fillAndStroke();
		
		c.begin();
		c.moveTo(w / 2, 0);
		c.quadTo(w, 0, w, h / 2);
		c.quadTo(w, h, w / 2, h);
		c.end();
		c.stroke();
	};

	mxCellRenderer.registerShape('providedRequiredInterface', ProvidedRequiredInterfaceShape);
		
	// Module shape
	function ModuleShape()
	{
		mxCylinder.call(this);
	};

	mxUtils.extend(ModuleShape, mxCylinder);

	ModuleShape.prototype.jettyWidth = 20;

	ModuleShape.prototype.jettyHeight = 10;

	ModuleShape.prototype.redrawPath = function(path, x, y, w, h, isForeground)
	{
		var dx = parseFloat(mxUtils.getValue(this.style, 'jettyWidth', this.jettyWidth));
		var dy = parseFloat(mxUtils.getValue(this.style, 'jettyHeight', this.jettyHeight));
		var x0 = dx / 2;
		var x1 = x0 + dx / 2;
		var y0 = Math.min(dy, h - dy);
		var y1 = Math.min(y0 + 2 * dy, h - dy);

		if (isForeground)
		{
			path.moveTo(x0, y0);
			path.lineTo(x1, y0);
			path.lineTo(x1, y0 + dy);
			path.lineTo(x0, y0 + dy);
			path.moveTo(x0, y1);
			path.lineTo(x1, y1);
			path.lineTo(x1, y1 + dy);
			path.lineTo(x0, y1 + dy);
			path.end();
		}
		else
		{
			path.moveTo(x0, 0);
			path.lineTo(w, 0);
			path.lineTo(w, h);
			path.lineTo(x0, h);
			path.lineTo(x0, y1 + dy);
			path.lineTo(0, y1 + dy);
			path.lineTo(0, y1);
			path.lineTo(x0, y1);
			path.lineTo(x0, y0 + dy);
			path.lineTo(0, y0 + dy);
			path.lineTo(0, y0);
			path.lineTo(x0, y0);
			path.close();
			path.end();
		}
	};

	mxCellRenderer.registerShape('module', ModuleShape);
	
	// Component shape
	function ComponentShape()
	{
		mxCylinder.call(this);
	};

	mxUtils.extend(ComponentShape, mxCylinder);

	ComponentShape.prototype.jettyWidth = 32;

	ComponentShape.prototype.jettyHeight = 12;

	ComponentShape.prototype.redrawPath = function(path, x, y, w, h, isForeground)
	{
		var dx = parseFloat(mxUtils.getValue(this.style, 'jettyWidth', this.jettyWidth));
		var dy = parseFloat(mxUtils.getValue(this.style, 'jettyHeight', this.jettyHeight));
		var x0 = dx / 2;
		var x1 = x0 + dx / 2;
		var y0 = 0.3 * h - dy / 2;
		var y1 = 0.7 * h - dy / 2;

		if (isForeground)
		{
			path.moveTo(x0, y0);
			path.lineTo(x1, y0);
			path.lineTo(x1, y0 + dy);
			path.lineTo(x0, y0 + dy);
			path.moveTo(x0, y1);
			path.lineTo(x1, y1);
			path.lineTo(x1, y1 + dy);
			path.lineTo(x0, y1 + dy);
			path.end();
		}
		else
		{
			path.moveTo(x0, 0);
			path.lineTo(w, 0);
			path.lineTo(w, h);
			path.lineTo(x0, h);
			path.lineTo(x0, y1 + dy);
			path.lineTo(0, y1 + dy);
			path.lineTo(0, y1);
			path.lineTo(x0, y1);
			path.lineTo(x0, y0 + dy);
			path.lineTo(0, y0 + dy);
			path.lineTo(0, y0);
			path.lineTo(x0, y0);
			path.close();
			path.end();
		}
	};

	mxCellRenderer.registerShape('component', ComponentShape);
	
	// Associative entity derived from rectangle shape
	function AssociativeEntity()
	{
		mxRectangleShape.call(this);
	};

	mxUtils.extend(AssociativeEntity, mxRectangleShape);

	AssociativeEntity.prototype.paintForeground = function(c, x, y, w, h)
	{
		var hw = w / 2;
		var hh = h / 2;
		
		var arcSize = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2;
		c.begin();
		this.addPoints(c, [new mxPoint(x + hw, y), new mxPoint(x + w, y + hh), new mxPoint(x + hw, y + h),
		     new mxPoint(x, y + hh)], this.isRounded, arcSize, true);
		c.stroke();

		mxRectangleShape.prototype.paintForeground.apply(this, arguments);
	};

	mxCellRenderer.registerShape('associativeEntity', AssociativeEntity);

	// State Shapes derives from double ellipse
	function StateShape()
	{
		mxDoubleEllipse.call(this);
	};

	mxUtils.extend(StateShape, mxDoubleEllipse);

	StateShape.prototype.outerStroke = true;

	StateShape.prototype.paintVertexShape = function(c, x, y, w, h)
	{
		var inset = Math.min(4, Math.min(w / 5, h / 5));
		
		if (w > 0 && h > 0)
		{
			c.ellipse(x + inset, y + inset, w - 2 * inset, h - 2 * inset);
			c.fillAndStroke();
		}
		
		c.setShadow(false);

		if (this.outerStroke)
		{
			c.ellipse(x, y, w, h);
			c.stroke();			
		}
	};

	mxCellRenderer.registerShape('endState', StateShape);

	function StartStateShape()
	{
		StateShape.call(this);
	};

	mxUtils.extend(StartStateShape, StateShape);

	StartStateShape.prototype.outerStroke = false;
	
	mxCellRenderer.registerShape('startState', StartStateShape);

	// Link shape
	function LinkShape()
	{
		mxArrowConnector.call(this);
		this.spacing = 0;
	};

	mxUtils.extend(LinkShape, mxArrowConnector);

	LinkShape.prototype.defaultWidth = 4;
	
	LinkShape.prototype.isOpenEnded = function()
	{
		return true;
	};

	LinkShape.prototype.getEdgeWidth = function()
	{
		return mxUtils.getNumber(this.style, 'width', this.defaultWidth) + Math.max(0, this.strokewidth - 1);
	};
	
	LinkShape.prototype.isArrowRounded = function()
	{
		return this.isRounded;
	};

	// Registers the link shape
	mxCellRenderer.registerShape('link', LinkShape);
	
	// Generic arrow
	function FlexArrowShape()
	{
		mxArrowConnector.call(this);
		this.spacing = 0;
	};

	mxUtils.extend(FlexArrowShape, mxArrowConnector);

	FlexArrowShape.prototype.defaultWidth = 10;

	FlexArrowShape.prototype.defaultArrowWidth = 20;

	FlexArrowShape.prototype.getStartArrowWidth = function()
	{
		return this.getEdgeWidth() + mxUtils.getNumber(this.style, 'startWidth', this.defaultArrowWidth);
	};

	FlexArrowShape.prototype.getEndArrowWidth = function()
	{
		return this.getEdgeWidth() + mxUtils.getNumber(this.style, 'endWidth', this.defaultArrowWidth);;
	};

	FlexArrowShape.prototype.getEdgeWidth = function()
	{
		return mxUtils.getNumber(this.style, 'width', this.defaultWidth) + Math.max(0, this.strokewidth - 1);
	};
	
	// Registers the link shape
	mxCellRenderer.registerShape('flexArrow', FlexArrowShape);
	
	// Manual Input shape
	function ManualInputShape()
	{
		mxActor.call(this);
	};

	mxUtils.extend(ManualInputShape, mxActor);

	ManualInputShape.prototype.size = 30;

	ManualInputShape.prototype.isRoundable = function()
	{
		return true;
	};
	ManualInputShape.prototype.redrawPath = function(c, x, y, w, h)
	{
		var s = Math.min(h, parseFloat(mxUtils.getValue(this.style, 'size', this.size)));
		var arcSize = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2;
		this.addPoints(c, [new mxPoint(0, h), new mxPoint(0, s), new mxPoint(w, 0), new mxPoint(w, h)],
				this.isRounded, arcSize, true);
		c.end();
	};

	mxCellRenderer.registerShape('manualInput', ManualInputShape);

	// Internal storage
	function InternalStorageShape()
	{
		mxRectangleShape.call(this);
	};

	mxUtils.extend(InternalStorageShape, mxRectangleShape);

	InternalStorageShape.prototype.dx = 20;

	InternalStorageShape.prototype.dy = 20;

	InternalStorageShape.prototype.isHtmlAllowed = function()
	{
		return false;
	};

	InternalStorageShape.prototype.paintForeground = function(c, x, y, w, h)
	{
		mxRectangleShape.prototype.paintForeground.apply(this, arguments);
		var inset = 0;
		
		if (this.isRounded)
		{
			var f = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE,
				mxConstants.RECTANGLE_ROUNDING_FACTOR * 100) / 100;
			inset = Math.max(inset, Math.min(w * f, h * f));
		}
		
		var dx = Math.max(inset, Math.min(w, parseFloat(mxUtils.getValue(this.style, 'dx', this.dx))));
		var dy = Math.max(inset, Math.min(h, parseFloat(mxUtils.getValue(this.style, 'dy', this.dy))));
		
		c.begin();
		c.moveTo(x, y + dy);
		c.lineTo(x + w, y + dy);
		c.end();
		c.stroke();
		
		c.begin();
		c.moveTo(x + dx, y);
		c.lineTo(x + dx, y + h);
		c.end();
		c.stroke();
	};

	mxCellRenderer.registerShape('internalStorage', InternalStorageShape);

	// Internal storage
	function CornerShape()
	{
		mxActor.call(this);
	};

	mxUtils.extend(CornerShape, mxActor);

	CornerShape.prototype.dx = 20;

	CornerShape.prototype.dy = 20;
	
	// Corner
	CornerShape.prototype.redrawPath = function(c, x, y, w, h)
	{
		var dx = Math.max(0, Math.min(w, parseFloat(mxUtils.getValue(this.style, 'dx', this.dx))));
		var dy = Math.max(0, Math.min(h, parseFloat(mxUtils.getValue(this.style, 'dy', this.dy))));
		
		var s = Math.min(w / 2, Math.min(h, parseFloat(mxUtils.getValue(this.style, 'size', this.size))));
		var arcSize = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2;
		this.addPoints(c, [new mxPoint(0, 0), new mxPoint(w, 0), new mxPoint(w, dy), new mxPoint(dx, dy),
		                   new mxPoint(dx, h), new mxPoint(0, h)], this.isRounded, arcSize, true);
		c.end();
	};

	mxCellRenderer.registerShape('corner', CornerShape);

	// Crossbar shape
	function CrossbarShape()
	{
		mxActor.call(this);
	};

	mxUtils.extend(CrossbarShape, mxActor);
	
	CrossbarShape.prototype.redrawPath = function(c, x, y, w, h)
	{
		c.moveTo(0, 0);
		c.lineTo(0, h);
		c.end();
		
		c.moveTo(w, 0);
		c.lineTo(w, h);
		c.end();
		
		c.moveTo(0, h / 2);
		c.lineTo(w, h / 2);
		c.end();
	};

	mxCellRenderer.registerShape('crossbar', CrossbarShape);

	// Internal storage
	function TeeShape()
	{
		mxActor.call(this);
	};

	mxUtils.extend(TeeShape, mxActor);

	TeeShape.prototype.dx = 20;

	TeeShape.prototype.dy = 20;
	
	// Corner
	TeeShape.prototype.redrawPath = function(c, x, y, w, h)
	{
		var dx = Math.max(0, Math.min(w, parseFloat(mxUtils.getValue(this.style, 'dx', this.dx))));
		var dy = Math.max(0, Math.min(h, parseFloat(mxUtils.getValue(this.style, 'dy', this.dy))));
		var w2 = Math.abs(w - dx) / 2;
		
		var s = Math.min(w / 2, Math.min(h, parseFloat(mxUtils.getValue(this.style, 'size', this.size))));
		var arcSize = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2;
		this.addPoints(c, [new mxPoint(0, 0), new mxPoint(w, 0), new mxPoint(w, dy), new mxPoint((w + dx) / 2, dy),
		                   new mxPoint((w + dx) / 2, h), new mxPoint((w - dx) / 2, h), new mxPoint((w - dx) / 2, dy),
		                   new mxPoint(0, dy)], this.isRounded, arcSize, true);
		c.end();
	};

	mxCellRenderer.registerShape('tee', TeeShape);

	// Arrow
	function SingleArrowShape()
	{
		mxActor.call(this);
	};

	mxUtils.extend(SingleArrowShape, mxActor);

	SingleArrowShape.prototype.arrowWidth = 0.3;

	SingleArrowShape.prototype.arrowSize = 0.2;

	SingleArrowShape.prototype.redrawPath = function(c, x, y, w, h)
	{
		var aw = h * Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'arrowWidth', this.arrowWidth))));
		var as = w * Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'arrowSize', this.arrowSize))));
		var at = (h - aw) / 2;
		var ab = at + aw;
		
		var arcSize = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2;
		this.addPoints(c, [new mxPoint(0, at), new mxPoint(w - as, at), new mxPoint(w - as, 0), new mxPoint(w, h / 2),
		                   new mxPoint(w - as, h), new mxPoint(w - as, ab), new mxPoint(0, ab)],
		                   this.isRounded, arcSize, true);
		c.end();
	};

	mxCellRenderer.registerShape('singleArrow', SingleArrowShape);

	// Arrow
	function DoubleArrowShape()
	{
		mxActor.call(this);
	};

	mxUtils.extend(DoubleArrowShape, mxActor);

	DoubleArrowShape.prototype.redrawPath = function(c, x, y, w, h)
	{
		var aw = h * Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'arrowWidth', SingleArrowShape.prototype.arrowWidth))));
		var as = w * Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'arrowSize', SingleArrowShape.prototype.arrowSize))));
		var at = (h - aw) / 2;
		var ab = at + aw;
		
		var arcSize = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2;
		this.addPoints(c, [new mxPoint(0, h / 2), new mxPoint(as, 0), new mxPoint(as, at), new mxPoint(w - as, at),
		                   new mxPoint(w - as, 0), new mxPoint(w, h / 2), new mxPoint(w - as, h),
		                   new mxPoint(w - as, ab), new mxPoint(as, ab), new mxPoint(as, h)],
		                   this.isRounded, arcSize, true);
		c.end();
	};

	mxCellRenderer.registerShape('doubleArrow', DoubleArrowShape);

	// Data storage
	function DataStorageShape()
	{
		mxActor.call(this);
	};

	mxUtils.extend(DataStorageShape, mxActor);

	DataStorageShape.prototype.size = 0.1;

	DataStorageShape.prototype.fixedSize = 20;

	DataStorageShape.prototype.redrawPath = function(c, x, y, w, h)
	{
		var fixed = mxUtils.getValue(this.style, 'fixedSize', '0') != '0';
		var s = (fixed) ? Math.max(0, Math.min(w, parseFloat(mxUtils.getValue(this.style, 'size', this.fixedSize)))) :
			w * Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'size', this.size))));
		
		c.moveTo(s, 0);
		c.lineTo(w, 0);
		c.quadTo(w - s * 2, h / 2, w, h);
		c.lineTo(s, h);
		c.quadTo(s - s * 2, h / 2, s, 0);
		c.close();
		c.end();
	};

	mxCellRenderer.registerShape('dataStorage', DataStorageShape);

	// Or
	function OrShape()
	{
		mxActor.call(this);
	};

	mxUtils.extend(OrShape, mxActor);

	OrShape.prototype.redrawPath = function(c, x, y, w, h)
	{
		c.moveTo(0, 0);
		c.quadTo(w, 0, w, h / 2);
		c.quadTo(w, h, 0, h);
		c.close();
		c.end();
	};

	mxCellRenderer.registerShape('or', OrShape);

	// Xor
	function XorShape()
	{
		mxActor.call(this);
	};

	mxUtils.extend(XorShape, mxActor);

	XorShape.prototype.redrawPath = function(c, x, y, w, h)
	{
		c.moveTo(0, 0);
		c.quadTo(w, 0, w, h / 2);
		c.quadTo(w, h, 0, h);
		c.quadTo(w / 2, h / 2, 0, 0);
		c.close();
		c.end();
	};

	mxCellRenderer.registerShape('xor', XorShape);

	// Loop limit
	function LoopLimitShape()
	{
		mxActor.call(this);
	};

	mxUtils.extend(LoopLimitShape, mxActor);

	LoopLimitShape.prototype.size = 20;

	LoopLimitShape.prototype.isRoundable = function()
	{
		return true;
	};

	LoopLimitShape.prototype.redrawPath = function(c, x, y, w, h)
	{
		var s = Math.min(w / 2, Math.min(h, parseFloat(mxUtils.getValue(this.style, 'size', this.size))));
		var arcSize = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2;
		this.addPoints(c, [new mxPoint(s, 0), new mxPoint(w - s, 0), new mxPoint(w, s * 0.8), new mxPoint(w, h),
		                   new mxPoint(0, h), new mxPoint(0, s * 0.8)], this.isRounded, arcSize, true);
		c.end();
	};

	mxCellRenderer.registerShape('loopLimit', LoopLimitShape);

	// Off page connector
	function OffPageConnectorShape()
	{
		mxActor.call(this);
	};

	mxUtils.extend(OffPageConnectorShape, mxActor);

	OffPageConnectorShape.prototype.size = 3 / 8;

	OffPageConnectorShape.prototype.isRoundable = function()
	{
		return true;
	};
	OffPageConnectorShape.prototype.redrawPath = function(c, x, y, w, h)
	{
		var s = h * Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'size', this.size))));
		var arcSize = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2;
		this.addPoints(c, [new mxPoint(0, 0), new mxPoint(w, 0), new mxPoint(w, h - s), new mxPoint(w / 2, h),
		                   new mxPoint(0, h - s)], this.isRounded, arcSize, true);
		c.end();
	};

	mxCellRenderer.registerShape('offPageConnector', OffPageConnectorShape);

	// Internal storage
	function TapeDataShape()
	{
		mxEllipse.call(this);
	};

	mxUtils.extend(TapeDataShape, mxEllipse);

	TapeDataShape.prototype.paintVertexShape = function(c, x, y, w, h)
	{
		mxEllipse.prototype.paintVertexShape.apply(this, arguments);
		
		c.begin();
		c.moveTo(x + w / 2, y + h);
		c.lineTo(x + w, y + h);
		c.end();
		c.stroke();
	};

	mxCellRenderer.registerShape('tapeData', TapeDataShape);

	// OrEllipseShape
	function OrEllipseShape()
	{
		mxEllipse.call(this);
	};

	mxUtils.extend(OrEllipseShape, mxEllipse);

	OrEllipseShape.prototype.paintVertexShape = function(c, x, y, w, h)
	{
		mxEllipse.prototype.paintVertexShape.apply(this, arguments);
		
		c.setShadow(false);
		c.begin();
		c.moveTo(x, y + h / 2);
		c.lineTo(x + w, y + h / 2);
		c.end();
		c.stroke();
		
		c.begin();
		c.moveTo(x + w / 2, y);
		c.lineTo(x + w / 2, y + h);
		c.end();
		c.stroke();
	};

	mxCellRenderer.registerShape('orEllipse', OrEllipseShape);

	// SumEllipseShape
	function SumEllipseShape()
	{
		mxEllipse.call(this);
	};

	mxUtils.extend(SumEllipseShape, mxEllipse);

	SumEllipseShape.prototype.paintVertexShape = function(c, x, y, w, h)
	{
		mxEllipse.prototype.paintVertexShape.apply(this, arguments);
		var s2 = 0.145;
		
		c.setShadow(false);
		c.begin();
		c.moveTo(x + w * s2, y + h * s2);
		c.lineTo(x + w * (1 - s2), y + h * (1 - s2));
		c.end();
		c.stroke();
		
		c.begin();
		c.moveTo(x + w * (1 - s2), y + h * s2);
		c.lineTo(x + w * s2, y + h * (1 - s2));
		c.end();
		c.stroke();
	};

	mxCellRenderer.registerShape('sumEllipse', SumEllipseShape);

	// SortShape
	function SortShape()
	{
		mxRhombus.call(this);
	};

	mxUtils.extend(SortShape, mxRhombus);

	SortShape.prototype.paintVertexShape = function(c, x, y, w, h)
	{
		mxRhombus.prototype.paintVertexShape.apply(this, arguments);
		
		c.setShadow(false);
		c.begin();
		c.moveTo(x, y + h / 2);
		c.lineTo(x + w, y + h / 2);
		c.end();
		c.stroke();
	};

	mxCellRenderer.registerShape('sortShape', SortShape);

	// CollateShape
	function CollateShape()
	{
		mxEllipse.call(this);
	};

	mxUtils.extend(CollateShape, mxEllipse);

	CollateShape.prototype.paintVertexShape = function(c, x, y, w, h)
	{
		c.begin();
		c.moveTo(x, y);
		c.lineTo(x + w, y);
		c.lineTo(x + w / 2, y + h / 2);
		c.close();
		c.fillAndStroke();
		
		c.begin();
		c.moveTo(x, y + h);
		c.lineTo(x + w, y + h);
		c.lineTo(x + w / 2, y + h / 2);
		c.close();
		c.fillAndStroke();
	};

	mxCellRenderer.registerShape('collate', CollateShape);

	// DimensionShape
	function DimensionShape()
	{
		mxEllipse.call(this);
	};

	mxUtils.extend(DimensionShape, mxEllipse);

	DimensionShape.prototype.paintVertexShape = function(c, x, y, w, h)
	{
		var sw = c.state.strokeWidth / 2;
		// Arrow size
		var al = 10 + 2 * sw;
		var cy = y + h - al / 2;
		
		c.begin();
		c.moveTo(x, y);
		c.lineTo(x, y + h);
		c.moveTo(x + sw, cy);
		c.lineTo(x + sw + al, cy - al / 2);
		c.moveTo(x + sw, cy);
		c.lineTo(x + sw + al, cy + al / 2);
		c.moveTo(x + sw, cy);
		c.lineTo(x + w - sw, cy);

		// Opposite side
		c.moveTo(x + w, y);
		c.lineTo(x + w, y + h);
		c.moveTo(x + w - sw, cy);
		c.lineTo(x + w - al - sw, cy - al / 2);
		c.moveTo(x + w - sw, cy);
		c.lineTo(x + w - al - sw, cy + al / 2);
		c.end();
		c.stroke();
	};

	mxCellRenderer.registerShape('dimension', DimensionShape);

	// PartialRectangleShape
	function PartialRectangleShape()
	{
		mxEllipse.call(this);
	};

	mxUtils.extend(PartialRectangleShape, mxEllipse);

	PartialRectangleShape.prototype.drawHidden = true;

	PartialRectangleShape.prototype.paintVertexShape = function(c, x, y, w, h)
	{
		if (!this.outline)
		{
			c.setStrokeColor(null);
		}

		if (this.style != null)
		{
			var pointerEvents = c.pointerEvents;
			var filled = this.fill != null && this.fill != mxConstants.NONE;
			var events = mxUtils.getValue(this.style, mxConstants.STYLE_POINTER_EVENTS, '1') == '1';
			
			if (!events && !filled)
			{
				c.pointerEvents = false;
			}

			var top = mxUtils.getValue(this.style, 'top', '1') == '1';
			var left = mxUtils.getValue(this.style, 'left', '1') == '1';
			var right = mxUtils.getValue(this.style, 'right', '1') == '1';
			var bottom = mxUtils.getValue(this.style, 'bottom', '1') == '1';

			if (this.drawHidden || filled || this.outline || top || right || bottom || left)
			{
				c.rect(x, y, w, h);
				c.fill();

				c.pointerEvents = pointerEvents;
				c.setStrokeColor(this.stroke);
				c.setLineCap('square');
				c.begin();
				c.moveTo(x, y);
				
				if (this.outline || top)
				{
					c.lineTo(x + w, y);
				}
				else
				{
					c.moveTo(x + w, y);
				}
				
				if (this.outline || right)
				{
					c.lineTo(x + w, y + h);
				}
				else
				{
					c.moveTo(x + w, y + h);
				}
				
				if (this.outline || bottom)
				{
					c.lineTo(x, y + h);
				}
				else
				{
					c.moveTo(x, y + h);
				}
				
				if (this.outline || left)
				{
					c.lineTo(x, y);
				}
				
				c.end();
				c.stroke();
				c.setLineCap('flat');
			}
			else
			{
				c.setStrokeColor(this.stroke);
			}
		}
	};

	mxCellRenderer.registerShape('partialRectangle', PartialRectangleShape);

	// LineEllipseShape
	function LineEllipseShape()
	{
		mxEllipse.call(this);
	};

	mxUtils.extend(LineEllipseShape, mxEllipse);

	LineEllipseShape.prototype.paintVertexShape = function(c, x, y, w, h)
	{
		mxEllipse.prototype.paintVertexShape.apply(this, arguments);
		
		c.setShadow(false);
		c.begin();
		
		if (mxUtils.getValue(this.style, 'line') == 'vertical')
		{
			c.moveTo(x + w / 2, y);
			c.lineTo(x + w / 2, y + h);
		}
		else
		{
			c.moveTo(x, y + h / 2);
			c.lineTo(x + w, y + h / 2);
		}

		c.end();			
		c.stroke();
	};

	mxCellRenderer.registerShape('lineEllipse', LineEllipseShape);

	// Delay
	function DelayShape()
	{
		mxActor.call(this);
	};

	mxUtils.extend(DelayShape, mxActor);

	DelayShape.prototype.redrawPath = function(c, x, y, w, h)
	{
		var dx = Math.min(w, h / 2);
		c.moveTo(0, 0);
		c.lineTo(w - dx, 0);
		c.quadTo(w, 0, w, h / 2);
		c.quadTo(w, h, w - dx, h);
		c.lineTo(0, h);
		c.close();
		c.end();
	};

	mxCellRenderer.registerShape('delay', DelayShape);

	// Cross Shape
	function CrossShape()
	{
		mxActor.call(this);
	};

	mxUtils.extend(CrossShape, mxActor);

	CrossShape.prototype.size = 0.2;

	CrossShape.prototype.redrawPath = function(c, x, y, w, h)
	{
		var m = Math.min(h, w);
		var size = Math.max(0, Math.min(m, m * parseFloat(mxUtils.getValue(this.style, 'size', this.size))));
		var t = (h - size) / 2;
		var b = t + size;
		var l = (w - size) / 2;
		var r = l + size;
		
		c.moveTo(0, t);
		c.lineTo(l, t);
		c.lineTo(l, 0);
		c.lineTo(r, 0);
		c.lineTo(r, t);
		c.lineTo(w, t);
		c.lineTo(w, b);
		c.lineTo(r, b);
		c.lineTo(r, h);
		c.lineTo(l, h);
		c.lineTo(l, b);
		c.lineTo(0, b);
		c.close();
		c.end();
	};

	mxCellRenderer.registerShape('cross', CrossShape);

	// Display
	function DisplayShape()
	{
		mxActor.call(this);
	};

	mxUtils.extend(DisplayShape, mxActor);

	DisplayShape.prototype.size = 0.25;

	DisplayShape.prototype.redrawPath = function(c, x, y, w, h)
	{
		var dx = Math.min(w, h / 2);
		var s = Math.min(w - dx, Math.max(0, parseFloat(mxUtils.getValue(this.style, 'size', this.size))) * w);
		
		c.moveTo(0, h / 2);
		c.lineTo(s, 0);
		c.lineTo(w - dx, 0);
		c.quadTo(w, 0, w, h / 2);
		c.quadTo(w, h, w - dx, h);
		c.lineTo(s, h);
		c.close();
		c.end();
	};

	mxCellRenderer.registerShape('display', DisplayShape);

	//**********************************************************************************************************************************************************
	//Rectangle v2
	//**********************************************************************************************************************************************************
	/**
	* Extends mxShape.
	*/
	function mxShapeBasicRect2(bounds, fill, stroke, strokewidth)
	{
		mxShape.call(this);
		this.bounds = bounds;
		this.fill = fill;
		this.stroke = stroke;
		this.strokewidth = (strokewidth != null) ? strokewidth : 1;
		this.rectStyle = 'square';
		this.size = 10;
		this.absoluteCornerSize = true;
		this.indent = 2;
		this.rectOutline = 'single';
	};

	/**
	* Extends mxShape.
	*/
	mxUtils.extend(mxShapeBasicRect2, mxActor);

	mxShapeBasicRect2.prototype.cst = {RECT2 : 'mxgraph.basic.rect'};

	mxShapeBasicRect2.prototype.customProperties = [
		{name: 'rectStyle', dispName: 'Style', type: 'enum', defVal:'square',
			enumList:[
				{val:'square', dispName:'Square'},
				{val:'rounded', dispName:'Round'},
				{val:'snip', dispName:'Snip'},
				{val:'invRound', dispName:'Inv. Round'},
				{val:'fold', dispName:'Fold'}
			]},
		{name: 'size', dispName: 'Corner Size', type: 'float', defVal:10},
		{name: 'absoluteCornerSize', dispName: 'Abs. Corner Size', type: 'bool', defVal:true},
		{name: 'indent', dispName:'Indent', type:'float', defVal:2},
		{name: 'rectOutline', dispName: 'Outline', type: 'enum', defVal:'single',
			enumList:[
				{val:'single', dispName:'Single'},
				{val:'double', dispName:'Double'},
				{val:'frame', dispName:'Frame'}
			]},
		{name: 'fillColor2', dispName:'Inside Fill Color', type:'color', defVal:'none'},
		{name: 'gradientColor2', dispName:'Inside Gradient Color', type:'color', defVal:'none'},
		{name: 'gradientDirection2', dispName: 'Inside Gradient Direction', type: 'enum', defVal:'south',
			enumList:[
				{val:'south', dispName:'South'},
				{val:'west', dispName:'West'},
				{val:'north', dispName:'North'},
				{val:'east', dispName:'East'}
		]},
		{name: 'top', dispName:'Top Line', type:'bool', defVal:true},
		{name: 'right', dispName:'Right', type:'bool', defVal:true},
		{name: 'bottom', dispName:'Bottom Line', type:'bool', defVal:true},
		{name: 'left', dispName:'Left ', type:'bool', defVal:true},
		{name: 'topLeftStyle', dispName: 'Top Left Style', type: 'enum', defVal:'default',
		enumList:[
			{val:'default', dispName:'Default'},
			{val:'square', dispName:'Square'},
			{val:'rounded', dispName:'Round'},
			{val:'snip', dispName:'Snip'},
			{val:'invRound', dispName:'Inv. Round'},
			{val:'fold', dispName:'Fold'}
		]},
		{name: 'topRightStyle', dispName: 'Top Right Style', type: 'enum', defVal:'default',
			enumList:[
				{val:'default', dispName:'Default'},
				{val:'square', dispName:'Square'},
				{val:'rounded', dispName:'Round'},
				{val:'snip', dispName:'Snip'},
				{val:'invRound', dispName:'Inv. Round'},
				{val:'fold', dispName:'Fold'}
		]},
		{name: 'bottomRightStyle', dispName: 'Bottom Right Style', type: 'enum', defVal:'default',
			enumList:[
				{val:'default', dispName:'Default'},
				{val:'square', dispName:'Square'},
				{val:'rounded', dispName:'Round'},
				{val:'snip', dispName:'Snip'},
				{val:'invRound', dispName:'Inv. Round'},
				{val:'fold', dispName:'Fold'}
		]},
		{name: 'bottomLeftStyle', dispName: 'Bottom Left Style', type: 'enum', defVal:'default',
			enumList:[
				{val:'default', dispName:'Default'},
				{val:'square', dispName:'Square'},
				{val:'rounded', dispName:'Round'},
				{val:'snip', dispName:'Snip'},
				{val:'invRound', dispName:'Inv. Round'},
				{val:'fold', dispName:'Fold'}
		]},
	];

	/**
	* Function: paintVertexShape
	* 
	* Paints the vertex shape.
	*/
	mxShapeBasicRect2.prototype.paintVertexShape = function(c, x, y, w, h)
	{
		c.translate(x, y);
		this.strictDrawShape(c, 0, 0, w, h);
	}

	//
	mxShapeBasicRect2.prototype.strictDrawShape = function(c, x, y, w, h, os)
	{
		// read styles or optionally override them externally via "os" variable
		var rectStyle =	(os && os.rectStyle) ? os.rectStyle : mxUtils.getValue(this.style, 'rectStyle', this.rectStyle);
		var absoluteCornerSize = (os && os.absoluteCornerSize) ? os.absoluteCornerSize : mxUtils.getValue(this.style, 'absoluteCornerSize', this.absoluteCornerSize);
		var size =	(os && os.size) ? os.size : Math.max(0, Math.min(w, parseFloat(mxUtils.getValue(this.style, 'size', this.size))));
		var rectOutline = (os && os.rectOutline) ? os.rectOutline : mxUtils.getValue(this.style, 'rectOutline', this.rectOutline);
		var indent = (os && os.indent) ? os.indent : Math.max(0, Math.min(w, parseFloat(mxUtils.getValue(this.style, 'indent', this.indent))));
		var dashed = (os && os.dashed) ? os.dashed : mxUtils.getValue(this.style, 'dashed', false);
		var dashPattern = (os && os.dashPattern) ? os.dashPattern : mxUtils.getValue(this.style, 'dashPattern', null);
		var relIndent = (os && os.relIndent) ? os.relIndent : Math.max(0, Math.min(50, indent));
		var top = (os && os.top) ? os.top : mxUtils.getValue(this.style, 'top', true);
		var right = (os && os.right) ? os.right : mxUtils.getValue(this.style, 'right', true);
		var bottom = (os && os.bottom) ? os.bottom : mxUtils.getValue(this.style, 'bottom', true);
		var left = (os && os.left) ? os.left : mxUtils.getValue(this.style, 'left', true);
		var topLeftStyle = (os && os.topLeftStyle) ? os.topLeftStyle : mxUtils.getValue(this.style, 'topLeftStyle', 'default');
		var topRightStyle = (os && os.topRightStyle) ? os.topRightStyle : mxUtils.getValue(this.style, 'topRightStyle', 'default');
		var bottomRightStyle = (os && os.bottomRightStyle) ? os.bottomRightStyle : mxUtils.getValue(this.style, 'bottomRightStyle', 'default');
		var bottomLeftStyle = (os && os.bottomLeftStyle) ? os.bottomLeftStyle : mxUtils.getValue(this.style, 'bottomLeftStyle', 'default');
		var fillColor = (os && os.fillColor) ? os.fillColor : mxUtils.getValue(this.style, 'fillColor', '#ffffff');
		var strokeColor = (os && os.strokeColor) ? os.strokeColor : mxUtils.getValue(this.style, 'strokeColor', '#000000');
		var strokeWidth = (os && os.strokeWidth) ? os.strokeWidth : mxUtils.getValue(this.style, 'strokeWidth', '1');
		var fillColor2 = (os && os.fillColor2) ? os.fillColor2 : mxUtils.getValue(this.style, 'fillColor2', 'none');
		var gradientColor2 = (os && os.gradientColor2) ? os.gradientColor2 : mxUtils.getValue(this.style, 'gradientColor2', 'none');
		var gdir2 = (os && os.gradientDirection2) ? os.gradientDirection2 : mxUtils.getValue(this.style, 'gradientDirection2', 'south');
		var opacity = (os && os.opacity) ? os.opacity : mxUtils.getValue(this.style, 'opacity', '100');
		
		var relSize = Math.max(0, Math.min(50, size));
		var sc = mxShapeBasicRect2.prototype;
		
		c.setDashed(dashed);
		
		if (dashPattern && dashPattern != '')
		{
			c.setDashPattern(dashPattern);
		}
		
		c.setStrokeWidth(strokeWidth);
		
		size = Math.min(h * 0.5, w * 0.5, size);
		
		if (!absoluteCornerSize)
		{
			size = relSize * Math.min(w, h) / 100;
		}
		
		size = Math.min(size, Math.min(w, h) * 0.5);
		
		if (!absoluteCornerSize)
		{
			indent = Math.min(relIndent * Math.min(w, h) / 100);
		}

		indent = Math.min(indent, Math.min(w, h) * 0.5 - size);
		
		if ((top || right || bottom || left) && rectOutline != 'frame')
		{
			
			//outline fill
			c.begin();
			if (!top)
			{
				c.moveTo(0,0);
			}
			else
			{
				sc.moveNW(c, x, y, w, h, rectStyle, topLeftStyle, size, left);
			}
			
			if (top)
			{
				sc.paintNW(c, x, y, w, h, rectStyle, topLeftStyle, size, left);
			}

			sc.paintTop(c, x, y, w, h, rectStyle, topRightStyle, size, right);
			
			if (right)
			{
				sc.paintNE(c, x, y, w, h, rectStyle, topRightStyle, size, top);
			}

			sc.paintRight(c, x, y, w, h, rectStyle, bottomRightStyle, size, bottom);
			
			if (bottom)
			{
				sc.paintSE(c, x, y, w, h, rectStyle, bottomRightStyle, size, right);
			}
			
			sc.paintBottom(c, x, y, w, h, rectStyle, bottomLeftStyle, size, left);
			
			if (left)
			{
				sc.paintSW(c, x, y, w, h, rectStyle, bottomLeftStyle, size, bottom);
			}

			sc.paintLeft(c, x, y, w, h, rectStyle, topLeftStyle, size, top);
			c.close();
			c.fill();

			c.setShadow(false);

			//inner fill
			c.setFillColor(fillColor2);
			var op1 = opacity;
			var op2 = opacity;
			
			if (fillColor2 == 'none')
			{
				op1 = 0;
			}
			
			if (gradientColor2 == 'none')
			{
				op2 = 0;
			}
			
			c.setGradient(fillColor2, gradientColor2, 0, 0, w, h, gdir2, op1, op2);
			
			c.begin();

			if (!top)
			{
				c.moveTo(indent,0);
			}
			else
			{
				sc.moveNWInner(c, x, y, w, h, rectStyle, topLeftStyle, size, indent, top, left);
			}

			sc.paintLeftInner(c, x, y, w, h, rectStyle, bottomLeftStyle, size, indent, bottom, left);
			
			if (left && bottom)
			{
				sc.paintSWInner(c, x, y, w, h, rectStyle, bottomLeftStyle, size, indent, bottom);
			}

			sc.paintBottomInner(c, x, y, w, h, rectStyle, bottomRightStyle, size, indent, right, bottom);
			
			if (bottom && right)
			{
				sc.paintSEInner(c, x, y, w, h, rectStyle, bottomRightStyle, size, indent);
			}
			
			sc.paintRightInner(c, x, y, w, h, rectStyle, topRightStyle, size, indent, top, right);
			
			if (right && top)
			{
				sc.paintNEInner(c, x, y, w, h, rectStyle, topRightStyle, size, indent);
			}

			sc.paintTopInner(c, x, y, w, h, rectStyle, topLeftStyle, size, indent, left, top);
			
			if (top && left)
			{
				sc.paintNWInner(c, x, y, w, h, rectStyle, topLeftStyle, size, indent);
			}

			c.fill();

			if (fillColor == 'none')
			{
				c.begin();
				sc.paintFolds(c, x, y, w, h, rectStyle, topLeftStyle, topRightStyle, bottomRightStyle, bottomLeftStyle, size, top, right, bottom, left);
				c.stroke();
			}
		}

		//draw all the combinations
		if (!top && !right && !bottom && left)
		{
			
			if (rectOutline != 'frame')
			{
				c.begin();
				sc.moveSW(c, x, y, w, h, rectStyle, topLeftStyle, size, bottom);
				sc.paintLeft(c, x, y, w, h, rectStyle, topLeftStyle, size, top);

				if (rectOutline == 'double')
				{
					sc.moveNWInner(c, x, y, w, h, rectStyle, topLeftStyle, size, indent, top, left);
					sc.paintLeftInner(c, x, y, w, h, rectStyle, bottomLeftStyle, size, indent, bottom, left);
				}
				
				c.stroke();
			}
			else
			{
				c.begin();
				sc.moveSW(c, x, y, w, h, rectStyle, topLeftStyle, size, bottom);
				sc.paintLeft(c, x, y, w, h, rectStyle, topLeftStyle, size, top);
				sc.lineNWInner(c, x, y, w, h, rectStyle, topLeftStyle, size, indent, top, left);
				sc.paintLeftInner(c, x, y, w, h, rectStyle, bottomLeftStyle, size, indent, bottom, left);
				c.close();
				c.fillAndStroke();
			}
		}
		else if (!top && !right && bottom && !left)
		{
			if (rectOutline != 'frame')
			{
				c.begin();
				sc.moveSE(c, x, y, w, h, rectStyle, bottomRightStyle, size, right);
				sc.paintBottom(c, x, y, w, h, rectStyle, bottomLeftStyle, size, left);
		
				if (rectOutline == 'double')
				{
					sc.moveSWInner(c, x, y, w, h, rectStyle, bottomLeftStyle, size, indent, left);
					sc.paintBottomInner(c, x, y, w, h, rectStyle, bottomRightStyle, size, indent, right, bottom);
				}
				
				c.stroke();
			}
			else
			{
				c.begin();
				sc.moveSE(c, x, y, w, h, rectStyle, bottomRightStyle, size, right);
				sc.paintBottom(c, x, y, w, h, rectStyle, bottomLeftStyle, size, left);
				sc.lineSWInner(c, x, y, w, h, rectStyle, bottomLeftStyle, size, indent, left);
				sc.paintBottomInner(c, x, y, w, h, rectStyle, bottomRightStyle, size, indent, right, bottom);
				c.close();
				c.fillAndStroke();
			}
		}
		else if (!top && !right && bottom && left)
		{
			if (rectOutline != 'frame')
			{
				c.begin();
				sc.moveSE(c, x, y, w, h, rectStyle, bottomRightStyle, size, right);
				sc.paintBottom(c, x, y, w, h, rectStyle, bottomLeftStyle, size, left);
				sc.paintSW(c, x, y, w, h, rectStyle, bottomLeftStyle, size, bottom);
				sc.paintLeft(c, x, y, w, h, rectStyle, topLeftStyle, size, top);
		
				if (rectOutline == 'double')
				{
					sc.moveNWInner(c, x, y, w, h, rectStyle, topLeftStyle, size, indent, top, left);
					sc.paintLeftInner(c, x, y, w, h, rectStyle, bottomLeftStyle, size, indent, bottom, left);
					sc.paintSWInner(c, x, y, w, h, rectStyle, bottomLeftStyle, size, indent, bottom);
					sc.paintBottomInner(c, x, y, w, h, rectStyle, bottomRightStyle, size, indent, right, bottom);
				}
				
				c.stroke();
			}
			else
			{
				c.begin();
				sc.moveSE(c, x, y, w, h, rectStyle, bottomRightStyle, size, right);
				sc.paintBottom(c, x, y, w, h, rectStyle, bottomLeftStyle, size, left);
				sc.paintSW(c, x, y, w, h, rectStyle, bottomLeftStyle, size, bottom);
				sc.paintLeft(c, x, y, w, h, rectStyle, topLeftStyle, size, top);
				sc.lineNWInner(c, x, y, w, h, rectStyle, topLeftStyle, size, indent, top, left);
				sc.paintLeftInner(c, x, y, w, h, rectStyle, bottomLeftStyle, size, indent, bottom, left);
				sc.paintSWInner(c, x, y, w, h, rectStyle, bottomLeftStyle, size, indent, bottom);
				sc.paintBottomInner(c, x, y, w, h, rectStyle, bottomRightStyle, size, indent, right, bottom);
				c.close();
				c.fillAndStroke();
			}
		}
		else if (!top && right && !bottom && !left)
		{
			if (rectOutline != 'frame')
			{
				c.begin();
				sc.moveNE(c, x, y, w, h, rectStyle, topRightStyle, size, top);
				sc.paintRight(c, x, y, w, h, rectStyle, bottomRightStyle, size, bottom);
		
				if (rectOutline == 'double')
				{
					sc.moveSEInner(c, x, y, w, h, rectStyle, bottomRightStyle, size, indent, bottom);
					sc.paintRightInner(c, x, y, w, h, rectStyle, topRightStyle, size, indent, top, right);
				}
				
				c.stroke();
			}
			else
			{
				c.begin();
				sc.moveNE(c, x, y, w, h, rectStyle, topRightStyle, size, top);
				sc.paintRight(c, x, y, w, h, rectStyle, bottomRightStyle, size, bottom);
				sc.lineSEInner(c, x, y, w, h, rectStyle, bottomRightStyle, size, indent, bottom);
				sc.paintRightInner(c, x, y, w, h, rectStyle, topRightStyle, size, indent, top, right);
				c.close();
				c.fillAndStroke();
			}
		}
		else if (!top && right && !bottom && left)
		{
			if (rectOutline != 'frame')
			{
				c.begin();
				sc.moveSW(c, x, y, w, h, rectStyle, topLeftStyle, size, bottom);
				sc.paintLeft(c, x, y, w, h, rectStyle, topLeftStyle, size, top);
		
				if (rectOutline == 'double')
				{
					sc.moveNWInner(c, x, y, w, h, rectStyle, topLeftStyle, size, indent, top, left);
					sc.paintLeftInner(c, x, y, w, h, rectStyle, bottomLeftStyle, size, indent, bottom, left);
				}
				
				c.stroke();
				
				c.begin();
				sc.moveNE(c, x, y, w, h, rectStyle, topRightStyle, size, top);
				sc.paintRight(c, x, y, w, h, rectStyle, bottomRightStyle, size, bottom);
		
				if (rectOutline == 'double')
				{
					sc.moveSEInner(c, x, y, w, h, rectStyle, bottomRightStyle, size, indent, bottom);
					sc.paintRightInner(c, x, y, w, h, rectStyle, topRightStyle, size, indent, top, right);
				}
				
				c.stroke();
			}
			else
			{
				c.begin();
				sc.moveSW(c, x, y, w, h, rectStyle, topLeftStyle, size, bottom);
				sc.paintLeft(c, x, y, w, h, rectStyle, topLeftStyle, size, top);
				sc.lineNWInner(c, x, y, w, h, rectStyle, topLeftStyle, size, indent, top, left);
				sc.paintLeftInner(c, x, y, w, h, rectStyle, bottomLeftStyle, size, indent, bottom, left);
				c.close();
				c.fillAndStroke();
				
				c.begin();
				sc.moveNE(c, x, y, w, h, rectStyle, topRightStyle, size, top);
				sc.paintRight(c, x, y, w, h, rectStyle, bottomRightStyle, size, bottom);
				sc.lineSEInner(c, x, y, w, h, rectStyle, bottomRightStyle, size, indent, bottom);
				sc.paintRightInner(c, x, y, w, h, rectStyle, topRightStyle, size, indent, top, right);
				c.close();
				c.fillAndStroke();
			}
		}
		else if (!top && right && bottom && !left)
		{
			if (rectOutline != 'frame')
			{
				c.begin();
				sc.moveNE(c, x, y, w, h, rectStyle, topRightStyle, size, top);
				sc.paintRight(c, x, y, w, h, rectStyle, bottomRightStyle, size, bottom);
				sc.paintSE(c, x, y, w, h, rectStyle, bottomRightStyle, size, right);
				sc.paintBottom(c, x, y, w, h, rectStyle, bottomLeftStyle, size, left);

				if (rectOutline == 'double')
				{
					sc.moveSWInner(c, x, y, w, h, rectStyle, bottomLeftStyle, size, indent, left);
					sc.paintBottomInner(c, x, y, w, h, rectStyle, bottomRightStyle, size, indent, right, bottom);
					sc.paintSEInner(c, x, y, w, h, rectStyle, bottomRightStyle, size, indent);
					sc.paintRightInner(c, x, y, w, h, rectStyle, topRightStyle, size, indent, top, right);
				}
				
				c.stroke();
			}
			else
			{
				c.begin();
				sc.moveNE(c, x, y, w, h, rectStyle, topRightStyle, size, top);
				sc.paintRight(c, x, y, w, h, rectStyle, bottomRightStyle, size, bottom);
				sc.paintSE(c, x, y, w, h, rectStyle, bottomRightStyle, size, right);
				sc.paintBottom(c, x, y, w, h, rectStyle, bottomLeftStyle, size, left);
				sc.lineSWInner(c, x, y, w, h, rectStyle, bottomLeftStyle, size, indent, left);
				sc.paintBottomInner(c, x, y, w, h, rectStyle, bottomRightStyle, size, indent, right, bottom);
				sc.paintSEInner(c, x, y, w, h, rectStyle, bottomRightStyle, size, indent);
				sc.paintRightInner(c, x, y, w, h, rectStyle, topRightStyle, size, indent, top, right);
				c.close();
				c.fillAndStroke();
			}
		}
		else if (!top && right && bottom && left)
		{
			if (rectOutline != 'frame')
			{
				c.begin();
				sc.moveNE(c, x, y, w, h, rectStyle, topRightStyle, size, top);
				sc.paintRight(c, x, y, w, h, rectStyle, bottomRightStyle, size, bottom);
				sc.paintSE(c, x, y, w, h, rectStyle, bottomRightStyle, size, right);
				sc.paintBottom(c, x, y, w, h, rectStyle, bottomLeftStyle, size, left);
				sc.paintSW(c, x, y, w, h, rectStyle, bottomLeftStyle, size, bottom);
				sc.paintLeft(c, x, y, w, h, rectStyle, topLeftStyle, size, top);
		
				if (rectOutline == 'double')
				{
					sc.moveNWInner(c, x, y, w, h, rectStyle, topLeftStyle, size, indent, top, left);
					sc.paintLeftInner(c, x, y, w, h, rectStyle, bottomLeftStyle, size, indent, bottom, left);
					sc.paintSWInner(c, x, y, w, h, rectStyle, bottomLeftStyle, size, indent, bottom);
					sc.paintBottomInner(c, x, y, w, h, rectStyle, bottomRightStyle, size, indent, right, bottom);
					sc.paintSEInner(c, x, y, w, h, rectStyle, bottomRightStyle, size, indent);
					sc.paintRightInner(c, x, y, w, h, rectStyle, topRightStyle, size, indent, top, right);
				}
				
				c.stroke();
			}
			else
			{
				c.begin();
				sc.moveNE(c, x, y, w, h, rectStyle, topRightStyle, size, top);
				sc.paintRight(c, x, y, w, h, rectStyle, bottomRightStyle, size, bottom);
				sc.paintSE(c, x, y, w, h, rectStyle, bottomRightStyle, size, right);
				sc.paintBottom(c, x, y, w, h, rectStyle, bottomLeftStyle, size, left);
				sc.paintSW(c, x, y, w, h, rectStyle, bottomLeftStyle, size, bottom);
				sc.paintLeft(c, x, y, w, h, rectStyle, topLeftStyle, size, top);
				sc.lineNWInner(c, x, y, w, h, rectStyle, topLeftStyle, size, indent, top, left);
				sc.paintLeftInner(c, x, y, w, h, rectStyle, bottomLeftStyle, size, indent, bottom, left);
				sc.paintSWInner(c, x, y, w, h, rectStyle, bottomLeftStyle, size, indent, bottom);
				sc.paintBottomInner(c, x, y, w, h, rectStyle, bottomRightStyle, size, indent, right, bottom);
				sc.paintSEInner(c, x, y, w, h, rectStyle, bottomRightStyle, size, indent);
				sc.paintRightInner(c, x, y, w, h, rectStyle, topRightStyle, size, indent, top, right);
				c.close();
				c.fillAndStroke();
			}
		}
		else if (top && !right && !bottom && !left)
		{
			if (rectOutline != 'frame')
			{
				c.begin();
				sc.moveNW(c, x, y, w, h, rectStyle, topLeftStyle, size, left);
				sc.paintTop(c, x, y, w, h, rectStyle, topRightStyle, size, right);
		
				if (rectOutline == 'double')
				{
					sc.moveNEInner(c, x, y, w, h, rectStyle, topRightStyle, size, indent, right);
					sc.paintTopInner(c, x, y, w, h, rectStyle, topLeftStyle, size, indent, left, top);
				}
				
				c.stroke();
			}
			else
			{
				c.begin();
				sc.moveNW(c, x, y, w, h, rectStyle, topLeftStyle, size, left);
				sc.paintTop(c, x, y, w, h, rectStyle, topRightStyle, size, right);
				sc.lineNEInner(c, x, y, w, h, rectStyle, topRightStyle, size, indent, right);
				sc.paintTopInner(c, x, y, w, h, rectStyle, topLeftStyle, size, indent, left, top);
				c.close();
				c.fillAndStroke();
			}
		}
		else if (top && !right && !bottom && left)
		{
			if (rectOutline != 'frame')
			{
				c.begin();
				sc.moveSW(c, x, y, w, h, rectStyle, bottomLeftStyle, size, bottom);
				sc.paintLeft(c, x, y, w, h, rectStyle, topLeftStyle, size, top);
				sc.paintNW(c, x, y, w, h, rectStyle, topLeftStyle, size, left);
				sc.paintTop(c, x, y, w, h, rectStyle, topRightStyle, size, right);
		
				if (rectOutline == 'double')
				{
					sc.moveNEInner(c, x, y, w, h, rectStyle, topRightStyle, size, indent, right);
					sc.paintTopInner(c, x, y, w, h, rectStyle, topLeftStyle, size, indent, left, top);
					sc.paintNWInner(c, x, y, w, h, rectStyle, topLeftStyle, size, indent);
					sc.paintLeftInner(c, x, y, w, h, rectStyle, bottomLeftStyle, size, indent, bottom, left);
				}
				
				c.stroke();
			}
			else
			{
				c.begin();
				sc.moveSW(c, x, y, w, h, rectStyle, bottomLeftStyle, size, bottom);
				sc.paintLeft(c, x, y, w, h, rectStyle, topLeftStyle, size, top);
				sc.paintNW(c, x, y, w, h, rectStyle, topLeftStyle, size, left);
				sc.paintTop(c, x, y, w, h, rectStyle, topRightStyle, size, right);
				sc.lineNEInner(c, x, y, w, h, rectStyle, topRightStyle, size, indent, right);
				sc.paintTopInner(c, x, y, w, h, rectStyle, topLeftStyle, size, indent, left, top);
				sc.paintNWInner(c, x, y, w, h, rectStyle, topLeftStyle, size, indent);
				sc.paintLeftInner(c, x, y, w, h, rectStyle, bottomLeftStyle, size, indent, bottom, left);
				c.close();
				c.fillAndStroke();
			}
		}
		else if (top && !right && bottom && !left)
		{
			if (rectOutline != 'frame')
			{
				c.begin();
				sc.moveNW(c, x, y, w, h, rectStyle, topLeftStyle, size, left);
				sc.paintTop(c, x, y, w, h, rectStyle, topRightStyle, size, right);
		
				if (rectOutline == 'double')
				{
					sc.moveNEInner(c, x, y, w, h, rectStyle, topRightStyle, size, indent, right);
					sc.paintTopInner(c, x, y, w, h, rectStyle, topLeftStyle, size, indent, left, top);
				}
				
				c.stroke();
		
				c.begin();
				sc.moveSE(c, x, y, w, h, rectStyle, bottomRightStyle, size, right);
				sc.paintBottom(c, x, y, w, h, rectStyle, bottomLeftStyle, size, left);
		
				if (rectOutline == 'double')
				{
					sc.moveSWInner(c, x, y, w, h, rectStyle, bottomLeftStyle, size, indent, left);
					sc.paintBottomInner(c, x, y, w, h, rectStyle, bottomRightStyle, size, indent, right, bottom);
				}
				
				c.stroke();
			}
			else
			{
				c.begin();
				sc.moveNW(c, x, y, w, h, rectStyle, topLeftStyle, size, left);
				sc.paintTop(c, x, y, w, h, rectStyle, topRightStyle, size, right);
				sc.lineNEInner(c, x, y, w, h, rectStyle, topRightStyle, size, indent, right);
				sc.paintTopInner(c, x, y, w, h, rectStyle, topLeftStyle, size, indent, left, top);
				c.close();
				c.fillAndStroke();
		
				c.begin();
				sc.moveSE(c, x, y, w, h, rectStyle, bottomRightStyle, size, right);
				sc.paintBottom(c, x, y, w, h, rectStyle, bottomLeftStyle, size, left);
				sc.lineSWInner(c, x, y, w, h, rectStyle, bottomLeftStyle, size, indent, left);
				sc.paintBottomInner(c, x, y, w, h, rectStyle, bottomRightStyle, size, indent, right, bottom);
				c.close();
				c.fillAndStroke();
			}
		}
		else if (top && !right && bottom && left)
		{
			if (rectOutline != 'frame')
			{
				c.begin();
				sc.moveSE(c, x, y, w, h, rectStyle, bottomRightStyle, size, right);
				sc.paintBottom(c, x, y, w, h, rectStyle, bottomLeftStyle, size, left);
				sc.paintSW(c, x, y, w, h, rectStyle, bottomLeftStyle, size, bottom);
				sc.paintLeft(c, x, y, w, h, rectStyle, topLeftStyle, size, top);
				sc.paintNW(c, x, y, w, h, rectStyle, topLeftStyle, size, left);
				sc.paintTop(c, x, y, w, h, rectStyle, topRightStyle, size, right);
		
				if (rectOutline == 'double')
				{
					sc.moveNEInner(c, x, y, w, h, rectStyle, topRightStyle, size, indent, right);
					sc.paintTopInner(c, x, y, w, h, rectStyle, topLeftStyle, size, indent, left, top);
					sc.paintNWInner(c, x, y, w, h, rectStyle, topLeftStyle, size, indent);
					sc.paintLeftInner(c, x, y, w, h, rectStyle, bottomLeftStyle, size, indent, bottom, left);
					sc.paintSWInner(c, x, y, w, h, rectStyle, bottomLeftStyle, size, indent, bottom);
					sc.paintBottomInner(c, x, y, w, h, rectStyle, bottomRightStyle, size, indent, right, bottom);
				}
				
				c.stroke();
			}
			else
			{
				c.begin();
				sc.moveSE(c, x, y, w, h, rectStyle, bottomRightStyle, size, right);
				sc.paintBottom(c, x, y, w, h, rectStyle, bottomLeftStyle, size, left);
				sc.paintSW(c, x, y, w, h, rectStyle, bottomLeftStyle, size, bottom);
				sc.paintLeft(c, x, y, w, h, rectStyle, topLeftStyle, size, top);
				sc.paintNW(c, x, y, w, h, rectStyle, topLeftStyle, size, left);
				sc.paintTop(c, x, y, w, h, rectStyle, topRightStyle, size, right);
				sc.lineNEInner(c, x, y, w, h, rectStyle, topRightStyle, size, indent, right);
				sc.paintTopInner(c, x, y, w, h, rectStyle, topLeftStyle, size, indent, left, top);
				sc.paintNWInner(c, x, y, w, h, rectStyle, topLeftStyle, size, indent);
				sc.paintLeftInner(c, x, y, w, h, rectStyle, bottomLeftStyle, size, indent, bottom, left);
				sc.paintSWInner(c, x, y, w, h, rectStyle, bottomLeftStyle, size, indent, bottom);
				sc.paintBottomInner(c, x, y, w, h, rectStyle, bottomRightStyle, size, indent, right, bottom);
				c.close();
				c.fillAndStroke();
			}
		}
		else if (top && right && !bottom && !left)
		{
			if (rectOutline != 'frame')
			{
				c.begin();
				sc.moveNW(c, x, y, w, h, rectStyle, topLeftStyle, size, left);
				sc.paintTop(c, x, y, w, h, rectStyle, topRightStyle, size, right);
				sc.paintNE(c, x, y, w, h, rectStyle, topRightStyle, size, top);
				sc.paintRight(c, x, y, w, h, rectStyle, bottomRightStyle, size, bottom);
		
				if (rectOutline == 'double')
				{
					sc.moveSEInner(c, x, y, w, h, rectStyle, bottomRightStyle, size, indent, bottom);
					sc.paintRightInner(c, x, y, w, h, rectStyle, topRightStyle, size, indent, top, right);
					sc.paintNEInner(c, x, y, w, h, rectStyle, topRightStyle, size, indent);
					sc.paintTopInner(c, x, y, w, h, rectStyle, topLeftStyle, size, indent, left, top);
				}
				
				c.stroke();
			}
			else
			{
				c.begin();
				sc.moveNW(c, x, y, w, h, rectStyle, topLeftStyle, size, left);
				sc.paintTop(c, x, y, w, h, rectStyle, topRightStyle, size, right);
				sc.paintNE(c, x, y, w, h, rectStyle, topRightStyle, size, top);
				sc.paintRight(c, x, y, w, h, rectStyle, bottomRightStyle, size, bottom);
				sc.lineSEInner(c, x, y, w, h, rectStyle, bottomRightStyle, size, indent, bottom);
				sc.paintRightInner(c, x, y, w, h, rectStyle, topRightStyle, size, indent, top, right);
				sc.paintNEInner(c, x, y, w, h, rectStyle, topRightStyle, size, indent);
				sc.paintTopInner(c, x, y, w, h, rectStyle, topLeftStyle, size, indent, left, top);
				c.close();
				c.fillAndStroke();
			}
		}
		else if (top && right && !bottom && left)
		{
			if (rectOutline != 'frame')
			{
				c.begin();
				sc.moveSW(c, x, y, w, h, rectStyle, bottomLeftStyle, size, bottom);
				sc.paintLeft(c, x, y, w, h, rectStyle, topLeftStyle, size, top);
				sc.paintNW(c, x, y, w, h, rectStyle, topLeftStyle, size, left);
				sc.paintTop(c, x, y, w, h, rectStyle, topRightStyle, size, right);
				sc.paintNE(c, x, y, w, h, rectStyle, topRightStyle, size, top);
				sc.paintRight(c, x, y, w, h, rectStyle, bottomRightStyle, size, bottom);
		
				if (rectOutline == 'double')
				{
					sc.moveSEInner(c, x, y, w, h, rectStyle, bottomRightStyle, size, indent, bottom);
					sc.paintRightInner(c, x, y, w, h, rectStyle, topRightStyle, size, indent, top, right);
					sc.paintNEInner(c, x, y, w, h, rectStyle, topRightStyle, size, indent);
					sc.paintTopInner(c, x, y, w, h, rectStyle, topLeftStyle, size, indent, left, top);
					sc.paintNWInner(c, x, y, w, h, rectStyle, topLeftStyle, size, indent);
					sc.paintLeftInner(c, x, y, w, h, rectStyle, bottomLeftStyle, size, indent, bottom, left);
				}
				
				c.stroke();
			}
			else
			{
				c.begin();
				sc.moveSW(c, x, y, w, h, rectStyle, bottomLeftStyle, size, bottom);
				sc.paintLeft(c, x, y, w, h, rectStyle, topLeftStyle, size, top);
				sc.paintNW(c, x, y, w, h, rectStyle, topLeftStyle, size, left);
				sc.paintTop(c, x, y, w, h, rectStyle, topRightStyle, size, right);
				sc.paintNE(c, x, y, w, h, rectStyle, topRightStyle, size, top);
				sc.paintRight(c, x, y, w, h, rectStyle, bottomRightStyle, size, bottom);
				sc.lineSEInner(c, x, y, w, h, rectStyle, bottomRightStyle, size, indent, bottom);
				sc.paintRightInner(c, x, y, w, h, rectStyle, topRightStyle, size, indent, top, right);
				sc.paintNEInner(c, x, y, w, h, rectStyle, topRightStyle, size, indent);
				sc.paintTopInner(c, x, y, w, h, rectStyle, topLeftStyle, size, indent, left, top);
				sc.paintNWInner(c, x, y, w, h, rectStyle, topLeftStyle, size, indent);
				sc.paintLeftInner(c, x, y, w, h, rectStyle, bottomLeftStyle, size, indent, bottom, left);
				c.close();
				c.fillAndStroke();
			}
		}
		else if (top && right && bottom && !left)
		{
			if (rectOutline != 'frame')
			{
				c.begin();
				sc.moveNW(c, x, y, w, h, rectStyle, topLeftStyle, size, left);
				sc.paintTop(c, x, y, w, h, rectStyle, topRightStyle, size, right);
				sc.paintNE(c, x, y, w, h, rectStyle, topRightStyle, size, top);
				sc.paintRight(c, x, y, w, h, rectStyle, bottomRightStyle, size, bottom);
				sc.paintSE(c, x, y, w, h, rectStyle, bottomRightStyle, size, right);
				sc.paintBottom(c, x, y, w, h, rectStyle, bottomLeftStyle, size, left);
		
				if (rectOutline == 'double')
				{
					sc.moveSWInner(c, x, y, w, h, rectStyle, bottomLeftStyle, size, indent, left);
					sc.paintBottomInner(c, x, y, w, h, rectStyle, bottomRightStyle, size, indent, right, bottom);
					sc.paintSEInner(c, x, y, w, h, rectStyle, bottomRightStyle, size, indent);
					sc.paintRightInner(c, x, y, w, h, rectStyle, topRightStyle, size, indent, top, right);
					sc.paintNEInner(c, x, y, w, h, rectStyle, topRightStyle, size, indent);
					sc.paintTopInner(c, x, y, w, h, rectStyle, topLeftStyle, size, indent, left, top);
				}
				
				c.stroke();
			}
			else
			{
				c.begin();
				sc.moveNW(c, x, y, w, h, rectStyle, topLeftStyle, size, left);
				sc.paintTop(c, x, y, w, h, rectStyle, topRightStyle, size, right);
				sc.paintNE(c, x, y, w, h, rectStyle, topRightStyle, size, top);
				sc.paintRight(c, x, y, w, h, rectStyle, bottomRightStyle, size, bottom);
				sc.paintSE(c, x, y, w, h, rectStyle, bottomRightStyle, size, right);
				sc.paintBottom(c, x, y, w, h, rectStyle, bottomLeftStyle, size, left);
				sc.lineSWInner(c, x, y, w, h, rectStyle, bottomLeftStyle, size, indent, left);
				sc.paintBottomInner(c, x, y, w, h, rectStyle, bottomRightStyle, size, indent, right, bottom);
				sc.paintSEInner(c, x, y, w, h, rectStyle, bottomRightStyle, size, indent);
				sc.paintRightInner(c, x, y, w, h, rectStyle, topRightStyle, size, indent, top, right);
				sc.paintNEInner(c, x, y, w, h, rectStyle, topRightStyle, size, indent);
				sc.paintTopInner(c, x, y, w, h, rectStyle, topLeftStyle, size, indent, left, top);
				c.close();
				c.fillAndStroke();
			}
		}
		else if (top && right && bottom && left)
		{
			if (rectOutline != 'frame')
			{
				c.begin();
				sc.moveNW(c, x, y, w, h, rectStyle, topLeftStyle, size, left);
				sc.paintNW(c, x, y, w, h, rectStyle, topLeftStyle, size, left);
				sc.paintTop(c, x, y, w, h, rectStyle, topRightStyle, size, right);
				sc.paintNE(c, x, y, w, h, rectStyle, topRightStyle, size, top);
				sc.paintRight(c, x, y, w, h, rectStyle, bottomRightStyle, size, bottom);
				sc.paintSE(c, x, y, w, h, rectStyle, bottomRightStyle, size, right);
				sc.paintBottom(c, x, y, w, h, rectStyle, bottomLeftStyle, size, left);
				sc.paintSW(c, x, y, w, h, rectStyle, bottomLeftStyle, size, bottom);
				sc.paintLeft(c, x, y, w, h, rectStyle, topLeftStyle, size, top);
				c.close();
				
				if (rectOutline == 'double')
				{
					sc.moveSWInner(c, x, y, w, h, rectStyle, bottomLeftStyle, size, indent, left);
					sc.paintSWInner(c, x, y, w, h, rectStyle, bottomLeftStyle, size, indent, bottom);
					sc.paintBottomInner(c, x, y, w, h, rectStyle, bottomRightStyle, size, indent, right, bottom);
					sc.paintSEInner(c, x, y, w, h, rectStyle, bottomRightStyle, size, indent);
					sc.paintRightInner(c, x, y, w, h, rectStyle, topRightStyle, size, indent, top, right);
					sc.paintNEInner(c, x, y, w, h, rectStyle, topRightStyle, size, indent);
					sc.paintTopInner(c, x, y, w, h, rectStyle, topLeftStyle, size, indent, left, top);
					sc.paintNWInner(c, x, y, w, h, rectStyle, topLeftStyle, size, indent);
					sc.paintLeftInner(c, x, y, w, h, rectStyle, bottomLeftStyle, size, indent, bottom, left);
					c.close();
				}
				
				c.stroke();
			}
			else
			{
				c.begin();
				sc.moveNW(c, x, y, w, h, rectStyle, topLeftStyle, size, left);
				sc.paintNW(c, x, y, w, h, rectStyle, topLeftStyle, size, left);
				sc.paintTop(c, x, y, w, h, rectStyle, topRightStyle, size, right);
				sc.paintNE(c, x, y, w, h, rectStyle, topRightStyle, size, top);
				sc.paintRight(c, x, y, w, h, rectStyle, bottomRightStyle, size, bottom);
				sc.paintSE(c, x, y, w, h, rectStyle, bottomRightStyle, size, right);
				sc.paintBottom(c, x, y, w, h, rectStyle, bottomLeftStyle, size, left);
				sc.paintSW(c, x, y, w, h, rectStyle, bottomLeftStyle, size, bottom);
				sc.paintLeft(c, x, y, w, h, rectStyle, topLeftStyle, size, top);
				c.close();
				sc.moveSWInner(c, x, y, w, h, rectStyle, bottomLeftStyle, size, indent, left);
				sc.paintSWInner(c, x, y, w, h, rectStyle, bottomLeftStyle, size, indent, bottom);
				sc.paintBottomInner(c, x, y, w, h, rectStyle, bottomRightStyle, size, indent, right, bottom);
				sc.paintSEInner(c, x, y, w, h, rectStyle, bottomRightStyle, size, indent);
				sc.paintRightInner(c, x, y, w, h, rectStyle, topRightStyle, size, indent, top, right);
				sc.paintNEInner(c, x, y, w, h, rectStyle, topRightStyle, size, indent);
				sc.paintTopInner(c, x, y, w, h, rectStyle, topLeftStyle, size, indent, left, top);
				sc.paintNWInner(c, x, y, w, h, rectStyle, topLeftStyle, size, indent);
				sc.paintLeftInner(c, x, y, w, h, rectStyle, bottomLeftStyle, size, indent, bottom, left);
				c.close();
				c.fillAndStroke();
			}
		}

		c.begin();
		sc.paintFolds(c, x, y, w, h, rectStyle, topLeftStyle, topRightStyle, bottomRightStyle, bottomLeftStyle, size, top, right, bottom, left);
		c.stroke();
	};

	mxShapeBasicRect2.prototype.moveNW = function(c, x, y, w, h, rectStyle, topLeftStyle, size, left)
	{
		if((topLeftStyle == 'square' || (topLeftStyle == 'default' && rectStyle == 'square' )) || !left)
		{
			c.moveTo(0, 0);
		}
		else
		{
			c.moveTo(0, size);
		}
	};

	mxShapeBasicRect2.prototype.moveNE = function(c, x, y, w, h, rectStyle, topRightStyle, size, top)
	{
		if((topRightStyle == 'square' || (topRightStyle == 'default' && rectStyle == 'square' )) || !top)
		{
			c.moveTo(w, 0);
		}
		else
		{
			c.moveTo(w - size, 0);
		}
	};

	mxShapeBasicRect2.prototype.moveSE = function(c, x, y, w, h, rectStyle, bottomRightStyle, size, right)
	{
		if((bottomRightStyle == 'square' || (bottomRightStyle == 'default' && rectStyle == 'square' )) || !right)
		{
			c.moveTo(w, h);
		}
		else
		{
			c.moveTo(w, h - size);
		}
	};

	mxShapeBasicRect2.prototype.moveSW = function(c, x, y, w, h, rectStyle, bottomLeftStyle, size, bottom)
	{
		if((bottomLeftStyle == 'square' || (bottomLeftStyle == 'default' && rectStyle == 'square' )) || !bottom)
		{
			c.moveTo(0, h);
		}
		else
		{
			c.moveTo(size, h);
		}
	};

	mxShapeBasicRect2.prototype.paintNW = function(c, x, y, w, h, rectStyle, topLeftStyle, size, left)
	{
		if (!left)
		{
			c.lineTo(0, 0);
		}
		else if((topLeftStyle == 'rounded' || (topLeftStyle == 'default' && rectStyle == 'rounded' )) ||
				(topLeftStyle == 'invRound' || (topLeftStyle == 'default' && rectStyle == 'invRound' )) )
		{
			var inv = 0;
			
			if (topLeftStyle == 'rounded' || (topLeftStyle == 'default' && rectStyle == 'rounded' ))
			{
				inv = 1;
			}
			
			c.arcTo(size, size, 0, 0, inv, size, 0);
		}
		else if((topLeftStyle == 'snip' || (topLeftStyle == 'default' && rectStyle == 'snip' )) ||
				(topLeftStyle == 'fold' || (topLeftStyle == 'default' && rectStyle == 'fold' )))
		{
			c.lineTo(size, 0);
		}
	};

	mxShapeBasicRect2.prototype.paintTop = function(c, x, y, w, h, rectStyle, topRightStyle, size, right)
	{
		if((topRightStyle == 'square' || (topRightStyle == 'default' && rectStyle == 'square' )) || !right)
		{
			c.lineTo(w, 0);
		}
		else
		{
			c.lineTo(w - size, 0);
		}
	};

	mxShapeBasicRect2.prototype.paintNE = function(c, x, y, w, h, rectStyle, topRightStyle, size, top)
	{
		if (!top)
		{
			c.lineTo(w, 0);
		}
		else if((topRightStyle == 'rounded' || (topRightStyle == 'default' && rectStyle == 'rounded' )) ||
				(topRightStyle == 'invRound' || (topRightStyle == 'default' && rectStyle == 'invRound' )) )
		{
			var inv = 0;
			
			if (topRightStyle == 'rounded' || (topRightStyle == 'default' && rectStyle == 'rounded' ))
			{
				inv = 1;
			}
			
			c.arcTo(size, size, 0, 0, inv, w, size);
		}
		else if((topRightStyle == 'snip' || (topRightStyle == 'default' && rectStyle == 'snip' )) ||
				(topRightStyle == 'fold' || (topRightStyle == 'default' && rectStyle == 'fold' )))
		{
			c.lineTo(w, size);
		}
	};

	mxShapeBasicRect2.prototype.paintRight = function(c, x, y, w, h, rectStyle, bottomRightStyle, size, bottom)
	{
		if((bottomRightStyle == 'square' || (bottomRightStyle == 'default' && rectStyle == 'square' )) || !bottom)
		{
			c.lineTo(w, h);
		}
		else
		{
			c.lineTo(w, h - size);
		}
	};

	mxShapeBasicRect2.prototype.paintLeft = function(c, x, y, w, h, rectStyle, topLeftStyle, size, top)
	{
		if((topLeftStyle == 'square' || (topLeftStyle == 'default' && rectStyle == 'square' )) || !top)
		{
			c.lineTo(0, 0);
		}
		else
		{
			c.lineTo(0, size);
		}
	};

	mxShapeBasicRect2.prototype.paintSE = function(c, x, y, w, h, rectStyle, bottomRightStyle, size, right)
	{
		if (!right)
		{
			c.lineTo(w, h);
		}
		else if((bottomRightStyle == 'rounded' || (bottomRightStyle == 'default' && rectStyle == 'rounded' )) ||
				(bottomRightStyle == 'invRound' || (bottomRightStyle == 'default' && rectStyle == 'invRound' )) )
		{
			var inv = 0;
			
			if (bottomRightStyle == 'rounded' || (bottomRightStyle == 'default' && rectStyle == 'rounded' ))
			{
				inv = 1;
			}
			
			c.arcTo(size, size, 0, 0, inv, w - size, h);
		}
		else if((bottomRightStyle == 'snip' || (bottomRightStyle == 'default' && rectStyle == 'snip' )) ||
				(bottomRightStyle == 'fold' || (bottomRightStyle == 'default' && rectStyle == 'fold' )))
		{
			c.lineTo(w - size, h);
		}
	};

	mxShapeBasicRect2.prototype.paintBottom = function(c, x, y, w, h, rectStyle, bottomLeftStyle, size, left)
	{
		if((bottomLeftStyle == 'square' || (bottomLeftStyle == 'default' && rectStyle == 'square' )) || !left)
		{
			c.lineTo(0, h);
		}
		else
		{
			c.lineTo(size, h);
		}
	};

	mxShapeBasicRect2.prototype.paintSW = function(c, x, y, w, h, rectStyle, bottomLeftStyle, size, bottom)
	{
		if (!bottom)
		{
			c.lineTo(0, h);
		}
		else if((bottomLeftStyle == 'rounded' || (bottomLeftStyle == 'default' && rectStyle == 'rounded' )) ||
				(bottomLeftStyle == 'invRound' || (bottomLeftStyle == 'default' && rectStyle == 'invRound' )) )
		{
			var inv = 0;
			
			if (bottomLeftStyle == 'rounded' || (bottomLeftStyle == 'default' && rectStyle == 'rounded' ))
			{
				inv = 1;
			}
			
			c.arcTo(size, size, 0, 0, inv, 0, h - size);
		}
		else if((bottomLeftStyle == 'snip' || (bottomLeftStyle == 'default' && rectStyle == 'snip' )) ||
				(bottomLeftStyle == 'fold' || (bottomLeftStyle == 'default' && rectStyle == 'fold' )))
		{
			c.lineTo(0, h - size);
		}
	};

	mxShapeBasicRect2.prototype.paintNWInner = function(c, x, y, w, h, rectStyle, topLeftStyle, size, indent)
	{
		if(topLeftStyle == 'rounded' || (topLeftStyle == 'default' && rectStyle == 'rounded' ))
		{
			c.arcTo(size - indent * 0.5, size - indent * 0.5, 0, 0, 0, indent, indent * 0.5 + size);
		}
		else if(topLeftStyle == 'invRound' || (topLeftStyle == 'default' && rectStyle == 'invRound' ))
		{
			c.arcTo(size + indent, size + indent, 0, 0, 1, indent, indent + size);
		}
		else if(topLeftStyle == 'snip' || (topLeftStyle == 'default' && rectStyle == 'snip' ))
		{
			c.lineTo(indent, indent * 0.5 + size);
		}
		else if(topLeftStyle == 'fold' || (topLeftStyle == 'default' && rectStyle == 'fold' ))
		{
			c.lineTo(indent + size, indent + size);
			c.lineTo(indent, indent + size);
		}
	};

	mxShapeBasicRect2.prototype.paintTopInner = function(c, x, y, w, h, rectStyle, topLeftStyle, size, indent, left, top)
	{
		if (!left && !top)
		{
			c.lineTo(0, 0);
		}
		else if (!left && top)
		{
			c.lineTo(0, indent);
		}
		else if (left && !top)
		{
			c.lineTo(indent, 0);
		}
		else if (!left)
		{
			c.lineTo(0, indent);
		}
		else if(topLeftStyle == 'square' || (topLeftStyle == 'default' && rectStyle == 'square' ))
		{
			c.lineTo(indent, indent);
		}
		else if((topLeftStyle == 'rounded' || (topLeftStyle == 'default' && rectStyle == 'rounded' )) ||
				(topLeftStyle == 'snip' || (topLeftStyle == 'default' && rectStyle == 'snip' )))
		{
			c.lineTo(size + indent * 0.5, indent);
		}
		else
		{
			c.lineTo(size + indent, indent);
		}
	};

	mxShapeBasicRect2.prototype.paintNEInner = function(c, x, y, w, h, rectStyle, topRightStyle, size, indent)
	{
		if(topRightStyle == 'rounded' || (topRightStyle == 'default' && rectStyle == 'rounded' ))
		{
			c.arcTo(size - indent * 0.5, size - indent * 0.5, 0, 0, 0, w - size - indent * 0.5, indent);
		}
		else if(topRightStyle == 'invRound' || (topRightStyle == 'default' && rectStyle == 'invRound' ))
		{
			c.arcTo(size + indent, size + indent, 0, 0, 1, w - size - indent, indent);
		}
		else if(topRightStyle == 'snip' || (topRightStyle == 'default' && rectStyle == 'snip' ))
		{
			c.lineTo(w - size - indent * 0.5, indent);
		}
		else if(topRightStyle == 'fold' || (topRightStyle == 'default' && rectStyle == 'fold' ))
		{
			c.lineTo(w - size - indent, size + indent);
			c.lineTo(w - size - indent, indent);
		}
	};

	mxShapeBasicRect2.prototype.paintRightInner = function(c, x, y, w, h, rectStyle, topRightStyle, size, indent, top, right)
	{
		if (!top && !right)
		{
			c.lineTo(w, 0);
		}
		else if (!top && right)
		{
			c.lineTo(w - indent, 0);
		}
		else if (top && !right)
		{
			c.lineTo(w, indent);
		}
		else if (!top)
		{
			c.lineTo(w - indent, 0);
		}
		else if(topRightStyle == 'square' || (topRightStyle == 'default' && rectStyle == 'square' ))
		{
			c.lineTo(w - indent, indent);
		}
		else if((topRightStyle == 'rounded' || (topRightStyle == 'default' && rectStyle == 'rounded' )) ||
				(topRightStyle == 'snip' || (topRightStyle == 'default' && rectStyle == 'snip' )))
		{
			c.lineTo(w - indent, size + indent * 0.5);
		}
		else
		{
			c.lineTo(w - indent, size + indent);
		}
	};

	mxShapeBasicRect2.prototype.paintLeftInner = function(c, x, y, w, h, rectStyle, bottomLeftStyle, size, indent, bottom, left)
	{
		if (!bottom && !left)
		{
			c.lineTo(0, h);
		}
		else if (!bottom && left)
		{
			c.lineTo(indent, h);
		}
		else if (bottom && !left)
		{
			c.lineTo(0, h - indent);
		}
		else if (!bottom)
		{
			c.lineTo(indent, h);
		}
		else if(bottomLeftStyle == 'square' || (bottomLeftStyle == 'default' && rectStyle == 'square' ))
		{
			c.lineTo(indent, h - indent);
		}
		else if((bottomLeftStyle == 'rounded' || (bottomLeftStyle == 'default' && rectStyle == 'rounded' )) ||
				(bottomLeftStyle == 'snip' || (bottomLeftStyle == 'default' && rectStyle == 'snip' )))
		{
			c.lineTo(indent, h - size - indent * 0.5);
		}
		else
		{
			c.lineTo(indent, h - size - indent);
		}
	};

	mxShapeBasicRect2.prototype.paintSEInner = function(c, x, y, w, h, rectStyle, bottomRightStyle, size, indent)
	{
		if(bottomRightStyle == 'rounded' || (bottomRightStyle == 'default' && rectStyle == 'rounded' ))
		{
			c.arcTo(size - indent * 0.5, size - indent * 0.5, 0, 0, 0, w - indent, h - size - indent * 0.5);
		}
		else if(bottomRightStyle == 'invRound' || (bottomRightStyle == 'default' && rectStyle == 'invRound' ))
		{
			c.arcTo(size + indent, size + indent, 0, 0, 1, w - indent, h - size - indent);
		}
		else if(bottomRightStyle == 'snip' || (bottomRightStyle == 'default' && rectStyle == 'snip' ))
		{
			c.lineTo(w - indent, h - size - indent * 0.5);
		}
		else if(bottomRightStyle == 'fold' || (bottomRightStyle == 'default' && rectStyle == 'fold' ))
		{
			c.lineTo(w - size - indent, h - size - indent);
			c.lineTo(w - indent, h - size - indent);
		}
	};

	mxShapeBasicRect2.prototype.paintBottomInner = function(c, x, y, w, h, rectStyle, bottomRightStyle, size, indent, right, bottom)
	{
		if (!right && !bottom)
		{
			c.lineTo(w, h);
		}
		else if (!right && bottom)
		{
			c.lineTo(w, h - indent);
		}
		else if (right && !bottom)
		{
			c.lineTo(w - indent, h);
		}
		else if((bottomRightStyle == 'square' || (bottomRightStyle == 'default' && rectStyle == 'square' )) || !right)
		{
			c.lineTo(w - indent, h - indent);
		}
		else if((bottomRightStyle == 'rounded' || (bottomRightStyle == 'default' && rectStyle == 'rounded' )) ||
				(bottomRightStyle == 'snip' || (bottomRightStyle == 'default' && rectStyle == 'snip' )))
		{
			c.lineTo(w - size - indent * 0.5, h - indent);
		}
		else
		{
			c.lineTo(w - size - indent, h - indent);
		}
	};

	mxShapeBasicRect2.prototype.paintSWInner = function(c, x, y, w, h, rectStyle, bottomLeftStyle, size, indent, bottom)
	{
		if (!bottom)
		{
			c.lineTo(indent, h);
		}
		else if(bottomLeftStyle == 'square' || (bottomLeftStyle == 'default' && rectStyle == 'square' ))
		{
			c.lineTo(indent, h - indent);
		}
		else if(bottomLeftStyle == 'rounded' || (bottomLeftStyle == 'default' && rectStyle == 'rounded' ))
		{
			c.arcTo(size - indent * 0.5, size - indent * 0.5, 0, 0, 0, size + indent * 0.5, h - indent);
		}
		else if(bottomLeftStyle == 'invRound' || (bottomLeftStyle == 'default' && rectStyle == 'invRound' ))
		{
			c.arcTo(size + indent, size + indent, 0, 0, 1, size + indent, h - indent);
		}
		else if(bottomLeftStyle == 'snip' || (bottomLeftStyle == 'default' && rectStyle == 'snip' ))
		{
			c.lineTo(size + indent * 0.5, h - indent);
		}
		else if(bottomLeftStyle == 'fold' || (bottomLeftStyle == 'default' && rectStyle == 'fold' ))
		{
			c.lineTo(indent + size, h - size - indent);
			c.lineTo(indent + size, h - indent);
		}
	};

	mxShapeBasicRect2.prototype.moveSWInner = function(c, x, y, w, h, rectStyle, bottomLeftStyle, size, indent, left)
	{
		if (!left)
		{
			c.moveTo(0, h - indent);
		}
		else if(bottomLeftStyle == 'square' || (bottomLeftStyle == 'default' && rectStyle == 'square' ))
		{
			c.moveTo(indent, h - indent);
		}
		else if((bottomLeftStyle == 'rounded' || (bottomLeftStyle == 'default' && rectStyle == 'rounded' )) ||
				(bottomLeftStyle == 'snip' || (bottomLeftStyle == 'default' && rectStyle == 'snip' )))
		{
			c.moveTo(indent, h - size - indent * 0.5);
		}
		else if((bottomLeftStyle == 'invRound' || (bottomLeftStyle == 'default' && rectStyle == 'invRound' )) ||
				(bottomLeftStyle == 'fold' || (bottomLeftStyle == 'default' && rectStyle == 'fold' )))
		{
			c.moveTo(indent, h - size - indent);
		}
	};

	mxShapeBasicRect2.prototype.lineSWInner = function(c, x, y, w, h, rectStyle, bottomLeftStyle, size, indent, left)
	{
		if (!left)
		{
			c.lineTo(0, h - indent);
		}
		else if(bottomLeftStyle == 'square' || (bottomLeftStyle == 'default' && rectStyle == 'square' ))
		{
			c.lineTo(indent, h - indent);
		}
		else if((bottomLeftStyle == 'rounded' || (bottomLeftStyle == 'default' && rectStyle == 'rounded' )) ||
				(bottomLeftStyle == 'snip' || (bottomLeftStyle == 'default' && rectStyle == 'snip' )))
		{
			c.lineTo(indent, h - size - indent * 0.5);
		}
		else if((bottomLeftStyle == 'invRound' || (bottomLeftStyle == 'default' && rectStyle == 'invRound' )) ||
				(bottomLeftStyle == 'fold' || (bottomLeftStyle == 'default' && rectStyle == 'fold' )))
		{
				c.lineTo(indent, h - size - indent);
		}
	};

	mxShapeBasicRect2.prototype.moveSEInner = function(c, x, y, w, h, rectStyle, bottomRightStyle, size, indent, bottom)
	{
		if (!bottom)
		{
			c.moveTo(w - indent, h);
		}
		else if(bottomRightStyle == 'square' || (bottomRightStyle == 'default' && rectStyle == 'square' ))
		{
			c.moveTo(w - indent, h - indent);
		}
		else if((bottomRightStyle == 'rounded' || (bottomRightStyle == 'default' && rectStyle == 'rounded' )) ||
				(bottomRightStyle == 'snip' || (bottomRightStyle == 'default' && rectStyle == 'snip' )))
		{
			c.moveTo(w - indent, h - size - indent * 0.5);
		}
		else if((bottomRightStyle == 'invRound' || (bottomRightStyle == 'default' && rectStyle == 'invRound' )) ||
				(bottomRightStyle == 'fold' || (bottomRightStyle == 'default' && rectStyle == 'fold' )))
		{
			c.moveTo(w - indent, h - size - indent);
		}
	};

	mxShapeBasicRect2.prototype.lineSEInner = function(c, x, y, w, h, rectStyle, bottomRightStyle, size, indent, bottom)
	{
		if (!bottom)
		{
			c.lineTo(w - indent, h);
		}
		else if(bottomRightStyle == 'square' || (bottomRightStyle == 'default' && rectStyle == 'square' ))
		{
			c.lineTo(w - indent, h - indent);
		}
		else if((bottomRightStyle == 'rounded' || (bottomRightStyle == 'default' && rectStyle == 'rounded' )) ||
				(bottomRightStyle == 'snip' || (bottomRightStyle == 'default' && rectStyle == 'snip' )))
		{
			c.lineTo(w - indent, h - size - indent * 0.5);
		}
		else if((bottomRightStyle == 'invRound' || (bottomRightStyle == 'default' && rectStyle == 'invRound' )) ||
				(bottomRightStyle == 'fold' || (bottomRightStyle == 'default' && rectStyle == 'fold' )))
		{
			c.lineTo(w - indent, h - size - indent);
		}
	};

	mxShapeBasicRect2.prototype.moveNEInner = function(c, x, y, w, h, rectStyle, topRightStyle, size, indent, right)
	{
		if (!right)
		{
			c.moveTo(w, indent);
		}
		else if((topRightStyle == 'square' || (topRightStyle == 'default' && rectStyle == 'square' )) || right)
		{
			c.moveTo(w - indent, indent);
		}
		else if((topRightStyle == 'rounded' || (topRightStyle == 'default' && rectStyle == 'rounded' )) ||
				(topRightStyle == 'snip' || (topRightStyle == 'default' && rectStyle == 'snip' )))
		{
			c.moveTo(w - indent, size + indent * 0.5);
		}
		else if((topRightStyle == 'invRound' || (topRightStyle == 'default' && rectStyle == 'invRound' )) ||
				(topRightStyle == 'fold' || (topRightStyle == 'default' && rectStyle == 'fold' )))
		{
			c.moveTo(w - indent, size + indent);
		}
	};

	mxShapeBasicRect2.prototype.lineNEInner = function(c, x, y, w, h, rectStyle, topRightStyle, size, indent, right)
	{
		if (!right)
		{
			c.lineTo(w, indent);
		}
		else if((topRightStyle == 'square' || (topRightStyle == 'default' && rectStyle == 'square' )) || right)
		{
			c.lineTo(w - indent, indent);
		}
		else if((topRightStyle == 'rounded' || (topRightStyle == 'default' && rectStyle == 'rounded' )) ||
				(topRightStyle == 'snip' || (topRightStyle == 'default' && rectStyle == 'snip' )))
		{
			c.lineTo(w - indent, size + indent * 0.5);
		}
		else if((topRightStyle == 'invRound' || (topRightStyle == 'default' && rectStyle == 'invRound' )) ||
				(topRightStyle == 'fold' || (topRightStyle == 'default' && rectStyle == 'fold' )))
		{
			c.lineTo(w - indent, size + indent);
		}
	};

	mxShapeBasicRect2.prototype.moveNWInner = function(c, x, y, w, h, rectStyle, topLeftStyle, size, indent, top, left)
	{
		if (!top && !left)
		{
			c.moveTo(0, 0);
		}
		else if (!top && left)
		{
			c.moveTo(indent, 0);
		}
		else if (top && !left)
		{
			c.moveTo(0, indent);
		}
		else if(topLeftStyle == 'square' || (topLeftStyle == 'default' && rectStyle == 'square' ))
		{
			c.moveTo(indent, indent);
		}
		else if((topLeftStyle == 'rounded' || (topLeftStyle == 'default' && rectStyle == 'rounded' )) ||
				(topLeftStyle == 'snip' || (topLeftStyle == 'default' && rectStyle == 'snip' )))
		{
			c.moveTo(indent, size + indent * 0.5);
		}
		else if((topLeftStyle == 'invRound' || (topLeftStyle == 'default' && rectStyle == 'invRound' )) ||
				(topLeftStyle == 'fold' || (topLeftStyle == 'default' && rectStyle == 'fold' )))
		{
			c.moveTo(indent, size + indent);
		}
	};

	mxShapeBasicRect2.prototype.lineNWInner = function(c, x, y, w, h, rectStyle, topLeftStyle, size, indent, top, left)
	{
		if (!top && !left)
		{
			c.lineTo(0, 0);
		}
		else if (!top && left)
		{
			c.lineTo(indent, 0);
		}
		else if (top && !left)
		{
			c.lineTo(0, indent);
		}
		else if(topLeftStyle == 'square' || (topLeftStyle == 'default' && rectStyle == 'square' ))
		{
			c.lineTo(indent, indent);
		}
		else if((topLeftStyle == 'rounded' || (topLeftStyle == 'default' && rectStyle == 'rounded' )) ||
				(topLeftStyle == 'snip' || (topLeftStyle == 'default' && rectStyle == 'snip' )))
		{
			c.lineTo(indent, size + indent * 0.5);
		}
		else if((topLeftStyle == 'invRound' || (topLeftStyle == 'default' && rectStyle == 'invRound' )) ||
				(topLeftStyle == 'fold' || (topLeftStyle == 'default' && rectStyle == 'fold' )))
		{
			c.lineTo(indent, size + indent);
		}
	};

	mxShapeBasicRect2.prototype.paintFolds = function(c, x, y, w, h, rectStyle, topLeftStyle, topRightStyle, bottomRightStyle, bottomLeftStyle, size, top, right, bottom, left)
	{
		if (rectStyle == 'fold' || topLeftStyle == 'fold' || topRightStyle == 'fold' || bottomRightStyle == 'fold' || bottomLeftStyle == 'fold')
		{
			if ((topLeftStyle == 'fold' || (topLeftStyle == 'default' && rectStyle == 'fold' )) && (top && left))
			{
				c.moveTo(0, size);
				c.lineTo(size, size);
				c.lineTo(size, 0);
			}
			
			if ((topRightStyle == 'fold' || (topRightStyle == 'default' && rectStyle == 'fold' )) && (top && right))
			{
				c.moveTo(w - size, 0);
				c.lineTo(w - size, size);
				c.lineTo(w, size);
			}
			
			if ((bottomRightStyle == 'fold' || (bottomRightStyle == 'default' && rectStyle == 'fold' )) && (bottom && right))
			{
				c.moveTo(w - size, h);
				c.lineTo(w - size, h - size);
				c.lineTo(w, h - size);
			}
			
			if ((bottomLeftStyle == 'fold' || (bottomLeftStyle == 'default' && rectStyle == 'fold' )) && (bottom && left))
			{
				c.moveTo(0, h - size);
				c.lineTo(size, h - size);
				c.lineTo(size, h);
			}
		}
	};

	mxCellRenderer.registerShape(mxShapeBasicRect2.prototype.cst.RECT2, mxShapeBasicRect2);

	mxShapeBasicRect2.prototype.constraints = null;

	// FilledEdge shape
	function FilledEdge()
	{
		mxConnector.call(this);
	};
	mxUtils.extend(FilledEdge, mxConnector);
	
	FilledEdge.prototype.origPaintEdgeShape = FilledEdge.prototype.paintEdgeShape;
	FilledEdge.prototype.paintEdgeShape = function(c, pts, rounded)
	{
		// Markers modify incoming points array
		var temp = [];
		
		for (var i = 0; i < pts.length; i++)
		{
			temp.push(mxUtils.clone(pts[i]));
		}
		
		// paintEdgeShape resets dashed to false
		var dashed = c.state.dashed;
		var fixDash = c.state.fixDash;
		FilledEdge.prototype.origPaintEdgeShape.apply(this, [c, temp, rounded]);

		if (c.state.strokeWidth >= 3)
		{
			var fillClr = mxUtils.getValue(this.style, 'fillColor', null);
			
			if (fillClr != null)
			{
				c.setStrokeColor(fillClr);
				c.setStrokeWidth(c.state.strokeWidth - 2);
				c.setDashed(dashed, fixDash);
				
				FilledEdge.prototype.origPaintEdgeShape.apply(this, [c, pts, rounded]);
			}
		}
	};

	// Registers the link shape
	mxCellRenderer.registerShape('filledEdge', FilledEdge);

	// Implements custom colors for shapes
	if (typeof StyleFormatPanel !== 'undefined')
	{
		(function()
		{
			var styleFormatPanelGetCustomColors = StyleFormatPanel.prototype.getCustomColors;
			
			StyleFormatPanel.prototype.getCustomColors = function()
			{
				var ss = this.editorUi.getSelectionState();
				var result = styleFormatPanelGetCustomColors.apply(this, arguments);
				
				if (ss.style.shape == 'umlFrame')
				{
					result.push({title: mxResources.get('laneColor'),
						key: 'swimlaneFillColor',
						defaultValue: 'default'});
				}
				
				return result;
			};
		})();
	}
	
	// Registers and defines the custom marker
	mxMarker.addMarker('dash', function(c, shape, type, pe, unitX, unitY, size, source, sw, filled)
	{
		var nx = unitX * (size + sw + 1);
		var ny = unitY * (size + sw + 1);

		return function()
		{
			c.begin();
			c.moveTo(pe.x - nx / 2 - ny / 2, pe.y - ny / 2 + nx / 2);
			c.lineTo(pe.x + ny / 2 - 3 * nx / 2, pe.y - 3 * ny / 2 - nx / 2);
			c.stroke();
		};
	});

	// Registers and defines the custom marker
	mxMarker.addMarker('box', function(c, shape, type, pe, unitX, unitY, size, source, sw, filled)
	{
		var nx = unitX * (size + sw + 1);
		var ny = unitY * (size + sw + 1);
		var px = pe.x + nx / 2;
		var py = pe.y + ny / 2;
		
		pe.x -= nx;
		pe.y -= ny;

		return function()
		{
			c.begin();
			c.moveTo(px - nx / 2 - ny / 2, py - ny / 2 + nx / 2);
			c.lineTo(px - nx / 2 + ny / 2, py - ny / 2 - nx / 2);
			c.lineTo(px + ny / 2 - 3 * nx / 2, py - 3 * ny / 2 - nx / 2);
			c.lineTo(px - ny / 2 - 3 * nx / 2, py - 3 * ny / 2 + nx / 2);
			c.close();
			
			if (filled)
			{
				c.fillAndStroke();
			}
			else
			{
				c.stroke();
			}
		};
	});
	
	// Registers and defines the custom marker
	mxMarker.addMarker('cross', function(c, shape, type, pe, unitX, unitY, size, source, sw, filled)
	{
		var nx = unitX * (size + sw + 1);
		var ny = unitY * (size + sw + 1);

		return function()
		{
			c.begin();
			c.moveTo(pe.x - nx / 2 - ny / 2, pe.y - ny / 2 + nx / 2);
			c.lineTo(pe.x + ny / 2 - 3 * nx / 2, pe.y - 3 * ny / 2 - nx / 2);
			c.moveTo(pe.x - nx / 2 + ny / 2, pe.y - ny / 2 - nx / 2);
			c.lineTo(pe.x - ny / 2 - 3 * nx / 2, pe.y - 3 * ny / 2 + nx / 2);
			c.stroke();
		};
	});
	
	function circleMarker(c, shape, type, pe, unitX, unitY, size, source, sw, filled)
	{
		var a = size / 2;
		var size = size + sw;

		var pt = pe.clone();
		
		pe.x -= unitX * (2 * size + sw);
		pe.y -= unitY * (2 * size + sw);
		
		unitX = unitX * (size + sw);
		unitY = unitY * (size + sw);

		return function()
		{
			c.ellipse(pt.x - unitX - size, pt.y - unitY - size, 2 * size, 2 * size);
			
			if (filled)
			{
				c.fillAndStroke();
			}
			else
			{
				c.stroke();
			}
		};
	};
	
	mxMarker.addMarker('circle', circleMarker);
	mxMarker.addMarker('circlePlus', function(c, shape, type, pe, unitX, unitY, size, source, sw, filled)
	{
		var pt = pe.clone();
		var fn = circleMarker.apply(this, arguments);
		var nx = unitX * (size + 2 * sw); // (size + sw + 1);
		var ny = unitY * (size + 2 * sw); //(size + sw + 1);

		return function()
		{
			fn.apply(this, arguments);

			c.begin();
			c.moveTo(pt.x - unitX * (sw), pt.y - unitY * (sw));
			c.lineTo(pt.x - 2 * nx + unitX * (sw), pt.y - 2 * ny + unitY * (sw));
			c.moveTo(pt.x - nx - ny + unitY * sw, pt.y - ny + nx - unitX * sw);
			c.lineTo(pt.x + ny - nx - unitY * sw, pt.y - ny - nx + unitX * sw);
			c.stroke();
		};
	});
	
	// Registers and defines the custom marker
	mxMarker.addMarker('halfCircle', function(c, shape, type, pe, unitX, unitY, size, source, sw, filled)
	{
		var nx = unitX * (size + sw + 1);
		var ny = unitY * (size + sw + 1);
		var pt = pe.clone();
		
		pe.x -= nx;
		pe.y -= ny;

		return function()
		{
			c.begin();
			c.moveTo(pt.x - ny, pt.y + nx);
			c.quadTo(pe.x - ny, pe.y + nx, pe.x, pe.y);
			c.quadTo(pe.x + ny, pe.y - nx, pt.x + ny, pt.y - nx);
			c.stroke();
		};
	});

	mxMarker.addMarker('async', function(c, shape, type, pe, unitX, unitY, size, source, sw, filled)
	{
		// The angle of the forward facing arrow sides against the x axis is
		// 26.565 degrees, 1/sin(26.565) = 2.236 / 2 = 1.118 ( / 2 allows for
		// only half the strokewidth is processed ).
		var endOffsetX = unitX * sw * 1.118;
		var endOffsetY = unitY * sw * 1.118;
		
		unitX = unitX * (size + sw);
		unitY = unitY * (size + sw);

		var pt = pe.clone();
		pt.x -= endOffsetX;
		pt.y -= endOffsetY;
		
		var f = 1;
		pe.x += -unitX * f - endOffsetX;
		pe.y += -unitY * f - endOffsetY;
		
		return function()
		{
			c.begin();
			c.moveTo(pt.x, pt.y);
			
			if (source)
			{
				c.lineTo(pt.x - unitX - unitY / 2, pt.y - unitY + unitX / 2);
			}
			else
			{
				c.lineTo(pt.x + unitY / 2 - unitX, pt.y - unitY - unitX / 2);
			}
			
			c.lineTo(pt.x - unitX, pt.y - unitY);
			c.close();

			if (filled)
			{
				c.fillAndStroke();
			}
			else
			{
				c.stroke();
			}
		};
	});
	
	function createOpenAsyncArrow(widthFactor)
	{
		widthFactor = (widthFactor != null) ? widthFactor : 2;
		
		return function(c, shape, type, pe, unitX, unitY, size, source, sw, filled)
		{
			unitX = unitX * (size + sw);
			unitY = unitY * (size + sw);
			
			var pt = pe.clone();

			return function()
			{
				c.begin();
				c.moveTo(pt.x, pt.y);
				
				if (source)
				{
					c.lineTo(pt.x - unitX - unitY / widthFactor, pt.y - unitY + unitX / widthFactor);
				}
				else
				{
					c.lineTo(pt.x + unitY / widthFactor - unitX, pt.y - unitY - unitX / widthFactor);
				}
				
				c.stroke();
			};
		}
	};
	
	mxMarker.addMarker('openAsync', createOpenAsyncArrow(2));
	
	function arrow(canvas, shape, type, pe, unitX, unitY, size, source, sw, filled)
	{
		// The angle of the forward facing arrow sides against the x axis is
		// 26.565 degrees, 1/sin(26.565) = 2.236 / 2 = 1.118 ( / 2 allows for
		// only half the strokewidth is processed ).
		var endOffsetX = unitX * sw * 1.118;
		var endOffsetY = unitY * sw * 1.118;
		
		unitX = unitX * (size + sw);
		unitY = unitY * (size + sw);

		var pt = pe.clone();
		pt.x -= endOffsetX;
		pt.y -= endOffsetY;
		
		var f = (type != mxConstants.ARROW_CLASSIC && type != mxConstants.ARROW_CLASSIC_THIN) ? 1 : 3 / 4;
		pe.x += -unitX * f - endOffsetX;
		pe.y += -unitY * f - endOffsetY;
		
		return function()
		{
			canvas.begin();
			canvas.moveTo(pt.x, pt.y);
			canvas.lineTo(pt.x - unitX - unitY / widthFactor, pt.y - unitY + unitX / widthFactor);
		
			if (type == mxConstants.ARROW_CLASSIC || type == mxConstants.ARROW_CLASSIC_THIN)
			{
				canvas.lineTo(pt.x - unitX * 3 / 4, pt.y - unitY * 3 / 4);
			}
		
			canvas.lineTo(pt.x + unitY / widthFactor - unitX, pt.y - unitY - unitX / widthFactor);
			canvas.close();

			if (filled)
			{
				canvas.fillAndStroke();
			}
			else
			{
				canvas.stroke();
			}
		};
	}
	
	// Handlers are only added if mxVertexHandler is defined (ie. not in embedded graph)
	if (typeof mxVertexHandler !== 'undefined')
	{
		function createHandle(state, keys, getPositionFn, setPositionFn, ignoreGrid, redrawEdges, executeFn)
		{
			var handle = new mxHandle(state, null, mxVertexHandler.prototype.secondaryHandleImage);
			
			handle.execute = function(me)
			{
				for (var i = 0; i < keys.length; i++)
				{	
					this.copyStyle(keys[i]);
				}
				
				if (executeFn)
				{
					executeFn(me);
				}
			};
			
			handle.getPosition = getPositionFn;
			handle.setPosition = setPositionFn;
			handle.ignoreGrid = (ignoreGrid != null) ? ignoreGrid : true;
			
			// Overridden to update connected edges
			if (redrawEdges)
			{
				var positionChanged = handle.positionChanged;
				
				handle.positionChanged = function()
				{
					positionChanged.apply(this, arguments);
					
					// Redraws connected edges TODO: Include child edges
					state.view.invalidate(this.state.cell);
					state.view.validate();
				};
			}
			
			return handle;
		};
		
		function createArcHandle(state, yOffset)
		{
			return createHandle(state, [mxConstants.STYLE_ARCSIZE], function(bounds)
			{
				var tmp = (yOffset != null) ? yOffset : bounds.height / 8;
				
				if (mxUtils.getValue(state.style, mxConstants.STYLE_ABSOLUTE_ARCSIZE, 0) == '1')
				{
					var arcSize = mxUtils.getValue(state.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2;
					
					return new mxPoint(bounds.x + bounds.width - Math.min(bounds.width / 2, arcSize), bounds.y + tmp);
				}
				else
				{
					var arcSize = Math.max(0, parseFloat(mxUtils.getValue(state.style,
						mxConstants.STYLE_ARCSIZE, mxConstants.RECTANGLE_ROUNDING_FACTOR * 100))) / 100;
					
					return new mxPoint(bounds.x + bounds.width - Math.min(Math.max(bounds.width / 2, bounds.height / 2),
						Math.min(bounds.width, bounds.height) * arcSize), bounds.y + tmp);
				}
			}, function(bounds, pt, me)
			{
				if (mxUtils.getValue(state.style, mxConstants.STYLE_ABSOLUTE_ARCSIZE, 0) == '1')
				{
					this.state.style[mxConstants.STYLE_ARCSIZE] = Math.round(Math.max(0, Math.min(bounds.width,
						(bounds.x + bounds.width - pt.x) * 2)));
				}
				else
				{
					var f = Math.min(50, Math.max(0, (bounds.width - pt.x + bounds.x) * 100 /
						Math.min(bounds.width, bounds.height)));
					this.state.style[mxConstants.STYLE_ARCSIZE] = Math.round(f);
				}
			});
		}

		function createArcHandleFunction()
		{
			return function(state)
			{
				var handles = [];
				
				if (mxUtils.getValue(state.style, mxConstants.STYLE_ROUNDED, false))
				{
					handles.push(createArcHandle(state));
				}
				
				return handles;
			};
		};
		
		function createTrapezoidHandleFunction(max, defaultValue, fixedDefaultValue)
		{
			max = (max != null) ? max : 0.5;
			
			return function(state)
			{
				var handles = [createHandle(state, ['size'], function(bounds)
				{
					var fixed = (fixedDefaultValue != null) ? mxUtils.getValue(this.state.style, 'fixedSize', '0') != '0' : null;
					var size = Math.max(0, parseFloat(mxUtils.getValue(this.state.style, 'size', (fixed) ? fixedDefaultValue : defaultValue)));
					
					return new mxPoint(bounds.x + Math.min(bounds.width * 0.75 * max, size * ((fixed) ? 0.75 : bounds.width * 0.75)), bounds.y + bounds.height / 4);
				}, function(bounds, pt)
				{
					var fixed = (fixedDefaultValue != null) ? mxUtils.getValue(this.state.style, 'fixedSize', '0') != '0' : null;
					var size = (fixed) ? (pt.x - bounds.x) : Math.max(0, Math.min(max, (pt.x - bounds.x) / bounds.width * 0.75));
					
					this.state.style['size'] = size;
				}, false, true)];
				
				if (mxUtils.getValue(state.style, mxConstants.STYLE_ROUNDED, false))
				{
					handles.push(createArcHandle(state));
				}
				
				return handles;
			};
		};
		
		function createDisplayHandleFunction(defaultValue, allowArcHandle, max, redrawEdges, fixedDefaultValue)
		{
			max = (max != null) ? max : 0.5;
			
			return function(state)
			{
				var handles = [createHandle(state, ['size'], function(bounds)
				{
					var fixed = (fixedDefaultValue != null) ? mxUtils.getValue(this.state.style, 'fixedSize', '0') != '0' : null;
					var size = parseFloat(mxUtils.getValue(this.state.style, 'size', (fixed) ? fixedDefaultValue : defaultValue));
	
					return new mxPoint(bounds.x + Math.max(0, Math.min(bounds.width * 0.5, size * ((fixed) ? 1 : bounds.width))), bounds.getCenterY());
				}, function(bounds, pt, me)
				{
					var fixed = (fixedDefaultValue != null) ? mxUtils.getValue(this.state.style, 'fixedSize', '0') != '0' : null;
					var size = (fixed) ? (pt.x - bounds.x) : Math.max(0, Math.min(max, (pt.x - bounds.x) / bounds.width));
					
					this.state.style['size'] = size;
				}, false, redrawEdges)];
				
				if (allowArcHandle && mxUtils.getValue(state.style, mxConstants.STYLE_ROUNDED, false))
				{
					handles.push(createArcHandle(state));
				}
				
				return handles;
			};
		};
		
		function createCubeHandleFunction(factor, defaultValue, allowArcHandle)
		{
			return function(state)
			{
				var handles = [createHandle(state, ['size'], function(bounds)
				{
					var size = Math.max(0, Math.min(bounds.width, Math.min(bounds.height, parseFloat(
						mxUtils.getValue(this.state.style, 'size', defaultValue))))) * factor;
					
					return new mxPoint(bounds.x + size, bounds.y + size);
				}, function(bounds, pt)
				{
					this.state.style['size'] = Math.round(Math.max(0, Math.min(Math.min(bounds.width, pt.x - bounds.x),
							Math.min(bounds.height, pt.y - bounds.y))) / factor);
				}, false)];
				
				if (allowArcHandle && mxUtils.getValue(state.style, mxConstants.STYLE_ROUNDED, false))
				{
					handles.push(createArcHandle(state));
				}
				
				return handles;
			};
		};
		
		function createCylinderHandleFunction(defaultValue)
		{
			return function(state)
			{
				return [createHandle(state, ['size'], function(bounds)
				{
					var size = Math.max(0, Math.min(bounds.height * 0.5, parseFloat(mxUtils.getValue(this.state.style, 'size', defaultValue))));

					return new mxPoint(bounds.x, bounds.y + size);
				}, function(bounds, pt)
				{
					this.state.style['size'] = Math.max(0, pt.y - bounds.y);
				}, true)];
			}
		};
		
		function createArrowHandleFunction(maxSize)
		{
			return function(state)
			{
				return [createHandle(state, ['arrowWidth', 'arrowSize'], function(bounds)
				{
					var aw = Math.max(0, Math.min(1, mxUtils.getValue(this.state.style, 'arrowWidth', SingleArrowShape.prototype.arrowWidth)));
					var as = Math.max(0, Math.min(maxSize, mxUtils.getValue(this.state.style, 'arrowSize', SingleArrowShape.prototype.arrowSize)));
					
					return new mxPoint(bounds.x + (1 - as) * bounds.width, bounds.y + (1 - aw) * bounds.height / 2);
				}, function(bounds, pt)
				{
					this.state.style['arrowWidth'] = Math.max(0, Math.min(1, Math.abs(bounds.y + bounds.height / 2 - pt.y) / bounds.height * 2));
					this.state.style['arrowSize'] = Math.max(0, Math.min(maxSize, (bounds.x + bounds.width - pt.x) / (bounds.width)));
				})];
			};
		};
		
		function createWedgeHandleFunction(defaultValue, spacing)
		{
			return function(state)
			{
				return [createEdgeHandle(state, ['startWidth'], true, function(dist, nx, ny, p0, p1)
				{
					var w = mxUtils.getNumber(state.style, 'startWidth', defaultValue) * state.view.scale + spacing;
	
					return new mxPoint(p0.x + nx * dist / 4 + ny * w / 2, p0.y + ny * dist / 4 - nx * w / 2);
				}, function(dist, nx, ny, p0, p1, pt)
				{
					var w = Math.sqrt(mxUtils.ptSegDistSq(p0.x, p0.y, p1.x, p1.y, pt.x, pt.y));					
					state.style['startWidth'] = Math.round(w * 2) / state.view.scale - spacing;
				})];
			};
		};

		function createEdgeHandle(state, keys, start, getPosition, setPosition)
		{
			return createHandle(state, keys, function(bounds)
			{
				var pts = state.absolutePoints;

				if (pts != null && pts.length > 0)
				{
					var n = pts.length - 1;
					
					var tr = state.view.translate;
					var s = state.view.scale;
					
					var p0 = (start) ? pts[0] : pts[n];
					var p1 = (start) ? pts[1] : pts[n - 1];
					var dx = (start) ? p1.x - p0.x : p1.x - p0.x;
					var dy = (start) ? p1.y - p0.y : p1.y - p0.y;

					var dist = Math.sqrt(dx * dx + dy * dy);
					
					var pt = getPosition.call(this, dist, dx / dist, dy / dist, p0, p1);
					
					return new mxPoint(pt.x / s - tr.x, pt.y / s - tr.y);
				}
				else
				{
					return null;
				}
			}, function(bounds, pt, me)
			{
				var pts = state.absolutePoints;
				var n = pts.length - 1;
				
				var tr = state.view.translate;
				var s = state.view.scale;
				
				var p0 = (start) ? pts[0] : pts[n];
				var p1 = (start) ? pts[1] : pts[n - 1];
				var dx = (start) ? p1.x - p0.x : p1.x - p0.x;
				var dy = (start) ? p1.y - p0.y : p1.y - p0.y;

				var dist = Math.sqrt(dx * dx + dy * dy);
				pt.x = (pt.x + tr.x) * s;
				pt.y = (pt.y + tr.y) * s;

				setPosition.call(this, dist, dx / dist, dy / dist, p0, p1, pt, me);
			});
		};
		
		function createEdgeWidthHandle(state, start, spacing)
		{
			return createEdgeHandle(state, ['width'], start, function(dist, nx, ny, p0, p1)
			{
				var w = state.shape.getEdgeWidth() * state.view.scale + spacing;

				return new mxPoint(p0.x + nx * dist / 4 + ny * w / 2, p0.y + ny * dist / 4 - nx * w / 2);
			}, function(dist, nx, ny, p0, p1, pt)
			{
				var w = Math.sqrt(mxUtils.ptSegDistSq(p0.x, p0.y, p1.x, p1.y, pt.x, pt.y));					
				state.style['width'] = Math.round(w * 2) / state.view.scale - spacing;
			});
		};
		
		function ptLineDistance(x1, y1, x2, y2, x0, y0)
		{
			return Math.abs((y2 - y1) * x0 - (x2 - x1) * y0 + x2 * y1 - y2 * x1) / Math.sqrt((y2 - y1) * (y2 - y1) + (x2 - x1) * (x2 - x1));
		}

		var handleFactory = {
			'link': function(state)
			{
				var spacing = 10;

				return [createEdgeWidthHandle(state, true, spacing), createEdgeWidthHandle(state, false, spacing)];
			},
			'flexArrow': function(state)
			{
				// Do not use state.shape.startSize/endSize since it is cached
				var tol = state.view.graph.gridSize / state.view.scale;
				var handles = [];
				
				if (mxUtils.getValue(state.style, mxConstants.STYLE_STARTARROW, mxConstants.NONE) != mxConstants.NONE)
				{
					handles.push(createEdgeHandle(state, ['width', mxConstants.STYLE_STARTSIZE, mxConstants.STYLE_ENDSIZE], true, function(dist, nx, ny, p0, p1)
					{
						var w = (state.shape.getEdgeWidth() - state.shape.strokewidth) * state.view.scale;
						var l = mxUtils.getNumber(state.style, mxConstants.STYLE_STARTSIZE, mxConstants.ARROW_SIZE / 5) * 3 * state.view.scale;
						
						return new mxPoint(p0.x + nx * (l + state.shape.strokewidth * state.view.scale) + ny * w / 2,
							p0.y + ny * (l + state.shape.strokewidth * state.view.scale) - nx * w / 2);
					}, function(dist, nx, ny, p0, p1, pt, me)
					{
						var w = Math.sqrt(mxUtils.ptSegDistSq(p0.x, p0.y, p1.x, p1.y, pt.x, pt.y));
						var l = mxUtils.ptLineDist(p0.x, p0.y, p0.x + ny, p0.y - nx, pt.x, pt.y);
						
						state.style[mxConstants.STYLE_STARTSIZE] = Math.round((l - state.shape.strokewidth) * 100 / 3) / 100 / state.view.scale;
						state.style['width'] = Math.round(w * 2) / state.view.scale;
						
						// Applies to opposite side
						if (mxEvent.isShiftDown(me.getEvent()) || mxEvent.isControlDown(me.getEvent()))
						{
							state.style[mxConstants.STYLE_ENDSIZE] = state.style[mxConstants.STYLE_STARTSIZE];
						}

						// Snaps to end geometry
						if (!mxEvent.isAltDown(me.getEvent()))
						{
							if (Math.abs(parseFloat(state.style[mxConstants.STYLE_STARTSIZE]) - parseFloat(state.style[mxConstants.STYLE_ENDSIZE])) < tol / 6)
							{
								state.style[mxConstants.STYLE_STARTSIZE] = state.style[mxConstants.STYLE_ENDSIZE];
							}
						}
					}));
					
					handles.push(createEdgeHandle(state, ['startWidth', 'endWidth', mxConstants.STYLE_STARTSIZE, mxConstants.STYLE_ENDSIZE], true, function(dist, nx, ny, p0, p1)
					{
						var w = (state.shape.getStartArrowWidth() - state.shape.strokewidth) * state.view.scale;
						var l = mxUtils.getNumber(state.style, mxConstants.STYLE_STARTSIZE, mxConstants.ARROW_SIZE / 5) * 3 * state.view.scale;
						
						return new mxPoint(p0.x + nx * (l + state.shape.strokewidth * state.view.scale) + ny * w / 2,
							p0.y + ny * (l + state.shape.strokewidth * state.view.scale) - nx * w / 2);
					}, function(dist, nx, ny, p0, p1, pt, me)
					{
						var w = Math.sqrt(mxUtils.ptSegDistSq(p0.x, p0.y, p1.x, p1.y, pt.x, pt.y));
						var l = mxUtils.ptLineDist(p0.x, p0.y, p0.x + ny, p0.y - nx, pt.x, pt.y);
						
						state.style[mxConstants.STYLE_STARTSIZE] = Math.round((l - state.shape.strokewidth) * 100 / 3) / 100 / state.view.scale;
						state.style['startWidth'] = Math.max(0, Math.round(w * 2) - state.shape.getEdgeWidth()) / state.view.scale;
						
						// Applies to opposite side
						if (mxEvent.isShiftDown(me.getEvent()) || mxEvent.isControlDown(me.getEvent()))
						{
							state.style[mxConstants.STYLE_ENDSIZE] = state.style[mxConstants.STYLE_STARTSIZE];
							state.style['endWidth'] = state.style['startWidth'];
						}
						
						// Snaps to endWidth
						if (!mxEvent.isAltDown(me.getEvent()))
						{
							if (Math.abs(parseFloat(state.style[mxConstants.STYLE_STARTSIZE]) - parseFloat(state.style[mxConstants.STYLE_ENDSIZE])) < tol / 6)
							{
								state.style[mxConstants.STYLE_STARTSIZE] = state.style[mxConstants.STYLE_ENDSIZE];
							}
							
							if (Math.abs(parseFloat(state.style['startWidth']) - parseFloat(state.style['endWidth'])) < tol)
							{
								state.style['startWidth'] = state.style['endWidth'];
							}
						}
					}));
				}
				
				if (mxUtils.getValue(state.style, mxConstants.STYLE_ENDARROW, mxConstants.NONE) != mxConstants.NONE)
				{
					handles.push(createEdgeHandle(state, ['width', mxConstants.STYLE_STARTSIZE, mxConstants.STYLE_ENDSIZE], false, function(dist, nx, ny, p0, p1)
					{
						var w = (state.shape.getEdgeWidth() - state.shape.strokewidth) * state.view.scale;
						var l = mxUtils.getNumber(state.style, mxConstants.STYLE_ENDSIZE, mxConstants.ARROW_SIZE / 5) * 3 * state.view.scale;
						
						return new mxPoint(p0.x + nx * (l + state.shape.strokewidth * state.view.scale) - ny * w / 2,
							p0.y + ny * (l + state.shape.strokewidth * state.view.scale) + nx * w / 2);
					}, function(dist, nx, ny, p0, p1, pt, me)
					{
						var w = Math.sqrt(mxUtils.ptSegDistSq(p0.x, p0.y, p1.x, p1.y, pt.x, pt.y));
						var l = mxUtils.ptLineDist(p0.x, p0.y, p0.x + ny, p0.y - nx, pt.x, pt.y);
						
						state.style[mxConstants.STYLE_ENDSIZE] = Math.round((l - state.shape.strokewidth) * 100 / 3) / 100 / state.view.scale;
						state.style['width'] = Math.round(w * 2) / state.view.scale;
						
						// Applies to opposite side
						if (mxEvent.isShiftDown(me.getEvent()) || mxEvent.isControlDown(me.getEvent()))
						{
							state.style[mxConstants.STYLE_STARTSIZE] = state.style[mxConstants.STYLE_ENDSIZE];
						}
					
						// Snaps to start geometry
						if (!mxEvent.isAltDown(me.getEvent()))
						{
							if (Math.abs(parseFloat(state.style[mxConstants.STYLE_ENDSIZE]) - parseFloat(state.style[mxConstants.STYLE_STARTSIZE])) < tol / 6)
							{
								state.style[mxConstants.STYLE_ENDSIZE] = state.style[mxConstants.STYLE_STARTSIZE];
							}
						}
					}));
					
					handles.push(createEdgeHandle(state, ['startWidth', 'endWidth', mxConstants.STYLE_STARTSIZE, mxConstants.STYLE_ENDSIZE], false, function(dist, nx, ny, p0, p1)
					{
						var w = (state.shape.getEndArrowWidth() - state.shape.strokewidth) * state.view.scale;
						var l = mxUtils.getNumber(state.style, mxConstants.STYLE_ENDSIZE, mxConstants.ARROW_SIZE / 5) * 3 * state.view.scale;
						
						return new mxPoint(p0.x + nx * (l + state.shape.strokewidth * state.view.scale) - ny * w / 2,
							p0.y + ny * (l + state.shape.strokewidth * state.view.scale) + nx * w / 2);
					}, function(dist, nx, ny, p0, p1, pt, me)
					{
						var w = Math.sqrt(mxUtils.ptSegDistSq(p0.x, p0.y, p1.x, p1.y, pt.x, pt.y));
						var l = mxUtils.ptLineDist(p0.x, p0.y, p0.x + ny, p0.y - nx, pt.x, pt.y);
						
						state.style[mxConstants.STYLE_ENDSIZE] = Math.round((l - state.shape.strokewidth) * 100 / 3) / 100 / state.view.scale;
						state.style['endWidth'] = Math.max(0, Math.round(w * 2) - state.shape.getEdgeWidth()) / state.view.scale;
						
						// Applies to opposite side
						if (mxEvent.isShiftDown(me.getEvent()) || mxEvent.isControlDown(me.getEvent()))
						{
							state.style[mxConstants.STYLE_STARTSIZE] = state.style[mxConstants.STYLE_ENDSIZE];
							state.style['startWidth'] = state.style['endWidth'];
						}
					
						// Snaps to start geometry
						if (!mxEvent.isAltDown(me.getEvent()))
						{
							if (Math.abs(parseFloat(state.style[mxConstants.STYLE_ENDSIZE]) - parseFloat(state.style[mxConstants.STYLE_STARTSIZE])) < tol / 6)
							{
								state.style[mxConstants.STYLE_ENDSIZE] = state.style[mxConstants.STYLE_STARTSIZE];
							}
							
							if (Math.abs(parseFloat(state.style['endWidth']) - parseFloat(state.style['startWidth'])) < tol)
							{
								state.style['endWidth'] = state.style['startWidth'];
							}
						}
					}));
				}
				
				return handles;
			},
			'swimlane': function(state)
			{
				var handles = [];
				
				if (mxUtils.getValue(state.style, mxConstants.STYLE_ROUNDED))
				{
					var size = parseFloat(mxUtils.getValue(state.style, mxConstants.STYLE_STARTSIZE, mxConstants.DEFAULT_STARTSIZE));
					handles.push(createArcHandle(state, size / 2));
				}

				// Start size handle must be last item in handles for hover to work in tables (see mouse event handler in Graph)
				handles.push(createHandle(state, [mxConstants.STYLE_STARTSIZE], function(bounds)
				{
					var size = parseFloat(mxUtils.getValue(state.style, mxConstants.STYLE_STARTSIZE, mxConstants.DEFAULT_STARTSIZE));
					
					if (mxUtils.getValue(state.style, mxConstants.STYLE_HORIZONTAL, 1) == 1)
					{
						return new mxPoint(bounds.getCenterX(), bounds.y + Math.max(0, Math.min(bounds.height, size)));
					}
					else
					{
						return new mxPoint(bounds.x + Math.max(0, Math.min(bounds.width, size)), bounds.getCenterY());
					}
				}, function(bounds, pt)
				{	
					state.style[mxConstants.STYLE_STARTSIZE] =
						(mxUtils.getValue(this.state.style, mxConstants.STYLE_HORIZONTAL, 1) == 1) ?
							Math.round(Math.max(0, Math.min(bounds.height, pt.y - bounds.y))) :
							Math.round(Math.max(0, Math.min(bounds.width, pt.x - bounds.x)));
				}, false, null, function(me)
				{
					var graph = state.view.graph;
					
					if (!mxEvent.isShiftDown(me.getEvent()) && !mxEvent.isControlDown(me.getEvent()) &&
						(graph.isTableRow(state.cell) || graph.isTableCell(state.cell)))
					{
						var dir = graph.getSwimlaneDirection(state.style);
						var parent = graph.model.getParent(state.cell);
						var cells = graph.model.getChildCells(parent, true);
						var temp = [];
						
						for (var i = 0; i < cells.length; i++)
						{
							// Finds siblings with the same direction and to set start size
							if (cells[i] != state.cell && graph.isSwimlane(cells[i]) &&
								graph.getSwimlaneDirection(graph.getCurrentCellStyle(
								cells[i])) == dir)
							{
								temp.push(cells[i]);
							}
						}
						
						graph.setCellStyles(mxConstants.STYLE_STARTSIZE,
							state.style[mxConstants.STYLE_STARTSIZE], temp);
					}					
				}));
				
				return handles;
			},
			'label': createArcHandleFunction(),
			'ext': createArcHandleFunction(),
			'rectangle': createArcHandleFunction(),
			'triangle': createArcHandleFunction(),
			'rhombus': createArcHandleFunction(),
			'umlLifeline': function(state)
			{
				return [createHandle(state, ['size'], function(bounds)
				{
					var size = Math.max(0, Math.min(bounds.height, parseFloat(mxUtils.getValue(this.state.style, 'size', UmlLifeline.prototype.size))));
					
					return new mxPoint(bounds.getCenterX(), bounds.y + size);
				}, function(bounds, pt)
				{	
					this.state.style['size'] = Math.round(Math.max(0, Math.min(bounds.height, pt.y - bounds.y)));
				}, false)];
			},
			'umlFrame': function(state)
			{
				var handles = [createHandle(state, ['width', 'height'], function(bounds)
				{
					var w0 = Math.max(UmlFrame.prototype.corner, Math.min(bounds.width, mxUtils.getValue(this.state.style, 'width', UmlFrame.prototype.width)));
					var h0 = Math.max(UmlFrame.prototype.corner * 1.5, Math.min(bounds.height, mxUtils.getValue(this.state.style, 'height', UmlFrame.prototype.height)));

					return new mxPoint(bounds.x + w0, bounds.y + h0);
				}, function(bounds, pt)
				{
					this.state.style['width'] = Math.round(Math.max(UmlFrame.prototype.corner, Math.min(bounds.width, pt.x - bounds.x)));
					this.state.style['height'] = Math.round(Math.max(UmlFrame.prototype.corner * 1.5, Math.min(bounds.height, pt.y - bounds.y)));
				}, false)];
				
				return handles;
			},
			'process': function(state)
			{
				var handles = [createHandle(state, ['size'], function(bounds)
				{
					
					var fixed = mxUtils.getValue(this.state.style, 'fixedSize', '0') != '0';
					var size = parseFloat(mxUtils.getValue(this.state.style, 'size', ProcessShape.prototype.size));
					
					return (fixed) ? new mxPoint(bounds.x + size, bounds.y + bounds.height / 4) : new mxPoint(bounds.x + bounds.width * size, bounds.y + bounds.height / 4);
				}, function(bounds, pt)
				{
					var fixed = mxUtils.getValue(this.state.style, 'fixedSize', '0') != '0';
					var size = (fixed) ? Math.max(0, Math.min(bounds.width * 0.5, (pt.x - bounds.x))) : Math.max(0, Math.min(0.5, (pt.x - bounds.x) / bounds.width));
					this.state.style['size'] = size;
				}, false)];
				
				if (mxUtils.getValue(state.style, mxConstants.STYLE_ROUNDED, false))
				{
					handles.push(createArcHandle(state));
				}
				
				return handles;
			},
			'cross': function(state)
			{
				return [createHandle(state, ['size'], function(bounds)
				{
					var m = Math.min(bounds.width, bounds.height);
					var size = Math.max(0, Math.min(1, mxUtils.getValue(this.state.style, 'size', CrossShape.prototype.size))) * m / 2;

					return new mxPoint(bounds.getCenterX() - size, bounds.getCenterY() - size);
				}, function(bounds, pt)
				{
					var m = Math.min(bounds.width, bounds.height);
					this.state.style['size'] = Math.max(0, Math.min(1, Math.min((Math.max(0, bounds.getCenterY() - pt.y) / m) * 2,
							(Math.max(0, bounds.getCenterX() - pt.x) / m) * 2)));
				})];
			},
			'note': function(state)
			{
				return [createHandle(state, ['size'], function(bounds)
				{
					var size = Math.max(0, Math.min(bounds.width, Math.min(bounds.height, parseFloat(
						mxUtils.getValue(this.state.style, 'size', NoteShape.prototype.size)))));
					
					return new mxPoint(bounds.x + bounds.width - size, bounds.y + size);
				}, function(bounds, pt)
				{
					this.state.style['size'] = Math.round(Math.max(0, Math.min(Math.min(bounds.width, bounds.x + bounds.width - pt.x),
							Math.min(bounds.height, pt.y - bounds.y))));
				})];
			},
			'note2': function(state)
			{
				return [createHandle(state, ['size'], function(bounds)
				{
					var size = Math.max(0, Math.min(bounds.width, Math.min(bounds.height, parseFloat(
						mxUtils.getValue(this.state.style, 'size', NoteShape2.prototype.size)))));
					
					return new mxPoint(bounds.x + bounds.width - size, bounds.y + size);
				}, function(bounds, pt)
				{
					this.state.style['size'] = Math.round(Math.max(0, Math.min(Math.min(bounds.width, bounds.x + bounds.width - pt.x),
							Math.min(bounds.height, pt.y - bounds.y))));
				})];
			},
			'manualInput': function(state)
			{
				var handles = [createHandle(state, ['size'], function(bounds)
				{
					var size = Math.max(0, Math.min(bounds.height, mxUtils.getValue(this.state.style, 'size', ManualInputShape.prototype.size)));
					
					return new mxPoint(bounds.x + bounds.width / 4, bounds.y + size * 3 / 4);
				}, function(bounds, pt)
				{
					this.state.style['size'] = Math.round(Math.max(0, Math.min(bounds.height, (pt.y - bounds.y) * 4 / 3)));
				}, false)];
				
				if (mxUtils.getValue(state.style, mxConstants.STYLE_ROUNDED, false))
				{
					handles.push(createArcHandle(state));
				}
				
				return handles;
			},
			'dataStorage': function(state)
			{
				return [createHandle(state, ['size'], function(bounds)
				{
					var fixed = mxUtils.getValue(this.state.style, 'fixedSize', '0') != '0';
					var size = parseFloat(mxUtils.getValue(this.state.style, 'size', (fixed) ? DataStorageShape.prototype.fixedSize : DataStorageShape.prototype.size));

					return new mxPoint(bounds.x + bounds.width - size * ((fixed) ? 1 : bounds.width), bounds.getCenterY());
				}, function(bounds, pt)
				{
					var fixed = mxUtils.getValue(this.state.style, 'fixedSize', '0') != '0';
					var size = (fixed) ? Math.max(0, Math.min(bounds.width, (bounds.x + bounds.width - pt.x))) : Math.max(0, Math.min(1, (bounds.x + bounds.width - pt.x) / bounds.width));
					
					this.state.style['size'] = size;
				}, false)];
			},
			'callout': function(state)
			{
				var handles = [createHandle(state, ['size', 'position'], function(bounds)
				{
					var size = Math.max(0, Math.min(bounds.height, mxUtils.getValue(this.state.style, 'size', CalloutShape.prototype.size)));
					var position = Math.max(0, Math.min(1, mxUtils.getValue(this.state.style, 'position', CalloutShape.prototype.position)));
					var base = Math.max(0, Math.min(bounds.width, mxUtils.getValue(this.state.style, 'base', CalloutShape.prototype.base)));
					
					return new mxPoint(bounds.x + position * bounds.width, bounds.y + bounds.height - size);
				}, function(bounds, pt)
				{
					var base = Math.max(0, Math.min(bounds.width, mxUtils.getValue(this.state.style, 'base', CalloutShape.prototype.base)));
					this.state.style['size'] = Math.round(Math.max(0, Math.min(bounds.height, bounds.y + bounds.height - pt.y)));
					this.state.style['position'] = Math.round(Math.max(0, Math.min(1, (pt.x - bounds.x) / bounds.width)) * 100) / 100;
				}, false), createHandle(state, ['position2'], function(bounds)
				{
					var position2 = Math.max(0, Math.min(1, mxUtils.getValue(this.state.style, 'position2', CalloutShape.prototype.position2)));

					return new mxPoint(bounds.x + position2 * bounds.width, bounds.y + bounds.height);
				}, function(bounds, pt)
				{
					this.state.style['position2'] = Math.round(Math.max(0, Math.min(1, (pt.x - bounds.x) / bounds.width)) * 100) / 100;
				}, false), createHandle(state, ['base'], function(bounds)
				{
					var size = Math.max(0, Math.min(bounds.height, mxUtils.getValue(this.state.style, 'size', CalloutShape.prototype.size)));
					var position = Math.max(0, Math.min(1, mxUtils.getValue(this.state.style, 'position', CalloutShape.prototype.position)));
					var base = Math.max(0, Math.min(bounds.width, mxUtils.getValue(this.state.style, 'base', CalloutShape.prototype.base)));
					
					return new mxPoint(bounds.x + Math.min(bounds.width, position * bounds.width + base), bounds.y + bounds.height - size);
				}, function(bounds, pt)
				{
					var position = Math.max(0, Math.min(1, mxUtils.getValue(this.state.style, 'position', CalloutShape.prototype.position)));

					this.state.style['base'] = Math.round(Math.max(0, Math.min(bounds.width, pt.x - bounds.x - position * bounds.width)));
				}, false)];
				
				if (mxUtils.getValue(state.style, mxConstants.STYLE_ROUNDED, false))
				{
					handles.push(createArcHandle(state));
				}
				
				return handles;
			},
			'internalStorage': function(state)
			{
				var handles = [createHandle(state, ['dx', 'dy'], function(bounds)
				{
					var dx = Math.max(0, Math.min(bounds.width, mxUtils.getValue(this.state.style, 'dx', InternalStorageShape.prototype.dx)));
					var dy = Math.max(0, Math.min(bounds.height, mxUtils.getValue(this.state.style, 'dy', InternalStorageShape.prototype.dy)));

					return new mxPoint(bounds.x + dx, bounds.y + dy);
				}, function(bounds, pt)
				{
					this.state.style['dx'] = Math.round(Math.max(0, Math.min(bounds.width, pt.x - bounds.x)));
					this.state.style['dy'] = Math.round(Math.max(0, Math.min(bounds.height, pt.y - bounds.y)));
				}, false)];
				
				if (mxUtils.getValue(state.style, mxConstants.STYLE_ROUNDED, false))
				{
					handles.push(createArcHandle(state));
				}
				
				return handles;
			},
			'module': function(state)
			{
				var handles = [createHandle(state, ['jettyWidth', 'jettyHeight'], function(bounds)
				{
					var dx = Math.max(0, Math.min(bounds.width, mxUtils.getValue(this.state.style, 'jettyWidth', ModuleShape.prototype.jettyWidth)));
					var dy = Math.max(0, Math.min(bounds.height, mxUtils.getValue(this.state.style, 'jettyHeight', ModuleShape.prototype.jettyHeight)));

					return new mxPoint(bounds.x + dx / 2, bounds.y + dy * 2);
				}, function(bounds, pt)
				{
					this.state.style['jettyWidth'] = Math.round(Math.max(0, Math.min(bounds.width, pt.x - bounds.x)) * 2);
					this.state.style['jettyHeight'] = Math.round(Math.max(0, Math.min(bounds.height, pt.y - bounds.y)) / 2);
				})];
				
				return handles;
			},
			'corner': function(state)
			{
				return [createHandle(state, ['dx', 'dy'], function(bounds)
				{
					var dx = Math.max(0, Math.min(bounds.width, mxUtils.getValue(this.state.style, 'dx', CornerShape.prototype.dx)));
					var dy = Math.max(0, Math.min(bounds.height, mxUtils.getValue(this.state.style, 'dy', CornerShape.prototype.dy)));

					return new mxPoint(bounds.x + dx, bounds.y + dy);
				}, function(bounds, pt)
				{
					this.state.style['dx'] = Math.round(Math.max(0, Math.min(bounds.width, pt.x - bounds.x)));
					this.state.style['dy'] = Math.round(Math.max(0, Math.min(bounds.height, pt.y - bounds.y)));
				}, false)];
			},
			'tee': function(state)
			{
				return [createHandle(state, ['dx', 'dy'], function(bounds)
				{
					var dx = Math.max(0, Math.min(bounds.width, mxUtils.getValue(this.state.style, 'dx', TeeShape.prototype.dx)));
					var dy = Math.max(0, Math.min(bounds.height, mxUtils.getValue(this.state.style, 'dy', TeeShape.prototype.dy)));

					return new mxPoint(bounds.x + (bounds.width + dx) / 2, bounds.y + dy);
				}, function(bounds, pt)
				{
					this.state.style['dx'] = Math.round(Math.max(0, Math.min(bounds.width / 2, (pt.x - bounds.x - bounds.width / 2)) * 2));
					this.state.style['dy'] = Math.round(Math.max(0, Math.min(bounds.height, pt.y - bounds.y)));
				}, false)];
			},
			'singleArrow': createArrowHandleFunction(1),
			'doubleArrow': createArrowHandleFunction(0.5),
			'mxgraph.arrows2.wedgeArrow': createWedgeHandleFunction(20, 20),
			'mxgraph.arrows2.wedgeArrowDashed': createWedgeHandleFunction(20, 20),
			'mxgraph.arrows2.wedgeArrowDashed2': createWedgeHandleFunction(20, 20),
			'folder': function(state)
			{
				return [createHandle(state, ['tabWidth', 'tabHeight'], function(bounds)
				{
					var tw = Math.max(0, Math.min(bounds.width, mxUtils.getValue(this.state.style, 'tabWidth', FolderShape.prototype.tabWidth)));
					var th = Math.max(0, Math.min(bounds.height, mxUtils.getValue(this.state.style, 'tabHeight', FolderShape.prototype.tabHeight)));
					
					if (mxUtils.getValue(this.state.style, 'tabPosition', FolderShape.prototype.tabPosition) == mxConstants.ALIGN_RIGHT)
					{
						tw = bounds.width - tw;
					}
					
					return new mxPoint(bounds.x + tw, bounds.y + th);
				}, function(bounds, pt)
				{
					var tw = Math.max(0, Math.min(bounds.width, pt.x - bounds.x));
					
					if (mxUtils.getValue(this.state.style, 'tabPosition', FolderShape.prototype.tabPosition) == mxConstants.ALIGN_RIGHT)
					{
						tw = bounds.width - tw;
					}
					
					this.state.style['tabWidth'] = Math.round(tw);
					this.state.style['tabHeight'] = Math.round(Math.max(0, Math.min(bounds.height, pt.y - bounds.y)));
				}, false)];
			},
			'document': function(state)
			{
				return [createHandle(state, ['size'], function(bounds)
				{
					var size = Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.state.style, 'size', DocumentShape.prototype.size))));

					return new mxPoint(bounds.x + 3 * bounds.width / 4, bounds.y + (1 - size) * bounds.height);
				}, function(bounds, pt)
				{
					this.state.style['size'] = Math.max(0, Math.min(1, (bounds.y + bounds.height - pt.y) / bounds.height));
				}, false)];
			},
			'tape': function(state)
			{
				return [createHandle(state, ['size'], function(bounds)
				{
					var size = Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.state.style, 'size', TapeShape.prototype.size))));

					return new mxPoint(bounds.getCenterX(), bounds.y + size * bounds.height / 2);
				}, function(bounds, pt)
				{
					this.state.style['size'] = Math.max(0, Math.min(1, ((pt.y - bounds.y) / bounds.height) * 2));
				}, false)];
			},
			'isoCube2' : function(state)
			{
				return [createHandle(state, ['isoAngle'], function(bounds)
				{
					var isoAngle = Math.max(0.01, Math.min(94, parseFloat(mxUtils.getValue(this.state.style, 'isoAngle', IsoCubeShape2.isoAngle)))) * Math.PI / 200 ;
					var isoH = Math.min(bounds.width * Math.tan(isoAngle), bounds.height * 0.5);

					return new mxPoint(bounds.x, bounds.y + isoH);
				}, function(bounds, pt)
				{
					this.state.style['isoAngle'] = Math.max(0, (pt.y - bounds.y) * 50 / bounds.height);
				}, true)];
			},
			'cylinder2' : createCylinderHandleFunction(CylinderShape.prototype.size),
			'cylinder3' : createCylinderHandleFunction(CylinderShape3.prototype.size),
			'offPageConnector': function(state)
			{
				return [createHandle(state, ['size'], function(bounds)
				{
					var size = Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.state.style, 'size', OffPageConnectorShape.prototype.size))));

					return new mxPoint(bounds.getCenterX(), bounds.y + (1 - size) * bounds.height);
				}, function(bounds, pt)
				{
					this.state.style['size'] = Math.max(0, Math.min(1, (bounds.y + bounds.height - pt.y) / bounds.height));
				}, false)];
			},
			'mxgraph.basic.rect': function(state)
			{
				var handles = [Graph.createHandle(state, ['size'], function(bounds)
				{
					var size = Math.max(0, Math.min(bounds.width / 2, bounds.height / 2, parseFloat(mxUtils.getValue(this.state.style, 'size', this.size))));
		
					return new mxPoint(bounds.x + size, bounds.y + size);
				}, function(bounds, pt)
				{
					this.state.style['size'] = Math.round(100 * Math.max(0, Math.min(bounds.height / 2, bounds.width / 2, pt.x - bounds.x))) / 100;
				})];
						
				var handle2 = Graph.createHandle(state, ['indent'], function(bounds)
				{
					var dx2 = Math.max(0, Math.min(100, parseFloat(mxUtils.getValue(this.state.style, 'indent', this.dx2))));
		
					return new mxPoint(bounds.x + bounds.width * 0.75, bounds.y + dx2 * bounds.height / 200);
				}, function(bounds, pt)
				{
					this.state.style['indent'] = Math.round(100 * Math.max(0, Math.min(100, 200 * (pt.y - bounds.y) / bounds.height))) / 100;
				});
				
				handles.push(handle2);
				
				return handles;
			},
			'step': createDisplayHandleFunction(StepShape.prototype.size, true, null, true, StepShape.prototype.fixedSize),
			'hexagon': createDisplayHandleFunction(HexagonShape.prototype.size, true, 0.5, true, HexagonShape.prototype.fixedSize),
			'curlyBracket': createDisplayHandleFunction(CurlyBracketShape.prototype.size, false),
			'display': createDisplayHandleFunction(DisplayShape.prototype.size, false),
			'cube': createCubeHandleFunction(1, CubeShape.prototype.size, false),
			'card': createCubeHandleFunction(0.5, CardShape.prototype.size, true),
			'loopLimit': createCubeHandleFunction(0.5, LoopLimitShape.prototype.size, true),
			'trapezoid': createTrapezoidHandleFunction(0.5, TrapezoidShape.prototype.size, TrapezoidShape.prototype.fixedSize),
			'parallelogram': createTrapezoidHandleFunction(1, ParallelogramShape.prototype.size, ParallelogramShape.prototype.fixedSize)
		};
		
		// Exposes custom handles
		Graph.createHandle = createHandle;
		Graph.handleFactory = handleFactory;

		var vertexHandlerCreateCustomHandles = mxVertexHandler.prototype.createCustomHandles;

		mxVertexHandler.prototype.createCustomHandles = function()
		{
			var handles = vertexHandlerCreateCustomHandles.apply(this, arguments);
			
			if (this.graph.isCellRotatable(this.state.cell))
			// LATER: Make locked state independent of rotatable flag, fix toggle if default is false
			//if (this.graph.isCellResizable(this.state.cell) || this.graph.isCellMovable(this.state.cell))
			{
				var name = this.state.style['shape'];

				if (mxCellRenderer.defaultShapes[name] == null &&
					mxStencilRegistry.getStencil(name) == null)
				{
					name = mxConstants.SHAPE_RECTANGLE;
				}
				else if (this.state.view.graph.isSwimlane(this.state.cell))
				{
					name = mxConstants.SHAPE_SWIMLANE;
				}
				
				var fn = handleFactory[name];
				
				if (fn == null && this.state.shape != null && this.state.shape.isRoundable())
				{
					fn = handleFactory[mxConstants.SHAPE_RECTANGLE];
				}
			
				if (fn != null)
				{
					var temp = fn(this.state);
					
					if (temp != null)
					{
						if (handles == null)
						{
							handles = temp;
						}
						else
						{
							handles = handles.concat(temp);
						}
					}
				}
			}
			
			return handles;
		};

		mxEdgeHandler.prototype.createCustomHandles = function()
		{
			var name = this.state.style['shape'];
			
			if (mxCellRenderer.defaultShapes[name] == null &&
				mxStencilRegistry.getStencil(name) == null)
			{
				name = mxConstants.SHAPE_CONNECTOR;
			}
			
			var fn = handleFactory[name];
			
			if (fn != null)
			{
				return fn(this.state);
			}
			
			return null;
		}
	}
	else
	{
		// Dummy entries to avoid NPE in embed mode
		Graph.createHandle = function() {};
		Graph.handleFactory = {};
	}

	 var isoHVector = new mxPoint(1, 0);
	 var isoVVector = new mxPoint(1, 0);
		
	 var alpha1 = mxUtils.toRadians(-30);
		
	 var cos1 = Math.cos(alpha1);
	 var sin1 = Math.sin(alpha1);

	 isoHVector = mxUtils.getRotatedPoint(isoHVector, cos1, sin1);

	 var alpha2 = mxUtils.toRadians(-150);
	 
	 var cos2 = Math.cos(alpha2);
	 var sin2 = Math.sin(alpha2);

	 isoVVector = mxUtils.getRotatedPoint(isoVVector, cos2, sin2);
	
	 mxEdgeStyle.IsometricConnector = function (state, source, target, points, result)
	 {
		var view = state.view;
		var pt = (points != null && points.length > 0) ? points[0] : null;
		var pts = state.absolutePoints;
		var p0 = pts[0];
		var pe = pts[pts.length-1];
		
		if (pt != null)
		{
			pt = view.transformControlPoint(state, pt);
		}
		
		if (p0 == null)
		{
			if (source != null)
			{
				p0 = new mxPoint(source.getCenterX(), source.getCenterY());
			}
		}
		
		if (pe == null)
		{
			if (target != null)
			{
				pe = new mxPoint(target.getCenterX(), target.getCenterY());
			}
		}		
		
		var a1 = isoHVector.x;
		var a2 = isoHVector.y;
		
		var b1 = isoVVector.x;
		var b2 = isoVVector.y;
		
		var elbow = mxUtils.getValue(state.style, 'elbow', 'horizontal') == 'horizontal';
		
		if (pe != null && p0 != null)
		{
			var last = p0;
			
			function isoLineTo(x, y, ignoreFirst)
			{
				var c1 = x - last.x;
				var c2 = y - last.y;

				// Solves for isometric base vectors
				var h = (b2 * c1 - b1 * c2) / (a1 * b2 - a2 * b1);
				var v = (a2 * c1 - a1 * c2) / (a2 * b1 - a1 * b2);
				
				if (elbow)
				{
					if (ignoreFirst)
					{
						last = new mxPoint(last.x + a1 * h, last.y + a2 * h);
						result.push(last);
					}
	
					last = new mxPoint(last.x + b1 * v, last.y + b2 * v);
					result.push(last);
				}
				else
				{
					if (ignoreFirst)
					{
						last = new mxPoint(last.x + b1 * v, last.y + b2 * v);
						result.push(last);
					}

					last = new mxPoint(last.x + a1 * h, last.y + a2 * h);
					result.push(last);
				}
			};

			if (pt == null)
			{
				pt = new mxPoint(p0.x + (pe.x - p0.x) / 2, p0.y + (pe.y - p0.y) / 2);
			}
			
			isoLineTo(pt.x, pt.y, true);
			isoLineTo(pe.x, pe.y, false);
		}
	 };

	 mxStyleRegistry.putValue('isometricEdgeStyle', mxEdgeStyle.IsometricConnector);
	
	 var graphCreateEdgeHandler = Graph.prototype.createEdgeHandler;
	 Graph.prototype.createEdgeHandler = function(state, edgeStyle)
	 {
	 	if (edgeStyle == mxEdgeStyle.IsometricConnector)
	 	{
	 		var handler = new mxElbowEdgeHandler(state);
	 		handler.snapToTerminals = false;
	 		
	 		return handler;
	 	}
	 	
	 	return graphCreateEdgeHandler.apply(this, arguments);
	 };

	// Defines connection points for all shapes
	IsoRectangleShape.prototype.constraints = [];
	
	IsoCubeShape.prototype.getConstraints = function(style, w, h)
	{
		var constr = [];
		var tan30 = Math.tan(mxUtils.toRadians(30));
		var tan30Dx = (0.5 - tan30) / 2;
		var m = Math.min(w, h / (0.5 + tan30));
		var dx = (w - m) / 2;
		var dy = (h - m) / 2;

		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, dx, dy + 0.25 * m));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, dx + 0.5 * m, dy + m * tan30Dx));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, dx + m, dy + 0.25 * m));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, dx + m, dy + 0.75 * m));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, dx + 0.5 * m, dy + (1 - tan30Dx) * m));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, dx, dy + 0.75 * m));

		return (constr);
	};

	IsoCubeShape2.prototype.getConstraints = function(style, w, h)
	{
		var constr = [];
		var isoAngle = Math.max(0.01, Math.min(94, parseFloat(mxUtils.getValue(this.style, 'isoAngle', this.isoAngle)))) * Math.PI / 200 ;
		var isoH = Math.min(w * Math.tan(isoAngle), h * 0.5);
		
		constr.push(new mxConnectionConstraint(new mxPoint(0.5, 0), false));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, w, isoH));
		constr.push(new mxConnectionConstraint(new mxPoint(1, 0.5), false));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, w, h - isoH));
		constr.push(new mxConnectionConstraint(new mxPoint(0.5, 1), false));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, 0, h - isoH));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0.5), false));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, 0, isoH));

		return (constr);
	}
	
	CalloutShape.prototype.getConstraints = function(style, w, h)
	{
		var constr = [];
		var arcSize = mxUtils.getValue(this.style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE) / 2;
		var s = Math.max(0, Math.min(h, parseFloat(mxUtils.getValue(this.style, 'size', this.size))));
		var dx = w * Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'position', this.position))));
		var dx2 = w * Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'position2', this.position2))));
		var base = Math.max(0, Math.min(w, parseFloat(mxUtils.getValue(this.style, 'base', this.base))));
		
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false));
		constr.push(new mxConnectionConstraint(new mxPoint(0.25, 0), false));
		constr.push(new mxConnectionConstraint(new mxPoint(0.5, 0), false));
		constr.push(new mxConnectionConstraint(new mxPoint(0.75, 0), false));
		constr.push(new mxConnectionConstraint(new mxPoint(1, 0), false));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, w, (h - s) * 0.5));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, w, h - s));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, dx2, h));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, 0, h - s));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, 0, (h - s) * 0.5));
		
		if (w >= s * 2)
		{
			constr.push(new mxConnectionConstraint(new mxPoint(0.5, 0), false));
		}

		return (constr);
	};
	
	mxRectangleShape.prototype.constraints = [new mxConnectionConstraint(new mxPoint(0, 0), true),
											  new mxConnectionConstraint(new mxPoint(0.25, 0), true),
	                                          new mxConnectionConstraint(new mxPoint(0.5, 0), true),
	                                          new mxConnectionConstraint(new mxPoint(0.75, 0), true),
	                                          new mxConnectionConstraint(new mxPoint(1, 0), true),
	        	              		 new mxConnectionConstraint(new mxPoint(0, 0.25), true),
	        	              		 new mxConnectionConstraint(new mxPoint(0, 0.5), true),
	        	              		 new mxConnectionConstraint(new mxPoint(0, 0.75), true),
	        	            		 new mxConnectionConstraint(new mxPoint(1, 0.25), true),
	        	            		 new mxConnectionConstraint(new mxPoint(1, 0.5), true),
	        	            		 new mxConnectionConstraint(new mxPoint(1, 0.75), true),
	        	            		 new mxConnectionConstraint(new mxPoint(0, 1), true),
	        	            		 new mxConnectionConstraint(new mxPoint(0.25, 1), true),
	        	            		 new mxConnectionConstraint(new mxPoint(0.5, 1), true),
	        	            		 new mxConnectionConstraint(new mxPoint(0.75, 1), true),
	        	            		 new mxConnectionConstraint(new mxPoint(1, 1), true)];
	mxEllipse.prototype.constraints = [new mxConnectionConstraint(new mxPoint(0, 0), true), new mxConnectionConstraint(new mxPoint(1, 0), true),
	                                   new mxConnectionConstraint(new mxPoint(0, 1), true), new mxConnectionConstraint(new mxPoint(1, 1), true),
	                                   new mxConnectionConstraint(new mxPoint(0.5, 0), true), new mxConnectionConstraint(new mxPoint(0.5, 1), true),
	          	              		   new mxConnectionConstraint(new mxPoint(0, 0.5), true), new mxConnectionConstraint(new mxPoint(1, 0.5))];
	PartialRectangleShape.prototype.constraints = mxRectangleShape.prototype.constraints;
	mxImageShape.prototype.constraints = mxRectangleShape.prototype.constraints;
	mxSwimlane.prototype.constraints = mxRectangleShape.prototype.constraints;
	PlusShape.prototype.constraints = mxRectangleShape.prototype.constraints;
	mxLabel.prototype.constraints = mxRectangleShape.prototype.constraints;
	
	NoteShape.prototype.getConstraints = function(style, w, h)
	{
		var constr = [];
		var s = Math.max(0, Math.min(w, Math.min(h, parseFloat(mxUtils.getValue(this.style, 'size', this.size)))));
		
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, (w - s) * 0.5, 0));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, w - s, 0));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, w - s * 0.5, s * 0.5));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, w, s));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, w, (h + s) * 0.5 ));
		constr.push(new mxConnectionConstraint(new mxPoint(1, 1), false));
		constr.push(new mxConnectionConstraint(new mxPoint(0.5, 1), false));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 1), false));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0.5), false));
		
		if (w >= s * 2)
		{
			constr.push(new mxConnectionConstraint(new mxPoint(0.5, 0), false));
		}

		return (constr);
	};
	
	CardShape.prototype.getConstraints = function(style, w, h)
	{
		var constr = [];
		var s = Math.max(0, Math.min(w, Math.min(h, parseFloat(mxUtils.getValue(this.style, 'size', this.size)))));
		
		constr.push(new mxConnectionConstraint(new mxPoint(1, 0), false));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, (w + s) * 0.5, 0));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, s, 0));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, s * 0.5, s * 0.5));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, 0, s));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, 0, (h + s) * 0.5 ));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 1), false));
		constr.push(new mxConnectionConstraint(new mxPoint(0.5, 1), false));
		constr.push(new mxConnectionConstraint(new mxPoint(1, 1), false));
		constr.push(new mxConnectionConstraint(new mxPoint(1, 0.5), false));
		
		if (w >= s * 2)
		{
			constr.push(new mxConnectionConstraint(new mxPoint(0.5, 0), false));
		}

		return (constr);
	};
	
	CubeShape.prototype.getConstraints = function(style, w, h)
	{
		var constr = [];
		var s = Math.max(0, Math.min(w, Math.min(h, parseFloat(mxUtils.getValue(this.style, 'size', this.size)))));
		
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, (w - s) * 0.5, 0));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, w - s, 0));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, w - s * 0.5, s * 0.5));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, w, s));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, w, (h + s) * 0.5));
		constr.push(new mxConnectionConstraint(new mxPoint(1, 1), false));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, (w + s) * 0.5, h));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, s, h));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, s * 0.5, h - s * 0.5));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, 0, h - s));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, 0, (h - s) * 0.5));
		
		return (constr);
	};
	
	CylinderShape3.prototype.getConstraints = function(style, w, h)
	{
		var constr = [];
		var s = Math.max(0, Math.min(h, parseFloat(mxUtils.getValue(this.style, 'size', this.size))));
		
		constr.push(new mxConnectionConstraint(new mxPoint(0.5, 0), false));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0.5), false));
		constr.push(new mxConnectionConstraint(new mxPoint(0.5, 1), false));
		constr.push(new mxConnectionConstraint(new mxPoint(1, 0.5), false));
		
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, 0, s));
		constr.push(new mxConnectionConstraint(new mxPoint(1, 0), false, null, 0, s));
		constr.push(new mxConnectionConstraint(new mxPoint(1, 1), false, null, 0, -s));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 1), false, null, 0, -s));
		
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, 0, s + (h * 0.5 - s) * 0.5));
		constr.push(new mxConnectionConstraint(new mxPoint(1, 0), false, null, 0, s + (h * 0.5 - s) * 0.5));
		constr.push(new mxConnectionConstraint(new mxPoint(1, 0), false, null, 0, h - s - (h * 0.5 - s) * 0.5));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, 0, h - s - (h * 0.5 - s) * 0.5));

		constr.push(new mxConnectionConstraint(new mxPoint(0.145, 0), false, null, 0, s * 0.29));
		constr.push(new mxConnectionConstraint(new mxPoint(0.855, 0), false, null, 0, s * 0.29));
		constr.push(new mxConnectionConstraint(new mxPoint(0.855, 1), false, null, 0, -s * 0.29));
		constr.push(new mxConnectionConstraint(new mxPoint(0.145, 1), false, null, 0, -s * 0.29));
		
		return (constr);
	};
	
	FolderShape.prototype.getConstraints = function(style, w, h)
	{
		var constr = [];
		var dx = Math.max(0, Math.min(w, parseFloat(mxUtils.getValue(this.style, 'tabWidth', this.tabWidth))));
		var dy = Math.max(0, Math.min(h, parseFloat(mxUtils.getValue(this.style, 'tabHeight', this.tabHeight))));
		var tp = mxUtils.getValue(this.style, 'tabPosition', this.tabPosition);

		if (tp == 'left')
		{
			constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false));
			constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, dx * 0.5, 0));
			constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, dx, 0));
			constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, dx, dy));
			constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, (w + dx) * 0.5, dy));
		}
		else
		{
			constr.push(new mxConnectionConstraint(new mxPoint(1, 0), false));
			constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, w - dx * 0.5, 0));
			constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, w - dx, 0));
			constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, w - dx, dy));
			constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, (w - dx) * 0.5, dy));
		}
		
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, w, dy));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, w, (h - dy) * 0.25 + dy));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, w, (h - dy) * 0.5 + dy));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, w, (h - dy) * 0.75 + dy));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, w, h));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, 0, dy));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, 0, (h - dy) * 0.25 + dy));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, 0, (h - dy) * 0.5 + dy));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, 0, (h - dy) * 0.75 + dy));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, 0, h));
		constr.push(new mxConnectionConstraint(new mxPoint(0.25, 1), false));
		constr.push(new mxConnectionConstraint(new mxPoint(0.5, 1), false));
		constr.push(new mxConnectionConstraint(new mxPoint(0.75, 1), false));

		return (constr);
	}

	InternalStorageShape.prototype.constraints = mxRectangleShape.prototype.constraints;
	DataStorageShape.prototype.constraints = mxRectangleShape.prototype.constraints;
	TapeDataShape.prototype.constraints = mxEllipse.prototype.constraints;
	OrEllipseShape.prototype.constraints = mxEllipse.prototype.constraints;
	SumEllipseShape.prototype.constraints = mxEllipse.prototype.constraints;
	LineEllipseShape.prototype.constraints = mxEllipse.prototype.constraints;
	ManualInputShape.prototype.constraints = mxRectangleShape.prototype.constraints;
	DelayShape.prototype.constraints = mxRectangleShape.prototype.constraints;

	DisplayShape.prototype.getConstraints = function(style, w, h)
	{
		var constr = [];
		var dx = Math.min(w, h / 2);
		var s = Math.min(w - dx, Math.max(0, parseFloat(mxUtils.getValue(this.style, 'size', this.size))) * w);
		
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0.5), false, null));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, s, 0));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, (s + w - dx) * 0.5, 0));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, w - dx, 0));
		constr.push(new mxConnectionConstraint(new mxPoint(1, 0.5), false, null));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, w - dx, h));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, (s + w - dx) * 0.5, h));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, s, h));
		
		return (constr);
	};
	
	ModuleShape.prototype.getConstraints = function(style, w, h)
	{
		var x0 = parseFloat(mxUtils.getValue(style, 'jettyWidth', ModuleShape.prototype.jettyWidth)) / 2;
		var dy = parseFloat(mxUtils.getValue(style, 'jettyHeight', ModuleShape.prototype.jettyHeight));
		var constr = [new mxConnectionConstraint(new mxPoint(0, 0), false, null, x0),
			new mxConnectionConstraint(new mxPoint(0.25, 0), true),
			new mxConnectionConstraint(new mxPoint(0.5, 0), true),
			new mxConnectionConstraint(new mxPoint(0.75, 0), true),
			new mxConnectionConstraint(new mxPoint(1, 0), true),
			new mxConnectionConstraint(new mxPoint(1, 0.25), true),
			new mxConnectionConstraint(new mxPoint(1, 0.5), true),
			new mxConnectionConstraint(new mxPoint(1, 0.75), true),
			new mxConnectionConstraint(new mxPoint(0, 1), false, null, x0),
			new mxConnectionConstraint(new mxPoint(0.25, 1), true),
			new mxConnectionConstraint(new mxPoint(0.5, 1), true),
			new mxConnectionConstraint(new mxPoint(0.75, 1), true),
			new mxConnectionConstraint(new mxPoint(1, 1), true),
			new mxConnectionConstraint(new mxPoint(0, 0), false, null, 0, Math.min(h - 0.5 * dy, 1.5 * dy)),
			new mxConnectionConstraint(new mxPoint(0, 0), false, null, 0, Math.min(h - 0.5 * dy, 3.5 * dy))];
		
		if (h > 5 * dy)
		{
			constr.push(new mxConnectionConstraint(new mxPoint(0, 0.75), false, null, x0));
		}
		
		if (h > 8 * dy)
		{
			constr.push(new mxConnectionConstraint(new mxPoint(0, 0.5), false, null, x0));
		}
		
		if (h > 15 * dy)
		{
			constr.push(new mxConnectionConstraint(new mxPoint(0, 0.25), false, null, x0));
		}
		
		return constr;
	};
	
	LoopLimitShape.prototype.constraints = mxRectangleShape.prototype.constraints;
	OffPageConnectorShape.prototype.constraints = mxRectangleShape.prototype.constraints;
	mxCylinder.prototype.constraints = [new mxConnectionConstraint(new mxPoint(0.15, 0.05), false),
                                        new mxConnectionConstraint(new mxPoint(0.5, 0), true),
                                        new mxConnectionConstraint(new mxPoint(0.85, 0.05), false),
      	              		 new mxConnectionConstraint(new mxPoint(0, 0.3), true),
      	              		 new mxConnectionConstraint(new mxPoint(0, 0.5), true),
      	              		 new mxConnectionConstraint(new mxPoint(0, 0.7), true),
      	            		 new mxConnectionConstraint(new mxPoint(1, 0.3), true),
      	            		 new mxConnectionConstraint(new mxPoint(1, 0.5), true),
      	            		 new mxConnectionConstraint(new mxPoint(1, 0.7), true),
      	            		 new mxConnectionConstraint(new mxPoint(0.15, 0.95), false),
      	            		 new mxConnectionConstraint(new mxPoint(0.5, 1), true),
      	            		 new mxConnectionConstraint(new mxPoint(0.85, 0.95), false)];
	UmlActorShape.prototype.constraints = [new mxConnectionConstraint(new mxPoint(0.25, 0.1), false),
	                                          new mxConnectionConstraint(new mxPoint(0.5, 0), false),
	                                          new mxConnectionConstraint(new mxPoint(0.75, 0.1), false),
	        	              		 new mxConnectionConstraint(new mxPoint(0, 1/3), false),
	        	              		 new mxConnectionConstraint(new mxPoint(0, 1), false),
	        	            		 new mxConnectionConstraint(new mxPoint(1, 1/3), false),
	        	            		 new mxConnectionConstraint(new mxPoint(1, 1), false),
	        	            		 new mxConnectionConstraint(new mxPoint(0.5, 0.5), false)];
	ComponentShape.prototype.constraints = [new mxConnectionConstraint(new mxPoint(0.25, 0), true),
	                                          new mxConnectionConstraint(new mxPoint(0.5, 0), true),
	                                          new mxConnectionConstraint(new mxPoint(0.75, 0), true),
	        	              		 new mxConnectionConstraint(new mxPoint(0, 0.3), true),
	        	              		 new mxConnectionConstraint(new mxPoint(0, 0.7), true),
	        	            		 new mxConnectionConstraint(new mxPoint(1, 0.25), true),
	        	            		 new mxConnectionConstraint(new mxPoint(1, 0.5), true),
	        	            		 new mxConnectionConstraint(new mxPoint(1, 0.75), true),
	        	            		 new mxConnectionConstraint(new mxPoint(0.25, 1), true),
	        	            		 new mxConnectionConstraint(new mxPoint(0.5, 1), true),
	        	            		 new mxConnectionConstraint(new mxPoint(0.75, 1), true)];
	mxActor.prototype.constraints = [new mxConnectionConstraint(new mxPoint(0.5, 0), true),
   	              		 new mxConnectionConstraint(new mxPoint(0.25, 0.2), false),
   	              		 new mxConnectionConstraint(new mxPoint(0.1, 0.5), false),
   	              		 new mxConnectionConstraint(new mxPoint(0, 0.75), true),
   	            		 new mxConnectionConstraint(new mxPoint(0.75, 0.25), false),
   	            		 new mxConnectionConstraint(new mxPoint(0.9, 0.5), false),
   	            		 new mxConnectionConstraint(new mxPoint(1, 0.75), true),
   	            		 new mxConnectionConstraint(new mxPoint(0.25, 1), true),
   	            		 new mxConnectionConstraint(new mxPoint(0.5, 1), true),
   	            		 new mxConnectionConstraint(new mxPoint(0.75, 1), true)];
	SwitchShape.prototype.constraints = [new mxConnectionConstraint(new mxPoint(0, 0), false),
                                         new mxConnectionConstraint(new mxPoint(0.5, 0.25), false),
                                         new mxConnectionConstraint(new mxPoint(1, 0), false),
			       	              		 new mxConnectionConstraint(new mxPoint(0.25, 0.5), false),
			       	              		 new mxConnectionConstraint(new mxPoint(0.75, 0.5), false),
			       	              		 new mxConnectionConstraint(new mxPoint(0, 1), false),
			       	            		 new mxConnectionConstraint(new mxPoint(0.5, 0.75), false),
			       	            		 new mxConnectionConstraint(new mxPoint(1, 1), false)];
	TapeShape.prototype.constraints = [new mxConnectionConstraint(new mxPoint(0, 0.35), false),
	                                   new mxConnectionConstraint(new mxPoint(0, 0.5), false),
	                                   new mxConnectionConstraint(new mxPoint(0, 0.65), false),
	                                   new mxConnectionConstraint(new mxPoint(1, 0.35), false),
		                                new mxConnectionConstraint(new mxPoint(1, 0.5), false),
		                                new mxConnectionConstraint(new mxPoint(1, 0.65), false),
										new mxConnectionConstraint(new mxPoint(0.25, 1), false),
										new mxConnectionConstraint(new mxPoint(0.75, 0), false)];
	StepShape.prototype.constraints = [new mxConnectionConstraint(new mxPoint(0.25, 0), true),
									new mxConnectionConstraint(new mxPoint(0.5, 0), true),
									new mxConnectionConstraint(new mxPoint(0.75, 0), true),
									new mxConnectionConstraint(new mxPoint(0.25, 1), true),
									new mxConnectionConstraint(new mxPoint(0.5, 1), true),
									new mxConnectionConstraint(new mxPoint(0.75, 1), true),
									new mxConnectionConstraint(new mxPoint(0, 0.25), true),
									new mxConnectionConstraint(new mxPoint(0, 0.5), true),
									new mxConnectionConstraint(new mxPoint(0, 0.75), true),
									new mxConnectionConstraint(new mxPoint(1, 0.25), true),
									new mxConnectionConstraint(new mxPoint(1, 0.5), true),
									new mxConnectionConstraint(new mxPoint(1, 0.75), true)];
	mxLine.prototype.constraints = [new mxConnectionConstraint(new mxPoint(0, 0.5), false),
	                                new mxConnectionConstraint(new mxPoint(0.25, 0.5), false),
	                                new mxConnectionConstraint(new mxPoint(0.75, 0.5), false),
									new mxConnectionConstraint(new mxPoint(1, 0.5), false)];
	LollipopShape.prototype.constraints = [new mxConnectionConstraint(new mxPoint(0.5, 0), false),
										new mxConnectionConstraint(new mxPoint(0.5, 1), false)];
	mxDoubleEllipse.prototype.constraints = mxEllipse.prototype.constraints;
	mxRhombus.prototype.constraints = mxEllipse.prototype.constraints;
	mxTriangle.prototype.constraints = [new mxConnectionConstraint(new mxPoint(0, 0.25), true),
	                                    new mxConnectionConstraint(new mxPoint(0, 0.5), true),
	                                   new mxConnectionConstraint(new mxPoint(0, 0.75), true),
	                                   new mxConnectionConstraint(new mxPoint(0.5, 0), true),
	                                   new mxConnectionConstraint(new mxPoint(0.5, 1), true),
	                                   new mxConnectionConstraint(new mxPoint(1, 0.5), true)];
	mxHexagon.prototype.constraints = [new mxConnectionConstraint(new mxPoint(0.375, 0), true),
	                                    new mxConnectionConstraint(new mxPoint(0.5, 0), true),
	                                   new mxConnectionConstraint(new mxPoint(0.625, 0), true),
	                                   new mxConnectionConstraint(new mxPoint(0, 0.25), true),
	                                   new mxConnectionConstraint(new mxPoint(0, 0.5), true),
	                                   new mxConnectionConstraint(new mxPoint(0, 0.75), true),
	                                   new mxConnectionConstraint(new mxPoint(1, 0.25), true),
	                                   new mxConnectionConstraint(new mxPoint(1, 0.5), true),
	                                   new mxConnectionConstraint(new mxPoint(1, 0.75), true),
	                                   new mxConnectionConstraint(new mxPoint(0.375, 1), true),
	                                    new mxConnectionConstraint(new mxPoint(0.5, 1), true),
	                                   new mxConnectionConstraint(new mxPoint(0.625, 1), true)];
	mxCloud.prototype.constraints = [new mxConnectionConstraint(new mxPoint(0.25, 0.25), false),
	                                 new mxConnectionConstraint(new mxPoint(0.4, 0.1), false),
	                                 new mxConnectionConstraint(new mxPoint(0.16, 0.55), false),
	                                 new mxConnectionConstraint(new mxPoint(0.07, 0.4), false),
	                                 new mxConnectionConstraint(new mxPoint(0.31, 0.8), false),
	                                 new mxConnectionConstraint(new mxPoint(0.13, 0.77), false),
	                                 new mxConnectionConstraint(new mxPoint(0.8, 0.8), false),
	                                 new mxConnectionConstraint(new mxPoint(0.55, 0.95), false),
	                                 new mxConnectionConstraint(new mxPoint(0.875, 0.5), false),
	                                 new mxConnectionConstraint(new mxPoint(0.96, 0.7), false),
	                                 new mxConnectionConstraint(new mxPoint(0.625, 0.2), false),
	                                 new mxConnectionConstraint(new mxPoint(0.88, 0.25), false)];
	ParallelogramShape.prototype.constraints = mxRectangleShape.prototype.constraints;
	TrapezoidShape.prototype.constraints = mxRectangleShape.prototype.constraints;
	DocumentShape.prototype.constraints = [new mxConnectionConstraint(new mxPoint(0.25, 0), true),
	                                          new mxConnectionConstraint(new mxPoint(0.5, 0), true),
	                                          new mxConnectionConstraint(new mxPoint(0.75, 0), true),
	        	              		 new mxConnectionConstraint(new mxPoint(0, 0.25), true),
	        	              		 new mxConnectionConstraint(new mxPoint(0, 0.5), true),
	        	              		 new mxConnectionConstraint(new mxPoint(0, 0.75), true),
	        	            		 new mxConnectionConstraint(new mxPoint(1, 0.25), true),
	        	            		 new mxConnectionConstraint(new mxPoint(1, 0.5), true),
	        	            		 new mxConnectionConstraint(new mxPoint(1, 0.75), true)];
	mxArrow.prototype.constraints = null;

	TeeShape.prototype.getConstraints = function(style, w, h)
	{
		var constr = [];
		var dx = Math.max(0, Math.min(w, parseFloat(mxUtils.getValue(this.style, 'dx', this.dx))));
		var dy = Math.max(0, Math.min(h, parseFloat(mxUtils.getValue(this.style, 'dy', this.dy))));
		var w2 = Math.abs(w - dx) / 2;
		
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false));
		constr.push(new mxConnectionConstraint(new mxPoint(0.5, 0), false));
		constr.push(new mxConnectionConstraint(new mxPoint(1, 0), false));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, w, dy * 0.5));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, w, dy));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, w * 0.75 + dx * 0.25, dy));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, (w + dx) * 0.5, dy));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, (w + dx) * 0.5, (h + dy) * 0.5));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, (w + dx) * 0.5, h));
		constr.push(new mxConnectionConstraint(new mxPoint(0.5, 1), false));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, (w - dx) * 0.5, h));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, (w - dx) * 0.5, (h + dy) * 0.5));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, (w - dx) * 0.5, dy));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, w * 0.25 - dx * 0.25, dy));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, 0, dy));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, 0, dy * 0.5));
		
		return (constr);
	};

	CornerShape.prototype.getConstraints = function(style, w, h)
	{
		var constr = [];
		var dx = Math.max(0, Math.min(w, parseFloat(mxUtils.getValue(this.style, 'dx', this.dx))));
		var dy = Math.max(0, Math.min(h, parseFloat(mxUtils.getValue(this.style, 'dy', this.dy))));
		
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false));
		constr.push(new mxConnectionConstraint(new mxPoint(0.5, 0), false));
		constr.push(new mxConnectionConstraint(new mxPoint(1, 0), false));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, w, dy * 0.5));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, w, dy));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, (w + dx) * 0.5, dy));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, dx, dy));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, dx, (h + dy) * 0.5));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, dx, h));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, dx * 0.5, h));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0.5), false));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 1), false));
		
		return (constr);
	};

	CrossbarShape.prototype.constraints = [new mxConnectionConstraint(new mxPoint(0, 0), false),
        new mxConnectionConstraint(new mxPoint(0, 0.5), false),
        new mxConnectionConstraint(new mxPoint(0, 1), false),
        new mxConnectionConstraint(new mxPoint(0.25, 0.5), false),
        new mxConnectionConstraint(new mxPoint(0.5, 0.5), false),
        new mxConnectionConstraint(new mxPoint(0.75, 0.5), false),
        new mxConnectionConstraint(new mxPoint(1, 0), false),
        new mxConnectionConstraint(new mxPoint(1, 0.5), false),
        new mxConnectionConstraint(new mxPoint(1, 1), false)];

	SingleArrowShape.prototype.getConstraints = function(style, w, h)
	{
		var constr = [];
		var aw = h * Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'arrowWidth', this.arrowWidth))));
		var as = w * Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'arrowSize', this.arrowSize))));
		var at = (h - aw) / 2;
		var ab = at + aw;
		
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0.5), false));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, 0, at));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, (w - as) * 0.5, at));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, w - as, 0));
		constr.push(new mxConnectionConstraint(new mxPoint(1, 0.5), false));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, w - as, h));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, (w - as) * 0.5, h - at));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, 0, h - at));
		
		return (constr);
	};
	
	DoubleArrowShape.prototype.getConstraints = function(style, w, h)
	{
		var constr = [];
		var aw = h * Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'arrowWidth', SingleArrowShape.prototype.arrowWidth))));
		var as = w * Math.max(0, Math.min(1, parseFloat(mxUtils.getValue(this.style, 'arrowSize', SingleArrowShape.prototype.arrowSize))));
		var at = (h - aw) / 2;
		var ab = at + aw;
		
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0.5), false));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, as, 0));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, w * 0.5, at));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, w - as, 0));
		constr.push(new mxConnectionConstraint(new mxPoint(1, 0.5), false));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, w - as, h));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, w * 0.5, h - at));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, as, h));
		
		return (constr);
	};
	
	CrossShape.prototype.getConstraints = function(style, w, h)
	{
		var constr = [];
		var m = Math.min(h, w);
		var size = Math.max(0, Math.min(m, m * parseFloat(mxUtils.getValue(this.style, 'size', this.size))));
		var t = (h - size) / 2;
		var b = t + size;
		var l = (w - size) / 2;
		var r = l + size;
		
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, l, t * 0.5));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, l, 0));
		constr.push(new mxConnectionConstraint(new mxPoint(0.5, 0), false));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, r, 0));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, r, t * 0.5));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, r, t));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, l, h - t * 0.5));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, l, h));
		constr.push(new mxConnectionConstraint(new mxPoint(0.5, 1), false));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, r, h));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, r, h - t * 0.5));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, r, b));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, (w + r) * 0.5, t));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, w, t));
		constr.push(new mxConnectionConstraint(new mxPoint(1, 0.5), false));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, w, b));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, (w + r) * 0.5, b));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, l, b));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, l * 0.5, t));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, 0, t));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0.5), false));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, 0, b));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, l * 0.5, b));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false, null, l, t));

		return (constr);
	};
	
	UmlLifeline.prototype.constraints = null;
	OrShape.prototype.constraints = [new mxConnectionConstraint(new mxPoint(0, 0.25), false),
	  	                             new mxConnectionConstraint(new mxPoint(0, 0.5), false),
	  	                             new mxConnectionConstraint(new mxPoint(0, 0.75), false),
	  	                             new mxConnectionConstraint(new mxPoint(1, 0.5), false),
	  	                             new mxConnectionConstraint(new mxPoint(0.7, 0.1), false),
	  	                             new mxConnectionConstraint(new mxPoint(0.7, 0.9), false)];
	XorShape.prototype.constraints = [new mxConnectionConstraint(new mxPoint(0.175, 0.25), false),
	  	                             new mxConnectionConstraint(new mxPoint(0.25, 0.5), false),
	  	                             new mxConnectionConstraint(new mxPoint(0.175, 0.75), false),
	  	                             new mxConnectionConstraint(new mxPoint(1, 0.5), false),
	  	                             new mxConnectionConstraint(new mxPoint(0.7, 0.1), false),
	  	                             new mxConnectionConstraint(new mxPoint(0.7, 0.9), false)];
	RequiredInterfaceShape.prototype.constraints = [new mxConnectionConstraint(new mxPoint(0, 0.5), false),
          new mxConnectionConstraint(new mxPoint(1, 0.5), false)];
	ProvidedRequiredInterfaceShape.prototype.constraints = [new mxConnectionConstraint(new mxPoint(0, 0.5), false),
        new mxConnectionConstraint(new mxPoint(1, 0.5), false)];
})();
