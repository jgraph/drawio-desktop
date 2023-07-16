(function()
{
	// Adds mockup shapes
	Sidebar.prototype.addMockupPalette = function()
	{
		this.setCurrentSearchEntryLibrary('mockups', 'mockupButtons');
		this.addMockupButtonsPalette();
		this.setCurrentSearchEntryLibrary('mockups', 'mockupContainers');
		this.addMockupContainersPalette();
		this.setCurrentSearchEntryLibrary('mockups', 'mockupForms');
		this.addMockupFormsPalette();
		this.setCurrentSearchEntryLibrary('mockups', 'mockupGraphics');
		this.addMockupGraphicsPalette();
		this.setCurrentSearchEntryLibrary('mockups', 'mockupMarkup');
		this.addMockupMarkupPalette();
		this.setCurrentSearchEntryLibrary('mockups', 'mockupMisc');
		this.addMockupMiscPalette();
		this.setCurrentSearchEntryLibrary('mockups', 'mockupNavigation');
		this.addMockupNavigationPalette();
		this.setCurrentSearchEntryLibrary('mockups', 'mockupText');
		this.addMockupTextPalette();
		this.setCurrentSearchEntryLibrary();
	};
	
	Sidebar.prototype.addMockupButtonsPalette = function()
	{
		var s = mxConstants.STYLE_VERTICAL_LABEL_POSITION + '=bottom;shadow=0;dashed=0;align=center;html=1;' + mxConstants.STYLE_VERTICAL_ALIGN + '=top;strokeWidth=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.mockup.";
		var s2 = mxConstants.STYLE_STROKEWIDTH + '=1;shadow=0;dashed=0;align=center;html=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.mockup.";
		var s3 = mxConstants.STYLE_VERTICAL_LABEL_POSITION + '=top;shadow=0;dashed=0;align=center;html=1;' + mxConstants.STYLE_VERTICAL_ALIGN + '=bottom;strokeWidth=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.mockup.";
		var inh = 'strokeColor=inherit;fillColor=inherit;gradientColor=inherit;';

		// Space savers
		var skcl6 = mxConstants.STYLE_STROKECOLOR + '=#666666;';
		var skcl9 = mxConstants.STYLE_STROKECOLOR + '=#999999;';
		var skclN = mxConstants.STYLE_STROKECOLOR + '=none;';
		var sb = this;
		var gn = 'mxgraph.mockup.buttons';
		var dt = 'mockup button ';
		
		var fns =
		[
			this.createVertexTemplateEntry(s2 + 'buttons.button;' + skcl6 + 'fontColor=#ffffff;mainText=;buttonStyle=round;fontSize=17;fontStyle=1;fillColor=#008cff;whiteSpace=wrap;',
										150, 50, 'Button Text', 'Button', null, null, this.getTagsForStencil(gn, 'button', dt).join(' ')),

			this.addEntry(dt + 'formatted multibutton multi', function()
			{
			   	var bg = new mxCell('', new mxGeometry(0, 0, 150, 50), s2 + 'buttons.multiButton;fillColor=#008cff;strokeColor=#666666;mainText=;subText=;');
			   	bg.vertex = true;
			   	var button1 = new mxCell('Main Text', new mxGeometry(0, 8, 150, 20), s2 + 'anchor;fontSize=16;fontColor=#ffffff;fontStyle=1;whiteSpace=wrap;');
			   	button1.vertex = true;
			   	bg.insert(button1);
			   	var button2 = new mxCell('Sub Text', new mxGeometry(0, 30, 150, 10), s2 + 'anchor;fontSize=12;fontColor=#ffffff;fontStyle=1;whiteSpace=wrap;');
			   	button2.vertex = true;
			   	bg.insert(button2);

			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Formatted Button');
			}),
			
			this.addEntry(dt + 'horizontal bar', function()
			{
			   	var bg = new mxCell('', new mxGeometry(0, 0, 500, 50), s2 + 'rrect;rSize=10;fillColor=#ffffff;strokeColor=#666666;');
			   	bg.vertex = true;
			   	var button2 = new mxCell('Button 2', new mxGeometry(0, 0, 125, 50), inh + s2 + 'rrect;rSize=0;fontSize=17;fontColor=#666666;fontStyle=1;resizeHeight=1;whiteSpace=wrap;');
			   	button2.geometry.relative = true;
			   	button2.geometry.offset = new mxPoint(125, 0);
			   	button2.vertex = true;
			   	bg.insert(button2);
			   	var button3 = new mxCell('Button 3', new mxGeometry(0, 0, 125, 50), inh + s2 + 'rrect;rSize=0;fontSize=17;fontColor=#666666;fontStyle=1;resizeHeight=1;whiteSpace=wrap;');
			   	button3.geometry.relative = true;
			   	button3.geometry.offset = new mxPoint(250, 0);
			   	button3.vertex = true;
			   	bg.insert(button3);
			   	var button4 = new mxCell('Button 4', new mxGeometry(1, 0, 125, 50), inh + s2 + 'rightButton;rSize=10;fontSize=17;fontColor=#666666;fontStyle=1;resizeHeight=1;whiteSpace=wrap;');
			   	button4.geometry.relative = true;
			   	button4.geometry.offset = new mxPoint(-125, 0);
			   	button4.vertex = true;
			   	bg.insert(button4);
			   	var button1 = new mxCell('Button 1', new mxGeometry(0, 0, 125, 50), s2 + 'leftButton;rSize=10;fontSize=17;fontColor=#ffffff;fontStyle=1;fillColor=#008cff;strokeColor=#008cff;resizeHeight=1;whiteSpace=wrap;');
			   	button1.geometry.relative = true;
			   	button1.vertex = true;
			   	bg.insert(button1);

			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Horizontal Button Bar');
			}),				
				
			this.addEntry(dt + 'vertical bar', function()
			{
			   	var bg = new mxCell('', new mxGeometry(0, 0, 120, 200), s2 + 'rrect;rSize=10;strokeColor=#666666;');
			   	bg.vertex = true;
			   	var button2 = new mxCell('Button 2', new mxGeometry(0, 0, 120, 50), inh + s2 + 'rrect;rSize=0;fontSize=17;fontColor=#666666;fontStyle=1;resizeWidth=1;whiteSpace=wrap;');
			   	button2.geometry.relative = true;
			   	button2.geometry.offset = new mxPoint(0, 50);
			   	button2.vertex = true;
			   	bg.insert(button2);
			   	var button3 = new mxCell('Button 3', new mxGeometry(0, 0, 120, 50), inh + s2 + 'rrect;rSize=0;fontSize=17;fontColor=#666666;fontStyle=1;resizeWidth=1;whiteSpace=wrap;');
			   	button3.geometry.relative = true;
			   	button3.geometry.offset = new mxPoint(0, 100);
			   	button3.vertex = true;
			   	bg.insert(button3);
			   	var button4 = new mxCell('Button 4', new mxGeometry(0, 1, 120, 50), inh + s2 + 'bottomButton;rSize=10;fontSize=17;fontColor=#666666;fontStyle=1;resizeWidth=1;whiteSpace=wrap;');
			   	button4.geometry.relative = true;
			   	button4.geometry.offset = new mxPoint(0, -50);
			   	button4.vertex = true;
			   	bg.insert(button4);
			   	var button1 = new mxCell('Button 1', new mxGeometry(0, 0, 120, 50), s2 + 'topButton;rSize=10;fontSize=17;fontColor=#ffffff;fontStyle=1;fillColor=#008cff;strokeColor=#008cff;resizeWidth=1;whiteSpace=wrap;');
			   	button1.geometry.relative = true;
			   	button1.vertex = true;
			   	bg.insert(button1);

			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Vertical Button Bar');
			}),				
				
			this.createVertexTemplateEntry(s2 + 'buttons.onOffButton;gradientColor=none;' + skcl9 + 'buttonState=on;fillColor2=#008cff;fontColor=#ffffff;fontSize=17;mainText=;spacingRight=40;fontStyle=1;whiteSpace=wrap;',
					150, 50, 'ON', 'On-off button', null, null, this.getTagsForStencil(gn, 'onOffButton', dt + 'on off').join(' '))
		];
			
		this.addPalette('mockupButtons', 'Mockup Buttons', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};
	
	Sidebar.prototype.addMockupContainersPalette = function()
	{
		var s = mxConstants.STYLE_VERTICAL_LABEL_POSITION + '=bottom;shadow=0;dashed=0;align=center;html=1;' + mxConstants.STYLE_VERTICAL_ALIGN + '=top;strokeWidth=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.mockup.";
		var s2 =mxConstants.STYLE_STROKEWIDTH + '=1;shadow=0;dashed=0;align=center;html=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.mockup.";
		var s3 = mxConstants.STYLE_VERTICAL_LABEL_POSITION + '=top;shadow=0;dashed=0;align=center;html=1;' + mxConstants.STYLE_VERTICAL_ALIGN + '=bottom;strokeWidth=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.mockup.";
		var inh = 'strokeColor=inherit;fillColor=inherit;gradientColor=inherit;';

		// Space savers
		var skcl6 = mxConstants.STYLE_STROKECOLOR + '=#666666;';
		var skcl9 = mxConstants.STYLE_STROKECOLOR + '=#999999;';
		var skclN = mxConstants.STYLE_STROKECOLOR + '=none;';
		var sb = this;
		
		var gn = 'mxgraph.mockup.containers';
		var dt = 'mockup container ';

		var fns =
		[
			this.createVertexTemplateEntry(s + 'containers.videoPlayer;' + skcl6 + 'strokeColor2=#008cff;strokeColor3=#c4c4c4;textColor=#666666;fillColor2=#008cff;barHeight=30;barPos=20;',
										300, 200, '', 'Video Player', null, null, this.getTagsForStencil(gn, 'videoPlayer', dt).join(' ')),
										
			this.addEntry(dt + 'accordion', function()
			{
			   	var bg = new mxCell('', new mxGeometry(0, 0, 100, 220), s2 + 'containers.rrect;rSize=0;strokeColor=#666666;');
			   	bg.vertex = true;
			   	var button1 = new mxCell('Group 1', new mxGeometry(0, 0, 100, 26), inh + s2 + 'containers.rrect;rSize=0;fontSize=17;fontColor=#666666;fontStyle=1;resizeWidth=1;whiteSpace=wrap;');
			   	button1.geometry.relative = true;
			   	button1.vertex = true;
			   	bg.insert(button1);
			   	var button2 = new mxCell('Group 2', new mxGeometry(0, 0, 100, 26), inh + s2 + 'containers.rrect;rSize=0;fontSize=17;fontColor=#666666;fontStyle=1;resizeWidth=1;whiteSpace=wrap;');
			   	button2.geometry.relative = true;
			   	button2.geometry.offset = new mxPoint(0, 26);
			   	button2.vertex = true;
			   	bg.insert(button2);
			   	var button3 = new mxCell('Group 3', new mxGeometry(0, 0, 100, 26), s2 + 'containers.rrect;rSize=0;fontSize=17;fontColor=#ffffff;fontStyle=1;fillColor=#008cff;strokeColor=#008cff;resizeWidth=1;whiteSpace=wrap;');
			   	button3.geometry.relative = true;
			   	button3.geometry.offset = new mxPoint(0, 52);
			   	button3.vertex = true;
			   	bg.insert(button3);
			   	var button4 = new mxCell('Group 4', new mxGeometry(0, 1, 100, 26), inh + s2 + 'containers.rrect;rSize=0;fontSize=17;fontColor=#666666;fontStyle=1;resizeWidth=1;whiteSpace=wrap;');
			   	button4.geometry.relative = true;
			   	button4.geometry.offset = new mxPoint(0, -26);
			   	button4.vertex = true;
			   	bg.insert(button4);

		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Accordion');
			}),				
				
			this.addEntry(dt + 'browser window', function()
			{
			   	var bg = new mxCell('', new mxGeometry(0, 0, 550, 380), s2 + 'containers.browserWindow;rSize=0;strokeColor=#666666;strokeColor2=#008cff;strokeColor3=#c4c4c4;mainText=,;recursiveResize=0;');
			   	bg.vertex = true;
			   	var button1 = new mxCell('Page 1', new mxGeometry(60, 12, 110, 26), s2 + 'containers.anchor;fontSize=17;fontColor=#666666;align=left;whiteSpace=wrap;');
			   	button1.vertex = true;
			   	bg.insert(button1);
			   	var button2 = new mxCell('https://www.draw.io', new mxGeometry(130, 60, 250, 26), s2 + 'containers.anchor;rSize=0;fontSize=17;fontColor=#666666;align=left;');
			   	button2.vertex = true;
			   	bg.insert(button2);

		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Browser Window');
			}),

		   	this.createVertexTemplateEntry(s + 'containers.userMale;' + skcl6 + 'strokeColor2=#008cff;',
										100, 100, '', 'User, Male', null, null, this.getTagsForStencil(gn, 'userMale', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'containers.userFemale;' + skcl6 + 'strokeColor2=#008cff;',
										100, 100, '', 'User, Female', null, null, this.getTagsForStencil(gn, 'userFemale', dt).join(' ')),
					
			this.addEntry(dt + 'group', function()
			{
				var area1 = new mxCell('', new mxGeometry(0, 0, 150, 200), 'shape=mxgraph.mockup.containers.marginRect;rectMarginTop=10;strokeColor=#666666;strokeWidth=1;dashed=0;rounded=1;arcSize=5;recursiveResize=0;html=1;whiteSpace=wrap;');
				area1.vertex = true;
				var button1 = new mxCell('Group', new mxGeometry(5, 0, 90, 30), 'shape=rect;strokeColor=none;fillColor=#008cff;strokeWidth=1;dashed=0;rounded=1;arcSize=20;fontColor=#ffffff;fontSize=17;spacing=2;spacingTop=-2;align=left;autosize=1;spacingLeft=4;resizeWidth=0;resizeHeight=0;perimeter=none;html=1;whiteSpace=wrap;');
				button1.vertex = true;
				area1.insert(button1);
				
				return sb.createVertexTemplateFromCells([area1], 150, 200, 'Group');
			}),
			
			this.createVertexTemplateEntry(s2 + 'containers.window;align=left;verticalAlign=top;spacingLeft=8;strokeColor2=#008cff;strokeColor3=#c4c4c4;fontColor=#666666;mainText=;fontSize=17;labelBackgroundColor=none;whiteSpace=wrap;',
										550, 380, 'Window Title', 'Window', null, null, this.getTagsForStencil(gn, 'window', dt).join(' ')),
										
			this.addEntry(dt + 'horizontal tab bar', function()
			{
			   	var bg = new mxCell('', new mxGeometry(0, 0, 400, 200), s2 + 'containers.marginRect2;rectMarginTop=32;strokeColor=#666666;gradientColor=none;whiteSpace=wrap;');
			   	bg.vertex = true;
			   	var button1 = new mxCell('Tab 1', new mxGeometry(0, 0, 60, 25), inh + s2 + 'containers.rrect;rSize=0;fontSize=17;fontColor=#666666;gradientColor=none;');
			   	button1.geometry.relative = true;
			   	button1.geometry.offset = new mxPoint(10, 0);
			   	button1.vertex = true;
			   	bg.insert(button1);
			   	var button2 = new mxCell('Tab 2', new mxGeometry(0, 0, 60, 25), s2 + 'containers.rrect;rSize=0;fontSize=17;fontColor=#ffffff;strokeColor=#008cff;fillColor=#008cff;');
			   	button2.geometry.relative = true;
			   	button2.geometry.offset = new mxPoint(75, 0);
			   	button2.vertex = true;
			   	bg.insert(button2);
			   	var button3 = new mxCell('Tab 3', new mxGeometry(0, 0, 60, 25), inh + s2 + 'containers.rrect;rSize=0;fontSize=17;fontColor=#666666;gradientColor=none;');
			   	button3.geometry.relative = true;
			   	button3.geometry.offset = new mxPoint(140, 0);
			   	button3.vertex = true;
			   	bg.insert(button3);
			   	var bg2 = new mxCell('', new mxGeometry(0, 0, 400, 7), s2 + 'containers.topButton;rSize=5;strokeColor=#008cff;fillColor=#008cff;gradientColor=none;resizeWidth=1;movable=0;deletable=1;');
			   	bg2.vertex = true;
			   	bg2.geometry.relative = true;
			   	bg2.geometry.offset = new mxPoint(0, 25);
			   	bg.insert(bg2);
	
		   		return sb.createVertexTemplateFromCells([bg], 400, 200, 'Horizontal Tab Bar');
			}),										
										
			this.addEntry(dt + 'vertical tab bar', function()
			{
			   	var bg = new mxCell('', new mxGeometry(0, 0, 400, 200), s2 + 'containers.marginRect2;rectMarginLeft=67;strokeColor=#666666;gradientColor=none;whiteSpace=wrap;');
			   	bg.vertex = true;
			   	var button1 = new mxCell('Tab 1', new mxGeometry(0, 0, 60, 25), inh + s2 + 'containers.rrect;rSize=0;fontSize=17;fontColor=#666666;');
			   	button1.geometry.relative = true;
			   	button1.geometry.offset = new mxPoint(0, 10);
			   	button1.vertex = true;
			   	bg.insert(button1);
			   	var button2 = new mxCell('Tab 2', new mxGeometry(0, 0, 60, 25), s2 + 'containers.rrect;rSize=0;fontSize=17;fontColor=#ffffff;strokeColor=#008cff;fillColor=#008cff;');
			   	button2.geometry.relative = true;
			   	button2.geometry.offset = new mxPoint(0, 40);
			   	button2.vertex = true;
			   	bg.insert(button2);
			   	var button3 = new mxCell('Tab 3', new mxGeometry(0, 0, 60, 25), inh + s2 + 'containers.rrect;rSize=0;fontSize=17;fontColor=#666666;');
			   	button3.geometry.relative = true;
			   	button3.geometry.offset = new mxPoint(0, 70);
			   	button3.vertex = true;
			   	bg.insert(button3);
			   	var bg2 = new mxCell('', new mxGeometry(0, 0, 7, 200), s2 + 'containers.leftButton;rSize=5;strokeColor=#008cff;fillColor=#008cff;resizeHeight=1;movable=0;deletable=0;');
			   	bg2.geometry.relative = true;
			   	bg2.geometry.offset = new mxPoint(60, 0);
			   	bg2.vertex = true;
			   	bg.insert(bg2);
				
		   		return sb.createVertexTemplateFromCells([bg], 400, 200, 'Vertical Tab Bar');
			}),				
				
			this.addDataEntry(dt + 'dialog box', 250, 140, 'Dialog Box',
				'7ZZNj5swEIZ/jY+LwA7Z7bFL2j20VStlpZ5dGMBag5FxEtJf3wE7CeGjok0rraoSRbLHnvF4ntcGwqKiedK8yj+pBCRh7wiLtFLGtoomAikJ9UVC2IZQ6uOf0Pczo0E36ldcQ2mWOFDrsOdyB9ayVQWgJYGU76QhdE0oC3zCHhPBpcp6BgON8ax/bY7S+ddGqxf4KhKToyHAeXXOE3XATheF1zkkrsOlyEpsx5gtaDTkppAXr6oNWTRZWx2vUPHLrvJiVRouStC1pzXEuMlHvRXfwUW0q0dKKt2lw9bdgyMpOs7ZXYDgHvt70EbEXL51uRlVofWQCwPbisftvAMm1HoKKXsR0+5pc8BposyeW8cNo2hxRcbI0MyC6kyO0hMgBaOPOOXgKtnCCi1MPweR5Se3lTPy2hqys++FOzYc+mkZsJEMNo62/ywMon1dlIfM5tjOq+GUk4TUXJB97HqbhwHcUpXQZgA1rtnf85QqFrGmv8eaOZsGyY3Yw1X8W/ivRvzHxB0pdBRVDVPV9f2HuDsBXaX4N3nmNS5mTwOLKsamK3btcHRXnhfafr+eE+Wkv1pOt/4XJTCt8+J3NLxa/i4YnEiVpjWYEY/zNhYhCkeIIl7G+MZ4vUfzZ9fuSDzxqv0tuGqdgG45Z81JJwNywUg2b6ZkE/4Z2awGsmHsL8hmPZLN5w//JXODZO7/Nclg9/K9aaf3P0d/AA=='),
			this.addDataEntry(dt + 'dialog box', 250, 160, 'Dialog Box',
				'zVbBbqMwEP0aH4vALmmv22S3h92qlVJpz14YwKrByHYS0q/fAUyAAFW62UOJInkenvH4vWcLwtZ59ah5mT2pGCRh3wlba6VsO8qrNUhJqC9iwjaEUh//hP5YeBs0b/2SayjsJQm0TdhzuYMW2aocEIkh4TtpCV0RygKfsIccjOEpDBALlfXaAsYepStgrFZv8FvENkMgwHkm47E6YFAnxdxkELuAS5EWOI6wXdAIZDaXfVZZl8yrtKbHy1X0tiu9SBWWiwK08bSGCHf5oLfiHVzFdvW1kko37bBV8+CbBBOXcFcguMN4D9qKiMtvrjerSkQPmbCwLXlUzztgQ3WmkHJQMWmeugecJor0tU7cMIqIYxkrQ7WoVAM5mR4BZbD6iFMOjslarbBV089ApFmXtnIgNy2QnnJ74XHgtJ/3AZv44KmT238VFrX9WjKfi7Yk7rIdup4kJLbX7FcTbe4/UFeDwYWHG5/zxkWK039TnDlMg+RW7GFU/xoX3E5cMJXdyYWJojQwR7Hv30c9U/yPPIk2YLRQBYyNcBFjbJ6xccLR3Xxe2MZDPmfopJ+l063/ogS2dVr8hoaj5W+Cs3OpksSAnehx2sZFEoUTiZ5/fuGz+dHFOzFOdFv/Zozzmcv3moNXnRnnOCowsFEw66Pw//iou887HzF2vY8w7D8q2unDb46/')
		];
	
		this.addPalette('mockupContainers', 'Mockup Containers', false, mxUtils.bind(this, function(content)
				{
					for (var i = 0; i < fns.length; i++)
					{
						content.appendChild(fns[i](content));
					}
		}));
	};
	
	Sidebar.prototype.addMockupFormsPalette = function()
	{
		var s = mxConstants.STYLE_VERTICAL_LABEL_POSITION + '=bottom;shadow=0;dashed=0;align=center;html=1;' + mxConstants.STYLE_VERTICAL_ALIGN + '=top;strokeWidth=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.mockup.";
		var s2 =mxConstants.STYLE_STROKEWIDTH + '=1;shadow=0;dashed=0;align=center;html=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.mockup.";
		var s3 = mxConstants.STYLE_VERTICAL_LABEL_POSITION + '=top;shadow=0;dashed=0;align=center;html=1;' + mxConstants.STYLE_VERTICAL_ALIGN + '=bottom;strokeWidth=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.mockup.";
		var inh = 'strokeColor=inherit;fillColor=inherit;gradientColor=inherit;';

		// Space savers
		var skcl6 = mxConstants.STYLE_STROKECOLOR + '=#666666;';
		var skcl9 = mxConstants.STYLE_STROKECOLOR + '=#999999;';
		var skclN = mxConstants.STYLE_STROKECOLOR + '=none;';
		var sb = this;
		
		var gn = 'mxgraph.mockup.forms';
		var dt = 'mockup form ';

		var fns =
		[
			this.createVertexTemplateEntry(s2 + 'forms.rrect;rSize=0;fillColor=#eeeeee;strokeColor=#999999;gradientColor=#cccccc;align=left;spacingLeft=4;fontSize=17;fontColor=#666666;labelPosition=right;', 15, 15, 
					'Option 1', 'Checkbox', null, null, this.getTagsForStencil(gn, 'checkbox', dt).join(' ')),
			this.addDataEntry(dt + 'checkbox checkboxes', 150, 120, 'Checkboxes',
				'7VZNb8IwDP01uValKV9XYOOyadN22DmkbhuRNlUSoOzXL00yvtZOSGgMabOEFD/32Yn9GorwtKjnklT5o0iAI3yH8FQKod2qqKfAOYpCliA8Q1EUmh+K7juiPRsNKyKh1OcQIkdYE74ChzhA6S33gNJSLOGNJTo3QA/hicpJIjbGCY2TEJVD4h3CWVaaNTXlQRog1wXfs6omZVFnzXGDQtDlqgpSIQsVSAnUbHgiX9k7+GSu8FRwIe1O8NiaiaSM8wM8tdawga6kYmt4AbXP448IUkPd2SYL+R7NQRSg5dY8svHHbp7ou1aGObAs/6T5/oZEOSDbcfddNwvf+PYh4C9DeKo0E6XBerczjpOmg7Vvx2QSJ8yUPohRawdb45A2hVRFKCuzB+vN4qacKLWv3ht6/yDRwJrBOVkAfxaK2Y7hmXTDOW/qUfvUPWHkCFvnDYO+84800SKJ/uWKiLsVcUMv6F9XBL6mJPrdksC/IwmaA10uRH2iCtncvWTBO1RCrLWpJLbWrpLdcC9VSRiOqP2vuJpKBtdUyaBbJfH/xXErF8f4ByVh3P3no40dfV1+AA=='),
			
			this.createVertexTemplateEntry('shape=ellipse;fillColor=#eeeeee;strokeColor=#999999;gradientColor=#cccccc;html=1;align=left;spacingLeft=4;fontSize=17;fontColor=#666666;labelPosition=right;shadow=0;', 15, 15, 
					'Setting 1', 'Radiobutton', null, null, this.getTagsForStencil(gn, 'radiobutton radio button', dt).join(' ')),
			this.addDataEntry(dt + 'radiobutton radio button group', 150, 120, 'Radiobutton Group',
				'7ZbJboMwEIafhmtEcMhyTdrm0kpVc+jZhQlYMRjZztan72A7C4Eg1LQ5ZSQkzwwztv/PLB6ZZbu5pEX6JmLgHnn2yEwKoe0o282Acy/wWeyRJy8IfLy84OVKtm+yfkEl5LpLQWALNpSvwUZsQOk9dwGlpVjBJ4t1ioG+R6YqpbHYouOjE1OVQuwcylmS4zjC6UFiINUZP1UVZctsl5Tb7WUiWq2L3lLITPWkhAgXPJUL9g2umZ14JriQZiVkYgwzS8b5WXxprKyGaC0V28AHqFMft0WQGnZXZTIhp9EcRAZa7vGWrdt2eUdopfRTYEl6KHP6+lTZQHKsPamOAyd8MwRSg7AArVmeYLBf5+F0xB6sUHAh2oU0YKxVTKQRM9ThLBcZq+I7oOWwLEGpgka4wlfjPQ3KmUWu3UL6I+ef9RwawzinX8DfhWKaibKhtGp2wxQ0Y3IFY1uwt96oF1q/ArGBYXg7wkELwoZH6oGwG0JyT4ZhC0NyG0NqrInhwFgzw6Pef8jQ98eReVfejeHwngyHHb5nNXAXsI5IqrBykUOVRSepwlapSPW413Sa1GWa3K7SqOWkDx5vq9+e9Mk/nnR0T3+FJlf5afwB'),
			
			this.createVertexTemplateEntry(s + 'forms.colorPicker;chosenColor=#aaddff;', 40, 40, '', 'Color Picker', null, null, this.getTagsForStencil(gn, 'colorPicker', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'forms.comboBox;' + skcl9 + mxConstants.STYLE_FILLCOLOR + '=#ddeeff;align=left;fillColor2=#aaddff;mainText=;fontColor=#666666;fontSize=17;spacingLeft=3;',
										150, 30, 'Option 1', 'Combo Box', null, null, this.getTagsForStencil(gn, 'comboBox', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'forms.spinner;' + skcl9 + 'spinLayout=right;spinStyle=normal;adjStyle=triangle;fillColor=#aaddff;fontSize=17;fontColor=#666666;mainText=;html=1;overflow=fill;',
										150, 60, 
										'<table cellpadding="0" cellspacing="0" style="width:100%;height:100%;">' +
										'<tr>' +
										'<td style="width:85%">100</td>' +
										'<td style="width:15%"></td>' +
										'</tr>' +
										'</table>', 
										'Spinner', null, null, this.getTagsForStencil(gn, 'spinner', dt).join(' ')),
										
			this.addEntry(dt + 'menu bar', function()
			{
			   	var bg = new mxCell('', new mxGeometry(0, 0, 498, 30), s2 + 'forms.rrect;rSize=0;strokeColor=#999999;');
			   	bg.vertex = true;
			   	var button1 = new mxCell('File', new mxGeometry(0, 0, 83, 30), inh + s2 + 'forms.rrect;rSize=0;fontSize=17;fontColor=#666666;whiteSpace=wrap;');
			   	button1.vertex = true;
			   	bg.insert(button1);
			   	var button2 = new mxCell('Edit', new mxGeometry(83, 0, 83, 30), inh + s2 + 'forms.rrect;rSize=0;fontSize=17;fontColor=#666666;whiteSpace=wrap;');
			   	button2.vertex = true;
			   	bg.insert(button2);
			   	var button3 = new mxCell('Options', new mxGeometry(166, 0, 83, 30), inh + s2 + 'forms.rrect;rSize=0;fontSize=17;fontColor=#666666;whiteSpace=wrap;');
			   	button3.vertex = true;
			   	bg.insert(button3);
			   	var button4 = new mxCell('Tools', new mxGeometry(249, 0, 83, 30), inh + s2 + 'forms.rrect;rSize=0;fontSize=17;fontColor=#666666;whiteSpace=wrap;');
			   	button4.vertex = true;
			   	bg.insert(button4);
			   	var button5 = new mxCell('Window', new mxGeometry(332, 0, 83, 30), inh + s2 + 'forms.rrect;rSize=0;fontSize=17;fontColor=#666666;whiteSpace=wrap;');
			   	button5.vertex = true;
			   	bg.insert(button5);
			   	var button6 = new mxCell('Help', new mxGeometry(415, 0, 83, 30), inh + s2 + 'forms.rrect;rSize=0;fontSize=17;fontColor=#666666;whiteSpace=wrap;');
			   	button6.vertex = true;
			   	bg.insert(button6);
				
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Menu Bar');
			}),				
				
			this.createVertexTemplateEntry(s + 'forms.horSlider;' + skcl9 + 'sliderStyle=basic;sliderPos=20;handleStyle=circle;fillColor2=#ddeeff;',
										150, 30, '', 'Horizontal Slider', null, null, this.getTagsForStencil(gn, 'horSlider', dt + 'horizontal').join(' ')),
			this.createVertexTemplateEntry(s + 'forms.horSlider;' + skcl9 + 'sliderStyle=basic;sliderPos=20;handleStyle=circle;fillColor2=#ddeeff;direction=north;',
										30, 150, '', 'Vertical Slider', null, null, this.getTagsForStencil(gn, 'horSlider', dt + 'vertical').join(' ')),
			this.addDataEntry(dt + 'list box', 150, 200, 'List Box',
				'7VddS8MwFP01fXRkiXPu1U2HoCBM8Dm0t01Y2pQk7sNf720SXOesDNlwygKF3JPc3OScQ0ITNi5XU8Nr8agzUAm7TdjYaO1Cr1yNQamEEpklbJJQSvBL6F3HaN+PkpobqNw+CTQkLLh6hYAEwLq1ioB1Rs/hRWZOINBP2I0VPNNLDAgGGbcCshhwJYsK+ymWB4OAcKXaZNXNkuWqaI7bK3U6f617uTal7RkDKW74xszkG8TFQuGxVtr4nbCRbziSS6VaeO4b4vEwYBysOgnxUGRjCroEZ9Y4ZRkP2MwYBNKIAFmImEZJBLkNQPGRu+EXO5Hir+lmO3Q/S4dE/wXOdeVaOCHXqee8weMC/eE32hiwOKt9pKWQDmY1T5vcJe5vXwXpzxRkETOguJML2Fr/K1VjiSctsTIl6zDj4lOGznMLbscFHxvbyxiXO8a4d1Ai0v8db/AqFY2Eu/Ju2+DKt1YlBXnjKYuyyqp48NFkcBL608Poz8gR9B906f9L9/FZ/079B8fQ/6pLf3Y6b8PBrPDpicgyAP9EbD8+la7gP/lmeAzfDLt8c3m+N05M/9EB9Mdw828Qprd/Hd4B'),
	
			this.createVertexTemplateEntry(s2 + 'forms.pwField;' + skcl9 + 'mainText=;align=left;fontColor=#666666;fontSize=17;spacingLeft=3;', 150, 30, '********', 'Password Field', null, null, this.getTagsForStencil(gn, 'pwField', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'forms.splitter;' + skcl9, 350, 10, '', 'Horizontal Splitter', null, null, this.getTagsForStencil(gn, 'splitter', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'forms.splitter;' + skcl9 + mxConstants.STYLE_DIRECTION + '=' + mxConstants.DIRECTION_NORTH + ';', 10, 350, '', 'Vertical Splitter', null, null, this.getTagsForStencil(gn, 'splitter', dt).join(' ')),

			this.addEntry(dt + 'wedge bar', function()
			{
			   	var button1 = new mxCell('Tab 1', new mxGeometry(10, 0, 70, 30), s2 + 'forms.uRect;fontSize=17;fontColor=#666666;align=left;spacingLeft=5;strokeColor=#666666;');
			   	button1.vertex = true;
			   	var button2 = new mxCell('Tab 2', new mxGeometry(85, 0, 70, 30), s2 + 'forms.uRect;fontSize=17;fontColor=#ffffff;align=left;spacingLeft=5;strokeColor=#008cff;fillColor=#008cff;');
			   	button2.vertex = true;
			   	var button3 = new mxCell('Tab 3', new mxGeometry(160, 0, 70, 30), s2 + 'forms.uRect;fontSize=17;fontColor=#666666;align=left;spacingLeft=5;strokeColor=#666666;');
			   	button3.vertex = true;
				
		   		return sb.createVertexTemplateFromCells([button1, button2, button3], 230, 30, 'Wedge Bar');
			}),
			
			this.createVertexTemplateEntry(s + 'menus_and_buttons.font_style_selector_1;', 136, 31, '', 'Formatting Toolbar 1', null, null, this.getTagsForStencil('mxgraph.mockup.menus_and_buttons', 'font_style_selector_1', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'menus_and_buttons.font_style_selector_2;', 235, 31, '', 'Formatting Toolbar 2', null, null, this.getTagsForStencil('mxgraph.mockup.menus_and_buttons', 'font_style_selector_2', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'menus_and_buttons.font_style_selector_3;', 176, 38, '', 'Formatting Toolbar 3', null, null, this.getTagsForStencil('mxgraph.mockup.menus_and_buttons', 'font_style_selector_3', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'forms.searchBox;' + skcl9 + 'mainText=;strokeColor2=#008cff;fontColor=#666666;fontSize=17;align=left;spacingLeft=3;whiteSpace=wrap;',
										150, 30, 'Search', 'Search Box', null, null, this.getTagsForStencil(gn, 'searchBox', dt).join(' ')),
			this.addDataEntry(dt + 'sign in', 200, 300, 'Sign In',
				'7Vhtb9owEP41+TIJ5DgkLR8HG6jShpBQtc8uubysTowct8B+/RzHQILDFmm4TScsRYrPOft8z3N3sR1vmu3mnGyS7ywE6nhfHW/KGRPVW7abAqUORmnoeF8cjJF8HDy7MOqqUbQhHHLRRQFXCq+EvkAlqQSF2FMtKARnz/AjDUUiBa7jTYqEhGwrO0h2QlIkEOoOoWmcy/e1XB64FCQioyetTTlltovL7Q4ztn5+2QwjxrNiyDmspcETvkp/gZ6sWnjKKOPKEm+smhyJUkpr8kg1KdebAS5gd9EhSqS9MQeWgeB7+clWb7B0CqqchhJI40SreQchKSpBfNQ9+Ve+aBe3u9sz3L0qHYbRQ/4+fif5OindOIlYLrTvXaz7NRcHqtVWohApvKCQSg0jN2Sd5vE3Na6M64QK/isqbhsqmt6IAyUifYXG/G1I6SWWLJUrY3QwSE+zb3YPE7AoKkAYQB/t7IT9qEOoaahomkNbAIQhgCJ6kxu4CbiJybUQuG9BwLWCgGcDAd9A4LGQ0YLRgmRS8PkWgv0JwZENAgQGAX6yJA8ZfIii140OTfB9q/nAb6ODb4MOgQ063Bl0WJKi2DIe3pJBr5LB2LeA/r2B/ifdbtmg59nAdW0QYmwQYvUwX5Q/54t+MMI3GJEz9aN4RobjeejsnBQET0+VvJZcgkNfb+5fGbFvKNT40fbz6F0nXeAmPQZHKl6VHwcS1ggyYzxmpSGnwjHrd+Eo04fiwB8TBTojxejqieMiTdrTiJWyMnCtHPRc1+CJyYkenvQuQ/J2577B2Aoi5jXXArZSUJ3/+hyv3Qo7+j/j884KGVou4ao6/7i81fkPVeevUeZl93TdXn1ev43/DQ=='),
			this.addDataEntry(dt + 'calendar date', 160, 175, 'Calendar',
				'7Zxdc6IwFIZ/DbdOPkDktu62V529cGd6zUoUp2CcSLe6v37Dh7bm0K2dLjk2kRlnIBCF9wnkvMmRgE/L3Z1KN/m9zEQR8O8Bnyopq3at3E1FUQSMrLKAfwsYI/oTsNs39tJmL9mkSqyrcyqwtsLvtHgSbUlbsK32RVewrZR8FA+rrMp1AQ34zTZPM/msN4jeyNJtLrJuIy1Wy7Ven+ufF0oX5FVZvNTa1F9Z7pb15Y5KOX982owWUpXbkVJirk/4Rs1Wf+qDorpC88NTWUjVnAlPmkXvWayK4lX5oll0eXcxQlVi96YgTVGnxp2QpajUXh/y3F1gfcS4FY3kYrXMD9XiqC1Mt23B8lj3RV+90kncLzcHcv+YV/KXlooRRmiII366nue1ljcLua769D5LV9ava1eBd5Lu281Ju/VadNIjetd6P6V52NPEx0V1vCzsph7+u6mfIiFkMm+ael3efQE9HDfrroT+H2STd4ixaBhgUR+w5RXYu8Aoi5GQjQGye+nus4yePsv6dB7oWRYDnX8+uaszR9N5AnR+EO7qHKHpnMD2nLurc4ym8+GJ9UroW+Wu0Ame0BQIPUvdFZridYUUWteZw30hxesMKXStFEdoMxInH4nEB4wAQ4swoJ29kCEbNBgcDwa0qtxzGBEeDGhCkcbTLgZGjAcDOtXIcxgJHgxoZ8eewzADV5s0oOmNfaeB14Uz6IwnvtM4hTG2CAO658RzGBwPBjTYh5bhLY0Ij0aPCffdhcd4NKALP4xHeUsjwaMBbTj13YebAa5NHNCIY2W2XA4OxH4cWnHquxc3bo6JRRrQi1PfzbiZG2aRBvTi1HczHqHR4NCLU9/NeIxHA5px6rsbT/BoQDfOfHfjZoxrEwe049dJcbx+nPfMivvux42bgxKLOKAh935inCPigIbc+9nYGBEHNOTez8cmiDigI79OyGJ2HtCTX6dkEXuPELpy72dlzdvDYjZuCG05990ImneHTRzQl3PfjWCEiMOxXHXjn+5ZJsT5/3T/WARsk5JjSewDUjIDY5uUHMtuH5ASiJdtYnIs731ITJiBgmMZ8UNiMihZTAcO4WDAlx6aGZCSeS/ZpORYCv2AlMxY3CKlCA4cfOlxHIuxuE1KjuXcW4zFbVKCwwxfOxnfZjBuk5Nrafo2o3GbnHpGIC7ZNS0WRC+Q0/HVh6enyiC544vIBggqhpuN0JsvL8Ns9p28K/Mv'),
				
			this.addDataEntry(dt + 'calendar date', 400, 300, 'Email',
				'7VhLU9swEP41vmacOLyOJQEu9FLa6VnI61igF3qQ0F/fXcmGdJzMtAOmh8QzcbyrfX6fV05cVAu1uXHMtl9NDbKoropq4YwJ+UptFiBlMStFXVTLYjYr8VPMrvesTtNqaZkDHf7GYZYdnpmMkDXXzqis9OFFdkofnHmEn6IOLSqmRXXpW1abNQolCjXzLdSdwKRYabzmWAI4VLRByTcvSyHVZkUtT5Thj9FOGuOUnzDNW+O2IjixagN5WcaFXn3L4nKGqsbosDCSzLG+6jQdqO/aARdgsxeSpOrwuAGjILgXNFl37eHqSUatbKHLSV7nWcd8llevnm/44kUH8W64qwHcD6bVxbx8yHjw/4W9c8AJ6kZIuYVrkw7UuzvxC7ok+7Dvk0totli7TdKyIk3qZMv1Ih3vpG3zJ2VbLFZj0Tgf0HgX7x8IwYMcnJce7gEDYxFwMiDgxgEE7PU4Pu8bn/1cjjZNpwMyv5uDHqSz4VY2FvZnA+wbhzgeH0gfPlE7SB1tos4HrC4WBz1R0/Lznk0XA/CPE/QhE7SLxNFGaFoOaLw89CGaf95zaTo9TtFIU7SDxfGmaPh+4dY4UGRifaTvOnWNxIpAyTBFMcO4JTfaI/QQIq2yWljhBU+/8EuQorPyyDDFIKWIXhkSAyibYgrNRS3qqCl0pJNk95ifrEOfmyTFVppRGimeIpvg1Q9aBy1USk4mIgvPqGQqZ3+KwuOXNkhgJCPYgOMisCCMppRSMsVNnzcbYxt9NSmdsMmRTiz1rbAL0yOA5QSqZ5lTsRioXuFiqrsHT1A2B9ZBC7oGl7BMymcjo8WCIJWecCvBexI53tJvFCRQIp6auBKMzDSVn281VERHZVxtONgAMTOWcDWcM+DJg0crahayd0LAOiNqulEzW5mJVBiP0rKMIQVpGiSX5Bo8uGynjMwFswy9SBD7Vx6jmhzkpkDbgeBMfulCBGNRu25FgDsMQ5nXWPQH7fpnw6fuvNy1X/T/yv9hwyjodWP/rjOt/fEq9Dc=')
		];			
		
		this.addPalette('mockupForms', 'Mockup Forms', false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addMockupGraphicsPalette = function()
	{
		var s = mxConstants.STYLE_VERTICAL_LABEL_POSITION + '=bottom;shadow=0;dashed=0;align=center;html=1;' + mxConstants.STYLE_VERTICAL_ALIGN + '=top;strokeWidth=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.mockup.";
		var s2 =mxConstants.STYLE_STROKEWIDTH + '=1;shadow=0;dashed=0;align=center;html=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.mockup.";
		var s3 = mxConstants.STYLE_VERTICAL_LABEL_POSITION + '=top;shadow=0;dashed=0;align=center;html=1;' + mxConstants.STYLE_VERTICAL_ALIGN + '=bottom;strokeWidth=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.mockup.";
		var inh = 'strokeColor=inherit;fillColor=inherit;gradientColor=inherit;';

		// Space savers
		var skcl6 = mxConstants.STYLE_STROKECOLOR + '=#666666;';
		var skcl9 = mxConstants.STYLE_STROKECOLOR + '=#999999;';
		var skclN = mxConstants.STYLE_STROKECOLOR + '=none;';
		var sb = this;
	
		var gn = 'mxgraph.mockup.graphics';
		var dt = 'mockup graphics ';

		var fns =
		[
			this.createVertexTemplateEntry(s + 'graphics.barChart;' + skclN + 'strokeColor2=none;strokeColor3=#666666;fillColor2=#008cff;fillColor3=#dddddd;',
					400, 200, '', 'Bar Chart', null, null, this.getTagsForStencil(gn, 'barChart', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'graphics.columnChart;' + skclN + 'strokeColor2=none;strokeColor3=#666666;fillColor2=#008cff;fillColor3=#dddddd;',
					400, 200, '', 'Column Chart', null, null, this.getTagsForStencil(gn, 'columnChart', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'graphics.lineChart;' + skclN + 'strokeColor2=#666666;strokeColor3=#008cff;strokeColor4=#dddddd;',
					400, 200, '', 'Line Chart', null, null, this.getTagsForStencil(gn, 'lineChart', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'graphics.pieChart;' +  mxConstants.STYLE_STROKECOLOR + '=#008cff;parts=10,20,35;partColors=#e0e0e0,#d0d0d0,#c0c0c0,#b0b0b0,#a0a0a0;strokeWidth=2;',
					200, 200, '', 'Pie Chart', null, null, this.getTagsForStencil(gn, 'pieChart', dt).join(' ')),
			
			this.createVertexTemplateEntry(s + 'graphics.simpleIcon;strokeColor=#999999;', 
					50, 50, '', 'Icon Placeholder', null, null, this.getTagsForStencil(gn, 'simpleIcon', dt + 'icon placeholder').join(' ')),
			this.addDataEntry(dt + 'icon grid placeholder', 200, 200, 'Icon Grid',
				'7ZdRa8MgEMc/ja8licu6Pm7pVgYb7G3PNrFRqjWobdNvv4vadYUVRpv5ZCDg/e9OzvuRCyJcyX6hScfeVUMFws8IV1op61eyr6gQqMh4g/AcFUUGLypeLnhz5806ounG/iWh8Ak7IrbUK14w9iCCsKPa8pqIN7Kk4kMZbrnagGuprFUS4SfDSKP2oGRgNMQw2gSDCN4OoTVUQzUIzEo44jyH5XHbxxBjVTfsZbVa00/eWBbiYPduqET27dCliVT1ettNnMFrMzFcdoK+1kNNIb1SQmlXPJ65BzwrLsQPfeUe0MP5oRjaX+yhk0IDF1RJavUBQvahTPCWvs0Zo7xl9lwjxtvtd+YJCCwCk9/54MTnej4hYVr6jAi47hKum3HlRxAReJWJ1/W8DtE/r/uEa7RpGJ/eNNEbbzjGx/eQ8N08K2P+22aJ19jDMia+PEv8Rh+X/wgQzNO13fnObvVf'),
	
			this.createVertexTemplateEntry(s + 'graphics.bubbleChart;' + skclN + 'strokeColor2=none;strokeColor3=#666666;fillColor2=#008cff;fillColor3=#dddddd;',
										400, 200, '', 'Bubble Chart', null, null, this.getTagsForStencil(gn, 'bubbleChart', dt + 'bubble chart').join(' ')),
			this.addDataEntry(dt + 'gauge', 100, 100, 'Gauge',
				'zZXdT8IwEMD/mr6S0jqVRxnKiya8GJ/LemwN3bp0BcZ/760tXwKRGEGbLblv7n49MsLTsh1bURdvRoIm/Jnw1BrjglS2KWhNGFWS8BFhjOJL2MsZb997aS0sVO6SBBYSlkIvIFiCoXFrHQ1LsE5lQr+KKeiJaZRTpkLX1DhnSsKHTSGkWaGFoiJFU4CMitAq70Iz7AYsGgpX4oijPoqbsk8xxpm6q+WsmcOHkq6IcVi97jop27yj1CtNNl/UPa+orOnlYpGjfzhTWqdGG+u75jN/thX3PAN/0OMzcSA0s6SLxG5CYBMip1MpsQZLUZYSYCMPBlnma/sKnkvISLuHDysAqfd/ktLHkBBp4+jQnr0xb4rXNQZTgrNrDFlFKF0EDbdKC1B54b4YRWiG5dvc3QKgEHfg9D7wo31IJ+8kwcYTkoyOduPkdf1gGb67ZFFlRQdzODOV2wN778+lYNlpsDEBJ/QZ66hGmnvYkxPU2S9AvzuCTv+e9KaIhpm7Mnh6AP4huRn45Aj89k/0H9DbMO012fNbsUd191XzvoOP3ic='),
			
			this.createVertexTemplateEntry(s + 'graphics.plotChart;' + mxConstants.STYLE_STROKECOLOR + '=none;strokeColor2=#aaaaaa;strokeColor3=#666666;fillColor2=#99aaff,#0022ff,#008cff;',
										400, 200, '', 'Plot Chart', null, null, this.getTagsForStencil(gn, 'plotChart', dt + 'plot chart').join(' ')),

			this.addEntry(dt + 'gantt chart', function()
			{
			   	var bg = new mxCell('', new mxGeometry(0, 0, 600, 300), s2 + 'graphics.rrect;rSize=0;strokeColor=#999999;');
			   	bg.vertex = true;
			   	var cell1 = new mxCell('#', new mxGeometry(0, 0, 20, 40), inh + s2 + 'graphics.rrect;rSize=0;fontColor=#666666;');
			   	cell1.vertex = true;
			   	bg.insert(cell1);
			   	var cell2 = new mxCell('Task', new mxGeometry(20, 0, 40, 40), inh + s2 + 'graphics.rrect;rSize=0;fontColor=#666666;');
			   	cell2.vertex = true;
			   	bg.insert(cell2);
			   	var cell3 = new mxCell('Start', new mxGeometry(60, 0, 130, 40), inh + s2 + 'graphics.rrect;rSize=0;fontColor=#666666;');
			   	cell3.vertex = true;
			   	bg.insert(cell3);
			   	var cell4 = new mxCell('Effort', new mxGeometry(190, 0, 50, 40), inh + s2 + 'graphics.rrect;rSize=0;fontColor=#666666;');
			   	cell4.vertex = true;
			   	bg.insert(cell4);
			   	var cell5 = new mxCell('20//10//2014', new mxGeometry(240, 0, 210, 20), inh + s2 + 'graphics.rrect;rSize=0;fontColor=#666666;');
			   	cell5.vertex = true;
			   	bg.insert(cell5);
			   	var cell6 = new mxCell('27//10//2014', new mxGeometry(450, 0, 150, 20), inh + s2 + 'graphics.rrect;rSize=0;fontColor=#666666;');
			   	cell6.vertex = true;
			   	bg.insert(cell6);
			   	var cell7 = new mxCell('M', new mxGeometry(240, 20, 30, 20), inh + s2 + 'graphics.rrect;rSize=0;;fontColor=#666666;');
			   	cell7.vertex = true;
			   	bg.insert(cell7);
			   	var cell8 = new mxCell('T', new mxGeometry(270, 20, 30, 20), inh + s2 + 'graphics.rrect;rSize=0;fontColor=#666666;');
			   	cell8.vertex = true;
			   	bg.insert(cell8);
			   	var cell9 = new mxCell('W', new mxGeometry(300, 20, 30, 20), inh + s2 + 'graphics.rrect;rSize=0;fontColor=#666666;');
			   	cell9.vertex = true;
			   	bg.insert(cell9);
			   	var cell10 = new mxCell('T', new mxGeometry(330, 20, 30, 20), inh + s2 + 'graphics.rrect;rSize=0;fontColor=#666666;');
			   	cell10.vertex = true;
			   	bg.insert(cell10);
			   	var cell11 = new mxCell('F', new mxGeometry(360, 20, 30, 20), inh + s2 + 'graphics.rrect;rSize=0;fontColor=#666666;');
			   	cell11.vertex = true;
			   	bg.insert(cell11);
			   	var cell12 = new mxCell('S', new mxGeometry(390, 20, 30, 20), inh + s2 + 'graphics.rrect;rSize=0;fontColor=#666666;');
			   	cell12.vertex = true;
			   	bg.insert(cell12);
			   	var cell13 = new mxCell('S', new mxGeometry(420, 20, 30, 20), inh + s2 + 'graphics.rrect;rSize=0;fontColor=#666666;');
			   	cell13.vertex = true;
			   	bg.insert(cell13);
			   	var cell14 = new mxCell('M', new mxGeometry(450, 20, 30, 20), inh + s2 + 'graphics.rrect;rSize=0;fontColor=#666666;');
			   	cell14.vertex = true;
			   	bg.insert(cell14);
			   	var cell15 = new mxCell('T', new mxGeometry(480, 20, 30, 20), inh + s2 + 'graphics.rrect;rSize=0;fontColor=#666666;');
			   	cell15.vertex = true;
			   	bg.insert(cell15);
			   	var cell16 = new mxCell('W', new mxGeometry(510, 20, 30, 20), inh + s2 + 'graphics.rrect;rSize=0;fontColor=#666666;');
			   	cell16.vertex = true;
			   	bg.insert(cell16);
			   	var cell17 = new mxCell('T', new mxGeometry(540, 20, 30, 20), inh + s2 + 'graphics.rrect;rSize=0;fontColor=#666666;');
			   	cell17.vertex = true;
			   	bg.insert(cell17);
			   	var cell18 = new mxCell('F', new mxGeometry(570, 20, 30, 20), inh + s2 + 'graphics.rrect;rSize=0;fontColor=#666666;');
			   	cell18.vertex = true;
			   	bg.insert(cell18);
			   	var cell19 = new mxCell('', new mxGeometry(0, 40, 240, 260), inh + s2 + 'graphics.rrect;rSize=0;fontColor=#666666;');
			   	cell19.vertex = true;
			   	bg.insert(cell19);
			   	var cell20 = new mxCell('', new mxGeometry(240, 40, 60, 260), inh + s2 + 'graphics.rrect;rSize=0;fontColor=#666666;');
			   	cell20.vertex = true;
			   	bg.insert(cell20);
			   	var cell21 = new mxCell('', new mxGeometry(300, 40, 60, 260), inh + s2 + 'graphics.rrect;rSize=0;fontColor=#666666;');
			   	cell21.vertex = true;
			   	bg.insert(cell21);
			   	var cell22 = new mxCell('', new mxGeometry(360, 40, 60, 260), inh + s2 + 'graphics.rrect;rSize=0;fontColor=#666666;');
			   	cell22.vertex = true;
			   	bg.insert(cell22);
			   	var cell23 = new mxCell('', new mxGeometry(420, 40, 60, 260), inh + s2 + 'graphics.rrect;rSize=0;fontColor=#666666;');
			   	cell23.vertex = true;
			   	bg.insert(cell23);
			   	var cell24 = new mxCell('', new mxGeometry(480, 40, 60, 260), inh + s2 + 'graphics.rrect;rSize=0;fontColor=#666666;');
			   	cell24.vertex = true;
			   	bg.insert(cell24);
			   	var cell25 = new mxCell('', new mxGeometry(540, 40, 60, 260), inh + s2 + 'graphics.rrect;rSize=0;fontColor=#666666;');
			   	cell25.vertex = true;
			   	bg.insert(cell25);
			   	var cell26 = new mxCell('1', new mxGeometry(0, 40, 20, 20), s2 + 'graphics.anchor;fontColor=#666666;');
			   	cell26.vertex = true;
			   	bg.insert(cell26);
			   	var cell27 = new mxCell('Task 1', new mxGeometry(20, 40, 40, 20), s2 + 'graphics.anchor;fontColor=#666666;');
			   	cell27.vertex = true;
			   	bg.insert(cell27);
			   	var cell28 = new mxCell('20//10//2014 8:00 AM', new mxGeometry(60, 40, 130, 20), s2 + 'graphics.anchor;fontColor=#666666;');
			   	cell28.vertex = true;
			   	bg.insert(cell28);
			   	var cell29 = new mxCell('40h', new mxGeometry(190, 40, 50, 20), s2 + 'graphics.anchor;fontColor=#666666;');
			   	cell29.vertex = true;
			   	bg.insert(cell29);
			   	var cell30 = new mxCell('2', new mxGeometry(0, 60, 20, 20), s2 + 'graphics.anchor;fontColor=#666666;');
			   	cell30.vertex = true;
			   	bg.insert(cell30);
			   	var cell32 = new mxCell('Task 2', new mxGeometry(20, 60, 40, 20), s2 + 'graphics.anchor;fontColor=#666666;');
			   	cell32.vertex = true;
			   	bg.insert(cell32);
			   	var cell33 = new mxCell('20//10//2014 8:00 AM', new mxGeometry(60, 60, 130, 20), s2 + 'graphics.anchor;fontColor=#666666;');
			   	cell33.vertex = true;
			   	bg.insert(cell33);
			   	var cell34 = new mxCell('40h', new mxGeometry(190, 60, 50, 20), s2 + 'graphics.anchor;fontColor=#666666;');
			   	cell34.vertex = true;
			   	bg.insert(cell34);
			   	var cell35 = new mxCell('3', new mxGeometry(0, 80, 20, 20), s2 + 'graphics.anchor;fontColor=#666666;');
			   	cell35.vertex = true;
			   	bg.insert(cell35);
			   	var cell36 = new mxCell('Task 3', new mxGeometry(20, 80, 40, 20), s2 + 'graphics.anchor;fontColor=#666666;');
			   	cell36.vertex = true;
			   	bg.insert(cell36);
			   	var cell37 = new mxCell('20//10//2014 8:00 AM', new mxGeometry(60, 80, 130, 20), s2 + 'graphics.anchor;fontColor=#666666;');
			   	cell37.vertex = true;
			   	bg.insert(cell37);
			   	var cell38 = new mxCell('40h', new mxGeometry(190, 80, 50, 20), s2 + 'graphics.anchor;fontColor=#666666;');
			   	cell38.vertex = true;
			   	bg.insert(cell38);
			   	var cell39 = new mxCell('4', new mxGeometry(0, 100, 20, 20), s2 + 'graphics.anchor;fontColor=#666666;');
			   	cell39.vertex = true;
			   	bg.insert(cell39);
			   	var cell40 = new mxCell('Task 4', new mxGeometry(20, 100, 40, 20), s2 + 'graphics.anchor;fontColor=#666666;');
			   	cell40.vertex = true;
			   	bg.insert(cell40);
			   	var cell41 = new mxCell('20//10//2014 8:00 AM', new mxGeometry(60, 100, 130, 20), s2 + 'graphics.anchor;fontColor=#666666;');
			   	cell41.vertex = true;
			   	bg.insert(cell41);
			   	var cell42 = new mxCell('40h', new mxGeometry(190, 100, 50, 20), s2 + 'graphics.anchor;fontColor=#666666;');
			   	cell42.vertex = true;
			   	bg.insert(cell42);
			   	var cell43 = new mxCell('', new mxGeometry(250, 45, 130, 10), s2 + 'graphics.rrect;rSize=0;strokeColor=none;fillColor=#aaddff;');
			   	cell43.vertex = true;
			   	bg.insert(cell43);
			   	var cell44 = new mxCell('', new mxGeometry(250, 65, 40, 10), s2 + 'graphics.rrect;rSize=0;strokeColor=none;fillColor=#aaddff;');
			   	cell44.vertex = true;
			   	bg.insert(cell44);
			   	var cell46 = new mxCell('', new mxGeometry(280, 85, 100, 10), s2 + 'graphics.rrect;rSize=0;strokeColor=none;fillColor=#aaddff;');
			   	cell46.vertex = true;
			   	bg.insert(cell46);
			   	var cell47 = new mxCell('', new mxGeometry(340, 105, 70, 10), s2 + 'graphics.rrect;rSize=0;strokeColor=none;fillColor=#aaddff;');
			   	cell47.vertex = true;
			   	bg.insert(cell47);
				
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Gantt Chart');
			}),				
				
				
			this.createVertexTemplateEntry(s + 'misc.map;', 250, 250, '', 'Map', null, null, this.getTagsForStencil(gn, 'map', dt).join(' '))
		];
		
		this.addPalette('mockupGraphics', 'Mockup Graphics', false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addMockupMarkupPalette = function()
	{
		var s = mxConstants.STYLE_VERTICAL_LABEL_POSITION + '=bottom;shadow=0;dashed=0;align=center;html=1;' + mxConstants.STYLE_VERTICAL_ALIGN + '=top;strokeWidth=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.mockup.";
		var s2 =mxConstants.STYLE_STROKEWIDTH + '=1;shadow=0;dashed=0;align=center;html=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.mockup.";
		var s3 = mxConstants.STYLE_VERTICAL_LABEL_POSITION + '=top;shadow=0;dashed=0;align=center;html=1;' + mxConstants.STYLE_VERTICAL_ALIGN + '=bottom;strokeWidth=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.mockup.";

		// Space savers
		var skcl6 = mxConstants.STYLE_STROKECOLOR + '=#666666;';
		var skcl9 = mxConstants.STYLE_STROKECOLOR + '=#999999;';
		var skclN = mxConstants.STYLE_STROKECOLOR + '=none;';
		var sb = this;
	
		var gn = 'mxgraph.mockup.markup';
		var dt = '';
		
		this.addPaletteFunctions('mockupMarkup', 'Mockup Markup', false,
		[
			this.createVertexTemplateEntry(s + 'markup.curlyBrace;whiteSpace=wrap;' + skcl9, 
					100, 20, '', 'Horizontal Curly Brace', null, null, this.getTagsForStencil(gn, 'curlyBrace', dt + 'horizontal curly brace').join(' ')),
			this.createVertexTemplateEntry(mxConstants.STYLE_LABEL_POSITION + '=right;' + mxConstants.STYLE_ALIGN + '=left;strokeWidth=1;' + mxConstants.STYLE_SHAPE + '=mxgraph.mockup.markup.curlyBrace;html=1;shadow=0;dashed=0;' + skcl9 + mxConstants.STYLE_DIRECTION + '=' + mxConstants.DIRECTION_NORTH + ';', 
					20, 100, '', 'Vertical Curly Brace', null, null, this.getTagsForStencil(gn, 'curlyBrace', dt + 'vertical curly brace').join(' ')),
			this.createVertexTemplateEntry(s + 'markup.line;' + skcl9, 
					100, 20, '', 'Horizontal Line', null, null, this.getTagsForStencil(gn, 'line', dt + 'horizontal line').join(' ')),
			this.createVertexTemplateEntry(s + 'markup.line;' + skcl9 + mxConstants.STYLE_DIRECTION + '=' + mxConstants.DIRECTION_NORTH + ';', 
					20, 100, '', 'Vertical Line', null, null, this.getTagsForStencil(gn, 'line', dt + 'vertical line').join(' ')),
			this.createVertexTemplateEntry(mxConstants.STYLE_SHAPE + '=mxgraph.mockup.markup.scratchOut;shadow=0;dashed=0;html=1;whiteSpace=wrap;' + skcl9 + 'strokeWidth=4;',
					200, 100, '', 'Scratch Out', null, null, this.getTagsForStencil(gn, 'scratchOut', dt + 'scratch out').join(' ')),
			this.createVertexTemplateEntry(mxConstants.STYLE_SHAPE + '=mxgraph.mockup.markup.redX;fillColor=#ff0000;html=1;shadow=0;whiteSpace=wrap;' + skclN, 
					200, 100, '', 'Red X', null, null, this.getTagsForStencil(gn, 'redX', dt + 'red').join(' '))
		]);
	};
	
	Sidebar.prototype.addMockupMiscPalette = function()
	{
		var s = mxConstants.STYLE_VERTICAL_LABEL_POSITION + '=bottom;shadow=0;dashed=0;align=center;html=1;' + mxConstants.STYLE_VERTICAL_ALIGN + '=top;strokeWidth=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.mockup.";
		var s2 =mxConstants.STYLE_STROKEWIDTH + '=1;shadow=0;dashed=0;align=center;html=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.mockup.";
		var s3 = mxConstants.STYLE_VERTICAL_LABEL_POSITION + '=top;shadow=0;dashed=0;align=center;html=1;' + mxConstants.STYLE_VERTICAL_ALIGN + '=bottom;strokeWidth=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.mockup.";
		var inh = 'strokeColor=inherit;fillColor=inherit;gradientColor=inherit;';

		// Space savers
		var skcl6 = mxConstants.STYLE_STROKECOLOR + '=#666666;';
		var skcl9 = mxConstants.STYLE_STROKECOLOR + '=#999999;';
		var skclN = mxConstants.STYLE_STROKECOLOR + '=none;';
		var sb = this;
	
		var gn = 'mxgraph.mockup.misc';
		var dt = 'mockup ';
		var miscCommon = skcl9 + mxConstants.STYLE_VERTICAL_LABEL_POSITION + '=bottom;shadow=0;dashed=0;' + mxConstants.STYLE_VERTICAL_ALIGN + '=top;strokeWidth=2;html=1;' + mxConstants.STYLE_SHAPE + '=mxgraph.mockup.';

		var fns =
		[
			this.createVertexTemplateEntry(s + 'misc.help_icon;', 
					32, 32, '', 'Help Icon', null, null, this.getTagsForStencil(gn, 'help_icon', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'misc.playbackControls;sketch=0;' + skcl9 + 'fillColor2=#99ddff;strokeColor2=none;fillColor3=#ffffff;strokeColor3=none;',
					250, 30, '', 'Playback Controls', null, null, this.getTagsForStencil(gn, 'playbackControls', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'misc.progressBar;fillColor=#cccccc;' + skclN + 'fillColor2=#99ddff;barPos=80;', 200, 20, '', 'Progress Bar', null, null, this.getTagsForStencil(gn, 'progress bar', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'misc.shoppingCart;' + skcl9, 
					50, 50, '', 'Shopping Cart', null, null, this.getTagsForStencil(gn, 'shopping cart', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'misc.rating;' + skcl9 + mxConstants.STYLE_FILLCOLOR + '=#ffff00;emptyFillColor=#ffffff;grade=4;ratingScale=5;ratingStyle=star;',
					225, 30, '', 'Rating', null, null, this.getTagsForStencil(gn, 'rating', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'misc.mail2;' + skcl9, 100, 60, '', 'Mail', null, null, this.getTagsForStencil(gn, 'mail', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'misc.volumeSlider;barPos=80;fillColor=#cccccc;' + skcl9 + 'fillColor2=#ddeeff;', 
					250, 30, '', 'Volume Slider', null, null, this.getTagsForStencil(gn, 'volume slider', dt).join(' ')),
			this.createVertexTemplateEntry(miscCommon + 'misc.editIcon;', 
					50, 50, '', 'Edit Icon', null, null, this.getTagsForStencil(gn, 'editIcon', dt + 'edit icon').join(' ')),
			this.createVertexTemplateEntry(miscCommon + 'misc.printIcon;', 
					50, 50, '', 'Print Icon', null, null, this.getTagsForStencil(gn, 'printIcon', dt + 'print icon').join(' ')),
			this.createVertexTemplateEntry(miscCommon + 'misc.shareIcon;', 
					50, 50, '', 'Share Icon', null, null, this.getTagsForStencil(gn, 'shareIcon', dt + 'share icon').join(' ')),
			this.createVertexTemplateEntry(miscCommon + 'misc.trashcanIcon;', 
					50, 50, '', 'Trashcan Icon', null, null, this.getTagsForStencil(gn, 'trashcanIcon', dt + 'trashcan icon').join(' ')),
			this.createVertexTemplateEntry(miscCommon + 'misc.copyrightIcon;', 
					25, 25, '', 'Copyright', null, null, this.getTagsForStencil(gn, 'copyrightIcon', dt + 'copyright icon').join(' ')),
			this.createVertexTemplateEntry(miscCommon + 'misc.registeredIcon;', 
					25, 25, '', 'Registered', null, null, this.getTagsForStencil(gn, 'registeredIcon', dt + 'registered icon').join(' ')),
			this.createVertexTemplateEntry(miscCommon + 'misc.volumeIcon;', 
					25, 25, '', 'Volume', null, null, this.getTagsForStencil(gn, 'volumeIcon', dt + 'volume icon').join(' ')),
			this.createVertexTemplateEntry(s2 + 'misc.ruler2;dx=100;rulerOrient=down;unitSize=10;fontColor=#999999;spacingLeft=96;align=left;verticalAlign=middle;spacingBottom=10;spacingTop=0;spacingRight=0;spacing=0;' + skcl9, 
					350, 30, '1', 'Horizontal Ruler', null, null, this.getTagsForStencil(gn, 'ruler', dt + 'horizontal').join(' ')),
			this.createVertexTemplateEntry(s2 + 'misc.ruler2;dx=100;rulerOrient=up;unitSize=10;fontColor=#999999;spacingLeft=96;align=left;verticalAlign=middle;spacingBottom=0;spacingTop=10;spacingRight=0;spacing=0;' + skcl9, 
					350, 30, '1', 'Horizontal Ruler', null, null, this.getTagsForStencil(gn, 'ruler', dt + 'horizontal').join(' ')),
			this.createVertexTemplateEntry(s2 + 'misc.ruler2;dx=100;rulerOrient=down;unitSize=10;fontColor=#999999;spacingLeft=96;align=left;verticalAlign=middle;spacingBottom=10;spacingTop=0;spacingRight=0;rotation=-90;spacing=0;' + skcl9, 
					350, 30, '1', 'Vertical Ruler', null, null, this.getTagsForStencil(gn, 'ruler', dt + 'horizontal').join(' ')),
			this.createVertexTemplateEntry(s2 + 'misc.ruler2;dx=100;rulerOrient=up;unitSize=10;fontColor=#999999;spacingLeft=96;align=left;verticalAlign=middle;spacingBottom=0;spacingTop=10;spacingRight=0;rotation=-90;spacing=0;' + skcl9, 
					350, 30, '1', 'Vertical Ruler', null, null, this.getTagsForStencil(gn, 'ruler', dt + 'horizontal').join(' ')),
					
			this.addEntry(dt + 'revision table', function()
			{
				var bg = new mxCell('', new mxGeometry(0, 0, 400, 75), s2 + 'misc.rrect;rSize=0;strokeColor=#666666;');
			   	bg.vertex = true;
			   	var cell1 = new mxCell('REVISION HISTORY', new mxGeometry(0, 0, 400, 25), inh + s2 + 'misc.rrect;rSize=0;fontSize=17;fontColor=#999999;whiteSpace=wrap;');
			   	cell1.vertex = true;
			   	bg.insert(cell1);
			   	var cell2 = new mxCell('REV', new mxGeometry(0, 25, 50, 25), inh + s2 + 'misc.rrect;rSize=0;fontSize=17;fontColor=#999999;whiteSpace=wrap;');
			   	cell2.vertex = true;
			   	bg.insert(cell2);
			   	var cell3 = new mxCell('DATE', new mxGeometry(50, 25, 150, 25), inh + s2 + 'misc.rrect;rSize=0;fontSize=17;fontColor=#999999;whiteSpace=wrap;');
			   	cell3.vertex = true;
			   	bg.insert(cell3);
			   	var cell4 = new mxCell('DESCRIPTION', new mxGeometry(200, 25, 200, 25), inh + s2 + 'misc.rrect;rSize=0;fontSize=17;fontColor=#999999;whiteSpace=wrap;');
			   	cell4.vertex = true;
			   	bg.insert(cell4);
			   	var cell6 = new mxCell('A', new mxGeometry(0, 50, 50, 25), inh + s2 + 'misc.rrect;rSize=0;fontSize=17;fontColor=#999999;whiteSpace=wrap;');
			   	cell6.vertex = true;
			   	bg.insert(cell6);
			   	var cell7 = new mxCell('10/23/2014', new mxGeometry(50, 50, 150, 25), inh + s2 + 'misc.rrect;rSize=0;fontSize=17;fontColor=#999999;whiteSpace=wrap;');
			   	cell7.vertex = true;
			   	bg.insert(cell7);
			   	var cell8 = new mxCell('Design modified', new mxGeometry(200, 50, 200, 25), inh + s2 + 'misc.rrect;rSize=0;fontSize=17;fontColor=#999999;whiteSpace=wrap;');
			   	cell8.vertex = true;
			   	bg.insert(cell8);
				
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Revision Table');
			}),				
				
			this.addDataEntry(dt + 'status bar', 500, 30, 'Status Bar',
				'7VddT8IwFP01e4R0rUN4FZUXfcLE57pd1sZuXdoi4K/3risCDnRESIhxyZLe093d23NO9xGxcbGcGF6JR52BithdxMZGa9eMiuUYlIookVnEbiNKCZ4RvT8wG/tZUnEDpeuSQJuEN67m0CANYN1KBcA6o1/hWWZOIBBH7MYKnukFBgSDjFsBWQi4knmJ4xTLg0FAuEJtsqr6lsUyr5fbL3T6Oq/6hbRp3xhIsd8bM5XvEO7V1B1rpY1vhI38gTMzqdQWPvMH4mEtYBwsD/LhoUDGBHQBzqzwkkVYH84mpOGMCJC5CGksYNw2cf6ZumEXB4Hg/WSzFtlTx93cIoYdu4tgPmkxX+oSatJ16cI1cRLiDuJkGYAXZ92gglldz1Y8lWX+4CNfdSGkgynCdYkFNtpVUbpf0ZCQNAmrnWhL7XiUtNWmJ1D7qqX2kxeZXMYW+3NCU/Kj1Ps29imkTg5Jzf6lPofULCY/SR2faVcPLuOFyctU1HKcgs2r0e7GWVP3G5quO9AUloeJsrLwxWbBoa2PAEKGqfeeASvf+Ytafy5sEdeJk8G3nPTorsN6a8dteYye6Wky/IMWG5zeYqPuFlPySDN1WvLwKAe1n1H7/BMf7x8MN/8Lfm7nd+ID'),

			this.createVertexTemplateEntry(s3 + 'misc.pin;fillColor2=#00dd00;fillColor3=#004400;strokeColor=#006600;',
										10, 25, '', 'Pin', null, null, this.getTagsForStencil(gn, 'pin', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'misc.pin;fillColor2=#dd0000;fillColor3=#440000;strokeColor=#660000;',
										10, 25, '', 'Pin', null, null, this.getTagsForStencil(gn, 'pin', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'misc.pin;fillColor2=#ccccff;fillColor3=#0000ff;strokeColor=#000066;',
										10, 25, '', 'Pin', null, null, this.getTagsForStencil(gn, 'pin', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'misc.pin;fillColor2=#ffff00;fillColor3=#888800;strokeColor=#999900;',
										10, 25, '', 'Pin', null, null, this.getTagsForStencil(gn, 'pin', dt).join(' ')),
			this.createVertexTemplateEntry(s3 + 'misc.pin;fillColor2=#ffa500;fillColor3=#885000;strokeColor=#997000;',
										10, 25, '', 'Pin', null, null, this.getTagsForStencil(gn, 'pin', dt).join(' '))
		];
		
		this.addPalette('mockupMisc', 'Mockup Misc', false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};

	Sidebar.prototype.addMockupNavigationPalette = function()
	{
		var s = mxConstants.STYLE_VERTICAL_LABEL_POSITION + '=bottom;shadow=0;dashed=0;align=center;html=1;' + mxConstants.STYLE_VERTICAL_ALIGN + '=top;strokeWidth=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.mockup.";
		var s2 =mxConstants.STYLE_STROKEWIDTH + '=1;shadow=0;dashed=0;align=center;html=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.mockup.";
		var s3 = mxConstants.STYLE_VERTICAL_LABEL_POSITION + '=top;shadow=0;dashed=0;align=center;html=1;' + mxConstants.STYLE_VERTICAL_ALIGN + '=bottom;strokeWidth=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.mockup.";

		// Space savers
		var skcl6 = mxConstants.STYLE_STROKECOLOR + '=#666666;';
		var skcl9 = mxConstants.STYLE_STROKECOLOR + '=#999999;';
		var skclN = mxConstants.STYLE_STROKECOLOR + '=none;';
		var sb = this;
	
		var gn = 'mxgraph.mockup.navigation';
		var dt = 'mockup navigation ';
		var miscCommon = skcl9 + mxConstants.STYLE_VERTICAL_LABEL_POSITION + '=bottom;shadow=0;dashed=0;' + mxConstants.STYLE_VERTICAL_ALIGN + '=top;strokeWidth=2;html=1;' + mxConstants.STYLE_SHAPE + '=mxgraph.mockup.';

		var fns =
		[
			this.addDataEntry(dt + 'breadcrumb', 300, 30, 'Breadcrumb',
				'7VaxboMwEP0ar8jYlGQObbK0U4fOFhhsxWBknIT063uAC40CUoeAGGIJyXfnO87v+VlGNMrrg2Gl+NAJV4i+IRoZrW03y+uIK4UIlgmir4gQDB8i+4mo30ZxyQwv7H8SSJdwZurEO887u3IDLleqslflIpU1+si/ZGIFOHxEd5Vgib6AgcFIWCV44gymZFbAPIY+oBzdCZurIatsSuZ11uzby3V8PJVewc4yY1bqwmNFLHSTlerCfsrvZrW/cXakVRODjmjYjt91rtPmF25X3FheTyLTuhwsB65zbs0VllzcBiEaduBhwWUmXBZ1PlZ1dtZnDjDDxCE9jjq9Qx2RMLN946sBnQT3oLN2PBj0+hbwPxyQmTgIJk8+WRkJi518l7C9J2EuIbw8hTDOgR8sp4RwUgl0ZSwsrQR/5D6aSwqbpxTGSejP/QJS2E5KIVgZC2NSwHgbp+lMLIxcSA+SApjDg7eN3byHfwA='),

			this.createVertexTemplateEntry(s2 + 'navigation.stepBar;strokeColor=#c4c4c4;textColor=#666666;textColor2=#008cff;mainText=,,+,;textSize=17;fillColor=#666666;overflow=fill;fontSize=17;fontColor=#666666;', 300, 50, 
				'<table border="0" cellpadding="0" cellspacing="0" width="100%" height="100%" style="font-size:1em;">' +
				'<tr height="0%"><td width="25%">Layer 1</td><td width="25%">Layer 2</td><td width="25%" style="color:#008cff;">Layer 3</td><td width="25%">Layer 4</td></tr><tr height="100%"><td/></tr></table>', 
				'Step Bar', null, null, this.getTagsForStencil(gn, 'stepBar', dt + 'step bar').join(' ')),
			this.createVertexTemplateEntry(s2 + 'navigation.stepBar;strokeColor=#c4c4c4;textColor=#666666;textColor2=#008cff;mainText=Layer 1,Layer 2,+Layer 3,Layer 4;textSize=17;fillColor=#666666;overflow=fill;fontSize=17;fontColor=#666666;', 
				300, 50, '', 'Step Bar', null, null, this.getTagsForStencil(gn, 'stepBar', dt + 'step bar').join(' ')),
			this.createVertexTemplateEntry(s + 'navigation.coverFlow;strokeColor=#999999;',
				400, 200, '', 'Cover Flow', null, null, this.getTagsForStencil(gn, 'coverFlow', dt + 'cover flow').join(' ')),
			this.createVertexTemplateEntry(s + 'navigation.scrollBar;' + skcl9 + 'barPos=20;fillColor2=#99ddff;strokeColor2=none;',
				200, 20, '', 'Horizontal Scroll Bar', null, null, this.getTagsForStencil(gn, 'scrollBar', dt + 'scroll bar').join(' ')),
			this.createVertexTemplateEntry(s + 'navigation.scrollBar;' + skcl9 + 'barPos=20;fillColor2=#99ddff;strokeColor2=none;direction=north;',
				20, 200, '', 'Vertical Scroll Bar', null, null, this.getTagsForStencil(gn, 'scrollBar', dt + 'scroll bar').join(' ')),
			this.createVertexTemplateEntry(s2 + 'navigation.pagination;linkText=;fontSize=17;fontColor=#0000ff;fontStyle=4;',
				350, 30, '<< Prev 1 2 3 4 5 6 7 8 9 10 Next >>', 'Pagination', null, null, this.getTagsForStencil(gn, 'pagination', dt).join(' ')),
			this.createVertexTemplateEntry(s + 'navigation.pageControl;fillColor=#999999;strokeColor=#ddeeff;',
				100, 30, '', 'Page Control', null, null, this.getTagsForStencil(gn, 'pageControl', dt + 'page control').join(' ')),
			this.createVertexTemplateEntry(s + 'navigation.mapNavigator;fillColor2=#99ddff;strokeColor2=none;strokeColor3=#ffffff;' + skcl9,
				60, 100, '', 'Map Navigator', null, null, this.getTagsForStencil(gn, 'mapNavigator', dt + 'map navigator').join(' ')),
			this.createVertexTemplateEntry(s + 'misc.loading_circle_1;pointerEvents=1', 90, 90, '', 'Wheel Throbber 1', null, null, this.getTagsForStencil(gn, 'loading_circle_1', dt + 'wheel throbber').join(' ')),
			this.createVertexTemplateEntry(s + 'misc.loading_circle_2;pointerEvents=1', 90, 90, '', 'Wheel Throbber 2', null, null, this.getTagsForStencil(gn, 'loading_circle_2', dt + 'wheel throbber').join(' '))
		];	
			
		this.addPalette('mockupNavigation', 'Mockup Navigation', false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addMockupTextPalette = function()
	{
		var s = mxConstants.STYLE_VERTICAL_LABEL_POSITION + '=bottom;shadow=0;dashed=0;align=center;html=1;' + mxConstants.STYLE_VERTICAL_ALIGN + '=top;strokeWidth=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.mockup.";
		var s2 =mxConstants.STYLE_STROKEWIDTH + '=1;shadow=0;dashed=0;align=center;html=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.mockup.";
		var s3 = mxConstants.STYLE_VERTICAL_LABEL_POSITION + '=top;shadow=0;dashed=0;align=center;html=1;' + mxConstants.STYLE_VERTICAL_ALIGN + '=bottom;strokeWidth=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.mockup.";
		var inh = 'strokeColor=inherit;fillColor=inherit;gradientColor=inherit;';

		// Space savers
		var skcl6 = mxConstants.STYLE_STROKECOLOR + '=#666666;';
		var skcl9 = mxConstants.STYLE_STROKECOLOR + '=#999999;';
		var skclN = mxConstants.STYLE_STROKECOLOR + '=none;';
		var sb = this;
	
		var gn = 'mxgraph.mockup.text';
		var dt = 'mockup text ';
		var miscCommon = skcl9 + mxConstants.STYLE_VERTICAL_LABEL_POSITION + '=bottom;shadow=0;dashed=0;' + mxConstants.STYLE_VERTICAL_ALIGN + '=top;strokeWidth=2;html=1;' + mxConstants.STYLE_SHAPE + '=mxgraph.mockup.';
		var loremText = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?';

		var fns =
		[
			this.createVertexTemplateEntry('shape=rectangle;strokeColor=none;fillColor=none;linkText=;fontSize=17;fontColor=#0000ff;fontStyle=4;html=1;align=center;', 
					150, 30, 'Link', 'Link', null, null, this.getTagsForStencil(gn, 'link', dt).join(' ')),
					
			this.addEntry(dt + 'horizontal button bar', function()
			{
			   	var bg = new mxCell('', new mxGeometry(0, 0, 500, 25), s2 + 'text.rrect;rSize=0;strokeColor=#666666;');
			   	bg.vertex = true;
			   	var button2 = new mxCell('Button 2', new mxGeometry(125, 0, 125, 25), inh + s2 + 'text.rrect;rSize=0;fontSize=17;fontColor=#0000ff;whiteSpace=wrap;');
			   	button2.vertex = true;
			   	bg.insert(button2);
			   	var button3 = new mxCell('Button 3', new mxGeometry(250, 0, 125, 25), inh + s2 + 'text.rrect;rSize=0;fontSize=17;fontColor=#0000ff;whiteSpace=wrap;');
			   	button3.vertex = true;
			   	bg.insert(button3);
			   	var button4 = new mxCell('Button 4', new mxGeometry(375, 0, 125, 25), inh + s2 + 'text.rrect;rSize=0;fontSize=17;fontColor=#0000ff;whiteSpace=wrap;');
			   	button4.vertex = true;
			   	bg.insert(button4);
			   	var button1 = new mxCell('Button 1', new mxGeometry(0, 0, 125, 25), s2 + 'text.rrect;rSize=0;fontSize=17;fontColor=#ffffff;fillColor=#008cff;strokeColor=#008cff;whiteSpace=wrap;');
			   	button1.vertex = true;
			   	bg.insert(button1);
				
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Horizontal Button Bar');
			}),				
				
			this.createVertexTemplateEntry(s2 + 'text.callout;linkText=;textSize=17;textColor=#666666;callDir=NW;callStyle=line;fontSize=17;fontColor=#666666;align=left;verticalAlign=top;' + skcl6,
					200, 100, 'Callout', 'Callout', null, null, this.getTagsForStencil(gn, 'callout', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'text.callout;linkText=;textSize=17;textColor=#666666;callDir=NE;callStyle=line;fontSize=17;fontColor=#666666;align=right;verticalAlign=top;' + skcl6,
					200, 100, 'Callout', 'Callout', null, null, this.getTagsForStencil(gn, 'callout', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'text.callout;linkText=;textSize=17;textColor=#666666;callDir=SW;callStyle=line;fontSize=17;fontColor=#666666;align=left;verticalAlign=bottom;' + skcl6,
					200, 100, 'Callout', 'Callout', null, null, this.getTagsForStencil(gn, 'callout', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'text.callout;linkText=;textSize=17;textColor=#666666;callDir=SE;callStyle=line;fontSize=17;fontColor=#666666;align=right;verticalAlign=bottom;' + skcl6,
					200, 100, 'Callout', 'Callout', null, null, this.getTagsForStencil(gn, 'callout', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'text.stickyNote2;fontColor=#666666;mainText=;fontSize=17;whiteSpace=wrap;fillColor=#ffffcc;strokeColor=#F62E00;',
					200, 200, 'Note Line 1\nNote Line 2\nNote Line 3', 'Sticky Note', null, null, this.getTagsForStencil(gn, 'stickyNote', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'text.bulletedList;textColor=#666666;mainText=,,,,;textSize=17;bulletStyle=none;' + skclN + mxConstants.STYLE_FILLCOLOR + '=none;align=left;verticalAlign=top;fontSize=17;fontColor=#666666;',
					150, 135, '-Line 1\n-Line 2\n-Line 3\n-Line 4', 'Bulleted List', null, null, this.getTagsForStencil(gn, 'bulletedList', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'text.textBox;fontColor=#666666;align=left;fontSize=17;spacingLeft=4;spacingTop=-3;whiteSpace=wrap;' + skcl6 + 'mainText=',
					150, 30, 'Line 1', 'Text Box', null, null, this.getTagsForStencil(gn, 'textBox', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'text.captcha;fontColor=#666666;fontSize=25;' + skcl6 + 'mainText=',
					150, 50, 'fG2yQ23', 'Captcha', null, null, this.getTagsForStencil(gn, 'captcha', dt).join(' ')),
			this.createVertexTemplateEntry(s2 + 'text.alphanumeric;linkText=;html=1;fontStyle=4;fontSize=17;fontColor=#0000ff;',
					450, 50, '0-9 A B C D E F G H I J K L M N O P Q R S T U V X Y Z', 'Alphanumeric', null, null, this.getTagsForStencil(gn, 'alphanumeric', dt).join(' ')),
			this.createVertexTemplateEntry('text;spacingTop=-5;whiteSpace=wrap;html=1;align=left;fontSize=12;fontFamily=Helvetica;fillColor=none;strokeColor=none;', 
					250, 470, loremText, 'Paragraph of Text', null, null, this.getTagsForStencil(gn, 'peragraph of text', dt).join(' ')),
			
	 		this.addDataEntry('table', 180, 80, 'Table', '7Zjfb9owEMf/mrxO+bHQ8krYuoftpUzas0sOYs3xRc6xkP71OyemrEDaBKpKZJWCZJ/Ph/392F9F8aIk394ZUWQ/MAXlRV+8KDGI1LbybQJKeaEvUy+ae2Ho888Lv3aMBs2oXwgDmvpMCNsJf4TaQBtpAyXVygXKTBS2SeLBhmYZ5bzMecDNKpMEi0Is7XjFm+BYScLQQj7akM/9JWoSUoNxc5aolChK2RRrMzKp0u+ixg3t/mbX42oGf8MvmVLGYyFH3ILBEGw7N92E3I7vAHMgU3NK5erYjNtWGD8Duc7ctF1MlG1//TR1LyE3nIqnFY0GKnqPlRUVjXy0SiknyqGMZSVzJTR8A5EehGaY1i5EWLiWghW55gMSYe46xu3WP4kiNVj8FGYNu5SVVCpBhZaeRm35Fyg1NQLFM35YssT/FHsx7yzhfrDv82PTDSWoGSSfAlsWREkVlNSXZXgey/Dmcpafj1ha+fkoh37QSZXXTlKoe1iS0Os+V4aviLbZew4nZB+GFlnUlbJHa57JNAVti/L5Wrj1Br2kj16VfjpQeVdsL87gakIRGC2Ij/1Gp+URzqd19iIcdxPuvrfjJ7x9zmNEwCcf9vwu9lw/h/mqW08ud+ubI7SG4TVWzXP9ZZt9hcbdi8PkPK9+Qfczru5Btbe9ure9+F6hbV/Cd6BTXxHu6YdTv6dTx1FPp36D9+rA77jK4X9h1dPRv1YHQS/AY/XqDsCjeavm7v4TVZv+7xesvw==')
		];
		   	
	    this.addPalette('mockupText', 'Mockup Text', false, mxUtils.bind(this, function(content)
	    {
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
})();
