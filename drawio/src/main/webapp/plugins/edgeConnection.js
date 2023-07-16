/**
 * Plugin that always creates a small black circle to represent a join
 * when a new edge is dropped with the target end in free space
 */
Draw.loadPlugin(function(ui) {
	mxConnectionHandler.prototype.createTargetVertex = function(evt, source)
	{
		// Uses the first non-relative source
		var geo = this.graph.getCellGeometry(source);
		
		while (geo != null && geo.relative)
		{
			source = this.graph.getModel().getParent(source);
			geo = this.graph.getCellGeometry(source);
		}
		
		// OVERRIDE clone to create a big filled black circle instead of cloning the source
		var clone = this.graph.createVertex(this.graph.getModel().getParent(source), null, null, 0, 0, 6, 6, 'ellipse;fillColor=#000000;fixedPoints=0');
		var geo = this.graph.getModel().getGeometry(clone);
		
		if (geo != null)
		{
			var point = this.graph.getPointForEvent(evt);
			geo.x = this.graph.snap(point.x - geo.width / 2) - this.graph.panDx / this.graph.view.scale;
			geo.y = this.graph.snap(point.y - geo.height / 2) - this.graph.panDy / this.graph.view.scale;
	
			// Aligns with source if within certain tolerance
			if (this.first != null)
			{
				var sourceState = this.graph.view.getState(source);
				
				if (sourceState != null)
				{
					var tol = this.getAlignmentTolerance();
	
					if (Math.abs(this.graph.snap(this.first.x) -
						this.graph.snap(point.x)) <= tol)
					{
						geo.x = sourceState.x;
					}
					else if (Math.abs(this.graph.snap(this.first.y) -
							this.graph.snap(point.y)) <= tol)
					{
						geo.y = sourceState.y;
					}
				}
			}
		}
	
		return clone;		
	};
});