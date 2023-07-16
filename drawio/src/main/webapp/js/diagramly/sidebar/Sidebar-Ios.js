(function()
{
	// Adds iOS shapes
	Sidebar.prototype.addIosPalette = function()
	{
			// Avoids having to bind all functions to "this"
			sb = this;
			
			//default tags
			var dt = 'ios icon ';
		
			var sizeX = 200; //reference size for iPhone and all other iOS shapes
			
			var sizeY = 2 * sizeX; //change only sizeX, to avoid changing aspect ratio
			
			var s = mxConstants.STYLE_VERTICAL_LABEL_POSITION + '=bottom;' + mxConstants.STYLE_VERTICAL_ALIGN + '=top;html=1;shadow=0;dashed=0;strokeWidth=1;shape=mxgraph.ios.';
			var s2 = mxConstants.STYLE_STROKEWIDTH + '=1;html=1;shadow=0;dashed=0;shape=mxgraph.ios.';
			var s3 = mxConstants.STYLE_VERTICAL_LABEL_POSITION + '=top;html=1;shadow=0;dashed=0;' + mxConstants.STYLE_VERTICAL_ALIGN + '=bottom;strokeWidth=1;shape=mxgraph.ios.';
			var s4 = 'html=1;shadow=0;dashed=0;shape=mxgraph.ios.';
			var gn = 'mxgraph.ios';
			this.setCurrentSearchEntryLibrary('ios');
		
		var fns =
		[
			
			this.createVertexTemplateEntry(s + 'iPhone;bgStyle=bgGreen;fillColor=#aaaaaa;sketch=0;', sizeX, sizeY, '', 'iPhone (portrait)', null, null, null),
		 	this.createVertexTemplateEntry(s + 'iPhone;direction=north;bgStyle=bgGreen;fillColor=#aaaaaa;sketch=0;', sizeY, sizeX, '', 'iPhone (landscape)', null, null, null),
			this.createVertexTemplateEntry(s + 'iPad;bgStyle=bgGreen;fillColor=#aaaaaa;sketch=0;', sizeX * 2.425, sizeY * 1.5625, '', 'iPad (portrait)', null, null, null),
			this.createVertexTemplateEntry(s + 'iPad;direction=north;bgStyle=bgGreen;fillColor=#aaaaaa;sketch=0;', sizeY * 1.5625, sizeX * 2.425, '', 'iPad (landscape)', null, null, null),
			this.createVertexTemplateEntry(s + 'iBgFlat;strokeColor=#18211b;', sizeX * 0.875, sizeY * 0.7, '', 'iPad background (white)', null, null, null),
			this.createVertexTemplateEntry(s + 'iBgFlat;strokeColor=#18211b;fillColor=#1f2923;', sizeX * 0.875, sizeY * 0.7, '', 'iPad background (green)', null, null, null),
			this.createVertexTemplateEntry(s + 'iBgFlat;strokeColor=#18211b;fillColor=#dddddd;', sizeX * 0.875, sizeY * 0.7, '', 'iPad background (gray)', null, null, null),
			this.createVertexTemplateEntry(s + 'iBgStriped;strokeColor=#18211b;fillColor=#5D7585;strokeColor2=#657E8F;', sizeX * 0.875, sizeY * 0.7, '', 'iPad background (striped)', null, null, null),
			this.createVertexTemplateEntry(s + 'iBgMap;strokeColor=#18211b;strokeColor2=#008cff;fillColor2=#96D1FF;', sizeX * 0.875, sizeY * 0.7, '', 'iPad background (map)', null, null, null),
			this.addDataEntry(null, 165, 50, 'Button bar',
				'3ZfdboIwFMefhltSKCjeIptZsl3tCTqo0KxQUurUPf0OpfgJiVN0OowJ55z20P7Ov01r4Wm+mklSZm8iodzCTxaeSiFU85avppRzy0UssXBkuS6Cv+U+90QdHUUlkbRQp3Rwmw5fhC9o42kclVpz48hUDsOKHAuHVUYSsQQDgZGQKqOJMSBS1u3zVVrPxWaisqWkMQwilO/su475dTslxSedCi6kzo49/UBkzjjf8c/1A37IlzCYTRsrRAHJQjNuKhVd9c5du8zEZ1TkVMk1NFmyRGWmxchvumWUpZnp5jfMEKkaO9103ZKEFwOzGyw+AvuiaA4eZzjASpThQilRHEDeRWlwHXGPvfoHEcJZCgkiTud1saqSxKxIX7UVOfWn56JQJntgzJ1EI/2cWhH3vIo4ru1fXhOvQ+yjVG3GPkRNSBFnNZpDTBvemqb5kHMqNtyNre3gGcGu9xLsQkUdTAdQud+ncny9bQQ9pMJNaVpitxH86GEF79+p4Md9gveGI/ohYE/P/8nObiqEx/ZNlR88rPLHd6r8SZ/yr3hiPNzqAa4fjf3g+CRpFsOlku89dUIMoSDWsQGWw1bkt1kOrQAecD1M7nQ9OE4H0r+/Ov3menTmYfyM6xGY2zutju1deX8A'),

			this.createVertexTemplateEntry(s + 'iButtonBar;buttonText=Item 1,+Item 2,Item 3,Item 4;textColor=#999999;textColor2=#ffffff;strokeColor=#444444;strokeColor2=#c4c4c4;', 165, 80, '', 'Button Bar', null, null, null),

			this.addEntry(null, function()
			{
			   	var bg = new mxCell('', new mxGeometry(0, 0, 175, 15), s4 + 'iAppBar;strokeWidth=1;sketch=0;');
			   	bg.vertex = true;
			   	var text1 = new mxCell('CARRIER', new mxGeometry(0, 2, 50, 13), s4 + 'anchor;align=left;fontSize=8;spacingLeft=18;');
			   	text1.vertex = true;
			   	bg.insert(text1);
			   	var text2 = new mxCell('11:55PM', new mxGeometry(60, 2, 50, 13), s4 + 'rect;fontSize=8;strokeColor=none;fillColor=none;');
			   	text2.vertex = true;
			   	bg.insert(text2);
			   	
				return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'App bar (portrait)');
			}),
		
			this.addEntry(null, function()
			{
			   	var bg = new mxCell('', new mxGeometry(0, 0, 280, 15), s4 + 'iAppBar;strokeWidth=1;sketch=0;');
			   	bg.vertex = true;
			   	var text1 = new mxCell('CARRIER', new mxGeometry(0, 2, 50, 13), s4 + 'anchor;align=left;fontSize=8;spacingLeft=18;');
			   	text1.vertex = true;
			   	bg.insert(text1);
			   	var text2 = new mxCell('11:55PM', new mxGeometry(115, 2, 50, 13), s4 + 'rect;fontSize=8;strokeColor=none;fillColor=none;');
			   	text2.vertex = true;
			   	bg.insert(text2);
			   	
				return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'App bar (landscape)');
			}),
				
			this.addEntry(null, function()
			{
			   	var bg = new mxCell('', new mxGeometry(0, 0, 175, 15), s4 + 'iTopBar2;opacity=50;fillColor=#999999;strokeColor=#cccccc;strokeWidth=1;sketch=0;');
			   	bg.vertex = true;
			   	var text1 = new mxCell('CARRIER', new mxGeometry(0, 2, 50, 13), s4 + 'rect;align=left;fontSize=7.5;spacingLeft=18;fontColor=#cccccc;textOpacity=50;strokeColor=none;fillColor=none;');
			   	text1.vertex = true;
			   	bg.insert(text1);
			   	var text2 = new mxCell('11:15AM', new mxGeometry(60, 2, 50, 13), s4 + 'rect;fontSize=7.5;fontColor=#cccccc;textOpacity=50;strokeColor=none;fillColor=none;');
			   	text2.vertex = true;
			   	bg.insert(text2);
			   	
				return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Top bar');
			}),
			
			this.addEntry(null, function()
			{
			   	var bg = new mxCell('', new mxGeometry(0, 0, 175, 15), s4 + 'iTopBarLocked;strokeWidth=1;sketch=0;');
			   	bg.vertex = true;
			   	var text1 = new mxCell('CARRIER', new mxGeometry(0, 2, 50, 13), s4 + 'anchor;align=left;fontSize=7.5;spacingLeft=18;fontColor=#cccccc;');
			   	text1.vertex = true;
			   	bg.insert(text1);
			   	
				return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Top bar locked');
			}),
		   	
			this.createVertexTemplateEntry(s2 + 'iButton;strokeColor=#444444;fontColor=#ffffff;buttonText=;fontSize=8;fillColor=#dddddd;fillColor2=#3D5565;whiteSpace=wrap;align=center;sketch=0;', 
					sizeX * 0.2175, sizeY * 0.0375, 'Button', 'Button', null, null, null),
		 	this.createVertexTemplateEntry(s2 + 'iButtonBack;strokeColor=#444444;fontColor=#ffffff;buttonText=;fontSize=8;fillColor=#dddddd;fillColor2=#3D5565;spacingLeft=10;whiteSpace=wrap;align=center;sketch=0;', 
		 			sizeX * 0.2175, sizeY * 0.0375, 'Button', 'Back button', null, null, null),
			this.createVertexTemplateEntry(s2 + 'iButtonFw;strokeColor=#444444;fontColor=#ffffff;buttonText=;fontSize=8;fillColor=#dddddd;fillColor2=#3D5565;spacingRight=10;whiteSpace=wrap;align=center;sketch=0;', 
					sizeX * 0.2175, sizeY * 0.0375, 'Button', 'Forward button', null, null, null),
			this.createVertexTemplateEntry(s + 'iPrevNext;strokeColor=#444444;fillColor=#dddddd;fillColor2=#3D5565;fillColor3=#ffffff;align=center;sketch=0;', 
					sizeX * 0.2175, sizeY * 0.0375, '', 'Prev/next button', null, null, null),
			this.createVertexTemplateEntry(s2 + 'iTextInput;strokeColor=#444444;buttonText=;fontSize=8;whiteSpace=wrap;align=left;', 
					sizeX * 0.2175, sizeY * 0.0375, 'Default text', 'Text input', null, null, null),
			this.addDataEntry(null, 165, 50, 'Radio Buttons',
				'7ZbdTsIwFMefZrdka4F4K6DcaDTqCxR62Bq7dWmrgE/vaXv4UFhCgnJFkyU7nznn/1uTZXxcr6ZWtNWjkaAzfpfxsTXGp7d6NQatM5YrmfFJxliOT8buO6JFjOatsND4UwpYKvgU+gOSJzmcX2tyVL7GsSZFxkeuEtIs0cjRkMJVIMnASBvy61UZdukp43rWwhyHGNlX9RViPOR5a95hbLSxsTsfxoORhdJ6z7+IB/3YTyrcZhNrTAOhKcw/rFOf8AIutc9pFbAeVp1yRBdpMQVTg7drTFkq6SvKGA5SWQWqrKhsQN2FS3a5Ld2Jiy+k73Gt+YHWT61XpkFfcaD6RlBsoVqXNsZFxUwDSf5LMBkP+oVWZYM+DYugvmvFXDXlQ7QmLBSaxhOSGzKPAdFiBvrZOBVn5BOb1BgFgdVc6Idf8VpJGYbbJtzSINsAjfJmWvoa9j6tk+Cx4/CogPUI3Jr03th7cI+hPZ9sv5vs4X26kj2bbDG8ENhBN1h+Pth+PFewO7Ds5mJ3dtiNtn+9s3+Ptl/8D1g0d79LMfbjb+ob'),
			this.addDataEntry(null, 165, 50, 'Checkboxes',
				'7ZZbT8IwFMc/zV7J1gLBRxnKCyZG/AJlPWyN3bq0RYef3tOLeGEQEoUXbbKk55rT/29NmtC87uaatdWd4iATepPQXCtlw67ucpAyIangCZ0lhKT4JeT2QDTz0bRlGhp7SgEJBc9MbiB4gsPYrYyOytY41ixL6NRUjKsXNFI0ODMV8GhgpHX5dVe6swyEMgOtocAhpnopXl2Mujyr1RPkSirtu9OxXxhZCyk/+dd+oR/7cYGneY81qgHXFIqNNuIZHsCE9m6MeBrQFrqDinhXlGMOqgart5jyIritYsZ4FMoqEGUVy0ZByZSZYJe70g99cRMl7peb7sm9BGtFU6IzO5/y6b6+3C/0MynKBn0S1q7EtKzAeRbemhFXqBob+0yi2cdPshXIe2WEFcr100G5qYMhCiYX3+K14NwddJdwHQfZBeIoj6qNP89JdEk/3VhABpHsNgJ5tz/R72P/c/TDI+jPeOn+0R9Cn40vRH50hDz9PfJFBcXTSnX7wK/8+vPAyeRil318BPnw/7Jfnv0wOw95ND8eaz725S33Bg=='),
			   	
			this.createVertexTemplateEntry(s2 + 'iComboBox;spacingTop=2;spacingLeft=2;align=left;strokeColor=#444444;fontColor=#666666;buttonText=;fontSize=8;fillColor=#dddddd;fillColor2=#3D5565;sketch=0;whiteSpace=wrap;', 
					sizeX * 0.29, sizeY * 0.0375, 'Option 1', 'Combobox', null, null, null),
			this.createVertexTemplateEntry(s2 + 'iOnOffButton;mainText=;strokeColor=#444444;fontSize=9;fontColor=#ffffff;spacingRight=14;buttonState=on;sketch=0;', sizeX * 0.2175, sizeY * 0.0375, 
					'ON', 'On-off button', null, null, null),
			this.createVertexTemplateEntry(s2 + 'iTextInput;strokeColor=#444444;align=left;buttonText=;fontSize=8;whiteSpace=wrap;', sizeX * 0.2175, sizeY * 0.0375, 
					'********', 'Password field', null, null, null),
			this.addDataEntry(null, 150, 100, 'Alert Box',
				'zVVRb5swEP41PDYyOOmaxyVps5dJU/OwZ8s+sFWDke0ksF+/MzgNCDJ1W6UWCQl/992d7e87kdBt2ewtq+V3I0An9DGhW2uM77/KZgtaJxlRIqG7JMsIvkn2dCOadlFSMwuVf0tC1iecmD5Cj3zVYD1CAhy3qvbKVLjy0CB4n2Q0JQndzAWJA24qgR9aVdDXdb7Vsa70JZ5ul2K2k0yYMy66UsxJEHGBkTrwy6YIV7JQxi1yVvH2+Rk4HmhjD+pXIDwEsrfmBbZGG9u1oKJ7MJIrrQf4cv0lXYcMLCoU3swglq5peh9ipmZc+TbUDjvJzYiWd0/EB3s4S+XhgKkBOOOeEWNaFRUuOXYCGzb6Ap7LeETJuDxa2AfqbolAbVTgPZ6Q7iIpdHlipdJhP99An8ArzjAQ5UKJoLkpeQdFvfdgSvC2RcpZCS8jY9XbgkhQhbykkQgy1wPFa+7VQfgRTTRvKDox1CEUkaoqQjtW11Ch3O/mDjSHDCINhUmzPwg4p5gFh5k/4/2kHyBZ9m+SZases6CZVycY1f8fGZcTGTdH78O0v5dw1o4nmk6H65aEk8G/TufbB5+vOEA6Hfw5f3wSN8QEsoiqt6MCA688zFmF/KVVYv8f4XTX5ndLMmp+d7HgpYTJcwd+4rXXY8zZD5fXX15PH/4RfwM='),
			this.addDataEntry(null, 150, 100, 'Dialog Box',
				'7VZdb5swFP01fmwEdkiX15I2k6ZpU/OwZwsu2KrBzHY+2K/fNTgNiKTKtkqrqiIh2ed+2udcBGFpdVgb3oivOgdF2D1hqdHa9avqkIJShEYyJ2xFKI3wJfThgjXurFHDDdTumgDaB+y42kKPrCRXukTs5xask7rGpYODI3RBKIsjwu4mlshCpuscF0rW0Ke0rlUhpXAVHmwVY6gVPNd73Pg8ObcC8rBBS+P9q0Ppb2MmtZ0VvM7ax0fI8Cx3ZiN/eYdP3tkZ/QSpVtp0JVjePWgppFIDfL68jZc+ApPmEi9lYIuXLF54m254Jl3rc/tOCj1yK7on4IMe9kI62GCoB/bYM2JcybLGbYaVwPhGn8BlIhxR8ExsDay962qOQKOl97vfobsNTr7KA6+k8v18BrUDJzOOhsAUGLzzi2x3UKB6DboCZ1p02cvcieCR9IqIBMhSHMOiAHLbA+Vz7Ek8uAj6Oa8lNtHSxicRsvZyQnobqJHuV1MHikN4kobExPQFAs8xZsBi5I9wP/F/oIz+HWU06TEDiju5g1H+f6FxPqExxZvGT9OrEWfMeKLZdLguUTgZ/NN0Xj/4WZIBxNPBP6ePN6KGEBDNjrS3owwDsSySM1qJ/lAroYHv/nin6jeMzsblb47tHJPoorDgJnJ7PslVCkwmCvz25UN9b0F9t+9Pfbg9/W717sO/sd8='),

			this.createVertexTemplateEntry(s2 + 'iLockButton;fontColor=#cccccc;fontSize=13;mainText=;spacingLeft=50;spacingRight=10;align=center;sketch=0;whiteSpace=wrap;', sizeX * 0.87, sizeY * 0.125, 'slide to unlock', 'Lock button', null, null, null),
			this.createVertexTemplateEntry(s + 'iArrowIcon;fillColor=#8BbEff;fillColor2=#135Ec8;strokeColor=#ffffff;sketch=0;', sizeX * 0.075, sizeY * 0.0375, '', 'Arrow', null, null, null),
			this.createVertexTemplateEntry(s + 'iDeleteIcon;fillColor=#e8878E;fillColor2=#BD1421;strokeColor=#ffffff;sketch=0;', sizeX * 0.075, sizeY * 0.0375, '', 'Delete', null, null, null),
			this.createVertexTemplateEntry(s + 'iAddIcon;fillColor=#7AdF78;fillColor2=#1A9917;strokeColor=#ffffff;sketch=0;', sizeX * 0.075, sizeY * 0.0375, '', 'Add', null, null, null),
			this.createVertexTemplateEntry(s + 'iInfoIcon;fillColor=#8BbEff;fillColor2=#135Ec8;strokeColor=#ffffff;sketch=0;', sizeX * 0.075, sizeY * 0.0375, '', 'Info', null, null, null),
			this.createVertexTemplateEntry(s + 'iSortFindIcon;fillColor=#8BbEff;fillColor2=#135Ec8;strokeColor=#ffffff;sketch=0;', sizeX * 0.075, sizeY * 0.0375, '', 'Sort/find', null, null, null),
			this.createVertexTemplateEntry(s + 'iCheckIcon;fillColor=#e8878E;fillColor2=#BD1421;strokeColor=#ffffff;sketch=0;', sizeX * 0.075, sizeY * 0.0375, '', 'Check', null, null, null),
			this.createVertexTemplateEntry(s + 'iKeybLett;sketch=0;', sizeX * 0.87, sizeY * 0.25, '', 'Keyboard (letters)', null, null, null),
			this.createVertexTemplateEntry(s + 'iKeybNumb;sketch=0;', sizeX * 0.87, sizeY * 0.25, '', 'Keyboard (numbers)', null, null, null),
			this.createVertexTemplateEntry(s + 'iKeybSymb;sketch=0;', sizeX * 0.87, sizeY * 0.25, '', 'Keyboard (symbols)', null, null, null),
			this.createVertexTemplateEntry(s + 'iDeleteApp;fillColor=#cccccc;fillColor2=#000000;strokeColor=#ffffff;sketch=0;', sizeX * 0.075, sizeY * 0.0375, '', 'Delete app', null, null, null),
			this.createVertexTemplateEntry(s + 'iDir;', sizeX * 0.5, sizeY * 0.25, '', 'Direction', null, null, null),
			this.createVertexTemplateEntry(s2 + 'iLocBar;align=left;spacingLeft=4;spacingBottom=4;fontColor=#ffffff;fontSize=10;barPos=80;pointerPos=bottom;buttonText=5th Street Music Store', sizeX * 0.775, sizeY * 0.08125, '', 'Location bar', null, null, null),
			this.createVertexTemplateEntry(s + 'iCallDialog;sketch=0;', sizeX * 0.75, sizeY * 0.3125, '', 'Call Dialog', null, null, null),
			this.createVertexTemplateEntry(s + 'iCallButtons;', sizeX * 0.87, sizeY * 0.575, '', 'Call buttons', null, null, null),
			this.createVertexTemplateEntry(s2 + 'iOption;barPos=80;pointerPos=bottom;buttonText=Option;fontSize=10;fontColor=#ffffff;spacingBottom=6;', sizeX * 0.375, sizeY * 0.06875, '', 'Option', null, null, null),
			this.createVertexTemplateEntry(s + 'iAlphaList;fontSize=7.5;', sizeX * 0.075, sizeY * 0.5625, '', 'Alphabet list', null, null, null),
			this.createVertexTemplateEntry(s2 + 'iHorButtonBar;buttonText=Item 1,+Item 2,Item 3,Item 4;textColor=#999999;textColor2=#ffffff;strokeColor=#444444;strokeColor2=#c4c4c4;fillColor2=#008cff;fontSize=8;sketch=0;', sizeX * 0.825, sizeY * 0.03125,
					'', 'Horizontal button bar', null, null, null),
			this.createVertexTemplateEntry(s3 + 'iPin;fillColor2=#00dd00;fillColor3=#004400;strokeColor=#006600;', sizeX * 0.05, sizeY * 0.0625, '', 'Pin', null, null, null),
			this.createVertexTemplateEntry(s3 + 'iPin;fillColor2=#dd0000;fillColor3=#440000;strokeColor=#660000;', sizeX * 0.05, sizeY * 0.0625, '', 'Pin', null, null, null),
			this.createVertexTemplateEntry(s3 + 'iPin;fillColor2=#ccccff;fillColor3=#0000ff;strokeColor=#000066;', sizeX * 0.05, sizeY * 0.0625, '', 'Pin', null, null, null),
			this.createVertexTemplateEntry(s3 + 'iPin;fillColor2=#ffff00;fillColor3=#888800;strokeColor=#999900;', sizeX * 0.05, sizeY * 0.0625, '', 'Pin', null, null, null),
			this.createVertexTemplateEntry(s3 + 'iPin;fillColor2=#ffa500;fillColor3=#885000;strokeColor=#997000;', sizeX * 0.05, sizeY * 0.0625, '', 'Pin', null, null, null),
			this.createVertexTemplateEntry(s + 'iVideoControls;barPos=20;sketch=0;', sizeX * 0.87, sizeY * 0.125, '', 'Video controls', null, null, null),

			this.addEntry(null, function()
			{
			   	var bg = new mxCell('Page title', new mxGeometry(0, 0, 175, 30), s4 + 'iURLBar;verticalAlign=top;fontSize=8;spacingTop=-5;align=center;sketch=0;whiteSpace=wrap;');
			   	bg.vertex = true;
			   	var text1 = new mxCell('https://www.draw.io/', new mxGeometry(5, 12, 115, 13), s4 + 'anchor;fontSize=8;spacingLeft=3;align=left;spacingTop=2;');
			   	text1.vertex = true;
			   	bg.insert(text1);
			   	var text2 = new mxCell('Cancel', new mxGeometry(137, 12, 32, 13), s4 + 'anchor;fontSize=8;fontColor=#ffffff;spacingTop=2;');
			   	text2.vertex = true;
			   	bg.insert(text2);
			   	
				return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'URL bar');
			}),

			this.createVertexTemplateEntry(s + 'iSlider;barPos=20;', sizeX * 0.75, sizeY * 0.025, '', 'Slider', null, null, null),
		 	this.createVertexTemplateEntry(s + 'iProgressBar;barPos=40;', sizeX * 0.75, sizeY * 0.025, '', 'Progress bar', null, null, null),
			this.createVertexTemplateEntry(s + 'iCloudProgressBar;barPos=20;', sizeX * 0.75, sizeY * 0.025, '', 'Cloud progress bar', null, null, null),
			this.createVertexTemplateEntry(s2 + 'iDownloadBar;verticalAlign=top;spacingTop=-4;fontSize=8;fontColor=#ffffff;buttonText=' + ';barPos=30;align=center;sketch=0;whiteSpace=wrap;', sizeX * 0.87, sizeY * 0.075, 'Downloading 2 of 6', 'Download bar', null, null, null),
			this.createVertexTemplateEntry(s2 + 'iScreenNameBar;fillColor2=#000000;fillColor3=#ffffff;buttonText=;fontColor=#ffffff;fontSize=10;whiteSpace=wrap;align=center;sketch=0;', sizeX * 0.87, sizeY * 0.0625, 'Screen Name', 'Screen name bar', null, null, null),
			this.createVertexTemplateEntry(s + 'iIconGrid;gridSize=3,3;', sizeX * 0.75, sizeY * 0.375, '', 'Icon grid', null, null, null),
			this.createVertexTemplateEntry(s2 + 'iCopy;fillColor=#000000;buttonText=;fontColor=#ffffff;spacingBottom=6;fontSize=9;fillColor2=#000000;fillColor3=#ffffff;align=center;sketch=0;whiteSpace=wrap;', sizeX * 0.2, sizeY * 0.06875, 'Copy', 'Copy', null, null, null),
			
			this.addEntry(null, function()
			{
			   	var bg = new mxCell('Copy', new mxGeometry(sizeX * 0.05, 0, sizeX * 0.2, sizeY * 0.06875), s4 + 'iCopy;fillColor=#000000;buttonText=;fontColor=#ffffff;spacingBottom=6;fontSize=9;fillColor2=#000000;fillColor3=#ffffff;align=center;sketch=0;whiteSpace=wrap;');
			   	bg.vertex = true;
			   	var area1 = new mxCell('', new mxGeometry(0, sizeY * 0.06875, sizeX * 0.3, sizeY * 0.13125), s4 + 'rect;fillColor=#2266ff;strokeColor=none;opacity=30;sketch=0;');
			   	area1.vertex = true;
			   	
				return sb.createVertexTemplateFromCells([bg, area1], sizeX * 0.3, sizeY * 0.2, 'Copy Area');
			}),
			
			this.createVertexTemplateEntry(s + 'iHomePageControl;fillColor=#666666;strokeColor=#cccccc;sketch=0;', sizeX * 0.25, sizeY * 0.0125, '', 'Home page control', null, null, null),
			this.createVertexTemplateEntry(s + 'iPageControl;fillColor=#666666;strokeColor=#cccccc;sketch=0;', sizeX * 0.25, sizeY * 0.0125, '', 'Page control', null, null, null)
			
		];

		this.addPalette('ios', 'iOS6', false, mxUtils.bind(this, function(content)
				{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
		
		this.setCurrentSearchEntryLibrary();
	};
	
})();
