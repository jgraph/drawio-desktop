(function()
{
	Sidebar.prototype.addCiscoPalette = function(cisco, dir)
	{
		for (var i = 0; i < cisco.length; i++)
		{
			this.setCurrentSearchEntryLibrary('cisco', 'cisco' + cisco[i]);
			this.addStencilPalette('cisco' + cisco[i], 'Cisco / ' + cisco[i],
				dir + '/cisco/' + cisco[i].toLowerCase().replace(/ /g, '_') + '.xml',
				';sketch=0;html=1;pointerEvents=1;dashed=0;fillColor=#036897;strokeColor=#ffffff;strokeWidth=2;verticalLabelPosition=bottom;verticalAlign=top;align=center;outlineConnect=0;',
				null, null, 1.6, null, null, 'cisco');
		}
		
		this.setCurrentSearchEntryLibrary();
	};
	
})();
