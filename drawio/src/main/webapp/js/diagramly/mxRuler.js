/**
 * Copyright (c) 2017, CTI LOGIC
 * Copyright (c) 2006-2017, JGraph Ltd
 * Copyright (c) 2006-2017, Gaudenz Alder
 * 
 * Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 *
 * 3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 'AS IS' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY 
 * AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL 
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, 
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

function mxRuler(editorUi, unit, isVertical, isSecondery) 
{
	var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                           		window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

	var RULER_THICKNESS = this.RULER_THICKNESS;
    var ruler = this;
    this.unit = unit;
    var style = (!Editor.isDarkMode()) ? {
    	bkgClr: '#ffffff',
    	outBkgClr: '#e8e9ed',
    	cornerClr: '#fbfbfb',
    	strokeClr: '#dadce0',
    	fontClr: '#BBBBBB',
    	guideClr: '#0000BB'
    } : {
    	bkgClr: '#202020',
    	outBkgClr: Editor.darkColor,
    	cornerClr: Editor.darkColor,
    	strokeClr: '#505759',
    	fontClr: '#BBBBBB',
    	guideClr: '#0088cf'
    };

    //create the container
    var container = document.createElement('div');
	container.className = 'geRuler';
    container.style.position = 'fixed';
	
	function resizeRulerContainer()
	{
		var diagCont = editorUi.diagramContainer;
		
	    container.style.top = (diagCont.offsetTop - RULER_THICKNESS) + 'px';
	    container.style.left = (diagCont.offsetLeft - RULER_THICKNESS) + 'px';
	    container.style.width = ((isVertical? 0 : diagCont.offsetWidth) + RULER_THICKNESS) + 'px';
	    container.style.height = ((isVertical? diagCont.offsetHeight : 0) + RULER_THICKNESS) + 'px';
	};
    
	// Hook for dark mode changes
	this.updateStyle = mxUtils.bind(this, function()
	{
		style = (!Editor.isDarkMode()) ? {
	    	outBkgClr: '#e8e9ed',
	    	cornerClr: '#fbfbfb',
	    	strokeClr: '#dadce0',
	    	fontClr: '#BBBBBB',
	    	guideClr: '#0000BB'
	    } : {
	    	outBkgClr: Editor.darkColor,
	    	cornerClr: Editor.darkColor,
	    	strokeClr: '#505759',
	    	fontClr: '#BBBBBB',
	    	guideClr: '#0088cf'
	    };

	    container.style[isVertical? 'borderRight' : 'borderBottom'] = '0.5px solid ' + style.strokeClr;
		container.style.borderLeft = '0.5px solid ' + style.strokeClr;
	});
	
	this.updateStyle();

	editorUi.diagramContainer.appendChild(container);
	mxEvent.disableContextMenu(container);

	this.editorUiRefresh = editorUi.refresh;
	
	editorUi.refresh = function(minor)
	{
		ruler.editorUiRefresh.apply(editorUi, arguments);
		
		resizeRulerContainer();
	};

	resizeRulerContainer();
    	
    var canvas = document.createElement('canvas');
    //initial sizing which is corrected by the graph size event
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    container.style.overflow = 'hidden';
    canvas.style.position = 'relative';
    container.appendChild(canvas);
    //Disable alpha to improve performance as we don't need it?
    var ctx = canvas.getContext('2d');
    this.ui = editorUi;
    var graph = editorUi.editor.graph;
    this.graph = graph;
    this.container = container;
    this.canvas = canvas;

    var drawLine = function (x1, y1, x2, y2, text) 
    {
        //remove all fractions
        x1 = Math.round(x1); y1 = Math.round(y1); x2 = Math.round(x2); y2 = Math.round(y2);
        //adding the 0.5 is necessary to prevent anti-aliasing from making lines thicker!
        ctx.beginPath();
        ctx.moveTo(x1 + 0.5, y1 + 0.5);
        ctx.lineTo(x2 + 0.5, y2 + 0.5);
        ctx.stroke();
        
        if (text) 
        {
            if (isVertical) 
            {
                ctx.save();
                ctx.translate(x1, y1);
                ctx.rotate(-Math.PI / 2);
                ctx.fillText(text, 0, 0);
                ctx.restore();
            }
            else
            {
                ctx.fillText(text, x1, y1);
            }
        }
    };
    
    var drawRuler = function() 
    {
    	ctx.clearRect(0, 0, canvas.width, canvas.height);
    	
        ctx.beginPath();
        ctx.lineWidth = 0.7;
        ctx.strokeStyle = style.strokeClr;
        ctx.setLineDash([]);
        ctx.font = '9px Arial';
        ctx.textAlign = 'center';
        
        var scale = graph.view.scale;
        var bgPages = graph.view.getBackgroundPageBounds();
        var t = graph.view.translate;
        var hasPageView = graph.pageVisible;
        
        //The beginning of the ruler (zero)
        var rStart = hasPageView? RULER_THICKNESS + (isVertical? bgPages.y -  graph.container.scrollTop : bgPages.x - graph.container.scrollLeft) 
        		: RULER_THICKNESS + (isVertical? t.y * scale -  graph.container.scrollTop : t.x * scale - graph.container.scrollLeft);

        //handle negative pages
        var pageShift = 0;
        
        if (hasPageView)
        {
			var layout = graph.getPageLayout();
	
	        if (isVertical) 
	        {
	            pageShift = layout.y * graph.pageFormat.height;
	        }
	        else
	        {
	            pageShift = layout.x * graph.pageFormat.width;
	        }
        }
        
        var tickStep, tickSize, len;

        switch(ruler.unit) 
        {
            case mxConstants.POINTS:
                len = 10;
                tickStep = 10;
                tickSize = [3,5,5,5,5,10,5,5,5,5];
                break;
            case mxConstants.MILLIMETERS:
                len = 10;
                tickStep = mxConstants.PIXELS_PER_MM;
                tickSize = [5,3,3,3,3,6,3,3,3,3];
                break;
			case mxConstants.METERS:
                len = 20;
                tickStep = mxConstants.PIXELS_PER_MM;
                tickSize = [5,3,3,3,3,6,3,3,3,3,10,3,3,3,3,6,3,3,3,3];
                break;
            case mxConstants.INCHES:
            	if (scale <=0.5 || scale >=4)
                    len = 8;
                else
                    len = 16;
                
                tickStep = mxConstants.PIXELS_PER_INCH / len;
                tickSize = [5,3,5,3,7,3,5,3,7,3,5,3,7,3,5,3];
                break;
        }

        //Handle step size and change it with large/small scale
        var step = tickStep;
        
        if (scale >= 2)
    	{
        	step = tickStep / (Math.floor(scale / 2) * 2);
    	}
        else if (scale <= 0.5)
    	{
        	step = tickStep * (Math.floor((1 / scale) / 2) * (ruler.unit == mxConstants.MILLIMETERS? 2 : 1));
    	}

        var lastTick = null;
        
        //End of the ruler (pages end)
        var rEnd = hasPageView? Math.min(rStart + (isVertical? bgPages.height: bgPages.width), isVertical? canvas.height : canvas.width) : (isVertical? canvas.height : canvas.width);

        if (hasPageView)
        {
	        //Clear the outside page part with a different color
	        ctx.fillStyle = style.outBkgClr;
	        
	        if (isVertical)
	    	{
				var oh = rStart - RULER_THICKNESS;
				
				if (oh > 0)
				{
					ctx.fillRect(0, RULER_THICKNESS, RULER_THICKNESS, oh);
				}

				if (rEnd < canvas.height)
				{
					ctx.fillRect(0, rEnd, RULER_THICKNESS, canvas.height);
				}
	    	}
	        else
	        {
				var ow = rStart - RULER_THICKNESS;
		        
				if (ow > 0)
				{
					ctx.fillRect(RULER_THICKNESS, 0, ow, RULER_THICKNESS);	
				}
		        
				if (rEnd < canvas.width)
				{
					ctx.fillRect(rEnd, 0, canvas.width, RULER_THICKNESS);
				}
	        }
        }
        
        //Draw ticks
        ctx.fillStyle = style.fontClr;
        
        for (var i = hasPageView? rStart : rStart % (step * scale); i <= rEnd; i += step * scale) 
        {
        	 var current = Math.round((i - rStart) / scale / step);
        	
        	 if (i < RULER_THICKNESS || current == lastTick) //Prevent wasting time in drawing non-visible/duplicate lines
         	 {
             	 continue;
         	 }
             
             lastTick = current;
             var text = null;
             
             if (current % len == 0) 
             {
                 text = ruler.formatText(pageShift + current * step) + '';
             }
        		 
        	 if (isVertical) 
             {
                 drawLine(RULER_THICKNESS - tickSize[Math.abs(current) % len], i, RULER_THICKNESS, i, text);
             }
             else
             {
                 drawLine(i, RULER_THICKNESS - tickSize[Math.abs(current) % len], i, RULER_THICKNESS, text);
             }
        }
        
        //Draw corner rect
        ctx.lineWidth = 1;
        drawLine(isVertical? 0 : RULER_THICKNESS, isVertical? RULER_THICKNESS : 0, RULER_THICKNESS, RULER_THICKNESS);
        ctx.fillStyle = style.cornerClr;
        ctx.fillRect(0, 0, RULER_THICKNESS, RULER_THICKNESS);
    };
    
	var animationId = -1;

	var listenersDrawRuler = function() 
	{
		if (requestAnimationFrame != null)
		{
			if (cancelAnimationFrame != null)
			{
				cancelAnimationFrame(animationId);	
			}

			animationId = requestAnimationFrame(drawRuler);
		}
		else
		{
			drawRuler();
		}
	};
	
	var sizeListener = function() 
	{
	    var div = graph.container;
	    
	    if (isVertical)
    	{
	    	var newH = div.offsetHeight + RULER_THICKNESS;
	    	
	    	if (canvas.height != newH)
    		{
	    		canvas.height = newH;
	    		container.style.height = newH + 'px';
	    		listenersDrawRuler();
    		}
    	}
	    else 
    	{
	    	var newW = div.offsetWidth + RULER_THICKNESS;
	    	
	    	if (canvas.width != newW)
    		{
	    		canvas.width = newW;
	    		container.style.width = newW + 'px';
	    		listenersDrawRuler();
    		}
    	}
    };

    this.drawRuler = listenersDrawRuler;

	var efficientSizeListener = debounce(sizeListener, 10);
	this.sizeListener = efficientSizeListener;
	
	this.pageListener = function()
	{
		listenersDrawRuler();
	};
	
	var efficientScrollListener = debounce(function()
	{
		var newScroll = isVertical? graph.container.scrollTop : graph.container.scrollLeft;
		
		if (ruler.lastScroll != newScroll)
		{
			ruler.lastScroll = newScroll;
			listenersDrawRuler();
		}
	}, 10);

	this.scrollListener = efficientScrollListener;
	this.unitListener = function(sender, evt)
    {
    	ruler.setUnit(evt.getProperty('unit'));
    };
	
    graph.addListener(mxEvent.SIZE, efficientSizeListener);
    graph.container.addEventListener('scroll', efficientScrollListener);
    graph.view.addListener('unitChanged', this.unitListener);
    editorUi.addListener('pageViewChanged', this.pageListener);
    editorUi.addListener('pageScaleChanged', this.pageListener);
    editorUi.addListener('pageFormatChanged', this.pageListener);

    function debounce(func, wait, immediate) 
    {
		if (requestAnimationFrame != null)
		{
			return func;
		}
		
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };
    
    this.setStyle = function(newStyle)
    {
    	style = newStyle;
    	container.style.background = style.bkgClr;
    	drawRuler();
    }
    
    // Showing guides on cell move
    this.origGuideMove = mxGuide.prototype.move;
	
	mxGuide.prototype.move = function (bounds, delta, gridEnabled, clone)
	{
		var ret = null;
		
		// LATER: Fix repaint for width and height < 5
		if ((isVertical && bounds.height > 4) || (!isVertical && bounds.width > 4))
		{
			if (ruler.guidePart != null)
			{
				try
				{
					ctx.putImageData(ruler.guidePart.imgData1, ruler.guidePart.x1, ruler.guidePart.y1);	
					ctx.putImageData(ruler.guidePart.imgData2, ruler.guidePart.x2, ruler.guidePart.y2);	
					ctx.putImageData(ruler.guidePart.imgData3, ruler.guidePart.x3, ruler.guidePart.y3);
				}
				catch (e)
				{
					// ignore
				}
			}
			
			ret = ruler.origGuideMove.apply(this, arguments);
	
			try
			{
				var x1, y1, imgData1, x2, y2, imgData2, x3, y3, imgData3;
				ctx.lineWidth = 0.5;
		        ctx.strokeStyle = style.guideClr;
		        ctx.setLineDash([2]);
		
		        if (isVertical)
				{
					y1 = bounds.y + ret.y + RULER_THICKNESS - this.graph.container.scrollTop;
					x1 = 0;
					y2 = y1 + bounds.height / 2;
					x2 = RULER_THICKNESS / 2;
					y3 = y1 + bounds.height;
					x3 = 0;
					imgData1 = ctx.getImageData(x1, y1 - 1, RULER_THICKNESS, 3);
					drawLine(x1, y1, RULER_THICKNESS, y1);
					y1--;
					imgData2 = ctx.getImageData(x2, y2 - 1, RULER_THICKNESS, 3);
					drawLine(x2, y2, RULER_THICKNESS, y2);
					y2--;
					imgData3 = ctx.getImageData(x3, y3 - 1, RULER_THICKNESS, 3);
					drawLine(x3, y3, RULER_THICKNESS, y3);
					y3--;
				}
				else
				{
					y1 = 0;
					x1 = bounds.x + ret.x + RULER_THICKNESS - this.graph.container.scrollLeft;
					y2 = RULER_THICKNESS / 2;
					x2 = x1 + bounds.width / 2;
					y3 = 0;
					x3 = x1 + bounds.width;
					imgData1 = ctx.getImageData(x1 - 1, y1, 3, RULER_THICKNESS);
					drawLine(x1, y1, x1, RULER_THICKNESS);
					x1--;
					imgData2 = ctx.getImageData(x2 - 1, y2, 3, RULER_THICKNESS);
					drawLine(x2, y2, x2, RULER_THICKNESS);
					x2--;
					imgData3 = ctx.getImageData(x3 - 1, y3, 3, RULER_THICKNESS);
					drawLine(x3, y3, x3, RULER_THICKNESS);
					x3--;
				}
				
				if (ruler.guidePart == null || ruler.guidePart.x1 != x1 || ruler.guidePart.y1 != y1)
				{
					ruler.guidePart = { 
						imgData1: imgData1,
						x1: x1,
						y1: y1,
						imgData2: imgData2,
						x2: x2,
						y2: y2,
						imgData3: imgData3,
						x3: x3,
						y3: y3
					}	
				}
			}
			catch (e)
			{
				// ignore
			}
		}
		else
		{
			ret = ruler.origGuideMove.apply(this, arguments);
		}
		
		return ret;
	}
	
	this.origGuideDestroy = mxGuide.prototype.destroy;
	
	mxGuide.prototype.destroy = function()
	{
		var ret = ruler.origGuideDestroy.apply(this, arguments);
		
		if (ruler.guidePart != null)
		{
			try
			{
				ctx.putImageData(ruler.guidePart.imgData1, ruler.guidePart.x1, ruler.guidePart.y1);	
				ctx.putImageData(ruler.guidePart.imgData2, ruler.guidePart.x2, ruler.guidePart.y2);	
				ctx.putImageData(ruler.guidePart.imgData3, ruler.guidePart.x3, ruler.guidePart.y3);
				ruler.guidePart = null;
			}
			catch (e)
			{
				// ignore
			}
		}
		
		return ret;
	};
};

mxRuler.prototype.RULER_THICKNESS = 14;
mxRuler.prototype.unit = mxConstants.POINTS;

mxRuler.prototype.setUnit = function(unit) 
{
    this.unit = unit;
    this.drawRuler();
};

mxRuler.prototype.formatText = function(pixels) 
{
    switch(this.unit) 
    {
        case mxConstants.POINTS:
            return Math.round(pixels);
        case mxConstants.MILLIMETERS:
            return (pixels / mxConstants.PIXELS_PER_MM).toFixed(1);
        case mxConstants.METERS:
            return (pixels / (mxConstants.PIXELS_PER_MM * 1000)).toFixed(4);
        case mxConstants.INCHES:
            return (pixels / mxConstants.PIXELS_PER_INCH).toFixed(2);
    }
};

mxRuler.prototype.destroy = function() 
{
	this.ui.refresh = this.editorUiRefresh;
	mxGuide.prototype.move = this.origGuideMove;
	mxGuide.prototype.destroy = this.origGuideDestroy;
    this.graph.removeListener(this.sizeListener);
    this.graph.container.removeEventListener('scroll', this.scrollListener);
    this.graph.view.removeListener('unitChanged', this.unitListener);
    this.ui.removeListener('pageViewChanged', this.pageListener);
    this.ui.removeListener('pageScaleChanged', this.pageListener);
    this.ui.removeListener('pageFormatChanged', this.pageListener);
    
    if (this.container != null)
    {
    	this.container.parentNode.removeChild(this.container);
    }
};

function mxDualRuler(editorUi, unit)
{
	var rulerOffset = new mxPoint(mxRuler.prototype.RULER_THICKNESS, mxRuler.prototype.RULER_THICKNESS);
	this.editorUiGetDiagContOffset = editorUi.getDiagramContainerOffset;

	editorUi.getDiagramContainerOffset = function()
	{
		return rulerOffset;
	};

	this.editorUiRefresh = editorUi.refresh;
	this.ui = editorUi;
	this.origGuideMove = mxGuide.prototype.move;
	this.origGuideDestroy = mxGuide.prototype.destroy;
	
	this.vRuler = new mxRuler(editorUi, unit, true);
	this.hRuler = new mxRuler(editorUi, unit, false, true);

	// Adds units context menu
	var installMenu = mxUtils.bind(this, function(node)
	{
		var menuWasVisible = false;

		mxEvent.addGestureListeners(node, mxUtils.bind(this, function(evt)
		{
			menuWasVisible = editorUi.currentMenu != null;
			mxEvent.consume(evt);
		}), null, mxUtils.bind(this, function(evt)
		{
			if (editorUi.editor.graph.isEnabled() && !editorUi.editor.graph.isMouseDown &&
				(mxEvent.isTouchEvent(evt) || mxEvent.isPopupTrigger(evt)))
			{
				editorUi.editor.graph.popupMenuHandler.hideMenu();
				editorUi.hideCurrentMenu();
				
				if (!mxEvent.isTouchEvent(evt) || !menuWasVisible)
				{
					var menu = new mxPopupMenu(mxUtils.bind(this, function(menu, parent)
					{
						editorUi.menus.addMenuItems(menu, ['points', 'inches', 'millimeters', 'meters'], parent);
					}));
					
					menu.div.className += ' geMenubarMenu';
					menu.smartSeparators = true;
					menu.showDisabled = true;
					menu.autoExpand = true;
					
					// Disables autoexpand and destroys menu when hidden
					menu.hideMenu = mxUtils.bind(this, function()
					{
						mxPopupMenu.prototype.hideMenu.apply(menu, arguments);
						editorUi.resetCurrentMenu();
						menu.destroy();
					});
			
					var x = mxEvent.getClientX(evt);
					var y = mxEvent.getClientY(evt);
					menu.popup(x, y, null, evt);
					editorUi.setCurrentMenu(menu, node);
				}
				
				mxEvent.consume(evt);
			}
		}));
	});
	
	installMenu(this.hRuler.container);
	installMenu(this.vRuler.container);
	
	this.vRuler.drawRuler();
	this.hRuler.drawRuler();
};

mxDualRuler.prototype.updateStyle = function()
{
	this.vRuler.updateStyle();
	this.hRuler.updateStyle();
	this.vRuler.drawRuler();
	this.hRuler.drawRuler();
};

mxDualRuler.prototype.setUnit = function(unit) 
{
	this.vRuler.setUnit(unit);
	this.hRuler.setUnit(unit);
};

mxDualRuler.prototype.setStyle = function(newStyle)
{
	this.vRuler.setStyle(newStyle);
	this.hRuler.setStyle(newStyle);
}

mxDualRuler.prototype.destroy = function() 
{
	this.vRuler.destroy();
	this.hRuler.destroy();
	this.ui.refresh = this.editorUiRefresh;
	mxGuide.prototype.move = this.origGuideMove;
	mxGuide.prototype.destroy = this.origGuideDestroy;
	this.ui.getDiagramContainerOffset = this.editorUiGetDiagContOffset;
};