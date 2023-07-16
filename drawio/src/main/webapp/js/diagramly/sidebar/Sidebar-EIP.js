(function()
{
	Sidebar.prototype.addEipPalette = function()
	{
		this.setCurrentSearchEntryLibrary('eip', 'eipMessage Construction');
		this.addEipMessageConstructionPalette();
		this.setCurrentSearchEntryLibrary('eip', 'eipMessage Routing');
		this.addEipMessageRoutingPalette();
		this.setCurrentSearchEntryLibrary('eip', 'eipMessage Transformation');
		this.addEipMessageTransformationPalette();
		this.setCurrentSearchEntryLibrary('eip', 'eipMessaging Channels');
		this.addEipMessagingChannelsPalette();
		this.setCurrentSearchEntryLibrary('eip', 'eipMessaging Endpoints');
		this.addEipMessagingEndpointsPalette();
		this.setCurrentSearchEntryLibrary('eip', 'eipMessaging Systems');
		this.addEipMessagingSystemsPalette();
		this.setCurrentSearchEntryLibrary('eip', 'eipSystem Management');
		this.addEipSystemManagementPalette();
		this.setCurrentSearchEntryLibrary();
	}
	
	// Adds EIP shapes
	Sidebar.prototype.addEipMessageConstructionPalette = function(expand)
	{
		var s = "strokeWidth=2;dashed=0;align=center;fontSize=8;shape=";
		var s2 = "strokeWidth=2;outlineConnect=0;dashed=0;align=center;fontSize=8;shape=mxgraph.eip.";
		var s3 = "strokeWidth=3;outlineConnect=0;dashed=0;align=center;fontSize=8;shape=mxgraph.eip.";
		var gn = 'mxgraph.eip';
		var dt = 'eip enterprise integration pattern message construction ';
		var sb = this;
		
		var fns = [
			this.createEdgeTemplateEntry('edgeStyle=none;html=1;strokeColor=#808080;endArrow=block;endSize=10;dashed=0;verticalAlign=bottom;strokeWidth=2;', 
					160, 0, '', 'Pipe', null, this.getTagsForStencil(gn, '', dt + 'pipe').join(' ')),
		    this.createVertexTemplateEntry(s + 'rect;fillColor=#c0f5a9;verticalLabelPosition=bottom;verticalAlign=top;html=1;', 
		    		150, 90, '', 'Filter', null, null, this.getTagsForStencil(gn, '', dt + 'filter').join(' ')),
			this.addEntry(dt + 'command message', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 12, 12), s + 'ellipse;fillColor=#808080;strokeColor=none;');
				bg1.vertex = true;
				var bg2 = new mxCell('C', new mxGeometry(16, 18, 12, 12), s + 'rect;fillColor=#FF8080;fontStyle=1;whiteSpace=wrap;html=1;');
				bg2.vertex = true;
				var edge1 = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=orthogonalEdgeStyle;rounded=0;exitX=0;exitY=0.5;endArrow=none;dashed=0;html=1;strokeColor=#808080;strokeWidth=2;');
		    	edge1.geometry.relative = true;
		    	edge1.edge = true;
		    	bg1.insertEdge(edge1, false);
		    	bg2.insertEdge(edge1, true);
			    
			   	return sb.createVertexTemplateFromCells([edge1, bg1, bg2], 28, 30, 'Command Message');
			}),
			this.addDataEntry(dt + 'correlation identifier', 78, 30, 'Correlation Identifier',
				'7ZZNj9MwEIZ/Ta4oH/SD47a73RMSUg/A0TTT2Fo3EznuNuXXM46naYwpFC0UCUhVaWbsmTjPO3aSFMtd92hEI99iCTopHpJiaRCtt3bdErRO8lSVSXGf5HlK/yRfXRjN+tG0EQZqe01C7hOehd6Dj/hAa4+aA1BWsGYXjZVYYS30wzm6MLivS3AVU/KgU/bDyP7o7FcT59XlnTF4oECNtcssRSuHRGl39Pz3GZmtNfgES9Ro+kUU89T9hpH3qrSSRnKK+AW7VQYMWtybDYemPmSFqYCxTGJSfSJjegTcgTVHmmJAC6uew+qi9W41zDtDJoM5f5t58U8wn8fMZ3+O+esrmJ9JfdK4eQrp0OhK6ZDVmEhEb7V6QwgjpS6Q+5VMOPUdKqqYpx0T4I4/BlvilO+V45TxefFVlWz2vSpe7KhKL87wJFfpNfmxXrEGQWcLraqa7A1xBdJkscXartVnl+1kaaVonE33VU3rNsaW9L3c/qcR3kW8PjAWup9V8sBrdjP4uSSoStow9pJ+n0b87n4XQAMbG9Mb2j/aGGl/nerxcjL2R/O2/UXxg1QW1o3oT5YDvSrDnfkSJU4J06CrMz67bqDT7G/uc06YpDfDOY9wLv63/UVhprdqe3LPn7T+bTD+4v0C'),
				
			this.addEntry(dt + 'document message', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 12, 12), s + 'ellipse;fillColor=#808080;strokeColor=none;');
				bg1.vertex = true;
				var bg2 = new mxCell('D', new mxGeometry(16, 18, 12, 12), s + 'rect;fillColor=#C7A0FF;fontStyle=1;whiteSpace=wrap;html=1;');
				bg2.vertex = true;
				var edge1 = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=orthogonalEdgeStyle;rounded=0;exitX=0;exitY=0.5;endArrow=none;dashed=0;html=1;strokeColor=#808080;strokeWidth=2;');
		    	edge1.geometry.relative = true;
		    	edge1.edge = true;
		    	bg1.insertEdge(edge1, false);
		    	bg2.insertEdge(edge1, true);
			    
			   	return sb.createVertexTemplateFromCells([edge1, bg1, bg2], 28, 30, 'Document Message');
			}),
			this.addEntry(dt + 'event message', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 12, 12), s + 'ellipse;fillColor=#808080;strokeColor=none;');
				bg1.vertex = true;
				var bg2 = new mxCell('E', new mxGeometry(16, 18, 12, 12), s + 'rect;fillColor=#83BEFF;fontStyle=1;whiteSpace=wrap;html=1;');
				bg2.vertex = true;
				var edge1 = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=orthogonalEdgeStyle;rounded=0;exitX=0;exitY=0.5;endArrow=none;dashed=0;html=1;strokeColor=#808080;strokeWidth=2;');
		    	edge1.geometry.relative = true;
		    	edge1.edge = true;
		    	bg1.insertEdge(edge1, false);
		    	bg2.insertEdge(edge1, true);
			    
			   	return sb.createVertexTemplateFromCells([edge1, bg1, bg2], 28, 30, 'Event Message');
			}),
		    this.createVertexTemplateEntry(s3 + 'messExp;html=1;verticalLabelPosition=bottom;verticalAlign=top', 
		    		48, 48, '', 'Message Expiration', null, null, this.getTagsForStencil(gn, '', dt + 'message expiration').join(' ')),
			this.addDataEntry(dt + 'message sequence', 60, 24, 'Message Sequence',
				'7ZbPb4MgFMf/Gu4KtvG6urWnJUt62Jnpm5KiGMSq++sHQlsM7bLDsmzZmjThfd8Pee+DRESyetxJ2laPogCOyAMimRRC2VU9ZsA5whErELlHGEf6j/D2hjeevVFLJTTqMwnYJhwp78EqVujUxJ2Q9/IIJjxGZANNcSelGLT5wkV+0FKlau68nZLiAJngQs65JM6ybRSdPc+sUJX2YFtpz97MM4i2pOibYn6KibZ7gKKERVud6GXupJWVFJUluE6TsPk50XW+A1GDkpMOkcCpYsdlddpZszzHuVTdMJ28gFawRnVe5Scj6IDR1Uv9keuFLXCyvJ1cpBnLdUTktyJah4hWPwRRgr8UURIgigNG4XgL2lXneVLOykavcz0Y0Gg2r6JRbvqpoVPR1qwl5Mp4GecexDTabtfZNbzR/DvVc9sxB2GomIJ9S2dag76AlufEdQRSwYhu3S032E3O6w7q4Hr2pApYWamldg2uR+hDAKsAQPiS/CEALuF0Lr+fxzrgQf554CT9Jh7avHxC2PvM/8J4Bw=='),
		    this.createVertexTemplateEntry(s3 + 'retAddr;html=1;verticalLabelPosition=bottom;fillColor=#FFE040;verticalAlign=top;', 
		    		78, 48, '', 'Return Address', null, null, this.getTagsForStencil(gn, 'retAddr', dt + 'return address').join(' '))
		];
		  
		this.addPalette('eipMessage Construction', 'EIP / Message Construction', expand || false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};

	Sidebar.prototype.addEipMessageRoutingPalette = function(expand)
	{
		var s = "strokeWidth=2;dashed=0;align=center;fontSize=8;shape=rect;fillColor=#fffbc0;";
		var s2 = "html=1;strokeWidth=2;outlineConnect=0;dashed=0;align=center;fontSize=8;fillColor=#c0f5a9;verticalLabelPosition=bottom;verticalAlign=top;shape=mxgraph.eip.";
		var s3 = "edgeStyle=none;endArrow=none;dashed=0;html=1;strokeWidth=2;";
		var gn = 'mxgraph.eip';
		var dt = 'eip enterprise integration pattern message routing ';
		var sb = this;
		
		var fns = [
		    this.createVertexTemplateEntry(s2 + 'aggregator;', 
		    		150, 90, '', 'Aggregator', null, null, this.getTagsForStencil(gn, 'aggregator', dt + '').join(' ')),
		    this.createVertexTemplateEntry(s2 + 'composed_message_processor;', 
		    		150, 90, '', 'Composed Message Processor', null, null, this.getTagsForStencil(gn, 'composed_message_processor', dt + '').join(' ')),
		    this.createVertexTemplateEntry(s2 + 'content_based_router;', 
		    		150, 90, '', 'Content Based Router', null, null, this.getTagsForStencil(gn, 'content_based_router', dt + '').join(' ')),
		    this.createVertexTemplateEntry(s2 + 'dynamic_router;', 
		    		150, 90, '', 'Dynamic Router', null, null, this.getTagsForStencil(gn, 'dynamic_router', dt + '').join(' ')),
			this.addDataEntry(dt + 'message broker', 120, 90, 'Message Broker',
				'5ZjJboMwEIafxneDWZJjQ9qcesqhZxcGjGpwZJytT1+DnQUpUZEqmYQiIWb+YcbMZySwEUmqw0rSDXsXGXBEXhFJpBDKWNUhAc6Rj8sMkSXyfaxP5L/diXpdFG+ohFoNSfBNwo7yLRjFCI06cis0Soov+CgzxbTgI7LIaMOgLYC1Q3lZ1NpO9YggtZCLWq3L7zZ7pt2G0U1rS0hVGy05TwQXsitO8jz/TNsyZpSrCO4OHbFPCFLB4W6XnWRbXIGoQMmjvsUmBLHJ2Nsm2sYjIzEoC3YqMjMabYxfnAtdCGrDQrwNlEwb6LFPygHQYNpAbcLctumebzhtvhZoGDgDGk0b6O0X1iHf+F/wPX2yLN/Yd8Z3NjLfFOchnTvmSyJnfOe/84WsgLV1a1HrywLq7EVKsb8oPeRMVXq8pXfGdj05pn5btAerEVuZQm/SFZUFqN6v4QCkEjhV5a5f/S+IPPwkjMiIjLwnYRSMyGjA8uYhGIUjMhqwYnkIRtGIjAYsQh6CUeyMkXYvuxRdrLeJ8QM='),
		    this.createVertexTemplateEntry(s2 + 'message_filter;', 
		    		150, 90, '', 'Message Filter', null, null, this.getTagsForStencil(gn, 'message_filter', dt + '').join(' ')),
		    this.createVertexTemplateEntry(s2 + 'process_manager;', 
		    		150, 90, '', 'Process Manager', null, null, this.getTagsForStencil(gn, 'process_manager', dt + '').join(' ')),
		    this.createVertexTemplateEntry(s2 + 'recipient_list;', 
		    		150, 90, '', 'Recipient List', null, null, this.getTagsForStencil(gn, 'recipient_list', dt + '').join(' ')),
		    this.createVertexTemplateEntry(s2 + 'resequencer;', 
		    		150, 90, '', 'Resequencer', null, null, this.getTagsForStencil(gn, 'resequencer', dt + '').join(' ')),
		    this.createVertexTemplateEntry(s2 + 'routing_slip;', 
		    		150, 90, '', 'Routing Slip', null, null, this.getTagsForStencil(gn, 'routing_slip', dt + '').join(' ')),
		    this.createVertexTemplateEntry(s2 + 'splitter;', 
		    		150, 90, '', 'Splitter', null, null, this.getTagsForStencil(gn, 'splitter', dt + '').join(' '))
		];
		
		this.addPalette('eipMessage Routing', 'EIP / Message Routing', expand || false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};

	Sidebar.prototype.addEipMessageTransformationPalette = function(expand)
	{
		var s = "html=1;strokeWidth=2;outlineConnect=0;dashed=0;align=center;fontSize=8;fillColor=#c0f5a9;verticalLabelPosition=bottom;verticalAlign=top;shape=mxgraph.eip.";
		var gn = 'mxgraph.eip';
		var dt = 'eip enterprise integration pattern message transformation ';

		this.addPaletteFunctions('eipMessage Transformation', 'EIP / Message Transformation', false,
		[
		    this.createVertexTemplateEntry(s + 'claim_check;', 
		    		150, 90, '', 'Claim Check', null, null, this.getTagsForStencil(gn, 'claim_check', dt + '').join(' ')),
		    this.createVertexTemplateEntry(s + 'content_enricher;', 
		    		150, 90, '', 'Content Enricher', null, null, this.getTagsForStencil(gn, 'content_enricher', dt + '').join(' ')),
		    this.createVertexTemplateEntry(s + 'content_filter;', 
		    		150, 90, '', 'Content Filter', null, null, this.getTagsForStencil(gn, 'content_filter', dt + '').join(' ')),
		    this.createVertexTemplateEntry(s + 'envelope_wrapper;', 
		    		150, 90, '', 'Envelope Wrapper', null, null, this.getTagsForStencil(gn, 'envelope_wrapper', dt + '').join(' ')),
		    this.createVertexTemplateEntry(s + 'normalizer;', 
		    		150, 90, '', 'Normalizer', null, null, this.getTagsForStencil(gn, 'normalizer', dt + '').join(' '))
		]);
	};

	Sidebar.prototype.addEipMessagingChannelsPalette = function(expand)
	{
		var s = "strokeWidth=2;dashed=0;align=center;fontSize=8;html=1;shape=";
		var s2 = "strokeWidth=2;outlineConnect=0;dashed=0;align=center;html=1;fontSize=8;shape=mxgraph.eip.";
		var s3 = "strokeWidth=1;outlineConnect=0;dashed=0;align=center;html=1;fontSize=8;shape=mxgraph.eip.";
		var gn = 'mxgraph.eip';
		var dt = 'eip enterprise integration pattern messaging channel message ';
		var sb = this;
		
		var fns = [
			this.createEdgeTemplateEntry('edgeStyle=none;html=1;strokeColor=#808080;endArrow=block;endSize=10;dashed=0;verticalAlign=bottom;strokeWidth=2;', 
				160, 0, '', 'Point to Point Channel', null, this.getTagsForStencil(gn, '', dt + 'point').join(' ')),
			this.addDataEntry(dt + 'publish subscribe', 80, 160, 'Publish Subscribe Channel',
				'7ZbBbsIwDIafJvfQMMR1FMYJaRKHnbPWayvSGLmBwZ5+bhNKYaAxDTihqlL8O3aS72/VChWXmynpZT7DFIxQE6FiQnR+VG5iMEZEskiFGosoknyL6OVMttdk5VITWHdJQeQL1tqswCteqNzWBKFyhAt4K1KXsxAJNUp1lUPdQHKgTZFZHie8IhALH2jdvPiqq4cc5q7kU417PKxyvaxlgoQ3NwpLAznYnN1+I4W9TwFLcLTlKaGg708nt2FyOK3UlReytmLPgAcBw2kk6nckhCubtgTAps9E+MmhRQteCQR68phXl0dDNkaD1PRVQ1lfbabL3O8B0gwOUDlNGbgDLy+gR2C0K9aHrU4xC6WvWHDHH9R3FRWuKIEw6Qh0u+pF7Pt/Zs9A5iGJ5HLM0Goz2atdd94NJou72uPJ3Mue3VswOPLHPyTX8Ofp4c/1Xp/b2zV42PV/u4a3sovD/YfeT+/+B3wD'),
		    this.createVertexTemplateEntry(s2 + 'channel_adapter;fillColor=#9ddbef;', 
		    	45, 90, '', 'Channel Adapter', null, null, this.getTagsForStencil(gn, 'channel_adapter', dt + '').join(' ')),
		    this.createVertexTemplateEntry(s3 + 'messageChannel;verticalLabelPosition=bottom;labelBackgroundColor=#ffffff;verticalAlign=top;', 
		    	100, 20, '', 'Message Channel', null, null, this.getTagsForStencil(gn, 'messageChannel', dt + '').join(' ')),
		    this.createVertexTemplateEntry(s3 + 'dataChannel;verticalLabelPosition=bottom;labelBackgroundColor=#ffffff;verticalAlign=top;', 
		    	100, 20, '', 'Datatype Channel', null, null, this.getTagsForStencil(gn, 'dataChannel', dt + '').join(' ')),
		    this.createVertexTemplateEntry(s3 + 'deadLetterChannel;verticalLabelPosition=bottom;labelBackgroundColor=#ffffff;verticalAlign=top;', 
		    	100, 20, '', 'Dead Letter Channel', null, null, this.getTagsForStencil(gn, 'deadLetterChannel', dt + '').join(' ')),
		    this.createVertexTemplateEntry(s3 + 'invalidMessageChannel;verticalLabelPosition=bottom;labelBackgroundColor=#ffffff;verticalAlign=top;', 
		    	100, 20, '', 'Invalid Message Channel', null, null, this.getTagsForStencil(gn, 'invalidMessageChannel', dt + '').join(' ')),
		    this.createVertexTemplateEntry(s2 + 'messaging_bridge;verticalLabelPosition=bottom;verticalAlign=top;fillColor=#c0f5a9;', 
	    		150, 90, '', 'Messaging Bridge', null, null, this.getTagsForStencil(gn, 'messaging_bridge', dt + '').join(' ')),
			this.addDataEntry(dt + 'message bus', 120, 140, 'Message Bus',
				'7ZbPb8IgFMf/Gq6Gwma8rtV5WrLEw84ob4VISwOodX/9oLBq/ZF5MJ5s0+S9L7xX+H5KUkSLqp0b1ogPzUEhOkO0MFq7GFVtAUohgiVHdIoIwf5B5P3KaNaN4oYZqN0tBSQWbJnaQFSiYN1eJcE6o9fwJbkTXiCI5lEptNKmm0Jxd/kRzqyA0DokTMmy9vHKrwX8zFy4ym9wmvnwW9duIX/CKyaho2BNiKu2DFaMQDajCqxlJRSC1XUwJk9LBeOgvbrdTkp7nYOuwJm9n7KPo+PoBt6l3YSC5BAWIEuRuvxpzMa87DsdvPRBsvOytfR/a4GXsEgpqKXezQ5Cfu670Zua9/ZCzd+M0TufLpVerbsSZtxFMXmdpcLjdMDsCNEZ5QkOdw8iLH6Awb+nBDf4rm4gY0AxJ7fDVpd8T6WfWvqOBLdDoglw9nJCzuqNWUEqOoHXr+Imni9Png/geXry7sfv9cnvgefx/vzGT34P4JfhewH06eE/Jk4//s35BQ==')
		];
		
		this.addPalette('eipMessaging Channels', 'EIP / Messaging Channels', expand || false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};

	Sidebar.prototype.addEipMessagingEndpointsPalette = function(expand)
	{
		var s = "dashed=0;outlineConnect=0;strokeWidth=2;html=1;align=center;fontSize=8;verticalLabelPosition=bottom;verticalAlign=top;shape=mxgraph.eip.";
		var s2 = 'fillColor=#c0f5a9;' + s;
		var gn = 'mxgraph.eip';
		var dt = 'eip enterprise integration pattern messaging endpoint ';
		
		this.addPaletteFunctions('eipMessaging Endpoints', 'EIP / Messaging Endpoints', false,
		[
		    this.createVertexTemplateEntry(s2 + 'competing_consumers;', 
		    		150, 90, '', 'Competing Consumers', null, null, this.getTagsForStencil(gn, 'competing_consumers', dt + '').join(' ')),
		    this.createVertexTemplateEntry(s + 'durable_subscriber;fillColor=#a0a0a0;', 
		    		30, 35, '', 'Durable Subscriber', null, null, this.getTagsForStencil(gn, 'durable_subscriber', dt + '').join(' ')),
		    this.createVertexTemplateEntry(s2 + 'event_driven_consumer;', 
		    		150, 90, '', 'Event Driven Consumer', null, null, this.getTagsForStencil(gn, 'event_driven_consumer', dt + '').join(' ')),
		    this.createVertexTemplateEntry(s2 + 'message_dispatcher;', 
		    		150, 90, '', 'Message Dispatcher', null, null, this.getTagsForStencil(gn, 'message_dispatcher', dt + '').join(' ')),
		    this.createVertexTemplateEntry(s2 + 'messaging_gateway;', 
		    		150, 90, '', 'Messaging Gateway', null, null, this.getTagsForStencil(gn, 'messaging_gateway', dt + '').join(' ')),
		    this.createVertexTemplateEntry(s2 + 'polling_consumer;', 
		    		150, 90, '', 'Polling Consumer', null, null, this.getTagsForStencil(gn, 'polling_consumer', dt + '').join(' ')),
		    this.createVertexTemplateEntry(s2 + 'selective_consumer;', 
		    		150, 90, '', 'Selective Consumer', null, null, this.getTagsForStencil(gn, 'selective_consumer', dt + '').join(' ')),
		    this.createVertexTemplateEntry(s2 + 'service_activator;', 
		    		150, 90, '', 'Service Activator', null, null, this.getTagsForStencil(gn, 'service_activator', dt + '').join(' ')),
		    this.createVertexTemplateEntry(s2 + 'transactional_client;', 
		    		150, 90, '', 'Transactional Client', null, null, this.getTagsForStencil(gn, 'transactional_client', dt + '').join(' '))
		]);
	};

	Sidebar.prototype.addEipMessagingSystemsPalette = function(expand)
	{
		var s = "strokeWidth=2;dashed=0;align=center;fontSize=8;shape=";
		var s2 = "html=1;strokeWidth=2;outlineConnect=0;dashed=0;align=center;fontSize=8;shape=mxgraph.eip.";
		var s3 = "html=1;strokeWidth=1;dashed=0;align=center;fontSize=8;shape=";
		var s4 = "strokeWidth=1;outlineConnect=0;dashed=0;align=center;fontSize=8;shape=mxgraph.eip.";
		var gn = 'mxgraph.eip';
		var dt = 'eip enterprise integration pattern messaging system ';
		var sb = this;
		
		var fns = [
			this.createVertexTemplateEntry(s2 + 'content_based_router;verticalLabelPosition=bottom;verticalAlign=top;fillColor=#c0f5a9;', 
					150, 90, '', 'Message Router', null, null, this.getTagsForStencil(gn, 'content_based_router', dt + '').join(' ')),

		    this.createVertexTemplateEntry(s4 + 'messageChannel;html=1;verticalLabelPosition=bottom;verticalAlign=top;', 
		    		100, 20, '', 'Message Channel', null, null, this.getTagsForStencil(gn, 'messageChannel', dt + '').join(' ')),
		    
			this.addEntry(dt + 'message endpoint', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 150, 90), s + 'rect;verticalLabelPosition=bottom;verticalAlign=top;fillColor=#c0f5a9;html=1;');
				bg1.vertex = true;
				var bg2 = new mxCell('', new mxGeometry(85, 25, 40, 40), s3 + 'rect;');
				bg2.vertex = true;
				bg1.insert(bg2);
			    
			   	return sb.createVertexTemplateFromCells([bg1], bg1.geometry.width, bg1.geometry.height, 'Message Endpoint');
			}),
			    
			this.addEntry(dt + 'message endpoint', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 150, 90), s + 'rect;verticalLabelPosition=bottom;verticalAlign=top;fillColor=#c0f5a9;html=1;');
				bg1.vertex = true;
				var bg2 = new mxCell('', new mxGeometry(25, 25, 40, 40), s3 + 'rect');
				bg2.vertex = true;
				bg1.insert(bg2);
			    
			   	return sb.createVertexTemplateFromCells([bg1], bg1.geometry.width, bg1.geometry.height, 'Message Endpoint');
			}),
			this.addDataEntry(dt + 'message endpoint', 400, 90, 'Message Endpoint',
				'zVZNb4JAEP013NcFGj0qWi9t0sRDzyuMsHFhyDJ+9dd3F1aFiK0mNhVCMvNmZj/emwU8P8r3cy3K7B0TUJ4/8/xII1Jj5fsIlPI4k4nnTz3OmXk8/nolOqijrBQaCrqlgDcFW6E20CANUNFBOaAijWv4lAllBuCeP0lElYEdgBlHKJkWxo7NjKANsMKCFvLLVg+NW2WitLaGmGxUKhWhQl0P7sdsFYqRTatnaUVYfZnIFjTJWKg3sQT1gZUkiXbCJRJh3koYu5UQlgbNKDdsTgfGdHs0abC/ylMNOZLmgDmQPpiUndu3zQgbLlkGMs1c2chhomr89FR6Zt0Yjvh+Efx7RRg8VoRVfT2DCLxfBFfAw6bi0HVbEgU9CgUPUCh4/mPyoH4/Uc0uyP2z/g+fv//vZTf4kd3hvzXyy+9UQ5LCwrmglribnYHJZZdr3BTJSQgokrHWuLOvBoXxui4Rmo5ggQUcMafPwNW13Y64Le4vBBoye/curNmY3U1HpQo3OobOi9csJgXq9OINJ0WDEiS33dHv0Ma45+98Hev8BnwD'),
			this.addDataEntry(dt + 'message', 28, 48, 'Message',
				'5ZVNb8IwDIZ/Ta9TaEcFx1E+Tjtx2HaMqNtES5MqNbTs1y9pwkdFu01iY5MGQrJfx8F57DZBlBTNStOSPaoURBAtgijRSqGziiYBIYKQ8DSI5kEYEvMLwuVAdNRGSUk1SPxKQugSdlRswSlOqHAvvABpDmvvKo1M5UpSsTipM622MgW7IzEeNByfz+wXa9+NrSfTB61VbQSppM1MacWOiQwLc/75yJgVavUKiRJKt0VEE2K/x8gTT5GZSGgUV7CtssOgUlu98dLYSUh1Dh7L/SWpNtFjWoEqAPXeLNEgKPJdd3daOTc/rjtBNobn3M88+hfM4z/F/P5z5pen7JCigufS2BtTOxhCs0xJXPM3mz2xkBgtrW3+l5eVBZ1xIYZxHiK+K74+0AjN4LM8QKv2NdsV/lwMeM6wq13Db3wzfho22AdvuYyTvikl7eewny9n1B3tmnGEdUnb2azNy/ZK4IcEP+N7706ce4N2xL/cjiybTsnlLH/Ujr4enLXo+9sRxT/VDuOebug21rnA3wE='),
	
			this.addEntry(dt + 'message', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 12, 12), s + 'ellipse;fillColor=#808080;strokeColor=none;');
				bg1.vertex = true;
				var bg2 = new mxCell('', new mxGeometry(16, 18, 12, 12), s + 'rect;fillColor=#80FF6C;fontStyle=1;whiteSpace=wrap;html=1;');
				bg2.vertex = true;
				var edge1 = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=orthogonalEdgeStyle;rounded=0;exitX=0;exitY=0.5;endArrow=none;dashed=0;html=1;strokeColor=#808080;strokeWidth=2;');
		    	edge1.geometry.relative = true;
		    	edge1.edge = true;
		    	bg1.insertEdge(edge1, false);
		    	bg2.insertEdge(edge1, true);
			    
			   	return sb.createVertexTemplateFromCells([edge1, bg1, bg2], 28, 30, 'Message');
			}),
	
			this.addDataEntry(dt + 'message', 28, 48, 'Message',
				'vZTBboMwDIafhutEoZva40q7nnbqYdsxKoZECzEKbqF7+jkkbYcY2qROAyHZv/MH5yMkSrOq21pRy2fMQUfpJkozi0g+qroMtI6SWOVRuo6SJOYnSp4mqrO+GtfCgqHfGBJvOAp9AK94oaGTDgLkJexCipYklmiE3lzVlcWDycHNGHMGnaLXL/Gbi+/uXWbyR2uxZcGgcc5cNPJilFTx+tczDhuy+A4ZarR9E+kidvel8qJyklxJWPENuy4HDBo82H2Q5l4iYUsIWNIxqd4YMG0BKyB74iEWtCB1HM4uGp+Wl3FXyBwEzt8zT39mPl7lgJTQqjQc77l3YEKrAg3t1IdzLxwkKWoX83tV3TjQhdJ6Gue5Er5K6A8sQTe5ryZotaFnNyKsS4IqJQ21W/jN/42fhT2N4RXFchmP4XEl7q/zfKGd2XBrt1IR7GrR782Wf/wbgZ8ND95xCunCp3//OTi9Hk99bXB6fQI='),
	
			this.addEntry(dt + 'message', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 12, 12), s + 'ellipse;fillColor=#808080;strokeColor=none;');
				bg1.vertex = true;
				var bg2 = new mxCell('', new mxGeometry(16, 18, 12, 12), s2 + 'message_1;fillColor=#ff5500;fontStyle=1;whiteSpace=wrap;html=1;');
				bg2.vertex = true;
				var edge1 = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=orthogonalEdgeStyle;rounded=0;exitX=0;exitY=0.5;endArrow=none;dashed=0;html=1;strokeColor=#808080;strokeWidth=2;');
		    	edge1.geometry.relative = true;
		    	edge1.edge = true;
		    	bg1.insertEdge(edge1, false);
		    	bg2.insertEdge(edge1, true);
			    
			   	return sb.createVertexTemplateFromCells([edge1, bg1, bg2], 28, 30, 'Message');
			}),
	
			this.addEntry(dt + 'message', function()
			{
				var bg1 = new mxCell('', new mxGeometry(0, 0, 12, 12), s + 'ellipse;fillColor=#808080;strokeColor=none;');
				bg1.vertex = true;
				var bg2 = new mxCell('', new mxGeometry(16, 18, 12, 12), s2 + 'message_2;fillColor=#00cc00;fontStyle=1;whiteSpace=wrap;html=1;');
				bg2.vertex = true;
				var edge1 = new mxCell('', new mxGeometry(0, 0, 0, 0), 'edgeStyle=orthogonalEdgeStyle;rounded=0;exitX=0;exitY=0.5;endArrow=none;dashed=0;html=1;strokeColor=#808080;strokeWidth=2;');
		    	edge1.geometry.relative = true;
		    	edge1.edge = true;
		    	bg1.insertEdge(edge1, false);
		    	bg2.insertEdge(edge1, true);
			    
			   	return sb.createVertexTemplateFromCells([edge1, bg1, bg2], 28, 30, 'Message');
			}),
	
		    this.createVertexTemplateEntry(s2 + 'message_translator;fillColor=#c0f5a9;verticalLabelPosition=bottom;verticalAlign=top;', 
		    		150, 90, '', 'Message-Translator', null, null, this.getTagsForStencil(gn, 'message_translator', dt + '').join(' '))
		];
		
		this.addPalette('eipMessaging Systems', 'EIP / Messaging Systems', expand || false, mxUtils.bind(this, function(content)
		{
			for (var i = 0; i < fns.length; i++)
			{
				content.appendChild(fns[i](content));
			}
		}));
	};

	Sidebar.prototype.addEipSystemManagementPalette = function(expand)
	{
		var s2 = "html=1;strokeWidth=2;outlineConnect=0;dashed=0;align=center;fontSize=8;verticalLabelPosition=bottom;verticalAlign=top;shape=mxgraph.eip.";
		var gn = 'mxgraph.eip';
		var dt = 'eip enterprise integration pattern system management ';
		
		this.addPaletteFunctions('eipSystem Management', 'EIP / System Management', false,
		[
		    this.createVertexTemplateEntry(s2 + 'channel_purger;fillColor=#c0f5a9', 
		    		150, 90, '', 'Channel Purger', null, null, this.getTagsForStencil(gn, 'channel_purger', dt + '').join(' ')),
		    this.createVertexTemplateEntry(s2 + 'control_bus;fillColor=#c0f5a9', 
		    		60, 40, '', 'Control Bus', null, null, this.getTagsForStencil(gn, 'control_bus', dt + '').join(' ')),
		    this.createVertexTemplateEntry(s2 + 'detour;fillColor=#c0f5a9', 
		    		150, 90, '', 'Detour', null, null, this.getTagsForStencil(gn, 'detour', dt + '').join(' ')),
		    this.createVertexTemplateEntry(s2 + 'message_store;fillColor=#c0f5a9', 
		    		150, 90, '', 'Message Store', null, null, this.getTagsForStencil(gn, 'message_store', dt + '').join(' ')),
		    this.createVertexTemplateEntry(s2 + 'smart_proxy;fillColor=#c0f5a9', 
		    		70, 90, '', 'Smart Proxy', null, null, this.getTagsForStencil(gn, 'smart_proxy', dt + '').join(' ')),
		    this.createVertexTemplateEntry(s2 + 'test_message;fillColor=#c0f5a9', 
		    		150, 90, '', 'Test Message', null, null, this.getTagsForStencil(gn, 'test_message', dt + '').join(' ')),
		    this.createVertexTemplateEntry(s2 + 'wire_tap;fillColor=#c0f5a9', 
		    		150, 90, '', 'Wire Tap', null, null, this.getTagsForStencil(gn, 'wire_tap', dt + '').join(' '))
		]);
	};
})();
