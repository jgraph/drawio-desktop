(function()
{
	// Adds Bootstrap shapes
	Sidebar.prototype.addBootstrapPalette = function()
	{
		var s = 'html=1;shadow=0;dashed=0;shape=mxgraph.bootstrap.';
		var s2 = 'html=1;shadow=0;dashed=0;fillColor=none;strokeColor=none;shape=mxgraph.bootstrap.rect;';
		var inh = 'strokeColor=inherit;fillColor=inherit;gradientColor=inherit;fontColor=inherit;';
		var gn = 'mxgraph.bootstrap';
		var dt = 'bootstrap ';
		var sb = this;
		this.setCurrentSearchEntryLibrary('bootstrap');
		
		var fns = [
			this.createVertexTemplateEntry(s + 'rrect;rSize=5;strokeColor=#B8DCFE;strokeWidth=1;fillColor=#CCE7FE;fontColor=#004583;whiteSpace=wrap;align=left;verticalAlign=middle;spacingLeft=10;', 
					800, 40, 'A simple primary alert!', 'Alert', null, null, this.getTagsForStencil(gn, 'alert', dt + 'alert').join(' ')),
			this.createVertexTemplateEntry(s + 'rrect;rSize=5;strokeColor=#D6D8DB;strokeWidth=1;fillColor=#E2E3E5;fontColor=#383D41;whiteSpace=wrap;align=left;verticalAlign=middle;spacingLeft=10;', 
					800, 40, 'A simple secondary alert!', 'Alert', null, null, this.getTagsForStencil(gn, 'alert', dt + 'alert').join(' ')),
			this.createVertexTemplateEntry(s + 'rrect;rSize=5;strokeColor=none;strokeWidth=1;fillColor=#E0F0D6;fontColor=#59B958;whiteSpace=wrap;align=left;verticalAlign=middle;spacingLeft=10;', 
					800, 40, 'A simple success alert!', 'Alert', null, null, this.getTagsForStencil(gn, 'alert', dt + 'alert').join(' ')),
			this.createVertexTemplateEntry(s + 'rrect;rSize=5;strokeColor=#F4C5CB;strokeWidth=1;fillColor=#F8D6DA;fontColor=#711623;whiteSpace=wrap;align=left;verticalAlign=middle;spacingLeft=10;', 
					800, 40, 'A simple danger alert!', 'Alert', null, null, this.getTagsForStencil(gn, 'alert', dt + 'alert').join(' ')),
			this.createVertexTemplateEntry(s + 'rrect;rSize=5;strokeColor=#FFECBC;strokeWidth=1;fillColor=#FFF1CF;fontColor=#856110;whiteSpace=wrap;align=left;verticalAlign=middle;spacingLeft=10;', 
					800, 40, 'A simple warning alert!', 'Alert', null, null, this.getTagsForStencil(gn, 'alert', dt + 'alert').join(' ')),
			this.createVertexTemplateEntry(s + 'rrect;rSize=5;strokeColor=#BFE6EB;strokeWidth=1;fillColor=#D1EDF1;fontColor=#0E5560;whiteSpace=wrap;align=left;verticalAlign=middle;spacingLeft=10;', 
					800, 40, 'A simple info alert!', 'Alert', null, null, this.getTagsForStencil(gn, 'alert', dt + 'alert').join(' ')),
			this.createVertexTemplateEntry(s + 'rrect;rSize=5;strokeColor=#FDFDFE;strokeWidth=1;fillColor=#FEFEFE;fontColor=#818182;whiteSpace=wrap;align=left;verticalAlign=middle;spacingLeft=10;', 
					800, 40, 'A simple light alert!', 'Alert', null, null, this.getTagsForStencil(gn, 'alert', dt + 'alert').join(' ')),
			this.createVertexTemplateEntry(s + 'rrect;rSize=5;strokeColor=#C6C8CA;strokeWidth=1;fillColor=#D6D8D9;fontColor=#1B1E21;whiteSpace=wrap;align=left;verticalAlign=middle;spacingLeft=10;', 
					800, 40, 'A simple dark alert!', 'Alert', null, null, this.getTagsForStencil(gn, 'alert', dt + 'alert').join(' ')),
					
			this.createVertexTemplateEntry(s + 'rrect;rSize=5;strokeColor=none;strokeWidth=1;fillColor=#E0F0D6;fontColor=#59B958;whiteSpace=wrap;align=left;verticalAlign=middle;spacing=20;', 
					800, 210, 
						'<font size="1"><b style="font-size: 18px">Title</b></font><br><br><font style="font-size: 14px"><span style="font-family: &quot;open sans&quot; , &quot;arial&quot; , sans-serif ; text-align: justify">' + 
						'<font style="font-size: 14px">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ' + 
						'ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt ' + 
						'in culpa qui officia deserunt mollit anim id est laborum.</font></span><br><br></font><hr style="border: 1px solid rgb(89 , 185 , 88); font-size: 14px"><font style="font-size: 14px"><br>' + 
						'<span style="font-family: &quot;open sans&quot; , &quot;arial&quot; , sans-serif ; text-align: justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ' + 
						'dolore magna aliqua.</span></font>', 
					'Alert', null, null, this.getTagsForStencil(gn, 'alert', dt + 'alert').join(' ')),
					
			this.createVertexTemplateEntry(s + 'rrect;rSize=5;strokeColor=none;strokeWidth=1;fillColor=#6C767D;fontColor=#FFFFFF;whiteSpace=wrap;align=left;verticalAlign=middle;spacingLeft=10;fontStyle=1;fontSize=18;', 
					60, 40, 'New', 'Badge', null, null, this.getTagsForStencil(gn, 'badge', dt + 'badge').join(' ')),
					
		   	this.addEntry(dt + 'alert', function()
		   	{
			   	var bg = new mxCell(
			   			'Notifications', 
			   			new mxGeometry(0, 0, 130, 40), s + 'rrect;rSize=5;strokeColor=none;strokeWidth=1;fillColor=#0085FC;fontColor=#FFFFFF;whiteSpace=wrap;align=left;verticalAlign=middle;spacingLeft=10;fontStyle=0;fontSize=14;');
			   	bg.vertex = true;
			   	
			   	var button1 = new mxCell('4', new mxGeometry(1, 0.5, 20, 20), s + 'rrect;rSize=5;strokeColor=none;strokeWidth=1;fillColor=#ffffff;fontColor=#000000;whiteSpace=wrap;align=center;verticalAlign=middle;fontSize=12;');
			   	button1.geometry.relative = true;
			   	button1.geometry.offset = new mxPoint(-30, -10);
			   	button1.vertex = true;
			   	bg.insert(button1);
			    
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Badge');
			}),
	
			this.createVertexTemplateEntry(s + 'rrect;rSize=5;strokeColor=none;strokeWidth=1;fillColor=#0085FC;fontColor=#FFFFFF;whiteSpace=wrap;align=left;verticalAlign=middle;spacingLeft=0;fontStyle=1;fontSize=14;spacing=5;', 
					60, 20, 'Primary', 'Badge, primary', null, null, this.getTagsForStencil(gn, 'badge', dt + 'badge primary').join(' ')),
			this.createVertexTemplateEntry(s + 'rrect;rSize=5;strokeColor=none;strokeWidth=1;fillColor=#6C767D;fontColor=#FFFFFF;whiteSpace=wrap;align=left;verticalAlign=middle;spacingLeft=0;fontStyle=1;fontSize=14;spacing=5;', 
					80, 20, 'Secondary', 'Badge, secondary', null, null, this.getTagsForStencil(gn, 'badge', dt + 'badge secondary').join(' ')),
			this.createVertexTemplateEntry(s + 'rrect;rSize=5;strokeColor=none;strokeWidth=1;fillColor=#33A64C;fontColor=#FFFFFF;whiteSpace=wrap;align=left;verticalAlign=middle;spacingLeft=0;fontStyle=1;fontSize=14;spacing=5;', 
					65, 20, 'Success', 'Badge, success', null, null, this.getTagsForStencil(gn, 'badge', dt + 'badge success').join(' ')),
			this.createVertexTemplateEntry(s + 'rrect;rSize=5;strokeColor=none;strokeWidth=1;fillColor=#DB2843;fontColor=#FFFFFF;whiteSpace=wrap;align=left;verticalAlign=middle;spacingLeft=0;fontStyle=1;fontSize=14;spacing=5;', 
					60, 20, 'Danger', 'Badge, danger', null, null, this.getTagsForStencil(gn, 'badge', dt + 'badge danger').join(' ')),
			this.createVertexTemplateEntry(s + 'rrect;rSize=5;strokeColor=none;strokeWidth=1;fillColor=#FFBC26;fontColor=#000000;whiteSpace=wrap;align=left;verticalAlign=middle;spacingLeft=0;fontStyle=1;fontSize=14;spacing=5;', 
					65, 20, 'Warning', 'Badge, warning', null, null, this.getTagsForStencil(gn, 'badge', dt + 'badge warning').join(' ')),
			this.createVertexTemplateEntry(s + 'rrect;rSize=5;strokeColor=none;strokeWidth=1;fillColor=#1CA5B8;fontColor=#FFFFFF;whiteSpace=wrap;align=left;verticalAlign=middle;spacingLeft=0;fontStyle=1;fontSize=14;spacing=5;', 
					35, 20, 'Info', 'Badge, info', null, null, this.getTagsForStencil(gn, 'badge', dt + 'badge info').join(' ')),
			this.createVertexTemplateEntry(s + 'rrect;rSize=5;strokeColor=none;strokeWidth=1;fillColor=#F8F9FA;fontColor=#000000;whiteSpace=wrap;align=left;verticalAlign=middle;spacingLeft=0;fontStyle=1;fontSize=14;spacing=5;', 
					45, 20, 'Light', 'Badge, light', null, null, this.getTagsForStencil(gn, 'badge', dt + 'badge light').join(' ')),
			this.createVertexTemplateEntry(s + 'rrect;rSize=5;strokeColor=none;strokeWidth=1;fillColor=#343A40;fontColor=#FFFFFF;whiteSpace=wrap;align=left;verticalAlign=middle;spacingLeft=0;fontStyle=1;fontSize=14;spacing=5;', 
					40, 20, 'Dark', 'Badge, dark', null, null, this.getTagsForStencil(gn, 'badge', dt + 'badge dark').join(' ')),
					
			this.createVertexTemplateEntry('rounded=1;whiteSpace=wrap;html=1;arcSize=50;strokeColor=none;strokeWidth=1;fillColor=#0085FC;fontColor=#FFFFFF;whiteSpace=wrap;align=left;verticalAlign=middle;spacingLeft=0;fontStyle=1;fontSize=14;spacing=10;', 
					70, 20, 'Primary', 'Pill badge, primary', null, null, this.getTagsForStencil(gn, 'badge', dt + 'pill badge primary').join(' ')),
			this.createVertexTemplateEntry('rounded=1;whiteSpace=wrap;html=1;arcSize=50;strokeColor=none;strokeWidth=1;fillColor=#6C767D;fontColor=#FFFFFF;whiteSpace=wrap;align=left;verticalAlign=middle;spacingLeft=0;fontStyle=1;fontSize=14;spacing=10;', 
					90, 20, 'Secondary', 'Pill badge, secondary', null, null, this.getTagsForStencil(gn, 'badge', dt + 'pill badge secondary').join(' ')),
			this.createVertexTemplateEntry('rounded=1;whiteSpace=wrap;html=1;arcSize=50;strokeColor=none;strokeWidth=1;fillColor=#33A64C;fontColor=#FFFFFF;whiteSpace=wrap;align=left;verticalAlign=middle;spacingLeft=0;fontStyle=1;fontSize=14;spacing=10;', 
					75, 20, 'Success', 'Pill badge, success', null, null, this.getTagsForStencil(gn, 'badge', dt + 'pill badge success').join(' ')),
			this.createVertexTemplateEntry('rounded=1;whiteSpace=wrap;html=1;arcSize=50;strokeColor=none;strokeWidth=1;fillColor=#DB2843;fontColor=#FFFFFF;whiteSpace=wrap;align=left;verticalAlign=middle;spacingLeft=0;fontStyle=1;fontSize=14;spacing=10;', 
					65, 20, 'Danger', 'Pill badge, danger', null, null, this.getTagsForStencil(gn, 'badge', dt + 'pill badge danger').join(' ')),
			this.createVertexTemplateEntry('rounded=1;whiteSpace=wrap;html=1;arcSize=50;strokeColor=none;strokeWidth=1;fillColor=#FFBC26;fontColor=#000000;whiteSpace=wrap;align=left;verticalAlign=middle;spacingLeft=0;fontStyle=1;fontSize=14;spacing=10;', 
					75, 20, 'Warning', 'Pill badge, warning', null, null, this.getTagsForStencil(gn, 'badge', dt + 'pill badge warning').join(' ')),
			this.createVertexTemplateEntry('rounded=1;whiteSpace=wrap;html=1;arcSize=50;strokeColor=none;strokeWidth=1;fillColor=#1CA5B8;fontColor=#ffffff;whiteSpace=wrap;align=left;verticalAlign=middle;spacingLeft=0;fontStyle=1;fontSize=14;spacing=10;', 
					45, 20, 'Info', 'Pill badge, info', null, null, this.getTagsForStencil(gn, 'badge', dt + 'pill badge info').join(' ')),
			this.createVertexTemplateEntry('rounded=1;whiteSpace=wrap;html=1;arcSize=50;strokeColor=none;strokeWidth=1;fillColor=#F8F9FA;fontColor=#000000;whiteSpace=wrap;align=left;verticalAlign=middle;spacingLeft=0;fontStyle=1;fontSize=14;spacing=10;', 
					55, 20, 'Light', 'Pill badge, light', null, null, this.getTagsForStencil(gn, 'badge', dt + 'pill badge light').join(' ')),
			this.createVertexTemplateEntry('rounded=1;whiteSpace=wrap;html=1;arcSize=50;strokeColor=none;strokeWidth=1;fillColor=#343A40;fontColor=#ffffff;whiteSpace=wrap;align=left;verticalAlign=middle;spacingLeft=0;fontStyle=1;fontSize=14;spacing=10;', 
					50, 20, 'Dark', 'Pill badge, dark', null, null, this.getTagsForStencil(gn, 'badge', dt + 'pill badge dark').join(' ')),

			this.createVertexTemplateEntry(s + 'rrect;rSize=5;strokeColor=none;strokeWidth=1;fillColor=#E9ECEF;fontColor=#6C757D;whiteSpace=wrap;align=left;verticalAlign=middle;spacingLeft=0;fontStyle=0;fontSize=14;spacing=10;', 
					800, 40, 'Home', 'Breadcrumb, one level', null, null, this.getTagsForStencil(gn, 'breadcrumb', dt + 'breadcrumb one level').join(' ')),
			this.createVertexTemplateEntry(s + 'rrect;rSize=5;strokeColor=none;strokeWidth=1;fillColor=#E9ECEF;fontColor=#6C757D;whiteSpace=wrap;align=left;verticalAlign=middle;spacingLeft=0;fontStyle=0;fontSize=14;spacing=10;', 
					800, 40, '<font color="#0085fc">Home</font> / Library', 'Breadcrumb, two level', null, null, this.getTagsForStencil(gn, 'breadcrumb', dt + 'breadcrumb two level').join(' ')),
			this.createVertexTemplateEntry(s + 'rrect;rSize=5;strokeColor=none;strokeWidth=1;fillColor=#E9ECEF;fontColor=#6C757D;whiteSpace=wrap;align=left;verticalAlign=middle;spacingLeft=0;fontStyle=0;fontSize=14;spacing=10;', 
					800, 40, '<font color="#0085fc">Home</font> / <font color="#0085fc">Library</font> / Data', 'Breadcrumb, three level', null, null, this.getTagsForStencil(gn, 'breadcrumb', dt + 'breadcrumb three level').join(' ')),

			this.createVertexTemplateEntry(s + 'rrect;rSize=5;strokeColor=none;strokeWidth=1;fillColor=#0085FC;fontColor=#FFFFFF;whiteSpace=wrap;align=center;verticalAlign=middle;spacingLeft=0;fontStyle=0;fontSize=16;spacing=5;', 
					80, 40, 'Primary', 'Button, primary', null, null, this.getTagsForStencil(gn, 'button', dt + 'button primary').join(' ')),
			this.createVertexTemplateEntry(s + 'rrect;rSize=5;strokeColor=none;strokeWidth=1;fillColor=#6C767D;fontColor=#FFFFFF;whiteSpace=wrap;align=center;verticalAlign=middle;spacingLeft=0;fontStyle=0;fontSize=16;spacing=5;', 
					100, 40, 'Secondary', 'Button, secondary', null, null, this.getTagsForStencil(gn, 'button', dt + 'button secondary').join(' ')),
			this.createVertexTemplateEntry(s + 'rrect;rSize=5;strokeColor=none;strokeWidth=1;fillColor=#33A64C;fontColor=#FFFFFF;whiteSpace=wrap;align=center;verticalAlign=middle;spacingLeft=0;fontStyle=0;fontSize=16;spacing=5;', 
					90, 40, 'Success', 'Button, success', null, null, this.getTagsForStencil(gn, 'button', dt + 'button success').join(' ')),
			this.createVertexTemplateEntry(s + 'rrect;rSize=5;strokeColor=none;strokeWidth=1;fillColor=#DB2843;fontColor=#FFFFFF;whiteSpace=wrap;align=center;verticalAlign=middle;spacingLeft=0;fontStyle=0;fontSize=16;spacing=5;', 
					80, 40, 'Danger', 'Button, danger', null, null, this.getTagsForStencil(gn, 'button', dt + 'button danger').join(' ')),
			this.createVertexTemplateEntry(s + 'rrect;rSize=5;strokeColor=none;strokeWidth=1;fillColor=#FFBC26;fontColor=#FFFFFF;whiteSpace=wrap;align=center;verticalAlign=middle;spacingLeft=0;fontStyle=0;fontSize=16;spacing=5;', 
					90, 40, 'Warning', 'Button, warning', null, null, this.getTagsForStencil(gn, 'button', dt + 'button warning').join(' ')),
			this.createVertexTemplateEntry(s + 'rrect;rSize=5;strokeColor=none;strokeWidth=1;fillColor=#1CA5B8;fontColor=#FFFFFF;whiteSpace=wrap;align=center;verticalAlign=middle;spacingLeft=0;fontStyle=0;fontSize=16;spacing=5;', 
					50, 40, 'Info', 'Button, info', null, null, this.getTagsForStencil(gn, 'button', dt + 'button info').join(' ')),
			this.createVertexTemplateEntry(s + 'rrect;rSize=5;strokeColor=none;strokeWidth=1;fillColor=#F8F9FA;fontColor=#000000;whiteSpace=wrap;align=center;verticalAlign=middle;spacingLeft=0;fontStyle=0;fontSize=16;spacing=5;', 
					60, 40, 'Light', 'Button, light', null, null, this.getTagsForStencil(gn, 'button', dt + 'button light').join(' ')),
			this.createVertexTemplateEntry(s + 'rrect;rSize=5;strokeColor=none;strokeWidth=1;fillColor=#343A40;fontColor=#ffffff;whiteSpace=wrap;align=center;verticalAlign=middle;spacingLeft=0;fontStyle=0;fontSize=16;spacing=5;', 
					60, 40, 'Dark', 'Button, dark', null, null, this.getTagsForStencil(gn, 'button', dt + 'button dark').join(' ')),
			this.createVertexTemplateEntry(s + 'rrect;rSize=5;strokeColor=none;strokeWidth=1;fillColor=none;fontColor=#0085FC;whiteSpace=wrap;align=center;verticalAlign=middle;spacingLeft=0;fontStyle=0;fontSize=16;spacing=5;', 
					60, 40, 'Link', 'Button, link', null, null, this.getTagsForStencil(gn, 'button', dt + 'button link').join(' ')),
					
			this.createVertexTemplateEntry(s + 'rrect;rSize=5;strokeColor=#0085FC;strokeWidth=1;fillColor=none;fontColor=#0085FC;whiteSpace=wrap;align=center;verticalAlign=middle;spacingLeft=0;fontStyle=0;fontSize=16;spacing=5;', 
					80, 40, 'Primary', 'Button, primary', null, null, this.getTagsForStencil(gn, 'button', dt + 'button primary').join(' ')),
			this.createVertexTemplateEntry(s + 'rrect;rSize=5;strokeColor=#6C767D;strokeWidth=1;fillColor=none;fontColor=#6C767D;whiteSpace=wrap;align=center;verticalAlign=middle;spacingLeft=0;fontStyle=0;fontSize=16;spacing=5;', 
					100, 40, 'Secondary', 'Button, secondary', null, null, this.getTagsForStencil(gn, 'button', dt + 'button secondary').join(' ')),
			this.createVertexTemplateEntry(s + 'rrect;rSize=5;strokeColor=#33A64C;strokeWidth=1;fillColor=none;fontColor=#33A64C;whiteSpace=wrap;align=center;verticalAlign=middle;spacingLeft=0;fontStyle=0;fontSize=16;spacing=5;', 
					90, 40, 'Success', 'Button, success', null, null, this.getTagsForStencil(gn, 'button', dt + 'button success').join(' ')),
			this.createVertexTemplateEntry(s + 'rrect;rSize=5;strokeColor=#DB2843;strokeWidth=1;fillColor=none;fontColor=#DB2843;whiteSpace=wrap;align=center;verticalAlign=middle;spacingLeft=0;fontStyle=0;fontSize=16;spacing=5;', 
					80, 40, 'Danger', 'Button, danger', null, null, this.getTagsForStencil(gn, 'button', dt + 'button danger').join(' ')),
			this.createVertexTemplateEntry(s + 'rrect;rSize=5;strokeColor=#FFBC26;strokeWidth=1;fillColor=none;fontColor=#FFBC26;whiteSpace=wrap;align=center;verticalAlign=middle;spacingLeft=0;fontStyle=0;fontSize=16;spacing=5;', 
					90, 40, 'Warning', 'Button, warning', null, null, this.getTagsForStencil(gn, 'button', dt + 'button warning').join(' ')),
			this.createVertexTemplateEntry(s + 'rrect;rSize=5;strokeColor=#1CA5B8;strokeWidth=1;fillColor=none;fontColor=#1CA5B8;whiteSpace=wrap;align=center;verticalAlign=middle;spacingLeft=0;fontStyle=0;fontSize=16;spacing=5;', 
					50, 40, 'Info', 'Button, info', null, null, this.getTagsForStencil(gn, 'button', dt + 'button info').join(' ')),
			this.createVertexTemplateEntry(s + 'rrect;rSize=5;strokeColor=#F8F9FA;strokeWidth=1;fillColor=none;fontColor=#F8F9FA;whiteSpace=wrap;align=center;verticalAlign=middle;spacingLeft=0;fontStyle=0;fontSize=16;spacing=5;', 
					60, 40, 'Light', 'Button, light', null, null, this.getTagsForStencil(gn, 'button', dt + 'button light').join(' ')),
			this.createVertexTemplateEntry(s + 'rrect;rSize=5;strokeColor=#343A40;strokeWidth=1;fillColor=none;fontColor=#343A40;whiteSpace=wrap;align=center;verticalAlign=middle;spacingLeft=0;fontStyle=0;fontSize=16;spacing=5;', 
					60, 40, 'Dark', 'Button, dark', null, null, this.getTagsForStencil(gn, 'button', dt + 'button dark').join(' ')),
					
			this.createVertexTemplateEntry(s + 'rrect;rSize=5;strokeColor=none;strokeWidth=1;fillColor=#0085FC;fontColor=#FFFFFF;whiteSpace=wrap;align=center;verticalAlign=middle;spacingLeft=0;fontStyle=0;fontSize=16;spacing=5;', 
					800, 40, 'Block level button', 'Block level button', null, null, this.getTagsForStencil(gn, 'button', dt + 'button block level').join(' ')),
			this.createVertexTemplateEntry(s + 'rrect;rSize=5;strokeColor=none;strokeWidth=1;fillColor=#6C767D;fontColor=#FFFFFF;whiteSpace=wrap;align=center;verticalAlign=middle;spacingLeft=0;fontStyle=0;fontSize=16;spacing=5;', 
					800, 40, 'Block level button', 'Block level button', null, null, this.getTagsForStencil(gn, 'button', dt + 'button block level').join(' ')),
					
			this.addEntry(dt + 'button group horizontal', function()
	   		{
			   	var bg = new mxCell('', new mxGeometry(0, 0, 180, 30), s + 'rrect;rSize=5;strokeColor=none;html=1;whiteSpace=wrap;fillColor=#6C767D;fontColor=#ffffff;sketch=0;');
			   	bg.vertex = true;
			   	var button1 = new mxCell('Left', new mxGeometry(0, 0, 60, 30), inh + s + 'leftButton;rSize=5;perimeter=none;whiteSpace=wrap;resizeHeight=1;sketch=0;');
			   	button1.geometry.relative = true;
			   	button1.vertex = true;
			   	bg.insert(button1);
			   	var button2 = new mxCell('Middle', new mxGeometry(0, 0, 60, 30), inh + 'html=1;shadow=0;dashed=0;perimeter=none;whiteSpace=wrap;resizeHeight=1;sketch=0;');
			   	button2.geometry.relative = true;
			   	button2.geometry.offset = new mxPoint(60, 0);
			   	button2.vertex = true;
			   	bg.insert(button2);
			   	var button3 = new mxCell('Right', new mxGeometry(1, 0, 60, 30), inh + s + 'rightButton;rSize=5;perimeter=none;whiteSpace=wrap;resizeHeight=1;sketch=0;');
			   	button3.geometry.relative = true;
			   	button3.geometry.offset = new mxPoint(-60, 0);
			   	button3.vertex = true;
			   	bg.insert(button3);
				
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Button group, horizontal');
			}),
		    
			this.addEntry(dt + 'button group horizontal', function()
	   		{
			   	var bg1 = new mxCell('', new mxGeometry(0, 0, 120, 30), s + 'rrect;rSize=5;strokeColor=none;html=1;whiteSpace=wrap;fillColor=#6C767D;fontColor=#ffffff;sketch=0;');
			   	bg1.vertex = true;
			   	var button1 = new mxCell('1', new mxGeometry(0, 0, 30, 30), inh + s + 'leftButton;rSize=5;perimeter=none;whiteSpace=wrap;resizeHeight=1;sketch=0;');
			   	button1.geometry.relative = true;
			   	button1.vertex = true;
			   	bg1.insert(button1);
			   	var button2 = new mxCell('2', new mxGeometry(0, 0, 30, 30), inh + 'html=1;shadow=0;dashed=0;perimeter=none;whiteSpace=wrap;resizeHeight=1;sketch=0;');
			   	button2.geometry.relative = true;
			   	button2.geometry.offset = new mxPoint(30, 0);
			   	button2.vertex = true;
			   	bg1.insert(button2);
			   	var button3 = new mxCell('3', new mxGeometry(0, 0, 30, 30), inh + 'html=1;shadow=0;dashed=0;perimeter=none;whiteSpace=wrap;resizeHeight=1;sketch=0;');
			   	button3.geometry.relative = true;
			   	button3.geometry.offset = new mxPoint(60, 0);
			   	button3.vertex = true;
			   	bg1.insert(button3);
			   	var button4 = new mxCell('4', new mxGeometry(1, 0, 30, 30), inh + s + 'rightButton;rSize=5;perimeter=none;whiteSpace=wrap;resizeHeight=1;sketch=0;');
			   	button4.geometry.relative = true;
			   	button4.geometry.offset = new mxPoint(-30, 0);
			   	button4.vertex = true;
			   	bg1.insert(button4);
				
			   	var bg2 = new mxCell('', new mxGeometry(130, 0, 90, 30), s + 'rrect;rSize=5;strokeColor=none;html=1;whiteSpace=wrap;fillColor=#6C767D;fontColor=#ffffff;sketch=0;');
			   	bg2.vertex = true;
			   	var button1 = new mxCell('5', new mxGeometry(0, 0, 30, 30), inh + s + 'leftButton;rSize=5;perimeter=none;whiteSpace=wrap;resizeHeight=1;sketch=0;');
			   	button1.geometry.relative = true;
			   	button1.vertex = true;
			   	bg2.insert(button1);
			   	var button2 = new mxCell('6', new mxGeometry(0, 0, 30, 30), inh + 'html=1;shadow=0;dashed=0;perimeter=none;whiteSpace=wrap;resizeHeight=1;sketch=0;');
			   	button2.geometry.relative = true;
			   	button2.geometry.offset = new mxPoint(30, 0);
			   	button2.vertex = true;
			   	bg2.insert(button2);
			   	var button3 = new mxCell('7', new mxGeometry(1, 0, 30, 30), inh + s + 'rightButton;rSize=5;perimeter=none;whiteSpace=wrap;resizeHeight=1;sketch=0;');
			   	button3.geometry.relative = true;
			   	button3.geometry.offset = new mxPoint(-30, 0);
			   	button3.vertex = true;
			   	bg2.insert(button3);
				
			   	var bg3 = new mxCell('8', new mxGeometry(230, 0, 30, 30), s + 'rrect;rSize=5;strokeColor=none;html=1;whiteSpace=wrap;fillColor=#6C767D;fontColor=#ffffff;sketch=0;');
			   	bg3.vertex = true;
			   	
		   		return sb.createVertexTemplateFromCells([bg1, bg2, bg3], 260, 30, 'Button group, horizontal');
			}),
				    
			this.addEntry(dt + 'button group horizontal', function()
	   		{
			   	var bg1 = new mxCell('', new mxGeometry(0, 0, 120, 30), s + 'rrect;rSize=5;strokeColor=none;html=1;whiteSpace=wrap;fillColor=#6C767D;fontColor=#ffffff;sketch=0;');
			   	bg1.vertex = true;
			   	var button1 = new mxCell('1', new mxGeometry(0, 0, 30, 30), inh + s + 'leftButton;rSize=5;perimeter=none;whiteSpace=wrap;resizeHeight=1;sketch=0;');
			   	button1.geometry.relative = true;
			   	button1.vertex = true;
			   	bg1.insert(button1);
			   	var button2 = new mxCell('2', new mxGeometry(0, 0, 30, 30), inh + 'html=1;shadow=0;dashed=0;perimeter=none;whiteSpace=wrap;resizeHeight=1;sketch=0;');
			   	button2.geometry.relative = true;
			   	button2.geometry.offset = new mxPoint(30, 0);
			   	button2.vertex = true;
			   	bg1.insert(button2);
			   	var button3 = new mxCell('3', new mxGeometry(0, 0, 30, 30), inh + 'html=1;shadow=0;dashed=0;perimeter=none;whiteSpace=wrap;resizeHeight=1;sketch=0;');
			   	button3.geometry.relative = true;
			   	button3.geometry.offset = new mxPoint(60, 0);
			   	button3.vertex = true;
			   	bg1.insert(button3);
			   	var button4 = new mxCell('4', new mxGeometry(1, 0, 30, 30), inh + s + 'rightButton;rSize=5;perimeter=none;whiteSpace=wrap;resizeHeight=1;sketch=0;');
			   	button4.geometry.relative = true;
			   	button4.geometry.offset = new mxPoint(-30, 0);
			   	button4.vertex = true;
			   	bg1.insert(button4);
				
			   	var bg2 = new mxCell('Input Group Example', new mxGeometry(130, 0, 200, 30), s + 'rrect;rSize=5;strokeColor=#CED4DA;html=1;whiteSpace=wrap;fillColor=#FFFFFF;fontColor=#7D868C;align=left;spacingLeft=40;sketch=0;');
			   	bg2.vertex = true;
			   	var button1 = new mxCell('@', new mxGeometry(0, 0, 30, 30), s + 'leftButton;strokeColor=inherit;gradientColor=inherit;fontColor=inherit;fillColor=#E9ECEF;rSize=5;perimeter=none;whiteSpace=wrap;resizeHeight=1;sketch=0;');
			   	button1.geometry.relative = true;
			   	button1.vertex = true;
			   	bg2.insert(button1);
				
		   		return sb.createVertexTemplateFromCells([bg1, bg2], 230, 30, 'Button group, horizontal');
			}),
				    
			this.addEntry(dt + 'button group horizontal', function()
	   		{
			   	var bg1 = new mxCell('', new mxGeometry(0, 0, 150, 30), s + 'rrect;rSize=5;strokeColor=none;html=1;whiteSpace=wrap;fillColor=#6C767D;fontColor=#ffffff;sketch=0;');
			   	bg1.vertex = true;
			   	var button1 = new mxCell('1', new mxGeometry(0, 0, 30, 30), inh + s + 'leftButton;rSize=5;perimeter=none;whiteSpace=wrap;resizeHeight=1;sketch=0;');
			   	button1.geometry.relative = true;
			   	button1.vertex = true;
			   	bg1.insert(button1);
			   	var button2 = new mxCell('2', new mxGeometry(0, 0, 30, 30), inh + 'html=1;shadow=0;dashed=0;perimeter=none;whiteSpace=wrap;resizeHeight=1;sketch=0;');
			   	button2.geometry.relative = true;
			   	button2.geometry.offset = new mxPoint(30, 0);
			   	button2.vertex = true;
			   	bg1.insert(button2);
			   	var button4 = new mxCell('Dropdown', new mxGeometry(1, 0, 90, 30), inh + s + 'rightButton;rSize=5;perimeter=none;whiteSpace=wrap;resizeHeight=1;align=left;spacing=10;sketch=0;');
			   	button4.geometry.relative = true;
			   	button4.geometry.offset = new mxPoint(-90, 0);
			   	button4.vertex = true;
			   	bg1.insert(button4);
			   	var marker1 = new mxCell('', new mxGeometry(1, 0.5, 10, 5), 'shape=triangle;direction=south;fillColor=#ffffff;strokeColor=none;perimeter=none;sketch=0;');
			   	marker1.geometry.relative = true;
			   	marker1.geometry.offset = new mxPoint(-17, -2.5);
			   	marker1.vertex = true;
			   	button4.insert(marker1);

			   	return sb.createVertexTemplateFromCells([bg1], bg1.geometry.width, bg1.geometry.height, 'Button group, horizontal');
			}),
						    
			this.addEntry(dt + 'button group vertical', function()
	   		{
			   	var bg = new mxCell('', new mxGeometry(0, 0, 60, 180), s + 'rrect;rSize=5;strokeColor=none;html=1;whiteSpace=wrap;fillColor=#6C767D;fontColor=#ffffff;sketch=0;');
			   	bg.vertex = true;
			   	var button1 = new mxCell('Button', new mxGeometry(0, 0, 60, 30), inh + s + 'topButton;rSize=5;perimeter=none;whiteSpace=wrap;resizeWidth=1;sketch=0;');
			   	button1.geometry.relative = true;
			   	button1.vertex = true;
			   	bg.insert(button1);
			   	var button2 = new mxCell('Button', new mxGeometry(0, 0, 60, 30), inh + 'html=1;shadow=0;dashed=0;perimeter=none;whiteSpace=wrap;resizeWidth=1;sketch=0;');
			   	button2.geometry.relative = true;
			   	button2.geometry.offset = new mxPoint(0, 30);
			   	button2.vertex = true;
			   	bg.insert(button2);
			   	var button3 = new mxCell('Button', new mxGeometry(0, 0, 60, 30), inh + 'html=1;shadow=0;dashed=0;perimeter=none;whiteSpace=wrap;resizeWidth=1;sketch=0;');
			   	button3.geometry.relative = true;
			   	button3.geometry.offset = new mxPoint(0, 60);
			   	button3.vertex = true;
			   	bg.insert(button3);
			   	var button4 = new mxCell('Button', new mxGeometry(0, 0, 60, 30), inh + 'html=1;shadow=0;dashed=0;perimeter=none;whiteSpace=wrap;resizeWidth=1;sketch=0;');
			   	button4.geometry.relative = true;
			   	button4.geometry.offset = new mxPoint(0, 90);
			   	button4.vertex = true;
			   	bg.insert(button4);
			   	var button5 = new mxCell('Button', new mxGeometry(0, 0, 60, 30), inh + 'html=1;shadow=0;dashed=0;perimeter=none;whiteSpace=wrap;resizeWidth=1;sketch=0;');
			   	button5.geometry.relative = true;
			   	button5.geometry.offset = new mxPoint(0, 120);
			   	button5.vertex = true;
			   	bg.insert(button5);
			   	var button6 = new mxCell('Button', new mxGeometry(0, 1, 60, 30), inh + s + 'bottomButton;rSize=5;perimeter=none;whiteSpace=wrap;resizeWidth=1;resizeHeight=0;sketch=0;');
			   	button6.geometry.relative = true;
			   	button6.geometry.offset = new mxPoint(0, -30);
			   	button6.vertex = true;
			   	bg.insert(button6);
				
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Button group, vertical');
			}),
		    
			this.addEntry(dt + 'button group vertical', function()
	   		{
			   	var bg = new mxCell('', new mxGeometry(0, 0, 90, 180), s + 'rrect;rSize=5;strokeColor=none;html=1;whiteSpace=wrap;fillColor=#6C767D;fontColor=#ffffff;sketch=0;');
			   	bg.vertex = true;
			   	var button1 = new mxCell('Button', new mxGeometry(0, 0, 90, 30), inh + s + 'topButton;rSize=5;perimeter=none;whiteSpace=wrap;resizeWidth=1;sketch=0;');
			   	button1.geometry.relative = true;
			   	button1.vertex = true;
			   	bg.insert(button1);
			   	var button2 = new mxCell('Button', new mxGeometry(0, 0, 90, 30), inh + 'html=1;shadow=0;dashed=0;perimeter=none;whiteSpace=wrap;resizeWidth=1;sketch=0;');
			   	button2.geometry.relative = true;
			   	button2.geometry.offset = new mxPoint(0, 30);
			   	button2.vertex = true;
			   	bg.insert(button2);
			   	var button3 = new mxCell('Button', new mxGeometry(0, 0, 90, 30), inh + 'html=1;shadow=0;dashed=0;perimeter=none;whiteSpace=wrap;resizeWidth=1;sketch=0;');
			   	button3.geometry.relative = true;
			   	button3.geometry.offset = new mxPoint(0, 60);
			   	button3.vertex = true;
			   	bg.insert(button3);
			   	var button4 = new mxCell('Button', new mxGeometry(0, 0, 90, 30), inh + 'html=1;shadow=0;dashed=0;perimeter=none;whiteSpace=wrap;resizeWidth=1;sketch=0;');
			   	button4.geometry.relative = true;
			   	button4.geometry.offset = new mxPoint(0, 90);
			   	button4.vertex = true;
			   	bg.insert(button4);
			   	var button5 = new mxCell('Button', new mxGeometry(0, 0, 90, 30), inh + 'html=1;shadow=0;dashed=0;perimeter=none;whiteSpace=wrap;resizeWidth=1;sketch=0;');
			   	button5.geometry.relative = true;
			   	button5.geometry.offset = new mxPoint(0, 120);
			   	button5.vertex = true;
			   	bg.insert(button5);
			   	var button6 = new mxCell('Button', new mxGeometry(0, 1, 90, 30), inh + s + 'bottomButton;rSize=5;perimeter=none;whiteSpace=wrap;resizeWidth=1;resizeHeight=0;sketch=0;');
			   	button6.geometry.relative = true;
			   	button6.geometry.offset = new mxPoint(0, -30);
			   	button6.vertex = true;
			   	bg.insert(button6);
				
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Button group, vertical');
			}),
				    
			this.addEntry(dt + 'button group vertical', function()
	   		{
			   	var bg = new mxCell('', new mxGeometry(0, 0, 90, 180), s + 'rrect;rSize=5;strokeColor=none;html=1;whiteSpace=wrap;fillColor=#6C767D;fontColor=#ffffff;sketch=0;');
			   	bg.vertex = true;
			   	var button1 = new mxCell('Button', new mxGeometry(0, 0, 90, 30), inh + s + 'topButton;rSize=5;perimeter=none;whiteSpace=wrap;resizeWidth=1;sketch=0;');
			   	button1.geometry.relative = true;
			   	button1.vertex = true;
			   	bg.insert(button1);
			   	var button2 = new mxCell('Button', new mxGeometry(0, 0, 90, 30), inh + 'html=1;shadow=0;dashed=0;perimeter=none;whiteSpace=wrap;resizeWidth=1;sketch=0;');
			   	button2.geometry.relative = true;
			   	button2.geometry.offset = new mxPoint(0, 30);
			   	button2.vertex = true;
			   	bg.insert(button2);
			   	var button3 = new mxCell('Button', new mxGeometry(0, 0, 90, 30), inh + 'html=1;shadow=0;dashed=0;perimeter=none;whiteSpace=wrap;resizeWidth=1;sketch=0;');
			   	button3.geometry.relative = true;
			   	button3.geometry.offset = new mxPoint(0, 60);
			   	button3.vertex = true;
			   	bg.insert(button3);
			   	var button4 = new mxCell('Button', new mxGeometry(0, 0, 90, 30), inh + 'html=1;shadow=0;dashed=0;perimeter=none;whiteSpace=wrap;resizeWidth=1;sketch=0;');
			   	button4.geometry.relative = true;
			   	button4.geometry.offset = new mxPoint(0, 90);
			   	button4.vertex = true;
			   	bg.insert(button4);
			   	var button5 = new mxCell('Dropdown', new mxGeometry(0, 0, 90, 30), inh + 'html=1;shadow=0;dashed=0;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=left;spacing=10;sketch=0;');
			   	button5.geometry.relative = true;
			   	button5.geometry.offset = new mxPoint(0, 120);
			   	button5.vertex = true;
			   	bg.insert(button5);
			   	var marker1 = new mxCell('', new mxGeometry(1, 0.5, 10, 5), 'shape=triangle;direction=south;fillColor=#ffffff;strokeColor=none;perimeter=none;sketch=0;');
			   	marker1.geometry.relative = true;
			   	marker1.geometry.offset = new mxPoint(-17, -2.5);
			   	marker1.vertex = true;
			   	button5.insert(marker1);
			   	var button6 = new mxCell('Dropdown', new mxGeometry(0, 1, 90, 30), inh + s + 'bottomButton;rSize=5;perimeter=none;whiteSpace=wrap;resizeWidth=1;resizeHeight=0;align=left;spacing=10;sketch=0;');
			   	button6.geometry.relative = true;
			   	button6.geometry.offset = new mxPoint(0, -30);
			   	button6.vertex = true;
			   	bg.insert(button6);
			   	var marker2 = new mxCell('', new mxGeometry(1, 0.5, 10, 5), 'shape=triangle;direction=south;fillColor=#ffffff;strokeColor=none;perimeter=none;sketch=0;');
			   	marker2.geometry.relative = true;
			   	marker2.geometry.offset = new mxPoint(-17, -2.5);
			   	marker2.vertex = true;
			   	button6.insert(marker2);
				
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Button group, vertical');
			}),
				    
			this.addEntry(dt + 'card', function()
	   		{
			   	var bg = new mxCell(
			   			'<b><font style="font-size: 20px">Card title</font></b><br style="font-size: 14px"><br style="font-size: 14px">Some quick example text to build on the card title and make up the bulk of the card\'s content.', 
			   			new mxGeometry(0, 0, 250, 350), s + 'rrect;rSize=5;strokeColor=#DFDFDF;html=1;whiteSpace=wrap;fillColor=#ffffff;fontColor=#000000;verticalAlign=bottom;align=left;spacing=20;spacingBottom=50;fontSize=14;');
			   	bg.vertex = true;
			   	var button1 = new mxCell('Image cap', new mxGeometry(0, 0, 250, 180), s + 'topButton;rSize=5;perimeter=none;whiteSpace=wrap;fillColor=#868E96;strokeColor=#DFDFDF;fontColor=#DEE2E6;resizeWidth=1;fontSize=18;');
			   	button1.geometry.relative = true;
			   	button1.vertex = true;
			   	bg.insert(button1);
			   	var button2 = new mxCell('Go somewhere', new mxGeometry(0, 1, 120, 40), s + 'rrect;rSize=5;perimeter=none;whiteSpace=wrap;fillColor=#0085FC;strokeColor=none;fontColor=#ffffff;resizeWidth=1;fontSize=14;');
			   	button2.geometry.relative = true;
			   	button2.geometry.offset = new mxPoint(20, -60);
			   	button2.vertex = true;
			   	bg.insert(button2);
				
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Card');
			}),
						    
			this.addEntry(dt + 'card', function()
	   		{
			   	var bg = new mxCell(
			   			'<b><font style="font-size: 20px">Card title</font></b><font color="#6c767d"><b><font style="font-size: 14px"><br style="font-size: 10px">Card subtitle<br></font></b></font><br style="font-size: 14px">Some quick example text to build on the card title and make up the bulk of the card\'s content.', 
			   			new mxGeometry(0, 0, 250, 190), s + 'rrect;rSize=5;strokeColor=#DFDFDF;html=1;whiteSpace=wrap;fillColor=#ffffff;fontColor=#000000;verticalAlign=top;align=left;spacing=20;fontSize=14;');
			   	bg.vertex = true;
			   	var button1 = new mxCell('Card link', new mxGeometry(0, 1, 80, 40), s + 'rrect;rSize=5;perimeter=none;whiteSpace=wrap;fillColor=none;strokeColor=none;fontColor=#0085FC;resizeWidth=1;fontSize=14;align=center;');
			   	button1.geometry.relative = true;
			   	button1.geometry.offset = new mxPoint(10, -50);
			   	button1.vertex = true;
			   	bg.insert(button1);
			   	var button2 = new mxCell('Another link', new mxGeometry(0, 1, 100, 40), s + 'rrect;rSize=5;perimeter=none;whiteSpace=wrap;fillColor=none;strokeColor=none;fontColor=#0085FC;resizeWidth=1;fontSize=14;align=center;');
			   	button2.geometry.relative = true;
			   	button2.geometry.offset = new mxPoint(100, -50);
			   	button2.vertex = true;
			   	bg.insert(button2);
				
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Card');
			}),
						    
			this.addEntry(dt + 'image', function()
	   		{
			   	var bg = new mxCell(
			   			'Some quick example text to build on the card title and make up the bulk of the card\'s content.', 
			   			new mxGeometry(0, 0, 250, 260), s + 'rrect;rSize=5;strokeColor=#DFDFDF;html=1;whiteSpace=wrap;fillColor=#ffffff;fontColor=#000000;verticalAlign=bottom;align=left;spacing=20;fontSize=14;');
			   	bg.vertex = true;
			   	var button1 = new mxCell('Image cap', new mxGeometry(0, 0, 250, 180), s + 'topButton;rSize=5;perimeter=none;whiteSpace=wrap;fillColor=#868E96;strokeColor=#DFDFDF;fontColor=#DEE2E6;resizeWidth=1;fontSize=18;');
			   	button1.geometry.relative = true;
			   	button1.vertex = true;
			   	bg.insert(button1);
				
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Image');
			}),
						    
			this.addEntry(dt + 'list group', function()
	   		{
			   	var bg = new mxCell('', new mxGeometry(0, 0, 200, 90), s + 'rrect;rSize=5;strokeColor=#DFDFDF;html=1;whiteSpace=wrap;fillColor=#FFFFFF;fontColor=#000000;');
			   	bg.vertex = true;
			   	var button1 = new mxCell('Cras justo odio', new mxGeometry(0, 0, 200, 30), inh + s + 'topButton;rSize=5;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=left;spacing=10;');
			   	button1.geometry.relative = true;
			   	button1.vertex = true;
			   	bg.insert(button1);
			   	var button2 = new mxCell('Dapibus ac facilisis in', new mxGeometry(0, 0, 200, 30), inh + 'html=1;shadow=0;dashed=0;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=left;spacing=10;');
			   	button2.geometry.relative = true;
			   	button2.geometry.offset = new mxPoint(0, 30);
			   	button2.vertex = true;
			   	bg.insert(button2);
			   	var button3 = new mxCell('Vestibulum at eros', new mxGeometry(0, 1, 200, 30), inh + s + 'bottomButton;rSize=5;perimeter=none;whiteSpace=wrap;resizeWidth=1;resizeHeight=0;align=left;spacing=10;');
			   	button3.geometry.relative = true;
			   	button3.geometry.offset = new mxPoint(0, -30);
			   	button3.vertex = true;
			   	bg.insert(button3);
				
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'List group');
			}),
					
			this.addEntry(dt + 'list group', function()
	   		{
			   	var bg = new mxCell('', new mxGeometry(0, 0, 200, 120), s + 'rrect;rSize=5;strokeColor=#DFDFDF;html=1;whiteSpace=wrap;fillColor=#FFFFFF;fontColor=#000000;');
			   	bg.vertex = true;
			   	var button1 = new mxCell('Featured', new mxGeometry(0, 0, 200, 30), s + 'topButton;strokeColor=inherit;fillColor=#F7F7F7;rSize=5;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=left;spacing=10;');
			   	button1.geometry.relative = true;
			   	button1.vertex = true;
			   	bg.insert(button1);
			   	var button2 = new mxCell('Cras justo odio', new mxGeometry(0, 0, 200, 30), inh + 'html=1;shadow=0;dashed=0;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=left;spacing=10;');
			   	button2.geometry.relative = true;
			   	button2.geometry.offset = new mxPoint(0, 30);
			   	button2.vertex = true;
			   	bg.insert(button2);
			   	var button3 = new mxCell('Dapibus ac facilisis in', new mxGeometry(0, 0, 200, 30), inh + 'html=1;shadow=0;dashed=0;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=left;spacing=10;');
			   	button3.geometry.relative = true;
			   	button3.geometry.offset = new mxPoint(0, 60);
			   	button3.vertex = true;
			   	bg.insert(button3);
			   	var button4 = new mxCell('Vestibulum at eros', new mxGeometry(0, 1, 200, 30), inh + s + 'bottomButton;rSize=5;perimeter=none;whiteSpace=wrap;resizeWidth=1;resizeHeight=0;align=left;spacing=10;');
			   	button4.geometry.relative = true;
			   	button4.geometry.offset = new mxPoint(0, -30);
			   	button4.vertex = true;
			   	bg.insert(button4);
				
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'List group');
			}),
					
			this.addEntry(dt + 'card', function()
	   		{
			   	var bg = new mxCell('', new mxGeometry(0, 0, 250, 450), s + 'rrect;rSize=5;strokeColor=#DFDFDF;html=1;whiteSpace=wrap;fillColor=#ffffff;fontColor=#000000;verticalAlign=bottom;align=left;spacing=20;spacingBottom=130;fontSize=14;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('Image cap', new mxGeometry(0, 0, 250, 180), s + 'topButton;rSize=5;perimeter=none;whiteSpace=wrap;fillColor=#868E96;strokeColor=#DFDFDF;fontColor=#DEE2E6;resizeWidth=1;fontSize=18;');
			   	item1.geometry.relative = true;
			   	item1.vertex = true;
			   	bg.insert(item1);
			   	var item2 = new mxCell('<b><font style="font-size: 20px">Card title</font></b><br style="font-size: 14px"><br style="font-size: 14px">Some quick example text to build on the card title and make up the bulk of the card\'s content.', 
			   			new mxGeometry(0, 0, 250, 120), 'perimeter=none;html=1;whiteSpace=wrap;fillColor=none;strokeColor=none;resizeWidth=1;verticalAlign=top;align=left;spacing=20;spacingTop=-10;fontSize=14;');
			   	item2.geometry.relative = true;
			   	item2.geometry.offset = new mxPoint(0, 180);
			   	item2.vertex = true;
			   	bg.insert(item2);
			   	var item3 = new mxCell('Cras justo odio', new mxGeometry(0, 0, 250, 30), 'html=1;shadow=0;dashed=0;strokeColor=none;fontSize=14;fillColor=none;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=left;spacing=10;');
			   	item3.geometry.relative = true;
			   	item3.geometry.offset = new mxPoint(0, 300);
			   	item3.vertex = true;
			   	bg.insert(item3);
			   	var item4 = new mxCell('Dapibus ac facilisis in', new mxGeometry(0, 0, 250, 30), inh + 'html=1;shadow=0;dashed=0;perimeter=none;fontSize=14;whiteSpace=wrap;resizeWidth=1;align=left;spacing=10;');
			   	item4.geometry.relative = true;
			   	item4.geometry.offset = new mxPoint(0, 330);
			   	item4.vertex = true;
			   	bg.insert(item4);
			   	var item5 = new mxCell('Vestibulum at eros', new mxGeometry(0, 0, 250, 30), inh + s + 'bottomButton;rSize=5;perimeter=none;fontSize=14;whiteSpace=wrap;resizeWidth=1;resizeHeight=0;align=left;spacing=10;');
			   	item5.geometry.relative = true;
			   	item5.geometry.offset = new mxPoint(0, 360);
			   	item5.vertex = true;
			   	bg.insert(item5);
				
			   	var button1 = new mxCell('Card link', new mxGeometry(0, 1, 80, 40), s + 'rrect;rSize=5;perimeter=none;whiteSpace=wrap;fillColor=none;strokeColor=none;fontColor=#0085FC;resizeWidth=1;fontSize=14;align=center;');
			   	button1.geometry.relative = true;
			   	button1.geometry.offset = new mxPoint(10, -50);
			   	button1.vertex = true;
			   	bg.insert(button1);
			   	var button2 = new mxCell('Another link', new mxGeometry(0, 1, 100, 40), s + 'rrect;rSize=5;perimeter=none;whiteSpace=wrap;fillColor=none;strokeColor=none;fontColor=#0085FC;resizeWidth=1;fontSize=14;align=center;');
			   	button2.geometry.relative = true;
			   	button2.geometry.offset = new mxPoint(100, -50);
			   	button2.vertex = true;
			   	bg.insert(button2);

		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Card');
			}),
						    
			this.addEntry(dt + 'card', function()
	   		{
			   	var bg = new mxCell('', new mxGeometry(0, 0, 800, 190), s + 'rrect;rSize=5;strokeColor=#DFDFDF;html=1;whiteSpace=wrap;fillColor=#FFFFFF;fontColor=#000000;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('Featured', new mxGeometry(0, 0, 800, 40), s + 'topButton;strokeColor=inherit;fillColor=#F7F7F7;rSize=5;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=left;spacing=20;fontSize=14;');
			   	item1.geometry.relative = true;
			   	item1.vertex = true;
			   	bg.insert(item1);
			   	var item2 = new mxCell('<b><font style="font-size: 20px">Special title treatment</font></b><br style="font-size: 14px"><br style="font-size: 14px">With supporting text below as a natural lead-in to additional content.', 
			   			new mxGeometry(0, 0, 800, 120), 'perimeter=none;html=1;whiteSpace=wrap;fillColor=none;strokeColor=none;resizeWidth=1;verticalAlign=top;align=left;spacing=20;spacingTop=-10;fontSize=14;');
			   	item2.geometry.relative = true;
			   	item2.geometry.offset = new mxPoint(0, 40);
			   	item2.vertex = true;
			   	bg.insert(item2);
			   	var button1 = new mxCell('Go somewhere', new mxGeometry(0, 1, 120, 40), s + 'rrect;rSize=5;perimeter=none;whiteSpace=wrap;fillColor=#0085FC;strokeColor=none;fontColor=#ffffff;resizeWidth=1;fontSize=14;');
			   	button1.geometry.relative = true;
			   	button1.geometry.offset = new mxPoint(20, -60);
			   	button1.vertex = true;
			   	bg.insert(button1);

		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Card with header and footer');
			}),
					
			this.addEntry(dt + 'card', function()
	   		{
			   	var bg = new mxCell('', new mxGeometry(0, 0, 800, 120), s + 'rrect;rSize=5;strokeColor=#DFDFDF;html=1;whiteSpace=wrap;fillColor=#FFFFFF;fontColor=#000000;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('Quote', new mxGeometry(0, 0, 800, 40), s + 'topButton;strokeColor=inherit;fillColor=#F7F7F7;rSize=5;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=left;spacing=20;fontSize=14;');
			   	item1.geometry.relative = true;
			   	item1.vertex = true;
			   	bg.insert(item1);
			   	var item2 = new mxCell('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.<font style="font-size: 14px" color="#999999"><br><br>- <b>Someone famous</b> in <i>Source Title</i></font>', 
			   			new mxGeometry(0, 0, 800, 80), 'perimeter=none;html=1;whiteSpace=wrap;fillColor=none;strokeColor=none;resizeWidth=1;verticalAlign=top;align=left;spacing=20;spacingTop=-10;fontSize=14;');
			   	item2.geometry.relative = true;
			   	item2.geometry.offset = new mxPoint(0, 40);
			   	item2.vertex = true;
			   	bg.insert(item2);

		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Card with header and footer');
			}),
					
			this.addEntry(dt + 'card', function()
	   		{
			   	var bg = new mxCell('', new mxGeometry(0, 0, 800, 230), s + 'rrect;rSize=5;strokeColor=#DFDFDF;html=1;whiteSpace=wrap;fillColor=#FFFFFF;fontColor=#000000;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('Featured', new mxGeometry(0, 0, 800, 40), s + 'topButton;strokeColor=inherit;fillColor=#F7F7F7;rSize=5;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=center;spacing=20;fontSize=14;');
			   	item1.geometry.relative = true;
			   	item1.vertex = true;
			   	bg.insert(item1);
			   	var item2 = new mxCell('<b><font style="font-size: 20px">Special title treatment</font></b><br style="font-size: 14px"><br style="font-size: 14px">With supporting text below as a natural lead-in to additional content.', 
			   			new mxGeometry(0, 0, 800, 120), 'perimeter=none;html=1;whiteSpace=wrap;fillColor=none;strokeColor=none;resizeWidth=1;verticalAlign=top;align=center;spacing=20;spacingTop=-10;fontSize=14;');
			   	item2.geometry.relative = true;
			   	item2.geometry.offset = new mxPoint(0, 40);
			   	item2.vertex = true;
			   	bg.insert(item2);
			   	var button1 = new mxCell('Go somewhere', new mxGeometry(0.5, 1, 120, 40), s + 'rrect;rSize=5;perimeter=none;whiteSpace=wrap;align=center;fillColor=#0085FC;strokeColor=none;fontColor=#ffffff;resizeWidth=1;fontSize=14;');
			   	button1.geometry.relative = true;
			   	button1.geometry.offset = new mxPoint(-60, -100);
			   	button1.vertex = true;
			   	bg.insert(button1);
			   	var item3 = new mxCell('2 days ago', new mxGeometry(0, 1, 800, 40), s + 'bottomButton;strokeColor=inherit;fillColor=#F7F7F7;rSize=5;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=center;spacing=20;fontSize=14;fontColor=#818181;');
			   	item3.geometry.relative = true;
			   	item3.geometry.offset = new mxPoint(0, -40);
			   	item3.vertex = true;
			   	bg.insert(item3);

		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Card with header and footer');
			}),
					
			this.addEntry(dt + 'card', function()
	   		{
			   	var bg1 = new mxCell('<b><font style="font-size: 20px">Special title treatment</font></b><br style="font-size: 14px"><br style="font-size: 14px">With supporting text below as a natural lead-in to additional content.', 
			   			new mxGeometry(0, 0, 380, 170), s + 'rrect;rSize=5;strokeColor=#DFDFDF;html=1;whiteSpace=wrap;fillColor=#FFFFFF;fontColor=#000000;align=left;verticalAlign=top;spacing=20;fontSize=14;');
			   	bg1.vertex = true;
			   	var button1 = new mxCell('Go somewhere', new mxGeometry(0, 1, 120, 40), s + 'rrect;rSize=5;perimeter=none;whiteSpace=wrap;fillColor=#0085FC;strokeColor=none;fontColor=#ffffff;resizeWidth=1;fontSize=14;');
			   	button1.geometry.relative = true;
			   	button1.geometry.offset = new mxPoint(20, -60);
			   	button1.vertex = true;
			   	bg1.insert(button1);
			   	var bg2 = new mxCell('<b><font style="font-size: 20px">Special title treatment</font></b><br style="font-size: 14px"><br style="font-size: 14px">With supporting text below as a natural lead-in to additional content.', 
			   			new mxGeometry(420, 0, 380, 170), s + 'rrect;rSize=5;strokeColor=#DFDFDF;html=1;whiteSpace=wrap;fillColor=#FFFFFF;fontColor=#000000;align=left;verticalAlign=top;spacing=20;fontSize=14;');
			   	bg2.vertex = true;
			   	var button2 = new mxCell('Go somewhere', new mxGeometry(0, 1, 120, 40), s + 'rrect;rSize=5;perimeter=none;whiteSpace=wrap;fillColor=#0085FC;strokeColor=none;fontColor=#ffffff;resizeWidth=1;fontSize=14;');
			   	button2.geometry.relative = true;
			   	button2.geometry.offset = new mxPoint(20, -60);
			   	button2.vertex = true;
			   	bg2.insert(button2);

		   		return sb.createVertexTemplateFromCells([bg1, bg2], 800, 190, 'Two cards');
			}),
					
			this.addEntry(dt + 'card', function()
	   		{
			   	var bg = new mxCell('', new mxGeometry(0, 0, 800, 200), s + 'rrect;rSize=5;strokeColor=#DFDFDF;html=1;whiteSpace=wrap;fillColor=#FFFFFF;fontColor=#000000;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('', new mxGeometry(0, 0, 800, 50), s + 'topButton;strokeColor=inherit;fillColor=#F7F7F7;rSize=5;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=center;spacing=20;fontSize=14;');
			   	item1.geometry.relative = true;
			   	item1.vertex = true;
			   	bg.insert(item1);
			   	var item2 = new mxCell('Active', new mxGeometry(0, 0, 80, 40), s + 'tabTop;strokeColor=#DFDFDF;fillColor=#ffffff;rSize=5;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=center;spacing=20;fontSize=14;fontColor=#4B5259;');
			   	item2.geometry.relative = true;
			   	item2.geometry.offset = new mxPoint(10, 10);
			   	item2.vertex = true;
			   	bg.insert(item2);
			   	var item3 = new mxCell('Link', new mxGeometry(0, 0, 50, 40), 'strokeColor=none;fillColor=none;rSize=5;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=center;spacing=20;fontSize=14;fontColor=#0085FC;');
			   	item3.geometry.relative = true;
			   	item3.geometry.offset = new mxPoint(95, 10);
			   	item3.vertex = true;
			   	bg.insert(item3);
			   	var item4 = new mxCell('Disabled', new mxGeometry(0, 0, 60, 40), 'strokeColor=none;fillColor=none;rSize=5;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=center;spacing=20;fontSize=14;fontColor=#0085FC;fontColor=#4B5259;');
			   	item4.geometry.relative = true;
			   	item4.geometry.offset = new mxPoint(150, 10);
			   	item4.vertex = true;
			   	bg.insert(item4);
			   	var item5 = new mxCell('<b><font style="font-size: 20px">Special title treatment</font></b><br style="font-size: 14px"><br style="font-size: 14px">With supporting text below as a natural lead-in to additional content.', 
			   			new mxGeometry(0, 0, 800, 120), 'perimeter=none;html=1;whiteSpace=wrap;fillColor=none;strokeColor=none;resizeWidth=1;verticalAlign=top;align=center;spacing=20;spacingTop=-10;fontSize=14;fontColor=#212529');
			   	item5.geometry.relative = true;
			   	item5.geometry.offset = new mxPoint(0, 50);
			   	item5.vertex = true;
			   	bg.insert(item5);
			   	var button1 = new mxCell('Go somewhere', new mxGeometry(0.5, 1, 120, 40), s + 'rrect;rSize=5;perimeter=none;whiteSpace=wrap;align=center;fillColor=#0085FC;strokeColor=none;fontColor=#ffffff;resizeWidth=1;fontSize=14;');
			   	button1.geometry.relative = true;
			   	button1.geometry.offset = new mxPoint(-60, -60);
			   	button1.vertex = true;
			   	bg.insert(button1);

		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Card navigation');
			}),
					
			this.addEntry(dt + 'card', function()
	   		{
			   	var bg = new mxCell('', new mxGeometry(0, 0, 800, 210), s + 'rrect;rSize=5;strokeColor=#DFDFDF;html=1;whiteSpace=wrap;fillColor=#FFFFFF;fontColor=#000000;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('', new mxGeometry(0, 0, 800, 60), s + 'topButton;strokeColor=inherit;fillColor=#F7F7F7;rSize=5;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=center;spacing=20;fontSize=14;');
			   	item1.geometry.relative = true;
			   	item1.vertex = true;
			   	bg.insert(item1);
			   	var item2 = new mxCell('Active', new mxGeometry(0, 0, 80, 40), s + 'rrect;arcSize=5;strokeColor=none;fillColor=#0085FC;rSize=5;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=center;spacing=20;fontSize=14;fontColor=#ffffff;');
			   	item2.geometry.relative = true;
			   	item2.geometry.offset = new mxPoint(10, 10);
			   	item2.vertex = true;
			   	bg.insert(item2);
			   	var item3 = new mxCell('Link', new mxGeometry(0, 0, 50, 40), 'strokeColor=none;fillColor=none;rSize=5;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=center;spacing=20;fontSize=14;fontColor=#0085FC;');
			   	item3.geometry.relative = true;
			   	item3.geometry.offset = new mxPoint(95, 10);
			   	item3.vertex = true;
			   	bg.insert(item3);
			   	var item4 = new mxCell('Disabled', new mxGeometry(0, 0, 60, 40), 'strokeColor=none;fillColor=none;rSize=5;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=center;spacing=20;fontSize=14;fontColor=#0085FC;fontColor=#4B5259;');
			   	item4.geometry.relative = true;
			   	item4.geometry.offset = new mxPoint(150, 10);
			   	item4.vertex = true;
			   	bg.insert(item4);
			   	var item5 = new mxCell('<b><font style="font-size: 20px">Special title treatment</font></b><br style="font-size: 14px"><br style="font-size: 14px">With supporting text below as a natural lead-in to additional content.', 
			   			new mxGeometry(0, 0, 800, 120), 'perimeter=none;html=1;whiteSpace=wrap;fillColor=none;strokeColor=none;resizeWidth=1;verticalAlign=top;align=center;spacing=20;spacingTop=-10;fontSize=14;fontColor=#212529');
			   	item5.geometry.relative = true;
			   	item5.geometry.offset = new mxPoint(0, 60);
			   	item5.vertex = true;
			   	bg.insert(item5);
			   	var button1 = new mxCell('Go somewhere', new mxGeometry(0.5, 1, 120, 40), s + 'rrect;rSize=5;perimeter=none;whiteSpace=wrap;align=center;fillColor=#0085FC;strokeColor=none;fontColor=#ffffff;resizeWidth=1;fontSize=14;');
			   	button1.geometry.relative = true;
			   	button1.geometry.offset = new mxPoint(-60, -60);
			   	button1.vertex = true;
			   	bg.insert(button1);

		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Card navigation');
			}),
					
			this.addEntry(dt + 'card', function()
	   		{
			   	var bg = new mxCell(
			   			'<b><font style="font-size: 20px">Card title</font></b><br><br>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.<br><br><font style="font-size: 12px" color="#999999">Last udated 3 mind ago</font>', 
			   			new mxGeometry(0, 0, 800, 310), s + 'rrect;rSize=5;strokeColor=#DFDFDF;html=1;whiteSpace=wrap;fillColor=#ffffff;fontColor=#000000;verticalAlign=bottom;align=left;spacing=20;fontSize=14;');
			   	bg.vertex = true;
			   	var button1 = new mxCell('Image cap', new mxGeometry(0, 0, 800, 180), s + 'topButton;rSize=5;perimeter=none;whiteSpace=wrap;fillColor=#868E96;strokeColor=#DFDFDF;fontColor=#DEE2E6;resizeWidth=1;fontSize=18;');
			   	button1.geometry.relative = true;
			   	button1.vertex = true;
			   	bg.insert(button1);
				
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Card');
			}),
						    
			this.addEntry(dt + 'card', function()
	   		{
			   	var bg = new mxCell(
			   			'<b><font style="font-size: 20px">Card title</font></b><br><br>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.<br><br><font style="font-size: 12px" color="#999999">Last udated 3 mind ago</font>', 
			   			new mxGeometry(0, 0, 800, 310), s + 'rrect;rSize=5;strokeColor=#DFDFDF;html=1;whiteSpace=wrap;fillColor=#ffffff;fontColor=#000000;verticalAlign=top;align=left;spacing=20;fontSize=14;');
			   	bg.vertex = true;
			   	var button1 = new mxCell('Image cap', new mxGeometry(0, 1, 800, 180), s + 'bottomButton;rSize=5;perimeter=none;whiteSpace=wrap;fillColor=#868E96;strokeColor=#DFDFDF;fontColor=#DEE2E6;resizeWidth=1;fontSize=18;');
			   	button1.geometry.relative = true;
			   	button1.geometry.offset = new mxPoint(0, -180);
			   	button1.vertex = true;
			   	bg.insert(button1);
				
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Card');
			}),
						    
			this.addEntry(dt + 'card', function()
	   		{
			   	var bg = new mxCell(
			   			'Card Image', 
			   			new mxGeometry(0, 0, 800, 280), s + 'rrect;rSize=5;strokeColor=#2D3338;html=1;whiteSpace=wrap;fillColor=#868E96;fontColor=#ffffff;verticalAlign=middle;align=center;spacing=20;fontSize=60;');
			   	bg.vertex = true;
			   	var button1 = new mxCell('<b><font style="font-size: 20px">Card title</font></b><br><br>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.<br><br>Last updated 3 mins ago', 
			   			new mxGeometry(0, 0, 800, 120), 'fillColor=none;strokeColor=none;fontColor=#ffffff;html=1;verticalAlign=top;align=left;spacing=20;fontSize=14;');
			   	button1.geometry.relative = true;
			   	button1.vertex = true;
			   	bg.insert(button1);
				
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Card');
			}),
						    
			this.addEntry(dt + 'card', function()
	   		{
			   	var bg = new mxCell(
			   			'<b><font style="font-size: 20px">Card title</font></b><br><br>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.<br><br><font style="font-size: 12px" color="#999999">Last udated 3 mind ago</font>', 
			   			new mxGeometry(0, 0, 480, 240), s + 'rrect;rSize=5;strokeColor=#DFDFDF;html=1;whiteSpace=wrap;fillColor=#ffffff;fontColor=#000000;verticalAlign=top;align=left;spacing=20;fontSize=14;spacingLeft=170;');
			   	bg.vertex = true;
			   	var button1 = new mxCell('Image', new mxGeometry(0, 0, 170, 240), s + 'leftButton;rSize=5;perimeter=none;whiteSpace=wrap;fillColor=#868E96;strokeColor=#DFDFDF;fontColor=#DEE2E6;resizeWidth=1;fontSize=18;');
			   	button1.geometry.relative = true;
			   	button1.vertex = true;
			   	bg.insert(button1);
				
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Card');
			}),
						    
			this.addEntry(dt + 'card', function()
	   		{
			   	var bg = new mxCell('<b><font style="font-size: 20px">Primary card title</font></b><br style="font-size: 14px"><br style="font-size: 14px">Some quick example text to build on the card title and make up the bulk of the card\'s content.', 
			   			new mxGeometry(0, 0, 250, 180), s + 'rrect;rSize=5;strokeColor=#0071D5;html=1;whiteSpace=wrap;fillColor=#0085FC;fontColor=#ffffff;verticalAlign=bottom;align=left;spacing=20;spacingBottom=0;fontSize=14;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('Header', new mxGeometry(0, 0, 250, 50), s + 'topButton;rSize=5;perimeter=none;whiteSpace=wrap;fillColor=#0081F4;strokeColor=#0071D5;fontColor=#ffffff;resizeWidth=1;fontSize=18;align=left;spacing=20;');
			   	item1.geometry.relative = true;
			   	item1.vertex = true;
			   	bg.insert(item1);

		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Primary card');
			}),
						    
			this.addEntry(dt + 'card', function()
	   		{
			   	var bg = new mxCell('<b><font style="font-size: 20px">Secondary card title</font></b><br style="font-size: 14px"><br style="font-size: 14px">Some quick example text to build on the card title and make up the bulk of the card\'s content.', 
			   			new mxGeometry(0, 0, 250, 180), s + 'rrect;rSize=5;strokeColor=#5B646A;html=1;whiteSpace=wrap;fillColor=#6C767D;fontColor=#ffffff;verticalAlign=bottom;align=left;spacing=20;spacingBottom=0;fontSize=14;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('Header', new mxGeometry(0, 0, 250, 50), s + 'topButton;rSize=5;perimeter=none;whiteSpace=wrap;fillColor=#697279;strokeColor=#5B646A;fontColor=#ffffff;resizeWidth=1;fontSize=18;align=left;spacing=20;');
			   	item1.geometry.relative = true;
			   	item1.vertex = true;
			   	bg.insert(item1);

		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Secondary card');
			}),
						    
			this.addEntry(dt + 'card', function()
	   		{
			   	var bg = new mxCell('<b><font style="font-size: 20px">Success card title</font></b><br style="font-size: 14px"><br style="font-size: 14px">Some quick example text to build on the card title and make up the bulk of the card\'s content.', 
			   			new mxGeometry(0, 0, 250, 180), s + 'rrect;rSize=5;strokeColor=#2B8D40;html=1;whiteSpace=wrap;fillColor=#33A64C;fontColor=#ffffff;verticalAlign=bottom;align=left;spacing=20;spacingBottom=0;fontSize=14;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('Header', new mxGeometry(0, 0, 250, 50), s + 'topButton;rSize=5;perimeter=none;whiteSpace=wrap;fillColor=#31A14A;strokeColor=#2B8D40;fontColor=#ffffff;resizeWidth=1;fontSize=18;align=left;spacing=20;');
			   	item1.geometry.relative = true;
			   	item1.vertex = true;
			   	bg.insert(item1);

		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Success card');
			}),
						    
			this.addEntry(dt + 'card', function()
	   		{
			   	var bg = new mxCell('<b><font style="font-size: 20px">Danger card title</font></b><br style="font-size: 14px"><br style="font-size: 14px">Some quick example text to build on the card title and make up the bulk of the card\'s content.', 
			   			new mxGeometry(0, 0, 250, 180), s + 'rrect;rSize=5;strokeColor=#BA2239;html=1;whiteSpace=wrap;fillColor=#DB2843;fontColor=#ffffff;verticalAlign=bottom;align=left;spacing=20;spacingBottom=0;fontSize=14;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('Header', new mxGeometry(0, 0, 250, 50), s + 'topButton;rSize=5;perimeter=none;whiteSpace=wrap;fillColor=#D42741;strokeColor=#BA2239;fontColor=#ffffff;resizeWidth=1;fontSize=18;align=left;spacing=20;');
			   	item1.geometry.relative = true;
			   	item1.vertex = true;
			   	bg.insert(item1);

		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Danger card');
			}),
						    
			this.addEntry(dt + 'card', function()
	   		{
			   	var bg = new mxCell('<b><font style="font-size: 20px">Warning card title</font></b><br style="font-size: 14px"><br style="font-size: 14px">Some quick example text to build on the card title and make up the bulk of the card\'s content.', 
			   			new mxGeometry(0, 0, 250, 180), s + 'rrect;rSize=5;strokeColor=#D89F20;html=1;whiteSpace=wrap;fillColor=#FFBC26;fontColor=#ffffff;verticalAlign=bottom;align=left;spacing=20;spacingBottom=0;fontSize=14;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('Header', new mxGeometry(0, 0, 250, 50), s + 'topButton;rSize=5;perimeter=none;whiteSpace=wrap;fillColor=#F7B625;strokeColor=#D89F20;fontColor=#ffffff;resizeWidth=1;fontSize=18;align=left;spacing=20;');
			   	item1.geometry.relative = true;
			   	item1.vertex = true;
			   	bg.insert(item1);

		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Warning card');
			}),
						    
			this.addEntry(dt + 'card', function()
	   		{
			   	var bg = new mxCell('<b><font style="font-size: 20px">Info card title</font></b><br style="font-size: 14px"><br style="font-size: 14px">Some quick example text to build on the card title and make up the bulk of the card\'s content.', 
			   			new mxGeometry(0, 0, 250, 180), s + 'rrect;rSize=5;strokeColor=#188C9C;html=1;whiteSpace=wrap;fillColor=#1CA5B8;fontColor=#ffffff;verticalAlign=bottom;align=left;spacing=20;spacingBottom=0;fontSize=14;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('Header', new mxGeometry(0, 0, 250, 50), s + 'topButton;rSize=5;perimeter=none;whiteSpace=wrap;fillColor=#1BA0B2;strokeColor=#188C9C;fontColor=#ffffff;resizeWidth=1;fontSize=18;align=left;spacing=20;');
			   	item1.geometry.relative = true;
			   	item1.vertex = true;
			   	bg.insert(item1);

		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Info card');
			}),
						    
			this.addEntry(dt + 'card', function()
	   		{
			   	var bg = new mxCell('<b><font style="font-size: 20px">Light card title</font></b><br style="font-size: 14px"><br style="font-size: 14px">Some quick example text to build on the card title and make up the bulk of the card\'s content.', 
			   			new mxGeometry(0, 0, 250, 180), s + 'rrect;rSize=5;strokeColor=#D2D3D4;html=1;whiteSpace=wrap;fillColor=#F8F9FA;fontColor=#212529;verticalAlign=bottom;align=left;spacing=20;spacingBottom=0;fontSize=14;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('Header', new mxGeometry(0, 0, 250, 50), s + 'topButton;rSize=5;perimeter=none;whiteSpace=wrap;fillColor=#F0F1F2;strokeColor=#D2D3D4;fontColor=#212529;resizeWidth=1;fontSize=18;align=left;spacing=20;');
			   	item1.geometry.relative = true;
			   	item1.vertex = true;
			   	bg.insert(item1);

		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Light card');
			}),
						    
			this.addEntry(dt + 'card', function()
	   		{
			   	var bg = new mxCell('<b><font style="font-size: 20px">Dark card title</font></b><br style="font-size: 14px"><br style="font-size: 14px">Some quick example text to build on the card title and make up the bulk of the card\'s content.', 
			   			new mxGeometry(0, 0, 250, 180), s + 'rrect;rSize=5;strokeColor=#2C3136;html=1;whiteSpace=wrap;fillColor=#343A40;fontColor=#ffffff;verticalAlign=bottom;align=left;spacing=20;spacingBottom=0;fontSize=14;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('Header', new mxGeometry(0, 0, 250, 50), s + 'topButton;rSize=5;perimeter=none;whiteSpace=wrap;fillColor=#32383E;strokeColor=#2C3136;fontColor=#ffffff;resizeWidth=1;fontSize=18;align=left;spacing=20;');
			   	item1.geometry.relative = true;
			   	item1.vertex = true;
			   	bg.insert(item1);

		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Dark card');
			}),
						    
			this.addEntry(dt + 'card', function()
	   		{
			   	var bg = new mxCell('<b><font style="font-size: 20px">Primary card title</font></b><br style="font-size: 14px"><br style="font-size: 14px">Some quick example text to build on the card title and make up the bulk of the card\'s content.', 
			   			new mxGeometry(0, 0, 250, 180), s + 'rrect;rSize=5;strokeColor=#0085FC;html=1;whiteSpace=wrap;fillColor=#ffffff;fontColor=#0085FC;verticalAlign=bottom;align=left;spacing=20;spacingBottom=0;fontSize=14;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('Header', new mxGeometry(0, 0, 250, 50), s + 'topButton;rSize=5;perimeter=none;whiteSpace=wrap;fillColor=#F7F7F7;strokeColor=#0085FC;fontColor=#212529;resizeWidth=1;fontSize=18;align=left;spacing=20;');
			   	item1.geometry.relative = true;
			   	item1.vertex = true;
			   	bg.insert(item1);

		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Primary card');
			}),
								    
			this.addEntry(dt + 'card', function()
	   		{
			   	var bg = new mxCell('<b><font style="font-size: 20px">Secondary card title</font></b><br style="font-size: 14px"><br style="font-size: 14px">Some quick example text to build on the card title and make up the bulk of the card\'s content.', 
			   			new mxGeometry(0, 0, 250, 180), s + 'rrect;rSize=5;strokeColor=#6C767D;html=1;whiteSpace=wrap;fillColor=#ffffff;fontColor=#6C767D;verticalAlign=bottom;align=left;spacing=20;spacingBottom=0;fontSize=14;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('Header', new mxGeometry(0, 0, 250, 50), s + 'topButton;rSize=5;perimeter=none;whiteSpace=wrap;fillColor=#F7F7F7;strokeColor=#6C767D;fontColor=#6C767D;resizeWidth=1;fontSize=18;align=left;spacing=20;');
			   	item1.geometry.relative = true;
			   	item1.vertex = true;
			   	bg.insert(item1);

		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Secondary card');
			}),
								    
			this.addEntry(dt + 'card', function()
	   		{
			   	var bg = new mxCell('<b><font style="font-size: 20px">Success card title</font></b><br style="font-size: 14px"><br style="font-size: 14px">Some quick example text to build on the card title and make up the bulk of the card\'s content.', 
			   			new mxGeometry(0, 0, 250, 180), s + 'rrect;rSize=5;strokeColor=#33A64C;html=1;whiteSpace=wrap;fillColor=#ffffff;fontColor=#33A64C;verticalAlign=bottom;align=left;spacing=20;spacingBottom=0;fontSize=14;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('Header', new mxGeometry(0, 0, 250, 50), s + 'topButton;rSize=5;perimeter=none;whiteSpace=wrap;fillColor=#F7F7F7;strokeColor=#33A64C;fontColor=#6C767D;resizeWidth=1;fontSize=18;align=left;spacing=20;');
			   	item1.geometry.relative = true;
			   	item1.vertex = true;
			   	bg.insert(item1);

		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Success card');
			}),
								    
			this.addEntry(dt + 'card', function()
	   		{
			   	var bg = new mxCell('<b><font style="font-size: 20px">Danger card title</font></b><br style="font-size: 14px"><br style="font-size: 14px">Some quick example text to build on the card title and make up the bulk of the card\'s content.', 
			   			new mxGeometry(0, 0, 250, 180), s + 'rrect;rSize=5;strokeColor=#DB2843;html=1;whiteSpace=wrap;fillColor=#ffffff;fontColor=#DB2843;verticalAlign=bottom;align=left;spacing=20;spacingBottom=0;fontSize=14;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('Header', new mxGeometry(0, 0, 250, 50), s + 'topButton;rSize=5;perimeter=none;whiteSpace=wrap;fillColor=#F7F7F7;strokeColor=#DB2843;fontColor=#6C767D;resizeWidth=1;fontSize=18;align=left;spacing=20;');
			   	item1.geometry.relative = true;
			   	item1.vertex = true;
			   	bg.insert(item1);

		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Danger card');
			}),
								    
			this.addEntry(dt + 'card', function()
	   		{
			   	var bg = new mxCell('<b><font style="font-size: 20px">Warning card title</font></b><br style="font-size: 14px"><br style="font-size: 14px">Some quick example text to build on the card title and make up the bulk of the card\'s content.', 
			   			new mxGeometry(0, 0, 250, 180), s + 'rrect;rSize=5;strokeColor=#FFBC26;html=1;whiteSpace=wrap;fillColor=#ffffff;fontColor=#FFBC26;verticalAlign=bottom;align=left;spacing=20;spacingBottom=0;fontSize=14;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('Header', new mxGeometry(0, 0, 250, 50), s + 'topButton;rSize=5;perimeter=none;whiteSpace=wrap;fillColor=#F7F7F7;strokeColor=#FFBC26;fontColor=#6C767D;resizeWidth=1;fontSize=18;align=left;spacing=20;');
			   	item1.geometry.relative = true;
			   	item1.vertex = true;
			   	bg.insert(item1);

		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Warning card');
			}),
								    
			this.addEntry(dt + 'card', function()
	   		{
			   	var bg = new mxCell('<b><font style="font-size: 20px">Info card title</font></b><br style="font-size: 14px"><br style="font-size: 14px">Some quick example text to build on the card title and make up the bulk of the card\'s content.', 
			   			new mxGeometry(0, 0, 250, 180), s + 'rrect;rSize=5;strokeColor=#1CA5B8;html=1;whiteSpace=wrap;fillColor=#ffffff;fontColor=#1CA5B8;verticalAlign=bottom;align=left;spacing=20;spacingBottom=0;fontSize=14;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('Header', new mxGeometry(0, 0, 250, 50), s + 'topButton;rSize=5;perimeter=none;whiteSpace=wrap;fillColor=#F7F7F7;strokeColor=#1CA5B8;fontColor=#6C767D;resizeWidth=1;fontSize=18;align=left;spacing=20;');
			   	item1.geometry.relative = true;
			   	item1.vertex = true;
			   	bg.insert(item1);

		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Info card');
			}),
								    
			this.addEntry(dt + 'card', function()
	   		{
			   	var bg = new mxCell('<b><font style="font-size: 20px">Light card title</font></b><br style="font-size: 14px"><br style="font-size: 14px">Some quick example text to build on the card title and make up the bulk of the card\'s content.', 
			   			new mxGeometry(0, 0, 250, 180), s + 'rrect;rSize=5;strokeColor=#F8F9FA;html=1;whiteSpace=wrap;fillColor=#ffffff;fontColor=#212529;verticalAlign=bottom;align=left;spacing=20;spacingBottom=0;fontSize=14;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('Header', new mxGeometry(0, 0, 250, 50), s + 'topButton;rSize=5;perimeter=none;whiteSpace=wrap;fillColor=#F7F7F7;strokeColor=#F8F9FA;fontColor=#6C767D;resizeWidth=1;fontSize=18;align=left;spacing=20;');
			   	item1.geometry.relative = true;
			   	item1.vertex = true;
			   	bg.insert(item1);

		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Light card');
			}),
								    
			this.addEntry(dt + 'card', function()
	   		{
			   	var bg = new mxCell('<b><font style="font-size: 20px">Dark card title</font></b><br style="font-size: 14px"><br style="font-size: 14px">Some quick example text to build on the card title and make up the bulk of the card\'s content.', 
			   			new mxGeometry(0, 0, 250, 180), s + 'rrect;rSize=5;strokeColor=#6C767D;html=1;whiteSpace=wrap;fillColor=#ffffff;fontColor=#212529;verticalAlign=bottom;align=left;spacing=20;spacingBottom=0;fontSize=14;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('Header', new mxGeometry(0, 0, 250, 50), s + 'topButton;rSize=5;perimeter=none;whiteSpace=wrap;fillColor=#F7F7F7;strokeColor=#6C767D;fontColor=#6C767D;resizeWidth=1;fontSize=18;align=left;spacing=20;');
			   	item1.geometry.relative = true;
			   	item1.vertex = true;
			   	bg.insert(item1);

		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Dark card');
			}),
								    
			this.addEntry(dt + 'card group', function()
	   		{
			   	var bg = new mxCell('', 
			   			new mxGeometry(0, 0, 780, 360), s + 'rrect;rSize=5;strokeColor=#DFDFDF;html=1;whiteSpace=wrap;fillColor=#ffffff;');
			   	bg.vertex = true;
			   	var item1 = new mxCell(
			   			'<b><font style="font-size: 20px">Card title</font></b><br><br>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.<br><br><font color="#999999" style="font-size: 12px">Last udated 3 mind ago</font>', 
			   			new mxGeometry(0, 0, 260, 360), s + 'leftButton;rSize=5;strokeColor=#DFDFDF;html=1;whiteSpace=wrap;fillColor=#ffffff;fontColor=#000000;verticalAlign=top;align=left;spacing=20;spacingBottom=0;fontSize=14;spacingTop=160;');
			   	item1.geometry.relative = true;
			   	item1.vertex = true;
			   	bg.insert(item1);
			   	var button1 = new mxCell('Image cap', new mxGeometry(0, 0, 260, 160), 'html=1;shadow=0;dashed=0;shape=mxgraph.basic.corner_round_rect;dx=2;perimeter=none;whiteSpace=wrap;fillColor=#868E96;strokeColor=#DFDFDF;fontColor=#DEE2E6;resizeWidth=1;fontSize=18;');
			   	button1.geometry.relative = true;
			   	button1.vertex = true;
			   	item1.insert(button1);
				
			   	var item2 = new mxCell(
			   			'<b><font style="font-size: 20px">Card title</font></b><br><br>This card has supporting text below as a natural lead-in to additional content.<br><br><font color="#999999" style="font-size: 12px">Last udated 3 mind ago</font>', 
			   			new mxGeometry(0, 0, 260, 360), 'html=1;shadow=0;dashed=0;strokeColor=#DFDFDF;html=1;whiteSpace=wrap;fillColor=#ffffff;fontColor=#000000;verticalAlign=top;align=left;spacing=20;spacingBottom=0;fontSize=14;spacingTop=160;');
			   	item2.geometry.relative = true;
			   	item2.geometry.offset = new mxPoint(260, 0);
			   	item2.vertex = true;
			   	bg.insert(item2);
			   	var button2 = new mxCell('Image cap', new mxGeometry(0, 0, 260, 160), 'html=1;shadow=0;dashed=0;perimeter=none;whiteSpace=wrap;fillColor=#868E96;strokeColor=#DFDFDF;fontColor=#DEE2E6;resizeWidth=1;fontSize=18;');
			   	button2.geometry.relative = true;
			   	button2.vertex = true;
			   	item2.insert(button2);
				
			   	var item3 = new mxCell(
			   			'<b><font style="font-size: 20px">Card title</font></b><br><br>This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.<br><br><font color="#999999" style="font-size: 12px">Last udated 3 mind ago</font>', 
			   			new mxGeometry(1, 0, 260, 360), s + 'rightButton;rSize=5;strokeColor=#DFDFDF;html=1;whiteSpace=wrap;fillColor=#ffffff;fontColor=#000000;verticalAlign=top;align=left;spacing=20;spacingBottom=0;fontSize=14;spacingTop=160;');
			   	item3.geometry.relative = true;
			   	item3.geometry.offset = new mxPoint(-260, 0);
			   	item3.vertex = true;
			   	bg.insert(item3);
			   	var button3 = new mxCell('Image cap', new mxGeometry(0, 0, 260, 160), 'html=1;shadow=0;dashed=0;shape=mxgraph.basic.corner_round_rect;dx=2;flipH=1;perimeter=none;whiteSpace=wrap;fillColor=#868E96;strokeColor=#DFDFDF;fontColor=#DEE2E6;resizeWidth=1;fontSize=18;');
			   	button3.geometry.relative = true;
			   	button3.vertex = true;
			   	item3.insert(button3);
				
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Card group');
			}),
						    
			this.addEntry(dt + 'card group', function()
	   		{
			   	var bg = new mxCell('', 
			   			new mxGeometry(0, 0, 780, 370), s + 'rrect;rSize=5;strokeColor=#DFDFDF;html=1;whiteSpace=wrap;fillColor=#ffffff;');
			   	bg.vertex = true;
			   	var item1 = new mxCell(
			   			'<b><font style="font-size: 20px">Card title</font></b><br><br>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.', 
			   			new mxGeometry(0, 0, 260, 370), s + 'leftButton;rSize=5;strokeColor=#DFDFDF;html=1;whiteSpace=wrap;fillColor=#ffffff;fontColor=#000000;verticalAlign=top;align=left;spacing=20;spacingBottom=0;fontSize=14;spacingTop=160;');
			   	item1.geometry.relative = true;
			   	item1.vertex = true;
			   	bg.insert(item1);
			   	var button1 = new mxCell('Image cap', new mxGeometry(0, 0, 260, 160), 'html=1;shadow=0;dashed=0;shape=mxgraph.basic.corner_round_rect;dx=2;perimeter=none;whiteSpace=wrap;fillColor=#868E96;strokeColor=#DFDFDF;fontColor=#DEE2E6;resizeWidth=1;fontSize=18;');
			   	button1.geometry.relative = true;
			   	button1.vertex = true;
			   	item1.insert(button1);
			   	var button2 = new mxCell('Last updated 3 mins ago', new mxGeometry(0, 1, 260, 50), 'html=1;shadow=0;dashed=0;shape=mxgraph.basic.corner_round_rect;dx=2;flipV=1;perimeter=none;whiteSpace=wrap;fillColor=#F7F7F7;strokeColor=#DFDFDF;fontColor=#6C767D;resizeWidth=1;fontSize=13;align=left;spacing=20;');
			   	button2.geometry.relative = true;
			   	button2.geometry.offset = new mxPoint(0, -50);
			   	button2.vertex = true;
			   	item1.insert(button2);
				
			   	var item2 = new mxCell(
			   			'<b><font style="font-size: 20px">Card title</font></b><br><br>This card has supporting text below as a natural lead-in to additional content.', 
			   			new mxGeometry(0, 0, 260, 370), 'html=1;shadow=0;dashed=0;strokeColor=#DFDFDF;html=1;whiteSpace=wrap;fillColor=#ffffff;fontColor=#000000;verticalAlign=top;align=left;spacing=20;spacingBottom=0;fontSize=14;spacingTop=160;');
			   	item2.geometry.relative = true;
			   	item2.geometry.offset = new mxPoint(260, 0);
			   	item2.vertex = true;
			   	bg.insert(item2);
			   	var button3 = new mxCell('Image cap', new mxGeometry(0, 0, 260, 160), 'html=1;shadow=0;dashed=0;perimeter=none;whiteSpace=wrap;fillColor=#868E96;strokeColor=#DFDFDF;fontColor=#DEE2E6;resizeWidth=1;fontSize=18;');
			   	button3.geometry.relative = true;
			   	button3.vertex = true;
			   	item2.insert(button3);
			   	var button4 = new mxCell('Last updated 3 mins ago', new mxGeometry(0, 1, 260, 50), 'html=1;shadow=0;dashed=0;perimeter=none;whiteSpace=wrap;fillColor=#F7F7F7;strokeColor=#DFDFDF;fontColor=#6C767D;resizeWidth=1;fontSize=13;align=left;spacing=20;');
			   	button4.geometry.relative = true;
			   	button4.geometry.offset = new mxPoint(0, -50);
			   	button4.vertex = true;
			   	item2.insert(button4);
				
			   	var item3 = new mxCell(
			   			'<b><font style="font-size: 20px">Card title</font></b><br><br>This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.', 
			   			new mxGeometry(1, 0, 260, 370), s + 'rightButton;rSize=5;strokeColor=#DFDFDF;html=1;whiteSpace=wrap;fillColor=#ffffff;fontColor=#000000;verticalAlign=top;align=left;spacing=20;spacingBottom=0;fontSize=14;spacingTop=160;');
			   	item3.geometry.relative = true;
			   	item3.geometry.offset = new mxPoint(-260, 0);
			   	item3.vertex = true;
			   	bg.insert(item3);
			   	var button5 = new mxCell('Image cap', new mxGeometry(0, 0, 260, 160), 'html=1;shadow=0;dashed=0;shape=mxgraph.basic.corner_round_rect;dx=2;flipH=1;perimeter=none;whiteSpace=wrap;fillColor=#868E96;strokeColor=#DFDFDF;fontColor=#DEE2E6;resizeWidth=1;fontSize=18;');
			   	button5.geometry.relative = true;
			   	button5.vertex = true;
			   	item3.insert(button5);
			   	var button6 = new mxCell('Last updated 3 mins ago', new mxGeometry(0, 1, 260, 50), 'html=1;shadow=0;dashed=0;shape=mxgraph.basic.corner_round_rect;dx=2;flipV=1;flipH=1;perimeter=none;whiteSpace=wrap;fillColor=#F7F7F7;strokeColor=#DFDFDF;fontColor=#6C767D;resizeWidth=1;fontSize=13;align=left;spacing=20;');
			   	button6.geometry.relative = true;
			   	button6.geometry.offset = new mxPoint(0, -50);
			   	button6.vertex = true;
			   	item3.insert(button6);
				
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Card group');
			}),
						    
			this.addEntry(dt + 'card group', function()
	   		{
			   	var item1 = new mxCell(
			   			'<b><font style="font-size: 20px">Card title</font></b><br><br>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.<br><br><font color="#999999" style="font-size: 12px">Last udated 3 mind ago</font>', 
			   			new mxGeometry(0, 0, 260, 360), s + 'rrect;rSize=5;strokeColor=#DFDFDF;html=1;whiteSpace=wrap;fillColor=#ffffff;fontColor=#000000;verticalAlign=top;align=left;spacing=20;spacingBottom=0;fontSize=14;spacingTop=160;');
			   	item1.geometry.relative = true;
			   	item1.vertex = true;
			   	var button1 = new mxCell('Image cap', new mxGeometry(0, 0, 260, 160), s + 'topButton;rSize=5;perimeter=none;whiteSpace=wrap;fillColor=#868E96;strokeColor=#DFDFDF;fontColor=#DEE2E6;resizeWidth=1;fontSize=18;');
			   	button1.geometry.relative = true;
			   	button1.vertex = true;
			   	item1.insert(button1);
				
			   	var item2 = new mxCell(
			   			'<b><font style="font-size: 20px">Card title</font></b><br><br>This card has supporting text below as a natural lead-in to additional content.<br><br><font color="#999999" style="font-size: 12px">Last udated 3 mind ago</font>', 
			   			new mxGeometry(280, 0, 260, 360), s + 'rrect;rSize=5;strokeColor=#DFDFDF;html=1;whiteSpace=wrap;fillColor=#ffffff;fontColor=#000000;verticalAlign=top;align=left;spacing=20;spacingBottom=0;fontSize=14;spacingTop=160;');
			   	item2.vertex = true;
			   	var button2 = new mxCell('Image cap', new mxGeometry(0, 0, 260, 160), s + 'topButton;rSize=5;perimeter=none;whiteSpace=wrap;fillColor=#868E96;strokeColor=#DFDFDF;fontColor=#DEE2E6;resizeWidth=1;fontSize=18;');
			   	button2.geometry.relative = true;
			   	button2.vertex = true;
			   	item2.insert(button2);
				
			   	var item3 = new mxCell(
			   			'<b><font style="font-size: 20px">Card title</font></b><br><br>This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.<br><br><font color="#999999" style="font-size: 12px">Last udated 3 mind ago</font>', 
			   			new mxGeometry(560, 0, 260, 360), s + 'rrect;rSize=5;strokeColor=#DFDFDF;html=1;whiteSpace=wrap;fillColor=#ffffff;fontColor=#000000;verticalAlign=top;align=left;spacing=20;spacingBottom=0;fontSize=14;spacingTop=160;');
			   	item3.vertex = true;
			   	var button3 = new mxCell('Image cap', new mxGeometry(0, 0, 260, 160), s + 'topButton;rSize=5;perimeter=none;whiteSpace=wrap;fillColor=#868E96;strokeColor=#DFDFDF;fontColor=#DEE2E6;resizeWidth=1;fontSize=18;');
			   	button3.geometry.relative = true;
			   	button3.vertex = true;
			   	item3.insert(button3);
				
		   		return sb.createVertexTemplateFromCells([item1, item2, item3], 820, 360, 'Card group');
			}),
						    
			this.addEntry(dt + 'card group', function()
	   		{
			   	var item1 = new mxCell(
			   			'<b><font style="font-size: 20px">Card title</font></b><br><br>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.', 
			   			new mxGeometry(0, 0, 260, 370), s + 'rrect;rSize=5;strokeColor=#DFDFDF;html=1;whiteSpace=wrap;fillColor=#ffffff;fontColor=#000000;verticalAlign=top;align=left;spacing=20;spacingBottom=0;fontSize=14;spacingTop=160;');
			   	item1.geometry.relative = true;
			   	item1.vertex = true;
			   	var button1 = new mxCell('Image cap', new mxGeometry(0, 0, 260, 160), s + 'topButton;rSize=5;perimeter=none;whiteSpace=wrap;fillColor=#868E96;strokeColor=#DFDFDF;fontColor=#DEE2E6;resizeWidth=1;fontSize=18;');
			   	button1.geometry.relative = true;
			   	button1.vertex = true;
			   	item1.insert(button1);
			   	var button2 = new mxCell('Last updated 3 mins ago', new mxGeometry(0, 1, 260, 50), s + 'bottomButton;rSize=5;perimeter=none;whiteSpace=wrap;fillColor=#F7F7F7;strokeColor=#DFDFDF;fontColor=#6C767D;resizeWidth=1;fontSize=13;align=left;spacing=20;');
			   	button2.geometry.relative = true;
			   	button2.geometry.offset = new mxPoint(0, -50);
			   	button2.vertex = true;
			   	item1.insert(button2);
				
			   	var item2 = new mxCell(
			   			'<b><font style="font-size: 20px">Card title</font></b><br><br>This card has supporting text below as a natural lead-in to additional content.', 
			   			new mxGeometry(280, 0, 260, 370), s + 'rrect;rSize=5;strokeColor=#DFDFDF;html=1;whiteSpace=wrap;fillColor=#ffffff;fontColor=#000000;verticalAlign=top;align=left;spacing=20;spacingBottom=0;fontSize=14;spacingTop=160;');
			   	item2.vertex = true;
			   	var button3 = new mxCell('Image cap', new mxGeometry(0, 0, 260, 160), s + 'topButton;rSize=5;perimeter=none;whiteSpace=wrap;fillColor=#868E96;strokeColor=#DFDFDF;fontColor=#DEE2E6;resizeWidth=1;fontSize=18;');
			   	button3.geometry.relative = true;
			   	button3.vertex = true;
			   	item2.insert(button3);
			   	var button4 = new mxCell('Last updated 3 mins ago', new mxGeometry(0, 1, 260, 50), s + 'bottomButton;rSize=5;perimeter=none;whiteSpace=wrap;fillColor=#F7F7F7;strokeColor=#DFDFDF;fontColor=#6C767D;resizeWidth=1;fontSize=13;align=left;spacing=20;');
			   	button4.geometry.relative = true;
			   	button4.geometry.offset = new mxPoint(0, -50);
			   	button4.vertex = true;
			   	item2.insert(button4);
				
			   	var item3 = new mxCell(
			   			'<b><font style="font-size: 20px">Card title</font></b><br><br>This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.', 
			   			new mxGeometry(560, 0, 260, 370), s + 'rrect;rSize=5;strokeColor=#DFDFDF;html=1;whiteSpace=wrap;fillColor=#ffffff;fontColor=#000000;verticalAlign=top;align=left;spacing=20;spacingBottom=0;fontSize=14;spacingTop=160;');
			   	item3.vertex = true;
			   	var button5 = new mxCell('Image cap', new mxGeometry(0, 0, 260, 160), s + 'topButton;rSize=5;perimeter=none;whiteSpace=wrap;fillColor=#868E96;strokeColor=#DFDFDF;fontColor=#DEE2E6;resizeWidth=1;fontSize=18;');
			   	button5.geometry.relative = true;
			   	button5.vertex = true;
			   	item3.insert(button5);
			   	var button6 = new mxCell('Last updated 3 mins ago', new mxGeometry(0, 1, 260, 50), s + 'bottomButton;rSize=5;perimeter=none;whiteSpace=wrap;fillColor=#F7F7F7;strokeColor=#DFDFDF;fontColor=#6C767D;resizeWidth=1;fontSize=13;align=left;spacing=20;');
			   	button6.geometry.relative = true;
			   	button6.geometry.offset = new mxPoint(0, -50);
			   	button6.vertex = true;
			   	item3.insert(button6);
				
		   		return sb.createVertexTemplateFromCells([item1, item2, item3], 820, 360, 'Card group');
			}),
						    
			this.addEntry(dt + 'card group', function()
	   		{
			   	var item1 = new mxCell(
			   			'<b><font style="font-size: 20px">Card title</font></b><br><br>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.', 
			   			new mxGeometry(0, 0, 370, 290), s + 'rrect;rSize=5;strokeColor=#DFDFDF;html=1;whiteSpace=wrap;fillColor=#ffffff;fontColor=#000000;verticalAlign=top;align=left;spacing=20;spacingBottom=0;fontSize=14;spacingTop=160;');
			   	item1.vertex = true;
			   	var button1 = new mxCell('Image cap', new mxGeometry(0, 0, 370, 160), s + 'topButton;rSize=5;perimeter=none;whiteSpace=wrap;fillColor=#868E96;strokeColor=#DFDFDF;fontColor=#DEE2E6;resizeWidth=1;fontSize=18;');
			   	button1.geometry.relative = true;
			   	button1.vertex = true;
			   	item1.insert(button1);
				
			   	var item2 = new mxCell(
			   			'<b><font style="font-size: 20px">Card title</font></b><br><br>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.', 
			   			new mxGeometry(390, 0, 370, 290), s + 'rrect;rSize=5;strokeColor=#DFDFDF;html=1;whiteSpace=wrap;fillColor=#ffffff;fontColor=#000000;verticalAlign=top;align=left;spacing=20;spacingBottom=0;fontSize=14;spacingTop=160;');
			   	item2.vertex = true;
			   	var button2 = new mxCell('Image cap', new mxGeometry(0, 0, 370, 160), s + 'topButton;rSize=5;perimeter=none;whiteSpace=wrap;fillColor=#868E96;strokeColor=#DFDFDF;fontColor=#DEE2E6;resizeWidth=1;fontSize=18;');
			   	button2.geometry.relative = true;
			   	button2.vertex = true;
			   	item2.insert(button2);
				
			   	var item3 = new mxCell(
			   			'<b><font style="font-size: 20px">Card title</font></b><br><br>This is a wider card with supporting text below as a natural lead-in to additional content.', 
			   			new mxGeometry(0, 310, 370, 270), s + 'rrect;rSize=5;strokeColor=#DFDFDF;html=1;whiteSpace=wrap;fillColor=#ffffff;fontColor=#000000;verticalAlign=top;align=left;spacing=20;spacingBottom=0;fontSize=14;spacingTop=160;');
			   	item3.vertex = true;
			   	var button3 = new mxCell('Image cap', new mxGeometry(0, 0, 370, 160), s + 'topButton;rSize=5;perimeter=none;whiteSpace=wrap;fillColor=#868E96;strokeColor=#DFDFDF;fontColor=#DEE2E6;resizeWidth=1;fontSize=18;');
			   	button3.geometry.relative = true;
			   	button3.vertex = true;
			   	item3.insert(button3);
				
			   	var item4 = new mxCell(
			   			'<b><font style="font-size: 20px">Card title</font></b><br><br>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.', 
			   			new mxGeometry(390, 310, 370, 290), s + 'rrect;rSize=5;strokeColor=#DFDFDF;html=1;whiteSpace=wrap;fillColor=#ffffff;fontColor=#000000;verticalAlign=top;align=left;spacing=20;spacingBottom=0;fontSize=14;spacingTop=160;');
			   	item4.vertex = true;
			   	var button4 = new mxCell('Image cap', new mxGeometry(0, 0, 370, 160), s + 'topButton;rSize=5;perimeter=none;whiteSpace=wrap;fillColor=#868E96;strokeColor=#DFDFDF;fontColor=#DEE2E6;resizeWidth=1;fontSize=18;');
			   	button4.geometry.relative = true;
			   	button4.vertex = true;
			   	item4.insert(button4);
				
		   		return sb.createVertexTemplateFromCells([item1, item2, item3, item4], 760, 600, 'Grid cards');
			}),
						    
			this.addEntry(dt + 'card group', function()
	   		{
			   	var item1 = new mxCell(
			   			'<b><font style="font-size: 17px">Card title that wraps to a new line</font></b><br><br>This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.', 
			   			new mxGeometry(0, 0, 320, 290), s + 'rrect;rSize=5;strokeColor=#DFDFDF;html=1;whiteSpace=wrap;fillColor=#ffffff;fontColor=#000000;verticalAlign=top;align=left;spacing=20;spacingBottom=0;fontSize=14;spacingTop=160;');
			   	item1.vertex = true;
			   	var button1 = new mxCell('Image cap', new mxGeometry(0, 0, 320, 160), s + 'topButton;rSize=5;perimeter=none;whiteSpace=wrap;fillColor=#868E96;strokeColor=#DFDFDF;fontColor=#DEE2E6;resizeWidth=1;fontSize=18;');
			   	button1.geometry.relative = true;
			   	button1.vertex = true;
			   	item1.insert(button1);
				
			   	var item2 = new mxCell(
			   			'<font style="font-size: 18px">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.<br><br></font><font style="font-size: 12px" color="#999999">- Someone famous in <i>Source Title</i></font>', 
			   			new mxGeometry(0, 300, 320, 150), s + 'rrect;rSize=5;strokeColor=#DFDFDF;html=1;whiteSpace=wrap;fillColor=#ffffff;fontColor=#000000;verticalAlign=top;align=left;spacing=30;spacingBottom=0;fontSize=14;spacingTop=0;');
			   	item2.vertex = true;
			   	
			   	var item3 = new mxCell(
			   			'<b><font style="font-size: 17px">Card title</font></b><br><br>This card has supporting text below as a natural lead-in to additional content.<br><br><font color="#999999" style="font-size: 12px">Last updated 3 mins ago</font>', 
			   			new mxGeometry(330, 0, 320, 300), s + 'rrect;rSize=5;strokeColor=#DFDFDF;html=1;whiteSpace=wrap;fillColor=#ffffff;fontColor=#000000;verticalAlign=top;align=left;spacing=20;spacingBottom=0;fontSize=14;spacingTop=160;');
			   	item3.vertex = true;
			   	var button2 = new mxCell('Image cap', new mxGeometry(0, 0, 320, 160), s + 'topButton;rSize=5;perimeter=none;whiteSpace=wrap;fillColor=#868E96;strokeColor=#DFDFDF;fontColor=#DEE2E6;resizeWidth=1;fontSize=18;');
			   	button2.geometry.relative = true;
			   	button2.vertex = true;
			   	item3.insert(button2);
				
			   	var item4 = new mxCell(
			   			'<font style="font-size: 18px">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.<br><br></font><font style="font-size: 12px">- Someone famous in <i>Source Title</i></font>', 
			   			new mxGeometry(330, 310, 320, 130), s + 'rrect;rSize=5;strokeColor=#DFDFDF;html=1;whiteSpace=wrap;fillColor=#0085FC;fontColor=#FFFFFF;verticalAlign=top;align=center;spacing=10;fontSize=14;');
			   	item4.vertex = true;
			   	
			   	var item5 = new mxCell(
			   			'<font style="font-size: 18px">Card title</font><br><br>This card has a regular title and short paragraphy of text below it.<br><br><font color="#999999" style="font-size: 12px">Last updated 3 mins ago</font>', 
			   			new mxGeometry(330, 450, 320, 130), s + 'rrect;rSize=5;strokeColor=#DFDFDF;html=1;whiteSpace=wrap;fillColor=#ffffff;fontColor=#000000;verticalAlign=top;align=center;spacing=10;spacingBottom=0;fontSize=14;spacingTop=0;');
			   	item5.vertex = true;
			   	
			   	var item6 = new mxCell(
			   			'Card image', 
			   			new mxGeometry(660, 0, 320, 240), s + 'rrect;rSize=5;strokeColor=#DFDFDF;html=1;whiteSpace=wrap;fillColor=#868E96;fontColor=#DEE2E6;verticalAlign=middle;align=center;spacing=10;spacingBottom=0;fontSize=14;spacingTop=0;');
			   	item6.vertex = true;
			   	
			   	var item7 = new mxCell(
			   			'<font style="font-size: 18px">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.<br><br></font><font style="font-size: 12px" color="#999999">- Someone famous in <i>Source Title</i></font>', 
			   			new mxGeometry(660, 250, 320, 150), s + 'rrect;rSize=5;strokeColor=#DFDFDF;html=1;whiteSpace=wrap;fillColor=#ffffff;fontColor=#000000;verticalAlign=top;align=right;spacing=30;spacingBottom=0;fontSize=14;spacingTop=0;');
			   	item7.vertex = true;
			   	
			   	var item8 = new mxCell(
			   			'<font style="font-size: 18px"><b>Card title</b></font><br><br>This is another card with title and supporting text below it. This card has some additional content to make it slightly taller overall.<br><br><font color="#999999" style="font-size: 12px">Last updated 3 mins ago</font>', 
			   			new mxGeometry(660, 410, 320, 160), s + 'rrect;rSize=5;strokeColor=#DFDFDF;html=1;whiteSpace=wrap;fillColor=#ffffff;fontColor=#000000;verticalAlign=top;align=left;spacing=20;spacingBottom=0;fontSize=14;spacingTop=0;');
			   	item8.vertex = true;
			   	
		   		return sb.createVertexTemplateFromCells([item1, item2, item3, item4, item5, item6, item7, item8], 980, 600, 'Card group');
			}),
						    
			this.createVertexTemplateEntry('html=1;shadow=0;dashed=0;strokeColor=none;strokeWidth=1;fillColor=#777777;fontColor=#555555;whiteSpace=wrap;align=center;verticalAlign=middle;fontStyle=0;fontSize=40;', 
					800, 300, 'First slide', 'Carousel', null, null, this.getTagsForStencil(gn, 'carousel', dt + 'carousel').join(' ')),

			this.addEntry(dt + 'carousel with controls', function()
	   		{
			   	var bg = new mxCell(
			   			'First slide', 
			   			new mxGeometry(0, 0, 800, 300), 'html=1;shadow=0;dashed=0;strokeColor=none;strokeWidth=1;fillColor=#777777;fontColor=#555555;whiteSpace=wrap;align=center;verticalAlign=middle;fontStyle=0;fontSize=40;');
			   	bg.vertex = true;
			   	var button1 = new mxCell('', new mxGeometry(1, 0.5, 7, 14), 'html=1;verticalLabelPosition=bottom;labelBackgroundColor=#ffffff;verticalAlign=top;shadow=0;dashed=0;strokeWidth=4;shape=mxgraph.ios7.misc.more;strokeColor=#a0a0a0;');
			   	button1.geometry.relative = true;
			   	button1.geometry.offset = new mxPoint(-50, -7);
			   	button1.vertex = true;
			   	bg.insert(button1);
			   	var button2 = new mxCell('', new mxGeometry(0, 0.5, 7, 14), 'flipH=1;html=1;verticalLabelPosition=bottom;labelBackgroundColor=#ffffff;verticalAlign=top;shadow=0;dashed=0;strokeWidth=4;shape=mxgraph.ios7.misc.more;strokeColor=#a0a0a0;');
			   	button2.geometry.relative = true;
			   	button2.geometry.offset = new mxPoint(43, -7);
			   	button2.vertex = true;
			   	bg.insert(button2);
				
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Carousel with controls');
			}),
						    
			this.addEntry(dt + 'carousel with indicators', function()
	   		{
			   	var bg = new mxCell(
			   			'First slide', 
			   			new mxGeometry(0, 0, 800, 300), 'html=1;shadow=0;dashed=0;strokeColor=none;strokeWidth=1;fillColor=#777777;fontColor=#555555;whiteSpace=wrap;align=center;verticalAlign=middle;fontStyle=0;fontSize=40;');
			   	bg.vertex = true;
			   	var button1 = new mxCell('', new mxGeometry(1, 0.5, 7, 14), 'html=1;verticalLabelPosition=bottom;labelBackgroundColor=#ffffff;verticalAlign=top;shadow=0;dashed=0;strokeWidth=4;shape=mxgraph.ios7.misc.more;strokeColor=#a0a0a0;');
			   	button1.geometry.relative = true;
			   	button1.geometry.offset = new mxPoint(-50, -7);
			   	button1.vertex = true;
			   	bg.insert(button1);
			   	var button2 = new mxCell('', new mxGeometry(0, 0.5, 7, 14), 'flipH=1;html=1;verticalLabelPosition=bottom;labelBackgroundColor=#ffffff;verticalAlign=top;shadow=0;dashed=0;strokeWidth=4;shape=mxgraph.ios7.misc.more;strokeColor=#a0a0a0;');
			   	button2.geometry.relative = true;
			   	button2.geometry.offset = new mxPoint(43, -7);
			   	button2.vertex = true;
			   	bg.insert(button2);
			   	var item1 = new mxCell('', new mxGeometry(0.5, 1, 30, 4), 'html=1;shadow=0;strokeColor=none;fillColor=#ffffff;');
			   	item1.geometry.relative = true;
			   	item1.geometry.offset = new mxPoint(-50, -20);
			   	item1.vertex = true;
			   	bg.insert(item1);
			   	var item2 = new mxCell('', new mxGeometry(0.5, 1, 30, 4), 'html=1;shadow=0;strokeColor=none;fillColor=#BBBBBB;');
			   	item2.geometry.relative = true;
			   	item2.geometry.offset = new mxPoint(-15, -20);
			   	item2.vertex = true;
			   	bg.insert(item2);
			   	var item3 = new mxCell('', new mxGeometry(0.5, 1, 30, 4), 'html=1;shadow=0;strokeColor=none;fillColor=#BBBBBB;');
			   	item3.geometry.relative = true;
			   	item3.geometry.offset = new mxPoint(20, -20);
			   	item3.vertex = true;
			   	bg.insert(item3);
				
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Carousel with indicators');
			}),
						    
			this.addEntry(dt + 'carousel with captions', function()
	   		{
			   	var bg = new mxCell(
			   			'First slide', 
			   			new mxGeometry(0, 0, 800, 300), 'html=1;shadow=0;dashed=0;strokeColor=none;strokeWidth=1;fillColor=#777777;fontColor=#555555;whiteSpace=wrap;align=center;verticalAlign=middle;fontStyle=0;fontSize=40;');
			   	bg.vertex = true;
			   	var button1 = new mxCell('', new mxGeometry(1, 0.5, 7, 14), 'html=1;verticalLabelPosition=bottom;labelBackgroundColor=#ffffff;verticalAlign=top;shadow=0;dashed=0;strokeWidth=4;shape=mxgraph.ios7.misc.more;strokeColor=#a0a0a0;');
			   	button1.geometry.relative = true;
			   	button1.geometry.offset = new mxPoint(-50, -7);
			   	button1.vertex = true;
			   	bg.insert(button1);
			   	var button2 = new mxCell('', new mxGeometry(0, 0.5, 7, 14), 'flipH=1;html=1;verticalLabelPosition=bottom;labelBackgroundColor=#ffffff;verticalAlign=top;shadow=0;dashed=0;strokeWidth=4;shape=mxgraph.ios7.misc.more;strokeColor=#a0a0a0;');
			   	button2.geometry.relative = true;
			   	button2.geometry.offset = new mxPoint(43, -7);
			   	button2.vertex = true;
			   	bg.insert(button2);
			   	var item1 = new mxCell('', new mxGeometry(0.5, 1, 30, 4), 'html=1;shadow=0;strokeColor=none;fillColor=#ffffff;');
			   	item1.geometry.relative = true;
			   	item1.geometry.offset = new mxPoint(-50, -20);
			   	item1.vertex = true;
			   	bg.insert(item1);
			   	var item2 = new mxCell('', new mxGeometry(0.5, 1, 30, 4), 'html=1;shadow=0;strokeColor=none;fillColor=#BBBBBB;');
			   	item2.geometry.relative = true;
			   	item2.geometry.offset = new mxPoint(-15, -20);
			   	item2.vertex = true;
			   	bg.insert(item2);
			   	var item3 = new mxCell('', new mxGeometry(0.5, 1, 30, 4), 'html=1;shadow=0;strokeColor=none;fillColor=#BBBBBB;');
			   	item3.geometry.relative = true;
			   	item3.geometry.offset = new mxPoint(20, -20);
			   	item3.vertex = true;
			   	bg.insert(item3);
			   	var item4 = new mxCell('<font style="font-size: 16px"><b>First slide label</b></font><br style="font-size: 14px"><br style="font-size: 14px">Nulla vitae elit libero, a pharetra augue mollis interdum.', 
			   			new mxGeometry(0, 1, 800, 60), 'html=1;shadow=0;strokeColor=none;fillColor=none;resizeWidth=1;fontColor=#FFFFFF;fontSize=14;');
			   	item4.geometry.relative = true;
			   	item4.geometry.offset = new mxPoint(0, -90);
			   	item4.vertex = true;
			   	bg.insert(item4);
				
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Carousel with captions');
			}),
						    
			this.addEntry(dt + 'dropdown button', function()
	   		{
			   	var bg = new mxCell(
			   			'Dropdown button', 
			   			new mxGeometry(0, 0, 140, 40), s + 'rrect;rSize=5;strokeColor=none;strokeWidth=1;fillColor=#6C767D;fontColor=#ffffff;whiteSpace=wrap;align=right;verticalAlign=middle;fontStyle=0;fontSize=14;spacingRight=20;');
			   	bg.vertex = true;
			   	var marker1 = new mxCell('', new mxGeometry(1, 0.5, 10, 5), 'shape=triangle;direction=south;fillColor=#ffffff;strokeColor=none;perimeter=none;');
			   	marker1.geometry.relative = true;
			   	marker1.geometry.offset = new mxPoint(-17, -2.5);
			   	marker1.vertex = true;
			   	bg.insert(marker1);
				
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Dropdown button');
			}),
						    
			this.addEntry(dt + 'dropdown button', function()
	   		{
			   	var bg = new mxCell(
			   			'Dropdown button', 
			   			new mxGeometry(0, 0, 140, 40), s + 'rrect;rSize=5;strokeColor=none;strokeWidth=1;fillColor=#6C767D;fontColor=#ffffff;whiteSpace=wrap;align=left;verticalAlign=middle;fontStyle=0;fontSize=14;spacingLeft=10;');
			   	bg.vertex = true;
			   	var marker1 = new mxCell('', new mxGeometry(1, 0.5, 10, 5), 'shape=triangle;direction=south;fillColor=#ffffff;strokeColor=none;perimeter=none;');
			   	marker1.geometry.relative = true;
			   	marker1.geometry.offset = new mxPoint(-17, -2.5);
			   	marker1.vertex = true;
			   	bg.insert(marker1);
			   	var item1 = new mxCell('', new mxGeometry(0, 43, 170, 110), s + 'rrect;rSize=5;fillColor=#ffffff;strokeColor=#999999;');
			   	item1.vertex = true;
			   	var item2 = new mxCell('Action', new mxGeometry(0, 0, 170, 30), 'fillColor=none;strokeColor=none;align=left;spacing=20;fontSize=14;');
			   	item2.geometry.relative = true;
			   	item2.geometry.offset = new mxPoint(0, 10);
			   	item2.vertex = true;
			   	item1.insert(item2);
			   	var item3 = new mxCell('Another action', new mxGeometry(0, 0, 170, 30), 'fillColor=none;strokeColor=none;align=left;spacing=20;fontSize=14;');
			   	item3.geometry.relative = true;
			   	item3.geometry.offset = new mxPoint(0, 40);
			   	item3.vertex = true;
			   	item1.insert(item3);
			   	var item4 = new mxCell('Something else here', new mxGeometry(0, 0, 170, 30), 'fillColor=none;strokeColor=none;align=left;spacing=20;fontSize=14;');
			   	item4.geometry.relative = true;
			   	item4.geometry.offset = new mxPoint(0, 70);
			   	item4.vertex = true;
			   	item1.insert(item4);
				
		   		return sb.createVertexTemplateFromCells([bg, item1], 170, 153, 'Dropdown button');
			}),
						    
			this.addEntry(dt + 'dropdown button', function()
	   		{
			   	var bg = new mxCell(
			   			'Primary', 
			   			new mxGeometry(0, 0, 80, 40), s + 'rrect;rSize=5;strokeColor=none;strokeWidth=1;fillColor=#006AC9;fontColor=#ffffff;whiteSpace=wrap;align=left;verticalAlign=middle;fontStyle=0;fontSize=14;spacingLeft=10;');
			   	bg.vertex = true;
			   	var marker1 = new mxCell('', new mxGeometry(1, 0.5, 10, 5), 'shape=triangle;direction=south;fillColor=#ffffff;strokeColor=none;perimeter=none;');
			   	marker1.geometry.relative = true;
			   	marker1.geometry.offset = new mxPoint(-17, -2.5);
			   	marker1.vertex = true;
			   	bg.insert(marker1);
			   	var item1 = new mxCell('', new mxGeometry(0, 43, 170, 150), s + 'rrect;rSize=5;fillColor=#ffffff;strokeColor=#999999;');
			   	item1.vertex = true;
			   	var item2 = new mxCell('Action', new mxGeometry(0, 0, 170, 30), 'fillColor=none;strokeColor=none;align=left;spacing=20;fontSize=14;');
			   	item2.geometry.relative = true;
			   	item2.geometry.offset = new mxPoint(0, 10);
			   	item2.vertex = true;
			   	item1.insert(item2);
			   	var item3 = new mxCell('Another action', new mxGeometry(0, 0, 170, 30), 'fillColor=none;strokeColor=none;align=left;spacing=20;fontSize=14;');
			   	item3.geometry.relative = true;
			   	item3.geometry.offset = new mxPoint(0, 40);
			   	item3.vertex = true;
			   	item1.insert(item3);
			   	var item4 = new mxCell('Something else here', new mxGeometry(0, 0, 170, 30), 'fillColor=none;strokeColor=none;align=left;spacing=20;fontSize=14;');
			   	item4.geometry.relative = true;
			   	item4.geometry.offset = new mxPoint(0, 70);
			   	item4.vertex = true;
			   	item1.insert(item4);
			   	var item5 = new mxCell('', new mxGeometry(0, 0, 170, 10), 'shape=line;strokeColor=#999999;perimeter=none;resizeWidth=1;');
			   	item5.geometry.relative = true;
			   	item5.geometry.offset = new mxPoint(0, 100);
			   	item5.vertex = true;
			   	item1.insert(item5);
			   	var item6 = new mxCell('Separated link', new mxGeometry(0, 0, 170, 30), 'fillColor=none;strokeColor=none;align=left;spacing=20;fontSize=14;');
			   	item6.geometry.relative = true;
			   	item6.geometry.offset = new mxPoint(0, 110);
			   	item6.vertex = true;
			   	item1.insert(item6);
				
		   		return sb.createVertexTemplateFromCells([bg, item1], 170, 193, 'Dropdown button');
			}),
						    
			this.addEntry(dt + 'dropdown button', function()
	   		{
			   	var bg = new mxCell(
			   			'Secondary', 
			   			new mxGeometry(0, 0, 100, 40), s + 'rrect;rSize=5;strokeColor=none;strokeWidth=1;fillColor=#6C767D;fontColor=#ffffff;whiteSpace=wrap;align=left;verticalAlign=middle;fontStyle=0;fontSize=14;spacingLeft=10;');
			   	bg.vertex = true;
			   	var marker1 = new mxCell('', new mxGeometry(1, 0.5, 10, 5), 'shape=triangle;direction=south;fillColor=#ffffff;strokeColor=none;perimeter=none;');
			   	marker1.geometry.relative = true;
			   	marker1.geometry.offset = new mxPoint(-17, -2.5);
			   	marker1.vertex = true;
			   	bg.insert(marker1);
			   	var item1 = new mxCell('', new mxGeometry(0, 43, 170, 150), s + 'rrect;rSize=5;fillColor=#ffffff;strokeColor=#999999;');
			   	item1.vertex = true;
			   	var item2 = new mxCell('Action', new mxGeometry(0, 0, 170, 30), 'fillColor=none;strokeColor=none;align=left;spacing=20;fontSize=14;');
			   	item2.geometry.relative = true;
			   	item2.geometry.offset = new mxPoint(0, 10);
			   	item2.vertex = true;
			   	item1.insert(item2);
			   	var item3 = new mxCell('Another action', new mxGeometry(0, 0, 170, 30), 'fillColor=none;strokeColor=none;align=left;spacing=20;fontSize=14;');
			   	item3.geometry.relative = true;
			   	item3.geometry.offset = new mxPoint(0, 40);
			   	item3.vertex = true;
			   	item1.insert(item3);
			   	var item4 = new mxCell('Something else here', new mxGeometry(0, 0, 170, 30), 'fillColor=none;strokeColor=none;align=left;spacing=20;fontSize=14;');
			   	item4.geometry.relative = true;
			   	item4.geometry.offset = new mxPoint(0, 70);
			   	item4.vertex = true;
			   	item1.insert(item4);
			   	var item5 = new mxCell('', new mxGeometry(0, 0, 170, 10), 'shape=line;strokeColor=#999999;perimeter=none;resizeWidth=1;');
			   	item5.geometry.relative = true;
			   	item5.geometry.offset = new mxPoint(0, 100);
			   	item5.vertex = true;
			   	item1.insert(item5);
			   	var item6 = new mxCell('Separated link', new mxGeometry(0, 0, 170, 30), 'fillColor=none;strokeColor=none;align=left;spacing=20;fontSize=14;');
			   	item6.geometry.relative = true;
			   	item6.geometry.offset = new mxPoint(0, 110);
			   	item6.vertex = true;
			   	item1.insert(item6);
				
		   		return sb.createVertexTemplateFromCells([bg, item1], 170, 193, 'Dropdown button');
			}),
						    
			this.addEntry(dt + 'dropdown button', function()
	   		{
			   	var bg = new mxCell(
			   			'Success', 
			   			new mxGeometry(0, 0, 85, 40), s + 'rrect;rSize=5;strokeColor=none;strokeWidth=1;fillColor=#33A64C;fontColor=#ffffff;whiteSpace=wrap;align=left;verticalAlign=middle;fontStyle=0;fontSize=14;spacingLeft=10;');
			   	bg.vertex = true;
			   	var marker1 = new mxCell('', new mxGeometry(1, 0.5, 10, 5), 'shape=triangle;direction=south;fillColor=#ffffff;strokeColor=none;perimeter=none;');
			   	marker1.geometry.relative = true;
			   	marker1.geometry.offset = new mxPoint(-17, -2.5);
			   	marker1.vertex = true;
			   	bg.insert(marker1);
			   	var item1 = new mxCell('', new mxGeometry(0, 43, 170, 150), s + 'rrect;rSize=5;fillColor=#ffffff;strokeColor=#999999;');
			   	item1.vertex = true;
			   	var item2 = new mxCell('Action', new mxGeometry(0, 0, 170, 30), 'fillColor=none;strokeColor=none;align=left;spacing=20;fontSize=14;');
			   	item2.geometry.relative = true;
			   	item2.geometry.offset = new mxPoint(0, 10);
			   	item2.vertex = true;
			   	item1.insert(item2);
			   	var item3 = new mxCell('Another action', new mxGeometry(0, 0, 170, 30), 'fillColor=none;strokeColor=none;align=left;spacing=20;fontSize=14;');
			   	item3.geometry.relative = true;
			   	item3.geometry.offset = new mxPoint(0, 40);
			   	item3.vertex = true;
			   	item1.insert(item3);
			   	var item4 = new mxCell('Something else here', new mxGeometry(0, 0, 170, 30), 'fillColor=none;strokeColor=none;align=left;spacing=20;fontSize=14;');
			   	item4.geometry.relative = true;
			   	item4.geometry.offset = new mxPoint(0, 70);
			   	item4.vertex = true;
			   	item1.insert(item4);
			   	var item5 = new mxCell('', new mxGeometry(0, 0, 170, 10), 'shape=line;strokeColor=#999999;perimeter=none;resizeWidth=1;');
			   	item5.geometry.relative = true;
			   	item5.geometry.offset = new mxPoint(0, 100);
			   	item5.vertex = true;
			   	item1.insert(item5);
			   	var item6 = new mxCell('Separated link', new mxGeometry(0, 0, 170, 30), 'fillColor=none;strokeColor=none;align=left;spacing=20;fontSize=14;');
			   	item6.geometry.relative = true;
			   	item6.geometry.offset = new mxPoint(0, 110);
			   	item6.vertex = true;
			   	item1.insert(item6);
				
		   		return sb.createVertexTemplateFromCells([bg, item1], 170, 193, 'Dropdown button');
			}),
						    
			this.addEntry(dt + 'dropdown button', function()
	   		{
			   	var bg = new mxCell(
			   			'Info', 
			   			new mxGeometry(0, 0, 60, 40), s + 'rrect;rSize=5;strokeColor=none;strokeWidth=1;fillColor=#1CA5B8;fontColor=#ffffff;whiteSpace=wrap;align=left;verticalAlign=middle;fontStyle=0;fontSize=14;spacingLeft=10;');
			   	bg.vertex = true;
			   	var marker1 = new mxCell('', new mxGeometry(1, 0.5, 10, 5), 'shape=triangle;direction=south;fillColor=#ffffff;strokeColor=none;perimeter=none;');
			   	marker1.geometry.relative = true;
			   	marker1.geometry.offset = new mxPoint(-17, -2.5);
			   	marker1.vertex = true;
			   	bg.insert(marker1);
			   	var item1 = new mxCell('', new mxGeometry(0, 43, 170, 150), s + 'rrect;rSize=5;fillColor=#ffffff;strokeColor=#999999;');
			   	item1.vertex = true;
			   	var item2 = new mxCell('Action', new mxGeometry(0, 0, 170, 30), 'fillColor=none;strokeColor=none;align=left;spacing=20;fontSize=14;');
			   	item2.geometry.relative = true;
			   	item2.geometry.offset = new mxPoint(0, 10);
			   	item2.vertex = true;
			   	item1.insert(item2);
			   	var item3 = new mxCell('Another action', new mxGeometry(0, 0, 170, 30), 'fillColor=none;strokeColor=none;align=left;spacing=20;fontSize=14;');
			   	item3.geometry.relative = true;
			   	item3.geometry.offset = new mxPoint(0, 40);
			   	item3.vertex = true;
			   	item1.insert(item3);
			   	var item4 = new mxCell('Something else here', new mxGeometry(0, 0, 170, 30), 'fillColor=none;strokeColor=none;align=left;spacing=20;fontSize=14;');
			   	item4.geometry.relative = true;
			   	item4.geometry.offset = new mxPoint(0, 70);
			   	item4.vertex = true;
			   	item1.insert(item4);
			   	var item5 = new mxCell('', new mxGeometry(0, 0, 170, 10), 'shape=line;strokeColor=#999999;perimeter=none;resizeWidth=1;');
			   	item5.geometry.relative = true;
			   	item5.geometry.offset = new mxPoint(0, 100);
			   	item5.vertex = true;
			   	item1.insert(item5);
			   	var item6 = new mxCell('Separated link', new mxGeometry(0, 0, 170, 30), 'fillColor=none;strokeColor=none;align=left;spacing=20;fontSize=14;');
			   	item6.geometry.relative = true;
			   	item6.geometry.offset = new mxPoint(0, 110);
			   	item6.vertex = true;
			   	item1.insert(item6);
				
		   		return sb.createVertexTemplateFromCells([bg, item1], 170, 193, 'Dropdown button');
			}),
						    
			this.addEntry(dt + 'dropdown button', function()
	   		{
			   	var bg = new mxCell(
			   			'Warning', 
			   			new mxGeometry(0, 0, 90, 40), s + 'rrect;rSize=5;strokeColor=none;strokeWidth=1;fillColor=#FFBC26;fontColor=#000000;whiteSpace=wrap;align=left;verticalAlign=middle;fontStyle=0;fontSize=14;spacingLeft=10;');
			   	bg.vertex = true;
			   	var marker1 = new mxCell('', new mxGeometry(1, 0.5, 10, 5), 'shape=triangle;direction=south;fillColor=#000000;strokeColor=none;perimeter=none;sketch=0;');
			   	marker1.geometry.relative = true;
			   	marker1.geometry.offset = new mxPoint(-17, -2.5);
			   	marker1.vertex = true;
			   	bg.insert(marker1);
			   	var item1 = new mxCell('', new mxGeometry(0, 43, 170, 150), s + 'rrect;rSize=5;fillColor=#ffffff;strokeColor=#999999;');
			   	item1.vertex = true;
			   	var item2 = new mxCell('Action', new mxGeometry(0, 0, 170, 30), 'fillColor=none;strokeColor=none;align=left;spacing=20;fontSize=14;');
			   	item2.geometry.relative = true;
			   	item2.geometry.offset = new mxPoint(0, 10);
			   	item2.vertex = true;
			   	item1.insert(item2);
			   	var item3 = new mxCell('Another action', new mxGeometry(0, 0, 170, 30), 'fillColor=none;strokeColor=none;align=left;spacing=20;fontSize=14;');
			   	item3.geometry.relative = true;
			   	item3.geometry.offset = new mxPoint(0, 40);
			   	item3.vertex = true;
			   	item1.insert(item3);
			   	var item4 = new mxCell('Something else here', new mxGeometry(0, 0, 170, 30), 'fillColor=none;strokeColor=none;align=left;spacing=20;fontSize=14;');
			   	item4.geometry.relative = true;
			   	item4.geometry.offset = new mxPoint(0, 70);
			   	item4.vertex = true;
			   	item1.insert(item4);
			   	var item5 = new mxCell('', new mxGeometry(0, 0, 170, 10), 'shape=line;strokeColor=#999999;perimeter=none;resizeWidth=1;');
			   	item5.geometry.relative = true;
			   	item5.geometry.offset = new mxPoint(0, 100);
			   	item5.vertex = true;
			   	item1.insert(item5);
			   	var item6 = new mxCell('Separated link', new mxGeometry(0, 0, 170, 30), 'fillColor=none;strokeColor=none;align=left;spacing=20;fontSize=14;');
			   	item6.geometry.relative = true;
			   	item6.geometry.offset = new mxPoint(0, 110);
			   	item6.vertex = true;
			   	item1.insert(item6);
				
		   		return sb.createVertexTemplateFromCells([bg, item1], 170, 193, 'Dropdown button');
			}),
						    
			this.addEntry(dt + 'dropdown button', function()
	   		{
			   	var bg = new mxCell(
			   			'Danger', 
			   			new mxGeometry(0, 0, 80, 40), s + 'rrect;rSize=5;strokeColor=none;strokeWidth=1;fillColor=#DB2843;fontColor=#ffffff;whiteSpace=wrap;align=left;verticalAlign=middle;fontStyle=0;fontSize=14;spacingLeft=10;');
			   	bg.vertex = true;
			   	var marker1 = new mxCell('', new mxGeometry(1, 0.5, 10, 5), 'shape=triangle;direction=south;fillColor=#ffffff;strokeColor=none;perimeter=none;');
			   	marker1.geometry.relative = true;
			   	marker1.geometry.offset = new mxPoint(-17, -2.5);
			   	marker1.vertex = true;
			   	bg.insert(marker1);
			   	var item1 = new mxCell('', new mxGeometry(0, 43, 170, 150), s + 'rrect;rSize=5;fillColor=#ffffff;strokeColor=#999999;');
			   	item1.vertex = true;
			   	var item2 = new mxCell('Action', new mxGeometry(0, 0, 170, 30), 'fillColor=none;strokeColor=none;align=left;spacing=20;fontSize=14;');
			   	item2.geometry.relative = true;
			   	item2.geometry.offset = new mxPoint(0, 10);
			   	item2.vertex = true;
			   	item1.insert(item2);
			   	var item3 = new mxCell('Another action', new mxGeometry(0, 0, 170, 30), 'fillColor=none;strokeColor=none;align=left;spacing=20;fontSize=14;');
			   	item3.geometry.relative = true;
			   	item3.geometry.offset = new mxPoint(0, 40);
			   	item3.vertex = true;
			   	item1.insert(item3);
			   	var item4 = new mxCell('Something else here', new mxGeometry(0, 0, 170, 30), 'fillColor=none;strokeColor=none;align=left;spacing=20;fontSize=14;');
			   	item4.geometry.relative = true;
			   	item4.geometry.offset = new mxPoint(0, 70);
			   	item4.vertex = true;
			   	item1.insert(item4);
			   	var item5 = new mxCell('', new mxGeometry(0, 0, 170, 10), 'shape=line;strokeColor=#999999;perimeter=none;resizeWidth=1;');
			   	item5.geometry.relative = true;
			   	item5.geometry.offset = new mxPoint(0, 100);
			   	item5.vertex = true;
			   	item1.insert(item5);
			   	var item6 = new mxCell('Separated link', new mxGeometry(0, 0, 170, 30), 'fillColor=none;strokeColor=none;align=left;spacing=20;fontSize=14;');
			   	item6.geometry.relative = true;
			   	item6.geometry.offset = new mxPoint(0, 110);
			   	item6.vertex = true;
			   	item1.insert(item6);
				
		   		return sb.createVertexTemplateFromCells([bg, item1], 170, 193, 'Dropdown button');
			}),
						    
			this.addEntry(dt + 'dropup button', function()
	   		{
			   	var bg = new mxCell(
			   			'Dropup', 
			   			new mxGeometry(0, 0, 80, 40), s + 'rrect;rSize=5;strokeColor=none;strokeWidth=1;fillColor=#6C767D;fontColor=#ffffff;whiteSpace=wrap;align=left;verticalAlign=middle;fontStyle=0;fontSize=14;spacingLeft=10;');
			   	bg.vertex = true;
			   	var marker1 = new mxCell('', new mxGeometry(1, 0.5, 10, 5), 'shape=triangle;direction=north;fillColor=#ffffff;strokeColor=none;perimeter=none;');
			   	marker1.geometry.relative = true;
			   	marker1.geometry.offset = new mxPoint(-17, -2.5);
			   	marker1.vertex = true;
			   	bg.insert(marker1);
				
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Dropup button');
			}),
						    
			this.addEntry(dt + 'dropup button', function()
	   		{
			   	var bg = new mxCell(
			   			'Dropup', 
			   			new mxGeometry(0, 153, 80, 40), s + 'rrect;rSize=5;strokeColor=none;strokeWidth=1;fillColor=#6C767D;fontColor=#ffffff;whiteSpace=wrap;align=left;verticalAlign=middle;fontStyle=0;fontSize=14;spacingLeft=10;');
			   	bg.vertex = true;
			   	var marker1 = new mxCell('', new mxGeometry(1, 0.5, 10, 5), 'shape=triangle;direction=north;fillColor=#ffffff;strokeColor=none;perimeter=none;');
			   	marker1.geometry.relative = true;
			   	marker1.geometry.offset = new mxPoint(-17, -2.5);
			   	marker1.vertex = true;
			   	bg.insert(marker1);
			   	var item1 = new mxCell('', new mxGeometry(0, 0, 170, 150), s + 'rrect;rSize=5;fillColor=#ffffff;strokeColor=#999999;');
			   	item1.vertex = true;
			   	var item2 = new mxCell('Action', new mxGeometry(0, 0, 170, 30), 'fillColor=none;strokeColor=none;align=left;spacing=20;fontSize=14;');
			   	item2.geometry.relative = true;
			   	item2.geometry.offset = new mxPoint(0, 10);
			   	item2.vertex = true;
			   	item1.insert(item2);
			   	var item3 = new mxCell('Another action', new mxGeometry(0, 0, 170, 30), 'fillColor=none;strokeColor=none;align=left;spacing=20;fontSize=14;');
			   	item3.geometry.relative = true;
			   	item3.geometry.offset = new mxPoint(0, 40);
			   	item3.vertex = true;
			   	item1.insert(item3);
			   	var item4 = new mxCell('Something else here', new mxGeometry(0, 0, 170, 30), 'fillColor=none;strokeColor=none;align=left;spacing=20;fontSize=14;');
			   	item4.geometry.relative = true;
			   	item4.geometry.offset = new mxPoint(0, 70);
			   	item4.vertex = true;
			   	item1.insert(item4);
			   	var item5 = new mxCell('', new mxGeometry(0, 0, 170, 10), 'shape=line;strokeColor=#999999;perimeter=none;resizeWidth=1;');
			   	item5.geometry.relative = true;
			   	item5.geometry.offset = new mxPoint(0, 100);
			   	item5.vertex = true;
			   	item1.insert(item5);
			   	var item6 = new mxCell('Separated link', new mxGeometry(0, 0, 170, 30), 'fillColor=none;strokeColor=none;align=left;spacing=20;fontSize=14;');
			   	item6.geometry.relative = true;
			   	item6.geometry.offset = new mxPoint(0, 110);
			   	item6.vertex = true;
			   	item1.insert(item6);
				
		   		return sb.createVertexTemplateFromCells([bg, item1], 170, 193, 'Dropup button');
			}),
						    
			this.addEntry(dt + 'dropright button', function()
	   		{
			   	var bg = new mxCell(
			   			'Dropright', 
			   			new mxGeometry(0, 0, 95, 40), s + 'rrect;rSize=5;strokeColor=none;strokeWidth=1;fillColor=#6C767D;fontColor=#ffffff;whiteSpace=wrap;align=left;verticalAlign=middle;fontStyle=0;fontSize=14;spacingLeft=10;');
			   	bg.vertex = true;
			   	var marker1 = new mxCell('', new mxGeometry(1, 0.5, 5, 10), 'shape=triangle;direction=east;fillColor=#ffffff;strokeColor=none;perimeter=none;');
			   	marker1.geometry.relative = true;
			   	marker1.geometry.offset = new mxPoint(-15, -5);
			   	marker1.vertex = true;
			   	bg.insert(marker1);
				
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Dropright button');
			}),
						    
			this.addEntry(dt + 'dropright button', function()
	   		{
			   	var bg = new mxCell(
			   			'Dropright', 
			   			new mxGeometry(0, 0, 95, 40), s + 'rrect;rSize=5;strokeColor=none;strokeWidth=1;fillColor=#6C767D;fontColor=#ffffff;whiteSpace=wrap;align=left;verticalAlign=middle;fontStyle=0;fontSize=14;spacingLeft=10;');
			   	bg.vertex = true;
			   	var marker1 = new mxCell('', new mxGeometry(1, 0.5, 5, 10), 'shape=triangle;direction=east;fillColor=#ffffff;strokeColor=none;perimeter=none;');
			   	marker1.geometry.relative = true;
			   	marker1.geometry.offset = new mxPoint(-15, -5);
			   	marker1.vertex = true;
			   	bg.insert(marker1);
			   	var item1 = new mxCell('', new mxGeometry(98, 0, 170, 150), s + 'rrect;rSize=5;fillColor=#ffffff;strokeColor=#999999;');
			   	item1.vertex = true;
			   	var item2 = new mxCell('Action', new mxGeometry(0, 0, 170, 30), 'fillColor=none;strokeColor=none;align=left;spacing=20;fontSize=14;');
			   	item2.geometry.relative = true;
			   	item2.geometry.offset = new mxPoint(0, 10);
			   	item2.vertex = true;
			   	item1.insert(item2);
			   	var item3 = new mxCell('Another action', new mxGeometry(0, 0, 170, 30), 'fillColor=none;strokeColor=none;align=left;spacing=20;fontSize=14;');
			   	item3.geometry.relative = true;
			   	item3.geometry.offset = new mxPoint(0, 40);
			   	item3.vertex = true;
			   	item1.insert(item3);
			   	var item4 = new mxCell('Something else here', new mxGeometry(0, 0, 170, 30), 'fillColor=none;strokeColor=none;align=left;spacing=20;fontSize=14;');
			   	item4.geometry.relative = true;
			   	item4.geometry.offset = new mxPoint(0, 70);
			   	item4.vertex = true;
			   	item1.insert(item4);
			   	var item5 = new mxCell('', new mxGeometry(0, 0, 170, 10), 'shape=line;strokeColor=#999999;perimeter=none;resizeWidth=1;');
			   	item5.geometry.relative = true;
			   	item5.geometry.offset = new mxPoint(0, 100);
			   	item5.vertex = true;
			   	item1.insert(item5);
			   	var item6 = new mxCell('Separated link', new mxGeometry(0, 0, 170, 30), 'fillColor=none;strokeColor=none;align=left;spacing=20;fontSize=14;');
			   	item6.geometry.relative = true;
			   	item6.geometry.offset = new mxPoint(0, 110);
			   	item6.vertex = true;
			   	item1.insert(item6);
				
		   		return sb.createVertexTemplateFromCells([bg, item1], 268, 150, 'Dropright button');
			}),
						    
			this.addEntry(dt + 'dropleft button', function()
	   		{
			   	var bg = new mxCell(
			   			'Dropleft', 
			   			new mxGeometry(0, 0, 85, 40), s + 'rrect;rSize=5;strokeColor=none;strokeWidth=1;fillColor=#6C767D;fontColor=#ffffff;whiteSpace=wrap;align=right;verticalAlign=middle;fontStyle=0;fontSize=14;spacingRight=10;');
			   	bg.vertex = true;
			   	var marker1 = new mxCell('', new mxGeometry(0, 0.5, 5, 10), 'shape=triangle;direction=west;fillColor=#ffffff;strokeColor=none;perimeter=none;');
			   	marker1.geometry.relative = true;
			   	marker1.geometry.offset = new mxPoint(10, -5);
			   	marker1.vertex = true;
			   	bg.insert(marker1);
				
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Dropleft button');
			}),
						    
			this.addEntry(dt + 'dropleft button', function()
	   		{
			   	var bg = new mxCell(
			   			'Dropleft', 
			   			new mxGeometry(173, 0, 85, 40), s + 'rrect;rSize=5;strokeColor=none;strokeWidth=1;fillColor=#6C767D;fontColor=#ffffff;whiteSpace=wrap;align=right;verticalAlign=middle;fontStyle=0;fontSize=14;spacingRight=10;');
			   	bg.vertex = true;
			   	var marker1 = new mxCell('', new mxGeometry(0, 0.5, 5, 10), 'shape=triangle;direction=west;fillColor=#ffffff;strokeColor=none;perimeter=none;');
			   	marker1.geometry.relative = true;
			   	marker1.geometry.offset = new mxPoint(10, -5);
			   	marker1.vertex = true;
			   	bg.insert(marker1);
			   	var item1 = new mxCell('', new mxGeometry(0, 0, 170, 150), s + 'rrect;rSize=5;fillColor=#ffffff;strokeColor=#999999;');
			   	item1.vertex = true;
			   	var item2 = new mxCell('Action', new mxGeometry(0, 0, 170, 30), 'fillColor=none;strokeColor=none;align=left;spacing=20;fontSize=14;');
			   	item2.geometry.relative = true;
			   	item2.geometry.offset = new mxPoint(0, 10);
			   	item2.vertex = true;
			   	item1.insert(item2);
			   	var item3 = new mxCell('Another action', new mxGeometry(0, 0, 170, 30), 'fillColor=none;strokeColor=none;align=left;spacing=20;fontSize=14;');
			   	item3.geometry.relative = true;
			   	item3.geometry.offset = new mxPoint(0, 40);
			   	item3.vertex = true;
			   	item1.insert(item3);
			   	var item4 = new mxCell('Something else here', new mxGeometry(0, 0, 170, 30), 'fillColor=none;strokeColor=none;align=left;spacing=20;fontSize=14;');
			   	item4.geometry.relative = true;
			   	item4.geometry.offset = new mxPoint(0, 70);
			   	item4.vertex = true;
			   	item1.insert(item4);
			   	var item5 = new mxCell('', new mxGeometry(0, 0, 170, 10), 'shape=line;strokeColor=#999999;perimeter=none;resizeWidth=1;');
			   	item5.geometry.relative = true;
			   	item5.geometry.offset = new mxPoint(0, 100);
			   	item5.vertex = true;
			   	item1.insert(item5);
			   	var item6 = new mxCell('Separated link', new mxGeometry(0, 0, 170, 30), 'fillColor=none;strokeColor=none;align=left;spacing=20;fontSize=14;');
			   	item6.geometry.relative = true;
			   	item6.geometry.offset = new mxPoint(0, 110);
			   	item6.vertex = true;
			   	item1.insert(item6);
				
		   		return sb.createVertexTemplateFromCells([bg, item1], 268, 150, 'Dropleft button');
			}),
						    
			this.addEntry(dt + 'list with active item', function()
	   		{
			   	var bg = new mxCell('', new mxGeometry(0, 0, 170, 110), s + 'rrect;rSize=5;fillColor=#ffffff;strokeColor=#999999;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('Regular link', new mxGeometry(0, 0, 170, 30), 'fillColor=none;strokeColor=none;align=left;spacing=20;fontSize=14;');
			   	item1.geometry.relative = true;
			   	item1.geometry.offset = new mxPoint(0, 10);
			   	item1.vertex = true;
			   	bg.insert(item1);
			   	var item2 = new mxCell('Active link', new mxGeometry(0, 0, 170, 30), 'fillColor=#0085FC;strokeColor=none;fontColor=#ffffff;align=left;spacing=20;fontSize=14;sketch=0;');
			   	item2.geometry.relative = true;
			   	item2.geometry.offset = new mxPoint(0, 40);
			   	item2.vertex = true;
			   	bg.insert(item2);
			   	var item3 = new mxCell('Another link', new mxGeometry(0, 0, 170, 30), 'fillColor=none;strokeColor=none;align=left;spacing=20;fontSize=14;');
			   	item3.geometry.relative = true;
			   	item3.geometry.offset = new mxPoint(0, 70);
			   	item3.vertex = true;
			   	bg.insert(item3);
				
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'List with active item');
			}),
						    
			this.addEntry(dt + 'list with disabled item', function()
	   		{
			   	var bg = new mxCell('', new mxGeometry(0, 0, 170, 110), s + 'rrect;rSize=5;fillColor=#ffffff;strokeColor=#999999;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('Regular link', new mxGeometry(0, 0, 170, 30), 'fillColor=none;strokeColor=none;align=left;spacing=20;fontSize=14;');
			   	item1.geometry.relative = true;
			   	item1.geometry.offset = new mxPoint(0, 10);
			   	item1.vertex = true;
			   	bg.insert(item1);
			   	var item2 = new mxCell('Disabled link', new mxGeometry(0, 0, 170, 30), 'fillColor=none;strokeColor=none;fontColor=#6C767D;align=left;spacing=20;fontSize=14;');
			   	item2.geometry.relative = true;
			   	item2.geometry.offset = new mxPoint(0, 40);
			   	item2.vertex = true;
			   	bg.insert(item2);
			   	var item3 = new mxCell('Another link', new mxGeometry(0, 0, 170, 30), 'fillColor=none;strokeColor=none;align=left;spacing=20;fontSize=14;');
			   	item3.geometry.relative = true;
			   	item3.geometry.offset = new mxPoint(0, 70);
			   	item3.vertex = true;
			   	bg.insert(item3);
				
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'List with disabled item');
			}),
						    
			this.addEntry(dt + 'dropdown right aligned menu', function()
	   		{
			   	var bg = new mxCell(
			   			'Right-aligned menu', 
			   			new mxGeometry(15, 0, 155, 40), s + 'rrect;rSize=5;strokeColor=none;strokeWidth=1;fillColor=#6C767D;fontColor=#ffffff;whiteSpace=wrap;align=left;verticalAlign=middle;fontStyle=0;fontSize=14;spacingLeft=10;');
			   	bg.vertex = true;
			   	var marker1 = new mxCell('', new mxGeometry(1, 0.5, 10, 5), 'shape=triangle;direction=south;fillColor=#ffffff;strokeColor=none;perimeter=none;');
			   	marker1.geometry.relative = true;
			   	marker1.geometry.offset = new mxPoint(-17, -2.5);
			   	marker1.vertex = true;
			   	bg.insert(marker1);
			   	var item1 = new mxCell('', new mxGeometry(0, 43, 170, 110), s + 'rrect;rSize=5;fillColor=#ffffff;strokeColor=#999999;');
			   	item1.vertex = true;
			   	var item2 = new mxCell('Action', new mxGeometry(0, 0, 170, 30), 'fillColor=none;strokeColor=none;align=left;spacing=20;fontSize=14;');
			   	item2.geometry.relative = true;
			   	item2.geometry.offset = new mxPoint(0, 10);
			   	item2.vertex = true;
			   	item1.insert(item2);
			   	var item3 = new mxCell('Another action', new mxGeometry(0, 0, 170, 30), 'fillColor=none;strokeColor=none;align=left;spacing=20;fontSize=14;');
			   	item3.geometry.relative = true;
			   	item3.geometry.offset = new mxPoint(0, 40);
			   	item3.vertex = true;
			   	item1.insert(item3);
			   	var item4 = new mxCell('Something else here', new mxGeometry(0, 0, 170, 30), 'fillColor=none;strokeColor=none;align=left;spacing=20;fontSize=14;');
			   	item4.geometry.relative = true;
			   	item4.geometry.offset = new mxPoint(0, 70);
			   	item4.vertex = true;
			   	item1.insert(item4);
				
		   		return sb.createVertexTemplateFromCells([bg, item1], 170, 153, 'Dropdown with right aligned menu');
			}),
						    
			this.addEntry(dt + 'list with dropdown header', function()
	   		{
			   	var bg = new mxCell('', new mxGeometry(0, 0, 140, 110), s + 'rrect;rSize=5;fillColor=#ffffff;strokeColor=#999999;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('Dropdown header', new mxGeometry(0, 0, 140, 30), 'fillColor=none;strokeColor=none;align=left;spacing=20;fontSize=12;fontColor=#757E85;fontStyle=1;');
			   	item1.geometry.relative = true;
			   	item1.geometry.offset = new mxPoint(0, 10);
			   	item1.vertex = true;
			   	bg.insert(item1);
			   	var item2 = new mxCell('Action', new mxGeometry(0, 0, 140, 30), 'fillColor=none;strokeColor=none;align=left;spacing=20;fontSize=14;');
			   	item2.geometry.relative = true;
			   	item2.geometry.offset = new mxPoint(0, 40);
			   	item2.vertex = true;
			   	bg.insert(item2);
			   	var item3 = new mxCell('Another action', new mxGeometry(0, 0, 140, 30), 'fillColor=none;strokeColor=none;align=left;spacing=20;fontSize=14;');
			   	item3.geometry.relative = true;
			   	item3.geometry.offset = new mxPoint(0, 70);
			   	item3.vertex = true;
			   	bg.insert(item3);
				
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'List with dropdown header');
			}),
						    
			this.addEntry(dt + 'list with divider', function()
	   		{
			   	var bg = new mxCell('', new mxGeometry(0, 0, 170, 150), s + 'rrect;rSize=5;fillColor=#ffffff;strokeColor=#999999;');
			   	bg.vertex = true;
			   	var item2 = new mxCell('Action', new mxGeometry(0, 0, 170, 30), 'fillColor=none;strokeColor=none;align=left;spacing=20;fontSize=14;');
			   	item2.geometry.relative = true;
			   	item2.geometry.offset = new mxPoint(0, 10);
			   	item2.vertex = true;
			   	bg.insert(item2);
			   	var item3 = new mxCell('Another action', new mxGeometry(0, 0, 170, 30), 'fillColor=none;strokeColor=none;align=left;spacing=20;fontSize=14;');
			   	item3.geometry.relative = true;
			   	item3.geometry.offset = new mxPoint(0, 40);
			   	item3.vertex = true;
			   	bg.insert(item3);
			   	var item4 = new mxCell('Something else here', new mxGeometry(0, 0, 170, 30), 'fillColor=none;strokeColor=none;align=left;spacing=20;fontSize=14;');
			   	item4.geometry.relative = true;
			   	item4.geometry.offset = new mxPoint(0, 70);
			   	item4.vertex = true;
			   	bg.insert(item4);
			   	var item5 = new mxCell('', new mxGeometry(0, 0, 170, 10), 'shape=line;strokeColor=#999999;perimeter=none;resizeWidth=1;');
			   	item5.geometry.relative = true;
			   	item5.geometry.offset = new mxPoint(0, 100);
			   	item5.vertex = true;
			   	bg.insert(item5);
			   	var item6 = new mxCell('Separated link', new mxGeometry(0, 0, 170, 30), 'fillColor=none;strokeColor=none;align=left;spacing=20;fontSize=14;');
			   	item6.geometry.relative = true;
			   	item6.geometry.offset = new mxPoint(0, 110);
			   	item6.vertex = true;
			   	bg.insert(item6);
				
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'List with divider');
			}),
						    
			this.createVertexTemplateEntry(s + 'rrect;rSize=5;strokeColor=#999999;strokeWidth=1;fillColor=#FFFFFF;fontColor=#6C767D;whiteSpace=wrap;align=left;verticalAlign=middle;spacingLeft=10;fontSize=14;spacing=10;', 
					170, 160, 
					'Some example text that\'s free-flowing within the dropdown menu.<br style="font-size: 14px"><br style="font-size: 14px">And this is more example text.', 
					'Text', null, null, this.getTagsForStencil(gn, 'text', dt + 'text').join(' ')),

			this.addEntry(dt + 'list with divider', function()
	   		{
			   	var bg = new mxCell('', new mxGeometry(0, 0, 220, 345), s + 'rrect;rSize=5;fillColor=#ffffff;strokeColor=#999999;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('Email address', new mxGeometry(0, 0, 220, 40), 'fillColor=none;strokeColor=none;align=left;spacing=20;fontSize=14;');
			   	item1.geometry.relative = true;
			   	item1.geometry.offset = new mxPoint(0, 10);
			   	item1.vertex = true;
			   	bg.insert(item1);
			   	var item2 = new mxCell('email@example.com', new mxGeometry(0, 0, 180, 30), s + 'rrect;rSize=5;fillColor=none;strokeColor=#999999;align=left;spacing=15;fontSize=14;fontColor=#6C767D;');
			   	item2.geometry.relative = true;
			   	item2.geometry.offset = new mxPoint(20, 50);
			   	item2.vertex = true;
			   	bg.insert(item2);
			   	var item3 = new mxCell('Password', new mxGeometry(0, 0, 220, 40), 'fillColor=none;strokeColor=none;align=left;spacing=20;fontSize=14;');
			   	item3.geometry.relative = true;
			   	item3.geometry.offset = new mxPoint(0, 90);
			   	item3.vertex = true;
			   	bg.insert(item3);
			   	var item4 = new mxCell('Password', new mxGeometry(0, 0, 180, 30), s + 'rrect;rSize=5;fillColor=none;strokeColor=#999999;align=left;spacing=15;fontSize=14;fontColor=#6C767D;');
			   	item4.geometry.relative = true;
			   	item4.geometry.offset = new mxPoint(20, 130);
			   	item4.vertex = true;
			   	bg.insert(item4);
			   	var item5 = new mxCell('Remember me', new mxGeometry(0, 0, 10, 10), s + 'rrect;rSize=2;fillColor=#EDEDED;strokeColor=#999999;align=left;fontSize=14;fontColor=#000000;labelPosition=right;verticalLabelPosition=middle;verticalAlign=middle;spacingLeft=5;spacingTop=-2;gradientColor=#DEDEDE;');
			   	item5.geometry.relative = true;
			   	item5.geometry.offset = new mxPoint(20, 180);
			   	item5.vertex = true;
			   	bg.insert(item5);
			   	var item6 = new mxCell('Sign in', new mxGeometry(0, 0, 70, 40), s + 'rrect;rSize=5;fillColor=#0085FC;strokeColor=none;align=center;fontSize=14;fontColor=#FFFFFF;');
			   	item6.geometry.relative = true;
			   	item6.geometry.offset = new mxPoint(20, 210);
			   	item6.vertex = true;
			   	bg.insert(item6);
			   	var item7 = new mxCell('', new mxGeometry(0, 0, 220, 10), 'shape=line;strokeColor=#999999;perimeter=none;resizeWidth=1;');
			   	item7.geometry.relative = true;
			   	item7.geometry.offset = new mxPoint(0, 260);
			   	item7.vertex = true;
			   	bg.insert(item7);
			   	var item8 = new mxCell('New around here? Sign up<br><br>Forgot password?', new mxGeometry(0, 0, 220, 60), 'html=1;fillColor=none;strokeColor=none;align=left;spacing=20;fontSize=14;');
			   	item8.geometry.relative = true;
			   	item8.geometry.offset = new mxPoint(0, 275);
			   	item8.vertex = true;
			   	bg.insert(item8);
				
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'List with divider');
			}),
						    
			this.addEntry(dt + 'form', function()
	   		{
			   	var item1 = new mxCell('Email address', new mxGeometry(0, 0, 260, 40), 'fillColor=none;strokeColor=none;align=left;fontSize=14;');
			   	item1.geometry.relative = true;
			   	item1.vertex = true;
			   	var item2 = new mxCell('', new mxGeometry(0, 0, 800, 30), s + 'rrect;rSize=5;fillColor=none;strokeColor=#999999;align=left;spacing=15;fontSize=14;fontColor=#6C767D;');
			   	item2.geometry.relative = true;
			   	item2.geometry.offset = new mxPoint(0, 40);
			   	item2.vertex = true;
			   	var item3 = new mxCell('We\'ll never share your email with anyone else.', new mxGeometry(0, 0, 260, 30), 'fillColor=none;strokeColor=none;align=left;spacing=2;fontSize=12;fontColor=#999999;');
			   	item3.geometry.relative = true;
			   	item3.geometry.offset = new mxPoint(0, 70);
			   	item3.vertex = true;
			   	var item4 = new mxCell('Password', new mxGeometry(0, 0, 260, 40), 'fillColor=none;strokeColor=none;align=left;fontSize=14;');
			   	item4.geometry.relative = true;
			   	item4.geometry.offset = new mxPoint(0, 100);
			   	item4.vertex = true;
			   	var item5 = new mxCell('', new mxGeometry(0, 0, 800, 30), s + 'rrect;rSize=5;fillColor=none;strokeColor=#999999;align=left;spacing=15;fontSize=14;fontColor=#6C767D;');
			   	item5.geometry.relative = true;
			   	item5.geometry.offset = new mxPoint(0, 140);
			   	item5.vertex = true;
			   	var item6 = new mxCell('Check me out', new mxGeometry(0, 0, 10, 10), s + 'rrect;rSize=2;fillColor=#EDEDED;strokeColor=#999999;align=left;fontSize=14;fontColor=#000000;labelPosition=right;verticalLabelPosition=middle;verticalAlign=middle;spacingLeft=5;spacingTop=-2;gradientColor=#DEDEDE;');
			   	item6.geometry.relative = true;
			   	item6.geometry.offset = new mxPoint(0, 190);
			   	item6.vertex = true;
			   	var item7 = new mxCell('Sign in', new mxGeometry(0, 0, 70, 40), s + 'rrect;rSize=5;fillColor=#0085FC;strokeColor=none;align=center;fontSize=14;fontColor=#FFFFFF;');
			   	item7.geometry.relative = true;
			   	item7.geometry.offset = new mxPoint(0, 220);
			   	item7.vertex = true;
				
		   		return sb.createVertexTemplateFromCells([item1, item2, item3, item4, item5, item6, item7], 800, 500, 'Form');
			}),
						    
			this.addEntry(dt + 'form controls', function()
	   		{
			   	var item1 = new mxCell('Email address', new mxGeometry(0, 0, 260, 40), 'fillColor=none;strokeColor=none;align=left;fontSize=14;');
			   	item1.vertex = true;
			   	var item2 = new mxCell('name@example.com', new mxGeometry(0, 0, 800, 30), s + 'rrect;rSize=5;fillColor=none;strokeColor=#999999;align=left;spacing=15;fontSize=14;fontColor=#6C767D;');
			   	item2.geometry.relative = true;
			   	item2.geometry.offset = new mxPoint(0, 40);
			   	item2.vertex = true;
			   	var item3 = new mxCell('Example select', new mxGeometry(0, 0, 260, 40), 'fillColor=none;strokeColor=none;align=left;fontSize=14;');
			   	item3.geometry.relative = true;
			   	item3.geometry.offset = new mxPoint(0, 80);
			   	item3.vertex = true;
			   	var item4 = new mxCell('1', new mxGeometry(0, 0, 800, 30), s + 'rrect;rSize=5;fillColor=none;strokeColor=#999999;align=left;spacing=15;fontSize=14;fontColor=#6C767D;');
			   	item4.geometry.relative = true;
			   	item4.geometry.offset = new mxPoint(0, 120);
			   	item4.vertex = true;
			   	var item5 = new mxCell('Example multiple select', new mxGeometry(0, 0, 260, 40), 'fillColor=none;strokeColor=none;align=left;fontSize=14;');
			   	item5.geometry.relative = true;
			   	item5.geometry.offset = new mxPoint(0, 160);
			   	item5.vertex = true;
			   	var item6 = new mxCell('', new mxGeometry(0, 0, 800, 100), s + 'rrect;rSize=5;fillColor=none;strokeColor=#999999;align=left;spacing=15;fontSize=14;fontColor=#6C767D;');
			   	item6.geometry.relative = true;
			   	item6.geometry.offset = new mxPoint(0, 200);
			   	item6.vertex = true;
			   	var item7 = new mxCell('', new mxGeometry(1, 0, 20, 100), s + 'rightButton;rSize=5;fillColor=#F1F1F1;strokeColor=#999999;');
			   	item7.geometry.relative = true;
			   	item7.geometry.offset = new mxPoint(-20, 0);
			   	item7.vertex = true;
			   	item6.insert(item7);
			   	var item8 = new mxCell('', new mxGeometry(0, 0, 16, 45), 'fillColor=#C1C1C1;strokeColor=none;');
			   	item8.geometry.relative = true;
			   	item8.geometry.offset = new mxPoint(2, 20);
			   	item8.vertex = true;
			   	item7.insert(item8);
			   	var item9 = new mxCell('', new mxGeometry(0, 0, 10, 5), 'shape=triangle;direction=north;fillColor=#C1C1C1;strokeColor=none;perimeter=none;');
			   	item9.geometry.relative = true;
			   	item9.geometry.offset = new mxPoint(5, 7.5);
			   	item9.vertex = true;
			   	item7.insert(item9);
			   	var item10 = new mxCell('', new mxGeometry(0, 1, 10, 5), 'shape=triangle;direction=south;fillColor=#505050;strokeColor=none;perimeter=none;');
			   	item10.geometry.relative = true;
			   	item10.geometry.offset = new mxPoint(5, -12.5);
			   	item10.vertex = true;
			   	item7.insert(item10);
			   	var item11 = new mxCell('1', new mxGeometry(0, 0, 780, 20), 'fillColor=none;strokeColor=none;align=left;spacing=15;fontSize=14;fontColor=#6C767D;');
			   	item11.geometry.relative = true;
			   	item11.geometry.offset = new mxPoint(0, 10);
			   	item11.vertex = true;
			   	item6.insert(item11);
			   	var item12 = new mxCell('2', new mxGeometry(0, 0, 780, 20), 'fillColor=none;strokeColor=none;align=left;spacing=15;fontSize=14;fontColor=#6C767D;');
			   	item12.geometry.relative = true;
			   	item12.geometry.offset = new mxPoint(0, 30);
			   	item12.vertex = true;
			   	item6.insert(item12);
			   	var item13 = new mxCell('3', new mxGeometry(0, 0, 780, 20), 'fillColor=none;strokeColor=none;align=left;spacing=15;fontSize=14;fontColor=#6C767D;');
			   	item13.geometry.relative = true;
			   	item13.geometry.offset = new mxPoint(0, 50);
			   	item13.vertex = true;
			   	item6.insert(item13);
			   	var item14 = new mxCell('4', new mxGeometry(0, 0, 780, 20), 'fillColor=none;strokeColor=none;align=left;spacing=15;fontSize=14;fontColor=#6C767D;');
			   	item14.geometry.relative = true;
			   	item14.geometry.offset = new mxPoint(0, 70);
			   	item14.vertex = true;
			   	item6.insert(item14);
			   	var item15 = new mxCell('Example textarea', new mxGeometry(0, 0, 260, 40), 'fillColor=none;strokeColor=none;align=left;fontSize=14;');
			   	item15.geometry.relative = true;
			   	item15.geometry.offset = new mxPoint(0, 310);
			   	item15.vertex = true;
			   	var item16 = new mxCell('', new mxGeometry(0, 0, 800, 90), s + 'rrect;rSize=5;fillColor=none;strokeColor=#999999;align=left;spacing=15;fontSize=14;fontColor=#6C767D;');
			   	item16.geometry.relative = true;
			   	item16.geometry.offset = new mxPoint(0, 350);
			   	item16.vertex = true;
				
		   		return sb.createVertexTemplateFromCells([item1, item2, item3, item4, item5, item6, item15, item16], 800, 500, 'Form controls');
			}),
						    
			this.addEntry(dt + 'file input form', function()
	   		{
			   	var item1 = new mxCell('Example file input', new mxGeometry(0, 0, 150, 40), 'fillColor=none;strokeColor=none;align=left;fontSize=14;');
			   	item1.vertex = true;
			   	var item2 = new mxCell('Choose File', new mxGeometry(0, 40, 90, 30), 'fillColor=#FEFEFE;strokeColor=#AAAAAA;fontSize=14;gradientColor=#F0F0F0;');
			   	item2.vertex = true;
			   	var item3 = new mxCell('No file chosen', new mxGeometry(90, 40, 100, 30), 'fillColor=none;strokeColor=none;align=left;fontSize=14;spacing=5;');
			   	item3.vertex = true;
				
		   		return sb.createVertexTemplateFromCells([item1, item2, item3], 190, 70, 'File input form');
			}),
					
			this.addEntry(dt + 'large dropdown button', function()
	   		{
			   	var bg = new mxCell(
			   			'Large select', 
			   			new mxGeometry(0, 0, 800, 50), s + 'rrect;rSize=5;strokeColor=#505050;strokeWidth=1;fillColor=#ffffff;fontColor=#777777;whiteSpace=wrap;align=left;verticalAlign=middle;fontStyle=0;fontSize=18;spacing=20;');
			   	bg.vertex = true;
			   	var marker1 = new mxCell('', new mxGeometry(1, 0.5, 10, 5), 'shape=triangle;direction=south;fillColor=#495057;strokeColor=none;perimeter=none;');
			   	marker1.geometry.relative = true;
			   	marker1.geometry.offset = new mxPoint(-17, -2.5);
			   	marker1.vertex = true;
			   	bg.insert(marker1);
				
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Large dropdown button');
			}),
						    
			this.addEntry(dt + 'default size dropdown button', function()
	   		{
			   	var bg = new mxCell(
			   			'Default select', 
			   			new mxGeometry(0, 0, 800, 40), s + 'rrect;rSize=5;strokeColor=#505050;strokeWidth=1;fillColor=#ffffff;fontColor=#777777;whiteSpace=wrap;align=left;verticalAlign=middle;fontStyle=0;fontSize=14;spacingRight=0;spacing=17;');
			   	bg.vertex = true;
			   	var marker1 = new mxCell('', new mxGeometry(1, 0.5, 10, 5), 'shape=triangle;direction=south;fillColor=#495057;strokeColor=none;perimeter=none;');
			   	marker1.geometry.relative = true;
			   	marker1.geometry.offset = new mxPoint(-17, -2.5);
			   	marker1.vertex = true;
			   	bg.insert(marker1);
				
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Default size dropdown button');
			}),
						    
			this.addEntry(dt + 'small dropdown button', function()
	   		{
			   	var bg = new mxCell(
			   			'Small select', 
			   			new mxGeometry(0, 0, 800, 30), s + 'rrect;rSize=5;strokeColor=#505050;strokeWidth=1;fillColor=#ffffff;fontColor=#777777;whiteSpace=wrap;align=left;verticalAlign=middle;fontStyle=0;fontSize=12;spacing=15;');
			   	bg.vertex = true;
			   	var marker1 = new mxCell('', new mxGeometry(1, 0.5, 10, 5), 'shape=triangle;direction=south;fillColor=#495057;strokeColor=none;perimeter=none;');
			   	marker1.geometry.relative = true;
			   	marker1.geometry.offset = new mxPoint(-17, -2.5);
			   	marker1.vertex = true;
			   	bg.insert(marker1);
				
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Small dropdown button');
			}),
						    
			this.createVertexTemplateEntry(s + 'rrect;rSize=5;strokeColor=#CED4DA;strokeWidth=1;fillColor=#E9ECEF;fontColor=#505050;whiteSpace=wrap;align=left;verticalAlign=middle;spacingLeft=10;fontSize=14;', 
					800, 40, 'Readonly input here...', 'Readonly input', null, null, this.getTagsForStencil(gn, 'readonly input', dt + 'read only readonly input').join(' ')),
					
			this.addEntry(dt + 'readonly plain text', function()
	   		{
			   	var item1 = new mxCell(
			   			'Email', 
			   			new mxGeometry(0, 0, 150, 40), 'strokeColor=none;fillColor=none;fontColor=#777777;whiteSpace=wrap;align=left;verticalAlign=middle;fontStyle=0;fontSize=14;spacing=15;');
			   	item1.vertex = true;
			   	var item2 = new mxCell(
			   			'email@example.com', 
			   			new mxGeometry(150, 0, 150, 40), 'strokeColor=none;fillColor=none;fontColor=#777777;whiteSpace=wrap;align=left;verticalAlign=middle;fontStyle=0;fontSize=14;');
			   	item2.vertex = true;
			   	var item3 = new mxCell(
			   			'Password', 
			   			new mxGeometry(0, 50, 150, 40), 'strokeColor=none;fillColor=none;fontColor=#777777;whiteSpace=wrap;align=left;verticalAlign=middle;fontStyle=0;fontSize=14;spacing=15;');
			   	item3.vertex = true;
			   	var item4 = new mxCell(
			   			'', 
			   			new mxGeometry(150, 50, 650, 40), s + 'rrect;rSize=5;strokeColor=#999999;fillColor=#ffffff;fontColor=#777777;whiteSpace=wrap;align=left;verticalAlign=middle;fontStyle=0;fontSize=14;spacing=15;');
			   	item4.vertex = true;
				
		   		return sb.createVertexTemplateFromCells([item1, item2, item3, item4], 800, 90, 'Readonly plain text');
			}),
						    
			this.addEntry(dt + 'readonly plain text', function()
	   		{
			   	var item1 = new mxCell(
			   			'email@example.com', 
			   			new mxGeometry(0, 0, 150, 40), 'strokeColor=none;fillColor=none;fontColor=#777777;whiteSpace=wrap;align=left;verticalAlign=middle;fontStyle=0;fontSize=14;');
			   	item1.vertex = true;
			   	var item2 = new mxCell(
			   			'Password', 
			   			new mxGeometry(150, 0, 200, 40), s + 'rrect;rSize=5;strokeColor=#999999;fillColor=#ffffff;fontColor=#777777;whiteSpace=wrap;align=left;verticalAlign=middle;fontStyle=0;fontSize=14;spacing=15;');
			   	item2.vertex = true;
			   	var item3 = new mxCell(
			   			'Confirm identity', 
			   			new mxGeometry(360, 0, 125, 40), s + 'rrect;rSize=5;strokeColor=none;fillColor=#0085FC;fontColor=#ffffff;whiteSpace=wrap;align=center;verticalAlign=middle;fontStyle=0;fontSize=14;spacing=14;');
			   	item3.vertex = true;
				
		   		return sb.createVertexTemplateFromCells([item1, item2, item3], 485, 40, 'Readonly plain text');
			}),
						    
			this.createVertexTemplateEntry(s + 'rangeInput;dx=0.78;strokeColor=#9D968E;fillColor=#E3DDD8;fontColor=#777777;whiteSpace=wrap;align=left;verticalAlign=bottom;fontStyle=0;fontSize=14;labelPosition=center;verticalLabelPosition=top;gradientColor=#F4F2EF;gradientDirection=north;rangeStyle=rect;handleStyle=rect;', 
					800, 20, 'Example range input', 'Range input', null, null, this.getTagsForStencil(gn, 'range input', dt + 'range input').join(' ')),

			this.addEntry(dt + 'stacked checkboxes', function()
	   		{
			   	var item1 = new mxCell(
			   			'Default checkbox', 
			   			new mxGeometry(0, 0, 10, 10), s + 'checkbox2;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=middle;gradientColor=#DEDEDE;fillColor=#EDEDED;checked=1;spacing=5;checkedFill=#0085FC;checkedStroke=#ffffff;sketch=0;');
			   	item1.vertex = true;
			   	var item2 = new mxCell(
			   			'Disabled checkbox', 
			   			new mxGeometry(0, 20, 10, 10), s + 'checkbox2;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=middle;gradientColor=#DEDEDE;fillColor=#EDEDED;checked=0;spacing=5;fontColor=#6C767D;checkedFill=#0085FC;checkedStroke=#ffffff;sketch=0;');
			   	item2.vertex = true;
				
		   		return sb.createVertexTemplateFromCells([item1, item2], 150, 30, 'Stacked checkboxes');
			}),
						    
			this.addEntry(dt + 'stacked radio buttons', function()
	   		{
			   	var item1 = new mxCell(
			   			'Default radio', 
			   			new mxGeometry(0, 0, 10, 10), s + 'radioButton2;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=middle;gradientColor=#DEDEDE;fillColor=#EDEDED;checked=1;spacing=5;checkedFill=#0085FC;checkedStroke=#ffffff;sketch=0;');
			   	item1.vertex = true;
			   	var item2 = new mxCell(
			   			'Second default radio', 
			   			new mxGeometry(0, 20, 10, 10), s + 'radioButton2;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=middle;gradientColor=#DEDEDE;fillColor=#EDEDED;checked=0;spacing=5;checkedFill=#0085FC;checkedStroke=#ffffff;sketch=0;');
			   	item2.vertex = true;
			   	var item3 = new mxCell(
			   			'Disabled radio', 
			   			new mxGeometry(0, 40, 10, 10), s + 'radioButton2;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=middle;gradientColor=#DEDEDE;fillColor=#EDEDED;checked=0;spacing=5;fontColor=#6C767D;checkedFill=#0085FC;checkedStroke=#ffffff;sketch=0;');
			   	item3.vertex = true;
				
		   		return sb.createVertexTemplateFromCells([item1, item2, item3], 150, 50, 'Stacked radio buttons');
			}),
						    
			this.addEntry(dt + 'inline checkboxes', function()
	   		{
			   	var item1 = new mxCell(
			   			'1', 
			   			new mxGeometry(0, 0, 10, 10), s + 'checkbox2;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=middle;gradientColor=#DEDEDE;fillColor=#EDEDED;checked=0;spacing=5;checkedFill=#0085FC;checkedStroke=#ffffff;');
			   	item1.vertex = true;
			   	var item2 = new mxCell(
			   			'2', 
			   			new mxGeometry(50, 0, 10, 10), s + 'checkbox2;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=middle;gradientColor=#DEDEDE;fillColor=#EDEDED;checked=0;spacing=5;checkedFill=#0085FC;checkedStroke=#ffffff;');
			   	item2.vertex = true;
			   	var item3 = new mxCell(
			   			'(disabled)', 
			   			new mxGeometry(100, 0, 10, 10), s + 'checkbox2;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=middle;gradientColor=#DEDEDE;fillColor=#EDEDED;checked=0;strokeColor=#D0D0D0;spacing=5;fontColor=#6C767D;checkedFill=#0085FC;checkedStroke=#ffffff;');
			   	item3.vertex = true;
				
		   		return sb.createVertexTemplateFromCells([item1, item2, item3], 150, 10, 'Inline checkboxes');
			}),
						    
			this.addEntry(dt + 'inline radio buttons', function()
	   		{
			   	var item1 = new mxCell(
			   			'1', 
			   			new mxGeometry(0, 0, 10, 10), s + 'radioButton2;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=middle;gradientColor=#DEDEDE;fillColor=#EDEDED;checked=0;spacing=5;checkedFill=#0085FC;checkedStroke=#ffffff;');
			   	item1.vertex = true;
			   	var item2 = new mxCell(
			   			'2', 
			   			new mxGeometry(50, 0, 10, 10), s + 'radioButton2;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=middle;gradientColor=#DEDEDE;fillColor=#EDEDED;checked=0;spacing=5;checkedFill=#0085FC;checkedStroke=#ffffff;');
			   	item2.vertex = true;
			   	var item3 = new mxCell(
			   			'(disabled)', 
			   			new mxGeometry(100, 0, 10, 10), s + 'radioButton2;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=middle;gradientColor=#DEDEDE;fillColor=#EDEDED;checked=0;strokeColor=#D0D0D0;spacing=5;fontColor=#6C767D;checkedFill=#0085FC;checkedStroke=#ffffff;');
			   	item3.vertex = true;
				
		   		return sb.createVertexTemplateFromCells([item1, item2, item3], 150, 10, 'Inline radio buttons');
			}),
						    
			this.createVertexTemplateEntry(s + 'checkbox2;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=middle;gradientColor=#DEDEDE;fillColor=#EDEDED;checked=0;spacing=5;checkedFill=#0085FC;checkedStroke=#ffffff;sketch=0;', 
					10, 10, '', 'Checkbox without label', null, null, this.getTagsForStencil(gn, 'checkbox without label', dt + 'checkbox without no label').join(' ')),
					
			this.createVertexTemplateEntry(s + 'radioButton2;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=middle;gradientColor=#DEDEDE;fillColor=#EDEDED;checked=0;spacing=5;checkedFill=#0085FC;checkedStroke=#ffffff;sketch=0;', 
					10, 10, '', 'Radio button without label', null, null, this.getTagsForStencil(gn, 'radio button without label', dt + 'radio button without no label').join(' ')),
					
			this.addEntry(dt + 'form groups', function()
	   		{
			   	var item1 = new mxCell('Example label', new mxGeometry(0, 0, 260, 40), 'fillColor=none;strokeColor=none;align=left;fontSize=14;fontColor=#212529;');
			   	item1.vertex = true;
			   	var item2 = new mxCell('Example input placeholder', new mxGeometry(0, 0, 800, 30), s + 'rrect;rSize=5;fillColor=none;strokeColor=#999999;align=left;spacing=15;fontSize=14;fontColor=#6C767D;');
			   	item2.geometry.relative = true;
			   	item2.geometry.offset = new mxPoint(0, 40);
			   	item2.vertex = true;
			   	var item3 = new mxCell('Another label', new mxGeometry(0, 0, 260, 40), 'fillColor=none;strokeColor=none;align=left;fontSize=14;fontColor=#212529;');
			   	item3.geometry.relative = true;
			   	item3.geometry.offset = new mxPoint(0, 80);
			   	item3.vertex = true;
			   	var item4 = new mxCell('Another input placeholder', new mxGeometry(0, 0, 800, 30), s + 'rrect;rSize=5;fillColor=none;strokeColor=#999999;align=left;spacing=15;fontSize=14;fontColor=#6C767D;');
			   	item4.geometry.relative = true;
			   	item4.geometry.offset = new mxPoint(0, 120);
			   	item4.vertex = true;
				
		   		return sb.createVertexTemplateFromCells([item1, item2, item3, item4], 800, 150, 'Form groups');
			}),
						    
			this.addEntry(dt + 'form grid', function()
	   		{
			   	var item1 = new mxCell('First name', new mxGeometry(0, 0, 390, 30), s + 'rrect;rSize=5;fillColor=none;strokeColor=#999999;align=left;spacing=15;fontSize=14;fontColor=#6C767D;');
			   	item1.vertex = true;
			   	var item2 = new mxCell('Last name', new mxGeometry(410, 0, 390, 30), s + 'rrect;rSize=5;fillColor=none;strokeColor=#999999;align=left;spacing=15;fontSize=14;fontColor=#6C767D;');
			   	item2.vertex = true;
				
		   		return sb.createVertexTemplateFromCells([item1, item2], 800, 30, 'Form grid');
			}),
						    
			this.addEntry(dt + 'grid layout', function()
	   		{
			   	var item1 = new mxCell('Email', new mxGeometry(0, 0, 400, 30), 'fillColor=none;strokeColor=none;align=left;fontSize=14;fontColor=#212529;');
			   	item1.vertex = true;
			   	var item2 = new mxCell('', new mxGeometry(0, 30, 395, 30), s + 'rrect;rSize=5;fillColor=none;strokeColor=#999999;align=left;spacing=15;fontSize=14;fontColor=#6C767D;');
			   	item2.vertex = true;
			   	var item3 = new mxCell('Password', new mxGeometry(400, 0, 400, 30), 'fillColor=none;strokeColor=none;align=left;fontSize=14;fontColor=#212529;');
			   	item3.vertex = true;
			   	var item4 = new mxCell('', new mxGeometry(405, 30, 395, 30), s + 'rrect;rSize=5;fillColor=none;strokeColor=#999999;align=left;spacing=15;fontSize=14;fontColor=#6C767D;');
			   	item4.vertex = true;
			   	var item5 = new mxCell('Address', new mxGeometry(0, 70, 390, 30), 'fillColor=none;strokeColor=none;align=left;fontSize=14;fontColor=#212529;');
			   	item5.vertex = true;
			   	var item6 = new mxCell('1234 Main St', new mxGeometry(0, 100, 800, 30), s + 'rrect;rSize=5;fillColor=none;strokeColor=#999999;align=left;spacing=15;fontSize=14;fontColor=#6C767D;');
			   	item6.vertex = true;
			   	var item7 = new mxCell('Address 2', new mxGeometry(0, 140, 390, 30), 'fillColor=none;strokeColor=none;align=left;fontSize=14;fontColor=#212529;');
			   	item7.vertex = true;
			   	var item8 = new mxCell('Apartment, studio or floor', new mxGeometry(0, 170, 800, 30), s + 'rrect;rSize=5;fillColor=none;strokeColor=#999999;align=left;spacing=15;fontSize=14;fontColor=#6C767D;');
			   	item8.vertex = true;
			   	var item9 = new mxCell('City', new mxGeometry(0, 210, 390, 30), 'fillColor=none;strokeColor=none;align=left;fontSize=14;fontColor=#212529;');
			   	item9.vertex = true;
			   	var item10 = new mxCell('', new mxGeometry(0, 240, 390, 30), s + 'rrect;rSize=5;fillColor=none;strokeColor=#999999;align=left;spacing=15;fontSize=14;fontColor=#6C767D;');
			   	item10.vertex = true;
			   	var item11 = new mxCell('State', new mxGeometry(410, 210, 220, 30), 'fillColor=none;strokeColor=none;align=left;fontSize=14;fontColor=#212529;');
			   	item11.vertex = true;
			   	var item12 = new mxCell('Choose...', new mxGeometry(410, 240, 270, 30), s + 'rrect;rSize=5;fillColor=none;strokeColor=#999999;align=left;spacing=15;fontSize=14;fontColor=#6C767D;');
			   	item12.vertex = true;
			   	var marker1 = new mxCell('', new mxGeometry(1, 0.5, 10, 5), 'shape=triangle;direction=south;fillColor=#212529;strokeColor=none;perimeter=none;');
			   	marker1.geometry.relative = true;
			   	marker1.geometry.offset = new mxPoint(-17, -2.5);
			   	marker1.vertex = true;
			   	item12.insert(marker1);
			   	var item13 = new mxCell('Zip', new mxGeometry(700, 210, 100, 30), 'fillColor=none;strokeColor=none;align=left;fontSize=14;fontColor=#212529;');
			   	item13.vertex = true;
			   	var item14 = new mxCell('', new mxGeometry(700, 240, 100, 30), s + 'rrect;rSize=5;fillColor=none;strokeColor=#999999;align=left;spacing=15;fontSize=14;fontColor=#6C767D;');
			   	item14.vertex = true;
			   	var item15 = new mxCell(
			   			'Check me out', 
			   			new mxGeometry(0, 290, 10, 10), s + 'checkbox2;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=middle;gradientColor=#DEDEDE;fillColor=#EDEDED;checked=0;spacing=5;strokeColor=#999999;fontColor=#212529;checkedFill=#0085FC;checkedStroke=#ffffff;');
			   	item15.vertex = true;
			   	var item16 = new mxCell('Sign in', new mxGeometry(0, 320, 70, 40), s + 'rrect;rSize=5;fillColor=#0085FC;strokeColor=none;align=center;fontSize=14;fontColor=#FFFFFF;');
			   	item16.vertex = true;
			   	
		   		return sb.createVertexTemplateFromCells([item1, item2, item3, item4, item5, item6, item7, item8, item9, item10, item11, item12, item13, item14, item15, item16], 800, 360, 'Grid layout');
			}),
						    
			this.addEntry(dt + 'horizontal form', function()
	   		{
			   	var item1 = new mxCell('Email', new mxGeometry(0, 0, 200, 30), 'fillColor=none;strokeColor=none;align=left;fontSize=14;fontColor=#212529;');
			   	item1.vertex = true;
			   	var item2 = new mxCell('', new mxGeometry(200, 0, 600, 30), s + 'rrect;rSize=5;fillColor=none;strokeColor=#999999;align=left;spacing=15;fontSize=14;fontColor=#6C767D;');
			   	item2.vertex = true;
			   	var item3 = new mxCell('Password', new mxGeometry(0, 40, 200, 30), 'fillColor=none;strokeColor=none;align=left;fontSize=14;fontColor=#212529;');
			   	item3.vertex = true;
			   	var item4 = new mxCell('', new mxGeometry(200, 40, 600, 30), s + 'rrect;rSize=5;fillColor=none;strokeColor=#999999;align=left;spacing=15;fontSize=14;fontColor=#6C767D;');
			   	item4.vertex = true;
			   	var item5 = new mxCell('Radios', new mxGeometry(0, 80, 200, 30), 'fillColor=none;strokeColor=none;align=left;fontSize=14;fontColor=#212529;');
			   	item5.vertex = true;
			   	var item6 = new mxCell(
			   			'First radio', 
			   			new mxGeometry(200, 90, 10, 10), s + 'radioButton2;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=middle;gradientColor=#DEDEDE;fillColor=#EDEDED;strokeColor=#666666;checked=1;spacing=5;fontColor=#212529;checkedFill=#0085FC;checkedStroke=#ffffff;sketch=0;');
			   	item6.vertex = true;
			   	var item7 = new mxCell(
			   			'Second radio', 
			   			new mxGeometry(200, 110, 10, 10), s + 'radioButton2;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=middle;gradientColor=#DEDEDE;fillColor=#EDEDED;strokeColor=#666666;checked=0;spacing=5;fontColor=#212529;checkedFill=#0085FC;checkedStroke=#ffffff;sketch=0;');
			   	item7.vertex = true;
			   	var item8 = new mxCell(
			   			'Third disabled radio', 
			   			new mxGeometry(200, 130, 10, 10), s + 'radioButton2;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=middle;gradientColor=#DEDEDE;fillColor=#EDEDED;strokeColor=#D2D2D2;checked=0;spacing=5;fontColor=#7D868C;checkedFill=#0085FC;checkedStroke=#ffffff;sketch=0;');
			   	item8.vertex = true;
			   	var item9 = new mxCell('Checkbox', new mxGeometry(0, 160, 200, 30), 'fillColor=none;strokeColor=none;align=left;fontSize=14;fontColor=#212529;');
			   	item9.vertex = true;
			   	var item10 = new mxCell(
			   			'Example checkbox', 
			   			new mxGeometry(200, 170, 10, 10), s + 'checkbox2;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=middle;gradientColor=#DEDEDE;fillColor=#EDEDED;strokeColor=#666666;checked=1;spacing=5;fontColor=#212529;checkedFill=#0085FC;checkedStroke=#ffffff;sketch=0;');
			   	item10.vertex = true;
			   	var item11 = new mxCell('Sign in', new mxGeometry(0, 200, 70, 40), s + 'rrect;rSize=5;fillColor=#0085FC;strokeColor=none;align=center;fontSize=14;fontColor=#FFFFFF;sketch=0;');
			   	item11.vertex = true;
			   	
		   		return sb.createVertexTemplateFromCells([item1, item2, item3, item4, item5, item6, item7, item8, item9, item10, item11], 800, 200, 'Horizontal form');
			}),
						    
			this.addEntry(dt + 'horizontal form label sizing', function()
	   		{
			   	var item1 = new mxCell('Email', new mxGeometry(0, 0, 200, 20), 'fillColor=none;strokeColor=none;align=left;fontSize=12;fontColor=#212529;');
			   	item1.vertex = true;
			   	var item2 = new mxCell('col-form-label-sm', new mxGeometry(200, 0, 600, 20), s + 'rrect;rSize=5;fillColor=none;strokeColor=#999999;align=left;spacing=15;fontSize=12;fontColor=#6C767D;');
			   	item2.vertex = true;
			   	
			   	var item3 = new mxCell('Email', new mxGeometry(0, 35, 200, 30), 'fillColor=none;strokeColor=none;align=left;fontSize=14;fontColor=#212529;');
			   	item3.vertex = true;
			   	var item4 = new mxCell('col-form-label', new mxGeometry(200, 35, 600, 30), s + 'rrect;rSize=5;fillColor=none;strokeColor=#999999;align=left;spacing=15;fontSize=14;fontColor=#6C767D;');
			   	item4.vertex = true;

			   	var item5 = new mxCell('Email', new mxGeometry(0, 80, 200, 40), 'fillColor=none;strokeColor=none;align=left;fontSize=16;fontColor=#212529;');
			   	item5.vertex = true;
			   	var item6 = new mxCell('col-form-label-lg', new mxGeometry(200, 80, 600, 40), s + 'rrect;rSize=5;fillColor=none;strokeColor=#999999;align=left;spacing=15;fontSize=16;fontColor=#6C767D;');
			   	item6.vertex = true;

			   	return sb.createVertexTemplateFromCells([item1, item2, item3, item4, item5, item6], 800, 110, 'Horizontal form label sizing');
			}),
						    
			this.addEntry(dt + 'inline form', function()
	   		{
			   	var item1 = new mxCell('Jane Doe', new mxGeometry(0, 0, 200, 30), s + 'rrect;rSize=5;fillColor=#ffffff;strokeColor=#999999;align=left;spacing=15;fontSize=14;fontColor=#6C767D;');
			   	item1.vertex = true;
			   	var item2 = new mxCell('Username', new mxGeometry(210, 0, 200, 30), s + 'rrect;rSize=5;fillColor=#ffffff;strokeColor=#999999;align=left;spacingLeft=50;fontSize=14;fontColor=#6C767D;');
			   	item2.vertex = true;
			   	var item3 = new mxCell('@', new mxGeometry(0, 0, 40, 30), s + 'leftButton;rSize=5;strokeColor=#999999;fillColor=#f0f0f0;whiteSpace=wrap;resizeHeight=1;');
			   	item3.geometry.relative = true;
			   	item3.vertex = true;
			   	item2.insert(item3);
			   	var item4 = new mxCell(
			   			'Remember me', 
			   			new mxGeometry(420, 10, 10, 10), s + 'checkbox2;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=middle;gradientColor=#DEDEDE;fillColor=#EDEDED;strokeColor=#A6A6A6;checked=0;spacing=5;checkedFill=#0085FC;checkedStroke=#ffffff;');
			   	item4.vertex = true;
			   	var item5 = new mxCell('Submit', new mxGeometry(530, 0, 60, 30), s + 'rrect;rSize=5;fillColor=#0085FC;strokeColor=none;align=center;spacing=15;fontSize=14;fontColor=#ffffff;');
			   	item5.vertex = true;
			   	
			   	return sb.createVertexTemplateFromCells([item1, item2, item4, item5], 590, 30, 'Inline form');
			}),
						    
			this.addEntry(dt + 'inline form', function()
	   		{
			   	var item1 = new mxCell('Choose...', new mxGeometry(0, 0, 100, 30), s + 'rrect;rSize=5;fillColor=#ffffff;strokeColor=#999999;align=left;spacing=15;fontSize=14;fontColor=#6C767D;');
			   	item1.vertex = true;
			   	var marker1 = new mxCell('', new mxGeometry(1, 0.5, 7, 3), 'shape=triangle;direction=south;fillColor=#343A40;strokeColor=none;perimeter=none;sketch=0;');
			   	marker1.geometry.relative = true;
			   	marker1.geometry.offset = new mxPoint(-17, 1);
			   	marker1.vertex = true;
			   	item1.insert(marker1);
			   	var marker2 = new mxCell('', new mxGeometry(1, 0.5, 7, 3), 'shape=triangle;direction=north;fillColor=#343A40;strokeColor=none;perimeter=none;sketch=0;');
			   	marker2.geometry.relative = true;
			   	marker2.geometry.offset = new mxPoint(-17, -4);
			   	marker2.vertex = true;
			   	item1.insert(marker2);
			   	
			   	var item2 = new mxCell(
			   			'Remember my preference', 
			   			new mxGeometry(110, 10, 10, 10), s + 'checkbox2;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=middle;gradientColor=#DEDEDE;fillColor=#EDEDED;strokeColor=#A6A6A6;checked=0;spacing=5;checkedFill=#0085FC;checkedStroke=#ffffff;');
			   	item2.vertex = true;
			   	var item3 = new mxCell('Submit', new mxGeometry(280, 0, 60, 30), s + 'rrect;rSize=5;fillColor=#0085FC;strokeColor=none;align=center;spacing=15;fontSize=14;fontColor=#ffffff;sketch=0;');
			   	item3.vertex = true;
			   	
			   	return sb.createVertexTemplateFromCells([item1, item2, item3], 340, 30, 'Inline form');
			}),
						    
			this.addEntry(dt + 'help text', function()
	   		{
			   	var item1 = new mxCell('Password', new mxGeometry(0, 0, 260, 40), 'fillColor=none;strokeColor=none;align=left;fontSize=14;');
			   	item1.vertex = true;
			   	var item2 = new mxCell('', new mxGeometry(0, 40, 800, 30), s + 'rrect;rSize=5;fillColor=none;strokeColor=#999999;align=left;spacing=15;fontSize=14;fontColor=#6C767D;');
			   	item2.vertex = true;
			   	var item3 = new mxCell('Your password must be 8-20 characters long, contain letters and numbers and must not contain spaces, special characters or emoji.', 
			   			new mxGeometry(0, 70, 260, 30), 'fillColor=none;strokeColor=none;align=left;spacing=2;fontSize=12;fontColor=#999999;');
			   	item3.vertex = true;
				
		   		return sb.createVertexTemplateFromCells([item1, item2, item3], 800, 100, 'Help text');
			}),
						    
			this.addEntry(dt + 'help text', function()
	   		{
			   	var item1 = new mxCell('Password', new mxGeometry(0, 0, 70, 40), 'fillColor=none;strokeColor=none;align=left;fontSize=14;');
			   	item1.vertex = true;
			   	var item2 = new mxCell('', new mxGeometry(80, 0, 200, 40), s + 'rrect;rSize=5;fillColor=none;strokeColor=#999999;align=left;spacing=15;fontSize=14;fontColor=#6C767D;');
			   	item2.vertex = true;
			   	var item3 = new mxCell('Must be 8-20 characters long.', 
			   			new mxGeometry(290, 0, 170, 40), 'fillColor=none;strokeColor=none;align=left;spacing=2;fontSize=12;fontColor=#999999;');
			   	item3.vertex = true;
				
		   		return sb.createVertexTemplateFromCells([item1, item2, item3], 460, 40, 'Help text');
			}),
						    
			this.addEntry(dt + 'help text', function()
	   		{
			   	var item1 = new mxCell('Disabled input', new mxGeometry(0, 0, 100, 30), 'fillColor=none;strokeColor=none;align=left;fontSize=14;');
			   	item1.vertex = true;
			   	var item2 = new mxCell('Disabled input', new mxGeometry(0, 30, 800, 40), s + 'rrect;rSize=5;fillColor=#E9ECEF;strokeColor=#CED4DA;align=left;spacing=15;fontSize=14;fontColor=#6C767D;');
			   	item2.vertex = true;
			   	var item3 = new mxCell('Disabled select menu', new mxGeometry(0, 80, 100, 30), 'fillColor=none;strokeColor=none;align=left;fontSize=14;');
			   	item3.vertex = true;
			   	var item4 = new mxCell('Disabled select', new mxGeometry(0, 110, 800, 40), s + 'rrect;rSize=5;fillColor=#E9ECEF;strokeColor=#CED4DA;align=left;spacing=15;fontSize=14;fontColor=#6C767D;');
			   	item4.vertex = true;
			   	var marker1 = new mxCell('', new mxGeometry(1, 0.5, 7, 3), 'shape=triangle;direction=south;fillColor=#343A40;strokeColor=none;perimeter=none;');
			   	marker1.geometry.relative = true;
			   	marker1.geometry.offset = new mxPoint(-17, 1);
			   	marker1.vertex = true;
			   	item4.insert(marker1);
			   	var item5 = new mxCell(
			   			'Can\'t check this', 
			   			new mxGeometry(0, 170, 10, 10), s + 'checkbox2;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=middle;gradientColor=#DEDEDE;fillColor=#EDEDED;strokeColor=#A6A6A6;checked=0;spacing=5;fontColor=#6C767D;checkedFill=#0085FC;checkedStroke=#ffffff;');
			   	item5.vertex = true;
			   	var item6 = new mxCell('Submit', new mxGeometry(0, 200, 70, 40), s + 'rrect;rSize=5;fillColor=#0085FC;strokeColor=none;align=center;spacing=15;fontSize=14;fontColor=#ffffff;');
			   	item6.vertex = true;
				
		   		return sb.createVertexTemplateFromCells([item1, item2, item3, item4, item5, item6], 800, 240, 'Help text');
			}),
						    
			this.addEntry(dt + 'custom styles', function()
	   		{
			   	var item1 = new mxCell('First name', new mxGeometry(0, 0, 100, 30), 'fillColor=none;strokeColor=none;align=left;fontSize=14;');
			   	item1.vertex = true;
			   	var item2 = new mxCell('Mark', new mxGeometry(0, 30, 260, 40), s + 'rrect;rSize=5;fillColor=#ffffff;strokeColor=#CED4DA;align=left;spacing=15;fontSize=14;fontColor=#6C767D;');
			   	item2.vertex = true;
			   	var item3 = new mxCell('Last name', new mxGeometry(270, 0, 100, 30), 'fillColor=none;strokeColor=none;align=left;fontSize=14;');
			   	item3.vertex = true;
			   	var item4 = new mxCell('Otto', new mxGeometry(270, 30, 260, 40), s + 'rrect;rSize=5;fillColor=#ffffff;strokeColor=#CED4DA;align=left;spacing=15;fontSize=14;fontColor=#6C767D;');
			   	item4.vertex = true;
			   	
			   	var item5 = new mxCell('Username', new mxGeometry(540, 0, 100, 30), 'fillColor=none;strokeColor=none;align=left;fontSize=14;');
			   	item5.vertex = true;
			   	var item6 = new mxCell('', new mxGeometry(540, 30, 260, 40), s + 'rrect;rSize=5;fillColor=#ffffff;strokeColor=#CED4DA;align=left;spacingLeft=50;fontSize=14;fontColor=#6C767D;');
			   	item6.vertex = true;
			   	var item7 = new mxCell('@', new mxGeometry(0, 0, 40, 40), s + 'leftButton;rSize=5;strokeColor=#CED4DA;fillColor=#f0f0f0;whiteSpace=wrap;resizeHeight=1;fontColor=#495057;');
			   	item7.geometry.relative = true;
			   	item7.vertex = true;
			   	item6.insert(item7);

			   	var item8 = new mxCell('City', new mxGeometry(0, 80, 100, 30), 'fillColor=none;strokeColor=none;align=left;fontSize=14;');
			   	item8.vertex = true;
			   	var item9 = new mxCell('', new mxGeometry(0, 110, 390, 40), s + 'rrect;rSize=5;fillColor=#ffffff;strokeColor=#CED4DA;align=left;spacing=15;fontSize=14;fontColor=#6C767D;');
			   	item9.vertex = true;
			   	var item10 = new mxCell('State', new mxGeometry(400, 80, 100, 30), 'fillColor=none;strokeColor=none;align=left;fontSize=14;');
			   	item10.vertex = true;
			   	var item11 = new mxCell('Choose...', new mxGeometry(400, 110, 200, 40), s + 'rrect;rSize=5;fillColor=#ffffff;strokeColor=#CED4DA;align=left;spacing=15;fontSize=14;fontColor=#6C767D;');
			   	item11.vertex = true;
			   	var marker1 = new mxCell('', new mxGeometry(1, 0.5, 7, 3), 'shape=triangle;direction=south;fillColor=#343A40;strokeColor=none;perimeter=none;');
			   	marker1.geometry.relative = true;
			   	marker1.geometry.offset = new mxPoint(-17, 1);
			   	marker1.vertex = true;
			   	item11.insert(marker1);
			   	var marker2 = new mxCell('', new mxGeometry(1, 0.5, 7, 3), 'shape=triangle;direction=north;fillColor=#343A40;strokeColor=none;perimeter=none;');
			   	marker2.geometry.relative = true;
			   	marker2.geometry.offset = new mxPoint(-17, -4);
			   	marker2.vertex = true;
			   	item11.insert(marker2);
			   	var item12 = new mxCell('Zip', new mxGeometry(610, 80, 190, 30), 'fillColor=none;strokeColor=none;align=left;fontSize=14;');
			   	item12.vertex = true;
			   	var item13 = new mxCell('', new mxGeometry(610, 110, 190, 40), s + 'rrect;rSize=5;fillColor=#ffffff;strokeColor=#CED4DA;align=left;spacing=15;fontSize=14;fontColor=#6C767D;');
			   	item13.vertex = true;
			   	
			   	var item14 = new mxCell(
			   			'Agree to term and conditions', 
			   			new mxGeometry(0, 170, 10, 10), s + 'checkbox2;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=middle;gradientColor=#DEDEDE;fillColor=#EDEDED;strokeColor=#A6A6A6;checked=0;spacing=5;checkedFill=#0085FC;checkedStroke=#ffffff;');
			   	item14.vertex = true;
				
			   	var item15 = new mxCell('Submit form', new mxGeometry(0, 200, 120, 40), s + 'rrect;rSize=5;fillColor=#0085FC;strokeColor=none;align=center;spacing=15;fontSize=14;fontColor=#ffffff;');
			   	item15.vertex = true;
			   	
		   		return sb.createVertexTemplateFromCells([item1, item2, item3, item4, item5, item6, item8, item9, item10, item11, item12, item13, item14, item15], 800, 240, 'Help text');
			}),
						    
			this.createVertexTemplateEntry(s + 'switch;strokeColor=#ADB6BD;strokeWidth=1;fillColor=#ffffff;fontColor=#212529;onStrokeColor=#ffffff;onFillColor=#0085FC;align=left;verticalAlign=middle;spacingLeft=10;labelPosition=right;verticalLabelPosition=middle;buttonState=0;sketch=0;', 
					20, 10, 'Toggle this switch element', 'Switch', null, null, this.getTagsForStencil(gn, 'switch', dt + 'switch').join(' ')),
			this.createVertexTemplateEntry(s + 'switch;strokeColor=#ADB6BD;strokeWidth=1;fillColor=#E9ECEF;fontColor=#7D868C;onStrokeColor=#ffffff;onFillColor=#0085FC;align=left;verticalAlign=middle;spacingLeft=10;labelPosition=right;verticalLabelPosition=middle;buttonState=0;sketch=0;', 
					20, 10, 'Disabled switch element', 'Switch', null, null, this.getTagsForStencil(gn, 'switch', dt + 'switch').join(' ')),
					
			this.addEntry(dt + 'select menu', function()
	   		{
			   	var item1 = new mxCell('Open this select menu', new mxGeometry(0, 0, 800, 40), s + 'rrect;rSize=5;fillColor=#ffffff;strokeColor=#CED4DA;align=left;spacing=15;fontSize=14;fontColor=#6C767D;');
			   	item1.vertex = true;
			   	var marker1 = new mxCell('', new mxGeometry(1, 0.5, 7, 3), 'shape=triangle;direction=south;fillColor=#343A40;strokeColor=none;perimeter=none;');
			   	marker1.geometry.relative = true;
			   	marker1.geometry.offset = new mxPoint(-17, 1);
			   	marker1.vertex = true;
			   	item1.insert(marker1);
			   	var marker2 = new mxCell('', new mxGeometry(1, 0.5, 7, 3), 'shape=triangle;direction=north;fillColor=#343A40;strokeColor=none;perimeter=none;');
			   	marker2.geometry.relative = true;
			   	marker2.geometry.offset = new mxPoint(-17, -4);
			   	marker2.vertex = true;
			   	item1.insert(marker2);
			   	
		   		return sb.createVertexTemplateFromCells([item1], 800, 40, 'Select menu');
			}),
						    
			this.addEntry(dt + 'form controls', function()
	   		{
			   	var item1 = new mxCell('', new mxGeometry(0, 0, 800, 100), s + 'rrect;rSize=5;fillColor=none;strokeColor=#999999;align=left;spacing=15;fontSize=14;fontColor=#6C767D;');
			   	item1.vertex = true;
			   	var item2 = new mxCell('', new mxGeometry(1, 0, 20, 100), s + 'rightButton;rSize=5;fillColor=#F1F1F1;strokeColor=#999999;');
			   	item2.geometry.relative = true;
			   	item2.geometry.offset = new mxPoint(-20, 0);
			   	item2.vertex = true;
			   	item1.insert(item2);
			   	var item3 = new mxCell('', new mxGeometry(0, 0, 16, 45), 'fillColor=#C1C1C1;strokeColor=none;');
			   	item3.geometry.relative = true;
			   	item3.geometry.offset = new mxPoint(2, 20);
			   	item3.vertex = true;
			   	item2.insert(item3);
			   	var item4 = new mxCell('', new mxGeometry(0, 0, 10, 5), 'shape=triangle;direction=north;fillColor=#C1C1C1;strokeColor=none;perimeter=none;');
			   	item4.geometry.relative = true;
			   	item4.geometry.offset = new mxPoint(5, 7.5);
			   	item4.vertex = true;
			   	item2.insert(item4);
			   	var item5 = new mxCell('', new mxGeometry(0, 1, 10, 5), 'shape=triangle;direction=south;fillColor=#505050;strokeColor=none;perimeter=none;');
			   	item5.geometry.relative = true;
			   	item5.geometry.offset = new mxPoint(5, -12.5);
			   	item5.vertex = true;
			   	item2.insert(item5);
			   	var item6 = new mxCell('Open this select menu', new mxGeometry(0, 0, 760, 20), 'fillColor=#C8C8C8;strokeColor=none;align=left;fontSize=14;fontColor=#323232;');
			   	item6.geometry.relative = true;
			   	item6.geometry.offset = new mxPoint(10, 10);
			   	item6.vertex = true;
			   	item1.insert(item6);
			   	var item7 = new mxCell('One', new mxGeometry(0, 0, 760, 20), 'fillColor=none;strokeColor=none;align=left;fontSize=14;fontColor=#495057;');
			   	item7.geometry.relative = true;
			   	item7.geometry.offset = new mxPoint(10, 30);
			   	item7.vertex = true;
			   	item1.insert(item7);
			   	var item8 = new mxCell('Two', new mxGeometry(0, 0, 760, 20), 'fillColor=none;strokeColor=none;align=left;fontSize=14;fontColor=#495057;');
			   	item8.geometry.relative = true;
			   	item8.geometry.offset = new mxPoint(10, 50);
			   	item8.vertex = true;
			   	item1.insert(item8);
			   	var item9 = new mxCell('Three', new mxGeometry(0, 0, 760, 20), 'fillColor=none;strokeColor=none;align=left;fontSize=14;fontColor=#495057;');
			   	item9.geometry.relative = true;
			   	item9.geometry.offset = new mxPoint(10, 70);
			   	item9.vertex = true;
			   	item1.insert(item9);
				
		   		return sb.createVertexTemplateFromCells([item1], item1.geometry.width, item1.geometry.height, 'Form controls');
			}),
						    
			this.createVertexTemplateEntry(s + 'rangeInput;dx=0.6;strokeColor=#0085FC;fillColor=#DEE2E6;fontColor=#777777;whiteSpace=wrap;align=left;verticalAlign=bottom;fontStyle=0;fontSize=14;labelPosition=center;verticalLabelPosition=top;', 
					800, 20, 'Example range ', 'Range input', null, null, this.getTagsForStencil(gn, 'range input', dt + 'range input').join(' ')),

			this.addEntry(dt + 'file browser', function()
	   		{
			   	var bg = new mxCell('Choose file', new mxGeometry(0, 0, 800, 30), s + 'rrect;rSize=5;strokeColor=#CED4DA;html=1;whiteSpace=wrap;fillColor=#FFFFFF;fontColor=#7D868C;align=left;spacingLeft=0;spacing=15;fontSize=14;');
			   	bg.vertex = true;
			   	var button1 = new mxCell('Browse', new mxGeometry(1, 0, 70, 30), s + 'rightButton;strokeColor=inherit;gradientColor=inherit;fontColor=inherit;fillColor=#E9ECEF;rSize=5;perimeter=none;whiteSpace=wrap;resizeHeight=1;fontSize=14;');
			   	button1.geometry.relative = true;
			   	button1.geometry.offset = new mxPoint(-70, 0);
			   	button1.vertex = true;
			   	bg.insert(button1);
				
		   		return sb.createVertexTemplateFromCells([bg], 800, 30, 'File browser');
			}),
				    
			this.addEntry(dt + 'basic input group', function()
	   		{
			   	var item1 = new mxCell('Username', new mxGeometry(0, 0, 800, 40), s + 'rrect;rSize=5;strokeColor=#CED4DA;html=1;whiteSpace=wrap;fillColor=#FFFFFF;fontColor=#7D868C;align=left;spacing=15;spacingLeft=40;fontSize=14;');
			   	item1.vertex = true;
			   	var item2 = new mxCell('@', new mxGeometry(0, 0, 40, 40), s + 'leftButton;strokeColor=inherit;gradientColor=inherit;fontColor=inherit;fillColor=#E9ECEF;rSize=5;perimeter=none;whiteSpace=wrap;resizeHeight=1;fontSize=14;');
			   	item2.vertex = true;
			   	item1.insert(item2);
			   	var item3 = new mxCell('Recipient\'s username', new mxGeometry(0, 60, 800, 40), s + 'rrect;rSize=5;strokeColor=#CED4DA;html=1;whiteSpace=wrap;fillColor=#FFFFFF;fontColor=#7D868C;align=left;spacingLeft=0;spacing=15;fontSize=14;');
			   	item3.vertex = true;
			   	var item4 = new mxCell('@example.com', new mxGeometry(1, 0, 120, 40), s + 'rightButton;strokeColor=inherit;gradientColor=inherit;fontColor=inherit;fillColor=#E9ECEF;rSize=5;perimeter=none;whiteSpace=wrap;resizeHeight=1;fontSize=14;');
			   	item4.geometry.relative = true;
			   	item4.geometry.offset = new mxPoint(-120, 0);
			   	item4.vertex = true;
			   	item3.insert(item4);
			   	var item5 = new mxCell('Your vanity URL', new mxGeometry(0, 110, 200, 30), s + 'rrect;rSize=5;strokeColor=none;html=1;whiteSpace=wrap;fillColor=none;fontColor=#212529;align=left;spacingLeft=0;fontSize=14;');
			   	item5.vertex = true;
			   	var item6 = new mxCell('', new mxGeometry(0, 140, 800, 40), s + 'rrect;rSize=5;strokeColor=#CED4DA;html=1;whiteSpace=wrap;fillColor=#FFFFFF;fontColor=#7D868C;align=left;spacing=15;spacingLeft=40;fontSize=14;');
			   	item6.vertex = true;
			   	var item7 = new mxCell('http://example.com/users/', new mxGeometry(0, 0, 190, 40), s + 'leftButton;strokeColor=inherit;gradientColor=inherit;fontColor=inherit;fillColor=#E9ECEF;rSize=5;perimeter=none;whiteSpace=wrap;resizeHeight=1;fontSize=14;');
			   	item7.vertex = true;
			   	item6.insert(item7);
			   	var item8 = new mxCell('', new mxGeometry(0, 200, 800, 40), s + 'rrect;rSize=5;strokeColor=#CED4DA;html=1;whiteSpace=wrap;fillColor=#FFFFFF;fontColor=#7D868C;align=left;spacing=15;spacingLeft=40;fontSize=14;');
			   	item8.vertex = true;
			   	var item9 = new mxCell('$', new mxGeometry(0, 0, 40, 40), s + 'leftButton;strokeColor=inherit;gradientColor=inherit;fontColor=inherit;fillColor=#E9ECEF;rSize=5;perimeter=none;whiteSpace=wrap;resizeHeight=1;fontSize=14;');
			   	item9.vertex = true;
			   	item8.insert(item9);
			   	var item10 = new mxCell('.00', new mxGeometry(1, 0, 40, 40), s + 'rightButton;strokeColor=inherit;gradientColor=inherit;fontColor=inherit;fillColor=#E9ECEF;rSize=5;perimeter=none;whiteSpace=wrap;resizeHeight=1;fontSize=14;');
			   	item10.geometry.relative = true;
			   	item10.geometry.offset = new mxPoint(-40, 0);
			   	item10.vertex = true;
			   	item8.insert(item10);
			   	var item11 = new mxCell('', new mxGeometry(0, 260, 800, 70), s + 'rrect;rSize=5;strokeColor=#CED4DA;html=1;whiteSpace=wrap;fillColor=#FFFFFF;fontColor=#7D868C;align=left;spacing=15;spacingLeft=40;fontSize=14;');
			   	item11.vertex = true;
			   	var item12 = new mxCell('With textarea', new mxGeometry(0, 0, 100, 70), s + 'leftButton;strokeColor=inherit;gradientColor=inherit;fontColor=inherit;fillColor=#E9ECEF;rSize=5;perimeter=none;whiteSpace=wrap;resizeHeight=1;fontSize=14;');
			   	item12.vertex = true;
			   	item11.insert(item12);
				
		   		return sb.createVertexTemplateFromCells([item1, item3, item5, item6, item8, item11], 800, 330, 'Basic input group');
			}),
				    
			this.addEntry(dt + 'input group with checkbox', function()
	   		{
			   	var item1 = new mxCell('', new mxGeometry(0, 0, 800, 40), s + 'rrect;rSize=5;strokeColor=#CED4DA;html=1;whiteSpace=wrap;fillColor=#FFFFFF;fontColor=#7D868C;align=left;spacing=15;spacingLeft=40;fontSize=14;');
			   	item1.vertex = true;
			   	var item2 = new mxCell('', new mxGeometry(0, 0, 40, 40), s + 'leftButton;strokeColor=inherit;gradientColor=inherit;fontColor=inherit;fillColor=#E9ECEF;rSize=5;perimeter=none;whiteSpace=wrap;resizeHeight=1;fontSize=14;');
			   	item2.vertex = true;
			   	item1.insert(item2);
			   	var item3 = new mxCell(
			   			'', 
			   			new mxGeometry(0.5, 0.5, 10, 10), s + 'checkbox2;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=middle;gradientColor=#DEDEDE;fillColor=#EDEDED;strokeColor=#A6A6A6;checked=0;spacing=5;checkedFill=#0085FC;checkedStroke=#ffffff;');
			   	item3.geometry.relative = true;
			   	item3.geometry.offset = new mxPoint(-5, -5);
			   	item3.vertex = true;
			   	item2.insert(item3);
				
		   		return sb.createVertexTemplateFromCells([item1], 800, 40, 'Input groupwith checkbox');
			}),
				    
			this.addEntry(dt + 'input group with radio button', function()
	   		{
			   	var item1 = new mxCell('', new mxGeometry(0, 0, 800, 40), s + 'rrect;rSize=5;strokeColor=#CED4DA;html=1;whiteSpace=wrap;fillColor=#FFFFFF;fontColor=#7D868C;align=left;spacing=15;spacingLeft=40;fontSize=14;');
			   	item1.vertex = true;
			   	var item2 = new mxCell('', new mxGeometry(0, 0, 40, 40), s + 'leftButton;strokeColor=inherit;gradientColor=inherit;fontColor=inherit;fillColor=#E9ECEF;rSize=5;perimeter=none;whiteSpace=wrap;resizeHeight=1;fontSize=14;');
			   	item2.vertex = true;
			   	item1.insert(item2);
			   	var item3 = new mxCell(
			   			'', 
			   			new mxGeometry(0.5, 0.5, 10, 10), s + 'radioButton2;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=middle;gradientColor=#DEDEDE;fillColor=#EDEDED;strokeColor=#A6A6A6;checked=0;spacing=5;checkedFill=#0085FC;checkedStroke=#ffffff;');
			   	item3.geometry.relative = true;
			   	item3.geometry.offset = new mxPoint(-5, -5);
			   	item3.vertex = true;
			   	item2.insert(item3);
				
		   		return sb.createVertexTemplateFromCells([item1], 800, 40, 'Input group with radio button');
			}),
				    
			this.addEntry(dt + 'multiple input', function()
	   		{
			   	var item1 = new mxCell('', new mxGeometry(0, 0, 800, 40), s + 'rrect;rSize=5;strokeColor=#CED4DA;html=1;whiteSpace=wrap;fillColor=#FFFFFF;fontColor=#7D868C;align=left;spacing=15;spacingLeft=40;fontSize=14;');
			   	item1.vertex = true;
			   	var item2 = new mxCell('First and last name', new mxGeometry(0, 0, 140, 40), s + 'leftButton;strokeColor=inherit;gradientColor=inherit;fontColor=inherit;fillColor=#E9ECEF;rSize=5;perimeter=none;whiteSpace=wrap;resizeHeight=1;fontSize=14;');
			   	item2.vertex = true;
			   	item1.insert(item2);
			   	var item3 = new mxCell('', new mxGeometry(1, 0, 370, 40), s + 'rightButton;strokeColor=inherit;gradientColor=inherit;fontColor=inherit;fillColor=none;rSize=5;perimeter=none;whiteSpace=wrap;resizeHeight=1;fontSize=14;');
			   	item3.geometry.relative = true;
			   	item3.geometry.offset = new mxPoint(-370, 0);
			   	item3.vertex = true;
			   	item1.insert(item3);
				
		   		return sb.createVertexTemplateFromCells([item1], 800, 40, 'Multiple input');
			}),
				    
			this.addEntry(dt + 'multiple addons', function()
	   		{
			   	var item1 = new mxCell('', new mxGeometry(0, 0, 800, 40), s + 'rrect;rSize=5;strokeColor=#CED4DA;html=1;whiteSpace=wrap;fillColor=#FFFFFF;fontColor=#7D868C;align=left;spacing=15;spacingLeft=40;fontSize=14;');
			   	item1.vertex = true;
			   	var item2 = new mxCell('$', new mxGeometry(0, 0, 40, 40), s + 'leftButton;strokeColor=inherit;gradientColor=inherit;fontColor=inherit;fillColor=#E9ECEF;rSize=5;perimeter=none;whiteSpace=wrap;resizeHeight=1;fontSize=14;');
			   	item2.geometry.relative = true;
			   	item2.vertex = true;
			   	item1.insert(item2);
			   	var item3 = new mxCell('0.00', new mxGeometry(0, 0, 60, 40), 'html=1;shadow=0;dashed=0;strokeColor=inherit;gradientColor=inherit;fontColor=inherit;fillColor=#E9ECEF;perimeter=none;whiteSpace=wrap;resizeHeight=1;fontSize=14;');
			   	item3.geometry.relative = true;
			   	item3.geometry.offset = new mxPoint(40, 0);
			   	item3.vertex = true;
			   	item1.insert(item3);
				
		   		return sb.createVertexTemplateFromCells([item1], 800, 40, 'Multiple addons');
			}),
				    
			this.addEntry(dt + 'multiple addons', function()
	   		{
			   	var item1 = new mxCell('', new mxGeometry(0, 0, 800, 40), s + 'rrect;rSize=5;strokeColor=#CED4DA;html=1;whiteSpace=wrap;fillColor=#FFFFFF;fontColor=#7D868C;align=left;spacing=15;spacingLeft=40;fontSize=14;');
			   	item1.vertex = true;
			   	var item2 = new mxCell('$', new mxGeometry(1, 0, 40, 40), 'html=1;shadow=0;dashed=0;strokeColor=inherit;gradientColor=inherit;fontColor=inherit;fillColor=#E9ECEF;perimeter=none;whiteSpace=wrap;resizeHeight=1;fontSize=14;');
			   	item2.geometry.relative = true;
			   	item2.geometry.offset = new mxPoint(-100, 0);
			   	item2.vertex = true;
			   	item1.insert(item2);
			   	var item3 = new mxCell('0.00', new mxGeometry(1, 0, 60, 40), s + 'rightButton;strokeColor=inherit;gradientColor=inherit;fontColor=inherit;fillColor=#E9ECEF;rSize=5;perimeter=none;whiteSpace=wrap;resizeHeight=1;fontSize=14;');
			   	item3.geometry.relative = true;
			   	item3.geometry.offset = new mxPoint(-60, 0);
			   	item3.vertex = true;
			   	item1.insert(item3);
				
		   		return sb.createVertexTemplateFromCells([item1], 800, 40, 'Multiple addons');
			}),
				    
			this.addEntry(dt + 'button addon', function()
	   		{
			   	var item1 = new mxCell('', new mxGeometry(0, 0, 800, 40), s + 'rrect;rSize=5;strokeColor=#CED4DA;html=1;whiteSpace=wrap;fillColor=#FFFFFF;fontColor=#7D868C;align=left;spacing=15;spacingLeft=40;fontSize=14;');
			   	item1.vertex = true;
			   	var item2 = new mxCell('Button', new mxGeometry(0, 0, 70, 40), s + 'leftButton;strokeColor=#6C757D;gradientColor=inherit;fontColor=inherit;fillColor=inherit;rSize=5;perimeter=none;whiteSpace=wrap;resizeHeight=1;fontSize=14;');
			   	item2.geometry.relative = true;
			   	item2.vertex = true;
			   	item1.insert(item2);
				
		   		return sb.createVertexTemplateFromCells([item1], 800, 40, 'Button addon');
			}),
				    
			this.addEntry(dt + 'button addon right', function()
	   		{
			   	var item1 = new mxCell('Recipient\'s username', new mxGeometry(0, 0, 800, 40), s + 'rrect;rSize=5;strokeColor=#CED4DA;html=1;whiteSpace=wrap;fillColor=#FFFFFF;fontColor=#7D868C;align=left;spacingLeft=0;spacing=15;fontSize=14;');
			   	item1.vertex = true;
			   	var item2 = new mxCell('Button', new mxGeometry(1, 0, 70, 40), s + 'rightButton;strokeColor=#6C757D;gradientColor=inherit;fontColor=inherit;fillColor=inherit;rSize=5;perimeter=none;whiteSpace=wrap;resizeHeight=1;fontSize=14;');
			   	item2.geometry.relative = true;
			   	item2.geometry.offset = new mxPoint(-70, 0);
			   	item2.vertex = true;
			   	item2.vertex = true;
			   	item1.insert(item2);
				
		   		return sb.createVertexTemplateFromCells([item1], 800, 40, 'Button addon right');
			}),
				    
			this.addEntry(dt + 'two button addon', function()
	   		{
			   	var item1 = new mxCell('', new mxGeometry(0, 0, 800, 40), s + 'rrect;rSize=5;strokeColor=#CED4DA;html=1;whiteSpace=wrap;fillColor=#FFFFFF;fontColor=#7D868C;align=left;spacing=15;spacingLeft=40;fontSize=14;');
			   	item1.vertex = true;
			   	var item2 = new mxCell('Button', new mxGeometry(0, 0, 70, 40), s + 'leftButton;strokeColor=#6C757D;gradientColor=inherit;fontColor=inherit;fillColor=inherit;rSize=5;perimeter=none;whiteSpace=wrap;resizeHeight=1;fontSize=14;');
			   	item2.geometry.relative = true;
			   	item2.vertex = true;
			   	item1.insert(item2);
			   	var item3 = new mxCell('Button', new mxGeometry(0, 0, 70, 40), 'html=1;shadow=0;dashed=0;strokeColor=#6C757D;gradientColor=inherit;fontColor=inherit;fillColor=inherit;perimeter=none;whiteSpace=wrap;resizeHeight=1;fontSize=14;');
			   	item3.geometry.relative = true;
			   	item3.geometry.offset = new mxPoint(70, 0);
			   	item3.vertex = true;
			   	item1.insert(item3);
				
		   		return sb.createVertexTemplateFromCells([item1], 800, 40, 'Two button addon');
			}),
				    
			this.addEntry(dt + 'two button addon right', function()
	   		{
			   	var item1 = new mxCell('Recipient\'s username', new mxGeometry(0, 0, 800, 40), s + 'rrect;rSize=5;strokeColor=#CED4DA;html=1;whiteSpace=wrap;fillColor=#FFFFFF;fontColor=#7D868C;align=left;spacingLeft=0;spacing=15;fontSize=14;');
			   	item1.vertex = true;
			   	var item2 = new mxCell('Button', new mxGeometry(1, 0, 70, 40), s + 'rightButton;strokeColor=#6C757D;gradientColor=inherit;fontColor=inherit;fillColor=inherit;rSize=5;perimeter=none;whiteSpace=wrap;resizeHeight=1;fontSize=14;');
			   	item2.geometry.relative = true;
			   	item2.geometry.offset = new mxPoint(-70, 0);
			   	item2.vertex = true;
			   	item2.vertex = true;
			   	item1.insert(item2);
			   	var item3 = new mxCell('Button', new mxGeometry(1, 0, 70, 40), 'html=1;shadow=0;dashed=0;strokeColor=#6C757D;gradientColor=inherit;fontColor=inherit;fillColor=inherit;perimeter=none;whiteSpace=wrap;resizeHeight=1;fontSize=14;');
			   	item3.geometry.relative = true;
			   	item3.geometry.offset = new mxPoint(-140, 0);
			   	item3.vertex = true;
			   	item1.insert(item3);
				
		   		return sb.createVertexTemplateFromCells([item1], 800, 40, 'Two button addon right');
			}),
				    
			this.addEntry(dt + 'button with dropdown', function()
	   		{
			   	var item1 = new mxCell('', new mxGeometry(0, 0, 800, 40), s + 'rrect;rSize=5;strokeColor=#CED4DA;html=1;whiteSpace=wrap;fillColor=#FFFFFF;fontColor=#7D868C;align=left;spacing=15;spacingLeft=40;fontSize=14;');
			   	item1.vertex = true;
			   	var item2 = new mxCell('Dropdown...', new mxGeometry(0, 0, 120, 40), s + 'leftButton;strokeColor=#6C757D;gradientColor=inherit;fontColor=inherit;fillColor=inherit;rSize=5;perimeter=none;whiteSpace=wrap;resizeHeight=1;fontSize=14;align=left;spacing=15;');
			   	item2.geometry.relative = true;
			   	item2.vertex = true;
			   	item1.insert(item2);
			   	var marker1 = new mxCell('', new mxGeometry(1, 0.5, 10, 5), 'shape=triangle;direction=south;fillColor=#6C767D;strokeColor=none;perimeter=none;');
			   	marker1.geometry.relative = true;
			   	marker1.geometry.offset = new mxPoint(-17, -2.5);
			   	marker1.vertex = true;
			   	item2.insert(marker1);
				
		   		return sb.createVertexTemplateFromCells([item1], 800, 40, 'Button with dropdown');
			}),
				    
			this.addEntry(dt + 'button with dropdown right', function()
	   		{
			   	var item1 = new mxCell('', new mxGeometry(0, 0, 800, 40), s + 'rrect;rSize=5;strokeColor=#CED4DA;html=1;whiteSpace=wrap;fillColor=#FFFFFF;fontColor=#7D868C;align=left;spacing=15;spacingLeft=40;fontSize=14;');
			   	item1.vertex = true;
			   	var item2 = new mxCell('Dropdown...', new mxGeometry(1, 0, 120, 40), s + 'rightButton;strokeColor=#6C757D;gradientColor=inherit;fontColor=inherit;fillColor=inherit;rSize=5;perimeter=none;whiteSpace=wrap;resizeHeight=1;fontSize=14;align=left;spacing=15;');
			   	item2.geometry.relative = true;
			   	item2.geometry.offset = new mxPoint(-120, 0);
			   	item2.vertex = true;
			   	item1.insert(item2);
			   	var marker1 = new mxCell('', new mxGeometry(1, 0.5, 10, 5), 'shape=triangle;direction=south;fillColor=#6C767D;strokeColor=none;perimeter=none;');
			   	marker1.geometry.relative = true;
			   	marker1.geometry.offset = new mxPoint(-17, -2.5);
			   	marker1.vertex = true;
			   	item2.insert(marker1);
				
		   		return sb.createVertexTemplateFromCells([item1], 800, 40, 'Button with dropdown right');
			}),
				    
			this.addEntry(dt + 'segmented button addon', function()
	   		{
			   	var item1 = new mxCell('', new mxGeometry(0, 0, 800, 40), s + 'rrect;rSize=5;strokeColor=#CED4DA;html=1;whiteSpace=wrap;fillColor=#FFFFFF;fontColor=#7D868C;align=left;spacing=15;spacingLeft=40;fontSize=14;');
			   	item1.vertex = true;
			   	var item2 = new mxCell('Action', new mxGeometry(0, 0, 70, 40), s + 'leftButton;strokeColor=#6C757D;gradientColor=inherit;fontColor=inherit;fillColor=inherit;rSize=5;perimeter=none;whiteSpace=wrap;resizeHeight=1;fontSize=14;align=left;spacing=15;');
			   	item2.geometry.relative = true;
			   	item2.vertex = true;
			   	item1.insert(item2);
			   	var item3 = new mxCell('', new mxGeometry(0, 0, 30, 40), 'html=1;shadow=0;dashed=0;strokeColor=#6C757D;gradientColor=inherit;fontColor=inherit;fillColor=inherit;perimeter=none;whiteSpace=wrap;resizeHeight=1;fontSize=14;');
			   	item3.geometry.relative = true;
			   	item3.geometry.offset = new mxPoint(70, 0);
			   	item3.vertex = true;
			   	item1.insert(item3);
			   	var marker1 = new mxCell('', new mxGeometry(0.5, 0.5, 10, 5), 'shape=triangle;direction=south;fillColor=#6C767D;strokeColor=none;perimeter=none;');
			   	marker1.geometry.relative = true;
			   	marker1.geometry.offset = new mxPoint(-5, -2.5);
			   	marker1.vertex = true;
			   	item3.insert(marker1);
				
		   		return sb.createVertexTemplateFromCells([item1], 800, 40, 'Segmented button addon');
			}),
				    
			this.addEntry(dt + 'segmented button addon', function()
	   		{
			   	var item1 = new mxCell('', new mxGeometry(0, 0, 800, 40), s + 'rrect;rSize=5;strokeColor=#CED4DA;html=1;whiteSpace=wrap;fillColor=#FFFFFF;fontColor=#7D868C;align=left;spacing=15;spacingLeft=40;fontSize=14;');
			   	item1.vertex = true;
			   	var item2 = new mxCell('', new mxGeometry(1, 0, 30, 40), s + 'rightButton;strokeColor=#6C757D;gradientColor=inherit;fontColor=inherit;fillColor=inherit;rSize=5;perimeter=none;whiteSpace=wrap;resizeHeight=1;fontSize=14;align=left;spacing=15;');
			   	item2.geometry.relative = true;
			   	item2.geometry.offset = new mxPoint(-30, 0);
			   	item2.vertex = true;
			   	item1.insert(item2);
			   	var marker1 = new mxCell('', new mxGeometry(0.5, 0.5, 10, 5), 'shape=triangle;direction=south;fillColor=#6C767D;strokeColor=none;perimeter=none;');
			   	marker1.geometry.relative = true;
			   	marker1.geometry.offset = new mxPoint(-5, -2.5);
			   	marker1.vertex = true;
			   	item2.insert(marker1);
			   	var item3 = new mxCell('Action', new mxGeometry(1, 0, 70, 40), 'html=1;shadow=0;dashed=0;strokeColor=#6C757D;gradientColor=inherit;fontColor=inherit;fillColor=inherit;perimeter=none;whiteSpace=wrap;resizeHeight=1;fontSize=14;');
			   	item3.geometry.relative = true;
			   	item3.geometry.offset = new mxPoint(-100, 0);
			   	item3.vertex = true;
			   	item1.insert(item3);
				
		   		return sb.createVertexTemplateFromCells([item1], 800, 40, 'Segmented button addon');
			}),
				    
			this.addEntry(dt + 'custom input group', function()
	   		{
			   	var item1 = new mxCell('Choose...', new mxGeometry(0, 0, 800, 40), s + 'rrect;rSize=5;strokeColor=#CED4DA;html=1;whiteSpace=wrap;fillColor=#FFFFFF;fontColor=#7D868C;align=left;spacingLeft=80;spacing=15;fontSize=14;');
			   	item1.vertex = true;
			   	var marker1 = new mxCell('', new mxGeometry(1, 0.5, 7, 3), 'shape=triangle;direction=south;fillColor=#343A40;strokeColor=none;perimeter=none;');
			   	marker1.geometry.relative = true;
			   	marker1.geometry.offset = new mxPoint(-17, 1);
			   	marker1.vertex = true;
			   	item1.insert(marker1);
			   	var marker2 = new mxCell('', new mxGeometry(1, 0.5, 7, 3), 'shape=triangle;direction=north;fillColor=#343A40;strokeColor=none;perimeter=none;');
			   	marker2.geometry.relative = true;
			   	marker2.geometry.offset = new mxPoint(-17, -4);
			   	marker2.vertex = true;
			   	item1.insert(marker2);
			   	var item2 = new mxCell('Options', new mxGeometry(0, 0, 80, 40), s + 'leftButton;strokeColor=#CED4DA;gradientColor=inherit;fontColor=inherit;fillColor=#E9ECEF;rSize=5;perimeter=none;whiteSpace=wrap;resizeHeight=1;fontSize=14;align=left;spacing=15;');
			   	item2.geometry.relative = true;
			   	item2.vertex = true;
			   	item1.insert(item2);
				
		   		return sb.createVertexTemplateFromCells([item1], 800, 40, 'Custom input group');
			}),
				    
			this.addEntry(dt + 'custom input group', function()
	   		{
			   	var item1 = new mxCell('Choose...', new mxGeometry(0, 0, 800, 40), s + 'rrect;rSize=5;strokeColor=#CED4DA;html=1;whiteSpace=wrap;fillColor=#FFFFFF;fontColor=#7D868C;align=left;spacing=15;fontSize=14;');
			   	item1.vertex = true;
			   	var marker1 = new mxCell('', new mxGeometry(1, 0.5, 7, 3), 'shape=triangle;direction=south;fillColor=#343A40;strokeColor=none;perimeter=none;');
			   	marker1.geometry.relative = true;
			   	marker1.geometry.offset = new mxPoint(-97, 1);
			   	marker1.vertex = true;
			   	item1.insert(marker1);
			   	var marker2 = new mxCell('', new mxGeometry(1, 0.5, 7, 3), 'shape=triangle;direction=north;fillColor=#343A40;strokeColor=none;perimeter=none;');
			   	marker2.geometry.relative = true;
			   	marker2.geometry.offset = new mxPoint(-97, -4);
			   	marker2.vertex = true;
			   	item1.insert(marker2);
			   	var item2 = new mxCell('Options', new mxGeometry(1, 0, 80, 40), s + 'rightButton;strokeColor=#CED4DA;gradientColor=inherit;fontColor=inherit;fillColor=#E9ECEF;rSize=5;perimeter=none;whiteSpace=wrap;resizeHeight=1;fontSize=14;align=left;spacing=15;');
			   	item2.geometry.relative = true;
			   	item2.geometry.offset = new mxPoint(-80, 0);
			   	item2.vertex = true;
			   	item1.insert(item2);
				
		   		return sb.createVertexTemplateFromCells([item1], 800, 40, 'Custom input group');
			}),
				    
			this.addEntry(dt + 'custom input group', function()
	   		{
			   	var item1 = new mxCell('Choose...', new mxGeometry(0, 0, 800, 40), s + 'rrect;rSize=5;strokeColor=#CED4DA;html=1;whiteSpace=wrap;fillColor=#FFFFFF;fontColor=#7D868C;align=left;spacingLeft=80;spacing=15;fontSize=14;');
			   	item1.vertex = true;
			   	var marker1 = new mxCell('', new mxGeometry(1, 0.5, 7, 3), 'shape=triangle;direction=south;fillColor=#343A40;strokeColor=none;perimeter=none;');
			   	marker1.geometry.relative = true;
			   	marker1.geometry.offset = new mxPoint(-17, 1);
			   	marker1.vertex = true;
			   	item1.insert(marker1);
			   	var marker2 = new mxCell('', new mxGeometry(1, 0.5, 7, 3), 'shape=triangle;direction=north;fillColor=#343A40;strokeColor=none;perimeter=none;');
			   	marker2.geometry.relative = true;
			   	marker2.geometry.offset = new mxPoint(-17, -4);
			   	marker2.vertex = true;
			   	item1.insert(marker2);
			   	var item2 = new mxCell('Button', new mxGeometry(0, 0, 80, 40), s + 'leftButton;strokeColor=#6C757D;gradientColor=inherit;fontColor=inherit;fillColor=#ffffff;rSize=5;perimeter=none;whiteSpace=wrap;resizeHeight=1;fontSize=14;align=left;spacing=15;');
			   	item2.geometry.relative = true;
			   	item2.vertex = true;
			   	item1.insert(item2);
				
		   		return sb.createVertexTemplateFromCells([item1], 800, 40, 'Custom input group');
			}),
				    
			this.addEntry(dt + 'custom input group', function()
	   		{
			   	var item1 = new mxCell('Choose...', new mxGeometry(0, 0, 800, 40), s + 'rrect;rSize=5;strokeColor=#CED4DA;html=1;whiteSpace=wrap;fillColor=#FFFFFF;fontColor=#7D868C;align=left;spacing=15;fontSize=14;');
			   	item1.vertex = true;
			   	var marker1 = new mxCell('', new mxGeometry(1, 0.5, 7, 3), 'shape=triangle;direction=south;fillColor=#343A40;strokeColor=none;perimeter=none;');
			   	marker1.geometry.relative = true;
			   	marker1.geometry.offset = new mxPoint(-97, 1);
			   	marker1.vertex = true;
			   	item1.insert(marker1);
			   	var marker2 = new mxCell('', new mxGeometry(1, 0.5, 7, 3), 'shape=triangle;direction=north;fillColor=#343A40;strokeColor=none;perimeter=none;');
			   	marker2.geometry.relative = true;
			   	marker2.geometry.offset = new mxPoint(-97, -4);
			   	marker2.vertex = true;
			   	item1.insert(marker2);
			   	var item2 = new mxCell('Button', new mxGeometry(1, 0, 80, 40), s + 'rightButton;strokeColor=#6C757D;gradientColor=inherit;fontColor=inherit;fillColor=#ffffff;rSize=5;perimeter=none;whiteSpace=wrap;resizeHeight=1;fontSize=14;align=left;spacing=15;');
			   	item2.geometry.relative = true;
			   	item2.geometry.offset = new mxPoint(-80, 0);
			   	item2.vertex = true;
			   	item1.insert(item2);
				
		   		return sb.createVertexTemplateFromCells([item1], 800, 40, 'Custom input group');
			}),
				    
			this.addEntry(dt + 'custom input group', function()
	   		{
			   	var item1 = new mxCell('Choose file', new mxGeometry(0, 0, 800, 40), s + 'rrect;rSize=5;strokeColor=#CED4DA;html=1;whiteSpace=wrap;fillColor=#FFFFFF;fontColor=#7D868C;align=left;spacing=15;spacingLeft=80;fontSize=14;');
			   	item1.vertex = true;
			   	var item2 = new mxCell('Upload', new mxGeometry(0, 0, 80, 40), s + 'leftButton;strokeColor=#CED4DA;gradientColor=inherit;fontColor=inherit;fillColor=#E9ECEF;rSize=5;perimeter=none;whiteSpace=wrap;resizeHeight=1;fontSize=14;align=left;spacing=15;');
			   	item2.geometry.relative = true;
			   	item2.vertex = true;
			   	item1.insert(item2);
			   	var item3 = new mxCell('Browse', new mxGeometry(1, 0, 80, 40), s + 'rightButton;strokeColor=#CED4DA;gradientColor=inherit;fontColor=inherit;fillColor=#E9ECEF;rSize=5;perimeter=none;whiteSpace=wrap;resizeHeight=1;fontSize=14;align=left;spacing=15;');
			   	item3.geometry.relative = true;
			   	item3.geometry.offset = new mxPoint(-80, 0);
			   	item3.vertex = true;
			   	item1.insert(item3);
				
		   		return sb.createVertexTemplateFromCells([item1], 800, 40, 'Custom input group');
			}),
				    
			this.addEntry(dt + 'custom input group', function()
	   		{
			   	var item1 = new mxCell('Choose file', new mxGeometry(0, 0, 800, 40), s + 'rrect;rSize=5;strokeColor=#CED4DA;html=1;whiteSpace=wrap;fillColor=#FFFFFF;fontColor=#7D868C;align=left;spacing=15;fontSize=14;');
			   	item1.vertex = true;
			   	var item2 = new mxCell('Upload', new mxGeometry(1, 0, 80, 40), s + 'rightButton;strokeColor=#CED4DA;gradientColor=inherit;fontColor=inherit;fillColor=#E9ECEF;rSize=5;perimeter=none;whiteSpace=wrap;resizeHeight=1;fontSize=14;align=left;spacing=15;');
			   	item2.geometry.relative = true;
			   	item2.geometry.offset = new mxPoint(-80, 0);
			   	item2.vertex = true;
			   	item1.insert(item2);
			   	var item3 = new mxCell('Browse', new mxGeometry(1, 0, 80, 40), 'html=1;shadow=0;dashed=0;strokeColor=#CED4DA;gradientColor=inherit;fontColor=inherit;fillColor=#E9ECEF;perimeter=none;whiteSpace=wrap;resizeHeight=1;fontSize=14;align=left;spacing=15;');
			   	item3.geometry.relative = true;
			   	item3.geometry.offset = new mxPoint(-160, 0);
			   	item3.vertex = true;
			   	item1.insert(item3);
				
		   		return sb.createVertexTemplateFromCells([item1], 800, 40, 'Custom input group');
			}),
				    
			this.addEntry(dt + 'custom input group', function()
	   		{
			   	var item1 = new mxCell('Choose file', new mxGeometry(0, 0, 800, 40), s + 'rrect;rSize=5;strokeColor=#CED4DA;html=1;whiteSpace=wrap;fillColor=#FFFFFF;fontColor=#7D868C;align=left;spacing=15;spacingLeft=80;fontSize=14;');
			   	item1.vertex = true;
			   	var item2 = new mxCell('Button', new mxGeometry(0, 0, 80, 40), s + 'leftButton;strokeColor=#6C757D;gradientColor=inherit;fontColor=inherit;fillColor=#ffffff;rSize=5;perimeter=none;whiteSpace=wrap;resizeHeight=1;fontSize=14;align=left;spacing=15;');
			   	item2.geometry.relative = true;
			   	item2.vertex = true;
			   	item1.insert(item2);
			   	var item3 = new mxCell('Browse', new mxGeometry(1, 0, 80, 40), s + 'rightButton;strokeColor=#CED4DA;gradientColor=inherit;fontColor=inherit;fillColor=#E9ECEF;rSize=5;perimeter=none;whiteSpace=wrap;resizeHeight=1;fontSize=14;align=left;spacing=15;');
			   	item3.geometry.relative = true;
			   	item3.geometry.offset = new mxPoint(-80, 0);
			   	item3.vertex = true;
			   	item1.insert(item3);
				
		   		return sb.createVertexTemplateFromCells([item1], 800, 40, 'Custom input group');
			}),
				    
			this.addEntry(dt + 'custom input group', function()
	   		{
			   	var item1 = new mxCell('Choose file', new mxGeometry(0, 0, 800, 40), s + 'rrect;rSize=5;strokeColor=#CED4DA;html=1;whiteSpace=wrap;fillColor=#FFFFFF;fontColor=#7D868C;align=left;spacing=15;fontSize=14;');
			   	item1.vertex = true;
			   	var item2 = new mxCell('Browse', new mxGeometry(1, 0, 80, 40), 'html=1;shadow=0;dashed=0;strokeColor=#CED4DA;gradientColor=inherit;fontColor=inherit;fillColor=#E9ECEF;rSize=5;perimeter=none;whiteSpace=wrap;resizeHeight=1;fontSize=14;align=left;spacing=15;');
			   	item2.geometry.relative = true;
			   	item2.geometry.offset = new mxPoint(-160, 0);
			   	item2.vertex = true;
			   	item1.insert(item2);
			   	var item3 = new mxCell('Button', new mxGeometry(1, 0, 80, 40), s + 'rightButton;strokeColor=#6C757D;gradientColor=inherit;fontColor=inherit;fillColor=#ffffff;rSize=5;perimeter=none;whiteSpace=wrap;resizeHeight=1;fontSize=14;align=left;spacing=15;');
			   	item3.geometry.relative = true;
			   	item3.geometry.offset = new mxPoint(-80, 0);
			   	item3.vertex = true;
			   	item1.insert(item3);
				
		   		return sb.createVertexTemplateFromCells([item1], 800, 40, 'Custom input group');
			}),
				    
			this.addEntry(dt + 'jumbotron', function()
	   		{
			   	var item1 = new mxCell('<font style="font-size: 40px">Hello, world!</font><br><br>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.', 
			   			new mxGeometry(0, 0, 800, 300), s + 'rrect;rSize=5;strokeColor=none;html=1;whiteSpace=wrap;fillColor=#E9ECEF;fontColor=#474E4F;align=left;spacing=15;fontSize=14;verticalAlign=top;spacingTop=40;');
			   	item1.vertex = true;
			   	var item2 = new mxCell('It uses utility classes for typography and spacing to space content out within the larger container.', 
			   			new mxGeometry(0, 0, 770, 10), 'shape=line;html=1;shadow=0;dashed=0;strokeColor=#CED4DA;gradientColor=inherit;fontColor=inherit;fillColor=#E9ECEF;rSize=5;perimeter=none;whiteSpace=wrap;resizeHeight=1;fontSize=14;align=left;spacing=2;labelPosition=center;verticalLabelPosition=bottom;verticalAlign=top;spacingTop=10;');
			   	item2.geometry.relative = true;
			   	item2.geometry.offset = new mxPoint(15, 150);
			   	item2.vertex = true;
			   	item1.insert(item2);
			   	var item3 = new mxCell('Learn more', new mxGeometry(0, 1, 100, 40), s + 'rrect;rSize=5;fillColor=#0085FC;strokeColor=none;align=center;spacing=15;fontSize=14;fontColor=#ffffff;');
			   	item3.geometry.relative = true;
			   	item3.geometry.offset = new mxPoint(15, -80);
			   	item3.vertex = true;
			   	item1.insert(item3);
				
		   		return sb.createVertexTemplateFromCells([item1], item1.geometry.width, item1.geometry.height, 'Jumbotron');
			}),
				    
			this.addEntry(dt + 'fluid jumbotron', function()
	   		{
			   	var item1 = new mxCell('<font style="font-size: 40px">Fluid jumbotron</font><br><br>This is a modified jumbotron that occupies the entire horizontal space of its parent.', 
			   			new mxGeometry(0, 0, 800, 220), s + 'rrect;rSize=5;strokeColor=none;html=1;whiteSpace=wrap;fillColor=#E9ECEF;fontColor=#474E4F;align=left;spacing=15;fontSize=14;verticalAlign=top;spacingTop=40;');
			   	item1.vertex = true;
				
		   		return sb.createVertexTemplateFromCells([item1], item1.geometry.width, item1.geometry.height, 'Fluid jumbotron');
			}),
				    
			this.addEntry(dt + 'list group', function()
	   		{
			   	var bg = new mxCell('', new mxGeometry(0, 0, 200, 150), s + 'rrect;rSize=5;strokeColor=#DFDFDF;html=1;whiteSpace=wrap;fillColor=#FFFFFF;fontColor=#000000;');
			   	bg.vertex = true;
			   	var button1 = new mxCell('Cras justo odio', new mxGeometry(0, 0, 200, 30), inh + s + 'topButton;rSize=5;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=left;spacing=10;');
			   	button1.geometry.relative = true;
			   	button1.vertex = true;
			   	bg.insert(button1);
			   	var button2 = new mxCell('Dapibus ac facilisis in', new mxGeometry(0, 0, 200, 30), inh + 'html=1;shadow=0;dashed=0;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=left;spacing=10;');
			   	button2.geometry.relative = true;
			   	button2.geometry.offset = new mxPoint(0, 30);
			   	button2.vertex = true;
			   	bg.insert(button2);
			   	var button3 = new mxCell('Morbi leo risus', new mxGeometry(0, 0, 200, 30), inh + 'html=1;shadow=0;dashed=0;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=left;spacing=10;');
			   	button3.geometry.relative = true;
			   	button3.geometry.offset = new mxPoint(0, 60);
			   	button3.vertex = true;
			   	bg.insert(button3);
			   	var button4 = new mxCell('Porta ac consectetur ac', new mxGeometry(0, 0, 200, 30), inh + 'html=1;shadow=0;dashed=0;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=left;spacing=10;');
			   	button4.geometry.relative = true;
			   	button4.geometry.offset = new mxPoint(0, 90);
			   	button4.vertex = true;
			   	bg.insert(button4);
			   	var button4 = new mxCell('Vestibulum at eros', new mxGeometry(0, 1, 200, 30), inh + s + 'bottomButton;rSize=5;perimeter=none;whiteSpace=wrap;resizeWidth=1;resizeHeight=0;align=left;spacing=10;');
			   	button4.geometry.relative = true;
			   	button4.geometry.offset = new mxPoint(0, -30);
			   	button4.vertex = true;
			   	bg.insert(button4);
				
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'List group');
			}),
					
			this.addEntry(dt + 'list group with active item', function()
	   		{
			   	var bg = new mxCell('', new mxGeometry(0, 0, 200, 150), s + 'rrect;rSize=5;strokeColor=#DFDFDF;html=1;whiteSpace=wrap;fillColor=#FFFFFF;fontColor=#000000;');
			   	bg.vertex = true;
			   	var button1 = new mxCell('Cras justo odio', new mxGeometry(0, 0, 200, 30), s + 'topButton;rSize=5;strokeColor=none;fillColor=#0085FC;fontColor=#ffffff;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=left;spacing=10;');
			   	button1.geometry.relative = true;
			   	button1.vertex = true;
			   	bg.insert(button1);
			   	var button2 = new mxCell('Dapibus ac facilisis in', new mxGeometry(0, 0, 200, 30), inh + 'html=1;shadow=0;dashed=0;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=left;spacing=10;');
			   	button2.geometry.relative = true;
			   	button2.geometry.offset = new mxPoint(0, 30);
			   	button2.vertex = true;
			   	bg.insert(button2);
			   	var button3 = new mxCell('Morbi leo risus', new mxGeometry(0, 0, 200, 30), inh + 'html=1;shadow=0;dashed=0;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=left;spacing=10;');
			   	button3.geometry.relative = true;
			   	button3.geometry.offset = new mxPoint(0, 60);
			   	button3.vertex = true;
			   	bg.insert(button3);
			   	var button4 = new mxCell('Porta ac consectetur ac', new mxGeometry(0, 0, 200, 30), inh + 'html=1;shadow=0;dashed=0;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=left;spacing=10;');
			   	button4.geometry.relative = true;
			   	button4.geometry.offset = new mxPoint(0, 90);
			   	button4.vertex = true;
			   	bg.insert(button4);
			   	var button4 = new mxCell('Vestibulum at eros', new mxGeometry(0, 1, 200, 30), inh + s + 'bottomButton;rSize=5;perimeter=none;whiteSpace=wrap;resizeWidth=1;resizeHeight=0;align=left;spacing=10;');
			   	button4.geometry.relative = true;
			   	button4.geometry.offset = new mxPoint(0, -30);
			   	button4.vertex = true;
			   	bg.insert(button4);
				
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'List group with active item');
			}),
					
			this.addEntry(dt + 'list group with disabled item', function()
	   		{
			   	var bg = new mxCell('', new mxGeometry(0, 0, 200, 150), s + 'rrect;rSize=5;strokeColor=#DFDFDF;html=1;whiteSpace=wrap;fillColor=#FFFFFF;fontColor=#000000;');
			   	bg.vertex = true;
			   	var button1 = new mxCell('Cras justo odio', new mxGeometry(0, 0, 200, 30), s + 'topButton;rSize=5;strokeColor=inherit;fillColor=#ffffff;fontColor=#6C767D;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=left;spacing=10;');
			   	button1.geometry.relative = true;
			   	button1.vertex = true;
			   	bg.insert(button1);
			   	var button2 = new mxCell('Dapibus ac facilisis in', new mxGeometry(0, 0, 200, 30), inh + 'html=1;shadow=0;dashed=0;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=left;spacing=10;');
			   	button2.geometry.relative = true;
			   	button2.geometry.offset = new mxPoint(0, 30);
			   	button2.vertex = true;
			   	bg.insert(button2);
			   	var button3 = new mxCell('Morbi leo risus', new mxGeometry(0, 0, 200, 30), inh + 'html=1;shadow=0;dashed=0;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=left;spacing=10;');
			   	button3.geometry.relative = true;
			   	button3.geometry.offset = new mxPoint(0, 60);
			   	button3.vertex = true;
			   	bg.insert(button3);
			   	var button4 = new mxCell('Porta ac consectetur ac', new mxGeometry(0, 0, 200, 30), inh + 'html=1;shadow=0;dashed=0;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=left;spacing=10;');
			   	button4.geometry.relative = true;
			   	button4.geometry.offset = new mxPoint(0, 90);
			   	button4.vertex = true;
			   	bg.insert(button4);
			   	var button4 = new mxCell('Vestibulum at eros', new mxGeometry(0, 1, 200, 30), inh + s + 'bottomButton;rSize=5;perimeter=none;whiteSpace=wrap;resizeWidth=1;resizeHeight=0;align=left;spacing=10;');
			   	button4.geometry.relative = true;
			   	button4.geometry.offset = new mxPoint(0, -30);
			   	button4.vertex = true;
			   	bg.insert(button4);
				
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'List group with disabled item');
			}),
					
			this.addEntry(dt + 'list group flush', function()
	   		{
			   	var button1 = new mxCell('Cras justo odio', new mxGeometry(0, 0, 200, 30), 'html=1;strokeColor=none;fillColor=none;fontColor=#212529;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=left;spacing=10;');
			   	button1.vertex = true;
			   	var button2 = new mxCell('Dapibus ac facilisis in', new mxGeometry(0, 30, 200, 30), 'shape=partialRectangle;whiteSpace=wrap;left=0;right=0;fillColor=none;strokeColor=#DFDFDF;html=1;shadow=0;dashed=0;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=left;spacing=10;');
			   	button2.vertex = true;
			   	var button3 = new mxCell('Morbi leo risus', new mxGeometry(0, 60, 200, 30), 'shape=partialRectangle;whiteSpace=wrap;left=0;right=0;fillColor=none;strokeColor=#DFDFDF;html=1;shadow=0;dashed=0;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=left;spacing=10;');
			   	button3.vertex = true;
			   	var button4 = new mxCell('Porta ac consectetur ac', new mxGeometry(0, 90, 200, 30), 'shape=partialRectangle;whiteSpace=wrap;left=0;right=0;fillColor=none;strokeColor=#DFDFDF;html=1;shadow=0;dashed=0;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=left;spacing=10;');
			   	button4.vertex = true;
			   	var button5 = new mxCell('Vestibulum at eros', new mxGeometry(0, 120, 200, 30), 'html=1;strokeColor=none;fillColor=none;fontColor=#212529;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=left;spacing=10;');
			   	button5.vertex = true;
				
		   		return sb.createVertexTemplateFromCells([button1, button2, button3, button4, button5], 200, 150, 'List group flush');
			}),
					
			this.addEntry(dt + 'list group horizontal', function()
	   		{
			   	var bg = new mxCell('', new mxGeometry(0, 0, 360, 30), s + 'rrect;rSize=5;strokeColor=#DFDFDF;html=1;whiteSpace=wrap;fillColor=#ffffff;fontColor=#212529;');
			   	bg.vertex = true;
			   	var button1 = new mxCell('Cras justo odio', new mxGeometry(0, 0, 110, 30), inh + s + 'leftButton;rSize=5;perimeter=none;whiteSpace=wrap;resizeHeight=1;');
			   	button1.geometry.relative = true;
			   	button1.vertex = true;
			   	bg.insert(button1);
			   	var button2 = new mxCell('Dapibus ac facilis in', new mxGeometry(0, 0, 140, 30), inh + 'html=1;shadow=0;dashed=0;perimeter=none;whiteSpace=wrap;resizeHeight=1;');
			   	button2.geometry.relative = true;
			   	button2.geometry.offset = new mxPoint(110, 0);
			   	button2.vertex = true;
			   	bg.insert(button2);
			   	var button3 = new mxCell('Morbi leo risus', new mxGeometry(1, 0, 110, 30), inh + s + 'rightButton;rSize=5;perimeter=none;whiteSpace=wrap;resizeHeight=1;');
			   	button3.geometry.relative = true;
			   	button3.geometry.offset = new mxPoint(-110, 0);
			   	button3.vertex = true;
			   	bg.insert(button3);
				
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'List Group, horizontal');
			}),
		    
			this.addEntry(dt + 'contextual classes', function()
	   		{
			   	var bg = new mxCell('', new mxGeometry(0, 0, 250, 270), s + 'rrect;rSize=5;strokeColor=#DFDFDF;html=1;whiteSpace=wrap;fillColor=#FFFFFF;fontColor=#000000;');
			   	bg.vertex = true;
			   	var button1 = new mxCell('Dapibus ac facilisis in', new mxGeometry(0, 0, 250, 30), inh + s + 'topButton;rSize=5;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=left;spacing=10;');
			   	button1.geometry.relative = true;
			   	button1.vertex = true;
			   	bg.insert(button1);
			   	var button2 = new mxCell('A simple primary list group item', new mxGeometry(0, 0, 250, 30), 'html=1;fillColor=#B8DCFE;strokeColor=#A1C0DE;fontColor=#004583;shadow=0;dashed=0;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=left;spacing=10;');
			   	button2.geometry.relative = true;
			   	button2.geometry.offset = new mxPoint(0, 30);
			   	button2.vertex = true;
			   	bg.insert(button2);
			   	var button3 = new mxCell('A simple secondary list group item', new mxGeometry(0, 0, 250, 30), 'html=1;fillColor=#D6D8DB;strokeColor=#BBBDC0;fontColor=#383D41;shadow=0;dashed=0;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=left;spacing=10;');
			   	button3.geometry.relative = true;
			   	button3.geometry.offset = new mxPoint(0, 60);
			   	button3.vertex = true;
			   	bg.insert(button3);
			   	var button4 = new mxCell('A simple success list group item', new mxGeometry(0, 0, 250, 30), 'html=1;fillColor=#C4E6CC;strokeColor=#ABC9B2;fontColor=#ABC9B2;shadow=0;dashed=0;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=left;spacing=10;');
			   	button4.geometry.relative = true;
			   	button4.geometry.offset = new mxPoint(0, 90);
			   	button4.vertex = true;
			   	bg.insert(button4);
			   	var button5 = new mxCell('A simple danger list group item', new mxGeometry(0, 0, 250, 30), 'html=1;fillColor=#F4C5CB;strokeColor=#D5ACB2;fontColor=#711623;shadow=0;dashed=0;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=left;spacing=10;');
			   	button5.geometry.relative = true;
			   	button5.geometry.offset = new mxPoint(0, 120);
			   	button5.vertex = true;
			   	bg.insert(button5);
			   	var button6 = new mxCell('A simple warning list group item', new mxGeometry(0, 0, 250, 30), 'html=1;fillColor=#FFECBC;strokeColor=#DFCEA4;fontColor=#856110;shadow=0;dashed=0;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=left;spacing=10;');
			   	button6.geometry.relative = true;
			   	button6.geometry.offset = new mxPoint(0, 150);
			   	button6.vertex = true;
			   	bg.insert(button6);
			   	var button7 = new mxCell('A simple info list group item', new mxGeometry(0, 0, 250, 30), 'html=1;fillColor=#BFE6EB;strokeColor=#A7C9CE;fontColor=#0E5560;shadow=0;dashed=0;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=left;spacing=10;');
			   	button7.geometry.relative = true;
			   	button7.geometry.offset = new mxPoint(0, 180);
			   	button7.vertex = true;
			   	bg.insert(button7);
			   	var button8 = new mxCell('A simple light list group item', new mxGeometry(0, 0, 250, 30), 'html=1;fillColor=#FDFDFE;strokeColor=#DDDDDE;fontColor=#818182;shadow=0;dashed=0;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=left;spacing=10;');
			   	button8.geometry.relative = true;
			   	button8.geometry.offset = new mxPoint(0, 210);
			   	button8.vertex = true;
			   	bg.insert(button8);
			   	var button9 = new mxCell('A simple dark list group item', new mxGeometry(0, 1, 250, 30), s + 'bottomButton;fillColor=#C6C8CA;strokeColor=#ADAFB1;fontColor=#1B1E21;rSize=5;perimeter=none;whiteSpace=wrap;resizeWidth=1;resizeHeight=0;align=left;spacing=10;');
			   	button9.geometry.relative = true;
			   	button9.geometry.offset = new mxPoint(0, -30);
			   	button9.vertex = true;
			   	bg.insert(button9);
				
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Contextual classes');
			}),
					
			this.addEntry(dt + 'list group with badges', function()
	   		{
			   	var bg = new mxCell('', new mxGeometry(0, 0, 300, 120), s + 'rrect;rSize=5;strokeColor=#DFDFDF;html=1;whiteSpace=wrap;fillColor=#FFFFFF;fontColor=#000000;');
			   	bg.vertex = true;
			   	var button1 = new mxCell('Cras justo odio', new mxGeometry(0, 0, 300, 40), inh + s + 'topButton;rSize=5;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=left;spacing=10;');
			   	button1.geometry.relative = true;
			   	button1.vertex = true;
			   	bg.insert(button1);
			   	var item1 = new mxCell('14', new mxGeometry(1, 0.5, 25, 16), inh + s + 'rrect;rSize=8;fillColor=#0085FC;strokeColor=none;fontColor=#ffffff;whiteSpace=wrap;');
			   	item1.geometry.relative = true;
			   	item1.geometry.offset = new mxPoint(-40, -8);
			   	item1.vertex = true;
			   	button1.insert(item1);
			   	var button2 = new mxCell('Dapibus ac facilisis in', new mxGeometry(0, 0, 300, 40), inh + 'html=1;shadow=0;dashed=0;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=left;spacing=10;');
			   	button2.geometry.relative = true;
			   	button2.geometry.offset = new mxPoint(0, 40);
			   	button2.vertex = true;
			   	bg.insert(button2);
			   	var item2 = new mxCell('2', new mxGeometry(1, 0.5, 20, 16), inh + s + 'rrect;rSize=8;fillColor=#0085FC;strokeColor=none;fontColor=#ffffff;whiteSpace=wrap;');
			   	item2.geometry.relative = true;
			   	item2.geometry.offset = new mxPoint(-38, -8);
			   	item2.vertex = true;
			   	button2.insert(item2);
			   	var button3 = new mxCell('Morbi leo risus', new mxGeometry(0, 1, 300, 40), inh + s + 'bottomButton;rSize=5;perimeter=none;whiteSpace=wrap;resizeWidth=1;resizeHeight=0;align=left;spacing=10;');
			   	button3.geometry.relative = true;
			   	button3.geometry.offset = new mxPoint(0, -40);
			   	button3.vertex = true;
			   	bg.insert(button3);
			   	var item3 = new mxCell('1', new mxGeometry(1, 0.5, 20, 16), inh + s + 'rrect;rSize=8;fillColor=#0085FC;strokeColor=none;fontColor=#ffffff;whiteSpace=wrap;');
			   	item3.geometry.relative = true;
			   	item3.geometry.offset = new mxPoint(-38, -8);
			   	item3.vertex = true;
			   	button3.insert(item3);
				
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'List group with badges');
			}),
					
			this.addEntry(dt + 'custom content', function()
	   		{
			   	var bg = new mxCell('', new mxGeometry(0, 0, 300, 300), s + 'rrect;rSize=5;strokeColor=#DFDFDF;html=1;whiteSpace=wrap;fillColor=#FFFFFF;fontColor=#495057;');
			   	bg.vertex = true;
			   	var button1 = new mxCell('<font style="font-size: 16px">List group item heading</font><br><br>Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.<br><font style="font-size: 11px">Donec id elit mi porta.</font>', 
			   			new mxGeometry(0, 0, 300, 100), s + 'topButton;rSize=5;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=left;spacing=10;verticalAlign=top;fillColor=#0085FC;strokeColor=#0085FC;fontColor=#ffffff;');
			   	button1.geometry.relative = true;
			   	button1.vertex = true;
			   	bg.insert(button1);
			   	var item1 = new mxCell('3 days ago', 
			   			new mxGeometry(1, 0, 90, 40), 'strokeColor=none;fillColor=none;fontColor=#ffffff;fontSize=11;');
			   	item1.geometry.relative = true;
			   	item1.geometry.offset = new mxPoint(-90, 0);
			   	item1.vertex = true;
			   	button1.insert(item1);
			   	var button2 = new mxCell('<font style="font-size: 16px">List group item heading</font><br><br>Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.<br><font style="font-size: 11px">Donec id elit mi porta.</font>', 
			   			new mxGeometry(0, 0, 300, 100), inh + 'html=1;shadow=0;dashed=0;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=left;spacing=10;');
			   	button2.geometry.relative = true;
			   	button2.geometry.offset = new mxPoint(0, 100);
			   	button2.vertex = true;
			   	bg.insert(button2);
			   	var item2 = new mxCell('3 days ago', 
			   			new mxGeometry(1, 0, 90, 40), 'strokeColor=none;fillColor=none;fontColor=#6C767D;fontSize=11;');
			   	item2.geometry.relative = true;
			   	item2.geometry.offset = new mxPoint(-90, 0);
			   	item2.vertex = true;
			   	button2.insert(item2);
			   	var button3 = new mxCell('<font style="font-size: 16px">List group item heading</font><br><br>Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.<br><font style="font-size: 11px">Donec id elit mi porta.</font>', 
			   			new mxGeometry(0, 1, 300, 100), inh + s + 'bottomButton;rSize=5;perimeter=none;whiteSpace=wrap;resizeWidth=1;resizeHeight=0;align=left;spacing=10;');
			   	button3.geometry.relative = true;
			   	button3.geometry.offset = new mxPoint(0, -100);
			   	button3.vertex = true;
			   	bg.insert(button3);
			   	var item3 = new mxCell('3 days ago', 
			   			new mxGeometry(1, 0, 90, 40), 'strokeColor=none;fillColor=none;fontColor=#6C767D;fontSize=11;');
			   	item3.geometry.relative = true;
			   	item3.geometry.offset = new mxPoint(-90, 0);
			   	item3.vertex = true;
			   	button3.insert(item3);
				
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Custom content');
			}),
					
			this.addEntry(dt + 'list group', function()
	   		{
			   	var bg = new mxCell('', new mxGeometry(0, 0, 200, 120), s + 'rrect;rSize=5;strokeColor=#DFDFDF;html=1;whiteSpace=wrap;fillColor=#FFFFFF;fontColor=#000000;');
			   	bg.vertex = true;
			   	var button1 = new mxCell('Home', new mxGeometry(0, 0, 200, 30), s + 'topButton;rSize=5;strokeColor=none;fillColor=#0085FC;fontColor=#ffffff;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=left;spacing=10;');
			   	button1.geometry.relative = true;
			   	button1.vertex = true;
			   	bg.insert(button1);
			   	var button2 = new mxCell('Profile', new mxGeometry(0, 0, 200, 30), inh + 'html=1;shadow=0;dashed=0;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=left;spacing=10;');
			   	button2.geometry.relative = true;
			   	button2.geometry.offset = new mxPoint(0, 30);
			   	button2.vertex = true;
			   	bg.insert(button2);
			   	var button3 = new mxCell('Messages', new mxGeometry(0, 0, 200, 30), inh + 'html=1;shadow=0;dashed=0;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=left;spacing=10;');
			   	button3.geometry.relative = true;
			   	button3.geometry.offset = new mxPoint(0, 60);
			   	button3.vertex = true;
			   	bg.insert(button3);
			   	var button4 = new mxCell('Settings', new mxGeometry(0, 1, 200, 30), inh + s + 'bottomButton;rSize=5;perimeter=none;whiteSpace=wrap;resizeWidth=1;resizeHeight=0;align=left;spacing=10;');
			   	button4.geometry.relative = true;
			   	button4.geometry.offset = new mxPoint(0, -30);
			   	button4.vertex = true;
			   	bg.insert(button4);
			   	var item1 = new mxCell('Velit aute mollit ipsum ad dolor consectetur nulla officia culpa adipisicing exercitation fugiat tempor. Voluptate deserunt sit sunt nisi aliqua fugiat proident ea ut. Mollit voluptate reprehenderit occaecat nisi ad non minim tempor sunt voluptate consectetur exercitation id ut nulla. Ea et fugiat aliquip nostrud sunt incididunt consectetur culpa aliquip eiusmod dolor. Anim ad Lorem aliqua in cupidatat nisi enim eu nostrud do aliquip veniam minim.', 
			   			new mxGeometry(220, 0, 580, 100), 'strokeColor=none;fillColor=none;fontColor=#000000;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=left;spacing=2;fontSize=14;verticalAlign=top;');
			   	item1.vertex = true;
				
		   		return sb.createVertexTemplateFromCells([bg, item1], 800, 120, 'List group');
			}),
					
			this.addEntry(dt + 'media object', function()
	   		{
			   	var bg = new mxCell('64x64', new mxGeometry(0, 0, 64, 64), 'strokeColor=none;html=1;whiteSpace=wrap;fillColor=#868E96;fontColor=#DEE2E6;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('<font style="font-size: 20px">Media heading</font><br>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.', 
			   			new mxGeometry(74, 0, 726, 90), 'strokeColor=none;fillColor=none;fontColor=#000000;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=left;spacing=2;fontSize=14;verticalAlign=top;html=1;');
			   	item1.vertex = true;
				
		   		return sb.createVertexTemplateFromCells([bg, item1], 800, 90, 'Media object');
			}),
					
			this.addEntry(dt + 'nested media objects', function()
	   		{
			   	var bg1 = new mxCell('64x64', new mxGeometry(0, 0, 64, 64), 'strokeColor=none;html=1;whiteSpace=wrap;fillColor=#868E96;fontColor=#DEE2E6;');
			   	bg1.vertex = true;
			   	var item1 = new mxCell('<font style="font-size: 20px">Media heading</font><br>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.', 
			   			new mxGeometry(74, 0, 726, 90), 'strokeColor=none;fillColor=none;fontColor=#000000;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=left;spacing=2;fontSize=14;verticalAlign=top;html=1;');
			   	item1.vertex = true;
				
			   	var bg2 = new mxCell('64x64', new mxGeometry(74, 90, 64, 64), 'strokeColor=none;html=1;whiteSpace=wrap;fillColor=#868E96;fontColor=#DEE2E6;');
			   	bg2.vertex = true;
			   	var item2 = new mxCell('<font style="font-size: 20px">Media heading</font><br>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.', 
			   			new mxGeometry(148, 90, 652, 90), 'strokeColor=none;fillColor=none;fontColor=#000000;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=left;spacing=2;fontSize=14;verticalAlign=top;html=1;');
			   	item2.vertex = true;
				
		   		return sb.createVertexTemplateFromCells([bg1, item1, bg2, item2], 800, 180, 'Nested media object');
			}),
					
			this.addEntry(dt + 'top aligned media', function()
	   		{
			   	var bg = new mxCell('64x64', new mxGeometry(0, 0, 64, 64), 'strokeColor=none;html=1;whiteSpace=wrap;fillColor=#868E96;fontColor=#DEE2E6;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('<font style="font-size: 18px">Top-aligned media</font><br><br>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.<br><br>Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', 
			   			new mxGeometry(74, 0, 726, 150), 'strokeColor=none;fillColor=none;fontColor=#000000;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=left;spacing=2;fontSize=14;verticalAlign=top;html=1;');
			   	item1.vertex = true;
				
		   		return sb.createVertexTemplateFromCells([bg, item1], 800, 150, 'Top-aligned media');
			}),
					
			this.addEntry(dt + 'center aligned media', function()
	   		{
			   	var bg = new mxCell('64x64', new mxGeometry(0, 43, 64, 64), 'strokeColor=none;html=1;whiteSpace=wrap;fillColor=#868E96;fontColor=#DEE2E6;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('<font style="font-size: 18px">Center-aligned media</font><br><br>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.<br><br>Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', 
			   			new mxGeometry(74, 0, 726, 150), 'strokeColor=none;fillColor=none;fontColor=#000000;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=left;spacing=2;fontSize=14;verticalAlign=top;html=1;');
			   	item1.vertex = true;
				
		   		return sb.createVertexTemplateFromCells([bg, item1], 800, 150, 'Center-aligned media');
			}),
					
			this.addEntry(dt + 'bottom aligned media', function()
	   		{
			   	var bg = new mxCell('64x64', new mxGeometry(0, 86, 64, 64), 'strokeColor=none;html=1;whiteSpace=wrap;fillColor=#868E96;fontColor=#DEE2E6;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('<font style="font-size: 18px">Bottom-aligned media</font><br><br>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.<br><br>Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', 
			   			new mxGeometry(74, 0, 726, 150), 'strokeColor=none;fillColor=none;fontColor=#000000;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=left;spacing=2;fontSize=14;verticalAlign=top;html=1;');
			   	item1.vertex = true;
				
		   		return sb.createVertexTemplateFromCells([bg, item1], 800, 150, 'Bottom-aligned media');
			}),
					
			this.addEntry(dt + 'media object', function()
	   		{
			   	var bg = new mxCell('64x64', new mxGeometry(736, 0, 64, 64), 'strokeColor=none;html=1;whiteSpace=wrap;fillColor=#868E96;fontColor=#DEE2E6;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('<font style="font-size: 20px">Media object</font><br>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.', 
			   			new mxGeometry(0, 0, 726, 90), 'strokeColor=none;fillColor=none;fontColor=#000000;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=left;spacing=2;fontSize=14;verticalAlign=top;html=1;');
			   	item1.vertex = true;
				
		   		return sb.createVertexTemplateFromCells([bg, item1], 800, 90, 'Media object');
			}),
					
			this.addEntry(dt + 'media list', function()
	   		{
			   	var bg1 = new mxCell('64x64', new mxGeometry(0, 0, 64, 64), 'strokeColor=none;html=1;whiteSpace=wrap;fillColor=#868E96;fontColor=#DEE2E6;');
			   	bg1.vertex = true;
			   	var item1 = new mxCell('<font style="font-size: 20px">List-based media object</font><br>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.', 
			   			new mxGeometry(74, 0, 726, 90), 'strokeColor=none;fillColor=none;fontColor=#000000;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=left;spacing=2;fontSize=14;verticalAlign=top;html=1;');
			   	item1.vertex = true;
			   	var bg2 = new mxCell('64x64', new mxGeometry(0, 100, 64, 64), 'strokeColor=none;html=1;whiteSpace=wrap;fillColor=#868E96;fontColor=#DEE2E6;');
			   	bg2.vertex = true;
			   	var item2 = new mxCell('<font style="font-size: 20px">List-based media object</font><br>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.', 
			   			new mxGeometry(74, 100, 726, 90), 'strokeColor=none;fillColor=none;fontColor=#000000;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=left;spacing=2;fontSize=14;verticalAlign=top;html=1;');
			   	item2.vertex = true;
			   	var bg3 = new mxCell('64x64', new mxGeometry(0, 200, 64, 64), 'strokeColor=none;html=1;whiteSpace=wrap;fillColor=#868E96;fontColor=#DEE2E6;');
			   	bg3.vertex = true;
			   	var item3 = new mxCell('<font style="font-size: 20px">List-based media object</font><br>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.', 
			   			new mxGeometry(74, 200, 726, 90), 'strokeColor=none;fillColor=none;fontColor=#000000;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=left;spacing=2;fontSize=14;verticalAlign=top;html=1;');
			   	item3.vertex = true;
				
		   		return sb.createVertexTemplateFromCells([bg1, item1, bg2, item2, bg3, item3], 800, 290, 'Media list');
			}),
					
			this.addEntry(dt + 'modal title', function()
	   		{
			   	var bg = new mxCell('Modal title', new mxGeometry(0, 0, 400, 200), s + 'rrect;rSize=5;html=1;strokeColor=#C8C8C8;fillColor=#ffffff;whiteSpace=wrap;verticalAlign=top;align=left;fontSize=18;spacing=15;spacingTop=-5;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('', new mxGeometry(0, 0, 400, 10), 'shape=line;strokeColor=#dddddd;resizeWidth=1;');
			   	item1.geometry.relative = true;
			   	item1.geometry.offset = new mxPoint(0, 50);
			   	item1.vertex = true;
			   	bg.insert(item1);
			   	var item2 = new mxCell('', new mxGeometry(1, 0, 8, 8), s + 'x;strokeColor=#868686;strokeWidth=2;');
			   	item2.geometry.relative = true;
			   	item2.geometry.offset = new mxPoint(-24, 20);
			   	item2.vertex = true;
			   	bg.insert(item2);
			   	var item3 = new mxCell('Modal body text goes here.', new mxGeometry(0, 0, 400, 40), 'strokeColor=none;fillColor=none;resizeWidth=1;align=left;verticalAlign=top;spacing=10;fontSize=13;');
			   	item3.geometry.relative = true;
			   	item3.geometry.offset = new mxPoint(0, 60);
			   	item3.vertex = true;
			   	bg.insert(item3);
			   	var item4 = new mxCell('', new mxGeometry(0, 0, 400, 10), 'shape=line;strokeColor=#dddddd;resizeWidth=1;');
			   	item4.geometry.relative = true;
			   	item4.geometry.offset = new mxPoint(0, 120);
			   	item4.vertex = true;
			   	bg.insert(item4);
			   	var item5 = new mxCell('Save changes', new mxGeometry(1, 1, 110, 40), s + 'rrect;rSize=5;fillColor=#0085FC;strokeColor=none;fontColor=#FFFFFF;fontSize=14;');
			   	item5.geometry.relative = true;
			   	item5.geometry.offset = new mxPoint(-130, -60);
			   	item5.vertex = true;
			   	bg.insert(item5);
			   	var item6 = new mxCell('Close', new mxGeometry(1, 1, 70, 40), s + 'rrect;rSize=5;fillColor=#6C757D;strokeColor=none;fontColor=#FFFFFF;fontSize=14;');
			   	item6.geometry.relative = true;
			   	item6.geometry.offset = new mxPoint(-220, -60);
			   	item6.vertex = true;
			   	bg.insert(item6);
			   	
			   	
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Modal title');
			}),
					
			this.addEntry(dt + 'modal title', function()
	   		{
			   	var bg = new mxCell('Modal title', new mxGeometry(0, 0, 400, 510), s + 'rrect;rSize=5;html=1;strokeColor=#C8C8C8;fillColor=#ffffff;whiteSpace=wrap;verticalAlign=top;align=left;fontSize=18;spacing=15;spacingTop=-5;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('', new mxGeometry(0, 0, 400, 10), 'shape=line;strokeColor=#dddddd;resizeWidth=1;');
			   	item1.geometry.relative = true;
			   	item1.geometry.offset = new mxPoint(0, 50);
			   	item1.vertex = true;
			   	bg.insert(item1);
			   	var item2 = new mxCell('', new mxGeometry(1, 0, 8, 8), s + 'x;strokeColor=#868686;strokeWidth=2;');
			   	item2.geometry.relative = true;
			   	item2.geometry.offset = new mxPoint(-24, 20);
			   	item2.vertex = true;
			   	bg.insert(item2);
			   	var item3 = new mxCell('Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.<br><br>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.<br><br>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.<br><br>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.<br><br>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.', 
			   			new mxGeometry(0, 0, 400, 350), 'strokeColor=none;fillColor=none;resizeWidth=1;align=left;verticalAlign=top;spacing=10;fontSize=14;whiteSpace=wrap;html=1;');
			   	item3.geometry.relative = true;
			   	item3.geometry.offset = new mxPoint(0, 60);
			   	item3.vertex = true;
			   	bg.insert(item3);
			   	var item4 = new mxCell('', new mxGeometry(0, 0, 410, 10), 'shape=line;strokeColor=#dddddd;resizeWidth=1;');
			   	item4.geometry.relative = true;
			   	item4.geometry.offset = new mxPoint(0, 420);
			   	item4.vertex = true;
			   	bg.insert(item4);
			   	var item5 = new mxCell('Save changes', new mxGeometry(1, 1, 110, 40), s + 'rrect;rSize=5;fillColor=#0085FC;strokeColor=none;fontColor=#FFFFFF;fontSize=14;');
			   	item5.geometry.relative = true;
			   	item5.geometry.offset = new mxPoint(-130, -60);
			   	item5.vertex = true;
			   	bg.insert(item5);
			   	var item6 = new mxCell('Close', new mxGeometry(1, 1, 70, 40), s + 'rrect;rSize=5;fillColor=#6C757D;strokeColor=none;fontColor=#FFFFFF;fontSize=14;');
			   	item6.geometry.relative = true;
			   	item6.geometry.offset = new mxPoint(-220, -60);
			   	item6.vertex = true;
			   	bg.insert(item6);
			   	
			   	
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Modal title');
			}),
					
			this.addEntry(dt + 'modal title', function()
	   		{
			   	var bg = new mxCell('Modal title', new mxGeometry(0, 0, 400, 340), s + 'rrect;rSize=5;html=1;strokeColor=#C8C8C8;fillColor=#ffffff;whiteSpace=wrap;verticalAlign=top;align=left;fontSize=18;spacing=15;spacingTop=-5;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('', new mxGeometry(0, 0, 400, 10), 'shape=line;strokeColor=#dddddd;resizeWidth=1;');
			   	item1.geometry.relative = true;
			   	item1.geometry.offset = new mxPoint(0, 50);
			   	item1.vertex = true;
			   	bg.insert(item1);
			   	var item2 = new mxCell('', new mxGeometry(1, 0, 8, 8), s + 'x;strokeColor=#868686;strokeWidth=2;');
			   	item2.geometry.relative = true;
			   	item2.geometry.offset = new mxPoint(-24, 20);
			   	item2.vertex = true;
			   	bg.insert(item2);
			   	var item3 = new mxCell('Popover in a modal', 
			   			new mxGeometry(0, 0, 400, 50), 'strokeColor=none;fillColor=none;resizeWidth=1;align=left;verticalAlign=top;spacing=10;fontSize=18;whiteSpace=wrap;html=1;');
			   	item3.geometry.relative = true;
			   	item3.geometry.offset = new mxPoint(0, 60);
			   	item3.vertex = true;
			   	bg.insert(item3);
			   	var item4 = new mxCell('This is a', 
			   			new mxGeometry(0, 0, 70, 40), 'strokeColor=none;fillColor=none;align=center;verticalAlign=middle;spacing=2;fontSize=14;whiteSpace=wrap;html=1;');
			   	item4.geometry.relative = true;
			   	item4.geometry.offset = new mxPoint(0, 110);
			   	item4.vertex = true;
			   	bg.insert(item4);
			   	var item5 = new mxCell('button', new mxGeometry(0, 0, 70, 40), s + 'rrect;rSize=5;fillColor=#6C757D;strokeColor=none;fontColor=#FFFFFF;fontSize=14;');
			   	item5.geometry.relative = true;
			   	item5.geometry.offset = new mxPoint(70, 110);
			   	item5.vertex = true;
			   	bg.insert(item5);
			   	var item6 = new mxCell('in a modal dialog.', 
			   			new mxGeometry(0, 0, 200, 40), 'strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacing=10;fontSize=14;whiteSpace=wrap;html=1;');
			   	item6.geometry.relative = true;
			   	item6.geometry.offset = new mxPoint(140, 110);
			   	item6.vertex = true;
			   	bg.insert(item6);
			   	var item7 = new mxCell('', new mxGeometry(0, 0, 400, 10), 'shape=line;strokeColor=#dddddd;resizeWidth=1;');
			   	item7.geometry.relative = true;
			   	item7.geometry.offset = new mxPoint(0, 160);
			   	item7.vertex = true;
			   	bg.insert(item7);
			   	var item8 = new mxCell('Tooltips in a modal', 
			   			new mxGeometry(0, 0, 400, 40), 'strokeColor=none;fillColor=none;resizeWidth=1;align=left;verticalAlign=top;spacing=10;fontSize=18;whiteSpace=wrap;html=1;');
			   	item8.geometry.relative = true;
			   	item8.geometry.offset = new mxPoint(0, 170);
			   	item8.vertex = true;
			   	bg.insert(item8);
			   	var item9 = new mxCell('<font color="#0085fc">This link</font> and <font color="#0085fc">another link </font>are in a modal dialog.', 
			   			new mxGeometry(0, 0, 400, 40), 'strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacing=10;fontSize=14;whiteSpace=wrap;html=1;');
			   	item9.geometry.relative = true;
			   	item9.geometry.offset = new mxPoint(0, 210);
			   	item9.vertex = true;
			   	bg.insert(item9);
			   	var item10 = new mxCell('', new mxGeometry(0, 0, 400, 10), 'shape=line;strokeColor=#dddddd;resizeWidth=1;');
			   	item10.geometry.relative = true;
			   	item10.geometry.offset = new mxPoint(0, 260);
			   	item10.vertex = true;
			   	bg.insert(item10);
			   	var item11 = new mxCell('Save changes', new mxGeometry(1, 1, 110, 40), s + 'rrect;rSize=5;fillColor=#0085FC;strokeColor=none;fontColor=#FFFFFF;fontSize=14;');
			   	item11.geometry.relative = true;
			   	item11.geometry.offset = new mxPoint(-130, -60);
			   	item11.vertex = true;
			   	bg.insert(item11);
			   	var item12 = new mxCell('Close', new mxGeometry(1, 1, 70, 40), s + 'rrect;rSize=5;fillColor=#6C757D;strokeColor=none;fontColor=#FFFFFF;fontSize=14;');
			   	item12.geometry.relative = true;
			   	item12.geometry.offset = new mxPoint(-220, -60);
			   	item12.vertex = true;
			   	bg.insert(item12);
			   	
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Modal title');
			}),
					
			this.addEntry(dt + 'modal content', function()
	   		{
			   	var bg = new mxCell('New message to @mdo', new mxGeometry(0, 0, 400, 370), s + 'rrect;rSize=5;html=1;strokeColor=#C8C8C8;fillColor=#ffffff;whiteSpace=wrap;verticalAlign=top;align=left;fontSize=18;spacing=15;spacingTop=-5;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('', new mxGeometry(0, 0, 400, 10), 'shape=line;strokeColor=#dddddd;resizeWidth=1;');
			   	item1.geometry.relative = true;
			   	item1.geometry.offset = new mxPoint(0, 50);
			   	item1.vertex = true;
			   	bg.insert(item1);
			   	var item2 = new mxCell('', new mxGeometry(1, 0, 8, 8), s + 'x;strokeColor=#868686;strokeWidth=2;');
			   	item2.geometry.relative = true;
			   	item2.geometry.offset = new mxPoint(-24, 20);
			   	item2.vertex = true;
			   	bg.insert(item2);
			   	var item3 = new mxCell('Recipient:', 
			   			new mxGeometry(0, 0, 400, 40), 'strokeColor=none;fillColor=none;resizeWidth=1;align=left;verticalAlign=top;spacing=10;fontSize=14;whiteSpace=wrap;html=1;');
			   	item3.geometry.relative = true;
			   	item3.geometry.offset = new mxPoint(0, 60);
			   	item3.vertex = true;
			   	bg.insert(item3);
			   	var item4 = new mxCell('@mdo', 
			   			new mxGeometry(0, 0, 380, 40), s + 'rrect;rSize=5;strokeColor=#CED4DA;fillColor=none;align=left;verticalAlign=middle;spacing=10;fontSize=14;whiteSpace=wrap;html=1;');
			   	item4.geometry.relative = true;
			   	item4.geometry.offset = new mxPoint(10, 100);
			   	item4.vertex = true;
			   	bg.insert(item4);
			   	var item5 = new mxCell('Message:', 
			   			new mxGeometry(0, 0, 400, 40), 'strokeColor=none;fillColor=none;resizeWidth=1;align=left;verticalAlign=top;spacing=10;fontSize=14;whiteSpace=wrap;html=1;');
			   	item5.geometry.relative = true;
			   	item5.geometry.offset = new mxPoint(0, 160);
			   	item5.vertex = true;
			   	bg.insert(item5);
			   	var item6 = new mxCell('', 
			   			new mxGeometry(0, 0, 380, 70), s + 'rrect;rSize=5;strokeColor=#CED4DA;fillColor=none;align=left;verticalAlign=middle;spacing=10;fontSize=14;whiteSpace=wrap;html=1;');
			   	item6.geometry.relative = true;
			   	item6.geometry.offset = new mxPoint(10, 200);
			   	item6.vertex = true;
			   	bg.insert(item6);
			   	var item7 = new mxCell('', new mxGeometry(0, 0, 400, 10), 'shape=line;strokeColor=#dddddd;resizeWidth=1;');
			   	item7.geometry.relative = true;
			   	item7.geometry.offset = new mxPoint(0, 290);
			   	item7.vertex = true;
			   	bg.insert(item7);
			   	var item8 = new mxCell('Save changes', new mxGeometry(1, 1, 110, 40), s + 'rrect;rSize=5;fillColor=#0085FC;strokeColor=none;fontColor=#FFFFFF;fontSize=14;');
			   	item8.geometry.relative = true;
			   	item8.geometry.offset = new mxPoint(-130, -60);
			   	item8.vertex = true;
			   	bg.insert(item8);
			   	var item9 = new mxCell('Close', new mxGeometry(1, 1, 70, 40), s + 'rrect;rSize=5;fillColor=#6C757D;strokeColor=none;fontColor=#FFFFFF;fontSize=14;');
			   	item9.geometry.relative = true;
			   	item9.geometry.offset = new mxPoint(-220, -60);
			   	item9.vertex = true;
			   	bg.insert(item9);
			   	
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Modal conent');
			}),
					
			this.addEntry(dt + 'horizontal navigation', function()
	   		{
			   	var item1 = new mxCell('Active', new mxGeometry(0, 0, 80, 30), 'fillColor=none;strokeColor=none;fontSize=14;fontColor=#0085FC;');
			   	item1.vertex = true;
			   	var item2 = new mxCell('Link', new mxGeometry(80, 0, 60, 30), 'fillColor=none;strokeColor=none;fontSize=14;fontColor=#0085FC;');
			   	item2.vertex = true;
			   	var item3 = new mxCell('Link', new mxGeometry(140, 0, 60, 30), 'fillColor=none;strokeColor=none;fontSize=14;fontColor=#0085FC;');
			   	item3.vertex = true;
			   	var item4 = new mxCell('Disabled', new mxGeometry(200, 0, 80, 30), 'fillColor=none;strokeColor=none;fontSize=14;fontColor=#7D868C;');
			   	item4.vertex = true;
			   	
		   		return sb.createVertexTemplateFromCells([item1, item2, item3, item4], 280, 30, 'Horizontal navigation');
			}),
					
			this.addEntry(dt + 'vertical navigation', function()
	   		{
			   	var item1 = new mxCell('Active', new mxGeometry(0, 0, 80, 30), 'fillColor=none;strokeColor=none;fontSize=14;fontColor=#0085FC;align=left;spacing=10;');
			   	item1.vertex = true;
			   	var item2 = new mxCell('Link', new mxGeometry(0, 40, 80, 30), 'fillColor=none;strokeColor=none;fontSize=14;fontColor=#0085FC;align=left;spacing=10;');
			   	item2.vertex = true;
			   	var item3 = new mxCell('Link', new mxGeometry(0, 80, 80, 30), 'fillColor=none;strokeColor=none;fontSize=14;fontColor=#0085FC;align=left;spacing=10;');
			   	item3.vertex = true;
			   	var item4 = new mxCell('Disabled', new mxGeometry(0, 120, 80, 30), 'fillColor=none;strokeColor=none;fontSize=14;fontColor=#7D868C;align=left;spacing=10;');
			   	item4.vertex = true;
			   	
		   		return sb.createVertexTemplateFromCells([item1, item2, item3, item4], 80, 150, 'Vertical navigation');
			}),
					
			this.addEntry(dt + 'tabs', function()
	   		{
			   	var item1 = new mxCell('Active', new mxGeometry(0, 0, 80, 40), s + 'tabTop;strokeColor=#DFDFDF;fillColor=#ffffff;rSize=5;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=center;spacing=20;fontSize=14;fontColor=#4B5259;');
			   	item1.vertex = true;
			   	var item2 = new mxCell('Link', new mxGeometry(85, 0, 50, 40), 'strokeColor=none;fillColor=none;rSize=5;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=center;spacing=20;fontSize=14;fontColor=#0085FC;');
			   	item2.vertex = true;
			   	var item3 = new mxCell('Link', new mxGeometry(145, 0, 50, 40), 'strokeColor=none;fillColor=none;rSize=5;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=center;spacing=20;fontSize=14;fontColor=#0085FC;');
			   	item3.vertex = true;
			   	var item4 = new mxCell('Disabled', new mxGeometry(200, 0, 60, 40), 'strokeColor=none;fillColor=none;rSize=5;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=center;spacing=20;fontSize=14;fontColor=#0085FC;fontColor=#4B5259;');
			   	item4.vertex = true;
			   	var item5 = new mxCell('', new mxGeometry(80, 35, 700, 10), 'shape=line;strokeColor=#dddddd;');
			   	item5.vertex = true;

		   		return sb.createVertexTemplateFromCells([item1, item2, item3, item4, item5], 780, 45, 'Tabs');
			}),
					
			this.addEntry(dt + 'navigation pills', function()
	   		{
			   	var item1 = new mxCell('Active', new mxGeometry(0, 0, 70, 40), s + 'rrect;rSize=5;fillColor=#0085FC;strokeColor=none;fontSize=14;fontColor=#ffffff;');
			   	item1.vertex = true;
			   	var item2 = new mxCell('Link', new mxGeometry(70, 0, 60, 40), 'fillColor=none;strokeColor=none;fontSize=14;fontColor=#0085FC;');
			   	item2.vertex = true;
			   	var item3 = new mxCell('Link', new mxGeometry(130, 0, 60, 40), 'fillColor=none;strokeColor=none;fontSize=14;fontColor=#0085FC;');
			   	item3.vertex = true;
			   	var item4 = new mxCell('Disabled', new mxGeometry(190, 0, 80, 40), 'fillColor=none;strokeColor=none;fontSize=14;fontColor=#7D868C;');
			   	item4.vertex = true;
			   	
		   		return sb.createVertexTemplateFromCells([item1, item2, item3, item4], 280, 40, 'Navigation pills');
			}),
					
			this.addEntry(dt + 'tabs with dropdown', function()
	   		{
			   	var item1 = new mxCell('Active', new mxGeometry(0, 0, 80, 40), s + 'tabTop;strokeColor=#DFDFDF;fillColor=#ffffff;rSize=5;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=center;spacing=20;fontSize=14;fontColor=#4B5259;');
			   	item1.vertex = true;
			   	var item2 = new mxCell('Dropdown', new mxGeometry(85, 0, 100, 40), 'strokeColor=none;fillColor=none;rSize=5;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=center;spacing=20;fontSize=14;fontColor=#0085FC;spacingRight=10;');
			   	item2.vertex = true;
			   	var marker1 = new mxCell('', new mxGeometry(1, 0.5, 10, 5), 'shape=triangle;direction=south;fillColor=#0085FC;strokeColor=none;perimeter=none;');
			   	marker1.geometry.relative = true;
			   	marker1.geometry.offset = new mxPoint(-17, -2.5);
			   	marker1.vertex = true;
			   	item2.insert(marker1);
			   	var item3 = new mxCell('Link', new mxGeometry(195, 0, 50, 40), 'strokeColor=none;fillColor=none;rSize=5;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=center;spacing=20;fontSize=14;fontColor=#0085FC;');
			   	item3.vertex = true;
			   	var item4 = new mxCell('Disabled', new mxGeometry(250, 0, 60, 40), 'strokeColor=none;fillColor=none;rSize=5;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=center;spacing=20;fontSize=14;fontColor=#0085FC;fontColor=#4B5259;');
			   	item4.vertex = true;
			   	var item5 = new mxCell('', new mxGeometry(80, 35, 700, 10), 'shape=line;strokeColor=#dddddd;');
			   	item5.vertex = true;

		   		return sb.createVertexTemplateFromCells([item1, item2, item3, item4, item5], 780, 45, 'Tabs with dropdown');
			}),
					
			this.addEntry(dt + 'navigation pills with dropdown', function()
	   		{
			   	var item1 = new mxCell('Active', new mxGeometry(0, 0, 70, 40), s + 'rrect;rSize=5;fillColor=#0085FC;strokeColor=none;fontSize=14;fontColor=#ffffff;sketch=0;');
			   	item1.vertex = true;
			   	var item2 = new mxCell('Dropdown', new mxGeometry(80, 0, 100, 40), 'strokeColor=none;fillColor=none;rSize=5;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=center;spacing=20;fontSize=14;fontColor=#0085FC;spacingRight=10;');
			   	item2.vertex = true;
			   	var marker1 = new mxCell('', new mxGeometry(1, 0.5, 10, 5), 'shape=triangle;direction=south;fillColor=#0085FC;strokeColor=none;perimeter=none;sketch=0;');
			   	marker1.geometry.relative = true;
			   	marker1.geometry.offset = new mxPoint(-17, -2.5);
			   	marker1.vertex = true;
			   	item2.insert(marker1);
			   	var item3 = new mxCell('Link', new mxGeometry(180, 0, 60, 40), 'fillColor=none;strokeColor=none;fontSize=14;fontColor=#0085FC;');
			   	item3.vertex = true;
			   	var item4 = new mxCell('Disabled', new mxGeometry(240, 0, 80, 40), 'fillColor=none;strokeColor=none;fontSize=14;fontColor=#7D868C;');
			   	item4.vertex = true;
			   	
		   		return sb.createVertexTemplateFromCells([item1, item2, item3, item4], 280, 40, 'Navigation pills with dropdown');
			}),
					
			this.addEntry(dt + 'tabs with description', function()
	   		{
			   	var item1 = new mxCell('Home ', new mxGeometry(0, 0, 80, 40), s + 'tabTop;strokeColor=#DFDFDF;fillColor=#ffffff;rSize=5;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=center;spacing=20;fontSize=14;fontColor=#4B5259;');
			   	item1.vertex = true;
			   	var item2 = new mxCell('Profile', new mxGeometry(85, 0, 50, 40), 'strokeColor=none;fillColor=none;rSize=5;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=center;spacing=20;fontSize=14;fontColor=#0085FC;');
			   	item2.vertex = true;
			   	var item3 = new mxCell('Contact', new mxGeometry(145, 0, 50, 40), 'strokeColor=none;fillColor=none;rSize=5;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=center;spacing=20;fontSize=14;fontColor=#0085FC;');
			   	item3.vertex = true;
			   	var item4 = new mxCell('', new mxGeometry(80, 35, 700, 10), 'shape=line;strokeColor=#dddddd;');
			   	item4.vertex = true;
			   	var item5 = new mxCell('Raw denim you probably haven\'t heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi qui.', 
			   			new mxGeometry(0, 55, 780, 80), 'strokeColor=none;fillColor=none;whiteSpace=wrap;html=1;align=left;verticalAlign=top;fontSize=14;');
			   	item5.vertex = true;

		   		return sb.createVertexTemplateFromCells([item1, item2, item3, item4, item5], 780, 135, 'Tabs with description');
			}),
					
			this.addEntry(dt + 'navigation pills with description', function()
	   		{
			   	var item1 = new mxCell('Home', new mxGeometry(0, 0, 60, 40), s + 'rrect;rSize=5;fillColor=#0085FC;strokeColor=none;fontSize=14;fontColor=#ffffff;');
			   	item1.vertex = true;
			   	var item2 = new mxCell('Profile', new mxGeometry(60, 0, 70, 40), 'fillColor=none;strokeColor=none;fontSize=14;fontColor=#0085FC;');
			   	item2.vertex = true;
			   	var item3 = new mxCell('Contact', new mxGeometry(130, 0, 60, 40), 'fillColor=none;strokeColor=none;fontSize=14;fontColor=#0085FC;');
			   	item3.vertex = true;
			   	var item4 = new mxCell('Raw denim you probably haven\'t heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi qui.', 
			   			new mxGeometry(0, 55, 780, 80), 'strokeColor=none;fillColor=none;whiteSpace=wrap;html=1;align=left;verticalAlign=top;fontSize=14;');
			   	item4.vertex = true;
			   	
		   		return sb.createVertexTemplateFromCells([item1, item2, item3, item4], 780, 135, 'Navigation pills with description');
			}),
					
			this.addEntry(dt + 'vertical navigation pills with description', function()
	   		{
			   	var item1 = new mxCell('Home', new mxGeometry(0, 0, 220, 40), s + 'rrect;rSize=5;fillColor=#0085FC;strokeColor=none;fontSize=14;fontColor=#ffffff;align=left;spacing=15;');
			   	item1.vertex = true;
			   	var item2 = new mxCell('Profile', new mxGeometry(0, 40, 220, 40), 'fillColor=none;strokeColor=none;fontSize=14;fontColor=#0085FC;align=left;spacing=15;');
			   	item2.vertex = true;
			   	var item3 = new mxCell('Messages', new mxGeometry(0, 80, 220, 40), 'fillColor=none;strokeColor=none;fontSize=14;fontColor=#0085FC;align=left;spacing=15;');
			   	item3.vertex = true;
			   	var item4 = new mxCell('Settings', new mxGeometry(0, 120, 220, 40), 'fillColor=none;strokeColor=none;fontSize=14;fontColor=#0085FC;align=left;spacing=15;');
			   	item4.vertex = true;
			   	var item5 = new mxCell('Cillum ad ut irure tempor velit nostrud occaecat ullamco aliqua anim Lorem sint. Veniam sint duis incididunt do esse magna mollit excepteur laborum qui. Id id reprehenderit sit est eu aliqua occaecat quis et velit excepteur laborum mollit dolore eiusmod. Ipsum dolor in occaecat commodo et voluptate minim reprehenderit mollit pariatur. Deserunt non laborum enim et cillum eu deserunt excepteur ea incididunt minim occaecat.', 
			   			new mxGeometry(240, 0, 560, 160), 'strokeColor=none;fillColor=none;whiteSpace=wrap;html=1;align=left;verticalAlign=top;fontSize=14;');
			   	item5.vertex = true;
			   	
		   		return sb.createVertexTemplateFromCells([item1, item2, item3, item4, item5], 800, 160, 'Vertical navigation pills with description');
			}),
					
			this.addEntry(dt + 'navbar', function()
	   		{
			   	var bg = new mxCell('Navbar', new mxGeometry(0, 0, 800, 60), 'html=1;shadow=0;dashed=0;fillColor=#F8F9FA;strokeColor=none;fontSize=16;fontColor=#181819;align=left;spacing=15;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('Home', new mxGeometry(0, 0, 70, 40), 'fillColor=none;strokeColor=none;fontSize=14;fontColor=#181819;align=center;');
			   	item1.geometry.relative = true;
			   	item1.geometry.offset = new mxPoint(70, 10);
			   	item1.vertex = true;
			   	bg.insert(item1);
			   	var item2 = new mxCell('Link', new mxGeometry(0, 0, 50, 40), 'fillColor=none;strokeColor=none;fontSize=14;fontColor=#7C7C7D;align=center;');
			   	item2.geometry.relative = true;
			   	item2.geometry.offset = new mxPoint(140, 10);
			   	item2.vertex = true;
			   	bg.insert(item2);
			   	var item3 = new mxCell('Dropdown', new mxGeometry(0, 0, 100, 40), 'fillColor=none;strokeColor=none;fontSize=14;fontColor=#7C7C7D;align=right;spacingRight=20;');
			   	item3.geometry.relative = true;
			   	item3.geometry.offset = new mxPoint(190, 10);
			   	item3.vertex = true;
			   	bg.insert(item3);
			   	var marker1 = new mxCell('', new mxGeometry(1, 0.5, 10, 5), 'shape=triangle;direction=south;fillColor=#7C7C7D;strokeColor=none;perimeter=none;');
			   	marker1.geometry.relative = true;
			   	marker1.geometry.offset = new mxPoint(-17, -2.5);
			   	marker1.vertex = true;
			   	item3.insert(marker1);
			   	var item4 = new mxCell('Disabled', new mxGeometry(0, 0, 80, 40), 'fillColor=none;strokeColor=none;fontSize=14;fontColor=#ADAEAF;align=center;');
			   	item4.geometry.relative = true;
			   	item4.geometry.offset = new mxPoint(290, 10);
			   	item4.vertex = true;
			   	bg.insert(item4);
			   	var item5 = new mxCell('Search', new mxGeometry(1, 0, 70, 40), s + 'rrect;rSize=5;fontSize=14;fontColor=#33A64C;strokeColor=#33A64C;fillColor=none;');
			   	item5.geometry.relative = true;
			   	item5.geometry.offset = new mxPoint(-80, 10);
			   	item5.vertex = true;
			   	bg.insert(item5);
			   	var item6 = new mxCell('Search', new mxGeometry(1, 0, 180, 40), s + 'rrect;rSize=5;fontSize=14;fontColor=#6C767D;strokeColor=#CED4DA;fillColor=#ffffff;align=left;spacing=10;');
			   	item6.geometry.relative = true;
			   	item6.geometry.offset = new mxPoint(-270, 10);
			   	item6.vertex = true;
			   	bg.insert(item6);
			   	
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Navbar');
			}),
					
			this.addEntry(dt + 'navbar with image', function()
	   		{
			   	var bg = new mxCell('', new mxGeometry(0, 0, 800, 60), 'html=1;shadow=0;dashed=0;fillColor=#F8F9FA;strokeColor=none;fontSize=16;fontColor=#181819;align=left;spacing=2;spacingLeft=55;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('', new mxGeometry(0, 0, 40, 40), s + 'logo;fillColor=#54407A;strokeColor=none;sketch=0;');
			   	item1.geometry.relative = true;
			   	item1.geometry.offset = new mxPoint(10, 10);
			   	item1.vertex = true;
			   	bg.insert(item1);
			   	
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Navbar with image');
			}),
					
			this.addEntry(dt + 'navbar with image', function()
	   		{
			   	var bg = new mxCell('Bootstrap', new mxGeometry(0, 0, 800, 60), 'html=1;shadow=0;dashed=0;fillColor=#F8F9FA;strokeColor=none;fontSize=16;fontColor=#181819;align=left;spacing=2;spacingLeft=55;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('', new mxGeometry(0, 0, 40, 40), s + 'logo;fillColor=#54407A;strokeColor=none;sketch=0;');
			   	item1.geometry.relative = true;
			   	item1.geometry.offset = new mxPoint(10, 10);
			   	item1.vertex = true;
			   	bg.insert(item1);
			   	
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Navbar with image');
			}),
					
			this.addEntry(dt + 'navbar with forms', function()
	   		{
			   	var bg = new mxCell('', new mxGeometry(0, 0, 800, 60), 'html=1;shadow=0;dashed=0;fillColor=#F8F9FA;strokeColor=none;fontSize=16;fontColor=#181819;align=left;spacing=15;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('Search', new mxGeometry(0, 0, 180, 40), s + 'rrect;rSize=5;fontSize=14;fontColor=#6C767D;strokeColor=#CED4DA;fillColor=#ffffff;align=left;spacing=10;');
			   	item1.geometry.relative = true;
			   	item1.geometry.offset = new mxPoint(10, 10);
			   	item1.vertex = true;
			   	bg.insert(item1);
			   	var item2 = new mxCell('Search', new mxGeometry(0, 0, 70, 40), s + 'rrect;rSize=5;fontSize=14;fontColor=#33A64C;strokeColor=#33A64C;fillColor=none;');
			   	item2.geometry.relative = true;
			   	item2.geometry.offset = new mxPoint(200, 10);
			   	item2.vertex = true;
			   	bg.insert(item2);
			   	
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Navbar with forms');
			}),
					
			this.addEntry(dt + 'navbar', function()
	   		{
			   	var bg = new mxCell('Navbar', new mxGeometry(0, 0, 800, 60), 'html=1;shadow=0;dashed=0;fillColor=#F8F9FA;strokeColor=none;fontSize=16;fontColor=#181819;align=left;spacing=15;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('Search', new mxGeometry(1, 0, 70, 40), s + 'rrect;rSize=5;fontSize=14;fontColor=#33A64C;strokeColor=#33A64C;fillColor=none;');
			   	item1.geometry.relative = true;
			   	item1.geometry.offset = new mxPoint(-80, 10);
			   	item1.vertex = true;
			   	bg.insert(item1);
			   	var item2 = new mxCell('Search', new mxGeometry(1, 0, 180, 40), s + 'rrect;rSize=5;fontSize=14;fontColor=#6C767D;strokeColor=#CED4DA;fillColor=#ffffff;align=left;spacing=10;');
			   	item2.geometry.relative = true;
			   	item2.geometry.offset = new mxPoint(-270, 10);
			   	item2.vertex = true;
			   	bg.insert(item2);
			   	
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Navbar');
			}),
					
			this.addEntry(dt + 'navbar with input group', function()
	   		{
			   	var bg = new mxCell('', new mxGeometry(0, 0, 800, 60), 'html=1;shadow=0;dashed=0;fillColor=#F8F9FA;strokeColor=none;fontSize=16;fontColor=#181819;align=left;spacing=15;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('Username', new mxGeometry(0, 0, 200, 40), s + 'rrect;rSize=5;strokeColor=#CED4DA;html=1;whiteSpace=wrap;fillColor=#FFFFFF;fontColor=#7D868C;align=left;spacingLeft=50;fontSize=14;');
			   	item1.geometry.relative = true;
			   	item1.geometry.offset = new mxPoint(10, 10);
			   	item1.vertex = true;
			   	bg.insert(item1);
			   	var item2 = new mxCell('@', new mxGeometry(0, 0, 40, 40), s + 'leftButton;strokeColor=inherit;gradientColor=inherit;fontColor=inherit;fillColor=#E9ECEF;rSize=5;perimeter=none;whiteSpace=wrap;resizeHeight=1;');
			   	item2.geometry.relative = true;
			   	item2.vertex = true;
			   	item1.insert(item2);
			   	
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Navbar with input group');
			}),
					
			this.addEntry(dt + 'navbar with varying button sizes', function()
	   		{
			   	var bg = new mxCell('', new mxGeometry(0, 0, 800, 60), 'html=1;shadow=0;dashed=0;fillColor=#F8F9FA;strokeColor=none;fontSize=16;fontColor=#181819;align=left;spacing=15;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('Main button', new mxGeometry(0, 0, 120, 40), s + 'rrect;rSize=5;strokeColor=#33A64C;html=1;whiteSpace=wrap;fillColor=none;fontColor=#33A64C;align=center;spacingLeft=0;fontSize=14;');
			   	item1.geometry.relative = true;
			   	item1.geometry.offset = new mxPoint(10, 10);
			   	item1.vertex = true;
			   	bg.insert(item1);
			   	var item2 = new mxCell('Smaller button', new mxGeometry(0, 0, 120, 30), s + 'rrect;rSize=5;;strokeColor=#6C767D;fontColor=#848D92;fillColor=none;rSize=5;perimeter=none;whiteSpace=wrap;resizeHeight=1;');
			   	item2.geometry.relative = true;
			   	item2.geometry.offset = new mxPoint(130, 15);
			   	item2.vertex = true;
			   	bg.insert(item2);
			   	
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Navbar with varying button sizes');
			}),
					
			this.addEntry(dt + 'navbar with inline element', function()
	   		{
			   	var bg = new mxCell('Navbar text with an inline element', new mxGeometry(0, 0, 800, 60), 'html=1;shadow=0;dashed=0;fillColor=#F8F9FA;strokeColor=none;fontSize=16;fontColor=#7C7C7D;align=left;spacing=15;');
			   	bg.vertex = true;
			   	
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Navbar with inline element');
			}),
					
			this.addEntry(dt + 'navbar with text', function()
	   		{
			   	var bg = new mxCell('Navbar text with an inline element', new mxGeometry(0, 0, 800, 60), 'html=1;shadow=0;dashed=0;fillColor=#F8F9FA;strokeColor=none;fontSize=16;fontColor=#7C7C7D;align=right;spacing=15;');
			   	bg.vertex = true;
			   	
			   	var item1 = new mxCell('Navbar w/ text', new mxGeometry(0, 0, 130, 40), 'strokeColor=none;html=1;whiteSpace=wrap;fillColor=none;fontColor=#181819;align=left;fontSize=16;spacing=10;');
			   	item1.geometry.relative = true;
			   	item1.geometry.offset = new mxPoint(10, 10);
			   	item1.vertex = true;
			   	bg.insert(item1);
			   	var item2 = new mxCell('Home', new mxGeometry(0, 0, 60, 40), 'strokeColor=none;html=1;whiteSpace=wrap;fillColor=none;fontColor=#181819;align=left;fontSize=14;spacing=10;');
			   	item2.geometry.relative = true;
			   	item2.geometry.offset = new mxPoint(140, 10);
			   	item2.vertex = true;
			   	bg.insert(item2);
			   	var item3 = new mxCell('Features', new mxGeometry(0, 0, 80, 40), 'strokeColor=none;html=1;whiteSpace=wrap;fillColor=none;fontColor=#7C7C7D;align=left;fontSize=14;spacing=10;');
			   	item3.geometry.relative = true;
			   	item3.geometry.offset = new mxPoint(200, 10);
			   	item3.vertex = true;
			   	bg.insert(item3);
			   	var item4 = new mxCell('Pricing', new mxGeometry(0, 0, 60, 40), 'strokeColor=none;html=1;whiteSpace=wrap;fillColor=none;fontColor=#7C7C7D;align=left;fontSize=14;spacing=10;');
			   	item4.geometry.relative = true;
			   	item4.geometry.offset = new mxPoint(280, 10);
			   	item4.vertex = true;
			   	bg.insert(item4);
			   	
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Navbar with text');
			}),
					
			this.addEntry(dt + 'navbar dark', function()
	   		{
			   	var bg = new mxCell('Navbar', new mxGeometry(0, 0, 800, 60), 'html=1;shadow=0;dashed=0;fillColor=#343A40;strokeColor=none;fontSize=16;fontColor=#ffffff;align=left;spacing=15;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('Home', new mxGeometry(0, 0, 70, 40), 'fillColor=none;strokeColor=none;fontSize=14;fontColor=#ffffff;align=center;');
			   	item1.geometry.relative = true;
			   	item1.geometry.offset = new mxPoint(70, 10);
			   	item1.vertex = true;
			   	bg.insert(item1);
			   	var item2 = new mxCell('Features', new mxGeometry(0, 0, 70, 40), 'fillColor=none;strokeColor=none;fontSize=14;fontColor=#9A9DA0;align=center;');
			   	item2.geometry.relative = true;
			   	item2.geometry.offset = new mxPoint(140, 10);
			   	item2.vertex = true;
			   	bg.insert(item2);
			   	var item3 = new mxCell('Pricing', new mxGeometry(0, 0, 80, 40), 'fillColor=none;strokeColor=none;fontSize=14;fontColor=#9A9DA0;align=center;spacingRight=0;');
			   	item3.geometry.relative = true;
			   	item3.geometry.offset = new mxPoint(210, 10);
			   	item3.vertex = true;
			   	bg.insert(item3);
			   	var item4 = new mxCell('About', new mxGeometry(0, 0, 80, 40), 'fillColor=none;strokeColor=none;fontSize=14;fontColor=#9A9DA0;align=center;');
			   	item4.geometry.relative = true;
			   	item4.geometry.offset = new mxPoint(290, 10);
			   	item4.vertex = true;
			   	bg.insert(item4);
			   	var item5 = new mxCell('Search', new mxGeometry(1, 0, 70, 40), s + 'rrect;rSize=5;fontSize=14;fontColor=#1CA5B8;strokeColor=#1CA5B8;fillColor=none;');
			   	item5.geometry.relative = true;
			   	item5.geometry.offset = new mxPoint(-80, 10);
			   	item5.vertex = true;
			   	bg.insert(item5);
			   	var item6 = new mxCell('Search', new mxGeometry(1, 0, 180, 40), s + 'rrect;rSize=5;fontSize=14;fontColor=#6C767D;strokeColor=#CED4DA;fillColor=#ffffff;align=left;spacing=10;');
			   	item6.geometry.relative = true;
			   	item6.geometry.offset = new mxPoint(-270, 10);
			   	item6.vertex = true;
			   	bg.insert(item6);
			   	
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Navbar dark');
			}),
					
			this.addEntry(dt + 'navbar blue', function()
	   		{
			   	var bg = new mxCell('Navbar', new mxGeometry(0, 0, 800, 60), 'html=1;shadow=0;dashed=0;fillColor=#0085FC;strokeColor=none;fontSize=16;fontColor=#ffffff;align=left;spacing=15;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('Home', new mxGeometry(0, 0, 70, 40), 'fillColor=none;strokeColor=none;fontSize=14;fontColor=#ffffff;align=center;');
			   	item1.geometry.relative = true;
			   	item1.geometry.offset = new mxPoint(70, 10);
			   	item1.vertex = true;
			   	bg.insert(item1);
			   	var item2 = new mxCell('Features', new mxGeometry(0, 0, 70, 40), 'fillColor=none;strokeColor=none;fontSize=14;fontColor=#79BFFD;align=center;');
			   	item2.geometry.relative = true;
			   	item2.geometry.offset = new mxPoint(140, 10);
			   	item2.vertex = true;
			   	bg.insert(item2);
			   	var item3 = new mxCell('Pricing', new mxGeometry(0, 0, 80, 40), 'fillColor=none;strokeColor=none;fontSize=14;fontColor=#79BFFD;align=center;spacingRight=0;');
			   	item3.geometry.relative = true;
			   	item3.geometry.offset = new mxPoint(210, 10);
			   	item3.vertex = true;
			   	bg.insert(item3);
			   	var item4 = new mxCell('About', new mxGeometry(0, 0, 80, 40), 'fillColor=none;strokeColor=none;fontSize=14;fontColor=#79BFFD;align=center;');
			   	item4.geometry.relative = true;
			   	item4.geometry.offset = new mxPoint(290, 10);
			   	item4.vertex = true;
			   	bg.insert(item4);
			   	var item5 = new mxCell('Search', new mxGeometry(1, 0, 70, 40), s + 'rrect;rSize=5;fontSize=14;fontColor=#ffffff;strokeColor=#ffffff;fillColor=none;');
			   	item5.geometry.relative = true;
			   	item5.geometry.offset = new mxPoint(-80, 10);
			   	item5.vertex = true;
			   	bg.insert(item5);
			   	var item6 = new mxCell('Search', new mxGeometry(1, 0, 180, 40), s + 'rrect;rSize=5;fontSize=14;fontColor=#6C767D;strokeColor=#CED4DA;fillColor=#ffffff;align=left;spacing=10;');
			   	item6.geometry.relative = true;
			   	item6.geometry.offset = new mxPoint(-270, 10);
			   	item6.vertex = true;
			   	bg.insert(item6);
			   	
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Navbar blue');
			}),
					
			this.addEntry(dt + 'navbar light', function()
	   		{
			   	var bg = new mxCell('Navbar', new mxGeometry(0, 0, 800, 60), 'html=1;shadow=0;dashed=0;fillColor=#E3F3FD;strokeColor=none;fontSize=16;fontColor=#161819;align=left;spacing=15;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('Home', new mxGeometry(0, 0, 70, 40), 'fillColor=none;strokeColor=none;fontSize=14;fontColor=#161819;align=center;');
			   	item1.geometry.relative = true;
			   	item1.geometry.offset = new mxPoint(70, 10);
			   	item1.vertex = true;
			   	bg.insert(item1);
			   	var item2 = new mxCell('Features', new mxGeometry(0, 0, 70, 40), 'fillColor=none;strokeColor=none;fontSize=14;fontColor=#71797E;align=center;');
			   	item2.geometry.relative = true;
			   	item2.geometry.offset = new mxPoint(140, 10);
			   	item2.vertex = true;
			   	bg.insert(item2);
			   	var item3 = new mxCell('Pricing', new mxGeometry(0, 0, 80, 40), 'fillColor=none;strokeColor=none;fontSize=14;fontColor=#71797E;align=center;spacingRight=0;');
			   	item3.geometry.relative = true;
			   	item3.geometry.offset = new mxPoint(210, 10);
			   	item3.vertex = true;
			   	bg.insert(item3);
			   	var item4 = new mxCell('About', new mxGeometry(0, 0, 80, 40), 'fillColor=none;strokeColor=none;fontSize=14;fontColor=#71797E;align=center;');
			   	item4.geometry.relative = true;
			   	item4.geometry.offset = new mxPoint(290, 10);
			   	item4.vertex = true;
			   	bg.insert(item4);
			   	var item5 = new mxCell('Search', new mxGeometry(1, 0, 70, 40), s + 'rrect;rSize=5;fontSize=14;fontColor=#0085FC;strokeColor=#0085FC;fillColor=none;');
			   	item5.geometry.relative = true;
			   	item5.geometry.offset = new mxPoint(-80, 10);
			   	item5.vertex = true;
			   	bg.insert(item5);
			   	var item6 = new mxCell('Search', new mxGeometry(1, 0, 180, 40), s + 'rrect;rSize=5;fontSize=14;fontColor=#6C767D;strokeColor=#CED4DA;fillColor=#ffffff;align=left;spacing=10;');
			   	item6.geometry.relative = true;
			   	item6.geometry.offset = new mxPoint(-270, 10);
			   	item6.vertex = true;
			   	bg.insert(item6);
			   	
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Navbar light');
			}),
					
			this.addEntry(dt + 'pagination', function()
	   		{
			   	var bg = new mxCell('', new mxGeometry(0, 0, 220, 30), s + 'rrect;rSize=5;strokeColor=#DEE2E6;html=1;whiteSpace=wrap;fillColor=#ffffff;fontColor=#0085FC;fontSize=14;');
			   	bg.vertex = true;
			   	var button1 = new mxCell('Previous', new mxGeometry(0, 0, 70, 30), inh + s + 'leftButton;rSize=5;perimeter=none;whiteSpace=wrap;resizeHeight=1;fontSize=14;');
			   	button1.geometry.relative = true;
			   	button1.vertex = true;
			   	bg.insert(button1);
			   	var button2 = new mxCell('1', new mxGeometry(0, 0, 30, 30), inh + 'html=1;shadow=0;dashed=0;perimeter=none;whiteSpace=wrap;resizeHeight=1;fontSize=14;');
			   	button2.geometry.relative = true;
			   	button2.geometry.offset = new mxPoint(70, 0);
			   	button2.vertex = true;
			   	bg.insert(button2);
			   	var button3 = new mxCell('2', new mxGeometry(0, 0, 30, 30), inh + 'html=1;shadow=0;dashed=0;perimeter=none;whiteSpace=wrap;resizeHeight=1;fontSize=14;');
			   	button3.geometry.relative = true;
			   	button3.geometry.offset = new mxPoint(100, 0);
			   	button3.vertex = true;
			   	bg.insert(button3);
			   	var button4 = new mxCell('3', new mxGeometry(0, 0, 30, 30), inh + 'html=1;shadow=0;dashed=0;perimeter=none;whiteSpace=wrap;resizeHeight=1;fontSize=14;');
			   	button4.geometry.relative = true;
			   	button4.geometry.offset = new mxPoint(130, 0);
			   	button4.vertex = true;
			   	bg.insert(button4);
			   	var button5 = new mxCell('Next', new mxGeometry(1, 0, 60, 30), inh + s + 'rightButton;rSize=5;perimeter=none;whiteSpace=wrap;resizeHeight=1;fontSize=14;');
			   	button5.geometry.relative = true;
			   	button5.geometry.offset = new mxPoint(-60, 0);
			   	button5.vertex = true;
			   	bg.insert(button5);
				
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Pagination');
			}),
		    
			this.addEntry(dt + 'pagination', function()
	   		{
			   	var bg = new mxCell('', new mxGeometry(0, 0, 150, 30), s + 'rrect;rSize=5;strokeColor=#DEE2E6;html=1;whiteSpace=wrap;fillColor=#ffffff;fontColor=#0085FC;');
			   	bg.vertex = true;
			   	var button1 = new mxCell('<<', new mxGeometry(0, 0, 30, 30), inh + s + 'leftButton;rSize=5;perimeter=none;whiteSpace=wrap;resizeHeight=1;fontSize=14;');
			   	button1.geometry.relative = true;
			   	button1.vertex = true;
			   	bg.insert(button1);
			   	var button2 = new mxCell('1', new mxGeometry(0, 0, 30, 30), inh + 'html=1;shadow=0;dashed=0;perimeter=none;whiteSpace=wrap;resizeHeight=1;fontSize=14;');
			   	button2.geometry.relative = true;
			   	button2.geometry.offset = new mxPoint(30, 0);
			   	button2.vertex = true;
			   	bg.insert(button2);
			   	var button3 = new mxCell('2', new mxGeometry(0, 0, 30, 30), inh + 'html=1;shadow=0;dashed=0;perimeter=none;whiteSpace=wrap;resizeHeight=1;fontSize=14;');
			   	button3.geometry.relative = true;
			   	button3.geometry.offset = new mxPoint(60, 0);
			   	button3.vertex = true;
			   	bg.insert(button3);
			   	var button4 = new mxCell('3', new mxGeometry(0, 0, 30, 30), inh + 'html=1;shadow=0;dashed=0;perimeter=none;whiteSpace=wrap;resizeHeight=1;fontSize=14;');
			   	button4.geometry.relative = true;
			   	button4.geometry.offset = new mxPoint(90, 0);
			   	button4.vertex = true;
			   	bg.insert(button4);
			   	var button5 = new mxCell('>>', new mxGeometry(1, 0, 30, 30), inh + s + 'rightButton;rSize=5;perimeter=none;whiteSpace=wrap;resizeHeight=1;fontSize=14;');
			   	button5.geometry.relative = true;
			   	button5.geometry.offset = new mxPoint(-30, 0);
			   	button5.vertex = true;
			   	bg.insert(button5);
				
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Pagination');
			}),
		    
			this.addEntry(dt + 'pagination with disabled and active states', function()
	   		{
			   	var bg = new mxCell('', new mxGeometry(0, 0, 220, 30), s + 'rrect;rSize=5;strokeColor=#DEE2E6;html=1;whiteSpace=wrap;fillColor=#ffffff;fontColor=#0085FC;fontSize=14;');
			   	bg.vertex = true;
			   	var button1 = new mxCell('Previous', new mxGeometry(0, 0, 70, 30), 
			   			'strokeColor=inherit;fillColor=inherit;gradientColor=inherit;' + s + 'leftButton;rSize=5;perimeter=none;whiteSpace=wrap;resizeHeight=1;fontColor=#6C767D;fontSize=14;');
			   	button1.geometry.relative = true;
			   	button1.vertex = true;
			   	bg.insert(button1);
			   	var button2 = new mxCell('1', new mxGeometry(0, 0, 30, 30), inh + 'html=1;shadow=0;dashed=0;perimeter=none;whiteSpace=wrap;resizeHeight=1;fontSize=14;');
			   	button2.geometry.relative = true;
			   	button2.geometry.offset = new mxPoint(70, 0);
			   	button2.vertex = true;
			   	bg.insert(button2);
			   	var button3 = new mxCell('2', new mxGeometry(0, 0, 30, 30), 'html=1;shadow=0;dashed=0;perimeter=none;whiteSpace=wrap;resizeHeight=1;fillColor=#0085FC;strokeColor=none;fontColor=#ffffff;fontSize=14;');
			   	button3.geometry.relative = true;
			   	button3.geometry.offset = new mxPoint(100, 0);
			   	button3.vertex = true;
			   	bg.insert(button3);
			   	var button4 = new mxCell('3', new mxGeometry(0, 0, 30, 30), inh + 'html=1;shadow=0;dashed=0;perimeter=none;whiteSpace=wrap;resizeHeight=1;fontSize=14;');
			   	button4.geometry.relative = true;
			   	button4.geometry.offset = new mxPoint(130, 0);
			   	button4.vertex = true;
			   	bg.insert(button4);
			   	var button5 = new mxCell('Next', new mxGeometry(1, 0, 60, 30), inh + s + 'rightButton;rSize=5;perimeter=none;whiteSpace=wrap;resizeHeight=1;fontSize=14;');
			   	button5.geometry.relative = true;
			   	button5.geometry.offset = new mxPoint(-60, 0);
			   	button5.vertex = true;
			   	bg.insert(button5);
				
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Pagination with disabled and active states');
			}),
		    
			this.addEntry(dt + 'pagination big', function()
	   		{
			   	var bg = new mxCell('', new mxGeometry(0, 0, 120, 40), s + 'rrect;rSize=5;strokeColor=#DEE2E6;html=1;whiteSpace=wrap;fillColor=#ffffff;fontColor=#0085FC;');
			   	bg.vertex = true;
			   	var button1 = new mxCell('1', new mxGeometry(0, 0, 40, 40), 
			   			'strokeColor=inherit;fillColor=inherit;gradientColor=inherit;' + s + 'leftButton;rSize=5;perimeter=none;whiteSpace=wrap;resizeHeight=1;fillColor=#0085FC;strokeColor=none;fontColor=#ffffff;fontSize=16;');
			   	button1.geometry.relative = true;
			   	button1.vertex = true;
			   	bg.insert(button1);
			   	var button3 = new mxCell('2', new mxGeometry(0, 0, 40, 40), inh + 'html=1;shadow=0;dashed=0;perimeter=none;whiteSpace=wrap;resizeHeight=1;fontSize=16;');
			   	button3.geometry.relative = true;
			   	button3.geometry.offset = new mxPoint(40, 0);
			   	button3.vertex = true;
			   	bg.insert(button3);
			   	var button5 = new mxCell('3', new mxGeometry(1, 0, 40, 40), inh + s + 'rightButton;rSize=5;perimeter=none;whiteSpace=wrap;resizeHeight=1;fontSize=16;');
			   	button5.geometry.relative = true;
			   	button5.geometry.offset = new mxPoint(-40, 0);
			   	button5.vertex = true;
			   	bg.insert(button5);
				
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Pagination, big');
			}),
		    
			this.addEntry(dt + 'pagination small', function()
	   		{
			   	var bg = new mxCell('', new mxGeometry(0, 0, 75, 25), s + 'rrect;rSize=5;strokeColor=#DEE2E6;html=1;whiteSpace=wrap;fillColor=#ffffff;fontColor=#0085FC;');
			   	bg.vertex = true;
			   	var button1 = new mxCell('1', new mxGeometry(0, 0, 25, 25), 
			   			'strokeColor=inherit;fillColor=inherit;gradientColor=inherit;' + s + 'leftButton;rSize=5;perimeter=none;whiteSpace=wrap;resizeHeight=1;fillColor=#0085FC;strokeColor=none;fontColor=#ffffff;fontSize=12;');
			   	button1.geometry.relative = true;
			   	button1.vertex = true;
			   	bg.insert(button1);
			   	var button3 = new mxCell('2', new mxGeometry(0, 0, 25, 25), inh + 'html=1;shadow=0;dashed=0;perimeter=none;whiteSpace=wrap;resizeHeight=1;fontSize=12;');
			   	button3.geometry.relative = true;
			   	button3.geometry.offset = new mxPoint(25, 0);
			   	button3.vertex = true;
			   	bg.insert(button3);
			   	var button5 = new mxCell('3', new mxGeometry(1, 0, 25, 25), inh + s + 'rightButton;rSize=5;perimeter=none;whiteSpace=wrap;resizeHeight=1;fontSize=12;');
			   	button5.geometry.relative = true;
			   	button5.geometry.offset = new mxPoint(-25, 0);
			   	button5.vertex = true;
			   	bg.insert(button5);
				
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Pagination, small');
			}),
		    
			this.addEntry(dt + 'popover', function()
	   		{
			   	var bg = new mxCell('And here\'s some amazing content. It\'s very engaging. Right?', new mxGeometry(0, 0, 200, 60), 
			   			s + 'popover;fillColor=#ffffff;strokeColor=#CCCCCC;dx=35;dy=5;rSize=5;direction=south;whiteSpace=wrap;verticalAlign=bottom;spacing=5;fontSize=10;spacingLeft=5;align=left;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('Popover title', new mxGeometry(1, 0, 195, 25), s + 'topButton;rSize=5;fillColor=#F7F7F7;strokeColor=#CCCCCC;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=left;spacing=5;');
			   	item1.geometry.relative = true;
			   	item1.geometry.offset = new mxPoint(-195, 0);
			   	item1.vertex = true;
			   	bg.insert(item1);
				
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Popover');
			}),
		    
			this.addEntry(dt + 'popover on top', function()
	   		{
			   	var bg = new mxCell('Vivamus sagittis lacus vel augue laoreet rutrum faucibus.', new mxGeometry(0, 0, 200, 50), 
			   			s + 'popover;fillColor=#ffffff;strokeColor=#CCCCCC;dx=100;dy=5;rSize=5;whiteSpace=wrap;verticalAlign=top;spacing=10;fontSize=10;spacingLeft=0;align=left;spacingTop=-5;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('Popover on top', new mxGeometry(50, 50, 100, 30), s + 'rrect;rSize=5;fillColor=#6C767D;strokeColor=none;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=center;spacing=5;fontColor=#FFFFFF;');
			   	item1.vertex = true;
				
		   		return sb.createVertexTemplateFromCells([bg, item1], 200, 80, 'Popover on top');
			}),
				    
			this.addEntry(dt + 'progress bar', function()
	   		{
			   	var bg = new mxCell('', new mxGeometry(0, 0, 800, 20), 
			   			s + 'rrect;rSize=5;fillColor=#E9ECEF;strokeColor=none;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('', new mxGeometry(0, 0, 250, 20), s + 'leftButton;rSize=5;fillColor=#0085FC;strokeColor=none;resizeHeight=1;');
			   	item1.geometry.relative = true;
			   	item1.vertex = true;
			   	bg.insert(item1);
				
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Progress bar');
			}),
						    
			this.addEntry(dt + 'progress bar with label', function()
	   		{
			   	var bg = new mxCell('', new mxGeometry(0, 0, 800, 20), 
			   			s + 'rrect;rSize=5;fillColor=#E9ECEF;strokeColor=none;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('25%', new mxGeometry(0, 0, 250, 20), s + 'leftButton;rSize=5;fillColor=#0085FC;strokeColor=none;fontColor=#ffffff;resizeHeight=1;');
			   	item1.geometry.relative = true;
			   	item1.vertex = true;
			   	bg.insert(item1);
				
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Progress bar with label');
			}),
						    
			this.addEntry(dt + 'progress bar green', function()
	   		{
			   	var bg = new mxCell('', new mxGeometry(0, 0, 800, 20), 
			   			s + 'rrect;rSize=5;fillColor=#E9ECEF;strokeColor=none;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('', new mxGeometry(0, 0, 250, 20), s + 'leftButton;rSize=5;fillColor=#33A64C;strokeColor=none;resizeHeight=1;');
			   	item1.geometry.relative = true;
			   	item1.vertex = true;
			   	bg.insert(item1);
				
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Progress bar, green');
			}),
						    
			this.addEntry(dt + 'progress bar azure', function()
	   		{
			   	var bg = new mxCell('', new mxGeometry(0, 0, 800, 20), 
			   			s + 'rrect;rSize=5;fillColor=#E9ECEF;strokeColor=none;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('', new mxGeometry(0, 0, 250, 20), s + 'leftButton;rSize=5;fillColor=#1CA5B8;strokeColor=none;resizeHeight=1;');
			   	item1.geometry.relative = true;
			   	item1.vertex = true;
			   	bg.insert(item1);
				
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Progress bar, azure');
			}),
						    
			this.addEntry(dt + 'progress bar yellow', function()
	   		{
			   	var bg = new mxCell('', new mxGeometry(0, 0, 800, 20), 
			   			s + 'rrect;rSize=5;fillColor=#E9ECEF;strokeColor=none;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('', new mxGeometry(0, 0, 250, 20), s + 'leftButton;rSize=5;fillColor=#FFBC26;strokeColor=none;resizeHeight=1;');
			   	item1.geometry.relative = true;
			   	item1.vertex = true;
			   	bg.insert(item1);
				
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Progress bar, yellow');
			}),
								    
			this.addEntry(dt + 'progress bar red', function()
	   		{
			   	var bg = new mxCell('', new mxGeometry(0, 0, 800, 20), 
			   			s + 'rrect;rSize=5;fillColor=#E9ECEF;strokeColor=none;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('', new mxGeometry(0, 0, 250, 20), s + 'leftButton;rSize=5;fillColor=#DB2843;strokeColor=none;resizeHeight=1;');
			   	item1.geometry.relative = true;
			   	item1.vertex = true;
			   	bg.insert(item1);
				
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Progress bar, red');
			}),
										    
			this.addEntry(dt + 'progress bar multiple', function()
	   		{
			   	var bg = new mxCell('', new mxGeometry(0, 0, 800, 20), 
			   			s + 'rrect;rSize=5;fillColor=#E9ECEF;strokeColor=none;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('', new mxGeometry(0, 0, 550, 20), s + 'leftButton;rSize=5;fillColor=#1CA5B8;strokeColor=none;resizeHeight=1;');
			   	item1.geometry.relative = true;
			   	item1.vertex = true;
			   	bg.insert(item1);
			   	var item2 = new mxCell('', new mxGeometry(0, 0, 400, 20), s + 'leftButton;rSize=5;fillColor=#33A64C;strokeColor=none;resizeHeight=1;');
			   	item2.geometry.relative = true;
			   	item2.vertex = true;
			   	bg.insert(item2);
			   	var item3 = new mxCell('', new mxGeometry(0, 0, 150, 20), s + 'leftButton;rSize=5;fillColor=#0085FC;strokeColor=none;resizeHeight=1;');
			   	item3.geometry.relative = true;
			   	item3.vertex = true;
			   	bg.insert(item3);
				
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Progress, multiple');
			}),
										    
		   	this.addEntry(dt + 'progress bar striped blue', function()
		   	{
			   	var bg1 = new mxCell('', new mxGeometry(0, 0, 800, 20), s + 'rrect;rSize=5;strokeColor=none;fillColor=#f6f6f6;whiteSpace=wrap;');
			   	bg1.vertex = true;
			   	var bg2 = new mxCell('', new mxGeometry(0, 0, 500, 20), s + 'leftButtonStriped;fillColor=#0085FC;fontColor=#FFFFFF;whiteSpace=wrap;');
			   	bg2.vertex = true;
			   	bg1.insert(bg2);
			    
			   	return sb.createVertexTemplateFromCells([bg1], bg1.geometry.width, bg1.geometry.height, 'Progress bar, striped, blue');
			}),
	
		   	this.addEntry(dt + 'progress bar striped green', function()
		   	{
			   	var bg1 = new mxCell('', new mxGeometry(0, 0, 800, 20), s + 'rrect;rSize=5;strokeColor=none;fillColor=#f6f6f6;whiteSpace=wrap;');
			   	bg1.vertex = true;
			   	var bg2 = new mxCell('', new mxGeometry(0, 0, 500, 20), s + 'leftButtonStriped;fillColor=#59B958;fontColor=#FFFFFF;whiteSpace=wrap;');
			   	bg2.vertex = true;
			   	bg1.insert(bg2);
			    
			   	return sb.createVertexTemplateFromCells([bg1], bg1.geometry.width, bg1.geometry.height, 'Progress Bar, striped, green');
			}),
	
		   	this.addEntry(dt + 'progress bar striped light blue', function()
		   	{
			   	var bg1 = new mxCell('', new mxGeometry(0, 0, 800, 20), s + 'rrect;rSize=5;strokeColor=none;fillColor=#f6f6f6;whiteSpace=wrap;');
			   	bg1.vertex = true;
			   	var bg2 = new mxCell('', new mxGeometry(0, 0, 500, 20), s + 'leftButtonStriped;fillColor=#55BFE0;fontColor=#FFFFFF;whiteSpace=wrap;');
			   	bg2.vertex = true;
			   	bg1.insert(bg2);
			    
			   	return sb.createVertexTemplateFromCells([bg1], bg1.geometry.width, bg1.geometry.height, 'Progress bar, striped, light blue');
			}),
	
		   	this.addEntry(dt + 'progress bar striped yellow', function()
		   	{
			   	var bg1 = new mxCell('', new mxGeometry(0, 0, 800, 20), s + 'rrect;rSize=5;strokeColor=none;fillColor=#f6f6f6;whiteSpace=wrap;');
			   	bg1.vertex = true;
			   	var bg2 = new mxCell('', new mxGeometry(0, 0, 500, 20), s + 'leftButtonStriped;fillColor=#EFAC43;fontColor=#FFFFFF;whiteSpace=wrap;');
			   	bg2.vertex = true;
			   	bg1.insert(bg2);
			    
			   	return sb.createVertexTemplateFromCells([bg1], bg1.geometry.width, bg1.geometry.height, 'Progress bar, striped, yellow');
			}),
	
		   	this.addEntry(dt + 'progress bar striped red', function()
		   	{
			   	var bg1 = new mxCell('', new mxGeometry(0, 0, 800, 20), s + 'rrect;rSize=5;strokeColor=none;fillColor=#f6f6f6;whiteSpace=wrap;');
			   	bg1.vertex = true;
			   	var bg2 = new mxCell('', new mxGeometry(0, 0, 500, 20), s + 'leftButtonStriped;fillColor=#DB524C;fontColor=#FFFFFF;whiteSpace=wrap;');
			   	bg2.vertex = true;
			   	bg1.insert(bg2);
			    
			   	return sb.createVertexTemplateFromCells([bg1], bg1.geometry.width, bg1.geometry.height, 'Progress bar, striped, red');
			}),
			
		   	this.addEntry(dt + 'scrollspy', function()
		   	{
			   	var item1 = new mxCell('Navbar', new mxGeometry(0, 0, 800, 40), 'fillColor=#F8F9FA;strokeColor=none;align=left;fontSize=14;spacing=10;');
			   	item1.vertex = true;
			   	var item2 = new mxCell('@fat', new mxGeometry(1, 0, 50, 30), s + 'rrect;rSize=5;fillColor=#0085FC;strokeColor=none;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=center;spacing=5;fontColor=#FFFFFF;');
			   	item2.geometry.relative = true;
			   	item2.geometry.offset = new mxPoint(-210, 5);
			   	item2.vertex = true;
			   	item1.insert(item2);
			   	var item3 = new mxCell('@mdo', new mxGeometry(1, 0, 60, 30), 'fillColor=none;strokeColor=none;perimeter=none;whiteSpace=wrap;fontColor=#0085FC;');
			   	item3.geometry.relative = true;
			   	item3.geometry.offset = new mxPoint(-160, 5);
			   	item3.vertex = true;
			   	item1.insert(item3);
			   	var item4 = new mxCell('Dropdown', new mxGeometry(1, 0, 90, 30), 'fillColor=none;strokeColor=none;perimeter=none;whiteSpace=wrap;fontColor=#0085FC;align=right;spacingRight=20;');
			   	item4.geometry.relative = true;
			   	item4.geometry.offset = new mxPoint(-100, 5);
			   	item4.vertex = true;
			   	item1.insert(item4);
			   	var marker1 = new mxCell('', new mxGeometry(1, 0.5, 10, 5), 'shape=triangle;direction=south;fillColor=#0085FC;strokeColor=none;perimeter=none;');
			   	marker1.geometry.relative = true;
			   	marker1.geometry.offset = new mxPoint(-17, -2.5);
			   	marker1.vertex = true;
			   	item4.insert(marker1);
			   	var item5 = new mxCell('<font size="1"><b style="font-size: 18px">@fat</b></font><br style="font-size: 14px">Ad leggings keytar, brunch id art party dolor labore. Pitchfork yr enim lo-fi before they sold out qui. Tumblr farm-to-table bicycle rights whatever. Anim keffiyeh carles cardigan. Velit seitan mcsweeney\'s photo booth 3 wolf moon irure. Cosby sweater lomo jean shorts, williamsburg hoodie minim qui you probably haven\'t heard of them et cardigan trust fund culpa biodiesel wes anderson aesthetic. Nihil tattooed accusamus, cred irony biodiesel keffiyeh artisan ullamco consequat.<br><br><br style="font-size: 14px"><b><font style="font-size: 16px">@mdo</font></b><br style="font-size: 14px">Veniam marfa mustache skateboard, adipisicing fugiat velit pitchfork beard. Freegan beard aliqua cupidatat mcsweeney\'s vero. Cupidatat four loko nisi, ea helvetica nulla carles. Tattooed cosby sweater food truck, mcsweeney\'s quis non freegan vinyl. Lo-fi wes anderson +1 sartorial. Carles non aesthetic exercitation quis gentrify. Brooklyn adipisicing craft beer vice keytar deserunt.', 
			   			new mxGeometry(0, 0, 800, 200), 'fillColor=none;strokeColor=none;perimeter=none;whiteSpace=wrap;fontColor=#212529;html=1;align=left;verticalAlign=top;spacingRight=25;');
			   	item5.geometry.relative = true;
			   	item5.geometry.offset = new mxPoint(0, 50);
			   	item5.vertex = true;
			   	var item6 = new mxCell('', new mxGeometry(1, 0, 20, 200), 'html=1;shadow=0;dashed=0;fillColor=#F1F1F1;strokeColor=none;');
			   	item6.geometry.relative = true;
			   	item6.geometry.offset = new mxPoint(-20, 0);
			   	item6.vertex = true;
			   	item5.insert(item6);
			   	var item7 = new mxCell('', new mxGeometry(0, 0, 16, 45), 'fillColor=#C1C1C1;strokeColor=none;');
			   	item7.geometry.relative = true;
			   	item7.geometry.offset = new mxPoint(2, 20);
			   	item7.vertex = true;
			   	item6.insert(item7);
			   	var item8 = new mxCell('', new mxGeometry(0, 0, 10, 5), 'shape=triangle;direction=north;fillColor=#C1C1C1;strokeColor=none;perimeter=none;');
			   	item8.geometry.relative = true;
			   	item8.geometry.offset = new mxPoint(5, 7.5);
			   	item8.vertex = true;
			   	item6.insert(item8);
			   	var item9 = new mxCell('', new mxGeometry(0, 1, 10, 5), 'shape=triangle;direction=south;fillColor=#505050;strokeColor=none;perimeter=none;');
			   	item9.geometry.relative = true;
			   	item9.geometry.offset = new mxPoint(5, -12.5);
			   	item9.vertex = true;
			   	item6.insert(item9);
			   	return sb.createVertexTemplateFromCells([item1, item5], 800, 300, 'Scrollspy');
			}),
			
			this.addEntry(dt + 'nested nav', function()
	   		{
			   	var item1 = new mxCell('', new mxGeometry(0, 0, 300, 330), 'fillColor=#F8F9FA;strokeColor=none;align=left;fontSize=14;fontColor=#323232;');
			   	item1.vertex = true;
			   	var item2 = new mxCell('Navbar', new mxGeometry(0, 0, 300, 40), 'html=1;shadow=0;dashed=0;fillColor=none;strokeColor=none;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=center;fontSize=18;');
			   	item2.geometry.relative = true;
			   	item2.vertex = true;
			   	item1.insert(item2);
			   	var item3 = new mxCell('Item 1', new mxGeometry(0.5, 0, 100, 40), s + 'rrect;rSize=5;fillColor=#0085FC;strokeColor=none;perimeter=none;whiteSpace=wrap;align=left;spacing=15;fontColor=#FFFFFF;fontSize=14;');
			   	item3.geometry.relative = true;
			   	item3.geometry.offset = new mxPoint(-50, 40);
			   	item3.vertex = true;
			   	item1.insert(item3);
			   	var item4 = new mxCell('Item 1-1', new mxGeometry(0.5, 0, 100, 40), 'html=1;shadow=0;dashed=0;fillColor=none;strokeColor=none;perimeter=none;whiteSpace=wrap;align=left;spacing=15;fontColor=#0085FC;fontSize=14;');
			   	item4.geometry.relative = true;
			   	item4.geometry.offset = new mxPoint(-40, 80);
			   	item4.vertex = true;
			   	item1.insert(item4);
			   	var item5 = new mxCell('Item 1-2', new mxGeometry(0.5, 0, 100, 40), 'html=1;shadow=0;dashed=0;fillColor=none;strokeColor=none;perimeter=none;whiteSpace=wrap;align=left;spacing=15;fontColor=#0085FC;fontSize=14;');
			   	item5.geometry.relative = true;
			   	item5.geometry.offset = new mxPoint(-40, 120);
			   	item5.vertex = true;
			   	item1.insert(item5);
			   	var item6 = new mxCell('Item 2', new mxGeometry(0.5, 0, 100, 40), 'html=1;shadow=0;dashed=0;fillColor=none;strokeColor=none;perimeter=none;whiteSpace=wrap;align=left;spacing=15;fontColor=#0085FC;fontSize=14;');
			   	item6.geometry.relative = true;
			   	item6.geometry.offset = new mxPoint(-50, 160);
			   	item6.vertex = true;
			   	item1.insert(item6);
			   	var item7 = new mxCell('Item 3', new mxGeometry(0.5, 0, 100, 40), 'html=1;shadow=0;dashed=0;fillColor=none;strokeColor=none;perimeter=none;whiteSpace=wrap;align=left;spacing=15;fontColor=#0085FC;fontSize=14;');
			   	item7.geometry.relative = true;
			   	item7.geometry.offset = new mxPoint(-50, 200);
			   	item7.vertex = true;
			   	item1.insert(item7);
			   	var item8 = new mxCell('Item 3-1', new mxGeometry(0.5, 0, 100, 40), 'html=1;shadow=0;dashed=0;fillColor=none;strokeColor=none;perimeter=none;whiteSpace=wrap;align=left;spacing=15;fontColor=#0085FC;fontSize=14;');
			   	item8.geometry.relative = true;
			   	item8.geometry.offset = new mxPoint(-40, 240);
			   	item8.vertex = true;
			   	item1.insert(item8);
			   	var item8 = new mxCell('Item 3-2', new mxGeometry(0.5, 0, 100, 40), 'html=1;shadow=0;dashed=0;fillColor=none;strokeColor=none;perimeter=none;whiteSpace=wrap;align=left;spacing=15;fontColor=#0085FC;fontSize=14;');
			   	item8.geometry.relative = true;
			   	item8.geometry.offset = new mxPoint(-40, 280);
			   	item8.vertex = true;
			   	item1.insert(item8);
			   	var item9 = new mxCell('<font style="font-size: 18px"><b>Item 1</b></font><br>Ex consequat commodo adipisicing exercitation aute excepteur occaecat ullamco duis aliqua id magna ullamco eu. Do aute ipsum ipsum ullamco cillum consectetur ut et aute consectetur labore. Fugiat laborum incididunt tempor eu consequat enim dolore proident. Qui laborum do non excepteur nulla magna eiusmod consectetur in. Aliqua et aliqua officia quis et incididunt voluptate non anim reprehenderit adipisicing dolore ut consequat deserunt mollit dolore. Aliquip nulla enim veniam non fugiat id cupidatat nulla elit cupidatat commodo velit ut eiusmod cupidatat elit dolore.<br><br><b><font style="font-size: 16px">Item 1-1</font></b><br>Amet tempor mollit aliquip pariatur excepteur commodo do ea cillum commodo Lorem et occaecat elit qui et. Aliquip labore ex ex esse voluptate occaecat Lorem ullamco deserunt. Aliqua cillum excepteur irure consequat id quis ea. Sit proident ullamco aute magna pariatur nostrud labore. Reprehenderit aliqua commodo eiusmod aliquip est do duis amet proident magna consectetur consequat eu commodo fugiat non quis. Enim aliquip exercitation ullamco adipisicing voluptate', 
			   			new mxGeometry(320, 0, 480, 330), 'fillColor=none;strokeColor=none;align=left;fontSize=14;fontColor=#323232;html=1;whiteSpace=wrap;verticalAlign=top;spacingRight=25;');
			   	item9.vertex = true;
				
			   	var item10 = new mxCell('', new mxGeometry(1, 0, 20, 330), 'html=1;shadow=0;dashed=0;fillColor=#F1F1F1;strokeColor=none;');
			   	item10.geometry.relative = true;
			   	item10.geometry.offset = new mxPoint(-20, 0);
			   	item10.vertex = true;
			   	item9.insert(item10);
			   	var item11 = new mxCell('', new mxGeometry(0, 0, 16, 45), 'fillColor=#C1C1C1;strokeColor=none;');
			   	item11.geometry.relative = true;
			   	item11.geometry.offset = new mxPoint(2, 20);
			   	item11.vertex = true;
			   	item10.insert(item11);
			   	var item12 = new mxCell('', new mxGeometry(0, 0, 10, 5), 'shape=triangle;direction=north;fillColor=#C1C1C1;strokeColor=none;perimeter=none;');
			   	item12.geometry.relative = true;
			   	item12.geometry.offset = new mxPoint(5, 7.5);
			   	item12.vertex = true;
			   	item10.insert(item12);
			   	var item13 = new mxCell('', new mxGeometry(0, 1, 10, 5), 'shape=triangle;direction=south;fillColor=#505050;strokeColor=none;perimeter=none;');
			   	item13.geometry.relative = true;
			   	item13.geometry.offset = new mxPoint(5, -12.5);
			   	item13.vertex = true;
			   	item10.insert(item13);
			   	
		   		return sb.createVertexTemplateFromCells([item1, item9], 800, 330, 'Nested nav');
			}),
			
			this.addEntry(dt + 'nav with list group', function()
	   		{
			   	var item1 = new mxCell('', new mxGeometry(0, 0, 250, 160), s + 'rrect;rSize=5;strokeColor=#DFDFDF;html=1;whiteSpace=wrap;fillColor=#FFFFFF;fontColor=#000000;');
			   	item1.vertex = true;
			   	var button1 = new mxCell('Item 1', new mxGeometry(0, 0, 250, 40), s + 'topButton;rSize=5;strokeColor=none;fillColor=#0085FC;fontColor=#ffffff;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=left;spacing=15;fontSize=14;');
			   	button1.geometry.relative = true;
			   	button1.vertex = true;
			   	item1.insert(button1);
			   	var button2 = new mxCell('Item 2', new mxGeometry(0, 0, 250, 40), inh + 'html=1;shadow=0;dashed=0;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=left;spacing=15;fontSize=14;');
			   	button2.geometry.relative = true;
			   	button2.geometry.offset = new mxPoint(0, 40);
			   	button2.vertex = true;
			   	item1.insert(button2);
			   	var button3 = new mxCell('Item 3', new mxGeometry(0, 0, 250, 40), inh + 'html=1;shadow=0;dashed=0;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=left;spacing=15;fontSize=14;');
			   	button3.geometry.relative = true;
			   	button3.geometry.offset = new mxPoint(0, 80);
			   	button3.vertex = true;
			   	item1.insert(button3);
			   	var button4 = new mxCell('Item 4', new mxGeometry(0, 1, 250, 40), inh + s + 'bottomButton;rSize=5;perimeter=none;whiteSpace=wrap;resizeWidth=1;resizeHeight=0;align=left;spacing=15;fontSize=14;');
			   	button4.geometry.relative = true;
			   	button4.geometry.offset = new mxPoint(0, -40);
			   	button4.vertex = true;
			   	item1.insert(button4);
			   	var item9 = new mxCell('<font style="font-size: 18px"><b>Item 1</b></font><br>Ex consequat commodo adipisicing exercitation aute excepteur occaecat ullamco duis aliqua id magna ullamco eu. Do aute ipsum ipsum ullamco cillum consectetur ut et aute consectetur labore. Fugiat laborum incididunt tempor eu consequat enim dolore proident. Qui laborum do non excepteur nulla magna eiusmod consectetur in. Aliqua et aliqua officia quis et incididunt voluptate non anim reprehenderit adipisicing dolore ut consequat deserunt mollit dolore. Aliquip nulla enim veniam non fugiat id cupidatat nulla elit cupidatat commodo velit ut eiusmod cupidatat elit dolore.', 
			   			new mxGeometry(270, 0, 530, 160), 'fillColor=none;strokeColor=none;align=left;fontSize=14;fontColor=#323232;html=1;whiteSpace=wrap;verticalAlign=top;spacingRight=25;');
			   	item9.vertex = true;
			   	var item10 = new mxCell('', new mxGeometry(1, 0, 20, 160), 'html=1;shadow=0;dashed=0;fillColor=#F1F1F1;strokeColor=none;resizeHeight=1;');
			   	item10.geometry.relative = true;
			   	item10.geometry.offset = new mxPoint(-20, 0);
			   	item10.vertex = true;
			   	item9.insert(item10);
			   	var item11 = new mxCell('', new mxGeometry(0, 0, 16, 45), 'fillColor=#C1C1C1;strokeColor=none;');
			   	item11.geometry.relative = true;
			   	item11.geometry.offset = new mxPoint(2, 20);
			   	item11.vertex = true;
			   	item10.insert(item11);
			   	var item12 = new mxCell('', new mxGeometry(0, 0, 10, 5), 'shape=triangle;direction=north;fillColor=#C1C1C1;strokeColor=none;perimeter=none;');
			   	item12.geometry.relative = true;
			   	item12.geometry.offset = new mxPoint(5, 7.5);
			   	item12.vertex = true;
			   	item10.insert(item12);
			   	var item13 = new mxCell('', new mxGeometry(0, 1, 10, 5), 'shape=triangle;direction=south;fillColor=#505050;strokeColor=none;perimeter=none;');
			   	item13.geometry.relative = true;
			   	item13.geometry.offset = new mxPoint(5, -12.5);
			   	item13.vertex = true;
			   	item10.insert(item13);
			   	
		   		return sb.createVertexTemplateFromCells([item1, item9], 800, 160, 'Nav with list-group');
			}),
			
			this.createVertexTemplateEntry('html=1;shadow=0;dashed=0;shape=mxgraph.basic.arc;startAngle=0.25;endAngle=1;strokeWidth=4;strokeColor=#0085FC;', 
					30, 30, '', 'Border spinner', null, null, this.getTagsForStencil(gn, 'border spinner', dt).join(' ')),
			this.createVertexTemplateEntry('html=1;shadow=0;dashed=0;shape=mxgraph.basic.arc;startAngle=0.25;endAngle=1;strokeWidth=4;strokeColor=#6C767D;', 
					30, 30, '', 'Border spinner', null, null, this.getTagsForStencil(gn, 'border spinner', dt).join(' ')),
			this.createVertexTemplateEntry('html=1;shadow=0;dashed=0;shape=mxgraph.basic.arc;startAngle=0.25;endAngle=1;strokeWidth=4;strokeColor=#34A64D;', 
					30, 30, '', 'Border spinner', null, null, this.getTagsForStencil(gn, 'border spinner', dt).join(' ')),
			this.createVertexTemplateEntry('html=1;shadow=0;dashed=0;shape=mxgraph.basic.arc;startAngle=0.25;endAngle=1;strokeWidth=4;strokeColor=#DB2843;', 
					30, 30, '', 'Border spinner', null, null, this.getTagsForStencil(gn, 'border spinner', dt).join(' ')),
			this.createVertexTemplateEntry('html=1;shadow=0;dashed=0;shape=mxgraph.basic.arc;startAngle=0.25;endAngle=1;strokeWidth=4;strokeColor=#FFBC26;', 
					30, 30, '', 'Border spinner', null, null, this.getTagsForStencil(gn, 'border spinner', dt).join(' ')),
			this.createVertexTemplateEntry('html=1;shadow=0;dashed=0;shape=mxgraph.basic.arc;startAngle=0.25;endAngle=1;strokeWidth=4;strokeColor=#1CA5B8;', 
					30, 30, '', 'Border spinner', null, null, this.getTagsForStencil(gn, 'border spinner', dt).join(' ')),
			this.createVertexTemplateEntry('html=1;shadow=0;dashed=0;shape=mxgraph.basic.arc;startAngle=0.25;endAngle=1;strokeWidth=4;strokeColor=#F8F9FA;', 
					30, 30, '', 'Border spinner', null, null, this.getTagsForStencil(gn, 'border spinner', dt).join(' ')),
			this.createVertexTemplateEntry('html=1;shadow=0;dashed=0;shape=mxgraph.basic.arc;startAngle=0.25;endAngle=1;strokeWidth=4;strokeColor=#343A40;', 
					30, 30, '', 'Border spinner', null, null, this.getTagsForStencil(gn, 'border spinner', dt).join(' ')),
					
			this.addEntry(dt + 'button with spinner', function()
	   		{
			   	var bg = new mxCell('', new mxGeometry(0, 0, 40, 40), s + 'rrect;rSize=5;strokeColor=none;html=1;whiteSpace=wrap;fillColor=#59AFFD;fontColor=#ffffff;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('', new mxGeometry(0.5, 0.5, 20, 20), 'html=1;shadow=0;dashed=0;shape=mxgraph.basic.arc;startAngle=0.25;endAngle=1;strokeWidth=4;strokeColor=#ffffff;');
			   	item1.geometry.relative = true;
			   	item1.geometry.offset = new mxPoint(-10, -10);
			   	item1.vertex = true;
			   	bg.insert(item1);
			   	
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Button with spinner');
			}),
			
			this.addEntry(dt + 'button with spinner', function()
	   		{
			   	var bg = new mxCell('Loading...', new mxGeometry(0, 0, 110, 40), s + 'rrect;rSize=5;strokeColor=none;html=1;whiteSpace=wrap;fillColor=#59AFFD;fontColor=#ffffff;align=right;spacing=10;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('', new mxGeometry(0, 0.5, 20, 20), 'html=1;shadow=0;dashed=0;shape=mxgraph.basic.arc;startAngle=0.25;endAngle=1;strokeWidth=4;strokeColor=#ffffff;');
			   	item1.geometry.relative = true;
			   	item1.geometry.offset = new mxPoint(15, -10);
			   	item1.vertex = true;
			   	bg.insert(item1);
			   	
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Button with spinner');
			}),
			
			this.addEntry(dt + 'button with grow spinner', function()
	   		{
			   	var bg = new mxCell('', new mxGeometry(0, 0, 40, 40), s + 'rrect;rSize=5;strokeColor=none;html=1;whiteSpace=wrap;fillColor=#59AFFD;fontColor=#ffffff;align=right;spacing=10;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('', new mxGeometry(0.5, 0.5, 20, 20), 'html=1;shadow=0;dashed=0;shape=ellipse;strokeColor=none;fillColor=#ffffff;');
			   	item1.geometry.relative = true;
			   	item1.geometry.offset = new mxPoint(-10, -10);
			   	item1.vertex = true;
			   	bg.insert(item1);
			   	
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Button with grow spinner');
			}),
			
			this.addEntry(dt + 'button with grow spinner', function()
	   		{
			   	var bg = new mxCell('Loading...', new mxGeometry(0, 0, 110, 40), s + 'rrect;rSize=5;strokeColor=none;html=1;whiteSpace=wrap;fillColor=#59AFFD;fontColor=#ffffff;align=right;spacing=10;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('', new mxGeometry(0, 0.5, 20, 20), 'html=1;shadow=0;dashed=0;shape=ellipse;strokeColor=none;fillColor=#ffffff;');
			   	item1.geometry.relative = true;
			   	item1.geometry.offset = new mxPoint(15, -10);
			   	item1.vertex = true;
			   	bg.insert(item1);
			   	
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Button with grow spinner');
			}),
			
			this.addEntry(dt + 'toast', function()
	   		{
			   	var bg = new mxCell('Hello, world! This is a toast message.', new mxGeometry(0, 0, 320, 80), s + 'rrect;rSize=5;strokeColor=#DFE0E0;html=1;whiteSpace=wrap;fillColor=#FEFEFE;fontColor=#212529;align=left;spacing=15;verticalAlign=bottom;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('', new mxGeometry(0, 0, 320, 40), s + 'topButton;rSize=5;strokeColor=inherit;fillColor=#ffffff;resizeWidth=1;');
			   	item1.geometry.relative = true;
			   	item1.vertex = true;
			   	bg.insert(item1);
			   	var item2 = new mxCell('Bootstrap', new mxGeometry(0, 0.5, 20, 20), s + 'rrect;rSize=5;strokeColor=#DFE0E0;html=1;whiteSpace=wrap;fillColor=#0084FC;fontColor=#6C767D;align=left;spacing=10;verticalAlign=middle;labelPosition=right;verticalLabelPosition=middle;fontStyle=1');
			   	item2.geometry.relative = true;
			   	item2.geometry.offset = new mxPoint(10, -10);
			   	item2.vertex = true;
			   	item1.insert(item2);
			   	var item3 = new mxCell('11 mins ago', new mxGeometry(1, 0.5, 10, 10), s + 'x;strokeColor=#808080;html=1;fontColor=#6C767D;align=right;spacing=10;verticalAlign=middle;labelPosition=left;verticalLabelPosition=middle;fontStyle=0;strokeWidth=2;fontSize=11;fillColor=none;');
			   	item3.geometry.relative = true;
			   	item3.geometry.offset = new mxPoint(-25, -4);
			   	item3.vertex = true;
			   	item1.insert(item3);
			   	
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Toast');
			}),
			
			this.addEntry(dt + 'tooltip on top', function()
	   		{
			   	var bg = new mxCell('Tooltip on top', new mxGeometry(10, 0, 90, 30), 
			   			s + 'popover;fillColor=#1A1A1A;strokeColor=none;dx=45;dy=5;rSize=5;whiteSpace=wrap;verticalAlign=top;spacing=10;fontSize=12;spacingLeft=0;align=center;spacingTop=-10;fontColor=#FFFFFF;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('Tooltip on top', new mxGeometry(0, 30, 110, 30), s + 'rrect;rSize=5;fillColor=#6C767D;strokeColor=none;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=center;spacing=5;fontColor=#FFFFFF;fontSize=14;');
			   	item1.vertex = true;
				
		   		return sb.createVertexTemplateFromCells([bg, item1], 110, 60, 'Tooltip on top');
			}),
				    
			this.addEntry(dt + 'tooltip on right', function()
	   		{
			   	var bg = new mxCell('Tooltip on right', new mxGeometry(120, 3, 110, 24), 
			   			s + 'popover;fillColor=#1A1A1A;strokeColor=none;dx=12;dy=5;rSize=5;whiteSpace=wrap;verticalAlign=top;spacing=10;fontSize=12;spacingLeft=0;align=center;spacingTop=-10;fontColor=#FFFFFF;direction=south;spacingLeft=5;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('Tooltip on right', new mxGeometry(0, 0, 120, 30), s + 'rrect;rSize=5;fillColor=#6C767D;strokeColor=none;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=center;spacing=5;fontColor=#FFFFFF;fontSize=14;');
			   	item1.vertex = true;
				
		   		return sb.createVertexTemplateFromCells([bg, item1], 230, 30, 'Tooltip on right');
			}),
				    
			this.addEntry(dt + 'tooltip on bottom', function()
	   		{
			   	var bg = new mxCell('Tooltip on bottom', new mxGeometry(10, 30, 110, 30), 
			   			s + 'popover;fillColor=#1A1A1A;strokeColor=none;dx=55;dy=5;rSize=5;whiteSpace=wrap;verticalAlign=top;spacing=10;fontSize=12;spacingLeft=0;align=center;spacingTop=-5;fontColor=#FFFFFF;direction=west;spacingBottom=0;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('Tooltip on bottom', new mxGeometry(0, 0, 130, 30), s + 'rrect;rSize=5;fillColor=#6C767D;strokeColor=none;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=center;spacing=5;fontColor=#FFFFFF;fontSize=14;');
			   	item1.vertex = true;
				
		   		return sb.createVertexTemplateFromCells([bg, item1], 130, 60, 'Tooltip on bottom');
			}),
				    
			this.addEntry(dt + 'tooltip on left', function()
	   		{
			   	var bg = new mxCell('Tooltip on left', new mxGeometry(0, 3, 100, 24), 
			   			s + 'popover;fillColor=#1A1A1A;strokeColor=none;dx=12;dy=5;rSize=5;whiteSpace=wrap;verticalAlign=top;spacing=10;fontSize=12;spacingLeft=0;align=center;spacingTop=-10;fontColor=#FFFFFF;direction=north;spacingRight=5;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('Tooltip on left', new mxGeometry(100, 0, 110, 30), s + 'rrect;rSize=5;fillColor=#6C767D;strokeColor=none;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=center;spacing=5;fontColor=#FFFFFF;fontSize=14;');
			   	item1.vertex = true;
				
		   		return sb.createVertexTemplateFromCells([bg, item1], 210, 30, 'Tooltip on left');
			}),
				    
			this.addEntry(dt + 'tooltip with HTML', function()
	   		{
			   	var bg = new mxCell('<i>Tooltip </i><u>with</u> <b>HTML</b>', new mxGeometry(10, 0, 120, 30), 
			   			s + 'popover;fillColor=#1A1A1A;strokeColor=none;dx=60;dy=5;rSize=5;whiteSpace=wrap;verticalAlign=top;spacing=10;fontSize=12;spacingLeft=0;align=center;spacingTop=-10;fontColor=#FFFFFF;');
			   	bg.vertex = true;
			   	var item1 = new mxCell('Tooltip with HTML', new mxGeometry(0, 30, 140, 30), s + 'rrect;rSize=5;fillColor=#6C767D;strokeColor=none;perimeter=none;whiteSpace=wrap;resizeWidth=1;align=center;spacing=5;fontColor=#FFFFFF;fontSize=14;');
			   	item1.vertex = true;
				
		   		return sb.createVertexTemplateFromCells([bg, item1], 140, 60, 'Tooltip with HTML');
			})
   		];
			   	
   		this.addPalette('bootstrap', mxResources.get('bootstrap'), false, mxUtils.bind(this, function(content)
	    {
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
   		
		this.setCurrentSearchEntryLibrary();
	};
})();
