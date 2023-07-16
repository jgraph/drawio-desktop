(function()
{
	// Adds BPMN 2.0 shapes
	Sidebar.prototype.addBpmn2Palette = function()
	{
		var gn = 'mxgraph.bpmn2';
		var r = 400;
		var sb = this;
		
		this.setCurrentSearchEntryLibrary('bpmn2', 'bpmn2General');
		this.addBPMN2GeneralPalette(gn, r, sb);
		this.setCurrentSearchEntryLibrary('bpmn2', 'bpmn2Tasks');
		this.addBPMN2TasksPalette(gn, r, sb);
		this.setCurrentSearchEntryLibrary('bpmn2', 'bpmn2Choreographies');
		this.addBPMN2ChoreographiesPalette(gn, r, sb);
		this.setCurrentSearchEntryLibrary('bpmn2', 'bpmn2Events');
		this.addBPMN2EventsPalette(gn, r, sb);
		this.setCurrentSearchEntryLibrary('bpmn2', 'bpmn2Gateways');
		this.addBPMN2GatewaysPalette(gn, r, sb);
		this.setCurrentSearchEntryLibrary();
	};

	Sidebar.prototype.addBPMN2GeneralPalette = function(gn, r, sb)
	{
		var dt = 'bpmn business process model notation ';
		var w = 50;
		var h = 50;
		var ew = 160;
		var eh = 0;
		var s1 = 'shape=mxgraph.bpmn.data;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;size=15;html=1;';
		var s2 = 'swimlane;html=1;startSize=20;fontStyle=0;collapsible=0;';
		var s3 = 'shape=mxgraph.bpmn.conversation;perimeter=hexagonPerimeter2;whiteSpace=wrap;html=1;aspect=fixed;bpmnConversationType=';
		var s4 = 'edgeStyle=elbowEdgeStyle;fontSize=12;html=1;endArrow=blockThin;endFill=1;';
		var s5 = 'edgeStyle=elbowEdgeStyle;fontSize=12;html=1;endFill=0;startFill=0;endSize=6;startSize=6;dashed=1;dashPattern=1 4;endArrow=';
		
		var fns =
		[
			this.createVertexTemplateEntry(s1, 40, 60, '', 'Data Object', null, null, dt + 'data object'),
			this.createVertexTemplateEntry(s1 + 'bpmnTransferType=none;isCollection=1;', 40, 60, '', 'Data Object Collection', null, null, dt + 'data object collection'),
			this.createVertexTemplateEntry(s1 + 'bpmnTransferType=input;', 40, 60, '', 'Data Input', null, null, dt + 'data input'),
			this.createVertexTemplateEntry(s1 + 'bpmnTransferType=input;isCollection=1;', 40, 60, '', 'Data Input Collection', null, null, dt + 'data input collection'),
			this.createVertexTemplateEntry(s1 + 'bpmnTransferType=output;', 40, 60, '', 'Data Output', null, null, dt + 'data output'),
			this.createVertexTemplateEntry(s1 + 'bpmnTransferType=output;isCollection=1;', 40, 60, '', 'Data Output Collection', null, null, dt + 'data output collection'),
			this.createVertexTemplateEntry('shape=datastore;html=1;labelPosition=center;verticalLabelPosition=bottom;align=center;verticalAlign=top;', 100, 100, '', 'Data Store', null, null, dt + 'data store'),
			this.createVertexTemplateEntry('points=[[0.25,0,0],[0.5,0,0],[0.75,0,0],[1,0.25,0],[1,0.5,0],[1,0.75,0],[0.75,1,0],[0.5,1,0],[0.25,1,0],[0,0.75,0],[0,0.5,0],[0,0.25,0]];rounded=1;dashed=1;dashPattern=5 2 1 2;labelPosition=center;verticalLabelPosition=middle;align=center;verticalAlign=middle;fontSize=8;html=1;whiteSpace=wrap;', 140, 80, '', 'Data Object', null, null, dt + 'data object'),
			this.createVertexTemplateEntry('text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;', 80, 30, 'Text', 'Text Annotation', null, null, dt + 'text annotation label'),
			this.createVertexTemplateEntry(s2 + 'horizontal=0;swimlaneLine=0;fillColor=none;whiteSpace=wrap;', 440, 100, '', 'Horizontal Lane', null, null, dt + 'horizontal lane'),
			this.createVertexTemplateEntry(s2 + 'horizontal=1;swimlaneLine=0;fillColor=none;whiteSpace=wrap;', 440, 100, '', 'Vertical Lane', null, null, dt + 'vertical lane'),
			this.createVertexTemplateEntry(s2 + 'horizontal=0;swimlaneLine=1;swimlaneFillColor=#ffffff;strokeWidth=2;whiteSpace=wrap;', 440, 100, '', 'Horizontal Lane', null, null, dt + 'horizontal lane'),
			this.createVertexTemplateEntry('shape=mxgraph.bpmn.swimlane;html=1;startSize=20;horizontal=0;swimlaneLine=1;collapsible=0;fontStyle=0;swimlaneFillColor=#ffffff;strokeWidth=2;isCollection=1;whiteSpace=wrap;', 440, 100, '', 'Horizontal Lane', null, null, dt + 'horizontal lane'),
			this.createVertexTemplateEntry(s2 + 'horizontal=1;swimlaneLine=1;strokeWidth=2;swimlaneFillColor=#ffffff;whiteSpace=wrap;', 220, 100, '', 'Vertical Lane', null, null, dt + 'vertical lane'),
			this.createVertexTemplateEntry('shape=mxgraph.bpmn.swimlane;html=1;startSize=20;horizontal=1;swimlaneLine=1;collapsible=0;fontStyle=0;strokeWidth=2;swimlaneFillColor=#ffffff;isCollection=1;whiteSpace=wrap;', 220, 100, '', 'Vertical Lane', null, null, dt + 'vertical lane'),
			
			this.createVertexTemplateEntry(s3 + 'conv;', 70, 60, '', 'Conversation', null, null, dt + 'conversation'),
			this.createVertexTemplateEntry(s3 + 'conv;isLoopSub=1;', 70, 60, '', 'Sub-Conversation', null, null, dt + 'sub conversation'),
			this.createVertexTemplateEntry(s3 + 'call;', 70, 60, '', 'Call Conversation', null, null, dt + 'call conversation'),
			this.createVertexTemplateEntry(s3 + 'call;isLoopSub=1;', 70, 60, '', 'Call Sub-Conversation', null, null, dt + 'call sub conversation'),

			this.createVertexTemplateEntry('html=1;shape=mxgraph.flowchart.annotation_2;align=left;labelPosition=right;', 50, 100, '', 'Annotation', null, null, this.getTagsForStencil('bpmn', 'annotation_1', 'bpmn business process model ').join(' ')),
	 		this.addDataEntry('crossfunctional cross-functional cross functional flowchart swimlane table', 400, 400, 'Cross-Functional Flowchart',
				'7Zldb5swFIZ/DZeb+EjS7nIhTXexSVO2P+DCabDq+CD75Ku/fnZskipAi6JmUxkSkezDscHnfWK9MkGSrnb3ipXFD8xBBMldkKQKkVxrtUtBiCAOeR4ksyCOQ/ML4nnL3ehwNyyZAkldBsRuwIaJNbiIebjWn+ZrmRFHyWzyXOA2K5gil6xpL3yyLlhpm8QebGiaFVzk39ke11RFq95Uk5nhF3+2+aPQJqMQrNT8MHRmIwqytdJ8AwvQLtFGYVcymfvOI8pqkmhS9f0L+dVvQBHsWgtyCPlq3AOugNTepGx5ToXLGIWuaGEBfFnQWZBpF1gex57qaxq+xM3lTmrl/poRKhOKXq/tArdmsQUq/mwWbFRx1dBbvhJMwjdg+VloivnehwhL3xLwSFUeKXyCFIV5fDLjsgDFrUwPSISrShC/ftvOFZa/mVoCvZTiWHrT50JU80mUlocSuaRDvcZTc5kKpuHncTA260tNPzr1zWXTFaUozasxfpALmKYt6Ovh04mYuJmYfQWGG/EWQFH8DgCNagD9LJiGZoA8CZ05ORe0DZEMpYTM/+fdyLr0/1CvpFmvXateR2k66+VnX9gyyKWAS+ZjgkBJRkaCtcx1DYPjq3ciY9xKRjyQ0Y2MaNJPNCataCQDGt3QiG/7icZNqyFp2DUGQ/IhDEnTNnY9R3JbI+j995T63tEGyxt7yt+V6eZ/9CFfBh4u46Gv7iMKByIuI6KvpiOKakRUrqPBkA6u40O4jiZYr+c6ovrB5bCpVAVuOeHst++I6merAxHdiOit86iflg5IdEOiJ9bDdE/f0lz6y09tfwA='),
			this.addDataEntry('container swimlane pool horizontal', 480, 380, 'Horizontal Pool 1',
				'zZTPboMwDMafJvf8YdPOpVsvrVSJJ4jAaqIFgkI6oE8/Q0KrdmXjsE09RLI/f7aT3yFEpGW3cbJWO1uAIeKViNRZ60NUdikYQzjVBRFrwjnFQ/jbTJWNVVpLB5Vf0sBDw4c0RwjK3loTxMb3JopNq0sjK8xWypd4yzXDMFfaFFvZ2+Owq/Eyf5+ylYNGn2A/XYTdSDvZoUqHedbpk628nKbiHOczdGLOrx3ZsCL2tUp7yGqZD74WAaIWHwPOQzcLZJQijQ3YErzr0dLqwqvgSF4CNKpAH1RsE5MomyAczr0XvhhExPdxiy+4twNVTtlC5N/AiVwWMeD3GfSxGl/6ExLGfwFJMoeEPxISlvwnk6c5JuKRmPDnP2SC6eUXHGtXn+Qn'),
			this.addDataEntry('container swimlane pool horizontal', 480, 360, 'Horizontal Pool 2',
				'zZRNboMwEIVP472xadR1SJtNIkXiBBaMYqsGI+MEyOk7YCcRCVQs2ioLpJk37/nnEzLhSdFurajk3uSgCf8gPLHGOF8VbQJaE0ZVTviGMEbxI+xzZhoNU1oJC6VbEmA+cBb6BF45GKO9WLtOB7FuVKFFid1augJPuYmwzKTS+U505tTvVTuRfV27tYVaXeBwPUj0IO1Fiyrt1zNWXUzphA4CrmNdik7s2diR9lsEWyOVg7QSWe9rECBq4TJgHbSzQAYp0NiCKcDZDi2Nyp30jvjdQ6MS1FGGGF8FUdReON6yd75YBMTTuPkT7l1PldFoIfIf4AQuixiwaQYhEP6ZEZLVBJKI/QKSeA4Je0Uk3cPN/wXR2xwi/sKIWPyHiLC9v5HDbPSEfgM='),
			this.createVertexTemplateEntry('swimlane;startSize=20;horizontal=0;html=1;whiteSpace=wrap;', 320, 120, 'Lane', 'Horizontal Swimlane', null, null, 'swimlane lane pool'),
			this.addDataEntry('container swimlane pool horizontal', 360, 480, 'Vertical Pool 1',
				'xZTBboMwDIafJvfgsGrn0q2XVqrUJ4jAaqKFBoW0wJ5+hqTr1oLEYRoHpPhzLPx/hzCRle3WyUrtbYGGiTcmMmetD6eyzdAYBlwXTGwYAKePwftENxm6vJIOz37OAISBqzQXDORgrQmw9p2JsG50aeSZqrXyJW25SeiYK22Knezspf9X7WX+cavWDmv9iYfbIskD2suWKCdKY84fqUE19KBR2uOxknlPGjJDLG6JzmM7mXRAMeYWbYnedXSl0YVX4YZYBRtcoT6pOJa+RijrAE7fs3dxdIjuxj2KJ4+7XhfwZKbLJw2zIsN45C52Y7AfBhIYM7D6AwPplAFYwkD7EHcJIy9TRsSCRiD9PyNU3l+yoffrofsC'),
			this.addDataEntry('container swimlane pool vertical', 380, 480, 'Vertical Pool 2',
				'xZTfboMgFIefhnv+uGbXtVtv2qSJT0D0pJChGKRT+/Q7Cs5trYk3XS9MON/hJ/CFQERadnsna3W0BRgi3ohInbU+jMouBWMIp7ogYkc4p/gR/r7QZWOX1tJB5dcEeAh8SnOBQE7WmgAb35sIm1aXRlZYbZUvcZc7hsNcaVMcZG8vw1qNl/nHVG0dNPoKp2kj7A86yg4pRYox5zNsYM0HoKzTV1t5aeKMGWTDEvFvrdIeslrmQ7BFgcjiYcB56BaFjCja2IMtwbsep7S68CrMEK9BGlWgzyrGkgnKJoDzd3b2i4Oo+L5ucaP7MFjllK1UfmNr1ZH5/SPHQLwiPw0w/igDyZIB/kQDLPlPBS9LCsQzL8HmgQqwnJ+0sffrxfsC'),
			this.createVertexTemplateEntry('swimlane;startSize=20;whiteSpace=wrap;html=1;', 120, 320, 'Lane', 'Vertical Swimlane', null, null, 'swimlane lane pool'),
			this.createVertexTemplateEntry('points=[[0.25,0,0],[0.5,0,0],[0.75,0,0],[1,0.25,0],[1,0.5,0],[1,0.75,0],[0.75,1,0],[0.5,1,0],[0.25,1,0],[0,0.75,0],[0,0.5,0],[0,0.25,0]];rounded=1;arcSize=10;dashed=1;strokeColor=#000000;fillColor=none;gradientColor=none;dashPattern=8 3 1 3;strokeWidth=2;whiteSpace=wrap;html=1;',
				200, 200, '', 'Group', null, null, this.getTagsForStencil('bpmn', 'group', 'bpmn business process model ').join(' ')),
				
			this.createEdgeTemplateEntry(s5 + 'none;startArrow=none;', ew, eh, '', 'Association', null, dt + 'association'),
			this.createEdgeTemplateEntry(s5 + 'openThin;startArrow=none;', ew, eh, '', 'Directional / Directed Data Association', null, dt + 'directed data directional association'),
			this.createEdgeTemplateEntry(s5 + 'openThin;startArrow=openThin;', ew, eh, '', 'Bi-Directional Association', null, dt + 'bi directional bidirectional association'),
			this.createEdgeTemplateEntry(s5 + 'none;startArrow=none;', ew, eh, '', 'Data Association', null, dt + 'data association'),
			this.createEdgeTemplateEntry('edgeStyle=elbowEdgeStyle;fontSize=12;html=1;shape=link;', ew, eh, '', 'Conversation Link', null, dt + 'conversation link'),

			this.createEdgeTemplateEntry(s4 + '', ew, eh, '', 'Sequence Flow', null, dt + 'sequence flow'),
			this.createEdgeTemplateEntry(s4 + 'startArrow=diamondThin;startFill=0;endSize=6;startSize=10;', ew, eh, '', 'Conditional Sequence Flow', null, dt + 'conditional sequence flow'),
			this.createEdgeTemplateEntry(s4 + 'startArrow=dash;startFill=0;endSize=6;startSize=6;', ew, eh, '', 'Default Sequence Flow', null, dt + 'default sequence flow'),
			this.createEdgeTemplateEntry('dashed=1;dashPattern=8 4;endArrow=blockThin;endFill=1;startArrow=oval;startFill=0;endSize=6;startSize=4;html=1;', ew, eh, '', 'Message Flow', null, dt + 'message flow'),
			
			this.addEntry('edge shape symbol message mail email initiating message flow with decorator', mxUtils.bind(this, function()
			{
				var edge = new mxCell('', new mxGeometry(0, 0, 0, 0), 'endArrow=blockThin;html=1;labelPosition=left;verticalLabelPosition=middle;align=right;verticalAlign=middle;dashed=1;dashPattern=8 4;endFill=0;startArrow=oval;startFill=0;endSize=6;startSize=4;');
				edge.geometry.setTerminalPoint(new mxPoint(0, 0), true);
				edge.geometry.setTerminalPoint(new mxPoint(ew, eh), false);
				edge.geometry.relative = true;
				edge.edge = true;
				
		    	var cell = new mxCell('', new mxGeometry(0, 0, 24, 16), 'shape=message;html=1;outlineConnect=0;labelPosition=left;verticalLabelPosition=middle;align=right;verticalAlign=middle;spacingRight=5;labelBackgroundColor=#ffffff;');
		    	cell.geometry.relative = true;
		    	cell.vertex = true;
		    	cell.geometry.offset = new mxPoint(8, -8);
		    	edge.insert(cell);

				return this.createEdgeTemplateFromCells([edge], ew, eh, 'Initiating Message Flow with Decorator');
			})),
					
			this.addEntry('edge shape symbol message mail email non initiating message flow with decorator', mxUtils.bind(this, function()
			{
				var edge = new mxCell('', new mxGeometry(0, 0, 0, 0), 'endArrow=blockThin;html=1;labelPosition=left;verticalLabelPosition=middle;align=right;verticalAlign=middle;dashed=1;dashPattern=8 4;endFill=0;startArrow=oval;startFill=0;endSize=6;startSize=4;');
				edge.geometry.setTerminalPoint(new mxPoint(0, 0), true);
				edge.geometry.setTerminalPoint(new mxPoint(ew, eh), false);
				edge.geometry.relative = true;
				edge.edge = true;
				
		    	var cell = new mxCell('', new mxGeometry(0, 0, 24, 16), 'shape=message;html=1;outlineConnect=0;labelPosition=left;verticalLabelPosition=middle;align=right;verticalAlign=middle;spacingRight=5;labelBackgroundColor=#ffffff;fillColor=#C0C0C0;');
		    	cell.geometry.relative = true;
		    	cell.vertex = true;
		    	cell.geometry.offset = new mxPoint(8, -8);
		    	edge.insert(cell);

				return this.createEdgeTemplateFromCells([edge], ew, eh, 'Non-Initiating Message Flow with Decorator');
			}))
		];
			
		this.addPalette('bpmn2General', 'BPMN 2.0 \ General', false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addBPMN2TasksPalette = function(gn, r, sb)
	{
		var dt = 'bpmn business process model notation task ';
		var pts = 'points=[[0.25,0,0],[0.5,0,0],[0.75,0,0],[1,0.25,0],[1,0.5,0],[1,0.75,0],[0.75,1,0],[0.5,1,0],[0.25,1,0],[0,0.75,0],[0,0.5,0],[0,0.25,0]];';
		var s1 = pts + 'shape=mxgraph.bpmn.task;whiteSpace=wrap;rectStyle=rounded;size=10;html=1;container=1;expand=0;collapsible=0;taskMarker=abstract;';
		var s2 = pts + 'shape=mxgraph.bpmn.task;whiteSpace=wrap;rectStyle=rounded;size=10;html=1;container=1;expand=0;collapsible=0;taskMarker=';
		var s3 = pts + 'shape=mxgraph.bpmn.task;whiteSpace=wrap;rectStyle=rounded;size=10;html=1;container=1;expand=0;collapsible=0;taskMarker=abstract;bpmnShapeType=subprocess;isLoopSub=1;outline=';
		var s4 = pts + 'shape=mxgraph.bpmn.task;whiteSpace=wrap;rectStyle=rounded;size=10;html=1;container=1;expand=0;collapsible=0;bpmnShapeType=call;';
		
		var fns =
		[
			this.createVertexTemplateEntry(s1 + '', 120, 80, '', 'Generic Task', null, null, dt + 'generic'),
			this.createVertexTemplateEntry(s1 + 'isLoopStandard=1;', 120, 80, '', 'Standard Loop', null, null, dt + 'standard loop'),
			this.createVertexTemplateEntry(s1 + 'isLoopStandard=1;isLoopSub=1;', 120, 80, '', 'Standard Loop', null, null, dt + 'standard loop'),
			this.createVertexTemplateEntry(s1 + 'isLoopMultiParallel=1;', 120, 80, '', 'Multi-Instance, Parallel', null, null, dt + 'multi instance parallel'),
			this.createVertexTemplateEntry(s1 + 'isLoopSub=1;isLoopMultiParallel=1;', 120, 80, '', 'Multi-Instance, Parallel', null, null, dt + 'multi instance parallel'),
			this.createVertexTemplateEntry(s1 + 'isLoopMultiSeq=1;', 120, 80, '', 'Multi-Instance, Sequential', null, null, dt + 'multi instance sequential'),
			this.createVertexTemplateEntry(s1 + 'isLoopSub=1;isLoopMultiSeq=1;', 120, 80, '', 'Multi-Instance, Sequential', null, null, dt + 'multi instance sequential'),
			this.createVertexTemplateEntry(s1 + 'isLoopComp=1;', 120, 80, '', 'Compensation', null, null, dt + 'compensation'),
			this.createVertexTemplateEntry(s1 + 'isLoopSub=1;isLoopComp=1;', 120, 80, '', 'Compensation', null, null, dt + 'compensation'),
			this.createVertexTemplateEntry(s1 + 'isLoopComp=1;isLoopStandard=1;', 120, 80, '', 'Loop and Compensation', null, null, dt + 'loop compensation'),
			this.createVertexTemplateEntry(s1 + 'isLoopComp=1;isLoopStandard=1;isLoopSub=1;', 120, 80, '', 'Loop and Compensation', null, null, dt + 'loop compensation'),
			this.createVertexTemplateEntry(s1 + 'isAdHoc=1;isLoopSub=1;', 120, 80, '', 'Ad Hoc, Collapsed', null, null, dt + 'ad hoc collapsed'),
			this.createVertexTemplateEntry(s1 + 'isAdHoc=1;', 120, 80, '', 'Ad Hoc, Expanded', null, null, dt + 'ad hoc expanded'),
			
			this.createVertexTemplateEntry(s2 + 'service;', 120, 80, '', 'Service', null, null, dt + 'service'),
			this.createVertexTemplateEntry(s2 + 'send;', 120, 80, '', 'Send', null, null, dt + 'send'),
			this.createVertexTemplateEntry(s2 + 'receive;', 120, 80, '', 'Receive', null, null, dt + 'receive'),
			this.createVertexTemplateEntry(s2 + 'user;', 120, 80, '', 'User', null, null, dt + 'user'),
			this.createVertexTemplateEntry(s2 + 'manual;', 120, 80, '', 'Manual', null, null, dt + 'manual'),
			this.createVertexTemplateEntry(s2 + 'businessRule;', 120, 80, '', 'Business Rule', null, null, dt + 'business rule'),
			this.createVertexTemplateEntry(s2 + 'script;', 120, 80, '', 'Script', null, null, dt + 'script'),
			this.createVertexTemplateEntry(s1 + 'isLoopSub=1;', 120, 80, '', 'Sub-Process, Collapsed', null, null, dt + 'sub process subprocess collapsed'),
						
			this.createVertexTemplateEntry(s2 + 'abstract;bpmnShapeType=transaction;isLoopSub=1;', 120, 80, '', 'Transaction, Collapsed', null, null, dt + 'transaction collapsed'),
			this.createVertexTemplateEntry(s2 + 'abstract;bpmnShapeType=transaction;', 120, 80, '', 'Transaction, Expanded', null, null, dt + 'transaction expanded'),
			
			this.createVertexTemplateEntry(s3 + 'eventNonint;symbol=message;', 120, 80, '', 'Message-Event Sub-Process, Non-interrupting, Collapsed', null, null, dt + 'non interrupting message event sub process collapsed'),
			this.createVertexTemplateEntry(s3 + 'eventInt;symbol=message;', 120, 80, '', 'Message-Event Sub-Process, Interrupting, Collapsed', null, null, dt + 'interrupting message event sub process collapsed'),
			this.createVertexTemplateEntry(s3 + 'eventNonint;symbol=timer;', 120, 80, '', 'Timer-Event Sub-Process, Non-interrupting, Collapsed', null, null, dt + 'non interrupting timer event sub process collapsed'),
			this.createVertexTemplateEntry(s3 + 'eventInt;symbol=timer;', 120, 80, '', 'Timer-Event Sub-Process, Interrupting, Collapsed', null, null, dt + 'interrupting timer event sub process collapsed'),
			this.createVertexTemplateEntry(s3 + 'eventNonint;symbol=conditional;', 120, 80, '', 'Conditional-Event Sub-Process, Non-interrupting, Collapsed', null, null, dt + 'non interrupting conditional event sub process collapsed'),
			this.createVertexTemplateEntry(s3 + 'eventInt;symbol=conditional;', 120, 80, '', 'Conditional-Event Sub-Process, Interrupting, Collapsed', null, null, dt + 'interrupting conditional event sub process collapsed'),
			this.createVertexTemplateEntry(s3 + 'eventNonint;symbol=signal;', 120, 80, '', 'Signal-Event Sub-Process, Non-interrupting, Collapsed', null, null, dt + 'non interrupting signal event sub process collapsed'),
			this.createVertexTemplateEntry(s3 + 'eventInt;symbol=signal;', 120, 80, '', 'Signal-Event Sub-Process, Interrupting, Collapsed', null, null, dt + 'interrupting signal event sub process collapsed'),
			this.createVertexTemplateEntry(s3 + 'eventNonint;symbol=multiple;', 120, 80, '', 'Multiple-Event Sub-Process, Non-interrupting, Collapsed', null, null, dt + 'non interrupting multiple event sub process collapsed'),
			this.createVertexTemplateEntry(s3 + 'eventInt;symbol=multiple;', 120, 80, '', 'Multiple-Event Sub-Process, Interrupting, Collapsed', null, null, dt + 'interrupting multiple event sub process collapsed'),
			this.createVertexTemplateEntry(s3 + 'eventNonint;symbol=parallelMultiple;', 120, 80, '', 'Parallel Multiple Event Sub-Process, Non-interrupting, Collapsed', null, null, dt + 'non interrupting parallel multiple event sub process collapsed'),
			this.createVertexTemplateEntry(s3 + 'eventInt;symbol=parallelMultiple;', 120, 80, '', 'Parallel Multiple Event Sub-Process, Interrupting , Collapsed', null, null, dt + 'interrupting parallel multiple event sub process collapsed'),
			this.createVertexTemplateEntry(s3 + 'eventNonint;symbol=escalation;', 120, 80, '', 'Escalation-Event Sub-Process, Non-interrupting, Collapsed', null, null, dt + 'non interrupting escalation event sub process collapsed'),
			this.createVertexTemplateEntry(s3 + 'eventInt;symbol=escalation;', 120, 80, '', 'Escalation-Event Sub-Process, Interrupting, Collapsed', null, null, dt + 'interrupting escalation event sub process collapsed'),
			this.createVertexTemplateEntry(s3 + 'eventInt;symbol=error;', 120, 80, '', 'Error-Event Sub-Process, Interrupting, Collapsed', null, null, dt + 'interrupting error event sub process collapsed'),
			this.createVertexTemplateEntry(s3 + 'eventInt;symbol=compensation;', 120, 80, '', 'Compensation-Event Sub-Process, Interrupting, Collapsed', null, null, dt + 'interrupting compensation event sub process collapsed'),
			this.createVertexTemplateEntry('points=[[0.25,0,0],[0.5,0,0],[0.75,0,0],[1,0.25,0],[1,0.5,0],[1,0.75,0],[0.75,1,0],[0.5,1,0],[0.25,1,0],[0,0.75,0],[0,0.5,0],[0,0.25,0]];shape=mxgraph.bpmn.task;arcSize=10;taskMarker=abstract;outline=none;symbol=general;bpmnShapeType=subprocess;isLoopSub=0;verticalAlign=top;align=left;spacingLeft=5;html=1;whiteSpace=wrap;', 180, 100, '', 'Event Sub-Process, Expanded', null, null, dt + 'event sub process expanded'),

			this.createVertexTemplateEntry(s4, 120, 80, '', 'Call Activity', null, null, dt + 'call activity'),
			this.createVertexTemplateEntry(s4 + 'taskMarker=user;', 120, 80, '', 'User Call Activity', null, null, dt + 'user call activity'),
			this.createVertexTemplateEntry(s4 + 'taskMarker=manual;', 120, 80, '', 'Manual Call Activity', null, null, dt + 'manual call activity'),
			this.createVertexTemplateEntry(s4 + 'taskMarker=businessRule;', 120, 80, '', 'Business Rule Call Activity', null, null, dt + 'business rule call activity'),
			this.createVertexTemplateEntry(s4 + 'taskMarker=script;', 120, 80, '', 'Script Call Activity', null, null, dt + 'script call activity'),
			this.createVertexTemplateEntry(s4 + 'isLoopSub=1;', 120, 80, '', 'Call Activity, Collapsed', null, null, dt + 'call activity collapsed'),
			this.createVertexTemplateEntry(s4 + 'verticalAlign=top;align=left;spacingLeft=5;', 180, 100, '', 'Call Activity, Expanded', null, null, dt + 'call activity expanded')
		];
			
		this.addPalette('bpmn2Tasks', 'BPMN 2.0 \ Tasks', false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addBPMN2ChoreographiesPalette = function(gn, r, sb)
	{
		var dt = 'bpmn business process model notation choreography ';
		
		var fns =
		[
			this.addEntry(dt + 'choreography task', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 120, 100), 
				'rounded=1;whiteSpace=wrap;html=1;container=1;collapsible=0;absoluteArcSize=1;arcSize=20;childLayout=stackLayout;horizontal=1;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;');
		    	bg.vertex = true;
		    	
			    var cell1 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;bottomRightStyle=square;bottomLeftStyle=square;part=1;');
			    cell1.vertex = true;
		    	bg.insert(cell1);

			    var cell2 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 60), 
			    		'shape=mxgraph.bpmn.task;part=1;taskMarker=abstract;connectable=0;whiteSpace=wrap;html=1;');
			    cell2.vertex = true;
		    	bg.insert(cell2);

			    var cell3 = new mxCell('', 
			    		new mxGeometry(0, 1, 20, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;topRightStyle=square;topLeftStyle=square;fillColor=#C0C0C0;part=1;');
			    cell3.vertex = true;
			    cell3.geometry.relative = false;
		    	bg.insert(cell3);

			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Choreography Task');
			}),

			this.addEntry(dt + 'choreography task loop', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 120, 100), 
				'rounded=1;whiteSpace=wrap;html=1;container=1;collapsible=0;absoluteArcSize=1;arcSize=20;childLayout=stackLayout;horizontal=1;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;');
		    	bg.vertex = true;
		    	
			    var cell1 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;bottomRightStyle=square;bottomLeftStyle=square;part=1;');
			    cell1.vertex = true;
		    	bg.insert(cell1);

			    var cell2 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 60), 
			    		'shape=mxgraph.bpmn.task;arcSize=0;taskMarker=abstract;part=1;isLoopStandard=1;connectable=0;whiteSpace=wrap;html=1;');
			    cell2.vertex = true;
		    	bg.insert(cell2);

			    var cell3 = new mxCell('', 
			    		new mxGeometry(0, 1, 20, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;topRightStyle=square;topLeftStyle=square;fillColor=#C0C0C0;part=1;');
			    cell3.vertex = true;
			    cell3.geometry.relative = false;
		    	bg.insert(cell3);

			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Choreography Task, Loop');
			}),

			this.addEntry(dt + 'choreography task sequential multi instance', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 120, 100), 
				'rounded=1;whiteSpace=wrap;html=1;container=1;collapsible=0;absoluteArcSize=1;arcSize=20;childLayout=stackLayout;horizontal=1;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;');
		    	bg.vertex = true;
		    	
			    var cell1 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;bottomRightStyle=square;bottomLeftStyle=square;part=1;');
			    cell1.vertex = true;
		    	bg.insert(cell1);

			    var cell2 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 60), 
			    		'shape=mxgraph.bpmn.task;arcSize=0;taskMarker=abstract;part=1;isLoopMultiSeq=1;connectable=0;whiteSpace=wrap;html=1;');
			    cell2.vertex = true;
		    	bg.insert(cell2);

			    var cell3 = new mxCell('', 
			    		new mxGeometry(0, 1, 20, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;topRightStyle=square;topLeftStyle=square;fillColor=#C0C0C0;part=1;');
			    cell3.vertex = true;
			    cell3.geometry.relative = false;
		    	bg.insert(cell3);

			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Choreography Task, Sequential Multi Instance');
			}),

			this.addEntry(dt + 'choreography task parallel multi instance', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 120, 100), 
				'rounded=1;whiteSpace=wrap;html=1;container=1;collapsible=0;absoluteArcSize=1;arcSize=20;childLayout=stackLayout;horizontal=1;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;');
		    	bg.vertex = true;
		    	
			    var cell1 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;bottomRightStyle=square;bottomLeftStyle=square;part=1;');
			    cell1.vertex = true;
		    	bg.insert(cell1);

			    var cell2 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 60), 
			    		'shape=mxgraph.bpmn.task;arcSize=0;taskMarker=abstract;part=1;isLoopMultiParallel=1;connectable=0;whiteSpace=wrap;html=1;');
			    cell2.vertex = true;
		    	bg.insert(cell2);

			    var cell3 = new mxCell('', 
			    		new mxGeometry(0, 1, 20, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;topRightStyle=square;topLeftStyle=square;fillColor=#C0C0C0;part=1;');
			    cell3.vertex = true;
			    cell3.geometry.relative = false;
		    	bg.insert(cell3);

			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Choreography Task, Parallel Multi Instance');
			}),

			this.addEntry(dt + 'sub choreography collapsed', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 120, 100), 
				'rounded=1;whiteSpace=wrap;html=1;container=1;collapsible=0;absoluteArcSize=1;arcSize=20;childLayout=stackLayout;horizontal=1;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;');
		    	bg.vertex = true;
		    	
			    var cell1 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;bottomRightStyle=square;bottomLeftStyle=square;part=1;');
			    cell1.vertex = true;
		    	bg.insert(cell1);

			    var cell2 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 60), 
			    		'shape=mxgraph.bpmn.task;arcSize=0;taskMarker=abstract;part=1;isLoopSub=1;connectable=0;whiteSpace=wrap;html=1;');
			    cell2.vertex = true;
		    	bg.insert(cell2);

			    var cell3 = new mxCell('', 
			    		new mxGeometry(0, 1, 20, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;topRightStyle=square;topLeftStyle=square;fillColor=#C0C0C0;part=1;');
			    cell3.vertex = true;
			    cell3.geometry.relative = false;
		    	bg.insert(cell3);

			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Sub-Choreography, Collapsed');
			}),

			this.addEntry(dt + 'sub choreography loop collapsed', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 120, 100), 
				'rounded=1;whiteSpace=wrap;html=1;container=1;collapsible=0;absoluteArcSize=1;arcSize=20;childLayout=stackLayout;horizontal=1;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;');
		    	bg.vertex = true;
		    	
			    var cell1 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;bottomRightStyle=square;bottomLeftStyle=square;part=1;');
			    cell1.vertex = true;
		    	bg.insert(cell1);

			    var cell2 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 60), 
			    		'shape=mxgraph.bpmn.task;arcSize=0;taskMarker=abstract;part=1;isLoopSub=1;isLoopStandard=1;connectable=0;whiteSpace=wrap;html=1;');
			    cell2.vertex = true;
		    	bg.insert(cell2);

			    var cell3 = new mxCell('', 
			    		new mxGeometry(0, 1, 20, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;topRightStyle=square;topLeftStyle=square;fillColor=#C0C0C0;part=1;');
			    cell3.vertex = true;
			    cell3.geometry.relative = false;
		    	bg.insert(cell3);

			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Sub-Choreography, Loop, Collapsed');
			}),

			this.addEntry(dt + 'sub choreography sequential multi instance collapsed', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 120, 100), 
				'rounded=1;whiteSpace=wrap;html=1;container=1;collapsible=0;absoluteArcSize=1;arcSize=20;childLayout=stackLayout;horizontal=1;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;');
		    	bg.vertex = true;
		    	
			    var cell1 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;bottomRightStyle=square;bottomLeftStyle=square;part=1;');
			    cell1.vertex = true;
		    	bg.insert(cell1);

			    var cell2 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 60), 
			    		'shape=mxgraph.bpmn.task;arcSize=0;taskMarker=abstract;part=1;isLoopSub=1;isLoopMultiSeq=1;connectable=0;whiteSpace=wrap;html=1;');
			    cell2.vertex = true;
		    	bg.insert(cell2);

			    var cell3 = new mxCell('', 
			    		new mxGeometry(0, 1, 20, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;topRightStyle=square;topLeftStyle=square;fillColor=#C0C0C0;part=1;');
			    cell3.vertex = true;
			    cell3.geometry.relative = false;
		    	bg.insert(cell3);

			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Sub-Choreography, Sequential Multi Instance, Collapsed');
			}),

			this.addEntry(dt + 'sub choreography parallel multi instance collapsed', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 120, 100), 
				'rounded=1;whiteSpace=wrap;html=1;container=1;collapsible=0;absoluteArcSize=1;arcSize=20;childLayout=stackLayout;horizontal=1;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;');
		    	bg.vertex = true;
		    	
			    var cell1 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;bottomRightStyle=square;bottomLeftStyle=square;part=1;');
			    cell1.vertex = true;
		    	bg.insert(cell1);

			    var cell2 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 60), 
			    		'shape=mxgraph.bpmn.task;arcSize=0;taskMarker=abstract;part=1;isLoopSub=1;isLoopMultiParallel=1;connectable=0;whiteSpace=wrap;html=1;');
			    cell2.vertex = true;
		    	bg.insert(cell2);

			    var cell3 = new mxCell('', 
			    		new mxGeometry(0, 1, 20, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;topRightStyle=square;topLeftStyle=square;fillColor=#C0C0C0;part=1;');
			    cell3.vertex = true;
			    cell3.geometry.relative = false;
		    	bg.insert(cell3);

			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Sub-Choreography, Parallel Multi Instance, Collapsed');
			}),

			this.addEntry(dt + 'sub choreography expanded', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 400, 200), 
				'rounded=1;whiteSpace=wrap;html=1;container=1;collapsible=0;absoluteArcSize=1;arcSize=20;childLayout=stackLayout;horizontal=1;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;');
		    	bg.vertex = true;
		    	
			    var cell1 = new mxCell('', 
			    		new mxGeometry(0, 0, 400, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;bottomRightStyle=square;bottomLeftStyle=square;part=1;');
			    cell1.vertex = true;
		    	bg.insert(cell1);

			    var cell2 = new mxCell('', 
			    		new mxGeometry(0, 0, 400, 160), 
			    		'shape=mxgraph.bpmn.task;arcSize=0;part=1;taskMarker=abstract;verticalAlign=top;align=left;spacingLeft=5;connectable=0;whiteSpace=wrap;html=1;');
			    cell2.vertex = true;
		    	bg.insert(cell2);

			    var cell3 = new mxCell('', 
			    		new mxGeometry(0, 1, 400, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;topRightStyle=square;topLeftStyle=square;fillColor=#C0C0C0;part=1;');
			    cell3.vertex = true;
			    cell3.geometry.relative = false;
		    	bg.insert(cell3);

			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Sub-Choreography, Expanded');
			}),

			this.addEntry(dt + 'call choreography activity calling global task', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 120, 100), 
//				'rounded=1;whiteSpace=wrap;html=1;container=1;collapsible=0;absoluteArcSize=1;');
				'rounded=1;whiteSpace=wrap;html=1;container=1;collapsible=0;absoluteArcSize=1;arcSize=20;childLayout=stackLayout;horizontal=1;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;');
		    	bg.vertex = true;
		    	
			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'bzzzzt');
			}),

			this.addEntry(dt + 'call choreography activity calling global task', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 120, 100), 
				'rounded=1;whiteSpace=wrap;html=1;container=1;collapsible=0;absoluteArcSize=1;arcSize=20;childLayout=stackLayout;horizontal=1;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;strokeWidth=8;');
		    	bg.vertex = true;
		    	
			    var cell1 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;bottomRightStyle=square;bottomLeftStyle=square;part=1;');
			    cell1.vertex = true;
		    	bg.insert(cell1);

			    var cell2 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 60), 
			    		'shape=mxgraph.bpmn.task;arcSize=0;part=1;taskMarker=abstract;connectable=0;whiteSpace=wrap;html=1;');
			    cell2.vertex = true;
		    	bg.insert(cell2);

			    var cell3 = new mxCell('', 
			    		new mxGeometry(0, 1, 20, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;topRightStyle=square;topLeftStyle=square;fillColor=#C0C0C0;part=1;');
			    cell3.vertex = true;
			    cell3.geometry.relative = false;
		    	bg.insert(cell3);

			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Call Choreography calling Global');
			}),

			this.addEntry(dt + 'call choreography activity calling global task loop', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 120, 100), 
				'rounded=1;whiteSpace=wrap;html=1;container=1;collapsible=0;absoluteArcSize=1;arcSize=20;childLayout=stackLayout;horizontal=1;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;strokeWidth=8;');
		    	bg.vertex = true;
		    	
			    var cell1 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;bottomRightStyle=square;bottomLeftStyle=square;part=1;');
			    cell1.vertex = true;
		    	bg.insert(cell1);

			    var cell2 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 60), 
			    		'shape=mxgraph.bpmn.task;arcSize=0;part=1;taskMarker=abstract;isLoopStandard=1;connectable=0;whiteSpace=wrap;html=1;');
			    cell2.vertex = true;
		    	bg.insert(cell2);

			    var cell3 = new mxCell('', 
			    		new mxGeometry(0, 1, 20, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;topRightStyle=square;topLeftStyle=square;fillColor=#C0C0C0;part=1;');
			    cell3.vertex = true;
			    cell3.geometry.relative = false;
		    	bg.insert(cell3);

			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Call Choreography calling Global, Loop');
			}),

			this.addEntry(dt + 'call choreography activity calling global task sequential multi instance', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 120, 100), 
				'rounded=1;whiteSpace=wrap;html=1;container=1;collapsible=0;absoluteArcSize=1;arcSize=20;childLayout=stackLayout;horizontal=1;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;strokeWidth=8;');
		    	bg.vertex = true;
		    	
			    var cell1 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;bottomRightStyle=square;bottomLeftStyle=square;part=1;');
			    cell1.vertex = true;
		    	bg.insert(cell1);

			    var cell2 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 60), 
			    		'shape=mxgraph.bpmn.task;arcSize=0;part=1;taskMarker=abstract;isLoopMultiSeq=1;connectable=0;whiteSpace=wrap;html=1;');
			    cell2.vertex = true;
		    	bg.insert(cell2);

			    var cell3 = new mxCell('', 
			    		new mxGeometry(0, 1, 20, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;topRightStyle=square;topLeftStyle=square;fillColor=#C0C0C0;part=1;');
			    cell3.vertex = true;
			    cell3.geometry.relative = false;
		    	bg.insert(cell3);

			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Call Choreography calling Global, Sequential Multi Instance');
			}),

			this.addEntry(dt + 'call choreography activity calling global task parallel multi instance', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 120, 100), 
				'rounded=1;whiteSpace=wrap;html=1;container=1;collapsible=0;absoluteArcSize=1;arcSize=20;childLayout=stackLayout;horizontal=1;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;strokeWidth=8;');
		    	bg.vertex = true;
		    	
			    var cell1 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;bottomRightStyle=square;bottomLeftStyle=square;part=1;');
			    cell1.vertex = true;
		    	bg.insert(cell1);

			    var cell2 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 60), 
			    		'shape=mxgraph.bpmn.task;arcSize=0;part=1;taskMarker=abstract;isLoopMultiParallel=1;connectable=0;whiteSpace=wrap;html=1;');
			    cell2.vertex = true;
		    	bg.insert(cell2);

			    var cell3 = new mxCell('', 
			    		new mxGeometry(0, 1, 20, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;topRightStyle=square;topLeftStyle=square;fillColor=#C0C0C0;part=1;');
			    cell3.vertex = true;
			    cell3.geometry.relative = false;
		    	bg.insert(cell3);

			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Call Choreography calling Global, Parallel Multi Instance');
			}),

			this.addEntry(dt + 'call choreography activity calling', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 120, 100), 
				'rounded=1;whiteSpace=wrap;html=1;container=1;collapsible=0;absoluteArcSize=1;arcSize=20;childLayout=stackLayout;horizontal=1;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;strokeWidth=8;');
		    	bg.vertex = true;
		    	
			    var cell1 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;bottomRightStyle=square;bottomLeftStyle=square;part=1;');
			    cell1.vertex = true;
		    	bg.insert(cell1);

			    var cell2 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 60), 
			    		'shape=mxgraph.bpmn.task;arcSize=0;part=1;taskMarker=abstract;isLoopSub=1;connectable=0;whiteSpace=wrap;html=1;');
			    cell2.vertex = true;
		    	bg.insert(cell2);

			    var cell3 = new mxCell('', 
			    		new mxGeometry(0, 1, 20, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;topRightStyle=square;topLeftStyle=square;fillColor=#C0C0C0;part=1;');
			    cell3.vertex = true;
			    cell3.geometry.relative = false;
		    	bg.insert(cell3);

			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Call Choreography calling a Choreography');
			}),

			this.addEntry(dt + 'call choreography activity calling loop', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 120, 100), 
				'rounded=1;whiteSpace=wrap;html=1;container=1;collapsible=0;absoluteArcSize=1;arcSize=20;childLayout=stackLayout;horizontal=1;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;strokeWidth=8;');
		    	bg.vertex = true;
		    	
			    var cell1 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;bottomRightStyle=square;bottomLeftStyle=square;part=1;');
			    cell1.vertex = true;
		    	bg.insert(cell1);

			    var cell2 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 60), 
			    		'shape=mxgraph.bpmn.task;arcSize=0;part=1;taskMarker=abstract;isLoopSub=1;isLoopStandard=1;connectable=0;whiteSpace=wrap;html=1;');
			    cell2.vertex = true;
		    	bg.insert(cell2);

			    var cell3 = new mxCell('', 
			    		new mxGeometry(0, 1, 20, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;topRightStyle=square;topLeftStyle=square;fillColor=#C0C0C0;part=1;');
			    cell3.vertex = true;
			    cell3.geometry.relative = false;
		    	bg.insert(cell3);

			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Call Choreography calling a Choreography, Loop');
			}),

			this.addEntry(dt + 'call choreography activity calling sequential multi instance', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 120, 100), 
				'rounded=1;whiteSpace=wrap;html=1;container=1;collapsible=0;absoluteArcSize=1;arcSize=20;childLayout=stackLayout;horizontal=1;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;strokeWidth=8;');
		    	bg.vertex = true;
		    	
			    var cell1 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;bottomRightStyle=square;bottomLeftStyle=square;part=1;');
			    cell1.vertex = true;
		    	bg.insert(cell1);

			    var cell2 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 60), 
			    		'shape=mxgraph.bpmn.task;arcSize=0;part=1;taskMarker=abstract;isLoopSub=1;isLoopMultiSeq=1;connectable=0;whiteSpace=wrap;html=1;');
			    cell2.vertex = true;
		    	bg.insert(cell2);

			    var cell3 = new mxCell('', 
			    		new mxGeometry(0, 1, 20, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;topRightStyle=square;topLeftStyle=square;fillColor=#C0C0C0;part=1;');
			    cell3.vertex = true;
			    cell3.geometry.relative = false;
		    	bg.insert(cell3);

			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Call Choreography calling a Choreography, Sequential Multi Instance');
			}),

			this.addEntry(dt + 'call choreography activity calling parallel multi instance', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 120, 100), 
				'rounded=1;whiteSpace=wrap;html=1;container=1;collapsible=0;absoluteArcSize=1;arcSize=20;childLayout=stackLayout;horizontal=1;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;strokeWidth=8;');
		    	bg.vertex = true;
		    	
			    var cell1 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;bottomRightStyle=square;bottomLeftStyle=square;part=1;');
			    cell1.vertex = true;
		    	bg.insert(cell1);

			    var cell2 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 60), 
			    		'shape=mxgraph.bpmn.task;arcSize=0;part=1;taskMarker=abstract;isLoopSub=1;isLoopMultiParallel=1;connectable=0;whiteSpace=wrap;html=1;');
			    cell2.vertex = true;
		    	bg.insert(cell2);

			    var cell3 = new mxCell('', 
			    		new mxGeometry(0, 1, 20, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;topRightStyle=square;topLeftStyle=square;fillColor=#C0C0C0;part=1;');
			    cell3.vertex = true;
			    cell3.geometry.relative = false;
		    	bg.insert(cell3);

			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Call Choreography calling a Choreography, Parallel Multi Instance');
			}),
			
			this.addEntry(dt + 'choreography task', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 120, 100), 
				'rounded=1;whiteSpace=wrap;html=1;container=1;collapsible=0;absoluteArcSize=1;arcSize=20;childLayout=stackLayout;horizontal=1;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;');
		    	bg.vertex = true;
		    	
			    var cell1 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;bottomRightStyle=square;bottomLeftStyle=square;fillColor=#C0C0C0;part=1;');
			    cell1.vertex = true;
		    	bg.insert(cell1);

			    var cell2 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 60), 
			    		'shape=mxgraph.bpmn.task;part=1;taskMarker=abstract;connectable=0;whiteSpace=wrap;html=1;');
			    cell2.vertex = true;
		    	bg.insert(cell2);

			    var cell3 = new mxCell('', 
			    		new mxGeometry(0, 1, 20, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;topRightStyle=square;topLeftStyle=square;part=1;');
			    cell3.vertex = true;
			    cell3.geometry.relative = false;
		    	bg.insert(cell3);

			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Choreography Task');
			}),

			this.addEntry(dt + 'choreography task loop', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 120, 100), 
				'rounded=1;whiteSpace=wrap;html=1;container=1;collapsible=0;absoluteArcSize=1;arcSize=20;childLayout=stackLayout;horizontal=1;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;');
		    	bg.vertex = true;
		    	
			    var cell1 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;bottomRightStyle=square;bottomLeftStyle=square;fillColor=#C0C0C0;part=1;');
			    cell1.vertex = true;
		    	bg.insert(cell1);

			    var cell2 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 60), 
			    		'shape=mxgraph.bpmn.task;arcSize=0;taskMarker=abstract;part=1;isLoopStandard=1;connectable=0;whiteSpace=wrap;html=1;');
			    cell2.vertex = true;
		    	bg.insert(cell2);

			    var cell3 = new mxCell('', 
			    		new mxGeometry(0, 1, 20, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;topRightStyle=square;topLeftStyle=square;part=1;');
			    cell3.vertex = true;
			    cell3.geometry.relative = false;
		    	bg.insert(cell3);

			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Choreography Task, Loop');
			}),

			this.addEntry(dt + 'choreography task sequential multi instance', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 120, 100), 
				'rounded=1;whiteSpace=wrap;html=1;container=1;collapsible=0;absoluteArcSize=1;arcSize=20;childLayout=stackLayout;horizontal=1;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;');
		    	bg.vertex = true;
		    	
			    var cell1 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;bottomRightStyle=square;bottomLeftStyle=square;fillColor=#C0C0C0;part=1;');
			    cell1.vertex = true;
		    	bg.insert(cell1);

			    var cell2 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 60), 
			    		'shape=mxgraph.bpmn.task;arcSize=0;taskMarker=abstract;part=1;isLoopMultiSeq=1;connectable=0;whiteSpace=wrap;html=1;');
			    cell2.vertex = true;
		    	bg.insert(cell2);

			    var cell3 = new mxCell('', 
			    		new mxGeometry(0, 1, 20, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;topRightStyle=square;topLeftStyle=square;part=1;');
			    cell3.vertex = true;
			    cell3.geometry.relative = false;
		    	bg.insert(cell3);

			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Choreography Task, Sequential Multi Instance');
			}),

			this.addEntry(dt + 'choreography task parallel multi instance', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 120, 100), 
				'rounded=1;whiteSpace=wrap;html=1;container=1;collapsible=0;absoluteArcSize=1;arcSize=20;childLayout=stackLayout;horizontal=1;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;');
		    	bg.vertex = true;
		    	
			    var cell1 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;bottomRightStyle=square;bottomLeftStyle=square;fillColor=#C0C0C0;part=1;');
			    cell1.vertex = true;
		    	bg.insert(cell1);

			    var cell2 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 60), 
			    		'shape=mxgraph.bpmn.task;arcSize=0;taskMarker=abstract;part=1;isLoopMultiParallel=1;connectable=0;whiteSpace=wrap;html=1;');
			    cell2.vertex = true;
		    	bg.insert(cell2);

			    var cell3 = new mxCell('', 
			    		new mxGeometry(0, 1, 20, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;topRightStyle=square;topLeftStyle=square;part=1;');
			    cell3.vertex = true;
			    cell3.geometry.relative = false;
		    	bg.insert(cell3);

			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Choreography Task, Parallel Multi Instance');
			}),

			this.addEntry(dt + 'sub choreography collapsed', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 120, 100), 
				'rounded=1;whiteSpace=wrap;html=1;container=1;collapsible=0;absoluteArcSize=1;arcSize=20;childLayout=stackLayout;horizontal=1;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;');
		    	bg.vertex = true;
		    	
			    var cell1 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;bottomRightStyle=square;bottomLeftStyle=square;fillColor=#C0C0C0;part=1;');
			    cell1.vertex = true;
		    	bg.insert(cell1);

			    var cell2 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 60), 
			    		'shape=mxgraph.bpmn.task;arcSize=0;taskMarker=abstract;part=1;isLoopSub=1;connectable=0;whiteSpace=wrap;html=1;');
			    cell2.vertex = true;
		    	bg.insert(cell2);

			    var cell3 = new mxCell('', 
			    		new mxGeometry(0, 1, 20, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;topRightStyle=square;topLeftStyle=square;part=1;');
			    cell3.vertex = true;
			    cell3.geometry.relative = false;
		    	bg.insert(cell3);

			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Sub-Choreography, Collapsed');
			}),

			this.addEntry(dt + 'sub choreography loop collapsed', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 120, 100), 
				'rounded=1;whiteSpace=wrap;html=1;container=1;collapsible=0;absoluteArcSize=1;arcSize=20;childLayout=stackLayout;horizontal=1;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;');
		    	bg.vertex = true;
		    	
			    var cell1 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;bottomRightStyle=square;bottomLeftStyle=square;fillColor=#C0C0C0;part=1;');
			    cell1.vertex = true;
		    	bg.insert(cell1);

			    var cell2 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 60), 
			    		'shape=mxgraph.bpmn.task;arcSize=0;taskMarker=abstract;part=1;isLoopSub=1;isLoopStandard=1;connectable=0;whiteSpace=wrap;html=1;');
			    cell2.vertex = true;
		    	bg.insert(cell2);

			    var cell3 = new mxCell('', 
			    		new mxGeometry(0, 1, 20, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;topRightStyle=square;topLeftStyle=square;part=1;');
			    cell3.vertex = true;
			    cell3.geometry.relative = false;
		    	bg.insert(cell3);

			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Sub-Choreography, Loop, Collapsed');
			}),

			this.addEntry(dt + 'sub choreography sequential multi instance collapsed', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 120, 100), 
				'rounded=1;whiteSpace=wrap;html=1;container=1;collapsible=0;absoluteArcSize=1;arcSize=20;childLayout=stackLayout;horizontal=1;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;');
		    	bg.vertex = true;
		    	
			    var cell1 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;bottomRightStyle=square;bottomLeftStyle=square;fillColor=#C0C0C0;part=1;');
			    cell1.vertex = true;
		    	bg.insert(cell1);

			    var cell2 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 60), 
			    		'shape=mxgraph.bpmn.task;arcSize=0;taskMarker=abstract;part=1;isLoopSub=1;isLoopMultiSeq=1;connectable=0;whiteSpace=wrap;html=1;');
			    cell2.vertex = true;
		    	bg.insert(cell2);

			    var cell3 = new mxCell('', 
			    		new mxGeometry(0, 1, 20, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;topRightStyle=square;topLeftStyle=square;part=1;');
			    cell3.vertex = true;
			    cell3.geometry.relative = false;
		    	bg.insert(cell3);

			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Sub-Choreography, Sequential Multi Instance, Collapsed');
			}),

			this.addEntry(dt + 'sub choreography parallel multi instance collapsed', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 120, 100), 
				'rounded=1;whiteSpace=wrap;html=1;container=1;collapsible=0;absoluteArcSize=1;arcSize=20;childLayout=stackLayout;horizontal=1;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;');
		    	bg.vertex = true;
		    	
			    var cell1 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;bottomRightStyle=square;bottomLeftStyle=square;fillColor=#C0C0C0;part=1;');
			    cell1.vertex = true;
		    	bg.insert(cell1);

			    var cell2 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 60), 
			    		'shape=mxgraph.bpmn.task;arcSize=0;taskMarker=abstract;part=1;isLoopSub=1;isLoopMultiParallel=1;connectable=0;whiteSpace=wrap;html=1;');
			    cell2.vertex = true;
		    	bg.insert(cell2);

			    var cell3 = new mxCell('', 
			    		new mxGeometry(0, 1, 20, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;topRightStyle=square;topLeftStyle=square;part=1;');
			    cell3.vertex = true;
			    cell3.geometry.relative = false;
		    	bg.insert(cell3);

			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Sub-Choreography, Parallel Multi Instance, Collapsed');
			}),

			this.addEntry(dt + 'sub choreography expanded', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 400, 200), 
				'rounded=1;whiteSpace=wrap;html=1;container=1;collapsible=0;absoluteArcSize=1;arcSize=20;childLayout=stackLayout;horizontal=1;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;');
		    	bg.vertex = true;
		    	
			    var cell1 = new mxCell('', 
			    		new mxGeometry(0, 0, 400, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;bottomRightStyle=square;bottomLeftStyle=square;fillColor=#C0C0C0;part=1;');
			    cell1.vertex = true;
		    	bg.insert(cell1);

			    var cell2 = new mxCell('', 
			    		new mxGeometry(0, 0, 400, 160), 
			    		'shape=mxgraph.bpmn.task;arcSize=0;part=1;taskMarker=abstract;verticalAlign=top;align=left;spacingLeft=5;connectable=0;whiteSpace=wrap;html=1;');
			    cell2.vertex = true;
		    	bg.insert(cell2);

			    var cell3 = new mxCell('', 
			    		new mxGeometry(0, 1, 400, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;topRightStyle=square;topLeftStyle=square;part=1;');
			    cell3.vertex = true;
			    cell3.geometry.relative = false;
		    	bg.insert(cell3);

			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Sub-Choreography, Expanded');
			}),

			this.addEntry(dt + 'call choreography activity calling global task', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 120, 100), 
				'rounded=1;whiteSpace=wrap;html=1;container=1;collapsible=0;absoluteArcSize=1;arcSize=20;childLayout=stackLayout;horizontal=1;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;strokeWidth=8;');
		    	bg.vertex = true;
		    	
			    var cell1 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;bottomRightStyle=square;bottomLeftStyle=square;fillColor=#C0C0C0;part=1;');
			    cell1.vertex = true;
		    	bg.insert(cell1);

			    var cell2 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 60), 
			    		'shape=mxgraph.bpmn.task;arcSize=0;part=1;taskMarker=abstract;connectable=0;whiteSpace=wrap;html=1;');
			    cell2.vertex = true;
		    	bg.insert(cell2);

			    var cell3 = new mxCell('', 
			    		new mxGeometry(0, 1, 20, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;topRightStyle=square;topLeftStyle=square;part=1;');
			    cell3.vertex = true;
			    cell3.geometry.relative = false;
		    	bg.insert(cell3);

			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Call Choreography calling Global');
			}),

			this.addEntry(dt + 'call choreography activity calling global task loop', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 120, 100), 
				'rounded=1;whiteSpace=wrap;html=1;container=1;collapsible=0;absoluteArcSize=1;arcSize=20;childLayout=stackLayout;horizontal=1;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;strokeWidth=8;');
		    	bg.vertex = true;
		    	
			    var cell1 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;bottomRightStyle=square;bottomLeftStyle=square;part=1;');
			    cell1.vertex = true;
		    	bg.insert(cell1);

			    var cell2 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 60), 
			    		'shape=mxgraph.bpmn.task;arcSize=0;part=1;taskMarker=abstract;isLoopStandard=1;connectable=0;whiteSpace=wrap;html=1;');
			    cell2.vertex = true;
		    	bg.insert(cell2);

			    var cell3 = new mxCell('', 
			    		new mxGeometry(0, 1, 20, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;topRightStyle=square;topLeftStyle=square;fillColor=#C0C0C0;part=1;');
			    cell3.vertex = true;
			    cell3.geometry.relative = false;
		    	bg.insert(cell3);

			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Call Choreography calling Global, Loop');
			}),

			this.addEntry(dt + 'call choreography activity calling global task sequential multi instance', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 120, 100), 
				'rounded=1;whiteSpace=wrap;html=1;container=1;collapsible=0;absoluteArcSize=1;arcSize=20;childLayout=stackLayout;horizontal=1;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;strokeWidth=8;');
		    	bg.vertex = true;
		    	
			    var cell1 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;bottomRightStyle=square;bottomLeftStyle=square;fillColor=#C0C0C0;part=1;');
			    cell1.vertex = true;
		    	bg.insert(cell1);

			    var cell2 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 60), 
			    		'shape=mxgraph.bpmn.task;arcSize=0;part=1;taskMarker=abstract;isLoopMultiSeq=1;connectable=0;whiteSpace=wrap;html=1;');
			    cell2.vertex = true;
		    	bg.insert(cell2);

			    var cell3 = new mxCell('', 
			    		new mxGeometry(0, 1, 20, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;topRightStyle=square;topLeftStyle=square;part=1;');
			    cell3.vertex = true;
			    cell3.geometry.relative = false;
		    	bg.insert(cell3);

			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Call Choreography calling Global, Sequential Multi Instance');
			}),

			this.addEntry(dt + 'call choreography activity calling global task parallel multi instance', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 120, 100), 
				'rounded=1;whiteSpace=wrap;html=1;container=1;collapsible=0;absoluteArcSize=1;arcSize=20;childLayout=stackLayout;horizontal=1;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;strokeWidth=8;');
		    	bg.vertex = true;
		    	
			    var cell1 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;bottomRightStyle=square;bottomLeftStyle=square;fillColor=#C0C0C0;part=1;');
			    cell1.vertex = true;
		    	bg.insert(cell1);

			    var cell2 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 60), 
			    		'shape=mxgraph.bpmn.task;arcSize=0;part=1;taskMarker=abstract;isLoopMultiParallel=1;connectable=0;whiteSpace=wrap;html=1;');
			    cell2.vertex = true;
		    	bg.insert(cell2);

			    var cell3 = new mxCell('', 
			    		new mxGeometry(0, 1, 20, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;topRightStyle=square;topLeftStyle=square;part=1;');
			    cell3.vertex = true;
			    cell3.geometry.relative = false;
		    	bg.insert(cell3);

			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Call Choreography calling Global, Parallel Multi Instance');
			}),

			this.addEntry(dt + 'call choreography activity calling', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 120, 100), 
				'rounded=1;whiteSpace=wrap;html=1;container=1;collapsible=0;absoluteArcSize=1;arcSize=20;childLayout=stackLayout;horizontal=1;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;strokeWidth=8;');
		    	bg.vertex = true;
		    	
			    var cell1 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;bottomRightStyle=square;bottomLeftStyle=square;fillColor=#C0C0C0;part=1;');
			    cell1.vertex = true;
		    	bg.insert(cell1);

			    var cell2 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 60), 
			    		'shape=mxgraph.bpmn.task;arcSize=0;part=1;taskMarker=abstract;isLoopSub=1;connectable=0;whiteSpace=wrap;html=1;');
			    cell2.vertex = true;
		    	bg.insert(cell2);

			    var cell3 = new mxCell('', 
			    		new mxGeometry(0, 1, 20, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;topRightStyle=square;topLeftStyle=square;part=1;');
			    cell3.vertex = true;
			    cell3.geometry.relative = false;
		    	bg.insert(cell3);

			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Call Choreography calling a Choreography');
			}),

			this.addEntry(dt + 'call choreography activity calling loop', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 120, 100), 
				'rounded=1;whiteSpace=wrap;html=1;container=1;collapsible=0;absoluteArcSize=1;arcSize=20;childLayout=stackLayout;horizontal=1;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;strokeWidth=8;');
		    	bg.vertex = true;
		    	
			    var cell1 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;bottomRightStyle=square;bottomLeftStyle=square;fillColor=#C0C0C0;part=1;');
			    cell1.vertex = true;
		    	bg.insert(cell1);

			    var cell2 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 60), 
			    		'shape=mxgraph.bpmn.task;arcSize=0;part=1;taskMarker=abstract;isLoopSub=1;isLoopStandard=1;connectable=0;whiteSpace=wrap;html=1;');
			    cell2.vertex = true;
		    	bg.insert(cell2);

			    var cell3 = new mxCell('', 
			    		new mxGeometry(0, 1, 20, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;topRightStyle=square;topLeftStyle=square;part=1;');
			    cell3.vertex = true;
			    cell3.geometry.relative = false;
		    	bg.insert(cell3);

			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Call Choreography calling a Choreography, Loop');
			}),

			this.addEntry(dt + 'call choreography activity calling sequential multi instance', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 120, 100), 
				'rounded=1;whiteSpace=wrap;html=1;container=1;collapsible=0;absoluteArcSize=1;arcSize=20;childLayout=stackLayout;horizontal=1;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;strokeWidth=8;');
		    	bg.vertex = true;
		    	
			    var cell1 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;bottomRightStyle=square;bottomLeftStyle=square;fillColor=#C0C0C0;part=1;');
			    cell1.vertex = true;
		    	bg.insert(cell1);

			    var cell2 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 60), 
			    		'shape=mxgraph.bpmn.task;arcSize=0;part=1;taskMarker=abstract;isLoopSub=1;isLoopMultiSeq=1;connectable=0;whiteSpace=wrap;html=1;');
			    cell2.vertex = true;
		    	bg.insert(cell2);

			    var cell3 = new mxCell('', 
			    		new mxGeometry(0, 1, 20, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;topRightStyle=square;topLeftStyle=square;part=1;');
			    cell3.vertex = true;
			    cell3.geometry.relative = false;
		    	bg.insert(cell3);

			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Call Choreography calling a Choreography, Sequential Multi Instance');
			}),

			this.addEntry(dt + 'call choreography activity calling parallel multi instance', function()
		   	{
			    var bg = new mxCell('', new mxGeometry(0, 0, 120, 100), 
				'rounded=1;whiteSpace=wrap;html=1;container=1;collapsible=0;absoluteArcSize=1;arcSize=20;childLayout=stackLayout;horizontal=1;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;strokeWidth=8;');
		    	bg.vertex = true;
		    	
			    var cell1 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;bottomRightStyle=square;bottomLeftStyle=square;fillColor=#C0C0C0;part=1;');
			    cell1.vertex = true;
		    	bg.insert(cell1);

			    var cell2 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 60), 
			    		'shape=mxgraph.bpmn.task;arcSize=0;part=1;taskMarker=abstract;isLoopSub=1;isLoopMultiParallel=1;connectable=0;whiteSpace=wrap;html=1;');
			    cell2.vertex = true;
		    	bg.insert(cell2);

			    var cell3 = new mxCell('', 
			    		new mxGeometry(0, 1, 20, 20), 
			    		'whiteSpace=wrap;connectable=0;html=1;shape=mxgraph.basic.rect;size=10;rectStyle=rounded;topRightStyle=square;topLeftStyle=square;part=1;');
			    cell3.vertex = true;
			    cell3.geometry.relative = false;
		    	bg.insert(cell3);

			   	return sb.createVertexTemplateFromCells([bg], bg.geometry.width, bg.geometry.height, 'Call Choreography calling a Choreography, Parallel Multi Instance');
			}),

			this.createVertexTemplateEntry('whiteSpace=wrap;shape=mxgraph.bpmn.task;part=1;taskMarker=abstract;rectStyle=rounded;bottomRightStyle=square;bottomLeftStyle=square;html=1;', 120, 20, '', 'Participant, Initiating, Top', null, null, dt + 'initiating participant top'),

			this.addEntry(dt + 'initiating participant top with decorator', function()
		   	{
			    var cell1 = new mxCell('', 
			    		new mxGeometry(0, 60, 120, 20), 
			    		'shape=mxgraph.bpmn.task;part=1;taskMarker=abstract;rectStyle=rounded;bottomRightStyle=square;bottomLeftStyle=square;whiteSpace=wrap;html=1;');
			    cell1.vertex = true;

			    var cell2 = new mxCell('', 
			    		new mxGeometry(40, 0, 40, 30), 
			    		'shape=message;html=1;');
			    cell2.vertex = true;
			    
			   	var edge1 = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=orthogonalEdgeStyle;html=1;elbow=horizontal;endArrow=none;labelBackgroundColor=none;endSize=12;endFill=0;dashed=1;dashPattern=1 2;exitX=0.5;exitY=0;rounded=0;');
		    	edge1.geometry.relative = true;
			   	edge1.edge = true;
			   	cell1.insertEdge(edge1, true);
			   	cell2.insertEdge(edge1, false);

			   	return sb.createVertexTemplateFromCells([cell1, cell2, edge1], 120, 80, 'Participant, Initiating, Top with Decorator');
			}),
			
			this.createVertexTemplateEntry('shape=mxgraph.bpmn.task;part=1;taskMarker=abstract;rectStyle=square;whiteSpace=wrap;html=1;', 120, 20, '', 'Additional Participant, Initiating', null, null, dt + 'initiating additional participant'),
			this.createVertexTemplateEntry('shape=mxgraph.bpmn.task;part=1;taskMarker=abstract;rectStyle=rounded;isLoopSub=0;topLeftStyle=square;topRightStyle=square;whiteSpace=wrap;html=1;', 120, 20, '', 'Participant, Initiating, Bottom', null, null, dt + 'initiating participant bottom'),

			this.addEntry(dt + 'initiating participant bottom with decorator', function()
		   	{
			    var cell1 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 20), 
			    		'shape=mxgraph.bpmn.task;part=1;taskMarker=abstract;rectStyle=rounded;isLoopSub=0;topLeftStyle=square;topRightStyle=square;whiteSpace=wrap;html=1;');
			    cell1.vertex = true;

			    var cell2 = new mxCell('', 
			    		new mxGeometry(40, 50, 40, 30), 
			    		'shape=message;html=1;');
			    cell2.vertex = true;
			    
			   	var edge1 = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=orthogonalEdgeStyle;html=1;elbow=horizontal;endArrow=none;labelBackgroundColor=none;endSize=12;endFill=0;dashed=1;dashPattern=1 2;exitX=0.5;exitY=1;rounded=0;');
		    	edge1.geometry.relative = true;
			   	edge1.edge = true;
			   	cell1.insertEdge(edge1, true);
			   	cell2.insertEdge(edge1, false);

			   	return sb.createVertexTemplateFromCells([cell1, cell2, edge1], 120, 80, 'Participant, Initiating, Bottom with Decorator');
			}),
			
			this.createVertexTemplateEntry('shape=mxgraph.bpmn.task;part=1;taskMarker=abstract;rectStyle=rounded;bottomRightStyle=square;bottomLeftStyle=square;verticalAlign=top;isLoopMultiParallel=1;whiteSpace=wrap;html=1;', 120, 40, '', 'Participant, Initiating, Multi-Instance, Top', null, null, dt + 'initiating participant bottom'),

			this.addEntry(dt + 'initiating participant multi instance top with decorator', function()
		   	{
			    var cell1 = new mxCell('', 
			    		new mxGeometry(0, 60, 120, 40), 
			    		'shape=mxgraph.bpmn.task;part=1;taskMarker=abstract;rectStyle=rounded;bottomRightStyle=square;bottomLeftStyle=square;verticalAlign=top;isLoopMultiParallel=1;whiteSpace=wrap;html=1;');
			    cell1.vertex = true;

			    var cell2 = new mxCell('', 
			    		new mxGeometry(40, 0, 40, 30), 
			    		'shape=message;html=1;');
			    cell2.vertex = true;
			    
			   	var edge1 = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=orthogonalEdgeStyle;html=1;elbow=horizontal;endArrow=none;labelBackgroundColor=none;endSize=12;endFill=0;dashed=1;dashPattern=1 2;exitX=0.5;exitY=0;rounded=0;');
		    	edge1.geometry.relative = true;
			   	edge1.edge = true;
			   	cell1.insertEdge(edge1, true);
			   	cell2.insertEdge(edge1, false);

			   	return sb.createVertexTemplateFromCells([cell1, cell2, edge1], 120, 100, 'Participant, Initiating, Multi-Instance Top with Decorator');
			}),
			
			this.createVertexTemplateEntry('shape=mxgraph.bpmn.task;part=1;taskMarker=abstract;rectStyle=square;verticalAlign=top;isLoopMultiParallel=1;whiteSpace=wrap;html=1;', 120, 40, '', 'Additional Participant, Initiating, Multi-Instance, Bottom', null, null, dt + 'initiating additional participant multi instance bottom'),
			this.createVertexTemplateEntry('shape=mxgraph.bpmn.task;part=1;taskMarker=abstract;rectStyle=rounded;verticalAlign=top;isLoopMultiParallel=1;topLeftStyle=square;topRightStyle=square;whiteSpace=wrap;html=1;', 120, 40, '', 'Participant, Initiating, Multi-Instance, Bottom', null, null, dt + 'initiating participant multi instance bottom'),

			this.addEntry(dt + 'initiating participant multi instance bottom with decorator', function()
		   	{
			    var cell1 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 40), 
			    		'shape=mxgraph.bpmn.task;part=1;taskMarker=abstract;rectStyle=rounded;topLeftStyle=square;topRightStyle=square;verticalAlign=top;isLoopMultiParallel=1;whiteSpace=wrap;html=1;');
			    cell1.vertex = true;

			    var cell2 = new mxCell('', 
			    		new mxGeometry(40, 70, 40, 30), 
			    		'shape=message;html=1;');
			    cell2.vertex = true;
			    
			   	var edge1 = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=orthogonalEdgeStyle;html=1;elbow=horizontal;endArrow=none;labelBackgroundColor=none;endSize=12;endFill=0;dashed=1;dashPattern=1 2;exitX=0.5;exitY=1;rounded=0;');
		    	edge1.geometry.relative = true;
			   	edge1.edge = true;
			   	cell1.insertEdge(edge1, true);
			   	cell2.insertEdge(edge1, false);

			   	return sb.createVertexTemplateFromCells([cell1, cell2, edge1], 120, 100, 'Participant, Initiating, Multi-Instance, Bottom with Decorator');
			}),
			
			this.createVertexTemplateEntry('shape=mxgraph.bpmn.task;part=1;taskMarker=abstract;rectStyle=rounded;bottomRightStyle=square;bottomLeftStyle=square;fillColor=#C0C0C0;whiteSpace=wrap;html=1;', 120, 20, '', 'Participant, Non-Initiating, Top', null, null, dt + 'non initiating participant top'),
			
			this.addEntry(dt + 'non initiating participant top with decorator', function()
		   	{
			    var cell1 = new mxCell('', 
			    		new mxGeometry(0, 60, 120, 20), 
			    		'shape=mxgraph.bpmn.task;part=1;taskMarker=abstract;rectStyle=rounded;bottomRightStyle=square;bottomLeftStyle=square;fillColor=#C0C0C0;whiteSpace=wrap;html=1;');
			    cell1.vertex = true;

			    var cell2 = new mxCell('', 
			    		new mxGeometry(40, 0, 40, 30), 
			    		'shape=message;fillColor=#C0C0C0;html=1;');
			    cell2.vertex = true;
			    
			   	var edge1 = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=orthogonalEdgeStyle;html=1;elbow=horizontal;endArrow=none;labelBackgroundColor=none;endSize=12;endFill=0;dashed=1;dashPattern=1 2;exitX=0.5;exitY=0;rounded=0;');
		    	edge1.geometry.relative = true;
			   	edge1.edge = true;
			   	cell1.insertEdge(edge1, true);
			   	cell2.insertEdge(edge1, false);

			   	return sb.createVertexTemplateFromCells([cell1, cell2, edge1], 120, 80, 'Participant, Non-Initiating, Top with Decorator');
			}),
			
			this.createVertexTemplateEntry('shape=mxgraph.bpmn.task;part=1;taskMarker=abstract;rectStyle=square;fillColor=#C0C0C0;whiteSpace=wrap;html=1;', 120, 20, '', 'Additional Participant, Non-Initiating', null, null, dt + 'non initiating additional participant'),
			this.createVertexTemplateEntry('shape=mxgraph.bpmn.task;part=1;taskMarker=abstract;rectStyle=rounded;isLoopSub=0;topLeftStyle=square;topRightStyle=square;fillColor=#C0C0C0;whiteSpace=wrap;html=1;', 120, 20, '', 'Participant, Non-Initiating, Bottom', null, null, dt + 'non initiating participant bottom'),
			
			this.addEntry(dt + 'non initiating participant bottom with decorator', function()
		   	{
			    var cell1 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 20), 
			    		'shape=mxgraph.bpmn.task;part=1;taskMarker=abstract;rectStyle=rounded;isLoopSub=0;topLeftStyle=square;topRightStyle=square;fillColor=#C0C0C0;whiteSpace=wrap;html=1;');
			    cell1.vertex = true;

			    var cell2 = new mxCell('', 
			    		new mxGeometry(40, 50, 40, 30), 
			    		'shape=message;fillColor=#C0C0C0;html=1;');
			    cell2.vertex = true;
			    
			   	var edge1 = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=orthogonalEdgeStyle;html=1;elbow=horizontal;endArrow=none;labelBackgroundColor=none;endSize=12;endFill=0;dashed=1;dashPattern=1 2;exitX=0.5;exitY=1;rounded=0;');
		    	edge1.geometry.relative = true;
			   	edge1.edge = true;
			   	cell1.insertEdge(edge1, true);
			   	cell2.insertEdge(edge1, false);

			   	return sb.createVertexTemplateFromCells([cell1, cell2, edge1], 120, 80, 'Participant, Non-Initiating, Bottom with Decorator');
			}),
			
			this.createVertexTemplateEntry('shape=mxgraph.bpmn.task;part=1;taskMarker=abstract;rectStyle=rounded;bottomRightStyle=square;bottomLeftStyle=square;verticalAlign=top;isLoopMultiParallel=1;fillColor=#C0C0C0;whiteSpace=wrap;html=1;', 120, 40, '', 'Participant, Non-Initiating, Multi-Instance, Top', null, null, dt + 'initiating participant bottom'),
			
			this.addEntry(dt + 'non initiating participant multi instance top with decorator', function()
		   	{
			    var cell1 = new mxCell('', 
			    		new mxGeometry(0, 60, 120, 40), 
			    		'shape=mxgraph.bpmn.task;part=1;taskMarker=abstract;rectStyle=rounded;bottomRightStyle=square;bottomLeftStyle=square;verticalAlign=top;isLoopMultiParallel=1;fillColor=#C0C0C0;whiteSpace=wrap;html=1;');
			    cell1.vertex = true;

			    var cell2 = new mxCell('', 
			    		new mxGeometry(40, 0, 40, 30), 
			    		'shape=message;fillColor=#C0C0C0;html=1;');
			    cell2.vertex = true;
			    
			   	var edge1 = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=orthogonalEdgeStyle;html=1;elbow=horizontal;endArrow=none;labelBackgroundColor=none;endSize=12;endFill=0;dashed=1;dashPattern=1 2;exitX=0.5;exitY=0;rounded=0;');
		    	edge1.geometry.relative = true;
			   	edge1.edge = true;
			   	cell1.insertEdge(edge1, true);
			   	cell2.insertEdge(edge1, false);

			   	return sb.createVertexTemplateFromCells([cell1, cell2, edge1], 120, 100, 'Participant, Non-Initiating, Multi-Instance, Top with Decorator');
			}),
			
			this.createVertexTemplateEntry('shape=mxgraph.bpmn.task;part=1;taskMarker=abstract;rectStyle=square;verticalAlign=top;isLoopMultiParallel=1;fillColor=#C0C0C0;whiteSpace=wrap;html=1;', 120, 40, '', 'Additional Participant, Non-Initiating, Multi-Instance, Bottom', null, null, dt + 'non initiating additional participant multi instance bottom'),
			this.createVertexTemplateEntry('shape=mxgraph.bpmn.task;part=1;taskMarker=abstract;rectStyle=rounded;verticalAlign=top;isLoopMultiParallel=1;topLeftStyle=square;topRightStyle=square;fillColor=#C0C0C0;whiteSpace=wrap;html=1;', 120, 40, '', 'Participant, Non-Initiating, Multi-Instance, Bottom', null, null, dt + 'non initiating participant multi instance bottom'),

			this.addEntry(dt + 'non initiating participant multi instance bottom with decorator', function()
		   	{
			    var cell1 = new mxCell('', 
			    		new mxGeometry(0, 0, 120, 40), 
			    		'shape=mxgraph.bpmn.task;part=1;taskMarker=abstract;rectStyle=rounded;topLeftStyle=square;topRightStyle=square;verticalAlign=top;isLoopMultiParallel=1;fillColor=#C0C0C0;whiteSpace=wrap;html=1;');
			    cell1.vertex = true;

			    var cell2 = new mxCell('', 
			    		new mxGeometry(40, 70, 40, 30), 
			    		'shape=message;fillColor=#C0C0C0;html=1;');
			    cell2.vertex = true;
			    
			   	var edge1 = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=orthogonalEdgeStyle;html=1;elbow=horizontal;endArrow=none;labelBackgroundColor=none;endSize=12;endFill=0;dashed=1;dashPattern=1 2;exitX=0.5;exitY=1;rounded=0;');
		    	edge1.geometry.relative = true;
			   	edge1.edge = true;
			   	cell1.insertEdge(edge1, true);
			   	cell2.insertEdge(edge1, false);

			   	return sb.createVertexTemplateFromCells([cell1, cell2, edge1], 120, 100, 'Participant, Non-Initiating, Multi-Instance, Bottom with Decorator');
			})
		];
			
		this.addPalette('bpmn2Choreographies', 'BPMN 2.0 \ Choreographies', false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addBPMN2EventsPalette = function(gn, r, sb)
	{
		var dt = 'bpmn business process model notation event ';
		var s = 'points=[[0.145,0.145,0],[0.5,0,0],[0.855,0.145,0],[1,0.5,0],[0.855,0.855,0],[0.5,1,0],[0.145,0.855,0],[0,0.5,0]];shape=mxgraph.bpmn.event;html=1;verticalLabelPosition=bottom;labelBackgroundColor=#ffffff;verticalAlign=top;align=center;perimeter=ellipsePerimeter;outlineConnect=0;aspect=fixed;outline=';
		var w = 50;
		var h = 50;
		
		var fns =
		[
			this.createVertexTemplateEntry(s + 'standard;symbol=general;', w, h, '', 'None Start', null, null, dt + 'none start'),
			this.createVertexTemplateEntry(s + 'throwing;symbol=general;', w, h, '', 'None Intermediate, Throwing', null, null, dt + 'none intermediate throwing'),
			this.createVertexTemplateEntry(s + 'end;symbol=terminate2;', w, h, '', 'End', null, null, dt + 'end'),
			this.createVertexTemplateEntry(s + 'standard;symbol=message;', w, h, '', 'Message Start, Interrupting', null, null, dt + 'message start interrupting'),
			this.createVertexTemplateEntry(s + 'eventNonint;symbol=message;', w, h, '', 'Message Start, Non-Interrupting', null, null, dt + 'message start non interrupting noninterrupting'),
			this.createVertexTemplateEntry(s + 'throwing;symbol=message;', w, h, '', 'Message Intermediate, Throwing', null, null, dt + 'message intermediate throwing'),
			this.createVertexTemplateEntry(s + 'catching;symbol=message;', w, h, '', 'Message Intermediate, Catching', null, null, dt + 'message intermediate catching'),
			this.createVertexTemplateEntry(s + 'boundInt;symbol=message;', w, h, '', 'Message Intermediate, Boundary Interrupting', null, null, dt + 'message intermediate boundary interrupting'),
			this.createVertexTemplateEntry(s + 'boundNonint;symbol=message;', w, h, '', 'Message Intermediate, Boundary Non-Interrupting', null, null, dt + 'message intermediate boundary non interrupting noninterrupting'),
			this.createVertexTemplateEntry(s + 'end;symbol=message;', w, h, '', 'Message End', null, null, dt + 'message end'),
			this.createVertexTemplateEntry(s + 'standard;symbol=timer;', w, h, '', 'Timer Start, Interrupting', null, null, dt + 'timer start interrupting'),
			this.createVertexTemplateEntry(s + 'eventNonint;symbol=timer;', w, h, '', 'Timer Start, Non-Interrupting', null, null, dt + 'timer start non interrupting noninterrupting'),
			this.createVertexTemplateEntry(s + 'catching;symbol=timer;', w, h, '', 'Timer Intermediate, Catching', null, null, dt + 'timer intermediate catching'),
			this.createVertexTemplateEntry(s + 'boundInt;symbol=timer;', w, h, '', 'Timer Intermediate, Boundary Interrupting', null, null, dt + 'timer intermediate boundary interrupting'),
			this.createVertexTemplateEntry(s + 'boundNonint;symbol=timer;', w, h, '', 'Timer Intermediate, Boundary Non-Interrupting', null, null, dt + 'timer intermediate boundary non interrupting noninterrupting'),
			this.createVertexTemplateEntry(s + 'eventInt;symbol=escalation;', w, h, '', 'Escalation Start, Interrupting', null, null, dt + 'escalation start interrupting'),
			this.createVertexTemplateEntry(s + 'eventNonint;symbol=escalation;', w, h, '', 'Escalation Start, Non-Interrupting', null, null, dt + 'escalation start non interrupting noninterrupting'),
			this.createVertexTemplateEntry(s + 'throwing;symbol=escalation;', w, h, '', 'Escalation Intermediate, Boundary Throwing', null, null, dt + 'escalation intermediate boundary throwing'),
			this.createVertexTemplateEntry(s + 'boundInt;symbol=escalation;', w, h, '', 'Escalation Intermediate, Boundary Interrupting', null, null, dt + 'escalation intermediate boundary interrupting'),
			this.createVertexTemplateEntry(s + 'boundNonint;symbol=escalation;', w, h, '', 'Escalation Intermediate, Non-Interrupting', null, null, dt + 'escalation intermediate non interrupting nonimpterrupting'),
			this.createVertexTemplateEntry(s + 'end;symbol=escalation;', w, h, '', 'Escalation End', null, null, dt + 'escalation end'),
			this.createVertexTemplateEntry(s + 'eventInt;symbol=error;', w, h, '', 'Error Start, Interrupting', null, null, dt + 'error start interrupting'),
			this.createVertexTemplateEntry(s + 'boundInt;symbol=error;', w, h, '', 'Error Intermediate, Boundary Interrupting', null, null, dt + 'error intermediate boundary interrupting'),
			this.createVertexTemplateEntry(s + 'end;symbol=error;', w, h, '', 'Error End', null, null, dt + 'error end'),
			this.createVertexTemplateEntry(s + 'eventInt;symbol=compensation;', w, h, '', 'Compensation Start, Interrupting', null, null, dt + 'compensation start interrupting'),
			this.createVertexTemplateEntry(s + 'throwing;symbol=compensation;', w, h, '', 'Compensation Intermediate, Throwing', null, null, dt + 'compensation intermediate throwing'),
			this.createVertexTemplateEntry(s + 'boundInt;symbol=compensation;', w, h, '', 'Compensation Intermediate, Boundary Interrupting', null, null, dt + 'compensation intermediate boundary interrupting'),
			this.createVertexTemplateEntry(s + 'end;symbol=compensation;', w, h, '', 'Compensation End', null, null, dt + 'compensation end'),
			this.createVertexTemplateEntry(s + 'standard;symbol=conditional;', w, h, '', 'Conditional Start, Interrupting', null, null, dt + 'conditional start interrupting'),
			this.createVertexTemplateEntry(s + 'eventNonint;symbol=conditional;', w, h, '', 'Conditional Start, Non-Interrupting', null, null, dt + 'conditional start non interrupting noninterrupting'),
			this.createVertexTemplateEntry(s + 'catching;symbol=conditional;', w, h, '', 'Conditional Intermediate, Catching', null, null, dt + 'conditional intermediate catching'),
			this.createVertexTemplateEntry(s + 'boundInt;symbol=conditional;', w, h, '', 'Conditional Intermediate, Boundary Interrupting', null, null, dt + 'conditional intermediate boundary interrupting'),
			this.createVertexTemplateEntry(s + 'boundNonint;symbol=conditional;', w, h, '', 'Conditional Intermediate, Boundary Non-Interrupting', null, null, dt + 'conditional intermediate boundary non interrupting noninterrupting'),
			this.createVertexTemplateEntry(s + 'catching;symbol=link;', w, h, '', 'Link Intermediate, Catching', null, null, dt + 'link intermediate catching'),
			this.createVertexTemplateEntry(s + 'throwing;symbol=link;', w, h, '', 'Link Intermediate, Throwing', null, null, dt + 'link intermediate throwing'),
			this.createVertexTemplateEntry(s + 'standard;symbol=signal;', w, h, '', 'Signal Start, Interrupting', null, null, dt + 'signal start interrupting'),
			this.createVertexTemplateEntry(s + 'eventNonint;symbol=signal;', w, h, '', 'Signal Start, Non-Interrupting', null, null, dt + 'signal start non interrupting noninterrupting'),
			this.createVertexTemplateEntry(s + 'catching;symbol=signal;', w, h, '', 'Signal Intermediate, Catching', null, null, dt + 'signal intermediate catching'),
			this.createVertexTemplateEntry(s + 'throwing;symbol=signal;', w, h, '', 'Signal Intermediate, Throwing', null, null, dt + 'signal intermediate throwing'),
			this.createVertexTemplateEntry(s + 'boundInt;symbol=signal;', w, h, '', 'Signal Intermediate, Boundary Interrupting', null, null, dt + 'signal intermediate boundary interrupting'),
			this.createVertexTemplateEntry(s + 'boundNonint;symbol=signal;', w, h, '', 'Signal Intermediate, Boundary Non-Interrupting', null, null, dt + 'signal intermediate noundary non interrupting noninterrupting'),
			this.createVertexTemplateEntry(s + 'end;symbol=signal;', w, h, '', 'Signal End', null, null, dt + 'signal end'),
			this.createVertexTemplateEntry(s + 'standard;symbol=multiple;', w, h, '', 'Multiple Start, Interrupting', null, null, dt + 'multiple start interrupting'),
			this.createVertexTemplateEntry(s + 'eventNonint;symbol=multiple;', w, h, '', 'Multiple Start, Non-Interrupting', null, null, dt + 'multiple start non interrupting noninterrupting'),
			this.createVertexTemplateEntry(s + 'catching;symbol=multiple;', w, h, '', 'Multiple Intermediate, Catching', null, null, dt + 'multiple intermediate catching'),
			this.createVertexTemplateEntry(s + 'throwing;symbol=multiple;', w, h, '', 'Multiple Intermediate, Throwing', null, null, dt + 'multiple intermediate throwing'),
			this.createVertexTemplateEntry(s + 'boundInt;symbol=multiple;', w, h, '', 'Multiple Intermediate, Boundary Interrupting', null, null, dt + 'multiple intermediate boundary interrupting'),
			this.createVertexTemplateEntry(s + 'boundNonint;symbol=multiple;', w, h, '', 'Multiple Intermediate, Boundary Non-Interrupting', null, null, dt + 'multiple intermediate boundary non interrupting noninterrupting'),
			this.createVertexTemplateEntry(s + 'end;symbol=multiple;', w, h, '', 'Multiple End', null, null, dt + 'multiple end'),
			this.createVertexTemplateEntry(s + 'eventInt;symbol=parallelMultiple;', w, h, '', 'Parallel Multiple Start, Interrupting', null, null, dt + 'parallel multiple start interrupting'),
			this.createVertexTemplateEntry(s + 'eventNonint;symbol=parallelMultiple;', w, h, '', 'Parallel Multiple Start, Non-Interrupting', null, null, dt + 'parallel multiple start non interrupting noninterrupting'),
			this.createVertexTemplateEntry(s + 'catching;symbol=parallelMultiple;', w, h, '', 'Parallel Multiple Intermediate, Catching', null, null, dt + 'parallel multiple intermediate catching'),
			this.createVertexTemplateEntry(s + 'boundInt;symbol=parallelMultiple;', w, h, '', 'Parallel Multiple Intermediate, Boundary Interrupting', null, null, dt + 'parallel multiple intermediate boundary interrupting'),
			this.createVertexTemplateEntry(s + 'boundNonint;symbol=parallelMultiple;', w, h, '', 'Parallel Multiple Intermediate, Boundary Non-Interrupting', null, null, dt + 'parallel multiple intermediate boundary non interrupting noninterrupting'),
			this.createVertexTemplateEntry(s + 'boundInt;symbol=cancel;', w, h, '', 'Cancel Intermediate, Boundary Interrupting', null, null, dt + 'cancel intermediate boundary interrupting'),
			this.createVertexTemplateEntry(s + 'end;symbol=cancel;', w, h, '', 'Cancel End', null, null, dt + 'cancel end'),
			this.createVertexTemplateEntry(s + 'end;symbol=terminate;', w, h, '', 'Terminate', null, null, dt + 'terminate')			
		];
			
		this.addPalette('bpmn2Events', 'BPMN 2.0 \ Events', false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
	Sidebar.prototype.addBPMN2GatewaysPalette = function(gn, r, sb)
	{
		var dt = 'bpmn business process model notation gateway ';
		var s2 = 'points=[[0.25,0.25,0],[0.5,0,0],[0.75,0.25,0],[1,0.5,0],[0.75,0.75,0],[0.5,1,0],[0.25,0.75,0],[0,0.5,0]];shape=mxgraph.bpmn.gateway2;html=1;verticalLabelPosition=bottom;labelBackgroundColor=#ffffff;verticalAlign=top;align=center;perimeter=rhombusPerimeter;outlineConnect=0;outline=';
		var w = 50;
		var h = 50;
		
		var fns =
		[
			this.createVertexTemplateEntry(s2 + 'none;symbol=none;', w, h, '', 'Exclusive', null, null, dt + 'exclusive'),			
			this.createVertexTemplateEntry(s2 + 'none;symbol=none;gwType=exclusive;', w, h, '', 'Exclusive', null, null, dt + 'exclusive'),			
			this.createVertexTemplateEntry(s2 + 'end;symbol=general;', w, h, '', 'Inclusive', null, null, dt + 'inclusive'),			
			this.createVertexTemplateEntry(s2 + 'none;symbol=none;gwType=parallel;', w, h, '', 'Parallel', null, null, dt + 'parallel'),			
			this.createVertexTemplateEntry(s2 + 'none;symbol=none;gwType=complex;', w, h, '', 'Complex', null, null, dt + 'complex'),			
			
			this.createVertexTemplateEntry(s2 + 'standard;symbol=general;', w, h, '', 'Start', null, null, dt + 'none start'),
			this.createVertexTemplateEntry(s2 + 'throwing;symbol=general;', w, h, '', 'Intermediate', null, null, dt + 'none intermediate'),
			this.createVertexTemplateEntry(s2 + 'end;symbol=general;', w, h, '', 'End', null, null, dt + 'none end'),
			this.createVertexTemplateEntry(s2 + 'standard;symbol=message;', w, h, '', 'Message', null, null, dt + 'message standard'),
			this.createVertexTemplateEntry(s2 + 'eventInt;symbol=message;', w, h, '', 'Message (Interrupting)', null, null, dt + 'message interrupting'),
			this.createVertexTemplateEntry(s2 + 'eventNonint;symbol=message;', w, h, '', 'Message (Non-Interrupting)', null, null, dt + 'message non interrupting noninterrupting'),
			this.createVertexTemplateEntry(s2 + 'catching;symbol=message;', w, h, '', 'Message (Catching)', null, null, dt + 'message catching'),
			this.createVertexTemplateEntry(s2 + 'boundInt;symbol=message;', w, h, '', 'Message Boundary (Interrupting)', null, null, dt + 'message boundary interrupting'),
			this.createVertexTemplateEntry(s2 + 'boundNonint;symbol=message;', w, h, '', 'Message Boundary (Non-Interrupting)', null, null, dt + 'message boundary non interrupting noninterrupting'),
			this.createVertexTemplateEntry(s2 + 'throwing;symbol=message;', w, h, '', 'Message (Throwing)', null, null, dt + 'message throwing'),
			this.createVertexTemplateEntry(s2 + 'end;symbol=message;', w, h, '', 'Message End', null, null, dt + 'message end'),
			this.createVertexTemplateEntry(s2 + 'standard;symbol=timer;', w, h, '', 'Timer', null, null, dt + 'timer standard'),
			this.createVertexTemplateEntry(s2 + 'eventInt;symbol=timer;', w, h, '', 'Timer (Interrupting)', null, null, dt + 'timer interrupting'),
			this.createVertexTemplateEntry(s2 + 'eventNonint;symbol=timer;', w, h, '', 'Timer (Non-Interrupting)', null, null, dt + 'timer non interrupting noninterrupting'),
			this.createVertexTemplateEntry(s2 + 'catching;symbol=timer;', w, h, '', 'Timer (Catching)', null, null, dt + 'timer catching'),
			this.createVertexTemplateEntry(s2 + 'boundInt;symbol=timer;', w, h, '', 'Timer Boundary (Interrupting)', null, null, dt + 'timer boundary interrupting'),
			this.createVertexTemplateEntry(s2 + 'boundNonint;symbol=timer;', w, h, '', 'Timer Boundary (Non-Interrupting)', null, null, dt + 'timer boundary non interrupting noninterrupting'),
			this.createVertexTemplateEntry(s2 + 'eventInt;symbol=escalation;', w, h, '', 'Escalation (Interrupting)', null, null, dt + 'escalation interrupting'),
			this.createVertexTemplateEntry(s2 + 'eventNonint;symbol=escalation;', w, h, '', 'Escalation (Non-Interrupting)', null, null, dt + 'escalation non interrupting noninterrupting'),
			this.createVertexTemplateEntry(s2 + 'boundInt;symbol=escalation;', w, h, '', 'Escalation Boundary (Interrupting)', null, null, dt + 'escalation boundary interrupting'),
			this.createVertexTemplateEntry(s2 + 'boundNonint;symbol=escalation;', w, h, '', 'Escalation Boundary (Non-Interrupting)', null, null, dt + 'escalation boundary non interrupting noninterrupting'),
			this.createVertexTemplateEntry(s2 + 'throwing;symbol=escalation;', w, h, '', 'Escalation (Throwing)', null, null, dt + 'escalation throwing'),
			this.createVertexTemplateEntry(s2 + 'end;symbol=escalation;', w, h, '', 'Escalation End', null, null, dt + 'escalation end'),
			this.createVertexTemplateEntry(s2 + 'standard;symbol=conditional;', w, h, '', 'Conditional', null, null, dt + 'conditional standard'),
			this.createVertexTemplateEntry(s2 + 'eventInt;symbol=conditional;', w, h, '', 'Conditional (Interrupting)', null, null, dt + 'conditional interrupting'),
			this.createVertexTemplateEntry(s2 + 'eventNonint;symbol=conditional;', w, h, '', 'Conditional (Non-Interrupting)', null, null, dt + 'conditional non interrupting noninterrupting'),
			this.createVertexTemplateEntry(s2 + 'catching;symbol=conditional;', w, h, '', 'Conditional (Catching)', null, null, dt + 'conditional catching'),
			this.createVertexTemplateEntry(s2 + 'boundInt;symbol=conditional;', w, h, '', 'Conditional Boundary (Interrupting)', null, null, dt + 'conditional boundary interrupting'),
			this.createVertexTemplateEntry(s2 + 'boundNonint;symbol=conditional;', w, h, '', 'Conditional Boundary (Non-Interrupting)', null, null, dt + 'conditional boundary non interrupting noninterrupting'),
			this.createVertexTemplateEntry(s2 + 'catching;symbol=link;', w, h, '', 'Link (Catching)', null, null, dt + 'link catching'),
			this.createVertexTemplateEntry(s2 + 'throwing;symbol=link;', w, h, '', 'Link (Throwing)', null, null, dt + 'link throwing'),
			this.createVertexTemplateEntry(s2 + 'eventInt;symbol=error;', w, h, '', 'Error (Interrupting)', null, null, dt + 'error interrupting'),
			this.createVertexTemplateEntry(s2 + 'boundInt;symbol=error;', w, h, '', 'Error Boundary (Interrupting)', null, null, dt + 'error boundary interrupting'),
			this.createVertexTemplateEntry(s2 + 'end;symbol=error;', w, h, '', 'Error (End)', null, null, dt + 'error end'),
			this.createVertexTemplateEntry(s2 + 'boundInt;symbol=cancel;', w, h, '', 'Cancel Boundary (Interrupting)', null, null, dt + 'cancel boundary interrupting'),
			this.createVertexTemplateEntry(s2 + 'end;symbol=cancel;', w, h, '', 'Cancel End', null, null, dt + 'cancel end'),
			this.createVertexTemplateEntry(s2 + 'eventInt;symbol=compensation;', w, h, '', 'Compensation (Interrupting)', null, null, dt + 'compensation interrupting'),
			this.createVertexTemplateEntry(s2 + 'boundInt;symbol=compensation;', w, h, '', 'Compensation Boundary (Interrupting)', null, null, dt + 'compensation boundary interrupting'),
			this.createVertexTemplateEntry(s2 + 'throwing;symbol=compensation;', w, h, '', 'Compensation (Throwing)', null, null, dt + 'compensation throwing'),
			this.createVertexTemplateEntry(s2 + 'end;symbol=compensation;', w, h, '', 'Compensation End', null, null, dt + 'compensation end'),
			this.createVertexTemplateEntry(s2 + 'standard;symbol=signal;', w, h, '', 'Signal', null, null, dt + 'signal standard'),
			this.createVertexTemplateEntry(s2 + 'eventInt;symbol=signal;', w, h, '', 'Signal (Interrupting)', null, null, dt + 'signal interrupting'),
			this.createVertexTemplateEntry(s2 + 'eventNonint;symbol=signal;', w, h, '', 'Signal (Non-Interrupting)', null, null, dt + 'signal non interrupting noninterrupting'),
			this.createVertexTemplateEntry(s2 + 'catching;symbol=signal;', w, h, '', 'Signal (Catching)', null, null, dt + 'signal catching'),
			this.createVertexTemplateEntry(s2 + 'boundInt;symbol=signal;', w, h, '', 'Signal Boundary (Interrupting)', null, null, dt + 'signal boundary interrupting'),
			this.createVertexTemplateEntry(s2 + 'boundNonint;symbol=signal;', w, h, '', 'Signal Boundary (Non-Interrupting)', null, null, dt + 'signal boundary non interrupting noninterrupting'),
			this.createVertexTemplateEntry(s2 + 'throwing;symbol=signal;', w, h, '', 'Signal (Throwing)', null, null, dt + 'signal throwing'),
			this.createVertexTemplateEntry(s2 + 'end;symbol=signal;', w, h, '', 'Signal End', null, null, dt + 'signal end'),
			this.createVertexTemplateEntry(s2 + 'standard;symbol=multiple;', w, h, '', 'Multiple ', null, null, dt + 'multiple standard'),
			this.createVertexTemplateEntry(s2 + 'eventInt;symbol=multiple;', w, h, '', 'Multiple (Interrupting)', null, null, dt + 'multiple interrupting'),
			this.createVertexTemplateEntry(s2 + 'eventNonint;symbol=multiple;', w, h, '', 'Multiple (Non-Interrupting)', null, null, dt + 'multiple non interrupting noninterrupting'),
			this.createVertexTemplateEntry(s2 + 'catching;symbol=multiple;', w, h, '', 'Multiple (Catching)', null, null, dt + 'multiple catching'),
			this.createVertexTemplateEntry(s2 + 'boundInt;symbol=multiple;', w, h, '', 'Multiple Boundary (Interrupting)', null, null, dt + 'multiple boundary interrupting'),
			this.createVertexTemplateEntry(s2 + 'boundNonint;symbol=multiple;', w, h, '', 'Multiple Boundary (Non-Interrupting)', null, null, dt + 'multiple boundary non interrupting noninterrupting'),
			this.createVertexTemplateEntry(s2 + 'throwing;symbol=multiple;', w, h, '', 'Multiple (Throwing)', null, null, dt + 'multiple throwing'),
			this.createVertexTemplateEntry(s2 + 'end;symbol=multiple;', w, h, '', 'Multiple End', null, null, dt + 'multiple end'),
			this.createVertexTemplateEntry(s2 + 'standard;symbol=star;', w, h, '', 'Multiple Start', null, null, dt + 'multiple end'),
			this.createVertexTemplateEntry(s2 + 'standard;symbol=parallelMultiple;', w, h, '', 'Parallel Multiple', null, null, dt + 'parallel multiple standard'),
			this.createVertexTemplateEntry(s2 + 'eventInt;symbol=parallelMultiple;', w, h, '', 'Parallel Multiple (Interrupting)', null, null, dt + 'parallel multiple interrupting'),
			this.createVertexTemplateEntry(s2 + 'eventNonint;symbol=parallelMultiple;', w, h, '', 'Parallel Multiple (Non-Interrupting)', null, null, dt + 'parallel multiple non interrupting noninterrupting'),
			this.createVertexTemplateEntry(s2 + 'catching;symbol=parallelMultiple;', w, h, '', 'Parallel Multiple (Catching)', null, null, dt + 'parallel multiple catching'),
			this.createVertexTemplateEntry(s2 + 'boundInt;symbol=parallelMultiple;', w, h, '', 'Parallel Multiple Boundary (Interrupting)', null, null, dt + 'parallel multiple boundary interrupting'),
			this.createVertexTemplateEntry(s2 + 'boundNonint;symbol=parallelMultiple;', w, h, '', 'Parallel Multiple Boundary (Non-Interrupting)', null, null, dt + 'parallel multiple boundary non interrupting noninterrupting'),
			this.createVertexTemplateEntry(s2 + 'end;symbol=terminate;', w, h, '', 'Terminate', null, null, dt + 'terminate')
		];
			
		this.addPalette('bpmn2Gateways', 'BPMN 2.0 \ Gateways', false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};
	
})();

