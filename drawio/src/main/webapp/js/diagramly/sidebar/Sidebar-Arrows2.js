(function()
{
	// Adds Arrow shapes with control points
	Sidebar.prototype.addArrows2Palette = function()
	{
		var s = 'html=1;shadow=0;dashed=0;align=center;verticalAlign=middle;shape=mxgraph.arrows2.';
		var s2 = 'html=1;shadow=0;dashed=0;fillColor=none;strokeColor=none;shape=mxgraph.arrows2.';
		var gn = 'mxgraph.arrows2';
		var dt = 'arrow ';
		var sb = this;
		this.setCurrentSearchEntryLibrary('arrows2');
		
		var fns = [
			this.createVertexTemplateEntry(s + 'arrow;dy=0.6;dx=40;notch=0;', 
					100, 70, '', 'Arrow Right', null, null, this.getTagsForStencil(gn, 'arrow', dt + 'right').join(' ')),
			this.createVertexTemplateEntry(s + 'arrow;dy=0.6;dx=40;flipH=1;notch=0;', 
					100, 70, '', 'Arrow Left', null, null, this.getTagsForStencil(gn, 'arrow', dt + 'left').join(' ')),
			this.createVertexTemplateEntry(s + 'arrow;dy=0.6;dx=40;direction=north;notch=0;', 
					70, 100, '', 'Arrow Up', null, null, this.getTagsForStencil(gn, 'arrow', dt + 'up').join(' ')),
			this.createVertexTemplateEntry(s + 'arrow;dy=0.6;dx=40;direction=south;notch=0;', 
					70, 100, '', 'Arrow Down', null, null, this.getTagsForStencil(gn, 'arrow', dt + 'down').join(' ')),
			this.createVertexTemplateEntry(s + 'arrow;dy=0;dx=30;notch=30;', 
					100, 60, '', 'Chevron Arrow', null, null, this.getTagsForStencil(gn, 'arrow', dt + 'chevron').join(' ')),
			this.createVertexTemplateEntry(s + 'arrow;dy=0.6;dx=40;notch=15;', 
					100, 70, '', 'Notched Arrow', null, null, this.getTagsForStencil(gn, 'arrow', dt + 'notched').join(' ')),
			this.createVertexTemplateEntry(s + 'arrow;dy=0;dx=10;notch=10;', 
					100, 30, '', 'Notched Signal-In Arrow', null, null, this.getTagsForStencil(gn, 'arrow', dt + 'notched signal in').join(' ')),
			this.createVertexTemplateEntry(s + 'arrow;dy=0;dx=10;notch=0;', 
					100, 30, '', 'Signal-In Arrow', null, null, this.getTagsForStencil(gn, 'arrow', dt + 'signal in').join(' ')),
			this.createVertexTemplateEntry(s + 'arrow;dy=0.67;dx=20;notch=0;', 
					100, 60, '', 'Slender Arrow', null, null, this.getTagsForStencil(gn, 'arrow', dt + 'slender').join(' ')),
			this.createVertexTemplateEntry(s + 'twoWayArrow;dy=0.6;dx=35;', 
					100, 60, '', 'Two Way Arrow', null, null, this.getTagsForStencil(gn, 'arrow', dt + 'two way').join(' ')),
			this.createVertexTemplateEntry(s + 'twoWayArrow;dy=0.65;dx=22;', 
					100, 60, '', 'Slender Two Way Arrow', null, null, this.getTagsForStencil(gn, 'arrow', dt + 'slender two way').join(' ')),
			this.createVertexTemplateEntry(s + 'stylisedArrow;dy=0.6;dx=40;notch=15;feather=0.4;', 
					100, 60, '', 'Stylised Arrow', null, null, this.getTagsForStencil(gn, 'arrow', dt + 'stylised notch notched').join(' ')),
			this.createVertexTemplateEntry(s + 'sharpArrow;dy1=0.67;dx1=18;dx2=18;notch=0;', 
					100, 60, '', 'Sharp Arrow', null, null, this.getTagsForStencil(gn, 'arrow', dt + 'sharp').join(' ')),
			this.createVertexTemplateEntry(s + 'sharpArrow2;dy1=0.67;dx1=18;dx2=18;dy3=0.15;dx3=27;notch=0;', 
					100, 60, '', 'Sharp Arrow', null, null, this.getTagsForStencil(gn, 'arrow', dt + 'sharp').join(' ')),
			this.createVertexTemplateEntry(s + 'calloutArrow;dy=10;dx=20;notch=60;arrowHead=10;', 
					100, 60, '', 'Callout with Arrow', null, null, this.getTagsForStencil(gn, 'arrow', dt + 'callout').join(' ')),
			this.createVertexTemplateEntry(s + 'bendArrow;dy=15;dx=38;notch=0;arrowHead=55;rounded=0;', 
					100, 100, '', 'Bend Arrow', null, null, this.getTagsForStencil(gn, 'arrow', dt + 'bend').join(' ')),
			this.createVertexTemplateEntry(s + 'bendArrow;dy=15;dx=38;notch=0;arrowHead=55;rounded=1;', 
					100, 100, '', 'Bend Arrow (rounded)', null, null, this.getTagsForStencil(gn, 'arrow', dt + 'bend rounded').join(' ')),
			this.createVertexTemplateEntry(s + 'bendDoubleArrow;dy=15;dx=38;arrowHead=55;rounded=0;', 
					100, 100, '', 'Bend Double Arrow', null, null, this.getTagsForStencil(gn, 'arrow', dt + 'bend double two way').join(' ')),
			this.createVertexTemplateEntry(s + 'bendDoubleArrow;dy=15;dx=38;arrowHead=55;rounded=1;', 
					100, 100, '', 'Bend Double Arrow', null, null, this.getTagsForStencil(gn, 'arrow', dt + 'bend double two way').join(' ')),
			this.createVertexTemplateEntry(s + 'calloutDoubleArrow;dy=10;dx=20;notch=24;arrowHead=10;', 
					100, 50, '', 'Callout with Double Arrow', null, null, this.getTagsForStencil(gn, 'arrow', dt + 'callout double two way').join(' ')),
			this.createVertexTemplateEntry(s + 'calloutQuadArrow;dy=10;dx=20;notch=24;arrowHead=10;', 
					100, 100, '', 'Callout with Quad Arrow', null, null, this.getTagsForStencil(gn, 'arrow', dt + 'callout quad four war').join(' ')),
			this.createVertexTemplateEntry(s + 'calloutDouble90Arrow;dy1=10;dx1=20;dx2=70;dy2=70;arrowHead=10;', 
					100, 100, '', 'Callout with Double Arrow 90' + String.fromCharCode(176), null, null, this.getTagsForStencil(gn, 'arrow', dt + 'callout double two way orthogonal').join(' ')),
			this.createVertexTemplateEntry(s + 'quadArrow;dy=10;dx=20;notch=24;arrowHead=10;', 
					100, 100, '', 'Quad Arrow', null, null, this.getTagsForStencil(gn, 'arrow', dt + 'four way quad').join(' ')),
			this.createVertexTemplateEntry(s + 'triadArrow;dy=10;dx=20;arrowHead=40;', 
					100, 70, '', 'Triad Arrow', null, null, this.getTagsForStencil(gn, 'arrow', dt + 'three way triad').join(' ')),
			this.createVertexTemplateEntry(s + 'tailedArrow;dy1=10;dx1=20;notch=0;arrowHead=20;dx2=25;dy2=30;', 
					100, 60, '', 'Tailed Arrow', null, null, this.getTagsForStencil(gn, 'arrow', dt + 'tailed').join(' ')),
			this.createVertexTemplateEntry(s + 'tailedNotchedArrow;dy1=10;dx1=20;notch=20;arrowHead=20;dx2=25;dy2=30;', 
					100, 60, '', 'Tailed Arrow with Notch', null, null, this.getTagsForStencil(gn, 'arrow', dt + 'tailed notch notched').join(' ')),
			this.createVertexTemplateEntry(s + 'stripedArrow;dy=0.6;dx=40;notch=25;', 
					100, 70, '', 'Striped Arrow', null, null, this.getTagsForStencil(gn, 'arrow', dt + 'striped').join(' ')),
			this.createVertexTemplateEntry(s + 'jumpInArrow;dy=15;dx=38;arrowHead=55;', 
					100, 100, '', 'Jump-In Arrow', null, null, this.getTagsForStencil(gn, 'arrow', dt + 'jump in').join(' ')),
			this.createVertexTemplateEntry(s + 'uTurnArrow;dy=11;arrowHead=43;dx2=25;', 
					100, 100, '', 'U Turn Arrow', null, null, this.getTagsForStencil(gn, 'arrow', dt + 'u turn uturn').join(' ')),
		    this.createEdgeTemplateEntry('shape=mxgraph.arrows2.wedgeArrow;html=1;bendable=0;startWidth=50;fillColor=strokeColor;defaultFillColor=invert;defaultGradientColor=invert;', 100, 100, '', 'Wedge Arrow', null, this.getTagsForStencil(gn, 'wedge arrow', dt).join(' ')),
		    this.createEdgeTemplateEntry('shape=mxgraph.arrows2.wedgeArrowDashed2;html=1;bendable=0;startWidth=50;stepSize=15;', 100, 100, '', 'Wedge Arrow Dashed', null, this.getTagsForStencil(gn, 'wedge arrow dashed', dt).join(' '))
		];
			   	
   		this.addPalette('arrows2', mxResources.get('arrows'), false, mxUtils.bind(this, function(content)
	    {
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
   		
		this.setCurrentSearchEntryLibrary();
	};
	
})();
