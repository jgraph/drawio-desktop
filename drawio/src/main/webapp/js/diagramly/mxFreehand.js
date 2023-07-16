function mxFreehand(graph)
{
	// Graph must have a container
	var svgElement = (graph.view != null && graph.view.canvas != null) ? graph.view.canvas.ownerSVGElement : null;
	
	if (graph.container == null || svgElement == null)
	{
		return;
	}
	
	// Stops drawing on escape
	graph.addListener(mxEvent.ESCAPE, mxUtils.bind(this, function()
	{
		this.stopDrawing();
	}));
	
	//Code inspired by https://stackoverflow.com/questions/40324313/svg-smooth-freehand-drawing
	var bufferSize = mxFreehand.prototype.NORMAL_SMOOTHING;
	var path = null;
	var partPathes = [];
	var strPath;
	var drawPoints = [];
	var lastPart;
	var closedPath = false; 
	var autoClose = true;
	var autoInsert = true;
	var autoScroll = true;
	var openFill = true;
	var buffer = []; // Contains the last positions of the mouse cursor
	var enabled = false;
	var stopClickEnabled = false;
	var selectInserted = false;
	var perfectFreehandOptions = {
		size: 5,
		thinning: 0.5,
		smoothing: 0.5,
		streamline: 0.5,
	//	easing: (t) => t,
		start: {
		  taper: 0,
	//	  easing: (t) => t,
		  cap: true
		},
		end: {
		  taper: 0,
	//	  easing: (t) => t,
		  cap: true
		}
	};

	var perfectFreehandMode = true;

	this.setClosedPath = function(isClosed)//TODO add closed settings
	{
		closedPath = isClosed;
	};
	
	this.setAutoClose = function(isAutoClose)//TODO add auto closed settings
	{
		autoClose = isAutoClose;
	};

	this.setAutoInsert = function(value)
	{
		autoInsert = value;
	};
	
	this.setAutoScroll = function(value)
	{
		autoScroll = value;
	};
		
	this.setOpenFill = function(value)
	{
		openFill = value;
	};
	
	this.setStopClickEnabled = function(enabled)
	{
		stopClickEnabled = enabled;
	};

	this.setSelectInserted = function(value)
	{
		selectInserted = value;
	};

	this.setSmoothing = function(smoothing)//TODO add smoothing settings
	{
		bufferSize = smoothing;
	};
	
	this.setPerfectFreehandMode = function(value)
	{
		perfectFreehandMode = value;
	};

	this.isPerfectFreehandMode = function()
	{
		return perfectFreehandMode;
	};

	this.setBrushSize = function(value)
	{
		perfectFreehandOptions.size = value;
	};

	this.getBrushSize = function()
	{
		return perfectFreehandOptions.size;
	};

	var setEnabled = function(isEnabled)
	{
		enabled = isEnabled;
		graph.getRubberband().setEnabled(!isEnabled);
		graph.graphHandler.setSelectEnabled(!isEnabled);
		graph.graphHandler.setMoveEnabled(!isEnabled);
		graph.container.style.cursor = (isEnabled) ? 'crosshair' : '';
		graph.fireEvent(new mxEventObject('freehandStateChanged'));
	};
	
	this.startDrawing = function()
	{
		setEnabled(true);
	}
	
	this.isDrawing = function()
	{
		return enabled;
	};
	
	var endPath = mxUtils.bind(this, function(e)
	{
	    if (path)
	    {
			var lastLength = lastPart.length;
		
	    	// Click stops drawing
	    	var doStop = stopClickEnabled && drawPoints.length > 0 &&
	    		lastPart != null && lastPart.length < 2;
			
			if (!doStop)
			{
				drawPoints.push.apply(drawPoints, lastPart);
			}
			
	        lastPart = [];
			drawPoints.push(null);
	        partPathes.push(path);
	        path = null;
	        
			if (doStop || autoInsert)
			{
				this.stopDrawing();
			}
			
			if (autoInsert && (!doStop || lastLength >= 2))
			{
				this.startDrawing();
			}
			
	        mxEvent.consume(e);
	    }
	});

	// Used to retrieve default styles
	var edge = new mxCell();
	edge.edge = true;

	var getStrokeColor = function()
	{
		var defaultStyle = graph.getCurrentCellStyle(edge);
		var strokeColor = mxUtils.getValue(graph.currentVertexStyle, mxConstants.STYLE_STROKECOLOR,
			mxUtils.getValue(defaultStyle, mxConstants.STYLE_STROKECOLOR, '#000'))

		if (strokeColor == 'default')
		{
			strokeColor = graph.shapeForegroundColor;
		}

		return strokeColor;
	};

	this.createStyle = function(stencil)
	{
		var style = ';fillColor=none;';

		if (perfectFreehandMode)
		{
			style = ';lineShape=1;';
		}

		return mxConstants.STYLE_SHAPE + '=' + stencil + style;
	};
	
	this.stopDrawing = function() 
	{
	    if (partPathes.length > 0)
	    {
			if (perfectFreehandMode)
			{
				var tmpPoints = [];
				
				for (var i = 0; i < drawPoints.length; i++) 
				{
					if (drawPoints[i] != null)
					{
						tmpPoints.push([drawPoints[i].x, drawPoints[i].y]);
					}
				}

				var output = PerfectFreehand.getStroke(tmpPoints, perfectFreehandOptions);
				drawPoints = [];
				
				for (var i = 0; i < output.length; i++) 
				{
					drawPoints.push({x: output[i][0], y: output[i][1]});
				}
				
				drawPoints.push(null);
			}

	        var maxX = drawPoints[0].x, minX = drawPoints[0].x, maxY = drawPoints[0].y, minY = drawPoints[0].y;
	        
	        for (var i = 1; i < drawPoints.length; i++) 
	        {
	        	if (drawPoints[i] == null) continue;
	        	
	        	maxX = Math.max(maxX, drawPoints[i].x);
	        	minX = Math.min(minX, drawPoints[i].x);
	        	maxY = Math.max(maxY, drawPoints[i].y);
	        	minY = Math.min(minY, drawPoints[i].y);
	        }
	        
	        var w = maxX - minX, h = maxY - minY;

	        if (w > 0 && h > 0)
	        {
		        var xScale = 100 / w;
		        var yScale = 100 / h;
		        
		        drawPoints.map(function(p) 
		        {
		        	if (p == null) return p;
		        	
		        	p.x = (p.x - minX) * xScale;
		        	p.y = (p.y - minY) * yScale;
		        	return p;
		        });
		        
		        //toFixed(2) to reduce size of output
		        var drawShape = '<shape strokewidth="inherit"><foreground>';
		        
		        var start = 0;
		        
		        for (var i = 0; i < drawPoints.length; i++) 
		        {
		        	var p = drawPoints[i];

		        	if (p == null)
	        		{
		        		var tmpClosedPath = false;
				        var startP =  drawPoints[start], endP = drawPoints[i - 1];
				        
				        if (!closedPath && autoClose)
				        {
					        var xdiff = startP.x - endP.x, ydiff = startP.y - endP.y;
					        var startEndDist = Math.sqrt(xdiff * xdiff + ydiff * ydiff);
					        
					        tmpClosedPath = startEndDist <= graph.tolerance;
				        }
				        
				        if (closedPath || tmpClosedPath) 
			        	{
				        	drawShape += '<line x="'+ startP.x.toFixed(2) + '" y="' + startP.y.toFixed(2) + '"/>';
			        	}
				        
		        		drawShape += '</path>' + ((openFill || closedPath || tmpClosedPath)? '<fillstroke/>' : '<stroke/>');
		        		start = i + 1;
	        		}
		        	else if (i == start)
	        		{
		        		drawShape += '<path><move x="'+ p.x.toFixed(2) + '" y="' + p.y.toFixed(2) + '"/>'
	        		}
		        	else
		        	{
		        		drawShape += '<line x="'+ p.x.toFixed(2) + '" y="' + p.y.toFixed(2) + '"/>';
		        	}
		        }
		        
		        drawShape += '</foreground></shape>';

				if (graph.isEnabled() && !graph.isCellLocked(graph.getDefaultParent()))
				{
	                var style = this.createStyle('stencil(' + Graph.compress(drawShape) + ')');
	                var s = graph.view.scale;
	            	var tr = graph.view.translate;
	            	
	                var cell = new mxCell('', new mxGeometry(minX / s - tr.x, minY / s - tr.y, w / s, h / s), style);
	                cell.vertex = 1;
	                
	                graph.model.beginUpdate();
	                try
					{
	                	cell = graph.addCell(cell);
		                
		                graph.fireEvent(new mxEventObject('cellsInserted', 'cells', [cell]));
		                graph.fireEvent(new mxEventObject('freehandInserted', 'cell', cell));
					}
	                finally
					{
	                	graph.model.endUpdate();
					}
					
					if (selectInserted)
					{
						graph.setSelectionCells([cell]);
					}
				}
	        }

	        for (var i = 0; i < partPathes.length; i++)
	        {
	        	partPathes[i].parentNode.removeChild(partPathes[i]);
	        }
	        
	        path = null;
	        partPathes = [];
	        drawPoints = [];
	    }

        setEnabled(false);
	};

	// Stops all interactions if freehand is enabled
	graph.addListener(mxEvent.FIRE_MOUSE_EVENT, mxUtils.bind(this, function(sender, evt)
	{
		var evtName = evt.getProperty('eventName');
		var me = evt.getProperty('event');
		
		if (evtName == mxEvent.MOUSE_MOVE && enabled)
		{
			if (me.sourceState != null)
			{
				me.sourceState.setCursor('crosshair');
			}
			
			me.consume();
		}
	}));
	
	// Implements a listener for hover and click handling
	graph.addMouseListener(
	{
	    mouseDown: mxUtils.bind(this, function(sender, me)
	    {
			if (graph.isEnabled() && !graph.isCellLocked(graph.getDefaultParent()))
		    {
				var e = me.getEvent();
				
				if (!enabled || mxEvent.isPopupTrigger(e) || mxEvent.isMultiTouchEvent(e))
				{
					return;
				}
				
				var strokeWidth = parseFloat(graph.currentVertexStyle[mxConstants.STYLE_STROKEWIDTH] || 1);
				strokeWidth = Math.max(1, strokeWidth * graph.view.scale);
				var strokeColor = getStrokeColor();

			    path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
			    path.setAttribute('fill', perfectFreehandMode? strokeColor : 'none');
			    path.setAttribute('stroke', strokeColor);
			    path.setAttribute('stroke-width', strokeWidth);
			    
			    if (graph.currentVertexStyle[mxConstants.STYLE_DASHED] == '1')
			    {
			    	var dashPattern = graph.currentVertexStyle[mxConstants.STYLE_DASH_PATTERN] || '3 3';
			    	
			    	dashPattern = dashPattern.split(' ').map(function(p)
					{
			    		return parseFloat(p) * strokeWidth;
					}).join(' ');
			    	path.setAttribute('stroke-dasharray', dashPattern);
			    }
			    
			    buffer = [];
			    var pt = getMousePosition(e);
			    appendToBuffer(pt);
			    strPath = 'M' + pt.x + ' ' + pt.y;
			    drawPoints.push(pt);
			    lastPart = [];
			    path.setAttribute('d', perfectFreehandMode? 
					PerfectFreehand.getSvgPathFromStroke([[pt.x, pt.y]], perfectFreehandOptions)
					: strPath);
			    svgElement.appendChild(path);
	
				me.consume();
			}
	    }),
	    mouseMove: mxUtils.bind(this, function(sender, me)
	    {
		    if (path && graph.isEnabled() && !graph.isCellLocked(graph.getDefaultParent()))
		    {
	    		var e = me.getEvent();
				var pt = getMousePosition(e);
		        appendToBuffer(pt);
		        updateSvgPath();
				
				if (autoScroll)
				{
					var tr = graph.view.translate;
					graph.scrollRectToVisible(new mxRectangle(pt.x - tr.x, pt.y - tr.y).grow(20));
				}
				
				me.consume();
		    }
	    }),
	    mouseUp: mxUtils.bind(this, function(sender, me)
	    {
			if (path && graph.isEnabled() && !graph.isCellLocked(graph.getDefaultParent())) 
			{
				endPath(me.getEvent());
				me.consume();
			}
	    })	
	});

	var getMousePosition = function (e) 
	{
	    return mxUtils.convertPoint(graph.container, mxEvent.getClientX(e), mxEvent.getClientY(e));
	};

	var appendToBuffer = function (pt) 
	{
	    buffer.push(pt);
	    
	    while (buffer.length > bufferSize) 
	    {
	        buffer.shift();
	    }
	};

	// Calculate the average point, starting at offset in the buffer
	var getAveragePoint = function (offset) 
	{
	    var len = buffer.length;
	    
	    if (len % 2 === 1 || len >= bufferSize) 
	    {
	        var totalX = 0;
	        var totalY = 0;
	        var pt, i;
	        var count = 0;
	        
	        for (i = offset; i < len; i++) 
	        {
	            count++;
	            pt = buffer[i];
	            totalX += pt.x;
	            totalY += pt.y;
	        }
	        
	        return {
	            x: totalX / count,
	            y: totalY / count
	        }
	    }
	    
	    return null;
	};

	var updateSvgPath = function () 
	{
	    var pt = getAveragePoint(0);

	    if (pt) 
	    {
	        drawPoints.push(pt);

			if (perfectFreehandMode)
			{
				var tmpPoints = [];

				for (var i = 0; i < drawPoints.length; i++)
				{
					tmpPoints.push([drawPoints[i].x, drawPoints[i].y]);
				}

				lastPart = [];
				
				for (var offset = 2; offset < buffer.length; offset += 2) 
				{
					pt = getAveragePoint(offset);
					tmpPoints.push([pt.x, pt.y]);
					lastPart.push(pt);
				}

				path.setAttribute('d', PerfectFreehand.getSvgPathFromStroke(tmpPoints, perfectFreehandOptions));
			}
			else
			{
				// Get the smoothed part of the path that will not change
				strPath += ' L' + pt.x + ' ' + pt.y;
				// Get the last part of the path (close to the current mouse position)
				// This part will change if the mouse moves again
				var tmpPath = '';
				lastPart = [];
				
				for (var offset = 2; offset < buffer.length; offset += 2) 
				{
					pt = getAveragePoint(offset);
					tmpPath += ' L' + pt.x + ' ' + pt.y;
					lastPart.push(pt);
				}

				// Set the complete current path coordinates
				path.setAttribute('d', strPath + tmpPath);
			}
	    }
	};
};

mxFreehand.prototype.NO_SMOOTHING = 1;
mxFreehand.prototype.MILD_SMOOTHING = 4;
mxFreehand.prototype.NORMAL_SMOOTHING = 8;
mxFreehand.prototype.VERY_SMOOTH_SMOOTHING = 12;
mxFreehand.prototype.SUPER_SMOOTH_SMOOTHING = 16;
mxFreehand.prototype.HYPER_SMOOTH_SMOOTHING = 20;
