if (urlParams['dev'] == '1')
{
	(function()
	{
		var graphGetTooltipForCell = Graph.prototype.getTooltipForCell;

		/**
		 * Overrides tooltips to show custom tooltip or metadata.
		 */
		Graph.prototype.getTooltipForCell = function(cell)
		{
			var tip = graphGetTooltipForCell.apply(this, arguments);
			var geo = this.getCellGeometry(cell);
			
			tip += ((tip.length > 0) ? '<br>' : '') + 'id=' + cell.id + '<br>';
			
			if (geo != null)
			{
				if (geo.sourcePoint != null)
				{
					tip += 'source=' + parseFloat(geo.sourcePoint.x) + ',' + parseFloat(geo.sourcePoint.y) + '<br>';
				}
				
				if (geo.targetPoint != null)
				{
					tip += 'target=' + parseFloat(geo.targetPoint.x) + ',' + parseFloat(geo.targetPoint.y) + '<br>';
				}
				
				var state = this.view.getState(cell);
				
				if (state != null && state.absolutePoints != null)
				{
					tip += 'abspoints(' + state.absolutePoints.length + ')=';
					
					for (var i = 0; i < state.absolutePoints.length; i++)
					{
						tip += parseFloat(state.absolutePoints[i].x) + ',' + parseFloat(state.absolutePoints[i].y) + ';';
					}
					
					tip += '<br>';
					
					if (geo.points != null)
					{
						tip += 'points(' + geo.points.length + ')=';
						
						for (var i = 0; i < geo.points.length; i++)
						{
							tip += parseFloat(geo.points[i].x) + ',' + parseFloat(geo.points[i].y) + ';';
						}
					}
				}
				else
				{
//					tip += 'pos=' + this.view.formatUnitText(parseFloat(geo.x)) + ',' + this.view.formatUnitText(parseFloat(geo.y)) + '<br>' +
//						'size=' + this.view.formatUnitText(parseFloat(geo.width)) + 'x' + this.view.formatUnitText(parseFloat(geo.height));
					tip += 'x/y=' + parseFloat(geo.x) + ',' + parseFloat(geo.y) + '<br>' +
						'w/h=' + parseFloat(geo.width) + 'x' + parseFloat(geo.height);
					
					if (state != null)
					{
						tip += '<br>pos=' + parseFloat(state.x) + ',' + parseFloat(state.y) + '<br>' +
							'size=' + parseFloat(state.width) + 'x' + parseFloat(state.height);
					}
				}
				
				if (cell.style != null)
				{
					tip += '<br>style=<div style="display:inline-block;vertical-align:bottom;white-space:nowrap;width:480px;overflow:hidden;text-overflow:ellipsis;">' + cell.style + '</span>';
				}
			}
			
			return tip;
		};
	})();
}
