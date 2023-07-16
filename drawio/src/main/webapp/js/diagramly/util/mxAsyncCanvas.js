/**
 * mxAsyncCanvas
 */

/**
 * Extends mxAbstractCanvas2D
 */
function mxAsyncCanvas(htmlCanvas)
{
	mxAbstractCanvas2D.call(this);
	this.htmlCanvas = htmlCanvas;
	htmlCanvas.images = htmlCanvas.images || [];
	htmlCanvas.subCanvas = htmlCanvas.subCanvas || [];
};

/**
 * Extends mxAbstractCanvas2D
 */
mxUtils.extend(mxAsyncCanvas, mxAbstractCanvas2D);

/**
 * Variable: htmlCanvas
 * 
 * The canvas instance this object is obtaining async resources for
 */
mxAsyncCanvas.prototype.htmlCanvas = null;

/**
 * Variable: canvasIndex
 * 
 * The current index into the canvas sub-canvas array being processed
 */
mxAsyncCanvas.prototype.canvasIndex = 0;

/**
 * Variable: ctx
 * 
 * Holds the current canvas context
 */
mxAsyncCanvas.prototype.waitCounter = 0;

/**
 * Variable: ctx
 * 
 * Holds the current canvas context
 */
mxAsyncCanvas.prototype.onComplete = null;

mxAsyncCanvas.prototype.incWaitCounter = function()
{
	this.waitCounter++;
};
	
mxAsyncCanvas.prototype.decWaitCounter = function()
{
	this.waitCounter--;
	
	if (this.waitCounter == 0 && this.onComplete != null)
	{
		this.onComplete();
		this.onComplete = null;
	}
};

mxAsyncCanvas.prototype.updateFont = function()
{
	var style = '';
	
	if ((this.state.fontStyle & mxConstants.FONT_BOLD) == mxConstants.FONT_BOLD)
	{
		style += 'bold ';
	}
	
	if ((this.state.fontStyle & mxConstants.FONT_ITALIC) == mxConstants.FONT_ITALIC)
	{
		style += 'italic ';
	}
	
	this.ctx.font = style + this.state.fontSize + 'px ' + this.state.fontFamily;
};

mxAsyncCanvas.prototype.rotate = function(theta, flipH, flipV, cx, cy)
{
};

mxAsyncCanvas.prototype.setAlpha = function(alpha)
{
	this.state.alpha = alpha;
};

mxAsyncCanvas.prototype.setFontColor = function(value)
{
	this.state.fontColor = value;
};

mxAsyncCanvas.prototype.setFontBackgroundColor = function(value)
{
	if (value == mxConstants.NONE)
	{
		value = null;
	}
	
	this.state.fontBackgroundColor = value;
};

mxAsyncCanvas.prototype.setFontBorderColor = function(value)
{
	if (value == mxConstants.NONE)
	{
		value = null;
	}
	
	this.state.fontBorderColor = value;
};

mxAsyncCanvas.prototype.setFontSize = function(value)
{
	this.state.fontSize = value;
};

mxAsyncCanvas.prototype.setFontFamily = function(value)
{
	this.state.fontFamily = value;
};

mxAsyncCanvas.prototype.setFontStyle = function(value)
{
	this.state.fontStyle = value;
};

mxAsyncCanvas.prototype.rect = function(x, y, w, h) {};

mxAsyncCanvas.prototype.roundrect = function(x, y, w, h, dx, dy) {};

mxAsyncCanvas.prototype.ellipse = function(x, y, w, h) {};

//Redirect can be implemented via a hook
mxAsyncCanvas.prototype.rewriteImageSource = function(src)
{
	if (src.substring(0, 7) == 'http://' || src.substring(0, 8) == 'https://')
	{
		src = '/proxy?url=' + encodeURIComponent(src);
	}
	
	return src;
};

mxAsyncCanvas.prototype.image = function(x, y, w, h, src, aspect, flipH, flipV)
{
	src = this.rewriteImageSource(src);
	var image = this.htmlCanvas.images[src];
	
	if (image == null)
	{
		var image = new Image();
		
		image.onload = mxUtils.bind(this, function()
		{
			this.decWaitCounter();
		});
		
		image.onerror = mxUtils.bind(this, function()
		{
			this.decWaitCounter();
			// TODO null the image out? this.htmlCanvas.images[src] = null;
		});

		this.incWaitCounter();
		this.htmlCanvas.images[src] = image;
		image.src = src;
	}
};

mxAsyncCanvas.prototype.fill = function() {};

mxAsyncCanvas.prototype.stroke = function() {};

mxAsyncCanvas.prototype.fillAndStroke = function() {};
	
mxAsyncCanvas.prototype.text = function(x, y, w, h, str, align, valign, wrap, format, overflow, clip, rotation)
{
	if (str == null || str.length == 0)
	{
		return;
	}

	var sc = this.state.scale;

	if (format == 'html' && typeof html2canvas === 'function')
	{
		this.incWaitCounter();
		var canvasIndex = this.canvasIndex++;
		
	    html2canvas(str,
	    {
	        onrendered: mxUtils.bind(this, function(canvas)
	        {
	        	this.htmlCanvas.subCanvas[canvasIndex] = canvas;
	        	this.decWaitCounter();
	        }),
	        scale: sc,
	        logging: true
	    });
	}
};

mxAsyncCanvas.prototype.finish = function(handler)
{
	// TODO: Check if waitCounter updates need a monitor. Question is
	// if image load-handler can be executed in parallel leading to
	// race conditions when updating the "shared" waitCounter.
	if (this.waitCounter == 0)
	{
		handler();
	}
	else
	{
		this.onComplete = handler;
	}
};