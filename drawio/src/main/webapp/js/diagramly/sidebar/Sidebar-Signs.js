(function()
{
	Sidebar.prototype.addSignsPalette = function(signs, dir)
	{
		for (var i = 0; i < signs.length; i++)
		{
			this.setCurrentSearchEntryLibrary('signs', 'signs' + signs[i]);
			this.addStencilPalette('signs' + signs[i], 'Signs / ' + signs[i],
				dir + '/signs/' + signs[i].toLowerCase() + '.xml',
				';html=1;pointerEvents=1;fillColor=#000000;strokeColor=none;verticalLabelPosition=bottom;verticalAlign=top;align=center;sketch=0;',	
				null, null, null, null, null, 'signs');
		}

		this.setCurrentSearchEntryLibrary();
	};
	
})();
