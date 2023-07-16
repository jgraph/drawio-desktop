(function()
{
	// Adds Atlassian shapes
	Sidebar.prototype.addAtlassianPalette = function()
	{
		var s = 'html=1;shadow=0;dashed=0;shape=mxgraph.atlassian.';
		var s2 = 'image;html=1;image=img/lib/atlassian/';
		var s3 = mxConstants.STYLE_STROKEWIDTH + '=1;shadow=0;dashed=0;align=center;html=1;' + mxConstants.STYLE_SHAPE + "=mxgraph.mockup.";
		var gn = 'mxgraph.atlassian';
		var dt = 'atlassian ';
		var sb = this;
		this.setCurrentSearchEntryLibrary('atlassian');
		
		var fns = [
			this.addEntry(dt + 'issue ticket bug jira task feature request', function()
	   		{
			   	var bg = new mxCell('Task description', new mxGeometry(0, 0, 200, 50), s + 'issue;issueType=story;issuePriority=blocker;issueStatus=inProgress;verticalAlign=top;align=left;whiteSpace=wrap;overflow=hidden;spacingTop=25;strokeColor=#A8ADB0;fillColor=#EEEEEE;fontSize=12;backgroundOutline=1;sketch=0;');
			   	bg.vertex = true;
			   	var label1 = new mxCell('ID', new mxGeometry(0, 0, 60, 20), 'strokeColor=none;fillColor=none;part=1;resizable=0;align=left;autosize=1;points=[];deletable=0;connectable=0;');
			   	label1.geometry.relative = true;
			   	label1.geometry.offset = new mxPoint(20, 0);
			   	label1.vertex = true;
			   	bg.insert(label1);
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Issue');
			}),
					 
			 this.createVertexTemplateEntry(s2 + 'Atlassian_Logo.svg;',
					 66, 66, '', 'Atlassian', null, null, this.getTagsForStencil(gn, 'atlassian logo', dt).join(' ')),
			 this.createVertexTemplateEntry(s2 + 'Bamboo_Logo.svg;',
					 64, 74, '', 'Bamboo', null, null, this.getTagsForStencil(gn, 'bamboo logo', dt).join(' ')),
			 this.createVertexTemplateEntry(s2 + 'Bitbucket_Logo.svg;',
					 57, 50, '', 'Bitbucket', null, null, this.getTagsForStencil(gn, 'bitbucket logo atlassian', dt).join(' ')),
			 this.createVertexTemplateEntry(s2 + 'Clover_Logo.svg;',
					 71, 71, '', 'Clover', null, null, this.getTagsForStencil(gn, 'clover logo', dt).join(' ')),
			 this.createVertexTemplateEntry(s2 + 'Confluence_Logo.svg;',
					 63, 57, '', 'Confluence', null, null, this.getTagsForStencil(gn, 'confluence logo', dt).join(' ')),
			 this.createVertexTemplateEntry(s2 + 'Crowd_Logo.svg;',
					 66, 65, '', 'Crowd', null, null, this.getTagsForStencil(gn, 'crowd logo', dt).join(' ')),
			 this.createVertexTemplateEntry(s2 + 'Crucible_Logo.svg;',
					 61, 61, '', 'Crucible', null, null, this.getTagsForStencil(gn, 'crucible logo', dt).join(' ')),
			 this.createVertexTemplateEntry(s2 + 'Fisheye_Logo.svg;',
					 71, 59, '', 'Fisheye', null, null, this.getTagsForStencil(gn, 'fisheye logo', dt).join(' ')),
			 this.createVertexTemplateEntry(s2 + 'Hipchat_Logo.svg;',
					 66, 62, '', 'Hipchat', null, null, this.getTagsForStencil(gn, 'hipchat logo atlassian', dt).join(' ')),
			 this.createVertexTemplateEntry(s2 + 'Jira_Logo.svg;',
					 72, 72, '', 'Jira', null, null, this.getTagsForStencil(gn, 'jira logo', dt).join(' ')),
			 this.createVertexTemplateEntry(s2 + 'Jira_Core_Logo.svg;',
					 55, 66, '', 'Jira Core', null, null, this.getTagsForStencil(gn, 'jira core logo atlassian', dt).join(' ')),
			 this.createVertexTemplateEntry(s2 + 'Jira_Service_Desk_Logo.svg;',
					 59, 76, '', 'Jira Service Desk', null, null, this.getTagsForStencil(gn, 'jira service desk logo atlassian', dt).join(' ')),
			 this.createVertexTemplateEntry(s2 + 'Jira_Software_Logo.svg;',
					 74, 76, '', 'Jira Software', null, null, this.getTagsForStencil(gn, 'jira software logo atlassian', dt).join(' ')),
			 this.createVertexTemplateEntry(s2 + 'Sourcetree_Logo.svg;',
					 57, 71, '', 'Sourcetree', null, null, this.getTagsForStencil(gn, 'sourcetree logo', dt).join(' ')),
			 this.createVertexTemplateEntry(s2 + 'Statuspage_Logo.svg;',
					 75, 52, '', 'Statuspage', null, null, this.getTagsForStencil(gn, 'statuspage logo', dt).join(' ')),
			 this.createVertexTemplateEntry(s2 + 'Stride_Logo.svg;',
					 69, 57, '', 'Stride', null, null, this.getTagsForStencil(gn, 'stride logo atlassian', dt).join(' ')),
			 this.createVertexTemplateEntry(s2 + 'Trello_Logo.svg;',
					 70, 70, '', 'Trello', null, null, this.getTagsForStencil(gn, 'trello logo', dt).join(' ')),
			this.createVertexTemplateEntry('shape=ellipse;fillColor=#6554C0;strokeColor=none;fontColor=#ffffff;align=center;verticalAlign=middle;whiteSpace=wrap;fontSize=46;fontStyle=1;html=1;sketch=0;', 
					96, 96, 'MM', 'Avatar (Large)', null, null, this.getTagsForStencil(gn, 'avatar', dt + 'avatar').join(' ')),
			this.createVertexTemplateEntry('shape=ellipse;fillColor=#0065FF;strokeColor=none;fontColor=#ffffff;align=center;verticalAlign=middle;whiteSpace=wrap;fontSize=25;fontStyle=1;html=1;sketch=0;', 
					48, 48, 'MM', 'Avatar (Main)', null, null, this.getTagsForStencil(gn, 'avatar', dt + 'avatar').join(' ')),
			this.createVertexTemplateEntry('shape=ellipse;fillColor=#36B37E;strokeColor=none;fontColor=#ffffff;align=center;verticalAlign=middle;whiteSpace=wrap;fontSize=17;fontStyle=1;html=1;sketch=0;', 
					32, 32, 'MM', 'Avatar (Normal)', null, null, this.getTagsForStencil(gn, 'avatar', dt + 'avatar').join(' ')),
			this.createVertexTemplateEntry('shape=ellipse;fillColor=#FFAB00;strokeColor=none;fontColor=#ffffff;align=center;verticalAlign=middle;whiteSpace=wrap;fontSize=12;fontStyle=1;html=1;sketch=0;', 
					24, 24, 'MM', 'Avatar (Small)', null, null, this.getTagsForStencil(gn, 'avatar', dt + 'avatar').join(' ')),
			this.createVertexTemplateEntry('shape=ellipse;fillColor=#FF5630;strokeColor=none;fontColor=#ffffff;align=center;verticalAlign=middle;whiteSpace=wrap;fontSize=10;fontStyle=1;html=1;sketch=0;', 
					16, 16, 'M', 'Avatar (Tiny)', null, null, this.getTagsForStencil(gn, 'avatar', dt + 'avatar').join(' ')),
			this.addEntry(dt + 'avatar available', function()
	   		{
			   	var bg = new mxCell('MM', new mxGeometry(0, 0, 32, 32), 'shape=ellipse;fillColor=#6554C0;strokeColor=none;fontColor=#ffffff;align=center;verticalAlign=middle;whiteSpace=wrap;fontSize=17;fontStyle=1;html=1;sketch=0;');
			   	bg.vertex = true;
			   	var button1 = new mxCell('', new mxGeometry(1, 1, 10, 10), 'shape=ellipse;fillColor=#36B37E;strokeColor=#ffffff;strokeWidth=2;sketch=0;');
			   	button1.geometry.relative = true;
			   	button1.geometry.offset = new mxPoint(-10, -10);
			   	button1.vertex = true;
			   	bg.insert(button1);
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Avatar (Available)');
			}),
			this.addEntry(dt + 'avatar away', function()
	   		{
			   	var bg = new mxCell('MM', new mxGeometry(0, 0, 32, 32), 'shape=ellipse;fillColor=#FFAB00;strokeColor=none;fontColor=#ffffff;align=center;verticalAlign=middle;whiteSpace=wrap;fontSize=17;fontStyle=1;html=1;sketch=0;');
			   	bg.vertex = true;
			   	var button1 = new mxCell('', new mxGeometry(1, 1, 10, 10), s + 'away;fillColor=#7A869A;strokeColor=#ffffff;strokeWidth=2;sketch=0;');
			   	button1.geometry.relative = true;
			   	button1.geometry.offset = new mxPoint(-10, -10);
			   	button1.vertex = true;
			   	bg.insert(button1);
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Avatar (Away)');
			}),
			this.addEntry(dt + 'avatar do not disturb unavailable', function()
	   		{
			   	var bg = new mxCell('MM', new mxGeometry(0, 0, 32, 32), 'shape=ellipse;fillColor=#0065FF;strokeColor=none;fontColor=#ffffff;align=center;verticalAlign=middle;whiteSpace=wrap;fontSize=17;fontStyle=1;html=1;sketch=0;');
			   	bg.vertex = true;
			   	var button1 = new mxCell('', new mxGeometry(1, 1, 10, 10), s + 'do_not_disturb;fillColor=#FF5630;strokeColor=#ffffff;strokeWidth=2;sketch=0;');
			   	button1.geometry.relative = true;
			   	button1.geometry.offset = new mxPoint(-10, -10);
			   	button1.vertex = true;
			   	bg.insert(button1);
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Avatar (Do not disturb)');
			}),
			this.createVertexTemplateEntry('rounded=1;arcSize=5;fillColor=#0065FF;strokeColor=none;fontColor=#ffffff;align=center;verticalAlign=middle;whiteSpace=wrap;fontSize=14;fontStyle=1;html=1;sketch=0;', 
					40, 40, '&lt;/&gt;', 'Container Avatar (Large)', null, null, this.getTagsForStencil(gn, 'avatar', dt + 'container avatar large').join(' ')),
			this.createVertexTemplateEntry('rounded=1;arcSize=5;fillColor=#0065FF;strokeColor=none;fontColor=#ffffff;align=center;verticalAlign=middle;whiteSpace=wrap;fontSize=12;fontStyle=1;html=1;sketch=0;', 
					32, 32, '&lt;/&gt;', 'Container Avatar (Medium)', null, null, this.getTagsForStencil(gn, 'avatar', dt + 'container avatar medium').join(' ')),
			this.createVertexTemplateEntry('rounded=1;arcSize=5;fillColor=#0065FF;strokeColor=none;fontColor=#ffffff;align=center;verticalAlign=middle;whiteSpace=wrap;fontSize=10;fontStyle=1;html=1;sketch=0;', 
					24, 24, '&lt;/&gt;', 'Container Avatar (Small)', null, null, this.getTagsForStencil(gn, 'avatar', dt + 'container avatar small').join(' ')),
			this.createVertexTemplateEntry('shape=ellipse;fillColor=#0065FF;strokeColor=none;html=1;sketch=0;', 
					10, 10, '', 'Dot Badge', null, null, this.getTagsForStencil(gn, '', dt + 'dot badge').join(' ')),
			this.createVertexTemplateEntry('rounded=1;fillColor=#0065FF;strokeColor=none;html=1;fontColor=#ffffff;align=center;verticalAlign=middle;whiteSpace=wrap;fontSize=18;fontStyle=1;arcSize=50;sketch=0;', 
					40, 25, '13', 'Bold Badge', null, null, this.getTagsForStencil(gn, '', dt + 'bold badge').join(' ')),
			this.createVertexTemplateEntry('rounded=1;fillColor=#E3FCEF;strokeColor=none;html=1;fontColor=#016745;align=center;verticalAlign=middle;whiteSpace=wrap;fontSize=18;fontStyle=0;arcSize=50;sketch=0;', 
					40, 25, '+1', 'Subtle Badge', null, null, this.getTagsForStencil(gn, '', dt + 'subtle badge').join(' ')),
			this.addEntry(dt + 'banner', function()
	   		{
			   	var bg = new mxCell('', new mxGeometry(0, 0, 625, 50), 'rounded=0;fillColor=#FFAB00;strokeColor=none;html=1');
			   	bg.vertex = true;
			   	var icon1 = new mxCell('<b>More information?</b> See the <u>recovery process documentation</u>.', 
			   			new mxGeometry(0.15, 0.5, 20, 20), 'shape=mxgraph.azure.azure_alert;fillColor=#172B4C;strokeColor=none;fontColor=#172B4C;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=middle;html=1;spacingLeft=5');
			   	icon1.geometry.relative = true;
			   	icon1.geometry.offset = new mxPoint(0, -10);
			   	icon1.vertex = true;
			   	bg.insert(icon1);
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Banner');
			}),
			this.addEntry(dt + 'banner', function()
	   		{
			   	var bg = new mxCell('', new mxGeometry(0, 0, 625, 50), 'rounded=0;fillColor=#DE350A;strokeColor=none;html=1');
			   	bg.vertex = true;
			   	var icon1 = new mxCell('A database error has occurred. Please reload the page.', 
			   			new mxGeometry(0.15, 0.5, 20, 20), 'shape=mxgraph.azure.azure_alert;fillColor=#ffffff;strokeColor=none;fontColor=#ffffff;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=middle;html=1;spacingLeft=5');
			   	icon1.geometry.relative = true;
			   	icon1.geometry.offset = new mxPoint(0, -10);
			   	icon1.vertex = true;
			   	bg.insert(icon1);
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Banner');
			}),
			this.createVertexTemplateEntry('fillColor=none;strokeColor=none;html=1;fontColor=#596780;align=left;verticalAlign=middle;whiteSpace=wrap;fontSize=12;fontStyle=0', 
					360, 25, 'Atlassian / Atlassian Connect / atlassian-connect-js-extra', 'Breadcrumb', null, null, this.getTagsForStencil(gn, '', dt + 'breadcrumb').join(' ')),
			this.addEntry(dt + 'button primary', function()
	   		{
			   	var bg = new mxCell('Pay now', new mxGeometry(25, 0, 86, 33), 'rounded=1;fillColor=#0057D8;align=center;strokeColor=none;html=1;whiteSpace=wrap;fontColor=#ffffff;fontSize=12;sketch=0;');
			   	bg.vertex = true;
			   	var icon1 = new mxCell('', new mxGeometry(0, 9, 14, 14), s + 'checkbox;fillColor=#008465;strokeColor=none;html=1;sketch=0;');
			   	icon1.vertex = true;
		   		return sb.createVertexTemplateFromCells([bg, icon1], 111, 33, 'Button (Primary)');
			}),
			this.addEntry(dt + 'button standard', function()
	   		{
			   	var bg = new mxCell('Create Group', new mxGeometry(25, 0, 115, 33), 'rounded=1;align=center;fillColor=#F1F2F4;strokeColor=none;html=1;whiteSpace=wrap;fontColor=#596780;fontSize=12;sketch=0;');
			   	bg.vertex = true;
			   	var icon1 = new mxCell('', new mxGeometry(0, 9, 14, 14), s + 'checkbox;fillColor=#008465;strokeColor=none;html=1;sketch=0;');
			   	icon1.vertex = true;
		   		return sb.createVertexTemplateFromCells([bg, icon1], 140, 33, 'Button (Standard)');
			}),
			this.addEntry(dt + 'button link', function()
	   		{
			   	var bg = new mxCell('Visit documentation', new mxGeometry(25, 0, 125, 33), 'fillColor=none;strokeColor=none;html=1;fontColor=#0057D8;align=left;fontSize=12;sketch=0;');
			   	bg.vertex = true;
			   	var icon1 = new mxCell('', new mxGeometry(0, 9, 14, 14), s + 'checkbox;fillColor=#008465;strokeColor=none;html=1;sketch=0;');
			   	icon1.vertex = true;
		   		return sb.createVertexTemplateFromCells([bg, icon1], 150, 33, 'Button (Link)');
			}),
			this.addEntry(dt + 'button primary', function()
	   		{
			   	var bg = new mxCell('Submit', new mxGeometry(25, 0, 80, 33), 'rounded=1;fillColor=#0057D8;align=center;strokeColor=none;html=1;whiteSpace=wrap;fontColor=#ffffff;fontSize=12;sketch=0;');
			   	bg.vertex = true;
			   	var icon1 = new mxCell('', new mxGeometry(0, 9, 14, 14), s + 'close;fillColor=#BA3200;strokeColor=none;html=1;sketch=0;');
			   	icon1.vertex = true;
		   		return sb.createVertexTemplateFromCells([bg, icon1], 105, 33, 'Button (Primary)');
			}),
			this.addEntry(dt + 'button standard', function()
	   		{
			   	var bg = new mxCell('Done', new mxGeometry(25, 0, 55, 33), 'rounded=1;align=center;fillColor=#F1F2F4;strokeColor=none;html=1;whiteSpace=wrap;fontColor=#596780;fontSize=12;sketch=0;');
			   	bg.vertex = true;
			   	var icon1 = new mxCell('', new mxGeometry(0, 9, 14, 14), s + 'close;fillColor=#BA3200;strokeColor=none;html=1;sketch=0;');
			   	icon1.vertex = true;
		   		return sb.createVertexTemplateFromCells([bg, icon1], 80, 33, 'Button (Standard)');
			}),
			this.addEntry(dt + 'button link', function()
	   		{
			   	var bg = new mxCell('Click here', new mxGeometry(25, 0, 75, 33), 'fillColor=none;strokeColor=none;html=1;fontColor=#0057D8;align=left;fontSize=12;sketch=0;');
			   	bg.vertex = true;
			   	var icon1 = new mxCell('', new mxGeometry(0, 9, 14, 14), s + 'close;fillColor=#BA3200;strokeColor=none;html=1;sketch=0;');
			   	icon1.vertex = true;
		   		return sb.createVertexTemplateFromCells([bg, icon1], 100, 33, 'Button (Link)');
			}),
			this.createVertexTemplateEntry('rounded=1;fillColor=#0057D8;strokeColor=none;html=1;whiteSpace=wrap;fontColor=#ffffff;align=center;verticalAlign=middle;fontStyle=0;fontSize=12;sketch=0;', 
					86, 33, 'Primary', 'Button (Primary)', null, null, this.getTagsForStencil(gn, '', dt + 'button primary').join(' ')),
			this.createVertexTemplateEntry('rounded=1;fillColor=#F1F2F4;strokeColor=none;html=1;whiteSpace=wrap;fontColor=#596780;align=center;verticalAlign=middle;fontStyle=0;fontSize=12;sketch=0;', 
					86, 33, 'Standard', 'Button (Standard)', null, null, this.getTagsForStencil(gn, '', dt + 'button standard').join(' ')),
			this.createVertexTemplateEntry('fillColor=none;strokeColor=none;html=1;fontColor=#0057D8;align=center;verticalAlign=middle;fontStyle=0;fontSize=12', 
					86, 33, 'Link button', 'Button (Link)', null, null, this.getTagsForStencil(gn, '', dt + 'button link').join(' ')),
			this.addEntry(dt + 'dropdown button', function()
	   		{
			   	var bg = new mxCell('Dropdown button', new mxGeometry(0, 0, 140, 33), 'rounded=1;fillColor=#F1F2F4;strokeColor=none;html=1;whiteSpace=wrap;fontColor=#596780;align=left;fontSize=12;spacingLeft=10;sketch=0;');
			   	bg.vertex = true;
			   	var icon1 = new mxCell('', new mxGeometry(1, 0.5, 12, 6), 'shape=triangle;direction=south;fillColor=#596780;strokeColor=none;html=1;sketch=0;');
			   	icon1.geometry.relative = true;
			   	icon1.geometry.offset = new mxPoint(-20, -3);
			   	icon1.vertex = true;
			   	bg.insert(icon1);
		   		return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Button (dropdown)');
			}),
			this.addEntry(dt + 'button label only', function()
	   		{
			   	var bg = new mxCell('Label only', new mxGeometry(0, 0, 80, 33), 'rounded=1;align=center;fillColor=#F1F2F4;strokeColor=none;html=1;whiteSpace=wrap;fontColor=#596780;fontSize=12');
			   	bg.vertex = true;
		   		return sb.createVertexTemplateFromCells([bg], 80, 33, 'Button (label only)');
			}),
			this.addEntry(dt + 'button icon and label', function()
	   		{
			   	var bg = new mxCell('Icon and label', new mxGeometry(0, 0, 120, 33), 'rounded=1;align=left;fillColor=#F1F2F4;strokeColor=none;html=1;fontColor=#596780;fontSize=12;spacingLeft=26;');
			   	bg.vertex = true;
			   	var icon1 = new mxCell('', 
			   			new mxGeometry(0, 0.5, 12, 12), 'shape=mxgraph.mscae.intune.subscription_portal;fillColor=#596780;strokeColor=none;fontColor=#ffffff;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=middle;html=1;whiteSpace=wrap;spacingLeft=5');
			   	icon1.geometry.relative = true;
			   	icon1.geometry.offset = new mxPoint(10, -6);
			   	icon1.vertex = true;
			   	bg.insert(icon1);
		   		return sb.createVertexTemplateFromCells([bg], 120, 33, 'Button (icon and label)');
			}),
			this.addEntry(dt + 'button icon only', function()
	   		{
			   	var bg = new mxCell('', new mxGeometry(0, 0, 32, 33), 'rounded=1;align=left;fillColor=#F1F2F4;strokeColor=none;html=1;fontColor=#596780;fontSize=12;spacingLeft=26;');
			   	bg.vertex = true;
			   	var icon1 = new mxCell('', 
			   			new mxGeometry(0, 0.5, 12, 12), 'shape=mxgraph.mscae.intune.subscription_portal;fillColor=#596780;strokeColor=none;fontColor=#ffffff;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=middle;html=1;spacingLeft=5');
			   	icon1.geometry.relative = true;
			   	icon1.geometry.offset = new mxPoint(10, -6);
			   	icon1.vertex = true;
			   	bg.insert(icon1);
		   		return sb.createVertexTemplateFromCells([bg], 32, 33, 'Button (icon only)');
			}),
			this.addEntry(dt + 'button subtle', function()
	   		{
			   	var bg = new mxCell('Subtle', new mxGeometry(0, 0, 80, 33), 'rounded=1;align=left;fillColor=none;strokeColor=none;html=1;fontColor=#596780;fontSize=12;spacingLeft=26;');
			   	bg.vertex = true;
			   	var icon1 = new mxCell('', 
			   			new mxGeometry(0, 0.5, 12, 12), 'shape=mxgraph.mscae.intune.subscription_portal;fillColor=#596780;strokeColor=none;fontColor=#ffffff;labelPosition=right;verticalLabelPosition=middle;align=left;verticalAlign=middle;html=1;spacingLeft=5');
			   	icon1.geometry.relative = true;
			   	icon1.geometry.offset = new mxPoint(10, -6);
			   	icon1.vertex = true;
			   	bg.insert(icon1);
		   		return sb.createVertexTemplateFromCells([bg], 80, 33, 'Button (subtle)');
			}),
			this.addEntry(dt + 'button disabled', function()
	   		{
			   	var bg = new mxCell('Disabled button', new mxGeometry(0, 0, 110, 33), 'rounded=1;align=center;fillColor=#F1F2F4;strokeColor=none;html=1;whiteSpace=wrap;fontColor=#A5ADBA;fontSize=12');
			   	bg.vertex = true;
		   		return sb.createVertexTemplateFromCells([bg], 110, 33, 'Button (disabled)');
			}),
			this.addDataEntry(dt + 'split button', 80, 33, 'Button (split)',
				'1ZVNb6MwEIZ/DcdGYJdu91iSkksrrZTDni0yYKvGRrbJx/76HWOTkC81UtVDIwWZd2b82p4HSOi83S0N6/i7XoNM6GtC50ZrF0btbg5SJiQV64QuEkJS/CekvBHNhmjaMQPK3VNAQsGGyR6CsuqkcEG1bi+janSv1uCLsoQWtZByrqU2Q5CWWUnKR9StM/oDxojSCqsL7lo51mnlJnX576dfzynqTIpGoSahdjFtJf5564z4aTtWCdW8DdFF5ivsB7iKx2k5q3hvYMk6FPw6Oi2UA/O6wVOwqKVx0pK1Qu5ReDEVFw4qjJJ0wfqGY/rorHtTeW/uXIfxnL7gBU/QX3yCnTVaNxJYJ+ys0u0QqOyQWtbBAocnJjkpJjZbr69wV95ma/y6i9gIMA52N5s5SLGTS9AtOINe6VasHQ8Zz6HfKQeBbkGjNGjMhvvmUHkkAwcRjuug0AtQLhixnHV+6IxgqvFqsRYG9y+0b67VvV/kOTwHCD6D59Dy9Ce2fMI0Se9tN7ne7tOCfXzOZ3m4n8CQkUsYnoJkQDInNnAy1TVAov0ff75H74f4XhndH84Q03VtwV0AdtjEXcw93s+cFOoWb6dcIXH18DuDa0j6G4+O/Pg3zPfh9gle47vmq3zR/OtA4e3xSxrSpx/a/w=='),
			this.addDataEntry(dt + 'button grouped', 320, 33, 'Button (grouped)',
				'7VZdT4MwFP01PGqg3eZ83ZT5YmKyB58buECzQkkpg/nrvUBhYxs6oyMmSkLSey73o+fclFp0GZcrxdLoWfogLPpo0aWSUjeruFyCEBaxuW/RB4sQG1+LuANep/baKVOQ6EsCSBOwZSKHBmmATO+EATKt5AZeua8jBByLLrKI+bJAw0bDZ1kEvjGY4GGCaw/Lg0Ig0rHYR6VVyrgMq+3extLb5OmtUuBhqwu15m+V26nyBFyIpRRS1S1Q13GJO6ly1L0ceIL66Txtl+22QGkoB6mpIcPLCmQMWu3wk8IkQS819NkR8DAyYZQ2GMsaO+xC90TjwnB9nnd6wvsi11omiJ0qoGSe+B3HgUx0yxUx9gEj0/vZ3bz7ziQ55jSRCXyJTtQHMiz61PJQKVpEXMM6ZV5VokBR+4JfpAH5VIP5BxIoEEzzLfTSn9PFVHiRHAsTu+ynbiNkEGSgT3Ts+rpI2smwtPRf2rGkdWbX0HY6rO1k9IOz4syUPz4+f/UcfWd4+gHjjNLNVY6J2fAoOWOPkoDgz03ST8/OwJ8fzf1trhmTw8veOw=='),
			
			this.addEntry(dt + 'button compact', function()
	   		{
			   	var bg = new mxCell('Compact', new mxGeometry(0, 0, 86, 33), 'rounded=1;fillColor=#F1F2F4;align=center;strokeColor=none;html=1;whiteSpace=wrap;fontColor=#596780;fontSize=12;sketch=0;');
			   	bg.vertex = true;
			   	var icon1 = new mxCell('', new mxGeometry(107, 13, 6, 6), 'shape=ellipse;fillColor=#596780;strokeColor=none;html=1;sketch=0;');
			   	icon1.vertex = true;
			   	var icon2 = new mxCell('', new mxGeometry(117, 13, 6, 6), 'shape=ellipse;fillColor=#596780;strokeColor=none;html=1;sketch=0;');
			   	icon2.vertex = true;
			   	var icon3 = new mxCell('', new mxGeometry(127, 13, 6, 6), 'shape=ellipse;fillColor=#596780;strokeColor=none;html=1;sketch=0;');
			   	icon3.vertex = true;
		   		return sb.createVertexTemplateFromCells([bg, icon1, icon2, icon3], 133, 33, 'Button (compact)');
			}),
			this.addDataEntry(dt + 'button grouped group', 556, 33, 'Button (grouped)',
				'5Zhdj6IwFIZ/DZdj2iKol4szzm4ym0wyF3NNpEBjoaSto+6v35YWR6Z+MFlQkzUxsQdOP5737Sni+fNi+8zjKv/NEkw9/8nz55wxaX4V2zmm1EOAJJ7/6CEE1NdDixNXYX0VVDHHpeySgEzCR0zX2ESeEiJNUMgdtUHO1mWCdQ70/CgllM4ZZby+6AMQBgs1QBRTkpUqtlSDY3UxEpKzFW5uLVmpuotyWdCmI1bKg47S+mPjb+SPHhwi1d7kROK3Kl7qyEbBUjE7ccwl3p5cfB2yK3/GrMCS79QtG5LI3NwRGD4gxyTLbZbvm1gsTDvbZ36SVD8szONgfQfsnBWFnti32C7gAi3GPbANZuFkCq7A1iYEgck4QD0dCPXYQf1DCE3r/yANx8BBPRkIdeCgdiAbWu92LpqPyOOEbVRDQ0likdcSgGOoD6iqrEp3WWwzXR1HBVuu1tWIc7xUC4p4QxackbKt3GGFac8S9SADgq7j0XggHUJHh1/K7uCVs4xjIW4tyjH3n90ldqZftbR7rbuMagpYqEF/Nrzhv+y74OLpMTujL8c0luQDt7o/Jrod4ZURfTo0fgpBO4OlqcDSMcl+Xp18M3F88874KqXKCX1YhuJUdjOMxhWtpWSls5fvxjdCWYaU2Uu9KDO5vq3UTriOsR5mQzhr2uFksF6QnMRlpqNRQnTlINoFj4Kt9eq/FvO94OeP4S4iTLqIsDMtMHLLOUSuKGE/mtjH9Gb0B38AiWaORC+xrvBXPix0kbj3rT/gkRH2sbO7PidAcHlb3vSpuIc/GsB9/A3CYR67ILyMs3G9yiSVwIMWNCPv6YoWtIoK9B1QRziFPWBy3yrcMyZ0K0zuO4J7xuRfB5Nqfr7+Mqfc4duxvw=='),
			this.addDataEntry(dt + 'button grouped group responsive', 551, 104, 'Button (grouped, responsive)',
				'7Vnfj6IwEP5reLwNbYXFx9PTvZdLLtmHeyZSpdlCSVtXvb/+WiiIVlxcf4B7mmiYKdMO3zedGaqDxsn6hYdZ/ItFmDpo4qAxZ0wWV8l6jCl1oEsiB/1wIHTV14HThlGQj7pZyHEq2xjAwuA9pEtcaAqFkBtqFEJy9ob/kEjGSgEcNBJxGLGVElwlRKGIcWSEkJJFqq5nannMlSKWCd1aZXrKZL3Qj/uUsNnbMnviHM+UqyP+Sv7qYaDnmRNKx4wynruApmAKpwM9R+5LbWSef6qR0svysTCXeN0ITa4yuLxglmDJN+qWlZlEw4MK+NwYk0VszBAqdKEo5EVlugVaXRisD+OOLNy/C6GxuzH6FM/laCklSy0KWCpLGRq5Brw39J+D6j7j7z51KUvxSawpH7BQi/4s4daur2Ii8WsWzvQSK+W90rXiF37Ir3+EXo5pKMk73pn+HM4HjZy7kqmfBFvsc7ZMo4rfflNSC7YLsTO8BDtmhd+MqIWhu94lvrRg87nA0mKz8qsVwZ5F8JgliX7gW+dUjdf/tq13DWphFFwvjL4F14gj/1GUm9iFnmvxC4B/nSL9/CjS19/Nfr+KdND93ruH5H0OtY2J2juyj89N1OXcF03UwxbBYkhWhiQT2E6jFWm7jBiaqnBpg3dwHG/TnmyMiCz8D8DvNwPddkcB955Qgl2hBO4JJdQVSo/zimZOAv92rRF4HGDcoDcCPTvBAPYRxhfrjtR9A+hBf3KjFqmJ4a/TIwH7VOT0wraH/DmFrYjh/nVJbV76+wNTZ22S/U7eZ5g665Ps19hJRPReJ0IojV4D5UmzdtnVYWWLhupTOfmDelBZ7teDz5fro7EwGPg7wYACu11zvQPhcHo8KHH7F2KRs+v/MP4D'),
			
			this.createVertexTemplateEntry('rounded=1;fillColor=#F0F2F5;strokeColor=#D8DCE3;align=left;verticalAlign=middle;fontStyle=0;fontSize=12;labelPosition=right;verticalLabelPosition=middle;spacingLeft=10;html=1;shadow=0;dashed=0', 
					12, 12, 'Text', 'Checkbox (off)', null, null, this.getTagsForStencil(gn, '', dt + 'checkbox on').join(' ')),
			this.addDataEntry(dt + 'checkbox group', 150, 173, 'Checkbox group',
				'7ZjNjtowEICfJldkEgL0yALhQqVK+wCVcSaxhRNHttmFPn3HiWFZzLZLUZGqJlIiz4/H8cynUZwomVf7laYN/6pykFGyjJK5Vsp2o2o/BymjmIg8ShZRHBO8ozj7wDpsraShGmr7mQlxN+GFyh10mmeQwCzkqGWqKABM52LsQXqXQkg5V1JpFGtVo/bJWK22cKEsVG2fxQ83azg8yj6Mk6kUZY1jCYX15mOEKE7SL+PJlLjYW7CMo9IJnDK+07CiDSpGqGiUqC3o5Qvu2HgnFymjlZAHVMw048LinnAjZEF3JUf349uonWbudbi1DdrTZIYPzJZ7OAczKJUqJdBGmAFTVWtgpnXNim4JHL5bJI2fzpbxCQZtYf9hkVqVr9AKVAVWY1zyKnLLvUfaFZJwEBjaV8/rqOnk8jT1reQ48FW/TkASELA0jQZjVFB3rXZ1Drmv3jkFWK6MZHGWBiigZTFdzJdJWGDSXiEHLleCUTnz6krkuYQLfsgFX5i+J0k3IL8pI6xQbqLuMnUKuL6wnwKbhjJRl+t2/cWw5cxW0m/UcJqrV79mTg1vU/B/k3mc4AE8eJa8eM5tHGJ71N2D7SjAdk6bZsewjiG4nysmp43zr/ala8cDaiU1RtB6wDiw7Ubtv8ch9oSkk8X0Vx3wXyG+h/k9zGn6MJjTAOZMUuvWdrvtce5xvh/n6eN68zjAea3qEjUbSdm2/6zoPytuQ3dIHteKJwG7szy/DdmbemjRXme0Mqi7PP4Rr6Oesd8xdoRqFDbE8ZUzVpLcD9X0ysdqzfC0f8/J+tpRuYfosY1qctGo/h5TKL79FWpt734a/QQ='),
			this.addDataEntry(dt + 'dropdown button', 100, 53, 'Button (dropdown)',
				'5ZVPj5swEMU/DceNjJ1s2+MmWXJppUp76NkCg60YBtlDNumn7xhM/sFqt6p6qHoIst/M+AW/n0QiNvVx52Srv0GhbCKeE7FxADis6uNGWZtwZopEbBPOGf0Snr1RTfsqa6VTDX5kgA8DB2k7NSgvKLHzg+zxZKPsoGsKFabSRKxLY+0GLDjaN9BQz9qjg726EzXWdhyBBsdqwsXqy+Onz4x0aU3VkGZVibHtxfwMrmkY863MTVN97avblM217BXmOtpomevOqZ1sSViS0IJpULnnA92IJ208IZO1sScSnlyuDaqcqpxtZVdpah9toHN5MNKILdVX4okedJvhERr8ogKorJKt8Ysc6r6Q+741KwcLWt6YrPj6yiYGoByq45sh9lJMcKegVujoXPZqCtSxgw1BM60MHR3TjZr0w746j16QoEWkYp4QMSHkB7h9aeH1NxihwLM049ny74DC50H5f8E43eb/HidC/DknywknEz68lm1YojOyqYK6LoyjdzcQgvXQhX95D84ZgPfAOcfN/sW4r3jm7KPxi/n4bwciDGyxmtLApzA8DpJTVqI5qJuj5gCJ9t/D/V68H0b2ovvDHWJQll7hBLDzS8wxR9vLl3Fov/5w/gI='),
			this.addDataEntry(dt + 'dropdown button open', 110, 200, 'Button (dropdown, open)',
				'7ZhJr5swEMc/DccXmS3LMRu5tFLVd3hnFwxYMRjZJks/fQcwZAGyNH2H1yRSkP2fGU/w/DQmGPY82a0EzuLvPCDMsJeGPRecq2qU7OaEMcNCNDDshWFZCL6G5fVYzdKKMixIqm4JsKqADWY5qZR3hVUuK1mqPdOy4HkakCLKNOxZSBmbc8YFzFOegs9MKsHX5EyMVcLqEJ6q2mpYtjsZjsYIdMxolILGSKi02zv9XWQ1izCZYZ+m0bfSujBRl8uaKD/WaWLsx7kgK5yB4ICQcZoqIpYb2BEJWr2ChxPK9iBMhR9TRXywWmiB8ygG9zoNz4VfJIqVysDu2lO4wG4Wl8JBDiLOI0ZwRuXA50lp8GXp6oVVChieJHGt2VEaXQAiFNn1FrGUdAVXhCdECVgXbWmgYu2BqkKjmFBYWldXa1hW86gJPSABA01FNyF2i5APLtYh49s7GIGCwy6M3fH9oITl5zIoVjcoDRjo2cDYn9b/Gie2/TgnTouTFh8yxlkxVILiNCrUWUAF3DvlRWElz4tfeQ5OA8A1cL52Hzji2UK3lt/uLv9pgIYBDdw2DVYbhmElCcKwohtyslQXIDr9j2J/D7nfavZ09rczxHgYSqJagDU3cRNz7nXmLvakHrTAsvCW5tItLDEOoNVpqA6wYeHrajnPid7lzuMO26yZHZ3HdJzHW8+whcGccQlF74cBtWHwHM/1Rn19puEAnXFw96l0dr4156IgEgI/9IZ9/YZ2E0Xu9QebLmzqA+tvm9T+BJx/2pNGLRh/kg0l27twvPRM/SLxPyTRnnwCiuMWitNfOA0AoxeLLxZ7WRxZn8DipMXiDX8jXyg+OYomch9nEaaHF2qV+/H7tj8='),
			this.addDataEntry(dt + 'dropdown avatar', 160, 167, 'Button (avatar)',
				'7ZjRcqIwFIafhss6QAT0ckXtTXfGme7MXqdyhMwG4iSh1T79JhKoAiJWu9NudQYHTs4h8p0/P4iFwnRzz/E6+ckioBaaWSjkjMliL92EQKnl2iSy0NRyXVttljs/MursRu015pDJPgVuUfCMaQ5FJEwYE6BiWG0RCBJnwIssIbfUZHGWZxHokzgWmqwIpSGjjKvjjGUqZyIkZ3+gFkxkSssSlsly1HKRN/aDka3imKoJVYzCSpq0R/KqZ3V0mVjjJcnih93o1LEbKcXlAJewOYpkFzI87oGlIPlWpbyQSCYmw2CzEyBxYsrKGBbFcVyVvgFWO4ZxO2/U4H0GWsXJ9dDIG/XgewmI7eH17nPxWrggdDmX4WkuIsFrvSs5wVmso5OIcFhKwrRgBMv1r6wDW+0+J4H1oYXaaR0WGHb2wGvCc5vs/CLEgWJJnuHgVG08zfQLRtSvqua+K1tlZr+rdYStVgJkox/VRfRqkddo0QKTWDvFr5y3eUTZsHQTa38bECaCAVmyTAxyofL79mpf9scdpCrucBC33UEofgK6YIIYKfGiPxOtB7LE9KE2npIo2umvTPhhpqwGLtFTh4LKZXLgSsOrSMipKagU61Ul5F/ofscFMp3PnJmnRxIcsRdTvqcWzJdGBcNezem2Rs9vrm6/xRodp6MRfb0xOIea3aQ2H869eXDMAitgdg3Y2cuotiCrNcvVQ8Qr/Dao+nmtf/oW3ca7vBW9dzFsD3R6Ve2PPrd9Vilfxj6Db2ef40uMoOu5/OYBTQ9A4w/oYCmTvRY+4lQF1HcOVNxM4EwTGH87E6j+495c4B+4QPAhLWx564IF6MsKE5w+Ab8ZwblG4HQ/sP8HTqAO394LFun7rw3/Ag=='),
			this.addDataEntry(dt + 'flag message', 333, 90, 'Flag message',
				'1Vbfj+IgEP5r+rgGwXrro/XXy12yOTd3z9hOC5GWBlDr/fUHBV3datace5uoFpmZbxiY+YBGZFI2C0Vr9kNmICIyi8hESWl8r2wmIESEEc8iMo0wRvaJ8PyKtd9aUU0VVOYWB+wdtlRswGu8Qpu9CAolN1UGDt+PSJJzISZSSNUaSd5+rF4bJddwYpnOZ/1Z7CyMZnIX3JkpRehSlS75Hxdk4FBrMCk7oGjKNgoWtA7WWvLKgJpt7bK01SE3E1mZOS252FvFWKWMG0itFaMp3RTMwgNoKTcqdXGYMbW1x2RsG5sS1ziA7hVSFgJozXUvlWVrSHULnec+hO2eBYlx8j6MXwx2cwtZBWWguVqZVhXKsgBZglE2DtrxzDCPIIR4NwbchvLKka8ootrLxdH1rc62E0p9ueykU/bl6/jn69Nz7IJRl8QVQGX/UgXU2Oq/Z8VJIY8FdivPqGYtWZC31A5fNoVjeI8aQbXmtOqlDNL1SjZdRpFhQr7NOoyqZAXn/DnJeX9wkMMEXXBBVyBepOaGy8rqlE9hQgUvnCwgd6Kuacqr4nsr+eoduYgekYs3cQ9/yD2b0w71DjoFghq+hbPhL/ExRHhxKbOQMB8ce4/9uXgYQOa5BtOh83GaNzF80GH4Lw47B9DaatyxaH9DWtZtysgzxsO25wzjzBIeGWmbCho3c12rdglfsgsC1+/dAE4+2VgIDUYJurABHvrk/SS24yHq0j3cnffS/TB0oHuM/gPd44/v8Tu52ly65JP2e7T8DgnFD0+rf7rQr9Ds3OFrjtgnMvr0M9aKby+mHn763voX'),
			this.addDataEntry(dt + 'multiple flag message', 333, 150, 'Multiple flag message',
				'1Zfdb9owEMD/mmhPQyEhaH0sFKpJ3VSpD3ucXOeSWDhxZJuS9q/fnW1oIFStWpgEH5F9Hznn7uczROm87m41a6tfKgcZpYsonWulrB/V3RykjJJY5FF6EyVJjN8oWb6hHTtt3DINjf2IQ+Idnphcg5d4gbHPcieItVo3OZDLOEpnhZByrqTSTp8W7oVyY7VaQU9zs1yMFxlpKparTXCvbC3DkGn+IF4ozoSsVmB5tbVivFpruGVt0LZKNBb04gmfzKAsppWoxi5ZLeQzCq41r4QFjtokvmHrskLzYPSg1ppTnMraFvVZeo0XzApdyMCMSqVKCawVZsRV7RTcONNl4UPgcC9IlswOw/iHSWhtIbGgLXRvFseJQmVuQdVgNcaJNyK3lbdI09S7VSAwVHDLfFVjZryg3Pm+1hoHodzHS58OSv9bFJbCc9VwYQBHVljE4JAILGdLw7orCdwRe8FK+etfJvGJh5Asl9k0jQeQNKqBfSR6aRxPtvMQmvwlewR5r4ywQjUo0z4rMyZFSXMJBU1Ny7hoyjs38wXZ4RVfIl4fwil5FyfM6ZCmINMgmRVPsHf7Y4SFCPeUMjQJ60ky7/G8P93eQBWFATsAdLfMDzE7GTD7036jgjyCoaWIgqCteujGgtSiIYIxT9BwEnLm8GZN7uydTQ6Ga9E6rlAInd16m3WLNaC7FErXPkdbZ7YBg08wGmyS/gYImH+VfZr39lTsXkP2N4TQA24A8ttoQvzCe+uJ4MeUDemfxiehf3ubQP9hgz4J/dn7h3WPpt2hS9XMmancAR57zX7/tpIZI1gz6o4d4zP33mn+hIQmF4/Vp47sNzDbd/g/Hfd7enX+ljsdQHcnmhV1SIWXWmkInTGin5r4mbK6dclMf5A3jUjR92Lcd9nTwssr4KtH1R38+jhX851czY4038veEedstMlZGu14nHwdepy+/uXy5v1/ZP8A'),
			this.addDataEntry(dt + 'multiple flag message', 333, 120, 'Flag message',
				'1ZZfb9sgEMA/jR8XEWg67bFJk+xhkyr1YdojtS8GBYMHOEn36XdnSJrUjVqt3aQ4CoL7w8HdD+xCzJrd0stWfXcVmELMCzHzzsXUa3YzMKbgTFeFuC04Z/gv+OKMdtxrWSs92PgWB54cNtJ0kCRJEOKjyQLvOlsB2Y8LMV1pY2bOON8rxap/UB6id2s40twu5uP5hDRKVm6b3VVsTO5KX97r3xTkiqzWEEu1t5Kl6jwsZZu1rdM2gp9vcFsBZYxW4mxcyEabRxTc+FLpCCVqObuVXa3QPBvdu86XFEfF2KJ+Im6wwZRQQwZhVDtXG5CtDqPSNb2iDL3pYpVCYPckyIRPn4dJm+G0tpxV8BF2ZyvTi3JZluAaiB7jsK2uokoWQojkpkBjqOyWS8pkSIL64PtUaOzkWr9cdzGo+0/X0ZwesLVYL85KZy1uFkv/HImjKh6qS9uuZFA9KSxpWrJvdjXhPZLRyBC0tKNSQbl+cLshTuJ6Kj7PBzhZZ+EUnqOEj6/247xACm7kA5g7F3TUzqLMp/xNpdE1jQ2saBhaWWpbf+tHqXQHENklgvgm8Pir4GFOh9xlmQcjo97AyfQvsZgj3FHK0CSvh0+Sx+PpcD+BW60CxAHKh2W+ie6rM3QruSG8HwAshazoWuMsOmoUaWq87NqCDtj1r47u4OlC2+qg/ir1muZxthdpqjEiBqMn+8FZOSY8c/xeuGl8dGhY/wzh3hIj90g4+W09MXzh1+wH0Y0pG+J9zT4E7/00Ge8J+wd4T15/ab/zht699Eaf9r+D5kdOKL94rP7q7X0Gs1OH/3OlfhJfPvxOxeHTV2gyP/5I/QM='),
			this.addDataEntry(dt + 'inline dialog', 292, 228, 'Inline dialog',
				'7Zhdb9sgFIZ/yy58uQjjOG0vm89ddFqlatrlRG1iULDxACfpfv04BjtOnKyR2kyr2khx4BzgYL/PAZwgmuTbhSIl+ypTKoJoFkQTJaVxpXw7oUIEGPE0iKYBxsh+Azw/4Q1rLyqJooU5pwN2HdZEVNRZnEGbJ+ENSlZFSqF9GETjJRdiIoVUtTNa1h9r10bJFe14pvNZOIvBw0gqN747M7nwRaKSB/4bggyh1YqahDWtSMIqRRek9N5S8sJQNVvb29LWhmAmsjBzknPxZA23KmHc0MR6MZqSKmO2uW/0ICuVQBxmTGn9cXRrL/aRwAUa6EEmZSYoKbkeJDKvHYmum86XLoQt7gWJ8fgwjLsZDHPzT5UqQ7cnlalNXpYFlTk1ysZBG54a5tW58XIwym0o3+3GSYqIdoas7bsT2ha81sd1j3q6f9fUGgyD6xdeThgxEKMse0B0EShkQXvqe2NH687zCYdN3Y9YsyB4VtiyoEvz5mE4S3z8vPhD1BffpzNSVBDD13Rv/GNA+BD38MxsEz8hHLseT756MIBcLjU1PZ7aeZ6F2LCH2A9ZiRSiygpugVjYlC3Ikhb2R/BiBYLx4jiHgif2lmVRN9GGEhhKLt14MM6jkhsNCswvjWxDXGe5Q/Wnj/IGIHkoSc3cRgHEH3ifxHt0EbxjdAG84x7e3xzHp/g9xmWHt3abBL1Tolm95SLnKaF9vs3gnDAgRhCtOSkGCaPJ6lFuf+L+zoxQfDW9PgX6mfSCyjbtxK035zxNBT2RDU22wGQEeaTiXmpeZ2w0VU7jdsC7A387sLapwovsro4/DVE3XdA7Tpfw2EkAv0q2RGgvW0J8iXQZ9dJlCkv5iOSwIpJS2mBjmBQj691BpEkbO6ORMF40W01adEe/Kjgrjz3x6XXXNMrgdwGTR9x8agYJnLaN/2O3+P/x/4eHoTDGF+D/6oUvWkP7XEezUyTubR5H37HqVfltr6Sv+ZLVSD/E+9rfeBY66MVHyIuil7+CXT9PxOHOn+uE0AEFlUrFNR1YLo3dLfXZL+YNL+8PhKu/goAG+4tAW++uQZdbgj6H+3twW3/JGmSruz+SXPPu/0x/AA=='),
			this.addDataEntry(dt + 'inline dialog', 340, 450, 'Inline dialog',
				'7VnbbuIwEP2aPBblyuURAnQfqFSJavdxZYghVh0b2YbCfv2OE3N1aEGQh0hBAmU8thOfc2Y8OE4QZ9tXgVbpG08wdYKRE8SCc1VcZdsYU+r4LkmcYOj4vgtfxx9f8Xq5110hgZm6ZYBfDNggusampRjgSrWjpknwNUuwHuE5wWBBKI055SJ3BsPRyBu1oV0qwT/x3sM4w7oxRQn/AtsFI1UZNZMgMZ+Sf3r+SHsWnClje752U7JkYMxhGRimG2ywUGSOaN84MpIk8HjFw4MPb68CkDeZ1b9inmEldtDliyQqLXqEZskpJstUncOAZGEvDyOPaMKFAbQc3MACd6qQUPrmSM1TwpZwqVIi9Rgp1/gO5Pf4VgA6xQt1HXKYfoXm8OyTvNvQcx9hYXvOwAkpvlsRK6HFyn2CX+QfC3sdCmMIheiUAO8aAZ7Bf4wyQnfQ8BuLBDF0QUto7JObuPnHpusRFnZGrzYLQVlshM+gIbJo6CfJPjSwkBYpt6r/BO9TKA+2mdGC8Bb8wh9zybfJRGCKFNngs/nLQDS3eOeEqWOU7DHbnZv7CfhiIbGyODg85020tO+NjqOme7ekKFBwGPf64/E5U0WnPwZH/1lk9ErICKIqyIjcCsjo/EwGpJqVvsy2S11EtAiXnRaZcyZblPNPyNN/lxRJeSM3fhh0ot7j3LS/TffeGXRuK7LyjhfZxHnPIe5ln+bM7V86rSoCqWtx947IErZ492MtGBQ1dzC5lnkRdPNG5EdBN+raubCsy8U2clkUWJt9MKBohuk7l0QRrkeKgqJDwTC58B8Kh6sVxdNyb0nqDauIds+tItx7lmSmKIMG+F1jau+IjWJqpJjAr0Axh+L7KJkJ1mUkiEbhDWaNaGotmnZYhWg8SzQxklivMk5RNisrvhvV1Eg1vXYVqrGPiiZE5pmGZCsJYDaaqa9mDvXqczVjn4B9oCzTq3ybDzlDNGlUU2fVtKsogz37hK6fa6b541R/xfQqKYPtw8RYEKn4KtV6cQdrxoCLpqyps3QCv5Ji2D7w/AB5aNVMMwKrbCRTY8lElVTC9rFsTFiiV/mLz2ZNlqm1ZLpPKITBPL7CL7qfvuH/Dw=='),
			this.addDataEntry(dt + 'inline edit', 350, 55, 'Inline edit',
				'7ZpRj6I6FMc/jY9LSiuij6OOcx92kk02ufe5gSK9i5SUOup++j2FgmAxy73iZNyBRNJzWlpof/xPbZmQ1e74ImkWv4qQJRPyPCErKYQqU7vjiiXJBCMeTsh6gjGC3wRvruS6RS7KqGSp6nMBLi94o8melZ5vkgvJ1anMyNUpMRkRT5KVSIQEMxUpeJe5kuIHu3DGagePsXYhGYlUfec/dQVubZsaEdg04dsU0gmLlMmuKptg4i1m/lwXy38wFcSmzpgG8V6yF5qBYwqOTPBUMfn8Bo+cm4p1TRu648kJHE8yiLliAeRitKb7bQzFq7sRexno24mVyiDfI09wgu7SJ10gd7ZCbBNGM547gdgVGUFeFN1EZROQbDXi4WWjGdPDTCp2vDpKhcsM0QsTO6Yk1IuqC9xyFNGptBfzqeOVngMPVWxKEVMqZhwaNwNsfDQv7W1d+ZkKSBgwuiEhFiR/QQMWIFLs05CFZpyoDMzQL3RfN+CBoYUem3vzHgSV+f+Yh8Tak9GAp9uvBTJrgmxuouKw8aoxQo+IUeNdwug+WLkILfpyRbzbuZpaXFlM5THNdHJ33GqNdKiU4pBjB/wye9KGZiI8uXrEnHlhHLUxdVBpwHntOYuyGCmK4VmRow3fIT4YqTiT0YnkBb+bDYJD18IlDBYXaVFU6i77jJyRbs4MV6gLqg6mXAOEZAlV/I21musCzbT4TXdpA+s21V/8dgUiinKmLE7r2+6Frtcf3VwxGPvlQff3dxAv7TtIzUNT6M7ieZVBWwstKvUBfnhXQs7OolhB3MTsbyZDmtKLKD215RQhw/qFnDbRz8W+RL+sBjkz73+/CB8lJF9hun3BfyTcHwTwL5VyVoSTOxA++z3h1wI+sdGsY3KbbMhZb57dZ8/Cuwj+MQ3FoTIeehL4LtHb6z0rdD18e/j2LUJe6b8wrJeYXE7D7AlcW/wuVW268Tb+VVGsGEFtPe34a1FpHLY1rp6PSqYlrAXhQ3PXi7NZN2e/nQKS29Ts1BKaQcVr/hHDcxSZQPru4bmemf5B4dkfZMo5TEB+jxnnYkR6RPr9kR6U4arS5pSBhXy/s1HuWOXpuf44zggefUZAFvdgz+0voAnvwKv4g/20RKhTGD/hok/5Nt++6oPuEoO9ezBkb5d8BakZxWsUrxo8H98DPHsL5qp4fbClcrxeIn91bb3wE6omHkY1H2et3LX3eV55OvBC0Siqf7Kouugu4fxD7uLUgjnu4gzxYcV0ELl9nHUit8fGzQj1CPXgUN9CMZjnb97K4s1P4n4B'),
			this.addDataEntry(dt + 'inline edit', 230, 60, 'Inline edit',
				'7Zfdb5swEMD/Gh6LHAghecxH05dOqlRpe7bAYKsGI9tpyP76nbFJIJA2XVZp0xopyPfhs/H9uAMvXBf1g8QV/SZSwr3w3gvXUghtR0W9Jpx7AWKpF268IEDw94LtBeuksaIKS1LqayYEdsIr5jtiNU+SCcn0wRqUPnBnyBjna8GFBLEUJWhXSkvxQs6UVBdwG5sJDDNR6mf20wSYHGUXEYGMOctLGHOSaWdug3lBGC1m8dy4qReiE+piUpzQnSQPuALFFBSVYKUm8v4Vblm5wCbSFheMH0CxlAllmiRgDdAG73IK7u1uxE4mZjtU6wrsUbiECxyXuRgH5edC5Jzgiik/EUVjSFTjus3sEjDsLRIFq84y7oSJ1KS+mKVG5VL0QERBtIS4aM9STZ1HbDOJKGEQ2qXP6bCycn6ceso5DFzaxxEIBwg8iv0g+1LsypSkLglYJi6vC3OQHTIgb1nzG+ABlul6sdxu+4xYpx/uRgOjqXDCyvyxgWIToiEZqPkNAfq3Qek8LQG6EZyD4yOyM97jKIxu52g64GgAkaK4MsOizk3F87GUYq8CH/SyWhrB5D89TEx2/Hkj1EaY+sgKcN1E/sK6hY1bMGssRoj9MAahFJYCdKlEnQEbbFYoXpsoTEJimDBIKbEzR3ZiCv03TIVvMoX8EahGmJo4ICThWLNX0ltuDDS34pM5UnCp+6Hd6ndxP4DIMkX0gNPjtq9CN7oeXaUJ5H61N+f9DIXK6PbS8NAtaqdqeZHBYd07o3IKqZzBdlfwrKSMnApgC3EXs+9EprjEZz13en3pHEXfhkH+LPrtB+FvabAXmO5P+CDh8R8B/K6tnC3h4ScQPnuf8G5PpjiFdwCbxRQrekL5vIJrjpViuPQTSpKX0abfcjzS6b/69RmHi361C+dXgTi/vXvHnw5I/QXHbXAc3/ZbOOLr+vDHvxFAPH2C2mrT/UL9BQ=='),
			this.addDataEntry(dt + 'inline message', 460, 180, 'Inline message',
				'7ZhtT9swEIB/Tb5WTkJK+dgXijbBNDFNfESuc208nDjYDi379Ts7bmiagJgKTBNFamXfnd/uHt+ZBvE031woWmZXMgURxOdBPFVSmrqVb6YgRBARngbxLIgigp8gmj+jDZ2WlFRBYV4zIKoHPFBRQS0ZMwZao0zAA1hTWpaCM2q4LHRtrc2j8NZLLsRUCqmwW8gCpRNtlLyDPeFSFuYH/21HheG276exfSr4qsC2gKXx6u0MQRQnZ8PTEbFz34FhmR+TUZZVCi5oiYITFJSSFwbU+QMeXqOM+JnmNOfiEQVjxTJugBl7vhmtVhmab3cjK8XsdjJjStQn8Ri/0HH2yxrowUrKlQBacj1gMncKpp3pfFkvgc3WIkk02VnG+xqUgc2z8XIiH6wLkDkYhfOSx1ob1+Eka56azA9IvCwDjiv5uHoZ1XV/1cz0BAM2PA/9bMQdNr5+uR53EMhMLnxEdEZTufaeT6nOIPUd1JTWPt+sLOsDagTVmtNiwDJgdwu5uY1sIHZwwrgTkpzORi8x1TK2f12WrL+RXzH24pynqYA9Bskeo3Yzgi5AfJeaW/RRqGr3NhNe7umbiXVJGS9Wl279WdgCl3w2cLcDPJCe42EPx1EX463sEIxPOhhPZbHEToFeO8J8hPlgmEfJh8GcdGCe0Hwh5RHkI8iHgxyGH5eWh12SuVlUDENiZ2ZMVtbtxwfnv31whnFPcnuvF+dph4lvsEZBpUFptwdnvgDLhD0ALocfBfcVaNszmAjJL4zK4E3AiXry0cvgNOnuCE7PE6+B5K3BGXXA6cS/U+t+Y0Tq71sq8KTdQjefjyZ1MF9R6MLTaHIyPaRAvbZC7pb2Vk1L/vuStnP5IvI2Ja75l/klLt8Jy7MeLIfCBneBjZVtXFXC8FJAq+bVNjh7YxbYehmHpN28gaekSCsjc+qIsW4mvHhAH1tFYbtFK5G6PLlTb/EkJIUSihRpwjaCiQ7DeD9ty6VcY1CvB/272e7bBhGtWXM3hveVrA/h3o7paFdUn+9nmVK3W7+oX2rHFfWsW28Qaa0OWVEBTXFMLhU8u8peClHoh9Q9nt0LQjGPatxNHUv310kdqJnNz8PzpNHceApbD/WeB8rOpV/by/MDb75de63s5d5LBO7ueNG1Rzrqe0x/3iq1zQ5RTzY46UkHYfL3b17sPv2S63StH3r/AA=='),
		
			this.addEntry(dt + 'inline message subtitle', function()
	   		{
			   	var icon1 = new mxCell('i', new mxGeometry(0, 0, 20, 20), 'shape=ellipse;fillColor=#403294;strokeColor=none;fontSize=14;fontStyle=1;align=center;fontColor=#ffffff;sketch=0;');
			   	icon1.vertex = true;
			   	var item1 = new mxCell('<font color="#0057d8">Log in</font> to learn about Confluence', new mxGeometry(0, 30, 230, 33), 'rounded=1;arcSize=3;fillColor=#ffffff;strokeColor=#DFE1E5;strokeWidth=1;shadow=1;align=left;html=1;whiteSpace=wrap;spacingLeft=20;spacingRight=20;fontSize=12;');
			   	item1.vertex = true;
			   	var item2 = new mxCell('Want more information?', new mxGeometry(30, 0, 200, 20), 'fillColor=none;strokeColor=none;align=left;html=1;whiteSpace=wrap;fontSize=11;fontColor=#596780');
			   	item2.vertex = true;
		   		return sb.createVertexTemplateFromCells([icon1, item1, item2], 230, 63, 'Inline message with subtitle');
			}),
			this.createVertexTemplateEntry('dashed=0;html=1;rounded=1;strokeColor=#DFE1E6;fontSize=12;align=center;fontStyle=1;strokeWidth=2;fontColor=#42526E',
				 70, 20, 'DEFAULT', 'Lozenge (state, subtle)', null, null, this.getTagsForStencil(gn, 'lozenge', dt).join(' ')),
			this.createVertexTemplateEntry('dashed=0;html=1;rounded=1;fillColor=#DFE1E6;strokeColor=#DFE1E6;fontSize=12;align=center;fontStyle=1;strokeWidth=2;fontColor=#42526E',
				 70, 20, 'DEFAULT', 'Lozenge (state, bold)', null, null, this.getTagsForStencil(gn, 'lozenge', dt).join(' ')),
			this.createVertexTemplateEntry('dashed=0;html=1;rounded=1;strokeColor=#008364;fontSize=12;align=center;fontStyle=1;strokeWidth=2;fontColor=#008364',
				 70, 20, 'SUCCESS', 'Lozenge (success, subtle)', null, null, this.getTagsForStencil(gn, 'lozenge', dt).join(' ')),
			this.createVertexTemplateEntry('dashed=0;html=1;rounded=1;fillColor=#008364;strokeColor=#008364;fontSize=12;align=center;fontStyle=1;strokeWidth=2;fontColor=#ffffff',
				 70, 20, 'SUCCESS', 'Lozenge (success, bold)', null, null, this.getTagsForStencil(gn, 'lozenge', dt).join(' ')),
			this.createVertexTemplateEntry('dashed=0;html=1;rounded=1;strokeColor=#BA3200;fontSize=12;align=center;fontStyle=1;strokeWidth=2;fontColor=#BA3200',
				 70, 20, 'REMOVED', 'Lozenge (problem, subtle)', null, null, this.getTagsForStencil(gn, 'lozenge', dt).join(' ')),
			this.createVertexTemplateEntry('dashed=0;html=1;rounded=1;fillColor=#BA3200;strokeColor=#BA3200;fontSize=12;align=center;fontStyle=1;strokeWidth=2;fontColor=#ffffff',
				 70, 20, 'REMOVED', 'Lozenge (problem, bold)', null, null, this.getTagsForStencil(gn, 'lozenge', dt).join(' ')),
			this.createVertexTemplateEntry('dashed=0;html=1;rounded=1;strokeColor=#0057D8;fontSize=12;align=center;fontStyle=1;strokeWidth=2;fontColor=#0057D8',
				 100, 20, 'IN PROGRESS', 'Lozenge (current, subtle)', null, null, this.getTagsForStencil(gn, 'lozenge', dt).join(' ')),
			this.createVertexTemplateEntry('dashed=0;html=1;rounded=1;fillColor=#0057D8;strokeColor=#0057D8;fontSize=12;align=center;fontStyle=1;strokeWidth=2;fontColor=#ffffff',
				 100, 20, 'IN PROGRESS', 'Lozenge (current, bold)', null, null, this.getTagsForStencil(gn, 'lozenge', dt).join(' ')),
			this.createVertexTemplateEntry('dashed=0;html=1;rounded=1;strokeColor=#6554C0;fontSize=12;align=center;fontStyle=1;strokeWidth=2;fontColor=#6554C0',
				 50, 20, 'NEW', 'Lozenge (new, subtle)', null, null, this.getTagsForStencil(gn, 'lozenge', dt).join(' ')),
			this.createVertexTemplateEntry('dashed=0;html=1;rounded=1;fillColor=#6554C0;strokeColor=#6554C0;fontSize=12;align=center;fontStyle=1;strokeWidth=2;fontColor=#ffffff',
				 50, 20, 'NEW', 'Lozenge (new, bold)', null, null, this.getTagsForStencil(gn, 'lozenge', dt).join(' ')),
			this.createVertexTemplateEntry('dashed=0;html=1;rounded=1;strokeColor=#FFAB00;fontSize=12;align=center;fontStyle=1;strokeWidth=2;fontColor=#42526E',
				 60, 20, 'MOVED', 'Lozenge (moved, subtle)', null, null, this.getTagsForStencil(gn, 'lozenge', dt).join(' ')),
			this.createVertexTemplateEntry('dashed=0;html=1;rounded=1;fillColor=#FFAB00;strokeColor=#FFAB00;fontSize=12;align=center;fontStyle=1;strokeWidth=2;fontColor=#42526E',
				 60, 20, 'MOVED', 'Lozenge (moved, bold)', null, null, this.getTagsForStencil(gn, 'lozenge', dt).join(' ')),
			this.addEntry(dt + 'inline message subtitle', function()
	   		{
			   	var item1 = new mxCell('Yeah, progress!', new mxGeometry(0, 0, 120, 20), 'dashed=0;html=1;rounded=1;fillColor=#172B4D;strokeColor=#172B4D;fontSize=12;align=center;fontStyle=0;strokeWidth=2;fontColor=#ffffff');
			   	item1.vertex = true;
			   	var item2 = new mxCell('IN PROGRESS', new mxGeometry(10, 30, 100, 20), 'dashed=0;html=1;rounded=1;strokeColor=#0057D8;fontSize=12;align=center;fontStyle=1;strokeWidth=2;fontColor=#0057D8');
			   	item2.vertex = true;
		   		return sb.createVertexTemplateFromCells([item1, item2], 120, 50, 'Lozenge (tooltip)');
			}),
			this.addEntry(dt + 'inline message subtitle', function()
	   		{
			   	var item1 = new mxCell('SUCCESS', new mxGeometry(25, 0, 70, 20), 'dashed=0;html=1;rounded=1;strokeColor=#008364;fontSize=12;align=center;fontStyle=1;strokeWidth=2;fontColor=#008364');
			   	item1.vertex = true;
			   	var item2 = new mxCell("Don't stop believin'", new mxGeometry(0, 30, 120, 20), 'dashed=0;html=1;rounded=1;fillColor=#172B4D;strokeColor=#172B4D;fontSize=12;align=center;fontStyle=0;strokeWidth=2;fontColor=#ffffff');
			   	item2.vertex = true;
		   		return sb.createVertexTemplateFromCells([item1, item2], 120, 50, 'Lozenge (tooltip)');
			}),
			this.addDataEntry(dt + 'modal dialog', 330, 210, 'Modal dialog',
				'5VbbjtMwEP2aPG7lOpvu8rjbtCuQkBCLhHj0JpPG1MkE2+mFr2cmcXohXVgJARJUqi9zOTMeH48SxfNq92BVU77FHEwUL6J4bhF9v6p2czAmkkLnUZxGUgr6R3L5jHbaaUWjLNT+JQ6yd9go00IvieTMkOv9Ey1WvBgEBRKkFM7vTW86+9LioLhy+itJ78hget3sjsoB5RO2lpS5cuUTKpsPqJRaD3wejMSjBHK9uWB2QXouimQ8FRczENrR4EugsdDW+W6n6xXNe2z5sMC6bQn1QWSQ1bqe0Pihc33z+j2f+xELv6XCX4ph9Bp6BE4hUzTOVNVQVqpBR5M79WLo+9Z3YZwHxTBYcDolbg/pMZJrAFirah6LFvhuDWx4nrO/D16Mr6sGrVd1D1ygrZTXyCdTT9iFC6hbtGuarkaJNxY/Q+ZdDx6EKvN6o70Gd0gkaLRzLbjJc5clz9gkS18R/dMp6Sy2dQ552BXamDkatJ1dXHQ/rpm3uIYTTbpcTBdJYORjR8h0KrnIRq9q2hgoBsKeuInux4ClynEboiqbDRC025baw2OjMhZs6bmyOW35NuJUsvcGrNeZMnchmMfOaA0+KwNKqbKytfDA7uk1CRrUtQe72NBzJRqkImS3VJU2exLc2YwjdzUXqWpXJZkPJ6Qqd/mU3jekT/j5JfTUeWADN1khrgyoRrtJhlWnyFxnuiz6ELQ8C5LI+5MwoTvQyWD3bIfpRKG9PABW4O2eWaRzX/YWcdx3IVGCJujQeqZBqFwvWB18jw2LFqFnXe5f8ah/3eX5iFr8sjo6cX1fyjMhkpv0dsSzGmv4AcUyqE9uKKQgDigfQ1HkmIZHXg+UEf8sZeRPKZNcYEwcbtuCoc61gTP4SywKEd5xycgk5CNFwN4HgOQ7ImJROPAjGh4SfREzr0fMnKs648b8y+QMFPxDvExezW5uxf/Ryv4uL2e/gZe0PX5N9uanH5vfAA=='),
			this.addDataEntry(dt + 'detailed modal dialog', 330, 210, 'Modal dialog (detailed)',
				'1Zdfb5swEMA/DY+JwBRIH7v86TZt0rROmvY0uWCCF8Mx2yTpPv3OYNIQ6JouSbVFCth3vvPZP98Bjj/Nt7eSltlHSJhw/LnjTyWAblr5dsqEcIjLE8efOYS4+HfI4gmtV2vdkkpW6GMMSGOwpqJijcQhoUDTN/fYWJpGK0gBXRJX6QfRDA1/VtAqRor/QukNDvCuyu2jsvXyDSqJyoSq7B6oTFqvGFrjuDsZinsBJHw9MGxA2hU5xPfcwQhcrvCiM4bXlEul6x4vlnh/gMoslhndJmPFTiTAqHkxxuuX2vT9u89m3XeQ6g1u/NAcgq9Y48GEEFO8hjQvMSpagsKb2rcyrt9Uup5GaUaNG0hNOBlsduEZT6pkzGhpYa5pxQxbwdbmPjX22loZ/zwvQWpaNI5TkDnVHMzK6D3U01mvG5ArvI16gZcSfrBYq8a5FdJY8zXXnKldIFbDlaqYGj8Fi3ROE8l0jsd/5qFOQlUkLLG9lAsxBQGyHuen9c/smZawYnua2WLuzQN7Iu/qAznziNlkwZcFdgRL2wO7Z+bWP+Mwowls7KxUxq0L7G0yrtldSWMj2GC6muHYNTT8GTHWayY1j6m4sZNpKG1yoYJtn0zQWmSz85ZBzrR8MBB4orNmhO83SexmjC8za0Y8K6SqESx3to/5jg2b8sPp7/fS/yZJemTMwaxpmGUei8l1g2g26WEqoGB/IBTjtjDZDrAhuDsvX+2mkD5FeyyO2XEyvONdg4dOb49GMADDtxspmcCcWrOO7RAgO/sn4HU62qlHXkvazj4KDyBDmiqme4h3qziK+lWP+pQWsakZJ4O3eF+JeXAdRhP3P2cevQbyoIf8Ay9W/xrwXmGuS8jZ8D4D1L4qnZ7EB0TbfDsr0HDgxe0cZXsRLSaL66Gn69ydk3nUeTJGF2HjuZessKQLxwsvACd6Hg6+a5SmmW+X5uV/zEFFYx5DocYCYIXvFd+Xgip1TLohHHLlR8F1l/Nh+TyGVfiCMumOgz470kfXyk5F1+bRrlBegNykR+5tEwRumn7Fcun9Rbk8/Wn4ouffmcrlQT6OgjM8/rD7+AndDN//wv4N'),
			this.addDataEntry(dt + 'small modal dialog', 410, 410, 'Modal dialog (small)',
				'7Zpfb6M4EMA/DbqnjQyEkD62IfRlV7u6nrSPJxccbNVgzjZNcp/+xsZJIdDdnBRWuWsikeLxePzv52E6xAtX5e5R4pp+ETnhXrj2wpUUQrd35W5FOPcCxHIvTLwgQHB5QfpOrW9rUY0lqfQ5DYK2wSvmDWkl93kOAgzXs8RVRo05IkumFBNVq630njttqksYc+J74YMUTZWT3JU2jPOV4EJavXBjPyBXWooX0qlJ0rW/jkwLUekn9rcxDIMOHzBnRQUFTjbaVXeaIfsxBinOxdb1imXmTJjSljJNnmqcGcEW1tioQ5FVxaGTVyI1yzC/d51pUR+G4iZpDKkXomEl2gLFGW0keTTmkjkIasEqTeT6FdZcgQw5CykuGd+D4F5mZiQZ1AYowU1BQf3QjWikHR/Vuob6KLyHL9gv82UU1KwQouAE10zNMlHaikxZ1XTTdgG3vU6i4KHTjdtimCnZvYuJFTlGHokoiZZgF21ZrmmrMfdblBAlDEyfCLFqBcWx7Rt1cOPAG4cwHED4cECvwiUZQJdjRS1oZqXPIrASFRnA54Qd7nx/nLseC9bGd7cuwZDM6G4RL9HHoCb4KTU+GqHGOSUkCceavZKe/TGSXBffzJqByq5vZt8WFycois1GET0A8TjOs9icD9gkxQwEX4HQ4hJoAjFpnC7TuzHnuEbrYB33HFs8RNT5tM+2lPjof8vk6SPiQoyG8QijYTgFo8spGI0GjD4RDusHMk1J90m+F42ZOrYj1MJOD6BjVhdnGTG7YSuuxeWim8u9Ypfr++EEPC8GPH+XsGIdRK+FzltAcNV0RlN423hA5x/72sD5mzeHC3qr8tbzVu0fJi8XyN6ihY8ULfjxFAAv3w8XGkWk2awtNbFBhg3BW+d7bbigKVPdgGLLNBWNjR7qWgqweUXe+RY7XLN3DtAUscPdAO6v4IKlHf1fDQS7V8TnLXq4aj7nUzjfQ76sA+jvxLhYk5SEaTGlhcuevZNnPSY8zRb32IWa2uiXu8IklGdYc6wUw9UsoyR7eRa7P4NhPIFQFCfLH+E8lnY9wfo0j1qyPOdkxB93j4cZDMfPhH8TChZAmIay3dajwc8n9UfDI2HM8YSgj3xCguEBOcgufEAmiU58f3BAjtngHOIUPfYa4scBM0qDNBoLmJNlslqH/zHKz3MFt4fFrzwKIVpMcRSGb+e+EHmprPPP/X6X4MNJyEjVQeHfBNpvrwA/rJvuN9j3Sh1uF9P9g/nJn/fJ/TTJW5NDWrBD7gp8OOG/MPi+DLW38PtcaqMJqY0ngBaKb7+zaNW7P8P4Bw=='),
			this.addDataEntry(dt + 'medium modal dialog', 616, 420, 'Modal dialog (medium)',
				'7VpRb6s2FP41ebyVgZCkj20SuknddKVO2uPkggNeDWbGpOl+/Y6NoQSTtPcKqkQjUhI4ts8xx993fGwz89bp4UHgPPmNR4TNvO3MWwvOZXWVHtaEsZmLaDTzNjPXRfCducGJUkeXohwLksnPNHCrBnvMSlJJKkEh35gRJDKFbm2cmXcveJlFJDJ3O8rYmjMudD1vpz8gL6TgL6RVsgm2ztZXLXgmn+i/SjH0y7vHjMYZ3DCyk6a41Qzpj1KY4Ii/GqtYhEaFuntNqCRPOQ6V4BXcqKrDLc3i2sieCElDzO6MMcnzuivmIZWi4oXIMDE3CQ6TUpAHpW4zB0HOaSaJ2O7BrQXIkNEQ4JSyNxDciVD1JIRSF21wGSdQvTbDS6H7l0iZQ7nv3cEPDIn6URWKm5jzmBGc0+Im5KkuCAtdNdhVJuDyyIjv3rfMmFGEJyWHk0jQIgODB8JTIgXoRa80kklVY+EsqmYJoaC6Es4NhBAuKkHctH0HFlwYbPXjzOvB2YLVg34EuMU/Ja8LvhV6qMFfyFnmh/dCuIrV/xOREsa6qLXNKo/WxbU4ovuWCLDloFYpNDqu0G3zQDIiMDtZv6uwR9uHNjr+CBsevD8yMMJfRivbC3d5TrDAGaDsvB9+puc/06Ef7caQtn/nku6A8JLy7CNcdDtyOvS1g13GM2LFOSNshTjH7Q9xR2FH6/jTUNDtBMEmAvbHsP9BzHI/jFmOg+yY5S2MUBAGQNiTIwN9gczY+K6cBlVMj+rQ93Z8Wyvgu11BpBUHm45+KjTOP56CYQLM1SWjGmMRFeBQgDeICl4qT9iT7hbBpLuwIHb9c103iRgKR30w8oaBkeMd42gxBo58C0fNtPXlYa03iF037AaCGUxbNs7cgWC2/AKYLSyYPSWQnLvob+gMrA3cQGMCHoYrN6OUFAWOSWGh8OxiIkCBG/i9i4nVZr31zqwWOtDsTp0pjSJGOphFPRBn+Jmw77ygJtKKarwahY+d8kaxWX88avsbnV61GNcsZpQ8wkWiXTDxow7Drk2PWjYwPW7HoMfSoseGFjnD6jElTYmqmsGPO/+WwKDA1Y6LFMtzQfoMZExikB5itYVwgyXDRUFxdhMmJHx55oe/XJtcKnPerM6F+mvhVUMZNFHmKyjjjJIBryzO/EKjiik64wWHCLKn5FUN07N6+ojscMkm0kykuQbS+GOQ5vYUaWK6m3gy8eQKebIagyf1ur5FlD9KoVcqCFyj+kNSDuDQu4Uw5Uiu/tJpzTKtWS6PIw2ch+WIY3HkV4WLCf4T/C8L/vNR4G+fgju+Bf6jgf/soXiwDFbBbR8ptmjrbpez9oH20qbCMTB9m0P+7WK5un4ojrSp7/s2ND1vEGhaZ0PeKNC0D85TmpWyJzf5ka38MYNwO3BeNSaHCo8j7vi7qy4IF2OA0D6ifOSxshJFeipVZ0woTNQuJoqwxBeLzbEShAnnX5sGLEeJtfYJ6jbDzyoPRkVe1dU7H1NePOXFl0WI5lR5WELYZ71rLtS7JzUj1GuWYLSUPMUaSextIsdEjgsjxxCZOdy+v5VdVW+/tP0f'),
			this.addDataEntry(dt + 'error modal dialog', 470, 190, 'Modal dialog (error)',
				'5ZfNb9owFMD/lh2inoryQWh7pASqHTZN6qRpR5M4sVfHL3IcKPvr9+wYSJpQoaL2sCJh/J79Puz8/By8aFE+PyhSsW+QUeFFSy9aKADd9srnBRXCC32eeVHihaGPXy9cnRgN7KhfEUWlPscgbA02RDS01fyGBhXowLRraDT+asAGs6PaaDUz7R9YY3v1nW41bOXVBIWvOTY7a18pSCnNsLflmlkjXhuPqeYgsXNPyjWAHbcJVVSVRGLWYteNRexgCjLnRaOIM66p1lwW6HCBkoDCupYmnKJ1I7SRc1DHuJjtpF1qrXfCLZXpEjc8CbzoXkEjM5o5KcecFiDQgZkX5faD+loreKKdkWS1DJaxsQCpH/lf4zgIUSaCFxIFQXPthjtmvv0Yh4xksHVRiUr3LlDaMq7pY0VSo9giIGY6irhuVITGekOV5ikRcxdMQ2fSTyMkkY3yRHXKnF9GUtYo+mAcJlNUVMClpmq5wc2vUee7fFek5PgwomSuUpNLanc1IU3BcPp+zdAomyHTusLxOJpjg7iZxkyoJwVAISipeD1JobQDaW2nrvI2BHZ7QeLwvhPGEYprpc8nKbcqh/gDhZJqtbNwZZq1M6Y37UnwGeXo2pndOSWpW0VxsD0eGuy4czN+hqLBGUocvi94y0jNLGNmi8+FL1lGsT8fwCdB0le4S6nsPCSXgn/w8svtSzhk8wj7nhr/v6UmHKemb7DrSR2iZiNARQ4GRQUWqw3t2Y5B5qL/MNt5DH0dTP1e9OvZC1Ahz7EKDjA9rOIscqcDchdEpngLXU6u4/ODoI3vZje3n6TUXQZt/I7Q3nwEs/GA2S8DXPFarUxXMSjXTT0AdZzKE3X3VH18SfHhLvfHkD5e7tGnrq0dFMMRFPe6C1EM+ySG7wHi7OS1j9lXUHMN7j3inEr6ltp5O/6iua+cwWsvnp+2TnYBvHu/Yhj3CQyiywlE8fjHsJ3e/d/4Dw=='),
			this.addDataEntry(dt + 'warning modal dialog', 470, 220, 'Modal dialog (warning)',
				'7Zhbb9owFIB/DY9FuRCgj0CgL61UqdP2OLnJIfHqxJFtbvv1O44N5EbFWqi2dUhYvpyL43w+Pk7Pn2XbO0GK9IHHwHr+vOfPBOfK1LLtDBjreQ6Ne37Y8zwH/z1vcWLULUedggjI1TkKnlFYE7YC0/PA1zRPsI/g/wd/xvIZ1AYgx5pUJAGJlYzs9IAA8qJFhaJLEimsxlBAHkMeUZB9bD8Bg3KA7NV1PY/LUtsQIFdMGZcRz5eMRkp72NByos9aPqayYGQHWisFAX0za6l2zM46VRmuXej2/KngK5xAbFtLNDPjjItSzl+WP+yXSvAXqIyEi7k7D7QGz9UT/akNux62CaNJjg0GS2WHK2pO+dMGUxLzjfVKRLQ3ga1NShU8FSTSHRt811ocm/qh/dDT2mvAJYwIm1hnileEvuhG6JdeXkBFqbWbkihdCbjTBsMBdhSc5grEfI1vX2KfY+e7IBllO+yYiEjPxaxwSFZJiuL7Z+YrUc4wVarA8cCfYIHk6EILyH7CecKAFFT2I56VA5EsRRdL4wKrNSeBN624sbDhs8L2JLBll6X1DngGSuxKHmKVGonByECNLFA0bUm2pDtEmo7koHvkHyt2C3RvB79rO0CLtpjItCRML/C56C0Wk6khpYZeznN4hboI8sorslM4WvlmV8Vrk3lEfc+M888y43UzU1fY1VoVnoYdOPkWBQGMKLqGmm4XYtb7o17Oo+sbd+DUvN8MG5jy5VKCakF6eIqzuB20uJ2RPMLj5P3kWj4/CNrgdjgaf5JA9z5ogytCO/oIZoMTsdYkHQ1u8XQtdDXbJjpX6pOfyIMpvxOG6/yWeFsRdkfedDBrID1uEKxRZOQZ2COXVFGuURdm9Q8H+H1jPKNxrJWbaUTzwD/IVTalPf7vS40w+NShvEK+13X6Oxch36uD30wpLsL9sMX9IUe2+fGZMfstUdrtTmirhP+PyK+xd3u9sNuAbxxcAb5RC75HwRO8g8nDtQwbgPeXtMVhPUc4XnFu27F3PpuHC/cUkNUQ10oI6kHPddpEHq5cDZD/bkAru7S8EV4sWH4YsK7rXYHYcYvYk8mBVFCcuG53pronk4OONLXOtzNx5wMf+zEbiSkc8ayE3ANYX0HEJCeNSDw4H+yYCiTG5BOSr/SkptKYcfrD4M3o/ylhd/QbibDTD1qpsNuB+OgymfD+ZrXPhP33E47N4/c9I179/PcL'),
			this.addDataEntry(dt + 'multi select', 270, 390, 'Multi-select',
				'vVjbbuIwEP2aPBY5CQnlEUKokBZaqd1dad9cYhKrJmYdc2m/fsfYQMilhNsiIeLJjMc+Z2Y8xnKD+eZJ4EUy5hFhlhtabiA4l/ppvgkIY5aDaGS5A8txEHwtZ1jz1t6+RQssSCqbGDjaYIXZkmjJK2FkKmkag1jSOYGfL56STCtm8pMZxUTOYbkD23L7M8pYwBkXME5BGUSZFPyDFIQznspX+qUmsJUdZjROYcDITJrXOwvLcb2u33lEIF8nVJLXBZ4qwzVgBTKzbiIk2dTufSsyG38ifE6k+ASVNY1kYjQ8jQ9KCI0TY2YwQzjT43hvekASHgyY1cC6JWBLAAq+TCMSGQyxmBpougVEAYrZ9lOCFd60g25vCGvq5+jQSr/NLh0lAfCA0h9bnAcuKoONtp8iJ1eA/Gmw9LRFDnOnU4G5616Pefs05lmCF+oxk2RRE1k5IA8MobqQLmNdoA717LDtgjwWOKLkAHouJ4Z4TpkC7BcREU5xIVXaTely+xEVKnu5EmV8qRbVz/Q0qOV7TRPHreb02MAwjFpliu0KhjtaJAjDkq7I0VRVrBv3L5zCqva+H3YsG+8Phbjhs1lGZClq9ptoFEheKZB6DGcf+JoUDoNwMLTrwuiM7D0jGo7r7RXEf0N1VTLvCuiVXHvHTNvoDlT7p2tGnpsER3xt6kGEs+RQHExhmW9idZi3sISIyShOW5uqsu09+n5nWMF2E5K8K7Ozc7fktP9DcnYqGPOZCvd3eIjltsZpgYp/UJ3ucff/LrlW2HUXOZG2fekFo+EIVoHeRuMQfv48T8LdhLA2PeexHxCXfEd0lROBQxtVvw0gaWdcpBTnpmtsPSErHF1k+SxIDOfEBZa1NkXF35AhULhkMze38HjTUBg//5y89UaTq2OhybKLuz9p0xMUGvN66m/hY1uxoOTd1ckowsl9PYyBJ3wxVGe7m5B3oduFO+7pROJXSusPtuNGpvHtYzAM7dArdBpOdSNS1a/sz9Pj9kmNqlpz0wiZtkidknSKWc/4knyxW4nZI7KKzZOTE70p/YHduCn+/qLjo4YXne4NbpeP59wuUZnRAwEnmlGuoJJqi9voFERdJnbdSrOWslMNW9ML4aUtiaGlXbC4pAWB4eEfGa2e/8PmHw=='),
			this.addDataEntry(dt + 'multi select avatar', 340, 320, 'Multi-select with avatars',
				'7VpZc9owGPw1fgwjXxyPYI62Q9pMSabPii2wWmFRSwTor6+EZQOWcZwap1MKMxw6Le3utzoGw/aW20kMV+E9DRAx7JFhezGlPPm13HqIEMMCODDsoWFZQLwNa3ym1NyXghWMUcSrNLCSBi+QrFGS02cMLyKEkgLGd0QVhHwphjc0DXswx4R4lNBYpCMaiQoDxmP6A+Uy5zTiM/xLdmDKdpCIrkWCoDlXxWkLw7LdXrvTBSJ/E2KOZivoy4YbgY3IU+NEMUfbs3PdZ6mJThBdIh7vRJUNDnioargJHiBEeBGqZgojAFmSXmRND8iJHwq8YiBtDUgNwJiuowAFCkMY+wqaXg5RAcV8/9JgFSWO1+uPxZgGR3Qklb6pWVoyR4CHo8V0j/PQBjrYYP/Kc1ID5J3C0k1aHGFuOwWY23Z9zB0N83sY72AU6eI9h70LdPBH3mg4Ns9p+g24C1FUxD0fKlV4sEt5AC2diJ57XvsxIpDjF3TyuCJy1BMfKBYDsYAan+pZPfzOzEUUnc8Z4hq32bAr0e2+HmLH5IQwoBuRkGAHkIV79kFSspL1l9uF9N0W5AQK04NRa1sUcW633e6MC+iuQpJTTNJpgxLKOjpjnYsQdmc6p5TZDTDWfp2xPBmYsk4L+zRirTVDcZXFRnBkuXbX7Z5GZy7wMkstCTw9hE0pGAKfEXmgDHNMZcs4IWMgucc+JNNc+RIHgZxfVqGvHpkV1NFOiVqsksXtT/XSaEh3NIFMMYMi5wOW9W4m/q4mboL3sPHuP2jjnf/axns3G69h42e0c002nnZa/fRT+bwzHI/MkXtsBKfeX81my88sbaBRUHhmySrWObRkC8MBq9nTZDKaPX788nmmwVb1qH0UMTFiApvU4ArO3bkFDmgrl0qrURREoTqqV4IeFGN/rPdOyQGxpuCb0bt+bVKi94LdSbaBeI1LKqniu9TC8tReiIDSE3pNAhyzCQL065ZPa8ZxJPI8yMT5X0yoTdKFQST9DPz2z7W8XRscyfiQ1V7I7+/Ml5044LCn8Oky7VEMLuk0qfyOa+Fblz337616VcLeKbBY5yLbonS1TDXoNqFB/fqpP52KjKfZ6OvNyC/tI91GONTvlGZQBDoQn2tEWE0fYUx1c3OSK3ES0+w2IUP9omyKYCQvQmYcvaCorhAJU93chHgtQnQb2VfpF3JyOyVn6YVw+Yziukr0/bSfmxSvRYpdpwkp6veEDxAv5Nb+cR1Hgul6QlzxpJebDK9Ehpl51ZGhSB7+fJFUP/5vxm8='),
			this.addDataEntry(dt + 'error message', 340, 150, 'Error message',
				'5ZfNbqMwEICfhmMjY4c2OaZJqFbalVZtpT1bYLBVg5HtNMk+/Y7BSSAmbdT2Ui1SInt+wfMxNhFZVrsHTRv+S+VMRmQdkaVWynajardkUkYYiTwiqwhjBL8Ipxe0catFDdWsttc44M7hlcoN6yQ/jIFhKzV2L72U2wrubRVH5L4QUi6VVBrmtarB4N5YrV7YmbBQtX0Sf12A2PlRKcoaJpIV1qsPHhEmyfz2boZAvuXCsqeGZs5xCwvj4r8wm3Gfn9OMbzR7cJrVFASNErVlev0Kz2xAhnz0lFZC7kGw0JkLmoEWoxXdlBzMD3eoNrpNxa1tQJ+QBfzBerk/Z2AmpVKlZLQRZpKpqlVkpjVNiy4FDAdJEnzfS+OXmGnLdhfL1Ip8jR6YqpjVEBdtRW65t0i6UiLOBIT29fMyarp5eXQ9FR0Gvu7jDJCQgcebGQkY0GpT5yz3ZaA689Wdn0EB1SzaKyADNNPlfJGmrownojqjP/5RsZNA/UVd/mxRWSUhLqi9Qqq+Nym9VwajT5Kz94AknUcPJDIdAYmQz4M0DUB6q48YTnO19VXIqeEtWqjTNM6+2pWuMU6oldQYQetJJpVhIW7zuwVapJca0ZEJ9N8wQcaZGDp4QtAkRCSehoQcZJpJasUrG8Qaw8bn/+0W+JT8Bs8G6W/uhhFUURhmA+yOT3EViUlA4jNnjkSmYeVgkIMlRrWy7QOZRtX5O/3u6g63StfxOukDPmyX8dneiN/YDA/dLWN1R0Pv/XEIiIzKhbexqjl1zmc3aRvn9+6IX9ABb9F1HXD+BVvpbcDd4zFEH62gruMnqCFyaZzi1BXtrY34e5f7Q80ueffoNHZyOmx4n2xnx1OZp216RtFH2hlMT18AnXn/A+Ef'),
			this.addDataEntry(dt + 'progress tracker', 470, 30, 'Progress tracker',
				'7ZfBbqMwEIafhmtlICTtkZAmp56iarVHCyaxVYMt2zTJPv2OjdOSQtRKbbZbKZGCPDP2DMz/CZsoLer9SlPFHmQFIkrvo7TQUtpuVO8LECJKCK+idBElCcF/lCzPRGMfJYpqaOxHFiTdgmcqWug8ncPYgwiODReikEJqb6aETLMlppsbq+UTHCONbMA5Ga3kDm2ChpZtU4GrFKNFdbnmf1zSzAXNE9iShRijJWs1rKhCxwQdSvLGgr5/xucwId1GNnZJay4O6Mh1ybiFEqMJWdB2y3B6mLSWrS5dIWatwniW5njBHriLm2ButlJuBVDFzU0pax8ojZ+63HQlcHhSJEvmb8t0T5O4ewttBG1hf1YK7wo6rEDWYDXWIWFBUIrseGVZ58Jmdz4GHCuHLMFHTWdvXzK96oyDIPW47OlA9l8gsBEwUJ/ZWgSR+iAc5R5joNeb2Asv+LZBQ8DGhnCPp+xuOrt1Ldy5Vq8V9crttEPhh0PyGSgOp2L3oJiOMJF8AROTAROFBmrBpXVMeGX+OR7E/654jL8z4qPw53G5uxAu2QCXRyUkrdz9M2nld6ASdqYrKmPby+27qMwuhMp0gMpvbBl6KrCUC3PddP4vVCbk21CZvX8exSOmckNcyJWBN4yguHmWL+b5h06oL1KTnyj1BQ6hk+N7vad1/DWHUDRfv2t87OSz5y8='),
			this.addDataEntry(dt + 'radio button group', 150, 173, 'Radio button group',
				'7Zffb9sgEMf/Gr9W2I6T7DG147x0UrU99JkBMagYLCBtsr9+ZxuniXGrbtkPTamlWNwdHObuo69ClOb1fmNwwz9rymSUrqM0N1q7flTvcyZllCBBo7SIkgTBL0rKV6JxF0UNNky59yxI+gVPWO5Y77lnphbWCq1sH7PuIH1sK6TMtdQGTKUVeG+tM/qRjZxbrdxX8b1dFceD7dO0NpaiUjCWbOt8eMgQJWn2ab5Yojb3I3OE+zUcE74zbIMbcMzA0WihHDPrJziqBR/ymUpcC3kAx8oQLhwjEE1QgXcVh+nD1+idIe3ncOcaiGfpCl5QpvbVTrA3ldaVZLgR9obougsQ200tt/0WMDzbJEtuT7bxlWXGsf2r3elcvjUbpmvmDORFz4I67mdkfQcRZwJS+7Z5H7a9XR2XvvQaBr7d061Pg9Z/YZiCRyt5CFpvOW7aIeQQjW2bbPROUUZ9e07RgB6WqEzKLOADIsWyyNdp2HXUPSEcbQEFwXLl3bWgVLIRVGgEHdT0VuJvTN5rKxywDE7Tl++Y8G4UPya2DSZCVXfd/kXc5uaulv6gUAiqn/2eFFveleC6cR0WeCoPHjBvnsKchCwPvktYngUsPxg45jsoHnG77Z4pbhHKFsXyGHnwh5r9ZyQfIUXXCml8Bmk2DyGdENz4NwhuNiG4AJMgDiTkQ28/9PZCvV3+Pb2dByivaMjwm8SO9HTiH+SULA+wEqb6Mv4SrrOfRuzq1PIwqGUWQDWf0Mc0vRyqRQBVjhWBO9El15Cpe8W/guhadWpxrlN/kCkwX+7OXezsav0D'),
			this.addDataEntry(dt + 'single select', 340, 320, 'Single select',
				'5Vhtk5owEP41zLQfjgkg3vmRE3G88a6dcm0/pxAhvUgoBPX667uBoCDqWfVm6pQZHbLZl+zuk8CDZg3nq3GG0/iRh4Rp1kizhhnnorqbr4aEMc1ENNQsVzNNBD/N9PbMGuUsSnFGEnGMgVkZLDArSCXx04yCbSnOxStT4ljMYXGuoVn3M8rYkDOewTjhCSjc5yLjL2RLOOOJ8Olv6cCQdpjRKIEBIzOhpmsLzbTsQf/2DoF8GVNB/BQH0nAJlZH+X4gIYhU/xkFcZGQsZ9weCFIOKybZaAFJ5yBDyruH55S9gsDJAuk0gFkTubiIYlCvV8iLrAwVC5HCvG058AcFk39SIdcjziNGcEpzPeDzciLIS1VvVoWA21YQ27xvhFE1Jpkgq719KkWqSWPC50Rk4BctaShipWFXvUQxoeBaNVDJcF6No7Xpputwoxq/GwRWBwSw1g4CMl4kIQlVE3AWqN4OtiABvZyVVwcXMNMbDhzPk03c4KlS+q4SNaUEuk+TaFoCxbW7YEHl1cXUdeOksWFMdCZuXhU87MqiASOrtwNGlnU+jHodGB06RfIYh3ypuhDiPC6hhaqZVOrPV5E8F3UsGM5zihM9YDwnXbgNbh3kePuOoTUm0H+DCWs3JtoGCiFI70LE6HURUssywrCgC9LytQs2Kv5nXj5O6uA35l0r/M1t2wOfzXIiOrBbZ3EUEu0dSOwzeUD8gJtIlHWsBLK+oBqs0dT/VfBKoX4kNUSVrf91PB75z5NPT37tRqv6ve0dxJ2IIV00RBDGQHtn22v+Jk/lrmNBIw4pPFCAFzonrw9eIWBzyC1bvgR8fDu790pmyiMuN5xxbkpOUIL15JQOt2w74WPML4dDZzoFE//zl8nT8ylI/Mtkj7PxipzypNG2IzvuS4uL9loeCHIh1You3PkT2324BsOJLES9+N471eOJJj+xeohQXdevoDAPk0dZGeedKuJiRl6uASD1sWj+64U4oLgt3f+K2GYcR3MM1xsZo5o01ARU0orDBHTNKdZvpm2eI0c7uWlFVhR1KTdVgJmjYgme1itROSJtm+CYDdGz1HcNufzrJjMXIC99dBx5WSuew176b7OXDR5RF48b+OwiIQ1Uc9loIVMsj4qM5ICvmv0aV9/3kwiL/ebHj4Os9VROUuNscD4HgeHmq12l3vyo9wc='),
			this.addDataEntry(dt + 'avatar single select', 340, 470, 'Avatar single select',
				'7Zpdc6IwFIZ/DZd1AgHFS7/q7I7tOmt39nInhQjZBuKS0Nb99ZtIsGqopYvcODjTlnydJO95chJSLThJXucZ2sR3LMTUgjMLTjLGRPGUvE4wpZYDSGjBqeU4QP5Yzu07pfauFGxQhlNRp4FTNHhGNMdFzohzEqUYFwVcbKkuiEUihze1LTheE0onjLJMplOWygpjLjL2hE8y1ywVK/JXGbBVO0SlaZmgeC10cdnCcqA37A98IPNfYiLwaoMC1fBFaiPz9DhxJvDru3PdZemJzjFLsMi2ssoLCUWsa3iFHiDGJIp1M60RQLxIR/umb8rJBy1etZDQENIQMGN5GuJQa4iyQEszPFFUSrHefQxZZYk7GY5u5ZjGB+4oKv3Us3RUjhSPpNFip/MUAlNssPuc+qSByFutpVe0ONAcuhWaQ9hcc/djzXmMNuoxeY3UGusRxgc9ErCU9yhjT1KjXxFFnNeBWqrmuHDgDc+rX0dDWK3hcQOtKOiZktqeqWiZl2GKBHnGR7aqZNb9LxmRw9p3fgPBUfc3g7L/0gZbrzkWhqP286jlO++z66X2CpnezuyZp0piFLIXY7nZF6C8D+pR7toXCC19Q6rVj/l8tnr48u1+ZahWNzYfEJxhLqUpCa4I1MfhxAEVoX2X1qOw343tdZT3PgzizuBMQPlf/LVnTx12EdgHn4EdmLDvg/VHnmTKUUJNxQYVjr2M/GfjeUP5XbsF+X1D/juUEZRK9RxwH+VbnFrqDNCn5alEJoO9/P0/uTqOjQ8wfsvqR+pvkhZWXICE2k6k8V7AktKkHGBhtaj9mV0q5ziruzl50Pf8YyCqD13lwjWPCipuUvSI6ZJxIghTDbPCy2MFDgkQXZyUJyQM1Uz2FUa6x33Bpda9W3F2cy+y6znHm57bxpY3NDAcLRYy48dq9r2L4xcOJH4bHiw3h8OtGMlVDuTvHFPeMIpwrs10YeQ6woht+21QaBsULjBKkeJQ4GecNuWQcm2m4/BKOPTaOFbZ5uXRBHGsZjmJUfKIs6YgBkFppyPxSkj03TZING/flohE6nj/kGepdHQzDjeisNJReB0UOvagDQrN+8juPbMD8SyIXhvXTbZ5udptzB2J50n0YRskVtxd40fEhcRFZi9jQslGYUlZHjZ9e94EOysdkddBJCzhuSyR5l189/LccXiOQ3fYBofmPyW+5jIuqrCoNuuGFP4OlI0OwStB0HeaIyiTb98rKqoffu3oHw=='),
			this.addDataEntry(dt + 'grouped single select', 360, 260, 'Single select (grouped)',
				'7Vltb5swEP41SN2HRAby+jGvbaXuRUm3aR9dMMGrwRm4TbJfPxsbApimSIFuWhMpin32Gft57s7HxbBnwf46glv/I3URMeyFYc8iSplsBfsZIsSwAHYNe25YFuBfw1q+MGomo2ALIxSyOgqWVHiG5AlJyW0c82YijdmBKKnPAr63uWnYUw8TMqOERrwf0pBPmMYsoo+oJPRoyNb4t1jAFHqQ4E3IOwR5TA2nGoZl98eD4Qhw+c7HDK230BGKOw6M2iGKGNq/eMpEpI54jWiAWHTgU3bYZb6a0ZdIAB/hja/UFDoAxrK/yVSPmPGGgq0aQluHcNUZ2RqEEX0KXeQqFGHkKHDGJUw5GF7y0YDlI73ZeLLkG5vmCJGTvqujWkLC4cPh5i5Bet7X0QbJp0zKGUAfFJ59qZHD3R5U4G7b5+Pe03A/ZbWxD1264x1xahfGfsIEkCNbMT/Yb4QbdiEjMI4xDLsOoTHS2RkPJ2CyrDb7OhDa1RAWFRSgoKsjavZ0QFNZhAhk+BkV1qpCWT3/C8V8W9nDO9ao8PjOsLgC9bwYMY2l7BS1iOu/TlzRV2p7x3y5MBf9PNtFVzNLYck6EYdSz3A4bygqepwgGDuQTNQcRrdHr7sXncTpGnCo1HlecygLNBDJBhoxN7fr+8+rH1y4XkxWs5t/6l5QS6nNmLXQ7r9+T/RO3BNnule6zCG9klrwrqFG4tXapztumFzKdwyopxoBZI4v5Vhc+vGHpum1mqMXNERv5igt0GsO3oDfUUX0HBAB7QNvbERD5R9SytfLBrjeLY9m/J5jmIZi0fAncsQJYkRkA8v0D3gRDfiPQyPRe6AwcrvdrmYg6eXJ94i3VZclAJORDMkNGkvRMOwpgQ+IfKExTo5lzyNJbRan70rjAXZdoawF8mwgnzmUkqmm7PCtokyvDSsct558EepIK617/6cmxQ3xm3pubgu1aBudzMyyXOxEbjaqSM2aYbXTK2ZmbbCabjVH6+zrarX4dH/JAFrxzTFog0VTY/GSAvylFKAdgvWqzSUHuOQAp940yoWuZuxQL339D1mAdK/3nAbUKK2llBGcuwfyNUitQKnXaZrxosp6yLloZ29wrfhNVQWsFL9TgQhzSQxOwRv8eqJyQlrFzYmqY79co7hu6Uq4WiRVrmPsf0SH95ALvGW1Z9iALfHu8c8hOT3/39Ef'),
			this.addDataEntry(dt + 'single select', 360, 380, 'Single select',
				'7Zptj6I6FMc/DcneF5oCMjO+dETMJrt7N3Hv7usOFGisLWnr037620JRsTAzuSM3OxlMVDinD5Tz65+jrePPN4clh0X+lSWIOP7C8eecMVkdbQ5zRIjjAZw4fuh4HlBvx4s6vG7pBQXkiMrXVPCqCjtItqiyLAocKwvBdF35hDwS48vlRl1h6Dr+Y4oJmTPCuDqnjKoCj0JytkZXxpRRucK/dQOurgcJzqg6ISiVxl3XcDw/mN7dPwBl3+dYolUBY11xr26Pbn+NZJyb/nMY51uOltoTTpShYJhKxBc7NXKhbMC0HsENJkdlmPFYNxorrwdCuM1yVby+QrblZVe5lIXyB/5Mfai7pj90ATHOGMsIggUW45htSkcsyqJRWnWhDhudBN7jRTfmRiMu0aEzWKXJRGqJ2AZJrtoFe5zI3JQIqoCCHGHVtImisUFRnWenqufQqwMT/XYSfIuEn+pacQYdfS/AVyxiiwfOtjRBiQkJ5LGJ9PQKEBXZtHxZlCjPZD6dRZEO6ZmuqtAvM2xPWxQLmGZfSmzCwEYHlC+bsPdNzcX08cAbKToaWIKqxgVU/l0LVL7/dqgmFlTPaYrIYcL2JgoJFHmJFqg8hS6/OWRaKsdQEigEhnQcEyaQjdv0fgZmUZconZgAH4YJv52JZgVDCBjbiLgTm5DaxhGBEu9Qo602bEz/3/UNPnc+8h4a3Y/umy2wNBVIWtidRvEqEoOXSWyq2av1K4wW7iK4xLcphu7VU9B75rFXa1eMaBXri9mhA4xjSGamjGTFWRd/6JNSFt+33t1A32ote1HfbvHUvLOwWv2zXC5WPz7//W31h+VPZVPmYtyPQUrwcj41eSafeqOw1c0c69StB127twB0RzHB8VqXoTt17/QtyaHQ32oE4NPq18gHvv/Xren0bkcnGOisc7D/jc4J6IHOB4vOWfhTGUbqvUiwhE9Ec5kgCTEph7TDaD9QOlDaQeldHxo6tSh93GYpPuh+aKLHCjmHVB4HMAcwO8Cc9iGfLmghExONpERCVoNA1bN9AHMAszXr7CXtdN0WMjndFsoW55DLgciByC4ie0k1XXspI0RCQ6Lzy6cByAHITiB7ySpde0VlQTNMEeKYZuXAIFGjHbgcuOzgsp+k0l6UiRCUKpbKmBKo0RSI73A8pJUDm11s9vNvpmsv03ymiR6l+v29rmRzIHIgspXIftJKe4XH4q5enSb4ArTLzQvWzoa25UOustXfp2rvf4HmPy1TdxB1bFR4aWXPfSNf9Tp00AtQ9orNKmf7Stv0bAEsLY8mU/W1gYqAyocKHItB8/5Qzesk9ERj/wo48id9AGsv4mhg9c9qzVMXmM/upohA5EVBqxw+hPOFb2PYtb3relfEBicJQS1oXlNP4BMi35nAEjNdkVfROTX45cp/ari5E80FV/revYfpw86N1k1G9kyp/8FpSLl3k4kycv3rqXIDbVen5526VfHLjbz/Ag=='),
			this.addDataEntry(dt + 'table', 400, 230, 'Table',
				'7ZvJbusqGICfJstGxkOGZZqh0pGOdHS7uMuK2iRGJSYC0jb36S/E2LUDadPWdh0dIiUyYAzm//JPxoNgvn29Y3CX/qYJIoNgOQjmjFKRH21f54iQge/hZBAsBr7vye/AX51pBcdWbwcZysQlHfy8wzMke5TX/IN2lGNB2SFv4uJAdFMqtnKCCzAIbteYkDkllMlyRjN5wi0XjD6hk8o1zcQ9/k9dAKh+kOBNJgsErYVuLnoM/CCajsYTT9a/pFig+x2MVccXuTrq+k9IxKkeP4VxumfoTrUsQlmxozgTiC2f5Y1zWefpq6/gFpODrJixWF00lq2+t4D7TSpPL2ZI9+w4VCrETrZHwUz+yEVTP+oEPtxQuiEI7jAfxnR7bIj58dTVOh9CHtYGifzbyjB6nRET6PWsrI5VWlB3iG6RUFLwXnAiUn1GlMvTSxGWl9ZC1HWQ5+VN2fVN8vJAC98OQmCAIOVC4CNlULLAHQs9YUF3CDwt8yobXktshAYbBg48hTt1SHBF/v/quflKSG+81OGQol6slmAZyRaGuOSj6AauXtAV4n3vm4I/1OVZkXsYWOQOGpB7ZJH7CG7VH5CI4+2syoqNKO+vggWj+yxBiZYfZLFejehEbRz/77PFYvWe7qicvD5+KjokRlm+5GpxcQzJTDdscZKo2VjVSFUj+UVZzx6cQFuA6F0jiA2AF5rgBb7JXVH3He5GBncBSx4IfmSwea/E/9ASecfPewhVkLluhdWEZRrnPQpsRgY2JUpN26nx5XZq+7pRPvcQUz4e4phmfLjn+UrX1VKpaQyrJVdyEk2uXuRN2qgCgUKYBQOhhQELAuH3EZg4BPqBgPdjCEwtCNyOvuOarLyVv4oudE3KuKU516TgpbAz3hnX5CrhawK26AQ2i81pyeQUbvZnFA5dr3GMhhzFe4bFYUho/PSwY1QtjwLS8IyXo/kkPIffdTumLaie8FT1TA0agC1gakD1APAxDZ/QO8tZqPxpFxL1Te9osiZRZyERMBO1H+oZLsXNhzzGKJPqJtvHcrnYw2mcdN7B+YsVzPsaxhtGNQ1Tlj8wOEB7pwwRKPAzqo1vo0PP4I9a47fhb0Bdwd1M61eQ9oUjYdBV3sdlwJkJYQjA4SaBPH2kkCUGfi4O74dyssfhU2BxwNtyij6RMHZRWJtRWFjXFBPTFWorCgO25LFj4OeTMV0yYCZyHQN9yMZ0ycAXkrIuQO40QJ6aubnWAmQzP/vr3uDhM6k5sFgElz41LB1IFyJ3FSKDoLvHhsDM/EIY33AYu1ilp5TYYxUQdPjQ0P9CBtc5KR0EKyDo7pmRf0Hi1kHwA9FKpxB8IcfqIOggXOkUAjPv6Ta9/b3u67i7RzyWbbZu21v/STnjwk46zLdbN+o6w9UD72XcXaLNsmvWQdAL76VLCGzZVrf5rbf4NYHbyeY3q+Vpy/B8YbutS+53mtwHk+6y+9att2dwcC+Ktf2iWItvisni2yvK+eai6hvM/wM='),
			this.addDataEntry(dt + 'table', 620, 230, 'Table',
				'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'),
			this.addDataEntry(dt + 'table', 630, 230, 'Table',
				'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'),
			this.addDataEntry(dt + 'table action', 350, 30, 'Table with action',
				'3dbPb4IwFAfwv6b30oo/roJ42snDzs180GYPSko3dX/9iq2Kq0uWbbhkB5P2vX6h/YQghGf1fm1EKx/0FpDwFeGZ0dr6Ub3PAJEwqraE54Qx6n6EFZ90k2OXtsJAY78SYD7wKvAFfCUHKxR2vt7ZA4a6tLXbXZ4QviwVYqZRGzdvdOMWLDtr9DN8KJa6sRv11l8g6XMCVdW4CUJpQ/uUIIxzPp8UxSkWbtzHdlJZ2LTiqS/sHFXYMxgL+0/PfSyFQ69B12DNwS3Zqa2VfkXqaagEVcmQClxUdH5enZMXRDcIjrdNeWyqyvL+oOliOpvTsUFDYBbgBr6TkXwnkW+m61rZP3hm70qc8Nh4OpJxGhtLgQhNBf+dmdGYeTES8zRijnA7Kdp+iGqg+Ri25o6xHOhfUzu4vFglq9R1DHRO+xRLfsJ0uD7+QInfeqMmv8A0G5np/NdzF6Zb78VvKLnp5Tvh2Lv6jHgH'),

			this.createVertexTemplateEntry('dashed=0;html=1;fillColor=#F0F2F5;strokeColor=none;align=center;rounded=1;arcSize=10;fontColor=#596780;fontStyle=1;fontSize=11;shadow=0',
				 60, 20, 'Tag text', 'Tag', null, null, this.getTagsForStencil(gn, 'tag', dt).join(' ')),
			this.createVertexTemplateEntry('dashed=0;html=1;fillColor=#F0F2F5;strokeColor=none;align=center;rounded=1;arcSize=10;fontColor=#3384FF;fontStyle=1;fontSize=11;shadow=0',
				 60, 20, 'Tag link', 'Tag link', null, null, this.getTagsForStencil(gn, 'tag', dt).join(' ')),
			this.addEntry(dt + 'tag removable', function()
	   		{
			   	var item1 = new mxCell('Removable tag', new mxGeometry(0, 0, 100, 20), 'dashed=0;html=1;fillColor=#F0F2F5;strokeColor=none;align=left;rounded=1;arcSize=10;fontColor=#596780;fontStyle=1;fontSize=11;shadow=0;spacingLeft=3');
			   	item1.vertex = true;
			   	var item2 = new mxCell('', new mxGeometry(1, 0.5, 6, 6), s + 'x;strokeColor=#596780;strokeWidth=2');
			   	item2.geometry.relative = true;
			   	item2.geometry.offset = new mxPoint(-11, -3);
			   	item2.vertex = true;
			   	item1.insert(item2);
			   	return sb.createVertexTemplateFromCells([item1], item1.geometry.width, item1.geometry.height, 'Removable tag');
			}),
			this.addEntry(dt + 'tag removable link', function()
	   		{
			   	var item1 = new mxCell('Removable tag link', new mxGeometry(0, 0, 130, 20), 'dashed=0;html=1;fillColor=#F0F2F5;strokeColor=none;align=left;rounded=1;arcSize=10;fontColor=#3384FF;fontStyle=1;fontSize=11;shadow=0;spacingLeft=3');
			   	item1.vertex = true;
			   	var item2 = new mxCell('', new mxGeometry(1, 0.5, 6, 6), s + 'x;strokeColor=#596780;strokeWidth=2');
			   	item2.geometry.relative = true;
			   	item2.geometry.offset = new mxPoint(-11, -3);
			   	item2.vertex = true;
			   	item1.insert(item2);
			   	return sb.createVertexTemplateFromCells([item1], item1.geometry.width, item1.geometry.height, 'Removable tag link');
			}),
			this.addEntry(dt + 'text field', function()
	   		{
			   	var item1 = new mxCell('Name<sup><font color="#ff0000">*</font></sup>', new mxGeometry(0, 0, 240, 20), 'fillColor=none;strokeColor=none;html=1;fontSize=11;fontStyle=0;align=left;fontColor=#596780;fontStyle=1;fontSize=11');
			   	item1.vertex = true;
			   	var item2 = new mxCell('Messina Cake', new mxGeometry(0, 25, 290, 33), 'rounded=1;arcSize=9;align=left;spacingLeft=5;strokeColor=#4C9AFF;html=1;strokeWidth=2;fontSize=12');
			   	item2.vertex = true;
		   		return sb.createVertexTemplateFromCells([item1, item2], 290, 58, 'Text field');
			}),
			this.addEntry(dt + 'password field', function()
	   		{
			   	var item1 = new mxCell('Password<sup><font color="#ff0000">*</font></sup>', new mxGeometry(0, 0, 240, 20), 'fillColor=none;strokeColor=none;html=1;fontSize=11;fontStyle=0;align=left;fontColor=#596780;fontStyle=1;fontSize=11');
			   	item1.vertex = true;
			   	var item2 = new mxCell('&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;', new mxGeometry(0, 25, 290, 33), 'rounded=1;arcSize=9;align=left;spacingLeft=5;strokeColor=#4C9AFF;html=1;strokeWidth=2;fontSize=12');
			   	item2.vertex = true;
		   		return sb.createVertexTemplateFromCells([item1, item2], 290, 58, 'Password field');
			}),
			this.addEntry(dt + 'text field', function()
	   		{
			   	var item1 = new mxCell('Project name', new mxGeometry(0, 0, 240, 20), 'fillColor=none;strokeColor=none;html=1;fontSize=11;fontStyle=0;align=left;fontColor=#596780;fontStyle=1;fontSize=11');
			   	item1.vertex = true;
			   	var item2 = new mxCell('Watermelon Squad', new mxGeometry(0, 25, 290, 33), 'rounded=1;arcSize=9;fillColor=#F7F8F9;align=left;spacingLeft=5;strokeColor=#DEE1E6;html=1;strokeWidth=2;fontSize=12');
			   	item2.vertex = true;
		   		return sb.createVertexTemplateFromCells([item1, item2], 290, 58, 'Compact text field');
			}),
			this.addEntry(dt + 'text field', function()
	   		{
			   	var item1 = new mxCell('Project name', new mxGeometry(0, 0, 240, 20), 'fillColor=none;strokeColor=none;html=1;fontSize=11;fontStyle=0;align=left;fontColor=#596780;fontStyle=1;fontSize=11');
			   	item1.vertex = true;
			   	var item2 = new mxCell('Watermelon Squad', new mxGeometry(0, 25, 290, 40), 'rounded=1;arcSize=9;fillColor=#F7F8F9;align=left;spacingLeft=5;strokeColor=#DEE1E6;html=1;strokeWidth=2;fontSize=12');
			   	item2.vertex = true;
		   		return sb.createVertexTemplateFromCells([item1, item2], 290, 65, 'Text field');
			}),
			this.addEntry(dt + 'text field', function()
	   		{
			   	var item1 = new mxCell('Location', new mxGeometry(0, 0, 240, 20), 'fillColor=none;strokeColor=none;html=1;fontSize=11;fontStyle=0;align=left;fontColor=#596780;fontStyle=1;fontSize=11');
			   	item1.vertex = true;
			   	var item2 = new mxCell('', new mxGeometry(0, 25, 290, 33), 'rounded=1;arcSize=9;align=left;spacingLeft=5;strokeColor=#4C9AFF;html=1;strokeWidth=2;fontSize=12');
			   	item2.vertex = true;
		   		return sb.createVertexTemplateFromCells([item1, item2], 290, 58, 'Compact text field');
			}),
			this.addEntry(dt + 'text field', function()
	   		{
			   	var item1 = new mxCell('Location', new mxGeometry(0, 0, 240, 20), 'fillColor=none;strokeColor=none;html=1;fontSize=11;fontStyle=0;align=left;fontColor=#596780;fontStyle=1;fontSize=11');
			   	item1.vertex = true;
			   	var item2 = new mxCell('', new mxGeometry(0, 25, 290, 40), 'rounded=1;arcSize=9;align=left;spacingLeft=5;strokeColor=#4C9AFF;html=1;strokeWidth=2;fontSize=12');
			   	item2.vertex = true;
		   		return sb.createVertexTemplateFromCells([item1, item2], 290, 65, 'Text field');
			}),
			this.addEntry(dt + 'text field', function()
	   		{
			   	var item1 = new mxCell('Details', new mxGeometry(0, 0, 240, 20), 'fillColor=none;strokeColor=none;html=1;fontSize=11;fontStyle=0;align=left;fontColor=#596780;fontStyle=1;fontSize=11');
			   	item1.vertex = true;
			   	var item2 = new mxCell('eg. ATP, VOSS etc', new mxGeometry(0, 25, 290, 33), 'rounded=1;arcSize=9;fillColor=#F7F8F9;align=left;spacingLeft=5;strokeColor=#DEE1E6;html=1;strokeWidth=2;fontColor=#596780;fontSize=12');
			   	item2.vertex = true;
		   		return sb.createVertexTemplateFromCells([item1, item2], 290, 58, 'Compact text field');
			}),
			this.addEntry(dt + 'text field', function()
	   		{
			   	var item1 = new mxCell('Details', new mxGeometry(0, 0, 240, 20), 'fillColor=none;strokeColor=none;html=1;fontSize=11;fontStyle=0;align=left;fontColor=#596780;fontStyle=1;fontSize=11');
			   	item1.vertex = true;
			   	var item2 = new mxCell('eg. ATP, VOSS etc', new mxGeometry(0, 25, 290, 40), 'rounded=1;arcSize=9;fillColor=#F7F8F9;align=left;spacingLeft=5;strokeColor=#DEE1E6;html=1;strokeWidth=2;fontColor=#596780;fontSize=12');
			   	item2.vertex = true;
		   		return sb.createVertexTemplateFromCells([item1, item2], 290, 65, 'Text field');
			}),
			this.addEntry(dt + 'text field help', function()
	   		{
			   	var item1 = new mxCell('Form label', new mxGeometry(0, 0, 240, 20), 'fillColor=none;strokeColor=none;html=1;fontSize=11;fontStyle=0;align=left;fontColor=#596780;fontStyle=1;fontSize=11');
			   	item1.vertex = true;
			   	var item2 = new mxCell('Banana bread', new mxGeometry(0, 25, 290, 33), 'rounded=1;arcSize=9;fillColor=#F7F8F9;align=left;spacingLeft=5;strokeColor=#DEE1E6;html=1;strokeWidth=2;fontColor=#596780;fontSize=12');
			   	item2.vertex = true;
		   		return sb.createVertexTemplateFromCells([item1, item2], 290, 58, 'Text field with placeholder text');
			}),
			this.addEntry(dt + 'text field tooltip', function()
	   		{
			   	var item1 = new mxCell('Selected help', new mxGeometry(0, 0, 240, 20), 'fillColor=none;strokeColor=none;html=1;fontSize=11;fontStyle=0;align=left;fontColor=#596780;fontStyle=1;fontSize=11');
			   	item1.vertex = true;
			   	var item2 = new mxCell('', new mxGeometry(0, 25, 290, 33), 'rounded=1;arcSize=9;fillColor=#ffffff;align=left;spacingLeft=5;strokeColor=#4C9AFF;html=1;strokeWidth=2;fontSize=12');
			   	item2.vertex = true;
			   	var item3 = new mxCell('<b>Not great</b><div>The best password is hard to guess. Try again.</div>', new mxGeometry(300, 0, 180, 80), 
			   			'html=1;rounded=1;strokeColor=#DFE1E5;fontSize=12;align=left;shadow=1;arcSize=1;whiteSpace=wrap;verticalAlign=top;spacingLeft=15;spacingRight=15;spacingTop=10');
			   	item3.vertex = true;
		   		return sb.createVertexTemplateFromCells([item1, item2, item3], 480, 80, 'Text field with tooltip');
			}),
			this.addDataEntry(dt + 'text field tooltip', 480, 80, 'Text field with tooltip',
				'5Zbfb5swEMf/Gh4bGQjZ8pif7aRNmtZJe/aMAauOzWyTtPvrdwcmgZhUnfa2IsXYX/vugu/jgyjdHJ7vDa2rLzrnMkp3UboxWruud3jecCmjhIg8SrdRkhD4Rcn+xmzczpKaGq7cWwySzuBIZcM75UEfuQHpE9MKbg9c1t0a616kX1MIKTdaagNDpRWoa+uMfuJXYuUO8ETbGLqFVu5R/EYHMY6pFKWCgeSF89O9cZSk2XLx4SPpzXzgKTf2iTtW+cmKsqox/J7WIMxBqLVQjpvdEXbDgtZ73NODkC8grAyrhOMMZhOypU1ZwfI+jG4Mw0CVczXMZ+kKGthJbHCBnZVal5LTWtgZ04d2gtl26b7oQkB3FCRL1oMwfvO5cfz5ZgJbyWfvnusDdwb8kpPIXeWTOO+STCouwLUXvUZtNy7PphccoOOJmKYjDeh4pBKfijxQZZGPKzCMblTOc58PapjP1RL3dAANpLhor5AEW1MmVPm5HW2zAC0wnW+Wq/1+zFe36IfflCREirTXFULJu0boxZOSdRZDopYTRKXpvxM1D4gSAUS2ojV2wVLU9mZxueJpkWXzDQnzfubstVIy4oD8txyk0xyMDTwVZBZiEX8Mqeg1wyV14shHvqZQ8fG/4oZegt+l81H4u+XYgy4Ky12A2vkp3kRfFtYzMMcF1jYcEwebBa3S+M/okQpJf0pU8gZbp7GpsBslC9m/uGDIzsAtfjX48l5jnWJLCugNpEXZ2ggu89ZIFaJsDOybVrPeY9Qh0S8Ojseg6I3L7a0CG9TP7X4X77KJI/D6S/lcQeGA5voUFHkcnRDPRyjhKJwMHp81QikYlSvv3ek6qPNxdpG+ebiG2ne02cbkXddrbwCJCAs2mSjYi7//BIDh5eOzO2HDb9M/'),
			this.addDataEntry(dt + 'toggle subtle', 30, 16, 'Subtle toggle',
				'5VXBbqMwEP0ajkVgh/TcpE1OK63UL7DMgK0YjOwhTfbrd4zdpklIW6m9FQnkeTPjh/2eIePr7rB1YlB/bA0m408ZXztrMY66wxqMyVih64w/ZowVdGdscyNbTtliEA56/EoDiw17YUaISAQ8Hk0CGm3M2hrrppDz5Yrf01wrj87u4DXT257qV86OfQ1h8pIi4eSz/hfmqYrQsQOUiqIQKCHV6GArBgIWBAxW9wjuaU+v7lNRY3vciE6bIwEPTiqNICnLikcxtorKU9GzHZ0MRApxoHzFH+hByw6PUODz1trWgBi0z6XtpoT0U+mmiRQ0PCOp2OqSJq6GhXdLOwcO4XBz9ycobf0WbAfoiKd40TWqWMGjQIUCTUypaxkx4WPcvnWepKRBUnNeWf65sl6JIQypUQ8ebml6YYBmun6nnGxezvOGYzp4eRXjd2KXbEbshDkwAvUezuaac0Di/xs2+ER+Vy7O6O8uPGSbxgNeOehtFV8y1eJzUynsTDr+5K/aviTta+HV9GEoYmZyXndow6cvF2iE91r0uVQgd1dOnLVd+dtt94HRltc+q37EZhcm4983GYWn/10sf/87/A8='),
			this.addDataEntry(dt + 'toggle bold', 40, 20, 'Bold toggle',
				'5VXLbqMwFP0alkVgh0y2TdpkValSF7O2zAVbMRjZJk369XP9aBOaZBqp3RUJ5Ps8+J6Dyeiq228MG8STrkFl9DGjK6O1i6tuvwKlMlLIOqMPGSEF3hlZX4mWIVoMzEDvbikgsWDH1AjREx3WHVRyNFKplVbaBJPS+ZL+wV5L64zewnuk1z3mL40e+xp88xItZviLfPN9qsJXbMFxgZY3BONiNLBhAzpm6Bi07B2Yxx2+uk1Jje7dmnVSHdBxb7iQDjhGSfHAxlZgekp60aPhHkg4N2C8ovf4wG37h0+weat1q4AN0uZcdyHAbUhdNxEClxOQiiw/w8TdEP9uaXJgHOyvTj+40ug3oDtwBnGKV1k7ETNmkaBCgESkxEryMRvt9qPySCUuEpuXmaVfM2sFG/wSC+Vg4RqnnwTQhOt30kku0zktOKQPL6+ifUJ2OT8n+91nQDEndzDpdUkBCf/ZD/gIflcuJvB3i2kH3TQW3JmCPnZxk6hmX4tKuE6lzx/1VevXxH3NrAgHQxEjQXndvvVHX86cYtZK1udcAN+eKXEiuxD5m4ZKToVY/nYh/k96F86ZxY8obz7VXfV93aF5/AXG9NM/5D8='),
			this.addDataEntry(dt + 'toggle bold tooltip', 280, 112, 'Bold toggle with tooltip',
				'7ZhNb6MwEIZ/DcdGBkKSPeazl65U7R727MKArRrM2qZN99fvGJwPAmm6SiJt1EYKMmPPjOz3yXgUL5zn63tFS/ZdJiC8cOmFcyWlaUb5eg5CeAHhiRcuvCAg+PWC1ZFZv54lJVVQmI84BI3DCxUVNJapEPLVxqjqhQp+V6CNbtZp8ybcupQLMZdCKnwtZIHWmTZKPsOBkZkcd7XwcZjKwvzkf2wA375TwbMCXwSkxk1vnL0gjL6NxhOycXOJ+8LoZzAxc5OMxqxScE9LNAzRUEpeGFDLFzwRjbZNxBXNuXhDw1TFjBuI7R7JglYZw+WbNLJSsU3EjClxPgqn+MDTtA+7QA8yKTMBtOR6EMu8noh1vXSVNilw2EoSBbO9NE4AUAbWR0WsTU7Be5A5GIVxyStPDHNCDhuhCQOOoZ3R2ahu3rOt6w4JHDgq+gkJO4S8iwIKF45m4Xh5jAclqyKBxMlFVeykjMi+lOQWpdwDMyBnSvvmFIwajz2lryX08LTQmtHSDtGRl/roT/6Ah7T+fE51w3512w5OazLoiu2PumJvbAoENfwFWrH6CHD5H+0B75Lf+ZNW+rtJO4JMUw2mQ9B2Fx+CKjoN1d4FgXwlePk02idUs7pOkGamJi9fZ/auHFAjqNacFoOYQfzcIbGFXT3zyx1qcPM3xiVBfA+9njozuQh5ozZ30RW4G3W4W3BNn5C5053NsRvKJ93a5o+D2XBxRu8TQ7FTtY/e/e6H9AS67aJ6zhXpHIZRC6eeG9P3o+tcmeOj3bM0DPcXkEqDsidrJD5yUJkF0DBubU+KFqgc+nPawfI/6bffJe4mq+cFmrKIdBALJlfqyiYdxH7Aq+KGF5nNxrWRLuDxEnZQs1ZkFayivitzMVnMl2EXDVJ/ugTZU+QxFVNnznmSCDiBkL2ABX0C8Sg17kNaR9Uc2jbgw8H8NrAuaYxbf6jzNxX5Y/3Dp2V23WrEHMHjniIZ9HSawfkAf+sAPNvUvQQE1AJ/4fuF77/g65NuBb4Qv/i6+/etaTz3/5z7Cw=='),
			this.addDataEntry(dt + 'toggle bold disabled', 110, 20, 'Bold toggle disabled',
				'5VbdbtsgFH4aXzbCECfqZZy/q0mT8gQUY4OCjQU4Tfb0OxjaxLGzdtp2MTVSLM4/nO/TgYSs6/Pe0FZ80wVXCdkmZG20dmFVn9dcqQQjWSRkk2CM4J/g3QNr2ltRSw1v3GcCcAg4UdXxoAkK6y4qKkqp1ForbXqRkEVOlpArt87oI3+zNLoB/9zorim4T56CRA07yB8+T4Z8xJE7JkDygqBMdIbvaQuKOShaLRvHzfYEW7fRqdSN29FaqgsoVoYJ6TgDK0Yb2lUC3KPTQXeG+ULCuRbsGVnBB47tP97BziqtK8VpK+2M6bo3MNu77spQApaDIhnO78uE02C/t9g5bhw/P+x+r4qt33Ndc2egDroMuv8qCyeChgS4kOAS6sYci6CjNsjVe54rsLCI2E7jTD7G2Qra+iUEytbyRwjf0eF5tXnOt18TXDwN7jAgQo1m2QjsFE+AHXWGK+rkiQ9yTTEg1v/uG3wt/pTOB+Wf7jiky9JyN2LQ+yk+Rar5x6QSrlZxGAC/Cv0asS+oFf2YQMHSM68+V34QzqhT1FpJmxkTnB1HTJykXfrVafcLoi3GPMv+Cs3uSEb+AcmyEckO3YtlRr4Af+7p9uj6SdF4cqVLnM83j8bcDXFvQEr7tEpWDQiMN1cUbxKX/e8tMG4OTST6v0fmn9x/MYCMqbrMxlyNb5jfuQBBvD6iAutu31g/AQ=='),
			this.addDataEntry(dt + 'toggle bold disabled', 110, 20, 'Bold toggle disabled',
				'7VZNb5wwEP01HLMCA02vWTbsqVKlHHq2YMBWDEa22bD99R1jbxYWaCIlPVTtSos8H2/G+D3bBHHWDEdFO/ZNliCC+DGIMyWlcaNmyECIgIS8DOJDQEiI/4DkG9FojIYdVdCa9wCIA5yo6MF5nEObs/COiguRSSHVaMZ5lJM8CeK9Nko+wyXSyhbz90r2bQm2eIQWVcUT/2nrpKFFPIMpGFrWYLRgvYIj7dBh63WStwbU4wmnrn1SJVuT04aLMzoeVMG4gQKjJDzQvmaY7pOeZK8K24gZ02E8jR/wga9tHzZB72opawG043pXyGYMFHpMzSvXAoezJinZ37Zxb0Ps3PzKgTIwbK7+6PJLfwTZgFHYJ3zhpWEuI3EEhQw4dvKseB/Vzq5fkVcqceDZXGc2fptZzWhnhwjknYYtTm8EkJHs/vCP0knW6Tz7rbZLHWRCb/RlSe/Fp0BQw08wa7fGue/43S4ppgyzveub332d42VVaTALxbzO+l0iSt4WETON8Nsd9VTKF891STUbD4LQRUalNUNtj7odNYJqzWm7Gxaqm0lsjPzwy0n+i24iujngNxJcUeDnCPAuupFg/AckmC4kmNG2wBwU160Wt26fKFweY9E92SeHrTNvouoJZ9FYVvC6RaOA9krqpHA1/i5AP7lwpdDfLeWPXH8ekKxoNf2U2xDN6zeUE930E+sX'),
			this.addDataEntry(dt + 'bold subtle disabled', 110, 20, 'Bold subtle disabled',
				'5VbNbqMwEH4ajo2MCe25ISWnlSr1CSwYsFWDkW1S0qffMXabEKDtqruHVSMFef7NfB9jR0nWDAfNOv5LlSCj5CFKMq2U9atmyEDKiBJRRsk+opTgP6L5ijUeraRjGlr7lQDqA45M9uA1XmHsSQZFJaTMlFR6FJM8zmm+jZKdsVo9w5ulVS3677Tq2xJc8hglposn8erypMRFPIMtOEpO4KzgvYYD61Dh8nVKtBb0wxG3boJTpVqbs0bIEyrudcGFhQKtlOxZX3N0D05PqteFK8St7dCeJvf4wNd2D+dgNrVStQTWCbMpVDMaCjO65pUvgctJkZTursv4t6Fub6FzoC0Mq90fVaH1B1ANWI11yGnS/RdRWu41iYeLcBBYN+S49TpmvFy/5zkDi4uA7TLOyec4G846t8RA0RlYQ/iKDhnN7vY/FFz6Ibhkk87gjekCvEGnQTIrjjApt4R5qPjoWoouw4RLofjNFWdUVRmwM8a87/pLJNp+TiJuGxk+fuRTqV4C1iUzfBwLxFtGpjVD7QbfhlnJjBGs3Qwz1i1SLP7pFJsGfEC4dM639K/Q7SYmU8Il/4Bw6YxwGWsL9EEqXTNv7eSJyXxoxXd0t92vTbgLDl9gFo9ppahbFApoz6BeJK7G31tg2BxZSPR/T8vvHH0hYDvn6u0CWcP15U/OPhTP9ydPusvr1W8='),

			this.createVertexTemplateEntry('rounded=1;arcSize=10;fillColor=#172B4D;strokeColor=none;html=1;fontSize=11;align=center;fontColor=#ffffff;fontStyle=0;fontSize=11;sketch=0;',
				 65, 20, 'Tooltip', 'Tooltip', null, null, this.getTagsForStencil(gn, 'tag', dt).join(' ')),
			this.addDataEntry(dt + 'comment', 470, 125, 'Comment',
				'3Vddb9owFP01kbaHonwDj0BLt2pbpX489NFNLomFY2exM2C/fteOSUNdqkkt27RIIfb19fXJOffaxIsW1fayIXX5VeTAvOjCixaNEKprVdsFMOaFPs296NwLQx9vL1weGQ3MqF+TBrj6nQlhN+EHYS10ls4g1Y5ZgyxJrZvVttAwR1TI8YhmgstRK6HxovmKMrYQTDRmQrQyF9qlasQaBiNhEk2SiV0SGgXbo7CNyWK+BFGBanbosqG5KjuPyEItgRalOrQR2fWLfuYTB9iwNLxMSeRQckUrNMxbzikvpENQqSqMdR48Y4ILDg4J1rgSXN3SnzpAgK85J4wWHDsMVsoOD2jzzYX2TUkV3NYk0xM3qMZbqLQT4i5BhsxOfZdZm0dvYjZ2mJ3d3326vnEYbUTLc8gtqaTJLFeJm2zLcBktk9d4Hjgn03Q88Qd8Z0iSSWFNIc0Im9mBiua5RvMC5Yfq+fu+Ra8B9wnxdnWCMHHkSZLTyJM48kQYFaf5s7ZopcJG6Afpn8//XrZT5H8wdQsgCE5UAalD8V1J+Br3FH+Fbxv6qgQNpcH3PGvr0X+61+wOGR0w37u8N/Njh/kH0XphSipd0aQW0uwC6FLhy1CkLu/laIBIPO56kTLUrMCjoHfgpIKROSJ0kWxKYh7QwNEQpWB5FwHpF70bWm04Lbu2M4Fe0RJbn02YCqpH0BEQO9vrpzH1EqbfW/3vYY5ixtmU4Ek8MA1yaW98JNm6MDvumQ0y0ysVjx/CODYL6S0gjJNBe/xxGDQtzDP2r0BKjXyOazR7gKhMh9G6IYa2KECq5wzumdUNDUqrx/HnivCWmDTCrgF3A93zAe97vL9d409rll4IvkKJOabtv1Q77gmjxAkqKnZPizh6oaLSd6ioiVNRN1CzXZeaXVkhJxO96RnVL3Kqjg6eAwMFR4e/0PVf0POk584z5QLfle69NkPsPn1RmLGDD45f'),
			this.addDataEntry(dt + 'linear discussion', 470, 125, 'Linear discussion',
				'7VZtb5swEP41SNuHIseQpP2YkrWb1EqVWmmfDRiwamxmGxL263d+oSFVUrXSqn1ZJOLzHXe+l+exiJKs3d8q0jX3sqQ8Sr5FSaakNF5q9xnlPMKIlVGyjTBG8ET45ox14ayoI4oK8x4H7B0GwnvqNRFecXC9riREwKiQXCpnWf3qbVbXEU6WV6v1JZqrVnVYnW8+Ke6JMkxAmAfSjZMVsskPHgivI5zBuukUs6ktVmAkbQdWketuFhYcfVbHp5VsmKkgvQU6bf3OIPwjaf15P+BpyEBhkaqkipYgjbJXsAi6s5ml8xJRKwUzUsUg/myorYrZDhGl2ED1IeiOuRYLaVg1+phvVHSc/euUiSinCKggwg2ktSl7A0yH08JMqVRKQnHI0Mam8gR/JQUsmBbQEL995mutRYU2Iw+o0A3prNjua4vVmEm9jlkhhY57TZXFC1SdvYAlqdwP9Noo+UxnFrxMLpeXAWGP7LcNu8C2Vs5qARtOqwmAMzfkfqDnJKf8QWpmmLSvK1Y39v3GtNyGAnGgALuC8E2IaKRtuu5IwUT9ZDfbCweSoLpzJ26XgQzgTfdnCeVUgU23FKZh1OimXpomkCr1Xg31qc11RPt9/eJ5YCcIgaCnyZp8LlkdM9Ad2UGtBf3nbN0oi/MddUD0lOqUHFgNAztLTujuTaChaWRv2x9iSMHHKUTpuM5JB8DQjqq7OI4/wkvPxcBLKSqmWnsvvGceaXFFgBnz5A9Em5Q5KZ5rJXtRXoQgG3hP1fkXnKbuoMz1YDmT119PDDlF0x18ZirIdez/1fCJV8PoresQ5O/fFLA9fDI429EXxR8='),
			this.addDataEntry(dt + 'nested discussion', 450, 160, 'Nested discussion',
				'7Vfdb5swEP9rkLaHRMSQpH3MR9M9NOvUdtqzgQt4NZgZk6T763dnk4Z0ZGmkbtKmIRHO98V92L8LXjDLt9eal9lSJSC94MoLZlop46h8OwMpPeaLxAvmHmM+3h5bHJEOrNQvuYbCvMaAOYM1lzU4jsdGEk2nJbIr8yQde/StppCmUhTQy0CkGa4mqBKi/+FejlTaPK2XlcI4mB8rqfSBI48Fw8vR+MI/bhvtGHf8K/q4z3i2E2FC0V7dH2DUM3x+VGvII9BIInPU0nZxHPpHdvmS9zZZJ2J9TiHC+JKvVm1WRwwRjx9Treoi6TVOKBCdRu9YGHrUZqoAC4ctevy+I8bQX3JjMtigypf6aI3IQ8wL/N0AvQh6uqaVyUSFD1XExI41cIPEAhJB+TlZbawiKSSKQl20XtNRnD/aie4QzmzZsb17B6V8og5cMQ/lEzpcV640bdYcJFDZDpg34hFOb9mT5WMHhWNVxksi821KKNMXqhr3RayKql9XeFQwTyHl7DnJYGUv5FdGq0doSdgwuBheNJW5F9/JLR69YMqlSAtcSFjtCtcy8+1FzeMRyE+qEkYoUteujdPM5JJcIbkGbUTM5aTxaFRJkZQ8FkX6QIt5b+DvWTf2jfNhA2NoDdujUGhZDQ5eg8rBaOrVRiQmcxpBg4e7Hdbm8cqt02fLPa4i0UBrN8wGfwPMHoGFNtCe2J5NGD/nQ4JeZXcMZTPwy+0vA/qN+Df5/PDh9q47v9ckd2aN/UHwhrPptFILHu5rDTv4dkieKIvL3PSpycTP+JoenEpe5zm3B0JDqTTlCnigiJFjhBnZPDjwpx/MILAn0eG85JWxY6Fp8VJFQpJgAZBQ72iCx0pDzHWCdA/v29iozop0YNyrkj+3Qv/uSDhRif8z4swZ0RiE7t+0/+SW48Zna4LQPn45QXa8MyYILvcfAVZ28I3wAw=='),
			this.addDataEntry(dt + 'comment', 320, 213, 'Comment',
				'7Zpbb6M6EMc/DY+NbAgkeWxulVa70mp3pdV59AEnWAWMsGnS8+nPmFsgdi7dJD3tCZGawtgeJ/7/Oh5PsZxZvH3KSBp+4wGNLGdhObOMc1lexdsZjSLLRiywnLll2wh+LHt5oBUXrSglGU3kOQPscsALiXJaWmY8jtXgwi7ka1TZQxnDp5tjy5muWBTNeMQzuE94Ah2mQmb8me4ZVzyRP9k/ygF24Z5EbJ3ATURXsmquR1i2g4oX2Dchk/RnSnw1cANLo/w/U+mH1fwh8cM8o0+qZT4EQ8pZImm2eIEPLsCGKu9LErPoFQyPma+c+tBqoznJ1yF0rz8hz7NiqlDKFNpd5xHeYMXUm+ogBmvO1xElKRMDn8dFgy+KrstVOQVcdiZx7WlrmmqRaSbp9qBQhalS6YnymMoM/KINC2RY9piUWqKQMvBcCVjZiCjv183InepwUQlvhsDRINDUFyFJ1WXEDHKDeO7EG43Vsrcw+dyateC10YUavna1aknq2AZN8RU0HZ6vabxdq/gzYFyMBszniRjkolyD1h86iLwqXib5YSnH7rjXvKX5tqt5hcDQhIBOQG27hABXI+ALgzVB0zxJWLIW147wdh/hLyLFO0nKreK/p5HigFcYhh7zdS4gF0A2wt77A9PsKj0wBmCwe5IYjG+EzEhD5ldIkme1litQz0YypOqjZPDtH/J00Aebj8XOXrDxdHQanK6NzlhD5y+eW7ZHYqUMSTn4nr4oetQ5hIH2QcNTRomA/KShzAfo1rCZNR0SEtNBscmpqLUJSfGLZvSgi5BHQekBtOFNN7BW7hS3yh5x6OUsPxjJigLmk+ixciF5z7fO99jV+fYMfLvu5XxPNL5/0FR9Z9RADqKO1barrtBX9kz/g2Ss31vfwA827K03C5D1nt2f3T7W2Q2P3+/whrGeYL2m5V4EzsJix9pjIuN5EtCgEpBkfrUckyM07MUIAWEAXH8t7uauCZf5YoEX3l6lp+j0u1oW+0iw2Y9Rn5u5GwQaA2PGncpxrgCZXv09tg9BzAn4ppIhICIsWENlSyca/U0E8wd+xoVQIgfbut8+TENYUG+h89nYPzcffxaTTpz6OryggZ7Z4KGOS23LaEQke6EdXyaGqvm/qxXeTf5QZ+/V9A+jrge+WgkqNQabb3EelmfUow/FOts5BpMpa2oIQ/dD2PFdb9wNSbXkLcKMmc/wCgHpDVVrGMlSQc/OdCq5Tf+fuCPlnaPSN9HkSHQxBJcrxRbc5e5hL426TmzRq+I9YXdDmP0OgOnF9B6wewHMewe+9Mr7ieTo7ELAfAknO7ed6OMubbs0a3inqflR9PBkr6iONfKwY8icRuMrZE56VX0RMP0pnh0aSEdjOVy6y9HBRLl9/GtToZcZOyf8TkkB1xyYClAZFTCwLiN8/kdIzmNqZIbqFDV1AeBPQ1YN6S1ilF4Ch72OSvoGHI8VunsS/48kOpPLUYTb3bOTZff2o5X/Ag=='),
			this.addDataEntry(dt + 'date picker', 240, 58, 'Date picker',
				'5ZVNj5swEIZ/DcdFxoQsOWYD5NKVKvVQ9WjBgK01GNkmm/TXdwAngYVoV+qp6gE0H54ZMe8j7IWH+nzUrOWvqgDphakXHrRSdrTq8wGk9CgRhRcmHqUEH49mD7LBkCUt09DYrxTQseDEZAdjJEGDkoJZGFPGXqRLlULKg5JKo9uoBqMvxmr1Bh+C3Nb4IUmAZqka+0P87hsEN991JOgzKaoGbQmldelrM4+G0W77HJMPZWttzRvYnLskZznvNBxZi4ENBlolGgs6PeFSjBvcd8hYLeQFA3udc2EhxywlCesqjsevY1Sn834Qt7bFfBTu8YUL7V/9AeNXSlUSWCuMn6t6SORmOJqV4wg0Z0Mi+jIZ4zQAbeH8UMch5EQ8gqrBauxL3kVhudNyM2pNOAhs7YIuxszoV7fSOxVoODDWIQkXkPzCpWCkYfWSEq26poDCicF07oTa9QudEIT6Zs9ZnO2WGJiW5aKpvg1eEi04w9IkTYN0O4dtPPTTbYR+xpPjh/7X/FwcJtFYMcEpiFZwCsO/x2mzwGnBkOGs7c36XPW/Rr+qC+nnTEJTML3kKNpv4zh49Du6iUv+RXEnqFLyVbHDdbHnBU564q9oHy+lv8Y0SGbFCWa91nhw87/3C74Pf6K72fin3byDKksDdsHT7SvWEEP3fmWOx6c36h8='),
			this.addDataEntry(dt + 'date picker', 320, 415, 'Date picker',
				'1Zxdb9owFIZ/DZdFthOH5HIl0E1au2lt1euMGIiaYBTSFvbrZ0igkGMqtvorSJXyUSfk8bHzvj5H9Lxhsb4pk+X8lqcs73mjnjcsOa/qrWI9ZHneIyhLe17cIwSJvx4ZnzmLd2fRMinZorqkAakbvCb5C6uPxGKDoDSpWH1qVW3y5tQ0y/Mhz3kpdhd8IY5er6qSP7PWwXlViAeJsdic8kV1n/3ZXgAf9psrIrGf5NlsIbZzNq2a0/uL9YhHo2AQolYzeNn6EVhZsfVZDLtDDYMbxgtWlRvxL29ZWs0bFH6NCs1ZNps3zRp8KFnV+7ND03eoYqPhKmfsAcYPPE02AG/JXxYpS5tHTMpJ84TR9oGP0Asw090H8lstk0m2mH3f7cUUdJBoihAdxOFpL9X/9NSwILAjCPVCGrbAk8+A3zR8ad3iqB8wlfSD532+H3zQD6ALVvNkud0s1rPtkOzPijTvT5KcLdKkhN1wwCIZBpew8eRsThs0pFBfgiqEpPbHSpYnVfbKTq4lw9fc/yfPxNc63PyKRCe3v4pOr8Cn0xWrAP7DU1zUI/Tfe6Tgk+eXZX/Ky2LVL0s22YZ92YSkNODj8QiP6AdjSNwi5W+7ofD5gA5gL3lEFtBUwcwSAH53/JUVv1kpjhKEKcQpm68l8/ol4z8AE/Ml+OiHMR+gk6jDAaBJkISmrwDmQBKMQb4NL60UI8nrTQHIPbnzIGXTrAqOoYzjrKscCfVtgYwAyPvHO1UMo90HvNHVj2hyOqIp5CfTXSr4YQQA3v7oHsDAHkAMAD48jjoHECN7BKG/ehrF3SPo2yMocU9fH7tHMLRHEPqe8a9vnSNo80UCfcr9l4fuEbT4JoFOxcNaAQYqgJ3yigzygmZEGS60+2jAFdjDBT2HZCXBMVxtWWKSF7QWnvu8fGu8CHQSvvu8Qnu8oHFQthSljZfF6X4/Wx3xCtznZW++l6RUBu7zai1tegZ5QQsQOs+rvRRskhcU/JHzvNp6wigwqO/3q28qiDUZy4+SD74Kgr5FghLF/x+SX+AaDUfxGF0ceN71ubzzYf1UpQoxyhTagv2CnMPj2OqLAhoD7L4zsPmq8KA1wO57g3aIDQwCg95AXZ7amBgxCQyaA+y+OwBqxCQxaA+w+/4AqA+TxKBBwO47BKAtTBKDFgG77xGsTvzQI+y/jcvEbM780BN0IA3QCjFZxYw2YJI8gPuCP7AIDOp9dZkAbXm5trYwScyHer8LuQDfIjEo+DuQDWhrC6PEoOLvQj7A4sTvQ8XfhYyAxZnfh4q/AzmBdogZLGHxoeDvQFKgHWEmgUlqftzX+0BbmCSmsepHnxhrSwuTwDTW/egD1lYWJoFpLPzRV4ZncdanUO4rU/v6gFmc9anG0h9ThZ4mS1ko1PrKpL42Xu34MslLY+mPuQULk8A01v6YExUmgWks/jEnKkwC01n8Y05VmCSmptjHtqzQR0zsvv8GSv3DAsc/kfIX'),

			this.addEntry(dt + 'text field', function()
	   		{
			   	var item1 = new mxCell('Your name', new mxGeometry(0, 0, 240, 20), 'fillColor=none;strokeColor=none;html=1;fontSize=11;fontStyle=0;align=left;fontColor=#596780;fontStyle=1;fontSize=11');
			   	item1.vertex = true;
			   	var item2 = new mxCell('Sally Lu', new mxGeometry(0, 25, 290, 33), 'rounded=1;arcSize=9;fillColor=#F7F8F9;align=left;spacingLeft=5;strokeColor=#DEE1E6;html=1;strokeWidth=2;fontColor=#596780;fontSize=12');
			   	item2.vertex = true;
		   		return sb.createVertexTemplateFromCells([item1, item2], 290, 58, 'Text field');
			}),
			this.addEntry(dt + 'text field required', function()
	   		{
			   	var item1 = new mxCell('Requirements<sup><font color="#ff0000">*</font></sup>', new mxGeometry(0, 0, 240, 20), 'fillColor=none;strokeColor=none;html=1;fontSize=11;fontStyle=0;align=left;fontColor=#596780;fontStyle=1;fontSize=11');
			   	item1.vertex = true;
			   	var item2 = new mxCell('Design, eating, drinking', new mxGeometry(0, 25, 290, 33), 'rounded=1;arcSize=9;fillColor=#F7F8F9;align=left;spacingLeft=5;strokeColor=#DEE1E6;html=1;strokeWidth=2;fontColor=#596780;fontSize=12');
			   	item2.vertex = true;
		   		return sb.createVertexTemplateFromCells([item1, item2], 290, 58, 'Text field with required fields');
			}),
			this.addEntry(dt + 'disabled text field', function()
	   		{
			   	var item1 = new mxCell('Guests', new mxGeometry(0, 0, 240, 20), 'fillColor=none;strokeColor=none;html=1;fontSize=11;fontStyle=0;align=left;fontColor=#B3BAC5;fontStyle=1;fontSize=11');
			   	item1.vertex = true;
			   	var item2 = new mxCell('Kris Wesley', new mxGeometry(0, 25, 290, 33), 'rounded=1;arcSize=9;fillColor=#F7F8F9;align=left;spacingLeft=5;strokeColor=#DEE1E6;html=1;strokeWidth=2;fontColor=#B3BAC5;fontSize=12');
			   	item2.vertex = true;
		   		return sb.createVertexTemplateFromCells([item1, item2], 290, 58, 'Disabled text field');
			}),
			this.addDataEntry(dt + 'text field disabled', 370, 543, 'Disabled text field',
				'7ZpLc+I4EIB/jS9zSPnJ4wgG57CzU6nNbM1ZsQXWRpa8kgiwv35bsiHYchiSQDJTmCqM3ZJaduur7nYLJ4iLza1AZf4nzzB1grkTxIJzVZ0VmxhT6vguyZxg5vi+C1/HT15o9UyrWyKBmTplgF8NeEJ0hStJLDBSGGRIKxL8H5yqqpNUW1p3WhBKY065gEvGGUinUgn+iFvCXBXwSDMPThecqXvyn1bg7a9rjS5cI0qWDM4pXqi6eafM8QNv6E/DuDWsrXakb+MRqzSvG3OU5iuBb1EJghAEJSdMYTF/AvPIemKtIUEFoVsQTESaEwWPLOGBZ2i1zKH7bhq+EqmeKFeqhPYomMABTKsPuoO8WXK+pBiVRN6kvDANqTRdk0U1BZw2Jon86cE09WpgofDmxRU1ono5bzEvsBKg112TTOX1qobVqrs5JqC6FtYyJKvr5X7oMx9wUiPSjUtg4XJXEaLNBbeobyPH5ncL1oIfgUsuieKCYN2Hkid8A7/fc7zdD0nBdogwLGQ1TosQg+NS8FWpySNgO9ShjuheC65bHrDSNtTaMq2UiyViRCJFOJM3pxDcIrAT6BaWrvm0MPSb4K/1Wt+XyKCzFprFqV5hkiI6qadUvLxqdrc1olE14gDlYNiBchi9H+XwJZRByFABCA2owUATOFgq84SVSNvLgLbjYPDvilcdgsXCEHEgqsZ+2Q12Knu3dYK4MdNnO9xoPBiOXOe4w/V6aH1/B+hH+N/IgvYH3GeBKWcWMuA7WYazemWQSOtVG2vrHuBkoNWfDhcIXouw5VdzNYss6GBoGI8nSdIkr+r0o7aH/wq3efUwjW0P6I+7POAZYBpYMP2hg3Lv9nq3dwKpXtiB6qX83tBCdTr/PjmKCyxmHM9d45tey8yOkRSz52Xpcno/o6Tpg6+Xmc0uv6tZOMLQpRAaWQjdKyTz94TNZJiMkvGbwuZsPvfmg1eGzaZz6sPmAUhdSdil4ubYImmGZSpIqV81+xD2+1Cz9ysfEcI8187dc6QTKmIqGUXJhUImw6oKGiXmJdWVDMXh8Mj42gmSk91V+Au7q7760Y1jRzQMBh04et4Z6h+ed6QAUmJRECl16ezzHdpJtd+wJwhoGX2kQ7P3Dv6WpgKL0hTLXxWcPn/qACd0PxIcexfhL4wyrZXp41oQvQHVokfmqNSnoIuUEh8pYlnRy3Wj4WxkhazwSGGqBVY7YhUkyyg+gSyKHjC901sWOjcMZqIy5V7h11b7XnEzKHvuIaXutVG6G+A13h7DwIbW6wqX52DW3i6omeWMbk+AtZmntTMzN/GT7sRrNIvnwW8G6mGSmKNMJ65mzgzet40JGjRfnc/dNLHc0Rx10Ox30OyfgWZ7H+Gbjr09xj3G78W4oxJzMYztHYy71QMlP63qtbht5QfHt/ytvbJ9kfhN0IavBu3qon9NVuTZZHW9HQfBGciyNxxixFJM3/xS81Jt5LMoulZ3NWy6qwtCBZfP/+MzbY2/+f0P'),

			this.addEntry(dt + 'error message field', function()
	   		{
			   	var item1 = new mxCell('Email', new mxGeometry(0, 0, 240, 20), 'fillColor=none;strokeColor=none;html=1;fontSize=11;fontStyle=0;align=left;fontColor=#596780;fontStyle=1;fontSize=11');
			   	item1.vertex = true;
			   	var item2 = new mxCell('shrugg#atlassian.com', new mxGeometry(0, 25, 300, 40), 'rounded=1;arcSize=9;align=left;spacingLeft=5;strokeColor=#FFAB00;html=1;strokeWidth=2;fontSize=12');
			   	item2.vertex = true;
			   	var item3 = new mxCell('', new mxGeometry(1, 0.5, 20, 20), 'shape=mxgraph.azure.azure_alert;fillColor=#FFAB00;strokeColor=none;html=1;sketch=0;');
			   	item3.geometry.relative = true;
			   	item3.geometry.offset = new mxPoint(-30, -10);
			   	item3.vertex = true;
			   	item2.insert(item3);
		   		return sb.createVertexTemplateFromCells([item1, item2], 290, 58, 'Error message field');
			}),
			this.addEntry(dt + 'error message field', function()
	   		{
			   	var item1 = new mxCell('Email', new mxGeometry(0, 0, 240, 20), 'fillColor=none;strokeColor=none;html=1;fontSize=11;fontStyle=0;align=left;fontColor=#596780;fontStyle=1;fontSize=11');
			   	item1.vertex = true;
			   	var item2 = new mxCell('shrugg#atlassian.com', new mxGeometry(0, 25, 300, 40), 'rounded=1;arcSize=9;align=left;spacingLeft=5;strokeColor=#4C9AFF;html=1;strokeWidth=2;fontSize=12');
			   	item2.vertex = true;
			   	var item3 = new mxCell('', new mxGeometry(1, 0.5, 20, 20), 'shape=mxgraph.azure.azure_alert;fillColor=#FFAB00;strokeColor=none;html=1;sketch=0;');
			   	item3.geometry.relative = true;
			   	item3.geometry.offset = new mxPoint(-30, -10);
			   	item3.vertex = true;
			   	item2.insert(item3);
			   	var item4 = new mxCell('Please enter a valid address.', new mxGeometry(310, 22, 200, 46), 'rounded=1;arcSize=9;align=center;strokeColor=#DFE1E5;html=1;strokeWidth=1;fontSize=12;shadow=1');
			   	item4.vertex = true;
		   		return sb.createVertexTemplateFromCells([item1, item2, item4], 510, 68, 'Error message field');
			})
		];
			   	
   		this.addPalette('atlassian', 'Atlassian', false, mxUtils.bind(this, function(content)
	    {
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
   		
		this.setCurrentSearchEntryLibrary();
	};
})();
