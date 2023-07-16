(function()
{
	Sidebar.prototype.addInfographicPalette = function()
	{
		var w = 100;
		var h = 100;
		var s = 'whiteSpace=wrap;html=1;shape=mxgraph.infographic.';
		var s2 = mxConstants.STYLE_VERTICAL_LABEL_POSITION + '=bottom;' + mxConstants.STYLE_VERTICAL_ALIGN + '=top;html=1;shape=mxgraph.infographic.';
		var s3 = mxConstants.STYLE_VERTICAL_LABEL_POSITION + '=bottom;' + mxConstants.STYLE_VERTICAL_ALIGN + '=top;html=1;shape=';
		var s4 = mxConstants.STYLE_VERTICAL_LABEL_POSITION + '=bottom;' + mxConstants.STYLE_VERTICAL_ALIGN + '=top;html=1;shape=mxgraph.basic.';
		var gn = 'mxgraph.infographic';
		var dt = '';
		this.setCurrentSearchEntryLibrary('infographic');
		
		this.addPaletteFunctions('infographic', 'Infographic', false,
		[
			this.createVertexTemplateEntry(s4 + 'pie;fillColor=#10739E;strokeColor=none;startAngle=0.2;endAngle=0.9;', w, h, '', 'Pie', null, null, this.getTagsForStencil(gn, 'pie', dt).join(' ')),
			this.createVertexTemplateEntry(s4 + 'arc;strokeColor=#10739E;strokeWidth=6;startAngle=0.3;endAngle=0.1;', w, h, '', 'Arc', null, null, this.getTagsForStencil(gn, 'arc', dt).join(' ')),
			this.createVertexTemplateEntry(s4 + 'partConcEllipse;fillColor=#10739E;strokeColor=none;startAngle=0.25;endAngle=0.1;arcWidth=0.5;', w, h, '', 'Partial Concentric Ellipse', null, null, this.getTagsForStencil(gn, 'partConcEllipse', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'parallelogram;dx=15;fillColor=#10739E;strokeColor=none;', w, h * 0.7, '', 'Trapezoid', null, null, this.getTagsForStencil(gn, 'partConcEllipse', dt).join(' ')),
			this.createVertexTemplateEntry(
					'html=1;shape=mxgraph.infographic.ribbonSimple;notch1=20;notch2=20;fillColor=#10739E;strokeColor=none;align=center;verticalAlign=middle;fontColor=#ffffff;fontSize=14;fontStyle=1;', 
					w * 2, h * 0.4, 'Label', 'Ribbon', null, null, this.getTagsForStencil(gn, 'ribbonRolled', dt).join(' ')),
			this.createVertexTemplateEntry(
					'html=1;shape=mxgraph.infographic.ribbonRolled;dx=185;dy=15;fillColor=#10739E;strokeColor=none;align=center;verticalAlign=middle;fontColor=#ffffff;fontSize=14;fontStyle=1;', 
					w * 2, h * 0.7, 'Label', 'Ribbon (rolled)', null, null, this.getTagsForStencil(gn, 'ribbonRolled', dt).join(' ')),
			this.createVertexTemplateEntry(
					'html=1;shape=mxgraph.infographic.ribbonDoubleFolded;dx=25;dy=15;fillColor=#10739E;strokeColor=none;align=center;verticalAlign=middle;fontColor=#ffffff;fontSize=14;fontStyle=1;', 
					w * 2, h * 0.7, 'Label', 'Ribbon (double folded)', null, null, this.getTagsForStencil(gn, 'ribbonDoubleFolded', dt).join(' ')),
			this.createVertexTemplateEntry(
					'html=1;shape=mxgraph.infographic.ribbonFrontFolded;dx=25;dy=15;notch=15;fillColor=#10739E;strokeColor=none;align=center;verticalAlign=middle;fontColor=#ffffff;fontSize=14;fontStyle=1;spacingTop=10;', 
					w * 2, h * 0.55, 'Label', 'Ribbon (front folded)', null, null, this.getTagsForStencil(gn, 'ribbonFrontFolded', dt).join(' ')),
			this.createVertexTemplateEntry(
					'html=1;shape=mxgraph.infographic.ribbonBackFolded;dx=25;dy=15;notch=15;fillColor=#10739E;strokeColor=none;align=center;verticalAlign=middle;fontColor=#ffffff;fontSize=14;fontStyle=1;spacingTop=10;', 
					w * 2, h * 0.55, 'Label', 'Ribbon (back folded)', null, null, this.getTagsForStencil(gn, 'ribbonBackFolded', dt).join(' ')),
			this.createVertexTemplateEntry(
					'html=1;shape=mxgraph.infographic.banner;dx=32;dy=17;notch=15;fillColor=#10739E;strokeColor=none;align=center;verticalAlign=middle;fontColor=#ffffff;fontSize=14;fontStyle=1;spacingBottom=15;', 
					w * 2.6, h * 0.7, 'Label', 'Banner', null, null, this.getTagsForStencil(gn, 'banner', dt).join(' ')),
			this.createVertexTemplateEntry(
					'html=1;shape=mxgraph.infographic.bannerSingleFold;dx=32;dx2=20;dy=17;notch=15;fillColor=#10739E;strokeColor=none;align=left;verticalAlign=middle;fontColor=#ffffff;fontSize=14;fontStyle=1;spacingBottom=15;spacingLeft=25;', 
					w * 2.6, h * 0.7, 'Label', 'Banner (single fold)', null, null, this.getTagsForStencil(gn, 'bannerSingleFold', dt).join(' ')),
			this.createVertexTemplateEntry(
					'html=1;shape=mxgraph.infographic.bannerHalfFold;dx=40;dx2=20;notch=15;fillColor=#10739E;strokeColor=none;align=left;verticalAlign=top;fontColor=#ffffff;fontSize=14;fontStyle=1;spacingLeft=25;spacingTop=5;', 
					w * 2, h * 2, 'Label', 'Banner (half fold)', null, null, this.getTagsForStencil(gn, 'bannerHalfFold', dt).join(' ')),
			this.createVertexTemplateEntry(
					'html=1;shape=mxgraph.infographic.barCallout;dx=100;dy=30;fillColor=#10739E;strokeColor=none;align=center;verticalAlign=top;fontColor=#ffffff;fontSize=14;fontStyle=1;shadow=0;spacingTop=5;', 
					w * 2, h * 0.7, 'Label', 'Bar with callout', null, null, this.getTagsForStencil(gn, 'ribbonRolled', dt).join(' ')),
			this.createVertexTemplateEntry(
					'html=1;shape=mxgraph.infographic.flag;dx=30;dy=20;fillColor=#10739E;strokeColor=none;align=center;verticalAlign=top;fontColor=#ffffff;fontSize=14;fontStyle=1;shadow=0;spacingTop=5;', 
					w * 2, h * 0.7, 'Label', 'Flag', null, null, this.getTagsForStencil(gn, 'flag', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'shadedTriangle;fillColor=#10739E;strokeColor=none;', w * 0.8, h, '', 'Triangle', null, null, this.getTagsForStencil(gn, 'shadedTriangle', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'shadedPyramid;fillColor=#10739E;strokeColor=none;', w * 0.6, h, '', 'Pyramid', null, null, this.getTagsForStencil(gn, 'shadedTriangle', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'pyramidStep;fillColor=#10739E;strokeColor=none;', w * 0.6, h, '', 'Pyramid step', null, null, this.getTagsForStencil(gn, 'pyramidStep', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'cylinder;fillColor=#10739E;strokeColor=none;', w * 0.6, h, '', 'Cylinder', null, null, this.getTagsForStencil(gn, 'cylinder', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'shadedCube;isoAngle=15;fillColor=#10739E;strokeColor=none;', w, h, '', 'Cube', null, null, this.getTagsForStencil(gn, 'shaded cube', dt).join(' ')),
			this.createVertexTemplateEntry(
					'verticalLabelPosition=middle;verticalAlign=middle;html=1;shape=mxgraph.infographic.partConcEllipse;fillColor=#10739E;strokeColor=none;startAngle=0;endAngle=0.75;arcWidth=0.4;fontSize=20;fontColor=#10739E;align=center;fontStyle=1;', 
					w, h, '75%', 'Partial Concentric Ellipse', null, null, this.getTagsForStencil(gn, 'partConcEllipse', dt).join(' ')),
			this.createVertexTemplateEntry(
					'verticalLabelPosition=middle;verticalAlign=bottom;html=1;shape=mxgraph.infographic.circularDial;dy=15;fillColor=#10739E;strokeColor=none;labelPosition=center;align=center;fontStyle=1;fontSize=15;spacingBottom=5;whiteSpace=wrap;', 
					w * 0.8, h * 1.1, 'Label', 'Circular Dial', null, null, this.getTagsForStencil(gn, 'circularDial', dt).join(' ')),

			this.addEntry(dt + 'chevron list', function()
			{
			   	var button1 = new mxCell('LABEL', new mxGeometry(0, 0, 200, 30), 'shape=step;perimeter=stepPerimeter;whiteSpace=wrap;html=1;fixedSize=1;size=10;fillColor=#10739E;strokeColor=none;fontSize=17;fontStyle=1;align=center;');
			   	button1.vertex = true;
			   	var button2 = new mxCell('&nbsp;- Lorem ipsum dolor sit amet<br>' +
			   			'&nbsp;- consectetur adipisicing elit<br>' +
			   			'&nbsp;- sed do eiusmod tempor<br>' +
			   			'&nbsp;- incididunt ut labore et dolore<br>' +
			   			'&nbsp;- magna aliqua.', 
			   			new mxGeometry(0, 40, 190, 120), 'shape=rect;fillColor=#B1DDF0;strokeColor=none;fontSize=12;html=1;whiteSpace=wrap;align=left;verticalAlign=top;spacing=5;');
			   	button2.vertex = true;

			   	return sb.createVertexTemplateFromCells([button1, button2], 200, 160, 'Chevron list');
			}),				
				
			this.addEntry(dt + 'roadmap vertical', function()
		    {
		    	var chevron1 = new mxCell('', new mxGeometry(0, 0, 70, 80), 'shape=step;perimeter=stepPerimeter;whiteSpace=wrap;html=1;fixedSize=1;size=10;direction=south;fillColor=#10739E;strokeColor=none;rounded=0;');
		    	chevron1.vertex = true;

			   	var label1 = new mxCell('<font style="font-size: 10px"><font style="font-size: 12px" color="#10739E"><b>Label</b></font><br><br><font size="1">' + 
			   			'Lorem ipsum dolor sit amet, consectetur adipisicing elit</font></font>', 
			   			new mxGeometry(100, 0, 200, 70), 'rounded=1;strokeColor=none;fillColor=#DDDDDD;align=center;arcSize=12;verticalAlign=top;whiteSpace=wrap;html=1;fontSize=12;');
			   	label1.vertex = true;
			   	
			   	return sb.createVertexTemplateFromCells([chevron1, label1], 300, 70, 'Roadmap (vertical)');
			}),				
				
			this.addEntry(dt + 'numbered entry', function()
			{
			   	var rect1 = new mxCell('Label', new mxGeometry(30, 10, 170, 40), 'shape=rect;rounded=1;whiteSpace=wrap;html=1;shadow=0;strokeColor=none;fillColor=#B1DDF0;arcSize=30;fontSize=14;spacingLeft=42;fontStyle=1;fontColor=#FFFFFF;align=left;');
			   	rect1.vertex = true;
			   	var ellipse1 = new mxCell('1', new mxGeometry(0, 0, 60, 60), 'shape=ellipse;perimeter=ellipsePerimeter;fontSize=22;fontStyle=1;shadow=0;strokeColor=#ffffff;fillColor=#10739E;strokeWidth=4;fontColor=#ffffff;align=center;whiteSpace=wrap;html=1;');
			   	ellipse1.vertex = true;

			   	return sb.createVertexTemplateFromCells([rect1, ellipse1], 200, 60, 'Numbered Entry');
			}),				
				
			this.createVertexTemplateEntry(mxConstants.STYLE_VERTICAL_LABEL_POSITION + '=middle;' + mxConstants.STYLE_VERTICAL_ALIGN + '=top;html=1;shape=mxgraph.infographic.numberedEntryVert;dy=25;fillColor=#10739E;strokeColor=none;fontSize=17;fontColor=#FFFFFF;align=center;labelPosition=center;spacingTop=32;fontStyle=1;whiteSpace=wrap;', w * 0.8, h * 1.6, 'Label', 'Numbered Entry (vertical)', null, null, this.getTagsForStencil(gn, 'numberedEntryVert', dt).join(' ')),
			this.createVertexTemplateEntry('verticalLabelPosition=middle;verticalAlign=middle;html=1;shape=mxgraph.infographic.bendingArch;startAngle=0.75;endAngle=0.25;arcWidth=0.25;fillColor=#10739E;strokeColor=none;fontSize=19;fontColor=#FFFFFF;labelPosition=center;align=center;fontStyle=1;whiteSpace=wrap;', w, h, '50%', 'Bending Arch', null, null, this.getTagsForStencil(gn, 'bendingArch', dt).join(' ')),
			this.createVertexTemplateEntry(
					'verticalLabelPosition=middle;verticalAlign=middle;html=1;shape=mxgraph.infographic.circularCallout;dy=15;fillColor=#10739E;strokeColor=none;labelPosition=center;align=center;fontColor=#10739E;fontStyle=1;fontSize=24;whiteSpace=wrap;', 
					w, h, '50%', 'Circular Callout', null, null, this.getTagsForStencil(gn, 'circularCallout', dt).join(' ')),
			this.createVertexTemplateEntry(
					'verticalLabelPosition=middle;verticalAlign=middle;html=1;shape=mxgraph.infographic.circularCallout2;dy=15;strokeColor=#10739E;labelPosition=center;align=center;fontColor=#10739E;fontStyle=1;fontSize=24;', 
					w * 0.6, h * 1.4, '', 'Circular Callout', null, null, this.getTagsForStencil(gn, 'circularCallout2', dt).join(' ')),

			this.addEntry(dt + 'circular dial', function()
			{
			   	var part1 = new mxCell('', new mxGeometry(0, 0, 100, 100), 'verticalLabelPosition=bottom;verticalAlign=top;html=1;shape=mxgraph.basic.donut;dx=10;strokeColor=none;fillColor=#10739E;fontSize=10;align=center;fillOpacity=20;');
			   	part1.vertex = true;
			   	var part2 = new mxCell('65%', new mxGeometry(0, 0, 100, 100), 'verticalLabelPosition=middle;verticalAlign=middle;html=1;shape=mxgraph.basic.partConcEllipse;startAngle=0;endAngle=0.65;arcWidth=0.2;strokeColor=none;fillColor=#10739E;fontSize=22;fontColor=#10739E;align=center;fontStyle=1;whiteSpace=wrap;');
			   	part2.vertex = true;
			   	part1.insert(part2);
			   	return sb.createVertexTemplateFromCells([part1], part1.geometry.width, part1.geometry.height, 'Circular Dial');
			}),				
			
			this.addEntry(dt + 'angled entry', function()
			{
			   	var part1 = new mxCell('1', new mxGeometry(0, 0, 50, 30), 'shape=mxgraph.infographic.parallelogram;dx=5;html=1;fillColor=#10739E;strokeColor=none;shadow=0;fontSize=17;fontColor=#FFFFFF;align=center;fontStyle=1;whiteSpace=wrap;');
			   	part1.vertex = true;
			   	var part2 = new mxCell('Label', new mxGeometry(45, 0, 95, 30), 'shape=mxgraph.infographic.parallelogram;dx=5;;html=1;fillColor=#B1DDF0;strokeColor=none;shadow=0;fontSize=17;fontColor=#FFFFFF;align=left;spacingLeft=10;fontStyle=1;whiteSpace=wrap;');
			   	part2.vertex = true;
			   	return sb.createVertexTemplateFromCells([part1, part2], 140, 30, 'Angled Entry');
			}),				

			this.addEntry(dt + 'chevron list', function()
			{
				
				var str1 = '&nbsp;- Lorem ipsum dolor sit amet<br>' +
	   			'&nbsp;- consectetur adipisicing elit<br>' +
	   			'&nbsp;- sed do eiusmod tempor<br>' +
	   			'&nbsp;- incididunt ut labore et dolore<br>' +
	   			'&nbsp;- magna aliqua.';
				
			   	var chrevron1 = new mxCell('LABEL', new mxGeometry(0, 0, 200, 30), 'shape=step;perimeter=stepPerimeter;whiteSpace=wrap;html=1;fixedSize=1;size=10;fillColor=#10739E;strokeColor=none;fontSize=17;fontColor=#FFFFFF;fontStyle=1;align=center;rounded=0;');
			   	chrevron1.vertex = true;
			   	var process1 = new mxCell(str1, new mxGeometry(0, 40, 190, 120), 
			   			'shape=rect;fillColor=#B1DDF0;strokeColor=none;fontSize=12;html=1;whiteSpace=wrap;align=left;verticalAlign=top;spacing=5;rounded=0;');
			   	process1.vertex = true;
			   	var process2 = new mxCell(str1, 
			   			new mxGeometry(0, 170, 190, 120), 'shape=rect;fillColor=#B1DDF0;strokeColor=none;fontSize=12;html=1;whiteSpace=wrap;align=left;verticalAlign=top;spacing=5;rounded=0;');
			   	process2.vertex = true;
			   	var process3 = new mxCell(str1, 
			   			new mxGeometry(0, 300, 190, 120), 'shape=rect;fillColor=#B1DDF0;strokeColor=none;fontSize=12;html=1;whiteSpace=wrap;align=left;verticalAlign=top;spacing=5;rounded=0;');
			   	process3.vertex = true;
			   	var chrevron2 = new mxCell('LABEL', new mxGeometry(200, 0, 200, 30), 'shape=step;perimeter=stepPerimeter;whiteSpace=wrap;html=1;fixedSize=1;size=10;fillColor=#F2931E;strokeColor=none;fontSize=17;fontColor=#FFFFFF;fontStyle=1;align=center;rounded=0;');
			   	chrevron2.vertex = true;
			   	var process4 = new mxCell(str1, 
			   			new mxGeometry(200, 40, 190, 120), 'shape=rect;fillColor=#FCE7CD;strokeColor=none;fontSize=12;html=1;whiteSpace=wrap;align=left;verticalAlign=top;spacing=5;rounded=0;');
			   	process4.vertex = true;
			   	var process5 = new mxCell(str1, 
			   			new mxGeometry(200, 170, 190, 120), 'shape=rect;fillColor=#FCE7CD;strokeColor=none;fontSize=12;html=1;whiteSpace=wrap;align=left;verticalAlign=top;spacing=5;rounded=0;');
			   	process5.vertex = true;
			   	var process6 = new mxCell(str1, 
			   			new mxGeometry(200, 300, 190, 120), 'shape=rect;fillColor=#FCE7CD;strokeColor=none;fontSize=12;html=1;whiteSpace=wrap;align=left;verticalAlign=top;spacing=5;rounded=0;');
			   	process6.vertex = true;
			   	var chrevron3 = new mxCell('LABEL', new mxGeometry(400, 0, 200, 30), 'shape=step;perimeter=stepPerimeter;whiteSpace=wrap;html=1;fixedSize=1;size=10;fillColor=#AE4132;strokeColor=none;fontSize=17;fontColor=#FFFFFF;fontStyle=1;align=center;rounded=0;');
			   	chrevron3.vertex = true;
			   	var process7 = new mxCell(str1, 
			   			new mxGeometry(400, 40, 190, 120), 'shape=rect;fillColor=#FAD9D5;strokeColor=none;fontSize=12;html=1;whiteSpace=wrap;align=left;verticalAlign=top;spacing=5;rounded=0;');
			   	process7.vertex = true;
			   	var process8 = new mxCell(str1, 
			   			new mxGeometry(400, 170, 190, 120), 'shape=rect;fillColor=#FAD9D5;strokeColor=none;fontSize=12;html=1;whiteSpace=wrap;align=left;verticalAlign=top;spacing=5;rounded=0;');
			   	process8.vertex = true;
			   	var process9 = new mxCell(str1, 
			   			new mxGeometry(400, 300, 190, 120), 'shape=rect;fillColor=#FAD9D5;strokeColor=none;fontSize=12;html=1;whiteSpace=wrap;align=left;verticalAlign=top;spacing=5;rounded=0;');
			   	process9.vertex = true;
			   	var chrevron4 = new mxCell('LABEL', new mxGeometry(600, 0, 200, 30), 'shape=step;perimeter=stepPerimeter;whiteSpace=wrap;html=1;fixedSize=1;size=10;fillColor=#23445D;strokeColor=none;fontSize=17;fontColor=#FFFFFF;fontStyle=1;align=center;rounded=0;');
			   	chrevron4.vertex = true;
			   	var process10 = new mxCell(str1, 
			   			new mxGeometry(600, 40, 190, 120), 'shape=rect;fillColor=#BAC8D3;strokeColor=none;fontSize=12;html=1;whiteSpace=wrap;align=left;verticalAlign=top;spacing=5;rounded=0;');
			   	process10.vertex = true;
			   	var process11 = new mxCell(str1, 
			   			new mxGeometry(600, 170, 190, 120), 'shape=rect;fillColor=#BAC8D3;strokeColor=none;fontSize=12;html=1;whiteSpace=wrap;align=left;verticalAlign=top;spacing=5;rounded=0;');
			   	process11.vertex = true;
			   	var process12 = new mxCell(str1, 
			   			new mxGeometry(600, 300, 190, 120), 'shape=rect;fillColor=#BAC8D3;strokeColor=none;fontSize=12;html=1;whiteSpace=wrap;align=left;verticalAlign=top;spacing=5;rounded=0;');
			   	process12.vertex = true;
			   	var chrevron5 = new mxCell('LABEL', new mxGeometry(800, 0, 200, 30), 'shape=step;perimeter=stepPerimeter;whiteSpace=wrap;html=1;fixedSize=1;size=10;fillColor=#12AAB5;strokeColor=none;fontSize=17;fontColor=#FFFFFF;fontStyle=1;align=center;rounded=0;');
			   	chrevron5.vertex = true;
			   	var process13 = new mxCell(str1, 
			   			new mxGeometry(800, 40, 190, 120), 'shape=rect;fillColor=#B0E3E6;strokeColor=none;fontSize=12;html=1;whiteSpace=wrap;align=left;verticalAlign=top;spacing=5;rounded=0;');
			   	process13.vertex = true;
			   	var process14 = new mxCell(str1, 
			   			new mxGeometry(800, 170, 190, 120), 'shape=rect;fillColor=#B0E3E6;strokeColor=none;fontSize=12;html=1;whiteSpace=wrap;align=left;verticalAlign=top;spacing=5;rounded=0;');
			   	process14.vertex = true;
			   	var process15 = new mxCell(str1, 
			   			new mxGeometry(800, 300, 190, 120), 'shape=rect;fillColor=#B0E3E6;strokeColor=none;fontSize=12;html=1;whiteSpace=wrap;align=left;verticalAlign=top;spacing=5;rounded=0;');
			   	process15.vertex = true;

			   	return sb.createVertexTemplateFromCells([chrevron1, chrevron2, chrevron3, chrevron4, chrevron5, process1, process2, process3, process4, process5, process6, process7, process8, process9, process10, process11, process12, process13, process14, process15], 1000, 420, 'Chevron list');
			}),				
				
			this.addEntry(dt + 'roadmap vertical', function()
		    {
		    	var chevron1 = new mxCell('', new mxGeometry(0, 0, 70, 80), 'shape=step;perimeter=stepPerimeter;whiteSpace=wrap;html=1;fixedSize=1;size=10;direction=south;fillColor=#10739E;strokeColor=none;rounded=0;');
		    	chevron1.vertex = true;

			   	var label1 = new mxCell('<font style="font-size: 10px"><font style="font-size: 12px" color="#10739E"><b>Label</b></font><br><br><font size="1">' + 
			   			'Lorem ipsum dolor sit amet, consectetur adipisicing elit</font></font>', 
			   			new mxGeometry(100, 0, 200, 70), 'rounded=1;strokeColor=none;fillColor=#EEEEEE;align=center;arcSize=12;verticalAlign=top;whiteSpace=wrap;html=1;fontSize=12;');
			   	label1.vertex = true;

		    	var chevron2 = new mxCell('', new mxGeometry(0, 80, 70, 80), 'shape=step;perimeter=stepPerimeter;whiteSpace=wrap;html=1;fixedSize=1;size=10;direction=south;fillColor=#F2931E;strokeColor=none;rounded=0;');
		    	chevron2.vertex = true;
		    	
			   	var label2 = new mxCell('<font style="font-size: 10px"><font style="font-size: 12px" color="#F2931E"><b>Label</b></font><br><br><font size="1">' + 
			   			'Lorem ipsum dolor sit amet, consectetur adipisicing elit</font></font>', 
			   			new mxGeometry(100, 80, 200, 70), 'rounded=1;strokeColor=none;fillColor=#EEEEEE;align=center;arcSize=12;verticalAlign=top;whiteSpace=wrap;html=1;fontSize=12;');
			   	label2.vertex = true;

		    	var chevron3 = new mxCell('', new mxGeometry(0, 160, 70, 80), 'shape=step;perimeter=stepPerimeter;whiteSpace=wrap;html=1;fixedSize=1;size=10;direction=south;fillColor=#AE4132;strokeColor=none;rounded=0;');
		    	chevron3.vertex = true;
		    	
			   	var label3 = new mxCell('<font style="font-size: 10px"><font style="font-size: 12px" color="#AE4132"><b>Label</b></font><br><br><font size="1">' + 
			   			'Lorem ipsum dolor sit amet, consectetur adipisicing elit</font></font>', 
			   			new mxGeometry(100, 160, 200, 70), 'rounded=1;strokeColor=none;fillColor=#EEEEEE;align=center;arcSize=12;verticalAlign=top;whiteSpace=wrap;html=1;fontSize=12;');
			   	label3.vertex = true;

		    	var chevron4 = new mxCell('', new mxGeometry(0, 240, 70, 80), 'shape=step;perimeter=stepPerimeter;whiteSpace=wrap;html=1;fixedSize=1;size=10;direction=south;fillColor=#23445D;strokeColor=none;rounded=0;');
		    	chevron4.vertex = true;
		    	
			   	var label4 = new mxCell('<font style="font-size: 10px"><font style="font-size: 12px" color="#23445D"><b>Label</b></font><br><br><font size="1">' + 
			   			'Lorem ipsum dolor sit amet, consectetur adipisicing elit</font></font>', 
			   			new mxGeometry(100, 240, 200, 70), 'rounded=1;strokeColor=none;fillColor=#EEEEEE;align=center;arcSize=12;verticalAlign=top;whiteSpace=wrap;html=1;fontSize=12;');
			   	label4.vertex = true;

		    	var chevron5 = new mxCell('', new mxGeometry(0, 320, 70, 80), 'shape=step;perimeter=stepPerimeter;whiteSpace=wrap;html=1;fixedSize=1;size=10;direction=south;fillColor=#12AAB5;strokeColor=none;rounded=0;');
		    	chevron5.vertex = true;
		    	
			   	var label5 = new mxCell('<font style="font-size: 10px"><font style="font-size: 12px" color="#12AAB5"><b>Label</b></font><br><br><font size="1">' + 
			   			'Lorem ipsum dolor sit amet, consectetur adipisicing elit</font></font>', 
			   			new mxGeometry(100, 320, 200, 70), 'rounded=1;strokeColor=none;fillColor=#EEEEEE;align=center;arcSize=12;verticalAlign=top;whiteSpace=wrap;html=1;fontSize=12;');
			   	label5.vertex = true;

			   	return sb.createVertexTemplateFromCells([chevron1, chevron2, chevron3, chevron4, chevron5, label1, label2, label3, label4, label5], 300, 400, 'Roadmap (vertical)');
			}),				
				
			this.addEntry(dt + 'numbered list', function()
			{
			   	var rect1 = new mxCell('Label', new mxGeometry(30, 10, 220, 40), 'shape=rect;rounded=1;whiteSpace=wrap;html=1;shadow=0;strokeColor=none;fillColor=#64BBE2;arcSize=30;fontSize=14;spacingLeft=42;fontStyle=1;fontColor=#FFFFFF;align=left;');
			   	rect1.vertex = true;
			   	var ellipse1 = new mxCell('1', new mxGeometry(0, 0, 60, 60), 'shape=ellipse;perimeter=ellipsePerimeter;fontSize=22;fontStyle=1;shadow=0;strokeColor=#ffffff;fillColor=#10739E;strokeWidth=4;fontColor=#ffffff;align=center;whiteSpace=wrap;html=1;');
			   	ellipse1.vertex = true;

			   	var rect2 = new mxCell('Label', new mxGeometry(30, 75, 220, 40), 'shape=rect;rounded=1;whiteSpace=wrap;html=1;shadow=0;strokeColor=none;fillColor=#F8C382;arcSize=30;fontSize=14;spacingLeft=42;fontStyle=1;fontColor=#FFFFFF;align=left;');
			   	rect2.vertex = true;
			   	var ellipse2 = new mxCell('2', new mxGeometry(0, 65, 60, 60), 'shape=ellipse;perimeter=ellipsePerimeter;fontSize=22;fontStyle=1;shadow=0;strokeColor=#ffffff;fillColor=#F2931E;strokeWidth=4;fontColor=#ffffff;align=center;whiteSpace=wrap;html=1;');
			   	ellipse2.vertex = true;

			   	var rect3 = new mxCell('Label', new mxGeometry(30, 140, 220, 40), 'shape=rect;rounded=1;whiteSpace=wrap;html=1;shadow=0;strokeColor=none;fillColor=#F08E81;arcSize=30;fontSize=14;spacingLeft=42;fontStyle=1;fontColor=#FFFFFF;align=left;');
			   	rect3.vertex = true;
			   	var ellipse3 = new mxCell('3', new mxGeometry(0, 130, 60, 60), 'shape=ellipse;perimeter=ellipsePerimeter;fontSize=22;fontStyle=1;shadow=0;strokeColor=#ffffff;fillColor=#AE4132;strokeWidth=4;fontColor=#ffffff;align=center;whiteSpace=wrap;html=1;');
			   	ellipse3.vertex = true;

			   	var rect4 = new mxCell('Label', new mxGeometry(30, 205, 220, 40), 'shape=rect;rounded=1;whiteSpace=wrap;html=1;shadow=0;strokeColor=none;fillColor=#5D7F99;arcSize=30;fontSize=14;spacingLeft=42;fontStyle=1;fontColor=#FFFFFF;align=left;');
			   	rect4.vertex = true;
			   	var ellipse4 = new mxCell('4', new mxGeometry(0, 195, 60, 60), 'shape=ellipse;perimeter=ellipsePerimeter;fontSize=22;fontStyle=1;shadow=0;strokeColor=#ffffff;fillColor=#23445D;strokeWidth=4;fontColor=#ffffff;align=center;whiteSpace=wrap;html=1;');
			   	ellipse4.vertex = true;

			   	var rect5 = new mxCell('Label', new mxGeometry(30, 270, 220, 40), 'shape=rect;rounded=1;whiteSpace=wrap;html=1;shadow=0;strokeColor=none;fillColor=#61C6CE;arcSize=30;fontSize=14;spacingLeft=42;fontStyle=1;fontColor=#FFFFFF;align=left;');
			   	rect5.vertex = true;
			   	var ellipse5 = new mxCell('5', new mxGeometry(0, 260, 60, 60), 'shape=ellipse;perimeter=ellipsePerimeter;fontSize=22;fontStyle=1;shadow=0;strokeColor=#ffffff;fillColor=#12AAB5;strokeWidth=4;fontColor=#ffffff;align=center;whiteSpace=wrap;html=1;');
			   	ellipse5.vertex = true;

			   	return sb.createVertexTemplateFromCells([rect1, ellipse1, rect2, ellipse2, rect3, ellipse3, rect4, ellipse4, rect5, ellipse5], 200, 320, 'Numbered List');
			}),				
						
			this.addEntry(dt + 'list', function()
			{
				
				var st1 = mxConstants.STYLE_VERTICAL_LABEL_POSITION + '=middle;' + mxConstants.STYLE_VERTICAL_ALIGN + '=top;html=1;shape=mxgraph.infographic.numberedEntryVert;dy=25;strokeColor=none;fontSize=17;fontColor=#FFFFFF;align=center;labelPosition=center;spacingTop=32;fontStyle=1;whiteSpace=wrap;fillColor=#' 

				var item1 = new mxCell('Label', new mxGeometry(0, 0, 80, 160), st1 + '10739E;');
			   	item1.vertex = true;
				var item2 = new mxCell('Label', new mxGeometry(85, 0, 80, 160), st1 + 'F2931E;');
			   	item2.vertex = true;
				var item3 = new mxCell('Label', new mxGeometry(170, 0, 80, 160), st1 + 'AE4132;');
			   	item3.vertex = true;
				var item4 = new mxCell('Label', new mxGeometry(255, 0, 80, 160), st1 + '23445D;');
			   	item4.vertex = true;
				var item5 = new mxCell('Label', new mxGeometry(340, 0, 80, 160), st1 + '12AAB5;');
			   	item5.vertex = true;

			   	return sb.createVertexTemplateFromCells([item1, item2, item3, item4, item5], 420, 160, 'List');
			}),				
						
			this.addEntry(dt + 'rodmap horizontal', function()
			{
			   	var arch1 = new mxCell('', new mxGeometry(0, 90, 120, 120), s4 + 'partConcEllipse;startAngle=0.25;endAngle=0.75;arcWidth=0.25;fillColor=#10739E;strokeColor=none;');
			   	arch1.vertex = true;
			   	var arch2 = new mxCell('', new mxGeometry(105, 90, 120, 120), s4 + 'partConcEllipse;startAngle=0.75;endAngle=0.25;arcWidth=0.25;fillColor=#F2931E;strokeColor=none;');
			   	arch2.vertex = true;
			   	var arch3 = new mxCell('', new mxGeometry(210, 90, 120, 120), s4 + 'partConcEllipse;startAngle=0.25;endAngle=0.75;arcWidth=0.25;fillColor=#AE4132;strokeColor=none;');
			   	arch3.vertex = true;
			   	var arch4 = new mxCell('', new mxGeometry(315, 90, 120, 120), s4 + 'partConcEllipse;startAngle=0.75;endAngle=0.25;arcWidth=0.25;fillColor=#23445D;strokeColor=none;');
			   	arch4.vertex = true;
			   	var arch5 = new mxCell('', new mxGeometry(420, 90, 120, 120), s4 + 'partConcEllipse;startAngle=0.25;endAngle=0.75;arcWidth=0.25;fillColor=#15AA96;strokeColor=none;');
			   	arch5.vertex = true;

			   	var circle1 = new mxCell('1', new mxGeometry(35, 125, 50, 50), 'shape=ellipse;strokeWidth=6;strokeColor=#10739E;fontSize=15;html=1;whiteSpace=wrap;fontStyle=1;fontColor=#10739E;');
			   	circle1.vertex = true;
			   	var circle2 = new mxCell('2', new mxGeometry(140, 125, 50, 50), 'shape=ellipse;strokeWidth=6;strokeColor=#F2931E;fontSize=15;html=1;whiteSpace=wrap;fontStyle=1;fontColor=#F2931E;');
			   	circle2.vertex = true;
			   	var circle3 = new mxCell('3', new mxGeometry(245, 125, 50, 50), 'shape=ellipse;strokeWidth=6;strokeColor=#AE4132;fontSize=15;html=1;whiteSpace=wrap;fontStyle=1;fontColor=#AE4132;');
			   	circle3.vertex = true;
			   	var circle4 = new mxCell('4', new mxGeometry(350, 125, 50, 50), 'shape=ellipse;strokeWidth=6;strokeColor=#23445D;fontSize=15;html=1;whiteSpace=wrap;fontStyle=1;fontColor=#23445D;');
			   	circle4.vertex = true;
			   	var circle5 = new mxCell('5', new mxGeometry(455, 125, 50, 50), 'shape=ellipse;strokeWidth=6;strokeColor=#12AAB5;fontSize=15;html=1;whiteSpace=wrap;fontStyle=1;fontColor=#12AAB5;');
			   	circle5.vertex = true;

			   	var label1 = new mxCell('<font style="font-size: 10px"><font style="font-size: 12px" color="#10739E"><b>Label</b></font><br><br><font size="1">' + 
			   			'Lorem ipsum dolor sit amet, consectetur adipisicing elit</font></font>', 
			   			new mxGeometry(0, 220, 120, 80), 'rounded=1;strokeColor=none;fillColor=#EEEEEE;align=center;arcSize=12;verticalAlign=top;whiteSpace=wrap;html=1;fontSize=12;');
			   	label1.vertex = true;
			   	var label2 = new mxCell('<font style="font-size: 10px"><font style="font-size: 12px" color="#F2931E"><b>Label</b></font><br><br><font size="1">' + 
			   			'Lorem ipsum dolor sit amet, consectetur adipisicing elit</font></font>', 
			   			new mxGeometry(105, 0, 120, 80), 'rounded=1;strokeColor=none;fillColor=#EEEEEE;align=center;arcSize=12;verticalAlign=top;whiteSpace=wrap;html=1;fontSize=12;');
			   	label2.vertex = true;
			   	var label3 = new mxCell('<font style="font-size: 10px"><font style="font-size: 12px" color="#AE4132"><b>Label</b></font><br><br><font size="1">' + 
			   			'Lorem ipsum dolor sit amet, consectetur adipisicing elit</font></font>', 
			   			new mxGeometry(210, 220, 120, 80), 'rounded=1;strokeColor=none;fillColor=#EEEEEE;align=center;arcSize=12;verticalAlign=top;whiteSpace=wrap;html=1;fontSize=12;');
			   	label3.vertex = true;
			   	var label4 = new mxCell('<font style="font-size: 10px"><font style="font-size: 12px" color="#23445D"><b>Label</b></font><br><br><font size="1">' + 
			   			'Lorem ipsum dolor sit amet, consectetur adipisicing elit</font></font>', 
			   			new mxGeometry(315, 0, 120, 80), 'rounded=1;strokeColor=none;fillColor=#EEEEEE;align=center;arcSize=12;verticalAlign=top;whiteSpace=wrap;html=1;fontSize=12;');
			   	label4.vertex = true;
			   	var label5 = new mxCell('<font style="font-size: 10px"><font style="font-size: 12px" color="#12AAB5"><b>Label</b></font><br><br><font size="1">' + 
			   			'Lorem ipsum dolor sit amet, consectetur adipisicing elit</font></font>', 
			   			new mxGeometry(420, 220, 120, 80), 'rounded=1;strokeColor=none;fillColor=#EEEEEE;align=center;arcSize=12;verticalAlign=top;whiteSpace=wrap;html=1;fontSize=12;');
			   	label5.vertex = true;

			   	return sb.createVertexTemplateFromCells([arch1, arch2, arch3, arch4, arch5, circle1, circle2, circle3, circle4, circle5, label1, label2, label3, label4, label5], 540, 300, 'Roadmap (horizontal)');
			}),				
				
			this.addEntry(dt + 'roadmap diagonal', function()
			{
			   	var arch1 = new mxCell('', new mxGeometry(190, 0, 120, 120), s4 + 'partConcEllipse;startAngle=0.75;endAngle=0.5;arcWidth=0.25;fillColor=#10739E;strokeColor=none;shadow=0;');
			   	arch1.vertex = true;
			   	var arch2 = new mxCell('', new mxGeometry(190, 105, 120, 120), s4 + 'partConcEllipse;startAngle=0.25;endAngle=0;arcWidth=0.25;fillColor=#F2931E;strokeColor=none;shadow=0;');
			   	arch2.vertex = true;
			   	var arch3 = new mxCell('', new mxGeometry(295, 105, 120, 120), s4 + 'partConcEllipse;startAngle=0.75;endAngle=0.5;arcWidth=0.25;fillColor=#AE4132;strokeColor=none;shadow=0;');
			   	arch3.vertex = true;
			   	var arch4 = new mxCell('', new mxGeometry(295, 210, 120, 120), s4 + 'partConcEllipse;startAngle=0.25;endAngle=0;arcWidth=0.25;fillColor=#23445D;strokeColor=none;shadow=0;');
			   	arch4.vertex = true;
			   	var arch5 = new mxCell('', new mxGeometry(400, 210, 120, 120), s4 + 'partConcEllipse;startAngle=0.75;endAngle=0.5;arcWidth=0.25;fillColor=#12AAB5;strokeColor=none;shadow=0;');
			   	arch5.vertex = true;

			   	var circle1 = new mxCell('1', new mxGeometry(225, 35, 50, 50), 'shape=ellipse;strokeWidth=6;strokeColor=#10739E;fontSize=15;html=1;whiteSpace=wrap;fontStyle=1;fontColor=#10739E;shadow=1;');
			   	circle1.vertex = true;
			   	var circle2 = new mxCell('2', new mxGeometry(225, 140, 50, 50), 'shape=ellipse;strokeWidth=6;strokeColor=#F2931E;fontSize=15;html=1;whiteSpace=wrap;fontStyle=1;fontColor=#F2931E;shadow=1;');
			   	circle2.vertex = true;
			   	var circle3 = new mxCell('3', new mxGeometry(330, 140, 50, 50), 'shape=ellipse;strokeWidth=6;strokeColor=#AE4132;fontSize=15;html=1;whiteSpace=wrap;fontStyle=1;fontColor=#AE4132;shadow=1;');
			   	circle3.vertex = true;
			   	var circle4 = new mxCell('4', new mxGeometry(330, 245, 50, 50), 'shape=ellipse;strokeWidth=6;strokeColor=#23445D;fontSize=15;html=1;whiteSpace=wrap;fontStyle=1;fontColor=#23445D;shadow=1;');
			   	circle4.vertex = true;
			   	var circle5 = new mxCell('5', new mxGeometry(435, 245, 50, 50), 'shape=ellipse;strokeWidth=6;strokeColor=#12AAB5;fontSize=15;html=1;whiteSpace=wrap;fontStyle=1;fontColor=#12AAB5;shadow=1;');
			   	circle5.vertex = true;

			   	var label1 = new mxCell('<font style="font-size: 10px"><font style="font-size: 12px" color="#10739E"><b>Label</b></font><br><br><font size="1">' + 
			   			'Lorem ipsum dolor sit amet, consectetur adipisicing elit</font></font>', 
			   			new mxGeometry(320, 20, 180, 70), 'rounded=1;strokeColor=none;fillColor=#EEEEEE;align=center;arcSize=12;verticalAlign=top;whiteSpace=wrap;html=1;fontSize=12;spacing=3;shadow=0;');
			   	label1.vertex = true;
			   	var label2 = new mxCell('<font style="font-size: 10px"><font style="font-size: 12px" color="#F2931E"><b>Label</b></font><br><br><font size="1">' + 
			   			'Lorem ipsum dolor sit amet, consectetur adipisicing elit</font></font>', 
			   			new mxGeometry(0, 130, 180, 70), 'rounded=1;strokeColor=none;fillColor=#EEEEEE;align=center;arcSize=12;verticalAlign=top;whiteSpace=wrap;html=1;fontSize=12;spacing=3;shadow=0;');
			   	label2.vertex = true;
			   	var label3 = new mxCell('<font style="font-size: 10px"><font style="font-size: 12px" color="#AE4132"><b>Label</b></font><br><br><font size="1">' + 
			   			'Lorem ipsum dolor sit amet, consectetur adipisicing elit</font></font>', 
			   			new mxGeometry(425, 130, 180, 70), 'rounded=1;strokeColor=none;fillColor=#EEEEEE;align=center;arcSize=12;verticalAlign=top;whiteSpace=wrap;html=1;fontSize=12;spacing=3;shadow=0;');
			   	label3.vertex = true;
			   	var label4 = new mxCell('<font style="font-size: 10px"><font style="font-size: 12px" color="#23445D"><b>Label</b></font><br><br><font size="1">' + 
			   			'Lorem ipsum dolor sit amet, consectetur adipisicing elit</font></font>', 
			   			new mxGeometry(105, 235, 180, 70), 'rounded=1;strokeColor=none;fillColor=#EEEEEE;align=center;arcSize=12;verticalAlign=top;whiteSpace=wrap;html=1;fontSize=12;spacing=3;shadow=0;');
			   	label4.vertex = true;
			   	var label5 = new mxCell('<font style="font-size: 10px"><font style="font-size: 12px" color="#12AAB5"><b>Label</b></font><br><br><font size="1">' + 
			   			'Lorem ipsum dolor sit amet, consectetur adipisicing elit</font></font>', 
			   			new mxGeometry(530, 235, 180, 70), 'rounded=1;strokeColor=none;fillColor=#EEEEEE;align=center;arcSize=12;verticalAlign=top;whiteSpace=wrap;html=1;fontSize=12;spacing=3;shadow=0;');
			   	label5.vertex = true;

			   	return sb.createVertexTemplateFromCells([arch1, arch2, arch3, arch4, arch5, circle1, circle2, circle3, circle4, circle5, label1, label2, label3, label4, label5], 710, 330, 'Roadmap (diagonal)');
			}),				
				
			this.addEntry(dt + 'arrow list', function()
			{
			   	var part1 = new mxCell('1', new mxGeometry(0, 0, 40, 40), 'html=1;whiteSpace=wrap;fillColor=#10739E;strokeColor=none;shadow=0;fontSize=17;fontColor=#FFFFFF;align=center;fontStyle=1;rounded=0;');
			   	part1.vertex = true;
			   	var part2 = new mxCell('Label', new mxGeometry(45, 0, 95, 40), 'shape=mxgraph.infographic.ribbonSimple;notch1=0;notch2=10;notch=0;html=1;whiteSpace=wrap;fillColor=#64BBE2;strokeColor=none;shadow=0;fontSize=17;fontColor=#FFFFFF;align=left;spacingLeft=10;fontStyle=1;');
			   	part2.vertex = true;
			   	var part3 = new mxCell('2', new mxGeometry(0, 45, 40, 40), 'html=1;whiteSpace=wrap;fillColor=#F2931E;strokeColor=none;shadow=0;fontSize=17;fontColor=#FFFFFF;align=center;fontStyle=1;rounded=0;');
			   	part3.vertex = true;
			   	var part4 = new mxCell('Label', new mxGeometry(45, 45, 115, 40), 'shape=mxgraph.infographic.ribbonSimple;notch1=0;notch2=10;notch=0;html=1;whiteSpace=wrap;fillColor=#F8C382;strokeColor=none;shadow=0;fontSize=17;fontColor=#FFFFFF;align=left;spacingLeft=10;fontStyle=1;');
			   	part4.vertex = true;
			   	var part5 = new mxCell('3', new mxGeometry(0, 90, 40, 40), 'html=1;whiteSpace=wrap;fillColor=#AE4132;strokeColor=none;shadow=0;fontSize=17;fontColor=#FFFFFF;align=center;fontStyle=1;rounded=0;');
			   	part5.vertex = true;
			   	var part6 = new mxCell('Label', new mxGeometry(45, 90, 135, 40), 'shape=mxgraph.infographic.ribbonSimple;notch1=0;notch2=10;notch=0;html=1;whiteSpace=wrap;fillColor=#F08E81;strokeColor=none;shadow=0;fontSize=17;fontColor=#FFFFFF;align=left;spacingLeft=10;fontStyle=1;');
			   	part6.vertex = true;
			   	var part7 = new mxCell('4', new mxGeometry(0, 135, 40, 40), 'html=1;whiteSpace=wrap;fillColor=#23445D;strokeColor=none;shadow=0;fontSize=17;fontColor=#FFFFFF;align=center;fontStyle=1;rounded=0;');
			   	part7.vertex = true;
			   	var part8 = new mxCell('Label', new mxGeometry(45,135, 155, 40), 'shape=mxgraph.infographic.ribbonSimple;notch1=0;notch2=10;notch=0;html=1;whiteSpace=wrap;fillColor=#5D7F99;strokeColor=none;shadow=0;fontSize=17;fontColor=#FFFFFF;align=left;spacingLeft=10;fontStyle=1;');
			   	part8.vertex = true;
			   	var part9 = new mxCell('5', new mxGeometry(0, 180, 40, 40), 'html=1;whiteSpace=wrap;fillColor=#12AAB5;strokeColor=none;shadow=0;fontSize=17;fontColor=#FFFFFF;align=center;fontStyle=1;rounded=0;');
			   	part9.vertex = true;
			   	var part10 = new mxCell('Label', new mxGeometry(45, 180, 175, 40), 'shape=mxgraph.infographic.ribbonSimple;notch1=0;notch2=10;notch=0;html=1;whiteSpace=wrap;fillColor=#61C6CE;strokeColor=none;shadow=0;fontSize=17;fontColor=#FFFFFF;align=left;spacingLeft=10;fontStyle=1;');
			   	part10.vertex = true;
			   	return sb.createVertexTemplateFromCells([part1, part2, part3, part4, part5, part6, part7, part8, part9, part10], 220, 220, 'Arrow List');
			}),				
				
			this.addEntry(dt + 'angled list', function()
			{
			   	var part1 = new mxCell('1', new mxGeometry(0, 0, 50, 30), 'shape=mxgraph.infographic.parallelogram;dx=5;html=1;whiteSpace=wrap;fillColor=#10739E;strokeColor=none;shadow=0;fontSize=17;fontColor=#FFFFFF;align=center;fontStyle=1;');
			   	part1.vertex = true;
			   	var part2 = new mxCell('Label', new mxGeometry(45, 0, 95, 30), 'shape=mxgraph.infographic.parallelogram;dx=5;html=1;whiteSpace=wrap;fillColor=#64BBE2;strokeColor=none;shadow=0;fontSize=17;fontColor=#FFFFFF;align=left;spacingLeft=10;fontStyle=1;');
			   	part2.vertex = true;
			   	var part3 = new mxCell('2', new mxGeometry(0, 35, 50, 30), 'shape=mxgraph.infographic.parallelogram;dx=5;html=1;whiteSpace=wrap;fillColor=#F2931E;strokeColor=none;shadow=0;fontSize=17;fontColor=#FFFFFF;align=center;fontStyle=1;');
			   	part3.vertex = true;
			   	var part4 = new mxCell('Label', new mxGeometry(45, 35, 115, 30), 'shape=mxgraph.infographic.parallelogram;dx=5;html=1;whiteSpace=wrap;fillColor=#F8C382;strokeColor=none;shadow=0;fontSize=17;fontColor=#FFFFFF;align=left;spacingLeft=10;fontStyle=1;');
			   	part4.vertex = true;
			   	var part5 = new mxCell('3', new mxGeometry(0, 70, 50, 30), 'shape=mxgraph.infographic.parallelogram;dx=5;html=1;whiteSpace=wrap;fillColor=#AE4132;strokeColor=none;shadow=0;fontSize=17;fontColor=#FFFFFF;align=center;fontStyle=1;');
			   	part5.vertex = true;
			   	var part6 = new mxCell('Label', new mxGeometry(45, 70, 135, 30), 'shape=mxgraph.infographic.parallelogram;dx=5;html=1;whiteSpace=wrap;fillColor=#F08E81;strokeColor=none;shadow=0;fontSize=17;fontColor=#FFFFFF;align=left;spacingLeft=10;fontStyle=1;');
			   	part6.vertex = true;
			   	var part7 = new mxCell('4', new mxGeometry(0, 105, 50, 30), 'shape=mxgraph.infographic.parallelogram;dx=5;html=1;whiteSpace=wrap;fillColor=#23445D;strokeColor=none;shadow=0;fontSize=17;fontColor=#FFFFFF;align=center;fontStyle=1;');
			   	part7.vertex = true;
			   	var part8 = new mxCell('Label', new mxGeometry(45, 105, 155, 30), 'shape=mxgraph.infographic.parallelogram;dx=5;html=1;whiteSpace=wrap;fillColor=#5D7F99;strokeColor=none;shadow=0;fontSize=17;fontColor=#FFFFFF;align=left;spacingLeft=10;fontStyle=1;');
			   	part8.vertex = true;
			   	var part9 = new mxCell('5', new mxGeometry(0, 140, 50, 30), 'shape=mxgraph.infographic.parallelogram;dx=5;html=1;whiteSpace=wrap;fillColor=#12AAB5;strokeColor=none;shadow=0;fontSize=17;fontColor=#FFFFFF;align=center;fontStyle=1;');
			   	part9.vertex = true;
			   	var part10 = new mxCell('Label', new mxGeometry(45, 140, 175, 30), 'shape=mxgraph.infographic.parallelogram;dx=5;html=1;whiteSpace=wrap;fillColor=#61C6CE;strokeColor=none;shadow=0;fontSize=17;fontColor=#FFFFFF;align=left;spacingLeft=10;fontStyle=1;');
			   	part10.vertex = true;
			   	return sb.createVertexTemplateFromCells([part1, part2, part3, part4, part5, part6, part7, part8, part9, part10], 220, 170, 'Angled List');
			}),				
				
			this.addEntry(dt + 'angled list', function()
			{
			   	var part1 = new mxCell('1', new mxGeometry(200, 0, 50, 30), 'shape=mxgraph.infographic.parallelogram;dx=5;html=1;whiteSpace=wrap;fillColor=#10739E;strokeColor=none;shadow=0;fontSize=17;fontColor=#FFFFFF;align=center;fontStyle=1;');
			   	part1.vertex = true;
			   	var part2 = new mxCell('Label', new mxGeometry(245, 0, 145, 30), 'shape=mxgraph.infographic.parallelogram;dx=5;html=1;whiteSpace=wrap;fillColor=#64BBE2;strokeColor=none;shadow=0;fontSize=17;fontColor=#FFFFFF;align=left;spacingLeft=10;fontStyle=1;');
			   	part2.vertex = true;
			   	var part3 = new mxCell('2', new mxGeometry(150, 35, 50, 30), 'shape=mxgraph.infographic.parallelogram;dx=5;html=1;whiteSpace=wrap;fillColor=#F2931E;strokeColor=none;shadow=0;fontSize=17;fontColor=#FFFFFF;align=center;fontStyle=1;');
			   	part3.vertex = true;
			   	var part4 = new mxCell('Label', new mxGeometry(195, 35, 145, 30), 'shape=mxgraph.infographic.parallelogram;dx=5;html=1;whiteSpace=wrap;fillColor=#F8C382;strokeColor=none;shadow=0;fontSize=17;fontColor=#FFFFFF;align=left;spacingLeft=10;fontStyle=1;');
			   	part4.vertex = true;
			   	var part5 = new mxCell('3', new mxGeometry(100, 70, 50, 30), 'shape=mxgraph.infographic.parallelogram;dx=5;html=1;whiteSpace=wrap;fillColor=#AE4132;strokeColor=none;shadow=0;fontSize=17;fontColor=#FFFFFF;align=center;fontStyle=1;');
			   	part5.vertex = true;
			   	var part6 = new mxCell('Label', new mxGeometry(145, 70, 145, 30), 'shape=mxgraph.infographic.parallelogram;dx=5;html=1;whiteSpace=wrap;fillColor=#F08E81;strokeColor=none;shadow=0;fontSize=17;fontColor=#FFFFFF;align=left;spacingLeft=10;fontStyle=1;');
			   	part6.vertex = true;
			   	var part7 = new mxCell('4', new mxGeometry(50, 105, 50, 30), 'shape=mxgraph.infographic.parallelogram;dx=5;html=1;whiteSpace=wrap;fillColor=#23445D;strokeColor=none;shadow=0;fontSize=17;fontColor=#FFFFFF;align=center;fontStyle=1;');
			   	part7.vertex = true;
			   	var part8 = new mxCell('Label', new mxGeometry(95, 105, 145, 30), 'shape=mxgraph.infographic.parallelogram;dx=5;html=1;whiteSpace=wrap;fillColor=#5D7F99;strokeColor=none;shadow=0;fontSize=17;fontColor=#FFFFFF;align=left;spacingLeft=10;fontStyle=1;');
			   	part8.vertex = true;
			   	var part9 = new mxCell('5', new mxGeometry(0, 140, 50, 30), 'shape=mxgraph.infographic.parallelogram;dx=5;html=1;whiteSpace=wrap;fillColor=#12AAB5;strokeColor=none;shadow=0;fontSize=17;fontColor=#FFFFFF;align=center;fontStyle=1;');
			   	part9.vertex = true;
			   	var part10 = new mxCell('Label', new mxGeometry(45, 140, 145, 30), 'shape=mxgraph.infographic.parallelogram;dx=5;html=1;whiteSpace=wrap;fillColor=#61C6CE;strokeColor=none;shadow=0;fontSize=17;fontColor=#FFFFFF;align=left;spacingLeft=10;fontStyle=1;');
			   	part10.vertex = true;
			   	return sb.createVertexTemplateFromCells([part1, part2, part3, part4, part5, part6, part7, part8, part9, part10], 390, 170, 'Angled List');
			}),				
				
			this.addEntry(dt + 'matrix', function()
			{
			   	var part1 = new mxCell('Lorem ipsum dolor sit amet, consectetur adipisicing elit', new mxGeometry(35, 35, 100, 100), 'html=1;fillColor=#10739E;strokeColor=none;shadow=0;fontSize=12;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;rounded=0;');
			   	part1.vertex = true;
			   	var part2 = new mxCell('Lorem ipsum dolor sit amet, consectetur adipisicing elit', new mxGeometry(140, 35, 100, 100), 'html=1;fillColor=#F2931E;strokeColor=none;shadow=0;fontSize=12;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;rounded=0;');
			   	part2.vertex = true;
			   	var part3 = new mxCell('Lorem ipsum dolor sit amet, consectetur adipisicing elit', new mxGeometry(35, 140, 100, 100), 'html=1;fillColor=#AE4132;strokeColor=none;shadow=0;fontSize=12;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;rounded=0;');
			   	part3.vertex = true;
			   	var part4 = new mxCell('Lorem ipsum dolor sit amet, consectetur adipisicing elit', new mxGeometry(140, 140, 100, 100), 'html=1;fillColor=#23445D;strokeColor=none;shadow=0;fontSize=12;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;rounded=0;');
			   	part4.vertex = true;

			   	var part5 = new mxCell('Label', new mxGeometry(0, 35, 30, 100), 'html=1;fillColor=#CCCCCC;strokeColor=none;shadow=0;fontSize=14;fontColor=#FFFFFF;align=center;fontStyle=1;whiteSpace=wrap;horizontal=0;rounded=0;');
			   	part5.vertex = true;
			   	var part6 = new mxCell('Label', new mxGeometry(0, 140, 30, 100), 'html=1;fillColor=#CCCCCC;strokeColor=none;shadow=0;fontSize=14;fontColor=#FFFFFF;align=center;fontStyle=1;whiteSpace=wrap;horizontal=0;rounded=0;');
			   	part6.vertex = true;
			   	var part7 = new mxCell('Label', new mxGeometry(35, 0, 100, 30), 'html=1;fillColor=#CCCCCC;strokeColor=none;shadow=0;fontSize=14;fontColor=#FFFFFF;align=center;fontStyle=1;whiteSpace=wrap;rounded=0;');
			   	part7.vertex = true;
			   	var part8 = new mxCell('Label', new mxGeometry(140, 0, 100, 30), 'html=1;fillColor=#CCCCCC;strokeColor=none;shadow=0;fontSize=14;fontColor=#FFFFFF;align=center;fontStyle=1;whiteSpace=wrap;rounded=0;');
			   	part8.vertex = true;
			   	
			   	return sb.createVertexTemplateFromCells([part1, part2, part3, part4, part5, part6, part7, part8], 240, 240, 'Matrix (2x2)');
			}),				

			this.addEntry(dt + 'matrix', function()
			{
			   	var part1 = new mxCell('Lorem ipsum dolor sit amet, consectetur adipisicing elit', new mxGeometry(35, 35, 100, 100), 'shape=mxgraph.basic.three_corner_round_rect;dx=18;flipH=1;html=1;fillColor=#10739E;strokeColor=none;shadow=0;fontSize=12;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;rounded=0;');
			   	part1.vertex = true;
			   	var part2 = new mxCell('Lorem ipsum dolor sit amet, consectetur adipisicing elit', new mxGeometry(140, 35, 100, 100), 'shape=mxgraph.basic.three_corner_round_rect;dx=18;html=1;fillColor=#F2931E;strokeColor=none;shadow=0;fontSize=12;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;rounded=0;');
			   	part2.vertex = true;
			   	var part3 = new mxCell('Lorem ipsum dolor sit amet, consectetur adipisicing elit', new mxGeometry(35, 140, 100, 100), 'shape=mxgraph.basic.three_corner_round_rect;dx=18;flipH=1;flipV=1;html=1;fillColor=#AE4132;strokeColor=none;shadow=0;fontSize=12;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;rounded=0;');
			   	part3.vertex = true;
			   	var part4 = new mxCell('Lorem ipsum dolor sit amet, consectetur adipisicing elit', new mxGeometry(140, 140, 100, 100), 'shape=mxgraph.basic.three_corner_round_rect;dx=18;flipV=1;html=1;fillColor=#23445D;strokeColor=none;shadow=0;fontSize=12;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;rounded=0;');
			   	part4.vertex = true;

			   	var part5 = new mxCell('Label', new mxGeometry(0, 45, 30, 80), 'rounded=1;arcSize=50;html=1;fillColor=#CCCCCC;strokeColor=none;shadow=0;fontSize=14;fontColor=#FFFFFF;align=center;fontStyle=1;whiteSpace=wrap;horizontal=0;');
			   	part5.vertex = true;
			   	var part6 = new mxCell('Label', new mxGeometry(0, 150, 30, 80), 'rounded=1;arcSize=50;html=1;fillColor=#CCCCCC;strokeColor=none;shadow=0;fontSize=14;fontColor=#FFFFFF;align=center;fontStyle=1;whiteSpace=wrap;horizontal=0;');
			   	part6.vertex = true;
			   	var part7 = new mxCell('Label', new mxGeometry(45, 0, 80, 30), 'rounded=1;arcSize=50;html=1;fillColor=#CCCCCC;strokeColor=none;shadow=0;fontSize=14;fontColor=#FFFFFF;align=center;fontStyle=1;whiteSpace=wrap;');
			   	part7.vertex = true;
			   	var part8 = new mxCell('Label', new mxGeometry(150, 0, 80, 30), 'rounded=1;arcSize=50;html=1;fillColor=#CCCCCC;strokeColor=none;shadow=0;fontSize=14;fontColor=#FFFFFF;align=center;fontStyle=1;whiteSpace=wrap;');
			   	part8.vertex = true;
			   	
			   	return sb.createVertexTemplateFromCells([part1, part2, part3, part4, part5, part6, part7, part8], 240, 240, 'Matrix (2x2)');
			}),				

			this.addEntry(dt + 'matrix', function()
			{
			   	var part11 = new mxCell('Lorem ipsum dolor sit amet, consectetur adipisicing elit', new mxGeometry(35, 35, 100, 100), 'html=1;fillColor=#F2931E;strokeColor=none;shadow=0;fontSize=12;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;rounded=0;');
			   	part11.vertex = true;
			   	var part12 = new mxCell('Lorem ipsum dolor sit amet, consectetur adipisicing elit', new mxGeometry(140, 35, 100, 100), 'html=1;fillColor=#F5AB50;strokeColor=none;shadow=0;fontSize=12;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;rounded=0;');
			   	part12.vertex = true;
			   	var part13 = new mxCell('Lorem ipsum dolor sit amet, consectetur adipisicing elit', new mxGeometry(245, 35, 100, 100), 'html=1;fillColor=#F8C382;strokeColor=none;shadow=0;fontSize=12;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;rounded=0;');
			   	part13.vertex = true;
			   	var part21 = new mxCell('Lorem ipsum dolor sit amet, consectetur adipisicing elit', new mxGeometry(35, 140, 100, 100), 'html=1;fillColor=#444444;strokeColor=none;shadow=0;fontSize=12;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;rounded=0;');
			   	part21.vertex = true;
			   	var part22 = new mxCell('Lorem ipsum dolor sit amet, consectetur adipisicing elit', new mxGeometry(140, 140, 100, 100), 'html=1;fillColor=#777777;strokeColor=none;shadow=0;fontSize=12;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;rounded=0;');
			   	part22.vertex = true;
			   	var part23 = new mxCell('Lorem ipsum dolor sit amet, consectetur adipisicing elit', new mxGeometry(245, 140, 100, 100), 'html=1;fillColor=#909090;strokeColor=none;shadow=0;fontSize=12;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;rounded=0;');
			   	part23.vertex = true;
			   	var part31 = new mxCell('Lorem ipsum dolor sit amet, consectetur adipisicing elit', new mxGeometry(35, 245, 100, 100), 'html=1;fillColor=#23445D;strokeColor=none;shadow=0;fontSize=12;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;rounded=0;');
			   	part31.vertex = true;
			   	var part32 = new mxCell('Lorem ipsum dolor sit amet, consectetur adipisicing elit', new mxGeometry(140, 245, 100, 100), 'html=1;fillColor=#2F5B7C;strokeColor=none;shadow=0;fontSize=12;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;rounded=0;');
			   	part32.vertex = true;
			   	var part33 = new mxCell('Lorem ipsum dolor sit amet, consectetur adipisicing elit', new mxGeometry(245, 245, 100, 100), 'html=1;fillColor=#5D7F99;strokeColor=none;shadow=0;fontSize=12;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;rounded=0;');
			   	part33.vertex = true;

			   	var label1 = new mxCell('Label', new mxGeometry(0, 35, 30, 100), 'html=1;fillColor=#CCCCCC;strokeColor=none;shadow=0;fontSize=14;fontColor=#FFFFFF;align=center;fontStyle=1;whiteSpace=wrap;horizontal=0;rounded=0;');
			   	label1.vertex = true;
			   	var label2 = new mxCell('Label', new mxGeometry(0, 140, 30, 100), 'html=1;fillColor=#CCCCCC;strokeColor=none;shadow=0;fontSize=14;fontColor=#FFFFFF;align=center;fontStyle=1;whiteSpace=wrap;horizontal=0;rounded=0;');
			   	label2.vertex = true;
			   	var label3 = new mxCell('Label', new mxGeometry(0, 245, 30, 100), 'html=1;fillColor=#CCCCCC;strokeColor=none;shadow=0;fontSize=14;fontColor=#FFFFFF;align=center;fontStyle=1;whiteSpace=wrap;horizontal=0;rounded=0;');
			   	label3.vertex = true;
			   	var label4 = new mxCell('Label', new mxGeometry(35, 0, 100, 30), 'html=1;fillColor=#CCCCCC;strokeColor=none;shadow=0;fontSize=14;fontColor=#FFFFFF;align=center;fontStyle=1;whiteSpace=wrap;rounded=0;');
			   	label4.vertex = true;
			   	var label5 = new mxCell('Label', new mxGeometry(140, 0, 100, 30), 'html=1;fillColor=#CCCCCC;strokeColor=none;shadow=0;fontSize=14;fontColor=#FFFFFF;align=center;fontStyle=1;whiteSpace=wrap;rounded=0;');
			   	label5.vertex = true;
			   	var label6 = new mxCell('Label', new mxGeometry(245, 0, 100, 30), 'html=1;fillColor=#CCCCCC;strokeColor=none;shadow=0;fontSize=14;fontColor=#FFFFFF;align=center;fontStyle=1;whiteSpace=wrap;rounded=0;');
			   	label6.vertex = true;
			   	
			   	return sb.createVertexTemplateFromCells([part11, part12, part13, part21, part22, part23, part31, part32, part33, label1, label2, label3, label4, label5, label6], 345, 345, 'Matrix (3x3)');
			}),				

			this.addEntry(dt + 'hex loop', function()
			{
			   	var part1 = new mxCell('Lorem ipsum<br> dolor sit amet, consectetur adipisicing elit', new mxGeometry(0, 51, 112, 102), 'shape=hexagon;strokeWidth=4;html=1;fillColor=#F5AB50;strokeColor=#ffffff;shadow=0;fontSize=10;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;spacing=10;rounded=0;');
			   	part1.vertex = true;
			   	var part2 = new mxCell('Lorem ipsum<br> dolor sit amet, consectetur adipisicing elit', new mxGeometry(0, 153, 112, 102), 'shape=hexagon;strokeWidth=4;html=1;fillColor=#E85642;strokeColor=#ffffff;shadow=0;fontSize=10;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;spacing=10;rounded=0;');
			   	part2.vertex = true;
			   	var part3 = new mxCell('Lorem ipsum<br> dolor sit amet, consectetur adipisicing elit', new mxGeometry(84, 102, 112, 102), 'shape=hexagon;strokeWidth=4;html=1;fillColor=#12AAB5;strokeColor=#ffffff;shadow=0;fontSize=10;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;spacing=10;rounded=0;');
			   	part3.vertex = true;
			   	var part4 = new mxCell('Lorem ipsum<br> dolor sit amet, consectetur adipisicing elit', new mxGeometry(84, 0, 112, 102), 'shape=hexagon;strokeWidth=4;html=1;fillColor=#1699D3;strokeColor=#ffffff;shadow=0;fontSize=10;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;spacing=10;rounded=0;');
			   	part4.vertex = true;
			   	var part5 = new mxCell('Lorem ipsum<br> dolor sit amet, consectetur adipisicing elit', new mxGeometry(168, 51, 112, 102), 'shape=hexagon;strokeWidth=4;html=1;fillColor=#736CA8;strokeColor=#ffffff;shadow=0;fontSize=10;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;spacing=10;rounded=0;');
			   	part5.vertex = true;
			   	var part6 = new mxCell('Lorem ipsum<br> dolor sit amet, consectetur adipisicing elit', new mxGeometry(168, 153, 112, 102), 'shape=hexagon;strokeWidth=4;html=1;fillColor=#2F5B7C;strokeColor=#ffffff;shadow=0;fontSize=10;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;spacing=10;rounded=0;');
			   	part6.vertex = true;
			   	var part7 = new mxCell('Lorem ipsum<br> dolor sit amet, consectetur adipisicing elit', new mxGeometry(84, 204, 112, 102), 'shape=hexagon;strokeWidth=4;html=1;fillColor=#777777;strokeColor=#ffffff;shadow=0;fontSize=10;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;spacing=10;rounded=0;');
			   	part7.vertex = true;

			   	return sb.createVertexTemplateFromCells([part1, part2, part3, part4, part5, part6, part7], 284, 312, 'Hex Loop');
			}),				

			this.addEntry(dt + 'target', function()
			{
			   	var part1 = new mxCell('', new mxGeometry(0, 0, 350, 350), 'ellipse;html=1;strokeWidth=4;fillColor=#F2931E;strokeColor=#ffffff;shadow=0;fontSize=10;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;spacing=10;');
			   	part1.vertex = true;
			   	var part2 = new mxCell('', new mxGeometry(25, 25, 300, 300), 'ellipse;html=1;strokeWidth=4;fillColor=#F8C382;strokeColor=#ffffff;shadow=0;fontSize=10;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;spacing=10;');
			   	part2.vertex = true;
			   	var part3 = new mxCell('', new mxGeometry(50, 50, 250, 250), 'ellipse;html=1;strokeWidth=4;fillColor=#FCE7CD;strokeColor=#ffffff;shadow=0;fontSize=10;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;spacing=10;');
			   	part3.vertex = true;
			   	var part4 = new mxCell('', new mxGeometry(75, 75, 200, 200), 'ellipse;html=1;strokeWidth=4;fillColor=#BAC8D3;strokeColor=#ffffff;shadow=0;fontSize=10;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;spacing=10;');
			   	part4.vertex = true;
			   	var part5 = new mxCell('', new mxGeometry(100, 100, 150, 150), 'ellipse;html=1;strokeWidth=4;fillColor=#5D7F99;strokeColor=#ffffff;shadow=0;fontSize=10;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;spacing=10;');
			   	part5.vertex = true;
			   	var part6 = new mxCell('', new mxGeometry(125, 125, 100, 100), 'ellipse;html=1;strokeWidth=4;fillColor=#2F5B7C;strokeColor=#ffffff;shadow=0;fontSize=10;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;spacing=10;');
			   	part6.vertex = true;
			   	var part7 = new mxCell('', new mxGeometry(150, 150, 50, 50), 'ellipse;html=1;strokeWidth=4;fillColor=#23445D;strokeColor=#ffffff;shadow=0;fontSize=10;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;spacing=10;');
			   	part7.vertex = true;

			   	return sb.createVertexTemplateFromCells([part1, part2, part3, part4, part5, part6, part7], 350, 350, 'Target');
			}),				

			this.addEntry(dt + 'target simple', function()
			{
			   	var part1 = new mxCell('', new mxGeometry(0, 0, 350, 350), 'ellipse;html=1;strokeWidth=4;fillColor=#10739E;strokeColor=#ffffff;shadow=0;fontSize=10;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;spacing=10;');
			   	part1.vertex = true;
			   	var part2 = new mxCell('', new mxGeometry(50, 50, 250, 250), 'ellipse;html=1;strokeWidth=4;fillColor=#F2931E;strokeColor=#ffffff;shadow=0;fontSize=10;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;spacing=10;');
			   	part2.vertex = true;
			   	var part3 = new mxCell('', new mxGeometry(100, 100, 150, 150), 'ellipse;html=1;strokeWidth=4;fillColor=#AE4132;strokeColor=#ffffff;shadow=0;fontSize=10;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;spacing=10;');
			   	part3.vertex = true;
			   	var part4 = new mxCell('', new mxGeometry(150, 150, 50, 50), 'ellipse;html=1;strokeWidth=4;fillColor=#23445D;strokeColor=#ffffff;shadow=0;fontSize=10;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;spacing=10;');
			   	part4.vertex = true;

			   	return sb.createVertexTemplateFromCells([part1, part2, part3, part4], 350, 350, 'Target (simple)');
			}),				

			this.addEntry(dt + 'onion', function()
			{
			   	var part1 = new mxCell('', new mxGeometry(0, 0, 350, 350), 'ellipse;html=1;strokeWidth=4;fillColor=#F5AB50;strokeColor=#ffffff;shadow=0;fontSize=10;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;spacing=10;');
			   	part1.vertex = true;
			   	var part2 = new mxCell('', new mxGeometry(25, 50, 300, 300), 'ellipse;html=1;strokeWidth=4;fillColor=#F8C382;strokeColor=#ffffff;shadow=0;fontSize=10;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;spacing=10;');
			   	part2.vertex = true;
			   	var part3 = new mxCell('', new mxGeometry(50, 100, 250, 250), 'ellipse;html=1;strokeWidth=4;fillColor=#FCE7CD;strokeColor=#ffffff;shadow=0;fontSize=10;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;spacing=10;');
			   	part3.vertex = true;
			   	var part4 = new mxCell('', new mxGeometry(75, 150, 200, 200), 'ellipse;html=1;strokeWidth=4;fillColor=#BAC8D3;strokeColor=#ffffff;shadow=0;fontSize=10;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;spacing=10;');
			   	part4.vertex = true;
			   	var part5 = new mxCell('', new mxGeometry(100, 200, 150, 150), 'ellipse;html=1;strokeWidth=4;fillColor=#5D7F99;strokeColor=#ffffff;shadow=0;fontSize=10;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;spacing=10;');
			   	part5.vertex = true;
			   	var part6 = new mxCell('', new mxGeometry(125, 250, 100, 100), 'ellipse;html=1;strokeWidth=4;fillColor=#2F5B7C;strokeColor=#ffffff;shadow=0;fontSize=10;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;spacing=10;');
			   	part6.vertex = true;
			   	var part7 = new mxCell('', new mxGeometry(150, 300, 50, 50), 'ellipse;html=1;strokeWidth=4;fillColor=#23445D;strokeColor=#ffffff;shadow=0;fontSize=10;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;spacing=10;');
			   	part7.vertex = true;

			   	return sb.createVertexTemplateFromCells([part1, part2, part3, part4, part5, part6, part7], 350, 350, 'Onion');
			}),				

			this.addEntry(dt + 'onion simple', function()
			{
			   	var part1 = new mxCell('', new mxGeometry(0, 0, 350, 350), 'ellipse;html=1;strokeWidth=4;fillColor=#10739E;strokeColor=#ffffff;shadow=0;fontSize=10;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;spacing=10;');
			   	part1.vertex = true;
			   	var part2 = new mxCell('', new mxGeometry(50, 100, 250, 250), 'ellipse;html=1;strokeWidth=4;fillColor=#F2931E;strokeColor=#ffffff;shadow=0;fontSize=10;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;spacing=10;');
			   	part2.vertex = true;
			   	var part3 = new mxCell('', new mxGeometry(100, 200, 150, 150), 'ellipse;html=1;strokeWidth=4;fillColor=#AE4132;strokeColor=#ffffff;shadow=0;fontSize=10;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;spacing=10;');
			   	part3.vertex = true;
			   	var part4 = new mxCell('', new mxGeometry(150, 300, 50, 50), 'ellipse;html=1;strokeWidth=4;fillColor=#23445D;strokeColor=#ffffff;shadow=0;fontSize=10;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;spacing=10;');
			   	part4.vertex = true;

			   	return sb.createVertexTemplateFromCells([part1, part2, part3, part4], 350, 350, 'Onion (simple)');
			}),				

			this.addEntry(dt + 'triangle', function()
			{
			   	var part1 = new mxCell('', new mxGeometry(0, 0, 350, 350), 'triangle;direction=north;html=1;strokeWidth=4;fillColor=#F2931E;strokeColor=#ffffff;shadow=0;fontSize=10;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;spacing=10;');
			   	part1.vertex = true;
			   	var part2 = new mxCell('', new mxGeometry(25, 0, 300, 300), 'triangle;direction=north;html=1;strokeWidth=4;fillColor=#F8C382;strokeColor=#ffffff;shadow=0;fontSize=10;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;spacing=10;');
			   	part2.vertex = true;
			   	var part3 = new mxCell('', new mxGeometry(50, 0, 250, 250), 'triangle;direction=north;html=1;strokeWidth=4;fillColor=#FCE7CD;strokeColor=#ffffff;shadow=0;fontSize=10;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;spacing=10;');
			   	part3.vertex = true;
			   	var part4 = new mxCell('', new mxGeometry(75, 0, 200, 200), 'triangle;direction=north;html=1;strokeWidth=4;fillColor=#BAC8D3;strokeColor=#ffffff;shadow=0;fontSize=10;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;spacing=10;');
			   	part4.vertex = true;
			   	var part5 = new mxCell('', new mxGeometry(100, 0, 150, 150), 'triangle;direction=north;html=1;strokeWidth=4;fillColor=#5D7F99;strokeColor=#ffffff;shadow=0;fontSize=10;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;spacing=10;');
			   	part5.vertex = true;
			   	var part6 = new mxCell('', new mxGeometry(125, 0, 100, 100), 'triangle;direction=north;html=1;strokeWidth=4;fillColor=#2F5B7C;strokeColor=#ffffff;shadow=0;fontSize=10;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;spacing=10;');
			   	part6.vertex = true;
			   	var part7 = new mxCell('', new mxGeometry(150, 0, 50, 50), 'triangle;direction=north;html=1;strokeWidth=4;fillColor=#23445D;strokeColor=#ffffff;shadow=0;fontSize=10;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;spacing=10;');
			   	part7.vertex = true;

			   	return sb.createVertexTemplateFromCells([part1, part2, part3, part4, part5, part6, part7], 350, 350, 'Triangle');
			}),				

			this.addEntry(dt + 'triangle simple', function()
			{
			   	var part1 = new mxCell('', new mxGeometry(0, 0, 350, 350), 'triangle;direction=north;strokeWidth=4;html=1;fillColor=#10739E;strokeColor=#ffffff;shadow=0;fontSize=10;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;spacing=10;');
			   	part1.vertex = true;
			   	var part2 = new mxCell('', new mxGeometry(50, 0, 250, 250), 'triangle;direction=north;strokeWidth=4;html=1;fillColor=#F2931E;strokeColor=#ffffff;shadow=0;fontSize=10;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;spacing=10;');
			   	part2.vertex = true;
			   	var part3 = new mxCell('', new mxGeometry(100, 0, 150, 150), 'triangle;direction=north;strokeWidth=4;html=1;fillColor=#AE4132;strokeColor=#ffffff;shadow=0;fontSize=10;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;spacing=10;');
			   	part3.vertex = true;
			   	var part4 = new mxCell('', new mxGeometry(150, 0, 50, 50), 'triangle;direction=north;strokeWidth=4;html=1;fillColor=#23445D;strokeColor=#ffffff;shadow=0;fontSize=10;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;spacing=10;');
			   	part4.vertex = true;

			   	return sb.createVertexTemplateFromCells([part1, part2, part3, part4], 350, 350, 'Triangle (simple)');
			}),				

			this.addEntry(dt + 'percent percentage list', function()
			{
			   	var chevron1 = new mxCell('30%', new mxGeometry(0, 0, 60, 40), 'shape=step;perimeter=stepPerimeter;whiteSpace=wrap;html=1;fixedSize=1;size=10;fillColor=#4A5768;strokeColor=none;fontSize=16;fontColor=#ffffff;fontStyle=1;rounded=0;');
			   	chevron1.vertex = true;
			   	var bg1 = new mxCell('', new mxGeometry(70, 10, 300, 20), 'whiteSpace=wrap;html=1;fixedSize=1;size=10;fillColor=#B1DDF0;strokeColor=none;');
			   	bg1.vertex = true;
			   	var bar1 = new mxCell('', new mxGeometry(70, 10, 90, 20), 'whiteSpace=wrap;html=1;fixedSize=1;size=10;fillColor=#10739E;strokeColor=none;shadow=0;');
			   	bar1.vertex = true;

			   	var chevron2 = new mxCell('75%', new mxGeometry(0, 50, 60, 40), 'shape=step;perimeter=stepPerimeter;whiteSpace=wrap;html=1;fixedSize=1;size=10;fillColor=#4A5768;strokeColor=none;fontSize=16;fontColor=#ffffff;fontStyle=1;rounded=0;');
			   	chevron2.vertex = true;
			   	var bg2 = new mxCell('', new mxGeometry(70, 60, 300, 20), 'whiteSpace=wrap;html=1;fixedSize=1;size=10;fillColor=#FCE7CD;strokeColor=none;');
			   	bg2.vertex = true;
			   	var bar2 = new mxCell('', new mxGeometry(70, 60, 225, 20), 'whiteSpace=wrap;html=1;fixedSize=1;size=10;fillColor=#F2931E;strokeColor=none;shadow=0;');
			   	bar2.vertex = true;

			   	var chevron3 = new mxCell('90%', new mxGeometry(0, 100, 60, 40), 'shape=step;perimeter=stepPerimeter;whiteSpace=wrap;html=1;fixedSize=1;size=10;fillColor=#4A5768;strokeColor=none;fontSize=16;fontColor=#ffffff;fontStyle=1;rounded=0;');
			   	chevron3.vertex = true;
			   	var bg3 = new mxCell('', new mxGeometry(70, 110, 300, 20), 'whiteSpace=wrap;html=1;fixedSize=1;size=10;fillColor=#FAD9D5;strokeColor=none;');
			   	bg3.vertex = true;
			   	var bar3 = new mxCell('', new mxGeometry(70, 110, 270, 20), 'whiteSpace=wrap;html=1;fixedSize=1;size=10;fillColor=#AE4132;strokeColor=none;shadow=0;');
			   	bar3.vertex = true;

			   	var chevron4 = new mxCell('25%', new mxGeometry(0, 150, 60, 40), 'shape=step;perimeter=stepPerimeter;whiteSpace=wrap;html=1;fixedSize=1;size=10;fillColor=#4A5768;strokeColor=none;fontSize=16;fontColor=#ffffff;fontStyle=1;rounded=0;');
			   	chevron4.vertex = true;
			   	var bg4 = new mxCell('', new mxGeometry(70, 160, 300, 20), 'whiteSpace=wrap;html=1;fixedSize=1;size=10;fillColor=#BAC8D3;strokeColor=none;');
			   	bg4.vertex = true;
			   	var bar4 = new mxCell('', new mxGeometry(70, 160, 75, 20), 'whiteSpace=wrap;html=1;fixedSize=1;size=10;fillColor=#23445D;strokeColor=none;shadow=0;');
			   	bar4.vertex = true;

			   	return sb.createVertexTemplateFromCells([chevron1, bg1, bar1, chevron2, bg2, bar2, chevron3, bg3, bar3, chevron4, bg4, bar4], 370, 190, 'Percentage list');
			}),				

			this.addEntry(dt + 'percent percentage list', function()
			{
			   	var bg1 = new mxCell('', new mxGeometry(0, 0, 400, 40), 'whiteSpace=wrap;html=1;fixedSize=1;size=10;fillColor=#dddddd;strokeColor=none;rounded=0;');
			   	bg1.vertex = true;
			   	var bar1 = new mxCell('65%', new mxGeometry(0, 0, 260, 40), 'html=1;shape=mxgraph.infographic.ribbonSimple;notch1=0;notch2=20;fillColor=#10739E;strokeColor=none;align=left;verticalAlign=middle;fontColor=#ffffff;fontSize=18;spacingLeft=10;fontStyle=1;shadow=0;');
			   	bar1.vertex = true;
			   	var label1 = new mxCell('Label', new mxGeometry(320, 0, 80, 40), 'text;html=1;strokeColor=none;fillColor=none;align=right;verticalAlign=middle;whiteSpace=wrap;rounded=0;shadow=0;fontSize=18;spacingRight=10;');
			   	label1.vertex = true;

			   	var bg2 = new mxCell('', new mxGeometry(0, 50, 400, 40), 'whiteSpace=wrap;html=1;fixedSize=1;size=10;fillColor=#dddddd;strokeColor=none;rounded=0;');
			   	bg2.vertex = true;
			   	var bar2 = new mxCell('45%', new mxGeometry(0, 50, 180, 40), 'html=1;shape=mxgraph.infographic.ribbonSimple;notch1=0;notch2=20;fillColor=#F2931E;strokeColor=none;align=left;verticalAlign=middle;fontColor=#ffffff;fontSize=18;spacingLeft=10;fontStyle=1;shadow=0;');
			   	bar2.vertex = true;
			   	var label2 = new mxCell('Label', new mxGeometry(320, 50, 80, 40), 'text;html=1;strokeColor=none;fillColor=none;align=right;verticalAlign=middle;whiteSpace=wrap;rounded=0;shadow=0;fontSize=18;spacingRight=10;');
			   	label2.vertex = true;

			   	var bg3 = new mxCell('', new mxGeometry(0, 100, 400, 40), 'whiteSpace=wrap;html=1;fixedSize=1;size=10;fillColor=#dddddd;strokeColor=none;rounded=0;');
			   	bg3.vertex = true;
			   	var bar3 = new mxCell('30%', new mxGeometry(0, 100, 120, 40), 'html=1;shape=mxgraph.infographic.ribbonSimple;notch1=0;notch2=20;fillColor=#AE4132;strokeColor=none;align=left;verticalAlign=middle;fontColor=#ffffff;fontSize=18;spacingLeft=10;fontStyle=1;shadow=0;');
			   	bar3.vertex = true;
			   	var label3 = new mxCell('Label', new mxGeometry(320, 100, 80, 40), 'text;html=1;strokeColor=none;fillColor=none;align=right;verticalAlign=middle;whiteSpace=wrap;rounded=0;shadow=0;fontSize=18;spacingRight=10;');
			   	label3.vertex = true;

			   	var bg4 = new mxCell('', new mxGeometry(0, 150, 400, 40), 'whiteSpace=wrap;html=1;fixedSize=1;size=10;fillColor=#dddddd;strokeColor=none;rounded=0;');
			   	bg4.vertex = true;
			   	var bar4 = new mxCell('60%', new mxGeometry(0, 150, 240, 40), 'html=1;shape=mxgraph.infographic.ribbonSimple;notch1=0;notch2=20;fillColor=#23445D;strokeColor=none;align=left;verticalAlign=middle;fontColor=#ffffff;fontSize=18;spacingLeft=10;fontStyle=1;shadow=0;');
			   	bar4.vertex = true;
			   	var label4 = new mxCell('Label', new mxGeometry(320, 150, 80, 40), 'text;html=1;strokeColor=none;fillColor=none;align=right;verticalAlign=middle;whiteSpace=wrap;rounded=0;shadow=0;fontSize=18;spacingRight=10;');
			   	label4.vertex = true;

			   	var bg5 = new mxCell('', new mxGeometry(0, 200, 400, 40), 'whiteSpace=wrap;html=1;fixedSize=1;size=10;fillColor=#dddddd;strokeColor=none;rounded=0;');
			   	bg5.vertex = true;
			   	var bar5 = new mxCell('85%', new mxGeometry(0, 200, 340, 40), 'html=1;shape=mxgraph.infographic.ribbonSimple;notch1=0;notch2=20;fillColor=#12AAB5;strokeColor=none;align=left;verticalAlign=middle;fontColor=#ffffff;fontSize=18;spacingLeft=10;fontStyle=1;shadow=0;');
			   	bar5.vertex = true;
			   	var label5 = new mxCell('Label', new mxGeometry(320, 200, 80, 40), 'text;html=1;strokeColor=none;fillColor=none;align=right;verticalAlign=middle;whiteSpace=wrap;rounded=0;shadow=0;fontSize=18;spacingRight=10;');
			   	label5.vertex = true;

			   	return sb.createVertexTemplateFromCells([bg1, bar1, bg2, bar2, bg3, bar3, bg4, bar4, bg5, bar5, label1, label2, label3, label4, label5], 400, 250, 'Percentage list');
			}),				

			this.addEntry(dt + 'arc list', function()
			{
			   	var arc1 = new mxCell('', new mxGeometry(0, 0, 260, 260), s4 + 'partConcEllipse;fillColor=#10739E;strokeColor=#ffffff;startAngle=0.75;endAngle=0.08;arcWidth=0.16;strokeWidth=3;');
			   	arc1.vertex = true;
			   	var arc2 = new mxCell('', new mxGeometry(20, 20, 220, 220), s4 + 'partConcEllipse;fillColor=#F2931E;strokeColor=#ffffff;startAngle=0.91;endAngle=0.17;arcWidth=0.18;strokeWidth=3;');
			   	arc2.vertex = true;
			   	var arc3 = new mxCell('', new mxGeometry(40, 40, 180, 180), s4 + 'partConcEllipse;fillColor=#AE4132;strokeColor=#ffffff;startAngle=0.75;endAngle=0.11;arcWidth=0.22;strokeWidth=3;');
			   	arc3.vertex = true;
			   	var arc4 = new mxCell('', new mxGeometry(60, 60, 140, 140), s4 + 'partConcEllipse;fillColor=#12AAB5;strokeColor=#ffffff;startAngle=0.02;endAngle=0.25;arcWidth=0.29;strokeWidth=3;');
			   	arc4.vertex = true;
			   	var arc5 = new mxCell('', new mxGeometry(80, 80, 100, 100), s4 + 'partConcEllipse;fillColor=#CCCCCC;strokeColor=#ffffff;startAngle=0.75;endAngle=0.25;arcWidth=0.4;strokeWidth=3;');
			   	arc5.vertex = true;
			   	var part1 = new mxCell('2018', new mxGeometry(100, 100, 60, 60), 'html=1;shape=mxgraph.basic.pie;fillColor=#23445D;strokeColor=#ffffff;startAngle=0.75;endAngle=0.25;fontSize=16;fontColor=#FFFFFF;verticalAlign=top;fontStyle=1;strokeWidth=3;');
			   	part1.vertex = true;
			   	
			   	return sb.createVertexTemplateFromCells([arc1, arc2, arc3, arc4, arc5, part1], 200, 200, 'Arc list');
			}),				

			this.addEntry(dt + 'arc list', function()
			{
			   	var circle1 = new mxCell('', new mxGeometry(0, 0, 250, 250), 'ellipse;fillColor=none;strokeColor=#444444;');
			   	circle1.vertex = true;
			   	var circle2 = new mxCell('', new mxGeometry(20, 20, 210, 210), 'ellipse;fillColor=none;strokeColor=#444444;');
			   	circle2.vertex = true;
			   	var circle3 = new mxCell('', new mxGeometry(40, 40, 170, 170), 'ellipse;fillColor=none;strokeColor=#444444;');
			   	circle3.vertex = true;
			   	var circle4 = new mxCell('', new mxGeometry(60, 60, 130, 130), 'ellipse;fillColor=none;strokeColor=#444444;');
			   	circle4.vertex = true;
			   	var circle5 = new mxCell('', new mxGeometry(80, 80, 90, 90), 'ellipse;fillColor=none;strokeColor=#444444;');
			   	circle5.vertex = true;
			   	
			   	var arc1 = new mxCell('', new mxGeometry(0, 0, 250, 250), s4 + 'arc;fillColor=none;strokeColor=#10739E;startAngle=0.75;endAngle=0.08;strokeWidth=16;');
			   	arc1.vertex = true;
			   	var arc2 = new mxCell('', new mxGeometry(20, 20, 210, 210), s4 + 'arc;fillColor=none;strokeColor=#F2931E;startAngle=0.91;endAngle=0.17;strokeWidth=16;');
			   	arc2.vertex = true;
			   	var arc3 = new mxCell('', new mxGeometry(40, 40, 170, 170), s4 + 'arc;fillColor=none;strokeColor=#AE4132;startAngle=0.75;endAngle=0.11;strokeWidth=16;');
			   	arc3.vertex = true;
			   	var arc4 = new mxCell('', new mxGeometry(60, 60, 130, 130), s4 + 'arc;fillColor=none;strokeColor=#12AAB5;startAngle=0.02;endAngle=0.25;strokeWidth=16;');
			   	arc4.vertex = true;
			   	var arc5 = new mxCell('', new mxGeometry(80, 80, 90, 90), s4 + 'arc;fillColor=none;strokeColor=#CCCCCC;startAngle=0.75;endAngle=0.25;strokeWidth=16;');
			   	arc5.vertex = true;
			   	var part1 = new mxCell('2018', new mxGeometry(92, 92, 66, 66), 'html=1;shape=mxgraph.basic.pie;fillColor=#23445D;strokeColor=none;startAngle=0.75;endAngle=0.25;fontSize=16;fontColor=#FFFFFF;verticalAlign=top;spacingTop=8;fontStyle=1;');
			   	part1.vertex = true;
			   	
			   	return sb.createVertexTemplateFromCells([circle1, circle2, circle3, circle4, circle5, arc1, arc2, arc3, arc4, arc5, part1], 200, 200, 'Arc list');
			}),				

			this.addEntry(dt + 'triangle graph', function()
			{
			   	var part1 = new mxCell('Label', new mxGeometry(0, 70, 80, 70), 'verticalLabelPosition=middle;verticalAlign=bottom;html=1;whiteSpace=wrap;shape=mxgraph.infographic.shadedTriangle;fillColor=#10739E;strokeColor=none;fontSize=10;labelPosition=center;align=center;fontColor=#FFFFFF;fontStyle=1;shadow=0;');
			   	part1.vertex = true;
			   	var part2 = new mxCell('Label', new mxGeometry(60, 10, 80, 130), 'verticalLabelPosition=middle;verticalAlign=bottom;html=1;whiteSpace=wrap;shape=mxgraph.infographic.shadedTriangle;fillColor=#F2931E;strokeColor=none;fontSize=10;labelPosition=center;align=center;fontColor=#FFFFFF;fontStyle=1;shadow=0;');
			   	part2.vertex = true;
			   	var part3 = new mxCell('Label', new mxGeometry(120, 0, 80, 140), 'verticalLabelPosition=middle;verticalAlign=bottom;html=1;whiteSpace=wrap;shape=mxgraph.infographic.shadedTriangle;fillColor=#AE4132;strokeColor=none;fontSize=10;labelPosition=center;align=center;fontColor=#FFFFFF;fontStyle=1;shadow=0;');
			   	part3.vertex = true;
			   	var part4 = new mxCell('Label', new mxGeometry(180, 40, 80, 100), 'verticalLabelPosition=middle;verticalAlign=bottom;html=1;whiteSpace=wrap;shape=mxgraph.infographic.shadedTriangle;fillColor=#12AAB5;strokeColor=none;fontSize=10;labelPosition=center;align=center;fontColor=#FFFFFF;fontStyle=1;shadow=0;');
			   	part4.vertex = true;
			   	var part5 = new mxCell('Label', new mxGeometry(240, 60, 80, 80), 'verticalLabelPosition=middle;verticalAlign=bottom;html=1;whiteSpace=wrap;shape=mxgraph.infographic.shadedTriangle;fillColor=#23445D;strokeColor=none;fontSize=10;labelPosition=center;align=center;fontColor=#FFFFFF;fontStyle=1;shadow=0;');
			   	part5.vertex = true;
			   	
			   	return sb.createVertexTemplateFromCells([part5, part4, part3, part2, part1], 320, 140, 'Triangle Graph');
			}),				
			
			this.addEntry(dt + 'pyramid graph', function()
			{
			   	var part1 = new mxCell('Label', new mxGeometry(0, 70, 80, 70), 'verticalLabelPosition=bottom;verticalAlign=top;html=1;shape=mxgraph.infographic.shadedPyramid;fillColor=#10739E;strokeColor=none;fontSize=10;labelPosition=center;align=center;shadow=0;');
			   	part1.vertex = true;
			   	var part2 = new mxCell('Label', new mxGeometry(60, 10, 80, 130), 'verticalLabelPosition=bottom;verticalAlign=top;html=1;shape=mxgraph.infographic.shadedPyramid;fillColor=#F2931E;strokeColor=none;fontSize=10;labelPosition=center;align=center;shadow=0;');
			   	part2.vertex = true;
			   	var part3 = new mxCell('Label', new mxGeometry(120, 0, 80, 140), 'verticalLabelPosition=bottom;verticalAlign=top;html=1;shape=mxgraph.infographic.shadedPyramid;fillColor=#AE4132;strokeColor=none;fontSize=10;labelPosition=center;align=center;shadow=0;');
			   	part3.vertex = true;
			   	var part4 = new mxCell('Label', new mxGeometry(180, 40, 80, 100), 'verticalLabelPosition=bottom;verticalAlign=top;html=1;shape=mxgraph.infographic.shadedPyramid;fillColor=#12AAB5;strokeColor=none;fontSize=10;labelPosition=center;align=center;shadow=0;');
			   	part4.vertex = true;
			   	var part5 = new mxCell('Label', new mxGeometry(240, 60, 80, 80), 'verticalLabelPosition=bottom;verticalAlign=top;html=1;shape=mxgraph.infographic.shadedPyramid;fillColor=#23445D;strokeColor=none;fontSize=10;labelPosition=center;align=center;shadow=0;');
			   	part5.vertex = true;
			   	
			   	return sb.createVertexTemplateFromCells([part5, part4, part3, part2, part1], 320, 140, 'Pyramid Graph');
			}),				

			this.addEntry(dt + 'change graph', function()
			{
			   	var part1 = new mxCell('', new mxGeometry(0, 30, 30, 100), 'fillColor=#10739E;strokeColor=none;');
			   	part1.vertex = true;
			   	var arrow1 = new mxCell('', new mxGeometry(3, 30, 24, 70), 'shape=mxgraph.arrows2.arrow;dy=0.4;dx=16;notch=0;direction=north;fillColor=#1699D3;strokeColor=none;');
			   	arrow1.vertex = true;
			   	part1.insert(arrow1);
			   	var text1 = new mxCell('Label', new mxGeometry(0, 0, 30, 20), 'text;html=1;align=center;verticalAlign=middle;whiteSpace=wrap;fontColor=#FFFFFF;fontSize=10;strokeColor=none;fillColor=none;');
			   	text1.vertex = true;
			   	part1.insert(text1);
			   	
			   	var part2 = new mxCell('', new mxGeometry(35, 10, 30, 120), 'fillColor=#F2931E;strokeColor=none;');
			   	part2.vertex = true;
			   	var arrow2 = new mxCell('', new mxGeometry(3, 0, 24, 80), 'shape=mxgraph.arrows2.arrow;dy=0.4;dx=16;notch=0;direction=south;fillColor=#F5AB50;strokeColor=none;');
			   	arrow2.vertex = true;
			   	part2.insert(arrow2);
			   	var text2 = new mxCell('Label', new mxGeometry(0, 0, 30, 20), 'text;html=1;align=center;verticalAlign=middle;whiteSpace=wrap;fontColor=#FFFFFF;fontSize=10;strokeColor=none;fillColor=none;');
			   	text2.vertex = true;
			   	part2.insert(text2);
			   	
			   	var part3 = new mxCell('', new mxGeometry(70, 0, 30, 130), 'fillColor=#AE4132;strokeColor=none;');
			   	part3.vertex = true;
			   	var arrow3 = new mxCell('', new mxGeometry(3, 80, 24, 50), 'shape=mxgraph.arrows2.arrow;dy=0.4;dx=16;notch=0;direction=north;fillColor=#E85642;strokeColor=none;');
			   	arrow3.vertex = true;
			   	part3.insert(arrow3);
			   	var text3 = new mxCell('Label', new mxGeometry(0, 0, 30, 20), 'text;html=1;align=center;verticalAlign=middle;whiteSpace=wrap;fontColor=#FFFFFF;fontSize=10;strokeColor=none;fillColor=none;');
			   	text3.vertex = true;
			   	part3.insert(text3);
			   	
			   	var part4 = new mxCell('', new mxGeometry(105, 50, 30, 80), 'fillColor=#12AAB5;strokeColor=none;');
			   	part4.vertex = true;
			   	var arrow4 = new mxCell('', new mxGeometry(3, 0, 24, 30), 'shape=mxgraph.arrows2.arrow;dy=0.4;dx=16;notch=0;direction=south;fillColor=#64BBE2;strokeColor=none;');
			   	arrow4.vertex = true;
			   	part4.insert(arrow4);
			   	var text4 = new mxCell('Label', new mxGeometry(0, 0, 30, 20), 'text;html=1;align=center;verticalAlign=middle;whiteSpace=wrap;fontColor=#FFFFFF;fontSize=10;strokeColor=none;fillColor=none;');
			   	text4.vertex = true;
			   	part4.insert(text4);
			   	
			   	var part5 = new mxCell('', new mxGeometry(140, 60, 30, 70), 'fillColor=#23445D;strokeColor=none;');
			   	part5.vertex = true;
			   	var arrow5 = new mxCell('', new mxGeometry(3, 10, 24, 60), 'shape=mxgraph.arrows2.arrow;dy=0.4;dx=16;notch=0;direction=north;fillColor=#2F5B7C;strokeColor=none;');
			   	arrow5.vertex = true;
			   	part5.insert(arrow5);
			   	var text5 = new mxCell('Label', new mxGeometry(0, 0, 30, 20), 'text;html=1;align=center;verticalAlign=middle;whiteSpace=wrap;fontColor=#FFFFFF;fontSize=10;strokeColor=none;fillColor=none;');
			   	text5.vertex = true;
			   	part5.insert(text5);
			   	
			   	return sb.createVertexTemplateFromCells([part1, part2, part3, part4, part5], 170, 130, 'Change Graph');
			}),				
			
			this.addEntry(dt + 'step pyramid', function()
			{
			   	var part1 = new mxCell('', new mxGeometry(70, 0, 20, 95), 'html=1;shape=mxgraph.infographic.pyramidStep;fillColor=#F2931E;strokeColor=none;shadow=0;');
			   	part1.vertex = true;
			   	var part2 = new mxCell('', new mxGeometry(60, 10, 40, 85), 'html=1;shape=mxgraph.infographic.pyramidStep;fillColor=#F8C382;strokeColor=none;shadow=0;');
			   	part2.vertex = true;
			   	var part3 = new mxCell('', new mxGeometry(50, 20, 60, 75), 'html=1;shape=mxgraph.infographic.pyramidStep;fillColor=#FCE7CD;strokeColor=none;shadow=0;');
			   	part3.vertex = true;
			   	var part4 = new mxCell('', new mxGeometry(40, 30, 80, 65), 'html=1;shape=mxgraph.infographic.pyramidStep;fillColor=#BAC8D3;strokeColor=none;shadow=0;');
			   	part4.vertex = true;
			   	var part5 = new mxCell('', new mxGeometry(30, 40, 100, 55), 'html=1;shape=mxgraph.infographic.pyramidStep;fillColor=#5D7F99;strokeColor=none;shadow=0;');
			   	part5.vertex = true;
			   	var part6 = new mxCell('', new mxGeometry(20, 50, 120, 45), 'html=1;shape=mxgraph.infographic.pyramidStep;fillColor=#2F5B7C;strokeColor=none;shadow=0;');
			   	part6.vertex = true;
			   	var part7 = new mxCell('', new mxGeometry(10, 60, 140, 35), 'html=1;shape=mxgraph.infographic.pyramidStep;fillColor=#23445D;strokeColor=none;shadow=0;');
			   	part7.vertex = true;
			   	var part8 = new mxCell('', new mxGeometry(0, 70, 160, 25), 'html=1;shape=mxgraph.infographic.pyramidStep;fillColor=#333333;strokeColor=none;shadow=0;');
			   	part8.vertex = true;
			   	
			   	return sb.createVertexTemplateFromCells([part1, part2, part3, part4, part5, part6, part7, part8], 160, 95, 'Step Pyramid');
			}),				
			
			this.addEntry(dt + 'circular dial list horizontal', function()
			{
			   	var part1 = new mxCell('Label', new mxGeometry(0, 0, 100, 100), 'verticalLabelPosition=bottom;verticalAlign=top;html=1;shape=mxgraph.basic.donut;dx=10;strokeColor=none;fillColor=#B1DDF0;fontSize=12;fontColor=#10739E;align=center;fontStyle=1;');
			   	part1.vertex = true;
			   	var part2 = new mxCell('65%', new mxGeometry(0, 0, 100, 100), 'verticalLabelPosition=middle;verticalAlign=middle;html=1;whiteSpace=wrap;shape=mxgraph.basic.partConcEllipse;startAngle=0;endAngle=0.65;arcWidth=0.2;strokeColor=none;fillColor=#10739E;fontSize=22;fontColor=#10739E;align=center;fontStyle=1');
			   	part2.vertex = true;
			   	part1.insert(part2);
			   	
			   	var part3 = new mxCell('Label', new mxGeometry(110, 0, 100, 100), 'verticalLabelPosition=bottom;verticalAlign=top;html=1;shape=mxgraph.basic.donut;dx=10;strokeColor=none;fillColor=#F8C382;fontSize=12;fontColor=#F2931E;align=center;fontStyle=1;');
			   	part3.vertex = true;
			   	var part4 = new mxCell('40%', new mxGeometry(0, 0, 100, 100), 'verticalLabelPosition=middle;verticalAlign=middle;html=1;whiteSpace=wrap;shape=mxgraph.basic.partConcEllipse;startAngle=0;endAngle=0.4;arcWidth=0.2;strokeColor=none;fillColor=#F2931E;fontSize=22;fontColor=#F2931E;align=center;fontStyle=1');
			   	part4.vertex = true;
			   	part3.insert(part4);
			   	
			   	var part5 = new mxCell('Label', new mxGeometry(220, 0, 100, 100), 'verticalLabelPosition=bottom;verticalAlign=top;html=1;shape=mxgraph.basic.donut;dx=10;strokeColor=none;fillColor=#F08E81;fontSize=12;fontColor=#AE4132;align=center;fontStyle=1;');
			   	part5.vertex = true;
			   	var part6 = new mxCell('25%', new mxGeometry(0, 0, 100, 100), 'verticalLabelPosition=middle;verticalAlign=middle;html=1;whiteSpace=wrap;shape=mxgraph.basic.partConcEllipse;startAngle=0;endAngle=0.25;arcWidth=0.2;strokeColor=none;fillColor=#AE4132;fontSize=22;fontColor=#AE4132;align=center;fontStyle=1');
			   	part6.vertex = true;
			   	part5.insert(part6);
			   	
			   	var part7 = new mxCell('Label', new mxGeometry(330, 0, 100, 100), 'verticalLabelPosition=bottom;verticalAlign=top;html=1;shape=mxgraph.basic.donut;dx=10;strokeColor=none;fillColor=#5D7F99;fontSize=12;fontColor=#23445D;align=center;fontStyle=1;');
			   	part7.vertex = true;
			   	var part8 = new mxCell('60%', new mxGeometry(0, 0, 100, 100), 'verticalLabelPosition=middle;verticalAlign=middle;html=1;whiteSpace=wrap;shape=mxgraph.basic.partConcEllipse;startAngle=0;endAngle=0.6;arcWidth=0.2;strokeColor=none;fillColor=#23445D;fontSize=22;fontColor=#23445D;align=center;fontStyle=1');
			   	part8.vertex = true;
			   	part7.insert(part8);
			   	
			   	var part9 = new mxCell('Label', new mxGeometry(440, 0, 100, 100), 'verticalLabelPosition=bottom;verticalAlign=top;html=1;shape=mxgraph.basic.donut;dx=10;strokeColor=none;fillColor=#61C6CE;fontSize=12;fontColor=#12AAB5;align=center;fontStyle=1;');
			   	part9.vertex = true;
			   	var part10 = new mxCell('80%', new mxGeometry(0, 0, 100, 100), 'verticalLabelPosition=middle;verticalAlign=middle;html=1;whiteSpace=wrap;shape=mxgraph.basic.partConcEllipse;startAngle=0;endAngle=0.8;arcWidth=0.2;strokeColor=none;fillColor=#12AAB5;fontSize=22;fontColor=#12AAB5;align=center;fontStyle=1');
			   	part10.vertex = true;
			   	part9.insert(part10);
			   	
			   	return sb.createVertexTemplateFromCells([part1, part3, part5, part7, part9], 540, 100, 'Circular Dial List (horizontal)');
			}),				

			this.addEntry(dt + 'circular dial list vertical', function()
			{
			   	var part1 = new mxCell('Label', new mxGeometry(0, 0, 100, 100), 'labelPosition=right;spacingLeft=10;html=1;shape=mxgraph.basic.donut;dx=10;strokeColor=none;fillColor=#B1DDF0;fontSize=12;fontColor=#10739E;align=left;fontStyle=1;');
			   	part1.vertex = true;
			   	var part2 = new mxCell('65%', new mxGeometry(0, 0, 100, 100), 'verticalLabelPosition=middle;verticalAlign=middle;html=1;whiteSpace=wrap;shape=mxgraph.basic.partConcEllipse;startAngle=0;endAngle=0.65;arcWidth=0.2;strokeColor=none;fillColor=#10739E;fontSize=22;fontColor=#10739E;align=center;fontStyle=1');
			   	part2.vertex = true;
			   	part1.insert(part2);
			   	
			   	var part3 = new mxCell('Label', new mxGeometry(0, 110, 100, 100), 'labelPosition=right;spacingLeft=10;html=1;shape=mxgraph.basic.donut;dx=10;strokeColor=none;fillColor=#F8C382;fontSize=12;fontColor=#F2931E;align=left;fontStyle=1;');
			   	part3.vertex = true;
			   	var part4 = new mxCell('40%', new mxGeometry(0, 0, 100, 100), 'verticalLabelPosition=middle;verticalAlign=middle;html=1;whiteSpace=wrap;shape=mxgraph.basic.partConcEllipse;startAngle=0;endAngle=0.4;arcWidth=0.2;strokeColor=none;fillColor=#F2931E;fontSize=22;fontColor=#F2931E;align=center;fontStyle=1');
			   	part4.vertex = true;
			   	part3.insert(part4);
			   	
			   	var part5 = new mxCell('Label', new mxGeometry(0, 220, 100, 100), 'labelPosition=right;spacingLeft=10;html=1;shape=mxgraph.basic.donut;dx=10;strokeColor=none;fillColor=#F08E81;fontSize=12;fontColor=#AE4132;align=left;fontStyle=1;');
			   	part5.vertex = true;
			   	var part6 = new mxCell('25%', new mxGeometry(0, 0, 100, 100), 'verticalLabelPosition=middle;verticalAlign=middle;html=1;whiteSpace=wrap;shape=mxgraph.basic.partConcEllipse;startAngle=0;endAngle=0.25;arcWidth=0.2;strokeColor=none;fillColor=#AE4132;fontSize=22;fontColor=#AE4132;align=center;fontStyle=1');
			   	part6.vertex = true;
			   	part5.insert(part6);
			   	
			   	var part7 = new mxCell('Label', new mxGeometry(0, 330, 100, 100), 'labelPosition=right;spacingLeft=10;html=1;shape=mxgraph.basic.donut;dx=10;strokeColor=none;fillColor=#5D7F99;fontSize=12;fontColor=#23445D;align=left;fontStyle=1;');
			   	part7.vertex = true;
			   	var part8 = new mxCell('60%', new mxGeometry(0, 0, 100, 100), 'verticalLabelPosition=middle;verticalAlign=middle;html=1;whiteSpace=wrap;shape=mxgraph.basic.partConcEllipse;startAngle=0;endAngle=0.6;arcWidth=0.2;strokeColor=none;fillColor=#23445D;fontSize=22;fontColor=#23445D;align=center;fontStyle=1');
			   	part8.vertex = true;
			   	part7.insert(part8);
			   	
			   	var part9 = new mxCell('Label', new mxGeometry(0, 440, 100, 100), 'labelPosition=right;spacingLeft=10;html=1;shape=mxgraph.basic.donut;dx=10;strokeColor=none;fillColor=#61C6CE;fontSize=12;fontColor=#12AAB5;align=left;fontStyle=1;');
			   	part9.vertex = true;
			   	var part10 = new mxCell('80%', new mxGeometry(0, 0, 100, 100), 'verticalLabelPosition=middle;verticalAlign=middle;html=1;whiteSpace=wrap;shape=mxgraph.basic.partConcEllipse;startAngle=0;endAngle=0.8;arcWidth=0.2;strokeColor=none;fillColor=#12AAB5;fontSize=22;fontColor=#12AAB5;align=center;fontStyle=1');
			   	part10.vertex = true;
			   	part9.insert(part10);
			   	
			   	return sb.createVertexTemplateFromCells([part1, part3, part5, part7, part9], 100, 540, 'Circular Dial List (vertical)');
			}),				

			this.addEntry(dt + 'circular dial list horizontal', function()
			{
			   	var label1 = new mxCell('Label', new mxGeometry(0, 0, 100, 30), 'verticalLabelPosition=middle;verticalAlign=middle;html=1;fillColor=none;strokeColor=none;fontSize=15;fontColor=#10739E;align=center;fontStyle=1;');
			   	label1.vertex = true;
			   	var part1 = new mxCell('65%', new mxGeometry(0, 30, 100, 100), 'verticalLabelPosition=middle;verticalAlign=middle;html=1;whiteSpace=wrap;shape=mxgraph.infographic.partConcEllipse;startAngle=0;endAngle=0.65;arcWidth=0.4;strokeColor=none;fillColor=#10739E;fontSize=22;fontColor=#10739E;align=center;fontStyle=1;');
			   	part1.vertex = true;
			   	var text1 = new mxCell(
			   			'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 
			   			new mxGeometry(0, 140, 100, 120), 
			   			'verticalLabelPosition=middle;verticalAlign=middle;html=1;fillColor=#EEEEEE;strokeColor=none;fontSize=10;align=left;fontStyle=0;rounded=1;whiteSpace=wrap;arcSize=8;spacing=5;');
			   	text1.vertex = true;
			   	
			   	var label2 = new mxCell('Label', new mxGeometry(110, 0, 100, 30), 'verticalLabelPosition=middle;verticalAlign=middle;html=1;fillColor=none;strokeColor=none;fontSize=15;fontColor=#F2931E;align=center;fontStyle=1;');
			   	label2.vertex = true;
			   	var part2 = new mxCell('40%', new mxGeometry(110, 30, 100, 100), 'verticalLabelPosition=middle;verticalAlign=middle;html=1;whiteSpace=wrap;shape=mxgraph.infographic.partConcEllipse;startAngle=0;endAngle=0.4;arcWidth=0.4;strokeColor=none;fillColor=#F2931E;fontSize=22;fontColor=#F2931E;align=center;fontStyle=1;');
			   	part2.vertex = true;
			   	var text2 = new mxCell(
			   			'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 
			   			new mxGeometry(110, 140, 100, 120), 
			   			'verticalLabelPosition=middle;verticalAlign=middle;html=1;fillColor=#EEEEEE;strokeColor=none;fontSize=10;align=left;fontStyle=0;rounded=1;whiteSpace=wrap;arcSize=8;spacing=5;');
			   	text2.vertex = true;
			   	
			   	var label3 = new mxCell('Label', new mxGeometry(220, 0, 100, 30), 'verticalLabelPosition=middle;verticalAlign=middle;html=1;fillColor=none;strokeColor=none;fontSize=15;fontColor=#AE4132;align=center;fontStyle=1;');
			   	label3.vertex = true;
			   	var part3 = new mxCell('25%', new mxGeometry(220, 30, 100, 100), 'verticalLabelPosition=middle;verticalAlign=middle;html=1;whiteSpace=wrap;shape=mxgraph.infographic.partConcEllipse;startAngle=0;endAngle=0.25;arcWidth=0.4;strokeColor=none;fillColor=#AE4132;fontSize=22;fontColor=#AE4132;align=center;fontStyle=1;');
			   	part3.vertex = true;
			   	var text3 = new mxCell(
			   			'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 
			   			new mxGeometry(220, 140, 100, 120), 
			   			'verticalLabelPosition=middle;verticalAlign=middle;html=1;fillColor=#EEEEEE;strokeColor=none;fontSize=10;align=left;fontStyle=0;rounded=1;whiteSpace=wrap;arcSize=8;spacing=5;');
			   	text3.vertex = true;
			   	
			   	var label4 = new mxCell('Label', new mxGeometry(330, 0, 100, 30), 'verticalLabelPosition=middle;verticalAlign=middle;html=1;fillColor=none;strokeColor=none;fontSize=15;fontColor=#23445D;align=center;fontStyle=1;');
			   	label4.vertex = true;
			   	var part4 = new mxCell('60%', new mxGeometry(330, 30, 100, 100), 'verticalLabelPosition=middle;verticalAlign=middle;html=1;whiteSpace=wrap;shape=mxgraph.infographic.partConcEllipse;startAngle=0;endAngle=0.6;arcWidth=0.4;strokeColor=none;fillColor=#23445D;fontSize=22;fontColor=#23445D;align=center;fontStyle=1;');
			   	part4.vertex = true;
			   	var text4 = new mxCell(
			   			'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 
			   			new mxGeometry(330, 140, 100, 120), 
			   			'verticalLabelPosition=middle;verticalAlign=middle;html=1;fillColor=#EEEEEE;strokeColor=none;fontSize=10;align=left;fontStyle=0;rounded=1;whiteSpace=wrap;arcSize=8;spacing=5;');
			   	text4.vertex = true;
			   	
			   	var label5 = new mxCell('Label', new mxGeometry(440, 0, 100, 30), 'verticalLabelPosition=middle;verticalAlign=middle;html=1;fillColor=none;strokeColor=none;fontSize=15;fontColor=#12AAB5;align=center;fontStyle=1;');
			   	label5.vertex = true;
			   	var part5 = new mxCell('80%', new mxGeometry(440, 30, 100, 100), 'verticalLabelPosition=middle;verticalAlign=middle;html=1;whiteSpace=wrap;shape=mxgraph.infographic.partConcEllipse;startAngle=0;endAngle=0.8;arcWidth=0.4;strokeColor=none;fillColor=#12AAB5;fontSize=22;fontColor=#12AAB5;align=center;fontStyle=1;');
			   	part5.vertex = true;
			   	var text5 = new mxCell(
			   			'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 
			   			new mxGeometry(440, 140, 100, 120), 
			   			'verticalLabelPosition=middle;verticalAlign=middle;html=1;fillColor=#EEEEEE;strokeColor=none;fontSize=10;align=left;fontStyle=0;rounded=1;whiteSpace=wrap;arcSize=8;spacing=5;');
			   	text5.vertex = true;
			   	
			   	return sb.createVertexTemplateFromCells([part1, part2, part3, part4, part5, label1, label2, label3, label4, label5, text1, text2, text3, text4, text5], 540, 260, 'Circular Dial List (horizontal)');
			}),				

			this.addEntry(dt + 'circular dial list vertical', function()
			{
			   	var part1 = new mxCell('65%', new mxGeometry(0, 0, 100, 100), 'verticalLabelPosition=middle;verticalAlign=middle;html=1;whiteSpace=wrap;shape=mxgraph.infographic.partConcEllipse;startAngle=0;endAngle=0.65;arcWidth=0.4;strokeColor=none;fillColor=#10739E;fontSize=22;fontColor=#10739E;align=center;fontStyle=1;');
			   	part1.vertex = true;
			   	var label1 = new mxCell('<font style="font-size: 10px"><font style="font-size: 12px" color="#10739E"><b>Label</b></font><br><br><font size="1">' + 
			   			'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</font></font>', 
			   			new mxGeometry(110, 0, 210, 100), 'rounded=1;strokeColor=none;fillColor=#EEEEEE;align=left;arcSize=12;verticalAlign=top;whiteSpace=wrap;html=1;fontSize=12;spacing=8;');
			   	label1.vertex = true;

			   	var part2 = new mxCell('40%', new mxGeometry(0, 110, 100, 100), 'verticalLabelPosition=middle;verticalAlign=middle;html=1;whiteSpace=wrap;shape=mxgraph.infographic.partConcEllipse;startAngle=0;endAngle=0.4;arcWidth=0.4;strokeColor=none;fillColor=#F2931E;fontSize=22;fontColor=#F2931E;align=center;fontStyle=1;');
			   	part2.vertex = true;
			   	var label2 = new mxCell('<font style="font-size: 10px"><font style="font-size: 12px" color="#F2931E"><b>Label</b></font><br><br><font size="1">' + 
			   			'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</font></font>', 
			   			new mxGeometry(110, 110, 210, 100), 'rounded=1;strokeColor=none;fillColor=#EEEEEE;align=left;arcSize=12;verticalAlign=top;whiteSpace=wrap;html=1;fontSize=12;spacing=8;');
			   	label2.vertex = true;
			   	
			   	var part3 = new mxCell('25%', new mxGeometry(0, 220, 100, 100), 'verticalLabelPosition=middle;verticalAlign=middle;html=1;whiteSpace=wrap;shape=mxgraph.infographic.partConcEllipse;startAngle=0;endAngle=0.25;arcWidth=0.4;strokeColor=none;fillColor=#AE4132;fontSize=22;fontColor=#AE4132;align=center;fontStyle=1;');
			   	part3.vertex = true;
			   	var label3 = new mxCell('<font style="font-size: 10px"><font style="font-size: 12px" color="#AE4132"><b>Label</b></font><br><br><font size="1">' + 
			   			'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</font></font>', 
			   			new mxGeometry(110, 220, 210, 100), 'rounded=1;strokeColor=none;fillColor=#EEEEEE;align=left;arcSize=12;verticalAlign=top;whiteSpace=wrap;html=1;fontSize=12;spacing=8;');
			   	label3.vertex = true;
			   	
			   	var part4 = new mxCell('60%', new mxGeometry(0, 330, 100, 100), 'verticalLabelPosition=middle;verticalAlign=middle;html=1;whiteSpace=wrap;shape=mxgraph.infographic.partConcEllipse;startAngle=0;endAngle=0.6;arcWidth=0.4;strokeColor=none;fillColor=#23445D;fontSize=22;fontColor=#23445D;align=center;fontStyle=1;');
			   	part4.vertex = true;
			   	var label4 = new mxCell('<font style="font-size: 10px"><font style="font-size: 12px" color="#23445D"><b>Label</b></font><br><br><font size="1">' + 
			   			'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</font></font>', 
			   			new mxGeometry(110, 330, 210, 100), 'rounded=1;strokeColor=none;fillColor=#EEEEEE;align=left;arcSize=12;verticalAlign=top;whiteSpace=wrap;html=1;fontSize=12;spacing=8;');
			   	label4.vertex = true;
			   	
			   	var part5 = new mxCell('80%', new mxGeometry(0, 440, 100, 100), 'verticalLabelPosition=middle;verticalAlign=middle;html=1;whiteSpace=wrap;shape=mxgraph.infographic.partConcEllipse;startAngle=0;endAngle=0.8;arcWidth=0.4;strokeColor=none;fillColor=#12AAB5;fontSize=22;fontColor=#12AAB5;align=center;fontStyle=1;');
			   	part5.vertex = true;
			   	var label5 = new mxCell('<font style="font-size: 10px"><font style="font-size: 12px" color="#12AAB5"><b>Label</b></font><br><br><font size="1">' + 
			   			'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</font></font>', 
			   			new mxGeometry(110, 440, 210, 100), 'rounded=1;strokeColor=none;fillColor=#EEEEEE;align=left;arcSize=12;verticalAlign=top;whiteSpace=wrap;html=1;fontSize=12;spacing=8;');
			   	label5.vertex = true;
			   	
			   	return sb.createVertexTemplateFromCells([part1, part2, part3, part4, part5, label1, label2, label3, label4, label5], 320, 540, 'Circular Dial List (vertical)');
			}),				


			this.addEntry(dt + 'bar graph', function()
			{
			   	var part1 = new mxCell('Label', new mxGeometry(0, 20, 40, 80), s2 + 'shadedCube;isoAngle=15;fillColor=#10739E;strokeColor=none;fontStyle=1;fontColor=#10739E;fontSize=12;shadow=0;');
			   	part1.vertex = true;
			   	
			   	var part2 = new mxCell('Label', new mxGeometry(50, 0, 40, 100), s2 + 'shadedCube;isoAngle=15;fillColor=#F2931E;strokeColor=none;fontStyle=1;fontColor=#F2931E;fontSize=12;shadow=0;');
			   	part2.vertex = true;
			   	
			   	var part3 = new mxCell('Label', new mxGeometry(100, 10, 40, 90), s2 + 'shadedCube;isoAngle=15;fillColor=#AE4132;strokeColor=none;fontStyle=1;fontColor=#AE4132;fontSize=12;shadow=0;');
			   	part3.vertex = true;
			   	
			   	var part4 = new mxCell('Label', new mxGeometry(150, 50, 40, 50), s2 + 'shadedCube;isoAngle=15;fillColor=#23445D;strokeColor=none;fontStyle=1;fontColor=#23445D;fontSize=12;shadow=0;');
			   	part4.vertex = true;
			   	
			   	var part5 = new mxCell('Label', new mxGeometry(200, 30, 40, 70), s2 + 'shadedCube;isoAngle=15;fillColor=#12AAB5;strokeColor=none;fontStyle=1;fontColor=#12AAB5;fontSize=12;shadow=0;');
			   	part5.vertex = true;
			   	
			   	return sb.createVertexTemplateFromCells([part1, part2, part3, part4, part5], 240, 100, 'Bar Graph');
			}),				
			
			this.addEntry(dt + 'bar graph', function()
			{
			   	var part1 = new mxCell('Label', new mxGeometry(0, 40, 40, 80), s2 + 'shadedCube;isoAngle=15;fillColor=#10739E;strokeColor=none;fontStyle=1;fontColor=#10739E;fontSize=12;shadow=0;');
			   	part1.vertex = true;
			   	var bg1 = new mxCell('', new mxGeometry(0, 0, 40, 60), 'verticalLabelPosition=top;verticalAlign=bottom;html=1;shape=mxgraph.infographic.shadedCube;isoAngle=15;fillColor=#CCCCCC;strokeColor=none;fontStyle=1;fontColor=#10739E;fontSize=12;shadow=0;align=left;opacity=70;');
			   	bg1.vertex = true;
			   	
			   	var part2 = new mxCell('Label', new mxGeometry(50, 20, 40, 100), s2 + 'shadedCube;isoAngle=15;fillColor=#F2931E;strokeColor=none;fontStyle=1;fontColor=#F2931E;fontSize=12;shadow=0;');
			   	part2.vertex = true;
			   	var bg2 = new mxCell('', new mxGeometry(50, 0, 40, 40), 'verticalLabelPosition=top;verticalAlign=bottom;html=1;shape=mxgraph.infographic.shadedCube;isoAngle=15;fillColor=#CCCCCC;strokeColor=none;fontStyle=1;fontColor=#F19A19;fontSize=12;shadow=0;align=left;opacity=70;');
			   	bg2.vertex = true;
			   	
			   	var part3 = new mxCell('Label', new mxGeometry(100, 30, 40, 90), s2 + 'shadedCube;isoAngle=15;fillColor=#AE4132;strokeColor=none;fontStyle=1;fontColor=#AE4132;fontSize=12;shadow=0;');
			   	part3.vertex = true;
			   	var bg3 = new mxCell('', new mxGeometry(100, 0, 40, 50), 'verticalLabelPosition=top;verticalAlign=bottom;html=1;shape=mxgraph.infographic.shadedCube;isoAngle=15;fillColor=#CCCCCC;strokeColor=none;fontStyle=1;fontColor=#D82A23;fontSize=12;shadow=0;align=left;opacity=70;');
			   	bg3.vertex = true;
			   	
			   	var part4 = new mxCell('Label', new mxGeometry(150, 70, 40, 50), s2 + 'shadedCube;isoAngle=15;fillColor=#23445D;strokeColor=none;fontStyle=1;fontColor=#23445D;fontSize=12;shadow=0;');
			   	part4.vertex = true;
			   	var bg4 = new mxCell('', new mxGeometry(150, 0, 40, 90), 'verticalLabelPosition=top;verticalAlign=bottom;html=1;shape=mxgraph.infographic.shadedCube;isoAngle=15;fillColor=#CCCCCC;strokeColor=none;fontStyle=1;fontColor=#4A5768;fontSize=12;shadow=0;align=left;opacity=70;');
			   	bg4.vertex = true;
			   	
			   	var part5 = new mxCell('Label', new mxGeometry(200, 50, 40, 70), s2 + 'shadedCube;isoAngle=15;fillColor=#12AAB5;strokeColor=none;fontStyle=1;fontColor=#12AAB5;fontSize=12;shadow=0;');
			   	part5.vertex = true;
			   	var bg5 = new mxCell('', new mxGeometry(200, 0, 40, 70), 'verticalLabelPosition=top;verticalAlign=bottom;html=1;shape=mxgraph.infographic.shadedCube;isoAngle=15;fillColor=#CCCCCC;strokeColor=none;fontStyle=1;fontColor=#15AA96;fontSize=12;shadow=0;align=left;opacity=70;');
			   	bg5.vertex = true;
			   	
			   	return sb.createVertexTemplateFromCells([part1, part2, part3, part4, part5, bg1, bg2, bg3, bg4, bg5], 240, 120, 'Bar Graph');
			}),				
			
			this.addEntry(dt + 'bar graph', function()
			{
			   	var part1 = new mxCell('', new mxGeometry(0, 38, 40, 80), s2 + 'shadedCube;isoAngle=15;fillColor=#10739E;strokeColor=none;shadow=0;');
			   	part1.vertex = true;
			   	
			   	var part2 = new mxCell('', new mxGeometry(25, 6, 40, 100), s2 + 'shadedCube;isoAngle=15;fillColor=#F2931E;strokeColor=none;shadow=0;');
			   	part2.vertex = true;
			   	
			   	var part3 = new mxCell('', new mxGeometry(50, 4, 40, 90), s2 + 'shadedCube;isoAngle=15;fillColor=#AE4132;strokeColor=none;shadow=0;');
			   	part3.vertex = true;
			   	
			   	var part4 = new mxCell('', new mxGeometry(75, 32, 40, 50), s2 + 'shadedCube;isoAngle=15;fillColor=#23445D;strokeColor=none;shadow=0;');
			   	part4.vertex = true;
			   	
			   	var part5 = new mxCell('', new mxGeometry(100, 0, 40, 70), s2 + 'shadedCube;isoAngle=15;fillColor=#12AAB5;strokeColor=none;shadow=0;');
			   	part5.vertex = true;
			   	
			   	return sb.createVertexTemplateFromCells([part5, part4, part3, part2, part1], 140, 100, 'Bar Graph');
			}),				
			
			this.addEntry(dt + 'bar graph', function()
			{
			   	var part1 = new mxCell('Label', new mxGeometry(0, 40, 40, 80), s2 + 'cylinder;isoAngle=15;fillColor=#10739E;strokeColor=none;fontStyle=1;fontColor=#10739E;fontSize=12;shadow=0;');
			   	part1.vertex = true;
			   	var bg1 = new mxCell('', new mxGeometry(0, 0, 40, 60), 'verticalLabelPosition=top;verticalAlign=bottom;html=1;shape=mxgraph.infographic.cylinder;isoAngle=15;fillColor=#CCCCCC;strokeColor=none;fontStyle=1;fontColor=#10739E;fontSize=12;shadow=0;align=left;opacity=70;');
			   	bg1.vertex = true;
			   	
			   	var part2 = new mxCell('Label', new mxGeometry(50, 20, 40, 100), s2 + 'cylinder;isoAngle=15;fillColor=#F2931E;strokeColor=none;fontStyle=1;fontColor=#F2931E;fontSize=12;shadow=0;');
			   	part2.vertex = true;
			   	var bg2 = new mxCell('', new mxGeometry(50, 0, 40, 40), 'verticalLabelPosition=top;verticalAlign=bottom;html=1;shape=mxgraph.infographic.cylinder;isoAngle=15;fillColor=#CCCCCC;strokeColor=none;fontStyle=1;fontColor=#F2931E;fontSize=12;shadow=0;align=left;opacity=70;');
			   	bg2.vertex = true;
			   	
			   	var part3 = new mxCell('Label', new mxGeometry(100, 30, 40, 90), s2 + 'cylinder;isoAngle=15;fillColor=#AE4132;strokeColor=none;fontStyle=1;fontColor=#AE4132;fontSize=12;shadow=0;');
			   	part3.vertex = true;
			   	var bg3 = new mxCell('', new mxGeometry(100, 0, 40, 50), 'verticalLabelPosition=top;verticalAlign=bottom;html=1;shape=mxgraph.infographic.cylinder;isoAngle=15;fillColor=#CCCCCC;strokeColor=none;fontStyle=1;fontColor=#AE4132;fontSize=12;shadow=0;align=left;opacity=70;');
			   	bg3.vertex = true;
			   	
			   	var part4 = new mxCell('Label', new mxGeometry(150, 70, 40, 50), s2 + 'cylinder;isoAngle=15;fillColor=#23445D;strokeColor=none;fontStyle=1;fontColor=#23445D;fontSize=12;shadow=0;');
			   	part4.vertex = true;
			   	var bg4 = new mxCell('', new mxGeometry(150, 0, 40, 90), 'verticalLabelPosition=top;verticalAlign=bottom;html=1;shape=mxgraph.infographic.cylinder;isoAngle=15;fillColor=#CCCCCC;strokeColor=none;fontStyle=1;fontColor=#23445D;fontSize=12;shadow=0;align=left;opacity=70;');
			   	bg4.vertex = true;
			   	
			   	var part5 = new mxCell('Label', new mxGeometry(200, 50, 40, 70), s2 + 'cylinder;isoAngle=15;fillColor=#12AAB5;strokeColor=none;fontStyle=1;fontColor=#12AAB5;fontSize=12;shadow=0;');
			   	part5.vertex = true;
			   	var bg5 = new mxCell('', new mxGeometry(200, 0, 40, 70), 'verticalLabelPosition=top;verticalAlign=bottom;html=1;shape=mxgraph.infographic.cylinder;isoAngle=15;fillColor=#CCCCCC;strokeColor=none;fontStyle=1;fontColor=#12AAB5;fontSize=12;shadow=0;align=left;opacity=70;');
			   	bg5.vertex = true;
			   	
			   	return sb.createVertexTemplateFromCells([part1, part2, part3, part4, part5, bg1, bg2, bg3, bg4, bg5], 240, 120, 'Bar Graph');
			}),				
			
			this.addEntry(dt + 'folded banners', function()
			{
			   	var part1 = new mxCell('Label', new mxGeometry(0, 0, 200, 100), 
			   		'html=1;shape=mxgraph.infographic.bannerHalfFold;dx=40;dx2=20;notch=15;fillColor=#10739E;strokeColor=none;align=left;verticalAlign=top;fontColor=#ffffff;fontSize=14;fontStyle=1;spacingLeft=25;spacingTop=5;');
			   	part1.vertex = true;
	   	
			   	var part2 = new mxCell('Label', new mxGeometry(0, 60, 200, 100), 
			   		'html=1;shape=mxgraph.infographic.bannerHalfFold;dx=40;dx2=20;notch=15;fillColor=#F2931E;strokeColor=none;align=left;verticalAlign=top;fontColor=#ffffff;fontSize=14;fontStyle=1;spacingLeft=25;spacingTop=5;');
			   	part2.vertex = true;
	
			   	var part3 = new mxCell('Label', new mxGeometry(0, 120, 200, 100), 
					'html=1;shape=mxgraph.infographic.bannerHalfFold;dx=40;dx2=20;notch=15;fillColor=#AE4132;strokeColor=none;align=left;verticalAlign=top;fontColor=#ffffff;fontSize=14;fontStyle=1;spacingLeft=25;spacingTop=5;');
				part3.vertex = true;

				var part4 = new mxCell('Label', new mxGeometry(0, 180, 200, 100), 
					'html=1;shape=mxgraph.infographic.bannerHalfFold;dx=40;dx2=20;notch=15;fillColor=#23445D;strokeColor=none;align=left;verticalAlign=top;fontColor=#ffffff;fontSize=14;fontStyle=1;spacingLeft=25;spacingTop=5;');
				part4.vertex = true;

				var part5 = new mxCell('Label', new mxGeometry(0, 240, 200, 120), 
					'html=1;shape=mxgraph.infographic.bannerHalfFold;dx=40;dx2=20;notch=15;fillColor=#12AAB5;strokeColor=none;align=left;verticalAlign=top;fontColor=#ffffff;fontSize=14;fontStyle=1;spacingLeft=25;spacingTop=5;');
				part5.vertex = true;
			   	
			   	return sb.createVertexTemplateFromCells([part1, part2, part3, part4, part5], 200, 360, 'Folded Banners');
			}),				
					
			this.addEntry(dt + 'cylinder graph', function()
			{
			   	var part1 = new mxCell('Label', new mxGeometry(0, 0, 100, 85), 'verticalLabelPosition=middle;verticalAlign=middle;html=1;shape=mxgraph.infographic.cylinder;fillColor=#10739E;strokeColor=none;shadow=0;align=left;labelPosition=right;spacingLeft=10;fontStyle=1;fontColor=#10739E;');
			   	part1.vertex = true;
			   	
			   	var part2 = new mxCell('Label', new mxGeometry(0, 75, 100, 55), 'verticalLabelPosition=middle;verticalAlign=middle;html=1;shape=mxgraph.infographic.cylinder;fillColor=#F2931E;strokeColor=none;shadow=0;align=left;labelPosition=right;spacingLeft=10;fontStyle=1;fontColor=#F2931E;');
			   	part2.vertex = true;
			   	
			   	var part3 = new mxCell('Label', new mxGeometry(0, 120, 100, 110), 'verticalLabelPosition=middle;verticalAlign=middle;html=1;shape=mxgraph.infographic.cylinder;fillColor=#AE4132;strokeColor=none;shadow=0;align=left;labelPosition=right;spacingLeft=10;fontStyle=1;fontColor=#AE4132;');
			   	part3.vertex = true;
			   	
			   	var part4 = new mxCell('Label', new mxGeometry(0, 220, 100, 150), 'verticalLabelPosition=middle;verticalAlign=middle;html=1;shape=mxgraph.infographic.cylinder;fillColor=#23445D;strokeColor=none;shadow=0;align=left;labelPosition=right;spacingLeft=10;fontStyle=1;fontColor=#23445D;');
			   	part4.vertex = true;
			   	
			   	var part5 = new mxCell('Label', new mxGeometry(0, 360, 100, 90), 'verticalLabelPosition=middle;verticalAlign=middle;html=1;shape=mxgraph.infographic.cylinder;fillColor=#12AAB5;strokeColor=none;shadow=0;align=left;labelPosition=right;spacingLeft=10;fontStyle=1;fontColor=#12AAB5;');
			   	part5.vertex = true;
			   	
			   	return sb.createVertexTemplateFromCells([part5, part4, part3, part2, part1], 100, 460, 'Cylinder Graph');
			}),				
			
			this.addEntry(dt + 'cylinder graph', function()
			{
			   	var part1 = new mxCell('Label', new mxGeometry(0, 0, 100, 85), 'verticalLabelPosition=middle;verticalAlign=middle;html=1;shape=mxgraph.infographic.cylinder;fillColor=#10739E;strokeColor=none;shadow=0;align=left;labelPosition=right;spacingLeft=10;fontStyle=1;fontColor=#10739E;');
			   	part1.vertex = true;
			   	
			   	var part2 = new mxCell('Label', new mxGeometry(0, 65, 100, 55), 'verticalLabelPosition=middle;verticalAlign=middle;html=1;shape=mxgraph.infographic.cylinder;fillColor=#F2931E;strokeColor=none;shadow=0;align=left;labelPosition=right;spacingLeft=10;fontStyle=1;fontColor=#F2931E;');
			   	part2.vertex = true;
			   	
			   	var part3 = new mxCell('Label', new mxGeometry(0, 100, 100, 110), 'verticalLabelPosition=middle;verticalAlign=middle;html=1;shape=mxgraph.infographic.cylinder;fillColor=#AE4132;strokeColor=none;shadow=0;align=left;labelPosition=right;spacingLeft=10;fontStyle=1;fontColor=#AE4132;');
			   	part3.vertex = true;
			   	
			   	var part4 = new mxCell('Label', new mxGeometry(0, 190, 100, 150), 'verticalLabelPosition=middle;verticalAlign=middle;html=1;shape=mxgraph.infographic.cylinder;fillColor=#23445D;strokeColor=none;shadow=0;align=left;labelPosition=right;spacingLeft=10;fontStyle=1;fontColor=#23445D;');
			   	part4.vertex = true;
			   	
			   	var part5 = new mxCell('Label', new mxGeometry(0, 320, 100, 90), 'verticalLabelPosition=middle;verticalAlign=middle;html=1;shape=mxgraph.infographic.cylinder;fillColor=#12AAB5;strokeColor=none;shadow=0;align=left;labelPosition=right;spacingLeft=10;fontStyle=1;fontColor=#12AAB5;');
			   	part5.vertex = true;
			   	
			   	return sb.createVertexTemplateFromCells([part5, part4, part3, part2, part1], 100, 410, 'Cylinder Graph');
			}),				
			
			this.addEntry(dt + 'ribbon list', function()
			{
			   	var ribbon1 = new mxCell('', new mxGeometry(0, 0, 500, 100), 'html=1;shape=mxgraph.infographic.ribbonSimple;notch1=20;notch2=0;fillColor=#10739E;strokeColor=none;shadow=1;');
			   	ribbon1.vertex = true;
			   	var item1 = new mxCell('Label', new mxGeometry(410, 50, 100, 60), 'shape=manualInput;whiteSpace=wrap;html=1;shadow=1;strokeColor=none;fillColor=#dddddd;fontSize=15;fontColor=#444444;align=right;direction=south;flipH=1;shadow=1;spacing=10;fontStyle=1;');
			   	item1.vertex = true;
			   	var chevron1 = new mxCell('', new mxGeometry(0, 0.5, 30, 40), 'shape=step;perimeter=stepPerimeter;whiteSpace=wrap;html=1;fixedSize=1;shadow=0;strokeColor=none;strokeWidth=6;fillColor=#CCCCCC;size=20;');
			   	chevron1.vertex = true;
			   	chevron1.geometry.relative = true;
			   	chevron1.geometry.offset = new mxPoint(150, -20);
			   	ribbon1.insert(chevron1);
			   	var text1 = new mxCell(
			   			'<b>Heading</b><br><font style="font-size: 11px">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</font>', 
			   			new mxGeometry(0, 0, 230, 100), 'text;strokeColor=none;fillColor=none;spacing=5;spacingTop=0;whiteSpace=wrap;overflow=hidden;rounded=0;shadow=0;fontSize=15;fontColor=#FFFFFF;align=left;html=1;');
			   	text1.vertex = true;
			   	text1.geometry.relative = true;
			   	text1.geometry.offset = new mxPoint(200, 0);
			   	ribbon1.insert(text1);
			   	var icon1 = new mxCell('', new mxGeometry(50, 32, 50, 37), 'shadow=0;dashed=0;html=1;strokeColor=none;shape=mxgraph.mscae.intune.user_group;fontSize=15;fontColor=#FFFFFF;align=left;');
			   	icon1.vertex = true;
			   	
			   	var ribbon2 = new mxCell('', new mxGeometry(0, 120, 500, 100), 'html=1;shape=mxgraph.infographic.ribbonSimple;notch1=20;notch2=0;fillColor=#F2931E;strokeColor=none;shadow=1;');
			   	ribbon2.vertex = true;
			   	var item2 = new mxCell('Label', new mxGeometry(410, 170, 100, 60), 'shape=manualInput;whiteSpace=wrap;html=1;shadow=1;strokeColor=none;fillColor=#dddddd;fontSize=15;fontColor=#444444;align=right;direction=south;flipH=1;shadow=1;spacing=10;fontStyle=1;');
			   	item2.vertex = true;
			   	var chevron2 = new mxCell('', new mxGeometry(0, 0.5, 30, 40), 'shape=step;perimeter=stepPerimeter;whiteSpace=wrap;html=1;fixedSize=1;shadow=0;strokeColor=none;strokeWidth=6;fillColor=#CCCCCC;size=20;');
			   	chevron2.vertex = true;
			   	chevron2.geometry.relative = true;
			   	chevron2.geometry.offset = new mxPoint(150, -20);
			   	ribbon2.insert(chevron2);
			   	var text2 = new mxCell(
			   			'<b>Heading</b><br><font style="font-size: 11px">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</font>', 
			   			new mxGeometry(0, 0, 230, 100), 'text;strokeColor=none;fillColor=none;spacing=5;spacingTop=0;whiteSpace=wrap;overflow=hidden;rounded=0;shadow=0;fontSize=15;fontColor=#FFFFFF;align=left;html=1;');
			   	text2.vertex = true;
			   	text2.geometry.relative = true;
			   	text2.geometry.offset = new mxPoint(200, 0);
			   	ribbon2.insert(text2);
			   	var icon2 = new mxCell('', new mxGeometry(50, 152, 50, 37), 'shadow=0;dashed=0;html=1;strokeColor=none;shape=mxgraph.mscae.intune.user_group;fontSize=15;fontColor=#FFFFFF;align=left;');
			   	icon2.vertex = true;
			   	
			   	var ribbon3 = new mxCell('', new mxGeometry(0, 240, 500, 100), 'html=1;shape=mxgraph.infographic.ribbonSimple;notch1=20;notch2=0;fillColor=#AE4132;strokeColor=none;shadow=1;');
			   	ribbon3.vertex = true;
			   	var item3 = new mxCell('Label', new mxGeometry(410, 290, 100, 60), 'shape=manualInput;whiteSpace=wrap;html=1;shadow=1;strokeColor=none;fillColor=#dddddd;fontSize=15;fontColor=#444444;align=right;direction=south;flipH=1;shadow=1;spacing=10;fontStyle=1;');
			   	item3.vertex = true;
			   	var chevron3 = new mxCell('', new mxGeometry(0, 0.5, 30, 40), 'shape=step;perimeter=stepPerimeter;whiteSpace=wrap;html=1;fixedSize=1;shadow=0;strokeColor=none;strokeWidth=6;fillColor=#CCCCCC;size=20;');
			   	chevron3.vertex = true;
			   	chevron3.geometry.relative = true;
			   	chevron3.geometry.offset = new mxPoint(150, -20);
			   	ribbon3.insert(chevron3);
			   	var text3 = new mxCell(
			   			'<b>Heading</b><br><font style="font-size: 11px">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</font>', 
			   			new mxGeometry(0, 0, 230, 100), 'text;strokeColor=none;fillColor=none;spacing=5;spacingTop=0;whiteSpace=wrap;overflow=hidden;rounded=0;shadow=0;fontSize=15;fontColor=#FFFFFF;align=left;html=1;');
			   	text3.vertex = true;
			   	text3.geometry.relative = true;
			   	text3.geometry.offset = new mxPoint(200, 0);
			   	ribbon3.insert(text3);
			   	var icon3 = new mxCell('', new mxGeometry(50, 272, 50, 37), 'shadow=0;dashed=0;html=1;strokeColor=none;shape=mxgraph.mscae.intune.user_group;fontSize=15;fontColor=#FFFFFF;align=left;');
			   	icon3.vertex = true;
			   	
			   	var ribbon4 = new mxCell('', new mxGeometry(0, 360, 500, 100), 'html=1;shape=mxgraph.infographic.ribbonSimple;notch1=20;notch2=0;fillColor=#23445D;strokeColor=none;shadow=1;');
			   	ribbon4.vertex = true;
			   	var item4 = new mxCell('Label', new mxGeometry(410, 410, 100, 60), 'shape=manualInput;whiteSpace=wrap;html=1;shadow=1;strokeColor=none;fillColor=#dddddd;fontSize=15;fontColor=#444444;align=right;direction=south;flipH=1;shadow=1;spacing=10;fontStyle=1;');
			   	item4.vertex = true;
			   	var chevron4 = new mxCell('', new mxGeometry(0, 0.5, 30, 40), 'shape=step;perimeter=stepPerimeter;whiteSpace=wrap;html=1;fixedSize=1;shadow=0;strokeColor=none;strokeWidth=6;fillColor=#CCCCCC;size=20;');
			   	chevron4.vertex = true;
			   	chevron4.geometry.relative = true;
			   	chevron4.geometry.offset = new mxPoint(150, -20);
			   	ribbon4.insert(chevron4);
			   	var text4 = new mxCell(
			   			'<b>Heading</b><br><font style="font-size: 11px">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</font>', 
			   			new mxGeometry(0, 0, 230, 100), 'text;strokeColor=none;fillColor=none;spacing=5;spacingTop=0;whiteSpace=wrap;overflow=hidden;rounded=0;shadow=0;fontSize=15;fontColor=#FFFFFF;align=left;html=1;');
			   	text4.vertex = true;
			   	text4.geometry.relative = true;
			   	text4.geometry.offset = new mxPoint(200, 0);
			   	ribbon4.insert(text4);
			   	var icon4 = new mxCell('', new mxGeometry(50, 392, 50, 37), 'shadow=0;dashed=0;html=1;strokeColor=none;shape=mxgraph.mscae.intune.user_group;fontSize=15;fontColor=#FFFFFF;align=left;');
			   	icon4.vertex = true;
			   	
			   	var ribbon5 = new mxCell('', new mxGeometry(0, 480, 500, 100), 'html=1;shape=mxgraph.infographic.ribbonSimple;notch1=20;notch2=0;fillColor=#12AAB5;strokeColor=none;shadow=1;');
			   	ribbon5.vertex = true;
			   	var item5 = new mxCell('Label', new mxGeometry(410, 530, 100, 60), 'shape=manualInput;whiteSpace=wrap;html=1;shadow=1;strokeColor=none;fillColor=#dddddd;fontSize=15;fontColor=#444444;align=right;direction=south;flipH=1;shadow=1;spacing=10;fontStyle=1;');
			   	item5.vertex = true;
			   	var chevron5 = new mxCell('', new mxGeometry(0, 0.5, 30, 40), 'shape=step;perimeter=stepPerimeter;whiteSpace=wrap;html=1;fixedSize=1;shadow=0;strokeColor=none;strokeWidth=6;fillColor=#CCCCCC;size=20;');
			   	chevron5.vertex = true;
			   	chevron5.geometry.relative = true;
			   	chevron5.geometry.offset = new mxPoint(150, -20);
			   	ribbon5.insert(chevron5);
			   	var text5 = new mxCell(
			   			'<b>Heading</b><br><font style="font-size: 11px">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</font>', 
			   			new mxGeometry(0, 0, 230, 100), 'text;strokeColor=none;fillColor=none;spacing=5;spacingTop=0;whiteSpace=wrap;overflow=hidden;rounded=0;shadow=0;fontSize=15;fontColor=#FFFFFF;align=left;html=1;');
			   	text5.vertex = true;
			   	text5.geometry.relative = true;
			   	text5.geometry.offset = new mxPoint(200, 0);
			   	ribbon5.insert(text5);
			   	var icon5 = new mxCell('', new mxGeometry(50, 512, 50, 37), 'shadow=0;dashed=0;html=1;strokeColor=none;shape=mxgraph.mscae.intune.user_group;fontSize=15;fontColor=#FFFFFF;align=left;');
			   	icon5.vertex = true;
			   	
			   	return sb.createVertexTemplateFromCells([ribbon1, item1, icon1, ribbon2, item2, icon2, ribbon3, item3, icon3, ribbon4, item4, icon4, ribbon5, item5, icon5], 550, 590, 'Ribbon List');
			}),				
			
			this.addEntry(dt + 'bar graph', function()
			{
			   	var part1 = new mxCell('Label', new mxGeometry(0, 0, 120, 70), 'html=1;whiteSpace=wrap;shape=mxgraph.infographic.barCallout;dx=60;dy=30;fillColor=#10739E;strokeColor=none;align=center;verticalAlign=top;fontColor=#ffffff;fontSize=14;fontStyle=1;shadow=0;spacingTop=5;');
			   	part1.vertex = true;
			   	var dial1 = new mxCell('12', new mxGeometry(40, 75, 40, 40), 'ellipse;whiteSpace=wrap;html=1;aspect=fixed;shadow=0;strokeColor=#10739E;strokeWidth=6;fontSize=16;align=center;fontStyle=1');
			   	dial1.vertex = true;
			   	
			   	var part2 = new mxCell('Label', new mxGeometry(120, 0, 160, 70), 'html=1;whiteSpace=wrap;shape=mxgraph.infographic.barCallout;dx=80;dy=30;fillColor=#F2931E;strokeColor=none;align=center;verticalAlign=top;fontColor=#ffffff;fontSize=14;fontStyle=1;shadow=0;spacingTop=5;');
			   	part2.vertex = true;
			   	var dial2 = new mxCell('16', new mxGeometry(180, 75, 40, 40), 'ellipse;whiteSpace=wrap;html=1;aspect=fixed;shadow=0;strokeColor=#F2931E;strokeWidth=6;fontSize=16;align=center;fontStyle=1');
			   	dial2.vertex = true;
			   	
			   	var part3 = new mxCell('Label', new mxGeometry(280, 0, 80, 70), 'html=1;whiteSpace=wrap;shape=mxgraph.infographic.barCallout;dx=40;dy=30;fillColor=#AE4132;strokeColor=none;align=center;verticalAlign=top;fontColor=#ffffff;fontSize=14;fontStyle=1;shadow=0;spacingTop=5;');
			   	part3.vertex = true;
			   	var dial3 = new mxCell('8', new mxGeometry(300, 75, 40, 40), 'ellipse;whiteSpace=wrap;html=1;aspect=fixed;shadow=0;strokeColor=#AE4132;strokeWidth=6;fontSize=16;align=center;fontStyle=1');
			   	dial3.vertex = true;
			   	
			   	var part4 = new mxCell('Label', new mxGeometry(360, 0, 200, 70), 'html=1;whiteSpace=wrap;shape=mxgraph.infographic.barCallout;dx=100;dy=30;fillColor=#23445D;strokeColor=none;align=center;verticalAlign=top;fontColor=#ffffff;fontSize=14;fontStyle=1;shadow=0;spacingTop=5;');
			   	part4.vertex = true;
			   	var dial4 = new mxCell('20', new mxGeometry(440, 75, 40, 40), 'ellipse;whiteSpace=wrap;html=1;aspect=fixed;shadow=0;strokeColor=#23445D;strokeWidth=6;fontSize=16;align=center;fontStyle=1');
			   	dial4.vertex = true;
			   	
			   	var part5 = new mxCell('Label', new mxGeometry(560, 0, 140, 70), 'html=1;whiteSpace=wrap;shape=mxgraph.infographic.barCallout;dx=70;dy=30;fillColor=#12AAB5;strokeColor=none;align=center;verticalAlign=top;fontColor=#ffffff;fontSize=14;fontStyle=1;shadow=0;spacingTop=5;');
			   	part5.vertex = true;
			   	var dial5 = new mxCell('14', new mxGeometry(610, 75, 40, 40), 'ellipse;whiteSpace=wrap;html=1;aspect=fixed;shadow=0;strokeColor=#12AAB5;strokeWidth=6;fontSize=16;align=center;fontStyle=1');
			   	dial5.vertex = true;
			   	
			   	return sb.createVertexTemplateFromCells([part1, part2, part3, part4, part5, dial1, dial2, dial3, dial4, dial5], 700, 115, 'Bar Graph');
			}),				

			this.addEntry(dt + 'arrow graph', function()
			{
			   	var part1 = new mxCell('Label', new mxGeometry(0, 40, 90, 160), 'html=1;shadow=0;dashed=0;align=center;verticalAlign=top;shape=mxgraph.arrows2.arrow;dy=0.4;dx=60;direction=north;notch=0;strokeColor=#FFFFFF;strokeWidth=6;fillColor=#10739E;fontSize=14;labelPosition=center;verticalLabelPosition=bottom;fontStyle=1');
			   	part1.vertex = true;

			   	var part2 = new mxCell('Label', new mxGeometry(50, 0, 90, 200), 'html=1;shadow=0;dashed=0;align=center;verticalAlign=top;shape=mxgraph.arrows2.arrow;dy=0.4;dx=60;direction=north;notch=0;strokeColor=#FFFFFF;strokeWidth=6;fillColor=#F2931E;fontSize=14;labelPosition=center;verticalLabelPosition=bottom;fontStyle=1');
			   	part2.vertex = true;
			   	
			   	var part3 = new mxCell('Label', new mxGeometry(100, 20, 90, 180), 'html=1;shadow=0;dashed=0;align=center;verticalAlign=top;shape=mxgraph.arrows2.arrow;dy=0.4;dx=60;direction=north;notch=0;strokeColor=#FFFFFF;strokeWidth=6;fillColor=#AE4132;fontSize=14;labelPosition=center;verticalLabelPosition=bottom;fontStyle=1');
			   	part3.vertex = true;
			   	
			   	var part4 = new mxCell('Label', new mxGeometry(150, 90, 90, 110), 'html=1;shadow=0;dashed=0;align=center;verticalAlign=top;shape=mxgraph.arrows2.arrow;dy=0.4;dx=60;direction=north;notch=0;strokeColor=#FFFFFF;strokeWidth=6;fillColor=#23445D;fontSize=14;labelPosition=center;verticalLabelPosition=bottom;fontStyle=1');
			   	part4.vertex = true;
			   	
			   	var part5 = new mxCell('Label', new mxGeometry(200, 60, 90, 140), 'html=1;shadow=0;dashed=0;align=center;verticalAlign=top;shape=mxgraph.arrows2.arrow;dy=0.4;dx=60;direction=north;notch=0;strokeColor=#FFFFFF;strokeWidth=6;fillColor=#12AAB5;fontSize=14;labelPosition=center;verticalLabelPosition=bottom;fontStyle=1');
			   	part5.vertex = true;
			   	
			   	return sb.createVertexTemplateFromCells([part1, part2, part3, part4, part5], 300, 200, 'Arrow Graph');
			}),				

			this.addEntry(dt + 'triangular diagram', function()
			{
			   	var part1 = new mxCell('Label', new mxGeometry(120, 0, 240, 180), 'triangle;whiteSpace=wrap;html=1;shadow=0;strokeColor=#FFFFFF;strokeWidth=6;fillColor=#10739E;fontSize=16;fontColor=#FFFFFF;align=center;direction=north;fontStyle=1');
			   	part1.vertex = true;
			   	var part2 = new mxCell('Label', new mxGeometry(0, 180, 240, 180), 'triangle;whiteSpace=wrap;html=1;shadow=0;strokeColor=#FFFFFF;strokeWidth=6;fillColor=#F2931E;fontSize=16;fontColor=#FFFFFF;align=center;direction=north;fontStyle=1');
			   	part2.vertex = true;
			   	var part3 = new mxCell('Label', new mxGeometry(120, 180, 240, 180), 'triangle;whiteSpace=wrap;html=1;shadow=0;strokeColor=#FFFFFF;strokeWidth=6;fillColor=#AE4132;fontSize=16;fontColor=#FFFFFF;align=center;direction=south;fontStyle=1');
			   	part3.vertex = true;
			   	var part4 = new mxCell('Label', new mxGeometry(240, 180, 240, 180), 'triangle;whiteSpace=wrap;html=1;shadow=0;strokeColor=#FFFFFF;strokeWidth=6;fillColor=#23445D;fontSize=16;fontColor=#FFFFFF;align=center;direction=north;fontStyle=1');
			   	part4.vertex = true;

			   	return sb.createVertexTemplateFromCells([part1, part2, part3, part4], 480, 360, 'Triangular Diagram');
			}),				

			this.addEntry(dt + 'roll', function()
			{
			   	var part1 = new mxCell('', new mxGeometry(0, 0, 400, 400), 'ellipse;html=1;strokeWidth=4;fillColor=#23445D;strokeColor=none;shadow=0;fontSize=10;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;spacing=10;');
			   	part1.vertex = true;
			   	var part2 = new mxCell('', new mxGeometry(25, 25, 350, 350), 'ellipse;html=1;strokeWidth=4;fillColor=#2F5B7C;strokeColor=none;shadow=0;fontSize=10;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;spacing=10;');
			   	part2.vertex = true;
			   	var part3 = new mxCell('', new mxGeometry(50, 50, 300, 300), 'ellipse;html=1;strokeWidth=4;fillColor=#5D7F99;strokeColor=none;shadow=0;fontSize=10;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;spacing=10;');
			   	part3.vertex = true;
			   	var part4 = new mxCell('', new mxGeometry(75, 75, 250, 250), 'ellipse;html=1;strokeWidth=4;fillColor=#BAC8D3;strokeColor=none;shadow=0;fontSize=10;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;spacing=10;');
			   	part4.vertex = true;
			   	var part5 = new mxCell('', new mxGeometry(100, 100, 200, 200), 'ellipse;html=1;strokeWidth=4;fillColor=#FCE7CD;strokeColor=none;shadow=0;fontSize=10;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;spacing=10;');
			   	part5.vertex = true;
			   	var part6 = new mxCell('', new mxGeometry(125, 125, 150, 150), 'ellipse;html=1;strokeWidth=4;fillColor=#F8C382;strokeColor=none;shadow=0;fontSize=10;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;spacing=10;');
			   	part6.vertex = true;
			   	var part7 = new mxCell('Label', new mxGeometry(150, 150, 100, 100), 'ellipse;html=1;strokeWidth=4;fillColor=#F5AB50;strokeColor=none;shadow=0;fontSize=20;fontColor=#FFFFFF;align=center;fontStyle=1;whiteSpace=wrap;spacing=10;');
			   	part7.vertex = true;

			   	var ribbon1 = new mxCell('Label', new mxGeometry(200, 225, 300, 25), 'html=1;shape=mxgraph.infographic.ribbonSimple;notch1=0;notch2=20;fillColor=#F5AB50;strokeColor=none;align=right;verticalAlign=middle;fontColor=#ffffff;fontSize=14;fontStyle=1;shadow=0;spacingRight=25;');
			   	ribbon1.vertex = true;
			   	var ribbon2 = new mxCell('Label', new mxGeometry(200, 250, 340, 25), 'html=1;shape=mxgraph.infographic.ribbonSimple;notch1=0;notch2=20;fillColor=#F8C382;strokeColor=none;align=right;verticalAlign=middle;fontColor=#ffffff;fontSize=14;fontStyle=1;shadow=0;spacingRight=25;');
			   	ribbon2.vertex = true;
			   	var ribbon3 = new mxCell('Label', new mxGeometry(200, 275, 380, 25), 'html=1;shape=mxgraph.infographic.ribbonSimple;notch1=0;notch2=20;fillColor=#FCE7CD;strokeColor=none;align=right;verticalAlign=middle;fontColor=#ffffff;fontSize=14;fontStyle=1;shadow=0;spacingRight=25;');
			   	ribbon3.vertex = true;
			   	var ribbon4 = new mxCell('Label', new mxGeometry(200, 300, 420, 25), 'html=1;shape=mxgraph.infographic.ribbonSimple;notch1=0;notch2=20;fillColor=#BAC8D3;strokeColor=none;align=right;verticalAlign=middle;fontColor=#ffffff;fontSize=14;fontStyle=1;shadow=0;spacingRight=25;');
			   	ribbon4.vertex = true;
			   	var ribbon5 = new mxCell('Label', new mxGeometry(200, 325, 460, 25), 'html=1;shape=mxgraph.infographic.ribbonSimple;notch1=0;notch2=20;fillColor=#5D7F99;strokeColor=none;align=right;verticalAlign=middle;fontColor=#ffffff;fontSize=14;fontStyle=1;shadow=0;spacingRight=25;');
			   	ribbon5.vertex = true;
			   	var ribbon6 = new mxCell('Label', new mxGeometry(200, 350, 500, 25), 'html=1;shape=mxgraph.infographic.ribbonSimple;notch1=0;notch2=20;fillColor=#2F5B7C;strokeColor=none;align=right;verticalAlign=middle;fontColor=#ffffff;fontSize=14;fontStyle=1;shadow=0;spacingRight=25;');
			   	ribbon6.vertex = true;
			   	var ribbon7 = new mxCell('Label', new mxGeometry(200, 375, 540, 25), 'html=1;shape=mxgraph.infographic.ribbonSimple;notch1=0;notch2=20;fillColor=#23445D;strokeColor=none;align=right;verticalAlign=middle;fontColor=#ffffff;fontSize=14;fontStyle=1;shadow=0;spacingRight=25;');
			   	ribbon7.vertex = true;

			   	return sb.createVertexTemplateFromCells([part1, part2, part3, part4, part5, part6, part7, ribbon1, ribbon2, ribbon3, ribbon4, ribbon5, ribbon6, ribbon7], 740, 400, 'Roll');
			}),				

			this.addEntry(dt + 'cylinder graph', function()
			{
			   	var part1 = new mxCell('', new mxGeometry(315, 160, 100, 25), 'verticalLabelPosition=middle;verticalAlign=middle;html=1;shape=mxgraph.infographic.cylinder;fillColor=#10739E;strokeColor=none;shadow=0;align=left;labelPosition=right;spacingLeft=10;fontStyle=1;fontColor=#10739E;');
			   	part1.vertex = true;
			   	var part2 = new mxCell('', new mxGeometry(315, 180, 100, 25), 'verticalLabelPosition=middle;verticalAlign=middle;html=1;shape=mxgraph.infographic.cylinder;fillColor=#F2931E;strokeColor=none;shadow=0;align=left;labelPosition=right;spacingLeft=10;fontStyle=1;fontColor=#F2931E;');
			   	part2.vertex = true;
			   	var part3 = new mxCell('', new mxGeometry(315, 200, 100, 25), 'verticalLabelPosition=middle;verticalAlign=middle;html=1;shape=mxgraph.infographic.cylinder;fillColor=#AE4132;strokeColor=none;shadow=0;align=left;labelPosition=right;spacingLeft=10;fontStyle=1;fontColor=#AE4132;');
			   	part3.vertex = true;
			   	var part4 = new mxCell('', new mxGeometry(315, 220, 100, 25), 'verticalLabelPosition=middle;verticalAlign=middle;html=1;shape=mxgraph.infographic.cylinder;fillColor=#23445D;strokeColor=none;shadow=0;align=left;labelPosition=right;spacingLeft=10;fontStyle=1;fontColor=#23445D;');
			   	part4.vertex = true;
			   	var part5 = new mxCell('', new mxGeometry(315, 240, 100, 25), 'verticalLabelPosition=middle;verticalAlign=middle;html=1;shape=mxgraph.infographic.cylinder;fillColor=#12AAB5;strokeColor=none;shadow=0;align=left;labelPosition=right;spacingLeft=10;fontStyle=1;fontColor=#12AAB5;');
			   	part5.vertex = true;

			   	var callout1 = new mxCell('Label', new mxGeometry(175, 0, 130, 160), 'strokeWidth=1;shadow=0;dashed=0;align=center;html=1;shape=mxgraph.mockup.text.callout;linkText=;textSize=17;textColor=#666666;callDir=NW;callStyle=line;fontSize=17;fontColor=#10739E;align=left;verticalAlign=top;strokeColor=#666666;fillColor=#4D9900;flipV=0;fontStyle=1;');
			   	callout1.vertex = true;
			   	var callout2 = new mxCell('Label', new mxGeometry(175, 80, 130, 110), 'strokeWidth=1;shadow=0;dashed=0;align=center;html=1;shape=mxgraph.mockup.text.callout;linkText=;textSize=17;textColor=#666666;callDir=NW;callStyle=line;fontSize=17;fontColor=#F2931E;align=left;verticalAlign=top;strokeColor=#666666;fillColor=#4D9900;flipV=0;fontStyle=1;');
			   	callout2.vertex = true;
			   	var callout3 = new mxCell('Label', new mxGeometry(175, 160, 130, 50), 'strokeWidth=1;shadow=0;dashed=0;align=center;html=1;shape=mxgraph.mockup.text.callout;linkText=;textSize=17;textColor=#666666;callDir=NW;callStyle=line;fontSize=17;fontColor=#AE4132;align=left;verticalAlign=top;strokeColor=#666666;fillColor=#4D9900;flipV=0;fontStyle=1;');
			   	callout3.vertex = true;
			   	var callout4 = new mxCell('Label', new mxGeometry(175, 230, 130, 50), 'strokeWidth=1;shadow=0;dashed=0;align=center;html=1;shape=mxgraph.mockup.text.callout;linkText=;textSize=17;textColor=#666666;callDir=SW;callStyle=line;fontSize=17;fontColor=#23445D;align=left;verticalAlign=bottom;strokeColor=#666666;fillColor=#4D9900;flipV=0;fontStyle=1;');
			   	callout4.vertex = true;
			   	var callout5 = new mxCell('Label', new mxGeometry(175, 250, 130, 120), 'strokeWidth=1;shadow=0;dashed=0;align=center;html=1;shape=mxgraph.mockup.text.callout;linkText=;textSize=17;textColor=#666666;callDir=SW;callStyle=line;fontSize=17;fontColor=#12AAB5;align=left;verticalAlign=bottom;strokeColor=#666666;fillColor=#4D9900;flipV=0;fontStyle=1;');
			   	callout5.vertex = true;

			   	var text1 = new mxCell(
			   			'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 
			   			new mxGeometry(0, 30, 240, 50), 'rounded=0;whiteSpace=wrap;shadow=0;strokeColor=none;strokeWidth=6;fillColor=none;fontSize=12;align=right;html=1;');
			   	text1.vertex = true;
			   	var text2 = new mxCell(
			   			'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 
			   			new mxGeometry(0, 110, 240, 50), 'rounded=0;whiteSpace=wrap;shadow=0;strokeColor=none;strokeWidth=6;fillColor=none;fontSize=12;align=right;html=1;');
			   	text2.vertex = true;
			   	var text3 = new mxCell(
			   			'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 
			   			new mxGeometry(0, 190, 240, 50), 'rounded=0;whiteSpace=wrap;shadow=0;strokeColor=none;strokeWidth=6;fillColor=none;fontSize=12;align=right;html=1;');
			   	text3.vertex = true;
			   	var text4 = new mxCell(
			   			'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 
			   			new mxGeometry(0, 290, 240, 50), 'rounded=0;whiteSpace=wrap;shadow=0;strokeColor=none;strokeWidth=6;fillColor=none;fontSize=12;align=right;html=1;');
			   	text4.vertex = true;
			   	var text5 = new mxCell(
			   			'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 
			   			new mxGeometry(0, 380, 240, 50), 'rounded=0;whiteSpace=wrap;shadow=0;strokeColor=none;strokeWidth=6;fillColor=none;fontSize=12;align=right;html=1;');
			   	text5.vertex = true;

			   	return sb.createVertexTemplateFromCells([part5, part4, part3, part2, part1, callout1, callout2, callout3, callout4, callout5, text1, text2, text3, text4, text5], 415, 430, 'Cylinder Graph');
			}),				
			
			this.addEntry(dt + 'swirl', function()
			{
			   	var part1 = new mxCell('', new mxGeometry(0, 0, 300, 140), 'html=1;shadow=0;dashed=0;align=center;verticalAlign=middle;shape=mxgraph.arrows2.uTurnArrow;dy=22;arrowHead=70;dx2=35;strokeColor=#ffffff;fillColor=#10739E;fontSize=12;fontColor=#3333FF;flipH=1;flipV=1;strokeWidth=4;');
			   	part1.vertex = true;
			   	var part2 = new mxCell('', new mxGeometry(0, 79, 230, 140), 'html=1;shadow=0;dashed=0;align=center;verticalAlign=middle;shape=mxgraph.arrows2.uTurnArrow;dy=22;arrowHead=70;dx2=35;strokeColor=#ffffff;fillColor=#F2931E;fontSize=12;fontColor=#3333FF;flipV=1;strokeWidth=4;');
			   	part2.vertex = true;
			   	var part3 = new mxCell('', new mxGeometry(70, 158, 230, 140), 'html=1;shadow=0;dashed=0;align=center;verticalAlign=middle;shape=mxgraph.arrows2.uTurnArrow;dy=22;arrowHead=70;dx2=35;strokeColor=#ffffff;fillColor=#AE4132;fontSize=12;fontColor=#3333FF;flipH=1;flipV=1;strokeWidth=4;');
			   	part3.vertex = true;
			   	var part4 = new mxCell('', new mxGeometry(0, 237, 230, 140), 'html=1;shadow=0;dashed=0;align=center;verticalAlign=middle;shape=mxgraph.arrows2.uTurnArrow;dy=22;arrowHead=70;dx2=35;strokeColor=#ffffff;fillColor=#23445D;fontSize=12;fontColor=#3333FF;flipV=1;strokeWidth=4;');
			   	part4.vertex = true;
			   	var part5 = new mxCell('', new mxGeometry(70, 316, 230, 140), 'html=1;shadow=0;dashed=0;align=center;verticalAlign=middle;shape=mxgraph.arrows2.uTurnArrow;dy=22;arrowHead=70;dx2=35;strokeColor=#ffffff;fillColor=#12AAB5;fontSize=12;fontColor=#3333FF;flipH=1;flipV=1;strokeWidth=4;');
			   	part5.vertex = true;

			   	var text1 = new mxCell(
			   			'<b style="font-size: 7px">LABEL</b><br style="font-size: 7px">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 
			   			new mxGeometry(50, 0, 150, 40), 'rounded=0;whiteSpace=wrap;shadow=0;strokeColor=none;strokeWidth=6;fillColor=none;fontSize=7;fontColor=#FFFFFF;align=left;html=1;spacingLeft=5;');
			   	text1.vertex = true;
			   	var text2 = new mxCell(
			   			'<b style="font-size: 7px">LABEL</b><br style="font-size: 7px">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 
			   			new mxGeometry(50, 79, 150, 40), 'rounded=0;whiteSpace=wrap;shadow=0;strokeColor=none;strokeWidth=6;fillColor=none;fontSize=7;fontColor=#FFFFFF;align=left;html=1;spacingLeft=5;');
			   	text2.vertex = true;
			   	var text3 = new mxCell(
			   			'<b style="font-size: 7px">LABEL</b><br style="font-size: 7px">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 
			   			new mxGeometry(100, 158, 150, 40), 'rounded=0;whiteSpace=wrap;shadow=0;strokeColor=none;strokeWidth=6;fillColor=none;fontSize=7;fontColor=#FFFFFF;align=left;html=1;spacingLeft=5;');
			   	text3.vertex = true;
			   	var text4 = new mxCell(
			   			'<b style="font-size: 7px">LABEL</b><br style="font-size: 7px">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 
			   			new mxGeometry(50, 237, 150, 40), 'rounded=0;whiteSpace=wrap;shadow=0;strokeColor=none;strokeWidth=6;fillColor=none;fontSize=7;fontColor=#FFFFFF;align=left;html=1;spacingLeft=5;');
			   	text4.vertex = true;
			   	var text5 = new mxCell(
			   			'<b style="font-size: 7px">LABEL</b><br style="font-size: 7px">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 
			   			new mxGeometry(100, 316, 150, 40), 'rounded=0;whiteSpace=wrap;shadow=0;strokeColor=none;strokeWidth=6;fillColor=none;fontSize=7;fontColor=#FFFFFF;align=left;html=1;spacingLeft=5;');
			   	text5.vertex = true;

			   	return sb.createVertexTemplateFromCells([part5, part4, part3, part2, part1, text1, text2, text3, text4, text5], 300, 456, 'Swirl');
			}),				
			
			this.addEntry(dt + 'swirl', function()
			{
			   	var part1 = new mxCell('Label', new mxGeometry(60, 0, 120, 15), 'shape=manualInput;whiteSpace=wrap;html=1;shadow=0;fillColor=#10739E;strokeColor=none;fontSize=12;fontColor=#FFFFFF;align=center;direction=north;flipV=1;rounded=0;');
			   	part1.vertex = true;
			   	var part2 = new mxCell('Label', new mxGeometry(30, 15, 150, 15), 'shape=manualInput;whiteSpace=wrap;html=1;shadow=0;fillColor=#F2931E;strokeColor=none;fontSize=12;fontColor=#FFFFFF;align=center;direction=north;flipV=1;rounded=0;');
			   	part2.vertex = true;
			   	var part3 = new mxCell('Label', new mxGeometry(0, 30, 180, 15), 'shape=manualInput;whiteSpace=wrap;html=1;shadow=0;fillColor=#AE4132;strokeColor=none;fontSize=12;fontColor=#FFFFFF;align=center;direction=north;flipV=1;rounded=0;');
			   	part3.vertex = true;
			   	
			   	var arc1 = new mxCell('', new mxGeometry(114, 0, 130, 130), 'verticalLabelPosition=bottom;verticalAlign=top;html=1;shape=mxgraph.basic.partConcEllipse;fillColor=#10739E;strokeColor=none;startAngle=0;endAngle=0.5;arcWidth=0.23;shadow=0;fontSize=7;fontColor=#FFFFFF;align=left;');
			   	arc1.vertex = true;
			   	var arc2 = new mxCell('', new mxGeometry(129, 15, 100, 100), 'verticalLabelPosition=bottom;verticalAlign=top;html=1;shape=mxgraph.basic.partConcEllipse;fillColor=#F2931E;strokeColor=none;startAngle=0;endAngle=0.5;arcWidth=0.3;shadow=0;fontSize=7;fontColor=#FFFFFF;align=left;');
			   	arc2.vertex = true;
			   	var arc3 = new mxCell('', new mxGeometry(144, 30, 70, 70), 'verticalLabelPosition=bottom;verticalAlign=top;html=1;shape=mxgraph.basic.partConcEllipse;fillColor=#AE4132;strokeColor=none;startAngle=0;endAngle=0.5;arcWidth=0.43;shadow=0;fontSize=7;fontColor=#FFFFFF;align=left;');
			   	arc3.vertex = true;

			   	var arc4 = new mxCell('', new mxGeometry(115, 85, 130, 130), 'verticalLabelPosition=bottom;verticalAlign=top;html=1;shape=mxgraph.basic.partConcEllipse;fillColor=#AE4132;strokeColor=none;startAngle=0.5;endAngle=0.00001;arcWidth=0.23;shadow=0;fontSize=7;fontColor=#FFFFFF;align=left;');
			   	arc4.vertex = true;
			   	var arc5 = new mxCell('', new mxGeometry(130, 100, 100, 100), 'verticalLabelPosition=bottom;verticalAlign=top;html=1;shape=mxgraph.basic.partConcEllipse;fillColor=#F2931E;strokeColor=none;startAngle=0.5;endAngle=0.00001;arcWidth=0.3;shadow=0;fontSize=7;fontColor=#FFFFFF;align=left;');
			   	arc5.vertex = true;
			   	var arc6 = new mxCell('', new mxGeometry(145, 115, 70, 70), 'verticalLabelPosition=bottom;verticalAlign=top;html=1;shape=mxgraph.basic.partConcEllipse;fillColor=#10739E;strokeColor=none;startAngle=0.5;endAngle=0.00001;arcWidth=0.43;shadow=0;fontSize=7;fontColor=#FFFFFF;align=left;');
			   	arc6.vertex = true;

			   	var part4 = new mxCell('', new mxGeometry(179, 170, 181, 15), 'shape=manualInput;whiteSpace=wrap;html=1;shadow=0;fillColor=#10739E;strokeColor=none;fontSize=12;fontColor=#FFFFFF;align=center;direction=north;flipH=1;rounded=0;');
			   	part4.vertex = true;
			   	var part5 = new mxCell('', new mxGeometry(179, 185, 151, 15), 'shape=manualInput;whiteSpace=wrap;html=1;shadow=0;fillColor=#F2931E;strokeColor=none;fontSize=12;fontColor=#FFFFFF;align=center;direction=north;flipH=1;rounded=0;');
			   	part5.vertex = true;
			   	var part6 = new mxCell('', new mxGeometry(179, 200, 121, 15), 'shape=manualInput;whiteSpace=wrap;html=1;shadow=0;fillColor=#AE4132;strokeColor=none;fontSize=12;fontColor=#FFFFFF;align=center;direction=north;flipH=1;rounded=0;');
			   	part6.vertex = true;
			   	
			   	var marker1 = new mxCell('1', new mxGeometry(0, 60, 30, 30), 'ellipse;whiteSpace=wrap;html=1;aspect=fixed;shadow=0;strokeColor=none;fillColor=#10739E;fontSize=17;fontColor=#FFFFFF;align=center;fontStyle=1;rounded=0;');
			   	marker1.vertex = true;
			   	var marker2 = new mxCell('2', new mxGeometry(40, 60, 30, 30), 'ellipse;whiteSpace=wrap;html=1;aspect=fixed;shadow=0;strokeColor=none;fillColor=#F2931E;fontSize=17;fontColor=#FFFFFF;align=center;fontStyle=1;rounded=0;');
			   	marker2.vertex = true;
			   	var marker3 = new mxCell('3', new mxGeometry(80, 60, 30, 30), 'ellipse;whiteSpace=wrap;html=1;aspect=fixed;shadow=0;strokeColor=none;fillColor=#AE4132;fontSize=17;fontColor=#FFFFFF;align=center;fontStyle=1;rounded=0;');
			   	marker3.vertex = true;
			   	
			   	return sb.createVertexTemplateFromCells([part1, part2, part3, arc1, arc2, arc3, arc4, arc5, arc6, part4, part5, part6, marker1, marker2, marker3], 360, 215, 'Swirl');
			}),				
			
			this.addEntry(dt + 'callout', function()
		   	{
			   	var edge1 = new mxCell('Label', new mxGeometry(0, 0, 0, 0), 'endArrow=oval;html=1;fontSize=16;fontColor=#10739E;endFill=0;endSize=24;strokeWidth=5;labelBackgroundColor=none;verticalAlign=top;fontStyle=1;strokeColor=#10739E;');
			   	edge1.geometry.setTerminalPoint(new mxPoint(0, 100), true);
			   	edge1.geometry.setTerminalPoint(new mxPoint(100, 0), false);
			   	edge1.geometry.x=-1;
		    	edge1.geometry.relative = true;
			   	edge1.edge = true;

			   	return sb.createVertexTemplateFromCells([edge1], 100, 100, 'Callout');
			}),				
				
			this.addEntry(dt + 'roadmap vertical', function()
			{
			   	var startPoint = new mxCell('', new mxGeometry(234, 0, 12, 12), 'ellipse;whiteSpace=wrap;html=1;aspect=fixed;shadow=0;fillColor=none;strokeColor=#333333;fontSize=16;align=center;strokeWidth=2;');
			   	startPoint.vertex = true;
			   	var endPoint = new mxCell('', new mxGeometry(234, 498, 12, 12), 'ellipse;whiteSpace=wrap;html=1;aspect=fixed;shadow=0;fillColor=none;strokeColor=#333333;fontSize=16;align=center;strokeWidth=2;');
			   	endPoint.vertex = true;

			   	var edge1 = new mxCell('', new mxGeometry(0, 0, 0, 0), 'endArrow=none;html=1;strokeWidth=3;strokeColor=#CCCCCC;labelBackgroundColor=none;fontSize=16');
		    	edge1.geometry.relative = true;
			   	edge1.edge = true;
			   	startPoint.insertEdge(edge1, true);
		    	endPoint.insertEdge(edge1, false);

			   	var item1 = new mxCell('', new mxGeometry(0, 30, 246, 60), 'verticalLabelPosition=middle;verticalAlign=middle;html=1;shape=mxgraph.infographic.circularCallout2;dy=15;strokeColor=#10739E;labelPosition=center;align=center;fontColor=#10739E;fontStyle=1;fontSize=24;shadow=0;direction=north;');
			   	item1.vertex = true;
			   	var item2 = new mxCell('', new mxGeometry(234, 100, 246, 60), 'verticalLabelPosition=middle;verticalAlign=middle;html=1;shape=mxgraph.infographic.circularCallout2;dy=15;strokeColor=#F2931E;labelPosition=center;align=center;fontColor=#F2931E;fontStyle=1;fontSize=24;shadow=0;direction=north;flipH=1;');
			   	item2.vertex = true;
			   	var item3 = new mxCell('', new mxGeometry(0, 170, 246, 60), 'verticalLabelPosition=middle;verticalAlign=middle;html=1;shape=mxgraph.infographic.circularCallout2;dy=15;strokeColor=#AE4132;labelPosition=center;align=center;fontColor=#10739E;fontStyle=1;fontSize=24;shadow=0;direction=north;');
			   	item3.vertex = true;
			   	var item4 = new mxCell('', new mxGeometry(234, 240, 246, 60), 'verticalLabelPosition=middle;verticalAlign=middle;html=1;shape=mxgraph.infographic.circularCallout2;dy=15;strokeColor=#23445D;labelPosition=center;align=center;fontColor=#10739E;fontStyle=1;fontSize=24;shadow=0;direction=north;flipH=1;');
			   	item4.vertex = true;
			   	var item5 = new mxCell('', new mxGeometry(0, 310, 246, 60), 'verticalLabelPosition=middle;verticalAlign=middle;html=1;shape=mxgraph.infographic.circularCallout2;dy=15;strokeColor=#12AAB5;labelPosition=center;align=center;fontColor=#10739E;fontStyle=1;fontSize=24;shadow=0;direction=north;');
			   	item5.vertex = true;
			   	var item6 = new mxCell('', new mxGeometry(234, 380, 246, 60), 'verticalLabelPosition=middle;verticalAlign=middle;html=1;shape=mxgraph.infographic.circularCallout2;dy=15;strokeColor=#56517E;labelPosition=center;align=center;fontColor=#10739E;fontStyle=1;fontSize=24;shadow=0;direction=north;flipH=1;');
			   	item6.vertex = true;

			   	var label1 = new mxCell('Label', new mxGeometry(70, 20, 160, 30), 'fillColor=#10739E;strokecolor=none;rounded=1;fontColor=#FFFFFF;strokeColor=none;fontStyle=1;fontSize=14;whiteSpace=wrap;html=1;');
			   	label1.vertex = true;
			   	var label2 = new mxCell('Label', new mxGeometry(250, 85, 160, 30), 'fillColor=#F2931E;strokecolor=none;rounded=1;fontColor=#FFFFFF;strokeColor=none;fontStyle=1;fontSize=14;whiteSpace=wrap;html=1;');
			   	label2.vertex = true;
			   	var label3 = new mxCell('Label', new mxGeometry(70, 160, 160, 30), 'fillColor=#AE4132;strokecolor=none;rounded=1;fontColor=#FFFFFF;strokeColor=none;fontStyle=1;fontSize=14;whiteSpace=wrap;html=1;');
			   	label3.vertex = true;
			   	var label4 = new mxCell('Label', new mxGeometry(250, 225, 160, 30), 'fillColor=#23445D;strokecolor=none;rounded=1;fontColor=#FFFFFF;strokeColor=none;fontStyle=1;fontSize=14;whiteSpace=wrap;html=1;');
			   	label4.vertex = true;
			   	var label5 = new mxCell('Label', new mxGeometry(70, 300, 160, 30), 'fillColor=#12AAB5;strokecolor=none;rounded=1;fontColor=#FFFFFF;strokeColor=none;fontStyle=1;fontSize=14;whiteSpace=wrap;html=1;');
			   	label5.vertex = true;
			   	var label6 = new mxCell('Label', new mxGeometry(250, 365, 160, 30), 'fillColor=#56517E;strokecolor=none;rounded=1;fontColor=#FFFFFF;strokeColor=none;fontStyle=1;fontSize=14;whiteSpace=wrap;html=1;');
			   	label6.vertex = true;

			   	var label7 = new mxCell('<font style="font-size: 10px"><font style="font-size: 12px" color="#10739E"><b>Label</b></font><br><br><font size="1">' + 
			   			'Lorem ipsum dolor sit amet, consectetur adipisicing elit</font></font>', 
			   			new mxGeometry(70, 70, 160, 70), 'rounded=1;strokeColor=none;fillColor=#EEEEEE;align=center;arcSize=12;verticalAlign=top;whiteSpace=wrap;html=1;fontSize=12;');
			   	label7.vertex = true;
			   	var label8 = new mxCell('<font style="font-size: 10px"><font style="font-size: 12px" color="#F2931E"><b>Label</b></font><br><br><font size="1">' + 
			   			'Lorem ipsum dolor sit amet, consectetur adipisicing elit</font></font>', 
			   			new mxGeometry(250, 140, 160, 70), 'rounded=1;strokeColor=none;fillColor=#EEEEEE;align=center;arcSize=12;verticalAlign=top;whiteSpace=wrap;html=1;fontSize=12;');
			   	label8.vertex = true;
			   	var label9 = new mxCell('<font style="font-size: 10px"><font style="font-size: 12px" color="#AE4132"><b>Label</b></font><br><br><font size="1">' + 
			   			'Lorem ipsum dolor sit amet, consectetur adipisicing elit</font></font>', 
			   			new mxGeometry(70, 210, 160, 70), 'rounded=1;strokeColor=none;fillColor=#EEEEEE;align=center;arcSize=12;verticalAlign=top;whiteSpace=wrap;html=1;fontSize=12;');
			   	label9.vertex = true;
			   	var label10 = new mxCell('<font style="font-size: 10px"><font style="font-size: 12px" color="#23445D"><b>Label</b></font><br><br><font size="1">' + 
			   			'Lorem ipsum dolor sit amet, consectetur adipisicing elit</font></font>', 
			   			new mxGeometry(250, 280, 160, 70), 'rounded=1;strokeColor=none;fillColor=#EEEEEE;align=center;arcSize=12;verticalAlign=top;whiteSpace=wrap;html=1;fontSize=12;');
			   	label10.vertex = true;
			   	var label11 = new mxCell('<font style="font-size: 10px"><font style="font-size: 12px" color="#12AAB5"><b>Label</b></font><br><br><font size="1">' + 
			   			'Lorem ipsum dolor sit amet, consectetur adipisicing elit</font></font>', 
			   			new mxGeometry(70, 350, 160, 70), 'rounded=1;strokeColor=none;fillColor=#EEEEEE;align=center;arcSize=12;verticalAlign=top;whiteSpace=wrap;html=1;fontSize=12;');
			   	label11.vertex = true;
			   	var label12 = new mxCell('<font style="font-size: 10px"><font style="font-size: 12px" color="#56517E"><b>Label</b></font><br><br><font size="1">' + 
			   			'Lorem ipsum dolor sit amet, consectetur adipisicing elit</font></font>', 
			   			new mxGeometry(250, 420, 160, 70), 'rounded=1;strokeColor=none;fillColor=#EEEEEE;align=center;arcSize=12;verticalAlign=top;whiteSpace=wrap;html=1;fontSize=12;');
			   	label12.vertex = true;
			   	return sb.createVertexTemplateFromCells(
			   			[edge1, startPoint, endPoint, item1, item2, item3, item4, item5, item6, label1, label2, label3, label4, label5, label6, label7, label8, label9, label10, label11, label12], 
			   			480, 510, 'Roadmap (vertical)');
			}),				
			
			this.addEntry(dt + 'roadmap horizontal', function()
			{
			   	var part1 = new mxCell('', new mxGeometry(0, 90, 840, 30), 'fillColor=#dddddd;rounded=0;strokeColor=none;');
			   	part1.vertex = true;
			   	var part2 = new mxCell('Label', new mxGeometry(40, 80, 120, 50), 'shape=mxgraph.infographic.ribbonSimple;notch1=0;notch2=10;notch=0;html=1;fillColor=#10739E;strokeColor=none;shadow=0;fontSize=17;fontColor=#FFFFFF;align=left;spacingLeft=10;fontStyle=1;whiteSpace=wrap;');
			   	part2.vertex = true;
			   	var part3 = new mxCell('Label', new mxGeometry(200, 80, 120, 50), 'shape=mxgraph.infographic.ribbonSimple;notch1=0;notch2=10;notch=0;html=1;fillColor=#F2931E;strokeColor=none;shadow=0;fontSize=17;fontColor=#FFFFFF;align=left;spacingLeft=10;fontStyle=1;whiteSpace=wrap;');
			   	part3.vertex = true;
			   	var part4 = new mxCell('Label', new mxGeometry(360, 80, 120, 50), 'shape=mxgraph.infographic.ribbonSimple;notch1=0;notch2=10;notch=0;html=1;fillColor=#AE4132;strokeColor=none;shadow=0;fontSize=17;fontColor=#FFFFFF;align=left;spacingLeft=10;fontStyle=1;whiteSpace=wrap;');
			   	part4.vertex = true;
			   	var part5 = new mxCell('Label', new mxGeometry(520, 80, 120, 50), 'shape=mxgraph.infographic.ribbonSimple;notch1=0;notch2=10;notch=0;html=1;fillColor=#23445D;strokeColor=none;shadow=0;fontSize=17;fontColor=#FFFFFF;align=left;spacingLeft=10;fontStyle=1;whiteSpace=wrap;');
			   	part5.vertex = true;
			   	var part6 = new mxCell('Label', new mxGeometry(680, 80, 120, 50), 'shape=mxgraph.infographic.ribbonSimple;notch1=0;notch2=10;notch=0;html=1;fillColor=#12AAB5;strokeColor=none;shadow=0;fontSize=17;fontColor=#FFFFFF;align=left;spacingLeft=10;fontStyle=1;whiteSpace=wrap;');
			   	part6.vertex = true;
			   	
			   	var label1 = new mxCell('<font style="font-size: 10px"><font style="font-size: 12px" color="#10739E"><b>Label</b></font><br><br><font size="1">' + 
			   			'Lorem ipsum dolor sit amet, consectetur adipisicing elit</font></font>', 
			   			new mxGeometry(0, 0, 200, 70), 'rounded=1;strokeColor=none;fillColor=#DDDDDD;align=center;arcSize=12;verticalAlign=top;whiteSpace=wrap;html=1;fontSize=12;');
			   	label1.vertex = true;
			   	
			   	var label2 = new mxCell('<font style="font-size: 10px"><font style="font-size: 12px" color="#F2931E"><b>Label</b></font><br><br><font size="1">' + 
			   			'Lorem ipsum dolor sit amet, consectetur adipisicing elit</font></font>', 
			   			new mxGeometry(160, 140, 200, 70), 'rounded=1;strokeColor=none;fillColor=#DDDDDD;align=center;arcSize=12;verticalAlign=top;whiteSpace=wrap;html=1;fontSize=12;');
			   	label2.vertex = true;
			   	
			   	var label3 = new mxCell('<font style="font-size: 10px"><font style="font-size: 12px" color="#AE4132"><b>Label</b></font><br><br><font size="1">' + 
			   			'Lorem ipsum dolor sit amet, consectetur adipisicing elit</font></font>', 
			   			new mxGeometry(320, 0, 200, 70), 'rounded=1;strokeColor=none;fillColor=#DDDDDD;align=center;arcSize=12;verticalAlign=top;whiteSpace=wrap;html=1;fontSize=12;');
			   	label3.vertex = true;
			   	
			   	var label4 = new mxCell('<font style="font-size: 10px"><font style="font-size: 12px" color="#23445D"><b>Label</b></font><br><br><font size="1">' + 
			   			'Lorem ipsum dolor sit amet, consectetur adipisicing elit</font></font>', 
			   			new mxGeometry(480, 140, 200, 70), 'rounded=1;strokeColor=none;fillColor=#DDDDDD;align=center;arcSize=12;verticalAlign=top;whiteSpace=wrap;html=1;fontSize=12;');
			   	label4.vertex = true;
			   	
			   	var label5 = new mxCell('<font style="font-size: 10px"><font style="font-size: 12px" color="#12AAB5"><b>Label</b></font><br><br><font size="1">' + 
			   			'Lorem ipsum dolor sit amet, consectetur adipisicing elit</font></font>', 
			   			new mxGeometry(640, 0, 200, 70), 'rounded=1;strokeColor=none;fillColor=#DDDDDD;align=center;arcSize=12;verticalAlign=top;whiteSpace=wrap;html=1;fontSize=12;');
			   	label5.vertex = true;
			   	
			   	return sb.createVertexTemplateFromCells([part1, part2, part3, part4, part5, part6, label1, label2, label3, label4, label5], 840, 210, 'Roadmap (horizontal)');
			}),				

			this.addEntry(dt + 'flower', function()
			{
			   	var part1 = new mxCell('Lorem ipsum dolor sit amet, consectetur adipisicing elit', new mxGeometry(0, 0, 150, 150), 'shape=mxgraph.basic.diag_round_rect;dx=37;flipH=1;html=1;fillColor=#10739E;strokeColor=none;shadow=0;fontSize=12;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;strokeWidth=8;');
			   	part1.vertex = true;
			   	var part2 = new mxCell('Lorem ipsum dolor sit amet, consectetur adipisicing elit', new mxGeometry(160, 0, 150, 150), 'shape=mxgraph.basic.diag_round_rect;dx=37;html=1;fillColor=#F2931E;strokeColor=none;shadow=0;fontSize=12;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;strokeWidth=8;');
			   	part2.vertex = true;
			   	var part3 = new mxCell('Lorem ipsum dolor sit amet, consectetur adipisicing elit', new mxGeometry(0, 160, 150, 150), 'shape=mxgraph.basic.diag_round_rect;dx=37;flipH=1;flipV=1;html=1;fillColor=#AE4132;strokeColor=none;shadow=0;fontSize=12;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;strokeWidth=8;');
			   	part3.vertex = true;
			   	var part4 = new mxCell('Lorem ipsum dolor sit amet, consectetur adipisicing elit', new mxGeometry(160, 160, 150, 150), 'shape=mxgraph.basic.diag_round_rect;dx=37;flipV=1;html=1;fillColor=#23445D;strokeColor=none;shadow=0;fontSize=12;fontColor=#FFFFFF;align=center;fontStyle=0;whiteSpace=wrap;strokeWidth=8;');
			   	part4.vertex = true;

			   	return sb.createVertexTemplateFromCells([part1, part2, part3, part4], 310, 310, 'Flower');
			})		
		]);
		
		this.setCurrentSearchEntryLibrary();
	};

})();
