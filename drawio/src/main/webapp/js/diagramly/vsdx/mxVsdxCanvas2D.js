/**
 * Copyright (c) 2006-2017, JGraph Ltd
 */
/**
 * Class: mxVsdxCanvas2D
 *
 * Constructor: mxVsdxCanvas2D
 *
 * Constructs a new abstract canvas.
 */
function mxVsdxCanvas2D()
{
	mxAbstractCanvas2D.call(this);
};

/**
 * Extends mxAbstractCanvas2D
 */
mxUtils.extend(mxVsdxCanvas2D, mxAbstractCanvas2D);


/**
 * Variable: textEnabled
 * 
 * Specifies if text output should be enabled. Default is true.
 */
mxVsdxCanvas2D.prototype.textEnabled = true;

/**
 * Function: init
 *  
 * Initialize the canvas for a new vsdx file.
 */
mxVsdxCanvas2D.prototype.init = function (zip)
{
	this.filesLoading = 0;
	this.zip = zip;
};

/**
 * Function: onFilesLoaded
 *  
 * Called after all pending files have finished loading.
 */
mxVsdxCanvas2D.prototype.onFilesLoaded = function ()
{
	// hook for subclassers
};

/**
 * Function: createElt
 *  
 * Create a new geo section.
 */
mxVsdxCanvas2D.prototype.createElt = function (name)
{
	return (this.xmlDoc.createElementNS != null) ? this.xmlDoc.createElementNS(VsdxExport.prototype.XMLNS, name) :
		this.xmlDoc.createElement(name);
};


/**
 * Function: createGeoSec
 *  
 * Create a new geo section.
 */
mxVsdxCanvas2D.prototype.createGeoSec = function ()
{
	if (this.geoSec != null)
	{
		this.shape.appendChild(this.geoSec);
	}
	
	var geoSec = this.createElt("Section");
	
	geoSec.setAttribute("N", "Geometry");
	geoSec.setAttribute("IX", this.geoIndex++);
	
	this.geoSec = geoSec;
	this.geoStepIndex = 1;
	this.lastX = 0;
	this.lastY = 0;
	this.lastMoveToX = 0;
	this.lastMoveToY = 0;
};


/**
 * Function: newShape
 *  
 * Create a new shape.
 */
mxVsdxCanvas2D.prototype.newShape = function (shape, cellState, xmlDoc)
{
	this.geoIndex = 0;
	this.shape = shape;
	this.cellState = cellState;
	this.xmGeo = cellState.cell.geometry;
	this.xmlDoc = xmlDoc;
	this.geoSec = null;
	this.shapeImg = null;
	this.shapeType = "Shape";
	
	this.createGeoSec();
};


/**
 * Function: newEdge
 *  
 * Create a new edge.
 */
mxVsdxCanvas2D.prototype.newEdge = function (shape, cellState, xmlDoc)
{
	this.shape = shape;
	this.cellState = cellState;
	this.xmGeo = cellState.cellBounds;
	var s = this.state;
	this.xmlDoc = xmlDoc;
};

/**
 * Function: endShape
 *  
 * End current shape.
 */
mxVsdxCanvas2D.prototype.endShape = function ()
{
	if (this.shapeImg != null)
	{
		this.addForeignData(this.shapeImg.type, this.shapeImg.id);
	}
};


/**
 * Function: newPage
 *  
 * Start a new page.
 */
mxVsdxCanvas2D.prototype.newPage = function ()
{
	this.images = [];
};

/**
 * Function: newPage
 *  
 * Start a new page.
 */
mxVsdxCanvas2D.prototype.getShapeType = function ()
{
	return this.shapeType;
};

/**
 * Function: getShapeGeo
 *  
 * return the current geo section.
 */
mxVsdxCanvas2D.prototype.getShapeGeo = function ()
{
	return this.geoSec;
};

/**
 * Function: createCellElemScaled
 * 
 * Creates a cell element and scale the value.
 */
mxVsdxCanvas2D.prototype.createCellElemScaled = function (name, val, formula)
{
	return this.createCellElem(name, val / VsdxExport.prototype.CONVERSION_FACTOR, formula);
};

/**
 * Function: createCellElem
 * 
 * Creates a cell element.
 */
mxVsdxCanvas2D.prototype.createCellElem = function (name, val, formula)
{
	var cell = this.createElt("Cell");
	cell.setAttribute("N", name);
	cell.setAttribute("V", val);
	
	if (formula) cell.setAttribute("F", formula);

	return cell;
};

mxVsdxCanvas2D.prototype.createRowScaled = function(type, index, x, y, a, b, c , d, xF, yF, aF, bF, cF, dF) 
{
	return this.createRowRel(type, index, x / VsdxExport.prototype.CONVERSION_FACTOR, y / VsdxExport.prototype.CONVERSION_FACTOR,
			a / VsdxExport.prototype.CONVERSION_FACTOR, b / VsdxExport.prototype.CONVERSION_FACTOR,
			c / VsdxExport.prototype.CONVERSION_FACTOR, d / VsdxExport.prototype.CONVERSION_FACTOR,
			xF, yF, aF, bF, cF, dF);
};

mxVsdxCanvas2D.prototype.createRowRel = function(type, index, x, y, a, b, c , d, xF, yF, aF, bF, cF, dF) 
{
	var row = this.createElt("Row");
	row.setAttribute("T", type);
	row.setAttribute("IX", index);
	row.appendChild(this.createCellElem("X", x, xF));
	row.appendChild(this.createCellElem("Y", y, yF));
	
	if (a != null && isFinite(a)) row.appendChild(this.createCellElem("A", a, aF));
	if (b != null && isFinite(b)) row.appendChild(this.createCellElem("B", b, bF));
	if (c != null && isFinite(c)) row.appendChild(this.createCellElem("C", c, cF));
	if (d != null && isFinite(d)) row.appendChild(this.createCellElem("D", d, dF));
	
	return row;
};


/**
 * Function: begin
 * 
 * Extends superclass to create path.
 */
mxVsdxCanvas2D.prototype.begin = function()
{
	if (this.geoStepIndex > 1)	this.createGeoSec();
};

/**
 * Function: rect
 * 
 * Private helper function to create SVG elements
 */
mxVsdxCanvas2D.prototype.rect = function(x, y, w, h)
{
	if (this.geoStepIndex > 1)	this.createGeoSec();
	
	var s = this.state;
	w = w * s.scale;
	h = h * s.scale;

	var geo = this.xmGeo;
	x = ((x - geo.x + s.dx) * s.scale);
	y = ((geo.height - y + geo.y - s.dy) * s.scale);
	
	this.geoSec.appendChild(this.createRowScaled("MoveTo", this.geoStepIndex++, x, y));
	this.geoSec.appendChild(this.createRowScaled("LineTo", this.geoStepIndex++, x + w, y));
	this.geoSec.appendChild(this.createRowScaled("LineTo", this.geoStepIndex++, x + w, y - h));
	this.geoSec.appendChild(this.createRowScaled("LineTo", this.geoStepIndex++, x, y - h));
	this.geoSec.appendChild(this.createRowScaled("LineTo", this.geoStepIndex++, x, y));
};

/**
 * Function: roundrect
 * 
 * Private helper function to create SVG elements
 */
mxVsdxCanvas2D.prototype.roundrect = function(x, y, w, h, dx, dy)
{
	this.rect(x, y, w, h);
	//TODO this assume dx and dy are equal and only one rounding is needed
	this.shape.appendChild(this.createCellElemScaled("Rounding", dx));
};

/**
 * Function: ellipse
 * 
 * Private helper function to create SVG elements
 */
mxVsdxCanvas2D.prototype.ellipse = function(x, y, w, h)
{
	if (this.geoStepIndex > 1)	this.createGeoSec();
	
	var s = this.state;
	w = w * s.scale;
	h = h * s.scale;
	
	var geo = this.xmGeo;
	var gh = geo.height * s.scale;
	var gw = geo.width * s.scale;
	x = (x - geo.x + s.dx) * s.scale;
	y = gh + (-y + geo.y - s.dy) * s.scale;

	var xWr = (x + w/2) / gw;
	var yHr = (y - h/2) / gh;
	var aWr = x / gw;
	var bHr = (y - h/2) / gh;
	var cWr = (x + w/2) / gw;
	var dHr = y / gh;
	
	this.geoSec.appendChild(this.createRowScaled("Ellipse", this.geoStepIndex++, x + w/2, y - h/2, x, y - h/2, x + w/2, y
			, "Width*" + xWr, "Height*" + yHr, "Width*" + aWr, "Height*" + bHr, "Width*" + cWr, "Height*" + dHr));
};

/**
 * Function: moveTo
 * 
 * Moves the current path the given point.
 * 
 * Parameters:
 * 
 * x - Number that represents the x-coordinate of the point.
 * y - Number that represents the y-coordinate of the point.
 */
mxVsdxCanvas2D.prototype.moveTo = function(x, y)
{
	//MoveTo inside a geo usually produce incorrect fill
	if (this.geoStepIndex > 1)	this.createGeoSec();
	
	this.lastMoveToX = x;
	this.lastMoveToY = y;
	this.lastX = x;
	this.lastY = y;	

	var geo = this.xmGeo;
	var s = this.state;
	x = (x - geo.x + s.dx) * s.scale;
	y = (geo.height - y + geo.y - s.dy) * s.scale;
	var h = geo.height * s.scale;
	var w = geo.width * s.scale;

	this.geoSec.appendChild(this.createRowRel("RelMoveTo", this.geoStepIndex++, x/w, y/h));
};

/**
 * Function: lineTo
 * 
 * Draws a line to the given coordinates.
 * 
 * Parameters:
 * 
 * x - Number that represents the x-coordinate of the endpoint.
 * y - Number that represents the y-coordinate of the endpoint.
 */
mxVsdxCanvas2D.prototype.lineTo = function(x, y)
{
	this.lastX = x;
	this.lastY = y;	

	var geo = this.xmGeo;
	var s = this.state;
	x = (x - geo.x + s.dx) * s.scale;
	y = (geo.height - y + geo.y - s.dy) * s.scale;
	var h = geo.height * s.scale;
	var w = geo.width * s.scale;

	this.geoSec.appendChild(this.createRowRel("RelLineTo", this.geoStepIndex++, x/w, y/h));
};

/**
 * Function: quadTo
 * 
 * Adds a quadratic curve to the current path.
 * 
 * Parameters:
 * 
 * x1 - Number that represents the x-coordinate of the control point.
 * y1 - Number that represents the y-coordinate of the control point.
 * x2 - Number that represents the x-coordinate of the endpoint.
 * y2 - Number that represents the y-coordinate of the endpoint.
 */
mxVsdxCanvas2D.prototype.quadTo = function(x1, y1, x2, y2)
{
	this.lastX = x2;
	this.lastY = y2;	

	var s = this.state;
	var geo = this.xmGeo;

	var h = geo.height * s.scale;
	var w = geo.width * s.scale;

	x1 = (x1 - geo.x + s.dx) * s.scale;
	y1 = (geo.height - y1 + geo.y - s.dy) * s.scale;

	x2 = (x2 - geo.x + s.dx) * s.scale;
	y2 = (geo.height - y2 + geo.y - s.dy) * s.scale;

	x1 = x1 / w;
	y1 = y1 / h;
	x2 = x2 / w;
	y2 = y2 / h;

	this.geoSec.appendChild(this.createRowRel("RelQuadBezTo", this.geoStepIndex++, x2, y2, x1, y1));
};

/**
 * Function: curveTo
 * 
 * Adds a bezier curve to the current path.
 * 
 * Parameters:
 * 
 * x1 - Number that represents the x-coordinate of the first control point.
 * y1 - Number that represents the y-coordinate of the first control point.
 * x2 - Number that represents the x-coordinate of the second control point.
 * y2 - Number that represents the y-coordinate of the second control point.
 * x3 - Number that represents the x-coordinate of the endpoint.
 * y3 - Number that represents the y-coordinate of the endpoint.
 */
mxVsdxCanvas2D.prototype.curveTo = function(x1, y1, x2, y2, x3, y3)
{
	this.lastX = x3;
	this.lastY = y3;	

	var s = this.state;
	var geo = this.xmGeo;

	var h = geo.height * s.scale;
	var w = geo.width * s.scale;

	x1 = (x1 - geo.x + s.dx) * s.scale;
	y1 = (geo.height - y1 + geo.y - s.dy) * s.scale;

	x2 = (x2 - geo.x + s.dx) * s.scale;
	y2 = (geo.height - y2 + geo.y - s.dy) * s.scale;

	x3 = (x3 - geo.x + s.dx) * s.scale;
	y3 = (geo.height - y3 + geo.y - s.dy) * s.scale;

	x1 = x1 / w;
	y1 = y1 / h;
	x2 = x2 / w;
	y2 = y2 / h;
	x3 = x3 / w;
	y3 = y3 / h;

	this.geoSec.appendChild(this.createRowRel("RelCubBezTo", this.geoStepIndex++, x3, y3, x1, y1, x2, y2));
};

/**
 * Function: close
 * 
 * Closes the current path.
 */
mxVsdxCanvas2D.prototype.close = function()
{
	//Closing with a line if last point != last MoveTo point
	if (this.lastMoveToX != this.lastX || this.lastMoveToY != this.lastY)
		this.lineTo(this.lastMoveToX, this.lastMoveToY);
};

/**
 * Function: addForeignData
 * 
 * Add ForeignData to current shape using last image in the images array
 */
mxVsdxCanvas2D.prototype.addForeignData = function(type, index) 
{
	var foreignData = this.createElt("ForeignData");
	foreignData.setAttribute("ForeignType", "Bitmap");
	
	type = type.toUpperCase();
	
	if (type != "BMP")
		foreignData.setAttribute("CompressionType", type);
	
	var rel = this.createElt("Rel");
	rel.setAttribute("r:id", "rId" + index);
	
	
	foreignData.appendChild(rel);
	this.shape.appendChild(foreignData);
	this.shapeType = "Foreign";
};


mxVsdxCanvas2D.prototype.convertSvg2Png = function(svgData, isBase64, callback)
{
	var that = this;
	this.filesLoading++;
	try
	{
		var canvas = document.createElement("canvas");
		var ctx = canvas.getContext("2d");
		
		if (!isBase64)
		{
			svgData = String.fromCharCode.apply(null, new Uint8Array(svgData));
			
			svgData =  ((window.btoa)? btoa(svgData) : Base64.encode(svgData, true));
		}
		
		var svgUrl = "data:image/svg+xml;base64," + svgData;  
			
	    img = new Image;
	
		img.onload = function () {
			canvas.width = this.width;
			canvas.height = this.height;
			
		    ctx.drawImage(this, 0, 0);     
		    
		    try
		    {
		    	callback(canvas.toDataURL("image/png"));
		    }
		    catch(e){}//ignore

		    that.filesLoading--;
	    	
		    if (that.filesLoading == 0)
	    	{
	    		that.onFilesLoaded();
	    	}
		};
		
		img.onerror = function () {
			console.log("SVG2PNG conversion failed");

			try
		    {
		    	callback(svgData); //Error, just return the original data!
		    }
		    catch(e){}//ignore

		    that.filesLoading--;
		    
	    	if (that.filesLoading == 0)
	    	{
	    		that.onFilesLoaded();
	    	}
		};
		
		img.src = svgUrl;
	}
	catch(e)
	{
		console.log("SVG2PNG conversion failed" + e.message);
		
		try
		{
			callback(svgData); //just to keep going!
	    }
	    catch(e){}//ignore

		this.filesLoading--;

		if (that.filesLoading == 0)
    	{
    		that.onFilesLoaded();
    	}
	}
};


/**
 * Function: image
 * 
 * Add image to vsdx file as a media (Foreign Object)
 */
mxVsdxCanvas2D.prototype.image = function(x, y, w, h, src, aspect, flipH, flipV)
{
	var that = this;

	//TODO image reusing, if the same image is used more than once, reuse it. Applicable for URLs specifically (but can also be applied to embedded ones)
	var imgName = "image" + (this.images.length + 1) + "."; 
	var type;
	if (src.indexOf("data:") == 0)
	{
		var p = src.indexOf("base64,");
		var base64 = src.substring(p + 7); //7 is the length of "base64,"
		type = src.substring(11, p-1); //11 is the length of "data:image/"
		
		//SVG files cannot be embedded in vsdx files, TODO convert them to a visio shape
		if (type.indexOf('svg') == 0) {
			type = 'png';
			imgName += type;
			this.convertSvg2Png(base64, true, function(pngData){
				that.zip.file("visio/media/" + imgName, pngData.substring(22), {base64: true}); //22 is the length of "data:image/png;base64,"
			});
		}
		else
		{
			imgName += type;
			this.zip.file("visio/media/" + imgName, base64, {base64: true});
		}
	}
	else if (window.XMLHttpRequest) //URL src, fetch it
	{
		src = this.converter.convert(src);
		this.filesLoading++;
		
		var p = src.lastIndexOf(".");
		type = src.substring(p+1);
		
		var convertSvg = false;
		
		if (type.indexOf('svg') == 0) 
		{
			type = 'png';
			convertSvg = true;
		}

		imgName += type;

		//The old browsers binary workaround doesn't work with jszip and converting to base64 encoding doesn't work also
		var xhr = new XMLHttpRequest();
		xhr.open('GET', src, true);
		xhr.responseType = 'arraybuffer';
		xhr.onreadystatechange = function(e) 
		{
		    if (this.readyState == 4) 
		    {
		    	if (this.status == 200)
	    		{
		    		//SVG files cannot be embedded in vsdx files, TODO convert them to a visio shape
		    		if (convertSvg)
	    			{
		    			that.convertSvg2Png(this.response, false, function(pngData){
		    				that.zip.file("visio/media/" + imgName, pngData.substring(22), {base64: true}); //22 is the length of "data:image/png;base64,"
		    			});
		    		}
		    		else
		    		{
		    			that.zip.file("visio/media/" + imgName, this.response);
		    		}
	    		}
		    	
		    	that.filesLoading--;
		    	
		    	if (that.filesLoading == 0)
		    	{
		    		that.onFilesLoaded();
		    	}
		    }
		};
		xhr.send();
	}

	this.images.push(imgName);
	
	//TODO can a shape has more than one image?
	//We add one to the id as rId1 is reserved for the edges master
	this.shapeImg = {type: type, id: this.images.length + 1};

	//TODO support these!
	aspect = (aspect != null) ? aspect : true;
	flipH = (flipH != null) ? flipH : false;
	flipV = (flipV != null) ? flipV : false;

	var s = this.state;
	w = w * s.scale;
	h = h * s.scale;
	
	var geo = this.xmGeo;
	x = (x - geo.x + s.dx) * s.scale;
	y = (geo.height - y + geo.y - s.dy) * s.scale;

	this.shape.appendChild(this.createCellElemScaled("ImgOffsetX", x));
	this.shape.appendChild(this.createCellElemScaled("ImgOffsetY", y - h));
	this.shape.appendChild(this.createCellElemScaled("ImgWidth", w));
	this.shape.appendChild(this.createCellElemScaled("ImgHeight", h));
	
//	var s = this.state;
//	x += s.dx;
//	y += s.dy;
//	
//	if (s.alpha < 1 || s.fillAlpha < 1)
//	{
//		node.setAttribute('opacity', s.alpha * s.fillAlpha);
//	}
//	
//	var tr = this.state.transform || '';
//	
//	if (flipH || flipV)
//	{
//		var sx = 1;
//		var sy = 1;
//		var dx = 0;
//		var dy = 0;
//		
//		if (flipH)
//		{
//			sx = -1;
//			dx = -w - 2 * x;
//		}
//		
//		if (flipV)
//		{
//			sy = -1;
//			dy = -h - 2 * y;
//		}
//		
//		// Adds image tansformation to existing transform
//		tr += 'scale(' + sx + ',' + sy + ')translate(' + (dx * s.scale) + ',' + (dy * s.scale) + ')';
//	}
//
//	if (tr.length > 0)
//	{
//		node.setAttribute('transform', tr);
//	}
//	
//	if (!this.pointerEvents)
//	{
//		node.setAttribute('pointer-events', 'none');
//	}
};

/**
 * Function: text
 * 
 * Paints the given text. Possible values for format are empty string for
 * plain text and html for HTML markup. HTML labels
 * are not available as part of shapes with no foreignObject support in SVG
 * (eg. IE9, IE10).
 * 
 * Parameters:
 * 
 * x - Number that represents the x-coordinate of the text.
 * y - Number that represents the y-coordinate of the text.
 * w - Number that represents the available width for the text or 0 for automatic width.
 * h - Number that represents the available height for the text or 0 for automatic height.
 * str - String that specifies the text to be painted.
 * align - String that represents the horizontal alignment.
 * valign - String that represents the vertical alignment.
 * wrap - Boolean that specifies if word-wrapping is enabled. Requires w > 0.
 * format - Empty string for plain text or 'html' for HTML markup.
 * overflow - Specifies the overflow behaviour of the label. Requires w > 0 and/or h > 0.
 * clip - Boolean that specifies if the label should be clipped. Requires w > 0 and/or h > 0.
 * rotation - Number that specifies the angle of the rotation around the anchor point of the text.
 * dir - Optional string that specifies the text direction. Possible values are rtl and lrt.
 */
mxVsdxCanvas2D.prototype.text = function(x, y, w, h, str, align, valign, wrap, format, overflow, clip, rotation, dir)
{
	var that = this;
	if (this.textEnabled && str != null)
	{
		if (mxUtils.isNode(str))
		{
			str = mxUtils.getOuterHtml(str);
		}

		//This is the case with edges
		if (w == 0 && h == 0)
		{
			var strSize = mxUtils.getSizeForString(str, that.cellState.style["fontSize"], that.cellState.style["fontFamily"]);
			w = strSize.width * 2;
			h = strSize.height * 2;
		}
		
		//TODO support HTML text formatting and remaining attributes
		if (format == 'html')
    	{
    		if (mxUtils.getValue(this.cellState.style, 'nl2Br', '1') != '0')
			{
				// Removes newlines from HTML and converts breaks to newlines
				// to match the HTML output in plain text
    			str = str.replace(/\n/g, '').replace(/<br\s*.?>/g, '\n');
			}
    		
    		// Removes HTML tags
			if (this.html2txtDiv == null)
				this.html2txtDiv = document.createElement('div');
			
			this.html2txtDiv.innerHTML = Graph.sanitizeHtml(str);
			str = mxUtils.extractTextWithWhitespace(this.html2txtDiv.childNodes);
    	}
		
		var s = this.state;
		var geo = this.xmGeo;

		w = w * s.scale;
		h = h * s.scale;

		var charSect = this.createElt("Section");
		charSect.setAttribute('N', 'Character');

		var pSect = this.createElt("Section");
		pSect.setAttribute('N', 'Paragraph');

		var text = this.createElt("Text");

		var rowIndex = 0, pIndex = 0;
		var calcW = 0, calcH = 0, lastW = 0, lastH = 0, lineH = 0;
		
		var createTextRow = function(styleMap, charSect, pSect, textEl, txt) 
		{
			var fontSize = styleMap['fontSize'];
			var fontFamily = styleMap['fontFamily'];
			
			var strRect = mxUtils.getSizeForString(txt, fontSize, fontFamily);
			var wrapped = false;
			
			if (wrap && strRect.width > w) 
			{
				strRect = mxUtils.getSizeForString(txt, fontSize, fontFamily, w);
				wrapped = true;
			}

			if (styleMap['blockElem'])
			{
				lastW += strRect.width;
				calcW = Math.min(Math.max(calcW, lastW), w);
				lastW = 0;
				lastH = Math.max(lastH, strRect.height);
				calcH += lastH + lineH;
				lineH = lastH;
				lastH = 0;
			}
			else 
			{
				lastW += strRect.width;
				calcW = Math.min(Math.max(calcW, lastW), w);
				lastH = Math.max(lastH, strRect.height);
				calcH = Math.max(calcH, lastH);
			}
			
			var charRow = that.createElt("Row");
			charRow.setAttribute('IX', rowIndex);
			
			
			if (styleMap['fontColor'])	charRow.appendChild(that.createCellElem("Color", mxUtils.rgba2hex(styleMap['fontColor'])));
			
			if (fontSize)	charRow.appendChild(that.createCellElemScaled("Size", fontSize * 0.97)); //the magic number 0.97 is needed such that text do not overflow
			
			if (fontFamily)	charRow.appendChild(that.createCellElem("Font", fontFamily));
			
			//0x00 No format
			//0x01 Specifies that the text run has a bold character property. 
			//0x02 Specifies that the text run has an italic character property. 
			//0x04 Specifies that the text run has an underline character property. 
			//0x08 Specifies that the text run has a small caps character property.
			var style = 0;
			if (styleMap['bold']) style |= 0x11;	
			if (styleMap['italic']) style |= 0x22;
			if (styleMap['underline']) style |= 0x4;
			
			charRow.appendChild(that.createCellElem("Style", style));
			charRow.appendChild(that.createCellElem("Case", "0"));
			charRow.appendChild(that.createCellElem("Pos", "0"));
			charRow.appendChild(that.createCellElem("FontScale", "1"));
			charRow.appendChild(that.createCellElem("Letterspace", "0"));
			
			charSect.appendChild(charRow);
			
			var pRow = that.createElt("Row");
			pRow.setAttribute('IX', pIndex);
			
			var align = 1; //center is default
			
			switch(styleMap['align'])
			{
				case 'left': align = 0; break;
				case 'center': align = 1; break;
				case 'right': align = 2; break;
				case 'start': align = 0; break; //TODO check right-to-left
				case 'end': align = 2; break; //TODO check right-to-left
				case 'justify': align = 0; break;
				default:
					align = 1;
			}
			
			pRow.appendChild(that.createCellElem("HorzAlign", align));
//			pRow.appendChild(that.createCellElem("SpLine", "-1.2"));
			pSect.appendChild(pRow);
			
//			var pp = that.createElt("pp");
//			pp.setAttribute('IX', pIndex++);
//			textEl.appendChild(pp);
			var cp = that.createElt("cp");
			cp.setAttribute('IX', rowIndex++);
			textEl.appendChild(cp);
			var txtNode = that.xmlDoc.createTextNode(txt + (styleMap['blockElem']? "\n" : ""));  
			textEl.appendChild(txtNode);
		};

		var processNodeChildren = function(ch, pStyle) 
		{
			pStyle = pStyle || {};
			for (var i=0; i<ch.length; i++) 
			{
				var curCh = ch[i];
				
				if (curCh.nodeType == 3) 
				{ //#text
					var fontStyle = that.cellState.style["fontStyle"];
					var styleMap = {
						fontColor: pStyle['fontColor'] || that.cellState.style["fontColor"],
						fontSize: pStyle['fontSize'] || that.cellState.style["fontSize"],
						fontFamily: pStyle['fontFamily'] || that.cellState.style["fontFamily"],
						align: pStyle['align'] || that.cellState.style["align"],
						bold: pStyle['bold'] || (fontStyle & 1),
						italic: pStyle['italic'] || (fontStyle & 2),
						underline: pStyle['underline'] || (fontStyle & 4)
					};
					
					var brNext = false;
					
					if (i + 1 < ch.length && ch[i + 1].nodeName.toUpperCase() == 'BR')
					{
						brNext = true;
						i++;
					}
					
					//VSDX doesn't have numbered list!
					createTextRow(styleMap, charSect, pSect, text, (pStyle['OL']? pStyle['LiIndex'] + '. ' : '') + curCh.textContent + (brNext? '\n' : ''));
				} 
				else if (curCh.nodeType == 1) 
				{ //element
					var nodeName = curCh.nodeName.toUpperCase();
					var chLen = curCh.childNodes.length;
					var style = window.getComputedStyle(curCh, null);
					var styleMap = {
						bold: style.getPropertyValue('font-weight') == 'bold' || pStyle['bold'],
						italic: style.getPropertyValue('font-style') == 'italic' || pStyle['italic'],
						underline: style.getPropertyValue('text-decoration').indexOf('underline') >= 0 || pStyle['underline'],
						align: style.getPropertyValue('text-align'),
						fontColor: style.getPropertyValue('color'),
						fontSize: parseFloat(style.getPropertyValue('font-size')),
						fontFamily: style.getPropertyValue('font-family').replace(/"/g, ''), //remove quotes
						blockElem: style.getPropertyValue('display') == 'block' || nodeName == "BR" || nodeName == "LI",
						OL: pStyle['OL'],
						LiIndex: pStyle['LiIndex']
					};
					
					if (nodeName == "UL")
					{
						var pRow = that.createElt("Row");
						pRow.setAttribute('IX', pIndex);
						
						pRow.appendChild(that.createCellElem("HorzAlign", "0"));
						pRow.appendChild(that.createCellElem("Bullet", "1"));
						pSect.appendChild(pRow);
						
						var pp = that.createElt("pp");
						pp.setAttribute('IX', pIndex++);
						text.appendChild(pp);
					}
					//VSDX doesn't have numbered list!
					else if (nodeName == "OL")
					{
						styleMap['OL'] = true;
					}
					else if (nodeName == "LI")
					{
						styleMap['LiIndex'] = i + 1;
					}
					
					if (chLen > 0)
					{
						processNodeChildren(curCh.childNodes, styleMap);
						
						//Close the UL by adding another pp with no Vullets
						if (nodeName == "UL")
						{
							var pRow = that.createElt("Row");
							pRow.setAttribute('IX', pIndex);
							
							pRow.appendChild(that.createCellElem("Bullet", "0"));
							pSect.appendChild(pRow);
							
							var pp = that.createElt("pp");
							pp.setAttribute('IX', pIndex++);
							text.appendChild(pp);
						}

						createTextRow(styleMap, charSect, pSect, text, ""); //to handle block elements if any
					}
					else
					{
						//VSDX doesn't have numbered list!
						createTextRow(styleMap, charSect, pSect, text, (pStyle['OL']? pStyle['LiIndex'] + '. ' : '') + curCh.textContent);
					}
				}
			}
		};
		
		if (format == 'html' && mxClient.IS_SVG)
		{
			//Get the actual HTML label node
			var elt = this.cellState.text.node.getElementsByTagName('div')[mxClient.NO_FO? 0 : 1];
			
			if (elt != null)
			{
				var ch = elt.childNodes;
				
				processNodeChildren(ch, {});
			}
		}
		else
		{
			//If it is not HTML or SVG, we fall back to removing html format
			var styleMap = {
				fontColor: that.cellState.style["fontColor"],
				fontSize: that.cellState.style["fontSize"],
				fontFamily: that.cellState.style["fontFamily"]
			};
			createTextRow(styleMap, charSect, pSect, text, str);
		}

		var wShift = 0, hShift = 0;

		h = Math.max(h, calcH); 
		w = Math.max(w, calcW);
		var hw = w/2, hh = h/2;
		var pRotDegrees = parseInt(mxUtils.getValue(this.cellState.style, 'rotation', '0'));
		var pRot = pRotDegrees * Math.PI / 180;

		//TODO Fix align and valign for rotated cases. Currently, all rotated shapes labels are centered
		switch(align) 
		{
			case "right": 
				if (pRotDegrees != 0) 
				{
					x -= hw * Math.cos(pRot);
					y -= hw * Math.sin(pRot);
				}
				else 
				{
					wShift = calcW/2;
				}
			break;
			case "center":
				//nothing
			break;
			case "left":
				if (pRotDegrees != 0) 
				{
					x += hw * Math.cos(pRot);
					y += hw * Math.sin(pRot);
				}
				else
				{
					wShift = -calcW/2;
				}
			break;
		}

		switch(valign) 
		{
			case "top": 
				if (pRotDegrees != 0) 
				{
					x += hh * Math.sin(pRot);
					y += hh * Math.cos(pRot);
				}
				else
				{
					hShift = calcH/2;
				}
			break;
			case "middle":
				//nothing
			break;
			case "bottom": 
				if (pRotDegrees != 0) 
				{
					x -= hh * Math.sin(pRot);
					y -= hh * Math.cos(pRot);
				}
				else
				{
					hShift = -calcH/2;
				}
			break;
		}

		x = (x - geo.x + s.dx) * s.scale;
		y = (geo.height - y + geo.y - s.dy) * s.scale;

		this.shape.appendChild(this.createCellElemScaled("TxtPinX", x));
		this.shape.appendChild(this.createCellElemScaled("TxtPinY", y));
		this.shape.appendChild(this.createCellElemScaled("TxtWidth", w));
		this.shape.appendChild(this.createCellElemScaled("TxtHeight", h));
        this.shape.appendChild(this.createCellElemScaled("TxtLocPinX", hw + wShift));
        this.shape.appendChild(this.createCellElemScaled("TxtLocPinY", hh + hShift));

		
		rotation -= pRotDegrees;
		
		if (rotation != 0)
			this.shape.appendChild(this.createCellElem("TxtAngle", (360 - rotation) * Math.PI / 180));

		
		
		this.shape.appendChild(charSect);
		this.shape.appendChild(pSect);
		this.shape.appendChild(text);
//		if (overflow != null)
//		{
//			elem.setAttribute('overflow', overflow);
//		}
//		
//		if (clip != null)
//		{
//			elem.setAttribute('clip', (clip) ? '1' : '0');
//		}
//		
//		if (dir != null)
//		{
//			elem.setAttribute('dir', dir);
//		}
	}
};

/**
 * Function: rotate
 * 
 * Sets the rotation of the canvas. Note that rotation cannot be concatenated.
 */
mxVsdxCanvas2D.prototype.rotate = function(theta, flipH, flipV, cx, cy)
{
	//Vsdx has flipX/Y support separate from rotation
	if (theta != 0)
	{
		var s = this.state;
		cx += s.dx;
		cy += s.dy;
	
		cx *= s.scale;
		cy *= s.scale;

		this.shape.appendChild(this.createCellElem("Angle", (360 - theta) * Math.PI / 180));
		
		s.rotation = s.rotation + theta;
		s.rotationCx = cx;
		s.rotationCy = cy;
	}
};


/**
 * Function: stroke
 * 
 * Paints the outline of the current drawing buffer.
 */
mxVsdxCanvas2D.prototype.stroke = function()
{
	this.geoSec.appendChild(this.createCellElem("NoFill", "1"));
	this.geoSec.appendChild(this.createCellElem("NoLine", "0"));
};

/**
 * Function: fill
 * 
 * Fills the current drawing buffer.
 */
mxVsdxCanvas2D.prototype.fill = function()
{
	this.geoSec.appendChild(this.createCellElem("NoFill", "0"));
	this.geoSec.appendChild(this.createCellElem("NoLine", "1"));
};

/**
 * Function: fillAndStroke
 * 
 * Fills the current drawing buffer and its outline.
 */
mxVsdxCanvas2D.prototype.fillAndStroke = function()
{
	this.geoSec.appendChild(this.createCellElem("NoFill", "0"));
	this.geoSec.appendChild(this.createCellElem("NoLine", "0"));
};
