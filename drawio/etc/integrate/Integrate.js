// Disables eval for JS (uses shapes.min.js)
mxStencilRegistry.allowEval = false;

// Sets defaults
Graph.prototype.defaultPageVisible = false;
Graph.prototype.defaultScrollbars = false;
EditorUi.prototype.toolbarHeight = 0;
EditorUi.prototype.footerHeight = 0;
EditorUi.scratchpadHelpLink = null;

// Enables action states
EditorUi.prototype.isDiagramActive = function()
{
    return true;
};

// Enables settings
EditorUi.prototype.isSettingsEnabled = function()
{
    return true;
};

// Enables scratchpad
EditorUi.prototype.isScratchpadEnabled = function()
{
    return true;
};

// Workaround for tainted canvas is to base64 encode the image on the server-side
EditorUi.prototype.convertImageToDataUri = function(url, callback)
{
	if (/(\.svg)$/i.test(url))
	{
		mxUtils.get(url, mxUtils.bind(this, function(req)
		{
			callback(Editor.createSvgDataUri(req.getText()));
		}),
		function()
		{
			callback(this.svgBrokenImage.src);
		});
	}
    else
    {
        // Workaround for tainted canvas error
        if (url.substring(0, PROXY_URL.length) == PROXY_URL)
        {
            mxUtils.get(url + '&base64=1', mxUtils.bind(this, function(req)
            {
                callback('data:image/png;base64,' + req.getText());
            }),
            function()
            {
                callback();
            });
        }
        else
        {
		    var img = new Image();
		    var self = this;
		    
		    if (this.crossOriginImages)
	    	{
			    img.crossOrigin = 'anonymous';
		    }
		    
		    img.onload = function()
		    {
		        var canvas = document.createElement('canvas');
		        var ctx = canvas.getContext('2d');
		        canvas.height = img.height;
		        canvas.width = img.width;
		        ctx.drawImage(img, 0, 0);
		        
		        try
		        {
	        		callback(canvas.toDataURL());
		        }
		        catch (e)
		        {
	        		callback(self.svgBrokenImage.src);
		        }
		    };
		    
		    img.onerror = function()
		    {
	    		callback(self.svgBrokenImage.src);
		    };
		    
		    img.src = url;
        }
    }
};

if (typeof(window.mxIntegrateCallback) === 'function')
{
	window.mxIntegrateCallback();
}
